Every circuit so far has been connected by wires: energy passed from one element to another only through a common node. Two coils placed close together can also exchange energy with no electrical connection at all. A changing current in one produces a changing magnetic flux, part of that flux passes through the other, and by Faraday's law it induces a voltage there. This **magnetic coupling** is how a phone charger steps $230\,\mathrm{V}$ down to a few volts while keeping you isolated from the mains, how a distribution transformer on a pole turns $11\,\mathrm{kV}$ into household voltage, how a wireless charging pad powers a phone through its case, and how a radio's tuned circuits pass a signal from stage to stage.

This lesson builds the circuit model of coupled coils. We define **mutual inductance** and the **dot convention** that fixes the sign of the induced voltage, write the phasor equations of coupled coils, and compute the energy they store, which shows that the coupling can never exceed a certain limit. We then analyse the **linear transformer**, where the secondary circuit appears in the primary as a **reflected impedance**, and take the limit of perfect coupling and infinite inductance to obtain the **ideal transformer**, the workhorse model of power engineering and the standard tool for impedance matching. The analysis uses the mesh method of [[circuits-2/ac-analysis]] and the inductor of [[circuits-1/capacitors-inductors]].

## Mutual inductance

A single coil of $N$ turns carrying current $i$ produces a flux $\phi$ in its core. Its **flux linkage** $\lambda = N\phi$ is proportional to $i$ in a linear medium, and the constant of proportionality is the self-inductance: $\lambda = Li$, $v = \mathrm d\lambda/\mathrm dt = L\,\mathrm di/\mathrm dt$.

Now bring a second coil close to the first. The flux produced by $i_1$ splits into a part $\phi_{11}$ that links only coil 1 (the **leakage flux**) and a part $\phi_{21}$ that also links coil 2. Coil 2 therefore has a flux linkage $\lambda_{21} = N_2\phi_{21}$ proportional to $i_1$, and a voltage appears across it even though no current flows in it.

::: definition Mutual inductance {#def-mutual}
For two coils in a linear medium, the **mutual inductance** $M_{21}$ is the flux linkage of coil 2 per unit current in coil 1, $M_{21} = \lambda_{21}/i_1$, and $M_{12} = \lambda_{12}/i_2$ similarly. In a linear medium $M_{12} = M_{21} = M$, measured in henries. With currents $i_1$ and $i_2$ flowing, the terminal voltages are

$$
v_1 = L_1\frac{\mathrm di_1}{\mathrm dt} \pm M\frac{\mathrm di_2}{\mathrm dt}, \qquad v_2 = \pm M\frac{\mathrm di_1}{\mathrm dt} + L_2\frac{\mathrm di_2}{\mathrm dt},
$$ {#eq-coupled}

where the sign of the mutual term depends on the winding directions and is fixed by the dot convention below.
:::

The equality $M_{12} = M_{21}$ is not obvious: the flux of coil 1 through coil 2 and the flux of coil 2 through coil 1 are different physical quantities. It follows from conservation of energy, as we show in [[#thm-energy]]. For two thin loops in air, the Neumann formula of electromagnetics gives the same symmetric double integral either way ([[electromagnetics]]).

### The dot convention

Whether the mutual voltage adds to or subtracts from the self-induced voltage depends on how each coil is wound around the shared flux, which a circuit diagram does not show. Instead the diagram marks one terminal of each coil with a dot.

::: definition Dot convention {#def-dot}
The dots are placed so that currents entering both dotted terminals produce fluxes that **add** in the shared magnetic path. Then, in [[#eq-coupled]] written in the passive sign convention for each coil:

- if both currents enter (or both leave) the dotted terminals, the mutual terms are $+M\,\mathrm di/\mathrm dt$;
- if one current enters a dotted terminal and the other leaves one, the mutual terms are $-M\,\mathrm di/\mathrm dt$.

Equivalently: a current entering the dotted terminal of one coil induces a voltage in the other coil that is positive at its dotted terminal.
:::

In the sinusoidal steady state, with phasors and the same sign rules,

$$
\mathbf V_1 = j\omega L_1\mathbf I_1 \pm j\omega M\mathbf I_2, \qquad \mathbf V_2 = \pm j\omega M\mathbf I_1 + j\omega L_2\mathbf I_2.
$$ {#eq-coupled-phasor}

The quantity $\omega M$ is the **mutual reactance**. In mesh analysis the mutual term behaves like a current-controlled voltage source in each mesh, with value $j\omega M$ times the current of the other coil.

::: warning Getting the mutual sign right
A sign error in the mutual term is the most common mistake in this chapter, and it is not caught by checking magnitudes. Decide the sign separately for **each** coil: look at the current through *the other* coil, see whether it enters that coil's dot, and put the $+$ of the induced voltage at the dot of the coil you are writing. Never decide it once for the whole circuit, and redraw the reference directions of the mesh currents on the diagram before writing any equation.
:::

::: example Series-aiding and series-opposing coils {#ex-series}
Two coils with $L_1 = 4\,\mathrm{mH}$, $L_2 = 9\,\mathrm{mH}$ and $M = 3\,\mathrm{mH}$ are connected in series. Find the total inductance when (a) the current enters both dots, (b) the current enters one dot and leaves the other. Explain how the two measurements give $M$.
::: solution
In series the same current $i$ flows through both coils, and the total voltage is $v = v_1 + v_2$.

(a) Both currents enter the dots, so $v_1 = L_1\,\mathrm di/\mathrm dt + M\,\mathrm di/\mathrm dt$ and $v_2 = M\,\mathrm di/\mathrm dt + L_2\,\mathrm di/\mathrm dt$. The total inductance is

$$
L_{\text{aid}} = L_1 + L_2 + 2M = 4 + 9 + 6 = 19\,\mathrm{mH}.
$$

(b) Now the mutual terms are negative: $L_{\text{opp}} = L_1 + L_2 - 2M = 7\,\mathrm{mH}$.

Subtracting, $L_{\text{aid}} - L_{\text{opp}} = 4M$, so measuring the inductance of the series pair both ways round with an LCR meter gives $M = (19 - 7)/4 = 3\,\mathrm{mH}$, and also tells you where the dots belong: the connection with the larger inductance is the aiding one.
:::
:::

## Energy and the coupling coefficient

The energy stored in a pair of coupled coils settles two questions at once: why $M_{12} = M_{21}$, and how large $M$ can be.

::: theorem Energy stored in coupled coils {#thm-energy}
Two coupled coils carrying currents $i_1$ and $i_2$ store the energy

$$
w = \tfrac12L_1i_1^2 + \tfrac12L_2i_2^2 \pm Mi_1i_2,
$$ {#eq-energy}

with $+$ if both currents enter (or both leave) the dotted terminals and $-$ otherwise. Moreover $M_{12} = M_{21}$, and

$$
M \le \sqrt{L_1L_2}.
$$
:::

::: proof
Start with both currents zero and bring them to their final values $I_1$, $I_2$ in two stages; take the case where both enter the dots. **Stage 1:** raise $i_1$ from $0$ to $I_1$ with $i_2 = 0$. The power into coil 1 is $v_1i_1 = L_1i_1\,\mathrm di_1/\mathrm dt$ and none enters coil 2 (no current), so the energy is $\int_0^{I_1}L_1i_1\,\mathrm di_1 = \tfrac12L_1I_1^2$. **Stage 2:** hold $i_1 = I_1$ and raise $i_2$ from $0$ to $I_2$. Coil 2 absorbs $\tfrac12L_2I_2^2$ in the same way, and coil 1, whose current is constant, has the voltage $M_{12}\,\mathrm di_2/\mathrm dt$ across it, so it absorbs $\int I_1M_{12}\,\mathrm di_2 = M_{12}I_1I_2$. In total $w = \tfrac12L_1I_1^2 + \tfrac12L_2I_2^2 + M_{12}I_1I_2$.

Raising the currents in the opposite order gives $M_{21}I_1I_2$ instead. The stored energy depends only on the final state (otherwise we could gain energy by cycling the currents round a loop of states), so $M_{12} = M_{21}$.

Finally, the stored energy of passive coils cannot be negative. Take the case with the minus sign and write $x = i_2/i_1$ ($i_1 \ne 0$):

$$
w = \tfrac12 i_1^2\bigl(L_1 - 2Mx + L_2x^2\bigr).
$$

This quadratic in $x$ is non-negative for all $x$ only if its discriminant satisfies $4M^2 - 4L_1L_2 \le 0$, that is $M \le \sqrt{L_1L_2}$. Its minimum, at $x = M/L_2$, equals $\tfrac12i_1^2(L_1 - M^2/L_2)$.
:::

::: definition Coupling coefficient {#def-k}
The **coupling coefficient** of two coils is

$$
k = \frac{M}{\sqrt{L_1L_2}}, \qquad 0 \le k \le 1.
$$

Coils with $k$ below about $0.5$ are **loosely coupled** (air-core coils, wireless charging pads); coils with $k$ close to $1$ are **tightly coupled** (windings on a common iron core). $k = 1$, **perfect coupling**, means that all the flux of each coil links the other.
:::

::: widget plot
f: 0.5 + 0.5*x^2 + k*x
x: -3, 3
y: -1, 4
sliders: k=0.5:-1.5:1.5:0.01
hlines: 0
caption: Energy stored in two coupled coils with $L_1 = L_2 = 1\,\mathrm{H}$ and $i_1 = 1\,\mathrm{A}$, as a function of $x = i_2$ (in amperes), for a coupling term $kx$. For $\abs{k} < 1$ the parabola stays above zero for every current. Move $k$ beyond $\pm1$: the energy dips below zero for some currents, which is physically impossible for passive coils. That is the content of $\abs{k} \le 1$. At exactly $k = -1$ the energy touches zero at $x = 1$: equal and opposite ampere-turns cancel the flux completely.
:::

::: example Stored energy {#ex-energy}
Two coils have $L_1 = 10\,\mathrm{mH}$, $L_2 = 40\,\mathrm{mH}$ and $M = 15\,\mathrm{mH}$. Find the coupling coefficient and the energy stored when $i_1 = 2\,\mathrm{A}$ and $i_2 = 1\,\mathrm{A}$, (a) both entering the dots, (b) $i_2$ leaving its dot.
::: solution
$k = 15/\sqrt{10\times40} = 15/20 = 0.75$. By [[#eq-energy]],

$$
w_{(a)} = \tfrac12(0.01)(2^2) + \tfrac12(0.04)(1^2) + (0.015)(2)(1) = 0.02 + 0.02 + 0.03 = 70\,\mathrm{mJ},
$$

and in case (b) the last term changes sign, $w_{(b)} = 0.02 + 0.02 - 0.03 = 10\,\mathrm{mJ}$. In (b) the two fluxes oppose and most of the field cancels; the energy is still positive, as it must be, because $k < 1$.
:::
:::

## The linear transformer

A **transformer** is a pair of coupled coils used to transfer energy from a source circuit, connected to the **primary** coil, to a load circuit, connected to the **secondary**. When the coils are wound on a non-magnetic former (or a core operated in its linear region) the model is [[#eq-coupled-phasor]], and the device is called a **linear transformer**.

Let the primary have a source $\mathbf V_s$ and winding resistance $R_1$, and let the secondary, of winding resistance $R_2$, be closed by a load $Z_L$. Take mesh currents $\mathbf I_1$ entering the primary dot and $\mathbf I_2$ entering the secondary dot. KVL around the two meshes, with the $+M$ sign, gives

$$
\begin{aligned}
(R_1 + j\omega L_1)\,\mathbf I_1 + j\omega M\,\mathbf I_2 &= \mathbf V_s,\\
j\omega M\,\mathbf I_1 + (R_2 + j\omega L_2 + Z_L)\,\mathbf I_2 &= 0.
\end{aligned}
$$ {#eq-mesh-xfmr}

::: theorem Reflected impedance {#thm-reflected}
Write $Z_{11} = R_1 + j\omega L_1$ and $Z_{22} = R_2 + j\omega L_2 + Z_L$ for the total self-impedances of the primary and secondary meshes. The impedance seen by the source is

$$
Z_{\text{in}} = \frac{\mathbf V_s}{\mathbf I_1} = Z_{11} + \frac{\omega^2M^2}{Z_{22}},
$$ {#eq-reflected}

and the secondary current is $\mathbf I_2 = -j\omega M\,\mathbf I_1/Z_{22}$. The term $Z_r = \omega^2M^2/Z_{22}$ is the **reflected impedance**. It does not depend on the location of the dots.
:::

::: proof
The second equation of [[#eq-mesh-xfmr]] gives $\mathbf I_2 = -j\omega M\mathbf I_1/Z_{22}$. Substituting in the first, $Z_{11}\mathbf I_1 + (j\omega M)(-j\omega M)\mathbf I_1/Z_{22} = \mathbf V_s$, and $(j\omega M)(-j\omega M) = \omega^2M^2$. If one dot is moved, both mutual terms change sign to $-j\omega M$, and their product, $\omega^2M^2$, is unchanged; only the sign of $\mathbf I_2$ changes.
:::

Because $\omega^2M^2$ is real and positive, $Z_r$ has the angle of $1/Z_{22}$, the negative of the angle of $Z_{22}$. The secondary mesh always contains $j\omega L_2$, so with a resistive load $Z_{22}$ is inductive and the reflected impedance is a resistance in series with a **capacitive** reactance, which partly cancels $j\omega L_1$. A secondary that is capacitive overall reflects as an inductive term. The reflected resistance is where the load's power appears in the primary circuit.

::: example A loosely coupled transformer {#ex-linear}
At the operating frequency a linear transformer has $j\omega L_1 = j8\,\Omega$, $j\omega L_2 = j6\,\Omega$ and $j\omega M = j4\,\Omega$, a primary resistance of $4\,\Omega$ and a $10\,\Omega$ resistive load on the secondary (winding resistance of the secondary neglected). The source is $\mathbf V_s = 100\angle 0^\circ\,\mathrm{V}$ (rms). Find $Z_{\text{in}}$, the primary and secondary currents and the power delivered to the load.
::: solution
First the coupling: $k = 4/\sqrt{8\times6} = 0.577$. With $Z_{22} = 10 + j6\,\Omega$,

$$
Z_r = \frac{\omega^2M^2}{Z_{22}} = \frac{16}{10 + j6} = \frac{16(10 - j6)}{136} = 1.176 - j0.706\,\Omega,
$$

so $Z_{\text{in}} = 4 + j8 + 1.176 - j0.706 = 5.176 + j7.294 = 8.944\angle 54.64^\circ\,\Omega$. Then

$$
\mathbf I_1 = \frac{100\angle 0^\circ}{8.944\angle 54.64^\circ} = 11.18\angle -54.64^\circ\,\mathrm{A}, \qquad
\mathbf I_2 = \frac{-j4\,\mathbf I_1}{10 + j6} = 3.835\angle -175.6^\circ\,\mathrm{A}.
$$

The load absorbs $\abs{\mathbf I_2}^2\times10 = 147.1\,\mathrm{W}$. As a check, the reflected resistance absorbs $\abs{\mathbf I_1}^2\times1.176 = 125\times1.176 = 147.1\,\mathrm{W}$, the same power: the reflected resistance is the load as the primary sees it. The primary resistance dissipates $125\times4 = 500\,\mathrm{W}$, and the source delivers $\mathrm{Re}[\mathbf V_s\mathbf I_1^*] = 647.1\,\mathrm{W}$ in total. With such loose coupling and a large primary resistance, this is a poor power transformer, but it is typical of a wireless-power link.
:::
:::

### The T-equivalent circuit

When the primary and secondary share a common terminal (or can be connected so without changing the analysis, which is the case whenever only the two-port behaviour matters), the coupled coils can be replaced by three uncoupled inductors in a T: $L_1 - M$ in the primary arm, $L_2 - M$ in the secondary arm and $M$ in the shunt arm, for currents entering both dots. Writing the mesh equations of the T reproduces [[#eq-coupled-phasor]] exactly. The T is convenient for simulation and reveals the structure of a real transformer: the shunt branch carries the magnetising current, and the series arms represent leakage. Note that $L_1 - M$ or $L_2 - M$ may be negative; the T is then a mathematical model, not a circuit you could build from components.

::: quiz
The secondary of a linear transformer is short-circuited ($Z_L = 0$, $R_2 = 0$). What is the input impedance, ignoring $R_1$?
- [ ] $j\omega L_1$, because the secondary carries no power
- [x] $j\omega L_1(1 - k^2)$
- [ ] $0$
- [ ] $j\omega(L_1 + M)$
::: solution
With $Z_{22} = j\omega L_2$, [[#eq-reflected]] gives $Z_{\text{in}} = j\omega L_1 + \omega^2M^2/(j\omega L_2) = j\omega L_1 - j\omega M^2/L_2 = j\omega L_1(1 - M^2/(L_1L_2))$. The shorted secondary cancels the shared flux, leaving only the leakage inductance $L_1(1 - k^2)$. Measuring the primary with the secondary shorted is the standard way to measure leakage.
:::
:::

## The ideal transformer

A power transformer has its windings on a laminated iron core of high permeability. Two consequences follow: almost all the flux stays in the core, so $k \approx 1$; and the inductances are very large, so the current needed to magnetise the core is tiny compared with the load current. The **ideal transformer** is the limit of both.

::: definition Ideal transformer {#def-ideal}
An **ideal transformer** is a pair of coupled coils with $N_1$ and $N_2$ turns that is lossless, perfectly coupled ($k = 1$), and of infinite self-inductances with $L_2/L_1 = (N_2/N_1)^2$. With **turns ratio** $n = N_2/N_1$, with $\mathbf V_1$ and $\mathbf V_2$ positive at the dotted terminals, $\mathbf I_1$ entering the primary dot and $\mathbf I_2$ **leaving** the secondary dot, its terminal laws are

$$
\frac{\mathbf V_2}{\mathbf V_1} = \frac{N_2}{N_1} = n, \qquad \frac{\mathbf I_2}{\mathbf I_1} = \frac{N_1}{N_2} = \frac1n.
$$ {#eq-ideal}

If one dot is reversed, both ratios change sign.
:::

The laws are easy to see physically. With perfect coupling the same flux $\phi$ threads every turn, so $v_1 = N_1\,\mathrm d\phi/\mathrm dt$ and $v_2 = N_2\,\mathrm d\phi/\mathrm dt$, giving $v_2/v_1 = N_2/N_1$. With infinite permeability, a finite flux requires zero net magnetomotive force, so the ampere-turns must balance: $N_1i_1 = N_2i_2$ with the reference directions above. The two laws imply $\mathbf V_1\mathbf I_1^* = \mathbf V_2\mathbf I_2^*$: an ideal transformer delivers to its secondary exactly the complex power it receives.

::: theorem Impedance transformation {#thm-impedance-transformation}
An ideal transformer with turns ratio $n = N_2/N_1$ and load $Z_L$ on its secondary presents at its primary the impedance

$$
Z_{\text{in}} = \frac{Z_L}{n^2} = \left(\frac{N_1}{N_2}\right)^2 Z_L.
$$ {#eq-zin-ideal}

This is the limit of the reflected impedance [[#eq-reflected]] of a lossless linear transformer as $k \to 1$ and $L_1, L_2 \to \infty$ with $L_2/L_1 = n^2$.
:::

::: proof
**From the terminal laws.** $Z_{\text{in}} = \mathbf V_1/\mathbf I_1 = (\mathbf V_2/n)/(n\mathbf I_2) = (1/n^2)(\mathbf V_2/\mathbf I_2) = Z_L/n^2$, since with $\mathbf I_2$ leaving the dot, $\mathbf V_2 = Z_L\mathbf I_2$.

**As a limit.** With $R_1 = R_2 = 0$ and $M^2 = L_1L_2$ (perfect coupling), [[#eq-reflected]] gives

$$
Z_{\text{in}} = j\omega L_1 + \frac{\omega^2L_1L_2}{j\omega L_2 + Z_L} = \frac{j\omega L_1(j\omega L_2 + Z_L) + \omega^2L_1L_2}{j\omega L_2 + Z_L} = \frac{j\omega L_1Z_L}{j\omega L_2 + Z_L}.
$$

Dividing numerator and denominator by $j\omega L_1$: $Z_{\text{in}} = Z_L/(L_2/L_1 + Z_L/(j\omega L_1))$. As $L_1 \to \infty$ with $L_2/L_1 = n^2$ fixed, the second term in the denominator vanishes and $Z_{\text{in}} \to Z_L/n^2$.
:::

The intermediate result is instructive: with $k = 1$ but finite $L_1$, $Z_{\text{in}} = (Z_L/n^2) \parallel j\omega L_1$. The finite primary inductance appears as a **magnetising inductance** in parallel with the reflected load. Real transformers are modelled by adding this and other non-ideal elements around an ideal core, as described at the end of the lesson.

::: example A distribution transformer {#ex-ideal}
A single-phase $2400/240\,\mathrm{V}$ transformer, assumed ideal, supplies a load $Z_L = 2.4 + j1.8\,\Omega$ connected to its $240\,\mathrm{V}$ secondary. Find the secondary and primary currents, the impedance seen by the $2400\,\mathrm{V}$ supply and the complex power.
::: solution
The turns ratio is $n = 240/2400 = 0.1$. With $\mathbf V_2 = 240\angle 0^\circ\,\mathrm{V}$ (rms) and $Z_L = 3\angle 36.87^\circ\,\Omega$,

$$
\mathbf I_2 = \frac{240}{3\angle 36.87^\circ} = 80\angle -36.87^\circ\,\mathrm{A}, \qquad \mathbf I_1 = n\,\mathbf I_2 = 8\angle -36.87^\circ\,\mathrm{A}.
$$

The supply sees $Z_{\text{in}} = Z_L/n^2 = 100(2.4 + j1.8) = 240 + j180\,\Omega$, and indeed $2400/300 = 8\,\mathrm{A}$. The complex power is $\mathbf V_2\mathbf I_2^* = 240\times80\angle 36.87^\circ = 15.36 + j11.52\,\mathrm{kVA}$, $19.2\,\mathrm{kVA}$ in magnitude, the same on both sides. A transformer rated $25\,\mathrm{kVA}$ would be chosen.
:::
:::

### Impedance matching

[[#thm-impedance-transformation]] makes the ideal transformer a lossless impedance converter. By [[circuits-2/ac-power#thm-mpt]] a source with internal resistance $R_s$ delivers maximum power to a load $R_s$; a transformer lets a load of a different value look like $R_s$.

::: example Matching a loudspeaker {#ex-matching}
An amplifier stage behaves as a source of $10\,\mathrm{V}$ (rms) with internal resistance $R_s = 800\,\Omega$. It is to drive an $8\,\Omega$ loudspeaker. Choose the turns ratio of an ideal output transformer for maximum power, and compare the power with that of a direct connection.
::: solution
For a match the speaker must appear as $800\,\Omega$: $8/n^2 = 800$, so $n = N_2/N_1 = \sqrt{8/800} = 0.1$, a $10{:}1$ step-down transformer. The power delivered is then

$$
P = \frac{V_s^2}{4R_s} = \frac{100}{3200} = 31.3\,\mathrm{mW}.
$$

Connected directly, the speaker draws $10/808\,\mathrm{A}$ and receives $(10/808)^2\times8 = 1.23\,\mathrm{mW}$. The transformer increases the power by a factor of $25.5$, with no amplification at all: it trades voltage for current. Valve audio amplifiers, whose output valves have internal resistances of kilohms, always use output transformers for this reason.
:::
:::

::: quiz
An ideal transformer has $500$ primary turns and $100$ secondary turns. A $4\,\Omega$ resistor is connected to the secondary. What resistance does the primary source see?
- [ ] $0.16\,\Omega$
- [ ] $20\,\Omega$
- [x] $100\,\Omega$
- [ ] $0.8\,\Omega$
::: solution
$n = 100/500 = 0.2$ and $Z_{\text{in}} = Z_L/n^2 = 4/0.04 = 100\,\Omega$. The impedance scales with the **square** of the turns ratio; a step-down transformer makes a small load look large from the primary.
:::
:::

## Real transformers

A real iron-core transformer differs from the ideal one in four ways, each represented by a circuit element around an ideal transformer (the **equivalent circuit** used in [[electric-machines]]):

- **winding resistances** $R_1$, $R_2$ in series with each winding (copper loss, proportional to $I^2$);
- **leakage reactances** $X_{\ell1}$, $X_{\ell2}$ in series, representing flux that links only one winding ($k$ slightly below $1$);
- a **magnetising reactance** $X_m$ in shunt across the primary, representing the finite permeability of the core; it draws a small lagging magnetising current even at no load;
- a **core-loss resistance** $R_c$ in shunt, representing hysteresis and eddy-current loss in the iron, which depends on voltage and frequency but not on load.

Large power transformers have efficiencies above $99\,\%$. The non-ideal elements are measured by an **open-circuit test** (secondary open, rated voltage: gives the shunt branch) and a **short-circuit test** (secondary shorted, reduced voltage, rated current: gives the series elements, as in the quiz on leakage above). The core also saturates if the voltage per turn per hertz is too high, which is why a $60\,\mathrm{Hz}$ transformer may overheat on $50\,\mathrm{Hz}$ at the same voltage.

::: application Isolation and safety
A transformer passes AC power but no DC path exists between its windings. A mains adapter's transformer isolates the low-voltage output from the line, so that touching the output is safe even though the primary is at $230\,\mathrm{V}$. In a modern switch-mode charger the transformer is small because it runs at tens or hundreds of kilohertz: by Faraday's law the peak flux is $V_m/(\omega N)$ for a sinusoid of peak $V_m$, so for a given voltage and core size the required number of turns falls in proportion to frequency.
:::

::: history
Michael Faraday discovered electromagnetic induction on 29 August 1831 with two coils wound on an iron ring, which was in effect the first transformer; Joseph Henry made similar observations independently in America. Induction coils were developed through the nineteenth century, and in 1881–1884 Lucien Gaulard and John Dixon Gibbs demonstrated an open-core "secondary generator" for AC lighting distribution. In 1885 Károly Zipernowsky, Ottó Bláthy and Miksa Déri of the Ganz company in Budapest built efficient closed-core transformers and proposed connecting them in parallel to the supply, the basis of all later distribution. William Stanley, working for Westinghouse, demonstrated a complete AC lighting system using transformers at Great Barrington, Massachusetts, in 1886. The concept of mutual inductance in circuit form, with the symmetric formula for two loops, goes back to Franz Neumann (1845).
:::

## Where this leads

Transformers appear throughout electrical engineering. [[circuits-2/three-phase-circuits]] are stepped up and down by three-phase transformer banks whose connections ($\mathrm Y$–$\Delta$ and so on) shift phases by $30^\circ$. The equivalent circuit, efficiency and voltage regulation of power transformers are studied in [[electric-machines]], and their per-unit modelling in [[power-systems]]. Coupled resonant circuits form the intermediate-frequency stages of radio receivers and the links of wireless power transfer; their frequency response uses the tools of [[circuits-2/frequency-response]]. A pair of coupled coils is also a **two-port network**, and its impedance parameters are exactly $L_1$, $L_2$ and $M$ (see [[circuits-2/two-port-networks]]). High-frequency transformers for switch-mode supplies are designed in [[power-electronics]].

::: summary
- A changing current in one coil induces a voltage $M\,\mathrm di/\mathrm dt$ in a coupled coil; $M_{12} = M_{21} = M$ in a linear medium.
- The dot convention fixes the sign: if both currents enter the dots the mutual terms are $+j\omega M\mathbf I$; otherwise they are negative. Decide the sign separately for each coil.
- Stored energy is $\tfrac12L_1i_1^2 + \tfrac12L_2i_2^2 \pm Mi_1i_2 \ge 0$, which forces $k = M/\sqrt{L_1L_2} \le 1$.
- A linear transformer presents $Z_{\text{in}} = Z_{11} + \omega^2M^2/Z_{22}$: the secondary appears in the primary as a reflected impedance that absorbs the load's power.
- An ideal transformer ($k = 1$, $L\to\infty$, lossless) obeys $\mathbf V_2/\mathbf V_1 = n$, $\mathbf I_2/\mathbf I_1 = 1/n$ with $n = N_2/N_1$, conserves complex power and transforms impedances by $1/n^2$.
- Turns ratios are chosen for voltage conversion, isolation and impedance matching; real transformers add winding resistance, leakage, magnetising reactance and core loss.
:::

## Exercises

::: exercise Mutual inductance from k {level=1 check="0.6*sqrt(4e-3*16e-3)"}
Two coils have $L_1 = 4\,\mathrm{mH}$ and $L_2 = 16\,\mathrm{mH}$ and coupling coefficient $0.6$. Find $M$ in henries.
::: solution
$M = k\sqrt{L_1L_2} = 0.6\sqrt{4\times16}\,\mathrm{mH} = 0.6\times8 = 4.8\,\mathrm{mH}$.
:::
:::

::: exercise A mains transformer {level=1 check="2*12/230"}
An ideal $230/12\,\mathrm{V}$ transformer supplies $2\,\mathrm{A}$ (rms) to a load on its $12\,\mathrm{V}$ winding. Find the primary current, in amperes.
::: solution
Power balance (or $\mathbf I_1 = n\mathbf I_2$ with $n = 12/230$): $I_1 = 2\times12/230 = 0.104\,\mathrm{A}$. The turns ratio $N_1{:}N_2$ is $19.2{:}1$.
:::
:::

::: exercise Reflected resistance {level=1 check="200"}
An $8\,\Omega$ resistor is connected to the secondary of an ideal $5{:}1$ step-down transformer ($N_1 = 5N_2$). What resistance, in ohms, does the primary source see?
::: solution
$n = 1/5$, so $Z_{\text{in}} = 8/n^2 = 8\times25 = 200\,\Omega$.
:::
:::

::: exercise Measuring M {level=2 check="4e-3"}
Two coils are connected in series. One way round, an LCR meter reads $30\,\mathrm{mH}$; reversing one coil gives $14\,\mathrm{mH}$. Find $M$ (in henries). If the coils measured separately are $12\,\mathrm{mH}$ and $10\,\mathrm{mH}$, what is $k$?
::: solution
$4M = 30 - 14 = 16\,\mathrm{mH}$, so $M = 4\,\mathrm{mH}$. Check: $L_1 + L_2 = (30 + 14)/2 = 22\,\mathrm{mH} = 12 + 10$. Then $k = 4/\sqrt{12\times10} = 0.365$.
:::
:::

::: exercise Input impedance of a linear transformer {level=2 check="2+256*30/2500"}
A linear transformer has $R_1 = 2\,\Omega$, $\omega L_1 = 10\,\Omega$, $\omega L_2 = 40\,\Omega$, $\omega M = 16\,\Omega$ and $R_2 = 0$, and a $30\,\Omega$ load. Find $Z_{\text{in}}$ and give its real part, in ohms.
::: solution
$Z_{22} = 30 + j40 = 50\angle 53.13^\circ\,\Omega$ and $Z_r = 256/(30 + j40) = 256(30 - j40)/2500 = 3.072 - j4.096\,\Omega$. So $Z_{\text{in}} = 2 + j10 + 3.072 - j4.096 = 5.072 + j5.904\,\Omega$. The real part is $5.072\,\Omega$, of which $3.072\,\Omega$ is the reflected load.
:::
:::

::: exercise Mesh equations with a reversed dot {level=2}
In [[#ex-linear]] the secondary winding is reversed, so that $\mathbf I_2$ (still the clockwise mesh current of the secondary) now **leaves** the secondary dot. Write the mesh equations and show that $\abs{\mathbf I_2}$ and the load power are unchanged.
::: hint
Both mutual terms become $-j\omega M$.
:::
::: solution
The equations become $(4 + j8)\mathbf I_1 - j4\mathbf I_2 = 100$ and $-j4\mathbf I_1 + (10 + j6)\mathbf I_2 = 0$. Then $\mathbf I_2 = +j4\mathbf I_1/(10 + j6)$ and $Z_{\text{in}} = 4 + j8 + (-j4)(j4)/(10 + j6) = 4 + j8 + 16/(10 + j6)$, the same as before. So $\mathbf I_1$ is unchanged and $\mathbf I_2$ has reversed sign: $3.835\angle 4.4^\circ\,\mathrm{A}$. The load power $\abs{\mathbf I_2}^2\times10 = 147.1\,\mathrm{W}$ is unchanged. Reversing a winding reverses the secondary voltage, which matters when windings are connected together, but not for a single load.
:::
:::

::: exercise Derive the T-equivalent {level=3}
Two coupled coils share a common lower terminal, and both currents $\mathbf I_1$, $\mathbf I_2$ enter the dotted (upper) terminals. Show that the T network with series arms $j\omega(L_1 - M)$, $j\omega(L_2 - M)$ and shunt arm $j\omega M$ has the same terminal equations. What changes if one dot is moved?
::: solution
In the T, the shunt arm carries $\mathbf I_1 + \mathbf I_2$. The voltage at port 1 is $\mathbf V_1 = j\omega(L_1 - M)\mathbf I_1 + j\omega M(\mathbf I_1 + \mathbf I_2) = j\omega L_1\mathbf I_1 + j\omega M\mathbf I_2$, and at port 2, $\mathbf V_2 = j\omega(L_2 - M)\mathbf I_2 + j\omega M(\mathbf I_1 + \mathbf I_2) = j\omega M\mathbf I_1 + j\omega L_2\mathbf I_2$. These are [[#eq-coupled-phasor]] with the $+$ sign. If one dot is moved, the mutual terms are $-j\omega M$, and the same calculation with $M$ replaced by $-M$ gives arms $j\omega(L_1 + M)$, $j\omega(L_2 + M)$ and a shunt arm $-j\omega M$, a negative inductance, realisable only as a mathematical model at a single frequency (where it equals a capacitance $1/(\omega^2M)$).
:::
:::

::: exercise Designing an output transformer {level=3}
A power stage has Thévenin resistance $2\,\mathrm{k\Omega}$ and is to drive an $8\,\Omega$ loudspeaker through an ideal transformer. (a) Choose the turns ratio $N_1{:}N_2$ for maximum power. (b) The same amplifier is later used with a $4\,\Omega$ speaker on the same transformer. What fraction of the maximum available power does that speaker receive? (c) Real output transformers have a finite primary inductance $L_1$. If the amplifier must deliver within $3\,\mathrm{dB}$ of full power down to $40\,\mathrm{Hz}$ into the matched load, estimate the minimum $L_1$.
::: hint
For (c), use the result after [[#thm-impedance-transformation]]: the source sees $R_s$ driving $(R_L/n^2)\parallel j\omega L_1$. The corner frequency is where $\omega L_1$ equals the parallel combination of $R_s$ and the reflected load.
:::
::: solution
(a) $8/n^2 = 2000$ gives $n = \sqrt{8/2000} = 0.0632$, so $N_1{:}N_2 = 15.8{:}1$.

(b) The $4\,\Omega$ speaker reflects as $4/n^2 = 1000\,\Omega$. The fraction of available power delivered to a resistance $R$ from a source $R_s$ is $4RR_s/(R + R_s)^2 = 4\times1000\times2000/3000^2 = 0.889$, so $89\,\%$, only $0.5\,\mathrm{dB}$ down. Matching is forgiving.

(c) Seen from the primary, the circuit is $R_s = 2\,\mathrm{k\Omega}$ in series with the parallel combination of the reflected load $2\,\mathrm{k\Omega}$ and $j\omega L_1$. This is a first-order high-pass response whose corner is at $\omega L_1 = R_s\parallel R' = 1\,\mathrm{k\Omega}$. For a corner at $40\,\mathrm{Hz}$: $L_1 = 1000/(2\pi\times40) = 3.98\,\mathrm{H}$. Output transformers indeed have primary inductances of several henries, which needs many turns on a large iron core; this is why they are heavy and expensive.
:::
:::

::: exercise Coupling and resonance {level=3}
Two identical resonant circuits, each an inductor $L = 100\,\mathrm{\mu H}$ in series with a capacitor $C$ and resistance $R = 2\,\Omega$, are coupled through their inductors with mutual inductance $M$. The first is driven at its resonant frequency $\omega_0 = 1/\sqrt{LC} = 10^6\,\mathrm{rad/s}$, and the second is closed on itself. (a) Show that at $\omega_0$ the input impedance is $Z_{\text{in}} = R + \omega_0^2M^2/R$. (b) For what $M$ is the power dissipated in the second circuit equal to that dissipated in the first? Give $k$.
::: solution
(a) At $\omega_0$ the reactances $j\omega_0L$ and $1/(j\omega_0C)$ cancel in each mesh, so $Z_{11} = Z_{22} = R$, and [[#eq-reflected]] gives $Z_{\text{in}} = R + \omega_0^2M^2/R$.

(b) We need $\omega_0^2M^2/R = R$, so $\omega_0M = R$ and $M = R/\omega_0 = 2/10^6 = 2\,\mathrm{\mu H}$. Then $k = M/L = 0.02$. This **critical coupling** is very loose; with a good resonator a few percent coupling is enough to transfer power efficiently, which is the principle of resonant wireless charging. The source then sees $2R = 4\,\Omega$, and half the power entering the first circuit is passed on to the second and dissipated there.
:::
:::
