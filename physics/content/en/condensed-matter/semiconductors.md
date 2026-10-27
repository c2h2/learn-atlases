A pure silicon crystal at room temperature is a poor conductor, about a hundred thousand million times worse than copper. Add one phosphorus atom for every ten million silicon atoms and its conductivity rises by a factor of several hundred thousand; replace the phosphorus by boron and it conducts just as well, but by positive carriers. Join a boron-doped region to a phosphorus-doped one and the result conducts in one direction only. Every computer, phone, solar panel and LED depends on that sequence of facts, and all of them follow from [[condensed-matter/band-structure]] plus the statistics of [[condensed-matter/free-electrons]].

A **semiconductor** is an insulator with a small gap: a filled valence band separated from an empty conduction band by about an electronvolt, so that at room temperature a few electrons are thermally excited across it. Those few electrons, and the holes they leave behind, are dilute enough to obey classical Boltzmann statistics, and their number can be controlled over many orders of magnitude by doping. This chapter computes the carrier density of pure silicon at $300\,\mathrm K$, proves the law of mass action that governs doped material, and builds the p–n junction: its built-in potential, its depletion layer, and the diode equation. A short tour of devices closes the chapter.

Throughout we take $T = 300\,\mathrm K$, so $k_BT = 25.85\,\mathrm{meV}$, and quote carrier densities in $\mathrm{cm^{-3}}$, as every device engineer does; $1\,\mathrm{cm^{-3}} = 10^6\,\mathrm{m^{-3}}$.

## Electrons and holes {#carriers}

The top of the valence band is at energy $E_v$ and the bottom of the conduction band at $E_c$; the **band gap** is $E_g = E_c - E_v$. At absolute zero the valence band is full and the conduction band empty, and by the counting of [[condensed-matter/band-structure]] the crystal is an insulator. At finite temperature an electron excited into the conduction band can move, and so can the hole it leaves behind, which behaves as a carrier of charge $+e$.

| material | $E_g$ at $300\,\mathrm K$ (eV) | gap type |
|---|---|---|
| germanium | $0.66$ | indirect |
| silicon | $1.12$ | indirect |
| gallium arsenide | $1.42$ | direct |
| gallium nitride | $3.4$ | direct |
| diamond | $5.5$ | indirect |

A gap is **direct** if the conduction-band minimum and the valence-band maximum occur at the same $\mathbf k$, and **indirect** if not. The distinction matters for light. A photon carries almost no crystal momentum on the scale of the Brillouin zone, so it can only lift an electron vertically in a band diagram. In a direct-gap material an electron at the bottom of the conduction band can drop straight into a hole at the top of the valence band and emit a photon; in an indirect-gap material a phonon must take up the difference in $\mathbf k$, and the process is a thousand times slower. That is why LEDs and lasers are made from gallium arsenide and gallium nitride, and not from silicon.

Near the band edges the bands are parabolic, with effective masses defined as in [[condensed-matter/band-structure#def-effective-mass]]:

$$
E(\mathbf k) \approx E_c + \frac{\hbar^2k^2}{2m_e^*} \quad\text{(conduction band)}, \qquad E(\mathbf k) \approx E_v - \frac{\hbar^2k^2}{2m_h^*} \quad\text{(valence band)},
$$ {#eq-parabolic}

with $\mathbf k$ measured from the extremum. The **density-of-states effective masses** $m_e^*$ and $m_h^*$ collect the anisotropy of the real bands and the several equivalent minima into single numbers. For silicon at room temperature we use $m_e^* = 1.08\,m$ and $m_h^* = 0.81\,m$, the values tabulated by Kittel and by Sze and Ng.

## Carrier statistics {#statistics}

The occupation of every state is the Fermi–Dirac function $f(E) = 1/(e^{(E-\mu)/k_BT} + 1)$, and a hole is an unoccupied state, with occupation $1 - f(E)$. In a semiconductor the chemical potential $\mu$, often called the Fermi level, lies in the gap, several $k_BT$ from either edge. That makes the statistics simple.

::: definition Non-degenerate semiconductor {#def-nondegenerate}
A semiconductor is **non-degenerate** if $E_c - \mu \gg k_BT$ and $\mu - E_v \gg k_BT$. Then for states in the conduction band $f(E)\approx e^{-(E-\mu)/k_BT}$, and for states in the valence band $1 - f(E)\approx e^{-(\mu-E)/k_BT}$: both electrons and holes obey Boltzmann statistics.
:::

::: theorem Carrier densities {#thm-carriers}
In a non-degenerate semiconductor with parabolic band edges [[#eq-parabolic]], the densities of conduction electrons and of holes are

$$
n = N_c\,e^{-(E_c - \mu)/k_BT}, \qquad p = N_v\,e^{-(\mu - E_v)/k_BT},
$$ {#eq-np}

where the **effective densities of states** are

$$
N_c = 2\Bigl(\frac{2\pi m_e^*k_BT}{h^2}\Bigr)^{3/2}, \qquad N_v = 2\Bigl(\frac{2\pi m_h^*k_BT}{h^2}\Bigr)^{3/2}.
$$ {#eq-nc}
:::

::: proof
The conduction band near its edge is a free-electron gas of mass $m_e^*$ with energies measured from $E_c$. By the free-electron density of states of [[condensed-matter/free-electrons]], the number of states per unit volume per unit energy is $g_c(E) = \frac{1}{2\pi^2}\bigl(\frac{2m_e^*}{\hbar^2}\bigr)^{3/2}\sqrt{E - E_c}$ for $E > E_c$. Then

$$
n = \int_{E_c}^\infty g_c(E)\,e^{-(E - \mu)/k_BT}\,\dd E = \frac{1}{2\pi^2}\Bigl(\frac{2m_e^*}{\hbar^2}\Bigr)^{3/2}e^{-(E_c - \mu)/k_BT}\int_0^\infty\sqrt\varepsilon\,e^{-\varepsilon/k_BT}\,\dd\varepsilon,
$$

with $\varepsilon = E - E_c$. The upper limit may be taken to infinity because the Boltzmann factor kills the integrand long before the band ends. The last integral is $(k_BT)^{3/2}\Gamma(3/2) = (k_BT)^{3/2}\sqrt\pi/2$. Collecting the constants,

$$
\frac{1}{2\pi^2}\Bigl(\frac{2m_e^*k_BT}{\hbar^2}\Bigr)^{3/2}\frac{\sqrt\pi}{2} = 2\Bigl(\frac{m_e^*k_BT}{2\pi\hbar^2}\Bigr)^{3/2} = 2\Bigl(\frac{2\pi m_e^*k_BT}{h^2}\Bigr)^{3/2},
$$

which is $N_c$. The calculation for holes is the same with $m_h^*$, energies measured downward from $E_v$, and the occupation $1 - f$.
:::

The result has a transparent meaning. The conduction band behaves as if all its states were concentrated at the single energy $E_c$, with density $N_c$, populated with the Boltzmann factor. And $N_c$ is twice the inverse cube of the thermal de Broglie wavelength: roughly one state per thermal wavelength cubed, per spin.

::: corollary Law of mass action {#cor-mass-action}
In a non-degenerate semiconductor in equilibrium,

$$
np = N_cN_v\,e^{-E_g/k_BT} \equiv n_i^2,
$$ {#eq-mass-action}

independent of $\mu$, and so independent of doping. In a pure (**intrinsic**) crystal $n = p = n_i$, with

$$
n_i = \sqrt{N_cN_v}\,e^{-E_g/2k_BT}.
$$ {#eq-ni}
:::

::: proof
Multiply the two equations [[#eq-np]]: the exponents add to $-(E_c - \mu + \mu - E_v)/k_BT = -E_g/k_BT$, and $\mu$ cancels. In a pure crystal every conduction electron has come from the valence band, so $n = p$, and each equals $\sqrt{np} = n_i$.
:::

The name comes from chemistry. Electron–hole pairs are created and destroyed in the reaction "bound electron $\rightleftharpoons$ electron + hole", and $np = n_i^2$ is its equilibrium constant. Adding electrons from donors pushes the reaction back and lowers $p$, exactly as adding a common ion lowers the solubility of a salt.

::: example The intrinsic carrier density of silicon {#ex-ni-si}
Compute $N_c$, $N_v$ and $n_i$ for silicon at $300\,\mathrm K$, with $m_e^* = 1.08\,m$, $m_h^* = 0.81\,m$ and $E_g = 1.12\,\mathrm{eV}$.
::: solution
First the effective density of states for a free-electron mass:

$$
2\Bigl(\frac{2\pi mk_BT}{h^2}\Bigr)^{3/2} = 2\Bigl(\frac{2\pi(9.1094\times10^{-31})(4.1419\times10^{-21})}{(6.62607\times10^{-34})^2}\Bigr)^{3/2}\,\mathrm{m^{-3}} = 2.509\times10^{25}\,\mathrm{m^{-3}} = 2.509\times10^{19}\,\mathrm{cm^{-3}}.
$$

Scaling by $(m^*/m)^{3/2}$: $N_c = 2.509\times10^{19}\times1.08^{3/2} = 2.82\times10^{19}\,\mathrm{cm^{-3}}$ and $N_v = 2.509\times10^{19}\times0.81^{3/2} = 1.83\times10^{19}\,\mathrm{cm^{-3}}$. Their geometric mean is $2.27\times10^{19}\,\mathrm{cm^{-3}}$. The Boltzmann factor is

$$
e^{-E_g/2k_BT} = e^{-1.12/(2\times0.025852)} = e^{-21.66} = 3.91\times10^{-10},
$$

so

$$
n_i = (2.27\times10^{19})(3.91\times10^{-10})\,\mathrm{cm^{-3}} = 8.9\times10^{9}\,\mathrm{cm^{-3}}.
$$

Careful measurements give $n_i \approx 1.0\times10^{10}\,\mathrm{cm^{-3}}$ at $300\,\mathrm K$, and that rounded value is the one used in device work and in the rest of this chapter. The $10\%$ difference is a lesson in sensitivity: changing $E_g$ by only $0.02\,\mathrm{eV}$, less than one $k_BT$, changes $n_i$ by $50\%$, and the temperature dependence of the gap and of the masses is not negligible at that level. Silicon has $5.0\times10^{22}$ atoms per $\mathrm{cm^3}$, so only one valence electron in $10^{13}$ is in the conduction band.
:::
:::

Where is the chemical potential of an intrinsic crystal? Setting $n = p$ in [[#eq-np]] and taking logarithms,

$$
\mu_i = \frac{E_c + E_v}{2} + \frac34k_BT\ln\frac{m_h^*}{m_e^*},
$$ {#eq-mui}

which for silicon is $5.6\,\mathrm{meV}$ below mid-gap: very close to the middle, comfortably non-degenerate.

::: widget plot
f: log10(2.27e19*(x/300)^1.5*exp(-G/(2*8.617333e-5*x)))
x: 200, 700
y: 0, 18
sliders: G=1.12:0.6:1.6:0.01
caption: The common logarithm of the intrinsic carrier density $n_i$, in $\mathrm{cm^{-3}}$, against temperature in kelvin, from [[#eq-ni]] with silicon's effective masses and a temperature-independent gap $G$ in eV. At $G = 1.12$ read off about $10^{10}$ at $300\,\mathrm K$, and notice that it rises by more than a factor of ten for every $50\,\mathrm K$. Lower $G$ to $0.66$, germanium's gap, and $n_i$ at room temperature jumps by three orders of magnitude: that is why germanium devices fail at temperatures silicon shrugs off. Raise $G$ to $1.42$, as for gallium arsenide, and the intrinsic carriers almost disappear.
:::

::: warning The gap appears halved
The intrinsic density contains $e^{-E_g/2k_BT}$, not $e^{-E_g/k_BT}$. Each thermal excitation creates two carriers, and $n_i$ is the square root of the product $np$, which contains the full gap. Using $E_g$ instead of $E_g/2$ for silicon gives $n_i\sim10^{0}\,\mathrm{cm^{-3}}$, one electron per cubic centimetre, wrong by ten orders of magnitude. A related error is to expect $n_i$ to scale like a power of $T$: the $T^{3/2}$ in $\sqrt{N_cN_v}$ is negligible beside the exponential, which is why a plot of $\ln n_i$ against $1/T$ is nearly straight with slope $-E_g/2k_B$.
:::

## Doping {#doping}

Replace a silicon atom by phosphorus, from group 15. Four of its five valence electrons fill the four bonds to its silicon neighbours; the fifth is left over, bound to the $\mathrm P^+$ ion only by the Coulomb attraction, screened by the dielectric constant of silicon. A **donor** gives up an electron to the conduction band; an **acceptor**, from group 13, such as boron, takes one from the valence band and leaves a hole. A crystal with more donors than acceptors is **n-type**, its majority carriers electrons; one with more acceptors is **p-type**.

::: proposition Hydrogenic donor {#prop-hydrogenic}
Model the extra electron as a particle of mass $m^*$ bound to a charge $+e$ in a medium of relative permittivity $\varepsilon_r$. Its binding energy and orbit radius are those of hydrogen rescaled:

$$
E_d = \frac{m^*/m}{\varepsilon_r^2}\times13.6\,\mathrm{eV}, \qquad a_d = \frac{\varepsilon_r}{m^*/m}\times0.529\,\text{Å}.
$$ {#eq-donor}
:::

::: proof
The hydrogen energy is $E_1 = me^4/(2(4\pi\varepsilon_0)^2\hbar^2) = 13.6\,\mathrm{eV}$ and the Bohr radius $a_0 = 4\pi\varepsilon_0\hbar^2/(me^2) = 0.529\,\text{Å}$, from [[quantum-1/hydrogen]]. The donor problem is the same Schrödinger equation with $m\to m^*$ and $\varepsilon_0\to\varepsilon_r\varepsilon_0$. Substituting, $E_1$ is multiplied by $(m^*/m)/\varepsilon_r^2$ and $a_0$ by $\varepsilon_r/(m^*/m)$. The model is consistent if $a_d$ comes out much larger than the lattice constant, so that the electron sees the crystal as a continuum with mass $m^*$ and permittivity $\varepsilon_r$.
:::

::: example The phosphorus donor in silicon {#ex-donor-si}
Using $\varepsilon_r = 11.7$ and the conductivity effective mass $m^* = 0.26\,m$, estimate the binding energy and orbit radius of a donor electron in silicon.
::: solution
From [[#eq-donor]],

$$
E_d = \frac{0.26}{11.7^2}\times13.606\,\mathrm{eV} = 1.899\times10^{-3}\times13.606\,\mathrm{eV} = 25.8\,\mathrm{meV}, \qquad a_d = \frac{11.7}{0.26}\times0.529\,\text{Å} = 24\,\text{Å}.
$$

The orbit spans about four lattice constants ($a = 5.43\,\text{Å}$) and encloses some three thousand silicon atoms, so treating the host as a continuum is reasonable. The measured ionisation energies are $45\,\mathrm{meV}$ for phosphorus and $49\,\mathrm{meV}$ for arsenic: the model has the right size but misses the chemistry of the core, where the continuum picture fails. The key fact survives. The binding energy is comparable to $k_BT = 25.85\,\mathrm{meV}$, so at room temperature essentially every donor is ionised, and each contributes one conduction electron.
:::
:::

### Majority and minority carriers

The densities in a doped crystal follow from two conditions: the law of mass action [[#eq-mass-action]], and charge neutrality. With all $N_D$ donors and $N_A$ acceptors ionised, the positive charges are holes and ionised donors, the negative ones electrons and ionised acceptors:

$$
n + N_A = p + N_D.
$$ {#eq-neutral}

::: proposition Carrier densities in a doped crystal {#prop-doped}
Let $N = N_D - N_A$. In a non-degenerate semiconductor with all impurities ionised,

$$
n = \frac N2 + \sqrt{\frac{N^2}{4} + n_i^2}, \qquad p = \frac{n_i^2}{n}.
$$ {#eq-doped}

If $N\gg n_i$, then $n\approx N$ and $p\approx n_i^2/N$.
:::

::: proof
Substitute $p = n_i^2/n$ into [[#eq-neutral]] and multiply by $n$: $n^2 - Nn - n_i^2 = 0$. The positive root is [[#eq-doped]]. For $N\gg n_i$, $\sqrt{N^2/4 + n_i^2}\approx N/2 + n_i^2/N$, so $n\approx N + n_i^2/N\approx N$.
:::

::: example Phosphorus-doped silicon {#ex-n-type}
Silicon is doped with $N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$ phosphorus atoms. Find $n$, $p$, the position of $\mu$ below $E_c$, and the resistivity, taking the electron mobility at this doping to be $1200\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$.
::: solution
Since $N_D\gg n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$, [[#prop-doped]] gives $n = 1.0\times10^{16}\,\mathrm{cm^{-3}}$ and

$$
p = \frac{n_i^2}{n} = \frac{(1.0\times10^{10})^2}{1.0\times10^{16}}\,\mathrm{cm^{-3}} = 1.0\times10^{4}\,\mathrm{cm^{-3}}.
$$

The donors have raised $n$ by a factor of a million and lowered $p$ by the same factor. The chemical potential follows from [[#eq-np]]:

$$
E_c - \mu = k_BT\ln\frac{N_c}{n} = 0.025852\,\mathrm{eV}\times\ln\frac{2.82\times10^{19}}{1.0\times10^{16}} = 0.205\,\mathrm{eV},
$$

eight $k_BT$ below the band edge, so the material is still non-degenerate. The conductivity is carried by the electrons, $\sigma = ne\mu_n$, where the **mobility** $\mu_n = e\tau/m^*$ is the drift velocity per unit field:

$$
\rho = \frac{1}{ne\mu_n} = \frac{1}{(1.0\times10^{16})(1.602\times10^{-19})(1200)}\,\Omega\,\mathrm{cm} = 0.52\,\Omega\,\mathrm{cm}.
$$

Intrinsic silicon, with $n = p = n_i$ and mobilities about $1400$ and $450\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$, has $\rho = 1/\bigl(n_ie(\mu_n + \mu_p)\bigr) = 3.4\times10^{5}\,\Omega\,\mathrm{cm}$. One impurity per five million atoms has changed the resistivity by almost a factor of a million.
:::
:::

The extrinsic regime does not last for ever. At very low temperature, $k_BT\ll E_d$, electrons fall back onto the donors (**freeze-out**) and the conductivity collapses. At high temperature $n_i$ grows past $N_D$ and the crystal becomes intrinsic again, its carrier density no longer set by the doping. For $N_D = 10^{16}\,\mathrm{cm^{-3}}$ in silicon that happens near $700\,\mathrm K$, which is why silicon devices are specified to operate only up to about $150$–$200\,^\circ\mathrm C$ and why wide-gap materials such as silicon carbide and gallium nitride are used for hot, high-power electronics.

::: quiz
A silicon sample is doped with $10^{17}\,\mathrm{cm^{-3}}$ boron acceptors. At room temperature, what is the electron density?
- [ ] $10^{17}\,\mathrm{cm^{-3}}$
- [ ] $10^{10}\,\mathrm{cm^{-3}}$, the intrinsic value, since boron adds no electrons.
- [x] About $10^{3}\,\mathrm{cm^{-3}}$
- [ ] Zero
::: solution
The holes are the majority carriers, $p\approx N_A = 10^{17}\,\mathrm{cm^{-3}}$. By the law of mass action, $n = n_i^2/p = 10^{20}/10^{17} = 10^3\,\mathrm{cm^{-3}}$. The electron density is suppressed below its intrinsic value: adding holes drives recombination until $np$ returns to $n_i^2$. It is not zero, and those few minority electrons are exactly what the p–n junction relies on.
:::
:::

### Drift and diffusion

Carriers in a semiconductor move for two reasons. An electric field makes them **drift**, with velocity $-\mu_nE$ for electrons and $+\mu_pE$ for holes, where the mobilities $\mu_n = e\tau_n/m_e^*$ and $\mu_p = e\tau_p/m_h^*$ are the Drude result of [[condensed-matter/free-electrons]] with effective masses. A gradient of density makes them **diffuse**, with a particle flux $-D\,\nabla n$ by Fick's law, as for any dilute gas. The electron current density is the sum,

$$
j_n = ne\mu_nE + eD_n\deriv{n}{x},
$$ {#eq-drift-diffusion}

where the sign of the second term reflects the negative charge: electrons diffusing in the $-x$ direction, down a positive gradient, carry current in the $+x$ direction. In a metal diffusion currents are negligible, because the density cannot vary without huge fields. In a semiconductor, where carrier densities vary by factors of a million over a micrometre, diffusion is as important as drift.

The two coefficients are not independent. In equilibrium in a region with a potential $\phi(x)$, there is no current, and the Boltzmann distribution requires $n\propto e^{e\phi/k_BT}$, so $\dd n/\dd x = (e/k_BT)\,n\,\dd\phi/\dd x = -(e/k_BT)\,nE$. Setting $j_n = 0$ in [[#eq-drift-diffusion]] then gives the **Einstein relation**

$$
D_n = \frac{k_BT}{e}\,\mu_n,
$$ {#eq-einstein-rel}

and similarly for holes. An electron mobility of $1400\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$ means a diffusion coefficient of $36\,\mathrm{cm^2/s}$ at room temperature. The same relation, derived by Einstein in 1905 for Brownian particles, links the random walk of carriers to their response to a force; it holds whenever the carriers are non-degenerate. The p–n junction is the place where drift and diffusion fight each other to a standstill.

## The p–n junction {#pn}

Take a crystal that is p-type on one side of a plane and n-type on the other, with an abrupt change. Before equilibrium is reached, electrons are plentiful on the n side and holes on the p side, so electrons diffuse into the p side and holes into the n side, where they recombine. Each electron that leaves the n side uncovers a fixed positive donor ion; each hole that leaves the p side uncovers a fixed negative acceptor ion. A layer of space charge builds up around the junction, positive on the n side and negative on the p side, and its electric field opposes further diffusion. Equilibrium is reached when the drift driven by that field exactly balances the diffusion.

The clean statement of equilibrium is that the chemical potential, the electrochemical potential of the electrons, is the same everywhere. Far from the junction each side is a uniform doped crystal with $\mu$ fixed relative to its own band edges by [[#eq-np]]. For the two values of $\mu$ to coincide, the bands themselves must shift: the energy of an electron at the n-side band edge is lowered by $eV_{bi}$ relative to the p side, where $V_{bi}$ is the electrostatic potential difference across the junction.

::: theorem Built-in potential {#thm-vbi}
For an abrupt junction with $N_A$ acceptors on the p side and $N_D$ donors on the n side, both fully ionised and non-degenerate, the potential of the n side relative to the p side is

$$
V_{bi} = \frac{k_BT}{e}\ln\frac{N_AN_D}{n_i^2}.
$$ {#eq-vbi}
:::

::: proof
Far from the junction on the n side, $n = N_D$, so by [[#eq-np]] $E_c^{(n)} - \mu = k_BT\ln(N_c/N_D)$. On the p side, $p = N_A$, so $\mu - E_v^{(p)} = k_BT\ln(N_v/N_A)$, and with $E_c^{(p)} = E_v^{(p)} + E_g$, $E_c^{(p)} - \mu = E_g - k_BT\ln(N_v/N_A)$. The chemical potential is common, so the step in the conduction-band edge is

$$
E_c^{(p)} - E_c^{(n)} = E_g - k_BT\ln\frac{N_v}{N_A} - k_BT\ln\frac{N_c}{N_D} = k_BT\Bigl[\frac{E_g}{k_BT} - \ln\frac{N_cN_v}{N_AN_D}\Bigr].
$$

By [[#eq-mass-action]], $E_g/k_BT = \ln(N_cN_v/n_i^2)$, so the bracket is $\ln(N_AN_D/n_i^2)$. An electron's potential energy is $-e$ times the electrostatic potential, so the band edge on the n side is lower by $eV_{bi}$, which gives [[#eq-vbi]].
:::

### The depletion approximation

In the transition region the carrier densities fall exponentially with the potential, so over most of it they are negligible beside the fixed ion charges. The **depletion approximation** idealises this: the region $-x_p < x < x_n$ around the junction at $x = 0$ contains no free carriers at all, with charge density $-eN_A$ on the p side and $+eN_D$ on the n side, and outside it the material is neutral.

::: theorem Depletion width {#thm-depletion}
In the depletion approximation, with an applied voltage $V$ (positive when the p side is made positive, **forward bias**), the depletion region has total width

$$
W = x_n + x_p = \sqrt{\frac{2\varepsilon_s(V_{bi} - V)}{e}\Bigl(\frac1{N_A} + \frac1{N_D}\Bigr)},
$$ {#eq-width}

with $N_Ax_p = N_Dx_n$, where $\varepsilon_s$ is the permittivity of the semiconductor. The largest field, at the junction, is $E_\mathrm{max} = eN_Dx_n/\varepsilon_s$.
:::

::: proof
Gauss's law in one dimension, $\dd E/\dd x = \rho/\varepsilon_s$, with $E = 0$ in the neutral regions. On the p side, $\rho = -eN_A$, so $E$ falls linearly from $0$ at $x = -x_p$ to $-eN_Ax_p/\varepsilon_s$ at $x = 0$. On the n side, $\rho = +eN_D$, so $E$ rises linearly from $-eN_Dx_n/\varepsilon_s$ at $x = 0$ back to $0$ at $x = x_n$. Continuity of $E$ at $x = 0$ requires $N_Ax_p = N_Dx_n$: the total charge in the layer is zero. The potential difference is minus the integral of $E$, the area of the triangle:

$$
V_{bi} - V = \frac12E_\mathrm{max}W = \frac{e}{2\varepsilon_s}\bigl(N_Ax_p^2 + N_Dx_n^2\bigr).
$$

With $x_n = WN_A/(N_A + N_D)$ and $x_p = WN_D/(N_A + N_D)$, the bracket is $W^2N_AN_D/(N_A + N_D)$, so $V_{bi} - V = (eW^2/2\varepsilon_s)\,N_AN_D/(N_A+N_D)$, and solving for $W$ gives [[#eq-width]]. An applied voltage appears across the depletion layer because that is where the resistance is: the neutral regions are good conductors, and forward bias reduces the barrier from $V_{bi}$ to $V_{bi} - V$.
:::

::: example A silicon junction {#ex-junction}
A silicon junction has $N_A = 1.0\times10^{17}\,\mathrm{cm^{-3}}$ and $N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$. With $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$ and $\varepsilon_s = 11.7\varepsilon_0$, find $V_{bi}$, the depletion width and how it is shared, and the peak field, at zero bias.
::: solution
By [[#eq-vbi]],

$$
V_{bi} = 0.025852\,\mathrm V\times\ln\frac{(10^{17})(10^{16})}{(10^{10})^2} = 0.025852\times\ln10^{13}\,\mathrm V = 0.025852\times29.934\,\mathrm V = 0.774\,\mathrm V.
$$

It is less than the gap, $1.12\,\mathrm V$, as it must be. Convert to SI: $N_A = 10^{23}\,\mathrm{m^{-3}}$, $N_D = 10^{22}\,\mathrm{m^{-3}}$, $\varepsilon_s = 1.0359\times10^{-10}\,\mathrm{F/m}$. Then

$$
W = \sqrt{\frac{2(1.0359\times10^{-10})(0.774)}{1.602\times10^{-19}}\,(10^{-23} + 10^{-22})}\,\mathrm m = 3.32\times10^{-7}\,\mathrm m = 0.332\,\mu\mathrm m.
$$

Since $N_Ax_p = N_Dx_n$, the depletion layer lies mostly in the lightly doped side: $x_n = W N_A/(N_A + N_D) = 0.302\,\mu\mathrm m$ and $x_p = 0.030\,\mu\mathrm m$. The peak field is

$$
E_\mathrm{max} = \frac{eN_Dx_n}{\varepsilon_s} = \frac{(1.602\times10^{-19})(10^{22})(3.016\times10^{-7})}{1.0359\times10^{-10}}\,\mathrm{V/m} = 4.7\times10^6\,\mathrm{V/m}.
$$

Forty-seven kilovolts per centimetre, across a third of a micrometre, at zero applied voltage. A reverse bias of $5\,\mathrm V$ widens the layer to $0.91\,\mu\mathrm m$ and raises the field to $1.3\times10^7\,\mathrm{V/m}$; near $3\times10^7\,\mathrm{V/m}$ silicon breaks down by avalanche multiplication.
:::
:::

::: quiz
In the junction of [[#ex-junction]], with the p side ten times more heavily doped than the n side, which statements are true?
- [x] Most of the depletion layer lies on the n side.
- [ ] The depletion layer is equally shared, because the total charge is zero.
- [x] The total positive charge on the n side equals the total negative charge on the p side.
- [ ] Forward bias widens the depletion layer.
::: solution
Neutrality of the layer as a whole, $N_Ax_p = N_Dx_n$, means equal and opposite charges, so the lightly doped side, needing more volume to hold the same charge, carries most of the width: here $x_n = 10x_p$. Forward bias reduces $V_{bi} - V$ and so narrows the layer, by [[#eq-width]]; reverse bias widens it.
:::
:::

### The diode equation

Apply a forward bias $V$. The barrier drops to $e(V_{bi} - V)$, and the balance between diffusion and drift is upset in favour of diffusion: electrons are injected into the p side and holes into the n side, where they are minority carriers and diffuse away until they recombine. Under reverse bias the barrier rises and only the tiny minority densities on each side drift across. The asymmetry is the rectifier.

::: theorem Shockley diode equation {#thm-diode}
For an ideal junction, in which carriers cross the depletion region without recombining and the injected minority densities are small compared with the majority densities, the current is

$$
I = I_s\bigl(e^{eV/k_BT} - 1\bigr),
$$ {#eq-diode}

where the **saturation current** $I_s$ is proportional to $n_i^2$ and independent of $V$.
:::

::: proof
The proof has two steps; the second is sketched, and the full treatment is in Sze and Ng, chapter 2. *The law of the junction.* Across the depletion region the carrier densities stay in quasi-equilibrium with the local potential: $n$ varies as $e^{e\phi/k_BT}$. In equilibrium the electron density changes across the layer from $N_D$ to $n_{p0} = n_i^2/N_A$, a ratio $e^{eV_{bi}/k_BT}$, consistent with [[#eq-vbi]]. With applied $V$ the barrier is $V_{bi} - V$, so the electron density at the p-side edge of the depletion layer becomes

$$
n_p(-x_p) = n_{p0}\,e^{eV/k_BT}.
$$

*Diffusion of minority carriers.* In the neutral p region the excess electron density $\delta n = n_p - n_{p0}$ diffuses with diffusion coefficient $D_n$ and recombines with lifetime $\tau_n$, so it satisfies $D_n\,\delta n'' = \delta n/\tau_n$, whose solution decaying away from the junction is $\delta n\propto e^{-\abs{x}/L_n}$ with diffusion length $L_n = \sqrt{D_n\tau_n}$. The diffusion current density at the edge is $eD_n\,\delta n(-x_p)/L_n = (eD_nn_{p0}/L_n)(e^{eV/k_BT} - 1)$. Adding the analogous hole current injected into the n side, and multiplying by the junction area $A$,

$$
I_s = eA\,n_i^2\Bigl(\frac{D_n}{L_nN_A} + \frac{D_p}{L_pN_D}\Bigr),
$$

which is proportional to $n_i^2$ and does not depend on $V$.
:::

Under reverse bias, $V$ large and negative, the current saturates at $-I_s$: the minority carriers that diffuse to the edge of the depletion layer are swept across, and there are very few of them. Under forward bias the current rises by a factor $e$ for every $25.85\,\mathrm{mV}$, or a factor of ten for every $59.5\,\mathrm{mV}$. Since $I_s\propto n_i^2\propto e^{-E_g/k_BT}$, it is minute for a wide-gap material and grows rapidly with temperature, which is why the forward voltage of a silicon diode at fixed current falls by about $2\,\mathrm{mV}$ per kelvin, a fact used in every electronic thermometer chip.

::: widget plot
f: 10^(s + 3)*(exp(x/0.025852) - 1)
x: -0.3, 0.8
y: -2, 20
sliders: s=-12:-15:-9:0.1
caption: The ideal diode characteristic [[#eq-diode]] at $300\,\mathrm K$, current in mA against voltage in volts, for a saturation current $I_s = 10^{s}\,\mathrm A$. With $s = -12$, typical of a small silicon diode, almost nothing flows until about $0.5\,\mathrm V$ and then the current shoots up: the familiar "turn-on voltage" is just where an exponential becomes visible on a milliamp scale. Lower $s$ by three, as for a material with a larger gap, and the knee moves right by $3\times59.5\,\mathrm{mV}$. On the reverse side the current is $-I_s$, invisible at this scale.
:::

::: example Forward current of a silicon diode {#ex-diode}
A silicon diode at $300\,\mathrm K$ has $I_s = 1.0\times10^{-12}\,\mathrm A$. Find the current at forward biases of $0.50$, $0.60$ and $0.70\,\mathrm V$, and at a reverse bias of $5.0\,\mathrm V$.
::: solution
With $eV/k_BT = V/(0.025852\,\mathrm V)$, [[#eq-diode]] gives

$$
I(0.50) = 10^{-12}(e^{19.34} - 1)\,\mathrm A = 0.25\,\mathrm{mA}, \quad I(0.60) = 10^{-12}e^{23.21}\,\mathrm A = 12\,\mathrm{mA}, \quad I(0.70) = 10^{-12}e^{27.08}\,\mathrm A = 0.57\,\mathrm A.
$$

Each extra $0.1\,\mathrm V$ multiplies the current by $e^{3.87} = 48$. Under reverse bias, $e^{-193}$ is utterly negligible and $I = -1.0\times10^{-12}\,\mathrm A$. The ratio of forward current at $0.6\,\mathrm V$ to reverse current at $5\,\mathrm V$ is ten thousand million. Real diodes depart from the ideal law at both ends, through recombination in the depletion layer at low forward current, the resistance of the neutral regions at high current, and generation in the depletion layer under reverse bias, but the exponential is the heart of every one.
:::
:::

## Devices {#devices}

A handful of device principles follow directly from the junction.

- **Light-emitting diodes and lasers.** Under forward bias, electrons and holes injected across a junction of a direct-gap material recombine and emit photons of energy close to $E_g$. Gallium arsenide emits in the near infrared at $873\,\mathrm{nm}$; the blue and white LEDs that now light most buildings use indium gallium nitride, whose development by Isamu Akasaki, Hiroshi Amano and Shuji Nakamura was recognised by the 2014 Nobel Prize.
- **Photodiodes and solar cells.** Run backwards, a photon absorbed in or near the depletion layer creates an electron–hole pair, and the built-in field separates them, producing a current. For a single junction under sunlight the detailed-balance limit of Shockley and Queisser (1961) caps the efficiency at about $33\%$; the best laboratory silicon cells reach roughly $27\%$, and as of 2026 crystalline silicon makes up the overwhelming majority of solar modules manufactured.
- **Transistors.** A bipolar transistor is two junctions back to back, n–p–n, with a thin middle layer: a small current into the base controls a large current from emitter to collector. The field-effect transistor, and above all the metal–oxide–semiconductor FET (MOSFET), instead uses a voltage on a gate, insulated from the silicon by a thin oxide, to create or remove a thin conducting channel between two n-type regions. The MOSFET is the switch of digital logic. As of 2026 the most advanced chips contain tens of billions of them, and leading manufacturing processes have moved from the fin-shaped transistors used for the previous decade to "gate-all-around" designs in which the gate wraps a stack of thin silicon sheets.

::: application Measuring a doping profile
Under reverse bias the depletion layer is a parallel-plate capacitor of width $W$, with capacitance per unit area $C/A = \varepsilon_s/W$. Since $W^2\propto V_{bi} - V$, a plot of $1/C^2$ against $V$ for a one-sided junction is a straight line whose slope gives the doping of the lightly doped side and whose intercept gives $V_{bi}$ (see [[#exr-cv]]). This **capacitance–voltage profiling** is a standard measurement in every semiconductor laboratory. The same voltage-dependent capacitance makes the reverse-biased diode a tunable capacitor, the varactor, used to tune radio receivers.
:::

::: history Rectifiers, junctions and the transistor
Ferdinand Braun observed rectification at metal–sulphide contacts in 1874, and crystal detectors were the first radio receivers. A theory had to wait for band theory: Alan Wilson's papers of 1931 explained semiconductors as insulators with small gaps and impurity levels. Russell Ohl at Bell Laboratories discovered the p–n junction in a silicon rod in 1940, noticing a photovoltage at a boundary between differently purified regions. In December 1947 John Bardeen and Walter Brattain demonstrated the point-contact transistor at Bell Labs, and William Shockley, in 1948 and 1949, invented the junction transistor and derived the diode equation of [[#thm-diode]]; the three shared the 1956 Nobel Prize. Mohamed Atalla and Dawon Kahng made the first working MOSFET in 1959, and Jack Kilby (1958) and Robert Noyce (1959) independently invented the integrated circuit.
:::

## Where this leads {#leads}

The ideas here run through applied physics and electrical engineering. Heterojunctions between different semiconductors confine electrons in layers a few nanometres thick, whose quantised levels are the particle-in-a-box states of [[quantum-1/schrodinger-equation]]; at low temperature and high field such two-dimensional electron gases show the quantum Hall effect. Transport in strong fields, hot carriers, tunnelling diodes and the physics of the MOSFET are developed in Sze and Ng. The chemistry of semiconductor materials, from silicon purification to perovskite solar absorbers, is in Chemistry Atlas ([electronic structure of solids](/learn/chemistry/lesson.php?c=materials-chemistry&l=electronic-structure-solids) and [energy materials](/learn/chemistry/lesson.php?c=materials-chemistry&l=energy-materials)). The next chapter, [[condensed-matter/magnetism-superconductivity]], leaves the independent-electron picture for collective states of electrons.

::: summary
- A semiconductor has a filled valence band and an empty conduction band separated by a gap of order $1\,\mathrm{eV}$; holes in the valence band act as positive carriers.
- Non-degenerate carriers obey Boltzmann statistics: $n = N_ce^{-(E_c-\mu)/k_BT}$, $p = N_ve^{-(\mu-E_v)/k_BT}$, with $N_c, N_v\sim10^{19}\,\mathrm{cm^{-3}}$.
- The law of mass action $np = n_i^2 = N_cN_ve^{-E_g/k_BT}$ holds whatever the doping; for silicon at $300\,\mathrm K$, $n_i\approx1.0\times10^{10}\,\mathrm{cm^{-3}}$.
- Donors and acceptors are shallow hydrogenic impurities, ionised at room temperature; the majority density equals the net doping and the minority density is $n_i^2$ divided by it.
- A p–n junction has a built-in potential $V_{bi} = (k_BT/e)\ln(N_AN_D/n_i^2)$ and a depletion layer of width $\sqrt{2\varepsilon_s(V_{bi}-V)(1/N_A+1/N_D)/e}$, a fraction of a micrometre.
- The ideal diode obeys $I = I_s(e^{eV/k_BT} - 1)$: a factor of ten in current per $59.5\,\mathrm{mV}$ forward, and a tiny saturation current $\propto n_i^2$ in reverse.
:::

## Exercises {#exercises}

::: exercise Minority electrons {level=1 check="1e5"}
Silicon is doped with $N_A = 1.0\times10^{15}\,\mathrm{cm^{-3}}$ boron atoms. Taking $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$, find the electron density in $\mathrm{cm^{-3}}$ at $300\,\mathrm K$.
::: solution
The holes are the majority carriers, $p = N_A = 1.0\times10^{15}\,\mathrm{cm^{-3}}$, since $N_A\gg n_i$. By [[#eq-mass-action]], $n = n_i^2/p = 10^{20}/10^{15} = 1.0\times10^{5}\,\mathrm{cm^{-3}}$.
:::
:::

::: exercise The colour of a gallium arsenide LED {level=1 check="873"}
Gallium arsenide has $E_g = 1.42\,\mathrm{eV}$. Find the wavelength, in nanometres, of a photon of energy $E_g$.
::: solution
$\lambda = hc/E_g = (6.62607\times10^{-34})(2.99792\times10^8)/(1.42\times1.60218\times10^{-19})\,\mathrm m = 8.73\times10^{-7}\,\mathrm m = 873\,\mathrm{nm}$, in the near infrared. The handy rule $\lambda\,[\mathrm{nm}] = 1239.8/E\,[\mathrm{eV}]$ gives the same. For visible emission one needs gaps above about $1.8\,\mathrm{eV}$, which is why red LEDs use alloys such as $\mathrm{AlGaInP}$ and blue ones use $\mathrm{InGaN}$.
:::
:::

::: exercise Donors in germanium {level=1 check="6.38"}
In germanium $\varepsilon_r = 16.0$ and the conductivity effective mass is $0.12\,m$. Estimate the hydrogenic donor binding energy in meV.
::: solution
From [[#eq-donor]], $E_d = (0.12/16.0^2)\times13.606\,\mathrm{eV} = 4.6875\times10^{-4}\times13.606\,\mathrm{eV} = 6.38\,\mathrm{meV}$. The orbit radius is $(16.0/0.12)\times0.529\,\text{Å} = 71\,\text{Å}$, over twelve lattice constants, so the continuum model is better here than in silicon; measured donor energies in germanium are about $10$–$13\,\mathrm{meV}$.
:::
:::

::: exercise A symmetric junction {level=2 check="0.714"}
Find the built-in potential, in volts, of a silicon junction with $N_A = N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$ at $300\,\mathrm K$, with $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$.
::: solution
By [[#eq-vbi]], $V_{bi} = 0.025852\,\mathrm V\times\ln(10^{32}/10^{20}) = 0.025852\times\ln10^{12}\,\mathrm V = 0.025852\times27.631\,\mathrm V = 0.714\,\mathrm V$. Each factor of ten in the doping product adds $59.5\,\mathrm{mV}$; the built-in potential can never exceed roughly $E_g/e$, because heavier doping would make the material degenerate.
:::
:::

::: exercise Heating silicon {level=2 check="27.8"}
Taking $E_g = 1.12\,\mathrm{eV}$ independent of temperature, by what factor does $n_i$ of silicon increase from $300\,\mathrm K$ to $350\,\mathrm K$?
::: solution
From [[#eq-ni]], $n_i\propto T^{3/2}e^{-E_g/2k_BT}$. The power gives $(350/300)^{3/2} = 1.260$. The exponential gives $\exp\bigl[\frac{E_g}{2k_B}\bigl(\frac1{300} - \frac1{350}\bigr)\bigr]$; with $E_g/2k_B = 6498\,\mathrm K$ and $\frac1{300} - \frac1{350} = 4.762\times10^{-4}\,\mathrm{K^{-1}}$, the exponent is $3.094$ and the factor $22.07$. The product is $27.8$. A $17\%$ rise in temperature increases $n_i$ almost thirtyfold and the diode saturation current, $\propto n_i^2$, almost eight-hundredfold.
:::
:::

::: exercise A forward voltage {level=2 check="0.536"}
A diode with $I_s = 1.0\times10^{-12}\,\mathrm A$ is to carry $1.0\,\mathrm{mA}$ at $300\,\mathrm K$. What forward voltage, in volts, is needed?
::: solution
Invert [[#eq-diode]]: $V = (k_BT/e)\ln(1 + I/I_s) = 0.025852\times\ln(1 + 10^9)\,\mathrm V = 0.025852\times20.723\,\mathrm V = 0.536\,\mathrm V$. The "one" is irrelevant. Ten times the current needs only $59.5\,\mathrm{mV}$ more, which is why the forward voltage of a silicon diode is quoted, roughly, as $0.6$–$0.7\,\mathrm V$ whatever the current.
:::
:::

::: exercise Reverse bias {level=2 check="0.906"}
For the junction of [[#ex-junction]], find the depletion width in micrometres under a reverse bias of $5.0\,\mathrm V$.
::: solution
In [[#eq-width]] replace $V_{bi}$ by $V_{bi} - V = 0.774 + 5.0 = 5.774\,\mathrm V$. Since $W\propto\sqrt{V_{bi} - V}$, $W = 0.332\,\mu\mathrm m\times\sqrt{5.774/0.774} = 0.332\times2.731\,\mu\mathrm m = 0.906\,\mu\mathrm m$. The peak field rises in the same proportion, to $1.27\times10^7\,\mathrm{V/m}$.
:::
:::

::: exercise Capacitance–voltage profiling {#exr-cv level=3}
For a one-sided junction with $N_A\gg N_D$, show that the depletion capacitance per unit area obeys $1/(C/A)^2 = 2(V_{bi} - V)/(e\varepsilon_sN_D)$, and explain how $N_D$ and $V_{bi}$ are read from a plot of $1/C^2$ against $V$.
::: solution
With $N_A\gg N_D$, [[#eq-width]] becomes $W^2 = 2\varepsilon_s(V_{bi} - V)/(eN_D)$, and nearly all of $W$ lies on the n side. A small change $\dd V$ changes the charge per unit area on each side of the layer by $\dd Q = eN_D\,\dd W$, so the differential capacitance is $C/A = \dd Q/\dd V$. From $W\,\dd W = -\varepsilon_s\,\dd V/(eN_D)$, $\abs{\dd Q/\dd V} = eN_D\varepsilon_s/(eN_DW) = \varepsilon_s/W$, the parallel-plate result. Hence

$$
\frac{1}{(C/A)^2} = \frac{W^2}{\varepsilon_s^2} = \frac{2(V_{bi} - V)}{e\varepsilon_sN_D}.
$$

This is linear in $V$ with slope $-2/(e\varepsilon_sN_D)$, so $N_D$ follows from the slope, and the line crosses $1/C^2 = 0$ at $V = V_{bi}$. If the doping varies with depth, the local slope gives $N_D$ at the depth $W = \varepsilon_sA/C$, which is how doping profiles are measured.
:::
:::

::: exercise The intrinsic Fermi level {level=3 check="-5.58"}
Derive [[#eq-mui]] from [[#eq-np]] and find $\mu_i - (E_c + E_v)/2$ for silicon at $300\,\mathrm K$, in meV.
::: solution
Setting $n = p$: $N_ce^{-(E_c - \mu)/k_BT} = N_ve^{-(\mu - E_v)/k_BT}$. Taking logarithms, $\ln N_c - (E_c - \mu)/k_BT = \ln N_v - (\mu - E_v)/k_BT$, so $2\mu = E_c + E_v + k_BT\ln(N_v/N_c)$. Since $N_v/N_c = (m_h^*/m_e^*)^{3/2}$,

$$
\mu_i = \frac{E_c + E_v}{2} + \frac34k_BT\ln\frac{m_h^*}{m_e^*}.
$$

For silicon, $\frac34(25.852\,\mathrm{meV})\ln(0.81/1.08) = 19.389\times(-0.28768)\,\mathrm{meV} = -5.58\,\mathrm{meV}$. The level sits slightly towards the band with the lighter carriers, here the valence band, because the band with fewer states must be approached more closely to hold the same number of carriers.
:::
:::

::: exercise A golden ratio {level=3 check="(1+sqrt(5))/2"}
A silicon sample contains donors at a density exactly equal to $n_i$ and no acceptors. Find $n/n_i$.
::: solution
By [[#prop-doped]] with $N = n_i$,

$$
n = \frac{n_i}{2} + \sqrt{\frac{n_i^2}{4} + n_i^2} = n_i\,\frac{1 + \sqrt5}{2},
$$

so $n/n_i = (1 + \sqrt5)/2 = 1.618$, the golden ratio, and $p/n_i = 2/(1 + \sqrt5) = 0.618$. Check neutrality: $n - p = 1.618n_i - 0.618n_i = n_i = N_D$. Check mass action: $np = n_i^2$, since $\phi\cdot(1/\phi) = 1$. Neither limit of [[#prop-doped]] applies here, which is why the full quadratic is needed when the doping is comparable to $n_i$, as happens in nearly pure material or at high temperature.
:::
:::
