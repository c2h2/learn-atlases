Structural geology has one missing link. Stress can be constrained but not measured in a rock; strain can be measured but tells you nothing about force; and between them sits a relation — the **rheology** — that must be supplied from experiment, from observation of the modern Earth, or from assumption. Everything that is argued in this chapter is therefore partly a measurement and partly a choice, and the honest practitioner states which.

The choice matters more than the measurement. A crust that behaves elastically over a second, viscously over a million years and frictionally on a fault plane is not one material but three, and the same rock will be described by a different law depending on how long you are prepared to wait. That is not a difficulty of the subject; it is the subject.

## Elasticity

::: definition Hooke's law and the elastic constants {#def-hooke}
For small strains a rock is linear elastic, and for an isotropic rock the stress–strain relation has two independent constants:
$$
\sigma_{ij} = \lambda\, e_{kk}\,\delta_{ij} + 2\mu\, e_{ij},
$$
where $\mu$ is the **shear modulus** and $\lambda$ the second Lamé parameter. The other names in use are the **bulk modulus** $K = \lambda + \tfrac23\mu$, **Young's modulus** $E$, and **Poisson's ratio** $\nu$, defined as the negative ratio of lateral to axial strain in uniaxial extension. Any two determine all four:
$$
E = 2\mu(1+\nu) = 3K(1-2\nu), \qquad
\nu = \frac{3K - 2\mu}{2(3K+\mu)} .
$$
Typical upper-crustal rocks have $E = 50$–$90\ \mathrm{GPa}$, $\mu = 20$–$35\ \mathrm{GPa}$, $K = 40$–$70\ \mathrm{GPa}$ and $\nu = 0.20$–$0.30$.
:::

::: proof
Take a uniaxial stress $\sigma_{xx} = \sigma$ with all other components zero. The constitutive law gives $\sigma = \lambda(e_{xx}+e_{yy}+e_{zz}) + 2\mu e_{xx}$ and $0 = \lambda(e_{kk}) + 2\mu e_{yy}$, so $e_{yy} = e_{zz} = -\lambda e_{kk}/2\mu$. Substituting into the trace gives $e_{kk} = e_{xx}\,2\mu/(2\mu+3\lambda)$, and hence
$$
e_{yy}/e_{xx} = -\lambda/(2\mu+3\lambda) \equiv -\nu,
\qquad
\sigma/e_{xx} = 2\mu(1+\nu) \equiv E .
$$
Setting $\sigma_{xx} = \sigma_{yy} = \sigma_{zz} = -P$ gives $P = -K e_{kk}$ with $K = \lambda + \tfrac23\mu$, and eliminating $\lambda$ between the two expressions for $E$ gives $E = 3K(1-2\nu)$. Two of the five constants are therefore sufficient, and a rock for which $\nu = \tfrac12$ has an infinite bulk modulus — which is why incompressible plastic flow, discussed below, is the limit $\nu \to \tfrac12$ and not a separate assumption.
:::

::: example How big is an elastic strain? {#ex-elastic}
A differential stress of $100\ \mathrm{MPa}$ is applied to a crustal rock with $E = 70\ \mathrm{GPa}$ and $\nu = 0.25$. Find the axial strain, the shear modulus, the bulk modulus, and the elastic strain energy per cubic metre.
::: solution
The axial strain is $e = \sigma/E = 10^{8}/7\times10^{10} = 1.4\times10^{-3}$, one part in seven hundred. The other constants follow from the relations above:
$$
\mu = \frac{E}{2(1+\nu)} = \frac{70}{2.5} = 28\ \mathrm{GPa}, \qquad
K = \frac{E}{3(1-2\nu)} = \frac{70}{1.5} = 47\ \mathrm{GPa}.
$$
The stored elastic energy density is $\tfrac12\sigma e = \tfrac12\times10^{8}\times1.4\times10^{-3} = 7\times10^{4}\ \mathrm{J\,m^{-3}}$.

Two readings. An elastic strain of $1.4\times10^{-3}$ is at the top of what rocks sustain before they fracture, and it is a thousand times smaller than the strains of one or two per cent that structural geologists measure in the field. **Almost all geological strain is therefore inelastic** — the elastic part is recovered the moment the load is removed, which is why the crust rebounds after an ice sheet melts but no folded layer remembers its elastic strain. And the energy density is the number that matters for earthquakes: a fault zone storing $10^{5}\ \mathrm{J\,m^{-3}}$ over a rupture volume of $100\ \mathrm{km^3}$ holds $10^{16}\ \mathrm{J}$, enough to radiate a large earthquake.
:::
:::

## Viscosity, and the Deborah number

::: definition Newtonian viscosity and the Maxwell time {#def-viscosity}
A **Newtonian fluid** deforms at a rate proportional to the applied stress, with no elastic strain and no yield strength:
$$
\dot{e}_{ij} = \frac{1}{2\eta}s_{ij}, \qquad \dot{e}_{kk} = \frac{\sigma_m}{K} ,
$$
where $\eta$ is the viscosity and $\mathbf{s}$ the deviatoric stress. A material that is elastic with modulus $G$ and viscous with viscosity $\eta$ in series — a **Maxwell body** — relaxes a constant-strain stress over the **Maxwell relaxation time**
$$
\tau_M = \frac{\eta}{G},
$$
and behaves as a solid on times short compared with $\tau_M$ and as a fluid on times long compared with it. The dimensionless measure of this is the **Deborah number**, $\mathrm{De} = \tau_M/t_\text{observation}$.
:::

::: example Is the mantle a solid or a fluid? {#ex-deborah}
Take the upper-mantle shear modulus as $G = 70\ \mathrm{GPa}$ and the viscosity as $10^{21}\ \mathrm{Pa\,s}$; take the asthenosphere viscosity as $5\times10^{19}\ \mathrm{Pa\,s}$. Find the Maxwell time for each, and the Deborah number for (i) a seismic wave of period 1 s, (ii) the post-glacial rebound of Fennoscandia over $10^4$ years, and (iii) mantle convection over $10^8$ years.
::: solution
$$
\tau_M(\text{upper mantle}) = \frac{10^{21}}{7\times10^{10}} = 1.4\times10^{10}\ \mathrm{s} = 450\ \mathrm{yr};
\qquad
\tau_M(\text{asthenosphere}) = 23\ \mathrm{yr}.
$$
The Deborah numbers follow:
$$
\text{(i) seismic:}\quad \mathrm{De} = \frac{1.4\times10^{10}}{1} = 10^{10}; \qquad
\text{(ii) rebound:}\quad \mathrm{De} = \frac{1.4\times10^{10}}{3\times10^{11}} = 0.05; \qquad
\text{(iii) convection:}\quad \mathrm{De} = 4.4\times10^{-6}.
$$
The mantle is therefore an elastic solid to a seismic wave, a viscous fluid to an ice-age cycle, and a very viscous fluid to a convection cell. Nothing about the mantle has changed; only the observation time has. This is the single most important quantitative idea in geological mechanics, and it is why the same peridotite that carries shear waves through 100 km of the upper mantle also flows to close a fold over a million years.
:::
:::

::: widget plot
f: 100*exp(-x)
x: 0, 8
y: 0, 110
labels: \text{stress after } t/\tau_M
caption: The stress in a Maxwell body held at constant strain, decaying as $e^{-t/\tau_M}$ from its initial elastic value. After one relaxation time two-thirds of the stress has gone; after five, 99.3 %. For the upper mantle $\tau_M$ is 450 years, so a stress imposed in a single large earthquake is viscously relaxed in the surrounding mantle within a few thousand years — which is why the mantle beneath a post-seismic region flows on human timescales and why the viscosity of the asthenosphere can be measured from the decades-long signal after a great earthquake as well as from the millennia-long signal of glacial rebound.
:::

::: quiz
Why does the upper mantle, whose viscosity is a thousand trillion times that of water, behave as a fluid over millions of years and as glass over one second?
- [ ] Because its viscosity falls with time as it deforms.
- [x] Because whether a material flows depends on the ratio of its Maxwell relaxation time to the observation time, not on its viscosity alone.
- [ ] Because seismic waves melt a thin film along grain boundaries, so the mantle is only solid in static conditions.
- [ ] Because the mantle is elastic at high stress and viscous at low stress, and seismic waves are low-stress.
::: solution
The Maxwell time $\tau_M = \eta/G$ for upper-mantle peridotite is a few centuries. A seismic wave with a period of one second sees $\mathrm{De} \sim 10^{10}$ and the material responds elastically; convection over $10^8$ years sees $\mathrm{De} \sim 10^{-6}$ and it responds viscously. The viscosity is the same in both cases, and so is the elastic modulus — only the timescale differs. Note that the last option has the stress dependence backwards as well as the mechanism wrong: it is the *strain rate*, not the stress amplitude of a wave, that decides.
:::
:::

## The flow laws of the crust and mantle

::: definition The deformation mechanisms {#def-mechanisms}
A real rock deforms by a sum of mechanisms, each with its own dependence on stress, temperature and grain size:

**Frictional-brittle flow.** On a pre-existing fault, $\tau = \tau_0 + \mu(\sigma_n - P_p)$, essentially independent of temperature and strain rate. New fractures require the Griffith criterion and are rate-dependent.

**Dislocation (power-law) creep.** Diffusion of point defects allows line defects to move through a crystal, so crystals change shape at constant grain size:
$$
\dot{\varepsilon} = A_d\, \sigma^{n}\, \exp\!\left(-\frac{Q^{*} + PV}{RT}\right), \qquad n \approx 3 .
$$
Strongly non-Newtonian, produces lattice-preferred orientations, and is the dominant mechanism in coarse-grained rock at high stress.

**Diffusion (Nabarro–Herring and Coble) creep.** Material diffuses from grain faces under compression to faces under tension, so the aggregate changes shape by grains changing shape:
$$
\dot{\varepsilon} = A_\text{diff}\, \frac{\sigma}{d^{2}}\, \exp\!\left(-\frac{Q}{RT}\right), \qquad n = 1 .
$$
Newtonian, sensitive to grain size as $d^{-2}$ (or $d^{-3}$ for grain-boundary diffusion), and produces no crystallographic fabric.

**Peierls creep.** Low-temperature, strongly stress-dependent glide in a nearly perfect lattice; important only near room temperature for olivine and for the shallowest part of the mantle.
:::

::: example Which mechanism wins? {#ex-mechanism}
For an olivine aggregate at $1200^\circ\mathrm{C}$ with a grain size of $1\ \mathrm{mm}$, take the two flow laws to be
$$
\dot{\varepsilon}_\text{diff} = 4\times10^{-15}\,\sigma\ \ \mathrm{s^{-1}}, \qquad
\dot{\varepsilon}_\text{disl} = 1\times10^{-18}\,\sigma^{3}\ \ \mathrm{s^{-1}},
$$
with $\sigma$ in MPa. Find the stress at which the two are equal, the strain rate each gives at $10\ \mathrm{MPa}$ and at $100\ \mathrm{MPa}$, and the effect of reducing the grain size to $0.1\ \mathrm{mm}$.
::: solution
Equating, $4\times10^{-15}\sigma = 1\times10^{-18}\sigma^{3}$, so $\sigma^{2} = 4\times10^{3}$ and
$$
\sigma_\text{transition} = 63\ \mathrm{MPa}.
$$
At $10\ \mathrm{MPa}$: diffusion gives $4\times10^{-14}\ \mathrm{s^{-1}}$ and dislocation creep $1\times10^{-15}\ \mathrm{s^{-1}}$, so diffusion is forty times faster and dominates. At $100\ \mathrm{MPa}$: diffusion gives $4\times10^{-13}$ and dislocation creep $1\times10^{-12}$, so dislocation creep is two and a half times faster and dominates. The transition is abrupt in the sense that the ratio changes by a factor of a hundred over a factor of ten in stress — which is the whole reason the lithosphere has a brittle–ductile transition at a particular depth rather than a gradual one.

Diffusion creep goes as $d^{-2}$, so reducing the grain size from $1\ \mathrm{mm}$ to $0.1\ \mathrm{mm}$ multiplies the diffusion rate by a hundred and moves the transition to $\sigma^2 = 4\times10^{-13}/10^{-18} = 4\times10^{5}$, or $630\ \mathrm{MPa}$ — a stress no rock sustains. A fine-grained rock therefore deforms by diffusion creep at essentially any geological stress, and this is the mechanism behind **shear-zone self-weakening**: as a rock deforms by dislocation creep it recrystallises to a finer grain size, the finer grain size makes diffusion creep easier, the aggregate weakens, strain concentrates into it, and the grain size falls further. The positive feedback terminates when grain-boundary pinning by a second phase, or the onset of grain growth, arrests the refinement — which is why mylonite zones are a few hundred metres wide and not a few centimetres.
:::
:::

::: history
Elasticity begins with Robert Hooke (Hooke), whose 1678 anagram — *ceiiinosssttuv*, resolved as *ut tensio sic vis*, "as the extension, so the force" — is the first quantitative statement in the mechanics of materials, and it reaches its modern tensor form in Navier, Cauchy and Saint-Venant. Viscosity comes from Newton, who assumed it constant, and its correction from the rheologists of the nineteenth century, whose name for the subject — from the Greek *rheo*, to flow — records the ambition of describing matter without assuming it elastic. Alan Griffith (Griffith) supplied the decisive idea of 1920: that brittle rock fails at a stress a hundred times below its theoretical strength because it contains cracks, and that failure occurs when the elastic energy released by extending a crack exceeds the surface energy created — the origin of fracture mechanics, and the reason a fault can slip at stresses that no intact rock could survive. Geoffrey Jeffreys and, in experiment, Ronald Griggs (Griggs), who built the first gas-medium triaxial machines at UCLA in the 1930s and 1940s, began the programme of deforming rock at controlled temperature and pressure; Mervyn Paterson's (Paterson) monograph of 1978, the product of fifteen years of experiments at Canberra, set the standard for the frictional and brittle regime. The power-law revolution came from materials science in the 1950s and 1960s and from the recognition — by John Christie, by Stephen Goetze, and above all by Ben Avé Lallemant and Toru Shimamoto — that the creep of olivine and quartzite is a diffusion-controlled process with a stress exponent of three, so that the mantle is a non-Newtonian fluid whose viscosity depends on the stress it carries. David Kirby's synthesis of 1983, relating laboratory flow laws to natural folds, mylonites and seismicity, made the extrapolation from furnace to orogen a standard tool, and the argument about its validity has not closed since.
:::

## The strength of the lithosphere

::: example Where is the brittle–ductile transition? {#ex-bdt}
A crust of density $2700\ \mathrm{kg\,m^{-3}}$ with hydrostatic pore pressure has a frictional strength of $10\ \mathrm{MPa}$ per kilometre of depth. Below it, wet quartzite deforms with a flow law that gives a differential stress of $30\ \mathrm{MPa}$ at $300^\circ\mathrm{C}$ and a strain rate of $10^{-14}\ \mathrm{s^{-1}}$, with an activation energy of $135\ \mathrm{kJ\,mol^{-1}}$ and a stress exponent of three. On a $25\ ^\circ\mathrm{C\,km^{-1}}$ geotherm, at what depth does the transition occur, and what is the integrated strength of the column?
::: solution
The ductile strength rises as the rock gets colder:
$$
\sigma_d(z) = 30\ \mathrm{MPa}\times\exp\left[\frac{Q}{3R}\left(\frac{1}{T(z)} - \frac{1}{573\ \mathrm{K}}\right)\right], \qquad \frac{Q}{3R} = \frac{135\,000}{3\times8.314} = 5413\ \mathrm{K}.
$$
Evaluating at $T = 298 + 25z$ in kelvin:
$$
z = 6\ \mathrm{km}:\ \sigma_d = 419\ \mathrm{MPa} \gg 60\ \mathrm{MPa}\ \text{(brittle)};\qquad
z = 10\ \mathrm{km}:\ \sigma_d = 46\ \mathrm{MPa} < 100\ \mathrm{MPa}\ \text{(ductile)}.
$$
The two curves cross at $z = 8.7\ \mathrm{km}$, at $242^\circ\mathrm{C}$. Above it the strength is frictional, below it power-law.

The integrated strength is the area under the strength–depth curve:
$$
\int_0^{8.7}\!\!10z\,\mathrm{d}z = \tfrac12\times87\times8.7 = 379\ \mathrm{MPa\,km}, \qquad
\int_{8.7}^{30}\!\!\sigma_d\,\mathrm{d}z \approx 214\ \mathrm{MPa\,km},
$$
for a total of $5.9\times10^{2}\ \mathrm{MPa\,km} = 5.9\times10^{11}\ \mathrm{N\,m^{-1}}$.

Three things follow. The strength is concentrated in the **brittle upper crust**, which supplies two-thirds of the total from a quarter of the thickness — which is why earthquakes occur in the upper crust and why the ductile lower crust cannot store elastic strain. The profile is a **triangle with its apex at the transition**, the "Christmas tree" shape that is the standard picture of the lithosphere. And the total, $0.6\ \mathrm{TN\,m^{-1}}$, is a *weak* crust: old cratons with a dry, feldspathic lower crust and a $15\ ^\circ\mathrm{C\,km^{-1}}$ geotherm reach several $\mathrm{TN\,m^{-1}}$, and the elastic thickness measured from the bending of plates requires $1$–$10\ \mathrm{TN\,m^{-1}}$. A wet quartz-rich crust at a high geotherm simply cannot carry a load, which is exactly why the Tibetan plateau, the Basin and Range and the Alpine–Himalayan belt are weak, and why the same flow law applied to a cold craton gives the opposite answer.
:::
:::

::: warning Flow laws are extrapolated by ten orders of magnitude
Every flow law used in geology was measured in a laboratory at strain rates of $10^{-4}$ to $10^{-7}\ \mathrm{s^{-1}}$ and differential stresses of $10^{2}$ to $10^{3}\ \mathrm{MPa}$, and is applied to nature at $10^{-12}$ to $10^{-16}\ \mathrm{s^{-1}}$ and $1$–$30\ \mathrm{MPa}$. The extrapolation is by eight to twelve orders of magnitude in strain rate, and it rests on the assumption that the mechanism — the same dislocation glide, the same diffusion path — is the same in both. Sometimes it is not. At low stress, dislocation creep in olivine and in feldspar shows a threshold or transition to a much lower stress exponent; water content, which controls the strength of quartz by as much as two orders of magnitude, is difficult to control in an experiment and impossible to know for a rock that has recrystallised; and the flow of a fine-grained polyphase aggregate involves grain-boundary sliding and solution transfer that no single-crystal law captures.
:::

## Where this leads

The stresses these laws resist are set out in [[structural-geology/stress]]; the strains they produce in [[structural-geology/strain]]; the folds that a viscosity contrast produces in [[structural-geology/folds]]; the shear zones in which strain localisation terminates in [[structural-geology/shear-zones]]; and the flexure of the lithosphere under surface loads in [[geophysics/flexure]].

::: summary
- A rock is elastic on short timescales, with two independent constants; typical crustal values are $E \approx 70\ \mathrm{GPa}$, $\mu \approx 28\ \mathrm{GPa}$, $K \approx 47\ \mathrm{GPa}$, $\nu \approx 0.25$.
- Elastic strains at geological stresses are of order $10^{-3}$, so essentially all measured geological strain is inelastic.
- Whether the mantle is solid or fluid depends only on the Deborah number: the Maxwell time of the upper mantle is a few centuries.
- Deformation mechanisms differ in their dependence on stress, grain size and temperature; the transition from diffusion to dislocation creep occurs at tens of megapascals for millimetre grains.
- Grain-size-sensitive weakening is the positive feedback that localises strain into mylonite zones.
- The lithosphere's strength is a triangle peaked at the brittle–ductile transition, which in a wet crust at a high geotherm lies at 8–10 km.
- All flow laws are extrapolated by many orders of magnitude from the laboratory to nature, and their uncertainties are correspondingly large.
:::

## Exercises

::: exercise Elastic constants {level=1 check="28"}
A rock has $E = 70\ \mathrm{GPa}$ and $\nu = 0.25$. Find the shear modulus in GPa.
::: solution
$\mu = E/[2(1+\nu)] = 70/2.5 = 28\ \mathrm{GPa}$.
:::
:::

::: exercise Poisson's ratio {level=1 check="0.25"}
A rock has $K = 47\ \mathrm{GPa}$ and $\mu = 28\ \mathrm{GPa}$. Find $\nu$.
::: solution
$\nu = (3K-2\mu)/[2(3K+\mu)] = (141-56)/[2(141+28)] = 85/338 = 0.25$. A Poisson ratio of one half would mean an incompressible material, and rubbers approach it; rocks do not.
:::
:::

::: exercise Maxwell time {level=1 check="23"}
Find the Maxwell time, in years, of the asthenosphere with $\eta = 5\times10^{19}\ \mathrm{Pa\,s}$ and $G = 70\ \mathrm{GPa}$.
::: solution
$\tau_M = 5\times10^{19}/7\times10^{10} = 7.1\times10^{8}\ \mathrm{s} = 23\ \mathrm{yr}$. The asthenosphere is a solid for anything that happens in less than a decade and a fluid for anything that takes longer — which is why it transmits shear waves and yet lets continents drift.
:::
:::

::: exercise Power-law leverage {level=2 check="3.1"}
A rock deforms by a power law with $n = 3$. By what factor does the stress increase if the strain rate is increased by a factor of thirty?
::: solution
$\sigma \propto \dot{\varepsilon}^{1/n} = 30^{1/3} = 3.11$. The point of the exercise is that a power-law material is nearly indifferent to how fast it is strained: a thirtyfold change in rate is worth a factor of three in stress, whereas for a Newtonian material it would be a factor of thirty. This is why the same microstructure is found over a wide range of tectonic settings.
:::
:::

::: exercise Grain-size sensitivity {level=2 check="100"}
By what factor does the diffusion-creep strain rate change if the grain size falls from $200\ \mu\mathrm{m}$ to $20\ \mu\mathrm{m}$ at constant stress?
::: solution
Diffusion creep goes as $d^{-2}$, so the rate increases by $(200/20)^2 = 100$. A single order of magnitude in grain size is worth two in strain rate, and this is the strongest single argument for grain-size weakening in shear zones. Coble (grain-boundary) creep goes as $d^{-3}$ and would give a factor of a thousand.
:::
:::

::: exercise Mechanism map {level=2}
A mylonite contains dynamically recrystallised grains of $5\ \mu\mathrm{m}$ and a strong crystallographic preferred orientation. Why is that combination diagnostic?
::: solution
Grain-size-sensitive diffusion creep and grain-boundary sliding produce **no** crystallographic fabric, because the grains change shape by adding and removing atoms rather than by operating slip systems. A strong lattice-preferred orientation can only be produced by dislocation creep. Finding both together means the deformation was **composite**: dislocation creep on the coarse fraction or in the interconnected phase produced the fabric, while diffusion creep accommodated part of the strain in the fine matrix. The observation constrains the flow to have occurred near the diffusion–dislocation transition, at stresses of tens of megapascals, and it is one of the few field observations that tests a flow law directly.
:::
:::

::: exercise Brittle–ductile transition {level=2 check="8.7"}
Using the flow law of [[#ex-bdt]], at what depth does the frictional strength of $10\ \mathrm{MPa\,km^{-1}}$ cross the ductile strength of wet quartzite at a strain rate of $10^{-14}\ \mathrm{s^{-1}}$ and a $25\ ^\circ\mathrm{C\,km^{-1}}$ geotherm? Give your answer in km.
::: solution
$8.7\ \mathrm{km}$, at $217^\circ\mathrm{C}$. Above it the crust fails by frictional sliding and stores elastic strain; below it it creeps and cannot. The depth of the transition is therefore the depth of the deepest earthquakes. The calculation above gives 8.7 km because it assumes a very wet quartz-rich crust and a high geotherm; with a drier crust and a $15\ ^\circ\mathrm{C\,km^{-1}}$ profile the transition moves to 20 km and $300^\circ\mathrm{C}$, which is where continental seismicity actually stops. The agreement of the transition depth, the $300^\circ\mathrm{C}$ isotherm and the crossing of the two laboratory-derived strength curves is the primary evidence that this picture is roughly right.
:::
:::

::: exercise Effect of a colder crust {level=3}
Repeat the strength calculation of [[#ex-bdt]] for a geotherm of $15\ ^\circ\mathrm{C\,km^{-1}}$ and a dry feldspathic crust whose ductile strength is $100\ \mathrm{MPa}$ at $300^\circ\mathrm{C}$ with $n = 3$ and $Q = 250\ \mathrm{kJ\,mol^{-1}}$. Estimate the new transition depth and the change in integrated strength.
::: solution
Now $Q/3R = 250\,000/24.94 = 10\,024\ \mathrm{K}$ and $T = 298 + 15z$. The ductile strength is
$$
\sigma_d(z) = 100\,\exp\left[10\,024\left(\frac{1}{298+15z} - \frac{1}{573}\right)\right]\ \mathrm{MPa}.
$$
At $z = 15\ \mathrm{km}$, $T = 523\ \mathrm{K}$ and the exponent is $10\,024\times1.668\times10^{-4} = 1.67$, so $\sigma_d = 532\ \mathrm{MPa}$ against a frictional strength of $150\ \mathrm{MPa}$ — still brittle. At $z = 25\ \mathrm{km}$, $T = 673\ \mathrm{K}$, the exponent is $-0.51$ and $\sigma_d = 60\ \mathrm{MPa}$ against $250\ \mathrm{MPa}$ — ductile. The crossing is near $21\ \mathrm{km}$, at about $310^\circ\mathrm{C}$.

The integrated strength of the brittle part alone is $\tfrac12\times210\times21 = 2205\ \mathrm{MPa\,km}$, nearly six times the wet-crust value, and the total column strength is of order $3\ \mathrm{TN\,m^{-1}}$. A cold, dry crust is therefore several times stronger than a hot, wet one of the same thickness, and the difference is larger than any plausible uncertainty in the flow law. This is the quantitative content of the observation that old, cold continental interiors support long-wavelength loads for hundreds of millions of years while young, hot orogens cannot support a single seamount.
:::
:::

::: exercise Folding as a rheometer {level=3}
A competent layer of viscosity $\eta_1$ and thickness $h$ in a matrix of viscosity $\eta_m$ develops folds of wavelength $\lambda = 2\pi h(\eta_1/6\eta_m)^{1/3}$ at the onset of buckling (Biot–Ramberg). A limestone bed of $h = 0.30\ \mathrm{m}$ in shale shows a dominant wavelength of $1.9\ \mathrm{m}$. Estimate the viscosity ratio, and explain why the estimate is only as good as the assumption that the observed wavelength is the *dominant* one.
::: solution
Rearranging, $\eta_1/\eta_m = 6\left(\dfrac{\lambda}{2\pi h}\right)^{3} = 6\left(\dfrac{1.9}{1.885}\right)^{3} = 6\times1.024 = 6.1$.

The estimate is fragile in three ways. The formula gives the wavelength of **maximum growth rate at the onset** of buckling; as shortening continues, folds grow and interact, and wavelengths increase by folding-of-folding and by layer-parallel shortening, so an observed wavelength is generally larger than the initial one and the viscosity ratio is overestimated. The layer must be more competent than the matrix by a factor of at least a few for the theory to apply, and if the contrast was produced by a difference in pore pressure or in lithology that has since been equalised, the ratio is not recoverable. And the theory assumes a Newtonian matrix: if the shale deformed by frictional sliding or by pressure solution, the exponent $1/3$ becomes something else and the whole scaling changes.

The honest statement is that the layer was between three and thirty times more viscous than its matrix, which is a real and useful constraint — and that folding is a better rheometer for the *ratio* than for the *absolute* viscosity of anything.
:::
:::

::: exercise Volume and mass {level=3}
A limestone deforms by pressure solution: insoluble residue accumulates in stylolite seams that occupy 8 per cent of the rock volume, and the rock shortens perpendicular to the seams. Assuming the insoluble fraction was originally 2 per cent and that the volume of the insoluble residue is conserved, find the shortening and the volume loss.
::: solution
Let the initial rock have unit volume, of which $0.02$ is insoluble residue. After deformation the residue occupies $0.08$ of the new volume $V$, and its own volume is unchanged:
$$
0.08\,V = 0.02 \quad\Longrightarrow\quad V = 0.25 .
$$
The rock has lost 75 % of its volume. If the shortening is perpendicular to the seams and the bed has stayed the same length and width, the shortening equals the volume loss, so the bed has been shortened to a quarter of its original thickness — a stretch of $\lambda = 0.25$ and a natural strain of $\ln 0.25 = -1.39$.

The result is startling and it is real: stylolitic limestones in fold belts do lose most of their volume, and the arithmetic is why. It also means that a fold interpreted as the product of 75 % layer-parallel shortening may have been shortened by 10 % mechanically and by 65 % chemically, and that the difference cannot be recovered from the geometry of the fold alone. Pressure solution is the mechanism that makes the assumption of constant volume, used in almost every strain calculation in this course, wrong — and the way to test it is exactly this residue calculation.
:::
:::
