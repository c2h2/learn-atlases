Every approximation in this course so far has been an admission: we cannot solve the Schrödinger equation, so we guess, we perturb, we truncate. Symmetry is the opposite. Where a molecule's shape is symmetric, symmetry gives results that are *exact* — no trial functions, no series, no error bars — and it gives them by counting. Which vibrations can absorb infrared light? Which electronic transitions are forbidden? Which atomic orbitals can enter a molecular orbital at all? None of these questions requires a number, and group theory is the bookkeeping system that answers all of them from the point group alone. The reason it works is the one we have met throughout: the Hamiltonian of a molecule commutes with every symmetry operation of its nuclear framework, and operators that commute share eigenfunctions — so the eigenfunctions of a molecule must be *shaped* by its symmetry before we ever compute a single energy. This is why Eugene Wigner, who built the quantum mechanics of symmetry, could call group theory the natural language of a physics that has stopped describing orbits and started describing transitions.

## Symmetry elements and operations

::: definition Symmetry elements and operations {#def-sym-elements}
A **symmetry operation** is a motion of the molecule — a rotation, a reflection, an inversion — after which every atom sits on an equivalent atom and the molecule is indistinguishable from what it was. The **symmetry element** is the geometric object (a point, line or plane) with respect to which the operation is performed. The operations are: the identity $E$ (do nothing); a **proper rotation** $C_{n}$ through $360^\circ/n$ about an $n$-fold **axis**; a **reflection** $\sigma$ in a mirror **plane**; the **inversion** $i$ through a centre; and an **improper rotation** $S_{n}$ — a rotation $C_{n}$ followed by reflection in the plane perpendicular to the axis. The **order** of a group is the number of its operations.
:::

Each operation has an inverse within the set: $C_{3}^{2}$ undoes $C_{3}$, every reflection and inversion is its own inverse, and $S_{n}^{n}=E$ for even $n$. Two conventions matter for the mirror planes. If a molecule has a unique highest-order axis — the **principal axis**, conventionally $z$ — then a plane *containing* it is a **vertical** mirror plane $\sigma_\mathrm{v}$, a plane *perpendicular* to it is **horizontal** $\sigma_\mathrm{h}$, and a vertical plane that bisects the angle between two $C_{2}$ axes perpendicular to the principal axis is **dihedral** $\sigma_\mathrm{d}$.

Water has exactly four operations: $E$, one $C_{2}$ about the bisector of the H–O–H angle, and two mirror planes — the molecular plane and the plane perpendicular to it that contains the $C_{2}$ axis. Ammonia has six: $E$, two rotations $C_{3},C_{3}^{2}$ about its threefold axis, and three $\sigma_\mathrm{v}$ planes, each containing one N–H bond. Benzene has twelve *plus* more: $E$, $C_{6},C_{3},C_{2},C_{3}^{2},C_{6}^{5}$ about the ring axis, six $C_{2}$ axes in the ring plane, a $\sigma_\mathrm{h}$, six vertical planes, an inversion centre, $S_{3}$ axes and $S_{6}$ axes — twenty-four operations in all, and the reason benzene's spectrum is so much more constrained than ethene's. Methane carries three $S_{4}$ axes that coincide with its $C_{2}$ axes: rotate by $90^\circ$ and reflect, and the molecule reappears even though no $90^\circ$ rotation alone does — an improper axis with no proper counterpart. Xenon oxytetrafluoride $\mathrm{XeOF_{4}}$ is square pyramidal: one $C_{4}$ axis through Xe=O, two $\sigma_\mathrm{v}$ planes, and nothing else — eight operations. Staggered and eclipsed ethane differ by a single $\sigma_\mathrm{h}$: the eclipsed form has the mirror plane of the $\mathrm{CH_{2}}$ groups, the staggered form trades it for an inversion centre.

::: example Counting operations {#ex-count-ops}
List the operations of $\mathrm{BF_{3}}$ and count them.
::: solution
The principal axis is $C_{3}$ along the B–F bond pattern (perpendicular to the plane), giving $E$, $C_{3}$, $C_{3}^{2}$. Each B–F bond is a $C_{2}$ axis in the molecular plane: three of them. The molecular plane itself is $\sigma_\mathrm{h}$, and each $C_{2}$ axis carries a vertical plane: three $\sigma_\mathrm{v}$. Total: $3+3+1+3=12$ operations — the group $\mathrm{D_{3h}}$, whose order is twelve. Note how the count works: the $C_{3}$ family contributes three, each of the three $C_{2}$ axes one, and each mirror plane one.
:::
:::

::: widget transform2d
matrix: -1, 0; 0, 1
eigen: true
vector: 1, 0.5
caption: The reflection $\sigma_{v}(xz)$ of water acting on the $(x,y)$ coordinates of the atoms perpendicular to the molecular plane, as a matrix with determinant $-1$. Its eigenvector with eigenvalue $+1$ is the mirror line itself (unchanged), and the eigenvector with eigenvalue $-1$ is perpendicular to it (flipped) — every symmetry operation is a matrix, and its characters are just the sum of these stretches.
:::

## The symmetry group of a molecule

::: definition Group {#def-group}
A **group** is a set of elements with a multiplication satisfying four axioms: **closure** (the product of two elements is in the set — two symmetry operations performed in succession give a third); **associativity**; an **identity** element $E$; and an **inverse** $A^{-1}$ for every element with $AA^{-1}=E$. The symmetry operations of any molecule form a group — the **point group** — because every operation leaves at least one point fixed and the product of two such operations does too. If $AB=BA$ for all elements the group is **Abelian**.
:::

The point of the abstraction is that every operation can be written as a matrix acting on coordinates, and the matrices obey the same multiplication table as the operations. For $\mathrm{C_{2v}}$ with $z$ on the $C_{2}$ axis and $x$ in the molecular plane:

$$
E=\begin{pmatrix}1&0&0\\0&1&0\\0&0&1\end{pmatrix},\quad
C_{2}=\begin{pmatrix}-1&0&0\\0&-1&0\\0&0&1\end{pmatrix},\quad
\sigma_{v}(xz)=\begin{pmatrix}1&0&0\\0&-1&0\\0&0&1\end{pmatrix},\quad
\sigma_{v}'(yz)=\begin{pmatrix}-1&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

Multiplying out, $C_{2}\,\sigma_{v}(xz)=\sigma_{v}'(yz)$: the group closes, and the table is that of the Klein four-group — Abelian, and isomorphic to $\mathrm{C_{2v}}$. Operations with the same character in every representation fall into **classes**; in $\mathrm{C_{2v}}$ every operation is its own class, but in $\mathrm{C_{3v}}$ the two rotations $C_{3},C_{3}^{2}$ form one class and the three $\sigma_\mathrm{v}$ another, because they are conjugate — related by a change of axes.

::: algorithm Assigning a point group {#algo-pointgroup}
1. Is the molecule linear? Then $\mathrm{C_{\infty v}}$ (no centre, HCl) or $\mathrm{D_{\infty h}}$ (centre, $\mathrm{CO_{2}}$).
2. Very high symmetry? $\mathrm{T_{d}}$ (methane), $\mathrm{O_{h}}$ ($\mathrm{SF_{6}}$), $\mathrm{I_{h}}$ ($\mathrm{C_{60}}$).
3. Find the highest-order axis $C_{n}$ — the principal axis. None? $\mathrm{C_{1}}$, $\mathrm{C_{s}}$ or $\mathrm{C_{i}}$.
4. Are there $n$ $C_{2}$ axes perpendicular to $C_{n}$? Yes: a $\mathrm{D}$ group; no: a $\mathrm{C}$ or $\mathrm{S}$ group.
5. A $\sigma_\mathrm{h}$? Then $\mathrm{D_{nh}}$ (or $\mathrm{C_{nh}}$). No $\sigma_\mathrm{h}$ but $n$ $\sigma_\mathrm{v}$? Then $\mathrm{D_{nd}}$ (or $\mathrm{C_{nv}}$). No mirrors but an $S_{2n}$? $\mathrm{D_{nd}}$ or $\mathrm{S_{2n}}$.
6. Nothing else fits: $\mathrm{C_{n}}$.
:::

::: example Assigning point groups {#ex-assign}
Assign: $\mathrm{H_{2}O}$, $\mathrm{NH_{3}}$, $\mathrm{BF_{3}}$, $\mathrm{CH_{4}}$, $\mathrm{SF_{6}}$, *trans*$\text{-}\mathrm{MA_{2}B_{4}}$, $\mathrm{CHCl_{3}}$, staggered ethane.
::: solution
$\mathrm{H_{2}O}$: one $C_{2}$, two $\sigma_\mathrm{v}$, no $\sigma_\mathrm{h}$, no perpendicular $C_{2}$ — $\mathrm{C_{2v}}$. $\mathrm{NH_{3}}$: $C_{3}$ with three $\sigma_\mathrm{v}$ — $\mathrm{C_{3v}}$. $\mathrm{BF_{3}}$: $C_{3}$, three perpendicular $C_{2}$, a $\sigma_\mathrm{h}$ — $\mathrm{D_{3h}}$. $\mathrm{CH_{4}}$: four $C_{3}$, three $C_{2}$, six $\sigma_\mathrm{d}$, three $S_{4}$ — $\mathrm{T_{d}}$. $\mathrm{SF_{6}}$: add the inversion centre to the octahedron — $\mathrm{O_{h}}$. *trans*$\text{-}\mathrm{MA_{2}B_{4}}$: $C_{4}$ along A–M–A, four $C_{2}$, $\sigma_\mathrm{h}$, $i$ — $\mathrm{D_{4h}}$. $\mathrm{CHCl_{3}}$: like ammonia, $C_{3}$ with three $\sigma_\mathrm{v}$ — $\mathrm{C_{3v}}$. Staggered ethane: $C_{3}$, three $C_{2}$, no $\sigma_\mathrm{h}$ but three $\sigma_\mathrm{d}$ and an $S_{6}$ — $\mathrm{D_{3d}}$. The two ethanes differ by exactly the element that interchanges the two $\mathrm{CH_{3}}$ groups: a mirror in the eclipsed form, an inversion in the staggered.
:::
:::

::: widget cayley
group: V4
mode: table
highlight: a
caption: The multiplication table of the Klein four-group $V_{4}$ — abstractly, $\mathrm{C_{2v}}$ — with the subgroup ${E,a}$ highlighted and its coset ${b,c}$. Every entry is its own inverse and the group is Abelian: exactly the structure of $\{E,\;C_{2},\;\sigma_{v},\;\sigma_{v}'\}$ of water.
:::

A molecule is **chiral** — optically active, resolvable into left and right hands — exactly when its point group contains no improper operation $S_{n}$ (with $\sigma=S_{1}$ and $i=S_{2}$ as the common cases). The chiral point groups are therefore $\mathrm{C_{1}}$, $\mathrm{C_{n}}$, $\mathrm{D_{n}}$, $\mathrm{T}$, $\mathrm{O}$, $\mathrm{I}$: no mirror, no centre, no $S_{4}$. This is the group-theoretic form of the undergraduate rule "a carbon with four different groups", and it is more reliable: *cis*$\text{-}\mathrm{[M(AA)_{2}]}$ complexes are chiral with no chiral carbon in sight, while a molecule with two stereocentres can be a meso compound precisely because it has an $i$ or a $\sigma$.

## Representations and characters

::: definition Representation and character {#def-representation}
A **representation** $\Gamma$ of a group is an assignment of a matrix $\Gamma(R)$ to every operation $R$ such that $\Gamma(RS)=\Gamma(R)\Gamma(S)$ — a matrix copy of the multiplication table, built on some chosen **basis** of functions. The **character** $\chi(R)$ is the trace of $\Gamma(R)$, the sum of its diagonal elements. A representation whose matrices can all be block-diagonalised at once is **reducible**; the blocks that cannot be reduced further are the **irreducible representations** (irreps), and every representation is a sum of them: $\Gamma=\sum_{i}n_{i}\Gamma_{i}$.
:::

A **character table** lists the irreps of a point group as rows, the classes as columns, and the characters as entries; the right-hand columns list the linear functions $x,y,z$ and the quadratic functions $x^{2},xy,\dots$ that transform as each irrep — the bookkeeping we need for selection rules. For $\mathrm{C_{2v}}$ (with the molecular plane as $xz$, the convention we will keep):

| $\mathrm{C_{2v}}$ | $E$ | $C_{2}$ | $\sigma_{v}(xz)$ | $\sigma_{v}'(yz)$ |  |
|---|---|---|---|---|---|
| $\mathrm{A_{1}}$ | $1$ | $1$ | $1$ | $1$ | $z$ |
| $\mathrm{A_{2}}$ | $1$ | $1$ | $-1$ | $-1$ | $R_{z}$ |
| $\mathrm{B_{1}}$ | $1$ | $-1$ | $1$ | $-1$ | $x,\;R_{y}$ |
| $\mathrm{B_{2}}$ | $1$ | $-1$ | $-1$ | $1$ | $y,\;R_{x}$ |

Read a row as a recipe: $\mathrm{B_{1}}$ is any function that changes sign under $C_{2}$, stays unchanged under $\sigma_{v}(xz)$ and changes sign under $\sigma_{v}'(yz)$ — and $x$ does exactly that. The letters carry meaning: $\mathrm{A}$ is non-degenerate with character $+1$ under the principal rotation, $\mathrm{B}$ is non-degenerate with $-1$, $\mathrm{E}$ is doubly degenerate, $\mathrm{T}$ triply; subscripts $\mathrm{g/u}$ mark behaviour under inversion (gerade/ungerade) and $'$/$''$ behaviour under $\sigma_\mathrm{h}$. For $\mathrm{C_{3v}}$:

| $\mathrm{C_{3v}}$ | $E$ | $2C_{3}$ | $3\sigma_{v}$ |  |
|---|---|---|---|---|
| $\mathrm{A_{1}}$ | $1$ | $1$ | $1$ | $z$ |
| $\mathrm{A_{2}}$ | $1$ | $1$ | $-1$ | $R_{z}$ |
| $\mathrm{E}$ | $2$ | $-1$ | $0$ | $(x,y),\;(R_{x},R_{y})$ |

::: proposition The reduction formula {#prop-reduction}
The number of times an irrep $\Gamma_{i}$ occurs in a representation $\Gamma$ is
$$
n_{i}=\frac{1}{h}\sum_{R}\chi(R)\,\chi_{i}(R)^{*}\qquad\text{(summed over all }h\text{ operations, or class by class as }\tfrac{1}{h}\sum_{\text{classes}}g\,\chi\,\chi_{i}),
$$
where $h$ is the order of the group and $g$ the number of operations in a class.
:::

::: proof Orthogonality of characters
The irreducible matrices of a finite group satisfy the great orthogonality theorem, $\sum_{R}\Gamma_{i}(R)_{mn}\Gamma_{j}(R)_{m'n'}^{*}=(h/d_{i})\delta_{ij}\delta_{mm'}\delta_{nn'}$; taking the traces of the $m=n$, $m'=n'$ part gives the **row orthogonality** $\sum_{R}\chi_{i}(R)\chi_{j}(R)^{*}=h\delta_{ij}$. Now expand $\Gamma=\sum_{j}n_{j}\Gamma_{j}$, so $\chi(R)=\sum_{j}n_{j}\chi_{j}(R)$, multiply by $\chi_{i}(R)^{*}$ and sum over $R$: the orthogonality kills every term but $j=i$, leaving $n_{i}=(1/h)\sum_{R}\chi(R)\chi_{i}(R)^{*}$.
:::

::: example The vibrations of water {#ex-h2o-vib}
Reduce the $3N=9$ Cartesian displacement representation of $\mathrm{H_{2}O}$ and find the symmetries of its vibrations.
::: solution
The character of the displacement representation under an operation is (number of unshifted atoms) × (contribution per unshifted atom), where the per-atom contribution is $3$ for $E$, $1+2\cos\theta$ for $C_{n}$, $1$ for $\sigma$, $-3$ for $i$ and $-(1+2\cos\theta)$ for $S_{n}$. With the molecule in the $xz$ plane: $E$ shifts nothing ($3\times3=9$); $C_{2}$ leaves only O ($1\times(-1)=-1$); $\sigma_{v}(xz)$ is the molecular plane, all three atoms unshifted ($3\times1=3$); $\sigma_{v}'(yz)$ leaves only O ($1\times1=1$). So $\chi(\Gamma_{3N})=(9,-1,3,1)$ and
$$
n(\mathrm{A_{1}})=\tfrac{1}{4}(9-1+3+1)=3,\quad
n(\mathrm{A_{2}})=\tfrac{1}{4}(9-1-3-1)=1,\quad
n(\mathrm{B_{1}})=\tfrac{1}{4}(9+1+3-1)=3,\quad
n(\mathrm{B_{2}})=\tfrac{1}{4}(9+1-3+1)=2,
$$
giving $\Gamma_{3N}=3\mathrm{A_{1}}+\mathrm{A_{2}}+3\mathrm{B_{1}}+2\mathrm{B_{2}}$. Translations transform as $(x,y,z)=\mathrm{A_{1}}+\mathrm{B_{1}}+\mathrm{B_{2}}$ and rotations as $(R_{x},R_{y},R_{z})=\mathrm{A_{2}}+\mathrm{B_{1}}+\mathrm{B_{2}}$ — read straight off the table. Subtracting the six external degrees of freedom,
$$
\Gamma_{\mathrm{vib}}=2\mathrm{A_{1}}+\mathrm{B_{1}}:
$$
the symmetric stretch and the bend are $\mathrm{A_{1}}$, the asymmetric stretch is $\mathrm{B_{1}}$. Three vibrations, all of them infrared-active — as the water vapour in the air around you, which is why the sky is not transparent to your body heat.
:::
:::

::: example The vibrations of ammonia {#ex-nh3-vib}
Reduce $\Gamma_{3N}$ of $\mathrm{NH_{3}}$ ($\mathrm{C_{3v}}$) and classify its vibrations.
::: solution
$E$: $4\times3=12$. $C_{3}$: only N unshifted, contribution $1+2\cos120^\circ=0$, so $\chi=0$. $\sigma_{v}$: N and one H unshifted, $2\times1=2$. With class sizes $1,2,3$: $n(\mathrm{A_{1}})=\tfrac{1}{6}(12+0+6)=3$, $n(\mathrm{A_{2}})=\tfrac{1}{6}(12+0-6)=1$, $n(\mathrm{E})=\tfrac{1}{6}(24+0+0)=4$, so $\Gamma_{3N}=3\mathrm{A_{1}}+\mathrm{A_{2}}+4\mathrm{E}$. Remove translations $\mathrm{A_{1}}+\mathrm{E}$ and rotations $\mathrm{A_{2}}+\mathrm{E}$: $\Gamma_{\mathrm{vib}}=2\mathrm{A_{1}}+2\mathrm{E}$ — four fundamentals (the $\mathrm{E}$ pair is doubly degenerate): the symmetric stretch and umbrella bend ($\mathrm{A_{1}}$) and the degenerate asymmetric stretch and bend ($\mathrm{E}$). All four are infrared-active, and the umbrella $\mathrm{A_{1}}$ mode at $950\ \mathrm{cm^{-1}}$ is the transition that makes the ammonia maser.
:::
:::

::: warning Conventions, classes and what characters are not {#warn-conventions}
Three traps. First, the $\mathrm{B_{1}/B_{2}}$ labels of water depend on which plane you call $xz$: put the molecule in the $yz$ plane and the asymmetric stretch becomes $\mathrm{B_{2}}$. Both conventions are in print; the physics — which mode is which — never changes, but a table copied from a book using the other convention will look contradictory. Second, characters are **class functions**: the reduction formula sums over classes with their multiplicities $g$, and averaging the character of $C_{3}$ with that of $C_{3}^{2}$ separately from the $\sigma_{v}$ is wrong — they are different classes in $\mathrm{C_{3v}}$ only because they are not conjugate, and you must never mix characters of different classes. Third, a character is not an observable: $\chi(E)=3N$ is just a book-keeping device, and no measurement returns "the representation" of anything — what measurements return are the consequences, like which lines appear.
:::

## Symmetry-adapted combinations and molecular orbitals

::: definition Symmetry-adapted linear combination {#def-salc}
A **symmetry-adapted linear combination** (SALC) is a combination of equivalent orbitals — the hydrogen $1\mathrm{s}$ orbitals, the fluorine $\sigma$ orbitals — that transforms as one irrep of the molecular point group. SALCs are the correct starting materials for molecular orbitals: an atomic orbital of the central atom can mix with a ligand SALC only when the two belong to the same irrep.
:::

::: example Group orbitals of water {#ex-h2o-salc}
Find the symmetries of the two hydrogen $1\mathrm{s}$ orbitals of water and build the valence molecular orbitals.
::: solution
The basis of the two $1\mathrm{s}$ orbitals has characters: $E$ leaves both ($2$), $C_{2}$ swaps them ($0$), $\sigma_{v}(xz)$ leaves both ($2$), $\sigma_{v}'(yz)$ swaps them ($0$). Reduction gives $\mathrm{A_{1}}+\mathrm{B_{1}}$: the SALCs are $(1\mathrm{s}_{\mathrm{A}}+1\mathrm{s}_{\mathrm{B}})/\sqrt{2}$ ($\mathrm{A_{1}}$) and $(1\mathrm{s}_{\mathrm{A}}-1\mathrm{s}_{\mathrm{B}})/\sqrt{2}$ ($\mathrm{B_{1}}$). The oxygen valence orbitals are $2\mathrm{s}\rightarrow\mathrm{A_{1}}$, $2\mathrm{p}_{z}\rightarrow\mathrm{A_{1}}$, $2\mathrm{p}_{x}\rightarrow\mathrm{B_{1}}$, $2\mathrm{p}_{y}\rightarrow\mathrm{B_{2}}$. So the $\mathrm{A_{1}}$ SALC mixes with $2\mathrm{s}$ and $2\mathrm{p}_{z}$ (giving two bonding and two antibonding combinations), the $\mathrm{B_{1}}$ SALC with $2\mathrm{p}_{x}$, and the $2\mathrm{p}_{y}$ orbital — $\mathrm{B_{2}}$, with no partner of matching symmetry — is a **non-bonding** orbital: the symmetry-forced lone pair. Eight valence electrons fill three bonding orbitals and the lone pair, and the whole of water's electronic structure — including why it is bent — follows from [[quantum-chemistry/chemical-bond-qm]] plus this counting.
:::
:::

::: example The sigma framework of sulfur hexafluoride {#ex-sf6-salc}
Reduce the representation of the six fluorine $\sigma$ donor orbitals of $\mathrm{SF_{6}}$ ($\mathrm{O_{h}}$) and identify the matching sulfur orbitals.
::: solution
An operation contributes the number of $\mathrm{F}$ atoms it leaves in place. In the Cotton class order $(E, 8C_{3}, 6C_{2}, 6C_{4}, 3C_{2}', i, 6S_{4}, 8S_{6}, 3\sigma_{h}, 6\sigma_{d})$ the characters are $(6, 0, 0, 2, 2, 0, 0, 0, 4, 2)$: a $C_{3}$ through a face and a $C_{2}$ through opposite edges move every fluorine, a $C_{4}$ and its square through opposite fluorines fix those two, a horizontal mirror contains four fluorines and a dihedral mirror contains two. Reducing against the $\mathrm{O_{h}}$ table (order $48$) gives $\mathrm{A_{1g}}+\mathrm{E_{g}}+\mathrm{T_{1u}}$. The sulfur valence orbitals transform as $3\mathrm{s}\rightarrow\mathrm{A_{1g}}$, $3\mathrm{p}\rightarrow\mathrm{T_{1u}}$, $3\mathrm{d}\rightarrow\mathrm{E_{g}}+\mathrm{T_{2g}}$: every $\sigma$ SALC finds a partner, and the six $\sigma$ bonds are the familiar $s+p_{x}+p_{y}+p_{z}+d_{z^{2}}+d_{x^{2}-y^{2}}$ set. The $\mathrm{T_{2g}}$ $d$ orbitals have no $\sigma$ partner. Fluorine $p$ orbitals perpendicular to the $\mathrm{S{-}F}$ bonds do transform with $\pi$ symmetry and can donate into $\mathrm{T_{2g}}$; the inertness of $\mathrm{SF_{6}}$ is kinetic — six fluorines sheath the sulfur and the $\mathrm{S{-}F}$ bonds are strong — not a symmetry ban on $\pi$ interaction.
:::
:::

## Selection rules

::: proposition The transition-moment criterion {#prop-selection}
An integral $\int\psi_{i}\,\hat{f}\,\psi_{f}\,\mathrm{d}\tau$ can be non-zero only if the direct product of the symmetries contains the totally symmetric irrep: $\Gamma_{i}\times\Gamma_{f}\times\Gamma_{f(\hat{f})}\supset\mathrm{A_{1}}$ (equivalently $\Gamma_{i}\times\Gamma_{f}\supset\Gamma_{f(\hat{f})}$). For a transition to be infrared-active the vibration must carry a dipole, so $\Gamma_{\mathrm{vib}}$ must contain $x$, $y$ or $z$; for Raman activity it must contain a quadratic function $x^{2},xy,\dots$; for an electronic transition the direct product of the two states must contain a translation.
:::

The logic is one line: the integral is a number, so it is totally symmetric; the integrand's symmetry is the direct product; a product that is not $\mathrm{A_{1}}$ integrates to zero. For $\mathrm{C_{2v}}$ the products are one-dimensional and immediate — $\mathrm{B_{1}}\times\mathrm{B_{2}}=\mathrm{A_{2}}$, $\mathrm{B_{2}}\times\mathrm{B_{2}}=\mathrm{A_{1}}$ — so water's $\mathrm{B_{1}}$ asymmetric stretch contains $x$ in its product with $\mathrm{A_{1}}$ and is infrared-active, as we found.

::: quiz
A ketone's $\mathrm{C{=}O}$ stretch is strong in the Raman spectrum and absent from the infrared spectrum of the same sample. What does this most strongly suggest?
- [x] The molecule has a centre of inversion, so mutual exclusion applies: modes that change the polarisability do not change the dipole, and vice versa.
- [ ] The $\mathrm{C{=}O}$ bond is non-polar, so it cannot interact with light at all.
- [ ] The stretch is doubly degenerate, and the two components cancel in the infrared.
- [ ] Raman scattering requires a change of dipole moment, which this vibration has.
::: solution
Mutual exclusion (proposition [[#prop-selection]] applied to a centrosymmetric group): in a molecule with $i$, every vibration is either gerade (Raman-active, infrared-inactive) or ungerade (infrared-active, Raman-inactive) — never both. A strong-Raman/absent-infrared carbonyl is the classic signature of a centrosymmetric dicarbonyl arrangement — the symmetric stretch of $\mathrm{CO_{2}}$ is the simplest case. The other options fail on basics: Raman activity requires a change of *polarisability*, not dipole; degeneracy does not cancel intensity; and a non-polar bond still scatters light.
:::
:::

::: example Mutual exclusion in carbon dioxide {#ex-co2-rr}
Classify the three fundamentals of linear $\mathrm{CO_{2}}$ ($\nu_{1}=1333$, $\nu_{2}=667$, $\nu_{3}=2349\ \mathrm{cm^{-1}}$) by their infrared and Raman activity.
::: solution
$\mathrm{CO_{2}}$ is $\mathrm{D_{\infty h}}$: the symmetric stretch is $\Sigma_{\mathrm{g}}^{+}$, the bend $\Pi_{\mathrm{u}}$, the asymmetric stretch $\Sigma_{\mathrm{u}}^{+}$. The dipole components $x,y,z$ are all ungerade, so only the $\mathrm{u}$ modes absorb infrared: $\nu_{2}$ and $\nu_{3}$ at $667$ and $2349\ \mathrm{cm^{-1}}$. The polarisability components are quadratic, hence gerade, so only $\nu_{1}$ is Raman-active — the $1333\ \mathrm{cm^{-1}}$ band. No fundamental of $\mathrm{CO_{2}}$ is both: in a molecule with a centre of inversion, **modes active in one spectrum are inactive in the other** (the mutual exclusion rule), which is the cheapest structural proof that a molecule is centrosymmetric. It is also why carbon dioxide is a greenhouse gas while nitrogen and oxygen are not: $\mathrm{N_{2}}$ and $\mathrm{O_{2}}$ have no dipole-carrying vibration at all, while $\mathrm{CO_{2}}$'s $\Pi_{\mathrm{u}}$ bend at $667\ \mathrm{cm^{-1}}$ sits squarely in the terrestrial infrared.
:::
:::

For electronic transitions the same criterion forbids $g\rightarrow g$ and $u\rightarrow u$ one-electron excitations in centrosymmetric molecules (the **Laporte rule**), because $x,y,z$ are $\mathrm{u}$: the $d$–$d$ bands of $[\mathrm{Cu(H_{2}O)}_{6}]^{2+}$ are weak ($\varepsilon\sim10\ \mathrm{dm^{3}\,mol^{-1}\,cm^{-1}}$) precisely because they are Laporte-forbidden and borrow intensity only from vibrations that break the centre. The deep violet of permanganate, $\mathrm{MnO_{4}^{-}}$, is the contrast: its charge-transfer band is fully allowed, $\varepsilon\sim2000$. Spin is a second, stricter rule — $\Delta S=0$ — which is why fluorescence is fast and phosphorescence slow, and why the singlet–triplet gap of [[quantum-chemistry/many-electron-atoms]] term symbols matters in photochemistry.

::: warning Forbidden means weak, not impossible {#warn-forbidden}
A selection rule says the transition moment vanishes *within the model* — one-electron states, fixed nuclei, no spin–orbit coupling. Real spectra leak through every gap: vibronic coupling (a $\mathrm{u}$ vibration temporarily removing the centre, as in the weak $\mathrm{g\rightarrow u}$-borrowing bands of benzene at $260\ \mathrm{nm}$), spin–orbit coupling (which makes phosphorescence observable at all, and heavy atoms enhance it), and Herzberg–Teller intensity borrowing. The correct use of a selection rule is therefore *negative and comparative*: it tells you which transition cannot explain an intense band, and which weak band is consistent with a forbidden one. Never write "this transition does not occur".
:::

## What symmetry predicts

The **Jahn–Teller theorem** is the classic: a nonlinear molecule in an orbitally degenerate electronic state is unstable and distorts to remove the degeneracy. The proof is symmetry itself — a degenerate $\mathrm{E}$ or $\mathrm{T}$ state couples linearly to any vibration of the right symmetry, and the potential becomes a Mexican hat with minima at finite distortion. The excited states of the benzene radical cation ($^{2}\mathrm{E}_{2\mathrm{g}}$), the elongation of $\mathrm{CuF_{6}}$ octahedra, and the very existence of the bond-alternated geometries of radical ions all follow. The Walsh-rule flavour of the same idea predicts *shapes*: $\mathrm{AH_{3}}$ prefers planar $\mathrm{D_{3h}}$ when the $\mathrm{a_{2}''}$ orbital is empty and pyramidal $\mathrm{C_{3v}}$ when it holds electrons, because pyramidalisation splits the degenerate $\mathrm{E}$ pair downward — the same level-repulsion argument as [[quantum-chemistry/approximation-methods]], applied by symmetry alone. Optical activity, as we saw, is a pure symmetry property: no $S_{n}$, including no $\sigma$ and no $i$. And the $\pi$ systems of [[quantum-chemistry/huckel-theory]] are the everyday case: the benzene $\pi$ molecular orbitals *must* be the totally symmetric combination, the degenerate pairs, and the antibonding partner, because those are the only symmetry species available — Hückel theory then supplies the energies, but the shapes were fixed before any Hamiltonian was written.

::: example Which molecules can be chiral? {#ex-chirality}
Can $\mathrm{CH_{2}Cl_{2}}$, $\mathrm{CHClBrF}$, *cis*$\text{-}$[\mathrm{Co(en)_{2}Cl_{2}}]^{+}$ and staggered ethane be resolved into optical isomers?
::: solution
$\mathrm{CH_{2}Cl_{2}}$ is $\mathrm{C_{2v}}$: mirrors — achiral. $\mathrm{CHClBrF}$ is $\mathrm{C_{1}}$: no improper operation at all — chiral, and resolvable. The *cis* complex is $\mathrm{C_{2}}$: a pure rotation group — chiral, and the classic resolution of Werner's cobalt(III) complexes. Staggered ethane is $\mathrm{D_{3d}}$: it has an $S_{6}$ (and an $i$) — achiral, even though no single carbon is a stereocentre. The rule is one line against a page of three-dimensional drawings: look for $S_{n}$.
:::
:::

::: history
The mathematics long preceded its chemistry. Arthur Cayley defined an abstract group in 1854; the 32 crystallographic point groups were derived independently by Fedorov, Schoenflies and Barlow in the 1880s–90s, and Schoenflies's *System der Krystallsysteme* (1890) fixed the notation $\mathrm{C_{n}}$, $\mathrm{D_{n}}$, $\mathrm{T}$, $\mathrm{O}$ still in use. Felix Hausdorff's text of 1927 brought the theory to a wider audience just as quantum mechanics needed it; Eugene Wigner's *Gruppentheorie* of 1931 — written at twenty-eight, when he had already used symmetry to derive the degeneracies of the hydrogen atom — made representation theory the working tool of quantum physics, and von Neumann and Wigner's 1929 paper on the degeneracy of molecular energy levels with respect to nuclear coordinates is the seed of the Jahn–Teller paper of Hermann Jahn and Edward Teller (1937). Hans Bethe applied the same machinery to crystal fields in 1929, and Robert Mulliken built the spectroscopic notation $\Sigma$, $\Pi$, $\mathrm{g}$, $\mathrm{u}$, $'$, $''$ through the 1930s. Wigner shared the 1963 Nobel Prize for it; group theory had become, in his words, the language in which the laws of nature are written.
:::

## Where this leads

Symmetry is the load-bearing wall of the spectroscopy course: the rotational selection rules of [[spectroscopy/rotational-spectroscopy]] are statements about $\mathrm{C_{\infty v}}$, the infrared and Raman tables of [[spectroscopy/vibrational-spectroscopy]] are this lesson's reduction formula applied to molecules bigger than water, and the electronic spectra of [[spectroscopy/electronic-spectroscopy]] are direct products all the way down. The orbital-matching argument of [[bonding-structure/molecular-orbitals]] and [[bonding-structure/valence-bond]] is now derived rather than asserted, and [[bonding-structure/vsepr]]'s shapes acquire a quantum justification through the Walsh argument. In [[quantum-chemistry/huckel-theory]] symmetry already halved the size of every secular determinant before Hückel wrote one down, and in [[computational-chemistry/hartree-fock]] every program still block-diagonalises the Fock matrix by irreducible representation — because a matrix element between different irreps is zero, and zero is worth computing.

::: summary
- A molecule's symmetry operations form its point group; assign it with the decision tree — principal axis, perpendicular $C_{2}$s, mirrors, inversion — and its order is the number of operations.
- A representation is a matrix copy of the group on a chosen basis; its characters reduce as $\Gamma=\sum n_{i}\Gamma_{i}$ with $n_{i}=(1/h)\sum g\,\chi\,\chi_{i}$, a consequence of row orthogonality.
- The $3N$ displacement representation reduces to translations + rotations + vibrations: water gives $2\mathrm{A_{1}}+\mathrm{B_{1}}$, ammonia $2\mathrm{A_{1}}+2\mathrm{E}$, methane $\mathrm{A_{1}}+\mathrm{E}+2\mathrm{T_{2}}$.
- Atomic orbitals mix with ligand SALCs only of the same irrep: water's lone pair is non-bonding by symmetry, and $\mathrm{SF_{6}}$'s six $\sigma$ SALCs are $\mathrm{A_{1g}}+\mathrm{E_{g}}+\mathrm{T_{1u}}$.
- An integral is non-zero only if the direct product contains $\mathrm{A_{1}}$: infrared activity needs $x,y,z$; Raman needs quadratics; centrosymmetric molecules obey mutual exclusion ($\mathrm{CO_{2}}$: $1333\ \mathrm{cm^{-1}}$ Raman-only, $667$ and $2349\ \mathrm{cm^{-1}}$ infrared-only).
- Selection rules are negative and comparative — forbidden means weak, with vibronic and spin–orbit leakage always available.
- Chirality is the absence of any $S_{n}$; Jahn–Teller distortion and Walsh shapes are the same level-splitting argument read from a character table.
:::

## Exercises

::: exercise Order of a group {level=1 check="6"}
How many operations does the point group $\mathrm{C_{3v}}$ of ammonia contain? (Enter the number.)
::: solution
$E$, $C_{3}$, $C_{3}^{2}$ and three $\sigma_{v}$: six operations, so the group has order $6$.
:::
:::

::: exercise Order of D3h {level=1 check="12"}
Count the operations of $\mathrm{D_{3h}}$ ($\mathrm{BF_{3}}$). (Enter the number.)
::: solution
$E$, $C_{3}$, $C_{3}^{2}$ (three), three $C_{2}'$ (three), $\sigma_{h}$ (one), three $\sigma_{v}$ (three): twelve. In general $\mathrm{D_{nh}}$ has order $4n$ for $n\ge2$: here $4\times3=12$.
:::
:::

::: exercise IR-active fundamentals of water {level=1 check="3"}
How many of water's fundamental vibrations are infrared-active? (Enter the number.)
::: solution
All three: $\Gamma_{\mathrm{vib}}=2\mathrm{A_{1}}+\mathrm{B_{1}}$, and $\mathrm{A_{1}}$ contains $z$ while $\mathrm{B_{1}}$ contains $x$, so every mode carries a dipole change.
:::
:::

::: exercise Assigning point groups {level=2}
Assign point groups to $\mathrm{XeOF_{4}}$, eclipsed ethane, and *trans*$\text{-}\mathrm{MA_{2}B_{4}}$.
::: solution
$\mathrm{XeOF_{4}}$: $C_{4}$ axis through Xe=O, two $\sigma_{v}$ planes, no $C_{2}$ perpendicular to $C_{4}$, no $\sigma_{h}$, no $i$ — $\mathrm{C_{4v}}$. Eclipsed ethane: $C_{3}$, three perpendicular $C_{2}$, and the $\sigma_{h}$ through the C–C bond midpoint — $\mathrm{D_{3h}}$ (the staggered form is $\mathrm{D_{3d}}$). *trans*$\text{-}\mathrm{MA_{2}B_{4}}$: $C_{4}$ along A–M–A, four $C_{2}$, $\sigma_{h}$, $i$, four $\sigma_{v}$ — $\mathrm{D_{4h}}$, order $16$.
:::
:::

::: exercise Reducing a representation {level=2}
A representation of $\mathrm{C_{2v}}$ has characters $(4,0,0,0)$ for $(E,C_{2},\sigma_{v}(xz),\sigma_{v}'(yz))$. Reduce it.
::: solution
Each $n_{i}=\tfrac{1}{4}(4\cdot1)=1$ for every irrep, since each row is $1$ at $E$ and the other characters vanish: $\Gamma=\mathrm{A_{1}}+\mathrm{A_{2}}+\mathrm{B_{1}}+\mathrm{B_{2}}$. The dimension checks: $1+1+1+1=4$.
:::
:::

::: exercise Raman and infrared in methane {level=2 check="2"}
Methane's vibrations are $\Gamma_{\mathrm{vib}}=\mathrm{A_{1}}+\mathrm{E}+2\mathrm{T_{2}}$. How many *fundamentals* are infrared-active? (Enter the number.)
::: solution
Two. In $\mathrm{T_{d}}$ the translations transform as $\mathrm{T_{2}}$ ($x,y,z$), so only the two $\mathrm{T_{2}}$ fundamentals ($\nu_{3}$ at $3019\ \mathrm{cm^{-1}}$, $\nu_{4}$ at $1306\ \mathrm{cm^{-1}}$) are infrared-active; $\mathrm{A_{1}}$ and $\mathrm{E}$ are Raman-active. Methane is a greenhouse gas through its $\mathrm{T_{2}}$ bands — the $\nu_{4}$ band at $7.7\ \mu\mathrm{m}$, with a global-warming potential tens of times that of $\mathrm{CO_{2}}$ per molecule.
:::
:::

::: exercise Derive the reduction formula {level=3}
Starting from the row orthogonality of irreducible characters, $\sum_{R}\chi_{i}(R)\chi_{j}(R)^{*}=h\delta_{ij}$, derive $n_{i}=(1/h)\sum_{R}\chi(R)\chi_{i}(R)^{*}$.
::: solution
Write $\chi(R)=\sum_{j}n_{j}\chi_{j}(R)$, multiply by $\chi_{i}(R)^{*}$ and sum over all $h$ operations: $\sum_{R}\chi(R)\chi_{i}(R)^{*}=\sum_{j}n_{j}\sum_{R}\chi_{j}(R)\chi_{i}(R)^{*}=\sum_{j}n_{j}\,h\delta_{ji}=h\,n_{i}$. Dividing by $h$ gives the formula. The whole method of this lesson — every reduction — is this one line applied to a character list.
:::
:::

::: exercise The sigma framework of SF6 {level=3}
Reduce the six-ligand representation of $\mathrm{SF_{6}}$ with characters $(6,0,0,2,2,0,0,0,4,2)$ for $(E,8C_{3},6C_{2},6C_{4},3C_{2}',i,6S_{4},8S_{6},3\sigma_{h},6\sigma_{d})$ against the $\mathrm{O_{h}}$ irreps $\mathrm{A_{1g}}(1,1,1,1,1,1,1,1,1,1)$, $\mathrm{E_{g}}(2,-1,0,0,2,2,0,-1,2,0)$, $\mathrm{T_{1u}}(3,0,-1,1,-1,-3,-1,0,1,1)$ (class sizes $1,8,6,6,3,1,6,8,3,6$), and state which sulfur orbitals match.
::: solution
$n(\mathrm{A_{1g}})=\tfrac{1}{48}(6+0+0+12+6+0+0+0+12+12)=1$; $n(\mathrm{E_{g}})=\tfrac{1}{48}(12+0+0+0+12+0+0+0+24+0)=1$; $n(\mathrm{T_{1u}})=\tfrac{1}{48}(18+0+0+12-6+0+0+0+12+12)=1$; all other irreps give zero. Each sum is $48$, so the quotient is exactly $1$ rather than a rounded $66/48$. So $\Gamma_{\sigma}=\mathrm{A_{1g}}+\mathrm{E_{g}}+\mathrm{T_{1u}}$, matched by sulfur $3\mathrm{s}$ ($\mathrm{A_{1g}}$), $3\mathrm{p}$ ($\mathrm{T_{1u}}$) and the $\mathrm{E_{g}}$ pair of $3\mathrm{d}$ orbitals — the six equivalent $\sigma$ bonds. The $\mathrm{T_{2g}}$ $d$ orbitals remain unpaired with any $\sigma$ SALC; $\pi$ donation from fluorine into $\mathrm{T_{2g}}$ is a different representation.
:::
:::

::: exercise Symmetry and chirality {level=3}
Prove that a molecule whose point group contains an improper operation $S_{n}$ cannot be chiral, and use the result to decide whether a molecule with point group $\mathrm{S_{4}}$ can show optical rotation.
::: solution
A molecule is chiral when it is not superposable on its mirror image. Reflection in any plane is $S_{1}$; if the molecule already possesses an $S_{n}$ axis, then its mirror image, reflected back by $S_{n}^{-1}$ (which is a symmetry operation of the molecule), coincides with the original configuration — the mirror image is reachable by a proper rotation composed with the group's own operation, so the two are identical and the molecule is achiral. Since $\sigma=S_{1}$ and $i=S_{2}$, the rule covers mirrors and centres as special cases. A molecule of point group $\mathrm{S_{4}}$ contains $S_{4}$ by definition, so it is achiral and shows no optical rotation — even though $\mathrm{S_{4}}$ contains no mirror plane and no inversion centre, the classical undergraduate criteria. Some substituted adamantanes and allene-type spiranes realise $\mathrm{S_{4}}$ and are the textbook counterexamples to the "no plane, no centre means chiral" rule.
:::
:::
