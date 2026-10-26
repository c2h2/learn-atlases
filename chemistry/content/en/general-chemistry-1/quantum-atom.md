A glass tube of hydrogen, at low pressure, with a voltage across it, does not glow white. It glows a particular pink, and a prism pulls that pink apart into sharp lines: a red one, a blue-green one, and two violet ones, then darkness. A hot solid gives a rainbow. A single atom gives a barcode. The barcode is the atom's way of announcing that the energy of its electron is not a continuous variable. This chapter reads the barcode — first as a wave and a photon, then as Bohr's temporary model of hydrogen, then as the quantum numbers and orbital shapes that replaced the model. The differential equation that actually produces those shapes is not done here. It is the hydrogen atom of [[quantum-chemistry/hydrogen-atom]], and this lesson stops at the results a first course uses.

Throughout, four constants are fixed and are not rounded away in the working: $h = 6.62607015\times 10^{-34}\ \mathrm{J\,s}$, $c = 2.99792458\times 10^{8}\ \mathrm{m\,s^{-1}}$, $R_\mathrm{H} = 1.096776\times 10^{7}\ \mathrm{m^{-1}}$ and $N_\mathrm{A} = 6.02214076\times 10^{23}\ \mathrm{mol^{-1}}$. The Rydberg constant is the one for hydrogen, not the infinite-mass limit, and its unit is reciprocal metres.

## Waves, and the energy of one photon

Light is an electromagnetic wave. The distance between crests is the wavelength $\lambda$, the number of crests passing a point in a second is the frequency $\nu$, and in vacuum the two are locked together by the speed of light.

::: definition Wavelength, frequency and wavenumber {#def-wave}
For an electromagnetic wave in vacuum,
$$
c = \lambda\nu, \qquad \tilde{\nu} = \frac{1}{\lambda} = \frac{\nu}{c}.
$$
The **wavenumber** $\tilde{\nu}$ counts waves per metre. Visible light is a narrow slice of the spectrum, roughly $400$ to $700\ \mathrm{nm}$: violet at the short end, then blue, green, yellow, orange and red. Ultraviolet is shorter than violet, infrared longer than red. A sodium street lamp looks yellow because it emits near $589\ \mathrm{nm}$, not because yellow is a different kind of entity from light.
:::

What the hydrogen tube forces on us is that the energy of this wave is delivered in pieces. Planck, in 1900, had already found that the oscillators in the wall of a hot cavity exchange energy only in amounts $h\nu$. Einstein, in 1905, took the further step: the light itself is made of those amounts.

::: definition The photon {#def-photon}
A **photon** is a quantum of electromagnetic radiation of frequency $\nu$, with energy
$$
E = h\nu = \frac{hc}{\lambda}
$$
and momentum $p = h/\lambda$. The intensity of a beam is the number of photons arriving per second, not the energy of each one. Raising the intensity and raising the frequency are different operations.
:::

The molar quantity is what thermochemistry would recognise. One mole of photons carries $N_\mathrm{A} h\nu$, and a visible photon is worth a few hundred kilojoules per mole — the same order as a chemical bond. That coincidence is why light breaks molecules, and why a radio photon does not.

::: example A blue photon, one and a mole {#ex-photon}
Find the frequency, the energy, and the energy per mole of photons of wavelength $450.0\ \mathrm{nm}$.
::: solution
$$
\nu = \frac{c}{\lambda} = \frac{2.99792458\times 10^{8}}{450.0\times 10^{-9}} = 6.662\times 10^{14}\ \mathrm{Hz}.
$$
$$
E = h\nu = (6.62607015\times 10^{-34})(6.662\times 10^{14}) = 4.414\times 10^{-19}\ \mathrm{J}.
$$
Per mole,
$$
E_\mathrm{m} = N_\mathrm{A} E = (6.02214076\times 10^{23})(4.414\times 10^{-19}) = 2.658\times 10^{5}\ \mathrm{J\,mol^{-1}} = 265.8\ \mathrm{kJ\,mol^{-1}}.
$$
The wavelength was given to four figures, and the answer keeps them. $266\ \mathrm{kJ\,mol^{-1}}$ is a bond-sized energy: light of this colour is chemically dangerous in a way that a thousand times as much red heat, made of feebler photons, need not be. The same arithmetic at $700\ \mathrm{nm}$ gives only $170.9\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

The cleanest evidence that the piece, not the beam, is what matters is the photoelectric effect. Light falls on a metal surface and electrons come off, but only if the frequency is high enough. Below a threshold frequency $\nu_0$, no electrons leave, however bright the lamp. Above it, they leave at once, and a brighter lamp releases more of them per second without making each one faster. Einstein's equation is a conservation statement for one photon and one electron:

$$
h\nu = \phi + \tfrac{1}{2}m_\mathrm{e} v^{2},
$$

where the **work function** $\phi$ is the energy required to pull an electron out of that metal, and the remainder is the kinetic energy of the freed electron. Caesium, a group-1 metal, has a small work function; a typical textbook value is $\phi = 1.95\ \mathrm{eV}$, with $1\ \mathrm{eV} = 1.602176634\times 10^{-19}\ \mathrm{J}$ exactly. The threshold wavelength is then $hc/\phi = 636\ \mathrm{nm}$. Redder light than that, however intense, does nothing to a caesium surface. Bluer light ejects electrons. The numerical version of this sentence is an exercise.

::: warning Intensity is not energy {#warn-intensity}
A brighter lamp does not make more energetic photons. It makes more photons. Students trained on classical waves expect the energy of a light-driven process to rise smoothly with brightness, and the photoelectric effect is the experiment that kills the expectation: below $\nu_0$ the rate is exactly zero at every intensity, and above $\nu_0$ the kinetic energy of each electron is $h\nu - \phi$, independent of intensity. The same distinction appears in photochemistry. A reaction that needs an ultraviolet photon is not helped by a flood of green ones.
:::

## The hydrogen barcode

Pass the pink glow through a slit and a grating and the rainbow is absent. In its place are lines, at definite wavelengths, on a dark background. Absorption does the complementary thing: white light through cool hydrogen loses exactly those wavelengths the discharge would have emitted. The atom has a set of energy differences, and it will accept or surrender a photon only when $h\nu$ matches one of them.

Johann Balmer, in 1885, found that the four visible lines of hydrogen obey a single arithmetic pattern. Johannes Rydberg generalised it to every line of the atom.

::: proposition The Rydberg formula {#prop-rydberg}
Every line of atomic hydrogen has vacuum wavelength $\lambda$ given by
$$
\frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right), \qquad n_2 > n_1 \ge 1,
$$
with $R_\mathrm{H} = 1.096776\times 10^{7}\ \mathrm{m^{-1}}$. The integer $n_1$ names the series and $n_2$ names the line inside it. The **Lyman** series is $n_1 = 1$ and lies in the ultraviolet. The **Balmer** series is $n_1 = 2$; its visible lines are exactly the four with $n_2 = 3, 4, 5, 6$. The **Paschen** series is $n_1 = 3$ and lies in the infrared. As $n_2 \to \infty$ the lines crowd up against a **series limit** $1/\lambda = R_\mathrm{H}/n_1^{2}$.
:::

The formula is empirical at this stage. Nothing yet says why the integers are there, or why a constant measured on one series predicts all the others. The point of Bohr's model, in the next section, is that it derives the formula. The point of the rest of the century is that the derivation's picture was wrong and the formula survived.

::: example The visible Balmer lines {#ex-balmer}
Compute the vacuum wavelengths of the Balmer lines $n_2 = 3$ and $n_2 = 4$, and the Balmer series limit.
::: solution
For $n_2 = 3$,
$$
\frac{1}{\lambda} = (1.096776\times 10^{7}\ \mathrm{m^{-1}})\left(\frac{1}{4} - \frac{1}{9}\right) = (1.096776\times 10^{7})(0.138889) = 1.52330\times 10^{6}\ \mathrm{m^{-1}},
$$
$$
\lambda = 656.47\ \mathrm{nm}.
$$
For $n_2 = 4$, the factor in parentheses is $1/4 - 1/16 = 0.1875$, so $1/\lambda = 2.05646\times 10^{6}\ \mathrm{m^{-1}}$ and $\lambda = 486.27\ \mathrm{nm}$. The same substitution gives $434.17\ \mathrm{nm}$ for $n_2 = 5$ and $410.29\ \mathrm{nm}$ for $n_2 = 6$. These are vacuum wavelengths. Wavelengths measured in air are shorter by about one part in four thousand, which is why a table may quote $\mathrm{H}\alpha$ as $656.3\ \mathrm{nm}$ and still be describing this line. The colours are red, blue-green, violet and violet. The next line, $n_2 = 7$, falls at $397.12\ \mathrm{nm}$, just outside the visible window: the claim that the visible series has four lines is a computation, not a tradition. The series limit is
$$
\lambda_\infty = \frac{4}{R_\mathrm{H}} = 364.71\ \mathrm{nm},
$$
in the near ultraviolet. Past that limit a cool hydrogen atom in the $n = 2$ level can be ionised by a continuum of wavelengths, not by a line.
:::
:::

::: widget plot
f: 1/4 - 1/x^2
x: 3, 8
y: 0, 0.2
labels: \text{Rydberg term}
caption: The Balmer factor $1/2^{2} - 1/n^{2}$, with the upper quantum number plotted as $x$. Multiply by $R_\mathrm{H} = 1.096776\times 10^{7}\ \mathrm{m^{-1}}$ to obtain the wavenumber. The factor falls toward zero, so successive lines pack together and run into the series limit instead of spreading across the spectrum.
:::

## What Bohr got right, and where the model stops

In 1913 Bohr built a model that produces [[#prop-rydberg]] from three postulates. They are stated here as history, because two of them are false, and the third survives only as a special case of $E = h\nu$.

The postulates were: an electron in a hydrogen atom moves in a circle about the proton without radiating; the angular momentum of that circle is quantised, $m_\mathrm{e}vr = n h/2\pi$, with $n = 1, 2, 3, \ldots$; and radiation happens only when the electron jumps from one allowed circle to another, with the photon carrying the energy difference. Balancing the Coulomb attraction against the centripetal requirement, and inserting the quantised angular momentum, gives a discrete set of energies. Bohr also showed that the constant in front of those energies is the Rydberg constant built out of $e$, $m_\mathrm{e}$, $\varepsilon_0$ and $h$. That numerical success is why the model was believed. The algebra of the force balance is not repeated in this lesson: it assumes the circular orbit the later theory removes, and [[quantum-chemistry/hydrogen-atom]] derives the same energies without one.

::: proposition Bohr energies of hydrogen {#prop-bohr}
On Bohr's model the energy of the level $n$ of hydrogen, measured from the separated electron and proton, is
$$
E_n = -\frac{hc R_\mathrm{H}}{n^{2}} = -\frac{2.179\times 10^{-18}\ \mathrm{J}}{n^{2}} = -\frac{13.60\ \mathrm{eV}}{n^{2}}.
$$
The zero of energy is the ionised atom. Every bound level is negative. For a one-electron ion of nuclear charge $Z$ the same model, still using this $R_\mathrm{H}$, replaces the numerator by $Z^{2} hc R_\mathrm{H}$. The replacement is a good first approximation and is not exact: the true Rydberg constant depends on the reduced mass of the electron–nucleus pair, so $\mathrm{He^{+}}$ and $\mathrm{H}$ do not share $R_\mathrm{H}$ to the last digit.
:::

::: proof
A photon emitted in a jump from $n_2$ down to $n_1$ carries $E_{n_2} - E_{n_1}$, which is positive because $E_{n_2}$ is the less negative:
$$
h\nu = hc R_\mathrm{H}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right).
$$
Divide by $hc$. The left-hand side is $1/\lambda$, and the Rydberg formula falls out. The model therefore does not merely fit one series. Any series is the same set of levels read with a different lower rung, which is why Rydberg's single constant organises the whole spectrum. The series limit $n_2 \to \infty$ is the jump from a level up to $E = 0$, the onset of ionisation from that level.
:::

::: example The ionisation energy of hydrogen {#ex-ie}
Compute the energy required to remove the electron from the ground state of hydrogen, in $\mathrm{kJ\,mol^{-1}}$ and in $\mathrm{eV}$, and the energy required to remove it from $n = 2$.
::: solution
Ionisation from $n = 1$ is the Lyman series limit: $1/\lambda = R_\mathrm{H}$, so
$$
E = hc R_\mathrm{H} = (6.62607015\times 10^{-34})(2.99792458\times 10^{8})(1.096776\times 10^{7}) = 2.179\times 10^{-18}\ \mathrm{J}.
$$
Per mole,
$$
E_\mathrm{m} = (2.179\times 10^{-18})(6.02214076\times 10^{23}) = 1.312\times 10^{6}\ \mathrm{J\,mol^{-1}} = 1312\ \mathrm{kJ\,mol^{-1}}.
$$
Dividing by the electronvolt, $1\ \mathrm{eV} = 1.602176634\times 10^{-19}\ \mathrm{J}$, gives $13.60\ \mathrm{eV}$. From $n = 2$ the level sits at $E_1/4$, so the remaining ionisation energy is $1312/4 = 328.0\ \mathrm{kJ\,mol^{-1}}$, which is $3.400\ \mathrm{eV}$. This $1312\ \mathrm{kJ\,mol^{-1}}$ is the spectroscopic separation of the ground state from the continuum. A thermochemical enthalpy of ionisation at $298.15\ \mathrm{K}$ differs from it by a few kilojoules per mole of thermal bookkeeping; the periodic trends in the next chapter are drawn with rounded spectroscopic values, and that distinction does not move them.
:::
:::

The model earns its place by the derivation just given, and then it has to be retired. Four failures are enough to keep straight, because each of them is a place where a later chapter starts.

First, the energies of hydrogen, and with a $Z^{2}$ and a reduced-mass caveat the energies of other one-electron ions, are what the model gets right. The Rydberg formula is a theorem of the model, not an input.

Second, multi-electron atoms are beyond it. A second electron repels the first, the force is no longer a pure Coulomb attraction to a fixed centre, and there is no integer $n$ whose circles reproduce the spectrum of helium, let alone of iron. The periodic table is a multi-electron fact. Bohr's postulates do not contain it.

Third, the postulates do not produce orbital shapes. They assume a circle of definite radius. The spherical $s$ orbital, the two-lobed $p$ orbital and the four-lobed $d$ orbital are properties of a wavefunction. Nothing in $mvr = nh/2\pi$ draws a nodal plane.

Fourth, the electron does not orbit as a classical particle. A classical charge on a curved trajectory radiates continuously and spirals into the nucleus in a fraction of a second. Atoms are stable. Bohr's first postulate simply forbids the radiation by hand; it does not explain the stability. There is no trajectory to forbid. The angular-momentum postulate is not even numerically right for the levels it was built to save: the ground state of hydrogen has orbital angular momentum zero, not $\hbar$, which is a result of the wave theory and not of this chapter's postulates. What remains of Bohr, once those four sentences are granted, is the Rydberg formula, the quantum number $n$, and the warning that a picture can give the right energies for the wrong reasons.

## A wavelength for matter

In 1924 de Broglie proposed that the relation $p = h/\lambda$, already true of the photon, is true of every particle. An electron with momentum $p$ has a wavelength.

::: definition The de Broglie wavelength {#def-debroglie}
A particle of momentum $p$ has wavelength
$$
\lambda = \frac{h}{p}.
$$
For a non-relativistic particle of mass $m$ and speed $v$, $p = mv$ and $\lambda = h/(mv)$. For an electron whose kinetic energy $K$ is known and is far below the rest energy $511\ \mathrm{keV}$, $p = \sqrt{2m_\mathrm{e} K}$ is the right substitution. The electron mass used here is $m_\mathrm{e} = 9.1093837\times 10^{-31}\ \mathrm{kg}$.
:::

Applied to Bohr's circle, the idea is suggestive and still not the truth. Demanding that a whole number of wavelengths fit around the circumference, $2\pi r = n\lambda$, together with $\lambda = h/(m_\mathrm{e} v)$, is exactly $m_\mathrm{e} vr = nh/2\pi$. De Broglie recovered the angular-momentum postulate as a standing-wave condition. That is why the postulate had worked. It does not restore the circle. A standing wave on a ring is not the three-dimensional orbital, and the ground state, with zero angular momentum, has no ring to stand on.

::: example An electron and a grain of sand {#ex-wave}
Compare the de Broglie wavelength of an electron moving at $2.190\times 10^{6}\ \mathrm{m\,s^{-1}}$ with that of a $1.00\times 10^{-3}\ \mathrm{kg}$ particle moving at $1.00\ \mathrm{m\,s^{-1}}$.
::: solution
For the electron,
$$
\lambda = \frac{6.62607015\times 10^{-34}}{(9.1093837\times 10^{-31})(2.190\times 10^{6})} = 3.321\times 10^{-10}\ \mathrm{m} = 332.1\ \mathrm{pm}.
$$
A length of $332\ \mathrm{pm}$ is a chemical length: atoms are of this size, and an electron moving this fast cannot be placed on a trajectory inside an atom without the wave asserting itself. The speed chosen is the order of the speed Bohr's ground-state circle would have had; the comparison does not require the circle to be real. For the macroscopic particle,
$$
\lambda = \frac{6.62607015\times 10^{-34}}{(1.00\times 10^{-3})(1.00)} = 6.626\times 10^{-31}\ \mathrm{m}.
$$
No experiment resolves a length like that. Matter waves are why electrons diffract through a crystal and why cricket balls do not diffract through a doorway. The formula is the same formula.
:::
:::

## Quantum numbers and the shapes they label

The theory that replaces the orbit is a wave equation for a function $\psi$, the **wavefunction**. Its value is not an observable. Born's rule, which this lesson uses and does not derive, says that $|\psi|^{2}$ is the probability density for finding the electron. The solutions that stay finite, and that give a total probability of one, exist only for certain integer labels. Those labels are the quantum numbers. The shapes students draw — a sphere, a dumbbell, a cloverleaf — are boundary surfaces of $|\psi|^{2}$ for the hydrogen solutions. Drawing them is allowed. Deriving them is [[quantum-chemistry/hydrogen-atom]].

::: definition The four quantum numbers {#def-qn}
A hydrogen orbital is specified by three integers, and an electron in it by a fourth.

| symbol | name | allowed values | what it fixes |
|---|---|---|---|
| $n$ | principal | $1, 2, 3, \ldots$ | the energy $E_n$ in hydrogen, and the overall size |
| $l$ | orbital angular momentum | $0, 1, \ldots, n-1$ | the shape; letters $s, p, d, f$ for $l = 0, 1, 2, 3$ |
| $m_l$ | magnetic | $-l, -l+1, \ldots, +l$ | the orientation of the shape |
| $m_s$ | spin | $+\tfrac{1}{2}$ or $-\tfrac{1}{2}$ | the two spin states of the electron |

There are $n^{2}$ orbitals in a shell of principal number $n$, because $\sum_{l=0}^{n-1}(2l+1) = n^{2}$, and $2n^{2}$ electron states once spin is counted. In hydrogen, and only in hydrogen and other one-electron ions, every orbital of a given $n$ has the same energy. The energy does not depend on $l$.
:::

That last sentence is the hinge into the periodic table. In any atom with two or more electrons the levels of the same $n$ and different $l$ split apart: $2s$ falls below $2p$, $3s$ below $3p$, and $4s$ comes down among the $3d$ levels. The splitting is an electron–electron effect. It is why the periodic table has an $s$ block, a $p$ block and a $d$ block rather than rows of length $2, 8, 18, 32$ glued end to end with no internal structure, and it is the subject of [[general-chemistry-1/periodicity]] and, later, of [[quantum-chemistry/many-electron-atoms]]. Nothing in this paragraph is a Bohr orbit. Bohr had $n$ only.

::: definition Orbital shapes and nodes {#def-orbital}
An **orbital** is a one-electron wavefunction, or, in the drawings, a surface enclosing most of $|\psi|^{2}$. It is not a path. An $s$ orbital ($l = 0$) is spherical and has no angular node. A $p$ orbital ($l = 1$) has two lobes of opposite sign separated by a nodal plane through the nucleus; the three values of $m_l$ correspond to three orientations, drawn as $p_x$, $p_y$ and $p_z$. A $d$ orbital ($l = 2$) has four lobes, or the $d_{z^{2}}$ pattern of two lobes and a ring, and two angular nodes. The number of **angular nodes** is $l$. The number of **radial nodes** — spheres on which the wavefunction vanishes — is $n - l - 1$. The total number of nodes is $n - 1$.
:::

The sign of $\psi$ on the two sides of a nodal plane is not a charge and not a probability. Probability is $|\psi|^{2}$ and does not care about the sign. The sign matters when two orbitals overlap to make a bond, which is a later course; here it is enough not to colour one lobe "negative charge".

::: example Legal quantum numbers, and a node count {#ex-qn}
Which of $(n, l, m_l, m_s) = (3, 2, -1, +\tfrac12)$, $(2, 2, 1, -\tfrac12)$, $(3, 1, -1, +\tfrac12)$ and $(1, 0, 0, 1)$ can label an electron in hydrogen? For every allowed orbital among them, give the number of radial and angular nodes.
::: solution
$(3, 2, -1, +\tfrac12)$ is allowed: $l = 2 \le 3-1$, $m_l = -1$ sits inside $-2, \ldots, +2$, and the spin is one of the two legal values. It is a $3d$ electron. Radial nodes: $3 - 2 - 1 = 0$. Angular nodes: $2$.

$(2, 2, 1, -\tfrac12)$ is forbidden. For $n = 2$ the largest $l$ is $1$. There is no $2d$ orbital.

$(3, 1, -1, +\tfrac12)$ is allowed: a $3p$ electron. Radial nodes: $3 - 1 - 1 = 1$. Angular nodes: $1$, the plane that separates the two lobes.

$(1, 0, 0, 1)$ is forbidden. Spin is $+\tfrac12$ or $-\tfrac12$, never $1$. The orbital part $(1, 0, 0)$ would have been the $1s$ orbital, with no nodes of either kind.

A set of quantum numbers is a label that has already survived the boundary conditions of the wave equation. Inventing a $2d$ electron is not a small slip of notation; it asks for a solution the equation does not have.
:::
:::

::: quiz
Which statement about the Bohr model and the orbital picture is right?
- [x] Bohr's energies reproduce the Rydberg formula for hydrogen, but the electron has no classical orbit, and the postulates do not give $s$, $p$ and $d$ shapes.
- [ ] The model fails for hydrogen and works for many-electron atoms, where the extra electrons stabilise the orbits.
- [ ] The ground-state electron circles the proton with angular momentum $\hbar$, and the circle is the $1s$ orbital.
- [ ] Doubling the intensity of a spectral lamp shifts every hydrogen line to higher frequency.
::: solution
The Rydberg formula is the success; the orbit, the shapes and the multi-electron atom are the failures. The ground state has zero orbital angular momentum, so it is not a circle with $mvr = \hbar$, and a $1s$ orbital is a probability distribution, not that circle redrawn. Intensity changes how bright a line is, not the frequency the level difference demands.
:::
:::

::: history Four numbers and a false orbit {#hist-quantum}
Balmer's formula of 1885 fitted the four visible hydrogen lines with one integer step and no theory at all. Rydberg, by 1888, had written the general difference of inverse squares. Planck's paper of 1900 introduced $h$ for the energy of an oscillator in the wall of a cavity; it did not yet say that light travels as particles. Einstein's 1905 account of the photoelectric effect did. Bohr's model of 1913 derived Rydberg's constant from the electron's charge and mass and Planck's $h$, and for a few years the circular orbit looked like the atom. De Broglie's thesis of 1924 gave the orbit's angular-momentum rule a wave interpretation, $\lambda = h/p$. Schrödinger's equation of 1926, solved for hydrogen in the same year, reproduced Bohr's energies, set the ground-state angular momentum to zero, and replaced the circle by $\psi$. The shapes and the quantum numbers $l$ and $m_l$ in this chapter are that solution, reported without the equation. The equation is [[quantum-chemistry/hydrogen-atom]].
:::

## Where this leads

The quantum numbers are a labelling scheme until they are filled with electrons. The order of that filling, the exclusion principle that caps an orbital at two electrons, and the periodic trends in size and ionisation energy are [[general-chemistry-1/periodicity]]. The derivation that was deliberately not done here — separation of the hydrogen atom in spherical coordinates, the radial equation, the genuine origin of $n$, $l$ and $m_l$ — is [[quantum-chemistry/hydrogen-atom]]. The reason a many-electron atom is not a stack of hydrogen levels, and why $4s$ and $3d$ lie so close that chromium and copper misbehave, is [[quantum-chemistry/many-electron-atoms]]. Ionisation energies computed from $hcR_\mathrm{H}$ are the microscopic end of the enthalpy ledger in [[general-chemistry-1/thermochemistry]]: $1312\ \mathrm{kJ\,mol^{-1}}$ is a reaction enthalpy for $\mathrm{H(g)} \rightarrow \mathrm{H^{+}(g)} + \mathrm{e^{-}}$, read off a spectrum.

::: summary
- $c = \lambda\nu$, and a photon carries $E = h\nu = hc/\lambda$. Intensity counts photons; frequency sets the energy of each one.
- Every hydrogen line obeys $1/\lambda = R_\mathrm{H}(1/n_1^{2} - 1/n_2^{2})$ with $R_\mathrm{H} = 1.096776\times 10^{7}\ \mathrm{m^{-1}}$. The visible Balmer lines are $n = 3, 4, 5, 6 \to 2$, at vacuum wavelengths $656.47$, $486.27$, $434.17$ and $410.29\ \mathrm{nm}$.
- Bohr's levels $E_n = -hcR_\mathrm{H}/n^{2}$ reproduce that formula, and with a $Z^{2}$ factor they approximate one-electron ions. The ground-state ionisation energy is $1312\ \mathrm{kJ\,mol^{-1}}$, or $13.60\ \mathrm{eV}$.
- The model fails for multi-electron atoms, produces no orbital shapes, and treats the electron as a classical particle in orbit. The electron has no such orbit; a classical orbit would radiate and collapse.
- $\lambda = h/p$ gives matter a wavelength. It is chemically large for an atomic electron and negligible for a macroscopic mass. Fitting wavelengths around a circle recovers Bohr's angular-momentum rule without making the circle true.
- Orbitals are labelled by $n$, $l$, $m_l$, with $m_s = \pm\tfrac12$ for the electron. Angular nodes: $l$. Radial nodes: $n - l - 1$. In hydrogen the energy depends on $n$ only; elsewhere it depends on $l$ as well, which is where the periodic table comes from.
- An orbital is a probability distribution for one electron, not a container and not a trajectory. The equation that fixes it is not this chapter's.
:::

## Exercises

::: exercise Green light, per mole {level=1 check="239.3"}
Compute the energy, in $\mathrm{kJ\,mol^{-1}}$, of one mole of photons of wavelength $500.0\ \mathrm{nm}$. Use $h = 6.62607015\times 10^{-34}\ \mathrm{J\,s}$, $c = 2.99792458\times 10^{8}\ \mathrm{m\,s^{-1}}$ and $N_\mathrm{A} = 6.02214076\times 10^{23}\ \mathrm{mol^{-1}}$. Enter the energy in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$$
E = \frac{hc}{\lambda} = \frac{(6.62607015\times 10^{-34})(2.99792458\times 10^{8})}{500.0\times 10^{-9}} = 3.973\times 10^{-19}\ \mathrm{J}.
$$
$$
E_\mathrm{m} = N_\mathrm{A} E / 1000 = 239.3\ \mathrm{kJ\,mol^{-1}}.
$$
Four figures, to match $500.0\ \mathrm{nm}$. This is less than the $265.8\ \mathrm{kJ\,mol^{-1}}$ of the $450.0\ \mathrm{nm}$ photon in [[#ex-photon]]: longer wavelength, smaller quantum.
:::
:::

::: exercise The red hydrogen line {level=1 check="656.47"}
Using $R_\mathrm{H} = 1.096776\times 10^{7}\ \mathrm{m^{-1}}$, compute the vacuum wavelength of the Balmer line from $n = 3$ to $n = 2$. Enter the wavelength in $\mathrm{nm}$.
::: solution
$$
\frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{2^{2}} - \frac{1}{3^{2}}\right) = R_\mathrm{H}\left(\frac{1}{4} - \frac{1}{9}\right) = R_\mathrm{H}\times \frac{5}{36} = 1.52330\times 10^{6}\ \mathrm{m^{-1}},
$$
$$
\lambda = 656.47\ \mathrm{nm}.
$$
Red, and the longest visible line of the series. An air wavelength near $656.3\ \mathrm{nm}$ is the same line after refraction by the air in the spectrometer; the Rydberg formula itself returns the vacuum value.
:::
:::

::: exercise How many states in $n = 2$ {level=1 check="8"}
List the orbitals of the $n = 2$ shell and the number of electron states once spin is included. Enter the number of electron states.
::: solution
For $n = 2$, $l$ is $0$ or $1$. The $l = 0$ subshell is one $2s$ orbital. The $l = 1$ subshell is three $2p$ orbitals, $m_l = -1, 0, +1$. That is $1 + 3 = 4 = n^{2}$ orbitals. Each takes two spins, so there are $8$ electron states. The same count is $2n^{2} = 8$. There is no $2d$ contribution: $l$ stops at $n - 1$.
:::
:::

::: exercise Caesium and a violet lamp {level=2 check="1.15"}
The work function of caesium is $\phi = 1.95\ \mathrm{eV}$ (a typical textbook value), and $1\ \mathrm{eV} = 1.602176634\times 10^{-19}\ \mathrm{J}$. A lamp of wavelength $400.0\ \mathrm{nm}$ shines on the metal. Enter the maximum kinetic energy of an ejected electron, in $\mathrm{eV}$.
::: solution
The photon energy is
$$
E = \frac{hc}{400.0\times 10^{-9}} = 4.966\times 10^{-19}\ \mathrm{J} = \frac{4.966\times 10^{-19}}{1.602176634\times 10^{-19}} = 3.100\ \mathrm{eV}.
$$
Einstein's equation gives $K_\mathrm{max} = 3.100 - 1.95 = 1.15\ \mathrm{eV}$. The work function limits the precision to the hundredth of an electronvolt. The threshold wavelength for this surface is $hc/\phi = 636\ \mathrm{nm}$, so a $700\ \mathrm{nm}$ lamp, at $1.77\ \mathrm{eV}$, ejects nothing however bright it is made. Brightness would change the number of electrons at $400\ \mathrm{nm}$, not the $1.15\ \mathrm{eV}$.
:::
:::

::: exercise A hundred-electronvolt electron {level=2 check="122.6"}
Find the de Broglie wavelength of an electron with kinetic energy $100.0\ \mathrm{eV}$, using $m_\mathrm{e} = 9.1093837\times 10^{-31}\ \mathrm{kg}$ and a non-relativistic momentum. Enter the wavelength in $\mathrm{pm}$.
::: solution
$$
K = (100.0)(1.602176634\times 10^{-19}) = 1.602\times 10^{-17}\ \mathrm{J},
$$
$$
p = \sqrt{2m_\mathrm{e} K} = 5.403\times 10^{-24}\ \mathrm{kg\,m\,s^{-1}},
$$
$$
\lambda = \frac{h}{p} = 1.226\times 10^{-10}\ \mathrm{m} = 122.6\ \mathrm{pm}.
$$
A hundred electronvolts is a few hundredths of a percent of the electron's rest energy, so dropping the relativistic expression for momentum is harmless at these figures. The wavelength is still an atomic one: electrons at this energy diffract from crystal planes. The same kinetic energy given to a proton, two thousand times heavier, would shrink $\lambda$ by about $\sqrt{1836}$.
:::
:::

::: exercise Energy of the blue-green line {level=2 check="246.0"}
Compute the energy, in $\mathrm{kJ\,mol^{-1}}$, of the photon emitted when a hydrogen atom falls from $n = 4$ to $n = 2$. Enter that molar energy.
::: solution
$$
\frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{4} - \frac{1}{16}\right) = R_\mathrm{H}\times \frac{3}{16} = 2.05646\times 10^{6}\ \mathrm{m^{-1}}.
$$
The energy of one mole of such photons is $N_\mathrm{A} hc/\lambda$:
$$
E_\mathrm{m} = (6.02214076\times 10^{23})(6.62607015\times 10^{-34})(2.99792458\times 10^{8})(2.05646\times 10^{6})/10^{3} = 246.0\ \mathrm{kJ\,mol^{-1}}.
$$
Equivalently, the level difference is $1312\,(1/4 - 1/16) = 1312\times 0.1875 = 246.0\ \mathrm{kJ\,mol^{-1}}$. The two routes are the proof of [[#prop-bohr]] read as arithmetic. The wavelength is $486.27\ \mathrm{nm}$, blue-green.
:::
:::

::: exercise From levels to a series limit {level=3 check="364.71"}
Starting from $E_n = -hc R_\mathrm{H}/n^{2}$ and $E = hc/\lambda$ for the photon, derive the Rydberg formula, and then compute the Balmer series limit. Enter the limit wavelength in $\mathrm{nm}$.
::: solution
Emission from $n_2$ to $n_1$ releases
$$
E_{n_2} - E_{n_1} = hc R_\mathrm{H}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right),
$$
and setting that equal to $hc/\lambda$ cancels $hc$ and leaves $1/\lambda = R_\mathrm{H}(1/n_1^{2} - 1/n_2^{2})$. No property of a circular orbit entered this page of the argument: only the level formula and the photon. The Balmer limit is $n_1 = 2$ and $n_2 \to \infty$,
$$
\lambda = \frac{n_1^{2}}{R_\mathrm{H}} = \frac{4}{1.096776\times 10^{7}} = 3.6471\times 10^{-7}\ \mathrm{m} = 364.71\ \mathrm{nm}.
$$
Beyond this wavelength, measured downward, a hydrogen atom excited to $n = 2$ is ionised rather than lifted to a higher bound level. The derivation is also the list of what Bohr got right. It is silent on shapes, on multi-electron atoms, and on whether anything orbits.
:::
:::

::: exercise One-electron helium, and the model's edge {level=3 check="30.39"}
Using $E_n = -Z^{2} hc R_\mathrm{H}/n^{2}$ with the hydrogen $R_\mathrm{H}$, predict the vacuum wavelength of the $n = 2 \to 1$ line of $\mathrm{He^{+}}$. Enter it in $\mathrm{nm}$. Then say, in a sentence each, why this number is not quite the spectroscopic line, and why the same formula cannot be used for neutral helium.
::: solution
$Z = 2$ and the jump is the Lyman-$\alpha$ pattern scaled by $Z^{2} = 4$:
$$
\frac{1}{\lambda} = 4 R_\mathrm{H}\left(1 - \frac{1}{4}\right) = 3 R_\mathrm{H}, \qquad \lambda = \frac{1}{3\times 1.096776\times 10^{7}} = 30.39\ \mathrm{nm}.
$$
The predicted line sits deep in the ultraviolet, at a quarter of the hydrogen Lyman-$\alpha$ wavelength $121.57\ \mathrm{nm}$, because both the $Z^{2}$ and the factor $(1 - 1/4)$ have been applied: $4 \times \tfrac34 = 3$, so the wavelength is $1/3$ of $1/R_\mathrm{H}$, not $1/4$. The number is not quite the true line because $R_\mathrm{H}$ contains the reduced mass of the electron–proton pair. The $\mathrm{He^{+}}$ nucleus is nearly four times heavier, the reduced mass is closer to $m_\mathrm{e}$, and the real constant is slightly larger than $R_\mathrm{H}$, so the real wavelength is slightly shorter. Neutral helium is a two-electron atom. The electrons repel each other, the levels are not $-Z^{2} hc R_\mathrm{H}/n^{2}$, and Bohr's postulates have nothing to say about the repulsion. That is the multi-electron failure in its smallest example.
:::
:::

::: exercise Which of the lines are visible? {level=3 check="2"}
A hydrogen atom in the level $n = 4$ returns to the ground state by every downhill jump the selection of levels allows, including stops on the way. How many distinct lines can appear, and how many of them have vacuum wavelength between $400$ and $700\ \mathrm{nm}$? Enter the number of visible lines.
::: hint
The number of lines is the number of pairs $n_\mathrm{upper} > n_\mathrm{lower}$ with both between $1$ and $4$. Compute a wavelength only for the pairs whose series you cannot already place in the ultraviolet or the infrared.
:::
::: solution
The pairs are $4\to 3$, $4\to 2$, $4\to 1$, $3\to 2$, $3\to 1$ and $2\to 1$: six lines. Lyman jumps ($n_1 = 1$) are all ultraviolet: $2\to 1$ is $121.57\ \mathrm{nm}$, $3\to 1$ is $102.57\ \mathrm{nm}$, $4\to 1$ is $97.25\ \mathrm{nm}$. The jump $4\to 3$ is a Paschen line,
$$
\frac{1}{\lambda} = R_\mathrm{H}\left(\frac{1}{9} - \frac{1}{16}\right), \qquad \lambda = 1875.6\ \mathrm{nm},
$$
infrared. The two Balmer jumps are $3\to 2$ at $656.47\ \mathrm{nm}$ and $4\to 2$ at $486.27\ \mathrm{nm}$, both inside the visible window. So two of the six lines are visible. A discharge looks pink because those two, together with the weaker violet Balmer lines from still higher levels, dominate what an eye can see; most of the atom's spectrum is invisible.
:::
:::
