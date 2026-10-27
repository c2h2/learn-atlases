Put a solution of NADH in a cuvette, shine ultraviolet light of wavelength $340\ \mathrm{nm}$ through it, and the detector records a fraction of the light missing. From that one number a biochemist reads off the concentration to three significant figures. Point a radio telescope at a cold molecular cloud and it records a sharp line at $115.271\ \mathrm{GHz}$, from which an astronomer infers carbon monoxide, its temperature and how fast the cloud is moving. Different instruments, different regions of the spectrum, the same three questions underneath: *where* does a line fall, *how strong* is it, and *how wide* is it? Where a line falls is fixed by the energy levels of the molecule and the Bohr condition $\Delta E = h\nu$. How strong it is depends on a quantum-mechanical integral, the transition dipole moment, which also gives the selection rules, on how many molecules sit in the lower level, and on how much sample the light crosses. How wide it is depends on how long the states live, how fast the molecules move and how often they collide.

This chapter sets up that common machinery once, so that the later chapters on rotational, vibrational and electronic spectra and on magnetic resonance can use it without rederiving it. We start with the units spectroscopists use, derive the transition rate from time-dependent perturbation theory and see how selection rules fall out of it, add the populations of the levels, turn transition rates into the Beer–Lambert law and the oscillator strength, and finish with the three mechanisms that give a line its width. The quantum mechanics assumed — wavefunctions, operators, expectation values and the time–frequency Fourier relation — is that of [[quantum-chemistry/quantum-foundations]]. Constants are CODATA 2018 exact or recommended values; $hc/k_\mathrm{B} = 1.438\,777\ \mathrm{cm\,K}$ is the "second radiation constant" that appears in every Boltzmann factor written with wavenumbers.

## Radiation, energy and the regions of the spectrum

Electromagnetic radiation is described equally by its frequency $\nu$, its wavelength $\lambda$ in vacuum, its wavenumber $\tilde\nu$ or the energy $E$ of one photon. Each branch of spectroscopy has its favourite: radio and microwave spectroscopists quote frequencies in MHz or GHz, infrared spectroscopists quote wavenumbers in $\mathrm{cm^{-1}}$, UV–visible spectroscopists quote wavelengths in nm, and photoelectron spectroscopists quote energies in eV. Fluency in converting between them is the first skill of the subject.

::: definition Frequency, wavenumber and photon energy {#def-units}
For radiation of vacuum wavelength $\lambda$, the **frequency** is $\nu = c/\lambda$, the **wavenumber** is $\tilde\nu = 1/\lambda = \nu/c$ (conventionally in $\mathrm{cm^{-1}}$), and the **photon energy** is
$$
E = h\nu = hc\tilde\nu = \frac{hc}{\lambda} .
$$ {#eq-photon}
A **spectroscopic transition** between molecular states of energies $E_\mathrm{i}$ and $E_\mathrm{f}$ absorbs or emits radiation satisfying the **Bohr frequency condition** $\lvert E_\mathrm{f} - E_\mathrm{i}\rvert = h\nu$. Energy levels are often expressed as **term values** $T = E/hc$ in $\mathrm{cm^{-1}}$, so that a line's wavenumber is simply a difference of terms.
:::

The useful equivalences, all following from [[#eq-photon]], are

| $1\ \mathrm{cm^{-1}}$ corresponds to | value |
|---|---|
| energy per photon | $1.986\,45\times10^{-23}\ \mathrm{J} = 1.239\,84\times10^{-4}\ \mathrm{eV}$ |
| energy per mole of photons | $11.9627\ \mathrm{J\,mol^{-1}}$ |
| frequency | $29.9792458\ \mathrm{GHz}$ |
| temperature ($E/k_\mathrm{B}$) | $1.438\,78\ \mathrm{K}$ |

and $k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$ at $298.15\ \mathrm{K}$. That last number is the yardstick for populations: level spacings much smaller than $200\ \mathrm{cm^{-1}}$ are thermally mixed at room temperature, spacings much larger are not.

The regions of the spectrum correspond to different kinds of molecular motion, because the energy gaps differ by orders of magnitude:

| region | typical $\tilde\nu$ / $\mathrm{cm^{-1}}$ | typical $\lambda$ | what changes |
|---|---|---|---|
| radiofrequency | $10^{-3}$–$10^{-2}$ | m | nuclear spin orientation (NMR) |
| microwave | $0.1$–$10$ | cm–mm | electron spin (EPR); molecular rotation |
| far infrared | $10$–$400$ | $1\ \mathrm{mm}$–$25\ \mu\mathrm{m}$ | rotation of light molecules; low-frequency vibrations |
| mid infrared | $400$–$4000$ | $25$–$2.5\ \mu\mathrm{m}$ | vibration |
| visible and ultraviolet | $1.4\times10^4$–$10^5$ | $700$–$100\ \mathrm{nm}$ | valence electrons |
| X-ray | $> 10^6$ | $< 10\ \mathrm{nm}$ | core electrons |

::: example Converting between the spectroscopic units {#ex-units}
(a) The carbonyl stretch of a ketone absorbs at $1715\ \mathrm{cm^{-1}}$. Give its wavelength, frequency and the energy per mole of photons. (b) A $600\ \mathrm{MHz}$ NMR spectrometer excites protons with photons of what energy per mole? (c) Compare both with the energy of a $500\ \mathrm{nm}$ photon.
::: solution
(a) $\lambda = 1/\tilde\nu = 1/(1715\ \mathrm{cm^{-1}}) = 5.831\times10^{-4}\ \mathrm{cm} = 5.831\ \mu\mathrm{m}$; $\nu = c\tilde\nu = (2.9979\times10^{10}\ \mathrm{cm\,s^{-1}})(1715\ \mathrm{cm^{-1}}) = 5.141\times10^{13}\ \mathrm{Hz} = 51.41\ \mathrm{THz}$; per mole, $E_\mathrm{m} = N_\mathrm{A}hc\tilde\nu = 1715 \times 11.9627\ \mathrm{J\,mol^{-1}} = 20.52\ \mathrm{kJ\,mol^{-1}}$.

(b) $E_\mathrm{m} = N_\mathrm{A}h\nu = (6.0221\times10^{23}\ \mathrm{mol^{-1}})(6.6261\times10^{-34}\ \mathrm{J\,s})(6.00\times10^{8}\ \mathrm{s^{-1}}) = 0.239\ \mathrm{J\,mol^{-1}}$, i.e. $\tilde\nu = 0.0200\ \mathrm{cm^{-1}}$.

(c) A $500\ \mathrm{nm}$ photon has $\tilde\nu = 2.000\times10^4\ \mathrm{cm^{-1}}$, $E = 2.480\ \mathrm{eV}$ and $239.3\ \mathrm{kJ\,mol^{-1}}$ — comparable with a chemical bond energy, which is why ultraviolet light can break bonds and infrared and radio waves cannot. The three photons span six orders of magnitude in energy, and that is the whole reason a single molecule has separate rotational, vibrational, electronic and spin spectra.
:::
:::

## The transition dipole moment and selection rules

Why does a molecule absorb only at certain frequencies, and why are some transitions strong and others absent although the Bohr condition is satisfied? The answer comes from treating the oscillating electric field of the light as a small, time-dependent perturbation on the molecule.

::: definition Transition dipole moment {#def-tdm}
The electric dipole moment operator of a molecule is $\hat{\boldsymbol\mu} = \sum_j q_j\hat{\boldsymbol r}_j$, summed over all electrons and nuclei. The **transition dipole moment** between stationary states $\psi_\mathrm{i}$ and $\psi_\mathrm{f}$ is the vector
$$
\boldsymbol\mu_\mathrm{fi} = \langle \mathrm{f} \vert \hat{\boldsymbol\mu} \vert \mathrm{i}\rangle = \int \psi_\mathrm{f}^*\,\hat{\boldsymbol\mu}\,\psi_\mathrm{i}\,\mathrm{d}\tau .
$$ {#eq-tdm}
A transition is **electric-dipole allowed** if $\boldsymbol\mu_\mathrm{fi} \neq \mathbf 0$ and **forbidden** if it vanishes. A **gross selection rule** states which property a molecule must have for a type of spectrum to exist at all (a permanent dipole for a pure rotational spectrum, a dipole that changes during a vibration for an infrared spectrum); a **specific selection rule** states which changes of quantum number are allowed ($\Delta J = \pm1$, $\Delta v = \pm1$, $\Delta S = 0$).
:::

The transition moment is not the dipole moment of either state. It measures the *oscillating* dipole that appears when the molecule is in a superposition of the two states: a superposition $a\psi_\mathrm{i}\mathrm{e}^{-\mathrm{i}E_\mathrm{i}t/\hbar} + b\psi_\mathrm{f}\mathrm{e}^{-\mathrm{i}E_\mathrm{f}t/\hbar}$ has an expectation value of $\hat{\boldsymbol\mu}$ containing the term $2\,\mathrm{Re}(a^*b\,\boldsymbol\mu_\mathrm{if}\,\mathrm{e}^{-\mathrm{i}\omega_\mathrm{fi}t})$, a charge distribution oscillating at exactly the Bohr frequency $\omega_\mathrm{fi} = (E_\mathrm{f} - E_\mathrm{i})/\hbar$. An oscillating dipole is an antenna: it couples to a light wave of the same frequency, absorbing energy from it or radiating into it. If the two states have no transition moment, the superposition does not oscillate, and the light cannot drive it.

::: proposition Rate of absorption in the dipole approximation {#prop-rate}
Let a molecule with states $\mathrm i$ and $\mathrm f$ ($E_\mathrm{f} > E_\mathrm{i}$) be bathed in isotropic, unpolarised radiation whose energy density per unit frequency interval near $\nu_\mathrm{fi}$ is $\rho(\nu)$, slowly varying across the line. To first order in the field, the probability per unit time that the molecule is promoted from $\mathrm i$ to $\mathrm f$ is
$$
w_{\mathrm{f}\leftarrow\mathrm{i}} = B_\mathrm{fi}\,\rho(\nu_\mathrm{fi}), \qquad B_\mathrm{fi} = \frac{\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2}{6\varepsilon_0\hbar^2} ,
$$ {#eq-rate}
where $B_\mathrm{fi}$ is the **Einstein coefficient of absorption**. Stimulated emission from $\mathrm f$ to $\mathrm i$ has the same coefficient for non-degenerate states. The result assumes that the wavelength is much longer than the molecule (so the field is uniform across it), that the perturbation is weak (populations change little during the interaction) and that the radiation is broad compared with the line.
:::

::: proof First-order time-dependent perturbation theory
Take light polarised along $z$, with field $\mathcal E_0\cos\omega t$; because the wavelength (hundreds of nanometres or more) dwarfs the molecule, the field is uniform over it and the perturbation is $\hat H'(t) = -\hat\mu_z\mathcal E_0\cos\omega t$. Write the state as $\Psi = c_\mathrm{i}(t)\psi_\mathrm{i}\mathrm{e}^{-\mathrm{i}E_\mathrm{i}t/\hbar} + c_\mathrm{f}(t)\psi_\mathrm{f}\mathrm{e}^{-\mathrm{i}E_\mathrm{f}t/\hbar}$ with $c_\mathrm{i}(0) = 1$. Substituting into the time-dependent Schrödinger equation and keeping first-order terms gives $\mathrm{i}\hbar\,\dot c_\mathrm{f} = \langle\mathrm f\vert\hat H'\vert\mathrm i\rangle\mathrm{e}^{\mathrm{i}\omega_\mathrm{fi}t}$. Writing the cosine as two exponentials and integrating,
$$
c_\mathrm{f}(t) = \frac{\mu_{z,\mathrm{fi}}\mathcal E_0}{2\hbar}\left[\frac{\mathrm{e}^{\mathrm{i}(\omega_\mathrm{fi} - \omega)t} - 1}{\omega_\mathrm{fi} - \omega} + \frac{\mathrm{e}^{\mathrm{i}(\omega_\mathrm{fi} + \omega)t} - 1}{\omega_\mathrm{fi} + \omega}\right].
$$
Near resonance the first term is enormous compared with the second, which we drop. With $\Delta = \omega_\mathrm{fi} - \omega$, $\lvert\mathrm{e}^{\mathrm{i}\Delta t} - 1\rvert^2 = 4\sin^2(\Delta t/2)$, so
$$
\lvert c_\mathrm{f}(t)\rvert^2 = \frac{\mu_{z,\mathrm{fi}}^2\mathcal E_0^2}{\hbar^2}\,\frac{\sin^2(\Delta t/2)}{\Delta^2} .
$$
For broadband light, each frequency interval $\mathrm{d}\nu$ contributes independently; the time-averaged energy density of a wave of amplitude $\mathcal E_0$ is $\tfrac12\varepsilon_0\mathcal E_0^2$, so we replace $\mathcal E_0^2$ by $2\rho(\nu)\,\mathrm{d}\nu/\varepsilon_0$ and integrate. With $\mathrm{d}\nu = \mathrm{d}\omega/2\pi$ and $\int_{-\infty}^{\infty}\sin^2(\Delta t/2)\,\Delta^{-2}\,\mathrm{d}\Delta = \pi t/2$, and $\rho$ taken outside the integral because it varies slowly,
$$
\lvert c_\mathrm{f}(t)\rvert^2 = \frac{\mu_{z,\mathrm{fi}}^2}{\hbar^2}\cdot\frac{2\rho(\nu_\mathrm{fi})}{\varepsilon_0}\cdot\frac{1}{2\pi}\cdot\frac{\pi t}{2} = \frac{\mu_{z,\mathrm{fi}}^2\,\rho(\nu_\mathrm{fi})}{2\varepsilon_0\hbar^2}\,t .
$$
The probability grows linearly in time, so the rate is constant. Finally, for randomly oriented molecules in isotropic light, $\mu_{z,\mathrm{fi}}^2$ averages to $\tfrac13\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$, which gives [[#eq-rate]]. Stimulated emission is the same calculation with $\mathrm i$ and $\mathrm f$ exchanged; $\lvert\mu_\mathrm{if}\rvert = \lvert\mu_\mathrm{fi}\rvert$ because $\hat\mu$ is Hermitian.
:::

The proof contains two lessons beyond the formula. First, the rate is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$: *intensity is the square of a matrix element*, and everything about how strong a line is begins there. Second, the factor $\sin^2(\Delta t/2)/\Delta^2$ is a peak of width about $2\pi/t$ in angular frequency: a molecule exposed to light for a time $t$ cannot tell apart frequencies closer than about $1/t$. That is the spectroscopic face of the time–energy Fourier relation of [[quantum-chemistry/quantum-foundations#prop-wavepacket]], and we return to it when we discuss line widths. The relation between $B$ and the coefficient of spontaneous emission $A$, which fixes how fast an excited state radiates, follows from equilibrium with black-body radiation and is derived in [[spectroscopy/electronic-spectroscopy#prop-einstein]].

### Selection rules from symmetry

Selection rules are statements that an integral vanishes, and integrals vanish for reasons of symmetry. The integrand of [[#eq-tdm]] is a product of three functions; the integral over all space of a function that changes sign under a symmetry operation of the molecule is zero. In the language of group theory ([[quantum-chemistry/molecular-symmetry]]):

- $\boldsymbol\mu_\mathrm{fi}$ can be non-zero only if the direct product $\Gamma_\mathrm{f}\times\Gamma_\mu\times\Gamma_\mathrm{i}$ contains the totally symmetric representation, where $\Gamma_\mu$ is the representation of $x$, $y$ or $z$. A $z$-polarised transition needs $\Gamma_\mathrm{f}\times\Gamma_\mathrm{i}$ to contain $\Gamma_z$, and so on.
- In a centrosymmetric system $\hat{\boldsymbol\mu}$ is odd under inversion, so only $g \leftrightarrow u$ transitions are allowed (the **Laporte rule**).
- $\hat{\boldsymbol\mu}$ does not act on spin, so the spin parts of the wavefunctions must be identical for a non-zero integral: $\Delta S = 0$.
- A photon carries one unit of angular momentum, so in absorption or emission of a single photon the total angular momentum of the molecule changes by at most one unit: $\Delta J = 0, \pm1$, with further restrictions from parity.

These rules hold in the electric-dipole approximation. Weaker mechanisms — magnetic-dipole and electric-quadrupole transitions, spin–orbit coupling that mixes singlets with triplets, vibrations that destroy a centre of symmetry — let "forbidden" transitions through with intensities typically $10^{-3}$ to $10^{-8}$ of allowed ones. Phosphorescence, the colours of most octahedral transition-metal complexes and the blue colour of water are all forbidden transitions made visible by such mechanisms.

::: example Selection rule for a particle in a box {#ex-pib}
An electron in a one-dimensional box of length $L$ has wavefunctions $\psi_n = \sqrt{2/L}\sin(n\pi x/L)$. (a) Show that the transition $n \to n'$ is allowed only if $n + n'$ is odd. (b) Calculate $\mu_{21}$, and use it to discuss the HOMO → LUMO transition of buta-1,3-diene modelled as four π electrons in a box of length $L = 560\ \mathrm{pm}$ (four C–C bond lengths of $140\ \mathrm{pm}$).
::: solution
(a) Measure $x$ from the centre of the box, $x = L/2 + s$. Under the reflection $s \to -s$, $\psi_n$ is even for odd $n$ and odd for even $n$, and the dipole operator $-es$ is odd. The integrand $\psi_{n'}(-es)\psi_n$ is therefore even — and the integral possibly non-zero — only if $\psi_n$ and $\psi_{n'}$ have opposite parity, i.e. $n + n'$ odd. (The constant $L/2$ part of $x$ contributes $-\tfrac{eL}{2}\langle n'\vert n\rangle = 0$ by orthogonality.) So $1\to2$ and $2\to3$ are allowed, $1 \to 3$ is forbidden.

(b) Evaluating the integral,
$$
\langle 2 \vert x\vert 1\rangle = \frac{2}{L}\int_0^L x\sin\frac{\pi x}{L}\sin\frac{2\pi x}{L}\,\mathrm{d}x = -\frac{16L}{9\pi^2} = -0.180\,L ,
$$
and similarly $\langle 3\vert x\vert 2\rangle = -0.195\,L$. For buta-1,3-diene the four π electrons fill $n = 1$ and $2$, so the lowest transition is $2 \to 3$ at $\Delta E = 5h^2/8m_\mathrm{e}L^2$, which for $L = 560\ \mathrm{pm}$ is $\tilde\nu = 4.84\times10^{4}\ \mathrm{cm^{-1}}$ ($\lambda = 207\ \mathrm{nm}$) — close to the observed band at $217\ \mathrm{nm}$. The one-electron transition moment is $e \times 0.195 \times 560\ \mathrm{pm} = 1.75\times10^{-29}\ \mathrm{C\,m} = 5.2\ \mathrm{D}$, a very large value, and the band is indeed one of the strongest in organic chemistry ($\varepsilon_\mathrm{max} \approx 2\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$). The parity rule is the one-dimensional version of the Laporte rule.
:::
:::

## Populations and the net absorption

A transition rate per molecule is only half of an intensity; the other half is how many molecules are in the lower state, and how many are in the upper state ready to be stimulated back down. In a sample at thermal equilibrium the answer is Boltzmann's.

::: definition Boltzmann populations {#def-boltzmann}
At thermal equilibrium at temperature $T$, the number of molecules $N_j$ in an energy level $j$ of energy $E_j$ and degeneracy $g_j$ is
$$
\frac{N_j}{N} = \frac{g_j\,\mathrm{e}^{-E_j/k_\mathrm{B}T}}{q}, \qquad q = \sum_j g_j\,\mathrm{e}^{-E_j/k_\mathrm{B}T},
$$ {#eq-boltzmann}
where $q$ is the partition function ([[statistical-thermodynamics/partition-function]]). The ratio of the populations of two levels is $N_\mathrm{u}/N_\mathrm{l} = (g_\mathrm{u}/g_\mathrm{l})\,\mathrm{e}^{-\Delta E/k_\mathrm{B}T}$; with wavenumbers, $\Delta E/k_\mathrm{B}T = 1.4388\,\tilde\nu/(T/\mathrm{K})$ with $\tilde\nu$ in $\mathrm{cm^{-1}}$.
:::

::: proposition Net absorption and the population difference {#prop-net}
In a sample at thermal equilibrium the net rate of absorption on a transition between a lower level $\mathrm l$ and an upper level $\mathrm u$ (absorption minus stimulated emission) is
$$
W_\mathrm{net} = B_\mathrm{ul}\,\rho\left(N_\mathrm{l} - \frac{g_\mathrm{l}}{g_\mathrm{u}}N_\mathrm{u}\right) = B_\mathrm{ul}\,\rho\,N_\mathrm{l}\left(1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}\right),
$$ {#eq-net}
so the intensity of an absorption line is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$, to the population of the lower level and to the factor $1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$. For $h\nu \gg k_\mathrm{B}T$ the factor is $1$; for $h\nu \ll k_\mathrm{B}T$ it is approximately $h\nu/k_\mathrm{B}T$, and absorption becomes very weak.
:::

::: proof
Stimulated emission is the time reverse of absorption; detailed balance with black-body radiation gives $g_\mathrm{l}B_\mathrm{ul} = g_\mathrm{u}B_\mathrm{lu}$ ([[spectroscopy/electronic-spectroscopy#prop-einstein]]), where $B_\mathrm{ul}$ is the coefficient for $\mathrm{u}\leftarrow\mathrm{l}$ and $B_\mathrm{lu}$ that for $\mathrm{l}\leftarrow\mathrm{u}$. The upward rate is $B_\mathrm{ul}\rho N_\mathrm{l}$ and the stimulated downward rate $B_\mathrm{lu}\rho N_\mathrm{u} = (g_\mathrm{l}/g_\mathrm{u})B_\mathrm{ul}\rho N_\mathrm{u}$. Their difference is the first form. The Boltzmann ratio $N_\mathrm{u}/N_\mathrm{l} = (g_\mathrm{u}/g_\mathrm{l})\mathrm{e}^{-h\nu/k_\mathrm{B}T}$ turns it into the second. For small $x = h\nu/k_\mathrm{B}T$, $1 - \mathrm{e}^{-x} = x - x^2/2 + \cdots$. Spontaneous emission is not stimulated by the probe beam and is emitted in all directions, so it does not enter the measured absorption.
:::

The factor $1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$ explains a great deal about which techniques are sensitive. Per molecule in a non-degenerate lower state, the fractional excess of absorbers over emitters at $298\ \mathrm{K}$ is:

| transition | $\tilde\nu$ / $\mathrm{cm^{-1}}$ | $h\nu/k_\mathrm{B}T$ | $1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T}$ |
|---|---|---|---|
| proton NMR at $600\ \mathrm{MHz}$ | $0.0200$ | $9.7\times10^{-5}$ | $9.7\times10^{-5}$ |
| rotation of HCl, $J = 1 \leftarrow 0$ | $20.9$ | $0.101$ | $0.096$ |
| vibration of HCl | $2886$ | $13.9$ | $1.000$ |
| electronic, $500\ \mathrm{nm}$ | $20\,000$ | $96.5$ | $1.000$ |

NMR, whose net absorption comes from one spin in about ten thousand, is intrinsically the least sensitive of the common spectroscopies, and that is why NMR magnets keep getting bigger ([[spectroscopy/nmr-principles]]). Rotational transitions have about a tenth of the ideal contrast; vibrational and electronic transitions at room temperature start almost entirely from the ground state.

::: widget plot
f: tanh(1.4388*10^x/(2*t))
x: -3, 5
y: 0, 1.05
sliders: t=298:4:1500:1
vlines: -1.699; 1.32; 3.46; 4.30
labels: (N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u})
caption: The fractional population difference of a non-degenerate two-level system, $(N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u}) = \tanh(hc\tilde\nu/2k_\mathrm{B}T)$, against $x = \log_{10}(\tilde\nu/\mathrm{cm^{-1}})$, with the temperature (in K) on the slider `t`. The vertical lines mark $0.02\ \mathrm{cm^{-1}}$ (proton NMR at $600\ \mathrm{MHz}$), $20.9\ \mathrm{cm^{-1}}$ (a rotational line of HCl), $2886\ \mathrm{cm^{-1}}$ (the HCl vibration) and $20\,000\ \mathrm{cm^{-1}}$ (visible light). Lower the temperature to $4\ \mathrm{K}$ and even the rotational transitions approach full contrast; raise it and the vibrational curve begins to slip below $1$ — the onset of hot bands.
:::

::: example How many molecules are in an excited level? {#ex-pop}
At $298\ \mathrm{K}$, find (a) the fraction of HCl molecules in $v = 1$ ($\tilde\nu = 2886\ \mathrm{cm^{-1}}$), (b) the ratio of molecules of $\mathrm{CO_2}$ with one quantum in the doubly degenerate bend ($667\ \mathrm{cm^{-1}}$) to those in the ground state, and (c) the fractional excess of protons in the lower spin state in a $600\ \mathrm{MHz}$ spectrometer.
::: solution
(a) Since $v = 2$ and higher are negligible, the fraction is essentially $\mathrm{e}^{-1.4388\times2886/298.15} = \mathrm{e}^{-13.93} = 8.9\times10^{-7}$. One molecule in a million is vibrationally excited, so infrared absorption starts from $v = 0$ and hot bands are invisible.

(b) The degeneracy of $v_2 = 1$ is $g = 2$, so $N_1/N_0 = 2\,\mathrm{e}^{-1.4388\times667/298.15} = 2 \times 0.0400 = 0.080$. About $7\,\%$ of all molecules (once the higher levels are included) carry one quantum of bend, and hot bands built on it are easily seen in the infrared spectrum of $\mathrm{CO_2}$ ([[spectroscopy/vibrational-spectroscopy]]).

(c) For two levels separated by $h\nu$, $(N_\mathrm{l} - N_\mathrm{u})/(N_\mathrm{l} + N_\mathrm{u}) = \tanh(h\nu/2k_\mathrm{B}T) \approx h\nu/2k_\mathrm{B}T = (6.626\times10^{-34})(6.00\times10^{8})/(2 \times 1.381\times10^{-23} \times 298.15) = 4.8\times10^{-5}$. Out of a million protons, only about 48 are "spare" absorbers. The signal is nevertheless measurable because a few milligrams of sample contain $10^{19}$ protons.
:::
:::

## Absorption intensity: the Beer–Lambert law

We now pass from one molecule to a sample. A collimated beam crosses a layer of absorbing solution; each thin slice removes a fixed fraction of the light that reaches it, so the intensity decays exponentially.

::: proposition The Beer–Lambert law {#prop-beer}
Monochromatic light of intensity $I_0$ crossing a path length $l$ of a solution containing an absorbing species at molar concentration $[\mathrm{J}]$ emerges with intensity $I$, where
$$
A \equiv \log_{10}\frac{I_0}{I} = \varepsilon\,[\mathrm{J}]\,l, \qquad T \equiv \frac{I}{I_0} = 10^{-\varepsilon[\mathrm{J}]l}.
$$ {#eq-beer}
$A$ is the **absorbance**, $T$ the **transmittance**, and $\varepsilon$ the **molar (decadic) absorption coefficient**, a property of the species and the wavelength, usually quoted in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. For several independent absorbers the absorbances add: $A = l\sum_\mathrm{J}\varepsilon_\mathrm{J}[\mathrm{J}]$. In terms of the **absorption cross-section** $\sigma$ per molecule, $\varepsilon = \sigma N_\mathrm{A}/(1000\ln 10)$ with $\sigma$ in $\mathrm{cm^2}$. The law assumes monochromatic, collimated light, absorbers that act independently (no association, no change of equilibrium with concentration), negligible scattering and fluorescence reaching the detector, and a weak beam that does not appreciably deplete the lower state.
:::

::: proof
Let the beam travel along $x$ and let the number density of absorbers be $\mathcal N = N_\mathrm{A}[\mathrm{J}]$. A slice of thickness $\mathrm{d}x$ and area $S$ contains $\mathcal N S\,\mathrm{d}x$ molecules, each of which blocks an effective area $\sigma$. The fraction of the beam removed is the fraction of the area blocked, $\sigma\mathcal N\,\mathrm{d}x$, provided the molecules do not shadow one another (dilute solution, thin slice). Hence $\mathrm{d}I = -\sigma\mathcal N I\,\mathrm{d}x$. Integrating from $I_0$ at $x = 0$ to $I$ at $x = l$,
$$
\ln\frac{I_0}{I} = \sigma\mathcal N l = \sigma N_\mathrm{A}[\mathrm{J}]\,l ,
$$
and converting to decadic logarithms, $\log_{10}(I_0/I) = (\sigma N_\mathrm{A}/\ln 10)[\mathrm{J}]l$. With $[\mathrm{J}]$ in $\mathrm{mol\,dm^{-3}} = 10^{-3}\ \mathrm{mol\,cm^{-3}}$ and $\sigma$ in $\mathrm{cm^2}$, $\varepsilon = \sigma N_\mathrm{A}/(1000\ln 10)$ in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. For several species $\mathrm{d}I = -\left(\sum\sigma_\mathrm{J}\mathcal N_\mathrm{J}\right)I\,\mathrm{d}x$, and the absorbances add. The cross-section is itself fixed by the microscopic rate of [[#eq-rate]], net of stimulated emission as in [[#eq-net]].
:::

An $\varepsilon$ of $10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, typical of a strong electronic band, corresponds to $\sigma = 3.8\times10^{-17}\ \mathrm{cm^2}$ — about a third of the geometrical cross-section of a small molecule. A fully allowed transition makes the molecule nearly opaque to light of the right colour.

::: example Concentration of NADH from its absorbance {#ex-nadh}
The reduced coenzyme NADH absorbs at $340\ \mathrm{nm}$ with $\varepsilon = 6.22\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$, whereas $\mathrm{NAD^+}$ does not absorb there. A reaction mixture in a $1.000\ \mathrm{cm}$ cuvette has $A_{340} = 0.415$ after subtraction of a blank. Find $[\mathrm{NADH}]$ and the percentage of light transmitted.
::: solution
From [[#eq-beer]],
$$
[\mathrm{NADH}] = \frac{A}{\varepsilon l} = \frac{0.415}{(6.22\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}})(1.000\ \mathrm{cm})} = 6.67\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 66.7\ \mu\mathrm{mol\,dm^{-3}} .
$$
The transmittance is $T = 10^{-0.415} = 0.385$, i.e. $38.5\,\%$. This measurement is the basis of the enormous family of enzyme assays that follow the appearance or disappearance of NADH at $340\ \mathrm{nm}$ ([[biochemistry/enzymes]]): because $\mathrm{NAD^+}$ is transparent there, the rate of change of absorbance is directly the rate of reaction.
:::
:::

### Integrated absorption and oscillator strength

The absorption coefficient varies across a band, and its peak value depends on how broad the band happens to be. The quantity that reflects the molecule alone is the area under the band, the **integrated absorption coefficient** $\mathcal A = \int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu$, and its dimensionless form, the oscillator strength.

::: definition Oscillator strength {#def-oscillator}
The **oscillator strength** of a transition is
$$
f = \frac{4\varepsilon_0 m_\mathrm{e}c^2\ln 10}{N_\mathrm{A}e^2}\int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu = 4.319\times10^{-9}\int\varepsilon(\tilde\nu)\,\mathrm{d}\tilde\nu ,
$$ {#eq-osc}
with $\varepsilon$ in $\mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and $\tilde\nu$ in $\mathrm{cm^{-1}}$ in the numerical form. It is related to the transition dipole moment by
$$
f = \frac{8\pi^2 m_\mathrm{e}c\,\tilde\nu_\mathrm{fi}}{3he^2}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2 = 4.702\times10^{-7}\,\left(\frac{\tilde\nu_\mathrm{fi}}{\mathrm{cm^{-1}}}\right)\left(\frac{\lvert\boldsymbol\mu_\mathrm{fi}\rvert}{\mathrm{D}}\right)^2 .
$$ {#eq-osc-mu}
An electron bound by a harmonic force, the classical model of an absorber, has $f = 1$; fully allowed electronic transitions have $f$ of order $0.1$–$1$, spin-forbidden ones $10^{-5}$ or less. For a Gaussian band of peak height $\varepsilon_\mathrm{max}$ and full width at half maximum $\Delta\tilde\nu_{1/2}$, $\int\varepsilon\,\mathrm{d}\tilde\nu = 1.0645\,\varepsilon_\mathrm{max}\Delta\tilde\nu_{1/2}$.
:::

The Thomas–Reiche–Kuhn sum rule states that the oscillator strengths of all transitions from a given state add up to the number of electrons, which is why $f$ can be thought of as "the number of electrons taking part" in a transition, and why no single transition of a one-electron system can exceed $f = 1$.

::: example Transition moment from a measured band {#ex-osc}
An aromatic compound has a near-Gaussian absorption band centred at $250\ \mathrm{nm}$ with $\varepsilon_\mathrm{max} = 2.0\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ and a full width at half maximum of $4000\ \mathrm{cm^{-1}}$. Find the oscillator strength and the magnitude of the transition dipole moment.
::: solution
Integrated absorption: $\int\varepsilon\,\mathrm{d}\tilde\nu = 1.0645 \times (2.0\times10^4)(4000) = 8.5\times10^{7}\ \mathrm{dm^3\,mol^{-1}\,cm^{-2}}$. By [[#eq-osc]], $f = 4.319\times10^{-9} \times 8.52\times10^{7} = 0.37$. The band centre is at $\tilde\nu = 1/(250\times10^{-7}\ \mathrm{cm}) = 4.00\times10^4\ \mathrm{cm^{-1}}$, so [[#eq-osc-mu]] gives
$$
\lvert\boldsymbol\mu_\mathrm{fi}\rvert = \sqrt{\frac{0.37}{4.702\times10^{-7}\times4.00\times10^4}}\ \mathrm{D} = 4.4\ \mathrm{D} ,
$$
equivalent to an electron displaced by $92\ \mathrm{pm}$ — a substantial fraction of a bond length, as expected for a strongly allowed $\pi\to\pi^*$ transition. Two significant figures are appropriate, since the Gaussian shape is an approximation.
:::
:::

::: warning Absorbance, transmittance and "forbidden"
Three habits cause most errors in quantitative absorption work. First, absorbance is logarithmic: $A = 1$ means $10\,\%$ transmitted and $A = 2$ means $1\,\%$, so a reading of $A = 3$ rests on one part in a thousand of the light, and a little stray light — light of other wavelengths reaching the detector — makes the measured absorbance fall below the Beer–Lambert value (see the figure below). Keep readings roughly between $0.1$ and $1.5$. Second, $\varepsilon$ is not a universal constant of a compound: it depends on wavelength, solvent, pH and temperature, and a "deviation from Beer's law" usually signals a chemical change — dimerisation of a dye, a shift in an acid–base equilibrium — rather than a failure of the law. Third, "forbidden" means *forbidden in the electric-dipole approximation*, not *absent*: forbidden bands are weak, not invisible, and the selection rules tell you which bands should be weak, not which ones cannot be seen.
:::

::: widget plot
f: -log10((10^(-x) + s)/(1 + s)); x
x: 0, 3.5
y: 0, 3.5
sliders: s=0.005:0:0.05:0.001
labels: A_\mathrm{measured}; A_\mathrm{true}
caption: The effect of stray light on a measured absorbance. If a fraction $s$ of the light reaching the detector (relative to $I_0$) is stray light that the sample does not absorb, the instrument reports $A_\mathrm{meas} = -\log_{10}[(10^{-A} + s)/(1 + s)]$ instead of the true $A$ (horizontal axis). With $s = 0.005$ ($0.5\,\%$) the error is negligible below $A = 1$ but the measured curve saturates near $A = -\log_{10}(s) \approx 2.3$. Slide `s` to zero to recover the straight Beer–Lambert line.
:::

::: quiz Which factors set the intensity?
For a fixed sample and path length, which of the following increase the integrated intensity of an absorption line? (Select all that apply.)
- [x] A larger magnitude of the transition dipole moment.
- [x] A larger population of the lower level.
- [ ] A shorter lifetime of the upper state.
- [ ] A higher temperature, for a line with $h\nu \gg k_\mathrm{B}T$ starting from the ground state.
::: solution
Integrated intensity is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$ and to the population difference ([[#prop-net]]). A shorter lifetime broadens the line ([[#prop-lifetime]] below) but does not change its area: the same absorption is spread over more frequencies. Raising the temperature for a line from the ground state with $h\nu \gg k_\mathrm{B}T$ changes nothing or *lowers* the intensity slightly, because some molecules leave the ground level for excited levels. (For rotational lines, where several levels are populated, temperature redistributes intensity among the lines.)
:::
:::

## Line widths and line shapes

Spectral lines are never infinitely sharp. Their width carries information — about lifetimes, temperatures and pressures — and it limits how close two lines can be and still be told apart. Three mechanisms dominate: the finite lifetime of the states, the thermal motion of the molecules, and collisions.

### Lifetime broadening

::: proposition Lifetime broadening and the Lorentzian line {#prop-lifetime}
If the upper state of a transition decays (by any process) with first-order lifetime $\tau$, so that its population falls as $\mathrm{e}^{-t/\tau}$, the line has a **Lorentzian** shape
$$
g_\mathrm{L}(\nu) = \frac{1}{\pi}\,\frac{\gamma}{(\nu - \nu_0)^2 + \gamma^2}, \qquad \gamma = \frac{1}{4\pi\tau},
$$ {#eq-lorentz}
with full width at half maximum
$$
\Delta\nu_{1/2} = \frac{1}{2\pi\tau}, \qquad \Delta\tilde\nu_{1/2} = \frac{1}{2\pi c\tau} = \frac{5.31\ \mathrm{cm^{-1}}}{\tau/\mathrm{ps}} .
$$ {#eq-lifetime}
If both states decay, their rates add: $\Delta\nu_{1/2} = (1/2\pi)(1/\tau_\mathrm{u} + 1/\tau_\mathrm{l})$. When the radiative decay alone limits the lifetime, the width is the **natural line width**. More generally, any process that destroys the phase coherence of the oscillating dipole in a time $T_2$ gives $\Delta\nu_{1/2} = 1/\pi T_2$; for decay by population loss alone $T_2 = 2\tau$.
:::

::: proof Fourier transform of a decaying oscillation
A state whose population decays as $\mathrm{e}^{-t/\tau}$ has an amplitude decaying as $\mathrm{e}^{-t/2\tau}$, so the oscillating dipole of the superposition (and the radiated field) behaves for $t \ge 0$ as $\mathrm{e}^{-t/2\tau}\mathrm{e}^{-2\pi\mathrm{i}\nu_0 t}$. Its frequency content is the Fourier transform
$$
\int_0^\infty \mathrm{e}^{-t/2\tau}\,\mathrm{e}^{2\pi\mathrm{i}(\nu - \nu_0)t}\,\mathrm{d}t = \frac{1}{1/2\tau - 2\pi\mathrm{i}(\nu - \nu_0)} ,
$$
and the power spectrum is its squared modulus, $\left[(1/2\tau)^2 + 4\pi^2(\nu - \nu_0)^2\right]^{-1} = (4\pi^2)^{-1}\left[(\nu - \nu_0)^2 + \gamma^2\right]^{-1}$ with $\gamma = 1/4\pi\tau$. Normalising to unit area gives [[#eq-lorentz]]. The function falls to half its peak at $\nu - \nu_0 = \pm\gamma$, so the full width is $2\gamma = 1/2\pi\tau$. Dividing by $c$ converts to wavenumbers, and $1/(2\pi \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 10^{-12}\ \mathrm{s}) = 5.31\ \mathrm{cm^{-1}}$. If both levels decay, the coherence between them decays at the sum of the two amplitude decay rates, and the widths add. Replacing the amplitude decay rate $1/2\tau$ by a general dephasing rate $1/T_2$ gives $\Delta\nu_{1/2} = 1/\pi T_2$.
:::

The result is often written loosely as $\Delta E\,\tau \approx \hbar$, an "energy–time uncertainty relation"; the precise content is the Fourier relation above. It has a practical twin that the mass-spectrometry and NMR chapters both use: a signal that is recorded for a total time $T$ cannot resolve frequencies closer than about $1/T$, so long acquisition times give narrow lines ([[spectroscopy/nmr-principles]], [[spectroscopy/mass-spectrometry]]). Natural widths are tiny for rotational and vibrational transitions — spontaneous emission scales as $\nu^3$, so excited rotational levels live for years — but they matter for electronic transitions, where lifetimes are nanoseconds, and they dominate when an excited state falls apart quickly: a molecule that predissociates in $1\ \mathrm{ps}$ has lines $5\ \mathrm{cm^{-1}}$ wide, and the rotational structure of its electronic band is washed out ([[spectroscopy/electronic-spectroscopy]]).

### Doppler broadening

In a gas, a molecule moving towards the source with velocity component $v_x$ sees the radiation blue-shifted and absorbs at a laboratory frequency $\nu = \nu_0(1 - v_x/c)$; one moving away absorbs at a higher laboratory frequency. Since $v_x$ is distributed according to the Maxwell–Boltzmann law, so are the absorption frequencies.

::: proposition Doppler broadening and the Gaussian line {#prop-doppler}
For molecules of mass $m$ in a gas at temperature $T$ (and $v_x \ll c$), Doppler broadening gives a **Gaussian** line shape
$$
g_\mathrm{G}(\nu) = \frac{c}{\nu_0}\sqrt{\frac{m}{2\pi k_\mathrm{B}T}}\exp\!\left[-\frac{mc^2(\nu - \nu_0)^2}{2k_\mathrm{B}T\,\nu_0^2}\right]
$$ {#eq-gauss}
with full width at half maximum
$$
\Delta\nu_{1/2} = \frac{2\nu_0}{c}\sqrt{\frac{2k_\mathrm{B}T\ln 2}{m}} .
$$ {#eq-doppler}
The fractional width $\Delta\nu_{1/2}/\nu_0$ is independent of the transition: it depends only on $T/m$, and equals $7.16\times10^{-7}\sqrt{(T/\mathrm{K})/(M/\mathrm{g\,mol^{-1}})}$.
:::

::: proof
In one dimension the Maxwell–Boltzmann distribution of the velocity component along the beam is $p(v_x) = \sqrt{m/2\pi k_\mathrm{B}T}\,\exp(-mv_x^2/2k_\mathrm{B}T)$. A molecule with velocity component $v_x$ absorbs at $\nu - \nu_0 = \pm\nu_0 v_x/c$ (the sign depends on the direction of the beam and does not matter, since $p$ is even), so $v_x = c(\nu - \nu_0)/\nu_0$ and $\mathrm{d}v_x = (c/\nu_0)\,\mathrm{d}\nu$. Changing variables, $g_\mathrm{G}(\nu) = p(v_x)\,\mathrm{d}v_x/\mathrm{d}\nu$, which is [[#eq-gauss]]. The Gaussian falls to half its peak when the exponent equals $\ln 2$: $(\nu - \nu_0)^2 = 2k_\mathrm{B}T\nu_0^2\ln 2/mc^2$, so the half width is $(\nu_0/c)\sqrt{2k_\mathrm{B}T\ln2/m}$ and the full width twice this. Inserting $m = M/N_\mathrm{A}$ gives $\Delta\nu_{1/2}/\nu_0 = (2/c)\sqrt{2RT\ln 2/M}$, and with $M$ in $\mathrm{kg\,mol^{-1}}$ the numerical factor is $(2/c)\sqrt{2 \times 8.314 \times \ln 2 \times 10^{3}} = 7.16\times10^{-7}$ per $\sqrt{\mathrm{K\,mol\,g^{-1}}}$.
:::

::: example Doppler and natural widths of the sodium D line {#ex-doppler}
The sodium D₂ line is at $589.0\ \mathrm{nm}$, and the upper $3\mathrm{p}$ state has a radiative lifetime of $16.2\ \mathrm{ns}$. For sodium vapour at $500\ \mathrm{K}$, calculate the Doppler width and the natural width, and say which determines the observed line shape.
::: solution
$\nu_0 = c/\lambda = 5.090\times10^{14}\ \mathrm{Hz}$ and $m = 22.990\ \mathrm{u} = 3.818\times10^{-26}\ \mathrm{kg}$. By [[#eq-doppler]],
$$
\Delta\nu_\mathrm{D} = \frac{2 \times 5.090\times10^{14}}{2.998\times10^{8}}\sqrt{\frac{2(1.381\times10^{-23})(500)\ln 2}{3.818\times10^{-26}}}\ \mathrm{Hz} = 1.70\times10^{9}\ \mathrm{Hz},
$$
i.e. $1.70\ \mathrm{GHz}$, $0.057\ \mathrm{cm^{-1}}$ or $0.0020\ \mathrm{nm}$. The natural width is $\Delta\nu_\mathrm{N} = 1/(2\pi\times16.2\times10^{-9}\ \mathrm{s}) = 9.8\ \mathrm{MHz}$, about 170 times smaller. The observed line is therefore essentially Gaussian, with weak Lorentzian wings far from the centre, where the Gaussian has died away. Doppler-free techniques (saturation spectroscopy, cold atomic and molecular beams) exist precisely to remove the dominant Gaussian width and expose the natural one.
:::
:::

Because the Doppler width scales with $\nu_0$, it is $0.06\ \mathrm{cm^{-1}}$ for a visible atomic line but only $6\times10^{-3}\ \mathrm{cm^{-1}}$ for an infrared line of HCl at $300\ \mathrm{K}$, and a few hundred kilohertz for a microwave rotational line. Microwave spectroscopy is therefore the most precise of the molecular spectroscopies, routinely measuring line positions to one part in $10^7$ or better, which is what makes the bond lengths of [[spectroscopy/rotational-spectroscopy]] so accurate.

### Pressure broadening and the Voigt profile

Collisions interrupt the phase of the oscillating dipole. If the mean time between collisions is $\tau_\mathrm{col}$, the coherence lasts about that long and the line acquires a Lorentzian width $\Delta\nu_{1/2} \approx 1/\pi\tau_\mathrm{col}$ ([[#prop-lifetime]] with $T_2 = \tau_\mathrm{col}$). Since $\tau_\mathrm{col} = 1/z$ and the collision frequency $z$ is proportional to pressure ([[kinetics/collision-theory]]), the width grows linearly with pressure. For nitrogen at $1\ \mathrm{bar}$ and $298\ \mathrm{K}$, kinetic theory with $\sigma = 0.43\ \mathrm{nm^2}$ gives $z \approx 7\times10^{9}\ \mathrm{s^{-1}}$ and a width of order $2\ \mathrm{GHz}$, or $0.07\ \mathrm{cm^{-1}}$ — larger than the Doppler width of an infrared line. Gas-phase spectra are therefore recorded at low pressure when the finest detail is wanted; in liquids, where molecules collide every picosecond or so, rotational structure disappears altogether.

When Doppler and pressure broadening are comparable the observed profile is their convolution, the **Voigt profile**, Gaussian near the centre and Lorentzian in the wings. The difference matters: a Lorentzian has far wider wings than a Gaussian of the same width, so overlapping Lorentzian lines contaminate one another more, and baselines are harder to define.

::: widget plot
f: exp(-4*ln(2)*x^2/w^2); 1/(1 + 4*x^2/w^2)
x: -5, 5
y: 0, 1.05
sliders: w=1:0.2:4:0.05
hlines: 0.5
labels: \text{Gaussian (Doppler)}; \text{Lorentzian (lifetime, collisions)}
caption: Gaussian and Lorentzian line shapes with the same full width at half maximum $w$ (slider), both scaled to unit height, against the distance $x$ from the line centre (same units as $w$). The horizontal line at $0.5$ shows that both have the same width there; but at $x = 2w$ the Gaussian has fallen to $10^{-7}$ of its peak while the Lorentzian is still at $6\,\%$. The long Lorentzian wings are why collision-broadened lines overlap so badly at high pressure.
:::

### Resolution

Finally, the instrument has a width of its own. A grating spectrometer cannot separate lines closer than its **resolving power** $\nu/\Delta\nu$ allows, and a Fourier-transform instrument that records an interferogram up to a maximum optical path difference $\delta_\mathrm{max}$ resolves about $\Delta\tilde\nu \approx 1/\delta_\mathrm{max}$: $2\ \mathrm{cm^{-1}}$ for a $0.5\ \mathrm{cm}$ scan, $0.002\ \mathrm{cm^{-1}}$ for a research instrument with a $5\ \mathrm{m}$ scan. This is the same Fourier relation once more, with path difference in place of time, and it is developed in [[spectroscopy/vibrational-spectroscopy]]. The observed width of a line is never smaller than the largest of the instrumental, Doppler, collisional and natural widths.

## Emission, scattering and the general picture

Absorption is not the only way to measure a spectrum. In **emission** spectroscopy molecules are excited — thermally, by an electric discharge or by a laser — and the light they give out is dispersed; its intensity is proportional to the population of the *upper* level and to the Einstein $A$ coefficient, which scales as $\nu^3\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$. Emission is very sensitive because the background is dark: fluorescence detection can see single molecules, whereas absorption must measure a small decrease in a bright beam. In **scattering** spectroscopy the incident photon is not absorbed; a small fraction of it is re-emitted with a frequency shifted by a molecular energy gap. Rayleigh scattering is unshifted, Raman scattering is shifted, and its selection rules depend on the polarisability rather than the dipole moment ([[spectroscopy/vibrational-spectroscopy#def-raman]]). And **magnetic resonance** uses magnetic-dipole transitions between spin states split by an applied field, with a transition moment that involves the magnetic moment instead of the electric dipole.

In every case the analysis has the same three parts set out in this chapter: the energy levels give the positions; the transition moment, the populations and the amount of sample give the intensities; and lifetimes, motion, collisions and the instrument give the widths.

## Where this leads

Each later chapter of the course specialises this machinery. [[spectroscopy/rotational-spectroscopy]] applies the transition moment to a rotating permanent dipole, obtains $\Delta J = \pm1$ and uses the Boltzmann factor of [[#def-boltzmann]] with its $(2J+1)$ degeneracies to explain the intensity pattern of a microwave spectrum. [[spectroscopy/vibrational-spectroscopy]] expands the dipole moment in the normal coordinates and replaces it with the polarisability for Raman spectra. [[spectroscopy/electronic-spectroscopy]] factorises the transition moment into an electronic part and a vibrational overlap (the Franck–Condon factor), and turns the Einstein coefficients into fluorescence lifetimes and lasers. [[spectroscopy/nmr-principles]] and [[spectroscopy/epr]] treat a two-level spin system whose tiny population difference, from [[#prop-net]], dominates the experimental design. The Beer–Lambert law is the basis of quantitative analysis in [[analytical-chemistry]], and the statistics of calibration lines built on it are treated there.

::: history
The exponential attenuation of light was described long before anyone knew what absorbed it. Pierre Bouguer showed in his *Essai d'optique sur la gradation de la lumière* (1729) that successive equal layers of a medium remove equal fractions of light, and Johann Heinrich Lambert gave the law its mathematical form in *Photometria* (1760). August Beer extended it in 1852 to solutions, showing that the absorption depends on the product of concentration and path length — which is why the combined law carries both names. Christian Doppler proposed in 1842 that the observed frequency of a wave depends on the relative motion of source and observer, the origin of the Gaussian line shape of gases. The quantum theory of line intensities began with Albert Einstein's 1917 paper "Zur Quantentheorie der Strahlung", which introduced the coefficients of absorption, stimulated and spontaneous emission and deduced their relations from Planck's law; Paul Dirac's 1927 quantum theory of the emission and absorption of radiation then derived the transition rates from first principles, in the form we used in [[#prop-rate]]. Enrico Fermi later popularised the general formula for transition rates as "Golden Rule No. 2" in his lecture notes on nuclear physics, and the name "Fermi's golden rule" stuck.
:::

::: summary
- Spectroscopic transitions satisfy $\Delta E = h\nu = hc\tilde\nu$; $1\ \mathrm{cm^{-1}} \equiv 11.96\ \mathrm{J\,mol^{-1}} \equiv 29.98\ \mathrm{GHz} \equiv 1.439\ \mathrm{K}$, and $k_\mathrm{B}T/hc = 207\ \mathrm{cm^{-1}}$ at $298\ \mathrm{K}$.
- The rate of an electric-dipole transition is proportional to $\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$, the square of the transition dipole moment $\langle\mathrm f\vert\hat{\boldsymbol\mu}\vert\mathrm i\rangle$; $B = \lvert\boldsymbol\mu_\mathrm{fi}\rvert^2/6\varepsilon_0\hbar^2$.
- Selection rules are symmetry statements that $\boldsymbol\mu_\mathrm{fi} = 0$: direct products must contain $\Gamma_{x,y,z}$, $g \leftrightarrow u$ in centrosymmetric systems, $\Delta S = 0$; "forbidden" transitions are weak, not absent.
- Net absorption is proportional to the population difference, $N_\mathrm{l}(1 - \mathrm{e}^{-h\nu/k_\mathrm{B}T})$ — nearly complete for vibrational and electronic transitions, about $10^{-1}$ for rotation and $10^{-4}$ for NMR.
- The Beer–Lambert law $A = \varepsilon[\mathrm J]l$ follows from each slice absorbing a fixed fraction; absorbances of independent species add, and deviations usually signal chemistry or stray light.
- The oscillator strength $f = 4.32\times10^{-9}\int\varepsilon\,\mathrm{d}\tilde\nu$ measures the band area and gives $\lvert\boldsymbol\mu_\mathrm{fi}\rvert$; allowed electronic bands have $f \approx 0.1$–$1$.
- Lifetime and collisions give Lorentzian lines, $\Delta\tilde\nu_{1/2} = 1/2\pi c\tau$ ($5.3\ \mathrm{cm^{-1}}$ for $1\ \mathrm{ps}$); thermal motion gives Gaussian Doppler lines with $\Delta\nu_{1/2}/\nu_0 = 7.16\times10^{-7}\sqrt{T/M}$.
:::

## Exercises

::: exercise Energy of an infrared photon {level=1 check="29.9"}
An infrared band lies at a wavelength of $4.00\ \mu\mathrm{m}$. Find its wavenumber and the energy of one mole of photons of this wavelength. (Enter the energy in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\tilde\nu = 1/\lambda = 1/(4.00\times10^{-4}\ \mathrm{cm}) = 2500\ \mathrm{cm^{-1}}$. Then $E_\mathrm{m} = N_\mathrm{A}hc\tilde\nu = 2500 \times 11.9627\ \mathrm{J\,mol^{-1}} = 2.99\times10^{4}\ \mathrm{J\,mol^{-1}} = 29.9\ \mathrm{kJ\,mol^{-1}}$ — about $12$ times $RT$ at room temperature, so the excited vibrational level is almost empty.
:::
:::

::: exercise Concentration of a dye {level=1 check="51.2"}
A dye has $\varepsilon = 1.25\times10^4\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ at its absorption maximum. A solution in a $1.00\ \mathrm{cm}$ cell has absorbance $0.640$ there. Find the concentration and the percentage transmittance. (Enter the concentration in $\mu\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: solution
$[\mathrm{dye}] = A/\varepsilon l = 0.640/(1.25\times10^4 \times 1.00) = 5.12\times10^{-5}\ \mathrm{mol\,dm^{-3}} = 51.2\ \mu\mathrm{mol\,dm^{-3}}$. The transmittance is $10^{-0.640} = 0.229$, i.e. $22.9\,\%$.
:::
:::

::: exercise Populations of two rotational levels {level=1 check="2.95"}
Carbon monoxide has a rotational constant $\tilde B = 1.9225\ \mathrm{cm^{-1}}$; its levels have energies $hc\tilde BJ(J+1)$ and degeneracies $2J + 1$. Calculate $N_{J=1}/N_{J=0}$ at $300\ \mathrm{K}$. (Enter the ratio to three significant figures.)
::: solution
The gap is $2\tilde B = 3.845\ \mathrm{cm^{-1}}$ and the degeneracy ratio is $3/1$, so $N_1/N_0 = 3\,\mathrm{e}^{-1.4388\times3.845/300} = 3 \times 0.9817 = 2.95$. The upper level is *more* populated than the lower one because of its degeneracy, yet the $J = 1 \leftarrow 0$ line still absorbs: per state, the lower level is the more populated, and [[#prop-net]] counts populations per state.
:::
:::

::: exercise Doppler width of a microwave line {level=2 check="270"}
Calculate the Doppler full width at half maximum of the $J = 1 \leftarrow 0$ line of $^{12}\mathrm{C}^{16}\mathrm{O}$ at $115.271\ \mathrm{GHz}$ at $300\ \mathrm{K}$ ($m = 27.995\ \mathrm{u}$). (Enter the width in kHz to three significant figures.)
::: solution
By [[#eq-doppler]], $\Delta\nu_{1/2} = (2\nu_0/c)\sqrt{2k_\mathrm{B}T\ln 2/m}$. Here $\sqrt{2(1.3806\times10^{-23})(300)(0.6931)/(27.995 \times 1.6605\times10^{-27})} = 351.6\ \mathrm{m\,s^{-1}}$, and $\Delta\nu_{1/2} = 2(1.15271\times10^{11})(351.6)/(2.9979\times10^{8}) = 2.70\times10^{5}\ \mathrm{Hz} = 270\ \mathrm{kHz}$. Equivalently, the fractional width is $7.16\times10^{-7}\sqrt{300/28.0} = 2.34\times10^{-6}$. A line $270\ \mathrm{kHz}$ wide can have its centre located to a few kHz, a precision of $10^{-8}$.
:::
:::

::: exercise Lifetime from a line width {level=2 check="53.1"}
A vibronic line in the spectrum of a predissociating molecule has a Lorentzian full width of $0.10\ \mathrm{cm^{-1}}$ after the Doppler contribution has been removed. Assuming the ground state is long-lived, estimate the lifetime of the upper state. (Enter the lifetime in ps to three significant figures.)
::: solution
From [[#eq-lifetime]], $\tau = 1/(2\pi c\Delta\tilde\nu_{1/2}) = 1/(2\pi \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 0.10\ \mathrm{cm^{-1}}) = 5.31\times10^{-11}\ \mathrm{s} = 53.1\ \mathrm{ps}$. (The width has two significant figures, so the lifetime is really $53\ \mathrm{ps}$.) The molecule survives only a few rotational periods before it falls apart; measuring line widths of individual rotational lines is one of the main ways of finding predissociation rates.
:::
:::

::: exercise Transition moment from an oscillator strength {level=2 check="2.66"}
An electronic transition at $30\,000\ \mathrm{cm^{-1}}$ has oscillator strength $f = 0.10$. Find the magnitude of its transition dipole moment, and estimate $\varepsilon_\mathrm{max}$ if the band is Gaussian with a width of $3000\ \mathrm{cm^{-1}}$. (Enter $\lvert\boldsymbol\mu_\mathrm{fi}\rvert$ in debye to three significant figures.)
::: solution
From [[#eq-osc-mu]], $\lvert\boldsymbol\mu_\mathrm{fi}\rvert = \sqrt{0.10/(4.702\times10^{-7}\times3.00\times10^{4})}\ \mathrm{D} = \sqrt{7.09}\ \mathrm{D} = 2.66\ \mathrm{D}$. The integrated absorption is $f/4.319\times10^{-9} = 2.32\times10^{7}$, so $\varepsilon_\mathrm{max} = 2.32\times10^{7}/(1.0645\times3000) = 7.3\times10^{3}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$.
:::
:::

::: exercise The Doppler formula from scratch {level=3 check="6.01"}
(a) Starting from the one-dimensional Maxwell–Boltzmann distribution of velocities, derive the Doppler line shape and its full width at half maximum. (b) Show that the fractional width is $7.16\times10^{-7}\sqrt{T/M}$ with $T$ in K and $M$ in $\mathrm{g\,mol^{-1}}$. (c) Calculate the Doppler width of the R(0) line of $\mathrm{H^{35}Cl}$ at $2906.24\ \mathrm{cm^{-1}}$ at $300\ \mathrm{K}$ ($M = 35.977\ \mathrm{g\,mol^{-1}}$). (Enter the width in units of $10^{-3}\ \mathrm{cm^{-1}}$ to three significant figures.)
::: hint
Change variables from $v_x$ to $\nu$ using $\nu - \nu_0 = \nu_0v_x/c$, and find where the exponent equals $\ln 2$.
:::
::: solution
(a) and (b) are the proof of [[#prop-doppler]]: $p(v_x) \propto \exp(-mv_x^2/2k_\mathrm{B}T)$ with $v_x = c(\nu - \nu_0)/\nu_0$ gives a Gaussian in $\nu$; it falls to half height at $\lvert\nu - \nu_0\rvert = (\nu_0/c)\sqrt{2k_\mathrm{B}T\ln2/m}$, so $\Delta\nu_{1/2}/\nu_0 = (2/c)\sqrt{2RT\ln 2/M}$. With $M$ in $\mathrm{kg\,mol^{-1}}$ written as $10^{-3}M'$ ($M'$ in $\mathrm{g\,mol^{-1}}$), $(2/2.9979\times10^{8})\sqrt{2 \times 8.3145 \times 0.69315 \times 10^{3}} = 7.16\times10^{-7}$, times $\sqrt{T/M'}$.

(c) $\Delta\tilde\nu_{1/2} = 2906.24 \times 7.16\times10^{-7}\sqrt{300/35.977} = 2906.24 \times 2.068\times10^{-6} = 6.01\times10^{-3}\ \mathrm{cm^{-1}}$. A routine Fourier-transform infrared spectrometer with $0.5$–$2\ \mathrm{cm^{-1}}$ resolution is far from seeing this width; the lines it records have the instrument's line shape.
:::
:::

::: exercise Two absorbers at two wavelengths {level=3 check="47.1"}
A solution contains two non-interacting species X and Y. In a $1.00\ \mathrm{cm}$ cell: at $\lambda_1$, $\varepsilon_\mathrm{X} = 1.20\times10^4$ and $\varepsilon_\mathrm{Y} = 2.0\times10^3$; at $\lambda_2$, $\varepsilon_\mathrm{X} = 3.0\times10^3$ and $\varepsilon_\mathrm{Y} = 9.0\times10^3\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$. The measured absorbances are $A_1 = 0.660$ and $A_2 = 0.570$. Find both concentrations. (Enter $[\mathrm{X}]$ in $\mu\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: hint
Absorbances add ([[#prop-beer]]): write one linear equation per wavelength and solve the pair.
:::
::: solution
The equations are $1.20\times10^4[\mathrm X] + 2.0\times10^3[\mathrm Y] = 0.660$ and $3.0\times10^3[\mathrm X] + 9.0\times10^3[\mathrm Y] = 0.570$. The determinant is $(1.20\times10^4)(9.0\times10^3) - (2.0\times10^3)(3.0\times10^3) = 1.02\times10^8$. By Cramer's rule,
$$
[\mathrm X] = \frac{0.660 \times 9.0\times10^3 - 2.0\times10^3\times0.570}{1.02\times10^8} = 4.71\times10^{-5}, \qquad
[\mathrm Y] = \frac{1.20\times10^4\times0.570 - 3.0\times10^3\times0.660}{1.02\times10^8} = 4.76\times10^{-5}\ \mathrm{mol\,dm^{-3}} ,
$$
i.e. $47.1$ and $47.6\ \mu\mathrm{mol\,dm^{-3}}$. The method works best when the two wavelengths are chosen where the species differ most; if the rows of the $\varepsilon$ matrix are nearly proportional, the determinant is small and errors in $A$ are amplified. Multi-wavelength least-squares fitting is the general form of the same idea ([[analytical-chemistry]]).
:::
:::

::: exercise Stray light {level=3 check="1.83"}
A spectrophotometer has stray light equal to $0.50\,\%$ of $I_0$, reaching the detector unabsorbed. (a) Show that the measured absorbance is $A_\mathrm{meas} = -\log_{10}[(10^{-A} + s)/(1 + s)]$, where $A$ is the true absorbance and $s = 0.0050$. (b) Calculate $A_\mathrm{meas}$ for a sample of true absorbance $2.00$, and the percentage error in a concentration derived from it. (Enter $A_\mathrm{meas}$ to three significant figures.)
::: solution
(a) With the sample in place the detector receives $I_0 10^{-A} + sI_0$; with the blank it receives $I_0 + sI_0$. The instrument reports $\log_{10}$ of the ratio of blank to sample signals, $\log_{10}[(1 + s)/(10^{-A} + s)]$, which is the expression given.

(b) $A_\mathrm{meas} = -\log_{10}[(0.0100 + 0.0050)/1.0050] = -\log_{10}(0.014925) = 1.826$, so $1.83$. A concentration computed from it is low by $(2.00 - 1.826)/2.00 = 8.7\,\%$. At a true absorbance of $1.00$ the same stray light gives $0.981$, an error of only $1.9\,\%$ — the reason for diluting samples into the range $A < 1.5$.
:::
:::
