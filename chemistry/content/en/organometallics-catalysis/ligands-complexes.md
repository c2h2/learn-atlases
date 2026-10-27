Carbon monoxide is a poor Lewis base. It barely binds to $\mathrm{BH_3}$, it does not protonate in water, and its lone pair sits on the *less* electronegative atom of a very strong triple bond. Yet it binds to nickel metal at room temperature, it displaces oxygen from haemoglobin, and it forms neutral, volatile, perfectly stable compounds with almost every transition metal in groups 6 to 10. The explanation — that CO is useful to a metal less as a donor than as an *acceptor* — is the key to the whole family of ligands that make organometallic chemistry work: carbonyls, phosphines, alkenes, alkynes, carbenes, cyclopentadienyls and arenes.

This chapter goes through those ligands one by one. For each we ask how it bonds (σ donation, π back-donation, or both), how that bonding shows up in a measurement — infrared stretching frequencies, bond lengths, NMR shifts — and how chemists use the ligand to tune a metal's electron density and the space around it. The electron counting of [[organometallics-catalysis/organometallic-bonding]] tells us *how many* electrons each ligand gives; this chapter is about *how* it gives them, and what it takes back.

## Metal carbonyls and the synergic bond

The frontier orbitals of CO determine everything. Its highest occupied orbital, $5\sigma$, is a lone pair concentrated on carbon and slightly antibonding with respect to C–O; its lowest unoccupied orbitals are the degenerate pair $2\pi^*$, which are C–O antibonding and have their larger lobes on carbon. Both therefore point at a metal bound through carbon, which is why CO binds through C and not O.

::: definition The synergic (Dewar–Chatt–Duncanson) bond {#def-synergic}
A ligand bonds **synergically** to a metal when two interactions operate together: **σ donation** of a filled ligand orbital into an empty metal orbital of σ symmetry, and **π back-donation** of electrons from a filled metal $d$ orbital of π symmetry into an empty ligand orbital ($\pi^*$ of CO, alkenes and alkynes; $\sigma^*$ of P–R bonds in phosphines; $\sigma^*$ of H–H in dihydrogen complexes). Each interaction strengthens the other: donation makes the metal richer in electrons and therefore a better π donor; back-donation removes electron density from the metal and so makes it a better σ acceptor. Because back-donation fills an orbital that is antibonding *within* the ligand, it weakens and lengthens the bond in the ligand (C–O, C=C, H–H) while strengthening the metal–ligand bond. The model was formulated for alkene complexes by Michael Dewar (1951) and by Joseph Chatt and Leonard Duncanson (1953).
:::

For CO the two components pull the C–O bond in opposite directions. σ donation from $5\sigma$, which is weakly C–O antibonding, would by itself *strengthen* the C–O bond slightly; π back-donation into $2\pi^*$ weakens it strongly. In nearly all neutral and anionic carbonyls back-donation wins, and the C–O stretching wavenumber $\tilde\nu(\mathrm{CO})$ falls below the free-molecule value of $2143\ \mathrm{cm^{-1}}$. Only in a few cationic complexes with little back-donation — the "non-classical" carbonyls of $\mathrm{Au^+}$, $\mathrm{Pt^{2+}}$ or $\mathrm{[Fe(CO)_6]^{2+}}$ — does $\tilde\nu(\mathrm{CO})$ rise above $2143\ \mathrm{cm^{-1}}$.

### What the infrared spectrum measures

Infrared spectroscopy reads back-donation off directly, because the stretching wavenumber depends on the bond force constant.

::: proposition Stretching wavenumber, force constant and isotope shift {#prop-harmonic}
Treating a C–O group as a harmonic oscillator of force constant $k$ and reduced mass $\mu = m_\mathrm{C}m_\mathrm{O}/(m_\mathrm{C} + m_\mathrm{O})$, its stretching wavenumber is
$$
\tilde\nu = \frac{1}{2\pi c}\sqrt{\frac{k}{\mu}} = 130.28\ \sqrt{\frac{k/(\mathrm{N\,m^{-1}})}{\mu/\mathrm{u}}}\ \mathrm{cm^{-1}},
$$ {#eq-harmonic}
with $c$ in $\mathrm{cm\,s^{-1}}$ and $\mu$ in kilograms in the first form. Isotopic substitution changes $\mu$ but not $k$ (the force constant is set by the electronic structure, which the Born–Oppenheimer approximation makes independent of the nuclear masses), so
$$
\frac{\tilde\nu'}{\tilde\nu} = \sqrt{\frac{\mu}{\mu'}}.
$$ {#eq-isotope}
The approximation treats each CO as an isolated oscillator; in a complex with several carbonyls the CO oscillators couple and give symmetric and antisymmetric combinations, but the average wavenumber still tracks the average force constant.
:::

::: proof
For a diatomic with masses $m_1$, $m_2$ and bond extension $x$, Newton's laws for the two atoms combine, in the centre-of-mass frame, into one equation for the relative coordinate, $\mu\ddot x = -kx$, with $\mu = m_1m_2/(m_1+m_2)$. Its solutions oscillate with angular frequency $\omega = \sqrt{k/\mu}$; the frequency is $\nu = \omega/2\pi$ and the wavenumber $\tilde\nu = \nu/c$, giving the first form of [[#eq-harmonic]]. Converting units, $\mu = (\mu/\mathrm{u}) \times 1.66054\times10^{-27}\ \mathrm{kg}$ and $c = 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}}$, so
$$
\frac{1}{2\pi c\sqrt{1.66054\times10^{-27}}} = \frac{1}{(1.88365\times10^{11})(4.07497\times10^{-14})} = 130.28,
$$
the numerical constant. In the quantum harmonic oscillator the same $\omega$ sets the level spacing $\hbar\omega$, so the fundamental infrared transition occurs at this wavenumber ([[spectroscopy/vibrational-spectroscopy]]). Taking the ratio of [[#eq-harmonic]] for two isotopologues with the same $k$ cancels everything but $\mu$, giving [[#eq-isotope]]. $\blacksquare$
:::

::: example How much does back-donation weaken CO? {#ex-force-constant}
Free $^{12}\mathrm{C}^{16}\mathrm{O}$ absorbs at $2143\ \mathrm{cm^{-1}}$; the infrared-active C–O stretch of $\mathrm{[Cr(CO)_6]}$ lies at about $2000\ \mathrm{cm^{-1}}$. Estimate the C–O force constant in each, and the percentage by which coordination has weakened the bond. Atomic masses $12.000$ and $15.995\ \mathrm{u}$.
::: solution
The reduced mass is $\mu = (12.000)(15.995)/27.995 = 6.856\ \mathrm{u}$. Rearranging [[#eq-harmonic]], $k = \mu(\tilde\nu/130.28)^2$:
$$
k_\text{free} = 6.856 \times \left(\frac{2143}{130.28}\right)^2 = 6.856 \times 270.6 = 1855\ \mathrm{N\,m^{-1}},
\qquad
k_\mathrm{Cr} = 6.856 \times \left(\frac{2000}{130.28}\right)^2 = 1616\ \mathrm{N\,m^{-1}}.
$$
The force constant falls by $(1855 - 1616)/1855 = 12.9\,\%$, about $13\,\%$. Since $k \propto \tilde\nu^2$, a $6.7\,\%$ fall in wavenumber is a $13\,\%$ fall in stiffness. (These are approximate force constants: the observed $T_{1u}$ band of $\mathrm{[Cr(CO)_6]}$ is a coupled vibration of all six carbonyls, and anharmonicity is neglected, but the comparison between related complexes is reliable.)
:::
:::

::: widget plot
f: 130.28*sqrt(x/m)
x: 1000, 2000
y: 1500, 2300
sliders: m=6.856:6.5:7.6:0.001
points: 1855, 2143; 1616, 2000; 1458, 1900
labels: \tilde\nu = 130.28\sqrt{k/\mu}
caption: Harmonic C–O stretching wavenumber (vertical, $\mathrm{cm^{-1}}$) against force constant $k$ (horizontal, $\mathrm{N\,m^{-1}}$), [[#eq-harmonic]], with the reduced mass $\mu$ (in u) on the slider. The marked points are $^{12}\mathrm{C}^{16}\mathrm{O}$ free ($2143$), in $\mathrm{[Cr(CO)_6]}$ ($2000$) and in a carbonyl anion ($1900\ \mathrm{cm^{-1}}$). The curve is a square root, so equal steps in wavenumber near $2000\ \mathrm{cm^{-1}}$ are roughly twice as large in relative force constant. Move $\mu$ to $7.172$ ($^{13}\mathrm{C}^{16}\mathrm{O}$) or $7.549\ \mathrm{u}$ ($^{13}\mathrm{C}^{18}\mathrm{O}$): the whole curve drops by the factor $\sqrt{\mu/\mu'}$ of [[#eq-isotope]], which is why isotope labels shift every C–O band by the same fraction.
:::

::: example Proving a band is a C–O stretch {#ex-isotope}
A band at $2143\ \mathrm{cm^{-1}}$ is assigned to the stretch of free $^{12}\mathrm{C}^{16}\mathrm{O}$. Where should it move in $^{13}\mathrm{C}^{16}\mathrm{O}$, and why is the experiment useful in organometallic chemistry?
::: solution
$\mu(^{13}\mathrm{C}^{16}\mathrm{O}) = (13.003)(15.995)/28.998 = 7.172\ \mathrm{u}$. By [[#eq-isotope]],
$$
\tilde\nu' = 2143 \times \sqrt{\frac{6.856}{7.172}} = 2143 \times 0.9777 = 2095\ \mathrm{cm^{-1}},
$$
a shift of $48\ \mathrm{cm^{-1}}$ (the observed value is $2096\ \mathrm{cm^{-1}}$). In a complex, a band that moves by about this fraction on $^{13}\mathrm{CO}$ labelling is a C–O stretch; bands that do not move belong to other groups. Labelling a single carbonyl, and seeing which bands shift, also tells which carbonyls exchange and where an incoming CO ends up — the key to the mechanistic experiments of [[organometallics-catalysis/elementary-reactions]].
:::
:::

Three regularities make carbonyl infrared spectra a routine diagnostic tool:

1. **Charge.** In an isoelectronic series, each added negative charge raises the metal $d$ level, increases back-donation and lowers $\tilde\nu(\mathrm{CO})$ by roughly $100\ \mathrm{cm^{-1}}$: $\mathrm{[V(CO)_6]^-}$ $1858$, $\mathrm{[Cr(CO)_6]}$ $2000$, $\mathrm{[Mn(CO)_6]^+}$ $2090\ \mathrm{cm^{-1}}$ (the series is plotted in [[coordination-chemistry/ligand-field-mo]]).
2. **Other ligands.** Replacing a carbonyl by a ligand that donates more and accepts less (an amine, a trialkylphosphine) leaves more metal electron density for the remaining carbonyls, whose wavenumbers fall. This is the basis of Tolman's electronic parameter below.
3. **Bridging.** A CO bridging two metals ($\mu_2$) receives back-donation from both and absorbs at about $1850$–$1750\ \mathrm{cm^{-1}}$; a face-capping $\mu_3$-CO lower still, roughly $1730$–$1620\ \mathrm{cm^{-1}}$; terminal carbonyls of neutral complexes lie roughly between $2125$ and $1850\ \mathrm{cm^{-1}}$. These ranges are empirical and overlap at the edges.

### Counting infrared bands with symmetry

The number of C–O stretching bands depends on the symmetry of the $\mathrm{M(CO)}_n$ unit, not just on $n$, which makes the infrared spectrum a quick test of geometry.

::: algorithm Number of infrared-active C–O stretches {#alg-ir-bands}
1. Find the point group of the complex ([[quantum-chemistry/molecular-symmetry]]).
2. Treat each C–O bond as a vector. For each class of symmetry operations, count the vectors left **unmoved** by the operation (a vector that is moved to another position contributes $0$; one left in place contributes $1$). This gives the characters of the reducible representation $\Gamma_\mathrm{CO}$.
3. Reduce $\Gamma_\mathrm{CO}$ with the reduction formula $n_i = \frac{1}{h}\sum_R g_R\,\chi(R)\,\chi_i(R)$, where $h$ is the group order and $g_R$ the number of operations in each class.
4. The C–O stretches belonging to irreducible representations that transform like $x$, $y$ or $z$ are **infrared active**; count them (each degenerate E or T representation gives one band).
:::

::: example *cis* or *trans*? {#ex-cis-trans}
Substituting two carbonyls of $\mathrm{[Mo(CO)_6]}$ by triphenylphosphine can give *cis*- or *trans*-$\mathrm{[Mo(CO)_4(PPh_3)_2]}$. One isomer shows a single strong C–O band, the other four. Which is which? Use [[#alg-ir-bands]], and check the method on $\mathrm{[Mo(CO)_5(PPh_3)]}$.
::: solution
**$\mathrm{M(CO)_5L}$, point group $C_{4v}$** (operations $E$, $2C_4$, $C_2$, $2\sigma_v$, $2\sigma_d$; $h = 8$). Characters of $\Gamma_\mathrm{CO}$: $E$ leaves all 5 vectors; $C_4$ leaves only the axial CO, 1; $C_2$, 1; each $\sigma_v$ contains the axial CO and two equatorial ones, 3; each $\sigma_d$ contains only the axial one, 1. So $\Gamma_\mathrm{CO} = (5, 1, 1, 3, 1)$. Reduction:
$$
n(A_1) = \tfrac18(5 + 2 + 1 + 6 + 2) = 2,\quad n(B_1) = \tfrac18(5 - 2 + 1 + 6 - 2) = 1,\quad n(E) = \tfrac18(10 + 0 - 2 + 0 + 0) = 1,
$$
and $A_2$, $B_2$ have zero coefficients. $\Gamma_\mathrm{CO} = 2A_1 + B_1 + E$. $A_1$ ($z$) and $E$ ($x, y$) are infrared active, $B_1$ is not: **three** bands, as observed for $\mathrm{M(CO)_5L}$ complexes.

***trans*-$\mathrm{M(CO)_4L_2}$, $D_{4h}$.** The four carbonyls lie in a square. The same procedure gives $\Gamma_\mathrm{CO} = A_{1g} + B_{1g} + E_u$; only $E_u$ (transforming as $x, y$) is infrared active: **one** band. The symmetric $A_{1g}$ and $B_{1g}$ stretches are Raman active only — a consequence of the centre of symmetry (the mutual exclusion rule).

***cis*-$\mathrm{M(CO)_4L_2}$, $C_{2v}$.** Characters $(4, 0, 2, 2)$ for $E$, $C_2$, $\sigma_v$, $\sigma_v'$ reduce to $2A_1 + B_1 + B_2$, all infrared active: **four** bands.

So the isomer with one band is *trans* and the one with four is *cis*. (With bulky $\mathrm{PPh_3}$ the *trans* isomer is usually the thermodynamic product.)
:::
:::

## Phosphines: tuning electrons and space

Tertiary phosphines $\mathrm{PR_3}$ are the most versatile ligands in catalysis because their two most important properties — how strongly they donate electrons, and how much space they occupy — can be varied almost independently by changing the substituents R. Phosphines are good σ donors through the phosphorus lone pair and modest π acceptors through the P–R $\sigma^*$ orbitals; electronegative substituents (aryloxy, alkoxy, F) lower those $\sigma^*$ orbitals, making $\mathrm{PF_3}$ and phosphites $\mathrm{P(OR)_3}$ π acceptors comparable with CO.

::: definition Tolman's electronic parameter and cone angle {#def-tolman}
The **Tolman electronic parameter** (TEP) of a phosphine L is the wavenumber of the $A_1$ C–O stretching band of $\mathrm{[Ni(CO)_3L]}$ in dichloromethane. A more strongly donating, less accepting L leaves more electron density for back-donation to the carbonyls and gives a *lower* TEP. Typical values (Tolman, 1977): $\mathrm{P}t\mathrm{Bu_3}$ $2056.1$, $\mathrm{PMe_3}$ $2064.1$, $\mathrm{PPh_3}$ $2068.9$, $\mathrm{P(OEt)_3}$ $2076.3$, $\mathrm{P(OMe)_3}$ $2079.5$, $\mathrm{PF_3}$ $2110.8\ \mathrm{cm^{-1}}$. Tolman found the TEP to be approximately additive in substituent contributions $\chi_i$:
$$
\mathrm{TEP} \approx 2056.1 + \sum_{i=1}^{3}\chi_i\ \ \mathrm{cm^{-1}},
$$
with, for example, $\chi(t\mathrm{Bu}) = 0$, $\chi(\mathrm{Me}) = 2.6$, $\chi(\mathrm{Ph}) = 4.3$, $\chi(\mathrm{OEt}) = 6.8$, $\chi(\mathrm{OMe}) = 7.7$, $\chi(\mathrm{F}) = 18.2$ (an empirical correlation).

The **Tolman cone angle** $\theta$ measures steric size: it is the apex angle of a cone, with its apex at the metal ($2.28\ \text{Å}$ from phosphorus in Tolman's construction), that just encloses the van der Waals surfaces of the substituents. Typical values: $\mathrm{PF_3}$ $104^\circ$, $\mathrm{P(OMe)_3}$ $107^\circ$, $\mathrm{PMe_3}$ $118^\circ$, $\mathrm{PPh_3}$ $145^\circ$, $\mathrm{PCy_3}$ $170^\circ$, $\mathrm{P}t\mathrm{Bu_3}$ $182^\circ$, $\mathrm{P(}o\text{-tolyl)}_3$ $194^\circ$.
:::

::: widget regression
points: 0,2056.1; 7.8,2064.1; 12.9,2068.9; 20.4,2076.3; 23.1,2079.5; 54.6,2110.8
degree: 1
residuals: true
x: -5, 60
y: 2050, 2115
caption: Tolman's electronic parameter $\tilde\nu(\mathrm{CO}, A_1)$ of $\mathrm{[Ni(CO)_3L]}$ (vertical, $\mathrm{cm^{-1}}$) against the sum of substituent contributions $\sum\chi_i$ (horizontal) for $\mathrm{L} = \mathrm{P}t\mathrm{Bu_3}$, $\mathrm{PMe_3}$, $\mathrm{PPh_3}$, $\mathrm{P(OEt)_3}$, $\mathrm{P(OMe)_3}$ and $\mathrm{PF_3}$ (data from Tolman's 1977 review). The least-squares line has slope $1.00$ and intercept $2056.1\ \mathrm{cm^{-1}}$ — the additivity rule of [[#def-tolman]] is nearly exact for these ligands. Drag a point to see how a single anomalous ligand would show up as a large residual; real outliers usually signal that a ligand's steric bulk has changed the geometry of the nickel complex.
:::

Cone angle and TEP together give a two-dimensional "ligand map" on which phosphines can be chosen for a catalytic job. Large cone angles favour low coordination numbers: $\mathrm{[Pd(P}t\mathrm{Bu_3)_2]}$ is a stable two-coordinate complex, and in solution it loses one phosphine to give a highly reactive monoligated $\mathrm{Pd(P}t\mathrm{Bu_3)}$, the species that activates aryl chlorides in [[organometallics-catalysis/cross-coupling]]. Small, electron-rich phosphines such as $\mathrm{PMe_3}$ stabilise high coordination numbers and high oxidation states. For **chelating diphosphines** $\mathrm{R_2P(CH_2)_nPR_2}$ the key geometric variable is the **bite angle** P–M–P: about $85^\circ$ for 1,2-bis(diphenylphosphino)ethane (dppe), about $99^\circ$ for 1,1′-bis(diphenylphosphino)ferrocene (dppf) and about $110^\circ$ for Xantphos (typical values from crystal structures and modelling; they vary with the metal). Wide bite angles favour reductive elimination and, in hydroformylation, linear aldehydes ([[organometallics-catalysis/hydrogenation-hydroformylation]]).

::: example Predicting an electronic parameter {#ex-tolman}
Use Tolman's additivity rule to estimate the TEP of dimethylphenylphosphine, $\mathrm{PMe_2Ph}$, and of methyl diphenylphosphinite, $\mathrm{Ph_2P(OMe)}$. Which is the better donor?
::: solution
$\mathrm{PMe_2Ph}$: $2056.1 + 2(2.6) + 4.3 = 2065.6\ \mathrm{cm^{-1}}$ (Tolman's measured value is $2065.3$). $\mathrm{Ph_2P(OMe)}$: $2056.1 + 2(4.3) + 7.7 = 2072.4\ \mathrm{cm^{-1}}$. The lower TEP of $\mathrm{PMe_2Ph}$ means its nickel centre back-donates more to CO, so $\mathrm{PMe_2Ph}$ is the stronger net donor; replacing an aryl by an alkoxy group makes phosphorus more electronegative-substituted, lowers its lone-pair energy (weaker σ donation) and its P–O $\sigma^*$ orbital (stronger π acceptance). The two effects push the TEP the same way.
:::
:::

N-heterocyclic carbenes (below) have TEPs around $2050\ \mathrm{cm^{-1}}$ (measured on analogous nickel or, more safely, rhodium and iridium carbonyl complexes and converted), below even $\mathrm{P}t\mathrm{Bu_3}$: they are the strongest neutral donor ligands in common use.

::: warning Lower ν(CO) does not always mean a "better" ligand {#warn-tep}
The TEP measures *net* electron donation — σ donation minus π acceptance — at one metal in one geometry. It is not a measure of how strongly the ligand is bound (CO itself has a high TEP-like wavenumber but binds very strongly to low-valent metals through back-donation), nor of how a ligand will perform in catalysis, where steric effects frequently dominate. Two ligands with the same TEP can differ completely in reactivity if one has a cone angle of $120^\circ$ and the other of $180^\circ$. Always consider electronic *and* steric parameters together, and remember both are empirical descriptors measured on model complexes.
:::

## Alkenes and alkynes

The bond in Zeise's salt is the Dewar–Chatt–Duncanson bond applied to ethene. The filled C=C π orbital donates into an empty metal σ orbital, and a filled metal $d$ orbital back-donates into the empty C=C $\pi^*$. Both effects weaken the C=C bond: σ donation removes bonding π density, back-donation adds antibonding π* density.

The two limits of the description are the **π complex**, with modest back-donation, a C=C bond only slightly longer than in the free alkene, and substituents still nearly coplanar; and the **metallacyclopropane**, with strong back-donation, a C–C bond close to a single bond, and substituents bent back away from the metal as the carbons approach $sp^3$ hybridisation. Bond lengths show the progression: free ethene $1.337\ \text{Å}$; the anion of Zeise's salt, $\mathrm{[PtCl_3(C_2H_4)]^-}$ (Pt(II), weak back-donation), about $1.375\ \text{Å}$; $\mathrm{[Pt(C_2H_4)(PPh_3)_2]}$ (electron-rich Pt(0)), about $1.43\ \text{Å}$. In the metallacyclopropane limit the electron count is unchanged (an L ligand and an X₂ "metallacycle" both give two electrons in the covalent count), but the formal oxidation state of the metal rises by two — one reason oxidation states in organometallic chemistry must be treated as formalisms ([[organometallics-catalysis/organometallic-bonding#warn-formal-os]]).

Coordination changes the chemistry of the alkene. Bound to an electron-poor, cationic metal such as Pd(II), an alkene loses π density and becomes **electrophilic**: water or an alcohol attacks it from the face opposite the metal, the key step in the Wacker oxidation of ethene to ethanal. Bound to an electron-rich metal, the alkene is protected and activated for migratory insertion into M–H or M–C bonds, the step that builds polymers and aldehydes ([[organometallics-catalysis/elementary-reactions]]). Alkynes bind similarly, but can use their second, perpendicular π system as well: they act as two-electron donors in most mononuclear complexes, as four-electron donors when a metal has a suitable empty $d$ orbital, and bridge two metals in complexes such as $\mathrm{[Co_2(CO)_6(\mu\text{-}RC{\equiv}CR)]}$, isolobal with tetrahedrane.

## Carbenes: Fischer, Schrock and N-heterocyclic

A carbene complex contains a metal–carbon double bond, $\mathrm{L_nM{=}CR_2}$. Two extreme types are distinguished, because the same formula hides opposite polarities.

::: definition Fischer and Schrock carbenes {#def-carbenes}
A **Fischer carbene** (E. O. Fischer, 1964, e.g. $\mathrm{[(CO)_5W{=}C(OMe)Ph]}$) is bound to a low-valent, late or middle transition metal with π-acceptor co-ligands, and carries a π-donor substituent (OR, $\mathrm{NR_2}$) on the carbene carbon. It is described as a singlet carbene donating its lone pair to the metal (an **L** ligand), with weak back-donation from the metal into the carbene's empty $p$ orbital; the carbene carbon is **electrophilic** and is attacked by nucleophiles (amines replace the OMe group, as esters undergo aminolysis).

A **Schrock carbene** or **alkylidene** (R. R. Schrock, 1974, e.g. $\mathrm{[Ta(CH}t\mathrm{Bu)(CH_2}t\mathrm{Bu)_3]}$) is bound to an early transition metal in a high oxidation state, with no π-acceptor co-ligands and only H or alkyl substituents on carbon. It is described as a triplet carbene forming two covalent bonds (σ and π) with two unpaired metal electrons — an **X₂** ligand — and the M=C bond is polarised $\mathrm{M^{\delta+}{=}C^{\delta-}}$: the carbon is **nucleophilic** and reacts like the carbon of a phosphorus ylide, converting ketones into alkenes.

**N-heterocyclic carbenes** (NHCs), such as 1,3-bis(2,4,6-trimethylphenyl)imidazol-2-ylidene (IMes), are singlet carbenes stabilised by two adjacent nitrogen lone pairs; they are very strong σ donors and weak π acceptors, bound as L ligands with essentially a single M–C bond, and behave as robust phosphine substitutes.
:::

The two classes of metal–carbon double bond have different jobs in catalysis. Schrock's molybdenum and tungsten alkylidenes and Grubbs's ruthenium alkylidenes carry out alkene **metathesis** ([[organometallics-catalysis/metathesis-polymerisation]]); NHCs are the ligands that made the second-generation Grubbs catalysts and many of the most active palladium cross-coupling catalysts. Counting is consistent with the formalism: $\mathrm{[(CO)_5W{=}C(OMe)Ph]}$ is W(0) with six L ligands, $6 + 12 = 18$; $\mathrm{[Ta(CH}t\mathrm{Bu)(CH_2}t\mathrm{Bu)_3]}$ is Ta(V), $d^0$, with an X₂ alkylidene and three X alkyls, $5 + 2 + 3 = 10$ — a strongly electron-deficient complex, sterically protected by its bulky neopentyl groups.

::: example Fischer or Schrock? {#ex-carbene-type}
Classify each carbene complex and predict the site of attack: (a) $\mathrm{[(CO)_5Cr{=}C(OMe)CH_3]}$ with methylamine; (b) $\mathrm{[Cp_2Ti{=}CH_2]}$ (generated from Tebbe's reagent) with a ketone $\mathrm{R_2C{=}O}$.
::: solution
(a) Cr(0), low oxidation state, five π-acceptor carbonyls and a π-donor OMe on the carbene carbon: a **Fischer carbene**. The carbene carbon is electrophilic, rather like an ester carbonyl carbon. The nitrogen lone pair of methylamine attacks the carbene carbon to form a tetrahedral intermediate; the C–OMe bond breaks and methanol is lost, giving the aminocarbene $\mathrm{[(CO)_5Cr{=}C(NHMe)CH_3]}$. The better π donor (N) replaces the poorer one (O), increasing stabilisation of the electrophilic carbon.

(b) Ti(IV), $d^0$, with Cp ligands, no π acceptors, and only H on the carbene carbon: a **Schrock alkylidene**, polarised $\mathrm{Ti^{\delta+}{=}CH_2^{\delta-}}$. The nucleophilic methylidene carbon attacks the ketone's carbonyl carbon while the oxophilic titanium binds the carbonyl oxygen, forming a four-membered oxatitanacyclobutane. This ring breaks in the other direction to give the alkene $\mathrm{R_2C{=}CH_2}$ and a very strong Ti=O bond. The reaction methylenates ketones — and even esters, which a Wittig reagent cannot — and is a [2+2] / retro-[2+2] sequence like that of metathesis.
:::
:::

## Cyclopentadienyl and arene ligands: sandwiches and half-sandwiches

The cyclopentadienyl ligand, $\mathrm{C_5H_5}$ (Cp), is the most important spectator ligand in organometallic chemistry: it occupies three coordination sites, gives five electrons (covalent count; six as $\mathrm{C_5H_5^-}$ in the ionic count), binds strongly to almost every metal, and is rarely involved in reactions itself. Its π molecular orbitals, constructed like those of benzene in [[quantum-chemistry/huckel-theory]], are one of $a$ symmetry (all in phase) and two degenerate pairs $e_1$ and $e_2$. In ferrocene the filled $a$ and $e_1$ ligand orbitals donate to the metal $d_{z^2}$/$s$ and $d_{xz}$/$d_{yz}$ orbitals, and the metal $d_{xy}$ and $d_{x^2-y^2}$ orbitals back-donate weakly into the empty $e_2$ set. Nine low-lying orbitals hold 18 electrons, and ferrocene is the textbook 18-electron molecule: orange, air-stable, sublimable, and so well behaved electrochemically that the ferrocenium/ferrocene couple is the IUPAC-recommended internal reference for potentials in non-aqueous solvents.

The other metallocenes test the 18-electron rule one electron at a time:

| metallocene | VE | unpaired electrons | behaviour |
|---|---|---|---|
| $\mathrm{Cp_2V}$ | 15 | 3 | violet, air-sensitive |
| $\mathrm{Cp_2Cr}$ | 16 | 2 | red, very air-sensitive |
| $\mathrm{Cp_2Mn}$ | 17 | 5 (high spin) | largely ionic, polymeric in the solid |
| $\mathrm{Cp_2Fe}$ | 18 | 0 | air-stable, reversibly oxidised |
| $\mathrm{Cp_2Co}$ | 19 | 1 | strong reducing agent, gives $\mathrm{Cp_2Co^+}$ (18) |
| $\mathrm{Cp_2Ni}$ | 20 | 2 | green, oxidised readily to $\mathrm{Cp_2Ni^+}$ |

Electrons beyond 18 enter a pair of metal–ring antibonding orbitals; they lengthen the M–C bonds and make the complexes easy to oxidise. Below 18, the complexes have empty bonding or non-bonding levels and are reactive towards donors and oxygen. The pentamethylcyclopentadienyl ligand $\mathrm{C_5Me_5}$ (Cp*) is a stronger donor and much bulkier than Cp, and stabilises reactive species — $\mathrm{Cp^*_2ZrMe^+}$, $\mathrm{Cp^*Ir(PMe_3)}$ — that would otherwise decompose.

**Arene** ligands bind as six-electron L₃ donors: Ernst Otto Fischer and Walter Hafner made dibenzenechromium, $\mathrm{[Cr(\eta^6\text{-}C_6H_6)_2]}$ (18 electrons), in 1955. In half-sandwich complexes such as $\mathrm{[Cr(\eta^6\text{-}C_6H_6)(CO)_3]}$ the strongly accepting $\mathrm{Cr(CO)_3}$ unit withdraws electron density from the ring, which becomes susceptible to **nucleophilic** attack and more acidic at its C–H bonds and benzylic positions — a reversal of the normal electrophilic chemistry of arenes ([[organic-2/aromatic-substitution]]).

::: example Magnetism of the metallocenes {#ex-metallocenes}
Chromocene has two unpaired electrons. Calculate its spin-only magnetic moment, and explain from the electron count why chromocene reacts readily with CO whereas ferrocene does not.
::: solution
The spin-only moment for $N$ unpaired electrons is $\mu_\text{so} = \sqrt{N(N+2)}\ \mu_\mathrm{B}$ ([[coordination-chemistry/magnetism]]), so for $N = 2$, $\mu_\text{so} = \sqrt{8} = 2.83\ \mu_\mathrm{B}$. Chromocene has $6 + 5 + 5 = 16$ electrons (Cr(II), $d^4$): the two lowest metal-based levels are occupied, but one orbital of the bonding/non-bonding set is incompletely filled, so the complex is coordinatively and electronically unsaturated and can accept a two-electron donor. Ferrocene, with 18 electrons, has all nine low-lying orbitals full; a further ligand would have to place electrons in metal–ligand antibonding orbitals, so ferrocene shows no tendency to bind CO and its chemistry is that of the rings (it undergoes electrophilic substitution, like a very electron-rich arene).
:::
:::

## Hydrides and dihydrogen complexes

A metal hydride M–H is an X ligand; its $^{1}\mathrm{H}$ NMR signal appears at unusually low chemical shift, typically between $\delta\ 0$ and $-25$, because of shielding by the metal's $d$ electrons — a diagnostic tool for catalytic intermediates. In 1984 Gregory Kubas and co-workers found that $\mathrm{[W(CO)_3(P}i\mathrm{Pr_3)_2]}$ binds molecular hydrogen *without* breaking it: the complex $\mathrm{[W(CO)_3(P}i\mathrm{Pr_3)_2(\eta^2\text{-}H_2)]}$ contains an H–H bond only slightly longer than in free $\mathrm{H_2}$ ($0.74\ \text{Å}$ in the free molecule; about $0.8$–$0.9\ \text{Å}$ in such complexes), bound side-on as an L ligand. The dihydrogen ligand is a σ donor from the H–H bonding orbital and a π acceptor into the H–H $\sigma^*$ orbital; as back-donation increases the H–H bond stretches continuously until it breaks and the complex becomes a *dihydride* — the oxidative addition of [[organometallics-catalysis/elementary-reactions]] caught at an intermediate stage. Dihydrogen complexes are distinguished from dihydrides by short $T_1$ NMR relaxation times and by a large H–D coupling constant in the HD isotopomer (tens of hertz, compared with $43\ \mathrm{Hz}$ in free HD and a few hertz in a dihydride).

::: quiz
Three complexes of formula $\mathrm{[ML(CO)_5]}$ show their highest-wavenumber C–O band at $2120$, $2080$ and $2050\ \mathrm{cm^{-1}}$. The ligands L are $\mathrm{PF_3}$, $\mathrm{PPh_3}$ and $\mathrm{PMe_3}$, in some order. Which assignment is consistent with Tolman's electronic parameters?
- [x] $\mathrm{PF_3}$ $2120$, $\mathrm{PPh_3}$ $2080$, $\mathrm{PMe_3}$ $2050$
- [ ] $\mathrm{PMe_3}$ $2120$, $\mathrm{PPh_3}$ $2080$, $\mathrm{PF_3}$ $2050$
- [ ] $\mathrm{PPh_3}$ $2120$, $\mathrm{PF_3}$ $2080$, $\mathrm{PMe_3}$ $2050$
::: solution
The strongest net donor leaves the most electron density for back-donation into the remaining carbonyls and so gives the lowest wavenumber: $\mathrm{PMe_3}$ (TEP $2064.1$) < $\mathrm{PPh_3}$ ($2068.9$) < $\mathrm{PF_3}$ ($2110.8$). $\mathrm{PF_3}$ is a π acceptor comparable with CO and competes with the carbonyls for back-donation, raising their wavenumbers.
:::
:::

## Where this leads

The ligands of this chapter are the tools for everything that follows. CO and phosphines appear in every catalytic cycle of [[organometallics-catalysis/hydrogenation-hydroformylation]] — the rate of hydroformylation is controlled by phosphine dissociation, and its selectivity by the bite angle. Alkene binding and its metallacyclopropane limit are the starting point for migratory insertion in [[organometallics-catalysis/elementary-reactions]]; Schrock and Grubbs alkylidenes run metathesis, and Cp ligands frame the metallocene polymerisation catalysts in [[organometallics-catalysis/metathesis-polymerisation]]. Bulky, electron-rich phosphines and NHCs are what made cross-coupling of aryl chlorides practical ([[organometallics-catalysis/cross-coupling]]). The infrared and NMR methods used here are developed in [[spectroscopy/vibrational-spectroscopy]] and [[spectroscopy/nmr-principles]].

::: history
The first metal carbonyl, $\mathrm{[Ni(CO)_4]}$, was found by Ludwig Mond and co-workers in 1890, and Walter Hieber's systematic studies of carbonyl hydrides and anions from the 1920s onwards established the field. Michael Dewar (1951) and Joseph Chatt and Leonard Duncanson (1953) proposed the synergic model of alkene bonding. Ernst Otto Fischer and Walter Hafner reported dibenzenechromium in 1955, and Fischer and Alfred Maasböl the first carbene complex, $\mathrm{[(CO)_5W{=}C(OMe)Ph]}$, in 1964. Karl Öfele and Hans-Werner Wanzlick independently prepared the first metal complexes of N-heterocyclic carbenes in 1968; Anthony Arduengo isolated a stable free NHC in 1991. Richard Schrock reported the first alkylidene complex of tantalum in 1974. Chadwick Tolman's 1977 review in *Chemical Reviews* introduced the electronic parameter and the cone angle that are still used to choose phosphines, and Gregory Kubas's group described the first dihydrogen complex in 1984.
:::

::: summary
- CO, alkenes, alkynes, phosphines and $\mathrm{H_2}$ bind synergically: σ donation to the metal and π back-donation into an empty ligand orbital ($\pi^*$ or $\sigma^*$), which weakens the bond within the ligand.
- $\tilde\nu(\mathrm{CO})$ reports back-donation: it falls with negative charge (about $100\ \mathrm{cm^{-1}}$ per unit), with more donating co-ligands, and on bridging; $k = \mu(\tilde\nu/130.28)^2$ and $\tilde\nu'/\tilde\nu = \sqrt{\mu/\mu'}$ for isotopic labels.
- The number of infrared-active C–O stretches follows from symmetry: $\mathrm{M(CO)_5L}$ 3, *trans*-$\mathrm{M(CO)_4L_2}$ 1, *cis* 4.
- Phosphines are tuned independently by electronics (Tolman electronic parameter, additive in substituents) and sterics (cone angle; bite angle for chelates); both are empirical descriptors.
- Alkene binding ranges from a π complex to a metallacyclopropane; coordinated alkenes on electron-poor metals are electrophilic.
- Fischer carbenes (low-valent, π-donor substituent) are electrophilic L ligands; Schrock alkylidenes (high-valent early metals) are nucleophilic X₂ ligands; NHCs are very strong σ donors.
- Ferrocene is the archetypal 18-electron sandwich; metallocenes with 15–20 electrons show the consequences of empty or antibonding levels. Dihydrogen complexes are arrested oxidative additions.
:::

## Exercises

::: exercise A doubly labelled carbonyl {level=1 check="2042"}
Free $^{12}\mathrm{C}^{16}\mathrm{O}$ absorbs at $2143\ \mathrm{cm^{-1}}$. Predict the wavenumber of $^{13}\mathrm{C}^{18}\mathrm{O}$ (atomic masses $13.003$ and $17.999\ \mathrm{u}$) in the harmonic approximation. (Enter the wavenumber in $\mathrm{cm^{-1}}$, to four significant figures.)
::: solution
$\mu(^{13}\mathrm{C}^{18}\mathrm{O}) = (13.003)(17.999)/31.002 = 7.549\ \mathrm{u}$, and $\mu(^{12}\mathrm{C}^{16}\mathrm{O}) = 6.856\ \mathrm{u}$. By [[#eq-isotope]], $\tilde\nu' = 2143\sqrt{6.856/7.549} = 2143 \times 0.9530 = 2042\ \mathrm{cm^{-1}}$.
:::
:::

::: exercise IR bands of a *fac* tricarbonyl {level=1 check="2"}
How many infrared-active C–O stretching bands do you expect for *fac*-$\mathrm{[Mo(CO)_3(PMe_3)_3]}$ (point group $C_{3v}$)? (Enter the number of bands.)
::: solution
The three C–O vectors give characters $(3, 0, 1)$ for $E$, $2C_3$, $3\sigma_v$, which reduce to $A_1 + E$; both are infrared active, so **two** bands. The *mer* isomer ($C_{2v}$) gives $2A_1 + B_1$ (or $B_2$), all active: three bands, a quick way to tell the isomers apart.
:::
:::

::: exercise Cobaltocene {level=1 check="19"}
Count the valence electrons of cobaltocene, $\mathrm{[Co(\eta^5\text{-}C_5H_5)_2]}$. (Enter the count.)
::: solution
$9 + 5 + 5 = 19$ (Co(II), $d^7$). The nineteenth electron occupies a metal–ring antibonding orbital; cobaltocene is a powerful one-electron reducing agent because oxidation gives the 18-electron cobaltocenium cation.
:::
:::

::: exercise Electronic parameter of a phosphinite {level=2 check="2072.4"}
Use Tolman's additivity rule ($2056.1 + \sum\chi_i$, with $\chi(\mathrm{Ph}) = 4.3$, $\chi(\mathrm{OMe}) = 7.7$) to estimate the TEP of $\mathrm{Ph_2P(OMe)}$. (Enter the wavenumber in $\mathrm{cm^{-1}}$.)
::: solution
$2056.1 + 4.3 + 4.3 + 7.7 = 2072.4\ \mathrm{cm^{-1}}$, between $\mathrm{PPh_3}$ ($2068.9$) and $\mathrm{P(OMe)_3}$ ($2079.5$). Each alkoxy substituent shifts the TEP up by about $3.4\ \mathrm{cm^{-1}}$ relative to phenyl.
:::
:::

::: exercise A strongly back-bonded carbonyl {level=2 check="1458"}
A terminal carbonyl in a metal carbonyl anion absorbs at $1900\ \mathrm{cm^{-1}}$. Estimate its C–O force constant with $\mu = 6.856\ \mathrm{u}$, and compare it with free CO ($1855\ \mathrm{N\,m^{-1}}$). (Enter the force constant in $\mathrm{N\,m^{-1}}$.)
::: solution
$k = 6.856 \times (1900/130.28)^2 = 6.856 \times 212.7 = 1458\ \mathrm{N\,m^{-1}}$, about $21\,\%$ below free CO. The extra negative charge has pushed substantial electron density into the CO $2\pi^*$ orbitals. (Harmonic, uncoupled estimate.)
:::
:::

::: exercise Chromocene's moment {level=2 check="2.83"}
Chromocene has two unpaired electrons. What is its spin-only magnetic moment? (Enter $\mu_\text{so}$ in Bohr magnetons, to three significant figures.)
::: solution
$\mu_\text{so} = \sqrt{N(N+2)} = \sqrt{2 \times 4} = \sqrt{8} = 2.83\ \mu_\mathrm{B}$. The measured moment is close to this, consistent with the 16-electron $d^4$ configuration with two unpaired electrons.
:::
:::

::: exercise IR bands of a *cis* disubstituted carbonyl {level=3 check="4"}
Derive the number of infrared-active C–O stretching bands of *cis*-$\mathrm{[Mo(CO)_4(PPh_3)_2]}$ in $C_{2v}$, showing the characters of $\Gamma_\mathrm{CO}$ and the reduction. Take the $C_2$ axis to bisect the P–Mo–P angle; the plane $\sigma_v(xz)$ contains Mo and the two carbonyls *trans* to phosphorus, and $\sigma_v'(yz)$ contains Mo and the two mutually *trans* carbonyls. (Enter the number of bands.)
::: hint
$C_{2v}$ character table: $A_1$ $(1,1,1,1)$ $z$; $A_2$ $(1,1,-1,-1)$; $B_1$ $(1,-1,1,-1)$ $x$; $B_2$ $(1,-1,-1,1)$ $y$.
:::
::: solution
Operation by operation: $E$ leaves all four CO vectors, $\chi = 4$. The $C_2$ axis passes through no carbonyl (it bisects P–Mo–P and the angle between the two carbonyls *trans* to P), so every CO moves: $\chi = 0$. $\sigma_v(xz)$ contains the two carbonyls *trans* to phosphorus: $\chi = 2$. $\sigma_v'(yz)$ contains the two mutually *trans* carbonyls: $\chi = 2$. So $\Gamma_\mathrm{CO} = (4, 0, 2, 2)$. With $h = 4$:
$$
\begin{aligned}
n(A_1) &= \tfrac14(4 + 0 + 2 + 2) = 2, & n(A_2) &= \tfrac14(4 + 0 - 2 - 2) = 0,\\
n(B_1) &= \tfrac14(4 - 0 + 2 - 2) = 1, & n(B_2) &= \tfrac14(4 - 0 - 2 + 2) = 1.
\end{aligned}
$$
$\Gamma_\mathrm{CO} = 2A_1 + B_1 + B_2$; $A_1$ ($z$), $B_1$ ($x$) and $B_2$ ($y$) are all infrared active, so **four** bands. (Which $B$ is which depends on the axis convention, but the total does not.)
:::
:::

::: exercise Reading an alkene complex {level=3}
The C=C bond length of the alkene in three platinum complexes is measured: $\mathrm{[PtCl_3(C_2H_4)]^-}$ $1.375\ \text{Å}$; $\mathrm{[Pt(C_2H_4)(PPh_3)_2]}$ $1.43\ \text{Å}$; and a complex of tetrafluoroethene with $\mathrm{Pt(PPh_3)_2}$, in which the C–C distance is close to a single bond. (a) Explain the trend using the Dewar–Chatt–Duncanson model. (b) How would you expect the $^{13}\mathrm{C}$ NMR chemical shift of the alkene carbons and the angle between the C–H (or C–F) bonds and the C–C axis to change along the series? (c) What is the formal oxidation state of platinum in the third complex if it is described as a metallacyclopropane, and does the valence electron count change?
::: solution
(a) In Zeise's anion platinum is Pt(II), $d^8$, with three π-donor chlorides and a negative charge spread over a fairly contracted metal: σ donation from ethene dominates and back-donation is weak, so the C=C bond lengthens only slightly from $1.337\ \text{Å}$. In $\mathrm{[Pt(C_2H_4)(PPh_3)_2]}$ the metal is Pt(0), $d^{10}$, with two strong σ-donor phosphines: its filled $d$ orbitals are high in energy and back-donate strongly into the ethene $\pi^*$ orbital, lengthening C=C to $1.43\ \text{Å}$. Tetrafluoroethene has a much lower $\pi^*$ orbital (fluorine is strongly electron-withdrawing), so it accepts still more back-donation and the C–C bond approaches a single bond: the metallacyclopropane limit.

(b) As back-donation increases, the alkene carbons rehybridise from $sp^2$ towards $sp^3$. Their $^{13}\mathrm{C}$ signals move markedly to lower chemical shift (upfield, towards the region of $sp^3$ carbons), and the substituents bend back away from the metal, so the angle between the C–H (C–F) bonds and the C–C axis decreases from about $120^\circ$ towards the tetrahedral $109.5^\circ$ — and the substituents are no longer coplanar with the C–C bond.

(c) As a metallacyclopropane, the $\mathrm{C_2F_4}$ unit is a dianionic X₂ ligand forming two Pt–C σ bonds, so platinum is formally Pt(II), $d^8$, rather than Pt(0). The valence electron count is unchanged: in the covalent method an L ligand gives 2 electrons and an X₂ ligand gives $1 + 1 = 2$, so $\mathrm{VE} = 10 + 4 + 2 = 16$ either way. The two descriptions are limits of one continuum; the formal oxidation state changes with the description, the electron count does not.
:::
:::
