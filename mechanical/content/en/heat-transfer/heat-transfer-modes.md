Thermodynamics tells you how much heat must move for a process to happen. It is silent about how fast, and the rate is the whole of the engineering: the same $60\ \mathrm{W}$ of chip loss that a $200\ \mathrm{mm}$ finned block carries with a $17\ \mathrm{K}$ rise will, on a bare board, produce a temperature rise that vaporises the solder. Heat transfer is the study of the three mechanisms by which thermal energy crosses a boundary, of the rate equation each of them obeys, and of the arithmetic of putting them in series and in parallel.

The three mechanisms are not three versions of one thing. **Conduction** is diffusion of energy through a stationary medium by molecular and electronic motion, and its rate is proportional to a temperature *gradient*. **Convection** is conduction plus bulk motion, and its rate is proportional to a temperature *difference* across a boundary layer whose thickness the flow happens to have produced. **Radiation** is electromagnetic emission, requires no medium at all, is proportional to the difference of the **fourth powers** of absolute temperature, and can go from cold to hot as easily as hot to cold, which is why a room at $21\ {}^{\circ}\mathrm{C}$ still receives heat from a wall at $15\ {}^{\circ}\mathrm{C}$ and why the net exchange is what matters.

Because the mechanisms are physically independent, they add — and because convection and radiation are both written against a temperature difference, they can be added as conductances at a surface. That single fact, the **surface energy balance**, is the tool that solves most of what an engineer actually meets, and it is worth stating before any of the machinery: *the rate at which energy arrives at a surface from one side equals the rate at which it leaves from the other side, plus any heat generated in the surface itself.* Every fin, every insulation blanket, every heat sink and every building envelope in this course is that sentence with two of its terms deleted.

::: warning Seven heat-transfer errors that survive a design review
**Confusing $k$ with $h$.** $k$ is a **property** — watts per metre-kelvin, set by the material and the temperature, tabulated and bought. $h$ is a **condition** — watts per square metre-kelvin, set by the material, the geometry, the velocity, the roughness and whether the flow is laminar, and it must be calculated or measured for the case in hand. **A coefficient quoted without its flow condition is not a number, it is a rumour.** **Using a convection coefficient from a different geometry.** A tube's $h$ at $\mathrm{Re} = 10{,}000$ is not a flat plate's, a sphere's is not a cylinder's, and an array of pins in a duct has a different $h$ from an isolated pin in free stream. **Correlations do not travel**, and the reason a heat sink bought from a catalogue underperforms is usually that its published $h$ was measured in a wind tunnel at one velocity and one orientation. **Dropping radiation because "it is only radiation."** For a surface in **free convection in air** at any temperature difference from $1$ to $125\ \mathrm{K}$, a surface of emissivity $0.9$ loses **more** by radiation than by convection — by a factor of $1.3$ at $125\ \mathrm{K}$ and $2.5$ at $1\ \mathrm{K}$. **The reason natural-convection heat-transfer tests are quoted "with and without radiation" is that forgetting it is a $50$ to $100\ \%$ error.** **Using a temperature difference where a fourth-power difference belongs.** $q = \epsilon \sigma (T_s^4 - T_{\mathrm{sur}}^4)$ is not $\epsilon \sigma T^3 \Delta T$ unless you say which $T$; the linearisation is good to $5\ \%$ for $\Delta T < 50\ \mathrm{K}$ near room temperature and bad by a factor of two at $1000\ \mathrm{K}$. **Adding a convection and a radiation coefficient computed at different surface temperatures.** Both depend on $T_s$; the sum must be evaluated at the **same** $T_s$, and when $T_s$ is unknown — which is most of the time — the balance must be iterated or solved as one equation. **Forgetting contact resistance.** Two machined aluminium surfaces at atmospheric pressure touch over $1$ to $10\ \%$ of their apparent area, and the interface conductance is $1000$ to $3000\ \mathrm{W / m^{2} K}$, which for a $5\ \mu\mathrm{m}$ mean roughness is the same resistance as an air gap of the same thickness. **A bolted joint's interface can cost more temperature drop than the two parts it joins**, and a smear of thermal grease at $15{,}000\ \mathrm{W / m^{2} K}$ recovers most of it for the price of a tube. **Treating the surroundings' temperature as the air temperature.** Radiation sees the **walls**, and a room with air at $21\ {}^{\circ}\mathrm{C}$ and single-glazed windows at $8\ {}^{\circ}\mathrm{C}$ has an operative temperature at a standing person nearer $19.8\ {}^{\circ}\mathrm{C}$ than $21$, once the $15\ \%$ of the enclosing area that is glass is counted. **The reason a draught is felt on a cold-wall side of a room and not on the warm one, and the reason a thermostat on a wall next to a window is wrong.**
:::

## The three rate equations

::: definition Conduction and Fourier's law {#def-conduction}
**The law, in one dimension and in three.**
$$
q_x = - k A \frac { d T } { d x } \qquad \boldsymbol{q} = - k \nabla T \qquad \left[ \boldsymbol{q} \right] = \mathrm{W / m ^ { 2 } }
$$
$q$ is a **rate** in watts, $\boldsymbol{q}$ is a **flux** in watts per square metre, and the minus sign is the statement that energy flows downhill. Both are called heat flux in speech, which is one of the two great sources of confusion in the subject; the other is $k$ versus $h$.
**What $k$ is.** A transport coefficient. In a gas, $k = \frac{1}{3} \rho c_v \bar{v} \ell$ — density, specific heat, mean molecular speed, mean free path — which is why a gas's conductivity is **independent of pressure** over four orders of magnitude and rises as $\sqrt{T}$. In a metal, free electrons carry most of it, and the same electrons carry electricity, which is the **Wiedemann–Franz law**:
$$
\frac { k } { \sigma _ { e } T } = L = 2 . 4 5 \times 1 0 ^ { - 8 }\ \mathrm { W \Omega / K ^ { 2 } }
$$
**The consequence that surprises everyone.** A good electrical conductor is a good thermal conductor, at every temperature, to within a factor of two — which is why copper and aluminium are both the wiring and the heat sink, and why stainless steel, ten times more resistive, is also eight times less conductive. Diamond breaks the rule in both directions: it conducts heat better than copper and conducts electricity not at all, because in diamond the carriers are lattice vibrations, not electrons.
**The range of $k$ at $300\ \mathrm{K}$, in $\mathrm{W / m \cdot K}$.**
$$
\begin{array}{l r l r}
\text{Diamond} & 2 0 0 0 - 2 2 0 0 & \text{Window glass} & 1 . 4 \\
\text{Silver} & 4 2 9 & \text{Concrete} & 1 . 4 \\
\text{Copper} & 4 0 1 & \text{Brick} & 0 . 7 2 \\
\text{Aluminium 2024} & 1 7 9 & \text{Water} & 0 . 6 1 3 \\
\text{Titanium} & 2 1 . 9 & \text{Thermal grease} & 0 . 5 - 5 \\
\text{Stainless 304} & 1 4 . 9 & \text{Polyethylene} & 0 . 4 \\
\text{Magnesia insulation} & 0 . 0 7 1 & \text{Fibreglass blanket} & 0 . 0 4 3 \\
\text{Air} & 0 . 0 2 6 3 & \text{Silica aerogel} & 0 . 0 1 3 \\
& & \text{Evacuated space} & 0
\end{array}
$$
**Five orders of magnitude**, from silver to an evacuated gap, and the whole of insulation technology is the bottom three rows: trap a gas in cells smaller than its mean free path or smaller than the onset of natural convection, and you have made a solid that conducts like a gas.
:::

::: definition Convection and Newton's law of cooling {#def-convection}
$$
q = h A \left( T _ { s } - T _ { \infty } \right) \qquad \left[ h \right] = \mathrm { W / m ^ { 2 } K }
$$
**It is not a law.** It is a **definition** of $h$ proposed by Newton in 1701, and it contains no physics: it says only that the rate is proportional to the area and to the temperature difference, and hands the entire difficulty — the proportionality constant — to whoever is doing the calculating. Everything from here to the end of the course is a way of finding $h$.
**What $h$ really is.** At the wall the fluid does not move, so the heat crosses the boundary by **conduction alone**:
$$
h = \frac { - k _ { f } \left( d T / d y \right) _ { y = 0 } } { T _ { s } - T _ { \infty } }
$$
**The whole of convection is therefore a boundary-layer problem**: $h$ is the fluid's conductivity divided by the thickness of the stagnant film the flow happens to maintain. That is why blowing on a hot spoon works, why $h$ in water is a hundred times $h$ in air, and why $h$ for boiling and condensing is a thousand times $h$ in still air.
**The ranges, which are the most useful table in the subject.**
$$
\begin{array}{l l}
\text{Free convection, gases} & 2 - 2 5 \\
\text{Free convection, liquids} & 5 0 - 1 0 0 0 \\
\text{Forced convection, gases} & 2 5 - 2 5 0 \\
\text{Forced convection, liquids} & 5 0 - 2 0 {,} 0 0 0 \\
\text{Boiling} & 2 5 0 0 - 1 0 0 {,} 0 0 0 \\
\text{Condensing vapour} & 5 0 0 0 - 1 0 0 {,} 0 0 0 \\
\text{Radiation, linearised near } 3 0 0 \mathrm{K}, & \epsilon = 0 . 3 - 0 . 9 5 : \; 5 - 3 0
\end{array}
$$
**Read the table as a design instruction.** Air is a bad coolant and water is a good one; a phase change is better than either; and radiation is competitive with free convection in a gas and irrelevant next to forced convection in a liquid. **The reason a jet engine's turbine blade is convection-cooled and a laptop is not is that the two $h$ values differ by a factor of a hundred.**
:::

::: definition Radiation and the Stefan–Boltzmann law {#def-radiation}
**The emission of an ideal surface.** A **blackbody** is a perfect emitter and a perfect absorber, and its emissive power is
$$
E _ { b } = \sigma T ^ { 4 } , \qquad \sigma = 5 . 6 7 0 \times 1 0 ^ { - 8}\ \mathrm { W / m ^ { 2 } K ^ { 4 } }
$$
**The net exchange with large surroundings.** A real surface of emissivity $\epsilon$ at $T_s$ in a large enclosure at $T_{\mathrm{sur}}$ emits $\epsilon \sigma T_s^4$ and intercepts $\epsilon \sigma T_{\mathrm{sur}}^4$ — the enclosure sees the surface, not the other way round — so
$$
q = \epsilon \sigma A \left( T _ { s } ^ { 4 } - T _ { \mathrm{sur}} ^ { 4 } \right)
$$
**The two temperatures are not the same thing.** $T_\infty$ is the **air** temperature and $T_{\mathrm{sur}}$ is the **wall** temperature, and in a real room they differ by several kelvin. **A person in a room with the air at $21\ {}^{\circ}\mathrm{C}$ and the windows at $8\ {}^{\circ}\mathrm{C}$ is losing heat by radiation to a sink that is not the air**, and no thermostat that measures only air can see it.
**Emissivity, absorptivity and Kirchhoff's law.** $\epsilon$ ranges from $0.02$ for a gold-plated or silvered surface to $0.95$ for white paint, skin, paper and oxidised surfaces, and it is **not** a colour property: white paint is $\epsilon = 0.93$ and so is black, which is why a whitewashed adobe house stays cool and a white-painted car roof is still hot in the sun. **Kirchhoff's law** says that at the same temperature, absorptivity equals emissivity, $\alpha_\lambda = \epsilon_\lambda$ — and the engineering escape from it is that a surface may have **different** emissivities at the wavelengths it is being asked about: a solar-selective absorber has $\epsilon_{\mathrm{solar}} \approx 0.1$ and $\epsilon_{\mathrm{thermal}} \approx 0.9$, because the sun is at $5800\ \mathrm{K}$ and the absorber is at $350\ \mathrm{K}$ and they emit in different parts of the spectrum.
**The linearised coefficient.** Writing $q = h_r A (T_s - T_{\mathrm{sur}})$,
$$
h _ { r } = \epsilon \sigma \left( T _ { s } + T _ { \mathrm{sur}} \right) \left( T _ { s } ^ { 2 } + T _ { \mathrm{sur}} ^ { 2 } \right)
$$
which at $300\ \mathrm{K}$ and $\epsilon = 0.9$ is $5.1\ \mathrm{W / m^2 K}$ and is the reason "radiation is negligible" is the most expensive sentence in building physics.
:::

::: example One sphere, three coolants {#ex-sphere}
A **$50\ \mathrm{mm}$ diameter copper sphere** at a uniform $200\ {}^{\circ}\mathrm{C}$ sits in a room whose air and walls are both at $20\ {}^{\circ}\mathrm{C}$. Its surface emissivity is $0.70$. How fast does it cool, and what changes if it is dropped into a tank of moving water?
**The area and the mass.**
$$
A = \pi d ^ { 2 } = \pi \times 0 . 0 5 ^ { 2 } = 7 . 8 5 4 \times 1 0 ^ { - 3}\ \mathrm { m ^ { 2 } } , \qquad m = \rho \frac { \pi d ^ { 3 } } { 6 } = 8 9 3 3 \times 1 . 3 0 9 \times 1 0 ^ { - 4 } = 1 . 1 6 9\ \mathrm { k g }
$$
**Radiation, first, because it needs no correlation.**
$$
q _ { \mathrm { rad } } = 0 . 7 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 7 . 8 5 4 \times 1 0 ^ { - 3 } \times \left( 4 7 3 ^ { 4 } - 2 9 3 ^ { 4 } \right) = 3 . 1 1 7 \times 1 0 ^ { - 1 0 } \times 4 . 2 6 9 \times 1 0 ^ { 1 0 } = \mathbf { 1 3 . 3\ W }
$$
**Free convection, which needs the natural-convection correlation for a sphere.** With the film properties at $373\ \mathrm{K}$ ($\nu = 2 . 2 6 \times 1 0 ^ { - 5}$, $\alpha _{d} = 3 . 3 2 \times 1 0 ^ { - 5}$, $k = 0 . 0 3 1 7$, $\mathrm{Pr} = 0 . 69$):
$$
\mathrm { R a } _ { D } = \frac { g \beta \Delta T D ^ { 3 } } { \nu \alpha _ { d } } = \frac { 9 . 8 1 \times 2 . 6 8 1 \times 1 0 ^ { - 3 } \times 1 8 0 \times 1 . 2 5 \times 1 0 ^ { - 4 } } { 7 . 5 0 \times 1 0 ^ { - 1 0 } } = 7 . 9 \times 1 0 ^ { 5 }
$$
$$
\mathrm { N u } _ { D } = 2 + \frac { 0 . 5 8 9 \, \mathrm { R a } _ { D } ^ { 1 / 4 } } { \left[ 1 + ( 0 . 4 6 9 / \mathrm { Pr } ) ^ { 9 / 1 6 } \right] ^ { 4 / 9 } } = 2 + \frac { 0 . 5 8 9 \times 2 9 . 8 } { 1 . 3 0 } = 1 5 . 5 , \qquad h = \frac { 1 5 . 5 \times 0 . 0 3 1 7 } { 0 . 0 5 } = \mathbf { 9 . 8\ W / m ^ { 2 } K }
$$
$$
q _ { \mathrm { conv } } = 9 . 8 \times 7 . 8 5 4 \times 1 0 ^ { - 3 } \times 1 8 0 = \mathbf { 1 3 . 9\ W }
$$
**The two mechanisms are within $5\ \%$ of each other.** The combined coefficient is $h + h_r = ( 13.3 + 13.9 ) / ( 7.854 \times 10^{-3} \times 180 ) = 9.8 + 9.4 = 19.2\ \mathrm{W / m^2 K}$, and **radiation is $49\ \%$ of the total loss from a surface in still air at a $180\ \mathrm{K}$ difference** — with an emissivity of only $0.7$.
**The cooling rate.**
$$
\frac { d T } { d t } = - \frac { q } { m c } = - \frac { 2 7 . 2 } { 1 . 1 6 9 \times 3 8 5 } = - 0 . 0 6 0 5\ \mathrm { K / s } = \mathbf { 3 . 6\ K / m i n }
$$
**Now the water tank.** Water at $20\ {}^{\circ}\mathrm{C}$ flowing past the sphere at $1\ \mathrm{m / s}$: $\mathrm{Re}_D = 1 \times 0 . 0 5 / 1 . 0 0 4 \times 1 0 ^ { - 6 } = 4 . 9 8 \times 1 0 ^ { 4 }$, $\mathrm{Pr} = 7 . 0$, and Whitaker's correlation gives
$$
\mathrm { N u } _ { D } = 2 + \left( 0 . 4 \mathrm { R e } ^ { 1 / 2 } + 0 . 0 6 \mathrm { R e } ^ { 2 / 3 } \right) \mathrm { Pr } ^ { 0 . 4 } = 2 + ( 8 9 . 3 + 8 4 . 2 ) \times 2 . 1 8 = 3 8 0 , \qquad h = \mathbf { 4 5 5 0\ W / m ^ { 2 } K }
$$
$$
q _ { \mathrm { conv } } = 4 5 5 0 \times 7 . 8 5 4 \times 1 0 ^ { - 3 } \times 1 8 0 = \mathbf { 6 . 4\ k W } \qquad \left( \mathrm { radiation\ still\ } 1 3 . 3\ \mathrm { W } \right)
$$
**The reading.** Moving from still air to moving water multiplies the convective term by **$460$** and leaves the radiative term **exactly where it was**. **Radiation is never the answer to a cooling problem that water can solve, and it is often the whole answer to one that air cannot.**
:::

## The surface energy balance

::: definition The surface energy balance {#def-seb}
At any boundary between two media, energy is conserved and cannot accumulate in a surface of zero thickness. Therefore, per unit area,
$$
q _ { \mathrm { in , conv } } ^ { \prime \prime } + q _ { \mathrm { in , rad } } ^ { \prime \prime } + q _ { \mathrm { gen } } ^ { \prime \prime } = q _ { \mathrm { out , cond } } ^ { \prime \prime } + q _ { \mathrm { out , rad } } ^ { \prime \prime } + q _ { \mathrm { out , conv } } ^ { \prime \prime }
$$
**and every heat-transfer problem in this course is this equation with some of its terms crossed out.** Four canonical reductions:
$$
\begin{array}{l l}
\text{Insulated wall} & - k \dfrac { d T } { d x } \bigg | _ { \mathrm { in } } = h _ { i } \left( T _ { \infty , i } - T _ { s , i } \right) \quad \text{and} \quad - k \dfrac { d T } { d x } \bigg | _ { \mathrm { out } } = h _ { o } \left( T _ { s , o } - T _ { \infty , o } \right) \\[6pt]
\text{Specified heat flux} & - k \dfrac { d T } { d x } \bigg | _ { x = 0 } = q _ { 0 } ^ { \prime \prime } \quad \text{(a chip, a brake face, a weld)} \\[6pt]
\text{Radiation-dominated surface} & - k \dfrac { d T } { d x } = h \left( T _ { s } - T _ { \infty } \right) + \epsilon \sigma \left( T _ { s } ^ { 4 } - T _ { \mathrm { sur } } ^ { 4 } \right) \quad \text{(nonlinear: iterate)} \\[6pt]
\text{Phase change at the surface} & - k \dfrac { d T } { d x } = \dot { m } ^ { \prime \prime } h _ { f g } \quad \text{(evaporation, boiling, solidification)}
\end{array}
$$
**The one that is almost always wrong.** When a surface exchanges radiation with surroundings at $T_{\mathrm{sur}}$ **and** convection with air at $T_\infty$, and $T_s$ is unknown, the balance is a **fourth-degree** equation in $T_s$. Linearising it once and iterating twice is the standard practice, and **solving it with $T_s$ taken from the convection-only version is a $10$ to $20\ \mathrm{K}$ error** on a hot surface.
:::

::: example A person, a room, and two thermostats {#ex-person}
A standing adult has a **clothing surface of $1.8\ \mathrm{m^2}$ at $28\ {}^{\circ}\mathrm{C}$** and skin at $33\ {}^{\circ}\mathrm{C}$. In still air the surface coefficients are $h_c = 3\ \mathrm{W/m^2 K}$ and $h_r = 5\ \mathrm{W/m^2 K}$. Compare two rooms whose **air** is at $21\ {}^{\circ}\mathrm{C}$ in both cases: an old one with walls at $15\ {}^{\circ}\mathrm{C}$, and a radiant-floored one with walls and floor at $25\ {}^{\circ}\mathrm{C}$.
**Cold walls.**
$$
q _ { \mathrm { conv } } = 3 \times 1 . 8 \times ( 2 8 - 2 1 ) = 3 7 . 8\ \mathrm { W } , \qquad q _ { \mathrm { rad } } = 5 \times 1 . 8 \times ( 2 8 - 1 5 ) = 1 1 7 . 0\ \mathrm { W }
$$
**Warm floor.**
$$
q _ { \mathrm { conv } } = 3 7 . 8\ \mathrm { W } , \qquad q _ { \mathrm { rad } } = 5 \times 1 . 8 \times ( 2 8 - 2 5 ) = 2 7 . 0\ \mathrm { W }
$$
**The difference is $90\ \mathrm{W}$ — the whole resting metabolic rate — for identical air temperature.** Adding the roughly constant evaporative and respiratory losses of $65\ \mathrm{W}$, the cold-walled room demands $220\ \mathrm{W}$ from a body producing $90\ \mathrm{W}$, and the occupant is cold; the radiant room demands $130\ \mathrm{W}$ and the occupant is comfortable in a light shirt.
**The operative temperature**, which is the air temperature that would give the same loss, is the conductance-weighted mean:
$$
t _ { o } = \frac { h _ { c } T _ { \infty } + h _ { r } T _ { \mathrm { sur } } } { h _ { c } + h _ { r } } = \frac { 3 \times 2 1 + 5 \times 1 5 } { 8 } = \mathbf { 1 7 . 3 ^ { \circ } C } \quad \text{cold walls} , \qquad \frac { 3 \times 2 1 + 5 \times 2 5 } { 8 } = \mathbf { 2 3 . 5 ^ { \circ } C } \quad \text{warm floor}
$$
**The design consequence.** Radiant heating at $25\ {}^{\circ}\mathrm{C}$ surfaces gives the same comfort as $29.7\ {}^{\circ}\mathrm{C}$ air at $15\ {}^{\circ}\mathrm{C}$ walls — a **$6.2\ \mathrm{K}$** reduction in air temperature. At the widely used rule of $2.2\ \%$ of heating energy per kelvin of indoor temperature, that is **$14\ \%$**, and it is bought with a warm floor rather than with a boiler. **It is also why a room can feel draughty at $22\ {}^{\circ}\mathrm{C}$ and stuffy at $20\ {}^{\circ}\mathrm{C}$, and why a sensor in a return air duct is the wrong instrument for a comfort question.**
:::

::: widget plot
title: Radiation's share of the loss from a hot surface in still air
f: 0.9*5.67*pow(10,-8)*((x+273)+293)*(pow(x+273,2)+pow(293,2)); 7.6; 45
x: 0, 500
y: 0, 60
labels: h_r for epsilon = 0.9 (walls at 20 C); free convection in air, typical; forced convection in air, 3 m/s
caption: The linearised radiation coefficient $h_r = \epsilon \sigma (T_s + T_{\mathrm{sur}})(T_s^2 + T_{\mathrm{sur}}^2)$ for an emissivity of $0.9$ in a room at $20\ {}^{\circ}\mathrm{C}$, against the surface temperature in Celsius, with two convection levels drawn for comparison. **At $20\ {}^{\circ}\mathrm{C}$, $h_r$ is already $5.1\ \mathrm{W/m^2 K}$ — larger than most free-convection coefficients in air.** It reaches $7.6$ at $100\ {}^{\circ}\mathrm{C}$, $18.3$ at $300\ {}^{\circ}\mathrm{C}$ and $37.2$ at $500\ {}^{\circ}\mathrm{C}$, so **radiation overtakes modest forced convection at about $250\ {}^{\circ}\mathrm{C}$ and dominates everything above $400\ {}^{\circ}\mathrm{C}$**. **The consequence for a designer is a rule of thumb worth more than most of the theory: below $80\ {}^{\circ}\mathrm{C}$ in air, radiation and free convection are of comparable size and both must be counted; between $80$ and $300\ {}^{\circ}\mathrm{C}$ radiation is the larger of the two natural mechanisms; above $300\ {}^{\circ}\mathrm{C}$ it is the only one worth calculating unless the gas is moving fast.**
:::

## Conductivity, diffusivity, effusivity

::: definition Thermal diffusivity and the penetration depth {#def-alpha}
Conductivity says how much heat flows. **Diffusivity says how fast the temperature changes**, and it is the property that governs every transient problem:
$$
\alpha = \frac { k } { \rho c _ { p } } \qquad \left[ \alpha \right] = \mathrm { m ^ { 2 } / s } , \qquad \frac { \partial T } { \partial t } = \alpha \nabla ^ { 2 } T
$$
**The denominator is the reason.** $\rho c_p$ is the heat a cubic metre stores per kelvin; $k$ is the heat it transmits per metre per kelvin per second. A material that conducts well **and** stores little — copper, diamond — equalises its temperature quickly; a material that conducts well but stores a great deal — water, which conducts twice as well as glass and stores three times as much per unit volume — is slow.
**The penetration depth.** A thermal disturbance applied to a surface has reached a depth of order
$$
\delta \sim \sqrt { \alpha t }
$$
after a time $t$ — the **thermal diffusion length**, and the single most useful estimate in the subject. It is a square root, so **each factor of ten in depth costs a factor of a hundred in time**.
$$
\begin{array}{l r r l}
\text{Material} & k \left( \mathrm { W / m K } \right) & \alpha \left( \mathrm { m ^ { 2 } / s } \right) & \delta \text{ after } 6 0 \mathrm { s } \\
\text{Diamond} & 2 0 0 0 & 1 . 1 2 \times 1 0 ^ { - 3 } & 2 6 \mathrm { m } \\
\text{Silver} & 4 2 9 & 1 . 4 9 \times 1 0 ^ { - 4 } & 9 . 4 \mathrm { m m } \\
\text{Copper} & 4 0 1 & 1 . 1 2 \times 1 0 ^ { - 4 } & 8 . 2 \mathrm { m m } \\
\text{Aluminium} & 2 3 7 & 9 . 7 3 \times 1 0 ^ { - 5 } & 7 . 6 \mathrm { m m } \\
\text{Carbon steel} & 5 0 & 1 . 3 6 \times 1 0 ^ { - 5 } & 2 . 9 \mathrm { m m } \\
\text{Stainless 304} & 1 4 . 9 & 3 . 8 \times 1 0 ^ { - 6 } & 1 . 5 \mathrm { m m } \\
\text{Air} & 0 . 0 2 6 3 & 2 . 2 2 \times 1 0 ^ { - 5 } & 1 . 2 \mathrm { m m } \\
\text{Water} & 0 . 6 1 3 & 1 . 4 7 \times 1 0 ^ { - 7 } & 0 . 3 0 \mathrm { m m } \\
\text{Concrete} & 1 . 4 & 5 . 4 \times 1 0 ^ { - 7 } & 0 . 1 8 \mathrm { m m } \\
\text{Skin} & 0 . 3 5 6 & 1 . 0 2 \times 1 0 ^ { - 7 } & 0 . 0 2 5 \mathrm { m m }
\end{array}
$$
**The three readings.** Copper's $\delta$ in a minute is $8\ \mathrm{mm}$, so a copper coin dropped in tea is hot through in a minute and a steel one in four. Water's is $0.3\ \mathrm{mm}$, which is why water cannot be heated by heating its surface and why every kettle boils from the bottom. **Skin's is $25\ \mu\mathrm{m}$, which is why a $200\ {}^{\circ}\mathrm{C}$ finger of hot air for a second does not burn and a finger of boiling water for a second does** — the air's low $\rho c_p$ means the second of contact delivers only the heat stored in the first $25\ \mu\mathrm{m}$ of it.
**The periodic version.** For a surface temperature oscillating with angular frequency $\omega$, the disturbance is damped to $1/e$ at the **damping depth**
$$
d = \sqrt { \frac { 2 \alpha } { \omega } }
$$
For soil at $\alpha = 5 \times 10^{-7}$: the **daily** wave ($\omega = 7.27 \times 10^{-5}$) dies out at $d = 117\ \mathrm{mm}$ and the **annual** wave ($\omega = 1.99 \times 10^{-7}$) at $d = 2.24\ \mathrm{m}$. **Below about $6\ \mathrm{m}$ the ground is at the annual mean air temperature all year in the mid latitudes**, which is the entire physical basis of ground-source heat pumps and of the cellar that is cool in July.
:::

::: definition Thermal effusivity and the contact temperature {#def-effusivity}
When two semi-infinite bodies at $T_1$ and $T_2$ are put into perfect contact, the interface jumps immediately to a temperature that is a **conductance-weighted** mean,
$$
T _ { \mathrm { int } } = \frac { e _ { 1 } T _ { 1 } + e _ { 2 } T _ { 2 } } { e _ { 1 } + e _ { 2 } } , \qquad e = \sqrt { k \rho c _ { p } } = \frac { k } { \sqrt { \alpha } } \qquad \left[ e \right] = \mathrm { J / m ^ { 2 } K \sqrt { s } }
$$
and $e$ is the **effusivity**: the rate at which a body can deliver heat into a contact, per unit surface area and per kelvin.
**Why it is the right property and conductivity is not.** Sensation, scalding, ignition, thermal shock and the "coldness" of a material are all set by the **initial** rate of heat flow into or out of a surface, and that rate is $e (T_1 - T_2)$, not $k(T_1-T_2)/L$. Effusivity is the property a touch sensor, a hot-wire anemometer probe, a thermal-wave measurement and a burn model all measure.
$$
\begin{array}{l r l r}
\text{Aluminium} & 2 4 {,} 0 6 0 & \text{Water} & 1 5 9 8 \\
\text{Steel} & 1 3 {,} 5 4 0 & \text{Concrete} & 1 6 8 0 \\
\text{Marble} & 2 5 8 0 & \text{Human skin} & 1 1 1 6 \\
\text{Glass} & 1 6 7 0 & \text{Oak wood} & 4 7 0 \\
\text{Ice} & 1 8 9 0 & \text{Still air} & 5 . 6
\end{array}
$$
:::

::: example Why the steel floor is cold and the wooden one is not {#ex-effusivity}
Both floors are at $20\ {}^{\circ}\mathrm{C}$. Both are bare. Skin is at $33\ {}^{\circ}\mathrm{C}$ with $e = 1116$. What temperature does the skin's surface actually reach?
$$
T _ { \mathrm { int } } = \frac { 1 1 1 6 \times 3 3 + e _ { b } \times 2 0 } { 1 1 1 6 + e _ { b } }
$$
$$
\begin{array}{l l l}
\text{Steel} & ( 3 6 {,} 8 3 0 + 2 7 0 {,} 8 0 0 ) / 1 4 {,} 6 6 0 = \mathbf { 2 1 . 0 ^ { \circ } C } & \text{painfully cold} \\
\text{Concrete} & ( 3 6 {,} 8 3 0 + 3 3 {,} 6 0 0 ) / 2 7 9 6 = \mathbf { 2 5 . 2 ^ { \circ } C } & \text{cold} \\
\text{Water} & ( 3 6 {,} 8 3 0 + 3 1 {,} 9 6 0 ) / 2 7 1 4 = \mathbf { 2 5 . 3 ^ { \circ } C } & \text{cold} \\
\text{Oak wood} & ( 3 6 {,} 8 3 0 + 9 {,} 4 0 0 ) / 1 5 8 6 = \mathbf { 2 9 . 2 ^ { \circ } C } & \text{neutral} \\
\text{Air gap} & ( 3 6 {,} 8 3 0 + 1 1 2 ) / 1 1 2 2 = \mathbf { 3 2 . 9 ^ { \circ } C } & \text{neutral}
\end{array}
$$
**The threshold for the sensation of cold on glabrous skin is about $30\ {}^{\circ}\mathrm{C}$**, and the table crosses it between concrete and wood. **Both floors are at the same temperature; the skin's own surface is $8\ \mathrm{K}$ warmer on the wood**, and that is the whole of the phenomenon.
**The corollaries, all of which are true and all of which are surprising.** A $250\ {}^{\circ}\mathrm{C}$ oven at $50\ \%$ humidity and a $100\ \%$ humidity sauna at $50\ {}^{\circ}\mathrm{C}$: the oven is survivable and the sauna is not, because the air's effusivity is $5.6$ and steam's is two orders higher. A metal sculpture in a $-5\ {}^{\circ}\mathrm{C}$ garden can strip skin heat fast enough to freeze it and a wooden one at the same temperature cannot. And a **wet** sock in a $10\ {}^{\circ}\mathrm{C}$ boot is a far worse proposition than a dry one, because water's effusivity is $1598$ against wool's $450$ and because the water also replaces the trapped air whose conductivity you were relying on.
:::

::: widget plot
title: The temperature your skin reaches, against the effusivity of what it touches
f: (1116*33 + pow(10,x)*20)/(1116+pow(10,x))
x: 2, 5
y: 19, 34
caption: The contact temperature of skin at $33\ {}^{\circ}\mathrm{C}$ touching a large body at $20\ {}^{\circ}\mathrm{C}$, plotted against $\log_{10}$ of the body's effusivity $e = \sqrt{k \rho c_p}$. Reading along the axis: still air at $e = 5.6$ is off the left of the chart and gives $32.9\ {}^{\circ}\mathrm{C}$; $e = 100$ (a blanket, a carpet) gives $31.9$; $e = 470$ (oak) gives $29.2$; $e = 1000$ (skin, board) gives $26.9$; $e = 3000$ (marble, glass) gives $23.4$; $e = 10^4$ (steels) gives $21.3$; $e = 10^5$ (copper, diamond) gives $20.1$. **The curve is flat at both ends and steep in the middle, and the steep part — $e$ between $300$ and $30{,}000$ — is exactly the range of every material a person might stand on.** **The sensation of "cold floor" is therefore not a temperature judgement at all: it is an effusivity measurement, and the $30\ {}^{\circ}\mathrm{C}$ comfort threshold is crossed at $e \approx 600$, which is why a wooden floor at $17\ {}^{\circ}\mathrm{C}$ feels acceptable and a stone one at $19\ {}^{\circ}\mathrm{C}$ does not.**
:::

## The interface: contact resistance

::: definition Thermal contact resistance {#def-tcr}
Two nominally flat surfaces are flat to about $\lambda / 4$ over a bandwidth of wavelengths and rough to everything else, so they touch at the tops of their asperities and stand apart by the rest. The **mean gap** is of order the mean roughness $\delta$ (typically $1$–$10\ \mu\mathrm{m}$) and the **real contact area** is $1$–$10\ \%$ of the apparent area, set by hardness rather than by flatness:
$$
a = \frac { p } { p _ { c } } , \qquad p _ { c } \approx H \sim 1 0 ^ { 8 } \ \mathrm { Pa } \text{ for soft metals}
$$
so at a bolt pressure of $10\ \mathrm{kPa}$ the asperities carry the load at a **contact** pressure of $H$ and the area fraction is $10^{-3}$. The interface conductance is then the sum of a constriction term and a gap term,
$$
h _ { c } \approx \frac { a k _ { s } } { \delta } + \frac { \left( 1 - a \right) k _ { g } } { \delta } + h _ { \mathrm { rad } }
$$
and the measured values, from the standard tables, are:
$$
\begin{array}{l r r}
\text{Joint (pressure } 1 0 ^ { 4 }\ \mathrm { Pa } ) & h _ { c } \text{ dry} & h _ { c } \text{ with grease} \\
\text{Aluminium / aluminium} & 1 1 0 0 - 3 5 0 0 & 8 7 0 0 - 2 3 {,} 6 0 0 \\
\text{Stainless / stainless} & 8 0 0 - 2 1 0 0 & 8 7 0 0 - 2 3 {,} 6 0 0 \\
\text{Stainless / copper} & 8 2 0 - 2 4 0 0 & 1 2 {,} 1 0 0 - 2 3 {,} 6 0 0 \\
\text{Mild steel / mild steel} & 1 8 9 0 - 5 8 0 0 & 8 7 0 0 - 2 3 {,} 6 0 0
\end{array}
$$
**Four things the table says.** (i) **Pressure helps, weakly**: $h_c$ goes roughly as $p^{0.9}$ for soft contacts and $p^{0.3}$ for hard ones, so **quadrupling the bolt load buys a factor of two at best**. (ii) **A grease or a phase-change pad multiplies $h_c$ by five to ten** for a few grams of material and no design change. (c) **Soft interfaces beat hard ones**, because the real area is set by hardness: indium, gallium, soft aluminium and graphite foil are used for exactly this reason. (iv) **An interface conductance of $2000\ \mathrm{W/m^2 K}$ is equivalent to an air gap of $k_{\mathrm{air}} / h_c = 13\ \mu\mathrm{m}$** — which is to say, **the interface behaves as though the two parts were separated by a visible film of air, and often are.**
:::

::: example The joint that costs more than the parts {#ex-tcr}
Two **aluminium plates, each $10\ \mathrm{mm}$ thick and $100\ \mathrm{cm^2}$**, are bolted together with a dry interface of $h_c = 2000\ \mathrm{W/m^2 K}$ and carry a heat flux of $5000\ \mathrm{W/m^2}$. Take $k_{\mathrm{Al}} = 237\ \mathrm{W/m\,K}$.
**The two plates.**
$$
\Delta T _ { \text{one plate} } = { \frac { q ^ { \prime \prime } L } { k } } = { \frac { 5 0 0 0 \times 0 . 0 1 0 } { 2 3 7 } } = 0 . 2 1 1 \ \mathrm { K } \qquad \Longrightarrow \qquad \Delta T _ { \text{both} } = 0 . 4 2 \ \mathrm { K }
$$
**The interface.**
$$
\Delta T _ { \text{interface} } = { \frac { q ^ { \prime \prime } } { h _ { c } } } = { \frac { 5 0 0 0 } { 2 0 0 0 } } = \mathbf { 2 . 5 0\ K }
$$
**The interface is $86\ \%$ of the total $2.92\ \mathrm{K}$ drop**, in a joint whose combined metal thickness is $20\ \mathrm{mm}$ and whose gap is invisible.
**Now fit a thermal interface material at $h_c = 15{,}000\ \mathrm{W/m^2 K}$.**
$$
\Delta T _ { \text{interface} } = { \frac { 5 0 0 0 } { 1 5 { , } 0 0 0 } } = 0 . 3 3 3\ \mathrm { K } , \qquad \Delta T _ { \text{total} } = 0 . 7 6\ \mathrm { K }
$$
**A $3.8$-fold reduction in total temperature drop, from a smear of paste $50\ \mu\mathrm{m}$ thick.** The equivalent air gap removed is $(1/2000 - 1/15000) \times 0.0263 = 11.4\ \mu\mathrm{m}$.
**The design rule that follows.** Compute the interface resistance **first**, before you size the part it is attached to. **On any assembly where a component is bolted, clamped or soldered to a heat path, the joint is between a third and nine tenths of the resistance, and it is the cheapest resistance in the design to reduce.**
:::

## Which mechanism to attack

::: example Radiation against free convection: where the crossover is {#ex-crossover}
A **vertical plate $0.1\ \mathrm{m}$ high** in air, surroundings equal to air temperature, for the laminar natural-convection correlation $\mathrm{Nu} = 0.68 + 0.670 \mathrm{Ra}^{1/4} / [1 + (0.492/\mathrm{Pr})^{9/16}]^{4/9}$ and $h_r = \epsilon \sigma (T_s + T_{\mathrm{sur}})(T_s^2 + T_{\mathrm{sur}}^2)$:
$$
\begin{array}{r r r r r}
\Delta T \left( \mathrm { K } \right) & 1 & 5 & 2 0 & 5 0 & 1 2 5 \\
h _ { c } \left( \mathrm { W / m ^ { 2 } K } \right) & 2 . 0 7 & 3 . 0 4 & 4 . 2 8 & 5 . 5 8 & 7 . 6 2 \\
h _ { r } , \ \epsilon = 0 . 9 & 5 . 1 3 & 5 . 5 4 & 5 . 9 7 & 6 . 7 7 & 9 . 8 5 \\
h _ { r } , \ \epsilon = 0 . 0 5 & 0 . 2 9 & 0 . 3 1 & 0 . 3 3 & 0 . 3 8 & 0 . 5 5 \\
\text{radiation share}, \epsilon = 0 . 9 & 7 1 \ \% & 6 5 \ \% & 5 8 \ \% & 5 5 \ \% & 5 6 \ \%
\end{array}
$$
**The reading, which is the most useful single result in this lesson.** For a high-emissivity surface cooled only by natural convection in a gas, **radiation is between $55$ and $71\ \%$ of the total loss at every temperature difference from $1\ \mathrm{K}$ to $125\ \mathrm{K}$**. It is never negligible and it never quite takes over, because $h_c \propto \Delta T^{1/4}$ and $h_r$ grows almost linearly with absolute temperature, so the two curves cross and cross back. **The practical rule: for a bare, painted, oxidised or anodised surface in still air, add $h_r \approx 5\ \mathrm{W/m^2 K}$ to $h_c$ and take the sum; forgetting it is a $50\ \%$ undersizing of the surface, and counting it twice is the same error in the other direction.**
**And for a polished surface**, the last row of the table applies: radiation is $7\ \%$ or less of the loss, and the surface must be cooled by moving the gas. **This is the entire physics of a vacuum flask, a multi-layer blanket and a survival bag: the way to defeat radiation is not to move the gas, it is to lower $\epsilon$, and the way to defeat conduction and convection is to remove the gas. Do both and you are left with $0.3\ \mathrm{W/m^2 K}$ of residual gas conduction and $0.5\ \mathrm{W/m^2 K}$ of radiation between surfaces at $\epsilon = 0.05$.**
:::

::: example Which mechanism to attack: a $45\ \mathrm{W}$ power module {#ex-module}
A **$12 \times 12\ \mathrm{mm}$** power module dissipates $45\ \mathrm{W}$ through its base. The junction-to-case resistance is $R_{jc} = 0.6\ \mathrm{K/W}$, the case-to-sink interface is $R_{\mathrm{int}} = 0.4\ \mathrm{K/W}$, the ambient is $40\ {}^{\circ}\mathrm{C}$ and the junction limit is $125\ {}^{\circ}\mathrm{C}$. What may be bought?
**The budget.**
$$
R _ { \mathrm { total } } \leq { \frac { 1 2 5 - 4 0 } { 4 5 } } = 1 . 8 8 9\ \mathrm { K / W } \qquad \Longrightarrow \qquad R _ { \mathrm { sink } } \leq 1 . 8 8 9 - 0 . 6 - 0 . 4 = \mathbf { 0 . 8 8 9\ K / W }
$$
**The options, with the resulting junction temperature.**
$$
\begin{array}{l c r l}
\text{Option} & h \text{ or } R _ { \mathrm { sink } } & T _ { j } \left( ^ { \circ } \mathrm { C } \right) & \text{verdict} \\
\text{Bare board, still air} & R _ { \mathrm { sink } } \approx 5 0\ \mathrm { K / W } & 2 2 9 5 & \text{vaporised} \\
\text{Natural-convection sink, small} & R _ { \mathrm { sink } } = 1 . 2 & 1 3 9 & 1 4\ \mathrm { K } \text{ over} \\
\text{Same sink, } 0 . 5 \mathrm { m / s } \text{ fan} & h \times 3 \Rightarrow R = 0 . 3 8 4 & 1 0 2 & \text{works, } 0 . 5\ \mathrm { W } \text{ fan} \\
\text{Triple-volume sink, still air} & R _ { \mathrm { sink } } = 0 . 5 & 1 0 8 & \text{works, silent, } 4 \times \text{ mass} \\
\text{Water cold plate} & R _ { \mathrm { sink } } = 0 . 0 5 & 8 7 & \text{works, adds a pump and a leak} \\
\text{Vapour chamber + small sink} & R _ { \mathrm { sink } } = 0 . 4 5 & 1 1 0 & \text{works, silent, moderate}
\end{array}
$$
**The three readings.** (i) **The interface is $21\ \%$ of the whole budget** and the die-level spreading resistance below it is another $0.15$–$0.37\ \mathrm{K/W}$, so **three quarters of the total resistance is inside the package and in the joint, and none of it is in the sink you are specifying.** (ii) **A fan multiplies $h$, and $R$ falls in proportion** — for a natural-convection sink the fins are already nearly isothermal, so tripling $h$ really does nearly third $R$, and $0.5\ \mathrm{W}$ of fan buys $37\ \mathrm{K}$. (iii) **The die-side flux is $31\ \mathrm{W/cm^2}$ and the sink-side flux is $3.1\ \mathrm{W/cm^2}$**, and the whole of thermal-management engineering between those two numbers is called **spreading**: a copper lid, a vapour chamber or a heat pipe buys temperature by making the sink's area actually used.
:::

::: widget plot
title: Junction temperature against heat-sink resistance, for 45 W in 40 C ambient
f: 40+45*(1.0+x); 125
x: 0, 2
y: 40, 160
labels: T_j = 40 + 45(1.0 + R_sink); the 125 C junction limit
caption: The junction temperature of the module above as a function of the sink-to-ambient resistance it is given, with the fixed $1.0\ \mathrm{K/W}$ of junction-to-case and interface resistance built in and the $125\ {}^{\circ}\mathrm{C}$ limit drawn across. **The line is straight, because the resistances are in series, and its slope is the dissipation: $45\ \mathrm{W}$, or $45\ \mathrm{K}$ per $\mathrm{K/W}$.** It crosses the limit at $R_{\mathrm{sink}} = 0.889\ \mathrm{K/W}$, which is the whole design specification in one number. **Three readings.** The intercept at $R_{\mathrm{sink}} = 0$ is $85\ {}^{\circ}\mathrm{C}$, so **even a perfect heat sink leaves the junction $45\ \mathrm{K}$ above ambient, and no amount of sink can buy back what the package has taken.** The line is steep: $1\ \mathrm{K/W}$ is $45\ \mathrm{K}$, so at $45\ \mathrm{W}$ a $20\ \%$ error in $h$ is a $9\ \mathrm{K}$ error in $T_j$ — **which is why the accuracy of a convection correlation, typically $\pm 20\ \%$, is a design margin question and not an academic one.** And the only ways to move the line rather than slide along it are to reduce the power, reduce the ambient, or reduce the internal resistances — **which is why real high-power engineering is progressively less about heat sinks and more about packaging, and why the last decade's thermal literature is dominated by lids, solders, thermal interface materials and through-silicon vias.**
:::

::: exercise The die's own temperature drop {#ex-die level=1 check="1.06"}
A silicon chip $12 \times 12\ \mathrm{mm}$ and $0.5\ \mathrm{mm}$ thick dissipates $45\ \mathrm{W}$ uniformly through its back face. Take $k_{\mathrm{Si}} = 148\ \mathrm{W/m\,K}$. What is the temperature drop across the chip?

::: solution
$$
\Delta T = { \frac { q L } { k A } } = { \frac { 4 5 \times 5 \times 1 0 ^ { - 4 } } { 1 4 8 \times 1 . 4 4 \times 1 0 ^ { - 4 } } } = { \frac { 0 . 0 2 2 5 } { 0 . 0 2 1 3 1 } } = \mathbf { 1 . 0 6\ K }
$$
**Small, because the area is large relative to the thickness and silicon is a decent conductor.** The interesting drop is not the one-dimensional one across the $0.5\ \mathrm{mm}$ but the **spreading** one where the heat leaves a $3 \times 3\ \mathrm{mm}$ active region and enters the $12 \times 12\ \mathrm{mm}$ die — that one is $0.15$–$0.4\ \mathrm{K/W}$ against $45\ \mathrm{W}$, i.e. $7$–$18\ \mathrm{K}$, and it is why high-power dies are lapped, lidded and sometimes soldered to copper tungsten.
:::
:::

::: exercise How long until the far side knows {#ex-feel level=1 check="0.66"}
A thin steel plate at $20\ {}^{\circ}\mathrm{C}$ has one face suddenly brought to $200\ {}^{\circ}\mathrm{C}$. Take $\alpha = 1.36 \times 10^{-5}\ \mathrm{m^2/s}$. After roughly how long does a hand on the far face, $3\ \mathrm{mm}$ away, begin to notice?

::: solution
Set the diffusion length equal to the thickness:
$$
t = { \frac { \delta ^ { 2 } } { \alpha } } = { \frac { \left( 3 \times 1 0 ^ { - 3 } \right) ^ { 2 } } { 1 . 3 6 \times 1 0 ^ { - 5 } } } = { \frac { 9 \times 1 0 ^ { - 6 } } { 1 . 3 6 \times 1 0 ^ { - 5 } } } = \mathbf { 0 . 6 6\ s }
$$
**Under a second, which is why a steel pan handle attached to the pan body with no insulating break is a hazard and a copper one is worse.** Note the square: a $6\ \mathrm{mm}$ plate takes four times as long, and a $30\ \mathrm{mm}$ one takes a hundred times as long. **This is the reason a fire door's steel skin is bonded to a core rather than simply made thicker — thickness is a square-law defence and a low-conductivity core is a linear one.**
:::
:::

::: exercise Radiation share on a warm plate {#ex-share level=2 check="58.5"}
A vertical plate $0.3\ \mathrm{m}$ high is held at $60\ {}^{\circ}\mathrm{C}$ in a room whose air and walls are at $20\ {}^{\circ}\mathrm{C}$. With the laminar correlation the natural-convection coefficient works out at $h_c = 4.45\ \mathrm{W/m^2 K}$. For $\epsilon = 0.9$, what fraction of the total loss is radiation?

::: solution
$$
h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 + 2 9 3 ) \times \left( 3 3 3 ^ { 2 } + 2 9 3 ^ { 2 } \right) = 5 . 1 0 3 \times 1 0 ^ { - 8 } \times 6 2 6 \times 1 9 6 { , } 7 3 8 = 6 . 2 9\ \mathrm { W / m ^ { 2 } K }
$$
$$
\text{share} = { \frac { 6 . 2 9 } { 4 . 4 5 + 6 . 2 9 } } = 0 . 5 8 5 = \mathbf { 5 8 . 5 \ \% }
$$
**Radiation is the larger of the two terms.** If the plate were polished aluminium with $\epsilon = 0.05$, $h_r$ would fall to $0.35$ and radiation would be $7\ \%$ — **the same plate, the same temperature, and a $51$-point swing in the mechanism mix, controlled entirely by a surface finish that costs nothing.**
:::
:::

::: exercise A bolted joint {#ex-joint level=2 check="22.4"}
Two aluminium plates, each $8\ \mathrm{mm}$ thick with $25\ \mathrm{cm^2}$ of contact area ($k = 237\ \mathrm{W/m\,K}$), are clamped dry with an interface conductance of $h_c = 2500\ \mathrm{W/m^2 K}$ and conduct $120\ \mathrm{W}$. What is the total temperature difference between the outer faces?

::: solution
$$
R _ { \text{plates} } = 2 \times { \frac { 0 . 0 0 8 } { 2 3 7 \times 2 . 5 \times 1 0 ^ { - 3 } } } = 2 \times 0 . 0 1 3 5 0 = 0 . 0 2 7 0\ \mathrm { K / W } , \qquad R _ { \text{int} } = { \frac { 1 } { 2 5 0 0 \times 2 . 5 \times 1 0 ^ { - 3 } } } = 0 . 1 6 0 0\ \mathrm { K / W }
$$
$$
\Delta T = 1 2 0 \times \left( 0 . 0 2 7 0 + 0 . 1 6 0 0 \right) = 1 2 0 \times 0 . 1 8 7 0 = \mathbf { 2 2 . 4\ K }
$$
**The interface is $86\ \%$ of the resistance.** With an interface material at $15{,}000\ \mathrm{W/m^2 K}$ the total falls to $120 \times ( 0.0270 + 0.0267 ) = 6.4\ \mathrm{K}$ — **a $71\ \%$ reduction for the price of a $2\ \mathrm{g}$ pad, and the single best example in this course of a design improvement that costs nothing and requires no analysis to justify.**
:::
:::

::: exercise The vacuum flask {#ex-dewar level=2 check="31.9"}
A cryogenic Dewar has two polished stainless walls of equal area, each with $\epsilon = 0.05$, separated by an evacuated gap. By what factor do the shields reduce the radiative exchange compared with two surfaces of $\epsilon = 0.9$?

::: solution
For two large parallel surfaces,
$$
q ^ { \prime \prime } = { \frac { \sigma \left( T _ { 1 } ^ { 4 } - T _ { 2 } ^ { 4 } \right) } { \dfrac { 1 } { \epsilon _ { 1 } } + \dfrac { 1 } { \epsilon _ { 2 } } - 1 } } \qquad \Longrightarrow \qquad { \frac { \frac { 1 } { 0 . 9 } + \frac { 1 } { 0 . 9 } - 1 } { \frac { 1 } { 0 . 0 5 } + \frac { 1 } { 0 . 0 5 } - 1 } } = { \frac { 1 . 2 2 2 } { 3 9 } } = { \frac { 1 } { 3 1 . 9 } }
$$
**A factor of $32$.** At $77\ \mathrm{K}$ against $295\ \mathrm{K}$ the exchange falls from $350$ to $11\ \mathrm{W/m^2}$, and a one-litre flask's $0.05\ \mathrm{m^2}$ of wall then leaks $0.55\ \mathrm{W}$, which boils off its contents in about $81$ hours. **Real flasks last three to seven days, so the neck, the support and the residual gas together are worth about as much as the radiation — which is why a flask with a cracked vacuum seal fails completely and loudly rather than gradually.**
:::
:::

::: exercise A composite wall {#ex-wall level=2 check="0.68"}
A wall is $100\ \mathrm{mm}$ of brick ($k = 0.72\ \mathrm{W/m\,K}$) backed on the inside by $50\ \mathrm{mm}$ of insulation ($k = 0.043\ \mathrm{W/m\,K}$). The inside and outside surface coefficients, including their radiation, are $7.7$ and $25\ \mathrm{W/m^2 K}$. What is the overall $U$-value in $\mathrm{W/m^2 K}$?

::: solution
$$
{ \frac { 1 } { U } } = { \frac { 1 } { 7 . 7 } } + { \frac { 0 . 1 0 0 } { 0 . 7 2 } } + { \frac { 0 . 0 5 0 } { 0 . 0 4 3 } } + { \frac { 1 } { 2 5 } } = 0 . 1 2 9 9 + 0 . 1 3 8 9 + 1 . 1 6 2 8 + 0 . 0 4 0 0 = 1 . 4 7 1 5
$$
$$
U = \mathbf { 0 . 6 8\ W / m ^ { 2 } K }
$$
**The $50\ \mathrm{mm}$ of insulation is $79\ \%$ of the total resistance; the $100\ \mathrm{mm}$ of brick is $9\ \%$ and the two surface films together are $12\ \%$.** Two consequences worth memorising: **the brick is thermal mass, not insulation** — it is $9\ \%$ of the resistance and very nearly all of the heat capacity, so it delays a warm day by hours and flattens it while passing, over a season, exactly the heat the arithmetic says; and **once the insulation is thick enough, the surface coefficients become the limit**, so the only way left to improve the wall is to improve the surfaces, which is what a low-emissivity cavity does.
:::
:::

::: exercise What burns {#ex-burn level=1 check="58.8"}
A hand at a surface temperature of $33\ {}^{\circ}\mathrm{C}$, with $e = 1116\ \mathrm{J/m^2 K\sqrt{s}}$, is placed on a large plate at $60\ {}^{\circ}\mathrm{C}$. Find the contact temperature for aluminium ($e = 24{,}060$) and for oak ($e = 470$). Which is the burn hazard?

::: solution
$$
T _ { \mathrm { int } } ( \text{Al} ) = { \frac { 1 1 1 6 \times 3 3 + 2 4 { , } 0 6 0 \times 6 0 } { 1 1 1 6 + 2 4 { , } 0 6 0 } } = { \frac { 3 6 { , } 8 3 0 + 1 { , } 4 4 3 { , } 6 0 0 } { 2 5 { , } 1 7 6 } } = \mathbf { 5 8 . 8 ^ { \circ } C }
$$
$$
T _ { \mathrm { int } } ( \text{oak} ) = { \frac { 1 1 1 6 \times 3 3 + 4 7 0 \times 6 0 } { 1 1 1 6 + 4 7 0 } } = { \frac { 3 6 { , } 8 3 0 + 2 8 { , } 2 0 0 } { 1 5 8 6 } } = \mathbf { 4 1 . 0 ^ { \circ } C }
$$
**The aluminium holds the skin at $58.8\ {}^{\circ}\mathrm{C}$, which produces a full-thickness burn in a few seconds; the oak holds it at $41.0\ {}^{\circ}\mathrm{C}$, which is uncomfortable but is below the damage threshold for contact times of tens of seconds.** **Both plates are at the same temperature.** This is why safety standards for touchable surfaces quote **different limits for metal and non-metal** — EN ISO 13732-1 gives $60\ {}^{\circ}\mathrm{C}$ for brief contact with metal and $70\ {}^{\circ}\mathrm{C}$ for short, and materially higher for ceramics and plastics — and why a handrail in a public building is specified in a low-effusivity material or sleeved in one.
:::
:::

::: exercise Mean radiant temperature {#ex-mrt level=2 check="20.4"}
An office has $2\ \mathrm{m^2}$ of single-glazed window at $12\ {}^{\circ}\mathrm{C}$ and $6\ \mathrm{m^2}$ of wall at $22\ {}^{\circ}\mathrm{C}$, with the air at $22\ {}^{\circ}\mathrm{C}$. For a seated occupant with $h_c = 3$ and $h_r = 5\ \mathrm{W/m^2 K}$, what is the operative temperature?

::: solution
The mean radiant temperature is the **area-weighted** average of the surrounding surfaces:
$$
t _ { \mathrm { mr } } = { \frac { 2 \times 1 2 + 6 \times 2 2 } { 8 } } = { \frac { 2 4 + 1 3 2 } { 8 } } = 1 9 . 5 ^ { \circ } \mathrm { C }
$$
$$
t _ { o } = { \frac { h _ { c } t _ { a } + h _ { r } t _ { \mathrm { mr } } } { h _ { c } + h _ { r } } } = { \frac { 3 \times 2 2 + 5 \times 1 9 . 5 } { 8 } } = { \frac { 6 6 . 0 + 9 7 . 5 } { 8 } } = \mathbf { 2 0 . 4 ^ { \circ } C }
$$
**The air says $22$ and the person is in a $20.4\ {}^{\circ}\mathrm{C}$ environment**, and $1.6\ \mathrm{K}$ of that is one cold surface. **The whole of the case for triple glazing can be made from this arithmetic: raising $2\ \mathrm{m^2}$ of surface from $12$ to $19\ {}^{\circ}\mathrm{C}$ recovers $1.75\ \mathrm{K}$ of operative temperature, which is worth about $4\ \%$ of the heating load and removes the draught that makes people turn the thermostat up.**
:::
:::

::: quiz Mechanisms at a warm surface {#quiz-share}
A bare steel panel at $70\ {}^{\circ}\mathrm{C}$ cools only to still air at $20\ {}^{\circ}\mathrm{C}$. Which statement is correct?

- [ ] Convection dominates, because the panel is hot enough for a strong plume
- [x] Radiation and convection are of comparable size, radiation being somewhat the larger, and both must be included in the balance
- [ ] Radiation can be ignored because there is no line of sight to anything colder than the panel
- [ ] The two mechanisms must be added as resistances in series, since the heat passes through the boundary layer and then radiates

::: solution
**Radiation and convection are comparable, with radiation somewhat larger.** At $70\ {}^{\circ}\mathrm{C}$ against $20\ {}^{\circ}\mathrm{C}$, $h_r \approx 6.5\ \mathrm{W/m^2 K}$ for $\epsilon \approx 0.9$ while a typical natural-convection coefficient on a $0.3\ \mathrm{m}$ panel is $4$–$5\ \mathrm{W/m^2 K}$.
**The last option is the instructive wrong answer, and it is wrong in the way that costs the most money.** Convection and radiation are **parallel** paths, not series ones: radiation is emitted from the surface directly into the enclosure and never passes through the boundary layer, and convection never passes through a radiating gap. **They share the same surface temperature and their fluxes add**, which is why the balance is written $-k\,dT/dx = h(T_s - T_\infty) + \epsilon\sigma(T_s^4 - T_{\mathrm{sur}}^4)$ with both terms evaluated at the same $T_s$. **The third option is wrong for the complementary reason: radiation goes to the walls, and the walls are colder than the panel whether or not the air is.**
:::
:::

::: quiz What a low-emissivity shield does not do {#quiz-dewar}
A vacuum flask has polished walls of $\epsilon = 0.05$ and an evacuated gap. If the gap were **not** evacuated, the flask would fail because:

- [ ] The shields would stop working, since emissivity only has meaning in a vacuum
- [x] The shields attack only radiation; without the vacuum, gas conduction and convection across the gap would be tens of times the residual radiative leak
- [ ] The fourth-power law would cease to apply at atmospheric pressure
- [ ] The residual gas would raise the temperature of the inner wall

::: solution
**The shields attack only radiation, and the vacuum attacks conduction and convection; the flask needs both.** At $1\ \mathrm{bar}$ and a $10\ \mathrm{mm}$ gap, gas conduction alone is $0.026/0.010 = 2.6\ \mathrm{W/m^2 K}$, giving about $0.7\ \mathrm{kW/m^2}$ across a $278\ \mathrm{K}$ difference — **sixty times the $11\ \mathrm{W/m^2}$ of radiation that the $\epsilon = 0.05$ shields permit.**
**Emissivity is a surface property and is unaffected by the surrounding medium**, which kills the first and third options; the second is the physics. **The design lesson generalises far beyond flasks: a shield, a coating or a foil addresses exactly one term of the surface energy balance, and every other term survives it unchanged.** A radiant barrier in a roof space works because it lowers $\epsilon$ **and** because the air gap beneath it is thin enough to suppress circulation; the same foil laid flat against a rafter with no gap does almost nothing, and this is the most common installation error in the whole of building physics.
:::
:::

## Where this lesson leads

Every one of the nine lessons that follow is one of the terms of the surface energy balance, worked out properly. **Steady conduction** solves $\nabla^2 T = 0$ through walls, cylinders, fins and buried pipes, and gives the resistance network that makes the arithmetic of the last lesson exact. **Transients** are governed by $\alpha$ and by the Biot number, which decides whether a body has one temperature or a profile. **Convection** is the search for $h$, and it divides into external flow, internal flow and natural convection, each with its own dimensionless structure — and all three rest on the boundary layer, which is why fluid mechanics is a prerequisite and not a suggestion. **Phase change** buys the largest $h$ values in engineering and comes with its own limits, the critical heat flux and the Leidenfrost temperature, beyond which the surface is insulated by its own vapour and burns. **Exchangers** put two convection problems and one conduction problem in series and price the result in the log-mean temperature difference and the effectiveness–number-of-transfer-units method. **Radiation** abandons the near-symmetric case of this lesson and asks what a surface sees, which turns a heat-transfer problem into a geometry problem called the view factor and, for real furnaces and atmospheres, into a spectral one.

Two through-lines are worth naming now. The first is that **$h$ is never a property**, and every correlation in the course exists to compute it from a flow field. The second is that **the square root of time governs every transient and the fourth power of temperature governs every radiative exchange**, so that depth costs time quadratically and heat costs temperature steeply — and both of those facts are worth more in a design review than most of the correlations.

::: history
| Year | Event |
|---|---|
| 1701 | **Isaac Newton**, "Scala graduum Caloris" (*Philosophical Transactions* **22**, 822), states that a body's heat loss is proportional to its excess over the surroundings — the origin of $q = hA\Delta T$, and of the fact that $h$ has been a definition rather than a law for three hundred years. |
| 1791 | **Pierre Prévost** establishes the doctrine of **exchange**: every body radiates in both directions and the *net* is what counts. The idea that a cold body "gives cold" is formally buried, and every heat-balance calculation since is his. |
| 1800, 1807 | **William Herschel** discovers the infrared by holding a thermometer beyond the red end of a spectrum; **Thomas Young** measures the solar constant. Radiative heat transfer becomes measurable. |
| 1822 | **Joseph Fourier**, *Théorie analytique de la chaleur*, sets $\boldsymbol{q} = -k\nabla T$ and $\partial T/\partial t = \alpha \nabla^2 T$, and invents the series needed to solve it. **The whole of conduction, and half of applied mathematics, is in this one book.** |
| 1845 | **Gustav Kirchhoff** states the law $\alpha_\lambda = \epsilon_\lambda$ and proves that a cavity in equilibrium contains the universal blackbody spectrum — the result that will not fit classical physics and will produce quantum theory in 1900. |
| 1879 | **Josef Stefan** finds $E_b \propto T^4$ empirically from the electrical resistance of a heated strip; **Ludwig Boltzmann** derives it in 1884 from thermodynamics and radiation pressure. The constant carries both names and neither man's value. |
| 1868, 1904 | **Franz Nusselt** formulates the boundary-layer heat transfer problem in dimensionless form; **Ludwig Prandtl** supplies the boundary layer itself. Every convection correlation in this course is a statement about a Nusselt number. |
| 1909, 1922 | **Erwin Warburg** measures the thermal response of metals with alternating currents and defines **effusivity** $\sqrt{k\rho c}$; **Max Knudsen** shows that residual gas conduction in a vacuum flask becomes independent of pressure once the mean free path exceeds the gap. Both quantities are the daily working tools of the vacuum-insulation industry. |
| 1931, 1941 | **David Bomhorst and A. Schmidt** publish the first systematic measurements of **thermal contact conductance**, prompted by bolted joints in steam plant and by the question of why an engine head ran hotter than its calculation; **D.Q. Kern** begins the column of air-cooled exchanger work that becomes the standard method. |
:::

::: summary
- **Three rate equations, three different physics.** $q = -kA\,dT/dx$ with $k$ a property; $q = hA\Delta T$ with $h$ a condition; $q = \epsilon\sigma A(T_s^4 - T_{\mathrm{sur}}^4)$ with two temperatures that are not the same temperature.
- **$k$ is bought, $h$ is calculated.** Conductivity spans five orders of magnitude across materials; a convection coefficient quoted without its flow condition is a rumour, and one borrowed from another geometry is a liability.
- **Radiation is not the small correction.** For a high-emissivity surface in free convection in air it is $55$–$71\ \%$ of the loss at every $\Delta T$ from $1$ to $125\ \mathrm{K}$; for a polished surface it is under $7\ \%$. Emissivity, not temperature, decides which regime you are in.
- **The surface energy balance is the whole method.** Conduction in equals convection out plus radiation out plus generation, all at the **same** $T_s$; when $T_s$ is unknown the equation is quartic and must be iterated.
- **$k$ says how much flows, $\alpha = k/\rho c$ says how fast it is noticed, and $e = \sqrt{k\rho c}$ says how hard it hits.** Penetration depth is $\sqrt{\alpha t}$, so each factor of ten in depth costs a hundred in time.
- **Effusivity, not temperature, decides what feels cold.** Skin at $33\ {}^{\circ}\mathrm{C}$ touching a $20\ {}^{\circ}\mathrm{C}$ body reaches $21.0\ {}^{\circ}\mathrm{C}$ on steel, $25.2$ on concrete, $29.2$ on oak and $32.9$ on air; the comfort threshold of $30\ {}^{\circ}\mathrm{C}$ is crossed at $e \approx 700$.
- **Interfaces are a third to nine tenths of the resistance.** $h_c$ is $10^3$–$10^4\ \mathrm{W/m^2 K}$ for clamped metal, pressure helps only as $p^{0.3}$–$p^{0.9}$, and an interface material is the cheapest $70\ \%$ reduction in temperature drop available.
- **Air is a poor coolant, water a good one, phase change a very good one.** $h$ runs $2$–$25$ for free convection in gas, $25$–$250$ forced in gas, $50$–$20{,}000$ in liquid and $10^4$ for boiling or condensing.
- **The mechanisms are in parallel at a surface and in series through a wall.** Adding them as conductances at the surface and as resistances through the solid is the arithmetic that runs the entire course.
:::

## Further reading

- **J.P. Holman**, *Heat Transfer*, 11th ed. (McGraw-Hill, 2010) — the gentlest entry to the three mechanisms and the standard source for the property tables quoted here; read the first three chapters before anything else in the course.
- **F.P. Incropera, D.P. DeWitt, T.L. Bergman & A.S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — the reference text, and in particular its Table 3.2 for contact conductance and its Chapter 1 for the ranges of $h$ reproduced above.
- **Y.A. Çengel & A.J. Ghajar**, *Heat and Mass Transfer: Fundamentals and Applications*, 6th ed. (McGraw-Hill, 2020) — the clearest worked examples on combined modes and on contact resistance, and the best treatment of the radiation share in mixed-mode cooling.
- **W.M. Kays, M.E. Crawford & B. Weigand**, *Convective Heat and Mass Transfer*, 4th ed. (McGraw-Hill, 2005) — where $h$ actually comes from, and why it cannot be looked up.
- **D.Q. Kern**, *Process Heat Transfer* (McGraw-Hill, 1950; reprinted by Krieger) — the exchanger book that generations of plant engineers learned from, still the most readable argument for treating $h$ as a design variable.
- **R. Siegel & J.R. Howell**, *Thermal Radiation Heat Transfer*, 5th ed. (CRC Press, 2011) — the radiation reference, and the place to learn why $T_{\mathrm{sur}}$ is not $T_\infty$.
- **ASHRAE Handbook — Fundamentals**, current chapter on *Nonresidential Cooling and Heating Load Calculations* — the operative-temperature and mean-radiant-temperature arithmetic of [[#ex-person|the person in a room]] and [[#ex-mrt|the office window]] worked to a standard that buildings are actually inspected against.
- **EN ISO 13732-1**, *Ergonomics of the thermal environment — Methods for the assessment of the thermal risk of skin contact* — the touch-temperature limits that follow from effusivity, and a good example of a heat-transfer property having become a safety regulation.
