VSEPR is a remarkable piece of bookkeeping: count the electron pairs, and the shape follows. But it is bookkeeping, not mechanics. It says that four domains on carbon point to the corners of a tetrahedron because that is where repulsion puts them; it does not say *why carbon has four equivalent bonding directions at all*, when the orbitals we met in [[general-chemistry-1/quantum-atom]] — one spherical 2s and three mutually perpendicular 2p — are neither four in number nor equivalent, and point at $90^\circ$ to one another if anything. Valence bond theory closes the gap. Its idea, worked out first for $\mathrm{H_2}$ by Walter Heitler and Fritz London in 1927, is that a covalent bond is a pair of electrons with paired spins held in the *overlap* of two atomic orbitals; and its great trick, due chiefly to Linus Pauling and John C. Slater in 1931, is that the atom's own orbitals are free to mix into *hybrid* orbitals that point exactly where the bonds point. From two lines of algebra about orbital overlap comes the tetrahedral angle itself — not fitted, but derived.

## The bond as overlap

::: definition Valence bond {#def-valence-bond}
A **valence bond** is formed when two atoms each contribute one electron of **opposite spin** to a shared region of space: each atom's singly occupied orbital overlaps the other's, and the two electrons — paired, as the Pauli principle demands for one spatial orbital — settle into the combined region with their spins antiparallel. The bond is *directional*: the stronger the overlap of the two orbitals, the more electron density sits between the nuclei, the more effectively the two positive cores are screened from each other, and the shorter and stronger the bond. Overlap between two $2p$ orbitals therefore depends on the angle between them — maximum head-on, zero at $90^\circ$ — and this angular dependence is the raw material of molecular geometry.
:::

In Heitler and London's 1927 treatment of $\mathrm{H_2}$, the two-electron wavefunction built from *spatially symmetric, spin-antiparallel* combinations put extra electron density between the nuclei and dipped below the energy of the separated atoms; the antisymmetric-spin partner pushed density out and rose above it. The bond, in their account, is an *exchange* effect: a lowering of energy available only to antiparallel spins, which is exactly why valence saturates — a hydrogen with its one electron paired has no further pairing capacity, and $\mathrm{H_2}$ is the end of the story, not $\mathrm{H_3}$. The numbers are honest: the $\mathrm{H–H}$ bond is $74\ \mathrm{pm}$ long and $436\ \mathrm{kJ\,mol^{-1}}$ strong (standard tabulated data), and the Heitler–London wavefunction, refined, reproduces both.

Now the problem that forces hybridisation. A ground-state carbon is $1s^2 2s^2 2p^2$: the $2s$ pair is closed and inert, and only **two** $2p$ electrons are unpaired — so a carbon reading straight from the aufbau building should form *two* bonds, at $90^\circ$ (the angle between two p orbitals), not four. Methane forms four. Moreover the four $\mathrm{C–H}$ bonds are *equivalent* — one $\mathrm{C–H}$ length, one bond energy of $413\ \mathrm{kJ\,mol^{-1}}$, one angle of $109.47^\circ$ — and $\mathrm{CH_4}$ has no isomers, so no bond is secretly different from any other. Something must remake carbon's orbitals before it bonds.

## Hybrid orbitals

::: definition Hybrid orbitals {#def-hybrid-orbitals}
**Hybrid orbitals** are normalised linear combinations of the valence orbitals ($s$ and $p$) of a *single* atom, chosen to point along the bonding directions of the molecule. Because one $s$ and three $p$ orbitals are available, the standard sets are:
- $\mathbf{sp^3}$: four hybrids, each $\tfrac14$ $s$ and $\tfrac34$ $p$ character, pointing to the corners of a tetrahedron ($109.47^\circ$);
- $\mathbf{sp^2}$: three hybrids ($\tfrac13$ $s$, $\tfrac23$ $p$) in a plane at $120^\circ$, leaving one unhybridised $p$ perpendicular to the plane;
- $\mathbf{sp}$: two hybrids ($\tfrac12$ $s$, $\tfrac12$ $p$) at $180^\circ$, leaving two unhybridised $p$ orbitals mutually perpendicular.
Mixing is bookkeeping, not machinery: the hybrids span the *same four orbitals* as the original set, so no electrons are created or destroyed, and the "cost" of promoting an electron from $2s$ to $2p$ (at most a few hundred $\mathrm{kJ\,mol^{-1}}$) is repaid many times over by the extra bond formed.
:::

Each hybrid is strongly directional: it is the *interference* of a spherical $s$ wave with a two-lobed $p$ wave, adding on one side and cancelling on the other, so one lobe grows fat and the opposite lobe shrinks to a stub — a lobe shaped precisely for head-on overlap with a neighbour.

::: proof The tetrahedral angle from orthogonality {#proof-tetrahedral-angle}
Take four normalised hybrids $\mathrm{h_i} = \tfrac12(\mathrm{s} + \sqrt{3}\,\hat{p}_i)$, where $\mathrm{s}$ is the (normalised) $s$ orbital, and $\hat{p}_i$ is a normalised $p$ orbital pointing along the unit vector $\mathbf{u}_i$. Each hybrid is normalised because $\langle \mathrm{s}|\mathrm{s}\rangle = 1$, $\langle \hat p_i | \hat p_i \rangle = 1$ and $\langle \mathrm{s}|\hat p_i\rangle = 0$:
$$
\langle \mathrm{h_i}|\mathrm{h_i}\rangle = \tfrac14\left(1 + 3\right) = 1 .
$$
Now require two different hybrids to be **orthogonal** — they are orbitals of the same atom, and orbitals of one atom are orthogonal. The $s$–$p$ cross terms vanish again by symmetry, and two $p$ orbitals pointing at angle $\theta$ (with identical radial parts) overlap as $\cos\theta$:
$$
\langle \mathrm{h_i}|\mathrm{h_j}\rangle = \tfrac14\left(\langle \mathrm{s}|\mathrm{s}\rangle + 3\,\langle \hat p_i|\hat p_j\rangle\right) = \tfrac14\left(1 + 3\cos\theta\right) \stackrel{!}{=} 0
\quad\Longrightarrow\quad
\cos\theta = -\tfrac13,
$$
so $\theta = 109.47^\circ$. The tetrahedral angle is *the only angle* at which four equivalent hybrids built from one $s$ and three $p$ orbitals can coexist without overlapping each other. Methane's geometry is a theorem about orthogonality; VSEPR's repulsion argument and this derivation are two routes to the same corner of the table. (The $s$ character of each hybrid is $\left(\tfrac12\right)^2 = \tfrac14$ and the $p$ character $\left(\tfrac{\sqrt3}{2}\right)^2 = \tfrac34$, as claimed — and four hybrids use exactly $4 \times \tfrac14 = 1$ $s$ orbital and $4 \times \tfrac34 = 3$ $p$ orbitals: the orbitals are conserved.)
:::

::: proposition The angle of $\mathrm{sp}^n$ hybrids {#prop-sp-n-angle}
For a set of equivalent hybrids of composition $\mathrm{sp}^n$ — one part $s$, $n$ parts $p$ —
$$
\mathrm{h_i} = \frac{1}{\sqrt{1+n}}\left(\mathrm{s} + \sqrt{n}\,\hat p_i\right)
\qquad\Longrightarrow\qquad
\langle \mathrm{h_i}|\mathrm{h_j}\rangle = \frac{1 + n\cos\theta}{1+n} = 0
\qquad\Longrightarrow\qquad
\cos\theta = -\frac{1}{n},
$$
so the angle between equivalent hybrids is $180^\circ$ for $\mathrm{sp}$ ($n=1$), $120^\circ$ for $\mathrm{sp^2}$ ($n=2$) and $109.47^\circ$ for $\mathrm{sp^3}$ ($n=3$). The $s$ character of each hybrid is $1/(1+n)$: $50\ \%$, $33\ \%$, $25\ \%$ respectively.
:::

One formula, three geometries — and a continuum in between. Real molecules that refuse the ideal angles (water's $104.5^\circ$, formaldehyde's unequal angles) are not exceptions to the picture but evidence for its refinement: hybridisation is not restricted to integer $n$, and an atom can pour *more p character into bonds that need to open wide and more s character into those that sit close* — the content of Bent's rule, met below.

::: algorithm Assigning hybridisation {#alg-hybridisation}
**Input:** a Lewis structure. **Output:** a hybridisation for each central atom.
1. For each atom, count its **steric number**: the number of $\sigma$-bonded neighbours (a double or triple bond counts as *one* neighbour) plus the number of lone pairs.
2. Read off: steric number 4 → $\mathrm{sp^3}$; 3 → $\mathrm{sp^2}$; 2 → $\mathrm{sp}$.
3. Place the lone pairs in hybrid orbitals (they are held closer to the nucleus and lower in energy than bonding hybrids).
4. Any unhybridised $p$ orbitals (one for $\mathrm{sp^2}$, two for $\mathrm{sp}$) are reserved for $\pi$ bonds or left as lone-pair-like $p$ density.
5. Cross-check against VSEPR ([[bonding-structure/vsepr]]): steric number equals electron-domain count, so the two theories must name the same geometry.
:::

## σ and π bonds

::: definition Sigma and pi bonds {#def-sigma-pi}
A **$\sigma$ bond** is formed by overlap *along* the internuclear axis — head-on $s$–$s$, $s$–$p$, $p$–$p$ or hybrid–hybrid overlap — and its electron density is cylindrically symmetric about that axis. A **$\pi$ bond** is formed by *side-on* overlap of two parallel unhybridised $p$ orbitals, with a nodal plane containing the axis. A single bond is one $\sigma$ bond; a double bond is one $\sigma$ plus one $\pi$; a triple bond is one $\sigma$ plus two mutually perpendicular $\pi$ bonds. Because a $\pi$ bond requires parallel $p$ orbitals, twisting about a double bond destroys the overlap — which is why double bonds do not rotate freely at room temperature and give rise to isolable *cis*/*trans* isomers, while single bonds do rotate.
:::

::: example Bonding in methane, end to end {#ex-ch4-bonding}
Describe the valence bond construction of $\mathrm{CH_4}$ and account for four equivalent bonds.
::: solution
Start from carbon's ground state, $2s^2 2p^2$: two unpaired electrons, two bonds expected. Promote one $2s$ electron to the empty $2p$ orbital: $2s^1 2p^3$, four unpaired electrons. The promotion costs energy (the $2s \to 2p$ excitation is a few hundred $\mathrm{kJ\,mol^{-1}}$), but four $\mathrm{C–H}$ bonds instead of two release roughly $2 \times 413\ \mathrm{kJ\,mol^{-1}}$ more — the books balance hugely in favour of four bonds. Now mix the four valence orbitals into four $\mathrm{sp^3}$ hybrids, which by [[#proof-tetrahedral-angle]] must point at $109.47^\circ$; each overlaps head-on with a hydrogen $1s$ orbital to give a $\sigma$ bond. All four bonds are equivalent because all four hybrids are equivalent — same composition, same overlap, same length, same energy — and the molecule is the tetrahedron VSEPR predicted, now with a mechanism under it.
:::
:::

::: example Ammonia and water: lone pairs take hybrids {#ex-nh3-h2o-hybrid}
Assign the bonding in $\mathrm{NH_3}$ and $\mathrm{H_2O}$ and explain why their angles ($107^\circ$, $104.5^\circ$) fall below $109.47^\circ$.
::: solution
Nitrogen: five valence electrons, three $\mathrm{N–H}$ bonds and one lone pair — steric number 4, roughly $\mathrm{sp^3}$: three hybrids overlap hydrogen $1s$ orbitals, the fourth holds the lone pair. Oxygen: two bonds and two lone pairs — steric number 4 again, two hybrids bonding and two holding lone pairs. But the hybrids need not be *equal* ones. A lone pair, felt by one nucleus only, sits lower in energy and grabs extra **s** character (s orbitals penetrate closer to the nucleus and stabilise non-bonding electrons best); the bonds, correspondingly, are made from hybrids with extra **p** character — and pure p orbitals would meet at $90^\circ$, below $109.47^\circ$. Pushing p character into the bonds therefore drags their angles down toward $90^\circ$: one lone pair gives $107^\circ$ in ammonia, two give $104.5^\circ$ in water. This continuous re-weighting of s and p character is Bent's rule — *atomic s character concentrates in orbitals directed toward the more electropositive substituent, and toward lone pairs* — and it is the quantitative soul of the crude VSEPR statement "lone pairs compress".
:::
:::

::: example Ethene and ethyne: the arithmetic of double and triple bonds {#ex-ethene-ethyne}
Describe the bonding in $\mathrm{C_2H_4}$ and $\mathrm{C_2H_2}$, and use bond enthalpies to compare $\sigma$ and $\pi$ overlap.
::: solution
Ethene: each carbon has three neighbours and no lone pairs — steric number 3, $\mathrm{sp^2}$. The six $\mathrm{sp^2}$ hybrids (three per carbon) build the $\sigma$ framework: four $\mathrm{C–H}$ and one $\mathrm{C–C}$ $\sigma$ bond, all in one plane at about $120^\circ$. Each carbon keeps one unhybridised $2p$ orbital perpendicular to that plane; the two are parallel and overlap side-on to give one $\pi$ bond whose density lies above and below the molecular plane. Rotation about the $\mathrm{C=C}$ would have to carry these $p$ orbitals out of parallel, costing roughly the whole $\pi$ bond energy — hence no free rotation. Ethyne: each carbon has two neighbours — $\mathrm{sp}$, linear; the $\sigma$ framework ($2\,\mathrm{C–H} + 1\,\mathrm{C–C}$) uses the sp hybrids, and the two remaining $p$ pairs on each carbon give **two** perpendicular $\pi$ bonds, a cylindrical sleeve of density around the $\mathrm{C–C}$ axis.

Now the data (standard mean bond enthalpies): $\mathrm{C–C}$ $348\ \mathrm{kJ\,mol^{-1}}$ at $154\ \mathrm{pm}$; $\mathrm{C=C}$ $612\ \mathrm{kJ\,mol^{-1}}$ at $134\ \mathrm{pm}$; $\mathrm{C{\equiv}C}$ about $837\ \mathrm{kJ\,mol^{-1}}$ at $120\ \mathrm{pm}$. A double bond is *not* twice a single bond: the $\pi$ contribution is $612 - 348 = 264\ \mathrm{kJ\,mol^{-1}}$, some $24\ \%$ weaker than the $\sigma$ bond it accompanies — side-on overlap is poorer than head-on. The second $\pi$ adds only $837 - 612 = 225\ \mathrm{kJ\,mol^{-1}}$. Weaker, higher, more exposed: the $\pi$ electrons are the reactive ones, which is why alkenes add bromine and alkanes do not.
:::
:::

::: example Two small cases: $\mathrm{BeCl_2}$, $\mathrm{BH_3}$, and the count in $\mathrm{CH_3CN}$ {#ex-becl2-bh3-ch3cn}
Assign hybridisations to (a) gaseous $\mathrm{BeCl_2}$ (linear), (b) the $\mathrm{BH_3}$ unit (trigonal planar), and (c) count all $\sigma$ and $\pi$ bonds in ethanenitrile, $\mathrm{CH_3CN}$.
::: solution
(a) Beryllium has two bonded neighbours and no lone pairs: steric number 2, **sp** — two hybrids at $180^\circ$ overlap chlorine orbitals; the linear molecule is the direct analogue of the $n = 1$ case of [[#prop-sp-n-angle]]. (b) Boron: three neighbours, no lone pairs — **$\mathrm{sp^2}$**, three hybrids at $120^\circ$; the empty $2p$ orbital perpendicular to the plane is what makes $\mathrm{BH_3}$ a Lewis acid, waiting to accept a pair into it. (c) $\mathrm{CH_3CN}$: the methyl carbon has four neighbours → $\mathrm{sp^3}$; the nitrile carbon has two (the methyl carbon and the nitrogen) → $\mathrm{sp}$; the nitrogen has one neighbour plus one lone pair → $\mathrm{sp}$. Counting: $\sigma$ bonds $= 3\,(\mathrm{C–H}) + 1\,(\mathrm{C–C}) + 1\,(\mathrm{C–N}) = 5$; the $\mathrm{C{\equiv}N}$ triple bond contributes $2\,\pi$. Total **5 $\sigma$ + 2 $\pi$**, and the heavy-atom skeleton $\mathrm{C–C{\equiv}N}$ is linear at the nitrile carbon, as sp geometry demands.
:::
:::

::: widget plot
f: exp(-x^2)*(1+a*x)
x: -4, 4
y: -1.5, 2.5
sliders: a=2:-4:4:0.1
labels: \text{hybrid } s + a\,p\text{ along }x
caption: A hybrid orbital as interference. The spherical $s$ orbital is the Gaussian $\exp(-x^2)$ and a $p$ orbital along the $x$-axis is odd in $x$, so their sum behaves like $\exp(-x^2)(1 + ax)$: constructive on one side, destructive on the other. Slide $a$ from $0$ (a pure, perfectly symmetric $s$ orbital) upward and one lobe swells while the opposite shrinks — the hybrid's single fat lobe is not a new kind of orbital but $s$ and $p$ waves added. Negative $a$ flips the hybrid to the other side; the stub never quite vanishes, which is why real hybrids keep a small back lobe.
:::

::: quiz
How many $\sigma$ and $\pi$ bonds does formaldehyde, $\mathrm{CH_2O}$, contain?
- [x] 3 $\sigma$ and 1 $\pi$: two $\mathrm{C–H}$ and one $\mathrm{C–O}$ $\sigma$ bond, plus one $\pi$ bond from the unhybridised carbon $2p$ overlapping the oxygen $2p$.
- [ ] 2 $\sigma$ and 2 $\pi$: the carbon–oxygen double bond supplies both $\pi$ bonds.
- [ ] 3 $\sigma$ and 2 $\pi$: oxygen's lone pairs each form a $\pi$ bond.
- [ ] 4 $\sigma$ and 1 $\pi$: the oxygen contributes a $\sigma$ bond to its own lone pair.
::: solution
The Lewis structure ($\mathrm{H_2C{=}O}$, with two lone pairs on oxygen) gives a $\mathrm{C{=}O}$ double bond: one $\sigma$ plus one $\pi$. Add the two $\mathrm{C–H}$ $\sigma$ bonds: $3\,\sigma + 1\,\pi$. The carbon is $\mathrm{sp^2}$ (three neighbours), its remaining $2p$ makes the single $\pi$ bond with an oxygen $2p$; oxygen's lone pairs are not bonds at all. A double bond is always $\sigma + \pi$, never $\pi + \pi$ — two $\pi$ bonds would need two perpendicular $p$ pairs, as in a triple bond.
:::
:::

::: warning Hybridisation is a model, not an event {#warn-hybridisation-model}
Nothing in a carbon atom "promotes" and "mixes" on its own before bonding — hybridisation is a *mathematical recombination* we perform on the orbitals because it makes the bonded molecule come out right; the isolated atom's $2s$ and $2p$ remain the correct description of the *atom*. The molecule is the judge, and it has spoken twice. First, the photoelectron spectrum of methane shows its eight valence electrons occupying just **two** energy levels (bands near $14$ and $23\ \mathrm{eV}$ with a $3:1$ intensity ratio), not four equivalent ones — the four bonding electrons are *not* all at one energy, so the tetrahedral molecule is not four copies of a tetrahedral atom. Second, hybridisation **rationalises geometry; it does not cause it**: we choose $\mathrm{sp^3}$ because methane is tetrahedral, not the other way round, and when the data demand off-ideal angles (water, formaldehyde) the hybrids simply slide to non-integer $n$. Used as a cause, hybridisation becomes circular; used as a bookkeeping of direction and s-character, it is one of the most efficient ideas in chemistry.
:::

::: history
In 1927 Walter Heitler and Fritz London applied the three-year-old wave mechanics to the hydrogen molecule itself, showing that a bond appears only between antiparallel spins — exchange energy, not a new force, holds the molecule together. The programme passed to Linus Pauling, whose series of papers beginning in 1931 built the directed bond out of orbital mixing and accounted for the tetrahedral carbon, and to John C. Slater, whose 1931 paper "Directed Valence Bonds" gave the general construction of hybrid orbitals and the name. Pauling's 1939 book *The Nature of the Chemical Bond* wove hybridisation, bond order and electronegativity into the subject's central text and set the vocabulary every later generation has argued with. The refinement that angles come from variable s character is due to Henry A. Bent, whose 1961 paper in the Journal of Organic Chemistry stated the rule that still bears his name — a reminder that even a fifty-year-old model was still being sharpened when its author was still writing.
:::

## Where this leads

Valence bond theory localises electrons in bonds, and that is precisely its weakness: molecules that refuse localisation — benzene's equal bonds, ozone's two identical links, and above all $\mathrm{O_2}$, whose paramagnetism a paired-electron picture cannot stomach — demand orbitals spread over the whole molecule. That is molecular orbital theory, [[bonding-structure/molecular-orbitals]], the next chapter and the deeper half of the same quantum mechanics. The formal underpinning — exchange, the Heitler–London wavefunction, the variational principle behind every "the energy drops when orbitals overlap" claim — is developed in [[quantum-chemistry/chemical-bond-qm]]. For the present hour, keep the two models side by side as tools: [[bonding-structure/covalent-lewis]] draws the bonds, VSEPR bends them, and hybridisation explains why they bend that way.

::: summary
- A valence bond is a pair of opposite-spin electrons shared between two overlapping, singly occupied orbitals; bond strength tracks overlap, and exchange energy (Heitler–London, 1927) is the bond's origin.
- Carbon's ground state offers two unpaired electrons but methane has four equivalent bonds: promotion plus hybridisation repays the cost several times over.
- Hybrid orbitals are normalised mixtures of one atom's s and p orbitals: $\mathrm{sp^3}$ (25 % s, $109.47^\circ$), $\mathrm{sp^2}$ (33 % s, $120^\circ$), sp (50 % s, $180^\circ$), with leftover p orbitals reserved for $\pi$ bonds.
- The angle between equivalent $\mathrm{sp}^n$ hybrids follows from orthogonality alone: $\cos\theta = -1/n$; the tetrahedral angle is $\arccos(-1/3)$.
- Steric number ($\sigma$ neighbours + lone pairs) assigns hybridisation: 4 → $\mathrm{sp^3}$, 3 → $\mathrm{sp^2}$, 2 → sp; lone pairs live in hybrids.
- Single = $\sigma$; double = $\sigma + \pi$; triple = $\sigma + 2\pi$; the $\pi$ bond is weaker than the $\sigma$ ($612 - 348 = 264\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{C{=}C}$ vs $\mathrm{C–C}$) and freezes rotation.
- Hybridisation rationalises geometry rather than causing it; photoelectron spectra and Bent's rule (variable s character) keep the model honest.
:::

## Exercises

::: exercise Assign the hybridisations {level=1}
Give the hybridisation of the central atom in each of: (a) $\mathrm{CO_3^{2-}}$; (b) $\mathrm{NH_4^{+}}$; (c) HCN; (d) $\mathrm{SO_2}$.
::: solution
(a) Carbon: three bonded neighbours, no lone pairs — steric number 3, $\mathrm{sp^2}$ (the unhybridised p enters the delocalised $\pi$ system). (b) Nitrogen: four neighbours, no lone pairs — $\mathrm{sp^3}$, tetrahedral. (c) Carbon: two neighbours (H and N), no lone pairs — sp, linear; the nitrogen is sp too (one neighbour + one lone pair). (d) Sulfur: two bonded neighbours and one lone pair — steric number 3, $\mathrm{sp^2}$, bent, with the leftover p forming the $\pi$ bond of the $\mathrm{S{=}O}$ link.
:::
:::

::: exercise Count sigma and pi {level=1 check="9"}
How many $\sigma$ bonds are in 1,3-butadiene, $\mathrm{CH_2{=}CH{-}CH{=}CH_2}$? (Enter the number.)
::: solution
Six $\mathrm{C–H}$ bonds and three $\mathrm{C–C}$ $\sigma$ bonds: $6 + 3 = \boxed{9}$ $\sigma$ bonds, plus two $\pi$ bonds (one per double bond). Every single, double or triple connection contributes exactly one $\sigma$ bond; only the extra links contribute $\pi$.
:::
:::

::: exercise The angle from $\cos\theta = -1/n$ {level=1 check="120"}
Solve $\cos\theta = -1/n$ for the $\mathrm{sp^2}$ case ($n = 2$). (Enter the angle in degrees.)
::: solution
$\cos\theta = -\tfrac12$ gives $\theta = \boxed{120^\circ}$ — the angle between equivalent $\mathrm{sp^2}$ hybrids, obtained from orthogonality exactly as in [[#proof-tetrahedral-angle]] with $n = 2$ in place of $3$.
:::
:::

::: exercise Why water is not methane-shaped {level=2}
Both $\mathrm{H_2O}$ and $\mathrm{NH_4^{+}}$ have steric number 4 on the central atom, yet $\mathrm{NH_4^{+}}$ has exactly $109.47^\circ$ angles and water has $104.5^\circ$. Explain in terms of hybrid composition, and state Bent's rule.
::: solution
$\mathrm{NH_4^{+}}$ has four *equivalent* bonding pairs and no lone pairs, so the four hybrids are equivalent and [[#proof-tetrahedral-angle]] forces exactly $\arccos(-1/3)$. Water has two bonds and two lone pairs: the lone pairs, stabilised by penetration near the nucleus, take hybrids of higher s character, and the bonding hybrids are correspondingly richer in p character. Since pure p orbitals meet at $90^\circ$, p-rich bonds open at less than $109.47^\circ$ — two p-rich bonds give $104.5^\circ$. Bent's rule: an atom directs hybrid orbitals with more s character toward electropositive substituents (and lone pairs behave as the most electropositive "substituent" of all), and more p character toward electronegative ones or where smaller angles are wanted.
:::
:::

::: exercise A double bond is not two single bonds {level=2}
Using the mean bond enthalpies $\mathrm{C–C}$ $348$, $\mathrm{C{=}C}$ $612$, $\mathrm{C{\equiv}C}$ $837\ \mathrm{kJ\,mol^{-1}}$ and lengths $154$, $134$, $120\ \mathrm{pm}$, extract the $\pi$-bond contributions and explain (a) why they are smaller than the $\sigma$ value, (b) why each successive $\pi$ is weaker still, and (c) what the numbers predict about the addition chemistry of alkenes versus alkanes.
::: solution
(a) $\pi(\text{first}) = 612 - 348 = 264\ \mathrm{kJ\,mol^{-1}}$: side-on p–p overlap reaches across a node and shares density *above and below* the axis rather than between the nuclei, so it is intrinsically poorer than head-on overlap — about $24\ \%$ weaker than the $\sigma$ bond. (b) $\pi(\text{second}) = 837 - 612 = 225\ \mathrm{kJ\,mol^{-1}}$: the shorter, tighter $\mathrm{C{\equiv}C}$ core pulls the remaining p orbitals in and the second $\pi$ sleeve crowds the first, so it is weaker again. (c) Reactions that convert $\pi$ into $\sigma$ are exothermic: adding $\mathrm{Br_2}$ or HBr across $\mathrm{C{=}C}$ trades a weak $\pi$ ($264\ \mathrm{kJ\,mol^{-1}}$) for two new $\sigma$ bonds and is favourable, whereas an alkane has only $\sigma$ bonds to break and adds nothing. The bond-energy arithmetic is the reactivity table.
:::
:::

::: exercise Count again, carefully {level=2 check="7"}
How many $\sigma$ bonds are in acetic acid, $\mathrm{CH_3COOH}$? (Enter the number.)
::: solution
Bonds: three $\mathrm{C–H}$, one $\mathrm{C–C}$, one $\mathrm{C{=}O}$ (one $\sigma$), one $\mathrm{C–O}$, one $\mathrm{O–H}$: $3 + 1 + 1 + 1 + 1 = \boxed{7}$ $\sigma$ bonds, and one $\pi$ bond (in the carbonyl). The lone pairs on oxygen are not bonds; the double bond contributes one of each kind.
:::
:::

::: exercise Derive the general angle {level=3}
Derive $\cos\theta = -1/n$ from scratch: normalise $\mathrm{h_i} = \frac{1}{\sqrt{1+n}}(\mathrm{s} + \sqrt{n}\,\hat p_i)$, impose orthogonality of two hybrids, and recover all three textbook angles. Then show that the s characters of the hybrids sum to exactly one s orbital.
::: solution
Normalisation: $\langle \mathrm{h_i}|\mathrm{h_i}\rangle = \frac{1}{1+n}\left(\langle s|s\rangle + n\langle \hat p_i|\hat p_i\rangle + 2\sqrt n\langle s|\hat p_i\rangle\right) = \frac{1+n}{1+n} = 1$, using $\langle s|\hat p_i\rangle = 0$ (opposite parity). Orthogonality for $i \neq j$: $\langle \mathrm{h_i}|\mathrm{h_j}\rangle = \frac{1}{1+n}\left(1 + n\,\hat{\mathbf{u}}_i\!\cdot\!\hat{\mathbf{u}}_j\right) = \frac{1 + n\cos\theta}{1+n} = 0$, hence $\cos\theta = -1/n$. Then $n=1$: $\cos\theta = -1$, $\theta = 180^\circ$ (sp); $n=2$: $-1/2$, $120^\circ$ ($\mathrm{sp^2}$); $n=3$: $-1/3$, $109.47^\circ$ ($\mathrm{sp^3}$). Conservation: a set of equivalent $\mathrm{sp}^n$ hybrids has $1/(1+n)$ s character per hybrid, and the number of hybrids built from one s orbital is $1+n$ — for $\mathrm{sp^3}$, four hybrids $\times\ \tfrac14 = 1$ s orbital and $4 \times \tfrac34 = 3$ p orbitals; for $\mathrm{sp^2}$, $3 \times \tfrac13 = 1$ s and $3 \times \tfrac23 = 2$ p, leaving one p unhybridised. The construction never invents orbitals and never loses them — which is exactly why the angles are forced.
:::
:::

::: exercise Allene, analysed {level=3}
Allene is $\mathrm{H_2C{=}C{=}CH_2}$. Assign a hybridisation to each carbon, count the $\sigma$ and $\pi$ bonds, and — the hard part — show that the two $\pi$ bonds force the two $\mathrm{CH_2}$ groups to lie in *perpendicular* planes.
::: solution
Terminal carbons: three neighbours each → $\mathrm{sp^2}$, with one unhybridised p each. Central carbon: two neighbours → sp, linear, with **two** unhybridised p orbitals, mutually perpendicular. The central carbon must make one $\pi$ bond to each terminal carbon, using its two p orbitals — and a $\pi$ bond forms only between *parallel* p orbitals. So the left terminal's p must be parallel to one of the central p's (say vertical), and the right terminal's p to the other (horizontal). The two $\pi$ systems are therefore perpendicular by construction, and each $\mathrm{CH_2}$ plane, being perpendicular to its own p orbital, stands perpendicular to the other: allene is not planar, and its two ends are rotated $90^\circ$ about the $\mathrm{C{=}C{=}C}$ axis. Counting: $\sigma = 4\,(\mathrm{C–H}) + 2\,(\mathrm{C–C}) = 6$; $\pi = 2$. (Consequence worth noticing: a suitably substituted allene is chiral despite having no stereocentre — the perpendicular planes make its two halves non-superposable mirror images, a prediction of hybridisation geometry confirmed long after the model was invented.)
:::
:::
