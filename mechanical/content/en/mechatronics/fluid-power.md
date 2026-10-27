An excavator digging a trench, a press forming a car body panel, an aircraft's landing gear swinging down, an injection-moulding machine clamping its mould with several hundred tonnes: when large forces are needed in a small space, the actuator is usually hydraulic. A hydraulic cylinder working at $20\ \mathrm{MPa}$ — two hundred times atmospheric pressure — develops $20\ \mathrm{kN}$ for every $10\ \mathrm{cm^2}$ of piston area, and a hydraulic system can transmit tens of kilowatts through a hose to wherever the force is needed. **Pneumatics**, working with compressed air at about $0.6\ \mathrm{MPa}$, trades force for cleanliness, speed and low cost, and dominates simple point-to-point motion in factory automation: grippers, clamps, ejectors, sorting gates.

To the mechatronics engineer, fluid power is an actuator technology like electric drives, with its own components (pumps, valves, cylinders, motors), its own circuit symbols and its own dynamics — dominated by the compressibility of the fluid and by the strongly non-linear flow through valve orifices. This chapter builds the quantitative models of each component, combines them into circuits, and derives the natural frequency that limits how fast a hydraulic servo can be. The underlying fluid mechanics — pressure, Bernoulli's equation, losses in pipes — is in [[fluid-mechanics]].

## Pressure, force and flow {#sec-basics}

The basis of fluid power is that pressure in a fluid at rest acts equally in all directions and is transmitted undiminished throughout the fluid (Pascal's principle), so a pump can generate pressure in one place and a cylinder can use it in another. In a working circuit the fluid is not at rest, and pressure is lost in pipes, fittings and above all valves; but these losses are calculated separately, and the actuators themselves obey simple laws.

::: proposition Cylinder force, speed and power {#prop-cylinder}
A double-acting cylinder has piston (cap-end) area $A_1$ and annulus (rod-end) area $A_2 = A_1 - A_r$, where $A_r$ is the rod area. With pressures $p_1$ and $p_2$ in the cap- and rod-end chambers, the force on the rod (positive outwards, friction neglected) and the extension speed are
$$
F = p_1A_1 - p_2A_2,\qquad v = \frac{Q_1}{A_1} = \frac{Q_2}{A_2},
$$ {#eq-cylinder}
where $Q_1$ is the flow into the cap end and $Q_2$ the flow out of the rod end. The hydraulic power delivered to a fluid stream is $P = \Delta p\,Q$.
:::

::: proof
Free-body diagram of the piston and rod: the cap-end pressure acts on the full piston area, pushing outwards with force $p_1A_1$; the rod-end pressure acts on the annulus, pushing inwards with $p_2A_2$ (the rod's own cross-section is exposed to the atmosphere outside the cylinder, and atmospheric pressure is taken as the gauge zero). The resultant is $F = p_1A_1 - p_2A_2$. If the oil is treated as incompressible, the cap-end volume grows at $A_1v$ and must be supplied at that rate, $Q_1 = A_1v$; the rod-end volume shrinks at $A_2v$ and expels $Q_2 = A_2v$. Power: a volume $\mathrm{d}V$ pushed through a pressure rise $\Delta p$ receives work $\Delta p\,\mathrm{d}V$, so $P = \Delta p\,\mathrm{d}V/\mathrm{d}t = \Delta p\,Q$. For the cylinder, $Fv = p_1A_1v - p_2A_2v = p_1Q_1 - p_2Q_2$, the net hydraulic power consumed.
:::

Because $A_2 < A_1$, a single-rod cylinder extends more slowly and with more force than it retracts for the same pump flow and pressure, and it expels more oil when retracting than it takes in. Pressures in these formulas are gauge pressures; in hydraulics the distinction from absolute pressure rarely matters, but in pneumatics, where the gas law is used, it always does.

::: example Sizing a press cylinder {#ex-cylinder}
A cylinder with $80\ \mathrm{mm}$ bore and $40\ \mathrm{mm}$ rod is supplied with $20\ \mathrm{L/min}$ at a maximum pressure of $10\ \mathrm{MPa}$ (relief valve setting), the return side being at negligible pressure. Find the maximum extending and retracting forces, the speeds, and the hydraulic power.
::: solution
$A_1 = \pi(0.040)^2 = 5.027\times10^{-3}\ \mathrm{m^2}$; $A_r = \pi(0.020)^2 = 1.257\times10^{-3}\ \mathrm{m^2}$; $A_2 = 3.770\times10^{-3}\ \mathrm{m^2}$. $Q = 20\times10^{-3}/60 = 3.333\times10^{-4}\ \mathrm{m^3/s}$.

Forces: extending $10\times10^{6} \times 5.027\times10^{-3} = 50.3\ \mathrm{kN}$; retracting $10\times10^{6} \times 3.770\times10^{-3} = 37.7\ \mathrm{kN}$.

Speeds: extending $3.333\times10^{-4}/5.027\times10^{-3} = 0.0663\ \mathrm{m/s}$; retracting $3.333\times10^{-4}/3.770\times10^{-3} = 0.0884\ \mathrm{m/s}$.

Power at full pressure: $10\times10^{6} \times 3.333\times10^{-4} = 3.33\ \mathrm{kW}$.

Sanity check: $Fv$ for extension, $50.3\ \mathrm{kN} \times 0.0663\ \mathrm{m/s} = 3.33\ \mathrm{kW}$, matches $pQ$, as [[#prop-cylinder]] requires. Note the difficulty of electric alternatives: $50\ \mathrm{kN}$ at $66\ \mathrm{mm/s}$ through a ball screw is possible, but the screw and motor would be much bulkier than an $80\ \mathrm{mm}$ cylinder.
:::
:::

## Pumps and motors {#sec-pumps}

Hydraulic systems use **positive-displacement** pumps — gear, vane and piston (axial or radial) — which deliver a fixed volume per revolution, the **displacement** $D$, almost independently of pressure. The same machines run in reverse as **hydraulic motors**. Real machines leak internally, more at high pressure and low viscosity, and have friction.

::: definition Pump efficiencies {#def-pump-eff}
A pump of displacement $D$ (per revolution) running at speed $n$ (rev/s) against a pressure rise $\Delta p$ delivers the flow
$$
Q = Dn\,\eta_v
$$
with **volumetric efficiency** $\eta_v < 1$ accounting for leakage, and needs the shaft torque
$$
T = \frac{D\,\Delta p}{2\pi\,\eta_m}
$$
with **mechanical (hydromechanical) efficiency** $\eta_m < 1$ accounting for friction. The **overall efficiency** is the ratio of hydraulic output power to shaft power, $\eta = \Delta p\,Q/(2\pi nT) = \eta_v\eta_m$.
:::

The torque formula follows from energy: an ideal pump turning through one revolution displaces $D$ against $\Delta p$, absorbing $\Delta p\,D$ of work, so $2\pi T = \Delta p\,D$. Typical values: gear pumps $\eta \approx 0.80$–$0.90$ (cheap, fixed displacement), axial piston pumps $\eta \approx 0.85$–$0.92$ at pressures up to $35$–$45\ \mathrm{MPa}$, and available with **variable displacement**, which allows the pump to deliver only the flow needed instead of throttling the excess.

::: example A pump and its drive motor {#ex-pump}
An axial piston pump of displacement $20\ \mathrm{cm^3/rev}$ runs at $1500\ \mathrm{rev/min}$ against $20\ \mathrm{MPa}$, with $\eta_v = 0.95$ and $\eta_m = 0.90$. Find the flow, the hydraulic power, the shaft torque and power, and the overall efficiency.
::: solution
$n = 25\ \mathrm{rev/s}$. Flow $Q = 20\times10^{-6} \times 25 \times 0.95 = 4.75\times10^{-4}\ \mathrm{m^3/s} = 28.5\ \mathrm{L/min}$. Hydraulic power $20\times10^{6} \times 4.75\times10^{-4} = 9.50\ \mathrm{kW}$. Torque $T = 20\times10^{-6} \times 20\times10^{6}/(2\pi \times 0.90) = 70.7\ \mathrm{N\,m}$. Shaft power $T\omega = 70.7 \times 157.1 = 11.1\ \mathrm{kW}$. Efficiency $9.50/11.1 = 0.855 = \eta_v\eta_m$.

Sanity check: the $1.6\ \mathrm{kW}$ of losses becomes heat in the oil, which must be removed by a cooler or by the reservoir; hydraulic systems are designed with a heat balance as well as a force and flow balance. An $11\ \mathrm{kW}$ four-pole induction motor would drive this pump — a standard industrial power pack.
:::
:::

## Valves {#sec-valves}

Valves control the direction, pressure and flow of the fluid. Their working element is a variable **orifice**: a sharp-edged restriction, such as the gap between a spool land and the edge of a port.

::: proposition The orifice equation {#prop-orifice}
The flow of a liquid of density $\rho$ through a sharp-edged orifice of area $A$ with pressure drop $\Delta p$ is
$$
Q = C_dA\sqrt{\frac{2\,\Delta p}{\rho}},
$$ {#eq-orifice}
where the **discharge coefficient** $C_d$ (about $0.6$–$0.7$ for sharp-edged orifices at high Reynolds number; $0.61$ is the classical value) accounts for the contraction of the jet and for friction.
:::

::: proof
Upstream of the orifice the fluid moves slowly at pressure $p_1$; it accelerates through the orifice and forms a jet that contracts to its narrowest section (the **vena contracta**) of area $C_cA$ just downstream, where the streamlines are parallel and the pressure equals the downstream pressure $p_2$. Bernoulli's equation along a streamline, neglecting the upstream velocity and losses, gives $p_1 = p_2 + \tfrac12\rho v_j^2$, so the jet speed is $v_j = \sqrt{2\Delta p/\rho}$. The flow is $Q = C_cA\,v_j$. Friction reduces the jet speed slightly, by a velocity coefficient $C_v \approx 0.97$–$0.99$, and $C_d = C_cC_v$. For a sharp-edged circular orifice $C_c \approx 0.61$–$0.62$, found by experiment (and, for the two-dimensional slot, by Kirchhoff's free-streamline theory as $\pi/(\pi + 2) = 0.611$).
:::

Downstream of the vena contracta the jet's kinetic energy is destroyed in turbulence and becomes heat: the full pressure drop $\Delta p$ is lost, and the power $\Delta p\,Q$ heats the oil. This is the central fact of valve control — **throttling is inherently lossy** — and the reason efficient machines use variable-displacement pumps, load-sensing circuits or electric drives to supply only the pressure and flow the load needs.

::: example Flow and heat in a throttle {#ex-orifice}
Mineral oil ($\rho = 870\ \mathrm{kg/m^3}$) flows through a $2.0\ \mathrm{mm}$ diameter sharp-edged orifice with a pressure drop of $5.0\ \mathrm{MPa}$. With $C_d = 0.61$, find the flow and the power converted to heat.
::: solution
$A = \pi(1.0\times10^{-3})^2 = 3.142\times10^{-6}\ \mathrm{m^2}$. Jet speed $\sqrt{2 \times 5.0\times10^{6}/870} = 107.2\ \mathrm{m/s}$. $Q = 0.61 \times 3.142\times10^{-6} \times 107.2 = 2.05\times10^{-4}\ \mathrm{m^3/s} = 12.3\ \mathrm{L/min}$. Heat: $5.0\times10^{6} \times 2.05\times10^{-4} = 1.03\ \mathrm{kW}$.

Sanity check: a jet at $100\ \mathrm{m/s}$ is typical of control valves at high pressure drop and explains their noise, erosion and cavitation; the kilowatt of heat in a part the size of a thumbnail is why throttling valves need oil flow to carry the heat away and why a circuit that throttles continuously runs hot. Because $Q \propto \sqrt{\Delta p}$, quadrupling the pressure drop only doubles the flow.
:::
:::

::: widget plot
title: Flow through a control orifice
f: 60000*0.61*pi*(d/2000)^2*sqrt(2*x*1e6/870)
x: 0, 20
y: 0, 40
sliders: d=2:0.5:4:0.1
labels: Q\ \text{(L/min)}
caption: Flow of mineral oil through a sharp-edged orifice of diameter $d$ (mm, on the slider) against pressure drop (MPa), from the orifice equation with $C_d = 0.61$. The square-root shape is the main non-linearity of hydraulic control: the flow gain is steep at small pressure drops and flat at large ones, so a valve-controlled actuator's speed depends on the load pressure as well as on the valve opening. Flow scales with $d^2$.
:::

### Valve types

- **Directional control valves** route the flow. They are named by ports and positions: a **4/3 valve** has four ports (pressure P, tank T, and the two actuator ports A and B) and three spool positions — extend, retract and a centre position whose connections (all ports blocked, A and B to tank, P to tank for unloading the pump…) determine what the cylinder does when the valve is centred. Switching valves are moved by solenoids, levers or pilot pressure.
- **Pressure control valves**: the **relief valve** limits the maximum system pressure by opening to tank, protecting the pump and components; **reducing valves** supply a lower pressure to part of a circuit; **counterbalance valves** hold a suspended load and prevent it from running away when lowered.
- **Flow control valves** set a speed by throttling. A simple needle valve gives a flow that varies with load pressure ([[#eq-orifice]]); a **pressure-compensated** flow valve keeps the pressure drop across its orifice constant with a spring-loaded compensator, so the flow is independent of load. Placed at the cylinder inlet (**meter-in**) or outlet (**meter-out**), it controls the speed; meter-out also controls an overrunning load that pulls the cylinder.
- **Proportional and servo valves** have spools positioned continuously by proportional solenoids or by a torque motor and hydraulic amplification stage, with flow approximately proportional to an electrical command. Servo valves, with very small spool clearances and bandwidths of tens to hundreds of hertz, are used in closed-loop position and force control — flight simulators, materials-testing machines, steel-mill gauge control, aircraft flight controls.

Around an operating point, the flow through a servo valve to a load with pressure difference $p_L$ is linearised as $Q_L = K_qx_v - K_cp_L$, with **flow gain** $K_q = \partial Q/\partial x_v$ and **flow–pressure coefficient** $K_c = -\partial Q/\partial p_L$ — the slopes of [[#eq-orifice]] applied to the valve's metering edges. The pressure coefficient acts like a damper on the actuator, and it is smallest — the actuator least damped — near the valve's centre position, where servo systems spend most of their time.

## Compressibility and the hydraulic natural frequency {#sec-stiffness}

Hydraulic oil is stiff but not rigid. Its compressibility is described by the **bulk modulus**
$$
\beta = -V\frac{\mathrm{d}p}{\mathrm{d}V},
$$
about $1.4$–$1.8\ \mathrm{GPa}$ for pure mineral oil. Entrained air and the expansion of hoses reduce the *effective* bulk modulus substantially, often to $0.7$–$1\ \mathrm{GPa}$ in practical circuits; it is the value that should be used in design. The oil trapped in the cylinder chambers and lines therefore acts as a spring between the valve and the load, and that spring, together with the load mass, forms a lightly damped oscillator — the **hydraulic resonance** that limits the bandwidth of every valve-controlled actuator.

::: proposition Hydraulic spring stiffness {#prop-hydraulic-stiffness}
A piston of area $A$ trapping a volume $V$ of fluid with bulk modulus $\beta$ has stiffness $k = \beta A^2/V$. For a cylinder with equal areas $A$ on both sides (a double-rod cylinder) and trapped volumes $V_1$ and $V_2$ (including the lines to the valve), the two chambers act as springs in parallel:
$$
k_h = \beta A^2\left(\frac{1}{V_1} + \frac{1}{V_2}\right),\qquad \omega_h = \sqrt{\frac{k_h}{m}},
$$ {#eq-hydraulic-stiffness}
where $m$ is the moving mass. With the piston at mid-stroke, $V_1 = V_2 = V_t/2$ and $k_h = 4\beta A^2/V_t$, the minimum over the stroke.
:::

::: proof
Displace the piston by a small $x$ into chamber 1 with the valve closed. The chamber volume falls by $\mathrm{d}V = -Ax$, and the definition of $\beta$ gives a pressure rise $\mathrm{d}p_1 = \beta Ax/V_1$, which pushes back on the piston with force $A\,\mathrm{d}p_1 = (\beta A^2/V_1)x$. At the same time chamber 2 expands by $Ax$, its pressure falls by $\beta Ax/V_2$, and the net force on the piston increases by $(\beta A^2/V_2)x$. Both forces oppose the displacement, so the stiffnesses add. The natural frequency of the mass on this spring is $\sqrt{k_h/m}$. With $V_1 + V_2 = V_t$ fixed, $1/V_1 + 1/V_2$ is minimised at $V_1 = V_2$ (by symmetry and convexity of $1/V$), giving $4/V_t$.
:::

The design consequences are direct. The hydraulic natural frequency rises with piston area and bulk modulus and falls with trapped volume and mass, so servo valves are mounted directly on the cylinder (short, stiff lines, no hoses) and cylinders are not oversized in stroke. A rule of thumb from the classical analysis of Merritt is that a valve-controlled position servo can achieve a closed-loop bandwidth of only about a third of $\omega_h$ at best, and less when the damping is low.

::: example Natural frequency of a positioning axis {#ex-hydraulic-freq}
A double-rod cylinder with effective area $A = 2.0\times10^{-3}\ \mathrm{m^2}$ moves a mass of $500\ \mathrm{kg}$. At mid-stroke each chamber, with its line, holds $4.0\times10^{-4}\ \mathrm{m^3}$ of oil with effective bulk modulus $1.4\ \mathrm{GPa}$. Find the hydraulic stiffness and natural frequency, and estimate the achievable position-loop bandwidth. What happens if hoses reduce the effective bulk modulus to $0.7\ \mathrm{GPa}$?
::: solution
$k_h = 1.4\times10^{9} \times (2.0\times10^{-3})^2 \times (2/4.0\times10^{-4}) = 1.4\times10^{9} \times 4.0\times10^{-6} \times 5000 = 2.8\times10^{7}\ \mathrm{N/m}$. $\omega_h = \sqrt{2.8\times10^{7}/500} = 237\ \mathrm{rad/s}$, i.e. $37.7\ \mathrm{Hz}$. Achievable bandwidth about a third: roughly $12\ \mathrm{Hz}$.

With $\beta = 0.7\ \mathrm{GPa}$, $k_h$ halves and $\omega_h$ falls by $\sqrt2$, to $26.6\ \mathrm{Hz}$, and the bandwidth to about $9\ \mathrm{Hz}$.

Sanity check: a stiffness of $28\ \mathrm{N/\mu m}$ is far higher than the oil-free compliance of a pneumatic cylinder of similar size (of the order of a thousandth of this, see below), but comparable with that of a modest steel frame — so in a real machine the structure's compliance acts in series and must be included.
:::
:::

::: widget plot
title: Hydraulic natural frequency along the stroke
f: sqrt(1.4e9*4e-6*(1/(2e-3*x + V0) + 1/(2e-3*(0.4 - x) + V0))/500)/(2*pi)
x: 0, 0.4
y: 0, 80
sliders: V0=1e-4:2e-5:4e-4:1e-5
labels: f_h\ \text{(Hz)}
caption: Hydraulic natural frequency (Hz) of a $500\ \mathrm{kg}$ load on a double-rod cylinder with $A = 2000\ \mathrm{mm^2}$ and $400\ \mathrm{mm}$ stroke, against piston position (m), for a dead volume $V_0$ (m³) in each chamber's lines. The frequency is lowest at mid-stroke and rises towards the ends, where one chamber is nearly empty. Increase $V_0$ — long lines, hoses, a valve mounted far from the cylinder — and the whole curve drops; the controller must be designed for the minimum.
:::

## Pneumatics {#sec-pneumatics}

Pneumatic actuators use the same components in lighter form, with compressed air at typically $0.6\ \mathrm{MPa}$ gauge from a central compressor, filtered, dried and regulated at each machine. The force is again $pA$ (gauge pressure), so a $50\ \mathrm{mm}$ bore cylinder at $0.6\ \mathrm{MPa}$ pushes about $1.2\ \mathrm{kN}$. Air is cheap, clean, non-flammable, and a leak is harmless; cylinders are light, fast (speeds of $1\ \mathrm{m/s}$ and more) and simply stall without damage when overloaded. The disadvantages all stem from **compressibility**:

- the stiffness of a gas spring is $k = n\,pA^2/V$ with **absolute** pressure $p$ and polytropic index $n$ ($1.4$ for fast, adiabatic changes) — thousands of times less than for oil, because $np$ (about $1\ \mathrm{MPa}$) replaces $\beta$ (about $1\ \mathrm{GPa}$). Intermediate positions are therefore hard to hold under varying load, and most pneumatic cylinders run between end stops, with adjustable cushions to absorb the impact;
- the speed depends on load, supply pressure and the flow capacity of valves and tubes, and is set with meter-out flow restrictors;
- compressed air is an expensive energy carrier: the overall efficiency from compressor electricity to work at the cylinder is often around $10\,\%$, and leaks are a major cost in factories.

The air consumption is computed from the **free air** volume (volume at atmospheric pressure): a chamber of volume $V$ filled to absolute pressure $p$ contains the same mass as $Vp/p_{\text{atm}}$ of free air (for isothermal conditions), and that air is lost to the exhaust at every stroke.

::: example Air consumption of a pneumatic cylinder {#ex-air}
A double-acting cylinder with $50\ \mathrm{mm}$ bore, $20\ \mathrm{mm}$ rod and $200\ \mathrm{mm}$ stroke works at $0.6\ \mathrm{MPa}$ gauge and completes $10$ cycles (out and back) per minute. Taking $p_{\text{atm}} = 0.1013\ \mathrm{MPa}$ and ignoring dead volumes, find the free-air consumption. Compare the stiffness of the gas at mid-stroke with that of oil at $\beta = 1.4\ \mathrm{GPa}$ in the same cylinder.
::: solution
Cap-end volume $\pi(0.025)^2 \times 0.200 = 3.927\times10^{-4}\ \mathrm{m^3}$; rod-end volume $\pi(0.025^2 - 0.010^2) \times 0.200 = 3.299\times10^{-4}\ \mathrm{m^3}$. Pressure ratio $(0.6 + 0.1013)/0.1013 = 6.92$. Free air per cycle $(3.927 + 3.299)\times10^{-4} \times 6.92 = 5.00\times10^{-3}\ \mathrm{m^3}$; per minute $0.0500\ \mathrm{m^3} = 50\ \mathrm{L/min}$ of free air.

Stiffness at mid-stroke, treating both chambers as having the piston area $A = 1.963\times10^{-3}\ \mathrm{m^2}$ and half the swept volume each, $V = 1.963\times10^{-4}\ \mathrm{m^3}$, at absolute pressure $0.701\ \mathrm{MPa}$ with $n = 1.4$ (an approximation to the single-rod cylinder): $k \approx 1.4 \times 0.701\times10^{6} \times (1.963\times10^{-3})^2 \times 2/(1.963\times10^{-4}) = 3.9\times10^{4}\ \mathrm{N/m}$. Oil with $\beta = 1.4\ \mathrm{GPa}$ in place of $np = 0.98\ \mathrm{MPa}$ gives a value about $1400$ times larger, $5.5\times10^{7}\ \mathrm{N/m}$.

Sanity check: $50\ \mathrm{L/min}$ of free air needs roughly $0.3\ \mathrm{kW}$ of compressor power at typical specific powers — modest for one cylinder, large across a factory with hundreds. A $10\ \mathrm{kg}$ mass on $39\ \mathrm{kN/m}$ oscillates at about $10\ \mathrm{Hz}$: pneumatic positioning is soft.
:::
:::

::: warning Stored energy and the fluid-injection hazard
Hydraulic and pneumatic systems store energy that remains after the pump or compressor is switched off: in accumulators (gas-charged vessels at full system pressure), in trapped oil holding up a load, in compressed air in reservoirs and lines. Loosening a fitting on a pressurised line, or a load held only by a check valve, can release it violently. Work on fluid-power systems is done only by trained people, after lowering loads mechanically, isolating and **verifying zero pressure** (accumulators are discharged through their bleed valves), following the lock-out procedures of the site. A pinhole leak at high pressure can inject oil through the skin; such an injury looks minor but is a surgical emergency. Never feel for leaks with the hand. Compressed air must not be used to clean clothing or skin.
:::

::: quiz
A cylinder extends at $0.10\ \mathrm{m/s}$ when supplied with $12\ \mathrm{L/min}$. The pump flow is doubled and the load is unchanged. Neglecting leakage, what happens?
- [ ] The speed doubles and the pressure doubles
- [x] The speed doubles and the pressure is unchanged (if the relief valve does not open)
- [ ] The speed is unchanged and the force doubles
- [ ] The speed increases by $\sqrt2$
::: solution
Speed is flow divided by area, so it doubles; pressure is load force divided by area, so it is unchanged (plus slightly higher line losses). Hydraulic actuators decouple the two: flow sets speed and load sets pressure, as voltage sets speed and load sets current in a DC motor ([[mechatronics/electric-actuators#prop-torque-speed]]). The $\sqrt2$ answer would apply to flow through a fixed orifice when the pressure drop doubles.
:::
:::

::: history
Blaise Pascal stated the principle of the transmission of pressure in his *Traité de l'équilibre des liqueurs*, published posthumously in 1663. Joseph Bramah patented the hydraulic press in 1795, with water as the working fluid, and in the nineteenth century hydraulic power was distributed through cities: William Armstrong built hydraulic cranes and, around 1850, the weight-loaded accumulator that stored pressure for them, and public hydraulic-power networks supplied lifts, cranes and bridges in London and other cities into the twentieth century. Oil replaced water from the early twentieth century, bringing lubrication and higher pressures. Electrohydraulic servovalves were developed in the late 1940s and 1950s for aircraft flight controls and other servo systems, and Herbert E. Merritt's *Hydraulic Control Systems* (1967) gave the analysis of valve-controlled actuators — flow gain, pressure coefficient, hydraulic natural frequency — still used today.
:::

::: summary
- Cylinder: $F = p_1A_1 - p_2A_2$, $v = Q/A$; power $\Delta p\,Q$. Flow sets speed, load sets pressure.
- Pumps: $Q = Dn\eta_v$, $T = D\Delta p/(2\pi\eta_m)$, $\eta = \eta_v\eta_m$; losses heat the oil.
- Orifice: $Q = C_dA\sqrt{2\Delta p/\rho}$ with $C_d \approx 0.61$; throttling converts $\Delta p\,Q$ to heat.
- Valves: directional (4/3 and centre types), pressure (relief, reducing, counterbalance), flow (compensated, meter-in/out), proportional and servo; linearised $Q_L = K_qx_v - K_cp_L$.
- Oil is a spring: $k_h = \beta A^2(1/V_1 + 1/V_2)$, $\omega_h = \sqrt{k_h/m}$, lowest at mid-stroke; use the effective bulk modulus and keep trapped volumes small. Position-loop bandwidth $\lesssim \omega_h/3$.
- Pneumatics: force $pA$ (gauge), stiffness $npA^2/V$ (absolute $p$), cheap, fast and clean but soft and energy-inefficient; consumption in free air $V\,p_{\text{abs}}/p_{\text{atm}}$ per stroke.
- Stored energy in fluid systems is a serious hazard: isolate, release and verify before work.
:::

## Exercises

::: exercise Retracting force {level=1 check="36"}
A cylinder has piston area $5000\ \mathrm{mm^2}$ and rod area $2000\ \mathrm{mm^2}$. Find the retracting force at $12\ \mathrm{MPa}$ in the rod-end chamber with the cap end vented to tank. (Enter it in kN.)
::: solution
$A_2 = 5000 - 2000 = 3000\ \mathrm{mm^2} = 3.0\times10^{-3}\ \mathrm{m^2}$; $F = 12\times10^{6} \times 3.0\times10^{-3} = 36\ \mathrm{kN}$.
:::
:::

::: exercise Extension speed {level=1 check="0.25"}
A pump delivers $30\ \mathrm{L/min}$ to the cap end of a cylinder of piston area $2000\ \mathrm{mm^2}$. Find the extension speed. (Enter it in m/s.)
::: solution
$Q = 30\times10^{-3}/60 = 5.0\times10^{-4}\ \mathrm{m^3/s}$; $v = 5.0\times10^{-4}/2.0\times10^{-3} = 0.25\ \mathrm{m/s}$.
:::
:::

::: exercise Pump flow {level=1 check="27.36"}
A gear pump of displacement $16\ \mathrm{cm^3/rev}$ runs at $1800\ \mathrm{rev/min}$ with volumetric efficiency $0.95$. Find its delivery. (Enter it in L/min.)
::: solution
$Q = 16 \times 1800 \times 0.95 = 27\,360\ \mathrm{cm^3/min} = 27.36\ \mathrm{L/min}$.
:::
:::

::: exercise Hydraulic power {level=1 check="10.5"}
Find the hydraulic power of a flow of $30\ \mathrm{L/min}$ at $21\ \mathrm{MPa}$. (Enter it in kW.)
::: solution
$P = 21\times10^{6} \times 5.0\times10^{-4} = 10\,500\ \mathrm{W} = 10.5\ \mathrm{kW}$.
:::
:::

::: exercise Oil-spring stiffness {level=2 check="3"}
A single chamber of oil with effective bulk modulus $1.5\ \mathrm{GPa}$ and volume $5.0\times10^{-4}\ \mathrm{m^3}$ is trapped behind a piston of area $1.0\times10^{-3}\ \mathrm{m^2}$. Find the stiffness. (Enter $k$ in MN/m.)
::: solution
$k = \beta A^2/V = 1.5\times10^{9} \times 1.0\times10^{-6}/5.0\times10^{-4} = 3.0\times10^{6}\ \mathrm{N/m} = 3\ \mathrm{MN/m}$.
:::
:::

::: exercise Orifice flow at twice the pressure drop {level=2 check="sqrt(2)"}
By what factor does the flow through a fixed orifice increase when the pressure drop doubles? (Enter the exact factor, e.g. as sqrt(2).)
::: solution
$Q \propto \sqrt{\Delta p}$, so the factor is $\sqrt2 \approx 1.414$, while the power dissipated, $\Delta p\,Q$, rises by $2\sqrt2 \approx 2.83$.
:::
:::

::: exercise Hydraulic natural frequency {level=2 check="200"}
A hydraulic axis has a minimum hydraulic stiffness of $8.0\times10^{6}\ \mathrm{N/m}$ and a moving mass of $200\ \mathrm{kg}$. Find its natural frequency. (Enter $\omega_h$ in rad/s.)
::: solution
$\omega_h = \sqrt{8.0\times10^{6}/200} = \sqrt{4.0\times10^{4}} = 200\ \mathrm{rad/s}$ ($31.8\ \mathrm{Hz}$); a closed-loop bandwidth of roughly $10\ \mathrm{Hz}$ could be expected.
:::
:::

::: exercise Free air per stroke {level=2 check="3.5"}
A cylinder with piston area $2000\ \mathrm{mm^2}$ and stroke $0.25\ \mathrm{m}$ is filled to $0.6\ \mathrm{MPa}$ gauge each extension stroke. Taking atmospheric pressure as $0.1\ \mathrm{MPa}$, find the free air used per extension. (Enter it in L.)
::: solution
$V = 2.0\times10^{-3} \times 0.25 = 5.0\times10^{-4}\ \mathrm{m^3}$; absolute pressure $0.7\ \mathrm{MPa}$, ratio $7$; free air $3.5\times10^{-3}\ \mathrm{m^3} = 3.5\ \mathrm{L}$.
:::
:::

::: exercise Hydraulic or electric? {level=3}
A machine must press bearings into housings with up to $60\ \mathrm{kN}$ over a $150\ \mathrm{mm}$ stroke, approaching at $100\ \mathrm{mm/s}$ and pressing at $5\ \mathrm{mm/s}$, $600$ times an hour, with the press force recorded for quality control. Compare a hydraulic solution (power pack, valves, cylinder, pressure transducer) with an electromechanical one (servo motor, roller or ball screw, load cell): size the main components of each roughly, and discuss energy use, force control and monitoring, noise, maintenance, cost and safety.
::: solution
A good answer: Hydraulic: at $20\ \mathrm{MPa}$, $A = 60\,000/20\times10^{6} = 3.0\times10^{-3}\ \mathrm{m^2}$, bore about $62\ \mathrm{mm}$ (choose $63\ \mathrm{mm}$); approach flow $3.0\times10^{-3} \times 0.10 = 3.0\times10^{-4}\ \mathrm{m^3/s} = 18\ \mathrm{L/min}$; pressing power only $300\ \mathrm{W}$ but a fixed-displacement pump with a relief valve would waste most of its power as heat; a variable-displacement or servo-motor-driven pump reduces this. Force from the pressure (minus friction) or a load cell; proportional valve for speed and force profiles. Electromechanical: screw force $60\ \mathrm{kN}$ at $5\ \mathrm{mm/s}$ ($300\ \mathrm{W}$), approach at $100\ \mathrm{mm/s}$ at low force; with a $10\ \mathrm{mm}$ lead screw ($\eta \approx 0.9$) the torque at full force is $60\,000 \times 0.010/(2\pi \times 0.9) = 106\ \mathrm{N\,m}$, so a gearbox and a servo motor of about $1$–$2\ \mathrm{kW}$ peak; energy drawn only when moving; precise position and force profiles and monitoring are natural with the servo drive and a load cell; no oil, quieter, but the screw must be sized for the duty and life (bearing and screw rating). Safety: both need guarding and two-hand controls or light curtains ([[mechatronics/system-integration]]); the hydraulic system has stored-energy and leak hazards. Many modern press-fit stations are electromechanical for this force range; hydraulics wins at much larger forces or where compactness at the tool matters.
:::
:::
