A molecule is a contradiction from the classical point of view: positively charged nuclei sit a few tens of picometres apart without flying apart, and negatively charged electrons — which repel each other and are attracted to every nucleus at once — arrange themselves into shapes rigid enough to diffract, reactive enough to burn, and specific enough that one arrangement smells of bananas and the next of nothing at all. Nothing in classical electrostatics binds two hydrogen atoms: two protons repel, two electrons repel, and a proton–electron pair attracts, but a naive picture of "each electron holding the nucleus it grew up with" gives a net repulsion at most separations. The bond is a purely quantum object, built from two ingredients with no classical analogue: a single electron can be delocalised over two centres, and two electrons with opposite spin can occupy the same spatial function and thereby pay the kinetic-energy cost of squeezing charge between the nuclei only once. This lesson derives the bond from those two facts.

The derivation runs in two stages. First, because nuclei are thousands of times heavier than electrons, the electronic problem can be solved with the nuclei frozen at fixed positions, and the resulting electronic energy — added to the nuclear repulsion — becomes a potential-energy function of the nuclear geometry: the Born–Oppenheimer approximation, the floor under every structure diagram in chemistry. Second, the frozen-nuclei electronic problem itself is attacked in two rival ways that are the two great limiting pictures of chemistry: molecular orbital (MO) theory, which spreads one-electron orbitals over the whole molecule and fills them like a building, and valence bond (VB) theory, which keeps electrons paired between specific nuclei and mixes different pairing patterns. Both are approximations to the same exact wavefunction; both converge on it from opposite directions; and the hydrogen molecular ion $\mathrm{H}_{2}^{+}$, with its single electron, is the one system where every step can be done in closed form and the two pictures compared without mercy.

Keep the benchmark numbers in front of you throughout: $\mathrm{H}_{2}^{+}$ dissociates into $\mathrm{H} + \mathrm{H}^{+}$ with $D_{\mathrm{e}} = 2.79\ \mathrm{eV}$ at $R_{\mathrm{e}} = 105.7\ \mathrm{pm}$, and $\mathrm{H}_{2}$ dissociates into two hydrogen atoms with $D_{\mathrm{e}} = 4.75\ \mathrm{eV}$ at $R_{\mathrm{e}} = 74.1\ \mathrm{pm}$ ($D_{0} = 4.48\ \mathrm{eV}$ after zero-point energy). Three cautions travel with the material: the Born–Oppenheimer floor is not infallible (photochemistry lives where it cracks), an antibonding orbital is a real state with a real energy, not simply "no bond", and the "percentage ionic character" of a polar bond is a model-dependent bookkeeping device, not a measurement of charge.

## The Born–Oppenheimer approximation

The full molecular Hamiltonian contains kinetic energies for every particle and Coulomb terms for every pair. For $\mathrm{H}_{2}$ with laboratory coordinates it has six kinetic terms and ten Coulomb terms; the first move is to split it into an infinitely heavy-nuclei part and corrections. Because the kinetic energy operator scales as $1/m$ and the nuclei carry $1836$ (or more) times the electron mass in a molecule like $\mathrm{H}_{2}$, nuclear motion is slow in precisely the sense that lets the electronic problem be solved first.

::: definition The Born–Oppenheimer approximation {#def-bo}
Fix the nuclei at positions $\{\mathbf{R}_{I}\}$ and solve the **electronic Schrödinger equation**
$$
\hat{H}_{\text{el}}\,\psi_{\text{el}}(\mathbf{r};\{\mathbf{R}_{I}\}) = \left[-\sum_{i}\frac{\hbar^{2}}{2m_{\mathrm{e}}}\nabla_{i}^{2} + \sum_{i<A}\frac{-Z_{A}e^{2}}{4\pi\varepsilon_{0} r_{iA}} + \sum_{i<j}\frac{e^{2}}{4\pi\varepsilon_{0} r_{ij}}\right]\psi_{\text{el}} = E_{\text{el}}(\{R_{I}\})\,\psi_{\text{el}}
$$
for each nuclear geometry. Adding back the (now constant) nuclear repulsion gives the **potential-energy curve**
$$
V(R) = E_{\text{el}}(R) + \frac{e^{2}}{4\pi\varepsilon_{0} R}
$$ {#eq-pes}
on which the nuclei move; for $\mathrm{H}_{2}^{+}$, $E_{\text{el}}$ is the energy of the one electron in the field of two protons. The nuclei then vibrate and rotate on this surface as if it were an ordinary potential — which is why a molecule has a bond length, a force constant and a spectrum interpretable in terms of one geometry.
:::

The approximation is controlled by the mass ratio, and the scaling is worth stating precisely because it explains why molecular spectra fall where they do.

::: proposition Electronic and nuclear timescales separate {#prop-bo-times}
Electronic energies are of order the hartree $E_{\mathrm{h}}$ over lengths $a_{0}$, so electronic motion has period $\tau_{\text{el}} \sim \hbar/E_{\mathrm{e}} = 2.42\times10^{-17}\ \mathrm{s}$. A nucleus of mass $M$ bound in an electronic well of curvature $k \sim E_{\mathrm{h}}/a_{0}^{2}$ vibrates with $\hbar\omega \sim \sqrt{\hbar^{2}k/M} \sim E_{\mathrm{h}}\,(m_{\mathrm{e}}/M)^{1/2}$: vibrational quanta are smaller than electronic energies by $\sim(m_{\mathrm{e}}/M)^{1/2} \approx 1/43$ for $\mathrm{H}_{2}$, and rotational constants smaller still, by $m_{\mathrm{e}}/M$. Each level of description is an order of magnitude finer than the one above — which is exactly the bookkeeping order of this course: bond first, then vibration and rotation ([[quantum-chemistry/vibration-rotation]]), then electronic structure.
:::

::: example The timescale ratio for $\mathrm{H}_{2}$ {#ex-bo-times}
The harmonic spacing of ground-state $\mathrm{H}_{2}$ is $\tilde{\nu} = 4401\ \mathrm{cm^{-1}}$. Compute the classical vibrational period and its ratio to the atomic unit of time.
::: solution
The vibration frequency is $\nu = c\tilde{\nu} = 2.998\times10^{10}\ \mathrm{cm\,s^{-1}} \times 4401\ \mathrm{cm^{-1}} = 1.32\times10^{14}\ \mathrm{s^{-1}}$, so one full nuclear oscillation takes
$$
T = \frac{1}{\nu} = 7.58\times10^{-15}\ \mathrm{s} = 7.58\ \mathrm{fs}.
$$
The atomic unit of time is $\hbar/E_{\mathrm{h}} = 2.419\times10^{-17}\ \mathrm{s}$, so the ratio is $T/\tau_{0} = 313$. In the time a nucleus takes to complete one swing, the electron completes over three hundred orbits' worth of phase evolution: at every instant the electron is essentially in its ground state for the nuclear positions it sees. That is the Born–Oppenheimer approximation in one number.
:::
:::

::: warning When Born–Oppenheimer fails {#warn-bo}
The approximation breaks where two electronic surfaces approach or cross, because the nuclear wavefunction then couples electronic states that were assumed independent. Consequences: conical intersections funnel excited molecules back to the ground state in tens of femtoseconds (the photochemistry of vision, of ozone, of every UV absorber); the Jahn–Teller effect distorts symmetric molecules that sit at a crossing; and electron-transfer reactions proceed at the rate they do because nuclear motion drags the system through a curve crossing. A useful rule: Born–Oppenheimer is safe for ground-state thermal chemistry and suspect for everything a photon does.
:::

## $\mathrm{H}_{2}^{+}$: the bond you can solve

With the nuclei fixed a distance $R$ apart, $\mathrm{H}_{2}^{+}$ is one electron in the field of two protons — a problem separable in prolate spheroidal coordinates and solvable to arbitrary accuracy (the exact solution gives $D_{\mathrm{e}} = 2.79\ \mathrm{eV}$ at $R_{\mathrm{e}} = 105.7\ \mathrm{pm}$, i.e. $2.00\,a_{0}$). But the entire physics of bonding already appears in the simplest possible trial function, and unlike most of quantum chemistry the simplest guess can be worked out by hand in closed form.

Let $A$ and $B$ be normalised hydrogen $1s$ functions, of exponent $\zeta$, centred on the two protons. The trial wavefunction is a linear combination,

$$
\psi_{\pm} = N_{\pm}\,(A \pm B),
\qquad
N_{\pm} = \frac{1}{\sqrt{2 \pm 2S}},
\qquad
S = \int A\,B\ \mathrm{d}\tau,
$$ {#eq-lcao}

::: definition Linear combination of atomic orbitals (LCAO) {#def-lcao}
The **LCAO approximation** builds molecular orbitals from atomic orbitals on the bonded atoms: $\psi = c_{A}A + c_{B}B$. The coefficients are found by the variational principle — minimise $\langle\psi|\hat{H}|\psi\rangle/\langle\psi|\psi\rangle$ with respect to $c_{A}, c_{B}$ — which produces a $2\times2$ secular determinant. For the symmetric $\mathrm{H}_{2}^{+}$ the two solutions are the equal-weight combinations $\psi_{+}$ (no node between the nuclei, called $\sigma_{\mathrm{g}}$) and $\psi_{-}$ (one node, $\sigma_{\mathrm{u}}$): the bonding and antibonding orbitals.
:::

::: proposition The two LCAO energies of $\mathrm{H}_{2}^{+}$ {#prop-lcao}
With $H_{AA} = \langle A|\hat{H}|A\rangle$ and $H_{AB} = \langle A|\hat{H}|B\rangle$ (including the nuclear repulsion $1/R$), the variational energies are
$$
E_{\pm} = \frac{H_{AA} \pm H_{AB}}{1 \pm S}.
$$
In atomic units, with $\rho = \zeta R$, every integral needed is elementary:
$$
S = \mathrm{e}^{-\rho}\left(1+\rho+\tfrac{1}{3}\rho^{2}\right),
\qquad
J = \left\langle A\left|\frac{1}{r_{B}}\right|A\right\rangle = \zeta\left[\frac{1}{\rho} - \mathrm{e}^{-2\rho}\left(1+\frac{1}{\rho}\right)\right],
$$
$$
I = \left\langle A\left|\frac{1}{r_{A}}\right|B\right\rangle = \zeta\,\mathrm{e}^{-\rho}(1+\rho) = \langle A|1/r_{B}|B\rangle,
\qquad
H_{AA} = \frac{\zeta^{2}}{2} - \zeta + \frac{1}{R} - J,
\qquad
H_{AB} = (\zeta-2)I - \frac{\zeta^{2}}{2}S + \frac{S}{R}.
$$
The one-electron Hamiltonian is $\hat{H} = -\tfrac{1}{2}\nabla^{2} - 1/r_{A} - 1/r_{B} + 1/R$; $J$ is the attraction of nucleus $B$ felt by charge on nucleus $A$, and $I$ is its exchange analogue.
:::

The two curves $E_{\pm}(R)$ are the whole story of the one-electron bond in one picture.

::: widget plot
f: 27.2114*((z*z/2-z+z*exp(-2*z*x)*(1+1/(z*x))+(z-2)*z*exp(-z*x)*(1+z*x)-z*z*exp(-z*x)*(1+z*x+z*x*z*x/3)/2+exp(-z*x)*(1+z*x+z*x*z*x/3)/x)/(1+exp(-z*x)*(1+z*x+z*x*z*x/3))+0.5); 27.2114*((z*z/2-z+z*exp(-2*z*x)*(1+1/(z*x))-(z-2)*z*exp(-z*x)*(1+z*x)+z*z*exp(-z*x)*(1+z*x+z*x*z*x/3)/2-exp(-z*x)*(1+z*x+z*x*z*x/3)/x)/(1-exp(-z*x)*(1+z*x+z*x*z*x/3))+0.5)
x: 1.4, 8
y: -3, 12
sliders: z=1:0.8:1.6:0.01
labels: \sigma_\mathrm{g}\ (\text{bonding}); \sigma_\mathrm{u}\ (\text{antibonding})
caption: LCAO potential curves of $\mathrm{H}_{2}^{+}$ in eV relative to $\mathrm{H} + \mathrm{H}^{+}$, against $x = R/a_{0}$, with the orbital exponent $\zeta$ set by the slider. At $\zeta = 1$ the bonding curve dips to $-1.76\ \mathrm{eV}$ at $R = 2.49\,a_{0} = 132\ \mathrm{pm}$; sliding to $\zeta = 1.24$ (the optimal exponent) deepens it to $-2.35\ \mathrm{eV}$ at $2.00\,a_{0} = 106\ \mathrm{pm}$, close to the exact $-2.79\ \mathrm{eV}$ at $2.00\,a_{0}$. The antibonding curve is repulsive everywhere: it correlates with $\mathrm{H} + \mathrm{H}^{+}$ from above and holds no state.
:::

::: example The LCAO energy at $R = 2\,a_{0}$ {#ex-lcao-energy}
Evaluate $E_{+}$ and $E_{-}$ for $\mathrm{H}_{2}^{+}$ at $R = 2.0\,a_{0}$ with $\zeta = 1$, and give the binding energy at that geometry.
::: solution
With $\rho = 2.0$: $S = \mathrm{e}^{-2}(1+2+\tfrac{4}{3}) = 0.586$, $I = 2\mathrm{e}^{-2} = 0.406$, $J = \tfrac{1}{2} - \mathrm{e}^{-4}(1+\tfrac{1}{2}) = 0.473$. Then $H_{AA} = -\tfrac{1}{2} + \tfrac{1}{2} - 0.473 = -0.473$ and $H_{AB} = -I - \tfrac{1}{2}S + \tfrac{1}{2}S = -0.406$ (the $S/R$ term cancels $\zeta^{2}S/2$ at $\zeta=1$, $R=2$). Hence
$$
E_{+} = \frac{-0.473 - 0.406}{1.586} = -0.554\ \text{hartree},
\qquad
E_{-} = \frac{-0.473 + 0.406}{0.414} = -0.161\ \text{hartree}.
$$
Relative to the separated $\mathrm{H} + \mathrm{H}^{+}$ limit ($-0.5$ hartree) the bonding state is lowered by $0.054$ hartree $= 1.46\ \mathrm{eV}$ — bound at this geometry, though not yet at the curve minimum ($1.76\ \mathrm{eV}$ at $2.49\,a_{0}$). The antibonding state sits $0.339$ hartree $= 9.2\ \mathrm{eV}$ above the limit: a node costs far more than a lobe gains.
:::
:::

The energy lowering has a visible source: the bonding wavefunction piles electron density into the internuclear region, where it attracts both nuclei at once, while the antibonding wavefunction excludes density from exactly there.

::: example Density at the midpoint {#ex-density}
At the bonding minimum $R = 2.49\,a_{0}$ ($\zeta = 1$, $S = 0.460$), compare $\psi_{+}^{2}$ at the midpoint between the nuclei with the average of the two atomic densities there, and do the same for $\psi_{-}^{2}$.
::: solution
At the midpoint $r_{A} = r_{B} = R/2$, so $A = B = \mathrm{e}^{-R/2} = \mathrm{e}^{-1.246} = 0.288$ and $A^{2} = 0.0827$. Then
$$
\psi_{+}^{2}(\text{mid}) = \frac{(A+B)^{2}}{2+2S} = \frac{4A^{2}}{2+2S} = \frac{4\times0.0827}{2.920} = 0.113,
$$
against the atomic reference $\tfrac{1}{2}(A^{2}+B^{2}) = A^{2} = 0.0827$: a buildup factor of $2/(1+S) = 1.37$, thirty-seven per cent more density than the atoms supply. For $\psi_{-}$ the numerator is $(A-B)^{2} = 0$: the antibonding orbital has a nodal plane at the midpoint, so the density there is exactly zero — the electrons are evacuated from the very region where they could bind both nuclei, and the nuclear repulsion is left unscreened. Bonding is, quite literally, a question of where the charge sits.
:::
:::

::: warning The overlap is not a small correction {#warn-overlap}
At $R_{\mathrm{e}}$ the overlap is $S = 0.46$ — enormous by the standards of most of quantum chemistry, where $S \sim 0.01$ between distant groups. Everything inherits it: the normalisation $1/\sqrt{2+2S}$, the denominators $1\pm S$ in $E_{\pm}$, and the fact that $H_{AB} - ES$ (not $H_{AB}$) is the resonance matrix element. Two related traps. First, "antibonding" does not mean "unbonded": $\sigma_{\mathrm{u}}$ is a genuine eigenstate, and a molecule with more electrons in bonding than antibonding orbitals can still bind (Section 3). Second, the energy lowering is not simply "attraction to two nuclei instead of one" — at the minimum of $\mathrm{H}_{2}^{+}$ the electron is more tightly bound ($\zeta$-like contraction helps, as the slider in the widget shows) and the kinetic energy actually rises; the bond is paid for by potential energy, and the virial theorem keeps the books ([[#thm-virial]]).
:::

## The molecular orbital language

A **molecular orbital** is a one-electron wavefunction of the whole (fixed-nuclei) molecule. For a diatomic, orbitals are classified by the component of orbital angular momentum about the internuclear axis — $\lambda = 0, 1, 2$ gives $\sigma, \pi, \delta$ orbitals — and, for a homonuclear molecule, by behaviour under inversion through the midpoint: gerade ($\mathrm{g}$, unchanged) or ungerade ($\mathrm{u}$, sign change). The $\psi_{+}$ of $\mathrm{H}_{2}^{+}$ is a $\sigma_{\mathrm{g}}$ orbital; $\psi_{-}$ is $\sigma_{\mathrm{u}}$. Orbitals are filled from the bottom with two electrons each (Pauli principle), exactly as atomic orbitals are.

::: widget plot
f: 0; -1.76; 5.73
x: 0, 1
y: -3, 8
labels: \text{H } 1s + \text{H}^{+}; \sigma_\mathrm{g}; \sigma_\mathrm{u}^{*}
caption: The $\mathrm{H}_{2}^{+}$ orbital ladder at $R_{\mathrm{e}} = 2.49\,a_{0}$ in the $\zeta = 1$ LCAO approximation, in eV relative to the separated $\mathrm{H}(1s) + \mathrm{H}^{+}$ limit: $\sigma_{\mathrm{g}}$ lies $1.76\ \mathrm{eV}$ below and $\sigma_{\mathrm{u}}$ $5.73\ \mathrm{eV}$ above. The single electron occupies $\sigma_{\mathrm{g}}$, giving bond order one-half. The star on $\sigma_{\mathrm{u}}^{*}$ is the convention for an orbital empty in the ground state.
:::

::: definition Bond order {#def-bond-order}
The **bond order** is $\frac{1}{2}(n_{\text{bonding}} - n_{\text{antibonding}})$. $\mathrm{H}_{2}^{+}$: one electron in $\sigma_{\mathrm{g}}$, bond order $\tfrac{1}{2}$ — and it is real, with $D_{0} = 2.65\ \mathrm{eV}$, the most thoroughly characterised ion in spectroscopy. $\mathrm{H}_{2}$: two electrons, bond order $1$. $\mathrm{He}_{2}^{+}$: bond order $\tfrac{1}{2}$, also real. $\mathrm{He}_{2}$: $\sigma_{\mathrm{g}}^{2}\sigma_{\mathrm{u}}^{2}$, bond order $0$ — no bond, which is why helium is a monatomic gas. Note that bond order counts bonds, not strength: the half-bond of $\mathrm{H}_{2}^{+}$ ($2.79\ \mathrm{eV}$) is more than half the full bond of $\mathrm{H}_{2}$ ($4.75\ \mathrm{eV}$), because the second electron pays electron–repulsion as well as nuclear attraction.
:::

::: quiz
Why is $\mathrm{He}_{2}$ not a bound molecule in its electronic ground state?
- [ ] The two nuclei are too heavy to tunnel into a bond.
- [x] Filling $\sigma_{\mathrm{g}}$ with two electrons and $\sigma_{\mathrm{u}}$ with two more cancels the bonding against the antibonding occupation, leaving bond order zero.
- [ ] Helium's electrons are spin-paired, and paired electrons cannot bond.
- [ ] The $\sigma_{\mathrm{u}}$ orbital is unphysical, so $\mathrm{He}_{2}$ cannot fill it.
::: solution
Bond order $\tfrac{1}{2}(2-2) = 0$: the antibonding occupation undoes the bonding one, and the nuclear repulsion is left unscreened at every distance. (He does form a van der Waals dimer — a potential well a thousand times shallower than a chemical bond, holding a single vibrational level, from correlated electron motion that this one-electron picture cannot see at all.) Spin pairing is what *enables* bonding (Section 4), and $\sigma_{\mathrm{u}}$ is as physical as $\sigma_{\mathrm{g}}$ — $\mathrm{He}_{2}^{+}$, with one electron removed from it, is a stable ion.
:::
:::

## Valence bond theory: the bond as paired spin

MO theory builds orbitals first and puts electrons in them; valence bond theory starts from the answer chemists want — an electron pair shared between $A$ and $B$ — and builds the wavefunction from structures. Heitler and London's 1927 treatment of $\mathrm{H}_{2}$ was the first quantum calculation of a bond, and its logic is worth knowing because it identifies the actual bond-making agent.

::: proposition The Heitler–London wavefunction {#prop-hl}
Give electron $1$ to nucleus $A$ and electron $2$ to nucleus $B$ to write $\Phi = A(1)B(2)$. Exchanging the two indistinguishable electrons gives $B(1)A(2)$, and the correct spatial symmetries are the combinations
$$
\Psi_{\pm} = A(1)B(2) \pm B(1)A(2).
$$
Because the total wavefunction must be antisymmetric, the spatially symmetric $\Psi_{+}$ pairs with the antisymmetric spin singlet $\frac{1}{\sqrt{2}}(\alpha\beta - \beta\alpha)$ — antiparallel spins — and is bound; the spatially antisymmetric $\Psi_{-}$ pairs with the triplet spin function and is repulsive. The bond exists if and only if the spins are paired: the exchange symmetry of the spatial function, not any new "exchange force", is what binds.
:::

The physical content is in the spatial symmetry. $\Psi_{+}$ is enhanced in the internuclear region (the two terms add there), so the singlet draws charge between the nuclei exactly as $\psi_{+}^{2}$ did for one electron. In $\Psi_{-}$ the two terms cancel whenever the electrons are exchanged — the antisymmetric spatial function keeps the electrons apart on average, but it also depletes the internuclear region and leaves the midpoint plane empty, so the nuclear repulsion goes unscreened. The triplet $\mathrm{H}+\mathrm{H}$ curve is repulsive at all distances, which is why two hydrogen atoms with parallel spins simply scatter: **spin pairing is not a detail of the bond, it is the bond**.

The comparison with MO theory is instructive and quantitative. Write the MO ground-state function $(\sigma_{\mathrm{g}})^{2}$, with $\sigma_{\mathrm{g}} \propto A + B$, in electron coordinates:

::: example The ionic content of the MO wavefunction {#ex-ionic-weight}
Expand $(A(1)+B(1))(A(2)+B(2))$ into terms of the form "electron 1 on X, electron 2 on Y" and determine what fraction of the weight is ionic (both electrons on the same nucleus). What goes wrong as $R \to \infty$?
::: solution
The product is $A(1)A(2) + A(1)B(2) + B(1)A(2) + B(1)B(2)$. The middle two terms are covalent — one electron each side — and the outer two are ionic: both electrons on $A$ (that is $\mathrm{H}^{-}$ at $A$ with $\mathrm{H}^{+}$ at $B$) or both on $B$. Four terms, two of them ionic: the simple MO function is $50\,\%$ ionic at every distance, including infinity. But $\mathrm{H}^{-} + \mathrm{H}^{+}$ lies $I(\mathrm{H}) - A(\mathrm{H}) = 13.60 - 0.75 = 12.85\ \mathrm{eV}$ above two ground-state hydrogen atoms, so as $R\to\infty$ the MO wavefunction does not dissociate to $\mathrm{H} + \mathrm{H}$ at all — it carries a huge, unphysical ionic component into the asymptote. The Heitler–London function has the right limit (purely covalent) but misses the ionic terms that the real molecule *does* want at equilibrium, where mixing in $\mathrm{H}^{-}\mathrm{H}^{+}$ lets the electrons dodge each other. Modern calculations fix both defects by mixing covalent and ionic structures with variational weights — and the exact answer is $D_{\mathrm{e}} = 4.75\ \mathrm{eV}$.
:::
:::

## What the numbers say

Collecting the verified results makes the hierarchy of approximations visible:

| system | method | $D_{\mathrm{e}}/\mathrm{eV}$ | $R_{\mathrm{e}}/\mathrm{pm}$ |
|---|---|---|---|
| $\mathrm{H}_{2}^{+}$ | LCAO, $\zeta = 1$ | 1.76 | 132 |
| $\mathrm{H}_{2}^{+}$ | LCAO, $\zeta = 1.24$ (optimal) | 2.35 | 106 |
| $\mathrm{H}_{2}^{+}$ | exact (separation of variables) | 2.79 | 105.7 |
| $\mathrm{H}_{2}$ | Hartree–Fock limit | 4.53 | $\approx 73$ |
| $\mathrm{H}_{2}$ | exact (James–Coolidge and successors) | 4.75 | 74.1 |

Two lessons in the table. First, the variational principle behaves: every approximate energy lies above the exact one, and improving the orbital (the slider trick) recovers most of the gap — for $\mathrm{H}_{2}^{+}$, scaling the exponent from $1$ to $1.24$ takes $D_{\mathrm{e}}$ from $1.76$ to $2.35\ \mathrm{eV}$, because a contracted orbital both binds each nucleus better and overlaps the bond region better. Second, for $\mathrm{H}_{2}$ the best single-determinant (Hartree–Fock) answer misses $0.22\ \mathrm{eV}$ — the **electron correlation energy**, $0.008$ hartree, $5\,\%$ of the bond. That $5\,\%$ is the energy recovered by letting the electrons avoid each other instantaneously, and it is the price of the orbital approximation itself; the James–Coolidge 1933 wavefunction, built explicitly in the interelectronic distance $r_{12}$, recovered it and put quantum chemistry on the map. Modern calculations of $\mathrm{H}_{2}$ agree with experiment to parts in $10^{9}$ of the total energy — the bond is the most accurately understood object in physics.

::: theorem The virial theorem at equilibrium {#thm-virial}
For a molecule whose Hamiltonian is purely Coulombic, at a stationary point of the potential-energy curve,
$$
2\langle \hat{T} \rangle + \langle \hat{V} \rangle = 0
\qquad\Longleftrightarrow\qquad
\langle \hat{T} \rangle = -E,
\qquad
\langle \hat{V} \rangle = 2E,
$$
where $E$ is the total (electronic plus nuclear-repulsion) energy at that geometry. Binding at equilibrium is therefore bookkept as: the potential energy drops by twice the bond energy while the kinetic energy *rises* by the bond energy. The electron is on average more tightly bound in the molecule than in the separated atoms — contraction, not spreading, pays for the bond — with the kinetic-energy bill paid by the potential-energy gain.
:::

::: example Virial bookkeeping for $\mathrm{H}_{2}^{+}$ {#ex-virial}
At the exact minimum of $\mathrm{H}_{2}^{+}$, $E = -0.6026$ hartree. Give $\langle \hat{T} \rangle$ and $\langle \hat{V} \rangle$, and check the theorem against the separated-atom limit.
::: solution
$\langle \hat{T} \rangle = -E = 0.6026$ hartree and $\langle \hat{V} \rangle = 2E = -1.2053$ hartree. At the limit $\mathrm{H} + \mathrm{H}^{+}$: $E = -0.5$, $T = 0.5$, $V = -1.0$. So on forming the bond at $R_{\mathrm{e}}$, $\Delta T = +0.103$ hartree (the electron contracts and speeds up) while $\Delta V = -0.205$ hartree — twice as large, opposite in sign, and netting the $0.103$ hartree $= 2.79\ \mathrm{eV}$ of binding. A wavefunction that gets the energy right but violates the virial ratio is hiding an error somewhere else; variational calculations are routinely checked this way.
:::
:::

## The polar bond

Put different nuclei at the two ends and the coefficients $c_{A}, c_{B}$ stop being equal: the more electronegative atom contributes the lower atomic orbital and wins the larger coefficient, so the bonding orbital is polarised toward it and the bond acquires a dipole. For $\mathrm{HF}$, $\psi_{\sigma} \approx c_{\mathrm{F}}\,2p\sigma_{\mathrm{F}} + c_{\mathrm{H}}\,1s_{\mathrm{H}}$ with $c_{\mathrm{F}} > c_{\mathrm{H}}$; the extreme of unequal sharing is the ionic bond, and the whole range between is one wavefunction with one parameter.

The dipole moment measures the imbalance, though only crudely: the naive ionic-character estimate divides the observed dipole by the dipole of full charges at the observed bond length.

::: example Ionic character of $\mathrm{HCl}$ from the dipole {#ex-hcl-ionic}
$\mathrm{HCl}$ has $\mu = 1.08\ \mathrm{D}$ and $R_{\mathrm{e}} = 127.5\ \mathrm{pm}$. Estimate its percentage ionic character and compare Pauling's electronegativity estimate, $1 - \mathrm{e}^{-(\Delta\chi)^{2}/4}$ with $\Delta\chi = 0.98$.
::: solution
Full charges one electron apart at $127.5\ \mathrm{pm}$ give $\mu_{\text{ionic}} = eR = 127.5 \times 0.04803 = 6.12\ \mathrm{D}$ (an electron charge across $100\ \mathrm{pm}$ is $4.803\ \mathrm{D}$). The ratio is $1.08/6.12 = 0.176$: about $18\,\%$ ionic character. Pauling's formula gives $1 - \mathrm{e}^{-0.98^{2}/4} = 1 - \mathrm{e}^{-0.240} = 0.21$, i.e. $21\,\%$ — the same story from a completely different measurement (bond energies), to within the crudeness of both models. The same arithmetic for $\mathrm{HF}$ ($1.83\ \mathrm{D}$, $91.7\ \mathrm{pm}$) gives $1.83/4.40 = 42\,\%$: the most polar common bond.
:::
:::

::: warning Percentage ionic character is not charge {#warn-ionic}
The dipole is a property of the whole charge distribution, and "ionic character" from $\mu/eR$ assigns all of it to one bond coordinate. Atomic polarisation, the overlap density's own dipole, and lone-pair back-migration all contribute: $\mathrm{CO}$ has $\mu = 0.11\ \mathrm{D}$ with the negative end on carbon, yet population analyses place substantial positive charge on carbon — a small dipole does not mean a nonpolar bond, and a large one does not mean full charges. Treat $18\,\%$ ionic $\mathrm{HCl}$ as a bookkeeping convention that happens to correlate with reactivity, not as a statement that $0.18\,e$ has moved.
:::

::: history
The quantum theory of the bond was born in a single year. In 1927 Walter Heitler and Fritz London applied the new wave mechanics to $\mathrm{H}_{2}$ and produced the first calculation of a chemical bond — binding in the singlet, repulsion in the triplet, the exchange integral as the engine — and in the same volume Max Born and J. Robert Oppenheimer set out the approximation that freezes the nuclei, famously as an appendix to a paper about molecules. Friedrich Hund built the molecular-orbital classification of diatomic spectra in 1927–28, and Robert Mulliken turned it into a general theory through the early 1930s, coining "molecular orbital" (1932), "bond order" and the $\sigma,\pi,\delta$ notation still in use. The original Heitler–London calculation gave a bond but too weak a one, and the decisive quantitative stroke came in 1933, when Harold James and Arthur Coolidge attacked $\mathrm{H}_{2}$ with a variational expansion in the interelectronic distance $r_{12}$ and brought its bond energy to chemical accuracy — six years after the first qualitative bond, the quantitative one existed, and the claim that quantum mechanics explains chemical combination was closed. Linus Pauling then carried the whole subject home to chemistry: hybridisation and resonance from 1931 onward, and *The Nature of the Chemical Bond* (1939), the book that made a generation of chemists think in orbitals; Coulson's *Valence* (1952) completed the synthesis for the next generation. Mulliken received the 1966 Nobel Prize for the molecular orbital theory of molecules; Heitler, long estranged from the chemistry establishment, received nothing.
:::

## Where this leads

The two-orbital secular problem solved here is the seed of every method in the rest of the course. Enlarge the basis from two atomic orbitals to many and the $2\times2$ determinant becomes the Roothaan equations of molecular orbital computation ([[quantum-chemistry/approximation-methods]]); restrict it to one $p_{z}$ orbital per carbon and it becomes Hückel theory for benzene and the whole of $\pi$-chemistry ([[quantum-chemistry/huckel-theory]]); classify the orbitals by symmetry and the $\mathrm{g/u}$ and $\sigma/\pi$ labels become irreducible representations with selection rules attached ([[quantum-chemistry/molecular-symmetry]]). Put many electrons into the orbitals and the same LCAO logic underlies the Hartree–Fock treatment of atoms ([[quantum-chemistry/many-electron-atoms]]). The potential curve derived here is what vibration and rotation spectra measure ([[quantum-chemistry/vibration-rotation]]), and electronic transitions between bonding and antibonding curves are the first step of every photochemical reaction ([[spectroscopy/electronic-spectroscopy]]). The bond-order bookkeeping is the quantum justification of the lines chemists draw — and of the trends in bond strength and polarity that the periodic table encodes ([[general-chemistry-1/periodicity]]).

::: summary
- The Born–Oppenheimer approximation solves the electrons in the field of fixed nuclei; the electronic energy plus nuclear repulsion is the potential-energy curve. It is controlled by $(m_{\mathrm{e}}/M)^{1/2}$: for $\mathrm{H}_{2}$ the electron executes $\sim 300$ cycles per nuclear vibration.
- $\mathrm{H}_{2}^{+}$ LCAO: $E_{\pm} = (H_{AA} \pm H_{AB})/(1 \pm S)$ with $S = \mathrm{e}^{-\rho}(1+\rho+\rho^{2}/3)$, $\rho = \zeta R$. At $\zeta = 1$: $D_{\mathrm{e}} = 1.76\ \mathrm{eV}$ at $132\ \mathrm{pm}$; at $\zeta = 1.24$: $2.35\ \mathrm{eV}$ at $106\ \mathrm{pm}$; exact: $2.79\ \mathrm{eV}$ at $105.7\ \mathrm{pm}$.
- The bonding orbital concentrates density between the nuclei ($+37\,\%$ at the midpoint against the atomic reference); the antibonding orbital has a nodal plane there and is repulsive at all distances.
- MO language: $\sigma/\pi/\delta$ by angular momentum about the axis, $\mathrm{g/u}$ by inversion; bond order $= \tfrac{1}{2}(n_{\text{bonding}} - n_{\text{antibonding}})$ explains $\mathrm{H}_{2}^{+}$, $\mathrm{H}_{2}$, $\mathrm{He}_{2}^{+}$ and the absence of $\mathrm{He}_{2}$.
- Valence bond: the singlet (antiparallel spins) spatially symmetric Heitler–London function binds; the triplet does not. Spin pairing is the bond.
- $(\sigma_{\mathrm{g}})^{2}$ is $50\,\%$ ionic and dissociates wrongly; Heitler–London dissociates rightly but underbinds; the exact $\mathrm{H}_{2}$ wavefunction needs both structure types and correlation: $D_{\mathrm{e}} = 4.75\ \mathrm{eV}$, of which Hartree–Fock gives $4.53$.
- Virial theorem at equilibrium: $T = -E$, $V = 2E$ — binding is potential energy dropping by twice the bond energy while kinetic energy rises by one bond energy.
- Polar bonds: unequal LCAO coefficients; $\mathrm{HCl}$ is $\sim 18\,\%$ ionic by the dipole ratio $\mu/eR$, $\mathrm{HF}$ $\sim 42\,\%$ — conventions, not charges.
:::

## Exercises

::: exercise LCAO bond length {level=1 check="132"}
The $\zeta = 1$ LCAO bonding curve of $\mathrm{H}_{2}^{+}$ has its minimum at $R = 2.49\,a_{0}$. Convert this to picometres. (Enter the bond length in pm.)
::: solution
$R = 2.49 \times 52.92\ \mathrm{pm} = 132\ \mathrm{pm}$. The exact bond length is $105.7\ \mathrm{pm}$: the simple LCAO overestimates it by $25\,\%$ because the uncontracted $1s$ orbital is too diffuse — the $\zeta = 1.24$ optimum pulls it to $106\ \mathrm{pm}$, essentially exact.
:::
:::

::: exercise Normalisation of the bonding orbital {level=1 check="0.585"}
With $A$ and $B$ individually normalised and overlap $S = 0.460$ at $R_{\mathrm{e}}$, compute the normalisation constant $N_{+}$ of $\psi_{+} = N_{+}(A+B)$. (Enter the dimensionless value.)
::: solution
$\langle\psi_{+}|\psi_{+}\rangle = N_{+}^{2}(1 + S + S + 1) = N_{+}^{2}(2 + 2S) = 1$, so $N_{+} = 1/\sqrt{2.920} = 0.585$. The overlap inflates the norm by $46\,\%$ and the constant shrinks the orbital accordingly — forgetting $S$ here overstates every density and energy built from $\psi_{+}$.
:::
:::

::: exercise Ionic character of HF {level=1 check="41.6"}
$\mathrm{HF}$ has $\mu = 1.83\ \mathrm{D}$ and $R_{\mathrm{e}} = 91.7\ \mathrm{pm}$. Estimate its percentage ionic character by the dipole ratio $\mu/eR$. (Enter the percentage.)
::: solution
$eR = 91.7 \times 0.04803 = 4.40\ \mathrm{D}$, so the ionic character is $1.83/4.40 = 0.416$, i.e. $41.6\,\%$. Pauling's formula with $\Delta\chi = 1.78$ gives $1-\mathrm{e}^{-0.79} = 55\,\%$ — the two estimates bracket the truth, which is that neither dipole ratios nor bond-energy formulas measure "charge".
:::
:::

::: exercise Binding at a fixed geometry {level=2 check="1.46"}
Using the closed forms of [[#prop-lcao]], compute the binding energy of $\mathrm{H}_{2}^{+}$ (relative to $\mathrm{H}+\mathrm{H}^{+}$, in eV) at $R = 2.0\,a_{0}$ with $\zeta = 1$. (Enter $D_{\mathrm{e}}$ at this geometry in eV.)
::: solution
$S = 0.586$, $I = 0.406$, $J = 0.473$, $H_{AA} = -0.473$, $H_{AB} = -0.406$, so $E_{+} = -0.879/1.586 = -0.554$ hartree against $-0.5$ for the separated pair: $D_{\mathrm{e}}(R=2) = 0.054$ hartree $= 1.46\ \mathrm{eV}$. The curve minimum is deeper ($1.76\ \mathrm{eV}$ at $2.49\,a_{0}$), so $R = 2\,a_{0}$ is on the inner (repulsive) wall — the molecule at this geometry would be pushed outward.
:::
:::

::: exercise Born–Oppenheimer from spectra {level=2 check="313"}
Ground-state $\mathrm{H}_{2}$ has $\tilde{\nu} = 4401\ \mathrm{cm^{-1}}$. Compute the ratio of one classical vibrational period to the atomic unit of time $\hbar/E_{\mathrm{h}} = 2.419\times10^{-17}\ \mathrm{s}$. (Enter the dimensionless ratio.)
::: solution
$\nu = c\tilde{\nu} = 2.998\times10^{10} \times 4401 = 1.319\times10^{14}\ \mathrm{s^{-1}}$, $T = 7.58\times10^{-15}\ \mathrm{s}$, ratio $= 7.58\times10^{-15}/2.419\times10^{-17} = 313$. The electron re-adjusts to nuclear motion with a phase error of order $1/313$ per cycle — the quantitative content of the Born–Oppenheimer approximation for this molecule.
:::
:::

::: exercise Virial bookkeeping {level=2 check="-1.21"}
At the exact minimum of $\mathrm{H}_{2}^{+}$ the total energy is $-0.6026$ hartree. Give the expectation value of the total potential energy (electronic plus nuclear repulsion) in hartree. (Enter $\langle \hat{V} \rangle$ in hartree.)
::: solution
The virial theorem at a stationary point of a Coulombic system gives $\langle \hat{V} \rangle = 2E = -1.21$ hartree (and $\langle \hat{T} \rangle = -E = +0.60$). The potential energy is twice the total energy and negative: the bond is potential-energy-driven, with the kinetic energy rising by $0.10$ hartree relative to separated atoms as the electron contracts.
:::
:::

::: exercise Derive the LCAO energies {level=3}
Starting from the variational condition on $\psi = c_{A}A + c_{B}B$ with non-orthogonal $A, B$, write the secular determinant and derive $E_{\pm} = (H_{AA} \pm H_{AB})/(1 \pm S)$ for the symmetric case $c_{A} = \pm c_{B}$.
::: solution
Minimising $E = (c_{A}^{2}H_{AA} + 2c_{A}c_{B}H_{AB} + c_{B}^{2}H_{AA})/(c_{A}^{2} + 2c_{A}c_{B}S + c_{B}^{2})$ (using $H_{BB}=H_{AA}$, $S_{AB}=S$) with respect to $c_{A}, c_{B}$ gives
$$
\begin{vmatrix} H_{AA} - E & H_{AB} - ES \\ H_{AB} - ES & H_{AA} - E \end{vmatrix} = 0
\quad\Longrightarrow\quad
H_{AA} - E = \pm(H_{AB} - ES).
$$
Solving: $E(1 \pm S) = H_{AA} \pm H_{AB}$, i.e. $E_{\pm} = (H_{AA} \pm H_{AB})/(1 \pm S)$, with eigenvector ratio $c_{B}/c_{A} = \pm1$. Since $H_{AB} < 0$, the $+$ root — the symmetric combination — is the lower one: its numerator is more negative by $2|H_{AB}|$, and this outweighs the penalty of the larger denominator $1+S$. Note that the overlap $S$ appears multiplied by $E$: this is the generalised eigenproblem $H\mathbf{c} = ES\mathbf{c}$, not an ordinary one — the same structure as the Roothaan equations of [[quantum-chemistry/approximation-methods]].
:::
:::

::: exercise The dissociation test {level=3}
Show explicitly that the Heitler–London function $\Psi_{+} = A(1)B(2) + B(1)A(2)$ dissociates correctly as $R \to \infty$ while $(\sigma_{\mathrm{g}})^{2}$ does not, and compute the energy error per mole of $\mathrm{H}_{2}$ that the MO function's ionic tail represents at infinity (use $I(\mathrm{H}) = 13.60\ \mathrm{eV}$, $A(\mathrm{H}) = 0.75\ \mathrm{eV}$).
::: solution
As $R\to\infty$, $\Psi_{+}$ contains only $A(1)B(2)$ and $B(1)A(2)$ — one electron per atom, two indistinguishable ways, energy $E(\mathrm{H}) + E(\mathrm{H})$: correct. $(\sigma_{\mathrm{g}})^{2} \propto [A(1)+B(1)][A(2)+B(2)]$ retains $A(1)A(2) + B(1)B(2)$, the ionic structures $\mathrm{H}^{-}\mathrm{H}^{+}$ and $\mathrm{H}^{+}\mathrm{H}^{-}$, which lie $I - A = 12.85\ \mathrm{eV}$ higher. With half the weight there, the MO function's expectation value at infinity is roughly $0.5 \times 12.85 \approx 6\ \mathrm{eV}$ above the true limit (the exact number depends on overlap and penetration terms) — some $600\ \mathrm{kJ\,mol^{-1}}$, larger than the bond itself. This is why single-determinant MO theory cannot describe bond breaking, and why diradicals, transition-metal chemistry and stretched bonds demand multi-configurational wavefunctions: the ionic and covalent structures become near-degenerate and must be mixed explicitly.
:::
:::

::: exercise Bonding–antibonding splitting {level=3 check="7.50"}
For $\mathrm{H}_{2}^{+}$ at $R = 2.49\,a_{0}$ with $\zeta = 1$, compute $E_{+}$ and $E_{-}$ from the closed forms of [[#prop-lcao]] and give the splitting $E_{-} - E_{+}$ in eV. (Enter the splitting in eV.)
::: solution
With $\rho = 2.493$: $S = \mathrm{e}^{-2.493}(1+2.493+2.493^{2}/3) = 0.460$, $I = \mathrm{e}^{-2.493}(3.493) = 0.289$, $J = 1/2.493 - \mathrm{e}^{-4.986}(1+1/2.493) = 0.401 - 0.010 = 0.392$. Then
$$
H_{AA} = \tfrac{1}{2} - 1 + 0.401 - 0.392 = -0.490,
\qquad
H_{AB} = -0.289 - 0.230 + 0.460\times0.401 = -0.335,
$$
so $E_{+} = (-0.490 - 0.335)/1.460 = -0.565$ hartree and $E_{-} = (-0.490 + 0.335)/0.540 = -0.287$ hartree. The splitting is $E_{-} - E_{+} = 0.276$ hartree $= 7.50\ \mathrm{eV}$ (from unrounded values): the $\sigma_{\mathrm{g}}$–$\sigma_{\mathrm{u}}$ gap at equilibrium — the energy of the electronic transition that breaks the bond, in the vacuum ultraviolet ([[spectroscopy/electronic-spectroscopy]]). Note the asymmetry: the bonding level is pushed down by only $0.065$ hartree while the antibonding level is pushed up by $0.211$ — antibonding costs more than bonding pays, which is why closed-shell atoms like $\mathrm{He}$ do not bond.
:::
:::
