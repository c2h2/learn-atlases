A suspension of cadmium selenide crystals two nanometres across is green; the same compound as crystals five nanometres across is red; bulk cadmium selenide is black. Gold particles twenty nanometres across are ruby red in water, as Michael Faraday found in 1857, and glassmakers had used the effect, without knowing it, for centuries. A sheet of carbon one atom thick conducts electrons as if they had no mass. A ten-nanometre particle of magnetite has no permanent magnetisation at room temperature, although bulk magnetite is a strong magnet. In each case the *size* of the material, not just its composition and structure, has become a variable that sets its properties.

This chapter explains why. Two kinds of size effect operate. **Surface effects** arise because a large fraction of the atoms in a small particle are at its surface, with fewer neighbours and higher energy; they lower melting points, raise solubility and drive catalysis. **Quantum and electromagnetic confinement effects** arise when the particle is smaller than a characteristic length of the bulk material, such as the radius of an exciton, the mean free path of an electron or the thickness of a magnetic domain wall. We develop both, then describe how nanoparticles are made by controlled nucleation and growth, and survey the carbon nanomaterials and two-dimensional solids. Bands, gaps and effective masses come from [[materials-chemistry/electronic-structure-solids]].

::: definition Nanomaterial {#def-nano}
A **nanomaterial** has at least one external dimension, or an internal structure, in the size range of roughly $1$–$100\ \mathrm{nm}$. **Nanoparticles** are small in all three dimensions (zero-dimensional, 0D: quantum dots, metal clusters); **nanowires** and **nanotubes** in two (1D); **nanosheets** in one (2D: graphene, $\mathrm{MoS_2}$ monolayers). For regulatory purposes the European Union defines a nanomaterial, as of 2026, as a material in which at least 50 % of the particles by number have one or more external dimensions between $1$ and $100\ \mathrm{nm}$ (Commission Recommendation of 2022, revising that of 2011). The definition is a convention: the size at which properties change depends on the property and on the material.
:::

## Surface effects

::: proposition The surface fraction of a nanoparticle {#prop-surface}
In a spherical particle of radius $R$ made of atoms of diameter $d$, the fraction of atoms in the outermost shell of thickness $d$ is
$$
f_\mathrm{s} = 1 - \left(1 - \frac{d}{R}\right)^3 \approx \frac{3d}{R} \quad (R \gg d).
$$ {#eq-surface}
The estimate treats the particle as a continuum of uniform density; real clusters of "magic" sizes (closed-shell cuboctahedra or icosahedra of 13, 55, 147, 309 … atoms) have surface fractions that can be counted exactly.
:::

::: proof
The atoms not at the surface fill a sphere of radius $R - d$. With uniform density, the number of atoms is proportional to the volume, so the fraction in the interior is $(R - d)^3/R^3 = (1 - d/R)^3$, and the surface fraction is one minus this. For $d \ll R$, the binomial expansion $(1 - d/R)^3 \approx 1 - 3d/R$ gives $f_\mathrm{s} \approx 3d/R$; this is also the surface-to-volume ratio $4\pi R^2/(\tfrac43\pi R^3) = 3/R$ multiplied by the shell thickness $d$.
:::

::: example How much of a gold nanoparticle is surface? {#ex-surface}
Gold atoms have a diameter of about $0.288\ \mathrm{nm}$. Calculate the surface fraction for gold particles of diameter $2$, $5$ and $20\ \mathrm{nm}$, and compare the exact and approximate forms of [[#eq-surface]].
::: solution
With $R = 1.0$, $2.5$ and $10\ \mathrm{nm}$: $d/R = 0.288$, $0.1152$ and $0.0288$. Exact: $1 - (0.712)^3 = 0.639$; $1 - (0.8848)^3 = 0.307$; $1 - (0.9712)^3 = 0.084$. Approximate ($3d/R$): $0.86$, $0.35$, $0.086$. So about 64 % of the atoms in a $2\ \mathrm{nm}$ gold particle are at its surface, 31 % at $5\ \mathrm{nm}$ and 8 % at $20\ \mathrm{nm}$. The approximation is good only when $d/R$ is small; below about $3\ \mathrm{nm}$ use the exact form, or count atoms in a cluster model. Since catalysis happens at surface atoms, and the cost of a precious-metal catalyst is set by the total mass, small particles are economically decisive: but below about $2\ \mathrm{nm}$ the electronic structure itself changes, and gold, inert in bulk, becomes an active oxidation catalyst (Masatake Haruta, 1987).
:::
:::

Surface atoms raise the Gibbs energy of a particle by $\gamma A$, where $\gamma$ is the surface energy and $A$ the area. For a sphere this adds $2\gamma V_\mathrm{m}/R$ to the molar Gibbs energy, the same Laplace-pressure term that appeared in the Kelvin equation ([[materials-chemistry/porous-materials#prop-kelvin]]). Three consequences follow. Small particles are **more soluble** than large ones (the Ostwald–Freundlich equation, $\ln(s_R/s_\infty) = 2\gamma V_\mathrm{m}/RTR$), so in a suspension the small particles dissolve and the large ones grow (**Ostwald ripening**), coarsening any nanoparticle dispersion unless growth is blocked by ligands. Small particles **melt at lower temperatures** (the Gibbs–Thomson effect, roughly $\Delta T_\mathrm{m}/T_\mathrm{m} \approx 2\sigma_\mathrm{sl}/\Delta_\mathrm{fus}H_V R$, with $\sigma_\mathrm{sl}$ the solid–liquid interfacial energy and $\Delta_\mathrm{fus}H_V$ the enthalpy of fusion per volume): Philippe Buffat and Jean-Pierre Borel showed in 1976 that gold particles $2\ \mathrm{nm}$ across melt several hundred kelvin below bulk gold. And the **structure** may change: small particles can adopt icosahedral or decahedral shapes that are impossible in a periodic crystal but have lower surface energy.

## Making nanoparticles: nucleation and growth

Most nanoparticles are made in solution by generating a supersaturated solution of the "monomer" (atoms or molecular units of the product), from which particles nucleate and grow. Control of size and size distribution depends on separating these two stages.

::: proposition Classical nucleation theory {#prop-nucleation}
A spherical nucleus of radius $r$ forming from a solution of supersaturation $S$ (the ratio of the actual to the equilibrium concentration) has Gibbs energy of formation
$$
\Delta G(r) = -\frac{4\pi r^3}{3}\,\Delta g_V + 4\pi r^2\gamma, \qquad \Delta g_V = \frac{k_\mathrm{B}T\ln S}{\Omega},
$$ {#eq-nucleation}
where $\gamma$ is the interfacial energy and $\Omega$ the volume per monomer in the solid. $\Delta G$ has a maximum at the **critical radius** $r^*$, and the **nucleation barrier** is $\Delta G^*$:
$$
r^* = \frac{2\gamma}{\Delta g_V} = \frac{2\gamma\Omega}{k_\mathrm{B}T\ln S}, \qquad \Delta G^* = \frac{16\pi\gamma^3}{3\Delta g_V^2} = \frac{16\pi\gamma^3\Omega^2}{3(k_\mathrm{B}T\ln S)^2}.
$$ {#eq-critical}
The nucleation rate is proportional to $\exp(-\Delta G^*/k_\mathrm{B}T)$. The theory treats tiny clusters as macroscopic spheres with bulk $\gamma$, and is qualitatively right but often quantitatively wrong by orders of magnitude.
:::

::: proof
Transferring one monomer from a solution of supersaturation $S$ to the bulk solid lowers its chemical potential by $k_\mathrm{B}T\ln S$ (the difference between $\mu = \mu^\circ + k_\mathrm{B}T\ln c$ at $c$ and at the equilibrium concentration, for an ideal solution). A nucleus of volume $\tfrac43\pi r^3$ contains $\tfrac43\pi r^3/\Omega$ monomers, which gives the volume term; creating its surface costs $4\pi r^2\gamma$. Setting $d\Delta G/dr = -4\pi r^2\Delta g_V + 8\pi r\gamma = 0$ gives $r^* = 2\gamma/\Delta g_V$, and substituting back, $\Delta G^* = -\tfrac43\pi(2\gamma/\Delta g_V)^3\Delta g_V + 4\pi(2\gamma/\Delta g_V)^2\gamma = (-\tfrac{32}{3} + 16)\pi\gamma^3/\Delta g_V^2 = 16\pi\gamma^3/3\Delta g_V^2$. Nuclei smaller than $r^*$ tend to redissolve; larger ones tend to grow. Note that $r^*$ is exactly the radius at which a particle is in (unstable) equilibrium with a solution of supersaturation $S$ according to the Ostwald–Freundlich equation.
:::

::: widget plot
f: -4.19*x^3*s*1.895 + 12.57*x^2*1.0
x: 0, 2.5
y: -10, 12
sliders: s=1:0.3:3:0.01
labels: \Delta G(r)\ /\ 10^{-19}\ \mathrm{J}
caption: The nucleation free energy [[#eq-nucleation]] against nucleus radius $x$ (nm) for illustrative values $\gamma = 0.10\ \mathrm{J\,m^{-2}}$, $\Omega = 5\times10^{-29}\ \mathrm{m^3}$ and $T = 298\ \mathrm{K}$, where $s = \log_{10}S$ (slider) sets the supersaturation; $s = 1$ ($S = 10$) gives $\Delta g_V = 1.895\times10^8\ \mathrm{J\,m^{-3}}$. The surface term ($4\pi r^2\gamma$) dominates for small nuclei and the volume term for large ones. Raising the supersaturation lowers and shifts the maximum to smaller radius: at $S = 10$ the critical radius is $1.06\ \mathrm{nm}$ and the barrier about $110\,k_\mathrm{B}T$; at $S = 100$, $0.53\ \mathrm{nm}$ and $28\,k_\mathrm{B}T$. Because the rate depends exponentially on the barrier, nucleation switches on abruptly above a critical supersaturation.
:::

The strong dependence of the barrier on $S$ is the key to making uniform particles. In the model of Victor LaMer and Robert Dinegar (1950), the monomer concentration rises until it crosses the critical supersaturation, a short **burst of nucleation** follows, and the concentration falls below the critical level, so that no new nuclei form. The existing nuclei then grow together from the remaining monomer. Because growth by diffusion slows as particles enlarge, small particles catch up with large ones and the size distribution narrows ("focusing"), until ripening sets in when the monomer runs out. The **hot-injection** method of Christopher Murray, David Norris and Moungi Bawendi (1993) achieves the burst by injecting cold organometallic precursors into a hot coordinating solvent; nucleation is immediate and brief, and growth at a lower temperature, stopped at the desired time, gives CdSe quantum dots with size distributions of a few per cent. **Ligands** that bind to the surface (trioctylphosphine oxide, oleic acid, thiols, citrate) control growth rates on different faces and hence shape, stop aggregation and make the particles dispersible. Gold sols are made by reducing tetrachloridoaurate(III) with citrate in boiling water (John Turkevich, 1951) or with borohydride in a two-phase system with thiols (Mathias Brust and David Schiffrin, 1994).

::: example Critical nuclei {#ex-nucleus}
For the illustrative values in the figure ($\gamma = 0.10\ \mathrm{J\,m^{-2}}$, $\Omega = 5.0\times10^{-29}\ \mathrm{m^3}$, $T = 298\ \mathrm{K}$), calculate $r^*$, the number of monomers in the critical nucleus and $\Delta G^*/k_\mathrm{B}T$ for $S = 10$ and $S = 100$. By what factor does the nucleation rate change between them, if the pre-exponential factor is unchanged?
::: solution
For $S = 10$: $\Delta g_V = 1.381\times10^{-23} \times 298 \times \ln10/5.0\times10^{-29} = 1.895\times10^8\ \mathrm{J\,m^{-3}}$, $r^* = 2 \times 0.10/1.895\times10^8 = 1.06\times10^{-9}\ \mathrm{m}$, and the nucleus contains $\tfrac43\pi(1.06\times10^{-9})^3/5.0\times10^{-29} = 99$ monomers. $\Delta G^* = 16\pi(0.10)^3/[3(1.895\times10^8)^2] = 4.67\times10^{-19}\ \mathrm{J} = 113\,k_\mathrm{B}T$. For $S = 100$, $\ln S$ doubles, so $r^*$ halves to $0.53\ \mathrm{nm}$ (12 monomers) and $\Delta G^*$ falls by a factor of 4 to $28\,k_\mathrm{B}T$. The rate ratio is $\exp(113 - 28) = e^{85} \approx 10^{37}$: at $S = 10$ nucleation effectively never happens, at $S = 100$ it happens readily. The numbers are only indicative, because $\gamma$ for a cluster of a dozen units is not the bulk value, but the extreme sensitivity to $S$ is real.
:::
:::

## Quantum dots

When a semiconductor crystal is smaller than the natural size of an electron–hole pair (an **exciton**), the electron and hole are squeezed, their kinetic energies rise, and the optical gap increases. The relevant length is the exciton Bohr radius $a_\mathrm{B} = \varepsilon_\mathrm{r}(m_e/\mu)a_0$, with $\mu$ the reduced effective mass, the same scaling as for the hydrogenic donor of [[materials-chemistry/electronic-structure-solids#prop-hydrogenic]]; for CdSe it is about $5.6\ \mathrm{nm}$.

::: proposition The Brus equation {#prop-brus}
For a spherical semiconductor crystallite of radius $R$ in the strong-confinement regime ($R \lesssim a_\mathrm{B}$), the lowest excitation energy is approximately
$$
E(R) = E_\mathrm{g} + \frac{\hbar^2\pi^2}{2R^2}\left(\frac{1}{m_\mathrm{e}^*} + \frac{1}{m_\mathrm{h}^*}\right) - \frac{1.786\,e^2}{4\pi\varepsilon_0\varepsilon_\mathrm{r}R},
$$ {#eq-brus}
where $E_\mathrm{g}$ is the bulk gap, $m_\mathrm{e}^*$ and $m_\mathrm{h}^*$ the effective masses and $\varepsilon_\mathrm{r}$ the relative permittivity. The model assumes parabolic bands, an infinite potential barrier at the surface and a continuum dielectric; it overestimates the gap of very small dots, where the bands are non-parabolic and the barrier finite.
:::

::: proof
In the effective-mass approximation the electron and the hole each behave as a free particle of mass $m^*$ confined in a sphere with impenetrable walls. The lowest state of a particle in a sphere has wavefunction $\sin(\pi r/R)/r$ and energy $\hbar^2\pi^2/2m^*R^2$ ([[quantum-chemistry/model-systems]]), the three-dimensional analogue of the particle in a box. Adding the electron's and the hole's confinement energies to the bulk gap gives the first two terms. Electron and hole attract each other through the screened Coulomb interaction $-e^2/4\pi\varepsilon_0\varepsilon_\mathrm{r}r_\mathrm{eh}$; averaging over the product of the two ground-state densities gives $\langle1/r_\mathrm{eh}\rangle = 1.786/R$, which yields the third term. Because the confinement term grows as $1/R^2$ and the Coulomb term only as $1/R$, confinement wins for small $R$ and the gap opens as the dot shrinks.
:::

::: widget plot
f: g + 0.376*(1/m + 1/h)/x^2 - 1.786*1.44/(10.6*x)
x: 1, 6
y: 1.5, 3.5
sliders: g=1.74:0.5:3.5:0.01; m=0.13:0.05:0.5:0.01; h=0.45:0.1:1.0:0.01
hlines: 1.77; 3.1
labels: E(R)\ /\ \mathrm{eV}
caption: The Brus equation [[#eq-brus]] for the lowest excitation energy against dot radius $x$ (nm). Constants: $\hbar^2\pi^2/2m_e = 0.376\ \mathrm{eV\,nm^2}$ and $e^2/4\pi\varepsilon_0 = 1.44\ \mathrm{eV\,nm}$, with $\varepsilon_\mathrm{r} = 10.6$; sliders set the bulk gap $g$ (eV) and the effective masses $m$ and $h$ (in units of $m_e$), defaulting to CdSe. The horizontal lines mark the visible range, $1.77$–$3.1\ \mathrm{eV}$ ($700$–$400\ \mathrm{nm}$). As the radius falls from $5$ to $1.5\ \mathrm{nm}$ the gap sweeps across the whole visible spectrum, which is how a single material provides every colour of a quantum-dot display. Light effective masses (InP, InAs) give stronger confinement.
:::

::: example The colour of CdSe quantum dots {#ex-brus}
For CdSe take $E_\mathrm{g} = 1.74\ \mathrm{eV}$, $m_\mathrm{e}^* = 0.13\,m_e$, $m_\mathrm{h}^* = 0.45\,m_e$ and $\varepsilon_\mathrm{r} = 10.6$. Calculate the lowest excitation energy and wavelength for dots of radius $2.0\ \mathrm{nm}$ and $3.0\ \mathrm{nm}$.
::: solution
Confinement term: $(\hbar^2\pi^2/2m_e)(1/0.13 + 1/0.45)/R^2 = 0.376 \times 9.915/R^2 = 3.728/R^2\ \mathrm{eV}$ with $R$ in nm. Coulomb term: $1.786 \times 1.440/(10.6R) = 0.2426/R\ \mathrm{eV}$. For $R = 2.0\ \mathrm{nm}$: $E = 1.74 + 0.932 - 0.121 = 2.55\ \mathrm{eV}$, $\lambda = 1240/2.55 = 486\ \mathrm{nm}$. For $R = 3.0\ \mathrm{nm}$: $E = 1.74 + 0.414 - 0.081 = 2.07\ \mathrm{eV}$, $598\ \mathrm{nm}$. The smaller dots absorb (and, with a small Stokes shift, emit) blue-green light, the larger orange. Measured absorption maxima for CdSe dots of these sizes are at somewhat longer wavelengths (about $520$ and $600\ \mathrm{nm}$) because the model overestimates confinement in small dots. Because the dots are smaller than $a_\mathrm{B} = 5.6\ \mathrm{nm}$, strong confinement is a reasonable approximation.
:::
:::

Quantum dots are used as the colour-converting layers of display backlights, where their narrow emission lines give saturated colours; as fluorescent labels in biology (with protective shells and coatings); and in experimental solar cells and photodetectors. Commercial dots increasingly use InP or perovskite compositions rather than cadmium compounds, because cadmium is toxic and its use in electronics is restricted. The best emitters have a shell of a wider-gap semiconductor (CdSe/ZnS core–shell dots) that removes surface states, which otherwise trap carriers and quench the luminescence. Alexei Ekimov (1981, in glass), Louis Brus (1983–84, in colloids) and Moungi Bawendi (1993, hot injection) shared the 2023 Nobel Prize in Chemistry for the discovery and synthesis of quantum dots.

::: warning Smaller is not simply "more of the same surface" {#warn-nano}
Two opposite errors are common. One treats a nanoparticle as a piece of bulk material with a bit more surface, so that all its properties scale smoothly with surface area; this misses the qualitative changes that set in when the particle is smaller than a physical length scale (exciton radius, electron mean free path, magnetic domain size), such as the blue shift of quantum dots or superparamagnetism. The other attributes every unusual property to "quantum effects"; but the colour of gold nanoparticles is a classical electromagnetic resonance, and the catalytic activity of small particles often comes from their low-coordinated surface atoms rather than from quantised levels. Identify which length scale is being crossed.
:::

## Metal nanoparticles and plasmons

The colour of a gold or silver sol comes from a **localised surface plasmon resonance**: the collective oscillation of the conduction electrons against the positive ions, driven by the electric field of light. Because the particle is much smaller than the wavelength, the field is nearly uniform across it, and a quasi-static calculation suffices.

::: proposition The plasmon resonance of a small sphere {#prop-plasmon}
A sphere of radius $R \ll \lambda$ with dielectric function $\varepsilon(\omega)$, in a medium of permittivity $\varepsilon_\mathrm{m}$, has polarisability
$$
\alpha = 4\pi\varepsilon_0R^3\,\frac{\varepsilon - \varepsilon_\mathrm{m}}{\varepsilon + 2\varepsilon_\mathrm{m}},
$$ {#eq-polarisability}
which is resonantly large when $\mathrm{Re}\,\varepsilon(\omega) = -2\varepsilon_\mathrm{m}$ (the **Fröhlich condition**). For a metal described by the Drude form $\varepsilon(\omega) = \varepsilon_\infty - \omega_\mathrm{p}^2/\omega^2$, the resonance occurs at $\omega_\mathrm{sp} = \omega_\mathrm{p}/\sqrt{\varepsilon_\infty + 2\varepsilon_\mathrm{m}}$, independent of size in this approximation. It applies for $R$ of about $5$–$50\ \mathrm{nm}$; larger particles show retardation (red-shift and broadening), smaller ones extra damping from surface scattering.
:::

::: proof
In a uniform applied field $E_0$, solve Laplace's equation inside and outside the sphere with continuity of the potential and of the normal component of $\varepsilon\mathbf{E}$ at the surface. The solution, as in any electrostatics text, has a uniform field inside, $E_\mathrm{in} = 3\varepsilon_\mathrm{m}E_0/(\varepsilon + 2\varepsilon_\mathrm{m})$, and outside the applied field plus that of a point dipole $p = 4\pi\varepsilon_0\varepsilon_\mathrm{m}R^3[(\varepsilon - \varepsilon_\mathrm{m})/(\varepsilon + 2\varepsilon_\mathrm{m})]E_0$, which gives [[#eq-polarisability]] (with the medium factor absorbed into the definition of $\alpha$). Both the internal field and the dipole diverge when the denominator vanishes; with a complex $\varepsilon$, the imaginary part limits the peak, and absorption peaks where $\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$. Inserting the Drude form, $\varepsilon_\infty - \omega_\mathrm{p}^2/\omega^2 = -2\varepsilon_\mathrm{m}$ gives $\omega^2 = \omega_\mathrm{p}^2/(\varepsilon_\infty + 2\varepsilon_\mathrm{m})$.
:::

For gold, with roughly $\hbar\omega_\mathrm{p} \approx 9.0\ \mathrm{eV}$ and $\varepsilon_\infty \approx 9.5$ (which represents the $d$-band electrons), in water ($\varepsilon_\mathrm{m} = n^2 = 1.78$) the resonance lies near $\hbar\omega = 9.0/\sqrt{13.06} = 2.49\ \mathrm{eV}$, about $500\ \mathrm{nm}$ (observed: $520\ \mathrm{nm}$). Absorbing green light, the sol looks red. Silver, with a smaller $\varepsilon_\infty$, resonates near $400\ \mathrm{nm}$ and looks yellow. Because the resonance depends on $\varepsilon_\mathrm{m}$, it shifts when molecules bind to the particle surface, the basis of colorimetric tests such as the gold-nanoparticle lateral-flow strips used in pregnancy and antigen tests, and of plasmonic sensors. Rods, shells and particle pairs move the resonance into the red and near infrared, and the intense local fields at plasmonic particles enhance Raman scattering of adsorbed molecules by factors of $10^6$ or more (surface-enhanced Raman spectroscopy). The fourth-century Roman Lycurgus cup, green in reflected and red in transmitted light, contains silver–gold nanoparticles.

::: quiz
Which changes would shift the plasmon absorption of spherical gold nanoparticles in water to longer wavelength?
- [x] Transferring the particles to a solvent of higher refractive index
- [ ] Shrinking the particles from 20 nm to 10 nm, in the quasi-static model
- [x] Letting the particles aggregate into closely spaced clusters
- [x] Coating the particles with a dense shell of adsorbed protein
::: solution
The resonance condition $\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$ moves to lower frequency (longer wavelength) as $\varepsilon_\mathrm{m}$ increases, so a higher-index solvent or a dense adsorbed layer red-shifts it. Aggregation couples the plasmons of neighbouring particles, giving a new red-shifted band (the sol turns from red to purple-blue, the readout of many gold-nanoparticle assays). In the quasi-static model the resonance does not depend on size, so shrinking a sphere from $20$ to $10\ \mathrm{nm}$ hardly moves it (it broadens slightly).
:::
:::

### Magnetic nanoparticles

A ferromagnetic or ferrimagnetic particle smaller than about $20$–$100\ \mathrm{nm}$ cannot accommodate a domain wall and is a single domain. Its whole moment points along an easy axis, and to reverse it must cross an anisotropy barrier $KV$, where $K$ is the anisotropy energy density and $V$ the volume. The Néel relaxation time is $\tau = \tau_0\exp(KV/k_\mathrm{B}T)$ with $\tau_0 \approx 10^{-9}\ \mathrm{s}$. When $\tau$ is shorter than the time of a measurement, the moment flips freely and the particles behave like a paramagnet with enormous moments, **superparamagnetism**: no remanence, no coercivity, but a very large susceptibility. The **blocking temperature** $T_\mathrm{B} = KV/[k_\mathrm{B}\ln(\tau_\mathrm{m}/\tau_0)]$ separates the two regimes. Superparamagnetic iron oxide particles are used as MRI contrast agents, in magnetic separation of cells and proteins, and in experimental magnetic hyperthermia; in data storage, the same physics sets the minimum size of a stable magnetic bit (the "superparamagnetic limit").

## Carbon nanomaterials and two-dimensional solids

Carbon forms an extraordinary family of nanostructures from $sp^2$ networks. **Fullerenes**, closed cages such as $\mathrm{C_{60}}$ (twelve pentagons and twenty hexagons, the shape of a football), were discovered by Harold Kroto, Robert Curl, Richard Smalley and co-workers in 1985 in laser-vaporised graphite (Nobel Prize 1996) and made in bulk by Wolfgang Krätschmer and Donald Huffman in 1990. **Carbon nanotubes**, reported by Sumio Iijima in 1991, are graphene sheets rolled into seamless cylinders. **Graphene**, a single layer of graphite, was isolated by mechanical exfoliation and its electronic properties measured by Andre Geim, Konstantin Novoselov and co-workers in 2004 (Nobel Prize in Physics 2010).

Graphene's band structure is unique. The $\pi$ and $\pi^*$ bands, built from the $p_z$ orbitals of its two-atom honeycomb cell much as in [[materials-chemistry/electronic-structure-solids#prop-tight-binding]], touch at the corners of the hexagonal Brillouin zone, where the Fermi level lies. Near these **Dirac points** the energy is linear in wavevector, $E = \pm\hbar v_\mathrm{F}\lvert\mathbf{k}\rvert$ with $v_\mathrm{F} \approx 1\times10^6\ \mathrm{m\,s^{-1}}$, as for a massless relativistic particle, rather than quadratic as for ordinary electrons. Graphene is thus a semimetal with zero gap and very high carrier mobility; it is also the strongest material measured, impermeable to gases, and an excellent thermal conductor.

::: definition Chiral vector of a carbon nanotube {#def-chirality}
A single-walled nanotube is specified by the **chiral vector** $\mathbf{C}_h = n\mathbf{a}_1 + m\mathbf{a}_2$ of the graphene lattice (lattice constant $a = \lvert\mathbf{a}_1\rvert = 0.246\ \mathrm{nm}$), which becomes the circumference when the sheet is rolled up. The tube diameter is
$$
d = \frac{a\sqrt{n^2 + nm + m^2}}{\pi}.
$$ {#eq-cnt}
Tubes $(n, n)$ are **armchair**, $(n, 0)$ **zigzag**, and others **chiral**. In the simple zone-folding picture, a tube is metallic if $n - m$ is divisible by 3 and semiconducting otherwise, with a gap inversely proportional to its diameter (about $0.8\ \mathrm{eV}/d$ in nm); curvature opens a small gap in non-armchair "metallic" tubes.
:::

::: example Which nanotubes conduct? {#ex-cnt}
Find the diameter and the electronic character of the $(10, 10)$, $(10, 0)$, $(12, 0)$ and $(6, 5)$ nanotubes.
::: solution
By [[#eq-cnt]]: $(10, 10)$: $\sqrt{300} = 17.32$, $d = 0.246 \times 17.32/\pi = 1.36\ \mathrm{nm}$, $n - m = 0$: metallic (armchair, truly metallic). $(10, 0)$: $d = 0.246 \times 10/\pi = 0.783\ \mathrm{nm}$, $n - m = 10$, not divisible by 3: semiconducting, gap about $0.8/0.78 \approx 1.0\ \mathrm{eV}$. $(12, 0)$: $d = 0.940\ \mathrm{nm}$, $n - m = 12$: metallic in zone folding (in fact a small curvature gap of tens of meV). $(6, 5)$: $\sqrt{91} = 9.54$, $d = 0.747\ \mathrm{nm}$, $n - m = 1$: semiconducting, about $1.1\ \mathrm{eV}$. Statistically about one-third of tubes are metallic. The $(6, 5)$ tube, which emits near $980\ \mathrm{nm}$, is among the most abundant in some syntheses. Separating tubes by chirality (by density-gradient ultracentrifugation, chromatography or selective polymer wrapping) remains a central problem for nanotube electronics.
:::
:::

Graphene opened the field of **two-dimensional materials**. Hexagonal boron nitride is its insulating analogue ($E_\mathrm{g} \approx 6\ \mathrm{eV}$), used as an atomically flat substrate and encapsulant. The transition-metal dichalcogenides such as $\mathrm{MoS_2}$, $\mathrm{WS_2}$ and $\mathrm{WSe_2}$ have the layered structures of [[materials-chemistry/crystal-structures]]; bulk $\mathrm{MoS_2}$ has an indirect gap of about $1.2\ \mathrm{eV}$, but a single layer has a direct gap near $1.9\ \mathrm{eV}$ and luminesces strongly, a striking dimensional effect reported in 2010. Black phosphorus (phosphorene) has a thickness-tunable gap; the **MXenes**, transition-metal carbides and nitrides such as $\mathrm{Ti_3C_2T}_x$ made by etching the A layer out of MAX phases (first reported by Michael Naguib, Yury Gogotsi, Michel Barsoum and co-workers in 2011), are metallic, hydrophilic and studied for energy storage. Stacks of different 2D layers, held by van der Waals forces, form heterostructures with designed properties, including the superconductivity of graphene bilayers twisted by about $1.1^\circ$ (2018).

Nanomaterials raise questions of safety and environmental fate that their bulk counterparts do not. Their high surface area makes them more reactive and, for some, more toxic; inhaled fibres with the shape of long, rigid nanotubes can behave in the lung like asbestos; and nanoparticles of silver, zinc oxide and titanium dioxide released from consumer products enter waste water. Risk assessment considers composition, size, shape, surface coating, solubility and exposure route, and the regulation of nanomaterials under chemical and cosmetics legislation, including the definitions above, continues to evolve as of 2026.

## Where this leads

Nanomaterials connect nearly every chapter of this course. Their syntheses use the solution and vapour methods of [[materials-chemistry/solid-synthesis]], their sizes are measured by Scherrer broadening ([[materials-chemistry/diffraction]]) and microscopy, their confinement effects follow from [[materials-chemistry/electronic-structure-solids]], and their magnetism from [[materials-chemistry/magnetic-optical]]. Nanostructured electrodes, catalysts and absorbers are central to [[materials-chemistry/energy-materials]]; supported metal nanoparticles are the active phase of most catalysts in [[organometallics-catalysis/heterogeneous-catalysis]]; and the hazards and fate of engineered nanoparticles are treated in [[environmental-chemistry/pollutants-fate]].

::: history
Michael Faraday's 1857 Bakerian Lecture described "fine particles" of gold as the cause of the colours of gold sols, and Gustav Mie gave the electromagnetic theory of light scattering by spheres in 1908; Richard Zsigmondy's ultramicroscope (1903) made colloidal particles visible (Nobel Prize 1925). Richard Feynman's 1959 lecture "There's plenty of room at the bottom" anticipated atomic-scale engineering. Alexei Ekimov observed size-dependent absorption of CuCl nanocrystals in glass in 1981, Louis Brus described the size dependence of colloidal semiconductor crystallites in 1983–84, and Murray, Norris and Bawendi's hot-injection synthesis appeared in 1993 (Nobel Prize 2023). Fullerenes (1985), carbon nanotubes (1991) and graphene (2004) followed one another as each new form of carbon was found. LaMer and Dinegar's nucleation model (1950), Turkevich's citrate method (1951) and the Brust–Schiffrin synthesis (1994) remain the foundations of colloidal nanoparticle chemistry.
:::

::: summary
- Nanomaterials have dimensions of roughly $1$–$100\ \mathrm{nm}$; properties change when size is comparable to a physical length scale of the bulk material.
- The surface fraction of a sphere is $1 - (1 - d/R)^3 \approx 3d/R$; surface energy raises solubility (Ostwald ripening) and lowers melting points (Gibbs–Thomson), and small particles can be catalytically special.
- Classical nucleation theory gives $r^* = 2\gamma\Omega/k_\mathrm{B}T\ln S$ and $\Delta G^* \propto \gamma^3/(\ln S)^2$; uniform particles need a brief nucleation burst followed by growth (LaMer, hot injection) and surface ligands.
- Quantum dots smaller than the exciton Bohr radius have gaps $E_\mathrm{g} + (\hbar^2\pi^2/2R^2)(1/m_\mathrm{e}^* + 1/m_\mathrm{h}^*) - 1.786e^2/4\pi\varepsilon_0\varepsilon_\mathrm{r}R$ (Brus), tuning their colour across the visible.
- Metal nanoparticles show localised surface plasmon resonances where $\mathrm{Re}\,\varepsilon = -2\varepsilon_\mathrm{m}$ (gold about $520\ \mathrm{nm}$), sensitive to the surroundings and to aggregation.
- Single-domain magnetic particles become superparamagnetic above a blocking temperature $T_\mathrm{B} \approx KV/k_\mathrm{B}\ln(\tau_\mathrm{m}/\tau_0)$.
- Graphene has linear (Dirac) bands and no gap; nanotubes $(n, m)$ are metallic if $n - m$ is divisible by 3; monolayer $\mathrm{MoS_2}$ is a direct-gap semiconductor unlike the bulk.
:::

## Exercises

::: exercise Surface fraction {level=1 check="0.472"}
Using [[#eq-surface]] with $d = 0.288\ \mathrm{nm}$, calculate the exact surface fraction of a gold particle $3.0\ \mathrm{nm}$ in diameter. (Enter the fraction to three significant figures.)
::: solution
$R = 1.5\ \mathrm{nm}$, $d/R = 0.192$, $f_\mathrm{s} = 1 - 0.808^3 = 1 - 0.5275 = 0.472$. The approximation $3d/R$ would give $0.58$.
:::
:::

::: exercise A nanotube diameter {level=1 check="0.747"}
Calculate the diameter of a $(6, 5)$ carbon nanotube and say whether it is metallic or semiconducting. (Enter $d$ in nm, to three significant figures.)
::: solution
$d = 0.246\sqrt{36 + 30 + 25}/\pi = 0.246 \times 9.539/3.1416 = 0.747\ \mathrm{nm}$. $n - m = 1$ is not divisible by 3: semiconducting.
:::
:::

::: exercise Specific surface area of graphene {level=1 check="2630"}
Graphene has two carbon atoms per hexagonal cell of area $\tfrac{\sqrt3}{2}a^2$, with $a = 0.246\ \mathrm{nm}$. Calculate its theoretical specific surface area, counting both faces. (Enter the area in $\mathrm{m^2\,g^{-1}}$, to three significant figures.)
::: solution
Area per atom $= \tfrac{\sqrt3}{2}(0.246\times10^{-9})^2/2 = 2.620\times10^{-20}\ \mathrm{m^2}$. Atoms per gram $= 6.022\times10^{23}/12.011 = 5.014\times10^{22}$. Two faces: $2 \times 5.014\times10^{22} \times 2.620\times10^{-20} = 2630\ \mathrm{m^2\,g^{-1}}$. This is the benchmark against which porous carbons and MOFs ([[materials-chemistry/porous-materials]]) are compared; stacking or wrinkling of real graphene powders reduces the accessible area.
:::
:::

::: exercise Quantum-dot colour {level=2 check="554"}
Use the Brus equation with the CdSe parameters of [[#ex-brus]] to find the lowest excitation wavelength for a dot of radius $2.5\ \mathrm{nm}$. (Enter $\lambda$ in nm, to three significant figures.)
::: solution
Confinement: $3.728/2.5^2 = 0.597\ \mathrm{eV}$; Coulomb: $0.2426/2.5 = 0.097\ \mathrm{eV}$. $E = 1.74 + 0.597 - 0.097 = 2.239\ \mathrm{eV}$, $\lambda = 1239.8/2.239 = 554\ \mathrm{nm}$ (green-yellow).
:::
:::

::: exercise Superparamagnetic blocking {level=2 check="16"}
Magnetite nanoparticles $10\ \mathrm{nm}$ in diameter have an anisotropy constant $K = 1.1\times10^4\ \mathrm{J\,m^{-3}}$. Taking $\tau_0 = 1\times10^{-9}\ \mathrm{s}$ and a measurement time of $100\ \mathrm{s}$, estimate the blocking temperature. What happens if the diameter doubles? (Enter $T_\mathrm{B}$ in K for the $10\ \mathrm{nm}$ particles, two significant figures.)
::: solution
$V = \tfrac{\pi}{6}(10^{-8})^3 = 5.24\times10^{-25}\ \mathrm{m^3}$, $KV/k_\mathrm{B} = 1.1\times10^4 \times 5.24\times10^{-25}/1.381\times10^{-23} = 417\ \mathrm{K}$, and $\ln(100/10^{-9}) = 25.3$, so $T_\mathrm{B} = 417/25.3 = 16\ \mathrm{K}$. At room temperature these particles are superparamagnetic. Doubling the diameter multiplies $V$ by 8: $T_\mathrm{B} \approx 130\ \mathrm{K}$, still superparamagnetic at room temperature. (Measured blocking temperatures are usually higher, because surface and shape anisotropy raise the effective $K$ and particles interact.)
:::
:::

::: exercise Plasmon of silver in water {level=2 check="371"}
For silver take $\hbar\omega_\mathrm{p} = 9.0\ \mathrm{eV}$ and $\varepsilon_\infty = 3.7$ in the Drude form. Find the quasi-static plasmon wavelength of small silver spheres in water ($\varepsilon_\mathrm{m} = 1.78$). (Enter the wavelength in nm, to three significant figures.)
::: solution
$\hbar\omega_\mathrm{sp} = 9.0/\sqrt{3.7 + 3.56} = 9.0/2.694 = 3.34\ \mathrm{eV}$; $\lambda = 1239.8/3.340 = 371\ \mathrm{nm}$. Observed silver sols absorb near $400\ \mathrm{nm}$; the simple Drude parameters underestimate the influence of interband transitions, but the model correctly places silver well to the blue of gold.
:::
:::

::: exercise The barrier and the supersaturation {level=3 check="0.25"}
(a) Derive $r^*$ and $\Delta G^*$ in [[#eq-critical]]. (b) By what factor does $\Delta G^*$ change when the supersaturation is raised from $S = 10$ to $S = 100$? (c) Show that $\Delta G^* = \tfrac13 \times$ (surface energy of the critical nucleus). (Enter the factor in (b).)
::: solution
(a) As in the proof of [[#prop-nucleation]]. (b) $\Delta G^* \propto 1/(\ln S)^2$; $\ln100 = 2\ln10$, so the barrier falls by a factor of 4: the factor is $0.25$. (c) The surface energy of the critical nucleus is $4\pi r^{*2}\gamma = 4\pi(2\gamma/\Delta g_V)^2\gamma = 16\pi\gamma^3/\Delta g_V^2$, exactly three times $\Delta G^*$. The volume term pays back two-thirds of the surface cost at the critical size.
:::
:::

::: exercise Melting of gold nanoparticles {level=3 check="218"}
(a) For a solid sphere of radius $R$ in equilibrium with its melt, show by balancing the extra chemical potential $2\sigma_\mathrm{sl}V_\mathrm{m}/R$ against $\Delta_\mathrm{fus}H\,\Delta T/T_\mathrm{m}$ that $\Delta T = 2\sigma_\mathrm{sl}T_\mathrm{m}/(\Delta_\mathrm{fus}H_VR)$, with $\Delta_\mathrm{fus}H_V$ the enthalpy of fusion per unit volume. (b) For gold, $T_\mathrm{m} = 1337\ \mathrm{K}$, $\Delta_\mathrm{fus}H = 12.55\ \mathrm{kJ\,mol^{-1}}$, $M = 196.97\ \mathrm{g\,mol^{-1}}$, $\rho = 19.3\ \mathrm{g\,cm^{-3}}$; take $\sigma_\mathrm{sl} = 0.20\ \mathrm{J\,m^{-2}}$ (an illustrative value within the reported range). Estimate the melting-point depression for $R = 2.0\ \mathrm{nm}$. (Enter $\Delta T$ in K, three significant figures.)
::: hint
Near $T_\mathrm{m}$ the Gibbs energy of melting per mole is $\Delta_\mathrm{fus}G \approx \Delta_\mathrm{fus}H(1 - T/T_\mathrm{m})$.
:::
::: solution
(a) The small solid has a raised molar Gibbs energy, $G_\mathrm{s}(R) = G_\mathrm{s}(\infty) + 2\sigma_\mathrm{sl}V_\mathrm{m}/R$. It melts when $G_\mathrm{l} = G_\mathrm{s}(R)$, i.e. when $\Delta_\mathrm{fus}G = G_\mathrm{l} - G_\mathrm{s}(\infty) = 2\sigma_\mathrm{sl}V_\mathrm{m}/R$. With $\Delta_\mathrm{fus}G \approx \Delta_\mathrm{fus}H(T_\mathrm{m} - T)/T_\mathrm{m}$, $\Delta T = 2\sigma_\mathrm{sl}V_\mathrm{m}T_\mathrm{m}/(\Delta_\mathrm{fus}HR) = 2\sigma_\mathrm{sl}T_\mathrm{m}/(\Delta_\mathrm{fus}H_VR)$, since $\Delta_\mathrm{fus}H/V_\mathrm{m} = \Delta_\mathrm{fus}H_V$. (b) $\Delta_\mathrm{fus}H_V = 12\,550 \times 19.3\times10^6/196.97 = 1.230\times10^9\ \mathrm{J\,m^{-3}}$. $\Delta T = 2 \times 0.20 \times 1337/(1.230\times10^9 \times 2.0\times10^{-9}) = 534.8/2.460 = 217.5\ \mathrm{K} \approx 218\ \mathrm{K}$. The particle would melt near $1120\ \mathrm{K}$. Buffat and Borel's experiments found depressions of this order; the simple model becomes unreliable at the smallest sizes, where $\sigma_\mathrm{sl}$ itself depends on size.
:::
:::

::: exercise Critical nucleus size {level=2 check="1.06"}
For $\gamma = 0.10\ \mathrm{J\,m^{-2}}$, $\Omega = 5.0\times10^{-29}\ \mathrm{m^3}$, $T = 298\ \mathrm{K}$ and $S = 10$, calculate the critical radius. (Enter $r^*$ in nm, to three significant figures.)
::: solution
$r^* = 2\gamma\Omega/(k_\mathrm{B}T\ln S) = 2 \times 0.10 \times 5.0\times10^{-29}/(1.381\times10^{-23} \times 298 \times 2.303) = 1.0\times10^{-29}/9.475\times10^{-21} = 1.06\times10^{-9}\ \mathrm{m} = 1.06\ \mathrm{nm}$.
:::
:::
