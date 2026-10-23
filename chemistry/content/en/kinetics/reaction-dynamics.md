Rate laws count molecules in the aggregate: $k$ is what a billion billion collisions per second add up to, and [[kinetics/rate-laws]] showed how to read mechanisms from that average. Collision theory and transition-state theory then tried to *explain* the average — a threshold energy here, an activation free energy there — but both still speak in thermodynamic and statistical language. This final chapter of the course asks what happens in **one collision**: a single $\mathrm{F}$ atom meeting a single $\mathrm{H_2}$ molecule, a single $\mathrm{K}$ atom brushing past a single $\mathrm{CH_3I}$. Which way do the products fly? How is the 137 $\mathrm{kJ\,mol^{-1}}$ released by $\mathrm{F + H_2}$ divided between HF vibration, rotation and translation? How many femtoseconds does the system spend near the saddle point that transition-state theory placed at the top of the barrier? And when the same chemistry is moved into a beaker of water, the question inverts: for $\mathrm{H^+ + OH^-}$ the barrier is essentially nothing, and what limits the rate is not climbing the hill but *arriving* at it through the solvent. Molecular reaction dynamics is where the course's two halves — the gas-phase molecule and the solution — are finally joined, trajectory by trajectory and encounter by encounter.

## The potential energy surface: the arena of the elementary step

::: definition Potential energy surface of an elementary reaction {#def-pes-dyn}
Within the **Born–Oppenheimer approximation** the electrons adjust to the nuclear positions essentially instantaneously, so each electronic state of the reacting system defines its own energy function $V$ of the nuclear geometry — one **potential energy surface** (PES) per electronic state. For $N$ atoms the surface has $3N - 6$ dimensions ($3N - 5$ if linear); an elementary reaction is a trajectory on the surface connecting a reactant valley to a product valley, and the saddle point joining them *is* the transition state of [[kinetics/transition-state-theory]]. Reactions that change electronic state — photochemistry, quenching, chemiluminescence — leave one surface for another and are the territory of [[kinetics/photochemistry]]; everything in this lesson is adiabatic, single-surface chemistry.
:::

The prototype is $\mathrm{H + H_2 \rightarrow H_2 + H}$: three protons and three electrons, and for collinear approach just two coordinates, the distance $r_\mathrm{AB}$ being formed and the distance $r_\mathrm{BC}$ being broken. The **LEPS surface** (London–Eyring–Polanyi–Sato, 1941) builds $V(r_\mathrm{AB}, r_\mathrm{BC})$ semi-empirically from the known $\mathrm{H_2}$ and $\mathrm{H_2^+}$ potential curves: reactants sit in a long flat valley at $r_\mathrm{BC} = 0.074\ \mathrm{nm}$, products in the mirror-image valley, and between them the symmetric linear arrangement $\mathrm{H\cdots H\cdots H}$ with both distances stretched to about $0.093\ \mathrm{nm}$ — the saddle, the transition state, lying roughly $40\ \mathrm{kJ\,mol^{-1}}$ above the reactant floor (about $20\ \mathrm{kJ\,mol^{-1}}$ once zero-point energies are counted). The **reaction path** — the steepest-descent route from saddle down into each valley — does not go straight through the symmetric corner: it *bends*, and classical trajectories cut the corner, sampling geometries more product-like than the saddle. Everything in the gas-phase half of this lesson is the study of trajectories on surfaces of this kind, now computed *ab initio* to spectroscopic accuracy.

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
caption: The topology every elementary step shares: a first-order saddle at the origin — a minimum along one direction, a maximum along the other. Taking $x$ and $y$ as the two bond distances of $\mathrm{H + H_2}$, the two valleys running away from the origin along the $x$-direction are the reactant and product channels and the origin is the symmetric $\mathrm{H\cdots H\cdots H}$ transition state. Rotate the surface and drag the viewpoint: the reaction path descends the pass, and the contour map below shows the hyperbolas through the saddle that mark it as *the* bottleneck — the geometric content of transition-state theory.
:::

## Classical trajectories and the reactive cross-section

On a surface, a classical collision is a **trajectory**: given the relative speed $g$, the approach geometry, and the internal states, Newton's equations carry the nuclei across the surface. The one geometric quantity that survives the averaging is the **impact parameter** $b$ — the perpendicular offset between the incoming atom and the centre of the molecule, so that $b = 0$ is a head-on collision. For each collision energy $E$ and each $b$ there is a probability $P(E, b)$ that the collision reacts; the measurable object is the **reactive cross-section**

$$
\sigma(E) = \int_0^\infty P(E, b)\, 2\pi b\, \mathrm{d}b,
$$

the effective target area the molecule presents at energy $E$: multiply $\sigma$ by the target number density and you have the probability per unit path length that the projectile reacts.

::: definition Reactive cross-section {#def-xsec}
The **reactive cross-section** $\sigma(E)$ of an elementary gas-phase reaction is $\sigma(E) = \int_0^\infty P(E,b)\,2\pi b\,\mathrm{d}b$, where $P(E,b) \in [0,1]$ is the reaction probability of a classical trajectory with collision energy $E$ and impact parameter $b$. It has units of area (typical values $10^{-20}$–$10^{-18}\ \mathrm{m^2}$, i.e. $0.01$–$1\ \mathrm{nm^2}$), and the bimolecular rate constant at temperature $T$ is the thermal average $k(T) = N_\mathrm{A}\,\langle \sigma v \rangle$ over the Maxwell distribution of relative speeds.
:::

::: proposition The line-of-centers model {#prop-loc}
Treat the reactants as hard spheres of collision diameter $d$ whose interaction is repulsive except for a threshold: the collision reacts if and only if the component of the relative kinetic energy *along the line of centres* at contact reaches $E_0$. Since the line-of-centres energy of a trajectory with impact parameter $b$ is $E_\mathrm{lc} = E\left(1 - b^{2}/d^{2}\right)$, reaction requires $b \le b_\text{max} = d\left(1 - E_0/E\right)^{1/2}$, and

$$
\sigma(E) = \pi d^{2}\left(1 - \frac{E_0}{E}\right) = \sigma_0\,\frac{E - E_0}{E} \qquad (E \ge E_0),
$$

with $\sigma = 0$ below threshold: the cross-section rises from zero at $E = E_0$ towards the hard-sphere area $\sigma_0 = \pi d^2$ as $E \rightarrow \infty$.
:::

::: proof Geometry of the line-of-centers cross-section {#proof-loc}
Two hard spheres of diameter $d$ touch when their centres are a distance $d$ apart. If the incoming atom's asymptotic path passes at distance $b$ from the target centre, simple geometry gives $\sin\chi = b/d$ for the angle $\chi$ between the line of centres at contact and the direction of approach, so the velocity component along the line of centres is $g\cos\chi$ and the line-of-centres energy is

$$
E_\mathrm{lc} = \tfrac{1}{2}\mu g^{2}\cos^{2}\chi = E\cos^{2}\chi = E\left(1 - \frac{b^{2}}{d^{2}}\right),
$$

because $\cos^2\chi = 1 - \sin^2\chi = 1 - b^2/d^2$. The postulate of the model is that only $E_\mathrm{lc}$ can cross the barrier: the collision reacts iff $E_\mathrm{lc} \ge E_0$, i.e. iff $E(1 - b^2/d^2) \ge E_0$, i.e. iff $b^2 \le d^2(1 - E_0/E)$. Every $b$ below $b_\text{max} = d(1 - E_0/E)^{1/2}$ reacts with probability one and every $b$ above it misses, so $P(E,b)$ is a step function and

$$
\sigma(E) = \int_0^{b_\text{max}} 2\pi b\,\mathrm{d}b = \pi b_\text{max}^{2} = \pi d^{2}\left(1 - \frac{E_0}{E}\right). \qquad \blacksquare
$$

Note the two limits: at $E = E_0$ only the perfectly head-on collision reacts ($\sigma = 0$ except at $b = 0$), and at $E \gg E_0$ the threshold is forgotten and $\sigma \rightarrow \pi d^2$.
:::

::: example Line-of-centers cross-sections {#ex-loc}
For a reaction with $d = 0.40\ \mathrm{nm}$ and $E_0 = 25\ \mathrm{kJ\,mol^{-1}}$, compute $\sigma$ at $E = 2E_0$ and $E = 4E_0$, and the ratio $\sigma(4E_0)/\sigma(2E_0)$.
::: solution
The hard-sphere area is $\sigma_0 = \pi d^2 = \pi (0.40\ \mathrm{nm})^2 = 0.503\ \mathrm{nm^2}$. At $E = 2E_0$:
$$
\sigma = \sigma_0\left(1 - \frac{E_0}{2E_0}\right) = 0.503 \times 0.500 = 0.251\ \mathrm{nm^2}.
$$
At $E = 4E_0$: $\sigma = 0.503 \times (1 - 0.250) = 0.377\ \mathrm{nm^2}$. The ratio is $0.377/0.251 = 1.50 = \frac{3/4}{1/2}$ exactly — the energies drop out of the ratio, which depends only on how far above threshold you are. Even at four times threshold the target still presents only three-quarters of its hard-sphere area: the outer collisions are too glancing to react.
:::
:::

::: proposition Thermal rate constant from the cross-section {#prop-thermal-k}
The measurable rate constant is the cross-section averaged over the Maxwell–Boltzmann distribution of relative collision energies,
$$
k(T) = N_\mathrm{A}\,\langle \sigma v \rangle = N_\mathrm{A}\int_0^\infty \sigma(E)\, v\, f(E)\, \mathrm{d}E, \qquad v = \sqrt{2E/\mu},
$$
with $f(E) = 2\pi E^{1/2}(\pi k_\mathrm{B}T)^{-3/2} e^{-E/k_\mathrm{B}T}$ the translational-energy distribution. For the line-of-centers $\sigma$ the integral is exactly solvable, because $\sigma(E)\,v \propto (1 - E_0/E)\,E = E - E_0$ is linear in $E$:
$$
k(T) = N_\mathrm{A}\,\pi d^{2}\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/RT}.
$$
The prefactor is precisely the collision-theory rate constant of [[kinetics/collision-theory]] — the **ceiling** no reaction with cross-section $\pi d^2$ can exceed — and the exponential is the Boltzmann fraction of collisions with line-of-centres energy above $E_0$.
:::

::: proof The line-of-centers thermal average {#proof-thermal-k}
Substitute $\sigma(E) = \sigma_0(1 - E_0/E)$ and $v = (2E/\mu)^{1/2}$ into the average. The product $(1 - E_0/E)\sqrt{E}\cdot\sqrt{E} = E - E_0$ collapses the integrand to a single exponential moment:
$$
\langle \sigma v \rangle = \sigma_0\left(\frac{2}{\mu}\right)^{1/2}\frac{2\pi}{(\pi k_\mathrm{B}T)^{3/2}} \int_{E_0}^{\infty} (E - E_0)\, e^{-E/k_\mathrm{B}T}\, \mathrm{d}E.
$$
With $u = E - E_0$ the integral is $e^{-E_0/k_\mathrm{B}T}\int_0^\infty u\, e^{-u/k_\mathrm{B}T}\,\mathrm{d}u = (k_\mathrm{B}T)^{2} e^{-E_0/k_\mathrm{B}T}$. Collecting the powers of $k_\mathrm{B}T$ and $\pi$,
$$
\langle \sigma v \rangle = \sigma_0\left(\frac{2}{\mu}\right)^{1/2}\frac{2\,(k_\mathrm{B}T)^{1/2}}{\pi^{1/2}}\, e^{-E_0/k_\mathrm{B}T} = \sigma_0\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/k_\mathrm{B}T},
$$
and multiplying by $N_\mathrm{A}$ gives the proposition. The mean speed $\langle v\rangle = (8k_\mathrm{B}T/\pi\mu)^{1/2}$ has reappeared exactly as in hard-sphere collision theory: the threshold costs a factor $e^{-E_0/RT}$ and nothing else, because the line-of-centers rule makes the *effective* cross-section linear in $E - E_0$.
:::

::: example Thermal $k$ from the line-of-centers model {#ex-thermal-k}
Estimate the rate constant for $\mathrm{H + H_2}$ at $\mathrm{300\ K}$ from the line-of-centers model with $d = 0.35\ \mathrm{nm}$ and $E_0 = 20\ \mathrm{kJ\,mol^{-1}}$, and compare with the collision-theory ceiling.
::: solution
The reduced mass is $\mu = \tfrac{1}{2}m(\mathrm{H_2}) = 1.008\ \mathrm{u} = 1.674\times10^{-27}\ \mathrm{kg}$, so the mean relative speed is
$$
\langle v \rangle = \left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} = \left(\frac{8 \times 1.381\times10^{-23} \times 300}{\pi \times 1.674\times10^{-27}}\right)^{1/2} = 2.51\times10^{3}\ \mathrm{m\,s^{-1}}.
$$
The ceiling is $k_\text{coll} = N_\mathrm{A}\pi d^2\langle v\rangle = 6.022\times10^{23} \times 3.85\times10^{-19}\ \mathrm{m^2} \times 2.51\times10^{3}\ \mathrm{m\,s^{-1}} = 5.8\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (converting $\mathrm{m^3 \rightarrow dm^3}$ by $10^3$). The threshold factor is $e^{-E_0/RT} = e^{-20\,000/(8.314\times300)} = e^{-8.02} = 3.3\times10^{-4}$, so
$$
k = 5.8\times10^{11} \times 3.3\times10^{-4} = 1.9\times10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
Two lessons in one number. The ceiling is astronomically high — a gas-phase collision is a *violent* opportunity — and a mere $20\ \mathrm{kJ\,mol^{-1}}$ of threshold cuts it by three thousand. Real $\mathrm{H + H_2}$ is slower still, because $P(E,b)$ is not a step function: orientation, vibration and the failure of energy to flow into the reaction coordinate all bleed probability out of the collisions the model counts as certain.
:::
:::

::: widget plot
f: max(0, 1 - e0/x); 1
x: 0.2, 6
y: 0, 1.15
sliders: e0=1:0.5:3:0.1
labels: \text{line-of-centers } \sigma/\sigma_0; \text{hard-sphere ceiling}
caption: The line-of-centers cross-section $\sigma/\sigma_0 = 1 - E_0/E$ (slider `e0` sets $E_0$ in units of the plot's energy scale) against collision energy $E$ in the same units, with the hard-sphere ceiling $\sigma/\sigma_0 = 1$ for comparison. The cross-section is exactly zero below threshold, rises steeply, and creeps towards the ceiling only slowly — at $E = 4E_0$ it is still only $0.75$. Real reactions (points from beam experiments) rarely obey the step: tunnelling rounds the threshold, and long-range attraction can lift $\sigma$ *above* the hard-sphere line.
:::

::: warning The line-of-centers model is a shape, not a fact {#warn-loc}
Every ingredient of the model is false in a useful direction. Real $P(E,b)$ is a smooth function, not a step: trajectories with $E_\mathrm{lc}$ slightly below $E_0$ sometimes react (tunnelling, vibrational assistance) and head-on collisions sometimes do not (energy traps in the wrong mode). The threshold $E_0$ is not the barrier height: zero-point energies, and the corner-cutting of the reaction path, shift it. And $\sigma$ can *exceed* $\pi d^2$ — long-range forces steer molecules in — which is exactly how the harpoon reaction below escaped the collision-theory ceiling that once seemed to demand a steric factor $P > 1$. Use the model the way kineticists do: as the simplest surface on which "threshold" and "orientation" have geometry, and as the derivation that the Arrhenius exponential can be *kinematics*, not thermodynamics.
:::

## Direct reactions: stripping, harpoon, rebound

::: definition Direct and complex-forming reactions {#def-direct-complex}
A **direct reaction** proceeds in a single encounter lasting a few $10^{-13}\ \mathrm{s}$ — the time it takes the partners to pass each other — with the products flying apart before any memory of the approach is lost. A **complex-forming reaction** is trapped in a well of the PES (a van der Waals or insertion minimum) for many vibrational periods, $\ge 10^{-12}\ \mathrm{s}$; the complex rotates, redistributes its energy among all its modes, and decays statistically, so its angular distribution loses memory of the entrance channel and becomes (nearly) symmetric forward/backward. The two mechanisms are read directly off the scattering pattern.
:::

Direct reactions come in three characteristic geometries. **Stripping**: the incoming atom grazes a polyatomic at large $b$, snatches an atom from its outer edge, and both continue nearly forward — products scatter at small angles. **Rebound**: a head-on collision against a repulsive transition state bounces the products backward. **Harpoon**: at a crossing distance $R_\mathrm{c}$ an electron jumps from the metal to the halide, and the resulting $\mathrm{M^+ X^-}$ pair is pulled together by Coulomb's law — the cross-section is set not by contact but by the reach of the ionic attraction.

::: example The harpoon cross-section of $\mathrm{K + CH_3I}$ {#ex-harpoon}
Potassium transfers its valence electron to $\mathrm{CH_3I}$ when the Coulomb stabilization of the ion pair, $e^{2}/4\pi\varepsilon_0 R$, repays the cost $\Delta E = \mathrm{IP}(\mathrm{K}) - \mathrm{EA}(\mathrm{CH_3I}) = 4.34 - 1.90 = 2.44\ \mathrm{eV}$. With $e^{2}/4\pi\varepsilon_0 = 1.440\ \mathrm{eV\,nm}$, find the harpoon radius $R_\mathrm{c}$ and cross-section $\sigma \approx \pi R_\mathrm{c}^{2}$, and compare with a hard-sphere estimate $\pi d^2$, $d = 0.35\ \mathrm{nm}$.
::: solution
The electron jumps where the ionic curve crosses the covalent one:
$$
R_\mathrm{c} = \frac{e^{2}/4\pi\varepsilon_0}{\Delta E} = \frac{1.440\ \mathrm{eV\,nm}}{2.44\ \mathrm{eV}} = 0.590\ \mathrm{nm},
\qquad
\sigma \approx \pi R_\mathrm{c}^{2} = \pi \times (0.590)^{2} = 1.09\ \mathrm{nm^{2}}.
$$
The hard-sphere target is $\pi (0.35\ \mathrm{nm})^2 = 0.38\ \mathrm{nm^2}$, so the harpoon cross-section is $1.09/0.38 = 2.8$ times larger. This is the resolution of the puzzle that opened [[kinetics/collision-theory]]: reactions of alkali metals appeared to have steric factors *above* unity because their true target — the electron-jump radius — is larger than the molecular contact radius. The Coulomb pull then accelerates $\mathrm{CH_3I^-}$ into $\mathrm{CH_3I \rightarrow CH_3 + I^-}$, and the pair's rotation leaves the products rotationally hot.
:::
:::

::: history
The tools of this section were built between 1950 and 1990. Dudley Herschbach's crossed-beams machine at Harvard measured product angular distributions by mechanical rotation and ultraviolet ionization; Yuan T. Lee's beam apparatus at Berkeley added velocity selection, and their combined work — with the interpretation of stripping, rebound and complex lifetimes — earned them the 1986 Nobel Prize in Chemistry, shared with John C. Polanyi, whose infrared chemiluminescence method read the vibrational populations of nascent $\mathrm{HF}$ directly from its emission and revealed that exoergic abstraction reactions dump their energy into product vibration. The LEPS surface used as this lesson's prototype is the work of Fritz London (1937) extended by Henry Eyring, Michael Polanyi and his student Shmuel Sato (1941) — the first quantitative surface of a chemical reaction. Ahmed Zewail's femtochemistry, below, won the 1999 Nobel Prize.
:::

## Crossed molecular beams: one collision at a time

A crossed-beams experiment is a collision microscope. Two supersonic beams — the reagent seeded at a few per cent in Ar or He, expanded through a nozzle so that collisions in the plume freeze rotation and vibration and collimate translation — cross in a vacuum chamber at a known angle. A detector at angle $\theta$ (a quadrupole mass spectrometer after velocity-selecting choppers, or, in modern *velocity-map imaging*, a pulsed ionization laser projecting the product velocities onto a position-sensitive detector) counts products by speed and angle. Because the beams are supersonic, the collision energy is *tunable* by the beam speeds and the crossing angle.

The raw pattern is measured in the laboratory, but the physics lives in the **centre-of-mass (CM) frame**, which moves with the pair at $\mathbf{v}_\text{cm} = (m_\mathrm{A}\mathbf{v}_\mathrm{A} + m_\mathrm{B}\mathbf{v}_\mathrm{B})/(m_\mathrm{A} + m_\mathrm{B})$: in the CM frame the products emerge back-to-back on a sphere of speed fixed by energy conservation, and the angular distribution $T(\theta_\text{CM})$ on that sphere is the reaction's portrait. The reading is direct: **forward scattering** ($\theta_\text{CM} \approx 0°$) says stripping at large $b$; **backward scattering** says rebound off a repulsive, collinear transition state; a distribution **symmetric about $90°$ and peaked sideways** says a complex lived long enough to forget which way it came in.

::: example Collision energy in the centre-of-mass frame {#ex-beam-kin}
A crossed-beams experiment collides $\mathrm{F}$ at $1000\ \mathrm{m\,s^{-1}}$ with $\mathrm{H_2}$ at $2000\ \mathrm{m\,s^{-1}}$ at a crossing angle of $90°$. Compute the relative speed $g$, the collision energy $E_\text{coll} = \tfrac{1}{2}\mu g^{2}$ in $\mathrm{eV}$ and $\mathrm{kJ\,mol^{-1}}$, and compare with the $\mathrm{F + H_2}$ barrier of about $4\ \mathrm{kJ\,mol^{-1}}$.
::: solution
With $m(\mathrm{F}) = 18.998\ \mathrm{u}$ and $m(\mathrm{H_2}) = 2.016\ \mathrm{u}$, the reduced mass is $\mu = (18.998 \times 2.016/21.014)\ \mathrm{u} = 1.823\ \mathrm{u} = 3.026\times10^{-27}\ \mathrm{kg}$. For perpendicular beams,
$$
g = \sqrt{v_\mathrm{F}^{2} + v_{\mathrm{H_2}}^{2}} = \sqrt{(1000)^{2} + (2000)^{2}}\ \mathrm{m\,s^{-1}} = 2236\ \mathrm{m\,s^{-1}},
$$
$$
E_\text{coll} = \tfrac{1}{2}\mu g^{2} = \tfrac{1}{2} \times 3.026\times10^{-27} \times 5.00\times10^{6} = 7.57\times10^{-21}\ \mathrm{J} = \frac{7.57\times10^{-21}}{1.602\times10^{-19}}\ \mathrm{eV} = 0.047\ \mathrm{eV},
$$
i.e. $7.57\times10^{-21} \times 6.022\times10^{23} = 4.6\ \mathrm{kJ\,mol^{-1}}$ per mole of collisions — just above the barrier, exactly the regime where the *disposal* of the reaction's own $137\ \mathrm{kJ\,mol^{-1}}$ dominates the outcome. The CM itself drifts at $v_\text{cm} = 924\ \mathrm{m\,s^{-1}}$ in the lab, which is why a lab-frame detector angle of $90°$ is not a CM scattering angle of $90°$: the kinematic transformation is the first thing every beam paper performs.
:::
:::

::: quiz
A crossed-beams study of $\mathrm{K + CH_3I \rightarrow KI + CH_3}$ finds the $\mathrm{CH_3}$ product strongly peaked at $\theta_\text{CM} \approx 0°$ (forward), with essentially no backward signal. What does the angular distribution indicate?
- [x] A direct stripping (harpoon) mechanism: $\mathrm{K}$ abstracts $\mathrm{I}$ from the outer edge at large impact parameter, and the products keep moving nearly in their original directions.
- [ ] A long-lived complex that rotates many times before breaking apart.
- [ ] A rebound mechanism off a collinear repulsive transition state.
- [ ] That the reaction is barrierless and isotropic.
::: solution
Forward scattering is the signature of stripping: the harpoon electron jump and Coulomb capture pluck iodine off the *far* side of $\mathrm{CH_3I}$ at $b \approx R_\mathrm{c}$, so $\mathrm{KI}$ continues forward and $\mathrm{CH_3}$ recoils forward too. A long-lived complex would give a distribution nearly symmetric about $90°$ (memory lost), and rebound off a repulsive wall would scatter backward. Isotropy would smear forward and backward equally — the opposite of what is seen.
:::
:::

## Energy disposal: Polanyi's rules

::: definition Energy disposal and product state distributions {#def-disposal}
**Energy disposal** is how the exoergicity of an elementary reaction is divided among the internal and translational degrees of freedom of the products. Its observables are the product state distributions — $P(v')$ over vibrational quantum numbers and $P(J')$ over rotational ones — and the fraction $\langle f_V \rangle = E_\text{vib}/E_\text{avail}$ of the available energy sent into vibration. Distributions are emphatically *not* statistical: $\mathrm{F + H_2}$ puts most of its $137\ \mathrm{kJ\,mol^{-1}}$ into a few quanta of HF vibration (population inversion — the basis of the chemical laser), while $\mathrm{K + CH_3I}$ overfills rotation.
:::

::: proposition Polanyi's rules {#prop-polanyi}
For an exoergic abstraction $\mathrm{A + BC \rightarrow AB + C}$ with the barrier at position $s^\ddagger$ along the reaction path (BEP behaviour: early barrier for exoergic reactions, late for endoergic ones):
- **early barrier** (reactant-like TS, e.g. $\mathrm{F + H_2}$): *relative translation* is most effective at driving the reaction, because the TS is reached before BC has stretched and vibrational energy has nothing to contribute;
- **late barrier** (product-like TS, e.g. endoergic abstractions and insertions): *product-like stretch* — reactant vibration — is several times more effective than translation, because the barrier lies where the BC bond is already broken and motion along it crosses the pass.
The rationale is the LEPS/BEP geometry: the barrier's position along the path decides whether the trajectory meets it moving *along* the approach coordinate (translation couples) or *along* the bond being broken (vibration couples). The rules are empirical — a systematised reading of surfaces, not a theorem — and their mirror image governs disposal: an early-barrier exoergic reaction *dumps* energy into product vibration because the path descends the product valley along the AB stretch.
:::

The classic pair of experiments sits on either side of this rule. $\mathrm{F + H_2}$ (early barrier, $E_\mathrm{a} \approx 4\ \mathrm{kJ\,mol^{-1}}$) is driven by cold collisions and emits $\mathrm{HF}(v' = 3)$ — Polanyi's chemiluminescence showed $\langle f_V \rangle \approx 0.6$, translation winning the *entrance* bet and vibration winning the *exit*. At a late barrier the roles reverse: vibrational excitation of the reagent promotes reaction far more efficiently than the same energy in translation, which is why mode-specific chemistry is conceivable at all. The BEP correlation — activation energy linear in reaction enthalpy within a family — places early and late barriers on a single line, and the LEPS surfaces of the 1940s already showed why: the skew diagram of the surface bends the path towards the product valley by an amount set by the exoergicity.

## Femtochemistry: the transition state in time

::: history
Ahmed Zewail's group at Caltech introduced **femtochemistry** in 1987 with a pump–probe study of the dissociation $\mathrm{ICN \rightarrow I + CN}$: a 100-fs ultraviolet pump pulse launches a wavepacket from the ground-state Franck–Condon region onto a repulsive surface, and a delayed probe pulse interrogates the emerging $\mathrm{CN}$ by laser-induced fluorescence as a function of delay. The product signal rises over a few hundred femtoseconds while the reactant signal decays — the first real-time movie of bond breaking, and the work that won the 1999 Nobel Prize in Chemistry.
:::

Pump–probe femtochemistry is the time-domain cousin of the energy-domain beam experiment: instead of sorting products by final state, it stroboscopes the evolving system. What the delay trace actually shows is a **wavepacket** — a quantum spread of geometries — sliding down the surface through the region where the saddle sits.

::: warning Femtochemistry watches wavepackets, not transition states {#warn-femto}
The popular claim that Zewail "photographed the transition state" misstates both halves. The transition state is a *point* — a first-order saddle on a PES, a region a system traverses in $10^{-13}\ \mathrm{s}$ or less, with no lifetime of its own (see [[kinetics/transition-state-theory]]). What femtochemistry measures is the *decay of reactant* and *rise of product* signals, and at best the motion of a wavepacket on the femtosecond *flanks* of the barrier; the saddle itself remains invisible to any pulse, because a pulse that short ($\Delta\nu \sim c/\Delta t$) has a bandwidth wider than the vibrational structure it would need to resolve the TS region. The honest summary: femtochemistry observes the *dynamics around* the transition state with unprecedented fidelity — and confirms the TST picture that the pass is crossed once, fast, and without equilibration.
:::

## Reactions in solution: the diffusion limit

In a liquid the reactants do not fly ballistically to their encounter; they diffuse through solvent. For fast reactions the bottleneck moves from the PES to the hydrodynamics.

::: definition Diffusion-controlled reaction {#def-diffusion}
A reaction is **diffusion-controlled** when every encounter of A and B leads to reaction, so that the observed rate is set by the rate at which diffusion delivers the pair. The classic examples in water at $\mathrm{298\ K}$ are $\mathrm{H^+ + OH^- \rightarrow H_2O}$ ($k \approx 1.4\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, itself proton-hopping enhanced) and many radical recombinations; their activation energies ($\sim 10$–$20\ \mathrm{kJ\,mol^{-1}}$) are those of *viscous flow*, not of bond breaking.
:::

::: proposition The Smoluchowski diffusion-controlled rate {#prop-smoluchowski}
Consider B fixed at the centre of a sphere of radius $R$ (the reaction distance: contact), A diffusing with relative diffusion coefficient $D = D_\mathrm{A} + D_\mathrm{B}$, bulk concentration $c_\mathrm{b}$, and perfect absorption $c(R) = 0$. The steady-state diffusion equation $\nabla^{2}c = 0$ in spherical symmetry gives $c(r) = c_\mathrm{b}(1 - R/r)$, a constant inward flux $J = 4\pi D R\, c_\mathrm{b}$, and a rate constant per pair
$$
k_D = 4\pi D R \quad\Longrightarrow\quad k_D = 4\pi N_\mathrm{A}\,(D_\mathrm{A} + D_\mathrm{B})\,R ,
$$
the last form in $\mathrm{m^{3}\,mol^{-1}\,s^{-1}}$ when $D$ is in $\mathrm{m^{2}\,s^{-1}}$ and $R$ in $\mathrm{m}$. For small solutes in water at $\mathrm{298\ K}$, $k_D \approx 7\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.
:::

::: proof Steady diffusion to a spherical sink {#proof-smoluch}
At steady state the concentration field around the sink obeys Fick's law with no sources: $\partial c/\partial t = D\,\nabla^2 c = 0$, and spherical symmetry reduces the Laplacian to $\nabla^{2}c = r^{-2}\,\partial(r^{2}\,\partial c/\partial r)/\partial r = 0$. Integrating once, $r^{2}\,\partial c/\partial r = \text{const} \equiv A$; integrating again, $c(r) = -A/r + B$. The boundary conditions fix both constants: $c \rightarrow c_\mathrm{b}$ as $r \rightarrow \infty$ gives $B = c_\mathrm{b}$, and perfect absorption at the reaction distance, $c(R) = 0$, gives $A = R\,c_\mathrm{b}$, so
$$
c(r) = c_\mathrm{b}\left(1 - \frac{R}{r}\right).
$$
The concentration rises outward, so the flux is inward; its magnitude through *any* sphere of radius $r$ is Fick's law integrated over the surface,
$$
J = 4\pi r^{2} D\, \frac{\mathrm{d}c}{\mathrm{d}r} = 4\pi r^{2} D \times \frac{c_\mathrm{b} R}{r^{2}} = 4\pi D R\, c_\mathrm{b},
$$
independent of $r$ — as it must be, since every molecule crossing any sphere ends up absorbed (steady state, no accumulation). The rate per unit volume is $J c_\mathrm{b}^{(\text{one B})}$ per B molecule, i.e. $J$ per B with $c_\mathrm{b}$ the concentration of A, so the bimolecular rate constant per molecule is $k_D = J/c_\mathrm{b} = 4\pi D R$; multiplying by $N_\mathrm{A}$ and writing $D = D_\mathrm{A} + D_\mathrm{B}$ (both partners diffuse) gives the molar result. The whole steady-state profile is a $1/r$ depletion shell around every B molecule, maintained by diffusion from the bulk.
:::

::: example The diffusion-controlled rate constant in water {#ex-kd}
Using the Stokes–Einstein relation $D = k_\mathrm{B}T/6\pi\eta r$ (below), compute $D$ for a small solute of radius $r = 0.20\ \mathrm{nm}$ in water at $\mathrm{298.15\ K}$ ($\eta = 0.89\ \mathrm{mPa\,s}$), and $k_D$ for two such species reacting at contact, $R = 0.40\ \mathrm{nm}$.
::: solution
$$
D = \frac{k_\mathrm{B}T}{6\pi\eta r} = \frac{1.381\times10^{-23} \times 298.15}{6\pi \times 8.9\times10^{-4} \times 2.0\times10^{-10}} = 1.23\times10^{-9}\ \mathrm{m^{2}\,s^{-1}},
$$
so $D_\mathrm{A} + D_\mathrm{B} = 2.45\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ and
$$
k_D = 4\pi N_\mathrm{A}(D_\mathrm{A} + D_\mathrm{B})R = 4\pi \times 6.022\times10^{23} \times 2.45\times10^{-9} \times 4.0\times10^{-10} = 7.4\times10^{6}\ \mathrm{m^{3}\,mol^{-1}\,s^{-1}},
$$
that is $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. This is the famous number: in water at room temperature, diffusion can deliver about $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ worth of encounters, so a solution reaction with $k$ near $10^{10}$ is not fast — it is *every-encounter* fast, and its chemistry is invisible to kinetics. Note the justified precision: $\eta$ is known to two figures, so $7.4$ not $7.429$.
:::
:::

::: proposition The Collins–Kimball picture: activation and diffusion in series {#prop-collins-kimball}
An encounter pair $(\mathrm{A\,B})$ is formed at the diffusion rate $k_D$ and can either separate again at rate $k_{-d}$ or react at rate $k_\text{act}$ (the TST rate constant of [[kinetics/transition-state-theory]], the intrinsic barrier climb). The steady state gives
$$
k = \frac{k_D\,k_\text{act}}{k_D + k_\text{act}}
\qquad\Longleftrightarrow\qquad
\frac{1}{k} = \frac{1}{k_D} + \frac{1}{k_\text{act}} ,
$$
so the observed rate constant is always *smaller than both* limits: $k \rightarrow k_\text{act}$ when the barrier dominates ($k_\text{act} \ll k_D$) and $k \rightarrow k_D$ when diffusion dominates. Two steps in series add their resistances — the Ohm's-law structure of consecutive steps from [[kinetics/reaction-mechanisms]] applied to the encounter.
:::

::: example Observed rate from activation and diffusion {#ex-ck}
A solution reaction has intrinsic activation rate constant $k_\text{act} = 2.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and diffusion-controlled encounter supply $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Find $k$ and the fraction of encounters that react.
::: solution
$$
k = \frac{k_D\,k_\text{act}}{k_D + k_\text{act}} = \frac{7.4\times10^{9} \times 2.0\times10^{9}}{(7.4 + 2.0)\times10^{9}} = \frac{14.8}{9.4}\times10^{9} = 1.6\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
The fraction of encounters that react is $k/k_D = 1.57/7.4 = 0.21$: four-fifths of encounter pairs separate without reacting. The observed $k$ sits $21\,\%$ below $k_D$ and $79\,\%$ below $k_\text{act}$ — neither limit alone describes it, which is why Collins and Kimball (1949) wrote the sum of reciprocals: diffusion and activation are *in series*, and the slower one dominates.
:::
:::

::: widget plot
f: kd*x/(kd + x)
x: 0, 30
y: 0, 12
sliders: kd=7.4:2:20:0.2
labels: \text{observed } k
caption: The Collins–Kimball observed rate constant $k = k_D k_\text{act}/(k_D + k_\text{act})$ against the intrinsic activation rate constant $k_\text{act}$ (both in units of $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$), with the diffusion supply $k_D$ set by the slider. For small $k_\text{act}$ the curve is the line $k = k_\text{act}$ (activation control); for large $k_\text{act}$ it saturates at $k = k_D$ (diffusion control) — chemistry beyond the plateau is invisible to the rate law. Slide $k_D$ down (colder, more viscous solvent) and watch the plateau drop: the solvent, not the barrier, then sets the rate.
:::

::: proposition The Debye encounter factor for ions {#prop-debye}
If A and B carry charge numbers $z_\mathrm{A}, z_\mathrm{B}$, the work of bringing them from infinity to the encounter distance $R$ is
$$
w = \frac{z_\mathrm{A} z_\mathrm{B}\, e^{2}}{4\pi\varepsilon_0\, \varepsilon\, r\, k_\mathrm{B}T}
$$
in units of $k_\mathrm{B}T$ (the $r$ in the denominator is $R$), so the encounter pair's equilibrium constant carries the Boltzmann factor $e^{-w}$: like charges are disfavoured, opposites enhanced. The full steady-state Smoluchowski–Debye treatment replaces $e^{-w}$ by $w/(e^{w} - 1)$, which reduces to $e^{-w}$ for strong repulsion and to $1$ as $w \rightarrow 0$.
:::

::: example The work factor for two cations in water {#ex-debye}
Compute $w$ at $\mathrm{298.15\ K}$ for a $+1/+1$ pair with encounter distance $R = 0.7\ \mathrm{nm}$ in water ($\varepsilon = 78.5$), and the encounter factor $e^{-w}$; then state the factor for a $+1/-1$ pair.
::: solution
$$
w = \frac{e^{2}}{4\pi\varepsilon_0\,\varepsilon R k_\mathrm{B}T} = \frac{(1.602\times10^{-19})^{2}}{4\pi \times 8.854\times10^{-12} \times 78.5 \times 7.0\times10^{-10} \times 1.381\times10^{-23} \times 298.15} = 1.02,
$$
so like charges meet at only $e^{-1.02} = 0.36$ of the neutral-molecule encounter rate — a factor of nearly three suppression by the solvent-screened Coulomb repulsion. For the $+1/-1$ pair $w = -1.02$ and the factor is $e^{+1.02} = 2.8$: attraction nearly triples the encounter supply. The full Smoluchowski–Debye factors, $w/(e^{w}-1) = 0.58$ and $1.59$, tell the same story less steeply because the ions drift apart or together *during* the encounter. This is why ionic strengths and solvent permittivity move ionic rate constants so strongly.
:::
:::

**The solvent cage.** A liquid is not empty space with obstacles: each reactant is surrounded by $\sim 10^{2}$ solvent molecules per molecular volume, and an "encounter" is a pair that has shared a cage of solvent for a few picoseconds. Photodissociation makes the cage visible: flash-photolyse $\mathrm{I_2}$ (or a ketone) and the geminate pair $\mathrm{I\cdot\,\cdot I}$ cannot escape in every case — a large fraction recombines *within the cage* before bulk diffusion separates it, so the primary quantum yield $\Phi$ of free atoms is smaller in viscous solvents than in water, and the recombination flash signal decays on the nanosecond escape time. The cage is also why solution rates deviate from Smoluchowski: an encounter pair recrosses the $R$-sphere many times, which is precisely the recrossing that the Collins–Kimball $k_{-d}$ branch absorbs.

::: proposition Stokes–Einstein and the $T/\eta$ law of diffusion control {#prop-stokes-einstein}
A spherical solute of radius $r$ moving in a continuum solvent of viscosity $\eta$ experiences Stokes drag $6\pi\eta r v$, and the Einstein relation $D = k_\mathrm{B}T/f$ between mobility and diffusion gives the **Stokes–Einstein** diffusion coefficient
$$
D = \frac{k_\mathrm{B}T}{6\pi\eta r}.
$$
For two equal solutes of radius $r$ reacting at contact ($D_\mathrm{A} = D_\mathrm{B} = D$, $R = 2r$) the radii cancel exactly in Smoluchowski's result:
$$
k_D = 4\pi N_\mathrm{A}\,(2D)\,(2r) = 16\pi N_\mathrm{A} r\,\frac{k_\mathrm{B}T}{6\pi\eta r} = \frac{8\,N_\mathrm{A} k_\mathrm{B} T}{3\,\eta},
$$
so $k_{D,2}/k_{D,1} = (T_2/T_1)(\eta_1/\eta_2)$: diffusion control has the viscosity of the solvent written into its temperature dependence, and an apparent activation energy of only $RT$ plus the activation energy of viscous flow.
:::

::: example Diffusion control at two temperatures {#ex-visc}
For the water reaction of the Smoluchowski example ($r = 0.20\ \mathrm{nm}$, $R = 0.40\ \mathrm{nm}$), compute $k_D$ at $\mathrm{323.15\ K}$, where $\eta = 0.547\ \mathrm{mPa\,s}$, given $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $\mathrm{298.15\ K}$ ($\eta = 0.89\ \mathrm{mPa\,s}$).
::: solution
Since $k_D \propto T/\eta$,
$$
k_D(323.15) = 7.4\times10^{9} \times \frac{323.15}{298.15} \times \frac{0.89}{0.547} = 7.4\times10^{9} \times 1.084 \times 1.627 = 1.3\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
A $25\ \mathrm{K}$ rise increases the diffusion-controlled rate by a factor of $1.76$ — an apparent activation energy of $-\!R\,\mathrm{d}\ln(T/\eta)/\mathrm{d}(1/T) \approx 19\ \mathrm{kJ\,mol^{-1}}$, dominated by the thinning of the solvent, not by any barrier. The diagnostic is the viscosity itself: if $k\eta/T$ is constant over a temperature or solvent series, the reaction is diffusion-controlled, whatever the Arrhenius plot claims.
:::
:::

::: warning Diffusion control masquerades as a low activation energy {#warn-diffusion}
A reaction with true barrier $E_\text{act} = 40\ \mathrm{kJ\,mol^{-1}}$ but $k_\text{act} = 7.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ in water ($k_D = 7.4\times10^{9}$) is observed at $k = 6.7\times10^{9}$, and differentiating the Collins–Kimball sum gives $E_\text{obs} = (k/k_D)E_D + (k/k_\text{act})E_\text{act} = 0.91\times19 + 0.096\times40 \approx 21\ \mathrm{kJ\,mol^{-1}}$: the Arrhenius plot reports the *diffusion* barrier, half the true one, and the activation entropy looks positive and innocent. Half of all "small activation energy" reports in solution are this artefact. The tests are cheap: vary the viscosity (a diffusion-controlled $k$ tracks $\eta^{-1}$), vary the temperature over a wide range (curvature appears as the two limits separate), and remember that a rate constant within a factor of ten of $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ in water has probably told you only that the barrier is *not* the bottleneck.
:::

::: history
Marian Smoluchowski derived diffusion-limited coagulation and reaction rates in 1917, applying Einstein's 1905 theory of Brownian motion to chemistry — the $4\pi D R$ flux is his. The encounter-pair correction for ions came from Peter Debye's theory of electrolytes; the series combination of activation and diffusion is the 1949 paper of George Collins and Elfreda Kimball. The solvent cage was proposed by James Franck and Eugene Rabinowitsch in 1934 and made visible by flash photolysis — the method of Ronald Norrish and George Porter (Nobel Prize, 1967) that also supplied the geminate-recombination kinetics quoted above.
:::

## Where this leads

This is the end of the course, so it is worth standing back. In 1850 Wilhelmy weighed sugar solutions as they inverted and wrote the first rate law; two centuries of effort later, this chapter has followed the same chemistry down to the single collision and the femtosecond: the rate law of [[kinetics/rate-laws]] is the average over the $\sigma(E)$ of [[#def-xsec]]; the ceiling of [[kinetics/collision-theory]] is the hard-sphere $\pi d^2$; the saddle of [[kinetics/transition-state-theory]] is the pass the trajectories cut; the chains of [[kinetics/chain-reactions]] are sequences of abstraction and addition whose disposal rules decide whether a flame or an explosion follows; the catalysts of [[kinetics/homogeneous-catalysis]] and the surfaces of [[kinetics/surface-kinetics]] are PES engineers, lowering one corner of the landscape while raising another; and the excited states of [[kinetics/photochemistry]] are the reactions that leave the surface altogether. Beyond this course, the same surfaces govern selectivity in organometallic synthesis and industrial catalysis, and the same diffusion limits govern radical lifetimes and ozone chemistry in the atmosphere and the oceans — the environmental and catalysis courses take up exactly these tools. From Wilhelmy's sugar to a single collision at $0.047\ \mathrm{eV}$: the molecule is the same, and so, in the end, is the question — *how does it actually happen?*

::: summary
- The PES is the central object: one surface per electronic state (Born–Oppenheimer), reactant and product valleys joined at a first-order saddle — the transition state of TST — and the reaction path bends around it (LEPS surface of $\mathrm{H + H_2}$).
- A collision is a trajectory with impact parameter $b$; the reactive cross-section is $\sigma(E) = \int P(E,b)\,2\pi b\,\mathrm{d}b$, and $k(T) = N_\mathrm{A}\langle\sigma v\rangle$ recovers collision theory as the hard-sphere ceiling.
- Line-of-centers: $\sigma = \pi d^2(1 - E_0/E)$ and $k = N_\mathrm{A}\pi d^2(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-E_0/RT}$ — the Arrhenius exponential as pure kinematics; real $P(E,b)$ is smooth and $\sigma$ can exceed $\pi d^2$ (harpoon).
- Direct reactions (stripping forward, rebound backward, harpoon at $R_\mathrm{c} = e^2/4\pi\varepsilon_0\Delta E$) scatter anisotropically; long-lived complexes scatter symmetrically because they forget the entrance channel.
- Crossed beams and velocity-map imaging give $T(\theta_\text{CM})$ and the product speed at chosen $E_\text{coll} = \tfrac{1}{2}\mu g^2$; energy disposal follows Polanyi's rules — early barrier: translation drives and vibration fills; late barrier: vibration drives.
- Femtochemistry stroboscopes wavepackets around the saddle; the transition state itself remains a point on a surface, not a photographed species.
- In solution, Smoluchowski gives $k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R \approx 7\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ in water; Collins–Kimball puts $k_D$ and $k_\text{act}$ in series ($1/k = 1/k_D + 1/k_\text{act}$); ions carry the Debye factor $e^{-w}$, $w = z_\mathrm{A}z_\mathrm{B}e^2/4\pi\varepsilon_0\varepsilon R k_\mathrm{B}T$.
- $k_D \propto T/\eta$ (Stokes–Einstein): diffusion control fakes a low activation energy, and the viscosity test exposes it.
:::

## Exercises

::: exercise Collision energy in the CM frame {level=1 check="0.0166"}
For $\mathrm{H + D_2}$ the reduced mass is $0.80\ \mathrm{u}$. What is the collision energy $E_\text{coll} = \tfrac{1}{2}\mu g^2$ for a relative speed $g = 2000\ \mathrm{m\,s^{-1}}$? (Enter it in $\mathrm{eV}$.)
::: solution
$E_\text{coll} = \tfrac{1}{2} \times 0.80 \times 1.6605\times10^{-27} \times (2000)^2 = 2.66\times10^{-21}\ \mathrm{J} = 2.66\times10^{-21}/1.602\times10^{-19} = 0.0166\ \mathrm{eV}$ ($1.6\ \mathrm{kJ\,mol^{-1}}$). Beam collisions are cold: the interesting chemistry of abstraction happens within a few tenths of an $\mathrm{eV}$.
:::
:::

::: exercise Line-of-centers cross-section {level=1 check="0.335"}
For a line-of-centers reaction with $d = 0.40\ \mathrm{nm}$, what is $\sigma$ at $E = 3E_0$? (Enter it in $\mathrm{nm^2}$.)
::: solution
$\sigma = \pi d^2(1 - E_0/3E_0) = \pi \times 0.16 \times \tfrac{2}{3} = 0.335\ \mathrm{nm^2}$, two-thirds of the hard-sphere area $\sigma_0 = 0.503\ \mathrm{nm^2}$. The threshold still costs a third of the target even at three times $E_0$.
:::
:::

::: exercise Stokes–Einstein diffusion coefficient {level=1 check="1.23"}
Compute the diffusion coefficient of a solute of radius $0.20\ \mathrm{nm}$ in water at $\mathrm{298.15\ K}$ ($\eta = 0.89\ \mathrm{mPa\,s}$). (Enter it in units of $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$.)
::: solution
$D = k_\mathrm{B}T/6\pi\eta r = 1.381\times10^{-23} \times 298.15\,/\,(6\pi \times 8.9\times10^{-4} \times 2.0\times10^{-10}) = 1.23\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$. Small-molecule diffusion coefficients in water cluster near $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ — the reason $k_D$ clusters near $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.
:::
:::

::: exercise Smoluchowski rate from given diffusivities {level=2 check="11.4"}
Two species with $D_\mathrm{A} + D_\mathrm{B} = 3.0\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ react at every encounter with $R = 0.50\ \mathrm{nm}$. Compute $k_D$. (Enter it in units of $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.)
::: solution
$k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R = 4\pi \times 6.022\times10^{23} \times 3.0\times10^{-9} \times 5.0\times10^{-10} = 1.14\times10^{7}\ \mathrm{m^{3}\,mol^{-1}\,s^{-1}} = 11.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. The larger $D$'s and the larger capture radius push it above the water benchmark of $7.4\times10^{9}$.
:::
:::

::: exercise Collins–Kimball observed rate {level=2 check="1.9"}
A reaction in water has $k_D = 7.4\times10^{9}$ and $k_\text{act} = 2.6\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. What is the observed $k$? (Enter it in units of $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.)
::: solution
$k = k_D k_\text{act}/(k_D + k_\text{act}) = 7.4\times2.6/(7.4+2.6) = 19.24/10.0 = 1.9$ (in $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$). Check the series structure: $1/k = 1/7.4 + 1/2.6 = 0.52$ (same units), $k = 1.9$. The reaction is mixed-control: $k$ is $73\,\%$ of $k_\text{act}$ and $26\,\%$ of $k_D$.
:::
:::

::: exercise Debye encounter factor {level=2 check="2.77"}
For an oppositely charged pair ($z_\mathrm{A}z_\mathrm{B} = -1$) in water at $\mathrm{298.15\ K}$ with $R = 0.7\ \mathrm{nm}$, $\varepsilon = 78.5$, the work factor is $w = -1.02$. What is the encounter factor $e^{-w}$? (Enter the factor.)
::: solution
$e^{-w} = e^{+1.02} = 2.77$: Coulomb attraction through the water dielectric nearly triples the encounter supply relative to neutral molecules. The same magnitude with like charges gives $e^{-1.02} = 0.36$. The solvent-screened factor $w \propto z_\mathrm{A}z_\mathrm{B}/\varepsilon$ is why ionic rates respond to permittivity and ionic strength.
:::
:::

::: exercise Derive the Smoluchowski result {level=3}
Starting from Fick's second law in spherical symmetry, derive $c(r) = c_\mathrm{b}(1 - R/r)$ and $J = 4\pi D R c_\mathrm{b}$ for a perfectly absorbing sphere, and hence $k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R$. Why is the flux independent of the radius of the sphere you integrate over, and what would a partially absorbing surface ($c(R) > 0$) do to $k$?
::: solution
$\nabla^2 c = r^{-2}(r^2 c')' = 0 \Rightarrow r^2 c' = A \Rightarrow c = -A/r + B$. With $c(\infty) = c_\mathrm{b}$: $B = c_\mathrm{b}$; with $c(R) = 0$: $A = Rc_\mathrm{b}$. Then $J = -4\pi r^2 D c'(r) = 4\pi D A = 4\pi D R c_\mathrm{b}$. The flux is $r$-independent because at steady state nothing accumulates between $R$ and $r$ — every molecule crossing any sphere is absorbed; that conservation is exactly why $k_D$ is a *rate constant*. A partially absorbing surface with first-order reaction probability $\kappa$ at $R$ gives $1/k = 1/k_D + V_R/(N_\mathrm{A}\kappa)$-type series structure: diffusion and activation again in series, which is the Collins–Kimball result in continuum language.
:::
:::

::: exercise From $\sigma(E)$ to $k(T)$: the line-of-centers integral {level=3}
Derive $k(T) = N_\mathrm{A}\pi d^2(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-E_0/RT}$ from $\sigma(E) = \pi d^2(1-E_0/E)$ and the translational-energy distribution $f(E) = 2\pi E^{1/2}(\pi k_\mathrm{B}T)^{-3/2}e^{-E/k_\mathrm{B}T}$, using $\int_{E_0}^{\infty}(E-E_0)e^{-E/k_\mathrm{B}T}\mathrm{d}E = (k_\mathrm{B}T)^2 e^{-E_0/k_\mathrm{B}T}$. Then evaluate $k/k_\text{coll}$ at $\mathrm{300\ K}$ for $E_0 = 20\ \mathrm{kJ\,mol^{-1}}$ and interpret.
::: solution
With $v = (2E/\mu)^{1/2}$, the product of threshold factor and speed simplifies because $(1 - E_0/E)\sqrt{E}\cdot\sqrt{E} = E - E_0$: $\sigma(E)\,v(E) = \pi d^2(2/\mu)^{1/2}(1 - E_0/E)\,E = \pi d^2(2/\mu)^{1/2}(E - E_0)$. Hence
$$
\langle\sigma v\rangle = \pi d^2\left(\frac{2}{\mu}\right)^{1/2}\frac{2\pi}{(\pi k_\mathrm{B}T)^{3/2}} (k_\mathrm{B}T)^2 e^{-E_0/k_\mathrm{B}T} = \pi d^2\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/k_\mathrm{B}T}.
$$
The ratio to the collision ceiling is $k/k_\text{coll} = e^{-E_0/RT} = e^{-20\,000/(8.314\times300)} = e^{-8.02} = 3.3\times10^{-4}$: at $\mathrm{300\ K}$ only about one collision in three thousand carries enough line-of-centres energy, and the entire temperature dependence of this idealised $k$ is that Boltzmann fraction. Real reactions deviate because $P(E,b)$ is smooth — but the exercise is the proof that Arrhenius' exponential is kinematics of the line of centres.
:::
:::
