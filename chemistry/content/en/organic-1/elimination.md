In [[organic-1/nucleophilic-substitution]] the reagent arrived *at* carbon: a nucleophile donated its pair to the electrophilic centre, and the leaving group departed with the electrons of its bond, one bond replacing another. Elimination is the reverse theme of that story. The leaving group still leaves, but nothing takes its place at carbon; instead the reagent acts as a **base** and removes a proton from the neighbouring carbon, and the electron pair that had held that proton falls into the carbon–carbon gap, opening a $\pi$ bond. The product is an alkene — and the electrophilic addition chemistry of [[organic-1/alkenes-alkynes]] is, in a precise microscopic sense, this very reaction run backwards. Two questions organise the whole chapter. *Which* $\beta$-hydrogen is removed, and therefore which alkene forms (a question of **regiochemistry**)? And *how* does the reaction choose between eliminating and substituting when the same reagent could do either? Along the way we will meet the sharpest lesson of physical organic chemistry: that a mechanism is not inferred from products alone but from kinetics, isotope effects and geometry together.

## The overall reaction and its bookkeeping

::: definition Elimination, $\beta$-elimination and dehydrohalogenation {#def-elimination}
An **elimination** is a reaction in which two atoms or groups are removed from a molecule and a multiple bond takes their place. In the **$\beta$-elimination** (or **1,2-elimination**) that dominates this course, a leaving group on the **$\alpha$-carbon** and a hydrogen on the adjacent **$\beta$-carbon** are lost together, so the new $\pi$ bond always lies between the $\alpha$- and $\beta$-carbons:
$$
\mathrm{{-}C^{\beta}H{-}C^{\alpha}X{-} \longrightarrow {-}C^{\beta}{=}C^{\alpha}{-} + H^+ + X^-}.
$$

When the leaving group is halide and the base is hydroxide or an alkoxide, the reaction is a **dehydrohalogenation**,

$$
\mathrm{RCH_2CHX R' + B^- \longrightarrow RCH{=}CHR' + HB + X^-}.
$$
The curly-arrow bookkeeping is three arrows and three bond changes: *the lone pair on the base attacks the $\beta$-hydrogen; the electrons of the $\mathrm{C{-}H}$ bond fall into the $\mathrm{C^{\alpha}{-}C^{\beta}}$ gap to become the $\pi$ bond; the electrons of the $\mathrm{C^{\alpha}{-}X}$ bond follow the leaving group onto X*. Note the particle count: two reactant particles give three product particles — a fact that, as we will see, decides whole reaction outcomes through the entropy term $-T\Delta S$.
:::

The base's strength is read from the same ladder as [[organic-1/acidity-mechanism]]: the working bases of elimination are hydroxide ($\mathrm{p}K_\mathrm{a}$ of conjugate acid $\mathrm{H_2O}$: $15.7$), ethoxide ($16$), *tert*-butoxide ($18$) and the amidine base DBU (conjugate acid $\mathrm{p}K_\mathrm{a} \approx 12$). DBU is the instructive exception: its conjugate acid is an amidinium cation stabilised by resonance, so DBU is a *moderate* base on the ladder — but it is enormous, essentially non-nucleophilic, and its proton transfers are fast, which makes it a superb elimination promoter. Basicity (where the equilibrium sits) and the rate of proton removal (how fast the base grabs this particular hydrogen) are different properties, and bulky bases live precisely in the gap between them.

::: example Mapping the eliminations of 2-bromobutane {#ex-map-2bromobutane}
Which alkenes can 2-bromobutane, $\mathrm{CH_3CHBrCH_2CH_3}$, give by $\beta$-elimination, and from which hydrogens? Ignore stereochemistry for now.
::: solution
The $\alpha$-carbon is C2 (it bears Br). It has two $\beta$-carbons: C1 (the methyl, three equivalent H's) and C3 (the $\mathrm{CH_2}$, two H's). Removing an H from C1 gives **but-1-ene**; removing one from C3 gives **but-2-ene**, which exists as the $E$ and $Z$ isomers, so three alkene products in all. There is no other $\beta$-carbon, so there is no other elimination product — every question about "which alkene" reduces to counting $\beta$-carbons and then discriminating among them. C4 is a $\gamma$-carbon relative to C2 and its hydrogens cannot be eliminated in a 1,2-elimination.
:::
:::

## E2: one step, second-order, and geometrically demanding

::: proposition The E2 rate law {#prop-e2-rate}
The bimolecular elimination, **E2**, runs in a single concerted step — proton removal, $\pi$-bond formation and loss of the leaving group all in one transition state — and its rate is second order overall,
$$
v = k_\mathrm{E2}\,[\mathrm{RX}][\mathrm{B^-}]:
$$
doubling either the substrate or the base doubles the rate. Three mechanistic facts ride on this law. **(1)** Both particles are in the transition state, so nothing intervenes: no carbocation, no intermediate, no rearrangement. **(2)** The $\mathrm{C{-}H}$ bond is being broken in the rate-determining step, so replacing that H by D slows the reaction by a **primary kinetic isotope effect** $k_\mathrm{H}/k_\mathrm{D} \approx 2$–$7$ — the C–D zero-point advantage (about $5\ \mathrm{kJ\,mol^{-1}}$, which at $\mathrm{298\ K}$ prices out at $e^{5000/2478.8} \approx 7$) must be paid in the transition state. **(3)** The rate runs $\text{tertiary} > \text{secondary} > \text{primary}$ (typical relative orders of $50 : 7 : 1$ for the 2-halobutanes with ethoxide), the *opposite* of $\mathrm{S_N2}$, because the transition state already carries alkene character and alkyl groups stabilise an incipient $\pi$ bond (Hammond's postulate, as in [[organic-1/acidity-mechanism]]).
:::

Why should a mechanism this simple have a geometry? Because the electrons must *travel*, and the orbital that receives them has a shape.

::: definition The anti-periplanar requirement {#def-antiperiplanar}
Two bonds are **anti-periplanar** when they lie in a common plane with a dihedral angle of $180^\circ$ (and **syn-periplanar** at $0^\circ$). The E2 transition state requires the $\mathrm{C^{\beta}{-}H}$ $\sigma$ bond and the $\mathrm{C^{\alpha}{-}X}$ $\sigma^*$ orbital to be anti-periplanar, because the step is, in orbital terms, donation from the $\sigma_{\mathrm{C-H}}$ bonding orbital into the $\sigma^*_{\mathrm{C-X}}$ antibonding orbital — the same "backside attack" logic as $\mathrm{S_N2}$, but with the proton as the target. Only when the two bonds are coplanar and opposed does the $\mathrm{C{-}H}$ bonding pair overlap the large backside lobe of the $\sigma^*$ as the $\pi$ bond closes; at a dihedral of $60^\circ$ the overlap integral vanishes. Syn-periplanar elimination is symmetry-allowed but pays an eclipsed, sterically crowded arrangement of the remaining bonds in the transition state, and is far rarer — genuine syn eliminations belong to other mechanisms (the Cope elimination of amine oxides, pyrolytic ester eliminations) that hold H and leaving group forcibly *syn*.
:::

Read the requirement through a Newman projection and it becomes a counting game.

::: example Which hydrogens of 2-bromobutane qualify? {#ex-newman-2bromobutane}
View 2-bromobutane down the $\mathrm{C2{-}C3}$ bond with Br *anti* to one of the C3 hydrogens. Which alkene forms from that rotamer, and how do the others arise?
::: solution
Front carbon C2 carries Br, H and $\mathrm{CH_3}$ (C1); back carbon C3 carries H, H and $\mathrm{CH_3}$ (C4). Rotate about $\mathrm{C2{-}C3}$ until Br sits at $180^\circ$ from a chosen $\beta$-hydrogen; only that hydrogen can be removed from that rotamer. With Br *anti* to the C3 hydrogen whose removal leaves the two methyl groups on opposite sides, the product is ($E$)-but-2-ene (*trans*-2-butene); *anti* to the other C3 hydrogen leaves the methyls on the same side and gives ($Z$)-but-2-ene (*cis*-2-butene). A third rotamer places Br *anti* to a C1 hydrogen of the methyl group, and its elimination gives but-1-ene. So all three products of [[#ex-map-2bromobutane]] come from three different rotamers, and the product ratio measures the free energies of the three anti-periplanar transition states — not the populations of the rotamers alone.
:::
:::

::: widget plot
f: 100/(1 + exp(-(x - a))); 100 - 100/(1 + exp(-(x - a)))
x: 0, 10
y: 0, 105
sliders: a=5:1:9:0.1
labels: \text{Hofmann}; \text{Zaitsev}
caption: A model for how the Hofmann (less-substituted) product fraction rises with the steric demand $x$ of the base (arbitrary units), with the crossover point $x = a$ set by the slider. Ethoxide sits near $x \approx 2$ and gives mostly Zaitsev alkene; *tert*-butoxide near $x \approx 6$ and gives mostly Hofmann. The sigmoid shape is the honest statement of what "bulky bases give Hofmann" means: it is a competition, not a switch, and the substrate (the slider) decides where the crossover falls — a $\beta$-carbon crowded by *tert*-butyl shifts the whole curve to the left.
:::

::: history
The chapter's two rival rules are older than the mechanisms that explain them. In 1875 the Russian chemist Alexander **Zaitsev** (Saytzeff), studying eliminations of pentyl halides and esters, recorded that the hydrogen tends to leave the $\beta$-carbon that already bears the fewest hydrogens — the more substituted alkene predominates — a generalisation that has carried his name ever since. A decade later August **Hofmann**, developing his exhaustive-methylation method for dissecting amines, found the opposite selectivity in the elimination of quaternary ammonium and sulfonium hydroxides, and built a predictive "rule of least" out of it; both rules survived, because both have mechanisms. The kinetic skeleton — the identification of E1 and E2 with first- and second-order rate laws, and their pairing with $\mathrm{S_N1}$ and $\mathrm{S_N2}$ as the four fundamental pathways of saturated carbon — was erected by Eric **Hughes** and Christopher **Ingold** in a series of papers through the 1930s and 1940s, and the anti-periplanar geometric demand was crystallised shortly afterwards from the stereochemistry of cyclic and steroidal halides.
:::

## Regiochemistry: Zaitsev's rule and the numbers behind it

::: proposition Zaitsev's rule (an empirical rule) {#prop-zaitsev}
**Zaitsev's rule:** in the elimination of $\mathrm{HX}$ from an unsymmetrical substrate, the major product is the more substituted (more highly alkylated) alkene. It is an **empirical rule** — a summary of what small alkoxides typically do, not a law with a mechanism bolted on — and its physical basis is alkene stability, measured directly by heats of hydrogenation ($\mathrm{kJ\,mol^{-1}}$, standard tabulated values):

| alkene | $\Delta_\mathrm{hyd}H$ / $\mathrm{kJ\,mol^{-1}}$ | substitution |
|---|---|---|
| $\mathrm{CH_2{=}CHCH_2CH_3}$ (but-1-ene) | $-30.3$ | monosubstituted |
| ($Z$)-but-2-ene | $-28.6$ | disubstituted, *cis* |
| ($E$)-but-2-ene | $-27.6$ | disubstituted, *trans* |
| 2-methylbut-2-ene | $-26.9$ | trisubstituted |

Each alkyl group stabilises the double bond by roughly $1$–$2\ \mathrm{kJ\,mol^{-1}}$ (hyperconjugation: donation of adjacent $\mathrm{C{-}H}$ $\sigma$ pairs into the $\pi^*$ orbital), and *trans* beats *cis* by $1.0\ \mathrm{kJ\,mol^{-1}}$ of avoided methyl–methyl contact. Because the E2 transition state has alkene character, these stabilities are reflected in the transition-state energies (Hammond again), so the more substituted alkene forms faster. Expect the rule to fail where the transition state is not alkene-like enough to care, or where the base cannot reach: bulky bases, bulky substrates, and the cyclohexane diaxial constraint below.
:::

Typical product distributions for 2-bromobutane (representative tabulated values, elimination products only) make the competition concrete: with ethoxide in ethanol, but-1-ene $12\,\%$, *cis*-2-butene $27\,\%$, *trans*-2-butene $61\,\%$ — Zaitsev alkene $88\,\%$, and within it the $E$ isomer favoured by the $1.0\ \mathrm{kJ\,mol^{-1}}$ stability gap (a $1.0\ \mathrm{kJ\,mol^{-1}}$ difference is only $e^{1000/(8.314 \times 350)} \approx 1.4$-fold at reaction temperature, which is why *cis* still appears in quantity). With *tert*-butoxide the profile inverts: but-1-ene about $52\,\%$. The reason is access, not stability: the hydrogens of the terminal C1 methyl stick out in open space, cheap to reach, while the internal $\beta$-hydrogens sit in the molecular interior behind the leaving group's own alkyl substituents; a base the size of *tert*-butoxide pays less steric penalty removing a terminal hydrogen, and the transition state for Hofmann product formation becomes the lower one. Hofmann's own systems — quaternary ammonium and sulfonium hydroxides — invert the selectivity for a related reason: a huge, positively charged leaving group makes the transition state early and the $\beta$-hydrogen's *acidity and accessibility* (statistical and electrostatic) dominate over alkene stability.

::: example Choosing conditions to choose an alkene {#ex-zaitsev-hofmann}
Predict the major alkene from 2-bromo-2-methylbutane with (a) sodium ethoxide in ethanol and (b) potassium *tert*-butoxide in *tert*-butanol, and justify each from the numbers above.
::: solution
The substrate has two kinds of $\beta$-hydrogen: six on the two equivalent methyls attached to C2 (removal gives 2-methylbut-1-ene, disubstituted) and two on C3 (removal gives 2-methylbut-2-ene, trisubstituted). **(a)** Ethoxide is small: Zaitsev's rule applies, and the trisubstituted alkene wins — 2-methylbut-2-ene is the major product, its advantage rooted in the $\approx 1.5\ \mathrm{kJ\,mol^{-1}}$ it draws from the hydrogenation table over its disubstituted rival. **(b)** *tert*-Butoxide cannot reach the internal hydrogens past the substrate's own methyls: 2-methylbut-1-ene becomes major. The two reactions are the same substrate, the same mechanism, the same leaving group — and opposite products, decided entirely by the shape of the base. This is the chapter's central synthetic fact: *the reagent chooses the regiochemistry*.
:::
:::

## The cyclohexane override: elimination as a chair problem

In open chains, rotation can always bring H and X to $180^\circ$: the anti-periplanar requirement costs a rotamer, not a bond. In a cyclohexane ring the geometry is frozen by the chair. Two ring bonds are anti-periplanar if and only if they are *trans*-diaxial — both axial, on adjacent carbons, pointing to opposite faces. An equatorial leaving group has no anti-periplanar hydrogen anywhere: its dihedrals to every $\beta$-hydrogen are $\pm 60^\circ$. E2 on a cyclohexane therefore waits for the ring flip that puts the leaving group axial, and then the *only* hydrogens it can remove are the axial ones — which may not be the ones Zaitsev's rule would have chosen.

::: example The 4-*tert*-butylcyclohexyl test: cis fast, trans slow {#ex-diaxial-tbc}
Both isomers of 4-*tert*-butylcyclohexyl bromide are treated with a strong base. The *tert*-butyl group (A-value $23\ \mathrm{kJ\,mol^{-1}}$, [[organic-1/conformations]]) locks the ring. Predict which isomer eliminates faster and by roughly how much.
::: solution
For a 1,4-disubstituted ring, *trans* can be diequatorial and *cis* is (equatorial, axial). With the *tert*-butyl group locked equatorial (the alternative chair costs $23\ \mathrm{kJ\,mol^{-1}}$ and is populated at $1/1.07\times10^{4}$ of the other), the **cis** isomer carries an **axial** bromide: anti-periplanar axial hydrogens sit ready on both sides, and E2 is immediate. The **trans** isomer carries an equatorial bromide: no anti-periplanar hydrogen exists, and reaction must wait for the ring flip that pays the full $23\ \mathrm{kJ\,mol^{-1}}$ to put bromide axial (and *tert*-butyl axial too). The rate ratio is roughly the equilibrium ratio of the reactive chairs, $e^{23000/(8.314 \times 298)} \approx 1.1\times10^{4}$ — the cis isomer reacts some ten thousand times faster. The same logic explains the classical menthyl/menthyl chlorides: menthyl chloride has exactly one anti-periplanar $\beta$-hydrogen, and it leads to the *non*-Zaitsev, disubstituted alkene, exclusively, because the Zaitsev route has no diaxial hydrogen to remove. Geometry overrides Zaitsev whenever they disagree.
:::
:::

::: warning Three rules of thumb that are not laws {#warn-rules-of-thumb}
**(1)** *Zaitsev's rule is a law of nature.* It is an empirical tendency, good for small alkoxides and unstrained acyclic substrates, and it loses to steric access (Hofmann conditions) and to the diaxial requirement in rings — as [[#ex-diaxial-tbc]] shows, geometry outranks thermodynamics every time they disagree. **(2)** *E2 just needs a strong base.* It needs a strong base **and** an anti-periplanar H–C–C–X array; a substrate with the base present but the geometry absent simply does not react by E2 (the trans-bromide above is not sluggish, it is waiting for a ring flip). **(3)** *Heat "just makes reactions faster".* Heat shifts *selectivity*, not only speed: elimination gains an entropy advantage that grows with $T$ (section below), so the same flask at $25\ ^\circ\mathrm{C}$ and $80\ ^\circ\mathrm{C}$ can give different product ratios, not merely more of the same ones.
:::

## E1: elimination through a carbocation

::: definition The E1 mechanism {#def-e1}
**E1** (unimolecular elimination) removes H and X in two steps through a carbocation: the substrate **ionises** in the slow, rate-determining step — $\mathrm{RX \rightarrow R^+ + X^-}$ — and a (weak) base removes a $\beta$-hydrogen from the cation in a fast second step. The rate law is first order, $v = k_\mathrm{E1}[\mathrm{RX}]$: the base does not appear, because it arrives only after the bottleneck. E1 is the elimination twin of $\mathrm{S_N1}$ ([[organic-1/nucleophilic-substitution]]): the two share the *same* ionisation step and compete from the same carbocation, so E1 appears wherever $\mathrm{S_N1}$ does — tertiary substrates, ionising solvents, weak bases — and is favoured by heat. Three consequences: no stereoelectronic demand (the cation is planar, any $\beta$-hydrogen can go); **carbocation rearrangements** are possible (hydride and alkyl shifts that would give a more stable cation precede elimination); and Zaitsev selectivity is the norm, because the transition state for deprotonating a cation is alkene-like and stability has full rein.
:::

Because $\mathrm{S_N1}$ and E1 share their first step, their product ratio is set by the *second* step's competition — capture of the cation by solvent versus deprotonation — and the two pathways typically differ by only $1$–$2\ \mathrm{kJ\,mol^{-1}}$ in effective barrier, a factor of $1.4$–$2$ at $350\ \mathrm{K}$. That is why solvolysis temperatures decide the ratio: warm the mixture and the elimination share climbs, cool it and substitution wins.

::: example Solvolysis of 2-bromo-2-methylpropane {#ex-e1-tertbutyl}
2-Bromo-2-methylpropane in warm aqueous ethanol gives *tert*-butyl alcohol, its ethyl ether, and an alkene. Write the rate law, name the mechanisms, and predict how the alkene's share changes with temperature.
::: solution
Rate $= k[\mathrm{(CH_3)_3CBr}]$ — first order, independent of water and ethanol: ionisation to the *tert*-butyl cation is rate-determining and common to all three products. The cation is then captured by water ($\mathrm{S_N1}$ → alcohol), by ethanol ($\mathrm{S_N1}$ → ether), or deprotonated by solvent ($\mathrm{E1}$ → 2-methylpropene). No rearrangement is possible (the cation is already tertiary), and no stereochemistry is at stake. Warming raises the alkene's share — the entropy argument of the next section — which is why solvolyses "go to elimination" at reflux. The same substrate with ethoxide, by contrast, abandons E1 entirely for E2: strong base, second-order kinetics, no cation, no ether.
:::
:::

## Heat and entropy: why elimination wins hot

Elimination converts two particles into three; substitution converts two into two. The product side of elimination therefore carries a large entropy advantage — more particles, more translations, more freedom — and while the enthalpy of forming an alkene is not especially generous, the free energy $\Delta G = \Delta H - T\Delta S$ improves with temperature exactly in proportion to $\Delta S$. The same argument runs kinetically, where it belongs: an E2 transition state is looser and more fragmenting than the $\mathrm{S_N2}$ alternative, so $S^{\ddagger}_\mathrm{E2} > S^{\ddagger}_\mathrm{SN2}$. Model the competition with $\Delta\Delta H^{\ddagger} = \Delta H^{\ddagger}_\mathrm{E2} - \Delta H^{\ddagger}_\mathrm{SN2} = +15\ \mathrm{kJ\,mol^{-1}}$ (substitution has the lower enthalpic barrier) and $\Delta\Delta S^{\ddagger} = +40\ \mathrm{J\,mol^{-1}\,K^{-1}}$ (elimination has the entropic advantage). Then

$$
\Delta\Delta G^{\ddagger}(T) = \Delta\Delta H^{\ddagger} - T\,\Delta\Delta S^{\ddagger}
= 15 - 0.040\,T \ \ \mathrm{kJ\,mol^{-1}},
$$

which vanishes at $T^* = 15\,000/40 = 375\ \mathrm{K}$. At $\mathrm{298\ K}$, $\Delta\Delta G^{\ddagger} = +3.1\ \mathrm{kJ\,mol^{-1}}$ and $k_\mathrm{E2}/k_\mathrm{SN2} = e^{-3100/2478.8} = 0.29$: about $22\,\%$ elimination. At $\mathrm{373\ K}$ the ratio is $0.98$ — a dead heat. At $\mathrm{450\ K}$, $\Delta\Delta G^{\ddagger} = -3.0\ \mathrm{kJ\,mol^{-1}}$ and elimination takes $69\,\%$. One number, $\Delta S$, is doing all the work of "heat favours elimination": every degree of temperature spends the entropy advantage a little more freely.

::: widget plot
f: 15 - 0.040*x
x: 250, 500
y: -6, 16
vlines: 375
labels: \Delta\Delta G^{\ddagger}
caption: The modelled selectivity gap $\Delta\Delta G^{\ddagger} = \Delta\Delta H^{\ddagger} - T\Delta\Delta S^{\ddagger}$ in $\mathrm{kJ\,mol^{-1}}$ against temperature, with the enthalpic advantage to substitution ($+15\ \mathrm{kJ\,mol^{-1}}$) and the entropic advantage to elimination ($+40\ \mathrm{J\,mol^{-1}\,K^{-1}}$). Above the vertical line at $T^* = 375\ \mathrm{K}$ the gap is negative and elimination is the faster pathway; below it, substitution. The line is straight because $\Delta H^{\ddagger}$ and $\Delta S^{\ddagger}$ are treated as temperature-independent over this range — a good approximation, and the reason a single crossover temperature exists at all.
:::

::: widget newton
f: 15 - 0.040*x
x0: 375
x: 250, 500
caption: Newton's method finding the crossover temperature $T^* = 375\ \mathrm{K}$ at which $\Delta\Delta G^{\ddagger} = 0$ and elimination and substitution run at equal rates. The equation is linear here and trivially invertible, but the same machine solves the non-linear versions that arise when $\Delta C_p$ or tunnelling corrections are included — and in the laboratory, $T^*$ is not computed but measured, by running the competition at several temperatures and fitting the slope of $\ln(k_\mathrm{E}/k_\mathrm{S})$ against $1/T$, which *is* $\Delta\Delta H^{\ddagger}/R$.
:::

## Predicting the winner: substrate, reagent, temperature

::: algorithm Predicting substitution versus elimination {#alg-compete}
Given a substrate and a reagent, decide the product by working through five questions in order. **(1) Substrate class.** Methyl and primary carbons cannot form cations (no $\mathrm{S_N1}$/E1) and eliminate slowly (no alkene stabilisation in the E2 transition state); tertiary carbons cannot do $\mathrm{S_N2}$ (backside blocked) and never wait for a nucleophile once ionised; secondary substrates are the contested ground where reagent and temperature decide. **(2) Reagent: base or nucleophile?** Read the conjugate-acid $\mathrm{p}K_\mathrm{a}$ for strength ($\ge 13$: strong base; $\le 11$: weak) and the structure for bulk: anions with three or more substituents at the $\alpha$-carbon (*tert*-butoxide) or fused-ring nitrogens (DBU) are strong bases and poor nucleophiles — they eliminate. Good nucleophiles that are weak bases ($\mathrm{I^-}$, $\mathrm{Br^-}$, $\mathrm{RS^-}$, $\mathrm{CN^-}$, $\mathrm{N_3^-}$) substitute. **(3) Temperature.** Above about $320$–$350\ \mathrm{K}$, or whenever the choice is otherwise a tie, add the entropy bonus to elimination (step 5 below). **(4) Solvent.** Polar protic media encourage ionisation ($\mathrm{S_N1}$/E1 with weak reagents); aprotic solvents keep anions naked and sharpen $\mathrm{S_N2}$/E2. **(5) Read the verdict.** Strong base + tertiary → E2. Strong base + primary → E2 only if the base is bulky or hot, else $\mathrm{S_N2}$. Strong base + secondary → E2 dominates with heat and bulk, $\mathrm{S_N2}$ competes cold and small. Weak base + tertiary (or secondary, slow) → $\mathrm{S_N1}$ + E1 mixture, elimination share rising with temperature. Weak base + primary or methyl → no reaction (or $\mathrm{S_N2}$ if a good nucleophile is present).
:::

::: example Classify four flasks {#ex-classify}
Predict the dominant pathway(s) and major organic product: (a) 2-bromobutane + sodium ethoxide in ethanol, $\mathrm{50\ ^\circ C}$; (b) 2-bromobutane + potassium *tert*-butoxide in *tert*-butanol, $\mathrm{40\ ^\circ C}$; (c) 2-bromobutane in water with a little ethanol, $\mathrm{60\ ^\circ C}$; (d) 2-bromo-2-methylpropane in water, $\mathrm{25\ ^\circ C}$.
::: solution
**(a)** Secondary substrate, strong base (ethoxide, conjugate-acid $\mathrm{p}K_\mathrm{a} = 16$), heat: E2 dominates with some $\mathrm{S_N2}$; Zaitsev product, ($E$)-but-2-ene major. **(b)** Same substrate, bulky strong base: E2 with inverted regiochemistry — but-1-ene (Hofmann) major. **(c)** Weak base/nucleophile, secondary substrate: slow $\mathrm{S_N1}$ + E1 solvolysis; butan-2-ol (with racemisation) plus a heat-enhanced share of but-2-enes. **(d)** Tertiary substrate, weak reagent, cold: $\mathrm{S_N1}$ wins the mixture — *tert*-butyl alcohol major, 2-methylpropene minor; warm it and the alkene share climbs. Notice that (a) and (b) differ only in the shape of one anion, and (c) and (d) only in the substitution of the carbon — the algorithm is nothing but those two variables plus the thermometer.
:::
:::

::: quiz
A secondary alkyl halide is treated with sodium ethoxide. Which change would most increase the elimination-to-substitution ratio, and why?
- [ ] Switching the solvent to a polar aprotic one, because naked anions eliminate preferentially.
- [x] Raising the temperature, because elimination gains $-T\Delta S$ ground on substitution as $T$ rises — two particles become three.
- [ ] Using a fourfold excess of ethoxide, because E2 is first order in base while $\mathrm{S_N2}$ is not.
- [ ] Switching the halide to iodide, because better leaving groups favour elimination specifically.
::: solution
Both E2 and $\mathrm{S_N2}$ are first order in base and both are accelerated by a better leaving group, so the excess (option 3) and the iodide (option 4) speed both pathways without much discrimination; polar aprotic solvents (option 1) tend to *sharpen* $\mathrm{S_N2}$ more than E2. Temperature is the selective lever: the entropy difference between the two pathways is converted into selectivity in direct proportion to $T$, exactly as the $\Delta\Delta G^{\ddagger}(T)$ model above shows.
:::
:::

## Elimination in synthesis — and safely

Dehydrohalogenation is the workhorse for *making* alkenes when you want them somewhere else in a synthesis: install a leaving group (from an alcohol, via a sulfonate or halide — [[organic-1/alcohols-ethers]]), then choose the base to choose the alkene — small alkoxide for the Zaitsev isomer, *tert*-butoxide or DBU for the Hofmann isomer, ring geometry as the final veto. The alkene is rarely the target: it is the handle, the platform the addition chemistry of [[organic-1/alkenes-alkynes]] will functionalise into alcohols, halides, diols and carbonyl compounds. On the bench, the hazards are those of the class: the low-molecular-mass alkenes are extremely volatile, colourless, odorous gases or low-boiling liquids (2-methylpropene boils at about $-7\ ^\circ\mathrm{C}$) — GHS flame pictograms, flammable, heavier-than-air vapours that travel to ignition sources — so reactions generating them are closed or vented systems in a fume cupboard, away from sparks and open flames. Acidic by-products (HX) are corrosive and are scavenged by the base in the reaction or trapped before they reach the vacuum line; practical work of this kind proceeds only under supervision and after a risk assessment.

## Where this leads

Elimination and addition are a matched pair, and [[organic-1/alkenes-alkynes]] opens the second half of the pair: electrophilic addition to the very double bonds this chapter made, Markovnikov's rule as the mirror of Zaitsev's, and carbocation rearrangements as the signature E1 shares with them. [[organic-1/alcohols-ethers]] supplies the leaving groups (sulfonate esters, protonated alcohols) and the competing dehydrations; [[organic-1/nucleophilic-substitution]] remains the rival pathway on every flask you will draw. The single-electron cousin of this chapter — radical additions and the anti-Markovnikov peroxide effect — is [[organic-1/radical-reactions]], and the quantitative machinery connecting rate laws to transition-state structure (the isotope effect, the entropy of activation) is built properly in [[kinetics/transition-state-theory]].

::: summary
- Elimination removes H and a leaving group from adjacent carbons and opens a $\pi$ bond; the new double bond always lies between the $\alpha$- and $\beta$-carbons, and two particles become three.
- E2 is concerted and second order, $v = k[\mathrm{RX}][\mathrm{B^-}]$, shows a primary kinetic isotope effect, and runs $3^\circ > 2^\circ > 1^\circ$ because its transition state carries alkene character.
- E2 demands an anti-periplanar H–C–C–X array ($\sigma_{\mathrm{C-H}} \rightarrow \sigma^*_{\mathrm{C-X}}$ donation); in cyclohexanes this means *trans*-diaxial, and the requirement overrides every regiochemical rule.
- Zaitsev's rule — the more substituted alkene predominates — is empirical, grounded in alkene stability (hydrogenation: $-30.3$ to $-26.9\ \mathrm{kJ\,mol^{-1}}$ from mono- to trisubstituted; *trans* beats *cis* by $1.0\ \mathrm{kJ\,mol^{-1}}$).
- Bulky bases (*tert*-butoxide, DBU) and huge leaving groups (Hofmann's ammonium and sulfonium hydroxides) give the less-substituted Hofmann product because access and acidity, not alkene stability, set the barrier.
- E1 is unimolecular, shares the ionisation step with $\mathrm{S_N1}$, has no geometric demand, allows rearrangements, and appears with tertiary substrates, weak bases and heat.
- Heat favours elimination because $\Delta\Delta G^{\ddagger} = \Delta\Delta H^{\ddagger} - T\Delta\Delta S^{\ddagger}$: a $+40\ \mathrm{J\,mol^{-1}\,K^{-1}}$ entropy advantage turns the tables at a crossover temperature.
- Prediction is an algorithm: substrate class first, then base strength and bulk, then temperature and solvent — and the reagent's shape, not just its $\mathrm{p}K_\mathrm{a}$, chooses the regiochemistry.
:::

## Exercises

::: exercise Counting the alkenes {level=1 check="3"}
How many distinct alkene products (counting $E/Z$ isomers separately) can 2-bromobutane give by $\beta$-elimination? (Enter the number.)
::: solution
Three: but-1-ene, ($E$)-but-2-ene and ($Z$)-but-2-ene. Two $\beta$-carbons, but C3's two hydrogens lead to the $E$ and $Z$ isomers while C1's give the terminal alkene — see [[#ex-map-2bromobutane]].
:::
:::

::: exercise The rate law {level=1 check="4"}
A reaction is run with an E2 mechanism. Both the substrate and the base concentrations are doubled. By what factor does the rate increase? (Enter the factor.)
::: solution
$v = k[\mathrm{RX}][\mathrm{B^-}]$, so $2 \times 2 = 4$. Both particles are in the single transition state; this $2\times2$ test is exactly how Hughes and Ingold separated E2 from E1.
:::
:::

::: exercise Waiting for the axial chair {level=1 check="0.000093"}
For *trans*-1-bromo-4-*tert*-butylcyclohexane at $\mathrm{298\ K}$, take the *tert*-butyl A-value as $23\ \mathrm{kJ\,mol^{-1}}$ and compute the fraction of molecules whose bromide is axial (the reactive chair for E2). (Enter the fraction.)
::: solution
$[\mathrm{ax}]/[\mathrm{eq}] = e^{-23000/(8.314 \times 298)} = 9.3\times10^{-5}$, and the fraction is $9.3\times10^{-5}/(1 + 9.3\times10^{-5}) \approx 9.3\times10^{-5}$. Nine molecules in a hundred thousand carry an axial bromide — hence the $10^{4}$-fold rate gap between the isomers in [[#ex-diaxial-tbc]].
:::
:::

::: exercise The *trans*:*cis* ratio {level=2 check="1.41"}
The hydrogenation gap between ($E$)- and ($Z$)-but-2-ene is $1.0\ \mathrm{kJ\,mol^{-1}}$. Assuming the E2 transition states inherit this gap, predict the *trans*:*cis* product ratio at $\mathrm{350\ K}$. (Enter the ratio $[\textit{trans}]/[\textit{cis}]$.)
::: solution
$e^{1000/(8.314 \times 350)} = e^{0.343} = 1.41$. A $1\ \mathrm{kJ\,mol^{-1}}$ stability difference is worth only $1.4$-fold at reaction temperature — which is why Zaitsev eliminations still deliver plenty of the *cis* isomer, and why product ratios are not hydrogenation tables read directly.
:::
:::

::: exercise The crossover temperature {level=2 check="375"}
For a competing E2/$\mathrm{S_N2}$ pair, $\Delta\Delta H^{\ddagger} = +15\ \mathrm{kJ\,mol^{-1}}$ and $\Delta\Delta S^{\ddagger} = +40\ \mathrm{J\,mol^{-1}\,K^{-1}}$ (elimination relative to substitution). At what temperature do the two pathways run at equal rate? (Enter $T$ in kelvin.)
::: solution
$\Delta\Delta G^{\ddagger} = 0$ when $T^* = \Delta\Delta H^{\ddagger}/\Delta\Delta S^{\ddagger} = 15\,000/40 = 375\ \mathrm{K}$. Below it substitution is faster, above it elimination — the newton widget solves the same equation.
:::
:::

::: exercise Elimination share at room temperature {level=2 check="22.5"}
For the pair above at $\mathrm{298\ K}$, $k_\mathrm{E2}/k_\mathrm{SN2} = 0.29$. If the substrate can react by no other pathway, what percentage of it becomes elimination product? (Enter the percentage.)
::: solution
Fraction $= 0.29/1.29 = 0.225$, i.e. $22.5\,\%$. The ratio of rate constants *is* the product ratio when the pathways are parallel and irreversible — the standard way kinetics becomes a product distribution.
:::
:::

::: exercise The E1 product ratio from a shared cation {level=3}
In an E1/$\mathrm{S_N1}$ solvolysis, the carbocation $\mathrm{R^+}$ is captured by solvent with rate constant $k_\mathrm{N} = 1.2\times10^{7}\ \mathrm{s^{-1}}$ and deprotonated with $k_\mathrm{E} = 2.0\times10^{7}\ \mathrm{s^{-1}}$ (rate constants for the second step; the base is the solvent, so both are first order in $\mathrm{R^+}$). Using the steady-state approximation for $\mathrm{R^+}$, show that the product ratio $[\text{alkene}]/[\text{ether}]$ equals $k_\mathrm{E}/k_\mathrm{N}$ and evaluate it; then show the overall rate law is first order in substrate alone.
::: solution
With ionisation rate constant $k_1$ and return of $\mathrm{X^-}$ neglected, $\mathrm{d}[\mathrm{R^+}]/\mathrm{d}t = k_1[\mathrm{RX}] - (k_\mathrm{N} + k_\mathrm{E})[\mathrm{R^+}] \approx 0$, so $[\mathrm{R^+}] = k_1[\mathrm{RX}]/(k_\mathrm{N} + k_\mathrm{E})$. The rates of product formation are $k_\mathrm{E}[\mathrm{R^+}]$ and $k_\mathrm{N}[\mathrm{R^+}]$ — the same denominator cancels in the ratio: $[\text{alkene}]/[\text{ether}] = k_\mathrm{E}/k_\mathrm{N} = 2.0/1.2 = 1.7$. The total consumption of substrate is $k_1[\mathrm{RX}]$: first order, base absent from the rate law even though the base decides the product ratio — the sharpest illustration that in E1 the base only *chooses*, never *drives*.
:::
:::

::: exercise Design an alkene {level=3}
You need (a) 2-methylbut-2-ene and (b) 2-methylbut-1-ene, each as the major product, starting from 2-bromo-2-methylbutane. Choose the reagent and temperature for each, justify against the hydrogenation table, and explain why the *cis*/*trans*-style reasoning of but-2-ene cannot be used to separate your choices.
::: solution
**(a)** Small strong base, warm: sodium ethoxide in ethanol at reflux. Zaitsev's rule delivers the trisubstituted alkene; its $\approx 1.5\ \mathrm{kJ\,mol^{-1}}$ hydrogenation advantage over the disubstituted isomer is enough with a small base sampling both sites. **(b)** Bulky strong base, mild temperature: potassium *tert*-butoxide in *tert*-butanol, where the methyl hydrogens are the only ones the base can reach and 2-methylbut-1-ene wins on access. The reasoning cannot be pushed to $E/Z$ discrimination here because 2-methylbut-1-ene has a $\mathrm{CH_2}$ terminus (no second substituent, no $E/Z$ pair), and 2-methylbut-2-ene likewise carries two methyls on one carbon — the geometric vocabulary of but-2-ene simply has no referent on these molecules, a reminder that $E/Z$ exists only when *both* double-bond carbons carry two different groups.
:::
:::
