How do we know that sodium chloride contains no NaCl molecules, that the Ti–O bonds in rutile are $1.95\ \text{Å}$ long, or that a new battery cathode has the spinel structure? Almost always the answer is X-ray diffraction. A beam of X-rays with a wavelength comparable to interatomic distances is scattered by the electrons of a crystal; because the crystal is periodic, the scattered waves cancel in almost every direction and reinforce in a few, producing a pattern of sharp reflections. The *positions* of the reflections give the size and shape of the unit cell; their *intensities* give the arrangement of atoms within it; and their *widths* report on the size and strain of the crystallites. More than a million crystal structures have been determined this way, and powder diffraction is the routine identity test for every solid made in a materials laboratory.

The chapter [[bonding-structure/solid-structures]] derived Bragg's law from reflection by planes. Here we derive the same condition from the scattering of waves by a lattice, which leads to the reciprocal lattice and the Ewald construction. We then calculate the intensities through the **structure factor**, show how centred lattices and other symmetry elements produce **systematic absences**, index powder patterns, estimate crystallite sizes from line widths, and outline how a single-crystal structure is solved and refined. Throughout, the notation for cells and Miller indices is that of [[materials-chemistry/crystal-structures]].

## Producing and scattering X-rays

Laboratory X-rays come from a sealed tube or rotating anode in which electrons accelerated through $30$–$50\ \mathrm{kV}$ strike a metal target. Besides a continuous bremsstrahlung background, the target emits sharp characteristic lines when an electron from an upper shell fills a vacancy in the $K$ shell: for copper the $K\alpha_1$ line has $\lambda = 1.5406\ \text{Å}$ (energy $8.05\ \mathrm{keV}$), and for molybdenum $0.7107\ \text{Å}$. A filter or monochromator removes most of the $K\beta$ line and the continuum. Synchrotrons provide beams that are millions of times brighter and tunable in wavelength.

X-rays are scattered by electrons. An isolated atom scatters with an amplitude described by its **atomic scattering factor** (form factor) $f$, the Fourier transform of its electron density: in the forward direction $f$ equals the number of electrons, $Z$ for a neutral atom, and it falls with increasing scattering angle because the electron cloud has a finite size and waves from its different parts get out of phase. Tabulated values of $f$ as a function of $\sin\theta/\lambda$ are in the *International Tables for Crystallography*, Volume C. Two consequences follow at once: heavy atoms dominate X-ray patterns, and hydrogen, with one electron, is nearly invisible.

::: warning Bragg "reflection" is interference, not mirror reflection {#warn-reflection}
It is tempting to think of lattice planes as semi-transparent mirrors that reflect X-rays at any angle, with Bragg's law then selecting the angles at which reflections add up. In fact there is nothing on a "plane" to reflect: the planes are mathematical constructions through lattice points, and the scattering comes from electrons wherever they are. A plane of the family $(hkl)$ may contain no atoms at all. What Bragg's law describes is the condition under which the waves scattered by *all* the electrons in successive unit cells are in phase; the intensity then depends on how the electrons are arranged within one cell, which is the subject of the structure factor. Treat the planes as bookkeeping for the phase differences, not as physical reflectors.
:::

## The diffraction condition

Let the incident wave have wavevector $\mathbf{k}$ and the scattered wave $\mathbf{k}'$, with $\lvert\mathbf{k}\rvert = \lvert\mathbf{k}'\rvert = 1/\lambda$ for elastic scattering (crystallographers include no factor $2\pi$). The **scattering vector** is $\mathbf{q} = \mathbf{k}' - \mathbf{k}$. A scatterer at position $\mathbf{r}$ contributes a wave whose phase, relative to one at the origin, is $2\pi\,\mathbf{q}\cdot\mathbf{r}$.

::: proposition The Laue condition and Bragg's law {#prop-laue}
A crystal with lattice vectors $\mathbf{a}, \mathbf{b}, \mathbf{c}$ diffracts strongly only when the scattering vector equals a reciprocal lattice vector,
$$
\mathbf{q} = \mathbf{G}_{hkl} = h\mathbf{a}^* + k\mathbf{b}^* + l\mathbf{c}^*, \qquad h, k, l \text{ integers},
$$ {#eq-laue}
where $\mathbf{a}^*\cdot\mathbf{a} = 1$, $\mathbf{a}^*\cdot\mathbf{b} = \mathbf{a}^*\cdot\mathbf{c} = 0$ and cyclically. Since $\lvert\mathbf{G}_{hkl}\rvert = 1/d_{hkl}$, this is equivalent to **Bragg's law**
$$
\lambda = 2d_{hkl}\sin\theta,
$$ {#eq-bragg}
where $2\theta$ is the angle between incident and diffracted beams. The derivation assumes elastic, single scattering (the kinematic approximation), which holds for X-rays in all but large, perfect crystals.
:::

::: proof
The amplitude scattered by the whole crystal is a sum over unit cells at lattice points $\mathbf{R} = n_1\mathbf{a} + n_2\mathbf{b} + n_3\mathbf{c}$, each contributing the same amplitude multiplied by the phase factor $e^{2\pi i\mathbf{q}\cdot\mathbf{R}}$. For a crystal of $N_1 \times N_2 \times N_3$ cells the sum over $n_1$ is a geometric series,
$$
\sum_{n_1=0}^{N_1-1} e^{2\pi i n_1\mathbf{q}\cdot\mathbf{a}}, \qquad \text{with modulus squared} \qquad \frac{\sin^2(\pi N_1\,\mathbf{q}\cdot\mathbf{a})}{\sin^2(\pi\,\mathbf{q}\cdot\mathbf{a})}.
$$
For large $N_1$ this is negligible unless $\mathbf{q}\cdot\mathbf{a}$ is an integer $h$, where it reaches $N_1^2$. The same holds for $\mathbf{b}$ and $\mathbf{c}$, so strong scattering requires $\mathbf{q}\cdot\mathbf{a} = h$, $\mathbf{q}\cdot\mathbf{b} = k$, $\mathbf{q}\cdot\mathbf{c} = l$ (the three **Laue equations**). By the definition of the reciprocal basis, the vector $h\mathbf{a}^* + k\mathbf{b}^* + l\mathbf{c}^*$ satisfies exactly these three equations, and it is the only vector that does, which proves [[#eq-laue]].

The vector $\mathbf{G}_{hkl}$ is perpendicular to the $(hkl)$ planes with length $1/d_{hkl}$ (as in the proof of [[materials-chemistry/crystal-structures#prop-dspacing]]). For elastic scattering, $\mathbf{k}$ and $\mathbf{k}'$ have the same length $1/\lambda$ and make angle $2\theta$, so the triangle they form with $\mathbf{q}$ is isosceles and $\lvert\mathbf{q}\rvert = 2(1/\lambda)\sin\theta$. Setting $\lvert\mathbf{q}\rvert = 1/d_{hkl}$ gives $\lambda = 2d_{hkl}\sin\theta$.
:::

The proof shows more than the condition: it shows how sharp the reflections are. The interference function $\sin^2(\pi N x)/\sin^2(\pi x)$ has principal maxima of height $N^2$ and width about $1/N$, so a crystal a thousand cells across gives reflections a thousandth of the spacing between them in width. Small crystals give broad lines, which is the basis of the Scherrer equation below.

::: widget plot
f: sin(n*pi*x)^2/(n^2*sin(pi*x)^2)
x: -1.37, 1.63
y: 0, 1.1
sliders: n=5:1:40:1
labels: \sin^2(\pi Nx)/N^2\sin^2(\pi x)
caption: The interference function from the proof of [[#prop-laue]], divided by $N^2$ so that the principal maxima have height 1, against $x = \mathbf{q}\cdot\mathbf{a}$ for a row of $N$ unit cells (slider). The principal maxima at integer $x$ are the Bragg reflections; between them lie $N - 2$ weak subsidiary maxima. As $N$ grows the peaks narrow as $1/N$ and the subsidiary ripples fade: for the $10^4$–$10^6$ cells across a typical crystal they are far too fine to see, but for nanocrystals of a few tens of cells the broadening is easily measured.
:::

**The Ewald construction** turns [[#eq-laue]] into a picture. Draw the reciprocal lattice, and a sphere of radius $1/\lambda$ through its origin, centred at the point $-\mathbf{k}$ from the origin. A reflection $hkl$ occurs whenever a reciprocal lattice point lies on the sphere. For a stationary single crystal and monochromatic X-rays this is rarely satisfied, so single-crystal diffractometers rotate the crystal to sweep reciprocal lattice points through the sphere. In a powder, the crystallites take all orientations, each $\mathbf{G}_{hkl}$ is smeared over a sphere of radius $1/d_{hkl}$, and its intersection with the Ewald sphere is a circle: the diffracted beams form cones of half-angle $2\theta$, recorded as rings on an area detector or as peaks along a scan of $2\theta$. Because $\sin\theta \le 1$, only reflections with $d_{hkl} \ge \lambda/2$ can ever be observed; this **resolution limit** is $0.77\ \text{Å}$ for Cu $K\alpha$ and $0.36\ \text{Å}$ for Mo $K\alpha$, which is why molybdenum radiation is preferred for precise single-crystal work.

## Intensities and the structure factor

The Laue condition says *where* reflections can occur; how strong each one is depends on the contents of the unit cell.

::: definition Structure factor {#def-structure-factor}
For a unit cell containing atoms $j$ with scattering factors $f_j$ at fractional coordinates $(x_j, y_j, z_j)$, the **structure factor** of reflection $hkl$ is
$$
F_{hkl} = \sum_{j} f_j \exp\!\big[2\pi i(hx_j + ky_j + lz_j)\big].
$$ {#eq-structure-factor}
It is a complex number with modulus $\lvert F_{hkl}\rvert$ and phase $\phi_{hkl}$. The measured intensity is
$$
I_{hkl} \propto \lvert F_{hkl}\rvert^2 \times (\text{multiplicity}) \times (\text{Lorentz–polarisation}) \times (\text{absorption, thermal and other factors}).
$$
:::

The structure factor follows directly from the proof of [[#prop-laue]]: at a reciprocal lattice point, every unit cell scatters with the same amplitude, and that amplitude is the sum of the waves from the atoms in one cell with phases $2\pi\mathbf{G}_{hkl}\cdot\mathbf{r}_j = 2\pi(hx_j + ky_j + lz_j)$. Thermal vibration smears each atom and multiplies its $f_j$ by a **Debye–Waller factor** $\exp(-B_j\sin^2\theta/\lambda^2)$, with $B_j$ typically $0.3$–$2\ \text{Å}^2$. In a powder pattern the **multiplicity** counts the symmetry-equivalent reflections that superimpose at the same $2\theta$ (6 for cubic $\{100\}$, 12 for $\{110\}$, 8 for $\{111\}$), and the **Lorentz–polarisation factor** $(1 + \cos^22\theta)/(\sin^2\theta\cos\theta)$ accounts for the geometry of the measurement and the partial polarisation of the scattered beam.

Since $F_{\bar h\bar k\bar l}$ is the complex conjugate of $F_{hkl}$ when the $f_j$ are real, $\lvert F_{hkl}\rvert = \lvert F_{\bar h\bar k\bar l}\rvert$ (**Friedel's law**): the diffraction pattern appears centrosymmetric even when the crystal is not. Small departures caused by anomalous scattering near an absorption edge are used to determine the absolute configuration of chiral molecules.

::: proposition Systematic absences from lattice centring {#prop-absences}
For a lattice with centring, $F_{hkl} = 0$ for whole classes of reflections, whatever the atoms in the basis:
- body-centred (I): reflections with $h + k + l$ odd are absent;
- face-centred (F): reflections with $h, k, l$ of mixed parity (not all odd and not all even) are absent;
- C-centred: reflections with $h + k$ odd are absent.

A primitive lattice has no such conditions. Screw axes and glide planes cause further absences in particular zones (for example a $2_1$ screw axis along $b$ removes $0k0$ with $k$ odd), and the complete set of absences narrows the space group to one or a few candidates.
:::

::: proof
In an I-centred cell every atom at $(x, y, z)$ has a copy at $(x + \tfrac12, y + \tfrac12, z + \tfrac12)$. Grouping the sum [[#eq-structure-factor]] into these pairs,
$$
F_{hkl} = \sum_{j \in \text{half}} f_j e^{2\pi i(hx_j + ky_j + lz_j)}\left[1 + e^{\pi i(h + k + l)}\right],
$$
and the bracket is $1 + (-1)^{h+k+l}$, which is 0 when $h + k + l$ is odd and 2 when it is even. For an F-centred cell each atom has copies displaced by $(0, \tfrac12, \tfrac12)$, $(\tfrac12, 0, \tfrac12)$ and $(\tfrac12, \tfrac12, 0)$, and the bracket becomes
$$
1 + (-1)^{k+l} + (-1)^{h+l} + (-1)^{h+k}.
$$
If $h, k, l$ are all even or all odd, each pairwise sum is even and the bracket is 4. If the parities are mixed, say two even and one odd, exactly one of the three pairwise sums is even and two are odd, and the bracket is $1 + 1 - 1 - 1 = 0$; the same holds for two odd and one even. For C-centring the bracket is $1 + (-1)^{h+k}$.
:::

For a cubic crystal $1/d^2 = N/a^2$ with $N = h^2 + k^2 + l^2$, so the allowed values of $N$ identify the lattice. Primitive cubic allows every integer except those of the form $4^m(8n + 7)$ (7, 15, 23, 28 …, which are not sums of three squares). Body-centred allows only even $N$: 2, 4, 6, 8, 10, 12, 14 …. Face-centred allows 3, 4, 8, 11, 12, 16, 19, 20, 24, 27 …, the characteristic "pair, single, pair, single" pattern.

::: example Structure factors of rock salt, KCl and silicon {#ex-structure-factors}
(a) Rock salt has $\mathrm{Na^+}$ at $(0, 0, 0)$ and $\mathrm{Cl^-}$ at $(\tfrac12, 0, 0)$ in an F-centred cubic cell. Find $F_{hkl}$ for the allowed reflections. (b) Explain why the 111 reflection of KCl, which has the same structure, is almost absent, so that KCl was first thought to be simple cubic. (c) Silicon (diamond structure) has atoms at $(0, 0, 0)$ and $(\tfrac14, \tfrac14, \tfrac14)$ in an F-centred cell. Show that the 200 reflection is absent although the F-centring allows it.
::: solution
(a) Factor out the F-centring, which contributes 4 for unmixed indices and 0 otherwise. The basis gives $f_\mathrm{Na} + f_\mathrm{Cl}e^{\pi ih}$. For allowed reflections $h, k, l$ are all even or all odd, so
$$
F_{hkl} = \begin{cases} 4(f_\mathrm{Na} + f_\mathrm{Cl}) & h, k, l \text{ all even (200, 220, 222, …)}, \\ 4(f_\mathrm{Na} - f_\mathrm{Cl}) & h, k, l \text{ all odd (111, 311, 331, …)}. \end{cases}
$$
The all-even reflections are strong and the all-odd ones weak.

(b) $\mathrm{K^+}$ and $\mathrm{Cl^-}$ both have 18 electrons, so $f_\mathrm{K^+} \approx f_\mathrm{Cl^-}$ at all angles and the odd reflections almost vanish. The observed lines then have $N = 4, 8, 12, 16 \dots$, exactly the pattern of a primitive cubic cell of edge $a/2$ with one "average" atom per cell. W. L. Bragg's correct interpretation of KCl and NaCl in 1913, as an F-centred arrangement of two kinds of ion, was the first demonstration that ionic crystals contain no molecules.

(c) The F-centring factor is 4 for 200. The basis factor is $f_\mathrm{Si}\left[1 + e^{2\pi i(h + k + l)/4}\right] = f_\mathrm{Si}\left[1 + e^{\pi i(h+k+l)/2}\right]$. For 200, $h + k + l = 2$ and $e^{\pi i} = -1$, so $F_{200} = 0$. In general the diamond structure also removes all-even reflections with $h + k + l = 4n + 2$ (200, 222, 420 …). (The 222 reflection of silicon is in fact very weakly observed, because the bonding electrons are not spherically distributed about the atoms: a small but direct glimpse of the covalent bond.)
:::
:::

::: quiz
A cubic metal gives powder lines whose $\sin^2\theta$ values are in the ratio $2 : 4 : 6 : 8 : 10 : 12 : 14$. Which lattice is it?
- [ ] primitive cubic
- [x] body-centred cubic
- [ ] face-centred cubic
- [ ] cannot be decided without intensities
::: solution
$\sin^2\theta = (\lambda^2/4a^2)N$, so the ratios are those of the allowed $N$. Dividing by 2 gives $1 : 2 : 3 : 4 : 5 : 6 : 7$. A primitive cubic lattice cannot give a line with $N = 7$, so if the lines were primitive the seventh ratio would be 8, not 7. The sequence $2, 4, 6, \dots, 14$ (with $N = 14$ from 321) is the body-centred pattern. Face-centred would give $3 : 4 : 8 : 11 \dots$. With only the first six lines, primitive and body-centred cubic would be indistinguishable from positions alone.
:::
:::

## Powder diffraction

A powder diffractometer records intensity against $2\theta$ from a flat or capillary sample of finely ground crystallites. The pattern is a fingerprint: compared with the more than a million entries of the Powder Diffraction File (maintained by the International Centre for Diffraction Data) or with patterns calculated from crystal structure databases, it identifies the phases present, often in minutes. Beyond identification, a powder pattern gives lattice parameters (to a few parts in $10^5$ with an internal standard), quantitative phase fractions, crystallite size and strain, and, by Rietveld refinement, complete structures.

::: algorithm Indexing the powder pattern of a cubic substance {#alg-indexing}
1. Convert each peak position to $\sin^2\theta$ (with $\theta$ half the measured $2\theta$).
2. Divide every $\sin^2\theta$ by the first one, then multiply the ratios by 2 and by 3 in turn, and look for the multiplier that makes all ratios close to integers. The integers are the $N = h^2 + k^2 + l^2$ values, up to a common factor.
3. Identify the lattice from the sequence of $N$: all integers except 7, 15 … (P); even only (I); 3, 4, 8, 11, 12 … (F).
4. Assign $hkl$ to each $N$ and compute $a = \lambda\sqrt{N}/(2\sin\theta)$ for each line; average, giving most weight to high-angle lines, where an error in $2\theta$ causes the smallest error in $d$.
5. Check: the density $\rho = ZM/N_\mathrm{A}a^3$ must agree with the measured one for a sensible $Z$. If no multiplier gives integers, the substance is not cubic; tetragonal and hexagonal patterns are indexed by trial with [[materials-chemistry/crystal-structures#eq-dspacing]] or by computer programs.
:::

::: example Indexing an unknown metal {#ex-indexing}
A metal powder gives peaks (Cu $K\alpha_1$, $\lambda = 1.5406\ \text{Å}$) at $2\theta = 38.47^\circ$, $44.72^\circ$, $65.10^\circ$, $78.23^\circ$ and $82.44^\circ$ (values calculated for this example). Index the pattern, find the lattice type and $a$, and suggest the metal given that its density is $2.70\ \mathrm{g\,cm^{-3}}$.
::: solution
Step 1:
| $2\theta$ | $\sin^2\theta$ | ratio to first | ratio $\times 3$ | $hkl$ |
|---|---|---|---|---|
| $38.47^\circ$ | $0.10855$ | $1.000$ | $3.00$ | 111 |
| $44.72^\circ$ | $0.14474$ | $1.333$ | $4.00$ | 200 |
| $65.10^\circ$ | $0.28947$ | $2.667$ | $8.00$ | 220 |
| $78.23^\circ$ | $0.39802$ | $3.667$ | $11.00$ | 311 |
| $82.44^\circ$ | $0.43421$ | $4.000$ | $12.00$ | 222 |

Multiplying by 2 gives $2, 2.67, \dots$ (not integers); by 3 gives integers $3, 4, 8, 11, 12$: face-centred cubic. From the 222 line, $a = \lambda\sqrt{12}/(2\sqrt{0.43421}) = 1.5406 \times 3.4641/(2 \times 0.65895) = 4.0496\ \text{Å}$; the other lines agree to within $0.0002\ \text{Å}$. For an fcc metal $Z = 4$, so $M = \rho N_\mathrm{A}a^3/Z = 2.70 \times 6.022\times10^{23} \times (4.0496\times10^{-8})^3/4 = 27.0\ \mathrm{g\,mol^{-1}}$: aluminium.
:::
:::

### Line widths and crystallite size

Real powder peaks have a width set by the instrument (beam divergence, wavelength spread, sample geometry) plus contributions from the sample: small crystallites and microstrain.

::: proposition The Scherrer equation {#prop-scherrer}
Crystallites of mean thickness $\tau$ perpendicular to the diffracting planes broaden a reflection at Bragg angle $\theta$ by
$$
\beta = \frac{K\lambda}{\tau\cos\theta},
$$ {#eq-scherrer}
where $\beta$ is the full width at half maximum in radians of $2\theta$, after subtracting the instrumental width, and $K \approx 0.9$ is a shape factor (between about 0.8 and 1.1 depending on crystallite shape and the definition of width). The equation is reliable for crystallites smaller than about $100\ \mathrm{nm}$; it ignores strain broadening, which grows as $\tan\theta$ and must be separated (for example with a Williamson–Hall plot of $\beta\cos\theta$ against $\sin\theta$).
:::

::: proof
Consider a crystallite of $m$ planes, thickness $\tau = md$. At the exact Bragg angle, waves from successive planes differ in path by $\lambda$ and all add. At $\theta + \varepsilon$ the path difference between adjacent planes is $2d\sin(\theta + \varepsilon) \approx \lambda + 2d\varepsilon\cos\theta$, so the path difference between the top and bottom planes differs from an integer number of wavelengths by $2m d\varepsilon\cos\theta = 2\tau\varepsilon\cos\theta$. When this extra path is one wavelength, the waves from the crystallite pair off top-half against bottom-half with phase differences of $\pi$ and cancel; this is the first zero of the interference function of [[#prop-laue]], at $\varepsilon_0 = \lambda/(2\tau\cos\theta)$. The peak, as a function of $2\theta$, therefore runs from $2(\theta - \varepsilon_0)$ to $2(\theta + \varepsilon_0)$: total width $4\varepsilon_0 = 2\lambda/(\tau\cos\theta)$ between zeros, and roughly half that at half maximum. A careful treatment of the $\sin^2(Nx)/\sin^2x$ profile, averaged over crystallite shapes, gives $\beta = K\lambda/(\tau\cos\theta)$ with $K \approx 0.9$.
:::

::: example The size of gold nanoparticles {#ex-scherrer}
Gold nanoparticles give a 111 peak at $2\theta = 38.2^\circ$ with full width at half maximum $0.45^\circ$ (Cu $K\alpha_1$). The instrumental width, measured on a coarse-grained standard, is $0.05^\circ$; for these peak shapes subtract it linearly. Estimate the crystallite size.
::: solution
Sample broadening: $\beta = 0.45^\circ - 0.05^\circ = 0.40^\circ = 0.40 \times \pi/180 = 6.98\times10^{-3}\ \mathrm{rad}$. With $\theta = 19.1^\circ$ and $\cos\theta = 0.945$,
$$
\tau = \frac{K\lambda}{\beta\cos\theta} = \frac{0.9 \times 1.5406\ \text{Å}}{6.98\times10^{-3} \times 0.945} = 210\ \text{Å} = 21\ \mathrm{nm}.
$$
Given the uncertainty in $K$ (about 10 %) and in the broadening correction, quote "about 20 nm". This is the size of the coherently diffracting domains; a particle seen as $30\ \mathrm{nm}$ in an electron micrograph may consist of several twinned domains, so Scherrer sizes are often smaller than microscope sizes ([[materials-chemistry/nanomaterials]]).
:::
:::

::: warning Do not over-interpret peak widths {#warn-scherrer}
The Scherrer equation is often applied to peaks that are barely broader than the instrumental resolution, giving "crystallite sizes" of several hundred nanometres that are really noise. Once the sample broadening is less than about a quarter of the instrumental width, the result is meaningless. Strain, stacking faults and compositional variation also broaden peaks, and in different ways for different $hkl$; a single-peak Scherrer estimate assumes all broadening comes from size. For reliable work, measure the instrumental profile, use several reflections and separate size from strain.
:::

## From intensities to a structure

The structure factor is the Fourier transform of the electron density of one unit cell. Inverting the transform gives the density:

::: definition Electron density and the phase problem {#def-density}
The electron density at fractional position $(x, y, z)$ is the Fourier series
$$
\rho(x, y, z) = \frac{1}{V}\sum_{hkl} F_{hkl}\exp\!\big[-2\pi i(hx + ky + lz)\big] = \frac{1}{V}\sum_{hkl}\lvert F_{hkl}\rvert\cos\!\big[2\pi(hx + ky + lz) - \phi_{hkl}\big].
$$ {#eq-density}
An experiment measures intensities, hence $\lvert F_{hkl}\rvert$, but not the phases $\phi_{hkl}$. Recovering the phases is the **phase problem** of crystallography.
:::

The second form of [[#eq-density]] uses Friedel's law to pair $hkl$ with $\bar h\bar k\bar l$. Each reflection contributes a cosine density wave running perpendicular to its planes with wavelength $d_{hkl}$; the atoms appear where the waves add constructively. Reflections out to $d_\mathrm{min}$ resolve features about $d_\mathrm{min}$ apart, which is why resolution is quoted in ångström.

::: widget fourier
wave: pulse
terms: 6
max: 40
spectrum: true
caption: A one-dimensional analogue of [[#eq-density]]: a narrow peak of density (an "atom") rebuilt from its Fourier components, each playing the role of a reflection of increasing order $h$. With few terms (low resolution, small $\sin\theta/\lambda$) the atom is a broad smear with ripples; adding high-order terms sharpens it. The spectrum shows the amplitudes, which a diffraction experiment measures. What the experiment does *not* give is the sign (phase) of each term: change a few signs and the same amplitudes rebuild a quite different density.
:::

Three routes lead from the measured $\lvert F\rvert$ to phases. **Patterson methods** use the Fourier series of $\lvert F_{hkl}\rvert^2$, which needs no phases; its peaks lie at the vectors *between* atoms, and in a structure with a few heavy atoms these dominate, giving the heavy-atom positions and hence approximate phases. **Direct methods**, developed by Herbert Hauptman and Jerome Karle (Nobel Prize 1985), use statistical relations between the phases of strong reflections that follow from the facts that electron density is positive and concentrated in atoms; together with **dual-space** and charge-flipping algorithms they solve most small-molecule and inorganic structures automatically. For proteins, phases come from heavy-atom derivatives, anomalous scattering or a related known structure.

The initial model is then improved by **least-squares refinement** of atomic coordinates, displacement parameters and occupancies to minimise the difference between observed and calculated $\lvert F\rvert$. The agreement is summarised by the residual
$$
R_1 = \frac{\sum\big\lvert\lvert F_\mathrm{o}\rvert - \lvert F_\mathrm{c}\rvert\big\rvert}{\sum\lvert F_\mathrm{o}\rvert},
$$
typically $0.02$–$0.05$ for a good small-molecule structure. For powders, where reflections overlap, Hugo Rietveld's method (1969) refines the structure against the whole profile point by point, and the fit is judged by weighted profile residuals and a difference curve. A low $R$ is necessary but not sufficient: a structure must also make chemical sense, which is where the bond valence sums of [[materials-chemistry/crystal-structures#def-bond-valence]] and the checks of crystallographic validation software come in.

::: example Locating two atoms by Patterson {#ex-patterson}
A one-dimensional "crystal" with cell length $10.0\ \text{Å}$ contains a heavy atom at $x = 0.10$ and another at $x = 0.35$. Where are the peaks of the Patterson function $P(u) = \sum_h \lvert F_h\rvert^2\cos(2\pi hu)$, and what information do they lose?
::: solution
$\lvert F_h\rvert^2 = F_hF_h^* = \sum_j\sum_k f_jf_k e^{2\pi ih(x_j - x_k)}$, so $P(u)$ is a sum of peaks at every interatomic vector $u = x_j - x_k$, weighted by $f_jf_k$. Here: self-vectors at $u = 0$ (weight $f_1^2 + f_2^2$), and cross-vectors at $u = \pm(0.35 - 0.10) = \pm0.25$, that is at $0.25$ and $0.75$ in the cell, corresponding to a separation of $2.5\ \text{Å}$. The Patterson gives the separation but not the absolute positions: a pair at $0.30$ and $0.55$ gives the same map. Fixing one atom at a convenient origin, permitted by the symmetry, resolves this, which is why heavy-atom positions can be read from a Patterson map.
:::
:::

### Neutrons and electrons

**Neutrons** are scattered by nuclei, with scattering lengths that vary irregularly with atomic number and isotope rather than increasing with $Z$. Light atoms such as H (better, D), Li and O are therefore located as precisely as heavy ones, which is essential for hydrides, battery materials and the oxygen positions of oxide superconductors; neighbouring elements such as Mn and Fe can be told apart; and because the neutron has a magnetic moment, magnetic structures are seen directly ([[materials-chemistry/magnetic-optical]]). Neutron sources are reactors and spallation sources, and samples must be large. **Electrons** interact some $10^4$–$10^6$ times more strongly than X-rays, so diffraction from crystals only a few hundred nanometres across is possible in a transmission electron microscope (three-dimensional electron diffraction, or microED for molecular crystals), at the cost of multiple scattering that complicates the intensities.

## Where this leads

Diffraction is the measurement behind almost every structure in this course. [[materials-chemistry/defects]] uses lattice-parameter changes and diffuse scattering to follow non-stoichiometry; [[materials-chemistry/solid-synthesis]] relies on powder diffraction to decide whether a reaction is complete; [[materials-chemistry/porous-materials]] and [[materials-chemistry/nanomaterials]] use low-angle reflections from large cells and Scherrer broadening from small particles. The mathematics of [[#eq-density]] is Fourier analysis ([Maths Atlas](/learn/maths/)), and the same structure-factor ideas underlie the determination of protein structures in [[biochemistry/amino-acids-proteins]].

::: history
Max von Laue, with Walter Friedrich and Paul Knipping, observed the diffraction of X-rays by a copper sulfate crystal in Munich in 1912, proving at once that X-rays are waves and that crystals are periodic. Within months William Lawrence Bragg reinterpreted the patterns as reflections from lattice planes, giving $n\lambda = 2d\sin\theta$, and with his father William Henry Bragg, who built the X-ray spectrometer, solved NaCl, KCl, diamond and other structures in 1913; Laue received the Nobel Prize in Physics in 1914 and the Braggs in 1915. Paul Ewald published his reciprocal-lattice sphere construction in 1913 and 1921. Peter Debye and Paul Scherrer (1916) and, independently, Albert Hull (1917) introduced powder diffraction, and Scherrer gave his line-broadening formula in 1918. Arthur Lindo Patterson introduced the function that bears his name in 1934. Hugo Rietveld published his profile-refinement method in 1969, and Hauptman and Karle's direct methods, developed from 1953, were recognised by the Nobel Prize in Chemistry in 1985. Clifford Shull and Bertram Brockhouse shared the 1994 Nobel Prize in Physics for neutron scattering. As of 2026, the Cambridge Structural Database holds well over 1.3 million organic and metal–organic structures and the Inorganic Crystal Structure Database several hundred thousand inorganic ones.
:::

::: summary
- Diffraction occurs when the scattering vector equals a reciprocal lattice vector, $\mathbf{q} = \mathbf{G}_{hkl}$, which is equivalent to Bragg's law $\lambda = 2d_{hkl}\sin\theta$; only $d \ge \lambda/2$ is observable.
- The intensity of reflection $hkl$ is proportional to $\lvert F_{hkl}\rvert^2$, where $F_{hkl} = \sum_j f_j\exp[2\pi i(hx_j + ky_j + lz_j)]$, times multiplicity, Lorentz–polarisation, thermal and absorption factors.
- Centred lattices cause systematic absences (I: $h + k + l$ odd; F: mixed parity), and screw axes and glides add more; for cubic crystals the allowed $N = h^2 + k^2 + l^2$ identify P, I or F.
- Powder patterns identify phases, are indexed via ratios of $\sin^2\theta$, give precise lattice parameters, and by Rietveld refinement give full structures.
- Line broadening $\beta = K\lambda/\tau\cos\theta$ (after removing the instrumental width) estimates crystallite sizes below about 100 nm.
- The electron density is the Fourier series of the structure factors; intensities lack phases, which Patterson, direct and dual-space methods recover before least-squares refinement ($R_1$ a few per cent).
- X-rays see electrons (heavy atoms), neutrons see nuclei and magnetic moments (light atoms, isotopes, magnetic order), and electrons work on nanometre-sized crystals.
:::

## Exercises

::: exercise A Bragg angle {level=1 check="43.32"}
The (111) planes of copper have $d_{111} = 2.087\ \text{Å}$. At what angle $2\theta$ does the 111 reflection appear with Cu $K\alpha_1$ radiation ($\lambda = 1.5406\ \text{Å}$)? (Enter $2\theta$ in degrees, to four significant figures.)
::: solution
$\sin\theta = \lambda/2d = 1.5406/(2 \times 2.087) = 0.36909$, $\theta = 21.66^\circ$, so $2\theta = 43.32^\circ$.
:::
:::

::: exercise Which reflections? {level=1}
List which of the reflections 100, 110, 111, 200, 210, 211, 220 are allowed for (a) a primitive, (b) a body-centred and (c) a face-centred cubic lattice.
::: solution
(a) Primitive: all seven. (b) Body-centred ($h + k + l$ even): 110, 200, 211, 220. (c) Face-centred (all even or all odd): 111, 200, 220. A specific basis may remove further reflections (as in diamond, where 200 is absent), but these are the lattice conditions.
:::
:::

::: exercise Resolution limit {level=1 check="0.3554"}
What is the smallest $d$-spacing that can be measured with Mo $K\alpha$ radiation ($\lambda = 0.7107\ \text{Å}$)? (Enter $d_\mathrm{min}$ in Å, to four significant figures.)
::: solution
$\sin\theta \le 1$, so $d_\mathrm{min} = \lambda/2 = 0.3554\ \text{Å}$. In practice data are collected to about $\theta = 30^\circ$ ($d = 0.71\ \text{Å}$), which already gives atomic resolution; Cu $K\alpha$ allows only $d \ge 0.77\ \text{Å}$.
:::
:::

::: exercise How many lines? {level=2 check="10"}
Aluminium is face-centred cubic with $a = 4.0495\ \text{Å}$. How many distinct powder lines can be observed with Cu $K\alpha_1$ radiation ($\lambda = 1.5406\ \text{Å}$)? (Enter the number of lines.)
::: hint
Find the largest $N = h^2 + k^2 + l^2$ for which $\sin\theta \le 1$, then count allowed fcc values of $N$.
:::
::: solution
$\sin^2\theta = \lambda^2N/4a^2 \le 1$ requires $N \le (2a/\lambda)^2 = (8.099/1.5406)^2 = 27.6$. The fcc values up to 27 are 3, 4, 8, 11, 12, 16, 19, 20, 24 and 27: **10** lines (111 to 511/333, which coincide at $N = 27$ and form one line). The last appears at $2\theta = 162.5^\circ$.
:::
:::

::: exercise Scherrer size of a catalyst {level=2 check="34"}
Platinum particles on a support give a 200 peak at $2\theta = 46.2^\circ$ with a sample broadening (instrumental width already removed) of $0.25^\circ$ (Cu $K\alpha_1$, $K = 0.9$). Estimate the crystallite size in nanometres. (Enter the size in nm, to two significant figures.)
::: solution
$\beta = 0.25\pi/180 = 4.363\times10^{-3}\ \mathrm{rad}$; $\theta = 23.1^\circ$, $\cos\theta = 0.9198$. $\tau = 0.9 \times 1.5406/(4.363\times10^{-3} \times 0.9198) = 345\ \text{Å} = 34\ \mathrm{nm}$. The surface fraction of such particles is small, and a catalyst chemist would aim for particles of a few nanometres, whose peaks are many degrees broad.
:::
:::

::: exercise Body-centred or primitive? {level=2}
A cubic metal shows six lines at $2\theta = 40.26^\circ$, $58.25^\circ$, $73.19^\circ$, $87.00^\circ$, $100.63^\circ$ and $114.9^\circ$ (Cu $K\alpha_1$; calculated values). (a) Show that the $\sin^2\theta$ values are in the ratio $1 : 2 : 3 : 4 : 5 : 6$. (b) Explain why the lattice could be primitive or body-centred from positions alone, and how a seventh line, or the density, decides. (c) Find $a$ assuming body-centred, and identify the metal if $\rho = 19.3\ \mathrm{g\,cm^{-3}}$.
::: solution
(a) $\sin^2\theta = 0.1185, 0.2369, 0.3554, 0.4738, 0.5923, 0.7107$, ratios $1 : 2.000 : 3.000 : 4.000 : 5.00 : 6.00$. (b) Primitive cubic would index these as $N = 1, 2, 3, 4, 5, 6$ (100 … 211); body-centred as $N = 2, 4, 6, 8, 10, 12$ (110 … 222). The next line distinguishes: bcc gives $N = 14$ (321), ratio 7; primitive has no $N = 7$ and its next line has ratio 8. Intensities also help: a primitive metal would have a strong 100 line. (c) bcc, 110: $a = \lambda\sqrt2/(2\sqrt{0.1185}) = 1.5406 \times 1.4142/(2 \times 0.3442) = 3.165\ \text{Å}$. With $Z = 2$, $M = \rho N_\mathrm{A}a^3/2 = 19.3 \times 6.022\times10^{23} \times 3.171\times10^{-23}/2 = 184\ \mathrm{g\,mol^{-1}}$: tungsten ($183.8$). If it were primitive with $a = 2.238\ \text{Å}$ and $Z = 1$, $M$ would be $130\ \mathrm{g\,mol^{-1}}$, which fits no metal with a primitive cubic structure (polonium, the only element that adopts one, has $M = 209\ \mathrm{g\,mol^{-1}}$): the density rules it out.
:::
:::

::: exercise A nearly absent reflection in GaAs {level=3 check="0.00195"}
Gallium arsenide has the zinc blende structure: Ga at $(0, 0, 0)$ and As at $(\tfrac14, \tfrac14, \tfrac14)$ in an F-centred cubic cell. (a) Derive $F_{111}$ and $F_{200}$ in terms of $f_\mathrm{Ga}$ and $f_\mathrm{As}$. (b) Approximating the scattering factors by the electron counts (31 and 33), find $\lvert F_{200}\rvert^2/\lvert F_{111}\rvert^2$. (c) Why is this ratio much larger in ZnS? (Enter the ratio in (b), to three significant figures.)
::: solution
(a) The F-centring gives a factor 4 for unmixed indices. The basis gives $f_\mathrm{Ga} + f_\mathrm{As}e^{\pi i(h+k+l)/2}$. For 111, $e^{3\pi i/2} = -i$: $F_{111} = 4(f_\mathrm{Ga} - if_\mathrm{As})$, $\lvert F_{111}\rvert^2 = 16(f_\mathrm{Ga}^2 + f_\mathrm{As}^2)$. For 200, $e^{\pi i} = -1$: $F_{200} = 4(f_\mathrm{Ga} - f_\mathrm{As})$. (b) $\lvert F_{200}\rvert^2/\lvert F_{111}\rvert^2 = (31 - 33)^2/(31^2 + 33^2) = 4/2050 = 0.00195$. The 200 reflection of GaAs is extremely weak; it is used as a sensitive probe of Ga/As ordering in epitaxial layers. (c) For ZnS, $f_\mathrm{Zn} \approx 30$ and $f_\mathrm{S} \approx 16$: $(14)^2/(30^2 + 16^2) = 0.17$, so 200 is clearly visible. The intensity of the "difference" reflections measures the contrast in scattering power between the two sites.
:::
:::

::: exercise Absences from a screw axis {level=3}
A crystal has a $2_1$ screw axis along $b$: each atom at $(x, y, z)$ has a partner at $(-x, y + \tfrac12, -z)$. (a) Show that reflections $0k0$ with $k$ odd are absent. (b) Explain why reflections $hkl$ in general are not absent. (c) A monoclinic crystal shows absences only for $0k0$ with $k$ odd and for $h0l$ with $l$ odd. Which symmetry element causes the second set? (The space group is the very common $P2_1/c$.)
::: solution
(a) For $h = l = 0$ the pair contributes $f\left[e^{2\pi iky} + e^{2\pi ik(y + 1/2)}\right] = fe^{2\pi iky}\left[1 + (-1)^k\right]$, which vanishes for odd $k$. (b) For general $hkl$ the partners have different $x$ and $z$ phases, $e^{2\pi i(hx + lz)}$ and $e^{-2\pi i(hx + lz)}$, so the bracket is not simply $1 + (-1)^k$ and does not vanish identically. Only in the projection onto the axis, where $x$ and $z$ drop out, do the partners exactly cancel. (c) A $c$-glide perpendicular to $b$ (reflection through the plane $y = 0$ followed by translation $c/2$) maps $(x, y, z)$ to $(x, -y, z + \tfrac12)$; for $k = 0$ the pair gives $1 + (-1)^l$, so $h0l$ with $l$ odd are absent. Screw axes and glides affect only special rows and planes of reflections, which is why their absences identify them.
:::
:::

::: exercise Patterson vectors {level=3 check="0.25"}
In the one-dimensional crystal of [[#ex-patterson]], show that $\lvert F_h\rvert^2 = f_1^2 + f_2^2 + 2f_1f_2\cos[2\pi h(x_2 - x_1)]$ for two atoms, and hence that $P(u)$ has peaks at $u = 0$ and $u = \pm(x_2 - x_1)$. For atoms at $x = 0.10$ and $x = 0.35$, give the positive Patterson cross-vector smaller than $0.5$. (Enter $u$ as a fraction of the cell.)
::: solution
$F_h = f_1e^{2\pi ihx_1} + f_2e^{2\pi ihx_2}$; multiplying by its conjugate, $\lvert F_h\rvert^2 = f_1^2 + f_2^2 + f_1f_2\left(e^{2\pi ih(x_2 - x_1)} + e^{-2\pi ih(x_2 - x_1)}\right) = f_1^2 + f_2^2 + 2f_1f_2\cos[2\pi h(x_2 - x_1)]$. The Fourier series $\sum_h\cos(2\pi hu)$ of a constant term is a sharp peak at $u = 0$ (and its lattice repeats), and $\sum_h\cos[2\pi h(x_2 - x_1)]\cos(2\pi hu)$ gives peaks at $u = \pm(x_2 - x_1)$. Here $x_2 - x_1 = 0.25$, so the cross-peaks are at $u = 0.25$ and $u = 0.75$. Each pair of atoms gives a pair of Patterson peaks; with $n$ atoms there are $n(n - 1)$ cross-peaks, which is why Patterson methods work best when a few heavy atoms dominate.
:::
:::
