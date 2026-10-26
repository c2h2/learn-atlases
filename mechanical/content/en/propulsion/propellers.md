A propeller is the extreme case of the lesson of [[propulsion/thrust-efficiency]]: produce thrust by giving a *very large* mass of air a *small* velocity increment, and the propulsive efficiency approaches 1. A light aircraft's propeller sweeps a disc of about $3\ \mathrm{m^2}$ and, at a cruise speed of $60\ \mathrm{m/s}$, adds only a few metres per second to the air passing through it; its propulsive efficiency is over 90 % in principle and above 80 % in practice. The price is that the blades must move fast to do this — a propeller is a rotating wing whose tip moves several times faster than the aircraft — and as flight speed rises the tips approach the speed of sound and the efficiency collapses. That is why propellers dominate below about Mach 0.6 and turbofans above.

This chapter develops the two classical theories of the propeller. **Momentum (actuator-disc) theory** treats the propeller as a disc that adds pressure to the stream; it gives the ideal efficiency and the minimum power for a given thrust, but says nothing about blades. **Blade-element theory** treats each blade section as an airfoil ([[aerodynamics/thin-airfoil-theory]]) and integrates its lift and drag; combined with momentum theory it becomes the **blade-element momentum (BEM)** method used in practice. On the way we introduce the non-dimensional coefficients in which propeller performance is always presented, and close with variable pitch, compressibility and the choice between propellers and fans.

## Momentum theory of the actuator disc

::: definition Actuator disc {#def-actuator-disc}
An **actuator disc** is an idealised propeller: an infinitely thin disc of area $A$ that the flow passes through without swirl, across which the static pressure jumps by $\Delta p$ uniformly over the disc while the velocity is continuous. Far upstream the flow approaches at $V_0$ and pressure $p_0$; far downstream, in the **slipstream**, it has velocity $V_0 + w$ and has returned to $p_0$. The velocity at the disc is written $V_0 + v$, where $v$ is the **induced velocity**. The flow outside the stream tube that passes through the disc is undisturbed in the momentum balance.
:::

::: proposition Froude's theorem and the ideal efficiency {#prop-froude}
For an actuator disc in steady, incompressible, inviscid flow of density $\rho$:
1. the velocity increment at the disc is half that in the far wake, $v = w/2$;
2. the thrust is $T = \rho A (V_0 + v)\,w = 2\rho A (V_0 + v)\,v$;
3. the power absorbed is $P = T (V_0 + v)$, and the **ideal propulsive efficiency** is
$$
\eta_i = \frac{T V_0}{P} = \frac{V_0}{V_0 + v} = \frac{2}{1 + \sqrt{1 + C_{T_s}}},
\qquad
C_{T_s} = \frac{T}{\tfrac12\rho V_0^2 A} .
$$ {#eq-ideal-eta}
:::

::: proof
**Momentum.** Take the stream tube through the disc as control volume, with the far-upstream and far-downstream faces at pressure $p_0$. The mass flow is $\dot m = \rho A (V_0 + v)$. The pressure on the curved stream-tube boundary does have an axial component, so instead use the classical argument: consider a large control volume enclosing the disc, with $p_0$ on all its far boundaries; as in the thrust equation of [[propulsion/thrust-efficiency]], the net force is the momentum change of the flow that passes through the disc, $T = \dot m\,w = \rho A (V_0 + v) w$.
**Pressure jump.** Bernoulli's equation holds separately upstream and downstream of the disc (no energy is added except at the disc). Upstream: $p_0 + \tfrac12\rho V_0^2 = p_u + \tfrac12\rho(V_0 + v)^2$. Downstream: $p_d + \tfrac12\rho(V_0 + v)^2 = p_0 + \tfrac12\rho (V_0 + w)^2$. Subtracting,
$$
\Delta p = p_d - p_u = \tfrac12\rho\left[(V_0 + w)^2 - V_0^2\right] = \rho w\left(V_0 + \tfrac12 w\right).
$$
The force on the disc is also $T = A\,\Delta p = \rho A w (V_0 + \tfrac12 w)$. Equating with the momentum result gives $V_0 + v = V_0 + \tfrac12 w$, i.e. $v = w/2$.
**Power.** The power delivered to the flow is the kinetic-energy flux increase, $P = \tfrac12\dot m\left[(V_0 + w)^2 - V_0^2\right] = \dot m w (V_0 + \tfrac12 w) = T (V_0 + v)$. Equivalently it is the pressure jump times the volume flow, $\Delta p\,A(V_0 + v)$. The efficiency is $\eta_i = TV_0/P = V_0/(V_0 + v)$.
**In terms of thrust loading.** Solve $T = 2\rho A (V_0 + v)v$ for $v$: $v = \tfrac12\left[-V_0 + \sqrt{V_0^2 + 2T/(\rho A)}\right]$, so $(V_0 + v)/V_0 = \tfrac12\left[1 + \sqrt{1 + C_{T_s}}\right]$, which gives [[#eq-ideal-eta]]. Assumptions: incompressible, inviscid, steady flow; uniform loading; no swirl in the slipstream; no tip losses. Real propellers lose a further 5–15 % to profile drag, swirl and non-uniform loading.
:::

Note that $\eta_i = 2/(1 + (V_0 + w)/V_0)$ is exactly the propulsive efficiency of a jet with exit velocity $V_0 + w$: the actuator disc *is* a jet engine with a very large mass flow. The efficiency depends on one number, the **thrust loading** $T/A$ relative to the dynamic pressure. A lightly loaded propeller (large disc, small thrust, high speed) is efficient; a heavily loaded one is not.

::: example Momentum theory for a light aircraft at cruise {#ex-disc-cruise}
A light aircraft propeller of diameter $1.9\ \mathrm{m}$ produces $1500\ \mathrm{N}$ of thrust at $V_0 = 60\ \mathrm{m/s}$ at sea level ($\rho = 1.225\ \mathrm{kg/m^3}$). Find the slipstream velocity increment, the ideal efficiency and the ideal power.
::: solution
$A = \pi \times 1.9^2/4 = 2.835\ \mathrm{m^2}$, and $C_{T_s} = 1500/(\tfrac12 \times 1.225 \times 60^2 \times 2.835) = 0.240$. Then
$$
\eta_i = \frac{2}{1 + \sqrt{1.240}} = 0.946 .
$$
The disc velocity is $V_0/\eta_i = 63.41\ \mathrm{m/s}$, so $v = 3.41\ \mathrm{m/s}$ and $w = 6.81\ \mathrm{m/s}$. Power $P = T(V_0 + v) = 1500 \times 63.41 = 95.1\ \mathrm{kW}$, of which $TV_0 = 90.0\ \mathrm{kW}$ is useful.

**Check.** The slipstream is only 11 % faster than the free stream, consistent with $\eta_i$ close to 1. A real propeller with $\eta \approx 0.82$ would need about $110\ \mathrm{kW}$ of shaft power — the order of the engines fitted to four-seat aircraft. The extra 15 kW go into blade profile drag, swirl and tip losses that momentum theory leaves out.
:::
:::

### Static thrust and the figure of merit

At $V_0 = 0$ the efficiency defined above is zero, yet thrust per unit power is exactly what matters for take-off, for a hovering rotor and for a multirotor drone. Setting $V_0 = 0$ in [[#prop-froude]]:
$$
T = 2\rho A v^2,\qquad P_{\text{ideal}} = T v = \frac{T^{3/2}}{\sqrt{2\rho A}} .
$$ {#eq-static}
For a given power, static thrust grows as $(\rho A)^{1/3}P^{2/3}$: a bigger disc lifts more for the same power, which is why helicopters have large rotors.

::: definition Figure of merit {#def-figure-of-merit}
The **figure of merit** of a propeller or rotor in static operation is the ratio of the ideal (momentum-theory) power to the actual shaft power for the same thrust,
$$
\mathrm{FM} = \frac{T^{3/2}/\sqrt{2\rho A}}{P} .
$$
Good helicopter rotors reach $\mathrm{FM} \approx 0.75$–$0.8$; small drone propellers typically $0.5$–$0.65$ (low Reynolds number, simple blade shapes).
:::

::: example Static thrust on the ground {#ex-static}
The propeller of example [[#ex-disc-cruise]] is driven at $120\ \mathrm{kW}$ on the ground with a figure of merit of $0.75$. Estimate its static thrust.
::: solution
The ideal power for the actual thrust is $\mathrm{FM}\times P = 90\ \mathrm{kW}$, so from [[#eq-static]]
$$
T = \left(2\rho A\,(\mathrm{FM}\,P)^2\right)^{1/3} = \left(2 \times 1.225 \times 2.835 \times (9.0\times10^{4})^2\right)^{1/3} = 3.83\ \mathrm{kN}.
$$
The induced velocity is $v = \sqrt{T/(2\rho A)} = 23.5\ \mathrm{m/s}$.

**Check.** Static thrust of $3.8\ \mathrm{kN}$ is two and a half times the cruise thrust of $1.5\ \mathrm{kN}$ — the propeller is a high-thrust, low-speed device, the opposite of a turbojet, whose thrust changes comparatively little over the take-off run. In practice a fixed-pitch cruise propeller would be partly stalled at $V_0 = 0$ and fall short of this; a variable-pitch one gets closer.
:::
:::

::: widget plot
f: 2/(1 + sqrt(1 + L/(0.5*r*x^2)))
x: 5, 150
y: 0, 1
sliders: L=530:50:3000:10; r=1.225:0.4:1.225:0.005
labels: \eta_i
points: 60, 0.9463
caption: Ideal (actuator-disc) efficiency against flight speed $x$ in m/s for a disc loading $L = T/A$ in $\mathrm{N/m^2}$ and air density $r$ in $\mathrm{kg/m^3}$. The point is example [[#ex-disc-cruise]] ($T/A = 529\ \mathrm{N/m^2}$). Raise the disc loading — a smaller propeller for the same thrust, or a heavier aircraft — and watch the efficiency at low speed fall away; lower the density (altitude) and the same disc behaves as if more heavily loaded.
:::

## Propeller coefficients

Dimensional analysis ([[fluid-mechanics/dimensional-analysis]]) applied to a propeller of fixed shape and pitch setting shows that thrust $T$, torque $Q$ and power $P = 2\pi n Q$ depend on $\rho$, $V_0$, the rotational speed $n$ (revolutions per second), the diameter $D$, and — through the Reynolds and tip Mach numbers — on viscosity and the speed of sound. When the latter two effects are secondary, three groups suffice.

::: definition Advance ratio and propeller coefficients {#def-coefficients}
$$
J = \frac{V_0}{nD},\qquad
C_T = \frac{T}{\rho n^2 D^4},\qquad
C_Q = \frac{Q}{\rho n^2 D^5},\qquad
C_P = \frac{P}{\rho n^3 D^5} = 2\pi C_Q ,
$$
and the propeller efficiency is
$$
\eta = \frac{T V_0}{P} = J\,\frac{C_T}{C_P} .
$$ {#eq-prop-eta}
The **advance ratio** $J$ is the distance the aircraft moves per revolution, in diameters; $\pi/J$ is the ratio of tip speed to flight speed. $C_T(J)$, $C_P(J)$ and $\eta(J)$ for each blade-pitch setting form the propeller's **performance map**.
:::

The efficiency follows directly: $TV_0/P = (C_T\rho n^2D^4)(J nD)/(C_P\rho n^3 D^5) = JC_T/C_P$. For a fixed-pitch propeller, $C_T$ falls as $J$ rises (the blade sections meet the air at a smaller angle of attack) and reaches zero at the **zero-thrust advance ratio**; $\eta$ therefore rises from zero at $J = 0$ to a peak of 0.8–0.88 and drops sharply to zero again just below that point. Each blade angle has its own curve, and the envelope of the peaks is what a variable-pitch propeller can follow.

::: example Reading a propeller map {#ex-map}
A two-metre propeller turns at $2400\ \mathrm{rpm}$ in flight at $V_0 = 70\ \mathrm{m/s}$ at sea level. At this advance ratio its map gives $C_T = 0.080$ and $C_P = 0.090$. Find $J$, the efficiency, the thrust and the shaft power.
::: solution
$n = 2400/60 = 40\ \mathrm{rev/s}$, so $J = 70/(40 \times 2.0) = 0.875$, and $\eta = 0.875 \times 0.080/0.090 = 0.778$.
$$
T = C_T\rho n^2D^4 = 0.080 \times 1.225 \times 1600 \times 16 = 2.51\ \mathrm{kN},\qquad
P = C_P\rho n^3D^5 = 0.090 \times 1.225 \times 64\,000 \times 32 = 226\ \mathrm{kW}.
$$
**Check.** $TV_0/P = 2509 \times 70/225\,800 = 0.778$, as it must. Momentum theory for the same thrust and disc gives $C_{T_s} = 2509/(\tfrac12 \times 1.225 \times 70^2 \times 3.142) = 0.266$ and $\eta_i = 0.941$: the real propeller recovers about 83 % of the ideal, which is typical.
:::
:::

## Blade-element theory

Momentum theory treats the propeller as a black disc. To design blades we need to know what each piece of blade does.

::: definition Blade element, inflow angle and angle of attack {#def-blade-element}
Consider an annulus of a propeller with $B$ blades, at radius $r$ and of width $\mathrm{d}r$, where the blade has chord $c$ and **blade angle** (pitch angle) $\beta$ measured from the plane of rotation. The section meets the air with axial velocity $V_a = V_0(1 + a)$ and tangential velocity $V_\theta = \Omega r(1 - a')$, where $\Omega = 2\pi n$ and $a$, $a'$ are the axial and swirl **induction factors** (both zero in the simplest theory). The resultant velocity is $W = \sqrt{V_a^2 + V_\theta^2}$, the **inflow angle** is $\phi = \arctan(V_a/V_\theta)$, and the section's angle of attack is $\alpha = \beta - \phi$. The section has lift and drag coefficients $C_l(\alpha)$, $C_d(\alpha)$, and its **drag angle** is $\gamma = \arctan(C_d/C_l)$.
:::

Lift acts perpendicular to $W$ and drag along it. Resolving into the axial (thrust) and tangential (torque) directions:
$$
\mathrm{d}T = \tfrac12\rho W^2 B c\,(C_l\cos\phi - C_d\sin\phi)\,\mathrm{d}r,
\qquad
\mathrm{d}Q = \tfrac12\rho W^2 B c\,(C_l\sin\phi + C_d\cos\phi)\,r\,\mathrm{d}r .
$$ {#eq-blade-element}
Integrating from the hub to the tip gives $T$ and $Q$, if the inflow (that is, $a$ and $a'$) is known.

::: proposition Efficiency of a blade element {#prop-element-eta}
Neglecting induced velocities ($a = a' = 0$), the efficiency of a blade element is
$$
\eta_e = \frac{V_0\,\mathrm{d}T}{\Omega\,\mathrm{d}Q} = \frac{\tan\phi}{\tan(\phi + \gamma)},
$$ {#eq-element-eta}
which, for a given drag angle $\gamma$, is greatest at $\phi = 45° - \gamma/2$, where $\eta_{e,\max} = \tan(45° - \gamma/2)/\tan(45° + \gamma/2)$.
:::

::: proof
With $C_d = C_l\tan\gamma$, [[#eq-blade-element]] gives
$$
\frac{\mathrm{d}T}{\mathrm{d}Q} = \frac{\cos\phi - \tan\gamma\sin\phi}{r(\sin\phi + \tan\gamma\cos\phi)} = \frac{\cos(\phi + \gamma)}{r\sin(\phi + \gamma)} = \frac{1}{r\tan(\phi+\gamma)},
$$
after multiplying numerator and denominator by $\cos\gamma$. With $a = a' = 0$, $\tan\phi = V_0/(\Omega r)$, so
$$
\eta_e = \frac{V_0}{\Omega r\tan(\phi+\gamma)} = \frac{\tan\phi}{\tan(\phi+\gamma)} .
$$
To maximise, set the derivative of $\ln\eta_e = \ln\tan\phi - \ln\tan(\phi + \gamma)$ to zero: $1/(\sin\phi\cos\phi) = 1/(\sin(\phi+\gamma)\cos(\phi+\gamma))$, i.e. $\sin 2\phi = \sin(2\phi + 2\gamma)$, whose relevant solution is $2\phi = 180° - 2\phi - 2\gamma$, so $\phi = 45° - \gamma/2$. Assumptions: two-dimensional section characteristics apply at each radius; no induced velocity; no interaction between elements.
:::

[[#eq-element-eta]] has two lessons. First, even with no induced losses, the profile drag makes efficiency fall to zero both when $\phi \to 0$ (low advance ratio — the blades churn the air) and when $\phi + \gamma \to 90°$. Second, the best inflow angle is about $45°$, which a real propeller cannot have along the whole blade, because $\tan\phi = V_0/(\Omega r)$ varies with radius: sections near the hub have large $\phi$, those near the tip small $\phi$. That is why blades are **twisted** — $\beta$ decreases outwards — to keep every section near its best angle of attack, and why the inner part of the blade contributes little.

::: example A blade element at three-quarter radius {#ex-element}
A two-bladed propeller of radius $1.0\ \mathrm{m}$ turns at $2400\ \mathrm{rpm}$ in flight at $60\ \mathrm{m/s}$ at sea level. At $r = 0.75\ \mathrm{m}$ the blade has chord $0.12\ \mathrm{m}$ and blade angle $\beta = 24°$; the section has $C_l = 0.1$ per degree of angle of attack and $C_d = 0.010$. Neglecting induction, find the inflow angle, angle of attack, thrust and torque per unit span of the two blades at this radius, and the element efficiency.
::: solution
$\Omega = 2\pi \times 40 = 251.3\ \mathrm{rad/s}$, $\Omega r = 188.5\ \mathrm{m/s}$; $\phi = \arctan(60/188.5) = 17.66°$, so $\alpha = 24° - 17.66° = 6.34°$ and $C_l = 0.634$. $W = \sqrt{60^2 + 188.5^2} = 197.8\ \mathrm{m/s}$, $\tfrac12\rho W^2 = 23.97\ \mathrm{kPa}$.
$$
\frac{\mathrm{d}T}{\mathrm{d}r} = 23\,970 \times 2 \times 0.12\,(0.634\cos 17.66° - 0.010\sin 17.66°) = 3.46\ \mathrm{kN/m},
$$
$$
\frac{\mathrm{d}Q}{\mathrm{d}r} = 23\,970 \times 2 \times 0.12\,(0.634\sin 17.66° + 0.010\cos 17.66°) \times 0.75 = 871\ \mathrm{N\,m/m}.
$$
Element efficiency: $\eta_e = 60 \times 3459/(251.3 \times 871.1) = 0.948$; and from [[#eq-element-eta]] with $\gamma = \arctan(0.010/0.634) = 0.90°$, $\tan 17.66°/\tan 18.56° = 0.948$.

**Check.** The momentum balance of this annulus, $\mathrm{d}T = 4\pi r\rho V_0^2(1 + a)a\,\mathrm{d}r$, would need $a = 0.077$ to carry $3.46\ \mathrm{kN/m}$: the axial velocity at the blade is really about $64.6\ \mathrm{m/s}$, which raises $\phi$ and lowers $\alpha$ by more than a degree. Neglecting induction overestimates thrust — the gap that the BEM method closes.
:::
:::

### Blade-element momentum theory

The two theories have complementary gaps: blade-element theory needs the induced velocities, momentum theory needs the blade forces. Applying momentum theory to each annulus separately (assuming annuli do not interact) and equating gives the BEM equations.

::: algorithm Blade-element momentum (BEM) analysis {#alg-bem}
For each annulus of radius $r$ and width $\mathrm{d}r$:
1. Guess the induction factors $a$, $a'$ (start with zero).
2. Compute $V_a = V_0(1+a)$, $V_\theta = \Omega r(1 - a')$, $\phi$, $\alpha = \beta - \phi$, $W$, and $C_l$, $C_d$ from section data at the local Reynolds and Mach numbers.
3. Compute $\mathrm{d}T$ and $\mathrm{d}Q$ from [[#eq-blade-element]].
4. Equate them to the annulus momentum relations — axial momentum $\mathrm{d}T = 4\pi r\rho V_0^2(1+a)a\,\mathrm{d}r$, and angular momentum $\mathrm{d}Q = 4\pi r^3\rho V_0(1+a)\Omega a'\,\mathrm{d}r$ — and solve for new $a$, $a'$.
5. Under-relax and repeat 2–4 until $a$, $a'$ converge. Multiply the loading near the tip by a **tip-loss factor** (Prandtl's approximation to Goldstein's solution) to account for the finite number of blades.
6. Integrate $\mathrm{d}T$, $\mathrm{d}Q$ over the blade; $\eta = TV_0/(\Omega Q)$.
:::

BEM is fast and, with good airfoil data and tip-loss corrections, predicts the performance of conventional propellers within a few per cent; it is also the basis of wind-turbine rotor design (where the flow is decelerated, $a < 0$ in this sign convention). It fails where its assumptions fail: heavily loaded or highly swept blades, strong three-dimensional and compressibility effects, and installation effects such as a nacelle or wing in the slipstream, for which vortex-lattice and CFD methods are used.

::: warning Advance ratio uses revolutions per second, and coefficients are not interchangeable
$J = V_0/(nD)$ and the coefficients $C_T = T/(\rho n^2D^4)$, $C_P = P/(\rho n^3 D^5)$ use $n$ in **revolutions per second**, not rpm and not rad/s. Using $\Omega$ in rad/s changes $C_T$ by a factor $4\pi^2 \approx 39.5$. Helicopter practice uses yet another set, $C_T = T/(\rho A(\Omega R)^2)$ based on tip speed and disc area. Always check which convention a data sheet uses before reading numbers off it, and check $\eta = JC_T/C_P$ as a consistency test.
:::

## Pitch control, compressibility and the propeller's limits

**Fixed pitch.** A fixed-pitch propeller has its peak efficiency at one advance ratio; designed for cruise, it is inefficient and partly stalled at take-off, and its engine cannot reach full rpm; designed for climb, it over-speeds the engine in cruise.

**Variable and constant-speed propellers.** A variable-pitch hub changes $\beta$ for the whole blade. In a **constant-speed** propeller a governor adjusts the pitch so that the engine runs at its chosen rpm whatever the flight speed and power setting, keeping the propeller near the envelope of its efficiency peaks. Pitch can also be set to **feather** (blades edge-on to the flow, to minimise drag after an engine failure) and, on many turboprops, to **reverse** for braking on the runway.

**Tip Mach number.** The blade tip moves along a helix with speed $\sqrt{V_0^2 + (\pi n D)^2}$. As the **helical tip Mach number** approaches and exceeds about $0.85$–$0.9$, shock waves form on the outer sections, drag rises steeply, efficiency falls and noise rises. This sets a ceiling on tip speed, which in turn limits diameter at a given rpm (hence the reduction gearboxes of turboprops, which run their turbines at many thousands of rpm and their propellers at around $1000$–$2000$ rpm). Thin, swept tips and more blades raise the usable Mach number.

::: example Tip Mach number of a turboprop {#ex-tip-mach}
A regional turboprop's propeller of diameter $3.9\ \mathrm{m}$ turns at $1020\ \mathrm{rpm}$ in cruise at $V_0 = 140\ \mathrm{m/s}$ at an altitude where the temperature is $242.7\ \mathrm{K}$ ($7\ \mathrm{km}$ in the standard atmosphere). Find the helical tip Mach number.
::: solution
$a = \sqrt{1.4 \times 287 \times 242.7} = 312.3\ \mathrm{m/s}$. Tip rotational speed $\pi n D = \pi \times 17.0 \times 3.9 = 208.3\ \mathrm{m/s}$. Helical tip speed $\sqrt{208.3^2 + 140^2} = 251.0\ \mathrm{m/s}$, so $M_{\text{tip}} = 0.80$.

**Check.** The flight Mach number is $0.45$ and the advance ratio $J = 140/(17.0 \times 3.9) = 2.11$. If the aircraft flew at Mach 0.7 with the same rotational speed, the tip Mach number would be $\sqrt{(208.3/312.3)^2 + 0.7^2} = 0.97$ — beyond the comfortable limit. To fly faster, the propeller must turn more slowly (losing thrust per blade) or use thin, swept blades.
:::
:::

**Propeller or fan?** At low speed the propeller's huge disc gives it unbeatable propulsive efficiency and static thrust. As flight Mach number rises, three things erode its advantage: the helical tip Mach number limit, the swirl loss (a propeller leaves the slipstream rotating, a fan's stator vanes remove the swirl), and the fact that a propeller cannot slow the incoming air before it reaches the blades, whereas a ducted fan's inlet diffuses the flow so the fan blades see about Mach 0.5–0.6 at any cruise speed. Turboprops typically cruise at Mach 0.5–0.65; above about Mach 0.7 the high-bypass turbofan wins. **Open rotors** or **propfans** — thin, highly swept, many-bladed propellers, often in counter-rotating pairs to recover swirl — aim at Mach 0.75–0.8 with propeller-like efficiency, at the price of noise and installation difficulty; they were flight-tested in the 1980s and remain under development.

::: quiz
A fixed-pitch propeller designed for cruise is run up on the ground at full throttle. Compared with cruise, which statement is correct?
- [ ] The blade sections operate at a smaller angle of attack, so the propeller is lightly loaded.
- [x] The inflow angle $\phi$ is much smaller, so the sections operate at a large angle of attack and may stall.
- [ ] The propulsive efficiency is higher because the induced velocity is higher.
- [ ] The advance ratio is unchanged because the rpm is unchanged.
::: solution
With $V_0 = 0$ (apart from the induced inflow), $\tan\phi = V_a/(\Omega r)$ is very small and $\alpha = \beta - \phi$ approaches the full blade angle, which for a cruise-pitch blade is far beyond stall at the outer sections. The advance ratio is zero, the efficiency (defined as $TV_0/P$) is zero, and the engine usually cannot reach full rpm against the high torque — one reason for variable-pitch propellers.
:::
:::

::: widget plot
f: tan(x*pi/180)/tan(x*pi/180 + atan(1/E))
x: 1, 89
y: 0, 1
sliders: E=63:10:150:1
labels: \eta_e
points: 17.66, 0.948
caption: Blade-element efficiency [[#eq-element-eta]] against inflow angle $\phi$ in degrees for section lift-to-drag ratio $E = C_l/C_d$. The point is the element of example [[#ex-element]] ($E = 63$). The peak sits near $45°$ and is broad; a section with a poor lift-to-drag ratio loses efficiency everywhere, most of all at small inflow angles near the tip at low advance ratio.
:::

::: history
The momentum theory of the propeller was begun by W. J. M. Rankine (1865), who treated a ship's screw as a device accelerating a column of water, and completed by R. E. Froude (1889), who introduced the actuator disc and showed that half the velocity increase occurs ahead of the disc. William Froude had proposed analysing the blade element by element in 1878, and Stefan Drzewiecki developed blade-element theory for air propellers from the 1890s. The Wright brothers designed the propellers of their 1903 Flyer by treating the blades as rotating wings, using data from their own wind-tunnel tests. Albert Betz (1919) found the optimum distribution of loading along the blade for minimum induced loss, and Sydney Goldstein (1929) solved for the finite number of blades, the basis of the tip-loss corrections used in BEM. Variable-pitch and constant-speed propellers came into widespread use in the 1930s.
:::

::: summary
- Actuator-disc theory: half the velocity increment occurs ahead of the disc; $T = 2\rho A(V_0 + v)v$, $P = T(V_0 + v)$, ideal efficiency $\eta_i = V_0/(V_0 + v) = 2/(1 + \sqrt{1 + C_{T_s}})$. Low disc loading means high efficiency.
- Static operation: $P_{\text{ideal}} = T^{3/2}/\sqrt{2\rho A}$; the figure of merit compares ideal and actual power.
- Performance is presented through $J = V_0/(nD)$, $C_T$, $C_P$ and $\eta = JC_T/C_P$, with $n$ in revolutions per second.
- Blade-element theory resolves section lift and drag into thrust and torque; element efficiency $\tan\phi/\tan(\phi+\gamma)$ peaks near $\phi = 45°$; blades are twisted to keep sections near their best angle of attack.
- BEM combines the two theories annulus by annulus, with tip-loss corrections.
- Variable pitch keeps the propeller efficient across speeds; the helical tip Mach number limits speed and diameter; above about Mach 0.65–0.7 ducted fans take over.
:::

## Exercises

::: exercise {#exr-eta-coeff level=1 check="0.75"}
A propeller of diameter $1.8\ \mathrm{m}$ turns at $40\ \mathrm{rev/s}$ at a flight speed of $54\ \mathrm{m/s}$, where its map gives $C_T = 0.10$ and $C_P = 0.10$. Find the advance ratio and the efficiency. (Enter the efficiency as a decimal fraction.)
::: solution
$J = 54/(40 \times 1.8) = 0.75$, $\eta = JC_T/C_P = 0.75$.
:::
:::

::: exercise {#exr-ideal-eta level=1 check="0.909"}
In the slipstream far behind an actuator disc the velocity is $20\,\%$ above the flight speed. What is the ideal efficiency? (Enter a decimal fraction rounded to three significant figures.)
::: solution
$w = 0.2V_0$, $v = w/2 = 0.1V_0$, $\eta_i = V_0/(V_0 + v) = 1/1.1 = 0.909$.
:::
:::

::: exercise {#exr-tip-static level=1 check="0.832"}
A propeller of diameter $2.0\ \mathrm{m}$ turns at $2700\ \mathrm{rpm}$ on the ground, where the speed of sound is $340\ \mathrm{m/s}$. Find the tip Mach number. (Enter it rounded to three significant figures.)
::: solution
Tip speed $\pi n D = \pi \times 45 \times 2.0 = 282.7\ \mathrm{m/s}$; with $V_0 = 0$, $M_{\text{tip}} = 282.7/340 = 0.832$.
:::
:::

::: exercise {#exr-hover level=2 check="57.0"}
A drone rotor of diameter $0.40\ \mathrm{m}$ must produce $10\ \mathrm{N}$ in hover at sea level ($\rho = 1.225\ \mathrm{kg/m^3}$). Find the ideal power. If the figure of merit is $0.6$, what shaft power is needed? (Enter the ideal power in W, rounded to three significant figures.)
::: solution
$A = 0.1257\ \mathrm{m^2}$, $P_{\text{ideal}} = 10^{1.5}/\sqrt{2 \times 1.225 \times 0.1257} = 31.62/0.5549 = 57.0\ \mathrm{W}$. Shaft power $= 57.0/0.6 = 95\ \mathrm{W}$.
:::
::: answer
$57.0\ \mathrm{W}$ ideal, $95\ \mathrm{W}$ actual
:::
:::

::: exercise {#exr-thrust-coeff level=2 check="2.58"}
A propeller of diameter $2.2\ \mathrm{m}$ turns at $35\ \mathrm{rev/s}$ at an altitude where $\rho = 1.00\ \mathrm{kg/m^3}$, with $C_T = 0.090$. Find the thrust. (Enter the thrust in kN, rounded to three significant figures.)
::: solution
$T = C_T\rho n^2D^4 = 0.090 \times 1.00 \times 1225 \times 23.43 = 2583\ \mathrm{N} = 2.58\ \mathrm{kN}$.
:::
:::

::: exercise {#exr-element-max level=2 check="0.961"}
A blade section has a lift-to-drag ratio of 50. What is the highest efficiency any element of this section can reach, neglecting induced losses? (Enter it rounded to three significant figures.)
::: solution
$\gamma = \arctan(0.02) = 1.146°$; at $\phi = 45° - 0.573° = 44.43°$, $\eta_e = \tan 44.43°/\tan 45.57° = 0.961$.
:::
:::

::: exercise {#exr-disc-size level=3 check="1.47"}
Choose the smallest propeller diameter that gives an *ideal* efficiency of at least $0.90$ while producing $2500\ \mathrm{N}$ at $70\ \mathrm{m/s}$ at sea level ($\rho = 1.225\ \mathrm{kg/m^3}$). (Enter the diameter in m, rounded to three significant figures.)
::: solution
$\eta_i = V_0/(V_0 + v) = 0.90$ gives $v = V_0/9 = 7.78\ \mathrm{m/s}$, $w = 15.56\ \mathrm{m/s}$. From $T = \rho A(V_0 + v)w$: $A = 2500/(1.225 \times 77.78 \times 15.56) = 1.687\ \mathrm{m^2}$, so $D = \sqrt{4A/\pi} = 1.47\ \mathrm{m}$. A real propeller would reach about $0.8$ at this size; a larger diameter raises efficiency further but brings the tip Mach limit and ground clearance into play.
:::
:::

::: exercise {#exr-bem-derive level=3}
Derive the annulus momentum relations used in step 4 of [[#alg-bem]]: (a) $\mathrm{d}T = 4\pi r\rho V_0^2(1+a)a\,\mathrm{d}r$ and (b) $\mathrm{d}Q = 4\pi r^3\rho V_0(1+a)\Omega a'\,\mathrm{d}r$, where the induced swirl velocity at the disc is $a'\Omega r$ and that in the far wake is twice as large. State the assumptions.
::: solution
(a) The annulus passes $\mathrm{d}\dot m = \rho\,2\pi r\,\mathrm{d}r\,V_0(1+a)$. By [[#prop-froude]] applied to the annulus, the far-wake increment is twice the disc increment $aV_0$, so $\mathrm{d}T = \mathrm{d}\dot m \times 2aV_0 = 4\pi r\rho V_0^2(1+a)a\,\mathrm{d}r$.
(b) The torque equals the rate of increase of angular momentum of the flow. Air enters without swirl and, just behind the disc, has tangential velocity $2a'\Omega r$ (the swirl is zero ahead of the disc and $2a'\Omega r$ behind it, $a'\Omega r$ being the mean value at the disc). Its angular momentum per unit mass is $r \times 2a'\Omega r$, so $\mathrm{d}Q = \mathrm{d}\dot m\,2a'\Omega r^2 = 4\pi r^3\rho V_0(1+a)\Omega a'\,\mathrm{d}r$.
Assumptions: annuli independent (no radial interaction), steady incompressible inviscid flow outside the blades, axisymmetric (infinitely many blades — corrected afterwards by a tip-loss factor), pressure in the wake equal to $p_0$ (neglecting the small pressure deficit associated with swirl).
:::
:::

::: exercise {#exr-prop-vs-fan level=3}
**Design discussion.** An aircraft maker must choose between a turboprop and a geared turbofan for a 70-seat regional aircraft with typical sector lengths of $500\ \mathrm{km}$. Using the ideas of this chapter and of [[propulsion/thrust-efficiency]], list the arguments on each side (propulsive efficiency, cruise Mach number and block time, tip Mach number, cabin noise, installation, maintenance) and say which you would recommend and what data you would need to be sure.
::: solution
**Turboprop:** large disc and low disc loading give high propulsive efficiency, lowest fuel burn at Mach 0.5–0.6 and excellent take-off and short-field performance; tip Mach number caps cruise at about Mach 0.65; propeller noise and vibration in the cabin need treatment; gearbox and propeller add maintenance. **Turbofan:** cruise at Mach 0.75–0.8 shortens block time — but on a $500\ \mathrm{km}$ sector, much of which is climb and descent, the time saving is only some minutes; higher fuel burn per seat on short sectors; quieter cabin, simpler installation under a wing, higher cruise altitude above weather. On short sectors fuel cost usually favours the turboprop; on longer ones, or where passenger preference and speed dominate, the turbofan. A sound recommendation needs mission fuel burn from engine data at the actual sector profile, maintenance costs, airport noise limits and fleet commonality — the physics frames the choice but does not settle it alone.
:::
:::
