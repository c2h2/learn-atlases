Why is benzene so much less reactive than its formula suggests, why does butadiene absorb light at 217 nm when ethene is transparent past 170 nm, and what do these two facts have to do with the number $6$? Hückel's 1931 theory answers all three with a model so economical that a chemist can solve it in her head: planar conjugated molecules are reduced to a one-electron problem for the $\pi$ electrons alone, with two parameters — an energy $\alpha$ for sitting on a carbon and a resonance energy $\beta$ for hopping between bonded carbons — and everything else is a secular determinant, the machinery of the linear variation method ([[quantum-chemistry/approximation-methods]]) applied to a graph. From those two parameters come the delocalisation energy of benzene, the $4n + 2$ rule of aromaticity, the bond orders that make benzene's six bonds equal, the colours of dyes, and the frontier orbitals that decide how molecules react. The theory is also the most honest failure in quantum chemistry: its numbers are systematically wrong in a way that teaches you what the model can and cannot claim, and we will keep that honesty in view throughout.

## The $\pi$-electron model

::: definition The Hückel model {#def-huckel-model}
For a planar conjugated molecule take one $\mathrm{p_z}$ orbital $\phi_r$ on each atom $r$ of the $\pi$ framework and write the one-electron Hamiltonian and overlap in the basis $\{\phi_r\}$ as
$$
H_{rr} = \alpha \ (\text{Coulomb integral}), \qquad
H_{rs} = \begin{cases} \beta, & r \text{ bonded to } s,\\ 0, & \text{otherwise}, \end{cases}
\qquad S_{rs} = \delta_{rs},
$$
where $\alpha$ and $\beta$ are constants, identical for every carbon, and $\beta < 0$. The $\pi$-electron energy of a molecular orbital $\psi = \sum_r c_r \phi_r$ is $E = \alpha + x\beta$ where $x$ is an eigenvalue of the adjacency matrix $A$ of the molecular graph: $\sum_{s \text{ bonded to } r} c_s = x\,c_r$ for every $r$.
:::

Three approximations are hidden in that definition, and you should be able to name them on request. First, the $\sigma$/$\pi$ separation: the $\sigma$ framework ([[bonding-structure/covalent-lewis]]) holds the molecule flat and its electrons are not counted; only the electrons in the perpendicular $\mathrm{p_z}$ orbitals feel the problem. Second, core Hamiltonian: each $\pi$ electron moves in the averaged field of the nuclei and the $\sigma$ electrons, and $\pi$–$\pi$ repulsion is ignored — the total $\pi$-electron energy is just the sum of one-electron energies, with two electrons (opposite spins, Pauli) per orbital. Third, the zero-overlap and parameter approximations: $S_{rs} = \delta_{rs}$ even between bonded atoms, and every bonded pair shares the same $\beta$ regardless of geometry. Hückel theory is therefore a model of *topology*: only which atoms are bonded enters, never how far apart they are.

::: warning $\beta$ is negative — "higher $x$" means "lower energy" {#warn-beta-sign}
Because $E = \alpha + x\beta$ with $\beta < 0$, the *most bonding* orbital has the *largest* eigenvalue $x$ of the adjacency matrix: $x = +2$ in benzene lies at $\alpha + 2\beta$, below $\alpha$. Reading a level diagram upside down is the most common error in this subject. When a book says "the $\pi$ energy of benzene is $6\alpha + 8\beta$", it means an energy $8|\beta|$ *below* $6\alpha$; when it says a level is "raised by conjugation", it means its coefficient of $\beta$ has *fallen*.
:::

:::example Counting $\pi$ electrons {#ex-count}
How many $\pi$ electrons enter the Hückel model of (a) buta-1,3-diene, (b) benzene, (c) the cyclopentadienide anion $\mathrm{C_5H_5^-}$, (d) pyridine, (e) the allyl radical?
:::solution
Count one electron per $\mathrm{p_z}$ orbital of a neutral carbon, then adjust for charge: (a) four $\mathrm{sp^2}$ carbons, $4\ \pi$ electrons; (b) $6$; (c) five carbons contribute $5$, and the negative charge is a pair of electrons in the ring's $\pi$ system — $6\ \pi$ electrons; (d) pyridine's nitrogen is like a CH in the $\pi$ count (one electron in its $\mathrm{p_z}$; its lone pair sits in an in-plane $\mathrm{sp^2}$ orbital and is not counted) — $6\ \pi$ electrons; (e) $3$. The bookkeeping of (c) and (d) — where the lone pair lives — is the whole content of the heteroatom rules further below.
:::
:::

:::widget graph
nodes: C1@1,0; C2@0.5,0.87; C3@-0.5,0.87; C4@-1,0; C5@-0.5,-0.87; C6@0.5,-0.87
edges: C1-C2; C2-C3; C3-C4; C4-C5; C5-C6; C6-C1
caption: The Hückel model of benzene is the graph of benzene: six $\mathrm{p_z}$ basis functions, one node per carbon, one edge per bond, and nothing else — no distances, no angles, no nuclear charges. Drag the nodes: as long as the connectivity stays a hexagon, the six energy levels $\alpha + 2\beta,\ \alpha + \beta\ (\times 2),\ \alpha - \beta\ (\times 2),\ \alpha - 2\beta$ are unchanged. That the chemistry of an aromatic ring should depend on its graph and not its geometry is the fact this model encodes.
:::

## Secular determinants: ethene and allyl

::: proposition The Hückel secular equations {#prop-secular}
The stationary states of the Hückel model are the solutions of the secular equations
$$
(\alpha - E)c_r + \beta \sum_{s \text{ bonded to } r} c_s = 0 \quad \text{for every } r,
$$
which possess non-trivial solutions exactly when the secular determinant $\det(xI - A)$ vanishes, where $x = (E - \alpha)/\beta$ and $A$ is the adjacency matrix of the $\pi$ network. Each root $x$ is an orbital energy $E = \alpha + x\beta$; the coefficients $c_r$ give the orbital, and filling the roots from the top down with two electrons each gives the $\pi$-electron energy $E_\pi = n_\mathrm{e}\,\alpha + \left(\sum_{\text{occ}} x\right)\beta$, where $n_\mathrm{e}$ is the number of $\pi$ electrons.
:::

This is the linear variation method of [[quantum-chemistry/approximation-methods]] with the Hamiltonian of [[#def-huckel-model]] substituted into $HC = ESC$; nothing more needs to be assumed, and every result below is linear algebra.

:::example Ethene: the $2 \times 2$ determinant {#ex-ethene}
Solve the Hückel problem for ethene, $\mathrm{H_2C=CH_2}$, and give the $\pi$-electron energy.
:::solution
The secular equations are $xc_1 + c_2 = 0$ and $c_1 + xc_2 = 0$, so $x^2 - 1 = 0$, $x = \pm 1$:
$$
E_\pm = \alpha \pm \beta, \qquad
\psi_\pm = \tfrac{1}{\sqrt 2}(\phi_1 \pm \phi_2).
$$
The lower state ($x = +1$, bonding, no node between the centres) takes both $\pi$ electrons: $E_\pi = 2\alpha + 2\beta$, twice the energy of one electron in one $\mathrm{p_z}$ orbital — the $\pi$ bond is the energy gained, $2|\beta|$, by letting the electron sit on two carbons at once. The upper orbital $\psi_-$, with its node and coefficient $x = -1$, is *antibonding*; the language and the $\sigma/\pi$ diagram are those of [[bonding-structure/molecular-orbitals]], and here they are computed rather than asserted.
:::
:::

:::example Allyl: three carbons, one non-bonding level {#ex-allyl}
Set up and solve the secular determinant of the allyl system $\mathrm{C_1-C_2-C_3}$, and find the $\pi$-electron energy and the charge distribution of the allyl cation $\mathrm{C_3H_5^+}$.
:::solution
With $x = (E-\alpha)/\beta$ the determinant is
$$
\begin{vmatrix} x & 1 & 0 \\ 1 & x & 1 \\ 0 & 1 & x \end{vmatrix}
= x(x^2 - 1) - x = x(x^2 - 2) = 0
\qquad\Longrightarrow\qquad
x = \sqrt 2,\ 0,\ -\sqrt 2,
$$
$$
E = \alpha + \sqrt 2\,\beta\ (\times 1), \quad \alpha\ (\times 1), \quad \alpha - \sqrt 2\,\beta\ (\times 1).
$$
The middle level has $x = 0$: energy exactly $\alpha$, a *non-bonding* molecular orbital whose coefficients solve $c_1 + c_3 = 0$ with $c_2 = 0$ — it lives only on the ends and neither helps nor hurts the energy. The cation has $2\ \pi$ electrons, both in the top level: $E_\pi = 2\alpha + 2\sqrt 2\,\beta = 2\alpha + 2.828\,\beta$. Compare the alternative picture of a localised $\mathrm{C=C}$ double bond plus an empty $\mathrm{p}$ orbital, $2\alpha + 2\beta$: delocalisation lowers the cation by $2(\sqrt 2 - 1)|\beta| = 0.828\,|\beta|$, the *delocalisation energy* (DE). The occupied orbital has $c_1 = c_3 = 1/2$, $c_2 = 1/\sqrt 2$, so its electron density is $2c_1^2 = 2c_3^2 = 0.5$ at the ends and $2c_2^2 = 1.0$ at the middle: C2 keeps exactly its neutral share of one $\pi$ electron, and the missing electron — the whole $+1$ charge — sits equally on C1 and C3 — which is what the curly-arrow resonance structures of the cation say, now with numbers attached.
:::
:::

## Butadiene: conjugation, bond orders, colour

:::example Buta-1,3-diene {#ex-butadiene}
Solve the Hückel determinant of butadiene, obtain the four levels, the delocalisation energy against two isolated double bonds, the $\pi$ bond orders, and the HOMO–LUMO gap.
:::solution
The secular determinant of the chain $\mathrm{C_1-C_2-C_3-C_4}$ is
$$
\begin{vmatrix} x & 1 & 0 & 0 \\ 1 & x & 1 & 0 \\ 0 & 1 & x & 1 \\ 0 & 0 & 1 & x \end{vmatrix}
= x^4 - 3x^2 + 1 = 0
\qquad\Longrightarrow\qquad
x^2 = \tfrac{3 \pm \sqrt 5}{2},
$$
$$
x = 1.618,\ 0.618,\ -0.618,\ -1.618
\qquad (\text{the golden ratio } \varphi = 1.618 \text{ appears}).
$$
Four $\pi$ electrons fill the two upper levels: $E_\pi = 2(1.618 + 0.618)\beta + 4\alpha = 4\alpha + 4.472\,\beta$. Against two isolated ethene bonds, $2(2\alpha + 2\beta) = 4\alpha + 4\beta$, the delocalisation energy is $0.472\,|\beta|$ — conjugation stabilises butadiene, though far less than the $2|\beta|$ we will find for benzene. The bond orders $p_{rs} = \sum_{\text{occ}} n_j c_{jr}c_{js}$ come out as
$$
p_{12} = 2(0.372 \times 0.602) + 2(0.602 \times 0.372) = 0.894,
\qquad
p_{23} = 2(0.602^2 - 0.372^2) = 0.447,
$$
so the formal single bond C2–C3 carries $0.45$ of a $\pi$ bond: it is shorter and has a rotational barrier, and the terminal carbons show enhanced reactivity ("free valence") — the quantitative version of the statement that conjugation "spreads the double bonds". The lowest excitation promotes an electron from the HOMO ($x = 0.618$) to the LUMO ($x = -0.618$), a gap of $1.236\,|\beta|$.

The honest calibration: taking the observed absorption of butadiene at $217\ \mathrm{nm}$ ($E = 1240/217 = 5.71\ \mathrm{eV}$) as this gap gives $|\beta| = 5.71/1.236 = 4.6\ \mathrm{eV}$. The same $\beta$ will *not* reproduce the thermochemistry (below) — hold on to that tension.
:::
:::

:::widget plot
f: 4*sin(pi/(2*(x+1)))
x: 2, 40
y: 0, 2.2
points: 2,2; 4,1.236; 6,0.890; 8,0.695; 10,0.569
labels: \text{HOMO–LUMO gap in units of } |\beta|
caption: The Hückel HOMO–LUMO gap of the linear polyene $\mathrm{C}_N\mathrm{H}_{N+2}$, $4|\beta|\sin\!\big(\pi/(2(N+1))\big)$, against chain length $N$ (dots: exact eigenvalues $x_k = 2\cos(k\pi/(N+1))$ for $N = 2, 4, 6, 8, 10$). The gap shrinks roughly as $1/N$ — the same $1/L^2$ physics as the particle in a box ([[quantum-chemistry/model-systems]]) — so longer polyenes absorb at longer wavelengths: butadiene at $217\ \mathrm{nm}$, hexatriene at $258\ \mathrm{nm}$, $\beta$-carotene (eleven double bonds) as a deep orange at $450\ \mathrm{nm}$. Colour, in this model, is arithmetic.
:::

:::proposition The pairing theorem {#prop-pairing}
If the $\pi$ network is *alternant* — its atoms divide into two sets ("starred" and "unstarred") such that bonds join only opposite sets — then its eigenvalues come in pairs $x$ and $-x$. In particular there are as many bonding as antibonding levels, and an odd alternant (allyl, benzyl) has a non-bonding level at $x = 0$.
:::

:::proof
Let $\{c_r\}$ solve $\sum_{s \to r} c_s = x c_r$ (sum over neighbours $s$ of $r$). Star the atoms so that every neighbour of a starred atom is unstarred, and define $c'_r = c_r$ on starred atoms and $c'_r = -c_r$ on unstarred ones. For $r$ starred, $\sum_{s \to r} c'_s = -\sum_{s \to r} c_s = -x c_r = -x c'_r$; for $r$ unstarred, $\sum_{s \to r} c'_s = +\sum_{s \to r} c_s = x c_r = -x c'_r$. So $\{c'_r\}$ solves the equations with $-x$: the spectrum is symmetric about $\alpha$. An odd alternant has unequal set sizes (one starred atom more), so the $N$ eigenvectors cannot all pair up, and one must satisfy $x = -x$, i.e. $x = 0$. $\blacksquare$
:::

:::warning Delocalisation energy depends on the reference you subtract {#warn-de}
Every DE quoted above is a difference against a chosen set of localised double bonds — ethene units that do not exist as molecules. Change the reference (cyclohexene instead of ethene, or hydrogenation data) and the number moves. Worse, no single $\beta$ reconciles the model: spectroscopy of butadiene asks for $|\beta| \approx 4.6\ \mathrm{eV}$, the experimental resonance energy of benzene ($\approx 150\ \mathrm{kJ\,mol^{-1}}$) against $2|\beta|$ asks for $|\beta| \approx 0.8\ \mathrm{eV}$, and butadiene's own experimental conjugation energy ($\approx 15\ \mathrm{kJ\,mol^{-1}}$) against $0.472|\beta|$ asks for less still. The failure is not arithmetic — it is that a one-configuration $\pi$ model ignores electron correlation and $\sigma$ relaxation, and their cancellation differs from system to system. Use Hückel DEs to *rank* (benzene ≫ butadiene ≫ allyl) and never to *budget*.
:::

## Benzene and the $4n + 2$ rule

:::example Benzene {#ex-benzene}
Solve the Hückel problem for the benzene ring and derive its delocalisation energy, bond order, and the reason its bonds are equal.
:::solution
The cyclic six-term determinant (the chain determinant with corner entries $1$) factors as
$$
\det(xI - A) = x^6 - 6x^4 + 9x^2 - 4 = (x - 2)(x + 2)(x - 1)^2(x + 1)^2,
$$
i.e. the ring eigenvalues are $x_k = 2\cos(2\pi k/6)$, $k = 0, \dots, 5$:
$$
x = 2,\quad 1,\ 1,\quad -1,\ -1,\quad -2
\qquad\Longrightarrow\qquad
E = \alpha + 2\beta,\ \alpha + \beta\ (\times 2),\ \alpha - \beta\ (\times 2),\ \alpha - 2\beta .
$$
Six $\pi$ electrons fill the three lowest levels completely: $E_\pi = 2(\alpha+2\beta) + 4(\alpha+\beta) = 6\alpha + 8\beta$. Against three isolated double bonds, $6\alpha + 6\beta$, the delocalisation energy is $2|\beta|$ — the largest DE per electron of any hydrocarbon we have met, and the quantum-mechanical content of "aromatic stabilisation". The bonding set is *closed*: filled, and separated from the empty antibonding set by a gap of $2|\beta|$.

Bond order between neighbours: summing $2c_rc_s$ over the three occupied levels gives $p_{12} = 2/3$ for every bond — all six bonds identical, intermediate between single ($0$) and double ($1$), exactly as X-ray diffraction finds ($0.139\ \mathrm{nm}$, between $0.154$ and $0.134\ \mathrm{nm}$). The pairing theorem ([[#prop-pairing]]) guarantees the symmetric spectrum: benzene is alternant, with three atoms in each starred set.
:::
:::

The ring spectrum $x_k = 2\cos(2\pi k/N)$ has a beautiful picture: inscribe the $N$-gon in a circle of radius $2$ with one vertex at the bottom; the heights of the vertices are the levels in units of $\beta$ (the **Frost circle**). For the hexagon: one vertex at $+2$, two at $+1$, two at $-1$, one at $-2$.

:::proposition The $4n + 2$ rule {#prop-4n2}
A monocyclic conjugated hydrocarbon with $N$ ring atoms has a closed shell of bonding $\pi$ levels — one non-degenerate lowest level followed by complete degenerate pairs — if and only if it holds $2, 6, 10, 14, \dots$ $\pi$ electrons, i.e. $4n + 2$. A ring with $4n$ $\pi$ electrons has a half-filled degenerate pair and is open-shell.
:::

:::proof
The ring levels are $x_k = 2\cos(2\pi k/N)$, $k = 0, 1, \dots, N-1$: one level at $x = 2$ (all coefficients equal, no node), then pairs $k$ and $N-k$ of equal energy, and — only when $N$ is even — a single level at $x = -2$ (fully alternating coefficients). Filling from the top: the $x = 2$ level takes $2$ electrons, each degenerate pair takes $4$. A closed shell therefore holds $2 + 4m$ electrons for some $m$: exactly the numbers $4n + 2$. For $4n$ electrons the last degenerate pair is half-filled (two electrons in two orbitals of equal energy), which is unstable by Hund's rule and invites a symmetry-breaking distortion — the antiaromatic case. $\blacksquare$
:::

So aromaticity in this model is not a mysterious extra force: it is *closed-shell arithmetic on a ring*, the same reason the noble gases are inert in the atomic case ([[quantum-chemistry/many-electron-atoms]]). The experimental signature — extra stability, equalised bonds, a ring current whose diamagnetic shift is seen in NMR ([[spectroscopy/nmr-principles]]) — follows from the closed shell.

:::quiz
Which of these species has a closed-shell Hückel ground state?
- [ ] cyclobutadiene, $\mathrm{C_4H_4}$
- [x] the tropylium ion, $\mathrm{C_7H_7^+}$
- [ ] the cyclopentadienyl cation, $\mathrm{C_5H_5^+}$
- [ ] the allyl radical, $\mathrm{C_3H_5^{\bullet}}$
:::solution
Tropylium has $6\ \pi$ electrons — a $4n + 2$ count — filling $x = 2$ and the degenerate $x = 1.247$ pair completely. Cyclobutadiene ($4e$) and the cyclopentadienyl cation ($4e$) half-fill degenerate pairs (open shell, antiaromatic), and the allyl radical ($3e$) leaves its non-bonding level singly occupied.
:::
:::

## Antiaromaticity and the aromatic ions

:::example Cyclobutadiene: the square that refuses to be one {#ex-cbd}
Apply Hückel theory to square cyclobutadiene and decide whether it is aromatic.
:::solution
The square ring has $x_k = 2\cos(2\pi k/4)$: $x = 2,\ 0,\ 0,\ -2$, so $E_\pi = 4\alpha + 4\beta$ for its four $\pi$ electrons — *zero* delocalisation energy against two isolated double bonds. Worse, the two non-bonding levels are degenerate and half-filled (one electron each by Hund's rule): an open-shell square is a prediction of extreme reactivity. The molecule escapes by distorting to a rectangle, which lifts the degeneracy (bonding one pair of opposite bonds, antibonding the other) at the cost of localising the double bonds — a Jahn–Teller distortion. Antiaromaticity, in Hückel's language, is not "aromaticity's opposite" but *failed shell-closing*: no DE, open shell, distortion. Cyclobutadiene is detectable at low temperature and dimerises within seconds above it.
:::
:::

:::example The five- and seven-membered ions {#ex-ions}
The cyclopentadienyl ring has levels $x = 2,\ 0.618\ (\times 2),\ -1.618\ (\times 2)$. Classify $\mathrm{C_5H_5^-}$, $\mathrm{C_5H_5^{\bullet}}$ and $\mathrm{C_5H_5^+}$, and do the same for the seven-membered tropylium ion $\mathrm{C_7H_7^+}$ with levels $x = 2,\ 1.247\ (\times 2),\ -0.445\ (\times 2),\ -1.802\ (\times 2)$.
:::solution
The anion has $6\ \pi$ electrons: $2 + 4$ fill the closed shell exactly, $E_\pi = 6\alpha + 6.472\,\beta$ — aromatic, and indeed cyclopentadiene ($\mathrm{p}K_\mathrm{a} = 16$) is roughly as acidic as water — for a hydrocarbon C–H bond, an absurdity explained only by the aromaticity of the conjugate base. The radical ($5e$) and cation ($4e$) leave the degenerate pair partly filled — open-shell, non- or antiaromatic, and correspondingly elusive. Tropylium has $6\ \pi$ electrons in $2 + 1.247 \times 2$ levels: closed shell, $E_\pi = 6\alpha + 8.99\,\beta$, aromatic — which is why tropylium salts can be bottled, a fact that made sense only after Hückel. The pattern $2, 6, 10$ electrons closing rings of $3, 5, 7$ members is the $4n+2$ rule at work outside benzene.
:::
:::

## Fused rings: naphthalene

:::example Naphthalene {#ex-naph}
Set up the $10 \times 10$ Hückel determinant of naphthalene and interpret its solution, $x = 2.303,\ 1.618,\ 1.303,\ 1.000,\ 0.618,\ -0.618,\ -1.000,\ -1.303,\ -1.618,\ -2.303$.
:::solution
Ten $\pi$ electrons fill the five upper levels: $E_\pi = 2(2.303 + 1.618 + 1.303 + 1.000 + 0.618)\beta + 10\alpha = 10\alpha + 13.68\,\beta$. Against five isolated double bonds the delocalisation energy is $3.68\,|\beta|$ — larger than benzene's $2|\beta|$ in total, but only $1.84\,|\beta|$ per ring against benzene's $2|\beta|$: naphthalene is aromatic, but *less aromatic per ring*, and it reacts (oxidation, addition) more readily than benzene, exactly as the per-ring number predicts. The spectrum is symmetric about $x = 0$ — naphthalene is alternant (sets of 5 and 5) — and the HOMO–LUMO gap, $1.236\,|\beta|$, is smaller than benzene's $2|\beta|$, so it absorbs further to the red ($315\ \mathrm{nm}$ vs $204\ \mathrm{nm}$) and fluoresces blue. Setting up the determinant is the exercise; solving it is a computer's, and that is precisely the historical moral: Hückel's chemistry ran ahead of its arithmetic until the 1940s, when Coulson's school (and hand-cranked machines) filled in the tables for benzenoid hydrocarbons.
:::
:::

## Heteroatoms, limits, and successors

Heteroatoms enter by changing the two numbers on the relevant atom: $H_{rr} = \alpha + h_\mathrm{X}\beta$ and $H_{rs} = k_{\mathrm{X,C}}\beta$ for a bond to it, with $h, k$ fitted to data — the rules are *empirical extensions*, not derivations. The bookkeeping of [[#ex-count]] carries the chemistry: pyridine's nitrogen contributes one $\pi$ electron (its lone pair is in-plane, invisible to the $\pi$ system, which is why pyridine is a comfortable base — $\mathrm{p}K_\mathrm{a} = 5.2$ for the conjugate acid — despite being aromatic), while pyrrole's contributes two (the lone pair *is* two-sixths of the aromatic sextet, so protonating the nitrogen costs the aromaticity and pyrrole is a very weak base). Furan, thiophene, the imidazole of histidine, the porphyrin of haem: the same two parameters and a graph.

The limits deserve a summary of their own. One $\beta$ for all bonds ignores geometry; one configuration ignores correlation (the source of the DE disaster in [[#warn-de]]); the model says nothing about the $\sigma$ framework, so it cannot predict *whether* a molecule is planar, only what planarity buys; and transition energies from orbital gaps ignore the electron–hole attraction they should include ([[spectroscopy/electronic-spectroscopy]]). What survives all of this is the conceptual core — topology determines the level pattern, closed shells determine stability, and the frontier orbitals (HOMO, LUMO) determine reactivity — and it survives because it is the first term of a systematic expansion. The successors drop no approximation without replacing it: extended Hückel and the semi-empirical methods keep the graph and add parametrisation; Hartree–Fock ([[computational-chemistry/hartree-fock]]) and density-functional theory ([[computational-chemistry/density-functional-theory]]) keep the one-electron-in-a-field idea and compute the field from the wavefunction or density, for all electrons, without $\beta$. Hückel theory is what electronic-structure calculation looks like when everything you can afford to throw away has been thrown away — which is why it is still the first thing a chemist computes.

:::history
Robinson proposed the aromatic sextet in 1925 — six electrons as the key number, with no mechanism. Hückel supplied the mechanism in 1931, reducing the $\pi$ problem of planar hydrocarbons to a secular determinant and stating the $4n + 2$ rule for rings; his "quantenmathematik" chapter of the *Handbuch der Physik* (1936) spread it. Pauling, Sherman and Whatley measured benzene's resonance energy thermochemically in 1933, beginning the long argument between Hückel's numbers and the calorimeter's. Coulson's papers of 1939–1941 built the theory of alternant hydrocarbons — the pairing theorem, $\pi$-bond orders, free valence — and Wheland's 1944 treatise fixed the formalism in the chemist's hands. Frost's circle mnemonic (1953) made the ring spectrum a drawing exercise, and Dewar's frontier- and perturbation-molecular-orbital programme of the 1950s turned the HOMO and LUMO from bookkeeping into the language of mechanism.
:::

## Where this leads

The level patterns derived here are the $\pi$-system input to [[spectroscopy/electronic-spectroscopy]] (the gap is the colour) and [[spectroscopy/nmr-principles]] (the ring current is the aromatic signature); the closed-shell argument is the quantum half of [[bonding-structure/molecular-orbitals]]; the secular-determinant technique is the small case of [[quantum-chemistry/approximation-methods]] and the large case of [[computational-chemistry/hartree-fock]]; and the symmetry labels the levels deserve are supplied by [[quantum-chemistry/molecular-symmetry]], which also proves why benzene's $204\ \mathrm{nm}$ band is strong and its $255\ \mathrm{nm}$ band is weak. The particle-in-a-box estimate of the same polyene gaps ([[quantum-chemistry/model-systems]]) is the continuum cousin of the $1/N$ law above — two independent quantum models agreeing on the arithmetic of colour.

:::summary
- Hückel theory keeps only the $\pi$ electrons of a planar conjugated molecule, with $H_{rr} = \alpha$, $H_{rs} = \beta < 0$ for bonded pairs, $S = I$: the problem is the adjacency matrix of a graph, and $E = \alpha + x\beta$.
- Ethene gives $E_\pi = 2\alpha + 2\beta$; allyl adds a non-bonding level at $\alpha$ and a cation DE of $0.83|\beta|$ with the charge split equally over the end carbons.
- Butadiene: $x = \pm 1.618, \pm 0.618$, $E_\pi = 4\alpha + 4.472\beta$, DE $= 0.472|\beta|$, bond orders $0.894/0.447$, gap $1.236|\beta|$ — and polyene gaps shrink as $4|\beta|\sin(\pi/2(N+1))$, which is why colour grows with conjugation.
- Benzene: $E_\pi = 6\alpha + 8\beta$, DE $= 2|\beta|$, all bond orders $2/3$, closed shell with a $2|\beta|$ gap — aromaticity as closed-shell arithmetic.
- The $4n + 2$ rule follows from the ring levels $2\cos(2\pi k/N)$ (Frost circle): closed shells hold $2, 6, 10, \dots$ electrons; $4n$ rings are open-shell and distort (cyclobutadiene).
- Aromatic ions close the same shells: $\mathrm{C_5H_5^-}$ and $\mathrm{C_7H_7^+}$ are aromatic; naphthalene is aromatic but less so per ring ($1.84|\beta|$ vs $2|\beta|$).
- No single $\beta$ reconciles spectroscopy ($\approx 4.6\ \mathrm{eV}$ from butadiene) with thermochemistry ($\approx 0.8\ \mathrm{eV}$ from benzene): Hückel DEs rank, they do not budget.
- The model's surviving core — topology, closed shells, frontier orbitals — is the first term of every modern electronic-structure method.
:::

## Exercises

:::exercise Allyl radical {level=1 check="2.828"}
The allyl levels are $x = \sqrt 2, 0, -\sqrt 2$. The allyl *radical* has three $\pi$ electrons. Write $E_\pi = 3\alpha + c\,\beta$ and enter $c$.
:::solution
Two electrons occupy $x = \sqrt 2$ and one occupies $x = 0$: $E_\pi = 2\alpha + 2\sqrt 2\,\beta + \alpha = 3\alpha + 2.828\,\beta$, so $c = 2\sqrt 2 = 2.828$. The non-bonding electron costs nothing — which is why allylic radicals are so easily made.
:::
:::

:::exercise Butadiene colour {level=1 check="2.97"}
Take $|\beta| = 2.40\ \mathrm{eV}$. What is the HOMO–LUMO gap of butadiene in eV? (Enter the gap in eV.)
:::solution
Gap $= (0.618 - (-0.618))|\beta| = 1.236 \times 2.40 = 2.97\ \mathrm{eV}$, i.e. $\lambda = 1240/2.97 = 418\ \mathrm{nm}$. The observed absorption is at $217\ \mathrm{nm}$ — the single-$\beta$ model with a thermochemical $\beta$ badly underestimates the gap, one face of the calibration problem of [[#warn-de]].
:::
:::

:::exercise Benzene stabilisation {level=1 check="480"}
Take $|\beta| = 240\ \mathrm{kJ\,mol^{-1}}$. What is benzene's Hückel delocalisation energy in $\mathrm{kJ\,mol^{-1}}$? (Enter the DE.)
:::solution
DE $= 2|\beta| = 480\ \mathrm{kJ\,mol^{-1}}$. The experimental resonance energy is only about $150\ \mathrm{kJ\,mol^{-1}}$: the model overstates by a factor of three even at this (already low) $\beta$, because the missing correlation and $\sigma$ terms are not small — rank, do not budget.
:::
:::

:::exercise Cyclopentadienide {level=2 check="6.472"}
The cyclopentadienyl levels are $x = 2, 0.618\ (\times 2), -1.618\ (\times 2)$. Write the $\pi$-electron energy of $\mathrm{C_5H_5^-}$ as $6\alpha + c\,\beta$ and enter $c$.
:::solution
Six electrons: $2$ in $x = 2$ and $4$ in the degenerate $x = 0.618$ pair: $c = 2(2) + 4(0.618) = 4 + 2.472 = 6.472$. The shell is closed — aromatic — which is why $\mathrm{C_5H_5^-}$ forms so readily ($\mathrm{p}K_\mathrm{a} = 16$ for cyclopentadiene).
:::
:::

:::exercise Bond order of the allyl anion {level=2 check="0.707"}
The occupied levels of the allyl anion are $\psi_1$ ($x = \sqrt 2$, coefficients $1/2, 1/\sqrt 2, 1/2$) and $\psi_2$ ($x = 0$, coefficients $1/\sqrt 2, 0, -1/\sqrt 2$). Compute the $\pi$ bond order $p_{12} = \sum_{\text{occ}} n_j c_{j1}c_{j2}$ between C1 and C2. (Enter $p_{12}$.)
:::solution
Four electrons, two in each level: $p_{12} = 2(\tfrac12 \cdot \tfrac{1}{\sqrt 2}) + 2(\tfrac{1}{\sqrt 2}\cdot 0) = 0.707$. The non-bonding MO contributes nothing to bonding (its C2 coefficient is zero): the extra electron pair of the anion sits in an orbital that binds the ends to nothing — delocalised, but not bonding between neighbours.
:::
:::

:::exercise Calibrating $\beta$ on hexatriene {level=2 check="5.40"}
Hexatriene ($N = 6$) absorbs at $258\ \mathrm{nm}$; its Hückel gap is $4|\beta|\sin(\pi/14)$. Find $|\beta|$ in eV from this line. (Enter $|\beta|$ in eV.)
:::solution
$E = 1240/258 = 4.81\ \mathrm{eV}$; $\sin(\pi/14) = 0.2225$, so the gap is $0.890\,|\beta|$ and $|\beta| = 4.81/0.890 = 5.40\ \mathrm{eV}$. Butadiene asked for $4.6\ \mathrm{eV}$ and benzene's thermochemistry for $0.8$: a single parameter cannot fit three experiments, and the drift of the fitted value with the system is the fingerprint of the correlation the model omits.
:::
:::

:::exercise Derive the ring spectrum {level=3}
Show that the cyclic Hückel equations $c_{r-1} + c_{r+1} = x c_r$ (indices mod $N$) are solved by $c_r = N^{-1/2} e^{2\pi i k r/N}$ with $x_k = 2\cos(2\pi k/N)$, and deduce the Frost-circle level pattern of the $N$-ring. Where exactly does the $4n+2$ count enter?
:::solution
Substituting: $e^{2\pi ik(r-1)/N} + e^{2\pi ik(r+1)/N} = e^{2\pi ikr/N}(e^{-2\pi ik/N} + e^{2\pi ik/N}) = 2\cos(2\pi k/N)\, c_r$, so $x_k = 2\cos(2\pi k/N)$ — the heights of an $N$-gon inscribed in a circle of radius $2$ with a vertex at the bottom (Frost circle). Periodicity forces $k$ to $N$ integers, giving one level at $x = 2$, degenerate pairs $k, N-k$, and (even $N$ only) one level at $x = -2$. Filling from $x = 2$ with two electrons each: the non-degenerate bottom level takes $2$, each pair takes $4$, so closed shells hold $2 + 4m = 4n + 2$ electrons; $4n$ electrons half-fill a pair. The $4n+2$ rule is the arithmetic of that filling — no extra physics.
:::
:::

:::exercise The tropylium trip {level=3}
Using the tropylium levels $x = 2,\ 1.247\ (\times 2),\ -0.445\ (\times 2),\ -1.802\ (\times 2)$, compute $E_\pi$ (as $n_e\,\alpha + c\beta$, where $n_e$ is the $\pi$-electron count) for the cation, radical and anion $\mathrm{C_7H_7^{\pm}}$, and predict which exist as stable closed-shell species.
:::solution
Cation ($6e$): $c = 2(2) + 4(1.247) = 8.99$ — closed shell, aromatic, stable (tropylium tetrafluoroborate is a bottleable solid). Radical ($7e$): $c = 8.99 - 0.445 = 8.545$ — one electron in the degenerate antibonding pair, open shell, reactive. Anion ($8e$): $c = 8.99 - 2(0.445) = 8.10$ — still open-shell (one electron in each of the degenerate pair by Hund), antiaromatic-adjacent and unknown as a free ion. Only the $4n+2$ member of the family closes the shell; the seven-membered ring is aromatic for $6$, not for $7$ or $8$.
:::
:::

:::exercise Naphthalene by computer {level=3 check="1.84"}
Write the $10 \times 10$ adjacency matrix of naphthalene (two fused hexagons sharing one bond) and find its eigenvalues numerically. Compute the delocalisation energy against five isolated double bonds in units of $|\beta|$, and give the DE *per ring*. (Enter the per-ring DE in units of $|\beta|$.)
:::solution
The eigenvalues are $x = \pm 2.303, \pm 1.618, \pm 1.303, \pm 1.000, \pm 0.618$ (symmetric — the pairing theorem, sets of 5 and 5). Ten electrons: $E_\pi = 10\alpha + 13.68\,\beta$, DE $= 3.68\,|\beta|$ total, $1.84\,|\beta|$ per ring against benzene's $2|\beta|$. Naphthalene pays less aromatic stabilisation per ring than benzene — consistent with its easier oxidation and addition chemistry, and with the fact that fusing benzene rings always costs aromaticity per ring.
:::
:::
