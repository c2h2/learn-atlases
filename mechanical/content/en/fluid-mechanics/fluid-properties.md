Fluid mechanics is what happens when you stop asking a body to be **rigid**. Solids carry a shear stress at rest; fluids cannot, and the entire subject — the pressure field, the drag on a ship, the noise from a valve, the oil film in a bearing, the reason a cigarette smoke plume goes turbulent at a height of forty centimetres — follows from that one inability plus the conservation laws of [[statics]] and [[dynamics]].

The lesson before any equation is therefore a lesson about **numbers and their ranges**. A fluid's density, viscosity, surface tension and compressibility span orders of magnitude across the substances engineers actually pump, and the dimensionless groups built from them decide which terms in the equations of motion may be thrown away. Half of fluid mechanics is knowing which terms are small; this lesson supplies the quantities that make "small" a number.

::: warning Seven property errors that survive a commissioning test
**Using the dynamic viscosity where the kinematic belongs.** The Reynolds number is $\rho V L / \mu = V L / \nu$, and a calculation that divides a velocity by a **dynamic** viscosity has produced units of $\mathrm{s / m^{2}}$ and an answer that changes when the fluid is changed. **Air and water have viscosities within a factor of fifty and kinematic viscosities within a factor of fifteen**, so the two errors give different answers in opposite directions. **Assuming viscosity falls with temperature because it does for liquids.** For a gas the opposite is true and the $T^{0.7}$ dependence is strong: air at $200\ {}^{\circ}\mathrm{C}$ is **$1.4$ times** as viscous as at $20\ {}^{\circ}\mathrm{C}$. A bearing or a turbine bladed-row calculation that uses the cold viscosity is wrong by about $40\ \%$ in Reynolds number, and the friction coefficient follows it to the $- 1 / 4$ power. **Treating water as incompressible in a transient.** Water's bulk modulus is $2.2\ \mathrm{GPa}$, which is enormous for a liquid and **finite**: the speed of a pressure wave in restrained water is $1{,}400$ to $1{,}480\ \mathrm{m / s}$, and a valve closing in $0.1\ \mathrm{s}$ on a $300\ \mathrm{m}$ pipeline is **fast** by the Joukowsky criterion. Steady-flow water is incompressible; water in a pipe that has just had its valve shut is a $1{,}480\ \mathrm{m / s}$ acoustic column. **Confusing the no-slip condition with a boundary condition you may relax.** No slip is an **experimentally observed property of the fluid-wall interface** and holds for every ordinary liquid and gas at ordinary pressure. It fails only when the Knudsen number exceeds $10^{- 3}$ — a $1\ \mu\mathrm{m}$ gap in air at atmospheric pressure, or anything at all in a vacuum chamber — and a no-slip calculation that is accurate to about $0.001\ \%$ in a $10\ \mathrm{mm}$ pipe under-predicts the flow through a $1\ \mu\mathrm{m}$ channel by roughly $40\ \%$. **Reading a vapour pressure at the wrong temperature.** Water's vapour pressure at $20\ {}^{\circ}\mathrm{C}$ is $2.34\ \mathrm{kPa}$ and at $90\ {}^{\circ}\mathrm{C}$ it is $70.1\ \mathrm{kPa}$ — a factor of **thirty**. A pump's net positive suction head computed with the cold number on hot condensate over-states the margin by **$7.2\ \mathrm{m}$** and the pump cavitates in its first week. **Assuming a fluid's viscosity is a single number.** A paint, a drilling mud, a blood sample, a polymer melt and a chocolate compound are **shear-thinning** over two decades of viscosity; a cornflour suspension is **shear-thickening**; a wet clay and a toothpaste have a **yield stress**. A viscometer reading taken at one speed is a data point and not a property, and a pump sized from it can be wrong by a factor of ten. **Forgetting surface tension until it is the whole problem.** Surface tension is negligible for a $1\ \mathrm{m}$ barge and dominant for a $1\ \mathrm{mm}$ nozzle, a fuel injector's spray, a microfluidic chip and a wetted-wall column. The Bond number $\rho g L^{2} / \sigma$ crosses unity at a length of **$2.7\ \mathrm{mm}$ for water**, and every design whose smallest feature is below that is a surface-tension design wearing a pressure-driven one.
:::

## Density, pressure and the continuum

::: definition Density, specific weight and the pressure field {#def-density}
$$
\rho = \frac{m}{V} \ \ \left[ \mathrm{kg / m^{3}} \right], \qquad
\gamma = \rho g \ \ \left[ \mathrm{N / m^{3}} \right], \qquad
v = \frac{1}{\rho} \ \ \left[ \mathrm{m^{3} / kg} \right], \qquad
\mathrm{SG} = \frac{\rho}{\rho_{\mathrm{water}, 4\ {}^{\circ}\mathrm{C}}}
$$
**The reference densities at $20\ {}^{\circ}\mathrm{C}$, $101.325\ \mathrm{kPa}$.**
$$
\begin{array}{l c c l c c}
\text{Substance} & \rho\ (\mathrm{kg / m^{3}}) & \mathrm{SG} & & \text{Substance} & \rho & \mathrm{SG} \\
\text{Air} & 1.204 & 0.0012 & & \text{Ethanol} & 789 & 0.789 \\
\text{Helium} & 0.166 & 0.00017 & & \text{SAE 30 oil} & 891 & 0.891 \\
\text{Carbon dioxide} & 1.831 & 0.0018 & & \text{Mercury} & 13{,}546 & 13.55 \\
\text{Water, } 4\ {}^{\circ}\mathrm{C} & 1{,}000.0 & 1.0000 & & \text{Glycerin} & 1{,}261 & 1.261 \\
\text{Water, } 20\ {}^{\circ}\mathrm{C} & 998.2 & 0.9982 & & \text{Seawater, } 35\ \mathrm{g / kg} & 1{,}025 & 1.025 \\
\text{Water, } 100\ {}^{\circ}\mathrm{C} & 958.4 & 0.9584 & & \text{Liquid nitrogen, } - 196\ {}^{\circ}\mathrm{C} & 807 & 0.807 \\
\text{Ice, } 0\ {}^{\circ}\mathrm{C} & 916.7 & 0.917 & & \text{Gallium (liquid)} & 6{,}095 & 6.10
\end{array}
$$
**The number that floats ships and bursts pipes.** Water is **densest at $3.98\ {}^{\circ}\mathrm{C}$** and expands on cooling below that, so ice floats with about $8\ \%$ of its volume above fresh water and a lake freezes from the top down. **The same anomaly, in a full and sealed pipe left out in a frost, generates the $200\ \mathrm{MPa}$ that splits a copper joint** — the expansion on freezing is $9\ \%$ and water's bulk modulus is $2.2\ \mathrm{GPa}$, so $9\ \%$ of restraint is $200\ \mathrm{MPa}$, which is eight times the yield of annealed copper.
**Pressure is a scalar and stress is not.** At a point in a fluid **at rest** the normal stress is the same on every plane — this is the whole of Pascal's law and it is a consequence of there being no shear:
$$
\sum M_{\text{about a point}} \text{ on a fluid element} \ \Rightarrow \ p_x = p_y = p_z = p
$$
**The absolute, gauge and vacuum conventions.**
$$
p_{\mathrm{abs}} = p_{\mathrm{atm}} + p_{\mathrm{gauge}}, \qquad
p_{\mathrm{vac}} = p_{\mathrm{atm}} - p_{\mathrm{abs}}
$$
**The number that ruins more manometers than any other error.** A Bourdon gauge reads **gauge**; a barometer reads **absolute**; a McLeod or Pirani vacuum gauge reads **absolute**; and a $- 0.09\ \mathrm{MPa}$ gauge reading on a condenser is $0.011\ \mathrm{MPa}$ absolute, at which the water's saturation temperature is $48\ {}^{\circ}\mathrm{C}$ and not $100\ {}^{\circ}\mathrm{C}$.
:::

::: definition The continuum and the Knudsen number {#def-continuum}
**The continuum hypothesis.** A fluid is treated as a point-continuum when the volume over which a property is averaged is at once **vastly larger than the molecular mean free path cubed** and **vastly smaller than the engineering length scale**. The formal criterion is the **Knudsen number**
$$
\mathrm{Kn} = \frac{\lambda}{L}, \qquad
\lambda = \frac{k_B T}{\sqrt{2}\, \pi \sigma_m^{2} p} = \frac{\mu}{p} \sqrt{\frac{\pi R T}{2}}
$$
$$
\begin{array}{l c l}
\mathrm{Kn} < 10^{- 3} & \text{continuum, no slip} & \text{the Navier--Stokes equations with } u_{\mathrm{wall}} = 0 \\
10^{- 3} < \mathrm{Kn} < 0.1 & \text{slip flow} & \text{Navier--Stokes with a first-order slip condition} \\
0.1 < \mathrm{Kn} < 10 & \text{transition} & \text{Boltzmann or direct simulation Monte Carlo} \\
\mathrm{Kn} > 10 & \text{free molecular} & \text{collisions with the wall only}
\end{array}
$$
**The evaluation for air.** At $20\ {}^{\circ}\mathrm{C}$ and $101.325\ \mathrm{kPa}$ the mean free path is
$$
\lambda = \frac{1.815 \times 10^{- 5}}{101{,}325} \sqrt{\frac{\pi \times 287.05 \times 293.15}{2}}
= 1.791 \times 10^{- 10} \times 363.6 = 6.51 \times 10^{- 8}\ \mathrm{m} = 65\ \mathrm{nm}
$$
**The length scales this implies.**
$$
\begin{array}{l c c}
L & \mathrm{Kn} & \text{Regime} \\
1\ \mathrm{m} & 6.5 \times 10^{- 8} & \text{continuum} \\
1\ \mathrm{mm} & 6.5 \times 10^{- 5} & \text{continuum} \\
100\ \mu\mathrm{m} & 6.5 \times 10^{- 4} & \text{continuum, marginal} \\
10\ \mu\mathrm{m} & 0.0065 & \text{slip} \\
1\ \mu\mathrm{m} & 0.065 & \text{slip} \\
100\ \mathrm{nm} & 0.65 & \text{transition} \\
1\ \mathrm{mm}\ \text{at}\ 10^{- 3}\ \mathrm{kPa}\ \left( \text{vacuum chamber} \right) & 6.6 & \text{transition}
\end{array}
$$
**The number that decides whether a hard-disk read head's $12\ \mathrm{nm}$ flying height is an ordinary fluid-mechanics problem.** It is not — $\mathrm{Kn} = 65 / 12 = 5.4$ there, in the transition regime, and the Reynolds lubrication equation must be replaced by a rarefied-gas form derived from the Boltzmann equation. **The same arithmetic ($\mathrm{Kn} = 1.3$) says the air in a $50\ \mathrm{nm}$ MEMS gap is not a continuum.**
**The density check.** The continuum also requires that the averaging volume contain enough molecules: at $101\ \mathrm{kPa}$ and $293\ \mathrm{K}$, $1\ \mu\mathrm{m}^{3}$ of air holds
$$
n = \frac{p V}{k_B T} = \frac{101{,}325 \times 10^{- 18}}{1.381 \times 10^{- 23} \times 293.15} = 2.5 \times 10^{7}\ \text{molecules}
$$
which is ample; at $10^{- 3}\ \mathrm{kPa}$ it holds $2.5 \times 10^{2}$, and a "density" averaged over that is a statistical noise.
:::

::: definition Compressibility and the bulk modulus {#def-bulk}
$$
E_v = - V \frac{d p}{d V} = \rho \frac{d p}{d \rho} \quad \left[ \mathrm{Pa} \right], \qquad
\beta = \frac{1}{E_v} \quad \left[ \mathrm{Pa^{- 1}} \right], \qquad
c = \sqrt{\frac{E_v}{\rho}}
$$
**The bulk moduli, and the speed of sound they imply.**
$$
\begin{array}{l c c c}
\text{Fluid} & E_v\ (\mathrm{GPa}) & \beta\ (10^{- 12}\ \mathrm{Pa^{- 1}}) & c\ (\mathrm{m / s}) \\
\text{Water, } 20\ {}^{\circ}\mathrm{C} & 2.18 & 458 & 1{,}481 \\
\text{Water, } 80\ {}^{\circ}\mathrm{C} & 2.35 & 426 & 1{,}555 \\
\text{Seawater, } 20\ {}^{\circ}\mathrm{C} & 2.34 & 427 & 1{,}512 \\
\text{Mercury} & 28.5 & 35 & 1{,}451 \\
\text{SAE 30 oil, } 20\ {}^{\circ}\mathrm{C} & 1.40 & 714 & 1{,}254 \\
\text{Glycerin} & 4.47 & 224 & 1{,}883 \\
\text{Ethanol} & 1.06 & 943 & 1{,}159
\end{array}
$$
**The number that makes water "incompressible" and simultaneously the number that bursts a pipe.** A $1\ \mathrm{m^{3}}$ body of water under $10\ \mathrm{MPa}$ ($100\ \mathrm{bar}$) has contracted by
$$
\frac{\Delta V}{V} = \frac{\Delta p}{E_v} = \frac{10 \times 10^{6}}{2.18 \times 10^{9}} = 0.46\ \%
$$
**half a per cent at a hundred bar**, which is why a hydraulic system's response is soft at low pressure and why a $200\ \mathrm{bar}$ system's fluid **compressibility stores enough energy to matter** — a $10\ \mathrm{litre}$ accumulator volume at $200\ \mathrm{bar}$ holds
$$
U = \frac{\left( \Delta p \right)^{2}}{2 E_v} V = \frac{4 \times 10^{14}}{4.36 \times 10^{9}} \times 0.01 = 917\ \mathrm{J}
$$
which is a $94\ \mathrm{kg}$ mass falling one metre, and it is the energy that breaks a hose fitting.
**The entrained-air effect, which is the largest single correction in hydraulic practice.** Air at $1\ \mathrm{bar}$ has a bulk modulus of $0.1\ \mathrm{MPa}$ isothermally, and $1\ \%$ by volume of air bubbles in oil reduces the mixture's modulus to
$$
\frac{1}{E_m} = \frac{0.99}{1.40 \times 10^{9}} + \frac{0.01}{0.101 \times 10^{6}}
\quad \Rightarrow \quad E_m = 0.010\ \mathrm{GPa}
$$
**a factor of a hundred and forty reduction**, which is why a hydraulic press that has swallowed air is spongy, why its servo valves oscillate, and why every hydraulic manual has a bleeding procedure. **At this pressure as little as $0.007\ \%$ of free air halves the stiffness.**
**The water hammer that follows.** A valve closing faster than $2 L / c$ produces the **Joukowsky** pressure rise
$$
\Delta p = \rho c \, \Delta V
$$
For water at $2\ \mathrm{m / s}$ in a steel pipe, $\Delta p = 998 \times 1{,}481 \times 2 = 2.95\ \mathrm{MPa}$ — **$29\ \mathrm{bar}$ from $2\ \mathrm{m / s}$** — and the wave speed in an **elastic** pipe is lower,
$$
c^{\prime} = \frac{c}{\sqrt{1 + \dfrac{K D}{E t}}}
$$
For a $200\ \mathrm{mm}$ diameter, $6\ \mathrm{mm}$ wall ductile-iron main ($E = 110\ \mathrm{GPa}$) this is $c^{\prime} = 1{,}481 / \sqrt{1 + 2.18 \times 200 / \left( 110 \times 6 \right)} = 1{,}481 / 1.29 = 1{,}149\ \mathrm{m / s}$, and for a $200\ \mathrm{mm}$ PVC main it is **$420\ \mathrm{m / s}$**. **The plastic pipe is safer by a factor of three and the calculation that uses the free-water value is wrong by that factor.**
:::

::: widget plot
f: 1.481/sqrt(1+2.18*50/(x*6)); 1.481/sqrt(1+2.18*200/(x*6)); 1.481/sqrt(1+2.18*500/(x*6))
x: 1, 300
y: 0.15, 1.6
labels: D/t = 8; D/t = 33; D/t = 83
caption: The pressure-wave speed in metres per second divided by $1{,}000$, for water in a thin-walled pipe of diameter-to-thickness ratio $D / t$ as marked, against the pipe material's elastic modulus $E$ in gigapascals. On the middle curve the wave speed rises from $173\ \mathrm{m / s}$ at $E = 1\ \mathrm{GPa}$ (polyethylene) through $515\ \mathrm{m / s}$ at $10\ \mathrm{GPa}$ and $1{,}127\ \mathrm{m / s}$ at $100\ \mathrm{GPa}$ to $1{,}268\ \mathrm{m / s}$ at $200\ \mathrm{GPa}$ (steel), so a low-modulus pipe carries a far slower pressure wave. **The practical consequence is that a plastic distribution main is protected from water hammer by its own flexibility and a steel one is not**, and that the Joukowsky pressure rise $\rho c^{\prime} \Delta V$ must be computed with the **pipe's** wave speed and never with the $1{,}481\ \mathrm{m / s}$ of free water.
:::

## Viscosity

::: definition Newton's law of viscosity {#def-viscosity}
$$
\tau = \mu \frac{d u}{d y} \quad \left[ \mathrm{Pa} = \mathrm{N / m^{2}} \right], \qquad
\mu \ \left[ \mathrm{Pa \cdot s} \right] = \mathrm{kg / m \cdot s}, \qquad
\nu = \frac{\mu}{\rho} \ \left[ \mathrm{m^{2} / s} \right]
$$
**The dynamic and kinematic viscosities at $20\ {}^{\circ}\mathrm{C}$, $101.325\ \mathrm{kPa}$.**
$$
\begin{array}{l c c l c c}
\text{Fluid} & \mu\ (\mathrm{Pa \cdot s}) & \nu\ (\mathrm{m^{2} / s}) & & \text{Fluid} & \mu & \nu \\
\text{Hydrogen} & 8.8 \times 10^{- 6} & 1.05 \times 10^{- 4} & & \text{Water, } 20\ {}^{\circ}\mathrm{C} & 1.002 \times 10^{- 3} & 1.004 \times 10^{- 6} \\
\text{Air} & 1.815 \times 10^{- 5} & 1.509 \times 10^{- 5} & & \text{Water, } 80\ {}^{\circ}\mathrm{C} & 3.55 \times 10^{- 4} & 3.65 \times 10^{- 7} \\
\text{Carbon dioxide} & 1.48 \times 10^{- 5} & 8.1 \times 10^{- 6} & & \text{Mercury} & 1.55 \times 10^{- 3} & 1.15 \times 10^{- 7} \\
\text{Glycerin} & 1.41 & 1.12 \times 10^{- 3} & & \text{SAE 10W oil} & 0.085 & 9.6 \times 10^{- 5} \\
\text{Honey} & 10 & 7 \times 10^{- 3} & & \text{SAE 50 oil} & 0.54 & 6.1 \times 10^{- 4}
\end{array}
$$
**The two order-of-magnitude statements worth memorising.** Air's **dynamic** viscosity is **fifty-five times smaller** than water's, but its **kinematic** viscosity is **fifteen times larger**, because its density is a thousand times smaller.
**The temperature dependence, and the reason the two signs differ.** For a **gas**, viscosity is momentum transport across a molecular mean free path and rises with the molecular speed:
$$
\frac{\mu}{\mu_0} = \left( \frac{T}{T_0} \right)^{3 / 2} \frac{T_0 + S}{T + S}
\quad \text{(Sutherland, } S_{\mathrm{air}} = 110.4\ \mathrm{K},\ T_0 = 273.15\ \mathrm{K},\ \mu_0 = 1.716 \times 10^{- 5} \text{)}
$$
**The evaluation for air at $200\ {}^{\circ}\mathrm{C}$.**
$$
\mu = 1.716 \times 10^{- 5} \times \left( \frac{473.15}{273.15} \right)^{1.5} \times \frac{383.55}{583.55}
= 1.716 \times 10^{- 5} \times 2.280 \times 0.6573 = 2.57 \times 10^{- 5}\ \mathrm{Pa \cdot s}
$$
**a $42\ \%$ increase over the $20\ {}^{\circ}\mathrm{C}$ value of $1.815 \times 10^{- 5}$**, and the power-law approximation $\mu / \mu_0 = \left( T / T_0 \right)^{0.7}$ gives $\left( 473 / 293 \right)^{0.7} = 1.40$ against Sutherland's $1.42$ — **within $1.5\ \%$ over a $180\ \mathrm{K}$ range**, which is why the power law appears in every preliminary design and Sutherland in every property code.
For a **liquid**, viscosity is the rate at which molecules jump out of a potential well and falls as the Arrhenius factor:
$$
\mu = A \exp \left( \frac{B}{T} \right), \qquad
B = \frac{E_a}{R}
$$
**The evaluation for water.** With $\mu \left( 20 \right) = 1.002 \times 10^{- 3}$ and $\mu \left( 80 \right) = 3.55 \times 10^{- 4}$:
$$
B = \frac{\ln \left( 1.002 / 0.355 \right)}{1 / 293.15 - 1 / 353.15} = \frac{1.038}{5.80 \times 10^{- 4}} = 1{,}790\ \mathrm{K}, \qquad E_a = 14.9\ \mathrm{kJ / mol}
$$
**The number that sizes a lubrication system.** Water's viscosity **halves roughly every $40\ \mathrm{K}$** between $20$ and $80\ {}^{\circ}\mathrm{C}$; SAE 40 engine oil's falls by a factor of about **thirty-five** between $20$ and $100\ {}^{\circ}\mathrm{C}$, which is why a cold morning start wears more than an hour at cruising speed and why the **viscosity index** of an oil — the number that says how flat its curve is — is on every drum.
**The pressure correction.** For a mineral oil, $\mu$ roughly **doubles every $30$ to $40\ \mathrm{MPa}$** (a Barus pressure-viscosity coefficient of about $2 \times 10^{- 8}\ \mathrm{Pa^{- 1}}$), so a $350\ \mathrm{bar}$ hydraulic system's oil is **about twice as viscous** at the pump outlet as in the tank. For a gas the pressure dependence is negligible below $10\ \mathrm{bar}$, because $\mu = \tfrac{1}{3} \rho \bar{c} \lambda$ has $\rho \lambda$ independent of pressure.
:::

::: definition The no-slip condition and a viscometer {#def-viscometer}
**The four classical geometries, all of which reduce to measuring a torque.**
$$
\begin{array}{l l l}
\text{Couette (rotating cylinder)} & T = \dfrac{4 \pi \mu \Omega R_i^{2} R_o^{2} L}{R_o^{2} - R_i^{2}} & \text{the standard for } 10^{- 4} \text{ to } 10^{2}\ \mathrm{Pa \cdot s} \\[6pt]
\text{Cone and plate} & T = \dfrac{2 \pi \mu \Omega R^{3}}{3 \psi} & \text{uniform shear, the rheometer default} \\[6pt]
\text{Parallel plate} & T = \dfrac{\pi \mu \Omega R^{4}}{2 h} & \text{suspensions and pastes} \\[6pt]
\text{Capillary (Poiseuille)} & \Delta p = \dfrac{8 \mu Q L}{\pi R^{4}} & \text{the Ostwald and Ubbelohde tube}
\end{array}
$$
**The evaluation for a Couette viscometer.** $R_i = 20\ \mathrm{mm}$, $R_o = 21\ \mathrm{mm}$, $L = 60\ \mathrm{mm}$, $\Omega = 10\ \mathrm{rad / s}$, oil $\mu = 0.1\ \mathrm{Pa \cdot s}$:
$$
T = \frac{4 \pi \times 0.1 \times 10 \times 4 \times 10^{- 4} \times 4.41 \times 10^{- 4} \times 0.06}{4.41 \times 10^{- 4} - 4 \times 10^{- 4}}
= \frac{1.330 \times 10^{- 7}}{4.1 \times 10^{- 5}} = 3.24 \times 10^{- 3}\ \mathrm{N \cdot m}
$$
**a $3.2\ \mathrm{mN \cdot m}$ torque**, which is measurable to $1\ \%$ with a modest transducer — and the geometry's gap must be **small** so that the shear rate is nearly uniform: across a $1\ \mathrm{mm}$ gap on a $20\ \mathrm{mm}$ bob it varies by $10\ \%$ (the ratio $R_o^{2} / R_i^{2}$), and across a $10\ \mathrm{mm}$ gap by a factor of $2.25$, which makes a non-Newtonian reading ambiguous.
**The end correction that ruins careless work.** The bottom of the bob drags on the fluid below it, contributing a torque of order $\mu \Omega R_i^{4} / h_b$ which for the geometry above with a $1\ \mathrm{mm}$ bottom gap is $1.6 \times 10^{- 4}\ \mathrm{N \cdot m}$ ($\pi / 2$ times that, $2.5 \times 10^{- 4}$, for a flat disc) — **$5$ to $8\ \%$ of the signal**. Every real Couette instrument either **guards** the end with a co-rotating plate or applies a **bottom-end** correction determined from a calibration fluid of known viscosity, and a home-built one that does neither is in error by that much.
**The Reynolds number of the measurement itself.** A rotational viscometer is only valid while the flow in the gap is laminar, which for the geometry above at $\Omega = 10\ \mathrm{rad / s}$ gives
$$
\mathrm{Re} = \frac{\rho \Omega R_i \left( R_o - R_i \right)}{\mu} = \frac{891 \times 10 \times 0.02 \times 0.001}{0.1} = 1.78
$$
comfortably laminar; at $\Omega = 1{,}000\ \mathrm{rad / s}$ it is $178$, just below the onset of Taylor vortices at $\mathrm{Re} \approx 41.3 \sqrt{R_i / \left( R_o - R_i \right)} \approx 185$, beyond which the torque rises and the instrument reads a viscosity the fluid does not have.
:::

::: definition Non-Newtonian behaviour {#def-nonnewton}
$$
\begin{array}{l l l l}
\text{Model} & \text{Equation} & \text{Examples} & \text{Why it matters} \\
\text{Newtonian} & \tau = \mu \dot{\gamma} & \text{water, air, oils, alcohol} & \text{the reference} \\
\text{Power law (Ostwald)} & \tau = K \dot{\gamma}^{n} & \text{paint, blood, polymer melts} & n < 1 \text{ shear-thinning} \\
\text{Bingham plastic} & \tau = \tau_y + \mu_p \dot{\gamma} & \text{toothpaste, mud, mayonnaise} & \text{a yield stress} \\
\text{Herschel--Bulkley} & \tau = \tau_y + K \dot{\gamma}^{n} & \text{drilling mud, ketchup, sludge} & \text{both at once} \\
\text{Shear thickening} & n > 1 & 50\ \%\ \text{cornflour in water} & \text{oobleck, shear-thickening armour} \\
\text{Thixotropic} & \mu = \mu \left( t \right) \text{ at fixed } \dot{\gamma} & \text{yoghurt, gels, some paints} & \text{time-dependent} \\
\text{Viscoelastic} & \text{normal stresses, die swell} & \text{molten plastic, mucus} & \text{memory effects}
\end{array}
$$
**The power-law evaluation.** A paint with $K = 5\ \mathrm{Pa \cdot s^{n}}$, $n = 0.4$ has an apparent viscosity
$$
\mu_{\mathrm{app}} = K \dot{\gamma}^{\,n - 1} = 5\, \dot{\gamma}^{- 0.6}
= \begin{cases}
79.2\ \mathrm{Pa \cdot s} & \dot{\gamma} = 0.01\ \mathrm{s^{- 1}} \ \text{(sagging on the wall)} \\
0.315\ \mathrm{Pa \cdot s} & \dot{\gamma} = 100\ \mathrm{s^{- 1}} \ \text{(brushing)} \\
0.0199\ \mathrm{Pa \cdot s} & \dot{\gamma} = 10^{4}\ \mathrm{s^{- 1}} \ \text{(spraying)}
\end{cases}
$$
**a factor of about $4{,}000$ between the spray gun and the wall**, and that factor **is the product specification**: a paint must be thin enough to atomise at $10^{4}\ \mathrm{s^{- 1}}$ and thick enough not to sag at $10^{- 2}\ \mathrm{s^{- 1}}$, and paint formulation is largely the choice of a strongly shear-thinning $n$ with the right $K$.
**The yield stress, and the number that decides whether a tank will drain.** A Bingham fluid in a pipe will **not flow at all** unless the wall shear exceeds the yield stress, which requires a pressure gradient
$$
\frac{\Delta p}{L} > \frac{2 \tau_y}{R}
$$
For toothpaste ($\tau_y \approx 50\ \mathrm{Pa}$) in a $5\ \mathrm{mm}$ diameter tube the threshold is $40\ \mathrm{kPa / m}$; for a **kaolin sludge** ($\tau_y \approx 30\ \mathrm{Pa}$) in a $100\ \mathrm{mm}$ diameter drain it is $1{,}200\ \mathrm{Pa / m}$, and a drain laid at a gradient flatter than that **holds its content solid forever** and must be jetted. **The most common non-Newtonian design failure is a drain that works when new and silts up in a year because the yield stress was ignored.**
**The dimensionless numbers that classify the departure from Newtonian.**
$$
\mathrm{De} = \frac{\lambda_f}{t_{\mathrm{obs}}} \quad \text{(Deborah number)}, \qquad
\mathrm{Wi} = \lambda_f \dot{\gamma} \quad \text{(Weissenberg number)}
$$
$$
\begin{array}{l c c l}
\text{Fluid} & \lambda_f & \lambda_f \dot{\gamma} \text{ at } \dot{\gamma} = 100\ \mathrm{s^{- 1}} & \text{Behaviour} \\
\text{Water} & 10^{- 12}\ \mathrm{s} & 10^{- 10} & \text{Newtonian} \\
\text{Air} & 10^{- 10}\ \mathrm{s} & 10^{- 8} & \text{Newtonian} \\
\text{Engine oil} & 10^{- 8}\ \mathrm{s} & 10^{- 6} & \text{Newtonian} \\
\text{Silicone oil, } 10^{3}\ \mathrm{cSt} & 10^{- 5}\ \mathrm{s} & 10^{- 3} & \text{Newtonian} \\
\text{Polyacrylamide solution} & 0.1\ \mathrm{s} & 10 & \text{viscoelastic, rod climbing} \\
\text{Polymer melt} & 1\ \text{to}\ 10\ \mathrm{s} & 10^{2} \text{ to } 10^{3} & \text{die swell, melt fracture}
\end{array}
$$
**The Deborah number is the reason "everything is fluid" is a joke with a serious core.** Pitch flows — the Pitch Drop experiment at the University of Queensland has run since **1927** and produced its ninth drop in **2014**, and its drops give a viscosity of about $2 \times 10^{8}\ \mathrm{Pa \cdot s}$ — and pitch is **elastic** enough to shatter when struck with a hammer. **Whether a material is a fluid depends on the observation time, and the Deborah number is the ratio.**
:::

## Surface tension and vapour pressure

::: definition Surface tension and capillarity {#def-surface}
$$
\sigma \ \left[ \mathrm{N / m} \right] = \left[ \mathrm{J / m^{2}} \right], \qquad
\Delta p = \sigma \left( \frac{1}{R_1} + \frac{1}{R_2} \right) \quad \text{(Young--Laplace)}
$$
$$
\Delta p_{\text{droplet}} = \frac{4 \sigma}{D}, \qquad
\Delta p_{\text{bubble}} = \frac{8 \sigma}{D}, \qquad
\Delta p_{\text{cylindrical jet}} = \frac{\sigma}{R}
$$
**The surface tensions against a vapour, at $20\ {}^{\circ}\mathrm{C}$ unless noted.**
$$
\begin{array}{l c l c}
\text{Benzene} & 28.9 & \text{Water, } 20\ {}^{\circ}\mathrm{C} & 72.8 \ \mathrm{mN / m} \\
\text{Water, } 100\ {}^{\circ}\mathrm{C} & 58.9 & \text{Water, } 0\ {}^{\circ}\mathrm{C} & 75.6 \\
\text{Ethanol} & 22.3 & \text{Methanol} & 22.6 \\
\text{Glycerin} & 63.4 & \text{Mercury, } 20\ {}^{\circ}\mathrm{C} & 484 \\
\text{SAE 30 oil} & 32 & \text{Liquid nitrogen, } - 196\ {}^{\circ}\mathrm{C} & 8.9 \\
\text{Soap solution} & 25 \text{ to } 35 & \text{Liquid hydrogen, } - 253\ {}^{\circ}\mathrm{C} & 2.0
\end{array}
$$
**The number that makes soldering, painting and printing the same problem.** Water on clean glass has a contact angle of $0$ to $20^{\circ}$ and wets; on a waxed or oily surface it is $100$ to $110^{\circ}$ and beads. **The whole of a "cleanliness specification" before bonding, coating or vacuum sealing is a statement about the contact angle**, and the standard test is a drop whose measured angle must exceed or fall below a number.
**The capillary rise.** A liquid of contact angle $\theta$ in a circular tube of diameter $D$ rises
$$
h = \frac{4 \sigma \cos \theta}{\rho g D}
$$
**The evaluation for water in a $1\ \mathrm{mm}$ glass tube**, $\theta = 0$:
$$
h = \frac{4 \times 0.0728}{998 \times 9.807 \times 0.001} = 29.8\ \mathrm{mm}
$$
**and for mercury in the same tube**, $\theta = 140^{\circ}$:
$$
h = \frac{4 \times 0.484 \times \left( - 0.766 \right)}{13{,}546 \times 9.807 \times 0.001} = - 11.2\ \mathrm{mm}
$$
**The number that appears in every civil-engineering textbook and is wrong in every building.** The rise of water in **concrete** or **brick** is capillary and reaches **metres**, because the pore diameters are $0.1$ to $1\ \mu\mathrm{m}$ and $h \propto 1 / D$: at $D = 1\ \mu\mathrm{m}$ the rise is $29.8\ \mathrm{m}$. **Damp-proof courses exist because of this formula, and a building with a bridged DPC is a $10$-metre capillary column in a wall.**
**The Bond number, which says when to stop worrying.**
$$
\mathrm{Bo} = \frac{\rho g L^{2}}{\sigma}, \qquad \mathrm{Bo} = 1 \ \text{at} \ L = \sqrt{\frac{\sigma}{\rho g}} = \ell_c
$$
$$
\begin{array}{l c c}
\text{Fluid} & \ell_c\ (\mathrm{mm}) & \text{Meaning} \\
\text{Water, } 20\ {}^{\circ}\mathrm{C} & 2.73 & \text{drops larger than about } 5\ \mathrm{mm} \text{ are flattened} \\
\text{Mercury} & 1.91 & \text{beads wider than about } 4\ \mathrm{mm} \text{ spread into puddles} \\
\text{Ethanol} & 1.70 & \text{ethanol makes small drops} \\
\text{Liquid hydrogen} & 1.7 & \text{low } \sigma \text{ offset by low density} \\
\text{Soap solution} & 1.6 \text{ to } 1.9 & \text{foams are stable below this scale}
\end{array}
$$
**The number that decides a raindrop's shape.** A raindrop of diameter $1\ \mathrm{mm}$ has $\mathrm{Bo} = 0.13$ and is a **sphere**; at $4\ \mathrm{mm}$, $\mathrm{Bo} = 2.2$ and it is flattened underneath into a **hamburger-bun** shape; drops much above $5\ \mathrm{mm}$ break up by blowing into a **bag** (parachute) that bursts, and the largest observed are about $8$ to $10\ \mathrm{mm}$. **The "teardrop" shape is a drawing convention and no raindrop has ever had one.**
:::

::: definition Vapour pressure and cavitation {#def-vapour}
$$
p_v \left( T \right) \quad \text{(saturation pressure)}, \qquad
p_{\mathrm{local}} < p_v \ \Rightarrow \ \text{vapour forms}
$$
**The vapour pressures of water.**
$$
\begin{array}{l c c c c}
T\ ({}^{\circ}\mathrm{C}) & p_v\ (\mathrm{kPa}) & & T\ ({}^{\circ}\mathrm{C}) & p_v\ (\mathrm{kPa}) \\
0 & 0.6117 & & 60 & 19.95 \\
10 & 1.228 & & 70 & 31.20 \\
20 & 2.339 & & 80 & 47.41 \\
30 & 4.247 & & 90 & 70.18 \\
40 & 7.384 & & 100 & 101.33 \\
50 & 12.35 & & 120 & 198.7
\end{array}
$$
**The number that doubles about every $15\ \mathrm{K}$ and ruins pumps.** The **net positive suction head available** is
$$
\mathrm{NPSH_A} = \frac{p_{\mathrm{surface}} - p_v}{\rho g} \pm z - h_f
$$
with $z$ positive for a flooded suction and negative for a lift, and a pump's **required** $\mathrm{NPSH_R}$ must be exceeded by it with a margin of **$0.5$ to $1\ \mathrm{m}$**.
**The evaluation.** A pump taking water from an **open tank at $80\ {}^{\circ}\mathrm{C}$**, with the surface $2\ \mathrm{m}$ above the impeller and $0.6\ \mathrm{m}$ of suction friction:
$$
\mathrm{NPSH_A} = \frac{101{,}325 - 47{,}410}{972 \times 9.807} + 2.0 - 0.6 = 5.66 + 1.4 = 7.06\ \mathrm{m}
$$
**against $10.11 + 1.4 = 11.5\ \mathrm{m}$ if the same pump and tank were at $20\ {}^{\circ}\mathrm{C}$** — the hot water has eaten **$4.5\ \mathrm{m}$** of the suction head, and a pump selected on cold-water data cavitates.
**The cavitation number.**
$$
\mathrm{Ca} = \frac{p_{\mathrm{ref}} - p_v}{\tfrac{1}{2} \rho V^{2}}, \qquad
\text{cavitation where } \mathrm{Ca} < - C_{p,\min}
$$
A propeller tip at $V = 25\ \mathrm{m / s}$ in water at $20\ {}^{\circ}\mathrm{C}$, with a local peak coefficient of $C_p = - 6$ and a static head of $20\ \mathrm{m}$:
$$
p_{\mathrm{local}} = 297{,}000 - 6 \times 0.5 \times 998 \times 625 = 297{,}000 - 1{,}871{,}000 = - 1.57\ \mathrm{MPa}
$$
**which is impossible**: equivalently $\mathrm{Ca} = 294{,}700 / 311{,}900 = 0.94$, far below $- C_{p,\min} = 6$, so the flow cavitates — and the tip must be slowed, the submergence deepened, or the blade section re-profiled. **Marine propellers are designed against cavitation first and efficiency second.**
**The collapse that does the damage.** A vapour bubble swept into liquid at $p > p_v$ collapses violently (Rayleigh's analysis of 1917), and the micro-jets and shock waves of the collapse produce impact pressures on a nearby wall of hundreds of megapascals, up to about **$1\ \mathrm{GPa}$** — enough to pit hardened stainless steel. **A cavitation-eroded impeller looks like a casting full of pinholes**, and the diagnosis is confirmed by the fact that the pitting is on the **suction** side and stops when the flow rate is reduced.
:::

## Worked cases

::: example A bearing's drag {#ex-bearing}
A shaft of $80\ \mathrm{mm}$ diameter and $120\ \mathrm{mm}$ length runs in a bearing with a diametral clearance of $0.08\ \mathrm{mm}$ at $1{,}450\ \mathrm{rev / min}$, with SAE 30 oil at $60\ {}^{\circ}\mathrm{C}$ $\left( \mu = 0.02\ \mathrm{Pa \cdot s} \right)$. Find the friction torque, the power loss and the film's shear rate.
::: solution
**The Couette approximation.** The film is $c = 0.04\ \mathrm{mm}$ against an $R = 40\ \mathrm{mm}$ radius, so $c / R = 10^{- 3}$ and the curvature and the pressure gradient may be neglected for a first estimate:
$$
\dot{\gamma} = \frac{U}{c} = \frac{\Omega R}{c}
= \frac{151.8 \times 0.040}{4 \times 10^{- 5}} = 1.518 \times 10^{5}\ \mathrm{s^{- 1}}
$$
**The shear stress.**
$$
\tau = \mu \dot{\gamma} = 0.02 \times 1.518 \times 10^{5} = 3{,}036\ \mathrm{Pa}
$$
**The torque.**
$$
T = \tau \times \left( 2 \pi R L \right) \times R
= 3{,}036 \times \left( 2 \pi \times 0.040 \times 0.120 \right) \times 0.040
= 3{,}036 \times 0.03016 \times 0.040 = 3.66\ \mathrm{N \cdot m}
$$
**The power.**
$$
\dot{W} = T \Omega = 3.66 \times 151.8 = 556\ \mathrm{W}
$$
**The reading.** **More than half a kilowatt of friction in a bearing the size of a fist**, all of it appearing as heat in the $1.2\ \mathrm{cm^{3}}$ of oil in the film. The volumetric flow that the shaft drags around the film is
$$
\dot{Q} \approx \tfrac{1}{2} U c L = \tfrac{1}{2} \times 6.07 \times 4 \times 10^{- 5} \times 0.120
= 1.46 \times 10^{- 5}\ \mathrm{m^{3} / s} = 14.6\ \mathrm{cm^{3} / s}
$$
and if that circulating oil carried all the heat away in a single pass it would warm by
$$
\Delta T = \frac{556}{\dot{m} c_p} = \frac{556}{1.46 \times 10^{- 5} \times 891 \times 1{,}900} = 22.5\ \mathrm{K}
$$
per pass — and because the same oil keeps recirculating, its temperature would climb pass after pass. That is why a hydrodynamic bearing must be **fed** a continuous through-flow of cool oil, and why the oil-supply rate is a design parameter and not a detail.
*Sanity.* The shear rate of $1.5 \times 10^{5}\ \mathrm{s^{- 1}}$ is high enough that a **non-Newtonian** oil (a multigrade with a polymer thickener) is **shear-thinning** here, and the effective viscosity in the film is $15$ to $25\ \%$ below the viscometer value at $10^{3}\ \mathrm{s^{- 1}}$. **A multigrade 10W-40 loses part of its "40" in a high-shear bearing**, which is why engine-oil specifications quote a **high-temperature high-shear** viscosity at $150\ {}^{\circ}\mathrm{C}$ and $10^{6}\ \mathrm{s^{- 1}}$ and not the $100\ {}^{\circ}\mathrm{C}$ kinematic figure.
:::
:::

::: example A capillary inkjet {#ex-inkjet}
A piezoelectric inkjet nozzle of $30\ \mu\mathrm{m}$ diameter and $120\ \mu\mathrm{m}$ length fires drops of $50\ \mu\mathrm{m}$ diameter. The ink has $\rho = 1{,}050\ \mathrm{kg / m^{3}}$, $\mu = 2.5 \times 10^{- 3}\ \mathrm{Pa \cdot s}$, $\sigma = 0.032\ \mathrm{N / m}$. Find the pressure needed, the Reynolds and Ohnesorge numbers, and whether the ink will satellite.
::: solution
**The Laplace pressure the piezo must beat.**
$$
\Delta p_{\sigma} = \frac{4 \sigma}{D} = \frac{4 \times 0.032}{30 \times 10^{- 6}} = 4{,}267\ \mathrm{Pa}
$$
**The viscous loss in the nozzle**, treating it as a short capillary with an entrance correction:
$$
\Delta p_{\mu} = \frac{32 \mu U L}{D^{2}}, \qquad U = \frac{\dot{Q}}{\pi D^{2} / 4}
$$
For a drop of $50\ \mu\mathrm{m}$ diameter ejected in $10\ \mu\mathrm{s}$, $\dot{Q} = 6.5 \times 10^{- 14} / 10^{- 5} = 6.5 \times 10^{- 9}\ \mathrm{m^{3} / s}$ and
$$
U = \frac{6.5 \times 10^{- 9}}{7.07 \times 10^{- 10}} = 9.2\ \mathrm{m / s}, \qquad
\Delta p_{\mu} = \frac{32 \times 2.5 \times 10^{- 3} \times 9.2 \times 1.2 \times 10^{- 4}}{9 \times 10^{- 10}} = 98{,}100\ \mathrm{Pa}
$$
**The inertia term.**
$$
\Delta p_{\rho} = \tfrac{1}{2} \rho U^{2} = 0.5 \times 1{,}050 \times 84.6 = 44{,}400\ \mathrm{Pa}
$$
**The total, with an entry correction of about half a velocity head folded into the inertia term:**
$$
\Delta p \approx 44{,}400 + 98{,}100 + 4{,}267 = 146{,}800\ \mathrm{Pa} \approx 1.5\ \mathrm{bar}
$$
**The number that makes piezo inkjets a $1\ \mathrm{bar}$ technology.** A piezoelectric stack in oil can deliver several bar, so the actuation is easy; **the difficulty is the waveform**, because the same pressure pulse that ejects one clean drop will, if mistimed, eject a drop with a trailing ligament.
**The Reynolds number in the nozzle.**
$$
\mathrm{Re} = \frac{\rho U D}{\mu} = \frac{1{,}050 \times 9.2 \times 30 \times 10^{- 6}}{2.5 \times 10^{- 3}} = 116
$$
**The Ohnesorge number, which decides whether the drop is clean.**
$$
\mathrm{Oh} = \frac{\mu}{\sqrt{\rho \sigma D}} = \frac{2.5 \times 10^{- 3}}{\sqrt{1{,}050 \times 0.032 \times 50 \times 10^{- 6}}}
= \frac{2.5 \times 10^{- 3}}{4.10 \times 10^{- 2}} = 0.061
$$
$$
\begin{array}{l l}
\mathrm{Oh} < 0.01 & \text{many satellites, ligament breaks up into a spray} \\
0.01 < \mathrm{Oh} < 0.1 & \text{one main drop with one or two small satellites} \\
0.1 < \mathrm{Oh} < 1 & \text{clean single drop, no satellites} \\
\mathrm{Oh} > 1 & \text{no pinch-off; the filament retracts}
\end{array}
$$
**The ink at $\mathrm{Oh} = 0.061$ will satellite**, and the fix is either to raise the viscosity to $4.5 \times 10^{- 3}\ \mathrm{Pa \cdot s}$ (which brings $\mathrm{Oh}$ to $0.11$) or to use a **dwell-time-and-suction** waveform that pulls the meniscus back before the ligament thins. **Every ink formulation is a fight to reach $\mathrm{Oh} \approx 0.15$ while staying thin enough to refill the chamber between $20\ \mathrm{kHz}$ pulses.**
*Sanity.* The ratio of the viscous to the inertial term should be $64 \left( L / D \right) / \mathrm{Re} = 64 \times 4 / 116 = 2.2$, and indeed $98.1 / 44.4 = 2.2$. The surface tension's $4.3\ \mathrm{kPa}$ is small against both because the Weber number
$$
\mathrm{We} = \frac{\rho U^{2} D}{\sigma} = \frac{1{,}050 \times 84.6 \times 30 \times 10^{- 6}}{0.032} = 83
$$
is far above unity, so the jet is **inertia-dominated at ejection and surface-tension-dominated in flight** — the drop forms by inertia and then rounds itself by capillarity, and the $50\ \mu\mathrm{m}$ final diameter is set by the **volume ejected** and not by the nozzle.
:::
:::

::: example Water hammer in a pump trip {#ex-hammer}
A $600\ \mathrm{mm}$ ductile-iron water main, $6\ \mathrm{mm}$ wall, $1{,}800\ \mathrm{m}$ long, carries $0.55\ \mathrm{m^{3} / s}$ and its pump trips. Find the wave speed, the Joukowsky downsurge, whether the column separates, and the protection required.
::: solution
**The wave speed.**
$$
c^{\prime} = \frac{1{,}481}{\sqrt{1 + \dfrac{2.18 \times 10^{9} \times 0.600}{110 \times 10^{9} \times 0.006}}}
= \frac{1{,}481}{\sqrt{1 + 1.982}} = \frac{1{,}481}{1.727} = 858\ \mathrm{m / s}
$$
**The pipeline period**, which decides whether the closure is "rapid":
$$
T_p = \frac{2 L}{c^{\prime}} = \frac{2 \times 1{,}800}{858} = 4.20\ \mathrm{s}
$$
**The velocity.**
$$
V = \frac{0.55}{\pi \times 0.300^{2}} = 1.95\ \mathrm{m / s}
$$
**The Joukowsky downsurge at the pump.** A pump trip is a **deceleration over several seconds**, and the pump's own inertia gives a stop time of $5$ to $15\ \mathrm{s}$ for a large machine — **longer than $T_p$**, so the closure is **slow** and the surge is a fraction of Joukowsky:
$$
\Delta p_{\mathrm{full}} = \rho c^{\prime} V = 998 \times 858 \times 1.95 = 1.67\ \mathrm{MPa} \quad \left( 170\ \mathrm{m} \right)
$$
With a linear deceleration over $t_{\mathrm{stop}} = 15\ \mathrm{s}$ and $T_p = 4.2\ \mathrm{s}$, **Michaud**'s formula $\Delta h = 2 L V / \left( g\, t_{\mathrm{stop}} \right)$ gives $\Delta h / h_{\mathrm{Jouk}} = T_p / t_{\mathrm{stop}} = 4.2 / 15 = 0.28$:
$$
\Delta p = 0.28 \times 1.67 = 0.47\ \mathrm{MPa} \quad \left( 48\ \mathrm{m} \right)
$$
**The column-separation check.** The static pressure at the pump discharge is $0.7\ \mathrm{MPa}$ ($71\ \mathrm{m}$) and the vapour pressure head is $- 10.2\ \mathrm{m}$ gauge, so the downsurge of $48\ \mathrm{m}$ leaves $23\ \mathrm{m}$ — **no separation at the pump**. But at a **high point** where the static gauge pressure is only $18\ \mathrm{m}$, a $48\ \mathrm{m}$ downsurge **drives it below vapour pressure**: the column separates, the two columns rejoin with a relative velocity of the order of the original flow velocity, and the resulting upsurge is
$$
\Delta p = \rho c^{\prime} \Delta V = 998 \times 858 \times 1.95 = 1.67\ \mathrm{MPa} \quad \left( 170\ \mathrm{m} \right)
$$
**— the full Joukowsky rise that the slow stop was supposed to avoid, added to the line pressure.** Column separation is the mechanism behind most "impossible" main bursts, and it is invisible to a software model that does not solve the vapour cavity.
**The protection.**
$$
\begin{array}{l l l}
\text{Air vessel} & \text{a } 10\ \mathrm{m^{3}} \text{ bladder vessel at the pump} & \text{handles the first } 20\ \mathrm{s} \text{ and the reflection} \\
\text{Surge tower} & \text{an open tower at the high point} & \text{admits air before separation, the cheapest fix} \\
\text{Surge-relief valve} & \text{set } 10\ \% \text{ above working} & \text{protects against the upsurge, not the downsurge} \\
\text{Non-slam check valve} & \text{a spring-assisted disc} & \text{prevents the reverse-flow slam at } t \approx 12\ \mathrm{s} \\
\text{Two-speed valve closure} & \text{fast for } 10\ \% \text{, slow thereafter} & \text{only helps if the valve is the cause}
\end{array}
$$
**The number that decides the design.** The **reverse flow** begins at $t \approx 2 T_p = 8.4\ \mathrm{s}$ and the check valve slams at $t \approx 12$ to $20\ \mathrm{s}$; a **non-slam** valve costs a small fraction of an air vessel and prevents the second transient, and the combination is standard practice.
*Sanity.* The reason the wave speed is $858\ \mathrm{m / s}$ and not $1{,}481$ is the pipe's elasticity, and the reason the entrained-air correction is **not** applied is that a well-vented main holds less than $0.1\ \%$ free gas. **At $1\ \%$ free gas the wave speed falls to $300\ \mathrm{m / s}$ and the Joukowsky surge falls by a factor of three** — which is why an old main that has been drained and refilled surges violently on its first pump start, and why the commissioning procedure vents at every high point.
:::
:::

::: example A sludge pipeline {#ex-sludge}
A $150\ \mathrm{mm}$ diameter, $400\ \mathrm{m}$ long pipeline carries a digested sewage sludge with a yield stress of $25\ \mathrm{Pa}$, a plastic viscosity of $0.30\ \mathrm{Pa \cdot s}$ and a density of $1{,}040\ \mathrm{kg / m^{3}}$ at $0.030\ \mathrm{m^{3} / s}$. Find the pressure drop, the size of the plug core, and the pressure below which the line will not flow at all.
::: solution
**The mean velocity and the apparent shear rate.**
$$
V = \frac{0.030}{\pi \times 0.075^{2}} = 1.698\ \mathrm{m / s}, \qquad
\dot{\gamma}_{\mathrm{app}} = \frac{8 V}{D} = \frac{8 \times 1.698}{0.150} = 90.5\ \mathrm{s^{- 1}}
$$
**The Buckingham–Reiner relation** for a Bingham plastic in a pipe, with $\kappa = \tau_y / \tau_w$:
$$
Q = \frac{\pi R^{3} \tau_w}{4 \mu_p} \left[ 1 - \frac{4}{3} \kappa + \frac{1}{3} \kappa^{4} \right]
$$
**The evaluation.** Substituting and multiplying through by $4 \mu_p / \left( \pi R^{3} \right)$ turns the bracket into a polynomial in $\tau_w$:
$$
\tau_w - \frac{4 \tau_y}{3} + \frac{\tau_y^{4}}{3 \tau_w^{3}} = \frac{4 \mu_p Q}{\pi R^{3}}
= \frac{4 \times 0.30 \times 0.030}{\pi \times 4.219 \times 10^{- 4}} = 27.16\ \mathrm{Pa}
$$
$$
f \left( \tau_w \right) = \tau_w - 33.33 + \frac{1.302 \times 10^{5}}{\tau_w^{3}} = 27.16
$$
by trial: $\tau_w = 50$ gives $50 - 33.33 + 1.04 = 17.7$; $\tau_w = 55$ gives $22.7$; $\tau_w = 59.9$ gives $27.2$. **$\tau_w = 59.9\ \mathrm{Pa}$**.
**The plug core.** The fluid yields only where the local shear stress exceeds $\tau_y$, out to a radius
$$
r_0 = \frac{\tau_y}{\tau_w} R = \frac{25}{59.9} \times 0.075 = 0.0313\ \mathrm{m}
$$
so **$42\ \%$ of the radius is a solid plug** moving at a uniform velocity and the velocity profile is a flat-topped bullet.
**The pressure drop and the power.**
$$
\Delta p = \frac{4 \tau_w L}{D} = \frac{4 \times 59.9 \times 400}{0.150} = 639{,}000\ \mathrm{Pa} = 6.39\ \mathrm{bar}
$$
$$
\dot{W} = \frac{\Delta p \dot{Q}}{\eta} = \frac{639{,}000 \times 0.030}{0.65} = 29.5\ \mathrm{kW}
$$
**The comparison with a Newtonian fluid of the same plastic viscosity.**
$$
\tau_{w,\,N} = \mu_p \dot{\gamma}_{\mathrm{app}} = 0.30 \times 90.5 = 27.2\ \mathrm{Pa}, \qquad
\Delta p_N = 2.90\ \mathrm{bar}
$$
**The yield stress has more than doubled the pumping power**, and the $2.2×$ factor is the number a sludge-pump quotation turns on.
**The flow regime.** The apparent viscosity and the Metzner–Reed Reynolds number are
$$
\mu_{\mathrm{app}} = \frac{\tau_w}{\dot{\gamma}_{\mathrm{app}}} = \frac{59.9}{90.5} = 0.662\ \mathrm{Pa \cdot s}, \qquad
\mathrm{Re}_{\mathrm{MR}} = \frac{\rho V D}{\mu_{\mathrm{app}}} = \frac{1{,}040 \times 1.698 \times 0.150}{0.662} = 400
$$
**firmly laminar**, and it stays laminar to a velocity of $8.9\ \mathrm{m / s}$ — a Bingham line at ordinary duty is a laminar line.
**The threshold, which is a pressure gradient and not a flow rate.** No motion is possible unless the wall shear exceeds the yield stress, i.e. unless
$$
\frac{\Delta p}{L} > \frac{4 \tau_y}{D} = \frac{4 \times 25}{0.150} = 667\ \mathrm{Pa / m}
\quad \Rightarrow \quad \Delta p > 2.67\ \mathrm{bar\ over\ } 400\ \mathrm{m}
$$
**The consequence is the operating rule that a plant learns by experience.** Throttling the pump from $6.4$ to $2.0\ \mathrm{bar}$ does not slow the sludge down — **it stops it**, and the line then needs a flush or a pig before it will move again, because the static pressure required to re-yield a stationary column is higher than the running pressure. **A sludge line is either running or blocked, and the control system must be built around that discontinuity.**
*Sanity.* The reason the operating point of $59.9\ \mathrm{Pa}$ sits only $2.4$ times above the $25\ \mathrm{Pa}$ yield stress is that the pipe is **wide**: the wall shear is $\tau_w = D \left( \Delta p / L \right) / 4$, so halving the diameter to $75\ \mathrm{mm}$ at the same gradient would bring $\kappa$ to $0.83$ and the plug to $83\ \%$ of the radius, at which the Buckingham bracket is $0.05$ and the line is **effectively a solid rod in a tube**. **Wide-bore, high-gradient is the design rule for yield-stress fluids.**
:::
:::

::: history
**The continuum** description of a fluid is that of **Euler**'s equations of **1755** (published 1757), following **d'Alembert**'s work of **1752**. **Navier** wrote a sliding-velocity (slip) boundary condition in his memoir of **1822**, and **Stokes**, after discussing the alternatives in **1845**, adopted the no-slip condition in his **1851** paper on pendulums. **The measurement of viscosity** begins with **Poiseuille**'s capillary experiments of **1838–1846**, undertaken by a physician to understand **the flow of blood** in small vessels; his law $Q \propto R^{4}$ had been found independently by **Hagen** in **1839**, and the result is now called the Hagen–Poiseuille law. **Coulomb** measured the resistance of liquids with oscillating discs in **1800**. **Eugene Bingham**'s **1916** paper on plastic flow introduced the yield-stress fluid that bears his name, and the word ***rheology*** is credited to Bingham in the late **1920s**; the **Society of Rheology** was founded in **1929**. **Sutherland**'s viscosity law for gases is of **1893**; **the kinetic theory behind it** — $\mu = \tfrac{1}{3} \rho \bar{c} \lambda$, independent of pressure — is **Maxwell**'s of **1860**, and Maxwell confirmed the surprising pressure-independence himself with oscillating-disc experiments reported in **1866**. **The Pitch Drop experiment** was begun by **Thomas Parnell** at the University of Queensland in **1927**; its ninth drop fell in **2014**, and Parnell (posthumously) and his successor **John Mainstone** received the **2005** Ig Nobel Prize in physics for it.
:::

## Where this leads

The properties in this lesson become dimensionless groups in [[fluid-mechanics/dimensional-analysis]] and the coefficients that decide whether a term in [[fluid-mechanics/navier-stokes]] may be dropped. Viscosity reappears as the friction factor in [[fluid-mechanics/pipe-flow]] and the wall shear of [[fluid-mechanics/boundary-layers-drag]]; the bulk modulus reappears as the Mach number in [[fluid-mechanics/compressible-flow]]; surface tension reappears in [[fluid-mechanics/fluid-statics]]'s menisci and in every spray, bubble and foam in [[energy-systems]] and [[propulsion]].

::: summary
- A fluid is a material that cannot support a shear at rest; the whole subject follows from that and the conservation laws.
- The continuum holds while $\mathrm{Kn} < 10^{- 3}$, which for air at one atmosphere means every length above about $0.07\ \mathrm{mm}$, and far less in a vacuum chamber.
- Dynamic viscosity is fifty-five times larger for water than for air; kinematic viscosity is fifteen times larger for **air**. Never divide a velocity by a dynamic viscosity.
- Gases get more viscous with temperature and liquids less so, by large factors over ordinary ranges, and a lubrication or heat-exchanger calculation that uses the cold number is wrong.
- Water's bulk modulus is $2.18\ \mathrm{GPa}$, which is enough to call it incompressible in steady flow and not enough to call it so in a transient; $1\ \%$ of entrained air at atmospheric pressure divides the stiffness by about a hundred and forty.
- Surface tension dominates below the capillary length of $2.7\ \mathrm{mm}$ for water, and capillary rise in a $1\ \mu\mathrm{m}$ pore is thirty metres.
- Vapour pressure doubles about every $15\ \mathrm{K}$; a pump's NPSH margin computed on cold data on hot water is a fiction of several metres.
- A yield stress means a pipeline that stops and never starts again, and a Deborah number means that whether a material is a fluid depends on how long you watch it.
:::

::: quiz
A hydraulic machine's servo loop has developed a low-frequency oscillation, and the oil's ISO viscosity grade is found to be correct. What is the most likely property cause?
- [ ] The oil's viscosity index is too high
- [x] Entrained air has reduced the oil's effective bulk modulus
- [ ] The oil's density has fallen with temperature
- [ ] The oil's surface tension has fallen
::: solution
The loop's natural frequency goes as the square root of the hydraulic stiffness, which is the oil's **bulk modulus** divided by the trapped volume. Degassed mineral oil has $E_v \approx 1.4$ to $1.7\ \mathrm{GPa}$; $1\ \%$ by volume of entrained air at atmospheric pressure reduces it to about $0.010\ \mathrm{GPa}$, because air's isothermal modulus is only $0.101\ \mathrm{MPa}$ and the bubbles are in series with the liquid. **The stiffness falls by a factor of about a hundred and forty and the natural frequency by a factor of about twelve**, which is exactly the symptom. The remedies are a reservoir with a three-minute residence time, a return line entering well below the lowest liquid level, and a bleed procedure — not a different oil.
:::
:::

## Exercises

::: exercise Density {level=1 check="1.025"}
Seawater at $35\ \mathrm{g / kg}$ salinity and $20\ {}^{\circ}\mathrm{C}$ has a density of $1{,}025\ \mathrm{kg / m^{3}}$. Give its specific gravity referred to pure water at $4\ {}^{\circ}\mathrm{C}$.
::: solution
$\mathrm{SG} = 1{,}025 / 1{,}000 = 1.025$.
:::
:::

::: exercise Knudsen {level=1 check="0.065"}
Air at $20\ {}^{\circ}\mathrm{C}$ and $101.325\ \mathrm{kPa}$ has a mean free path of $65\ \mathrm{nm}$. Give the Knudsen number for a $1\ \mu\mathrm{m}$ gap.
::: solution
$\mathrm{Kn} = 65 \times 10^{- 9} / 10^{- 6} = 0.065$, in the slip regime and approaching the transition regime.
:::
:::

::: exercise Kinematic viscosity {level=1 check="1.51"}
Air at $20\ {}^{\circ}\mathrm{C}$ has $\mu = 1.815 \times 10^{- 5}\ \mathrm{Pa \cdot s}$ and $\rho = 1.204\ \mathrm{kg / m^{3}}$. Give its kinematic viscosity in units of $10^{- 5}\ \mathrm{m^{2} / s}$.
::: solution
$\nu = 1.815 \times 10^{- 5} / 1.204 = 1.51 \times 10^{- 5}\ \mathrm{m^{2} / s}$.
:::
:::

::: exercise Bulk modulus {level=1 check="0.46"}
Water has $E_v = 2.18\ \mathrm{GPa}$. Give the percentage volume change at $10\ \mathrm{MPa}$.
::: solution
$\Delta V / V = 10 / 2{,}180 = 0.46\ \%$.
:::
:::

::: exercise Capillary {level=1 check="29.8"}
Give the capillary rise of water at $20\ {}^{\circ}\mathrm{C}$ in a $1\ \mathrm{mm}$ clean glass tube, in millimetres, with $\sigma = 0.0728\ \mathrm{N / m}$ and $\theta = 0$.
::: solution
$h = 4 \times 0.0728 / \left( 998 \times 9.807 \times 0.001 \right) = 29.8\ \mathrm{mm}$.
:::
:::

::: exercise Vapour pressure {level=1 check="5.66"}
Give the pressure head in metres of the difference between atmospheric pressure and water's vapour pressure at $80\ {}^{\circ}\mathrm{C}$, with $\rho = 972\ \mathrm{kg / m^{3}}$ and $p_v = 47.41\ \mathrm{kPa}$.
::: solution
$(101{,}325 - 47{,}410) / (972 \times 9.807) = 53{,}915 / 9{,}532 = 5.66\ \mathrm{m}$.
:::
:::

::: exercise Wave speed {level=1 check="858"}
Give the pressure-wave speed in metres per second in water inside a $600\ \mathrm{mm}$ ductile-iron pipe with a $6\ \mathrm{mm}$ wall and $E = 110\ \mathrm{GPa}$, taking $c = 1{,}481\ \mathrm{m / s}$.
::: solution
$c^{\prime} = 1{,}481 / \sqrt{1 + K D / \left( E t \right)}$, with $K D / \left( E t \right) = 2.18 \times 10^{9} \times 0.600 / \left( 110 \times 10^{9} \times 0.006 \right) = 1.982$, so $c^{\prime} = 1{,}481 / 1.727 = 858\ \mathrm{m / s}$.
:::
:::

::: exercise Power law {level=2 check="0.0666"}
A drilling mud follows $\tau = 0.8\, \dot{\gamma}^{0.6}$ in SI units. Give its apparent viscosity in pascal-seconds at a shear rate of $500\ \mathrm{s^{- 1}}$.
::: solution
$$
\mu_{\mathrm{app}} = K \dot{\gamma}^{\,n - 1} = 0.8 \times 500^{- 0.4}
= 0.8 \times 0.0833 = 0.0666\ \mathrm{Pa \cdot s}
$$
**The reading.** At the mud's low-shear field condition of $\dot{\gamma} = 1\ \mathrm{s^{- 1}}$ the apparent viscosity is $0.8\ \mathrm{Pa \cdot s}$, **twelve times** the drilling value — and that ratio is the whole of the design: the mud must carry cuttings to the surface at the low annular shear rate **and** erode the bit face at the high nozzle shear rate, and a Newtonian mud that did one would be a syrup that did neither.
*Sanity.* The $n = 0.6$ is typical of a bentonite mud; a **polymer** mud reaches $n = 0.4$ and a **lime** mud $n = 0.75$, and the **Marsh funnel viscosity** that the rig crew measures is an efflux time in seconds that corresponds to no single shear rate, which is why rheology is also checked with a rotational (Fann) viscometer at several speeds.
:::
:::

::: exercise Deborah {level=2 check="100"}
A polymer solution has a relaxation time of $0.2\ \mathrm{s}$. Give the Deborah number for a process observed over $2\ \mathrm{ms}$.
::: solution
$\mathrm{De} = \lambda_f / t_{\mathrm{obs}} = 0.2 / 0.002 = 100$. **The material behaves as an elastic solid** on that timescale, and the process — an inkjet ejection, a spray atomisation, a valve closure — must be modelled as a viscoelastic one.
:::
:::

::: exercise Derivation {level=3}
Derive the capillary-rise formula from a force balance and from an energy balance, show that the two agree, and obtain the height of a liquid that **does not** wet the tube.
::: solution
**The force balance.** The vertical component of the surface-tension force around the wetted perimeter supports the weight of the raised column:
$$
\sigma \cos \theta \times \pi D = \rho g \left( \frac{\pi D^{2}}{4} h \right)
\quad \Rightarrow \quad
\boxed{ h = \frac{4 \sigma \cos \theta}{\rho g D} }
$$
**The energy balance.** The free energy of the system is the sum of the gravitational potential of the raised column and the interfacial energies. The column of height $h$ has its centre of mass at $h / 2$, so
$$
E_{\mathrm{grav}} = \rho g \frac{\pi D^{2}}{4} h \times \frac{h}{2} = \frac{\pi \rho g D^{2} h^{2}}{8}
$$
and the work of replacing a length $h$ of solid–vapour interface by solid–liquid, with the liquid–vapour surface doing no net work because the meniscus is a surface of constant curvature, is
$$
E_{\mathrm{surf}} = \pi D h \left( \gamma_{SL} - \gamma_{SV} \right) = - \pi D h \sigma \cos \theta
$$
using **Young's equation** $\gamma_{SV} - \gamma_{SL} = \sigma \cos \theta$. Minimising:
$$
\frac{d}{d h} \left( \frac{\pi \rho g D^{2} h^{2}}{8} - \pi D h \sigma \cos \theta \right)
= \frac{\pi \rho g D^{2} h}{4} - \pi D \sigma \cos \theta = 0
\quad \Rightarrow \quad h = \frac{4 \sigma \cos \theta}{\rho g D}
$$
**The two agree**, and the reason they must is that the force balance is the derivative of the energy balance — but the energy derivation **shows what the force derivation hides**: that the meniscus's own weight and curvature energy have been neglected, which is legitimate when $h \gg D$ and not otherwise.
**The correction for the meniscus.** For a hemispherical meniscus the liquid above the bottom of the meniscus has a volume $\pi D^{3} / 8 - \pi D^{3} / 12 = \pi D^{3} / 24$, equivalent to a column of height $D / 6$, so the height to the bottom of the meniscus is
$$
h = \frac{4 \sigma \cos \theta}{\rho g D} - \frac{D}{6}
$$
**The evaluation for the $1\ \mathrm{mm}$ water tube**: $29.8 - 0.17 = 29.6\ \mathrm{mm}$, a **$0.6\ \%$** correction that matters only in a precision manometer.
**The non-wetting case.** For $\theta > 90^{\circ}$ the cosine is negative and $h$ is a **depression**, which is not a mathematical curiosity but the origin of a **mercury barometer's capillary error**. For mercury in a $1\ \mathrm{mm}$ tube the depression is $11.2\ \mathrm{mm}$, and a barometer reading corrected for it must be **raised** by that amount — an error of $1.5\ \%$ on an atmospheric reading, which is **larger than the resolution of a weather report**.
*Sanity.* The reason the energy derivation is the safer of the two is that it generalises to a **between-plates** geometry, where for plates of width $w$ and spacing $s$ the wetted length is $2 w$ and the raised cross-section is $w s$, giving the tube formula with $D$ replaced by $2 s$:
$$
h = \frac{2 \sigma \cos \theta}{\rho g s}
$$
**and to a square capillary of side $a$, where $h = 4 \sigma \cos \theta / \left( \rho g a \right)$** — the same as a circular tube of diameter $a$, which is why a **porous solid's** pore-size distribution can be measured by forcing a non-wetting liquid into it and reading the entry pressure at each pore size — **mercury intrusion porosimetry**, the standard method for a rock's pore-throat distribution.
:::
:::

::: exercise Design {level=3}
Specify the fluid-property basis — density, viscosity versus temperature, vapour pressure, bulk modulus, surface tension and any non-Newtonian behaviour — for a hydraulic power-pack driving a $2\ \mathrm{MN}$ press at $280\ \mathrm{bar}$ with a $0.4\ \mathrm{s}$ cycle, and state the tests that verify the specification.
::: solution
**The duty and what it asks of the fluid.**
$$
\begin{array}{l c l}
\text{Pressure} & 280\ \mathrm{bar} & \text{compressibility and leakage dominate} \\
\text{Cycle} & 0.4\ \mathrm{s} & \text{stiffness and wave speed dominate} \\
\text{Force} & 2\ \mathrm{MN} & 300\ \mathrm{mm}\ \text{bore at } 280\ \text{bar} \\
\text{Duty} & \text{continuous} & \text{thermal balance at } 45\ {}^{\circ}\mathrm{C} \text{ to } 55\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The fluid.** A **zinc-free anti-wear hydraulic oil, ISO VG 46**, with
$$
\begin{array}{l l l}
\rho\ \text{at}\ 20\ {}^{\circ}\mathrm{C} & 875\ \mathrm{kg / m^{3}} & \text{affects the accumulator's gas volume} \\
\nu\ \text{at}\ 40\ {}^{\circ}\mathrm{C} & 46\ \mathrm{mm^{2} / s} & \text{the specification's nominal number} \\
\nu\ \text{at}\ 100\ {}^{\circ}\mathrm{C} & 6.8\ \mathrm{mm^{2} / s} & \text{viscosity index } \ge 100 \\
\nu\ \text{at}\ - 10\ {}^{\circ}\mathrm{C} & \approx 1{,}500\ \mathrm{mm^{2} / s} & \text{above a vane pump's cold-start limit: heat the tank} \\
E_v\ \text{at}\ 280\ \text{bar, degassed} & 1.65\ \mathrm{GPa} & \text{the stiffness figure} \\
\text{Air release, } 40\ {}^{\circ}\mathrm{C} & \le 8\ \text{minutes} & \text{DIN 51381} \\
\text{FZG scuffing} & \ge 12 & \text{the pump's wear protection}
\end{array}
$$
**The stiffness calculation that sets the machine's cycle time.** The oil in a $2\ \mathrm{litre}$ cylinder volume at $280\ \mathrm{bar}$ stores
$$
U = \frac{\left( 28 \times 10^{6} \right)^{2}}{2 \times 1.65 \times 10^{9}} \times 0.002 = 475\ \mathrm{J}
$$
and the compliance is
$$
C = \frac{V}{E_v} = \frac{0.002}{1.65 \times 10^{9}} = 1.21 \times 10^{- 12}\ \mathrm{m^{3} / Pa}
$$
so the cylinder's **hydraulic** stiffness is
$$
k_h = \frac{A^{2} E_v}{V} = \frac{\left( 0.0714 \right)^{2} \times 1.65 \times 10^{9}}{0.002} = 4.21 \times 10^{9}\ \mathrm{N / m}
$$
**against a mechanical frame stiffness of typically $2 \times 10^{9}\ \mathrm{N / m}$** — the two act as springs in series and the oil supplies about a third of the total compliance, so it limits the positioner's servo bandwidth as much as the frame does. **$1\ \%$ by volume of free air at the working pressure (isothermal modulus $28\ \mathrm{MPa}$) drops $E_v$ to $1.05\ \mathrm{GPa}$**, and at lower pressures, where the same mass of air occupies more volume, the loss is far greater.
**The wave speed and the valve.**
$$
c^{\prime} = \frac{1}{\sqrt{\rho \left( \dfrac{1}{E_v} + \dfrac{D}{t E_{\mathrm{tube}}} \right)}}
= \frac{1}{\sqrt{875 \left( \dfrac{1}{1.65 \times 10^{9}} + \dfrac{0.016}{0.002 \times 110 \times 10^{9}} \right)}} = 1{,}297\ \mathrm{m / s}
$$
For a $1.5\ \mathrm{m}$ steel line the quarter-wave resonance is $c^{\prime} / \left( 4 L \right) = 1{,}297 / 6 = 216\ \mathrm{Hz}$ — on top of a $200\ \mathrm{Hz}$ servo loop — so the **line must be kept to about $0.5\ \mathrm{m}$** between the valve and the cylinder, which moves the resonance to $650\ \mathrm{Hz}$, well above the loop.
**The tests that verify the specification.**
$$
\begin{array}{l l l}
\text{Viscosity at } 40 \text{ and } 100\ {}^{\circ}\mathrm{C} & \text{ASTM D445} & \text{the viscosity index, and the VI of a recycled oil is always low} \\
\text{Density and its temperature coefficient} & \text{ASTM D4052} & \text{the accumulator's pre-charge calculation} \\
\text{Air release} & \text{DIN 51381} & \text{the sponginess test} \\
\text{Water content} & \text{Karl Fischer, } \le 500\ \mathrm{ppm} & \text{water halves the bearing life} \\
\text{Particle count} & \text{ISO 4406, } 16\text{/}14\text{/}11 & \text{the servo valve's } 3\ \mu\mathrm{m} \text{ clearance} \\
\text{Bulk modulus, in situ} & \text{the pressure–volume curve of the press} & \text{the only test that catches entrained air}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE FLUID PROPERTIES SHALL BE GUARANTEED AT $40\ {}^{\circ}\mathrm{C}$ AND AT THE MINIMUM AND MAXIMUM AMBIENT, AND THE MACHINE SHALL START AT $- 10\ {}^{\circ}\mathrm{C}$, WITH A TANK HEATER IF THE OIL'S COLD VISCOSITY EXCEEDS THE PUMP'S START LIMIT."** **"THE SERVO-VALVE CLEARANCE AND THE FILTRATION CLASS SHALL BE STATED TOGETHER, AND THE FILTER SHALL BE $\beta_{3} \ge 1000$."** **"THE AIR-RELEASE AND DE-AERATION TIME OF THE RESERVOIR SHALL BE GUARANTEED FOR THE FULL FLOW, AND THE RETURN LINE SHALL ENTER BELOW THE LOWEST LIQUID LEVEL."** **"THE HYDRAULIC STIFFNESS AND THE SERVO LOOP'S NATURAL FREQUENCY SHALL BE MEASURED ON THE MACHINE AND REPORTED."**
*Design comment.* The general rule is that **a hydraulic machine is bought as a stiffness specification and delivered as a viscosity one**, and that the two are tested by different people at different stages — which is why a press can meet every fluid certificate and still be uncontrollable.
:::
:::
