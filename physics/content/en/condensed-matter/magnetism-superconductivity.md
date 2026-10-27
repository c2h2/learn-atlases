Everything in the previous chapters treated electrons one at a time. Each moved in an average potential, filled its band, obeyed its own Schrödinger equation, and the solid was the sum of its parts. Two of the most striking phenomena in nature cannot be described that way. Below $1043\,\mathrm K$ the magnetic moments of iron atoms line up spontaneously, all pointing the same way over regions of many micrometres. Below $1.18\,\mathrm K$ the electrons in aluminium condense into a single quantum state; its resistance is not small but zero, and a magnetic field is pushed out of its interior.

Both are **ordered phases**. Above a critical temperature the state has the full symmetry of the laws governing it; below, it chooses: a direction for the magnetisation, a phase for the quantum state of the electrons. The general theory of such transitions, with the Ising model and mean-field theory, is in [[statistical-mechanics/phase-transitions]]. This chapter applies it to real solids. We start with the magnetic response of atoms that do not order, the dia- and paramagnetism that every material shows, then find the origin of the interaction that orders a ferromagnet and estimate its strength from the Curie temperature. The second half turns to superconductivity: the Meissner effect, the London penetration depth derived from a two-line argument, the energy gap of BCS theory, the quantum of flux $h/2e$, the Josephson effect and the high-temperature superconductors.

We need the magnetic fields of [[magnetism/magnetic-force]] and [[magnetism/faraday]], spin and magnetic moments from [[quantum-1/spin]], and the free-electron results of [[condensed-matter/free-electrons]].

## Magnetic response {#response}

A material in a field $\mathbf H$ acquires a **magnetisation** $\mathbf M$, the magnetic moment per unit volume. For a weak field the response is linear, and we define the dimensionless **susceptibility** by

$$
\mathbf M = \chi\,\mathbf H, \qquad \mathbf B = \mu_0(\mathbf H + \mathbf M) = \mu_0(1 + \chi)\,\mathbf H.
$$ {#eq-chi}

In nearly all materials $\abs\chi\ll1$, and then $\mathbf B\approx\mu_0\mathbf H$, so we may write $\mathbf M = \chi\mathbf B/\mu_0$ with negligible error. A **diamagnet** has $\chi < 0$: it is magnetised against the field and pushed out of strong fields. A **paramagnet** has $\chi > 0$ and is drawn in. A **ferromagnet** has a magnetisation even with no field at all.

Before any calculation, a warning from classical physics. The **Bohr–van Leeuwen theorem** (Niels Bohr, 1911; Hendrika van Leeuwen, 1919) states that a system of classical charges in thermal equilibrium has zero magnetisation in any static field. The proof is short: the magnetic field enters the Hamiltonian only through $\mathbf p - q\mathbf A$, and a shift of the momentum integration variable in the classical partition function removes $\mathbf A$ entirely, so the free energy is independent of $\mathbf B$. Magnetism in matter is therefore a quantum effect, through orbital quantisation or through spin.

### Diamagnetism

Consider an atom whose electrons fill closed shells, so that it has no net orbital or spin moment. In a field $\mathbf B = B\hat{\mathbf z}$, in the symmetric gauge $\mathbf A = \frac12\mathbf B\times\mathbf r$, the kinetic energy $(\mathbf p + e\mathbf A)^2/2m$ of each electron contains a term

$$
\frac{e^2A^2}{2m} = \frac{e^2B^2}{8m}\bigl(x^2 + y^2\bigr).
$$

The term linear in $B$ involves the orbital angular momentum and vanishes in a closed shell. To first order in perturbation theory the energy of the atom therefore rises by $\Delta E = (e^2B^2/8m)\sum\langle x^2 + y^2\rangle$, summed over its $Z$ electrons.

::: proposition Langevin diamagnetism {#prop-langevin}
A material with $n$ closed-shell atoms per unit volume, each with $Z$ electrons of mean square radius $\langle r^2\rangle$, has susceptibility

$$
\chi_\mathrm{dia} = -\frac{\mu_0 nZe^2\langle r^2\rangle}{6m}.
$$ {#eq-langevin}
:::

::: proof
The magnetic moment of the atom is $\mu = -\partial\Delta E/\partial B = -(e^2B/4m)\,Z\langle x^2 + y^2\rangle$. For a spherically symmetric atom $\langle x^2\rangle = \langle y^2\rangle = \langle z^2\rangle = \frac13\langle r^2\rangle$, so $\langle x^2 + y^2\rangle = \frac23\langle r^2\rangle$ and $\mu = -Ze^2B\langle r^2\rangle/(6m)$. The magnetisation is $M = n\mu$, and $\chi = \mu_0M/B$ gives [[#eq-langevin]].
:::

With $n = 5\times10^{28}\,\mathrm{m^{-3}}$, $Z = 10$ and $\langle r^2\rangle = (1\,\text{Å})^2$, this gives $\chi\approx-3\times10^{-5}$. Measured values for diamagnetic solids and liquids are of this order; water has $\chi = -9.0\times10^{-6}$. Diamagnetism is present in every material, but it is so weak that any unpaired spin overwhelms it. It is the response of Lenz's law at the atomic scale: the field induces orbital currents that oppose it, and because quantum mechanics forbids the currents to decay, the response persists.

### Paramagnetism

An atom with an unpaired electron has a permanent moment. Take the simplest case, a spin-$\frac12$ moment of magnitude $\mu_B = e\hbar/2m = 9.274\times10^{-24}\,\mathrm{J/T}$ with no orbital contribution. In a field $B$ it has two energies, $\mp\mu_BB$, for the moment along or against the field. The thermal average of the moment along the field is

$$
\langle\mu\rangle = \frac{\mu_Be^{\mu_BB/k_BT} - \mu_Be^{-\mu_BB/k_BT}}{e^{\mu_BB/k_BT} + e^{-\mu_BB/k_BT}} = \mu_B\tanh\frac{\mu_BB}{k_BT}.
$$ {#eq-tanh}

::: theorem Curie's law {#thm-curie}
For $n$ independent spin-$\frac12$ moments per unit volume, in the limit $\mu_BB\ll k_BT$,

$$
\chi = \frac{\mu_0n\mu_B^2}{k_BT} = \frac CT.
$$ {#eq-curie}

More generally, for ions of total angular momentum $J$ and Landé factor $g$, $C = \mu_0ng^2\mu_B^2J(J+1)/(3k_B)$, and one writes $p = g\sqrt{J(J+1)}$ for the **effective number of Bohr magnetons**.
:::

::: proof
For small $x$, $\tanh x\approx x$, so [[#eq-tanh]] gives $\langle\mu\rangle\approx\mu_B^2B/(k_BT)$ and $M = n\mu_B^2B/(k_BT)$. Then $\chi = \mu_0M/B = \mu_0n\mu_B^2/(k_BT)$. For spin $\frac12$ with $g = 2$, $g^2J(J+1)/3 = 4\cdot\frac34/3 = 1$, so the general formula agrees. The general case follows the same way from the $2J+1$ levels $-g\mu_Bm_JB$; the derivation, giving the Brillouin function, is in Kittel, chapter 11.
:::

The $1/T$ is a competition: the field tries to align the moments, thermal agitation to randomise them, and the fraction that wins is $\mu_BB/k_BT$, about $2\times10^{-3}$ for $1\,\mathrm T$ at room temperature. Pierre Curie found the law empirically in 1895; Paul Langevin derived it for classical moments in 1905, which the Bohr–van Leeuwen theorem shows was legitimate only because he assumed the moments were permanent.

::: example A paramagnetic salt {#ex-curie-salt}
Copper sulphate pentahydrate, $\mathrm{CuSO_4\cdot5H_2O}$, has density $2.286\,\mathrm{g/cm^3}$ and molar mass $249.69\,\mathrm{g/mol}$; each $\mathrm{Cu^{2+}}$ ion carries spin $\frac12$, with its orbital moment quenched by the crystal field. Find its Curie constant and its susceptibility at $300\,\mathrm K$ and at $1\,\mathrm K$, treating the ions as independent.
::: solution
The ion density is $n = 2286\times6.02214\times10^{23}/0.24969 = 5.51\times10^{27}\,\mathrm{m^{-3}}$. Then

$$
C = \frac{\mu_0n\mu_B^2}{k_B} = \frac{(1.25664\times10^{-6})(5.51\times10^{27})(9.2740\times10^{-24})^2}{1.380649\times10^{-23}}\,\mathrm K = 0.0432\,\mathrm K.
$$

At $300\,\mathrm K$, $\chi = C/T = 1.44\times10^{-4}$, fifteen times the diamagnetism of water but still tiny. At $1\,\mathrm K$, $\chi = 0.043$. The effective moment of $\mathrm{Cu^{2+}}$ in such salts, from measured Curie constants, is $p\approx1.9$ rather than the spin-only $\sqrt3 = 1.73$: the orbital moment is quenched, but not entirely. Paramagnetic salts cooled in a field and then demagnetised adiabatically were the route to temperatures below $1\,\mathrm K$ from 1933 onwards, the method of adiabatic demagnetisation proposed by Debye and Giauque.
:::
:::

Conduction electrons are also spin-$\frac12$ particles, but they do not obey Curie's law. Only electrons within about $\mu_BB$ of the Fermi energy can flip their spins, since flipping one deep in the Fermi sphere would put it into an occupied state. The result, due to Pauli in 1927, is a small temperature-independent **Pauli paramagnetism**, $\chi_P = \mu_0\mu_B^2g(E_F) = \frac32\mu_0n\mu_B^2/E_F$, smaller than the Curie value by a factor of order $T/T_F$. For sodium it is $8\times10^{-6}$. It was one of the first triumphs of Fermi–Dirac statistics.

## Ferromagnetism {#ferromagnetism}

In 1907 Pierre Weiss proposed that the moments in iron feel an internal **molecular field** proportional to the magnetisation, $B_\mathrm{eff} = B + \lambda\mu_0M$, and showed that this would lead to spontaneous magnetisation below a critical temperature. The idea works, but the field it requires is enormous, and it cannot be magnetic.

::: example The Weiss field of iron {#ex-weiss-field}
Mean-field theory, as we shall derive, gives $k_BT_c\approx\mu_BB_W$ for spin-$\frac12$ moments in a molecular field $B_W$ at saturation. Estimate $B_W$ for iron, with $T_c = 1043\,\mathrm K$, and compare it with the dipole field of a neighbouring moment, and the dipolar interaction energy of two $\mu_B$ moments $2.48\,\text{Å}$ apart with $k_BT_c$.
::: solution
The molecular field is

$$
B_W\approx\frac{k_BT_c}{\mu_B} = \frac{(1.380649\times10^{-23})(1043)}{9.2740\times10^{-24}}\,\mathrm T = 1.55\times10^{3}\,\mathrm T.
$$

The dipolar interaction energy of two moments $\mu_B$ at distance $r = 2.48\,\text{Å}$ is of order

$$
\frac{\mu_0\mu_B^2}{4\pi r^3} = \frac{10^{-7}\times(9.2740\times10^{-24})^2}{(2.48\times10^{-10})^3}\,\mathrm J = 5.6\times10^{-25}\,\mathrm J,
$$

that is, $3.5\,\mu\mathrm{eV}$, or $k_B\times0.04\,\mathrm K$. It would order iron below about a twentieth of a kelvin, not at $1043\,\mathrm K$; the corresponding field is under a tesla. The interaction that aligns the moments is more than twenty thousand times stronger than magnetism can provide. It must be electrostatic.
:::
:::

### Exchange

Heisenberg found the electrostatic origin in 1928. Consider two electrons on neighbouring atoms. The total wavefunction must be antisymmetric under exchange, by the Pauli principle of [[quantum-2/identical-particles]]. If the spins are in the symmetric triplet state, total spin $1$, the spatial wavefunction must be antisymmetric; it then vanishes when the two electrons are at the same point, keeping them apart and reducing their Coulomb repulsion. If the spins form the antisymmetric singlet, total spin $0$, the spatial function is symmetric and the electrons can come closer. The Coulomb energy therefore depends on the spin state, though the Hamiltonian contains no spin at all.

The two possible energies can be summarised by an effective spin Hamiltonian. With spins measured in units of $\hbar$, $\mathbf S_1\cdot\mathbf S_2 = \frac12\bigl[S(S+1) - \frac32\bigr]$ equals $+\frac14$ in the triplet and $-\frac34$ in the singlet. So

$$
H_\mathrm{ex} = -J\,\mathbf S_1\cdot\mathbf S_2
$$ {#eq-exchange}

gives the triplet energy $-J/4$ and the singlet energy $+3J/4$, a splitting $E_S - E_T = J$. If $J > 0$, parallel spins are favoured: **ferromagnetic** exchange. If $J < 0$, antiparallel: **antiferromagnetic**. The **exchange constant** $J$ is a difference of Coulomb energies, typically tens of meV, hundreds of kelvin, which is the right size. For a lattice, the **Heisenberg model** sums [[#eq-exchange]] over nearest-neighbour pairs.

### Mean-field theory

The Heisenberg model cannot be solved exactly in three dimensions. Weiss's idea, in modern form, is to replace the spins surrounding a given spin by their average. We do this for spin $\frac12$, measuring spin along the direction of the moment so that the Zeeman energy of a spin in field $B$ is $-2\mu_BBS^z$.

::: theorem Mean-field ferromagnet {#thm-mean-field}
For the spin-$\frac12$ Heisenberg model $H = -J\sum_{\langle ij\rangle}\mathbf S_i\cdot\mathbf S_j - 2\mu_BB\sum_iS_i^z$ with $z$ nearest neighbours, the mean-field approximation gives a reduced magnetisation $m = 2\langle S^z\rangle$ that satisfies

$$
m = \tanh\Bigl(\frac{T_cm}{T} + \frac{\mu_BB}{k_BT}\Bigr), \qquad k_BT_c = \frac{zJ}{4}.
$$ {#eq-mean-field}

For $B = 0$ it has a nonzero solution $m\ne0$ if and only if $T < T_c$. For $T > T_c$, the susceptibility obeys the **Curie–Weiss law**

$$
\chi = \frac{C}{T - T_c}, \qquad C = \frac{\mu_0n\mu_B^2}{k_B}.
$$ {#eq-curie-weiss}
:::

::: proof
The terms of $H$ containing spin $i$ are $-J\mathbf S_i\cdot\sum_{j}\mathbf S_j - 2\mu_BBS_i^z$, with the sum over its $z$ neighbours. Replace each neighbouring spin by its thermal average, $\langle\mathbf S_j\rangle = \langle S^z\rangle\hat{\mathbf z}$. Spin $i$ then sees the single-spin Hamiltonian $-\bigl(zJ\langle S^z\rangle + 2\mu_BB\bigr)S_i^z$, whose two levels $S_i^z = \pm\frac12$ have energies $\mp\frac12\bigl(zJ\langle S^z\rangle + 2\mu_BB\bigr)$. As in [[#eq-tanh]],

$$
\langle S^z\rangle = \frac12\tanh\frac{zJ\langle S^z\rangle + 2\mu_BB}{2k_BT}.
$$

With $m = 2\langle S^z\rangle$ this is $m = \tanh\bigl((zJm/4 + \mu_BB)/k_BT\bigr)$, which is [[#eq-mean-field]] with $k_BT_c = zJ/4$. Self-consistency requires the average used for the neighbours to equal the average produced.

At $B = 0$, $m = 0$ is always a solution. The function $\tanh(T_cm/T)$ is concave for $m > 0$, starts at the origin with slope $T_c/T$ and tends to $1$. If $T_c/T > 1$ it rises above the line $m$ near the origin and must cross it again below $1$, giving a solution $0 < m < 1$; if $T_c/T\le1$ it stays below the line for all $m > 0$ (since $\tanh y < y$ for $y > 0$) and there is no other solution. For $T > T_c$ with a small field, $m$ is small and $\tanh y\approx y$: $m = T_cm/T + \mu_BB/k_BT$, so $m = \mu_BB/\bigl(k_B(T - T_c)\bigr)$. The magnetisation is $M = n\mu_Bm$, and $\chi = \mu_0M/B$ gives [[#eq-curie-weiss]].
:::

::: widget plot
f: x; tanh(x/t)
x: -1.5, 1.5
y: -1.2, 1.2
labels: m; tanh(m T_c/T)
sliders: t=1.3:0.2:2:0.01
caption: The graphical solution of the mean-field equation [[#eq-mean-field]] at zero field, with $t = T/T_c$. Solutions are the crossings of the line $m$ with $\tanh(m/t)$. For $t > 1$ the only crossing is $m = 0$: a paramagnet. Lower $t$ through $1$ and two new crossings appear at $\pm m_0$, growing as $\sqrt{3(1 - t)}$ just below the transition and approaching $\pm1$ as $t\to0$. The two signs are the two directions the magnet may choose: a broken symmetry.
:::

For general spin $S$, the same argument gives $k_BT_c = zJS(S+1)/3$, which reduces to $zJ/4$ for $S = \frac12$. Mean-field theory gets the qualitative picture right and the details wrong. Measured magnetisations vanish near $T_c$ as $(T_c - T)^\beta$ with $\beta\approx0.34$–$0.37$, not $\frac12$; measured susceptibilities follow Curie–Weiss only well above $T_c$, with a fitted $\theta$ a little above $T_c$; and $T_c$ itself is overestimated, because fluctuations, which the average discards, help to destroy the order. Why the exponents differ, and why they are the same for very different magnets, is the subject of the renormalisation group, sketched in [[statistical-mechanics/phase-transitions]].

::: example The exchange constant of iron {#ex-exchange-fe}
Iron is bcc, with $z = 8$ nearest neighbours, and $T_c = 1043\,\mathrm K$. Treating each atom as a spin $S = 1$ (its measured moment is $2.2\,\mu_B$), estimate $J$ from mean-field theory.
::: solution
From $k_BT_c = zJS(S+1)/3$,

$$
J = \frac{3k_BT_c}{zS(S+1)} = \frac{3\times89.88\,\mathrm{meV}}{8\times2} = 16.9\,\mathrm{meV},
$$

using $k_BT_c = (8.617\times10^{-5}\,\mathrm{eV/K})(1043\,\mathrm K) = 89.88\,\mathrm{meV}$. Since mean-field theory overestimates $T_c$, the true $J$ is somewhat larger. An exchange energy of a few tens of meV is a small fraction of the Coulomb energy of electrons in atoms, but it is a thousand times the dipolar energy of [[#ex-weiss-field]]. In iron the moments are carried by $3d$ electrons that are partly itinerant, in bands, and the localised Heisenberg picture is itself an approximation; the band theory of ferromagnetism, due to Stoner, treats the same exchange energy as a shift between spin-up and spin-down bands.
:::
:::

Not every ordered magnet is a ferromagnet. With $J < 0$ neighbouring moments point opposite ways: an **antiferromagnet**, with no net magnetisation, as in $\mathrm{MnO}$ and chromium, discovered by Louis Néel in the 1930s and seen directly by neutron diffraction in 1949. Above its ordering (Néel) temperature an antiferromagnet obeys $\chi = C/(T + \theta)$ with $\theta > 0$. When the two opposed sublattices carry unequal moments the result is a **ferrimagnet** with a net moment, such as magnetite, $\mathrm{Fe_3O_4}$, the lodestone of the first compasses. The chemistry of magnetic oxides is in Chemistry Atlas ([magnetic and optical materials](/learn/chemistry/lesson.php?c=materials-chemistry&l=magnetic-optical)). Finally, a large ferromagnet is rarely uniformly magnetised: it breaks into **domains** magnetised in different directions, reducing the energy of the external field. A small applied field moves the domain walls, which is why an iron nail is not a magnet until it is placed in one.

::: quiz
A material obeys $\chi = C/(T - \theta)$ above some temperature, with $\theta = -40\,\mathrm K$. What does this suggest about the interactions between its moments?
- [ ] They are ferromagnetic, and it will order at $40\,\mathrm K$.
- [x] They are antiferromagnetic; it may order antiferromagnetically at low temperature.
- [ ] There are no interactions; $\theta$ is a fitting error.
- [ ] It is a superconductor.
::: solution
In mean-field theory $\theta$ has the sign of the exchange: positive for ferromagnetic coupling, which enhances the susceptibility above $C/T$, and negative for antiferromagnetic coupling, which suppresses it. A negative $\theta$ means neighbouring moments prefer to be opposed. Whether and where it orders depends on the lattice; in mean-field theory the Néel temperature is $\abs\theta$ for a simple two-sublattice antiferromagnet.
:::
:::

## Superconductivity {#superconductivity}

In 1911 Heike Kamerlingh Onnes, three years after liquefying helium, measured the resistance of mercury as it was cooled and saw it drop abruptly to zero at $4.2\,\mathrm K$. A superconducting ring carries a current that, once started, shows no measurable decay over years; the resistivity is below $10^{-24}\,\Omega\,\mathrm m$, at least sixteen orders of magnitude smaller than copper's at room temperature. Many elements superconduct, with transition temperatures $T_c$ of $1.18\,\mathrm K$ for aluminium, $3.72\,\mathrm K$ for tin, $7.19\,\mathrm K$ for lead and $9.25\,\mathrm K$ for niobium. Good conductors such as copper, silver and gold do not, at least down to the lowest temperatures tested.

### The Meissner effect

Zero resistance is only half the story. Walther Meissner and Robert Ochsenfeld found in 1933 that a superconductor cooled through $T_c$ in a magnetic field expels the field from its interior. A merely perfect conductor would not do that: by Faraday's law, $\dd\mathbf B/\dd t = -\nabla\times\mathbf E = 0$ inside a material with $\mathbf E = 0$, so it would freeze in whatever field was present when it lost its resistance. The superconductor ends up with $\mathbf B = 0$ inside regardless of history. Expulsion is a property of the equilibrium state, and it makes the superconductor a perfect diamagnet, $\chi = -1$.

The expulsion has a price. Pushing out a field $B$ costs magnetic energy $B^2/2\mu_0$ per unit volume, so superconductivity is destroyed when that exceeds the condensation energy of the superconducting state. This defines the **critical field** $B_c(T)$, empirically close to $B_c(0)\bigl[1 - (T/T_c)^2\bigr]$; for lead $B_c(0) = 0.080\,\mathrm T$. In **type I** superconductors, mostly pure elements, the field is expelled completely up to $B_c$. In **type II** superconductors, including niobium and all the technologically important alloys and compounds, the field enters above a lower critical field as an array of quantised vortices, and superconductivity survives up to an upper critical field that can exceed $20\,\mathrm T$. The magnets of MRI scanners and particle accelerators are wound from type II niobium–titanium and niobium–tin wire.

### The London equations

Fritz and Heinz London gave the first electrodynamics of superconductors in 1935. Suppose a density $n_s$ of electrons moves without friction. In a field $\mathbf E$ each accelerates freely, $m\,\dd\mathbf v/\dd t = -e\mathbf E$, so the supercurrent density $\mathbf j_s = -n_se\mathbf v$ obeys

$$
\deriv{\mathbf j_s}{t} = \frac{n_se^2}{m}\,\mathbf E.
$$ {#eq-london1}

Take the curl and use Faraday's law, $\nabla\times\mathbf E = -\partial\mathbf B/\partial t$:

$$
\pdv{}{t}\Bigl(\nabla\times\mathbf j_s + \frac{n_se^2}{m}\mathbf B\Bigr) = 0.
$$

A perfect conductor makes the bracket constant in time. The Londons' insight was to require that the bracket itself vanish, which is a new law, not a consequence of the old ones:

$$
\nabla\times\mathbf j_s = -\frac{n_se^2}{m}\,\mathbf B.
$$ {#eq-london2}

::: theorem London penetration depth {#thm-london}
Inside a superconductor obeying [[#eq-london2]] and the static Ampère law $\nabla\times\mathbf B = \mu_0\mathbf j_s$, the field satisfies

$$
\nabla^2\mathbf B = \frac{\mathbf B}{\lambda_L^2}, \qquad \lambda_L = \sqrt{\frac{m}{\mu_0n_se^2}}.
$$ {#eq-lambda}

For a superconductor filling the half-space $x > 0$ with a uniform field $B_0$ parallel to its surface outside, $B(x) = B_0e^{-x/\lambda_L}$.
:::

::: proof
Take the curl of Ampère's law: $\nabla\times(\nabla\times\mathbf B) = \mu_0\nabla\times\mathbf j_s = -(\mu_0n_se^2/m)\mathbf B$ by [[#eq-london2]]. The vector identity $\nabla\times(\nabla\times\mathbf B) = \nabla(\nabla\cdot\mathbf B) - \nabla^2\mathbf B$ with $\nabla\cdot\mathbf B = 0$ gives $-\nabla^2\mathbf B = -\mathbf B/\lambda_L^2$, which is [[#eq-lambda]]. For the half-space, symmetry makes $\mathbf B = B(x)\hat{\mathbf z}$, and the equation becomes $B'' = B/\lambda_L^2$, with general solution $B = c_1e^{-x/\lambda_L} + c_2e^{x/\lambda_L}$. Finiteness as $x\to\infty$ requires $c_2 = 0$, and continuity of the tangential field at the surface fixes $c_1 = B_0$.
:::

The field, and with it the screening current, is confined to a surface layer of thickness $\lambda_L$. Deeper in, $\mathbf B = 0$: that is the Meissner effect, now a consequence of [[#eq-london2]]. A uniform field in the interior is not a solution, because the right-hand side of [[#eq-lambda]] would not vanish.

::: example The penetration depth of aluminium {#ex-london-al}
Estimate $\lambda_L$ for aluminium at low temperature by taking all three conduction electrons per atom as superconducting, $n_s = 1.81\times10^{29}\,\mathrm{m^{-3}}$.
::: solution
From [[#eq-lambda]],

$$
\lambda_L = \sqrt{\frac{9.1094\times10^{-31}}{(1.25664\times10^{-6})(1.81\times10^{29})(1.60218\times10^{-19})^2}}\,\mathrm m = 1.25\times10^{-8}\,\mathrm m = 12.5\,\mathrm{nm}.
$$

The measured value is about $16\,\mathrm{nm}$. The model has no free parameter here, so the agreement in order of magnitude is significant. The penetration depth grows as $T\to T_c$, because $n_s$ falls to zero there; at $T_c$ it diverges and the field enters freely. A film much thinner than $\lambda_L$ cannot expel a field at all.
:::
:::

::: widget plot
f: cosh(x/l)/cosh(1/(2*l))
x: -0.5, 0.5
y: 0, 1.05
sliders: l=0.1:0.01:1:0.01
caption: The field inside a superconducting slab of unit thickness in a parallel applied field, $B/B_0 = \cosh(x/\lambda)/\cosh(1/2\lambda)$, the solution of [[#eq-lambda]] that matches $B_0$ on both faces. The slider sets $\lambda$ in units of the thickness. With $\lambda = 0.05$ the field is excluded from all but two thin skins; this is the bulk Meissner state. Increase $\lambda$ towards and beyond $0.5$, as happens near $T_c$ or in a very thin film, and the field penetrates almost uniformly: thin films do not show a Meissner effect.
:::

### BCS theory and the energy gap

The microscopic theory was given by John Bardeen, Leon Cooper and Robert Schrieffer in 1957. The essential ingredient, Cooper's result of 1956, is that the filled Fermi sea is unstable to any attraction between electrons, however weak: two electrons just above the Fermi surface with opposite momenta and spins form a bound pair, because the exclusion principle denies them the states below and so turns the problem into an effectively two-dimensional one in which any attraction binds. In conventional superconductors the attraction comes from phonons. A passing electron attracts the positive ions; the lattice, being slow, is still distorted when a second electron arrives, and it is pulled into the region of positive charge. Evidence for the phonon mechanism came before the theory: in 1950 Emanuel Maxwell, and independently Reynolds, Serin, Wright and Nesbitt, found that $T_c$ of mercury varies with the isotopic mass $M$ as $M^{-1/2}$, just like phonon frequencies.

The BCS ground state is a coherent superposition in which all electrons are bound in **Cooper pairs**, each of charge $-2e$, overlapping heavily: the pair size, the coherence length, is more than a micrometre in aluminium, a volume containing millions of other pairs. Breaking a pair costs at least $2\Delta$, where $\Delta$ is the **energy gap**. BCS theory predicts, for weak coupling,

$$
\Delta(0) = 1.764\,k_BT_c,
$$ {#eq-bcs-gap}

with $\Delta(T)$ falling continuously to zero at $T_c$. The gap explains the heat capacity of a superconductor, which falls as $e^{-\Delta/k_BT}$ at low temperature, and the absorption of microwaves and far-infrared radiation, which sets in at $\hbar\omega = 2\Delta$. Ivar Giaever measured the gap directly by electron tunnelling in 1960.

::: example Energy gaps of aluminium and niobium {#ex-bcs-gap}
Use [[#eq-bcs-gap]] to estimate $\Delta(0)$ for aluminium ($T_c = 1.175\,\mathrm K$) and niobium ($T_c = 9.25\,\mathrm K$), and the frequency of radiation that can just break a pair in aluminium.
::: solution
For aluminium, $k_BT_c = (8.6173\times10^{-5}\,\mathrm{eV/K})(1.175\,\mathrm K) = 0.1013\,\mathrm{meV}$, so $\Delta = 1.764\times0.1013\,\mathrm{meV} = 0.179\,\mathrm{meV}$. Pair breaking needs $2\Delta = 0.357\,\mathrm{meV}$, a photon frequency $2\Delta/h = 86\,\mathrm{GHz}$, in the microwave band. For niobium, $k_BT_c = 0.797\,\mathrm{meV}$ and $\Delta = 1.41\,\mathrm{meV}$; tunnelling measurements give about $1.5\,\mathrm{meV}$, a ratio $2\Delta/k_BT_c\approx3.8$ slightly above the BCS value $3.53$. Lead, with $2\Delta/k_BT_c\approx4.3$, departs further: it is a "strong-coupling" superconductor, described by Eliashberg's extension of BCS theory. The gaps are a few thousandths of the Fermi energy. Superconductivity is a delicate reorganisation of the states within a millielectronvolt of the Fermi surface.
:::
:::

### Flux quantisation

The pairs share a single quantum state, so the superconductor has a macroscopic wavefunction $\Psi(\mathbf r) = \abs\Psi e^{i\theta(\mathbf r)}$, whose phase $\theta$ is coherent across the whole sample. That has a striking consequence for a ring.

::: theorem Flux quantum {#thm-flux}
The magnetic flux through a superconducting ring, measured around a path deep inside the material where the current vanishes, is an integer multiple of

$$
\Phi_0 = \frac{h}{2e} = 2.067834\times10^{-15}\,\mathrm{Wb}.
$$ {#eq-flux}
:::

::: proof
For particles of charge $q$ and mass $m^*$ described by $\Psi = \abs\Psi e^{i\theta}$, the quantum-mechanical current density in a vector potential $\mathbf A$ is $\mathbf j = (q\abs\Psi^2/m^*)\bigl(\hbar\nabla\theta - q\mathbf A\bigr)$. Deep inside the ring, beyond the penetration depth, $\mathbf j = 0$, so $\hbar\nabla\theta = q\mathbf A$ along the path. Integrate around a closed loop $\mathcal C$ within the material:

$$
\hbar\oint_{\mathcal C}\nabla\theta\cdot\dd\mathbf l = q\oint_{\mathcal C}\mathbf A\cdot\dd\mathbf l = q\,\Phi,
$$

where Stokes's theorem has turned the line integral of $\mathbf A$ into the flux $\Phi$ through the loop. The wavefunction is single-valued, so $\theta$ can change only by $2\pi N$ around the loop, with $N$ an integer. Hence $\Phi = 2\pi\hbar N/\abs q = Nh/\abs q$. For Cooper pairs $\abs q = 2e$, giving $\Phi = N\,h/2e$.
:::

The factor $2$ is the signature of pairing. Fritz London had predicted flux quantisation with $h/e$ before pairs were thought of. In 1961 Bascom Deaver and William Fairbank, and independently Robert Doll and Martin Näbauer, measured the flux trapped in tiny superconducting cylinders and found steps of $h/2e$. The vortices of a type II superconductor each carry exactly one flux quantum.

### The Josephson effect

In 1962 Brian Josephson, a graduate student at Cambridge, predicted that Cooper pairs can tunnel through a thin insulating barrier between two superconductors, and that the current depends on the difference $\varphi$ of their phases:

$$
I = I_c\sin\varphi, \qquad \hbar\deriv{\varphi}{t} = 2eV.
$$ {#eq-josephson}

With no voltage, a supercurrent up to $I_c$ flows: the **DC Josephson effect**. With a steady voltage $V$, the phase winds at the rate $2eV/\hbar$ and the current oscillates at frequency $f = 2eV/h$: the **AC Josephson effect**, a voltage-to-frequency converter whose constant $K_J = 2e/h = 483\,597.848\,\mathrm{GHz/V}$ involves only fundamental constants. Arrays of thousands of junctions irradiated by microwaves define the volt: since 1990 voltage standards have been realised this way, and since the 2019 redefinition of the SI, $K_J$ is exact. Two junctions in a superconducting loop form a **SQUID**, whose critical current oscillates with period $\Phi_0$ as the flux through the loop changes; SQUIDs detect fields of $10^{-15}\,\mathrm T$, small enough to map the magnetic fields of the human brain. Josephson junctions are also the non-linear elements of superconducting quantum bits, among the leading platforms for quantum computers as of 2026.

::: example Josephson frequencies {#ex-josephson}
Find the AC Josephson frequency for $V = 10.0\,\mu\mathrm V$, and the number of flux quanta threading a ring of area $1.00\,\mathrm{mm^2}$ in the Earth's field of $50\,\mu\mathrm T$.
::: solution
The frequency is

$$
f = \frac{2eV}{h} = (4.835978\times10^{14}\,\mathrm{Hz/V})(1.00\times10^{-5}\,\mathrm V) = 4.84\times10^{9}\,\mathrm{Hz} = 4.84\,\mathrm{GHz}.
$$

A few microvolts give gigahertz, which is why the effect is the basis of voltage metrology: frequencies can be measured to parts in $10^{12}$. The flux through the ring is $\Phi = BA = (5.0\times10^{-5})(1.00\times10^{-6})\,\mathrm{Wb} = 5.0\times10^{-11}\,\mathrm{Wb}$, which is

$$
\frac{\Phi}{\Phi_0} = \frac{5.0\times10^{-11}}{2.0678\times10^{-15}} = 2.42\times10^4
$$

flux quanta. A SQUID resolves a small fraction of a single quantum, so it can detect a change in the field of one part in a hundred million of the Earth's.
:::
:::

::: warning Zero resistance does not explain the Meissner effect
It is tempting to say that a superconductor expels fields "because" it has zero resistance. It does not follow. A perfect conductor conserves the flux it had when it became perfect, by Faraday's law; it would expel a field applied after cooling but keep one applied before. The superconductor expels both. Expulsion is the extra law [[#eq-london2]], which BCS theory derives from the rigidity of the pair wavefunction. A related error is to think the penetration depth is a skin depth of an ordinary conductor: it is independent of frequency down to zero, and it applies to static fields.
:::

::: quiz
Why do flux-quantisation experiments find steps of $h/2e$ rather than $h/e$?
- [ ] Because each electron carries half a flux quantum.
- [x] Because the coherent wavefunction describes Cooper pairs of charge $2e$.
- [ ] Because the ring has two surfaces.
- [ ] Because of electron spin $\frac12$.
::: solution
In the proof of [[#thm-flux]], the flux quantum is $h/\abs q$ for the charge $q$ of whatever carries the macroscopic wavefunction. The experimental factor of $2$ was direct evidence that the carriers are pairs, as BCS theory proposed. Spin enters only indirectly, in that the pairs are formed of electrons of opposite spin.
:::
:::

### High-temperature superconductors

For seventy-five years after Onnes the record $T_c$ crept upwards, reaching $23\,\mathrm K$ in $\mathrm{Nb_3Ge}$ in 1973. In 1986 Georg Bednorz and Alex Müller, at IBM Zurich, found superconductivity near $35\,\mathrm K$ in a lanthanum–barium–copper oxide, a ceramic that is a poor conductor at room temperature. Within a year Paul Chu, Maw-Kuen Wu and co-workers found $\mathrm{YBa_2Cu_3O_7}$ superconducting at $93\,\mathrm K$, above the boiling point of liquid nitrogen, and in 1993 a mercury-based cuprate reached $133\,\mathrm K$ at ambient pressure. The **cuprates** share layers of copper and oxygen in which the pairs form; their parent compounds are antiferromagnetic Mott insulators, superconductivity appears when they are doped with holes, and the gap has $d$-wave symmetry, vanishing along certain directions, rather than the uniform $s$-wave gap of BCS. Phonons alone cannot account for transition temperatures this high, and despite four decades of work the mechanism remains a central open question of physics. Other families have followed: magnesium diboride, a conventional phonon superconductor at $39\,\mathrm K$ (2001); iron-based superconductors (2008); and hydrogen-rich compounds such as $\mathrm H_3\mathrm S$ ($203\,\mathrm K$, 2015) and $\mathrm{LaH_{10}}$ (about $250\,\mathrm K$, 2019), which superconduct only under pressures of more than a million atmospheres.

::: history Magnets and superconductors
Pierre Curie's law of paramagnetism dates from 1895, Paul Langevin's theory of dia- and paramagnetism from 1905, and Pierre Weiss's molecular field from 1907. Werner Heisenberg explained the molecular field by exchange in 1928, and Louis Néel predicted antiferromagnetism in 1936, a prediction confirmed by Clifford Shull's neutron diffraction on $\mathrm{MnO}$ in 1949. Heike Kamerlingh Onnes discovered superconductivity in Leiden on 8 April 1911 and won the 1913 Nobel Prize. Walther Meissner and Robert Ochsenfeld found flux expulsion in 1933, and Fritz and Heinz London wrote their equations in 1935. Vitaly Ginzburg and Lev Landau gave the phenomenological theory in 1950, Alexei Abrikosov predicted vortex lattices in type II superconductors in 1957, and the same year Bardeen, Cooper and Schrieffer published the microscopic theory (Nobel Prize 1972). Brian Josephson's prediction of 1962 was confirmed within a year by Philip Anderson and John Rowell. Georg Bednorz and Alex Müller's discovery of 1986 earned them the Nobel Prize the following year, one of the fastest awards in the history of the physics prize.
:::

## Where this leads {#leads}

Magnetism and superconductivity are the gateway to the physics of correlated and collective states, the frontier of the subject. Spin waves, the low-energy excitations of a ferromagnet, are quantised as **magnons**, the magnetic analogue of the phonons of [[condensed-matter/lattice-vibrations]]. The general framework of order parameters and broken symmetry, of which the magnetisation and the superconducting wavefunction are the two examples here, is that of [[statistical-mechanics/phase-transitions]]; in a superconductor the broken symmetry is the phase of a complex field, and the same mathematics, transplanted into particle physics, gives the Higgs mechanism discussed in [[particles/standard-model]]. Superconducting magnets, SQUIDs and qubits are the engineering side. For the full story, Kittel's chapters on magnetism and superconductivity, Blundell's *Magnetism in Condensed Matter* and Tinkham's *Introduction to Superconductivity* are the next books.

::: summary
- Classical charges cannot be magnetised (Bohr–van Leeuwen); all magnetism is quantum. Closed shells give a weak diamagnetism $\chi\sim-10^{-5}$.
- Independent moments give Curie's law $\chi = C/T$, with $C = \mu_0n\mu_B^2/k_B$ for spin $\frac12$; conduction electrons give only a small, constant Pauli susceptibility.
- Ferromagnetism comes from exchange, a spin-dependent Coulomb energy $-J\mathbf S_i\cdot\mathbf S_j$, not from dipolar forces, which are a thousand times too weak.
- Mean-field theory gives $m = \tanh(T_cm/T)$, spontaneous order below $k_BT_c = zJ/4$ (spin $\frac12$), and the Curie–Weiss law $\chi = C/(T - T_c)$ above.
- A superconductor has zero resistance and expels magnetic fields (Meissner); the London equation confines fields to a depth $\lambda_L = \sqrt{m/\mu_0n_se^2}$, tens of nanometres.
- BCS: electrons bind into Cooper pairs via phonons, with gap $\Delta(0) = 1.764\,k_BT_c$; flux through a ring is quantised in units of $h/2e$, and a Josephson junction converts voltage to frequency at $2e/h$.
- Cuprate superconductors reach $133\,\mathrm K$ at ambient pressure; their mechanism is still unresolved.
:::

## Exercises {#exercises}

::: exercise Gadolinium {level=1 check="7.94"}
The $\mathrm{Gd^{3+}}$ ion has $S = \frac72$, $L = 0$, so $J = \frac72$ and $g = 2$. Find its effective number of Bohr magnetons $p = g\sqrt{J(J+1)}$.
::: solution
$J(J+1) = \frac72\cdot\frac92 = \frac{63}{4}$, so $p = 2\sqrt{63/4} = \sqrt{63} = 7.94$. Measured Curie constants of gadolinium salts give $p\approx8.0$, in close agreement, because with $L = 0$ there is no orbital moment for the crystal field to quench. Half-filled shells are the cleanest test of the theory of paramagnetic ions.
:::
:::

::: exercise A salt at liquid-helium temperature {level=1 check="0.0108"}
Using the Curie constant $C = 0.0432\,\mathrm K$ of [[#ex-curie-salt]], find the susceptibility of copper sulphate at $4.0\,\mathrm K$.
::: solution
$\chi = C/T = 0.0432/4.0 = 0.0108$. It is still small enough for the linear law to hold in modest fields: the condition $\mu_BB\ll k_BT$ at $4\,\mathrm K$ means $B\ll k_BT/\mu_B = 6\,\mathrm T$.
:::
:::

::: exercise The Josephson constant {level=1 check="483.6"}
Find the AC Josephson frequency, in GHz, across a junction biased at $1.000\,\mathrm{mV}$.
::: solution
$f = 2eV/h = (2\times1.602177\times10^{-19}/6.626070\times10^{-34})\times10^{-3}\,\mathrm{Hz} = 4.836\times10^{11}\,\mathrm{Hz} = 483.6\,\mathrm{GHz}$. One millivolt corresponds to a frequency in the sub-millimetre band, which is why Josephson junctions are used as detectors and mixers in radio astronomy.
:::
:::

::: exercise The Weiss field {level=2 check="1553"}
Evaluate $k_BT_c/\mu_B$, in tesla, for iron with $T_c = 1043\,\mathrm K$, to four significant figures.
::: solution
$k_BT_c/\mu_B = (1.380649\times10^{-23}\times1043)/(9.2740101\times10^{-24})\,\mathrm T = 1.4400\times10^{-20}/9.2740\times10^{-24}\,\mathrm T = 1553\,\mathrm T$. As [[#ex-weiss-field]] shows, it is far beyond any field that the neighbouring dipoles could produce; the saturation magnetisation of iron gives $\mu_0M_s\approx2.2\,\mathrm T$. The molecular field is a bookkeeping device for the exchange energy.
:::
:::

::: exercise A BCS gap {level=2 check="1.41"}
Using the BCS relation, find $\Delta(0)$ in meV for niobium, $T_c = 9.25\,\mathrm K$.
::: solution
$\Delta(0) = 1.764\,k_BT_c = 1.764\times(8.6173\times10^{-5}\times9.25)\,\mathrm{eV} = 1.764\times0.7971\,\mathrm{meV} = 1.41\,\mathrm{meV}$, as in [[#ex-bcs-gap]]. Niobium's gap, the largest of the elements, is why superconducting radio-frequency cavities for accelerators are made of niobium and operated at about $2\,\mathrm K$, where the density of thermally broken pairs, $\propto e^{-\Delta/k_BT}$, is tiny.
:::
:::

::: exercise The critical field of lead {level=2 check="0.0529"}
Lead has $T_c = 7.19\,\mathrm K$ and $B_c(0) = 0.0803\,\mathrm T$. Using $B_c(T) = B_c(0)[1 - (T/T_c)^2]$, find $B_c$ at $4.2\,\mathrm K$ in tesla.
::: solution
$(T/T_c)^2 = (4.2/7.19)^2 = 0.3412$, so $B_c = 0.0803\times0.6588\,\mathrm T = 0.0529\,\mathrm T$. A lead wire at liquid-helium temperature loses its superconductivity in a field of about $53\,\mathrm{mT}$, including the field of its own current, which limits the current a type I wire can carry. That is why superconducting magnets use type II materials.
:::
:::

::: exercise The penetration depth of tin {level=2 check="13.8"}
Tin has four conduction electrons per atom, density $7.29\,\mathrm{g/cm^3}$ and molar mass $118.71\,\mathrm{g/mol}$. Taking all of them as superconducting, find $\lambda_L$ in nanometres.
::: solution
$n_s = 4\times7290\times6.02214\times10^{23}/0.11871 = 1.479\times10^{29}\,\mathrm{m^{-3}}$. Then by [[#eq-lambda]], $\lambda_L = \sqrt{m/(\mu_0n_se^2)} = 1.38\times10^{-8}\,\mathrm m = 13.8\,\mathrm{nm}$. The measured value is about $34\,\mathrm{nm}$. The free-electron $n_s$ and mass are only estimates, and in tin the coherence length exceeds $\lambda_L$, so the local London relation between current and field is not accurate; Pippard's non-local generalisation accounts for the difference.
:::
:::

::: exercise Magnetisation just below the Curie point {level=3 check="sqrt(3)"}
Show from the zero-field mean-field equation $m = \tanh(m/t)$, $t = T/T_c$, that $m\approx A\sqrt{1 - t}$ for $t$ slightly below $1$, and find $A$.
::: hint
Use $\tanh y\approx y - y^3/3$ and keep the lowest orders in $1 - t$.
:::
::: solution
For small $m$, $m = m/t - m^3/(3t^3) + \dots$. Divide by $m\neq0$: $1 = 1/t - m^2/(3t^3)$, so

$$
m^2 = 3t^3\Bigl(\frac1t - 1\Bigr) = 3t^2(1 - t).
$$

Near $t = 1$, $t^2\approx1$, so $m\approx\sqrt3\sqrt{1 - t}$ and $A = \sqrt3\approx1.732$. The exponent $\frac12$ is the mean-field value of $\beta$; real three-dimensional magnets have $\beta\approx0.33$–$0.37$, as noted after [[#thm-mean-field]].
:::
:::

::: exercise Field in a superconducting slab {level=3}
A superconducting slab occupies $-d/2 < x < d/2$ in a uniform applied field $B_0\hat{\mathbf z}$ outside. Solve [[#eq-lambda]] to find $B(x)$, and find the average field inside when $d\gg\lambda_L$ and when $d\ll\lambda_L$.
::: solution
With $\mathbf B = B(x)\hat{\mathbf z}$, $B'' = B/\lambda_L^2$, and by symmetry $B$ is even in $x$, so $B = c\cosh(x/\lambda_L)$. Matching $B(\pm d/2) = B_0$ gives $B(x) = B_0\cosh(x/\lambda_L)/\cosh(d/2\lambda_L)$, the curve of the third figure. The average is

$$
\bar B = \frac{1}{d}\int_{-d/2}^{d/2}B\,\dd x = B_0\frac{2\lambda_L}{d}\tanh\frac{d}{2\lambda_L}.
$$

For $d\gg\lambda_L$, $\tanh\to1$ and $\bar B\approx2\lambda_LB_0/d\ll B_0$: the field is expelled except from two skins of depth $\lambda_L$. For $d\ll\lambda_L$, $\tanh y\approx y - y^3/3$ gives $\bar B\approx B_0\bigl(1 - d^2/12\lambda_L^2\bigr)\approx B_0$: the field penetrates almost completely. Thin films therefore have much higher critical fields than bulk samples, since they expel little field and pay little magnetic energy.
:::
:::

::: exercise The Curie–Weiss law for general spin {level=3}
For moments of spin $S$ with $g = 2$, the isolated-ion Curie law is $M = n\,(4\mu_B^2S(S+1)/3k_BT)\,B$. Assume the moments feel a molecular field $B + \lambda\mu_0M$. Show that $\chi = C/(T - \theta)$ with $\theta = \lambda C$, where $C$ is the isolated-ion Curie constant.
::: solution
Write the isolated-ion law as $\mu_0M = (C/T)B_\mathrm{eff}$ with $C = \mu_0n\cdot4\mu_B^2S(S+1)/(3k_B)$. With $B_\mathrm{eff} = B + \lambda\mu_0M$,

$$
\mu_0M = \frac CT\bigl(B + \lambda\mu_0M\bigr) \quad\Longrightarrow\quad \mu_0M\Bigl(1 - \frac{\lambda C}{T}\Bigr) = \frac CTB \quad\Longrightarrow\quad \mu_0M = \frac{C}{T - \lambda C}B.
$$

So $\chi = \mu_0M/B = C/(T - \theta)$ with $\theta = \lambda C$. The susceptibility diverges at $T = \theta$, where an infinitesimal field produces a finite magnetisation: the onset of spontaneous order, at $T_c = \theta$ in mean-field theory. Exchange enters only through $\lambda$; comparing with [[#thm-mean-field]] for spin $\frac12$ gives $\lambda C = zJ/4k_B$.
:::
:::
