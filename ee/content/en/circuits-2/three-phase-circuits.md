Look at the top of a high-voltage transmission tower and you will almost always see the conductors in groups of three. Almost all the world's electrical energy is generated, transmitted and distributed as **three-phase** AC: three sinusoidal voltages of equal amplitude, displaced from one another by a third of a cycle. A house may receive only one of those phases, but the substation it hangs from, the generator in the power station and every large motor in a factory work with all three.

There are three good reasons. First, the total instantaneous power delivered to a balanced three-phase load is **constant**, not pulsating at $2\omega$ as in [[circuits-2/ac-power]], so generators and motors run with a steady torque and without vibration. Second, three-phase transmission carries a given power with less conductor material than single-phase transmission at the same line voltage. Third, three currents displaced by $120^\circ$ in three coils displaced by $120^\circ$ in space produce a **rotating magnetic field**, which makes the induction motor possible with no commutator at all.

The good news for analysis is that a balanced three-phase circuit is three copies of a single-phase circuit with phase shifts, so all the phasor methods of [[circuits-2/ac-analysis]] apply. This lesson defines balanced sources and their sequence, the wye and delta connections and the relations between line and phase quantities, reduces any balanced circuit to a **per-phase equivalent**, and computes three-phase power, its measurement and its correction. We use **RMS phasors** throughout, as power engineers do.

## Balanced three-phase voltages

A three-phase generator has three identical windings on its stator, spaced $120^\circ$ apart around the machine. As the rotor's magnetic field sweeps past them, each winding has the same sinusoidal EMF induced in it, but each reaches its peak a third of a revolution after the previous one.

::: definition Balanced three-phase voltages and phase sequence {#def-balanced}
Three sinusoidal voltages form a **balanced set** if they have equal amplitudes and the same frequency and are displaced in phase by $120^\circ$ from one another. In the **positive** (or **abc**) **sequence**, with RMS phasors referred to the neutral point $n$,

$$
\mathbf V_{an} = V_p\angle 0^\circ, \qquad \mathbf V_{bn} = V_p\angle -120^\circ, \qquad \mathbf V_{cn} = V_p\angle +120^\circ,
$$ {#eq-abc}

so $\mathbf V_{an}$ leads $\mathbf V_{bn}$, which leads $\mathbf V_{cn}$, by $120^\circ$ each. In the **negative** (**acb**) sequence $\mathbf V_{bn}$ and $\mathbf V_{cn}$ are interchanged. $V_p$ is the **phase voltage** (RMS).
:::

The phase sequence is the order in which the voltages reach their maxima. It is a physical property: reversing it (by swapping any two supply leads) reverses the direction of rotation of an induction motor. On site it is checked with a phase-rotation meter before a motor is connected.

A compact notation uses the operator $a = 1\angle 120^\circ = -\tfrac12 + j\tfrac{\sqrt3}{2}$, which rotates a phasor by $120^\circ$. Then the positive sequence is $\mathbf V_{an}$, $a^2\mathbf V_{an}$, $a\mathbf V_{an}$ (note $a^2 = 1\angle 240^\circ = 1\angle -120^\circ$, $a^3 = 1$).

::: proposition The phasors of a balanced set sum to zero {#prop-sum-zero}
For any balanced set, $\mathbf V_{an} + \mathbf V_{bn} + \mathbf V_{cn} = 0$, and the instantaneous voltages satisfy $v_{an}(t) + v_{bn}(t) + v_{cn}(t) = 0$ at every instant.
:::

::: proof
The sum is $V_p(1 + a^2 + a) = V_p\,\dfrac{a^3 - 1}{a - 1} = 0$, since $a^3 = 1$ and $a \neq 1$. Geometrically, the three phasors are the sides of an equilateral triangle placed head to tail. The instantaneous sum is the real part of the phasor sum times $\sqrt2 e^{j\omega t}$, which is zero.
:::

::: widget plot
f: cos(x); cos(x - 2pi/3); cos(x + 2pi/3); cos(x) + cos(x - 2pi/3) + cos(x + 2pi/3)
x: 0, 4pi
y: -1.2, 1.2
piticks: true
labels: v_{an}; v_{bn}; v_{cn}; \text{sum}
caption: A balanced positive-sequence set, normalised to unit amplitude. Hover at any instant and add the three values: the fourth curve, their sum, is identically zero. Read the order of the peaks from left to right: $a$, then $b$ a third of a cycle later, then $c$. That order is the phase sequence.
:::

## Wye and delta connections

The three windings of a source, and the three impedances of a load, can be connected in two ways.

- In the **wye** (Y, or star) connection one end of each winding is joined at a common **neutral** point $n$; the other three ends are the **line terminals** $a$, $b$, $c$. A fourth wire may be brought out from the neutral.
- In the **delta** ($\Delta$, or mesh) connection the three windings are joined end to end in a closed triangle, and the line terminals are taken from the three corners. There is no neutral.

The quantities that appear in each element of the source or load are the **phase** voltages and currents; those between and in the lines that connect source to load are the **line** voltages and currents. For a delta load the phase voltage *is* a line voltage; for a wye load the phase current *is* a line current. The other pair is related by $\sqrt3$ and $30^\circ$.

::: theorem Line and phase quantities {#thm-line-phase}
For a balanced positive-sequence system:

1. **Wye.** The line voltages are $\sqrt3$ times the phase voltages and lead them by $30^\circ$:

   $$
   \mathbf V_{ab} = \sqrt3\,\mathbf V_{an}\angle 30^\circ, \quad \mathbf V_{bc} = \sqrt3\,\mathbf V_{bn}\angle 30^\circ, \quad \mathbf V_{ca} = \sqrt3\,\mathbf V_{cn}\angle 30^\circ.
   $$ {#eq-wye-v}

   The line currents equal the phase currents.
2. **Delta.** The line currents are $\sqrt3$ times the phase currents and lag them by $30^\circ$:

   $$
   \mathbf I_a = \sqrt3\,\mathbf I_{AB}\angle -30^\circ, \quad \mathbf I_b = \sqrt3\,\mathbf I_{BC}\angle -30^\circ, \quad \mathbf I_c = \sqrt3\,\mathbf I_{CA}\angle -30^\circ.
   $$ {#eq-delta-i}

   The line voltages equal the phase voltages.

For the negative sequence the angles $+30^\circ$ and $-30^\circ$ change sign; the factor $\sqrt3$ is the same.
:::

::: proof
**Wye.** By KVL, $\mathbf V_{ab} = \mathbf V_{an} - \mathbf V_{bn} = V_p\bigl(1 - 1\angle -120^\circ\bigr)$. Now $1 - 1\angle -120^\circ = 1 - (-\tfrac12 - j\tfrac{\sqrt3}2) = \tfrac32 + j\tfrac{\sqrt3}2 = \sqrt3\angle 30^\circ$. So $\mathbf V_{ab} = \sqrt3V_p\angle 30^\circ = \sqrt3\,\mathbf V_{an}\angle 30^\circ$. The other two follow by rotating every phasor by $-120^\circ$ and $+120^\circ$.

**Delta.** Let the load phases be $AB$, $BC$, $CA$ with currents $\mathbf I_{AB}$, $\mathbf I_{BC}$, $\mathbf I_{CA}$ (balanced, positive sequence, so $\mathbf I_{CA} = \mathbf I_{AB}\angle 120^\circ$). KCL at corner $A$ gives $\mathbf I_a = \mathbf I_{AB} - \mathbf I_{CA} = \mathbf I_{AB}(1 - 1\angle 120^\circ)$, and $1 - 1\angle 120^\circ = \tfrac32 - j\tfrac{\sqrt3}{2} = \sqrt3\angle -30^\circ$.
:::

The **nominal voltage** of a three-phase system always means the RMS **line** voltage. A "$400\,\mathrm{V}$" European supply has phase voltage $400/\sqrt3 = 231\,\mathrm{V}$, which is the familiar $230\,\mathrm{V}$ domestic supply between one line and neutral; a North American "$208\,\mathrm{V}$" system has $120\,\mathrm{V}$ phases.

::: warning Which voltage is the system voltage?
Unless stated otherwise, "a $400\,\mathrm{V}$ three-phase supply" means $400\,\mathrm{V}$ RMS line to line. Dividing by $\sqrt3$ to get the phase voltage of a wye, and **not** dividing for a delta, is the most common source of factor-of-$\sqrt3$ errors. Another is to forget the $30^\circ$ shift and then find that KVL fails around a loop. Before any calculation, write down $V_L$, $V_p$, $I_L$ and $I_p$ for each part of the circuit and say which is which.
:::

## The per-phase equivalent

Consider a balanced wye source connected to a balanced wye load, each load phase having impedance $Z_Y$, through three lines each of impedance $Z_\ell$, with a neutral wire of impedance $Z_N$ between the two neutral points $n$ and $N$.

::: theorem Per-phase equivalent of a balanced Y–Y system {#thm-per-phase}
In a balanced Y–Y circuit the neutral points are at the same potential, $\mathbf V_{Nn} = 0$, and the neutral current is zero, whatever the neutral impedance $Z_N$ (including an open circuit). Each phase may therefore be analysed alone, as a single-phase circuit consisting of $\mathbf V_{an}$, $Z_\ell$ and $Z_Y$ connected from line to neutral; the currents and voltages of phases $b$ and $c$ are those of phase $a$ shifted by $-120^\circ$ and $+120^\circ$.
:::

::: proof
Write KCL at the load neutral $N$ with $n$ as reference. Each phase branch has total impedance $Z = Z_\ell + Z_Y$, so

$$
\frac{\mathbf V_{an} - \mathbf V_{Nn}}{Z} + \frac{\mathbf V_{bn} - \mathbf V_{Nn}}{Z} + \frac{\mathbf V_{cn} - \mathbf V_{Nn}}{Z} = \frac{\mathbf V_{Nn}}{Z_N}.
$$

By [[#prop-sum-zero]] the three source phasors sum to zero, leaving $\mathbf V_{Nn}\,(3/Z + 1/Z_N) = 0$, hence $\mathbf V_{Nn} = 0$ and no current flows in the neutral. Each line current is then $\mathbf I_a = \mathbf V_{an}/(Z_\ell + Z_Y)$, depending only on phase $a$.
:::

Delta sources and loads are brought into this form by converting them to equivalent wyes. For a balanced load the $\Delta$–Y transformation of [[circuits-1/resistive-circuits]] (which holds for complex impedances with the same proof) gives simply

$$
Z_Y = \frac{Z_\Delta}{3}.
$$ {#eq-delta-y}

::: quiz
Three identical $30\,\Omega$ resistors are connected first in delta and then in wye to the same three-phase supply. How does the total power in delta compare with the total power in wye?
- [ ] The same
- [ ] $\sqrt3$ times larger
- [x] $3$ times larger
- [ ] $3$ times smaller
::: solution
In delta each resistor sees the line voltage $V_L$; in wye it sees $V_L/\sqrt3$. Power goes as $V^2/R$, so each resistor, and therefore the total, absorbs $3$ times as much in delta. Equivalently, the delta of $30\,\Omega$ resistors behaves like a wye of $10\,\Omega$ resistors, by [[#eq-delta-y]]. Star–delta motor starters use this: the motor is started in wye to cut the starting current to a third, then switched to delta.
:::
:::

A delta source of line voltage $\mathbf V_{ab}$ is equivalent to a wye source of phase voltage $\mathbf V_{an} = (\mathbf V_{ab}/\sqrt3)\angle -30^\circ$, by [[#thm-line-phase]].

::: algorithm Analysing a balanced three-phase circuit {#alg-per-phase}
1. Convert every delta source and load into its equivalent wye ($V_p = V_L/\sqrt3$ with the $-30^\circ$ shift; $Z_Y = Z_\Delta/3$).
2. Draw the per-phase circuit for phase $a$: $\mathbf V_{an}$, line impedance and $Z_Y$ in series between line $a$ and the (ideal, zero-impedance) neutral.
3. Solve it with single-phase phasor methods.
4. Obtain phases $b$ and $c$ by shifting by $-120^\circ$ and $+120^\circ$ (positive sequence).
5. Return to the original circuit: line voltages by [[#eq-wye-v]], delta phase currents from [[#eq-delta-i]].
:::

::: example A balanced wye load on a 400 V supply {#ex-yy}
A balanced wye-connected load with $Z_Y = 12 + j9\,\Omega$ per phase is supplied from a $400\,\mathrm{V}$, $50\,\mathrm{Hz}$, positive-sequence system. Find the line currents and the total complex power.
::: solution
The phase voltage is $V_p = 400/\sqrt3 = 230.9\,\mathrm{V}$. Take $\mathbf V_{an} = 230.9\angle 0^\circ\,\mathrm{V}$. The impedance is $Z_Y = 15\angle 36.87^\circ\,\Omega$, so

$$
\mathbf I_a = \frac{230.9\angle 0^\circ}{15\angle 36.87^\circ} = 15.40\angle -36.87^\circ\,\mathrm{A}, \quad \mathbf I_b = 15.40\angle -156.87^\circ\,\mathrm{A}, \quad \mathbf I_c = 15.40\angle 83.13^\circ\,\mathrm{A}.
$$

Each phase absorbs $\mathbf S_\phi = \abs{\mathbf I_a}^2 Z_Y = 237.0\times(12 + j9) = 2844 + j2133\,\mathrm{VA}$, so the total is

$$
\mathbf S = 3\mathbf S_\phi = 8533 + j6400\,\mathrm{VA}, \qquad \abs{\mathbf S} = 10.67\,\mathrm{kVA},
$$

at power factor $0.8$ lagging. The neutral wire, if present, carries no current. Check: $\sqrt3V_LI_L = \sqrt3\times400\times15.40 = 10.67\,\mathrm{kVA}$.
:::
:::

::: example A delta load {#ex-delta}
A balanced delta load with $Z_\Delta = 30 + j40\,\Omega$ per phase is connected to the same $400\,\mathrm{V}$ supply. Find the phase and line currents and the total average power.
::: solution
Each phase of the delta sits directly across a line voltage. With $\mathbf V_{AB} = 400\angle 30^\circ\,\mathrm{V}$ (consistent with $\mathbf V_{an} = 230.9\angle 0^\circ$, by [[#eq-wye-v]]) and $Z_\Delta = 50\angle 53.13^\circ\,\Omega$,

$$
\mathbf I_{AB} = \frac{400\angle 30^\circ}{50\angle 53.13^\circ} = 8\angle -23.13^\circ\,\mathrm{A}.
$$

By [[#eq-delta-i]] the line current is $\mathbf I_a = \sqrt3\times8\angle(-23.13^\circ - 30^\circ) = 13.86\angle -53.13^\circ\,\mathrm{A}$. The power is $P = 3I_p^2R = 3\times64\times30 = 5760\,\mathrm{W}$.

Check by the per-phase method: $Z_Y = Z_\Delta/3 = 10 + j13.33\,\Omega = 16.67\angle 53.13^\circ$, so $\mathbf I_a = 230.9/16.67\angle -53.13^\circ = 13.86\angle -53.13^\circ\,\mathrm{A}$, the same.
:::
:::

::: example Line losses with a delta load {#ex-line}
A wye source with $\mathbf V_{an} = 230\angle 0^\circ\,\mathrm{V}$ (rms) feeds a balanced delta load $Z_\Delta = 27 + j18\,\Omega$ through lines of impedance $Z_\ell = 0.5 + j1\,\Omega$ each. Find the line current, the line voltage at the load, the current in each phase of the delta and the power lost in the lines.
::: solution
Convert the load: $Z_Y = (27 + j18)/3 = 9 + j6\,\Omega$. The per-phase circuit is $230\angle 0^\circ$ in series with $Z_\ell + Z_Y = 9.5 + j7\,\Omega = 11.80\angle 36.38^\circ\,\Omega$:

$$
\mathbf I_a = \frac{230}{11.80\angle 36.38^\circ} = 19.49\angle -36.38^\circ\,\mathrm{A}.
$$

The load phase voltage (line to equivalent neutral) is $\mathbf V_{AN} = \mathbf I_aZ_Y = 19.49\angle -36.38^\circ\times10.82\angle 33.69^\circ = 210.8\angle -2.69^\circ\,\mathrm{V}$, so the line voltage at the load is $\sqrt3\times210.8 = 365.2\,\mathrm{V}$, against $\sqrt3\times230 = 398.4\,\mathrm{V}$ at the source. The delta phase current is $\abs{\mathbf I_a}/\sqrt3 = 11.25\,\mathrm{A}$, at angle $-36.38^\circ + 30^\circ = -6.38^\circ$.

The three lines dissipate $3\abs{\mathbf I_a}^2(0.5) = 3\times379.9\times0.5 = 570\,\mathrm{W}$, while the load absorbs $3\times379.9\times9 = 10.26\,\mathrm{kW}$. The source therefore delivers $10.83\,\mathrm{kW}$, and the transmission efficiency is $94.7\,\%$.
:::
:::

## Three-phase power

The great advantage of a balanced three-phase system shows up when we add the instantaneous powers of the three phases.

::: theorem Constant instantaneous power {#thm-constant-power}
In a balanced three-phase system with phase voltage $V_p$, phase current $I_p$ (both RMS) and power-factor angle $\theta$ per phase, the total instantaneous power is constant:

$$
p(t) = p_a(t) + p_b(t) + p_c(t) = 3V_pI_p\cos\theta.
$$

In terms of line quantities, for either connection,

$$
P = \sqrt3\,V_LI_L\cos\theta, \qquad Q = \sqrt3\,V_LI_L\sin\theta, \qquad \abs{\mathbf S} = \sqrt3\,V_LI_L,
$$ {#eq-p3}

where $\theta$ is still the angle of the **phase** impedance, not the angle between line voltage and line current.
:::

::: proof
With peak values $\sqrt2V_p$ and $\sqrt2I_p$, phase $k = 0, 1, 2$ has $v_k = \sqrt2V_p\cos(\omega t - k\,120^\circ)$ and $i_k = \sqrt2I_p\cos(\omega t - k\,120^\circ - \theta)$. By the product formula,

$$
p_k = V_pI_p\bigl[\cos\theta + \cos(2\omega t - k\,240^\circ - \theta)\bigr].
$$

The three double-frequency terms have phases $-\theta$, $-240^\circ-\theta$ and $-480^\circ-\theta \equiv -120^\circ-\theta$: a balanced set, which sums to zero by [[#prop-sum-zero]]. What remains is $3V_pI_p\cos\theta$. For a wye, $V_p = V_L/\sqrt3$ and $I_p = I_L$; for a delta, $V_p = V_L$ and $I_p = I_L/\sqrt3$; either way $3V_pI_p = \sqrt3V_LI_L$.
:::

::: widget plot
f: 2*cos(x)*cos(x - th); 2*cos(x - 2pi/3)*cos(x - 2pi/3 - th); 2*cos(x + 2pi/3)*cos(x + 2pi/3 - th); 2*(cos(x)*cos(x - th) + cos(x - 2pi/3)*cos(x - 2pi/3 - th) + cos(x + 2pi/3)*cos(x + 2pi/3 - th))
x: 0, 4pi
y: -1.5, 3.5
piticks: true
sliders: th=0.6435:0:1.5708:0.01
labels: p_a; p_b; p_c; p_a + p_b + p_c
caption: Instantaneous powers of the three phases of a balanced load, in units of $V_pI_p$, for a power-factor angle $\theta$ (slider, radians; $0.6435$ is $\mathrm{pf}=0.8$). Each phase pulsates at twice the supply frequency, sometimes going negative, but the total is a flat line at $3\cos\theta$. Move $\theta$ and watch the total stay flat while its level changes.
:::

Constant power means constant torque on the shaft of a three-phase generator or motor, which is why large machines are always polyphase. It also gives the economic argument. Suppose a power $P$ at unity power factor is to be delivered with line voltage $V_L$ and conductor resistance $R$ per wire. Single-phase on two wires needs current $P/V_L$ and loses $2R(P/V_L)^2$. Three-phase on three wires needs $P/(\sqrt3V_L)$ per line and loses $3R\,P^2/(3V_L^2) = R(P/V_L)^2$, **half** as much, with only $1.5$ times the number of conductors. For the same loss, three-phase needs $75\,\%$ of the copper.

::: quiz
A balanced three-phase load draws $20\,\mathrm{A}$ line current from a $400\,\mathrm{V}$ supply at power factor $0.85$ lagging. Its average power is closest to
- [ ] $6.8\,\mathrm{kW}$
- [x] $11.8\,\mathrm{kW}$
- [ ] $20.4\,\mathrm{kW}$
- [ ] $13.9\,\mathrm{kW}$
::: solution
$P = \sqrt3V_LI_L\cos\theta = 1.732\times400\times20\times0.85 = 11.78\,\mathrm{kW}$. Forgetting the $\sqrt3$ gives $6.8\,\mathrm{kW}$; using $3V_LI_L$ gives $20.4$; and $13.9\,\mathrm{kVA}$ is the apparent power, not the average power.
:::
:::

### Measuring power: the two-wattmeter method

A wattmeter reads $\mathrm{Re}[\mathbf V\mathbf I^*]$ for the voltage across its potential coil and the current through its current coil. On a four-wire system three wattmeters, one per phase, measure the total power. On a three-wire system two are enough.

::: theorem Two-wattmeter method {#thm-two-wattmeter}
In a three-wire three-phase system, balanced or not, let wattmeter 1 carry line current $\mathbf I_a$ with its potential coil across $\mathbf V_{ab}$, and wattmeter 2 carry $\mathbf I_c$ with its potential coil across $\mathbf V_{cb}$. Then the total average power is $P = W_1 + W_2$. If the load is balanced with power-factor angle $\theta$ and the sequence is positive,

$$
W_1 = V_LI_L\cos(\theta + 30^\circ), \qquad W_2 = V_LI_L\cos(\theta - 30^\circ), \qquad Q = \sqrt3\,(W_2 - W_1).
$$
:::

::: proof
Let $n$ be any reference point (for example an artificial star point). Then $W_1 + W_2 = \mathrm{Re}[(\mathbf V_{an} - \mathbf V_{bn})\mathbf I_a^* + (\mathbf V_{cn} - \mathbf V_{bn})\mathbf I_c^*] = \mathrm{Re}[\mathbf V_{an}\mathbf I_a^* + \mathbf V_{cn}\mathbf I_c^* - \mathbf V_{bn}(\mathbf I_a + \mathbf I_c)^*]$. With three wires KCL gives $\mathbf I_a + \mathbf I_c = -\mathbf I_b$, so the bracket is $\sum_k \mathbf V_{kn}\mathbf I_k^*$, the total complex power, whose real part is $P$. For the balanced case, $\mathbf V_{ab} = V_L\angle 30^\circ$ and $\mathbf I_a = I_L\angle -\theta$ give $W_1 = V_LI_L\cos(30^\circ + \theta)$; $\mathbf V_{cb} = -\mathbf V_{bc} = V_L\angle 90^\circ$ and $\mathbf I_c = I_L\angle(120^\circ - \theta)$ give $W_2 = V_LI_L\cos(\theta - 30^\circ)$. Finally $W_2 - W_1 = 2V_LI_L\sin\theta\sin30^\circ = V_LI_L\sin\theta = Q/\sqrt3$.
:::

::: example Two-wattmeter readings {#ex-two-wattmeter}
Find the two wattmeter readings for the load of [[#ex-yy]], and recover $P$ and $Q$ from them.
::: solution
There $V_L = 400\,\mathrm{V}$, $I_L = 15.40\,\mathrm{A}$, $\theta = 36.87^\circ$, so $V_LI_L = 6158\,\mathrm{VA}$ and

$$
W_1 = 6158\cos 66.87^\circ = 2419\,\mathrm{W}, \qquad W_2 = 6158\cos 6.87^\circ = 6114\,\mathrm{W}.
$$

Then $P = W_1 + W_2 = 8533\,\mathrm{W}$ and $Q = \sqrt3(6114 - 2419) = 6400\,\mathrm{var}$, as found before. Note that $W_1$ becomes negative when $\theta > 60^\circ$ (power factor below $0.5$): the meter must then be reversed and its reading subtracted.
:::
:::

## Power-factor correction in three-phase systems

Three-phase loads are corrected exactly as in [[circuits-2/ac-power#alg-pfc]], with the total reactive power shared equally between three capacitors. The capacitors may be connected in wye (each across a phase voltage) or in delta (each across a line voltage). Since a capacitor's reactive power is $\omega CV^2$, a delta bank sees $3$ times the voltage squared and needs only **one third** of the capacitance of a wye bank, at the price of a voltage rating $\sqrt3$ times higher.

::: example Correcting a three-phase motor {#ex-3ph-pfc}
A three-phase induction motor takes $50\,\mathrm{kW}$ at power factor $0.8$ lagging from a $400\,\mathrm{V}$, $50\,\mathrm{Hz}$ supply. Design a delta-connected capacitor bank that raises the power factor to $0.95$ lagging, and compare with a wye bank.
::: solution
The reactive power must fall from $Q_1 = 50\tan(\arccos0.8) = 37.50\,\mathrm{kvar}$ to $Q_2 = 50\tan(\arccos0.95) = 16.43\,\mathrm{kvar}$, so the bank supplies $21.07\,\mathrm{kvar}$ in total, $7.02\,\mathrm{kvar}$ per capacitor.

In delta, each capacitor has $400\,\mathrm{V}$ across it:

$$
C_\Delta = \frac{7022}{\omega V_L^2} = \frac{7022}{314.16\times400^2} = 140\,\mathrm{\mu F}.
$$

In wye, each has $231\,\mathrm{V}$, and $C_Y = 7022/(314.16\times230.9^2) = 419\,\mathrm{\mu F} = 3C_\Delta$. The line current falls from $50\,000/(\sqrt3\times400\times0.8) = 90.2\,\mathrm{A}$ to $50\,000/(\sqrt3\times400\times0.95) = 76.0\,\mathrm{A}$. Commercial banks are rated in kvar at a stated voltage; a $3\times7.5\,\mathrm{kvar}$, $440\,\mathrm{V}$ delta bank would be a typical choice, slightly over the requirement.
:::
:::

## Unbalanced loads

Real distribution systems are not perfectly balanced: houses are spread over the three phases of a street, and their loads change independently. With unequal phase impedances the per-phase method fails, and the circuit must be solved as a whole, by nodal analysis. In a four-wire system with a solid neutral, each phase voltage is still fixed by the source, the phase currents are computed independently, and the neutral carries their phasor sum $\mathbf I_N = \mathbf I_a + \mathbf I_b + \mathbf I_c \neq 0$.

::: example Neutral current with unbalanced loads {#ex-neutral}
A $400/230\,\mathrm{V}$ four-wire supply feeds resistive loads of $10\,\Omega$, $20\,\Omega$ and $40\,\Omega$ from phases $a$, $b$ and $c$ to neutral. Find the neutral current.
::: solution
With $\mathbf V_{an} = 230\angle 0^\circ$, the phase currents are $\mathbf I_a = 23\angle 0^\circ$, $\mathbf I_b = 11.5\angle -120^\circ$ and $\mathbf I_c = 5.75\angle 120^\circ\,\mathrm{A}$. In rectangular form,

$$
\mathbf I_N = 23 + (-5.75 - j9.959) + (-2.875 + j4.980) = 14.375 - j4.980 = 15.2\angle -19.1^\circ\,\mathrm{A}.
$$

The neutral carries a current comparable to the line currents. That is why a distribution neutral is sized like a phase conductor, and why a broken neutral is dangerous (exercise [[#exr-broken-neutral]]).
:::
:::

::: remark Symmetrical components
An unbalanced set of three phasors can always be written as the sum of three balanced sets: a positive-sequence set, a negative-sequence set and a zero-sequence set (three equal phasors). Each set, applied to a symmetrical network, can be analysed per phase. This decomposition, introduced by Fortescue, is the standard tool for unbalanced faults in [[power-systems]]. In the example above the zero-sequence current is $\mathbf I_N/3$, and the neutral is exactly where zero-sequence current flows.
:::

::: application Harmonics in the neutral
Electronic loads draw distorted currents rich in third harmonic. Shifting a third harmonic by the phase shifts $0$, $-120^\circ$ and $+120^\circ$ of the fundamental shifts it by $0$, $-360^\circ$ and $+360^\circ$: the third-harmonic currents of the three phases are **in phase** and add in the neutral instead of cancelling. In office buildings full of computers the neutral current can exceed the line currents, even with perfectly balanced loads, and modern codes require oversized neutrals for such installations.
:::

::: history
Several inventors worked on polyphase systems in the 1880s. Galileo Ferraris described the rotating magnetic field produced by out-of-phase currents in 1888, and Nikola Tesla's polyphase motor patents were granted in the same year and bought by Westinghouse. In Germany Friedrich August Haselwander built a three-phase generator in 1887, and Mikhail Dolivo-Dobrovolsky of AEG developed the three-phase induction motor with a squirrel-cage rotor and the three-phase transformer in 1889–1891. In 1891 the Lauffen–Frankfurt line, organised by Oskar von Miller for the International Electrotechnical Exhibition, transmitted three-phase power at high voltage over $175\,\mathrm{km}$, convincing engineers that three-phase AC was the future. The two-wattmeter method is a special case of Blondel's theorem (André Blondel, 1893): $n-1$ wattmeters suffice for an $n$-wire system. Charles Fortescue introduced symmetrical components in 1918.
:::

## Where this leads

The per-phase equivalent is the everyday tool of [[power-systems]], where generators, transformers and lines are all modelled per phase in per-unit, and unbalanced faults are handled with symmetrical components. The rotating field of three-phase currents is the operating principle of the induction and synchronous machines of [[electric-machines]]. Three-phase transformers, made of the coupled coils of [[circuits-2/magnetically-coupled-circuits]], can be connected Y–Y, Y–Δ and Δ–Δ, and the $30^\circ$ shift of [[#thm-line-phase]] reappears as the phase shift of a Y–Δ transformer. Three-phase rectifiers and inverters appear in [[power-electronics]].

::: summary
- A balanced three-phase set consists of three equal sinusoids displaced by $120^\circ$; the phasors and the instantaneous values sum to zero. The phase sequence (abc or acb) sets the direction of motor rotation.
- Wye: $V_L = \sqrt3V_p$ leading by $30^\circ$, $I_L = I_p$. Delta: $I_L = \sqrt3I_p$ lagging by $30^\circ$, $V_L = V_p$. The system voltage is the RMS line voltage.
- A balanced circuit reduces to the per-phase (line-to-neutral) equivalent of one phase, after converting deltas with $Z_Y = Z_\Delta/3$; the neutral carries no current.
- The total instantaneous power of a balanced system is constant: $P = 3V_pI_p\cos\theta = \sqrt3V_LI_L\cos\theta$, with $\theta$ the phase-impedance angle.
- Two wattmeters measure the power of any three-wire system; for a balanced load, $Q = \sqrt3(W_2 - W_1)$.
- Power-factor correction capacitors in delta need one third of the capacitance of a wye bank; unbalanced loads produce neutral current and need nodal analysis.
:::

## Exercises

::: exercise Line voltage {level=1 check="120*sqrt(3)"}
A balanced wye source has phase voltage $120\,\mathrm{V}$ (rms). What is its line voltage, in volts?
::: solution
$V_L = \sqrt3\times120 = 207.8\,\mathrm{V}$, the "$208\,\mathrm{V}$" system of North American buildings.
:::
:::

::: exercise Delta line current {level=1 check="10*sqrt(3)"}
Each phase of a balanced delta load carries $10\,\mathrm{A}$ (rms). What is the line current, in amperes?
::: solution
$I_L = \sqrt3I_p = 17.32\,\mathrm{A}$, lagging the phase current $\mathbf I_{AB}$ by $30^\circ$ in positive sequence.
:::
:::

::: exercise Three-phase power {level=1 check="sqrt(3)*400*20*0.85"}
Confirm the quiz: what is the average power, in watts, of a balanced load drawing $20\,\mathrm{A}$ from a $400\,\mathrm{V}$ supply at power factor $0.85$?
::: solution
$P = \sqrt3\times400\times20\times0.85 = 11\,778\,\mathrm{W}$.
:::
:::

::: exercise A Y–Y circuit {level=2 check="208/sqrt(3)/10"}
A balanced wye load of $8 + j6\,\Omega$ per phase is connected to a $208\,\mathrm{V}$ three-phase supply. Find the line current (in amperes) and the total complex power.
::: solution
$V_p = 208/\sqrt3 = 120.1\,\mathrm{V}$ and $\abs{Z_Y} = 10\,\Omega$, so $I_L = 12.01\,\mathrm{A}$. Then $\mathbf S = 3I_L^2Z_Y = 3\times144.2\times(8 + j6) = 3461 + j2596\,\mathrm{VA}$.
:::
:::

::: exercise A delta load on 415 V {level=2 check="sqrt(3)*415/30"}
A balanced delta load of $24 + j18\,\Omega$ per phase is connected to a $415\,\mathrm{V}$ supply. Find the line current in amperes.
::: hint
Either find the phase current and multiply by $\sqrt3$, or convert to $Z_Y = Z_\Delta/3$.
:::
::: solution
$\abs{Z_\Delta} = 30\,\Omega$, so $I_p = 415/30 = 13.83\,\mathrm{A}$ and $I_L = \sqrt3\times13.83 = 23.96\,\mathrm{A}$. Via the wye: $\abs{Z_Y} = 10\,\Omega$ and $I_L = (415/\sqrt3)/10 = 23.96\,\mathrm{A}$.
:::
:::

::: exercise Reading two wattmeters {level=2 check="8/sqrt(64+48)"}
Two wattmeters connected as in [[#thm-two-wattmeter]] on a balanced load read $W_1 = 2\,\mathrm{kW}$ and $W_2 = 6\,\mathrm{kW}$. Find $P$, $Q$ and the power factor (the answer to enter).
::: solution
$P = 8\,\mathrm{kW}$ and $Q = \sqrt3(6 - 2) = 6.93\,\mathrm{kvar}$. The power factor is $P/\sqrt{P^2 + Q^2} = 8/\sqrt{64 + 48} = 0.756$ lagging (since $W_2 > W_1$ in positive sequence).
:::
:::

::: exercise The ratio of wattmeter readings {level=3}
For a balanced load, show that $\tan\theta = \sqrt3\,(W_2 - W_1)/(W_2 + W_1)$. What do the two meters read at unity power factor, and at power factor $0.5$ lagging?
::: solution
From [[#thm-two-wattmeter]], $W_2 + W_1 = V_LI_L[\cos(\theta-30^\circ) + \cos(\theta+30^\circ)] = 2V_LI_L\cos\theta\cos30^\circ = \sqrt3V_LI_L\cos\theta$, and $W_2 - W_1 = V_LI_L\sin\theta$. Dividing, $\tan\theta = \sqrt3(W_2 - W_1)/(W_2 + W_1)$. At unity power factor $\theta = 0$ and $W_1 = W_2 = V_LI_L\cos30^\circ$: equal readings. At $\mathrm{pf} = 0.5$, $\theta = 60^\circ$, so $W_1 = V_LI_L\cos90^\circ = 0$ and $W_2$ carries all the power.
:::
:::

::: exercise A broken neutral {#exr-broken-neutral level=3}
In [[#ex-neutral]] the neutral wire breaks, so that the load star point $N$ floats. Find the voltage of $N$ relative to the source neutral, and the voltage across each load. What happens to equipment on the lightly loaded phase?
::: hint
Write KCL at $N$: $\sum_k (\mathbf V_{kn} - \mathbf V_{Nn})/R_k = 0$, so $\mathbf V_{Nn}$ is a weighted average of the phase voltages.
:::
::: solution
$\mathbf V_{Nn} = \dfrac{\mathbf V_{an}/10 + \mathbf V_{bn}/20 + \mathbf V_{cn}/40}{1/10 + 1/20 + 1/40}$. The numerator is the neutral current of the example, $15.21\angle -19.1^\circ\,\mathrm{A}$, and the denominator is $0.175\,\mathrm{S}$, so $\mathbf V_{Nn} = 86.9\angle -19.1^\circ\,\mathrm{V}$. The load voltages $\abs{\mathbf V_{kn} - \mathbf V_{Nn}}$ are $150.6\,\mathrm{V}$ (the $10\,\Omega$ load), $260.8\,\mathrm{V}$ ($20\,\Omega$) and $301.1\,\mathrm{V}$ ($40\,\Omega$). The most lightly loaded phase sees $301\,\mathrm{V}$, $31\,\%$ above its rating, and equipment on it may be destroyed, while the heavily loaded phase sags to $151\,\mathrm{V}$. This is why neutrals are never fused on their own.
:::
:::

::: exercise Copper saving of three-phase {level=3}
Power $P$ is to be transmitted at unity power factor over a distance $\ell$ with line-to-line voltage $V_L$ and a prescribed total loss $P_{\text{loss}}$. Compare the total conductor volume needed by (a) a two-wire single-phase line and (b) a three-wire three-phase line, assuming conductors of resistivity $\rho$ and cross-section $A$, with all conductors identical within each system.
::: hint
For each system, express $P_{\text{loss}}$ in terms of $A$, solve for $A$, and multiply by the number of conductors and $\ell$.
:::
::: solution
(a) Current $I = P/V_L$, loss $2I^2\rho\ell/A_1$, so $A_1 = 2\rho\ell P^2/(V_L^2P_{\text{loss}})$ and volume $2\ell A_1 = 4\rho\ell^2P^2/(V_L^2P_{\text{loss}})$.

(b) Current $I = P/(\sqrt3V_L)$ per line, loss $3I^2\rho\ell/A_3 = \rho\ell P^2/(V_L^2A_3)$, so $A_3 = \rho\ell P^2/(V_L^2P_{\text{loss}})$ and volume $3\ell A_3 = 3\rho\ell^2P^2/(V_L^2P_{\text{loss}})$.

The ratio is $3/4$: three-phase transmission needs $75\,\%$ of the conductor material of single-phase for the same power, voltage and loss.
:::
:::
