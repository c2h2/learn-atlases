How fast can an aircraft fly, how slowly, how steeply can it climb, how far can it glide with the engine stopped, and how high can it go? These are the questions of **aircraft performance**, and in steady flight — no acceleration, so every force balances — they can all be answered from two pieces of information: the aircraft's **drag polar**, which says how much drag it makes for a given lift, and its **thrust or power available** from the engines. This lesson builds the standard atmosphere in which the calculations are done, sets up the equations of steady flight from a free-body diagram, and then derives the classic results: minimum drag and minimum power, maximum speed, rate and angle of climb, ceilings and gliding flight.

The aerodynamics comes from [[aerodynamics/finite-wings]] (induced drag and the Oswald efficiency factor) and [[aerodynamics/viscous-aerodynamics]] (skin friction and form drag); the propulsion side — how thrust and power vary with speed and altitude — is the subject of [[propulsion/thrust-efficiency]] and [[propulsion/propellers]]. Here both are taken as given.

Two aircraft are used throughout the course so that numbers can be compared from lesson to lesson. They are generic, not models of particular types, but their data are typical of their classes.

| | light aircraft (LA) | jet transport (JT) |
|---|---|---|
| mass $m$ | $1100\ \mathrm{kg}$ | $70\,000\ \mathrm{kg}$ |
| wing area $S$ | $16.2\ \mathrm{m^2}$ | $122.6\ \mathrm{m^2}$ |
| aspect ratio $AR$ | $7.5$ | $9.5$ |
| Oswald factor $e$ | $0.80$ | $0.80$ |
| zero-lift drag coefficient $C_{D0}$ | $0.030$ | $0.020$ |
| maximum lift coefficient $C_{L,\max}$ (clean) | $1.5$ | $1.4$ |
| powerplant | piston engine, $100\ \mathrm{kW}$ shaft power at sea level, propeller efficiency $\eta_p = 0.75$ | two turbofans |

## The standard atmosphere {#sec-isa}

Aircraft performance depends strongly on air density, which falls by a factor of about four between sea level and the cruising altitude of an airliner. To compare aircraft, certify them and calibrate their instruments, engineers use a model atmosphere agreed by international standard.

::: definition International Standard Atmosphere {#def-isa}
The **International Standard Atmosphere** (ISA, ISO 2533:1975, identical to the U.S. Standard Atmosphere 1976 below $32\ \mathrm{km}$) treats air as a dry ideal gas with $R = 287.05\ \mathrm{J\,kg^{-1}\,K^{-1}}$ in hydrostatic equilibrium under constant gravity $g_0 = 9.80665\ \mathrm{m/s^2}$, with sea-level values
$$
T_0 = 288.15\ \mathrm{K},\qquad p_0 = 101\,325\ \mathrm{Pa},\qquad \rho_0 = 1.225\ \mathrm{kg/m^3},
$$
and a temperature that falls linearly with geopotential altitude $h$ at the **lapse rate** $\lambda = 6.5\ \mathrm{K/km}$ through the **troposphere** up to the **tropopause** at $11\ \mathrm{km}$, above which it is constant at $216.65\ \mathrm{K}$ up to $20\ \mathrm{km}$ (the lower **stratosphere**). The **density ratio** is $\sigma = \rho/\rho_0$.
:::

Real days differ — an "ISA $+20$" day in summer has temperatures $20\ \mathrm{K}$ above standard at every altitude — but performance data are always reduced to and quoted for ISA conditions.

::: proposition Pressure and density in the standard atmosphere {#prop-troposphere}
In the troposphere ($0 \le h \le 11\ \mathrm{km}$), with $T = T_0 - \lambda h$,
$$
\frac{p}{p_0} = \left(\frac{T}{T_0}\right)^{g_0/(R\lambda)},\qquad
\frac{\rho}{\rho_0} = \left(\frac{T}{T_0}\right)^{g_0/(R\lambda) - 1},\qquad \frac{g_0}{R\lambda} = 5.2559 .
$$ {#eq-troposphere}
In the isothermal layer above $h_{11} = 11\ \mathrm{km}$, with $T = T_{11} = 216.65\ \mathrm{K}$,
$$
\frac{p}{p_{11}} = \frac{\rho}{\rho_{11}} = \exp\!\left[-\frac{g_0(h - h_{11})}{RT_{11}}\right],\qquad p_{11} = 22\,632\ \mathrm{Pa},\quad \rho_{11} = 0.3639\ \mathrm{kg/m^3}.
$$ {#eq-stratosphere}
:::

::: proof
Two assumptions: the air is at rest relative to the Earth (hydrostatic balance) and it is an ideal gas. A thin horizontal slab of air of area $A$ and thickness $\mathrm{d}h$ has weight $\rho g_0 A\,\mathrm{d}h$, supported by the difference between the pressure on its lower and upper faces, so $\mathrm{d}p = -\rho g_0\,\mathrm{d}h$ (see [[fluid-mechanics/fluid-statics]]). With $\rho = p/(RT)$,
$$
\frac{\mathrm{d}p}{p} = -\frac{g_0}{RT}\,\mathrm{d}h .
$$
In the troposphere $\mathrm{d}h = -\mathrm{d}T/\lambda$, so $\mathrm{d}p/p = \dfrac{g_0}{R\lambda}\,\dfrac{\mathrm{d}T}{T}$; integrating from sea level gives $\ln(p/p_0) = \dfrac{g_0}{R\lambda}\ln(T/T_0)$, the first of [[#eq-troposphere]]. Then $\rho/\rho_0 = (p/p_0)(T_0/T)$ lowers the exponent by one. The number: $9.80665/(287.05 \times 0.0065) = 5.2559$. In the isothermal layer $T$ is constant and $\mathrm{d}p/p = -g_0\,\mathrm{d}h/(RT_{11})$ integrates to an exponential; $\rho \propto p$ at constant $T$. The values at $11\ \mathrm{km}$ follow from the troposphere formulas with $T_{11}/T_0 = 216.65/288.15 = 0.75187$: $p_{11} = 101\,325 \times 0.75187^{5.2559} = 22\,632\ \mathrm{Pa}$ and $\rho_{11} = p_{11}/(RT_{11}) = 0.3639\ \mathrm{kg/m^3}$.
:::

| $h$ / km | $T$ / K | $p$ / kPa | $\rho$ / $\mathrm{kg/m^3}$ | $\sigma$ | speed of sound $a$ / $\mathrm{m/s}$ |
|---|---|---|---|---|---|
| 0 | 288.15 | 101.325 | 1.2250 | 1.0000 | 340.3 |
| 1 | 281.65 | 89.875 | 1.1116 | 0.9075 | 336.4 |
| 2 | 275.15 | 79.495 | 1.0065 | 0.8216 | 332.5 |
| 3 | 268.65 | 70.109 | 0.9091 | 0.7421 | 328.6 |
| 5 | 255.65 | 54.020 | 0.7361 | 0.6009 | 320.5 |
| 8 | 236.15 | 35.600 | 0.5252 | 0.4287 | 308.1 |
| 10 | 223.15 | 26.436 | 0.4127 | 0.3369 | 299.5 |
| 11 | 216.65 | 22.632 | 0.3639 | 0.2971 | 295.1 |
| 12 | 216.65 | 19.330 | 0.3108 | 0.2537 | 295.1 |

The speed of sound is $a = \sqrt{\gamma RT}$ with $\gamma = 1.4$. Aviation still measures altitude in feet ($1\ \mathrm{ft} = 0.3048\ \mathrm{m}$; flight level FL350 is $35\,000\ \mathrm{ft} = 10\,668\ \mathrm{m}$ of *pressure altitude*) and speed in knots ($1\ \mathrm{kt} = 0.5144\ \mathrm{m/s}$); in this course every calculation is done in SI.

::: example Conditions at 3000 m {#ex-isa}
Find the ISA temperature, pressure and density at $h = 3000\ \mathrm{m}$, and the true airspeed of an aircraft whose equivalent airspeed (defined below) is $50\ \mathrm{m/s}$ there.
::: solution
$T = 288.15 - 0.0065 \times 3000 = 268.65\ \mathrm{K}$. Then $T/T_0 = 0.93233$, so
$$
p = 101\,325 \times 0.93233^{5.2559} = 70\,109\ \mathrm{Pa},\qquad
\rho = 1.225 \times 0.93233^{4.2559} = 0.9091\ \mathrm{kg/m^3},
$$
and $\sigma = 0.7421$. Check with the ideal-gas law: $p/(RT) = 70\,109/(287.05 \times 268.65) = 0.9091\ \mathrm{kg/m^3}$. The true airspeed is $V = V_E/\sqrt\sigma = 50/0.8615 = 58.04\ \mathrm{m/s}$. Sanity check: density falls by roughly $10\,\%$ per kilometre near sea level ($0.9075$, $0.8216$, $0.7421$), so a quarter lower at $3\ \mathrm{km}$ is right, and the true airspeed exceeds the equivalent airspeed whenever the air is thinner than at sea level.
:::
:::

## Airspeeds {#sec-airspeeds}

Aerodynamic forces depend on the **dynamic pressure** $q = \tfrac12\rho V^2$, where $V$ is the speed of the aircraft relative to the air. A pitot-static system measures the difference between the stagnation and static pressures, which at low Mach number is exactly $q$; it therefore cannot tell a fast aircraft in thin air from a slow one in dense air. This is why several airspeeds are in use.

::: definition True, equivalent and calibrated airspeed {#def-airspeeds}
- **True airspeed** (TAS) $V$: the speed of the aircraft relative to the undisturbed air.
- **Equivalent airspeed** (EAS) $V_E$: the speed at sea-level density that gives the same dynamic pressure, $\tfrac12\rho_0V_E^2 = \tfrac12\rho V^2$, so $V_E = V\sqrt{\sigma}$.
- **Calibrated airspeed** (CAS): the reading of an airspeed indicator free of instrument and position errors. The indicator is calibrated with the compressible-flow relation at sea-level conditions, so CAS equals EAS at sea level and at low speed, and exceeds it slightly at high speed and altitude (by about $5\ \mathrm{m/s}$ at $120\ \mathrm{m/s}$ EAS and $10\ \mathrm{km}$).
- **Indicated airspeed** (IAS): what the instrument shows, including those errors.
- **Ground speed**: the speed over the ground, the vector sum of the true airspeed and the wind velocity — the wind triangle of [[dynamics/relative-motion]].
:::

Since lift and drag depend on $q$, an aircraft at a given weight stalls at the same *equivalent* (and, to a good approximation, the same indicated) airspeed at every altitude, which is why the pilot's speed limits are given as indicated speeds. The true airspeed, which sets how quickly the aircraft covers the ground and how much power the drag absorbs ($P = DV$), is higher at altitude by $1/\sqrt\sigma$.

::: warning Mixing true and equivalent airspeed
Every formula in this lesson that contains $\rho$ uses the *true* airspeed $V$ with the *local* density $\rho$; the product $\tfrac12\rho V^2$ is then the same as $\tfrac12\rho_0V_E^2$. A common error is to use an equivalent or indicated speed with the local density (or a true speed with sea-level density), which underestimates the dynamic pressure at altitude by the factor $\sigma$ — a factor of $3.4$ at $11\ \mathrm{km}$. The other common error is to compute power as drag times *equivalent* airspeed: power is $DV$ with the true airspeed.
:::

## The equations of steady flight {#sec-steady}

**Free-body diagram.** Treat the aircraft as a particle moving along a straight flight path inclined at the **flight-path angle** $\gamma$ above the horizontal (positive in a climb). Four forces act at the centre of gravity:

- the **weight** $W = mg$, vertically down;
- the **lift** $L$, perpendicular to the flight path (to the relative wind), in the plane of symmetry;
- the **drag** $D$, along the relative wind, opposite to the velocity;
- the **thrust** $T$, assumed to act along the flight path (the small angle between the thrust line and the flight path is neglected; its effect is to replace $T$ by $T\cos\epsilon_T$ and $L$ by $L + T\sin\epsilon_T$).

The pitching moments are assumed balanced by the tail (that is the subject of [[flight-mechanics/longitudinal-static-stability]]), so only the force balance matters here.

::: proposition Equations of steady flight {#prop-steady}
In steady, straight, symmetric flight,
$$
T - D - W\sin\gamma = 0,\qquad L - W\cos\gamma = 0 .
$$ {#eq-steady}
In level flight ($\gamma = 0$) these reduce to $T = D$ and $L = W$.
:::

::: proof
Newton's second law for the centre of mass, $\mathbf{F} = m\mathbf{a}$, with $\mathbf{a} = \mathbf{0}$ because the velocity is constant in magnitude and direction. Resolve along the flight path: thrust forward, drag backward, and the component $W\sin\gamma$ of the weight backward when climbing. Resolve perpendicular to it, in the plane of symmetry: lift up and the component $W\cos\gamma$ of the weight down. Assumptions: rigid aircraft, flat non-rotating Earth (adequate for performance at airliner speeds), wings level, no sideslip, thrust along the path.
:::

The aerodynamic forces are written with the wing area $S$ as reference: $L = qSC_L$, $D = qSC_D$. The relation between the two coefficients is the drag polar.

::: definition Parabolic drag polar {#def-polar}
For an aircraft in its clean configuration below the drag-rise Mach number, the drag coefficient is well represented by
$$
C_D = C_{D0} + KC_L^2,\qquad K = \frac{1}{\pi e\,AR},
$$ {#eq-polar}
where $C_{D0}$ is the **zero-lift drag coefficient** (skin friction, form and interference drag of the whole aircraft, also called parasite drag) and $KC_L^2$ is the **lift-dependent drag**, dominated by the induced drag of [[aerodynamics/finite-wings]]; the **Oswald efficiency factor** $e$ (typically $0.7$–$0.85$) absorbs both the departure from an elliptic span loading and the growth of viscous drag with lift.
:::

The polar is an empirical fit, not a law: it fails near the stall, where separation adds drag rapidly, and above the drag-divergence Mach number (about $0.75$–$0.85$ for transport wings), where wave drag appears. For our two aircraft, $K_{\text{LA}} = 1/(\pi \times 0.80 \times 7.5) = 0.05305$ and $K_{\text{JT}} = 1/(\pi \times 0.80 \times 9.5) = 0.04188$.

## Thrust required and minimum drag {#sec-thrust-required}

In level flight the thrust required equals the drag. Substituting $C_L = W/(qS)$ into the polar,
$$
T_R = D = qSC_{D0} + \frac{KW^2}{qS},\qquad q = \tfrac12\rho V^2 .
$$ {#eq-drag-v}
The first term, the zero-lift drag, grows as $V^2$; the second, the lift-dependent drag, falls as $1/V^2$, because at high speed a small lift coefficient suffices. Their sum has a minimum.

::: proposition Minimum drag {#prop-min-drag}
For a parabolic polar, the drag in level flight is least when the zero-lift and lift-dependent drags are equal. Then
$$
C_L^\ast = \sqrt{\frac{C_{D0}}{K}},\qquad
\left(\frac{L}{D}\right)_{\max} = \frac{1}{2\sqrt{KC_{D0}}},\qquad
D_{\min} = \frac{W}{(L/D)_{\max}} = 2W\sqrt{KC_{D0}},
$$ {#eq-min-drag}
at the **minimum-drag speed**
$$
V_{md} = \sqrt{\frac{2W}{\rho S}}\left(\frac{K}{C_{D0}}\right)^{1/4}.
$$ {#eq-vmd}
:::

::: proof
In level flight $D = W/(L/D) = W\,C_D/C_L$, so at fixed weight minimum drag means minimum $C_D/C_L = C_{D0}/C_L + KC_L$. Differentiate with respect to $C_L$: $-C_{D0}/C_L^2 + K = 0$, so $C_L^{\ast2} = C_{D0}/K$, and the second derivative $2C_{D0}/C_L^3 > 0$ confirms a minimum. At this point $KC_L^{\ast2} = C_{D0}$: the two drag contributions are equal. Then $C_D = 2C_{D0}$ and $(L/D)_{\max} = \sqrt{C_{D0}/K}/(2C_{D0}) = 1/(2\sqrt{KC_{D0}})$. The speed follows from $W = \tfrac12\rho V^2SC_L^\ast$. Assumptions: parabolic polar with constant $C_{D0}$ and $K$ (no Mach or Reynolds number effects), level flight, $L = W$.
:::

Two features of [[#eq-min-drag]] matter for everything that follows. The minimum drag and the best lift-to-drag ratio do **not depend on altitude**: climbing to thinner air only raises the speed at which they occur, by $1/\sqrt\sigma$. And the equivalent airspeed for minimum drag depends only on wing loading $W/S$ and the polar.

::: example Minimum drag of the jet transport at 11 km {#ex-jet-md}
Find $(L/D)_{\max}$, the minimum drag and the minimum-drag speed of the jet transport at $11\ \mathrm{km}$, and compare with cruise at Mach $0.78$.
::: solution
$W = 70\,000 \times 9.80665 = 686.5\ \mathrm{kN}$; $W/S = 5599\ \mathrm{N/m^2}$. With $K = 0.04188$ and $C_{D0} = 0.020$:
$$
C_L^\ast = \sqrt{0.020/0.04188} = 0.6910,\qquad (L/D)_{\max} = \frac{1}{2\sqrt{0.04188 \times 0.020}} = 17.28,\qquad D_{\min} = \frac{686.5}{17.28} = 39.74\ \mathrm{kN}.
$$
At $11\ \mathrm{km}$, $\rho = 0.3639\ \mathrm{kg/m^3}$:
$$
V_{md} = \sqrt{\frac{2 \times 5599}{0.3639 \times 0.6910}} = 211.0\ \mathrm{m/s},
$$
Mach $211.0/295.1 = 0.715$, equivalent airspeed $211.0\sqrt{0.2971} = 115.0\ \mathrm{m/s}$. At Mach $0.78$, $V = 230.2\ \mathrm{m/s}$, $q = \tfrac12 \times 0.3639 \times 230.2^2 = 9639\ \mathrm{Pa}$, $C_L = 5599/9639 = 0.5809$, $C_D = 0.020 + 0.04188 \times 0.5809^2 = 0.03413$ and $D = 9639 \times 122.6 \times 0.03413 = 40.34\ \mathrm{kN}$, $L/D = 17.02$. Sanity check: flying $9\,\%$ faster than $V_{md}$ costs only $1.5\,\%$ more drag, because the drag curve is flat near its minimum — and it gets the aircraft there sooner, which is why jets cruise above $V_{md}$ (see [[flight-mechanics/range-endurance]]). The value $L/D \approx 17$ is typical of a narrow-body airliner.
:::
:::

::: widget plot
f: 0.5*1.225*s*x^2*16.2*0.030/1000; 0.05305*(m*9.80665)^2/(0.5*1.225*s*x^2*16.2)/1000; (0.5*1.225*s*x^2*16.2*0.030 + 0.05305*(m*9.80665)^2/(0.5*1.225*s*x^2*16.2))/1000
x: 20, 90
y: 0, 3
sliders: m=1100:700:1300:10; s=1:0.3:1:0.01
labels: \text{zero-lift drag (kN)}; \text{lift-dependent drag (kN)}; \text{total drag } T_R \text{ (kN)}
caption: Thrust required by the light aircraft in level flight against true airspeed $V$ (m/s), split into its zero-lift part ($\propto V^2$) and lift-dependent part ($\propto 1/V^2$), with mass $m$ (kg) and density ratio $\sigma$ (`s`) on the sliders. The minimum of the total lies where the two parts cross. Lower $\sigma$ (climb) and the whole curve slides to the right without changing its minimum value; raise the mass and the minimum rises in proportion to $W$ while moving right as $\sqrt W$.
:::

## Power required {#sec-power}

For a propeller aircraft the engine supplies power, not thrust, and the natural quantity is the **power required** $P_R = DV$:
$$
P_R = \tfrac12\rho V^3SC_{D0} + \frac{2KW^2}{\rho V S}.
$$ {#eq-power-required}

::: proposition Minimum power {#prop-min-power}
For a parabolic polar the power required in level flight is least when the lift-dependent drag is three times the zero-lift drag:
$$
C_{L,mp} = \sqrt{\frac{3C_{D0}}{K}},\qquad C_{D,mp} = 4C_{D0},\qquad
V_{mp} = 3^{-1/4}\,V_{md} = 0.760\,V_{md},
$$ {#eq-min-power}
and the minimum power is $P_{\min} = W\,V_{mp}\,C_{D,mp}/C_{L,mp}$, which grows with altitude as $1/\sqrt\sigma$.
:::

::: proof
$P_R = DV = (W C_D/C_L)\,V$ and, from $W = \tfrac12\rho V^2SC_L$, $V = \sqrt{2W/(\rho SC_L)}$. Hence
$$
P_R = W\sqrt{\frac{2W}{\rho S}}\;\frac{C_D}{C_L^{3/2}},
$$
so at fixed weight and altitude minimum power means maximum $C_L^{3/2}/C_D$. Differentiating $\ln(C_L^{3/2}/C_D) = \tfrac32\ln C_L - \ln(C_{D0} + KC_L^2)$ and setting the result to zero: $\dfrac{3}{2C_L} = \dfrac{2KC_L}{C_{D0} + KC_L^2}$, i.e. $3C_{D0} + 3KC_L^2 = 4KC_L^2$, so $KC_L^2 = 3C_{D0}$. Then $C_D = 4C_{D0}$ and $V_{mp}/V_{md} = (C_L^\ast/C_{L,mp})^{1/2} = 3^{-1/4}$. The factor $\sqrt{2W/(\rho S)}$ carries the $1/\sqrt\sigma$ dependence on altitude.
:::

For the light aircraft at sea level: $C_{L,mp} = \sqrt{3 \times 0.030/0.05305} = 1.302$, $V_{mp} = \sqrt{2 \times 665.9/(1.225 \times 1.302)} = 28.89\ \mathrm{m/s}$, $L/D = 1.302/0.120 = 10.85$ and $P_{\min} = 10\,787 \times 28.89/10.85 = 28.71\ \mathrm{kW}$. The stall speed — the lowest speed at which level flight is possible —
$$
V_s = \sqrt{\frac{2W}{\rho SC_{L,\max}}}
$$ {#eq-stall}
is $\sqrt{2 \times 665.9/(1.225 \times 1.5)} = 26.92\ \mathrm{m/s}$ ($52\ \mathrm{kt}$), so the minimum-power speed of this aircraft lies only $7\,\%$ above the stall. That is typical of light aircraft, and in practice the climb and loiter speeds are chosen somewhat higher for safety margin and because the propeller efficiency falls at low speed.

## Maximum speed and the flight envelope {#sec-vmax}

The maximum level speed is where the thrust (or power) available equals that required, on the high-speed branch of the curve. For a **jet**, whose thrust at a given altitude varies only slowly with speed, set $T_A = D$ in [[#eq-drag-v]] and multiply by $q$:
$$
SC_{D0}\,q^2 - T_A\,q + \frac{KW^2}{S} = 0
\quad\Longrightarrow\quad
V^2 = \frac{(T_A/W)(W/S) \pm (W/S)\sqrt{(T_A/W)^2 - 4KC_{D0}}}{\rho\,C_{D0}} .
$$ {#eq-vmax-jet}
The plus sign gives the maximum speed, the minus sign the minimum speed set by thrust (often below the stall speed and then irrelevant). The two roots merge when $T_A/W = 2\sqrt{KC_{D0}} = 1/(L/D)_{\max}$: the aircraft can then just hold level flight at $V_{md}$ and no other speed. That altitude is the **absolute ceiling**.

For a **propeller** aircraft the power available $P_A = \eta_p P_{\text{shaft}}$ is roughly constant with speed, and $P_A = P_R$ is a quartic in $V$, solved numerically or graphically.

::: example Maximum speed of the jet transport at 11 km {#ex-vmax}
At $11\ \mathrm{km}$ the two engines of the jet transport deliver $T_A = 46\ \mathrm{kN}$ in total at maximum continuous thrust. Estimate the maximum level speed from the parabolic polar, and comment.
::: solution
$T_A/W = 46\,000/686\,466 = 0.06701$; $4KC_{D0} = 4 \times 0.04188 \times 0.020 = 0.003351$; $\sqrt{0.06701^2 - 0.003351} = \sqrt{0.001140} = 0.03376$. Then
$$
V^2 = \frac{5599\,(0.06701 + 0.03376)}{0.3639 \times 0.020} = 7.752\times10^{4}\ \mathrm{m^2/s^2},\qquad V = 278.4\ \mathrm{m/s}.
$$
Check: $q = \tfrac12 \times 0.3639 \times 278.4^2 = 14\,106\ \mathrm{Pa}$, $C_L = 0.3970$, $C_D = 0.02660$, $D = 14\,106 \times 122.6 \times 0.02660 = 46.0\ \mathrm{kN}$. ✓

The result is Mach $278.4/295.1 = 0.94$ — and that is the comment: the parabolic polar has no wave drag. Above the drag-divergence Mach number (about $0.8$ for this class of wing) the drag rises steeply, and the real maximum speed is set by that rise and by the certified maximum operating Mach number $M_{MO}$ (typically $0.82$ for narrow-body airliners). Sanity check: the method is right but its input is outside its range of validity; at lower altitudes, where the Mach number at maximum speed is lower, the polar estimate is far better.
:::
:::

At low speed the envelope is bounded by the stall, at high speed by thrust or by structural and compressibility limits, and at the top by the ceiling. Plotting the minimum and maximum speeds against altitude gives the **flight envelope**, which closes at the absolute ceiling.

## Climbing flight {#sec-climb}

::: proposition Rate of climb {#prop-roc}
In a steady climb, the rate of climb $V_v = V\sin\gamma$ and the climb angle are
$$
V_v = \frac{TV - DV}{W} = \frac{P_A - P_R}{W},\qquad \sin\gamma = \frac{T - D}{W},
$$ {#eq-roc}
where $P_A - P_R$ is the **excess power**. To a good approximation for climb angles below about $15^\circ$, $D$ and $P_R$ may be taken at their level-flight values for the same speed.
:::

::: proof
Multiply the along-path equation of [[#eq-steady]], $T - D = W\sin\gamma$, by $V$ and use $V_v = V\sin\gamma$. The approximation: in the climb $L = W\cos\gamma$, so the lift-dependent drag is reduced by the factor $\cos^2\gamma$; at $\gamma = 15^\circ$, $\cos^2\gamma = 0.933$. Using the level-flight drag slightly overestimates $D$ and so slightly underestimates the climb rate — a conservative error. An energy argument gives the same result: the excess power raises the potential energy $Wh$ at the rate $W\,\mathrm{d}h/\mathrm{d}t$.
:::

The two optima are different. The **steepest climb** (maximum $\gamma$, needed to clear obstacles) maximises excess *thrust* $T - D$; for a jet with constant thrust that is at $V_{md}$. The **fastest climb** (maximum $V_v$, needed to reach altitude quickly) maximises excess *power*; for a propeller aircraft with constant $P_A$ that is at $V_{mp}$, and for a jet it is at a higher speed than $V_{md}$, because $P_A = T_AV$ grows with speed ([[#exr-fastest-climb]] derives it).

::: example Climb performance of the light aircraft {#ex-climb}
The light aircraft has $P_A = 0.75 \times 100 = 75\ \mathrm{kW}$, taken as constant with speed. Find its best rate of climb at sea level and the corresponding speed, and the rate of climb at $50\ \mathrm{m/s}$.
::: solution
With constant $P_A$ the maximum excess power is at the minimum-power speed found above, $V_{mp} = 28.89\ \mathrm{m/s}$, where $P_R = 28.71\ \mathrm{kW}$:
$$
V_{v,\max} = \frac{75\,000 - 28\,713}{10\,787} = 4.29\ \mathrm{m/s}
$$
($845\ \mathrm{ft/min}$). At $V = 50\ \mathrm{m/s}$: $q = 1531\ \mathrm{Pa}$, $D = 1531 \times 16.2 \times 0.030 + 0.05305 \times 10\,787^2/(1531 \times 16.2) = 744.2 + 248.8 = 993.1\ \mathrm{N}$, $P_R = 49.65\ \mathrm{kW}$ and $V_v = (75\,000 - 49\,650)/10\,787 = 2.35\ \mathrm{m/s}$. Sanity check: $4.3\ \mathrm{m/s}$ is about right for a $1.1$-tonne aircraft with $100\ \mathrm{kW}$; climb angle at best rate is $\sin^{-1}(4.29/28.89) = 8.5^\circ$, inside the range where the level-drag approximation holds. In practice, because $\eta_p$ falls at low speed, the best-rate speed is flown nearer $35$–$38\ \mathrm{m/s}$.
:::
:::

::: widget plot
f: (0.5*1.225*s*x^3*16.2*0.030 + 2*0.05305*10787^2/(1.225*s*x*16.2))/1000; P*(1.132*s - 0.132)
x: 20, 80
y: 0, 120
sliders: P=75:40:110:1; s=1:0.4:1:0.01
labels: P_R\ \text{(kW)}; P_A\ \text{(kW)}
caption: Power required and power available for the light aircraft against true airspeed (m/s). $P$ is the sea-level power available in kW; at altitude it is scaled by the Gagg–Ferrar factor $1.132\sigma - 0.132$ for an unsupercharged piston engine. The vertical gap between the curves divided by $W = 10.8\ \mathrm{kN}$ is the rate of climb; where they cross on the right is the maximum speed. Lower $\sigma$ and watch the gap close: the curves touch at the absolute ceiling (about $\sigma = 0.57$ for $P = 75$).
:::

**Ceilings.** As altitude increases, the power available of a piston engine falls (roughly in proportion to the density, the Gagg–Ferrar correlation $P/P_0 = 1.132\sigma - 0.132$ being a common fit for unsupercharged engines), while the minimum power required rises as $1/\sqrt\sigma$. The **absolute ceiling** is where the maximum rate of climb is zero; the **service ceiling** is where it has fallen to $0.5\ \mathrm{m/s}$ ($100\ \mathrm{ft/min}$). For the light aircraft these are about $5550\ \mathrm{m}$ and $4830\ \mathrm{m}$. For the jet, with thrust falling roughly as density, the absolute ceiling is where $T_A = W/(L/D)_{\max}$ — the same condition as the merging roots of [[#eq-vmax-jet]].

## Gliding flight {#sec-glide}

With the engine idle ($T = 0$), [[#eq-steady]] becomes $D = -W\sin\gamma$ and $L = W\cos\gamma$, with $\gamma < 0$.

::: proposition Gliding flight {#prop-glide}
In a steady glide at glide angle $\theta = -\gamma$,
$$
\tan\theta = \frac{D}{L} = \frac{1}{L/D},\qquad
\text{distance covered from height } h = h\,\frac{L}{D},\qquad
\text{sink rate } V_{\text{sink}} = V\sin\theta .
$$ {#eq-glide}
The flattest glide (greatest still-air range) is at $(L/D)_{\max}$, i.e. at $V_{md}$; the least sink rate (greatest endurance) is at minimum power, $V_{mp}$.
:::

::: proof
Dividing the two force equations gives $\tan\theta = D/L$ exactly — no small-angle assumption. Over a straight glide the horizontal distance is $h/\tan\theta = h\,(L/D)$. The sink rate is $V\sin\theta$; multiplying the along-path balance $W\sin\theta = D$ by $V$ gives $V_{\text{sink}} = DV/W = P_R/W$, so least sink means least power required. Assumptions: steady glide in still air with $L/D$ constant along the descent (strictly, $V$ falls as the air gets denser, but $L/D$ and therefore the angle stay the same at a constant lift coefficient).
:::

::: example Engine failure at 3000 m {#ex-glide}
The light aircraft's engine fails at $3000\ \mathrm{m}$ above flat ground. How far can it glide in still air, at what true airspeed should it fly at the start of the glide, and what is its sink rate there? How long would it take to reach the ground at the sea-level sink rate?
::: solution
$(L/D)_{\max} = 1/(2\sqrt{0.05305 \times 0.030}) = 12.53$, so the range is $3000 \times 12.53 = 37.6\ \mathrm{km}$ and the glide angle $\tan^{-1}(1/12.53) = 4.56^\circ$. The best-glide speed is $V_{md}$: at sea level $C_L^\ast = \sqrt{0.030/0.05305} = 0.7520$ and $V_{md} = \sqrt{2 \times 665.9/(1.225 \times 0.7520)} = 38.02\ \mathrm{m/s}$; at $3000\ \mathrm{m}$ it is $38.02/\sqrt{0.7421} = 44.14\ \mathrm{m/s}$ true ($38.02\ \mathrm{m/s}$ equivalent — the pilot flies the same indicated speed throughout). The sink rate at $3000\ \mathrm{m}$ is $44.14\sin 4.56^\circ = 3.51\ \mathrm{m/s}$; at sea level $3.02\ \mathrm{m/s}$. Even at the sea-level rate the descent takes no more than $3000/3.02 = 993\ \mathrm{s}$, about $17$ minutes. Sanity check: a glide ratio of $12.5$ is typical of light aircraft (sailplanes reach $40$–$60$); the range does not depend on the weight, only the best-glide speed does.
:::
:::

A headwind $V_w$ reduces the distance over the ground in proportion to the ground speed: $h\,(L/D)(V - V_w)/V$ for a glide at airspeed $V$. Into a headwind it pays to glide faster than $V_{md}$, which is why glider pilots add speed into wind.

::: quiz
A turbojet aircraft and a piston-propeller aircraft each want to climb as *steeply* as possible to clear an obstacle. At which speeds should they fly, assuming constant thrust for the jet and constant power for the propeller aircraft?
- [ ] Both at the minimum-power speed $V_{mp}$
- [x] The jet at $V_{md}$; the propeller aircraft below $V_{md}$, as close to the stall as safety allows
- [ ] The jet at $V_{mp}$; the propeller aircraft at $V_{md}$
- [ ] Both at the maximum speed
::: solution
Steepest climb maximises $T - D$. For the jet, $T$ is constant, so this is minimum drag: $V_{md}$. For the propeller aircraft, $T = P_A/V$ rises as speed falls, so $T - D$ keeps increasing below $V_{md}$ (where $D$ is flat but $T$ grows); the optimum is at a low speed, limited in practice by the stall margin and by the fall of propeller efficiency.
:::
:::

::: history
Sir George Cayley's three-part paper "On Aerial Navigation" (*Nicholson's Journal*, 1809–1810) set out the fixed-wing aeroplane as a problem of producing a lifting force while overcoming a resisting one, separating what are now called lift and drag, and argued that an upward (dihedral) angle of the wings gives stability in roll. Otto Lilienthal's *Der Vogelflug als Grundlage der Fliegekunst* (1889) published measured lift and drag of cambered wings as polar diagrams, and the Wright brothers' wind-tunnel tests of many small wing models in the autumn of 1901 gave them the data with which they designed the 1902 glider and the 1903 Flyer. The analytic treatment of performance from a parabolic drag polar — thrust and power required curves, minimum drag and minimum power — became standard in the textbooks of the 1930s and 1940s, and the standard atmosphere was internationally fixed by the ICAO and later in ISO 2533:1975 and the U.S. Standard Atmosphere 1976, which agree in the lower atmosphere.
:::

::: summary
- Use the ISA: $T = 288.15 - 0.0065h$ (K, m) to $11\ \mathrm{km}$, $p/p_0 = (T/T_0)^{5.2559}$, $\rho/\rho_0 = (T/T_0)^{4.2559}$; isothermal and exponential above.
- Aerodynamic forces depend on $q = \tfrac12\rho V^2 = \tfrac12\rho_0V_E^2$; use true airspeed with local density, and true airspeed for power.
- Steady flight: $T - D = W\sin\gamma$, $L = W\cos\gamma$; drag polar $C_D = C_{D0} + KC_L^2$, $K = 1/(\pi e AR)$.
- Minimum drag: $C_L^\ast = \sqrt{C_{D0}/K}$, $(L/D)_{\max} = 1/(2\sqrt{KC_{D0}})$, independent of altitude. Minimum power: $C_L = \sqrt{3C_{D0}/K}$, $V_{mp} = 0.760V_{md}$, $P_{\min} \propto 1/\sqrt\sigma$.
- Jet maximum speed from the quadratic [[#eq-vmax-jet]]; the roots merge at the absolute ceiling, $T_A/W = 1/(L/D)_{\max}$.
- Rate of climb = excess power / weight; steepest climb maximises excess thrust.
- Glide angle $\tan\theta = 1/(L/D)$; best range at $V_{md}$, least sink at $V_{mp}$.
:::

## Exercises

::: exercise Density at 5 km {level=1 check="0.601"}
Using [[#eq-troposphere]], find the ISA density ratio $\sigma$ at $h = 5000\ \mathrm{m}$. (Enter $\sigma$ rounded to three decimal places.)
::: solution
$T = 288.15 - 32.5 = 255.65\ \mathrm{K}$, $T/T_0 = 0.88721$, $\sigma = 0.88721^{4.2559} = 0.6009$, i.e. $0.601$. The density is $0.736\ \mathrm{kg/m^3}$.
:::
:::

::: exercise Stall speed with flaps {level=1 check="23.3"}
With flaps down the light aircraft has $C_{L,\max} = 2.0$. Find its stall speed at sea level and maximum mass. (Enter $V_s$ in m/s, rounded to one decimal place.)
::: solution
$V_s = \sqrt{2W/(\rho SC_{L,\max})} = \sqrt{2 \times 665.9/(1.225 \times 2.0)} = 23.31\ \mathrm{m/s}$, i.e. $23.3\ \mathrm{m/s}$ ($45\ \mathrm{kt}$), compared with $26.9\ \mathrm{m/s}$ clean. The ratio is $\sqrt{1.5/2.0} = 0.866$.
:::
:::

::: exercise Best lift-to-drag ratio {level=1 check="15.8"}
An aircraft has the polar $C_D = 0.025 + 0.040\,C_L^2$. Find $(L/D)_{\max}$. (Enter it rounded to one decimal place.)
::: solution
$(L/D)_{\max} = 1/(2\sqrt{0.040 \times 0.025}) = 1/(2 \times 0.03162) = 15.81$, i.e. $15.8$, at $C_L^\ast = \sqrt{0.025/0.040} = 0.791$.
:::
:::

::: exercise True airspeed at altitude {level=2 check="224"}
An airliner flies at an equivalent airspeed of $130\ \mathrm{m/s}$ at $10\,000\ \mathrm{m}$ in the ISA. Find its true airspeed and Mach number. (Enter the true airspeed in m/s, rounded to the nearest whole number.)
::: solution
$\sigma = 0.3369$ at $10\ \mathrm{km}$, so $V = 130/\sqrt{0.3369} = 130/0.5804 = 224.0\ \mathrm{m/s}$, i.e. $224\ \mathrm{m/s}$. The speed of sound is $\sqrt{1.4 \times 287.05 \times 223.15} = 299.5\ \mathrm{m/s}$, so $M = 0.748$.
:::
:::

::: exercise Minimum power at altitude {#exr-pmin-alt level=2 check="31.7"}
Find the minimum power required by the light aircraft at $2000\ \mathrm{m}$ in the ISA, given $28.71\ \mathrm{kW}$ at sea level. (Enter it in kW, rounded to one decimal place.)
::: solution
By [[#prop-min-power]], $P_{\min} \propto 1/\sqrt\sigma$ at fixed weight: $28.71/\sqrt{0.8216} = 28.71/0.9064 = 31.68\ \mathrm{kW}$, i.e. $31.7\ \mathrm{kW}$, at a true airspeed $28.89/0.9064 = 31.87\ \mathrm{m/s}$ (the same equivalent airspeed).
:::
:::

::: exercise Climb of the jet transport at cruise altitude {level=2 check="1.90"}
At $11\ \mathrm{km}$ and Mach $0.78$ the jet transport has a drag of $40.34\ \mathrm{kN}$ ([[#ex-jet-md]]). If the engines deliver $46\ \mathrm{kN}$ there, what is the rate of climb? (Enter it in m/s, rounded to two decimal places.)
::: solution
$V_v = (T - D)V/W = (46.00 - 40.34) \times 10^3 \times 230.15/686\,466 = 1.90\ \mathrm{m/s}$ ($374\ \mathrm{ft/min}$). This small margin is why airliners climb to their final cruise altitude in steps as fuel is burned and weight falls.
:::
:::

::: exercise Gliding into wind {level=2 check="36"}
A sailplane with $L/D = 40$ glides at a true airspeed of $25\ \mathrm{m/s}$ from a height of $1500\ \mathrm{m}$ directly into a steady $10\ \mathrm{m/s}$ headwind. How far over the ground does it travel? (Enter the distance in km, rounded to the nearest kilometre.)
::: solution
The glide angle relative to the air is $\tan^{-1}(1/40) = 1.43^\circ$, so the time to descend $1500\ \mathrm{m}$ is $1500/(25\sin 1.43^\circ) = 2400\ \mathrm{s}$. The horizontal ground speed is $25\cos 1.43^\circ - 10 = 14.99\ \mathrm{m/s}$, so the distance is $2400 \times 14.99 = 35\,990\ \mathrm{m} \approx 36\ \mathrm{km}$ — to the accuracy of the small-angle approximation, $1500 \times 40 \times (25 - 10)/25 = 36\ \mathrm{km}$ — against $60\ \mathrm{km}$ in still air.
:::
:::

::: exercise Speed for fastest climb of a jet {#exr-fastest-climb level=3}
For a jet with thrust $T$ independent of speed and a parabolic polar, show (using level-flight drag) that the speed for maximum rate of climb is
$$
V^2 = \frac{W/S}{3\rho C_{D0}}\left[\frac{T}{W} + \sqrt{\left(\frac{T}{W}\right)^2 + 12KC_{D0}}\right],
$$
and check that it exceeds $V_{md}$.
::: solution
$WV_v = TV - \tfrac12\rho V^3SC_{D0} - 2KW^2/(\rho VS)$. Differentiating with respect to $V$ and setting to zero: $T - \tfrac32\rho V^2SC_{D0} + 2KW^2/(\rho V^2S) = 0$. Multiply by $\rho V^2/W$ and put $x = \rho V^2$: $\tfrac32 (S/W)C_{D0}\,x^2 - (T/W)\,x - 2K(W/S) = 0$. The positive root is
$$
x = \frac{(T/W) + \sqrt{(T/W)^2 + 12KC_{D0}}}{3C_{D0}\,S/W},
$$
which is the result. Divide by $V_{md}^2 = 2\sqrt{KC_{D0}}\,(W/S)/(\rho C_{D0})$ and write $a = \sqrt{KC_{D0}}$: $V^2/V_{md}^2 = \left[T/W + \sqrt{(T/W)^2 + 12a^2}\right]/(6a)$. Climb is possible only if $T/W > 2a$ (the absolute-ceiling condition), and then the bracket exceeds $2a + \sqrt{4a^2 + 12a^2} = 6a$, so $V > V_{md}$, with equality exactly at the absolute ceiling. For the jet transport at $11\ \mathrm{km}$ with $T/W = 0.0670$ and $a = 0.02894$, the ratio is $V/V_{md} = 1.04$. Physically: the excess power $TV - DV$ keeps rising past $V_{md}$ because $TV$ grows linearly while $DV$ is still nearly flat.
:::
:::

::: exercise Sizing the engine for a climb requirement {level=3 check="107"}
A customer requires the light aircraft to climb at least $3.0\ \mathrm{m/s}$ at $2000\ \mathrm{m}$ (ISA) at maximum mass. Taking $\eta_p = 0.75$, constant power with speed, and the Gagg–Ferrar lapse $P/P_0 = 1.132\sigma - 0.132$, what sea-level shaft power is needed? Discuss what else you would check before choosing the engine. (Enter the shaft power in kW, rounded to the nearest whole number.)
::: solution
At $2000\ \mathrm{m}$, $\sigma = 0.8216$ and $P_{\min} = 31.68\ \mathrm{kW}$ ([[#exr-pmin-alt]]). The best climb rate is at $V_{mp}$: $V_v = (P_A - P_{\min})/W$, so $P_A = 3.0 \times 10\,787 + 31\,677 = 64\,039\ \mathrm{W}$. The lapse factor is $1.132 \times 0.8216 - 0.132 = 0.7981$, so the sea-level shaft power must be $64\,039/(0.75 \times 0.7981) = 106\,990\ \mathrm{W}$, i.e. about $107\ \mathrm{kW}$ — a $7\,\%$ increase over the present $100\ \mathrm{kW}$. Before choosing: (i) the best-climb speed $31.9\ \mathrm{m/s}$ true is only $7\,\%$ above the stall, where $\eta_p = 0.75$ is optimistic — repeat with a propeller map at a practical climb speed of about $1.3V_s$; (ii) hot days (ISA $+20$) reduce density at $2000\ \mathrm{m}$ and therefore both engine power and climb; (iii) check engine cooling at low climb speed; (iv) a bigger engine adds mass, which raises $P_{\min}$ in proportion to $W^{3/2}$ — iterate; (v) the airworthiness climb requirements (CS-23 / 14 CFR Part 23) are the binding ones and must be checked in the certified configuration.
:::
:::
