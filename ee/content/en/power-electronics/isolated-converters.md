A phone charger takes $100$–$240\,\mathrm{V}$ AC from the wall and delivers $5$ to $20\,\mathrm{V}$ DC to a cable that a person holds in their hand. Two requirements dominate its design. The first is **safety isolation**: no conductive path may connect the mains to the output, so that a fault cannot put the user in contact with a live conductor. The second is a **large conversion ratio**: from a rectified $325\,\mathrm{V}$ down to $5\,\mathrm{V}$ is a factor of $65$, which a buck converter could manage only with an absurdly short duty cycle and a switch blocking the full input voltage. A transformer solves both problems at once. It provides galvanic isolation, and its turns ratio does most of the voltage conversion, leaving the duty cycle in a comfortable range.

Line-frequency transformers are heavy, because a transformer's size is set by the volt-seconds it must support, and at $50\,\mathrm{Hz}$ that is a great many. Operate the transformer at $100\,\mathrm{kHz}$ inside a DC–DC converter and its volt-seconds per cycle fall two-thousand-fold; the charger's transformer is the size of a sugar cube. This chapter builds **isolated converters** by inserting a transformer into the converters of [[power-electronics/dc-dc-converters]]: the flyback from the buck–boost, the forward from the buck, and the push–pull, half-bridge and full-bridge converters that drive their transformers in both directions. The transformer model comes from [[electric-machines/transformers]] and [[circuits-2/magnetically-coupled-circuits]].

## The transformer in a switching converter

::: definition Converter transformer model {#def-xfmr-model}
For converter analysis a two-winding transformer with $N_p$ primary and $N_s$ secondary turns is modelled as an **ideal transformer** of ratio $N_p:N_s$ (which enforces $v_s/v_p = N_s/N_p$ and $N_pi_p' = N_si_s$), with a **magnetising inductance** $L_M$ across its primary terminals and a **leakage inductance** $L_\ell$ in series with the primary (the secondary leakage referred to the primary is included in $L_\ell$). The magnetising current $i_M$ through $L_M$ represents the flux in the core: $\phi = L_Mi_M/N_p$.
:::

The ideal transformer passes no DC: it couples changes in current between windings, but the flux in its core is set by the volt-seconds applied to its windings. The magnetising inductance is the circuit element that carries the consequences.

::: theorem Volt-second balance on the magnetising inductance {#thm-reset}
In periodic steady state the average voltage across every winding of a transformer is zero. Equivalently, the core flux returns to its starting value every switching period: whatever volt-seconds are applied to the core in one part of the period must be removed (the core must be **reset**) in another. If they are not, the magnetising current — and the flux — ratchets up each period until the core **saturates**, $L_M$ collapses, and the switch current rises catastrophically.
:::

::: proof
The magnetising inductance is an inductor, so [[power-electronics/dc-dc-converters#thm-balance]] applies to it: $\langle v_M\rangle = 0$ in steady state. Every winding voltage is $v_M$ multiplied by its turns ratio, so each averages to zero too. By Faraday's law, $N_p\,\dd\phi/\dd t = v_M$, so $\Delta\phi = \frac1{N_p}\int_0^{T_s}v_M\,\dd t = 0$ over a period. If a circuit forces $\langle v_M\rangle = V_0 \ne 0$, the flux grows by $V_0T_s/N_p$ per period without bound; real cores have a maximum flux density $B_{sat}$ (around $0.3$–$0.4\,\mathrm{T}$ for ferrite), beyond which the relative permeability falls towards $1$.
:::

The theorem is the key to every isolated topology: each one is distinguished mainly by *how* it resets its transformer.

A second consequence of the model is that the leakage inductance stores energy every time the primary current is interrupted. Unlike the magnetising energy, which (as we shall see) is either transferred to the output or recycled by design, the leakage energy has nowhere to go except into the switch's capacitance, where it produces a voltage spike. Every hard-switched isolated converter needs a **clamp** or **snubber** to absorb it.

## The flyback converter

Take the buck–boost converter and replace its inductor by a two-winding inductor: a primary winding in the switch's path, a secondary winding feeding the diode and output capacitor. This is the **flyback converter**. With the switch on, the primary is connected across $V_g$, the magnetising current rises and energy is stored in the core; the secondary diode is reverse biased by the dotted winding polarity, and the output capacitor supplies the load. With the switch off, the magnetising current transfers to the secondary, forward biases the diode and delivers the stored energy to the output. The "transformer" is really a coupled inductor whose two windings never conduct at the same time, and its core must store energy — for which reason it has an air gap ([[power-electronics/magnetics-thermal-design]]).

::: proposition Flyback converter in continuous conduction {#prop-flyback}
With turns ratio $n = N_p/N_s$ and magnetising inductance $L_M$ (referred to the primary), the flyback converter in continuous conduction has

$$
M = \frac{V}{V_g} = \frac{1}{n}\cdot\frac{D}{1 - D},
$$ {#eq-flyback}

its switch blocks $V_g + nV$ (plus the leakage spike), and its output diode blocks $V + V_g/n$.
:::

::: proof
Switch on: the primary, hence $L_M$, sees $V_g$. Switch off: the secondary is clamped to the output through the diode, so the secondary sees $-V$ and $L_M$ sees $-nV$. Volt-second balance on $L_M$ ([[#thm-reset]]): $DV_g - D'nV = 0$, which gives [[#eq-flyback]]. With the switch off, its drain is at $V_g$ plus the reflected voltage $nV$; with it on, the secondary voltage is $V_g/n$ with the polarity that reverse-biases the diode, which then sees $V_g/n + V$.
:::

::: widget plot
f: 400/n*x/(1 - x); 400*x/n
x: 0, 0.9
y: 0, 60
sliders: n=5:1:40:1
labels: \text{flyback }V\ (\mathrm{V}); \text{forward }V\ (\mathrm{V})
caption: Output voltage from a $400\,\mathrm{V}$ input against duty cycle for a flyback (blue) and a forward converter (orange) with the same turns ratio $n = N_p/N_s$ on the slider, both in continuous conduction. The forward converter's output is linear in $D$ (and is usable only up to its reset limit, typically $D = 0.5$); the flyback's rises ever faster, inheriting the buck–boost's $D/D'$. Pick a target, say $12\,\mathrm{V}$, and see how the turns ratio sets the duty cycle at which each converter must run — a higher $n$ pushes the flyback towards large $D$ and a large reflected voltage on its switch.
:::

The transformer resets itself: the reflected output voltage $nV$ applied during the off-time is exactly what removes the volt-seconds applied during the on-time. The flyback needs only one switch, one diode and one magnetic component, and adding outputs costs one winding, diode and capacitor each. It dominates isolated power below about $100$–$150\,\mathrm{W}$: phone and laptop chargers, standby supplies, gate-driver supplies. Its weaknesses are the pulsed currents at both input and output (inherited from the buck–boost), the energy-storing core (larger than a transformer's for the same power), and the leakage-inductance loss.

Many flybacks run in DCM or at the boundary between modes (**critical conduction**, or quasi-resonant operation, where the controller turns the switch on again when the secondary current has reached zero). In DCM the energy stored per cycle is $\frac12L_MI_{pk}^2$, all of which is delivered to the output, so the power is

$$
P = \tfrac12L_MI_{pk}^2f_s ,
$$ {#eq-flyback-dcm}

independent of the input voltage: a controller that regulates $I_{pk}$ regulates the power directly.

::: example A 10 W USB charger {#ex-usb-flyback}
Design the transformer of a $5\,\mathrm{V}$, $2\,\mathrm{A}$ flyback charger for universal mains input, i.e. a DC bus of $120$–$375\,\mathrm{V}$, switching at $65\,\mathrm{kHz}$. Assume $85\,\%$ efficiency and an output diode drop of $0.5\,\mathrm{V}$. Choose the turns ratio for a reflected voltage of about $100\,\mathrm{V}$, and $L_M$ for operation at the CCM/DCM boundary at minimum input and full load. Find the duty cycle and peak current at both input extremes, the switch's voltage stress, and the peak secondary current.
::: solution
The secondary must supply $V' = 5 + 0.5 = 5.5\,\mathrm{V}$ (the diode drop adds to the output). A reflected voltage $nV' = 100\,\mathrm{V}$ needs $n = 100/5.5 = 18.2$; take $n = 18$.

At $120\,\mathrm{V}$, from [[#eq-flyback]], $D/D' = nV'/V_g = 99/120$, so $D = 0.452$. The input power is $10/0.85 = 11.8\,\mathrm{W}$, an average input current of $11.8/120 = 0.098\,\mathrm{A}$. At the boundary the primary current is a triangle from zero to $I_{pk}$ during $DT_s$, so its average is $\frac12DI_{pk}$, giving $I_{pk} = 2\times0.098/0.452 = 0.43\,\mathrm{A}$. Then

$$
L_M = \frac{V_gDT_s}{I_{pk}} = \frac{120\times0.452\times15.4\,\mathrm{\mu s}}{0.43} = 1.94\,\mathrm{mH}.
$$

At $375\,\mathrm{V}$ the converter is in DCM. The power is still $11.8\,\mathrm{W}$, so by [[#eq-flyback-dcm]] $I_{pk} = \sqrt{2P/(L_Mf_s)}$ is again $0.43\,\mathrm{A}$, now reached in $DT_s = L_MI_{pk}/V_g$, i.e. $D = 0.145$. The duty cycle varies by a factor of three over the input range.

With the switch off, the drain sees $375 + 99 = 474\,\mathrm{V}$ plus the leakage spike, which the clamp (below) limits; a $650$ or $700\,\mathrm{V}$ MOSFET is the usual choice. The secondary current starts at $nI_{pk} = 18\times0.43 = 7.8\,\mathrm{A}$ — nearly four times the $2\,\mathrm{A}$ output — which is why the output capacitor of a flyback must handle a large ripple current, and why synchronous rectification is common even at $10\,\mathrm{W}$.
:::
:::

### The leakage clamp

When the switch turns off, the leakage inductance carries the primary current $I_{pk}$ but is not coupled to the secondary. Its current must go somewhere; an **RCD clamp** — a diode from the drain to a capacitor held at a clamp voltage $V_c$ above $V_g$ by a parallel resistor — catches it. The leakage current then falls at the rate $(V_c - nV)/L_\ell$, and during that interval the clamp absorbs not only the leakage energy but some of the energy that would otherwise have reached the output. The clamp loss is

$$
P_{clamp} = \tfrac12L_\ell I_{pk}^2f_s\cdot\frac{V_c}{V_c - nV},
$$

which favours a clamp voltage well above the reflected voltage — limited, in turn, by the switch's rating. In [[#ex-usb-flyback]] a leakage of $2\,\%$ of $L_M$ ($39\,\mathrm{\mu H}$) with $V_c = 150\,\mathrm{V}$ dissipates $0.5\times39\,\mathrm{\mu H}\times0.43^2\times65\,\mathrm{kHz}\times150/50 = 0.71\,\mathrm{W}$ — six percent of the output power, and the reason why low-leakage interleaved windings, and **active-clamp** flybacks that recycle the leakage energy, are worth their complexity.

## The forward converter

Insert a transformer into the buck converter instead, between the switch and the output rectifier. When the switch is on, the secondary voltage $(N_s/N_p)V_g$ forward-biases a diode and drives an output inductor exactly as the switch node of a buck converter would; when it is off, a second (freewheeling) diode carries the inductor current. The transformer now transfers energy instantaneously, as a transformer should, and stores none except the small magnetising energy. But a new problem appears: during the on-time the primary has $V_g$ applied, and during the off-time — nothing. By [[#thm-reset]] the core will walk into saturation unless something resets it.

The classic solution is a third **reset winding** of $N_r$ turns, wound tightly coupled with the primary and connected through a diode back to $V_g$ with opposite polarity. When the switch turns off, the magnetising current transfers to the reset winding, which applies $-V_gN_p/N_r$ to the magnetising inductance until the magnetising current has fallen to zero; then the reset diode turns off and the core rests.

::: proposition Forward converter: conversion ratio and duty-cycle limit {#prop-forward}
A forward converter with turns $N_p$, $N_s$ and a reset winding of $N_r$ turns has, in continuous conduction of its output inductor,

$$
M = \frac{N_s}{N_p}D,
$$ {#eq-forward}

and its core resets completely only if

$$
D \le \frac{1}{1 + N_r/N_p},
$$ {#eq-forward-dmax}

i.e. $D \le 0.5$ for the usual $N_r = N_p$. The switch then blocks $V_g(1 + N_p/N_r)$, i.e. $2V_g$ for $N_r = N_p$.
:::

::: proof
The secondary and output inductor form a buck converter driven by the switched voltage $(N_s/N_p)V_g$ for $DT_s$ and $0$ for the rest of the period; volt-second balance on the output inductor gives [[#eq-forward]]. For the magnetising inductance: during $DT_s$ it sees $V_g$; during reset, for a time $D_rT_s$, it sees $-V_gN_p/N_r$; after reset, zero. Balance requires $DV_g = D_rV_gN_p/N_r$, so $D_r = DN_r/N_p$, and there must be room in the period: $D + D_r \le 1$, i.e. $D(1 + N_r/N_p) \le 1$. During reset the primary's dotted end is driven to $-V_gN_p/N_r$ relative to its supply end, so the switch sees $V_g + V_gN_p/N_r$.
:::

::: widget plot
f: floor(x)*max(0, 2*a - 1) + if(mod(x, 1) < a, mod(x, 1), max(2*a - mod(x, 1), max(0, 2*a - 1))); 1.2
x: 0, 6
y: 0, 2
sliders: a=0.3:0:0.8:0.01
labels: \phi/\phi_{1}\ \text{(magnetising flux)}; B_{sat}\ \text{level}
caption: Magnetising flux of a forward converter with a reset winding $N_r = N_p$, over six switching periods (time in units of $T_s$), with the duty cycle $a = D$ on the slider; the flux is normalised so that a full period of on-time would add $1$. For $D \le 0.5$ the reset winding returns the flux to zero within each period, and the pattern repeats. Push $D$ above $0.5$ and the reset interval no longer fits: each period leaves a residue of $2D - 1$, the flux ratchets upwards, and within a few periods it crosses the saturation level (orange) — the magnetising inductance collapses and the switch current runs away. This is why forward-converter controllers include a hard maximum duty-cycle limit.
:::

The forward converter suits roughly $50\,\mathrm{W}$ to $500\,\mathrm{W}$. It has a smooth output current (from the buck's output inductor), which makes it attractive for low output voltages at high current. Its main variant, the **two-switch forward**, places a switch at each end of the primary and two diodes from the ends back to the rails: at turn-off the magnetising and leakage energy return to $V_g$ through the diodes, each switch blocks only $V_g$, and $D \le 0.5$. Another, the **active-clamp forward**, resets the core with a capacitor and an auxiliary switch, allowing $D > 0.5$.

::: example A 48 V telecom forward converter {#ex-forward}
A forward converter supplies $5\,\mathrm{V}$ at $10\,\mathrm{A}$ from a telecom bus of $36$–$75\,\mathrm{V}$. The output rectifier and freewheeling diodes drop $0.5\,\mathrm{V}$, the reset winding has $N_r = N_p$, and the controller limits $D$ to $0.45$. Choose the turns ratio and find the duty cycle at both ends of the range and the switch's voltage rating.
::: solution
The buck stage must produce $V' = 5.5\,\mathrm{V}$ at the inductor's input on average. At minimum input and maximum duty cycle, [[#eq-forward]] requires $N_s/N_p \ge 5.5/(0.45\times36) = 0.340$. Choose $N_s/N_p = 0.35$ (for example $20:7$ turns). Then $D = 5.5/(0.35\times36) = 0.437$ at $36\,\mathrm{V}$ and $D = 5.5/(0.35\times75) = 0.210$ at $75\,\mathrm{V}$.

The switch blocks $2V_g = 150\,\mathrm{V}$ at maximum input, plus a leakage spike: a $200\,\mathrm{V}$ MOSFET. A two-switch forward would allow two $100\,\mathrm{V}$ devices instead, at the cost of a high-side driver.

The rectifier diodes each carry $10\,\mathrm{A}$ for part of the period and dissipate about $0.5\times10 = 5\,\mathrm{W}$ between them — ten percent of the output. At this voltage synchronous rectifiers are almost always used, often driven directly from the transformer's secondary (self-driven synchronous rectification).
:::
:::

::: quiz
Why can a flyback transformer reset itself while a forward-converter transformer needs a reset winding?
- [ ] The flyback uses a gapped core, which cannot saturate.
- [x] In the flyback the reflected output voltage appears across the magnetising inductance whenever the switch is off; in the forward converter the windings carry nothing that applies a negative voltage once the switch is off.
- [ ] The flyback always operates in DCM.
- [ ] The forward converter's duty cycle is fixed at $0.5$.
::: solution
In the flyback the magnetising current *is* the energy-transfer current: it flows in the secondary during the off-time and the output voltage, reflected, discharges it. In the forward converter, when the switch opens, the forward diode stops conducting and the freewheeling diode carries the output inductor current, so no winding applies any voltage; without a reset winding, clamp or second switch, the magnetising current has no path and no reset voltage.
:::
:::

## Bridge converters

The flyback and forward converters use their cores in one direction only: the flux swings between zero (or a small remanent value) and a maximum, never negative. Converters that drive their transformers with alternating voltage use the whole flux range $-B_{max}$ to $+B_{max}$, doubling the volt-seconds per turn, and they have no reset problem because positive and negative half-cycles are made equal by symmetry. They are used from a few hundred watts to many kilowatts.

- The **push–pull** converter has a centre-tapped primary with a switch on each half, alternately connecting each half across $V_g$. Each switch blocks $2V_g$; both switches are referenced to ground, which suits low input voltages such as a $12\,\mathrm{V}$ battery.
- The **half-bridge** converter places the primary between the midpoint of two switches and the midpoint of two capacitors that split the supply, so the primary sees $\pm V_g/2$.
- The **full-bridge** converter uses four switches in two legs, with the primary between the leg midpoints, so it sees $+V_g$, $-V_g$ or $0$. Each switch blocks only $V_g$.

The secondary is usually centre-tapped, with a diode (or synchronous switch) on each half, feeding an LC output filter as in the forward converter.

::: definition Effective duty cycle of a bridge converter {#def-bridge-duty}
In a bridge or push–pull converter, the **effective duty cycle** $D$ is the fraction of the switching period $T_s$ during which the transformer primary has a non-zero voltage ($+V_p$ for $DT_s/2$, $-V_p$ for $DT_s/2$, zero for the rest), where $V_p$ is $V_g$ for the full bridge and push–pull and $V_g/2$ for the half-bridge. The output rectifier then delivers $(N_s/N_p)V_p$ to the output filter for a fraction $D$ of the time.
:::

::: proposition Conversion ratio of the full-bridge converter {#prop-full-bridge}
In continuous conduction of the output inductor, with a centre-tapped secondary of $N_s$ turns per half,

$$
V = \frac{N_s}{N_p}DV_g\quad\text{(full bridge, push–pull)},\qquad V = \frac{N_s}{N_p}\,D\,\frac{V_g}{2}\quad\text{(half-bridge)}.
$$

The output inductor ripples at $2f_s$, and the core's peak flux density is $B_{pk} = V_pDT_s/(4N_pA_c)$, where $A_c$ is the core cross-section.
:::

::: proof
The rectified secondary voltage is $(N_s/N_p)V_p$ for $DT_s$ in each period (in two pulses) and zero otherwise; volt-second balance on the output inductor gives $V = (N_s/N_p)V_pD$, with two identical subintervals per switching period, hence ripple at $2f_s$. The primary applies $+V_p$ for $DT_s/2$, swinging the flux from $-\phi_{pk}$ to $+\phi_{pk}$: $2\phi_{pk}N_p = V_pDT_s/2$, so $B_{pk} = \phi_{pk}/A_c = V_pDT_s/(4N_pA_c)$. By symmetry the negative half-cycle swings it back, so the core resets automatically — provided the two half-cycles really are equal; small asymmetries in switch drops or timing leave a net DC volt-second that can walk the core into saturation, which is why bridge converters are often run with peak-current-mode control or a series blocking capacitor.
:::

::: example A 3 kW full-bridge converter {#ex-full-bridge}
A full-bridge converter turns a $400\,\mathrm{V}$ PFC bus into $48\,\mathrm{V}$ at $62.5\,\mathrm{A}$ at $100\,\mathrm{kHz}$, with a centre-tapped secondary and synchronous rectifiers (whose drop, together with the transformer and inductor resistances, is equivalent to $1\,\mathrm{V}$). Choose $N_p:N_s$ so that the effective duty cycle stays below $0.8$ even when the bus sags to $370\,\mathrm{V}$, and find $D$ at $400\,\mathrm{V}$. For a ferrite core of cross-section $A_c = 2.4\,\mathrm{cm^2}$, how many primary turns keep $B_{pk}$ below $0.15\,\mathrm{T}$ at the worst case?
::: solution
At $370\,\mathrm{V}$: $N_s/N_p \ge 49/(0.8\times370) = 0.166$, so $N_p/N_s \le 6.04$; choose $6:1$. At $400\,\mathrm{V}$, $D = 49\times6/400 = 0.735$; at $370\,\mathrm{V}$, $D = 0.795$.

The volt-seconds per half-cycle, $V_gDT_s/2$, are the same at both voltages because the product $V_gD$ is fixed by the output: $49\times6 = 294\,\mathrm{V}$ of average primary voltage, so $V_gDT_s/2 = 294\times10\,\mathrm{\mu s}/2 = 1.47\,\mathrm{mV\,s}$. With $B_{pk} = V_gDT_s/(4N_pA_c) \le 0.15\,\mathrm{T}$: $N_p \ge 294\times10^{-5}/(4\times2.4\times10^{-4}\times0.15) = 20.4$; choose $N_p = 24$ and $N_s = 4$ per half. (During a transient, when the controller may command $D$ near $1$ at $400\,\mathrm{V}$, the flux could reach $400\times10^{-5}/(4\times24\times2.4\times10^{-4}) = 0.17\,\mathrm{T}$ — still safely below ferrite's saturation of about $0.35\,\mathrm{T}$ at operating temperature.) The choice of $0.15\,\mathrm{T}$ is set by core loss rather than saturation at $100\,\mathrm{kHz}$, as [[power-electronics/magnetics-thermal-design]] explains.
:::
:::

## Soft switching

At the frequencies isolated converters use, the switching loss of [[power-electronics/power-switches#thm-switching-energy]] is often the largest loss, and the leakage inductance, a nuisance in hard-switched converters, can be turned into an ally. If a switch's voltage is brought to zero *before* it is turned on — by letting an inductor's current discharge the switch's output capacitance during the dead time — the turn-on overlap loss and the $\frac12C_{oss}V^2$ loss both disappear. This is **zero-voltage switching** (ZVS).

::: proposition Zero-voltage-switching condition {#prop-zvs}
In a half-bridge leg with output capacitance $C_{oss}$ per switch, an inductor carrying current $I$ at the start of the dead time can swing the midpoint fully from one rail to the other, so that the incoming switch turns on at zero voltage, provided

$$
\tfrac12LI^2 \ge C_{oss}V_g^2 \qquad\text{(linear capacitances)},
$$

and the dead time is long enough for the transition to complete, about $t_d \ge 2C_{oss}V_g/I$ when $I$ is roughly constant.
:::

::: proof
During the dead time both switches are off, and the inductor current charges the outgoing switch's $C_{oss}$ from $0$ to $V_g$ while discharging the incoming switch's from $V_g$ to $0$. Seen from the midpoint, the two capacitances are in parallel (both rails are AC ground), a total of $2C_{oss}$ whose voltage must swing by $V_g$. Treating the transition as a resonant exchange between $L$ and this capacitance, the inductor can complete the swing only if its energy $\frac12LI^2$ is at least the energy $\frac12(2C_{oss})V_g^2 = C_{oss}V_g^2$ that the capacitance absorbs over a full swing; if it is, the midpoint reaches the far rail and the incoming switch's body diode conducts, clamping its voltage at zero before its gate is driven. When $L$ is large the current is nearly constant during the transition, and moving the charge $2C_{oss}V_g$ takes $2C_{oss}V_g/I$. (This is a sketch: an exact analysis includes the voltage at the inductor's other terminal, and with nonlinear capacitances the datasheet's $Q_{oss}$ and $E_{oss}$ replace $C_{oss}V_g$ and $\frac12C_{oss}V_g^2$; see Erickson and Maksimović, chapter 20.)
:::

::: example Is there enough energy for ZVS? {#ex-zvs}
A half-bridge leg on a $400\,\mathrm{V}$ bus switches at $200\,\mathrm{kHz}$ with MOSFETs whose effective $C_{oss}$ is $150\,\mathrm{pF}$. At the start of each dead time the transformer's primary current, flowing through $10\,\mathrm{\mu H}$ of leakage inductance, is $3\,\mathrm{A}$. Is ZVS achieved, how long must the dead time be, and roughly what loss does ZVS save per switch?
::: solution
The inductor holds $\frac12LI^2 = 0.5\times10^{-5}\times9 = 45\,\mathrm{\mu J}$; the transition needs $C_{oss}V_g^2 = 1.5\times10^{-10}\times1.6\times10^5 = 24\,\mathrm{\mu J}$. The energy suffices, by a margin of almost two. The transition takes about $2C_{oss}V_g/I = 2\times1.5\times10^{-10}\times400/3 = 40\,\mathrm{ns}$, so a dead time of $50$–$80\,\mathrm{ns}$ is appropriate (too long a dead time lets the inductor current reverse and the midpoint swing back).

Hard switching would dump each switch's $\frac12C_{oss}V_g^2 = 12\,\mathrm{\mu J}$ into its channel at every turn-on, $12\,\mathrm{\mu J}\times2\times10^5 = 2.4\,\mathrm{W}$ per switch, and add the overlap loss of [[power-electronics/power-switches#thm-switching-energy]] on top. With ZVS both are gone; only the turn-off overlap remains, and the capacitances themselves slow the voltage rise at turn-off, reducing that too.
:::
:::

The **phase-shifted full bridge** applies this idea to the full-bridge converter: instead of switching diagonal pairs together, the two legs run at a fixed $50\,\%$ duty cycle and the output is controlled by the phase shift between them. The transformer's leakage inductance (often supplemented by a small series inductor) provides the ZVS energy. At light load the current — and hence the ZVS energy — falls, and ZVS is lost in the lagging leg first. In the **LLC resonant converter**, now the dominant topology for $100\,\mathrm{W}$ to several kilowatts, a series capacitor resonates with the leakage and magnetising inductances, the switches run at $50\,\%$ duty, the output is controlled by frequency, and both primary-side ZVS and secondary-side zero-current switching are obtained over a wide load range. The **dual active bridge** — two full bridges coupled through a transformer and its leakage inductance — transfers power in either direction by the phase shift between the bridges, and is a common choice for bidirectional EV chargers and solid-state transformers.

::: application The anatomy of a laptop adapter
A $65\,\mathrm{W}$ USB-C laptop adapter contains, in order: an EMI filter; a diode bridge; a boost PFC stage (required above $75\,\mathrm{W}$ in Europe, often included anyway); a bulk capacitor; a flyback or, increasingly, an active-clamp flyback or asymmetric half-bridge converter using GaN switches at several hundred kilohertz; a synchronous rectifier; and a USB Power Delivery controller that negotiates the output voltage ($5$, $9$, $15$ or $20\,\mathrm{V}$) and adjusts the feedback reference accordingly, across the isolation barrier through an optocoupler or a digital isolator. The transformer is the component that sets the size of the adapter, and the shift to GaN and higher frequencies has shrunk it severalfold in a decade.
:::

::: warning Isolation is a safety specification, not just a winding
A transformer provides galvanic isolation only if its insulation meets the relevant safety standard (for example IEC 62368-1): reinforced insulation between primary and secondary, specified creepage and clearance distances, triple-insulated wire or margin tape, and a hipot test at several kilovolts. Everything else that crosses the barrier — the feedback optocoupler, the Y-capacitor that returns common-mode noise to the primary — must meet the same standard. A converter with a transformer but an inadequate barrier is not isolated.
:::

::: history
Transformers have been at the heart of power conversion since the 1880s, but the high-frequency isolated converter is a product of the transistor. Royer's self-oscillating push–pull converter (George H. Royer, 1955) was one of the first transistor DC–DC converters, and the flyback circuit takes its name from the horizontal-deflection ("flyback") stage of cathode-ray-tube televisions, which also produced the tube's high voltage. Switch-mode power supplies replaced line-frequency transformers in computers during the 1970s and 1980s. Soft switching developed in the 1980s; the phase-shifted full bridge became a standard topology around 1990, and the dual active bridge was described by Rik De Doncker, Deepakraj Divan and Mustansir Kheraluwala in 1991.
:::

## Where this leads

The design of the transformers and coupled inductors met here — choosing the core, the number of turns, the gap and the windings — is the subject of [[power-electronics/magnetics-thermal-design]]. Feedback control of isolated converters, including the optocoupler loop and peak-current-mode control, is in [[power-electronics/converter-control]]. Bidirectional isolated stages reappear in the EV chargers and solid-state transformers of [[power-electronics/power-electronics-applications]].

::: summary
- A transformer provides isolation and most of the voltage ratio; at high frequency it is small because its size scales with volt-seconds per cycle.
- Every transformer must be reset each period: zero average voltage on the magnetising inductance ([[#thm-reset]]), or the core walks into saturation.
- Flyback: a coupled inductor, $M = D/(nD')$, self-resetting, switch stress $V_g + nV$ plus a leakage spike that needs a clamp; dominant below about $100\,\mathrm{W}$.
- Forward: a transformer in a buck, $M = (N_s/N_p)D$, needs a reset mechanism and $D \le N_p/(N_p + N_r)$ (usually $0.5$), switch stress $2V_g$ with a one-to-one reset winding.
- Push–pull, half- and full-bridge converters use bipolar flux and reset by symmetry; the full bridge has $V = (N_s/N_p)DV_g$ with each switch blocking $V_g$.
- Leakage inductance stores energy that must be clamped — or used, as in zero-voltage switching, the phase-shifted full bridge, LLC and dual-active-bridge converters.
:::

## Exercises

::: exercise Flyback output voltage {level=1 check="400/20*0.3/0.7"}
A flyback converter has $n = N_p/N_s = 20$, runs from $400\,\mathrm{V}$ at $D = 0.3$ in continuous conduction. Find the output voltage in volts and the switch's voltage stress (ignoring the leakage spike).
::: solution
$V = (V_g/n)\,D/D' = 20\times0.3/0.7 = 8.57\,\mathrm{V}$. The switch blocks $V_g + nV = 400 + 171 = 571\,\mathrm{V}$.
:::
:::

::: exercise Forward converter turns ratio {level=1 check="12/(0.4*48)"}
A forward converter must give $12\,\mathrm{V}$ from $48\,\mathrm{V}$ at $D = 0.4$ (ideal devices). What is $N_s/N_p$?
::: solution
$N_s/N_p = V/(DV_g) = 12/(0.4\times48) = 0.625$.
:::
:::

::: exercise Flyback power in DCM {level=1 check="0.5*500e-6*1.2^2*100e3"}
A flyback converter in DCM has $L_M = 500\,\mathrm{\mu H}$, a peak primary current of $1.2\,\mathrm{A}$ and $f_s = 100\,\mathrm{kHz}$. What power (in watts) does it transfer, if it is lossless?
::: solution
$P = \frac12L_MI_{pk}^2f_s = 0.5\times5\times10^{-4}\times1.44\times10^5 = 36\,\mathrm{W}$.
:::
:::

::: exercise Reset winding with fewer turns {level=2 check="1/(1 + 0.6)"}
A forward converter uses a reset winding with $N_r = 0.6N_p$. Find the maximum duty cycle and the switch's off-state voltage as a multiple of $V_g$. Why might a designer accept the higher voltage?
::: solution
$D_{max} = 1/(1 + N_r/N_p) = 1/1.6 = 0.625$. The switch blocks $V_g(1 + N_p/N_r) = V_g(1 + 1.667) = 2.67V_g$. A larger maximum duty cycle allows a higher secondary-to-primary ratio for the same output, which lowers the primary RMS current and the secondary voltage stress, and widens the input range the converter can regulate over; this is attractive with a low-voltage input where the switch's voltage rating is cheap.
:::
:::

::: exercise A leakage clamp {level=2 check="0.5*10e-6*2^2*100e3*200/(200-120)"}
A flyback converter switches $I_{pk} = 2\,\mathrm{A}$ at $100\,\mathrm{kHz}$; its leakage inductance is $10\,\mathrm{\mu H}$ and its reflected voltage $nV = 120\,\mathrm{V}$. Find the power (in watts) dissipated by an RCD clamp held at $V_c = 200\,\mathrm{V}$. By how much would raising $V_c$ to $300\,\mathrm{V}$ reduce it?
::: solution
$P = \frac12L_\ell I_{pk}^2f_s\cdot V_c/(V_c - nV) = 0.5\times10^{-5}\times4\times10^5\times200/80 = 2\times2.5 = 5\,\mathrm{W}$. At $300\,\mathrm{V}$: $2\times300/180 = 3.33\,\mathrm{W}$, a third less — but the switch must then block $V_g + 300\,\mathrm{V}$.
:::
:::

::: exercise Half-bridge versus full bridge {level=2}
A $1\,\mathrm{kW}$ converter runs from $400\,\mathrm{V}$ at an effective duty cycle of $0.8$. Compare the half-bridge and full-bridge versions: primary voltage amplitude, turns ratio for a $24\,\mathrm{V}$ output (ideal devices), average primary current during the power-transfer intervals, and switch voltage rating.
::: solution
Full bridge: $V_p = 400\,\mathrm{V}$, $N_s/N_p = 24/(0.8\times400) = 0.075$; the primary current during power transfer is about $(N_s/N_p)I_{out} = 0.075\times41.7 = 3.1\,\mathrm{A}$; four switches, each blocking $400\,\mathrm{V}$. Half-bridge: $V_p = 200\,\mathrm{V}$, $N_s/N_p = 0.15$; primary current $6.25\,\mathrm{A}$ — twice as large, so for the same conduction loss the two switches must each have a quarter of the resistance — and each blocks $400\,\mathrm{V}$. The half-bridge saves two switches and drivers and suits lower powers; above roughly $1\,\mathrm{kW}$ the full bridge's lower currents win.
:::
:::

::: exercise Core flux in a forward converter {level=2 check="36*0.437*10e-6/(30*0.6e-4)"}
The forward converter of [[#ex-forward]] switches at $100\,\mathrm{kHz}$ with $N_p = 30$ turns on a core of cross-section $0.6\,\mathrm{cm^2}$. Find the peak flux density (in tesla) at the end of the on-time at minimum input, starting from zero flux. Is it different at maximum input?
::: solution
$\Delta B = V_gDT_s/(N_pA_c) = 36\times0.437\times10^{-5}/(30\times0.6\times10^{-4}) = 0.087\,\mathrm{T}$. At $75\,\mathrm{V}$, $D = 0.21$ and $V_gD = 15.7\,\mathrm{V}$, almost the same product (the output fixes $V_gD$ through $M = (N_s/N_p)D$), so $\Delta B$ is nearly the same, $0.088\,\mathrm{T}$. A transient at high line with the duty limit of $0.45$ could give $75\times0.45\times10^{-5}/(1.8\times10^{-3}) = 0.19\,\mathrm{T}$, which is why the design margin is checked at that corner.
:::
:::

::: exercise ZVS at light load {level=3 check="2*200e-12*400^2/2^2"}
A phase-shifted full bridge on $400\,\mathrm{V}$ uses MOSFETs with an effective $C_{oss}$ of $200\,\mathrm{pF}$. The primary current at the start of the lagging-leg transition is $2\,\mathrm{A}$ at $20\,\%$ load. What total series inductance (leakage plus added inductor), in henries, guarantees ZVS at this load? What dead time is needed, and what does the inductance cost at full load?
::: hint
Use [[#prop-zvs]].
:::
::: solution
$\frac12LI^2 \ge C_{oss}V_g^2$ gives $L \ge 2C_{oss}V_g^2/I^2 = 2\times2\times10^{-10}\times1.6\times10^5/4 = 16\,\mathrm{\mu H}$. The dead time must exceed about $2C_{oss}V_g/I = 2\times2\times10^{-10}\times400/2 = 80\,\mathrm{ns}$ (somewhat more, since the current falls during a resonant transition). At full load the same inductance slows the reversal of primary current at each transition — during which no power is delivered — so the secondary loses effective duty cycle (**duty-cycle loss**), and the turns ratio must be lowered to compensate, raising the primary current. The designer trades ZVS range against duty-cycle loss.
:::
:::

::: exercise Flyback design for a wide input range {level=3}
For the charger of [[#ex-usb-flyback]] ($L_M = 1.94\,\mathrm{mH}$, $n = 18$, $65\,\mathrm{kHz}$, input power $11.8\,\mathrm{W}$), (a) show that at $375\,\mathrm{V}$ the converter is in DCM, and find the time the secondary current takes to fall to zero; (b) find the RMS primary current at $120\,\mathrm{V}$, at the boundary; (c) explain how doubling $n$ would change the switch stress and the RMS secondary current.
::: solution
(a) The on-time at $375\,\mathrm{V}$ is $DT_s = 0.145\times15.4 = 2.24\,\mathrm{\mu s}$. During the off-time the magnetising inductance sees $-nV' = -99\,\mathrm{V}$, so the current falls from $0.43\,\mathrm{A}$ to zero in $L_MI_{pk}/(nV') = 1.94\times10^{-3}\times0.43/99 = 8.4\,\mathrm{\mu s}$. On-time plus fall time is $10.7\,\mathrm{\mu s} < 15.4\,\mathrm{\mu s}$: DCM, with $4.7\,\mathrm{\mu s}$ of idle time. (b) A triangle from $0$ to $I_{pk}$ lasting $DT_s$ has RMS $I_{pk}\sqrt{D/3} = 0.43\sqrt{0.452/3} = 0.167\,\mathrm{A}$. (c) With $n = 36$ the reflected voltage would be $198\,\mathrm{V}$ and the switch would see $375 + 198 = 573\,\mathrm{V}$ plus the spike — too much for a $650\,\mathrm{V}$ part. The duty cycle at low line would rise to $0.62$, the secondary conduction time would shorten, and with the same output charge in less time the secondary peak and RMS currents would rise. The reflected voltage around $80$–$130\,\mathrm{V}$ is the usual compromise for universal-input flybacks.
:::
:::
