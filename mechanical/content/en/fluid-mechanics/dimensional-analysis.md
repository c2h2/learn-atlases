Dimensional analysis is the only tool in fluid mechanics that produces **results without solving anything**. Given a list of the variables that matter and the dimensions they carry, the **Buckingham π theorem** of **1914** tells you the exact number of independent dimensionless groups the answer can depend on, and no equation you write afterwards can contain fewer. Used well it fixes the form of every correlation in this book before a single experiment is run; used badly it produces a list of Greek letters that explains nothing and constrains nothing, because **the theorem is only as good as the variable list, and the variable list is a physical claim**.

Its engineering value is that it converts an experiment from a measurement into a **law**. A pipe-friction curve measured in a laboratory with a $13\ \mathrm{mm}$ bore of water at $2\ \mathrm{m / s}$ is a fact about that pipe; the same data plotted as $f$ against $\mathrm{Re}$ is a fact about every pipe in the world, and the reason a $900\ \mathrm{mm}$ oil main can be designed from a $25\ \mathrm{mm}$ water rig is not that the two flows are similar but that **the governing dimensionless group is the same number in both**.

::: warning Seven dimensional-analysis errors that produce confident nonsense
**Missing a variable that matters.** If the list omits a variable that the physics needs, the theorem produces **too few** groups and the resulting correlation must absorb the missing physics into a function that is not a function — it changes with every data set. **The classic case is a compressibility check that is never done**: a fan-rig correlation in $\left( \mathrm{Re}, \mathrm{Fr} \right)$ alone looks excellent at $30\ \mathrm{m / s}$ and fails at $90\ \mathrm{m / s}$, because $\mathrm{Ma}$ was not in the list and its effect was small but not zero. **The check is to write the list before the experiment and to ask, for each candidate you are tempted to drop, "by what mechanism would it enter, and how large is that mechanism at my extreme condition?"** **Including a variable that does not matter.** The theorem then produces **too many** groups, and the correlation appears to require a two-dimensional surface where a curve would do. **The symptom is a "correlation" whose extra group has a coefficient of no practical significance and whose exponents change sign between data sets.** The fix is to test the group's effect deliberately, over as wide a range as the apparatus allows, and to **drop it from the list if the answer does not move**. **Choosing a repeating set that is not independent.** The $k$ repeating variables must be **dimensionally independent** — no product of them may be dimensionless. Choosing $\rho, \mu, \nu$ fails because $\nu = \mu / \rho$; choosing $D, V, V^2 / 2$ fails for the same reason; and the failure is silent, because the algebra produces a matrix that is singular and a solver that returns something. **The check is to write the dimension matrix of the repeating set and confirm its determinant is nonzero.** **Treating the groups as unique.** They are not: $\mathrm{Re}$ and $\mathrm{Re}^2$ are as valid as $\mathrm{Re}$ and $\mathrm{Eu}$, and any invertible transformation of a valid set is valid. **What is unique is the number of groups and the fact that a relation among them exists.** Two laboratories publishing different group sets are not in disagreement, and the reason a literature search on "the friction factor" must be done in terms of the **product** $f \mathrm{Re}^n$ and not $f$ alone is that $f$ has four conventions in common use. **Assuming the relation is smooth.** The theorem says $\pi_1 = \phi \left( \pi_2, \pi_3 \right)$ and says nothing about $\phi$. **A dimensionless group can pass through a critical value at which the physics changes** — $\mathrm{Re} = 2{,}300$ in a pipe, $\mathrm{Re} = 3 \times 10^5$ on a sphere, $\mathrm{Ra} = 1{,}708$ in a layer — and a correlation fitted across the transition is worthless on both sides. **The theorem gives you the axes and not the shape of the curve, and the shape is where the physics is.** **Extrapolating a correlation beyond the tested range of a group.** A heat-transfer correlation developed for $10 < \mathrm{Re} < 10^4$ and $0.7 < \mathrm{Pr} < 160$ is not a law of nature at $\mathrm{Re} = 10^7$ and $\mathrm{Pr} = 0.01$, and the reason liquid-metal cooling correlations must be developed separately is that $\mathrm{Pr} = 0.01$ is not "a low Prandtl number" but a **different mechanism** — the thermal boundary layer is thicker than the velocity boundary layer and the whole analogy between momentum and heat transfer fails. **Writing the group with a hidden dimension.** A "dimensionless" group that contains a unit conversion is not dimensionless, and the empirical constants in a correlation are then **unit-dependent** — which is the origin of the notorious non-SI coefficients in open-channel and fire engineering. **The check is to re-derive the correlation in a second system of units and confirm the constants do not move.**
:::

## The machinery

::: definition The π theorem and the algorithm {#def-pi}
**The statement.** If a physical relation involves $n$ variables and the dimensions involved span a space of rank $k$, then the relation is equivalent to one among
$$
\boxed{ \pi = n - k }
$$
independent dimensionless products. **The theorem is a statement about linear algebra, not about physics**: it counts the null space of the **dimension matrix**.
**The dimension matrix.** With $\left[ M \right], \left[ L \right], \left[ T \right]$ and the variables in columns:
$$
\begin{array}{c|ccccccc}
& \Delta p & L & D & V & \rho & \mu & \epsilon \\
\hline
M & 1 & 0 & 0 & 0 & 1 & 1 & 0 \\
L & -1 & 1 & 1 & 1 & -3 & -1 & 1 \\
T & -2 & 0 & 0 & -1 & 0 & -1 & 0
\end{array}
\qquad n = 7, \quad k = 3, \quad \pi = 4
$$
**The algorithm, in the order that works.**
1. **List every variable** that can influence the answer, including the dependent one. **Include length scales individually and not as a ratio** — the ratio appears for free.
2. **Write the dimension matrix.**
3. **Choose $k$ repeating variables** that are dimensionally independent and that **do not include the dependent variable**. A reliable choice is one from each of mass, length and time: $\rho$ (mass), $D$ (length), $V$ (time).
4. **Form each remaining variable into a group** by solving for the exponents.
5. **Simplify the groups** by taking products, powers and ratios of each other until they are the recognised ones.
6. **Write the result** $\pi_1 = \phi \left( \pi_2, \ldots \right)$ and **interpret each group physically**.
**The worked derivation.** Take $\Delta p = f \left( L, D, V, \rho, \mu, \epsilon \right)$ with repeating set $\rho, D, V$:
$$
\pi_{\Delta p} = \frac{\Delta p}{\rho V^2} \quad \left[ \frac{1}{M L^{- 1} T^{- 2} \cdot L^2 T^{- 2} \cdot M L^{- 3}} \right] = 1 \quad \checkmark
$$
$$
\pi_L = \frac{L}{D}, \qquad
\pi_{\mu} = \frac{\mu}{\rho V D} = \frac{1}{\mathrm{Re}}, \qquad
\pi_{\epsilon} = \frac{\epsilon}{D}
$$
$$
\boxed{ \frac{\Delta p}{\tfrac{1}{2} \rho V^2} = \phi \left( \mathrm{Re},\ \frac{L}{D},\ \frac{\epsilon}{D} \right) }
$$
**The reading.** The pressure coefficient depends on **three** groups and no experiment can require more. The $L / D$ group is removed by writing the result per unit length, which is the definition of the friction factor, and the theorem has just told you — **before any measurement** — that a friction factor is a function of two variables and that one of them is a geometric ratio.
**The number that makes the theorem worth its weight.** A three-variable experiment at ten levels each is $10^3 = 1{,}000$ runs; the same experiment in four groups is $10^4$ runs of the **groups**, but the groups are **independent of the apparatus size**, so a single size of apparatus covers the whole space. **The theorem does not reduce the number of experiments; it reduces the number of *apparatuses* from infinite to one** — and the reason a wind-tunnel campaign is affordable is that $\mathrm{Re}$ and $\mathrm{Ma}$ can be varied independently of the model's size.
:::

::: definition The catalogue {#def-groups}
**Every group is a ratio of two mechanisms**, and the way to learn them is to say the two words.
$$
\begin{array}{l l l}
\textbf{Group} & \textbf{Definition} & \textbf{Mechanisms in the ratio} \\
\mathrm{Re} & \rho V L / \mu & \text{inertia} / \text{viscous} \\
\mathrm{Fr} = \mathrm{ Ri}^{- 1 / 2} & V / \sqrt{g L} & \text{inertia} / \text{gravity} \\
\mathrm{We} & \rho V^2 L / \sigma & \text{inertia} / \text{surface tension} \\
\mathrm{Ma} & V / a & \text{inertia} / \text{elastic (compressibility)} \\
\mathrm{Eu} & \Delta p / \rho V^2 & \text{pressure} / \text{inertia} \\
\mathrm{St} & f_c L / V & \text{unsteady} / \text{inertial (shedding)} \\
\mathrm{Gr} & g \beta \Delta T L^3 / \nu^2 & \text{buoyancy} / \text{viscous} \\
\mathrm{Ra} & \mathrm{Gr}\, \mathrm{Pr} & \text{buoyancy} / \text{thermal diffusion} \\
\mathrm{Pr} & \nu / \alpha & \text{momentum diffusion} / \text{heat diffusion} \\
\mathrm{Nu} & h L / k & \text{convective} / \text{conductive heat transfer} \\
\mathrm{Bi} & h L / k_s & \text{surface} / \text{internal conduction (solid)} \\
\mathrm{Fo} & \alpha t / L^2 & \text{conducted} / \text{stored heat (transient)} \\
\mathrm{Bo} & \rho g L^2 / \sigma & \text{gravity} / \text{surface tension} \\
\mathrm{Ca} & \mu V / \sigma & \text{viscous} / \text{surface tension} \\
\mathrm{Oh} & \mu / \sqrt{\rho \sigma L} & \text{viscous} / \text{surface tension (transient)} \\
\mathrm{Ar} & g \left( \rho_p - \rho \right) D^3 / \rho \nu^2 & \text{buoyancy} / \text{viscous (a particle)} \\
\mathrm{Ha} & B L \sqrt{\sigma / \rho \nu} & \text{magnetic} / \text{viscous (MHD)} \\
\mathrm{Ec} & V^2 / c_p \Delta T & \text{kinetic} / \text{thermal} \\
\mathrm{Br} & \mu V^2 / k \Delta T & \text{viscous heating} / \text{conduction} \\
\mathrm{Ke} & \dot{\gamma} \sqrt{\rho L / \sigma} & \text{shear} / \text{surface tension (foams)}
\end{array}
$$
**The number that makes the catalogue a diagnostic and not a crib.** For a **millimetre-scale** water flow at $1\ \mathrm{mm}$ and $0.1\ \mathrm{m / s}$:
$$
\mathrm{Re} = 67, \quad \mathrm{Fr} = 1.2, \quad \mathrm{We} = 0.14, \quad \mathrm{Bo} \left( L = 1\ \mathrm{mm} \right) = 0.14, \quad \mathrm{Ma} = 3 \times 10^{- 5}
$$
**surface tension is comparable to gravity and compressibility is absent**; for the same water at $1\ \mathrm{m}$ and $3\ \mathrm{m / s}$:
$$
\mathrm{Re} = 3 \times 10^6, \quad \mathrm{Fr} = 0.96, \quad \mathrm{We} = 124, \quad \mathrm{Bo} \left( L = 1\ \mathrm{m} \right) = 1.4 \times 10^5, \quad \mathrm{Ma} = 2 \times 10^{- 3}
$$
**surface tension is now negligible and gravity is not.** **The two flows are not the same flow**, and the reason a hydraulic model of a spillway can ignore surface tension while a model of a **flip bucket's** spray cannot is that the Weber number does not scale with the Froude number.
:::

::: widget plot
f: 1/sqrt(x); pow(x,2)
x: 1, 60
y: 0, 40
labels: Froude-similar model speed ratio 1/sqrt(lambda); Reynolds-similar model speed ratio lambda^2
caption: Model-test speed requirements against the geometric scale ratio $\lambda = L_p / L_m$. **Froude similarity** (matching $V / \sqrt{g L}$) requires the model to run at $V_m = V_p / \sqrt{\lambda}$ — **slower** as the model shrinks; **Reynolds similarity** (matching $\rho V L / \mu$) requires $V_m = V_p \lambda^2$ — **faster**, and by a factor of $3{,}600$ at $\lambda = 60$. **The two requirements are contradictory and cannot both be met in any single fluid at any scale**, which is the fundamental theorem of model testing and the reason every model test is **distorted**. The ship modelist keeps Froude and corrects for Reynolds by an empirical friction line; the aerodynamicist keeps Mach and corrects for Reynolds by running at high pressure; the hydraulic engineer keeps Froude and accepts that the model is laminar where the prototype is turbulent. **The number that makes the choice non-trivial:** at $\lambda = 30$ the Froude-similar model of a $15\ \mathrm{m / s}$ ship runs at $2.74\ \mathrm{m / s}$ and its Reynolds number is $1.5 \times 10^8$ — turbulent, but a factor of $164$ below the prototype's, and the friction-residual correction is $25\ \%$ of the measured total resistance.
:::

## Similitude and model testing

::: definition The three similarities {#def-similitude}
**Geometric, kinematic and dynamic similarity.** A model is a true model if
$$
\begin{array}{l l}
\text{geometric} & \text{all lengths in a constant ratio, all angles equal} \\
\text{kinematic} & \text{velocities in a constant ratio at corresponding points} \\
\text{dynamic} & \text{forces in a constant ratio at corresponding points}
\end{array}
$$
**Dynamic similarity requires every governing dimensionless group to be equal**, and the theorem of model testing is:
$$
\boxed{ \text{If } n \text{ variables and } k \text{ dimensions govern, a model can match } n - k - 1 \text{ groups and no more.} }
$$
**The count is the whole difficulty.** For a ship's resistance, $\mathrm{Re}$ and $\mathrm{Fr}$ must match; with $\rho, V, L$ available and $\mu, g$ fixed by the choice of fluid, **one** group can be matched and the other must be corrected.
**The scale factors.** With $\lambda = L_p / L_m$ and Froude matching:
$$
\begin{array}{l c l l}
\text{velocity} & V_r = \lambda^{1 / 2} & \text{time} & t_r = \lambda^{1 / 2} \\
\text{acceleration} & a_r = 1 & \text{force} & F_r = \lambda^3 \text{ (same fluid)} \\
\text{power} & P_r = \lambda^{7 / 2} & \text{discharge} & Q_r = \lambda^{5 / 2} \\
\text{pressure} & p_r = \lambda & \text{moment} & M_r = \lambda^4
\end{array}
$$
**The number that makes a towing tank cheap and a wind tunnel expensive.** $P_r = \lambda^{7 / 2}$: a $1{:}25$ ship model needs $25^{3.5} = 78{,}100$ times less power than the ship, and a $1{:}25$ **wind-tunnel** model of a car in the **same** fluid needs the same factor — but the wind tunnel must run at $\lambda^{2} = 625$ times the speed to match $\mathrm{Re}$, and the power then scales as $\lambda^{1 / 2} \times \lambda^3 \times \lambda^{2 \times 3} \ldots$ **which is why full-scale automotive wind tunnels are more common than half-scale ones**: at $\lambda = 2$ the Reynolds deficit is only a factor of $8$ and the blockage and wall effects of a small tunnel cost more than the savings.
**The distortion that is deliberate.** A **distorted** model changes one scale differently from the others, and the classic is the **undistorted-in-plan, distorted-in-vertical-scale** river and estuary model, where the vertical scale is made larger than the horizontal so that the model's flow remains turbulent and its bed shear is resolvable:
$$
\lambda_y > \lambda_x, \qquad \mathrm{Re}_m = \frac{V_m \lambda_y}{\nu} \quad \text{raised by} \quad \frac{\lambda_y}{\lambda_x}
$$
**and the correction is a bed-roughness material chosen to match the Manning $n$ rather than the geometry.** **The number that makes this legitimate and not a fudge:** in the Fraser River estuary model the vertical scale was $1{:}37$ and the horizontal $1{:}500$, a distortion of $13.5$, and the model reproduced the prototype's residual circulation to within $8\ \%$ — because the **vertical** structure controls the mixing and the horizontal controls the geometry, and the two are governed by different groups.
:::

::: definition Order-of-magnitude and scaling laws {#def-scaling}
**The method.** Balance the leading terms of the governing equation and read off the scaling. **No constants, no functions, no coefficients — only exponents**, and the exponents are usually enough.
**Boundary layer.** $u \partial u / \partial x \sim \nu \partial^2 u / \partial y^2$ with $u \sim V$, $x \sim L$, $y \sim \delta$:
$$
\frac{V^2}{L} \sim \frac{\nu V}{\delta^2} \quad \Rightarrow \quad
\boxed{ \frac{\delta}{L} \sim \mathrm{Re}^{- 1 / 2} }, \qquad
C_f \sim \mathrm{Re}^{- 1 / 2}, \qquad
\delta \left( 1\ \mathrm{m},\ 10\ \mathrm{m / s},\ 10^{- 6} \right) = 1\ \mathrm{mm}
$$
**Free fall versus viscous fall.** A sphere of diameter $D$ and density $\rho_s$ in a fluid: Stokes drag against weight gives
$$
V \sim \frac{\left( \rho_s - \rho \right) g D^2}{\mu} \quad \text{(creeping)}, \qquad
V \sim \sqrt{\frac{\left( \rho_s - \rho \right) g D}{\rho}} \quad \text{(inertial)}
$$
**The crossover is at $\mathrm{Re} \approx 1$**, which for a sand grain in water is $D \approx 0.07\ \mathrm{mm}$ — **the reason a silt particle's settling is a viscous process and a gravel particle's is not, and the reason a sediment-transport formula must be written in two regimes**.
**The square-cube law and its consequences.** With a length scale $\lambda$:
$$
\text{area} \propto \lambda^2, \quad \text{volume and mass} \propto \lambda^3, \quad \text{strength of a strut} \propto \lambda^2, \quad \text{natural frequency} \propto \lambda^{- 1}, \quad \text{diffusion time} \propto \lambda^2
$$
**The number that makes an insect's leg and an elephant's leg different designs.** A $60\ \mathrm{kg}$ human scaled up by $10$ in linear size weighs $60{,}000\ \mathrm{kg}$ while the leg's cross-section grows by only $100$ — the **stress** rises by $10$, from $3\ \mathrm{MPa}$ to $30\ \mathrm{MPa}$ against a bone's $170\ \mathrm{MPa}$ ultimate. **A ten-times-larger animal needs legs of relative diameter $\sqrt{10} = 3.16$ times thicker, and the reason large animals have columnar legs and small ones have jointed, angled legs is this exponent and not any choice.**
**The number that makes a heat treatment's time a square.** A $20\ \mathrm{mm}$ steel bar takes $40\ \mathrm{min}$ to reach a given centre temperature; a $60\ \mathrm{mm}$ bar takes $40 \times 3^2 = 360\ \mathrm{min}$, because $\mathrm{Fo} = \alpha t / L^2$ must match. **The reason a forging shop quotes soak time per unit **thickness** and not per unit mass is $\mathrm{Fo}$, and the reason a quench that is fine on a $20\ \mathrm{mm}$ test coupon cracks a $200\ \mathrm{mm}$ production piece is that the required time grows as the square and the residual stress grows faster than the time.**
:::

## Worked cases

::: example The falling-body viscometer {#ex-falling}
A sphere of diameter $D$ and density $\rho_s$ falls at its terminal velocity $V$ through a fluid of density $\rho$ and viscosity $\mu$ inside a cylinder of diameter $D_t$. Find the dimensionless groups, then use them to design a falling-sphere viscometer that measures $0.1$ to $100\ \mathrm{Pa\, s}$ with a single sphere.
::: solution
**The variables.** $V, D, \rho_s, \rho, \mu, g, D_t$ — seven variables, three dimensions, **four groups**.
$$
\phi \left( \frac{V^2}{g D},\ \frac{\rho V D}{\mu},\ \frac{\rho_s}{\rho},\ \frac{D}{D_t} \right) = 0
\qquad \text{or, more usefully,} \qquad
\underbrace{\frac{4 \left( \rho_s - \rho \right) g D}{3 C_D \rho V^2}}_{\text{balance}} = 1, \quad
C_D = \psi \left( \mathrm{Re},\ D / D_t \right)
$$
**The terminal-velocity balance.** Weight minus buoyancy equals drag:
$$
\frac{\pi}{6} D^3 \left( \rho_s - \rho \right) g = C_D \cdot \tfrac{1}{2} \rho V^2 \cdot \tfrac{\pi}{4} D^2
\qquad \Rightarrow \qquad
V = \sqrt{\frac{4 \left( \rho_s - \rho \right) g D}{3 C_D \rho}}
$$
**The group that matters is the Archimedes number**, which contains no velocity:
$$
\mathrm{Ar} = \frac{g \left( \rho_s - \rho \right) \rho D^3}{\mu^2}
= \frac{4}{3} \mathrm{Re}^2 C_D
$$
**The wall correction.** The **Ladenburg–Faxén** factor for a sphere on the axis of a cylinder:
$$
F \left( \lambda \right) = \left( 1 - 2.104 \lambda + 2.09 \lambda^3 - 0.95 \lambda^5 \right)^{- 1}, \qquad \lambda = D / D_t
$$
**The number that sets the instrument's geometry.** At $\lambda = 0.1$, $F = 1.23$ — a $23\ \%$ drag increase. **The specification is $\lambda \le 0.05$ where $F = 1.11$, and the reason a falling-sphere viscometer's tube is long and thin is that the wall correction must be small and calculable, and the reason the sphere must fall on the axis is that $F$ varies by a further $5\ \%$ between the axis and the wall.**
**The design, first attempt.** Take $D = 3\ \mathrm{mm}$, $D_t = 60\ \mathrm{mm}$ ($\lambda = 0.05$, $F = 1.11$), a solid borosilicate sphere $\rho_s = 2{,}230$, and a fluid of $\rho = 1{,}000$:
$$
V = \frac{\left( 2{,}230 - 1{,}000 \right) \times 9.81 \times \left( 0.003 \right)^2}{18 \times 1.11\, \mu}
= \frac{5.44 \times 10^{- 3}}{\mu} \quad \left[ \mathrm{m / s},\ \mu \text{ in Pa\, s} \right]
$$
$$
\mu = 0.1\ \mathrm{Pa\, s} \Rightarrow V = 54.4\ \mathrm{mm / s}; \qquad
\mu = 100\ \mathrm{Pa\, s} \Rightarrow V = 54.4\ \mathrm{\mu m / s}
$$
**The check that the whole range is creeping.** At $\mu = 0.1$:
$$
\mathrm{Re} = \frac{1{,}000 \times 0.0544 \times 0.003}{0.1} = 1.63
$$
**Stokes's law is marginal at $\mathrm{Re} = 1.63$** — the Oseen correction is $1 + 3\mathrm{Re} / 8 = 1.61$, a $61\ \%$ error. **The design must be re-run with the full $C_D \left( \mathrm{Re} \right)$ curve and solved iteratively**, or the sphere made smaller.
**The design, second attempt.** A hollow glass sphere with $\rho_s - \rho = 100\ \mathrm{kg / m^3}$ and $D = 3\ \mathrm{mm}$:
$$
V = \frac{100 \times 9.81 \times \left( 0.003 \right)^2}{18 \times 1.11\, \mu} = \frac{4.42 \times 10^{- 4}}{\mu}
$$
$$
\mu = 0.1 \Rightarrow V = 4.42\ \mathrm{mm / s}, \quad \mathrm{Re} = 0.133 \quad \checkmark\ \text{creeping}
$$
$$
\mu = 100 \Rightarrow V = 4.42\ \mathrm{\mu m / s} \quad \Rightarrow \quad \text{a } 300\ \mathrm{mm} \text{ fall takes } 19\ \mathrm{h} \quad ✗
$$
**The number that makes the range impossible with one sphere.** Since $V \propto 1 / \mu$ at fixed geometry, **the viscosity range one sphere can cover is exactly the velocity range the instrument can time** — and the timing window is a hard instrument property. With optical gates and a $200\ \mathrm{mm}$ gauge length, a usable fall is between $5\ \mathrm{s}$ and $30\ \mathrm{min}$:
$$
V_{\max} = 0.040\ \mathrm{m / s}, \qquad V_{\min} = 6.7 \times 10^{- 4}\ \mathrm{m / s}, \qquad
\frac{\mu_{\max}}{\mu_{\min}} = \frac{V_{\max}}{V_{\min}} = 60
$$
**One sphere covers a factor of sixty in viscosity — one and eight tenths decades — and the specification asks for three.** No choice of $D$ and $\Delta \rho$ changes the ratio, because both ends move together.
**The Reynolds constraint fixes the size.** Requiring $\mathrm{Re} \le 0.3$ at the fast end, $\mathrm{Re} = \rho V_{\max} D / \mu_{\min}$ with $\mu_{\min} = k D^2 / V_{\max}$ and $k = \Delta \rho g / 18 F$:
$$
\Delta \rho\, D = \frac{18 F \rho V_{\max}^2}{0.3\, g} = \frac{18 \times 1.07 \times 1{,}000 \times 0.040^2}{0.3 \times 9.81} = 10.4\ \mathrm{kg / m^2}
$$
$$
D = 2\ \mathrm{mm} \Rightarrow \Delta \rho = 5{,}200\ \mathrm{kg / m^3}, \qquad
D = 5\ \mathrm{mm} \Rightarrow \Delta \rho = 2{,}090\ \mathrm{kg / m^3}
$$
**and the sphere must be dense and small, or large and only moderately dense** — a $5\ \mathrm{mm}$ sphere $2{,}090\ \mathrm{kg / m^3}$ heavier than the fluid is a silicon-carbide ball in water, which is manufacturable, whereas the $2\ \mathrm{mm}$ version needs a density of $6{,}200\ \mathrm{kg / m^3}$ and is a tool-steel ball.
**The resolution.** A falling-sphere viscometer is **a set of spheres**, and the honest specification is a catalogue whose ranges overlap:
$$
\begin{array}{l c c c}
\text{Sphere} & D\ \left[ \mathrm{mm} \right] & \Delta \rho\ \left[ \mathrm{kg / m^3} \right] & \mu\ \text{range}\ \left[ \mathrm{Pa\, s} \right] \\
\text{A} & 2.0 & 5{,}200 & 0.27 - 16 \\
\text{B} & 5.0 & 2{,}090 & 0.67 - 40 \\
\text{C} & 2.0\ \text{(in a dense fluid)} & 1{,}000 & 0.05 - 3
\end{array}
$$
**and the reason a specification must state the sphere set, the fluid and the timing window, and not only the range, is that the range is manufactured out of those three and the accuracy at the range ends is set by how close $\mathrm{Re}$ can be kept to zero.**
*Sanity.* The reason the Archimedes number is the right design group is that it contains **no velocity**, so it can be evaluated from the sphere and fluid alone and the instrument's operating regime known before it is filled. **A group containing the answer is a result; a group containing only the inputs is a design chart** — and the reason every well-made dimensionless correlation is written in terms of the latter is that it can then be used to **choose** conditions and not only to report them.
:::
:::

::: example Ship-model testing {#ex-ship}
A ship of $L_{pp} = 180\ \mathrm{m}$ is to make $18\ \mathrm{m / s}$. A $1{:}36$ model is tested in a towing tank. Give the model speed, the model and prototype Reynolds numbers, the power scale, and the residual-resistance procedure.
::: solution
**The Froude number and the model speed.**
$$
\mathrm{Fr} = \frac{V}{\sqrt{g L}} = \frac{18}{\sqrt{9.81 \times 180}} = \frac{18}{42.0} = 0.428
\qquad \Rightarrow \qquad
V_m = 0.428 \times \sqrt{9.81 \times 5} = 0.428 \times 7.00 = 3.00\ \mathrm{m / s}
$$
**The Reynolds numbers.** Salt water at $15\ {}^{\circ}\mathrm{C}$, $\nu = 1.19 \times 10^{- 6}\ \mathrm{m^2 / s}$:
$$
\mathrm{Re}_p = \frac{18 \times 180}{1.19 \times 10^{- 6}} = 2.73 \times 10^9, \qquad
\mathrm{Re}_m = \frac{3.00 \times 5}{1.19 \times 10^{- 6}} = 1.26 \times 10^7
$$
$$
\frac{\mathrm{Re}_m}{\mathrm{Re}_p} = \lambda^{- 3 / 2} = 36^{- 1.5} = \frac{1}{216}
$$
**The Reynolds number cannot be matched**, and the deficit is a factor of $216$.
**The ITTC-1957 procedure.** Measure the model's total resistance $R_{tm}$, subtract the measured **viscous** resistance computed with the ITTC friction line, and scale the remainder:
$$
C_{F m} = \frac{0.075}{\left( \log_{10} \mathrm{Re}_m - 2 \right)^2} = \frac{0.075}{\left( 7.100 - 2 \right)^2} = \frac{0.075}{26.01} = 0.002884
$$
$$
C_{F p} = \frac{0.075}{\left( 9.436 - 2 \right)^2} = \frac{0.075}{55.29} = 0.001357
$$
With $C_{F m} S_m \left( 1 + k \right) = 0.60 \times R_{tm}$ measured, the **residual** is $0.40\, R_{tm}$ and
$$
R_{t p} = \left[ R_{tm} - \tfrac{1}{2} \rho_m V_m^2 S_m C_{F m} \left( 1 + k \right) \right] \lambda^3 + \tfrac{1}{2} \rho_p V_p^2 S_p C_{F p} \left( 1 + k \right) + \Delta C_F + C_A S
$$
**The power scale.** With the same fluid and Froude matching,
$$
\frac{P_p}{P_m} = \frac{F_p V_p}{F_m V_m} = \lambda^3 \times \lambda^{1 / 2} = \lambda^{7 / 2} = 36^{3.5} = 279{,}900
$$
**The number that makes the model test worth doing.** A model absorbing $250\ \mathrm{W}$ corresponds to a ship absorbing $70\ \mathrm{MW}$ — and the reason a towing tank's carriage is a $300\ \mathrm{kW}$ machine is that the **worst** model at the **largest** scale in the tank, not this one, sets the size. **The number that makes the correction the error:** the friction-resistance difference between model and ship is
$$
\frac{C_{F m} - C_{F p}}{C_{F p}} = \frac{0.002884 - 0.001357}{0.001357} = 113\ \%
$$
**the model's skin friction is more than twice the ship's per unit area**, and since friction is $70\ \%$ of a tanker's total resistance, the correction is $47\ \%$ of the measured total. **A $2\ \%$ error in the form factor $k$ therefore becomes a $1\ \%$ error in the ship's power, and the reason the ITTC recommends a full-scale correlation line and a roughness allowance $C_A$ of $1.5 \times 10^{- 3}$ is that the model cannot see the ship's roughness at all.**
*Sanity.* The reason the Froude number is kept and the Reynolds number corrected, and not the reverse, is that the **wave-making** resistance is a strongly nonlinear function of $\mathrm{Fr}$ with peaks and troughs that no smooth correction can supply, whereas the viscous resistance is a smooth, weakly varying function of $\mathrm{Re}$ with a well-established logarithmic law. **You keep the group you cannot correct and correct the one you can** — and the reason an **aerodynamic** model keeps Mach instead is that compressibility is the uncorrectable one there.
:::
:::

::: example Natural convection {#ex-natural}
Find the Rayleigh number for a $1.2\ \mathrm{m}$ vertical panel at $70\ {}^{\circ}\mathrm{C}$ in a room at $20\ {}^{\circ}\mathrm{C}$, and use scaling to predict the boundary-layer thickness and the average heat-transfer coefficient.
::: solution
**The groups.** The variables are $h, L, \Delta T, g, \beta, \nu, \alpha, k$ — eight variables, four dimensions $\left( M, L, T, \Theta \right)$, so **four groups**:
$$
\mathrm{Nu} = \phi \left( \mathrm{Ra},\ \mathrm{Pr} \right), \qquad
\mathrm{Ra} = \frac{g \beta \Delta T L^3}{\nu \alpha}, \qquad \mathrm{Pr} = \frac{\nu}{\alpha}
$$
**The number.** Air at the film temperature $45\ {}^{\circ}\mathrm{C}$: $k = 0.0274$, $\nu = 1.75 \times 10^{- 5}$, $\alpha = 2.48 \times 10^{- 5}$, $\beta = 1 / 318 = 3.145 \times 10^{- 3}$:
$$
\mathrm{Ra} = \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2^3}{1.75 \times 10^{- 5} \times 2.48 \times 10^{- 5}}
= \frac{2.666}{4.34 \times 10^{- 10}} = 6.14 \times 10^9
$$
**Turbulent** — the transition on a vertical surface is at $\mathrm{Ra} \approx 10^9$.
**The scaling.** Balance buoyancy, inertia and viscosity in the boundary layer with $\delta$ the layer thickness:
$$
\frac{V^2}{L} \sim g \beta \Delta T \delta, \qquad
\frac{\nu V}{\delta^2} \sim g \beta \Delta T \quad \Rightarrow \quad
\frac{\delta}{L} \sim \mathrm{Ra}^{- 1 / 4}
$$
$$
\frac{\delta}{L} = \left( 6.14 \times 10^9 \right)^{- 1 / 4} = 3.57 \times 10^{- 3}, \qquad \delta = 4.3\ \mathrm{mm}
$$
**The heat-transfer coefficient.** With $\mathrm{Nu} \sim \mathrm{Ra}^{1 / 4}$ and the laminar-film constant $0.59$:
$$
\mathrm{Nu} = 0.59 \times \left( 6.14 \times 10^9 \right)^{1 / 4} = 0.59 \times 279.9 = 165
\qquad \Rightarrow \qquad
h = \frac{165 \times 0.0274}{1.2} = 3.77\ \mathrm{W / m^2\, K}
$$
**The turbulent-layer correlation** $\mathrm{Nu} = 0.10\, \mathrm{Ra}^{1 / 3}$ gives $\mathrm{Nu} = 183$ and $h = 4.18\ \mathrm{W / m^2\, K}$ — **an $11\ \%$ spread between the two forms at the same Rayleigh number**, and the reason a heat-exchanger design uses the lower value at the design point and the higher at the check point.
**The number that makes natural convection a weak mechanism.** $h = 4\ \mathrm{W / m^2\, K}$ against $25\ \mathrm{W / m^2\, K}$ for a gentle forced flow at $2\ \mathrm{m / s}$ — **a factor of six**, and the reason an electronics enclosure's thermal design turns on a fan at a $30\ \mathrm{K}$ rise is that the fan's $20\ \mathrm{W}$ costs less than the $40\ \%$ increase in heatsink area the same improvement would need. **The group that decides is the Richardson number**
$$
\mathrm{Ri} = \frac{\mathrm{Gr}}{\mathrm{Re}^2} = \frac{g \beta \Delta T L}{V^2}
= \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2}{4} = 0.463
$$
**and the rule is that natural convection may be neglected for $\mathrm{Ri} < 0.1$ and dominates for $\mathrm{Ri} > 10$** — at $0.46$ the two mechanisms are of comparable importance and a correlation for either alone is wrong.
*Sanity.* The reason $\mathrm{Ra}$ and not $\mathrm{Gr}$ is the right group is that $\mathrm{Gr}$ contains no information about how fast heat escapes relative to momentum, and a **liquid-metal** natural-convection flow at the same $\mathrm{Gr}$ as air transfers heat completely differently. **$\mathrm{Ra} = \mathrm{Gr}\, \mathrm{Pr}$ is the buoyancy-to-thermal-diffusion ratio, and it is the thermal diffusion that sets the layer thickness when $\mathrm{Pr}$ is far from one.**
:::
:::

::: example Dimensional analysis without equations {#ex-crater}
An explosion crater of diameter $D$ is formed in a soil of density $\rho$ and cohesion $Y$ by an explosive of energy $E$. Find the groups, and use them to explain why the **Blast-Scaling** rule $W^{1 / 3} / R$ works and where it fails.
::: solution
**The variables.** $D, E, \rho, Y$ — four variables, three dimensions, **one group**:
$$
\pi = \frac{Y D^3}{E} \qquad \Rightarrow \qquad D = C \left( \frac{E}{Y} \right)^{1 / 3}
$$
**With gravity added** — $D, E, \rho, g, Y$, five variables, three dimensions, **two groups**:
$$
\pi_1 = \frac{\rho g D}{Y}, \qquad \pi_2 = \frac{Y D^3}{E}
\qquad \Rightarrow \qquad
D = \left( \frac{E}{\rho g} \right)^{1 / 4} \phi \left( \frac{Y}{\rho g D} \right)
$$
**The number that makes the two limits different.** For a **large** crater the strength term is negligible and
$$
D \propto \left( \frac{E}{\rho g} \right)^{1 / 4}
$$
**the gravity regime**, in which the crater volume scales as $E^{3/4}$; for a **small** crater the strength dominates and
$$
D \propto \left( \frac{E}{Y} \right)^{1 / 3}
$$
**the strength regime**, in which the volume scales as $E$. **The crossover for a typical soil** ($\rho = 1{,}800$, $Y = 50\ \mathrm{kPa}$) is at
$$
\frac{Y}{\rho g} = 2.83\ \mathrm{m} \quad \Rightarrow \quad D \sim 3\ \mathrm{m}
$$
**The number that makes $W^{1/3} / R$ work.** With $E \propto W$ (the charge's mass) and the gravity regime,
$$
D \propto \left( \frac{W}{\rho g} \right)^{1 / 4} \quad \text{and for a fixed burial-depth ratio} \quad R \propto W^{1 / 4}
$$
**whereas the empirical rule is $R \propto W^{1 / 3}$, which is the strength regime and the correct one for the small craters and the short standoffs at which most protective-design cases live.** **The rule $W^{1/3} / R = $ const is therefore not a general law but a statement that the case is in the strength regime**, and the reason it fails for the deep-buried and large-diameter cases that matter for a bunker is that they are in the gravity regime with an exponent of $1 / 4$ — **a $25\ \%$ error in radius for a factor of $100$ in charge weight**.
**The number that makes the group the diagnostic.** For a $1{,}000\ \mathrm{kg}$ TNT charge ($4.2\ \mathrm{GJ}$) in the same soil:
$$
D \sim \left( \frac{4.2 \times 10^9}{1{,}800 \times 9.81} \right)^{1 / 4} = \left( 2.38 \times 10^5 \right)^{1 / 4} = 22.1\ \mathrm{m}
\qquad \frac{Y}{\rho g D} = \frac{50{,}000}{1{,}800 \times 9.81 \times 22.1} = 0.128
$$
**$0.128 \ll 1$ confirms the gravity regime**, and the reason a protective-structure design for a large charge cannot use the $W^{1/3}$ scaling is that the group says so before any calculation.
*Sanity.* The reason one group appears in the four-variable case is that **a problem with one dimensionless group has a constant answer** — $D = C \left( E / Y \right)^{1/3}$ with $C$ a pure number, and the whole of the physics is in $C$. **The number of groups is the number of experiments you must run to get a curve, and one group means one number** — which is why the simplest dimensional analyses are the most powerful and the least used.
:::
:::

::: history
**Fourier**'s *Théorie analytique de la chaleur* of **1822** contains the statement that the constants in a physical equation must be homogeneous in their dimensions — the first appearance of the idea, and it appears as a remark and not a theorem. **The groups came individually and slowly**: **Reynolds**' paper is of **1883**, **Froude**'s speed-residual method of **1874** (and the name after **Lewis** Froude's obituary in **1879**), **Weber**'s on capillary break-up of **1931**, **Mach**'s number from **Ernst Mach**'s optics work of **1877–1887**, **Nusselt**'s and **Biot**'s from the heat-transfer literature of the **1900s–1910s**, **Prandtl**'s of **1904** from the boundary layer itself. **Rayleigh** applied the method systematically in *Theory of Sound* (**1877**) and published the first explicit statement of what is now the π theorem in a **1894** *Nature* correspondence with **W. J. M. Rankine**'s son — a two-hundred-word note with no proof. **Buckingham**'s **1914** *Physical Review* paper "On physically similar systems" gave the proof and the name; **Bridgman**'s **1922** *Dimensional Analysis* made it a tool of experimental physics and is the book that made the method standard. **The famous caution is Bridgman's own**: he listed the method's failures and wrote that it gives "a great deal more information than we have any right to expect, and a great deal less than we want". **Taylor**'s **1950** estimate of the **Hiroshima** blast yield from published photographs — $22{,}000$ **tons**, within ten per cent of the official figure, from the radius-time data and the air density alone, using $R \propto \left( E t^2 / \rho \right)^{1 / 5}$ — remains the most elegant application ever published, and it was done with a slide rule from a set of *Time* magazine images.
:::

::: quiz
A $1 : 20$ ship model is to be tested in a towing tank in the same water as the ship. Dynamic similarity demands equal Reynolds numbers, which requires towing the model at:

- [ ] One twentieth of the ship's speed
- [x] Twenty times the ship's speed, which no tank can reach — which is why model testing matches the Froude number instead and corrects for Reynolds number empirically
- [ ] The ship's speed, using a less viscous fluid
- [ ] Both Reynolds and Froude similarity at once, which is achievable in a pressurised tank

::: solution
**Twenty times the speed.** $V_m = V_p ( L_p / L_m )( \nu_m / \nu_p ) = 20 V_p$ for the same fluid, so a ship making $15$ knots would need a model at $300$ knots, which is a supercavitating projectile rather than a ship. **Froude similarity goes the other way** — $V_m = V_p \sqrt{ L_m / L_p } = 0.224 V_p$ — and the two cannot both be met: satisfying them simultaneously would need a fluid with $\nu_p / 89.4$, and no liquid comes close. **The entire discipline of ship model testing is the workaround: match Froude (which sets the wave-making resistance, the dominant term), measure the total resistance, subtract the theoretical friction line computed at the model's Reynolds number, and add back a friction line computed at the full-scale Reynolds number with an allowance for surface roughness.** That subtraction-and-addition is called the ITTC 1957 performance-prediction line, it has designed essentially every ship launched in the last seventy years, and it is a beautiful example of dimensional analysis being used not to solve a problem but to say precisely which part of a problem can be scaled and which part must be guessed.
:::
:::

## Where this leads

The groups are the axes of every correlation in [[heat-transfer]] ($\mathrm{Nu}$, $\mathrm{Ra}$, $\mathrm{Gr}$, $\mathrm{Pr}$, $\mathrm{Bi}$, $\mathrm{Fo}$), the design basis of every model test in [[aerodynamics]] and [[flight-mechanics]] ($\mathrm{Re}$, $\mathrm{Ma}$, blockage, wall porosity), the language of [[manufacturing]]'s forming and casting ($\mathrm{Re}$, $\mathrm{We}$, $\mathrm{Ca}$, $\mathrm{Oh}$, the **Zener** and **Hollomon** parameters), the whole of [[propulsion]]'s similarity rules for turbines and compressors, and the reason [[computational-fluid-dynamics]]'s grid studies are reported in wall units.

::: summary
- The π theorem counts the null space of the dimension matrix: $\pi = n - k$, and the answer is a relation among the groups and nothing more.
- The groups are not unique; their **number** is. Any invertible transformation of a valid set is valid.
- A model can match $n - k - 1$ groups. **Every model test is distorted**; you keep the group you cannot correct and correct the one you can.
- Froude scaling gives $P_r = \lambda^{7/2}$, $Q_r = \lambda^{5/2}$, $F_r = \lambda^3$; Reynolds scaling gives $V_r = \lambda^2$. They are incompatible.
- Order-of-magnitude analysis gives exponents and not constants, and the exponents are usually enough: $\delta / L \sim \mathrm{Re}^{-1/2}$, $t \propto L^2$, strength $\propto \lambda^2$ against weight $\propto \lambda^3$.
- A problem with **one** dimensionless group has a constant answer — the cheapest result in physics.
- Every group is a ratio of two mechanisms; say the two words and you have understood it.
- The theorem is only as good as the variable list, and the list is a physical claim about mechanisms.
:::

## Exercises

::: exercise Counting groups {level=1 check="4"}
Give the number of independent dimensionless groups for the pressure drop per unit length in a pipe, depending on $D$, $V$, $\rho$, $\mu$ and $\epsilon$.
::: solution
Six variables, three dimensions: $\pi = 6 - 3 = 4$.
:::
:::

::: exercise Reynolds number scaling {level=1 check="216"}
Give the factor by which the Reynolds number of a $1{:}36$ ship model falls short of the ship's under Froude scaling.
::: solution
$\mathrm{Re}_m / \mathrm{Re}_p = \lambda^{-3/2} = 36^{-1.5} = 1/216$.
:::
:::

::: exercise Power scale {level=1 check="279900"}
Give the power scale $P_p / P_m$ for a $1{:}36$ Froude-similar model in the same fluid.
::: solution
$P_r = \lambda^{7/2} = 36^{3.5} = 279{,}900$.
:::
:::

::: exercise Rayleigh number {level=1 check="6.14"}
Give the Rayleigh number for a $1.2\ \mathrm{m}$ vertical panel at $50\ \mathrm{K}$ above the air, with $\nu = 1.75 \times 10^{-6}\ \mathrm{m^2/s}$, $\alpha = 2.48 \times 10^{-5}\ \mathrm{m^2/s}$, $\beta = 1/318\ \mathrm{K^{-1}}$.
::: solution
$\mathrm{Ra} = g \beta \Delta T L^3 / (\nu \alpha) = 6.14 \times 10^9$.
:::
:::

::: exercise Weber number {level=1 check="49450"}
Give the Weber number for water jets of $1\ \mathrm{mm}$ diameter at $60\ \mathrm{m/s}$ ($\sigma = 0.0728\ \mathrm{N/m}$).
::: solution
$\mathrm{We} = \rho V^2 D / \sigma = 1000 \times 3600 \times 0.001 / 0.0728 = 49{,}450$.
:::
:::

::: exercise Capillary length {level=1 check="2.73"}
Give the capillary length $\sqrt{\sigma / (\rho g)}$ for water at $20\ {}^{\circ}\mathrm{C}$ in millimetres.
::: solution
$\ell_c = \sqrt{0.0728 / (998 \times 9.81)} = 2.73\ \mathrm{mm}$.
:::
:::

::: exercise Square-cube {level=1 check="9"}
Give the factor by which the soak time of a steel bar increases when its diameter increases threefold.
::: solution
$\mathrm{Fo} = \alpha t / L^2$ must match, so $t \propto L^2$: a factor of $9$.
:::
:::

::: exercise Richardson number {level=2}
A vertical panel of $1.2\ \mathrm{m}$ height at $50\ \mathrm{K}$ above the air is cooled by a horizontal stream of $2\ \mathrm{m/s}$. Give the Richardson number and state which mechanism dominates.
::: solution
$$
\mathrm{Ri} = \frac{g \beta \Delta T L}{V^2} = \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2}{4} = 0.463
$$
**Neither dominates** — the rule of thumb is that natural convection is negligible for $\mathrm{Ri} < 0.1$ and dominant for $\mathrm{Ri} > 10$. **At $0.46$ the flow is a mixed-convection flow and a correlation for either mechanism alone is wrong by tens of per cent**; the standard correction is $\mathrm{Nu} = \left( \mathrm{Nu}_{\mathrm{forced}}^n + \mathrm{Nu}_{\mathrm{natural}}^n \right)^{1/n}$ with $n = 3$ for aiding and $n = 2$ for opposing flow.
:::
:::

::: exercise Froude and Weber {level=2}
A $1{:}20$ model of a water-spray system is built. If Froude similarity is imposed, give the model's Weber number relative to the prototype's, and state what must be changed to match both.
::: solution
$$
\mathrm{Fr}: V_m = V_p / \sqrt{\lambda} \qquad \Rightarrow \qquad
\frac{\mathrm{We}_m}{\mathrm{We}_p} = \frac{V_m^2 \lambda}{V_p^2} = \frac{\lambda}{\lambda} = 1
$$
**Froude similarity automatically matches Weber for the same fluid pair** — $\mathrm{We} / \mathrm{Fr}^2 = \rho g L^2 / \sigma = \mathrm{Bo}$, and $\mathrm{Bo}$ matches when $L$ does. **The number that makes this a real result and not a coincidence:** the two groups are not independent once $\rho$, $g$ and $\sigma$ are fixed by the choice of fluid, so a **two-group** problem with a **one-fluid** model has only one free scale. **To match Reynolds as well you must change the fluid** — pressurised water, a cryogenic fluid, or a high-pressure air tunnel for the gaseous case.
:::
:::

::: exercise Derivation {level=3}
Use the π theorem to find the groups governing the **power** $P$ absorbed by a geometric similar stirred tank of diameter $D$, impeller speed $N$, fluid density $\rho$, viscosity $\mu$ and gravitational acceleration $g$, and show how the result reduces in the fully baffled, unbaffled and aerated cases.
::: solution
**The variables.** $P, D, N, \rho, \mu, g$ — six variables, three dimensions, **three groups**.
**The repeating set** $\rho, N, D$:
$$
\pi_P = \frac{P}{\rho N^3 D^5} \equiv N_P \quad \text{(the power number)}, \qquad
\pi_{\mu} = \frac{\mu}{\rho N D^2} = \frac{1}{\mathrm{Re}_i}, \qquad
\pi_g = \frac{g}{N^2 D} = \frac{1}{\mathrm{Fr}}
$$
$$
\boxed{ N_P = \phi \left( \mathrm{Re}_i,\ \mathrm{Fr} \right) }
$$
**The fully baffled case.** Baffles destroy the central vortex, so no air core forms and free-surface gravity effects disappear: $\mathrm{Fr}$ drops out and
$$
N_P = \phi \left( \mathrm{Re}_i \right)
$$
**The laminar limit** $N_P = K / \mathrm{Re}_i$, i.e. $P = K \mu N^2 D^3$ — **the power is independent of density**, and the reason a laminar mixer's motor sizing uses a viscosity and not a density is this cancellation. **The turbulent limit** $N_P \approx$ const, $P = N_P \rho N^3 D^5$ — **the affinity law of the stirred tank**, and the reason doubling the impeller diameter at constant speed multiplies the power by $32$.
**The unbaffled case.** A vortex forms, its depth depends on $\mathrm{Fr}$, and the power **drops** at the critical speed where the vortex reaches the impeller:
$$
N_P = \phi \left( \mathrm{Re}_i,\ \mathrm{Fr} \right), \qquad \text{with a minimum at } \mathrm{Fr} \approx 0.5 \text{ to } 1
$$
**The aeration case.** Adding a gas flow rate $Q_g$ gives seven variables and **four** groups, the new one being the **gassing number**
$$
N_Q = \frac{Q_g}{N D^3}
\qquad \Rightarrow \qquad
\left( \frac{P_g}{P} \right)_{\text{gassed}} = \psi \left( N_P,\ N_Q \right)
$$
**The number that makes an aerated fermenter's design a power problem.** The empirical **Michel–Miller** correlation
$$
P_g = 0.826 \rho^{0.14} D_g^{0.09} \left( N D^2 \right)^{0.19} P^{0.45} Q_g^{0.20} N^{0.95} D^{1.67}
$$
reproduces the observation that **gassing cuts the power draw by $40$ to $60\ \%$**, and the reason a fermenter's $k_L a$ correlation is written against the **gassed** power per unit volume $P_g / V$ and not the ungassed is that the gas hold-up and the bubble size both depend on the reduced energy dissipation — **a $50\ \%$ error in $P_g / V$ is a $25\ \%$ error in $k_L a$**, since $k_L a \propto \left( P_g / V \right)^{0.4} Q_g^{0.5} / A^{0.5}$.
*Sanity.* The reason the power number contains $N^3 D^5$ is that the flow is **inertia-dominated** and the relevant momentum flux is $\rho \times N D \times N^2 D^2$ over an area $D^2$ — the pump affinity laws with the head replaced by nothing, since a stirred tank does no external work. **Every rotating-machine correlation in this book is the same dimensional argument with a different geometry constant**, and the reason a pump, a fan, a turbine and a stirred tank all use a "power coefficient" is that the coefficient is the theorem's answer and not an empirical invention.
:::
:::

::: exercise Design {level=3}
Specify a complete model-test programme for a **$1{:}20$ scale model of a coastal LNG offloading jetty's wave-attenuation basin**, and state the similitude requirements, the distortions you will accept, the instrumentation and the acceptance criteria.
::: solution
**The problem.** A wave-attenuation basin of volume $V_b = 4{,}500\ \mathrm{m^3}$ is to be tested for its **resonant response** to a design sea state of significant wave height $H_s = 3.5\ \mathrm{m}$ and peak period $T_p = 11\ \mathrm{s}$, and for its **overtopping** and **mooring-loads** consequences.
**The governing groups.** With $\rho, g, \nu, \sigma$ fixed by the fluid and the waves described by $H, T, d$ (depth):
$$
\mathrm{Fr} = \frac{\sqrt{g d}}{L / T}, \qquad \frac{H}{d}, \qquad \frac{\lambda_b}{d}, \qquad \mathrm{Re} = \frac{\sqrt{g d}\, d}{\nu}, \qquad \mathrm{KeC} = \frac{u_{\max} T}{D_{\text{member}}}, \qquad \mathrm{Re}_K = \frac{u_{\max} D_{\text{member}}}{\nu}
$$
**Froude similarity is mandatory** — waves are a gravity phenomenon and the resonant period is a Froude scaling:
$$
\lambda = 20, \qquad T_m = \frac{11}{\sqrt{20}} = 2.46\ \mathrm{s}, \qquad H_m = \frac{3.5}{20} = 0.175\ \mathrm{m}, \qquad d_m = \frac{d_p}{20}
$$
**The distortions, and why each is acceptable.**
$$
\begin{array}{l l l}
\text{Reynolds} & \mathrm{Re}_m = \mathrm{Re}_p / 20^{3/2} = \mathrm{Re}_p / 89.4 & \text{accepted; separated-flow drag is } \mathrm{Re}\text{-insensitive above } 10^4 \\
\text{Surface tension} & \mathrm{We}_m,\ \mathrm{Bo}_m \text{ too small} & \text{accepted for } H / d > 0.05; \text{ wrong for overtopping **spray**} \\
\text{Air entrainment} & \text{cannot be modelled} & \text{accepted; the prototype's entrained air is a } 5\ \% \text{ mass effect} \\
\text{Structural} & \text{mooring modelled at full stiffness, not Froude} & \text{a deliberate distortion; corrected by a coupled simulation} \\
\text{Viscous dissipation at the basin walls} & \text{relatively larger in the model} & \text{corrected by a measured wall-damping coefficient}
\end{array}
$$
**The number that makes the surface-tension distortion the one to worry about.** The model's $H_m = 175\ \mathrm{mm}$ gives $\mathrm{Bo} \left( H_m \right) = 998 \times 9.81 \times 0.175^2 / 0.0728 = 42{,}000 \gg 1$, so **wave-scale** surface tension is negligible — but the **overtopping spray** has droplets of $1\ \mathrm{mm}$ for which $\mathrm{Bo} = 1.4$, and the reason a wave-tank laboratory measures overtopping **volume** and not spray **dispersion** is that the second is not scalable in a one-fluid model.
**The scale factors.**
$$
\begin{array}{l c l}
\text{Time} & \lambda^{1 / 2} = 4.47 & \\
\text{Velocity} & \lambda^{1 / 2} = 4.47 & \\
\text{Force per unit length} & \lambda^2 = 400 & \\
\text{Moment} & \lambda^3 = 8{,}000 & \\
\text{Overtopping volume per wave} & \lambda^3 = 8{,}000 & \\
\text{Discharge} & \lambda^{5 / 2} = 1{,}789 &
\end{array}
$$
**The facility.** A wave flume of $60 \times 1.2\ \mathrm{m}$ is too narrow for a three-dimensional basin response; the programme needs a **basin** of at least $20 \times 15\ \mathrm{m}$ with a **paddle beach** of 120 flaps, absorption control, and a scale of $1{:}40$ instead of $1{:}20$ to fit — **which changes every number above and is the reason the first job in a model-test specification is to check that the facility exists**.
**The instrumentation.**
$$
\begin{array}{l l l}
\text{Waves} & 12\text{–}24\ \text{capacitance wires}, \pm 0.5\ \mathrm{mm} & \text{array resolution } \lambda / 40 = 12.5\ \mathrm{mm} \\
\text{Pressures} & 40\text{–}100\ \text{transducers}, 0\text{–}1\ \mathrm{bar}, 2\ \mathrm{kHz} & \text{flush-mounted, } 3\ \mathrm{mm}\text{ ports} \\
\text{Forces} & 6\text{-component load cells}, 0\text{–}500\ \mathrm{N} & \text{noise floor } < 0.05\ \mathrm{N} = 0.1\ \% \text{ of full scale} \\
\text{Motion} & 6\text{-DOF optical}, 0.1\ \mathrm{mm} & \\
\text{Overtopping} & \text{collecting tank with a load cell}, 10\ \mathrm{g} & \text{sampled at } 10\ \mathrm{Hz} \\
\text{PIV} & \text{time-resolved, } 200\ \mathrm{fps} & \text{for the basin's resonant mode shape}
\end{array}
$$
**The number that sets the sampling duration.** A $1{,}000$-year sea state's model duration is $3\ \mathrm{h} / 4.47 = 40\ \mathrm{min}$ of **stationary** irregular waves, and the reason a wave-tank programme is quoted in **tank-hours** and not in test count is that a single $40$-minute irregular-wave realization costs more than a day of regular-wave tests.
**The acceptance criteria.**
$$
\begin{array}{l l}
\text{Wave reproduction} & \text{measured } H_s \text{ within } \pm 3\ \% \text{ of target, spectrum within } \pm 5\ \% \text{ in the peak band} \\
\text{Reflection} & K_R < 0.05 \text{ upstream of the model, verified by Goda's two-gauge method} \\
\text{Repeatability} & \text{three repeats of the design sea, } H_s \text{ within } \pm 2\ \%, \text{ peak force within } \pm 8\ \% \\
\text{Scale effects} & \text{a second model at } 1{:}30 \text{ for the two most critical sea states} \\
\text{Instrument calibration} & \text{before and after the programme, drift } < 1\ \% \\
\text{Uncertainty} & \text{reported to the ISO GUM with a coverage factor of } 2
\end{array}
$$
**The four clauses that protect the buyer.** **"ALL MODEL TESTS SHALL BE CONDUCTED AT FROUDE SIMILITUDE AND THE FROUDE NUMBER SHALL BE REPORTED WITH EVERY DATA POINT."** **"ANY PHENOMENON GOVERNED BY SURFACE TENSION, AIR ENTRAINMENT OR MATERIAL STRENGTH SHALL BE IDENTIFIED AS UNSCALABLE AND REPORTED WITHOUT EXTRAPOLATION."** **"A SCALE EFFECT STUDY AT NOT LESS THAN TWO SCALES SHALL BE PERFORMED FOR THE GOVERNING LOAD CASE."** **"THE UNCERTAINTY OF EVERY REPORTED EXTREME VALUE SHALL INCLUDE A REPEATABILITY COMPONENT ESTIMATED FROM NOT LESS THAN THREE INDEPENDENT REALIZATIONS."**
*Design comment.* The general rule is that **a model test answers the question it was designed to answer and no other, and the similitude analysis is the document that says which question was answered** — which is why a model-test report without a group-by-group table of what was matched, what was corrected and what was abandoned is not a report but a set of numbers.
:::
:::
