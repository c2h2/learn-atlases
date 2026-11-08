A laptop processor needs about $1\,\mathrm{V}$ at tens of amperes; the battery supplies $12$ to $20\,\mathrm{V}$. A **linear regulator** — a transistor in series with the load, acting as a controlled resistor — could make the conversion, but it would drop the whole difference across itself: at $12\,\mathrm{V}$ in and $1\,\mathrm{V}$ out it wastes eleven watts for every watt it delivers. The circuit that actually does the job, the **buck converter** beside the processor, chops the input with a transistor switching a million times a second and smooths the result with an inductor and a capacitor, and it reaches $90\,\%$ efficiency. The difference between the two is the central idea of power electronics: **a switch that is either fully on or fully off dissipates almost nothing**, because when it is on the voltage across it is nearly zero and when it is off the current through it is zero.

Real switches are not ideal. They need a small voltage to conduct, they take nanoseconds to change state, they must be driven, and they have limits on voltage, current and temperature. This chapter is about those switches: the power diode, the power MOSFET, the IGBT, the thyristor, and the silicon-carbide and gallium-nitride devices that are replacing silicon in many applications. We build loss models from the device physics — the on-state resistance of a drift region, the overlap of voltage and current during a transition — and learn to drive a MOSFET's gate. The device physics behind this chapter is in [[semiconductor-devices/mosfets]] and [[semiconductor-devices/pn-junction]]; diode circuit models are in [[electronics-1/diode-circuits]].

## Switches instead of resistors

::: definition Ideal switch and switch quadrants {#def-switch}
An **ideal switch** has two states: **on**, in which the voltage across it is zero whatever the current, and **off**, in which the current through it is zero whatever the voltage; it changes state instantaneously and needs no power to control. Its power $p = vi$ is therefore zero at every instant. A switch is classified by the signs of the on-state current $i$ and the off-state voltage $v$ it can support:

- a **single-quadrant** switch carries $i > 0$ and blocks $v > 0$ only (a diode, which is uncontrolled, or a MOSFET or IGBT used without its reverse path);
- a **two-quadrant current-bidirectional** switch carries current both ways but blocks only $v > 0$ (a MOSFET with its body diode, an IGBT with an anti-parallel diode);
- a **two-quadrant voltage-bidirectional** switch blocks both polarities but conducts one way (a thyristor, or a transistor in series with a diode);
- a **four-quadrant** switch does both (two transistors back to back).
:::

The quadrant requirement comes from the circuit: we shall see in [[power-electronics/dc-dc-converters]] that a converter's switches are dictated by the direction of current and polarity of voltage at each switch position, and that a passive diode can replace an active switch wherever the circuit turns it on and off at the right moments by itself.

::: example Linear versus switching regulation {#ex-linear-vs-switching}
A $12\,\mathrm{V}$ supply must deliver $3.3\,\mathrm{V}$ at $5\,\mathrm{A}$. (a) Find the efficiency and dissipation of a linear regulator. (b) A buck converter uses a MOSFET of on-resistance $R_{on} = 10\,\mathrm{m\Omega}$ that conducts for a fraction $D = 0.275$ of each period, and a second MOSFET of $10\,\mathrm{m\Omega}$ that conducts for the rest; the inductor current is essentially a constant $5\,\mathrm{A}$. Ignoring switching losses, find the conduction losses and the efficiency.
::: solution
(a) The series transistor carries the load current and drops $12 - 3.3 = 8.7\,\mathrm{V}$, so it dissipates $8.7\times5 = 43.5\,\mathrm{W}$ while the load receives $3.3\times5 = 16.5\,\mathrm{W}$. The efficiency is $16.5/60 = 27.5\,\%$ — it can never exceed $V_{out}/V_{in}$.

(b) Each MOSFET dissipates $I^2R_{on}$ while it conducts. Between them one of the two is always conducting, so the total conduction loss is $5^2\times0.010 = 0.25\,\mathrm{W}$, whatever $D$ is. The efficiency is $16.5/(16.5 + 0.25) = 98.5\,\%$. Switching losses (computed below) typically reduce this by one to three percentage points, but the advantage over the linear regulator — a factor of about $170$ in dissipation — is overwhelming.
:::
:::

The price of switching is that the switched waveform is a pulse train, not the smooth voltage the load wants. Inductors and capacitors filter it, and the higher the switching frequency, the smaller they can be. But every transition of a real switch costs energy, so loss rises with frequency. The whole art of choosing and driving switches is the compromise between conduction loss, switching loss, and the size of the passive components.

## Power diodes

A power diode differs from a signal diode in one essential feature: a thick, lightly doped **drift region** between the heavily doped anode and cathode. The drift region is what blocks voltage. When the diode is reverse biased, the depletion region spreads through it, and the reverse voltage it can hold before avalanche breakdown is set by its thickness and doping.

::: theorem Unipolar limit of a drift region {#thm-unipolar-limit}
A drift region of thickness $W$ and donor density $N_D$, designed so that at breakdown it is just fully depleted with a triangular field profile reaching the critical field $E_c$ at the junction, blocks

$$
V_B = \tfrac12E_cW,\qquad N_D = \frac{\varepsilon E_c}{qW},
$$

and when conducting by majority carriers alone it has the **specific on-resistance** (resistance times area)

$$
R_{on,sp} = \frac{W}{q\mu_nN_D} = \frac{4V_B^2}{\varepsilon\mu_nE_c^3}.
$$ {#eq-ron-sp}

The on-resistance of a unipolar device thus grows as the *square* of its voltage rating, and falls as the cube of the material's critical field.
:::

::: proof
In the depleted drift region Gauss's law gives $\dd E/\dd x = qN_D/\varepsilon$, so the field falls linearly from $E_c$ at the junction to zero at the far edge if $W = \varepsilon E_c/(qN_D)$; this is the doping relation. The voltage is the area under the triangle, $V_B = \frac12E_cW$, so $W = 2V_B/E_c$. In conduction the drift region is a resistor of resistivity $1/(q\mu_nN_D)$ and length $W$; per unit area its resistance is $W/(q\mu_nN_D)$. Substituting $N_D = \varepsilon E_c/(qW)$ gives $W^2/(\varepsilon\mu_nE_c)$, and substituting $W = 2V_B/E_c$ gives [[#eq-ron-sp]]. A non-punch-through design with a slightly different profile changes the constant but not the $V_B^2/E_c^3$ scaling. (The critical field itself rises slowly as the doping increases, so the exponent of $V_B$ is closer to $2.5$ in careful treatments; see Baliga's text.)
:::

The denominator $\varepsilon\mu_nE_c^3$ is **Baliga's figure of merit**. Silicon has $E_c \approx 0.3\,\mathrm{MV/cm}$; 4H silicon carbide about $2.5\,\mathrm{MV/cm}$ and gallium nitride about $3.3\,\mathrm{MV/cm}$. Because the critical field enters cubed, the same voltage can be blocked by a drift region about ten times thinner and a hundred times more heavily doped, with a specific on-resistance two to three orders of magnitude lower. That single fact is why wide-bandgap devices have transformed power electronics above a few hundred volts.

| material | $E_c$ ($\mathrm{MV/cm}$) | $\mu_n$ ($\mathrm{cm^2/(V\,s)}$) | $\varepsilon_r$ | $W$ for $600\,\mathrm{V}$ | $R_{on,sp}$ for $600\,\mathrm{V}$ |
|---|---|---|---|---|---|
| Si | $0.3$ | $1350$ | $11.7$ | $40\,\mathrm{\mu m}$ | $38\,\mathrm{m\Omega\,cm^2}$ |
| 4H-SiC | $2.5$ | $950$ | $9.7$ | $4.8\,\mathrm{\mu m}$ | $0.11\,\mathrm{m\Omega\,cm^2}$ |
| GaN | $3.3$ | $1200$ | $9.0$ | $3.6\,\mathrm{\mu m}$ | $0.04\,\mathrm{m\Omega\,cm^2}$ |

A silicon $600\,\mathrm{V}$ diode does not suffer this resistance, because it is a **PiN diode**: under forward bias the anode injects holes and the cathode electrons into the drift region in numbers far exceeding the doping, a condition called **conductivity modulation**, and the drift region's resistance collapses. The price is stored charge. The injected carriers must be removed before the diode can block again, and that takes time.

::: definition Forward model and reverse recovery {#def-diode-recovery}
In conduction a power diode is modelled as a threshold voltage in series with a resistance, $v_F = V_{F0} + r_Di_F$. When a forward current is forced to reverse (by the circuit commutating it to another device), the diode first conducts a **reverse-recovery current** while its stored charge is swept out. The charge delivered in reverse, $Q_{rr}$, and the time it takes, $t_{rr}$, are the **reverse-recovery charge** and **time**; both increase with forward current, with the rate of fall $\dd i_F/\dd t$, and with temperature.
:::

::: proposition Conduction loss of a diode or a resistive switch {#prop-conduction-loss}
For a device with $v = V_0 + r\,i$ carrying a periodic current $i(t)$, the average conduction loss is

$$
P_{cond} = V_0I_{avg} + rI_{rms}^2,
$$ {#eq-cond-loss}

where $I_{avg}$ and $I_{rms}$ are the average and RMS values of the device current over a period. A MOSFET ($V_0 = 0$, $r = R_{DS(on)}$) loses $R_{DS(on)}I_{rms}^2$.
:::

::: proof
$P = \frac1T\int_0^T(V_0 + ri)i\,\dd t = V_0\cdot\frac1T\int_0^Ti\,\dd t + r\cdot\frac1T\int_0^Ti^2\,\dd t = V_0I_{avg} + rI_{rms}^2$, by the definitions of the average and RMS values.
:::

Reverse recovery causes loss not in the diode alone but in the transistor that turns on against it: during recovery that transistor carries the load current *plus* the recovery current while still supporting most of the supply voltage. A rough estimate of the extra energy per cycle is $Q_{rr}V$. The **Schottky diode** — a metal–semiconductor junction conducting by majority carriers only — has no stored charge and no reverse recovery (only its junction capacitance to charge), and a lower forward drop, but in silicon its unipolar drift region limits it to about $100$–$200\,\mathrm{V}$. Silicon-carbide Schottky diodes, thanks to [[#thm-unipolar-limit]], extend the idea to $1200\,\mathrm{V}$ and above, and were the first wide-bandgap devices to be sold commercially.

::: example Diode versus synchronous rectifier {#ex-sync-rect}
In the $12\,\mathrm{V}$ to $3.3\,\mathrm{V}$, $5\,\mathrm{A}$ converter of [[#ex-linear-vs-switching]] the lower switch conducts for $1 - D = 0.725$ of each period. Compare the loss of (a) a Schottky diode with $V_{F0} = 0.35\,\mathrm{V}$, $r_D = 15\,\mathrm{m\Omega}$ and (b) a MOSFET with $R_{DS(on)} = 10\,\mathrm{m\Omega}$ used as a **synchronous rectifier**. What efficiency does each give, counting only these losses and the upper MOSFET's $0.069\,\mathrm{W}$?
::: solution
The lower switch carries $5\,\mathrm{A}$ for $72.5\,\%$ of the time, so $I_{avg} = 0.725\times5 = 3.625\,\mathrm{A}$ and $I_{rms}^2 = 0.725\times25 = 18.1\,\mathrm{A^2}$.

(a) By [[#eq-cond-loss]], $P = 0.35\times3.625 + 0.015\times18.1 = 1.269 + 0.272 = 1.54\,\mathrm{W}$. The efficiency is $16.5/(16.5 + 1.54 + 0.069) = 91.1\,\%$.

(b) $P = 0.010\times18.1 = 0.181\,\mathrm{W}$, and the efficiency is $16.5/(16.5 + 0.181 + 0.069) = 98.5\,\%$.

The threshold voltage of the diode, a fixed $0.35\,\mathrm{V}$, is a tenth of the output voltage, and that is what costs most. At low output voltages synchronous rectification is almost universal; at high output voltages (say $400\,\mathrm{V}$) a diode drop of $1\,\mathrm{V}$ costs only a quarter of a percent and a diode is often good enough.
:::
:::

## Controlled switches

### The power MOSFET

A power MOSFET is a vertical device: current flows from the source on the top surface, through a channel induced by the gate, down through the drift region to the drain on the back of the die. Thousands to millions of cells are connected in parallel. Its on-state is a resistance,

$$
R_{DS(on)} = R_{ch} + R_{drift} + R_{other},
$$

and in high-voltage devices $R_{drift}$, governed by [[#thm-unipolar-limit]], dominates. **Superjunction** MOSFETs beat the unipolar limit in silicon by interleaving vertical $p$ and $n$ columns whose charges cancel when depleted, so that the $n$ columns can be doped heavily; they dominate silicon from $500$ to $900\,\mathrm{V}$.

Three features of the MOSFET matter constantly in converter design:

- Its **body diode** — the $p$-body to $n$-drift junction — is in anti-parallel with the channel, so a MOSFET is a current-bidirectional switch. The silicon body diode is a slow PiN diode with large $Q_{rr}$.
- $R_{DS(on)}$ rises with temperature, roughly doubling between $25^\circ\mathrm{C}$ and $150^\circ\mathrm{C}$ in silicon. This positive temperature coefficient makes parallel MOSFETs share current stably: the hotter one carries less.
- It is controlled by charge, not by a steady current. To switch it, the driver must deliver the **gate charge** $Q_g$, which includes the charge on the gate–drain (Miller) capacitance as the drain voltage swings.

### The IGBT

The **insulated-gate bipolar transistor** (IGBT) is a MOSFET whose drain side has an extra $p^+$ layer. When the MOS channel turns on, this layer injects holes into the drift region, conductivity-modulating it exactly as in a PiN diode. The on-state is then a fixed drop plus a small resistance, $v_{CE} \approx V_{CE0} + r_Ci_C$ with $V_{CE0}$ around $0.7$–$1\,\mathrm{V}$, and it hardly grows with voltage rating. An IGBT rated $1200\,\mathrm{V}$ conducts $100\,\mathrm{A}$ with about $1.7$–$2\,\mathrm{V}$ across it; a silicon MOSFET of the same rating and die area would drop many times more. The cost is again stored charge: at turn-off the holes in the drift region must recombine, producing a **tail current** that flows while the collector voltage is already high. IGBTs therefore switch more slowly — typically up to a few tens of kilohertz — and dominate medium- and high-power converters from about $600\,\mathrm{V}$ to $6.5\,\mathrm{kV}$. An IGBT has no body diode; modules include a separate anti-parallel diode.

### The thyristor

The **thyristor** or **silicon-controlled rectifier** (SCR) is a four-layer $pnpn$ device that behaves as two transistors in regenerative feedback. Forward biased, it blocks until a gate current pulse starts the regeneration; it then **latches** on and stays on, with a drop of $1$–$2\,\mathrm{V}$, even after the gate signal is removed, provided its anode current exceeds the **latching current**. It turns off only when the external circuit brings its current to zero (below the **holding current**) and then holds it reverse biased for the **turn-off time** $t_q$ while the stored charge recombines. This makes the thyristor a voltage-bidirectional, current-unidirectional switch that can be turned on but not off — ideally suited to AC circuits, where the current passes through zero every half cycle, as in the controlled rectifiers of [[power-electronics/rectifiers]]. Thyristors remain unmatched in ratings — single wafers of $150\,\mathrm{mm}$ diameter block $8\,\mathrm{kV}$ and carry several kiloamperes — and they are still used in HVDC converters, soft starters and very large drives. The **gate turn-off thyristor** (GTO) and **integrated gate-commutated thyristor** (IGCT) add the ability to be turned off from the gate.

### Wide-bandgap transistors

**Silicon-carbide MOSFETs** use [[#thm-unipolar-limit]] to remain unipolar — hence fast, with no tail current — at $650\,\mathrm{V}$ to $3.3\,\mathrm{kV}$; they now compete with IGBTs in electric-vehicle traction inverters and fast chargers. Their gate oxide needs higher drive voltages ($+15$ to $+18\,\mathrm{V}$, often with a negative off-bias), and their body diode, though a PiN diode, has a high forward drop of around $3\,\mathrm{V}$. **Gallium-nitride high-electron-mobility transistors** (GaN HEMTs) are lateral devices in which the channel is a two-dimensional electron gas at an AlGaN/GaN interface; they have tiny capacitances and no reverse-recovery charge at all, and switch in a few nanoseconds. They are normally on unless built as enhancement-mode devices or paired with a silicon MOSFET in a cascode, and are now common from $100\,\mathrm{V}$ to $650\,\mathrm{V}$, for instance in compact USB-C chargers.

| device | typical ratings | on-state | switching frequency | controlled |
|---|---|---|---|---|
| Si MOSFET | $20$–$900\,\mathrm{V}$ | resistance | $50\,\mathrm{kHz}$–$5\,\mathrm{MHz}$ | on and off |
| Si IGBT | $600\,\mathrm{V}$–$6.5\,\mathrm{kV}$ | $\approx1$–$3\,\mathrm{V}$ | $2$–$50\,\mathrm{kHz}$ | on and off |
| thyristor | up to $\approx 8\,\mathrm{kV}$, kA | $\approx1$–$2\,\mathrm{V}$ | line frequency | on only |
| SiC MOSFET | $650\,\mathrm{V}$–$3.3\,\mathrm{kV}$ | resistance | $20$–$500\,\mathrm{kHz}$ | on and off |
| GaN HEMT | $40$–$650\,\mathrm{V}$ | resistance | $100\,\mathrm{kHz}$–$10\,\mathrm{MHz}$ | on and off |

::: quiz
Why does an IGBT conduct with a nearly fixed voltage drop while a high-voltage MOSFET of the same area has a much larger one?
- [ ] The IGBT has a thinner drift region.
- [x] Holes injected from the IGBT's collector layer conductivity-modulate its drift region, so its resistance no longer follows the unipolar limit.
- [ ] The IGBT's gate oxide is thinner.
- [ ] The MOSFET's body diode carries part of the current.
::: solution
Both devices need a thick, lightly doped drift region to block the voltage. In the MOSFET only the doping atoms supply carriers, so the drift resistance follows [[#eq-ron-sp]]. In the IGBT the $p^+$ collector floods the drift region with holes (and electrons to neutralise them), so the conductivity is set by the injected carrier density, not the doping. The fixed part of the drop, about $0.7\,\mathrm{V}$, is the forward bias of that injecting junction.
:::
:::

## Switching losses

During a transition a real switch passes through states in which both voltage and current are substantial. The worst case, and the usual one, is **hard switching of a clamped inductive load**: an inductor carries a nearly constant current $I$ that is steered between the transistor and a diode, while the transistor's off-state voltage is clamped to a supply $V$ by that diode. This is exactly the situation in every DC–DC converter and inverter leg.

::: theorem Hard-switching energy of a clamped inductive load {#thm-switching-energy}
With linear transitions, a switch turning on against a clamped inductive load first takes over the current, rising from $0$ to $I$ in the **current rise time** $t_{ri}$ while its voltage stays at $V$ (the diode is still conducting), and then its voltage falls from $V$ to $0$ in the **voltage fall time** $t_{fv}$ while its current stays at $I$. At turn-off the order reverses: voltage rises in $t_{rv}$, then current falls in $t_{fi}$. The energies dissipated are

$$
E_{on} = \tfrac12VI(t_{ri} + t_{fv}),\qquad E_{off} = \tfrac12VI(t_{rv} + t_{fi}),
$$

and at switching frequency $f_s$ the switching loss is

$$
P_{sw} = (E_{on} + E_{off})f_s = \tfrac12VI\,t_{sw}f_s,\qquad t_{sw} = t_{ri} + t_{fv} + t_{rv} + t_{fi}.
$$ {#eq-psw}
:::

::: proof
At turn-on the diode clamps the switch voltage to $V$ until the switch carries the whole inductor current, because the diode cannot block while it still conducts. During $t_{ri}$ the switch power is $V\cdot It/t_{ri}$, and its integral is $\frac12VIt_{ri}$. Once the diode current has reached zero the diode can block, and the switch voltage falls; during $t_{fv}$ the power is $I\cdot V(1 - t/t_{fv})$, with integral $\frac12VIt_{fv}$. The turn-off sequence is the mirror image: the switch voltage must rise all the way to $V$ before the diode becomes forward biased and can take the current, so the voltage transition happens at full current and the current transition at full voltage. Adding gives $E_{on}$ and $E_{off}$; multiplying by the number of cycles per second gives [[#eq-psw]].
:::

::: widget plot
f: clamp((x - 10)/a, 0, 1); clamp(1 - (x - 10 - a)/b, 0, 1); clamp((x - 10)/a, 0, 1)*clamp(1 - (x - 10 - a)/b, 0, 1)
x: 0, 100
y: -0.05, 1.15
sliders: a=15:2:40:1; b=25:2:60:1
labels: i/I; v/V; p/(VI)
caption: Hard turn-on of a clamped inductive load against time in nanoseconds, normalised to the supply voltage $V$ and load current $I$. The current rises over $t_{ri} = a$ while the voltage is held at $V$ by the conducting diode, and only then does the voltage fall over $t_{fv} = b$. The instantaneous power (green) peaks at $VI$ — the full product of supply voltage and load current — and the energy is the area under it, $\frac12VI(a + b)$. Shorten either transition and the area shrinks in proportion; this is why fast gate drive and fast devices cut switching loss.
:::

Three further losses accompany each hard transition:

- **Output-capacitance loss.** At turn-on the energy $E_{oss}$ stored in the switch's own output capacitance $C_{oss}$ is dumped into its channel; for a constant capacitance $E_{oss} = \frac12C_{oss}V^2$. (MOSFET capacitances are strongly nonlinear, so datasheets quote $E_{oss}$ directly.)
- **Reverse recovery.** If the clamping diode has stored charge, the switch turning on carries the recovery current at nearly full voltage: roughly $Q_{rr}V$ per cycle, plus the diode's own recovery loss.
- **Gate-drive loss.** The driver charges the gate to $V_{GS}$ and discharges it every cycle, dissipating $Q_gV_{drv}f_s$ in the driver and gate resistors (not in the switch).

::: example Loss budget of a hard-switched MOSFET {#ex-loss-budget}
A MOSFET in a $48\,\mathrm{V}$ to $12\,\mathrm{V}$ buck converter ($D = 0.25$) switches a $10\,\mathrm{A}$ inductor current at $100\,\mathrm{kHz}$. At its operating temperature $R_{DS(on)} = 10\,\mathrm{m\Omega}$; measured transition times are $t_{ri} = 15\,\mathrm{ns}$, $t_{fv} = 25\,\mathrm{ns}$, $t_{rv} = 20\,\mathrm{ns}$, $t_{fi} = 10\,\mathrm{ns}$; $C_{oss}$ is effectively $500\,\mathrm{pF}$; and the lower switch is a diode with $Q_{rr} = 100\,\mathrm{nC}$. Find each loss component.
::: solution
Conduction: the MOSFET carries $10\,\mathrm{A}$ for a quarter of the period, so $I_{rms}^2 = 0.25\times100 = 25\,\mathrm{A^2}$ and $P_{cond} = 0.010\times25 = 0.25\,\mathrm{W}$.

Switching, by [[#thm-switching-energy]]: $E_{on} = \frac12\times48\times10\times40\,\mathrm{ns} = 9.6\,\mathrm{\mu J}$ and $E_{off} = \frac12\times48\times10\times30\,\mathrm{ns} = 7.2\,\mathrm{\mu J}$, so $P_{sw} = 16.8\,\mathrm{\mu J}\times10^5\,\mathrm{s^{-1}} = 1.68\,\mathrm{W}$.

Output capacitance: $\frac12\times500\,\mathrm{pF}\times48^2\times10^5 = 0.058\,\mathrm{W}$.

Reverse recovery: $Q_{rr}Vf_s = 100\,\mathrm{nC}\times48\times10^5 = 0.48\,\mathrm{W}$.

The total is about $2.47\,\mathrm{W}$, of which $1.68\,\mathrm{W}$ is overlap loss. Conduction is a small part. Doubling the frequency would nearly double the total; a Schottky or synchronous rectifier with a short dead time would remove most of the $0.48\,\mathrm{W}$; and a faster gate drive would shrink the $1.68\,\mathrm{W}$. Losses of this kind are the reason converter design is a trade between frequency and efficiency.
:::
:::

::: warning Datasheet numbers are measured at $25^\circ\mathrm{C}$
The headline $R_{DS(on)}$ on a MOSFET datasheet is measured with the die at $25^\circ\mathrm{C}$, which it never is in operation. At a junction temperature of $100$–$125^\circ\mathrm{C}$ a silicon MOSFET's resistance is typically $1.5$ to $1.8$ times the headline figure, and switching energies also rise with temperature. Use the hot values — read from the normalised $R_{DS(on)}$-versus-temperature curve — and then check that the temperature you assumed is the one your heat sink actually gives ([[power-electronics/magnetics-thermal-design]]). Similarly, switching times in the electrical-characteristics table are for the datasheet's test circuit and gate resistor, not yours.
:::

### Choosing the size of the switch

A bigger die has lower on-resistance but larger capacitances and gate charge, so its switching loss is higher. For a given technology, $R_{DS(on)} = \rho/A$ with $\rho$ the area-specific resistance, and to a first approximation the switching energy is proportional to area, $E_{sw} = kA$ (the capacitances, and so the charge to be moved at a given driver current, scale with $A$).

::: proposition Optimum die area {#prop-optimum-area}
With $P(A) = I_{rms}^2\rho/A + kAf_s$, the total loss is minimised at

$$
A^\ast = \sqrt{\frac{I_{rms}^2\rho}{kf_s}},\qquad P_{min} = 2I_{rms}\sqrt{\rho kf_s},
$$

and at the optimum the conduction and switching losses are equal.
:::

::: proof
$\dd P/\dd A = -I_{rms}^2\rho/A^2 + kf_s = 0$ gives $A^{\ast2} = I_{rms}^2\rho/(kf_s)$; the second derivative $2I_{rms}^2\rho/A^3$ is positive, so this is a minimum. Substituting, the conduction loss is $I_{rms}^2\rho/A^\ast = I_{rms}\sqrt{\rho kf_s}$ and the switching loss is $kA^\ast f_s = I_{rms}\sqrt{\rho kf_s}$, equal, with sum $P_{min}$.
:::

::: widget plot
f: 0.5/x; 0.2e-3*s*x; 0.5/x + 0.2e-3*s*x
x: 0.5, 12
y: 0, 1.2
sliders: s=200:50:1000:10
labels: P_{cond}\ (\mathrm{W}); P_{sw}\ (\mathrm{W}); P_{total}\ (\mathrm{W})
caption: Conduction, switching and total loss against die area $A$ in $\mathrm{mm^2}$ for $I_{rms} = 5\,\mathrm{A}$, $\rho = 20\,\mathrm{m\Omega\,mm^2}$ and $k = 0.2\,\mathrm{\mu J/mm^2}$, with the switching frequency $s$ in kHz on the slider. The total has a flat minimum where the two curves cross. Raise the frequency and the optimum moves to a smaller die while the minimum loss grows as $\sqrt{f_s}$ — higher frequency is paid for with efficiency, unless a better technology lowers the product $\rho k$.
:::

The product $\rho k$ — on-resistance times switching charge, often quoted as $R_{DS(on)}\cdot Q_g$ or $R_{DS(on)}\cdot Q_{gd}$ — is therefore the figure of merit for comparing technologies in a given application, and the steady fall of that product for successive generations, and its step change for GaN, are what have pushed converter frequencies up.

## Driving the gate

### Gate charge and switching speed

From the gate, a MOSFET looks like a nonlinear capacitor. Driven by a constant current, $v_{GS}$ rises until it reaches the threshold and drain current begins to flow ($t_{ri}$); it then sits at the **Miller plateau** $V_{pl}$ — the gate voltage needed to carry the load current — while the gate current discharges the gate–drain capacitance and the drain voltage falls ($t_{fv}$); and finally it rises to the drive voltage. The datasheet summarises this as the charges $Q_{gs}$ (to reach the plateau), $Q_{gd}$ (the plateau) and $Q_g$ (total).

::: proposition Plateau-limited switching time {#prop-gate-time}
A driver of output voltage $V_{drv}$ in series with a total gate resistance $R_G$ (external plus internal) supplies a nearly constant current $I_G = (V_{drv} - V_{pl})/R_G$ during the Miller plateau at turn-on, so

$$
t_{fv} \approx \frac{Q_{gd}}{I_G} = \frac{Q_{gd}R_G}{V_{drv} - V_{pl}},
$$

and at turn-off, with the driver pulling to $0\,\mathrm{V}$, $t_{rv} \approx Q_{gd}R_G/V_{pl}$. The gate-drive power is $P_G = Q_gV_{drv}f_s$.
:::

::: proof
During the plateau the gate voltage is constant at $V_{pl}$, so the voltage across $R_G$ is $V_{drv} - V_{pl}$ and the current is constant; all of it flows into the gate–drain capacitance, whose charge must change by $Q_{gd}$. The time is charge over current. At turn-off the voltage across $R_G$ is $V_{pl} - 0$. Each cycle the driver draws $Q_g$ from its supply $V_{drv}$ at turn-on, an energy $Q_gV_{drv}$, of which half is stored on the gate and half dissipated in the resistances; at turn-off the stored half is dissipated too. The total, $Q_gV_{drv}$ per cycle, gives $P_G$.
:::

::: example Choosing a gate resistor {#ex-gate-resistor}
A MOSFET has $Q_{gd} = 12\,\mathrm{nC}$, $Q_g = 45\,\mathrm{nC}$ at $12\,\mathrm{V}$, a plateau at $V_{pl} = 4.5\,\mathrm{V}$ and an internal gate resistance of $1.5\,\mathrm{\Omega}$. It is driven from $12\,\mathrm{V}$ at $100\,\mathrm{kHz}$. Choose the external turn-on gate resistor for $t_{fv} = 20\,\mathrm{ns}$, find the turn-off time with the same resistor and the gate-drive power, and size a bootstrap capacitor that may droop by at most $0.5\,\mathrm{V}$ while supplying the gate charge.
::: solution
From [[#prop-gate-time]], the plateau current must be $I_G = Q_{gd}/t_{fv} = 12\,\mathrm{nC}/20\,\mathrm{ns} = 0.6\,\mathrm{A}$, so $R_G = (12 - 4.5)/0.6 = 12.5\,\Omega$ in total and the external resistor is $12.5 - 1.5 = 11\,\Omega$. (The driver must source at least $0.6\,\mathrm{A}$; at the start of the transition, with $v_{GS} = 0$, it briefly sources $12/12.5 = 0.96\,\mathrm{A}$.)

At turn-off the plateau current is $4.5/12.5 = 0.36\,\mathrm{A}$, so $t_{rv} = 12/0.36 = 33\,\mathrm{ns}$ — slower than turn-on, because the plateau is nearer the low rail. A separate, smaller turn-off resistor (through a diode) is the usual remedy.

The gate-drive power is $P_G = 45\,\mathrm{nC}\times12\,\mathrm{V}\times10^5\,\mathrm{s^{-1}} = 54\,\mathrm{mW}$.

The bootstrap capacitor, which supplies the high-side gate while the switch node is at the input voltage, must deliver $Q_g$ with a droop $\Delta V$: $C_{boot} \ge Q_g/\Delta V = 45\,\mathrm{nC}/0.5\,\mathrm{V} = 90\,\mathrm{nF}$. Allowing for the driver's quiescent current and leakage, a $220\,\mathrm{nF}$ ceramic capacitor is a sensible choice.
:::
:::

### High-side drive, dead time and dv/dt

In a half-bridge — two switches in series across a supply, the midpoint driving an inductor — the upper switch's source moves between $0$ and the supply voltage, so its gate drive must float with it. The common low-cost solution is the **bootstrap**: a diode charges a capacitor from the low-side supply whenever the lower switch is on and the midpoint is at ground, and the capacitor then powers the floating driver. It cannot hold the upper switch on indefinitely, which is why isolated supplies or transformers are used where $100\,\%$ duty is needed.

The two switches of a leg must never conduct together, or they short the supply (**shoot-through**). The controller inserts a **dead time**, typically $20$–$500\,\mathrm{ns}$, during which both are off and the inductor current flows in a body diode or anti-parallel diode. Dead time costs diode conduction loss and, in inverters, a small output-voltage error.

Fast switching brings its own hazards. A drain voltage rising at $\dd v/\dd t$ injects a current $C_{gd}\,\dd v/\dd t$ into the gate of the *off* device in the same leg; if this raises its gate above threshold it turns on spuriously. A low-impedance turn-off path, a negative off-state gate voltage, or a **Miller clamp** prevents it. And a current changing at $\dd i/\dd t$ through the stray inductance $L_\sigma$ of the commutation loop produces a voltage overshoot $L_\sigma\,\dd i/\dd t$ at turn-off: $10\,\mathrm{nH}$ and $1\,\mathrm{A/ns}$ give $10\,\mathrm{V}$, which can exceed a low-voltage device's rating. Hence the obsession of power-electronic layout with small, tight commutation loops, and the use of **snubbers** — small RC or RCD networks that absorb transition energy — where the loop cannot be made small enough.

::: application Safe operating area and avalanche
Every switch has a **safe operating area** (SOA) on the $i$–$v$ plane: maximum current, maximum voltage, and a power boundary set by the junction temperature for each pulse length. Hard-switched trajectories cross the plane at full $V$ and full $I$ for nanoseconds, which is safe; a short circuit holds the device at full voltage and several times rated current until protection acts, which IGBTs survive for typically $5$–$10\,\mathrm{\mu s}$ and drivers must detect within that time (**desaturation detection**). Many MOSFETs are rated for a single **avalanche** event — breakdown that absorbs the energy of an unclamped inductor — but designs should never rely on it repetitively.
:::

::: quiz
A MOSFET in a half-bridge is held off with $0\,\mathrm{V}$ on its gate through a total resistance of $5\,\Omega$. Its gate–drain capacitance is $50\,\mathrm{pF}$ and its threshold $2.5\,\mathrm{V}$. The other switch turns on and the drain voltage rises at $50\,\mathrm{V/ns}$. What happens?
- [ ] Nothing: the gate is held at $0\,\mathrm{V}$.
- [x] The Miller current of about $2.5\,\mathrm{A}$ lifts the gate well above threshold, so the device turns on and shoot-through occurs.
- [ ] The device avalanches.
- [ ] The body diode turns on.
::: solution
$C_{gd}\,\dd v/\dd t = 50\,\mathrm{pF}\times5\times10^{10}\,\mathrm{V/s} = 2.5\,\mathrm{A}$. Through $5\,\Omega$ this would produce up to $12.5\,\mathrm{V}$ on the gate (limited in practice by $C_{gs}$, which absorbs part of the current), far above $2.5\,\mathrm{V}$. A lower-impedance off path, a negative gate bias or slower switching is needed.
:::
:::

::: history
Power conversion before semiconductors used rotating motor–generator sets and mercury-arc rectifiers, invented by Peter Cooper Hewitt in 1902. The silicon era began at Bell Labs, where John Moll, Morris Tanenbaum, James Goldey and Nick Holonyak described the $pnpn$ transistor switch in 1956, and General Electric brought the silicon-controlled rectifier to market in 1957. Vertical power MOSFETs appeared in the 1970s, and B. Jayant Baliga's group at General Electric reported the insulated-gate transistor in 1982; Baliga also derived the figure of merit $\varepsilon\mu E_c^3$ that predicted the advantage of wide-bandgap materials. Infineon sold the first silicon-carbide Schottky diodes in 2001, commercial GaN transistors appeared around 2010, and Cree released the first commercial SiC MOSFET in 2011.
:::

## Where this leads

Every converter in this course is a network of the switches described here, and every loss estimate uses [[#eq-cond-loss]] and [[#eq-psw]]. [[power-electronics/rectifiers]] uses diodes and thyristors at line frequency; [[power-electronics/dc-dc-converters]] uses MOSFETs and diodes at high frequency and finds the device currents and voltages that these formulas need; [[power-electronics/inverters]] uses MOSFET and IGBT half-bridges with dead time; and [[power-electronics/magnetics-thermal-design]] turns the loss into a junction temperature and a heat sink. Soft-switching techniques that avoid the overlap loss of [[#thm-switching-energy]] altogether appear in [[power-electronics/isolated-converters]].

::: summary
- A switch that is fully on or fully off dissipates little; converters process power with switches and filter the result with inductors and capacitors.
- The voltage rating of a unipolar device costs on-resistance as $V_B^2/(\varepsilon\mu E_c^3)$ ([[#thm-unipolar-limit]]); wide-bandgap SiC and GaN, with eight to eleven times silicon's critical field, cut it by two to three orders of magnitude.
- PiN diodes and IGBTs use conductivity modulation for a low drop at high voltage but pay with stored charge: reverse recovery and tail current.
- Conduction loss is $V_0I_{avg} + rI_{rms}^2$; hard-switching loss is $\frac12VIt_{sw}f_s$, plus $C_{oss}$, reverse-recovery and gate-drive losses.
- At the optimum die size conduction and switching losses are equal, and the minimum loss grows as $\sqrt{f_s}$.
- A MOSFET is driven by charge: the Miller charge $Q_{gd}$ divided by the gate current sets the voltage transition time.
- Half-bridges need floating high-side drive, dead time, protection against $\dd v/\dd t$-induced turn-on, and small commutation loops.
:::

## Exercises

::: exercise A linear regulator's dissipation {level=1 check="6.4"}
A linear regulator supplies $1.8\,\mathrm{V}$ at $2\,\mathrm{A}$ from $5\,\mathrm{V}$. How much power (in watts) does it dissipate, and what is its efficiency?
::: solution
$P = (5 - 1.8)\times2 = 6.4\,\mathrm{W}$; the load receives $3.6\,\mathrm{W}$, so $\eta = 3.6/10 = 36\,\%$.
:::
:::

::: exercise IGBT switching loss {level=1 check="0.5*400*20*110e-9*20000"}
An IGBT in an inverter switches $20\,\mathrm{A}$ against a $400\,\mathrm{V}$ DC link at $20\,\mathrm{kHz}$. Its total transition time ($t_{ri} + t_{fv} + t_{rv} + t_{fi}$, with the tail current folded into an equivalent $t_{fi}$) is $110\,\mathrm{ns}$. Find the switching loss in watts.
::: solution
By [[#eq-psw]], $P_{sw} = \frac12\times400\times20\times110\times10^{-9}\times2\times10^4 = 8.8\,\mathrm{W}$.
:::
:::

::: exercise Gate-drive power {level=1 check="120e-9*15*50000"}
An IGBT module needs $Q_g = 120\,\mathrm{nC}$ to swing its gate from $0$ to $15\,\mathrm{V}$. What power (in watts) does a unipolar $15\,\mathrm{V}$ driver supply at $50\,\mathrm{kHz}$?
::: solution
$P_G = Q_gV_{drv}f_s = 120\times10^{-9}\times15\times5\times10^4 = 0.09\,\mathrm{W}$.
:::
:::

::: exercise Loss of a freewheeling diode {level=2 check="0.9*6 + 0.03*0.6*100"}
A silicon fast-recovery diode with $V_{F0} = 0.9\,\mathrm{V}$ and $r_D = 30\,\mathrm{m\Omega}$ carries a constant $10\,\mathrm{A}$ for $60\,\%$ of every switching period. Find its conduction loss in watts.
::: solution
$I_{avg} = 0.6\times10 = 6\,\mathrm{A}$ and $I_{rms}^2 = 0.6\times100 = 60\,\mathrm{A^2}$, so by [[#eq-cond-loss]] $P = 0.9\times6 + 0.03\times60 = 5.4 + 1.8 = 7.2\,\mathrm{W}$.
:::
:::

::: exercise Silicon carbide versus silicon {level=2 check="(9.7*950*2.5e6^3)/(11.7*1350*(3e5)^3)"}
Using [[#eq-ron-sp]] with the material constants of the table in this chapter, by what factor is the specific on-resistance of a silicon drift region larger than that of a 4H-SiC drift region of the same voltage rating? What does this mean for the die area of a $1200\,\mathrm{V}$, $20\,\mathrm{m\Omega}$ switch?
::: solution
The ratio is $(\varepsilon\mu E_c^3)_{SiC}/(\varepsilon\mu E_c^3)_{Si} = (9.7\times950\times2.5^3)/(11.7\times1350\times0.3^3) \approx 338$. At $1200\,\mathrm{V}$ the silicon drift region alone has $R_{on,sp} \approx 153\,\mathrm{m\Omega\,cm^2}$, so $20\,\mathrm{m\Omega}$ would need $7.6\,\mathrm{cm^2}$ of silicon — impractical, which is why silicon at that voltage uses IGBTs; SiC needs about $0.45/20 = 0.023\,\mathrm{cm^2}$ for the drift region, though in practice channel and substrate resistance dominate and real dies are some $0.1$–$0.3\,\mathrm{cm^2}$.
:::
:::

::: exercise Current sharing of parallel MOSFETs {level=2 check="30*12/22"}
Two MOSFETs in parallel share $30\,\mathrm{A}$. One has $R_{DS(on)} = 10\,\mathrm{m\Omega}$, the other $12\,\mathrm{m\Omega}$. Find the current in amperes in the first, and explain qualitatively what happens as they warm up.
::: solution
They have the same voltage, so $I_1 = 30\times12/(10 + 12) = 16.4\,\mathrm{A}$ and $I_2 = 13.6\,\mathrm{A}$. The first dissipates $16.4^2\times0.010 = 2.7\,\mathrm{W}$ against $13.6^2\times0.012 = 2.2\,\mathrm{W}$, so it runs hotter; its resistance rises more, which shifts current to the second. The positive temperature coefficient pulls the sharing towards balance. (A device with a negative coefficient, such as a bipolar transistor or a low-current IGBT, would run away instead.)
:::
:::

::: exercise A bootstrap capacitor {level=2 check="70e-9/0.3"}
A high-side MOSFET needs $Q_g = 60\,\mathrm{nC}$. While it is on, for up to $50\,\mathrm{\mu s}$, the floating driver and leakage draw $200\,\mathrm{\mu A}$ from the bootstrap capacitor. Find the minimum capacitance (in farads) for a droop of at most $0.3\,\mathrm{V}$.
::: solution
The charge drawn is $Q_g + I_qt_{on} = 60\,\mathrm{nC} + 200\,\mathrm{\mu A}\times50\,\mathrm{\mu s} = 60 + 10 = 70\,\mathrm{nC}$, so $C \ge 70\,\mathrm{nC}/0.3\,\mathrm{V} = 233\,\mathrm{nF}$. A $470\,\mathrm{nF}$ or $1\,\mathrm{\mu F}$ ceramic part allows for capacitance loss under DC bias.
:::
:::

::: exercise Latching a thyristor into an inductive load {level=3 check="10e-3*0.1/325"}
A thyristor is fired at the peak of a $230\,\mathrm{V}$ RMS supply ($325\,\mathrm{V}$ peak) into a load that is essentially a $10\,\mathrm{mH}$ inductor. Its latching current is $100\,\mathrm{mA}$. What is the minimum gate-pulse duration in seconds? Why do inductive loads need longer gate pulses than resistive ones?
::: hint
Immediately after firing, the anode current rises as $\dd i/\dd t = v/L$.
:::
::: solution
The current rises at $325/0.01 = 32\,500\,\mathrm{A/s}$, so it reaches $0.1\,\mathrm{A}$ after $t = LI_L/V = 0.01\times0.1/325 = 3.1\,\mathrm{\mu s}$. The gate must be held on at least this long (in practice $10$–$100\,\mathrm{\mu s}$, or a train of pulses), otherwise the device drops out when the gate signal ends. With a resistive load the current jumps to $V/R$ immediately, and a short pulse suffices.
:::
:::

::: exercise Optimum die with a second loss term {level=3}
A designer refines [[#prop-optimum-area]] by adding an area-independent switching loss $P_0$ (for instance the overlap loss set by the driver and layout). (a) Show that the optimum area is unchanged. (b) For $I_{rms} = 5\,\mathrm{A}$, $\rho = 20\,\mathrm{m\Omega\,mm^2}$, $k = 0.2\,\mathrm{\mu J/mm^2}$, find $A^\ast$ and $P_{min} - P_0$ at $200\,\mathrm{kHz}$ and at $800\,\mathrm{kHz}$. (c) By what factor must $\rho k$ fall to keep the loss at $800\,\mathrm{kHz}$ equal to that at $200\,\mathrm{kHz}$?
::: solution
(a) $P = I_{rms}^2\rho/A + kAf_s + P_0$; the constant has zero derivative, so $A^\ast$ is the same. (b) At $200\,\mathrm{kHz}$, $kf_s = 0.04\,\mathrm{W/mm^2}$ and $I_{rms}^2\rho = 0.5\,\mathrm{W\,mm^2}$, so $A^\ast = \sqrt{0.5/0.04} = 3.54\,\mathrm{mm^2}$ and $P_{min} - P_0 = 2\sqrt{0.5\times0.04} = 0.283\,\mathrm{W}$. At $800\,\mathrm{kHz}$, $A^\ast = 1.77\,\mathrm{mm^2}$ and $P_{min} - P_0 = 0.566\,\mathrm{W}$ — four times the frequency, twice the loss. (c) $P_{min} \propto \sqrt{\rho kf_s}$, so $\rho k$ must fall by a factor of $4$; this is roughly what moving from silicon to GaN achieves at $100\,\mathrm{V}$.
:::
:::

::: exercise Miller turn-on {level=3 check="2/2.5"}
For the half-bridge of the second quick check ($C_{gd} = 50\,\mathrm{pF}$, $\dd v/\dd t = 50\,\mathrm{V/ns}$, threshold $2.5\,\mathrm{V}$), treat the gate as driven by the Miller current through the turn-off resistance alone (a pessimistic bound that ignores $C_{gs}$). What is the largest total turn-off resistance, in ohms, that keeps the gate below $2\,\mathrm{V}$? Suggest two other remedies.
::: solution
The Miller current is $50\times10^{-12}\times5\times10^{10} = 2.5\,\mathrm{A}$, so $R \le 2\,\mathrm{V}/2.5\,\mathrm{A} = 0.8\,\Omega$ — hard to achieve once the device's internal gate resistance and the package inductance are included. Remedies: a negative off-state gate voltage (for example $-4\,\mathrm{V}$), which adds margin below threshold; an active Miller clamp that shorts gate to source with a transistor close to the device once it is off; a larger external $C_{gs}$ (which slows switching); or reducing $\dd v/\dd t$ with a larger turn-on resistance in the other switch.
:::
:::
