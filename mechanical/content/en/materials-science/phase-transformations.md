The phase diagram tells you what the end state is. This lesson is about why you do not get there, how long it takes, and what you get instead. Every transformation of a solid — a eutectoid splitting, a precipitate appearing, a grain nucleating in a cold-worked bar, a martensite plate forming in a quench — is a competition between a driving force that grows with undercooling and an atomic mobility that falls as the temperature drops, and a time-temperature-transformation diagram is that competition plotted against temperature.

The consequences are the ones a heat treater lives by. A low-alloy steel such as 4340 can be given a yield strength anywhere from about $500$ to well over $1{,}500\ \mathrm{MPa}$ from one composition and one austenitising treatment, because the transformation can be routed around the diagram to pearlite, to bainite or to martensite and the martensite then tempered. An aluminium alloy's aging curve has a peak because small precipitates are cut by dislocations and large ones are bypassed, and the two strengthening laws cross. And a recrystallisation anneal is a race between nucleation, which wants many small grains, and growth, which consumes the deformed matrix before more grains can appear.

::: warning Equilibrium is the destination and never the itinerary
Three traps are specific to this lesson. **A time-temperature-transformation (TTT) diagram is measured on isothermal holds and a continuous-cooling-transformation (CCT) diagram on cooling ramps, and the two do not agree** — the continuous-cooling curves lie to the right and at lower temperatures, because during a ramp the steel spends only part of its time at each temperature. Reading a cooling curve against a TTT diagram therefore over-predicts the diffusional products. **The martensite start and finish temperatures are not sharp**: $M_s$ is the temperature at which the first detectable martensite forms, and in high-carbon steels the temperature at which transformation is essentially complete, $M_f$, lies below room temperature, which is why a high-carbon tool steel as quenched contains retained austenite that can transform later and change the part's dimensions. And **a Johnson-Mehl-Avrami-Kolmogorov exponent $n$ fitted to kinetic data is a diagnosis, not a mechanism**: the same $n = 1.5$ is produced by diffusion-controlled growth from a fixed population of nuclei and by mixtures of other cases, and the only way to tell them apart is to look at the microstructure and count the nuclei.
:::

## Nucleation

::: definition Homogeneous nucleation {#def-homog}
Forming a spherical nucleus of radius $r$ of a new phase costs interfacial energy and releases bulk free energy:
$$
\Delta G \left( r \right) = 4 \pi r^{2} \gamma - \frac{4}{3} \pi r^{3} \Delta G_{v} ,
$$
which peaks at the **critical radius** and **activation barrier**
$$
r^{*} = \frac{2 \gamma}{\Delta G_{v}}, \qquad
\Delta G^{*} = \frac{16 \pi \gamma^{3}}{3 \Delta G_{v}^{2}} .
$$
The volumetric driving force for a transformation undercooled by $\Delta T$ below the equilibrium temperature is approximately
$$
\Delta G_{v} \approx \frac{\Delta H_{f}}{V_{m}} \frac{\Delta T}{T_m} ,
$$
so the barrier goes as $1 / \Delta T^{2}$. The nucleation rate per unit volume is $I \approx N \nu \exp \left( - \Delta G^{*} / k T \right)$, with $N \approx 10^{29}\ \mathrm{m^{-3}}$ atomic sites and an attempt frequency $\nu \approx 10^{13}\ \mathrm{s^{-1}}$ (for a solid-state transformation a diffusion term $\exp(-Q/RT)$ multiplies it). The prefactor is so large, about $10^{42}\ \mathrm{m^{-3}\, s^{-1}}$, that one nucleus per second in a cubic millimetre ($10^{9}\ \mathrm{m^{-3}\, s^{-1}}$) needs $\Delta G^{*} \approx \ln 10^{33}\, kT \approx 76\ kT$; because the barrier falls as $1/\Delta T^{2}$, the rate switches from negligible to enormous over a narrow range of undercooling.
:::

::: definition Heterogeneous nucleation and the wetting angle {#def-hetero}
Nucleation as a spherical cap on a flat substrate of contact angle $\theta$ reduces the barrier by a purely geometric factor:
$$
\Delta G^{*}_{\mathrm{het}} = \Delta G^{*}_{\mathrm{hom}} f ( \theta ) , \qquad
f ( \theta ) = \frac{\left( 2 + \cos \theta \right) \left( 1 - \cos \theta \right)^{2}}{4} .
$$
Complete wetting, $\theta = 0$, gives $f = 0$ and no barrier at all; $\theta = 60^{\circ}$ gives $f = 0.156$; $\theta = 180^{\circ}$ recovers the homogeneous case. Since $\Delta G^{*}_{\mathrm{hom}} \propto 1/\Delta T^{2}$, the undercooling needed to reach a given barrier scales as $\sqrt{f}$: a substrate with $\theta = 60^{\circ}$ reaches the same nucleation rate at $0.40$ of the homogeneous undercooling, and one with $\theta = 20^{\circ}$ ($f = 0.0027$) at about $0.05$ of it — a twentieth.
**The engineering consequences.** A casting is grain-refined by adding particles whose lattice matches the solid closely — $\mathrm{TiB_2}$ and $\mathrm{Al_3 Ti}$ in aluminium (the Al-Ti-B master alloys), cobalt aluminate on the mould face of investment-cast nickel superalloys — and the effect of the addition is to provide substrates with a small $\theta$. In steel weld metal, fine titanium-bearing oxide inclusions nucleate **intragranular acicular ferrite**, the fine interlocking microstructure that gives a good weld metal its toughness. And in a low-alloy steel the preferred **ferrite nucleation sites** are the austenite grain boundaries, which is why the austenite grain size controls both the transformation rate and the final ferrite grain size.
:::

::: widget plot
f: (2+cos(x))*(1-cos(x))^2/4
x: 0, 3.14159
y: 0, 1.05
labels: f(theta)
caption: The heterogeneous nucleation factor against the wetting angle in radians ($\pi$ rad $= 180^{\circ}$). Notice that the curve is flat near $\theta = 180^{\circ}$ and falls steeply towards zero: improving the wetting angle from $170^{\circ}$ to $150^{\circ}$ lowers the barrier by barely one per cent, while taking it from $60^{\circ}$ to $20^{\circ}$ cuts it by a factor of about sixty. A grain refiner either supplies a well-wetted substrate or does very little.
:::

::: definition Growth, and the two rate laws {#def-growth}
Once a nucleus exceeds $r^{*}$ it grows, and the rate is set by whichever process is slower.
**Interface-controlled** growth is linear in time, $x = v t$, with a velocity $v = v_0 \exp \left( - Q / RT \right) \left[ 1 - \exp \left( - \Delta G_{m} / RT \right) \right]$ that is the product of an atomic mobility and a driving-force term; it applies to polymorphic changes, recrystallisation and massive transformations.
**Diffusion-controlled** growth, in which the solute must be carried to or away from the interface, is parabolic, $x = \alpha \sqrt{D t}$. The constant $\alpha$ depends on the supersaturation $\Omega = \left( \bar{c} - c_{\alpha} \right) / \left( c_{\beta} - c_{\alpha} \right)$; for a planar precipitate at small supersaturation $\alpha \approx 2 \Omega / \sqrt{\pi}$ (Zener's linearised solution), so $\alpha$ is of order $0.1$ to $1$ for realistic alloys.
The C shape of a transformation diagram follows from these laws: at small undercooling the driving force is small and nucleation is rare; at large undercooling the driving force is large but diffusion is slow; the **nose** of the C-curve is the temperature at which the product of the two gives the shortest transformation time.
**Dendritic growth** in a solidifying alloy selects a tip radius $R$ and velocity $v$ related by $R^{2} v \approx$ constant (the marginal-stability result), and the secondary arm spacing grows with the local solidification time as $\lambda_{2} \propto t_f^{1 / 3}$, which lets a metallographer read a casting's local cooling rate from a micrograph.
:::

::: definition The Johnson-Mehl-Avrami-Kolmogorov law {#def-jmak}
For a transformation by nucleation and growth with nuclei placed at random in a large specimen, the transformed fraction is
$$
X = 1 - \exp \left( - b t^{n} \right) ,
$$
where $b$ contains the nucleation and growth rates and the **Avrami exponent** $n$ reflects the mechanism (after J. W. Christian's tabulation):
$$
\begin{array}{l c c}
\text{growth} & \text{constant nucleation rate} & \text{site saturation} \\
\text{interface-controlled, 3-D (spheres)} & 4 & 3 \\
\text{interface-controlled, 2-D (discs)} & 3 & 2 \\
\text{interface-controlled, 1-D (needles)} & 2 & 1 \\
\text{diffusion-controlled, 3-D} & 2.5 & 1.5 \\
\text{diffusion-controlled thickening of large plates} & \text{—} & 0.5
\end{array}
$$
A constant nucleation rate adds one to the site-saturated exponent for interface control and one half for diffusion control. Non-integer values in between report a nucleation rate that decays with time or a mixture of mechanisms.
The **$t_{50} / t_{99}$ ratio** depends only on $n$, not on $b$:
$$
\frac{t_{50}}{t_{99}} = \left( \frac{\ln 2}{\ln 100} \right)^{1 / n} = 0.1505^{1 / n} = 0.15,\ 0.28,\ 0.39,\ 0.53,\ 0.62
$$
for $n = 1, 1.5, 2, 3, 4$. A small $n$ means a long tail: a transformation that is half done in a seventh of the time it takes to be $99\ \%$ done has $n \approx 1$ (growth from fixed sites in one dimension), while one that reaches half-completion at nearly two thirds of the total time has $n \approx 4$ (continuous nucleation with three-dimensional growth).
:::

::: proof The Avrami exponent {#proof-avrami}
Let nuclei appear at a constant rate $\dot N$ per unit volume and grow as spheres of radius $v t$. The **extended** volume fraction — the fraction the new phase would occupy if regions could grow through each other and nuclei could form inside transformed material — is
$$
X_e = \int_0^{t} \dot N \frac{4}{3} \pi v^{3} \left( t - \tau \right)^{3} \mathrm{d} \tau = \frac{\pi}{3} \dot N v^{3} t^{4} .
$$
**The impingement correction.** If nuclei are placed at random, a fraction $X$ of every increment of extended volume falls on already-transformed material and contributes nothing, so the true increment is the extended increment multiplied by the untransformed fraction:
$$
\mathrm{d} X = \left( 1 - X \right) \mathrm{d} X_e
\quad\Longrightarrow\quad
\ln \frac{1}{1 - X} = X_e
\quad\Longrightarrow\quad
\boxed{ X = 1 - \exp \left( - \tfrac{\pi}{3} \dot N v^{3} t^{4} \right) } . \quad \checkmark
$$
**The other exponents follow immediately.** Site saturation — a fixed number $N_s$ of nuclei all active at $t = 0$ — gives $X_e = \frac{4}{3} \pi N_s v^{3} t^{3}$ and $n = 3$; growth restricted to discs of fixed thickness gives $X_e \propto N_s v^{2} t^{2}$ and $n = 2$; needles of fixed cross-section give $n = 1$; and continuous nucleation adds one to each, giving $n = 4, 3, 2$. For diffusion-controlled growth each linear dimension grows as $\sqrt{t}$ rather than $t$, which halves the growth contribution to the exponent: $n = 3/2$ for site-saturated spheres and $5/2$ with constant nucleation.
**Where it fails.** The derivation assumes nuclei are placed at random in an infinite specimen. Real nucleation is often **correlated**: nuclei form on grain boundaries, which are a network rather than a volume. Cahn (1956) showed that a boundary-nucleated transformation starts with the bulk exponent and, once the boundaries are saturated, falls to $n = 1$ as the boundary layers thicken towards each other, so the apparent exponent depends on which part of the curve is fitted and must be read together with a micrograph.
:::

## The transformation diagram

::: definition TTT and CCT {#def-ttt}
A time-temperature-transformation diagram plots the start and finish of a transformation against log time at each isothermal hold below the equilibrium temperature. Its **C** shape follows from the competition described above: just below the equilibrium temperature the driving force is small, and far below it diffusion is slow. For a eutectoid plain-carbon steel the pearlite nose lies at about $540\ {}^{\circ}\mathrm{C}$, where transformation begins in roughly one second.
A continuous-cooling-transformation diagram replaces the hold with a cooling ramp and moves the curves to longer times and lower temperatures. Its practical use is the **critical cooling rate** — the slowest cooling that misses the diffusional products and gives fully martensitic structure. For a eutectoid plain-carbon steel it is about $140\ {}^{\circ}\mathrm{C / s}$; for a $4340$ (Ni-Cr-Mo) steel it is under $10\ {}^{\circ}\mathrm{C / s}$ (Callister and Rethwisch quote about $8\ {}^{\circ}\mathrm{C / s}$); and maraging steels form martensite even on air cooling of thick sections. Alloying for **hardenability** is alloying to move the CCT curves to the right.
:::

::: definition Bainite {#def-bainite}
Bainite forms in the temperature range between pearlite and martensite. It consists of fine ferrite plates or laths, typically $0.1$ to $0.5\ \mu\mathrm{m}$ thick, with carbide between or within them: **upper bainite**, formed above roughly $350\ {}^{\circ}\mathrm{C}$ in plain-carbon steels, has cementite between the laths; **lower bainite**, formed below, has carbides inside the ferrite plates, aligned at about $55$ to $60^{\circ}$ to the plate axis. Its mechanism has been argued over since the 1930s: in the displacive view (Bhadeshia) the ferrite grows by a shear transformation without diffusion of substitutional atoms and the carbon is rejected afterwards, which explains the **incomplete-reaction phenomenon** — the transformation stops before the equilibrium fraction is reached, at the composition where austenite and ferrite of the same composition have equal free energy (the $T_0$ curve).
**Why it matters.** Because the lath width acts as a very fine grain size and the carbide is dispersed rather than lamellar, a bainitic structure is generally stronger and tougher than a pearlitic one of the same composition. Silicon additions suppress the carbide and leave carbon-enriched retained austenite between the laths; such **carbide-free bainitic** steels are used in advanced high-strength automotive sheet and in rails.
:::

::: definition Martensite {#def-martensite}
Martensite forms by a **diffusionless** transformation: the parent lattice changes to the product by a coordinated movement of atoms over less than one interatomic spacing, so the product has the parent's composition exactly. In steels the transformation is essentially **athermal** — the amount formed depends on how far below $M_s$ the steel is cooled, not on the time spent there — and individual plates grow at a large fraction of the speed of sound.
**The start temperature.** Andrews' empirical linear relation (1965) for low-alloy steels, with compositions in weight per cent, is
$$
M_s \left[ {}^{\circ}\mathrm{C} \right] = 539 - 423\, \mathrm{C} - 30.4\, \mathrm{Mn} - 12.1\, \mathrm{Cr} - 17.7\, \mathrm{Ni} - 7.5\, \mathrm{Mo} ,
$$
fitted to steels with up to about $0.6\ \%$ carbon. Carbon dominates: extrapolated to a $0.8\ \%$ plain-carbon steel it gives $M_s = 539 - 338 = 201\ {}^{\circ}\mathrm{C}$.
**The fraction.** The **Koistinen-Marburger** relation (1959) gives the martensite fraction as a function of undercooling below $M_s$,
$$
f = 1 - \exp \left[ - \beta \left( M_s - T \right) \right], \qquad \beta \approx 0.011\ \mathrm{K^{- 1}} ,
$$
so a quench to $M_s - 100\ \mathrm{K}$ gives $67\ \%$ martensite and $95\ \%$ needs $272\ \mathrm{K}$ of undercooling — below room temperature for any steel with $M_s$ under about $290\ {}^{\circ}\mathrm{C}$.
**The hardness.** The hardness of fresh martensite is set almost entirely by its carbon content, because the carbon trapped in the lattice distorts it to body-centred tetragonal: about $50\ \mathrm{HRC}$ at $0.2\ \%$ carbon rising to about $65\ \mathrm{HRC}$ at $0.6$ to $0.8\ \%$, above which retained austenite stops further gains. Alloying elements contribute little to the as-quenched hardness; their role is to slow the diffusional transformations (hardenability), to lower $M_s$, and to control the response to tempering.
**The strain.** A martensite plate produces an **invariant plane strain** on its habit plane — a shear of about $0.2$ plus a dilatation of a few per cent — and the shape change is accommodated by internal twinning or slip. In high-carbon plate martensite, plates impinging on one another create **microcracks**, one reason high-carbon steels are prone to quench cracking.
:::

::: definition Coarsening and the aging curve {#def-lsw}
Once a precipitate population has stopped nucleating, it reduces its total interfacial area by **Ostwald ripening**: small particles dissolve because the Gibbs-Thomson effect raises the solubility around them, and large ones grow. For volume-diffusion control in the dilute limit the **Lifshitz-Slyozov-Wagner** (LSW) result is
$$
\bar{r}^{3} - \bar{r}_0^{3} = K t , \qquad K = \frac{8 \gamma D c_{e} V_{m}}{9 R T \left( c_{p} - c_{e} \right)} ,
$$
where $c_e$ is the equilibrium solubility of the solute in the matrix, $c_p$ its concentration in the precipitate (both in the same units), $V_m$ the molar volume of the precipitate and $D$ the solute diffusivity. The mean radius grows as $t^{1 / 3}$, and the Orowan bypass stress, which goes as $1 / r$, decays as $t^{- 1 / 3}$. Combined with the cutting stage, in which the strength rises roughly as $r^{1 / 2}$, this gives the **aging curve** — a peak near the radius at which the cutting and bypass stresses are equal, and a slow decay after it.
**The distribution.** The LSW size distribution approaches a fixed self-similar shape, peaked at about $1.13\, \bar{r}$ and cut off sharply at $1.5\, \bar{r}$. Measured distributions are broader and more symmetric; modified theories attribute the difference to the finite volume fraction, which leaves the $t^{1/3}$ law intact but increases $K$.
:::

::: example How cold a metal must be to freeze without a substrate {#ex-nucleation}
Estimate the undercooling at which pure copper nucleates homogeneously at one event per second in a $1\ \mathrm{mm^{3}}$ droplet, and compare with the undercooling achieved in experiments.
::: solution
**The constants.** Solid-liquid interfacial energy $\gamma = 0.177\ \mathrm{J / m^{2}}$ (Turnbull's value), $T_m = 1358\ \mathrm{K}$, $\Delta H_{f} = 13.1\ \mathrm{kJ / mol}$, $V_{m} = 7.11 \times 10^{- 6}\ \mathrm{m^{3} / mol}$.
**The driving force per kelvin of undercooling.**
$$
\frac{\Delta G_{v}}{\Delta T} = \frac{\Delta H_{f}}{V_{m} T_m} = \frac{13{,}100}{7.11 \times 10^{- 6} \times 1358} = 1.36 \times 10^{6}\ \mathrm{J\, m^{- 3}\, K^{- 1}} .
$$
**The criterion.** One event per second in $10^{-9}\ \mathrm{m^{3}}$ is a rate of $10^{9}\ \mathrm{m^{-3}\, s^{-1}}$; with a prefactor of $10^{42}\ \mathrm{m^{-3}\, s^{-1}}$ this needs $\Delta G^{*} = 76\ kT$. Guessing that nucleation happens near $1150\ \mathrm{K}$ (to be checked), $\Delta G^{*} = 76 \times 1.381 \times 10^{-23} \times 1150 = 1.21 \times 10^{- 18}\ \mathrm{J}$, and
$$
\Delta T = \left( \frac{16 \pi \gamma^{3}}{3 \left( \Delta G_{v} / \Delta T \right)^{2} \Delta G^{*}} \right)^{1 / 2} = \left( \frac{16 \pi \times 0.177^{3}}{3 \times \left( 1.36 \times 10^{6} \right)^{2} \times 1.21 \times 10^{-18}} \right)^{1/2} = 205\ \mathrm{K} = 0.15\, T_m .
$$
The nucleation temperature is $1358 - 205 = 1153\ \mathrm{K}$, consistent with the guess.
**The critical radius there.** $r^{*} = 2 \gamma / \Delta G_{v} = 2 \times 0.177 / \left( 1.36 \times 10^{6} \times 205 \right) = 1.28\ \mathrm{nm}$, a cluster of about $740$ atoms.
**The experiment.** Turnbull and Cech (1950) dispersed metals into small droplets, so that most droplets contained no foreign particle, and undercooled copper by about $236\ \mathrm{K}$ ($0.17\, T_m$) before it froze. The estimate is within $15\ \%$ — not a coincidence, since Turnbull's value of $\gamma$ was itself deduced from such experiments. Bulk castings, by contrast, undercool by only a few kelvin, because they contain mould walls, oxides and other substrates.

*Check.* Turnbull's droplet undercoolings for other metals lie in the same range of $0.15$ to $0.2\, T_m$ — for example about $295\ \mathrm{K}$ for iron ($T_m = 1811\ \mathrm{K}$) and $319\ \mathrm{K}$ for nickel ($1728\ \mathrm{K}$). Units: $\mathrm{J^{3}\, m^{-6}} / \left( \mathrm{J^{2}\, m^{-6}\, K^{-2}} \cdot \mathrm{J} \right) = \mathrm{K^{2}}$, and the square root is in kelvin. $\checkmark$

*Sanity.* The $1/\Delta T^{2}$ dependence makes the rate a cliff rather than a slope: at $100\ \mathrm{K}$ of undercooling the barrier is $76 \times \left( 205 / 100 \right)^{2} \approx 320\ kT$, and the rate is smaller by a factor of about $e^{-244} \approx 10^{-105}$ — no nucleation at all on any time scale. This is why a melt either does not freeze or freezes suddenly, and why heterogeneous substrates always win in practice.
:::
:::

::: example Routing a steel around the diagram {#ex-route}
A eutectoid ($0.8\ \%$ carbon) plain-carbon steel is austenitised at $800\ {}^{\circ}\mathrm{C}$, cooled rapidly to a hold temperature and treated in four ways: held at $700\ {}^{\circ}\mathrm{C}$ for $10^{4}\ \mathrm{s}$; held at $600\ {}^{\circ}\mathrm{C}$ for $10^{3}\ \mathrm{s}$; held at $450\ {}^{\circ}\mathrm{C}$ for $10^{3}\ \mathrm{s}$; and quenched at $200\ {}^{\circ}\mathrm{C / s}$ to $20\ {}^{\circ}\mathrm{C}$. Describe the microstructure of each and estimate the retained austenite after the quench.
::: solution
**$700\ {}^{\circ}\mathrm{C}$, $10^{4}\ \mathrm{s}$.** Only $27\ \mathrm{K}$ below the eutectoid temperature of $727\ {}^{\circ}\mathrm{C}$, transformation is slow and the product is **coarse pearlite** with a lamellar spacing of the order of a micrometre — the soft, machinable condition, around $200\ \mathrm{HV}$.
**$600\ {}^{\circ}\mathrm{C}$, $10^{3}\ \mathrm{s}$.** Close to the nose, transformation is complete within seconds and the product is **fine pearlite**. Its lamellar spacing is several times smaller, roughly in proportion to $1/\Delta T$ (here $127\ \mathrm{K}$ against $27\ \mathrm{K}$), and it is correspondingly harder.
**$450\ {}^{\circ}\mathrm{C}$, $10^{3}\ \mathrm{s}$.** Below the nose but above about $350\ {}^{\circ}\mathrm{C}$: **upper bainite**, ferrite laths with cementite between them, harder than fine pearlite (roughly $40\ \mathrm{HRC}$).
**Quench at $200\ {}^{\circ}\mathrm{C / s}$.** This is faster than the critical rate of about $140\ {}^{\circ}\mathrm{C / s}$, so no pearlite or bainite forms and the austenite reaches $M_s$ intact. Take $M_s = 201\ {}^{\circ}\mathrm{C}$ (Andrews, extrapolated) and apply Koistinen-Marburger at $20\ {}^{\circ}\mathrm{C}$:
$$
f = 1 - \exp \left[ - 0.011 \times \left( 201 - 20 \right) \right] = 1 - e^{-1.99} = 0.863 ,
$$
so the structure is about $86\ \%$ martensite and $14\ \%$ **retained austenite**, with an as-quenched hardness in the low to mid $60\mathrm{s}$ HRC.

*Check.* The four treatments run from about $200\ \mathrm{HV}$ to over $750\ \mathrm{HV}$ — a factor of between three and four in hardness — from one composition, and the difference is entirely the temperature-time path. The quench result is a limiting case of Koistinen-Marburger: $f \to 0$ at $T = M_s$ and $f \to 1$ only as $T \to -\infty$. $\checkmark$

*Sanity.* The $14\ \%$ retained austenite matters in service. It is the reason precision parts such as bearing races and gauge blocks are given a **sub-zero treatment** immediately after quenching and are tempered: retained austenite that transforms later expands, and the part grows. In other steels retained austenite is wanted: in **TRIP** (transformation-induced plasticity) sheet steels it transforms to martensite during forming and raises the work-hardening rate.
:::
:::

::: example The aging curve and its peak {#ex-aging}
An aluminium-copper alloy's precipitation strengthening follows $\Delta \sigma = A r^{1 / 2}$ while the precipitates are cut by dislocations and $\Delta \sigma = B / r$ once they are bypassed, with $\Delta \sigma = 200\ \mathrm{MPa}$ at $r_0 = 2\ \mathrm{nm}$ on the cutting law and the two laws crossing at $r = 4\ \mathrm{nm}$. The precipitates grow as $r \propto t^{1 / 6}$ during the cutting stage and coarsen as $r^{3} - r_p^{3} = K \left( t - t_p \right)$ afterwards, with $K$ chosen so that $\mathrm{d}r/\mathrm{d}t$ is continuous at the peak. Find the peak strength increment and the increment at ten times the peak-aging time $t_p$.
::: solution
**The two laws.** Cutting: $\Delta \sigma = 200 \left( r / 2 \right)^{1 / 2}\ \mathrm{MPa}$ with $r$ in nanometres, giving $200 \sqrt{2} = 283\ \mathrm{MPa}$ at $4\ \mathrm{nm}$. Bypass: $\Delta \sigma = 283 \times 4 / r$, equal to $283\ \mathrm{MPa}$ at $4\ \mathrm{nm}$ by construction.
**The peak.** Dislocations take the easier path, so the strength follows the lower of the two curves; the peak is at the crossing, $r_p = 4\ \mathrm{nm}$, $\Delta \sigma = 283\ \mathrm{MPa}$.
**The coarsening constant.** With $r = r_p \left( t / t_p \right)^{1/6}$ in the cutting stage, $\mathrm{d}r / \mathrm{d}t = r_p / \left( 6 t_p \right)$ at the peak. Continuity of the growth rate requires $K = 3 r_p^{2}\, \mathrm{d}r/\mathrm{d}t = 3 \times 4^{2} \times 4 / \left( 6 t_p \right) = 32\ \mathrm{nm^{3}} / t_p$.
**At $10\ t_p$.**
$$
r^{3} = 4^{3} + \frac{32}{t_p} \times 9\, t_p = 64 + 288 = 352\ \mathrm{nm^{3}} , \qquad r = 7.06\ \mathrm{nm} ,
$$
$$
\Delta \sigma = \frac{283 \times 4}{7.06} = 160\ \mathrm{MPa} .
$$
**The result.** Ten times the peak-aging time costs $1 - 160/283 = 43\ \%$ of the precipitation increment.

*Check.* At $t = t_p$ the coarsening law returns $r = 4\ \mathrm{nm}$, and as $t \to \infty$ it gives $r \propto t^{1/3}$ and $\Delta \sigma \propto t^{-1/3}$, the LSW limit. $\checkmark$

*Sanity.* The estimate is pessimistic: the real size distribution broadens and the alloy's matrix and solid-solution strength are not affected by coarsening, so the measured loss in yield strength is smaller. The steep temperature dependence of $D$ in $K$ is what limits service temperature. For copper in aluminium ($Q \approx 136\ \mathrm{kJ / mol}$) the diffusivity at $65\ {}^{\circ}\mathrm{C}$ is less than $10^{-5}$ of that at a $175\ {}^{\circ}\mathrm{C}$ aging temperature, so a peak-aged part used near room temperature is stable for decades, while one held at or above the aging temperature continues to overage.
:::
:::

::: example Recrystallisation and the grain-size trap {#ex-recryst}
A cold-worked nickel bar is annealed. Nucleation of new grains occurs continuously at $\dot N = 10^{14}\ \mathrm{m^{- 3}\, s^{- 1}}$ and the boundaries migrate at $v = 10^{- 5}\ \mathrm{m / s}$. Estimate the time to half-recrystallise and the final grain size. Then explain why $75\ \%$ cold work gives a finer recrystallised grain than $20\ \%$, and why a bar strained just beyond the critical strain of a few per cent recrystallises to a very coarse grain.
::: solution
**The kinetics.** Continuous nucleation with three-dimensional interface-controlled growth gives $n = 4$ and
$$
b = \frac{\pi}{3} \dot N v^{3} = \frac{\pi}{3} \times 10^{14} \times \left( 10^{- 5} \right)^{3} = 0.105\ \mathrm{s^{- 4}} .
$$
Half-recrystallisation at $b t^{4} = \ln 2$:
$$
t_{50} = \left( \frac{0.693}{0.105} \right)^{1 / 4} = 1.6\ \mathrm{s} .
$$
**The grain size.** The only length that can be formed from $\dot N$ and $v$ is $\left( v / \dot N \right)^{1/4}$ (Johnson-Mehl), so
$$
d \approx \left( \frac{v}{\dot N} \right)^{1 / 4} = \left( \frac{10^{- 5}}{10^{14}} \right)^{1 / 4} = 1.8 \times 10^{-5}\ \mathrm{m} = 18\ \mu\mathrm{m} .
$$
**Why heavier cold work refines.** The stored energy of cold work is the driving force for recrystallisation, and the most deformed regions — deformation bands, grain-boundary bulges, high-misorientation subgrains — supply the nuclei. Increasing the strain raises $\dot N$ much faster than $v$, and $d \propto \left( v / \dot N \right)^{1/4}$ falls.
**Why a small strain coarsens.** Below a critical strain (typically a few per cent) the stored energy is too small for any nucleus to grow, and the metal only recovers. Just above it, only a handful of sites can nucleate, each grain grows a long way before meeting another, and the result is a very coarse grain — the reason a lightly bent or stretched part can show huge grains after annealing. Grain growth after recrystallisation can be limited by fine particles, which exert the **Zener pinning pressure**
$$
P_Z = \frac{3 \gamma f}{2 r} = \frac{3 \times 0.5 \times 0.01}{2 \times 10^{- 8}} = 7.5 \times 10^{5}\ \mathrm{Pa} = 0.75\ \mathrm{MPa}
$$
for a boundary energy of $0.5\ \mathrm{J / m^{2}}$ and a $1\ \%$ volume fraction of $10\ \mathrm{nm}$ particles. That is far above the grain-growth driving pressure $2\gamma / R \approx 0.1\ \mathrm{MPa}$ of $10\ \mu\mathrm{m}$ grains, so such a dispersion stops grain growth; examples are aluminium nitride in aluminium-killed steels and yttria in oxide-dispersion-strengthened nickel alloys.

*Check.* The grain size should be of the order of the distance a boundary travels in the transformation time: $v\, t_{50} = 10^{-5} \times 1.6 = 16\ \mu\mathrm{m}$, close to the $18\ \mu\mathrm{m}$ found. Units: $\left( \mathrm{m\, s^{-1}} / \mathrm{m^{-3}\, s^{-1}} \right)^{1/4} = \mathrm{m}$. $\checkmark$

*Sanity.* Recrystallisation kinetics are strongly temperature dependent through both $\dot N$ and $v$, which is why an anneal specification gives temperature and time together, and why a production rolling schedule controls the reduction per pass and the finishing temperature as well as the total reduction.
:::
:::

::: example Design {#ex-design-ht}
Outline the heat treatment of a $34\mathrm{CrNiMo6}$ shaft of $80\ \mathrm{mm}$ diameter ($0.34\ \%$ C, $0.65\ \%$ Mn, $1.5\ \%$ Cr, $1.5\ \%$ Ni, $0.22\ \%$ Mo) that must reach $280$ to $320\ \mathrm{HB}$ through the section and must not distort by more than $0.2\ \mathrm{mm}$ per metre.
::: solution
**The requirement translated.** For steels the tensile strength is roughly $3.45\ \mathrm{MPa}$ per Brinell point, so $280$ to $320\ \mathrm{HB}$ is a tensile strength of about $970$ to $1{,}100\ \mathrm{MPa}$. In a section of this size that means **quenched and tempered martensite**, tempered at roughly $600\ {}^{\circ}\mathrm{C}$ — the exact temperature is taken from the steel's tempering chart.
**Hardenability, not hardness.** The centre of an $80\ \mathrm{mm}$ bar quenched in oil cools at only a few kelvin per second. $34\mathrm{CrNiMo6}$ is a high-hardenability Ni-Cr-Mo steel whose CCT diagram allows a martensitic or martensitic-bainitic centre at such rates; a plain $0.45\ \%$ carbon steel of the same diameter would form ferrite and pearlite at the centre. **The alloy is chosen for its transformation diagram, not for its as-quenched hardness**, which depends on carbon alone.
**The martensite start.** Andrews' relation gives
$$
M_s = 539 - 423 \times 0.34 - 30.4 \times 0.65 - 12.1 \times 1.5 - 17.7 \times 1.5 - 7.5 \times 0.22 = 329\ {}^{\circ}\mathrm{C} ,
$$
and Koistinen-Marburger at $20\ {}^{\circ}\mathrm{C}$ gives $f = 1 - \exp\left[-0.011 \times 309\right] = 0.967$, so about $3\ \%$ retained austenite, which the high-temperature temper decomposes.
**The schedule.**
1. Austenitise at about $850\ {}^{\circ}\mathrm{C}$ (from the steel standard), soaking long enough for the centre to reach temperature, in a protective atmosphere to avoid decarburisation.
2. Quench in agitated oil. If distortion is critical, a **marquench** — quenching into hot oil or salt just above $M_s$, holding until the surface and centre temperatures equalise, then air cooling through the martensite range — reduces the thermal gradient while the martensite forms; the CCT diagram must confirm that the hold does not produce bainite.
3. Temper immediately, before quench cracks can initiate, and cool quickly from the tempering temperature.
4. Straighten, if needed, **after** tempering, and stress-relieve below the tempering temperature.
**The traps.** **Temper embrittlement**: Ni-Cr steels lose toughness if held in or slowly cooled through roughly $375$ to $575\ {}^{\circ}\mathrm{C}$ when they contain phosphorus, tin, antimony or arsenic, so the specification limits these impurities and requires fast cooling after tempering (the molybdenum in this grade also helps). **Surface tempering in grinding**: abusive dry grinding can overheat and soften the surface, so the hardness check and grinding conditions are specified together.

*Design comment.* A heat-treatment specification is largely a set of **cooling-rate requirements** behind temperature-and-time labels: the quench rate that gives martensite at the centre, the quench path that limits the thermal gradient, and the post-temper cooling rate that avoids embrittlement. A drawing that says only "quench and temper to $300\ \mathrm{HB}$" leaves all of these to chance. Heat treatment of real components follows the steel standard and the heat treater's qualified procedures.
:::
:::

::: history
**Floris Osmond** in France and **William Chandler Roberts-Austen** in England used thermal analysis in the 1880s and 1890s to show that iron and steel pass through arrests on heating and cooling; Osmond named the hard quenched constituent **martensite** after the German metallographer **Adolf Martens**, and austenite after Roberts-Austen. **Edgar C. Bain** proposed in 1924 the lattice correspondence ("Bain strain") that turns face-centred cubic austenite into body-centred martensite, and **E. S. Davenport** and **Bain** of the United States Steel Corporation published *Transformation of Austenite at Constant Subcritical Temperatures* in 1930, the origin of the isothermal transformation (TTT) diagram; their colleagues later named the new intermediate structure **bainite**. **Max Volmer** and **A. Weber** (1926) and **Richard Becker** and **Werner Döring** (1935) laid the foundations of classical nucleation theory. **Andrei Kolmogorov** (1937), **William A. Johnson** and **Robert F. Mehl** (1939) and **Melvin Avrami** (1939–41) derived the transformation-kinetics law that bears their names. **Clarence Zener** analysed diffusion-controlled growth and the kinetics of austenite decomposition in the 1940s. **David Turnbull** and **R. E. Cech** (1950) measured the large undercoolings of fine metal droplets that tested nucleation theory. **D. P. Koistinen** and **R. E. Marburger** published their martensite-fraction relation in 1959, **I. M. Lifshitz** and **V. V. Slyozov** and, independently, **Carl Wagner** published the theory of Ostwald ripening in 1961, and **K. W. Andrews** published his empirical $M_s$ formulas in 1965.
:::

## Where this leads

The equilibrium end states assumed throughout this lesson are those of [[materials-science/phase-diagrams]]; the precipitates and martensite produced here harden the metal by the mechanisms of [[materials-science/dislocations-strengthening]]; the retained austenite of [[#ex-route]] and the temper embrittlement of [[#ex-design-ht]] reappear in [[materials-science/failure]]; and the quench gradient that drives distortion and residual stress is a transient heat-conduction problem.

::: summary
- The homogeneous nucleation barrier falls as $1/\Delta T^{2}$, and observable nucleation needs a barrier of about $76\ kT$; pure metals in fine droplets undercool by $0.15$ to $0.2\, T_m$ before freezing, while heterogeneous nucleation on a well-wetted substrate cuts the required undercooling by a factor of $\sqrt{f(\theta)}$.
- Growth is linear in time when the interface controls and parabolic, as $\sqrt{Dt}$, when diffusion controls; the C-curve's nose is where driving force and mobility together give the shortest transformation time.
- The Avrami exponent reflects the nucleation and growth mode, and the $t_{50} / t_{99}$ ratio gives it independently of the rate constant.
- A eutectoid steel routed to pearlite, bainite or martensite spans a factor of three to four in hardness from one composition; as-quenched martensite hardness depends on carbon, hardenability on alloying.
- Martensite in steels is athermal, follows Koistinen-Marburger, and leaves retained austenite that must be managed or exploited.
- Aging peaks where the cutting and bypass strengths cross, and overaging follows the $t^{1/3}$ LSW coarsening law, whose diffusivity sets the service-temperature limit of precipitation-hardened alloys.
:::

::: quiz
A transformation is $50\ \%$ complete in about one seventh of the time it takes to be $99\ \%$ complete. Which mechanism is most consistent with this?
- [x] Growth in one dimension from a fixed set of sites (site saturation), Avrami exponent near one
- [ ] Continuous nucleation with three-dimensional interface-controlled growth
- [ ] Site-saturated three-dimensional interface-controlled growth
- [ ] Continuous nucleation with two-dimensional growth
::: solution
$t_{50} / t_{99} = 0.15$ corresponds to $n = 1$, which is site-saturated one-dimensional growth (needles lengthening, or plates thickening, from a fixed population). Continuous nucleation with three-dimensional growth ($n = 4$) would give $0.62$, site-saturated three-dimensional growth ($n = 3$) $0.53$, and continuous nucleation with two-dimensional growth ($n = 3$) also $0.53$ — far from the observed ratio.
:::
:::

## Exercises

::: exercise Wetting {level=1 check="0.16"}
What is the heterogeneous nucleation factor $f ( \theta )$ at a wetting angle of $60^{\circ}$? (Enter $f$ to two decimal places.)
::: solution
$\cos 60^{\circ} = 0.5$, so $f = \left( 2.5 \right) \left( 0.5 \right)^{2} / 4 = 0.156 \approx 0.16$. The barrier is cut to about a sixth of the homogeneous value.
:::
:::

::: exercise Avrami {level=1 check="3"}
What Avrami exponent corresponds to site-saturated, interface-controlled growth of spheres in three dimensions?
::: solution
Three: with a fixed number $N_s$ of nuclei, $X_e = \frac{4}{3} \pi N_s v^{3} t^{3}$. Continuous nucleation would add one, giving four.
:::
:::

::: exercise Martensite fraction {level=1 check="89"}
A steel with $M_s = 300\ {}^{\circ}\mathrm{C}$ is quenched to $100\ {}^{\circ}\mathrm{C}$. Using Koistinen-Marburger with $\beta = 0.011\ \mathrm{K^{-1}}$, what percentage of the austenite has transformed to martensite? (Enter the percentage to the nearest whole number.)
::: solution
$f = 1 - \exp\left[ -0.011 \times 200 \right] = 1 - e^{-2.2} = 0.889$, so $89\ \%$.
:::
:::

::: exercise Coarsening {level=1 check="3"}
During LSW coarsening the mean precipitate radius grows as the $n$-th root of time. What is $n$?
::: solution
Three: $\bar{r}^{3} - \bar{r}_0^{3} = K t$.
:::
:::

::: exercise Martensite start {level=1 check="305"}
Use Andrews' linear relation to estimate $M_s$ for a 4340 steel with $0.40\ \%$ C, $0.70\ \%$ Mn, $0.80\ \%$ Cr, $1.80\ \%$ Ni and $0.25\ \%$ Mo. (Enter $M_s$ in °C, to the nearest degree.)
::: solution
$$
M_s = 539 - 423 \times 0.40 - 30.4 \times 0.70 - 12.1 \times 0.80 - 17.7 \times 1.80 - 7.5 \times 0.25 = 539 - 169.2 - 21.3 - 9.7 - 31.9 - 1.9 = 305\ {}^{\circ}\mathrm{C} .
$$
Carbon contributes more than all the other elements together.
:::
:::

::: exercise Nucleation rate {level=2 check="65"}
By what factor does the homogeneous nucleation rate change when the undercooling is doubled, taking the barrier at the original undercooling to be $200\ kT$ and ignoring the change in $kT$ and in the prefactor? (Enter $\log_{10}$ of the factor, to the nearest whole number.)
::: solution
The barrier goes as $\Delta T^{- 2}$, so it falls from $200$ to $50\ kT$, and the rate rises by $\exp \left( 150 \right) = 10^{150 / \ln 10} = 10^{65.1}$, so $\log_{10} \approx 65$.
*Sanity.* Nucleation does not speed up gradually; it switches on over a narrow range of undercooling, which is why small additions of an effective grain refiner change a casting so much.
:::
:::

::: exercise Retained austenite {level=2 check="-72"}
A $1.0\ \%$ carbon steel with $M_s = 200\ {}^{\circ}\mathrm{C}$ is quenched to $20\ {}^{\circ}\mathrm{C}$. Find the retained austenite fraction, and the sub-zero treatment temperature needed to reduce it to $5\ \%$. (Enter the treatment temperature in °C, to the nearest degree.)
::: solution
$$
f_M = 1 - \exp \left[ - 0.011 \times 180 \right] = 0.862 ,
$$
so $14\ \%$ is retained. For $5\ \%$ retained, $f_M = 0.95$ and
$$
M_s - T = \frac{\ln 20}{0.011} = 272\ \mathrm{K}
\quad\Longrightarrow\quad
T = 200 - 272 = - 72\ {}^{\circ}\mathrm{C} .
$$
*Sanity.* Sub-zero treatments in the range $-70$ to $-80\ {}^{\circ}\mathrm{C}$ (dry ice) are common for bearing and tool steels, and they are done soon after the quench: retained austenite left at room temperature **stabilises** and then transforms less readily on later cooling. Handling dry ice and cryogenic baths needs insulated gloves, eye protection and ventilation.
:::
:::

::: exercise Fastest pearlite growth {level=2 check="634"}
The Zener-Hillert analysis gives the pearlite growth rate as $v \propto D\, \Delta T^{2}$, where $\Delta T = T_e - T$ is the undercooling below $T_e = 727\ {}^{\circ}\mathrm{C}$ and $D = D_0 \exp\left( -Q / RT \right)$ is the diffusivity of carbon in austenite with $Q = 148\ \mathrm{kJ / mol}$. At what temperature is the growth rate greatest? (Enter the temperature in °C, to the nearest degree.)
::: solution
Maximise $\ln v = -Q / RT + 2 \ln \left( T_e - T \right)$:
$$
\frac{Q}{R T^{2}} = \frac{2}{T_e - T} .
$$
With $Q / R = 148{,}000 / 8.314 = 17{,}800\ \mathrm{K}$ and $T_e = 1000\ \mathrm{K}$, solving numerically gives $T = 908\ \mathrm{K} = 634\ {}^{\circ}\mathrm{C}$.
*Sanity.* The measured TTT nose of a eutectoid steel is lower, near $540\ {}^{\circ}\mathrm{C}$, because the start of transformation also needs nucleation, whose rate rises steeply with undercooling and pulls the nose down. Between $550$ and $600\ {}^{\circ}\mathrm{C}$ the carbon diffusivity alone changes by a factor of $\exp\left[ 17{,}800 \left( 1/823 - 1/873 \right) \right] = 3.5$.
:::
:::

::: exercise Derivation {level=3}
Derive the Lifshitz-Slyozov-Wagner $t^{1 / 3}$ coarsening law from a diffusion-controlled growth argument, and state the assumptions that make the exponent exactly one third.
::: solution
**The diffusion flux.** A spherical particle of radius $r$ in a matrix of mean concentration $\bar{c}$ grows or dissolves according to the steady-state mass balance
$$
\left( c_p - c_r \right) 4 \pi r^{2} \frac{\mathrm{d} r}{\mathrm{d} t} = 4 \pi r D \left( \bar{c} - c_r \right) ,
$$
where $c_r$ is the matrix concentration at the particle's surface and $c_p$ the concentration in the particle.
**The capillary term.** The Gibbs-Thomson effect gives $c_r = c_e \exp \left( 2 \gamma V_{m} / r R T \right) \approx c_e \left( 1 + \ell / r \right)$ with the capillary length $\ell = 2 \gamma V_{m} / R T$. Writing $\bar{c} = c_e \left( 1 + \ell / r_c \right)$, which defines the **critical radius** $r_c$ at which a particle neither grows nor shrinks,
$$
\frac{\mathrm{d} r}{\mathrm{d} t} = \frac{D c_e \ell}{c_p - c_e} \frac{1}{r} \left( \frac{1}{r_c} - \frac{1}{r} \right) .
$$
Particles larger than $r_c$ grow and smaller ones shrink.
**The scaling.** Every length in the problem scales with $r_c$, and the right-hand side is of order $D c_e \ell / \left[ (c_p - c_e) r_c^{2} \right]$, so $\mathrm{d} r_c / \mathrm{d} t \propto 1 / r_c^{2}$ and $r_c^{3} \propto t$. Lifshitz and Slyozov and Wagner solved the continuity equation for the size distribution with this growth law and showed that it approaches a self-similar form in which $r_c = \bar{r}$ and
$$
\frac{\mathrm{d} \bar{r}^{3}}{\mathrm{d} t} = \frac{4}{9} \frac{D c_e \ell}{c_p - c_e}
\quad\Longrightarrow\quad
\boxed{ \bar{r}^{3} - \bar{r}_0^{3} = K t } , \qquad
K = \frac{8 \gamma D c_e V_{m}}{9 R T \left( c_p - c_e \right)} . \quad \checkmark
$$
**The assumptions that fix the exponent.** (1) Growth is controlled by **volume diffusion** through the matrix; (2) the volume fraction is vanishingly small, so each particle sees the mean-field concentration $\bar{c}$ and its diffusion field does not overlap its neighbours'; (3) the particles are spherical, and the Gibbs-Thomson expansion is linear. If instead the **interface** reaction controls, Wagner's analysis gives $\bar{r}^{2} \propto t$; diffusion along grain boundaries gives $\bar{r}^{4} \propto t$ and along dislocations $\bar{r}^{5} \propto t$. A finite volume fraction keeps the exponent at $1/3$ but increases $K$ and broadens the distribution.
*Sanity.* Because $\bar{r}^{3} \propto t$ once $\bar{r} \gg \bar{r}_0$, doubling the mean radius takes eight times as long, and since the Orowan contribution goes as $1/\bar{r}$ it halves the precipitate strengthening. This is the time scale on which the $\gamma'$ precipitates of a nickel superalloy coarsen in long creep exposure.
:::
:::

::: exercise Design {level=3}
Select the alloy and outline the heat treatment for an aircraft landing-gear forging that must have a yield strength of at least $1{,}550\ \mathrm{MPa}$ and a plane-strain fracture toughness above $100\ \mathrm{MPa\, m^{1 / 2}}$, and explain the trade you are making.
::: solution
**The trade is the specification.** Strength and toughness are opposed in high-strength steels, and the requirement is a point on the trade-off curve.
**The candidates** (indicative typical values; a real design uses the certified minimum values of a source such as MMPDS):
$$
\begin{array}{l c c}
\text{Material} & \sigma_{y}\ \left[ \mathrm{MPa} \right] & K_{Ic}\ \left[ \mathrm{MPa\, m^{1 / 2}} \right] \\
\text{4340, quenched, tempered low (about } 200\ {}^{\circ}\mathrm{C)} & \approx 1{,}600 & \approx 55 \\
\text{4340, quenched, tempered about } 425\ {}^{\circ}\mathrm{C} & \approx 1{,}350 & \approx 90 \\
\text{300M, quenched and tempered} & \approx 1{,}700 & \approx 65 \\
\text{AerMet 100, aged } 482\ {}^{\circ}\mathrm{C} & \approx 1{,}720 & \approx 125 \\
\text{Ti-6Al-4V, solution treated and aged} & \approx 1{,}000 & \approx 60
\end{array}
$$
**Choice.** Only **AerMet 100** meets both requirements. It is a low-carbon ($0.23\ \%$ C) steel with about $13\ \%$ cobalt, $11\ \%$ nickel, $3\ \%$ chromium and $1.2\ \%$ molybdenum: the nickel and cobalt give a tough lath martensite, and aging near $480\ {}^{\circ}\mathrm{C}$ precipitates fine $\mathrm{M_2 C}$ (Cr, Mo) carbides — **secondary hardening** — so the alloy is strong at a tempering temperature high enough to keep it tough. Its high alloy content also gives it the hardenability to harden through heavy forgings.
**The heat treatment** (following the producer's data sheet): solution treat at about $885\ {}^{\circ}\mathrm{C}$; quench; refrigerate at about $-73\ {}^{\circ}\mathrm{C}$ to transform retained austenite; age at about $482\ {}^{\circ}\mathrm{C}$ for several hours.
**The trade you are making.** AerMet 100 costs several times as much as 4340 or 300M, is harder to machine, and its cobalt is a supply risk. The steel must also be **vacuum melted** (vacuum induction melting followed by vacuum arc remelting) to minimise the inclusions from which fatigue cracks start, and it must be protected against hydrogen embrittlement and stress-corrosion cracking by plating and painting systems that do not charge it with hydrogen.

*Design comment.* Above about $1{,}500\ \mathrm{MPa}$ the **toughness and environmental-cracking requirements** decide the alloy, because the critical crack size $a_c \approx \frac{1}{\pi} \left( K_{Ic} / \sigma \right)^{2}$ becomes small: at $\sigma = 1{,}000\ \mathrm{MPa}$, $K_{Ic} = 55$ gives $a_c \approx 1\ \mathrm{mm}$ and $K_{Ic} = 125$ gives $a_c \approx 5\ \mathrm{mm}$ — the difference between a crack that inspection may miss and one it will find. Landing gear is designed and certified by qualified engineers to the applicable airworthiness requirements; this exercise only illustrates the selection logic.
:::
:::
