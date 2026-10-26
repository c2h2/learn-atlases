A car pulling away from rest, a lift stopping at a floor, a conveyor started under load and a lathe driven from a motor by a belt all depend on friction used deliberately. A **clutch** connects two shafts turning at different speeds and brings them to a common speed; a **brake** does the same with one of the "shafts" being the stationary frame; a **belt** or **band** wrapped around a pulley transmits a torque by friction distributed over its arc of contact. **Chains** do the same job as belts by positive engagement rather than friction. These elements look different, but their analysis rests on three shared ideas, and the chapter is organised around them:

1. **Torque capacity** follows from integrating the friction force over the contact surface, which needs an assumption about how the pressure is distributed ([[statics/friction]] supplies Coulomb's law, $f = \mu N$).
2. **Energy** is dissipated whenever surfaces slip, and the temperature rise it causes, not the torque, usually limits a clutch or brake.
3. **Wrapping** a flexible member around a drum multiplies the friction exponentially with the wrap angle.

Sign conventions: torques and speeds are positive in the driving direction; tensions in belts and bands are positive. Friction coefficients $\mu$ are dynamic (sliding) values unless stated.

## Disc clutches and brakes

A disc (plate) clutch presses an annular friction lining of outer diameter $D$ and inner diameter $d$ against a mating plate with an axial force $F$. A car clutch has one driven plate with linings on both faces, so two friction surfaces; a multi-plate clutch in an automatic gearbox or motorcycle has many. The torque each surface can transmit depends on how the pressure $p(r)$ is distributed over the annulus, and two models bracket the truth.

::: definition Uniform pressure and uniform wear {#def-models}
- **Uniform pressure:** $p$ is the same at all radii. This holds for new, accurately flat, well-supported plates.
- **Uniform wear:** the wear rate is the same at all radii. Wear is taken as proportional to the friction work per unit area, i.e. to $p$ times the sliding velocity $\omega r$, so uniform wear requires $pr = \text{constant}$. A clutch that has run in tends to this state, with the largest pressure $p_{\max}$ at the inner radius.
:::

::: proposition Torque capacity of a disc clutch {#prop-disc}
For one friction surface with coefficient $\mu$, outer diameter $D$, inner diameter $d$ and axial force $F$:
$$
\text{uniform wear:}\quad F = \frac{\pi p_{\max}d}{2}(D - d), \qquad T = \frac{\mu F}{4}(D + d) = \frac{\pi\mu p_{\max}d}{8}(D^2 - d^2);
$$ {#eq-wear}
$$
\text{uniform pressure:}\quad F = \frac{\pi p}{4}(D^2 - d^2), \qquad T = \frac{\mu F}{3}\,\frac{D^3 - d^3}{D^2 - d^2}.
$$ {#eq-pressure}
With $N$ friction surfaces in parallel (the same axial force acting through all of them) the torque is $N$ times larger.
:::

::: proof
**Assumptions.** Coulomb friction with constant $\mu$ over the whole surface; the pressure depends only on radius; the friction force on each element acts tangentially, opposing the relative sliding.

Take a ring of radius $r$ and width $dr$, area $2\pi r\,dr$. It carries normal force $dF = p\,2\pi r\,dr$ and friction force $\mu\,dF$ at radius $r$, so it contributes torque $dT = \mu p\,2\pi r^2\,dr$.

**Uniform wear.** With $pr = C$ and the maximum pressure at the inner radius, $C = p_{\max}d/2$. Then
$$
F = \int_{d/2}^{D/2} 2\pi C\,dr = \pi C(D - d) = \frac{\pi p_{\max}d}{2}(D - d), \qquad T = \int_{d/2}^{D/2} 2\pi\mu Cr\,dr = \pi\mu C\,\frac{D^2 - d^2}{4}.
$$
Dividing, $T/F = \mu(D^2 - d^2)/[4(D - d)] = \mu(D + d)/4$: the friction force acts, in effect, at the mean radius $(D + d)/4$.

**Uniform pressure.** $F = p\,\pi(D^2 - d^2)/4$ and $T = 2\pi\mu p\int_{d/2}^{D/2}r^2\,dr = \tfrac{2\pi\mu p}{3}\cdot\tfrac{D^3 - d^3}{8}$. Dividing gives [[#eq-pressure]].
:::

The two models differ little: for $d/D = 0.6$ the uniform-pressure torque is only 2 % higher for the same force. Because a worn clutch has slightly *less* capacity than a new one, designers use the uniform-wear formula, which is conservative.

The uniform-wear result also answers a design question. If the lining material limits the pressure to $p_{\max}$ and the outer diameter $D$ is fixed by the space, what inner diameter gives the greatest torque? Writing $x = d/D$, [[#eq-wear]] gives $T = \tfrac{\pi}{8}\mu p_{\max}D^3\,x(1 - x^2)$; setting $d/dx[x(1 - x^2)] = 1 - 3x^2 = 0$ gives
$$
\frac{d}{D} = \frac{1}{\sqrt3} = 0.577.
$$ {#eq-optimum}
The optimum is flat: anything between about $0.42$ and $0.72$ gives within 10 % of the maximum, which is why real clutches use ratios of $0.5$–$0.7$, chosen also for heat capacity and lining life.

::: widget plot
f: pi*x*(1 - x^2)/8; pi*(1 - x^3)/12
x: 0, 1
y: 0, 0.3
vlines: 0.577
labels: T/(\mu p_{\max}D^3)\ \text{(uniform wear, fixed } p_{\max}); T/(\mu pD^3)\ \text{(uniform pressure, fixed } p)
caption: Torque of one friction surface, made dimensionless by $\mu pD^3$, against the diameter ratio $d/D$ at fixed outer diameter and fixed maximum lining pressure. Under uniform wear (first curve) the torque peaks at $d/D = 1/\sqrt3 = 0.577$ (vertical line), at $0.151\,\mu p_{\max}D^3$, and the peak is broad. Under uniform pressure (second curve) the torque only falls as $d$ grows, because removing lining always removes torque; the optimum exists only because, in a worn clutch, the pressure at the inner edge is the limit.
:::

A **cone clutch** presses a conical friction surface of half-angle $\alpha$ into a mating cup. Repeating the integration over the cone surface, the normal force on each ring is the axial force divided by $\sin\alpha$, so for uniform wear
$$
T = \frac{\mu F}{4\sin\alpha}(D + d).
$$ {#eq-cone}
With $\alpha$ of $10$–$15°$ the cone multiplies the torque for a given axial force by $4$–$6$; below about $8°$ the cone tends to jam and is hard to release.

::: example Torque capacity of a car clutch {#ex-car}
A single-plate dry clutch has linings of outer diameter $250\ \mathrm{mm}$ and inner diameter $150\ \mathrm{mm}$ on both faces of the driven plate; $\mu = 0.35$ and the lining's maximum pressure is $0.25\ \mathrm{MPa}$. Find the clamp force and the torque capacity by the uniform-wear model.
::: solution
**Free-body diagram.** The pressure plate pushes the driven plate against the flywheel with force $F$; the driven plate transmits friction on both faces to the gearbox shaft, so $N = 2$ surfaces carry the same $F$.

**Force.** $F = \tfrac{\pi}{2}p_{\max}d(D - d) = \tfrac{\pi}{2}\times0.25\times10^6\times0.150\times0.100 = 5890\ \mathrm{N}$.

**Torque.** $T = N\,\mu F(D + d)/4 = 2\times0.35\times5890\times0.400/4 = 412\ \mathrm{N\,m}$.

**Check.** A car engine of $250$–$300\ \mathrm{N\,m}$ needs a margin against slip of roughly $1.3$–$1.5$ to allow for lining wear, heat and torsional vibration, so this size suits it. Uniform pressure with the same force would give $1.021\times412 = 421\ \mathrm{N\,m}$.
:::
:::

## Energy, slip time and temperature

When a clutch engages, the two sides slip until they reach a common speed. During the slip the clutch transmits its full friction torque, and the product of torque and slip speed is converted to heat at the friction surfaces. The energy depends only on the inertias and the speeds, not on the clutch.

::: proposition Energy dissipated during clutch engagement {#prop-energy}
Two shafts with moments of inertia $I_1$ and $I_2$ about their axes, turning at $\omega_1$ and $\omega_2$, are joined by a clutch transmitting a constant torque $T$, with no other torques acting. They reach the common speed
$$
\omega_f = \frac{I_1\omega_1 + I_2\omega_2}{I_1 + I_2}
$$
after a slip time $t_s = \dfrac{I_1I_2(\omega_1 - \omega_2)}{T(I_1 + I_2)}$, and the energy converted to heat is
$$
E = \frac{I_1I_2}{2(I_1 + I_2)}(\omega_1 - \omega_2)^2.
$$ {#eq-engage}
:::

::: proof
**Free-body diagrams.** Shaft 1 is acted on by the clutch torque $-T$ (it slows); shaft 2 by $+T$ (it speeds up); no external torque acts on the pair.

**Final speed.** With no external torque, angular momentum about the common axis is conserved: $I_1\omega_1 + I_2\omega_2 = (I_1 + I_2)\omega_f$.

**Slip time.** $I_1\dot\omega_1 = -T$ and $I_2\dot\omega_2 = T$, so the slip speed $\omega_1 - \omega_2$ falls at the constant rate $T(1/I_1 + 1/I_2) = T(I_1 + I_2)/(I_1I_2)$, reaching zero at $t_s$.

**Energy.** The energy lost is the difference of kinetic energies:
$$
E = \tfrac12I_1\omega_1^2 + \tfrac12I_2\omega_2^2 - \tfrac12(I_1 + I_2)\omega_f^2 = \frac{I_1I_2}{2(I_1 + I_2)}(\omega_1 - \omega_2)^2,
$$
as expanding $\omega_f^2$ shows. Equivalently, $E = \int_0^{t_s}T(\omega_1 - \omega_2)\,dt$, the torque times the average slip speed $(\omega_1 - \omega_2)/2$ times $t_s$, which gives the same result. The energy is independent of $T$: a stronger clutch engages faster but dissipates the same heat.
:::

If the driving side is held at constant speed by a motor (rather than coasting), the motor supplies extra energy during the slip and the clutch dissipates as much heat as the driven side gains kinetic energy — twice as much, in total, is drawn from the motor.

**Temperature rise.** If the heat $E$ goes into a mass $m$ of specific heat $c$ before any of it is lost,
$$
\Delta T = \frac{E}{mc}.
$$ {#eq-temp}
This is an upper bound on the bulk temperature after one engagement, since some heat is conducted and convected away during the slip; it ignores the much higher **flash temperature** at the rubbing surfaces, which is what degrades linings. For repeated engagements the average heat input must be balanced by heat loss to the surroundings, $\bar P = h A(T_s - T_\infty)$, where $h$ is a heat-transfer coefficient and $A$ the exposed area; this sets the allowable engagement rate. Lining manufacturers give limits on temperature and on the product $p v$ of pressure and rubbing speed.

::: example Starting a machine through a clutch {#ex-engage}
A motor-driven input of inertia $0.5\ \mathrm{kg\,m^2}$ coasting at $2000\ \mathrm{rpm}$ is clutched to a stationary machine whose inertia, referred to the clutch shaft, is $2.0\ \mathrm{kg\,m^2}$. The clutch torque is $300\ \mathrm{N\,m}$. Find the common speed, the slip time, the heat generated and the temperature rise of a $5\ \mathrm{kg}$ steel pressure plate ($c = 500\ \mathrm{J/(kg\,K)}$) if it absorbs all the heat.
::: solution
$\omega_1 = 2000\times2\pi/60 = 209.4\ \mathrm{rad/s}$, $\omega_2 = 0$.

**Common speed.** $\omega_f = 0.5\times209.4/2.5 = 41.9\ \mathrm{rad/s} = 400\ \mathrm{rpm}$.

**Slip time.** $t_s = 0.5\times2.0\times209.4/(300\times2.5) = 0.279\ \mathrm{s}$.

**Energy.** $E = \tfrac{0.5\times2.0}{2\times2.5}\times209.4^2 = 8770\ \mathrm{J}$ — 80 % of the input's kinetic energy of $10\,960\ \mathrm{J}$.

**Temperature.** $\Delta T = 8770/(5\times500) = 3.5\ \mathrm{K}$.

**Check.** One engagement is harmless; 100 engagements an hour with no cooling would add $350\ \mathrm{K}$ — so the cooling, not the torque, sets the duty. Note too that the machine reaches only $400\ \mathrm{rpm}$: in practice the motor keeps driving, the slip lasts longer and the heat is larger.
:::
:::

## Brakes

A brake converts the kinetic (and sometimes potential) energy of a machine or vehicle into heat. For a vehicle of mass $M$ braked from speed $v$ to rest at constant deceleration $a$, the energy is $\tfrac12Mv^2$, the stopping time $v/a$ and the braking power, $Mav$ at the start, falls linearly to zero, averaging half that. On a long downhill descent the potential energy must also be absorbed, at a steady rate, which is why sustained braking (lorries, lifts, cranes) relies on retarders or regenerative braking and why brakes are sized thermally.

::: example Braking a car from 100 km/h {#ex-car-brake}
A $1500\ \mathrm{kg}$ car brakes from $100\ \mathrm{km/h}$ to rest at $0.8g$. The front brakes absorb 70 % of the energy, shared equally between two cast-iron discs of $6\ \mathrm{kg}$ each ($c = 460\ \mathrm{J/(kg\,K)}$). Find the energy, the stopping time, the peak braking power and the temperature rise of a front disc.
::: solution
$v = 27.78\ \mathrm{m/s}$, $a = 7.85\ \mathrm{m/s^2}$.

**Energy.** $\tfrac12\times1500\times27.78^2 = 578.7\ \mathrm{kJ}$.

**Time.** $t = 27.78/7.85 = 3.54\ \mathrm{s}$.

**Power.** Peak $Mav = 1500\times7.85\times27.78 = 327\ \mathrm{kW}$ at the start, average $164\ \mathrm{kW}$ — more than most car engines deliver.

**Disc temperature.** Each front disc takes $0.35\times578.7 = 202.5\ \mathrm{kJ}$; $\Delta T = 202\,500/(6\times460) = 73\ \mathrm{K}$.

**Check.** Real disc surfaces get hotter than this bulk value during the stop; repeated hard stops without time to cool push disc temperatures to several hundred °C, which is where lining fade sets in and why discs are ventilated.
:::
:::

**Disc brakes** (calipers on a disc) use the disc-clutch formulas: two pads, often of a sector rather than a full annulus, with the torque $T = 2\mu F r_e$ where $r_e$ is an effective radius near the pad's centroid. **Drum brakes** press shoes against the inside or outside of a drum, and here the geometry of the shoe and its pivot changes the result in an important way.

::: proposition Short-shoe brake: self-energising and self-locking {#prop-shoe}
A short shoe on a lever pivoted at $O$ presses on a drum of radius $r$. The actuating force $F$ acts at distance $a$ from $O$, the normal force $N$ of the drum on the shoe acts at distance $b$ from $O$, and the friction force $\mu N$, tangent to the drum, has a line of action at perpendicular distance $c$ from $O$. Then
$$
N = \frac{Fa}{b \mp \mu c}, \qquad T = \mu Nr,
$$ {#eq-shoe}
with the upper sign when the drum's rotation makes the moment of the friction force about $O$ assist $F$ (a **self-energising** shoe) and the lower sign when it opposes $F$. A self-energising shoe is **self-locking** — it needs no actuating force to hold — if $\mu c \ge b$.
:::

::: proof
**Assumptions.** The shoe is short, so the pressure is uniform and the normal and friction forces can be treated as concentrated at the shoe's centre; Coulomb friction with constant $\mu$; the lever is rigid and in equilibrium; the pin at $O$ is frictionless.

**Free-body diagram of the lever and shoe.** Forces: $F$ (moment arm $a$ about $O$, tending to press the shoe on the drum); the normal reaction $N$ of the drum on the shoe (arm $b$, opposing $F$); the friction force $\mu N$ of the drum on the shoe, in the direction of drum motion at the contact (arm $c$); and the pin reaction at $O$, which has no moment about $O$.

**Moments about $O$.** If the friction moment has the same sense as that of $F$: $Fa + \mu Nc - Nb = 0$, so $N = Fa/(b - \mu c)$. If opposite: $Fa - \mu Nc - Nb = 0$, so $N = Fa/(b + \mu c)$. The braking torque on the drum is the friction force times the radius, $T = \mu Nr$. In the self-energising case $N$ grows without bound as $\mu c \to b$; for $\mu c \ge b$ equilibrium needs $F \le 0$ — the shoe grabs by itself.
:::

Self-energisation is useful: the leading shoe of a car drum brake gives more torque for the same pedal force. Self-locking is useful only in a backstop (it prevents reverse rotation) and dangerous in a service brake, because the torque then depends on $\mu$, which varies with temperature and wetness. Long shoes, for which the pressure varies with angle, are analysed by integrating the pressure distribution (Budynas and Nisbett, §16-3); the conclusions are the same.

A **band brake** wraps a flexible steel band, lined with friction material, around a drum. Its analysis is the belt-friction result of the next section: the tensions at the two ends satisfy $P_1/P_2 = e^{\mu\phi}$, where $\phi$ is the wrap angle, and the braking torque on a drum of diameter $D$ is $T = (P_1 - P_2)D/2$.

::: warning Mistakes with friction elements
- **Using the static coefficient** for a slipping clutch or brake. Linings are rated by their dynamic $\mu$, typically $0.25$–$0.45$ for dry organic and sintered linings and about $0.1$ in oil, and $\mu$ varies with temperature, speed and pressure — design with the lower end of the supplier's range for capacity and the upper end for strength of the parts.
- **Counting friction surfaces wrongly.** A single driven plate has two surfaces; a multi-plate pack with $n$ driven plates sandwiched between driving plates has $2n$.
- **Sizing by torque alone.** Heat and wear usually govern; check the energy per engagement, the engagement rate and the temperature.
- **Designing a self-locking service brake.** A shoe with $\mu c$ close to $b$ will grab and chatter as $\mu$ varies.
- **Forgetting centrifugal tension** in fast belts, which reduces the useful tension without adding grip.
- Brakes for lifts, cranes, hoists and vehicles are safety-critical: they are designed to the relevant standards (for example EN 81 for lifts, UN ECE R13 and R13-H for vehicles) and type-tested. This chapter teaches principles, not a substitute for those codes.
:::

## Belt drives

A flat belt or rope wrapped around a pulley can transmit a torque because friction allows the tension to change along the arc of contact. The tension rises from $F_2$ on the slack side to $F_1$ on the tight side; the difference, times the pulley radius, is the torque. How large the ratio $F_1/F_2$ can be before the belt slips is governed by a simple and remarkable law.

::: theorem Belt friction with centrifugal tension (Euler–Eytelwein) {#thm-belt}
A flat belt of mass $m'$ per unit length runs at speed $v$ over a pulley, in contact over an angle $\phi$ with Coulomb friction coefficient $\mu$. When it is on the point of slipping over the whole arc,
$$
\frac{F_1 - F_c}{F_2 - F_c} = e^{\mu\phi}, \qquad F_c = m'v^2,
$$ {#eq-belt}
where $F_1$ and $F_2$ are the tight- and slack-side tensions and $F_c$ is the centrifugal tension. For a stationary belt, band or rope ($v = 0$) this is the capstan equation $F_1/F_2 = e^{\mu\phi}$.
:::

::: proof
**Assumptions.** The belt is thin, flexible (no bending stiffness) and inextensible over the element; it moves at constant speed; friction is Coulomb with the same $\mu$ everywhere on the arc and is fully developed (impending slip everywhere); the belt's weight is negligible.

**Free-body diagram of a belt element** subtending $d\theta$ at the pulley centre, radius $r$: tension $F$ at one end and $F + dF$ at the other, each inclined at $d\theta/2$ to the tangent at the element's centre; the pulley's normal force $dN$ on the belt, pointing outward, away from the pulley centre; and the friction force $\mu\,dN$ along the tangent, opposing the tendency to slip.

**Radial direction.** The element of mass $m'r\,d\theta$ moves on a circle at speed $v$ and needs a centripetal force $m'r\,d\theta\,v^2/r = m'v^2\,d\theta$ towards the centre. The inward components of the tensions are $2F\sin(d\theta/2) \approx F\,d\theta$; the normal force pushes outward. So $F\,d\theta - dN = m'v^2\,d\theta$, i.e. $dN = (F - m'v^2)\,d\theta$.

**Tangential direction.** At constant speed there is no tangential acceleration: $dF = \mu\,dN = \mu(F - F_c)\,d\theta$.

**Integration.** $\dfrac{dF}{F - F_c} = \mu\,d\theta$, and from $F = F_2$ at $\theta = 0$ to $F = F_1$ at $\theta = \phi$: $\ln\dfrac{F_1 - F_c}{F_2 - F_c} = \mu\phi$. Setting $v = 0$ gives the capstan equation.
:::

The exponential is why a sailor can hold a heavy load with a few turns of rope round a bollard: with $\mu = 0.3$, each full turn multiplies the holding force by $e^{0.6\pi} = 6.6$, so three turns give a factor of nearly 300.

**Power.** The power transmitted is $P = (F_1 - F_2)v$. The centrifugal tension is carried equally on both sides and adds nothing to the torque; it only uses up tension capacity. If the belt's allowable tension (set by its strength or by the joint) is $F_a = F_1$, then from [[#eq-belt]]
$$
P = (F_a - m'v^2)\left(1 - e^{-\mu\phi}\right)v.
$$ {#eq-power}
At low speed the power grows with $v$; at high speed centrifugal tension eats the useful tension. Setting $dP/dv = (F_a - 3m'v^2)(1 - e^{-\mu\phi}) = 0$, the power is greatest at
$$
v_\text{opt} = \sqrt{\frac{F_a}{3m'}},
$$ {#eq-vopt}
where the centrifugal tension is one third of the allowable tension.

**Open-belt geometry.** For pulleys of diameters $D > d$ at centre distance $C$, the wrap angles are $\phi_d = \pi - 2\arcsin\dfrac{D - d}{2C}$ on the small pulley and $\phi_D = \pi + 2\arcsin\dfrac{D - d}{2C}$ on the large one, and the belt length is
$$
L = \sqrt{4C^2 - (D - d)^2} + \tfrac12(D\phi_D + d\phi_d).
$$ {#eq-length}
The small pulley, with the smaller wrap, is where the belt slips first, so it is the one used in [[#eq-belt]].

**V-belts.** A V-belt runs in a groove of included angle $\beta$ and is wedged into it. The normal force on each flank is larger than the radial force by the factor $1/[2\sin(\beta/2)]$, and there are two flanks, so the friction is as if the coefficient were
$$
\mu' = \frac{\mu}{\sin(\beta/2)}.
$$ {#eq-vbelt}
For a groove angle of $38°$, $\mu'$ is $3.07\mu$. This is why V-belts transmit large powers with modest tension and short centre distances. Belts are sized from manufacturers' ratings and standards (for example ISO 4184 for classical and narrow V-belts), which include the belt's fatigue life from bending over small pulleys — the usual cause of belt failure.

::: widget plot
f: exp(m*x*pi/180); exp(m/sin(b*pi/360)*x*pi/180)
x: 90, 270
y: 0, 30
sliders: m=0.3:0.1:0.5:0.01, b=38:30:60:1
labels: \text{flat belt}\ e^{\mu\phi}; \text{V-belt}\ e^{\mu\phi/\sin(\beta/2)}
caption: The maximum tension ratio $F_1/F_2$ (without centrifugal effect) against the wrap angle in degrees, for a flat belt and a V-belt in a groove of angle $\beta$ (slider $b$, degrees) with the same friction coefficient $\mu$ (slider $m$). At $160°$ and $\mu = 0.3$ the flat belt can sustain a ratio of $2.3$, the $38°$ V-belt $13$. Reduce the wrap angle and watch the ratio fall: this is why the small pulley's wrap, and therefore the centre distance and speed ratio, limit what a drive can transmit.
:::

::: example Power capacity of a V-belt {#ex-vbelt}
A V-belt with $m' = 0.20\ \mathrm{kg/m}$ and an allowable tension of $600\ \mathrm{N}$ runs at $20\ \mathrm{m/s}$ in $38°$ grooves with $\mu = 0.3$; the wrap on the small pulley is $160°$. Find the slack-side tension, the power at the point of slip, and the speed for maximum power.
::: solution
**Effective friction.** $\mu' = 0.3/\sin19° = 0.921$; $\mu'\phi = 0.921\times2.793 = 2.573$; $e^{2.573} = 13.1$.

**Tensions.** $F_c = 0.20\times20^2 = 80\ \mathrm{N}$; $F_1 = 600\ \mathrm{N}$; $F_2 = 80 + (600 - 80)/13.1 = 119.7\ \mathrm{N}$.

**Power.** $P = (600 - 119.7)\times20 = 9.61\ \mathrm{kW}$.

**Optimum speed.** $v_\text{opt} = \sqrt{600/(3\times0.20)} = 31.6\ \mathrm{m/s}$, where $P_{\max} = (600 - 200)(1 - 1/13.1)\times31.6 = 11.7\ \mathrm{kW}$.

**Check.** A flat belt with the same $\mu$ and tensions would reach only $(F_1 - F_c)/(F_2 - F_c) = 2.31$, $F_2 = 305\ \mathrm{N}$ and about $5.9\ \mathrm{kW}$. The design power is lower than $9.6\ \mathrm{kW}$ because a belt cannot run at the point of slip: it is installed with an initial tension so that the ratio in service is below the limit, and is rated for fatigue life.
:::
:::

## Chain drives

A roller chain transmits power by the engagement of rollers in sprocket teeth, so it does not slip, needs no initial tension for grip and can carry large forces at low speed. Its kinematic weakness is that the chain wraps the sprocket as a polygon, not a circle. A sprocket with $N$ teeth and chain pitch $p$ has pitch diameter
$$
D = \frac{p}{\sin(180°/N)},
$$ {#eq-pitch}
the circle through the roller centres, since each link is a chord subtending $360°/N$.

::: proposition Chordal speed variation {#prop-chordal}
A chain driven by a sprocket turning at constant angular speed $\omega$ moves with a speed that varies once per tooth between
$$
v_{\max} = \frac{\omega D}{2}, \qquad v_{\min} = \frac{\omega D}{2}\cos\frac{180°}{N},
$$
a fractional variation $\dfrac{v_{\max} - v_{\min}}{v_{\max}} = 1 - \cos\dfrac{180°}{N}$.
:::

::: proof
**Assumptions.** The chain approaching the sprocket is straight and tangent to the sprocket's pitch polygon; the link engaging the sprocket rotates rigidly with it; link elasticity is ignored.

The roller about to seat is at radius $D/2$ and moves with speed $\omega D/2$ perpendicular to its radius. The chain's speed is the component of that velocity along the straight span. As the sprocket turns through one tooth, the angle between the seating link and the span direction runs from $-180°/N$ to $+180°/N$. When the link is parallel to the span (angle 0) the span moves at the full $\omega D/2$; at the ends of the cycle it moves at $(\omega D/2)\cos(180°/N)$. This "chordal action" also raises and lowers the span once per tooth.
:::

The variation is $7.6\ \%$ for $8$ teeth, $1.7\ \%$ for $17$ and $0.8\ \%$ for $25$. It causes vibration, noise and impact as each roller seats, which is why chain manufacturers recommend at least about $17$ teeth on the small sprocket for moderate speeds and more for high speeds. Chains wear at the pins, the pitch grows and the chain rides higher on the teeth, and a common replacement criterion is about 1–3 % elongation. Roller chains and sprockets are standardised (ISO 606), and their power ratings, which are set by link-plate fatigue at low speed and by roller–bush impact and galling at high speed, come from manufacturers' tables.

::: example A roller-chain drive {#ex-chain}
A $17$-tooth sprocket drives a $19.05\ \mathrm{mm}$ pitch chain at $600\ \mathrm{rpm}$. Find the pitch diameter, the mean chain speed and the speed variation.
::: solution
**Pitch diameter.** $D = 19.05/\sin(180°/17) = 19.05/0.1837 = 103.7\ \mathrm{mm}$.

**Speeds.** $\omega = 62.83\ \mathrm{rad/s}$; $v_{\max} = 62.83\times0.05184 = 3.26\ \mathrm{m/s}$; $v_{\min} = 3.26\times\cos10.59° = 3.20\ \mathrm{m/s}$; the variation is $1 - \cos10.59° = 1.7\ \%$. The mean speed, from the pitch times the teeth passing per second, is $Np\,n/60 = 17\times0.01905\times10 = 3.24\ \mathrm{m/s}$.

**Check.** The speed fluctuates $17\times10 = 170$ times a second; if this frequency approaches a natural frequency of the chain span or of the driven machine, resonance follows — another reason for more teeth.
:::
:::

::: application Automotive clutches, dual-clutch gearboxes and timing belts
A manual car's dry single-plate clutch is the disc clutch of [[#ex-car]]; it is clamped by a diaphragm spring and must survive heat from hill starts. A dual-clutch transmission has two clutches, one for odd and one for even gears, and changes gear by releasing one while engaging the other, so each clutch slips briefly under load — heat management is again the design limit, and wet multi-plate clutches with oil cooling are used for high torques. Toothed (synchronous) timing belts combine the light weight and quietness of belts with the positive drive of chains and are used for engine camshafts and positioning drives; they are rated for tooth shear and tensile-cord fatigue rather than friction.
:::

::: history
Guillaume Amontons (1699) and Charles-Augustin Coulomb, whose *Théorie des machines simples* won the Paris Academy's prize of 1781 and was published in 1785, established the laws of dry friction on which every clutch and brake calculation rests. Leonhard Euler analysed the friction of a rope wrapped around a post in a paper in the memoirs of the Berlin Academy (printed 1769), and Johann Albert Eytelwein gave the exponential law in his *Handbuch der Statik fester Körper* (1808), which is why it is called the Euler–Eytelwein formula. Hans Renold patented the bush roller chain in 1880, the basis of today's standard chains. Frederick Lanchester patented a disc brake for cars in 1902, though drum brakes dominated cars until disc brakes spread in the 1950s. John Gates's company introduced the rubber V-belt in 1917.
:::

::: quiz
A belt drive starts to slip on its small pulley. Which change will *not* help?
- [ ] Increasing the centre distance.
- [ ] Increasing the initial tension.
- [x] Running the belt faster at the same power and allowable tension, when it is already above $v_\text{opt}$.
- [ ] Changing from a flat belt to a V-belt.
::: solution
A longer centre distance increases the small-pulley wrap; higher initial tension raises the tensions available; a V-belt multiplies the effective $\mu$. Above $v_\text{opt}$ more speed means more centrifugal tension and less useful tension, so capacity falls.
:::
:::

::: quiz
A clutch is replaced by one with twice the torque capacity, everything else unchanged. The heat generated per engagement
- [ ] doubles.
- [ ] halves.
- [x] is unchanged, but it is generated in half the time.
::: solution
$E = I_1I_2(\omega_1 - \omega_2)^2/[2(I_1 + I_2)]$ does not contain $T$; the slip time $t_s \propto 1/T$ halves, so the heat flux doubles and the flash temperature rises.
:::
:::

::: summary
- Disc clutch, per friction surface: uniform wear $T = \mu F(D + d)/4$ (use for design), uniform pressure $T = \mu F(D^3 - d^3)/[3(D^2 - d^2)]$; best $d/D = 1/\sqrt3$ for fixed $D$ and $p_{\max}$; cone clutch divides by $\sin\alpha$.
- Engagement of two inertias dissipates $E = I_1I_2(\omega_1 - \omega_2)^2/[2(I_1 + I_2)]$, independent of the clutch; $\Delta T \le E/(mc)$; heat usually limits clutches and brakes.
- Vehicle brakes absorb $\tfrac12Mv^2$ with peak power $Mav$.
- Short-shoe drum brake: $N = Fa/(b \mp \mu c)$; self-energising with the minus sign, self-locking if $\mu c \ge b$.
- Belts and bands: $(F_1 - F_c)/(F_2 - F_c) = e^{\mu\phi}$, $F_c = m'v^2$; power $(F_1 - F_2)v$; maximum at $v = \sqrt{F_a/3m'}$; V-belts use $\mu/\sin(\beta/2)$.
- Chains: pitch diameter $p/\sin(180°/N)$, chordal speed variation $1 - \cos(180°/N)$; use at least about 17 teeth.
:::

## Exercises

::: exercise Disc clutch torque {level=1 check="90"}
A single-surface disc clutch has $D = 200\ \mathrm{mm}$, $d = 100\ \mathrm{mm}$, $\mu = 0.3$ and an axial force of $4\ \mathrm{kN}$. Find its torque capacity by the uniform-wear model. (Enter the torque in N m.)
::: solution
$T = \mu F(D + d)/4 = 0.3\times4000\times0.300/4 = 90\ \mathrm{N\,m}$. The maximum pressure, at the inner radius, is $p_{\max} = 2F/[\pi d(D - d)] = 8000/(\pi\times0.1\times0.1) = 0.255\ \mathrm{MPa}$.
:::
:::

::: exercise Band brake torque {level=1 check="75"}
A band brake on a drum of $300\ \mathrm{mm}$ diameter has tensions of $1000\ \mathrm{N}$ and $500\ \mathrm{N}$ at its two ends. Find the braking torque. (Enter the torque in N m.)
::: solution
$T = (P_1 - P_2)D/2 = 500\times0.15 = 75\ \mathrm{N\,m}$. The ratio $P_1/P_2 = 2 = e^{\mu\phi}$ requires $\mu\phi = 0.693$, e.g. $\mu = 0.25$ with $159°$ of wrap.
:::
:::

::: exercise V-groove friction {level=1 check="0.5"}
A belt with $\mu = 0.25$ runs in a groove of included angle $60°$. Find the effective friction coefficient.
::: solution
$\mu' = \mu/\sin(\beta/2) = 0.25/\sin30° = 0.5$.
:::
:::

::: exercise Engagement energy {level=2 check="2500"}
Two shafts each with moment of inertia $1\ \mathrm{kg\,m^2}$, one at $100\ \mathrm{rad/s}$ and one at rest, are joined by a clutch. Find the energy dissipated. (Enter the energy in J.)
::: solution
$E = \tfrac{1\times1}{2\times2}\times100^2 = 2500\ \mathrm{J}$, half the initial kinetic energy of $5000\ \mathrm{J}$; the common speed is $50\ \mathrm{rad/s}$.
:::
:::

::: exercise Optimum belt speed {level=2 check="40"}
A flat belt has $m' = 0.25\ \mathrm{kg/m}$ and an allowable tension of $1200\ \mathrm{N}$. At what speed does it transmit the greatest power? (Enter the speed in m/s.)
::: solution
$v_\text{opt} = \sqrt{F_a/(3m')} = \sqrt{1200/0.75} = \sqrt{1600} = 40\ \mathrm{m/s}$. There the centrifugal tension is $0.25\times1600 = 400\ \mathrm{N}$, one third of the allowable.
:::
:::

::: exercise Belt power {level=2 check="6"}
A slow-running belt (centrifugal tension negligible) has a tight-side tension of $900\ \mathrm{N}$ at the point of slip, where the tension ratio is $3$, and runs at $10\ \mathrm{m/s}$. Find the power. (Enter the power in kW.)
::: solution
$F_2 = 900/3 = 300\ \mathrm{N}$; $P = (900 - 300)\times10 = 6000\ \mathrm{W} = 6\ \mathrm{kW}$.
:::
:::

::: exercise Stopping energy {level=2 check="540"}
A $1200\ \mathrm{kg}$ car brakes from $30\ \mathrm{m/s}$ to rest. Find the energy the brakes must absorb (on level ground, neglecting rolling and air resistance). (Enter the energy in kJ.)
::: solution
$\tfrac12\times1200\times30^2 = 540\,000\ \mathrm{J} = 540\ \mathrm{kJ}$. At $0.75g$ the stop takes $4.08\ \mathrm{s}$ and the initial braking power is $1200\times7.36\times30 = 265\ \mathrm{kW}$.
:::
:::

::: exercise Self-locking shoe {level=2 check="0.375"}
In a short-shoe brake the normal force acts $150\ \mathrm{mm}$ from the lever pivot and the friction force's line of action is $400\ \mathrm{mm}$ from it. Above what friction coefficient is the self-energising shoe self-locking?
::: solution
Self-locking when $\mu c \ge b$: $\mu \ge 150/400 = 0.375$. Typical dry linings have $\mu$ up to about $0.4$, so this brake could lock in service — move the pivot to reduce $c$ or increase $b$.
:::
:::

::: exercise The cone clutch {level=3}
(a) Derive [[#eq-cone]] for a cone clutch of half-angle $\alpha$ under uniform wear, starting from an element of the conical surface. (b) Show that for uniform pressure $T = \dfrac{\mu F}{3\sin\alpha}\dfrac{D^3 - d^3}{D^2 - d^2}$. (c) A cone clutch with $D = 300\ \mathrm{mm}$, $d = 250\ \mathrm{mm}$, $\alpha = 12°$ and $\mu = 0.3$ must transmit $200\ \mathrm{N\,m}$. Find the axial force by uniform wear, and compare with a single-surface disc clutch of the same diameters.
::: solution
(a) A ring of the cone between radii $r$ and $r + dr$ has slant width $dr/\sin\alpha$ and area $2\pi r\,dr/\sin\alpha$. The normal force is $p\,2\pi r\,dr/\sin\alpha$, whose axial component is $p\,2\pi r\,dr$ (the factor $\sin\alpha$ cancels). The friction torque is $\mu p\,2\pi r^2\,dr/\sin\alpha$. With $pr = C$: $F = \pi C(D - d)$ as for a disc, $T = \pi\mu C(D^2 - d^2)/(4\sin\alpha)$, so $T = \mu F(D + d)/(4\sin\alpha)$.
(b) With constant $p$: $F = p\pi(D^2 - d^2)/4$ and $T = 2\pi\mu p(D^3 - d^3)/(24\sin\alpha)$; dividing gives the result.
(c) $F = 4T\sin\alpha/[\mu(D + d)] = 4\times200\times0.2079/(0.3\times0.55) = 1008\ \mathrm{N}$. The disc clutch would need $F = 4T/[\mu(D + d)] = 4848\ \mathrm{N}$, $1/\sin12° = 4.8$ times as much.
:::
:::

::: exercise Design a conveyor clutch {level=3}
A conveyor with an inertia of $15\ \mathrm{kg\,m^2}$ referred to the clutch shaft is to be started up to $300\ \mathrm{rpm}$ from a motor running at constant $300\ \mathrm{rpm}$, in no more than $1.5\ \mathrm{s}$, $20$ times an hour; a steady load torque of $40\ \mathrm{N\,m}$ acts during start-up. Choose the clutch torque, estimate the heat per start and the average heat flow, and size a dry single-plate clutch (two surfaces) with $\mu = 0.3$ and $p_{\max} = 0.3\ \mathrm{MPa}$. Discuss what else must be checked.
::: solution
**Torque.** Accelerating $15\ \mathrm{kg\,m^2}$ to $\omega = 31.4\ \mathrm{rad/s}$ in $1.5\ \mathrm{s}$ needs $15\times31.4/1.5 = 314\ \mathrm{N\,m}$ plus the $40\ \mathrm{N\,m}$ load: $354\ \mathrm{N\,m}$. Choose $T = 400\ \mathrm{N\,m}$; then the net accelerating torque is $360\ \mathrm{N\,m}$ and the slip time $15\times31.4/360 = 1.31\ \mathrm{s}$.

**Heat.** The motor side runs at constant speed, so the clutch dissipates torque times slip speed integrated: the slip speed falls linearly from $31.4\ \mathrm{rad/s}$ to $0$, so $E = T\times\tfrac12\times31.4\times1.31 = 400\times20.6 = 8.2\ \mathrm{kJ}$ per start — more than the kinetic energy given to the conveyor ($7.4\ \mathrm{kJ}$), because the clutch also slips while overcoming the load torque. Twenty starts an hour: average $8.2\times20/3600 = 46\ \mathrm{W}$, easily dissipated; the concern is the surface temperature during each $1.3\ \mathrm{s}$ slip ($6.3\ \mathrm{kW}$ average).

**Size.** For two surfaces, $T = 2\times\tfrac{\pi}{8}\mu p_{\max}d(D^2 - d^2)$. With $d = 0.6D$: $400 = \tfrac{\pi}{4}\times0.3\times0.3\times10^6\times0.6D\times0.64D^2$, so $D^3 = 400/27\,143 = 0.01474\ \mathrm{m^3}$, $D = 245\ \mathrm{mm}$; take $D = 250$, $d = 150\ \mathrm{mm}$ (capacity $T = 2\times\tfrac{\pi}{8}\times0.3\times0.3\times10^6\times0.15\times0.04 = 424\ \mathrm{N\,m}$).

**Further checks.** Lining $pv$ and temperature limits from the supplier; the clamping spring force ($F = \tfrac{\pi}{2}p_{\max}d(D - d) = 7.1\ \mathrm{kN}$) and wear allowance; the heat capacity and cooling of the plates; the shaft, key and bearing loads during the torque peak; and whether a soft-start motor drive or a fluid coupling would serve better.
:::
:::
