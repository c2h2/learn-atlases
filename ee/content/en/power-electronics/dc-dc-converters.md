Inside a phone there are a dozen or more **DC–DC converters**: one steps the battery's $3.0$–$4.4\,\mathrm{V}$ down to under $1\,\mathrm{V}$ for the processor cores, another to $1.8\,\mathrm{V}$ for memory, another boosts it to drive the display backlight, and each must be over $90\,\%$ efficient or the battery life and the case temperature suffer. In a car, in a data-centre server, in a solar panel's optimiser and in an electric vehicle's auxiliary supply the same three basic circuits appear over and over: the **buck** converter, which steps a DC voltage down, the **boost** converter, which steps it up, and the **buck–boost** converter, which does either with an inverted output.

All three are built from one switch, one diode (or a second switch), one inductor and one capacitor, and all three are analysed with the same two principles — the average voltage across an inductor and the average current into a capacitor are zero in steady state. This chapter derives the conversion ratios, ripples and device stresses of the three converters, in the normal **continuous conduction mode** and in the **discontinuous conduction mode** that appears at light load, and turns the results into a design procedure. The switches are those of [[power-electronics/power-switches]]; the dynamics and feedback control of these converters are the subject of [[power-electronics/converter-control]].

## The switch and the filter

Consider a single-pole, double-throw switch that connects a node $v_s$ alternately to the input voltage $V_g$ and to ground. It is in the upper position for a time $DT_s$ and in the lower position for the rest of each **switching period** $T_s = 1/f_s$.

::: definition Duty cycle and switched voltage {#def-duty}
The **duty cycle** $D$ ($0 \le D \le 1$) is the fraction of the switching period for which the controlled switch is on; its complement is written $D' = 1 - D$. A switch connecting a node to $V_g$ for $DT_s$ and to ground for $D'T_s$ produces a rectangular **switched voltage** whose average (DC component) is

$$
\langle v_s\rangle = \frac1{T_s}\int_0^{T_s}v_s\,\dd t = DV_g .
$$
:::

The switched voltage has the right average but is a pulse train with large harmonics at $f_s$ and its multiples. A low-pass LC filter — an inductor in series and a capacitor across the load — passes the average and strongly attenuates the switching harmonics if its corner frequency $1/(2\pi\sqrt{LC})$ is well below $f_s$. The result is the **buck converter**: a switch (in practice a MOSFET from $V_g$ to the switch node, and a diode or second MOSFET from the switch node to ground), an inductor $L$ from the switch node to the output, and a capacitor $C$ across the load $R$. Because the switch network dissipates nothing ideally and $L$ and $C$ store and release energy without loss, the conversion is lossless in principle.

Inductors and capacitors in a switching converter are never in a static state: their currents and voltages ripple at the switching frequency. The analysis exploits the fact that in **periodic steady state** every waveform repeats exactly from one period to the next.

::: theorem Volt-second and charge balance {#thm-balance}
In periodic steady state, the average voltage across every inductor and the average current into every capacitor are zero over a switching period:

$$
\langle v_L\rangle = \frac1{T_s}\int_0^{T_s}v_L\,\dd t = 0,\qquad \langle i_C\rangle = \frac1{T_s}\int_0^{T_s}i_C\,\dd t = 0 .
$$
:::

::: proof
For an inductor, $v_L = L\,\dd i_L/\dd t$, so $\int_0^{T_s}v_L\,\dd t = L\,[i_L(T_s) - i_L(0)]$. In periodic steady state $i_L(T_s) = i_L(0)$, so the integral vanishes. The capacitor statement follows identically from $i_C = C\,\dd v_C/\dd t$ and $v_C(T_s) = v_C(0)$. If the average inductor voltage were not zero, the inductor current would grow by a net amount every period — the converter would not be in steady state.
:::

The second tool is an approximation.

::: definition Small-ripple approximation {#def-small-ripple}
In a well-designed converter the switching ripple of the output voltage is a small fraction of its DC value (well under $1\,\%$ typically). In the **small-ripple approximation** each capacitor voltage and each inductor current that is filtered is replaced by its DC value when computing the voltages across inductors and currents into capacitors. The ripples themselves are then found afterwards from the resulting piecewise-constant slopes.
:::

## The buck converter

With the switch on (interval 1, duration $DT_s$), the inductor sees $v_L = V_g - v \approx V_g - V$; with the switch off (interval 2, $D'T_s$), $v_L = -V$. Volt-second balance gives

$$
D(V_g - V) + D'(-V) = 0 \implies V = DV_g .
$$ {#eq-buck-m}

The **conversion ratio** $M(D) = V/V_g$ of the buck converter is therefore $D$. Charge balance on the capacitor gives the DC inductor current: the capacitor current is $i_L - V/R$ in both intervals, so $\langle i_C\rangle = I_L - V/R = 0$, and $I_L = V/R = I_{out}$.

In each interval the inductor voltage is constant, so the inductor current is a straight-line ramp, rising with slope $(V_g - V)/L$ for $DT_s$ and falling with slope $-V/L$ for $D'T_s$. Its **peak-to-peak ripple** is

$$
\Delta i_L = \frac{V_g - V}{L}DT_s = \frac{V(1 - D)}{Lf_s}.
$$ {#eq-buck-ripple}

The capacitor absorbs the AC part of the inductor current, a triangle of peak-to-peak value $\Delta i_L$. During the half of the period in which $i_C > 0$ the capacitor gains the charge in one triangle of base $T_s/2$ and height $\Delta i_L/2$, $q = \frac12\cdot\frac{T_s}{2}\cdot\frac{\Delta i_L}{2} = \Delta i_LT_s/8$, so the output-voltage ripple is

$$
\Delta v = \frac{q}{C} = \frac{\Delta i_L}{8f_sC} = \frac{V(1 - D)}{8LCf_s^2}.
$$ {#eq-buck-vripple}

In terms of the filter's corner frequency $f_0 = 1/(2\pi\sqrt{LC})$ this is $\Delta v/V = \frac{\pi^2}{2}(1 - D)(f_0/f_s)^2$: the ripple falls with the square of the ratio of switching to corner frequency, as expected of a second-order filter.

::: warning Peak-to-peak, or half the ripple?
This chapter writes $\Delta i_L$ and $\Delta v$ for **peak-to-peak** ripples. Erickson and Maksimović's text, and many papers, use $\Delta i$ for half the peak-to-peak value (the deviation from the average), so their formulas carry a factor $2$ in the denominator ($\Delta i = (V_g - V)DT_s/(2L)$). Both are correct; mixing them halves or doubles your inductor. Equally, a "$30\,\%$ ripple" specification almost always means peak-to-peak ripple as a fraction of the DC current. State the convention whenever you quote a number.
:::

::: example Designing a 12 V to 3.3 V buck converter {#ex-buck-design}
Design the power stage of a synchronous buck converter from $12\,\mathrm{V}$ to $3.3\,\mathrm{V}$ at $5\,\mathrm{A}$, switching at $500\,\mathrm{kHz}$. Specifications: inductor ripple about $30\,\%$ of the load current, output ripple at most $10\,\mathrm{mV}$ peak to peak. Find $D$, $L$ (rounded to a standard value), the actual ripple, the peak inductor current, $C$ and the largest capacitor ESR allowed. Below what load does the converter (with a diode instead of the lower MOSFET) leave continuous conduction?
::: solution
$D = 3.3/12 = 0.275$. For $\Delta i_L = 0.3\times5 = 1.5\,\mathrm{A}$, [[#eq-buck-ripple]] gives

$$
L = \frac{(V_g - V)D}{f_s\,\Delta i_L} = \frac{8.7\times0.275}{5\times10^5\times1.5} = 3.19\,\mathrm{\mu H}.
$$

Choose the standard $3.3\,\mathrm{\mu H}$; then $\Delta i_L = 8.7\times0.275/(5\times10^5\times3.3\times10^{-6}) = 1.45\,\mathrm{A}$, and the peak inductor current is $5 + 0.725 = 5.73\,\mathrm{A}$. The inductor must be rated not to saturate at this peak, plus a margin for transients (say $7\,\mathrm{A}$).

From [[#eq-buck-vripple]], $C \ge \Delta i_L/(8f_s\Delta v) = 1.45/(8\times5\times10^5\times0.01) = 36\,\mathrm{\mu F}$. A real capacitor's equivalent series resistance adds a ripple $\Delta i_L\cdot\mathrm{ESR}$ in phase with the current, so the ESR must be well below $0.01/1.45 = 6.9\,\mathrm{m\Omega}$. Two or three $22\,\mathrm{\mu F}$ ceramic capacitors in parallel (each of a few $\mathrm{m\Omega}$, and with their capacitance derated for DC bias) meet both requirements; an electrolytic capacitor would not.

With a diode, the inductor current would reach zero at the bottom of its ripple when $I_{out} = \Delta i_L/2 = 0.73\,\mathrm{A}$; below that the converter enters discontinuous conduction (treated below). With a synchronous MOSFET the current simply goes negative during part of the cycle and the converter stays in continuous conduction at all loads.
:::
:::

## The boost converter

Exchange the positions of the source and load: an inductor from the input $V_g$ to a switch node, a switch from that node to ground, and a diode from the node to the output capacitor and load. With the switch on, the inductor is connected across $V_g$ and stores energy, while the diode is reverse biased and the capacitor alone supplies the load. With the switch off, the inductor current flows through the diode into the output.

::: theorem Conversion ratio of the boost converter {#thm-boost}
In continuous conduction the ideal boost converter has

$$
M(D) = \frac{V}{V_g} = \frac1{1 - D} = \frac1{D'},\qquad I_L = \frac{I_{out}}{D'},
$$ {#eq-boost-m}

and peak-to-peak ripples $\Delta i_L = V_gDT_s/L$ and $\Delta v = I_{out}DT_s/C$.
:::

::: proof
Interval 1 (switch on): $v_L = V_g$, $i_C = -V/R$. Interval 2: $v_L = V_g - V$, $i_C = I_L - V/R$. Volt-second balance: $DV_g + D'(V_g - V) = 0$, so $V_g = D'V$. Charge balance: $D(-V/R) + D'(I_L - V/R) = 0$, so $D'I_L = V/R = I_{out}$. In interval 1 the inductor current rises with slope $V_g/L$ for $DT_s$, giving $\Delta i_L$; the capacitor discharges at the constant current $V/R$ for $DT_s$, losing charge $I_{out}DT_s$, which gives $\Delta v$ (here the capacitor current is rectangular, not triangular).
:::

The boost converter's input current is the inductor current — smooth — while its output current is pulsed: the diode delivers $I_L$ during $D'T_s$ and nothing during $DT_s$. That is why its output capacitor carries a large RMS current and why the output ripple formula has no $1/8$. The input power $V_gI_L$ equals the output power $VI_{out}$, as it must.

As $D \to 1$ the ideal ratio tends to infinity. A real converter cannot do this: the losses become dominant.

::: proposition Boost converter with inductor resistance {#prop-boost-rl}
If the inductor has series resistance $R_L$ (all other elements ideal), then

$$
M(D) = \frac1{D'}\cdot\frac1{1 + R_L/(D'^2R)},\qquad \eta = \frac1{1 + R_L/(D'^2R)} .
$$ {#eq-boost-rl}

$M$ reaches a maximum of $\frac12\sqrt{R/R_L}$ at $D' = \sqrt{R_L/R}$, and the efficiency falls steadily as $D$ grows.
:::

::: proof
The inductor voltage now includes $-I_LR_L$ in both intervals: $D(V_g - I_LR_L) + D'(V_g - I_LR_L - V) = 0$, so $V_g - I_LR_L = D'V$. Charge balance is unchanged, $I_L = V/(D'R)$. Substituting, $V_g = D'V + VR_L/(D'R)$, i.e. $V/V_g = 1/(D' + R_L/(D'R)) = \frac1{D'}\cdot\frac1{1 + R_L/(D'^2R)}$. The efficiency is $P_{out}/P_{in} = (V^2/R)/(V_gI_L) = (V/V_g)D' = 1/(1 + R_L/(D'^2R))$. Writing $M = 1/(D' + R_L/(D'R))$, the denominator $g(D') = D' + R_L/(D'R)$ is minimised where $g' = 1 - R_L/(D'^2R) = 0$, i.e. $D' = \sqrt{R_L/R}$, where $g = 2\sqrt{R_L/R}$ and $M_{max} = \frac12\sqrt{R/R_L}$.
:::

::: widget plot
f: 1/(1 - x); 1/(1 - x)/(1 + r/(1 - x)^2); 10/(1 + r/(1 - x)^2)
x: 0, 1
y: 0, 10
sliders: r=0.01:0.002:0.1:0.002
labels: M\ \text{ideal}; M\ \text{with }R_L; 10\,\eta
caption: Conversion ratio of a boost converter against duty cycle $D$, ideal (blue) and with inductor resistance (orange), for $r = R_L/R$ on the slider; green is ten times the efficiency. With $r = 0.01$ the real curve follows the ideal one up to $D \approx 0.7$, peaks at $M = 5$ near $D = 0.9$ and then collapses — beyond the peak, more duty cycle gives *less* output, a trap for a feedback loop. Long before the peak the efficiency has become poor: practical boost converters rarely exceed a ratio of about $4$ to $6$.
:::

::: example How much gain can a boost converter give? {#ex-boost-limit}
A boost converter from $12\,\mathrm{V}$ drives a $10\,\Omega$ load through an inductor of resistance $R_L = 0.1\,\Omega$. Find the largest output voltage it can produce and the duty cycle at which it occurs, and the output voltage and efficiency at $D = 0.75$.
::: solution
$R_L/R = 0.01$. By [[#prop-boost-rl]] the maximum is $M_{max} = \frac12\sqrt{100} = 5$, i.e. $60\,\mathrm{V}$, at $D' = \sqrt{0.01} = 0.1$, $D = 0.9$. At that point the efficiency is $1/(1 + 0.01/0.01) = 50\,\%$: half the input power is lost in $R_L$, which is the maximum-power-transfer condition in disguise.

At $D = 0.75$: $R_L/(D'^2R) = 0.01/0.0625 = 0.16$, so $\eta = 1/1.16 = 86.2\,\%$ and $M = 4/1.16 = 3.45$, giving $41.4\,\mathrm{V}$ instead of the ideal $48\,\mathrm{V}$. The inductor current is $I_L = V/(D'R) = 41.4/2.5 = 16.6\,\mathrm{A}$, and its loss $16.6^2\times0.1 = 27.4\,\mathrm{W}$ against $171\,\mathrm{W}$ delivered — a hundred-milliohm inductor is a poor choice for this duty. The lesson: the inductor current of a boost converter is $1/D'$ times the output current, and every resistive loss is multiplied by $1/D'^2$.
:::
:::

::: example A 5 V to 12 V boost converter {#ex-boost-design}
A boost converter produces $12\,\mathrm{V}$ at $1\,\mathrm{A}$ from a $5\,\mathrm{V}$ USB supply at $200\,\mathrm{kHz}$. Find the duty cycle, the DC inductor current, the inductance for $30\,\%$ ripple, the output capacitance for $60\,\mathrm{mV}$ ($0.5\,\%$) ripple, and the voltage and peak current ratings of the switch and diode. Then estimate the efficiency if the inductor has $R_L = 50\,\mathrm{m\Omega}$.
::: solution
$D' = V_g/V = 5/12$, so $D = 0.583$. $I_L = I_{out}/D' = 1/(5/12) = 2.4\,\mathrm{A}$. For $\Delta i_L = 0.72\,\mathrm{A}$: $L = V_gDT_s/\Delta i_L = 5\times0.583\times5\,\mathrm{\mu s}/0.72 = 20.3\,\mathrm{\mu H}$; choose $22\,\mathrm{\mu H}$ (ripple $0.66\,\mathrm{A}$). $C = I_{out}DT_s/\Delta v = 1\times0.583\times5\,\mathrm{\mu s}/0.06 = 48.6\,\mathrm{\mu F}$; choose ceramics totalling at least $50\,\mathrm{\mu F}$ after DC-bias derating.

Both the switch and the diode must block the output voltage $12\,\mathrm{V}$ (a $20$ or $30\,\mathrm{V}$ part), and both carry the peak inductor current $2.4 + 0.33 = 2.73\,\mathrm{A}$. The switch's average current is $DI_L = 1.4\,\mathrm{A}$, the diode's is $D'I_L = 1.0\,\mathrm{A}$ — the output current, as it must be.

With $R_L = 50\,\mathrm{m\Omega}$ and $R = 12\,\Omega$, $R_L/(D'^2R) = 0.05/(0.1736\times12) = 0.024$, so $\eta = 1/1.024 = 97.6\,\%$ from the inductor alone (the copper loss $I_L^2R_L = 2.4^2\times0.05 = 0.29\,\mathrm{W}$ against $12\,\mathrm{W}$ out). To hold $12\,\mathrm{V}$ the controller raises $D$ slightly, to about $0.593$.
:::
:::

## The buck–boost family

Place the inductor from the switch node to ground, the switch from the input to that node, and the diode from the node to the output, pointing *towards* the switch node. With the switch on, the inductor charges from $V_g$; with it off, the inductor discharges into the output capacitor through the diode, in a direction that makes the output negative.

::: proposition The buck–boost converter {#prop-buck-boost}
In continuous conduction the inverting buck–boost converter has

$$
M(D) = \frac{V}{V_g} = -\frac{D}{1 - D},\qquad I_L = \frac{\lvert I_{out}\rvert}{D'},
$$

and both its switch and its diode must block $V_g + \lvert V\rvert$.
:::

::: proof
Interval 1: $v_L = V_g$. Interval 2: $v_L = V$ (negative). Volt-second balance $DV_g + D'V = 0$ gives $V = -DV_g/D'$. The capacitor current is $-V/R$ in interval 1 and $-I_L - V/R$ in interval 2 (with $I_L$ defined flowing from the switch node into the inductor towards ground), so charge balance gives $D'I_L = -V/R = \lvert I_{out}\rvert$. With the switch off, the switch node sits at $V$, so the switch sees $V_g - V = V_g + \lvert V\rvert$; with it on, the diode sees the same voltage.
:::

The buck–boost converter steps down for $D < 0.5$ and up for $D > 0.5$. Its energy is transferred entirely through the inductor — stored during interval 1, released during interval 2 — which makes it the parent of the **flyback converter** of [[power-electronics/isolated-converters]]. It has pulsed currents at both input and output. Two fourth-order relatives fix this: the **Ćuk converter**, with an inductor at each port and an energy-transfer capacitor between them, has the same ratio $-D/D'$ but smooth input and output currents; the **SEPIC** (single-ended primary-inductance converter) has $M = D/D'$ with a *non-inverted* output, and is widely used where the input voltage may lie above or below the output, as with a Li-ion cell feeding a $3.3\,\mathrm{V}$ rail.

| converter | $M(D)$ | switch voltage | $I_L$ |
|---|---|---|---|
| buck | $D$ | $V_g$ | $I_{out}$ |
| boost | $1/D'$ | $V$ | $I_{out}/D'$ |
| buck–boost | $-D/D'$ | $V_g + \lvert V\rvert$ | $\lvert I_{out}\rvert/D'$ |
| Ćuk | $-D/D'$ | $V_g + \lvert V\rvert$ | $I_{in}$ and $\lvert I_{out}\rvert$ |
| SEPIC | $D/D'$ | $V_g + V$ | $I_{in}$ and $I_{out}$ |

::: quiz
A buck–boost converter runs at $D = 0.6$ from $12\,\mathrm{V}$. What is its output voltage, and what voltage must its MOSFET block?
- [ ] $-7.2\,\mathrm{V}$; $12\,\mathrm{V}$
- [ ] $-18\,\mathrm{V}$; $18\,\mathrm{V}$
- [x] $-18\,\mathrm{V}$; $30\,\mathrm{V}$
- [ ] $+18\,\mathrm{V}$; $30\,\mathrm{V}$
::: solution
$V = -0.6\times12/0.4 = -18\,\mathrm{V}$. With the switch off, its source terminal (the switch node) is at $-18\,\mathrm{V}$ while its drain is at $+12\,\mathrm{V}$, so it blocks $30\,\mathrm{V}$. Choosing a switch rated for the input voltage alone is a classic mistake with this topology.
:::
:::

## Discontinuous conduction mode

When the diode is a passive diode, the inductor current cannot reverse. If the load current falls below half the inductor ripple, the inductor current reaches zero before the end of the period and stays there: the converter enters the **discontinuous conduction mode** (DCM). There are now three intervals — switch on ($D_1T_s$, with $D_1 = D$), diode on ($D_2T_s$), and both off ($D_3T_s = (1 - D - D_2)T_s$, with $i_L = 0$ and $v_L = 0$) — and the conversion ratio becomes load-dependent.

::: definition The dimensionless parameter K {#def-k}
For a converter with inductance $L$, load $R$ and switching period $T_s$, define $K = 2L/(RT_s)$. The converter operates in DCM when $K < K_{crit}(D)$, where for the buck converter $K_{crit} = 1 - D$, for the boost $K_{crit} = D(1 - D)^2$, and for the buck–boost $K_{crit} = (1 - D)^2$.
:::

The buck criterion follows from comparing the load current with half the ripple: CCM requires $V/R > \Delta i_L/2 = V(1 - D)T_s/(2L)$, i.e. $2L/(RT_s) > 1 - D$. The others follow in the same way from $I_L > \Delta i_L/2$ with $I_L$ and $\Delta i_L$ from the boost and buck–boost formulas.

::: theorem Buck converter in DCM {#thm-buck-dcm}
In discontinuous conduction the buck converter's conversion ratio is

$$
M = \frac{V}{V_g} = \frac{2}{1 + \sqrt{1 + 4K/D^2}} ,
$$ {#eq-buck-dcm}

which exceeds $D$ and tends to $1$ as the load is removed ($R \to \infty$, $K \to 0$).
:::

::: proof
The inductor current starts each period at zero. During $DT_s$ it rises to $i_{pk} = (V_g - V)DT_s/L$; during $D_2T_s$ it falls to zero with slope $-V/L$, so $VD_2T_s/L = i_{pk}$, giving $D_2 = D(V_g - V)/V$. (This is volt-second balance, $D(V_g - V) - D_2V = 0$, since $v_L = 0$ in the third interval.) The average inductor current is the area of the triangle divided by $T_s$: $\langle i_L\rangle = \frac12i_{pk}(D + D_2)$. Charge balance on the capacitor requires $\langle i_L\rangle = V/R$:

$$
\frac{(V_g - V)DT_s}{2L}\cdot D\left(1 + \frac{V_g - V}{V}\right) = \frac VR \implies (V_g - V)V_gD^2 = \frac{2L}{RT_s}V^2 .
$$

With $M = V/V_g$ this is $KM^2 + D^2M - D^2 = 0$, whose positive root is $M = \dfrac{-D^2 + \sqrt{D^4 + 4KD^2}}{2K}$. Multiplying numerator and denominator by $D^2 + \sqrt{D^4 + 4KD^2}$ gives $M = \dfrac{4KD^2}{2K(D^2 + \sqrt{D^4 + 4KD^2})} = \dfrac{2}{1 + \sqrt{1 + 4K/D^2}}$. At the boundary $K = 1 - D$ one checks that $1 + 4(1 - D)/D^2 = (2 - D)^2/D^2$, so $M = 2/(1 + (2 - D)/D) = D$: the two modes join continuously.
:::

::: widget plot
f: if(k < 1 - x, 2/(1 + sqrt(1 + 4*k/x^2)), x); x
x: 0.01, 1
y: 0, 1.05
sliders: k=0.01:0:1:0.01
labels: M\ \text{(actual)}; M = D\ \text{(CCM)}
caption: Conversion ratio of a buck converter with a diode against duty cycle, for $K = 2L/(RT_s)$ on the slider (light load means small $K$). Where $K > 1 - D$ the converter is in continuous conduction and $M = D$ (the curves coincide); below that it is discontinuous and $M$ rises above $D$. Lower $K$ — lighter load — and the DCM region spreads to the right while the output at a given duty cycle climbs towards the input voltage. A regulator must therefore reduce $D$ sharply at light load.
:::

DCM is not a fault. Many low-power converters are designed to operate in it at all loads: the diode turns off at zero current, so it has no reverse recovery; the switch turns on at zero current; and, as we shall see in [[power-electronics/converter-control]], the inductor's state disappears from the dynamics, which simplifies control. The prices are higher peak and RMS currents for the same power, and a gain that depends on the load.

::: example A buck converter at light load {#ex-buck-dcm}
A $12\,\mathrm{V}$ buck converter with $L = 10\,\mathrm{\mu H}$ and a diode switches at $100\,\mathrm{kHz}$ with $D = 0.3$. Find the output voltage for $R = 2\,\Omega$ and for $R = 20\,\Omega$.
::: solution
$T_s = 10\,\mathrm{\mu s}$. For $R = 2\,\Omega$: $K = 2\times10^{-5}/(2\times10^{-5}) = 1.0 > 1 - D = 0.7$: CCM, and $V = 0.3\times12 = 3.6\,\mathrm{V}$.

For $R = 20\,\Omega$: $K = 0.1 < 0.7$: DCM. [[#eq-buck-dcm]] gives $M = 2/(1 + \sqrt{1 + 0.4/0.09}) = 2/(1 + 2.333) = 0.600$, so $V = 7.2\,\mathrm{V}$ — twice the CCM value. (A cycle-by-cycle simulation of the circuit with $C = 100\,\mathrm{\mu F}$ settles at $7.20\,\mathrm{V}$.) Check the intervals: $i_{pk} = (12 - 7.2)\times0.3\times10^{-5}/10^{-5} = 1.44\,\mathrm{A}$, $D_2 = 0.3\times4.8/7.2 = 0.2$, and $\langle i_L\rangle = \frac12\times1.44\times0.5 = 0.36\,\mathrm{A} = 7.2/20$, as charge balance requires. The inductor current is zero for the last half of each period.
:::
:::

## Device stresses and the choice of components

The analysis gives every number a designer needs to choose parts: the voltages each device blocks, the average and RMS currents it carries (for conduction loss, [[power-electronics/power-switches#prop-conduction-loss]]), the peak currents (for the inductor's saturation rating) and the capacitor ripple currents (for capacitor heating). For a buck converter in CCM, with ripple $\Delta i_L$:

- the switch carries $I_{out}$ (plus ripple) for $DT_s$: $I_{rms} \approx I_{out}\sqrt D$, and blocks $V_g$;
- the diode or synchronous switch carries it for $D'T_s$: $I_{avg} = D'I_{out}$, $I_{rms} \approx I_{out}\sqrt{D'}$, and blocks $V_g$;
- the output capacitor carries only the triangular ripple, $I_{C,rms} = \Delta i_L/\sqrt{12}$;
- the **input** capacitor carries the pulsed switch current minus its average, $I_{Cin,rms} \approx I_{out}\sqrt{D(1 - D)}$ — largest, at $I_{out}/2$, when $D = 0.5$.

That last point surprises many designers: in a buck converter it is the input capacitor, not the output one, that carries the large ripple current. In [[#ex-buck-design]] the output capacitors carry $1.45/\sqrt{12} = 0.42\,\mathrm{A}$ RMS but the input capacitors $5\sqrt{0.275\times0.725} = 2.23\,\mathrm{A}$ RMS.

::: algorithm Power-stage design of a buck or boost converter {#alg-design}
1. From the input range, output voltage and expected efficiency, find the duty-cycle range from $M(D)$.
2. Choose $f_s$ by the loss and size trade-off ([[power-electronics/power-switches#prop-optimum-area]]): higher $f_s$ shrinks $L$ and $C$ but raises switching loss.
3. Choose the ripple ratio $\Delta i_L/I_L$, typically $0.2$–$0.4$, at the operating point that maximises the ripple (maximum $V_g$ for a buck; for a boost, the worst case over the input range), and compute $L$.
4. Compute the peak current $I_L + \Delta i_L/2$, add margin for transients, and choose an inductor whose saturation current exceeds it ([[power-electronics/magnetics-thermal-design]]).
5. Compute $C$ from the ripple specification, then check its ESR and RMS current rating; check the input capacitor's RMS current too.
6. Choose devices from their blocking voltage (with $20$–$50\,\%$ margin for ringing), RMS and average currents; estimate conduction and switching losses and the efficiency, and iterate.
7. Check the light-load behaviour: DCM boundary (with a diode) or circulating current (synchronous).
:::

::: application Multiphase voltage regulators
A modern processor draws over $200\,\mathrm{A}$ at about $1\,\mathrm{V}$, with load steps of $100\,\mathrm{A}$ in a microsecond. Its voltage regulator is a **multiphase buck**: six to sixteen buck stages in parallel, each switching at a few hundred kilohertz, with their switching instants staggered evenly across the period (**interleaving**). Each phase carries a manageable $20$–$30\,\mathrm{A}$; the ripple currents of the phases partially cancel in the output capacitors, so the effective ripple frequency is $N$ times $f_s$; and the input capacitor's RMS current falls. The controller balances the phase currents and adds or drops phases as the load changes to keep efficiency high at light load.
:::

::: history
Switched-mode conversion predates semiconductors: vibrator power supplies of the 1930s chopped a car battery's DC with an electromechanical contact to feed a step-up transformer for valve radios. Transistor switching regulators developed in the 1960s, driven by the aerospace industry's need for efficient, light power supplies, and integrated PWM controllers such as Silicon General's SG1524 (1976) made them commonplace. At Caltech, R. D. Middlebrook and Slobodan Ćuk developed the state-space averaging method in 1976 and introduced the converter that bears Ćuk's name around the same time. The SEPIC appeared in the late 1970s. The multiphase voltage regulator became standard for microprocessors in the late 1990s as core currents climbed past tens of amperes.
:::

## Where this leads

These steady-state results are the starting point for everything that follows. [[power-electronics/isolated-converters]] inserts a transformer into the buck and buck–boost to obtain the forward and flyback converters. [[power-electronics/inverters]] uses the half-bridge — a synchronous buck whose duty cycle is modulated sinusoidally — as its basic building block. [[power-electronics/converter-control]] averages the same circuits to find how $V$ responds to changes in $D$, and closes a feedback loop around them. Inductor and capacitor sizing is completed in [[power-electronics/magnetics-thermal-design]].

::: summary
- Volt-second balance on inductors and charge balance on capacitors, with the small-ripple approximation, give a converter's DC operating point by simple algebra.
- In CCM: buck $M = D$, boost $M = 1/D'$, buck–boost $M = -D/D'$; the inductor currents are $I_{out}$, $I_{out}/D'$ and $\lvert I_{out}\rvert/D'$.
- Ripple: the buck's inductor ripple is $V D'/(Lf_s)$ peak to peak and its output ripple $\Delta i_L/(8f_sC)$; the boost's output ripple is $I_{out}D/(f_sC)$ because its output current is pulsed.
- Parasitic resistance limits the boost ratio to $\frac12\sqrt{R/R_L}$ and lowers efficiency as $D \to 1$.
- With a diode, light load causes DCM ($K = 2L/(RT_s) < K_{crit}$); the conversion ratio then rises above its CCM value and depends on the load.
- Device ratings follow from the analysis: buck switches block $V_g$, boost switches block $V$, buck–boost switches block $V_g + \lvert V\rvert$; the buck's input capacitor carries $I_{out}\sqrt{D(1 - D)}$ RMS.
:::

## Exercises

::: exercise Duty cycle of a buck converter {level=1 check="5/48"}
What duty cycle does an ideal buck converter need to produce $5\,\mathrm{V}$ from $48\,\mathrm{V}$? Give $D$ as a number.
::: solution
$D = V/V_g = 5/48 = 0.104$. Such small duty cycles (on-times of $100\,\mathrm{ns}$ at $1\,\mathrm{MHz}$) are one reason intermediate $12\,\mathrm{V}$ buses are common.
:::
:::

::: exercise Boosting a lithium cell {level=1 check="3.7/0.4"}
An ideal boost converter runs from a $3.7\,\mathrm{V}$ lithium-ion cell at $D = 0.6$. Find the output voltage in volts.
::: solution
$V = V_g/(1 - D) = 3.7/0.4 = 9.25\,\mathrm{V}$.
:::
:::

::: exercise An inverting supply {level=1 check="-8"}
An ideal buck–boost converter runs from $12\,\mathrm{V}$ at $D = 0.4$. Find the output voltage in volts.
::: solution
$V = -DV_g/D' = -0.4\times12/0.6 = -8\,\mathrm{V}$.
:::
:::

::: exercise Boost inductor {level=2 check="24*(1-24/48)*1e-5/(0.3*500/48/(24/48))"}
A boost converter delivers $500\,\mathrm{W}$ at $48\,\mathrm{V}$ from $24\,\mathrm{V}$, switching at $100\,\mathrm{kHz}$. Find the inductance (in henries) for a peak-to-peak ripple of $30\,\%$ of the inductor's DC current, and the peak inductor current.
::: solution
$D = 1 - 24/48 = 0.5$, $I_{out} = 500/48 = 10.42\,\mathrm{A}$, $I_L = I_{out}/D' = 20.83\,\mathrm{A}$ (equal to $P/V_g$). $\Delta i_L = 6.25\,\mathrm{A}$, so $L = V_gDT_s/\Delta i_L = 24\times0.5\times10^{-5}/6.25 = 19.2\,\mathrm{\mu H}$. Peak current $20.83 + 3.13 = 23.96\,\mathrm{A}$.
:::
:::

::: exercise Buck output capacitor {level=2 check="5*(1-5/12)/(1e-5*1e6)/(8*1e6*0.005)"}
A buck converter from $12\,\mathrm{V}$ to $5\,\mathrm{V}$ at $1\,\mathrm{MHz}$ uses $L = 10\,\mathrm{\mu H}$. Find the inductor ripple and the output capacitance, in farads, that gives $5\,\mathrm{mV}$ peak-to-peak output ripple (ignoring ESR).
::: solution
$D = 5/12 = 0.417$. $\Delta i_L = V(1 - D)/(Lf_s) = 5\times0.583/(10^{-5}\times10^6) = 0.292\,\mathrm{A}$. $C = \Delta i_L/(8f_s\Delta v) = 0.292/(8\times10^6\times0.005) = 7.3\,\mathrm{\mu F}$.
:::
:::

::: exercise The DCM boundary {level=2 check="0.5*10*1e-5/2"}
A buck converter from $24\,\mathrm{V}$ to $12\,\mathrm{V}$ with a diode switches at $100\,\mathrm{kHz}$. What is the minimum inductance (in henries) that keeps it in CCM down to a load of $10\,\Omega$?
::: solution
CCM requires $2L/(RT_s) > 1 - D = 0.5$, so $L > 0.5RT_s/2 = 0.5\times10\times10^{-5}/2 = 25\,\mathrm{\mu H}$. Check: with $25\,\mathrm{\mu H}$, $\Delta i_L = 12\times0.5\times10^{-5}/(25\times10^{-6}) = 2.4\,\mathrm{A}$, half of which equals the load current $1.2\,\mathrm{A}$.
:::
:::

::: exercise A diode drop in a boost converter {level=2 check="5/0.4 - 0.5"}
A boost converter runs from $5\,\mathrm{V}$ at $D = 0.6$ with an ideal switch and inductor but a diode of constant forward drop $V_D = 0.5\,\mathrm{V}$. Use volt-second balance to find the output voltage in volts and the efficiency.
::: solution
$DV_g + D'(V_g - V - V_D) = 0$ gives $V = V_g/D' - V_D = 12.5 - 0.5 = 12.0\,\mathrm{V}$. All the inductor current passes through the diode while delivering power, so $\eta = V/(V + V_D) = 12/12.5 = 96\,\%$; equivalently, the output power is $VI_{out}$ and the diode loss $V_DI_{out}$.
:::
:::

::: exercise A buck converter for a wide input range {level=3 check="(16-5)*(5/16)*2.5e-6/0.6"}
A $5\,\mathrm{V}$, $2\,\mathrm{A}$ buck converter must run from an input of $9$–$16\,\mathrm{V}$ at $400\,\mathrm{kHz}$ with a peak-to-peak inductor ripple no greater than $0.6\,\mathrm{A}$ anywhere in the range. At which input voltage is the ripple greatest? Find the required inductance in henries and the input capacitor's worst-case RMS current.
::: hint
Write $\Delta i_L = V(1 - V/V_g)/(Lf_s)$.
:::
::: solution
$\Delta i_L = V(1 - D)/(Lf_s)$ with $D = V/V_g$ grows as $V_g$ grows, so the worst case is $16\,\mathrm{V}$, where $D = 0.3125$. $L \ge (16 - 5)\times0.3125\times2.5\,\mathrm{\mu s}/0.6 = 14.3\,\mathrm{\mu H}$; use $15\,\mathrm{\mu H}$. The input capacitor current $I_{out}\sqrt{D(1 - D)}$ is largest when $D$ is closest to $0.5$, i.e. at $V_g = 9\,\mathrm{V}$, $D = 0.556$: $2\sqrt{0.556\times0.444} = 0.99\,\mathrm{A}$ RMS.
:::
:::

::: exercise Boost converter in DCM {level=3}
Derive the DCM conversion ratio of the boost converter, $M = \dfrac{1 + \sqrt{1 + 4D^2/K}}{2}$, and show that it meets the CCM ratio $1/D'$ at $K = D(1 - D)^2$.
::: hint
In DCM the inductor current rises to $i_{pk} = V_gDT_s/L$, falls to zero in $D_2T_s$, and the diode current — the inductor current during $D_2T_s$ only — must average to $V/R$.
:::
::: solution
Volt-second balance: $DV_g + D_2(V_g - V) = 0$, so $D_2 = DV_g/(V - V_g)$. The diode current averages $\frac12i_{pk}D_2 = \frac{V_gDT_s}{2L}\cdot\frac{DV_g}{V - V_g}$, and charge balance sets this equal to $V/R$: $\frac{D^2V_g^2}{V - V_g} = \frac{2L}{RT_s}V = KV$. With $M = V/V_g$: $D^2 = KM(M - 1)$, i.e. $M^2 - M - D^2/K = 0$, whose positive root is $M = \frac12\left(1 + \sqrt{1 + 4D^2/K}\right)$. At $K = DD'^2$: $1 + 4D^2/(DD'^2) = 1 + 4D/D'^2 = (D'^2 + 4D)/D'^2 = (1 + D)^2/D'^2$ (since $D'^2 + 4D = 1 - 2D + D^2 + 4D = (1 + D)^2$). Then $M = \frac12\left(1 + \frac{1 + D}{D'}\right) = \frac{D' + 1 + D}{2D'} = \frac1{D'}$.
:::
:::

::: exercise The Ćuk converter {level=3}
The Ćuk converter has an input inductor $L_1$ from $V_g$ to node $a$, a switch from $a$ to ground, a capacitor $C_1$ from $a$ to node $b$, a diode from $b$ to ground (anode at $b$), an output inductor $L_2$ from $b$ to the output, and the output capacitor and load. With the switch on, node $a$ is grounded; with it off, node $b$ is grounded through the diode. Using volt-second balance on both inductors, show that $V_{C1} = V_g - V$ and $V/V_g = -D/D'$.
::: solution
Let $V_{C1} = v_a - v_b$ be the (almost constant) voltage on $C_1$. Switch on: $v_a = 0$, $v_b = -V_{C1}$; $v_{L1} = V_g$, $v_{L2} = v_b - V = -V_{C1} - V$. Switch off: $v_b = 0$, $v_a = V_{C1}$; $v_{L1} = V_g - V_{C1}$, $v_{L2} = -V$. Balance on $L_1$: $DV_g + D'(V_g - V_{C1}) = 0$, so $V_{C1} = V_g/D'$. Balance on $L_2$: $D(-V_{C1} - V) + D'(-V) = 0$, so $V = -DV_{C1} = -DV_g/D'$. Then $V_g - V = V_g(1 + D/D') = V_g/D' = V_{C1}$. The capacitor $C_1$ carries all the transferred energy, and with both inductors in series with the ports, input and output currents are continuous.
:::
:::
