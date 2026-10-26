A gas turbine is a heat engine that has to compress its working fluid before it can heat it, and the compressor is the component that decides whether the engine works at all. In a modern turbofan the core compressor raises the pressure of the air by a factor of 40 or more and absorbs roughly half of the power the turbines produce; a loss of a few points of compressor efficiency is paid for twice, once in extra turbine work and once in a lower cycle pressure ratio. The compressor is also the component that most often limits the engine's operating range, because air that is being pushed *up* a pressure gradient is prone to separating from the blades, and separated flow in a compressor can collapse into stall or surge within milliseconds.

This chapter develops compressor aerodynamics from one equation. The **Euler turbomachinery equation** says that the work done on each kilogram of gas equals the change in the product of blade speed and swirl velocity; everything else — velocity triangles, stage loading, degree of reaction, the limits on diffusion — is a way of choosing that swirl change without separating the flow. We then turn the stage-level picture into whole-machine quantities: the difference between isentropic and polytropic efficiency, the centrifugal compressor with its slip factor, the compressor map with its surge line and corrected parameters, and the devices (variable stators, bleed valves, multiple spools) that keep a high-pressure-ratio compressor stable across its speed range.

Throughout, stagnation (total) quantities carry the subscript $t$ — $T_t$, $p_t$, $h_t$ — and station numbers follow SAE ARP 755: station 2 is the compressor face, station 3 the compressor exit. The overall compressor pressure ratio is $\pi_c = p_{t3}/p_{t2}$ and its isentropic efficiency is $\eta_c$. Air is a perfect gas with $c_p = 1005\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $\gamma = 1.4$ and $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$ unless stated. The cycle context is in [[propulsion/gas-turbine-cycles]] and the thermodynamics of stagnation states in [[thermodynamics/power-cycles]].

## The physical picture: why compressors have many stages

A turbine blade row accelerates the flow, and accelerating flow is easy to guide: the boundary layers on the blades are thinned by the falling pressure. A compressor blade row does the opposite. To raise the pressure, each row must **diffuse** the flow — slow it down relative to the blade — and a boundary layer that is asked to flow into rising pressure thickens and eventually separates. That is the whole reason axial compressors have many more stages than the turbines that drive them: a typical high-bypass turbofan has 10 to 14 compressor stages in its core (plus fan and booster) driven by perhaps 2 high-pressure and 4 to 7 low-pressure turbine stages. Each compressor stage can only be asked for a modest pressure rise, around 1.2 to 1.6 in a core stage, before the blade boundary layers separate.

An axial stage consists of a **rotor**, a ring of blades on a disc spinning at blade speed $U = \omega r$, followed by a **stator**, a stationary ring of vanes. The rotor adds swirl to the flow and so does work on it; its passages also diffuse the flow relative to the blades, raising the static pressure. The stator removes the swirl, diffusing the absolute flow and raising the static pressure further, and hands the flow to the next rotor at the angle it was designed for. A **centrifugal** (radial) compressor does the same job differently: the flow enters axially near the shaft, is turned outward in the impeller and leaves at the rim with a large tangential velocity, so that much of the work goes in through the increase of radius rather than through turning; a radial diffuser then recovers the kinetic energy as pressure. One centrifugal stage can deliver a pressure ratio of 4 to 8, which is why small engines, helicopter turboshafts and the last stage of many turboprop compressors are centrifugal.

## Velocity triangles and the Euler equation

The flow seen by a rotor blade is not the flow seen by an observer on the casing. The connection between the two frames is the whole content of the velocity triangle.

::: definition Velocity triangles {#def-velocity-triangles}
At a given radius $r$ the blade moves tangentially with speed $U = \omega r$. The **absolute velocity** $\mathbf{c}$ is measured in the stationary frame and the **relative velocity** $\mathbf{w}$ in the frame rotating with the blade; they are related by
$$
\mathbf{c} = \mathbf{w} + \mathbf{U}.
$$
Each velocity is split into an **axial** component (subscript $x$), a **tangential** or **swirl** component (subscript $\theta$) and, in radial machines, a **radial** component (subscript $r$). For an axial compressor we measure the absolute flow angle $\alpha$ from the axial direction, positive in the direction of rotation, and the relative flow angle $\beta$ from the axial direction, positive *against* the direction of rotation, so that
$$
c_\theta = c_x\tan\alpha, \qquad U - c_\theta = c_x\tan\beta, \qquad \tan\alpha + \tan\beta = \frac{U}{c_x}.
$$
Station 1 is the rotor inlet, station 2 the rotor exit (stator inlet) and station 3 the stator exit. A **repeating** (normal) stage has $c_3 = c_1$ and $\alpha_3 = \alpha_1$, so that identical stages can be stacked.
:::

The rotor turns the relative flow from the large angle $\beta_1$ to the smaller angle $\beta_2$ — towards the axial direction — and so increases the absolute swirl from $c_{\theta 1}$ to $c_{\theta 2}$. How much work that represents follows from the angular-momentum balance.

::: proposition The Euler turbomachinery equation {#prop-euler}
For steady, adiabatic flow through a rotor turning at angular speed $\omega$, with mass flow $\dot m$ entering at radius $r_1$ with swirl $c_{\theta 1}$ and leaving at radius $r_2$ with swirl $c_{\theta 2}$, the shaft power absorbed is
$$
\dot W = \dot m\,(U_2 c_{\theta 2} - U_1 c_{\theta 1}),
$$
and the specific work, equal to the rise in stagnation enthalpy, is
$$
\Delta h_t = h_{t2} - h_{t1} = U_2 c_{\theta 2} - U_1 c_{\theta 1}.
$$ {#eq-euler}
For an axial stage with constant radius and constant axial velocity ($U_1 = U_2 = U$, $c_{x1} = c_{x2} = c_x$),
$$
\Delta h_t = U\,(c_{\theta 2} - c_{\theta 1}) = U c_x(\tan\alpha_2 - \tan\alpha_1) = U c_x(\tan\beta_1 - \tan\beta_2).
$$ {#eq-euler-axial}
:::

::: proof
Take a control volume enclosing the rotor passages and fixed in space. Assume steady flow (averaged over a blade passing period), uniform properties across the inlet and outlet stations, adiabatic walls, and negligible torque from shear on the stationary casing. The angular-momentum balance about the axis says that the torque $\tau$ exerted by the rotor on the fluid equals the net outflow of angular momentum,
$$
\tau = \dot m\,(r_2 c_{\theta 2} - r_1 c_{\theta 1}).
$$
Only tangential velocity components carry angular momentum about the axis; axial and radial components have no moment arm in that direction. The power delivered by the shaft is $\dot W = \tau\omega$, and with $U = \omega r$ this is $\dot W = \dot m(U_2 c_{\theta 2} - U_1 c_{\theta 1})$. The steady-flow energy equation for an adiabatic control volume with shaft work input $\dot W$ reads $\dot W = \dot m\,(h_{t2} - h_{t1})$, where $h_t = h + c^2/2$ (potential energy negligible for a gas). Equating the two expressions gives [[#eq-euler]]. For the axial stage, set $U_1 = U_2$ and use $c_\theta = c_x\tan\alpha$ and $U - c_\theta = c_x\tan\beta$ from [[#def-velocity-triangles]]; the difference $c_{\theta 2} - c_{\theta 1}$ equals $c_x(\tan\alpha_2 - \tan\alpha_1)$ and also $(U - c_x\tan\beta_2) - (U - c_x\tan\beta_1) = c_x(\tan\beta_1 - \tan\beta_2)$.

Notice what the proof did *not* need: no assumption about friction or losses inside the passages. The Euler equation is exact for the stagnation-enthalpy rise; losses show up only in how much of that enthalpy rise becomes useful pressure rise.
:::

Two consequences are worth stating at once. First, the work per stage scales as $U^2$: double the blade speed at fixed flow angles and the work quadruples. Blade speed is limited by disc and blade stresses and by the relative Mach number at the tip, so a core compressor stage typically runs at mean blade speeds of $300$ to $400\ \mathrm{m/s}$. Second, the work depends only on the *change* in swirl, so a stator that leaves residual swirl $c_{\theta 1}$ at the next rotor's inlet (a positive $\alpha_1$, **prewhirl**) reduces the work for a given rotor exit swirl — but it also reduces the relative velocity at the rotor tip, which is why prewhirl is used in the front stages where relative Mach numbers are highest.

In a rotor the quantity $h + w^2/2$ — the stagnation enthalpy in the relative frame — is conserved along a streamline at constant radius, because in the rotating frame the blades are stationary and do no work. Combining $h_t = h + c^2/2$ with [[#eq-euler-axial]] confirms this: $h_2 - h_1 = \tfrac{1}{2}(w_1^2 - w_2^2)$. The static enthalpy rise in the rotor is therefore set by the *relative* deceleration, and that is the quantity the blade boundary layers have to survive.

## Stage design parameters

Three dimensionless numbers describe the shape of the velocity triangles and so the character of a stage.

::: definition Flow coefficient, stage loading and degree of reaction {#def-stage-parameters}
For an axial stage with mean blade speed $U$:

- the **flow coefficient** $\phi = c_x/U$ measures the axial throughflow relative to the blade speed;
- the **stage loading coefficient** $\psi = \Delta h_t / U^2$ measures the work per unit mass relative to the blade kinetic energy;
- the **degree of reaction** $R$ is the fraction of the stage's static-enthalpy rise that occurs in the rotor,
$$
R = \frac{h_2 - h_1}{h_3 - h_1}.
$$
:::

::: proposition Loading and reaction from the triangles {#prop-reaction}
For a repeating axial compressor stage with constant axial velocity,
$$
\psi = \phi(\tan\beta_1 - \tan\beta_2) = 1 - \phi(\tan\alpha_1 + \tan\beta_2),
\qquad
R = \frac{\phi}{2}(\tan\beta_1 + \tan\beta_2).
$$ {#eq-reaction}
A stage with $R = \tfrac{1}{2}$ has symmetric triangles: $\beta_1 = \alpha_2$ and $\beta_2 = \alpha_1$.
:::

::: proof
The loading follows from [[#eq-euler-axial]] divided by $U^2$: $\psi = (c_x/U)(\tan\beta_1 - \tan\beta_2)$. Eliminating $\tan\beta_1 = 1/\phi - \tan\alpha_1$ from the identity in [[#def-velocity-triangles]] gives the second form. For the reaction, the rotor static rise is $h_2 - h_1 = \tfrac{1}{2}(w_1^2 - w_2^2)$ (conservation of relative stagnation enthalpy at constant radius) $= \tfrac{1}{2}c_x^2(\tan^2\beta_1 - \tan^2\beta_2)$, since the axial component is unchanged. For a repeating stage $c_3 = c_1$, so the static rise across the whole stage equals the stagnation rise: $h_3 - h_1 = h_{t3} - h_{t1} = U c_x(\tan\beta_1 - \tan\beta_2)$ (the stator does no work). Dividing, and factoring the difference of squares,
$$
R = \frac{\tfrac12 c_x^2(\tan\beta_1 - \tan\beta_2)(\tan\beta_1 + \tan\beta_2)}{U c_x(\tan\beta_1 - \tan\beta_2)} = \frac{\phi}{2}(\tan\beta_1 + \tan\beta_2).
$$
With $R = \tfrac12$, $\phi(\tan\beta_1 + \tan\beta_2) = 1 = \phi(\tan\alpha_2 + \tan\beta_2)$, using $\tan\alpha_2 = 1/\phi - \tan\beta_2$. Hence $\tan\beta_1 = \tan\alpha_2$; the same argument at inlet gives $\beta_2 = \alpha_1$. The assumptions are constant axial velocity, constant radius and a repeating stage; with radius change or axial-velocity change the formulas acquire extra terms.
:::

The second form of $\psi$ in [[#eq-reaction]] is the stage's ideal **characteristic**: for fixed blade exit angles ($\alpha_1$ set by the upstream stator, $\beta_2$ set by the rotor blade), the loading *falls* as the flow coefficient rises. That negative slope matters for stability. If the flow through the machine drops a little, the stage does more work and produces more pressure rise, which pushes the flow back up. Near stall the real characteristic flattens and then turns over, and the stabilising mechanism is lost — the origin of surge, discussed below.

Typical core-compressor values are $\phi \approx 0.4$–$0.7$, $\psi \approx 0.3$–$0.45$ and $R \approx 0.5$–$0.7$. A reaction near one half shares the diffusion equally between rotor and stator, which is why it is a natural choice for a stage whose rows are equally limited by diffusion.

::: widget plot
f: 1 - x*(tan(a1*pi/180) + tan(b2*pi/180)); cos(atan(1/x - tan(a1*pi/180)))/cos(b2*pi/180)
x: 0.2, 1
y: 0, 1.2
sliders: a1=20:0:40:1; b2=45:20:60:1
labels: \psi\ \text{(stage loading)}; w_2/w_1\ \text{(de Haller)}
hlines: 0.72
caption: The ideal stage characteristic of a repeating stage, $\psi = 1 - \phi(\tan\alpha_1 + \tan\beta_2)$, and the rotor de Haller ratio $w_2/w_1$, both against the flow coefficient $\phi$ on the horizontal axis. The horizontal line marks the de Haller limit $0.72$. Lower $\phi$ (throttling the machine) raises the loading but pushes the rotor towards excessive diffusion: find the flow coefficient at which the de Haller curve crosses $0.72$ for $\alpha_1 = 20^\circ$, $\beta_2 = 45^\circ$, then increase $\beta_2$ (less turning) and see the trade between loading and margin.
:::

## How much diffusion a blade row can take

The work of a stage rises with the turning $\tan\beta_1 - \tan\beta_2$, and the turning is limited by the deceleration the blade boundary layers will accept. Two empirical criteria are in everyday use; both summarise cascade experiments and neither is a law.

The oldest is **de Haller's criterion** (de Haller, 1953): the velocity ratio across a blade row should not fall below about $0.72$,
$$
\frac{w_2}{w_1} \ge 0.72 \ \ \text{(rotor)}, \qquad \frac{c_3}{c_2} \ge 0.72 \ \ \text{(stator)}.
$$ {#eq-dehaller}
It is a crude rule, because it ignores the blade spacing: a row with closely spaced blades shares the turning among more blades and can diffuse further.

The more refined criterion is the **diffusion factor** of Lieblein, Schwenk and Broderick (NACA RM E53D01, 1953), which estimates the peak velocity on the suction surface and compares it with the exit velocity:
$$
D = 1 - \frac{w_2}{w_1} + \frac{\lvert w_{\theta 1} - w_{\theta 2}\rvert}{2\sigma w_1},
\qquad \sigma = \frac{\text{chord}}{\text{blade pitch}},
$$ {#eq-diffusion-factor}
written here for a rotor (use absolute velocities for a stator). Correlation of NACA cascade and rotor data shows profile losses staying low for $D$ up to about $0.45$ at a rotor tip and about $0.55$–$0.6$ at hub and mean radii, and rising steeply beyond. The **solidity** $\sigma$ enters because more blades per unit circumference lower the loading on each.

::: example An axial stage from the velocity triangles {#ex-axial-stage}
A repeating stage of a core compressor runs at mean blade speed $U = 350\ \mathrm{m/s}$ with axial velocity $c_x = 175\ \mathrm{m/s}$. The upstream stator delivers the flow at $\alpha_1 = 20^\circ$ and the rotor blades turn the relative flow to $\beta_2 = 45^\circ$. Find the rotor inlet relative angle, the stagnation temperature rise, the loading and reaction, and check the de Haller ratio and the diffusion factor (solidity $\sigma = 1.2$). If the stage isentropic efficiency is $0.90$ and the inlet stagnation temperature is $288\ \mathrm{K}$, what is the stage pressure ratio?
::: solution
**Triangles.** $\phi = 175/350 = 0.500$, so $\tan\beta_1 = 1/\phi - \tan\alpha_1 = 2 - 0.3640 = 1.6360$, $\beta_1 = 58.57^\circ$. At rotor exit, $\tan\alpha_2 = 1/\phi - \tan\beta_2 = 2 - 1 = 1$, so $\alpha_2 = 45.00^\circ$.

**Work.** From [[#eq-euler-axial]],
$$
\Delta h_t = U c_x(\tan\beta_1 - \tan\beta_2) = 350 \times 175 \times (1.6360 - 1.0000) = 38.96\ \mathrm{kJ/kg},
\qquad
\Delta T_t = \frac{38\,960}{1005} = 38.8\ \mathrm{K}.
$$

**Coefficients.** $\psi = 38\,960/350^2 = 0.318$ and $R = \tfrac{1}{2}(0.5)(1.6360 + 1.0000) = 0.659$.

**Diffusion.** $w_1 = c_x/\cos\beta_1 = 175/0.5216 = 335.6\ \mathrm{m/s}$ and $w_2 = 175/\cos 45^\circ = 247.5\ \mathrm{m/s}$, so $w_2/w_1 = 0.738$ — just inside de Haller's limit. The stator has $c_3/c_2 = \cos\alpha_2/\cos\alpha_1 = 0.7071/0.9397 = 0.752$, also acceptable. The diffusion factor is
$$
D = 1 - 0.738 + \frac{175 \times 0.636}{2 \times 1.2 \times 335.6} = 0.262 + 0.138 = 0.401,
$$
comfortably below $0.45$.

**Pressure ratio.** With $T_{t1} = 288\ \mathrm{K}$,
$$
\frac{p_{t3}}{p_{t1}} = \left(1 + \eta_s\frac{\Delta T_t}{T_{t1}}\right)^{\gamma/(\gamma-1)} = \left(1 + 0.90 \times \frac{38.76}{288}\right)^{3.5} = 1.49.
$$

**Sanity check.** A loading of $0.32$ and a stage pressure ratio of $1.5$ are typical of a front core stage. The pressure ratio of later stages with the same temperature rise will be smaller, because the same $\Delta T_t$ is a smaller fraction of a higher $T_t$. Real stages also do slightly less work than the mean-line triangles predict, because the axial velocity profile peaks at mid-span as end-wall boundary layers thicken; designers multiply by a **work-done factor** of about $0.98$ for the first stages, falling towards $0.85$ in a long compressor (Howell's empirical correction).
:::
:::

::: warning Mixing up the angle conventions
Textbooks disagree on whether $\beta$ is measured from the axial or the tangential direction, and on its sign. With the convention of [[#def-velocity-triangles]], $\tan\alpha + \tan\beta = U/c_x$ at every station, and in a compressor rotor $\beta_1 > \beta_2$ (the relative flow is turned *towards* the axis). If your computed work comes out negative, or the reaction comes out above 1, you have almost certainly mixed a tangential-angle formula with axial-angle data or lost a sign on $w_\theta$. Draw the triangle — blade speed horizontal, axial velocity vertical — before writing any equation, and check that $w_\theta + c_\theta = U$.
:::

## Isentropic and polytropic efficiency

An overall pressure ratio of 40 is reached by stacking many stages, and the efficiency of the stack is not the efficiency of a stage. The reason is thermodynamic, not aerodynamic: the losses of an early stage heat the gas, and hotter gas needs more work to compress through the next pressure ratio — the **preheat effect**. The *polytropic* efficiency removes this effect and describes the quality of the blading itself.

::: definition Isentropic and polytropic compressor efficiency {#def-polytropic}
The **isentropic efficiency** of a compressor is the ratio of the ideal (isentropic) work to the actual work between the same stagnation pressures,
$$
\eta_c = \frac{h_{t3s} - h_{t2}}{h_{t3} - h_{t2}} = \frac{T_{t3s} - T_{t2}}{T_{t3} - T_{t2}} \quad\text{(perfect gas)}.
$$
The **polytropic** (small-stage) efficiency $\eta_p$ is the isentropic efficiency of an infinitesimal compression step, $\eta_p = \mathrm{d}h_{ts}/\mathrm{d}h_t$, assumed constant through the machine.
:::

::: proposition Isentropic efficiency from polytropic efficiency {#prop-polytropic}
For a perfect gas with constant $c_p$ and constant $\eta_p$,
$$
\frac{T_{t3}}{T_{t2}} = \pi_c^{(\gamma-1)/(\gamma\eta_p)},
\qquad
\eta_c = \frac{\pi_c^{(\gamma-1)/\gamma} - 1}{\pi_c^{(\gamma-1)/(\gamma\eta_p)} - 1}.
$$ {#eq-polytropic}
For $\pi_c > 1$ and $\eta_p < 1$, $\eta_c < \eta_p$, and $\eta_c$ falls as $\pi_c$ rises.
:::

::: proof
For an isentropic step, the Gibbs relation $T\,\mathrm{d}s = \mathrm{d}h - v\,\mathrm{d}p$ applied to stagnation states gives $\mathrm{d}h_{ts} = v_t\,\mathrm{d}p_t = (R T_t/p_t)\,\mathrm{d}p_t$. The actual enthalpy change in the step is $\mathrm{d}h_t = \mathrm{d}h_{ts}/\eta_p = c_p\,\mathrm{d}T_t$. Hence
$$
c_p\,\mathrm{d}T_t = \frac{R T_t}{\eta_p}\frac{\mathrm{d}p_t}{p_t}
\quad\Longrightarrow\quad
\frac{\mathrm{d}T_t}{T_t} = \frac{\gamma-1}{\gamma\eta_p}\frac{\mathrm{d}p_t}{p_t},
$$
using $R/c_p = (\gamma-1)/\gamma$. Integrating from station 2 to station 3 with $\eta_p$ constant gives $T_{t3}/T_{t2} = \pi_c^{(\gamma-1)/(\gamma\eta_p)}$. The isentropic temperature ratio is $\pi_c^{(\gamma-1)/\gamma}$, and substituting both into the definition of $\eta_c$ gives [[#eq-polytropic]].

To see that $\eta_c < \eta_p$, write $a = (\gamma-1)/\gamma\cdot\ln\pi_c > 0$, so $\eta_c = (e^{a} - 1)/(e^{a/\eta_p} - 1)$. The function $g(x) = (e^{x}-1)/x$ is increasing for $x > 0$, and $a/\eta_p > a$, so $(e^{a/\eta_p}-1)/(a/\eta_p) > (e^{a}-1)/a$, which rearranges to $\eta_c < \eta_p$. As $\pi_c \to 1$, $a \to 0$ and $\eta_c \to \eta_p$: a single small stage has isentropic efficiency equal to its polytropic efficiency.
:::

::: widget plot
f: (x^(0.4/1.4) - 1)/(x^(0.4/(1.4*ep)) - 1); ep + 0*x
x: 1.01, 60
y: 0.75, 1
sliders: ep=0.9:0.8:0.95:0.005
labels: \eta_c\ \text{(isentropic)}; \eta_p\ \text{(polytropic)}
caption: Isentropic efficiency of a compressor against overall pressure ratio $\pi_c$ for a fixed polytropic efficiency $\eta_p$ (the slider). At $\pi_c \to 1$ the two coincide; at $\pi_c = 40$ and $\eta_p = 0.90$ the isentropic efficiency is only about $0.84$. Use this when comparing compressors of different pressure ratio: quote $\eta_p$, which measures blading quality, not $\eta_c$, which penalises high pressure ratio.
:::

::: example Overall efficiency of a high-pressure-ratio compressor {#ex-polytropic}
A turbofan core compressor (booster plus high-pressure compressor) has overall pressure ratio $\pi_c = 40$ and polytropic efficiency $\eta_p = 0.90$, with $T_{t2} = 288\ \mathrm{K}$. Find the isentropic efficiency, the delivery temperature and the specific work. If the stages each produce the temperature rise of [[#ex-axial-stage]], about how many stages are needed?
::: solution
The exponents are $(\gamma - 1)/\gamma = 0.2857$ and $0.2857/0.90 = 0.3175$. Then
$$
\frac{T_{t3}}{T_{t2}} = 40^{0.3175} = 3.225, \qquad T_{t3} = 928.9\ \mathrm{K},
$$
while the isentropic temperature ratio is $40^{0.2857} = 2.868$. Hence
$$
\eta_c = \frac{2.868 - 1}{3.225 - 1} = 0.840,
\qquad
\Delta h_t = c_p(T_{t3} - T_{t2}) = 1005 \times 640.9 = 644\ \mathrm{kJ/kg}.
$$
With $\Delta T_t = 38.8\ \mathrm{K}$ per stage, $640.9/38.8 = 9.9$, so about ten stages — in practice more, because the work-done factor reduces the delivered rise and the rear stages, with short blades and thick end-wall boundary layers, are loaded more lightly.

**Sanity check.** A delivery temperature near $930\ \mathrm{K}$ at take-off is typical of a modern engine and is one of the constraints on further raising pressure ratio: the last-stage discs and the combustor inlet see this temperature. An efficiency difference of six points between $\eta_p$ and $\eta_c$ is precisely the preheat penalty of a long compressor.
:::
:::

## Centrifugal compressors

In a centrifugal compressor the flow leaves the impeller radially at the tip radius $r_2$, where the blade speed is $U_2$. With no inlet swirl ($c_{\theta 1} = 0$) the Euler equation reduces to $\Delta h_t = U_2 c_{\theta 2}$. If the fluid left the impeller exactly in the direction of radial blades, $c_{\theta 2}$ would equal $U_2$ and the work would be $U_2^2$. It does not: the pressure difference between the faces of each blade, which is what transmits the torque, also sets up a relative circulation in each passage, and the flow leaves with less swirl than the blades would impose. This is **slip**.

::: definition Slip factor and power input factor {#def-slip}
The **slip factor** is the ratio of the actual exit swirl to the swirl that perfect guidance would give. For radial-tipped blades,
$$
\sigma_s = \frac{c_{\theta 2}}{U_2},
$$
and for blades swept back by the angle $\beta_{2b}$ from radial it is defined with respect to the blade-congruent swirl. The **power input factor** $\psi_p \ge 1$ accounts for the extra work absorbed by disc friction and windage, which heats the gas without adding swirl. The stagnation temperature rise of an impeller with radial blades and no inlet swirl is
$$
\Delta T_t = \frac{\psi_p\,\sigma_s U_2^2}{c_p}.
$$ {#eq-centrifugal}
:::

Slip factors are not derived from first principles in practice but taken from correlations. For radial blades, the formula of Stanitz (1952),
$$
\sigma_s \approx 1 - \frac{0.63\pi}{Z},
$$ {#eq-stanitz}
with $Z$ the number of blades, fits the data well; for backswept impellers the correlation of Wiesner (1967),
$$
\sigma_s \approx 1 - \frac{\sqrt{\cos\beta_{2b}}}{Z^{0.7}}, \qquad c_{\theta 2} = U_2\left(\sigma_s - \phi_2\tan\beta_{2b}\right),\quad \phi_2 = \frac{c_{r2}}{U_2},
$$ {#eq-wiesner}
is the usual choice. Both are accurate to a few per cent for conventional blade numbers (about 15 to 30) and unreliable for very few blades.

::: widget plot
f: 1 - 0.63*pi/x; 1 - sqrt(cos(b*pi/180))/x^0.7
x: 6, 40
y: 0.6, 1
sliders: b=30:0:50:1
labels: \text{Stanitz (radial blades)}; \text{Wiesner}, \ \beta_{2b}\ \text{slider}
caption: Slip factor against the number of impeller blades $Z$. Adding blades reduces slip (the flow is better guided) but adds blockage and friction at the impeller eye, so designs settle at 15–30 blades, often with splitter blades that start part-way along the passage. With $\beta_{2b} = 0$ the two correlations nearly agree; increase the backsweep and Wiesner's slip factor rises slightly — but the work, $U_2 c_{\theta 2}$, falls, because the blades themselves now turn the flow backwards.
:::

Backswept blades are used in almost all modern centrifugal compressors despite their lower work per unit $U_2^2$: they reduce the absolute exit velocity (and so the diffuser's task), widen the stable flow range because the characteristic slopes downwards, and lower the impeller-exit Mach number. The price is a higher tip speed for the same pressure ratio, and impellers of titanium alloy running at $U_2 = 500$–$600\ \mathrm{m/s}$ are common.

::: example A radial-bladed centrifugal compressor {#ex-centrifugal}
An impeller of tip diameter $0.50\ \mathrm{m}$ runs at $20\,000\ \mathrm{rpm}$ with $19$ radial blades, power input factor $1.04$ and no inlet swirl. Inlet stagnation temperature is $288.15\ \mathrm{K}$ and the compressor's isentropic efficiency is $0.80$. Find the tip speed, the stagnation temperature rise and the pressure ratio, and the shaft power for $5.0\ \mathrm{kg/s}$.
::: solution
**Tip speed.** $U_2 = \pi D_2 N/60 = \pi \times 0.50 \times 20\,000/60 = 523.6\ \mathrm{m/s}$.

**Slip.** By [[#eq-stanitz]], $\sigma_s = 1 - 0.63\pi/19 = 0.896$.

**Temperature rise.** From [[#eq-centrifugal]],
$$
\Delta T_t = \frac{1.04 \times 0.896 \times 523.6^2}{1005} = 254.2\ \mathrm{K}.
$$

**Pressure ratio.**
$$
\pi_c = \left(1 + 0.80\times\frac{254.2}{288.15}\right)^{3.5} = 6.48.
$$

**Power.** $\dot W = \dot m c_p\Delta T_t = 5.0 \times 1005 \times 254.2 = 1.28\ \mathrm{MW}$.

**Sanity check.** A single stage at 6.5 is at the upper end of what is achieved and implies a supersonic absolute velocity leaving the impeller ($c_{\theta 2} = 0.896 \times 523.6 = 469\ \mathrm{m/s}$, while the exit static temperature is at most $542 - 469^2/2010 \approx 433\ \mathrm{K}$, where the speed of sound is $\sqrt{1.4 \times 287 \times 433} \approx 417\ \mathrm{m/s}$), which requires a carefully designed vaned diffuser. A radial-blade impeller at this tip speed is plausible for a small turboshaft; a backswept design would need a higher speed for the same ratio.
:::
:::

## Compressor maps, stall and surge

A compressor's performance is plotted on a **map**: pressure ratio against mass flow, with lines of constant rotational speed and contours of efficiency. To make one map serve all inlet conditions, the variables are made dimensionless — or, as the industry does, *corrected* to standard sea-level conditions.

::: definition Corrected mass flow and corrected speed {#def-corrected}
With $\theta = T_{t2}/T_{\mathrm{ref}}$ and $\delta = p_{t2}/p_{\mathrm{ref}}$, where $T_{\mathrm{ref}} = 288.15\ \mathrm{K}$ and $p_{\mathrm{ref}} = 101.325\ \mathrm{kPa}$ (ISA sea level), the **corrected mass flow** and **corrected speed** are
$$
\dot m_c = \frac{\dot m\sqrt{\theta}}{\delta}, \qquad N_c = \frac{N}{\sqrt{\theta}}.
$$
For a given machine and gas, $\pi_c$ and $\eta_c$ are functions of $\dot m_c$ and $N_c$ alone (neglecting Reynolds-number effects).
:::

The justification is dimensional analysis: the non-dimensional groups governing a compressor are $\dot m\sqrt{RT_t}/(D^2 p_t)$, $ND/\sqrt{RT_t}$, the pressure ratio and the efficiency, with $\gamma$ and the Reynolds number as further parameters. Fixing the machine (its diameter $D$) and the gas ($R$, $\gamma$) and ignoring Reynolds number, the two independent groups reduce to the corrected quantities. Corrected mass flow per unit area is directly related to the axial Mach number, and corrected speed to the blade Mach number — so equal corrected values mean equal velocity triangles.

On each speed line the pressure ratio rises as the flow is throttled, until the line ends at the **surge line**. To the right, the speed lines become vertical where the flow **chokes** — some blade row reaches sonic conditions at its throat and no more flow can pass. The engine runs along an **operating line** fixed by the turbine and nozzle (see [[propulsion/turbines]]), and the **surge margin** is the distance between operating line and surge line, commonly defined as
$$
\mathrm{SM} = \frac{\pi_{c,\text{surge}} - \pi_{c,\text{op}}}{\pi_{c,\text{op}}}
$$
at constant corrected mass flow (definitions vary between companies; always say which you use). Civil engines are designed with surge margins of roughly 15–25 % to cover transients, inlet distortion and deterioration.

Two kinds of instability lie beyond the surge line. **Rotating stall** is a local phenomenon: one or more cells of stalled, low-flow passages propagate around the annulus at a fraction (typically 30–70 %) of rotor speed, because the flow diverted around a stalled cell increases the incidence on the blades ahead of it and unloads those behind. The average flow is nearly steady but blade vibration can be destructive. **Surge** is a system instability: the compressor can no longer sustain the pressure in the downstream volume (combustor and ducts), the flow through the whole machine collapses or even reverses, the volume empties, and the cycle repeats at a few hertz with loud bangs and, in an engine, flames from the inlet. Its cause is the turnover of the characteristic described after [[#prop-reaction]]: once $\mathrm{d}\pi_c/\mathrm{d}\dot m$ becomes positive, a small flow reduction lowers the pressure rise and the reduction grows.

A high-pressure-ratio compressor is hard to run off its design speed for a simple reason. At design, the density rises by a factor of about 12 through a 40:1 compressor and the annulus area shrinks accordingly. At low speed, the pressure rise is much smaller, the density rise falls short, and the rear stages — sized for dense air — must pass a larger volume flow: they run at high $\phi$ and choke, while the front stages run at low $\phi$ and stall. Three cures are used, often together:

- **Variable stator vanes.** The inlet guide vanes and first few stator rows are rotated as speed falls, closing to add prewhirl and lower the front-stage incidence.
- **Bleed valves.** Air is dumped from the middle of the compressor at low speed, raising the front-stage flow coefficient and unloading the rear.
- **Multiple spools.** The compressor is split into low- and high-pressure sections on separate shafts, each driven by its own turbine, so that each can find its own speed. Three-spool engines carry the idea further.

::: example Corrected flow at cruise {#ex-corrected}
A compressor passes $100\ \mathrm{kg/s}$ at $10\,000\ \mathrm{rpm}$ in sea-level static ISA conditions. At cruise, at $11\ \mathrm{km}$ in ISA ($T = 216.65\ \mathrm{K}$, $p = 22.63\ \mathrm{kPa}$) and Mach 0.80, the engine runs at the same corrected speed and corrected flow (the same point on the map). Assuming an ideal inlet, what are the actual mass flow and the physical rotational speed?
::: solution
Ideal inlet: stagnation values equal free-stream stagnation values,
$$
T_{t2} = 216.65\,(1 + 0.2 \times 0.8^2) = 244.4\ \mathrm{K},
\qquad
p_{t2} = 22.63\,(1.128)^{3.5} = 34.50\ \mathrm{kPa}.
$$
Then $\theta = 244.4/288.15 = 0.848$ and $\delta = 34.50/101.325 = 0.340$. Same corrected flow:
$$
\dot m = \frac{\dot m_c\,\delta}{\sqrt{\theta}} = \frac{100 \times 0.3405}{\sqrt{0.848}} = 37.0\ \mathrm{kg/s},
\qquad
N = N_c\sqrt{\theta} = 10\,000\sqrt{0.848} = 9\,210\ \mathrm{rpm}.
$$
**Sanity check.** The engine swallows only about a third of its sea-level mass flow at cruise because the air is a third as dense, yet the compressor is aerodynamically doing exactly the same thing — same triangles, same pressure ratio — while spinning about 8 % slower in the cold air. That is why a cruise thrust is a small fraction of take-off thrust even at similar corrected settings.
:::
:::

::: quiz
A compressor stage is throttled so that its flow coefficient falls while the blade angles stay fixed. What happens, according to the ideal stage characteristic?
- [ ] The loading coefficient falls and the de Haller ratio rises.
- [x] The loading coefficient rises and the rotor de Haller ratio falls, moving the stage towards stall.
- [ ] Neither changes, because the blade angles are fixed.
- [ ] The degree of reaction must stay at one half.
::: solution
With fixed $\alpha_1$ and $\beta_2$, $\psi = 1 - \phi(\tan\alpha_1 + \tan\beta_2)$ rises as $\phi$ falls. The inlet relative angle $\beta_1$ grows (higher incidence), $w_1$ grows relative to $w_2$, and the ratio $w_2/w_1$ falls towards the de Haller limit — the stage approaches stall. Reaction also changes, since $\tan\beta_1$ changes.
:::
:::

::: history
Charles **Parsons**, who built the first practical reaction steam turbine in 1884, also built axial-flow compressors in the first years of the twentieth century by running turbine-style blading in reverse; with blades that were not designed as aerofoils, their efficiencies were poor and the centrifugal compressor dominated early gas-turbine work. In July 1926 A. A. **Griffith** of the Royal Aircraft Establishment wrote *An Aerodynamic Theory of Turbine Design* (RAE Report H1111), arguing that existing blades were in effect flying stalled and that compressor blades should be designed as aerofoils; RAE rig tests in the following years confirmed that axial stages could be made efficient. Frank **Whittle**'s first engine, which ran on 12 April 1937, used a single-stage double-sided centrifugal compressor, as did the W.1 that flew in the Gloster E.28/39 in May 1941. In the 1950s NACA's systematic cascade programme and the diffusion factor of Lieblein, Schwenk and Broderick (1953) gave designers the empirical loading limits used, in refined form, ever since.
:::

::: summary
- The **Euler equation** $\Delta h_t = U_2 c_{\theta 2} - U_1 c_{\theta 1}$ is an exact angular-momentum result: work equals the change in blade speed times swirl.
- **Velocity triangles** link absolute and relative frames through $\mathbf{c} = \mathbf{w} + \mathbf{U}$; in an axial stage $\Delta h_t = U c_x(\tan\beta_1 - \tan\beta_2)$.
- **Flow coefficient** $\phi$, **loading** $\psi$ and **reaction** $R = \tfrac{\phi}{2}(\tan\beta_1 + \tan\beta_2)$ define the stage shape; typical core values are $\phi \approx 0.5$, $\psi \approx 0.35$, $R \approx 0.5$–$0.7$.
- Compressor blade rows **diffuse** the flow; de Haller's ratio ($\ge 0.72$) and Lieblein's **diffusion factor** ($D \lesssim 0.45$–$0.6$) are empirical limits that set the work per stage and hence the number of stages.
- **Polytropic efficiency** measures blading quality; the overall isentropic efficiency falls below it as pressure ratio rises because of preheat.
- A **centrifugal** stage gets most of its work from $U_2^2$, reduced by **slip** (Stanitz, Wiesner correlations) and increased by disc friction.
- **Maps** in corrected flow and speed bound the operating range by **surge** and **choke**; variable stators, bleed and multiple spools keep high-pressure-ratio compressors stable at part speed.
:::

## Exercises

::: exercise {level=1 check="182.25"}
A centrifugal impeller has tip speed $U_2 = 450\ \mathrm{m/s}$ and the flow leaves it with swirl $c_{\theta 2} = 0.90\,U_2$; there is no inlet swirl. What is the specific work input? (Enter the work in kJ/kg.)
::: solution
With $c_{\theta 1} = 0$, [[#eq-euler]] gives $\Delta h_t = U_2 c_{\theta 2} = 450 \times 405 = 182\,250\ \mathrm{J/kg} = 182.25\ \mathrm{kJ/kg}$. The corresponding temperature rise is $182\,250/1005 = 181\ \mathrm{K}$.
:::
:::

::: exercise {level=1 check="0.864"}
A compressor has polytropic efficiency $0.90$ and pressure ratio $10$. What is its isentropic efficiency? (Enter the efficiency as a fraction, rounded to three significant figures.)
::: solution
$10^{0.2857} = 1.931$ and $10^{0.2857/0.9} = 10^{0.3175} = 2.077$. So $\eta_c = 0.931/1.077 = 0.864$. Compare $0.840$ at $\pi_c = 40$ in [[#ex-polytropic]].
:::
:::

::: exercise {level=1 check="75.5"}
An engine on a test bed at altitude conditions draws $40\ \mathrm{kg/s}$ with compressor-face stagnation conditions $T_{t2} = 250\ \mathrm{K}$, $p_{t2} = 50\ \mathrm{kPa}$. What is the corrected mass flow? (Enter it in kg/s, rounded to three significant figures.)
::: solution
$\theta = 250/288.15 = 0.8676$, $\delta = 50/101.325 = 0.4935$. $\dot m_c = 40\sqrt{0.8676}/0.4935 = 75.5\ \mathrm{kg/s}$. The corrected flow is larger than the actual flow because the air is less dense than the reference.
:::
:::

::: exercise {level=2 check="12"}
A compressor of pressure ratio $20$ and polytropic efficiency $0.90$ takes in air at $T_{t2} = 288\ \mathrm{K}$. Each stage can deliver at most a $40\ \mathrm{K}$ stagnation temperature rise. What is the minimum whole number of stages? (Enter the number of stages.)
::: solution
$T_{t3} = 288 \times 20^{0.3175} = 745.4\ \mathrm{K}$, so the total rise is $457.4\ \mathrm{K}$. Dividing by $40\ \mathrm{K}$ gives $11.4$, so at least $12$ stages. With a work-done factor below one, a real design would need one or two more.
:::
:::

::: exercise {level=2 check="0.678"}
A designer proposes a 50 % reaction stage with $\phi = 0.50$ and $\psi = 0.40$. Find the relative flow angles $\beta_1$ and $\beta_2$ and the rotor de Haller ratio. Is the stage acceptable? (Enter $w_2/w_1$, rounded to three significant figures.)
::: hint
Solve $R = \tfrac{\phi}{2}(\tan\beta_1 + \tan\beta_2)$ and $\psi = \phi(\tan\beta_1 - \tan\beta_2)$ simultaneously.
:::
::: solution
Adding and subtracting: $\tan\beta_1 = (R + \psi/2)/\phi = 0.70/0.50 = 1.40$ and $\tan\beta_2 = (R - \psi/2)/\phi = 0.30/0.50 = 0.60$. So $\beta_1 = 54.46^\circ$, $\beta_2 = 30.96^\circ$. With constant $c_x$, $w_2/w_1 = \cos\beta_1/\cos\beta_2 = 0.5812/0.8575 = 0.678$. This is below $0.72$: the rotor is over-diffused. Either reduce the loading, raise the flow coefficient, or (since de Haller ignores solidity) check the diffusion factor with a high solidity before rejecting it.
:::
:::

::: exercise {level=2 check="4.18"}
A backswept centrifugal impeller has $Z = 20$ blades swept back $\beta_{2b} = 30^\circ$, tip speed $U_2 = 500\ \mathrm{m/s}$, exit flow coefficient $\phi_2 = c_{r2}/U_2 = 0.30$ and no inlet swirl. Using Wiesner's correlation, find the exit swirl, the specific work and the pressure ratio for $T_{t1} = 288.15\ \mathrm{K}$ and $\eta_c = 0.82$ (take the power input factor as $1$). (Enter the pressure ratio, rounded to three significant figures.)
::: solution
$\sigma_s = 1 - \sqrt{\cos 30^\circ}/20^{0.7} = 1 - 0.9306/8.141 = 0.886$. Then $c_{\theta 2} = 500(0.886 - 0.30\tan 30^\circ) = 500(0.886 - 0.173) = 356.2\ \mathrm{m/s}$. Work $= U_2 c_{\theta 2} = 178.1\ \mathrm{kJ/kg}$, $\Delta T_t = 177.2\ \mathrm{K}$, and $\pi_c = (1 + 0.82 \times 177.2/288.15)^{3.5} = 4.18$. A radial-bladed impeller at the same speed would give roughly $\sigma_s U_2^2 = 0.90 \times 500^2 = 225\ \mathrm{kJ/kg}$: backsweep costs work but buys stability and a lower exit Mach number.
:::
:::

::: exercise {level=3}
Starting from [[#eq-polytropic]], show that for a compressor of small pressure ratio, $\pi_c = 1 + \varepsilon$ with $\varepsilon \ll 1$, the isentropic efficiency is
$$
\eta_c \approx \eta_p\left[1 - \frac{\gamma-1}{2\gamma}\left(\frac{1}{\eta_p} - 1\right)\varepsilon\right],
$$
and explain physically why the correction is negative.
::: solution
Let $k = (\gamma-1)/\gamma$ and $a = k\ln(1+\varepsilon) \approx k\varepsilon$. Expand $e^{x} - 1 = x(1 + x/2 + \dots)$. Then
$$
\eta_c = \frac{a(1 + a/2)}{(a/\eta_p)(1 + a/(2\eta_p))} = \eta_p\frac{1 + a/2}{1 + a/(2\eta_p)} \approx \eta_p\left[1 + \frac{a}{2}\left(1 - \frac{1}{\eta_p}\right)\right],
$$
and replacing $a$ by $k\varepsilon$ gives the result (the $O(\varepsilon^2)$ part of $\ln(1+\varepsilon)$ only affects higher orders). Since $\eta_p < 1$ the bracket is less than one. Physically, the losses in the first part of the compression raise the temperature of the gas entering the later part, and the work needed to compress through a given pressure ratio is proportional to the inlet temperature; the ideal process, which has no such preheat, is the reference for $\eta_c$, so the stack appears less efficient than each of its parts.
:::
:::

::: exercise {level=3}
**Design.** Sketch a preliminary mean-line design for a 10-stage repeating-stage compressor that must achieve $\pi_c = 8$ with $\eta_p = 0.91$ and $T_{t2} = 288\ \mathrm{K}$, with mean blade speed not more than $350\ \mathrm{m/s}$. Choose $\phi$, $\psi$ and $R$, find the blade and flow angles, and check each row against de Haller's criterion and a diffusion factor limit of $0.45$ at solidity $1.3$. State what you would change if the checks fail.
::: solution
**Required work.** $T_{t3}/T_{t2} = 8^{0.2857/0.91} = 8^{0.3140} = 1.921$, so $\Delta T_t = 265\ \mathrm{K}$ in total, $26.5\ \mathrm{K}$ per stage, or $26.7\ \mathrm{kJ/kg}$ per stage. Allowing a mean work-done factor of $0.90$, design each stage for $\Delta h_t = 29.6\ \mathrm{kJ/kg}$.

**Loading.** With $U = 350\ \mathrm{m/s}$, $\psi = 29\,600/350^2 = 0.242$ — light, which leaves room. Choose $\phi = 0.50$ ($c_x = 175\ \mathrm{m/s}$) and $R = 0.5$. Then $\tan\beta_1 = (R + \psi/2)/\phi = 1.242$, $\tan\beta_2 = (R - \psi/2)/\phi = 0.758$, giving $\beta_1 = \alpha_2 = 51.2^\circ$, $\beta_2 = \alpha_1 = 37.2^\circ$.

**Checks.** $w_2/w_1 = \cos 51.2^\circ/\cos 37.2^\circ = 0.627/0.797 = 0.787 > 0.72$ (by symmetry the stator ratio is the same). Diffusion factor: $w_1 = 175/0.627 = 279\ \mathrm{m/s}$, $\Delta w_\theta = 175 \times 0.483 = 84.6\ \mathrm{m/s}$, $D = 1 - 0.787 + 84.6/(2 \times 1.3 \times 279) = 0.213 + 0.117 = 0.33$, well within the limit.

**Judgement.** The stage is lightly loaded; one could reduce blade speed (lower stresses), use fewer stages with higher loading, or keep the margin for the hub sections, where blade speed is lower and the local $\psi$ higher. The front stage would also need a check of the relative tip Mach number, $w_{1,\text{tip}}$, which at the larger tip radius may approach or exceed 1. If the checks failed, the levers are, in order: increase solidity (reduces $D$, not de Haller), increase $\phi$ (reduces turning for a given work), add a stage, or raise $U$ if stresses allow. Answers will differ with the choices made; what matters is that each choice is checked against both criteria.
:::
:::
