Chromium(III) in water is violet, in ammonia yellow-orange, and in ruby, where it replaces a few per cent of the aluminium in corundum, a deep red that glows crimson under ultraviolet light. Its spectrum is not the single band of titanium(III) that crystal field theory explained so neatly in [[coordination-chemistry/crystal-field-theory#ex-ti3]]. $\mathrm{[Cr(H_2O)_6]^{3+}}$ has two broad bands in the visible, at $17\,400$ and $24\,600\ \mathrm{cm^{-1}}$, a third hidden in the ultraviolet, and a pair of very weak, sharp lines in the red that have nothing to do with the others. Manganese(II) solutions, with five $d$ electrons, are almost colourless, and their faint pink comes from absorptions a thousand times weaker than those of cobalt(II) chloride in the same flask. Permanganate, with no $d$ electrons at all, is one of the most intensely coloured ions known.

Three ideas sort this out. First, when there are several $d$ electrons the energy of a configuration such as $t_{2g}^2e_g^1$ depends on how the electrons are arranged among the orbitals, because they repel one another; the states of a complex are **terms**, not configurations, and their energies depend on both $\Delta_\mathrm{o}$ and the interelectronic repulsion parameter $B$. Correlation (Orgel and Tanabe–Sugano) diagrams show how terms evolve from the free ion to the strong-field limit, and fitting the band positions gives $\Delta_\mathrm{o}$ and $B$. Second, **selection rules** set the intensities: transitions that change the spin or keep the parity are forbidden and weak. Third, **charge-transfer** transitions, which move an electron between ligand and metal, are fully allowed and dominate the spectra of permanganate, of iron(III) thiocyanate and of the ruthenium dyes of solar cells. This chapter uses the atomic term symbols of [[quantum-chemistry/many-electron-atoms]] and the symmetry labels of [[coordination-chemistry/ligand-field-mo]].

## Free-ion terms

For a free ion with configuration $d^n$, each way of assigning the $n$ electrons to the ten spin-orbitals ($m_l = 2, 1, 0, -1, -2$, each with $m_s = \pm\tfrac12$) consistent with the Pauli principle is a **microstate**. There are $\binom{10}{n}$ of them: 10 for $d^1$, 45 for $d^2$, 120 for $d^3$, 252 for $d^5$. Electron repulsion groups them into **terms** $^{2S+1}L$, each containing $(2S + 1)(2L + 1)$ microstates of equal energy (ignoring spin–orbit coupling).

::: proposition The terms of d² {#prop-d2-terms}
The 45 microstates of a $d^2$ configuration form five Russell–Saunders terms,
$$
d^2:\quad {}^3F,\ {}^3P,\ {}^1G,\ {}^1D,\ {}^1S,
$$
containing $21 + 9 + 9 + 5 + 1 = 45$ microstates. By Hund's rules the ground term is $^3F$. The same terms arise for $d^8$, which has two holes in place of two electrons.
:::

::: proof
Tabulate the microstates by their totals $M_L = m_{l1} + m_{l2}$ and $M_S = m_{s1} + m_{s2}$. By symmetry it suffices to count $M_L \ge 0$:

| $M_L$ | $M_S = +1$ | $M_S = 0$ | $M_S = -1$ |
|---|---|---|---|
| 4 | 0 | 1 | 0 |
| 3 | 1 | 2 | 1 |
| 2 | 1 | 3 | 1 |
| 1 | 2 | 4 | 2 |
| 0 | 2 | 5 | 2 |

(For instance $M_L = 4$ needs both electrons in $m_l = 2$, which the Pauli principle allows only with opposite spins, so it occurs only with $M_S = 0$.) Now peel off terms from the top. The largest $M_L$ is 4, occurring only at $M_S = 0$: a term with $L = 4$, $S = 0$, the $^1G$, which contributes one microstate to each $M_L$ from 4 down to $-4$ at $M_S = 0$. Remove it. The largest remaining $M_L$ is 3, now with one microstate at each of $M_S = 1, 0, -1$: a $^3F$ term, contributing one microstate at each $(M_L, M_S)$ with $|M_L| \le 3$, $|M_S| \le 1$. Remove it. At $M_L = 2$ one microstate remains, at $M_S = 0$: $^1D$. At $M_L = 1$ there remain $(1, 1, 1)$: $^3P$. At $M_L = 0$ one remains at $M_S = 0$: $^1S$. Counting $(2S + 1)(2L + 1)$: $^1G$ 9, $^3F$ 21, $^1D$ 5, $^3P$ 9, $^1S$ 1, total 45.

Hund's rules choose the ground term: maximum $S$ (the triplets $^3F$ and $^3P$), then maximum $L$ among them, $^3F$. For $d^8$ the microstates are the arrangements of two holes, which have the same $(M_L, M_S)$ table, so the same terms occur, with $^3F$ again lowest.
:::

The energies of the terms are given by the electrostatic repulsion integrals, conventionally combined into the **Racah parameters** $A$, $B$ and $C$. For $d^2$, $E(^3F) = A - 8B$, $E(^3P) = A + 7B$, $E(^1D) = A - 3B + 2C$, $E(^1G) = A + 4B + 2C$ and $E(^1S) = A + 14B + 7C$. $A$ shifts every term equally and never appears in a spectrum; energy differences between terms of the *same* spin multiplicity depend on $B$ alone (the $^3F$–$^3P$ gap is $15B$), while those between terms of different multiplicity involve $C$ as well. For $3d$ ions $B$ is about $700$–$1100\ \mathrm{cm^{-1}}$ and $C \approx 4B$.

::: example Ground terms by Hund's rules {#ex-ground-terms}
Find the free-ion ground terms of $\mathrm{Ti^{3+}}$, $\mathrm{V^{3+}}$, $\mathrm{Cr^{3+}}$, $\mathrm{Mn^{2+}}$, $\mathrm{Fe^{2+}}$, $\mathrm{Co^{2+}}$, $\mathrm{Ni^{2+}}$ and $\mathrm{Cu^{2+}}$.
::: solution
Put the electrons into the $m_l$ boxes $2, 1, 0, -1, -2$ in order, spins parallel as long as possible; then $S = \tfrac12 \times$ (number of unpaired electrons) and $L = |\sum m_l|$.

$\mathrm{Ti^{3+}}$ $d^1$: $m_l = 2$, $L = 2$, $S = \tfrac12$: $^2D$. $\mathrm{V^{3+}}$ $d^2$: $2 + 1 = 3$, $S = 1$: $^3F$. $\mathrm{Cr^{3+}}$ $d^3$: $2 + 1 + 0 = 3$, $S = \tfrac32$: $^4F$. $\mathrm{Mn^{2+}}$ $d^5$: each $m_l$ singly occupied, $L = 0$, $S = \tfrac52$: $^6S$. $\mathrm{Fe^{2+}}$ $d^6$: five parallel plus one paired in $m_l = 2$, $L = 2$, $S = 2$: $^5D$. $\mathrm{Co^{2+}}$ $d^7$: two paired ($m_l = 2, 1$), $L = 3$, $S = \tfrac32$: $^4F$. $\mathrm{Ni^{2+}}$ $d^8$: $L = 2 + 1 = 3$, $S = 1$: $^3F$. $\mathrm{Cu^{2+}}$ $d^9$: one hole, $^2D$.

Notice the pattern: $d^n$ and $d^{10-n}$ have the same ground term, and so do $d^n$ and $d^{5+n}$ for the high-spin ions ($d^1$ and $d^6$ both $D$; $d^2$, $d^3$, $d^7$, $d^8$ all $F$). The second correspondence holds because a half-filled shell adds nothing to $L$.
:::
:::

## From terms to ligand field states

Put the free ion into an octahedral field. A term with angular momentum $L$ behaves like a set of $2L + 1$ functions with the symmetry of the spherical harmonics $Y_{Lm}$, and it splits in $O_h$ exactly as a set of orbitals with the same $l$ would (with $g$ labels, since $d$ functions are even). The correlation, derived from the $O_h$ characters of the rotation group, is:

| free-ion term | $S$ | $P$ | $D$ | $F$ | $G$ |
|---|---|---|---|---|---|
| states in $O_h$ | $A_{1g}$ | $T_{1g}$ | $E_g + T_{2g}$ | $A_{2g} + T_{1g} + T_{2g}$ | $A_{1g} + E_g + T_{1g} + T_{2g}$ |

The spin multiplicity is unchanged by the field. State symbols are written in capitals with the multiplicity as a left superscript: the $^3F$ ground term of $\mathrm{V^{3+}}$ becomes $^3T_{1g} + {}^3T_{2g} + {}^3A_{2g}$.

::: definition Orgel and Tanabe–Sugano diagrams {#def-ts}
An **Orgel diagram** plots the energies of the ligand field states arising from the free-ion terms of highest spin against $\Delta_\mathrm{o}$, for weak fields. A **Tanabe–Sugano diagram** plots the energies of all states of a $d^n$ ion in units of $B$, $E/B$, against $\Delta_\mathrm{o}/B$, for a fixed ratio $C/B$, with the ground state always drawn along the horizontal axis. Because $E/B$ depends only on $\Delta_\mathrm{o}/B$ and $C/B$, one diagram serves every complex of that configuration. A vertical line on a Tanabe–Sugano diagram at the complex's value of $\Delta_\mathrm{o}/B$ gives the predicted transition energies; for $d^4$–$d^7$ the diagram has a discontinuity where the ground state changes from high spin to low spin.
:::

### One electron and one hole: d¹ and d⁹

For $d^1$ the only term is $^2D$, which splits into $^2T_{2g}$ (the electron in $t_{2g}$) and $^2E_g$ (in $e_g$), separated by $\Delta_\mathrm{o}$: one spin-allowed band. For $d^9$ there is one hole. A hole in $e_g$ is the ground state ($t_{2g}^6e_g^3$, $^2E_g$), and the band is the hole jumping into $t_{2g}$, also at $\Delta_\mathrm{o}$, but with the order of the states inverted. The same inversion relates $d^4$ to $d^6$ (high spin) and $d^1$ to $d^6$ in the opposite sense; Orgel's insight was that a single diagram, read left to right for one set and right to left for its partner, covers $d^1$, $d^4$, $d^6$ and $d^9$. In practice the $d^9$ band of copper(II) is very broad and asymmetric because the Jahn–Teller distortion splits both states.

### Three electrons: the d³ diagram

For $d^3$ (and its hole partner $d^8$), the $^4F$ ground term splits into $^4A_{2g}$ (lowest), $^4T_{2g}$ and $^4T_{1g}(F)$, and the excited $^4P$ term gives a second $^4T_{1g}(P)$. The two $^4T_{1g}$ states have the same symmetry and spin, so they interact and repel.

::: proposition Spin-allowed transitions of octahedral d³ and d⁸ {#prop-d3}
For an octahedral $d^3$ or $d^8$ ion, measured from the $^4A_{2g}$ (or $^3A_{2g}$) ground state, the three spin-allowed transitions lie at
$$
\begin{aligned}
\tilde\nu_1 &= \Delta_\mathrm{o} &&({}^4A_{2g} \rightarrow {}^4T_{2g}),\\
\tilde\nu_{2,3} &= \tfrac{15}{2}B + \tfrac32\Delta_\mathrm{o} \mp \tfrac12\sqrt{225B^2 - 18B\Delta_\mathrm{o} + \Delta_\mathrm{o}^2} &&({}^4A_{2g} \rightarrow {}^4T_{1g}(F),\ {}^4T_{1g}(P)).
\end{aligned}
$$ {#eq-d3}
Consequently $\tilde\nu_2 + \tilde\nu_3 = 15B + 3\Delta_\mathrm{o}$. The expressions neglect spin–orbit coupling and configuration interaction with states of other spin, and assume the same $B$ for all states.
:::

::: proof
In the strong-field basis the quartet states arise from configurations: $^4A_{2g}$ from $t_{2g}^3$ (energy $-1.2\Delta_\mathrm{o}$ relative to the barycentre), $^4T_{2g}$ and one $^4T_{1g}$ from $t_{2g}^2e_g^1$ ($-0.2\Delta_\mathrm{o}$), and the other $^4T_{1g}$ from $t_{2g}^1e_g^2$ ($+0.8\Delta_\mathrm{o}$). Including electron repulsion (the standard matrix elements, derived for example in Figgis and Hitchman), the energies relative to $^4A_{2g}$ are: $^4T_{2g}$ at exactly $\Delta_\mathrm{o}$, with no $B$ dependence, because it differs from the ground state only by moving one electron from $t_{2g}$ to $e_g$ in a way that leaves the repulsion unchanged; and for the two $^4T_{1g}$ states the $2 \times 2$ matrix
$$
\begin{pmatrix} \Delta_\mathrm{o} + 12B & 6B \\ 6B & 2\Delta_\mathrm{o} + 3B \end{pmatrix},
$$
whose diagonal elements are the $t_{2g}^2e_g^1$ and $t_{2g}^1e_g^2$ states and whose off-diagonal element mixes them. The eigenvalues are
$$
E = \tfrac12\left[(3\Delta_\mathrm{o} + 15B) \mp \sqrt{(\Delta_\mathrm{o} - 9B)^2 + 4(6B)^2}\right],
$$
and $(\Delta_\mathrm{o} - 9B)^2 + 144B^2 = \Delta_\mathrm{o}^2 - 18B\Delta_\mathrm{o} + 225B^2$, which is [[#eq-d3]]. The sum of the eigenvalues is the trace, $3\Delta_\mathrm{o} + 15B$. Two limits check the result. At $\Delta_\mathrm{o} = 0$ the roots are $0$ and $15B$: both $T_{1g}$ states come from the free-ion terms $^4F$ and $^4P$, which are $15B$ apart. As $\Delta_\mathrm{o} \to \infty$ the roots tend to $\Delta_\mathrm{o} + 12B - \dots$ and $2\Delta_\mathrm{o} + \dots$, the one- and two-electron promotions. For $d^8$ the same algebra applies to holes, which turns the order of the $T_{2g}$, $T_{1g}$ states of $d^2$ into that of $d^3$, so the formulas are identical.
:::

::: widget plot
f: x; (15 + 3*x - sqrt(225 - 18*x + x^2))/2; (15 + 3*x + sqrt(225 - 18*x + x^2))/2
x: 0, 40
y: 0, 90
vlines: 23.9
labels: {}^4T_{2g}; {}^4T_{1g}(F); {}^4T_{1g}(P)
caption: The quartet part of the Tanabe–Sugano diagram for octahedral $d^3$: energies $E/B$ of the three spin-allowed excited states above the $^4A_{2g}$ ground state (the horizontal axis) against $x = \Delta_\mathrm{o}/B$, from [[#eq-d3]]. The lines start at $0$ and $15B$ (the free-ion $^4F$ and $^4P$ terms) and fan out as the field grows. The two $^4T_{1g}$ curves repel (a non-crossing rule for states of the same symmetry), so $^4T_{1g}(F)$ bends below the straight line it would otherwise follow. The vertical line at $\Delta_\mathrm{o}/B = 23.9$ is $\mathrm{[Cr(H_2O)_6]^{3+}}$ ([[#ex-cr-fit]]): it meets the curves at $E/B = 23.9$, $33.8$ and $52.9$, that is at $17\,400$, $24\,600$ and $38\,500\ \mathrm{cm^{-1}}$ with $B = 729\ \mathrm{cm^{-1}}$. The doublet states, not shown, include a $^2E_g$ that runs almost flat at about $E/B \approx 9 + 3C/B$ above the ground state at these fields; it gives the sharp ruby lines.
:::

::: example Fitting Δo and B for hexaaquachromium(III) {#ex-cr-fit}
$\mathrm{[Cr(H_2O)_6]^{3+}}$ absorbs at $17\,400$ and $24\,600\ \mathrm{cm^{-1}}$. Find $\Delta_\mathrm{o}$ and $B$, predict the third spin-allowed band, and compare $B$ with the free-ion value $B_0(\mathrm{Cr^{3+}}) = 918\ \mathrm{cm^{-1}}$.
::: solution
By [[#prop-d3]], the lowest band is $\Delta_\mathrm{o} = 17\,400\ \mathrm{cm^{-1}}$. Insert this into the expression for $\tilde\nu_2$ and solve for $B$:
$$
24\,600 = 7.5B + 26\,100 - \tfrac12\sqrt{225B^2 - 313\,200B + 3.0276\times10^8}.
$$
Rearranged: $\sqrt{225B^2 - 313\,200B + 3.0276\times10^8} = 15B + 3000$. Squaring both sides, $225B^2 - 313\,200B + 3.0276\times10^8 = 225B^2 + 90\,000B + 9.0\times10^6$, so $403\,200B = 2.9376\times10^8$ and $B = 729\ \mathrm{cm^{-1}}$ (the $B^2$ terms cancel, so the equation is linear; check that $15B + 3000 > 0$, which it is). The sum rule then gives $\tilde\nu_3 = 15B + 3\Delta_\mathrm{o} - \tilde\nu_2 = 10\,929 + 52\,200 - 24\,600 = 38\,500\ \mathrm{cm^{-1}}$ ($260\ \mathrm{nm}$), in the ultraviolet, where it is partly hidden under charge-transfer absorption; a band is observed near $37\,800\ \mathrm{cm^{-1}}$. The ratio $\beta = B/B_0 = 729/918 = 0.79$: interelectronic repulsion in the complex is 21 % smaller than in the free ion. The bands at $575\ \mathrm{nm}$ (yellow) and $407\ \mathrm{nm}$ (violet) leave a transmission window in the blue-violet and red, which the eye sees as violet-grey.
:::
:::

The same fit can be done numerically, which is how spectroscopists treat configurations whose expressions are not linear in $B$. The figure below solves the $\tilde\nu_2$ equation of [[#ex-cr-fit]] by Newton's method, in units of $1000\ \mathrm{cm^{-1}}$.

::: widget newton
f: 7.5*x + 26.1 - 0.5*sqrt(225*x^2 - 313.2*x + 302.76) - 24.6
method: newton
x0: 1.2
steps: 6
x: 0.3, 1.5
caption: Newton iteration for the Racah parameter $B$ (in $10^3\ \mathrm{cm^{-1}}$) of $\mathrm{[Cr(H_2O)_6]^{3+}}$: the function is $\tilde\nu_2(B) - 24.6$ with $\Delta_\mathrm{o} = 17.4$, from [[#eq-d3]]. The root is $B = 0.729$, reached from a starting guess of 1.2 (above the free-ion value) in four or five steps. The function is smooth and monotonic in this range, so any physically sensible starting point converges. For $d^2$ and $d^7$ ions the lowest band also depends on $B$, and both parameters must be fitted together, two equations in two unknowns.
:::

### The nephelauxetic effect

The reduction of $B$ in complexes is the **nephelauxetic effect** (Greek, "cloud-expanding"): the metal's $d$ electrons spread onto the ligands through covalent mixing, the average distance between them grows, and their repulsion falls. The ratio $\beta = B/B_0$ orders ligands in the **nephelauxetic series**, which is approximately
$$
\mathrm{F^-} > \mathrm{H_2O} > \mathrm{NH_3} > \mathrm{en} > \mathrm{ox^{2-}} > \mathrm{SCN^-} > \mathrm{Cl^-} \approx \mathrm{CN^-} > \mathrm{Br^-} > \mathrm{I^-},
$$
from least to most covalent ($\beta$ close to 1 for fluoride, near 0.5–0.6 for bromide and iodide). For chromium(III), $\beta$ is $0.79$ for water and $0.72$ for ammonia ([[#exr-cr-nh3]]). Unlike the spectrochemical series this ordering follows the softness and polarisability of the donor atom, as one would expect of a measure of covalency (compare the hard–soft classification of [[main-group/inorganic-acids-bases]]).

::: quiz
For an octahedral $d^8$ ion such as $\mathrm{Ni^{2+}}$, which band position gives $\Delta_\mathrm{o}$ directly?
- [x] The lowest-energy spin-allowed band.
- [ ] The middle band.
- [ ] The highest-energy band.
- [ ] The difference between the two highest bands.
::: solution
For $d^3$ and $d^8$ the lowest excited state of the ground-state spin, $T_{2g}$, lies exactly $\Delta_\mathrm{o}$ above the $A_{2g}$ ground state ([[#prop-d3]]), independent of $B$. The other two bands go to the $T_{1g}$ states, whose energies depend on both $\Delta_\mathrm{o}$ and $B$; their sum is $15B + 3\Delta_\mathrm{o}$.
:::
:::

## Selection rules and intensities

The intensity of an absorption band is measured by its molar absorption coefficient $\varepsilon$ at the maximum (in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$), and more fundamentally by its integrated intensity or oscillator strength ([[spectroscopy/electronic-spectroscopy]]). For an electric-dipole transition the intensity is proportional to the square of the transition dipole moment $\langle \psi_\mathrm{f} | \hat{\boldsymbol\mu} | \psi_\mathrm{i} \rangle$, and two symmetry rules make this zero for many $d$–$d$ transitions.

::: proposition Selection rules for d–d transitions {#prop-selection}
1. **Spin selection rule**: $\Delta S = 0$. The dipole operator does not act on spin, so states of different total spin are not connected.
2. **Laporte rule**: in a centrosymmetric complex, transitions between states of the same parity ($g \leftrightarrow g$ or $u \leftrightarrow u$) are forbidden; only $g \leftrightarrow u$ is allowed.

Since all $d$-orbital states are $g$, every $d$–$d$ transition in an octahedral or square-planar complex is Laporte-forbidden. The rules are relaxed by **spin–orbit coupling** (which mixes states of different spin, more for heavier atoms), by **vibronic coupling** (asymmetric vibrations that momentarily remove the inversion centre) and, in non-centrosymmetric complexes such as tetrahedra, by mixing of $d$ with $p$ orbitals.
:::

::: proof
The electric dipole operator $\hat{\boldsymbol\mu} = -e\sum_i \mathbf{r}_i$ is a sum of position operators, which change sign under inversion: it is $u$. The integrand $\psi_\mathrm{f}^*\hat{\boldsymbol\mu}\psi_\mathrm{i}$ then has parity $g \times u \times g = u$ for a $g \rightarrow g$ transition, and the integral of an odd function over all space is zero. For $g \rightarrow u$ the integrand is $g$ and the integral can be non-zero. For the spin rule, write each state as a product of a spatial and a spin function; $\hat{\boldsymbol\mu}$ acts only on the spatial part, so the integral contains the factor $\langle S_\mathrm{f} M_\mathrm{f} | S_\mathrm{i} M_\mathrm{i} \rangle$, which vanishes unless the spins are equal, by orthogonality of spin eigenfunctions.
:::

The rules give a rough scale of intensities that is one of the most useful diagnostics in inorganic chemistry:

| transition type | typical $\varepsilon_\mathrm{max}$ / $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ | example |
|---|---|---|
| spin-forbidden, Laporte-forbidden | $< 1$ | $\mathrm{[Mn(H_2O)_6]^{2+}}$ (pale pink) |
| spin-allowed, Laporte-forbidden (octahedral $d$–$d$) | 1–100 | $\mathrm{[Ni(H_2O)_6]^{2+}}$, $\mathrm{[Cr(H_2O)_6]^{3+}}$ |
| spin-allowed, tetrahedral $d$–$d$ ($d$–$p$ mixing) | 100–1000 | $\mathrm{[CoCl_4]^{2-}}$ (deep blue) |
| charge transfer, fully allowed | 1000–50 000 | $\mathrm{[MnO_4]^-}$, $\mathrm{[Ru(bpy)_3]^{2+}}$ |

::: example Why is manganese(II) almost colourless? {#ex-mn2}
Explain why $\mathrm{[Mn(H_2O)_6]^{2+}}$ has only very weak absorptions ($\varepsilon < 0.1$), why some of its bands are unusually sharp, and why a manganese(II) salt such as $\mathrm{MnCl_2\cdot4H_2O}$ looks pale pink rather than colourless.
::: solution
High-spin $d^5$ has the ground state $^6A_{1g}$ (from the $^6S$ free-ion term, $t_{2g}^3e_g^2$ with all five spins parallel). No other $d^5$ state has $S = \tfrac52$: any excited state requires at least one spin to flip, so every $d$–$d$ transition is spin-forbidden as well as Laporte-forbidden. Both rules are only relaxed by weak perturbations (spin–orbit coupling is small for a $3d$ ion, and vibronic coupling only partly lifts the parity restriction), so $\varepsilon$ is of the order of $0.01$–$0.1$. Some of the excited states, such as $^4A_{1g}$ and $^4E_g$ from the $^4G$ term, have the same configuration $t_{2g}^3e_g^2$ as the ground state, merely with one spin reversed. Their energy relative to the ground state then does not depend on $\Delta_\mathrm{o}$, so molecular vibrations, which modulate $\Delta_\mathrm{o}$, do not broaden these bands, and they are sharp (near $25\,000\ \mathrm{cm^{-1}}$). The weak absorptions are spread across the visible, with slightly more in the green, which gives the faint pink seen in concentrated solutions and crystals.
:::
:::

::: warning Colour is not a reliable measure of Δo {#warn-colour}
It is tempting to read the colour of a complex and infer $\Delta_\mathrm{o}$ from the complementary colour. This works only for a single, isolated, spin-allowed band (as for $\mathrm{Ti^{3+}}$). With two or three bands (most $d^2$, $d^3$, $d^7$, $d^8$ ions), the perceived colour is the light transmitted between them, and the *lowest* band, which gives $\Delta_\mathrm{o}$ for $d^3$ and $d^8$, may lie in the near infrared (at $8500\ \mathrm{cm^{-1}}$, $1180\ \mathrm{nm}$, for $\mathrm{[Ni(H_2O)_6]^{2+}}$), outside the visible altogether. Charge-transfer bands in the near ultraviolet often tail into the visible and dominate the colour, as in yellow chromate or orange-red iron(III) solutions. And the intensity matters as much as the position: a strongly absorbing tetrahedral complex looks intensely coloured at a concentration at which an octahedral one looks almost clear. Always assign the bands from the spectrum, never from the colour.
:::

## Charge-transfer transitions

A **charge-transfer** (CT) transition moves an electron from an orbital mainly on the ligands to one mainly on the metal (**ligand-to-metal charge transfer**, LMCT) or from the metal to empty ligand orbitals (**metal-to-ligand charge transfer**, MLCT). In the MO language of [[coordination-chemistry/ligand-field-mo]] these are transitions between MOs of different parity and different localisation: typically ligand-based $u$ orbitals to metal $e_g^*$ or $t_{2g}$ (LMCT), or metal $t_{2g}$ to ligand $\pi^*$ (MLCT). They are spin- and Laporte-allowed and therefore very intense.

LMCT bands are lowest in energy when the ligand is easily oxidised (soft, polarisable donors: $\mathrm{I^-} < \mathrm{Br^-} < \mathrm{Cl^-}$ in energy) and the metal is easily reduced (high oxidation states). The tetrahedral $d^0$ oxoanions show the metal effect clearly: the first LMCT band lies near $37\,000\ \mathrm{cm^{-1}}$ (about $270\ \mathrm{nm}$) for vanadate $\mathrm{[VO_4]^{3-}}$, colourless; near $27\,000\ \mathrm{cm^{-1}}$ ($370\ \mathrm{nm}$) for chromate $\mathrm{[CrO_4]^{2-}}$, yellow; and near $19\,000\ \mathrm{cm^{-1}}$ ($525\ \mathrm{nm}$) for permanganate $\mathrm{[MnO_4]^-}$, purple. Along this isoelectronic series the metal's charge rises and its acceptor orbitals ($e$) fall, so the band moves to lower energy.

MLCT bands need a metal in a low oxidation state with filled $t_{2g}$ orbitals and a ligand with low-lying $\pi^*$ orbitals: $\mathrm{[Ru(bpy)_3]^{2+}}$ ($d^6$, MLCT at $452\ \mathrm{nm}$, $\varepsilon \approx 1.4\times10^4$), $\mathrm{[Fe(phen)_3]^{2+}}$ (ferroin, the red redox indicator), and the copper(I) and iron(II) complexes of many colorimetric reagents ([[analytical-chemistry/molecular-spectrometry]]).

::: example Assigning a spectrum {#ex-assign}
A pale green solution of a nickel(II) complex shows bands at $10\,750$ ($\varepsilon = 6$), $17\,500$ ($\varepsilon = 7$) and $28\,200\ \mathrm{cm^{-1}}$ ($\varepsilon = 10$), and an intense band ($\varepsilon \approx 8000$) above $40\,000\ \mathrm{cm^{-1}}$. (a) Assign the bands. (b) Find $\Delta_\mathrm{o}$ and $B$. (c) Is the complex octahedral or tetrahedral?
::: solution
(a) Three weak bands ($\varepsilon \le 10$) are spin-allowed but Laporte-forbidden $d$–$d$ transitions of an octahedral $d^8$ ion: $^3A_{2g} \rightarrow {}^3T_{2g}$, $^3T_{1g}(F)$ and $^3T_{1g}(P)$ in order of energy. The intense band in the ultraviolet is charge transfer (or an intraligand transition). (b) $\Delta_\mathrm{o} = \tilde\nu_1 = 10\,750\ \mathrm{cm^{-1}}$. The sum rule gives $15B = \tilde\nu_2 + \tilde\nu_3 - 3\Delta_\mathrm{o} = 17\,500 + 28\,200 - 32\,250 = 13\,450$, so $B = 897\ \mathrm{cm^{-1}}$. Checking with [[#eq-d3]]: with $\Delta_\mathrm{o} = 10\,750$ and $B = 897$, $\tilde\nu_2 = 6725 + 16\,125 - \tfrac12\sqrt{1.809\times10^8 - 1.735\times10^8 + 1.156\times10^8} = 22\,850 - 5544 = 17\,306\ \mathrm{cm^{-1}}$, and $\tilde\nu_3 = 22\,850 + 5544 = 28\,394\ \mathrm{cm^{-1}}$. Both lie within about 1 % of the observed bands ($17\,500$ and $28\,200$). The sum rule alone cannot test the model, because $B$ was fitted to the sum; the test is that a single $B$ places each band correctly, which here it does to 1 %. The values are typical of $\mathrm{[Ni(NH_3)_6]^{2+}}$. (c) Octahedral: tetrahedral nickel(II) would have $\varepsilon$ of order 100 and $\Delta_\mathrm{t}$ less than half as large, with its main visible band in the red.
:::
:::

::: example A ruthenium dye {#ex-mlct}
$\mathrm{[Ru(bpy)_3]^{2+}}$ is orange, with an absorption maximum at $452\ \mathrm{nm}$ and $\varepsilon = 1.4\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. (a) Find the absorbance of a $5.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ solution in a $1.00\ \mathrm{cm}$ cell, and the fraction of light transmitted. (b) Why can this band not be a $d$–$d$ transition? (c) Describe the excited state.
::: solution
(a) Beer–Lambert: $A = \varepsilon c l = (1.4\times10^4)(5.0\times10^{-5})(1.00) = 0.70$, and $T = 10^{-0.70} = 0.20$: only 20 % of the light at $452\ \mathrm{nm}$ gets through a very dilute solution. (b) Ruthenium(II) is low-spin $d^6$, $t_{2g}^6$; its $d$–$d$ bands would be weak ($\varepsilon < 100$), and with the very large $\Delta_\mathrm{o}$ of a second-row metal with bpy they lie in the ultraviolet. An $\varepsilon$ of $10^4$ demands an allowed transition. (c) It is MLCT: an electron moves from the ruthenium $t_{2g}$ set into a $\pi^*$ orbital of one bipyridine, giving formally $\mathrm{[Ru^{III}(bpy)_2(bpy^{\bullet-})]^{2+}}$. The excited state, which quickly becomes a long-lived triplet, is simultaneously a stronger reductant and a stronger oxidant than the ground state, which is why ruthenium polypyridyl complexes are used as photosensitisers in photoredox catalysis and dye-sensitised solar cells ([[kinetics/photochemistry]]).
:::
:::

## Where this leads

The spectra of this chapter are the experimental foundation of ligand field theory: $\Delta_\mathrm{o}$ in the spectrochemical series and $B$ in the nephelauxetic series both come from fits of the kind done here. Spin–orbit coupling, which we have mostly ignored, becomes essential for the magnetic properties of [[coordination-chemistry/magnetism]], and dominates the spectra of the lanthanides, whose $f$–$f$ bands are sharp and almost independent of the ligands ([[coordination-chemistry/f-block]]). The red emission of ruby, from the $^2E_g$ state of $\mathrm{Cr^{3+}}$, was the basis of the first laser (1960) and is still used as a pressure gauge in diamond-anvil cells; solid-state applications are in [[materials-chemistry/magnetic-optical]]. Charge-transfer bands underlie the colorimetric analysis of metals and the photochemistry of coordination compounds.

::: history
Atomic term symbols and the coupling of electron angular momenta were worked out by Henry Norris Russell and Frederick Saunders in 1925 from the spectra of the alkaline earths, and Giulio Racah introduced his parameters in a series of papers in *Physical Review* from 1942 onwards. Leslie Orgel's 1955 paper in the *Journal of Chemical Physics* gave the weak-field correlation diagrams that carry his name. Yukito Tanabe and Satoru Sugano published their complete diagrams for $d^2$–$d^8$ in the *Journal of the Physical Society of Japan* in 1954, solving the full ligand-field-plus-repulsion problem for each configuration; they remain the standard tool. The intensity rules come from Otto Laporte's 1924 work on atomic spectra, and the vibronic mechanism by which forbidden $d$–$d$ bands gain intensity was explained in the 1950s. Christian Klixbüll Jørgensen, working in Copenhagen from the 1950s, coined the term "nephelauxetic" and systematised both the spectrochemical and nephelauxetic series, as well as charge-transfer spectra. Theodore Maiman's 1960 ruby laser turned the sharp spin-forbidden $^2E_g \rightarrow {}^4A_{2g}$ emission of chromium(III) into a technology.
:::

::: summary
- A $d^n$ ion has $\binom{10}{n}$ microstates, grouped by electron repulsion into Russell–Saunders terms; $d^2$ gives $^3F$ (ground), $^3P$, $^1G$, $^1D$, $^1S$, and Hund's rules find the ground term of any configuration.
- In an octahedral field $S \rightarrow A_{1g}$, $P \rightarrow T_{1g}$, $D \rightarrow E_g + T_{2g}$, $F \rightarrow A_{2g} + T_{1g} + T_{2g}$; spin multiplicity is unchanged.
- Tanabe–Sugano diagrams plot $E/B$ against $\Delta_\mathrm{o}/B$; for $d^3$ and $d^8$ the lowest spin-allowed band is $\Delta_\mathrm{o}$ and the next two satisfy $\tilde\nu_2 + \tilde\nu_3 = 15B + 3\Delta_\mathrm{o}$.
- $B$ in complexes is smaller than in the free ion ($\beta = B/B_0 \approx 0.5$–$0.9$): the nephelauxetic effect measures covalency and follows the softness of the donor atom.
- The spin rule ($\Delta S = 0$) and the Laporte rule ($g \leftrightarrow u$ only) make octahedral $d$–$d$ bands weak ($\varepsilon \approx 1$–$100$) and spin-forbidden bands very weak ($< 1$); tetrahedral bands are stronger (100–1000).
- Charge-transfer bands (LMCT for high oxidation states and soft ligands, MLCT for low oxidation states and π-acceptor ligands) are fully allowed, with $\varepsilon \approx 10^3$–$10^5$, and dominate the colour of permanganate, chromate and ruthenium polypyridyls.
:::

## Exercises

::: exercise Counting microstates {level=1 check="120"}
How many microstates does a $d^3$ configuration have, and how many does its ground term contain? (Enter the number of microstates.)
::: solution
$\binom{10}{3} = 120$ microstates. The ground term is $^4F$ ($S = \tfrac32$, $L = 3$), containing $(2S + 1)(2L + 1) = 4 \times 7 = 28$ of them.
:::
:::

::: exercise Ground terms and their splitting {level=1}
Give the free-ion ground term of $\mathrm{V^{2+}}$, $\mathrm{Fe^{3+}}$ (high spin) and $\mathrm{Co^{3+}}$ (in the free ion), and the states into which each splits in an octahedral field.
::: solution
$\mathrm{V^{2+}}$, $d^3$: $^4F \rightarrow {}^4A_{2g} + {}^4T_{1g} + {}^4T_{2g}$ (ground $^4A_{2g}$). $\mathrm{Fe^{3+}}$, $d^5$: $^6S \rightarrow {}^6A_{1g}$ (no splitting; all spin-allowed $d$–$d$ transitions are absent, so iron(III) colour comes mainly from charge transfer). $\mathrm{Co^{3+}}$, $d^6$: $^5D \rightarrow {}^5T_{2g} + {}^5E_g$. In most complexes, however, cobalt(III) is low spin and its ground state is $^1A_{1g}$ ($t_{2g}^6$), which arises from a singlet free-ion term, not from $^5D$; this is where the Tanabe–Sugano diagram changes ground state.
:::
:::

::: exercise A Beer–Lambert estimate {level=1 check="0.12"}
$\mathrm{[Ni(H_2O)_6]^{2+}}$ has $\varepsilon = 5.0\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ at its $395\ \mathrm{nm}$ band. What is the absorbance of a $0.0240\ \mathrm{mol\,dm^{-3}}$ solution in a $1.00\ \mathrm{cm}$ cell? (Enter the absorbance.)
::: solution
$A = \varepsilon c l = 5.0 \times 0.0240 \times 1.00 = 0.12$. The same absorbance from $\mathrm{[MnO_4]^-}$ ($\varepsilon \approx 2400$ at $525\ \mathrm{nm}$) would need only $5\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, which is why permanganate titrations are self-indicating.
:::
:::

::: exercise Hexaamminechromium(III) {#exr-cr-nh3 level=2 check="663"}
$\mathrm{[Cr(NH_3)_6]^{3+}}$ absorbs at $21\,500$ and $28\,500\ \mathrm{cm^{-1}}$. Find $\Delta_\mathrm{o}$, $B$ and $\beta$ ($B_0 = 918\ \mathrm{cm^{-1}}$), and compare with $\mathrm{[Cr(H_2O)_6]^{3+}}$. (Enter $B$ in $\mathrm{cm^{-1}}$, to three significant figures.)
::: hint
Follow [[#ex-cr-fit]]: isolate the square root, square, and the $B^2$ terms cancel.
:::
::: solution
$\Delta_\mathrm{o} = 21\,500\ \mathrm{cm^{-1}}$. Then $28\,500 = 7.5B + 32\,250 - \tfrac12\sqrt{225B^2 - 387\,000B + 4.6225\times10^8}$, so $\sqrt{\cdots} = 15B + 7500$. Squaring: $-387\,000B + 4.6225\times10^8 = 225\,000B + 5.625\times10^7$, giving $612\,000B = 4.06\times10^8$ and $B = 663\ \mathrm{cm^{-1}}$. Then $\beta = 663/918 = 0.72$, smaller than $0.79$ for water: ammonia, a softer donor, is more nephelauxetic. Both $\Delta_\mathrm{o}$ and the covalency are larger for ammonia.
:::
:::

::: exercise Assigning by intensity {level=2}
Four solutions show their strongest visible absorption with $\varepsilon_\mathrm{max}$ of (a) 0.03, (b) 12, (c) 600, (d) 4000 $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. Match them to $\mathrm{[CoCl_4]^{2-}}$, $\mathrm{[Mn(H_2O)_6]^{2+}}$, $\mathrm{[Fe(SCN)(H_2O)_5]^{2+}}$ and $\mathrm{[Co(H_2O)_6]^{2+}}$, giving reasons.
::: solution
(a) 0.03: $\mathrm{[Mn(H_2O)_6]^{2+}}$, spin- and Laporte-forbidden. (b) 12: $\mathrm{[Co(H_2O)_6]^{2+}}$, a spin-allowed octahedral $d$–$d$ band (pink). (c) 600: $\mathrm{[CoCl_4]^{2-}}$, tetrahedral, no inversion centre, $d$–$p$ mixing makes the $d$–$d$ band much stronger (deep blue). (d) 4000: $\mathrm{[Fe(SCN)(H_2O)_5]^{2+}}$, the blood-red LMCT band (thiocyanate to iron(III)) used in the colorimetric test for iron(III).
:::
:::

::: exercise The LMCT series {level=2}
Predict the order of the lowest LMCT band energies in (a) $\mathrm{[IrCl_6]^{2-}}$ and $\mathrm{[IrBr_6]^{2-}}$; (b) $\mathrm{[CrO_4]^{2-}}$ and $\mathrm{[MoO_4]^{2-}}$; (c) $\mathrm{[Fe(H_2O)_6]^{3+}}$ and $\mathrm{[Fe(H_2O)_6]^{2+}}$. Explain each.
::: solution
(a) Bromide is more easily oxidised than chloride (its lone pairs are higher in energy), so the LMCT band of $\mathrm{[IrBr_6]^{2-}}$ is at lower energy. (b) Molybdenum(VI) is harder to reduce than chromium(VI) (the heavier element is more stable in its highest oxidation state, a general trend of [[coordination-chemistry/d-block-chemistry]]), so molybdate's LMCT is at higher energy and molybdate is colourless while chromate is yellow. (c) Iron(III) is far more easily reduced than iron(II), so the LMCT from water lies much lower for $\mathrm{Fe^{3+}}$; its tail in the near UV contributes to the yellow-brown colour of iron(III) solutions (with hydrolysed species, which absorb lower still), whereas $\mathrm{[Fe(H_2O)_6]^{2+}}$ is pale green from a weak $d$–$d$ band.
:::
:::

::: exercise Fitting hexaaquanickel(II) {level=3 check="14144"}
$\mathrm{[Ni(H_2O)_6]^{2+}}$ has bands at $8500$ and $25\,300\ \mathrm{cm^{-1}}$ assigned to $\tilde\nu_1$ and $\tilde\nu_3$; the middle band is broad and split. (a) Find $B$ from $\tilde\nu_1$ and $\tilde\nu_3$. (b) Predict $\tilde\nu_2$. (c) The observed middle band has components near $13\,800$ and $15\,400\ \mathrm{cm^{-1}}$. Suggest why. (Enter the predicted $\tilde\nu_2$ in $\mathrm{cm^{-1}}$, to the nearest $\mathrm{cm^{-1}}$.)
::: hint
For $\tilde\nu_3$ take the plus sign in [[#eq-d3]]. Isolate the square root, square, and solve the linear equation in $B$.
:::
::: solution
(a) With $\Delta_\mathrm{o} = 8500$: $25\,300 = 7.5B + 12\,750 + \tfrac12\sqrt{225B^2 - 153\,000B + 7.225\times10^7}$, so $\sqrt{\cdots} = 25\,100 - 15B$. Squaring: $225B^2 - 153\,000B + 7.225\times10^7 = 6.3001\times10^8 - 753\,000B + 225B^2$, so $600\,000B = 5.5776\times10^8$ and $B = 929.6\ \mathrm{cm^{-1}}$ ($\beta = 929.6/1080 = 0.86$ with $B_0(\mathrm{Ni^{2+}}) = 1080\ \mathrm{cm^{-1}}$). (b) Sum rule: $\tilde\nu_2 = 15B + 3\Delta_\mathrm{o} - \tilde\nu_3 = 13\,944 + 25\,500 - 25\,300 = 14\,144\ \mathrm{cm^{-1}}$. (c) The predicted position falls between the two observed components. The spin-forbidden $^3A_{2g} \rightarrow {}^1E_g$ transition (from the $^1D$ term) happens to lie close to $^3T_{1g}(F)$ at this field strength; spin–orbit coupling mixes the two states, which share intensity and repel, giving a doublet. Such "intensity borrowing" near crossings is common in Tanabe–Sugano diagrams and is a reminder that the spin rule is only approximate.
:::
:::

::: exercise Terms of d⁸ from holes {level=3}
(a) Show that the number of microstates for $d^n$ equals that for $d^{10-n}$. (b) Explain why the terms of $d^8$ are the same as those of $d^2$, but the splitting pattern of $^3F$ in an octahedral field is inverted (for $d^2$ the ground state is $^3T_{1g}$, for $d^8$ it is $^3A_{2g}$). (c) Using (b), explain why the lowest band of an octahedral $d^2$ ion does *not* give $\Delta_\mathrm{o}$ directly.
::: solution
(a) $\binom{10}{n} = \binom{10}{10-n}$: choosing which $n$ spin-orbitals are filled is the same as choosing which $10 - n$ are empty. (b) Each microstate of $d^{10-n}$ corresponds to the microstate of $n$ holes with $M_L$ and $M_S$ reversed in sign, so the $(M_L, M_S)$ tables and hence the terms coincide. A hole behaves like a positive charge: the ligand field, which raises the energy of an electron in $e_g$, *lowers* the energy of a hole there. All one-particle splittings change sign, and the order of the states from each term is inverted. For $d^2$ the two electrons prefer $t_{2g}$, giving $^3T_{1g}$ (from $t_{2g}^2$) lowest; for $d^8$ the two holes prefer $e_g$ (equivalently, the eight electrons fill $t_{2g}^6e_g^2$), giving $^3A_{2g}$ lowest. (c) For $d^2$ the ground $^3T_{1g}(F)$ is itself one of the two interacting $T_{1g}$ states; it is pushed down by its interaction with $^3T_{1g}(P)$ by an amount that depends on $B$. The lowest band, $^3T_{1g}(F) \rightarrow {}^3T_{2g}$, therefore lies somewhat *above* $0.8\Delta_\mathrm{o}$ in a way that depends on $B$, and both parameters must be fitted together, as for $\mathrm{[V(H_2O)_6]^{3+}}$. Only for $d^3$, $d^8$ (with $A_{2g}$ ground states) and the one-electron or one-hole cases is a band exactly $\Delta_\mathrm{o}$.
:::
:::
