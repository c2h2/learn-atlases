By the early 1960s accelerators had produced more than a hundred "elementary" particles: pions, kaons, the $\Lambda$, the $\Sigma$, the $\Xi$, and a growing list of short-lived resonances. Willis Lamb remarked in his 1955 Nobel lecture that the finder of a new particle used to be rewarded with a Nobel Prize but should now be fined. Within twenty years the list had been reduced to a short table: six quarks, six leptons, the force carriers of three interactions, and one scalar particle that was not found until 2012. That table, with the quantum field theory that governs it, is the **Standard Model** of particle physics.

This chapter describes the model at the level of its particles and its interactions. We meet the quarks and leptons and their quantum numbers, the idea of a force as the exchange of a particle and the Feynman diagrams that picture it, then the three interactions in turn: quantum electrodynamics (QED), quantum chromodynamics (QCD) with its colour charge and confinement, and the electroweak theory with the $W$ and $Z$ bosons and the quark-mixing (CKM) matrix. We end with the Higgs field, which gives the $W$, the $Z$ and the fermions their masses, and with the discovery of its boson. The calculations are kept to those that can be done with dimensional analysis and a few standard results, which is surprisingly many.

You will need the relativistic kinematics of [[relativity/four-vectors]], spin and identical particles from [[quantum-1/spin]] and [[quantum-2/identical-particles]], Fermi's golden rule from [[quantum-2/time-dependent]], and the decays and cross-sections of the earlier chapters of this course. We use **natural units** where convenient: $\hbar = c = 1$, energies, momenta and masses in GeV, lengths and times in $\mathrm{GeV}^{-1}$, converted back with $\hbar c = 0.1973\,\mathrm{GeV\,fm}$ and $\hbar = 6.582\times10^{-25}\,\mathrm{GeV\,s}$. All particle data are from the Particle Data Group, *Review of Particle Physics* (2024).

## The particles {#particles}

The matter particles of the Standard Model are spin-$\tfrac12$ fermions in two kinds, **leptons**, which do not feel the strong interaction, and **quarks**, which do. Each comes in three **generations** that are copies of one another with increasing mass.

::: definition Leptons and quarks {#def-fermions}
The **leptons** are the electron $e$, muon $\mu$ and tau $\tau$, each of charge $-1$ (in units of $e$), and their neutrinos $\nu_e$, $\nu_\mu$, $\nu_\tau$, of charge $0$. The **quarks** are the up-type $u$, $c$, $t$, of charge $+\tfrac23$, and the down-type $d$, $s$, $b$, of charge $-\tfrac13$. Every fermion has an antiparticle of opposite charge and opposite additive quantum numbers. Each quark carries one of three **colours**, and each has baryon number $B = \tfrac13$; each lepton has lepton number $L = 1$ in its own family.
:::

| generation | lepton (mass) | neutrino | up-type quark (mass) | down-type quark (mass) |
|---|---|---|---|---|
| 1 | $e$ ($0.511\,\mathrm{MeV}$) | $\nu_e$ | $u$ ($2.16\,\mathrm{MeV}$) | $d$ ($4.70\,\mathrm{MeV}$) |
| 2 | $\mu$ ($105.66\,\mathrm{MeV}$) | $\nu_\mu$ | $c$ ($1.273\,\mathrm{GeV}$) | $s$ ($93.5\,\mathrm{MeV}$) |
| 3 | $\tau$ ($1776.9\,\mathrm{MeV}$) | $\nu_\tau$ | $t$ ($172.6\,\mathrm{GeV}$) | $b$ ($4.18\,\mathrm{GeV}$) |

Neutrino masses are not zero but are below about $0.45\,\mathrm{eV}$ (the KATRIN bound on the electron-neutrino effective mass). The light-quark masses are not the masses of free particles, since quarks are never free; they are parameters of the theory, quoted in a standard renormalisation scheme. The top-quark mass is the value measured directly from its decay products.

Quarks are found only inside **hadrons**: **baryons**, made of three quarks ($qqq$), and **mesons**, made of a quark and an antiquark ($q\bar q$). The proton is $uud$, the neutron $udd$, the $\pi^+$ is $u\bar d$, the $K^+$ is $u\bar s$. Charges add: $uud$ has $\tfrac23 + \tfrac23 - \tfrac13 = 1$. Baryon number is $1$ for every baryon, $0$ for every meson.

The forces are carried by spin-1 **gauge bosons**: the photon $\gamma$ (massless) for electromagnetism; eight **gluons** $g$ (massless, carrying colour) for the strong interaction; and the $W^\pm$ ($80.37\,\mathrm{GeV}$) and $Z^0$ ($91.19\,\mathrm{GeV}$) for the weak interaction. Finally there is one spin-0 particle, the **Higgs boson** $H$ ($125.2\,\mathrm{GeV}$). Gravity is not part of the model; at the energies of particle physics it is weaker than the other interactions by more than thirty orders of magnitude.

::: remark Conservation laws in brief
Every interaction conserves energy, momentum, angular momentum, electric charge, baryon number and (to the precision of all collider experiments) total lepton number. The strong and electromagnetic interactions also conserve the number of each flavour of quark ($u$, $d$, $s$, …) and each separate lepton number. The weak interaction changes quark flavour, which is why a strange particle such as the $\Lambda$ lives for $10^{-10}\,\mathrm{s}$ rather than $10^{-23}\,\mathrm{s}$. Neutrino oscillations show that separate lepton numbers are not exactly conserved. [[particles/symmetries]] treats these laws systematically.
:::

## Forces as exchange {#exchange}

In classical physics a charge produces a field and the field acts on another charge. In quantum field theory the field is quantised, its quanta are particles, and the force between two particles arises from the exchange of field quanta. Hideki Yukawa turned this into a prediction in 1935.

::: theorem Yukawa potential and the range of a force {#thm-yukawa}
A static source of strength $g$ coupled to a field whose quanta have mass $m$ produces, at distance $r$, the potential

$$
V(r) = \frac{g^2}{4\pi}\,\frac{e^{-r/R}}{r}, \qquad R = \frac{\hbar}{mc} .
$$ {#eq-yukawa}

The force therefore has a range of about the reduced Compton wavelength $\hbar/mc$ of the exchanged particle. For $m = 0$ it reduces to the Coulomb form $1/r$.
:::

::: proof
A free field of quanta of mass $m$ obeys the Klein–Gordon equation $\bigl(\tfrac{1}{c^2}\partial_t^2 - \nabla^2 + \mu^2\bigr)\phi = 0$ with $\mu = mc/\hbar$, the wave equation whose plane-wave solutions satisfy $E^2 = p^2c^2 + m^2c^4$. A static point source of strength $g$ at the origin adds a delta function: $(\nabla^2 - \mu^2)\phi = -g\,\delta^3(\mathbf{r})$. We show that $\phi = g e^{-\mu r}/(4\pi r)$ solves this. Away from the origin, for a spherically symmetric function, $\nabla^2\phi = \frac{1}{r}\frac{\dd^2}{\dd r^2}(r\phi)$, and $r\phi \propto e^{-\mu r}$ has second derivative $\mu^2 r\phi$, so $\nabla^2\phi = \mu^2\phi$. At the origin $\phi$ behaves as $g/4\pi r$, whose Laplacian is $-g\,\delta^3(\mathbf{r})$ (Gauss's law for a point charge), while the remaining terms are integrable and contribute nothing to the delta function. A second source of strength $g$ in this field has energy $g\phi$, which is [[#eq-yukawa]].
:::

A heuristic version makes the point without field theory. To emit a particle of mass $m$ from a nucleon at rest violates energy conservation by $mc^2$, which the uncertainty principle tolerates for a time $\Delta t \approx \hbar/mc^2$. In that time the particle travels at most $c\Delta t = \hbar/mc$. Yukawa knew the nuclear force had a range of about $1.4\,\mathrm{fm}$, and predicted a quantum of mass $\hbar c/(1.4\,\mathrm{fm}) = 197/1.4 \approx 140\,\mathrm{MeV}$. The charged pion, mass $139.6\,\mathrm{MeV}$, was found in cosmic rays by Cecil Powell's group in 1947. (The muon, found in 1936 at a similar mass, had been mistaken for it, but it does not feel the strong force.)

The same argument shows why the weak interaction is weak at low energies: the range of $W$ exchange is $\hbar/M_Wc = 0.1973/80.37\,\mathrm{fm} = 2.5\times10^{-3}\,\mathrm{fm}$, far smaller than a nucleon. It looks like a point contact, which is exactly how Fermi modelled beta decay in [[particles/decay]].

### Feynman diagrams

Richard Feynman's diagrams (1948–49) are a bookkeeping device for the terms of perturbation theory, and they also serve as pictures of the processes. Time runs from left to right. A solid line with an arrow is a fermion (an arrow pointing backwards in time is an antifermion); a wavy line is a photon, $W$ or $Z$; a curly line is a gluon; a dashed line is the Higgs boson. Lines meet at **vertices**, each of which conserves charge, momentum and the other conserved quantities, and each contributes a factor of the coupling constant to the amplitude. An internal line, a particle exchanged between two vertices, carries four-momentum $q$ that need not satisfy $q^2 = m^2$; it contributes a **propagator** factor $1/(q^2 - m^2)$.

Here are the three basic vertices in words.

- **QED**: a charged fermion line emits or absorbs a photon. The vertex factor is proportional to the fermion's charge $Q_f e$, and each vertex brings a factor $\sqrt{\alpha}$ to the amplitude, with $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$.
- **QCD**: a quark line emits or absorbs a gluon, changing its colour; and, uniquely, gluons couple to each other at three- and four-gluon vertices. The coupling is $\sqrt{\alpha_s}$.
- **Weak**: a charged-lepton line turns into its neutrino by emitting a $W^-$, or a down-type quark into an up-type quark ($d \to u\,W^-$); or any fermion emits a $Z$ without changing identity.

Neutron beta decay, $n \to p\,e^-\bar\nu_e$, is then the diagram in which one $d$ quark of the neutron emits a virtual $W^-$ and becomes a $u$, and the $W^-$ materialises as $e^-\bar\nu_e$. The other two quarks are spectators. The amplitude has two weak vertices and a $W$ propagator; at momentum transfers $q^2 \ll M_W^2$ the propagator is $-1/M_W^2$, a constant, so the interaction looks like Fermi's point coupling with strength

$$
\frac{G_F}{\sqrt{2}} = \frac{g_W^2}{8M_W^2},
$$ {#eq-gf}

where $g_W$ is the weak coupling. The Fermi constant $G_F = 1.1663788\times10^{-5}\,\mathrm{GeV}^{-2}$ is small because $M_W$ is large, not because $g_W$ is small: $g_W^2/4\pi \approx 1/30$, larger than $\alpha$.

### Counting powers: a cross-section by dimensional analysis

The simplest process in QED is $e^+e^- \to \mu^+\mu^-$: the electron and positron annihilate into a virtual photon, which produces a muon pair. The amplitude has two vertices, so it is proportional to $\alpha$, and the cross-section to $\alpha^2$. At energies far above both masses the only scale is $s$, and a cross-section has dimensions of $\mathrm{energy}^{-2}$ in natural units, so $\sigma \propto \alpha^2/s$. The full calculation (Griffiths §7.8) gives

$$
\sigma(e^+e^- \to \mu^+\mu^-) = \frac{4\pi\alpha^2}{3s}\,(\hbar c)^2 = \frac{86.8\,\mathrm{nb}}{s\,[\mathrm{GeV}^2]} .
$$ {#eq-mumu}

## Quantum electrodynamics {#qed}

QED is the quantum field theory of electrons, positrons and photons, completed by Sin-Itiro Tomonaga, Julian Schwinger, Feynman and Freeman Dyson in 1946–49. Its predictions are expansions in $\alpha$, and because $\alpha$ is small the expansions converge rapidly at first. The electron's magnetic moment anomaly $a_e = (g-2)/2$ has been computed to fifth order in $\alpha$ and agrees with measurement to better than one part in $10^9$ of $a_e$, one of the most precise comparisons of theory and experiment in science.

Two features of QED recur in the other interactions. First, virtual electron–positron pairs **screen** a charge: at short distances, or high momentum transfer, the effective coupling grows, from $1/137$ at low energy to about $1/128$ at $Q = M_Z$. The coupling "runs". Second, QED provides the model for a **gauge theory**: the form of the interaction follows from demanding that the theory be unchanged by a phase rotation of the electron field that varies from point to point. That idea is developed in [[particles/symmetries]].

::: example Muon pairs and the R ratio {#ex-r-ratio}
(a) Evaluate [[#eq-mumu]] at $\sqrt{s} = 10\,\mathrm{GeV}$. (b) The same diagram with the muons replaced by a quark–antiquark pair of charge $Q_q$ gives $\sigma(e^+e^- \to q\bar q) = N_c Q_q^2\,\sigma_{\mu\mu}$ for each quark light enough to be produced, where $N_c$ is the number of colours. Each $q\bar q$ pair turns into hadrons. Predict $R = \sigma(e^+e^- \to \text{hadrons})/\sigma(e^+e^- \to \mu^+\mu^-)$ at $\sqrt{s} = 10\,\mathrm{GeV}$ for $N_c = 1$ and $N_c = 3$. Experiment gives about $3.6$.
::: solution
(a) $s = 100\,\mathrm{GeV}^2$, so $\sigma_{\mu\mu} = 86.8/100\,\mathrm{nb} = 0.868\,\mathrm{nb}$. With a luminosity of $10^{33}\,\mathrm{cm^{-2}\,s^{-1}}$, which is $1\,\mathrm{nb^{-1}\,s^{-1}}$, that is almost one muon pair per second.

(b) At $10\,\mathrm{GeV}$ the quarks $u$, $d$, $s$, $c$ can be produced (pairs of $b$ quarks need about $10.6\,\mathrm{GeV}$ to make $B$ mesons). Summing the squared charges,

$$
\sum_q Q_q^2 = \left(\tfrac23\right)^2 + \left(\tfrac13\right)^2 + \left(\tfrac13\right)^2 + \left(\tfrac23\right)^2 = \frac{10}{9}.
$$

With one colour, $R = 10/9 = 1.11$; with three, $R = 10/3 = 3.33$. The measured value, about $3.6$, rules out $N_c = 1$ decisively. The remaining $8\%$ is the first QCD correction, a factor $1 + \alpha_s/\pi$ from the emission of a gluon, with $\alpha_s \approx 0.18$ at this energy. Each time $\sqrt{s}$ crosses a new quark threshold, $R$ steps up, and the size of each step measures that quark's charge times three.
:::
:::

## Quantum chromodynamics {#qcd}

### Colour

The idea of colour was forced by a paradox. The $\Delta^{++}$ resonance has charge $+2$ and spin $\tfrac32$, so in the quark model it is $uuu$ with all three spins aligned. Its ground state has no orbital angular momentum, so the space, spin and flavour parts of its wavefunction are all symmetric under exchange of any two quarks. But quarks are fermions, and the total wavefunction must be antisymmetric. Oscar Greenberg proposed in 1964, and Moo-Young Han and Yoichiro Nambu in 1965, that quarks carry an extra three-valued quantum number, now called **colour** (red, green, blue), and that the colour wavefunction of every hadron is antisymmetric:

$$
\frac{1}{\sqrt{6}}\sum_{i,j,k}\varepsilon_{ijk}\,\lvert q_i q_j q_k\rangle .
$$

::: definition Colour singlet and colour confinement {#def-singlet}
A state of quarks and gluons is a **colour singlet** if it is unchanged when the colour states of all its constituents are transformed by the same SU(3) matrix. The three-quark state $\frac{1}{\sqrt{6}}\sum\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ and the quark–antiquark state $\frac{1}{\sqrt3}\sum_i\lvert q_i\bar q_i\rangle$ are colour singlets. The **confinement hypothesis** is that every free particle is a colour singlet.
:::

The rule that only colour singlets exist as free particles explains why quarks combine as $qqq$, $\bar q\bar q\bar q$ and $q\bar q$, and not as $qq$ or single quarks. The R ratio above, and the rate of $\pi^0 \to \gamma\gamma$, which is proportional to $N_c^2$, confirm $N_c = 3$.

### Gluons and asymptotic freedom

QCD, the gauge theory of colour, was formulated in 1972–73 (Harald Fritzsch, Murray Gell-Mann and Heinrich Leutwyler). Its force carriers, the gluons, carry colour themselves: a gluon carries one unit of colour and one of anticolour, and of the nine combinations one, the singlet, is absent, leaving eight. Because gluons are charged, they interact with each other, and that changes everything.

In QED, vacuum polarisation screens the charge, so the coupling grows at short distance. In QCD the gluon self-interaction produces an **anti-screening** that wins whenever there are fewer than 17 quark flavours. The strong coupling therefore *decreases* at short distances. David Gross and Frank Wilczek, and independently David Politzer, discovered this **asymptotic freedom** in 1973. At one loop,

$$
\alpha_s(Q^2) = \frac{\alpha_s(\mu^2)}{1 + \dfrac{33 - 2n_f}{12\pi}\,\alpha_s(\mu^2)\ln\dfrac{Q^2}{\mu^2}},
$$ {#eq-running}

where $n_f$ is the number of quark flavours lighter than $Q$. The PDG world average is $\alpha_s(M_Z) = 0.1180 \pm 0.0009$.

::: widget plot
f: a/(1 + (23/(12 pi)) a log(x^2/91.19^2)); (1/128)
x: 2, 300
y: 0, 0.4
sliders: a=0.118:0.10:0.13:0.001
labels: alpha_s(Q), one loop, n_f = 5; alpha(M_Z) = 1/128
caption: The strong coupling [[#eq-running]] against the momentum scale $Q$ in GeV, starting from $\alpha_s(M_Z) = a$ (slider) with five flavours. It falls from about $0.3$ at $2\,\mathrm{GeV}$ to about $0.1$ above $200\,\mathrm{GeV}$, and the fall is logarithmically slow. Follow the curve to the left and see it climb: the one-loop formula blows up near $Q \approx 0.1\,\mathrm{GeV}$, a sign that perturbation theory fails at the scale of hadrons. The flat line is the electromagnetic coupling at $M_Z$, which by comparison barely changes over this range and grows slowly in the other direction.
:::

### Confinement

At large distances the coupling becomes strong, and perturbation theory is useless. Lattice calculations and the spectra of heavy-quark mesons show that the potential between a heavy quark and antiquark is well described by

$$
V(r) = -\frac43\,\frac{\alpha_s\hbar c}{r} + kr, \qquad k \approx 0.9\,\mathrm{GeV/fm},
$$ {#eq-cornell}

a Coulomb-like term from single-gluon exchange (the $\tfrac43$ is a colour factor) and a linear term. The linear term means that the force tends to a constant: the gluon field between the quarks is squeezed into a tube, a **string**, whose energy grows with its length. Pulling a quark out of a hadron would take infinite energy. Long before that, once the string stores more than about twice the mass of a light quark–antiquark pair, it breaks by creating a new pair, and two hadrons emerge instead of a free quark. This is **confinement**. It is supported by every experiment and by numerical lattice QCD, but a proof from the theory's equations is one of the open Millennium Prize problems.

::: widget plot
f: -(4/3) a 0.1973/x + k x
x: 0.05, 2
y: -2, 2
sliders: a=0.3:0.1:0.6:0.01; k=0.9:0.5:1.2:0.01
labels: V(r) in GeV
caption: The quark–antiquark potential [[#eq-cornell]] against $r$ in fm, with $\alpha_s = a$ and string tension $k$ in GeV/fm. At small $r$ the Coulomb term dominates and the curve plunges; beyond about $0.3\,\mathrm{fm}$ it is nearly a straight line. At $r = 1\,\mathrm{fm}$ the string already stores about $0.8\,\mathrm{GeV}$ of energy, enough to create a light quark–antiquark pair and break it. Increase $a$ and notice that the short-distance behaviour changes while the long-distance slope does not: confinement is the linear term.
:::

What experiments see at high energies are **jets**: a quark or gluon produced in a hard collision moves off, the string behind it breaks repeatedly, and a narrow spray of hadrons emerges along its original direction. Two-jet events in $e^+e^-$ collisions follow the angular distribution of spin-$\tfrac12$ quarks, and three-jet events, observed at the PETRA collider at DESY in 1979, were the first direct evidence of the gluon.

The quarks themselves were first seen, as point-like scatterers inside the proton, in the **deep inelastic scattering** experiments of the SLAC–MIT collaboration from 1968 (Jerome Friedman, Henry Kendall, Richard Taylor). The cross-section for electrons to scatter at large momentum transfer was far larger than a smooth proton would allow, and depended on the kinematics in the way James Bjorken had predicted for point-like constituents. Feynman called them **partons**; they are the quarks and gluons.

::: quiz
Why are there eight gluons rather than nine?
- [ ] Because one combination would have charge $\pm1$.
- [x] Because the colour-singlet combination $(r\bar r + g\bar g + b\bar b)/\sqrt{3}$ is not part of the gauge group SU(3), which has $3^2 - 1 = 8$ generators.
- [ ] Because one gluon is identical to the photon.
- [ ] Because gluons, like quarks, are confined, and one of them would be free.
::: solution
The gluons correspond to the generators of SU(3), and the group of $3\times3$ unitary matrices of determinant one has $3^2 - 1 = 8$ generators. Of the nine colour–anticolour combinations, the fully symmetric singlet is invariant under colour rotations; such a gluon would carry no colour, would be a long-range force between colour singlets such as protons, and is not observed. Gluons are electrically neutral, so the first option is wrong.
:::
:::

## The electroweak theory {#electroweak}

### The weak interaction

The weak interaction is responsible for beta decay, the decays of the muon, tau and pion, and the decays of all strange, charm and bottom hadrons. It has features no other interaction has: it changes flavour, it violates parity maximally (only left-handed fermions and right-handed antifermions take part in the charged-current interaction, [[particles/symmetries]]), and its carriers are massive.

::: example The muon lifetime {#ex-muon}
The muon decays as $\mu^- \to e^-\bar\nu_e\nu_\mu$ through a virtual $W$. The Fermi theory, with the electron mass neglected, gives the decay rate

$$
\Gamma = \frac{G_F^2 m_\mu^5}{192\pi^3}
$$

in natural units. Evaluate the lifetime with $m_\mu = 0.105\,658\,\mathrm{GeV}$, and compare with the measured $2.1970\,\mu\mathrm{s}$. Then use the same formula to estimate the $\tau$ lifetime, given that its decay to $e\bar\nu_e\nu_\tau$ has a branching ratio of $17.8\%$.
::: solution
In natural units $\Gamma = (1.16638\times10^{-5})^2(0.105658)^5/(192\pi^3)\,\mathrm{GeV}$. The pieces are $G_F^2 = 1.3604\times10^{-10}\,\mathrm{GeV}^{-4}$, $m_\mu^5 = 1.3165\times10^{-5}\,\mathrm{GeV}^5$ and $192\pi^3 = 5953.0$, so

$$
\Gamma = \frac{1.3604\times10^{-10} \times 1.3165\times10^{-5}}{5953.0}\,\mathrm{GeV} = 3.009\times10^{-19}\,\mathrm{GeV}.
$$

The lifetime is $\tau = \hbar/\Gamma = 6.582\times10^{-25}\,\mathrm{GeV\,s}/3.009\times10^{-19}\,\mathrm{GeV} = 2.187\times10^{-6}\,\mathrm{s}$, within $0.5\%$ of the measured $2.197\,\mu\mathrm{s}$; the difference is accounted for by radiative corrections and the electron mass. In practice the logic runs backwards: the muon lifetime is how $G_F$ is measured.

The $\tau$ decays to $e\bar\nu\nu$ by the same diagram with $m_\mu \to m_\tau$, so that partial rate is larger by $(m_\tau/m_\mu)^5$. Its branching ratio is $17.8\%$, so

$$
\tau_\tau \approx \tau_\mu\left(\frac{m_\mu}{m_\tau}\right)^5 \times 0.178 = 2.197\times10^{-6} \times \left(\frac{0.10566}{1.77693}\right)^5 \times 0.178\,\mathrm{s} = 2.9\times10^{-13}\,\mathrm{s},
$$

in agreement with the measured $290.3\,\mathrm{fs}$. The strong $m^5$ dependence is Sargent's rule from [[particles/decay]] in a new guise. The other $82\%$ of $\tau$ decays, to $\mu\bar\nu\nu$ and to $d\bar u$ in three colours, account for the branching ratio: $1/(1 + 1 + 3) = 20\%$ before QCD corrections.
:::
:::

### Electroweak unification

Sheldon Glashow (1961), Steven Weinberg (1967) and Abdus Salam (1968) combined the weak and electromagnetic interactions into one gauge theory based on the group $\mathrm{SU}(2)\times\mathrm{U}(1)$, with four gauge bosons. Three of them acquire mass through the Higgs mechanism described below; the photon remains massless. The theory has one new parameter, the **weak mixing angle** $\theta_W$, and at tree level it predicts

$$
e = g_W\sin\theta_W, \qquad M_W = M_Z\cos\theta_W .
$$ {#eq-weinberg}

The theory demanded a neutral weak current, an interaction in which a neutrino scatters without changing into a charged lepton. The Gargamelle bubble-chamber collaboration at CERN found such events in 1973. Combining [[#eq-gf]] with $e = g_W\sin\theta_W$ predicted the $W$ and $Z$ masses from low-energy data, at about $80$ and $90\,\mathrm{GeV}$. Carlo Rubbia and Simon van der Meer converted CERN's SPS into a proton–antiproton collider to reach them, and the UA1 and UA2 experiments discovered the $W$ in January 1983 and the $Z$ in May–June 1983. Measured values (PDG 2024) are $M_W = 80.369\,\mathrm{GeV}$ and $M_Z = 91.1880\,\mathrm{GeV}$, and $\sin^2\theta_W = 0.2313$ in the standard scheme at the $Z$ mass.

::: example How many neutrinos? {#ex-neutrinos}
At LEP, the $Z$ resonance in $e^+e^-$ collisions was measured with high precision: its total width is $\Gamma_Z = 2.4955\,\mathrm{GeV}$, and the part due to decays into invisible particles is $\Gamma_\mathrm{inv} = 499.0\,\mathrm{MeV}$. The Standard Model predicts $167.2\,\mathrm{MeV}$ for the decay to each neutrino species. How many light neutrino species are there?
::: solution
The invisible width is not seen directly. It is the total width, from the shape of the resonance [[particles/reactions#eq-bw]], minus the measured widths to hadrons and charged leptons. If all of it is due to neutrinos,

$$
N_\nu = \frac{\Gamma_\mathrm{inv}}{\Gamma_\nu} = \frac{499.0}{167.2} = 2.98 .
$$

There are three light neutrinos, and so, assuming each generation has one, three generations of fermions. Each additional species would have widened the $Z$ by $167\,\mathrm{MeV}$ and lowered its peak hadronic cross-section by about $12\%$, a change far larger than the measurement errors. (A neutrino heavier than $M_Z/2$, or one that does not couple to the $Z$, would escape this count.)
:::
:::

::: quiz
Which of these processes can occur at tree level (one boson exchanged or emitted) in the Standard Model?
- [x] $\nu_\mu + e^- \to \nu_\mu + e^-$, by $Z$ exchange
- [ ] $K^0 \to \mu^+\mu^-$, by a single $Z$ turning $d\bar s$ into $\mu^+\mu^-$
- [x] $\pi^+ \to \mu^+\nu_\mu$, by a $W^+$ from the annihilating $u\bar d$
- [ ] $\mu^- \to e^-\gamma$, by a single photon vertex
::: solution
Neutral-current scattering of a muon neutrino from an electron is exactly what Gargamelle saw in 1973: both particles keep their identity and exchange a $Z$. The pion decays by $u\bar d \to W^+ \to \mu^+\nu_\mu$, a charged current. A $Z$ never changes flavour, so it cannot convert $d\bar s$ to anything at tree level; $K^0_L \to \mu^+\mu^-$ does occur, but only through loops, and is rare. A photon vertex never changes lepton flavour, and $\mu \to e\gamma$ has never been observed (branching ratio below about $10^{-12}$).
:::
:::

### Quark mixing and the CKM matrix

The $W$ couples an up-type quark not to a single down-type quark but to a combination. Nicola Cabibbo (1963) explained the relative rates of strange and non-strange decays by letting the $u$ couple to $d\cos\theta_C + s\sin\theta_C$, with $\sin\theta_C \approx 0.225$. Makoto Kobayashi and Toshihide Maskawa (1973) generalised this to three generations.

::: definition The CKM matrix {#def-ckm}
The **Cabibbo–Kobayashi–Maskawa matrix** $V$ is the $3\times3$ unitary matrix relating the down-type quark states $d'$, $s'$, $b'$ that couple to $u$, $c$, $t$ through the $W$ to the mass eigenstates $d$, $s$, $b$:

$$
\begin{pmatrix} d' \\ s' \\ b' \end{pmatrix} = \begin{pmatrix} V_{ud} & V_{us} & V_{ub} \\ V_{cd} & V_{cs} & V_{cb} \\ V_{td} & V_{ts} & V_{tb} \end{pmatrix} \begin{pmatrix} d \\ s \\ b \end{pmatrix} .
$$ {#eq-ckm}

The amplitude for a $W$ to connect up-type quark $i$ with down-type quark $j$ is proportional to $V_{ij}$.
:::

The PDG global fit gives magnitudes

$$
\lvert V\rvert \approx \begin{pmatrix} 0.974 & 0.225 & 0.0037 \\ 0.225 & 0.973 & 0.042 \\ 0.0086 & 0.041 & 0.999 \end{pmatrix} .
$$

The matrix is close to the identity: transitions within a generation are favoured, between neighbouring generations suppressed by about $\lambda = 0.225$, and from the first to the third by about $\lambda^3$. A $3\times3$ unitary matrix of this kind has three real angles and one irremovable complex phase, and that phase is the only source of CP violation in the quark sector of the Standard Model ([[particles/symmetries]]). Kobayashi and Maskawa noticed this when only three quarks were known, and so predicted the third generation; the $b$ quark was found in 1977 and the $t$ in 1995. Unitarity requires, for example, $\lvert V_{ud}\rvert^2 + \lvert V_{us}\rvert^2 + \lvert V_{ub}\rvert^2 = 1$, which the measurements satisfy at the level of about $0.1\%$.

Leptons mix too. The neutrinos produced with an electron, muon or tau are superpositions of three mass eigenstates, related by the PMNS matrix (after Bruno Pontecorvo, Ziro Maki, Masami Nakagawa and Shoichi Sakata). Because the mass eigenstates evolve with slightly different phases, a neutrino produced as $\nu_\mu$ can be detected as $\nu_\tau$ after travelling a distance: **neutrino oscillation**. Super-Kamiokande established the oscillation of atmospheric muon neutrinos in 1998, and SNO showed in 2001–02 that solar electron neutrinos change flavour on their way to Earth, resolving the solar-neutrino deficit of [[particles/reactions]]. Oscillation requires the neutrinos to have different, hence nonzero, masses, which the original Standard Model did not include.

::: warning The CKM matrix does not mix the up-type quarks into each other
It is conventional to put all the mixing on the down-type quarks, as in [[#eq-ckm]]. Only the *relative* rotation between up-type and down-type states is physical, so this is a choice, not a statement that $u$, $c$ and $t$ are "unmixed". Likewise, the CKM matrix plays no role in the electromagnetic, strong or neutral-current $Z$ interactions, which do not change flavour at tree level: there is no $Z \to s\bar d$ vertex. The absence of such flavour-changing neutral currents, noticed in kaon decays, is how Glashow, John Iliopoulos and Luciano Maiani predicted the charm quark in 1970.
:::

## The Higgs boson {#higgs}

A gauge theory, taken by itself, requires its gauge bosons to be massless, and the charged-current interaction distinguishes left-handed from right-handed fermions in a way that forbids ordinary mass terms for them as well. Yet the $W$, $Z$ and fermions are massive. The resolution, proposed in 1964 by François Englert and Robert Brout, by Peter Higgs, and by Gerald Guralnik, Carl Hagen and Tom Kibble, is that the symmetry is exact in the equations but hidden in the vacuum.

The Standard Model contains a complex doublet of scalar fields $\phi$ with potential

$$
V(\phi) = -\mu^2\lvert\phi\rvert^2 + \lambda\lvert\phi\rvert^4, \qquad \mu^2, \lambda > 0 .
$$ {#eq-higgs-potential}

Its minimum is not at $\phi = 0$ but on the circle $\lvert\phi\rvert^2 = \mu^2/2\lambda$. The vacuum must pick one point on that circle, and in doing so **breaks** the symmetry spontaneously, as a ball at rest on the top of a symmetric hill must roll off in some particular direction. The field then has a nonzero vacuum value, conventionally $\langle\phi\rangle = v/\sqrt{2}$, and the gauge bosons that interact with it acquire mass. Three of the field's four real components become the longitudinal polarisation states of the $W^+$, $W^-$ and $Z$; the fourth is a physical particle, the **Higgs boson**, with mass $m_H = \sqrt{2\lambda}\,v$.

::: widget plot
f: -m x^2 + l x^4
x: -2, 2
y: -1, 1.5
sliders: m=1:-1:2:0.05; l=0.5:0.1:1.5:0.05
labels: V along one direction of the field
caption: A slice through the potential [[#eq-higgs-potential]] in arbitrary units, with $\mu^2 = m$ and $\lambda = l$. With $m > 0$ the curve has a local maximum at the symmetric point and two minima at $\pm\sqrt{m/2l}$; in the full complex field these are a circle of minima, the "Mexican hat". Drag $m$ below zero and the minima merge into one at the origin: the symmetry is no longer broken and the gauge bosons would be massless. The curvature at the minimum, which you can see change with $l$, is what sets the Higgs boson's mass.
:::

The value of $v$ is fixed by the Fermi constant: combining [[#eq-gf]] with the tree-level $M_W = g_Wv/2$ gives $v = (\sqrt{2}G_F)^{-1/2} = 246.2\,\mathrm{GeV}$. Fermions acquire mass by coupling to the same field with **Yukawa couplings** $y_f$, giving $m_f = y_fv/\sqrt{2}$. The model says nothing about why the couplings have the values they do; the top quark's is very close to 1, the electron's about $3\times10^{-6}$. The Higgs boson couples to each particle in proportion to its mass, which is what experiments test.

::: example The scale of the Higgs field {#ex-higgs}
Compute $v$ from $G_F = 1.1663788\times10^{-5}\,\mathrm{GeV}^{-2}$, the top Yukawa coupling from $m_t = 172.57\,\mathrm{GeV}$, and the self-coupling $\lambda$ from $m_H = 125.20\,\mathrm{GeV}$.
::: solution
$\sqrt{2}G_F = 1.64952\times10^{-5}\,\mathrm{GeV}^{-2}$, so $v = (1.64952\times10^{-5})^{-1/2}\,\mathrm{GeV} = 246.22\,\mathrm{GeV}$. Then

$$
y_t = \frac{\sqrt{2}\,m_t}{v} = \frac{1.41421 \times 172.57}{246.22} = 0.991, \qquad \lambda = \frac{m_H^2}{2v^2} = \frac{125.20^2}{2 \times 246.22^2} = 0.129 .
$$

The top quark is the only fermion with a Yukawa coupling of order one, which is why it dominates the Higgs boson's production at the LHC: the main mechanism is gluon fusion through a loop of top quarks. The value of $\lambda$ was the last unmeasured parameter of the Standard Model before 2012; it is now known indirectly from $m_H$, and measuring it directly through the production of Higgs-boson pairs is a goal of the High-Luminosity LHC.
:::
:::

On 4 July 2012 the ATLAS and CMS collaborations announced, in seminars at CERN, the observation of a new boson with mass near $125\,\mathrm{GeV}$, each with a significance of about five standard deviations, mainly in the decay channels $H \to \gamma\gamma$ and $H \to ZZ^* \to 4\ell$. Its spin, parity and couplings have since been measured to agree with those of the Standard Model Higgs boson, within uncertainties of about $10\%$ for the best-measured couplings. Englert and Higgs received the 2013 Nobel Prize in Physics (Brout had died in 2011). The PDG 2024 average mass is $125.20 \pm 0.11\,\mathrm{GeV}$.

::: history The building of the Standard Model
Yukawa proposed meson exchange in 1935, and the pion was found in 1947. Murray Gell-Mann and, independently, George Zweig proposed quarks in 1964, the same year Greenberg introduced the extra degree of freedom later called colour and the Higgs mechanism was published. Glashow, Weinberg and Salam built the electroweak theory between 1961 and 1968; Gerard 't Hooft and Martinus Veltman proved it renormalisable in 1971–72. Deep inelastic scattering at SLAC from 1968 revealed point-like partons, and asymptotic freedom (1973) explained why they behave as almost free. The $J/\psi$, a bound state of charm and anticharm, was discovered simultaneously at Brookhaven (Samuel Ting) and SLAC (Burton Richter) in November 1974. Martin Perl's group found the $\tau$ in 1975, Leon Lederman's group the $\Upsilon$ ($b\bar b$) in 1977, and PETRA the gluon jets in 1979. The $W$ and $Z$ followed at CERN in 1983, the top quark at Fermilab's Tevatron (CDF and D0) in 1995, the tau neutrino (DONUT) in 2000, and the Higgs boson at the LHC in 2012.
:::

## Where this leads {#leads}

The Standard Model is not the final theory. It has about 19 free parameters (more with neutrino masses), says nothing about gravity, contains no candidate for the dark matter required by astrophysics ([[gravitation/cosmology]]), and its CP violation is far too small to explain why the universe contains matter rather than equal amounts of matter and antimatter. Those questions drive current experiments. The organising principle behind the model, that interactions follow from local symmetries, and the discrete symmetries C, P and T that the weak interaction breaks, are the subject of [[particles/symmetries]]. The instruments used to establish it are described in [[particles/accelerators]].

::: summary
- Matter consists of three generations of spin-$\tfrac12$ fermions: leptons ($e$, $\mu$, $\tau$ and three neutrinos) and quarks ($u$, $d$; $c$, $s$; $t$, $b$) with charges $+\tfrac23$ and $-\tfrac13$. Hadrons are colour-singlet $qqq$ baryons and $q\bar q$ mesons.
- Forces arise from exchange of spin-1 gauge bosons: the photon, eight gluons, $W^\pm$ and $Z$. The range of a force carried by mass $m$ is $\hbar/mc$ (Yukawa), so the weak force is short-ranged and looks point-like at low energy, with $G_F/\sqrt2 = g_W^2/8M_W^2$.
- Feynman diagrams: each vertex brings a coupling factor ($\sqrt{\alpha}$, $\sqrt{\alpha_s}$, $g_W$), each internal line a propagator $1/(q^2 - m^2)$. Dimensional analysis gives $\sigma(e^+e^- \to \mu^+\mu^-) = 4\pi\alpha^2/3s = 86.8\,\mathrm{nb}/s[\mathrm{GeV}^2]$.
- Colour is required by the $\Delta^{++}$, the R ratio ($R = 3\sum Q_q^2$) and $\pi^0 \to \gamma\gamma$. QCD is asymptotically free, $\alpha_s(M_Z) = 0.118$, and confining, with a linear potential of about $0.9\,\mathrm{GeV/fm}$ at large distance.
- The electroweak theory unifies the weak and electromagnetic interactions with mixing angle $\sin^2\theta_W \approx 0.231$; it predicted the neutral current (1973) and the $W$ and $Z$ (1983). The $Z$ width shows three light neutrinos.
- The CKM matrix relates weak and mass eigenstates of quarks; its single phase is the Standard Model's source of CP violation in quarks. Neutrino oscillation (1998) shows neutrinos have mass.
- The Higgs field's vacuum value $v = 246\,\mathrm{GeV}$ gives mass to the $W$, $Z$ and fermions, $m_f = y_fv/\sqrt2$. Its boson, at $125.2\,\mathrm{GeV}$, was discovered by ATLAS and CMS in 2012.
:::

## Exercises {#exercises}

::: exercise The range of Z exchange {level=1 check="2.16e-3"}
Find the range $\hbar/M_Zc$ of the force carried by the $Z$ boson ($M_Z = 91.188\,\mathrm{GeV}/c^2$), in femtometres.
::: solution
$\hbar/M_Zc = \hbar c/M_Zc^2 = 0.19733\,\mathrm{GeV\,fm}/91.188\,\mathrm{GeV} = 2.16\times10^{-3}\,\mathrm{fm}$, about $1/400$ of a proton radius. At momentum transfers small compared with $M_Z$ the neutral-current interaction is effectively a contact interaction, like the charged current.
:::
:::

::: exercise Muon pairs at 30 GeV {level=1 check="96.5"}
Use [[#eq-mumu]] to find $\sigma(e^+e^- \to \mu^+\mu^-)$ at $\sqrt{s} = 30\,\mathrm{GeV}$, in picobarns.
::: solution
$s = 900\,\mathrm{GeV}^2$, so $\sigma = 86.8\,\mathrm{nb}/900 = 0.0965\,\mathrm{nb} = 96.5\,\mathrm{pb}$. The cross-section falls as $1/s$; at $\sqrt{s}$ near $M_Z$ this simple formula fails, because the $Z$ can be produced on its mass shell and the resonance dominates.
:::
:::

::: exercise R above the b threshold {level=1 check="11/3"}
Predict $R = \sigma(\text{hadrons})/\sigma(\mu^+\mu^-)$ in $e^+e^-$ annihilation for energies above the $b\bar b$ threshold but below the $t\bar t$ threshold, with three colours and no QCD corrections.
::: solution
The available quarks are $u$, $d$, $s$, $c$, $b$, so $\sum Q_q^2 = 2 \times \tfrac49 + 3 \times \tfrac19 = \tfrac{11}{9}$ and $R = 3 \times \tfrac{11}{9} = \tfrac{11}{3} = 3.67$. The step from $\tfrac{10}{3}$ is $\tfrac13$, small because the $b$ quark has charge $-\tfrac13$; the step at the charm threshold, $\tfrac43$, was much more conspicuous.
:::
:::

::: exercise The tau lifetime {level=2 check="2.91e-13"}
Using $\tau_\mu = 2.1970\,\mu\mathrm{s}$, $m_\mu = 105.658\,\mathrm{MeV}$, $m_\tau = 1776.93\,\mathrm{MeV}$ and the branching ratio $B(\tau \to e\bar\nu_e\nu_\tau) = 0.1782$, estimate the $\tau$ lifetime in seconds as in [[#ex-muon]], to three significant figures.
::: solution
The partial width to $e\bar\nu\nu$ is $\Gamma_e = \Gamma_\mu(m_\tau/m_\mu)^5$, by the same diagram, and the total width is $\Gamma_\mathrm{tot} = \Gamma_e/B$. With $(m_\mu/m_\tau)^5 = (0.0594606)^5 = 7.4337\times10^{-7}$,

$$
\tau_\tau = B\,\tau_\mu\left(\frac{m_\mu}{m_\tau}\right)^5 = 0.1782 \times 2.1970\times10^{-6} \times 7.4337\times10^{-7}\,\mathrm{s} = 2.91\times10^{-13}\,\mathrm{s}.
$$

The measured value is $2.903\times10^{-13}\,\mathrm{s}$. The agreement is a test of **lepton universality**: the $W$ couples to $\tau$ with the same strength as to $\mu$ and $e$.
:::
:::

::: exercise Running the strong coupling {level=2 check="0.0877"}
Use the one-loop formula [[#eq-running]] with $n_f = 5$ and $\alpha_s(M_Z) = 0.1180$ at $M_Z = 91.19\,\mathrm{GeV}$ to estimate $\alpha_s$ at $Q = 1000\,\mathrm{GeV}$.
::: solution
$b_0 = (33 - 10)/12\pi = 0.61008$, and $\ln(Q^2/M_Z^2) = 2\ln(1000/91.19) = 2 \times 2.3948 = 4.7896$. The denominator is $1 + 0.61008 \times 0.1180 \times 4.7896 = 1.3448$, so $\alpha_s(1000\,\mathrm{GeV}) = 0.1180/1.3448 = 0.0877$. (Switching to $n_f = 6$ above the top mass changes the third figure; the coupling has fallen by a quarter over a factor of eleven in energy, a logarithmically slow approach to freedom.)
:::
:::

::: exercise The W mass from low-energy data {level=2 check="80.2"}
At tree level, [[#eq-gf]] and [[#eq-weinberg]] give $M_W^2 = \pi\alpha/(\sqrt{2}G_F\sin^2\theta_W)$. Evaluate $M_W$ in GeV with $\alpha = 1/128$ (its value at the $Z$ mass), $G_F = 1.16638\times10^{-5}\,\mathrm{GeV}^{-2}$ and $\sin^2\theta_W = 0.2313$.
::: solution
First derive the formula: $G_F/\sqrt2 = g_W^2/8M_W^2$ and $g_W^2 = e^2/\sin^2\theta_W = 4\pi\alpha/\sin^2\theta_W$ (in natural Heaviside–Lorentz units, $e^2 = 4\pi\alpha$). So $M_W^2 = \sqrt2 g_W^2/8G_F = \sqrt2 \cdot 4\pi\alpha/(8G_F\sin^2\theta_W) = \pi\alpha/(\sqrt2 G_F\sin^2\theta_W)$. Numerically,

$$
\frac{\pi\alpha}{\sqrt2G_F} = \frac{\pi/128}{1.64952\times10^{-5}}\,\mathrm{GeV}^2 = 1487.9\,\mathrm{GeV}^2, \qquad M_W = \sqrt{\frac{1487.9}{0.2313}}\,\mathrm{GeV} = 80.2\,\mathrm{GeV}.
$$

The measured $80.37\,\mathrm{GeV}$ differs by $0.2\%$, from loop corrections involving the top quark and the Higgs boson; before 1995 that sensitivity was used to predict the top mass. With $\alpha = 1/137$ the estimate would be $77.5\,\mathrm{GeV}$, which is why the running of $\alpha$ matters.
:::
:::

::: exercise The top Yukawa coupling {level=2 check="0.991"}
Using $v = 246.22\,\mathrm{GeV}$ and $m_t = 172.57\,\mathrm{GeV}$, find $y_t = \sqrt2 m_t/v$ to three significant figures, and the corresponding value for the electron.
::: solution
$y_t = 1.41421 \times 172.57/246.22 = 0.991$. For the electron, $y_e = 1.41421 \times 0.000511/246.22 = 2.94\times10^{-6}$. The ratio, about $3\times10^5$, is the unexplained "flavour puzzle": the Standard Model accommodates fermion masses but does not predict them.
:::
:::

::: exercise The Yukawa potential {level=3}
(a) Show directly, using $\nabla^2 f = \frac1r\frac{\dd^2}{\dd r^2}(rf)$ for spherical $f$, that $\phi(r) = e^{-\mu r}/r$ satisfies $(\nabla^2 - \mu^2)\phi = 0$ for $r > 0$. (b) By integrating $(\nabla^2 - \mu^2)\phi$ over a small ball of radius $\varepsilon$ around the origin and using the divergence theorem, show that the integral tends to $-4\pi$ as $\varepsilon \to 0$, so that $(\nabla^2 - \mu^2)\phi = -4\pi\delta^3(\mathbf{r})$. (c) Show that the Fourier transform of $e^{-\mu r}/4\pi r$ is $1/(q^2 + \mu^2)$, and relate this to the propagator.
::: hint
For (b), $\oint\nabla\phi\cdot\dd\mathbf{A} = 4\pi\varepsilon^2\phi'(\varepsilon)$, while $\int\mu^2\phi\,\dd V$ over the ball vanishes as $\varepsilon \to 0$. For (c), integrate over angles first, as in the form factor of [[particles/nuclear-structure]].
:::
::: solution
(a) $r\phi = e^{-\mu r}$, so $\frac{\dd^2}{\dd r^2}(r\phi) = \mu^2e^{-\mu r}$ and $\nabla^2\phi = \mu^2e^{-\mu r}/r = \mu^2\phi$.

(b) $\phi'(r) = -e^{-\mu r}(1 + \mu r)/r^2$, so the surface integral is $4\pi\varepsilon^2\phi'(\varepsilon) = -4\pi e^{-\mu\varepsilon}(1 + \mu\varepsilon) \to -4\pi$. The volume integral $\int_0^\varepsilon\mu^2(e^{-\mu r}/r)4\pi r^2\,\dd r \le 2\pi\mu^2\varepsilon^2 \to 0$. Since $(\nabla^2 - \mu^2)\phi$ vanishes away from the origin and integrates to $-4\pi$ over any ball around it, it equals $-4\pi\delta^3(\mathbf{r})$.

(c) $\int\frac{e^{-\mu r}}{4\pi r}e^{-i\mathbf{q}\cdot\mathbf{r}}\,\dd^3r = \int_0^\infty\frac{e^{-\mu r}}{4\pi r}\frac{\sin qr}{qr}4\pi r^2\,\dd r = \frac1q\int_0^\infty e^{-\mu r}\sin qr\,\dd r = \frac1q\cdot\frac{q}{q^2 + \mu^2} = \frac{1}{q^2 + \mu^2}$. For a static exchange the four-momentum transfer has $q^0 = 0$, so $q^2_{(4)} = -\lvert\mathbf{q}\rvert^2$ and the propagator $1/(q_{(4)}^2 - m^2)$ is $-1/(\lvert\mathbf{q}\rvert^2 + m^2)$: the Yukawa potential is the Fourier transform of the propagator of the exchanged particle, and its range $1/\mu$ is set by the mass in the denominator.
:::
:::

::: exercise Why colour is needed {level=3}
(a) Write the spin wavefunction of $\Delta^{++}$ with $J_z = +\tfrac32$ and show that the product of its space (ground state, $\ell = 0$), spin and flavour wavefunctions is symmetric under exchange of any two quarks. (b) Show that $\frac{1}{\sqrt6}\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ is antisymmetric under exchange of any two quarks and is unchanged when every quark's colour state is transformed by the same $3\times3$ matrix $U$ of determinant one. (c) Explain why no colour-singlet state of two quarks exists.
::: hint
For (b), the transformation multiplies the state by $\varepsilon_{ijk}U_{ai}U_{bj}U_{ck} = \det(U)\,\varepsilon_{abc}$.
:::
::: solution
(a) With all three spins up, the spin state is $\lvert\uparrow\uparrow\uparrow\rangle$, and the flavour state is $\lvert uuu\rangle$. Both are unchanged by any permutation of the three quarks. The $\ell = 0$ spatial ground state of three identical particles in a symmetric potential is symmetric. The product is symmetric, contradicting the Pauli principle for fermions unless another factor is antisymmetric.

(b) Exchanging quarks 1 and 2 relabels $\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$ as $\varepsilon_{ijk}\lvert q_jq_iq_k\rangle = \varepsilon_{jik}\lvert q_iq_jq_k\rangle = -\varepsilon_{ijk}\lvert q_iq_jq_k\rangle$; similarly for the other pairs. Under $q_i \to \sum_a U_{ai}q_a$ the state becomes $\sum_{abc}\bigl(\sum_{ijk}\varepsilon_{ijk}U_{ai}U_{bj}U_{ck}\bigr)\lvert q_aq_bq_c\rangle = \det U\sum\varepsilon_{abc}\lvert q_aq_bq_c\rangle$, the same state when $\det U = 1$. So colour supplies the missing antisymmetry, and the total wavefunction of $\Delta^{++}$ is antisymmetric as required.

(c) An invariant built from two colour indices would need a tensor $T_{ij}$ with $T_{ij}U_{ai}U_{bj} = T_{ab}$ for all $U$ in SU(3). The only invariant tensors of SU(3) with lower indices are $\varepsilon_{ijk}$ (three indices), and with one upper and one lower index $\delta_i^j$, which pairs a quark with an antiquark. No invariant two-index tensor with both indices of the same kind exists, so there is no $qq$ singlet; diquarks are not free particles. Quark–antiquark ($\delta_i^j$) and three-quark ($\varepsilon_{ijk}$) singlets are the mesons and baryons.
:::
:::
