The Sun has shone with nearly its present brightness for more than four billion years. It is a ball of hot gas, held together by its own gravity and held up by the pressure of that gas. If the pressure were switched off, it would collapse in about half an hour. If gravity were switched off, it would fly apart in about the same time. That it does neither, for billions of years, is the first fact of stellar structure: a star is in **hydrostatic equilibrium**, with pressure balancing gravity at every radius.

Equilibrium alone says a remarkable amount. Combined with the ideal-gas law it gives the temperature at the centre of the Sun to within a factor of two, without any knowledge of nuclear physics. The virial theorem, which follows from it, explains why a star that loses energy heats up, why gravitational contraction could power the Sun for only tens of millions of years, and why something else, nuclear fusion, must be at work. When the fuel runs out, the remnant has to be held up by something other than thermal pressure: the degeneracy pressure of electrons in a white dwarf, of neutrons in a neutron star. Each has a maximum mass, and above the second there is nothing left to stop collapse to a black hole.

This chapter develops the Newtonian theory, with the relativistic correction stated for neutron stars. You need Newtonian gravity and the shell theorem from [[mechanics/gravitation]], the ideal gas from [[thermodynamics/kinetic-theory]], fusion and the pp chain from [[particles/reactions]], and the degenerate Fermi gas from [[statistical-mechanics/bose-fermi]], which we use rather than rederive. Solar values are the IAU nominal ones: $M_\odot = 1.988\times 10^{30}\,\mathrm{kg}$, $R_\odot = 6.957\times 10^{8}\,\mathrm{m}$, $L_\odot = 3.828\times 10^{26}\,\mathrm{W}$.

## Hydrostatic equilibrium {#hydrostatic}

Model a star as spherically symmetric and static. Let $\rho(r)$ be the density, $P(r)$ the pressure and $m(r)$ the mass inside radius $r$.

::: theorem Equations of hydrostatic equilibrium {#thm-hydrostatic}
In a static, spherically symmetric, self-gravitating fluid,

$$
\deriv{m}{r} = 4\pi r^2\rho(r), \qquad \deriv{P}{r} = -\frac{G\,m(r)\,\rho(r)}{r^2}.
$$ {#eq-hydrostatic}
:::

::: proof
The first equation says that a shell of radius $r$ and thickness $\dd r$ has volume $4\pi r^2\dd r$ and mass $\dd m = 4\pi r^2\rho\,\dd r$.

For the second, consider a small element of the shell: a slab of cross-sectional area $A$ between $r$ and $r + \dd r$, with mass $\rho A\,\dd r$. By the shell theorem of [[mechanics/gravitation]], only the mass $m(r)$ inside radius $r$ pulls on it, and it pulls as if concentrated at the centre, with force $G\,m(r)\,\rho A\,\dd r/r^2$ inwards. The surrounding fluid pushes on the slab's inner face with force $P(r)A$ outwards and on its outer face with $P(r + \dd r)A$ inwards. In equilibrium the net force is zero:

$$
P(r)A - P(r + \dd r)A - \frac{G\,m(r)\,\rho A\,\dd r}{r^2} = 0.
$$

Dividing by $A\,\dd r$ and letting $\dd r \to 0$ gives the second equation. The pressure forces on the sides of the slab cancel by symmetry. For a fluid at rest this is the same balance as in [[mechanics/fluids]], with $g$ replaced by the local $Gm(r)/r^2$.
:::

Pressure must decrease outwards, and it must fall to (essentially) zero at the surface $r = R$, where $m = M$. Two equations for three unknown functions $\rho$, $P$ and $m$ are not enough. A third relation, the **equation of state** connecting $P$ to $\rho$ and temperature, together with equations for the flow of energy, closes the system. But even without them, [[#eq-hydrostatic]] gives estimates.

::: example How high is the pressure at the centre of the Sun? {#ex-pressure}
Estimate the central pressure of the Sun by replacing $\dd P/\dd r$ by $-P_c/R$ and $m$ and $\rho$ by typical values $M/2$ and the mean density $\bar\rho$. Then use the ideal-gas law, with mean particle mass $\mu m_H$, $\mu = 0.6$, to estimate the central temperature.
::: solution
The mean density is

$$
\bar\rho = \frac{M_\odot}{\tfrac43\pi R_\odot^3} = \frac{1.988\times 10^{30}}{1.410\times 10^{27}}\,\mathrm{kg/m^3} = 1.41\times 10^{3}\,\mathrm{kg/m^3},
$$

a little more than water. With the crude replacements,

$$
\frac{P_c}{R_\odot} \approx \frac{G(M_\odot/2)\bar\rho}{(R_\odot/2)^2}, \qquad P_c \approx \frac{2GM_\odot\bar\rho}{R_\odot} = \frac{2\times 1.327\times 10^{20}\times 1.41\times 10^{3}}{6.957\times 10^{8}}\,\mathrm{Pa} = 5.4\times 10^{14}\,\mathrm{Pa}.
$$

The detailed Standard Solar Model gives $2.5\times 10^{16}\,\mathrm{Pa}$: our estimate is low because the Sun is strongly centrally concentrated, with central density about $1.5\times 10^{5}\,\mathrm{kg/m^3}$, a hundred times the mean. An estimate that does not depend on such details is the rigorous lower bound $P_c > GM^2/(8\pi R^4) = 4.5\times 10^{13}\,\mathrm{Pa}$, proved in the exercises.

For the temperature, the ideal gas has $P = \rho k_BT/(\mu m_H)$, with $\mu$ the mean mass per particle in units of the hydrogen mass; $\mu \approx 0.6$ for fully ionised gas of solar composition. Using the same crude estimate, with $P_c \sim GM\bar\rho/R$ and $\rho \sim \bar\rho$,

$$
k_BT_c \sim \frac{GM_\odot\,\mu m_H}{R_\odot}, \qquad T_c \sim \frac{1.327\times 10^{20}\times 0.6\times 1.674\times 10^{-27}}{1.381\times 10^{-23}\times 6.957\times 10^{8}}\,\mathrm{K} = 1.4\times 10^{7}\,\mathrm{K}.
$$

The Standard Solar Model gives $1.57\times 10^{7}\,\mathrm{K}$. The agreement is partly luck, since errors in $P_c$ and $\rho_c$ cancel, but the scaling $k_BT_c \sim GM\mu m_H/R$ is robust: the thermal energy per particle at the centre is comparable to the gravitational binding energy per particle. At $1.4\times 10^{7}\,\mathrm{K}$, $k_BT = 1.2\,\mathrm{keV}$, enough to sustain the pp chain by quantum tunnelling, as [[particles/reactions]] explains.
:::
:::

## The virial theorem {#virial}

Hydrostatic equilibrium has a global consequence that relates the total thermal energy of a star to its gravitational energy.

::: definition Gravitational and thermal energy {#def-energies}
The **gravitational potential energy** of a spherical star is

$$
U = -\int_0^M\frac{G\,m}{r}\,\dd m,
$$

the work needed to assemble it shell by shell from infinity. For a star made of an ideal monatomic gas, the **thermal (kinetic) energy** is $K = \int\tfrac32 P\,\dd V$, since the kinetic energy density of such a gas is $\tfrac32 P$.
:::

For a uniform sphere, $m = M r^3/R^3$ and $\dd m = 3Mr^2\,\dd r/R^3$, so

$$
U = -\int_0^R\frac{G M r^3/R^3}{r}\,\frac{3Mr^2}{R^3}\,\dd r = -\frac{3GM^2}{R^6}\int_0^R r^4\,\dd r = -\frac{3}{5}\,\frac{GM^2}{R}.
$$ {#eq-uniform-u}

Real stars are centrally concentrated, so their $U$ is more negative; for the Sun it is about $-1.5\,GM^2/R$ (and $-\tfrac{3}{5-n}GM^2/R$ for a polytrope of index $n$).

::: theorem Virial theorem for a star {#thm-virial}
For a star in hydrostatic equilibrium with zero pressure at its surface,

$$
3\int P\,\dd V + U = 0.
$$

If the star is an ideal monatomic gas, then $2K + U = 0$, and its total energy is

$$
E = K + U = \tfrac12 U = -K.
$$ {#eq-virial}
:::

::: proof
Multiply the second equation of [[#eq-hydrostatic]] by $4\pi r^3$ and integrate from the centre to the surface:

$$
\int_0^R 4\pi r^3\,\deriv{P}{r}\,\dd r = -\int_0^R\frac{G\,m}{r}\,4\pi r^2\rho\,\dd r = -\int_0^M\frac{G\,m}{r}\,\dd m = U,
$$

using $\dd m = 4\pi r^2\rho\,\dd r$. Integrate the left-hand side by parts:

$$
\int_0^R 4\pi r^3\,\deriv{P}{r}\,\dd r = \Bigl[4\pi r^3P\Bigr]_0^R - \int_0^R 12\pi r^2P\,\dd r = 0 - 3\int P\,\dd V,
$$

since the boundary term vanishes at $r = 0$ because of $r^3$ and at $r = R$ because $P(R) = 0$, and $\dd V = 4\pi r^2\dd r$. Hence $-3\int P\,\dd V = U$, which is the first statement. For an ideal monatomic gas, $\int P\,\dd V = \tfrac23 K$ by [[#def-energies]], so $2K + U = 0$. Then $E = K + U = -\tfrac12U + U = \tfrac12U$, and also $E = -K$.
:::

The result is surprising. A star's total energy is negative, and equals minus its thermal energy. If the star radiates energy, $E$ decreases, so $K = -E$ *increases*: the star heats up as it loses energy. Half of the gravitational energy released by contraction goes into heating the gas, and the other half is radiated. A self-gravitating gas has a negative heat capacity. This is what allows a contracting protostar to heat itself until fusion ignites, and what makes a star with a nuclear energy source stable: if it produces too much energy, it expands and cools, and the reaction rate drops.

::: example The mean temperature of the Sun {#ex-mean-temperature}
Treat the Sun as a uniform sphere of ionised gas with $\mu = 0.6$. Use the virial theorem to find its mean temperature.
::: solution
The number of particles is $N = M/(\mu m_H)$, and the thermal energy is $K = \tfrac32 Nk_B\bar T$. The virial theorem with [[#eq-uniform-u]] gives

$$
2\times\frac32\,\frac{M}{\mu m_H}\,k_B\bar T = \frac35\,\frac{GM^2}{R}, \qquad \bar T = \frac{GM\mu m_H}{5k_BR}.
$$

Numerically,

$$
\bar T = \frac{1.327\times 10^{20}\times 0.6\times 1.674\times 10^{-27}}{5\times 1.381\times 10^{-23}\times 6.957\times 10^{8}}\,\mathrm{K} = 2.8\times 10^{6}\,\mathrm{K}.
$$

This is a mass-weighted average; the surface is at $5772\,\mathrm{K}$ and the centre at $1.6\times 10^{7}\,\mathrm{K}$. Any gas held together by its own gravity has $k_B\bar T$ of order $GM\mu m_H/R$. The same estimate gives the temperatures of the hot gas in galaxy clusters, $10^{7}$–$10^{8}\,\mathrm{K}$, which is why clusters glow in X-rays.
:::
:::

### Two time scales

::: definition Kelvin–Helmholtz and nuclear time scales {#def-timescales}
The **Kelvin–Helmholtz time** is the time a star of luminosity $L$ could shine on the energy released by gravitational contraction,

$$
t_{\mathrm{KH}} = \frac{\lvert E\rvert}{L} \approx \frac{GM^2}{2RL}.
$$

The **nuclear time** is the time it could shine by fusing a fraction $f$ of its mass, releasing a fraction $\epsilon$ of the rest energy of the fuel,

$$
t_{\mathrm{nuc}} = \frac{\epsilon f Mc^2}{L}.
$$

For hydrogen burning to helium, $\epsilon = 0.007$, and on the main sequence $f \approx 0.1$ of the hydrogen, the core, is burned.
:::

For the Sun,

$$
t_{\mathrm{KH}} = \frac{1.327\times 10^{20}\times 1.988\times 10^{30}}{2\times 6.957\times 10^{8}\times 3.828\times 10^{26}}\,\mathrm{s} = 4.95\times 10^{14}\,\mathrm{s} = 1.6\times 10^{7}\ \text{years},
$$

where we used $\lvert E\rvert = \tfrac12\lvert U\rvert$ with $\lvert U\rvert \approx GM^2/R$. In the 1850s and 1860s Hermann von Helmholtz and William Thomson (later Lord Kelvin) proposed contraction as the Sun's energy source and concluded that the Sun could be at most a few tens of millions of years old. Geologists and Darwin needed hundreds of millions. The geologists were right: radioactive dating gives the solar system an age of $4.57\times 10^{9}$ years, and contraction cannot be the answer. The nuclear time is

$$
t_{\mathrm{nuc}} = \frac{0.007\times 0.1\times 1.988\times 10^{30}\times(2.998\times 10^{8})^2}{3.828\times 10^{26}}\,\mathrm{s} = 3.27\times 10^{17}\,\mathrm{s} = 1.0\times 10^{10}\ \text{years},
$$

ample. The Sun is about halfway through its main-sequence life.

::: warning The virial theorem does not say a star is in thermal equilibrium
The virial theorem relates the total thermal energy to the gravitational energy of a star in *mechanical* equilibrium. It does not say the star has a uniform temperature, and it does not say the star is in thermodynamic equilibrium with its surroundings: a star is hot inside and cold outside, and pours energy into space. Nor does the theorem hold during rapid collapse, when the acceleration terms neglected in [[#eq-hydrostatic]] matter. Mechanical equilibrium is re-established on the dynamical time, about half an hour for the Sun, far shorter than either $t_{\mathrm{KH}}$ or $t_{\mathrm{nuc}}$, which is why the virial theorem applies so widely.
:::

::: example The dynamical time of the Sun {#ex-free-fall}
If the Sun's pressure suddenly vanished, how long would it take to collapse? Model this as the free fall of a uniform, pressureless sphere of the Sun's mean density, whose collapse time is $t_{\mathrm{ff}} = \sqrt{3\pi/(32G\bar\rho)}$.
::: solution
The formula comes from treating the outermost shell as a body falling radially from rest at $R$ towards a point mass $M$: that is a degenerate Kepler ellipse of semi-major axis $R/2$, and the fall takes half its period, $\tfrac12\cdot 2\pi\sqrt{(R/2)^3/(GM)} = \pi\sqrt{R^3/(8GM)}$. Writing $M = \tfrac43\pi R^3\bar\rho$ gives $\sqrt{3\pi/(32G\bar\rho)}$. Every shell inside takes the same time, because each encloses the same mean density. With $\bar\rho = 1.41\times 10^{3}\,\mathrm{kg/m^3}$,

$$
t_{\mathrm{ff}} = \sqrt{\frac{3\pi}{32\times 6.674\times 10^{-11}\times 1.41\times 10^{3}}}\,\mathrm{s} = \sqrt{3.13\times 10^{6}}\,\mathrm{s} = 1.77\times 10^{3}\,\mathrm{s},
$$

about $30$ minutes. Sound waves cross the Sun in a similar time, which is no coincidence: in equilibrium the sound speed $\sim\sqrt{P/\rho}$ is comparable to the escape speed. The Sun can respond to any mechanical imbalance within an hour, while its thermal and nuclear time scales are $10^{7}$ and $10^{10}$ years. That separation is why hydrostatic equilibrium is such a good approximation.
:::
:::

::: quiz
A star contracts slowly while radiating, staying close to hydrostatic equilibrium, and has not yet ignited fusion. Which statement is correct?
- [ ] Its interior cools, because it is losing energy.
- [x] Its interior heats up; half of the gravitational energy released is radiated and half heats the gas.
- [ ] All of the gravitational energy released is radiated, so the temperature is unchanged.
- [ ] Its total energy increases, because the gravitational energy is released.
::: solution
By [[#thm-virial]], $E = \tfrac12U$ and $K = -\tfrac12U$. Contraction makes $U$ more negative by some amount $\Delta U < 0$. Then $\Delta K = -\tfrac12\Delta U > 0$, so the gas heats, while $\Delta E = \tfrac12\Delta U < 0$ is the energy radiated. Losing energy and heating up go together for a self-gravitating gas. This is how a protostar's core reaches the ten million kelvin needed for hydrogen fusion.
:::
:::

## Energy transport and the mass–luminosity relation {#luminosity}

Energy generated in the core must get out. In the Sun's inner $70\%$ by radius it diffuses outwards as radiation, by a random walk of photons absorbed and re-emitted countless times; in the outer layers it is carried by convection. For radiative diffusion, the energy flux is proportional to the gradient of the radiation energy density $aT^4$, where $a = 4\sigma/c$ is the radiation constant, and inversely proportional to the opacity $\kappa$, the cross-section per unit mass:

$$
L(r) = -\frac{16\pi acr^2T^3}{3\kappa\rho}\,\deriv{T}{r}.
$$ {#eq-radiative}

We quote this; it is the diffusion equation of [[thermodynamics/kinetic-theory]] applied to a photon gas whose mean free path is $1/(\kappa\rho)$. With the hydrostatic equations, an equation of state, an energy-generation rate and [[#eq-radiative]], the structure of a star is a boundary-value problem solved numerically. But the scaling can be read off.

::: proposition Mass–luminosity scaling {#prop-mass-luminosity}
For stars of similar structure, supported by ideal-gas pressure, with energy carried by radiative diffusion and constant opacity, the luminosity scales as

$$
L \propto \frac{\mu^4M^3}{\kappa},
$$

independently of the radius and of how the energy is generated.
:::

::: proof
For stars of similar structure, every quantity at a corresponding point scales with its characteristic value: $\rho \propto M/R^3$, and by [[#ex-pressure]] $T \propto \mu M/R$. In [[#eq-radiative]] replace $\dd T/\dd r$ by $T/R$, $r$ by $R$, and $\rho$ by $M/R^3$:

$$
L \propto \frac{R^2T^3}{\kappa M/R^3}\cdot\frac{T}{R} = \frac{R^4T^4}{\kappa M} \propto \frac{R^4}{\kappa M}\Bigl(\frac{\mu M}{R}\Bigr)^4 = \frac{\mu^4M^3}{\kappa}.
$$

The radius cancels. The energy source does not appear: it determines the radius (the star adjusts its size until the core is hot enough to generate exactly $L$), but not $L$ itself.
:::

Observed main-sequence stars between about $1$ and $20\,M_\odot$ follow $L \propto M^{3.5}$ roughly; the steeper exponent comes mainly from the decrease of opacity with temperature. The main-sequence lifetime is then

$$
t_{\mathrm{MS}} \propto \frac{M}{L} \propto M^{-2.5}, \qquad t_{\mathrm{MS}} \approx 10^{10}\ \text{years}\times\Bigl(\frac{M}{M_\odot}\Bigr)^{-2.5}.
$$ {#eq-lifetime}

Massive stars have more fuel, but burn it so much faster that they die young.

::: widget plot
f: 10*x^(-2.5)
x: 0.5, 10
y: 0, 60
labels: main-sequence lifetime (billions of years)
caption: Main-sequence lifetime, in billions of years, against stellar mass in solar masses, from $t \approx 10\,\mathrm{Gyr}\times(M/M_\odot)^{-2.5}$. At $x = 1$ the Sun's ten billion years. Move to $x = 0.8$: $17.5\,\mathrm{Gyr}$, longer than the age of the universe, so no star of $0.8\,M_\odot$ or less has yet left the main sequence. Move to $x = 10$: about $30$ million years, short enough that the brightest stars in a galaxy trace where stars formed recently.
:::

::: example Ages of star clusters {#ex-cluster}
In a star cluster all stars formed at about the same time. In one cluster, stars of $2.0\,M_\odot$ are just leaving the main sequence. Estimate the cluster's age.
::: solution
The most massive stars still on the main sequence have lifetimes equal to the cluster's age. From [[#eq-lifetime]],

$$
t \approx 10^{10}\times 2.0^{-2.5}\ \text{years} = 10^{10}\times 0.177\ \text{years} = 1.8\times 10^{9}\ \text{years}.
$$

This "turn-off" method dates clusters. The oldest globular clusters have turn-off masses near $0.8\,M_\odot$ and ages of $12$ to $13$ billion years, which [[gravitation/cosmology]] compares with the age of the universe.
:::
:::

::: application The Eddington limit
Radiation carries momentum as well as energy. Photons streaming out of a star push on its electrons, through Thomson scattering with cross-section $\sigma_T = 6.652\times 10^{-29}\,\mathrm{m^2}$, and the electrons drag the protons with them electrostatically. The outward force on each proton–electron pair at distance $r$ is $L\sigma_T/(4\pi r^2c)$; the inward gravitational force is $GMm_p/r^2$. Both fall as $1/r^2$, so the radiation wins everywhere if $L$ exceeds the **Eddington luminosity**

$$
L_{\mathrm{Edd}} = \frac{4\pi GMm_pc}{\sigma_T} = 1.26\times 10^{31}\,\mathrm{W}\times\frac{M}{M_\odot} = 3.3\times 10^{4}\,L_\odot\times\frac{M}{M_\odot}.
$$

Since main-sequence luminosity grows as $M^{3.5}$ and $L_{\mathrm{Edd}}$ only as $M$, sufficiently massive stars approach the limit and drive off their outer layers in strong winds. The same limit caps the rate at which a black hole can accrete steadily; the brightest quasars shine near the Eddington luminosity of black holes of $10^{9}\,M_\odot$.
:::

## White dwarfs and the Chandrasekhar limit {#white-dwarfs}

When a star like the Sun has burned its core hydrogen to helium, and then helium to carbon and oxygen, it sheds its outer layers and leaves a hot core of about $0.6\,M_\odot$, no longer generating energy. As it cools, its thermal pressure would fall and it would contract, without limit by the virial theorem, if nothing else held it up. What does hold it up is quantum mechanics. The electrons are squeezed so close together that the Pauli exclusion principle forces most of them into states of high momentum, even at zero temperature. This **degeneracy pressure** was derived in [[statistical-mechanics/bose-fermi]], where it was applied to Sirius B. We need two results from there.

- For non-relativistic electrons at number density $n_e$, the degeneracy pressure is $P = K_1 n_e^{5/3}$ with $K_1 = (3\pi^2)^{2/3}\hbar^2/(5m_e)$.
- When the Fermi momentum $\hbar(3\pi^2n_e)^{1/3}$ exceeds $m_ec$, the electrons become relativistic, and in the extreme limit $P = K_2 n_e^{4/3}$ with $K_2 = (3\pi^2)^{1/3}\hbar c/4$.

The pressure does not depend on temperature. A white dwarf can cool to absolute zero and keep its size. The mass is carried by nuclei, with $\mu_e$ nucleon masses per electron; $\mu_e = 2$ for helium, carbon or oxygen.

::: proposition Landau's argument for a maximum mass {#prop-landau}
Consider a star of mass $M$ and radius $R$ supported by the degeneracy pressure of $N = M/(\mu_em_H)$ electrons. If the electrons are ultra-relativistic, both the Fermi energy per electron and the gravitational energy per electron scale as $1/R$, and the star has a stable equilibrium only if $M$ is below a critical mass of order

$$
M_{\mathrm{crit}} \sim \frac{1}{(\mu_em_H)^2}\Bigl(\frac{\hbar c}{G}\Bigr)^{3/2} = \frac{1.85\,M_\odot}{\mu_e^2}.
$$
:::

::: proof
The electron number density is $n_e \sim N/R^3$, so the Fermi momentum is $p_F \sim \hbar n_e^{1/3} \sim \hbar N^{1/3}/R$. For ultra-relativistic electrons the energy per electron is $E_F \sim p_Fc \sim \hbar cN^{1/3}/R$. The gravitational energy per electron is $-GM\mu_em_H/R$ in order of magnitude, since each electron is tied to a mass $\mu_em_H$ of nuclei. The energy per electron is

$$
\varepsilon(R) \sim \frac{\hbar cN^{1/3} - GM\mu_em_H}{R} = \frac{\hbar cN^{1/3} - GN(\mu_em_H)^2}{R}.
$$

If the numerator is positive, $\varepsilon$ decreases as $R$ increases: the star expands until the electrons cease to be ultra-relativistic, when $E_F \sim p_F^2/(2m_e)$ grows only as $1/R^2$ at small $R$ and a stable minimum of $\varepsilon$ appears. That is an ordinary white dwarf. If the numerator is negative, $\varepsilon$ decreases without limit as $R \to 0$: nothing stops the collapse. The boundary is $\hbar cN^{1/3} = GN(\mu_em_H)^2$, that is $N^{2/3} = \hbar c/(G\mu_e^2m_H^2)$, or

$$
N_{\mathrm{crit}} = \Bigl(\frac{\hbar c}{G}\Bigr)^{3/2}\frac{1}{(\mu_em_H)^3}, \qquad M_{\mathrm{crit}} = N_{\mathrm{crit}}\,\mu_em_H = \Bigl(\frac{\hbar c}{G}\Bigr)^{3/2}\frac{1}{(\mu_em_H)^2}.
$$

With $\hbar c/G = 4.737\times 10^{-16}\,\mathrm{kg^2}$, $(\hbar c/G)^{3/2} = 1.031\times 10^{-23}\,\mathrm{kg^3}$, and dividing by $m_H^2 = 2.801\times 10^{-54}\,\mathrm{kg^2}$ gives $3.68\times 10^{30}\,\mathrm{kg} = 1.85\,M_\odot$. The numerical factors dropped in the order-of-magnitude steps are of order one.
:::

The exact calculation, by Subrahmanyan Chandrasekhar in 1931, solves the hydrostatic equations with the full degenerate equation of state that interpolates between $n^{5/3}$ and $n^{4/3}$. It gives the **Chandrasekhar limit**

$$
M_{\mathrm{Ch}} = \frac{5.83}{\mu_e^2}\,M_\odot,
$$ {#eq-chandrasekhar}

which is $1.46\,M_\odot$ for $\mu_e = 2$. Electrostatic corrections and the onset of inverse beta decay, in which electrons are captured by nuclei at very high density, lower it slightly, to about $1.4\,M_\odot$. Every white dwarf whose mass has been measured lies below it.

::: widget plot
f: 0.0112*(x/1.456)^(-1/3)*sqrt(1 - (x/1.456)^(4/3))*695700
x: 0.1, 1.456
y: 0, 25000
labels: white-dwarf radius (km)
caption: Radius in kilometres against mass in solar masses for a cold carbon–oxygen white dwarf, from Nauenberg's (1972) fit to Chandrasekhar's solutions. Unlike ordinary stars, white dwarfs get *smaller* as they get heavier: at low mass $R \propto M^{-1/3}$, the non-relativistic degenerate result. Move to $x = 0.6$, the typical white dwarf: about $8700\,\mathrm{km}$, larger than the Earth. Move to $x = 1.0$: about $5600\,\mathrm{km}$, close to Sirius B. As $x$ approaches $1.456$ the radius falls to zero: the electrons become relativistic and their pressure can no longer keep pace with gravity.
:::

::: quiz
A white dwarf of $0.6\,M_\odot$ accretes matter from a companion and grows to $1.0\,M_\odot$, while staying cold. What happens to its radius?
- [ ] It grows, roughly as $M^{1/3}$, like a ball of ordinary matter of fixed density.
- [x] It shrinks, roughly as $M^{-1/3}$ at first and faster as the mass approaches the Chandrasekhar limit.
- [ ] It stays the same, because degeneracy pressure is independent of mass.
- [ ] It shrinks to zero immediately, because $1.0\,M_\odot$ exceeds the limit.
::: solution
A more massive white dwarf has stronger gravity, which must be balanced by a higher degeneracy pressure, which requires a higher electron density, so the star is smaller. For non-relativistic degeneracy, balancing $P \propto n^{5/3} \propto M^{5/3}/R^5$ against $GM^2/R^4$ gives $R \propto M^{-1/3}$; the figure shows the radius falling from about $8700$ to about $5600\,\mathrm{km}$. $1.0\,M_\odot$ is below the limit of about $1.4\,M_\odot$, so the star survives.
:::
:::

A white dwarf that accretes matter from a companion and approaches the Chandrasekhar limit ignites carbon fusion in a runaway explosion, a Type Ia supernova, which destroys it. Because they explode at nearly the same mass, Type Ia supernovae have nearly the same peak luminosity, and they are the standard candles that revealed the accelerating expansion of the universe in [[gravitation/cosmology]].

## Neutron stars {#neutron-stars}

A massive star, above about $8\,M_\odot$, burns its way to an iron core. Iron has the highest binding energy per nucleon, as [[particles/nuclear-structure]] shows, so no further fusion releases energy. When the iron core exceeds the Chandrasekhar mass, about $1.2$–$1.4\,M_\odot$ for $\mu_e \approx 2.15$, it collapses in less than a second. Electrons are captured by protons, $p + e^- \to n + \nu_e$, and the core becomes a ball of neutrons about $12\,\mathrm{km}$ across, at the density of an atomic nucleus. The infalling outer layers rebound and are blown off in a core-collapse supernova, powered mainly by the neutrinos carrying away the gravitational binding energy, a few times $10^{46}\,\mathrm{J}$. The remnant is a **neutron star**.

::: example A teaspoon of neutron star {#ex-neutron-density}
A neutron star has mass $1.40\,M_\odot$ and radius $12.0\,\mathrm{km}$. Find its mean density, the Newtonian surface gravity, and the ratio of its escape speed to $c$.
::: solution
The mean density is

$$
\bar\rho = \frac{1.40\times 1.988\times 10^{30}}{\tfrac43\pi(1.20\times 10^{4})^3}\,\mathrm{kg/m^3} = \frac{2.783\times 10^{30}}{7.238\times 10^{12}}\,\mathrm{kg/m^3} = 3.8\times 10^{17}\,\mathrm{kg/m^3},
$$

about one and a half times the density of nuclear matter, $2.7\times 10^{17}\,\mathrm{kg/m^3}$. A teaspoon of $5\,\mathrm{cm^3}$ would have a mass of $2\times 10^{12}\,\mathrm{kg}$, more than a mountain. The surface gravity is

$$
g = \frac{GM}{R^2} = \frac{1.40\times 1.327\times 10^{20}}{(1.20\times 10^{4})^2}\,\mathrm{m/s^2} = 1.3\times 10^{12}\,\mathrm{m/s^2},
$$

and the escape speed is $\sqrt{2GM/R} = c\sqrt{r_s/R} = c\sqrt{0.345} = 0.59\,c$. Newtonian gravity is no longer adequate: $r_s/R = 0.345$, the same number that gave a surface redshift of $0.235$ in [[gravitation/schwarzschild]].
:::
:::

With $r_s/R$ of order one-third, the structure of a neutron star must be computed in general relativity. For a static, spherical, perfect fluid, Einstein's equations replace the second equation of [[#eq-hydrostatic]] by the **Tolman–Oppenheimer–Volkoff (TOV) equation**,

$$
\deriv{P}{r} = -\frac{G\bigl(\rho + P/c^2\bigr)\bigl(m + 4\pi r^3P/c^2\bigr)}{r^2\bigl(1 - 2Gm/(c^2r)\bigr)},
$$ {#eq-tov}

where $\rho c^2$ is now the total energy density and $m(r)$ includes all of it. We quote the equation; it is derived in Hartle, ch. 24, and Schutz, ch. 10. Each of the three correction factors is greater than one: pressure gravitates, the pressure term increases the effective mass, and the geometry factor $1/(1 - r_s/r)$ strengthens gravity near $r_s$. Pressure, which supports the star, also adds to the gravity that must be supported. Beyond some mass, raising the central pressure makes things worse, and no stable configuration exists.

Oppenheimer and Volkoff found in 1939 that a star made of a free neutron gas has a maximum mass of only $0.7\,M_\odot$. Nuclear forces stiffen the equation of state at high density and raise the limit; its true value depends on poorly known nuclear physics at several times nuclear density. Observation sets a floor: the pulsar PSR J0740+6620 has a mass of $2.08 \pm 0.07\,M_\odot$, measured from the Shapiro delay of its pulses as they pass its white-dwarf companion. Theory sets a ceiling of about $3\,M_\odot$ for any equation of state consistent with causality. The present estimates, combining pulsar masses, the X-ray measurements of neutron-star radii by NASA's NICER instrument (about $12$–$13\,\mathrm{km}$), and the tidal deformation measured in GW170817, place the maximum mass of a non-rotating neutron star near $2.2$–$2.3\,M_\odot$. A collapsing core heavier than that becomes a black hole, as described in [[gravitation/black-holes]].

::: remark Pulsars
Collapse conserves angular momentum and magnetic flux, so a core that shrinks from thousands of kilometres to $12\,\mathrm{km}$ spins up to periods of milliseconds to seconds, and its magnetic field is compressed to $10^{8}$ teslas. The rotating magnetic field beams radio waves along its axis, and if the beam sweeps across the Earth we see a **pulsar**. Jocelyn Bell Burnell, then a graduate student working with Antony Hewish, discovered the first in 1967. Pulsars are among the most stable clocks known, which made possible the tests of [[gravitation/gravitational-waves]] and the pulsar timing arrays.
:::

::: history Eddington, Chandrasekhar and the end of stars
Hermann von Helmholtz in 1854 and William Thomson in 1862 estimated the Sun's age from gravitational contraction. Arthur Eddington's *The Internal Constitution of the Stars* (1926) set out the theory of radiative equilibrium and argued that subatomic energy powers the Sun; Hans Bethe identified the fusion reactions in 1939, and won the 1967 Nobel Prize for it. Ralph Fowler showed in 1926 that white dwarfs are supported by electron degeneracy pressure, using the new Fermi–Dirac statistics. In 1930, on his voyage from India to England, Subrahmanyan Chandrasekhar realised that relativistic electrons give a limiting mass, published in 1931. Eddington ridiculed the result in 1935; Chandrasekhar's limit stood, and he shared the 1983 Nobel Prize. Lev Landau gave the energy argument in 1932.

Walter Baade and Fritz Zwicky proposed in 1934 that supernovae form neutron stars, two years after James Chadwick discovered the neutron. J. Robert Oppenheimer and George Volkoff, using an equation also derived by Richard Tolman, computed the first neutron-star models in 1939. Jocelyn Bell Burnell and Antony Hewish found pulsars in 1967, and Hewish shared the 1974 Nobel Prize.
:::

## Where this leads {#leads}

The equations of this chapter, completed by detailed opacities, nuclear reaction rates and convection, are solved numerically in stellar-evolution codes that follow a star from its birth to its end. The pp chain and CNO cycle that set $t_{\mathrm{nuc}}$ are in [[particles/reactions]]. The neutrinos from the Sun's core confirm directly that the core burns hydrogen at the predicted temperature. The black holes formed when cores exceed the neutron-star limit are those of [[gravitation/black-holes]], and the neutron-star mergers seen in [[gravitation/gravitational-waves]] measure the neutron-star equation of state. Type Ia supernovae, exploding near the Chandrasekhar mass, are the standard candles of [[gravitation/cosmology]].

::: summary
- A static star obeys $\dd m/\dd r = 4\pi r^2\rho$ and $\dd P/\dd r = -Gm\rho/r^2$; an equation of state and energy transport complete the system.
- Order-of-magnitude balance gives $k_BT_c \sim GM\mu m_H/R \approx 10^{7}\,\mathrm{K}$ for the Sun, hot enough for fusion.
- The virial theorem, $2K + U = 0$ for an ideal monatomic gas, gives $E = U/2 = -K$: a self-gravitating star heats up as it loses energy.
- Contraction could power the Sun for $t_{\mathrm{KH}} \approx 1.6\times 10^{7}$ years; hydrogen fusion powers it for $t_{\mathrm{nuc}} \approx 10^{10}$ years.
- Radiative diffusion gives $L \propto \mu^4M^3/\kappa$; observed main-sequence stars have $L \propto M^{3.5}$ and lifetimes $\propto M^{-2.5}$.
- White dwarfs are held up by electron degeneracy pressure, shrink as their mass increases, and cannot exceed the Chandrasekhar limit $5.83\,M_\odot/\mu_e^2 \approx 1.4\,M_\odot$.
- Neutron stars, of about $1.4\,M_\odot$ and $12\,\mathrm{km}$, need general relativity (the TOV equation); their maximum mass is between the observed $2.08\,M_\odot$ and about $2.3\,M_\odot$. Heavier cores collapse to black holes.
:::

## Exercises {#exercises}

::: exercise The Sun's nuclear lifetime {level=1 check="10.4"}
Evaluate $t_{\mathrm{nuc}}$ for the Sun with $\epsilon = 0.007$ and $f = 0.10$, in billions of years ($1\ \text{year} = 3.156\times 10^{7}\,\mathrm{s}$).
::: solution
$$
t_{\mathrm{nuc}} = \frac{0.007\times 0.10\times 1.988\times 10^{30}\times 8.988\times 10^{16}}{3.828\times 10^{26}}\,\mathrm{s} = \frac{1.2508\times 10^{44}}{3.828\times 10^{26}}\,\mathrm{s} = 3.268\times 10^{17}\,\mathrm{s}.
$$

Dividing by $3.156\times 10^{7}\,\mathrm{s}$ gives $1.04\times 10^{10}$ years, that is $10.4$ billion years.
:::
:::

::: exercise A five-solar-mass star {level=1 check="179"}
Using [[#eq-lifetime]], estimate the main-sequence lifetime of a $5.0\,M_\odot$ star, in millions of years.
::: solution
$$
t \approx 10^{10}\times 5.0^{-2.5}\ \text{years} = 10^{10}\times 0.01789\ \text{years} = 1.79\times 10^{8}\ \text{years} = 179\ \text{million years}.
$$

Such a star is about $5^{3.5} = 280$ times as luminous as the Sun.
:::
:::

::: exercise An iron core {level=1 check="1.26"}
An iron core has $\mu_e = 56/26$. Evaluate [[#eq-chandrasekhar]] for it, in solar masses.
::: solution
$\mu_e = 2.154$, so $\mu_e^2 = 4.639$ and

$$
M_{\mathrm{Ch}} = \frac{5.83}{4.639}\,M_\odot = 1.26\,M_\odot.
$$

Iron has slightly fewer electrons per nucleon than carbon, so its limit is lower. Thermal pressure and other corrections make the actual collapse mass of iron cores somewhat larger, about $1.3$–$1.5\,M_\odot$, consistent with the masses of neutron stars.
:::
:::

::: exercise The mean temperature of a red dwarf {level=2 check="2.08e6"}
A red dwarf has $M = 0.30\,M_\odot$ and $R = 0.40\,R_\odot$. Use the uniform-sphere virial estimate of [[#ex-mean-temperature]], with $\mu = 0.6$, to find its mean temperature in kelvin.
::: solution
The estimate $\bar T = GM\mu m_H/(5k_BR)$ is proportional to $M/R$. For the Sun it gave $2.77\times 10^{6}\,\mathrm{K}$ before rounding. Scaling,

$$
\bar T = 2.77\times 10^{6}\,\mathrm{K}\times\frac{0.30}{0.40} = 2.08\times 10^{6}\,\mathrm{K}.
$$

The central temperature is correspondingly lower than the Sun's, which is why red dwarfs burn hydrogen so slowly and live for trillions of years. (Low-mass stars are fully convective, so the radiative scaling $L \propto M^3$ does not apply to them; their observed luminosities fall even faster with mass.)
:::
:::

::: exercise The Sun's central pressure: a lower bound {level=2 check="4.48e13"}
Evaluate the lower bound $P_c > GM^2/(8\pi R^4)$ for the Sun, in pascals.
::: solution
$$
\frac{GM_\odot^2}{8\pi R_\odot^4} = \frac{1.327\times 10^{20}\times 1.988\times 10^{30}}{8\pi\times(6.957\times 10^{8})^4}\,\mathrm{Pa} = \frac{2.638\times 10^{50}}{25.13\times 2.342\times 10^{35}}\,\mathrm{Pa} = 4.48\times 10^{13}\,\mathrm{Pa}.
$$

That is about $4\times 10^{8}$ atmospheres. The true central pressure is about $500$ times larger, because the Sun is far more centrally concentrated than the bound assumes.
:::
:::

::: exercise Contraction of a white dwarf progenitor {level=2 check="2.04e-6"}
The core of a red giant, of mass $0.60\,M_\odot$, contracts from the size of the Earth, $6.4\times 10^{6}\,\mathrm{m}$, to $6.1\times 10^{6}\,\mathrm{m}$. Treat it as a uniform sphere obeying the virial theorem. What fraction of its rest energy $Mc^2$ is radiated during the contraction?
::: solution
By [[#eq-virial]], the energy radiated is $-\Delta E = -\tfrac12\Delta U$, with $U = -\tfrac35GM^2/R$:

$$
-\Delta E = \frac{3}{10}\,GM^2\Bigl(\frac{1}{R_2} - \frac{1}{R_1}\Bigr).
$$

Divide by $Mc^2$:

$$
\frac{-\Delta E}{Mc^2} = \frac{3}{10}\,\frac{GM}{c^2}\Bigl(\frac{1}{R_2} - \frac{1}{R_1}\Bigr) = 0.3\times 0.60\times 1476.6\,\mathrm{m}\times\Bigl(\frac{1}{6.1\times 10^{6}} - \frac{1}{6.4\times 10^{6}}\Bigr)\mathrm{m^{-1}}.
$$

The bracket is $(1.6393 - 1.5625)\times 10^{-7} = 7.68\times 10^{-9}$, and the prefactor is $265.8\,\mathrm{m}$, so the fraction is $2.04\times 10^{-6}$. An equal amount of energy goes into heating the core. Compared with the $0.007$ released per unit rest mass by hydrogen fusion, contraction at white-dwarf sizes is a modest energy source, but it is what heats a core to the hundred million kelvin needed to ignite helium.
:::
:::

::: exercise The Eddington limit of a massive star {level=2 check="6.6e5"}
Find the Eddington luminosity of a $20\,M_\odot$ star in units of $L_\odot$, and compare it with the luminosity $L \approx 20^{3.5}L_\odot$ suggested by the mass–luminosity relation.
::: solution
$L_{\mathrm{Edd}} = 3.28\times 10^{4}\,L_\odot\times 20 = 6.6\times 10^{5}\,L_\odot$. The mass–luminosity relation gives $20^{3.5} = 3.6\times 10^{4}\,L_\odot$, about $5\%$ of the limit. Real $20\,M_\odot$ stars have about $5\times 10^{4}\,L_\odot$. For $M$ in the hundreds of solar masses, $M^{3.5}$ would exceed $L_{\mathrm{Edd}}$, and the extrapolated relation fails: the most massive stars shine close to the Eddington limit, with $L \propto M$.
:::
:::

::: exercise A rigorous lower bound on the central pressure {level=3}
For a star in hydrostatic equilibrium with $\rho \ge 0$ and $P(R) = 0$, prove that $P_c > GM^2/(8\pi R^4)$.
::: hint
Show that the function $\Psi(r) = P(r) + Gm(r)^2/(8\pi r^4)$ is non-increasing.
:::
::: solution
Differentiate $\Psi$ using [[#eq-hydrostatic]]:

$$
\Psi'(r) = -\frac{Gm\rho}{r^2} + \frac{G}{8\pi}\Bigl(\frac{2m\,m'}{r^4} - \frac{4m^2}{r^5}\Bigr) = -\frac{Gm\rho}{r^2} + \frac{G}{8\pi}\cdot\frac{2m\cdot 4\pi r^2\rho}{r^4} - \frac{Gm^2}{2\pi r^5}.
$$

The first two terms cancel, leaving

$$
\Psi'(r) = -\frac{Gm^2}{2\pi r^5} \le 0,
$$

with strict inequality wherever $m > 0$. Hence $\Psi$ decreases from the centre to the surface. Near the centre, $m \approx \tfrac43\pi\rho_cr^3$, so $m^2/r^4 \approx \tfrac{16}{9}\pi^2\rho_c^2r^2 \to 0$ and $\Psi(0) = P_c$. At the surface, $\Psi(R) = 0 + GM^2/(8\pi R^4)$. Since $\Psi$ is strictly decreasing on any interval where $m > 0$,

$$
P_c = \Psi(0) > \Psi(R) = \frac{GM^2}{8\pi R^4}.
$$

The bound uses only hydrostatic equilibrium and positivity of the density, and holds for every star, whatever its equation of state or energy source.
:::
:::

::: exercise Why $\gamma = 4/3$ is fatal {level=3}
Suppose the pressure and internal energy density of a star's gas are related by $u = P/(\gamma - 1)$, with $\gamma$ constant, so that the internal energy is $K = \int u\,\dd V$. Prove that a star in hydrostatic equilibrium has total energy

$$
E = K + U = \frac{3\gamma - 4}{3(\gamma - 1)}\,U.
$$

Deduce that for $\gamma = 4/3$ the total energy is zero whatever the radius, and explain why this connects to the Chandrasekhar limit.
::: solution
The first part of [[#thm-virial]] used only hydrostatic equilibrium: $3\int P\,\dd V = -U$. With $P = (\gamma - 1)u$,

$$
3(\gamma - 1)K = -U, \qquad K = -\frac{U}{3(\gamma - 1)}.
$$

Hence

$$
E = K + U = U\Bigl(1 - \frac{1}{3(\gamma - 1)}\Bigr) = \frac{3\gamma - 3 - 1}{3(\gamma - 1)}\,U = \frac{3\gamma - 4}{3(\gamma - 1)}\,U.
$$

For $\gamma = 5/3$, the monatomic ideal gas, this is $E = U/2$, as before. For $\gamma > 4/3$ the factor is positive, so $E < 0$ and the star is bound, and contracting it lowers $E$ further; equilibrium is stable. At $\gamma = 4/3$ the factor vanishes: $E = 0$ for every radius. The star is marginally bound, and expanding or contracting it costs no energy, so the smallest perturbation can make it collapse or expand.

An ultra-relativistic gas, of photons or of degenerate relativistic electrons, has $u = 3P$, so $\gamma = 4/3$. A white dwarf near the Chandrasekhar mass is supported by just such a gas, which is why [[#prop-landau]] found that the Fermi and gravitational energies scale identically with $R$. A star supported mainly by radiation pressure, as very massive stars are, is likewise only marginally bound, which is one reason why stars of more than about $100\,M_\odot$ are rare and unstable, shedding mass in violent eruptions. In general relativity the TOV corrections push the critical value of $\gamma$ above $4/3$, and the instability sets in even sooner.
:::
:::
