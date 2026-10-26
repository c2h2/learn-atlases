An aircraft engine, a ship's propeller, a helicopter rotor and a rocket all work the same way: they push a stream of fluid backwards, and the reaction pushes the vehicle forwards. What distinguishes them is *how much* fluid they push and *how hard*. A rocket throws a small mass of its own propellant backwards at several kilometres per second; a turbofan accelerates hundreds of kilograms of air per second by a few hundred metres per second; a propeller or rotor accelerates even more air by even less. This chapter turns that picture into numbers. We derive the thrust of a propulsion device from a control-volume momentum balance, define the measures of fuel economy used throughout the industry — specific thrust, thrust-specific fuel consumption and specific impulse — and split the conversion of fuel energy into thrust power into a thermal efficiency and a propulsive efficiency. The single most important result of the chapter, the propulsive efficiency $\eta_p = 2/(1 + V_e/V_0)$, explains why airliner engines have grown huge fans, why fighter engines have not, and why rockets are efficient only when they fly fast. We finish with the Breguet range equation, which ties engine efficiency to how far an aircraft can fly.

The prerequisites are the momentum and energy equations for a control volume ([[fluid-mechanics/control-volume-analysis]]) and the steady-flow energy equation and cycle efficiency ([[thermodynamics/first-law-open]], [[thermodynamics/power-cycles]]).

## The physical picture

Watch an airliner from the ground. Far ahead of the engine the air is still; behind it, the jet rushes backwards relative to the engine faster than the aircraft flies. In the frame of the engine (the frame we use for analysis, because the flow is then steady), air arrives at the flight speed $V_0$ and leaves at the jet speed $V_e > V_0$. Every second the engine therefore adds backward momentum $\dot m\,(V_e - V_0)$ to the air passing through it, and by Newton's third law the air pushes the engine forwards with a force of the same size. That is thrust.

Two features complicate the simple picture. First, the engine adds fuel, so slightly more mass leaves than enters. Second, the jet may not leave at ambient pressure: a nozzle that cannot expand the gas fully leaves the exit plane above ambient pressure, and that pressure difference acting over the exit area adds a further force. Both are captured by a careful control-volume analysis.

A third point is a matter of bookkeeping, not physics. The air that enters the engine had momentum $\dot m_0 V_0$ in the engine frame; taking it on board costs a force $\dot m_0 V_0$, the **ram drag** or **momentum drag**. A stationary engine on a test bed has no ram drag; the same engine at cruise loses a large fraction of its static thrust to it. This is why engine thrust falls with flight speed even though the jet speed rises.

## Thrust from a control-volume momentum balance

::: definition Station numbering and mass flows {#def-stations}
We follow an engine in its own frame, with the free stream far upstream at **station 0** (velocity $V_0$, static pressure $p_0$, air mass flow $\dot m_0$ entering the engine) and the nozzle exit at **station e** (called station 9 in the engine numbering of [[propulsion/gas-turbine-cycles]]), where the jet has mean axial velocity $V_e$, static pressure $p_e$ and area $A_e$. Fuel enters at mass flow rate $\dot m_f$, so the **fuel–air ratio** is $f = \dot m_f/\dot m_0$ and the exit mass flow is $\dot m_e = \dot m_0 + \dot m_f = (1+f)\,\dot m_0$. For kerosene-burning gas turbines $f$ is typically $0.015$–$0.03$.
:::

::: proposition The thrust equation {#prop-thrust}
For a propulsion device in steady flow, with uniform conditions over the exit plane and the surrounding flow at the free-stream pressure $p_0$ on every boundary of the control volume except the jet exit, the **uninstalled thrust** (the net axial force the engine exerts on its mounting) is
$$
F = \dot m_e V_e - \dot m_0 V_0 + (p_e - p_0)\,A_e .
$$ {#eq-thrust}
The term $\dot m_e V_e$ is the **momentum thrust**, $(p_e - p_0)A_e$ the **pressure thrust**, their sum is the **gross thrust** $F_G$, and $\dot m_0 V_0$ is the **ram drag**: $F = F_G - \dot m_0 V_0$.
:::

::: proof
Take the engine frame, in which the flow is steady, and draw a control volume shaped like a large cylinder of cross-sectional area $A$ around the engine (the "stream-tube" control volume of Hill and Peterson). Its front face is far upstream, where the velocity is $V_0$ and the pressure $p_0$ everywhere. Its rear face passes through the nozzle exit plane: over the jet area $A_e$ the conditions are $V_e$, $p_e$; over the rest, $A - A_e$, the external flow is undisturbed, at $V_0$ and $p_0$. The cylindrical side is far enough from the engine that the pressure on it is $p_0$, but air can cross it at a rate $\dot m_s$ carrying axial velocity $V_0$. The control volume also cuts the engine's mounting pylon, through which the structure transmits an axial force $F$ to the engine (positive forwards, against the flow). Fuel enters through the pylon with no axial momentum in this frame.

**Mass.** Inflow through the front face $\rho_0 V_0 A$ plus fuel $\dot m_f$ equals outflow through the jet $\dot m_e$, outflow through the rest of the rear face $\rho_0 V_0 (A - A_e)$ and outflow through the sides $\dot m_s$:
$$
\rho_0 V_0 A + \dot m_f = \dot m_e + \rho_0 V_0 (A - A_e) + \dot m_s
\quad\Longrightarrow\quad
\dot m_s = \rho_0 V_0 A_e - \dot m_0 ,
$$
using $\dot m_e - \dot m_f = \dot m_0$.

**Axial momentum** (positive downstream, the direction of the flow). Let $R$ be the axial force that the pylon exerts on the engine, counted positive downstream. The other axial forces on the contents of the control volume are the pressure on the front face, $+p_0 A$, and on the rear face, $-p_e A_e - p_0(A - A_e)$; the side pressure has no axial component on a cylinder. Their sum equals the net outflow of axial momentum (the fuel brings none):
$$
R + p_0 A - p_e A_e - p_0 (A - A_e)
= \dot m_e V_e + \rho_0 V_0^2 (A - A_e) + \dot m_s V_0 - \rho_0 V_0^2 A .
$$
The pressure terms on the left reduce to $-(p_e - p_0)A_e$. On the right, substituting $\dot m_s = \rho_0 V_0 A_e - \dot m_0$ makes every term in $\rho_0 V_0^2$ cancel, leaving $\dot m_e V_e - \dot m_0 V_0$. Hence
$$
R = \dot m_e V_e - \dot m_0 V_0 + (p_e - p_0)A_e .
$$
When the engine accelerates the flow, $R > 0$: the pylon has to push the engine *downstream* to hold it in place. By Newton's third law the engine pushes the pylon, and with it the aircraft, *forwards* with a force of the same magnitude, which is the thrust: $F = R$.

The large area $A$ and the side flow have cancelled, which is the whole point of the construction: only conditions at the inlet far field and the exit plane matter.

**Assumptions** used: steady flow in the engine frame; uniform velocity and pressure over the jet exit; pressure $p_0$ on all of the control surface outside the jet; axial velocity $V_0$ of the side outflow; viscous stresses on the control surface negligible; the fuel brings no axial momentum. External drag of the nacelle and pylon is deliberately excluded and charged to the aircraft — that is the meaning of *uninstalled*.
:::

Two remarks on [[#eq-thrust]]. First, the pressure thrust is real but is not a free gift: a nozzle that leaves $p_e > p_0$ has not converted all the available enthalpy into jet velocity, and in [[propulsion/inlets-nozzles]] we show that for a given nozzle flow the gross thrust is greatest when $p_e = p_0$ (the nozzle is *perfectly expanded*). Second, the ram drag is not an aerodynamic drag in the usual sense; it is the momentum the engine must give to air that it takes on board at flight speed.

::: definition Effective exhaust velocity, specific thrust {#def-specific-thrust}
The **effective exhaust velocity** $c$ lumps momentum and pressure thrust into one velocity,
$$
c = V_e + \frac{(p_e - p_0)A_e}{\dot m_e},
\qquad
F_G = \dot m_e\, c ,
$$
and for a perfectly expanded nozzle $c = V_e$. The **specific thrust** of an air-breathing engine is the thrust per unit air mass flow, $F/\dot m_0$, in $\mathrm{N\,s/kg}$ (dimensionally a velocity, $\mathrm{m/s}$). For a perfectly expanded nozzle,
$$
\frac{F}{\dot m_0} = (1+f)\,V_e - V_0 \approx V_e - V_0 .
$$
High specific thrust means a small, light engine for a given thrust; it is what a fighter or supersonic engine needs.
:::

::: example Thrust and efficiencies of a turbojet at cruise {#ex-turbojet-cruise}
A turbojet flies at $V_0 = 250\ \mathrm{m/s}$ with an air mass flow $\dot m_0 = 50\ \mathrm{kg/s}$ and fuel–air ratio $f = 0.020$; its nozzle is perfectly expanded and the jet leaves at $V_e = 600\ \mathrm{m/s}$. The fuel has a lower heating value $h_{PR} = 43\ \mathrm{MJ/kg}$. Find the thrust, the thrust-specific fuel consumption and the thermal, propulsive and overall efficiencies (defined in the next section).
::: solution
**Thrust.** With $p_e = p_0$, [[#eq-thrust]] gives
$$
F = \dot m_0\left[(1+f)V_e - V_0\right] = 50\left[1.020 \times 600 - 250\right] = 50 \times 362 = 18\,100\ \mathrm{N} = 18.1\ \mathrm{kN}.
$$
The ram drag $\dot m_0 V_0 = 12.5\ \mathrm{kN}$ is two-fifths of the gross thrust $30.6\ \mathrm{kN}$: at cruise most of the "work" of the jet goes into overcoming the momentum of the incoming air.

**Fuel consumption.** $\dot m_f = f\dot m_0 = 1.00\ \mathrm{kg/s}$, so
$$
\mathrm{TSFC} = \frac{\dot m_f}{F} = \frac{1.00}{18\,100} = 5.52\times10^{-5}\ \mathrm{kg/(N\,s)} = 55.2\ \mathrm{g/(kN\,s)}.
$$

**Efficiencies.** The rate at which the engine raises the kinetic energy of the stream is
$$
\Delta\dot K = \tfrac12\left[\dot m_e V_e^2 - \dot m_0 V_0^2\right] = \tfrac12\left[51.0 \times 600^2 - 50 \times 250^2\right] = 7.62\ \mathrm{MW}.
$$
The thrust power is $F V_0 = 18\,100 \times 250 = 4.53\ \mathrm{MW}$ and the fuel power $\dot m_f h_{PR} = 43.0\ \mathrm{MW}$. Hence
$$
\eta_{th} = \frac{7.62}{43.0} = 0.177,\qquad
\eta_p = \frac{4.53}{7.62} = 0.594,\qquad
\eta_o = \frac{4.53}{43.0} = 0.105 = \eta_{th}\,\eta_p .
$$
**Check.** The simple formula $\eta_p = 2/(1 + V_e/V_0) = 2/3.4 = 0.588$ (which neglects the fuel mass) is within 1 %. An overall efficiency of about 10 % and a TSFC above $50\ \mathrm{g/(kN\,s)}$ are typical of an early, low-pressure-ratio turbojet; a modern turbofan does three to four times better, as we shall see.
:::
:::

## Fuel consumption and specific impulse

::: definition Thrust-specific fuel consumption and specific impulse {#def-tsfc}
The **thrust-specific fuel consumption** is the fuel mass flow per unit thrust,
$$
\mathrm{TSFC} = \frac{\dot m_f}{F}\quad[\mathrm{kg/(N\,s)}],
$$
usually quoted in $\mathrm{g/(kN\,s)}$, which is the same as $\mathrm{mg/(N\,s)}$. (Older and US data use $\mathrm{lb/(lbf\,h)}$; $1\ \mathrm{lb/(lbf\,h)} = 28.33\ \mathrm{g/(kN\,s)}$.) The **specific impulse** is the impulse delivered per unit *weight* of propellant consumed,
$$
I_{sp} = \frac{F}{\dot m_p\, g_0}\quad[\mathrm{s}],\qquad g_0 = 9.80665\ \mathrm{m/s^2},
$$
where $\dot m_p$ is the propellant mass flow the vehicle carries: the fuel alone for an air-breather (the air is free), so $I_{sp} = 1/(g_0\,\mathrm{TSFC})$; fuel plus oxidiser for a rocket, so that $I_{sp} = c/g_0$.
:::

The two measures describe the same thing upside down: low TSFC is good, high $I_{sp}$ is good. Air-breathing engines are usually quoted in TSFC and rockets in $I_{sp}$. For orientation (published values, order of magnitude only): a modern high-bypass turbofan at cruise has a TSFC of about $14$–$16\ \mathrm{g/(kN\,s)}$, equivalent to $I_{sp} \approx 6500$–$7300\ \mathrm{s}$; a supersonic afterburning turbojet with reheat lit uses several times more; a liquid-hydrogen–oxygen rocket in vacuum reaches $I_{sp} \approx 450\ \mathrm{s}$, a figure that looks dismal until you remember that the rocket carries its oxidiser as well.

::: warning Static thrust is not cruise thrust, and TSFC depends on speed
Engine brochures quote sea-level static thrust ($V_0 = 0$, no ram drag). At cruise the ram drag $\dot m_0 V_0$ and the low air density cut the available thrust of a high-bypass turbofan to roughly a fifth of its take-off rating, and the TSFC is *higher* at cruise than on the test bed even though the engine is more efficient there. TSFC is fuel per unit *force*, while efficiency is about power, $F V_0$: at $V_0 = 0$ an engine delivers thrust but no thrust power, and its overall efficiency is zero whatever its TSFC. Never compare TSFC values taken at different flight speeds as if they measured efficiency — compare $\eta_o = V_0/(\mathrm{TSFC}\,h_{PR})$ instead (see [[#prop-overall]]).
:::

## Thermal, propulsive and overall efficiency

An engine converts chemical energy in the fuel into thrust power in two stages: first the cycle turns heat into an increase of the kinetic energy of the stream (a heat engine), then that kinetic energy is turned into useful work on the vehicle (a propulsor). The efficiency of each stage is defined separately.

::: definition Thermal, propulsive and overall efficiency {#def-efficiencies}
With $\Delta\dot K = \tfrac12\left(\dot m_e V_e^2 - \dot m_0 V_0^2\right)$ the rate of increase of kinetic energy of the flow through the engine (in the engine frame) and $h_{PR}$ the lower heating value of the fuel,
$$
\eta_{th} = \frac{\Delta\dot K}{\dot m_f\, h_{PR}},\qquad
\eta_p = \frac{F\,V_0}{\Delta\dot K},\qquad
\eta_o = \frac{F\,V_0}{\dot m_f\, h_{PR}} = \eta_{th}\,\eta_p .
$$
The **thermal efficiency** measures the engine as a heat engine; the **propulsive efficiency** measures how much of the kinetic energy produced becomes useful thrust power; the **overall efficiency** is their product. For a turboprop or turboshaft, $\Delta\dot K$ is replaced by the shaft power delivered plus any jet kinetic-energy increase.
:::

::: proposition Propulsive efficiency of a jet {#prop-propulsive}
For a perfectly expanded jet ($p_e = p_0$) with negligible fuel mass ($f \ll 1$, so $\dot m_e = \dot m_0 = \dot m$),
$$
\eta_p = \frac{2V_0}{V_e + V_0} = \frac{2}{1 + V_e/V_0},
$$ {#eq-etap}
and the power not converted into thrust power is exactly the kinetic energy left in the wake as seen by a stationary observer, $\tfrac12\dot m\,(V_e - V_0)^2$ per unit time.
:::

::: proof
With $f \to 0$ and $p_e = p_0$, [[#eq-thrust]] reduces to $F = \dot m (V_e - V_0)$. The kinetic-energy increase is
$$
\Delta\dot K = \tfrac12 \dot m\,(V_e^2 - V_0^2) = \tfrac12 \dot m\,(V_e - V_0)(V_e + V_0) = \tfrac12 F\,(V_e + V_0),
$$
so $\eta_p = F V_0/\Delta\dot K = 2V_0/(V_e + V_0)$. The difference
$$
\Delta\dot K - F V_0 = \tfrac12\dot m\left(V_e^2 - V_0^2\right) - \dot m (V_e - V_0)V_0 = \tfrac12\dot m\,(V_e - V_0)^2
$$
is the rate at which kinetic energy is deposited in the atmosphere: in the ground frame the air was at rest and is left moving backwards at $V_e - V_0$. Assumptions: those of [[#prop-thrust]], plus $p_e = p_0$ and $f \ll 1$; including $f$ changes $\eta_p$ by about one per cent (example [[#ex-turbojet-cruise]]).
:::

[[#eq-etap]] contains the central dilemma of propulsion. Thrust per unit mass flow is $V_e - V_0$, so a *compact* engine wants a large velocity increment; propulsive efficiency tends to 1 only as $V_e \to V_0$, which needs a small increment and therefore an enormous mass flow for a given thrust. A rocket at lift-off ($V_0 = 0$) has $\eta_p = 0$; a fighter engine with $V_e/V_0 \approx 2.5$ has $\eta_p \approx 0.57$; a high-bypass turbofan at cruise with $V_e/V_0 \approx 1.3$–$1.4$ in the fan stream reaches $\eta_p \approx 0.85$; a propeller, which accelerates a very large stream tube by a few per cent, is better still at low speed. Every engine in [[propulsion/gas-turbine-cycles]] and [[propulsion/propellers]] is a different compromise along this curve.

::: widget plot
f: 2/(1 + 1/x); 1 - x
x: 0.02, 1
y: 0, 1
labels: \eta_p; F/(\dot m V_e)
points: 0.4167, 0.5882; 0.7407, 0.8511
caption: Propulsive efficiency $\eta_p$ (blue) and specific thrust as a fraction of the jet velocity, $F/(\dot m V_e) = 1 - V_0/V_e$ (second curve), both against the speed ratio $x = V_0/V_e$. The marked points are the turbojet of example [[#ex-turbojet-cruise]] ($V_e/V_0 = 2.4$) and a fan stream with $V_e/V_0 = 1.35$. Read the two curves together: every gain in efficiency is paid for in thrust per kilogram of air, which is why efficient engines are big.
:::

::: quiz
Two engines produce the same thrust at the same flight speed. Engine A has twice the mass flow of engine B. Which statement is true?
- [ ] A has the higher jet velocity and the higher propulsive efficiency.
- [x] A has the lower jet velocity and the higher propulsive efficiency.
- [ ] Both have the same propulsive efficiency, because the thrust is the same.
- [ ] A has the lower propulsive efficiency, because it must accelerate more air.
::: solution
At equal thrust, $\dot m (V_e - V_0)$ is fixed, so doubling $\dot m$ halves the velocity increment $V_e - V_0$. A smaller $V_e/V_0$ gives a larger $\eta_p = 2/(1 + V_e/V_0)$. The kinetic energy wasted in the wake, $\tfrac12 \dot m (V_e - V_0)^2 = \tfrac12 F (V_e - V_0)$, is halved.
:::
:::

::: example Why airliners have big fans {#ex-big-fan}
An airliner needs $F = 100\ \mathrm{kN}$ of thrust per engine at $V_0 = 240\ \mathrm{m/s}$. Compare (a) an engine that does it with $\dot m = 200\ \mathrm{kg/s}$ and (b) one that uses $\dot m = 1000\ \mathrm{kg/s}$, both perfectly expanded with negligible fuel mass. If both engines produce kinetic energy with the same thermal efficiency, by what fraction does (b) reduce fuel flow?
::: solution
(a) $V_e - V_0 = F/\dot m = 500\ \mathrm{m/s}$, so $V_e = 740\ \mathrm{m/s}$ and $\eta_p = 2/(1 + 740/240) = 0.490$.
(b) $V_e - V_0 = 100\ \mathrm{m/s}$, $V_e = 340\ \mathrm{m/s}$ and $\eta_p = 2/(1 + 340/240) = 0.828$.

The power the engine core must deliver to the stream is $\Delta\dot K = \tfrac12 F (V_e + V_0)$:
$$
\Delta\dot K_a = \tfrac12 \times 10^5 \times 980 = 49.0\ \mathrm{MW},\qquad
\Delta\dot K_b = \tfrac12 \times 10^5 \times 580 = 29.0\ \mathrm{MW}.
$$
Both deliver the same thrust power $F V_0 = 24.0\ \mathrm{MW}$. At equal thermal efficiency the fuel flow is proportional to $\Delta\dot K$, so (b) burns $1 - 29.0/49.0 = 41\,\%$ less fuel.

**Check.** The wasted power $\tfrac12 F (V_e - V_0)$ is $25\ \mathrm{MW}$ in (a) and $5\ \mathrm{MW}$ in (b); $24 + 25 = 49$ and $24 + 5 = 29$, as they must. The price of (b) is a five-times larger mass flow: at the same inlet Mach number, roughly $\sqrt5 \approx 2.2$ times the fan diameter, with the weight and nacelle drag that go with it. Choosing the bypass ratio is the art of trading these.
:::
:::

::: proposition Overall efficiency from TSFC {#prop-overall}
The overall efficiency of an air-breathing engine is fixed by its fuel consumption and flight speed alone:
$$
\eta_o = \frac{V_0}{\mathrm{TSFC}\; h_{PR}} .
$$ {#eq-eta-overall}
:::

::: proof
By definition $\eta_o = F V_0/(\dot m_f h_{PR})$. Divide numerator and denominator by $F$ and use $\mathrm{TSFC} = \dot m_f/F$. No assumption beyond the definitions is needed — in particular the result holds for installed engines and real nozzles, which is why it is the fair way to compare engines tested at different conditions.
:::

[[#eq-eta-overall]] shows at once why TSFC must rise with flight speed for an engine of fixed efficiency: at $\eta_o = 0.35$ and $h_{PR} = 43\ \mathrm{MJ/kg}$, $\mathrm{TSFC} = 15.9\ \mathrm{g/(kN\,s)}$ at $V_0 = 240\ \mathrm{m/s}$ but $39.9\ \mathrm{g/(kN\,s)}$ at $600\ \mathrm{m/s}$, with no change in the quality of the engine.

::: example A convergent nozzle at take-off: pressure thrust {#ex-pressure-thrust}
A small turbojet runs on a sea-level test bed ($V_0 = 0$, $p_0 = 101.3\ \mathrm{kPa}$). The gas reaching its convergent nozzle has stagnation temperature $T_t = 950\ \mathrm{K}$ and stagnation pressure $p_t = 220\ \mathrm{kPa}$, mass flow $\dot m_e = 80\ \mathrm{kg/s}$, $\gamma = 1.33$, $R = 287\ \mathrm{J/(kg\,K)}$. The nozzle is choked (exit Mach number 1). Find the exit conditions, the exit area, the momentum and pressure thrust, the effective exhaust velocity, and compare with an ideal nozzle that expands fully to $p_0$.
::: solution
For a choked isentropic nozzle the exit is at sonic conditions ([[fluid-mechanics/compressible-flow]]):
$$
T_e = \frac{2T_t}{\gamma + 1} = \frac{2 \times 950}{2.33} = 815\ \mathrm{K},\qquad
V_e = \sqrt{\gamma R T_e} = \sqrt{1.33 \times 287 \times 815} = 558\ \mathrm{m/s},
$$
$$
p_e = p_t\left(\frac{2}{\gamma+1}\right)^{\gamma/(\gamma-1)} = 220 \times 0.5404 = 118.9\ \mathrm{kPa}.
$$
The exit density is $\rho_e = p_e/(R T_e) = 0.508\ \mathrm{kg/m^3}$, so $A_e = \dot m_e/(\rho_e V_e) = 0.282\ \mathrm{m^2}$. Then
$$
F = \underbrace{80 \times 558}_{44.6\ \mathrm{kN}} + \underbrace{(118.9 - 101.3)\times10^3 \times 0.282}_{5.0\ \mathrm{kN}} = 49.6\ \mathrm{kN},
\qquad c = \frac{F}{\dot m_e} = 620\ \mathrm{m/s}.
$$
An ideal nozzle expanding to $p_0$ would give $T_e = T_t (p_0/p_t)^{(\gamma-1)/\gamma} = 785\ \mathrm{K}$ and $V_e = \sqrt{2c_p (T_t - T_e)}$ with $c_p = \gamma R/(\gamma - 1) = 1157\ \mathrm{J/(kg\,K)}$: $V_e = 620.2\ \mathrm{m/s}$, $F = 49.6\ \mathrm{kN}$.

**Check.** The convergent nozzle loses only about $0.05\,\%$ of thrust here because the nozzle pressure ratio $p_t/p_0 = 2.17$ is barely above the critical value $1.85$; the pressure thrust almost exactly makes up for the velocity not reached. At the much higher pressure ratios of supersonic flight the loss grows to several per cent, which is why supersonic aircraft use convergent–divergent nozzles ([[propulsion/inlets-nozzles]]).
:::
:::

## Range: the Breguet equation

An airline cares about fuel burned per kilometre, which depends on the engine *and* the airframe. In steady level cruise, lift equals weight and thrust equals drag, so $F = D = W/(L/D)$, where $L/D$ is the lift-to-drag ratio.

::: proposition The Breguet range equation {#prop-breguet}
An aircraft cruising at constant flight speed $V_0$, constant lift-to-drag ratio $L/D$ and constant TSFC, from initial mass $m_i$ to final mass $m_f$, covers the range
$$
R = \frac{V_0}{g\,\mathrm{TSFC}}\,\frac{L}{D}\,\ln\frac{m_i}{m_f}
  = \eta_o\,\frac{h_{PR}}{g}\,\frac{L}{D}\,\ln\frac{m_i}{m_f}.
$$ {#eq-breguet}
:::

::: proof
The aircraft's mass falls at the rate fuel is burned: $\mathrm{d}m/\mathrm{d}t = -\dot m_f = -\mathrm{TSFC}\,F$. In steady level flight $F = D$ and $L = mg$, so $F = mg/(L/D)$ and
$$
\frac{\mathrm{d}m}{m} = -\frac{g\,\mathrm{TSFC}}{L/D}\,\mathrm{d}t = -\frac{g\,\mathrm{TSFC}}{V_0\,(L/D)}\,\mathrm{d}s,
$$
using $\mathrm{d}s = V_0\,\mathrm{d}t$ for the distance flown. With $V_0$, $L/D$ and TSFC constant, integrate from $m_i$ at $s = 0$ to $m_f$ at $s = R$:
$$
\ln\frac{m_i}{m_f} = \frac{g\,\mathrm{TSFC}}{V_0\,(L/D)}\,R .
$$
Solving for $R$ gives the first form; [[#eq-eta-overall]] gives the second. Assumptions: steady, level, unaccelerated flight; constant $V_0$, $L/D$, TSFC (in practice the aircraft climbs slowly as it gets lighter — the "cruise climb" — so that $L/D$ stays near its best value); $g$ constant; climb, descent and reserves excluded.
:::

The second form is beautiful: range is the product of an *engine* figure ($\eta_o$), a *fuel* figure ($h_{PR}/g$, about $4400\ \mathrm{km}$ for kerosene), an *aerodynamic* figure ($L/D$) and a *structural* figure (the mass ratio). Every term is a separate engineering discipline.

::: example Long-haul cruise range {#ex-breguet}
A twin-engine airliner cruises at $V_0 = 250\ \mathrm{m/s}$ (Mach 0.85 at $11\ \mathrm{km}$) with $L/D = 18$ and $\mathrm{TSFC} = 15\ \mathrm{g/(kN\,s)}$. It starts cruise at $m_i = 1.35\, m_f$. Estimate the cruise range and the engines' overall efficiency ($h_{PR} = 43\ \mathrm{MJ/kg}$).
::: solution
With $\mathrm{TSFC} = 1.5\times10^{-5}\ \mathrm{kg/(N\,s)}$ and $g = 9.81\ \mathrm{m/s^2}$:
$$
\frac{V_0}{g\,\mathrm{TSFC}} = \frac{250}{9.81 \times 1.5\times10^{-5}} = 1.70\times10^{6}\ \mathrm{m},
\qquad
R = 1.70\times10^{6} \times 18 \times \ln 1.35 = 9.18\times10^{6}\ \mathrm{m} \approx 9200\ \mathrm{km}.
$$
The overall efficiency is $\eta_o = V_0/(\mathrm{TSFC}\, h_{PR}) = 250/(1.5\times10^{-5} \times 4.3\times10^{7}) = 0.39$.

**Check.** The second form: $0.39 \times (4.3\times10^{7}/9.81) \times 18 \times 0.300 = 9.2\times10^{6}\ \mathrm{m}$. A fuel load of $1 - 1/1.35 = 26\,\%$ of the start-of-cruise mass for about $9000\ \mathrm{km}$ is in line with long-haul twin-jets. Each per cent off TSFC buys one per cent more range — or, at fixed range, roughly one per cent less fuel, which is why engine makers fight over fractions of a per cent.
:::
:::

::: widget plot
f: V/(9.81*s*1e-6)*L*ln(x)/1000
x: 1, 1.6
y: 0, 16000
sliders: V=250:150:300:5; L=18:8:25:0.5; s=15:8:30:0.5
labels: R\ (\mathrm{km})
points: 1.35, 9177
caption: Breguet range in kilometres against the mass ratio $m_i/m_f$, with sliders for the flight speed $V$ (m/s), the lift-to-drag ratio $L$ and the TSFC $s$ in $\mathrm{g/(kN\,s)}$. The point is example [[#ex-breguet]]. Notice that range is *linear* in $V/s$ and in $L/D$ but only *logarithmic* in mass ratio: carrying more fuel is a weak lever, because the extra fuel must itself be carried.
:::

## Rockets as the limiting case

A rocket carries all of its propellant, so nothing enters from the free stream: $\dot m_0 = 0$ and [[#eq-thrust]] becomes $F = \dot m\,c$, independent of flight speed. The efficiency bookkeeping must change too, because the propellant itself has kinetic energy $\tfrac12 \dot m V_0^2$ (in the ground frame) before it is burned. The useful power is $F V_0$; the power lost is the kinetic energy of the exhaust relative to the ground, $\tfrac12 \dot m (c - V_0)^2$. Hence
$$
\eta_{p,\text{rocket}} = \frac{\dot m c V_0}{\dot m c V_0 + \tfrac12\dot m (c - V_0)^2} = \frac{2\,(V_0/c)}{1 + (V_0/c)^2},
$$ {#eq-etap-rocket}
which is zero at lift-off, rises to 1 when the vehicle flies at exactly the exhaust speed (the exhaust is then left *at rest* in the ground frame), and falls again beyond. The rocket equation, staging and nozzle performance are developed in [[propulsion/rocket-fundamentals]].

::: example Propulsive efficiency of a climbing rocket stage {#ex-rocket-etap}
A launch-vehicle stage has effective exhaust velocity $c = 3.0\ \mathrm{km/s}$. Find its propulsive efficiency at $V_0 = 0$, $0.9$, $3.0$ and $6.0\ \mathrm{km/s}$.
::: solution
With $x = V_0/c$ = $0$, $0.3$, $1$, $2$:
$$
\eta_p = \frac{2x}{1+x^2} = 0,\quad \frac{0.6}{1.09} = 0.55,\quad 1,\quad \frac{4}{5} = 0.80 .
$$
**Check.** The function is symmetric under $x \to 1/x$ ($\eta_p(2) = \eta_p(0.5) = 0.8$), and at $x = 1$ the exhaust is at rest in the ground frame, so no kinetic energy is wasted. Low $\eta_p$ early in flight is unavoidable; it is one reason why the payload fraction of a launch vehicle is so small.
:::
:::

::: history
The momentum theory of a propulsor goes back to W. J. M. Rankine (1865) and R. E. Froude (1889), who analysed ship propellers as discs that accelerate a stream tube ([[propulsion/propellers]]); the result that propulsive efficiency rises as the jet velocity approaches the flight speed was thus known decades before the jet engine. Louis Breguet's name is attached to the range equation from his work on long-range aircraft in the 1920s. The first jet engines — Frank Whittle's in Britain (first run 1937) and Hans von Ohain's in Germany (first flight, in the Heinkel He 178, August 1939) — were pure turbojets with high jet velocities and low propulsive efficiency. The Rolls-Royce Conway, which entered airline service around 1960, was the first bypass engine in service, with a bypass ratio of only about 0.3. The step to high bypass came with the General Electric TF39 for the Lockheed C-5 (bypass ratio about 8) and the Pratt & Whitney JT9D, which entered airline service on the Boeing 747 in January 1970 and cut fuel burn per seat dramatically — [[#eq-etap]] made into hardware.
:::

::: summary
- Thrust follows from a control-volume momentum balance: $F = \dot m_e V_e - \dot m_0 V_0 + (p_e - p_0)A_e$, gross thrust minus ram drag; it is uninstalled thrust, and nacelle and pylon drag are charged to the airframe.
- The effective exhaust velocity $c = F_G/\dot m_e$ absorbs the pressure thrust; specific thrust $F/\dot m_0 \approx V_e - V_0$ measures engine compactness.
- $\mathrm{TSFC} = \dot m_f/F$ (in $\mathrm{g/(kN\,s)}$) and $I_{sp} = F/(\dot m_p g_0)$ measure fuel economy; for air-breathers $I_{sp} = 1/(g_0\,\mathrm{TSFC})$.
- $\eta_o = \eta_{th}\eta_p = V_0/(\mathrm{TSFC}\,h_{PR})$; compare engines by $\eta_o$, not by TSFC at different speeds.
- Propulsive efficiency $\eta_p = 2/(1 + V_e/V_0)$: high efficiency needs a small velocity increment and hence a large mass flow — the reason for turbofans and propellers.
- Breguet range $R = \eta_o (h_{PR}/g)(L/D)\ln(m_i/m_f)$ separates engine, fuel, aerodynamics and structure.
- For rockets $\eta_p = 2(V_0/c)/[1 + (V_0/c)^2]$, maximal when the vehicle flies at the exhaust speed.
:::

## Exercises

::: exercise {#exr-static-thrust level=1 check="33"}
An engine on a static test stand swallows $60\ \mathrm{kg/s}$ of air and expels it, with negligible added fuel mass, at $550\ \mathrm{m/s}$ through a perfectly expanded nozzle. Find the thrust. (Enter the thrust in kN.)
::: solution
$V_0 = 0$, $p_e = p_0$: $F = \dot m V_e = 60 \times 550 = 33\,000\ \mathrm{N} = 33\ \mathrm{kN}$.
:::
::: answer
$33\ \mathrm{kN}$
:::
:::

::: exercise {#exr-tsfc level=1 check="20"}
At cruise an engine produces $40\ \mathrm{kN}$ of thrust while burning $0.80\ \mathrm{kg/s}$ of fuel. Find its TSFC. (Enter the TSFC in g/(kN·s).)
::: solution
$\mathrm{TSFC} = 0.80/40\,000 = 2.0\times10^{-5}\ \mathrm{kg/(N\,s)} = 20\ \mathrm{g/(kN\,s)}$. Its specific impulse is $1/(9.80665 \times 2.0\times10^{-5}) = 5100\ \mathrm{s}$.
:::
::: answer
$20\ \mathrm{g/(kN\,s)}$
:::
:::

::: exercise {#exr-etap level=1 check="0.8"}
The fan stream of a turbofan leaves the nozzle at $1.5$ times the flight speed. Neglecting fuel mass and assuming perfect expansion, what is the propulsive efficiency of this stream? (Enter a decimal fraction.)
::: solution
$\eta_p = 2/(1 + 1.5) = 0.8$.
:::
:::

::: exercise {#exr-ram-drag level=2 check="35"}
An engine flying at $V_0 = 250\ \mathrm{m/s}$ with an air mass flow of $100\ \mathrm{kg/s}$ has a gross thrust of $60\ \mathrm{kN}$. What is its net thrust, and what would the net thrust be if the same gross thrust were measured at $V_0 = 0$? (Enter the net thrust at 250 m/s in kN.)
::: solution
Ram drag $= \dot m_0 V_0 = 100 \times 250 = 25\ \mathrm{kN}$, so $F = 60 - 25 = 35\ \mathrm{kN}$. At $V_0 = 0$ there is no ram drag and the net thrust equals the gross thrust, $60\ \mathrm{kN}$. (In reality the gross thrust itself changes with flight speed, because the ram compression changes the nozzle conditions.)
:::
::: answer
$35\ \mathrm{kN}$
:::
:::

::: exercise {#exr-overall level=2 check="0.349"}
An engine has a TSFC of $16\ \mathrm{g/(kN\,s)}$ at a cruise speed of $240\ \mathrm{m/s}$; the fuel's lower heating value is $43\ \mathrm{MJ/kg}$. Find the overall efficiency. If its propulsive efficiency is 0.75, what is its thermal efficiency? (Enter the overall efficiency as a decimal fraction rounded to three significant figures.)
::: solution
$\eta_o = V_0/(\mathrm{TSFC}\,h_{PR}) = 240/(1.6\times10^{-5} \times 4.3\times10^{7}) = 240/688 = 0.349$. Then $\eta_{th} = \eta_o/\eta_p = 0.349/0.75 = 0.465$.
:::
::: answer
$\eta_o = 0.349$, $\eta_{th} = 0.465$
:::
:::

::: exercise {#exr-breguet-fuel level=2 check="21.4"}
An aircraft must cruise $6000\ \mathrm{km}$ at $V_0 = 230\ \mathrm{m/s}$ with $L/D = 17$ and $\mathrm{TSFC} = 16\ \mathrm{g/(kN\,s)}$; take $g = 9.81\ \mathrm{m/s^2}$. What fraction of its start-of-cruise mass must be cruise fuel? (Enter the percentage rounded to three significant figures.)
::: hint
Invert [[#eq-breguet]] for $\ln(m_i/m_f)$; the fuel fraction is $1 - m_f/m_i$.
:::
::: solution
$$
\ln\frac{m_i}{m_f} = \frac{R\,g\,\mathrm{TSFC}}{V_0\,(L/D)} = \frac{6\times10^{6} \times 9.81 \times 1.6\times10^{-5}}{230 \times 17} = \frac{941.8}{3910} = 0.2409,
$$
so $m_i/m_f = 1.2723$ and the fuel fraction is $1 - 1/1.2723 = 0.214 = 21.4\,\%$.
:::
::: answer
$21.4\,\%$
:::
:::

::: exercise {#exr-underexpanded level=2 check="32"}
A rocket nozzle designed for high altitude is fired at sea level ($p_0 = 101.3\ \mathrm{kPa}$). It passes $\dot m = 20\ \mathrm{kg/s}$ with exit velocity $V_e = 2600\ \mathrm{m/s}$, exit pressure $p_e = 51.3\ \mathrm{kPa}$ and exit area $A_e = 0.40\ \mathrm{m^2}$. Is the nozzle over- or under-expanded? Find the thrust and the effective exhaust velocity, assuming the flow stays attached to the nozzle wall. (Enter the thrust in kN.)
::: solution
$p_e < p_0$, so the nozzle is **over-expanded** and the pressure thrust is negative:
$$
(p_e - p_0)A_e = (51.3 - 101.3)\times10^{3} \times 0.40 = -20.0\ \mathrm{kN}.
$$
The momentum thrust is $\dot m V_e = 20 \times 2600 = 52.0\ \mathrm{kN}$, so $F = 52.0 - 20.0 = 32.0\ \mathrm{kN}$ and $c = F/\dot m = 1600\ \mathrm{m/s}$. The loss is large because the exit pressure is half of ambient; in practice a nozzle this over-expanded would suffer flow separation from the wall, which changes the numbers (often reducing the penalty) and loads the nozzle unevenly. In vacuum the same nozzle would give $52.0 + 51.3\times10^{3}\times0.40/10^3 = 72.5\ \mathrm{kN}$.
:::
::: answer
Over-expanded; $F = 32\ \mathrm{kN}$, $c = 1600\ \mathrm{m/s}$.
:::
:::

::: exercise {#exr-fan-sizing level=3 check="400"}
A designer wants a fan stream to deliver $50\ \mathrm{kN}$ at a flight speed of $250\ \mathrm{m/s}$ with a propulsive efficiency of at least $0.80$ (perfect expansion, no fuel in this stream). What is the minimum mass flow? (Enter the mass flow in kg/s.)
::: solution
$\eta_p = 0.80$ requires $V_e/V_0 = 2/0.80 - 1 = 1.5$, so $V_e = 375\ \mathrm{m/s}$ and $V_e - V_0 = 125\ \mathrm{m/s}$. Thrust $F = \dot m (V_e - V_0)$ then needs $\dot m = 50\,000/125 = 400\ \mathrm{kg/s}$. A larger mass flow gives higher efficiency at the same thrust, so this is the minimum.
:::
::: answer
$400\ \mathrm{kg/s}$
:::
:::

::: exercise {#exr-jet-power level=3}
Show that, for a perfectly expanded jet with negligible fuel mass, the power the engine core must add to the stream to produce a thrust $F$ at flight speed $V_0$ with mass flow $\dot m$ is
$$
\Delta\dot K = F V_0 + \frac{F^2}{2\dot m}.
$$
Interpret both terms, and use the result to explain why, at fixed $F$ and $V_0$, increasing the mass flow always reduces the power required, but with diminishing returns.
::: solution
With $F = \dot m (V_e - V_0)$, $V_e = V_0 + F/\dot m$, and
$$
\Delta\dot K = \tfrac12\dot m (V_e^2 - V_0^2) = \tfrac12 \dot m\left(2V_0\frac{F}{\dot m} + \frac{F^2}{\dot m^2}\right) = F V_0 + \frac{F^2}{2\dot m}.
$$
The first term is the useful thrust power, which does not depend on how the thrust is produced. The second is the kinetic energy left in the wake, $\tfrac12\dot m (V_e - V_0)^2$. It falls as $1/\dot m$: doubling the mass flow halves the loss, but each further doubling saves only half as much as the previous one, while nacelle drag and engine weight grow roughly in proportion to $\dot m$. The best bypass ratio is where the marginal saving in wake loss equals the marginal installation penalty.
:::
:::

::: exercise {#exr-rocket-etap level=3 check="0.55"}
For the rocket propulsive efficiency [[#eq-etap-rocket]], (a) show that it is greatest when $V_0 = c$; (b) find its value at $V_0/c = 0.3$. (Enter the value at $V_0/c = 0.3$ rounded to two significant figures.)
::: solution
(a) With $x = V_0/c$, $\eta_p = 2x/(1+x^2)$ and $\mathrm{d}\eta_p/\mathrm{d}x = 2(1 - x^2)/(1+x^2)^2$, which vanishes at $x = 1$, where $\eta_p = 1$; it is positive for $x < 1$ and negative for $x > 1$, so this is the maximum. (b) $\eta_p = 0.6/1.09 = 0.55$.
:::
::: answer
(b) $0.55$
:::
:::
