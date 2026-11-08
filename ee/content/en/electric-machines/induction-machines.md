The three-phase **induction motor** is the workhorse of industry. It drives pumps, fans, compressors, conveyors, mills and machine tools, from fractional-kilowatt units to machines of tens of megawatts, and electric motors as a whole, most of them induction motors, consume roughly half of all the electricity generated. Its great virtue is simplicity: the common **squirrel-cage** rotor is nothing but a laminated iron cylinder with aluminium or copper bars cast into its slots and shorted by end rings. There are no brushes, no slip rings, no magnets and no electrical connection to the rotor at all. Energy reaches it purely by induction across the air gap, as in a transformer whose secondary is free to turn.

This chapter develops the theory of the induction machine from the rotating field of [[electric-machines/rotating-magnetic-fields]] and the transformer of [[electric-machines/transformers]]. We define **slip**, show why the rotor currents produce torque at any speed except synchronous, and derive the per-phase **equivalent circuit**. From it we obtain the power flow and the **torque–speed characteristic**, with its maximum (breakdown) torque, and learn to measure the parameters with the no-load and blocked-rotor tests. We then look at the practical questions of starting, speed control by variable frequency, and operation as a generator.

## Slip and rotor frequency

The stator of an induction machine is identical to that of a synchronous machine: a three-phase distributed winding producing a field that rotates at synchronous speed $n_s = 120f/P$. Suppose the rotor turns at $n$ in the same direction. Relative to the rotor, the field slips backwards at $n_s - n$, and it is this relative motion that induces voltages in the rotor conductors.

::: definition Slip {#def-slip}
The **slip** of an induction machine is the speed of the rotating field relative to the rotor, as a fraction of synchronous speed:

$$
s = \frac{n_s - n}{n_s} = \frac{\omega_s - \omega_m}{\omega_s},\qquad n = (1 - s)n_s.
$$ {#eq-slip}

Slip is $1$ at standstill, $0$ at synchronous speed, positive when the machine runs below synchronous speed (motoring), negative above it (generating) and greater than $1$ when the rotor is driven against the field (plugging, or braking).
:::

Because the field passes the rotor conductors at $s$ times the speed at which it passes the stator conductors, the **rotor frequency** is $f_r = sf$, and the emf induced in a rotor phase is $s$ times its standstill value. A four-pole $50\,\mathrm{Hz}$ motor running at $1455\,\mathrm{r/min}$ has $s = 0.03$ and rotor currents at only $1.5\,\mathrm{Hz}$. Full-load slips are typically $1$ to $5\,\%$, smaller in large machines.

Remarkably, the rotor currents at frequency $sf$, flowing in a rotor that turns at $(1 - s)n_s$, produce a rotor mmf wave that rotates relative to the rotor at $sn_s$ (by [[electric-machines/rotating-magnetic-fields#thm-rotating-field]] applied to the rotor winding), and therefore relative to the stator at $(1 - s)n_s + sn_s = n_s$. **Stator and rotor fields always rotate together**, whatever the speed, so the condition for steady torque of [[electric-machines/rotating-magnetic-fields#thm-torque-waves]] is met automatically. Only at $s = 0$ does the induction fail: no relative motion, no rotor current, no torque. An induction motor cannot reach synchronous speed on its own.

## The equivalent circuit

### The rotor circuit

Let $E_2$ be the rms emf per phase induced in the rotor at standstill, $R_2$ the rotor resistance per phase and $X_2 = 2\pi fL_2$ the rotor leakage reactance per phase at **stator** frequency. At slip $s$ the emf is $sE_2$ and the leakage reactance is $sX_2$, because the rotor frequency is $sf$. The rotor current is therefore

$$
\mathbf I_2 = \frac{s\mathbf E_2}{R_2 + jsX_2} = \frac{\mathbf E_2}{R_2/s + jX_2}.
$$ {#eq-rotor-current}

The second form is the key step. Dividing numerator and denominator by $s$ does not change the current, but it describes it as the current of a circuit at **stator frequency**, driven by the standstill emf $\mathbf E_2$, with a speed-dependent resistance $R_2/s$. In this form the rotor can be connected to the stator through an ideal transformer, exactly as a transformer secondary.

::: theorem Per-phase equivalent circuit {#thm-equivalent-circuit}
Referred to the stator, an induction machine in balanced steady state is represented per phase by: the stator resistance $R_1$ and leakage reactance $X_1$ in series from the terminal voltage $\mathbf V_1$ to an internal node at the air-gap voltage $\mathbf E_1$; from that node to neutral, the magnetising reactance $X_m$ (in parallel, if wanted, with a core-loss resistance $R_c$); and also from that node to neutral, the referred rotor branch $jX_2' + R_2'/s$. The rotor resistance may be split as

$$
\frac{R_2'}{s} = R_2' + R_2'\frac{1 - s}{s},
$$ {#eq-split}

where $R_2'$ represents rotor copper loss and $R_2'(1 - s)/s$ represents the power converted to mechanical form.
:::

::: proof
The stator winding sees the gap flux, which induces $\mathbf E_1$ per phase; the stator's own resistance and leakage flux give $\mathbf V_1 = \mathbf E_1 + (R_1 + jX_1)\mathbf I_1$, as for a transformer primary. The gap flux requires a magnetising mmf, supplied by a component $\mathbf I_m = \mathbf E_1/(jX_m)$ of the stator current, and the rest of the stator current balances the mmf of the rotor currents, exactly as the load component of a transformer's primary current balances the secondary's mmf. With an effective turns ratio $a$ between stator and rotor phases (including winding factors), $\mathbf E_1 = a\mathbf E_2$ and the referred rotor current is $\mathbf I_2' = \mathbf I_2/a$. By [[#eq-rotor-current]] the rotor is a stator-frequency circuit $R_2/s + jX_2$ driven by $\mathbf E_2$; referring it through $a$ gives $R_2'/s + jX_2'$ with $R_2' = a^2R_2$, $X_2' = a^2X_2$ across $\mathbf E_1$. The split [[#eq-split]] is an identity; its interpretation follows from the power flow below.
:::

For a squirrel-cage rotor, $a$ and $R_2$ cannot be measured separately; only the referred values $R_2'$ and $X_2'$ appear, and they are what the tests measure. In what follows we drop the primes. Compared with a transformer, the magnetising reactance is small (the air gap) and the leakage reactances are large (the gap and the slots), so the shunt branch cannot be moved to the terminals without noticeable error; for accurate work we keep the exact circuit, and use a **Thévenin equivalent** of the stator side when we want simple formulas.

### Power flow

Follow the power from the terminals to the shaft. With three phases, $\mathbf I_1$ the stator current and $\mathbf I_2$ the referred rotor current:

- input $P_{\text{in}} = 3V_1I_1\cos\varphi$;
- stator copper loss $P_{\text{cu1}} = 3I_1^2R_1$, and core loss (often lumped with the rotational losses);
- the rest crosses the gap: the **air-gap power** $P_{\text{ag}} = 3I_2^2R_2/s$.

::: theorem Power split and torque {#thm-power-split}
The air-gap power divides in the fixed ratio $s : (1 - s)$ between rotor copper loss and mechanical power:

$$
P_{\text{cu2}} = 3I_2^2R_2 = sP_{\text{ag}},\qquad P_{\text{conv}} = 3I_2^2R_2\frac{1 - s}{s} = (1 - s)P_{\text{ag}},
$$ {#eq-power-split}

and the electromagnetic torque is

$$
T_{\text{ind}} = \frac{P_{\text{conv}}}{\omega_m} = \frac{P_{\text{ag}}}{\omega_s}.
$$ {#eq-torque-pag}

The shaft output is $P_{\text{out}} = P_{\text{conv}} - P_{\text{rot}}$, where $P_{\text{rot}}$ is the friction, windage and (if not separately included) core loss.
:::

::: proof
The power dissipated in the referred rotor branch is $3I_2^2R_2/s$. The rotor winding has actual resistance $R_2$ (referred), so the actual rotor copper loss is $3I_2^2R_2 = s\cdot3I_2^2R_2/s = sP_{\text{ag}}$. Energy conservation leaves $P_{\text{ag}} - P_{\text{cu2}} = (1 - s)P_{\text{ag}}$ for conversion, the power in $R_2(1 - s)/s$. The torque is the converted power divided by the mechanical speed, $\omega_m = (1 - s)\omega_s$, which gives $P_{\text{ag}}/\omega_s$. Equivalently, the torque acts on the rotating field, which carries the air-gap power at speed $\omega_s$.
:::

The ratio $s : (1 - s)$ is the induction machine's fundamental efficiency limit: a motor running at $3\,\%$ slip loses $3\,\%$ of its air-gap power in the rotor, and one running at half speed loses half. Running an induction motor at low speed by high slip is therefore wasteful; efficient speed control changes the synchronous speed instead.

::: warning Which power, which speed
Three powers appear in the induction motor, and each pairs with a different quantity. Air-gap power divided by **synchronous** speed gives torque; converted power divided by **rotor** speed gives the same torque; output power is converted power minus rotational losses, and output torque is output power over rotor speed. Do not divide the air-gap power by the rotor speed, and do not forget that $R_2/s$ includes the load: the "resistance" $R_2(1 - s)/s$ is where the mechanical work goes, not a physical resistor.
:::

::: example Performance of a 20 kW motor {#ex-performance}
A three-phase, $400\,\mathrm V$, $50\,\mathrm{Hz}$, four-pole, star-connected induction motor has per-phase parameters $R_1 = 0.25\,\Omega$, $X_1 = 0.6\,\Omega$, $R_2 = 0.2\,\Omega$, $X_2 = 0.6\,\Omega$ and $X_m = 20\,\Omega$ (referred to the stator; core loss included with rotational losses of $400\,\mathrm W$). At a slip of $3\,\%$, find the speed, stator current, power factor, torque, output power and efficiency.
::: solution
Phase voltage $V_1 = 400/\sqrt3 = 230.9\,\mathrm V$. Speed $n = 0.97\times1500 = 1455\,\mathrm{r/min}$.

Rotor branch: $R_2/s + jX_2 = 6.667 + j0.6\,\Omega$. In parallel with $j20\,\Omega$:

$$
Z_p = \frac{j20(6.667 + j0.6)}{6.667 + j20.6} = 5.688 + j2.423\,\Omega.
$$

Input impedance $Z_{\text{in}} = 0.25 + j0.6 + Z_p = 5.938 + j3.023 = 6.664\angle 26.98^\circ\,\Omega$, so

$$
\mathbf I_1 = \frac{230.9}{6.664\angle 26.98^\circ} = 34.66\angle -26.98^\circ\,\mathrm A,\qquad \cos\varphi = 0.891\ \text{lagging}.
$$

The air-gap voltage is $\mathbf E_1 = \mathbf V_1 - (0.25 + j0.6)\mathbf I_1$, and the rotor current $\mathbf I_2 = \mathbf E_1/(6.667 + j0.6) = 32.01\angle -9.05^\circ\,\mathrm A$.

Powers: $P_{\text{in}} = 3\times230.9\times34.66\times0.891 = 21.40\,\mathrm{kW}$; $P_{\text{cu1}} = 3\times34.66^2\times0.25 = 901\,\mathrm W$; $P_{\text{ag}} = 3\times32.01^2\times6.667 = 20.50\,\mathrm{kW}$ (and indeed $21.40 - 0.90 = 20.50$); $P_{\text{cu2}} = 0.03\times20.50 = 615\,\mathrm W$; $P_{\text{conv}} = 19.88\,\mathrm{kW}$; $P_{\text{out}} = 19.48\,\mathrm{kW}$.

Torque: $T_{\text{ind}} = P_{\text{ag}}/\omega_s = 20\,497/157.1 = 130.5\,\mathrm{N\,m}$; shaft torque $19\,482/152.4 = 127.9\,\mathrm{N\,m}$. Efficiency $19.48/21.40 = 91.0\,\%$.
:::
:::

## The torque–speed characteristic

To see how torque depends on slip, replace everything to the left of the rotor branch by its Thévenin equivalent: the open-circuit voltage at the gap node and the impedance seen looking back into the stator,

$$
\mathbf V_{\text{th}} = \mathbf V_1\frac{jX_m}{R_1 + j(X_1 + X_m)},\qquad Z_{\text{th}} = R_{\text{th}} + jX_{\text{th}} = \frac{jX_m(R_1 + jX_1)}{R_1 + j(X_1 + X_m)}.
$$ {#eq-thevenin}

Then $I_2 = V_{\text{th}}/\abs{Z_{\text{th}} + R_2/s + jX_2}$ and, by [[#eq-torque-pag]],

$$
T_{\text{ind}}(s) = \frac{3V_{\text{th}}^2\,R_2/s}{\omega_s\left[(R_{\text{th}} + R_2/s)^2 + (X_{\text{th}} + X_2)^2\right]}.
$$ {#eq-torque-slip}

At small slip, $R_2/s$ dominates the denominator and $T\approx3V_{\text{th}}^2s/(\omega_sR_2)$: torque is **proportional to slip**, so the speed falls almost linearly with load, like a shunt DC motor. At large slip the reactance dominates and $T\approx3V_{\text{th}}^2R_2/(\omega_ss(X_{\text{th}} + X_2)^2)$, falling as $1/s$. In between lies a maximum.

::: theorem Maximum (breakdown) torque {#thm-max-torque}
The induced torque [[#eq-torque-slip]] is greatest at the slip

$$
s_{\max} = \frac{R_2}{\sqrt{R_{\text{th}}^2 + (X_{\text{th}} + X_2)^2}},
$$ {#eq-smax}

and its maximum value is

$$
T_{\max} = \frac{3V_{\text{th}}^2}{2\omega_s\left[R_{\text{th}} + \sqrt{R_{\text{th}}^2 + (X_{\text{th}} + X_2)^2}\right]},
$$ {#eq-tmax}

which does **not** depend on the rotor resistance $R_2$. Raising $R_2$ moves the maximum to a higher slip (lower speed) without changing its height.
:::

::: proof
Torque is proportional to the power delivered to the variable resistor $R = R_2/s$ by a source $V_{\text{th}}$ through the fixed impedance $R_{\text{th}} + j(X_{\text{th}} + X_2)$. By the maximum power transfer theorem for a variable **resistive** load ([[circuits-2/ac-power]]), that power is greatest when $R$ equals the magnitude of the source impedance: $R_2/s = \sqrt{R_{\text{th}}^2 + (X_{\text{th}} + X_2)^2}$, which gives [[#eq-smax]]. Writing $Z = \sqrt{R_{\text{th}}^2 + (X_{\text{th}} + X_2)^2}$ and substituting $R_2/s = Z$, the denominator becomes $(R_{\text{th}} + Z)^2 + (Z^2 - R_{\text{th}}^2) = 2Z(R_{\text{th}} + Z)$, so $T_{\max} = 3V_{\text{th}}^2Z/(\omega_s\,2Z(R_{\text{th}} + Z))$, which is [[#eq-tmax]]. $R_2$ has cancelled.
:::

::: widget plot
f: 3*(k*224.2)^2*(R2*1500/(1500 - x))/(157.08*((0.2356 + R2*1500/(1500 - x))^2 + 1.1854^2))
x: -300, 1800
y: -500, 400
sliders: R2=0.2:0.05:2:0.01; k=1:0.5:1.1:0.01
hlines: 0
vlines: 1500
caption: Torque in N·m against rotor speed in r/min for the 20 kW motor of the performance example (Thévenin values $V_{\text{th}} = 224.2\,\mathrm V$, $R_{\text{th}} = 0.236\,\Omega$, $X_{\text{th}} + X_2 = 1.185\,\Omega$), with rotor resistance $R_2$ in ohms and supply voltage fraction $k$. Below $0$ r/min the machine brakes (plugging); between $0$ and synchronous speed it motors; above $1500\,\mathrm{r/min}$ it generates, with negative torque. Increase $R_2$: the peak keeps its height but moves to lower speed, raising the starting torque. Reduce $k$: the whole curve shrinks as $k^2$.
:::

The curve has three regions. Between no load and breakdown, the **normal operating region**, the speed is nearly constant and torque proportional to slip; operation is stable, because a small increase in load slows the motor and raises its torque. Beyond the breakdown slip, torque falls as slip rises, so a load exceeding $T_{\max}$ stalls the motor. Breakdown torque is typically $2$ to $3$ times rated torque, which gives a margin for overloads and voltage dips; but since $T_{\max}\propto V^2$, a $20\,\%$ voltage dip cuts it by $36\,\%$.

::: example Breakdown and starting torque {#ex-breakdown}
For the motor of [[#ex-performance]], find the breakdown torque and the speed at which it occurs, and the starting current and torque at rated voltage.
::: solution
Thévenin: $\mathbf V_{\text{th}} = 230.9\times j20/(0.25 + j20.6)$, magnitude $224.2\,\mathrm V$; $Z_{\text{th}} = 0.236 + j0.585\,\Omega$. With $X_{\text{th}} + X_2 = 1.185\,\Omega$, $\sqrt{0.236^2 + 1.185^2} = 1.209\,\Omega$, so

$$
s_{\max} = \frac{0.2}{1.209} = 0.165,\qquad n = 0.835\times1500 = 1252\,\mathrm{r/min},
$$

$$
T_{\max} = \frac{3\times224.2^2}{2\times157.08\times(0.236 + 1.209)} = 332\,\mathrm{N\,m},
$$

$2.5$ times the full-load torque of $130\,\mathrm{N\,m}$.

At start, $s = 1$: the rotor branch is $0.2 + j0.6\,\Omega$, the input impedance is $0.25 + j0.6 + (j20\parallel(0.2 + j0.6)) = 0.44 + j1.18\,\Omega$, and the starting current is $182.9\,\mathrm A$, $5.3$ times the full-load current. The starting torque, $3I_2^2R_2/\omega_s$, is $120\,\mathrm{N\,m}$, only $0.92$ times full-load torque. This motor could start a fan (whose torque is small at low speed) but might struggle with a fully loaded conveyor.
:::
:::

::: quiz
The rotor resistance of an induction motor is doubled (for example by using a higher-resistance alloy in the cage). Which statement is true?
- [ ] The breakdown torque doubles
- [ ] The full-load slip is unchanged
- [x] The breakdown slip doubles, the breakdown torque is unchanged and the full-load slip roughly doubles
- [ ] The starting current doubles
::: solution
By [[#eq-smax]] $s_{\max}\propto R_2$, and by [[#eq-tmax]] $T_{\max}$ does not depend on $R_2$. In the linear region $T\approx3V^2s/(\omega_sR_2)$, so the same torque needs twice the slip, and the rotor copper loss $sP_{\text{ag}}$ doubles too. The starting current falls a little, because the starting impedance rises. High-resistance (NEMA design D) rotors are used for high-inertia loads such as punch presses, accepting the extra loss.
:::
:::

## Measuring the parameters

The parameters are found from tests analogous to the open- and short-circuit tests of a transformer.

::: algorithm No-load, blocked-rotor and DC tests {#alg-im-tests}
1. **DC test.** Measure the DC resistance between two stator terminals; for a star connection $R_1$ is half of it (with a small correction for AC skin effect).
2. **No-load test.** Run the motor uncoupled at rated voltage and frequency. The slip is nearly zero, so $R_2/s$ is very large and the rotor branch is effectively open. Measure $V$, $I_{\text{nl}}$ and $P_{\text{nl}}$ per phase. Then $X_1 + X_m \approx V/I_{\text{nl}}$, and $P_{\text{nl}} - 3I_{\text{nl}}^2R_1$ is the rotational loss (friction, windage and core loss).
3. **Blocked-rotor test.** Lock the rotor and apply a reduced voltage that drives rated current, ideally at reduced frequency (about $25\,\%$ of rated) so that the rotor current has a realistic frequency. With $s = 1$ the rotor branch has a much smaller impedance than $X_m$, so the circuit is approximately the series impedance. Measure $V_{\text{br}}$, $I_{\text{br}}$, $P_{\text{br}}$ per phase: $R_1 + R_2 = P_{\text{br}}/I_{\text{br}}^2$, $X_1 + X_2 = \sqrt{(V_{\text{br}}/I_{\text{br}})^2 - (R_1 + R_2)^2}$, scaled to rated frequency.
4. **Split the reactance**, usually equally ($X_1 = X_2$) for general-purpose designs, as recommended by the IEEE test procedure for each design class; then $X_m = V/I_{\text{nl}} - X_1$ and $R_2 = (R_1 + R_2) - R_1$.
:::

## Starting

A cage motor connected directly to the supply (**direct-on-line**, DOL) draws five to eight times rated current until it approaches full speed. For small motors on a stiff supply this is acceptable, and it is the cheapest method. Larger motors, or weak supplies, need the inrush reduced so that the voltage dip does not disturb other loads.

- **Star–delta starting.** A motor designed to run in delta is started in star. Each phase then receives $1/\sqrt3$ of its rated voltage, so its current falls by $\sqrt3$; the line current, which in delta would have been $\sqrt3$ times the phase current, falls by a factor of $3$ altogether. Torque falls with $V^2$, also by $3$.
- **Autotransformer starting** applies a fraction $x$ of rated voltage; line current and torque both fall by $x^2$.
- **Soft starters** use back-to-back thyristors to ramp the voltage, and **variable-frequency drives** start at low frequency with rated current and full torque, the best but most expensive method.
- **Wound-rotor motors** have a three-phase rotor winding brought out through slip rings, so that external resistance can be added. By [[#thm-max-torque]], extra rotor resistance raises the starting torque, up to $T_{\max}$, while reducing the starting current.

::: example Rotor resistance for maximum starting torque {#ex-wound-rotor}
A wound-rotor version of the motor of [[#ex-performance]] has the same parameters, with a stator-to-rotor effective turns ratio of $2$. What external resistance per rotor phase gives maximum torque at standstill? What are the starting torque and current then?
::: solution
For $s_{\max} = 1$ the total referred rotor resistance must be $\sqrt{R_{\text{th}}^2 + (X_{\text{th}} + X_2)^2} = 1.209\,\Omega$, so the referred external resistance is $1.209 - 0.2 = 1.009\,\Omega$. Referred back to the rotor through $a^2 = 4$: $1.009/4 = 0.252\,\Omega$ per rotor phase.

The starting torque is then $T_{\max} = 332\,\mathrm{N\,m}$, $2.8$ times the cage value of [[#ex-breakdown]]. With $R_2 = 1.209\,\Omega$ the starting input impedance is $0.25 + j0.6 + j20\parallel(1.209 + j0.6) = 1.39 + j1.24\,\Omega$, so the starting current falls to about $124\,\mathrm A$ from $183\,\mathrm A$. As the motor accelerates the resistance is cut out in steps, as for a DC starter, to keep the torque near its peak. Wound-rotor motors were the standard drive for cranes, hoists and mills before variable-frequency drives.
:::
:::

## Speed control

The speed of an induction motor is $n = (1 - s)\,120f/P$. The slip can be varied (by voltage or rotor resistance), but since rotor loss is $s$ times air-gap power this is inefficient except over a small range. The efficient methods change $n_s$: **pole changing** (special stator windings that can be reconnected for, say, $4$ or $8$ poles, giving two fixed speeds) and, overwhelmingly today, **variable frequency** from an inverter ([[power-electronics]]).

::: theorem Constant volts per hertz {#thm-v-over-f}
If the stator resistance is negligible, an induction motor supplied at frequency $f = kf_{\text{rated}}$ with voltage $V = kV_{\text{rated}}$ (constant $V/f$) has the same air-gap flux, the same maximum torque, and the same **slip speed** $n_s - n$ at a given torque as at rated frequency. Its torque–speed curve is the rated curve shifted along the speed axis.
:::

::: proof
The gap flux is set by $E_1/f$ ([[electric-machines/rotating-magnetic-fields#thm-ac-emf]]), which with $R_1 = 0$ and a small leakage drop is close to $V/f$, a constant. At frequency $kf_{\text{rated}}$ every reactance is $k$ times its rated value. Describe the operating point by the slip angular speed $\omega_{\text{sl}} = s\,k\omega_{e}$, where $\omega_e$ is the rated electrical frequency. Then $R_2/s = kR_2\omega_e/\omega_{\text{sl}}$, so the rotor branch $R_2/s + jkX_2 = k(R_2\omega_e/\omega_{\text{sl}} + jX_2)$ is $k$ times the rated-frequency rotor branch at the **same slip speed**. With $R_1 = 0$, every impedance of the circuit is thus scaled by $k$, and with the voltage also scaled by $k$ all currents are unchanged. The air-gap power $3I_2^2R_2/s$ is then $k$ times its rated-frequency value, and so is $\omega_s$, so $T = P_{\text{ag}}/\omega_s$ is unchanged: the same torque occurs at the same slip speed, and the maximum torque is the same.
:::

In practice the stator resistance is not negligible at low frequency, where the reactances have shrunk but $R_1$ has not; the gap flux and maximum torque then fall, and drives add a **voltage boost** at low frequency to compensate. Above rated frequency the voltage cannot rise further, so the flux falls as $1/f$: the **field-weakening** region of constant power, exactly as for a DC motor ([[electric-machines/dc-machines]]).

::: widget plot
f: 3*(k*224.2)^2*(0.2*1500*k/(1500*k - x))/(157.08*k*((0.2356 + 0.2*1500*k/(1500*k - x))^2 + (1.1854*k)^2))
x: 0, 1800
y: 0, 400
sliders: k=1:0.2:1.2:0.01
caption: Torque (N·m) against speed (r/min) for the 20 kW motor under constant-$V/f$ control, with frequency $f = 50k\,\mathrm{Hz}$ and voltage scaled by the same factor $k$ (up to $1$; above $k = 1$ the formula still scales $V$, so treat that range as illustrative). Move $k$: the curve slides along the speed axis with nearly the same shape and the same slope near synchronous speed. At low frequencies the peak torque shrinks, because the stator resistance becomes significant compared with the reduced reactances; that is why drives boost the voltage at low speed.
:::

::: example Running at 30 Hz {#ex-vf}
The motor of [[#ex-performance]] is supplied from an inverter at $30\,\mathrm{Hz}$ and $240\,\mathrm V$ (line), keeping $V/f$ constant. It drives a constant-torque load of $130.5\,\mathrm{N\,m}$ (the torque at $3\,\%$ slip on $50\,\mathrm{Hz}$). Find the speed, and compare the maximum torque with its $50\,\mathrm{Hz}$ value.
::: solution
At $30\,\mathrm{Hz}$ the synchronous speed is $900\,\mathrm{r/min}$, the reactances are $0.6\times0.6 = 0.36\,\Omega$ (leakage) and $12\,\Omega$ (magnetising), and $\omega_s = 94.25\,\mathrm{rad/s}$. Solving [[#eq-torque-slip]] numerically (or the exact circuit) for the slip that gives $130.5\,\mathrm{N\,m}$ yields $s = 0.0527$, a slip speed of $47.5\,\mathrm{r/min}$, close to the $45\,\mathrm{r/min}$ at $50\,\mathrm{Hz}$ as [[#thm-v-over-f]] predicts. The speed is $900 - 47.5 = 852\,\mathrm{r/min}$.

The maximum torque, found by scanning the slip, is $292\,\mathrm{N\,m}$ at $30\,\mathrm{Hz}$ against $332\,\mathrm{N\,m}$ at $50\,\mathrm{Hz}$, a $12\,\%$ reduction caused by $R_1$; at $10\,\mathrm{Hz}$ it would fall to about $164\,\mathrm{N\,m}$ without boost. A modest voltage boost (a few percent of rated voltage added at low frequency) restores it.
:::
:::

## Induction generators and braking

Driven above synchronous speed, $s < 0$, the resistance $R_2/s$ becomes negative: the rotor branch delivers real power to the circuit instead of absorbing it, and the machine generates. It still draws its magnetising current from the supply, so it absorbs reactive power, and it cannot set its own frequency or voltage; it needs a grid, or capacitors to supply the magnetising current in isolated operation. At $s = -0.03$ the motor of [[#ex-performance]] delivers about $22.5\,\mathrm{kW}$ to the supply while drawing $12.5\,\mathrm{kvar}$ from it. Cage and doubly fed induction generators are widely used in wind turbines and small hydro schemes. With $s > 1$, the rotor driven backwards against the field, both the mechanical and electrical inputs are dissipated in the rotor: **plugging**, a severe but effective emergency brake.

::: application Field-oriented control
A modern drive does more than keep $V/f$ constant. By measuring or estimating the rotor flux position and transforming the stator currents into a frame rotating with it (the $dq$ transformation), it controls separately the current component that magnetises the machine and the component that produces torque, exactly as the field and armature currents of a DC machine. The induction motor then responds to torque commands within milliseconds. This **field-oriented** or **vector control** is what allowed cage motors to replace DC machines in servo drives, rolling mills, lifts and electric vehicles.
:::

::: history
Nikola Tesla's US patents for polyphase induction motors were granted in May 1888, and Galileo Ferraris published his analysis of a two-phase induction motor the same year; Ferraris concluded, from the $s : (1 - s)$ split, that such motors could never exceed $50\,\%$ efficiency, an error caused by considering only operation at the maximum-power point. Mikhail Dolivo-Dobrovolsky built the first three-phase squirrel-cage motor at AEG in 1889. Charles Proteus Steinmetz developed the equivalent-circuit analysis with complex quantities in the 1890s, set out in his books *Theory and Calculation of Alternating Current Phenomena* (1897). Felix Blaschke at Siemens introduced field-oriented control in 1971, and Isao Takahashi and Toshihiko Noguchi (1986) and Manfred Depenbrock (1985–1988) introduced direct torque control.
:::

## Where this leads

The induction motor's equivalent circuit is the basis for motor selection and drive design throughout industry. Inverters that supply it at variable frequency, and the space-vector modulation they use, are designed in [[power-electronics]]; the dynamic $dq$ model behind field-oriented control is developed in graduate machines courses (see Krause et al. in the course references). In [[power-systems]] induction motors are a large part of the load, and their drop in torque at low voltage contributes to voltage instability. The next chapter, [[electric-machines/synchronous-machines]], takes the opposite approach to rotor excitation: a DC-fed rotor that turns at exactly synchronous speed, generating almost all the world's electricity.

::: summary
- Slip $s = (n_s - n)/n_s$; rotor currents have frequency $sf$, and their field rotates at synchronous speed relative to the stator at every speed, so torque is produced except at $s = 0$.
- The per-phase equivalent circuit is a transformer whose secondary resistance is $R_2/s = R_2 + R_2(1 - s)/s$; the air gap makes $X_m$ small and the magnetising current large.
- $P_{\text{ag}} = 3I_2^2R_2/s$ splits as $s$ (rotor loss) to $1 - s$ (mechanical); $T = P_{\text{ag}}/\omega_s$.
- Torque is proportional to slip near synchronous speed; breakdown occurs at $s_{\max} = R_2/\abs{Z_{\text{th}} + jX_2}$, and $T_{\max}$, proportional to $V^2$, does not depend on $R_2$.
- No-load and blocked-rotor tests give the shunt and series parameters, as in a transformer.
- Starting current is $5$–$8$ times rated; star–delta reduces current and torque by $3$, rotor resistance raises starting torque up to $T_{\max}$.
- Constant $V/f$ keeps the flux, maximum torque and slip speed roughly constant, so variable frequency is the efficient way to control speed; above base frequency the machine is field-weakened.
:::

## Exercises

::: exercise Slip and rotor frequency {level=1 check="(1000-960)/1000*50"}
A six-pole, $50\,\mathrm{Hz}$ induction motor runs at $960\,\mathrm{r/min}$. Find its slip and the frequency of its rotor currents, in hertz.
::: solution
$n_s = 1000\,\mathrm{r/min}$, $s = 40/1000 = 0.04$, $f_r = sf = 2\,\mathrm{Hz}$.
:::
:::

::: exercise Rotor copper loss {level=1 check="0.04*10e3"}
The air-gap power of an induction motor running at $4\,\%$ slip is $10\,\mathrm{kW}$. Find the rotor copper loss in watts.
::: solution
$P_{\text{cu2}} = sP_{\text{ag}} = 0.04\times10\,000 = 400\,\mathrm W$; the converted power is $9.6\,\mathrm{kW}$.
:::
:::

::: exercise Torque from air-gap power {level=1 check="10e3/(2*pi*1000/60)"}
For the motor of the previous exercise (six-pole, $50\,\mathrm{Hz}$), find the induced torque in N·m.
::: solution
$T = P_{\text{ag}}/\omega_s = 10\,000/(2\pi\times1000/60) = 95.5\,\mathrm{N\,m}$.
:::
:::

::: exercise Star–delta starting {level=2 check="182.9/3"}
The motor of [[#ex-breakdown]] is wound for delta operation on $400\,\mathrm V$ (its star-equivalent parameters are as given) and draws $182.9\,\mathrm A$ from the line when started direct-on-line. Find the line current, in amperes, and the starting torque with a star–delta starter.
::: solution
Both are reduced by $3$: $I = 182.9/3 = 61.0\,\mathrm A$ and $T = 120.4/3 = 40.1\,\mathrm{N\,m}$, under a third of full-load torque. Star–delta starting is suitable only for loads that need little torque at low speed (fans, centrifugal pumps).
:::
:::

::: exercise Slip at reduced voltage {level=2}
In the linear region the torque of the motor of [[#ex-performance]] is approximately $T\approx KsV^2$ with $K$ constant. If the supply voltage falls by $10\,\%$ and the load torque is constant, estimate the new slip and the change in rotor copper loss.
::: solution
At constant torque, $sV^2$ is constant, so $s$ rises by $1/0.81 = 1.235$: from $0.030$ to $0.037$. The rotor current is roughly proportional to $sV$, i.e. it rises by $1/0.9 = 1.11$, so rotor copper loss $\propto I_2^2$ rises by about $23\,\%$. Undervoltage overheats a loaded induction motor.
:::
:::

::: exercise Parameters from tests {level=2}
A $400\,\mathrm V$, star-connected, $50\,\mathrm{Hz}$ motor gives: DC test between two lines $0.50\,\Omega$; no-load test $400\,\mathrm V$, $11.0\,\mathrm A$, $900\,\mathrm W$; blocked-rotor test at $50\,\mathrm{Hz}$, $75\,\mathrm V$ (line), $35\,\mathrm A$, $1650\,\mathrm W$. Assuming $X_1 = X_2$, find the equivalent-circuit parameters and the rotational losses.
::: solution
$R_1 = 0.50/2 = 0.25\,\Omega$. No load: per phase $V = 230.9\,\mathrm V$, $X_1 + X_m \approx 230.9/11.0 = 21.0\,\Omega$; rotational loss $900 - 3\times11^2\times0.25 = 809\,\mathrm W$. Blocked rotor: per phase $43.3\,\mathrm V$, $\abs Z = 43.3/35 = 1.237\,\Omega$, $R_1 + R_2 = 1650/(3\times35^2) = 0.449\,\Omega$, so $R_2 = 0.199\,\Omega$; $X_1 + X_2 = \sqrt{1.237^2 - 0.449^2} = 1.153\,\Omega$, so $X_1 = X_2 = 0.576\,\Omega$ and $X_m = 21.0 - 0.58 = 20.4\,\Omega$. These are close to the values of [[#ex-performance]].
:::
:::

::: exercise Induction generator for a small hydro scheme {level=3}
The motor of [[#ex-performance]] is driven by a water turbine at $1545\,\mathrm{r/min}$ while connected to the $400\,\mathrm V$, $50\,\mathrm{Hz}$ grid. Find the slip, the real and reactive power exchanged with the grid, and the capacitance per phase (star-connected) that would supply the reactive power.
::: hint
Use the exact circuit with $s = -0.03$; $R_2/s = -6.667\,\Omega$.
:::
::: solution
$s = (1500 - 1545)/1500 = -0.03$. The rotor branch is $-6.667 + j0.6\,\Omega$; in parallel with $j20$ it gives $Z_p$, and $Z_{\text{in}} = 0.25 + j0.6 + Z_p$. Computing, $\mathbf I_1$ and $\mathbf S = 3\mathbf V_1\mathbf I_1^* = -22.5\,\mathrm{kW} + j12.5\,\mathrm{kvar}$: the machine delivers $22.5\,\mathrm{kW}$ to the grid and absorbs $12.5\,\mathrm{kvar}$. Capacitors supplying $12.5\,\mathrm{kvar}$ in star need $Q = 3V_{\text{ph}}^2\omega C$: $C = 12\,500/(3\times230.9^2\times314.2) = 249\,\mathrm{\mu F}$ per phase. The air-gap power is $-23.5\,\mathrm{kW}$, of which the stator copper loss takes about $1\,\mathrm{kW}$; the turbine must supply $\abs{P_{\text{conv}}} = (1 - s)\abs{P_{\text{ag}}} = 1.03\times23.5 = 24.2\,\mathrm{kW}$ plus the rotational losses. The difference between $24.2\,\mathrm{kW}$ in and $22.5\,\mathrm{kW}$ out is the rotor copper loss ($0.7\,\mathrm{kW}$) and the stator copper loss ($1.0\,\mathrm{kW}$).
:::
:::

::: exercise Choosing a rotor for a starting requirement {level=3}
A cage motor with the stator and leakage parameters of [[#ex-performance]] must start a load requiring $200\,\mathrm{N\,m}$ at standstill, while its full-load slip at $130\,\mathrm{N\,m}$ must not exceed $5\,\%$. Find the range of rotor resistance $R_2$ (referred) that satisfies both requirements.
::: hint
Starting torque from [[#eq-torque-slip]] with $s = 1$ gives a quadratic inequality in $R_2$. For the full-load slip, use the same formula with the torque fixed at $130\,\mathrm{N\,m}$ and solve for $R_2$ at $s = 0.05$.
:::
::: solution
**Starting.** $T(1) = 3V_{\text{th}}^2R_2/(\omega_s[(R_{\text{th}} + R_2)^2 + 1.185^2]) \ge 200$ with $3V_{\text{th}}^2/\omega_s = 960.0$. This gives $960R_2 \ge 200[(0.236 + R_2)^2 + 1.405]$, i.e. $R_2^2 - 4.328R_2 + 1.461 \le 0$, so $0.369 \le R_2 \le 3.96\,\Omega$.

**Full load.** At $s = 0.05$, $T = 960(R_2/0.05)/[(0.236 + 20R_2)^2 + 1.405] = 130$ is satisfied by $R_2 = 0.335\,\Omega$ (bisection; the breakdown slip is then $0.28$, so $s = 0.05$ is in the normal region, where torque at a given slip falls as $R_2$ rises). For $R_2$ larger than this, the slip at $130\,\mathrm{N\,m}$ exceeds $5\,\%$.

The two requirements conflict: starting needs $R_2 \ge 0.369\,\Omega$ and running needs $R_2 \le 0.335\,\Omega$. No single-cage rotor meets both. The usual solution is a **double-cage** or **deep-bar** rotor, whose effective resistance is high at standstill (rotor frequency $50\,\mathrm{Hz}$, current crowded into the outer bars by skin effect) and low when running ($1$ to $2\,\mathrm{Hz}$), or else a variable-frequency drive, which starts at low frequency with high torque.
:::
:::
