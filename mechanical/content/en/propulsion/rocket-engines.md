[[propulsion/rocket-fundamentals]] treated a rocket engine as a source of exhaust with effective velocity $c = C_F c^*$. This chapter looks at the machines that produce that exhaust and asks the system-level questions an engineer must answer when choosing one: how is the propellant brought into the chamber at high pressure, how is the chamber kept from melting, how does a solid motor regulate its own pressure, and why do electric thrusters, with specific impulses ten times those of chemical rockets, produce only millinewtons of thrust? The answers come from a handful of conservation laws — energy for pumps, equilibrium for pressure vessels and burning surfaces, power for electric thrusters — and they explain the broad pattern of the field: high-thrust chemical engines for launch and landing, low-thrust electric propulsion for long missions in space.

The treatment is deliberately at the level of performance and system design found in the standard textbooks (Sutton and Biblarz, *Rocket Propulsion Elements*; Goebel and Katz, *Fundamentals of Electric Propulsion*). It contains no propellant formulations or manufacturing information, and the design, manufacture and testing of rocket engines is work for qualified organisations operating under strict safety regulation.

## A map of rocket propulsion

::: definition Classes of rocket propulsion {#def-classes}
- **Liquid bipropellant** engines store fuel and oxidiser separately as liquids and inject them into a combustion chamber. **Monopropellant** thrusters decompose a single liquid over a catalyst.
- **Solid rocket motors** contain the propellant as a solid charge (the **grain**) inside the combustion chamber itself; once ignited it burns until consumed.
- **Hybrid** rockets store one component (usually the oxidiser) as a liquid or gas and the other as a solid grain in the chamber.
- **Electric** thrusters use electrical energy, from solar arrays or a nuclear source, to accelerate a propellant: by heating it (**electrothermal**: resistojets, arcjets), by accelerating ions in an electrostatic field (**electrostatic**: gridded ion and Hall-effect thrusters), or by electromagnetic forces on a plasma (**electromagnetic**: magnetoplasmadynamic and pulsed plasma thrusters).
:::

The chemical classes are **energy-limited**: the energy per kilogram is fixed by the chemistry, so the exhaust velocity is bounded (about $4.5\ \mathrm{km/s}$ for the best practical combination), but the power — and hence thrust — can be enormous because the energy is released inside the propellant at whatever rate it is fed. Electric thrusters are **power-limited**: the exhaust velocity can be very high, but the thrust is limited by the electrical power the spacecraft can supply.

## Liquid-propellant engines

A liquid engine consists of propellant tanks, a feed system that raises the propellants to above chamber pressure, an injector that atomises and mixes them, a combustion chamber, and a nozzle; valves, igniters and a control system sequence its operation. The basic design question is **how to get the propellant into the chamber**: chamber pressures of $5$–$30\ \mathrm{MPa}$ are desirable because a high pressure makes the engine compact for its thrust ($F = C_F p_c A_t$) and allows a large nozzle area ratio in a short length.

### Pressure-fed and pump-fed systems

The simplest feed system pressurises the tanks with an inert gas and lets the tank pressure push the propellant into the chamber. Its weakness is the tank.

::: proposition Mass of a pressurised spherical tank {#prop-tank-mass}
A thin-walled spherical tank of volume $V$, made of a material of density $\rho_m$ and allowable stress $\sigma$, holding pressure $p$, has wall mass
$$
m_{\text{tank}} = \frac{3}{2}\,\frac{p\,V\,\rho_m}{\sigma},
$$ {#eq-tank-mass}
independent of the tank's size for a given $pV$: the tank mass is proportional to the stored pressure-volume product.
:::

::: proof
For a thin sphere of radius $r$ and wall thickness $t \ll r$, equilibrium of a hemisphere gives the membrane stress $\sigma = pr/(2t)$ ([[mechanics-of-materials]] thin-walled pressure vessels), so the required thickness is $t = pr/(2\sigma)$. The wall mass is $m = 4\pi r^2 t\rho_m = 2\pi r^3 p\rho_m/\sigma$, and with $V = \tfrac43\pi r^3$, $2\pi r^3 = \tfrac32 V$, which gives [[#eq-tank-mass]]. Assumptions: thin wall, uniform membrane stress, no allowance for ullage, fittings, buckling or safety factors beyond those included in $\sigma$. Cylindrical tanks with hemispherical ends need more material: the hoop stress in the cylinder is twice the sphere's.
:::

Since the chamber pressure must be below the tank pressure (by the injector and line losses), a pressure-fed engine with $p_c = 2\ \mathrm{MPa}$ needs tanks at perhaps $3\ \mathrm{MPa}$, and [[#eq-tank-mass]] makes large propellant loads impossibly heavy. Pressure feeding is therefore used where simplicity and reliability matter more than tank mass: spacecraft thrusters and small upper stages, at chamber pressures of about $0.5$–$2\ \mathrm{MPa}$.

::: example Pressure-fed or pump-fed tankage {#ex-tankage}
A stage carries $10\ \mathrm{m^3}$ of propellant in spherical aluminium-alloy tanks ($\rho_m = 2800\ \mathrm{kg/m^3}$, allowable stress $250\ \mathrm{MPa}$). Compare the tank wall mass for a pump-fed design with tanks at $0.3\ \mathrm{MPa}$ and a pressure-fed design that needs $3.0\ \mathrm{MPa}$ in the tanks.
::: solution
By [[#eq-tank-mass]], $m = 1.5\,pV\rho_m/\sigma$:
$$
m_{0.3} = \frac{1.5 \times 0.3\times10^{6} \times 10 \times 2800}{2.5\times10^{8}} = 50.4\ \mathrm{kg},\qquad
m_{3.0} = 504\ \mathrm{kg}.
$$
If the propellant has a mean density of about $1000\ \mathrm{kg/m^3}$, the pressure-fed tanks weigh $5\,\%$ of the propellant before adding the high-pressure gas and its own (heavier still) storage bottles; the pump-fed tanks weigh $0.5\,\%$.

**Check.** The tenfold ratio is simply the pressure ratio, as [[#eq-tank-mass]] predicts. In practice low-pressure tanks are sized by other loads — flight bending, axial compression, handling — so their real mass is higher than the pressure estimate, but the conclusion stands: for a large stage, the turbopump is the lighter way to make pressure.
:::
:::

**Pump-fed** engines keep the tanks at low pressure (a few bar, enough to prevent pump cavitation and to stiffen the structure) and raise the propellant pressure in **turbopumps**: centrifugal (sometimes axial) pumps driven by a turbine on the same shaft. The pump power follows from the steady-flow energy equation for an incompressible liquid.

::: proposition Pump power {#prop-pump-power}
A pump raising the pressure of a liquid of density $\rho$ by $\Delta p$ at mass flow $\dot m$, with overall efficiency $\eta_p$, absorbs the shaft power
$$
P = \frac{\dot m\,\Delta p}{\rho\,\eta_p} .
$$ {#eq-pump-power}
:::

::: proof
For steady, adiabatic flow of an incompressible liquid with negligible changes of kinetic and potential energy, the reversible work per unit mass is $\int v\,\mathrm{d}p = \Delta p/\rho$ ([[thermodynamics/first-law-open]]). Multiplying by $\dot m$ gives the ideal power; the actual power is larger by the factor $1/\eta_p$, which accounts for hydraulic, leakage and mechanical losses. Assumptions: incompressible liquid (adequate for cryogens far from their critical point), adiabatic pump, negligible velocity and elevation changes between pump inlet and outlet.
:::

::: example Turbopump power for a large booster engine {#ex-turbopump}
A booster engine burns liquid oxygen ($\rho = 1140\ \mathrm{kg/m^3}$) at $1800\ \mathrm{kg/s}$ and kerosene ($\rho = 810\ \mathrm{kg/m^3}$) at $700\ \mathrm{kg/s}$. The pumps raise the pressures by $15\ \mathrm{MPa}$ and $18\ \mathrm{MPa}$ respectively (the fuel also passes through the cooling jacket, hence its higher rise), each with efficiency $0.70$. Find the pump powers. Compare with tank pressurisation.
::: solution
From [[#eq-pump-power]]:
$$
P_{\text{ox}} = \frac{1800 \times 15\times10^{6}}{1140 \times 0.70} = 33.8\ \mathrm{MW},\qquad
P_{\text{fuel}} = \frac{700 \times 18\times10^{6}}{810 \times 0.70} = 22.2\ \mathrm{MW},
$$
a total of $56\ \mathrm{MW}$ — comparable to the shaft power of a large marine gas turbine, delivered by a machine that fits within about a metre or two.
**Check.** For comparison, [[#eq-tank-mass]] shows that storing the same propellants at, say, $17\ \mathrm{MPa}$ would require tanks of mass $\tfrac32 \times 17\times10^{6} \times \rho_m/\sigma$ per cubic metre — for an aluminium alloy ($\rho_m = 2800\ \mathrm{kg/m^3}$, $\sigma = 250\ \mathrm{MPa}$) about $286\ \mathrm{kg}$ per $\mathrm{m^3}$, a third of the mass of the kerosene the tank holds. A turbopump of a few tonnes replaces hundreds of tonnes of tank wall. The pump power, however, must come from somewhere — the engine cycle.
:::
:::

### Engine cycles

The turbine that drives the pumps needs a hot, high-pressure gas, and the **engine cycle** describes where it comes from and where it goes.

- **Gas-generator (open) cycle.** A small fraction of the propellants (a few per cent) is burned in a separate gas generator, at a mixture ratio chosen to keep the gas cool enough for the turbine blades; the gas drives the turbine and is then dumped overboard through a separate low-performance exhaust. Simple and well proven; the dumped flow lowers the engine's overall specific impulse by a few per cent and limits practical chamber pressure.
- **Staged-combustion (closed) cycle.** A preburner burns all of one propellant with a little of the other; the turbine exhaust, still at high pressure, is then injected into the main chamber, so no propellant is wasted. This allows high chamber pressures and the highest specific impulses, at the cost of very high pump discharge pressures, demanding hot-gas ducting and greater complexity. **Full-flow** staged combustion uses two preburners, one fuel-rich and one oxidiser-rich, so both propellants pass through turbines.
- **Expander cycle.** The fuel (hydrogen or methane) is heated in the cooling jacket of the chamber and nozzle and expands through the turbine before being injected. There is no combustion upstream of the chamber, which makes the cycle benign and restartable, but the heat picked up in the jacket limits the turbine power and so the chamber pressure and engine size; it suits upper stages.
- **Electric pump-fed** engines drive the pumps with electric motors powered by batteries; practical for small launchers where the battery mass is acceptable.

### Mixture ratio, cooling and combustion stability

The **mixture ratio** $O/F = \dot m_{\text{ox}}/\dot m_{\text{fuel}}$ at which specific impulse peaks is usually *fuel-rich* of stoichiometric. The reason is visible in $c^* = \sqrt{R_uT_c/\mathcal{M}}\big/\Gamma$: moving fuel-rich lowers the flame temperature slightly but lowers the mean molar mass of the products more — dramatically so with hydrogen, whose unburned excess is a very light working fluid. Hydrogen–oxygen engines typically run at $O/F \approx 5$–$6$ against a stoichiometric value of 8.

Chamber gas temperatures of $3000$–$3600\ \mathrm{K}$ exceed the melting point of any practical wall material, and the heat flux is greatest near the throat, where the gas density and velocity are highest. Large engines use **regenerative cooling**: one propellant flows through channels in the chamber and nozzle walls before being injected, carrying the heat back into the cycle. Supplementary **film cooling** injects a layer of fuel along the wall; **ablative** liners char and erode, carrying heat away (simple, used in solid motors and some small engines); **radiation-cooled** nozzle extensions of refractory metals or ceramic composites glow and radiate heat to space. Heat-transfer coefficients are estimated from empirical correlations of the Dittus–Boelter type adapted to rocket conditions (Bartz's correlation is the classic one) and then confirmed by test.

A further design problem is **combustion instability**: coupling between combustion and the acoustic modes of the chamber can produce pressure oscillations large enough to destroy an engine in a fraction of a second. Injector design, baffles and acoustic cavities are used to suppress it; the development of large engines has historically spent much of its effort on this problem.

## Solid rocket motors

A solid motor is the simplest rocket: a case (a pressure vessel), a grain of propellant bonded to it, an igniter and a nozzle. Its thrust history is fixed at manufacture by the shape of the grain, because the propellant burns on its exposed surfaces and the burning surface area $A_b$ changes as the surfaces recede.

::: definition Burning rate and burning surface {#def-burn-rate}
The propellant surface recedes normal to itself at the **burning rate** $r$ (m/s). Over a moderate pressure range, measured burning rates follow the empirical **burning-rate law** (Saint-Robert's or Vieille's law)
$$
r = a\,p_c^{\,n},
$$ {#eq-burn-rate}
where $a$ depends on the propellant and its initial temperature and the **pressure exponent** $n$ is typically $0.2$–$0.6$ for practical propellants (Sutton and Biblarz). The mass generation rate is $\dot m_g = \rho_p A_b r$, with $\rho_p$ the propellant density. A grain whose $A_b$ grows with time gives a **progressive** thrust curve, one whose $A_b$ shrinks a **regressive** curve, and one with nearly constant $A_b$ a **neutral** curve.
:::

::: proposition Equilibrium chamber pressure and its stability {#prop-solid-pc}
In a solid motor the chamber pressure settles where the gas generated by burning equals the gas discharged through the choked throat:
$$
\rho_p A_b\,a\,p_c^{\,n} = \frac{p_c A_t}{c^*}
\qquad\Longrightarrow\qquad
p_c = \left(a\,\rho_p\,c^*\,\frac{A_b}{A_t}\right)^{1/(1-n)} .
$$ {#eq-solid-pc}
This equilibrium is stable only if $n < 1$, and a fractional change in the area ratio $K = A_b/A_t$ produces a fractional change in pressure $(1/(1-n))$ times larger:
$$
\frac{\mathrm{d}p_c}{p_c} = \frac{1}{1-n}\,\frac{\mathrm{d}K}{K} .
$$
:::

::: proof
**Equilibrium.** Gas generation $\dot m_g = \rho_pA_b\,a p_c^n$; nozzle discharge $\dot m_n = p_cA_t/c^*$ (definition of $c^*$, [[propulsion/rocket-fundamentals]]). In the quasi-steady state they are equal (the small rate of change of gas mass stored in the growing chamber volume is neglected); dividing by $A_t$ and solving gives [[#eq-solid-pc]].
**Stability.** Suppose the pressure is perturbed slightly above equilibrium. Generation grows as $p_c^n$ and discharge as $p_c^1$. If $n < 1$, discharge grows faster than generation, more gas leaves than is produced, and the pressure falls back: the equilibrium is stable. If $n > 1$, generation outruns discharge and the pressure keeps rising until the case fails (or, if perturbed downwards, falls until the motor extinguishes). Formally, the chamber gas mass $M$ obeys $\mathrm{d}M/\mathrm{d}t = \dot m_g - \dot m_n$, and $\partial(\dot m_g - \dot m_n)/\partial p_c = (n - 1)\dot m_n/p_c$ at equilibrium, negative exactly when $n < 1$.
**Sensitivity.** Taking logarithms of [[#eq-solid-pc]], $\ln p_c = \frac{1}{1-n}(\ln K + \text{const})$, and differentiating gives the result. Assumptions: quasi-steady operation, burning rate given by [[#eq-burn-rate]] (no erosive burning from high gas velocity along the surface), $c^*$ constant, choked nozzle.
:::

::: example Chamber pressure of a solid motor {#ex-solid}
A motor has a burning surface $A_b = 5.0\ \mathrm{m^2}$ and throat area $A_t = 0.025\ \mathrm{m^2}$. Its propellant has density $1750\ \mathrm{kg/m^3}$, $c^* = 1550\ \mathrm{m/s}$, and a burning rate of $5.0\ \mathrm{mm/s}$ at $1\ \mathrm{MPa}$ with $n = 0.35$ (so $r = 5.0\ \mathrm{mm/s}\times(p_c/1\ \mathrm{MPa})^{0.35}$). Find the equilibrium chamber pressure, the burning rate, the mass flow, and the pressure rise caused by a $10\,\%$ increase of burning surface.
::: solution
$K = A_b/A_t = 200$. Writing $a\,p_c^n = 5.0\times10^{-3}\,(p_c/10^{6})^{0.35}$ with $p_c$ in pascals, [[#eq-solid-pc]] gives
$$
p_c^{\,0.65} = 1750 \times 1550 \times 200 \times 5.0\times10^{-3} \times (10^{6})^{-0.35}
\quad\Longrightarrow\quad
p_c = 4.64\ \mathrm{MPa}.
$$
Then $r = 5.0 \times 4.64^{0.35} = 8.56\ \mathrm{mm/s}$ and $\dot m = \rho_pA_br = 1750 \times 5.0 \times 8.56\times10^{-3} = 74.9\ \mathrm{kg/s}$.
A $10\,\%$ larger $A_b$ raises the pressure by the factor $1.1^{1/0.65} = 1.158$, i.e. $15.8\,\%$.

**Check.** The throat discharge $p_cA_t/c^* = 4.64\times10^{6} \times 0.025/1550 = 74.9\ \mathrm{kg/s}$ agrees. The amplification $1/(1-n) = 1.54$ is why grain cracks or debonds — which expose extra burning surface — are dangerous, and why propellants with low pressure exponents are preferred; with $n = 0.7$ the same 10 % would raise the pressure by 37 %.
:::
:::

::: widget plot
f: (1750*1550*x*0.005/1e6)^(1/(1 - n))
x: 50, 400
y: 0, 20
sliders: n=0.35:0.1:0.9:0.01
labels: p_c\ (\mathrm{MPa})
points: 200, 4.642
caption: Equilibrium chamber pressure [[#eq-solid-pc]] against the area ratio $K = A_b/A_t$ for the propellant of example [[#ex-solid]] (burning rate $5\ \mathrm{mm/s}$ at $1\ \mathrm{MPa}$), with the pressure exponent $n$ as a slider. At $n = 0.35$ the curve is gentle; push $n$ towards 0.9 and the same small change in burning surface sends the pressure soaring — the amplification $1/(1-n)$ made visible. As $n \to 1$ no stable equilibrium exists at all.
:::

Solid motors offer high density, long storage, instant readiness and high thrust from a simple device, which is why they are used as strap-on boosters for launch vehicles and in spacecraft kick stages. Their disadvantages follow from the proposition: thrust cannot be throttled or (in general) stopped once ignited, performance varies with the grain temperature through $a$, and specific impulse is lower than that of the best liquid combinations.

**Hybrid rockets** inject a liquid or gaseous oxidiser through a port in a solid fuel grain. The fuel regression rate depends mainly on the oxidiser mass flux through the port rather than on pressure, so hybrids have no pressure-runaway mechanism of the solid kind and can be throttled and shut down by the oxidiser valve. Their weaknesses are low regression rates (needing long or multi-port grains), a mixture ratio that shifts as the port grows, and incomplete mixing; they have found niches in sounding rockets and suborbital vehicles.

::: warning Specific impulse is not the whole comparison
Comparing engines by $I_{sp}$ alone is a classic mistake. A hydrogen engine's $I_{sp}$ of about $450\ \mathrm{s}$ beats kerosene's $\sim 340\ \mathrm{s}$, but liquid hydrogen's density is about $71\ \mathrm{kg/m^3}$ against kerosene's $810$: the hydrogen stage needs much larger, insulated tanks, which raises its structural coefficient and drag. For a first stage, where thrust and tank volume matter most, the denser propellant often gives the lighter, cheaper vehicle; for upper stages, where $\Delta v$ per kilogram is everything, hydrogen wins. The fair comparison is the *payload* of the complete vehicle from the rocket equation, using each option's $I_{sp}$, $\varepsilon$ and thrust-to-weight ratio.
:::

## Electric propulsion

In an electric thruster the energy given to the exhaust comes from a power supply, not from the propellant. That changes the trade completely.

::: proposition Power-limited thrust {#prop-power-thrust}
A thruster that converts electrical power $P$ into jet kinetic power with efficiency $\eta$ (the **thrust efficiency**) produces, at exhaust velocity $c$,
$$
F = \frac{2\eta P}{c} = \frac{2\eta P}{g_0 I_{sp}},\qquad \dot m = \frac{2\eta P}{c^2} .
$$ {#eq-power-thrust}
At fixed power, thrust is inversely proportional to specific impulse.
:::

::: proof
The jet carries kinetic power $\tfrac12\dot m c^2 = \eta P$, and the thrust is $F = \dot m c$. Eliminating $\dot m$: $F = 2\eta P/c$. Assumptions: uniform exhaust at velocity $c$ (beam divergence and a spread of ion velocities are folded into $\eta$), no pressure thrust (true in vacuum for these devices).
:::

With $\eta P$ of a few kilowatts and $c$ of tens of kilometres per second, [[#eq-power-thrust]] gives tenths of a newton at most: an electric thruster takes weeks or months to deliver a $\Delta v$ that a chemical engine gives in minutes. Its reward is the rocket equation: at $c = 30\ \mathrm{km/s}$ a $\Delta v$ of $5\ \mathrm{km/s}$ costs only $15\,\%$ of the initial mass in propellant.

::: proposition Exhaust velocity of an electrostatic thruster {#prop-ion-velocity}
An ion of mass $m_i$ and charge $q$, starting from rest and falling through an electric potential difference $V_b$, leaves with speed
$$
v = \sqrt{\frac{2qV_b}{m_i}} .
$$ {#eq-ion-velocity}
:::

::: proof
Energy conservation: the work done by the field, $qV_b$, becomes the kinetic energy $\tfrac12 m_iv^2$. Assumptions: no collisions in the acceleration region, non-relativistic speeds (valid: $v/c_{\text{light}} \sim 10^{-4}$), ions created at rest at the full beam potential.
:::

**Gridded ion thrusters** ionise a propellant (usually xenon, chosen for its high atomic mass, low ionisation energy and easy storage) in a discharge chamber and accelerate the ions through a pair of closely spaced grids; a separate **neutraliser** cathode emits electrons into the beam so the spacecraft does not charge up. Their specific impulse is high ($3000$–$4000\ \mathrm{s}$ or more) and their efficiency good ($0.6$–$0.7$), but the thrust density is limited by the space-charge limit on the current between the grids. **Hall-effect thrusters** accelerate ions in the electric field set up across a radial magnetic field that traps electrons in an azimuthal drift; there are no grids, the thrust density is higher, and typical specific impulses are $1500$–$2500\ \mathrm{s}$ at efficiencies around $0.5$–$0.6$. Hall thrusters now dominate orbit raising and station keeping of commercial communication satellites and propel the large low-Earth-orbit constellations (as of 2026). **Electrothermal** devices (resistojets, arcjets) heat a gas and expand it in a nozzle; they are simpler but limited to $I_{sp}$ of a few hundred to about $1000\ \mathrm{s}$ by material temperatures and the gas's molar mass.

::: example An ion thruster in deep space {#ex-ion}
A gridded xenon ion thruster operates at $2.3\ \mathrm{kW}$ input power with $I_{sp} = 3100\ \mathrm{s}$ and thrust efficiency $0.60$. (These are close to the published full-power figures of NASA's NSTAR thruster flown on Deep Space 1.) Find the thrust and the xenon flow. Compare the exhaust velocity with that given by [[#eq-ion-velocity]] for a beam voltage of $1100\ \mathrm{V}$ ($m_{\mathrm{Xe}} = 131.29\ \mathrm{u}$). How long would the thruster take to give a $1000\ \mathrm{kg}$ spacecraft $\Delta v = 2\ \mathrm{km/s}$?
::: solution
$c = 3100 \times 9.80665 = 30.4\ \mathrm{km/s}$, so by [[#eq-power-thrust]]
$$
F = \frac{2 \times 0.60 \times 2300}{30\,400} = 0.0908\ \mathrm{N} = 91\ \mathrm{mN},\qquad
\dot m = \frac{F}{c} = 2.99\ \mathrm{mg/s}.
$$
Beam velocity: $v = \sqrt{2 \times 1.602\times10^{-19} \times 1100/(131.29 \times 1.6605\times10^{-27})} = 40.2\ \mathrm{km/s}$, corresponding to $4100\ \mathrm{s}$. The difference from the effective $3100\ \mathrm{s}$ comes from neutral propellant that escapes un-ionised (mass utilisation below 1), doubly charged ions and beam divergence.
Propellant for $2\ \mathrm{km/s}$: $m_p = 1000(1 - e^{-2000/30\,400}) = 63.7\ \mathrm{kg}$; at $2.99\ \mathrm{mg/s}$ that takes $2.13\times10^{7}\ \mathrm{s} = 247\ \mathrm{days}$ of continuous thrusting.

**Check.** A chemical bipropellant system ($I_{sp} = 320\ \mathrm{s}$) would need $1000(1 - e^{-2000/3138}) = 471\ \mathrm{kg}$ of propellant for the same $\Delta v$ — seven times more — but would deliver it in minutes. The thrust of $91\ \mathrm{mN}$ is about the weight of a few sheets of paper on Earth.
:::
:::

How high should the exhaust velocity be? Higher $c$ saves propellant, but by [[#eq-power-thrust]] needs more power for the same thrust, and power plants (solar arrays, power processing) have mass. If the power plant has specific mass $\alpha$ (kg per watt of input power) and the mission requires thrust $F$ for a time $t$, the propellant mass is $Ft/c$ and the power-plant mass is $\alpha P = \alpha Fc/(2\eta)$. Their sum
$$
m_p + m_{pp} = \frac{Ft}{c} + \frac{\alpha F c}{2\eta}
$$
is smallest at
$$
c_{\text{opt}} = \sqrt{\frac{2\eta t}{\alpha}} ,
$$ {#eq-c-opt}
(set the derivative with respect to $c$ to zero), where the two masses are equal. For $\alpha = 20\ \mathrm{kg/kW}$, $\eta = 0.6$ and $t = 200$ days, $c_{\text{opt}} = 32\ \mathrm{km/s}$ ($I_{sp} \approx 3300\ \mathrm{s}$) — the regime of ion thrusters. Shorter missions, such as orbit raising in weeks, favour lower $c$ and the higher thrust of Hall thrusters. This simple argument, refined by Ernst Stuhlinger in the 1960s, underlies the choice of electric-propulsion operating points.

::: widget plot
f: 2*h*P*1000/(x*9.80665)*1000; 100*(1 - exp(-v*1000/(x*9.80665)))
x: 200, 5000
y: 0, 100
sliders: P=2.3:0.5:20:0.1; h=0.6:0.3:0.8:0.01; v=2:0.5:10:0.1
labels: F\ (\mathrm{mN}); m_p/m_0\ (\%)
points: 3100, 90.79
caption: The electric-propulsion trade against specific impulse $x$ (s): thrust in millinewtons for input power $P$ (kW) and efficiency $h$ (first curve), and propellant fraction in per cent for a mission velocity increment $v$ (km/s) (second curve). The point is example [[#ex-ion]]. Raising the specific impulse saves propellant along the second curve but costs thrust — and therefore time — along the first; at chemical specific impulses (left edge) the propellant fraction is enormous but thrust could be large.
:::

::: quiz
Two thrusters run on the same $5\ \mathrm{kW}$ with the same efficiency. Thruster A has $I_{sp} = 1500\ \mathrm{s}$, thruster B $3000\ \mathrm{s}$. Which statements are true? (Several may be correct.)
- [x] A produces twice the thrust of B.
- [x] B uses a quarter of A's propellant mass flow.
- [ ] B delivers a given $\Delta v$ to a spacecraft in half the time.
- [x] For a mission where $\Delta v$ is small compared with both exhaust velocities, B needs about half A's propellant.
::: solution
$F = 2\eta P/c$ halves when $c$ doubles; $\dot m = 2\eta P/c^2$ quarters. Delivering a $\Delta v$ takes roughly $m\Delta v/F$, so B takes about *twice* as long. Propellant mass for small $\Delta v$ is about $m\Delta v/c$, so B needs half.
:::
:::

## Comparing engine types

| class | typical $I_{sp}$ (s) | thrust range | characteristic uses |
|---|---|---|---|
| liquid bipropellant (cryogenic, hydrogen) | 360 (sea level) – 465 (vacuum) | kN to MN | upper stages, core stages |
| liquid bipropellant (kerosene, methane) | 280–310 (sea level), 310–380 (vacuum) | kN to MN | first stages, reusable boosters |
| storable bipropellant | 290–330 (vacuum) | N to hundreds of kN | spacecraft, orbital manoeuvres |
| monopropellant (hydrazine) | 220–235 | 0.1 N to kN | attitude control, small spacecraft |
| solid motor | 240–300 | kN to MN | strap-on boosters, kick stages |
| hybrid | 250–320 | N to hundreds of kN | sounding and suborbital vehicles |
| Hall-effect thruster | 1500–2500 | mN to N | orbit raising, station keeping, constellations |
| gridded ion thruster | 2500–4500 | mN | deep-space missions |

*Representative ranges from published engine data and Sutton and Biblarz, as of 2026; individual engines vary.*

The table shows the fundamental split. Leaving the ground needs thrust-to-weight ratios above 1 — accelerations of the order of $g$ — which only chemical engines can supply. Once in space, where accelerations of $10^{-5}g$ are acceptable if the mission is long, electric propulsion's propellant savings are decisive.

::: history
The engine cycles in use today were established in the space programmes of the 1960s and 1970s: the gas-generator cycle in large engines such as the F-1 that powered the first stage of the Saturn V (first flight 1967); the expander cycle in the hydrogen–oxygen RL10, first flown on a Centaur upper stage in 1963; and staged combustion in Soviet engines of the 1960s and in the Space Shuttle Main Engine, which first flew in 1981. Large segmented solid boosters flew on the Titan III and the Space Shuttle. Electric propulsion was proposed by Robert Goddard and Konstantin Tsiolkovsky early in the twentieth century; NASA's SERT 1 tested an ion thruster in space in 1964, Soviet satellites carried Hall-effect thrusters from 1971, and NASA's Deep Space 1 (launched 1998) was the first mission to use an ion engine as its primary propulsion, followed by Dawn (launched 2007), which orbited both Vesta and Ceres.
:::

::: summary
- Chemical rockets are energy-limited (high thrust, exhaust velocity up to about $4.5\ \mathrm{km/s}$); electric thrusters are power-limited (exhaust velocities of $15$–$45\ \mathrm{km/s}$, thrust of millinewtons to newtons).
- Pressure-fed liquid systems are simple but tank mass $\tfrac32 pV\rho_m/\sigma$ limits them to low chamber pressures; pump-fed engines need turbopump power $\dot m\Delta p/(\rho\eta)$, supplied by gas-generator, staged-combustion or expander cycles.
- Best $I_{sp}$ is usually fuel-rich because of the lower molar mass; regenerative, film, ablative and radiation cooling protect the walls.
- Solid-motor chamber pressure $p_c = (a\rho_pc^*A_b/A_t)^{1/(1-n)}$ is stable only for $n < 1$ and amplifies changes in burning area by $1/(1-n)$; hybrids avoid the pressure-runaway mechanism and can be throttled.
- Electric thrust $F = 2\eta P/c$; ion exhaust speed $\sqrt{2qV_b/m_i}$; the mission-optimal exhaust velocity balances propellant against power-plant mass, $c_{\text{opt}} = \sqrt{2\eta t/\alpha}$.
- Compare propulsion options by vehicle payload, not by $I_{sp}$ alone.
:::

## Exercises

::: exercise {#exr-tank level=1 check="33.6"}
Using [[#eq-tank-mass]], find the wall mass of a $1.0\ \mathrm{m^3}$ spherical tank at $2.0\ \mathrm{MPa}$ made of an aluminium alloy with $\rho_m = 2800\ \mathrm{kg/m^3}$ and allowable stress $250\ \mathrm{MPa}$. (Enter the mass in kg, rounded to three significant figures.)
::: solution
$m = 1.5 \times 2.0\times10^{6} \times 1.0 \times 2800/2.5\times10^{8} = 33.6\ \mathrm{kg}$.
:::
:::

::: exercise {#exr-ion-speed level=1 check="47.0"}
Find the exhaust speed of singly charged xenon ions ($131.29\ \mathrm{u}$, $1\ \mathrm{u} = 1.6605\times10^{-27}\ \mathrm{kg}$) accelerated through $1500\ \mathrm{V}$. (Enter the speed in km/s, rounded to three significant figures.)
::: solution
$v = \sqrt{2 \times 1.602\times10^{-19} \times 1500/(2.180\times10^{-25})} = 4.70\times10^{4}\ \mathrm{m/s} = 47.0\ \mathrm{km/s}$.
:::
:::

::: exercise {#exr-hall level=1 check="312"}
A Hall thruster uses $5.0\ \mathrm{kW}$ at $I_{sp} = 1800\ \mathrm{s}$ with thrust efficiency $0.55$. Find its thrust. (Enter the thrust in mN, rounded to three significant figures.)
::: solution
$F = 2 \times 0.55 \times 5000/(1800 \times 9.80665) = 0.312\ \mathrm{N} = 312\ \mathrm{mN}$.
:::
:::

::: exercise {#exr-pump level=2 check="28.6"}
A hydrogen pump delivers $40\ \mathrm{kg/s}$ of liquid hydrogen ($\rho = 70\ \mathrm{kg/m^3}$) with a pressure rise of $35\ \mathrm{MPa}$ at an efficiency of $0.70$. Treating the hydrogen as incompressible, find the shaft power, and compare it with the power needed to pump the same mass flow of liquid oxygen ($\rho = 1140\ \mathrm{kg/m^3}$) through the same pressure rise. (Enter the hydrogen pump power in MW, rounded to three significant figures.)
::: solution
$P = \dot m\Delta p/(\rho\eta) = 40 \times 35\times10^{6}/(70 \times 0.70) = 28.6\ \mathrm{MW}$. For oxygen, $P = 40 \times 35\times10^{6}/(1140 \times 0.70) = 1.75\ \mathrm{MW}$ — sixteen times less, the ratio of the densities. Hydrogen pumps must handle a huge volume flow and need many high-speed stages, which is why hydrogen turbopumps are the most demanding machines in rocketry. (At these pressures hydrogen's compressibility is not negligible; the incompressible estimate is a first approximation.)
:::
::: answer
$28.6\ \mathrm{MW}$
:::
:::

::: exercise {#exr-solid-sens level=2 check="1.37"}
A solid propellant has pressure exponent $n = 0.70$. By what factor does the chamber pressure rise if a crack increases the burning surface by $10\,\%$? (Enter the factor rounded to three significant figures.)
::: solution
By [[#prop-solid-pc]], $p_c \propto K^{1/(1-n)} = K^{3.33}$, so the factor is $1.1^{3.33} = 1.37$. With $n = 0.35$ it would be $1.16$.
:::
:::

::: exercise {#exr-copt level=2 check="32.2"}
For a power plant of specific mass $20\ \mathrm{kg/kW}$, thrust efficiency $0.60$ and a thrusting time of $200$ days, find the optimum exhaust velocity [[#eq-c-opt]]. (Enter it in km/s, rounded to three significant figures.)
::: solution
$t = 1.728\times10^{7}\ \mathrm{s}$, $\alpha = 0.020\ \mathrm{kg/W}$: $c_{\text{opt}} = \sqrt{2 \times 0.60 \times 1.728\times10^{7}/0.020} = 3.22\times10^{4}\ \mathrm{m/s} = 32.2\ \mathrm{km/s}$.
:::
:::

::: exercise {#exr-ion-time level=3 check="247"}
Show that, for a thruster of constant thrust $F$ and exhaust velocity $c$, the time to deliver $\Delta v$ to a spacecraft of initial mass $m_0$ is $t = (m_0c/F)\left(1 - e^{-\Delta v/c}\right)$, and check the $247$-day result of example [[#ex-ion]]. (Enter the time in days, rounded to the nearest day.)
::: solution
The propellant used is $m_p = m_0(1 - e^{-\Delta v/c})$ (rocket equation) and it is consumed at the constant rate $\dot m = F/c$, so $t = m_p c/F = (m_0c/F)(1 - e^{-\Delta v/c})$. With $m_0 = 1000\ \mathrm{kg}$, $c = 30\,400\ \mathrm{m/s}$, $F = 0.0908\ \mathrm{N}$, $\Delta v = 2000\ \mathrm{m/s}$: $t = 3.348\times10^{8} \times 0.0637 = 2.13\times10^{7}\ \mathrm{s} = 247$ days. For small $\Delta v/c$ the formula reduces to $t \approx m_0\Delta v/F$, constant-acceleration flight.
:::
:::

::: exercise {#exr-cycle-choice level=3}
**Design discussion.** Choose an engine cycle (gas generator, staged combustion, expander, electric pump) and feed system for (a) the first stage of a reusable medium launcher, (b) a hydrogen–oxygen upper stage that must restart several times, (c) the main engine of a small launcher for 300 kg payloads, (d) the apogee engine of a geostationary satellite. Justify each choice in terms of chamber pressure, specific impulse, complexity, restart capability and reusability.
::: solution
(a) Gas-generator or staged combustion with a dense propellant (kerosene or methane): gas generators are simpler and proven, staged combustion gives higher $I_{sp}$ and chamber pressure; methane's clean combustion eases reuse. (b) Expander cycle: hydrogen's excellent cooling capacity drives the turbine without a combustion device upstream, giving reliable restarts and high $I_{sp}$; the limited turbine power is acceptable for the modest thrust of an upper stage. (c) Electric-pump or gas-generator cycle: at small sizes batteries are acceptable and the cycle is simple and cheap; pressure feeding is possible only with lightweight high-pressure tanks. (d) Pressure-fed storable bipropellant: no turbomachinery, long-term storable, many restarts, $I_{sp}$ around $320\ \mathrm{s}$ — or, increasingly, all-electric orbit raising with Hall thrusters if the operator accepts months of transfer time. There is rarely a single right answer; the reasoning matters.
:::
:::
