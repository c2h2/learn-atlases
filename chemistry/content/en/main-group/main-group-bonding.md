The octet rule is the most successful lie in chemistry. It works beautifully for the second period — methane, ammonia, water, the fluorocarbons — and then the table keeps going, and the heavier main-group elements proceed to break it in three systematic directions: too few electrons (borane, $\mathrm{BF_3}$), too many by the counting rules ($\mathrm{SF_6}$, $\mathrm{XeF_2}$, $\mathrm{I_3^-}$), and too few orbitals for the multiple bonds the counting rules demand ($\mathrm{SiO_2}$ refuses to be molecular). This chapter shows that all three failures have the same cure: stop counting electron *pairs between two atoms* and start building molecular orbitals over three or more. A three-centre bond is not an exotic exception — it is the ordinary quantum mechanics of electrons shared by three nuclei, and once you can draw its orbitals, hypervalence, diborane, the weakness of silicon–silicon double bonds and the whole "double-bond rule" fall out as one story. The molecular-orbital machinery used here is that of [[bonding-structure/molecular-orbitals]]; the shapes it predicts are read with the VSEPR rules of [[bonding-structure/vsepr]].

## Electron bookkeeping and its three failures

::: definition The three ways to break the octet {#def-electron-count}
A main-group centre can depart from eight valence electrons in exactly three ways. It can be **electron-deficient** — fewer electrons than needed for two-centre bonds to all neighbours ($\mathrm{BH_3}$, 6 electrons; $\mathrm{BeH_2}$, 4). (Do not confuse this with $\mathrm{Al_2Cl_6}$, which has enough electrons: each chlorine bridge is one ordinary $\mathrm{Al{-}Cl}$ bond plus one dative bond from a chlorine lone pair, and each aluminium has an octet.) It can be **hypervalent** — more than eight electrons assigned by the ionic counting rules ($\mathrm{PF_5}$: 10; $\mathrm{SF_6}$: 12; $\mathrm{XeF_2}$: 10; $\mathrm{I_3^-}$: 10 on the central iodine). Or it can be **odd-electron** — an odd total ($\mathrm{NO}$, $\mathrm{NO_2}$, $\mathrm{ClO_2}$), which we treat as a limiting case of the first two. The classical fix was to "expand the octet" with $d$ orbitals; the modern fix, supported by quantitative calculations since the 1980s, is **multicentre bonding**: the extra electron pairs occupy orbitals spread over three or more atoms, and $d$ orbitals play no significant role.
:::

The evidence against $d$-orbital participation is quantitative: the $3d$ orbitals on third-period centres (P, S, Cl) lie too high to mix strongly with ligand $2p$ orbitals. Population analyses of $\mathrm{SF_6}$ put a large *positive* charge on sulfur and negative charge on the fluorines; the $3d$ population is a few tenths of an electron at most, and the $d$ functions that calculations need act as polarisation functions (they let the sulfur density distort), not as valence orbitals holding bonding pairs. The counting rules survive as *bookkeeping*; the physics is multicentre bonding.

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
whereas two ordinary two-centre bonds would give $2 \times 2(\alpha + \beta) = 4\alpha + 4\beta$. Since $\beta$ is negative, $2\sqrt{2}\beta > 4\beta$: the three-centre arrangement is **less** stabilised than two normal bonds — hypervalent bonds are intrinsically weak — but it is more stabilised than one two-centre bond plus a non-bonding pair ($4\alpha + 2\beta$), which is why the second ligand is bound at all. The four electrons constitute one bond shared by two links, and $\psi_2$'s density sits entirely on the terminal atoms.
:::

The proof assumed all three atoms identical. In a real molecule the central atom and the terminals differ, and the same secular equation, solved with the central orbital at energy $\alpha_\mathrm{M}$ and the terminal orbitals at $\alpha_\mathrm{L}$, shows what that does. Measuring energies from $\alpha_\mathrm{L}$ in units of $|\beta|$ and writing $x = (\alpha_\mathrm{M} - \alpha_\mathrm{L})/|\beta|$, the non-bonding level stays at exactly $0$ (it has no central-atom component, so it cannot feel $\alpha_\mathrm{M}$), and the other two are $E = \tfrac{1}{2}\left(x \mp \sqrt{x^2 + 8}\right)$.

::: widget plot
f: (x - sqrt(x^2 + 8))/2; 0*x; (x + sqrt(x^2 + 8))/2; x
x: -4, 6
y: -5, 7
points: 0,-1.414; 0,1.414
labels: \text{bonding}; \text{non-bonding}; \text{antibonding}; \text{central-atom orbital }\alpha_\mathrm{M}
caption: Energies of the three orbitals of a collinear $\mathrm{L{-}M{-}L}$ unit against $x = (\alpha_\mathrm{M} - \alpha_\mathrm{L})/|\beta|$, the height of the central atom's orbital above the terminal orbitals (energy in units of $|\beta|$, zero at $\alpha_\mathrm{L}$). The dots at $x = 0$ are the symmetric case of the proof, $\pm\sqrt{2}$. To the right the central atom is the less electronegative partner — the realistic case for $\mathrm{XeF_2}$ or $\mathrm{SF_6}$, where fluorine's $2p$ level lies several electronvolts below the central atom's valence $p$ level. Then the bonding orbital sinks toward the terminal level, becoming mostly a fluorine orbital, and the antibonding orbital rises with the central level, becoming mostly central-atom. With four electrons in the two lower levels, almost all the electron density sits on the terminals: the central atom carries a large positive charge, and the bonds are strongly polar. That is why hypervalent compounds need very electronegative ligands (F, O, Cl), and why $\mathrm{XeF_2}$ exists while "$\mathrm{XeH_2}$" does not.
:::

::: example Three species, one bond {#ex-3c-species}
$\mathrm{XeF_2}$ (linear, $\mathrm{Xe{-}F}\ 198\ \mathrm{pm}$), $\mathrm{I_3^-}$ (linear, $\mathrm{I{-}I}\ 290\ \mathrm{pm}$ against $267\ \mathrm{pm}$ in $\mathrm{I_2}$) and $\mathrm{HF_2^-}$ (symmetric, $\mathrm{F{-}H}$ about $114\ \mathrm{pm}$, $\mathrm{F\cdots F}$ about $227\ \mathrm{pm}$) look unrelated. Show that they are the same bond.
::: solution
Each is an $\mathrm{L{-}M{-}L}$ unit with four electrons in three collinear orbitals. For $\mathrm{XeF_2}$: one xenon $5p$ orbital holding two electrons, plus one electron from each fluorine $2p$ orbital. For $\mathrm{I_3^-}$: think of $\mathrm{I^-}$ donating into the $\sigma^*$ orbital of $\mathrm{I_2}$, which is the same three-orbital, four-electron set. For $\mathrm{HF_2^-}$: the $\mathrm{H\ 1s}$ orbital in the middle and a $2p$ orbital on each fluorine, with the four electrons of an $\mathrm{F{-}H}$ bond pair and a fluoride lone pair. $\mathrm{XeF_2}$ and $\mathrm{I_3^-}$ are linear because they are $\mathrm{AX_2E_3}$: five electron domains around the centre, arranged as a trigonal bipyramid, with the three lone pairs in the equatorial plane (where they repel least) and the two ligands axial. $\mathrm{HF_2^-}$ has no lone pair on hydrogen; it is linear because a $1s$ orbital overlaps best with two ligands on opposite sides. The links are long for the same reason in all three — half a bond each: $290\ \mathrm{pm}$ in $\mathrm{I_3^-}$ against $267\ \mathrm{pm}$ in $\mathrm{I_2}$, and $114\ \mathrm{pm}$ for each $\mathrm{H{-}F}$ link in $\mathrm{HF_2^-}$ against $92\ \mathrm{pm}$ in free HF. The terminals are the reactive sites: $\mathrm{I_3^-}$ releases $\mathrm{I_2}$, $\mathrm{XeF_2}$ transfers $\mathrm{F}$ or $\mathrm{F^-}$, and $\mathrm{HF_2^-}$ is why anhydrous HF is such an unusual solvent. One orbital picture, three chapters of descriptive chemistry.
:::
:::

::: example Sulfur hexafluoride: twelve electrons, six equivalent bonds {#ex-sf6}
$\mathrm{SF_6}$ has six identical $\mathrm{S{-}F}$ bonds ($156.4\ \mathrm{pm}$) and is chemically almost inert. How does the three-centre picture give six equivalent bonds, and where does the "12-electron octet-breaking" go?
::: solution
Build symmetry-adapted combinations of the six fluorine $\sigma$ orbitals: they span $a_{1g} + e_g + t_{1u}$. Sulfur's $3s$ matches $a_{1g}$ and its three $3p$ orbitals match $t_{1u}$; with $d$ orbitals excluded, no sulfur valence orbital has $e_g$ symmetry, so the $e_g$ pair of ligand combinations (four electrons) stays non-bonding and fluorine-centred. Only the $a_{1g}$ and $t_{1u}$ combinations — eight electrons — are bonding, and their antibonding partners are empty. Twelve electrons, six equivalent links, four bonding pairs: each $\mathrm{S{-}F}$ link has a bond order of two-thirds. That is why $\mathrm{SF_6}$ is coordinatively saturated and, with the $\mathrm{S{-}F}$ bonds shielded inside a fluorine cage, kinetically inert. The "12 electrons around sulfur" is a bookkeeping artefact of assigning bonding pairs to sulfur; the density has sulfur strongly positive and each bond polar, and only eight electrons are in sulfur-containing bonding orbitals. Compare $\mathrm{PF_5}$ (trigonal bipyramidal, two bond lengths — axial bonds are the weaker three-centre-type links) and $\mathrm{SF_4}$ (seesaw: one $\mathrm{AX_4E}$ site of VSEPR occupied by the lone pair).
:::
:::

::: warning "Expanded octet" is bookkeeping, not mechanism {#warn-dorbitals}
Two mistakes haunt this topic. The first is to say that sulfur "uses its $3d$ orbitals to expand its octet": quantitative calculations put the $d$-orbital population of $\mathrm{SF_6}$ near the non-bonding baseline, and the old hybridisation story $sp^3d^2$ is dead — but the phrase survives in older textbooks, so recognise it when you meet it. The second is to conclude that because the octet is not literally expanded, hypervalent molecules are not really bonded — they are, and their bond orders, lengths and vibrational frequencies are all consistent with the three-centre four-electron model above. The correct sentence is: *a pair of hypervalent links is a three-centre four-electron bond (one bonding pair and one non-bonding pair); an electron-deficient bridge such as diborane's is the three-centre two-electron version. The octet rule is a two-centre approximation that fails quietly rather than loudly.*
:::

## Electron deficiency: the three-centre two-electron bond

::: definition Diborane and the $\mathrm{B{-}H{-}B}$ bridge {#def-3c2e}
$\mathrm{B_2H_6}$ has twelve valence electrons, exactly the count for four terminal two-centre $\mathrm{B{-}H}$ bonds (eight electrons) plus two three-centre bridges (four electrons). A picture that also drew a two-centre $\mathrm{B{-}B}$ bond would need fourteen electrons and seven links; diborane has neither the extra pair nor that bond. It solves the connectivity by **bridging**: two hydrogens sit between the borons, each held by a **three-centre two-electron bond** (an approximately $sp^3$ hybrid from each boron plus the H $1s$: three orbitals, with two electrons in the lowest, bonding combination). The structure has four terminal $\mathrm{B{-}H}$ bonds ($119\ \mathrm{pm}$, normal) and four bridging $\mathrm{B{-}H}$ links ($133\ \mathrm{pm}$, longer, as half-bonds should be), with $\mathrm{B\cdots B} = 177\ \mathrm{pm}$. Each boron takes part in two terminal bonds and two bridges, so it is surrounded by four electron pairs' worth of bonding — an octet in the counting sense — without any two-centre $\mathrm{B{-}B}$ bond. The bridging pays: the dimerisation $2\,\mathrm{BH_3} \rightarrow \mathrm{B_2H_6}$ is strongly exothermic (estimates are of the order of $-150\ \mathrm{kJ\,mol^{-1}}$; $\mathrm{BH_3}$ is too reactive for a precise direct measurement), which is why free borane is seen only as a transient or as an adduct such as $\mathrm{H_3B{\cdot}THF}$.
:::

The same bond type holds together the polymeric solid hydrides. Crystalline $\mathrm{BeH_2}$ is a three-dimensional network of $\mathrm{BeH_4}$ tetrahedra sharing corners, every hydrogen bridging two beryllium atoms by a $\mathrm{Be{-}H{-}Be}$ three-centre two-electron bond; $\mathrm{AlH_3}$ is a network of $\mathrm{AlH_6}$ octahedra sharing corners through $\mathrm{Al{-}H{-}Al}$ bridges of the same kind. Contrast the chloride bridges of $\mathrm{Al_2Cl_6}$ (terminal $\mathrm{Al{-}Cl}$ about $206\ \mathrm{pm}$; the four bridging $\mathrm{Al{-}Cl}$ bonds equal, about $225\ \mathrm{pm}$ in the gas). They look similar but are not electron-deficient at all. A bridging chlorine has lone pairs to spare, so each $\mathrm{Al{-}Cl{-}Al}$ bridge is simply two ordinary two-centre two-electron bonds: one normal $\mathrm{Al{-}Cl}$ bond and one dative bond from a chlorine lone pair into the empty $3p$ orbital of the other aluminium. Once formed, the two bonds are indistinguishable (resonance makes all four bridging bonds equal), and each aluminium has four bonding pairs — an octet. A hydride bridge needs a multicentre orbital because hydrogen has no second pair to give; a halide bridge does not.

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
$\mathrm{B_2H_6}$: $2 \times 2 + 4 \times 1 = 8$ electrons $= 4$ pairs $= n+2$ → formally **nido** (the parent closo polyhedron for $n+1 = 3$ vertices is a triangle, less one vertex; for so small a molecule the classification is bookkeeping rather than geometry). $\mathrm{B_5H_9}$: $5 \times 2 + 4 = 14 \to 7 = 5+2$ → **nido** (square pyramid, from the octahedron). $\mathrm{B_6H_6^{2-}}$: $6 \times 2 + 2 = 14 \to 7 = 6+1$ → **closo** (octahedron — and indeed the stable octahedral closo-borate dianion). $\mathrm{B_4H_{10}}$: $4 \times 2 + 6 = 14 \to 7 = 4+3$ → **arachno** (a butterfly: an octahedron with two adjacent vertices removed). The beauty of the rule is that one arithmetic line predicts a *structure class* for a formula you have never seen; carboranes $\mathrm{C_2B_6H_8}$ ($2\times3 + 6\times2 = 18 \to 9 = 8+1$, closo) confirmed it spectacularly.
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

The numbers make the rule visible. Mean bond enthalpies ($\mathrm{kJ\,mol^{-1}}$; values for the heavier multiple bonds are estimates from the few stable compounds and from calculation, good to perhaps $\pm 30$): $\mathrm{C{-}C}\ 346$, $\mathrm{C{=}C}\ 602$ (ratio to single: $1.74$); $\mathrm{Si{-}Si}\ 226$, $\mathrm{Si{=}Si}$ about $310$ ($1.37$); $\mathrm{C{-}O}\ 358$, $\mathrm{C{=}O}\ 799$ ($2.23$); $\mathrm{Si{-}O}\ 452$, $\mathrm{Si{=}O}$ about $640$ ($1.42$); $\mathrm{N{-}N}\ 163$, $\mathrm{N{\equiv}N}\ 945$ ($5.8$ — the triple bond is a fortune, and nitrogen's chemistry is its spending); $\mathrm{P{-}P}\ 201$, $\mathrm{P{=}P}$ about $310$ ($1.5$). For every third-period element, two single bonds to an electronegative neighbour beat one double bond — much of silicon's chemistry in one inequality.

::: example Carbon dioxide versus silicon dioxide {#ex-co2-sio2}
Predict and justify the structures and standard states of the oxides of carbon and silicon, using the bond enthalpies above.
::: solution
Count bonds per $\mathrm{EO_2}$. The molecule has two double bonds; the network has four single bonds. For carbon: $2 \times 799 = 1598\ \mathrm{kJ\,mol^{-1}}$ against $4 \times 358 = 1432$, so the molecule is ahead by $166\ \mathrm{kJ\,mol^{-1}}$ and $\mathrm{CO_2}$ is a gas. For silicon: $2 \times 640 = 1280$ against $4 \times 452 = 1808$, so the network is ahead by $528\ \mathrm{kJ\,mol^{-1}}$. (In the network each silicon has four $\mathrm{Si{-}O}$ bonds and each oxygen two, so there are exactly four bonds per $\mathrm{SiO_2}$ unit — no further halving is needed.) Silica is a giant $\mathrm{SiO_4}$ tetrahedral solid, melting near $1700\ \mathrm{^\circ C}$, where $\mathrm{CO_2}$ sublimes at $-78\ \mathrm{^\circ C}$. The same inequality explains why silicon exposed to air or steam acquires a coherent layer of $\mathrm{SiO_2}$ (the stable, insulating oxide that silicon microelectronics grows deliberately) and why siloxane $\mathrm{Si{-}O{-}Si}$ chains — the silicones — are the characteristic silicon polymers.
:::
:::

::: example Catenation: how far does each element chain? {#ex-catenation}
Carbon chains run to millions of atoms and survive in air; silanes $\mathrm{Si}_n\mathrm{H}_{2n+2}$ are known only for short chains and are spontaneously flammable. Using $D(\mathrm{O{=}O}) = 498\ \mathrm{kJ\,mol^{-1}}$ and the bond enthalpies above, compare the enthalpy of inserting an oxygen atom into a chain bond, $\mathrm{E{-}E} + \tfrac{1}{2}\,\mathrm{O_2} \rightarrow \mathrm{E{-}O{-}E}$, for carbon and silicon, and explain the difference in behaviour.
::: solution
Apply one comparison to both elements: break one $\mathrm{E{-}E}$ bond and half an $\mathrm{O{=}O}$ bond, make two $\mathrm{E{-}O}$ bonds.
$$
\text{C:}\quad 346 + 249 - 2(358) = -121\ \mathrm{kJ\,mol^{-1}};\qquad
\text{Si:}\quad 226 + 249 - 2(452) = -429\ \mathrm{kJ\,mol^{-1}}.
$$
Both are downhill: a carbon chain is *also* thermodynamically unstable in air, as is any hydrocarbon (its combustion to $\mathrm{CO_2}$ and water is very exothermic). The difference is partly one of degree — oxidising a $\mathrm{Si{-}Si}$ bond releases three and a half times as much — but mostly one of rate. Hydrocarbons are **kinetically protected**: carbon is small and coordinatively saturated, the $\mathrm{C{-}C}$ and $\mathrm{C{-}H}$ bonds are non-polar, there is no low-lying empty orbital for an attacking reagent to use, and the reaction with triplet $\mathrm{O_2}$ needs a radical chain started by a flame or spark. Silicon is larger and more electropositive: its bonds are polar and long, and nucleophiles (water, oxygen lone pairs) can attack it through accessible $\sigma^*$ orbitals, so silanes react with air and water without an initiator. The prediction: **$\mathrm{Si{-}Si}$ and $\mathrm{Si{-}H}$ bonds are the reactive sites of silicon chemistry**, and long $\mathrm{Si{-}Si}$ chains survive only when every silicon carries bulky organic groups — the polysilanes. The robust silicon polymers, the silicones, are built on $\mathrm{Si{-}O{-}Si}$, the very bond the calculation says silicon prefers.
:::
:::

::: warning Do not rescue the octet with dπ–pπ back-bonding {#warn-dpi}
Older books explain the planarity of amides of silicon and phosphorus, the short $\mathrm{Si{-}N}$ bonds in silazanes and the strength of the $\mathrm{P{=}O}$ linkage by $d\pi{-}p\pi$ donation of a lone pair into empty $d$ orbitals. Modern calculations reject significant $d$-orbital occupation; the effects are instead **negative hyperconjugation** (lone-pair donation into $\sigma^*$ orbitals of neighbouring bonds), simple electrostatics, and — for $\mathrm{P{=}O}$ — strong ionic $\mathrm{P^+{-}O^-}$ character. When you feel the urge to invoke a $d$ orbital for a third-period element, first ask whether polarisation and $\sigma^*$ acceptance explain the fact; they nearly always do.
:::

## Odd electrons and hypovalence

Odd-electron main-group molecules show the same physics from another angle: $\mathrm{NO}$ (11 valence electrons) dimerises to diamagnetic $\mathrm{N_2O_2}$ at low temperature; $\mathrm{NO_2}$ pairs its odd electron to give colourless $\mathrm{N_2O_4}$ ($\Delta H \approx -57\ \mathrm{kJ\,mol^{-1}}$, the classic syringe demonstration of Le Chatelier's principle); $\mathrm{ClO_2}$, also odd-electron, does not dimerise but is dangerously explosive when concentrated. The electron-deficient molecules are, symmetrically, **Lewis acids** — the subject of [[main-group/inorganic-acids-bases]]. $\mathrm{BF_3}$ is a second-period centre (planar, empty $2p$) and binds $\mathrm{NH_3}$ to give $\mathrm{F_3B{-}NH_3}$, completing boron's octet with a dative bond. The period-3 analogue $\mathrm{AlCl_3}$ satisfies itself instead: it dimerises to $\mathrm{Al_2Cl_6}$ through dative chloride bridges rather than remaining a monomer with an incomplete octet. Note the pattern that unifies this chapter: *an unfilled orbital and a filled orbital, brought together, make a bond wherever the two-centre count runs short* — that is all a Lewis acid–base adduct, a diborane bridge and a hypervalent fluoride have in common, and it is all they need in common.

::: quiz
Why is $\mathrm{XeF_2}$ linear rather than bent?
- [x] The two $\mathrm{Xe{-}F}$ links are one three-centre four-electron bond built on a xenon $p$ orbital, and xenon's three lone pairs sit in the equatorial plane of a trigonal-bipyramidal arrangement of five electron domains — the axial $\mathrm{F{-}Xe{-}F}$ angle is then $180^\circ$.
- [ ] Xenon uses $sp^3d$ hybrid orbitals, and the two extra lone pairs repel the bonds into linearity.
- [ ] Each $\mathrm{Xe{-}F}$ is an ordinary two-centre bond and $\mathrm{XeF_2}$ is an $\mathrm{AB_2}$ molecule with no lone pairs on xenon.
- [ ] Fluorine's lone pairs repel one another into the trans arrangement, and xenon simply follows.
::: solution
The three-centre four-electron bond forms along the axis of a xenon $p$ orbital — that fixes the bond direction. Counted as VSEPR domains, xenon has two bonding pairs and three lone pairs: five domains, a trigonal-bipyramidal electron geometry. The lone pairs take the three equatorial positions, where they are $120^\circ$ apart rather than $90^\circ$, and the two fluorines are axial: $\mathrm{AX_2E_3}$, linear. Option (b) is the hybridisation story the chapter dismantled; option (c) ignores xenon's lone pairs (8 valence electrons + 2 from the fluorines = 10 around Xe, five domains); option (d) has the causation backwards — it is xenon's electron pairs, not fluorine's, that set the geometry.
:::
:::

## Where this leads

Three-centre bonds reappear throughout the survey chapters: boranes and the borohydride reducing agents in [[main-group/groups-13-14]], the cluster anions of the heavier groups, the xenon fluorides in [[main-group/halogens-noble-gases]]. The double-bond rule governs the silicones and silicates of [[main-group/groups-13-14]] and the contrast between triply bonded $\mathrm{N_2}$ and singly bonded $\mathrm{P_4}$, and between molecular $\mathrm{N_2O_5}$ and cage-like $\mathrm{P_4O_{10}}$, in [[main-group/groups-15-16]]. The VSEPR shapes assumed here are derived in [[bonding-structure/vsepr]], the MO method in [[bonding-structure/molecular-orbitals]], and the Lewis-acid half of the story continues in [[main-group/inorganic-acids-bases]].

::: history
The structures of the boranes were the great structural puzzle of mid-century chemistry: formulas that would not draw, NMR spectra with two kinds of hydrogen where one was expected. The bridged structure of diborane with three-centre $\mathrm{B{-}H{-}B}$ bonds was proposed by H. Christopher Longuet-Higgins and R. P. Bell in 1943 and confirmed by electron diffraction (Hedberg and Schomaker, 1951). William Lipscomb, first at Minnesota and then at Harvard, determined the structures of the higher boranes in the 1950s, chiefly by low-temperature X-ray crystallography of these air-sensitive compounds, and developed a topological theory of their three-centre bonding; he received the 1976 Nobel Prize in Chemistry. Kenneth Wade, at Durham, turned the cluster patterns into the skeletal-electron-counting rules that carry his name (1971). The three-centre four-electron bond for hypervalent molecules was formulated by George Pimentel (1951) and developed by Robert Rundle, and the role of $d$ orbitals was settled by the quantitative calculations of the 1980s and 1990s (for example those of Reed and Weinhold on $\mathrm{SF_6}$, 1986). The first stable compound with an $\mathrm{Si{=}Si}$ bond, tetramesityldisilene (West, Fink and Michl, 1981), showed what the double-bond rule really says: such bonds are not impossible, only weak, and they survive when bulky substituents block the reactions that would otherwise turn them into single-bonded oligomers.
:::

::: summary
- The octet rule fails three ways — deficient, hypervalent, odd-electron — and all three are repaired by molecular orbitals over three or more centres, not by $d$ orbitals.
- The three-centre four-electron bond (one bond over two collinear links) explains the linearity, long bonds and terminal reactivity of $\mathrm{XeF_2}$, $\mathrm{I_3^-}$ and $\mathrm{HF_2^-}$.
- Hypervalent molecules like $\mathrm{SF_6}$ have polar, mostly-ligand bonding orbitals; "expanded octet" is bookkeeping, and $d$-orbital hybridisation is obsolete.
- The three-centre two-electron bond makes diborane's bridges and, with Wade's rules ($n+1$/$n+2$/$n+3$ skeletal pairs), predicts borane and carborane cluster structures.
- $\pi$ bonding collapses down the periods: a second-period multiple bond can beat the single bonds it replaces ($\mathrm{C{=}O}$, $\mathrm{N{\equiv}N}$), and below that period it loses — the double-bond rule behind $\mathrm{CO_2}$ versus $\mathrm{SiO_2}$, the polysilanes and the silicones.
- Oxidising a chain bond, $\mathrm{E{-}E} + \tfrac{1}{2}\mathrm{O_2} \rightarrow \mathrm{E{-}O{-}E}$, is downhill for both carbon ($-121$) and silicon ($-429\ \mathrm{kJ\,mol^{-1}}$); carbon chains survive in air because they are kinetically protected, silicon chains do not.
- Halide bridges (as in $\mathrm{Al_2Cl_6}$) are pairs of ordinary two-centre bonds, one of them dative; hydride bridges (diborane, $\mathrm{BeH_2}$, $\mathrm{AlH_3}$) need three-centre two-electron bonds.
:::

## Exercises

::: exercise Classify the electron count {level=1}
Label each as electron-deficient, octet, hypervalent (by counting rules) or odd-electron: $\mathrm{BH_3}$, $\mathrm{BF_4^-}$, $\mathrm{PF_5}$, $\mathrm{CH_4}$, $\mathrm{XeF_4}$, $\mathrm{SnCl_2}$ (gas-phase monomer), $\mathrm{NO_2}$.
::: solution
$\mathrm{BH_3}$ electron-deficient (6); $\mathrm{BF_4^-}$ octet (four bonds, 8 electrons — *not* hypervalent); $\mathrm{PF_5}$ hypervalent (10); $\mathrm{CH_4}$ octet; $\mathrm{XeF_4}$ hypervalent (12); $\mathrm{SnCl_2}$ electron-deficient at tin ($\mathrm{AX_2E}$: two bonds and one lone pair, six electrons), which is why molecular $\mathrm{SnCl_2}$ is a Lewis acid and accepts $\mathrm{Cl^-}$ to give $\mathrm{SnCl_3^-}$; $\mathrm{NO_2}$ odd-electron (17 valence electrons). The exercise exists to catch the reflex "more fluorines = hypervalent": $\mathrm{BF_4^-}$ has the same count as $\mathrm{CF_4}$.
:::
:::

::: exercise Predict the shapes {level=1}
Use VSEPR with the three-centre model in mind: give the electron-domain geometry and the molecular shape of $\mathrm{XeF_2}$, $\mathrm{SF_4}$, $\mathrm{ClF_3}$, $\mathrm{XeF_4}$.
::: solution
$\mathrm{XeF_2}$: five domains, trigonal bipyramidal; linear ($\mathrm{AX_2E_3}$, three equatorial lone pairs, the two fluorines axial). $\mathrm{SF_4}$: five domains, trigonal bipyramidal; seesaw ($\mathrm{AX_4E}$, lone pair equatorial). $\mathrm{ClF_3}$: five domains, trigonal bipyramidal; T-shaped ($\mathrm{AX_3E_2}$, both lone pairs equatorial). $\mathrm{XeF_4}$: six domains, octahedral; square planar ($\mathrm{AX_4E_2}$, lone pairs trans). In each, the pairs of opposite ($180^\circ$) links — the axial pair in the trigonal bipyramids, both trans pairs in $\mathrm{XeF_4}$ — are the three-centre four-electron units, and they are the longer bonds where both kinds are present.
:::
:::

::: exercise Wade count {level=1 check="12"}
Classify $\mathrm{B_{10}H_{10}^{2-}}$ and $\mathrm{B_{10}H_{14}}$ by Wade's rules. (Enter the number of skeletal electron pairs in $\mathrm{B_{10}H_{14}}$.)
::: solution
$\mathrm{B_{10}H_{10}^{2-}}$: $10 \times 2 + 2 = 22$ electrons, $11$ pairs $= n+1$ → **closo**, a bicapped square antiprism. $\mathrm{B_{10}H_{14}}$: $10 \times 2 + 4 = 24$ electrons, $12$ pairs $= n+2$ → **nido**, an 11-vertex closo polyhedron (the octadecahedron) with one vertex removed — the boat-shaped decaborane cage. The rule reads the structure class off the formula.
:::
:::

::: exercise Weaker by construction {level=2 check="0.71"}
From the three-orbital model, show that the three-centre four-electron unit has less bonding energy than two ordinary two-centre bonds, and find the ratio of the two stabilisations. (Enter the ratio to two decimal places.)
::: solution
Three-centre: $4\alpha + 2\sqrt{2}\beta$; two two-centre bonds: $2 \times 2(\alpha + \beta) = 4\alpha + 4\beta$. The bonding content is $2\sqrt{2}\beta$ against $4\beta$, a ratio of $2\sqrt{2}/4 = 1/\sqrt{2} = 0.71$: the hypervalent unit keeps about seventy per cent of the stabilisation of two normal bonds, spread over two links. This is why hypervalent links are long and weak, and why compounds such as $\mathrm{XeF_2}$ readily give up a ligand — they are fluorinating and oxidising agents.
:::
:::

::: exercise A half-bond's length {level=2 check="285"}
Pauling's empirical relation between bond length and bond order $n$ is $r(n) = r(1) - 60\log_{10} n$ (in pm). Taking $r(1) = 267\ \mathrm{pm}$ from $\mathrm{I_2}$ and $n = \tfrac{1}{2}$ for each link of a three-centre four-electron bond, predict the $\mathrm{I{-}I}$ distance in a symmetric $\mathrm{I_3^-}$ ion. (Enter it in pm to three significant figures.)
::: solution
$r = 267 - 60\log_{10}(0.5) = 267 + 60(0.301) = 267 + 18.1 = 285\ \mathrm{pm}$. The observed value in symmetric triiodides is about $290\ \mathrm{pm}$: the half-bond picture accounts for most of the lengthening. In many salts the ion is unsymmetric, with one shorter and one longer link, because the counter-ion's field pushes the four electrons toward one end — the three-centre bond is soft and easily distorted.
:::
:::

::: exercise Why $\mathrm{HF_2^-}$ is symmetric and $\mathrm{HCl_2^-}$ is not {level=2}
$\mathrm{HF_2^-}$ is a stable, symmetric ion. $\mathrm{HCl_2^-}$ is known, but its hydrogen bond is weaker and often unsymmetric. Explain.
::: solution
A symmetric three-centre four-electron bond needs the central $1s$ orbital to overlap well with both halogen orbitals at once. In bifluoride the $\mathrm{F\cdots F}$ distance is about $227\ \mathrm{pm}$ and the proton sits midway, $114\ \mathrm{pm}$ from each fluorine — only $22\ \mathrm{pm}$ longer than the bond in free HF ($92\ \mathrm{pm}$), so both links are strong half-bonds. Chlorine is larger ($\mathrm{H{-}Cl}$ $127\ \mathrm{pm}$) and its $3p$ orbitals are more diffuse and less electronegative, so the three-centre interaction is weaker; $\mathrm{HCl_2^-}$ (known, for example, in tetraalkylammonium salts) has a much weaker hydrogen bond, and in many salts the proton sits closer to one chlorine. The same size-matching logic is why $\mathrm{O{-}H\cdots O}$ hydrogen bonds are common and strong while $\mathrm{S{-}H\cdots S}$ ones are feeble.
:::
:::

::: exercise Carborane structure {level=2 check="7"}
Predict the structure class and shape of $\mathrm{C_2B_4H_6}$, treating each $\mathrm{CH}$ as a 3-skeletal-electron vertex. (Enter the number of skeletal electron pairs.)
::: solution
Skeletal electrons: $2 \times 3 + 4 \times 2 = 14$, i.e. $7$ pairs. With $n = 6$ vertices, $7 = n+1$: **closo**, an octahedral $\mathrm{C_2B_4}$ cage, known as both the 1,2- (adjacent carbons) and 1,6- (opposite carbons) isomers. Check the hydrogen bookkeeping too: each vertex carries one terminal H and there are no extra bridging hydrogens, so $\mathrm{C_2B_4H_6}$ is exactly a closo formula. Verifying both the electron count and the hydrogen count is a good habit before committing to a structure.
:::
:::

::: exercise Oxidising a chain {level=2 check="-429"}
Using $\mathrm{Si{-}Si}\ 226$, $\mathrm{Si{-}O}\ 452$ and $\mathrm{O{=}O}\ 498\ \mathrm{kJ\,mol^{-1}}$, estimate $\Delta_\mathrm{r}H$ for $\mathrm{{\equiv}Si{-}Si{\equiv}} + \tfrac{1}{2}\,\mathrm{O_2} \rightarrow \mathrm{{\equiv}Si{-}O{-}Si{\equiv}}$. Then compare with the carbon analogue ($\mathrm{C{-}C}\ 346$, $\mathrm{C{-}O}\ 358$) and say why polyethylene survives in air while a polysilane without bulky substituents does not. (Enter $\Delta_\mathrm{r}H$ for silicon in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Bonds broken: one $\mathrm{Si{-}Si}$ ($226$) and half an $\mathrm{O{=}O}$ ($249$); bonds made: two $\mathrm{Si{-}O}$ ($904$). $\Delta_\mathrm{r}H \approx 226 + 249 - 904 = -429\ \mathrm{kJ\,mol^{-1}}$. For carbon, $346 + 249 - 716 = -121\ \mathrm{kJ\,mol^{-1}}$. Both are favourable, so the difference in behaviour is not that carbon chains are thermodynamically stable in air — they are not. Polyethylene survives because its oxidation is slow (non-polar bonds, no accessible empty orbital on carbon, a radical chain that needs initiation); the silicon chain has polar, longer bonds open to attack and a much larger driving force. Mean bond enthalpies make this a rough estimate, good to a few tens of $\mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise The oxide inequality {level=3 check="528"}
Using bond enthalpies $\mathrm{C{-}O}\ 358$, $\mathrm{C{=}O}\ 799$, $\mathrm{Si{-}O}\ 452$, $\mathrm{Si{=}O}\ 640\ \mathrm{kJ\,mol^{-1}}$, compute the enthalpy advantage per formula unit of the single-bonded network (each E four single bonds, each O two) over the molecular dioxide ($\mathrm{O{=}E{=}O}$) for E = C and E = Si, state which structure wins in each case, and explain why carbon dioxide nevertheless reacts readily with basic oxides while silica does not. (Enter the network's advantage for silicon in $\mathrm{kJ\,mol^{-1}}$.)
::: hint
In the network every bond joins one E to one O. Count bonds per E: four. Since there are two oxygens per E and each has two bonds, the count agrees: four bonds per $\mathrm{EO_2}$.
:::
::: solution
Per $\mathrm{EO_2}$, the molecule has two $\mathrm{E{=}O}$ bonds and the network four $\mathrm{E{-}O}$ bonds. Carbon: molecule $2 \times 799 = 1598$, network $4 \times 358 = 1432$; the molecule wins by $166\ \mathrm{kJ\,mol^{-1}}$ (the network's "advantage" is $-166$). Silicon: molecule $2 \times 640 = 1280$, network $4 \times 452 = 1808$; the network wins by $528\ \mathrm{kJ\,mol^{-1}}$. The reversal is the double-bond rule in arithmetic. Reaction with a basic oxide is a different comparison: $\mathrm{CaO + CO_2 \rightarrow CaCO_3}$ converts one $\mathrm{C{=}O}$ π bond into a $\mathrm{C{-}O^-}$ σ bond and gains a large lattice energy, and it is downhill at room temperature (heating limestone reverses it). Silica's network is already made of single bonds, so it has no weak π bond to trade; it dissolves only in hot concentrated alkali or molten carbonate, where the products are silicates.
:::
:::

::: exercise Two kinds of bridge {level=3}
$\mathrm{B_2H_6}$ and $\mathrm{Al_2Cl_6}$ are both dimers held together by two bridging atoms. For each, count the electrons available for the bridges and describe the bonding; then explain why boron trichloride is monomeric in the gas phase while aluminium trichloride dimerises.
::: hint
Count valence electrons for the whole molecule and subtract those in terminal two-centre bonds. Ask also how many lone pairs a bridging H and a bridging Cl have available.
:::
::: solution
**Diborane**: 12 valence electrons; the four terminal $\mathrm{B{-}H}$ bonds use 8, leaving 4 for two bridges — one pair per $\mathrm{B{-}H{-}B}$ unit, a three-centre two-electron bond. Hydrogen has no lone pair, so no other description is possible. **$\mathrm{Al_2Cl_6}$**: 48 valence electrons. The four terminal $\mathrm{Al{-}Cl}$ bonds use 8 and the terminal chlorines carry 24 in lone pairs; the remaining 16 belong to the two bridging chlorines. Each bridging chlorine forms two ordinary two-centre bonds — four electrons, one bond to each aluminium (one of them is dative in origin) — and keeps two lone pairs. So the bridges are *not* multicentre: they are four two-centre two-electron bonds, and each aluminium has four bonding pairs. Monomer versus dimer: dimerisation turns two $\mathrm{Cl}$ lone pairs into two $\mathrm{Al{-}Cl}$ bonds, completing aluminium's octet, and the large aluminium atom has room for four chlorines. Boron is small: four chlorines round one boron would be crowded, and the bridging $\mathrm{B{-}Cl{-}B}$ angle would be strained. Instead monomeric $\mathrm{BCl_3}$ relieves its electron deficiency partly by π donation from the chlorine lone pairs into the empty boron $2p$ orbital. Size decides which cure for electron deficiency is affordable.
:::
:::
