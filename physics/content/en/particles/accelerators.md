Everything we know about nuclei and particles has come through instruments of two kinds: machines that give particles enough energy to probe or create what we want to study, and detectors that turn the passage of an invisible particle into a signal we can record. Neither is a black box. A cyclotron works because the period of a charged particle in a magnetic field does not depend on its speed, until relativity says it does. A collider beats a fixed-target machine because of an invariant from special relativity. A silicon detector measures energy because it takes $3.6\,\mathrm{eV}$ to make one electron–hole pair, and a tracking chamber measures momentum because a charged particle in a magnetic field moves on a helix whose radius is $p/qB$.

This chapter goes through those principles one at a time. We start with why high energies are needed at all, then build up the accelerators from electrostatic machines to synchrotrons and colliders, with the centre-of-mass energy and the luminosity as the two figures of merit. The second half turns to the interaction of radiation with matter, which is what every detector exploits, and ends with how a modern collider detector identifies the particles that emerge from a collision.

You will need the relativistic kinematics of [[relativity/velocity-energy]] and [[relativity/four-vectors]], the motion of a charge in a magnetic field from [[magnetism/magnetic-force]], and the radiation of an accelerated charge from [[electrodynamics/radiation]]. The threshold formula of [[particles/reactions]] is used throughout. In this chapter it is convenient to measure momentum in $\mathrm{GeV}/c$ and mass in $\mathrm{GeV}/c^2$; then for a particle of unit charge in a field $B$, the radius of curvature $\rho$ satisfies

$$
p\,[\mathrm{GeV}/c] = 0.2998\,B\,[\mathrm{T}]\,\rho\,[\mathrm{m}].
$$ {#eq-rigidity}

This is $p = eB\rho$ with $e\,c = 0.2998\,\mathrm{GeV\,T^{-1}\,m^{-1}}$; the product $B\rho$ is called the **magnetic rigidity**.

## Why high energies {#why}

There are two reasons to accelerate particles, and they correspond to the two halves of this course.

The first is **resolution**. A probe of momentum $p$ resolves structure down to its reduced de Broglie wavelength $\hbar/p$. With $\hbar c = 0.1973\,\mathrm{GeV\,fm}$, a $1\,\mathrm{GeV}$ probe resolves $0.2\,\mathrm{fm}$, a fifth of a proton radius; this is the regime in which the electron–proton experiments at SLAC in 1968 saw point-like constituents inside the proton. A $1\,\mathrm{TeV}$ probe resolves $2\times10^{-4}\,\mathrm{fm}$.

The second is **creation**. To make a particle of mass $M$, the collision must supply at least $Mc^2$ in the centre-of-mass frame, plus whatever else conservation laws require. The $W$ and $Z$ bosons ($80$ and $91\,\mathrm{GeV}/c^2$), the top quark ($173\,\mathrm{GeV}/c^2$) and the Higgs boson ($125\,\mathrm{GeV}/c^2$) each had to wait for a machine that could reach the necessary energy, with enough collisions to make them in measurable numbers.

The energy available for creation is not the beam energy but the **invariant mass** of the colliding system, $\sqrt{s}$, where

$$
s\,c^4 = \Bigl(\sum E\Bigr)^2 - \Bigl\lvert\sum \mathbf{p}\Bigr\rvert^2 c^2 ,
$$

the square of the total energy in the centre-of-mass frame. That is the quantity we will compute for different kinds of machine.

## Accelerating a charge {#accelerating}

Only electric fields change a particle's energy; a magnetic force is perpendicular to the velocity and does no work. Accelerators differ in how they apply the electric field and in whether magnets bring the particle back for another pass.

**Electrostatic machines** apply a single large voltage. John Cockcroft and Ernest Walton built a voltage multiplier of $700\,\mathrm{kV}$ and in 1932 used it to split lithium with protons. Robert Van de Graaff's belt-charged generators (1931 onwards) reach about $25\,\mathrm{MV}$ in pressurised tanks; the limit is electrical breakdown. A particle of charge $q$ falling through potential difference $V$ gains $qV$, so $1\,\mathrm{MV}$ gives a proton $1\,\mathrm{MeV}$.

**Linear accelerators** avoid the breakdown limit by using an oscillating field many times. In Rolf Widerøe's design of 1928 the particle passes through a line of drift tubes connected alternately to the two sides of a radio-frequency supply; inside a tube it is shielded, and it crosses each gap when the field there points the right way. Modern linacs use the travelling or standing wave of an RF cavity. The Stanford Linear Accelerator, $3.2\,\mathrm{km}$ long, accelerated electrons to $20\,\mathrm{GeV}$ from 1966 and later to $50\,\mathrm{GeV}$. A linac has no bending magnets, which matters for electrons, as we will see.

### The cyclotron

Ernest Lawrence's idea of 1929–30 was to bend the particle back with a magnetic field so that one modest RF voltage could be used again and again.

::: theorem Cyclotron frequency {#thm-cyclotron}
A particle of charge $q$, mass $m$ and speed $v \ll c$ moving perpendicular to a uniform magnetic field $B$ moves on a circle of radius $r = mv/qB$ with angular frequency

$$
\omega_c = \frac{qB}{m},
$$ {#eq-cyclotron}

independent of its speed and radius. Relativistically, the radius is $r = p/qB$ and the angular frequency is $\omega = qB/\gamma m$.
:::

::: proof
The magnetic force $q\mathbf{v}\times\mathbf{B}$ is perpendicular to $\mathbf{v}$, so it does no work and the speed is constant. With $\mathbf{v} \perp \mathbf{B}$ its magnitude $qvB$ is constant and always directed perpendicular to the velocity, which is uniform circular motion with centripetal acceleration $v^2/r$. Newton's second law gives $qvB = mv^2/r$, so $r = mv/qB$, and $\omega = v/r = qB/m$.

Relativistically, $\deriv{\mathbf{p}}{t} = q\mathbf{v}\times\mathbf{B}$ with $\mathbf{p} = \gamma m\mathbf{v}$. The force still does no work, so $\gamma$ is constant and $\gamma m\,\deriv{\mathbf{v}}{t} = q\mathbf{v}\times\mathbf{B}$. This is the non-relativistic equation with $m$ replaced by $\gamma m$, so $r = \gamma mv/qB = p/qB$ and $\omega = qB/\gamma m$.
:::

In a cyclotron, two hollow D-shaped electrodes ("dees") sit between the poles of a magnet, with an RF voltage of frequency $\omega_c/2\pi$ across the gap. A particle crosses the gap twice per orbit and is accelerated each time; its radius grows with its speed, but its period does not change, so it stays in step with the RF. It spirals out and is extracted at the edge, radius $R$, with

$$
K_\mathrm{max} = \frac{p_\mathrm{max}^2}{2m} = \frac{(qBR)^2}{2m}.
$$ {#eq-cyclotron-k}

Lawrence and M. Stanley Livingston's 1931 cyclotron, $11\,\mathrm{cm}$ across, gave protons $80\,\mathrm{keV}$; within a few years cyclotrons reached $10$ to $20\,\mathrm{MeV}$.

::: example A medical cyclotron {#ex-cyclotron}
A cyclotron for producing medical isotopes accelerates protons to $10.0\,\mathrm{MeV}$ in a field of $1.50\,\mathrm{T}$. Find the RF frequency and the extraction radius, and estimate how far out of step the protons drift by the end.
::: solution
By [[#eq-cyclotron]], $f = qB/2\pi m = (1.602\times10^{-19})(1.50)/(2\pi \times 1.673\times10^{-27})\,\mathrm{Hz} = 22.9\,\mathrm{MHz}$, a radio frequency.

The final momentum is $pc = \sqrt{2mc^2K} = \sqrt{2 \times 938.27 \times 10.0}\,\mathrm{MeV} = 137.0\,\mathrm{MeV}$, or $0.137\,\mathrm{GeV}/c$, so by [[#eq-rigidity]]

$$
R = \frac{0.1370}{0.2998 \times 1.50}\,\mathrm{m} = 0.305\,\mathrm{m}.
$$

(The relativistic momentum, $pc = \sqrt{K^2 + 2Kmc^2}$, is $137.3\,\mathrm{MeV}$, which changes $R$ by $0.3\%$.) At $10\,\mathrm{MeV}$, $\gamma = 1 + K/mc^2 = 1.0107$, so by the relativistic form of [[#thm-cyclotron]] the orbital frequency has fallen by $1.1\%$. Over the hundreds of turns needed to reach full energy, a $1\%$ slip accumulates to a large phase error. This is why classical cyclotrons stopped at about $20\,\mathrm{MeV}$ for protons, and why modern "isochronous" cyclotrons shape the field to grow with radius, in proportion to $\gamma$.
:::
:::

### The synchrotron

To go far beyond the cyclotron limit, both the magnetic field and the RF frequency are varied in step with the particle's energy, and the particle is kept on a fixed circle. This is the **synchrotron**. Its possibility rests on **phase stability**, discovered independently by Vladimir Veksler (1944) and Edwin McMillan (1945): a particle that arrives at an accelerating cavity slightly late receives a slightly different kick that brings it back towards the synchronous phase, so a bunch of particles oscillates stably about the design orbit while being accelerated. Strong (alternating-gradient) focusing by quadrupole magnets, invented by Ernest Courant, M. Stanley Livingston and Hartland Snyder in 1952, keeps the transverse size of the beam small, which allows small magnets around a large ring.

For a fixed ring, [[#eq-rigidity]] says the maximum momentum is set by the bending field and the radius. That is why high-energy proton machines are large and use superconducting magnets.

::: example The LHC ring {#ex-lhc-ring}
The Large Hadron Collider at CERN occupies a tunnel $26.7\,\mathrm{km}$ in circumference, of which the dipole magnets bend the beam on arcs of radius $\rho = 2804\,\mathrm{m}$. Its superconducting dipoles were designed for $8.33\,\mathrm{T}$. Find the design beam momentum, and the field needed for the $6.8\,\mathrm{TeV}$ beams used in Run 3.
::: solution
By [[#eq-rigidity]], $p = 0.2998 \times 8.33 \times 2804\,\mathrm{GeV}/c = 7.00\times10^3\,\mathrm{GeV}/c$, the design $7\,\mathrm{TeV}$. For $6.8\,\mathrm{TeV}$ (at which $pc \approx E$, since $\gamma = 6800/0.938 = 7250$), $B = 6800/(0.2998 \times 2804) = 8.09\,\mathrm{T}$. Only about two-thirds of the circumference is filled with bending magnets ($2\pi \times 2804\,\mathrm{m} = 17.6\,\mathrm{km}$); the rest holds the straight sections for RF cavities, focusing and the experiments.
:::
:::

### Synchrotron radiation

A charge moving on a circle is accelerating, and it radiates. For electrons this sets the energy limit of circular machines.

::: proposition Energy loss per turn {#prop-synchrotron}
A particle of charge $e$ and energy $E = \gamma mc^2$, with $\beta \approx 1$, moving on a circle of radius $\rho$, radiates per turn the energy

$$
U_0 = \frac{4\pi}{3}\,\frac{e^2}{4\pi\varepsilon_0}\,\frac{\gamma^4}{\rho} .
$$

For electrons this is $U_0\,[\mathrm{keV}] = 88.5\,E^4\,[\mathrm{GeV}^4]/\rho\,[\mathrm{m}]$.
:::

::: proof
The relativistic Larmor formula of [[electrodynamics/radiation]] for an acceleration perpendicular to the velocity gives the radiated power $P = \frac{2}{3}\frac{e^2}{4\pi\varepsilon_0}\frac{\gamma^4 a^2}{c^3}$, with $a = v^2/\rho \approx c^2/\rho$. So $P = \frac{2}{3}\frac{e^2}{4\pi\varepsilon_0}\frac{c\gamma^4}{\rho^2}$. One turn takes $2\pi\rho/c$, so $U_0 = P\cdot 2\pi\rho/c = \frac{4\pi}{3}\frac{e^2}{4\pi\varepsilon_0}\frac{\gamma^4}{\rho}$.

For an electron of $1\,\mathrm{GeV}$, $\gamma = 1000/0.51100 = 1957.0$ and $\gamma^4 = 1.467\times10^{13}$. With $e^2/4\pi\varepsilon_0 = 1.440\times10^{-15}\,\mathrm{MeV\,m}$ and $\rho = 1\,\mathrm{m}$, $U_0 = 4.189 \times 1.440\times10^{-15} \times 1.467\times10^{13}\,\mathrm{MeV} = 0.0885\,\mathrm{MeV}$.
:::

The $\gamma^4$ is decisive. At the same energy, a proton has $\gamma$ smaller by $m_p/m_e = 1836$, and radiates $1836^4 \approx 10^{13}$ times less. The Large Electron–Positron collider (LEP), which occupied the LHC tunnel from 1989 to 2000, reached $104.5\,\mathrm{GeV}$ per beam; with a bending radius of about $3.1\,\mathrm{km}$ each electron lost

$$
U_0 \approx 88.5 \times 104.5^4/3100\,\mathrm{keV} = 3.4\times10^6\,\mathrm{keV} = 3.4\,\mathrm{GeV}
$$

per turn, more than $3\%$ of its energy, all of which had to be restored by RF cavities. That is why the next electron–positron colliders being designed are either linear or much larger rings. The same radiation, emitted in a narrow forward cone of angle about $1/\gamma$, is an intense source of X-rays, and dedicated synchrotron-light sources are built to produce it.

## Fixed targets and colliders {#cm-energy}

::: theorem Centre-of-mass energy {#thm-sqrt-s}
For a beam particle of mass $m_1$ and energy $E_1$ striking a particle of mass $m_2$ at rest,

$$
s\,c^4 = m_1^2c^4 + m_2^2c^4 + 2E_1m_2c^2 .
$$ {#eq-s-fixed}

For two beams of energies $E_1$, $E_2$ and momenta $p_1$, $p_2$ colliding head-on,

$$
s\,c^4 = (E_1 + E_2)^2 - (p_1 - p_2)^2c^2 \approx 4E_1E_2 \quad (E_i \gg m_ic^2).
$$ {#eq-s-collider}
:::

::: proof
For the fixed target, the total four-momentum has energy $E_1 + m_2c^2$ and momentum $\mathbf{p}_1$, so $sc^4 = (E_1 + m_2c^2)^2 - p_1^2c^2 = (E_1^2 - p_1^2c^2) + 2E_1m_2c^2 + m_2^2c^4$, and $E_1^2 - p_1^2c^2 = m_1^2c^4$.

For the head-on collision the momenta are antiparallel, so the total momentum has magnitude $\lvert p_1 - p_2\rvert$. Expanding, $sc^4 = m_1^2c^4 + m_2^2c^4 + 2(E_1E_2 + p_1p_2c^2)$. For ultra-relativistic particles $p_ic \approx E_i$ and the masses are negligible, leaving $4E_1E_2$.
:::

The consequence is stark. At high energy, a fixed-target machine gives $\sqrt{s} \approx \sqrt{2E_1m_2c^2}$, growing only as the square root of the beam energy, because most of the energy goes into moving the centre of mass. A symmetric collider gives $\sqrt{s} = 2E$, all of it available. This was the argument, made by Widerøe and by Donald Kerst and colleagues in the 1950s, for colliding beams. Its price is that two beams are far less dense than a solid target, so collisions are rarer; the luminosity below is the measure of that cost.

::: example Making antiprotons, and what the LHC would need as a fixed target {#ex-sqrt-s}
(a) The Bevatron at Berkeley was designed to produce antiprotons by $p + p \to p + p + p + \bar p$, with a proton beam on a hydrogen target. Find the threshold beam energy. (b) The LHC collides protons at $\sqrt{s} = 13.6\,\mathrm{TeV}$. What beam energy would a fixed-target machine need for the same $\sqrt{s}$?
::: solution
(a) Baryon number conservation forbids making a lone antiproton, so the minimal final state is three protons and an antiproton, $M_f = 4m_p$. With $m_1 = m_2 = m_p$, [[#eq-s-fixed]] at threshold reads $(4m_pc^2)^2 = 2m_p^2c^4 + 2E_1m_pc^2$, so $E_1 = 7m_pc^2$ and the kinetic energy is

$$
K_\mathrm{th} = 6m_pc^2 = 6 \times 0.938\,\mathrm{GeV} = 5.63\,\mathrm{GeV}.
$$

A collider would need only $m_pc^2$ of kinetic energy per beam. The Bevatron's protons, at up to $6.2\,\mathrm{GeV}$, produced the first antiprotons in 1955 (Owen Chamberlain, Emilio Segrè, Clyde Wiegand and Thomas Ypsilantis).

(b) From [[#eq-s-fixed]], $E_1 = (s - 2m_p^2)/2m_p$ in units with $c = 1$:

$$
E_1 = \frac{(13\,600)^2 - 2(0.938)^2}{2 \times 0.938}\,\mathrm{GeV} = 9.86\times10^{7}\,\mathrm{GeV} \approx 10^{17}\,\mathrm{eV}.
$$

That is about $14\,000$ times the LHC beam energy. Cosmic rays of such energies strike the atmosphere, but only a few per square kilometre per year; conversely, an LHC beam on a fixed target would give $\sqrt{s} = \sqrt{2 \times 6800 \times 0.938}\,\mathrm{GeV} = 113\,\mathrm{GeV}$.
:::
:::

::: quiz
A fixed-target experiment doubles its beam energy from $400\,\mathrm{GeV}$ to $800\,\mathrm{GeV}$ (protons on protons). By about what factor does $\sqrt{s}$ increase?
- [ ] 2
- [x] $\sqrt{2} \approx 1.41$
- [ ] 4
- [ ] It does not change, because the target is at rest.
::: solution
For $E_1 \gg m_pc^2$, [[#eq-s-fixed]] gives $s \approx 2E_1m_pc^2$, so $\sqrt{s} \propto \sqrt{E_1}$: doubling the beam energy multiplies $\sqrt{s}$ by $\sqrt{2}$, from $27.4$ to $38.8\,\mathrm{GeV}$. In a symmetric collider, doubling both beam energies doubles $\sqrt{s}$.
:::
:::

### Luminosity

The rate of a process of cross-section $\sigma$ is the cross-section times a property of the machine alone.

::: definition Luminosity {#def-luminosity}
The **luminosity** $\mathcal{L}$ of a collider is defined by

$$
\dot N = \mathcal{L}\,\sigma
$$ {#eq-luminosity}

for the event rate $\dot N$ of any process of cross-section $\sigma$. For $n_b$ bunches per beam, each containing $N_1$ and $N_2$ particles, colliding head-on at revolution frequency $f$, with Gaussian transverse profiles of r.m.s. widths $\sigma_x$, $\sigma_y$ at the collision point,

$$
\mathcal{L} = \frac{f\,n_b\,N_1N_2}{4\pi\sigma_x\sigma_y} .
$$ {#eq-lumi-gauss}

The **integrated luminosity** $\int\mathcal{L}\,\dd t$ is measured in inverse barns; $1\,\mathrm{fb}^{-1} = 10^{39}\,\mathrm{cm}^{-2}$ gives one event for a process of $1\,\mathrm{fb}$.
:::

The formula [[#eq-lumi-gauss]] is proved in the exercises. Luminosity is usually quoted in $\mathrm{cm^{-2}\,s^{-1}}$. To make it large, accelerator physicists squeeze the beams to micrometre sizes at the interaction points and fill the ring with as many intense bunches as the machine tolerates.

::: example LHC luminosity and pile-up {#ex-lumi}
The LHC design has $f = 11.245\,\mathrm{kHz}$, $n_b = 2808$ bunches of $1.15\times10^{11}$ protons, and round beams of r.m.s. size $16.7\,\mu\mathrm{m}$ at the interaction points of ATLAS and CMS. (a) Compute $\mathcal{L}$ from [[#eq-lumi-gauss]]. (b) In Run 3 the experiments were run at about $\mathcal{L} = 2\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}$ with about $2400$ colliding bunches. With an inelastic proton–proton cross-section of $80\,\mathrm{mb}$, find the collision rate and the mean number of simultaneous collisions per bunch crossing.
::: solution
(a) In centimetres, $\sigma_x = \sigma_y = 1.67\times10^{-3}\,\mathrm{cm}$, so

$$
\mathcal{L} = \frac{11\,245 \times 2808 \times (1.15\times10^{11})^2}{4\pi(1.67\times10^{-3})^2}\,\mathrm{cm^{-2}\,s^{-1}} = 1.2\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}.
$$

The beams cross at a small angle to avoid parasitic collisions, which reduces this by a geometric factor of about $0.84$, to the design value $1.0\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}$.

(b) $80\,\mathrm{mb} = 8.0\times10^{-26}\,\mathrm{cm}^2$, so $\dot N = 2\times10^{34} \times 8.0\times10^{-26} = 1.6\times10^9$ collisions per second. Bunches cross $11\,245 \times 2400 = 2.7\times10^7$ times per second, so each crossing has on average $\mu = 1.6\times10^9/2.7\times10^7 \approx 60$ proton–proton collisions, called **pile-up**. The detector must untangle them. By contrast, with a Higgs-boson production cross-section of about $60\,\mathrm{pb}$ at this energy, $1\,\mathrm{fb}^{-1}$ of data contains about $60\,000$ Higgs bosons: one collision in $10^{10}$.
:::
:::

::: application The LHC as of 2026
The LHC first circulated beams on 10 September 2008 and began physics in 2010 at $\sqrt{s} = 7\,\mathrm{TeV}$, then $8\,\mathrm{TeV}$ in 2012, the year of the Higgs discovery. Run 2 (2015–18) at $13\,\mathrm{TeV}$ delivered about $140\,\mathrm{fb}^{-1}$ of physics-quality data to each of ATLAS and CMS. Run 3 began in July 2022 at $13.6\,\mathrm{TeV}$, with luminosity levelled near $2\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}$. As of 2026, CERN's schedule ends Run 3 in mid-2026 and begins the long shutdown for the High-Luminosity LHC, which is planned to start operating around 2030 with levelled luminosities of $5$ to $7.5\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}$ and to collect an integrated luminosity of about $3000\,\mathrm{fb}^{-1}$ or more per experiment over its lifetime. The ring has 1232 superconducting dipole magnets cooled by superfluid helium to $1.9\,\mathrm{K}$.
:::

## Radiation in matter {#matter}

Every detector works by letting the particle deposit some energy and turning that energy into an electrical or optical signal. How a particle deposits energy depends on what it is.

### Charged particles: ionisation

A charged particle passing through matter collides with atomic electrons, ionising and exciting atoms. Each collision takes a small fraction of the energy, so the loss is nearly continuous. Its mean rate was calculated by Hans Bethe (1930, 1932) and Felix Bloch (1933). For a particle of charge $ze$ and speed $\beta c$ much heavier than the electron, in the form tabulated by the PDG,

$$
-\left\langle\deriv{E}{x}\right\rangle = K z^2\frac{Z}{A}\frac{1}{\beta^2}\left[\ln\frac{2m_ec^2\beta^2\gamma^2}{I} - \beta^2 - \frac{\delta}{2}\right],
$$ {#eq-bethe}

with $K = 0.307\,\mathrm{MeV\,cm^2/mol}$, $Z$ and $A$ the atomic number and mass of the medium (so $K Z/A$ is in $\mathrm{MeV\,cm^2/g}$ when $A$ is in $\mathrm{g/mol}$), $I$ the mean excitation energy (about $16Z^{0.9}\,\mathrm{eV}$; $75\,\mathrm{eV}$ for water), and $\delta$ a density correction important at very high energy. Here $\dd x$ is measured in $\mathrm{g/cm^2}$, the mass per unit area traversed, which makes the formula nearly independent of the material.

Three features matter in practice. The loss depends on the particle's velocity, not its mass, so at the same momentum heavier particles are slower and lose more: this is **particle identification by $\dd E/\dd x$**. At low speed the $1/\beta^2$ factor makes the loss rise steeply, so a stopping particle deposits most of its energy at the end of its path, in the **Bragg peak**; this is why proton beams are used in cancer therapy, to deposit dose in a tumour while sparing the tissue in front of it. And at $\beta\gamma \approx 3$ to $4$ the loss has a broad minimum, about $1$ to $2\,\mathrm{MeV\,cm^2/g}$ in most materials; a particle near this minimum is a **minimum-ionising particle**, the typical case for cosmic-ray muons and for most high-energy charged tracks.

::: widget plot
f: 0.1704 (1 + (10^x)^2)/(10^x)^2 (log(2*0.511e6 (10^x)^2/75) - (10^x)^2/(1 + (10^x)^2))
x: -0.5, 4
y: 0, 15
labels: −dE/dx in water, MeV cm^2/g (no density correction)
caption: The Bethe formula [[#eq-bethe]] for a singly charged particle in water ($Z/A = 0.555$, $I = 75\,\mathrm{eV}$) against $\log_{10}(\beta\gamma)$. Find the minimum near $\beta\gamma \approx 3$ ($\log_{10}\beta\gamma \approx 0.5$), at about $2\,\mathrm{MeV\,cm^2/g}$. To the left the loss climbs steeply as the particle slows: the origin of the Bragg peak. To the right it rises slowly, the "relativistic rise"; in real matter the density correction $\delta$ flattens it into a plateau not much above the minimum. Since $\beta\gamma = p/mc$, a pion and a proton of the same momentum sit at different points on this curve.
:::

Electrons and positrons lose energy by ionisation too, but because they are light they also radiate strongly when deflected by nuclei: **bremsstrahlung**. Above a **critical energy** of a few tens of MeV in most materials, radiation dominates, and the electron energy falls as $e^{-x/X_0}$, where $X_0$ is the **radiation length** ($36\,\mathrm{cm}$ in water, $0.56\,\mathrm{cm}$ in lead).

**Cherenkov radiation** is emitted when a charged particle moves through a medium faster than light does there, $\beta > 1/n$. The wavefronts form a cone, like the bow wave of a boat, at angle

$$
\cos\theta_C = \frac{1}{n\beta}.
$$ {#eq-cherenkov}

The energy lost this way is tiny, but the light is directional and has a sharp threshold, which makes it a powerful tool for identifying particles and for detecting neutrinos in large water tanks, such as Super-Kamiokande.

::: widget plot
f: if(x > 1/n, 57.2958 acos(1/(n x)), 0)
x: 0.5, 1
y: 0, 50
sliders: n=1.33:1.0003:1.6:0.0001
labels: Cherenkov angle in degrees
caption: The Cherenkov angle [[#eq-cherenkov]] against $\beta$ for refractive index $n$ (slider). The figure opens at $n = 1.33$, water: no light below $\beta = 0.752$, and an angle approaching $41^\circ$ as $\beta \to 1$. Reduce $n$ towards $1.0003$, a gas, and the threshold moves very close to $\beta = 1$ with a small maximum angle. A detector filled with a medium of chosen $n$ can be made to fire for pions but not for kaons of the same momentum.
:::

### Photons

A photon does not lose energy gradually. It travels until it interacts, and then it is absorbed or scattered in one event, so a beam is attenuated exponentially, $I = I_0e^{-\mu x}$, as in [[particles/reactions]]. Three processes compete. In the **photoelectric effect** the photon is absorbed by an atom and ejects an electron; it dominates at low energy and in heavy elements (roughly as $Z^4$ to $Z^5$). In **Compton scattering**, dominant around $1\,\mathrm{MeV}$, the photon scatters from an electron, giving it part of its energy. In **pair production**, possible above $2m_ec^2 = 1.022\,\mathrm{MeV}$ in the field of a nucleus, the photon becomes an electron–positron pair; it dominates above about $10\,\mathrm{MeV}$, with mean free path $\tfrac97 X_0$.

### Neutral hadrons and neutrinos

A neutron has no charge and ignores the atomic electrons. It is detected only through a nuclear reaction that produces charged particles: elastic scattering from protons in a hydrogen-rich scintillator, or capture reactions such as $n + {}^{10}\mathrm{B} \to {}^7\mathrm{Li} + \alpha$ or $n + {}^3\mathrm{He} \to p + {}^3\mathrm{H}$ for slow neutrons. Neutrinos interact only weakly, with cross-sections around $10^{-38}\,\mathrm{cm}^2$ per nucleon at $1\,\mathrm{GeV}$; detecting them needs kilotonnes of target. In a collider detector they are not detected at all, but inferred from an imbalance of transverse momentum.

## Detectors {#detectors}

A detector converts the deposited energy into a signal. The main families are:

**Scintillators.** Certain crystals (sodium iodide, caesium iodide, bismuth germanate) and plastics emit light when ionised. A photomultiplier or silicon photodetector converts the light to an electrical pulse proportional to the deposited energy. Scintillators are fast (nanoseconds in plastic) and are used for timing and triggering, and in crystal form for photon energy measurement.

**Gas detectors.** Ionisation in a gas produces electron–ion pairs that drift in an electric field. At low field they are simply collected (an ionisation chamber); at higher field, near a thin anode wire, the electrons multiply in an avalanche (a proportional counter); at higher field still the discharge spreads along the whole wire (the Geiger–Müller counter of 1928, which counts but cannot measure energy). Georges Charpak's multiwire proportional chamber of 1968 put many such wires in one plane and allowed electronic recording of tracks at high rates.

**Semiconductor detectors.** In silicon a charged particle creates one electron–hole pair per $3.6\,\mathrm{eV}$ deposited, about ten times fewer eV per pair than in a gas, so the signal is larger and the statistical fluctuation smaller. Silicon strip and pixel detectors, with features of tens of micrometres, form the inner trackers of collider experiments and locate decay vertices of short-lived particles. Germanium, cooled to liquid-nitrogen temperature, gives the best energy resolution for gamma rays, about $0.1\%$ at $1\,\mathrm{MeV}$.

**Calorimeters.** A calorimeter absorbs the whole energy of a particle in a dense block and measures it. An electron or photon starts an **electromagnetic shower**, alternating bremsstrahlung and pair production until the energies fall below the critical energy, contained in about $20X_0$. A hadron starts a **hadronic shower** of nuclear interactions, longer and more irregular. Calorimeter resolution improves with energy, roughly as $\sigma_E/E \propto 1/\sqrt{E}$, because the number of shower particles grows with $E$.

### Tracking in a magnetic field

A charged particle in a solenoidal field $B$ follows a helix. Its projection on the plane transverse to the field is a circle of radius $\rho$, from which [[#eq-rigidity]] gives the transverse momentum $p_T = 0.2998B\rho$. Over a track length $L$ the circle deviates from a straight line by the **sagitta** $s \approx L^2/8\rho$. For high momenta the sagitta is small and is measured with a few position measurements of micrometre precision, so the momentum resolution worsens in proportion to $p$: tracking is best at low momentum and calorimetry at high energy.

::: example A track in CMS {#ex-track}
The CMS detector has a solenoidal field of $3.8\,\mathrm{T}$. A charged track has a transverse radius of curvature of $2.00\,\mathrm{m}$. Find $p_T$. For a track of $p_T = 100\,\mathrm{GeV}/c$, find the sagitta over $L = 1.0\,\mathrm{m}$ of tracker.
::: solution
By [[#eq-rigidity]], $p_T = 0.2998 \times 3.8 \times 2.00 = 2.28\,\mathrm{GeV}/c$.

For $p_T = 100\,\mathrm{GeV}/c$, $\rho = 100/(0.2998 \times 3.8) = 87.8\,\mathrm{m}$, and

$$
s \approx \frac{L^2}{8\rho} = \frac{(1.0\,\mathrm{m})^2}{8 \times 87.8\,\mathrm{m}} = 1.42\,\mathrm{mm}.
$$

To measure this momentum to $1\%$ needs the sagitta to about $14\,\mu\mathrm{m}$, which is why the silicon tracker's precision matters, and why CMS chose a strong field: at fixed precision, the momentum resolution improves in proportion to $BL^2$.
:::
:::

### Identifying particles

A general-purpose collider detector is built in layers around the collision point, each layer good at one thing, and a particle is identified by the pattern of signals it leaves.

| particle | inner tracker | electromagnetic calorimeter | hadronic calorimeter | muon chambers |
|---|---|---|---|---|
| electron | curved track | full shower | — | — |
| photon | — | full shower | — | — |
| charged hadron ($\pi^\pm$, $K^\pm$, $p$) | curved track | small deposit | shower | — |
| neutral hadron ($n$, $K^0_L$) | — | small deposit | shower | — |
| muon | curved track | minimum-ionising | minimum-ionising | track |
| neutrino | — | — | — | — (missing $p_T$) |

Muons are identified because they are the only charged particles that pass through metres of iron: they are too heavy to radiate much and do not feel the strong force. Neutrinos show up as **missing transverse momentum**: the momenta transverse to the beam must sum to zero, so an imbalance signals something unseen. To separate charged hadrons from each other, detectors add specific-ionisation, time-of-flight and Cherenkov measurements, all of which measure speed and so, combined with the momentum, give the mass.

::: quiz
An event shows a curved track in the inner tracker, a large shower in the electromagnetic calorimeter matching the track's momentum, nothing in the hadronic calorimeter and nothing in the muon chambers. What was the particle?
- [x] An electron or positron
- [ ] A photon
- [ ] A muon
- [ ] A charged pion
::: solution
A track means the particle was charged, which rules out the photon. A full electromagnetic shower with energy equal to the track momentum, and no hadronic shower, is the electron signature. A muon would leave only a minimum-ionising deposit and reach the muon chambers; a charged pion would deposit most of its energy in the hadronic calorimeter. The sign of the curvature distinguishes $e^-$ from $e^+$.
:::
:::

::: warning The detector measures momentum and speed, not mass
A tracker gives $p$; a time-of-flight or Cherenkov measurement gives $\beta$. The mass follows only from combining them, $m = p\sqrt{1 - \beta^2}/\beta c$, and the separation fades as both particles approach $\beta = 1$. At $10\,\mathrm{GeV}/c$, a pion and a kaon differ in $\beta$ by only $0.1\%$. Quoting a "measured mass" from momentum alone, or comparing particles at the same energy rather than the same momentum, is a common error.
:::

::: history From the cloud chamber to the LHC
Charles Wilson's cloud chamber (1911) made the tracks of charged particles visible as trails of droplets in supersaturated vapour; Carl Anderson found the positron in one in 1932 and, with Seth Neddermeyer, the muon in 1936. Hans Geiger and Walther Müller's counter dates from 1928. Cockcroft and Walton's voltage multiplier and Lawrence's cyclotron both produced their first nuclear results in 1932. Veksler and McMillan discovered phase stability in 1944–45, opening the way to synchrotrons such as the Bevatron, where the antiproton was found in 1955. Donald Glaser invented the bubble chamber in 1952, and its photographs dominated the discovery of hadron resonances in the 1950s and 60s. Charpak's multiwire proportional chamber (1968) began the electronic era. The first hadron collider, CERN's Intersecting Storage Rings, ran from 1971; the proton–antiproton collider at CERN found the $W$ and $Z$ bosons in 1983, Fermilab's Tevatron found the top quark in 1995, and the LHC found the Higgs boson in 2012.
:::

## Where this leads {#leads}

The particles these instruments have revealed, and the interactions among them, are the subject of [[particles/standard-model]]; the discoveries listed in the history note are explained there. The symmetries tested by precise measurements, such as parity violation in beta decay, are in [[particles/symmetries]]. The electromagnetic theory behind accelerator design and synchrotron radiation is in [[electrodynamics/radiation]] and [[electrodynamics/relativistic-fields]].

::: summary
- Resolution needs short wavelengths, $\hbar/p$; creation needs centre-of-mass energy $\sqrt{s}$ above the mass to be made.
- A charge in a magnetic field circles with $\omega = qB/\gamma m$ and radius $p/qB$; $p\,[\mathrm{GeV}/c] = 0.2998\,B\,[\mathrm{T}]\,\rho\,[\mathrm{m}]$. The cyclotron works while $\gamma \approx 1$.
- A synchrotron ramps $B$ and the RF together on a fixed orbit, relying on phase stability and strong focusing. Synchrotron radiation loss per turn is $U_0 = \frac{4\pi}{3}\frac{e^2}{4\pi\varepsilon_0}\frac{\gamma^4}{\rho}$, which limits circular electron machines.
- Fixed target: $s = m_1^2 + m_2^2 + 2E_1m_2$ (with $c = 1$), so $\sqrt{s}$ grows like $\sqrt{E_1}$. Collider: $s \approx 4E_1E_2$.
- Event rate $= \mathcal{L}\sigma$, with $\mathcal{L} = fn_bN_1N_2/4\pi\sigma_x\sigma_y$ for Gaussian beams. The LHC runs near $2\times10^{34}\,\mathrm{cm^{-2}\,s^{-1}}$ with about 60 collisions per crossing.
- Heavy charged particles lose energy by ionisation (Bethe formula), with a minimum near $\beta\gamma \approx 3$ and a Bragg peak at the end of the range. Electrons radiate; photons convert by photoelectric absorption, Compton scattering and pair production.
- Detectors convert deposited energy into signals: scintillators, gas chambers, silicon, calorimeters. Tracking in a magnetic field gives momentum; speed measurements give the mass; layered detectors identify each particle by its signature, and neutrinos by missing transverse momentum.
:::

## Exercises {#exercises}

::: exercise A cyclotron frequency {level=1 check="22.9"}
Find the cyclotron frequency $f = \omega_c/2\pi$, in MHz, of protons in a field of $1.50\,\mathrm{T}$. ($m_p = 1.673\times10^{-27}\,\mathrm{kg}$.)
::: solution
$f = eB/2\pi m_p = (1.602\times10^{-19} \times 1.50)/(2\pi \times 1.673\times10^{-27})\,\mathrm{Hz} = 2.29\times10^7\,\mathrm{Hz} = 22.9\,\mathrm{MHz}$. A deuteron, with twice the mass and the same charge, would circulate at half this frequency in the same field.
:::
:::

::: exercise An electron–proton collider {level=1 check="318"}
The HERA collider at DESY (1992–2007) collided $27.5\,\mathrm{GeV}$ electrons or positrons with $920\,\mathrm{GeV}$ protons head-on. Find $\sqrt{s}$ in GeV.
::: solution
Both particles are ultra-relativistic, so by [[#eq-s-collider]] $\sqrt{s} = 2\sqrt{E_1E_2} = 2\sqrt{27.5 \times 920}\,\mathrm{GeV} = 2\sqrt{25\,300} = 318\,\mathrm{GeV}$. The centre-of-mass frame moves along the proton direction, so the detector was built asymmetric, with more instrumentation on the proton side.
:::
:::

::: exercise Momentum from curvature {level=1 check="0.30"}
A charged track in a $2.00\,\mathrm{T}$ field has transverse radius of curvature $0.500\,\mathrm{m}$. Find $p_T$ in $\mathrm{GeV}/c$.
::: solution
By [[#eq-rigidity]], $p_T = 0.2998 \times 2.00 \times 0.500 = 0.300\,\mathrm{GeV}/c$. The field gives only the momentum component perpendicular to it; the longitudinal component comes from the pitch of the helix.
:::
:::

::: exercise Antiproton threshold {level=2 check="5.63"}
Show that the threshold kinetic energy for $p + p \to p + p + p + \bar p$ on a stationary proton is $6m_pc^2$, and evaluate it in GeV with $m_pc^2 = 0.93827\,\mathrm{GeV}$.
::: solution
Use [[particles/reactions#thm-threshold]] with $m_a = m_X = m_p$ and $M_f = 4m_p$: $K_\mathrm{th} = (16m_p^2 - 4m_p^2)c^2/2m_p = 6m_pc^2 = 5.63\,\mathrm{GeV}$. Equivalently, from [[#eq-s-fixed]], $E_1 = 7m_pc^2$. The non-relativistic estimate $-Q(1 + m_a/m_X) = 2m_pc^2 \times 2 = 4m_pc^2$ is badly wrong here.
:::
:::

::: exercise LEP's radiation bill {level=2 check="3.40"}
Using [[#prop-synchrotron]], find the energy lost per turn, in GeV, by a $104.5\,\mathrm{GeV}$ electron on a bending radius of $3100\,\mathrm{m}$. How much would a proton of the same energy lose?
::: solution
$U_0 = 88.5\,\mathrm{keV} \times 104.5^4/3100 = 88.5 \times 1.1925\times10^8/3100\,\mathrm{keV} = 3.40\times10^6\,\mathrm{keV} = 3.40\,\mathrm{GeV}$. For a proton, $\gamma$ is smaller by $1836.15$, so the loss is smaller by $1836.15^4 = 1.14\times10^{13}$: about $3\times10^{-4}\,\mathrm{eV}$ per turn. (At the LHC's $6.8\,\mathrm{TeV}$ the proton loss is about $6\,\mathrm{keV}$ per turn, small but enough to matter for the cryogenics.)
:::
:::

::: exercise Cherenkov threshold for pions {level=2 check="159"}
Find the minimum momentum, in $\mathrm{MeV}/c$, at which a charged pion ($m_\pi c^2 = 139.57\,\mathrm{MeV}$) emits Cherenkov light in water ($n = 1.33$). What is the threshold for a kaon ($493.68\,\mathrm{MeV}/c^2$)?
::: solution
Threshold is $\beta = 1/n$. Then $\beta\gamma = \beta/\sqrt{1 - \beta^2} = 1/\sqrt{n^2 - 1}$, and $p = m\beta\gamma c$, so

$$
p_\mathrm{th} = \frac{mc}{\sqrt{n^2 - 1}} = \frac{139.57}{\sqrt{0.7689}}\,\mathrm{MeV}/c = 159\,\mathrm{MeV}/c.
$$

For the kaon, $493.68/0.8769 = 563\,\mathrm{MeV}/c$. Between $159$ and $563\,\mathrm{MeV}/c$, a water Cherenkov counter fires for pions and not for kaons.
:::
:::

::: exercise Time of flight {level=2 check="1.06"}
Pions and kaons of momentum $1.00\,\mathrm{GeV}/c$ travel $3.00\,\mathrm{m}$. Find the difference in their flight times, in nanoseconds.
::: solution
The flight time is $t = L/\beta c$ with $1/\beta = E/pc = \sqrt{1 + (mc/p)^2}$. For the pion, $\sqrt{1 + 0.13957^2} = 1.00969$; for the kaon, $\sqrt{1 + 0.49368^2} = 1.11522$. With $L/c = 3.00/2.998\times10^8\,\mathrm{s} = 10.007\,\mathrm{ns}$, the difference is

$$
\Delta t = 10.007 \times (1.11522 - 1.00969)\,\mathrm{ns} = 1.06\,\mathrm{ns}.
$$

Scintillator timing of about $100\,\mathrm{ps}$ separates them comfortably. At $5\,\mathrm{GeV}/c$ the difference falls to about $0.04\,\mathrm{ns}$, since it scales as $1/p^2$.
:::
:::

::: exercise The luminosity of Gaussian beams {level=3}
Two bunches collide head-on. Their particle densities in the transverse plane are $N_i\,g(x, y)$, where $g(x, y) = \exp(-x^2/2\sigma_x^2 - y^2/2\sigma_y^2)/(2\pi\sigma_x\sigma_y)$ is the same normalised Gaussian for both. Show that the number of events per crossing for a process of cross-section $\sigma$ is $\sigma N_1N_2/(4\pi\sigma_x\sigma_y)$, and deduce [[#eq-lumi-gauss]].
::: hint
A particle of bunch 1 at $(x, y)$ sees an areal density $N_2\,g(x, y)$ of bunch-2 particles and reacts with probability $\sigma N_2 g(x, y)$. Integrate over bunch 1. You need $\int_{-\infty}^{\infty} e^{-x^2/\sigma^2}\,\dd x = \sqrt{\pi}\sigma$.
:::
::: solution
By the hint, the expected number of events per crossing is

$$
n = \sigma N_1N_2\int g(x, y)^2\,\dd x\,\dd y = \frac{\sigma N_1N_2}{(2\pi\sigma_x\sigma_y)^2}\int e^{-x^2/\sigma_x^2}\,\dd x\int e^{-y^2/\sigma_y^2}\,\dd y .
$$

The integrals are $\sqrt{\pi}\sigma_x$ and $\sqrt{\pi}\sigma_y$, so $n = \sigma N_1N_2\,\pi\sigma_x\sigma_y/(4\pi^2\sigma_x^2\sigma_y^2) = \sigma N_1N_2/(4\pi\sigma_x\sigma_y)$. Crossings happen $f n_b$ times per second, so the event rate is $\sigma\,fn_bN_1N_2/(4\pi\sigma_x\sigma_y)$, and comparing with [[#eq-luminosity]] gives [[#eq-lumi-gauss]]. The overlap is that of two Gaussians each of width $\sigma$, which is why the factor is $4\pi$ rather than the $2\pi$ of a single Gaussian's normalisation.
:::
:::

::: exercise Asymmetric collisions and the boost {level=3}
(a) For head-on collisions of massless particles of energies $E_1$ and $E_2$, show that the centre-of-mass frame moves along the direction of particle 1 with rapidity $y = \tfrac12\ln(E_1/E_2)$. (b) Show that for a fixed-target collision of a beam of energy $E_1 \gg m$ on a target of mass $m$, the centre-of-mass Lorentz factor is $\gamma_\mathrm{cm} = (E_1 + mc^2)/\sqrt{s}c^2 \approx \sqrt{E_1/2mc^2}$. Evaluate it for the LHC beam on a fixed proton.
::: hint
Rapidity is defined by $\tanh y = \beta$, so $e^{2y} = (1 + \beta)/(1 - \beta)$. The centre-of-mass velocity is $\beta_\mathrm{cm} = \sum pc/\sum E$.
:::
::: solution
(a) The total momentum is $(E_1 - E_2)/c$ and the total energy $E_1 + E_2$, so $\beta_\mathrm{cm} = (E_1 - E_2)/(E_1 + E_2)$. Then $(1 + \beta)/(1 - \beta) = 2E_1/2E_2 = E_1/E_2$, and $y = \tfrac12\ln(E_1/E_2)$. For HERA, $y = \tfrac12\ln(920/27.5) = 1.75$ along the proton direction.

(b) The Lorentz factor of the frame is total energy over invariant mass, $\gamma_\mathrm{cm} = (E_1 + mc^2)/(\sqrt{s}c^2)$. With $sc^4 \approx 2E_1mc^2$ for $E_1 \gg mc^2$, $\gamma_\mathrm{cm} \approx E_1/\sqrt{2E_1mc^2} = \sqrt{E_1/2mc^2}$. For $E_1 = 6800\,\mathrm{GeV}$ and $mc^2 = 0.938\,\mathrm{GeV}$, $\gamma_\mathrm{cm} = \sqrt{3625} = 60$: the products would emerge in a narrow forward cone of angle about $1/60$ radian, and only $\sqrt{s} = 113\,\mathrm{GeV}$ would be available to make new particles.
:::
:::
