Steady straight flight is only part of an aircraft's life. To change direction it must bank and turn, to pull out of a dive it must generate more lift than its weight, and every flight begins and ends with an accelerated run along a runway. This lesson treats these **accelerated** manoeuvres with the same particle model of the aircraft used in [[flight-mechanics/steady-flight-performance]]: the forces are lift, drag, thrust and weight, now with a non-zero acceleration. The central quantity is the **load factor** — how many times its own weight the wing is carrying — which links the performance of the aircraft to the strength of its structure through the V–n diagram, and which the pilot feels as "g".

The kinematics of circular motion comes from [[dynamics/particle-kinematics]] and Newton's second law in normal and tangential components from [[dynamics/newtons-laws]].

## Load factor {#sec-load-factor}

::: definition Load factor {#def-load-factor}
The **load factor** is the ratio of lift to weight,
$$
n = \frac{L}{W}.
$$
In steady level flight $n = 1$. An accelerometer fixed in the aircraft and aligned with the lift direction reads $n$ in units of $g$; occupants feel their apparent weight multiplied by $n$, and every part of the structure carries $n$ times its level-flight inertial load.
:::

Since $L = nW = \tfrac12\rho V^2SC_L$, a load factor $n$ at speed $V$ needs a lift coefficient $n$ times that of level flight at the same speed. The largest available lift coefficient $C_{L,\max}$ therefore limits the load factor at low speed:
$$
n_{\max,\text{aero}} = \frac{\tfrac12\rho V^2SC_{L,\max}}{W} = \left(\frac{V}{V_s}\right)^2,
$$ {#eq-n-stall}
where $V_s$ is the 1 g stall speed. Equivalently, the stall speed at load factor $n$ is $V_s\sqrt n$: an aircraft that stalls at $27\ \mathrm{m/s}$ in level flight stalls at $38\ \mathrm{m/s}$ in a $2\,g$ turn. Most stall–spin accidents happen in turns at low height, when the pilot pulls back to tighten a turn without noticing that the stall speed has risen.

## The level turn {#sec-turn}

**Free-body diagram.** In a coordinated (no sideslip) level turn at constant speed $V$ and bank angle $\phi$, viewed from behind the aircraft:

- weight $W$, vertically down through the centre of gravity;
- lift $L$, perpendicular to the wings in the plane of symmetry, tilted by $\phi$ from the vertical towards the centre of the turn;
- thrust and drag, along the flight path (perpendicular to the page), equal and opposite.

The aircraft moves on a horizontal circle of radius $R$, so its acceleration is $V^2/R$ directed towards the centre.

::: proposition Level coordinated turn {#prop-turn}
In a steady, level, coordinated turn at bank angle $\phi$ and true airspeed $V$,
$$
n = \frac{1}{\cos\phi},\qquad
R = \frac{V^2}{g\tan\phi} = \frac{V^2}{g\sqrt{n^2 - 1}},\qquad
\omega = \frac{V}{R} = \frac{g\sqrt{n^2 - 1}}{V},
$$ {#eq-turn}
where $\omega$ is the rate of turn.
:::

::: proof
Newton's second law, vertical component (no vertical acceleration): $L\cos\phi - W = 0$, so $n = L/W = 1/\cos\phi$. Horizontal component, towards the centre: $L\sin\phi = (W/g)\,V^2/R$. Dividing the second by the first, $\tan\phi = V^2/(gR)$, which gives $R$; and $\tan\phi = \sqrt{\sec^2\phi - 1} = \sqrt{n^2 - 1}$. The rate of turn of a body moving at speed $V$ on a circle of radius $R$ is $V/R$. Assumptions: level flight, constant speed (thrust balances the increased drag), no sideslip, a flat non-rotating Earth.
:::

The radius grows as $V^2$ and the rate falls as $1/V$ at fixed bank: a fast aircraft turns in a wide, slow circle. Instrument-flying procedures use a **rate-one** (standard-rate) turn of $3^\circ/\mathrm{s}$, a complete circle in two minutes; [[#eq-turn]] shows that the bank angle for it, $\tan^{-1}(\omega V/g)$, grows with speed — $17.8^\circ$ at $60\ \mathrm{m/s}$ — which is why airliners turn at a fixed bank (typically $25^\circ$) rather than at standard rate.

The turn costs power. The lift-dependent drag is $KC_L^2qS = Kn^2W^2/(qS)$, $n^2$ times its level-flight value at the same speed:
$$
D = qSC_{D0} + \frac{Kn^2W^2}{qS}.
$$ {#eq-turn-drag}

::: example A 60° banked turn {#ex-turn}
The light aircraft of [[flight-mechanics/steady-flight-performance]] ($m = 1100\ \mathrm{kg}$, $V_s = 26.92\ \mathrm{m/s}$ at sea level) makes a level turn at $\phi = 60^\circ$ and $V = 50\ \mathrm{m/s}$. Find the load factor, radius, rate of turn, time for a full circle, the stall speed in the turn, and the power required.
::: solution
$n = 1/\cos 60^\circ = 2.00$. $R = 50^2/(9.80665 \tan 60^\circ) = 2500/16.986 = 147.2\ \mathrm{m}$. $\omega = 50/147.2 = 0.3397\ \mathrm{rad/s} = 19.5^\circ/\mathrm{s}$, so a full circle takes $2\pi/0.3397 = 18.5\ \mathrm{s}$. Stall speed in the turn: $26.92\sqrt2 = 38.07\ \mathrm{m/s}$, so the aircraft is only $31\,\%$ above it. Drag: $q = 1531\ \mathrm{Pa}$; zero-lift part $744.2\ \mathrm{N}$ as in level flight, lift-dependent part $4 \times 248.8 = 995.4\ \mathrm{N}$, total $D = 1740\ \mathrm{N}$ against $993\ \mathrm{N}$ in level flight, so $P_R = 1740 \times 50 = 87.0\ \mathrm{kW}$. Sanity check: that exceeds the $75\ \mathrm{kW}$ available, so this turn cannot be sustained: the aircraft will lose speed or height. The numbers are typical: a steep turn in a light aircraft is about $150\ \mathrm{m}$ in radius and takes about $20\ \mathrm{s}$.
:::
:::

### Limits to turning

Three things limit how hard an aircraft can turn:

1. **Aerodynamic limit** — the lift coefficient cannot exceed $C_{L,\max}$, so $n \le (V/V_s)^2$ ([[#eq-n-stall]]).
2. **Structural limit** — the load factor may not exceed the limit load factor $n_{\text{lim}}$ for which the aircraft is designed (next section).
3. **Thrust (or power) limit** — in a *sustained* turn thrust must equal the drag [[#eq-turn-drag]]. Solving for $n$,
$$
n_{\text{sust}} = \sqrt{\frac{qS}{KW^2}\left(T - qSC_{D0}\right)} .
$$ {#eq-n-sustained}
A turn tighter than this is possible only briefly, by trading kinetic or potential energy: an **instantaneous** turn.

::: proposition Corner speed {#prop-corner}
At speeds where the aerodynamic limit governs, the turn radius decreases and the turn rate increases with speed; where the structural limit governs, the radius increases and the rate decreases. The fastest instantaneous turn rate is therefore achieved at the **corner speed**
$$
V^\ast = \sqrt{\frac{2n_{\text{lim}}W}{\rho SC_{L,\max}}} = V_s\sqrt{n_{\text{lim}}},
$$ {#eq-corner}
where both limits are reached together, with radius $R^\ast = V^{\ast2}/(g\sqrt{n_{\text{lim}}^2 - 1})$. On the aerodynamic boundary the radius approaches, but never reaches, $V_s^2/g = 2(W/S)/(\rho gC_{L,\max})$.
:::

::: proof
On the aerodynamic boundary $n = (V/V_s)^2$. Then $\omega = g\sqrt{V^4/V_s^4 - 1}/V$, whose square $g^2(V^2/V_s^4 - 1/V^2)$ increases with $V$; and $R = V^2/(g\sqrt{V^4/V_s^4 - 1}) = V_s^2/(g\sqrt{1 - V_s^4/V^4})$, which decreases with $V$ towards $V_s^2/g$. On the structural boundary $n = n_{\text{lim}}$ is constant and [[#eq-turn]] gives $R \propto V^2$ and $\omega \propto 1/V$. The rate therefore rises along the first boundary and falls along the second, with its maximum at their intersection, $(V/V_s)^2 = n_{\text{lim}}$.
:::

::: example Corner speed of an aerobatic aircraft {#ex-corner}
An aerobatic aircraft of mass $800\ \mathrm{kg}$ has $S = 11.0\ \mathrm{m^2}$, $C_{L,\max} = 1.4$ and $n_{\text{lim}} = 6.0$. Find its stall speed, corner speed, the radius and rate of turn at the corner, and the limiting radius, at sea level.
::: solution
$W = 7845\ \mathrm{N}$, $W/S = 713.2\ \mathrm{N/m^2}$. $V_s = \sqrt{2 \times 713.2/(1.225 \times 1.4)} = 28.84\ \mathrm{m/s}$; $V^\ast = 28.84\sqrt6 = 70.64\ \mathrm{m/s}$. At the corner, $\sqrt{n^2 - 1} = \sqrt{35} = 5.916$:
$$
R^\ast = \frac{70.64^2}{9.80665 \times 5.916} = 86.0\ \mathrm{m},\qquad
\omega^\ast = \frac{9.80665 \times 5.916}{70.64} = 0.8213\ \mathrm{rad/s} = 47.1^\circ/\mathrm{s}.
$$
The limiting radius is $V_s^2/g = 84.8\ \mathrm{m}$, so at the corner the radius is already within $1.4\,\%$ of its least possible value. Sanity check: a $360^\circ$ turn at the corner takes $7.6\ \mathrm{s}$ — but only instantaneously: holding $6\,g$ at $70\ \mathrm{m/s}$ needs a lift-dependent drag of $36$ times its level value, far beyond the thrust of a light aircraft, which bleeds off speed within a few seconds.
:::
:::

::: widget plot
f: if(x < vs*sqrt(N), x^2/(9.80665*sqrt(max(x^4/vs^4 - 1, 1e-9))), x^2/(9.80665*sqrt(N^2 - 1))); 100*if(x < vs*sqrt(N), 9.80665*sqrt(max(x^4/vs^4 - 1, 0))/x, 9.80665*sqrt(N^2 - 1)/x)
x: 20, 120
y: 0, 400
sliders: vs=28.8:20:40:0.1; N=6:2:9:0.1
labels: R\ \text{(m)}; 100\,\omega\ \text{(rad/s)}
caption: Instantaneous turn radius $R$ (m) and turn rate $\omega$ (plotted as $100\,\omega$ in rad/s) against speed (m/s) for an aircraft with 1 g stall speed $V_s$ (`vs`) and limit load factor $n_{\text{lim}}$ (`N`). Below the corner speed $V_s\sqrt{n_{\text{lim}}}$ the aircraft is stall-limited; above it, structure-limited. The rate peaks and the radius is close to its minimum at the corner. Raise $n_{\text{lim}}$ and watch the corner move to higher speed.
:::

### Pull-ups and loops

In a vertical manoeuvre the weight no longer acts perpendicular to the flight path in a simple way. At the bottom of a pull-up on a circle of radius $R$, lift must both support the weight and provide the centripetal force: $L - W = (W/g)V^2/R$, so
$$
n = 1 + \frac{V^2}{gR}\quad\text{(bottom of the pull-up)},\qquad n = \frac{V^2}{gR} - 1\quad\text{(top of a loop, inverted)} .
$$ {#eq-pullup}
A pull-up at $60\ \mathrm{m/s}$ on a $200\ \mathrm{m}$ radius needs $n = 1 + 3600/1961 = 2.84$.

## The V–n diagram {#sec-vn}

The structure of an aircraft is designed for a set of **limit loads** — the largest loads expected in service, which the structure must carry without permanent deformation — and **ultimate loads**, normally $1.5$ times the limit loads, which it must carry without failure for at least a few seconds. For the wing these are expressed as load factors, plotted against speed.

::: definition V–n diagram {#def-vn}
The **manoeuvring envelope** or **V–n diagram** plots the load factors an aircraft may experience against equivalent airspeed. It is bounded by
- the positive and negative **stall curves** $n = \pm(V_E/V_{s\pm})^2$, where $V_{s-}$ is the stall speed in inverted flight;
- the positive and negative **limit load factors** $n_{\text{lim}+}$ and $n_{\text{lim}-}$;
- the **design dive speed** $V_D$, the highest speed for which the structure is designed.

The positive stall curve meets $n_{\text{lim}+}$ at the **design manoeuvring speed** $V_A = V_s\sqrt{n_{\text{lim}+}}$ (the corner speed of [[#prop-corner]]). Below $V_A$ full control deflection stalls the wing before the limit load is reached; above it, a full abrupt pull can overstress the structure.
:::

The limit load factors are set by the airworthiness rules for each category. Under the traditional U.S. 14 CFR Part 23 and EASA CS-23 rules for light aeroplanes, the minimum positive limit manoeuvring load factors were $3.8$ for the normal category (for most light aircraft; the rule's formula $2.1 + 24\,000/(W + 10\,000)$ with $W$ in pounds is capped at $3.8$), $4.4$ for the utility and $6.0$ for the aerobatic category, with negative values $0.4$ times the positive ones ($0.5$ for aerobatic). Since 2017 Part 23 has stated performance-based requirements and placed such numbers in consensus standards (ASTM F3116). For transport aeroplanes, 14 CFR 25.337 and CS 25.337 require at least $2.5$ (by the same formula, but at least $2.5$ and not more than $3.8$) and $-1.0$. These are stated here only to explain the diagram; this lesson teaches the principles behind the rules and is no substitute for them.

::: widget plot
f: min((x/vs)^2, N); max(-(x/(1.4*vs))^2, -0.4*N)
x: 0, 90
y: -2.5, 5
sliders: vs=26.9:20:35:0.1; N=3.8:2.5:6:0.1
hlines: 0; 1
vlines: 85
labels: \text{positive boundary}; \text{negative boundary}
caption: V–n diagram (load factor against equivalent airspeed in m/s) for a light aircraft with 1 g stall speed `vs` and limit load factor `N`, inverted stall speed taken as $1.4V_s$ and negative limit $-0.4N$; the vertical line at $85\ \mathrm{m/s}$ stands for the design dive speed $V_D$. The kink in the upper boundary is the design manoeuvring speed $V_A = V_s\sqrt N$. Increase the mass (raise `vs`) and $V_A$ moves right: a heavier aircraft can use full control deflection up to a higher speed.
:::

**Gusts** also load the wing. Flying at equivalent airspeed $V_E$ into a sharp-edged vertical gust of velocity $U$ changes the angle of attack by $U/V$ and the lift by $\tfrac12\rho_0V_E^2S\,a\,U/V_E$. Real gusts are not sharp-edged, and the aircraft starts to rise before it is fully immersed; the airworthiness rules (the Pratt formula of Part 23) include an alleviation factor $K_g$:
$$
\Delta n = \frac{\rho_0\,K_g\,U_{de}\,V_E\,a}{2\,W/S},\qquad K_g = \frac{0.88\,\mu_g}{5.3 + \mu_g},\qquad \mu_g = \frac{2\,W/S}{\rho\,\bar c\,a\,g},
$$ {#eq-gust}
where $a$ is the lift-curve slope of the aircraft (per radian), $\bar c$ the mean chord and $U_{de}$ the "derived" gust velocity specified by the rules ($15.24\ \mathrm{m/s}$, i.e. $50\ \mathrm{ft/s}$, at the design cruising speed up to $6100\ \mathrm{m}$ in the classic Part 23 rules). The gust load factor grows linearly with speed and inversely with wing loading — so light, lightly loaded aircraft are the most sensitive to turbulence.

::: warning Limit, ultimate and the stall speed
Three common errors. (i) Treating the limit load factor as the failure load: the structure must not *yield* at the limit load and must not *fail* below $1.5$ times it; designing to failure at $n_{\text{lim}}$ removes the factor of safety. (ii) Believing that below $V_A$ any manoeuvre is safe: $V_A$ protects against a single full deflection of one control, not against rapid reversals or combined pitch and roll inputs, which have broken airliner tails. (iii) Forgetting that $V_s$ and therefore $V_A$ depend on weight: $V_A \propto \sqrt W$, so a lightly loaded aircraft has a *lower* manoeuvring speed.
:::

## Take-off {#sec-takeoff}

A take-off is divided into the **ground roll**, from brake release to lift-off at speed $V_{LO}$; the **rotation**, a few seconds in which the nose is raised; and the **airborne distance** to a screen height ($15\ \mathrm{m}$ or $50\ \mathrm{ft}$ for light aircraft, $10.7\ \mathrm{m}$ or $35\ \mathrm{ft}$ for transport aircraft). The lift-off speed is a margin above the stall speed in the take-off configuration, typically $V_{LO} \approx 1.1$–$1.2\,V_s$; for transport aeroplanes the rules fix the take-off safety speed $V_2$ at not less than $1.13$ times the reference stall speed.

**Free-body diagram during the ground roll** (aircraft on its wheels, accelerating along the runway):

- thrust $T$ forward;
- aerodynamic drag $D = qSC_{D,g}$ backward, with $C_{D,g}$ the drag coefficient in the ground-roll attitude (flaps and gear down, reduced induced drag in ground effect);
- lift $L = qSC_{L,g}$ up, at the small ground-roll lift coefficient;
- weight $W$ down;
- runway normal reactions $N = W - L$ in total, up, and rolling friction $\mu_r N$ backward, with $\mu_r \approx 0.02$ on concrete and $0.04$–$0.10$ on grass.

::: proposition Ground-roll distance {#prop-ground-roll}
With the accelerating force $F(V) = T - D - \mu_r(W - L)$, the ground-roll distance from rest to $V_{LO}$ is
$$
s_g = \frac{W}{g}\int_0^{V_{LO}}\frac{V\,\mathrm{d}V}{F(V)} = \frac{W}{2g}\int_0^{V_{LO}^2}\frac{\mathrm{d}(V^2)}{F(V)} .
$$ {#eq-ground-roll}
If the thrust is constant, $F = A - BV^2$ with $A = T - \mu_rW$ and $B = \tfrac12\rho S(C_{D,g} - \mu_rC_{L,g})$, and
$$
s_g = \frac{W}{2gB}\ln\frac{A}{A - BV_{LO}^2} \approx \frac{W\,V_{LO}^2}{2g\,F(0.7V_{LO})} .
$$ {#eq-ground-roll-closed}
:::

::: proof
Newton's second law along the runway: $(W/g)\,\mathrm{d}V/\mathrm{d}t = F(V)$. With $\mathrm{d}s = V\,\mathrm{d}t$, $\mathrm{d}s = (W/g)V\,\mathrm{d}V/F$, and $V\,\mathrm{d}V = \tfrac12\mathrm{d}(V^2)$; integrating gives [[#eq-ground-roll]]. For $F = A - BV^2$, put $u = V^2$: $\int_0^{V_{LO}^2}\mathrm{d}u/(A - Bu) = -\tfrac1B\ln(A - Bu)\big|_0^{V_{LO}^2}$, which gives the logarithm. The approximation: since $F$ is a function of $u = V^2$, the integral of $1/F(u)$ over $0 \le u \le V_{LO}^2$ is close to $V_{LO}^2/F(\bar u)$ with $\bar u = \tfrac12V_{LO}^2$, i.e. $\bar V = V_{LO}/\sqrt2 = 0.707V_{LO}$ — the midpoint rule in $V^2$. Assumptions: level runway, no wind, $\mu_r$, $C_{L,g}$, $C_{D,g}$ constant, rotation neglected.
:::

The approximation shows the scaling: $s_g \propto WV_{LO}^2/\bar F \propto W^2/(\rho\,S\,C_{L,\max}\,\bar F)$. Take-off distance therefore grows as the **square** of weight (at fixed thrust), and inversely as density — hot-and-high airports and heavy aircraft need long runways. A headwind $V_w$ reduces the ground speed needed at lift-off to $V_{LO} - V_w$ and shortens the run markedly.

::: example Take-off ground roll of the light aircraft {#ex-takeoff}
The light aircraft takes off at $1100\ \mathrm{kg}$ from a sea-level runway of short dry grass ($\mu_r = 0.03$) with take-off flap ($C_{L,\max} = 2.0$), lifting off at $1.1V_s$. During the ground roll $C_{L,g} = 0.6$, $C_{D,g} = 0.055$, and the propeller thrust is taken as constant at $2.8\ \mathrm{kN}$. Find the ground roll and its duration.
::: solution
$V_s = \sqrt{2 \times 665.9/(1.225 \times 2.0)} = 23.31\ \mathrm{m/s}$, $V_{LO} = 25.65\ \mathrm{m/s}$. $A = 2800 - 0.03 \times 10\,787 = 2476.4\ \mathrm{N}$; $B = \tfrac12 \times 1.225 \times 16.2 \times (0.055 - 0.03 \times 0.6) = 0.3671\ \mathrm{kg/m}$; $BV_{LO}^2 = 241.5\ \mathrm{N}$.
$$
s_g = \frac{10\,787}{2 \times 9.80665 \times 0.3671}\ln\frac{2476.4}{2234.9} = 1498 \times 0.10261 = 153.7\ \mathrm{m}.
$$
The approximation: $F(0.7V_{LO}) = 2476.4 - 0.3671 \times 17.95^2 = 2358.1\ \mathrm{N}$ and $s_g \approx 1100 \times 25.65^2/(2 \times 2358.1) = 153.4\ \mathrm{m}$ — within $0.2\,\%$. The time is $\int_0^{V_{LO}}m\,\mathrm{d}V/F = 11.8\ \mathrm{s}$. Sanity check: the average acceleration is $25.65/11.8 = 2.2\ \mathrm{m/s^2}$, about $0.22g$, typical for a light aircraft; and $150\ \mathrm{m}$ is in line with published ground rolls of four-seat aircraft. With a $5\ \mathrm{m/s}$ headwind, $V_{LO}$ relative to the ground falls to $20.65\ \mathrm{m/s}$ and the roll to roughly $(20.65/25.65)^2 \times 154 = 100\ \mathrm{m}$.
:::
:::

For multi-engine aeroplanes the rules require that an engine failure at the worst moment can be handled either by stopping on the remaining runway or by continuing the take-off on the remaining engines. The **decision speed** $V_1$ separates the two choices, and the runway length for which accelerate–stop and accelerate–go distances are equal is the **balanced field length**. Its calculation is a direct extension of [[#eq-ground-roll]] with different forces after the failure.

## Landing {#sec-landing}

The landing reverses the take-off: an approach at about $1.3V_s$ in the landing configuration (for transport aeroplanes the reference speed $V_{REF}$ must be at least $1.23$ times the reference stall speed), a flare, touchdown at about $1.15V_s$, a short free roll while the spoilers deploy and the brakes are applied, and the braked ground roll. During the braked roll the decelerating force is
$$
F = \mu_b(W - L) + D + T_{\text{rev}},
$$
where $\mu_b \approx 0.3$–$0.5$ is the braking coefficient on a dry runway (falling to $0.05$–$0.1$ on ice), $D$ is the aerodynamic drag with spoilers deployed (which also dump lift, raising the wheel load) and $T_{\text{rev}}$ the reverse thrust, if any. With constant $\mu_b$, $C_L$ and $C_D$ and no reverse thrust, $F = A + BV^2$ with $A = \mu_bW$, $B = \tfrac12\rho S(C_D - \mu_bC_L)$, and
$$
s_b = \frac{W}{2gB}\ln\frac{A + BV_{TD}^2}{A} .
$$ {#eq-landing}

::: example Landing roll of the jet transport {#ex-landing}
The jet transport lands at $60\,000\ \mathrm{kg}$ at sea level with $C_{L,\max} = 2.6$ (full flap). It touches down at $1.15V_s$, rolls freely for $3\ \mathrm{s}$, then brakes with $\mu_b = 0.4$; with spoilers deployed $C_L = 0.10$ and $C_D = 0.10$. Reverse thrust is not used. Find the landing ground distance.
::: solution
$W = 588.4\ \mathrm{kN}$, $V_s = \sqrt{2 \times 588\,399/(1.225 \times 122.6 \times 2.6)} = 54.90\ \mathrm{m/s}$, so the approach speed is $1.3V_s = 71.4\ \mathrm{m/s}$ and $V_{TD} = 63.13\ \mathrm{m/s}$. Free roll: $3 \times 63.13 = 189\ \mathrm{m}$ (the slight deceleration in this phase is neglected). Braked roll: $A = 0.4 \times 588\,399 = 235\,360\ \mathrm{N}$; $B = \tfrac12 \times 1.225 \times 122.6 \times (0.10 - 0.04) = 4.506\ \mathrm{kg/m}$; $BV_{TD}^2 = 17\,957\ \mathrm{N}$.
$$
s_b = \frac{588\,399}{2 \times 9.80665 \times 4.506}\ln\frac{253\,317}{235\,360} = 6658 \times 0.07353 = 489.6\ \mathrm{m}.
$$
Total ground distance $\approx 679\ \mathrm{m}$. Sanity check: ignoring aerodynamic drag, $V_{TD}^2/(2\mu_bg) = 508\ \mathrm{m}$, so drag shortens the braked roll by only $4\,\%$ — braking dominates. Certified landing distances are much longer: they include the air distance from $15\ \mathrm{m}$ ($50\ \mathrm{ft}$) and are factored up (by $1/0.6$ for dry runways) to cover variability in piloting and runway condition.
:::
:::

::: quiz
Two identical aircraft fly level turns at the same bank angle, one at twice the true airspeed of the other. Compare their turn radii and turn rates.
- [ ] Same radius; the faster one turns at twice the rate.
- [ ] Twice the radius; same rate.
- [x] Four times the radius; half the rate.
- [ ] Half the radius; four times the rate.
::: solution
At a fixed bank the load factor $1/\cos\phi$ is the same, and [[#eq-turn]] gives $R = V^2/(g\tan\phi) \propto V^2$ and $\omega = g\tan\phi/V \propto 1/V$.
:::
:::

::: history
The Wright brothers' decisive insight of 1899–1903 was that an aeroplane must be *banked* to turn, like a bicycle, and they built roll control (wing warping) into their gliders and the 1903 Flyer for that reason. As aircraft became faster and more manoeuvrable, structural requirements came to be stated as design load factors, and the manoeuvring envelope plotted against speed became the standard way of expressing them. Gust loads were put on a rational footing by NACA research in the 1930s and 1950s, culminating in the revised gust-load formula of Kermit G. Pratt and Walter G. Walker (NACA Report 1206, 1954), based on a one-minus-cosine gust and a mass-ratio parameter, which is the form used in the gust rules of Part 23 and, until it was supplemented by discrete-gust and continuous-turbulence analyses, of Part 25. The V–n diagram in today's form is a fixture of every airworthiness code.
:::

::: summary
- Load factor $n = L/W$; the stall speed at load factor $n$ is $V_s\sqrt n$.
- Level turn: $n = 1/\cos\phi$, $R = V^2/(g\sqrt{n^2 - 1})$, $\omega = g\sqrt{n^2 - 1}/V$; the lift-dependent drag is multiplied by $n^2$.
- Turns are limited by $C_{L,\max}$, by $n_{\text{lim}}$ and (if sustained) by thrust; the fastest instantaneous turn is at the corner speed $V_s\sqrt{n_{\text{lim}}}$.
- The V–n diagram bounds load factor by stall curves, limit load factors and $V_D$; design manoeuvring speed $V_A = V_s\sqrt{n_{\text{lim}}}$; ultimate loads are $1.5\times$ limit.
- Gust load factor increment $\propto V_E/(W/S)$, with an alleviation factor.
- Ground roll $s_g = (W/g)\int V\,\mathrm{d}V/F$, closed form for $F = A - BV^2$, and $\approx WV_{LO}^2/(2g\bar F)$ with $\bar F$ at $0.7V_{LO}$; it scales as $W^2/(\rho SC_{L,\max}\bar F)$.
- Landing roll: decelerating force $\mu_b(W - L) + D + T_{\text{rev}}$; braking dominates.
:::

## Exercises

::: exercise Load factor in a turn {level=1 check="30.6"}
An aircraft with a 1 g stall speed of $25\ \mathrm{m/s}$ makes a level turn at $\phi = 48^\circ$. Find its stall speed in the turn. (Enter the speed in m/s, rounded to one decimal place.)
::: solution
$n = 1/\cos 48^\circ = 1.4945$; $V_{s,\text{turn}} = 25\sqrt{1.4945} = 30.56\ \mathrm{m/s}$, i.e. $30.6\ \mathrm{m/s}$.
:::
:::

::: exercise Airliner turn {level=1 check="3149"}
An airliner turns at $25^\circ$ of bank at a true airspeed of $120\ \mathrm{m/s}$. Find the turn radius. (Enter it in m, rounded to the nearest metre.)
::: solution
$R = V^2/(g\tan\phi) = 14\,400/(9.80665 \times 0.46631) = 3149\ \mathrm{m}$. The load factor is $1.103$ and the rate $2.18^\circ/\mathrm{s}$, close to rate one.
:::
:::

::: exercise Pull-up {level=1 check="2.84"}
Find the load factor at the bottom of a pull-up flown at $60\ \mathrm{m/s}$ on a circle of radius $200\ \mathrm{m}$. (Enter $n$ rounded to two decimal places.)
::: solution
$n = 1 + V^2/(gR) = 1 + 3600/(9.80665 \times 200) = 1 + 1.836 = 2.84$.
:::
:::

::: exercise Sustained turn of the light aircraft {level=2 check="1.86"}
The light aircraft ($W = 10\,787\ \mathrm{N}$, $S = 16.2\ \mathrm{m^2}$, $C_{D0} = 0.030$, $K = 0.05305$) has $75\ \mathrm{kW}$ of thrust power. Find the largest load factor it can sustain in a level turn at $45\ \mathrm{m/s}$ at sea level, and the bank angle. (Enter $n$ rounded to two decimal places.)
::: solution
$T = 75\,000/45 = 1666.7\ \mathrm{N}$, $q = 1240.3\ \mathrm{Pa}$, $qS = 20\,093\ \mathrm{N}$, zero-lift drag $qSC_{D0} = 602.8\ \mathrm{N}$. From [[#eq-n-sustained]]: $n^2 = \dfrac{20\,093}{0.05305 \times 10\,787^2}(1666.7 - 602.8) = 3.255 \times 10^{-3} \times 1063.9 = 3.463$, $n = 1.86$, bank $\cos^{-1}(1/1.86) = 57.5^\circ$. Steeper turns at this speed lose height or speed.
:::
:::

::: exercise Design manoeuvring speed {level=2 check="52.5"}
The light aircraft ($V_s = 26.92\ \mathrm{m/s}$ EAS at maximum mass) is certified in the normal category with $n_{\text{lim}} = 3.8$. Find its design manoeuvring speed $V_A$, and its value at a mass of $850\ \mathrm{kg}$. (Enter $V_A$ at maximum mass in m/s, rounded to one decimal place.)
::: solution
$V_A = V_s\sqrt{3.8} = 26.92 \times 1.9494 = 52.48\ \mathrm{m/s}$, i.e. $52.5\ \mathrm{m/s}$ ($102\ \mathrm{kt}$). At $850\ \mathrm{kg}$, $V_s$ and $V_A$ scale with $\sqrt W$: $52.48\sqrt{850/1100} = 46.1\ \mathrm{m/s}$. Flying at $50\ \mathrm{m/s}$ in turbulence is therefore safe at maximum mass but not when light.
:::
:::

::: exercise Gust load factor {level=2 check="3.74"}
The light aircraft ($W/S = 665.9\ \mathrm{N/m^2}$, mean chord $\bar c = 1.47\ \mathrm{m}$, lift-curve slope $a = 5.0\ \mathrm{rad^{-1}}$) flies at $60\ \mathrm{m/s}$ EAS at sea level into a derived gust $U_{de} = 15.24\ \mathrm{m/s}$. Using [[#eq-gust]], find the total load factor $1 + \Delta n$. (Enter it rounded to two decimal places.)
::: solution
$\mu_g = 2 \times 665.9/(1.225 \times 1.47 \times 5.0 \times 9.80665) = 15.09$; $K_g = 0.88 \times 15.09/20.39 = 0.6512$; $\Delta n = 1.225 \times 0.6512 \times 15.24 \times 60 \times 5.0/(2 \times 665.9) = 2.74$; $n = 3.74$, just below the manoeuvring limit of $3.8$ — gusts and manoeuvres impose comparable loads on light aircraft.
:::
:::

::: exercise Weight and take-off distance {level=2 check="21"}
Using the approximation [[#eq-ground-roll-closed]] with the accelerating force at $0.7V_{LO}$ unchanged, by what percentage does the ground roll increase if the take-off mass increases by $10\,\%$ (lift-off still at $1.1V_s$)? (Enter the percentage rounded to the nearest whole number.)
::: solution
$s_g \propto WV_{LO}^2$ and $V_{LO}^2 \propto W$, so $s_g \propto W^2$ at fixed $\bar F$: $1.1^2 = 1.21$, a $21\,\%$ increase. (In fact $\bar F$ also falls, through the larger rolling friction $\mu_rW$, so the real increase is a little more.)
:::
:::

::: exercise Landing on a wet runway {level=3 check="1190"}
Repeat [[#ex-landing]] with $\mu_b = 0.15$ (a wet runway with poor texture), everything else unchanged. Find the braked ground roll, and discuss what an operator would do. (Enter the braked roll in m, rounded to the nearest metre.)
::: solution
$A = 0.15 \times 588\,399 = 88\,260\ \mathrm{N}$; $B = \tfrac12 \times 1.225 \times 122.6 \times (0.10 - 0.015) = 6.383\ \mathrm{kg/m}$; $BV_{TD}^2 = 25\,439\ \mathrm{N}$. $s_b = \dfrac{588\,399}{2 \times 9.80665 \times 6.383}\ln\dfrac{113\,700}{88\,260} = 4700 \times 0.25327 = 1190\ \mathrm{m}$, $2.4$ times the dry value; with the free roll the ground distance is about $1380\ \mathrm{m}$. Aerodynamic drag now removes a larger share of the energy ($V_{TD}^2/(2\mu_bg) = 1355\ \mathrm{m}$ without it). An operator would use reverse thrust and autobrakes, use the higher wet-runway landing-distance factors required by the rules, land at a lower weight or with a headwind, or divert to a longer runway; on contaminated runways a hydroplaning check ($V_{TD}$ against the tyre-pressure-based hydroplaning speed) is also needed.
:::
:::

::: exercise Designing for a short runway {level=3}
A four-seat aircraft like the light aircraft must take off over a $15\ \mathrm{m}$ obstacle within $400\ \mathrm{m}$ from a hot, high grass strip ($\sigma = 0.80$, $\mu_r = 0.05$). List the design parameters that reduce the take-off distance, estimate the effect of each from the scaling $s_g \propto W^2/(\rho SC_{L,\max}\bar F)$, and propose a combination of changes.
::: solution
From the scaling, the ground roll falls with: lower weight ($\propto W^2$); larger wing area or higher $C_{L,\max}$ (more powerful flaps, slotted or Fowler; $\propto 1/(SC_{L,\max})$); more accelerating force (more power or a constant-speed propeller, which gives far more static thrust than a fixed-pitch cruise propeller; less rolling friction from larger tyres on grass). Effects: at $\sigma = 0.80$ the roll is $1/0.80 = 1.25$ times the sea-level value before the loss of engine power ($1.132 \times 0.8 - 0.132 = 0.77$) is counted, and the grass raises $\mu_rW$ from $324$ to $539\ \mathrm{N}$, about $9\,\%$ of a typical $2.5\ \mathrm{kN}$ thrust. A sensible combination: a constant-speed propeller (static thrust up by perhaps $20$–$30\,\%$), Fowler flaps raising $C_{L,\max}$ from $2.0$ to about $2.4$ ($-17\,\%$), and an operating limitation on take-off weight at hot-and-high strips. The airborne segment to $15\ \mathrm{m}$ must be added (typically $40$–$60\,\%$ of the ground roll for light aircraft) and the whole compared with the certified data, which include safety factors. A good answer also notes that a larger wing raises cruise drag ($C_{D0}S$) and lowers cruise speed: the trade-off is the core of light-aircraft design.
:::
:::
