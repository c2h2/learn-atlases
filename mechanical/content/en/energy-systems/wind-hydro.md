Wind and water are the two renewable resources that deliver mechanical energy directly: no heat engine stands between the resource and the shaft, so the Carnot limit of [[energy-systems/energy-overview]] does not apply. The limits are fluid-mechanical instead. A wind turbine cannot stop the air it extracts energy from — the air must keep flowing out behind the rotor — and that alone caps the extractable fraction at $16/27$ of the kinetic energy flux, the Betz limit. A hydro turbine works with water that has been collected behind a dam or diverted into a pipe, and can convert more than $90\,\%$ of the available head into shaft work; its limits are the head and flow the site provides and the friction in the pipe that brings the water down.

This chapter derives both results from the control-volume momentum and energy equations of [[fluid-mechanics/control-volume-analysis]], then turns them into engineering estimates: how big a rotor must be for a given rating, how much energy a turbine will produce in a year from the statistics of the wind, how to size a penstock and choose between Pelton, Francis and Kaplan turbines, and how much energy a tidal basin can hold.

## The power in the wind {#sec-wind-power}

Air of density $\rho$ moving at speed $v$ through an area $A$ perpendicular to the flow carries mass at the rate $\dot m = \rho A v$, and each kilogram carries kinetic energy $\tfrac12 v^2$. The kinetic energy flux is therefore proportional to the *cube* of the wind speed.

::: definition Wind power and power density {#def-wind-power}
The **power in the wind** through an area $A$ normal to a steady wind of speed $v$ is
$$
P_\text{wind} = \tfrac12 \dot m v^2 = \tfrac12 \rho A v^3 ,
$$ {#eq-wind-power}
and the **wind power density** is $P_\text{wind}/A = \tfrac12\rho v^3$ (in $\mathrm{W/m^2}$). For a horizontal-axis turbine $A = \pi R^2$ is the area swept by the rotor of radius $R$. The **power coefficient** of a turbine delivering shaft power $P$ is
$$
C_P = \frac{P}{\tfrac12 \rho A v^3},
$$
and the **tip-speed ratio** of a rotor turning at angular speed $\omega$ is $\lambda = \omega R / v$. Air density at sea level and $15\,^\circ\mathrm{C}$ is $\rho = p/(RT) = 101\,325/(287 \times 288.15) = 1.225\,\mathrm{kg/m^3}$; it falls by about $1\,\%$ per $100\,\mathrm{m}$ of altitude.
:::

The cube is the single most important fact about wind energy. Doubling the wind speed multiplies the power eightfold; a site with a mean speed $10\,\%$ higher has about $33\,\%$ more power. It is why turbines are built on tall towers — wind speed increases with height above the ground because the ground slows the air in the atmospheric boundary layer — and why a few windy hours produce a large share of a year's energy.

The increase of mean wind speed with height is often modelled by a power law,
$$
\frac{v(z)}{v(z_r)} = \left(\frac{z}{z_r}\right)^{\alpha},
$$ {#eq-shear}
with a shear exponent $\alpha$ around $1/7 \approx 0.14$ over open, level country and larger over rough terrain or forest. The power law is an empirical fit, not a result of theory; the logarithmic profile $v \propto \ln(z/z_0)$, with surface roughness length $z_0$, has a better basis in boundary-layer theory for neutral stability. Both should be checked against measurements at the site, because atmospheric stability changes $\alpha$ from day to night.

::: example Power at hub height {#ex-hub-power}
A met mast measures a mean wind speed of $6.0\,\mathrm{m/s}$ at $10\,\mathrm{m}$. (a) Estimate the speed at a hub height of $100\,\mathrm{m}$ with $\alpha = 0.14$. (b) Find the wind power density there, and the power in the wind through a rotor of diameter $120\,\mathrm{m}$ at $10\,\mathrm{m/s}$. (c) How much shaft power would a rotor with $C_P = 0.45$ deliver at $10\,\mathrm{m/s}$?
::: solution
(a) By [[#eq-shear]], $v_{100} = 6.0 \times (100/10)^{0.14} = 6.0 \times 1.380 = 8.28\,\mathrm{m/s}$.

(b) Power density at $8.28\,\mathrm{m/s}$: $\tfrac12 \times 1.225 \times 8.28^3 = 348\,\mathrm{W/m^2}$, which is $(1.380)^3 = 2.63$ times the value at $10\,\mathrm{m}$. At $10\,\mathrm{m/s}$ the density is $\tfrac12 \times 1.225 \times 1000 = 612.5\,\mathrm{W/m^2}$; the swept area is $A = \pi \times 60^2 = 11\,310\,\mathrm{m^2}$, so
$$
P_\text{wind} = 612.5\,\mathrm{W/m^2} \times 11\,310\,\mathrm{m^2} = 6.93\,\mathrm{MW}.
$$
(c) $P = 0.45 \times 6.93 = 3.12\,\mathrm{MW}$.

Sanity check: commercial onshore turbines with $120\,\mathrm{m}$ rotors are rated at a few megawatts and reach rated power at around $11$–$13\,\mathrm{m/s}$, consistent with $3.1\,\mathrm{MW}$ at $10\,\mathrm{m/s}$. Caution: (b) uses the *mean* speed in the cube, which underestimates the mean power — see [[#warn-mean-cube]].
:::
:::

## The actuator disc and the Betz limit {#sec-betz}

How much of $P_\text{wind}$ can a rotor take? If it took all the kinetic energy the air would stop behind the rotor, and stopped air would block the flow that brings more. If it took none, the air would pass unslowed. Somewhere between lies a maximum. To find it, replace the rotor by an **actuator disc**: a permeable disc of area $A$ across which the pressure drops suddenly while the velocity is continuous, extracting energy uniformly over the disc.

::: proposition Betz limit {#prop-betz}
Consider steady, incompressible, inviscid flow through an actuator disc of area $A$ in a uniform wind $v_1$, with a stream tube that passes through the disc, no rotation in the wake, and the far-wake pressure equal to the ambient pressure. Define the **axial induction factor** $a$ by $v_d = v_1(1 - a)$ at the disc. Then the far-wake speed is $v_4 = v_1(1 - 2a)$, the thrust and power coefficients are
$$
C_T = \frac{T}{\tfrac12\rho A v_1^2} = 4a(1-a), \qquad C_P = \frac{P}{\tfrac12\rho A v_1^3} = 4a(1-a)^2 ,
$$ {#eq-cp-a}
and $C_P$ has its maximum at $a = 1/3$:
$$
C_{P,\max} = \frac{16}{27} = 0.593 .
$$ {#eq-betz}
:::

::: proof
Label the stations: $1$ far upstream (speed $v_1$, ambient pressure $p_0$), $2$ just upstream of the disc, $3$ just downstream, $4$ far downstream (speed $v_4$, pressure $p_0$). Mass conservation in the stream tube gives $\dot m = \rho A v_d$ with the same speed $v_d$ at $2$ and $3$ (the disc is thin).

*Momentum.* The net axial force on the air in the stream tube equals its momentum outflow minus inflow. The pressure acting on the stream-tube boundary integrates to zero for the far-field control volume when the far-wake pressure is ambient (the standard actuator-disc assumption), so the only force on the air is the disc's reaction $-T$:
$$
T = \dot m (v_1 - v_4) = \rho A v_d (v_1 - v_4).
$$
Across the disc itself the thrust is the pressure difference, $T = (p_2 - p_3)A$.

*Energy.* Bernoulli's equation holds separately upstream and downstream of the disc (not across it, where energy is extracted):
$$
p_0 + \tfrac12\rho v_1^2 = p_2 + \tfrac12\rho v_d^2, \qquad p_3 + \tfrac12\rho v_d^2 = p_0 + \tfrac12\rho v_4^2 ,
$$
so $p_2 - p_3 = \tfrac12\rho(v_1^2 - v_4^2)$. Equating the two expressions for $T$:
$$
\tfrac12\rho A (v_1^2 - v_4^2) = \rho A v_d (v_1 - v_4) \quad\Longrightarrow\quad v_d = \tfrac12 (v_1 + v_4).
$$
The speed at the disc is the average of upstream and far-wake speeds. With $v_d = v_1(1-a)$ this gives $v_4 = v_1(1 - 2a)$: half the slowing happens before the disc and half after.

*Coefficients.* $T = \rho A v_1(1-a)\,(2a v_1) = \tfrac12\rho A v_1^2 \cdot 4a(1-a)$. The power extracted is the thrust times the disc speed (equivalently the loss of kinetic energy flux), $P = T v_d = \tfrac12\rho A v_1^3 \cdot 4a(1-a)^2$.

*Maximum.* $dC_P/da = 4(1-a)^2 - 8a(1-a) = 4(1-a)(1-3a) = 0$ gives $a = 1/3$ (the root $a = 1$ is a minimum and outside the model's range). Then $C_P = 4 \cdot \tfrac13 \cdot \tfrac49 = 16/27$, with $C_T = 8/9$ and $v_4 = v_1/3$.

The model fails for $a > 1/2$, where it predicts a reversed far wake; real rotors heavily loaded enter a turbulent-wake state that empirical corrections (Glauert's) describe. The limit applies to any device that extracts energy through a disc of area $A$ in an open stream; it does not apply to ducted or confined flows, where the area through which the flow is drawn is not $A$.
:::

::: widget plot
f: 4*x*(1-x)^2; 4*x*(1-x); 16/27
x: 0, 0.5
y: 0, 1.05
labels: C_P = 4a(1-a)^2; C_T = 4a(1-a); 16/27
points: 0.3333, 0.5926
caption: Actuator-disc power and thrust coefficients against the axial induction factor $a$. The power coefficient peaks at $a = 1/3$ with the Betz value $16/27 = 0.593$ (marked); the thrust coefficient keeps rising to $1$ at $a = 1/2$. Notice how flat the $C_P$ peak is: between $a = 0.25$ and $0.40$ the power is within $5\,\%$ of the maximum, while the thrust — which sets the tower and blade loads — changes by $20\,\%$. Designers exploit this by running slightly below $a = 1/3$, giving up a little power for noticeably less load.
:::

Three effects keep real turbines below the Betz limit. The wake rotates in reaction to the torque on the rotor, carrying away kinetic energy; this loss is significant at low tip-speed ratios and small above $\lambda \approx 6$. A rotor has a finite number of blades, so the flow is not uniform over the disc and energy is lost around the tips (tip losses). And the blades have profile drag. Modern three-bladed turbines reach $C_P$ of about $0.45$–$0.50$ at their best operating point, around $75$–$85\,\%$ of Betz.

## Turbine operation: tip-speed ratio and the power curve {#sec-power-curve}

For a given blade design, $C_P$ is a function of the tip-speed ratio $\lambda = \omega R/v$ (and the blade pitch angle). Each blade element sees a relative wind made of the incoming wind (slowed by induction) and its own rotational speed $\omega r$; the angle of attack depends on the ratio of the two, and the best lift-to-drag ratio occurs at one value of $\lambda$. Modern three-bladed rotors have their best $C_P$ at $\lambda$ of about $7$–$9$. Running at optimum $\lambda$ therefore means turning *faster* in stronger winds — variable-speed operation — up to the limit on tip speed (around $80$–$90\,\mathrm{m/s}$ on land, set mainly by aerodynamic noise).

::: definition Power curve, rated and cut-out speeds {#def-power-curve}
The **power curve** of a turbine is its electrical output as a function of the hub-height wind speed (ten-minute averages, measured to IEC 61400-12-1). It has four regions:
1. below the **cut-in speed** $v_{ci}$ (typically $3$–$4\,\mathrm{m/s}$) the turbine does not generate;
2. between $v_{ci}$ and the **rated speed** $v_r$ (typically $11$–$13\,\mathrm{m/s}$) it runs at the best $C_P$, so output rises roughly as $v^3$;
3. between $v_r$ and the **cut-out speed** $v_{co}$ (typically $25\,\mathrm{m/s}$) the blades are pitched to shed power and output stays at the **rated power** $P_r$;
4. above $v_{co}$ the rotor is parked to protect the structure.
:::

The rated speed is an economic choice. The rotor is sized to capture the plentiful moderate winds; the generator and drive train are sized for $P_r$, and power in rare strong winds is deliberately thrown away. A low-wind-site turbine has a large rotor on a small generator (high capacity factor); a high-wind-site turbine the reverse.

::: example Sizing a rotor and its speed {#ex-rotor}
A turbine is to deliver $3.0\,\mathrm{MW}$ at a rated wind speed of $12\,\mathrm{m/s}$ with $C_P = 0.45$ (including generator and drive-train losses) at sea-level density. (a) Find the rotor diameter. (b) If the optimum tip-speed ratio is $8$, find the rotor speed in rpm at $10\,\mathrm{m/s}$ and the tip speed at rated wind. (c) What would an ideal Betz rotor of the same size deliver at $12\,\mathrm{m/s}$?
::: solution
(a) From [[#eq-wind-power]], $A = P/(C_P\,\tfrac12\rho v^3) = 3.0\times10^{6}/(0.45 \times 0.6125 \times 1728) = 6299\,\mathrm{m^2}$, so $D = 2\sqrt{A/\pi} = 89.6\,\mathrm{m}$.

(b) $R = 44.8\,\mathrm{m}$. At $10\,\mathrm{m/s}$, $\omega = \lambda v/R = 8 \times 10/44.8 = 1.79\,\mathrm{rad/s}$, i.e. $\omega \times 60/2\pi = 17.1\,\mathrm{rpm}$. At $12\,\mathrm{m/s}$ the tip speed would be $\lambda v = 96\,\mathrm{m/s}$ if the turbine held $\lambda = 8$; in practice the rotor speed is capped below this (tip speed about $80$–$90\,\mathrm{m/s}$) and $C_P$ drops a little near rated wind.

(c) $P = \tfrac{16}{27} \times 0.6125 \times 6299 \times 1728 = 3.95\,\mathrm{MW}$, so the real rotor achieves $3.0/3.95 = 76\,\%$ of Betz.

Sanity check: rotors near $90\,\mathrm{m}$ were typical of $2$–$3\,\mathrm{MW}$ turbines in the 2010s, and rotation at $15$–$20\,\mathrm{rpm}$ is what one sees on such machines — far too slow for a generator, hence a gearbox or a large-diameter direct-drive generator.
:::
:::

## Wind statistics and annual energy {#sec-weibull}

The wind speed at a site varies continuously, so the annual energy is an average of the power curve over the distribution of wind speeds. Hourly or ten-minute wind speeds at most sites are fitted well by a Weibull distribution.

::: definition Weibull and Rayleigh wind-speed distributions {#def-weibull}
A wind speed $v \ge 0$ has a **Weibull distribution** with shape parameter $k$ and scale parameter $c$ (in $\mathrm{m/s}$) if its probability density is
$$
f(v) = \frac{k}{c}\left(\frac{v}{c}\right)^{k-1}\exp\left[-\left(\frac{v}{c}\right)^{k}\right],
\qquad
F(v) = 1 - \exp\left[-\left(\frac{v}{c}\right)^{k}\right]
$$
for the cumulative distribution. Its moments are $\overline{v^n} = c^n\,\Gamma(1 + n/k)$, so the mean speed is $\bar v = c\,\Gamma(1 + 1/k)$. The case $k = 2$ is the **Rayleigh distribution**, with $\bar v = c\sqrt{\pi}/2 = 0.886\,c$. Typical sites have $k$ between $1.5$ and $3$; larger $k$ means steadier wind.
:::

::: proposition Mean wind power density {#prop-mean-power}
For Weibull-distributed wind speeds, the mean wind power density is
$$
\overline{\left(\frac{P}{A}\right)} = \tfrac12\rho\,\overline{v^3} = \tfrac12\rho\,c^3\,\Gamma\left(1 + \frac{3}{k}\right),
$$ {#eq-weibull-power}
and the ratio of this to the power density computed from the mean speed, the **energy pattern factor**
$$
K_e = \frac{\overline{v^3}}{\bar v^{\,3}} = \frac{\Gamma(1 + 3/k)}{\Gamma(1 + 1/k)^3},
$$
depends only on $k$; for the Rayleigh distribution $K_e = 6/\pi = 1.91$.
:::

::: proof
Assume constant density and that $f(v)$ describes the fraction of time at each speed. The time-mean power density is $\int_0^\infty \tfrac12\rho v^3 f(v)\,dv = \tfrac12\rho\,\overline{v^3}$. For the moment substitute $u = (v/c)^k$, so $v = c\,u^{1/k}$ and $du = (k/c)(v/c)^{k-1}\,dv = f(v)e^{u}\,dv$. Then
$$
\overline{v^n} = \int_0^\infty v^n f(v)\,dv = \int_0^\infty c^n u^{n/k} e^{-u}\,du = c^n\,\Gamma\left(1 + \frac{n}{k}\right),
$$
by the definition $\Gamma(s) = \int_0^\infty u^{s-1}e^{-u}\,du$. Setting $n = 3$ gives [[#eq-weibull-power]] and $n = 1$ the mean speed. Dividing, the $c$'s cancel and $K_e$ depends on $k$ only. For $k = 2$: $\Gamma(5/2) = \tfrac34\sqrt\pi$ and $\Gamma(3/2) = \tfrac12\sqrt\pi$, so $K_e = \tfrac34\sqrt\pi / (\tfrac18\pi^{3/2}) = 6/\pi$.
:::

::: warning Never cube the mean wind speed {#warn-mean-cube}
Because power goes as $v^3$ and $v^3$ is convex, the mean of the cube exceeds the cube of the mean (Jensen's inequality). Computing power from the annual mean speed underestimates the resource by the energy pattern factor — almost a factor of two for Rayleigh winds. The reverse mistake is also common: applying the full $\overline{v^3}$ to a turbine's output ignores that the power curve is capped at $P_r$ and zero above cut-out, so the turbine captures far less of the strong-wind energy than the resource figure suggests. Annual energy must be computed by integrating the *power curve* over the wind distribution ([[#alg-aep]]), never from the mean speed alone. Also correct the air density for site altitude and temperature: a site at $1500\,\mathrm{m}$ has about $15\,\%$ less power at the same wind speed.
:::

::: algorithm Annual energy production from a power curve {#alg-aep}
1. Obtain the hub-height wind distribution: fit $k$ and $c$ to measured data (corrected to hub height with [[#eq-shear]] or, better, measured at hub height by mast or lidar), or use binned frequencies directly.
2. Obtain the power curve $P(v)$ for the turbine, corrected for site air density (scale the wind speed by $(\rho/\rho_\text{ref})^{1/3}$ in the cubic region).
3. Compute the mean power $\bar P = \int_0^\infty P(v)\,f(v)\,dv$, numerically or as $\sum_j P(v_j)\,\Pr(\text{bin } j)$ over $0.5$ or $1\,\mathrm{m/s}$ bins, with $\Pr(\text{bin}) = F(v_j^+) - F(v_j^-)$.
4. Gross annual energy $= \bar P \times 8760\,\mathrm{h}$; capacity factor $= \bar P/P_r$.
5. Subtract losses: wakes of other turbines in a farm ($5$–$15\,\%$), availability ($2$–$5\,\%$), electrical losses ($1$–$3\,\%$), icing and curtailment — to get the net annual energy production.
:::

::: widget plot
f: (k/c)*(x/c)^(k-1)*exp(-(x/c)^k); x^3*(k/c)*(x/c)^(k-1)*exp(-(x/c)^k)/(c^3*gamma(1+3/k))
x: 0, 30
sliders: k=2:1.2:3.5:0.1; c=8:4:12:0.25
labels: f(v)\ \text{(time)}; v^3 f(v)/\overline{v^3}\ \text{(energy)}
caption: The Weibull distribution of wind speed (fraction of time per m/s) and the distribution of *energy* (fraction of the annual wind energy per m/s), for shape $k$ and scale $c$. The energy curve peaks at a much higher speed than the time curve: with $k = 2$, $c = 8\,\mathrm{m/s}$ the most frequent speed is about $5.7\,\mathrm{m/s}$, but the most energy arrives at about $11\,\mathrm{m/s}$ ($c\sqrt2$) — which is why turbines are rated near there. Lower $k$ (gustier sites) spreads the energy into strong winds a turbine sheds above rated; higher $k$ concentrates it where the turbine can use it.
:::

::: example Annual energy of a 3 MW turbine {#ex-aep}
The turbine of [[#ex-rotor]] ($P_r = 3.0\,\mathrm{MW}$, $v_{ci} = 3\,\mathrm{m/s}$, $v_r = 12\,\mathrm{m/s}$, $v_{co} = 25\,\mathrm{m/s}$) stands at a site whose hub-height wind is Rayleigh distributed with $c = 8.0\,\mathrm{m/s}$. Model the power curve between cut-in and rated as $P = P_r (v^3 - v_{ci}^3)/(v_r^3 - v_{ci}^3)$. Find (a) the mean speed and mean wind power density; (b) the fraction of time below cut-in and at rated power; (c) the gross annual energy and capacity factor.
::: solution
(a) $\bar v = 0.886 \times 8.0 = 7.09\,\mathrm{m/s}$. By [[#eq-weibull-power]] with $\Gamma(2.5) = 1.329$:
$$
\overline{P/A} = \tfrac12 \times 1.225 \times 8.0^3 \times 1.329 = 417\,\mathrm{W/m^2},
$$
against $\tfrac12 \times 1.225 \times 7.09^3 = 218\,\mathrm{W/m^2}$ from the mean speed — the factor $1.91$ of [[#prop-mean-power]].

(b) $F(3) = 1 - e^{-(3/8)^2} = 0.131$: the turbine is idle $13.1\,\%$ of the time. At rated: $F(25) - F(12) = e^{-(12/8)^2} - e^{-(25/8)^2} = 0.1054 - 0.0001 = 0.105$, so $10.5\,\%$ of the time.

(c) Mean power, from step 3 of [[#alg-aep]] by numerical integration of the cubic segment:
$$
\bar P = \int_{3}^{12} P(v) f(v)\,dv + P_r[F(25) - F(12)] = 0.586 + 0.316 = 0.902\,\mathrm{MW}.
$$
Gross annual energy $= 0.902 \times 8760 = 7.90\,\mathrm{GWh}$; capacity factor $= 0.902/3.0 = 0.30$.

Sanity check: a capacity factor around $0.30$ for a $7\,\mathrm{m/s}$ site is typical of onshore wind. Notice that the rated-power region, only $10.5\,\%$ of the time, supplies $35\,\%$ of the energy. After $10$–$15\,\%$ of further losses the net production would be about $6.8\,\mathrm{GWh}$.
:::
:::

## Hydropower {#sec-hydro}

A hydroelectric plant converts the gravitational potential energy of water into shaft work. Water from a reservoir or river intake flows through a pressure pipe (the **penstock**) to a turbine and leaves into the tailrace. The **gross head** $H_g$ is the difference in water-surface elevation between headwater and tailwater; friction and fittings in the penstock consume part of it, leaving the **net head** $H$ available at the turbine.

::: proposition Hydraulic power and net head {#prop-hydro}
For steady incompressible flow $Q$ (in $\mathrm{m^3/s}$) from a headwater surface to a tailwater surface, both at atmospheric pressure and with negligible velocity, the shaft power of the turbine is
$$
P = \eta_t\,\rho g Q H, \qquad H = H_g - h_L ,
$$ {#eq-hydro}
where $h_L$ is the head loss in the waterways and $\eta_t$ the turbine efficiency. For a penstock of length $L$, diameter $D$ and Darcy friction factor $f$ carrying mean velocity $V = 4Q/\pi D^2$, $h_L \approx f (L/D)\,V^2/2g$ plus minor losses, i.e. $h_L = kQ^2$ with $k$ fixed by the pipe. The electrical output is $P_e = \eta_g P$.
:::

::: proof
Apply the steady-flow energy equation per unit weight between section 1 (headwater surface) and section 2 (tailwater surface), with the turbine between them extracting work $w_s$ per unit mass:
$$
\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + \frac{w_s}{g} + h_L + h_t .
$$
Here $h_t$ is the head lost inside the turbine. With $p_1 = p_2$ (atmospheric) and $V_1, V_2 \approx 0$, $w_s = g(z_1 - z_2 - h_L - h_t) = g(H - h_t)$. Defining the turbine efficiency as $\eta_t = (H - h_t)/H$ (shaft work over the hydraulic energy available at the turbine) and multiplying by $\dot m = \rho Q$ gives $P = \eta_t\rho g Q H$. The Darcy–Weisbach head loss for fully developed pipe flow is $fLV^2/(2gD)$ ([[fluid-mechanics/pipe-flow]]); with $V \propto Q$ and $f$ nearly constant at the high Reynolds numbers of penstocks, $h_L \propto Q^2$.
:::

Because head loss grows as $Q^2$ while the hydraulic power grows as $Q$, a given penstock has a best flow. The hydraulic power available at the turbine is $\rho g Q (H_g - kQ^2)$; setting its derivative to zero gives $H_g - 3kQ^2 = 0$, so the power is greatest when **one third of the gross head is lost in the penstock**. Real plants are designed to lose far less — typically $2$–$10\,\%$ of the gross head — because a larger pipe costs less over the plant's life than the energy thrown away; the one-third point is the upper limit of what a given pipe can deliver, useful for checking whether a pipe is grossly undersized.

::: widget plot
f: 9.81*0.9*x*max(H - r*x^2, 0)/1000
x: 0, 12
y: 0, 8
sliders: H=80:20:200:5; r=0.84:0.1:3:0.02
labels: P\ (\mathrm{MW})
caption: Turbine shaft power (MW) against flow $Q$ (m³/s) for gross head $H$ (m) and a penstock with head loss $h_L = rQ^2$ ($r$ in s²/m⁵), with $\eta_t = 0.9$. The curve rises almost linearly at small flow, peaks where $rQ^2 = H/3$, and falls to zero when the pipe friction consumes the whole head. Drag $r$ down (a larger pipe) and watch the peak move to higher flow and power; the real design point should lie well to the left of the peak, where the curve is still nearly straight.
:::

::: example A small hydro scheme {#ex-small-hydro}
A run-of-river scheme has gross head $80\,\mathrm{m}$ and design flow $2.0\,\mathrm{m^3/s}$, carried in a steel penstock $400\,\mathrm{m}$ long and $0.90\,\mathrm{m}$ in diameter with $f = 0.015$ (minor losses neglected). The turbine and generator together are $85\,\%$ efficient. Find the head loss, the net head, the electrical output and the annual energy at a capacity factor of $0.50$.
::: solution
Velocity: $V = Q/(\pi D^2/4) = 2.0/0.6362 = 3.14\,\mathrm{m/s}$. Head loss:
$$
h_L = f\frac{L}{D}\frac{V^2}{2g} = 0.015 \times \frac{400}{0.90} \times \frac{3.14^2}{2 \times 9.81} = 0.015 \times 444.4 \times 0.504 = 3.36\,\mathrm{m}.
$$
Net head $H = 80 - 3.36 = 76.6\,\mathrm{m}$ ($4.2\,\%$ loss — a sensible design). Electrical output:
$$
P_e = 0.85 \times 1000 \times 9.81 \times 2.0 \times 76.6 = 1.28\times10^{6}\,\mathrm{W} = 1.28\,\mathrm{MW}.
$$
Annual energy: $1.28\,\mathrm{MW} \times 8760\,\mathrm{h} \times 0.50 = 5.6\,\mathrm{GWh}$.

Sanity check: the quick rule $P \approx 8QH$ (in kW, with $Q$ in m³/s and $H$ in m, i.e. $\eta \approx 0.83$) gives $8 \times 2 \times 76.6 = 1230\,\mathrm{kW}$ — consistent. The head-loss coefficient is $k = 3.36/2.0^2 = 0.84\,\mathrm{s^2/m^5}$, so this pipe could deliver at most $Q = \sqrt{80/(3 \times 0.84)} = 5.6\,\mathrm{m^3/s}$ (the third widget's default): the design flow is far below that, as it should be.
:::
:::

### Turbine types and specific speed

Hydraulic turbines are of two kinds. In an **impulse** turbine the whole head is converted to velocity in a nozzle; a free jet at atmospheric pressure strikes buckets on the runner. The **Pelton wheel** is the standard impulse turbine, used at high heads (hundreds of metres to over $1000\,\mathrm{m}$) and modest flows. In a **reaction** turbine the runner is full of water under pressure and the pressure falls through the runner itself: the **Francis** turbine (mixed radial-axial flow) covers medium heads from about $20$ to $700\,\mathrm{m}$, the **Kaplan** turbine (axial flow, adjustable propeller blades) low heads and large flows. Large turbines of all three types reach peak efficiencies above $90\,\%$.

::: proposition Optimum bucket speed of a Pelton wheel {#prop-pelton}
A jet of speed $V_j$ and volume flow $Q$ strikes buckets moving at speed $u$, which turn the relative flow through an angle $\beta$ (close to $165^\circ$ in practice), with the relative speed reduced by a friction factor $\kappa \le 1$. If the full jet flow is intercepted (a wheel with many buckets), the power delivered to the runner is
$$
P = \rho Q\,u\,(V_j - u)\,(1 - \kappa\cos\beta),
$$
which is maximised at $u = V_j/2$, where the hydraulic efficiency is $\eta = \tfrac12(1 - \kappa\cos\beta)$.
:::

::: proof
In a frame moving with the bucket, the jet arrives with relative speed $V_j - u$ and leaves with relative speed $\kappa(V_j - u)$ at angle $\beta$ to its incoming direction. The change in the relative velocity component along the jet is $(V_j - u) - \kappa(V_j - u)\cos\beta = (V_j - u)(1 - \kappa\cos\beta)$. The frame change does not alter velocity *differences*, so the force on the buckets is the mass flow times this change. Successive buckets together intercept the whole flow $\rho Q$ (the jet is never wasted), so $F = \rho Q (V_j - u)(1 - \kappa\cos\beta)$ and $P = Fu$. Then $dP/du = \rho Q(1-\kappa\cos\beta)(V_j - 2u) = 0$ at $u = V_j/2$. The jet power is $\tfrac12\rho Q V_j^2$, so $\eta = P/(\tfrac12\rho QV_j^2) = 2(u/V_j)(1 - u/V_j)(1 - \kappa\cos\beta) = \tfrac12(1-\kappa\cos\beta)$ at the optimum. With $\kappa = 1$ and $\beta = 180^\circ$ the efficiency would be one — the water left at rest; with $\beta = 165^\circ$ it is $0.983$, the small angle short of $180^\circ$ being needed to clear the water from the path of the next bucket. Real wheels run at $u/V_j \approx 0.45$–$0.48$ because of friction and windage.
:::

Turbine type is chosen by a **specific speed**, the speed at which a geometrically similar turbine would deliver unit power under unit head. In the dimensional form common in hydropower practice,
$$
N_s = \frac{N\sqrt{P}}{H^{5/4}} \qquad (N \text{ in rpm},\ P \text{ in kW},\ H \text{ in m}),
$$ {#eq-specific-speed}
and its dimensionless counterpart is $\Omega_s = \omega\sqrt{P/\rho}/(gH)^{5/4} \approx 0.0060\,N_s$ for water. The speed $N$ is fixed by the generator: a synchronous machine with $p$ poles on a grid of frequency $f$ turns at $N = 120 f/p$ rpm. Approximate ranges quoted in hydraulic-machinery texts (they overlap and vary between sources):

| turbine | $N_s$ (rpm, kW, m) | $\Omega_s$ | typical head |
|---|---|---|---|
| Pelton, one jet | about $10$–$30$ | $0.06$–$0.18$ | above about $250\,\mathrm{m}$ |
| Francis | about $50$–$350$ | $0.3$–$2.1$ | about $20$–$700\,\mathrm{m}$ |
| Kaplan / propeller | about $250$–$900$ | $1.5$–$5.4$ | below about $40\,\mathrm{m}$ |

Low specific speed means a high head and a small flow for the power — a slim jet on a big wheel; high specific speed means a low head and a large flow — a wide open propeller.

::: example Designing a Pelton wheel {#ex-pelton}
A site offers a net head of $400\,\mathrm{m}$ and a flow of $1.5\,\mathrm{m^3/s}$. The generator has $12$ poles on a $50\,\mathrm{Hz}$ grid. Using a nozzle velocity coefficient $C_v = 0.98$, a bucket-to-jet speed ratio of $0.47$ and an overall turbine efficiency of $0.90$, find the jet speed and diameter, the runner pitch diameter, the shaft power, and the specific speed. Is a Pelton wheel appropriate?
::: solution
Jet speed: $V_j = C_v\sqrt{2gH} = 0.98\sqrt{2 \times 9.81 \times 400} = 0.98 \times 88.6 = 86.8\,\mathrm{m/s}$. Jet diameter (one jet): $d = \sqrt{4Q/\pi V_j} = \sqrt{4 \times 1.5/(\pi \times 86.8)} = 0.148\,\mathrm{m}$.

Speed: $N = 120 \times 50/12 = 500\,\mathrm{rpm}$, $\omega = 52.4\,\mathrm{rad/s}$. Bucket speed $u = 0.47 \times 86.8 = 40.8\,\mathrm{m/s}$, so the pitch diameter is
$$
D = \frac{2u}{\omega} = \frac{2 \times 40.8}{52.4} = 1.56\,\mathrm{m}.
$$
Power: $P = 0.90 \times 1000 \times 9.81 \times 1.5 \times 400 = 5.30\times10^{6}\,\mathrm{W} = 5297\,\mathrm{kW}$.

Specific speed by [[#eq-specific-speed]]: $N_s = 500\sqrt{5297}/400^{1.25} = 500 \times 72.8/1789 = 20.3$, inside the single-jet Pelton range.

Sanity check: the ratio $D/d = 1.56/0.148 = 10.5$ is in the usual range for Pelton wheels (roughly $10$ or more, so that the buckets are large enough relative to the jet yet the wheel is not excessive). A Francis turbine at $400\,\mathrm{m}$ would be possible at higher flow, but at this flow its runner would be very narrow.
:::
:::

### Marine energy

Tides and ocean currents are moving water, so the same two models apply. A **tidal stream** turbine is an underwater wind turbine: [[#eq-wind-power]] and the Betz limit hold with $\rho \approx 1025\,\mathrm{kg/m^3}$, so a $2.5\,\mathrm{m/s}$ current carries $\tfrac12 \times 1025 \times 2.5^3 = 8.0\,\mathrm{kW/m^2}$, the power density of a $24\,\mathrm{m/s}$ storm-force wind. A **tidal range** (barrage or lagoon) scheme is low-head hydro: a basin of area $A$ is filled at high tide and drained through turbines at low tide. Draining a basin of tidal range $R$ releases the potential energy of a water layer of thickness $R$ whose centre of mass falls $R/2$:
$$
E = \rho g A R \cdot \frac{R}{2} = \tfrac12\rho g A R^2
$$ {#eq-tidal}
per tide, ignoring the variation of basin area with depth. Because energy goes as $R^2$, only sites with large ranges (the Severn estuary, the Bay of Fundy, the Rance estuary in Brittany) have been seriously considered. The Rance barrage, opened in 1966, has $240\,\mathrm{MW}$ of bulb turbines; the Sihwa Lake plant in South Korea ($254\,\mathrm{MW}$, 2011) is the largest by capacity.

::: quiz
A site's wind speed is Rayleigh-distributed with mean $7\,\mathrm{m/s}$. A colleague computes the mean power density as $\tfrac12 \times 1.225 \times 7^3 = 210\,\mathrm{W/m^2}$. What is the right value, and why?
- [ ] $210\,\mathrm{W/m^2}$; the mean speed represents the year.
- [x] About $401\,\mathrm{W/m^2}$, because the mean of $v^3$ is $6/\pi$ times the cube of the mean for a Rayleigh distribution.
- [ ] About $124\,\mathrm{W/m^2}$, because only $16/27$ of it can be extracted.
- [ ] About $420\,\mathrm{W/m^2}$, because power is proportional to $v^2$ and the mean of $v^2$ is double.
::: solution
$\overline{v^3} = K_e\bar v^3$ with $K_e = 6/\pi = 1.91$ for $k = 2$ ([[#prop-mean-power]]), so the mean power density is $1.91 \times 210 = 401\,\mathrm{W/m^2}$. The Betz factor concerns how much a turbine can extract, not the resource itself; and wind power goes as $v^3$, not $v^2$.
:::
:::

::: history
Water wheels are ancient, but the modern hydraulic turbine dates from the nineteenth century. James B. **Francis**, engineer to the canal company at Lowell, Massachusetts, developed his inward-flow reaction turbine in 1848–49 and published systematic tests of it in *Lowell Hydraulic Experiments* (1855). Lester **Pelton** patented his split-bucket impulse wheel in 1880, from experience with water wheels in the Californian gold fields, and Viktor **Kaplan** developed the adjustable-blade propeller turbine for low heads from 1913. On the wind side, Charles F. **Brush** built a $17\,\mathrm{m}$, 144-bladed wind dynamo at his house in Cleveland in the winter of 1887–88 to charge batteries, and Poul **la Cour** at Askov in Denmark from 1891 studied the aerodynamics of faster, few-bladed rotors. Frederick **Lanchester** (1915), Albert **Betz** (1920) and Nikolay **Zhukovsky** (1920) independently derived the $16/27$ limit. The $1.25\,\mathrm{MW}$ Smith–Putnam turbine on Grandpa's Knob, Vermont, first turned in August 1941 and was the first megawatt-class machine; Johannes **Juul**'s $200\,\mathrm{kW}$ three-bladed Gedser turbine (1957), with stall regulation and aerodynamic tip brakes, set the pattern of the "Danish concept" from which the modern industry grew.
:::

::: summary
- Wind power through an area is $\tfrac12\rho Av^3$; the cube makes hub height, site selection and wind statistics decisive.
- Actuator-disc theory gives $C_P = 4a(1-a)^2$, maximised at $a = 1/3$: no rotor in an open stream can extract more than $16/27 = 59.3\,\%$ (Betz). Real rotors reach $0.45$–$0.50$.
- Optimal operation holds the tip-speed ratio near its best value (about $7$–$9$) below rated wind; above rated the blades pitch to hold $P_r$.
- Weibull statistics give $\overline{v^3} = c^3\Gamma(1+3/k)$; for Rayleigh winds the mean power density is $1.91$ times that computed from the mean speed. Annual energy comes from integrating the power curve over the distribution.
- Hydro power is $\eta\rho gQH$ with net head $H = H_g - kQ^2$; a pipe delivers most power when it loses a third of the head, but good designs lose a few per cent.
- Pelton wheels (high head), Francis (medium) and Kaplan (low head, large flow) are chosen by specific speed; a Pelton bucket should move at about half the jet speed.
- Tidal stream obeys the wind equations with seawater density; tidal range stores $\tfrac12\rho gAR^2$ per tide.
:::

## Exercises {#sec-exercises}

::: exercise Wind power density {#exr-density level=1 check="314"}
Find the power density of an $8.0\,\mathrm{m/s}$ wind at sea-level density $\rho = 1.225\,\mathrm{kg/m^3}$. (Enter the power density in W/m², rounded to the nearest whole number.)
::: solution
$P/A = \tfrac12\rho v^3 = 0.5 \times 1.225 \times 512 = 313.6\,\mathrm{W/m^2}$, which rounds to $314\,\mathrm{W/m^2}$. At $16\,\mathrm{m/s}$ it would be eight times as much.
:::
:::

::: exercise Output of a mid-size rotor {#exr-rotor-power level=1 check="1.47"}
A turbine with a $100\,\mathrm{m}$ rotor has $C_P = 0.42$ at $9.0\,\mathrm{m/s}$. With $\rho = 1.225\,\mathrm{kg/m^3}$, what power does it deliver? (Enter the power in MW to three significant figures.)
::: solution
$A = \pi \times 50^2 = 7854\,\mathrm{m^2}$, $P_\text{wind} = 0.5 \times 1.225 \times 7854 \times 729 = 3.507\,\mathrm{MW}$, so $P = 0.42 \times 3.507 = 1.47\,\mathrm{MW}$.
:::
:::

::: exercise Hydro output {#exr-hydro level=1 check="4.41"}
A turbine with efficiency $0.90$ uses a flow of $10\,\mathrm{m^3/s}$ under a net head of $50\,\mathrm{m}$. Take $g = 9.81\,\mathrm{m/s^2}$ and $\rho = 1000\,\mathrm{kg/m^3}$. Find the shaft power. (Enter the power in MW to three significant figures.)
::: solution
By [[#eq-hydro]], $P = 0.90 \times 1000 \times 9.81 \times 10 \times 50 = 4.4145\times10^{6}\,\mathrm{W}$, i.e. $4.41\,\mathrm{MW}$. The same power from wind at $10\,\mathrm{m/s}$ with $C_P = 0.45$ needs a swept area of $16\,000\,\mathrm{m^2}$ — a $143\,\mathrm{m}$ rotor; water is $800$ times denser than air.
:::
:::

::: exercise Rotor speed for optimum tip-speed ratio {#exr-rpm level=2 check="8.59"}
A rotor of radius $75\,\mathrm{m}$ is operated at its optimum tip-speed ratio of $7.5$. At what rotational speed should it turn when the wind is $9.0\,\mathrm{m/s}$? (Enter the speed in rpm to three significant figures.)
::: solution
$\omega = \lambda v/R = 7.5 \times 9.0/75 = 0.900\,\mathrm{rad/s}$, so $N = 0.900 \times 60/(2\pi) = 8.594\,\mathrm{rpm} \approx 8.59\,\mathrm{rpm}$. The tip moves at $67.5\,\mathrm{m/s}$. Large offshore rotors turn this slowly, which is why direct-drive generators for them have very large diameters.
:::
:::

::: exercise Mean power density of a Rayleigh site {#exr-weibull level=2 check="279"}
A site has Rayleigh-distributed wind ($k = 2$) with scale parameter $c = 7.0\,\mathrm{m/s}$ and $\rho = 1.225\,\mathrm{kg/m^3}$. Using $\Gamma(2.5) = 1.3293$, find the mean wind power density, and compare it with the value computed from the mean speed. (Enter the mean wind power density in W/m², rounded to the nearest whole number.)
::: solution
By [[#eq-weibull-power]], $\overline{P/A} = 0.5 \times 1.225 \times 7.0^3 \times 1.3293 = 279.3\,\mathrm{W/m^2} \approx 279\,\mathrm{W/m^2}$. The mean speed is $0.886 \times 7.0 = 6.20\,\mathrm{m/s}$, giving $\tfrac12 \times 1.225 \times 6.20^3 = 146\,\mathrm{W/m^2}$ — low by the factor $1.91$.
:::
:::

::: exercise Pelton runner diameter {#exr-pelton level=2 check="1.91"}
A Pelton wheel works under a net head of $600\,\mathrm{m}$ with nozzle coefficient $C_v = 0.98$ and bucket-to-jet speed ratio $0.47$, driving a $12$-pole generator on a $50\,\mathrm{Hz}$ grid. Take $g = 9.81\,\mathrm{m/s^2}$. Find the pitch diameter of the runner. (Enter the diameter in m to three significant figures.)
::: solution
$V_j = 0.98\sqrt{2 \times 9.81 \times 600} = 0.98 \times 108.5 = 106.3\,\mathrm{m/s}$; $u = 0.47 \times 106.3 = 49.97\,\mathrm{m/s}$. $N = 120 \times 50/12 = 500\,\mathrm{rpm}$, $\omega = 52.36\,\mathrm{rad/s}$. $D = 2u/\omega = 99.94/52.36 = 1.909\,\mathrm{m}$, i.e. $1.91\,\mathrm{m}$. Diameter scales as $\sqrt{H}$ at fixed speed: $1.56 \times \sqrt{600/400} = 1.91\,\mathrm{m}$, consistent with [[#ex-pelton]].
:::
:::

::: exercise Energy in a tidal basin {#exr-tidal level=2 check="1.79"}
A tidal basin of area $20\,\mathrm{km^2}$ has a tidal range of $8.0\,\mathrm{m}$. Using [[#eq-tidal]] with $\rho = 1025\,\mathrm{kg/m^3}$ and $g = 9.81\,\mathrm{m/s^2}$, find the ideal energy released by emptying the basin once. Then estimate the ideal average power with two tides per $24.84\,\mathrm{h}$. (Enter the energy per tide in GWh to three significant figures.)
::: solution
$E = \tfrac12 \times 1025 \times 9.81 \times 20\times10^{6} \times 8.0^2 = 6.44\times10^{12}\,\mathrm{J}$; divided by $3.6\times10^{12}\,\mathrm{J/GWh}$ this is $1.79\,\mathrm{GWh}$. Average power: $6.44\times10^{12}/(12.42 \times 3600) = 144\,\mathrm{MW}$. The Rance barrage, with a similar basin and range, produces about $500\,\mathrm{GWh}$ a year, an average of about $57\,\mathrm{MW}$ — well under half the ideal, because the turbines cannot use the last metres of head, operation is limited to part of each tide, and the basin is not drained instantly.
:::
:::

::: exercise Maximum power from a given penstock {#exr-penstock level=3 check="2.95"}
(a) Show that for a gross head $H_g$ and penstock loss $h_L = kQ^2$, the hydraulic power at the turbine, $\rho gQ(H_g - kQ^2)$, is greatest when $h_L = H_g/3$. (b) For the scheme of [[#ex-small-hydro]] ($H_g = 80\,\mathrm{m}$, $k = 0.84\,\mathrm{s^2/m^5}$), find that maximum hydraulic power. Use $\rho = 1000\,\mathrm{kg/m^3}$ and $g = 9.81\,\mathrm{m/s^2}$. (c) Why is this not the design point? (Enter the maximum hydraulic power of (b) in MW to three significant figures.)
::: solution
(a) $P_h(Q) = \rho g(H_gQ - kQ^3)$; $dP_h/dQ = \rho g(H_g - 3kQ^2) = 0$ gives $kQ^2 = H_g/3$, and $d^2P_h/dQ^2 = -6\rho gkQ < 0$, a maximum. The net head there is $\tfrac23H_g$.

(b) $Q = \sqrt{80/(3 \times 0.84)} = 5.634\,\mathrm{m^3/s}$, and $P_h = 1000 \times 9.81 \times 5.634 \times \tfrac23 \times 80 = 2.948\times10^{6}\,\mathrm{W} = 2.95\,\mathrm{MW}$.

(c) At that point a third of the water's energy is dissipated as heat in the pipe for the whole life of the plant; a larger penstock costs more once but recovers that energy every year. The design flow also depends on the river's flow-duration curve: a flow available only a few weeks a year does not justify the turbine to use it.
:::
:::

::: exercise Derivation: the energy pattern factor {#exr-epf level=3 check="1.91"}
(a) Using the moments of the Weibull distribution, show that the energy pattern factor $K_e = \overline{v^3}/\bar v^{\,3}$ is $6/\pi$ for $k = 2$. (b) Show that $K_e \to 1$ as $k \to \infty$ and interpret this. (c) Compute $K_e$ for $k = 3$ using $\Gamma(2) = 1$ and $\Gamma(4/3) = 0.8930$. (Enter the value of $K_e$ for $k = 2$ to three significant figures.)
::: solution
(a) From [[#prop-mean-power]], $K_e = \Gamma(1 + 3/k)/\Gamma(1 + 1/k)^3$. For $k = 2$, $\Gamma(5/2) = \tfrac32 \cdot \tfrac12\sqrt\pi = \tfrac34\sqrt\pi$ and $\Gamma(3/2) = \tfrac12\sqrt\pi$, so $K_e = \tfrac34\sqrt\pi \big/ \tfrac18\pi^{3/2} = 6/\pi = 1.9099 \approx 1.91$.

(b) As $k \to \infty$, both $\Gamma(1 + 3/k)$ and $\Gamma(1 + 1/k)$ tend to $\Gamma(1) = 1$, so $K_e \to 1$. A very large $k$ means the distribution collapses onto $v = c$: a perfectly steady wind, for which the mean of the cube is the cube of the mean.

(c) $K_e = 1/0.8930^3 = 1/0.7121 = 1.40$. Steadier winds ($k = 3$, as in trade-wind regions) have less of their energy in rare gusts.
:::
:::

::: exercise Design: power for a remote valley {#exr-design level=3}
A remote valley community needs an average of $150\,\mathrm{kW}$ with peaks of $400\,\mathrm{kW}$. A stream offers $0.30\,\mathrm{m^3/s}$ for nine months a year (dropping to $0.08\,\mathrm{m^3/s}$ in late summer) with $120\,\mathrm{m}$ of gross head over a $1.5\,\mathrm{km}$ route. A nearby ridge has a measured hub-height mean wind of $6.5\,\mathrm{m/s}$ (assume Rayleigh). Propose a supply: choose the hydro design flow, penstock diameter (aim for a few per cent head loss with $f \approx 0.015$), turbine type (check the specific speed), and decide whether a wind turbine, storage or a backup generator is needed for the dry season. Support every choice with a number. There is no single answer.
::: solution
One reasoned design. *Hydro:* design for $Q = 0.25\,\mathrm{m^3/s}$ (available most of the year). For $5\,\%$ loss, $h_L \approx 6\,\mathrm{m}$: with $D = 0.45\,\mathrm{m}$, $V = 1.57\,\mathrm{m/s}$ and $h_L = 0.015 \times (1500/0.45) \times 1.57^2/19.62 = 6.3\,\mathrm{m}$ — acceptable. Net head $\approx 114\,\mathrm{m}$, electrical output $\approx 0.80 \times 9.81 \times 0.25 \times 114 = 224\,\mathrm{kW}$. At $N = 1500\,\mathrm{rpm}$ (4 poles, $50\,\mathrm{Hz}$), $N_s = 1500\sqrt{250}/114^{1.25} \approx 64$: a small Francis, or a multi-jet Pelton or a Turgo wheel at lower speed (at $750\,\mathrm{rpm}$ with two jets, $N_s \approx 23$ per jet). A Pelton or Turgo keeps good efficiency at part flow, which matters in the dry season. *Dry season:* at $0.08\,\mathrm{m^3/s}$ the plant gives about $70\,\mathrm{kW}$ — less than half the average demand. *Wind:* a Rayleigh site with $\bar v = 6.5\,\mathrm{m/s}$ ($c = 7.3\,\mathrm{m/s}$) has about $320\,\mathrm{W/m^2}$ of resource; a $250\,\mathrm{kW}$ turbine with a $30\,\mathrm{m}$ rotor might average $60$–$70\,\mathrm{kW}$ (capacity factor about $0.25$), roughly closing the dry-season gap on average. *Peaks and calms:* a battery of a few hundred kWh smooths the $400\,\mathrm{kW}$ evening peaks, and a diesel set is still prudent for calm dry spells. A good answer also notes the environmental flow that must be left in the stream, which reduces the usable flow further.
:::
:::
