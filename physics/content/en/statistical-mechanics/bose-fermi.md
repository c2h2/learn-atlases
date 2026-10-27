The two distributions of [[statistical-mechanics/quantum-statistics]] differ by a sign. This chapter is about what that sign does when it matters, which is when the occupation numbers are not small. Four systems carry the argument. Photons in a hot cavity are bosons whose number is not conserved; counting them gives Planck's radiation law, and from it the Stefan–Boltzmann constant in terms of $h$, $c$ and $k_B$. The vibrations of a crystal are bosons of the same kind, and the Debye model explains why every solid's heat capacity falls like $T^3$ at low temperature. Electrons in a metal are fermions at a density so high that they fill orbitals up to several electronvolts even at absolute zero; the same physics, at a million times the density, holds up white dwarf stars. Finally, a gas of atoms that are bosons, cooled far enough, puts a macroscopic fraction of itself into a single orbital: Bose–Einstein condensation, predicted in 1925 and achieved in 1995.

All four calculations have the shape set up in the previous chapter. A density of states $D(\varepsilon)$, multiplied by an occupation $\bar n(\varepsilon)$, is integrated to give the number of particles and the energy. Constants are the exact SI values $h = 6.62607015\times10^{-34}\,\mathrm{J\,s}$, $c = 299792458\,\mathrm{m/s}$, $k_B = 1.380649\times10^{-23}\,\mathrm{J/K}$, together with the CODATA 2018 values $m_e = 9.1093837015\times10^{-31}\,\mathrm{kg}$ and $1\,\mathrm{u} = 1.66053906660\times10^{-27}\,\mathrm{kg}$.

## Black-body radiation {#blackbody}

An enclosure with walls at temperature $T$ fills with electromagnetic radiation in equilibrium with the walls. A small hole in the enclosure radiates as a perfect absorber would, a **black body**. Each mode of the cavity, with wavevector $\mathbf k$ and one of two polarisations, is a harmonic oscillator of angular frequency $\omega = ck$; equivalently, it is an orbital for photons of energy $\hbar\omega$. Photons are absorbed and emitted by the walls, so their number is not conserved and, as shown in [[statistical-mechanics/quantum-statistics]], their chemical potential is zero. The mean number of photons in a mode is

$$
\bar n(\omega) = \frac{1}{e^{\hbar\omega/k_BT} - 1}.
$$

The photon density of states, from [[statistical-mechanics/quantum-statistics]], is $D(\varepsilon) = V\varepsilon^2/(\pi^2\hbar^3c^3)$; per unit angular frequency it is $V\omega^2/(\pi^2c^3)$.

::: theorem Planck's law {#thm-planck}
The energy per unit volume of black-body radiation at temperature $T$, per unit angular frequency, is

$$
u(\omega) = \frac{\hbar}{\pi^2c^3}\,\frac{\omega^3}{e^{\hbar\omega/k_BT} - 1}.
$$ {#eq-planck}

Per unit frequency $\nu = \omega/2\pi$ and per unit wavelength $\lambda = c/\nu$, the same law reads

$$
u_\nu(\nu) = \frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{h\nu/k_BT} - 1}, \qquad u_\lambda(\lambda) = \frac{8\pi hc}{\lambda^5}\,\frac{1}{e^{hc/\lambda k_BT} - 1}.
$$ {#eq-planck-lambda}
:::

::: proof
The number of modes with angular frequency in $[\omega, \omega + \dd\omega]$ is $V\omega^2\,\dd\omega/(\pi^2c^3)$, each holding on average $\bar n(\omega)$ photons of energy $\hbar\omega$. Dividing by $V$,

$$
u(\omega)\,\dd\omega = \frac{\omega^2}{\pi^2c^3}\cdot\hbar\omega\cdot\frac{1}{e^{\hbar\omega/k_BT} - 1}\,\dd\omega,
$$

which is [[#eq-planck]]. For the other forms, $u_\nu\,\dd\nu = u(\omega)\,\dd\omega$ with $\dd\omega = 2\pi\,\dd\nu$ and $\hbar\omega^3 = (h/2\pi)(2\pi\nu)^3$, which gives $u_\nu = 8\pi h\nu^3/c^3\times\bar n$. Similarly $u_\lambda\,\lvert\dd\lambda\rvert = u_\nu\,\dd\nu$ with $\lvert\dd\nu/\dd\lambda\rvert = c/\lambda^2$.
:::

At low frequency, $\hbar\omega \ll k_BT$, the denominator is $\hbar\omega/k_BT$ and $u(\omega) \approx \omega^2k_BT/(\pi^2c^3)$: each mode has the classical energy $k_BT$, the **Rayleigh–Jeans law**. Integrated over all frequencies it diverges, the "ultraviolet catastrophe" of classical physics. Planck's law cuts the integral off exponentially once $\hbar\omega \gtrsim k_BT$, because high-frequency modes, like the vibrations of the nitrogen molecule in [[statistical-mechanics/canonical]], are frozen.

::: proposition Wien's displacement law {#prop-wien}
The wavelength at which $u_\lambda$ is largest satisfies $\lambda_{\max}T = b$, with

$$
b = \frac{hc}{x_\lambda k_B} = 2.898\times10^{-3}\,\mathrm{m\,K}, \qquad x_\lambda = 4.965114\ldots,
$$

where $x_\lambda$ is the positive root of $x = 5(1 - e^{-x})$. The frequency at which $u_\nu$ is largest satisfies $h\nu_{\max} = x_\nu k_BT$, with $x_\nu = 2.821439\ldots$ the positive root of $x = 3(1 - e^{-x})$.
:::

::: proof
With $x = hc/\lambda k_BT$, $u_\lambda \propto x^5/(e^x - 1)$ at fixed $T$. Setting the derivative of $5\ln x - \ln(e^x - 1)$ to zero gives $5/x = e^x/(e^x - 1)$, that is $x = 5(1 - e^{-x})$. The function $5(1 - e^{-x}) - x$ is positive at $x = 1$ and negative at $x = 6$, and bisection gives $4.965114$. Then $b = hc/(4.965114\,k_B) = 2.8978\times10^{-3}\,\mathrm{m\,K}$. The frequency form is the same with $x^3/(e^x - 1)$.
:::

The two peaks do not correspond: $c/\nu_{\max} = 1.76\,\lambda_{\max}$, because the two distributions are densities with respect to different variables. "The colour of maximum emission" is not a property of the radiation alone.

::: lemma A Bose integral {#lem-bose-integral}
$$
\int_0^\infty\frac{x^3}{e^x - 1}\,\dd x = \frac{\pi^4}{15}.
$$
:::

::: proof
For $x > 0$, $1/(e^x - 1) = e^{-x}/(1 - e^{-x}) = \sum_{j=1}^\infty e^{-jx}$. All terms are positive, so the sum may be integrated term by term:

$$
\int_0^\infty x^3\sum_je^{-jx}\,\dd x = \sum_j\int_0^\infty x^3e^{-jx}\,\dd x = \sum_j\frac{3!}{j^4} = 6\,\zeta(4).
$$

The value $\zeta(4) = \sum_jj^{-4} = \pi^4/90$ is classical (Euler, 1735); it follows from the Fourier series of $x^4$ on $[-\pi, \pi]$, or from Parseval's identity for the series of $x^2$, as in [[math-methods/fourier]]. So the integral is $6\pi^4/90 = \pi^4/15$.
:::

::: theorem Stefan–Boltzmann law {#thm-stefan}
The energy density of black-body radiation is $u = aT^4$, and the power emitted per unit area by a black body is $\sigma T^4$, with

$$
a = \frac{\pi^2k_B^4}{15\hbar^3c^3}, \qquad \sigma = \frac{ac}{4} = \frac{2\pi^5k_B^4}{15h^3c^2}.
$$ {#eq-stefan}
:::

::: proof
Integrate [[#eq-planck]] with $x = \hbar\omega/k_BT$, so $\omega = k_BTx/\hbar$ and $\dd\omega = (k_BT/\hbar)\,\dd x$:

$$
u = \int_0^\infty u(\omega)\,\dd\omega = \frac{\hbar}{\pi^2c^3}\left(\frac{k_BT}{\hbar}\right)^4\int_0^\infty\frac{x^3}{e^x - 1}\,\dd x = \frac{k_B^4T^4}{\pi^2\hbar^3c^3}\cdot\frac{\pi^4}{15},
$$

by [[#lem-bose-integral]]. That is $aT^4$.

For the flux through a hole of area $A$, photons move with speed $c$ in directions distributed uniformly over the sphere. In time $\dd t$, the photons moving at angle $\theta$ to the normal that pass through the hole are those in a slanted cylinder of volume $Ac\cos\theta\,\dd t$. Averaging $\cos\theta$ over the outward hemisphere with the solid-angle weight $\sin\theta\,\dd\theta\,\dd\phi/(4\pi)$ gives

$$
\frac{1}{4\pi}\int_0^{2\pi}\dd\phi\int_0^{\pi/2}\cos\theta\sin\theta\,\dd\theta = \frac{1}{4\pi}\cdot2\pi\cdot\frac12 = \frac14,
$$

so the energy flux is $\tfrac14uc$, and $\sigma = ac/4$. With $\hbar = h/2\pi$, $\pi^2/(15\hbar^3)\cdot c/4 = \pi^2(2\pi)^3/(60h^3)\cdot c = 2\pi^5c/(15h^3)$, which gives the second form after dividing by $c^3$.
:::

::: example The Stefan–Boltzmann constant from fundamental constants {#ex-sigma}
Evaluate $\sigma$ from [[#eq-stefan]], and use it to find the luminosity of the Sun, treating its photosphere as a black body of temperature $5772\,\mathrm{K}$ and radius $6.957\times10^8\,\mathrm{m}$. Find also the wavelength of maximum emission.
::: solution
With the exact SI constants,

$$
\sigma = \frac{2\pi^5(1.380649\times10^{-23})^4}{15\,(6.62607015\times10^{-34})^3\,(299792458)^2} = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}.
$$

The numerator is $2\times306.02\times3.6334\times10^{-92} = 2.2238\times10^{-89}$, and the denominator is $15\times2.9091\times10^{-100}\times8.9876\times10^{16} = 3.9218\times10^{-82}$. Their ratio agrees with the CODATA value $5.670374419\times10^{-8}$ to every digit, as it must: since 2019, $h$, $c$ and $k_B$ are exact, so $\sigma$ is exact too. The radiation constant is $a = 4\sigma/c = 7.5657\times10^{-16}\,\mathrm{J\,m^{-3}\,K^{-4}}$.

The solar luminosity is

$$
L = 4\pi R^2\sigma T^4 = 4\pi(6.957\times10^8)^2\times5.6704\times10^{-8}\times(5772)^4 = 3.828\times10^{26}\,\mathrm{W},
$$

which is the IAU nominal solar luminosity; in fact $5772\,\mathrm{K}$ is the effective temperature *defined* by that luminosity and radius. The peak of $u_\lambda$ is at $\lambda_{\max} = 2.8978\times10^{-3}/5772 = 5.02\times10^{-7}\,\mathrm{m}$, in the green.
:::
:::

::: widget plot
f: 4.5391/(x^5*(exp(14387.77/(x*T))-1))
x: 0.1, 3
y: 0, 5.5
sliders: T=5772:2500:8000:10
caption: Planck's law per unit wavelength, $u_\lambda$, against wavelength in micrometres, scaled so that the Sun ($T = 5772\,\mathrm{K}$) peaks at $1$. Slide $T$ down to $3000\,\mathrm{K}$, a tungsten filament: the peak moves to $0.97\,\mu\mathrm{m}$, in the infrared, and its height drops by a factor $26$, so most of the output is heat, not light. Slide up to $8000\,\mathrm{K}$: the peak moves into the blue and rises fivefold. The peak height scales as $T^5$ and the area as $T^4$.
:::

::: example The cosmic microwave background {#ex-cmb}
The universe is filled with black-body radiation at $T = 2.72548\,\mathrm{K}$. Find the number density of its photons and its energy density.
::: solution
The photon number density is $\int D(\varepsilon)\bar n\,\dd\varepsilon/V$. With $x = \varepsilon/k_BT$,

$$
n_\gamma = \frac{1}{\pi^2}\left(\frac{k_BT}{\hbar c}\right)^3\int_0^\infty\frac{x^2}{e^x - 1}\,\dd x = \frac{2\zeta(3)}{\pi^2}\left(\frac{k_BT}{\hbar c}\right)^3,
$$

since, as in [[#lem-bose-integral]], $\int_0^\infty x^2/(e^x - 1)\,\dd x = 2!\,\zeta(3)$, with $\zeta(3) = 1.2020569$. Here $k_BT/(\hbar c) = 3.7629\times10^{-23}/3.1615\times10^{-26}\,\mathrm{m^{-1}} = 1190.2\,\mathrm{m^{-1}}$, whose cube is $1.6862\times10^{9}\,\mathrm{m^{-3}}$. Then

$$
n_\gamma = \frac{2\times1.2020569}{\pi^2}\times1.6862\times10^9\,\mathrm{m^{-3}} = 4.107\times10^8\,\mathrm{m^{-3}} = 411\,\mathrm{cm^{-3}}.
$$

The energy density is $aT^4 = 7.5657\times10^{-16}\times(2.72548)^4 = 4.17\times10^{-14}\,\mathrm{J/m^3}$, about $0.26\,\mathrm{eV/cm^3}$. The mean photon energy is $u/n_\gamma = 2.70\,k_BT$. There are roughly a billion photons for every proton in the universe; the radiation dominates by number though not, today, by energy.
:::
:::

## Phonons and the Debye model {#debye}

A crystal of $N$ atoms has $3N$ normal modes of vibration, from [[analytical-mechanics/small-oscillations]], each a harmonic oscillator. Einstein's model of [[statistical-mechanics/microcanonical]] gave all of them one frequency, and its heat capacity falls exponentially at low temperature. Measured heat capacities fall like $T^3$, much more slowly. The difference is that real modes have a spread of frequencies, and the low-frequency ones, long-wavelength sound waves, are never frozen.

The quanta of these modes are **phonons**. Like photons they are bosons with $\mu = 0$, since their number is not conserved. For long wavelengths a mode is a sound wave with $\omega = v_sk$; three polarisations (one longitudinal, two transverse), here given a common speed $v_s$ for simplicity, make the density of states in angular frequency $3V\omega^2/(2\pi^2v_s^3)$, by the counting of [[statistical-mechanics/quantum-statistics]] with $g = 3$. But the number of modes is finite.

::: definition Debye model {#def-debye}
The **Debye model** of a crystal of $N$ atoms uses the density of states $D(\omega) = 3V\omega^2/(2\pi^2v_s^3)$ for $\omega$ up to a cut-off $\omega_D$ chosen so that the total number of modes is $3N$, and zero above it. The **Debye temperature** is $\Theta_D = \hbar\omega_D/k_B$. The cut-off condition $\int_0^{\omega_D}D\,\dd\omega = 3N$ gives

$$
\omega_D^3 = 6\pi^2\,\frac{N}{V}\,v_s^3.
$$
:::

::: theorem Debye heat capacity {#thm-debye}
In the Debye model the heat capacity is

$$
C_V = 9Nk_B\left(\frac{T}{\Theta_D}\right)^3\int_0^{\Theta_D/T}\frac{x^4e^x}{(e^x - 1)^2}\,\dd x.
$$ {#eq-debye}

For $T \gg \Theta_D$, $C_V \to 3Nk_B$ (Dulong–Petit). For $T \ll \Theta_D$,

$$
C_V = \frac{12\pi^4}{5}\,Nk_B\left(\frac{T}{\Theta_D}\right)^3.
$$ {#eq-debye-t3}
:::

::: proof
Each mode of frequency $\omega$ is an oscillator with mean thermal energy $\hbar\omega/(e^{\beta\hbar\omega} - 1)$, from [[statistical-mechanics/canonical]] (the zero-point energy does not depend on $T$ and drops out of $C_V$). Write $D(\omega) = 9N\omega^2/\omega_D^3$, which is the definition with the cut-off condition substituted. Then

$$
U - U_0 = \int_0^{\omega_D}\frac{9N\omega^2}{\omega_D^3}\,\frac{\hbar\omega}{e^{\beta\hbar\omega} - 1}\,\dd\omega.
$$

The heat capacity of one oscillator, from [[statistical-mechanics/microcanonical]], is $k_Bx^2e^x/(e^x - 1)^2$ with $x = \hbar\omega/k_BT$. So

$$
C_V = \int_0^{\omega_D}\frac{9N\omega^2}{\omega_D^3}\,k_B\frac{x^2e^x}{(e^x - 1)^2}\,\dd\omega.
$$

Change variable to $x$, with $\omega = k_BTx/\hbar$ and $\omega_D = k_B\Theta_D/\hbar$, so that $\omega^2\,\dd\omega/\omega_D^3 = (T/\Theta_D)^3x^2\,\dd x$. This gives [[#eq-debye]].

High temperature: the upper limit $\Theta_D/T$ is small, the integrand is approximately $x^2$, and the integral is $\tfrac13(\Theta_D/T)^3$, so $C_V \to 3Nk_B$.

Low temperature: the upper limit tends to infinity, and the integral tends to a constant. Integrating by parts,

$$
\int_0^\infty\frac{x^4e^x}{(e^x - 1)^2}\,\dd x = \left[-\frac{x^4}{e^x - 1}\right]_0^\infty + \int_0^\infty\frac{4x^3}{e^x - 1}\,\dd x = 4\cdot\frac{\pi^4}{15},
$$

by [[#lem-bose-integral]]. Multiplying by $9Nk_B(T/\Theta_D)^3$ gives [[#eq-debye-t3]].
:::

The $T^3$ law is the phonon analogue of the Stefan–Boltzmann $T^4$: at low temperature only modes with $\hbar\omega \lesssim k_BT$ are excited, their number grows like $T^3$, and each holds energy $\sim k_BT$. The cut-off and the details of the dispersion do not matter there; only the sound speeds do. At high temperature only the total number of modes matters. The Debye model interpolates between two regimes in which it is exact, and in between it is a good approximation for simple solids.

::: widget plot
f: 3*x^3*sum(((k-0.5)/(200*x))^4*exp((k-0.5)/(200*x))/(exp((k-0.5)/(200*x))-1)^2, k, 1, 200)/(200*x); (0.8/x)^2*exp(0.8/x)/(exp(0.8/x)-1)^2; 1
x: 0.02, 1.5
y: 0, 1.1
labels: Debye; Einstein, Θ_E = 0.8 Θ_D; Dulong–Petit
caption: Heat capacity per $3Nk_B$ against $T/\Theta_D$ for the Debye model (computed by a 200-point midpoint sum) and an Einstein model with $\Theta_E = 0.8\,\Theta_D$, which matches it at high temperature. Above $T \approx \Theta_D$ the two are close to the classical value. Below $T/\Theta_D \approx 0.1$ the Einstein curve collapses exponentially, while the Debye curve falls only like $T^3$: at $T/\Theta_D = 0.05$ it is still $0.0097$, more than three hundred times the Einstein value.
:::

::: example Copper at 10 kelvin {#ex-copper-debye}
Copper has $\Theta_D = 343\,\mathrm{K}$. Find the lattice heat capacity of one mole at $10.0\,\mathrm{K}$, and compare it with the Dulong–Petit value.
::: solution
At $T/\Theta_D = 10.0/343 = 0.02915$, the $T^3$ law applies (the figure shows the full curve is already in its $T^3$ regime below $0.05$). With $Nk_B = R$,

$$
C_V = \frac{12\pi^4}{5}R\left(\frac{10.0}{343}\right)^3 = 233.78\times8.3145\times2.478\times10^{-5}\,\mathrm{J/K} = 0.0482\,\mathrm{J/K}.
$$

The classical value is $3R = 24.94\,\mathrm{J/K}$, so at $10\,\mathrm{K}$ the lattice holds only $0.19\%$ of its classical heat capacity. In copper at this temperature the conduction electrons, treated below, contribute a comparable amount; below about $4\,\mathrm{K}$ they dominate. A full treatment of phonons, with the real dispersion relations, is in [[condensed-matter/lattice-vibrations]].
:::
:::

## The degenerate Fermi gas {#fermi}

Now fermions at high density. Take $N$ electrons, spin $\tfrac12$ so $g = 2$, in a volume $V$, with no interactions. The free-electron model treats the conduction electrons of a metal this way, and it is surprisingly accurate for the alkali metals and for copper, silver and gold.

At $T = 0$ the Fermi–Dirac distribution is a step: every orbital below $\mu$ is occupied and every orbital above is empty. The electrons fill the orbitals from the bottom, two per spatial orbital, up to the energy at which all $N$ have been placed.

::: definition Fermi energy {#def-fermi}
The **Fermi energy** $E_F$ is the chemical potential of an ideal Fermi gas at $T = 0$: the energy of the highest occupied orbital. The **Fermi wavenumber** is $k_F = \sqrt{2mE_F}/\hbar$, the **Fermi temperature** is $T_F = E_F/k_B$, and the **Fermi velocity** is $v_F = \hbar k_F/m$.
:::

::: theorem The free-electron gas at zero temperature {#thm-fermi-gas}
For an ideal gas of spin-$\tfrac12$ fermions of mass $m$ at number density $n = N/V$, at $T = 0$,

$$
E_F = \frac{\hbar^2}{2m}\left(3\pi^2n\right)^{2/3}, \qquad U = \frac35NE_F, \qquad P = \frac25nE_F.
$$ {#eq-fermi}
:::

::: proof
From [[statistical-mechanics/quantum-statistics]], the number of orbitals with $\lvert\mathbf k\rvert < k$, with $g = 2$, is $Vk^3/(3\pi^2)$. Setting this equal to $N$ at $k = k_F$ gives $k_F^3 = 3\pi^2n$, and $E_F = \hbar^2k_F^2/2m$ is the stated formula.

The density of states is $D(\varepsilon) = \tfrac32N\varepsilon^{1/2}/E_F^{3/2}$: it is proportional to $\varepsilon^{1/2}$, and the constant is fixed by $\int_0^{E_F}D\,\dd\varepsilon = N$. Then

$$
U = \int_0^{E_F}\varepsilon D(\varepsilon)\,\dd\varepsilon = \frac{3N}{2E_F^{3/2}}\cdot\frac25E_F^{5/2} = \frac35NE_F.
$$

Finally $PV = \tfrac23U$ holds for any non-relativistic ideal gas, by the proposition proved in [[statistical-mechanics/quantum-statistics]], so $P = \tfrac23\cdot\tfrac35nE_F = \tfrac25nE_F$.
:::

::: example Electrons in copper {#ex-copper}
Copper contributes one conduction electron per atom, $n = 8.47\times10^{28}\,\mathrm{m^{-3}}$. Find $E_F$, $T_F$, $v_F$ and the degeneracy pressure.
::: solution
First $3\pi^2n = 2.508\times10^{30}\,\mathrm{m^{-3}}$, so $k_F = 1.359\times10^{10}\,\mathrm{m^{-1}}$. Then

$$
E_F = \frac{\hbar^2k_F^2}{2m_e} = \frac{(1.054572\times10^{-34})^2\times(1.359\times10^{10})^2}{2\times9.10938\times10^{-31}}\,\mathrm{J} = 1.1268\times10^{-18}\,\mathrm{J} = 7.03\,\mathrm{eV}.
$$

The Fermi temperature is $T_F = E_F/k_B = 8.16\times10^4\,\mathrm{K}$, the Fermi velocity is $v_F = \hbar k_F/m_e = 1.57\times10^6\,\mathrm{m/s}$, about $0.5\%$ of the speed of light, and the pressure is

$$
P = \tfrac25nE_F = 0.4\times8.47\times10^{28}\times1.1268\times10^{-18}\,\mathrm{Pa} = 3.82\times10^{10}\,\mathrm{Pa},
$$

nearly four hundred thousand atmospheres. Room temperature is $0.4\%$ of $T_F$, so the electron gas in copper is, for most purposes, at absolute zero. The enormous pressure is balanced by the attraction of the electrons to the ion lattice; it is part of why metals resist compression.
:::
:::

::: warning The Fermi energy is not thermal
An electron at the Fermi surface of copper moves at $1.6\times10^6\,\mathrm{m/s}$ at absolute zero, and the mean kinetic energy is $\tfrac35E_F = 4.2\,\mathrm{eV}$, a hundred and sixty times $k_BT$ at room temperature. None of this is thermal energy; it is forced by the exclusion principle and cannot be extracted as heat. Equating $\tfrac32k_BT$ to the mean electron energy, as the classical Drude model did, gives the wrong velocities, the wrong heat capacity and the wrong temperature dependences.
:::

### The heat capacity of the electron gas

At a temperature $T \ll T_F$, only electrons within a few $k_BT$ of the Fermi energy can be excited, since those deeper down have no empty orbitals within reach. A fraction of order $T/T_F$ of the electrons each gain energy of order $k_BT$, so $U - U_0 \sim N(k_BT)^2/E_F$ and $C \sim Nk_B\,T/T_F$. The precise coefficient comes from the **Sommerfeld expansion**.

::: theorem Electronic heat capacity {#thm-sommerfeld}
For an ideal Fermi gas at $T \ll T_F$,

$$
C_V = \frac{\pi^2}{2}Nk_B\,\frac{T}{T_F} + O\bigl((T/T_F)^3\bigr).
$$ {#eq-sommerfeld}
:::

::: proof
We sketch the standard argument; Kittel and Kroemer (chapter 7) and Pathria and Beale (section 8.1) give the full expansion. For a smooth function $H(\varepsilon)$, the Sommerfeld lemma states

$$
\int_0^\infty H(\varepsilon)\,\bar n_{\mathrm{FD}}(\varepsilon)\,\dd\varepsilon = \int_0^\mu H(\varepsilon)\,\dd\varepsilon + \frac{\pi^2}{6}(k_BT)^2H'(\mu) + O(T^4).
$$

It follows by integrating by parts, so that the derivative $-\partial\bar n/\partial\varepsilon$ appears; that derivative is a peak of width $k_BT$ centred at $\mu$, symmetric about it, with $\int_{-\infty}^\infty x^2\,\dfrac{e^x}{(e^x + 1)^2}\,\dd x = \pi^2/3$. Apply the lemma with $H = D$ and $H = \varepsilon D$. Keeping $N$ fixed shifts $\mu$ by an amount of order $T^2$, which to this order cancels in $U$, and leaves

$$
U = U_0 + \frac{\pi^2}{6}D(E_F)(k_BT)^2.
$$

Differentiating, $C_V = \tfrac{\pi^2}{3}D(E_F)k_B^2T$. With $D(E_F) = 3N/(2E_F)$ from the proof of [[#thm-fermi-gas]], this is $\tfrac{\pi^2}{2}Nk_B\,k_BT/E_F$.
:::

For copper at $300\,\mathrm{K}$, [[#eq-sommerfeld]] gives $C_V = (\pi^2/2)R\times300/81600 = 0.151\,\mathrm{J/(mol\cdot K)}$, compared with $\tfrac32R = 12.5\,\mathrm{J/(mol\cdot K)}$ for a classical gas. The measured linear coefficient for copper is $\gamma = 0.695\,\mathrm{mJ/(mol\cdot K^2)}$, about $1.4$ times the free-electron value $0.503\,\mathrm{mJ/(mol\cdot K^2)}$; the difference is attributed to the band structure and to the electron–phonon interaction. Setting $\gamma T$ equal to the Debye term [[#eq-debye-t3]] with the measured $\gamma$ shows that the electronic contribution exceeds the lattice one below about $3.8\,\mathrm{K}$.

::: quiz
At $T \ll T_F$, which electrons in a metal take part in absorbing heat?
- [ ] All of them equally, each gaining about $k_BT$.
- [x] Only those within a few $k_BT$ of the Fermi energy.
- [ ] Only those near the bottom of the band, which are the most numerous.
- [ ] None of them, since the gas is at absolute zero.
::: solution
An electron deep in the Fermi sea has every orbital within $k_BT$ of it already occupied, so the exclusion principle forbids it from absorbing a thermal amount of energy. Only electrons near the Fermi surface have empty orbitals within reach. The density of states at the bottom of the band is in fact smallest, $D \propto \varepsilon^{1/2}$. A small but non-zero heat capacity, linear in $T$, results.
:::
:::

### White dwarfs

A star that has exhausted its nuclear fuel contracts until something other than thermal pressure resists gravity. For a star of about one solar mass the answer is electron degeneracy pressure. Such a star is a **white dwarf**: about a solar mass in a volume the size of the Earth.

::: example Sirius B {#ex-sirius}
Sirius B has a mass of about $1.02$ solar masses ($M_\odot = 1.988\times10^{30}\,\mathrm{kg}$) and a radius of about $5.6\times10^6\,\mathrm{m}$. It is made mostly of carbon and oxygen, which have two nucleons per electron. Estimate its mean density, the electron density, and the ratio $p_F/m_ec$. Is the electron gas degenerate at an interior temperature of $10^7\,\mathrm{K}$?
::: solution
The mean density is

$$
\rho = \frac{1.02\times1.988\times10^{30}}{\tfrac43\pi(5.6\times10^6)^3}\,\mathrm{kg/m^3} = 2.76\times10^9\,\mathrm{kg/m^3},
$$

nearly three tonnes per cubic centimetre. With two nucleons per electron, $n_e = \rho/(2\,\mathrm u) = 8.30\times10^{35}\,\mathrm{m^{-3}}$, ten million times the density in copper. The Fermi momentum is $p_F = \hbar(3\pi^2n_e)^{1/3}$, and

$$
\frac{p_F}{m_ec} = \frac{1.054572\times10^{-34}\times(2.458\times10^{37})^{1/3}}{9.10938\times10^{-31}\times2.99792\times10^8} = 1.12.
$$

The Fermi momentum exceeds $m_ec$, so the electrons are relativistic and the non-relativistic formula [[#eq-fermi]] overstates their energy: it would give $E_F = 322\,\mathrm{keV}$, while the correct relativistic kinetic energy at the Fermi surface is $m_ec^2(\sqrt{1 + 1.12^2} - 1) = 257\,\mathrm{keV}$. The corresponding Fermi temperature is about $3\times10^9\,\mathrm{K}$, three hundred times the interior temperature. The electron gas is highly degenerate, and its pressure, not its temperature, holds the star up. The nuclei, much heavier, form a classical gas or a crystal and contribute little pressure.
:::
:::

Balancing degeneracy pressure against gravity gives the mass–radius relation. For non-relativistic electrons the degeneracy energy scales as $N_e^{5/3}/R^2$ and the gravitational energy as $-GM^2/R$; minimising their sum gives $R \propto M^{-1/3}$, an exercise below. More massive white dwarfs are *smaller*. As the mass increases, the electrons become relativistic, the degeneracy energy changes from $\propto 1/R^2$ to $\propto 1/R$, the same scaling as gravity, and above a critical mass no equilibrium radius exists. Subrahmanyan Chandrasekhar found this limit in 1931; with two nucleons per electron it is about $1.4\,M_\odot$. Heavier cores collapse further, to neutron stars, where the same physics applies to neutrons, as discussed in [[gravitation/stars]].

::: example Neutrons at nuclear density {#ex-neutron-star}
A neutron star is, to a first approximation, a degenerate gas of neutrons ($m_n = 1.67493\times10^{-27}\,\mathrm{kg}$, spin $\tfrac12$) at about nuclear density, $n = 0.16\,\mathrm{fm^{-3}} = 1.6\times10^{44}\,\mathrm{m^{-3}}$. Find the Fermi energy and the Fermi temperature, and say whether the neutrons are relativistic.
::: solution
With $3\pi^2n = 4.737\times10^{45}\,\mathrm{m^{-3}}$, $k_F = 1.680\times10^{15}\,\mathrm{m^{-1}}$, about $1.7\,\mathrm{fm^{-1}}$. Then

$$
E_F = \frac{\hbar^2k_F^2}{2m_n} = \frac{(1.054572\times10^{-34})^2(1.680\times10^{15})^2}{2\times1.67493\times10^{-27}}\,\mathrm{J} = 9.36\times10^{-12}\,\mathrm{J} = 58\,\mathrm{MeV},
$$

and $T_F = E_F/k_B = 6.8\times10^{11}\,\mathrm{K}$. The ratio $p_F/m_nc = \hbar k_F/m_nc = 0.35$, so the neutrons are mildly relativistic, and the non-relativistic formula is good to about ten percent. A neutron star a few years old has an interior temperature of perhaps $10^9\,\mathrm{K}$, less than $1\%$ of $T_F$: like the electrons in a metal, the neutrons are essentially at absolute zero. The same formula that gives $7\,\mathrm{eV}$ for copper gives $58\,\mathrm{MeV}$ here, a factor $8\times10^6$, because the density is $1.9\times10^{15}$ times larger and the mass $1839$ times larger: $(1.9\times10^{15})^{2/3}/1839 = 8.3\times10^6$. Nuclear forces, neglected here, matter at this density, and they are what fix the maximum mass of neutron stars.
:::
:::

## Bose–Einstein condensation {#bec}

Now bosons with conserved number: a gas of $N$ atoms of integer total spin, such as $^{87}$Rb or $^4$He, with $g = 1$. As in [[statistical-mechanics/quantum-statistics]], the chemical potential is fixed by

$$
N = \sum_k\frac{1}{e^{\beta(\varepsilon_k - \mu)} - 1},
$$

and must stay below the lowest orbital energy, which we put at $\varepsilon = 0$. As the gas is cooled at fixed density, $\mu$ rises towards $0$. Replacing the sum by an integral with $D(\varepsilon) \propto \varepsilon^{1/2}$ gives, from the series of the previous chapter,

$$
N_{\mathrm{exc}} = \frac{V}{\lambda^3}\sum_{j=1}^\infty\frac{z^j}{j^{3/2}}, \qquad z = e^{\beta\mu}.
$$

The series is largest at $z = 1$, where it equals $\zeta(\tfrac32) = 2.612375$. So the excited orbitals can hold at most $2.612\,V/\lambda^3$ particles, and that maximum falls like $T^{3/2}$ as $T$ falls. What happens to the rest?

The answer is that the integral has dropped something. Its weight $D(\varepsilon) \propto \varepsilon^{1/2}$ vanishes at $\varepsilon = 0$, so it gives the ground orbital zero weight. That is harmless as long as the ground orbital holds a negligible fraction of the particles, but its occupation $1/(e^{-\beta\mu} - 1) \approx k_BT/(-\mu)$ grows without bound as $\mu \to 0^-$. When the excited orbitals are saturated, the extra particles go into the ground orbital, and its occupation $N_0$ becomes a finite fraction of $N$.

::: theorem Bose–Einstein condensation {#thm-bec}
An ideal Bose gas of particles of mass $m$ at number density $n$ condenses below the temperature $T_c$ at which $n\lambda^3 = \zeta(\tfrac32)$:

$$
T_c = \frac{2\pi\hbar^2}{mk_B}\left(\frac{n}{\zeta(3/2)}\right)^{2/3}, \qquad \zeta(\tfrac32) = 2.612375\ldots
$$ {#eq-tc}

For $T < T_c$ the chemical potential is zero to within a quantity of order $k_BT/N$, and the fraction of particles in the ground orbital is

$$
\frac{N_0}{N} = 1 - \left(\frac{T}{T_c}\right)^{3/2}.
$$ {#eq-condensate}
:::

::: proof
Above $T_c$, the equation $n\lambda^3 = \sum_jz^j/j^{3/2}$ has a solution $z < 1$, because the right side increases continuously from $0$ to $\zeta(\tfrac32)$ on $[0, 1]$ and $n\lambda^3 < \zeta(\tfrac32)$; the ground orbital then holds $z/(1 - z)$ particles, which is of order $1$, negligible compared with $N$. The temperature at which $n\lambda^3 = \zeta(\tfrac32)$ is found by solving $n h^3/(2\pi mk_BT)^{3/2} = \zeta(\tfrac32)$ for $T$, which gives [[#eq-tc]] after writing $h = 2\pi\hbar$.

Below $T_c$, no $z \le 1$ lets the excited orbitals hold all $N$ particles. The ground orbital must take the rest, $N_0 = N - N_{\mathrm{exc}}$, and this requires $1/(z^{-1} - 1) = N_0$, so $z = 1 - O(1/N_0)$ and $\mu = -k_BT/N_0$ to leading order, negligible for macroscopic $N_0$. With $z = 1$ the excited orbitals hold their maximum, $N_{\mathrm{exc}} = \zeta(\tfrac32)V/\lambda^3$. Since $\lambda^{-3} \propto T^{3/2}$ and $N_{\mathrm{exc}} = N$ at $T_c$,

$$
N_{\mathrm{exc}} = N\left(\frac{T}{T_c}\right)^{3/2}, \qquad N_0 = N - N_{\mathrm{exc}} = N\left[1 - \left(\frac{T}{T_c}\right)^{3/2}\right].
$$

Treating the excited orbitals with the integral is legitimate here because the lowest excited orbitals, though highly occupied, hold a fraction of $N$ that vanishes as $V \to \infty$ at fixed density; the ground orbital alone holds a finite fraction.
:::

The condensation is a phase transition with no interactions at all, driven purely by statistics. It happens in momentum space, not position space: the condensate is a macroscopic number of particles in the single orbital of lowest energy, all with the same wavefunction. At $T_c$ the thermal wavelength is comparable to the spacing between particles, $\lambda = (2.612/n)^{1/3} = 1.38\,n^{-1/3}$; the wave packets overlap.

::: widget plot
f: if(x<1, 1-x^1.5, 0); if(x<1, x^1.5, 1)
x: 0, 2
y: 0, 1.05
labels: condensate fraction N₀/N; excited fraction
caption: The fractions of an ideal Bose gas in the ground orbital and in excited orbitals, against $T/T_c$. Above $T_c$ the condensate fraction is zero in the thermodynamic limit. Below, it grows continuously from zero, with a kink but no jump at $T_c$. At $T = T_c/2$ the condensate holds $65\%$ of the atoms. In a trapped gas the exponent is different, since the density of states of a harmonic trap grows like $\varepsilon^2$ and gives $1 - (T/T_c)^3$.
:::

::: example Rubidium-87 {#ex-rubidium}
Find the condensation temperature of an ideal gas of $^{87}$Rb atoms, mass $86.909\,\mathrm{u}$, at a number density of $1.0\times10^{20}\,\mathrm{m^{-3}}$ ($10^{14}\,\mathrm{cm^{-3}}$), typical of the peak densities in magnetically trapped alkali gases. What density gives $T_c = 170\,\mathrm{nK}$?
::: solution
The mass is $m = 86.909180527\times1.66053907\times10^{-27} = 1.44316\times10^{-25}\,\mathrm{kg}$. In [[#eq-tc]],

$$
\frac{2\pi\hbar^2}{mk_B} = \frac{2\pi\times(1.054572\times10^{-34})^2}{1.44316\times10^{-25}\times1.380649\times10^{-23}} = 3.5070\times10^{-20}\,\mathrm{K\,m^2},
$$

and $(n/2.612375)^{2/3} = (3.8279\times10^{19})^{2/3} = 1.1358\times10^{13}\,\mathrm{m^{-2}}$. So

$$
T_c = 3.5070\times10^{-20}\times1.1358\times10^{13}\,\mathrm{K} = 3.98\times10^{-7}\,\mathrm{K} \approx 400\,\mathrm{nK}.
$$

Inverting, $T_c = 170\,\mathrm{nK}$ requires $n = 2.612/\lambda^3$ with $\lambda = 0.454\,\mu\mathrm{m}$ at $170\,\mathrm{nK}$, which is $n = 2.8\times10^{19}\,\mathrm{m^{-3}}$. The JILA group saw the condensate appear near $170\,\mathrm{nK}$ in 1995. Such a gas is a million times less dense than air, so to have $n\lambda^3 \approx 1$ its atoms must have thermal wavelengths approaching a micrometre: temperatures below a microkelvin, reached by laser cooling followed by evaporative cooling.
:::
:::

::: quiz
A uniform ideal Bose gas is at its condensation temperature. Keeping the temperature fixed, you compress it to half its volume. What fraction of the atoms is now in the condensate?
- [ ] None: condensation needs cooling, not compression.
- [ ] One quarter.
- [x] One half.
- [ ] All of them.
::: solution
At fixed $T$ the excited orbitals hold at most $\zeta(\tfrac32)V/\lambda^3$ atoms, which is proportional to $V$. At the start this maximum equals $N$. Halving $V$ halves it, so only $N/2$ atoms fit in excited orbitals and the other $N/2$ go into the condensate. Equivalently, the density doubles, so $T_c \propto n^{2/3}$ rises by $2^{2/3}$, and [[#eq-condensate]] gives $1 - (2^{-2/3})^{3/2} = 1 - \tfrac12$.
:::
:::

::: application Superfluid helium
Fritz London suggested in 1938 that the transition of liquid $^4$He to a superfluid at $2.17\,\mathrm{K}$ is a Bose–Einstein condensation. Applying [[#eq-tc]] to the density of the liquid, $0.145\,\mathrm{g/cm^3}$ or $n = 2.18\times10^{28}\,\mathrm{m^{-3}}$, gives $T_c = 3.13\,\mathrm{K}$: the right order of magnitude, for a liquid in which the atoms interact strongly and the ideal-gas model has no right to work. Neutron scattering shows that the condensate fraction in superfluid helium at low temperature is only about $10\%$, because the interactions deplete it. The fermion isotope $^3$He does not show a transition anywhere near $2\,\mathrm{K}$; it becomes superfluid only below about $1$ to $2.5\,\mathrm{mK}$, depending on pressure, when its atoms form pairs, which behave as bosons.
:::

::: history Planck, Debye, Bose, Einstein and the 1995 condensates
Max Planck presented his radiation formula to the German Physical Society on 19 October 1900 as an interpolation fitting the new infrared measurements of Rubens and Kurlbaum, and on 14 December 1900 a derivation using energy elements $h\nu$. Josef Stefan had found the $T^4$ law empirically in 1879 and Boltzmann derived it thermodynamically in 1884. Peter Debye's heat-capacity theory appeared in 1912. Bose's photon counting (1924) and Einstein's application to atoms (1924–25) predicted condensation, a result that was widely doubted until London's 1938 proposal. Ralph Fowler showed in 1926 that white-dwarf matter is a degenerate Fermi gas, months after Fermi's paper; Chandrasekhar's limiting mass followed in 1931, and Arnold Sommerfeld's theory of the electron gas in metals in 1927–28. In June 1995 Eric Cornell and Carl Wieman at JILA in Boulder produced a condensate of $^{87}$Rb atoms; in September 1995 Wolfgang Ketterle's group at MIT produced one of sodium atoms with far more atoms. The three shared the 2001 Nobel Prize in Physics.
:::

## Where this leads {#leads}

The free-electron gas is the starting point of [[condensed-matter/free-electrons]], which adds transport, and [[condensed-matter/band-structure]], which adds the periodic potential of the ions; the Fermi–Dirac distribution then gives the carrier densities of [[condensed-matter/semiconductors]]. Phonons are developed with their true dispersion relations in [[condensed-matter/lattice-vibrations]]. Degenerate matter in stars is followed into neutron stars in [[gravitation/stars]], and the photon gas, with $T \propto 1/a$ for a universe of scale factor $a$, is part of [[gravitation/cosmology]]. Bose–Einstein condensation is the simplest example of a phase transition; the next chapter, [[statistical-mechanics/phase-transitions]], takes up transitions caused by interactions.

::: summary
- Photons have $\mu = 0$ and density of states $V\omega^2/\pi^2c^3$; Planck's law $u(\omega) = (\hbar/\pi^2c^3)\,\omega^3/(e^{\hbar\omega/k_BT} - 1)$ follows, with Wien's peak at $\lambda_{\max}T = 2.898\times10^{-3}\,\mathrm{m\,K}$.
- Integrating Planck's law gives $u = aT^4$ and a radiated flux $\sigma T^4$, with $\sigma = 2\pi^5k_B^4/(15h^3c^2) = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$, exact in the 2019 SI.
- The Debye model treats a crystal as $3N$ phonon modes up to a cut-off $\Theta_D$; $C_V \to 3Nk_B$ at high $T$ and $C_V = (12\pi^4/5)Nk_B(T/\Theta_D)^3$ at low $T$.
- An ideal Fermi gas at $T = 0$ fills orbitals up to $E_F = (\hbar^2/2m)(3\pi^2n)^{2/3}$, with $U = \tfrac35NE_F$ and $P = \tfrac25nE_F$; for copper $E_F = 7.0\,\mathrm{eV}$ and $T_F = 8.2\times10^4\,\mathrm{K}$.
- Only electrons within $\sim k_BT$ of $E_F$ absorb heat, so $C_V = (\pi^2/2)Nk_BT/T_F$.
- White dwarfs are held up by electron degeneracy pressure; their electrons are relativistic, and above about $1.4\,M_\odot$ no equilibrium exists.
- An ideal Bose gas condenses below $T_c = (2\pi\hbar^2/mk_B)(n/2.612)^{2/3}$, where $n\lambda^3 = 2.612$; the condensate fraction is $1 - (T/T_c)^{3/2}$. For $^{87}$Rb at $10^{20}\,\mathrm{m^{-3}}$, $T_c \approx 400\,\mathrm{nK}$.
:::

## Exercises {#exercises}

::: exercise A lamp filament {level=1 check="966"}
At what wavelength, in nanometres to three significant figures, does a black body at $3000\,\mathrm{K}$ emit most strongly per unit wavelength?
::: solution
By [[#prop-wien]], $\lambda_{\max} = b/T = 2.8978\times10^{-3}/3000\,\mathrm{m} = 9.66\times10^{-7}\,\mathrm{m} = 966\,\mathrm{nm}$, in the near infrared. Visible light is on the short-wavelength flank of the curve, which is why incandescent lamps are inefficient.
:::
:::

::: exercise Radiated power {level=1 check="5.67"}
Find the power, in watts to three significant figures, radiated by $1.00\,\mathrm{cm^2}$ of a black body at $1000\,\mathrm{K}$.
::: solution
By [[#thm-stefan]], the power is $\sigma T^4A = 5.6704\times10^{-8}\times(1000)^4\times1.00\times10^{-4}\,\mathrm{W} = 5.67\,\mathrm{W}$. Doubling the temperature would multiply it by sixteen.
:::
:::

::: exercise The Fermi energy of sodium {level=1 check="3.24"}
Sodium has one conduction electron per atom and $n = 2.65\times10^{28}\,\mathrm{m^{-3}}$. Find its free-electron Fermi energy in electronvolts, to three significant figures.
::: solution
With $3\pi^2n = 7.846\times10^{29}\,\mathrm{m^{-3}}$, $k_F = (7.846\times10^{29})^{1/3} = 9.223\times10^9\,\mathrm{m^{-1}}$, and

$$
E_F = \frac{\hbar^2k_F^2}{2m_e} = \frac{(1.054572\times10^{-34})^2(9.223\times10^9)^2}{2\times9.10938\times10^{-31}}\,\mathrm{J} = 5.193\times10^{-19}\,\mathrm{J} = 3.24\,\mathrm{eV}.
$$

The Fermi temperature is $3.76\times10^4\,\mathrm{K}$. Since $E_F \propto n^{2/3}$, the ratio to copper is $(2.65/8.47)^{2/3} = 0.461$, consistent with $3.24/7.03$.
:::
:::

::: exercise Counting the background photons {level=2 check="411"}
Using $n_\gamma = (2\zeta(3)/\pi^2)(k_BT/\hbar c)^3$ with $\zeta(3) = 1.2020569$, find the number of cosmic background photons per cubic centimetre at $T = 2.72548\,\mathrm{K}$, to three significant figures.
::: solution
From [[#ex-cmb]], $k_BT/\hbar c = 1190.2\,\mathrm{m^{-1}}$, whose cube is $1.6862\times10^9\,\mathrm{m^{-3}}$. Multiplying by $2\zeta(3)/\pi^2 = 0.24359$ gives $4.107\times10^8\,\mathrm{m^{-3}}$, which is $411\,\mathrm{cm^{-3}}$. Since $n_\gamma \propto T^3$, a universe half as hot would have one eighth as many photons per volume.
:::
:::

::: exercise A low-temperature heat capacity {level=2 check="0.0482"}
Using the Debye $T^3$ law with $\Theta_D = 343\,\mathrm{K}$, find the lattice heat capacity of one mole of copper at $10.0\,\mathrm{K}$ in $\mathrm{J/K}$, to three significant figures, and the temperature at which it would be ten times larger.
::: solution
By [[#eq-debye-t3]], as in [[#ex-copper-debye]],

$$
C_V = \frac{12\pi^4}{5}\times8.314462618\times\left(\frac{10.0}{343}\right)^3\,\mathrm{J/K} = 1943.8\times2.4776\times10^{-5}\,\mathrm{J/K} = 0.0482\,\mathrm{J/K}.
$$

Since $C_V \propto T^3$, ten times the value needs $T = 10.0\times10^{1/3} = 21.5\,\mathrm{K}$, where $T/\Theta_D = 0.063$; a numerical evaluation of [[#eq-debye]] there differs from the $T^3$ law by only $0.04\%$, so the law is still excellent.
:::
:::

::: exercise Condensing sodium {level=2 check="1.51e-6"}
Find the ideal-gas condensation temperature, in kelvin to three significant figures, of sodium-23 atoms ($m = 22.98977\,\mathrm{u}$) at $n = 1.00\times10^{20}\,\mathrm{m^{-3}}$.
::: solution
The mass is $3.8175\times10^{-26}\,\mathrm{kg}$, and $2\pi\hbar^2/(mk_B) = 1.3258\times10^{-19}\,\mathrm{K\,m^2}$. With $(n/2.612375)^{2/3} = 1.1358\times10^{13}\,\mathrm{m^{-2}}$ as in [[#ex-rubidium]],

$$
T_c = 1.3258\times10^{-19}\times1.1358\times10^{13}\,\mathrm{K} = 1.51\times10^{-6}\,\mathrm{K}.
$$

At the same density, $T_c \propto 1/m$, so sodium condenses at $86.909/22.990 = 3.78$ times the rubidium temperature: $3.78\times398\,\mathrm{nK} = 1.51\,\mu\mathrm{K}$.
:::
:::

::: exercise The radius of a white dwarf {level=3 check="7.25e6"}
Model a white dwarf of mass $M$ as a uniform sphere of radius $R$ containing $N_e = M/(2\,\mathrm u)$ non-relativistic degenerate electrons, with kinetic energy $\tfrac35N_eE_F$, and gravitational energy $-\tfrac35GM^2/R$. Show that the total energy is $E(R) = A/R^2 - B/R$, prove that the equilibrium radius is $R = 2A/B \propto M^{-1/3}$, and evaluate it in metres, to three significant figures, for $M = M_\odot = 1.98841\times10^{30}\,\mathrm{kg}$, with $G = 6.67430\times10^{-11}\,\mathrm{N\,m^2/kg^2}$.
::: hint
With $V = \tfrac43\pi R^3$, $3\pi^2n_e = 9\pi N_e/(4R^3)$. The equilibrium minimises $E(R)$.
:::
::: solution
The electron density is $n_e = 3N_e/(4\pi R^3)$, so $3\pi^2n_e = 9\pi N_e/(4R^3)$ and $E_F = (\hbar^2/2m_e)(9\pi N_e/4)^{2/3}R^{-2}$. The total energy is

$$
E(R) = \frac{A}{R^2} - \frac{B}{R}, \qquad A = \frac35N_e\frac{\hbar^2}{2m_e}\left(\frac{9\pi N_e}{4}\right)^{2/3}, \qquad B = \frac35GM^2.
$$

Then $E'(R) = -2A/R^3 + B/R^2$ vanishes at $R = 2A/B$, and $E''(2A/B) = 6A/R^4 - 2B/R^3 = (6A - 2BR)/R^4 = 2A/R^4 > 0$, so it is a minimum. Since $A \propto N_e^{5/3} \propto M^{5/3}$ and $B \propto M^2$, $R \propto M^{-1/3}$.

Numerically, $N_e = 1.98841\times10^{30}/(2\times1.66053907\times10^{-27}) = 5.9872\times10^{56}$, and

$$
A = 0.6\times5.9872\times10^{56}\times6.1043\times10^{-39}\times(4.2321\times10^{57})^{2/3}\,\mathrm{J\,m^2} = 5.737\times10^{56}\,\mathrm{J\,m^2},
$$

using $\hbar^2/2m_e = 6.1043\times10^{-39}\,\mathrm{J\,m^2}$ and $(4.2321\times10^{57})^{2/3} = 2.616\times10^{38}$. Also $B = 0.6\times6.6743\times10^{-11}\times(1.98841\times10^{30})^2 = 1.5833\times10^{50}\,\mathrm{J\,m}$. So $R = 2A/B = 7.25\times10^6\,\mathrm{m}$, a little larger than the Earth. Observed white dwarfs of one solar mass are somewhat smaller, about $5.6\times10^6\,\mathrm{m}$, because the real star is centrally condensed and its electrons are partly relativistic, which softens the pressure.
:::
:::

::: exercise The photon gas expands {level=3}
For black-body radiation in a volume $V$ at temperature $T$, show that the entropy is $S = \tfrac43aVT^3$, using $U = aVT^4$ and $P = \tfrac13aT^4$. Prove that in a reversible adiabatic expansion $VT^3$ is constant, and deduce how the temperature of the cosmic background scales with the size of the universe.
::: hint
Use the thermodynamic identity $\dd U = T\,\dd S - P\,\dd V$, or $S = (U + PV - \mu N)/T$ with $\mu = 0$.
:::
::: solution
Since $\mu = 0$ for photons, $\Phi = -PV = U - TS$ gives $S = (U + PV)/T = (aVT^4 + \tfrac13aVT^4)/T = \tfrac43aVT^3$.

As a check from the identity, at fixed $V$, $(\partial S/\partial T)_V = C_V/T = 4aVT^2$, which integrates to $\tfrac43aVT^3$ with $S = 0$ at $T = 0$, consistent with the third law. At fixed $T$, $(\partial S/\partial V)_T = \tfrac43aT^3$, and the Maxwell relation $(\partial S/\partial V)_T = (\partial P/\partial T)_V = \tfrac43aT^3$ agrees.

In a reversible adiabatic process $S$ is constant, so $VT^3$ is constant, that is $T \propto V^{-1/3}$. If every length in the universe grows in proportion to a scale factor $a(t)$, then $V \propto a^3$ and $T \propto 1/a$. The background radiation was at about $3000\,\mathrm{K}$ when it decoupled from matter; it is now at $2.725\,\mathrm{K}$, so the universe has expanded by a factor of about $1100$ since then. Each photon's wavelength has been stretched by the same factor, which is the same statement in terms of photons: a black-body spectrum stays black-body under uniform expansion, with $\lambda_{\max}T$ fixed.
:::
:::
