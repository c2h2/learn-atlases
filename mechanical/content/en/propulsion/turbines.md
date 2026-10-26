The turbine is the part of a gas turbine that pays for everything else. It extracts work from the hot, high-pressure gas leaving the combustor and returns it through a shaft to the compressor; in a turbofan or turboprop it also drives the fan or propeller that produces most of the thrust. It does this in the harshest environment of any engineered machine in common use: the first row of rotor blades sits in gas hotter than the melting point of the nickel alloy it is made of, spinning so fast that each blade pulls on its root with a force of the order of ten tonnes.

Aerodynamically the turbine is the easy half of the turbomachine. Its blade rows *accelerate* the flow, the pressure falls along the blade surfaces, and boundary layers stay attached even when each row turns the flow through 100° or more. A turbine stage can therefore extract several times the work of a compressor stage, and a handful of turbine stages drives a compressor of ten or more. The difficulty lies elsewhere — in cooling, in stresses and in **matching**: the turbine must provide exactly the power the compressor absorbs at every operating point, while its first nozzle row, usually choked, fixes the flow capacity of the whole engine.

This chapter applies the Euler equation of [[propulsion/compressors]] to an expanding stage, introduces the loading and reaction parameters that classify turbine stages, derives the polytropic efficiency relation for expansion, and then treats the three topics that make turbines distinctive: the choked nozzle guide vane and the flow function, blade cooling, and the centrifugal stress that limits blade speed and annulus area. Stagnation quantities carry the subscript $t$; station 4 is the turbine inlet (high-pressure nozzle guide vane entry), 45 the exit of the high-pressure turbine, 5 the exit of the last turbine. Combustion gas is treated as a perfect gas with $c_p = 1150\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $\gamma = 1.33$ and $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$; air as $c_p = 1005\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $\gamma = 1.4$.

## The physical picture: an expanding stage

A turbine stage has the order reversed relative to a compressor: first a stationary row of **nozzle guide vanes** (NGVs, or the stator), then a **rotor**. The NGVs accelerate the gas and turn it strongly in the direction of rotation, converting pressure into a high-speed swirling jet. The rotor blades receive this jet, turn it back the other way, and the reaction of the gas on the blades drives them round. If the rotor passages also accelerate the relative flow — a **reaction** stage — part of the pressure drop occurs in the rotor; if the relative speed is unchanged — an **impulse** stage — all of it occurs in the NGVs.

The favourable pressure gradient explains the high work per stage, but it does not make the turbine loss-free. The large turning produces strong **secondary flows** — passage vortices driven by the cross-passage pressure gradient acting on the slow end-wall boundary layer — and the gap between rotor tip and casing allows **tip leakage**, gas that passes over the blade without doing work. With trailing-edge and profile losses and the mixing of cooling air, these set turbine stage efficiencies of about 88–93 %.

## Velocity triangles and work

We use the same frames as in [[propulsion/compressors#def-velocity-triangles]], but with a sign convention suited to turbines: **all** angles, absolute $\alpha$ and relative $\beta$, are measured from the axial direction and are positive in the direction of rotation, so that
$$
c_\theta = c_x\tan\alpha, \qquad w_\theta = c_\theta - U = c_x\tan\beta.
$$
Station 1 is NGV inlet, 2 NGV exit (rotor inlet), 3 rotor exit. In a typical stage $\alpha_2$ is large and positive (the NGV jet), $\beta_3$ large and negative (the rotor turns the relative flow back against the rotation) and $\alpha_3$ is near zero.

::: proposition Work of an axial turbine stage {#prop-turbine-work}
For an axial turbine stage at constant mean radius and constant axial velocity $c_x$, the specific work delivered to the rotor is
$$
w_t = h_{t1} - h_{t3} = U(c_{\theta 2} - c_{\theta 3}) = U c_x(\tan\alpha_2 - \tan\alpha_3) = U c_x(\tan\beta_2 - \tan\beta_3).
$$ {#eq-turbine-work}
In terms of the flow coefficient $\phi = c_x/U$ and the stage loading $\psi = w_t/U^2$, the degree of reaction (rotor share of the static enthalpy drop) of a stage with $c_3 = c_1$ is
$$
\psi = \phi(\tan\beta_2 - \tan\beta_3), \qquad R = \frac{h_2 - h_3}{h_1 - h_3} = -\frac{\phi}{2}(\tan\beta_2 + \tan\beta_3),
$$ {#eq-turbine-reaction}
and if the stage has zero exit swirl ($\alpha_3 = 0$),
$$
\psi = 2(1 - R).
$$ {#eq-zero-swirl}
:::

::: proof
The Euler equation [[propulsion/compressors#eq-euler]] gives the work done *on* the gas as $h_{t3} - h_{t1} = U(c_{\theta 3} - c_{\theta 2})$, since the stator (1→2) does no work and the rotor (2→3) is at constant radius. The work delivered by the gas is the negative of this, which is the first form of [[#eq-turbine-work]]. Substituting $c_\theta = c_x\tan\alpha$ gives the second form; substituting $c_\theta = U + c_x\tan\beta$ gives the third, since the $U$ terms cancel.

For the reaction, the relative stagnation enthalpy $h + w^2/2$ is conserved through the rotor at constant radius (no work is done in the rotating frame), so $h_2 - h_3 = \tfrac{1}{2}(w_3^2 - w_2^2) = \tfrac{1}{2}c_x^2(\tan^2\beta_3 - \tan^2\beta_2)$. With $c_3 = c_1$ the static drop across the stage equals the stagnation drop, $h_1 - h_3 = w_t = U c_x(\tan\beta_2 - \tan\beta_3)$. Dividing and factoring,
$$
R = \frac{c_x^2(\tan\beta_3 - \tan\beta_2)(\tan\beta_3 + \tan\beta_2)}{2U c_x(\tan\beta_2 - \tan\beta_3)} = -\frac{\phi}{2}(\tan\beta_2 + \tan\beta_3).
$$
With zero exit swirl, $c_{\theta 3} = 0$, so $w_{\theta 3} = -U$ and $\tan\beta_3 = -1/\phi$. Then $R = \tfrac12 - \tfrac{\phi}{2}\tan\beta_2$, i.e. $\phi\tan\beta_2 = 1 - 2R$, and $\psi = \phi\tan\beta_2 + 1 = 2 - 2R$. Assumptions: steady adiabatic flow, constant radius and axial velocity, uniform conditions at each station (a mean-line model), and a repeating stage for the reaction formula.
:::

Equation [[#eq-zero-swirl]] is the turbine designer's basic trade. A **50 % reaction** stage with zero exit swirl has $\psi = 1$: modest work, symmetric triangles, and acceleration in both rows, which keeps losses low. An **impulse** stage ($R = 0$) has $\psi = 2$: twice the work at the same blade speed, but the rotor no longer accelerates the relative flow, so its boundary layers are less well behaved, and the NGV exit velocity is very high. Modern high-pressure turbines sit in between, typically at $\psi \approx 1.5$–$2$ with reaction around $0.25$–$0.45$ at mean radius, and low-pressure turbines, where blade speed is limited by the slowly turning fan shaft, run at loadings of $2$–$3$. Exit swirl, when not zero, is usually chosen slightly *against* rotation, which adds to the work at the expense of the next row.

::: widget plot
f: atan(psi/x)*180/pi; atan((psi - 1)/x)*180/pi; -atan(1/x)*180/pi
x: 0.3, 1.2
y: -80, 90
sliders: psi=1.5:0.8:3:0.05
labels: \alpha_2\ \text{(NGV exit)}; \beta_2\ \text{(rotor inlet, relative)}; \beta_3\ \text{(rotor exit, relative)}
hlines: 0
caption: Flow angles of a turbine stage with zero exit swirl, against flow coefficient $\phi$ (horizontal axis), for the stage loading set by the slider. The rotor turning is $\beta_2 - \beta_3$. At $\psi = 1$ (50 % reaction) the rotor inlet angle is zero and the triangles are symmetric with $\alpha_2 = -\beta_3$; raising $\psi$ increases every angle and the turning, and at low $\phi$ the NGV exit angle approaches $75$–$80^\circ$, where trailing-edge losses and sensitivity to throat area grow. Notice why designers like a moderate $\phi$: the angles change most steeply at small $\phi$.
:::

How efficient is a stage of given $\phi$ and $\psi$? The classic summary is the **Smith chart** (S. F. Smith, *Journal of the Royal Aeronautical Society*, 1965), a correlation of the measured total-to-total efficiency of some 70 Rolls-Royce turbines with zero exit swirl, plotted as contours on axes of $\phi$ and $\psi$. It shows the highest efficiencies (around 93–94 % after correcting for tip leakage) at low loading and moderate flow coefficient, $\psi \approx 1$ and $\phi \approx 0.5$–$0.6$, with efficiency falling slowly as either rises. Like the diffusion factor for compressors, it is an empirical map from a particular family of designs, and modern three-dimensional blading has shifted the contours upwards; it remains the standard starting point for choosing $\phi$ and $\psi$.

::: example A high-pressure turbine stage {#ex-hp-stage}
A high-pressure turbine stage has mean blade speed $U = 380\ \mathrm{m/s}$, axial velocity $c_x = 228\ \mathrm{m/s}$, loading $\psi = 1.5$ and zero exit swirl. The inlet stagnation temperature is $T_{t4} = 1600\ \mathrm{K}$. Find the reaction, the flow angles, the stagnation temperature drop and the Mach number leaving the NGVs.
::: solution
**Coefficients.** $\phi = 228/380 = 0.600$; by [[#eq-zero-swirl]], $R = 1 - \psi/2 = 0.25$.

**Angles.** With $c_{\theta 3} = 0$ the work is $U c_{\theta 2}$, so $\tan\alpha_2 = \psi/\phi = 2.5$, $\alpha_2 = 68.2^\circ$. Rotor inlet: $\tan\beta_2 = \tan\alpha_2 - 1/\phi = 2.5 - 1.667 = 0.833$, $\beta_2 = 39.8^\circ$. Rotor exit: $\tan\beta_3 = -1/\phi$, $\beta_3 = -59.0^\circ$. The rotor turns the relative flow through $98.8^\circ$.

**Work.** $w_t = \psi U^2 = 1.5 \times 380^2 = 216.6\ \mathrm{kJ/kg}$, so $\Delta T_t = 216\,600/1150 = 188.3\ \mathrm{K}$.

**NGV exit Mach number.** $c_2 = c_x/\cos\alpha_2 = 228/0.3714 = 613.9\ \mathrm{m/s}$. The stagnation temperature is unchanged through the stationary NGVs, so $T_2 = 1600 - 613.9^2/(2 \times 1150) = 1436\ \mathrm{K}$, and
$$
M_2 = \frac{613.9}{\sqrt{1.33 \times 287 \times 1436}} = 0.83.
$$
**Sanity check.** The reaction formula from the angles gives $R = -\tfrac{0.6}{2}(0.833 - 1.667) = 0.25$, agreeing with [[#eq-zero-swirl]]. One stage extracting $188\ \mathrm{K}$ is typical: two such stages drop the gas by about $380\ \mathrm{K}$, close to what a 20:1 compressor needs (next example). The relative velocity *rises* from $w_2 = 297\ \mathrm{m/s}$ to $w_3 = 443\ \mathrm{m/s}$ — the rotor accelerates the flow, as a reaction stage should.
:::
:::

## Efficiency of expansion

The preheat effect of [[propulsion/compressors#prop-polytropic]] has a mirror image in turbines. The losses of an early turbine stage leave the gas hotter than isentropic expansion would, and the later stages can recover part of that energy as extra work — the **reheat** effect.

::: proposition Isentropic efficiency of an expansion {#prop-turbine-polytropic}
For a perfect gas with constant $c_p$ expanding through a total pressure ratio $\pi_t = p_{t4}/p_{t5} > 1$ with constant polytropic efficiency $\eta_{p}$ (defined for expansion as $\mathrm{d}h_t/\mathrm{d}h_{ts}$),
$$
\frac{T_{t5}}{T_{t4}} = \pi_t^{-\eta_p(\gamma-1)/\gamma},
\qquad
\eta_t = \frac{T_{t4} - T_{t5}}{T_{t4} - T_{t5s}} = \frac{1 - \pi_t^{-\eta_p(\gamma-1)/\gamma}}{1 - \pi_t^{-(\gamma-1)/\gamma}},
$$ {#eq-turbine-polytropic}
and $\eta_t > \eta_p$ for $\pi_t > 1$, $\eta_p < 1$.
:::

::: proof
In an infinitesimal expansion step the isentropic enthalpy change is $\mathrm{d}h_{ts} = v_t\,\mathrm{d}p_t = (R T_t/p_t)\,\mathrm{d}p_t$ (negative for an expansion) and the actual change is a fraction $\eta_p$ of it: $c_p\,\mathrm{d}T_t = \eta_p R T_t\,\mathrm{d}p_t/p_t$. Dividing by $c_p T_t$ and using $R/c_p = (\gamma-1)/\gamma$,
$$
\frac{\mathrm{d}T_t}{T_t} = \eta_p\frac{\gamma-1}{\gamma}\frac{\mathrm{d}p_t}{p_t},
$$
which integrates to $T_{t5}/T_{t4} = (p_{t5}/p_{t4})^{\eta_p(\gamma-1)/\gamma} = \pi_t^{-\eta_p(\gamma-1)/\gamma}$. The isentropic exit temperature is $T_{t4}\pi_t^{-(\gamma-1)/\gamma}$; substituting both into the definition gives [[#eq-turbine-polytropic]]. With $b = \tfrac{\gamma-1}{\gamma}\ln\pi_t > 0$, $\eta_t = (1 - e^{-\eta_p b})/(1 - e^{-b})$. The function $g(x) = (1 - e^{-x})/x$ is decreasing for $x > 0$, and $\eta_p b < b$, so $g(\eta_p b) > g(b)$, i.e. $(1 - e^{-\eta_p b})/(\eta_p b) > (1 - e^{-b})/b$, which rearranges to $\eta_t > \eta_p$.
:::

::: widget plot
f: (1 - x^(-ep*0.33/1.33))/(1 - x^(-0.33/1.33)); (x^(0.4/1.4) - 1)/(x^(0.4/(1.4*ep)) - 1); ep + 0*x
x: 1.01, 20
y: 0.8, 1
sliders: ep=0.9:0.8:0.95:0.005
labels: \eta_t\ \text{(turbine)}; \eta_c\ \text{(compressor)}; \eta_p
caption: Isentropic efficiency against pressure ratio for a turbine (gas, $\gamma = 1.33$) and a compressor (air, $\gamma = 1.4$) with the same polytropic efficiency. The turbine curve rises above $\eta_p$ (reheat), the compressor curve falls below it (preheat). For a fair comparison of two turbines of different pressure ratio, compare their polytropic efficiencies.
:::

## Matching the turbine to the compressor

On a single shaft running at steady speed, the turbine power must equal the compressor power plus the small mechanical losses and accessory loads. Writing the turbine mass flow as $\dot m(1 + f)$, with $f$ the fuel–air ratio (cooling air that bypasses the first stage is neglected in this simple model), and the mechanical efficiency as $\eta_m$:
$$
\eta_m\,\dot m(1 + f)\,c_{p,g}(T_{t4} - T_{t45}) = \dot m\,c_{p,a}(T_{t3} - T_{t2}).
$$ {#eq-work-balance}
The **work balance** fixes the turbine temperature drop once the compressor is chosen; the turbine's efficiency then fixes its pressure ratio, and what pressure remains is available to the next turbine or the nozzle.

::: example Work balance on a core spool {#ex-work-balance}
A core compressor of pressure ratio $20$ and polytropic efficiency $0.90$ takes in air at $T_{t2} = 288\ \mathrm{K}$. The turbine that drives it receives gas at $T_{t4} = 1600\ \mathrm{K}$ with $f = 0.025$; $\eta_m = 0.99$ and the turbine polytropic efficiency is $0.90$. Find the turbine exit temperature, its pressure ratio and its isentropic efficiency.
::: solution
**Compressor.** $T_{t3} - T_{t2} = 288(20^{0.2857/0.90} - 1) = 457.4\ \mathrm{K}$.

**Turbine temperature drop.** From [[#eq-work-balance]],
$$
T_{t4} - T_{t45} = \frac{1005 \times 457.4}{0.99 \times 1.025 \times 1150} = 394.0\ \mathrm{K},
\qquad T_{t45} = 1206\ \mathrm{K}.
$$
**Pressure ratio.** Inverting [[#eq-turbine-polytropic]] with $(\gamma-1)/\gamma = 0.2481$:
$$
\pi_t = \left(\frac{1600}{1206}\right)^{1/(0.90 \times 0.2481)} = 3.55,
\qquad
\eta_t = \frac{1 - 3.55^{-0.2233}}{1 - 3.55^{-0.2481}} = 0.914.
$$
**Sanity check.** The turbine drops the temperature by less than the compressor raises it ($394$ against $457\ \mathrm{K}$) because the gas has a higher $c_p$ and there is slightly more of it. It needs a pressure ratio of only $3.5$ to drive a $20:1$ compressor, because it works at a temperature five times higher — the same reason the Brayton cycle produces net work at all. Two stages like that of [[#ex-hp-stage]] would deliver this drop.
:::
:::

## The choked nozzle guide vanes

In most engines at most power settings, the throat between the first-stage NGVs runs choked: the gas reaches Mach 1 there. This makes the NGV throat area the single most important number in the engine's performance, because a choked throat passes a mass flow fixed by the upstream stagnation conditions alone.

::: definition Flow function {#def-flow-function}
The **flow function** (mass-flow parameter) at a section of area $A$ where the Mach number is $M$ and the stagnation conditions are $p_t$, $T_t$ is
$$
\frac{\dot m\sqrt{T_t}}{A\,p_t} = \sqrt{\frac{\gamma}{R}}\;M\left(1 + \frac{\gamma-1}{2}M^2\right)^{-\frac{\gamma+1}{2(\gamma-1)}}.
$$ {#eq-flow-function}
:::

::: proposition Choked mass flow {#prop-choked}
For steady isentropic flow of a perfect gas, the flow function [[#eq-flow-function]] has its maximum at $M = 1$. A choked throat of area $A^*$ therefore passes
$$
\dot m = \frac{A^* p_t}{\sqrt{T_t}}\sqrt{\frac{\gamma}{R}}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}},
$$
independent of the downstream pressure. For $\gamma = 1.33$, $R = 287\ \mathrm{J\,kg^{-1}\,K^{-1}}$ the constant is $0.0397\ \mathrm{kg\,K^{1/2}\,s^{-1}\,N^{-1}}$ (for air, $\gamma = 1.4$: $0.0404$).
:::

::: proof
Write $\dot m = \rho A c$ with $c = M\sqrt{\gamma R T}$ and $\rho = p/(RT)$, so $\dot m = A p M\sqrt{\gamma/(R T)}$. The isentropic stagnation relations $T_t/T = 1 + \tfrac{\gamma-1}{2}M^2 \equiv X$ and $p_t/p = X^{\gamma/(\gamma-1)}$ give
$$
\frac{\dot m\sqrt{T_t}}{A p_t} = \sqrt{\frac{\gamma}{R}}\,M\,X^{1/2}X^{-\gamma/(\gamma-1)} = \sqrt{\frac{\gamma}{R}}\,M\,X^{-\frac{\gamma+1}{2(\gamma-1)}},
$$
which is [[#eq-flow-function]]. Differentiate $\ln$ of the right-hand side with respect to $M$:
$$
\frac{1}{M} - \frac{\gamma+1}{2(\gamma-1)}\cdot\frac{(\gamma-1)M}{X} = \frac{1}{M} - \frac{(\gamma+1)M}{2X} = \frac{2X - (\gamma+1)M^2}{2MX} = \frac{2(1 - M^2)}{2MX},
$$
which is zero only at $M = 1$, positive below and negative above: a maximum. At $M = 1$, $X = (\gamma+1)/2$, giving the stated formula. Once the throat is sonic, pressure disturbances from downstream cannot travel upstream through it, so lowering the downstream pressure further cannot increase the flow. The numerical constants follow by substitution. Assumptions: isentropic flow from the stagnation state to the throat, perfect gas with constant $\gamma$, uniform flow across the throat (real throats use a discharge coefficient of about $0.95$–$0.98$).
:::

::: widget plot
f: sqrt(g/287)*x*(1 + (g - 1)/2*x^2)^(-(g + 1)/(2*(g - 1)))
x: 0, 2.5
y: 0, 0.045
sliders: g=1.33:1.1:1.67:0.01
vlines: 1
caption: The flow function $\dot m\sqrt{T_t}/(A p_t)$ against Mach number for the $\gamma$ on the slider. The peak at $M = 1$ is the choking limit: no section of a duct can pass more than this flow per unit area for given stagnation conditions. The peak value barely changes with $\gamma$ — the reason a single number, measured or calculated for the NGVs, can be carried through all engine operating conditions.
:::

The consequence for engine matching is profound. With the NGVs choked, the corrected flow at turbine entry, $\dot m\sqrt{T_{t4}}/p_{t4}$, is fixed. Working back through the combustor (with its small, nearly constant fractional pressure loss) and dividing by the compressor inlet conditions gives
$$
\frac{\dot m\sqrt{T_{t2}}}{p_{t2}} \propto \frac{\pi_c}{\sqrt{T_{t4}/T_{t2}}},
$$
so on the compressor map the turbine imposes a relation between corrected flow and pressure ratio that depends on the temperature ratio $T_{t4}/T_{t2}$ — the **operating line** of [[propulsion/compressors]]. Raising turbine entry temperature at a given corrected flow pushes the operating point to higher pressure ratio, towards surge. It also explains why an engine's NGV area is used to "trim" a new design: a few per cent change in throat area moves the whole operating line.

::: example Sizing the NGV throat {#ex-ngv}
A core engine passes $50\ \mathrm{kg/s}$ of gas into its high-pressure turbine at $T_{t4} = 1600\ \mathrm{K}$ and $p_{t4} = 3.0\ \mathrm{MPa}$. What total NGV throat area is needed if the throat is choked? (Ignore the discharge coefficient.)
::: solution
From [[#prop-choked]] with $\gamma = 1.33$,
$$
A^* = \frac{\dot m\sqrt{T_{t4}}}{0.0397\,p_{t4}} = \frac{50 \times 40.0}{0.0397 \times 3.0\times10^{6}} = 0.0168\ \mathrm{m^2} = 168\ \mathrm{cm^2}.
$$
**Sanity check.** With, say, 40 vanes, each throat is about $4.2\ \mathrm{cm^2}$ — for example $10\ \mathrm{mm}$ wide by $42\ \mathrm{mm}$ high, a plausible size for a high-pressure turbine of a mid-size engine. The area is small because the gas is dense: at $3\ \mathrm{MPa}$, $1600\ \mathrm{K}$ the stagnation density is about $6.5\ \mathrm{kg/m^3}$. A $1\ \%$ error in this area is a $1\ \%$ error in engine flow at given $p_{t4}$, $T_{t4}$.
:::
:::

## Blade cooling and materials

Higher turbine entry temperature buys specific thrust and, with a matching pressure ratio, thermal efficiency (see [[propulsion/gas-turbine-cycles]]). As of 2026 the turbine entry temperatures of the most advanced large civil turbofans at take-off are of the order of $1900$–$2000\ \mathrm{K}$, while the single-crystal nickel superalloys used for high-pressure blades are limited to metal temperatures of roughly $1300$–$1400\ \mathrm{K}$ for the required creep life — a gap of several hundred kelvin that is bridged by cooling and by ceramic **thermal-barrier coatings** a few tenths of a millimetre thick.

Cooling air is bled from the compressor exit — typically at $800$–$950\ \mathrm{K}$ — and fed through the blade root into internal passages. Heat is removed by **convection** in ribbed serpentine channels, by **impingement** of jets on the inside of the leading edge, and by **film cooling**: air ejected through rows of small holes forms a cool layer on the outer surface that insulates the blade from the hot gas.

::: definition Cooling effectiveness {#def-cooling-effectiveness}
The overall **cooling effectiveness** of a blade is
$$
\varepsilon = \frac{T_g - T_m}{T_g - T_c},
$$
where $T_g$ is the relative stagnation temperature of the hot gas, $T_m$ the mean blade metal temperature and $T_c$ the coolant supply temperature. $\varepsilon = 0$ is an uncooled blade at gas temperature, $\varepsilon = 1$ a blade held at coolant temperature.
:::

Modern high-pressure blades achieve $\varepsilon \approx 0.6$–$0.7$. The coolant is not free: compressed air that bypasses the first rotor, and film air mixed into the main stream, reduce both turbine work and efficiency, and a high-pressure turbine may use of the order of a fifth of the core flow for cooling. Each further step in turbine entry temperature is therefore a negotiation between materials, coatings, cooling-hole design and cycle benefit.

::: example Required cooling effectiveness {#ex-cooling}
The relative stagnation temperature of the gas at a first-stage rotor is $1900\ \mathrm{K}$ and the coolant arrives at $900\ \mathrm{K}$. (a) What mean metal temperature results from a cooling effectiveness of $0.60$? (b) What effectiveness is needed for a metal temperature of $1250\ \mathrm{K}$?
::: solution
(a) $T_m = T_g - \varepsilon(T_g - T_c) = 1900 - 0.60 \times 1000 = 1300\ \mathrm{K}$.

(b) $\varepsilon = (1900 - 1250)/(1900 - 900) = 0.65$.

**Sanity check.** Fifty kelvin of metal temperature costs five points of effectiveness here. Creep life of nickel alloys roughly halves for each $10$–$15\ \mathrm{K}$ rise in metal temperature in this range, so the difference between (a) and (b) is a large factor in blade life — which is why engines are derated for take-off on hot days and why even a small loss of cooling effectiveness (blocked holes, coating loss) matters.
:::
:::

::: warning Using the absolute gas temperature for a rotor blade
A rotor blade sees the gas in its own frame, so the temperature that drives heat transfer into it is the **relative** stagnation temperature, $T_{t,\mathrm{rel}} = T + w^2/(2c_p)$, not the absolute $T_t = T + c^2/(2c_p)$. Behind the NGVs the absolute velocity is much larger than the relative one ($614$ against $297\ \mathrm{m/s}$ in [[#ex-hp-stage]]), so the rotor sees a gas about $125\ \mathrm{K}$ cooler than the NGV exit stagnation temperature. Conversely, the NGVs see the full combustor exit temperature *and* its hot spots — the circumferential non-uniformity from discrete fuel injectors — and are the hottest components in the engine. Mixing the two frames gives cooling designs that are wrong by a hundred kelvin.
:::

## Centrifugal stress and the AN² limit

A rotor blade is pulled outwards by its own rotation. At a given radius the blade's cross-section carries the centrifugal load of all the material outboard of it, and the stress is greatest at the root.

::: proposition Root stress of a rotating blade {#prop-an2}
A blade of uniform cross-section and density $\rho$ extending from hub radius $r_h$ to tip radius $r_t$ on a disc rotating at angular speed $\omega$ has root tensile stress
$$
\sigma_{\text{root}} = \rho\,\omega^2\,\frac{r_t^2 - r_h^2}{2} = \frac{\rho\,\omega^2 A}{2\pi},
\qquad A = \pi(r_t^2 - r_h^2),
$$ {#eq-an2}
where $A$ is the annulus area swept by the blades. A blade tapered so that its tip area is smaller than its root area has a lower root stress, by a taper factor of typically $0.5$–$0.7$.
:::

::: proof
Consider the blade element between radii $r$ and $r + \mathrm{d}r$, of mass $\rho a\,\mathrm{d}r$ for cross-sectional area $a$. Its centripetal acceleration is $\omega^2 r$, which the blade material inboard of it must supply: the element contributes $\rho a\omega^2 r\,\mathrm{d}r$ to the tension at the root. Summing from root to tip,
$$
F_{\text{root}} = \int_{r_h}^{r_t}\rho a\,\omega^2 r\,\mathrm{d}r = \rho a\omega^2\,\frac{r_t^2 - r_h^2}{2}
$$
for constant $a$, and dividing by $a$ gives the stress. Since $A = \pi(r_t^2 - r_h^2)$, $\sigma = \rho\omega^2 A/(2\pi)$. If $a$ decreases outwards, the outboard material is lighter and the integral smaller. Bending stresses from gas loads and the stress concentration at the root fixing are additional; this is the direct centrifugal component only.
:::

Because $\omega \propto N$, the root stress is proportional to $A N^2$ — the **AN² parameter**, quoted in $\mathrm{m^2\,rpm^2}$ or $\mathrm{in^2\,rpm^2}$. It is the first number a turbine designer checks. It couples aerodynamics and structures: the exit annulus area is set by the mass flow and the axial Mach number desired at turbine exit, and the speed by the blade speed needed for the work. A turbine that must pass a large volume flow (a large $A$) must turn slowly — the low-pressure turbine of a direct-drive turbofan is limited to fan speed and so needs many stages, which is the motivation for the geared turbofan.

::: example Root stress in a high-pressure blade {#ex-an2}
A high-pressure turbine rotor runs at $12\,000\ \mathrm{rpm}$ with hub radius $0.30\ \mathrm{m}$ and tip radius $0.38\ \mathrm{m}$. The nickel alloy has density $8000\ \mathrm{kg/m^3}$. Estimate the root stress for an untapered blade and for a taper factor of $0.6$.
::: solution
$\omega = 12\,000 \times 2\pi/60 = 1257\ \mathrm{rad/s}$ and $A = \pi(0.38^2 - 0.30^2) = 0.1709\ \mathrm{m^2}$. Then
$$
\sigma_{\text{root}} = \frac{8000 \times 1257^2 \times 0.1709}{2\pi} = 344\ \mathrm{MPa},
$$
and with taper $0.6 \times 344 = 206\ \mathrm{MPa}$. The AN² value is $0.1709 \times 12\,000^2 = 2.46\times10^{7}\ \mathrm{m^2\,rpm^2}$.

**Sanity check.** The tip speed is $1257 \times 0.38 = 478\ \mathrm{m/s}$, typical of a high-pressure turbine. A root stress of $200$–$350\ \mathrm{MPa}$, sustained for thousands of hours at a metal temperature near $1300\ \mathrm{K}$, is exactly the creep regime for which single-crystal alloys are developed; the disc rim that holds the blades carries an even larger load.
:::
:::

::: quiz
The NGVs of a turbine are choked. The engine control raises the turbine entry temperature by 10 % while the turbine entry stagnation pressure stays the same. What happens to the mass flow through the NGVs?
- [ ] It rises by about 10 %, because more energy is added.
- [ ] It is unchanged, because the throat is choked.
- [x] It falls by about 5 %, because the choked flow is proportional to $p_t/\sqrt{T_t}$.
- [ ] It falls by about 10 %.
::: solution
Choked flow is $\dot m \propto A^* p_t/\sqrt{T_t}$. At constant $p_t$, $\dot m \propto T_t^{-1/2}$, so $1.10^{-1/2} = 0.953$: a fall of about 4.7 %. "Choked" means the flow is fixed for given *upstream* stagnation conditions, not fixed absolutely. In an engine, $p_{t4}$ would in fact change too, which is how the operating point moves along the operating line.
:::
:::

::: history
The two classic turbine types are named after their pioneers. Charles **Parsons** patented the multistage reaction steam turbine in 1884, sharing the pressure drop between fixed and moving blade rows, and demonstrated it dramatically in the turbine-driven vessel *Turbinia* in 1897. Gustaf **de Laval** developed the single-stage impulse steam turbine in the 1880s, with the whole expansion in nozzles — for which he introduced the convergent–divergent nozzle — and a wheel turning at very high speed. Aurel **Stodola**'s *Die Dampfturbinen* (1903, later expanded to cover gas turbines) gave turbine design its first systematic engineering treatment. The first aircraft gas turbines of the late 1930s used uncooled turbines, which restricted their entry temperatures to roughly $1000$–$1100\ \mathrm{K}$; S. F. Smith's 1965 efficiency correlation, still known as the Smith chart, summarised the aerodynamic experience of the following decades.
:::

::: summary
- A turbine stage is **NGV then rotor**; the NGVs make a fast swirling jet and the rotor turns it back. Accelerating flow allows high loading: several compressor stages per turbine stage.
- Work: $w_t = U(c_{\theta 2} - c_{\theta 3}) = U c_x(\tan\beta_2 - \tan\beta_3)$; with zero exit swirl, $\psi = 2(1 - R)$ — 50 % reaction gives $\psi = 1$, impulse gives $\psi = 2$.
- The **Smith chart** correlates stage efficiency with $\phi$ and $\psi$; high-pressure turbines run at $\psi \approx 1.5$–$2$, low-pressure turbines higher.
- In expansion the isentropic efficiency **exceeds** the polytropic efficiency (reheat), the mirror of the compressor's preheat penalty.
- The **work balance** $\eta_m\dot m(1+f)c_{p,g}\Delta T_{t,\text{turb}} = \dot m c_{p,a}\Delta T_{t,\text{comp}}$ sets the turbine temperature drop.
- **Choked NGVs** fix the corrected flow $\dot m\sqrt{T_{t4}}/p_{t4}$, which sets the compressor operating line.
- **Cooling** (convection, impingement, film) and thermal-barrier coatings let blades work in gas several hundred kelvin hotter than their metal limit; the cost is cooling air.
- Root centrifugal stress $\sigma = \rho\omega^2 A/(2\pi)$: the **AN²** limit ties the annulus area to the shaft speed.
:::

## Exercises

::: exercise {level=1 check="180"}
An impulse turbine stage with zero exit swirl runs at mean blade speed $300\ \mathrm{m/s}$. What is its specific work? (Enter the work in kJ/kg.)
::: solution
For $R = 0$ with zero exit swirl, [[#eq-zero-swirl]] gives $\psi = 2$, so $w_t = 2U^2 = 2 \times 300^2 = 180\,000\ \mathrm{J/kg} = 180\ \mathrm{kJ/kg}$.
:::
:::

::: exercise {level=1 check="0.632"}
A cooled nozzle guide vane sits in gas at $1850\ \mathrm{K}$; coolant enters at $900\ \mathrm{K}$ and the mean metal temperature is measured as $1250\ \mathrm{K}$. What is the cooling effectiveness? (Enter it as a fraction, rounded to three significant figures.)
::: solution
$\varepsilon = (1850 - 1250)/(1850 - 900) = 600/950 = 0.632$.
:::
:::

::: exercise {level=1 check="0.915"}
A turbine expands combustion gas ($\gamma = 1.33$) through a total pressure ratio of $4.0$ with polytropic efficiency $0.90$. What is its isentropic efficiency? (Enter it as a fraction, rounded to three significant figures.)
::: solution
With $(\gamma-1)/\gamma = 0.2481$: $4^{-0.2481} = 0.7091$ and $4^{-0.90 \times 0.2481} = 4^{-0.2233} = 0.7339$. So $\eta_t = (1 - 0.7339)/(1 - 0.7091) = 0.2661/0.2909 = 0.915$, above the polytropic value as [[#prop-turbine-polytropic]] predicts.
:::
:::

::: exercise {level=2 check="55.0"}
A 50 % reaction turbine stage has zero exit swirl and flow coefficient $0.70$. What is the NGV exit angle $\alpha_2$? Sketch the velocity triangles and state the rotor inlet and exit relative angles. (Enter $\alpha_2$ in degrees, rounded to one decimal place.)
::: solution
$\psi = 2(1 - 0.5) = 1$, so with zero exit swirl $\tan\alpha_2 = \psi/\phi = 1/0.7 = 1.4286$ and $\alpha_2 = 55.0^\circ$. Then $\tan\beta_2 = \tan\alpha_2 - 1/\phi = 0$: the relative flow enters the rotor axially. At exit $\tan\beta_3 = -1/\phi$, $\beta_3 = -55.0^\circ$. The triangles are mirror images — the signature of 50 % reaction ($\alpha_2 = -\beta_3$, $\beta_2 = \alpha_3$).
:::
:::

::: exercise {level=2 check="6.07"}
The NGVs of an engine are choked. On a hot day the turbine entry temperature is raised from $1500\ \mathrm{K}$ to $1700\ \mathrm{K}$ at the same turbine entry stagnation pressure. By what percentage does the mass flow through the NGVs fall? (Enter the percentage, rounded to three significant figures.)
::: solution
$\dot m \propto p_t/\sqrt{T_t}$, so the new flow is $\sqrt{1500/1700} = 0.9393$ of the old: a fall of $6.07\ \%$.
:::
:::

::: exercise {level=2 check="227"}
A low-pressure turbine stage of a direct-drive turbofan turns at $3600\ \mathrm{rpm}$ with hub radius $0.50\ \mathrm{m}$ and tip radius $0.80\ \mathrm{m}$; the blade alloy has density $8200\ \mathrm{kg/m^3}$. Estimate the root stress for an untapered blade. What does the result suggest about blade design? (Enter the stress in MPa, rounded to three significant figures.)
::: solution
$\omega = 3600 \times 2\pi/60 = 377.0\ \mathrm{rad/s}$, $A = \pi(0.80^2 - 0.50^2) = 1.225\ \mathrm{m^2}$. Then $\sigma = 8200 \times 377.0^2 \times 1.225/(2\pi) = 227\ \mathrm{MPa}$. Despite the speed being less than a third of that in [[#ex-an2]], the huge annulus gives a stress comparable with the tapered high-pressure blade there, at a lower temperature but on a much longer, more flexible blade; long low-pressure blades are strongly tapered and hollow or made of lighter alloys (titanium aluminide is used in some low-pressure turbines) to bring the stress down.
:::
:::

::: exercise {level=3}
Derive [[#eq-turbine-polytropic]] and show that, for an expansion of small pressure ratio $\pi_t = 1 + \varepsilon$, $\eta_t \approx \eta_p\left[1 + \tfrac{\gamma-1}{2\gamma}(1 - \eta_p)\varepsilon\right]$. Explain the reheat effect physically and say why it does not mean that losses in an early stage are harmless.
::: solution
The derivation is that of [[#prop-turbine-polytropic]]. For the expansion, let $b = \tfrac{\gamma-1}{\gamma}\ln\pi_t \approx k\varepsilon$ with $k = (\gamma-1)/\gamma$. Using $1 - e^{-x} = x(1 - x/2 + \dots)$,
$$
\eta_t = \frac{\eta_p b(1 - \eta_p b/2)}{b(1 - b/2)} \approx \eta_p\left[1 + \frac{b}{2}(1 - \eta_p)\right] = \eta_p\left[1 + \frac{k}{2}(1 - \eta_p)\varepsilon\right].
$$
The correction is positive. Physically, the entropy generated in an early stage leaves the gas hotter at a given pressure than isentropic expansion would, and since the work extractable over a given pressure ratio is proportional to the inlet temperature, later stages extract a little more than they would from the isentropic state. That is a partial recovery of the earlier loss, not its cancellation: the exit stagnation temperature is still higher than isentropic, the total work is still less than isentropic, and the "lost" energy still leaves in the exhaust. Only the *accounting* against a single isentropic reference makes the stack look better than its stages.
:::
:::

::: exercise {level=3}
**Design.** A high-pressure turbine must drive a compressor that absorbs $560\ \mathrm{kJ/kg}$ of air (with $f = 0.025$ and $\eta_m = 0.99$) from gas at $T_{t4} = 1750\ \mathrm{K}$. The blade tip speed is limited to $520\ \mathrm{m/s}$ by stress, and you may assume a mean-to-tip radius ratio of $0.88$. Decide on one or two stages, choose $\phi$, $\psi$ and reaction for each, and estimate the NGV exit Mach number and the rotor relative inlet temperature of the first stage. Discuss the trade.
::: solution
**Work per kg of gas.** $560/(0.99 \times 1.025) = 551.9\ \mathrm{kJ/kg}$, a temperature drop of $480\ \mathrm{K}$.

**Blade speed.** Mean $U = 0.88 \times 520 = 458\ \mathrm{m/s}$, $U^2 = 2.09\times10^{5}\ \mathrm{m^2/s^2}$. One stage would need $\psi = 552\,000/209\,000 = 2.64$ — above the usual high-pressure range, with very high exit Mach numbers and a reaction near zero or negative from [[#eq-zero-swirl]]; efficiency would be low. Two stages at $\psi \approx 1.32$ each are comfortable, with $R \approx 0.34$ for zero exit swirl.

**First stage**, $\phi = 0.55$ ($c_x = 252\ \mathrm{m/s}$), $\psi = 1.32$: $\tan\alpha_2 = 1.318/0.55 = 2.396$, $\alpha_2 = 67.3^\circ$, $c_2 = 252/0.3852 = 653\ \mathrm{m/s}$. $T_2 = 1750 - 653^2/2300 = 1564\ \mathrm{K}$, $M_2 = 653/\sqrt{1.33 \times 287 \times 1564} = 0.85$. Relative: $\tan\beta_2 = 2.396 - 1.818 = 0.578$, $\beta_2 = 30.0^\circ$, $w_2 = 252/\cos 30.0^\circ = 291\ \mathrm{m/s}$, so $T_{t,\text{rel}} = 1564 + 291^2/2300 = 1601\ \mathrm{K}$ — 150 K below $T_{t4}$, which eases rotor cooling.

**Trade.** A single highly loaded stage (as used in some modern engines with very high tip speeds and transonic NGVs) saves length, weight and cooling air for one row of blades but costs perhaps two or three points of efficiency; two stages give better efficiency and lower exit swirl into the low-pressure turbine at the cost of a second cooled row. The choice depends on whether the engine is weight- or fuel-critical. Any well-argued choice with consistent numbers is acceptable.
:::
:::
