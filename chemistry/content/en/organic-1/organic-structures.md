Organic chemistry is the chemistry of carbon compounds, and its first skill is fluency in the shorthand that working chemists actually use. Nobody draws every carbon and hydrogen of a large molecule; instead we draw **skeletal formulae**, in which carbons are implied at every vertex and line-end and hydrogens on carbon are implied by valence. Functional groups — the reactive parts of the molecule — are drawn out explicitly, because they are where the chemistry happens. This lesson builds that vocabulary: why carbon produces so many compounds, the notation that encodes them, the functional groups that define their reactivity, and the IUPAC naming system that turns a structure into a unique name and back again. Everything that follows in this course — conformations, stereochemistry, mechanism — is written in this notation, so the effort spent here repays itself in every chapter after it.

## Why carbon, and why so many compounds

::: definition Tetravalence and catenation {#def-tetravalence}
Carbon is tetravalent: it forms four bonds in its stable neutral compounds. Its valence electron configuration $2s^2 2p^2$ hybridizes to $sp^3$, $sp^2$ or $sp$, giving bond angles near $109.5^\circ$, $120^\circ$ and $180^\circ$ respectively. Carbon also excels at **catenation** — bonding to itself in long chains and rings — because the $\mathrm{C{-}C}$ bond is strong ($\approx 348\ \mathrm{kJ\,mol^{-1}}$) and the alternatives available to other elements do not destabilize the chain. Silicon also catenates, but its bonds to itself are weaker and its bonds to oxygen so strong that silicon chemistry runs to silicates, not to life.
:::

The numbers behind the claim are worth memorizing approximately, because they explain the subject's two great reaction patterns before a single mechanism is drawn. Typical bond lengths and mean bond dissociation enthalpies (standard tabulated values) are:

| bond | length / $\mathrm{pm}$ | $\bar{D}/\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|
| $\mathrm{C{-}C}$ | 154 | 348 |
| $\mathrm{C{=}C}$ | 134 | 614 |
| $\mathrm{C{\equiv}C}$ | 120 | 839 |
| $\mathrm{C{-}H}$ | 109 | 413 |
| $\mathrm{C{-}O}$ | 143 | 358 |
| $\mathrm{C{=}O}$ | 123 | 745 |
| $\mathrm{C{-}Cl}$ | 177 | 338 |

Read the second and third rows together: a $\pi$ bond ($614 - 348 = 266\ \mathrm{kJ\,mol^{-1}}$) is much weaker than a $\sigma$ bond, so when $\mathrm{HBr}$ adds across $\mathrm{C{=}C}$ we trade one $\pi$ bond and one $\sigma$ bond for two stronger $\sigma$ bonds and the reaction is exothermic. The carbon–carbon double bond is therefore a store of reactive electron density — a theme of the chapter on addition — while the $\mathrm{C{-}C}$ and $\mathrm{C{-}H}$ bonds of an alkane are, comparatively, boring. That contrast, not a list of reactions, is what the functional-group idea is built on.

The scale this makes possible is hard to overstate: structural databases of carbon compounds now hold well over one hundred million entries and grow by roughly a million a year, and the theoretical number of possible $\mathrm{C_{30}}$ alkane isomers alone exceeds $4 \times 10^{9}$. No memory could catalog such a subject, and none has to — the functional-group idea compresses it, because a molecule's behaviour is mostly the sum of what its handful of groups do, weakly modulated by what surrounds them. Everything later in this course is a refinement of that compression.

The consequence for notation is that we do not write most atoms explicitly. A **skeletal formula** places a carbon at every vertex and line-end and omits hydrogens on carbon; heteroatoms (O, N, S, halogens) and their hydrogens are written out. Condensed formulae such as $\mathrm{CH_3CH_2OH}$ sit between the full structural formula and the skeletal drawing. Fluency means moving between the three representations at will, and being able to look at a zigzag of six line-ends and immediately read "hexane, $\mathrm{C_6H_{14}}$".

Skeletal formulae are flat, but molecules are not. When the third dimension matters — and in this course it very often does — one convention is added on top of the flat drawing: a **wedge** (a bond drawn as a tapering triangle) points out of the page towards you, a **dash** (a bond drawn as a series of short parallel lines) points behind the page, and an ordinary line lies in the plane of it. Four single bonds drawn as two lines plus a wedge plus a dash around one carbon therefore read "tetrahedral — and this is which way round". That small convention is the whole difference between a drawing and a model, and [[organic-1/stereochemistry]] turns it into a counting problem.

::: example Reading a skeletal formula {#ex-skeletal-read}
The skeletal structure of 3-methylhexane is a six-vertex zigzag carrying a one-carbon branch at the third vertex. Write its molecular formula and count the hydrogens on each carbon.
::: solution
Six carbons in the parent chain plus one methyl branch give $\mathrm{C_7H_{16}}$. Counting hydrogen by valence: C1 carries three, C2 two, C3 one (it bears the branch), C4 and C5 two each, C6 three, and the branch methyl three — sixteen in total, consistent with the alkane formula $\mathrm{C}_n\mathrm{H}_{2n+2}$ at $n = 7$.
:::
:::

::: example Counting atoms in a branched isomer {#ex-isooctane}
"Isooctane", the $100$-point of the octane rating scale, is 2,2,4-trimethylpentane. Draw its condensed formula from the name and count its atoms. How many of its hydrogens sit on carbons that bear no other carbon?
::: solution
The parent pentane chain is $\mathrm{C1{-}C2{-}C3{-}C4{-}C5}$; two methyls on C2 and one on C4 give the condensed formula $\mathrm{(CH_3)_3CCH_2CH(CH_3)_2}$. Carbons: $5 + 3 = 8$; hydrogens: $3(3) + 2 + 1 + 2(3) = 18$, so $\mathrm{C_8H_{18}}$, again $\mathrm{C}_n\mathrm{H}_{2n+2}$. Every carbon that bears no other carbon is a methyl: the three on C2 and the two on C4 make five methyls, so $5 \times 3 = 15$ of the eighteen hydrogens are on primary carbons. Counting by *kind* of carbon — primary, secondary, tertiary, quaternary — is the first habit of mechanism-chasing, because reactions care about the substitution pattern, not the formula.
:::
:::

::: quiz
Which of the following is **not** an acyclic alkane?
- [ ] $\mathrm{C_4H_{10}}$
- [x] $\mathrm{C_5H_{10}}$
- [ ] $\mathrm{C_6H_{14}}$
- [ ] $\mathrm{C_3H_8}$
::: solution
An acyclic alkane must have formula $\mathrm{C}_n\mathrm{H}_{2n+2}$. The formula $\mathrm{C_5H_{10}}$ has two hydrogens fewer than $\mathrm{C_5H_{12}}$, which means one ring or one $\pi$ bond — a degree of unsaturation — so it is not an alkane.
:::
:::

## Degrees of unsaturation

::: definition Degrees of unsaturation {#def-dou}
The **degree of unsaturation** (index of hydrogen deficiency) of a molecular formula is the number of rings plus $\pi$ bonds the structure must contain:
$$
\mathrm{DoU} = \frac{2C + 2 + N - H - X}{2},
$$
where $C, N, H, X$ are the numbers of carbons, nitrogens, hydrogens and halogens. Oxygen and sulfur do not change the count; each ring or each $\pi$ bond contributes one degree.
:::

The bookkeeping has a reason behind it rather than being a rule to memorize. A saturated acyclic compound is $\mathrm{C}_n\mathrm{H}_{2n+2}$; every ring or $\pi$ bond removes two hydrogens, halogens substitute for hydrogens one-for-one (so they are counted with $H$), and a nitrogen inserts an extra $\mathrm{CH}$-equivalent and brings one hydrogen with it (hence the $+N$). Oxygen inserts itself into an existing $\mathrm{C{-}H}$ or $\mathrm{C{-}C}$ bond without changing the hydrogen count, which is why it is invisible.

::: example Counting degrees of unsaturation {#ex-dou}
Find the degrees of unsaturation of (a) $\mathrm{C_4H_8O}$, (b) $\mathrm{C_7H_7NO_2}$, (c) $\mathrm{C_6H_6}$, (d) $\mathrm{C_6H_{12}O_6}$.
::: solution
(a) $\mathrm{DoU} = (2\times 4 + 2 - 8)/2 = 1$: one ring or one double bond; the oxygen is invisible to the count. (b) $\mathrm{DoU} = (2\times 7 + 2 + 1 - 7)/2 = 4$: the four degrees of an aromatic ring, as in *meta*-nitrotoluene. (c) $\mathrm{DoU} = (2\times 6 + 2 - 6)/2 = 4$: benzene's ring plus three $\pi$ bonds. (d) $\mathrm{DoU} = (2\times 6 + 2 - 12)/2 = 1$: glucose is acyclic with one $\mathrm{C{=}O}$, or (as it mostly exists in solution) a ring and no carbonyl — the formula alone cannot say which, and spectroscopy decides.
:::
:::

This is why the degree of unsaturation is the first thing computed in structure elucidation: before any spectrum is interpreted, the formula already tells you how many rings and multiple bonds the answer must contain, and a count of four is a standing invitation to look for a benzene ring. The full programme of reading formulas and spectra together belongs to [[spectroscopy/structure-problems]].

## The functional groups

Functional groups are the reactive units of organic molecules; the hydrocarbon framework is largely a spectator. The groups treated in this course are collected below with the suffix or prefix each contributes to a name.

::: definition The principal functional groups {#def-groups}
**Alkene** $\mathrm{C{=}C}$ (suffix *-ene*), **alkyne** $\mathrm{C{\equiv}C}$ (*-yne*), **haloalkane** $\mathrm{R{-}X}$ (prefixes *fluoro-*, *chloro-*, *bromo-*, *iodo-*), **alcohol** $\mathrm{R{-}OH}$ (*-ol*), **thiol** $\mathrm{R{-}SH}$ (*-thiol*), **ether** $\mathrm{R{-}O{-}R'}$ (as substituent, *alkoxy-*), **amine** $\mathrm{R{-}NH_2}$ (*-amine*), **aldehyde** $\mathrm{R{-}CHO}$ (*-al*), **ketone** $\mathrm{R_2C{=}O}$ (*-one*), **carboxylic acid** $\mathrm{R{-}COOH}$ (*-oic acid*), **ester** $\mathrm{R{-}COOR'}$ (*-oate*), **amide** $\mathrm{R{-}CONH_2}$ (*-amide*), **nitrile** $\mathrm{R{-}C{\equiv}N}$ (*-nitrile*). When several groups are present, the one highest in the IUPAC priority order becomes the suffix and the rest are cited as prefixes; the order you need first is acid > ester > amide > aldehyde > ketone > alcohol > amine > alkene > alkyne.
:::

Two structural ideas organize the whole list. First, the carbonyl group $\mathrm{C{=}O}$ appears in five of the entries (aldehyde, ketone, acid, ester, amide) and dominates the second half of the course; what distinguishes them is only what hangs off the carbonyl carbon, and the priority order above is almost exactly the order of how well those substituents stabilize the group. Second, the heteroatom groups (alcohols, amines, thiols, ethers) carry lone pairs and are therefore candidates for both acid–base and substitution chemistry — which is why the next two chapters are about acidity and about curly arrows.

::: warning The carbon-count trap {#warn-parent-chain}
The parent name counts the longest chain that *contains the principal group*, not the longest chain that happens to exist. A five-carbon chain with a methyl branch near the middle can be named as a pentane derivative only when the chain through the branch is chosen; choosing the wrong parent is the most common beginner's error in nomenclature, and it silently changes every locant.
:::

::: example Identifying groups in a real molecule {#ex-aspirin}
Aspirin (acetylsalicylic acid) is $\mathrm{o{-}CH_3COOC_6H_4COOH}$: a benzene ring carrying a carboxyl group and, next to it, an $\mathrm{O}$ joined to a $\mathrm{C(=O)CH_3}$ unit. List its functional groups and predict, from the groups alone, one reaction it should undergo.
::: solution
Three groups: an **aromatic ring**, a **carboxylic acid** ($\mathrm{-COOH}$), and an **ester** ($\mathrm{-O{-}C(=O){-}}$, written backwards from the usual $\mathrm{R{-}COOR'}$ because the ring oxygen is the ester's single-bonded oxygen — it is not an ether and not a ketone). From the groups: the carboxylic acid makes it acidic ($\mathrm{p}K_\mathrm{a} \approx 3.5$, stronger than a plain aliphatic acid because the ring transmits the neighbouring oxygen's pull), and the ester should hydrolyse in hot aqueous base to the carboxylate of salicylic acid plus ethanoate. Both predictions are correct — reading groups is reading reactivity.
:::
:::

::: widget graph
nodes: C1; C2; C3; C4; C5; C6
edges: C1-C2; C2-C3; C3-C4; C4-C5; C5-C6
caption: The carbon skeleton of hexane drawn as a graph: six vertices in a chain. In skeletal notation the same molecule is a six-vertex zigzag with hydrogens implied. The graph view anticipates the reaction networks of later chapters, where molecules are nodes and reactions are edges.
:::

## Naming: the IUPAC system

::: proposition The IUPAC algorithm {#prop-nomenclature}
To name a structure: (1) find the longest chain containing the principal functional group — this fixes the parent hydride (meth-, eth-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-); (2) number from the end that gives the principal group the lowest locant, then multiple bonds, then substituents; (3) cite substituents as prefixes in alphabetical order, ignoring multiplicative prefixes (di-, tri-) when alphabetizing; (4) attach the suffix for the principal group, dropping a terminal "e" before a vowel-initial suffix (pentan-2-ol, but 1-bromopentane keeps the e). When the two directions of numbering give the same locant set, the first point of difference decides, and if even that ties, the alphabetically first substituent gets the lower locant. Punctuation carries meaning too: numbers are separated from numbers by commas and from letters by hyphens, so 2,3-dimethylpentane and 2-(1-methylethyl)pentane are punctuated claims about structure, not typographic decoration; complex substituents are cited in parentheses and alphabetized under their first letter.
:::

::: example A branched name worked through {#ex-naming-branched}
Name $\mathrm{(CH_3)_2CHCH_2CHClCH_3}$.
::: solution
The longest chain runs through the chloro-bearing carbon and contains five carbons; the sixth carbon is a methyl branch. Numbering from the left places chloro at C4 and methyl at C2; numbering from the right places chloro at C2 and methyl at C4. The locant sets are $\{2,4\}$ in both directions, so the tie is broken alphabetically: chloro, cited first, receives the lower locant. The name is **2-chloro-4-methylpentane**.
:::
:::

::: example Naming with a suffix group {#ex-naming-ol}
Name $\mathrm{CH_3CH_2CH(OH)CH_2CH_3}$, and explain when a locant may be omitted.
::: solution
The molecule is symmetric: numbering from either end places the hydroxyl at C3, so pentan-3-ol is unambiguous even without the locant, though it is normally given. Asymmetric alcohols such as pentan-2-ol require the locant, because pentan-2-ol and pentan-3-ol are different compounds.
:::
:::

::: example When the suffix outranks the double bond {#ex-naming-enone}
Name $\mathrm{CH_2{=}CHCH_2COCH_3}$.
::: solution
The chain has five carbons and carries two features: a ketone (a suffix group) and a double bond (an unsaturation, cited as *-en-*). The principal group is numbered first and gets the lower locant, so numbering starts at the methyl end: the carbonyl sits at C2 and the double bond between C4 and C5. The name is **pent-4-en-2-one** — not pent-1-en-4-one, which would number the alkene at the expense of the suffix. The same logic gives pent-1-en-3-one for the isomer numbered the other way.
:::
:::

::: history
Systematic nomenclature grew out of a real problem. Before 1890, important compounds carried several names, and the growing literature was becoming unusable. The 1892 Geneva Congress produced the first international naming convention, and the chemical societies of Britain and the United States adapted it through the twentieth century into the IUPAC recommendations still in force. The 2013 recommendations revised the rules toward graph-theoretical precision — hence the placement of the locant inside the name (pentan-2-ol rather than 2-pentanol). The parallel history of structural theory — Kekulé and Couper's tetravalent carbon in 1858, the isomerism puzzles that naming was designed to resolve — shows that nomenclature is not bureaucracy but a formal encoding of structure itself.
:::

## Physical properties follow composition

Naming and counting are only the entry ticket; the reason functional groups matter is that they control properties. Boiling points rise along a homologous series because each $\mathrm{CH_2}$ adds surface area and dispersion forces: the boiling points of the $n$-alkanes climb steeply at small chain length and then more slowly, from pentane's $309\ \mathrm{K}$ to decane's $447\ \mathrm{K}$. Branching lowers boiling points by reducing the molecular surface available for dispersion — 2,2-dimethylpropane boils at $283\ \mathrm{K}$, some $26\ \mathrm{K}$ below its unbranched isomer pentane, at $309\ \mathrm{K}$.

::: widget regression
points: 3,-42; 4,-1; 5,36; 6,69; 7,98; 8,126; 9,151; 10,174
degree: 1
x: 2, 11
caption: Boiling points of the $n$-alkanes ($\mathrm{C_3}$–$\mathrm{C_{10}}$, $^\circ\mathrm{C}$) against carbon number, with the least-squares line. The fit is nearly linear over this window — each $\mathrm{CH_2}$ adds about $30\ \mathrm{^\circ C}$ on average — but the *increment* shrinks along the series ($41\ \mathrm{^\circ C}$ from propane to butane, $23\ \mathrm{^\circ C}$ from nonane to decane) because dispersion grows fastest when the molecule is small. Drag a point and watch $R^2$ fall: homologous-series data are a chemist's calibration line, and their linearity is what lets us estimate an unknown boiling point to a few degrees from the formula alone.
:::

Hydrogen bonding moves boiling points by tens of degrees. Ethanol ($M = 46$) boils at $351\ \mathrm{K}$ while its constitutional isomer dimethyl ether boils at $248\ \mathrm{K}$ and propane ($M = 44$) at $231\ \mathrm{K}$: only ethanol has an $\mathrm{O{-}H}$ bond whose hydrogen can join two molecules into a chain that the liquid holds together. The same effect explains why pentan-1-ol boils at $411\ \mathrm{K}$, some $70\ \mathrm{K}$ above hexane ($342\ \mathrm{K}$) at nearly identical molar mass, and why the small alcohols — methanol through butan-1-ol — are miscible with water in all proportions while pentan-1-ol dissolves only to about $0.3\ \mathrm{mol\,dm^{-3}}$: the hydroxyl group pays the cost of dissolving in water, but the hydrocarbon chain charges one, and beyond five carbons the chain wins. Polarity is more modest than the formulas suggest — chloromethane's dipole moment is $1.9\ \mathrm{D}$, and even the $\mathrm{C{=}O}$ group's $2.4\ \mathrm{D}$ buys only partial solubility — but it is polarity, not dispersion, that orients the polar reactions of the next chapters.

Composition also dictates how a functional group announces itself in the laboratory, and a short list of classical qualitative tests is worth keeping as a preview of reactivity: alkenes decolourise brown bromine solution in the dark by fast addition across the $\pi$ bond; carboxylic acids dissolve in aqueous sodium hydrogencarbonate with effervescence of $\mathrm{CO_2}$, where most phenols do not; alcohols evolve hydrogen with sodium metal. Each test is simply one reaction from this course turned into the question "is the group present?" — the logic of identification is the logic of mechanism, asked politely. (Such tests are classroom demonstrations for supervised conditions with a risk assessment, not recipes.) Acidity, the other great property axis and the one that governs mechanism most directly, is taken up in [[organic-1/acidity-mechanism]].

## Where this leads

The three-dimensional consequences of tetravalent carbon — what a zigzag really looks like — are the subject of [[organic-1/conformations]]; when a carbon carries four *different* groups the counting of isomers explodes into [[organic-1/stereochemistry]]. The functional groups introduced here become reaction mechanisms once you can write electron flow, which is the grammar of [[organic-1/acidity-mechanism]] and then of [[organic-1/nucleophilic-substitution]] and [[organic-1/elimination]]; the carbonyl groups previewed above fill the second course, [[organic-2/carbonyl-addition]]. The bonding ideas assumed throughout — hybridisation, bond enthalpies, electronegativity — are developed quantitatively in [[bonding-structure/valence-bond]].

::: summary
- Skeletal formulae imply carbons at vertices and hydrogens on carbon by valence; heteroatoms and their hydrogens are drawn explicitly.
- A $\pi$ bond is weaker than a $\sigma$ bond ($\mathrm{C{=}C}$: $614$ vs $2 \times 348\ \mathrm{kJ\,mol^{-1}}$), which is why multiple bonds are the reactive sites and alkanes are not.
- Degrees of unsaturation count rings and $\pi$ bonds: $\mathrm{DoU} = (2C + 2 + N - H - X)/2$; oxygen and sulfur are invisible, halogens count as hydrogen, nitrogen adds one.
- Functional groups are the reactive units; the hydrocarbon skeleton is a spectator that tunes solubility and boiling point, and the carbonyl family runs from aldehydes to amides.
- IUPAC names encode structure uniquely: longest chain containing the principal group, lowest locants (suffix first, then unsaturations, then prefixes), alphabetical citation of prefixes.
- Physical properties follow composition: dispersion rises with surface area, branching lowers it, and hydrogen bonding dominates everything else in its reach.
- Naming is a skill to be drilled, not memorized: every name is an algorithm applied to a graph.
:::

## Exercises

::: exercise Drawing skeletal formulae {level=1}
Draw the skeletal formula of 3-ethyl-2-methylhexane and give its molecular formula.
::: solution
The parent hexane chain carries a methyl branch at C2 and an ethyl branch at C3; the molecular formula is $\mathrm{C_9H_{20}}$.
:::
:::

::: exercise Degrees of unsaturation {level=1 check="2"}
How many degrees of unsaturation does $\mathrm{C_5H_8}$ have? Enter the number.
::: solution
$\mathrm{DoU} = (2\times 5 + 2 - 8)/2 = 2$: two rings and/or $\pi$ bonds, as in cyclopentene or penta-1,4-diene.
:::
:::

::: exercise Counting hydrogens {level=1 check="12"}
How many hydrogen atoms are in 2-methylpentan-3-one, $\mathrm{C_6H_{12}O}$? Enter the number.
::: solution
The formula says it directly: twelve hydrogens. Structurally, the carbonyl consumes one degree of unsaturation and the remaining formula is that of a substituted pentane.
:::
:::

::: exercise Naming with priority {level=2}
Name $\mathrm{HOCH_2CH{=}CHCH_2OH}$ correctly, explaining the numbering.
::: solution
The alcohol groups are the suffix groups, and the chain is numbered to give them the lowest locants; the double bond is then cited as an unsaturation. With hydroxyls at C1 and C5, the double bond lies between C2 and C3 (equivalently C3 and C4 by symmetry), so the correct name is **pent-2-ene-1,5-diol**, with an *E* or *Z* descriptor added once the geometry is known (see [[organic-1/stereochemistry]]).
:::
:::

::: exercise From name to structure {level=2}
Draw 4-bromo-2-methylpentan-2-ol and state which carbons are stereocentres.
::: solution
The structure is $\mathrm{(CH_3)_2C(OH)CH_2CHBrCH_3}$. C2 bears two identical methyl groups and is not a stereocentre; C4 bears H, Br, and two different carbon substituents and **is** a stereocentre.
:::
:::

::: exercise Functional group identification {level=2}
Identify every functional group in methyl benzoate, $\mathrm{C_6H_5COOCH_3}$, and predict whether its boiling point should lie above or below that of methylcyclohexane ($344\ \mathrm{K}$, similar molar mass).
::: solution
An aromatic ring and an ester group. The methoxy carbon belongs to the ester and is not a separate ether; the ring is not an alkene. The ester is polar and has no $\mathrm{O{-}H}$, so it cannot hydrogen-bond to itself, but its dipole and large polarizable $\pi$ system raise the boiling point: methyl benzoate boils at $473\ \mathrm{K}$, far above methylcyclohexane.
:::
:::

::: exercise Structure from spectra {level=3}
A compound $\mathrm{C_4H_8O}$ shows one degree of unsaturation and a strong infrared band near $1715\ \mathrm{cm^{-1}}$. Propose two structures consistent with the data.
::: solution
The carbonyl band identifies an aldehyde or ketone, and one degree of unsaturation means the molecule is acyclic. Consistent structures include butanal $\mathrm{CH_3CH_2CH_2CHO}$, butan-2-one $\mathrm{CH_3COCH_2CH_3}$, and 2-methylpropanal $\mathrm{(CH_3)_2CHCHO}$.
:::
:::

::: exercise Counting isomers {level=3}
Enumerate all the acyclic secondary alcohols with formula $\mathrm{C_5H_{12}O}$ and give their IUPAC names.
::: solution
A secondary alcohol has the carbinol carbon bearing exactly one hydrogen and two carbon substituents. The possibilities are pentan-2-ol, pentan-3-ol, and 3-methylbutan-2-ol. (Pentan-1-ol and 2-methylbutan-1-ol are primary; 2-methylbutan-2-ol and 2-methylpropan-2-ol are tertiary.) There are exactly three secondary alcohols.
:::
:::
