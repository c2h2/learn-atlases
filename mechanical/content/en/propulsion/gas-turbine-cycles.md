The previous chapter, [[propulsion/thrust-efficiency]], treated an engine as a black box that takes in air at $V_0$ and throws it out at $V_e$. This chapter opens the box. Every gas-turbine engine — turbojet, turbofan, turboprop — and its compressor-less cousin, the ramjet, is an open-flow realisation of the **Brayton cycle**: compress the air, add heat at roughly constant pressure, expand the hot gas. What makes an aircraft engine different from a power-station gas turbine is the use made of the expansion. A power turbine extracts all of it as shaft work; a turbojet extracts only enough to drive its compressor and leaves the rest as a fast jet; a turbofan uses part of it to drive a fan that accelerates a much larger, slower stream; a turboprop drives a propeller through a gearbox.

We will build the analysis from the bottom up: stagnation quantities and the station numbering that every engine company uses; the ideal Brayton cycle and its efficiency; **parametric cycle analysis** of the ideal turbojet, which gives specific thrust and fuel consumption as explicit functions of flight Mach number, compressor pressure ratio and turbine inlet temperature; the effect of real component losses; and then the turbofan, the ramjet and the turboprop. The thermodynamics is that of [[thermodynamics/power-cycles]], the gas dynamics that of [[fluid-mechanics/compressible-flow]].

## Stations and stagnation quantities

::: definition Engine station numbering {#def-stations}
Following the SAE convention (ARP 755), the stations of a turbojet or the core of a turbofan are: **0** free stream far upstream; **1** inlet lip; **2** compressor (or fan) face; **3** compressor exit; **4** combustor exit = turbine inlet; **5** turbine exit; **7** nozzle inlet; **9** nozzle exit. In a turbofan the bypass stream has its own numbers in the teens: **13** fan exit, **19** fan nozzle exit. An afterburner sits between 5 and 7.
:::

Inside an engine the gas velocity changes from almost zero (in the combustor) to over a kilometre per second (in a nozzle), so static temperature and pressure are awkward variables: they change even where no work or heat is exchanged. **Stagnation** (total) quantities do not.

::: definition Stagnation temperature and pressure; component ratios {#def-stagnation}
For a perfect gas with constant $c_p$ and $\gamma$, the **stagnation temperature** and **stagnation pressure** of a flow at static state $(T, p)$, velocity $V$ and Mach number $M$ are
$$
T_t = T + \frac{V^2}{2c_p} = T\left(1 + \frac{\gamma-1}{2}M^2\right),
\qquad
p_t = p\left(\frac{T_t}{T}\right)^{\gamma/(\gamma-1)} .
$$
We describe each component by its stagnation-temperature ratio $\tau$ and stagnation-pressure ratio $\pi$ (exit over entry): $\tau_c = T_{t3}/T_{t2}$, $\pi_c = p_{t3}/p_{t2}$ for the compressor, $\tau_t = T_{t5}/T_{t4}$, $\pi_t$ for the turbine, $\pi_d = p_{t2}/p_{t0}$ for the inlet (diffuser), $\pi_b = p_{t4}/p_{t3}$ for the burner, $\pi_n = p_{t9}/p_{t7}$ for the nozzle. The free stream itself gets the **ram ratios**
$$
\tau_r = \frac{T_{t0}}{T_0} = 1 + \frac{\gamma-1}{2}M_0^2,\qquad \pi_r = \frac{p_{t0}}{p_0} = \tau_r^{\gamma/(\gamma-1)},
$$
and the cycle temperature limit is expressed as $\tau_\lambda = c_{p}T_{t4}/(c_p T_0)$, which for constant $c_p$ is simply $T_{t4}/T_0$.
:::

Two facts make stagnation quantities so useful. First, by the steady-flow energy equation ([[thermodynamics/first-law-open]]), the specific work done on the gas by a compressor is $c_p(T_{t3} - T_{t2})$, kinetic energy included, and in an adiabatic duct with no work $T_t$ is constant whatever the velocity does. Second, for an isentropic process the stagnation ratios obey the same isentropic relation as static ones, $\tau = \pi^{(\gamma-1)/\gamma}$; any loss shows up as a fall in $p_t$ with no change in $T_t$, which is why inlets, burners and nozzles are rated by a pressure ratio $\pi < 1$.

::: warning Stagnation versus static, and kelvin always
Two mistakes account for most wrong cycle calculations. (1) Mixing static and stagnation values: at Mach 0.8 and $11\ \mathrm{km}$ the free-stream static temperature is $216.7\ \mathrm{K}$ but the stagnation temperature entering the compressor is $244.4\ \mathrm{K}$, and the stagnation pressure is $52\,\%$ above the static. Use $T_t$, $p_t$ for components and convert to static only at the nozzle exit, where the jet velocity is needed. (2) Using degrees Celsius: every ratio $\tau$ and every isentropic relation needs absolute temperature. A "turbine inlet temperature of $1500\,^\circ\mathrm{C}$" is $1773\ \mathrm{K}$.
:::

## The ideal Brayton cycle

::: proposition Thermal efficiency of the ideal Brayton cycle {#prop-brayton}
For a perfect gas with constant $c_p$ and $\gamma$, undergoing isentropic compression from $T_a$ to $T_b$ through overall pressure ratio $\pi$, heat addition at constant pressure, isentropic expansion back to the starting pressure, and heat rejection at constant pressure, the thermal efficiency is
$$
\eta_{th} = 1 - \frac{T_a}{T_b} = 1 - \frac{1}{\pi^{(\gamma-1)/\gamma}} .
$$ {#eq-brayton}
For an aircraft engine the compression is shared between ram and compressor, $\pi = \pi_r \pi_c$, so $\eta_{th} = 1 - 1/(\tau_r \tau_c)$.
:::

::: proof
Label the cycle $a$ (start of compression), $b$ (end of compression), $c$ (end of heat addition), $d$ (end of expansion). Heat in $q_{in} = c_p(T_c - T_b)$, heat out $q_{out} = c_p(T_d - T_a)$, and $\eta_{th} = 1 - q_{out}/q_{in}$. Both processes $a\to b$ and $c \to d$ are isentropic between the same two pressures, so
$$
\frac{T_b}{T_a} = \frac{T_c}{T_d} = \pi^{(\gamma-1)/\gamma}
\quad\Longrightarrow\quad
\frac{T_d - T_a}{T_c - T_b} = \frac{T_a}{T_b},
$$
because $T_d = T_c T_a/T_b$ gives $T_d - T_a = (T_a/T_b)(T_c - T_b)$. Hence $\eta_{th} = 1 - T_a/T_b$. In flight, the air is compressed first by the ram effect from $T_0$ to $T_{t0} = \tau_r T_0$ and then by the compressor by $\tau_c$, both isentropic in the ideal case, so $T_b/T_a = \tau_r\tau_c$. The open-cycle engine "rejects heat" by exhausting hot gas to the atmosphere, which then cools at the ambient pressure — the constant-pressure closing process. Assumptions: perfect gas, constant $c_p$ and $\gamma$, mass of fuel negligible, all processes reversible except the heat exchanges themselves.
:::

Note what [[#eq-brayton]] does **not** contain: the turbine inlet temperature. The ideal cycle efficiency depends only on the overall pressure ratio. Raising $T_{t4}$ increases the work per kilogram of air — hence thrust per unit mass flow, hence a smaller engine — but not the ideal efficiency. In real engines a higher $T_{t4}$ does raise the efficiency, because it makes the fixed component losses a smaller fraction of a larger work output, and because it allows a higher useful pressure ratio.

## Parametric analysis of the ideal turbojet

In a turbojet the turbine produces exactly the work the compressor absorbs; what is left is expanded through the nozzle. **Parametric (design-point) cycle analysis**, as developed by Kerrebrock and by Mattingly, computes the performance of a family of engines at a single design condition, with the choice of design variables left open, so that the designer can see trends before any hardware exists.

::: proposition Ideal turbojet performance {#prop-ideal-turbojet}
For an ideal turbojet (all components isentropic, perfect gas with constant $c_p$ and $\gamma$ throughout, fuel mass negligible, nozzle perfectly expanded to $p_9 = p_0$), with $a_0 = \sqrt{\gamma R T_0}$:
$$
\tau_t = 1 - \frac{\tau_r}{\tau_\lambda}(\tau_c - 1),
\qquad
\frac{V_9}{a_0} = \sqrt{\frac{2}{\gamma-1}\,\frac{\tau_\lambda}{\tau_r\tau_c}\,\left(\tau_r\tau_c\tau_t - 1\right)},
$$ {#eq-v9}
$$
\frac{F}{\dot m_0} = a_0\left(\frac{V_9}{a_0} - M_0\right),
\qquad
f = \frac{c_p T_0}{h_{PR}}\left(\tau_\lambda - \tau_r\tau_c\right),
\qquad
\mathrm{TSFC} = \frac{f}{F/\dot m_0}.
$$ {#eq-turbojet}
:::

::: proof
**Turbine.** The turbine drives the compressor, so per unit air mass $c_p(T_{t4} - T_{t5}) = c_p(T_{t3} - T_{t2})$. Divide by $c_p T_{t4}$ and use $T_{t2} = T_{t0} = \tau_r T_0$ (adiabatic inlet) and $T_{t4} = \tau_\lambda T_0$:
$$
1 - \tau_t = \frac{\tau_r T_0 (\tau_c - 1)}{\tau_\lambda T_0}
\quad\Longrightarrow\quad
\tau_t = 1 - \frac{\tau_r}{\tau_\lambda}(\tau_c - 1).
$$
**Nozzle exit.** All components are isentropic, so the stagnation pressure at the nozzle exit is $p_{t9} = p_0\,\pi_r\pi_c\pi_t$ (with $\pi_d = \pi_b = \pi_n = 1$), and since each $\pi = \tau^{\gamma/(\gamma-1)}$, $p_{t9}/p_9 = (\tau_r\tau_c\tau_t)^{\gamma/(\gamma-1)}$ for $p_9 = p_0$. The isentropic relation then gives $T_{t9}/T_9 = \tau_r\tau_c\tau_t$. The nozzle is adiabatic, so $T_{t9} = T_{t5} = \tau_\lambda \tau_t T_0$, and the jet kinetic energy is
$$
V_9^2 = 2c_p(T_{t9} - T_9) = 2c_p T_{t9}\left(1 - \frac{1}{\tau_r\tau_c\tau_t}\right)
= 2 c_p T_0\, \frac{\tau_\lambda}{\tau_r\tau_c}\left(\tau_r\tau_c\tau_t - 1\right).
$$
Divide by $a_0^2 = \gamma R T_0 = (\gamma-1)c_p T_0$ to obtain [[#eq-v9]].
**Thrust and fuel.** With $f \ll 1$ and $p_9 = p_0$, the thrust equation of [[propulsion/thrust-efficiency]] reduces to $F/\dot m_0 = V_9 - V_0$ with $V_0 = a_0 M_0$. The burner energy balance, with fuel mass neglected in the flow but not in the heat release, is $\dot m_f h_{PR} = \dot m_0 c_p(T_{t4} - T_{t3})$; with $T_{t3} = \tau_r\tau_c T_0$ this gives $f = c_p T_0(\tau_\lambda - \tau_r\tau_c)/h_{PR}$.
:::

The equations reveal a constraint: the compressor cannot heat the air beyond the turbine inlet temperature ($\tau_r\tau_c < \tau_\lambda$), and the turbine cannot be asked for more work than is available. They also reveal an optimum.

::: proposition Compressor pressure ratio for maximum specific thrust {#prop-opt-pic}
At fixed $M_0$, $T_0$ and $T_{t4}$, the specific thrust of the ideal turbojet is greatest when
$$
\tau_c = \frac{\sqrt{\tau_\lambda}}{\tau_r},
\qquad\text{i.e.}\qquad
T_{t3} = \sqrt{T_0\,T_{t4}} .
$$ {#eq-opt-pic}
:::

::: proof
$F/\dot m_0$ increases with $V_9$, so it suffices to maximise $(V_9/a_0)^2 \propto \frac{\tau_\lambda}{\tau_r\tau_c}(\tau_r\tau_c\tau_t - 1)$. Substitute $\tau_t$:
$$
\frac{\tau_\lambda}{\tau_r\tau_c}\left[\tau_r\tau_c - \frac{\tau_r^2\tau_c}{\tau_\lambda}(\tau_c - 1) - 1\right]
= \tau_\lambda - \tau_r(\tau_c - 1) - \frac{\tau_\lambda}{\tau_r\tau_c}.
$$
Differentiating with respect to $\tau_c$ gives $-\tau_r + \tau_\lambda/(\tau_r\tau_c^2)$, which vanishes at $\tau_c^2 = \tau_\lambda/\tau_r^2$; the second derivative $-2\tau_\lambda/(\tau_r\tau_c^3) < 0$ confirms a maximum. Then $T_{t3} = \tau_r\tau_c T_0 = \sqrt{\tau_\lambda}\,T_0 = \sqrt{T_0 T_{t4}}$: the compressor-exit temperature is the geometric mean of the cycle's lowest and highest temperatures.
:::

Efficiency keeps rising beyond this optimum (by [[#eq-brayton]]), while specific thrust falls. A designer chasing fuel economy therefore chooses pressure ratios well above the specific-thrust optimum, and the limit comes instead from compressor size, weight, stability and the temperature at its exit.

::: example Ideal turbojet at subsonic cruise {#ex-ideal-turbojet}
An ideal turbojet flies at $M_0 = 0.80$ at $11\ \mathrm{km}$ ($T_0 = 216.65\ \mathrm{K}$, $p_0 = 22.63\ \mathrm{kPa}$, International Standard Atmosphere) with $\pi_c = 20$ and $T_{t4} = 1500\ \mathrm{K}$. Take $\gamma = 1.4$, $c_p = 1004.5\ \mathrm{J/(kg\,K)}$, $h_{PR} = 43\ \mathrm{MJ/kg}$. Find the specific thrust, fuel–air ratio, TSFC and the thermal, propulsive and overall efficiencies.
::: solution
$a_0 = \sqrt{1.4 \times 287 \times 216.65} = 295.0\ \mathrm{m/s}$, $V_0 = 236.0\ \mathrm{m/s}$.
$$
\tau_r = 1 + 0.2\times0.8^2 = 1.128,\quad
\tau_c = 20^{0.2857} = 2.3535,\quad
\tau_\lambda = \frac{1500}{216.65} = 6.9236 .
$$
Turbine: $\tau_t = 1 - (1.128/6.9236)(1.3535) = 0.7795$, so $T_{t5} = 1169\ \mathrm{K}$ and the turbine pressure ratio is $\pi_t = 0.7795^{3.5} = 0.418$.
Jet: $\tau_r\tau_c\tau_t = 2.0694$, and
$$
\frac{V_9}{a_0} = \sqrt{5 \times \frac{6.9236}{2.6548} \times 1.0694} = 3.734,\qquad V_9 = 1102\ \mathrm{m/s}.
$$
Then
$$
\frac{F}{\dot m_0} = 1102 - 236 = 866\ \mathrm{N\,s/kg},\qquad
f = \frac{1004.5 \times 216.65}{43\times10^{6}}\left(6.9236 - 2.6548\right) = 0.0216,
$$
$$
\mathrm{TSFC} = \frac{0.0216}{866} = 2.50\times10^{-5}\ \mathrm{kg/(N\,s)} = 25.0\ \mathrm{g/(kN\,s)}.
$$
Efficiencies: $\eta_{th} = 1 - 1/(1.128 \times 2.3535) = 0.623$; $\eta_p = 2V_0/(V_9 + V_0) = 0.353$; $\eta_o = 0.623 \times 0.353 = 0.220$.

**Check.** The optimum of [[#eq-opt-pic]] is $\tau_c = \sqrt{6.9236}/1.128 = 2.333$, $\pi_c = 19.4$: this design sits almost exactly at the specific-thrust optimum. The thermal efficiency is excellent but the propulsive efficiency is poor — the jet is nearly five times faster than the aircraft. That is the turbojet's fundamental weakness at subsonic speed.
:::
:::

::: widget plot
f: 295.04*(sqrt(5*(T/216.65)/((1+0.2*M^2)*x^(1/3.5))*((1+0.2*M^2)*x^(1/3.5)*(1 - (1+0.2*M^2)*(x^(1/3.5) - 1)/(T/216.65)) - 1)) - M)
x: 1, 60
y: 0, 1300
sliders: M=0.8:0:3:0.05; T=1500:1000:2200:25
labels: F/\dot m_0\ (\mathrm{N\,s/kg})
points: 20, 866
caption: Specific thrust of the ideal turbojet at $11\ \mathrm{km}$ against compressor pressure ratio $\pi_c$ (horizontal axis), for flight Mach number $M$ and turbine inlet temperature $T$ (K). The marked point is example [[#ex-ideal-turbojet]]. Find the peak and compare it with $\pi_c = (\sqrt{\tau_\lambda}/\tau_r)^{3.5}$; then raise $M$ towards 3 and watch the optimum pressure ratio collapse — at high Mach number the ram compression does the compressor's job, and the curve ends where $T_{t3}$ reaches $T_{t4}$.
:::

## Real components

Real compressors and turbines generate entropy; real inlets, combustors and nozzles lose stagnation pressure; combustion is not quite complete; the hot gas has a higher $c_p$ and lower $\gamma$ than cold air; and the turbine must also supply bearing friction and accessories. Each effect is captured by one figure of merit.

::: definition Component figures of merit {#def-component-eff}
- **Inlet** pressure recovery $\pi_d = p_{t2}/p_{t0}$ (0.97–0.99 subsonic; lower at supersonic speed, see [[propulsion/inlets-nozzles]]).
- **Compressor isentropic efficiency** $\eta_c = \dfrac{T_{t3s} - T_{t2}}{T_{t3} - T_{t2}} = \dfrac{\pi_c^{(\gamma-1)/\gamma} - 1}{\tau_c - 1}$, ideal work over actual work for the same pressure ratio.
- **Burner** pressure ratio $\pi_b = p_{t4}/p_{t3}$ (0.94–0.97) and **combustion efficiency** $\eta_b$, the fraction of the fuel's heating value actually released (above 0.99 at design).
- **Turbine isentropic efficiency** $\eta_t = \dfrac{T_{t4} - T_{t5}}{T_{t4} - T_{t5s}} = \dfrac{1 - \tau_t}{1 - \pi_t^{(\gamma_t-1)/\gamma_t}}$, actual work over ideal work for the same pressure ratio.
- **Mechanical efficiency** $\eta_m$ of the spool (above 0.99) and **nozzle** pressure ratio $\pi_n = p_{t9}/p_{t7}$.
:::

Compressor and turbine efficiencies are defined in opposite directions — the compressor needs *more* work than ideal, the turbine *gives less* — so both are below 1. The polytropic (small-stage) efficiency, which makes a fairer comparison between machines of different pressure ratio, is introduced in [[propulsion/compressors]] and [[propulsion/turbines]].

::: algorithm Real turbojet cycle analysis {#alg-real-cycle}
Given flight condition ($M_0$, $T_0$, $p_0$), design choices ($\pi_c$, $T_{t4}$), component figures of merit, cold-gas properties $c_{pc}, \gamma_c$ upstream of the burner and hot-gas properties $c_{ph}, \gamma_h$ downstream:
1. Free stream: $T_{t0} = \tau_r T_0$, $p_{t0} = \pi_r p_0$, $V_0 = M_0 a_0$.
2. Inlet: $T_{t2} = T_{t0}$, $p_{t2} = \pi_d p_{t0}$.
3. Compressor: $T_{t3s} = T_{t2}\pi_c^{(\gamma_c-1)/\gamma_c}$, $T_{t3} = T_{t2} + (T_{t3s} - T_{t2})/\eta_c$, $p_{t3} = \pi_c p_{t2}$.
4. Burner energy balance per kg of air: $c_{pc}T_{t3} + f\,\eta_b h_{PR} = (1+f)\,c_{ph} T_{t4}$, so $f = \dfrac{c_{ph}T_{t4} - c_{pc}T_{t3}}{\eta_b h_{PR} - c_{ph}T_{t4}}$; $p_{t4} = \pi_b p_{t3}$.
5. Turbine work balance: $\eta_m (1+f) c_{ph}(T_{t4} - T_{t5}) = c_{pc}(T_{t3} - T_{t2})$ gives $T_{t5}$; then $T_{t5s} = T_{t4} - (T_{t4} - T_{t5})/\eta_t$ and $p_{t5} = p_{t4}(T_{t5s}/T_{t4})^{\gamma_h/(\gamma_h-1)}$.
6. Nozzle: $p_{t9} = \pi_n p_{t5}$, $T_{t9} = T_{t5}$; for perfect expansion $T_9 = T_{t9}(p_0/p_{t9})^{(\gamma_h-1)/\gamma_h}$ and $V_9 = \sqrt{2c_{ph}(T_{t9} - T_9)}$. (If $p_{t9}/p_0$ exceeds the critical ratio and the nozzle is convergent, use the choked exit and add the pressure thrust.)
7. Performance: $F/\dot m_0 = (1+f)V_9 - V_0 + (p_9 - p_0)A_9/\dot m_0$, $\mathrm{TSFC} = f/(F/\dot m_0)$.
:::

::: example The same turbojet with real components {#ex-real-turbojet}
Repeat example [[#ex-ideal-turbojet]] with $\pi_d = 0.98$, $\eta_c = 0.86$, $\pi_b = 0.96$, $\eta_b = 0.99$, $\eta_t = 0.90$, $\eta_m = 1$, $\pi_n = 0.98$, perfectly expanded nozzle, and hot gas with $c_{ph} = 1150\ \mathrm{J/(kg\,K)}$, $\gamma_h = 1.33$.
::: solution
1–2. $T_{t2} = 244.4\ \mathrm{K}$; $p_{t0} = 22.63 \times 1.128^{3.5} = 34.50\ \mathrm{kPa}$, $p_{t2} = 33.81\ \mathrm{kPa}$.
3. $T_{t3s} = 244.4 \times 2.3535 = 575.2\ \mathrm{K}$; $T_{t3} = 244.4 + 330.8/0.86 = 629.0\ \mathrm{K}$; $p_{t3} = 676.2\ \mathrm{kPa}$.
4. $f = \dfrac{1150 \times 1500 - 1004.5 \times 629.0}{0.99 \times 43\times10^{6} - 1150 \times 1500} = \dfrac{1.0932\times10^{6}}{4.0845\times10^{7}} = 0.0268$; $p_{t4} = 649.1\ \mathrm{kPa}$.
5. Compressor work $c_{pc}(T_{t3} - T_{t2}) = 386.3\ \mathrm{kJ/kg}$, so $T_{t5} = 1500 - 386.3\times10^{3}/(1.0268 \times 1150) = 1172.8\ \mathrm{K}$; $T_{t5s} = 1500 - 327.2/0.90 = 1136.4\ \mathrm{K}$; $p_{t5} = 649.1 \times (1136.4/1500)^{4.03} = 212.1\ \mathrm{kPa}$.
6. $p_{t9} = 207.8\ \mathrm{kPa}$; $T_9 = 1172.8 \times (22.63/207.8)^{0.2481} = 676.5\ \mathrm{K}$; $V_9 = \sqrt{2 \times 1150 \times 496.3} = 1068\ \mathrm{m/s}$.
7. $F/\dot m_0 = 1.0268 \times 1068 - 236.0 = 861\ \mathrm{N\,s/kg}$; $\mathrm{TSFC} = 0.0268/861 = 31.1\ \mathrm{g/(kN\,s)}$.

**Check and interpretation.** The specific thrust is almost unchanged (861 against 866 N s/kg). The compressor losses raise $T_{t3}$ to $629\ \mathrm{K}$ instead of $575\ \mathrm{K}$, but the burner must still take the gas to $1500\ \mathrm{K}$, and with the hot gas's larger $c_p$ it needs *more* fuel per kilogram of air ($f = 0.0268$ against $0.0216$); much of that extra energy reappears in the jet, which offsets the pressure losses. The fuel consumption is therefore $25\,\%$ worse, and the overall efficiency falls from $0.220$ to $V_0/(\mathrm{TSFC}\,h_{PR}) = 0.177$. The lesson is general: component losses cost far more in fuel economy than in thrust.
:::
:::

## The turbofan

A turbofan splits the incoming air. The **core** stream ($\dot m_c$) passes through the compressor, burner and turbine as in a turbojet; the **bypass** stream ($\dot m_F$) is compressed only by the fan and expanded in its own nozzle. The ratio $\alpha = \dot m_F/\dot m_c$ is the **bypass ratio**. The turbine now drives the fan as well as the compressor, so it extracts more energy from the core and the core jet slows down; the energy reappears as a large, slow fan stream. That is precisely the trade recommended by the propulsive efficiency of [[propulsion/thrust-efficiency]].

For an ideal separate-flow turbofan with fan temperature ratio $\tau_f$ (the fan also compresses the core air, and $\tau_c$ here denotes the *overall* core compression), the turbine work balance becomes
$$
\tau_t = 1 - \frac{\tau_r}{\tau_\lambda}\left[(\tau_c - 1) + \alpha(\tau_f - 1)\right],
$$ {#eq-tf-turbine}
the core jet is given by [[#eq-v9]] with this $\tau_t$, the fan jet by
$$
\frac{V_{19}}{a_0} = \sqrt{\frac{2}{\gamma - 1}\left(\tau_r\tau_f - 1\right)},
$$
and the thrust per unit *total* air flow and the TSFC are
$$
\frac{F}{\dot m_0} = \frac{a_0}{1+\alpha}\left[\left(\frac{V_9}{a_0} - M_0\right) + \alpha\left(\frac{V_{19}}{a_0} - M_0\right)\right],
\qquad
\mathrm{TSFC} = \frac{f}{(1+\alpha)\,F/\dot m_0},
$$ {#eq-tf-thrust}
with $f$ the core fuel–air ratio, unchanged from [[#eq-turbojet]]. (The derivations are the turbojet's, line by line.)

::: proposition Optimum fan pressure ratio {#prop-opt-fan}
For an ideal separate-flow turbofan at fixed $M_0$, $\tau_\lambda$, $\tau_c$ and $\alpha$, the fan pressure ratio that maximises specific thrust — and, since the fuel flow is then fixed, minimises TSFC — is the one that makes the two jet velocities equal, $V_9 = V_{19}$.
:::

::: proof
The fuel flow depends only on $\tau_c$ and $\tau_\lambda$, so at fixed core conditions we maximise $V_9 + \alpha V_{19}$ over $\tau_f$. From [[#eq-v9]], $V_9^2/a_0^2 = \frac{2}{\gamma-1}\left[\tau_\lambda\tau_t - \tau_\lambda/(\tau_r\tau_c)\right]$, and by [[#eq-tf-turbine]] $\partial\tau_t/\partial\tau_f = -\alpha\tau_r/\tau_\lambda$, so
$$
\frac{\partial}{\partial\tau_f}\left(\frac{V_9}{a_0}\right) = \frac{1}{2V_9/a_0}\cdot\frac{2}{\gamma-1}\tau_\lambda\cdot\left(-\frac{\alpha\tau_r}{\tau_\lambda}\right) = -\frac{\alpha\tau_r}{(\gamma-1)V_9/a_0},
\qquad
\frac{\partial}{\partial\tau_f}\left(\frac{V_{19}}{a_0}\right) = \frac{\tau_r}{(\gamma-1)V_{19}/a_0}.
$$
Setting $\partial(V_9 + \alpha V_{19})/\partial\tau_f = 0$ gives $\alpha\tau_r/V_9 = \alpha\tau_r/V_{19}$, i.e. $V_9 = V_{19}$. Physically: moving a joule of work from the core jet to the fan jet raises thrust as long as the fan jet is the slower of the two, because a given energy produces more momentum in a slower, more massive stream. Assumptions: ideal components, same $\gamma$ and $c_p$ in both streams, $f \ll 1$, perfectly expanded nozzles.
:::

With real components the optimum shifts so that the fan jet is somewhat slower than the core jet (the ratio is roughly the product of the fan and low-pressure turbine efficiencies), but the principle is the same.

::: example Ideal turbofan against ideal turbojet {#ex-turbofan}
At $M_0 = 0.80$ and $11\ \mathrm{km}$, compare an ideal turbojet with an ideal separate-flow turbofan of bypass ratio $\alpha = 8$ and fan pressure ratio $\pi_f = 1.6$. Both have overall pressure ratio $\pi_c = 36$ and $T_{t4} = 1600\ \mathrm{K}$; constants as in example [[#ex-ideal-turbojet]]. Then find the optimum fan pressure ratio.
::: solution
Common terms: $\tau_r = 1.128$, $\tau_c = 36^{0.2857} = 2.7839$, $\tau_\lambda = 7.3852$, and $f = (1004.5 \times 216.65/43\times10^6)(7.3852 - 3.1403) = 0.0215$ for both.
**Turbojet:** $\tau_t = 0.7275$, $V_9 = 1147\ \mathrm{m/s}$, $F/\dot m_0 = 911\ \mathrm{N\,s/kg}$, $\mathrm{TSFC} = 23.6\ \mathrm{g/(kN\,s)}$.
**Turbofan:** $\tau_f = 1.6^{0.2857} = 1.1437$, so [[#eq-tf-turbine]] gives $\tau_t = 1 - (1.128/7.3852)(1.7839 + 8 \times 0.1437) = 0.5519$. Core jet: $V_9/a_0 = \sqrt{5 \times (7.3852/3.1403)\times(3.1403\times0.5519 - 1)} = 2.936$, $V_9 = 866\ \mathrm{m/s}$. Fan jet: $V_{19}/a_0 = \sqrt{5(1.128 \times 1.1437 - 1)} = 1.204$, $V_{19} = 355\ \mathrm{m/s}$. Then
$$
\frac{F}{\dot m_0} = \frac{295.0}{9}\left[(2.936 - 0.8) + 8(1.204 - 0.8)\right] = 176\ \mathrm{N\,s/kg},
\qquad
\mathrm{TSFC} = \frac{0.0215}{9 \times 176} = 13.6\ \mathrm{g/(kN\,s)}.
$$
**Optimum fan.** Solving $V_9 = V_{19}$ numerically gives $\pi_f = 2.41$, with both jets at $442\ \mathrm{m/s}$, $F/\dot m_0 = 206\ \mathrm{N\,s/kg}$ and $\mathrm{TSFC} = 11.6\ \mathrm{g/(kN\,s)}$.

**Check.** The thermal efficiency is the same for both engines, $1 - 1/(\tau_r\tau_c) = 0.68$; the turbofan's whole advantage is propulsive. The core jet at $\pi_f = 1.6$ is still much faster than the fan jet, so too little work has been moved to the fan, and the optimum does better. The price of the turbofan is a specific thrust five times lower: for the same thrust it must swallow five times more air, which is why its fan is so large.
:::
:::

::: widget plot
f: 100*(1 - 1/((1+0.2*M^2)*x^(1/3.5))); 1e6*1004.5*216.65*(T/216.65 - (1+0.2*M^2)*x^(1/3.5))/43e6/(295.04*(sqrt(5*(T/216.65)/((1+0.2*M^2)*x^(1/3.5))*((1+0.2*M^2)*x^(1/3.5)*(1 - (1+0.2*M^2)*(x^(1/3.5) - 1)/(T/216.65)) - 1)) - M))
x: 1, 60
y: 0, 80
sliders: M=0.8:0:3:0.05; T=1500:1000:2200:25
labels: \eta_{th}\ (\%); \mathrm{TSFC}\ (\mathrm{g/(kN\,s)})
caption: Ideal turbojet at $11\ \mathrm{km}$: thermal efficiency in per cent and TSFC in $\mathrm{g/(kN\,s)}$ against compressor pressure ratio, with the same sliders as the specific-thrust figure. The thermal efficiency does not depend on $T$ at all — try it. The TSFC has its minimum at a much higher pressure ratio than the specific-thrust optimum, and raising $T$ makes TSFC *worse* in the ideal turbojet: a hotter cycle produces a faster jet, and propulsive efficiency falls.
:::

::: quiz
In an ideal turbojet at fixed flight condition and fixed compressor pressure ratio, the turbine inlet temperature $T_{t4}$ is raised. Which of the following happen? (Several may be correct.)
- [x] The specific thrust increases.
- [ ] The thermal efficiency increases.
- [x] The jet velocity increases and the propulsive efficiency decreases.
- [ ] The TSFC decreases.
::: solution
More heat per kilogram at the same pressure ratio produces more work, a faster jet and more thrust per kilogram of air. The ideal thermal efficiency $1 - 1/(\tau_r\tau_c)$ is unchanged, and the faster jet lowers $\eta_p$, so the overall efficiency falls and TSFC rises. High $T_{t4}$ pays off only when it is combined with a higher pressure ratio or a higher bypass ratio (which turns the extra work into fan thrust).
:::
:::

## The ramjet

At high flight Mach number the ram compression alone gives a large pressure ratio — at $M_0 = 3$, $\pi_r = 36.7$ — and the compressor, and with it the turbine, can be removed. What remains is a **ramjet**: a supersonic inlet that decelerates the air to low subsonic speed, a combustor and a nozzle. With $\tau_c = \tau_t = 1$, [[#eq-v9]] collapses to
$$
\frac{V_9}{a_0} = M_0\sqrt{\frac{\tau_\lambda}{\tau_r}},
\qquad
\frac{F}{\dot m_0} = a_0 M_0\left(\sqrt{\frac{\tau_\lambda}{\tau_r}} - 1\right),
\qquad
\eta_{th} = 1 - \frac{1}{\tau_r}.
$$ {#eq-ramjet}
The ramjet produces no static thrust (at $M_0 = 0$ there is no compression at all) and has poor efficiency at low Mach number; it needs another engine or a rocket to accelerate it. Its upper limit comes from the temperature of the air after the inlet: at $M_0 = 6$, $T_{t0}$ is already about $1800\ \mathrm{K}$ at $11\ \mathrm{km}$, so little heat can be added before material and dissociation limits are reached, and the inlet shock losses become severe. Keeping the combustor flow supersonic — the **scramjet** — is the answer explored for still higher speeds.

::: example Ideal ramjet at Mach 3 {#ex-ramjet}
An ideal ramjet flies at $M_0 = 3.0$ at $11\ \mathrm{km}$ with a combustor exit temperature $T_{t4} = 2000\ \mathrm{K}$. Find the specific thrust, the TSFC and the thermal and propulsive efficiencies. Repeat at $M_0 = 0.8$.
::: solution
At $M_0 = 3$: $\tau_r = 1 + 0.2 \times 9 = 2.8$ ($T_{t0} = 606.6\ \mathrm{K}$), $\tau_\lambda = 2000/216.65 = 9.231$, $\sqrt{\tau_\lambda/\tau_r} = 1.816$:
$$
V_9 = 3 \times 295.0 \times 1.816 = 1607\ \mathrm{m/s},\qquad
\frac{F}{\dot m_0} = 1607 - 885 = 722\ \mathrm{N\,s/kg},
$$
$f = (1004.5\times216.65/43\times10^6)(9.231 - 2.8) = 0.0326$ and $\mathrm{TSFC} = 0.0326/722 = 45.1\ \mathrm{g/(kN\,s)}$. $\eta_{th} = 1 - 1/2.8 = 0.643$, $\eta_p = 2/(1 + 1.816) = 0.710$, so $\eta_o = 0.456$.
At $M_0 = 0.8$: $\tau_r = 1.128$, $\sqrt{\tau_\lambda/\tau_r} = 2.861$, $F/\dot m_0 = 236.0 \times 1.861 = 439\ \mathrm{N\,s/kg}$, $f = 0.0410$, $\mathrm{TSFC} = 93.4\ \mathrm{g/(kN\,s)}$, $\eta_{th} = 0.113$.

**Check.** The Mach 3 TSFC looks high next to the turbofan's $13.6$, but the overall efficiency, $\eta_o = V_0/(\mathrm{TSFC}\,h_{PR}) = 885/(4.51\times10^{-5} \times 4.3\times10^{7}) = 0.456$, is the highest of any engine in this chapter — the ram compression is "free". At Mach 0.8 the same ramjet is hopeless.
:::
:::

## Turboprops, turboshafts and afterburners

A **turboprop** expands the core gas almost to ambient pressure in the turbine, taking nearly all the available work as shaft power for a propeller (through a reduction gearbox, since propeller tip speeds must stay subsonic, see [[propulsion/propellers]]). A little energy is usually left in the jet. The cycle analysis is that of the turbojet with one extra variable: the fraction of the available enthalpy drop taken by the turbine. The optimum split is the one that makes a further joule of work equally valuable in the propeller and in the jet — the same marginal argument as [[#prop-opt-fan]], weighted by the propeller and gearbox efficiencies. Power is quoted as *equivalent shaft power* and fuel economy as power-specific fuel consumption, in $\mathrm{kg/(kW\,h)}$ or $\mathrm{mg/(W\,s)}$. A **turboshaft** (helicopters, auxiliary power units, ships and power stations) takes all the work as shaft power and leaves no useful jet.

An **afterburner** (reheat) burns additional fuel in the turbine exhaust, which still contains most of its oxygen because $T_{t4}$ limits the main combustor to a lean mixture. Raising the nozzle-entry temperature from, say, $1100$ to $2000\ \mathrm{K}$ raises the jet velocity roughly as $\sqrt{T_{t7}}$ — by about $35\,\%$ — and specific thrust by more, but the heat is added at low pressure and the TSFC roughly doubles. Afterburners are therefore used for short periods (take-off, transonic acceleration) on military and the few supersonic civil engines, and they require a variable-area nozzle to pass the hotter, less dense flow without disturbing the engine upstream.

::: history
George Brayton patented his constant-pressure "Ready Motor" in the United States in 1872; the cycle that bears his name was later recognised as the ideal model of the gas turbine. The French engineer René Lorin described the ramjet principle in 1913, decades before any vehicle could fly fast enough to use it. Frank Whittle filed his British patent for a turbojet in January 1930 and ran his first experimental engine in April 1937; Hans von Ohain's engine powered the first jet-propelled flight, of the Heinkel He 178, in August 1939. The first turboprop to fly was a Rolls-Royce Trent — a Derwent turbojet driving propellers through a gearbox — in a modified Gloster Meteor in September 1945. Parametric cycle analysis in the form used here was systematised for teaching in the textbooks of Kerrebrock and of Mattingly.
:::

::: summary
- Engines are described by SAE station numbers (0, 2, 3, 4, 5, 9; 13, 19 for the fan) and by stagnation ratios $\tau$, $\pi$ of each component; $\tau_r = 1 + \tfrac{\gamma-1}{2}M_0^2$ captures ram compression.
- The ideal Brayton cycle has $\eta_{th} = 1 - 1/(\tau_r\tau_c)$: it depends on overall pressure ratio, not on turbine inlet temperature.
- Ideal turbojet: $\tau_t = 1 - (\tau_r/\tau_\lambda)(\tau_c - 1)$, jet velocity from [[#eq-v9]], $F/\dot m_0 = V_9 - V_0$; specific thrust peaks at $T_{t3} = \sqrt{T_0 T_{t4}}$, while efficiency keeps rising with pressure ratio.
- Real components (inlet recovery, $\eta_c$, $\pi_b$, $\eta_b$, $\eta_t$, $\pi_n$, hot-gas properties) cost little thrust but a great deal of fuel economy.
- The turbofan moves work from the core jet to a large, slow bypass stream; ideally the best fan pressure ratio equalises the two jet velocities.
- Ramjets need no compressor and are efficient around Mach 3 but give no static thrust; turboprops take the work as shaft power; afterburners buy thrust at the price of fuel.
:::

## Exercises

::: exercise {#exr-ram-ratio level=1 check="247.96"}
An airliner cruises at $M_0 = 0.85$ at $11\ \mathrm{km}$, where $T_0 = 216.65\ \mathrm{K}$. Find the stagnation temperature at the fan face ($\gamma = 1.4$, adiabatic inlet). (Enter $T_{t2}$ in K, rounded to two decimal places.)
::: solution
$\tau_r = 1 + 0.2 \times 0.85^2 = 1.1445$, $T_{t2} = T_{t0} = 216.65 \times 1.1445 = 247.96\ \mathrm{K}$. The ram pressure ratio is $\tau_r^{3.5} = 1.604$.
:::
::: answer
$247.96\ \mathrm{K}$
:::
:::

::: exercise {#exr-brayton-eff level=1 check="0.622"}
What is the ideal Brayton thermal efficiency for an overall pressure ratio of 30 with $\gamma = 1.4$? (Enter a decimal fraction rounded to three significant figures.)
::: solution
$\eta_{th} = 1 - 30^{-0.2857} = 1 - 0.3784 = 0.622$. For comparison, a pressure ratio of 10 gives $0.482$: tripling the pressure ratio adds only 14 percentage points, which is why ever-higher pressure ratios bring diminishing returns.
:::
:::

::: exercise {#exr-comp-work level=1 check="496"}
A compressor with isentropic efficiency $0.88$ takes air at $T_{t2} = 288.15\ \mathrm{K}$ through a pressure ratio of 25. Find the compressor exit temperature and the specific work ($c_p = 1004.5\ \mathrm{J/(kg\,K)}$, $\gamma = 1.4$). (Enter the work in kJ/kg, rounded to the nearest whole number.)
::: solution
$T_{t3s} = 288.15 \times 25^{0.2857} = 722.9\ \mathrm{K}$; $T_{t3} = 288.15 + 434.8/0.88 = 782.1\ \mathrm{K}$; $w_c = 1004.5 \times 494.0 = 496\ \mathrm{kJ/kg}$.
:::
::: answer
$T_{t3} = 782\ \mathrm{K}$, $w_c = 496\ \mathrm{kJ/kg}$
:::
:::

::: exercise {#exr-static-turbojet level=2 check="904"}
An ideal turbojet is tested at sea level ($T_0 = 288.15\ \mathrm{K}$, $M_0 = 0$) with $\pi_c = 10$ and $T_{t4} = 1400\ \mathrm{K}$; $\gamma = 1.4$, $R = 287\ \mathrm{J/(kg\,K)}$. Find the specific thrust. (Enter $F/\dot m_0$ in N·s/kg, rounded to the nearest whole number.)
::: solution
$\tau_r = 1$, $\tau_c = 10^{0.2857} = 1.9307$, $\tau_\lambda = 4.8586$, $\tau_t = 1 - 0.9307/4.8586 = 0.8084$. $a_0 = 340.3\ \mathrm{m/s}$ and
$$
\frac{V_9}{a_0} = \sqrt{5 \times \frac{4.8586}{1.9307}\left(1.9307 \times 0.8084 - 1\right)} = 2.656,
$$
so $V_9 = 904\ \mathrm{m/s}$ and, with $V_0 = 0$, $F/\dot m_0 = 904\ \mathrm{N\,s/kg}$.
:::
::: answer
$904\ \mathrm{N\,s/kg}$
:::
:::

::: exercise {#exr-opt-pic level=2 check="570"}
For an ideal turbojet at $M_0 = 0.8$ with $T_0 = 216.65\ \mathrm{K}$ and $T_{t4} = 1500\ \mathrm{K}$, find the compressor exit temperature at the pressure ratio that maximises specific thrust, and the corresponding $\pi_c$. (Enter $T_{t3}$ in K, rounded to the nearest kelvin.)
::: solution
By [[#eq-opt-pic]], $T_{t3} = \sqrt{T_0 T_{t4}} = \sqrt{216.65 \times 1500} = 570\ \mathrm{K}$. Then $\tau_r\tau_c = 570.1/216.65 = 2.631$, $\tau_c = 2.631/1.128 = 2.333$ and $\pi_c = 2.333^{3.5} = 19.4$, as quoted in example [[#ex-ideal-turbojet]].
:::
::: answer
$T_{t3} = 570\ \mathrm{K}$, $\pi_c = 19.4$
:::
:::

::: exercise {#exr-ramjet level=2 check="678"}
An ideal ramjet flies at $M_0 = 2.0$ at $11\ \mathrm{km}$ ($T_0 = 216.65\ \mathrm{K}$, $a_0 = 295.0\ \mathrm{m/s}$) with $T_{t4} = 1800\ \mathrm{K}$. Find its specific thrust and its thermal efficiency. (Enter $F/\dot m_0$ in N·s/kg, rounded to the nearest whole number.)
::: solution
$\tau_r = 1.8$, $\tau_\lambda = 8.308$, $\sqrt{\tau_\lambda/\tau_r} = 2.148$; $V_9 = 2 \times 295.0 \times 2.148 = 1268\ \mathrm{m/s}$, $V_0 = 590\ \mathrm{m/s}$, so $F/\dot m_0 = 678\ \mathrm{N\,s/kg}$. $\eta_{th} = 1 - 1/1.8 = 0.444$.
:::
::: answer
$678\ \mathrm{N\,s/kg}$, $\eta_{th} = 0.444$
:::
:::

::: exercise {#exr-fan-split level=3}
Using [[#eq-tf-turbine]] and [[#eq-tf-thrust]], show that for an ideal turbofan with fixed core ($\tau_c$, $\tau_\lambda$) and fixed fan pressure ratio, increasing the bypass ratio $\alpha$ eventually *reduces* the thrust per unit core flow, and find the bypass ratio at which the core jet velocity falls to the flight speed. Explain why real engines stop well short of that point.
::: solution
The thrust per unit core flow is $a_0[(V_9/a_0 - M_0) + \alpha(V_{19}/a_0 - M_0)]$. Increasing $\alpha$ adds fan thrust $\alpha(V_{19} - V_0)$ but lowers $\tau_t$ through [[#eq-tf-turbine]], and hence $V_9$. The core thrust becomes zero when $V_9 = V_0$, i.e. when
$$
\frac{2}{\gamma-1}\,\frac{\tau_\lambda}{\tau_r\tau_c}(\tau_r\tau_c\tau_t - 1) = M_0^2 .
$$
Multiplying by $\frac{\gamma-1}{2}\frac{\tau_r\tau_c}{\tau_\lambda}$ and using $\frac{\gamma-1}{2}M_0^2 = \tau_r - 1$, this rearranges to
$$
\tau_t = \frac{1}{\tau_r\tau_c} + \frac{\tau_r - 1}{\tau_\lambda},
$$
and [[#eq-tf-turbine]] then gives the bypass ratio:
$$
\alpha_{\max} = \frac{\tau_\lambda(1 - \tau_t)/\tau_r - (\tau_c - 1)}{\tau_f - 1}.
$$
For the data of example [[#ex-turbofan]] ($\tau_r = 1.128$, $\tau_c = 2.7839$, $\tau_\lambda = 7.3852$, $\tau_f = 1.1437$): $\tau_t = 1/3.1403 + 0.128/7.3852 = 0.3358$, and $\alpha_{\max} = (7.3852 \times 0.6642/1.128 - 1.7839)/0.1437 = 17.9$. Long before that the core jet is slower than the fan jet and the optimum of [[#prop-opt-fan]] has been passed; in practice fan diameter, weight, nacelle drag, ground clearance and the low-pressure turbine's speed (which a gearbox can relieve) limit bypass ratios of current engines to roughly 10–12 (as of 2026).
:::
:::

::: exercise {#exr-design-tf level=3}
**Design study.** You are asked to choose $\pi_c$ and $T_{t4}$ for the core of a long-range turbofan cruising at $M_0 = 0.85$, $11\ \mathrm{km}$. Using the ideal relations of this chapter (and the TSFC widget for the turbojet core), argue which way each choice pushes thermal efficiency, specific core power and TSFC, and identify the practical limits that stop you raising each indefinitely. Then explain why the optimum $T_{t4}$ of a turbofan is higher than that of a turbojet with the same core.
::: solution
**Pressure ratio.** $\eta_{th} = 1 - 1/(\tau_r\tau_c)$ rises with $\pi_c$; core work per kilogram first rises then falls (optimum at $T_{t3} = \sqrt{T_0T_{t4}}$). Limits: compressor-exit temperature $T_{t3}$ (disc and blade materials, roughly $900$–$1000\ \mathrm{K}$ at take-off for current nickel alloys, and NO$_x$ formation, which rises steeply with combustor inlet temperature — see [[propulsion/combustors]]); small blade heights at the back of the compressor, where tip clearances become a large fraction of the passage and efficiency falls; and stability (surge margin, [[propulsion/compressors]]).
**Turbine inlet temperature.** In the ideal cycle $T_{t4}$ does not change $\eta_{th}$ but raises specific work. In a turbojet the extra work goes into a faster jet and propulsive efficiency falls, so TSFC gets worse (second widget). In a turbofan the extra core work can be handed to the fan through a larger bypass ratio or fan pressure ratio, keeping the jets slow; so a turbofan converts higher $T_{t4}$ into a smaller core for the same thrust and, with real losses, into better efficiency. Limits: turbine blade material and cooling ([[propulsion/turbines]]), cooling air that bypasses the combustor and lowers cycle efficiency, and NO$_x$.
This is why high bypass ratio, high pressure ratio and high turbine temperature have advanced together.
:::
:::

::: exercise {#exr-afterburner level=2 check="1.35"}
An afterburner raises the nozzle-entry stagnation temperature from $1100\ \mathrm{K}$ to $2000\ \mathrm{K}$ while the nozzle pressure ratio and the gas properties stay the same. By what factor does the perfectly expanded jet velocity increase? (Enter the factor rounded to three significant figures.)
::: solution
With the same pressure ratio, $T_9/T_{t7}$ is the same, so $V_9 = \sqrt{2c_p T_{t7}(1 - T_9/T_{t7})} \propto \sqrt{T_{t7}}$. The factor is $\sqrt{2000/1100} = 1.348 \approx 1.35$.
:::
:::
