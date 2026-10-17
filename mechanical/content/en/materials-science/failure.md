A structure does not fail at the stress at which the material yields. It fails at the stress at which the largest crack in it becomes unstable, and that stress is set by the square root of the crack's length. The consequence is the single most counter-intuitive fact in engineering: **a component can be over-designed and still fail**, because raising the yield strength lowers the stress at which a given crack runs, and because the strongest available metals are the ones with the shortest tolerable cracks.

Three mechanisms account for almost every engineering fracture. **Brittle fracture** is one equation, $K_{Ic} = Y \sigma \sqrt{\pi a}$, and is a race between the toughness of the material and the size of the flaw the shop floor can be trusted to leave in. **Fatigue** is an integral of a power law, and because the exponent is three or four, a small error in the applied stress is a large error in the life. **Creep** is an exponential in temperature, and because the activation energy is two or three hundred kilojoules, a fifty-degree error in a furnace thermocouple is a factor of seventeen in the design life.

::: warning Three ways to misuse a fracture toughness
**$K_{Ic}$ is a plane-strain property and most specimens do not measure it.** The standard requires a thickness of $B$ at least $2.5 \left( K_{Ic} / \sigma_y \right)^{2}$, which for a tough structural steel at $K_{Ic} = 200\ \mathrm{MPa\, m^{1/2}}$ is $80\ \mathrm{mm}$ — so a $10\ \mathrm{mm}$ plate tested in the laboratory gives an apparent toughness two or three times the plane-strain value, and a designer who uses it has no margin at all. Ask for the **thickness and orientation** with the number, and use the lower-bound value for the thickness you will actually have. **A fracture-mechanics calculation is only as good as the flaw size, and the flaw size is a statement about the inspection.** The honest form is "if a crack of depth $a$ is present the critical stress is $\sigma_c$, and the inspection finds cracks larger than $a_{\min}$ with probability $P$"; a calculation that quotes a critical stress without an $a_{\min}$ and an inspection interval is not a calculation but an assertion. And **$K_{Ic}$ is not a constant at low temperature or high rate**: a ferrite steel's toughness falls from $200$ to $20\ \mathrm{MPa\, m^{1/2}}$ between $+ 20$ and $- 50\ {}^{\circ}\mathrm{C}$, and a Charpy test on the actual plate at the actual minimum service temperature is the only defensible evidence. The Liberty ships of 1943 broke in the North Atlantic at a stress well below yield, near $0\ {}^{\circ}\mathrm{C}$, in a steel whose Charpy transition was a few degrees too high, and the whole of modern fracture mechanics descends from the investigations that followed.
:::

## Brittle fracture

::: definition Griffith and the energy release rate {#def-griffith}
A crack of length $2a$ in an infinite sheet under a stress $\sigma$ releases elastic strain energy at a rate
$$
G = \frac{\pi \sigma^{2} a}{E^{\prime}}, \qquad
E^{\prime} = \left\{ \begin{array}{l l} E & \text{plane stress} \ E / \left( 1 - \nu^{2} \right) & \text{plane strain} \end{array} \right.
$$
and creates two new surfaces at a cost of $2 \gamma_s$ per unit area of crack advance. Equating gives **Griffith**'s result,
$$
\sigma_f = \left( \frac{2 E \gamma_s}{\pi a \left( 1 - \nu^{2} \right)} \right)^{1 / 2} ,
$$
which explains the whole of the strength of glass and ceramics: the strength is not a material property but a function of the largest surface flaw, and a glass fibre of $5\ \mu\mathrm{m}$ diameter is strong because it cannot contain a large flaw, while the same glass in a $5\ \mathrm{mm}$ plate is forty times weaker.
**Orowan** and **Irwin** replaced the surface energy with the plastic work at the crack tip, $\gamma_{\mathrm{eff}} = \gamma_s + \gamma_p$, where $\gamma_p$ is a thousand to a hundred thousand times $\gamma_s$ in a metal — which is why a steel is tough and glass is not, and why the plastic work is the whole of the design problem.
:::

::: definition The stress-intensity factor and the toughness {#def-k}
Irwin's reformulation puts the crack-tip field into one parameter:
$$
\sigma_{ij} = \frac{K_I}{\sqrt{2 \pi r}} f_{ij} ( \theta ) + \ldots , \qquad
K_I = Y \sigma \sqrt{\pi a} ,
$$
with $Y$ a geometry factor of $1.0$ for a central through-crack, $1.12$ for an edge crack, and $1.2$ to $2.0$ for a surface flaw depending on its depth-to-length ratio. Fracture occurs when $K_I$ reaches the material's **fracture toughness** $K_{Ic}$, and the equivalence to Griffith is $G = K_I^{2} / E^{\prime}$.
$$
\begin{array}{l c l}
\text{Soda-lime glass} & 0.7 & \text{fatal at a scratch} \\
\text{PMMA} & 1.2 & \\
\text{Epoxy resin} & 1.0 & \\
\text{Alumina } \mathrm{Al_2 O_3} & 3.5 & \text{strong in compression, weak in point-loaded tension} \\
\text{Silicon carbide} & 4.0 & \\
\text{Al 7075-T651, long-transverse} & 24 & \text{the aerospace workhorse} \\
\text{Al 2024-T3, L-T} & 34 & \\
\text{Ti-6Al-4V} & 55 & \\
\text{AerMet 100 at } 1{,}930\ \mathrm{MPa} & 145 & \\
\text{Maraging 300 at } 1{,}860\ \mathrm{MPa} & 175 & \\
\text{A36 structural steel, plate} & 200 & \\
\text{Ni-steel, cryogenic} & 250 & \\
\text{Rimmed mild steel at } - 40\ {}^{\circ}\mathrm{C} & 20 & \text{the Liberty-ship condition}
\end{array}
$$
:::

::: definition Small-scale yielding, $J$ and CTOD {#def-j}
$K_{Ic}$ is valid only if the plastic zone at the crack tip is small compared with the crack and the ligament. Irwin's plastic-zone size is
$$
r_p = \frac{1}{2 \pi} \left( \frac{K_I}{\sigma_y} \right)^{2} \quad \text{plane stress}, \qquad
r_p = \frac{1}{6 \pi} \left( \frac{K_I}{\sigma_y} \right)^{2} \quad \text{plane strain} ,
$$
and the requirement is that $r_p$ be less than a tenth of both the crack depth and the remaining ligament. For a tough steel at $K = 200$ and $\sigma_y = 500$ the plane-strain zone is $8.4\ \mathrm{mm}$, so a $25\ \mathrm{mm}$ crack is at the edge of validity and a $5\ \mathrm{mm}$ crack is not a valid test at all.
When the zone is large, the **$J$-integral** replaces $K$:
$$
J = \int_{\Gamma} \left( W\, \mathrm{d} y - T_i\, \frac{\partial u_i}{\partial x}\, \mathrm{d} s \right)
= \frac{K_J^{2} \left( 1 - \nu^{2} \right)}{E} + J_{\mathrm{pl}} ,
$$
with the engineering estimate $J_{\mathrm{pl}} = m \sigma_0\, \varepsilon_f B_n a / W$, where $m = 2$ for a tension specimen and $1.25$ for a bend. The **crack-tip opening displacement** $\delta$ relates by $J = m \sigma_0 \delta$, and for ferrite steels a **cleavage** criterion of $\delta_c$ near $0.3\ \mathrm{mm}$ predicts the fracture of a welded joint better than any $K$-based method, because cleavage is controlled by the opening at a carbide one grain diameter ahead of the tip.
:::

::: widget plot
f: 1.12*460*sqrt(x/1000*3.14159); 1.12*250*sqrt(x/1000*3.14159); 1.12*1930*sqrt(x/1000*3.14159)
x: 0.1, 60
y: 0, 260
labels: 7075-T651 at 460 MPa; A36 at 250 MPa; AerMet 100 at 1930 MPa
caption: The stress-intensity factor against crack depth for three materials loaded to their own yield strengths. The horizontal lines are their toughnesses — 24, 200 and $145\ \mathrm{MPa\, m^{1/2}}$. The crossings are the critical crack depths: $0.7\ \mathrm{mm}$ for the high-strength aluminium, $1.4\ \mathrm{mm}$ for the strongest steel and $162\ \mathrm{mm}$ for the mild steel. The mild steel is the only one of the three that can be designed against a crack a workman can see.
:::

::: definition The ductile-to-brittle transition {#def-dbtt}
Body-centred-cubic ferrite steels change from ductile to brittle over a temperature range of fifty to a hundred degrees, because the **yield strength rises sharply as the temperature falls** — the Peierls stress of screw dislocations — while the **cleavage fracture stress is temperature-independent**. The two curves cross, and below the crossing the material yields nowhere and cracks instead.
Face-centred-cubic metals — aluminium, copper, austenitic stainless, nickel — have no Peierls stress and **no transition at all**, which is why a liquefied-natural-gas tank is made of $9\ \%$ nickel steel or austenitic stainless and never of a carbon steel, and why the $2.5\ \%$, $3.5\ \%$ and $9\ \%$ nickel grades are priced by their transition temperature.
The transition is measured three ways: the **Charpy V-notch** energy against temperature, the **drop-weight** nil-ductility temperature, and the **fracture appearance** fraction on a broken Charpy specimen. The **FATT$_{50}$**, the temperature at which the fracture surface is half-cleavage, is the design number, and a pressure-vessel specification typically requires an $\mathrm{FATT}_{50}$ twenty degrees below the minimum metal temperature.
:::

## Fatigue

::: definition The S-N curve and its mean stress {#def-sn}
The high-cycle fatigue strength of a smooth polished specimen is, to first order,
$$
\sigma_{-1} \approx 0.5\, \sigma_{\mathrm{UTS}} \quad \text{for steels up to } 1{,}400\ \mathrm{MPa}, \qquad
\sigma_{-1} \approx 0.35\, \sigma_{\mathrm{UTS}} \quad \text{for aluminium alloys, with no knee} ,
$$
and the **Basquin** relation $\sigma_a = \sigma_f^{\prime} \left( 2 N_f \right)^{b}$ with $b$ near $- 0.08$ to $- 0.12$ describes the finite-life region. Steel has a genuine **endurance limit** below which a crack will not initiate, because a small crack is stopped by the microstructure when the applied range falls below the threshold; aluminium does not, which is why an aluminium airframe is certified to a **safe-life** or **damage-tolerance** basis and a steel one can be certified to an infinite life.
Mean stress is corrected by **Goodman**,
$$
\frac{\sigma_a}{\sigma_{-1}} + \frac{\sigma_m}{\sigma_{\mathrm{UTS}}} = 1 ,
$$
or by the parabolic **Gerber** law $\sigma_a / \sigma_{-1} = 1 - \left( \sigma_m / \sigma_{\mathrm{UTS}} \right)^{2}$. Goodman is conservative and Gerber fits ductile data; the difference at a mean stress of half the ultimate is a factor of $1.33$ in life, which is why the choice is a contract matter.
**The three killers of a fatigue calculation** are not the stress but the **surface** — a $0.2\ \mathrm{mm}$ scratch cuts the endurance limit of a high-strength steel by a third; **residual stress**, so that a shot-peened or carburised surface carries a mean compressive stress the Goodman correction cannot see and that is worth a factor of three in life; and **environment**, because corrosion fatigue in a chloride has no threshold at all and reduces the life to a tenth.
:::

::: definition Crack growth and the Paris law {#def-paris}
In region II of the $\log \mathrm{d} a / \mathrm{d} N$ against $\log \Delta K$ curve the growth is a power law,
$$
\frac{\mathrm{d} a}{\mathrm{d} N} = C \left( \Delta K_{\mathrm{eff}} \right)^{m}, \qquad
\Delta K = Y \Delta \sigma \sqrt{\pi a} ,
$$
with $m$ near $3$ for aluminium and $4$ for steel, and the **representative airworthiness laws**
$$
\frac{\mathrm{d} a}{\mathrm{d} N} = 0.86 \times 10^{- 11} \Delta K^{3}\ \left[ \mathrm{m / cycle} \right] \quad \text{aluminium}, \qquad
\frac{\mathrm{d} a}{\mathrm{d} N} = 2.85 \times 10^{- 14} \Delta K^{4}\ \left[ \mathrm{m / cycle} \right] \quad \text{steel} ,
$$
with $\Delta K$ in $\mathrm{MPa\, m^{1/2}}$. Integrating from an initial crack $a_0$ to a critical $a_c$ gives the closed form, for $m$ greater than two,
$$
N = \frac{a_0^{1 - m / 2} - a_c^{1 - m / 2}}{\left( m / 2 - 1 \right) C \left( Y \sigma \sqrt{\pi} \right)^{m}} .
$$
**Region I** is the **threshold** $\Delta K_{\mathrm{th}}$, below which a crack will not grow — $2.5$ to $3\ \mathrm{MPa\, m^{1/2}}$ for a high-strength aluminium and $6$ to $8$ for a steel at $R = 0.1$ — and it rises with the stress ratio as $\Delta K_{\mathrm{th}} \propto \left( 1 - R \right)^{\gamma}$ with $\gamma$ near $1.4$ for aluminium and $2.3$ for steel. **Region III** is the approach to $K_c$.
**The mechanism is striations.** Each cycle advances the tip by a plastic-shear increment on a $45^{\circ}$ plane, and the crack blunts on loading and re-sharpens on unloading — the **Laird** mechanism. The striation spacing equals the growth rate and is readable on a fracture surface, which makes a fatigue fracture a **document** that records the loading history of the component that made it.
:::

::: definition Closure, and the small-crack problem {#def-closure}
A crack does not open until the applied stress reaches a **closure stress** $K_{\mathrm{op}}$, because the rough faces wedge together behind the tip (**roughness-induced closure**, Elber), because the plastic wake stretches (**plasticity-induced**), and because oxide debris packs the mouth (**oxidation**). The effective range is therefore
$$
\Delta K_{\mathrm{eff}} = U\, \Delta K , \qquad U = \frac{\Delta K - K_{\mathrm{op}}}{\Delta K} ,
$$
with $U$ near $0.6$ at $R = 0$ and $1.0$ at $R = 0.7$. The consequence is that **a crack grown at $R = 0$ is slower than the same crack tested at $R = 0.7$ at the same $\Delta K$**, and that a laboratory $R$-ratio correction is mandatory when the service spectrum is mean-stress-dominated.
**The small-crack problem is the failure of the whole method at short lengths.** A crack shorter than about $0.4\ \mathrm{mm}$ in aluminium and $0.1\ \mathrm{mm}$ in steel grows **faster** than the long-crack law predicts at the same nominal $\Delta K$, because it is not yet long enough to have built a closure wake, and it can grow **below** the long-crack threshold. A small pit, a small inclusion and a small scratch are therefore worse than the diagram says, and the design allowance for a corrosion pit is a fracture-mechanics judgement and not a measurement.
:::

## Creep

::: definition The three stages and the five mechanisms {#def-creep}
A constant-load creep curve has a **primary** stage of falling rate as the dislocations organise, a **secondary** or steady stage in which work hardening and recovery balance, and a **tertiary** stage of accelerating rate as the neck or the cavities take over. The design number is the **minimum creep rate** $\dot{\epsilon}_s$, and the design life is conventionally the time to $1\ \%$ creep strain, or the time to a $0.2\ \%$ per $1{,}000\ \mathrm{h}$ rate, whichever the code specifies.
The steady rate follows
$$
\dot{\epsilon}_s = A \sigma^{n} \exp \left( - \frac{Q_c}{R T} \right),
$$
and the **stress exponent identifies the mechanism**:
$$
\begin{array}{c l l}
n = 1 & \text{Nabarro-Herring diffusion creep (lattice diffusion)} & \dot{\epsilon} \propto D_v / d^{2} \\
n = 1,\ p = 3 & \text{Coble diffusion creep (boundary diffusion)} & \dot{\epsilon} \propto D_b \delta / d^{3} \\
n = 5 & \text{dislocation climb (power-law creep)} & \text{the common case above } 0.4\, T_m \\
n = 7,\ 11 & \text{low-temperature climb, or solute-stalled} & \\
n = 23 & \text{grain-boundary sliding (superplasticity)} & \text{fine stable grain, high } T
\end{array}
$$
The activation energy $Q_c$ is the **self-diffusion** enthalpy of the matrix — $285\ \mathrm{kJ / mol}$ for nickel, $190$ for aluminium, $240$ for $\alpha$-iron — which is the fingerprint that identifies the mechanism, and the reason a creep test's temperature control must be $\pm 2\ {}^{\circ}\mathrm{C}$: at $600\ {}^{\circ}\mathrm{C}$ a $50\ {}^{\circ}\mathrm{C}$ error changes the rate by a factor of six.
:::

::: definition Cavitation and the creep life {#def-cavitation}
At high temperature and low stress a metal fails **intergranularly** by the nucleation, growth and linking of wedge-shaped cavities on the grain boundaries normal to the stress. **Hull and Rimmer**'s diffusion-controlled cavity growth gives a rate proportional to $\sigma / d^{3}$, in which the $1 / d^{3}$ dependence means that **coarse grains are enormously better in creep** — the reason a cast turbine blade with a columnar or single-crystal structure outlives a forged one by an order of magnitude, and the reason a wrought superalloy's creep strength is quoted at a $0.2\ \%$ per $1{,}000\ \mathrm{h}$ rate rather than at rupture.
The **Monkman-Grant** relation ties the rupture life to the steady rate,
$$
\dot{\epsilon}_s^{\, m}\, t_r = C , \qquad m \approx 1, \quad C \approx 0.1 ,
$$
so the time to $1\ \%$ strain and the time to rupture differ by a factor of about ten and the **tertiary** stage is short. The **Larson-Miller** parameter
$$
P = \frac{T \left( C + \log_{10} t \right)}{1000}, \qquad C = 20, \quad T \ \text{in kelvin} ,
$$
collapses a family of stress-temperature-life data onto one curve and is the standard extrapolation device — and the standard trap, because $C = 20$ is fitted over $100$ to $10{,}000\ \mathrm{h}$ and a twenty-year extrapolation to $200{,}000\ \mathrm{h}$ is a leap of faith that the industry polices with long-term run-out tests.
:::

::: example What crack can a structure tolerate? {#ex-ac}
Give the critical through-crack depth at yield for $7075\text{-}\mathrm{T}651$ ($\sigma_y = 460\ \mathrm{MPa}$, $K_{Ic} = 24$), $2024\text{-}\mathrm{T}3$ ($325$, $34$), A36 steel ($250$, $200$), Ti-6Al-4V ($880$, $55$) and AerMet 100 ($1{,}930$, $145$), and say which of them can be designed damage-tolerantly.
::: solution
With $Y = 1.12$ for an edge crack, $a_c = \left( 1 / \pi \right) \left( K_{Ic} / 1.12 \sigma_y \right)^{2}$:
$$
\begin{array}{l c c c}
\text{Material} & \text{Yield} & K_{Ic} & a_c \\
\text{7075-T651} & 460 & 24 & 0.69\ \mathrm{mm} \\
\text{2024-T3} & 325 & 34 & 2.8\ \mathrm{mm} \\
\text{Ti-6Al-4V} & 880 & 55 & 0.99\ \mathrm{mm} \\
\text{AerMet 100} & 1{,}930 & 145 & 1.4\ \mathrm{mm} \\
\text{A36 steel} & 250 & 200 & 162\ \mathrm{mm}
\end{array}
$$
**The verdict.** Only the mild steel has a critical crack larger than a visual inspection can be trusted to miss. A $7075$ wing spar at yield tolerates a $0.7\ \mathrm{mm}$ crack, which is smaller than the $1\ \mathrm{mm}$ a good eddy-current inspection reliably finds — so a $7075$ part **cannot** be designed to survive a crack and must be designed to exclude one, by proof testing, by fracture-control drawings that keep the loads out of the through-thickness direction, and by not using it where a crack would be a hazard.
**The design response.** The aerospace industry moved from $7075$ to **2024-T3** and **2524** for fuselage skin and to **7050** and **7150** for wing lower booms precisely on this trade, and moved the whole design philosophy from **safe-life** — a calculation that no crack reaches critical size in the life — to **damage tolerance**, a calculation that a detectable crack does not reach critical size between inspections, after the 1954 Comet accidents.

*Check.* The plastic zone at $a_c$ for $7075$ is $r_p = \left( 1 / 6 \pi \right) \left( 24 / 460 \right)^{2} = 0.14\ \mathrm{mm}$, a fifth of $a_c$, so small-scale yielding holds and the linear-elastic calculation is valid. For A36, $r_p = 8.4\ \mathrm{mm}$ against $a_c = 162\ \mathrm{mm}$, also valid. $\checkmark$

*Sanity.* The $162\ \mathrm{mm}$ figure is why a ship, a bridge and a pressure vessel can be designed against yield and inspected by eye, and why an airframe cannot. It is also why the **through-thickness** toughness, which is a third of the in-plane value in a plate, is the property that decides whether a lugged joint is damage-tolerant — and why a lugged joint in a high-strength aluminium forging is a fracture-critical item by definition.
:::
:::

::: example Fatigue life from a detectable crack {#ex-fatlife}
An aluminium lap joint is loaded to a maximum of $150\ \mathrm{MPa}$ at $R = 0$. Using the representative law, give the life from a $2\ \mathrm{mm}$ detectable crack to failure, and the effect of dropping the stress to $100\ \mathrm{MPa}$.
::: solution
**The critical crack.** Take the $2024\text{-}\mathrm{T}3$ value $K_{Ic} = 34\ \mathrm{MPa\, m^{1/2}}$, appropriate to a riveted lap joint in a frame-stressed panel:
$$
a_c = \frac{1}{\pi} \left( \frac{34}{1.12 \times 150} \right)^{2} = 43.5\ \mathrm{mm} .
$$
**The life.** With $C = 0.86 \times 10^{- 11}$ and $m = 3$, and $\left( 1.12 \times 150 \times 1.772 \right)^{3} = 297.7^{3} = 2.64 \times 10^{7}$,
$$
N = \frac{a_0^{- 0.5} - a_c^{- 0.5}}{0.5 \times 0.86 \times 10^{- 11} \times 2.64 \times 10^{7}}
= \frac{22.36 - 0.152}{1.135 \times 10^{- 4}} = 1.6 \times 10^{5}\ \text{cycles} .
$$
**The stress sensitivity.** The life goes as $\sigma^{- 3}$, so dropping to $100\ \mathrm{MPa}$ multiplies it by $1.5^{3} = 3.4$, giving $5.3 \times 10^{5}$ cycles.
**The crack-size sensitivity.** Starting from $0.5\ \mathrm{mm}$ instead of $2\ \mathrm{mm}$ gives $3.5 \times 10^{5}$ cycles — a factor of $2.2$, not the factor of four a naive reading suggests, because $a^{- 0.5}$ is a weak function.

*Check.* The growth rate at the start is $0.86 \times 10^{- 11} \times \left( 1.12 \times 150 \sqrt{\pi \times 0.002} \right)^{3} = 1.1 \times 10^{- 9}\ \mathrm{m / cycle}$ and at the end $6.9 \times 10^{- 6}\ \mathrm{m / cycle}$, a factor of six thousand, which is why the life is dominated by the last few millimetres. $\checkmark$

*Sanity.* A $1.6 \times 10^{5}$-cycle life from a detectable crack is the reason an airliner's fuselage skin is inspected by eddy current every few hundred flight hours, and the reason damage-tolerance certification requires that a structure with a **maximum-assumed-flaw** still carry two thirds of ultimate load. It is also why the sensitivity to stress is the number to quote: a $10\ \%$ overload cuts the life by $27\ \%$, so a fleet that flies $10\ \%$ harder than the assumed spectrum needs an inspection interval $27\ \%$ shorter, not $10\ \%$.
:::
:::

::: example The temperature you cannot afford to get wrong {#ex-creep}
A turbine disk alloy has $Q_c = 285\ \mathrm{kJ / mol}$ and $n = 5$. Give the change in creep rate for a $50\ {}^{\circ}\mathrm{C}$ temperature error at $600\ {}^{\circ}\mathrm{C}$, for a $20\ \%$ stress error, and the change in Larson-Miller life for the temperature error.
::: solution
**Temperature.**
$$
\frac{\dot{\epsilon}_2}{\dot{\epsilon}_1}
= \exp \left[ \frac{285{,}000}{8.314} \left( \frac{1}{873} - \frac{1}{923} \right) \right]
= \exp \left( 1.87 \right) = 6.5 .
$$
**Stress.** $1.2^{5} = 2.5$.
**The comparison.** A $50\ {}^{\circ}\mathrm{C}$ temperature error is worth a factor of $6.5$ and a $20\ \%$ stress error a factor of $2.5$: **temperature control is the dominant variable in creep design**, and a furnace with $\pm 10\ {}^{\circ}\mathrm{C}$ uniformity is worth more than a $10\ \%$ better alloy.
**The Larson-Miller life.** At $150\ \mathrm{MPa}$, $873\ \mathrm{K}$ and $1{,}000\ \mathrm{h}$,
$$
P = \frac{873 \times \left( 20 + 3 \right)}{1000} = 20.1 .
$$
At the same stress and $923\ \mathrm{K}$, $\log_{10} t = 20{,}100 / 923 - 20 = 1.76$, so $t = 57\ \mathrm{h}$ — a factor of **seventeen** in life for fifty degrees.

*Check.* The Monkman-Grant relation gives the same answer by another route: a rate $6.5$ times higher at the same strain to failure gives a life $6.5$ times shorter, and the extra factor of $2.6$ is the loss of ductility that accompanies the higher temperature. $\checkmark$

*Sanity.* This is why every creep code specifies a **metal temperature** rather than a gas temperature and requires the part to be instrumented or the stress derated, why a blade's **thermal-barrier coating** is a life-limited component and not a convenience, and why a $10\ \%$ life knock-down is applied to the Larson-Miller curve of a cast blade containing pores. It is also why the industry's long-run tests — the $100{,}000\ \mathrm{h}$ exposures started in the 1960s on alloys still in service — are irreplaceable, because a twenty-year extrapolation of a $10{,}000\ \mathrm{h}$ test is exactly the seventeen-fold kind of error computed above.
:::
:::

::: example Environment: stress-corrosion and hydrogen {#ex-scc}
A landing-gear component in $7075\text{-}\mathrm{T}651$ is exposed to a marine atmosphere under a sustained $300\ \mathrm{MPa}$. Give the appropriate fracture criterion and the design response.
::: solution
**The criterion.** Under a sustained load in a specific environment the relevant property is the **threshold stress-intensity factor for stress-corrosion cracking**, $K_{\mathrm{ISCC}}$, which for $7075\text{-}\mathrm{T}651$ in a marine atmosphere is $10$ to $14\ \mathrm{MPa\, m^{1/2}}$ against a $K_{Ic}$ of $24$ — **less than half**.
**The critical crack.**
$$
a_c = \frac{1}{\pi} \left( \frac{12}{1.12 \times 300} \right)^{2} = 1.4\ \mathrm{mm} .
$$
**The mechanism.** In $7075\text{-}\mathrm{T}651$ the peak-aged $\eta^{\prime}\ \mathrm{MgZn_2}$ matrix precipitates are anodic to the grain boundaries, along which the coarse equilibrium $\mathrm{MgZn_2}$ and the solute-denuded zones form a continuous anode-cathode-anode array. The crack runs **intergranularly** along the boundary, and its path is set by the boundary orientation and not by the stress — which is why the **short-transverse** orientation is $40\ \%$ worse than the long-transverse and why a specification must state the orientation.
**The design response, in order of preference.**
1. **Change the temper.** $\mathrm{T}7351$ is **over-aged**, which coarsens the boundary precipitate and thickens the denuded zone, at a cost of $12\ \%$ in strength and a gain of a factor of three in $K_{\mathrm{ISCC}}$. This is the standard aerospace answer and it is a deliberate trade of strength for the environment property.
2. **Remove the sustained stress.** Shot-peen the surface to leave $- 400\ \mathrm{MPa}$ of residual compression, which subtracts from the applied mean and can take $K_{\max}$ below $K_{\mathrm{ISCC}}$ entirely.
3. **Exclude the environment.** A zinc-flake or cadmium plating, a chromate-sealed primer, and a design with no crevice and no drain hole that can clog.
4. **Change the alloy.** A $7050$-T7451, a lower zinc-to-copper ratio, or a $2000$- or $4000$-series where the loads allow.
**The same mechanism, different species.** **Hydrogen embrittlement** is the identical argument with hydrogen instead of chloride: a $1{,}900\ \mathrm{MPa}$ steel's threshold falls from $60$ to $15\ \mathrm{MPa\, m^{1/2}}$ in a cathodic or acid environment, and the industry's rule that **no fastener above $1{,}500\ \mathrm{MPa}$ may be electroplated without a four-hour bake at $190\ {}^{\circ}\mathrm{C}$** is the whole of the design response to a plating bath that is itself a hydrogen source.

*Design comment.* The general rule is that **a sustained-load environment property is neither the fatigue property nor the toughness**, and that a designer who reaches for $K_{Ic}$ when the load is static and the environment aggressive has made an error of two or three. The three environment properties are $K_{\mathrm{ISCC}}$ for stress-corrosion, $\Delta K_{\mathrm{th}}$ in the relevant environment for corrosion fatigue — where the value can be $1\ \mathrm{MPa\, m^{1/2}}$ rather than $3$ — and the hydrogen threshold $K_{\mathrm{TH}}$, which for the strongest steels is below $20\ \mathrm{MPa\, m^{1/2}}$ and is the reason the strongest fasteners in airframe service are $1{,}600\ \mathrm{MPa}$ and not $2{,}000$.
:::
:::

::: example Design {#ex-design-fail}
Select the material and the design basis for a bolted ground-structure joint that must hold a $1{,}200\ \mathrm{MPa}$ preload, survive outdoor service, and tolerate being over-torqued in assembly.
::: solution
**The failure modes, in the order they actually happen.**
1. **Hydrogen embrittlement** at assembly, from an electroplated fastener loaded within forty-eight hours.
2. **Thread stripping** in the weaker member, which is the design limit for a steel bolt in an aluminium or a cast housing.
3. **Fatigue from the preload scatter**, because a friction coefficient of $0.10$ against $0.20$ changes the tension by $40\ \%$ and the joint's load range by more.
4. **Over-torque yielding**, which is the requirement in the question.
**Material.** A $1{,}200\ \mathrm{MPa}$-class fastener is a **medium-carbon quenched-and-tempered alloy steel**, $35\mathrm{CrMo}$ or $42\mathrm{CrMo4}$, at $110$ to $125\ \mathrm{ksi}$ proof, or an **A286** or **Inconel 718** stainless where corrosion governs. At $1{,}200\ \mathrm{MPa}$ the hydrogen threshold is about $40\ \mathrm{MPa\, m^{1/2}}$ and the material is usable; at $1{,}500$ it is $25$ and the design becomes a plating specification.
**The coating.** **Zinc-flake applied non-electrolytically** or **mechanical galvanising**, neither of which deposits hydrogen. If electrolytic zinc is unavoidable, bake at $190\ {}^{\circ}\mathrm{C}$ for four hours **within four hours** of plating. Never cadmium on a high-strength steel, and never in contact with aluminium in a wet chloride.
**The design against over-torque.** Specify **yield-on-demand** tightening — the torque-angle method with the yield point detected in the tool — rather than a torque, because torque-tension scatter is $\pm 30\ \%$ and angle-preload scatter is $\pm 5\ \%$. The over-torque case is then bounded by the tool's shut-off at a defined angle, and the joint is designed to the **proof** load and not the ultimate.
**The design against fatigue.** The bolt's alternating stress is only about one ninth of the applied load range, because the bolt is roughly nine times softer than the clamp — which is why a **long, slender** bolt with **washers** to lengthen the grip is the fatigue answer, and why a short stubby bolt in a stiff joint fails and a slender one in a soft joint does not.
**The design against stripping.** The female thread must have $1.5$ times the bolt's thread-shear area, which for an aluminium housing means a **threaded insert** or a **steel bushing**, and for a cast housing means the section is designed for the thread root and not for the bolt.

*Design comment.* The general rule is that **a bolted joint fails by assembly and not by service**, and that the specification's most important clauses are the coating process, the bake-out, the tightening method and the lubricant — none of which is a material property. The $1{,}200\ \mathrm{MPa}$ requirement is the easy part; the requirement that survives is the one about hydrogen.
:::
:::

::: history
**A. A. Griffith**'s 1920 paper on the phenomena of rupture and propagation in solids, written at the National Projectile Factory at Woolwich, was a physicist's answer to a question no engineer had posed, and it was ignored for twenty years. **G. R. Irwin** at the Naval Research Laboratory turned it into an engineering method between 1948 and 1957, with **M. L. Williams** and **C. F. Kuhn** at Brown, and the **$K$-dominance** argument of Irwin's 1957 paper is the reason fracture mechanics is a stress analysis and not a surface science. The occasion was the **Liberty ships** — 2,700 welded cargo vessels of which 1,500 developed cracks and 233 broke apart or suffered a major fracture between 1942 and 1946 — and the **Conrad** and **Schady** fracture tests of 1950 to 1952 on wrecked hulls at Sparrows Point, which measured the Charpy energies of the actual plates and established the transition-temperature explanation. **E. Orowan**'s 1949 plastic-work modification and **C. E. Inglis**'s 1913 elastic stress-concentration solution for an elliptical hole, which Griffith had used, complete the theory; **N. F. Mott** applied it to metals in 1948. **A. N. Orchard**'s and **R. E. McEvily**'s small-crack work of the 1960s and **W. Elber**'s 1967 to 1971 crack-closure measurements from strain gauges bonded at a crack's mouth, and **K. Tanaka**'s 1974 short-crack threshold data are the modern correction. **C. E. Feltner** and **C. Laird**'s 1961 blunting-and-re-sharpening mechanism gave fatigue its physical picture, after **W. A. Wood**'s electron-microscope striations of 1944; **J. Bauschinger**'s and **A. Thüring**'s work and the **Wöhler** tests of the 1850s on railway axles at Aix-la-Chapelle are the origin of the whole subject, and **Wöhler**'s conclusion that the **stress range** and not the maximum stress governs is still the first clause of every fatigue standard. **F. R. Larson** and **S. J. Miller**'s 1952 time-stress parameter, **R. L. Hull** and **D. E. Rimmer**'s 1959 to 1960 cavity-growth theory, and **E. Orowan**, **C. Zener** and **F. R. N. Nabarro**'s creep papers gave the high-temperature half.
:::

## Where this leads

The toughness of this lesson is the grain size and texture of [[materials-science/dislocations-strengthening]], the creep cavity's diffusion is the diffusivity of [[materials-science/defects-diffusion]], the transition temperature of a pressure-vessel steel is the interstitial carbon content of [[materials-science/phase-diagrams]], and the choice between a tough low-strength steel and a strong brittle one is the property chart of [[materials-science/materials-selection]].

::: summary
- Fracture is controlled by $K_I = Y\sigma\sqrt{\pi a}$ and not by the yield strength, so the strongest materials tolerate the smallest cracks and cannot be designed damage-tolerantly.
- $K_{Ic}$ is a plane-strain property with a thickness requirement, and an apparent toughness measured on a thin specimen is not a property.
- Ferrite steels have a ductile-to-brittle transition because the yield rises with falling temperature and the cleavage stress does not; FCC metals have none.
- Fatigue life is an integral of a cube or fourth power, so it is dominated by the largest stress range and by the last few millimetres of growth.
- Small cracks grow faster than the long-crack law and below its threshold, which is why a pit or an inclusion is worse than the diagram says.
- Creep rate is exponential in $1/T$ with a self-diffusion activation energy, so a $50\ {}^{\circ}\mathrm{C}$ error is worth a factor of six in rate and seventeen in life.
- Under sustained load in an aggressive environment the governing property is $K_{\mathrm{ISCC}}$ or $K_{\mathrm{TH}}$, which can be half the toughness or less.
:::

::: quiz
A notched specimen of a high-strength steel is tested at $-60\ {}^{\circ}\mathrm{C}$ and breaks at a net-section stress well below yield. What is the correct interpretation?
- [x] The material is below its ductile-to-brittle transition and failed by cleavage
- [ ] The specimen was too thin for plane strain
- [ ] The notch sharpened the stress beyond the ultimate tensile strength
- [ ] The test rate was too slow
::: solution
Below the transition the yield strength has risen above the cleavage fracture stress, so the material cannot yield and the fracture is brittle at a nominal stress below the room-temperature yield. A **thin** specimen would be *tougher*, not weaker, because plane stress allows through-thickness yielding; the notch's role is to suppress yielding and to raise the transition temperature, which is why a notched specimen is used to find the transition and a smooth one to hide it.
:::
:::

## Exercises

::: exercise Griffith {level=1 check="0.5"}
By what power of the crack length does the brittle fracture stress scale?
::: solution
The minus one half — $\sigma_f \propto a^{- 1 / 2}$.
:::
:::

::: exercise Paris {level=1 check="3"}
Give the Paris exponent $m$ for an aluminium alloy.
::: solution
About $3$.
:::
:::

::: exercise Creep {level=1 check="5"}
What stress exponent identifies dislocation-climb, power-law creep?
::: solution
Five.
:::
:::

::: exercise Transition {level=1 check="0"}
How many ductile-to-brittle transitions does an aluminium alloy sheet have between $+100$ and $-253\ {}^{\circ}\mathrm{C}$?
::: solution
None — a face-centred-cubic metal has no transition.
:::
:::

::: exercise Plastic zone {level=1 check="3"}
The plane-strain plastic zone at a crack tip is the plane-stress zone divided by what number?
::: solution
Three.
:::
:::

::: exercise Critical crack {level=2}
A $25\ \mathrm{mm}$-thick plate of $K_{Ic} = 60\ \mathrm{MPa\, m^{1/2}}$ and $\sigma_y = 900\ \mathrm{MPa}$ contains a $4\ \mathrm{mm}$ edge crack. Give the fracture stress and say whether the failure is brittle.
::: solution
$$
\sigma_c = \frac{60}{1.12 \sqrt{\pi \times 0.004}} = 601\ \mathrm{MPa} < 900\ \mathrm{MPa} ,
$$
so it fractures at two thirds of yield and the failure is **nominally** brittle.
*Sanity.* The plastic zone is $r_p = \left( 1 / 6 \pi \right) \left( 60 / 900 \right)^{2} = 0.24\ \mathrm{mm}$, a sixteenth of the crack, so linear-elastic fracture mechanics is valid and the calculation is sound. The $25\ \mathrm{mm}$ thickness passes the $2.5 \left( K_{Ic} / \sigma_y \right)^{2} = 11\ \mathrm{mm}$ requirement, so the $K_{Ic}$ used is a genuine plane-strain value.
:::
:::

::: exercise Inspection interval {level=2}
A steel tie rod is inspected for cracks larger than $3\ \mathrm{mm}$, and the inspection is reliable. With $K_{Ic} = 100\ \mathrm{MPa\, m^{1/2}}$, $\sigma_y = 700\ \mathrm{MPa}$, $C = 2.85 \times 10^{- 14}$, $m = 4$ and a stress range of $350\ \mathrm{MPa}$ at $R = 0.1$, give the critical crack and the life from the detectable crack.
::: solution
$$
a_c = \frac{1}{\pi} \left( \frac{100}{1.12 \times 700} \right)^{2} = 5.8\ \mathrm{mm} ,
$$
and taking $\Delta K$ at $0.9\times$ the $R = 0$ value,
$$
N = \frac{a_0^{- 1} - a_c^{- 1}}{C \left( Y \Delta \sigma \sqrt{\pi} \right)^{4}}
= \frac{333 - 172}{2.85 \times 10^{- 14} \times \left( 1.12 \times 315 \times 1.772 \right)^{4}} = 1.1 \times 10^{5}\ \text{cycles} .
$$
*Sanity.* The critical crack is only twice the detectable crack, so the interval must be short: the growth from $3$ to $5.8\ \mathrm{mm}$ is a fifth of the total life, or $20{,}000$ cycles. That is the whole of damage-tolerance design — the interval is not the life divided by a safety factor but the growth between the largest crack you can miss and the smallest crack that is dangerous.
:::
:::

::: exercise Creep design {level=2}
A component must survive $20{,}000\ \mathrm{h}$ at $650\ {}^{\circ}\mathrm{C}$ at a stress where the Larson-Miller parameter is $22.0$ with $C = 20$. Give the temperature at which the same stress gives $200{,}000\ \mathrm{h}$, and comment.
::: solution
$$
T = \frac{22{,}000}{20 + \log_{10} 20{,}000} = \frac{22{,}000}{24.30} = 905\ \mathrm{K} = 632\ {}^{\circ}\mathrm{C} .
$$
*Sanity.* A **twenty-degree** drop buys a factor of ten in life, which is the arithmetic of Example 3 read backwards. It is why a blade's cooling-air flow is a life-limited feature, why a hot-section inspection is scheduled on **equivalent operating hours** accumulated from a temperature-time integral rather than on calendar time, and why a single $50\ {}^{\circ}\mathrm{C}$ overtemperature excursion of ten minutes can consume a week of a component's life. The extrapolation from $20{,}000$ to $200{,}000\ \mathrm{h}$ is also outside the range over which $C = 20$ was fitted, and a code would require a long-term run-out test before allowing it.
:::
:::

::: exercise Derivation {level=3}
Integrate the Paris law to the closed form given in this lesson, derive $N \propto \sigma^{- m}$, and show how the life is distributed over the decades of crack length.
::: solution
**The integral.** With $\mathrm{d} a / \mathrm{d} N = C \left( Y \sigma \sqrt{\pi a} \right)^{m}$,
$$
N = \frac{1}{C \left( Y \sigma \sqrt{\pi} \right)^{m}} \int_{a_0}^{a_c} a^{- m / 2}\, \mathrm{d} a
= \frac{1}{C \left( Y \sigma \sqrt{\pi} \right)^{m}}
\left[ \frac{a^{\, 1 - m / 2}}{1 - m / 2} \right]_{a_0}^{a_c} .
$$
For $m$ greater than two the exponent $1 - m / 2$ is negative, so
$$
N = \frac{a_0^{\, 1 - m / 2} - a_c^{\, 1 - m / 2}}{\left( m / 2 - 1 \right) C \left( Y \sigma \sqrt{\pi} \right)^{m}} . \quad \checkmark
$$
**The stress dependence.** Every other factor is independent of the stress, so $N \propto \sigma^{- m}$ exactly: with $m = 3$ a $20\ \%$ overload costs $49\ \%$ of the life and with $m = 4$ it costs $59\ \%$.
**The distribution over crack length.** The number of cycles per unit $\log a$ is
$$
\frac{\mathrm{d} N}{\mathrm{d} \log a} = \frac{a}{C \left( Y \sigma \sqrt{\pi} \right)^{m} a^{m / 2}} \propto a^{\, 1 - m / 2} ,
$$
so for $m = 3$ each factor of ten in crack length contributes $10^{- 0.5} = 0.32$ times the previous one — the decades are **unequal**, and the early ones dominate; while for $m = 4$ the exponent is exactly $- 1$ and **every decade contributes equally**. Meanwhile the growth rate itself rises as $a^{m / 2}$, by a factor of $1{,}800$ over $a_c / a_0 = 20$ at $m = 3$.
*Sanity.* The practical consequence is the one an inspection programme lives by: at $m = 4$ a crack found at twice the depth of the previous find has consumed **half** the remaining life, and at $m = 3$ it has consumed $70\ \%$. A steel, with its higher exponent, is therefore the more forgiving material to find late — which is the opposite of the intuition that a slower-growing crack is always the safer one.
:::
:::

::: exercise Design {level=3}
Select the material and the design basis for a tank that must hold liquid hydrogen at $-253\ {}^{\circ}\mathrm{C}$, be welded, and be proof-tested at $1.25$ times the design pressure.
::: solution
**The screening criterion is the transition, not the strength.** At $-253\ {}^{\circ}\mathrm{C}$ a ferrite steel is two hundred degrees below its transition and is a sheet of ceramic; the candidates are the FCC and the austenitic metals.
$$
\begin{array}{l c c l}
\text{Material} & \text{Yield} & K_{Ic} & \text{comment} \\
\text{304L stainless} & 205 & 200 & \text{tough, cheap, weak, high expansion} \\
\text{316L stainless} & 220 & 220 & \text{better corrosion resistance, weldable} \\
\text{9\% Ni steel} & 690 & 140 & \text{needs sub-zero tempering and a strict Charpy spec} \\
\text{5083-O aluminium} & 125 & 30 & \text{light, but weak in the weld at cryogenic} \\
\text{Ti-5Al-2.5Sn ELI} & 830 & 70 & \text{light and strong, expensive, hydrogen-permeable} \\
\text{Inconel 718} & 1{,}030 & 80 & \text{strongest, most expensive}
\end{array}
$$
**Choice.** **316L austenitic stainless** for a ground test tank and **9 % nickel steel** for a production vehicle where mass matters, with **5083-O aluminium** where the tank is a pressure liner and not a structural one.
**Why 316L is the safe answer.** Its $K_{Ic}$ at $20\ {}^{\circ}\mathrm{C}$ is $220$ and at $20\ \mathrm{K}$ it is **higher**, because the FCC lattice work-hardens rather than embrittles and the stacking-fault energy falls, so that deformation twinning absorbs energy. Austenitic stainless gets **tougher** as it gets colder, which is the only family of structural materials that does.
**The traps.** **Sensitisation**: the weld heat-affected zone of a 304 precipitates chromium carbide at $600$ to $800\ {}^{\circ}\mathrm{C}$ and becomes attackable; the fix is the **L** low-carbon grade and a solution anneal at $1{,}050\ {}^{\circ}\mathrm{C}$ with a water quench after welding. **Hydrogen embrittlement of the weld filler**: a ferrite-containing 309 or 312 filler is tougher and less crack-sensitive than a fully austenitic one, so the filler is specified by its **ferrite number** of $5$ to $12$. **Permeability**: liquid hydrogen diffuses through titanium and through several steels at a measurable rate, and a ten-day hold test is a specification item. **The proof test at $1.25$ times design pressure is the fracture control**, because it proves that no crack larger than the critical size for the proof stress exists anywhere in the vessel — which is why a cryogenic tank is proof-tested **after** welding and **after** any repair.

*Design comment.* The general rule is that **a cryogenic design is a fracture design**, because the strength is available and the toughness is the question, and that the proof test is not a formality but the load-bearing element of the argument. The $1.25$ factor is chosen so that the proof stress puts the largest tolerable crack at $0.8\, K_{Ic}$ with the material at its coldest and its toughness at its lower bound — which is why the proof test is done at ambient, where the toughness of an FCC metal is *lower* than at cryogenic and the argument is conservative in the right direction.
:::
:::
