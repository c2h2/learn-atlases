Organic chemistry is the chemistry of carbon compounds, and its first skill is fluency in the shorthand that working chemists actually use. Nobody draws every carbon and hydrogen of a large molecule; instead we draw **skeletal formulae**, in which carbons are implied at every vertex and line-end and hydrogens on carbon are implied by valence. Functional groups — the reactive parts of the molecule — are drawn out explicitly, because they are where the chemistry happens. This lesson builds that vocabulary: why carbon produces so many compounds, the notation that encodes them, the functional groups that define their reactivity, and the IUPAC naming system that turns a structure into a unique name and back again.

## Why carbon, and why so many compounds

::: definition Tetravalence and catenation {#def-tetravalence}
Carbon is tetravalent: it forms four bonds in its stable neutral compounds. Its valence electron configuration $2s^2 2p^2$ hybridizes to $sp^3$, $sp^2$ or $sp$, giving bond angles near $109.5^\circ$, $120^\circ$ and $180^\circ$ respectively. Carbon also excels at **catenation** — bonding to itself in long chains and rings — because the $\mathrm{C{-}C}$ bond is strong ($\approx 348\ \mathrm{kJ\,mol^{-1}$) and the alternatives available to other elements do not destabilize the chain. Silicon also catenates, but its bonds to itself are weaker and its bonds to oxygen so strong that silicon chemistry runs to silicates, not to life.
:::

The consequence for notation is that we do not write most atoms explicitly. A **skeletal formula** places a carbon at every vertex and line-end and omits hydrogens on carbon; heteroatoms (O, N, S, halogens) and their hydrogens are written out. Condensed formulae such as $\mathrm{CH_3CH_2OH}$ sit between the full structural formula and the skeletal drawing. Fluency means moving between the three representations at will, and being able to look at a zigzag of six line-ends and immediately read "hexane, $\mathrm{C_6H_{14}}$".

::: example Reading a skeletal formula {#ex-skeletal-read}
The skeletal structure of 3-methylhexane is a six-vertex zigzag carrying a one-carbon branch at the third vertex. Write its molecular formula and count the hydrogens on each carbon.
::: solution
Six carbons in the parent chain plus one methyl branch give $\mathrm{C_7H_{16}}$. Counting hydrogen by valence: C1 carries three, C2 two, C3 one (it bears the branch), C4 and C5 two each, C6 three, and the branch methyl three — sixteen in total, consistent with the alkane formula $\mathrm{C}_n\mathrm{H}_{2n+2}$ at $n = 7$.
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

::: example Counting degrees of unsaturation {#ex-dou}
Find the degrees of unsaturation of (a) $\mathrm{C_4H_8O}$, (b) $\mathrm{C_7H_7NO_2}$, (c) $\mathrm{C_6H_6}$.
::: solution
(a) $\mathrm{DoU} = (2\times 4 + 2 - 8)/2 = 1$: one ring or one double bond; the oxygen is invisible to the count. (b) $\mathrm{DoU} = (2\times 7 + 2 + 1 - 7)/2 = 4$: the four degrees of an aromatic ring, as in *meta*-nitrotoluene. (c) $\mathrm{DoU} = (2\times 6 + 2 - 6)/2 = 4$: benzene's ring plus three $\pi$ bonds.
:::
:::

## The functional groups

Functional groups are the reactive units of organic molecules; the hydrocarbon framework is largely a spectator. The groups treated in this course are collected below with the suffix or prefix each contributes to a name.

::: definition The principal functional groups {#def-groups}
**Alkene** $\mathrm{C{=}C}$ (suffix *-ene*), **alkyne** $\mathrm{C{\equiv}C}$ (*-yne*), **haloalkane** $\mathrm{R{-}X}$ (prefixes *fluoro-*, *chloro-*, *bromo-*, *iodo-*), **alcohol** $\mathrm{R{-}OH}$ (*-ol*), **ether** $\mathrm{R{-}O{-}R'}$ (as substituent, *alkoxy-*), **amine** $\mathrm{R{-}NH_2}$ (*-amine*), **aldehyde** $\mathrm{R{-}CHO}$ (*-al*), **ketone** $\mathrm{R_2C{=}O}$ (*-one*), **carboxylic acid** $\mathrm{R{-}COOH}$ (*-oic acid*), **ester** $\mathrm{R{-}COOR'}$ (*-oate*), **amide** $\mathrm{R{-}CONH_2}$ (*-amide*). When several groups are present, the one highest in the IUPAC priority order becomes the suffix and the rest are cited as prefixes.
:::

::: warning The carbon-count trap
The parent name counts the longest chain that *contains the principal group*, not the longest chain that happens to exist. A five-carbon chain with a methyl branch near the middle can be named as a pentane derivative only when the chain through the branch is chosen; choosing the wrong parent is the most common beginner's error in nomenclature, and it silently changes every locant.
:::

::: widget graph
nodes: C1; C2; C3; C4; C5; C6
edges: C1-C2; C2-C3; C3-C4; C4-C5; C5-C6
caption: The carbon skeleton of hexane drawn as a graph: six vertices in a chain. In skeletal notation the same molecule is a six-vertex zigzag with hydrogens implied. The graph view anticipates the reaction networks of later chapters, where molecules are nodes and reactions are edges.
:::

## Naming: the IUPAC system

::: proposition The IUPAC algorithm {#prop-nomenclature}
To name a structure: (1) find the longest chain containing the principal functional group — this fixes the parent hydride (meth-, eth-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-); (2) number from the end that gives the principal group the lowest locant, then multiple bonds, then substituents; (3) cite substituents as prefixes in alphabetical order, ignoring multiplicative prefixes (di-, tri-) when alphabetizing; (4) attach the suffix for the principal group, dropping a terminal "e" before a vowel-initial suffix (pentan-2-ol, but 1-bromopentane keeps the e).
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

::: history
Systematic nomenclature grew out of a real problem. Before 1890, important compounds carried several names, and the growing literature was becoming unusable. The 1892 Geneva Congress produced the first international naming convention, and the chemical societies of Britain and the United States adapted it through the twentieth century into the IUPAC recommendations still in force. The 2013 recommendations revised the rules toward graph-theoretical precision. The parallel history of structural theory — Kekulé and Couper's tetravalent carbon in 1858, the isomerism puzzles that naming was designed to resolve — shows that nomenclature is not bureaucracy but a formal encoding of structure itself.
:::

## Physical properties follow composition

Naming and counting are only the entry ticket; the reason functional groups matter is that they control properties. Boiling points rise along a homologous series because each $\mathrm{CH_2}$ adds surface area and dispersion forces: the boiling points of the $n$-alkanes climb steeply at small chain length and then more slowly, from pentane's $309\ \mathrm{K}$ to decane's $447\ \mathrm{K}$. Branching lowers boiling points by reducing the molecular surface available for dispersion, while hydroxyl groups raise them dramatically through hydrogen bonding — pentanol boils at $351\ \mathrm{K}$, some $40\ \mathrm{K}$ above hexane despite a similar molar mass. Acidity, the other great property axis, is taken up in the next chapter.

::: summary
- Skeletal formulae imply carbons at vertices and hydrogens on carbon by valence; heteroatoms and their hydrogens are drawn explicitly.
- Degrees of unsaturation count rings and $\pi$ bonds: $\mathrm{DoU} = (2C + 2 + N - H - X)/2$; oxygen and sulfur are invisible.
- Functional groups are the reactive units; the hydrocarbon skeleton is a spectator that tunes solubility and boiling point.
- IUPAC names encode structure uniquely: longest chain containing the principal group, lowest locants, alphabetical citation of prefixes.
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
The alcohol groups are the suffix groups, and the chain is numbered to give them the lowest locants; the double bond is then cited as an unsaturation. With hydroxyls at C1 and C5, the double bond lies between C2 and C3 (equivalently C3 and C4 by symmetry), so the correct name is **(E/Z)-pent-2-ene-1,5-diol**.
:::
:::
:::

::: exercise From name to structure {level=2}
Draw 4-bromo-2-methylpentan-2-ol and state which carbons are stereocentres.
::: solution
The structure is $\mathrm{(CH_3)_2C(OH)CH_2CHBrCH_3}$. C2 bears two identical methyl groups and is not a stereocentre; C4 bears H, Br, and two different carbon substituents and **is** a stereocentre.
:::
:::

::: exercise Functional group identification {level=2}
Identify every functional group in methyl benzoate, $\mathrm{C_6H_5COOCH_3}$.
::: solution
An aromatic ring and an ester group. The methoxy carbon belongs to the ester and is not a separate ether; the ring is not an alkene.
:::
:::

::: exercise Structure from spectra {level=3}
A compound $\mathrm{C_4H_8O}$ shows one degree of unsaturation and a strong infrared band near $1715\ \mathrm{cm^{-1}}$. Propose two structures consistent with the data.
::: solution
The carbonyl band identifies an aldehyde or ketone, and one degree of unsaturation means the molecule is acyclic. Consistent structures include butanal $\mathrm{CH_3CH_2CH_2CHO}$, butan-2-one $\mathrm{CH_3COCH_2CH_3}$, and 2-methylpropanal $\mathrm{(CH_3)_2CHCHO}$.
:::
:::

::: exercise counting isomers {level=3}
Enumerate all the acyclic secondary alcohols with formula $\mathrm{C_5H_{12}O}$ and give their IUPAC names.
::: solution
A secondary alcohol has the carbinol carbon bearing exactly one hydrogen and two carbon substituents. The possibilities are pentan-2-ol, pentan-3-ol, and 3-methylbutan-2-ol. (Pentan-1-ol and 2-methylbutan-1-ol are primary; 2-methylbutan-2-ol and 2-methylpropan-2-ol are tertiary.) There are exactly three secondary alcohols.
:::
:::
