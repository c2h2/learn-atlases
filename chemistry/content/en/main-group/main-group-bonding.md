The octet rule is the most successful lie in chemistry. It works beautifully for the second period — methane, ammonia, water, the fluorocarbons — and then the table keeps going, and the heavier main-group elements proceed to break it in three systematic directions: too few electrons (borane, $\mathrm{BF_3}$), too many by the counting rules ($\mathrm{SF_6}$, $\mathrm{XeF_2}$, $\mathrm{I_3^-}$), and too few orbitals for the multiple bonds the counting rules demand ($\mathrm{SiO_2}$ refuses to be molecular). This chapter shows that all three failures have the same cure: stop counting electron *pairs between two atoms* and start building molecular orbitals over three or more. A three-centre bond is not an exotic exception — it is the ordinary quantum mechanics of electrons shared by three nuclei, and once you can draw its orbitals, hypervalence, diborane, the weakness of silicon–silicon double bonds and the whole "double-bond rule" fall out as one story. The molecular-orbital machinery used here is that of [[bonding-structure/molecular-orbitals]]; the shapes it predicts are read with the VSEPR rules of [[bonding-structure/vsepr]].

## Electron bookkeeping and its three failures

::: definition The three ways to break the octet {#def-electron-count}
A main-group centre can depart from eight valence electrons in exactly three ways. It can be **electron-deficient** — fewer electrons than needed for two-centre bonds to all neighbours ($\mathrm{BH_3}$, 6 electrons; $\mathrm{BeH_2}$, 4). $\mathrm{Al_2Cl_6}$ only looks short if each bridge is drawn as a two-centre bond: the bridges are $3c$–$4e$ dative chloride links, and each aluminium has an octet. It can be **hypervalent** — more than eight electrons assigned by the ionic counting rules ($\mathrm{PF_5}$: 10; $\mathrm{SF_6}$: 12; $\mathrm{XeF_2}$: 10; $\mathrm{I_3^-}$: 10 on the central iodine). Or it can be **odd-electron** — an odd total ($\mathrm{NO}$, $\mathrm{NO_2}$, $\mathrm{ClO_2}$), which we treat as a limiting case of the first two. The classical fix was to "expand the octet" with $d$ orbitals; the modern fix, supported by every calculation since the 1970s, is **multicentre bonding**: the extra electron pairs occupy orbitals spread over three or more atoms, and $d$ orbitals play no significant role.
:::

The evidence against $d$-orbital participation is quantitative: the $3d$ orbitals on third-period centres (P, S, Cl) lie too high to mix strongly with ligand $2p$ orbitals. Population analyses of $\mathrm{SF_6}$ put a large *positive* charge on sulfur (about $+2.5$) and negative charge on the fluorines; the $3d$ population itself is only a few tenths of an electron, and the molecule is still well described when $d$ functions are left out. The counting rules survive as *bookkeeping*; the physics is multicentre bonding.

## Hypervalence: the three-centre four-electron bond

::: proposition The three-centre four-electron bond {#prop-3c4e}
When a central atom $M$ binds two collinear ligands $L$ and possesses one valence orbital and two electrons' worth of "extra" capacity, the three atomic orbitals ($L$, $M$, $L$) combine into three molecular orbitals: a bonding combination, a **non-bonding** combination localised on the two terminal atoms, and an antibonding combination. Four electrons fill the first two. The result is **one net bond spread over two links**: each $M{-}L$ link is longer and weaker than an ordinary two-centre bond, the molecule is linear at the centre, and the highest occupied orbital — the non-bonding one, with electron density only on the terminals — is the reactive, basic site.
:::

::: proof The three-orbital model {#proof-3c}
Take three collinear orbitals $\phi_1, \phi_2, \phi_3$ (terminal, central, terminal) with nearest-neighbour resonance integral $\beta < 0$ in the Hückel approximation. The secular determinant gives energies
$$
E = \alpha + \sqrt{2}\,\beta,\qquad E = \alpha,\qquad E = \alpha - \sqrt{2}\,\beta,
$$
with coefficients $\psi_1 = \tfrac{1}{2}\phi_1 + \tfrac{\sqrt{2}}{2}\phi_2 + \tfrac{1}{2}\phi_3$ (bonding), $\psi_2 = \tfrac{1}{\sqrt{2}}(\phi_1 - \phi_3)$ (non-bonding: it has a node *through* the central atom), and $\psi_3$ antibonding. Filling four electrons, the total three-centre energy (a $\sigma$ framework here; the allyl system is the $\pi$ analogue with the same secular equation) is
$$
2(\alpha + \sqrt{2}\beta) + 2\alpha = 4\alpha + 2\sqrt{2}\,\beta ,
$$
whereas two ordinary two-centre bonds would give $2 \times 2(\alpha + \beta) = 4\alpha + 4\beta$. Since $\beta$ is negative, $2\sqrt{2}\beta > 4\beta$: the three-centre arrangement is **less** stabilised than two normal bonds — hypervalent bonds are intrinsically weak — but it is far more stabilised than one bond plus a lone pair on an under-coordinated centre, which is why $\mathrm{XeF_2}$ forms at all. The four electrons constitute one bond shared by two links, and $\psi_2$'s density sits entirely on the terminal atoms.
:::

::: widget plot
f: 0*x
x: 0, 10
y: -2.2, 2.2
hlines: -1.414; 0; 1.414
labels: \text{three-centre levels}
caption: The three molecular orbitals of the collinear three-centre unit. The vertical axis is energy in units of $|\beta|$ measured upward from $\alpha$. Because $\beta < 0$, the bonding level $\alpha+\sqrt{2}\beta$ lies at $-\sqrt{2}$, the non-bonding level at $0$ and the antibonding level $\alpha-\sqrt{2}\beta$ at $+\sqrt{2}$ (the horizontal axis is only a label). Four electrons fill the two lower levels and leave the antibonding level empty — the definition of the three-centre four-electron bond. The non-bonding orbital has a node at the central atom, so those electrons sit on the terminals: hypervalent fluorides such as $\mathrm{XeF_2}$ are fluorine-atom donors and good fluorinating agents.
:::

::: example Three species, one bond {#ex-3c-species}
$\mathrm{XeF_2}$ (linear, $\mathrm{Xe{-}F}\ 200\ \mathrm{pm}$), $\mathrm{I_3^-}$ (linear, $\mathrm{I{-}I}\ 290\ \mathrm{pm}$ against $267\ \mathrm{pm}$ in $\mathrm{I_2}$) and $\mathrm{HF_2^-}$ (symmetric, $\mathrm{F{-}H}$ about $114\ \mathrm{pm}$, $\mathrm{F\cdots F}$ about $227\ \mathrm{pm}$) look unrelated. Show that they are the same bond.
::: solution
Each is an $\mathrm{L{-}M{-}L}$ unit with four electrons in the three collinear orbitals: for $\mathrm{XeF_2}$, xenon's $5p$ orbital with its two electrons plus one electron from each fluorine; for $\mathrm{I_3^-}$, the central $\mathrm{I^+}$-like $5p$ pair plus one from each $\mathrm{I}$; for $\mathrm{HF_2^-}$, the $\mathrm{F{-}H}$ bond pair plus the fluoride lone pair donated into the $\mathrm{H\ 1s}$ — a three-centre bond with hydrogen in the middle. $\mathrm{XeF_2}$ and $\mathrm{I_3^-}$ are linear because they are $\mathrm{AX_2E_3}$: three lone pairs (the central $s$ pair and the two unused $p$ orbitals) sit equatorial, and the $3c$–$4e$ non-bonding orbital is on the *terminal* atoms, not a lone pair in two central $p$ orbitals. $\mathrm{HF_2^-}$ has no central lone pair; it is linear because the three-centre orbital is built on $\mathrm{H\ 1s}$. The links are long for the same reason — half a bond each ($290 > 267\ \mathrm{pm}$ in $\mathrm{I_3^-}$; $114\ \mathrm{pm}$ in $\mathrm{HF_2^-}$ against about $92\ \mathrm{pm}$ in free HF). The terminals are the reactive sites: $\mathrm{I_3^-}$ releases $\mathrm{I_2}$, $\mathrm{XeF_2}$ transfers $\mathrm{F}$ or $\mathrm{F^-}$, and $\mathrm{HF_2^-}$ is why anhydrous HF is such an unusual solvent. One orbital picture, three chapters of descriptive chemistry.
:::
:::

::: example Sulfur hexafluoride: twelve electrons, six equivalent bonds {#ex-sf6}
$\mathrm{SF_6}$ has six identical $\mathrm{S{-}F}$ bonds ($156.4\ \mathrm{pm}$) and is chemically almost inert. How does the three-centre picture give six equivalent bonds, and where does the "12-electron octet-breaking" go?
::: solution
Build symmetry-adapted combinations of the six fluorine orbitals ($a_{1g} + e_g + t_{1u}$). Sulfur's $3s$ and $3p$ match $a_{1g}$ and $t_{1u}$ only; there is no sulfur valence orbital of $e_g$ symmetry, so those four electrons stay ligand non-bonding. Only the $a_{1g}$ and $t_{1u}$ combinations — eight electrons — are strongly bonding, and their antibonding partners are empty. That is why $\mathrm{SF_6}$ is coordinatively saturated and, with the $\mathrm{S{-}F}$ bonds shielded inside a fluorine cage, kinetically inert. The "12 electrons around sulfur" is a bookkeeping artefact of assigning bonding pairs to sulfur; the density has sulfur positive (about $+2.5$) and each bond polar, and the octet is not so much expanded as never applied. Compare $\mathrm{PF_5}$ (trigonal bipyramidal, two bond lengths — axial bonds are the weaker three-centre-type links) and $\mathrm{SF_4}$ (seesaw: one $\mathrm{AX_4E}$ site of VSEPR occupied by the lone pair).
:::
:::

::: warning "Expanded octet" is bookkeeping, not mechanism {#warn-dorbitals}
Two mistakes haunt this topic. The first is to say that sulfur "uses its $3d$ orbitals to expand its octet": quantitative calculations put the $d$-orbital population of $\mathrm{SF_6}$ near the non-bonding baseline, and the old hybridisation story $sp^3d^2$ is dead — but the phrase survives in older textbooks, so recognise it when you meet it. The second is to conclude that because the octet is not literally expanded, hypervalent molecules are not really bonded — they are, and their bond orders, lengths and vibrational frequencies are all consistent with the three-centre four-electron model above. The correct sentence is: *a hypervalent link is a four-electron three-centre bond (one bonding pair and one non-bonding pair); an electron-deficient bridge such as diborane's is the two-electron version. The octet rule is a two-centre approximation that fails quietly rather than loudly.*
:::

## Electron deficiency: the three-centre two-electron bond

::: definition Diborane and the $\mathrm{B{-}H{-}B}$ bridge {#def-3c2e}
$\mathrm{B_2H_6}$ has twelve valence electrons, exactly the count for four terminal two-centre $\mathrm{B{-}H}$ bonds (eight electrons) plus two three-centre bridges (four electrons). A picture that also drew a two-centre $\mathrm{B{-}B}$ bond would need fourteen electrons and seven links; diborane has neither the extra pair nor that bond. It solves the connectivity by **bridging**: two hydrogens sit between the borons, each held by a **three-centre two-electron bond** (one $\mathrm{B\ 2p}$ hybrid from each boron plus the H $1s$, three orbitals, two electrons in the lowest combination). The structure has four terminal $\mathrm{B{-}H}$ bonds ($119\ \mathrm{pm}$, normal) and two bridges ($133\ \mathrm{pm}$, longer; bridge bond enthalpy about $290\ \mathrm{kJ\,mol^{-1}}$ against about $385$ terminal). Each boron is surrounded by four electron pairs — an octet — achieved without any two-centre $\mathrm{B{-}B}$ bond.
:::

The same bond type explains beryllium hydride (chains of $\mathrm{BeH_4}$ units sharing edges), the solid hydrides $\mathrm{BeH_2}$ and $\mathrm{AlH_3}$, and — with lone-pair donors replacing hydrides — the **three-centre four-electron** chloride bridges of $\mathrm{Al_2Cl_6}$ (terminal $\mathrm{Al{-}Cl}$ about $206\ \mathrm{pm}$; the four bridge bonds are equal, about $225\ \mathrm{pm}$ in the gas), where each bridge is a chloride lone pair donated into aluminium's empty $3p$ orbital: a dative bond that is three-centre because aluminium has nowhere else to put it.

::: proposition Wade's rules {#prop-wade}
For borane clusters $\mathrm{B_nH_{n+m}}$ (and carboranes, where a $\mathrm{CH}$ unit contributes one skeletal electron more than $\mathrm{BH}$), count the **skeletal electrons**, then halve the sum to get pairs: each $\mathrm{BH}$ (or $\mathrm{CH^+}$-equivalent) vertex contributes $2$ electrons, each extra hydrogen contributes $1$, and each negative charge contributes $1$. Those increments are electrons, not pairs. Then
$$
\text{skeletal pairs} = \begin{cases} n+1 & \text{closo (closed polyhedron)}\\ n+2 & \text{nido (nest: one vertex missing)}\\ n+3 & \text{arachno (web: two vertices missing)} \end{cases}
$$
The rule works because the skeletal framework of a deltahedron needs exactly $n+1$ pairs for its three-dimensional bonding (one radial and the delocalised tangential set), and removing vertices requires adding pairs to cap the open face.
:::

::: example Counting skeletal electron pairs {#ex-wade-count}
Classify $\mathrm{B_2H_6}$, $\mathrm{B_5H_9}$, $\mathrm{B_6H_6^{2-}}$ and $\mathrm{B_4H_{10}}$.
::: solution
$\mathrm{B_2H_6}$: $2 \times 2 + 4 \times 1 = 8$ electrons $= 4$ pairs $= n+2$ → **nido**. For $n = 2$ the parent closo polyhedron is a triangle, and nido removes one vertex. An octahedron missing two vertices is the arachno description, and it belongs to $\mathrm{B_4H_{10}}$, not to diborane. $\mathrm{B_5H_9}$: $5 \times 2 + 4 = 14 \to 7 = 5+2$ → **nido** (square pyramid, from the octahedron). $\mathrm{B_6H_6^{2-}}$: $6 \times 2 + 2 = 14 \to 7 = 6+1$ → **closo** (octahedron — and indeed the stable octahedral closo-borate dianion). $\mathrm{B_4H_{10}}$: $4 \times 2 + 6 = 14 \to 7 = 4+3$ → **arachno** (butterfly). The beauty of the rule is that one arithmetic line predicts a *structure class* for a formula you have never seen; carboranes $\mathrm{C_2B_6H_8}$ ($2\times3 + 6\times2 = 18 \to 9 = 8+1$, closo) confirmed it spectacularly.
:::
:::

::: widget graph
nodes: B1; B2; Ht1; Ht2; Ht3; Ht4; Hb1; Hb2
edges: B1-Ht1; B1-Ht3; B2-Ht2; B2-Ht4; B1-Hb1; B2-Hb1; B1-Hb2; B2-Hb2
algorithm: none
caption: The skeleton of diborane: four terminal $\mathrm{B{-}H}$ bonds (ordinary two-centre bonds, eight electrons) and two bridging hydrogens. Each bridge is one three-centre two-electron bond, drawn as the two edges of a $\mathrm{B{-}H_b{-}B}$ triangle but holding only one pair. Twelve valence electrons in all, and no $\mathrm{B{-}B}$ bond.
:::

## The double-bond rule: why heavier elements keep it simple

::: proposition The double-bond rule {#prop-double-bond-rule}
Elements below the second period form progressively weaker $\pi$ bonds, because $np$–$np$ overlap falls off steeply with the size of the $p$ orbitals (a $\pi$ bond needs side-on contact at a distance that grows with $n$). The empirical content: in the second period the $\pi$ increment is large — $\mathrm{C{=}C}$ ($602$) falls a little short of two $\mathrm{C{-}C}$ bonds ($2 \times 346 = 692$), while $\mathrm{C{=}O}$ ($799$) beats two $\mathrm{C{-}O}$ ($716$) and $\mathrm{N{\equiv}N}$ ($945$) beats three $\mathrm{N{-}N}$ ($489$) — so multiple bonding often wins. Below the second period the multiple bond falls far short of the single bonds it would replace, and networks win. Hence $\mathrm{CO_2}$ is a small doubly-bonded molecule and $\mathrm{SiO_2}$ a single-bonded network; $\mathrm{N_2}$ is a triple-bonded gas and phosphorus a $\mathrm{P_4}$ solid; alkenes are routine and disilenes exotic.
:::

The numbers make the rule visible. Bond enthalpies ($\mathrm{kJ\,mol^{-1}}$): $\mathrm{C{-}C}\ 346$, $\mathrm{C{=}C}\ 602$ (ratio to single: $1.74$); $\mathrm{Si{-}Si}\ 226$, $\mathrm{Si{=}Si}$ about $310$ ($1.37$); $\mathrm{C{-}O}\ 358$, $\mathrm{C{=}O}\ 799$ ($2.23$); $\mathrm{Si{-}O}\ 452$, $\mathrm{Si{=}O}$ about $640$ ($1.42$); $\mathrm{N{-}N}\ 163$, $\mathrm{N{\equiv}N}\ 945$ ($5.8$ — the triple bond is a fortune, and nitrogen's chemistry is its spending); $\mathrm{P{-}P}\ 201$, $\mathrm{P{=}P}$ about $310$ ($1.5$). Two single bonds to electronegative neighbours beat one double bond for every third-period element — which is the whole of silicon's chemistry in one inequality.

::: example Carbon dioxide versus silicon dioxide {#ex-co2-sio2}
Predict and justify the structures and standard states of the oxides of carbon and silicon, using the bond enthalpies above.
::: solution
Count bonds per $\mathrm{EO_2}$. The molecule has two double bonds; the network has four single bonds. For carbon: $2 \times 799 = 1598\ \mathrm{kJ\,mol^{-1}}$ against $4 \times 358 = 1432$, so the molecule is ahead by $166\ \mathrm{kJ\,mol^{-1}}$ and $\mathrm{CO_2}$ is a gas. For silicon: $2 \times 640 = 1280$ against $4 \times 452 = 1808$, so the network is ahead by $528\ \mathrm{kJ\,mol^{-1}}$. Halving each $\mathrm{Si{-}O}$ because the oxygen is shared would count the same sharing twice. Silica is a giant $\mathrm{SiO_4}$ tetrahedral solid, melting near $1700\ \mathrm{^\circ C}$, where $\mathrm{CO_2}$ sublimes at $-78\ \mathrm{^\circ C}$. The same inequality explains why silicon surfaces in air are *covered* by irreducible oxide (silicon's love of single bonds to oxygen is what makes it the foundation of the electronics industry) and why siloxane $\mathrm{Si{-}O{-}Si}$ chains — the silicones — are the default silicon polymers.
:::
:::

::: example Catenation: how far does each element chain? {#ex-catenation}
Carbon chains run to millions of atoms; silicon hydrides stop around $\mathrm{Si_{14}H_{30}}$; the heavier analogues are rare. Explain with bond enthalpies, and predict the chemistry of the $\mathrm{Si{-}Si}$ bond.
::: solution
Compare the chain bond to the bond the chain would form with the common reagent. $\mathrm{C{-}C}\ 346$ versus $\mathrm{C{-}O}\ 358$: nearly equal, so hydrocarbons are kinetically stable to air (the $\mathrm{C{-}H}$ and $\mathrm{C{-}C}$ bonds need activation to break). $\mathrm{Si{-}Si}\ 226$ versus $\mathrm{Si{-}O}\ 452$: replacing one $\mathrm{Si{-}Si}$ link by two $\mathrm{Si{-}O}$ links ($2 \times 452 = 904\ \mathrm{kJ\,mol^{-1}}$, the $\mathrm{Si{-}O{-}Si}$ unit) releases enormous energy, so catenation in silicon is *thermodynamically losing* — silanes fume in air and ignite, and silicon chains are capped by oxygen the moment they are exposed. The prediction is exact and useful: **$\mathrm{Si{-}Si}$ bonds are the reactive handles of silicon chemistry** (reduction of $\mathrm{SiCl_4}$ gives mixtures of chlorosilanes precisely because $\mathrm{Si{-}Si}$ formation competes). Long $\mathrm{Si{-}Si}$ chains are made only by protecting every position with organic groups — the polysilanes. Silicones are the $\mathrm{Si{-}O{-}Si}$ polymers, not silicon-silicon chains.
:::
:::

::: warning Do not rescue the octet with dπ–pπ back-bonding {#warn-dpi}
Older books explain the planarity of amides of silicon and phosphorus, the short $\mathrm{Si{-}N}$ bonds in silazanes and the strength of the $\mathrm{P{=}O}$ linkage by $d\pi{-}p\pi$ donation of a lone pair into empty $d$ orbitals. Modern calculations reject significant $d$-orbital occupation; the effects are instead **negative hyperconjugation** (lone-pair donation into $\sigma^*$ orbitals of neighbouring bonds), simple electrostatics, and — for $\mathrm{P{=}O}$ — strong ionic $\mathrm{P^+{-}O^-}$ character. When you feel the urge to invoke a $d$ orbital for a third-period element, first ask whether polarisation and $\sigma^*$ acceptance explain the fact; they nearly always do.
:::

## Odd electrons and hypovalence

Odd-electron main-group molecules are usually the same physics in public: $\mathrm{NO}$ (11 valence electrons) dimerises to diamagnetic $\mathrm{N_2O_2}$ at low temperature; $\mathrm{NO_2}$ pairs its odd electron to give colourless $\mathrm{N_2O_4}$ ($\Delta H \approx -57\ \mathrm{kJ\,mol^{-1}}$, the classic syringe demonstration of Le Chatelier's principle); $\mathrm{ClO_2}$ is odd-electron and explosive-decomposing. The electron-deficient molecules are, symmetrically, **Lewis acids** — the subject of [[main-group/inorganic-acids-bases]]. $\mathrm{BF_3}$ is a second-period centre (planar, empty $2p$) and binds $\mathrm{NH_3}$ to give $\mathrm{F_3B{-}NH_3}$, completing boron's octet with a dative bond. The period-3 Lewis acid here is $\mathrm{AlCl_3}$, which dimerises to $\mathrm{Al_2Cl_6}$ rather than remaining a monomer with an incomplete octet. Note the pattern that unifies this chapter: *an unfilled orbital and a filled orbital, brought together, make a bond wherever the two-centre count runs short* — that is all a Lewis acid–base adduct, a diborane bridge and a hypervalent fluoride have in common, and it is all they need in common.

::: quiz
Why is $\mathrm{XeF_2}$ linear rather than bent?
- [x] The two $\mathrm{F{-}Xe}$ links are one three-centre four-electron bond built on a xenon $p$ orbital, and xenon's three remaining lone pairs sit in the equatorial plane of the resulting octahedral electron arrangement — the axial $\mathrm{F{-}Xe{-}F}$ angle is then $180^\circ$ by construction.
- [ ] Xenon uses $sp^3d$ hybrid orbitals, and the two extra lone pairs repel the bonds into linearity.
- [ ] Each $\mathrm{Xe{-}F}$ is an ordinary two-centre bond and $\mathrm{XeF_2}$ is an $\mathrm{AB_2}$ molecule with no lone pairs on xenon.
- [ ] Fluorine's lone pairs repel one another into the trans arrangement, and xenon simply follows.
::: solution
The three-centre four-electron bond forms along the axis of a xenon $p$ orbital — that fixes the bond direction — and the three non-bonding pairs occupy the remaining octahedral sites, all equatorial, where mutual repulsion is smallest: $\mathrm{AX_2E_3}$, linear. Option (b) is the hybridisation story the chapter dismantled; option (c) miscounts xenon's electrons (8 valence + 2 shared = 10 around Xe, not 4); option (d) has the causation backwards — it is xenon's electron pairs, not fluorine's, that set the geometry.
:::
:::

## Where this leads

Three-centre bonds reappear throughout the survey chapters: boranes and the borohydride reducing agents in [[main-group/groups-13-14]], the cluster anions of the heavier groups, the xenon fluorides in [[main-group/halogens-noble-gases]]. The double-bond rule governs the silicones and silicates of [[main-group/groups-13-14]] and the refusal of phosphorus and sulfur to make $\mathrm{PO_2}$- and $\mathrm{SO_2}$-type double-bonded networks the way carbon does — compare the oxoacid structures of [[main-group/groups-15-16]]. The VSEPR shapes assumed here are derived in [[bonding-structure/vsepr]], the MO method in [[bonding-structure/molecular-orbitals]], and the Lewis-acid half of the story continues in [[main-group/inorganic-acids-bases]].

::: history
The structures of the boranes were the great structural puzzle of mid-century chemistry: formulas that would not draw, NMR spectra with two kinds of hydrogen where one was expected. William Lipscomb's group at Harvard attacked them through the 1950s and 1960s with the new tools of boron NMR and isotopic substitution, establishing the bridged three-centre bonds and winning the 1976 Nobel Prize; his student Kenneth Wade turned the cluster patterns into the electron-counting rules that carry his name (1971). The three-centre four-electron bond was formulated by George Pimentel (1951) and by R. E. Rundle in the late 1940s, and the $d$-orbital myth was dismantled in stages by the quantitative calculations of the 1970s and 80s. Stable compounds with $\mathrm{Si{=}Si}$ bonds — West's tetramesityldisilene (1981) and the bulky cyclic congeners that followed — finally established the physical basis of the double-bond rule: such bonds exist only when enormous substituents physically prevent the atoms from forming network solids instead.
:::

::: summary
- The octet rule fails three ways — deficient, hypervalent, odd-electron — and all three are repaired by molecular orbitals over three or more centres, not by $d$ orbitals.
- The three-centre four-electron bond (one bond over two collinear links) explains the linearity, long bonds and terminal reactivity of $\mathrm{XeF_2}$, $\mathrm{I_3^-}$ and $\mathrm{HF_2^-}$.
- Hypervalent molecules like $\mathrm{SF_6}$ have polar, mostly-ligand bonding orbitals; "expanded octet" is bookkeeping, and $d$-orbital hybridisation is obsolete.
- The three-centre two-electron bond makes diborane's bridges and, with Wade's rules ($n+1$/$n+2$/$n+3$ skeletal pairs), predicts borane and carborane cluster structures.
- $\pi$ bonding collapses down the periods: a second-period multiple bond can beat the single bonds it replaces ($\mathrm{C{=}O}$, $\mathrm{N{\equiv}N}$), and below that period it loses — the double-bond rule behind $\mathrm{CO_2}$ versus $\mathrm{SiO_2}$, the polysilanes and the silicones.
- Catenation strength relative to the bond with oxygen (or halogen) decides how far chains run: carbon's nearly equal $\mathrm{C{-}C}/\mathrm{C{-}O}$, silicon's fatal $226/452$.
:::

## Exercises

::: exercise Classify the electron count {level=1}
Label each as electron-deficient, octet, hypervalent (by counting rules) or odd-electron: $\mathrm{BH_3}$, $\mathrm{BF_4^-}$, $\mathrm{PF_5}$, $\mathrm{CH_4}$, $\mathrm{XeF_4}$, $\mathrm{SnCl_2}$.
::: solution
$\mathrm{BH_3}$ electron-deficient (6); $\mathrm{BF_4^-}$ octet (4 bonds, 8 electrons — *not* hypervalent: four bonds to boron is four bonds); $\mathrm{PF_5}$ hypervalent (10); $\mathrm{CH_4}$ octet; $\mathrm{XeF_4}$ hypervalent (12); $\mathrm{SnCl_2}$ electron-deficient at tin ($\mathrm{AX_2E}$: two bonds and one lone pair, six electrons, not an octet), which is why molecular $\mathrm{SnCl_2}$ is a Lewis acid. The exercise exists to catch the reflex "more fluorines = hypervalent": $\mathrm{BF_4^-}$ has the same count as $\mathrm{CF_4}$.
:::
:::

::: exercise Predict the shapes {level=1}
Use VSEPR with the three-centre model in mind: shapes of $\mathrm{XeF_2}$, $\mathrm{SF_4}$, $\mathrm{ClF_3}$, $\mathrm{XeF_4}$.
::: solution
$\mathrm{XeF_2}$ linear ($\mathrm{AX_2E_3}$: three equatorial lone pairs, the two collinear $3c{-}4e$ links axial); $\mathrm{SF_4}$ seesaw ($\mathrm{AX_4E}$); $\mathrm{ClF_3}$ T-shaped ($\mathrm{AX_3E_2}$); $\mathrm{XeF_4}$ square planar ($\mathrm{AX_4E_2}$, lone pairs trans). In every case the lone pairs and the weak three-centre links arrange themselves as VSEPR predicts — the model and the shapes are consistent.
:::
:::

::: exercise Wade count {level=1}
Classify $\mathrm{B_{10}H_{10}^{2-}}$ and $\mathrm{B_{10}H_{14}}$ by Wade's rules.
::: solution
$\mathrm{B_{10}H_{10}^{2-}}$: $10 \times 2 + 2 = 22 \to 11 = n+1$ → **closo** (deltahedral bicapped antiprism). $\mathrm{B_{10}H_{14}}$: $10 \times 2 + 4 = 24 \to 12 = n+2$ → **nido** (one vertex removed from the 11-vertex closo parent; two vertices off an icosahedron would be arachno). $\mathrm{B_{10}H_{10}^{2-}}$ is the 10-vertex closo bicapped antiprism, a different polyhedron. Both are real; the rule reads the structure class off the formula.
:::
:::

::: exercise Weaker by construction {level=2}
From the three-orbital model, show that the three-centre four-electron unit has less bonding energy than two ordinary bonds, and estimate the ratio of stabilisations.
::: solution
Three-centre: $4\alpha + 2\sqrt{2}\beta$; two two-centre bonds: $4\alpha + 4\beta$. The bonding content is $2\sqrt{2}\beta$ against $4\beta$, a ratio of $2\sqrt{2}/4 = 0.71$: the hypervalent unit keeps about seventy per cent of the stabilisation of two normal bonds (and per link, half a bond's worth of electrons). This is why hypervalent links are long and weak — and why their compounds (like $\mathrm{XeF_2}$) are happy to give one link back, i.e. to act as fluorinating or oxidising agents.
:::
:::

::: exercise Why $\mathrm{HF_2^-}$ is symmetric and $\mathrm{HCl_2^-}$ is not {level=2}
$\mathrm{HF_2^-}$ is a stable, symmetric ion. $\mathrm{HCl_2^-}$ is known, but the hydrogen bond is weaker and usually unsymmetric. Explain.
::: solution
The three-centre four-electron bond needs the central $1s$ orbital to overlap both halide orbitals at once. In symmetric bifluoride each $\mathrm{F{-}H}$ is about $114\ \mathrm{pm}$ and $\mathrm{F\cdots F}$ is about $227\ \mathrm{pm}$: the proton sits in the middle, and $2 \times 114 \approx 228$. Free HF is about $92\ \mathrm{pm}$; two untouched $97\ \mathrm{pm}$ bonds would ask for about $194\ \mathrm{pm}$, which is not the ion. Chlorine's $\mathrm{H{-}Cl}$ bond is longer ($127\ \mathrm{pm}$) and its $3p$ orbitals more diffuse, so $\mathrm{HCl_2^-}$ (known, for example as tetraalkylammonium salts) is a weaker, usually unsymmetric hydrogen bond rather than a centred three-centre bond. The same size-matching logic is why $\mathrm{O{-}H{-}O}$ hydrogen bonds are common and strong while $\mathrm{S{-}H{-}S}$ ones are feeble.
:::
:::

::: exercise Carborane structure {level=2}
Predict the structure class and vertex count of $\mathrm{C_2B_4H_6}$, treating each $\mathrm{CH}$ as a 3-skeletal-electron vertex.
::: solution
Skeletal electrons: $2 \times 3 + 4 \times 2 = 14 \to 7$ pairs. With $n = 6$ vertices, $7 = n+1$: **closo**, an octahedral $\mathrm{C_2B_4}$ cage (the known 1,2- and 1,6-isomers of $\mathrm{C_2B_4H_6}$; the 1,7-label belongs to an icosahedral $\mathrm{C_2B_{10}H_{12}}$). Check the hydrogen bookkeeping too: each vertex carries one H, so $\mathrm{C_2B_4H_6}$ is exactly the closo formula — a good habit is to verify both the electron count and the hydrogen count before committing to a structure.
:::
:::

::: exercise The oxide inequality {level=3}
Using bond enthalpies $\mathrm{C{-}O}\ 358$, $\mathrm{C{=}O}\ 799$, $\mathrm{Si{-}O}\ 452$, $\mathrm{Si{=}O}\ 640\ \mathrm{kJ\,mol^{-1}}$, compute the enthalpy advantage per formula unit of the molecular dioxide ($\mathrm{EO_2}$, two double bonds) over the single-bonded network (each E four single bonds, each O two) for E = C and E = Si, and state which wins in each case.
::: solution
Count bonds per $\mathrm{EO_2}$: the molecule has two $\mathrm{E{=}O}$; the network has four $\mathrm{E{-}O}$ half-bonds per E plus two $\mathrm{O{-}E}$ half-bonds per O — equivalently four single bonds per $\mathrm{EO_2}$ unit. Molecular: C $2 \times 799 = 1598$, Si $2 \times 640 = 1280\ \mathrm{kJ\,mol^{-1}}$. Network: C $4 \times 358 = 1432$, Si $4 \times 452 = 1808\ \mathrm{kJ\,mol^{-1}}$. Carbon: molecular wins by $166$; silicon: network wins by $528$. The reversal is the double-bond rule in arithmetic form. The $166\ \mathrm{kJ}$ gap compares molecular $\mathrm{CO_2}$ with a hypothetical covalent $\mathrm{CO_2}$ network; it is not a barrier to carbonate. A basic metal oxide often takes up $\mathrm{CO_2}$ spontaneously, and heat drives the $\mathrm{CO_2}$ back out. $\mathrm{SiO_2}$ networks are so deep in the single-bond well that dissolving them needs molten base.
:::
:::

::: exercise Two kinds of bridge {level=3}
$\mathrm{B_2H_6}$ bridges are three-centre **two**-electron; $\mathrm{Al_2Cl_6}$ bridges are three-centre **four**-electron. Draw the electron source for each, and explain why boron trichloride is monomeric in the gas phase while aluminium trichloride dimerises.
::: solution
In $\mathrm{B_2H_6}$ each bridge takes one electron from each boron's empty-orbital/hydrogen pair — the two electrons come from the two $\mathrm{B{-}H}$ fragments that cannot make two normal bonds, so the bridge is electron-poor (2e). In $\mathrm{Al_2Cl_6}$ each bridge is a chloride lone pair donated into aluminium's empty $3p$: four electrons in the three-orbital set, a dative bond. The monomer/dimer difference follows the same ledger: $\mathrm{Al_2Cl_6}$ gains two dative $\mathrm{Cl \to Al}$ bonds (several tens of $\mathrm{kJ\,mol^{-1}}$ each) to complete aluminium's octet, and the large Al centre accommodates four chlorides easily. Boron is too small to fit four chlorides comfortably around it — the $\mathrm{B{-}Cl}$ bonds in a hypothetical $\mathrm{B_2Cl_6}$ would suffer severe chlorine–chlorine repulsion at the short $\mathrm{B{-}Cl}$ distance — so $\mathrm{BCl_3}$ stays monomeric and satisfies its electron shortage by $\pi$ donation from chlorides instead. Size decides which cure for deficiency is affordable.
:::
:::
