The Schrödinger equation of [[quantum-chemistry/quantum-foundations]] is a differential equation, and like every differential equation it can be solved exactly only for a handful of potentials. That handful is not an accident of mathematical convenience: the box, the step, the ring, the oscillator, the rotor and the Coulomb well are the *shapes* that real molecular Hamiltonians take near their important configurations, which is why solving them once buys understanding for ever after. A conjugated dye is a box for its $\pi$ electrons; an $\alpha$ particle inside a nucleus is a particle behind a barrier it can leak through; an electron circling a benzene ring is a particle on a ring; and every one of these identifications turns a qualitative chemical picture into a number you can put a spectrometer against.

This lesson solves the translational model systems — the infinite and finite square wells in one, two and three dimensions, and the ring — and puts each to work on a chemical problem. Three themes run through all of them. First, *quantisation is a boundary-condition effect*: bound states are discrete because a wave confined to a region must fit an integer number of half-wavelengths, not because any new physics was added. Second, *the wavefunction is a probability amplitude*: $|\psi|^{2}$, not $\psi$, is what a detector counts, and the difference between quantum and classical probability is visible even in the ground state of a box. Third, *exponentials rule*: in the classically forbidden region the wavefunction decays as $e^{-\kappa x}$, and this decay — not any barrier-topping heroics — is what makes scanning tunnelling microscopes image atoms and nuclei transmute over geological time.

## The one-dimensional infinite well

::: definition The infinite square well {#def-well}
The **infinite square well** (particle in a one-dimensional box) of length $L$ is the potential
$$
V(x) = \begin{cases} 0, & 0 \le x \le L, \\ \infty, & \text{otherwise}. \end{cases}
$$
Inside the well the particle moves freely; the walls are impenetrable, so the wavefunction must vanish at $x = 0$ and $x = L$ and outside. It is the idealisation of any situation in which an electron is confined to a molecular-scale region by a potential much larger than the energies of interest — a $\pi$ electron along a dye chain, or an electron at a metal surface.
:::

Inside the well $V = 0$ and the time-independent Schrödinger equation is simply $-\left(\hbar^{2}/2m\right)\mathrm{d}^{2}\psi/\mathrm{d}x^{2} = E\psi$, whose general solution is a superposition of two travelling waves, equivalently of one standing wave and one cosine. The physics is all in the two boundary conditions.

::: proposition The particle in a box {#prop-box}
A particle of mass $m$ in a one-dimensional box of length $L$ has normalised eigenfunctions and eigenvalues
$$
\psi_{n}(x) = \sqrt{\frac{2}{L}}\,\sin\frac{n\pi x}{L}, \qquad
E_{n} = \frac{n^{2}h^{2}}{8mL^{2}}, \qquad n = 1, 2, 3, \dots
$$
The quantum number $n$ starts at $1$: there is no state of zero energy, and the **zero-point energy** $E_{1} = h^{2}/8mL^{2}$ is the lowest the particle can have.
:::

::: proof
Inside the well the equation is $\psi'' = -k^{2}\psi$ with $k^{2} = 2mE/\hbar^{2}$. The general solution is $\psi = A\sin kx + B\cos kx$. The wall at $x = 0$ gives $\psi(0) = B = 0$; the wall at $x = L$ then requires $\sin kL = 0$, so $kL = n\pi$ with $n$ a positive integer ($n = 0$ would make $\psi$ vanish everywhere, and negative $n$ only changes an overall sign). Hence $k_{n} = n\pi/L$ and
$$
E_{n} = \frac{\hbar^{2}k_{n}^{2}}{2m} = \frac{n^{2}\pi^{2}\hbar^{2}}{2mL^{2}} = \frac{n^{2}h^{2}}{8mL^{2}} .
$$
Normalisation fixes $A$: $\int_{0}^{L}A^{2}\sin^{2}(n\pi x/L)\,\mathrm{d}x = A^{2}L/2 = 1$, so $A = \sqrt{2/L}$. The integer $n$ appears nowhere as an assumption — it is forced by the requirement that the wave fit between the walls, exactly as the harmonics of a string are forced by its endpoints.
:::

The useful numerical form follows from $h^{2}/8m_{\mathrm{e}} = 0.376\ \mathrm{eV\,nm^{2}}$: for an electron, $E_{1}/\mathrm{eV} = 0.376/(L/\mathrm{nm})^{2}$. Confinement at the molecular scale costs electronvolts — the same currency as chemical bonds and ultraviolet light — which is why quantum mechanics, not classical, is the natural language of chemistry (see [[general-chemistry-1/quantum-atom]]).

::: example An electron in a molecular-sized box {#ex-electron-box}
An electron is confined to a one-dimensional box of length $L = 0.50\ \mathrm{nm}$, about the length of a small conjugated molecule. Find the first two energy levels and the wavelength of light absorbed in the $1 \rightarrow 2$ transition.
::: solution
With $h^{2}/8m_{\mathrm{e}} = 0.376\ \mathrm{eV\,nm^{2}}$,
$$
E_{1} = \frac{0.376}{(0.50)^{2}} = 1.50\ \mathrm{eV}, \qquad
E_{2} = 4E_{1} = 6.02\ \mathrm{eV}.
$$
The transition energy is $\Delta E = E_{2} - E_{1} = 3E_{1} = 4.51\ \mathrm{eV}$, and with $hc = 1240\ \mathrm{eV\,nm}$,
$$
\lambda = \frac{1240\ \mathrm{eV\,nm}}{4.51\ \mathrm{eV}} = 275\ \mathrm{nm},
$$
ultraviolet light. A single electron in a box the size of a molecule already absorbs like a molecule: the scale of electronic spectroscopy falls out of $h^{2}/8mL^{2}$ with no further input. Note also the ladder structure $E_{n} \propto n^{2}$: the gaps *widen* with energy, $\Delta E_{n\rightarrow n+1} = (2n + 1)E_{1}$, the opposite of the hydrogen atom, where they narrow ([[quantum-chemistry/hydrogen-atom]]).
:::
:::

## What the wavefunctions say

The stationary states are standing waves with $n - 1$ interior **nodes**, points where $\psi = 0$ and hence $\psi^{2} = 0$: the particle in state $n$ is *never* found at those points, a statement with no classical analogue. The probability density $\psi_{n}^{2} = (2/L)\sin^{2}(n\pi x/L)$ is anything but uniform, and this is the first place where the Born interpretation does real work.

::: widget plot
f: 2*sin(pi*x)^2; 2*sin(2*pi*x)^2; 2*sin(3*pi*x)^2
x: 0, 1
y: 0, 2.2
labels: n=1; n=2; n=3
caption: The probability densities $\psi_n^2$ of the lowest three states of a box of length $L$, plotted against $x/L$. The ground state peaks at the centre and vanishes at the walls; the excited states develop nodes ($n-1$ of them) and, as $n$ grows, their oscillations average towards the flat classical distribution — the correspondence principle in one line.
:::

::: example Quantum probability in the ground state {#ex-prob-third}
For a particle in the ground state of a box, find the probability of finding it in (a) the central third of the box and (b) the central half, and compare with the classical prediction.
::: solution
$$
P = \int_{L/3}^{2L/3}\frac{2}{L}\sin^{2}\frac{\pi x}{L}\,\mathrm{d}x
= \left[\frac{x}{L} - \frac{\sin(2\pi x/L)}{2\pi}\right]_{1/3}^{2/3}
= \frac{1}{3} + \frac{\sqrt{3}}{2\pi} = 0.609 .
$$
Classically a bouncing particle spends exactly one third of its time in the central third, so the quantum particle is *over*-localised at the centre by a factor $1.8$. For the central half the same integration gives $P = \tfrac{1}{2} + 1/\pi = 0.818$ against the classical $\tfrac{1}{2}$. The ground state of a box is the simplest example of a fact that survives into every real molecule: quantum particles avoid the walls and crowd where the classical probability is merely middling. Excited states reverse the sign locally — for $n = 2$ the density vanishes at the centre — and only for large $n$ do the oscillations average to the classical value.
:::
:::

::: quiz
A particle occupies the state $n = 6$ of a box. Where is it most likely to be found?
- [x] At six positions (the maxima of $\psi_{6}^{2}$, at $x = L/12, 3L/12, \dots, 11L/12$), including points near the walls where a classical particle is most likely and points a classical particle could still reach.
- [ ] Only at the centre of the box, where the ground state peaks.
- [ ] Uniformly: every position is equally likely once $n$ is large.
- [ ] At the six nodes, where the wave has the most curvature.
::: solution
$\psi_{6}^{2} = (2/L)\sin^{2}(6\pi x/L)$ has $n = 6$ maxima (at $x = L/12, 3L/12, \dots, 11L/12$) and $5$ interior nodes, where the probability is exactly zero. Even at $n = 6$ the distribution is nothing like uniform; uniformity returns only in the coarse-grained average over many oscillations, which is the content of the correspondence principle. Nodes are the opposite of most-probable: zero amplitude, zero probability, and — as [[quantum-chemistry/huckel-theory]] will show — the chemical signature of antibonding.
:::
:::

::: warning Zero-point energy is not a licence {#warn-zpe}
$E_{1} > 0$ is often paraphrased as "the particle can never be at rest", and from there it is one careless step to "so nothing is ever really still, so energy can be extracted from the vacuum". The honest content is narrower and stranger: localising a particle to a region $L$ forces a momentum spread $\Delta p \gtrsim \hbar/2L$ by the uncertainty principle, and the kinetic energy of that spread is the zero-point energy. It is the price of confinement, payable by any confined thing — which is why it *decreases* when the box grows and vanishes for a free particle. It is not an unlimited bank of energy: the ground state is the *lowest* state, and the whole usefulness of $E_{1} = h^{2}/8mL^{2}$ lies in its being unextractable.
:::

## Two and three dimensions: separation and degeneracy

For a rectangular box with sides $L_{x}, L_{y}, L_{z}$ the potential is a sum of one-dimensional terms, $V = V_{x}(x) + V_{y}(y) + V_{z}(z)$, and the equation separates: write $\psi = X(x)Y(y)Z(z)$, divide by $\psi$, and each side must be a constant. Each factor satisfies its own one-dimensional box equation, so the energies simply add.

::: proposition Particles in higher-dimensional boxes {#prop-2d}
For a rectangular box with impenetrable walls,
$$
E = \frac{h^{2}}{8m}\left(\frac{n_{x}^{2}}{L_{x}^{2}} + \frac{n_{y}^{2}}{L_{y}^{2}} + \frac{n_{z}^{2}}{L_{z}^{2}}\right), \qquad
\psi = \psi_{n_{x}}(x)\,\psi_{n_{y}}(y)\,\psi_{n_{z}}(z),
$$
with independent quantum numbers $n_{x}, n_{y}, n_{z} = 1, 2, 3, \dots$ When two or more distinct states share an energy the level is **degenerate**, and the number of states is its **degeneracy**. In a cube $L_{x} = L_{y} = L_{z}$ different triples can give the same sum of squares, so degeneracies appear; lowering the symmetry (stretching one side) splits them.
:::

::: example Degeneracies of the square box {#ex-degeneracy}
A particle is confined to a square two-dimensional box. List the first six energy levels in units of $E_{81} = h^{2}/8mL^{2}$ with their degeneracies, and identify the first level whose degeneracy arises from two *different* excitations.
::: solution
Here $E/E_{81} = n_{x}^{2} + n_{y}^{2}$:

| $E/E_{81}$ | states $(n_{x}, n_{y})$ | degeneracy |
|---|---|---|
| 2 | (1,1) | 1 |
| 5 | (1,2), (2,1) | 2 |
| 8 | (2,2) | 1 |
| 10 | (1,3), (3,1) | 2 |
| 13 | (2,3), (3,2) | 2 |
| 17 | (1,4), (4,1) | 2 |

The level at $5E_{81}$ is already degenerate: one quantum in $x$ or one in $y$ cost the same because the sides are equal. The first level whose degeneracy mixes *different quanta* is $13E_{81} = 2^{2} + 3^{2}$, degenerate by permutation only; genuinely accidental degeneracies — different partitions of the same sum of squares, e.g. $50E_{81} = 1^{2} + 7^{2} = 5^{2} + 5^{2}$ — are number-theoretic rarities. In three dimensions the cube's first levels are $3, 6, 9, 11, 12, 14$ in units of $h^{2}/8mL^{2}$, the sums $n_{x}^{2} + n_{y}^{2} + n_{z}^{2}$, with degeneracies $1, 3, 3, 3, 1, 6$: the first sixfold level, $14 = 1^{2} + 2^{2} + 3^{2}$, is the six permutations of three different quanta.
:::
:::

::: warning Degeneracy is symmetry, not coincidence {#warn-degeneracy}
Every systematic degeneracy is the shadow of a symmetry: the twofold degeneracy of the square box says $x$ and $y$ are interchangeable; the sixfold degeneracy of the cube's $14$ level says the three axes are. When the symmetry breaks — a rectangular box, a distorted molecule — the degeneracy lifts. The habit to build now is the one group theory will make formal ([[quantum-chemistry/molecular-symmetry]]): before asking *what* is degenerate, ask *why the Hamiltonian allows it*, and before trusting a computed degeneracy, ask what would split it.
:::

## Tunnelling: the finite barrier

Make the walls finite, height $V_{0}$, and the wavefunction no longer dies at the boundary: inside the barrier the Schrödinger equation reads $\mathrm{d}^{2}\psi/\mathrm{d}x^{2} = \kappa^{2}\psi$ with $\kappa^{2} = 2m(V_{0} - E)/\hbar^{2}$ — positive curvature, exponential solutions. Matching $\psi$ and its slope across a barrier of width $L$, for an opaque barrier ($\kappa L \gg 1$), gives the transmission probability

$$
T \approx e^{-2\kappa L}, \qquad
\kappa = \frac{\sqrt{2m(V_{0} - E)}}{\hbar}.
$$ {#eq-tunnel}

No classical particle with $E < V_{0}$ gets through; no quantum particle is *stopped* — the wave leaks, and on the far side a travelling wave re-emerges with amplitude reduced by the decay through the barrier. The particle does not "borrow energy to climb over": it stays at energy $E$ throughout, and the barrier region is where the wavefunction, not the particle, pays in decay length $\kappa^{-1}$.

::: example Why the scanning tunnelling microscope sees atoms {#ex-stm}
In a scanning tunnelling microscope (STM) electrons tunnel across the vacuum gap between a sharp tip and a surface. Take the barrier height as the work function, $V_{0} - E = \phi = 4.5\ \mathrm{eV}$. Find the decay constant and show that the current falls by about a factor of ten for every $0.1\ \mathrm{nm}$ of added gap.
::: solution
For an electron,
$$
\kappa = \frac{\sqrt{2m_{\mathrm{e}}\phi}}{\hbar}
= \frac{\sqrt{2 \times 9.109\times10^{-31}\ \mathrm{kg} \times 4.5 \times 1.602\times10^{-19}\ \mathrm{J}}}{1.055\times10^{-34}\ \mathrm{J\,s}}
= 1.09\times10^{10}\ \mathrm{m^{-1}} = 10.9\ \mathrm{nm^{-1}} .
$$
A factor of ten in $T = e^{-2\kappa L}$ needs $2\kappa L = \ln 10 = 2.303$, i.e.
$$
L = \frac{2.303}{2 \times 10.9\ \mathrm{nm^{-1}}} = 0.106\ \mathrm{nm},
$$
about one atomic diameter. The exponential of [[#eq-tunnel]] is the whole reason the STM works: the current is a height gauge with sub-ångström sensitivity, so scanning at constant current maps the surface atom by atom — and because the tunnelling electron samples the *wavefunctions* of the surface rather than its nuclei, the image is of electronic structure. A gap of $0.30\ \mathrm{nm}$ instead of $0.10\ \mathrm{nm}$ cuts the current by $e^{2 \times 10.9 \times 0.20} \approx 77$: one molecular layer of adsorbate is already a deep shadow.
:::
:::

The same equation governs the nucleus. An $\alpha$ particle of a few MeV sits behind a Coulomb barrier of some $29\ \mathrm{MeV}$ tens of femtometres wide; its decay constant is $\lambda = \nu T$, where the attempt frequency $\nu \sim 10^{21}\ \mathrm{s^{-1}}$ is the rate at which the particle strikes the barrier ($\nu = v/2R$, a particle of speed $v$ bouncing in a nucleus of radius $R$). Because $T$ is exponential in the barrier *area*, half-lives spanning seventeen orders of magnitude come from alpha energies spanning a factor of two — the Geiger–Nuttall law, explained in 1928 by Gamow and by Gurney and Condon ([[#ex-gamow]]).

## Conjugated molecules as boxes for electrons

::: algorithm The free-electron box model of a linear dye {#algo-box}
1. Count the $\pi$ electrons: one per carbon of the conjugated chain, $N$ in all; each box level holds two.
2. Take the box length as $L = (N + 1) \times 140\ \mathrm{pm}$: one C–C bond length per link of the chain plus one bond length at each end for the terminal hydrogen atoms.
3. Fill the levels from $n = 1$ up (Pauli principle): the highest occupied level is $n = N/2$.
4. The lowest absorption is $n = N/2 \rightarrow N/2 + 1$, of energy
$$
\Delta E = \frac{\left[(N/2 + 1)^{2} - (N/2)^{2}\right]h^{2}}{8m_{\mathrm{e}}L^{2}} = \frac{(N + 1)\,h^{2}}{8m_{\mathrm{e}}L^{2}} .
$$
5. Convert with $\lambda = hc/\Delta E$, $hc = 1240\ \mathrm{eV\,nm}$.
:::

::: example Hexatriene as a box {#ex-hexatriene}
Apply the box model to all-*trans*-hexatriene, $\mathrm{CH_2{=}CH{-}CH{=}CH{-}CH{=}CH_2}$, and compare with its gas-phase absorption maximum at $258\ \mathrm{nm}$.
::: solution
Six $\pi$ electrons fill $n = 1, 2, 3$, so the transition is $3 \rightarrow 4$ with $(4^{2} - 3^{2}) = 7$ in units of $h^{2}/8mL^{2}$. The box is $L = 7 \times 140\ \mathrm{pm} = 0.98\ \mathrm{nm}$, so
$$
\Delta E = \frac{7 \times 0.376\ \mathrm{eV\,nm^{2}}}{(0.98\ \mathrm{nm})^{2}} = 2.74\ \mathrm{eV},
\qquad
\lambda = \frac{1240}{2.74} = 452\ \mathrm{nm}.
$$
The model predicts blue light where the molecule absorbs ultraviolet: the wavelength is too long by a factor $1.75$. That failure is as instructive as success would be, and the table below shows it is systematic — but so is the trend the model gets *right*.
:::
:::

| molecule | $\pi$ electrons $N$ | $\lambda_{\text{model}}/\mathrm{nm}$ | $\lambda_{\exp}/\mathrm{nm}$ |
|---|---|---|---|
| butadiene | 4 | 323 | 217 |
| hexatriene | 6 | 452 | 258 |
| octatetraene | 8 | 582 | 290 |
| $\beta$-carotene | 22 | 1487 | 451 |

::: widget plot
f: a*(x+1)
x: 2, 24
y: 0, 1700
sliders: a=64.6:10:100:0.2
labels: \text{box model, } \lambda = a(N+1)
caption: The box model predicts the lowest absorption wavelength of a linear polyene to grow *linearly* with chain length, λ = 64.6(N+1) nm (slider `a` relaxes the slope). The measured values — 217, 258, 290 and 451 nm for butadiene, hexatriene, octatetraene and β-carotene — also grow almost linearly, but with a slope near 11 nm per carbon. The model captures the form of Kuhn's law and misses its magnitude by a factor of about six.
:::

The linear growth is the content of Kuhn's free-electron law: with $L \propto N$ and $\Delta E \propto (N + 1)/L^{2}$, the transition energy falls as $1/N$ and the wavelength stretches as $N$ — why adding conjugated double bonds marches an absorption from the ultraviolet through the visible, and why $\beta$-carotene, with eleven conjugated bonds, eats the blue and looks orange. The systematic overshoot has a solid-state explanation: the periodic potential of the carbon nuclei is not flat, and near the top of the $\pi$ band the electron responds as if lighter than free ($m^{*} < m_{\mathrm{e}}$), which widens the gap and shortens the wavelength. Cyanine dyes fail the other way — the simple box predicts $460\ \mathrm{nm}$ for the heptamethine ion against an observed $780\ \mathrm{nm}$ — because their positive charge and polarisable ends *stretch* the electron cloud beyond the nuclear skeleton. A model that errs in both directions on the molecules it was built for is a warning and a teacher at once.

::: warning The box model is a calculator, not a picture {#warn-boxmodel}
Three errors are baked into [[#algo-box]] and none of them is "the electron is not really in a box". (i) The flat potential ignores the periodic pull of the nuclei, which is exactly what opens the band gap. (ii) The electrons do not ignore *each other*: $\pi$–$\pi$ repulsion raises the occupied levels and lowers the empty ones, shrinking the gap. (iii) The box length is a guess with the sensitivity of a guess — $\lambda \propto L^{2}$, so a $10\ \%$ error in $L$ is a $20\ \%$ error in $\lambda$. Use the model for trends, scales and the *reason* conjugation reddens; never quote its wavelengths as predictions. The quantitative theory of these spectra is [[quantum-chemistry/huckel-theory]], and the experimental side is [[spectroscopy/electronic-spectroscopy]].
:::

## The particle on a ring

Bend the box into a circle of radius $r$ and the coordinate becomes an angle $\phi$ with periodic boundary conditions $\psi(\phi + 2\pi) = \psi(\phi)$ — the electron is never confined to an arc, it simply cannot tell where $\phi = 0$ is.

::: proposition The particle on a ring {#prop-ring}
A particle of mass $m$ on a ring of radius $r$ (moment of inertia $I = mr^{2}$) has
$$
E_{m_{l}} = \frac{m_{l}^{2}\hbar^{2}}{2I} = \frac{m_{l}^{2}\hbar^{2}}{2mr^{2}}, \qquad
\psi_{m_{l}}(\phi) = \frac{1}{\sqrt{2\pi}}\,e^{\mathrm{i}m_{l}\phi}, \qquad
m_{l} = 0, \pm 1, \pm 2, \dots
$$
The angular momentum about the ring axis is quantised, $L_{z} = m_{l}\hbar$. The level $m_{l} = 0$ is non-degenerate with $E = 0$ — *no zero-point energy for rotation* — and every other level is twofold degenerate, $+m_{l}$ and $-m_{l}$ (clockwise and counter-clockwise) having the same energy.
:::

::: proof
On the ring the kinetic energy is $-\left(\hbar^{2}/2I\right)\mathrm{d}^{2}\psi/\mathrm{d}\phi^{2}$, so the equation is $\psi'' = -\left(2IE/\hbar^{2}\right)\psi$, with solutions $e^{\mathrm{i}m\phi}$ where $m^{2} = 2IE/\hbar^{2}$. Single-valuedness requires $e^{\mathrm{i}m(\phi + 2\pi)} = e^{\mathrm{i}m\phi}$, i.e. $m$ an integer — positive, negative or zero. Zero is allowed here, unlike in the box: $e^{\mathrm{i}0\phi}$ is constant, has no nodes, and violates no boundary condition. Solving for $E$ gives the proposition. The contrast with the box is the lesson: the box's walls force curvature (kinetic energy) into even the ground state; the ring's periodicity permits a flat, nodeless, zero-energy state. Rotation can be "at rest"; translation in a box cannot.
:::

::: example Ring currents and the aromatic sextet {#ex-benzene-ring}
Model benzene's $\pi$ electrons as free to move on a ring of radius $r = 140\ \mathrm{pm}$ (the C–C bond length). Find the energies of the $m_{l} = 0, \pm1, \pm 2$ levels, fill in the six electrons, and explain why $6$ is a closed-shell number on a ring.
::: solution
With $\hbar^{2}/2m_{\mathrm{e}} = 0.0381\ \mathrm{eV\,nm^{2}}$ and $r = 0.14\ \mathrm{nm}$,
$$
E_{m_{l}} = m_{l}^{2}\,\frac{0.0381}{(0.14)^{2}}\ \mathrm{eV} = 1.94\,m_{l}^{2}\ \mathrm{eV},
$$
so the levels lie at $0$ ($m_{l} = 0$, one state), $1.94\ \mathrm{eV}$ ($m_{l} = \pm1$, two states) and $7.8\ \mathrm{eV}$ ($m_{l} = \pm2$, two states). Six electrons fill $m_{l} = 0$ (two) and $m_{l} = \pm1$ (four): a **closed shell** at the magic numbers $2, 6, 10, \dots$ (capacities $2, 4, 4, \dots$ of the levels $0, \pm1, \pm2$). A ring with 6 $\pi$ electrons has a large gap to its first excited state and no low-energy way to polarise its electron cloud — and an applied field can shift the clockwise and counter-clockwise currents of the filled shell against one another, producing the diamagnetic ring current whose proton NMR signature defines aromaticity. Four electrons (cyclobutadiene) or eight would leave a partially filled degenerate pair: open-shell, reactive, antiaromatic or distorted. The box has no shell structure at all — its levels $1, 4, 9, \dots$ never close — which is one way to see that cyclic conjugation is a genuinely new kind of quantum matter, taken up in [[quantum-chemistry/huckel-theory]].
:::
:::

The ring is also the rotational model behind microwave spectra: unlike the box, its spectrum is *quantised in spacing* — pure rotational lines at $\Delta E = \hbar^{2}\Delta(m_{l}^{2})/2I$ — and its lack of zero-point energy is why a molecule can sit still in space but never still along a bond ([[quantum-chemistry/vibration-rotation]]).

::: history
The model systems were the proof that the new mechanics worked: Schrödinger's 1926 papers solved the box and the rotor on the way to hydrogen. In 1928 George Gamow, and independently Ronald Gurney and Edward Condon, applied barrier penetration to $\alpha$-decay and reproduced the Geiger–Nuttall law — a quantum effect visible in a Geiger counter. Walter Kuhn proposed the free-electron model of dye colours in 1948, fitting polyene spectra with an electron box decades before anyone could compute a molecule of that size. In 1981 Gerd Binnig and Heinrich Rohrer at IBM Zürich built the scanning tunnelling microscope, exploiting the same exponential for atomic-scale imaging, and shared the 1986 Nobel Prize with Ernst Ruska.
:::

## Where this leads

The box reappears wherever confinement sets the scale: the colour of quantum dots, the conducting electrons of a graphene nanoribbon, the translational partition function $q \propto L^{3}$ of statistical mechanics ([[statistical-thermodynamics/partition-function]]). The tunnelling exponential recurs in the transmission coefficient of [[kinetics/transition-state-theory]], in electron transfer, and in every scanning probe. The ring is the first half of the rigid rotor of [[quantum-chemistry/vibration-rotation]] and the seed of Hückel's ring model in [[quantum-chemistry/huckel-theory]]. And the degeneracies you have started counting are the first characters of the group theory of [[quantum-chemistry/molecular-symmetry]]. Each model solved here is a coordinate chart on the territory the approximation methods of [[quantum-chemistry/approximation-methods]] will map for real molecules.

::: summary
- Quantisation is geometry: confining a wave to a region forces $kL = n\pi$, giving $E_{n} = n^{2}h^{2}/8mL^{2}$ and a zero-point energy $E_{1} = h^{2}/8mL^{2}$ that is the price of localisation, not a source of free energy.
- For an electron $h^{2}/8m_{\mathrm{e}} = 0.376\ \mathrm{eV\,nm^{2}}$: molecular-scale confinement costs electronvolts, so box-model transitions land in the ultraviolet and visible.
- $|\psi|^{2}$ is not flat: the ground state crowds the centre (probability $0.609$ in the central third against the classical $0.333$), excited states have $n - 1$ nodes, and classical behaviour returns only as an average over many oscillations.
- Higher-dimensional boxes separate into one-dimensional problems; degeneracies count the ways quantum numbers can share a sum of squares, and every systematic degeneracy names a symmetry.
- In a barrier, $\psi$ decays as $e^{-\kappa x}$ with $\kappa = \sqrt{2m(V_{0} - E)}/\hbar$, and $T \approx e^{-2\kappa L}$: for a $4.5\ \mathrm{eV}$ work function the STM current drops tenfold per $0.11\ \mathrm{nm}$, and $\alpha$-decay half-lives span seventeen orders of magnitude over a factor of two in energy.
- The free-electron box model of polyenes gives Kuhn's linear law $\lambda \propto N$ but overshoots the slope about sixfold; it explains why conjugation reddens colour without predicting wavelengths.
- On a ring, $m_{l} = 0, \pm1, \pm2, \dots$, $E = m_{l}^{2}\hbar^{2}/2I$: no zero-point energy, twofold degeneracy from $\pm m_{l}$, and shell closures at $2, 6, 10$ electrons — the ring-current origin of benzene's aromaticity.
:::

## Exercises

::: exercise Zero-point energy {level=1 check="4.18"}
An electron is confined to a one-dimensional box of length $0.30\ \mathrm{nm}$. What is its zero-point energy? (Enter it in eV.)
::: solution
$E_{1} = 0.376/(0.30)^{2} = 4.18\ \mathrm{eV}$. Confinement to a bond length costs more than a strong covalent bond: squeeze an electron enough and it becomes chemically violent.
:::
:::

::: exercise Probability in the ground state {level=1 check="0.82"}
For the ground state of a box of length $L$, what is the probability of finding the particle in the central half of the box? (Enter the probability.)
::: solution
$P = \int_{L/4}^{3L/4}(2/L)\sin^{2}(\pi x/L)\,\mathrm{d}x = \left[x/L - \sin(2\pi x/L)/2\pi\right]_{1/4}^{3/4} = \tfrac{1}{2} + 1/\pi = 0.82$. Classically the answer is $0.50$: the quantum ground state is markedly centre-weighted.
:::
:::

::: exercise Degeneracy of a square box {level=1 check="3"}
For a particle in a square two-dimensional box, what is the degeneracy of the level $E = 50\,h^{2}/8mL^{2}$? (Enter the degeneracy.)
::: solution
$50 = n_{x}^{2} + n_{y}^{2}$ has solutions $(1,7)$, $(5,5)$, $(7,1)$: degeneracy $3$. Two of these come from symmetry (permuting $x$ and $y$) and the $(5,5)$ state is the symmetric one — an accidental degeneracy of sums of squares, which a rectangular box would split.
:::
:::

::: exercise STM contrast {level=2 check="77"}
In an STM with work function $4.5\ \mathrm{eV}$, by what factor does the tunnelling current decrease when the tip–surface gap increases from $0.10\ \mathrm{nm}$ to $0.30\ \mathrm{nm}$? (Enter the factor.)
::: solution
$\kappa = 10.9\ \mathrm{nm^{-1}}$, so the factor is $e^{2\kappa\Delta L} = e^{2 \times 10.9 \times 0.20} = e^{4.35} = 77$. A single adsorbed atomic layer ($\sim 0.3\ \mathrm{nm}$) would give a factor of $e^{6.5} \approx 680$: STM images topography exponentially, which is its strength and its interpretive trap.
:::
:::

::: exercise Box model for octatetraene {level=2 check="582"}
Apply the free-electron box model ([[#algo-box]]) to octatetraene ($8\ \pi$ electrons, $L = 9 \times 140\ \mathrm{pm}$). Predict the lowest absorption wavelength. (Enter it in nm.)
::: solution
Transition $4 \rightarrow 5$: $\Delta E = (25 - 16) \times 0.376/(1.26)^{2} = 9 \times 0.376/1.588 = 2.13\ \mathrm{eV}$, so $\lambda = 1240/2.13 = 582\ \mathrm{nm}$. Observed: $290\ \mathrm{nm}$. The model doubles the wavelength but reproduces the red-shift trend — the error is the lesson, as [[#ex-hexatriene]].
:::
:::

::: exercise Ring level spacing {level=2 check="1.94"}
An electron moves on a ring of radius $140\ \mathrm{pm}$. What is the energy of the $m_{l} = \pm 1$ level? (Enter it in eV.)
::: solution
$E_{\pm1} = \hbar^{2}/2m_{\mathrm{e}}r^{2} = 0.0381/(0.14)^{2} = 1.94\ \mathrm{eV}$. The $m_{l} = \pm2$ level sits at $4 \times 1.94 = 7.8\ \mathrm{eV}$: the $1 : 4 : 9$ pattern of $m_{l}^{2}$ with every level (except $m_{l} = 0$) doubled.
:::
:::

::: exercise Gamow's calculation {#ex-gamow level=3}
An $\alpha$ particle ($m_{\alpha}c^{2} = 3727\ \mathrm{MeV}$) of energy $E = 4.27\ \mathrm{MeV}$ escapes $^{238}\mathrm{U}$ ($Z_{\mathrm{d}} = 90$) through the Coulomb barrier $V(r) = 2Z_{\mathrm{d}}e^{2}/4\pi\varepsilon_{0}r = 259.2\ \mathrm{MeV\,fm}/r$ outside $R = 9\ \mathrm{fm}$. Using the WKB exponent
$$
G = \int_{R}^{R_{2}}\frac{\sqrt{2m_{\alpha}\left(V(r) - E\right)}}{\hbar}\,\mathrm{d}r
= \frac{\sqrt{2m_{\alpha}E}}{\hbar}\,R_{2}\left[\arccos\sqrt{\frac{R}{R_{2}}} - \sqrt{\frac{R}{R_{2}}\left(1 - \frac{R}{R_{2}}\right)}\right],
$$
with $R_{2} = 259.2/E$ the outer turning point and $\hbar c = 197.3\ \mathrm{MeV\,fm}$, compute $T = e^{-2G}$ and the half-life $t_{1/2} = \ln 2/(\nu T)$ with attempt frequency $\nu = v/2R$, $v = \sqrt{2E/m_{\alpha}}$. Compare with the measured $4.5 \times 10^{9}\ \mathrm{y}$ and comment.
::: solution
$R_{2} = 259.2/4.27 = 60.7\ \mathrm{fm}$, $R/R_{2} = 0.148$. The bracket is $\arccos(0.385) - \sqrt{0.148 \times 0.852} = 1.176 - 0.355 = 0.820$. The prefactor is $\sqrt{2 \times 3727 \times 4.27}/197.3 = 178.7/197.3 = 0.906\ \mathrm{fm^{-1}}$, so $G = 0.906 \times 60.7 \times 0.820 = 45.0$ and $T = e^{-90} = 8 \times 10^{-40}$. With $v/c = \sqrt{2 \times 4.27/3727} = 0.048$, $\nu = v/2R = 8 \times 10^{20}\ \mathrm{s^{-1}}$, giving $t_{1/2} = \ln 2/(8 \times 10^{20} \times 8 \times 10^{-40}) \approx 1 \times 10^{18}\ \mathrm{s} \approx 3 \times 10^{10}\ \mathrm{y}$ — within an order of magnitude of the measured $4.5 \times 10^{9}\ \mathrm{y}$. Gamow's 1928 verdict stands: a factor-of-two change in $E$ changes $G$ by tens, so the half-life changes by *decades* — reproduce it by repeating the calculation for $^{212}\mathrm{Po}$ ($E = 8.78\ \mathrm{MeV}$, $Z_{\mathrm{d}} = 82$), which comes out near $10^{-6}\ \mathrm{s}$ against a measured $3 \times 10^{-7}\ \mathrm{s}$. Seventeen orders of magnitude of chemistry's rarest half-lives, from one exponential.
:::
:::

::: exercise When does the box turn visible? {level=3}
In the box model with $L = (N + 1) \times 140\ \mathrm{pm}$, show that the lowest absorption wavelength is $\lambda = 8m_{\mathrm{e}}c\,(N + 1)d^{2}/h$ with $d = 140\ \mathrm{pm}$ — linear in $N$ (Kuhn's law) — and find the chain length at which the model's absorption first reaches the red edge of the visible, $700\ \mathrm{nm}$. The observed slope for polyenes is about $11\ \mathrm{nm}$ per carbon; what does the model's slope imply about its effective mass, and what is the physical resolution?
::: solution
$\Delta E = (N + 1)h^{2}/8m_{\mathrm{e}}L^{2}$ with $L = (N + 1)d$ collapses to $\Delta E = h^{2}/8m_{\mathrm{e}}(N + 1)d^{2}$, so $\lambda = hc/\Delta E = 8m_{\mathrm{e}}c(N + 1)d^{2}/h = 64.6(N + 1)\ \mathrm{nm}$: linear, with slope $64.6\ \mathrm{nm}$ per carbon. Setting $64.6(N + 1) = 700$ gives $N + 1 = 10.8$, i.e. about $N = 10$ $\pi$ electrons (five double bonds) — whereas the observed polyene slope of $11\ \mathrm{nm}$ per carbon would demand $N \approx 60$ ($\beta$-carotene, $N = 22$, reaches only $451\ \mathrm{nm}$). Since $\lambda \propto 1/m$, the observed slope of $11\ \mathrm{nm}$ per carbon corresponds to an effective mass $m^{*} \approx 6m_{\mathrm{e}}$ in the flat-potential formula — but the resolution is not a heavy electron: the flat box is simply the wrong potential. The periodic lattice of nuclei and the $\pi$–$\pi$ repulsion between electrons reshape the levels (band-structure effective masses, electron correlation), and those are precisely the effects the Hückel method ([[quantum-chemistry/huckel-theory]]) and the approximation methods ([[quantum-chemistry/approximation-methods]]) are built to capture.
:::
:::
