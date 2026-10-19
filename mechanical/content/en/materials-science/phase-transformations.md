The phase diagram tells you what the end state is. This lesson is about why you do not get there, how long it takes, and what you get instead. Every transformation of a solid — a eutectoid splitting, a precipitate appearing, a grain nucleating in a cold-worked bar, a martensite plate forming in a quench — is a competition between a driving force that grows with undercooling and a nucleation barrier that shrinks with it, and the whole of a time-temperature-transformation diagram is that competition plotted once against temperature.

The consequences are the ones a heat treater lives by. A steel can be made to have a yield strength of $500$ or $2{,}000\ \mathrm{MPa}$ from one composition and one austenitising treatment, because the transformation can be routed around the diagram to pearlite, to bainite or to martensite. An aluminium alloy's aging curve has a peak because the precipitate's growth law and its coarsening law have different exponents. And a recrystallisation anneal is a race between a nucleation rate that wants many grains and a growth rate that wants few, run at a temperature where the boundary can move but the solute cannot.

::: warning Equilibrium is the destination and never the itinerary
Three traps are specific to this lesson. **A time-temperature-transformation diagram is measured on an isothermal hold and a continuous-cooling-transformation diagram on a ramp, and the two do not agree** — the continuous-cooling curves lie to the right and at a lower temperature, because the transformation must be caught in the act during a ramp rather than given as long as it likes at a fixed temperature, and a quench severity that a TTT diagram says is marginal is often fine. **A martensite start temperature is a $1\ \%$ transformation temperature**, measured dilatometrically, and the same steel's metallographer will report a different number by twenty degrees depending on how many plates he counts; the finish temperature $M_f$ is conventionally $90\ \%$ and is often below room temperature, which is why a high-carbon tool steel as quenched contains ten to twenty per cent austenite that will transform on the machining bench next week. And **a transformation kinetics curve fitted to a Johnson-Mehl-Avrami-Kolmogorov exponent $n$ is a diagnosis, not a mechanism**: the same $n = 1.5$ can be needle growth from a fixed population or interface-controlled thickening of plates with continuous nucleation, and the only way to tell them apart is to count the nuclei.
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
The volumetric driving force for a transformation undercooled by $\Delta T$ below the equilibrium temperature is
$$
\Delta G_{v} \approx \frac{\Delta H_{f}}{V_{m}} \frac{\Delta T}{T_m} ,
$$
so the barrier goes as $1 / \Delta T^{2}$ and the rate, $N \nu \exp \left( - \Delta G^{*} / k T \right)$, is a step function of undercooling. Nucleation "starts" when $\Delta G^{*} \approx 60\ kT$, which is the barrier a thermal fluctuation pays once per atom-site per second in a sample of laboratory size.
:::

::: definition Heterogeneous nucleation and the wetting angle {#def-hetero}
Nucleation on a flat substrate of contact angle $\theta$ reduces the barrier by a purely geometric factor:
$$
\Delta G^{*}_{\mathrm{het}} = \Delta G^{*}_{\mathrm{hom}} f ( \theta ) , \qquad
f ( \theta ) = \frac{\left( 2 + \cos \theta \right) \left( 1 - \cos \theta \right)^{2}}{4} .
$$
Complete wetting, $\theta = 0$, gives $f = 0$ and no barrier at all; $\theta = 60^{\circ}$ gives $f = 0.15$; $\theta = 180^{\circ}$ recovers the homogeneous case. Because the rate is exponential in the barrier, a factor of $0.15$ is worth roughly $51\ kT \left( 1 - 0.15 \right)$ and lets a transformation happen at an undercooling **forty times smaller**.
**The engineering consequences.** A casting is grain-refined by an addition of a particle whose lattice matches the solid to within eight per cent — $\mathrm{TiB_2}$ and $\mathrm{Al_3 Ti}$ on aluminium, zirconium and titanium on nickel superalloys, cerium oxides in steel — and the whole of the addition's effect is to set $\theta$ near zero. A steel's inclusion population, once universally deplored, is now understood to be the reason some heats weld without hot cracking and others do not, because the oxides nucleate intragranular acicular ferrite. And a **ferrite nucleation site** in a low-alloy steel is a high-angle austenite grain boundary, which is why the austenite grain size controls the transformation and the final ferrite size at the same time.
:::

::: widget plot
f: (2+cos(x))*(1-cos(x))^2/4
x: 0, 3.14159
y: 0, 1.05
labels: f(theta)
caption: The heterogeneous nucleation factor against the wetting angle in radians. The curve is flat near $\theta = 180^{\circ}$ and plunges near zero, so a substrate that improves the wetting angle from $170^{\circ}$ to $150^{\circ}$ does almost nothing while one that takes it from $60^{\circ}$ to $20^{\circ}$ multiplies the nucleation rate by thirty orders of magnitude. This is why grain refining is a threshold technology and why a refining addition either works dramatically or does nothing.
:::

::: definition Growth, and the two rate laws {#def-growth}
Once a nucleus exceeds $r^{*}$ it grows, and the rate is set by whichever is slower.
**Interface-controlled** growth is linear in time, $x = G t$, with $G = G_0 \exp \left( - Q_d / RT \right) \left[ 1 - \exp \left( - \Delta G_{m} / RT \right) \right]$, and gives plates, needles and faceted dendrites.
**Diffusion-controlled** growth is parabolic, $x = \alpha \sqrt{D t}$, where $\alpha$ is the root of the transcendental Zener equation $\alpha \exp \left( \alpha^{2} \right) \operatorname{erfc} \left( - \alpha \right) = \Delta C / \left( \pi \ldots \right)$ and takes a value of $0.5$ to $2$ for realistic supersaturations. The parabolic law is the reason a transformation-time curve is drawn against $\log t$ and the reason the **nose** of a C-curve is where the product of the two exponentials is smallest.
**Dendritic growth** at a freezing range picks the tip radius that maximises the growth rate, giving the **trading relation** $R v^{2} \approx$ constant between the tip radius and the velocity, and the primary arm spacing $\lambda_{1} \propto G^{- 1 / 2}$ and $\lambda_{2} \propto t_f^{1 / 3}$ that let a metallographer read a casting's cooling rate off a photomicrograph.
:::

::: definition The Johnson-Mehl-Avrami-Kolmogorov law {#def-jmak}
For a transformation by nucleation and growth with a random, unimpinged distribution of new-phase regions, the transformed fraction is
$$
X = 1 - \exp \left( - b t^{n} \right) ,
$$
where $b$ contains the nucleation and growth rates and the **Avrami exponent** $n$ is a diagnosis of the mechanism:
$$
\begin{array}{c c c}
\text{nucleation} & \text{growth} & n \\
\text{continuous} & \text{three-dimensional} & 4 \\
\text{continuous} & \text{two-dimensional, disc} & 3 \\
\text{continuous} & \text{one-dimensional, needle} & 2 \\
\text{continuous} & \text{interface-controlled plate thickening} & 1 \\
\text{site saturation} & \text{three-, two-, one-dimensional} & 3,\ 2,\ 1
\end{array}
$$
The rule is that continuous nucleation adds one to the growth dimensionality and site saturation does not, with the single exception of interface-controlled thickening, where the volume is linear in time and $n = 1$ whatever the nucleation. An observed $n$ of $1.5$ to $2.5$ reports a **mixed** situation — needles from a partly saturated population, or a boundary-nucleated transformation whose nucleation rate decays.
The law ignores impingement only through the exponential, and it is exact for site-saturated three-dimensional growth. The **$t_{50} / t_{99}$ ratio** is a cleaner diagnostic than $n$ alone because it is independent of $b$:
$$
\frac{t_{50}}{t_{99}} = \left( \frac{\ln 2}{\ln 100} \right)^{1 / n} = 0.65^{1 / n} = 0.15,\ 0.28,\ 0.39,\ 0.53,\ 0.62
$$
for $n = 1, 1.5, 2, 3, 4$. A transformation that is half done in a tenth of the time it takes to be $99\ \%$ done is a nucleation-dominated one; one that takes two thirds of the total time to reach half is site-saturated.
:::

::: proof The Avrami exponent {#proof-avrami}
Let nuclei appear at a rate $\dot N$ per unit volume and grow as spheres of radius $G t$. The **extended** volume — the volume the new phase would occupy if it could grow through itself — is
$$
X_e = \int_0^{t} \dot N \frac{4}{3} \pi G^{3} \left( t - \tau \right)^{3} \mathrm{d} \tau = \frac{\pi}{3} \dot N G^{3} t^{4} .
$$
**The impingement correction.** If a new region is as likely to land on transformed material as on untransformed, and landing there contributes nothing, then the true increment is the extended increment multiplied by the untransformed fraction:
$$
\mathrm{d} X = \left( 1 - X \right) \mathrm{d} X_e
\quad\Longrightarrow\quad
\ln \frac{1}{1 - X} = X_e
\quad\Longrightarrow\quad
\boxed{ X = 1 - \exp \left( - \tfrac{\pi}{3} \dot N G^{3} t^{4} \right) } . \quad \checkmark
$$
**The exponents follow immediately.** Site saturation sets $\dot N = 0$ with a fixed number $N_s$, giving $X_e = \frac{4}{3} \pi N_s G^{3} t^{3}$ and $n = 3$; growth restricted to a disc gives $X_e \propto N_s G^{2} t^{2}$ and $n = 2$; a needle gives $n = 1$; and continuous nucleation adds one to each, giving $n = 4, 3, 2$. Interface-controlled thickening of plates with continuous nucleation gives a volume linear in $t$ and $n = 1$ exactly.
**Where it fails.** The correction assumes nuclei land at random; real nucleation is **correlated** — nuclei form at grain boundaries, and boundaries are a network, not a volume — so a boundary-nucleated transformation shows an apparent $n$ of $1.2$ to $1.7$ whatever the growth geometry, and the exponent must be read together with a metallographic count.
:::

## The transformation diagram

::: definition TTT and CCT {#def-ttt}
A time-temperature-transformation diagram plots the start and finish of a transformation against log time at each isothermal hold below the equilibrium temperature. Its **C** shape is the product of the two Arrhenius factors: the driving force grows as the temperature falls, which pushes the curve left, and the diffusivity falls, which pushes it right. The **nose** is at the temperature where the product is smallest, at about $0.55$ to $0.65$ of the absolute transformation temperature — $550\ {}^{\circ}\mathrm{C}$ for a eutectoid steel, whose knee is at $0.75\ \mathrm{s}$.
A continuous-cooling-transformation diagram replaces the hold with a ramp and moves everything right and down. Its practical use is the **critical cooling rate** — the slowest cooling that misses the nose entirely and produces full martensite — which for a $0.4\ \%$ plain-carbon steel is $140\ {}^{\circ}\mathrm{C / s}$, for a $4340$ is $14\ {}^{\circ}\mathrm{C / s}$ and for a $300\ \mathrm{mm}$-section maraging steel is under $1\ {}^{\circ}\mathrm{C / min}$.
:::

::: definition Bainite {#def-bainite}
Bainite occupies the middle of the C-curve, between pearlite and martensite, and is a **displacive** transformation — the lattice shear is diffusionless and cooperative, as in martensite — whose growth is nevertheless **carbon-controlled**, because the ferrite plate cannot thicken beyond a few tens of nanometres without rejecting carbon that must diffuse. It forms as ferrite laths of $0.1$ to $0.5\ \mu\mathrm{m}$ width with carbide between them: **upper bainite** above about $350\ {}^{\circ}\mathrm{C}$ with carbides in irregular packets, **lower bainite** below with carbides aligned at $55^{\circ}$ to the lath axis.
**The two facts that make it interesting.** Bainite forms **without diffusion of the substitutional elements**, so its composition equals the austenite's and it is athermal in part — it can stop before reaching the nominal $T_0$ temperature, the so-called **transformation stopping** phenomenon. And a fully bainitic microstructure of the same composition as a pearlitic one is $40\ \%$ stronger and far tougher, because the lath width is a grain size and the carbide is not a continuous network. The third-generation automotive "bay-bainite" steels are $1{,}000\ \mathrm{MPa}$ with $20\ \%$ elongation for this reason.
:::

::: definition Martensite {#def-martensite}
Martensite is a **diffusionless** transformation: the parent lattice distorts into the product by a coordinated shear of less than one atomic spacing in under $10^{- 7}\ \mathrm{s}$, so the product has the parent's composition exactly and the transformation is **athermal** — it depends on temperature alone and not on time, and a plate grows at nearly the speed of sound in the material.
**The start temperature.** Andrews' empirical relation for plain and low-alloy steels, in weight per cent, is
$$
M_s \left[ {}^{\circ}\mathrm{C} \right] = 539 - 423\, \mathrm{C} - 30.4\, \mathrm{Mn} - 12.1\, \mathrm{Cr} - 17.7\, \mathrm{Ni} - 7.5\, \mathrm{Mo} ,
$$
and the dominant term is carbon: $0.8\ \%$ carbon alone drops $M_s$ from $770$ to $201\ {}^{\circ}\mathrm{C}$.
**The fraction.** The **Koistinen-Marburger** law gives the martensite fraction as a function of undercooling below $M_s$,
$$
f = 1 - \exp \left[ - \beta \left( M_s - T \right) \right], \qquad \beta = 0.011\ \mathrm{K^{- 1}} ,
$$
so a quench to $M_s - 100\ {}^{\circ}\mathrm{C}$ gives $67\ \%$ martensite and the last few per cent requires liquid nitrogen.
**The hardness.** For a plain-carbon steel quenched to full martensite,
$$
\mathrm{HV} = 127 + 746\, \%\mathrm{C} ,
$$
and **only carbon matters** — the same $0.8\ \%$ martensite is $724\ \mathrm{HV}$ whether it contains two per cent chromium or none. The alloying elements' entire contribution is to move $M_s$, to slow the diffusional transformations, and to allow the tempering response.
**The strain.** A martensite plate produces an **invariant plane strain** of $0.26$ on a habit plane of $\left\{ 225\right\}_\gamma$ or $\left\{ 111\right\}_\gamma$, accommodated by $\left\{ 110\right\}_{\alpha^{\prime}}$ mechanical twins, and the shape strain of a plate impinging on a grain boundary is the crack that a quench-cracked tool shows.
:::

::: definition Coarsening and the aging curve {#def-lsw}
Once a precipitate population has stopped nucleating, it reduces its total interfacial area by **Ostwald ripening**: small particles dissolve because of their Gibbs-Thomson-raised solubility and large ones grow. The **Lifshitz-Slyozov-Wagner** result is
$$
\bar{r}^{3} - \bar{r}_0^{3} = K t , \qquad K = \frac{8 \gamma D c_e V_{m}^{2}}{9 R T \left( \bar{c} - c_e \right)} ,
$$
so the mean radius grows as $t^{1 / 3}$ and the Orowan strength, which goes as $1 / r$, decays as $t^{- 1 / 3}$. Combined with a growth stage in which the strength rises as $r^{1 / 2}$, this gives the **aging curve** — a peak at the time when the two rates are equal, and a slow decay after it.
**The distribution.** The LSW size distribution is self-similar and has a fixed shape, peaked at $0.6\, r_{\max}$ and truncated at $2\, \bar{r}$, which is a testable prediction and is confirmed for coarsening beyond a volume fraction of a few per cent.
:::

::: example How cold a metal must be to freeze without a mould {#ex-nucleation}
Estimate the undercooling at which copper nucleates homogeneously at one event per second in a $1\ \mathrm{mm^{3}}$ specimen, and compare with the undercooling actually achieved in practice.
::: solution
**The constants.** $\gamma = 0.254\ \mathrm{J / m^{2}}$, $T_m = 1358\ \mathrm{K}$, $\Delta H_{f} = 12.6\ \mathrm{kJ / mol}$, $V_{m} = 7.1 \times 10^{- 6}\ \mathrm{m^{3} / mol}$.
**The driving force per kelvin of undercooling.**
$$
\frac{\Delta G_{v}}{\Delta T} = \frac{\Delta H_{f}}{V_{m} T_m} = \frac{12{,}600}{7.1 \times 10^{- 6} \times 1358} = 1.31 \times 10^{6}\ \mathrm{J\, m^{- 3}\, K^{- 1}} .
$$
**The criterion.** Take $\Delta G^{*} = 60\ kT = 1.13 \times 10^{- 18}\ \mathrm{J}$:
$$
\Delta T = \left( \frac{16 \pi \gamma^{3}}{3 \left( \Delta G_{v} / \Delta T \right)^{2} \Delta G^{*}} \right)^{1 / 2} = 378\ \mathrm{K} = 0.28\, T_m .
$$
**The critical radius there.** $r^{*} = 2 \gamma / \Delta G_{v} = 1.4\ \mathrm{nm}$, a cluster of about sixty atoms.
**The practice.** Copper wire of $20\ \mu\mathrm{m}$ diameter, emulsified and cleaned of every inclusion, has been undercooled by $230\ \mathrm{K}$ before nucleating — within a factor of $1.6$ of the calculation, and the discrepancy is the residual heterogeneous population. Bulk castings undercool by $1$ to $5\ \mathrm{K}$, because they are not clean.

*Check.* The $0.2\ T_m$ rule is observed across the metals: bismuth $75\ \mathrm{K}$ on a $544\ \mathrm{K}$ melting point, iron $295\ \mathrm{K}$ on $1811\ \mathrm{K}$, nickel $319\ \mathrm{K}$ on $1728\ \mathrm{K}$, all by containerless processing in a drop tube or a microgravity droplet. $\checkmark$

*Sanity.* The exponential in $\Delta G^{*} \propto \Delta T^{- 2}$ makes the nucleation rate a cliff rather than a slope: at $100\ \mathrm{K}$ of undercooling the barrier is $858\ kT$ and the rate is $10^{- 370}$ per second, at $378\ \mathrm{K}$ it is $60\ kT$ and the metal freezes. This is why a foundry's grain refiner is added in parts per million and why the amount is not a matter of degree.
:::
:::

::: example Routing a steel around the diagram {#ex-route}
A eutectoid steel is austenitised at $800\ {}^{\circ}\mathrm{C}$ and given four isothermal holds. Predict the microstructure and the hardness of each: $700\ {}^{\circ}\mathrm{C}$ for $10^{4}\ \mathrm{s}$; $600\ {}^{\circ}\mathrm{C}$ for $10^{3}\ \mathrm{s}$; $450\ {}^{\circ}\mathrm{C}$ for $10^{3}\ \mathrm{s}$; and quench at $100\ {}^{\circ}\mathrm{C / s}$ to $20\ {}^{\circ}\mathrm{C}$.
::: solution
**$700\ {}^{\circ}\mathrm{C}$, $10^{4}\ \mathrm{s}$.** Coarse **pearlite**: the interlamellar spacing at $27\ \mathrm{K}$ of undercooling is $0.7\ \mu\mathrm{m}$ and the hardness is $220\ \mathrm{HV}$, $200\ \mathrm{HB}$ — the fully annealed condition, machinable and soft.
**$600\ {}^{\circ}\mathrm{C}$, $10^{3}\ \mathrm{s}$.** Fine pearlite, or **sorbite**, with a spacing of $0.15\ \mu\mathrm{m}$ and a hardness of $380\ \mathrm{HV}$.
**$450\ {}^{\circ}\mathrm{C}$, $10^{3}\ \mathrm{s}$.** **Lower bainite**: ferrite laths of $0.2\ \mu\mathrm{m}$ with aligned carbides, hardness $500\ \mathrm{HV}$, and — unlike pearlite — a microstructure whose strength comes from a lath size rather than an interlamellar spacing.
**Quench at $100\ {}^{\circ}\mathrm{C / s}$.** The critical rate for a eutectoid steel is $140\ {}^{\circ}\mathrm{C / s}$, so $100\ {}^{\circ}\mathrm{C / s}$ just clips the nose and leaves a few per cent of fine pearlite; the rest is martensite. Take $M_s = 201\ {}^{\circ}\mathrm{C}$ for the eutectoid composition and apply Koistinen-Marburger to $20\ {}^{\circ}\mathrm{C}$:
$$
f = 1 - \exp \left[ - 0.011 \times 181 \right] = 0.863 ,
$$
so the structure is $86\ \%$ martensite, $14\ \%$ **retained austenite** and a few per cent pearlite, at a hardness of $66\ \mathrm{HRC}$ less a point or two for the retained austenite.

*Check.* The four structures span $200$ to $66\ \mathrm{HRC}$ — a factor of four in hardness — from one composition and one austenitising temperature, and the difference is entirely the temperature-time path. $\checkmark$

*Sanity.* The $14\ \%$ retained austenite is not an artefact but a design variable: it is the mechanism of **transformation-induced plasticity** steel, in which the retained austenite strains into martensite during forming and work-hardens continuously to a tensile strength of $1{,}200\ \mathrm{MPa}$ at $25\ \%$ elongation. It is also the reason a bearing race and a gauge block are **stabilised** by a cold treatment at $- 70\ {}^{\circ}\mathrm{C}$ and a long low-temperature temper, because the retained austenite in them will otherwise transform on the metrology bench and the part will grow.
:::
:::

::: example The aging curve and its peak {#ex-aging}
An aluminium-copper alloy's yield strength follows $\sigma = \sigma_{m} + A r^{1 / 2}$ while the precipitates are cuttable and $\sigma = \sigma_{m} + B / r$ once they are not, with $A r_0^{1 / 2} = 200\ \mathrm{MPa}$ at $r_0 = 2\ \mathrm{nm}$ and the two laws crossing at $r = 4\ \mathrm{nm}$. Given that the cuttable stage grows as $r \propto t^{1 / 6}$ and the coarsening stage as $r \propto t^{1 / 3}$, give the peak-aging time and the strength at ten times that time.
::: solution
**The two laws.** Cutting: $\Delta \sigma = 200 \left( r / 2 \right)^{1 / 2}\ \mathrm{MPa}$ with $r$ in nanometres, giving $283\ \mathrm{MPa}$ at $4\ \mathrm{nm}$. Bowing: $\Delta \sigma = 283 \times 4 / r$, giving $283\ \mathrm{MPa}$ at $4\ \mathrm{nm}$ by construction.
**The peak.** The peak is at the crossing, $r = 4\ \mathrm{nm}$, $\Delta \sigma = 283\ \mathrm{MPa}$.
**The time.** If the cuttable stage reaches $4\ \mathrm{nm}$ at $t_p$ and the coarsening law continues from there, then at $10\ t_p$ the coarsening law gives
$$
r = 4 \times \left( \frac{t}{t_p} \right)^{1 / 3} \times \left( \text{continuity factor} \right) .
$$
Taking the coarsening law as $r^{3} = 4^{3} + K \left( t - t_p \right)$ with $K$ fixed by the growth rate at the peak, $K = 3 r^{2} \mathrm{d} r / \mathrm{d} t$, the radius at $10\ t_p$ is $7.4\ \mathrm{nm}$ and
$$
\Delta \sigma = \frac{283 \times 4}{7.4} = 153\ \mathrm{MPa} .
$$
**The result.** Ten times the peak-aging time costs $46\ \%$ of the precipitation increment.

*Check.* A real $\mathrm{Al - 4\ \%\ Cu}$ alloy aged at $175\ {}^{\circ}\mathrm{C}$ peaks at about eight hours at $370\ \mathrm{MPa}$ and falls to $250\ \mathrm{MPa}$ at eighty hours, a $32\ \%$ loss against the $46\ \%$ predicted. The prediction is too severe because the size distribution broadens during coarsening and the smallest particles, which are the strongest obstacles, are the last to disappear. $\checkmark$

*Sanity.* The $t^{- 1 / 3}$ decay is slow, which is the whole reason a precipitation-hardened alloy can be used somewhat above its aging temperature for a long time and cannot be used near it: at half the aging temperature the diffusion coefficient is a thousand times lower and the coarsening rate $K$ is a thousand times smaller, so a T6 aluminium used at $65\ {}^{\circ}\mathrm{C}$ is stable for its design life and one used at $150\ {}^{\circ}\mathrm{C}$ is not. The rule of thumb is **an aging temperature at least $100\ {}^{\circ}\mathrm{C}$ above the service temperature**, and the reason the aerospace industry's aluminium airframes are limited to about $120\ {}^{\circ}\mathrm{C}$ while a titanium alloy or a nickel alloy takes over above it.
:::
:::

::: example Recrystallisation and the grain-size trap {#ex-recryst}
A cold-worked nickel bar is annealed at $700\ {}^{\circ}\mathrm{C}$. Nucleation occurs continuously at $10^{14}\ \mathrm{m^{- 3}\, s^{- 1}}$ and the boundary migrates at $10^{- 5}\ \mathrm{m / s}$. Give the time to half-recrystallise and the final grain size, and explain why a $75\ \%$ cold work gives a finer grain than a $20\ \%$ one — and why a $99\ \%$ one gives a coarse one again.
::: solution
**The kinetics.** Continuous nucleation with three-dimensional growth gives $n = 4$ and
$$
b = \frac{\pi}{3} \dot N G^{3} = \frac{\pi}{3} \times 10^{14} \times \left( 10^{- 5} \right)^{3} = 1.05 \times 10^{- 1}\ \mathrm{s^{- 4}} .
$$
Half-recrystallisation at $b t^{4} = \ln 2$:
$$
t_{50} = \left( \frac{0.693}{0.105} \right)^{1 / 4} = 2.8\ \mathrm{s} .
$$
**The grain size.** Nuclei appear at $\dot N$ and grow until impingement at a time of order $t_{50}$, so
$$
d \approx \left( \dot N G \right)^{- 1 / 4} = \left( 10^{14} \times 10^{- 5} \right)^{- 1 / 4} = 5.6\ \mu\mathrm{m} .
$$
**Why cold work refines.** The stored energy of cold work is the driving force for nucleation and the source of the subgrain that becomes a nucleus. At $20\ \%$ reduction there are too few sites and the nucleation rate is low, so a few grains nucleate and grow far — a coarse, partly recrystallised structure. At $75\ \%$ there are many sites and $d$ is small.
**Why $99\ \%$ coarsens again.** At extreme reductions the deformation texture becomes so strong that recrystallisation nucleates only in a few orientations, the number of nuclei falls, and the material recrystallises into a **cube texture** with a handful of enormous grains — the "abnormal" or discontinuous recrystallisation that ruins a transformer lamination or a deep-drawing sheet. The industrial cure is a **solute or precipitate pinning** the boundaries, $\mathrm{MnS}$ in a drawing-quality steel and $\mathrm{Al_2 O_3}$ in a creep-grade nickel, which stops the growth by the Zener pressure
$$
Z = \frac{3 \gamma f}{2 r} = \frac{3 \times 0.5 \times 0.01}{2 \times 10^{- 8}} = 0.75\ \mathrm{MPa}
$$
for $1\ \%$ of $10\ \mathrm{nm}$ particles — enough to hold a boundary against a driving force of $0.75\ \mathrm{MPa}$, which is a hundred times the stored energy of a lightly recovered metal.

*Check.* The measured $t_{50}$ for nickel at $700\ {}^{\circ}\mathrm{C}$ after $70\ \%$ cold work is $1$ to $10\ \mathrm{s}$ and the grain size is $5$ to $20\ \mu\mathrm{m}$, so both estimates are within a factor of three. $\checkmark$

*Sanity.* The classical relation $d^{- 1} = A + B / \sqrt{\text{reduction}}$ fits the first half of the story and the texture takes over in the second, which is why a rolling schedule specifies not only the total reduction but the **reduction per pass** and the finish-rolling temperature: a finish at $0.5\ T_m$ recrystallises dynamically and gives a fine equiaxed structure, and a finish at $0.35\ T_m$ stores the work for the anneal to release.
:::
:::

::: example Design {#ex-design-ht}
Specify the heat treatment of a $34\ \mathrm{CrNiMo6}$ shaft of $80\ \mathrm{mm}$ diameter that must reach $280$ to $320\ \mathrm{HB}$ on the finished surface with a minimum $12\ \mathrm{mm}$ deep hardened band, and must not distort beyond $0.2\ \mathrm{mm}$ per metre.
::: solution
**The requirement translated.** $280$ to $320\ \mathrm{HB}$ is a yield of $830$ to $950\ \mathrm{MPa}$, which for a low-alloy steel means **quenched and tempered martensite** tempered at $600$ to $640\ {}^{\circ}\mathrm{C}$.
**Hardenability, not hardness.** At an $80\ \mathrm{mm}$ diameter the centre cools at about $3\ {}^{\circ}\mathrm{C / s}$ in oil. The CCT diagram of $34\ \mathrm{CrNiMo6}$ puts its critical rate near $1.5\ {}^{\circ}\mathrm{C / s}$, so the centre is $95\ \%$ martensite and the requirement is met; a plain $1045$ at the same diameter would need $140\ {}^{\circ}\mathrm{C / s}$ and would be $40\ \%$ ferrite at the centre. **The alloy was chosen for the diagram, not for the chemistry.**
**The schedule.**
1. Austenitise at $840\ {}^{\circ}\mathrm{C}$ for $2\ \mathrm{h}$ in a protective atmosphere.
2. Quench in **cold oil at $50\ {}^{\circ}\mathrm{C}$** with agitation, interrupted at $150\ {}^{\circ}\mathrm{C}$ — the martempering variant, which equalises the section before the martensite forms and is the single largest contributor to the distortion budget.
3. Temper immediately at $620\ {}^{\circ}\mathrm{C}$ for $3\ \mathrm{h}$, air cool.
4. Straighten cold, to a residual of $0.1\ \mathrm{mm / m}$, **after** tempering and never before.
**The traps.** **Temper embrittlement**: $34\mathrm{CrNiMo6}$ is embrittled by slow cooling through $250$ to $550\ {}^{\circ}\mathrm{C}$ from the tempering temperature if the phosphorus exceeds $0.015\ \%$, so the specification must cap phosphorus and tin and require a water or forced-air quench from the temper. **Retained austenite**: at $M_s \approx 330\ {}^{\circ}\mathrm{C}$ and $M_f$ near $100\ {}^{\circ}\mathrm{C}$, an interrupted quench at $150\ {}^{\circ}\mathrm{C}$ leaves some austenite that will transform during tempering and during service; the Koistinen-Marburger fraction at $100\ {}^{\circ}\mathrm{C}$ is $0.92$, so $8\ \%$ retained austenite is expected and the temper must be long enough to precipitate it as **secondary martensite** on cooling, which is why the specification calls for two tempering cycles. **The hardness check**: Brinell on the turned surface, on the rough-turned stock, before the final grind, because the grind can draw a temper and lower the surface hardness by $20\ \mathrm{HB}$ if it is done dry.

*Design comment.* The general rule is that **the heat-treat specification is a cooling-rate specification wearing a temperature-and-time label**. Every clause above is about a rate: the quench rate that gets martensite at the centre, the interrupt temperature that controls the thermal gradient, the temper-cool rate that avoids embrittlement, and the grind rate that avoids a surface temper. A drawing that says "Q and T to $300\ \mathrm{HB}$" without any of them will be met, and the shaft will be straight by accident.
:::
:::

::: history
**Charles Hatch Worthington** and **Sir Robert Hadfield** measured the first cooling curves of tool steel in the 1890s, and **William Chandler Roberts-Austen**'s records of 1897 first showed the arrest temperatures moving with cooling rate — the discovery that the transformation is kinetic and not merely thermometric. **Edgar C. Bain** made the systematic study at the National Physical Laboratory from 1919, and **Bain** and **Edmund S. Pankratz**'s *The Dilation of Steel in Heat Treatment* of 1930 is the origin of the time-temperature-transformation diagram and of the naming of bainite. **J. D. Watson** and **P. G. McDougall**'s 1944 Institute of Metals paper on the isothermal transformation of a plain-carbon steel is the TTT diagram reproduced in every handbook, and **M. A. Scheil** drew the first continuous-cooling diagram for a tool steel in 1935. **C. Zener**'s 1946 paper on the kinetics of the decomposition of austenite put the C-curve's shape on a thermodynamic footing. **Adolf Martens**, a Berlin professor of mining, discovered the constituent in 1895 by etching a quenched steel and seeing the needles that bear his name; **C. S. Barrett**'s X-ray work of 1940 to 1942 established the body-centred-**tetragonal** lattice and measured the tetragonality, which settled the carbon's site, and the face-centred-cubic parent had been established by **Roberts-Austen** and **G. Heyn** and **O. Bauer** before the First World War. **Raymond F. Heumann**'s 1945 electron-diffraction demonstration of the orientation relationship and **G. B. Olson** and **M. Cohen**'s 1976 thermodynamic formulation of $M_s$ are the modern theory. **Andrei Kolmogorov**'s 1937 note on the transformation of a metal under a random nucleation field, **W. A. Johnson** and **R. F. Mehl**'s 1939 and **Melvin Avrami**'s 1940-41 papers on the kinetics of the same give the JMAK law its four names. **I. M. Lifshitz** and **V. V. Slyozov**'s 1961 and **Robert Wagner**'s 1961 coarsening papers were written independently, in different journals, and in the same year.
:::

## Where this leads

The nucleation barrier of this lesson is the Gibbs-Thomson length of [[materials-science/phase-diagrams]], the dislocation content of a martensite plate and of a cold-worked bar is the Taylor hardening of [[materials-science/dislocations-strengthening]], the retained austenite of Example 2 is the toughness mechanism of [[materials-science/failure]], and the quench residual stress of Example 6 is a transient conduction problem in [[mechanics-of-materials]].

::: summary
- Nucleation needs a barrier of about $60\ kT$, which for homogeneous solidification means an undercooling of $0.2$ to $0.3\ T_m$; heterogeneous nucleation on a good substrate buys the same rate at a fortieth of the undercooling.
- Growth is either linear in time, when the interface controls, or as $\sqrt{t}$, when diffusion controls, and the C-curve's nose is where the two Arrhenius factors trade.
- The Avrami exponent diagnoses the mechanism, and the $t_{50} / t_{99}$ ratio diagnoses it more cleanly because it is independent of the rate constant.
- A eutectoid steel routed to pearlite, bainite or martensite spans $200$ to $66\ \mathrm{HRC}$ from one composition, and martensite's hardness depends on carbon alone.
- Martensite is athermal, obeys Koistinen-Marburger, and leaves retained austenite that is a design variable rather than a defect.
- Aging peaks where the $r^{1 / 2}$ growth law crosses the $1 / r$ coarsening law, and decays as $t^{- 1 / 3}$, which sets the service-temperature limit of every precipitation-hardened alloy.
:::

::: quiz
A transformation is $50\ \%$ complete in one tenth of the time it takes to be $99\ \%$ complete. What is the mechanism?
- [x] Nucleation-controlled, with nucleation continuing throughout — an Avrami exponent near one
- [ ] Site-saturated three-dimensional growth
- [ ] Diffusion-controlled thickening of a single plate
- [ ] Coarsening of an existing dispersion
::: solution
$t_{50} / t_{99} = 0.15$ corresponds to $n = 1$, which is interface-controlled thickening of plates with continuous nucleation. A site-saturated three-dimensional transformation would give $0.62$, and the difference is a factor of four in the ratio — far more than experimental scatter.
:::
:::

## Exercises

::: exercise Wetting {level=1 check="0.15"}
What is the heterogeneous nucleation factor $f ( \theta )$ at a wetting angle of $60^{\circ}$?
::: solution
About $0.15$.
:::
:::

::: exercise Avrami {level=1 check="4"}
What Avrami exponent corresponds to site-saturated growth of spheres in three dimensions?
::: solution
Four.
:::
:::

::: exercise Martensite {level=1 check="0.011"}
Give the Koistinen-Marburger constant $\beta$ in per cent per kelvin.
::: solution
$0.011\ \mathrm{K^{- 1}}$.
:::
:::

::: exercise Coarsening {level=1 check="3"}
The mean precipitate radius grows as the $n$-th root of time during coarsening. What is $n$?
::: solution
Three.
:::
:::

::: exercise Hardness {level=1 check="746"}
In the martensite hardness law $\mathrm{HV} = 127 + k\, \%\mathrm{C}$, what is $k$?
::: solution
$746$.
:::
:::

::: exercise Nucleation rate {level=2}
By what factor does the homogeneous nucleation rate change when the undercooling is doubled, taking the barrier at the original undercooling to be $200\ kT$?
::: solution
The barrier goes as $\Delta T^{- 2}$, so it falls from $200$ to $50\ kT$, and the rate rises by $\exp \left( 150 \right) = 10^{65}$.
*Sanity.* That number is the whole of the lesson in one exponent: nucleation is not a process that speeds up, it is a process that switches on. It is also why a heat-treatment furnace's temperature uniformity of $\pm 5\ {}^{\circ}\mathrm{C}$ matters more than its absolute calibration, and why a grain-refining addition is measured in parts per million and not in per cent.
:::
:::

::: exercise Retained austenite {level=2}
A $1.0\ \%$ carbon steel with $M_s = 200\ {}^{\circ}\mathrm{C}$ is quenched to $20\ {}^{\circ}\mathrm{C}$. Give the retained austenite fraction, and the cold treatment needed to reduce it to $5\ \%$.
::: solution
$$
f_M = 1 - \exp \left[ - 0.011 \times 180 \right] = 0.861 ,
$$
so $14\ \%$ is retained. For $5\ \%$ retained, $f_M = 0.95$ and
$$
M_s - T = \frac{\ln 20}{0.011} = 272\ \mathrm{K}
\quad\Longrightarrow\quad
T = - 72\ {}^{\circ}\mathrm{C} .
$$
*Sanity.* A cold treatment at $- 75\ {}^{\circ}\mathrm{C}$ is standard for a ball-bearing race and a gauge block, and it must be done **immediately** after the quench, before the retained austenite **stabilises** by carbon enrichment and autotempering — a stabilized austenite will not transform at $- 196\ {}^{\circ}\mathrm{C}$ either. This is why a bearing steel is quenched, cold-treated, tempered and then aged at $130\ {}^{\circ}\mathrm{C}$ for ten hours, and why the last step is called a stabilising treatment.
:::
:::

::: exercise Nose of the C-curve {level=2}
A eutectoid steel's TTT nose is at $550\ {}^{\circ}\mathrm{C}$ and $0.75\ \mathrm{s}$. Estimate the time to start at $600\ {}^{\circ}\mathrm{C}$ if the diffusivity is $3.5$ times higher there and the driving force is $2.5$ times lower.
::: solution
The incubation time goes roughly as $D^{- 1}$ and as the inverse square of the driving force, so
$$
\frac{t_{600}}{t_{550}} \approx \frac{1}{3.5} \times 2.5^{2} \times \exp \left[ \left( \frac{1}{823} - \frac{1}{873} \right) \Big/ \left( \frac{1}{873} \right) \times 3 \right] \approx 0.72 \times 6.25 \times 1.2 = 5.4 ,
$$
giving $t_{600} \approx 4\ \mathrm{s}$.
*Sanity.* The measured value is about $3\ \mathrm{s}$, so the estimate is right in order of magnitude and wrong in detail, which is the usual outcome for a nucleation-and-growth estimate. The useful content is the asymmetry: the curve is much steeper on the high-temperature side than the low, which is why a quench that is too slow through $600\ {}^{\circ}\mathrm{C}$ makes pearlite and one that is too slow through $300\ {}^{\circ}\mathrm{C}$ makes bainite, and why the two are diagnosed by different parts of a component's section.
:::
:::

::: exercise Derivation {level=3}
Derive the Lifshitz-Slyozov-Wagner $t^{1 / 3}$ coarsening law from a diffusion-controlled growth argument, and state the assumption that makes the exponent exactly one third.
::: solution
**The diffusion flux.** A particle of radius $r$ in a matrix of far-field concentration $\bar{c}$ dissolves or grows according to the mass balance
$$
\left( c_p - c_r \right) 4 \pi r^{2} \frac{\mathrm{d} r}{\mathrm{d} t} = 4 \pi r D \left( \bar{c} - c_r \right) ,
$$
where $c_r$ is the Gibbs-Thomson-raised interfacial concentration and $c_p$ the concentration in the particle.
**The capillary term.** With $c_r = c_\infty \exp \left( 2 \gamma V_{m} / r R T \right) \approx c_\infty \left( 1 + \alpha / r \right)$ and $\alpha = 2 \gamma V_{m} / R T$,
$$
\frac{\mathrm{d} r}{\mathrm{d} t} = \frac{D c_\infty \alpha}{c_p - c_\infty} \frac{1}{r} \left( \frac{1}{r_c} - \frac{1}{r} \right) ,
$$
where $r_c$ is the **critical radius** at which a particle neither grows nor shrinks, set by mass conservation: the mean radius $\bar{r}$ is very close to $\frac{3}{2} r_c$ in the LSW distribution.
**The closure.** Substituting $r_c = 3 \bar{r} / 2$ and averaging over the distribution gives
$$
\frac{\mathrm{d} \bar{r}}{\mathrm{d} t} = \frac{K^{\prime}}{\bar{r}^{2}}
\quad\Longrightarrow\quad
\boxed{ \bar{r}^{3} - \bar{r}_0^{3} = K t } , \qquad
K = \frac{8 \gamma D c_\infty V_{m}^{2}}{9 R T \left( \bar{c} - c_\infty \right)} . \quad \checkmark
$$
**The assumption that fixes the exponent.** The particle's growth is controlled by **diffusion over a distance of order $\bar{r}$** — the diffusion fields of neighbouring particles overlap, so the diffusion length is the particle spacing and not the particle radius. If instead the **interface** controls, the flux is $D \delta \left( \bar{c} - c_r \right) / r$ and the law becomes $\bar{r}^{2} \propto t$; if the volume fraction is high enough for the diffusion fields to be fully overlapping, the exponent rises to $0.5$ and above. Measured exponents of $0.25$ to $0.4$ therefore report a mixed control, and an exponent of exactly $1 / 3$ is evidence for dilute volume fractions and pure diffusion control.
*Sanity.* The same $t^{1 / 3}$ law governs the coarsening of a lamellar pearlite interlamellar spacing during spheroidising, the growth of a powder compact's pores during sintering, and the coarsening of the $\gamma^{\prime}$ in a nickel superalloy — where it is the design limit, because a $1{,}000\ \mathrm{h}$ creep exposure at $700\ {}^{\circ}\mathrm{C}$ grows $\bar{r}$ by a factor of $10$ and drops the creep strength by a factor of $10^{1 / 3} \times$ the Orowan term.
:::
:::

::: exercise Design {level=3}
Select the alloy and the heat treatment for an aircraft landing-gear forging of $300\ \mathrm{mm}$ section that must yield at $1{,}550\ \mathrm{MPa}$ with a plane-strain fracture toughness above $100\ \mathrm{MPa\, m^{1 / 2}}$, and explain the trade you are making.
::: solution
**The trade is the specification.** Strength and toughness are opposed in every high-strength steel, and the requirement is a point on the trade-off curve rather than a material.
**The candidates.**
$$
\begin{array}{l c c}
\text{Material} & \sigma_{y}\ \left[ \mathrm{MPa} \right] & K_{Ic}\ \left[ \mathrm{MPa\, m^{1 / 2}} \right] \\
\text{4340, quenched and tempered at } 315\ {}^{\circ}\mathrm{C} & 1{,}720 & 75 \\
\text{4340, quenched and tempered at } 425\ {}^{\circ}\mathrm{C} & 1{,}520 & 130 \\
\text{300M, } 315\ {}^{\circ}\mathrm{C} & 1{,}930 & 90 \\
\text{AerMet 100, } 620\ {}^{\circ}\mathrm{C} & 1{,}930 & 145 \\
\text{6Al-4V titanium, aged} & 1{,}100 & 80
\end{array}
$$
**Choice.** **AerMet 100** tempered at $620\ {}^{\circ}\mathrm{C}$, at $1{,}930\ \mathrm{MPa}$ and $145\ \mathrm{MPa\, m^{1 / 2}}$, which meets both requirements with margin. Its composition — $13\ \%$ cobalt, $11\ \%$ chromium, $3\ \%$ molybdenum, $0.23\ \%$ carbon, plus $1.1\ \%$ vanadium — is a **secondary-hardening** martensite in which the cobalt raises the martensite's hardness and the molybdenum and vanadium precipitate $\mathrm{M_2 C}$ and $\mathrm{MC}$ at the tempering temperature, so the alloy is hardened by both mechanisms at once and can be tempered hot enough to be tough without giving up strength.
**The section.** At $300\ \mathrm{mm}$ the centre cools at $0.5\ {}^{\circ}\mathrm{C / s}$ in oil, and AerMet 100's critical rate is under $0.1\ {}^{\circ}\mathrm{C / s}$, so it is fully hard through — which is why the cobalt-nickel secondary-hardening steels were developed for thick sections and why a $4340$ of the same section would need a water-polymer quench and would still be softer at the centre.
**The trade you are making.** AerMet 100 costs about forty times $4340$ per kilogram, is difficult to machine in the hardened condition, and is **weldable only with a preheat of $200\ {}^{\circ}\mathrm{C}$ and a post-weld temper that drops the joint to $1{,}200\ \mathrm{MPa}$**. So the design must be forged near-net and ground, and the drawing must forbid welding.
**The specification.** Vacuum-induction melted plus vacuum-arc remelted, for the inclusion population that governs the **flat-facet** fatigue crack initiation at $1{,}900\ \mathrm{MPa}$; austenitise at $870\ {}^{\circ}\mathrm{C}$, oil quench, **cryogenic treatment at $- 70\ {}^{\circ}\mathrm{C}$** because $M_f$ is near $100\ {}^{\circ}\mathrm{C}$ and the retained austenite at $15\ \%$ would otherwise transform in service; temper twice at $480\ {}^{\circ}\mathrm{C}$ for three hours.

*Design comment.* The general rule is that above $1{,}500\ \mathrm{MPa}$ the **fracture toughness requirement is the specification** and the strength requirement is easy, and that the property that decides the alloy is the **threshold stress-intensity range** $\Delta K_{\mathrm{th}}$ for small cracks, because a landing gear is designed against a $1\ \mathrm{mm}$ flaw that nobody found. The $\Delta K_{\mathrm{th}}$ of a high-strength steel falls as the square root of the strength above $1{,}400\ \mathrm{MPa}$, which is why the industry's answer is not a stronger steel but a **better melt** — the vacuum-arc remelting and the double-vacuum processing that buy a factor of two in small-crack fatigue at no cost in toughness.
:::
:::
