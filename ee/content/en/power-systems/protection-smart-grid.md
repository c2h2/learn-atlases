Faults cannot be prevented, only isolated. When a line, transformer or busbar develops a fault, the **protection system** must detect it, decide which circuit breakers to open, and open them, typically within $50$ to $100\,\mathrm{ms}$ on transmission systems, while leaving every healthy part of the network in service. It must do this reliably for faults that occur perhaps once a year on a given line, and it must *never* trip for the far more frequent events that only resemble faults: heavy loads, power swings, transformer inrush currents, faults on neighbouring equipment. The protection engineer's art is to combine the fault calculations of [[power-systems/symmetrical-faults]] and [[power-systems/unsymmetrical-faults]] with a handful of measuring principles into schemes that are fast, sensitive, selective and secure.

The second half of this chapter looks at how power systems are changing. Wind and solar plants, batteries, electric vehicles and controllable loads connect through power electronics, at every voltage level, and bring with them low inertia, limited fault currents, bidirectional power flows in distribution networks and enormous numbers of measurements. Together with the communications and control that coordinate them, these developments are called the **smart grid**. We meet the challenges they pose to protection and frequency control, and two of the tools that modern operation relies on: **synchrophasor** measurements and **state estimation**.

## Principles of protection

A protection system consists of **instrument transformers** that scale primary currents and voltages down to standard secondary values ($1$ or $5\,\mathrm A$, $100$ to $120\,\mathrm V$), **relays** that decide whether there is a fault, **circuit breakers** that interrupt the current, a reliable **DC supply** (station batteries) for the trip circuits, and, for many schemes, **communication** channels between the ends of a line.

::: definition Protective zones, primary and back-up protection {#def-zones}
Each element of the system (generator, transformer, busbar, line, motor) lies within a **protective zone**, bounded by the current transformers that feed its relays and by the circuit breakers that isolate it. Adjacent zones **overlap** around each breaker, so that no point is unprotected. The protection of a zone is its **primary protection**; it should clear faults inside the zone as fast as possible and ignore faults outside it. **Back-up protection**, local (a second relay or breaker-failure scheme at the same station) or remote (relays at neighbouring stations), clears the fault more slowly if the primary protection or its breaker fails.
:::

The required qualities pull against each other:

- **Dependability**: the protection must operate for every fault in its zone.
- **Security**: it must not operate for anything else. Together, dependability and security make up **reliability**.
- **Selectivity**: only the breakers nearest the fault should open.
- **Speed**: to limit damage and, above all, to preserve stability, since the critical clearing times of [[power-systems/power-system-stability]] are often only $0.1$ to $0.3\,\mathrm s$.
- **Sensitivity**: high-impedance faults, which draw little more than load current, must still be detected.

Transmission protection is usually **duplicated**: two independent systems from different manufacturers, on separate CT cores and DC supplies, each sufficient alone.

::: warning Current-transformer saturation
A current transformer reproduces the primary current faithfully only while its core is not saturated. The DC offset of a fault current ([[power-systems/symmetrical-faults]]) drives the flux up steadily over many cycles, and a CT that is adequate for the symmetrical current may saturate within a cycle when the offset is large and $X/R$ is high, delivering a distorted secondary current that is too small. Differential schemes are especially vulnerable, because saturation of one CT on a through fault produces a false differential current. CTs for protection are therefore specified by their accuracy limit factor and knee-point voltage with the burden and $X/R$ in mind, and relays include saturation detection.
:::

## Overcurrent protection

The simplest principle is that a fault draws a large current. An **overcurrent relay** trips when its current exceeds a **pick-up** setting $I_s$, chosen above the maximum load current and below the minimum fault current in its zone. On radial distribution feeders, where current flows one way, overcurrent relays at successive points along the feeder are **graded** in time, so that the relay nearest the fault trips first.

::: definition Inverse-time characteristic {#def-idmt}
An **inverse definite-minimum-time** (IDMT) overcurrent relay operates after a time that decreases as the current increases. The IEC 60255 **standard inverse** characteristic is
$$
t = \mathrm{TMS}\times\frac{0.14}{(I/I_s)^{0.02} - 1},
$$ {#eq-idmt}
where $I/I_s$ is the multiple of pick-up current and the **time multiplier setting** (TMS) scales the curve. "Very inverse" ($13.5/(M - 1)$) and "extremely inverse" ($80/(M^2 - 1)$) curves, with $M = I/I_s$, suit systems where the fault current falls sharply along the feeder, or coordination with fuses.
:::

The inverse characteristic gives fast tripping for close-in, heavy faults and slower tripping for remote, light ones, which is exactly what grading needs.

::: algorithm Grading overcurrent relays on a radial feeder {#alg-grading}
1. Start at the relay furthest from the source. Set its pick-up above the maximum load current it sees (with a margin of about $1.2$ to $1.5$) and its TMS as low as possible (or to coordinate with downstream fuses).
2. For the next relay upstream, set the pick-up above its own maximum load. Compute the operating time of the downstream relay for the **maximum** fault current at the downstream relay's location; the upstream relay must operate a **grading margin** later (typically $0.3$ to $0.4\,\mathrm s$, covering breaker opening time, relay overshoot and errors) for the same current. Solve [[#eq-idmt]] for the TMS.
3. Repeat towards the source. Check that every relay still detects the **minimum** fault current at the end of its back-up zone.
:::

::: example Grading two relays {#ex-grading}
On an $11\,\mathrm{kV}$ radial feeder, relay R2 at substation B protects the outgoing section; relay R1 at substation A protects the section A–B and backs up R2. Both use the standard inverse curve. R2 has $I_s = 300\,\mathrm A$ and $\mathrm{TMS} = 0.1$; R1 has $I_s = 400\,\mathrm A$. The maximum three-phase fault current just beyond B is $4000\,\mathrm A$ and at A it is $6000\,\mathrm A$. With a grading margin of $0.3\,\mathrm s$, choose the TMS of R1 (in steps of $0.025$) and find its operating time for a fault at A.
::: solution
R2 at $4000\,\mathrm A$: $M = 13.33$, $t_2 = 0.1\times0.14/(13.33^{0.02} - 1) = 0.1\times0.14/0.05317 = 0.263\,\mathrm s$.

R1 must then operate at $0.263 + 0.3 = 0.563\,\mathrm s$ for $4000\,\mathrm A$, at which $M = 10$ and $10^{0.02} - 1 = 0.04713$: $\mathrm{TMS} = 0.563\times0.04713/0.14 = 0.190$. Rounding up to $0.200$ gives $t_1 = 0.594\,\mathrm s$ at $4000\,\mathrm A$ (margin $0.33\,\mathrm s$).

For a fault at A ($6000\,\mathrm A$, $M = 15$), R1 operates in $0.2\times0.14/(15^{0.02} - 1) = 0.503\,\mathrm s$. Grading has a cost: the relay nearest the source is the slowest, although faults there are the most severe. This is why transmission systems, and increasingly distribution, use distance and differential protection, which need no time grading for faults inside their zone.
:::
:::

::: widget plot
f: T2*0.14/((x/300)^0.02 - 1); T1*0.14/((x/400)^0.02 - 1)
x: 500, 8000
y: 0, 3
sliders: T2=0.1:0.05:0.3:0.025; T1=0.2:0.05:0.5:0.025
vlines: 4000
labels: t_{R2}\ (\mathrm{s}),\ I_s = 300\,\mathrm A; t_{R1}\ (\mathrm{s}),\ I_s = 400\,\mathrm A
caption: Standard inverse curves of the two relays of [[#ex-grading]] against fault current in amperes; the vertical line marks the maximum fault current at B, where the grading margin is checked. With the settings found, R1's curve stays at least $0.3\,\mathrm s$ above R2's at $4000\,\mathrm A$, and further above at lower currents. Raise R2's TMS and see R1 forced upwards in turn: each step towards the source adds delay. Lower R1 below about $0.19$ and the curves come too close at high current, so R1 would trip for a fault that R2 should clear.
:::

On meshed networks, or wherever fault current can flow in both directions (rings, parallel lines, feeders with distributed generation), overcurrent relays are made **directional**: they compare the phase of the current with a polarising voltage and operate only for faults in the forward direction.

## Distance protection

A transmission line's impedance is proportional to its length. A relay at one end that measures the ratio of voltage to current during a fault therefore measures the distance to the fault, independently of the source strength. This is **distance** (impedance) protection, the standard protection of transmission lines.

::: theorem Apparent impedance seen by a distance relay {#thm-apparent-impedance}
For a bolted three-phase fault at a fraction $m$ of the length of a line with positive-sequence impedance $Z_1$, a relay at the sending end measures $\mathbf V/\mathbf I = mZ_1$. For a bolted single line-to-ground fault on phase $a$, fed from the relay end, the relay measures $mZ_1$ if it uses the **compensated** current:
$$
\frac{\mathbf V_a}{\mathbf I_a + k_0\cdot3\mathbf I_0} = mZ_1,\qquad k_0 = \frac{Z_0 - Z_1}{3Z_1},
$$ {#eq-distance}
where $Z_0$ is the line's zero-sequence impedance and $k_0$ the **residual compensation factor**.
:::

::: proof
Three-phase: the fault point is at zero voltage, so the relay voltage is the drop along the faulted length, $\mathbf V = mZ_1\mathbf I$.

SLG: in each sequence network the voltage at the relay exceeds the voltage at the fault by the drop in the line section, $\mathbf V_s^{\text{relay}} = \mathbf V_s^{\text{fault}} + mZ_s\mathbf I_s$ for $s = 0, 1, 2$, with $Z_2 = Z_1$. At the fault $\mathbf V_a^{\text{fault}} = \mathbf V_0 + \mathbf V_1 + \mathbf V_2 = 0$. Adding the three sequences at the relay:
$$
\mathbf V_a = mZ_1(\mathbf I_1 + \mathbf I_2) + mZ_0\mathbf I_0 = mZ_1(\mathbf I_a - \mathbf I_0) + mZ_0\mathbf I_0 = mZ_1\Bigl(\mathbf I_a + \frac{Z_0 - Z_1}{Z_1}\mathbf I_0\Bigr),
$$
using $\mathbf I_a = \mathbf I_0 + \mathbf I_1 + \mathbf I_2$. Writing $\frac{Z_0 - Z_1}{Z_1}\mathbf I_0 = k_0\cdot3\mathbf I_0$ gives [[#eq-distance]]. The residual current $3\mathbf I_0$ is the sum of the three phase currents, available from the CTs.
:::

A distance relay has several **zones**. **Zone 1** is set to about $80$ to $85\,\%$ of the line impedance and trips instantaneously; it deliberately **underreaches**, because errors in CTs, VTs and line data could otherwise make it trip for faults just beyond the remote bus. **Zone 2** covers the rest of the line plus a margin (typically $120\,\%$ of the line, or the line plus half the shortest adjacent line) with a delay of $0.3$ to $0.5\,\mathrm s$, and **zone 3** provides remote back-up with a longer delay. With a communication channel, the two ends exchange signals so that the whole line is cleared instantaneously (**pilot** or **teleprotection** schemes such as permissive overreach). The relay characteristic in the $R$–$X$ plane, a circle through the origin (**mho**) or a polygon (**quadrilateral**), must contain the line impedance and some fault resistance while excluding the load impedance and the trajectories of stable power swings.

::: example Setting a distance relay {#ex-distance}
A $100\,\mathrm{km}$, $132\,\mathrm{kV}$ line has $z_1 = 0.08 + j0.40\,\Omega/\mathrm{km}$ and $z_0 = 0.25 + j1.20\,\Omega/\mathrm{km}$. The relay is fed from $800/1\,\mathrm A$ CTs and $132\,000/110\,\mathrm V$ VTs. (a) Find the zone 1 (80 %) and zone 2 (120 %) settings in secondary ohms and the residual compensation factor. (b) A single line-to-ground fault occurs at $50\,\mathrm{km}$, fed only from the relay end, with no load current. What impedance would an **uncompensated** relay (measuring $\mathbf V_a/\mathbf I_a$) see, and what distance would it indicate?
::: solution
(a) $Z_1 = 8 + j40\,\Omega$ and $Z_0 = 25 + j120\,\Omega$ for the whole line. Secondary ohms are primary ohms times $(\text{CT ratio})/(\text{VT ratio}) = 800/1200 = 0.667$. Zone 1: $0.8Z_1 = 6.4 + j32\,\Omega$ primary, $4.27 + j21.3\,\Omega$ secondary ($21.8\,\Omega$ at $78.7^\circ$). Zone 2: $1.2Z_1 = 9.6 + j48\,\Omega$ primary, $6.4 + j32\,\Omega$ secondary ($32.6\,\Omega$). $k_0 = (Z_0 - Z_1)/(3Z_1) = (17 + j80)/(24 + j120) = 0.668\angle-0.7^\circ$.

(b) With a single source and no load, only phase $a$ carries current, so $\mathbf I_0 = \mathbf I_a/3$ and the uncompensated relay sees, by [[#eq-distance]], $\mathbf V_a/\mathbf I_a = mZ_1(1 + k_0) = m(2Z_1 + Z_0)/3 = 0.5(41 + j200)/3 = 6.83 + j33.3\,\Omega$, which corresponds to $83\,\mathrm{km}$ of positive-sequence impedance. The fault at the middle of the line would look as if it were beyond the zone 1 reach of $80\,\mathrm{km}$, and would be cleared only in zone 2 time. Residual compensation is essential for earth faults.
:::
:::

::: quiz
Why is zone 1 of a distance relay set to about $80\,\%$ of the line rather than $100\,\%$?
- [ ] Because the last $20\,\%$ of the line has no impedance
- [x] So that measurement and data errors cannot make it trip instantaneously for faults just beyond the remote bus, which belong to another zone
- [ ] Because fault currents are too small near the far end
- [ ] To leave time for the breaker at the far end to open
::: solution
Zone 1 trips without delay, so it must never overreach into the next line, where it would destroy selectivity. CT and VT errors, uncertainty in line impedance and the effect of fault resistance and infeed add up to $10$ to $20\,\%$, hence the margin. The far end of the line is covered by zone 2 (with delay) or by a communication scheme.
:::
:::

## Differential protection

The most selective principle is **Kirchhoff's current law**: the currents entering a healthy zone sum to zero, so a non-zero sum means a fault inside it. **Differential protection** compares the CT secondary currents at all boundaries of the zone. It is inherently selective (it ignores external faults, however large) and fast, and it is used for generators, transformers, busbars, and, with communication between the ends, for lines (**line current differential**).

::: definition Biased (percentage) differential relay {#def-differential}
For a zone with boundary currents $\mathbf I_1,\dots,\mathbf I_n$ (referred to the secondary and all measured into the zone), the **operating** (differential) current and the **restraining** (bias) current are
$$
I_{\text{op}} = \Bigl\lvert\sum_k\mathbf I_k\Bigr\rvert,\qquad I_{\text{res}} = \frac12\sum_k\abs{\mathbf I_k}.
$$ {#eq-differential}
The relay trips if $I_{\text{op}} > \max(I_{\min},\,K\,I_{\text{res}})$, where $I_{\min}$ is a minimum pick-up and $K$ the **bias slope** (typically $20$ to $50\,\%$).
:::

The bias makes the relay less sensitive when large currents flow through the zone, which is exactly when CT errors and mismatches produce spurious differential current. For example, an external fault drives $20\,\mathrm A$ (secondary) through a zone, but CT errors make the two secondary currents differ by $5\,\%$: $I_{\text{op}} = 1\,\mathrm A$, $I_{\text{res}} = 19.5\,\mathrm A$, and with $K = 0.3$ the threshold is $5.9\,\mathrm A$, so the relay restrains. An internal fault fed from both sides with $8\,\mathrm A$ and $5\,\mathrm A$ gives $I_{\text{op}} = 13\,\mathrm A$ against a threshold of $0.3\times6.5 = 1.95\,\mathrm A$: it trips.

Transformer differential protection must also correct for the transformer's ratio, its phase shift (by CT connections or, in numerical relays, by software matrices) and the removal of zero-sequence current on the star side, and it must not trip on **magnetising inrush**, the large current drawn when a transformer is energised, which flows on one side only and so looks like an internal fault. Inrush is rich in second harmonic, and relays block (restrain) when the second-harmonic content exceeds about $15\,\%$ of the fundamental.

::: application Busbars, breaker failure and auto-reclosing
A busbar fault is rare but severe, because every circuit on the bus feeds it; busbar differential protection with fast CT-saturation detection clears it in one cycle. **Breaker-failure** protection, started by any trip, checks that current has stopped within about $150\,\mathrm{ms}$ and, if not, trips all adjacent breakers. On overhead lines, about $80\,\%$ of faults are transient, so **auto-reclosing** (often single-pole, as in [[power-systems/power-system-stability]]) restores the line after a dead time of a few hundred milliseconds.
:::

## The changing power system

### Inverter-based resources

Wind turbines, photovoltaic plants and batteries connect to the grid through voltage-source converters ([[power-electronics]]). Their behaviour is set by control software, not by the physics of a rotating machine, and differs in three ways that matter here.

- **No inherent inertia.** A converter does not slow down when frequency falls, so it does not contribute kinetic energy to arrest a frequency decline. As synchronous generation is displaced, the system inertia $H$ of [[power-systems/economic-dispatch-control]] falls and the rate of change of frequency after a loss of generation rises. Remedies include **synthetic inertia** and **fast frequency response** from batteries (full output in a fraction of a second), synchronous condensers, and **grid-forming** converter controls that behave like a voltage source.
- **Limited fault current.** Semiconductors cannot tolerate overcurrent, so a converter's fault current is limited to about $1.1$ to $1.5$ times rated current, and its phase and sequence content are set by control (often positive sequence only). Protection that relies on large fault currents, or on negative-sequence quantities, may not see faults in areas fed mainly by converters.
- **Fast, controllable response.** Converters can inject reactive current to support voltage during faults (**fault ride-through**, now required by grid codes) and change power within milliseconds, which helps stability if properly controlled and can cause new oscillation problems (control interactions, sub-synchronous oscillations with weak grids) if not.

### Distributed generation in distribution networks

Distribution networks were designed for one-way flow from the substation. Generation connected along a feeder changes both the voltage profile (voltage rises where generation exceeds local load, the reverse of the drop in [[power-systems/power-system-structure]]) and the fault currents seen by the protection.

::: example Protection blinding by distributed generation {#ex-blinding}
An $11\,\mathrm{kV}$ feeder $10\,\mathrm{km}$ long has $z = 0.30 + j0.35\,\Omega/\mathrm{km}$ and is supplied from a substation whose source impedance is $j0.5\,\Omega$ per phase. A $5\,\mathrm{MVA}$ synchronous generator with $X_d'' = 0.15\,\mathrm{pu}$ is connected at the midpoint ($5\,\mathrm{km}$). Find the current seen by the substation relay for a three-phase fault at the end of the feeder, with and without the generator.
::: solution
The source phase voltage is $11\,000/\sqrt3 = 6351\,\mathrm V$. Without the generator, the fault impedance is $j0.5 + 10(0.30 + j0.35) = 3.0 + j4.0\,\Omega$, so $I = 6351/5.0 = 1270\,\mathrm A$.

With the generator: its reactance is $0.15\times11^2/5 = j3.63\,\Omega$. Let D be the midpoint. Its Thévenin sources are the substation behind $Z_a = j0.5 + 5(0.30 + j0.35) = 1.5 + j2.25\,\Omega$ and the generator behind $j3.63\,\Omega$, both at $6351\,\mathrm V$, and the fault is $Z_b = 1.5 + j1.75\,\Omega$ beyond D. Nodal analysis at D gives $\mathbf V_D$, and then the substation current $(\mathbf V_s - \mathbf V_D)/Z_a$ has magnitude $985\,\mathrm A$, the generator supplies $734\,\mathrm A$ and the fault current is $1646\,\mathrm A$. The total fault current *rises*, but the substation relay sees $22\,\%$ less. If its pick-up had been set at, say, $1100\,\mathrm A$ to ride through cold-load pick-up, it would no longer detect the fault: the generator has **blinded** it. Remedies include lower or adaptive settings, directional or distance relays on the feeder, and requiring the generator to disconnect quickly on faults (which conflicts with ride-through requirements on the transmission system).
:::
:::

### Synchrophasors and state estimation

A **phasor measurement unit** (PMU) samples voltages and currents, synchronised to within a microsecond by GPS time, and reports their phasors (magnitude *and* absolute phase angle) typically $25$ to $60$ times per second (IEC/IEEE 60255-118-1). Phase angles between distant buses, previously only inferred, become directly measurable; **wide-area monitoring** systems use them to watch inter-area oscillations, angle separation and frequency in real time, and to verify models after disturbances.

Control centres have long combined slower SCADA measurements (flows, injections, voltage magnitudes, breaker statuses) into a consistent picture of the network by **state estimation**: finding the bus voltages that best fit many redundant, noisy measurements, and detecting bad data.

::: theorem Weighted least-squares state estimate {#thm-wls}
Let the measurement vector $\mathbf z$ ($m$ values) be related to the state $\mathbf x$ ($n < m$ values) by the linear model $\mathbf z = H\mathbf x + \mathbf e$, with independent errors of variances $\sigma_i^2$, and let $W = \operatorname{diag}(1/\sigma_i^2)$. The estimate minimising $J(\mathbf x) = (\mathbf z - H\mathbf x)^{\mathsf T}W(\mathbf z - H\mathbf x)$ is
$$
\hat{\mathbf x} = (H^{\mathsf T}WH)^{-1}H^{\mathsf T}W\mathbf z,
$$ {#eq-wls}
provided $H$ has full column rank (the network is **observable**). For the nonlinear AC model $\mathbf z = \mathbf h(\mathbf x) + \mathbf e$, the same formula is applied iteratively with $H$ the Jacobian of $\mathbf h$, as in Newton's method.
:::

::: proof
$J$ is a convex quadratic. Its gradient is $-2H^{\mathsf T}W(\mathbf z - H\mathbf x)$; setting it to zero gives the **normal equations** $H^{\mathsf T}WH\,\hat{\mathbf x} = H^{\mathsf T}W\mathbf z$. If $H$ has full column rank and $W$ is positive definite, $H^{\mathsf T}WH$ is positive definite, hence invertible, and the stationary point is the unique minimum.
:::

::: example A DC state estimate {#ex-state-estimation}
In the three-bus network of [[power-systems/power-flow]] (bus 1 the reference, line reactances $x_{12} = 0.06$, $x_{13} = 0.24$, $x_{23} = 0.18\,\mathrm{pu}$), four measurements with equal accuracy are received: $P_{12} = 0.27$, $P_{13} = 0.54$, $P_{23} = 0.66$ and the injection $P_3 = -1.18\,\mathrm{pu}$. Using the DC model, estimate $\theta_2$ and $\theta_3$ and the "true" flows.
::: solution
From the DC power flow, $P_{12} = -\theta_2/0.06$, $P_{13} = -\theta_3/0.24$, $P_{23} = (\theta_2 - \theta_3)/0.18$ and $P_3 = -\theta_2/0.18 + \theta_3(1/0.24 + 1/0.18)$, so
$$
H = \begin{bmatrix}-16.667 & 0\\ 0 & -4.167\\ 5.556 & -5.556\\ -5.556 & 9.722\end{bmatrix},\qquad H^{\mathsf T}H = \begin{bmatrix}339.5 & -84.88\\ -84.88 & 142.7\end{bmatrix},\qquad H^{\mathsf T}\mathbf z = \begin{bmatrix}5.722\\ -17.389\end{bmatrix}.
$$
With $W = I$, [[#eq-wls]] gives $\theta_2 = -0.01597\,\mathrm{rad}$ ($-0.92^\circ$) and $\theta_3 = -0.1313\,\mathrm{rad}$ ($-7.52^\circ$). The estimated quantities are $P_{12} = 0.266$, $P_{13} = 0.547$, $P_{23} = 0.641$ and $P_3 = -1.188$; the residuals are $0.004$, $-0.007$, $0.019$ and $0.008$, and $J = 5.0\times10^{-4}$. Small, similar residuals indicate consistent data. A gross error in one meter would show up as a large $J$ (tested against a $\chi^2$ distribution with $m - n = 2$ degrees of freedom) and a large normalised residual at that meter, which is how bad data are detected and removed.
:::
:::

### Storage, flexibility and microgrids

Batteries, now installed at hundreds of megawatts per site, provide fast frequency response, shift solar energy into the evening peak and relieve congested lines. Flexible demand (electric-vehicle charging, heat pumps, industrial processes) is increasingly scheduled by price signals or direct control (**demand response**). **Microgrids** (a campus, an island, a military base) can disconnect from the main grid and run autonomously on local generation and storage, which demands protection and control that work with both high grid fault currents and low converter fault currents. Smart meters give two-way communication with millions of customers; the same connectivity raises **cybersecurity** to a first-order reliability concern.

::: history
Electromechanical overcurrent relays appeared around 1900, and Charles Merz and Bernard Price patented the current-differential principle (the Merz–Price system) in 1904. Distance relays were developed in the 1920s for the growing transmission networks, and static (transistor) relays from the 1960s. The first commercially successful microprocessor-based distance relay was introduced by Schweitzer Engineering Laboratories in 1984, and numerical relays are now standard. Fred C. Schweppe introduced power-system state estimation in a series of papers in 1970. Arun G. Phadke and James S. Thorp at Virginia Tech built the first prototype phasor measurement units in the 1980s, using GPS time synchronisation, and the first commercial PMU followed in the early 1990s. The North American blackout of 14 August 2003, in which the failure of alarm software and inadequate situational awareness let a cascade develop, accelerated the deployment of synchrophasor networks and mandatory reliability standards.
:::

## Where this leads

This chapter closes the course, but each of its threads continues. Protection is a profession in its own right, with standards (IEC 60255, IEEE C37) and specialised texts such as Blackburn and Domin's *Protective Relaying*. The integration of renewables connects this course with [[power-electronics]], whose converters now determine much of the dynamic behaviour of the grid, and with [[control-systems]], whose methods are used to design grid-forming controls and damping controllers. Market operation builds on the dispatch and DC power flow of [[power-systems/economic-dispatch-control]] and [[power-systems/power-flow]], and state estimation on the least-squares methods of linear algebra and the statistics of [[random-signals]].

::: summary
- Protection divides the system into overlapping zones, each with fast primary protection and slower back-up; it must be dependable, secure, selective, fast and sensitive.
- Overcurrent relays use inverse-time curves such as $t = \mathrm{TMS}\times0.14/((I/I_s)^{0.02} - 1)$ and are graded with a margin of about $0.3\,\mathrm s$ on radial feeders; directional elements are needed where current can flow both ways.
- Distance relays measure $\mathbf V/\mathbf I$, proportional to the distance to the fault; earth-fault elements need residual compensation $k_0 = (Z_0 - Z_1)/(3Z_1)$; zone 1 covers about $80\,\%$ instantaneously.
- Differential protection applies KCL to a zone; biased characteristics tolerate CT errors on through faults; transformer schemes add ratio, phase and inrush corrections.
- Inverter-based resources bring low inertia, limited and controlled fault currents and fast controllability; distributed generation can blind feeder protection and reverse flows.
- PMUs measure time-synchronised phasors; state estimation fits a network model to redundant measurements by weighted least squares, $\hat{\mathbf x} = (H^{\mathsf T}WH)^{-1}H^{\mathsf T}W\mathbf z$, and detects bad data.
:::

## Exercises

::: exercise Relay operating time {level=1 check="0.15*0.14/(8^0.02-1)"}
An IEC standard-inverse relay with $\mathrm{TMS} = 0.15$ sees a current of $8$ times its pick-up. Find its operating time in seconds.
::: solution
$t = 0.15\times0.14/(8^{0.02} - 1) = 0.021/0.04245 = 0.495\,\mathrm s$.
:::
:::

::: exercise Secondary impedance {level=1 check="20*(600/1)/(220000/110)"}
A distance relay on a $220\,\mathrm{kV}$ line uses $600/1\,\mathrm A$ CTs and $220\,000/110\,\mathrm V$ VTs. A primary impedance of $20\,\Omega$ corresponds to how many secondary ohms?
::: solution
$Z_{\text{sec}} = Z_{\text{prim}}\times\text{CT ratio}/\text{VT ratio} = 20\times600/2000 = 6.0\,\Omega$.
:::
:::

::: exercise Residual compensation {level=1 check="(3-1)/3"}
A line has $Z_0 = 3Z_1$ (same angle). Find $k_0$.
::: solution
$k_0 = (3Z_1 - Z_1)/(3Z_1) = 2/3 = 0.667$.
:::
:::

::: exercise Pick-up setting {level=2 check="1.3*350"}
A feeder's maximum load current is $350\,\mathrm A$, and the minimum fault current at the end of its back-up zone is $1200\,\mathrm A$. With a load margin of $1.3$, find the pick-up current in amperes and check that the back-up zone is covered with a sensitivity factor of at least $1.5$.
::: solution
$I_s = 1.3\times350 = 455\,\mathrm A$; the minimum fault is $1200/455 = 2.64$ times pick-up, above $1.5$, so the setting is acceptable.
:::
:::

::: exercise Bias characteristic {level=2 check="0.25*(10+9.2)/2"}
A biased differential relay has $K = 25\,\%$ and $I_{\min} = 0.2\,\mathrm A$. On an external fault the two secondary currents into the zone are $10\,\mathrm A$ and $-9.2\,\mathrm A$. Find the operating threshold in amperes and decide whether the relay trips.
::: solution
$I_{\text{op}} = 0.8\,\mathrm A$, $I_{\text{res}} = (10 + 9.2)/2 = 9.6\,\mathrm A$, threshold $\max(0.2, 0.25\times9.6) = 2.4\,\mathrm A$. Since $0.8 < 2.4$, the relay restrains: the $8\,\%$ mismatch is treated as CT error.
:::
:::

::: exercise Distance to a fault {level=2 check="6.4/0.40"}
During an earth fault, the relay of [[#ex-distance]] measures a compensated primary impedance of $1.28 + j6.4\,\Omega$. How far from the relay, in km, is the fault, and in which zone does the relay trip?
::: solution
With residual compensation the relay measures $mZ_1$, so the distance is the measured impedance divided by $z_1$: $(1.28 + j6.4)/(0.08 + j0.40) = 16\,\mathrm{km}$. This is well inside the $80\,\mathrm{km}$ reach of zone 1, so the relay trips instantaneously.
:::
:::

::: exercise Rate of change of frequency with less inertia {level=2 check="-0.04*50/(2*2.5)"}
A $50\,\mathrm{Hz}$ system's inertia falls from $H = 5\,\mathrm s$ to $2.5\,\mathrm s$ as converter-based generation replaces synchronous plant. Find the initial RoCoF in Hz/s after a sudden loss of $4\,\%$ of supply at the lower inertia, and compare it with a typical RoCoF relay setting of $1\,\mathrm{Hz/s}$.
::: solution
RoCoF $= -0.04\times50/(2\times2.5) = -0.4\,\mathrm{Hz/s}$, twice the $-0.2\,\mathrm{Hz/s}$ at $H = 5\,\mathrm s$. It is below $1\,\mathrm{Hz/s}$, but older RoCoF-based loss-of-mains relays on distributed generators were often set at $0.125$ to $0.5\,\mathrm{Hz/s}$ and would trip, removing more generation and worsening the event; this is why such settings have been raised in several countries.
:::
:::

::: exercise Grading with a very inverse curve {level=3}
Repeat [[#ex-grading]] using the IEC very inverse curve $t = \mathrm{TMS}\times13.5/(M - 1)$ for both relays (R2 with $\mathrm{TMS} = 0.1$). Find R1's TMS, its time for a fault at A, and comment on the comparison.
::: hint
At $4000\,\mathrm A$, $M_2 = 13.33$ and $M_1 = 10$.
:::
::: solution
R2: $t_2 = 0.1\times13.5/12.33 = 0.109\,\mathrm s$. R1 needs $0.409\,\mathrm s$ at $M_1 = 10$: $\mathrm{TMS} = 0.409\times9/13.5 = 0.273$, say $0.275$ ($t = 0.4125\,\mathrm s$). At A ($M = 15$): $t_1 = 0.275\times13.5/14 = 0.265\,\mathrm s$, much faster than the $0.503\,\mathrm s$ of the standard inverse grading. The very inverse curve suits this feeder because the fault current changes appreciably between A and B ($6000$ versus $4000\,\mathrm A$); where source impedance dominates and fault current varies little along the feeder, standard inverse or definite-time grading is better.
:::
:::

::: exercise Observability and redundancy {level=3}
In [[#ex-state-estimation]], suppose only the measurements $P_{12}$ and $P_{13}$ are available. Show that the state is observable and that the estimate reproduces both measurements exactly, so that a bad measurement cannot be detected. What is the minimum number of measurements, and why does practice use two to three times as many?
::: solution
$H = \begin{bmatrix}-16.667 & 0\\0 & -4.167\end{bmatrix}$ has full rank, so $\hat\theta_2 = -0.27/16.667 = -0.0162$ and $\hat\theta_3 = -0.54/4.167 = -0.1296$ are determined, and the residuals are zero whatever the measured values: with $m = n$ there is no redundancy, so $J = 0$ always and an error in either meter passes straight into the estimate. The minimum is $n$ measurements arranged to make $H$ full rank; with $m = n + 1$ a bad datum is detectable but not identifiable (any single meter could be blamed); identifying and removing it requires further redundancy, which is why real systems have $m/n$ of about $2$ to $3$, together with pseudo-measurements from load forecasts where meters are lacking.
:::
:::
