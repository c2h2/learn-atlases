A perfect crystal is impossible, and not because manufacturing is imperfect. The free energy of a crystal containing no vacancies is higher than that of a crystal containing a few, because mixing the vacancies over the lattice sites contributes an entropy term that no enthalpy can beat at any temperature above absolute zero. The equilibrium concentration of vacancies in aluminium at its melting point is one in four thousand sites, and every engineering consequence of this lesson — diffusion, creep, sintering, precipitation, hardening, radiation swelling, the failure of a turbine blade after ten thousand hours — follows from the fact that the lattice is riddled with defects and that atoms therefore move.

Diffusion is the reason a steel gear can be hard outside and tough inside, the reason a semiconductor dopant sits where it was implanted and not where it was intended, the reason a hydrogen atom produced by cathodic cleaning embrittles a high-strength fastener, and the reason a uranium fuel pellet swells. It is governed by one exponential, $D = D_0 \exp \left( - Q / RT \right)$, whose activation energy is set by the defect concentration and the jump frequency, and whose consequences span thirty orders of magnitude between hydrogen in iron at room temperature and iron in iron at the melting point.

::: warning Diffusion is exponential, so intuition about it is worthless
A $580\ {}^{\circ}\mathrm{C}$ carburising treatment takes ten hours to put a one-millimetre case on a gear; the same treatment at $900\ {}^{\circ}\mathrm{C}$ takes forty minutes. A ten per cent error in the furnace thermocouple changes the case depth by twenty per cent, and a twenty per cent error changes it by forty-four. Conversely, a material that diffuses measurably in a week at $500\ {}^{\circ}\mathrm{C}$ may be perfectly static at $20\ {}^{\circ}\mathrm{C}$, and a designer who reasons by linear extrapolation from a high-temperature test will condemn an alloy that is fine and approve one that is not. Three rules follow. **Never extrapolate an Arrhenius line beyond the decade of temperature it was measured over**, because a change of mechanism — from lattice to grain-boundary diffusion, from extrinsic to intrinsic, from vacancy to interstitial — bends the line and usually bends it downward. **Never assume a diffusion process is frozen at room temperature** if the diffusing species is hydrogen, lithium, sodium or carbon in iron, all of which move fast enough at ambient to matter over weeks. And **never trust a diffusion distance computed without checking the boundary condition**, because the case depth goes as $\sqrt{D t}$ for a constant-surface-concentration treatment and as $\sqrt{D t}$ for a constant-total-content treatment with a completely different constant — a factor of three between them, which is the difference between a gear that passes and one that is scrapped.
:::

## Point defects

::: definition The point defects and their names {#def-point}
A **vacancy** is a missing atom on a lattice site; a **self-interstitial** is an extra atom of the same kind pushed into a site that is not normally occupied. A **Frenkel defect** is a vacancy-interstitial pair produced when an atom leaves its site for an interstitial one, common in ionic solids where the cation is small (silver bromide). A **Schottky defect** is a paired set of cation and anion vacancies that preserves charge neutrality (sodium chloride). An **impurity** is **substitutional** if it replaces a host atom and **interstitial** if it sits in a hole; carbon, nitrogen, hydrogen, boron, oxygen and carbon in iron are all interstitial, and their atoms are $30$ to $40\ \%$ too large for the hole they occupy, which is the whole of steel's strength.
**Energetics.** A vacancy costs an enthalpy $\Delta H_f^{V}$ of $0.5$ to $3\ \mathrm{eV}$, of which about half is the broken bonds and half the relaxation of the neighbours. A self-interstitial costs three to four times as much, because it must push four neighbours aside, and its equilibrium concentration is therefore $10^{8}$ times lower and it exists mainly as a radiation product. The **formation volume** of a vacancy is about half an atomic volume, which is why quenching a metal from above the recrystallisation temperature can condense vacancies into dislocation loops and stacking-fault tetrahedra.
:::

::: proof Why vacancies are unavoidable {#proof-vacancies}
Take a crystal of $N$ atomic sites containing $n$ vacancies. The enthalpy is $n \Delta H_f$ and the configurational entropy is, by Boltzmann's formula with $\left( \begin{array}{c} N \ n \end{array} \right)$ arrangements,
$$
S = k \ln \frac{N !}{n ! \left( N - n \right)!} \approx - N k \left[ c \ln c + \left( 1 - c \right) \ln \left( 1 - c \right) \right], \qquad c = \frac{n}{N} .
$$
The free energy per site is therefore
$$
g (c ) = c \Delta H_f + k T \left[ c \ln c + \left( 1 - c \right) \ln \left( 1 - c \right) \right] .
$$
The entropy term's derivative is $k T \ln \left( c / \left( 1 - c \right) \right)$, which tends to $- \infty$ as $c \rightarrow 0$, so $\mathrm{d} g / \mathrm{d} c < 0$ at the origin **whatever the value of** $\Delta H_f$: adding the first vacancies always lowers the free energy, because the entropy of mixing diverges more steeply than the enthalpy rises. Setting the derivative to zero and solving,
$$
\boxed{ c = \exp \left( - \frac{\Delta H_f}{k T} \right) }
$$
having neglected the vacancy-vacancy interaction and included the vibrational entropy in a prefactor. $\checkmark$
**The generalisation.** The same argument applies to any point defect and to any dilute solute: the equilibrium state is a **disordered** state, and a material made defect-free by any process — molecular-beam epitaxy, low-temperature deposition, ion-beam synthesis — is thermodynamically unstable and will acquire its defects as soon as it is warm enough for atoms to move. The corollary that matters in practice is that a **quench** freezes the high-temperature concentration, because $c$ falls by ten orders of magnitude between the melting point and room temperature and the vacancies have nowhere to go before the metal is cold.
:::

::: definition Diffusion and Fick's laws {#def-fick}
The **diffusion flux** is proportional to the concentration gradient,
$$
J = - D \frac{\partial C}{\partial x} \quad \left[ \mathrm{mol\, m^{- 2}\, s^{- 1}} \right] ,
$$
and combining this with conservation of mass, $\partial C / \partial t = - \partial J / \partial x$, gives **Fick's second law**
$$
\frac{\partial C}{\partial t} = D \frac{\partial^{2} C}{\partial x^{2}}
$$
for constant $D$. The two canonical solutions of the one-dimensional problem are:
**Constant surface concentration** $C_s$ into a semi-infinite solid initially at $C_0$:
$$
\frac{C (x , t ) - C_0}{C_s - C_0} = \operatorname{erfc} \frac{x}{2 \sqrt{D t}} .
$$
**Instantaneous plane source** of $M$ atoms per unit area:
$$
C (x , t ) = \frac{M}{\sqrt{\pi D t}} \exp \left( - \frac{x^{2}}{4 D t} \right) ,
$$
whose width grows as $\sqrt{D t}$ and whose peak falls as $1 / \sqrt{D t}$ with the total area constant.
In both cases the diffusion distance is
$$
x \sim 2 \sqrt{D t} ,
$$
and the **characteristic time** to diffuse a distance $x$ is $t \approx x^{2} / (4 D)$ — a square law, which is why thin things equilibrate and thick things never do.
:::

::: widget plot
f: exp(-x*x); 0.5*exp(-x*x/4)
x: -4, 4
y: 0, 1.05
labels: t = t0; t = 4 t0
caption: The Gaussian spreading of an instantaneous plane source at two times. Quadrupling the time halves the peak height and doubles the width, because the area under the curve — the total diffusing mass — is conserved. This is the reason a drive-in diffusion step loses control of the junction depth: the profile has no sharp front, and the depth at which the dopant falls below the background concentration grows as $\sqrt{t}$ while the surface concentration falls as $1 / \sqrt{t}$.
:::

::: definition The temperature dependence and the three rules of thumb {#def-arrhenius}
$$
D = D_0 \exp \left( - \frac{Q}{R T} \right),
$$
with $Q$ the activation enthalpy for diffusion. For **self-diffusion by the vacancy mechanism** the activation enthalpy is the sum of the vacancy formation and migration enthalpies, $Q = \Delta H_f + \Delta H_m$, and three empirical regularities hold across the metals:
$$
Q_{\mathrm{self}} \approx 18 R T_m , \qquad D_0 \approx 10^{- 5}\ \mathrm{m^{2} / s}, \qquad D \left( T_m \right) \approx 10^{- 13}\ \mathrm{m^{2} / s} .
$$
The third is remarkable: **every metal diffuses at about $10^{- 13}\ \mathrm{m^{2} / s}$ at its own melting point**, from zinc to tungsten, which is why a sintering schedule is quoted as a fraction of the absolute melting temperature and why homologous temperature $T / T_m$ is the only temperature a metallurgist uses. Interstitial diffusion has $Q$ of $0.1$ to $1.2\ \mathrm{eV}$ with no vacancy term, and is therefore $10^{4}$ to $10^{10}$ times faster; hydrogen in iron at room temperature diffuses at $2 \times 10^{- 8}\ \mathrm{m^{2} / s}$, which is a hundred times faster than iron in iron at $1000\ {}^{\circ}\mathrm{C}$.
:::

::: example Equilibrium and quenched vacancies {#ex-vacancies}
The enthalpy of vacancy formation in aluminium is $0.66\ \mathrm{eV}$. Give the equilibrium concentration at $200\ {}^{\circ}\mathrm{C}$, at the melting point of $660\ {}^{\circ}\mathrm{C}$, and after quenching to $20\ {}^{\circ}\mathrm{C}$.
::: solution
**At $200\ {}^{\circ}\mathrm{C} = 473\ \mathrm{K}$:**
$$
c = \exp \left( - \frac{0.66}{8.617 \times 10^{- 5} \times 473} \right) = 9.3 \times 10^{- 8}
$$
one vacancy per eleven million sites.
**At $660\ {}^{\circ}\mathrm{C} = 933\ \mathrm{K}$:**
$$
c = \exp \left( - 8.19 \right) = 2.7 \times 10^{- 4}
$$
one per $3700$ sites, or $1.6 \times 10^{25}$ vacancies per cubic metre against $6.0 \times 10^{28}$ sites.
**After quenching to $20\ {}^{\circ}\mathrm{C}$:** the equilibrium value at $293\ \mathrm{K}$ is $7 \times 10^{- 12}$, but the vacancies cannot diffuse to a sink during a quench fast enough to annihilate, so the metal retains a **supersaturation of four to five orders of magnitude**. On the next ageing treatment at $150$ to $200\ {}^{\circ}\mathrm{C}$ the supersaturation collapses by forming dislocation loops, and the loops are visible in the electron microscope as perfect prismatic interstitial or vacancy loops of a few nanometres.

*Check.* The number of vacancies per cubic metre at the melting point, $1.6 \times 10^{25}$, corresponds to a volume of $1.6 \times 10^{25} \times 1.66 \times 10^{- 29} = 2.7 \times 10^{- 4}\ \mathrm{m^{3}}$ per cubic metre — the same fraction as the concentration, as it must be, and equal to the **measured** density difference between a slowly cooled and a quenched specimen, which is how $c$ was first measured. $\checkmark$

*Sanity.* The quench-vacancy method measures $c$ to a few per cent and requires quenching fast enough that the metal passes through the temperature range where diffusion is fast before it becomes slow. For aluminium a water quench is enough; for a refractory metal with $\Delta H_f = 2\ \mathrm{eV}$ the concentration at the midpoint of the quench is already low and the method fails, which is why the vacancy data for tungsten and molybdenum come from dilatometry and positron annihilation rather than from density.
:::
:::

::: example Carburising a gear {#ex-carburising}
A $0.1\ \%\mathrm{C}$ steel gear is carburised at $1000\ {}^{\circ}\mathrm{C}$ in an atmosphere that holds the surface at $1.0\ \%\mathrm{C}$. How long to reach $0.4\ \%\mathrm{C}$ at a depth of $1\ \mathrm{mm}$, and what is the case depth after ten hours?
::: solution
**Diffusivity.** For carbon in $\gamma$-iron, $D_0 = 2.3 \times 10^{- 5}\ \mathrm{m^{2} / s}$ and $Q = 148\ \mathrm{kJ / mol}$:
$$
D = 2.3 \times 10^{- 5} \exp \left( - \frac{148{,}000}{8.314 \times 1273} \right) = 1.94 \times 10^{- 11}\ \mathrm{m^{2} / s} .
$$
**The required value of the argument.** The boundary conditions are $C_s = 1.0$, $C_0 = 0.1$, target $C_x = 0.4$:
$$
\frac{C_x - C_0}{C_s - C_0} = \frac{0.3}{0.9} = 0.333 = \operatorname{erfc} (z )
\quad\Longrightarrow\quad
z = 0.595 .
$$
**The time.** With $x = 2 z \sqrt{D t}$:
$$
t = \frac{x^{2}}{4 z^{2} D} = \frac{10^{- 6}}{4 \times 0.354 \times 1.94 \times 10^{- 11}} = 3.64 \times 10^{4}\ \mathrm{s} = 10.1\ \mathrm{h} .
$$
**Sensitivity.** A $10\ {}^{\circ}\mathrm{C}$ error in temperature changes $D$ by $\exp \left[ 17{,}800 \times 6.1 \times 10^{- 6} \right] = 1.12$, an eleven per cent change in $D$ and a **five and a half per cent** change in case depth at fixed time. The same eleven per cent in $D$ at fixed depth changes the required time by eleven per cent, and a furnace that drifts twenty degrees puts eleven per cent on the case depth of every gear in the load.

*Check.* After ten hours the diffusion distance is $2 \sqrt{D t} = 2 \times 8.4 \times 10^{- 4} = 1.68\ \mathrm{mm}$, and the depth of the $0.4\ \%$ contour is $0.595 \times 1.68 = 1.00\ \mathrm{mm}$ $\checkmark$

*Sanity.* The square root of time is the whole of the economics of carburising: doubling the case depth takes four times the time and four times the furnace hours, which is why the industry runs hot ($900$ to $950\ {}^{\circ}\mathrm{C}$, near the $\gamma$-to-$\alpha$ limit) and why **low-pressure carburising** with acetylene at a few millibar achieves the same case in a third of the time — not by raising $D$, which is a material property, but by raising the surface carbon activity to the point where the process is diffusion-limited rather than reaction-limited. A carburising cycle that will not go faster no matter how long it runs is **surface-limited**, and the diagnosis is that the carbon potential is too low, not the temperature.
:::
:::

::: example Why quenching works: carbon in two irons {#ex-two-irons}
Carbon diffuses in both $\alpha$- and $\gamma$-iron. Given $D_0 = 6.2 \times 10^{- 7}\ \mathrm{m^{2} / s}$, $Q = 80\ \mathrm{kJ / mol}$ in $\alpha$ and $D_0 = 2.3 \times 10^{- 5}\ \mathrm{m^{2} / s}$, $Q = 148\ \mathrm{kJ / mol}$ in $\gamma$, compare the two at the $\gamma$-to-$\alpha$ transformation temperature of $912\ {}^{\circ}\mathrm{C}$ and explain the metallurgical consequence.
::: solution
**At $1185\ \mathrm{K}$:**
$$
D_\alpha = 6.2 \times 10^{- 7} \exp \left( - 8.11 \right) = 1.84 \times 10^{- 10}\ \mathrm{m^{2} / s},
\qquad
D_\gamma = 2.3 \times 10^{- 5} \exp \left( - 15.01 \right) = 6.9 \times 10^{- 12}\ \mathrm{m^{2} / s} .
$$
Carbon diffuses **twenty-seven times faster in the more closely packed iron**, the counter-intuitive one.
**Why.** The activation enthalpy is the energy to squeeze past the neighbouring atoms, and in BCC iron the window between the atoms along the $\left\langle 110\right\rangle$ direction is larger than the window in FCC along $\left\langle 110\right\rangle$, because BCC is not close-packed at all — it is a structure with big holes and few of them, whereas FCC is close-packed with small holes. The packing factor of $0.68$ versus $0.74$ is a statement about the **average** and the BCC interstitial site is $0.019\ \mathrm{nm}$ across against carbon's $0.077\ \mathrm{nm}$, so the carbon sits in a severely distorted site and moves easily.
**The consequence.** On quenching, austenite transforms to martensite by a **diffusionless** shear because the carbon has no time to move: at $D_\alpha = 10^{- 10}\ \mathrm{m^{2} / s}$ the diffusion distance in one second is $2.7 \times 10^{- 5}\ \mathrm{m}$, twenty-seven micrometres, and in a ferrite grain or pearlite colony a few micrometres across that is more than enough — which is why a water quench of a thin specimen still gives some pearlite and why the hardenability of a steel is a race between the diffusion distance and the plate spacing.

*Check.* The diffusion distance in $\gamma$-iron at $912\ {}^{\circ}\mathrm{C}$ in one second is $2 \sqrt{6.9 \times 10^{- 12}} = 5.3\ \mu\mathrm{m}$, and the pearlite interlamellar spacing at that undercooling is $0.1\ \mu\mathrm{m}$ — so pearlite **can** form and does, given a few seconds. At $550\ {}^{\circ}\mathrm{C}$, $D_\gamma$ has fallen by a factor of $700$ and the diffusion distance in one second is $0.19\ \mu\mathrm{m}$, comparable with the spacing of the ferrite plates of bainite, which is why the transformation there is far slower than pearlite and far faster than martensite. $\checkmark$

*Sanity.* The same twenty-seven-fold asymmetry explains why a carburised steel is carburised in the $\gamma$ range despite the low solubility there — $1.4\ \%$ carbon in $\gamma$ against $0.02\ \%$ in $\alpha$ — because the concentration driving force more than compensates for the lower $D$. It also explains why **nitriding** is done at $500\ {}^{\circ}\mathrm{C}$ in the $\alpha$ range, where nitrogen diffuses fast and forms hard nitrides, and gives a harder, thinner case at a lower temperature with no quench distortion at all.
:::
:::

::: example Interdiffusion and the Kirkendall effect {#ex-kirkendall}
A diffusion couple of pure copper and pure nickel is annealed at $1000\ {}^{\circ}\mathrm{C}$ with a row of inert molybdenum markers at the interface. Which way do the markers move, and by how much after ten hours?
::: solution
**The diffusivities.** At $1273\ \mathrm{K}$, $D_{\mathrm{Cu}\rightarrow \mathrm{Ni}} \approx 7 \times 10^{- 14}$ and $D_{\mathrm{Ni}\rightarrow \mathrm{Cu}} \approx 4 \times 10^{- 14}\ \mathrm{m^{2} / s}$: copper moves into nickel about twice as fast as nickel moves into copper.
**The consequence.** The net atom flux is toward the copper side, which therefore loses lattice planes and **shrinks**, so the markers — which are carried by the lattice — move into the copper. This is the **Kirkendall effect**, and it is impossible if the two diffusivities are equal, which is the assumption of Fick's original treatment.
**The voids.** The vacancy supersaturation left on the shrinking side condenses into a row of voids along the original interface, visible in the microscope as a band of porosity that will be the fatigue crack's starting point.
**The mathematics.** The Darken equations give the marker velocity and the composition-dependent interdiffusivity:
$$
\tilde{D} = D_B N_A + D_A N_B , \qquad
v = \left( D_A - D_B \right) \frac{\mathrm{d} \ln C_A}{\mathrm{d} x} ,
$$
and the **Matano-Boltzmann** method extracts $\tilde{D} (C )$ from a single diffusion couple's composition profile by integrating about the Matano plane, which is the plane across which the net flux is zero.

*Check.* With $\Delta D = 3 \times 10^{- 14}\ \mathrm{m^{2} / s}$ and a composition gradient of one atomic fraction per $50\ \mu\mathrm{m}$, $v = 3 \times 10^{- 14} \times 2 \times 10^{4} = 6 \times 10^{- 10}\ \mathrm{m / s}$, giving a marker displacement of $22\ \mu\mathrm{m}$ in ten hours — easily measured optically, and of just the size reported for copper-nickel couples. $\checkmark$

*Sanity.* The Kirkendall effect is not a laboratory curiosity; it is the reason a **diffusion bond** between two different alloys has a band of voids at the interface unless the bonding is done under pressure, and it is the reason nanoscale **Kirkendall voids** are made deliberately to hollow out metal nanoshells for catalysis. It is also the reason a solder joint between copper and a tin-silver alloy grows intermetallic layers of unequal thickness on the two sides, and why the joint fails in the intermetallic rather than in the solder.
:::
:::

::: example Design {#ex-design-barrier}
A copper interconnect on silicon must be diffusion-barrriered so that less than one per cent of a monolayer of copper reaches the silicon during sixty minutes at $450\ {}^{\circ}\mathrm{C}$. Choose between a $50\ \mathrm{nm}$ film of tantalum, of $\mathrm{TiN}$ and of $\mathrm{Ta_2 O_5}$.
::: solution
**The requirement.** The fraction transmitted by a film of thickness $L$ with a constant source on one side and a perfect sink on the other is approximately
$$
f \approx \frac{2 \sqrt{D t}}{L} \exp \left( - \frac{L^{2}}{4 D t} \right) \quad \text{for} \ L \gg 2 \sqrt{D t} .
$$
Writing $u = L^{2} / \left( 4 D t \right)$ makes this $f = \mathrm{e}^{- u} / \sqrt{u}$, and $f < 10^{- 2}$ requires $u > 4.0$. With $L = 50\ \mathrm{nm}$ and $t = 3600\ \mathrm{s}$,
$$
D < \frac{L^{2}}{4 u t} = \frac{2.5 \times 10^{- 15}}{4 \times 4.0 \times 3600} = 4 \times 10^{- 20}\ \mathrm{m^{2} / s}
$$
at $450\ {}^{\circ}\mathrm{C} = 723\ \mathrm{K}$.
**The candidates.** Taking $D_0 \approx 10^{- 5}\ \mathrm{m^{2} / s}$ and $Q$ from the measured values:
$$
\begin{array}{l c c}
\text{Barrier} & Q\ \left[ \mathrm{eV} \right] & D \left( 723\ \mathrm{K} \right)\ \left[ \mathrm{m^{2} / s} \right] \\
\text{Tantalum, grain-boundary path} & 1.2 & 4 \times 10^{- 14} \\
\mathrm{Ta_2 O_5} & 2.4 & 2 \times 10^{- 22} \\
\mathrm{TiN} & 3.0 & 1 \times 10^{- 26}
\end{array}
$$
**Choice.** Tantalum fails by six orders of magnitude because copper diffuses along its columnar grain boundaries with an activation energy of about $1.2\ \mathrm{eV}$; this is exactly why a pure-tantalum barrier was abandoned. Tantalum pentoxide passes by two orders and titanium nitride by seven, and titanium nitride is what was used, because it is also an adhesion layer and a diffusion barrier for the tungsten plug beneath it.
**The real specification.** The barrier is not tested by the calculation but by **stress migration** and **electromigration** tests, and the failure mode is not bulk diffusion at all: it is the copper that leaks along the **interface** between the barrier and the via wall, which is why the modern answer is a **tantalum/tantalum-nitride bilayer** — the Ta wets the copper and the $\mathrm{TaN_x}$ blocks the interface path — deposited by reactive sputtering to $25\ \mathrm{nm}$ total.

*Design comment.* Three lessons generalise. **The barrier that fails is the one whose failure path was not the one designed for**, and grain-boundary and interface diffusion are $10^{6}$ to $10^{12}$ times faster than lattice diffusion in a nanocrystalline sputtered film. **Amorphous or nanocrystalline barriers beat crystalline columnar ones** for exactly this reason, and the industry's move from CVD to PVD barrier films in the 1990s bought nothing until the films were made amorphous. And **a diffusion barrier is a mechanical layer as well**, so its thickness is set by step coverage and adhesion at $25\ \mathrm{nm}$ and not by the diffusion calculation, which would be satisfied by $2\ \mathrm{nm}$ of titanium nitride.
:::
:::

::: history
The experimental fact that solids diffuse was established twice and believed neither time. **Robert Hare** in 1826 welded a cylinder of gold on one of lead, kept it at a gentle heat for five years and found each metal in the other; **William Freeston** read the same experiment to the Manchester Literary and Philosophical Society in 1878 with the same experiment and the same conclusion, and both were treated as curiosities. **William Chandler Roberts-Austen** made the first quantitative measurements in 1896 by sectioning gold-lead couples and weighing the layers, and drew the first Arrhenius line. **Carl Wagner** gave the theory its modern form in a series of papers of 1938 on interdiffusion in metals, and **Ernest Kirkendall and A. E. Smigelskas**'s 1947 paper reported the inert-marker experiments that proved the two intrinsic diffusivities differ — a result Wagner's theory had already permitted and that most metallurgists refused for a decade because it implied the lattice is not fixed. **Linus Pauling**'s 1929 rules on ionic crystals set the scale of the Schottky and Frenkel energies. **C. Matano**'s 1933 method of analysing an interdiffusion couple and **E. Boltzmann**'s 1894 similarity transformation were combined by **Matano** in a single construction that is still the standard. **F. A. Cottrell**'s *Dislocations and Plastic Flow in Crystals* of 1953 made the vacancy-dislocation connection ordinary textbook material, and **A. D. Le Claire**'s 1963 review of grain-boundary diffusion, in *Progress in Metal Physics*, is the document against which every measurement of the last sixty years has been checked.
:::

## Where this leads

The vacancy concentration of this lesson is the mobility term in the precipitation kinetics of [[materials-science/phase-transformations]], the carbon-in-iron asymmetry of Example 4 is the reason the iron-carbon diagram of [[materials-science/phase-diagrams]] is drawn for the metastable cementite rather than the stable graphite, the diffusion distance $\sqrt{Dt}$ is the length scale of the creep cavities of [[materials-science/failure]], and the interstitial carbon that makes steel strong is the same atom that makes it age after forming in [[materials-science/dislocations-strengthening]].

::: summary
- A crystal must contain vacancies: the entropy of mixing diverges at zero concentration, so the free-energy minimum is at $c = \exp \left( - \Delta H_f / k T \right)$, about one site in four thousand at the melting point and none at room temperature.
- Diffusion distance goes as $\sqrt{Dt}$, so doubling a treatment time gains forty per cent of depth and quadrupling it doubles the depth.
- Self-diffusion obeys three universal rules: $Q \approx 18 R T_m$, $D_0 \approx 10^{- 5}\ \mathrm{m^{2} / s}$ and $D \approx 10^{- 13}\ \mathrm{m^{2} / s}$ at the melting point of every metal.
- Interstitials diffuse $10^{4}$ to $10^{10}$ times faster than vacancies, and carbon moves twenty-seven times faster in open-structured BCC iron than in close-packed FCC iron.
- Intrinsic diffusivities differ, so the lattice itself moves: the Kirkendall effect, marker motion and interface voids are the proof that Fick's symmetric picture is incomplete.
- Real diffusion at device-relevant temperatures goes by grain boundaries and interfaces, not through the lattice, and a barrier designed against lattice diffusion fails by thirteen orders of magnitude.
:::

::: quiz
A carburising cycle is running twice as long as the schedule says it should to reach the specified case depth, and the furnace temperature is verified correct. What is the most likely cause?
- [x] The process is surface-reaction-limited: the carbon potential is too low for the required flux
- [ ] The diffusivity is lower than the tabulated value
- [ ] The steel is too clean
- [ ] The parts are too close together in the load
::: solution
If the temperature is right, $D$ is right, and the only remaining lever is the surface boundary condition. A carburising cycle that will not speed up with more time is starved of carbon at the surface, and the fix is to raise the carbon potential or the gas flow, not the temperature — raising the temperature at a fixed low carbon potential only makes a deeper, softer, lower-carbon case.
:::
:::

## Exercises

::: exercise Vacancy concentration {level=1 check="0.5"}
Roughly what fraction of the enthalpy of vacancy formation is recovered by the relaxation of the neighbouring atoms?
::: solution
About half.
:::
:::

::: exercise Orders of magnitude {level=1 check="6"}
By roughly how many orders of magnitude is interstitial diffusion faster than vacancy diffusion in the same metal?
::: solution
Six — the range quoted is four to ten.
:::
:::

::: exercise Square law {level=1 check="4"}
By what factor must the time be multiplied to double a diffusion distance?
::: solution
Four, because the distance goes as $\sqrt{Dt}$.
:::
:::

::: exercise Homologous temperature {level=1 check="1"}
At what fraction of the absolute melting temperature does a metal typically reach $D \approx 10^{- 13}\ \mathrm{m^{2} / s}$?
::: solution
One — that value is reached at the melting point itself, $T / T_m = 1$.
:::
:::

::: exercise Schottky {level=1 check="2"}
How many vacancies does one Schottky defect in sodium chloride create?
::: solution
Two — one sodium and one chloride, so that charge neutrality is preserved.
:::
:::

::: exercise Vacancies in copper {level=2}
Copper has $\Delta H_f = 1.11\ \mathrm{eV}$ and melts at $1085\ {}^{\circ}\mathrm{C}$. Give the equilibrium vacancy concentration at the melting point and the number per cubic metre.
::: solution
$$
c = \exp \left( - \frac{1.11}{8.617 \times 10^{- 5} \times 1358} \right) = 8.4 \times 10^{- 5} ,
$$
and with $8.5 \times 10^{28}$ sites per cubic metre, $n_v = 7.1 \times 10^{24}\ \mathrm{m^{- 3}}$.
*Sanity.* One vacancy in twelve thousand sites is a fifth of aluminium's value at its own melting point, because copper's melting point is higher and its bond stronger; the density difference between an annealed and a quenched copper specimen is $8.4 \times 10^{- 5}$, or $0.7\ \mathrm{mg}$ per cubic centimetre, which is measurable on a good balance and was how the number was first obtained.
:::
:::

::: exercise Case depth {level=2}
A steel is carburised as in Example 2 but at $900\ {}^{\circ}\mathrm{C}$. Give the diffusivity and the time to reach the same $0.4\ \%$ carbon depth of $1\ \mathrm{mm}$.
::: solution
$$
D = 2.3 \times 10^{- 5} \exp \left( - \frac{148{,}000}{8.314 \times 1173} \right) = 5.9 \times 10^{- 12}\ \mathrm{m^{2} / s} ,
$$
a factor of $3.3$ below the $1000\ {}^{\circ}\mathrm{C}$ value, so the time rises by the same factor to $33\ \mathrm{h}$.
*Sanity.* A hundred degrees costs a factor of three in time, which is the whole of the case for running carburising as hot as the $\gamma$-field allows and the whole of the case against it, since $912\ {}^{\circ}\mathrm{C}$ is the $\alpha$-to-$\gamma$ boundary for a plain-carbon steel and above it the surface melts as the carbon potential rises. The industry's compromise is $900$ to $930\ {}^{\circ}\mathrm{C}$ with a carbon potential ramped down as the cycle ends.
:::
:::

::: exercise Drive-in {level=2}
A boron implant places a plane source of dopant at the surface of a silicon wafer. After a drive-in of one hour at a temperature where $D = 10^{- 17}\ \mathrm{m^{2} / s}$, give the junction depth if the background concentration requires the dopant to fall a factor of $10^{4}$ below its peak.
::: solution
With $C / C_{\max} = \exp \left( - x^{2} / 4 D t \right) = 10^{- 4}$:
$$
x = 2 \sqrt{9.21\, D t} = 2 \sqrt{9.21 \times 10^{- 17} \times 3600} = 1.15\ \mu\mathrm{m} .
$$
*Sanity.* The peak concentration itself falls as $1 / \sqrt{t}$, so a longer drive-in makes the profile both deeper and shallower in the two senses of the word, and this is why modern devices use **rapid thermal processing** — ten seconds at $1050\ {}^{\circ}\mathrm{C}$ instead of thirty minutes at $900\ {}^{\circ}\mathrm{C}$ — which diffuses the damage away while the square-root law keeps the junction where it was put.
:::
:::

::: exercise Derivation {level=3}
Derive the error-function solution of Fick's second law for constant surface concentration by a similarity transformation, and show why the diffusion distance must be $\sqrt{Dt}$.
::: solution
**The scaling argument first.** In $\partial C / \partial t = D \partial^{2} C / \partial x^{2}$ the two sides must have the same dimensions, so $x^{2} / t \sim D$ and the only length the problem contains is $\sqrt{D t}$. A solution can therefore depend only on the single variable $\eta = x / \left( 2 \sqrt{D t} \right)$, and the partial differential equation must reduce to an ordinary one.
**The reduction.** With $C (x , t ) = C_0 + \left( C_s - C_0 \right) \left[ 1 - f (\eta ) \right]$ and $\eta = x / \left( 2 \sqrt{D t} \right)$,
$$
\frac{\partial C}{\partial t} = \left( C_s - C_0 \right) \left( - f^{\prime} \right) \left( - \frac{\eta}{t} \right),
\qquad
\frac{\partial^{2} C}{\partial x^{2}} = \left( C_s - C_0 \right) \left( - f^{\prime\prime} \right) \frac{1}{4 D t} ,
$$
so with $\partial C / \partial t = D \partial^{2} C / \partial x^{2}$,
$$
f^{\prime\prime} + 2 \eta f^{\prime} = 0
\quad\Longrightarrow\quad
f^{\prime} = A \mathrm{e}^{- \eta^{2}}
\quad\Longrightarrow\quad
f = A \int_0^{\eta} \mathrm{e}^{- u^{2}} \mathrm{d} u + B .
$$
**The constants.** $C \rightarrow C_s$ at $x = 0$ requires $f (0 ) = 0$, so $B = 0$; $C \rightarrow C_0$ at $x \rightarrow \infty$ requires $f (\infty ) = 1$, and since $\int_0^{\infty} \mathrm{e}^{- u^{2}} \mathrm{d} u = \sqrt{\pi} / 2$, $A = 2 / \sqrt{\pi}$. Hence $f = \operatorname{erf} \eta$ and
$$
\boxed{ \frac{C - C_0}{C_s - C_0} = 1 - \operatorname{erf} \eta = \operatorname{erfc} \eta } . \quad \checkmark
$$
*Sanity.* The similarity form is the reason a diffusion profile measured at two different times collapses onto one curve when plotted against $x / \sqrt{t}$, and the collapse is the standard experimental check that the process is **diffusion-controlled** rather than limited by the surface reaction. A profile that does not collapse is either reaction-limited or has a concentration-dependent $D$, and the two are distinguished by the Matano construction. The same similarity structure governs the heat-conduction problems of [[materials-science/failure]] creep and of any transient conduction, which is why the error function appears in five different engineering subjects with the same table behind it.
:::
:::

::: exercise Design {level=3}
A nickel-base superalloy blade is coated with a $300\ \mu\mathrm{m}$ aluminide diffusion coating and must retain $8\ \%$ aluminium by weight at the surface after $10{,}000\ \mathrm{h}$ at $1000\ {}^{\circ}\mathrm{C}$. Given $D_{\mathrm{Al}} = 10^{- 18}\ \mathrm{m^{2} / s}$ in the coating at that temperature, decide whether the coating is thick enough and state what else limits its life.
::: solution
**The diffusion distance.**
$$
2 \sqrt{D t} = 2 \sqrt{10^{- 18} \times 3.6 \times 10^{7}} = 12\ \mu\mathrm{m} .
$$
**The verdict.** The aluminium in the coating has moved twelve micrometres in ten thousand hours; the coating is twenty-five times thicker than the diffusion distance and diffusion through it is not the mechanism that will kill it.
**What does.** Three things, in order of how often they decide. **Oxide scale spallation** on thermal cycling, which strips the coating mechanically and is the reason a coating's thermal-cyclic life, not its isothermal life, is the specification. **Interdiffusion** with the substrate, which converts the $\beta$-NiAl coating into a brittle $\delta$-Ni₂Al₃ and, more importantly, depletes the substrate's aluminium and chromium and lets the substrate itself oxidise. And **the substrate's own depletion zone**, which is a diffusion problem with the substrate's much lower diffusivity and a much longer diffusion distance because the substrate is a millimetre thick, not a micrometre.
**The design.** The coating is thick enough; the life is set by the thermal-cycle specification and by the reactive-element effect — a few tens of parts per million of yttrium or hafnium, which peg the oxide to the metal and multiply the cyclic life by a factor of five.

*Sanity.* The arithmetic here is the same arithmetic that says a thermal-barrier coating's ceramic layer, at $100\ \mu\mathrm{m}$ and $D = 10^{- 20}\ \mathrm{m^{2} / s}$, equilibrates its oxygen in $10^{4}\ \mathrm{h}$ over a distance of $1.2\ \mu\mathrm{m}$ — which is why a thermal-barrier coating's failure is always at the **thermally grown oxide** interface and never in the ceramic. Diffusion in a coating system is never about the coating; it is about the two interfaces and the thin oxide between them.
:::
:::
