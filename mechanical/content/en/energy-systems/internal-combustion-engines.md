A reciprocating internal combustion engine burns its fuel inside the working gas. There is no boiler and no heat exchanger between flame and piston: a charge of air (and, in a petrol engine, fuel) is drawn into a cylinder, squeezed, set alight, and the hot products push the piston down before being thrown away. Because the hottest gas touches the metal only for a few milliseconds per cycle, the peak gas temperature can exceed $2500\ \mathrm{K}$ while the cylinder wall stays below about $500\ \mathrm{K}$ — far hotter than any steam plant or gas turbine could tolerate continuously, and the reason a small engine can reach brake efficiencies above $40\ \%$. The price is that the cycle is unsteady, the combustion is a race against piston motion, and the exhaust leaves at $700$–$1200\ \mathrm{K}$ carrying a large share of the fuel energy with it.

This chapter builds the engineer's description of such an engine in four layers. First the geometry, which fixes the swept volume and the compression ratio. Then the air-standard cycles (Otto, Diesel and the dual cycle), which show how compression ratio and the manner of heat addition set an upper bound on efficiency. Then the performance quantities used on every test bed — indicated and brake work, mean effective pressure, volumetric efficiency, brake specific fuel consumption — tied together by one equation for engine power. Finally the practical limits: knock, throttling, charging, and the pollutants that now shape engine design as much as efficiency does. The thermodynamics of the ideal cycles was introduced in [[thermodynamics/power-cycles]], and the chemistry of fuel–air mixtures in [[thermodynamics/mixtures-combustion]]; here we use both on real machines.

## Geometry and the four-stroke cycle {#sec-geometry}

Picture a single cylinder. The piston moves between **top dead centre** (TDC), where the volume above it is smallest, and **bottom dead centre** (BDC), where it is largest. In a **four-stroke** engine one working cycle takes two crankshaft revolutions: the *intake* stroke draws in charge as the piston descends with the inlet valve open; the *compression* stroke squeezes it with both valves shut; near TDC the charge is ignited — by a spark in a spark-ignition (SI) engine, or by injecting fuel into air that compression has made hot enough to ignite it, in a compression-ignition (CI) or diesel engine — and the *expansion* (power) stroke follows; the *exhaust* stroke pushes the products out. A **two-stroke** engine completes the cycle in one revolution by exchanging gas through ports near BDC, at the cost of poorer scavenging; large marine diesels are two-strokes, almost all car and truck engines four-strokes.

::: definition Engine geometry {#def-geometry}
For a cylinder of **bore** $B$ and **stroke** $L$ (piston travel from TDC to BDC, equal to twice the crank radius):

- the **displaced (swept) volume** per cylinder is $V_d = \dfrac{\pi B^2}{4} L$, and the engine displacement is $n_c V_d$ for $n_c$ cylinders;
- the **clearance volume** $V_c$ is the volume above the piston at TDC; the cylinder volume at BDC is $V_c + V_d$;
- the **compression ratio** is $r = \dfrac{V_c + V_d}{V_c} = \dfrac{V_\text{BDC}}{V_\text{TDC}}$ — a ratio of volumes, not of pressures;
- the **mean piston speed** at crankshaft speed $N$ (revolutions per second) is $\bar U_p = 2 L N$;
- $n_R$ is the number of crank revolutions per power stroke of each cylinder: $n_R = 2$ for a four-stroke, $n_R = 1$ for a two-stroke.
:::

Mean piston speed is the natural speed scale of an engine. Friction, inertia loads and the pressure drop through the valves all grow with it, and it stays within a narrow band across engines of very different size: roughly $8$–$15\ \mathrm{m/s}$ at rated speed for large diesels and up to about $20\ \mathrm{m/s}$ for high-revving car engines. A large engine therefore turns slowly, and a small one fast, at the same $\bar U_p$.

::: example The geometry of a 2-litre engine {#ex-geometry}
A four-cylinder, four-stroke petrol engine has bore $84\ \mathrm{mm}$, stroke $90\ \mathrm{mm}$ and compression ratio $12$. Find the displacement, the clearance volume per cylinder and the mean piston speed at $6000\ \mathrm{rev/min}$.
::: solution
Swept volume per cylinder:
$$
V_d = \frac{\pi (0.084\ \mathrm{m})^2}{4} \times 0.090\ \mathrm{m} = 4.988\times10^{-4}\ \mathrm{m^3} = 498.8\ \mathrm{cm^3},
$$
so the engine displacement is $4 \times 498.8 = 1995\ \mathrm{cm^3}$, a "2.0 litre" engine. From $r = (V_c + V_d)/V_c$,
$$
V_c = \frac{V_d}{r - 1} = \frac{498.8\ \mathrm{cm^3}}{11} = 45.3\ \mathrm{cm^3}.
$$
At $N = 6000/60 = 100\ \mathrm{rev/s}$ the mean piston speed is $\bar U_p = 2 \times 0.090\ \mathrm{m} \times 100\ \mathrm{s^{-1}} = 18.0\ \mathrm{m/s}$.

*Check:* the clearance volume is a little under a tenth of the swept volume, as it must be for $r = 12$ ($V_\text{BDC}/V_\text{TDC} = 544.1/45.3 = 12.0$), and $18\ \mathrm{m/s}$ sits at the top of the normal range for a production car engine at rated speed.
:::
:::

## Air-standard cycles {#sec-cycles}

The real engine cycle involves a chemically reacting, leaking, unsteady flow. To see what controls its efficiency we strip it to an **air-standard cycle**: a fixed mass of air, an ideal gas with constant specific heats (the *cold-air standard*, $c_p = 1.005\ \mathrm{kJ/(kg\,K)}$, $c_v = 0.718\ \mathrm{kJ/(kg\,K)}$, $k = 1.4$, $R = 0.287\ \mathrm{kJ/(kg\,K)}$), combustion replaced by heat addition from outside, exhaust and intake replaced by heat rejection at constant volume, and every process internally reversible. The three classical cycles differ only in how the heat is added.

::: proposition Efficiency of the Otto cycle {#prop-otto}
The Otto cycle consists of isentropic compression $1 \to 2$, heat addition at constant volume $2 \to 3$, isentropic expansion $3 \to 4$ and heat rejection at constant volume $4 \to 1$. Under the cold-air-standard assumptions its thermal efficiency is
$$
\eta_\text{Otto} = 1 - \frac{1}{r^{\,k-1}},
$$ {#eq-otto}
which depends only on the compression ratio $r$ and the ratio of specific heats $k$.
:::

::: proof
Per unit mass, with constant $c_v$, the heat added and rejected are $q_\text{in} = c_v (T_3 - T_2)$ and $q_\text{out} = c_v (T_4 - T_1)$, so $\eta = 1 - q_\text{out}/q_\text{in} = 1 - (T_4 - T_1)/(T_3 - T_2)$. For an isentropic process of an ideal gas with constant $k$, $T v^{k-1}$ is constant. Compression and expansion run between the same two volumes, $v_1/v_2 = v_4/v_3 = r$, hence
$$
\frac{T_2}{T_1} = r^{\,k-1} = \frac{T_3}{T_4}
\quad\Longrightarrow\quad
T_2 = r^{\,k-1} T_1, \qquad T_3 = r^{\,k-1} T_4 .
$$
Substituting, $T_3 - T_2 = r^{\,k-1}(T_4 - T_1)$, and the ratio of the rejected to the added heat is $1/r^{\,k-1}$, which gives [[#eq-otto]]. The assumptions used were: ideal gas, constant specific heats, reversible adiabatic compression and expansion, and heat exchange at exactly constant volume (instantaneous combustion at TDC).
:::

The diesel engine was conceived to add heat more slowly — fuel is injected over a period of crank angle while the piston has already begun to descend — and the limiting idealisation is heat addition at constant pressure. Real engines of both kinds lie between constant-volume and constant-pressure heat addition, so the most useful single model is the **dual** (or limited-pressure) cycle, which contains both as limits.

::: definition The dual cycle {#def-dual}
The **dual cycle** is: isentropic compression $1 \to 2$ through compression ratio $r = v_1/v_2$; heat addition at constant volume $2 \to 3$, raising the pressure by the **pressure ratio** $\alpha = p_3/p_2$; further heat addition at constant pressure $3 \to 4$, with **cut-off ratio** $\beta = v_4/v_3$; isentropic expansion $4 \to 5$ to $v_5 = v_1$; and heat rejection at constant volume $5 \to 1$. The Otto cycle is the case $\beta = 1$, the Diesel cycle the case $\alpha = 1$.
:::

::: proposition Efficiency of the dual and Diesel cycles {#prop-dual}
Under the cold-air-standard assumptions the dual cycle has thermal efficiency
$$
\eta_\text{dual} = 1 - \frac{1}{r^{\,k-1}} \, \frac{\alpha \beta^{k} - 1}{(\alpha - 1) + k\alpha(\beta - 1)},
$$ {#eq-dual}
and putting $\alpha = 1$ gives the Diesel-cycle efficiency
$$
\eta_\text{Diesel} = 1 - \frac{1}{r^{\,k-1}} \, \frac{\beta^{k} - 1}{k(\beta - 1)}.
$$ {#eq-diesel}
:::

::: proof
Express every temperature in terms of $T_1$. Isentropic compression: $T_2 = T_1 r^{\,k-1}$. Constant volume: $T_3 = T_2\, p_3/p_2 = \alpha T_1 r^{\,k-1}$. Constant pressure: $T_4 = T_3\, v_4/v_3 = \alpha\beta T_1 r^{\,k-1}$. For the expansion, $v_5/v_4 = (v_1/v_2)(v_3/v_4) = r/\beta$ (using $v_3 = v_2$), so
$$
T_5 = T_4 \left(\frac{\beta}{r}\right)^{k-1} = \alpha\beta T_1 r^{\,k-1}\,\frac{\beta^{k-1}}{r^{\,k-1}} = \alpha \beta^{k} T_1 .
$$
The heat added is $q_\text{in} = c_v(T_3 - T_2) + c_p(T_4 - T_3)$ and the heat rejected $q_\text{out} = c_v(T_5 - T_1)$. Dividing by $c_v$ and using $c_p/c_v = k$,
$$
\frac{q_\text{out}}{q_\text{in}} = \frac{T_1(\alpha\beta^{k} - 1)}{T_1 r^{\,k-1}\left[(\alpha - 1) + k\alpha(\beta - 1)\right]},
$$
and $\eta = 1 - q_\text{out}/q_\text{in}$ is [[#eq-dual]]. With $\alpha = 1$ the denominator becomes $k(\beta - 1)$, giving [[#eq-diesel]]; with $\beta \to 1$ the fraction tends to $(\alpha - 1)/(\alpha - 1) = 1$ and the Otto result [[#eq-otto]] is recovered. Assumptions as for [[#prop-otto]].
:::

The factor multiplying $1/r^{\,k-1}$ in [[#eq-diesel]] is greater than $1$ for every $\beta > 1$ (expand $\beta^k$ about $\beta = 1$ to see that it is $1 + \tfrac{1}{2}(k-1)(\beta - 1) + \dots$). So **at the same compression ratio the Otto cycle is the more efficient**: heat added at constant pressure is added partly during expansion, and is therefore expanded through a smaller volume ratio. The diesel engine wins in practice because it is not held to the same compression ratio: it compresses air alone, which cannot knock, and runs at $r = 15$–$22$ where a petrol engine is limited to about $10$–$13$.

::: example An air-standard Otto cycle {#ex-otto}
An Otto cycle with $r = 10$ starts at $p_1 = 100\ \mathrm{kPa}$, $T_1 = 300\ \mathrm{K}$, and receives $q_\text{in} = 1800\ \mathrm{kJ/kg}$ of heat. Using the cold-air standard, find the peak temperature and pressure, the net work, the thermal efficiency and the mean effective pressure.
::: solution
Compression, with $r^{\,k-1} = 10^{0.4} = 2.512$:
$$
T_2 = 300 \times 2.512 = 753.6\ \mathrm{K}, \qquad p_2 = 100 \times 10^{1.4} = 2512\ \mathrm{kPa}.
$$
Heat addition: $T_3 = T_2 + q_\text{in}/c_v = 753.6 + 1800/0.718 = 3261\ \mathrm{K}$, and $p_3 = p_2 T_3/T_2 = 10\,870\ \mathrm{kPa}$ ($10.9\ \mathrm{MPa}$).
Expansion: $T_4 = T_3/2.512 = 1298\ \mathrm{K}$. Heat rejected $q_\text{out} = 0.718\,(1298 - 300) = 716.6\ \mathrm{kJ/kg}$, net work $w = 1800 - 716.6 = 1083\ \mathrm{kJ/kg}$, and
$$
\eta = \frac{1083}{1800} = 0.602 = 1 - 10^{-0.4} .
$$
The **mean effective pressure** is the constant pressure that, acting over the whole stroke, would do the net work: with $v_1 = R T_1/p_1 = 0.287 \times 300/100 = 0.861\ \mathrm{m^3/kg}$ and $v_2 = v_1/10$,
$$
\text{mep} = \frac{w}{v_1 - v_2} = \frac{1083\ \mathrm{kJ/kg}}{0.775\ \mathrm{m^3/kg}} = 1398\ \mathrm{kPa} \approx 1.40\ \mathrm{MPa}.
$$
*Check:* the efficiency from the state temperatures agrees with [[#eq-otto]]. The peak temperature of $3260\ \mathrm{K}$ is too high — real gas properties and dissociation would hold it near $2700$–$2800\ \mathrm{K}$ — which is the first sign that the cold-air standard overstates efficiency.
:::
:::

::: example A dual cycle for a diesel engine {#ex-dual}
A diesel engine is modelled as a dual cycle with $r = 16$, pressure ratio $\alpha = 1.5$ and cut-off ratio $\beta = 1.6$, starting at $T_1 = 300\ \mathrm{K}$. Find the state temperatures, the heat added per kilogram of air and the efficiency. Compare with an Otto cycle and a Diesel cycle of the same compression ratio.
::: solution
$T_2 = 300 \times 16^{0.4} = 909.4\ \mathrm{K}$; $T_3 = 1.5 \times 909.4 = 1364\ \mathrm{K}$; $T_4 = 1.6 \times 1364 = 2183\ \mathrm{K}$; $T_5 = \alpha\beta^{k} T_1 = 1.5 \times 1.6^{1.4} \times 300 = 868.9\ \mathrm{K}$.
Heat added: $q_\text{in} = 0.718\,(1364 - 909.4) + 1.005\,(2183 - 1364) = 326.4 + 822.7 = 1149\ \mathrm{kJ/kg}$. Heat rejected: $q_\text{out} = 0.718\,(868.9 - 300) = 408.5\ \mathrm{kJ/kg}$. Hence
$$
\eta = 1 - \frac{408.5}{1149} = 0.645 ,
$$
in agreement with [[#eq-dual]]: $1 - 16^{-0.4} \times (1.5 \times 1.6^{1.4} - 1)/(0.5 + 1.4 \times 1.5 \times 0.6) = 0.645$.
At $r = 16$ the Otto cycle would give $1 - 16^{-0.4} = 0.670$, and a pure Diesel cycle with $\beta = 2$ gives $0.614$.

*Check:* the dual-cycle result lies between the Otto and Diesel values, as it must, and moves towards the Otto value as more of the heat is added at constant volume.
:::
:::

::: widget plot
f: 1 - x^(1-k); 1 - x^(1-k)*(b^k - 1)/(k*(b - 1))
x: 4, 24
y: 0, 0.8
sliders: k=1.4:1.25:1.4:0.01; b=2:1.1:4:0.1
labels: \eta_\text{Otto}; \eta_\text{Diesel}\ (\beta = b)
vlines: 10; 18
caption: Air-standard efficiency against compression ratio $r$ for the Otto cycle and for the Diesel cycle with cut-off ratio $\beta = b$. The vertical lines mark typical petrol ($r \approx 10$) and diesel ($r \approx 18$) engines. Increase $b$ (more fuel, longer injection) and the Diesel curve drops: a diesel engine is *more* efficient at light load, when cut-off is short. Lower $k$ towards $1.3$, a better average for hot combustion products, and both curves fall by about ten percentage points — the size of the error made by the cold-air standard. Compare the Otto curve at $r = 10$ with the Diesel curve at $r = 18$: the diesel's advantage comes from its compression ratio, not from its cycle.
:::

## Why real engines fall short of the air-standard cycle {#sec-real}

A good modern petrol engine with $r = 12$ reaches a peak brake efficiency of about $40\ \%$ against an air-standard $63\ \%$. The gap has five main causes, which are worth naming separately because each has a different remedy.

1. **Real working-fluid properties.** The specific heats of combustion products rise with temperature, and at the peak temperatures of a stoichiometric flame some $\mathrm{CO_2}$ and $\mathrm{H_2O}$ dissociate, absorbing energy that is only partly returned during expansion. An effective $k$ of about $1.3$ instead of $1.4$ reduces the Otto efficiency at $r = 10$ from $60.2\ \%$ to $49.9\ \%$. The *fuel–air cycle*, computed with equilibrium properties of the actual mixture, is the better ideal to measure an engine against.
2. **Heat transfer.** Gas at $2500\ \mathrm{K}$ in contact with walls at $400$–$500\ \mathrm{K}$ loses heat throughout combustion and early expansion. In round numbers a comparable amount of fuel energy leaves through the coolant and through the exhaust, each typically a quarter to a third.
3. **Finite combustion time.** The flame takes $40$–$60°$ of crank angle to cross the chamber; burning before TDC wastes compression work, burning after it expands through a smaller volume ratio. Ignition timing is set to give maximum brake torque (MBT) as a compromise.
4. **Gas exchange (pumping).** Pushing exhaust out and drawing charge in costs work. In an SI engine at part load the throttle holds the intake manifold well below atmospheric pressure, and the pumping loss becomes large (see [[#sec-load]]).
5. **Mechanical friction and accessories.** Piston rings and skirts, bearings, valve train, oil and coolant pumps consume a fraction of the indicated work that grows with speed and dominates at light load.

The first three reduce the *indicated* work, measured from the cylinder pressure; the fourth and fifth separate indicated from *brake* work, measured at the crankshaft. The vocabulary of engine testing keeps these apart.

## Engine performance parameters {#sec-performance}

::: definition Work, mean effective pressure and efficiency {#def-performance}
For one cylinder over one cycle:

- **Indicated work** $W_i = \oint p\,\mathrm{d}V$ is the work done by the gas on the piston, obtained from the measured cylinder pressure. *Gross* indicated work is taken over compression and expansion only; *net* indicated work includes the pumping loop.
- **Brake power** $P_b = 2\pi N T$ is the power at the crankshaft, from the torque $T$ measured on a dynamometer at speed $N$ (rev/s). **Friction power** is $P_f = P_i - P_b$, and the **mechanical efficiency** is $\eta_m = P_b/P_i$.
- **Mean effective pressure** is work per cycle divided by displaced volume: $\text{mep} = W/V_d$. With $n_R$ revolutions per cycle, $P = \text{mep}\, V_d\, N/n_R$ for the whole engine (using the total displacement). The indicated, brake and friction values are written imep, bmep and fmep, with $\text{bmep} = \text{imep} - \text{fmep}$.
- **Brake specific fuel consumption** is fuel mass flow per unit brake power, $\text{bsfc} = \dot m_f/P_b$, usually quoted in $\mathrm{g/kWh}$.
- **Brake thermal (fuel conversion) efficiency** is $\eta_b = P_b/(\dot m_f Q_\text{LHV})$, based on the lower heating value $Q_\text{LHV}$ of the fuel.
- **Volumetric efficiency** of a four-stroke engine is $\eta_v = \dfrac{2\dot m_a}{\rho_{a,i} V_d N}$: the air actually inducted, divided by the air that would fill the displaced volume at the inlet density $\rho_{a,i}$.
:::

Mean effective pressure is the most useful number for comparing engines of different sizes: it measures how hard each litre of displacement is worked, independent of size and speed. Naturally aspirated petrol engines reach a maximum bmep of about $1.0$–$1.3\ \mathrm{MPa}$; turbocharged car engines $2$–$2.5\ \mathrm{MPa}$; heavy truck diesels over $2\ \mathrm{MPa}$. Torque and bmep are proportional: from $P_b = 2\pi N T = \text{bmep}\,V_d N/n_R$,
$$
\text{bmep} = \frac{2\pi n_R\, T}{V_d}, \qquad\text{so for a four-stroke}\quad \text{bmep} = \frac{4\pi T}{V_d}.
$$ {#eq-bmep}

Specific fuel consumption and efficiency carry the same information. From the definitions, $\text{bsfc} = \dot m_f/P_b = 1/(\eta_b Q_\text{LHV})$. With $Q_\text{LHV}$ in $\mathrm{MJ/kg}$ and $1\ \mathrm{kWh} = 3.6\ \mathrm{MJ}$,
$$
\text{bsfc}\ [\mathrm{g/kWh}] = \frac{3600}{\eta_b\, Q_\text{LHV}\ [\mathrm{MJ/kg}]}.
$$ {#eq-bsfc}
For diesel fuel ($Q_\text{LHV} \approx 42.8\ \mathrm{MJ/kg}$) a bsfc of $200\ \mathrm{g/kWh}$ means $\eta_b = 0.42$; for petrol ($\approx 43$–$44\ \mathrm{MJ/kg}$) the best car engines reach about $210$–$230\ \mathrm{g/kWh}$.

::: warning Four slips that wreck engine calculations
**Forgetting $n_R$.** A four-stroke cylinder fires once every *two* revolutions. Writing $P = \text{bmep}\,V_d N$ for a four-stroke doubles the power. **Mixing imep and bmep.** Efficiencies and mep values must be on the same basis: indicated quantities with indicated efficiency, brake with brake; the difference is friction. **Heating value.** Engine efficiencies and bsfc are conventionally based on the *lower* heating value; using the higher value lowers $\eta_b$ by about $6$–$7\ \%$ of itself for liquid hydrocarbons. **Wrong reference density for $\eta_v$.** Volumetric efficiency is defined with the density at the inlet *to the engine* — after the compressor and intercooler in a turbocharged engine — not ambient density; with ambient density a turbocharged engine shows "$\eta_v > 2$", which is not an efficiency at all.
:::

### The power equation {#sec-power-equation}

All of these quantities combine into a single relation that explains how designers get power out of an engine.

::: proposition The engine power equation {#prop-power}
For an engine of total displacement $V_d$ running at $N$ rev/s with $n_R$ revolutions per cycle, the brake power is
$$
P_b = \frac{\eta_b\, \eta_v\, \rho_{a,i}\, V_d\, N\, (F/A)\, Q_\text{LHV}}{n_R},
$$ {#eq-power}
where $F/A$ is the fuel–air mass ratio. Equivalently, $\text{bmep} = \eta_b\, \eta_v\, \rho_{a,i}\, (F/A)\, Q_\text{LHV}$.
:::

::: proof
By definition of volumetric efficiency, generalised to $n_R$ revolutions per cycle, the air mass inducted per cycle is $\eta_v \rho_{a,i} V_d$ and the number of cycles per second is $N/n_R$, so $\dot m_a = \eta_v \rho_{a,i} V_d N/n_R$. The fuel flow is $\dot m_f = (F/A)\,\dot m_a$, and the fuel energy rate $\dot m_f Q_\text{LHV}$. Multiplying by the brake efficiency gives [[#eq-power]]. Dividing by $V_d N/n_R$ and using $P_b = \text{bmep}\, V_d N/n_R$ gives the bmep form. No thermodynamic assumption is made: this is book-keeping, and its value lies in separating the factors.
:::

The equation lists the designer's levers. **$V_d$ and $N$**: a bigger or faster engine — limited by mass, friction and mean piston speed. **$\eta_b$**: better combustion and less heat loss and friction. **$\eta_v$**: good port and valve design, tuned intake and exhaust, variable valve timing — typically $0.80$–$0.95$ at full load for naturally aspirated engines. **$\rho_{a,i}$**: compress and cool the intake air (turbocharging with intercooling). **$F/A$**: a petrol engine runs close to stoichiometric because its catalyst requires it; a diesel must stay lean (about $20$–$50\ \%$ excess air at full load) to burn its fuel without smoke, which is why it needs a turbocharger to compete on power.

::: algorithm Estimating engine performance from a specification {#alg-performance}
1. From bore, stroke and number of cylinders compute $V_d$ (whole engine), and check $\bar U_p = 2LN$ at rated speed.
2. Find the inlet density $\rho_{a,i} = p_i/(R T_i)$ from manifold (or boost) pressure and temperature, in kelvin and absolute pressure.
3. Choose or measure $\eta_v$, and fix $F/A$ from the stoichiometric ratio and the equivalence ratio: $F/A = \phi\,(F/A)_s = 1/(\lambda\,(A/F)_s)$.
4. Compute $\dot m_a = \eta_v \rho_{a,i} V_d N/n_R$ and $\dot m_f = (F/A)\,\dot m_a$.
5. With an estimated brake efficiency, $P_b = \eta_b \dot m_f Q_\text{LHV}$; then torque $T = P_b/(2\pi N)$, $\text{bmep}$ from [[#eq-bmep]], and bsfc from [[#eq-bsfc]].
6. Sanity-check: bmep within the range for the engine type, $\bar U_p$ below about $20\ \mathrm{m/s}$, exhaust $\mathrm{CO_2}$ consistent with fuel carbon.
:::

::: example Rated power of a naturally aspirated petrol engine {#ex-power-si}
The 2.0 litre engine of [[#ex-geometry]] ($V_d = 1.995\times10^{-3}\ \mathrm{m^3}$) runs at full throttle at $5500\ \mathrm{rev/min}$ with $\eta_v = 0.90$ referred to ambient air at $101.3\ \mathrm{kPa}$ and $25\ °\mathrm{C}$. The mixture has $A/F = 14.6$, the fuel $Q_\text{LHV} = 43.0\ \mathrm{MJ/kg}$, and the brake efficiency at this point is $0.30$. Find the brake power, torque, bmep and bsfc.
::: solution
Inlet density: $\rho_a = 101.3/(0.287 \times 298.15) = 1.184\ \mathrm{kg/m^3}$. With $N = 91.67\ \mathrm{rev/s}$ and $n_R = 2$,
$$
\dot m_a = 0.90 \times 1.184 \times 1.995\times10^{-3} \times \frac{91.67}{2} = 0.0974\ \mathrm{kg/s}, \qquad \dot m_f = \frac{0.0974}{14.6} = 6.67\ \mathrm{g/s}.
$$
Brake power: $P_b = 0.30 \times 6.67\times10^{-3}\ \mathrm{kg/s} \times 43.0\times10^{6}\ \mathrm{J/kg} = 86.1\ \mathrm{kW}$.
Torque: $T = 86\,100/(2\pi \times 91.67) = 149\ \mathrm{N\,m}$. bmep from [[#eq-bmep]]: $4\pi \times 149.5/1.995\times10^{-3} = 942\ \mathrm{kPa}$. bsfc: $3600/(0.30 \times 43.0) = 279\ \mathrm{g/kWh}$.

*Check:* $43\ \mathrm{kW}$ per litre and a bmep under $1\ \mathrm{MPa}$ at high speed are typical of a naturally aspirated engine; the efficiency of $30\ \%$ at full power is below the engine's best ($\approx 35$–$40\ \%$ at mid speed and high load) because friction and heat loss per cycle grow at high speed and the mixture may be enriched for component protection.
:::
:::

## Mixture strength, knock and load control {#sec-load}

::: definition Equivalence ratio and excess-air ratio {#def-phi}
The **equivalence ratio** is $\phi = \dfrac{(F/A)}{(F/A)_s}$, the actual fuel–air ratio divided by the stoichiometric one; the **relative air–fuel ratio** (excess-air ratio) is $\lambda = 1/\phi$. Mixtures with $\phi < 1$ ($\lambda > 1$) are *lean*, with $\phi > 1$ *rich*.
:::

For iso-octane, $\mathrm{C_8H_{18}} + 12.5\,(\mathrm{O_2} + 3.76\,\mathrm{N_2}) \to 8\,\mathrm{CO_2} + 9\,\mathrm{H_2O} + 47\,\mathrm{N_2}$, so the stoichiometric air–fuel ratio is $12.5 \times 4.76 \times 28.97/114.23 = 15.1$. Commercial petrol, with aromatics and oxygenates, is nearer $14.6$–$14.7$, and diesel fuel about $14.5$.

**Knock.** In an SI engine the flame starts at the plug and propagates across a premixed charge. The unburned *end gas* ahead of it is compressed and heated by the expanding burned gas; if its temperature and pressure stay high for long enough, it autoignites before the flame arrives. The resulting near-instant release of energy sends pressure waves ringing through the chamber — the audible "knock" — and, sustained, erodes pistons and blows head gaskets. Because the end-gas temperature after compression rises roughly as $r^{\,k-1}$, knock is what limits the compression ratio of SI engines, and hence their air-standard efficiency. The fuel's resistance to autoignition is its **octane number**; engine design (compact chambers, cooled exhaust gas recirculation, direct injection whose evaporating fuel cools the charge, knock sensors that retard the spark) buys a little more compression ratio.

A diesel cannot knock in this sense, because the cylinder contains only air until injection; it relies on autoignition, and its fuel is chosen to ignite *easily* (high **cetane number**). This is why diesels run at $r = 15$–$22$.

**Load control.** A petrol engine with a three-way catalyst must stay at $\lambda \approx 1$, so it can reduce power only by reducing the *amount* of mixture: a throttle lowers the intake manifold pressure. The piston then pulls against a partial vacuum on every intake stroke. With manifold pressure $p_i$ and exhaust back-pressure $p_e$ the pumping mean effective pressure is roughly $\text{pmep} \approx p_e - p_i$ — at light load with $p_i = 40\ \mathrm{kPa}$ and $p_e = 105\ \mathrm{kPa}$ about $65\ \mathrm{kPa}$, a large fraction of a bmep that might itself be only $200\ \mathrm{kPa}$. A diesel is unthrottled: it controls load by injecting less fuel into a full charge of air (quality control rather than quantity control), and its part-load efficiency is correspondingly better. Variable valve timing (early or late inlet-valve closing), cylinder deactivation, and hybrid drivetrains that keep the engine at high load are the petrol engine's answers.

::: quiz
A petrol engine and a diesel engine have the same peak brake efficiency. Which statement best explains why the diesel usually uses less fuel in urban driving?
- [ ] The Diesel cycle is more efficient than the Otto cycle at the same compression ratio.
- [x] The diesel is unthrottled, so at light load it avoids most of the pumping loss, and its short injection (small cut-off ratio) raises its cycle efficiency.
- [ ] Diesel fuel has a much higher heating value per kilogram than petrol.
- [ ] The diesel's catalyst recovers part of the exhaust energy.
::: solution
At the same compression ratio the Otto cycle is the more efficient ([[#prop-dual]]), so option 1 is false; the lower heating values of diesel ($\approx 42.8\ \mathrm{MJ/kg}$) and petrol ($\approx 43$–$44\ \mathrm{MJ/kg}$) are nearly equal per kilogram (diesel is denser, so it carries more energy per litre, but that does not change efficiency); and after-treatment recovers no work. The diesel's advantage at light load is that it controls power by fuel quantity alone: no throttle, little pumping work, and a cut-off ratio near $1$ that moves its cycle towards the Otto limit at its high compression ratio.
:::
:::

## Turbocharging and intercooling {#sec-turbo}

The power equation shows that power density scales with intake air density. A **turbocharger** uses a turbine in the exhaust — recovering part of the energy that would otherwise be thrown away — to drive a centrifugal compressor on the intake. Compression heats the air, which works against the purpose: by the definition of compressor isentropic efficiency $\eta_c$, the outlet temperature is
$$
T_2 = T_1\left[1 + \frac{\pi_c^{(k-1)/k} - 1}{\eta_c}\right],
$$ {#eq-compressor}
for pressure ratio $\pi_c = p_2/p_1$. An **intercooler** (charge-air cooler) with effectiveness $\varepsilon$, cooled by ambient air at $T_1$, brings the temperature down to $T_3 = T_2 - \varepsilon(T_2 - T_1)$. The density ratio relative to ambient is then $\rho_3/\rho_1 = \pi_c\,T_1/T_3$ (neglecting the intercooler pressure drop). Cooler charge also lowers the end-gas and flame temperatures, reducing knock in SI engines and $\mathrm{NO}_x$ in diesels.

::: example Charge density with and without intercooling {#ex-turbo}
A turbocharger compressor with $\eta_c = 0.75$ raises ambient air at $100\ \mathrm{kPa}$, $25\ °\mathrm{C}$ to $250\ \mathrm{kPa}$. Find the compressor outlet temperature and the density ratio $\rho/\rho_\text{amb}$ without an intercooler and with one of effectiveness $0.80$.
::: solution
$\pi_c^{(k-1)/k} = 2.5^{0.2857} = 1.2992$. From [[#eq-compressor]],
$$
T_2 = 298.15\left[1 + \frac{0.2992}{0.75}\right] = 417.1\ \mathrm{K}\ (144\ °\mathrm{C}).
$$
Without intercooling: $\rho_2/\rho_1 = 2.5 \times 298.15/417.1 = 1.79$. With intercooling: $T_3 = 417.1 - 0.80\,(417.1 - 298.15) = 321.9\ \mathrm{K}$ ($49\ °\mathrm{C}$), and $\rho_3/\rho_1 = 2.5 \times 298.15/321.9 = 2.32$.

*Check:* the intercooler raises the delivered air mass, and hence the potential power at a fixed $\phi$, by $2.32/1.79 = 1.30$ — a $30\ \%$ gain for no extra boost. The charge is still warmer than ambient, so the density ratio stays below the pressure ratio, as it must.
:::
:::

::: widget plot
f: x/(1 + (x^(2/7) - 1)/c); x/(1 + (1 - w)*(x^(2/7) - 1)/c); x
x: 1, 4
y: 1, 4
sliders: c=0.75:0.6:0.9:0.01; w=0.8:0:1:0.05
labels: \text{no intercooler}; \text{intercooler},\ \varepsilon = w; \text{isothermal limit}
caption: Charge-density ratio $\rho/\rho_\text{amb}$ against compressor pressure ratio $\pi_c$ (horizontal axis), for compressor efficiency $c$ and intercooler effectiveness $w$, with $k = 1.4$. The straight line is the unattainable ideal of compression without heating. Drag $w$ to $0$ and the two curves coincide; drag it to $1$ and the intercooled curve reaches the straight line. Notice how quickly the uncooled curve bends over: at $\pi_c = 3.5$ heating throws away more than a third of the density gain, which is why every modern turbocharged engine has a charge-air cooler.
:::

The power equation now explains the modern heavy-duty diesel.

::: example A turbocharged truck diesel {#ex-truck}
A $13.0\ \mathrm{L}$ six-cylinder four-stroke truck diesel runs at $1500\ \mathrm{rev/min}$ with intake manifold conditions $250\ \mathrm{kPa}$ and $320\ \mathrm{K}$ after the intercooler. Volumetric efficiency is $0.95$, the excess-air ratio $\lambda = 1.5$ with $(A/F)_s = 14.5$, the fuel has $Q_\text{LHV} = 42.8\ \mathrm{MJ/kg}$ and carbon mass fraction $0.862$, and the brake efficiency is $0.45$. Find the brake power, torque, bmep, bsfc, and the $\mathrm{CO_2}$ emitted per kWh.
::: solution
$\rho_{a,i} = 250/(0.287 \times 320) = 2.722\ \mathrm{kg/m^3}$; $N = 25\ \mathrm{rev/s}$.
$$
\dot m_a = 0.95 \times 2.722 \times 0.0130 \times \frac{25}{2} = 0.420\ \mathrm{kg/s}, \qquad
\dot m_f = \frac{0.420}{1.5 \times 14.5} = 19.3\ \mathrm{g/s}.
$$
$P_b = 0.45 \times 0.01932 \times 42.8\times10^{6} = 372\ \mathrm{kW}$. Torque $T = 372\,100/(2\pi \times 25) = 2370\ \mathrm{N\,m}$; $\text{bmep} = 4\pi \times 2369/0.0130 = 2.29\ \mathrm{MPa}$. From [[#eq-bsfc]], $\text{bsfc} = 3600/(0.45 \times 42.8) = 187\ \mathrm{g/kWh}$.
Each kilogram of fuel contains $0.862\ \mathrm{kg}$ of carbon, which becomes $0.862 \times 44.01/12.011 = 3.16\ \mathrm{kg}$ of $\mathrm{CO_2}$. Per kWh: $0.187\ \mathrm{kg} \times 3.16 = 0.590\ \mathrm{kg\ CO_2/kWh}$.

*Check:* $372\ \mathrm{kW}$ ($\approx 500\ \mathrm{hp}$) and $2.3\ \mathrm{MPa}$ bmep are typical of a current long-haul truck engine. Without the turbocharger ($\rho \approx 1.18$) the same engine would give only about $160\ \mathrm{kW}$. The $\mathrm{CO_2}$ intensity is lower than that of a coal power station and higher than that of a combined-cycle gas plant (compare [[energy-systems/energy-economics-emissions]]).
:::
:::

As of 2025 the best published figures for reciprocating engines are in the low fifties of per cent: Weichai Power reported a heavy-duty diesel with a brake thermal efficiency of $53.09\ \%$ in April 2024, certified by TÜV SÜD and CATARC, on a test bed and with waste-heat recovery excluded. For petrol engines, Toyota's 2.0 L "Dynamic Force" engines were announced in 2018 with maximum thermal efficiencies of $40\ \%$ (conventional) and $41\ \%$ (hybrid version). Large two-stroke marine diesels, running at very low speed with very long strokes, reach similar or higher efficiencies. These are peak values at the best operating point; averaged over a driving cycle, a car engine achieves much less.

## Emissions {#sec-emissions}

An engine burning a hydrocarbon completely in excess air would emit only $\mathrm{CO_2}$, $\mathrm{H_2O}$, $\mathrm{N_2}$ and $\mathrm{O_2}$. The $\mathrm{CO_2}$ is unavoidable for a fossil fuel — it is fixed by the carbon content, as in [[#ex-truck]] — and is reduced only by burning less fuel or a lower-carbon fuel. The regulated pollutants arise from departures from ideal combustion:

- **Nitrogen oxides ($\mathrm{NO}_x$)** form from atmospheric nitrogen and oxygen in the hottest burned gas (the thermal, or Zel'dovich, mechanism). Formation rises steeply with temperature and needs free oxygen, so it peaks slightly lean of stoichiometric. Remedies: lower flame temperatures (exhaust gas recirculation, retarded timing, charge cooling) and after-treatment.
- **Carbon monoxide (CO)** results from a shortage of oxygen: it is large in rich mixtures and small in lean ones.
- **Unburned hydrocarbons (HC)** come from fuel that escapes the flame: in crevices around the piston rings, in the quench layer near cold walls, absorbed in oil films, and during cold starts.
- **Particulate matter (PM)**, mainly soot, forms in the fuel-rich cores of diesel sprays and, to a lesser degree, in direct-injection petrol engines.

The **three-way catalyst** of a petrol engine oxidises CO and HC and reduces $\mathrm{NO}_x$ simultaneously, but only in a narrow window around $\lambda = 1$: lean, there is too much oxygen to reduce $\mathrm{NO}_x$; rich, too little to oxidise CO and HC. An oxygen sensor in the exhaust and closed-loop fuel control hold the mixture in that window, which is why throttling — not leaning — is the SI engine's load control. Diesels run lean, so they cannot use a three-way catalyst. Instead a diesel oxidation catalyst removes CO and HC, a diesel particulate filter traps soot and periodically burns it off, and **selective catalytic reduction** (SCR) reduces $\mathrm{NO}_x$ with ammonia produced from an injected urea solution (32.5 % urea in water, sold as AdBlue or DEF), via the overall reaction $4\,\mathrm{NO} + 4\,\mathrm{NH_3} + \mathrm{O_2} \to 4\,\mathrm{N_2} + 6\,\mathrm{H_2O}$. A trade-off runs through diesel calibration: hot, early combustion is efficient and makes little soot but much $\mathrm{NO}_x$; cooler, later combustion makes less $\mathrm{NO}_x$ but more soot and burns more fuel. SCR is what allows modern engines to be calibrated for efficiency and clean up the $\mathrm{NO}_x$ afterwards.

::: example $\mathrm{CO_2}$ per kilometre from fuel consumption {#ex-co2-km}
A petrol car uses $6.0\ \mathrm{L}$ of fuel per $100\ \mathrm{km}$. The fuel has density $745\ \mathrm{kg/m^3}$ and carbon mass fraction $0.866$. Find the tailpipe $\mathrm{CO_2}$ emission in grams per kilometre.
::: solution
Fuel mass per kilometre: $0.060\ \mathrm{L/km} \times 0.745\ \mathrm{kg/L} = 0.0447\ \mathrm{kg/km}$. Carbon: $0.0447 \times 0.866 = 0.0387\ \mathrm{kg/km}$. Every $12.011\ \mathrm{kg}$ of carbon becomes $44.01\ \mathrm{kg}$ of $\mathrm{CO_2}$:
$$
m_{\mathrm{CO_2}} = 0.0387 \times \frac{44.01}{12.011} = 0.142\ \mathrm{kg/km} = 142\ \mathrm{g/km}.
$$
*Check:* this is $2.36\ \mathrm{kg}$ of $\mathrm{CO_2}$ per litre of petrol — the familiar conversion factor — and the CO and HC that escape are a fraction of a per cent of the carbon, too small to matter for this balance.
:::
:::

::: history
Étienne **Lenoir** patented a gas engine in France in 1860 and sold several hundred; it drew in gas and air for part of the stroke and ignited them *without compression*, and its efficiency was only a few per cent. In 1862 Alphonse **Beau de Rochas** described the four-stroke principle — intake, compression, ignition and expansion, exhaust — in a French patent, but built no engine. Nicolaus August **Otto**, with Eugen Langen at the Deutz works near Cologne, built the first successful four-stroke compressing engine in 1876; its patent was later invalidated in Germany (1886) on the strength of Beau de Rochas's earlier description, but the cycle still bears Otto's name. Rudolf **Diesel** applied in 1892 for the patent on his compression-ignition engine (German patent 67207, granted in 1893), and after years of development at Maschinenfabrik Augsburg his engine passed its acceptance test by Professor Moritz **Schröter** in February 1897 with an overall efficiency of about $26\ \%$, far above the steam engines and gas engines of comparable size.
:::

## Summary

::: summary
- Geometry: $V_d = \pi B^2 L/4$ per cylinder, compression ratio $r = (V_c + V_d)/V_c$, mean piston speed $\bar U_p = 2LN$; a four-stroke has $n_R = 2$ revolutions per cycle.
- Air-standard efficiencies: Otto $1 - r^{1-k}$; Diesel and dual cycles lower at the same $r$ ([[#eq-dual]]). Diesels win because they can use $r = 15$–$22$; petrol engines are limited to about $10$–$13$ by knock.
- Real engines fall short of the air-standard cycle through variable specific heats and dissociation, heat transfer, finite burning time, pumping and friction; peak brake efficiencies are about $40\ \%$ (petrol) and $45$–$50\ \%$ or more (large diesels).
- Mean effective pressure ($\text{bmep} = 4\pi T/V_d$ for a four-stroke) compares engines independent of size; $\text{bsfc}\,[\mathrm{g/kWh}] = 3600/(\eta_b Q_\text{LHV}[\mathrm{MJ/kg}])$.
- Power equation: $P_b = \eta_b \eta_v \rho_{a,i} V_d N (F/A) Q_\text{LHV}/n_R$ — power comes from efficiency, breathing, charge density, size, speed and mixture strength.
- Turbocharging with intercooling raises charge density; throttling makes SI engines inefficient at part load.
- $\mathrm{CO_2}$ follows from fuel carbon; $\mathrm{NO}_x$, CO, HC and PM from imperfect combustion. Petrol engines use a three-way catalyst at $\lambda \approx 1$; diesels need oxidation catalysts, particulate filters and urea SCR.
:::

## Exercises

::: exercise Compression ratio from dimensions {#exr-cr level=1 check="18.1"}
A diesel engine cylinder has bore $100\ \mathrm{mm}$, stroke $120\ \mathrm{mm}$ and clearance volume $55\ \mathrm{cm^3}$. Find the compression ratio. (Enter $r$ to one decimal place.)
::: solution
$V_d = \pi (0.100)^2/4 \times 0.120 = 9.425\times10^{-4}\ \mathrm{m^3} = 942.5\ \mathrm{cm^3}$. Then
$$
r = \frac{942.5 + 55}{55} = 18.14 \approx 18.1 .
$$
A typical value for a direct-injection diesel.
:::
:::

::: exercise Otto efficiency {#exr-otto level=1 check="61.7"}
Find the cold-air-standard ($k = 1.4$) efficiency of an Otto cycle with compression ratio $11$. (Enter the efficiency in per cent to one decimal place.)
::: solution
$\eta = 1 - 11^{-0.4} = 1 - 0.3832 = 0.6168$, i.e. $61.7\ \%$. A real engine with this compression ratio reaches about two-thirds of this at its best operating point.
:::
:::

::: exercise Specific fuel consumption {#exr-bsfc level=1 check="200"}
A diesel engine has a brake thermal efficiency of $42\ \%$ on fuel with $Q_\text{LHV} = 42.8\ \mathrm{MJ/kg}$. Find its bsfc. (Enter the bsfc in g/kWh, rounded to the nearest whole number.)
::: solution
From [[#eq-bsfc]], $\text{bsfc} = 3600/(0.42 \times 42.8) = 200.3\ \mathrm{g/kWh}$, i.e. $200\ \mathrm{g/kWh}$. The "200 g/kWh" diesel is a common benchmark for a good modern truck engine.
:::
:::

::: exercise bmep from a torque curve {#exr-bmep level=2 check="2011"}
A turbocharged 2.0 L four-stroke petrol engine ($V_d = 2.000\times10^{-3}\ \mathrm{m^3}$) produces a maximum torque of $320\ \mathrm{N\,m}$. Find the bmep at this point and comment on the value. (Enter the bmep in kPa, rounded to the nearest whole number.)
::: solution
From [[#eq-bmep]],
$$
\text{bmep} = \frac{4\pi T}{V_d} = \frac{4\pi \times 320}{2.000\times10^{-3}} = 2.0106\times10^{6}\ \mathrm{Pa} = 2011\ \mathrm{kPa}.
$$
About twice the $1.0$–$1.3\ \mathrm{MPa}$ a naturally aspirated engine can reach: this engine relies on a boost pressure ratio of roughly two, intercooled, and on direct injection and knock control to make the higher cylinder pressures usable.
:::
:::

::: exercise Diesel-cycle efficiency {#exr-diesel level=2 check="62.2"}
Find the cold-air-standard efficiency of a Diesel cycle with compression ratio $18$ and cut-off ratio $2.2$, and compare it with an Otto cycle at $r = 10$. (Enter the Diesel-cycle efficiency in per cent to one decimal place.)
::: solution
From [[#eq-diesel]] with $k = 1.4$: $18^{-0.4} = 0.3147$, $2.2^{1.4} = 3.016$, so
$$
\eta = 1 - 0.3147 \times \frac{3.016 - 1}{1.4 \times 1.2} = 1 - 0.3147 \times 1.2001 = 0.6224 ,
$$
i.e. $62.2\ \%$. The Otto cycle at $r = 10$ gives $60.2\ \%$: the diesel's higher compression ratio more than compensates for its less favourable heat addition.
:::
:::

::: exercise Power of a small engine {#exr-power level=2 check="81.3"}
A $1.6\ \mathrm{L}$ four-stroke petrol engine runs at $6000\ \mathrm{rev/min}$, full throttle, with $\eta_v = 0.92$ based on an inlet density of $1.18\ \mathrm{kg/m^3}$, $A/F = 14.7$, $Q_\text{LHV} = 43\ \mathrm{MJ/kg}$ and brake efficiency $0.32$. Find the brake power. (Enter the power in kW to three significant figures.)
::: solution
$\dot m_a = 0.92 \times 1.18 \times 1.6\times10^{-3} \times 100/2 = 0.08685\ \mathrm{kg/s}$; $\dot m_f = 0.08685/14.7 = 5.908\ \mathrm{g/s}$;
$$
P_b = 0.32 \times 5.908\times10^{-3} \times 43\times10^{6} = 81.29\ \mathrm{kW} \approx 81.3\ \mathrm{kW}.
$$
That is $51\ \mathrm{kW/L}$, on the high side for a naturally aspirated engine but realistic for one tuned for high speed.
:::
:::

::: exercise Stoichiometric air–fuel ratio {#exr-afr level=2 check="15.09"}
Using a molar mass of air of $28.97\ \mathrm{kg/kmol}$ and the air composition $\mathrm{O_2} + 3.76\,\mathrm{N_2}$, find the stoichiometric air–fuel mass ratio of iso-octane, $\mathrm{C_8H_{18}}$ ($M = 114.23\ \mathrm{kg/kmol}$). (Enter $(A/F)_s$ to two decimal places.)
::: solution
Balancing $\mathrm{C_8H_{18}} + a\,(\mathrm{O_2} + 3.76\,\mathrm{N_2}) \to 8\,\mathrm{CO_2} + 9\,\mathrm{H_2O} + 3.76a\,\mathrm{N_2}$: oxygen atoms give $2a = 16 + 9$, so $a = 12.5$. The air is $12.5 \times 4.76 = 59.5\ \mathrm{kmol}$ per kmol of fuel, and
$$
(A/F)_s = \frac{59.5 \times 28.97}{114.23} = 15.09 .
$$
Commercial petrol is a little lower ($\approx 14.6$–$14.7$) because its aromatics have a lower hydrogen-to-carbon ratio and ethanol blends already contain oxygen.
:::
:::

::: exercise The Otto cycle at maximum work {#exr-maxwork level=3 check="13.5"}
An Otto cycle (cold-air standard) operates between a fixed inlet temperature $T_1$ and a fixed maximum temperature $T_3$, set by materials and by $\mathrm{NO}_x$. (a) Show that the net work per unit mass is greatest when $r^{\,k-1} = \sqrt{T_3/T_1}$, and that the efficiency is then $1 - \sqrt{T_1/T_3}$. (b) For $T_1 = 300\ \mathrm{K}$ and $T_3 = 2400\ \mathrm{K}$ find this compression ratio and the efficiency. (Enter the compression ratio to one decimal place.)
::: hint
Write $x = r^{\,k-1}$ and express $w = q_\text{in} - q_\text{out}$ in terms of $x$, $T_1$ and $T_3$.
:::
::: solution
(a) With $x = r^{\,k-1}$: $T_2 = x T_1$ and $T_4 = T_3/x$. Then
$$
\frac{w}{c_v} = (T_3 - x T_1) - \left(\frac{T_3}{x} - T_1\right) = T_3 + T_1 - x T_1 - \frac{T_3}{x}.
$$
Setting $\mathrm{d}w/\mathrm{d}x = c_v(-T_1 + T_3/x^2) = 0$ gives $x = \sqrt{T_3/T_1}$; the second derivative $-2c_v T_3/x^3$ is negative, so it is a maximum. The efficiency is $1 - 1/x = 1 - \sqrt{T_1/T_3}$, and the maximum work is $c_v(\sqrt{T_3} - \sqrt{T_1})^2$. The physics: at small $r$ little work is extracted per cycle; at large $r$ the compression alone brings $T_2$ close to $T_3$ and there is little room to add heat.
(b) $T_3/T_1 = 8$, so $x = \sqrt 8 = 2.828$ and $r = 8^{1/(2 \times 0.4)} = 8^{1.25} = 13.45 \approx 13.5$; the efficiency is $1 - 1/\sqrt 8 = 0.646$, i.e. $64.6\ \%$.
:::
:::

::: exercise Urea consumption for SCR {#exr-scr level=3 check="9.5"}
A truck diesel produces engine-out $\mathrm{NO}_x$ of $5.0\ \mathrm{g/kWh}$, reported (as regulations do) as $\mathrm{NO_2}$, $M = 46.01\ \mathrm{kg/kmol}$. The SCR system converts $95\ \%$ of it, consuming one mole of $\mathrm{NH_3}$ per mole of $\mathrm{NO}_x$ converted; each mole of urea, $\mathrm{CO(NH_2)_2}$ ($M = 60.06\ \mathrm{kg/kmol}$), yields two moles of $\mathrm{NH_3}$. The reductant is a $32.5\ \%$ (by mass) urea solution. Find the solution consumption per kWh, and compare it with a bsfc of $190\ \mathrm{g/kWh}$. (Enter the solution consumption in g/kWh to one decimal place.)
::: solution
Moles of $\mathrm{NO}_x$: $5.0/46.01 = 0.1087\ \mathrm{mol/kWh}$; converted: $0.95 \times 0.1087 = 0.1032\ \mathrm{mol/kWh}$, needing the same amount of $\mathrm{NH_3}$. Urea: $0.1032/2 = 0.0516\ \mathrm{mol}$, i.e. $0.0516 \times 60.06 = 3.10\ \mathrm{g/kWh}$. Solution: $3.10/0.325 = 9.54 \approx 9.5\ \mathrm{g/kWh}$.
Relative to the fuel, $9.54/190 = 5.0\ \%$ — consistent with the rule of thumb that a modern SCR-equipped truck uses AdBlue at a few per cent of its diesel consumption. Lower engine-out $\mathrm{NO}_x$ (cooler combustion) would save urea but cost fuel: that is the calibration trade-off described in [[#sec-emissions]].
:::
:::

::: exercise Design: a range-extender engine {#exr-design level=3}
A series-hybrid van needs an on-board generator engine delivering $40\ \mathrm{kW}$ of shaft power continuously, running at a single speed of your choice. Choose between a naturally aspirated petrol engine and a small turbocharged diesel; select a speed and estimate the displacement (state the bmep you assume and why), the bore and stroke for your cylinder count, the mean piston speed, and the fuel consumption in kg/h and $\mathrm{CO_2}$ in kg/h. Discuss emissions after-treatment, noise and mass.
::: solution
One reasonable answer. A generator engine can run at its best point all the time, so choose a speed near peak efficiency rather than peak power, and avoid throttling. *Petrol option:* a naturally aspirated engine at $3000\ \mathrm{rev/min}$ ($N = 50\ \mathrm{rev/s}$) and $\text{bmep} = 0.95\ \mathrm{MPa}$ (near full load, where efficiency is best) needs $V_d = 2 P/(\text{bmep}\,N) = 2 \times 40\,000/(0.95\times10^{6} \times 50) = 1.68\times10^{-3}\ \mathrm{m^3}$ — a 1.7 L three-cylinder, e.g. $B = 85\ \mathrm{mm}$, $L = 99\ \mathrm{mm}$ ($3 \times 0.562 = 1.69\ \mathrm{L}$), $\bar U_p = 2 \times 0.099 \times 50 = 9.9\ \mathrm{m/s}$. At $\eta_b \approx 0.36$ and $Q_\text{LHV} = 43\ \mathrm{MJ/kg}$, bsfc $= 3600/(0.36 \times 43) = 233\ \mathrm{g/kWh}$, so $9.3\ \mathrm{kg/h}$ of fuel and, at $3.17\ \mathrm{kg\ CO_2}$ per kg of fuel ($0.866 \times 44.01/12.011$), about $30\ \mathrm{kg/h}$ of $\mathrm{CO_2}$. A three-way catalyst at $\lambda = 1$ handles the pollutants cheaply. *Diesel option:* at $\text{bmep} = 1.6\ \mathrm{MPa}$ and $3000\ \mathrm{rev/min}$, $V_d = 1.0\ \mathrm{L}$; $\eta_b \approx 0.40$ gives $210\ \mathrm{g/kWh}$, $8.4\ \mathrm{kg/h}$, $\approx 26.6\ \mathrm{kg\ CO_2/h}$ — about $10\ \%$ less fuel, but with a particulate filter, SCR and urea tank, more mass, more noise and higher cost. For a light van that runs the engine only part of the time, the petrol engine is usually preferred; for a heavy vehicle that runs it constantly, the diesel's fuel saving may pay for its after-treatment. Credible answers state their assumed bmep and efficiency and check $\bar U_p$.
:::
:::
