The previous chapters built converters one at a time. Real systems chain them together and wrap them in control loops that serve a purpose beyond regulating a voltage: an electric car's traction drive must deliver a commanded torque from standstill to $15\,000\,\mathrm{rpm}$; a solar inverter must extract the most power the panels can give at every moment and feed it to the grid as a clean sinusoidal current; a fast charger must push $350\,\mathrm{kW}$ into a battery without overheating a single cell; a wind turbine's converter must decouple a variable-speed generator from the fixed-frequency grid. Power electronics is now the interface between almost every source and load of electrical energy, and the energy transition — renewable generation, electric transport, storage — is to a large degree a power-electronics transition.

This chapter surveys the main applications, each as a chain of the converters already studied, and develops the control ideas specific to them: variable-frequency and field-oriented control of motors, maximum-power-point tracking of photovoltaic arrays, the partial-rating converter of the doubly fed wind generator, constant-current/constant-voltage battery charging, and the transfer of real and reactive power between an inverter and the grid. The machine models come from [[electric-machines/induction-machines]] and [[electric-machines/synchronous-machines]]; the converters from [[power-electronics/rectifiers]], [[power-electronics/dc-dc-converters]], [[power-electronics/isolated-converters]] and [[power-electronics/inverters]]; and the control loops from [[power-electronics/converter-control]].

## Motor drives

Electric motors consume over $40\,\%$ of the world's electricity, and a motor running at a fixed speed set by the grid frequency wastes energy whenever the load — a pump, a fan, a compressor — needs less than full flow, because the flow is then throttled by a valve or damper. A **variable-speed drive** adjusts the motor's speed instead; since a fan's power rises roughly as the cube of its speed, running it at $80\,\%$ speed needs only about half the power. The standard industrial drive is a diode rectifier, a DC-link capacitor, and a three-phase IGBT inverter with space-vector PWM.

### Volts-per-hertz control

An induction motor's stator flux is set by the ratio of its applied voltage to its frequency, because the stator winding is essentially an inductance: $\hat\psi \approx \hat V/\omega$. Its speed is close to synchronous speed, $n_s = 120f/P$ rpm for $P$ poles, less a small slip.

::: definition Constant volts-per-hertz control {#def-vf}
In **volts-per-hertz** (V/f) control, the inverter's fundamental voltage is commanded in proportion to its frequency, $V = V_{rated}\,f/f_{rated}$, up to rated frequency, so that the stator flux, and with it the motor's torque capability, stays at its rated value. A small **voltage boost** is added at low frequency to compensate for the stator resistance drop. Above rated frequency the voltage is held at its maximum and the flux falls as $1/f$ (**field weakening**), so the available torque falls and the motor operates at roughly constant power.
:::

V/f control is open-loop in speed: the motor slips slightly more as it is loaded. It needs no position sensor and no detailed motor model, and it drives the great majority of pumps and fans.

::: example Running a pump at reduced speed {#ex-vf}
A $4$-pole, $400\,\mathrm{V}$, $50\,\mathrm{Hz}$ induction motor drives a centrifugal pump through a V/f drive. At the required flow the pump must turn at $1000\,\mathrm{rpm}$, where the motor's slip is $3\,\%$. Find the inverter frequency and voltage, and estimate the power saving relative to the pump's $1440\,\mathrm{rpm}$ full-speed operation.
::: solution
The synchronous speed must be $n_s = 1000/(1 - 0.03) = 1031\,\mathrm{rpm}$, so $f = Pn_s/120 = 4\times1031/120 = 34.4\,\mathrm{Hz}$. The voltage is $400\times34.4/50 = 275\,\mathrm{V}$ (plus a few volts of boost). By the pump affinity laws, power scales as speed cubed: $(1000/1440)^3 = 0.335$, so the pump needs about a third of its full-speed power. Throttling the flow with a valve at full speed would have saved only a fraction of that, because the motor would still be turning the pump at $1440\,\mathrm{rpm}$ against a higher head. This is the source of most of the energy savings attributed to variable-speed drives.
:::
:::

### Field-oriented control

For servo drives, traction and anything that needs fast, precise torque, the drive controls the motor's currents directly in a reference frame that rotates with the rotor flux. Two transformations take the three phase currents into that frame.

::: definition Clarke and Park transformations {#def-park}
The **Clarke transformation** maps balanced phase quantities to two orthogonal stationary components, the real and imaginary parts of the space vector of [[power-electronics/inverters#def-space-vector]]:

$$
x_\alpha = \tfrac23\left(x_a - \tfrac12x_b - \tfrac12x_c\right),\qquad x_\beta = \tfrac{1}{\sqrt3}\left(x_b - x_c\right).
$$

The **Park transformation** rotates them by the rotor (or flux) angle $\theta$ into the **direct** and **quadrature** axes:

$$
x_d = x_\alpha\cos\theta + x_\beta\sin\theta,\qquad x_q = -x_\alpha\sin\theta + x_\beta\cos\theta ,
$$

i.e. $x_d + jx_q = (x_\alpha + jx_\beta)e^{-j\theta}$. A balanced sinusoidal set synchronised with $\theta$ becomes a pair of DC quantities.
:::

In the $dq$ frame the AC machine looks like a DC machine: steady currents, and PI controllers ([[control-systems/pid-control]]) that regulate them with zero steady-state error. **Field-oriented control** (FOC) runs two PI current loops on $i_d$ and $i_q$, transforms their voltage outputs back to the stationary frame and hands them to the space-vector modulator.

::: theorem Torque of a permanent-magnet synchronous machine {#thm-pmsm-torque}
A permanent-magnet synchronous machine with $p$ pole pairs, magnet flux linkage $\psi_m$ and $d$- and $q$-axis inductances $L_d$, $L_q$ produces the electromagnetic torque

$$
T = \frac32p\left[\psi_mi_q + (L_d - L_q)i_di_q\right],
$$ {#eq-pmsm-torque}

where $i_d$, $i_q$ are the peak-amplitude-invariant $dq$ currents. The first term is the **magnet torque**, the second the **reluctance torque**, present when the rotor is magnetically salient ($L_d \ne L_q$).
:::

::: proof
In the rotor frame the stator flux linkages are $\psi_d = L_di_d + \psi_m$ and $\psi_q = L_qi_q$, and the voltage equations are $v_d = Ri_d + \dot\psi_d - \omega_e\psi_q$ and $v_q = Ri_q + \dot\psi_q + \omega_e\psi_d$, where $\omega_e = p\omega_m$ is the electrical speed. With amplitude-invariant transformations the instantaneous three-phase power is $\frac32(v_di_d + v_qi_q)$. Substituting, it splits into copper loss $\frac32R(i_d^2 + i_q^2)$, the rate of change of stored magnetic energy, and the term $\frac32\omega_e(\psi_di_q - \psi_qi_d)$, which is the mechanical power $T\omega_m$. Hence $T = \frac32p(\psi_di_q - \psi_qi_d) = \frac32p[(L_di_d + \psi_m)i_q - L_qi_qi_d]$, which rearranges to [[#eq-pmsm-torque]].
:::

For a surface-magnet machine $L_d = L_q$ and the torque is simply $\frac32p\psi_mi_q$: the controller sets $i_d = 0$ and commands $i_q$ in proportion to the torque demand, exactly as armature current in a DC motor. An **interior** permanent-magnet machine, the usual choice for EV traction, has $L_q > L_d$; a negative $i_d$ then *adds* reluctance torque, and for a given current magnitude there is an optimal current angle, the **maximum torque per ampere** (MTPA) point. At high speed a negative $i_d$ also weakens the effective flux, keeping the back-EMF within the inverter's voltage limit (the field weakening of [[power-electronics/inverters]]).

::: widget plot
f: 1.5*4*(0.08*c*cos(x*pi/180) + 0.3e-3*c^2*sin(x*pi/180)*cos(x*pi/180)); 1.5*4*0.08*c*cos(x*pi/180); 1.5*4*0.3e-3*c^2*sin(x*pi/180)*cos(x*pi/180)
x: 0, 90
y: 0, 200
sliders: c=200:20:300:5
labels: T\ \text{total (N\,m)}; \text{magnet torque}; \text{reluctance torque}
caption: Torque of an interior permanent-magnet motor ($p = 4$, $\psi_m = 0.08\,\mathrm{Wb}$, $L_q - L_d = 0.3\,\mathrm{mH}$) against the current angle $\beta$ in degrees, measured from the $q$ axis towards negative $d$ ($i_q = I\cos\beta$, $i_d = -I\sin\beta$), for a current amplitude $c$ in amperes on the slider. The magnet torque (orange) is greatest at $\beta = 0$; the reluctance torque (green) at $45^\circ$; their sum peaks in between — the MTPA angle, about $27^\circ$ at $200\,\mathrm A$. Increase the current and the reluctance torque, growing as $I^2$, pulls the optimum towards $45^\circ$.
:::

::: example Maximum torque per ampere {#ex-mtpa}
For the motor of the figure, with a current amplitude of $200\,\mathrm{A}$, compare the torque with $i_d = 0$ and at the MTPA angle, which is given by $\sin\beta = \dfrac{-\psi_m + \sqrt{\psi_m^2 + 8(L_q - L_d)^2I^2}}{4(L_q - L_d)I}$.
::: solution
With $i_d = 0$: $T = \frac32\times4\times0.08\times200 = 96\,\mathrm{N\,m}$. MTPA: $(L_q - L_d)I = 0.06\,\mathrm{Wb}$, so $\sin\beta = (-0.08 + \sqrt{0.0064 + 8\times0.0036})/0.24 = (-0.08 + 0.1876)/0.24 = 0.448$, $\beta = 26.6^\circ$. Then $i_q = 200\cos26.6^\circ = 178.8\,\mathrm{A}$, $i_d = -89.7\,\mathrm{A}$, and $T = 6\,[0.08\times178.8 + 0.3\times10^{-3}\times89.7\times178.8] = 6\times[14.30 + 4.81] = 114.7\,\mathrm{N\,m}$ — $19\,\%$ more torque from the same current, hence the same copper and inverter losses. Traction controllers store MTPA and field-weakening trajectories as look-up tables of $(i_d, i_q)$ against torque and speed.
:::
:::

## Renewable energy

### Photovoltaic systems and maximum-power-point tracking

A photovoltaic cell is a large-area $pn$ junction ([[semiconductor-devices/diodes-photonic-devices]]) whose photocurrent is proportional to irradiance. Its terminal characteristic is approximately $I = I_{ph} - I_0[\exp(V/(nV_T)) - 1]$: a current source in parallel with a diode. Between short circuit (zero voltage) and open circuit (zero current) the delivered power has a single maximum, the **maximum power point** (MPP), whose voltage changes with irradiance and temperature. The converter between the panels and the load must keep the panel at that point.

::: widget plot
f: x*(9*g - 6.725e-8*(exp(x/2.004) - 1))/10; 9*g - 6.725e-8*(exp(x/2.004) - 1)
x: 0, 40
y: 0, 30
sliders: g=1:0.05:1:0.05
labels: P/10\ (\mathrm{W}); I\ (\mathrm A)
caption: Current (orange) and power (blue, divided by ten) of a $60$-cell panel against its voltage, from the single-diode model with a short-circuit current of $9\,\mathrm A$ at full sun; the slider $g$ is the irradiance relative to $1000\,\mathrm{W/m^2}$. At full sun the maximum power point is about $270\,\mathrm W$ at $31.8\,\mathrm V$. Reduce the irradiance: the current scales in proportion, but the MPP voltage moves only slightly (to $28.8\,\mathrm V$ at $g = 0.2$). A tracker must find this moving peak, which is flat on its left and falls sharply on its right.
:::

::: algorithm Perturb-and-observe MPPT {#alg-po}
At intervals of $T_{mppt}$ (typically $10$–$100\,\mathrm{ms}$, long enough for the converter to settle):
1. Measure the panel voltage $V_k$ and current $I_k$, and compute $P_k = V_kI_k$.
2. If $P_k > P_{k-1}$, keep perturbing the voltage reference in the same direction as last time; otherwise reverse the direction.
3. Set $V^\ast_{k+1} = V^\ast_k \pm \Delta V$ and pass it to the converter's voltage loop.

The operating point oscillates around the MPP with an amplitude of about $\Delta V$; a smaller step reduces the oscillation loss but slows the response to changing irradiance. The **incremental-conductance** method uses the condition $\dd P/\dd V = 0 \iff \dd I/\dd V = -I/V$ at the MPP to stop perturbing once it is found.
:::

In a residential system the MPPT stage is usually a boost converter per string; in a microinverter or optimiser it is a small DC–DC stage per panel, which avoids the losses that arise when shaded panels in a series string have different MPPs (and the string's P–V curve develops several local maxima, which can trap a simple tracker).

### Wind turbines

A wind turbine extracts the most energy if its rotor speed is proportional to wind speed (constant **tip-speed ratio**), so the generator must run at variable speed while the grid frequency is fixed. Two arrangements dominate. In a **full-converter** turbine, a synchronous (often permanent-magnet) or induction generator feeds a back-to-back pair of voltage-source converters — a PWM rectifier, a DC link and a grid inverter — rated for the full turbine power; the generator is completely decoupled from the grid. In a **doubly fed induction generator** (DFIG), the stator is connected directly to the grid and a back-to-back converter feeds the wound rotor through slip rings, injecting rotor currents at slip frequency.

::: proposition Converter rating of a doubly fed induction generator {#prop-dfig}
Neglecting losses, the power processed by a DFIG's rotor converter is $P_r \approx -sP_s$, where $s$ is the slip and $P_s$ the stator power, and the total power delivered is $P = P_s(1 - s)$. A speed range of $\pm s_{max}$ around synchronous speed therefore needs a converter rated at about $s_{max}$ of the stator power.
:::

::: proof
The air-gap power crossing from rotor to stator is $P_s$ (the stator power, losses neglected). In an induction machine the electromagnetic torque is $T = P_s/\omega_s$, where $\omega_s$ is the synchronous mechanical speed, and the mechanical input is $T\omega_m = P_s\omega_m/\omega_s = P_s(1 - s)$. Energy balance on the rotor: mechanical input $+$ rotor electrical input $=$ air-gap power, so the rotor electrical input is $P_s - P_s(1 - s) = sP_s$, i.e. the rotor converter delivers $-sP_s$ to the grid. Below synchronous speed ($s > 0$) the converter feeds power into the rotor; above it ($s < 0$) the rotor returns power through the converter. The total delivered is $P_s - sP_s = P_s(1 - s)$.
:::

With a typical speed range of $\pm30\,\%$, the DFIG's converter is rated at about $30\,\%$ of the turbine's power, which made it the cheapest variable-speed solution and the dominant technology of the 2000s. Full-converter turbines have since taken over much of the market, particularly offshore, because they decouple the generator from grid faults and meet modern grid codes more easily.

## Battery charging and electric vehicles

Lithium-ion cells must be charged within strict limits: too high a voltage plates lithium and degrades or ignites the cell, too high a current overheats it.

::: definition Constant-current / constant-voltage charging {#def-cccv}
In **CC–CV** charging the charger first regulates the current at a set value (often expressed as a **C-rate**, the current that would discharge the battery's rated capacity in $1/C$ hours) while the cell voltage rises; when the cell reaches its maximum voltage (typically $4.2\,\mathrm V$ per cell, or $3.65\,\mathrm V$ for lithium iron phosphate) it switches to regulating the voltage, and the current tapers until it falls below a termination threshold.
:::

Every charger is therefore a converter with two nested regulation modes — the current loop and the voltage loop of [[power-electronics/converter-control]], with the controller selecting whichever demands less. A phone charger delegates this to a buck converter in the phone; an EV's **on-board charger** (typically $7$–$22\,\mathrm{kW}$) is a PFC rectifier followed by an isolated DC–DC stage (LLC or dual active bridge, [[power-electronics/isolated-converters]]), with the battery-management system setting the current and voltage limits; a **DC fast charger** places the same chain, at $50$–$400\,\mathrm{kW}$, in a roadside cabinet and connects directly to the battery.

An electric vehicle's power-electronic system thus contains: the traction inverter (FOC of an interior PM or induction motor, $100$–$300\,\mathrm{kW}$, running in reverse as a rectifier during regenerative braking); the on-board charger; an isolated DC–DC converter from the high-voltage battery to the $12\,\mathrm V$ auxiliary system; and often a boost converter between battery and inverter. The move from $400\,\mathrm V$ to $800\,\mathrm V$ battery systems halves the current for the same power, quartering the $I^2R$ loss in cables and connectors, and is made practical by $1200\,\mathrm V$ SiC MOSFETs.

::: example Fast-charging currents {#ex-ev-charge}
A $75\,\mathrm{kWh}$ battery is fast-charged from $10\,\%$ to $80\,\%$ state of charge at an average $150\,\mathrm{kW}$. How long does it take? What current does a $350\,\mathrm{kW}$ charger deliver into a $400\,\mathrm V$ and into an $800\,\mathrm V$ battery, and how do the cable losses compare?
::: solution
The energy is $0.7\times75 = 52.5\,\mathrm{kWh}$, so the time is $52.5/150\,\mathrm h = 21\,\mathrm{min}$ (ignoring losses; in practice the current tapers in the CV phase, which is why chargers stop at $80\,\%$). At $350\,\mathrm{kW}$: $350\,000/400 = 875\,\mathrm A$ at $400\,\mathrm V$, $437.5\,\mathrm A$ at $800\,\mathrm V$. For the same cable resistance, the loss scales as $I^2$: four times lower at $800\,\mathrm V$. Even $437.5\,\mathrm A$ needs a liquid-cooled cable to stay flexible; $875\,\mathrm A$ is beyond any practical connector, so a $400\,\mathrm V$ car simply charges more slowly.
:::
:::

## Grid interfaces

A grid-connected inverter — in a PV system, a battery store, a wind turbine or an HVDC terminal — injects power through an inductive filter into a grid that is, to a first approximation, a fixed voltage source. How much real and reactive power flows depends on the inverter's voltage phasor relative to the grid's.

::: theorem Power transfer through a reactance {#thm-power-transfer}
An inverter producing a fundamental voltage phasor $\mathbf E = E\angle\delta$ connected through a lossless reactance $X$ to a grid of voltage $\mathbf V = V\angle0$ delivers to the grid (per phase)

$$
P = \frac{EV}{X}\sin\delta,\qquad Q = \frac{EV\cos\delta - V^2}{X} .
$$ {#eq-power-transfer}

Real power is controlled mainly by the angle $\delta$, reactive power mainly by the magnitude difference $E - V$.
:::

::: proof
The current is $\mathbf I = (\mathbf E - \mathbf V)/(jX)$. The complex power delivered to the grid is $S = \mathbf V\mathbf I^\ast = V\cdot\frac{E\angle(-\delta) - V}{-jX} = \frac{jV(Ee^{-j\delta} - V)}{X} = \frac{jVE\cos\delta + VE\sin\delta - jV^2}{X}$. The real part is $P = VE\sin\delta/X$ and the imaginary part $Q = (VE\cos\delta - V^2)/X$. For small $\delta$, $P \approx VE\delta/X$ and $Q \approx V(E - V)/X$.
:::

The same relations govern synchronous generators ([[power-systems/power-flow]]) and power lines. A grid-connected inverter, however, does not control $\delta$ and $E$ directly; it is normally a **current-controlled**, **grid-following** source: a **phase-locked loop** measures the grid voltage's angle, the controller transforms the grid currents into a $dq$ frame aligned with it (the Park transformation again), and PI current loops regulate $i_d$ (real power) and $i_q$ (reactive power) to their references. An outer loop holds the DC-link voltage by adjusting $i_d$, exactly as in the cascade of [[control-systems/pid-control#def-cascade]]. As inverter-based generation displaces synchronous generators, grids lose the inertia and voltage stiffness those machines provided; **grid-forming** inverters, which behave as controlled voltage sources emulating a synchronous machine, are being adopted to restore them.

::: example A 5 kW single-phase inverter {#ex-grid-inverter}
A single-phase inverter feeds a $230\,\mathrm V$, $50\,\mathrm{Hz}$ grid through a $5\,\mathrm{mH}$ filter inductor, and its fundamental output is $E = 240\,\mathrm V$. Find the angle $\delta$ needed for $5\,\mathrm{kW}$, and the reactive power delivered to the grid. What magnitude $E$ would deliver $5\,\mathrm{kW}$ at unity power factor at the grid?
::: solution
$X = 2\pi\times50\times0.005 = 1.571\,\Omega$. From [[#eq-power-transfer]], $\sin\delta = PX/(EV) = 5000\times1.571/(240\times230) = 0.142$, so $\delta = 8.2^\circ$. Then $Q = (240\times230\times\cos8.2^\circ - 230^2)/1.571 = (54\,637 - 52\,900)/1.571 = 1.11\,\mathrm{kvar}$ delivered to the grid.

For unity power factor at the grid ($Q = 0$): $E\cos\delta = V$, and $E\sin\delta = PX/V = 5000\times1.571/230 = 34.1\,\mathrm V$. So $E = \sqrt{230^2 + 34.1^2} = 232.5\,\mathrm V$ at $\delta = 8.4^\circ$: the inverter voltage leads the grid by the drop across the inductor, which is in quadrature with the current. The inverter's DC link must support this peak, $232.5\sqrt2 = 329\,\mathrm V$, plus margin for grid overvoltage — one reason single-phase grid inverters use DC links of $380$–$400\,\mathrm V$.
:::
:::

::: quiz
A grid-following inverter is asked to supply reactive power to support a sagging grid voltage, while keeping its real power constant. Which current component does its controller change, in a $dq$ frame aligned with the grid voltage?
- [ ] $i_d$, because it is in phase with the voltage.
- [x] $i_q$, the component in quadrature with the grid voltage.
- [ ] Both equally.
- [ ] Neither: reactive power is set by the DC-link voltage.
::: solution
In a frame aligned with the grid voltage, $P = \frac32V_di_d$ and $Q = -\frac32V_di_q$ (the sign depends on convention), so real and reactive power are decoupled: the $q$-axis current alone sets $Q$. This is why grid codes can specify reactive-current injection during faults independently of the active power.
:::
:::

### High-power grid applications

At the largest scale the same building blocks appear as:

- **HVDC transmission**: line-commutated thyristor converters ([[power-electronics/rectifiers]]) for bulk point-to-point links, and **voltage-source converters** based on the modular multilevel converter of [[power-electronics/inverters]] for offshore wind connections, multi-terminal grids and links to weak networks; VSC-HVDC can control real and reactive power independently and restart a grid without local generation.
- **FACTS** (flexible AC transmission systems): the **STATCOM**, an inverter with no real power source that injects controllable reactive current for voltage support; series compensators that control line power flow.
- **Solid-state transformers**: an AC–DC stage, a high-frequency isolated DC–DC stage (dual active bridges), and a DC–AC stage, replacing a line-frequency distribution transformer with a smaller unit that also offers DC ports and power-flow control.

::: warning Efficiency is not the whole story — check the chain
A system of converters in cascade multiplies efficiencies: a PFC stage at $98\,\%$, an isolated DC–DC stage at $97\,\%$ and a point-of-load buck at $92\,\%$ deliver only $0.98\times0.97\times0.92 = 87.5\,\%$ of the input power. When comparing architectures — a $12\,\mathrm V$ versus a $48\,\mathrm V$ server bus, AC versus DC distribution in a building, a single-stage versus two-stage charger — compute the product along each path, at realistic load levels: most power supplies spend most of their lives at $20$–$50\,\%$ load, where fixed losses (gate drive, core loss, controller) weigh most.
:::

::: application Data-centre power
A hyperscale data centre's power chain runs from the medium-voltage grid through a transformer, an uninterruptible power supply (often a double-conversion rectifier–inverter, or now a line-interactive design with batteries in each rack), a server power supply (PFC plus an LLC converter, $96$–$97\,\%$ efficient at its best), a $48\,\mathrm V$ or $12\,\mathrm V$ rack or board bus, and finally multiphase voltage regulators at less than $1\,\mathrm V$ for the processors and accelerators. With accelerator boards drawing over $1\,\mathrm{kW}$ each at under a volt, the last few centimetres of copper and the regulator's efficiency matter as much as the grid connection; vertical power delivery, in which the regulator sits directly beneath the processor, is the current frontier.
:::

::: history
The modern AC drive rests on three developments: Arnold Schönung and Herbert Stemmler's PWM inverter (1964); Felix Blaschke's field orientation (1972), developed at Siemens, together with the indirect method developed by Karl Hasse at Darmstadt (1969); and the IGBT (1982), which made compact, efficient drives possible. Isao Takahashi and Toshihiko Noguchi published direct torque control in 1986. The first grid-connected photovoltaic systems with transistor inverters appeared in the late 1970s and 1980s, and Germany's 1,000 Roofs programme (1990) and its Renewable Energy Sources Act (2000) turned residential PV inverters into a mass-produced product. The first commercial voltage-source HVDC link, a small scheme at Hellsjön in Sweden, entered service in 1997; the first using a modular multilevel converter, the Trans Bay Cable in San Francisco, in 2010.
:::

## Where this leads

The machines driven by the inverters of this chapter are analysed in depth in [[electric-machines]]; the grids that renewable inverters connect to, and the stability problems that high shares of converter-interfaced generation create, in [[power-systems]], especially [[power-systems/power-system-stability]] and [[power-systems/protection-smart-grid]]. The control methods — cascaded PI loops in rotating frames, phase-locked loops, MPPT — build on [[control-systems]] and are usually implemented digitally on the microcontrollers of [[embedded-systems]].

::: summary
- Variable-speed drives save energy in pumps and fans (power $\propto$ speed$^3$); V/f control keeps the flux constant with $V \propto f$, and field-oriented control regulates $i_d$ and $i_q$ in a rotating frame with PI loops.
- A PM machine's torque is $\frac32p[\psi_mi_q + (L_d - L_q)i_di_q]$; interior PM machines use negative $i_d$ for reluctance torque (MTPA) and for field weakening.
- PV converters track the maximum power point (perturb and observe, incremental conductance); wind converters decouple variable rotor speed from the grid, either fully or, in the DFIG, with a converter rated at about the slip range.
- Lithium-ion charging is CC–CV, implemented as nested current and voltage loops; EVs combine a traction inverter, an on-board charger, an auxiliary DC–DC converter and, increasingly, $800\,\mathrm V$ SiC technology.
- Power through a reactance is $P = (EV/X)\sin\delta$, $Q = (EV\cos\delta - V^2)/X$; grid-following inverters control $i_d$ and $i_q$ in a PLL-aligned frame, grid-forming inverters behave as voltage sources.
- Chains of converters multiply efficiencies; system architecture decides where losses fall.
:::

## Exercises

::: exercise Synchronous speed {level=1 check="120*60/6"}
A $6$-pole induction motor is fed at $60\,\mathrm{Hz}$. Find its synchronous speed in rpm.
::: solution
$n_s = 120f/P = 120\times60/6 = 1200\,\mathrm{rpm}$.
:::
:::

::: exercise Fan affinity {level=1 check="0.7^3"}
A fan is slowed from full speed to $70\,\%$ of full speed by a drive. To what fraction of its full-speed power does its shaft power fall (affinity laws)?
::: solution
$0.7^3 = 0.343$, about a third.
:::
:::

::: exercise Surface-magnet torque {level=1 check="1.5*3*0.1*50"}
A surface-magnet motor with $p = 3$ pole pairs and $\psi_m = 0.1\,\mathrm{Wb}$ runs with $i_d = 0$ and $i_q = 50\,\mathrm A$. Find its torque in newton-metres.
::: solution
$T = \frac32p\psi_mi_q = 1.5\times3\times0.1\times50 = 22.5\,\mathrm{N\,m}$.
:::
:::

::: exercise DFIG converter power {level=2 check="0.25*2e6"}
A $2\,\mathrm{MW}$-stator DFIG runs $25\,\%$ below synchronous speed while its stator delivers $2\,\mathrm{MW}$. How much power (in watts) flows through the rotor converter, in which direction, and what is the total delivered to the grid?
::: solution
$s = 0.25$, so the rotor converter must supply $sP_s = 0.5\,\mathrm{MW}$ *to* the rotor, drawn from the grid. The net power delivered is $P_s(1 - s) = 1.5\,\mathrm{MW}$, which equals the mechanical input. Above synchronous speed the flow reverses and the rotor adds to the output.
:::
:::

::: exercise Power angle {level=2 check="asin(3000*2*pi*50*4e-3/(235*230))*180/pi"}
An inverter of fundamental voltage $235\,\mathrm V$ feeds $3\,\mathrm{kW}$ into a $230\,\mathrm V$, $50\,\mathrm{Hz}$ grid through $4\,\mathrm{mH}$. Find the power angle in degrees and the reactive power delivered to the grid.
::: solution
$X = 1.257\,\Omega$. $\sin\delta = 3000\times1.257/(235\times230) = 0.0698$, so $\delta = 4.0^\circ$. $Q = (235\times230\cos4.0^\circ - 230^2)/1.257 = (53\,918 - 52\,900)/1.257 = 0.81\,\mathrm{kvar}$.
:::
:::

::: exercise Cascaded efficiency {level=2 check="0.98*0.975*0.94"}
A server's power path is a PFC stage ($98\,\%$), an LLC converter to $48\,\mathrm V$ ($97.5\,\%$) and a $48\,\mathrm V$-to-$1\,\mathrm V$ regulator ($94\,\%$). Find the overall efficiency, and the input power needed for $1\,\mathrm{kW}$ at the processor.
::: solution
$\eta = 0.98\times0.975\times0.94 = 0.898$; input $1000/0.898 = 1113\,\mathrm W$, so $113\,\mathrm W$ is lost — more than a tenth of the useful power, all of which the cooling system must also remove.
:::
:::

::: exercise Perturb and observe {level=2}
A PV converter runs perturb-and-observe with a step of $\Delta V = 0.5\,\mathrm V$ on the panel of the figure at full sun. Sketch the sequence of operating points starting at $28\,\mathrm V$, and explain why the steady state is a three-point oscillation around the MPP. What happens if irradiance rises during a step in which the voltage moved away from the MPP?
::: solution
From $28\,\mathrm V$ the power rises with each step ($28.5$, $29$, … $31.5$, $32\,\mathrm V$); once a step crosses the MPP (near $31.8\,\mathrm V$) the power falls, the direction reverses, and the operating point settles into a cycle such as $31.5 \to 32 \to 31.5 \to 31 \to 31.5 \to 32\ldots$, three levels around the peak, losing a little energy at the off-peak points. If irradiance rises during a step away from the MPP, the measured power still increases — because of the irradiance, not the step — and the algorithm wrongly continues in that direction; with rapidly changing irradiance (passing clouds) perturb-and-observe can drift away from the MPP until the irradiance stabilises. Incremental conductance, or limiting the step and comparing with a predicted change, reduces this error.
:::
:::

::: exercise Unity power factor at the grid {level=3}
For an inverter feeding a grid of voltage $V$ through reactance $X$ at power $P$ and unity power factor at the grid, (a) show that the inverter voltage must be $E = \sqrt{V^2 + (PX/V)^2}$ and the angle $\delta = \arctan(PX/V^2)$; (b) show that the reactive power at the *inverter* terminals is then $P^2X/V^2$, and interpret it; (c) evaluate for $P = 5\,\mathrm{kW}$, $V = 230\,\mathrm V$, $X = 1.571\,\Omega$.
::: solution
(a) Unity power factor at the grid means $\mathbf I = (P/V)\angle0$. Then $\mathbf E = \mathbf V + jX\mathbf I = V + jPX/V$, with magnitude $\sqrt{V^2 + (PX/V)^2}$ and angle $\arctan(PX/V^2)$. (b) The inverter's complex power is $\mathbf E\mathbf I^\ast = (V + jPX/V)(P/V) = P + jP^2X/V^2$: the inverter supplies $Q = I^2X$, the reactive power absorbed by the inductor. (c) $E = \sqrt{230^2 + 34.15^2} = 232.5\,\mathrm V$, $\delta = 8.45^\circ$, and $Q = 5000^2\times1.571/230^2 = 742\,\mathrm{var}$ — equal to $I^2X = 21.74^2\times1.571$.
:::
:::

::: exercise A drive's DC-link energy during a dip {level=3}
A $15\,\mathrm{kW}$ drive has a $560\,\mathrm V$ DC link with $1.5\,\mathrm{mF}$ of capacitance and trips at $400\,\mathrm V$. (a) For how long can it ride through a complete loss of supply at full load? (b) Explain how a drive can extend this ("kinetic buffering") by lowering the inverter frequency so that the motor regenerates, and estimate the kinetic energy available from a load inertia of $2\,\mathrm{kg\,m^2}$ at $1500\,\mathrm{rpm}$ if the drive may let the speed fall by $10\,\%$.
::: solution
(a) The usable energy is $\frac12C(V_1^2 - V_2^2) = 0.5\times1.5\times10^{-3}\times(560^2 - 400^2) = 0.75\times10^{-3}\times153\,600 = 115\,\mathrm J$; at $15\,\mathrm{kW}$ this lasts $7.7\,\mathrm{ms}$ — less than half a mains cycle. (b) By commanding a frequency slightly below the rotor's, the drive makes the motor generate, feeding the inertia's kinetic energy into the link to hold its voltage while supplying losses. $\omega = 157.1\,\mathrm{rad/s}$: $\frac12J(\omega_1^2 - \omega_2^2) = 0.5\times2\times(157.1^2 - 141.4^2) = 24\,674 - 19\,986 = 4.69\,\mathrm{kJ}$, forty times the capacitor's energy. If the load power falls with speed (a fan), this can carry the drive through dips of a second or more; for a load that keeps drawing $15\,\mathrm{kW}$ it would last about $0.3\,\mathrm s$.
:::
:::
