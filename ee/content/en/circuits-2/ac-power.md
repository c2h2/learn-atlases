Your electricity bill charges you for energy, measured in kilowatt-hours, yet the cables, transformers and generators that bring that energy to you are sized for something else: the current they carry. In a DC circuit the two are tied together by $P = VI$, and nothing is lost by thinking only of power. In an AC circuit they come apart. A motor and an electric heater can draw the same current from the same $230\,\mathrm{V}$ socket while the motor converts much less of it into useful work, because part of its current flows back and forth to supply the magnetic field and does no net work at all. The utility still has to generate, transmit and pay the losses on that current.

This lesson makes that distinction precise. We start from the instantaneous power $p(t) = v(t)\,i(t)$ in the sinusoidal steady state, average it over a cycle, and find that only the in-phase part of the current carries net energy. That leads to the effective (RMS) value, to the apparent power, the power factor and the reactive power, and to the single complex number $\mathbf S = P + jQ$ that holds them all. Two engineering results follow: the condition for maximum average power transfer to a load, and the design of power-factor correction. Throughout we use the phasor methods of [[circuits-2/sinusoids-phasors]] and [[circuits-2/ac-analysis]].

## Instantaneous and average power

Let a two-terminal element, or a whole network, have voltage and current in the passive sign convention ([[circuits-1/basic-concepts]]):

$$
v(t) = V_m\cos(\omega t + \theta_v), \qquad i(t) = I_m\cos(\omega t + \theta_i).
$$

The **instantaneous power** absorbed is $p(t) = v(t)\,i(t)$. Using $\cos A\cos B = \tfrac12[\cos(A-B) + \cos(A+B)]$,

$$
p(t) = \tfrac12 V_m I_m \cos(\theta_v - \theta_i) + \tfrac12 V_m I_m\cos(2\omega t + \theta_v + \theta_i).
$$ {#eq-pinst}

The instantaneous power has two parts: a constant, and a sinusoid at **twice** the source frequency. On a $50\,\mathrm{Hz}$ supply the power pulsates at $100\,\mathrm{Hz}$, which is why a badly filtered mains transformer hums at $100\,\mathrm{Hz}$ rather than $50$. The double-frequency term averages to zero over any whole period, so the average is the constant term alone.

::: definition Average power {#def-pavg}
The **average power** (also called **real** or **active power**) absorbed by an element with periodic voltage and current of period $T$ is

$$
P = \frac1T\int_{t_0}^{t_0+T} p(t)\,\mathrm{d}t,
$$

measured in watts. In the sinusoidal steady state, by [[#eq-pinst]],

$$
P = \tfrac12 V_m I_m\cos(\theta_v - \theta_i).
$$ {#eq-pavg}
:::

Only the **difference** of the phases matters, and the cosine is even, so it does not matter whether we write $\theta_v - \theta_i$ or $\theta_i - \theta_v$. In phasor form, with $\mathbf V = V_m\angle\theta_v$ and $\mathbf I = I_m\angle\theta_i$,

$$
P = \tfrac12\,\mathrm{Re}\bigl[\mathbf V\,\mathbf I^*\bigr],
$$

because $\mathbf V\mathbf I^* = V_m I_m\angle(\theta_v - \theta_i)$. The asterisk denotes the complex conjugate. We shall meet this product again as the complex power.

Two special cases deserve to be fixed in your mind.

- **Resistor.** $\theta_v = \theta_i$, so $P = \tfrac12 V_m I_m = \tfrac12 I_m^2 R = V_m^2/(2R)$. The instantaneous power $p(t) = \tfrac12 V_mI_m[1 + \cos(2\omega t + 2\theta_v)]$ is never negative: a resistor always absorbs energy.
- **Inductor or capacitor.** $\theta_v - \theta_i = \pm 90^\circ$, so $P = 0$. The power oscillates at $2\omega$ with equal positive and negative halves: in one quarter-cycle the element stores energy in its field, in the next it returns it to the source. An ideal reactive element absorbs no average power.

::: intuition Splitting the current into two parts
Write $\theta = \theta_v - \theta_i$ and resolve the current into a component in phase with the voltage, of amplitude $I_m\cos\theta$, and a component in quadrature, of amplitude $I_m\sin\theta$. The in-phase part behaves like the current of a resistor and carries net energy; the quadrature part behaves like the current of an inductor or capacitor and only shuttles energy back and forth. Expanding $p(t)$ with $a = \omega t + \theta_v$ gives exactly this split:

$$
p(t) = P\bigl[1 + \cos 2a\bigr] + Q\sin 2a, \qquad P = \tfrac12 V_m I_m\cos\theta,\quad Q = \tfrac12 V_m I_m\sin\theta.
$$

The first term is never negative and averages to $P$; the second averages to zero and has peak value $Q$. That $Q$ is the reactive power defined below.
:::

::: example Average power from the waveforms {#ex-pavg}
The voltage across a load and the current into it are $v(t) = 120\cos(377t + 45^\circ)\,\mathrm{V}$ and $i(t) = 10\cos(377t - 10^\circ)\,\mathrm{A}$. Find the average power absorbed and the maximum and minimum of $p(t)$.
::: solution
The phase difference is $\theta = 45^\circ - (-10^\circ) = 55^\circ$. By [[#eq-pavg]],

$$
P = \tfrac12(120)(10)\cos 55^\circ = 600 \times 0.5736 = 344\,\mathrm{W}.
$$

The oscillating term in [[#eq-pinst]] has amplitude $\tfrac12 V_mI_m = 600\,\mathrm{W}$, so $p(t)$ swings between $344 + 600 = 944\,\mathrm{W}$ and $344 - 600 = -256\,\mathrm{W}$. For part of each cycle the load returns energy to the source: it must contain an energy-storing element. The frequency of the pulsation is $2\omega = 754\,\mathrm{rad/s}$, that is $120\,\mathrm{Hz}$ on this $60\,\mathrm{Hz}$ system.
:::
:::

::: widget plot
f: cos(x); 0.8*cos(x - th); 0.8*cos(x)*cos(x - th); 0.4*cos(th)
x: 0, 4pi
y: -1.1, 1.1
piticks: true
sliders: th=1:-1.5708:1.5708:0.01
labels: v(t); i(t); p(t); P
caption: Voltage of amplitude $1$, current of amplitude $0.8$ lagging by the angle $\theta$ (slider, in radians), the instantaneous power $p(t)$ and its average $P$. At $\theta = 0$ the power never goes negative. Increase $\theta$ towards $\pi/2 \approx 1.57$: the power curve slides down until its average is zero, and the area above the axis equals the area below. Notice that $p(t)$ always oscillates at twice the frequency of $v$ and $i$.
:::

## Effective or RMS value

A $230\,\mathrm{V}$ supply does not have a peak of $230\,\mathrm{V}$; its peak is about $325\,\mathrm{V}$. The quoted number is chosen so that the familiar DC formulas for power in a resistor keep working.

::: definition Effective (RMS) value {#def-rms-general}
The **effective value** of a periodic current $i(t)$ of period $T$ is the constant (DC) current that delivers the same average power to a resistor. Equating $\frac1T\int_0^T i^2R\,\mathrm{d}t = I_{\text{eff}}^2 R$ gives

$$
I_{\text{rms}} = \sqrt{\frac1T\int_0^T i^2(t)\,\mathrm{d}t},
$$ {#eq-rms}

the square root of the mean of the square, hence **root-mean-square**. The same definition applies to voltages.
:::

For a sinusoid the mean of $\cos^2$ over a period is $\tfrac12$, so $I_{\text{rms}} = I_m/\sqrt2$, as in [[circuits-2/sinusoids-phasors#def-rms]]. For other waveforms the factor is different: a square wave of amplitude $A$ has RMS value $A$ (its square is constant), and a symmetric triangle wave of peak $A$ has $A/\sqrt3$.

Written with RMS values, the average power [[#eq-pavg]] loses its factor $\tfrac12$:

$$
P = V_{\text{rms}}I_{\text{rms}}\cos(\theta_v - \theta_i) = I_{\text{rms}}^2 R = \frac{V_{\text{rms}}^2}{R}\ \text{(for a resistor)}.
$$

This is why power engineers work with **RMS phasors** throughout: a phasor whose magnitude is the RMS value rather than the peak. The angle is unchanged. Most of the rest of this lesson uses RMS phasors, and says so.

::: proposition RMS value of a sum of sinusoids of different frequencies {#prop-rms-sum}
If $v(t) = V_0 + \sum_{k=1}^{N} V_k\cos(\omega_k t + \phi_k)$ with distinct positive frequencies $\omega_k$ that are all integer multiples of a common fundamental, then

$$
V_{\text{rms}} = \sqrt{V_0^2 + \sum_{k=1}^{N} \frac{V_k^2}{2}} = \sqrt{V_0^2 + V_{1,\text{rms}}^2 + \cdots + V_{N,\text{rms}}^2}.
$$
:::

::: proof
Square $v(t)$ and average over the common period $T$. Each squared term averages to $V_0^2$ or $V_k^2/2$. Every cross term is either $V_0V_k\cos(\omega_k t+\phi_k)$, which averages to zero, or a product of two cosines at different frequencies $\omega_j \neq \omega_k$, which by the product formula equals a sum of cosines at $\omega_j \pm \omega_k \neq 0$; both average to zero over $T$ because $\omega_j\pm\omega_k$ are non-zero multiples of $2\pi/T$. Only the squared terms survive.
:::

Components of different frequencies therefore add **in power**, not in amplitude. The same is not true of two sinusoids at the *same* frequency: those must first be combined into one phasor.

::: example RMS value of a distorted waveform {#ex-rms-sum}
Find the RMS value of $v(t) = 4 + 6\cos(100t) + 3\cos(300t + 30^\circ)\,\mathrm{V}$, and the average power it delivers to a $10\,\Omega$ resistor.
::: solution
The frequencies $0$, $100$ and $300\,\mathrm{rad/s}$ are distinct multiples of $100\,\mathrm{rad/s}$, so [[#prop-rms-sum]] applies:

$$
V_{\text{rms}} = \sqrt{4^2 + \frac{6^2}{2} + \frac{3^2}{2}} = \sqrt{16 + 18 + 4.5} = \sqrt{38.5} = 6.20\,\mathrm{V}.
$$

The average power is $V_{\text{rms}}^2/R = 38.5/10 = 3.85\,\mathrm{W}$: $1.6\,\mathrm{W}$ from the DC component, $1.8\,\mathrm{W}$ from the fundamental and $0.45\,\mathrm{W}$ from the third harmonic. Adding the amplitudes, $4 + 6 + 3 = 13\,\mathrm{V}$, gives the largest possible instantaneous value, not the RMS value.
:::
:::

::: warning Peak or RMS?
Every AC formula has two versions: $P = \tfrac12 V_mI_m\cos\theta$ with peak values and $P = V_{\text{rms}}I_{\text{rms}}\cos\theta$ with RMS values. Mixing them (a peak voltage with an RMS current) gives an answer off by $\sqrt2$, and using peak values in the RMS formula doubles the power. Mains voltages, meter readings and equipment ratings are RMS; oscilloscope readings and component breakdown limits are usually peak. Write "rms" or "peak" next to every number until it becomes a habit.
:::

## Apparent power, power factor and reactive power

The product $V_{\text{rms}}I_{\text{rms}}$ would be the power if the load were a resistor. It is the quantity that sizes the equipment: a transformer winding heats according to its current and its insulation is stressed according to its voltage, regardless of the phase between them.

::: definition Apparent power and power factor {#def-pf}
The **apparent power** of a load is $S = V_{\text{rms}}I_{\text{rms}}$, measured in **volt-amperes** (VA). The **power factor** is the ratio

$$
\mathrm{pf} = \frac{P}{S} = \cos(\theta_v - \theta_i),
$$

and $\theta_v - \theta_i$ is the **power-factor angle**. For a passive load it equals the angle of the load impedance $Z = \abs{Z}\angle\theta_Z$, since $\mathbf V = Z\mathbf I$ gives $\theta_v - \theta_i = \theta_Z$. The power factor is called **lagging** when the current lags the voltage ($\theta_Z > 0$, inductive load) and **leading** when the current leads ($\theta_Z < 0$, capacitive load).
:::

The power factor lies between $0$ and $1$ for a passive load, and on its own it does not tell you the sign of the angle; that is why "lagging" or "leading" must always be stated. A power factor of $0.8$ lagging means $\theta_Z = +36.87^\circ$.

The remaining part of the apparent power is the **reactive power**

$$
Q = V_{\text{rms}}I_{\text{rms}}\sin(\theta_v - \theta_i),
$$

measured in **volt-amperes reactive** (var). From the intuition box above, $Q$ is the amplitude of the part of $p(t)$ that averages to zero: the rate at which energy is exchanged back and forth between the source and the fields of the load. By convention $Q > 0$ for an inductive load, which "absorbs" reactive power, and $Q < 0$ for a capacitive load, which "supplies" it.

## Complex power

The three quantities $P$, $Q$ and $S$ fit into a single complex number.

::: definition Complex power {#def-complex-power}
With RMS phasors $\mathbf V$ and $\mathbf I$ in the passive sign convention, the **complex power** absorbed is

$$
\mathbf S = \mathbf V\,\mathbf I^* = V_{\text{rms}}I_{\text{rms}}\angle(\theta_v - \theta_i) = P + jQ.
$$ {#eq-complex-power}

Its magnitude $\abs{\mathbf S}$ is the apparent power, its real part the average power and its imaginary part the reactive power. If peak phasors are used instead, $\mathbf S = \tfrac12\mathbf V\mathbf I^*$.
:::

The conjugate is essential: $\mathbf V\mathbf I$ would have angle $\theta_v + \theta_i$, which depends on the arbitrary choice of time origin, whereas the physics depends only on the difference. For a load of impedance $Z = R + jX$ carrying RMS current $\mathbf I$,

$$
\mathbf S = Z\mathbf I\,\mathbf I^* = \abs{\mathbf I}^2 Z = I_{\text{rms}}^2R + jI_{\text{rms}}^2X = \frac{\abs{\mathbf V}^2}{Z^*},
$$ {#eq-s-z}

so $P = I_{\text{rms}}^2R$ is dissipated in the resistance and $Q = I_{\text{rms}}^2X$ is associated with the reactance. The **power triangle** is the right triangle in the complex plane with horizontal side $P$, vertical side $Q$ and hypotenuse $\abs{\mathbf S}$; its angle at the origin is the power-factor angle.

::: example Complex power of an inductive load {#ex-complex-power}
A load $Z = 30 + j40\,\Omega$ is connected to a $230\,\mathrm{V}$ (rms), $50\,\mathrm{Hz}$ supply. Find the current, the complex power, the apparent power and the power factor.
::: solution
Take the voltage as reference, $\mathbf V = 230\angle 0^\circ\,\mathrm{V}$ (rms). The impedance is $Z = 50\angle 53.13^\circ\,\Omega$, so

$$
\mathbf I = \frac{\mathbf V}{Z} = \frac{230\angle 0^\circ}{50\angle 53.13^\circ} = 4.6\angle -53.13^\circ\,\mathrm{A}\ (\text{rms}).
$$

The complex power is

$$
\mathbf S = \mathbf V\mathbf I^* = (230)(4.6)\angle 53.13^\circ = 1058\angle 53.13^\circ = 634.8 + j846.4\,\mathrm{VA}.
$$

So $P = 634.8\,\mathrm{W}$, $Q = 846.4\,\mathrm{var}$, $\abs{\mathbf S} = 1058\,\mathrm{VA}$ and the power factor is $\cos 53.13^\circ = 0.6$ lagging. As a check with [[#eq-s-z]]: $I^2R = 4.6^2\times30 = 634.8\,\mathrm{W}$ and $I^2X = 4.6^2\times40 = 846.4\,\mathrm{var}$. The supply must deliver $4.6\,\mathrm{A}$ although a resistive load taking the same $634.8\,\mathrm{W}$ would need only $2.76\,\mathrm{A}$.
:::
:::

The most useful property of complex power is that it adds, element by element, whatever the connection.

::: theorem Conservation of complex power {#thm-conservation}
In any circuit operating in the sinusoidal steady state at a single frequency, the sum of the complex powers absorbed by all the elements is zero. Equivalently, the complex power delivered by the sources equals the sum of the complex powers absorbed by the other elements; separately, $\sum P = 0$ and $\sum Q = 0$.
:::

::: proof
Number the branches $1,\dots,b$ and give each a voltage phasor $\mathbf V_k$ and current phasor $\mathbf I_k$ in the passive convention. Choose a reference node and let $\mathbf e$ be the vector of node-voltage phasors. KVL says each branch voltage is a difference of node voltages, $\mathbf V = A^{\mathsf T}\mathbf e$, where $A$ is the node-branch incidence matrix (entries $+1$, $-1$, $0$). KCL at the non-reference nodes says $A\mathbf I = \mathbf 0$; since $A$ is real, conjugating gives $A\mathbf I^* = \mathbf 0$. Then

$$
\sum_{k}\mathbf V_k\mathbf I_k^* = (A^{\mathsf T}\mathbf e)^{\mathsf T}\mathbf I^* = \mathbf e^{\mathsf T}(A\mathbf I^*) = 0.
$$

Only Kirchhoff's laws were used, not the element laws, so the result holds for any elements. (This is Tellegen's theorem in phasor form.)
:::

In practice this means that the complex powers of loads in parallel or in series simply add, and the source must supply the total. Average powers add, reactive powers add with their signs, but **apparent powers do not add** in general.

::: example Two loads on one feeder {#ex-two-loads}
A $240\,\mathrm{V}$ (rms) single-phase supply feeds two loads in parallel: a motor drawing $10\,\mathrm{kW}$ at power factor $0.8$ lagging, and a capacitive load of $5\,\mathrm{kVA}$ at power factor $0.6$ leading. Find the total complex power, the overall power factor and the supply current.
::: solution
For the motor, $\abs{\mathbf S_1} = P_1/\mathrm{pf} = 10/0.8 = 12.5\,\mathrm{kVA}$ and $Q_1 = \abs{\mathbf S_1}\sin\theta_1 = 12.5\times0.6 = 7.5\,\mathrm{kvar}$ (positive, lagging): $\mathbf S_1 = 10 + j7.5\,\mathrm{kVA}$.

For the capacitive load, $P_2 = 5\times0.6 = 3\,\mathrm{kW}$ and $Q_2 = -5\times0.8 = -4\,\mathrm{kvar}$: $\mathbf S_2 = 3 - j4\,\mathrm{kVA}$.

By [[#thm-conservation]] the supply delivers

$$
\mathbf S = \mathbf S_1 + \mathbf S_2 = 13 + j3.5\,\mathrm{kVA}, \qquad \abs{\mathbf S} = \sqrt{13^2 + 3.5^2} = 13.46\,\mathrm{kVA}.
$$

The overall power factor is $13/13.46 = 0.966$ lagging (since $Q > 0$), and the supply current is $\abs{\mathbf S}/V = 13\,463/240 = 56.1\,\mathrm{A}$. Note that $12.5 + 5 = 17.5\,\mathrm{kVA}$ would be wrong: the leading reactive power of the second load partly cancels the lagging reactive power of the motor.
:::
:::

::: quiz
A load absorbs $\mathbf S = 600 - j800\,\mathrm{VA}$. Which statement is true?
- [ ] The power factor is $0.6$ lagging and the load is inductive.
- [x] The power factor is $0.6$ leading and the load is capacitive.
- [ ] The power factor is $0.8$ leading.
- [ ] The load absorbs $1000\,\mathrm{W}$.
::: solution
$\abs{\mathbf S} = \sqrt{600^2 + 800^2} = 1000\,\mathrm{VA}$, so $\mathrm{pf} = P/\abs{\mathbf S} = 0.6$. The reactive power is negative, so the load supplies reactive power: it is capacitive and the current leads the voltage. The average power is $600\,\mathrm{W}$; $1000$ is the apparent power in VA.
:::
:::

## Maximum average power transfer

In [[circuits-1/network-theorems]] you found that a resistive source delivers most power to a load equal to its internal resistance. With reactance present, the load can also cancel the source reactance.

::: theorem Maximum average power transfer {#thm-mpt}
Let a linear network be represented at its terminals by its Thévenin equivalent, a source $\mathbf V_{\text{th}}$ in series with $Z_{\text{th}} = R_{\text{th}} + jX_{\text{th}}$, with $R_{\text{th}} > 0$. Over all load impedances $Z_L = R_L + jX_L$ with $R_L \ge 0$, the average power delivered to the load is maximised by the **conjugate match**

$$
Z_L = Z_{\text{th}}^* = R_{\text{th}} - jX_{\text{th}},
$$

and the maximum is

$$
P_{\max} = \frac{\abs{\mathbf V_{\text{th}}}^2}{8R_{\text{th}}}\ \ (\mathbf V_{\text{th}}\ \text{peak}) \qquad\text{or}\qquad P_{\max} = \frac{V_{\text{th,rms}}^2}{4R_{\text{th}}}\ \ (\text{rms}).
$$ {#eq-pmax}
:::

::: proof
With peak phasors the load current is $\mathbf I = \mathbf V_{\text{th}}/(Z_{\text{th}} + Z_L)$, so

$$
P = \tfrac12\abs{\mathbf I}^2R_L = \frac{\abs{\mathbf V_{\text{th}}}^2}{2}\,\frac{R_L}{(R_{\text{th}} + R_L)^2 + (X_{\text{th}} + X_L)^2}.
$$

The reactance $X_L$ appears only in the denominator, inside a square, so for any fixed $R_L$ the power is largest when $X_L = -X_{\text{th}}$. With that choice $P = \tfrac12\abs{\mathbf V_{\text{th}}}^2 R_L/(R_{\text{th}}+R_L)^2$, which is the resistive problem: setting $\mathrm{d}P/\mathrm{d}R_L \propto (R_{\text{th}} + R_L) - 2R_L = 0$ gives $R_L = R_{\text{th}}$, and substituting gives $P_{\max} = \abs{\mathbf V_{\text{th}}}^2/(8R_{\text{th}})$.
:::

At the conjugate match the total loop impedance is $2R_{\text{th}}$, purely resistive: the load reactance resonates with the source reactance. Exactly half the power produced by the Thévenin source is dissipated in $R_{\text{th}}$, so the efficiency is only $50\,\%$. That is acceptable for a radio receiver extracting a weak signal from an antenna, and unacceptable for a power system, where the load impedance is far larger than the source impedance and efficiency is close to $100\,\%$.

If the load must be a pure resistance (no reactance available), the same algebra with $X_L = 0$ shows that the best choice is $R_L = \abs{Z_{\text{th}}}$; this is exercise [[#exr-resistive-load]].

::: example Matching to an RC source {#ex-mpt}
In [[circuits-2/ac-analysis]] the Thévenin equivalent of a network at its output was $\mathbf V_{\text{th}} = 9.6 - j4.8\,\mathrm{V}$ (peak) with $Z_{\text{th}} = 8 - j4\,\Omega$. Find the load that absorbs maximum average power and that power. Compare with the best purely resistive load.
::: solution
By [[#thm-mpt]] the load is $Z_L = Z_{\text{th}}^* = 8 + j4\,\Omega$, a resistor in series with an inductive reactance of $4\,\Omega$. Since $\abs{\mathbf V_{\text{th}}}^2 = 9.6^2 + 4.8^2 = 115.2\,\mathrm{V^2}$,

$$
P_{\max} = \frac{115.2}{8\times 8} = 1.80\,\mathrm{W}.
$$

With a resistor only, the best value is $R_L = \abs{Z_{\text{th}}} = \sqrt{8^2 + 4^2} = 8.94\,\Omega$. Then $\abs{\mathbf I}^2 = 115.2/[(8 + 8.94)^2 + 4^2] = 115.2/302.9 = 0.380\,\mathrm{A^2}$ and $P = \tfrac12(0.380)(8.94) = 1.70\,\mathrm{W}$, about $6\,\%$ less than the conjugate match.
:::
:::

::: widget plot
f: 0.5*115.2*x/((8 + x)^2 + (b - 4)^2)
x: 0, 40
y: 0, 2
sliders: b=0:-10:10:0.1
hlines: 1.8
caption: Average power (W) delivered by the source of the example ($\abs{\mathbf V_{\text{th}}}^2 = 115.2\,\mathrm{V^2}$ peak, $Z_{\text{th}} = 8 - j4\,\Omega$) into a load $Z_L = R_L + jb$, plotted against $R_L$ in ohms. With $b = 0$ the best resistance is about $8.9\,\Omega$. Move $b$ to $+4$: the curve rises to touch the line $1.8\,\mathrm{W}$ at $R_L = 8\,\Omega$, the conjugate match. Notice how flat the peak is: a load within a factor of two of the optimum still receives most of the available power.
:::

## Power-factor correction

Most industrial loads are inductive: induction motors, transformers, fluorescent-lamp ballasts. Their lagging reactive power has to be carried by the supply, so the line current is larger than the real power requires. Since line losses go as $I^2R$ and conductor and transformer ratings go as $I$, utilities charge large customers for low power factor, and the customer installs capacitors at the load to supply the reactive power locally.

A capacitor in parallel with the load does not change the load's voltage, and therefore does not change the load's own $P$ and $Q$. It adds a negative reactive power $Q_C = -V_{\text{rms}}^2\,\omega C$ (from [[#eq-s-z]] with $Z = 1/(j\omega C)$, $\mathbf S = \abs{\mathbf V}^2/Z^* = -j\omega C\abs{\mathbf V}^2$), so the total reactive power seen by the supply falls while $P$ stays the same.

::: algorithm Power-factor correction with a shunt capacitor {#alg-pfc}
Given a load absorbing average power $P$ at power factor $\cos\theta_1$ (lagging) from an RMS voltage $V$ at angular frequency $\omega$, to raise the power factor to $\cos\theta_2$ (lagging, $\theta_2 < \theta_1$):

1. Compute the present reactive power $Q_1 = P\tan\theta_1$.
2. Compute the target reactive power $Q_2 = P\tan\theta_2$.
3. The capacitor must supply $Q_C = Q_1 - Q_2$.
4. Choose $C = \dfrac{Q_1 - Q_2}{\omega V^2} = \dfrac{P(\tan\theta_1 - \tan\theta_2)}{\omega V^2}$, and check its voltage rating against the peak voltage $\sqrt2 V$ plus a margin.
:::

::: example Correcting a motor to 0.95 lagging {#ex-pfc}
A single-phase motor takes $4\,\mathrm{kW}$ at power factor $0.75$ lagging from a $230\,\mathrm{V}$ (rms), $50\,\mathrm{Hz}$ supply. Find the capacitance that raises the power factor to $0.95$ lagging, and the supply current before and after.
::: solution
Here $\theta_1 = \arccos 0.75 = 41.41^\circ$ and $\theta_2 = \arccos 0.95 = 18.19^\circ$. Following [[#alg-pfc]]:

$$
Q_1 = 4000\tan 41.41^\circ = 3528\,\mathrm{var}, \qquad Q_2 = 4000\tan 18.19^\circ = 1315\,\mathrm{var},
$$

so the capacitor must supply $Q_C = 2213\,\mathrm{var}$ and

$$
C = \frac{2213}{(2\pi\times50)(230)^2} = \frac{2213}{314.16\times52\,900} = 133\,\mathrm{\mu F}.
$$

The supply current falls from $P/(V\,\mathrm{pf}_1) = 4000/(230\times0.75) = 23.2\,\mathrm{A}$ to $4000/(230\times0.95) = 18.3\,\mathrm{A}$, a reduction of $21\,\%$, and the $I^2R$ loss in the feeder falls by $38\,\%$. The motor itself is unaffected: it still draws $23.2\,\mathrm{A}$; the difference circulates locally between the motor and the capacitor. A practical choice is a $130$ or $140\,\mathrm{\mu F}$ AC-rated film capacitor with a rating of at least $400\,\mathrm{V}$ (the peak supply voltage is $325\,\mathrm{V}$).
:::
:::

::: remark Why not correct to unity?
The last few percent of power factor are expensive: going from $0.95$ to $1.0$ in the example would need another $1315\,\mathrm{var}$ of capacitance, 60 % more, to save only another $5\,\%$ of current. Over-correction is worse, because it makes the power factor leading, and a lightly loaded system with too much shunt capacitance can see its voltage rise. Utilities typically ask for $0.9$ to $0.95$. In installations with variable loads, banks of capacitors are switched in steps by a controller that measures $Q$.
:::

::: quiz
A capacitor is connected in parallel with an inductive load to correct its power factor. Which quantity does **not** change?
- [ ] The supply current
- [ ] The reactive power drawn from the supply
- [x] The average power drawn from the supply
- [ ] The apparent power drawn from the supply
::: solution
An ideal capacitor absorbs no average power, and the load's voltage, and therefore its $P$, is unchanged. The capacitor's negative reactive power reduces the total $Q$, hence $\abs{\mathbf S} = \sqrt{P^2+Q^2}$ and the current $\abs{\mathbf S}/V$.
:::
:::

## Measuring power and energy

A **wattmeter** measures average power. The classical electrodynamometer instrument has a fixed current coil carrying the load current and a moving potential coil connected across the load voltage; the torque is proportional to the instantaneous product $v\,i$ and the inertia of the movement averages it, so the pointer reads $V_{\text{rms}}I_{\text{rms}}\cos\theta$. A modern digital power meter samples $v$ and $i$ thousands of times per cycle and computes $\frac1N\sum v_n i_n$ directly, which is the definition [[#def-pavg]] and works for any waveform, sinusoidal or not.

The utility's energy meter integrates the average power over time. One kilowatt-hour is $3.6\,\mathrm{MJ}$. Large customers are also metered for reactive energy in kvarh, and their tariff penalises a low ratio of kWh to kVAh.

::: application Power factor and non-sinusoidal loads
A modern switch-mode power supply draws current in short pulses near the voltage peaks. Even if those pulses are centred on the voltage peaks, so that the fundamental component of the current is in phase with the voltage, the power factor is poor: the harmonic currents increase $I_{\text{rms}}$ (by [[#prop-rms-sum]]) without carrying average power from a sinusoidal supply. The true power factor $P/(V_{\text{rms}}I_{\text{rms}})$ is then the product of a **displacement factor** $\cos\theta_1$ and a **distortion factor** $I_{1,\text{rms}}/I_{\text{rms}}$. Standards such as IEC 61000-3-2 limit the harmonic currents of equipment, which is why laptop chargers above about $75\,\mathrm{W}$ contain an active power-factor-correction stage, a boost converter treated in [[power-electronics]].
:::

::: history
The maximum power theorem in its DC form is usually credited to Moritz von Jacobi, who stated it around 1840 in connection with battery-driven motors; its misreading as a design rule for power plants (where it would mean 50 % efficiency) delayed electric power for some years until Edison and others realised that a generator should have a small internal resistance compared with its load. With the rise of AC distribution in the late 1880s, metering became urgent: Oliver Shallenberger of Westinghouse produced an induction meter for alternating current in 1888. The separation of power into real and reactive parts was in use by the 1890s, following Steinmetz's complex-number method; the unit name **var** for reactive power was proposed by the Romanian engineer Constantin Budeanu and adopted by the International Electrotechnical Commission in 1930.
:::

## Where this leads

Complex power is the working language of power engineering. In [[circuits-2/three-phase-circuits]] the same quantities are computed per phase and multiplied by three, and the constant total power of a balanced three-phase system turns out to be one of its great advantages. In [[circuits-2/magnetically-coupled-circuits]] the ideal transformer conserves complex power and can be used to obtain the conjugate match of [[#thm-mpt]] between unequal impedances. Power flow in transmission networks, where the real power depends on the angle between bus voltages and the reactive power on their magnitudes, is the subject of [[power-systems]]; harmonics and active power-factor correction appear in [[power-electronics]].

::: summary
- The instantaneous power in the sinusoidal steady state is a constant plus a term at $2\omega$; its average is $P = \tfrac12V_mI_m\cos(\theta_v - \theta_i) = V_{\text{rms}}I_{\text{rms}}\cos(\theta_v - \theta_i)$.
- The RMS value is the DC equivalent for heating, $\sqrt{\overline{x^2}}$; for a sinusoid it is the peak over $\sqrt2$, and components at different frequencies add in squares.
- Apparent power $S = V_{\text{rms}}I_{\text{rms}}$ (VA) sizes equipment; the power factor $P/S = \cos\theta_Z$ must be stated as lagging (inductive) or leading (capacitive).
- Complex power $\mathbf S = \mathbf V\mathbf I^* = P + jQ = I_{\text{rms}}^2Z$ with RMS phasors; it is conserved in any circuit, so $P$ and $Q$ of loads add, but apparent powers do not.
- Maximum average power is delivered to the conjugate match $Z_L = Z_{\text{th}}^*$ and equals $V_{\text{th,rms}}^2/(4R_{\text{th}})$, at $50\,\%$ efficiency.
- Power-factor correction adds shunt capacitance $C = P(\tan\theta_1 - \tan\theta_2)/(\omega V^2)$, reducing line current and losses without changing the load's real power.
:::

## Exercises

::: exercise Average power from waveforms {level=1 check="10"}
An element has $v(t) = 20\cos(\omega t + 30^\circ)\,\mathrm{V}$ and $i(t) = 2\cos(\omega t - 30^\circ)\,\mathrm{A}$ (passive convention). Find the average power absorbed, in watts.
::: solution
$P = \tfrac12(20)(2)\cos(30^\circ - (-30^\circ)) = 20\cos 60^\circ = 10\,\mathrm{W}$.
:::
:::

::: exercise Mains peak {level=1 check="325/sqrt(2)"}
The peak value of a sinusoidal supply voltage is $325\,\mathrm{V}$. What is its RMS value, in volts?
::: solution
$V_{\text{rms}} = 325/\sqrt2 = 229.8\,\mathrm{V}$, the nominal $230\,\mathrm{V}$ of European supplies.
:::
:::

::: exercise Power factor of an impedance {level=1 check="0.6"}
What is the power factor of a load $Z = 6 + j8\,\Omega$? Is it leading or lagging?
::: solution
$\abs{Z} = 10\,\Omega$, so $\mathrm{pf} = \cos\theta_Z = R/\abs{Z} = 0.6$. The reactance is positive (inductive), so the power factor is $0.6$ lagging.
:::
:::

::: exercise Reactive power {level=2 check="360"}
An RMS voltage $\mathbf V = 120\angle 0^\circ\,\mathrm{V}$ drives an RMS current $\mathbf I = 5\angle -36.87^\circ\,\mathrm{A}$ into a load. Find $P$, $Q$ (in var, the answer to enter) and $\abs{\mathbf S}$.
::: solution
$\mathbf S = \mathbf V\mathbf I^* = 600\angle 36.87^\circ = 480 + j360\,\mathrm{VA}$. So $P = 480\,\mathrm{W}$, $Q = 360\,\mathrm{var}$ (inductive), $\abs{\mathbf S} = 600\,\mathrm{VA}$, power factor $0.8$ lagging.
:::
:::

::: exercise RMS with a DC offset {level=2 check="sqrt(17)"}
Find the RMS value, in volts, of $v(t) = 3 + 4\cos(\omega t)\,\mathrm{V}$.
::: hint
Use [[#prop-rms-sum]]: the DC term contributes $3^2$, the sinusoid $4^2/2$.
:::
::: solution
$V_{\text{rms}} = \sqrt{3^2 + 4^2/2} = \sqrt{9 + 8} = \sqrt{17} = 4.12\,\mathrm{V}$. Note that it is not $\sqrt{3^2 + 4^2} = 5$: that would treat the peak of the sinusoid as if it were RMS.
:::
:::

::: exercise A conjugate-matched load {level=2 check="20"}
A source has Thévenin equivalent $V_{\text{th}} = 20\,\mathrm{V}$ (rms) and $Z_{\text{th}} = 5 + j10\,\Omega$. Find the load impedance for maximum average power and the maximum power, in watts.
::: solution
$Z_L = Z_{\text{th}}^* = 5 - j10\,\Omega$ (a resistor in series with a capacitor). $P_{\max} = V_{\text{th,rms}}^2/(4R_{\text{th}}) = 400/20 = 20\,\mathrm{W}$.
:::
:::

::: exercise Correcting to unity {level=2 check="7500/(2*pi*60*240^2)"}
A load takes $10\,\mathrm{kW}$ at power factor $0.8$ lagging from a $240\,\mathrm{V}$ (rms), $60\,\mathrm{Hz}$ supply. What parallel capacitance, in farads, raises the power factor to $1$?
::: solution
$Q_1 = P\tan(\arccos 0.8) = 10\,000\times0.75 = 7500\,\mathrm{var}$ and $Q_2 = 0$. So $C = 7500/(2\pi\times60\times240^2) = 7500/(377\times57\,600) = 345\,\mathrm{\mu F}$.
:::
:::

::: exercise The best resistive load {#exr-resistive-load level=3}
A source $\mathbf V_{\text{th}}$, $Z_{\text{th}} = R_{\text{th}} + jX_{\text{th}}$ feeds a purely resistive load $R_L$. Prove that the average power is maximised when $R_L = \abs{Z_{\text{th}}}$.
::: hint
Write $P(R_L)$ with $X_L = 0$ and differentiate with respect to $R_L$.
:::
::: solution
With peak phasors, $P = \tfrac12\abs{\mathbf V_{\text{th}}}^2\,R_L/D$ with $D = (R_{\text{th}}+R_L)^2 + X_{\text{th}}^2$. Then

$$
\frac{\mathrm dP}{\mathrm dR_L} \propto \frac{D - R_L\cdot 2(R_{\text{th}} + R_L)}{D^2} = \frac{R_{\text{th}}^2 + X_{\text{th}}^2 - R_L^2}{D^2}.
$$

This is positive for $R_L < \sqrt{R_{\text{th}}^2 + X_{\text{th}}^2}$ and negative above it, so the maximum is at $R_L = \sqrt{R_{\text{th}}^2 + X_{\text{th}}^2} = \abs{Z_{\text{th}}}$. When $X_{\text{th}} = 0$ this reduces to the DC result $R_L = R_{\text{th}}$.
:::
:::

::: exercise Feeder losses and power factor {level=3}
The load of the exercise "Correcting to unity" ($10\,\mathrm{kW}$, $0.8$ lagging, $240\,\mathrm{V}$, $60\,\mathrm{Hz}$) is supplied through a feeder of total resistance $0.1\,\Omega$. (a) Find the feeder loss before and after correction to unity power factor, assuming the load voltage stays at $240\,\mathrm{V}$. (b) An installer mistakenly corrects to $0.95$ **leading**. What capacitance did they fit, and what is the feeder loss?
::: hint
The current is $P/(V\cdot\mathrm{pf})$. For a leading target, $Q_2 = -P\tan\theta_2$.
:::
::: solution
(a) Before: $I = 10\,000/(240\times0.8) = 52.1\,\mathrm{A}$, loss $I^2R = 52.1^2\times0.1 = 271\,\mathrm{W}$. After: $I = 10\,000/240 = 41.7\,\mathrm{A}$, loss $174\,\mathrm{W}$. Correction saves $97\,\mathrm{W}$, about $36\,\%$ of the feeder loss.

(b) The capacitor must now supply $Q_C = 7500 + 10\,000\tan(\arccos 0.95) = 7500 + 3287 = 10\,787\,\mathrm{var}$, so $C = 10\,787/(377\times57\,600) = 497\,\mathrm{\mu F}$, $44\,\%$ more capacitance than the correct unity design. The current is $10\,000/(240\times0.95) = 43.9\,\mathrm{A}$ and the loss $192\,\mathrm{W}$, worse than at unity power factor: the extra capacitors cost money and increase the losses.
:::
:::

::: exercise Reactive power and stored energy {level=3}
A capacitor $C$ carries the voltage $v(t) = V_m\cos\omega t$. (a) Show that its stored energy is $w(t) = \tfrac14CV_m^2(1 + \cos 2\omega t)$. (b) Show that its reactive power satisfies $\abs{Q} = 2\omega W_{\text{avg}}$, where $W_{\text{avg}}$ is the average stored energy. (c) Evaluate both for $C = 10\,\mathrm{\mu F}$, $V_m = 100\,\mathrm{V}$, $f = 50\,\mathrm{Hz}$.
::: solution
(a) $w = \tfrac12Cv^2 = \tfrac12CV_m^2\cos^2\omega t = \tfrac14CV_m^2(1 + \cos2\omega t)$.

(b) The average is $W_{\text{avg}} = \tfrac14CV_m^2$. The reactive power is $Q = -\abs{\mathbf V_{\text{rms}}}^2\omega C = -\tfrac12V_m^2\omega C$, so $\abs{Q} = 2\omega\cdot\tfrac14CV_m^2 = 2\omega W_{\text{avg}}$. Reactive power measures how much energy is stored and how often it is exchanged.

(c) $W_{\text{avg}} = \tfrac14(10^{-5})(100^2) = 25\,\mathrm{mJ}$ and $\abs{Q} = 2(314.16)(0.025) = 15.7\,\mathrm{var}$ (capacitive, $Q = -15.7\,\mathrm{var}$).
:::
:::
