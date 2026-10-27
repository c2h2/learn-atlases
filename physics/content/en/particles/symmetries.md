Most of what we know about the interactions of particles was learned before anyone could calculate with them, by asking what they conserve. If a reaction never happens although energy would allow it, some quantity must forbid it; if two reactions happen at rates in a fixed ratio, some symmetry must relate them. Symmetry arguments are the most robust tools of particle physics, because they survive our ignorance of the dynamics. They also produced the biggest surprises of the subject: the discovery in 1957 that the weak interaction distinguishes left from right, and the discovery in 1964 that it distinguishes, very slightly, matter from antimatter.

This chapter starts with the link between symmetries and conservation laws, then treats the three discrete symmetries, parity P, charge conjugation C and time reversal T, with the experiments that showed which interactions respect them. It then turns to the approximate internal symmetries of the strong interaction, isospin and its extension to SU(3) flavour, which organised the hadron spectrum into Gell-Mann's Eightfold Way and led to quarks. It ends with the idea of a **local** or **gauge** symmetry, from which the interactions of [[particles/standard-model]] are derived.

You will need angular momentum and its addition from [[quantum-1/angular-momentum]] and [[quantum-1/spin]], identical particles from [[quantum-2/identical-particles]], and the particle content of the Standard Model. Particle data are from the PDG *Review of Particle Physics* (2024).

## Symmetries and conservation laws {#noether}

A **symmetry** of a physical system is a transformation that leaves its laws unchanged. In quantum mechanics a symmetry is represented by a unitary operator $U$ that commutes with the Hamiltonian, $[U, H] = 0$. Then if $\psi$ solves the Schrödinger equation, so does $U\psi$.

::: theorem Symmetry implies conservation {#thm-noether}
Let $U$ be a unitary operator with $[U, H] = 0$, and let $Q$ be a Hermitian operator that commutes with $H$. Then the expectation value of $Q$ is constant in time in every state. In particular, if $U(\theta) = e^{-i\theta Q}$ is a continuous family of symmetries, its generator $Q$ is conserved; and if $U$ is itself Hermitian as well as unitary (so $U^2 = 1$), its eigenvalues $\pm1$ are conserved.
:::

::: proof
For any state, $\deriv{}{t}\langle Q\rangle = \frac{i}{\hbar}\langle[H, Q]\rangle$ (Ehrenfest's theorem, [[quantum-1/formalism]]), which vanishes when $[H, Q] = 0$. For a continuous family, differentiating $[e^{-i\theta Q}, H] = 0$ at $\theta = 0$ gives $-i[Q, H] = 0$. For a Hermitian unitary $U$, the operator is itself an observable with $U^2 = 1$, so its eigenvalues are $\pm1$, and $[U, H] = 0$ means that an eigenstate of $U$ evolves into an eigenstate with the same eigenvalue.
:::

This is the quantum form of Emmy Noether's theorem (1918). Translations in space give conservation of momentum, translations in time energy, rotations angular momentum. Phase rotations of a charged field, $\psi \to e^{iq\theta}\psi$, give conservation of electric charge. Continuous symmetries give **additive** conserved quantities: the charge of a system is the sum of the charges of its parts. Discrete symmetries such as parity give **multiplicative** ones: the parity of a system is the product of the parities of its parts, times a factor from their relative motion.

The pattern of what each interaction conserves is the key to classifying processes.

| quantity | strong | electromagnetic | weak |
|---|---|---|---|
| energy, momentum, angular momentum, charge | yes | yes | yes |
| baryon number $B$, lepton number $L$ | yes | yes | yes |
| quark flavours (strangeness $S$, charm, …) | yes | yes | no |
| isospin $I$ | yes (approximately) | no | no |
| parity P, charge conjugation C | yes | yes | no |
| CP | yes | yes | no (violated at $\sim10^{-3}$) |
| CPT | yes | yes | yes |

A process allowed by every conservation law will happen, at a rate set by the strongest interaction that can produce it. A strong decay, such as $\Delta^{++} \to p\pi^+$, takes about $10^{-23}\,\mathrm{s}$; an electromagnetic decay, such as $\pi^0 \to \gamma\gamma$, about $10^{-16}\,\mathrm{s}$; a weak decay anything from $10^{-13}\,\mathrm{s}$ to minutes. When a particle that could decay strongly lives for $10^{-10}\,\mathrm{s}$ instead, as the $\Lambda$ does, a conservation law of the strong interaction (here, strangeness) must forbid the faster route.

::: example Why the Lambda is long-lived {#ex-lambda}
The $\Lambda$ ($uds$, mass $1115.7\,\mathrm{MeV}$) decays as $\Lambda \to p\pi^-$ with lifetime $2.6\times10^{-10}\,\mathrm{s}$. Show that this decay is energetically allowed and that it conserves charge and baryon number, find which conserved quantity of the strong interaction it violates, and explain the lifetime.
::: solution
The products have total mass $938.3 + 139.6 = 1077.8\,\mathrm{MeV}$, less than $1115.7\,\mathrm{MeV}$, so $Q = 37.9\,\mathrm{MeV} > 0$. Charge: $0 \to +1 - 1 = 0$. Baryon number: $1 \to 1 + 0$. The $\Lambda$ contains an $s$ quark and has strangeness $S = -1$; the proton ($uud$) and $\pi^-$ ($d\bar u$) have $S = 0$. The decay changes strangeness by one unit, which the strong and electromagnetic interactions forbid, so it must go by the weak interaction: the $s$ quark becomes a $u$ quark by emitting a $W^-$, which makes a $d\bar u$ pair. Weak processes are slow, so the $\Lambda$ lives about $10^{13}$ times longer than a strong decay would take. This is exactly the "strange" behaviour (produced strongly in pairs, decaying weakly) that led Gell-Mann and Kazuhiko Nishijima to introduce strangeness in 1953–55.
:::
:::

## Parity {#parity}

::: definition Parity {#def-parity}
The **parity operator** P reflects all spatial coordinates, $P\psi(\mathbf{r}) = \psi(-\mathbf{r})$. It reverses momenta, $\mathbf{p} \to -\mathbf{p}$, and leaves angular momenta (axial vectors such as $\mathbf{L} = \mathbf{r}\times\mathbf{p}$ and spin) unchanged. Since $P^2 = 1$, its eigenvalues are $\pm1$. A particle at rest has an **intrinsic parity** $\eta = \pm1$; a state of orbital angular momentum $\ell$ has orbital parity $(-1)^\ell$, because $Y_\ell^m(-\hat{\mathbf{r}}) = (-1)^\ell Y_\ell^m(\hat{\mathbf{r}})$.
:::

By convention the proton and neutron have parity $+1$, and so do the quarks. A fermion and its antifermion have opposite intrinsic parities (a consequence of the Dirac equation), so a $q\bar q$ meson with orbital angular momentum $\ell$ has $P = (-1)^{\ell+1}$: the pion, kaon and other pseudoscalar mesons, with $\ell = 0$ and spins antiparallel, have $J^P = 0^-$; the $\rho$, $\omega$ and $J/\psi$, with $\ell = 0$ and spins parallel, have $J^P = 1^-$. Bosons and their antiparticles have the same parity. The photon has $P = -1$, the parity of a vector field.

That the pion has negative parity was established experimentally, by an argument that uses nothing but angular momentum, the Pauli principle and parity conservation.

::: proposition The parity of the pion {#prop-pion-parity}
A $\pi^-$ captured into the lowest ($1s$) orbit of a pionic deuterium atom is absorbed by the reaction $\pi^- + d \to n + n$. Given that the deuteron has $J^P = 1^+$, that the pion has spin 0, and that parity and angular momentum are conserved, the intrinsic parity of the pion is $-1$.
:::

::: proof
The initial state has orbital angular momentum $\ell = 0$ between pion and deuteron, so its total angular momentum is the deuteron's $J = 1$ and its parity is $\eta_\pi\eta_d(-1)^0 = \eta_\pi$. The final state of two neutrons, each of intrinsic parity $+1$, has parity $(-1)^L$, where $L$ is their relative orbital angular momentum; it must also have $J = 1$. The neutrons are identical fermions, so their state must be antisymmetric under exchange. Exchange multiplies the spatial part by $(-1)^L$ and the spin part by $+1$ for $S = 1$ and $-1$ for $S = 0$, so antisymmetry requires $L + S$ even. The states with $J = 1$ are ${}^3S_1$, ${}^1P_1$, ${}^3P_1$ and ${}^3D_1$ (in the notation ${}^{2S+1}L_J$). Of these only ${}^3P_1$ has $L + S$ even. So the final state has $L = 1$ and parity $-1$, and parity conservation gives $\eta_\pi = -1$.
:::

### The fall of parity

For thirty years after Eugene Wigner had shown how parity applies to atomic states, everyone assumed that all interactions conserve it. The first crack was the **θ–τ puzzle** of the early 1950s: two strange mesons, called $\theta^+$ and $\tau^+$, had the same mass and lifetime, but one decayed into two pions and the other into three. The two-pion state of a spin-0 particle has parity $+1$; the three-pion state, as you will show in the exercises, has parity $-1$. If parity were conserved, they had to be different particles. In 1956 Tsung-Dao Lee and Chen-Ning Yang pointed out that no experiment had ever tested parity in weak interactions, and proposed several tests. (The $\theta$ and $\tau$ are both what we now call the $K^+$.)

Chien-Shiung Wu and collaborators at the National Bureau of Standards carried out the first test, published in February 1957. They cooled ${}^{60}\mathrm{Co}$ nuclei to about $0.01\,\mathrm{K}$ in a magnetic field so that their spins were aligned, and counted the electrons emitted in beta decay along and against the direction of nuclear spin. Under parity the spin, an axial vector, is unchanged, while the electron momentum is reversed. A parity-invariant law must therefore give equal rates along and against the spin. Wu found that electrons were emitted preferentially *opposite* to the nuclear spin, with the asymmetry reversing when the field was reversed. The angular distribution is

$$
W(\theta) \propto 1 + a\,P\,\frac{v}{c}\cos\theta ,
$$ {#eq-wu}

where $\theta$ is the angle between the electron momentum and the nuclear spin, $P$ is the nuclear polarisation and $a = -1$ for this pure Gamow–Teller transition. Within days, Richard Garwin, Leon Lederman and Marcel Weinrich at Columbia, and Jerome Friedman and Valentine Telegdi at Chicago, saw the same violation in the decay chain $\pi \to \mu \to e$. Lee and Yang received the 1957 Nobel Prize.

::: widget plot
f: 1 + a P b cos(x); 1
x: 0, pi
y: 0, 2
sliders: a=-1:-1:1:0.05; P=0.6:0:1:0.05; b=0.9:0:1:0.01
labels: electron rate W(θ) relative to the mean; parity-conserving expectation
piticks: true
caption: The electron angular distribution [[#eq-wu]] against the angle $\theta$ between the electron's direction and the nuclear spin. With the opening values $a = -1$ (cobalt-60), polarisation $P = 0.6$ and $v/c = 0.9$, the rate is highest at $\theta = \pi$, against the spin. Set $P = 0$, an unpolarised source, and the curve becomes flat, which is why no asymmetry had been seen before. A parity-conserving law would force the flat line whatever $P$ is; any slope at all is the violation.
:::

### Helicity and the handedness of the weak interaction

The cleanest way to say what the weak interaction does is in terms of **helicity**, the component of spin along the direction of motion, $h = \mathbf{S}\cdot\hat{\mathbf{p}}/\lvert\mathbf{S}\rvert$. Under parity, $\mathbf{p}$ reverses and $\mathbf{S}$ does not, so P turns a state of helicity $+1$ ("right-handed") into one of helicity $-1$ ("left-handed"). Maurice Goldhaber, Lee Grodzins and Andrew Sunyar measured the helicity of the neutrino in 1958, from the polarisation of the photon emitted after electron capture in ${}^{152}\mathrm{Eu}$, and found it to be left-handed. Every neutrino ever observed is left-handed and every antineutrino right-handed. The charged-current weak interaction couples only to left-handed fermions and right-handed antifermions, in the limit of zero mass; it violates parity maximally.

::: example The helicity suppression of pion decay {#ex-helicity}
The $\pi^+$ (spin 0) decays almost always to $\mu^+\nu_\mu$, and only rarely to $e^+\nu_e$, although the electron mode has far more phase space. Explain this, and compute the ratio $R = \Gamma(\pi \to e\nu)/\Gamma(\pi \to \mu\nu)$ from the standard result

$$
R = \left(\frac{m_e}{m_\mu}\right)^2\left(\frac{m_\pi^2 - m_e^2}{m_\pi^2 - m_\mu^2}\right)^2 .
$$
::: solution
In the pion rest frame the charged lepton and the neutrino fly apart back to back. The pion has spin 0, so their spins must be opposite, and because their momenta are also opposite, their helicities are equal. The neutrino is left-handed, so the positively charged antilepton must be left-handed too. But the weak interaction produces antileptons right-handed; a left-handed antilepton is possible only because it has mass, with an amplitude proportional to $m/E$. The electron is $200$ times lighter than the muon, so its decay is heavily suppressed. That is the origin of the factor $(m_e/m_\mu)^2$; the second factor is the ratio of phase spaces.

With $m_e = 0.511$, $m_\mu = 105.658$ and $m_\pi = 139.570\,\mathrm{MeV}$:

$$
\left(\frac{m_e}{m_\mu}\right)^2 = 2.339\times10^{-5}, \qquad \frac{m_\pi^2 - m_e^2}{m_\pi^2 - m_\mu^2} = \frac{19479.8}{8316.3} = 2.342 ,
$$

so $R = 2.339\times10^{-5} \times 2.342^2 = 1.283\times10^{-4}$. The measured value is $1.233\times10^{-4}$; the $4\%$ difference is a well-understood radiative correction. Had the interaction coupled to both helicities equally, the electron mode would dominate by a factor of about $5$. Its suppression, observed at CERN in 1958, confirmed the left-handed structure.
:::
:::

::: quiz
A right-handed neutrino is produced in a hypothetical experiment. Which symmetry transformation, applied to the familiar left-handed neutrino, would give this state?
- [x] Parity
- [ ] Charge conjugation
- [ ] CP
- [ ] Time reversal
::: solution
Parity reverses the momentum but not the spin, so it flips the helicity and leaves particle as particle: P turns a left-handed neutrino into a right-handed neutrino, a state not produced by the weak interaction. C turns it into a left-handed antineutrino, also not produced. CP gives a right-handed antineutrino, which is exactly what the weak interaction produces, which is why CP survived the fall of parity. Time reversal reverses both momentum and spin, leaving helicity unchanged.
:::
:::

## Charge conjugation and CP {#cp}

::: definition Charge conjugation {#def-c}
The operator **C** replaces every particle by its antiparticle, leaving positions, momenta and spins unchanged. A system that is its own antiparticle, such as $\gamma$, $\pi^0$ or a particle–antiparticle pair, can be an eigenstate of C, with eigenvalue $C = \pm1$, called its **C-parity**. The photon has $C = -1$, because the electromagnetic field changes sign when charges do. A fermion–antifermion pair with orbital angular momentum $L$ and total spin $S$ has $C = (-1)^{L+S}$.
:::

The strong and electromagnetic interactions conserve C. The $\pi^0$ decays to $\gamma\gamma$, so $C(\pi^0) = (-1)^2 = +1$, consistent with $L = S = 0$ for a $q\bar q$ state; the decay $\pi^0 \to 3\gamma$ would need $C = -1$ and has never been seen (branching ratio below $3\times10^{-8}$). The two ground states of positronium differ in exactly this way: the singlet ${}^1S_0$ has $C = +1$ and decays to two photons in $0.125\,\mathrm{ns}$, the triplet ${}^3S_1$ has $C = -1$, must emit three, and lives $142\,\mathrm{ns}$.

The weak interaction violates C as badly as P: C turns a left-handed neutrino into a left-handed antineutrino, which does not interact. But the combined operation **CP** turns a left-handed neutrino into a right-handed antineutrino, which does. In 1957 Lev Landau and others proposed that CP is the true symmetry of nature, with mirror reflection accompanied by exchanging matter and antimatter.

### Neutral kaons and the 1964 discovery

The neutral kaons offered a sensitive test. The $K^0$ ($d\bar s$) and $\bar K^0$ ($s\bar d$) are distinct particles, with strangeness $+1$ and $-1$, but the weak interaction, which changes strangeness, can turn one into the other through second-order processes. The states of definite lifetime are therefore mixtures. With the phase convention $CP\lvert K^0\rangle = \lvert\bar K^0\rangle$, the CP eigenstates are

$$
\lvert K_1\rangle = \frac{\lvert K^0\rangle + \lvert\bar K^0\rangle}{\sqrt2} \;(CP = +1), \qquad \lvert K_2\rangle = \frac{\lvert K^0\rangle - \lvert\bar K^0\rangle}{\sqrt2} \;(CP = -1).
$$ {#eq-k1k2}

A two-pion state from a spin-0 particle has $CP = +1$, and the three-pion state has $CP = -1$. If CP were conserved, $K_1$ would decay to $\pi\pi$, quickly because the phase space is large, and $K_2$ only to $\pi\pi\pi$, slowly. That is what is observed, almost: the short-lived $K_S$ has lifetime $0.895\times10^{-10}\,\mathrm{s}$, the long-lived $K_L$ has $5.12\times10^{-8}\,\mathrm{s}$, 571 times longer. Murray Gell-Mann and Abraham Pais predicted the long-lived neutral kaon in 1955, and it was found in 1956.

In 1964 James Christenson, James Cronin, Val Fitch and René Turlay at Brookhaven placed their detector far enough from the target that all $K_S$ had decayed, and found that about two in every thousand $K_L$ decays were to $\pi^+\pi^-$. A state with $CP = -1$ was decaying to a state with $CP = +1$: **CP is violated**. The $K_L$ is mostly $K_2$, with a small admixture $\varepsilon \approx 2.2\times10^{-3}$ of $K_1$. Cronin and Fitch received the Nobel Prize in 1980.

::: widget plot
f: log10(exp(-x) + h^2 exp(-x/571.4) + 2 h exp(-x (1 + 1/571.4)/2) cos(0.474 x - 0.757))
x: 0, 25
y: -6, 0.2
sliders: h=0.00223:0:0.005:0.0001
labels: log10 of the π+π− decay rate, initial K0 beam
caption: The rate of $\pi^+\pi^-$ decays from a beam that starts as pure $K^0$, against time in units of the $K_S$ lifetime, on a logarithmic scale. The steep fall is the $K_S$ component; if CP were conserved ($h = 0$) it would continue down for ever. With the measured $\lvert\eta_{+-}\rvert = h = 2.23\times10^{-3}$, the curve levels off after about $12$ $K_S$ lifetimes at the slowly decaying $K_L$ rate, and in between the two amplitudes interfere, producing a dip and a wiggle at the $K_L$–$K_S$ mass difference. Vary $h$ and watch both the plateau height and the position of the interference dip move. Experiments measured exactly such curves to establish CP violation.
:::

CP violation has since been measured in the decays of $B$ mesons, first by the BaBar experiment at SLAC and the Belle experiment at KEK in 2001, where some asymmetries are large, of order $70\%$, and in $D$ mesons (LHCb, 2019). All the quark-sector results are consistent with the single complex phase of the CKM matrix of [[particles/standard-model]]. Kobayashi and Maskawa shared the 2008 Nobel Prize for showing that such a phase requires at least three generations.

::: application Why there is matter
The universe contains about $6\times10^{-10}$ baryons per photon of the cosmic microwave background, and essentially no antibaryons. Andrei Sakharov showed in 1967 that producing such an asymmetry from a symmetric start requires three conditions: processes that violate baryon number, violation of both C and CP, and a departure from thermal equilibrium. The Standard Model has all three in principle, but its CKM phase produces an asymmetry many orders of magnitude too small. Some additional source of CP violation, perhaps in the neutrino sector, where long-baseline experiments are now measuring it, is required.
:::

### CPT

Gerhart Lüders and Wolfgang Pauli proved in 1954–57 that any Lorentz-invariant local quantum field theory is invariant under the combination CPT, taken in any order. Its consequences, that a particle and its antiparticle have exactly equal masses and lifetimes and opposite magnetic moments, have been tested to extraordinary precision: the $K^0$ and $\bar K^0$ masses agree to better than one part in $10^{18}$. Given CPT, CP violation implies **T violation**, a difference between a process and its time reverse, which was observed directly in $B$-meson transitions by BaBar in 2012.

::: warning A violated symmetry is not a useless one
"P is violated" does not mean parity can be ignored. It is exactly conserved by the strong and electromagnetic interactions, which is why atomic and nuclear states have definite parity and why the selection rules of [[particles/decay]] work; parity violation shows up in nuclear and atomic physics only as tiny admixtures, of order $10^{-7}$, from the weak interaction. Likewise isospin, below, is broken by electromagnetism and by the $u$–$d$ mass difference, but holds to about $1\%$. Know which interaction breaks a symmetry and by how much before discarding it.
:::

## Isospin {#isospin}

The proton and neutron have nearly equal masses ($0.14\%$ apart) and, apart from the proton's charge, interact identically through the strong force: the $pp$, $nn$ and $np$ forces in the same quantum state are the same, a property called **charge independence**. Werner Heisenberg suggested in 1932 that they be regarded as two states of one particle, the **nucleon**, distinguished by an internal quantum number. The mathematics is that of spin $\tfrac12$.

::: definition Isospin {#def-isospin}
**Isospin** is an internal quantum number with the algebra of angular momentum. The nucleon is an isospin doublet, $I = \tfrac12$, with $\lvert p\rangle = \lvert\tfrac12, +\tfrac12\rangle$ and $\lvert n\rangle = \lvert\tfrac12, -\tfrac12\rangle$. The pions form a triplet, $I = 1$, with $\lvert\pi^+\rangle = \lvert 1, +1\rangle$, $\lvert\pi^0\rangle = \lvert 1, 0\rangle$, $\lvert\pi^-\rangle = \lvert 1, -1\rangle$. The strong interaction is invariant under rotations in isospin space, so total isospin $I$ and its third component $I_3$ are conserved, and states of a multiplet have the same mass up to electromagnetic and quark-mass corrections. For hadrons of the light quarks, $Q = I_3 + \tfrac12(B + S)$ (the **Gell-Mann–Nishijima** relation).
:::

In the quark model, isospin is the symmetry that exchanges $u$ and $d$: $u$ has $I_3 = +\tfrac12$, $d$ has $I_3 = -\tfrac12$. It is a good symmetry because both quark masses, a few MeV, are tiny compared with the hadronic scale of hundreds of MeV, not because they are equal.

Isospin conservation predicts ratios of cross-sections, using exactly the Clebsch–Gordan coefficients that combine angular momenta in [[quantum-1/angular-momentum]].

::: theorem Isospin and the ratio of pion production {#thm-isospin-ratio}
If the strong interaction conserves isospin, then near the same energy

$$
\frac{\sigma(p + p \to d + \pi^+)}{\sigma(n + p \to d + \pi^0)} = 2 .
$$
:::

::: proof
The deuteron has $I = 0$ (it is the only bound two-nucleon state, and its partners with $I = 1$, a bound $pp$ or $nn$, do not exist). So $d + \pi$ has $I = 1$, and the final states are $\lvert d\pi^+\rangle = \lvert 1, 1\rangle$ and $\lvert d\pi^0\rangle = \lvert 1, 0\rangle$.

For the initial states, combine two isospin-$\tfrac12$ nucleons: $\lvert pp\rangle = \lvert 1, 1\rangle$, while $\lvert np\rangle = \tfrac{1}{\sqrt2}\bigl(\lvert 1, 0\rangle - \lvert 0, 0\rangle\bigr)$ (up to the sign convention for the singlet). Isospin conservation means the amplitude connects only states of the same $I$, and by the Wigner–Eckart theorem it is the same for every $I_3$ within the multiplet: call it $\mathcal{M}_1$. Then

$$
\mathcal{M}(pp \to d\pi^+) = \mathcal{M}_1, \qquad \mathcal{M}(np \to d\pi^0) = \tfrac{1}{\sqrt2}\mathcal{M}_1 ,
$$

the $I = 0$ part of $np$ contributing nothing. Cross-sections are proportional to the squared amplitudes, with the same phase space up to tiny mass differences, so the ratio is $1/(1/2) = 2$. Experiment agrees.
:::

::: example The Δ resonance {#ex-delta}
Near $1232\,\mathrm{MeV}$ the cross-section for pion–nucleon scattering is dominated by the $\Delta$ resonance, which has $I = \tfrac32$. Using $\lvert\pi^+p\rangle = \lvert\tfrac32, \tfrac32\rangle$ and $\lvert\pi^-p\rangle = \sqrt{\tfrac13}\lvert\tfrac32, -\tfrac12\rangle - \sqrt{\tfrac23}\lvert\tfrac12, -\tfrac12\rangle$, predict the ratio of the elastic cross-sections $\sigma(\pi^+p \to \pi^+p) : \sigma(\pi^-p \to \pi^-p) : \sigma(\pi^-p \to \pi^0n)$ at the peak.
::: solution
At the resonance only the $I = \tfrac32$ amplitude $\mathcal{M}_{3/2}$ matters; set $\mathcal{M}_{1/2} = 0$. The isospin rotation that relates states within the $\tfrac32$ multiplet leaves the amplitude unchanged, so

$$
\mathcal{M}(\pi^+p \to \pi^+p) = \mathcal{M}_{3/2}, \qquad \mathcal{M}(\pi^-p \to \pi^-p) = \tfrac13\mathcal{M}_{3/2},
$$

the second because the initial and final states each carry the coefficient $\sqrt{1/3}$ of their $I = \tfrac32$ part. For charge exchange the final state is $\lvert\pi^0n\rangle = \sqrt{\tfrac23}\lvert\tfrac32, -\tfrac12\rangle + \sqrt{\tfrac13}\lvert\tfrac12, -\tfrac12\rangle$, so $\mathcal{M}(\pi^-p \to \pi^0n) = \sqrt{\tfrac13}\sqrt{\tfrac23}\mathcal{M}_{3/2} = \tfrac{\sqrt2}{3}\mathcal{M}_{3/2}$. Squaring, the cross-sections are in the ratio

$$
1 : \tfrac19 : \tfrac29 = 9 : 1 : 2 .
$$

The total $\pi^-p$ cross-section is $\tfrac19 + \tfrac29 = \tfrac13$ of the $\pi^+p$ one, and the measured peaks, about $200\,\mathrm{mb}$ and $70\,\mathrm{mb}$, agree. Fermi's group at Chicago measured these cross-sections in 1951–52, the first evidence for the $\Delta$.
:::
:::

## SU(3) flavour and the Eightfold Way {#su3}

With the strange particles came a larger, rougher symmetry. Adding strangeness $S$ to $I_3$, Murray Gell-Mann and, independently, Yuval Ne'eman noticed in 1961 that the light hadrons fall into patterns with eight or ten members, the representations of the group SU(3). Gell-Mann called it the **Eightfold Way**.

Plotted with $I_3$ horizontally and strangeness (or hypercharge $Y = B + S$) vertically, the eight spin-$\tfrac12$ baryons of lowest mass form a hexagon with two states at the centre:

| $S$ | members ($I_3$ from left to right) | masses (MeV) |
|---|---|---|
| $0$ | $n$, $p$ | 939.6, 938.3 |
| $-1$ | $\Sigma^-$, $\Sigma^0$ and $\Lambda$, $\Sigma^+$ | 1197.4, 1192.6 and 1115.7, 1189.4 |
| $-2$ | $\Xi^-$, $\Xi^0$ | 1321.7, 1314.9 |

The eight pseudoscalar mesons, $\pi^{\pm,0}$, $K^{+,0}$, $\bar K^{0}$, $K^-$ and $\eta$, form the same pattern, and the spin-$\tfrac32$ baryons form a triangle of ten, the **decuplet**:

| $S$ | members | mass (MeV) |
|---|---|---|
| $0$ | $\Delta^-$, $\Delta^0$, $\Delta^+$, $\Delta^{++}$ | 1232 |
| $-1$ | $\Sigma^{*-}$, $\Sigma^{*0}$, $\Sigma^{*+}$ | 1385 |
| $-2$ | $\Xi^{*-}$, $\Xi^{*0}$ | 1533 |
| $-3$ | $\Omega^-$ | ? (in 1962) |

If SU(3) were exact, all members of a multiplet would have the same mass. It is broken, mainly because the $s$ quark is heavier than $u$ and $d$, so mass grows as strangeness decreases. To first order in the breaking, Gell-Mann and Susumu Okubo derived mass relations; for the decuplet they predict **equal spacing** between the rows.

::: example Predicting the Omega {#ex-omega}
At the 1962 CERN conference only nine members of the decuplet were known. Use equal spacing to predict the mass, strangeness and charge of the tenth, and say how it must decay.
::: solution
The spacings in the table are $1385 - 1232 = 153$ and $1533 - 1385 = 148\,\mathrm{MeV}$, averaging about $150\,\mathrm{MeV}$. The fourth row is then at about $1533 + 150 \approx 1680\,\mathrm{MeV}$. The particle sits at the apex with $I = 0$, $S = -3$; by the Gell-Mann–Nishijima relation $Q = 0 + \tfrac12(1 - 3) = -1$. In the quark model it is $sss$.

Its decay is the clever part. The lightest states with $B = 1$ and $S = -3$ would be $\Xi + \bar K$, at about $1315 + 494 = 1809\,\mathrm{MeV}$, more than the $\Omega^-$ mass. So no strong decay conserving strangeness is possible, and the $\Omega^-$ must decay weakly, changing $S$ by one unit: $\Omega^- \to \Xi^0\pi^-$ or $\Lambda K^-$, with a lifetime of order $10^{-10}\,\mathrm{s}$, long enough to leave a visible track. It was found in a bubble-chamber photograph at Brookhaven in 1964 (Nicholas Samios and collaborators), at $1672\,\mathrm{MeV}$, with lifetime $0.82\times10^{-10}\,\mathrm{s}$.
:::
:::

The patterns cried out for an explanation, and in 1964 Gell-Mann and Zweig gave it: the multiplets are what one gets by combining three fundamental objects, $u$, $d$, $s$, which form the basic triplet of SU(3). A $q\bar q$ pair gives $3 \otimes \bar 3 = 8 \oplus 1$, the meson octet plus a singlet; three quarks give $3 \otimes 3 \otimes 3 = 10 \oplus 8 \oplus 8 \oplus 1$, containing the decuplet and the octet. The decuplet is the totally symmetric combination of flavours, which with symmetric spin is what forced the introduction of colour ([[particles/standard-model]]). The flavour SU(3) of the Eightfold Way is an approximate, accidental symmetry of the light-quark masses; the colour SU(3) of QCD is exact, and is a gauge symmetry.

::: quiz
Which quark content and charge does the $\Xi^{*0}$ (in the decuplet row with $S = -2$, $I_3 = +\tfrac12$) have?
- [x] $uss$, charge $0$
- [ ] $dss$, charge $-1$
- [ ] $uds$, charge $0$
- [ ] $sss$, charge $-1$
::: solution
Strangeness $-2$ means two $s$ quarks. The third quark has $I_3 = +\tfrac12$, so it is a $u$. Charge: $\tfrac23 - \tfrac13 - \tfrac13 = 0$, which agrees with $Q = I_3 + \tfrac12(B + S) = \tfrac12 + \tfrac12(1 - 2) = 0$. The $dss$ state is the $\Xi^{*-}$, $uds$ belongs to the $S = -1$ row, and $sss$ is the $\Omega^-$.
:::
:::

## Gauge symmetry {#gauge}

The deepest use of symmetry in particle physics is to determine the interactions themselves. Conservation of electric charge follows from invariance under a **global** phase change $\psi \to e^{iq\theta}\psi$, the same at every point. Suppose we demand instead invariance under a **local** change, $\psi \to e^{iq\chi(\mathbf{r}, t)/\hbar}\psi$, with $\chi$ an arbitrary function. The free Schrödinger equation is not invariant, because derivatives of $\chi$ appear. Invariance can be restored only by introducing a field that changes in a compensating way, and that field turns out to be electromagnetism.

::: proposition Local phase invariance requires a gauge field {#prop-gauge}
The Schrödinger equation for a particle of charge $q$ in potentials $\phi$ and $\mathbf{A}$,

$$
i\hbar\pdv{\psi}{t} = \left[\frac{1}{2m}\bigl(-i\hbar\nabla - q\mathbf{A}\bigr)^2 + q\phi\right]\psi ,
$$

is unchanged in form by the simultaneous transformations

$$
\psi \to \psi' = e^{iq\chi/\hbar}\psi, \qquad \mathbf{A} \to \mathbf{A}' = \mathbf{A} + \nabla\chi, \qquad \phi \to \phi' = \phi - \pdv{\chi}{t},
$$

for any differentiable function $\chi(\mathbf{r}, t)$. The fields $\mathbf{E} = -\nabla\phi - \partial_t\mathbf{A}$ and $\mathbf{B} = \nabla\times\mathbf{A}$ are unchanged.
:::

::: proof
Write $\mathbf{D} = \nabla - iq\mathbf{A}/\hbar$, so the kinetic operator is $-\hbar^2\mathbf{D}^2/2m$. Then

$$
\mathbf{D}'\psi' = \Bigl(\nabla - \frac{iq}{\hbar}\mathbf{A} - \frac{iq}{\hbar}\nabla\chi\Bigr)\bigl(e^{iq\chi/\hbar}\psi\bigr) = e^{iq\chi/\hbar}\Bigl(\nabla\psi + \frac{iq}{\hbar}\nabla\chi\,\psi - \frac{iq}{\hbar}\mathbf{A}\psi - \frac{iq}{\hbar}\nabla\chi\,\psi\Bigr) = e^{iq\chi/\hbar}\mathbf{D}\psi .
$$

Applying the same identity again (to $\mathbf{D}\psi$, which transforms with the same phase), $\mathbf{D}'^2\psi' = e^{iq\chi/\hbar}\mathbf{D}^2\psi$. For the time derivative, $(i\hbar\partial_t - q\phi')\psi' = e^{iq\chi/\hbar}\bigl(i\hbar\partial_t\psi - q\partial_t\chi\,\psi - q\phi\psi + q\partial_t\chi\,\psi\bigr) = e^{iq\chi/\hbar}(i\hbar\partial_t - q\phi)\psi$. So both sides of the equation for $\psi'$ are $e^{iq\chi/\hbar}$ times the corresponding sides of the equation for $\psi$, and one holds if and only if the other does. Finally $\nabla\times\nabla\chi = 0$ leaves $\mathbf{B}$ unchanged, and $-\nabla(-\partial_t\chi) - \partial_t\nabla\chi = 0$ leaves $\mathbf{E}$ unchanged.
:::

Read backwards, the proposition says: if the laws of physics are to be invariant under local phase changes of a charged field, there must exist a vector field $(\phi, \mathbf{A})$ that couples to the charge in exactly this way. The photon is the quantum of that field, and it must be massless, because a mass term would not be gauge invariant. Chen-Ning Yang and Robert Mills extended the idea in 1954 to symmetries whose transformations do not commute, such as SU(2) and SU(3). Then the gauge fields themselves carry the charge and interact with each other: these are the gluons of QCD, and the $W$ and $Z$ of the electroweak theory, whose masses come from the Higgs mechanism. The whole structure of [[particles/standard-model]] follows from choosing the gauge group $\mathrm{SU}(3)\times\mathrm{SU}(2)\times\mathrm{U}(1)$ and the representations of the fermions.

::: history Symmetry in particle physics
Heisenberg introduced isospin in 1932, and Wigner developed the use of symmetry groups in quantum mechanics from the late 1920s. Yang and Mills proposed non-abelian gauge theory in 1954. Lee and Yang questioned parity conservation in June 1956; Wu's cobalt-60 experiment, with Ernest Ambler, Raymond Hayward, Dale Hoppes and Ralph Hudson, was completed in January 1957, alongside the muon-decay experiments of Garwin, Lederman and Weinrich and of Friedman and Telegdi. Goldhaber, Grodzins and Sunyar measured the neutrino helicity in 1958. Gell-Mann and Ne'eman proposed the Eightfold Way in 1961, the $\Omega^-$ was discovered in 1964, and in the same year Christenson, Cronin, Fitch and Turlay discovered CP violation. Sakharov stated his conditions for the matter–antimatter asymmetry in 1967. Kobayashi and Maskawa explained CP violation with three quark generations in 1973, and large CP violation in $B$ mesons was observed in 2001.
:::

## Where this leads {#leads}

The gauge principle of [[#prop-gauge]] is the starting point for quantum field theory courses, where the Lagrangian of the Standard Model is built from it. Spontaneous breaking of a gauge symmetry, the Higgs mechanism of [[particles/standard-model]], has an analogue in superconductivity ([[condensed-matter/magnetism-superconductivity]]), where the photon effectively acquires a mass inside the superconductor. Flavour symmetries and their breaking remain an active field: precise tests of CKM unitarity, the search for CP violation in neutrino oscillations, and searches for electric dipole moments of the neutron and electron, which would violate both P and T. Cosmological consequences of CP violation are in [[gravitation/cosmology]].

::: summary
- A symmetry represented by a unitary operator commuting with $H$ gives a conservation law: continuous symmetries give additive quantum numbers (momentum, charge), discrete ones multiplicative quantum numbers (parity, C-parity).
- Strong and electromagnetic interactions conserve P, C, T and quark flavours; the weak interaction violates P and C maximally, CP slightly, and changes flavour. All interactions conserve CPT.
- Parity: $P = \eta(-1)^\ell$; the pion has $P = -1$, from $\pi^-d \to nn$. Mesons $q\bar q$ have $P = (-1)^{\ell+1}$ and $C = (-1)^{\ell+S}$.
- Wu's ${}^{60}\mathrm{Co}$ experiment (1957) found beta electrons emitted preferentially against the nuclear spin: parity violation. Neutrinos are left-handed; helicity suppression makes $\pi \to e\nu$ rarer than $\pi \to \mu\nu$ by $1.3\times10^{-4}$.
- Neutral kaons mix; the CP eigenstates are $K_{1,2} = (K^0 \pm \bar K^0)/\sqrt2$. The decay $K_L \to \pi\pi$ (1964) showed CP violation, $\varepsilon \approx 2.2\times10^{-3}$, explained by the CKM phase; matter dominance needs more.
- Isospin, the $u$–$d$ symmetry of the strong interaction, groups hadrons into multiplets and predicts ratios such as $\sigma(pp \to d\pi^+)/\sigma(np \to d\pi^0) = 2$ and $9:1:2$ at the $\Delta$.
- SU(3) flavour (the Eightfold Way) organises hadrons into octets and decuplets, predicted the $\Omega^-$ (found 1964), and led to quarks.
- Local (gauge) invariance requires a gauge field: U(1) gives electromagnetism, SU(3) and SU(2)×U(1) give QCD and the electroweak theory.
:::

## Exercises {#exercises}

::: exercise Allowed or forbidden? {level=1}
For each process, say whether it is allowed, and if so by which interaction; if not, name a conservation law it violates: (a) $\pi^0 \to \gamma\gamma$; (b) $n \to p\,e^-$; (c) $K^+ \to \pi^+\pi^0$; (d) $p \to e^+\pi^0$; (e) $\Delta^+ \to p\pi^0$.
::: solution
(a) Allowed, electromagnetic: charge, C ($+1 \to (-1)^2$) and everything else conserved. (b) Forbidden: it violates lepton number ($0 \to 1$) and angular momentum (spin $\tfrac12$ cannot become two spin-$\tfrac12$ particles with integer total); the real decay includes $\bar\nu_e$. (c) Allowed, weak: strangeness changes from $+1$ to $0$. (d) Forbidden: it violates baryon number ($1 \to 0$) and lepton number; the proton lifetime for this mode exceeds $10^{34}$ years (Super-Kamiokande). (e) Allowed, strong: charge, baryon number, strangeness and isospin ($\tfrac32 \to \tfrac12 \otimes 1$) all conserved; it takes about $5\times10^{-24}\,\mathrm{s}$.
:::
:::

::: exercise Parity of mesons {level=1}
Give $J^P$ and, for the neutral non-strange members, $C$, for $q\bar q$ mesons with (a) $\ell = 0$, $S = 0$; (b) $\ell = 0$, $S = 1$; (c) $\ell = 1$, $S = 1$, $J = 2$. Name an example of each.
::: solution
Using $P = (-1)^{\ell+1}$ and $C = (-1)^{\ell+S}$: (a) $J^{PC} = 0^{-+}$, the $\pi^0$ and $\eta$; (b) $1^{--}$, the $\rho^0$, $\omega$, $\phi$ and $J/\psi$, which share the quantum numbers of the photon and so are produced directly in $e^+e^-$ annihilation; (c) $2^{++}$, the $f_2(1270)$. States with $J^{PC}$ such as $0^{--}$ or $1^{-+}$ cannot be made from $q\bar q$ at all, and are searched for as "exotic" hadrons.
:::
:::

::: exercise The helicity-suppression ratio {level=1 check="1.28e-4"}
Evaluate $R = (m_e/m_\mu)^2\bigl[(m_\pi^2 - m_e^2)/(m_\pi^2 - m_\mu^2)\bigr]^2$ with $m_e = 0.51100$, $m_\mu = 105.658$ and $m_\pi = 139.570\,\mathrm{MeV}$, to three significant figures.
::: solution
$(m_e/m_\mu)^2 = (4.8364\times10^{-3})^2 = 2.3390\times10^{-5}$. $m_\pi^2 = 19\,479.8$, $m_\mu^2 = 11\,163.6$, $m_e^2 = 0.2611$, so the bracket is $19\,479.6/8316.2 = 2.3424$ and its square $5.4867$. Then $R = 2.3390\times10^{-5} \times 5.4867 = 1.28\times10^{-4}$, as in [[#ex-helicity]].
:::
:::

::: exercise A Gell-Mann–Okubo relation {level=2 check="1107"}
For the baryon octet the Gell-Mann–Okubo formula gives $2(m_N + m_\Xi) = 3m_\Lambda + m_\Sigma$, with isospin-averaged masses $m_N = 938.9$, $m_\Sigma = 1193.2$ and $m_\Xi = 1318.3\,\mathrm{MeV}$. Predict $m_\Lambda$ in MeV (to four significant figures) and compare with the measured $1115.7\,\mathrm{MeV}$.
::: solution
$m_\Lambda = [2(m_N + m_\Xi) - m_\Sigma]/3 = [2(2257.2) - 1193.2]/3 = (4514.4 - 1193.2)/3 = 3321.2/3 = 1107\,\mathrm{MeV}$, $0.8\%$ below the measured value. A first-order treatment of SU(3) breaking works to this accuracy because the $s$–$d$ mass difference, about $90\,\mathrm{MeV}$, is small compared with baryon masses.
:::
:::

::: exercise The Δ peak ratio {level=2 check="3"}
Using the decomposition of [[#ex-delta]], show that at the $\Delta$ peak the total cross-sections satisfy $\sigma_\mathrm{tot}(\pi^+p)/\sigma_\mathrm{tot}(\pi^-p) = 3$, if only $I = \tfrac32$ contributes. (The total for $\pi^-p$ includes the elastic and charge-exchange channels.)
::: solution
From [[#ex-delta]], the $\pi^+p$ cross-section is proportional to $\lvert\mathcal{M}_{3/2}\rvert^2$, and the two $\pi^-p$ channels to $\tfrac19\lvert\mathcal{M}_{3/2}\rvert^2$ and $\tfrac29\lvert\mathcal{M}_{3/2}\rvert^2$. The $\pi^-p$ total is $\tfrac13\lvert\mathcal{M}_{3/2}\rvert^2$, so the ratio is $3$. More directly, the probability that a $\pi^-p$ pair is in the $I = \tfrac32$ state is $\lvert\sqrt{1/3}\rvert^2 = \tfrac13$, and only that part resonates.
:::
:::

::: exercise How far does a K-short travel? {level=2 check="53.9"}
The $K_S$ has $c\tau = 2.6844\,\mathrm{cm}$ and mass $497.611\,\mathrm{MeV}/c^2$. Find its mean decay length, in cm, at momentum $10.0\,\mathrm{GeV}/c$. What would the corresponding length be for the $K_L$, with $c\tau = 15.34\,\mathrm{m}$?
::: solution
The mean decay length is $\beta\gamma c\tau$, with $\beta\gamma = p/mc = 10.0/0.497611 = 20.10$. So $\ell_S = 20.10 \times 2.6844\,\mathrm{cm} = 53.9\,\mathrm{cm}$, and $\ell_L = 20.10 \times 15.34\,\mathrm{m} = 308\,\mathrm{m}$. A detector placed $20\,\mathrm{m}$ from the target, as in the 1964 experiment, sees $e^{-2000/53.9} \approx e^{-37}$ of the $K_S$, essentially none, but most of the $K_L$. Any $\pi^+\pi^-$ decays seen there must come from $K_L$.
:::
:::

::: exercise CP violation in numbers {level=2 check="1.97e-3"}
The amplitude ratio $\eta_{+-} = A(K_L \to \pi^+\pi^-)/A(K_S \to \pi^+\pi^-)$ has magnitude $2.232\times10^{-3}$. Given $\tau_L = 5.116\times10^{-8}\,\mathrm{s}$, $\tau_S = 0.8954\times10^{-10}\,\mathrm{s}$ and $B(K_S \to \pi^+\pi^-) = 0.692$, find the branching ratio $B(K_L \to \pi^+\pi^-)$.
::: hint
The partial width is proportional to the squared amplitude: $\Gamma(K_L \to \pi^+\pi^-) = \lvert\eta_{+-}\rvert^2\,\Gamma(K_S \to \pi^+\pi^-)$. A branching ratio is a partial width times the lifetime.
:::
::: solution
$B_L = \Gamma(K_L \to \pi^+\pi^-)\tau_L/\hbar = \lvert\eta_{+-}\rvert^2\,\Gamma(K_S \to \pi^+\pi^-)\tau_L/\hbar = \lvert\eta_{+-}\rvert^2 B_S\,\tau_L/\tau_S$. Numerically, $(2.232\times10^{-3})^2 \times 0.692 \times 571.4 = 4.982\times10^{-6} \times 395.4 = 1.97\times10^{-3}$, matching the measured $1.967\times10^{-3}$. The factor $\tau_L/\tau_S = 571$ is why a tiny amplitude ratio gives a measurable branching ratio: the $K_L$ has few other ways to decay quickly.
:::
:::

::: exercise The θ–τ puzzle {level=3}
A spin-0 particle decays (a) into two pions, (b) into three pions. Show that if parity is conserved, the final state in (a) has parity $+1$, and that in (b), if all relative orbital angular momenta vanish, the parity is $-1$. More generally, show that for three pions with angular momentum $\ell_{12}$ between pions 1 and 2 and $\ell_3$ between their centre of mass and pion 3, total $J = 0$ requires $\ell_{12} = \ell_3$, so that the parity is $-1$ whatever $\ell$ is. Conclude that, if parity were conserved, $\theta^+ \to \pi^+\pi^0$ and $\tau^+ \to \pi^+\pi^+\pi^-$ could not come from the same particle.
::: hint
Spin-zero pions carry no spin, so the total angular momentum is purely orbital. Two angular momenta $\ell_{12}$ and $\ell_3$ can add to zero only if they are equal.
:::
::: solution
(a) Two pions, each of intrinsic parity $-1$, in a state of relative orbital angular momentum $\ell$ have parity $(-1)^2(-1)^\ell = (-1)^\ell$. The parent has spin 0 and the pions none, so conservation of angular momentum requires $\ell = 0$, and the parity is $+1$.

(b) Three pions have intrinsic parity $(-1)^3 = -1$, times the orbital factor $(-1)^{\ell_{12}}(-1)^{\ell_3}$, since each relative coordinate is reversed by P. The total angular momentum is $\boldsymbol{\ell}_{12} + \boldsymbol{\ell}_3$, which can be zero only if $\ell_{12} = \ell_3$ (the triangle rule $\lvert\ell_{12} - \ell_3\rvert \le J$). Then the orbital factor is $(-1)^{2\ell_3} = +1$ and the parity is $-1$ for every allowed configuration, in particular for all $\ell = 0$.

The parent of a two-pion state has parity $+1$ and the parent of a three-pion state has parity $-1$. If parity were conserved in the decay, the parent's parity would equal the final state's, so a single spin-0 particle could not do both. Since the $\theta^+$ and $\tau^+$ had the same mass and lifetime, Lee and Yang concluded that the more economical assumption was a single particle, the $K^+$, and a weak interaction that does not conserve parity.
:::
:::

::: exercise Gauge invariance of the current {level=3}
For the Schrödinger equation with potentials, the probability current is $\mathbf{j} = \frac{1}{m}\mathrm{Re}\bigl[\psi^*(-i\hbar\nabla - q\mathbf{A})\psi\bigr]$. (a) Show that $\mathbf{j}$ and $\rho = \lvert\psi\rvert^2$ are unchanged by the gauge transformation of [[#prop-gauge]]. (b) Show that the naive current $\frac{1}{m}\mathrm{Re}[\psi^*(-i\hbar\nabla)\psi]$ is not gauge invariant, and explain why that means it cannot be a physical observable in the presence of a vector potential.
::: hint
Use $\mathbf{D}'\psi' = e^{iq\chi/\hbar}\mathbf{D}\psi$ from the proof of [[#prop-gauge]], and $(-i\hbar\nabla - q\mathbf{A}) = -i\hbar\mathbf{D}$.
:::
::: solution
(a) $\rho' = \lvert e^{iq\chi/\hbar}\psi\rvert^2 = \lvert\psi\rvert^2$. For the current, $(-i\hbar\nabla - q\mathbf{A}')\psi' = -i\hbar\mathbf{D}'\psi' = e^{iq\chi/\hbar}(-i\hbar\mathbf{D}\psi)$, and $\psi'^* = e^{-iq\chi/\hbar}\psi^*$, so the phases cancel in $\psi'^*(-i\hbar\mathbf{D}'\psi') = \psi^*(-i\hbar\mathbf{D}\psi)$. Hence $\mathbf{j}' = \mathbf{j}$.

(b) $\psi'^*(-i\hbar\nabla)\psi' = \psi^*(-i\hbar\nabla)\psi + q\nabla\chi\,\lvert\psi\rvert^2$, so the naive current changes by $q\lvert\psi\rvert^2\nabla\chi/m$, an arbitrary amount, since $\chi$ is arbitrary. Two gauges describing exactly the same electric and magnetic fields would predict different values, so this quantity cannot be measured. The physical velocity is $(\mathbf{p} - q\mathbf{A})/m$, the "kinetic" momentum, not $\mathbf{p}/m$. The same logic, with matrices in place of phases, fixes how quarks couple to gluons in QCD.
:::
:::
