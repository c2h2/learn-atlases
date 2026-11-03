Between the stages of an audio amplifier sits a coupling capacitor that passes the music and blocks the DC bias. At the end of a long mains cable a motor sees a slightly lower voltage than the substation sends, because the cable has inductance as well as resistance. A sensor's output network shifts the phase of its signal before it reaches the converter. To design any of these you need node voltages and branch currents in circuits with several sources, several meshes and a mixture of resistors, capacitors and inductors, in the sinusoidal steady state.

The good news is that you already know how. In [[circuits-2/sinusoids-phasors]] we found that, at one frequency, every element obeys $\mathbf V = Z\mathbf I$ and Kirchhoff's laws hold for phasors. Those are the only facts that the DC methods of [[circuits-1/nodal-mesh]] and [[circuits-1/network-theorems]] rely on. So nodal and mesh analysis, superposition, source transformation and the Thévenin and Norton theorems all carry over, with complex numbers in place of real ones. This lesson shows each method at work in the phasor domain, points out the few places where the complex version needs extra care (multiple frequencies, dependent sources, the meaning of a phase), and practises the habit that keeps complex arithmetic honest: checking every answer against an element law or a Kirchhoff law.

## From DC methods to phasor methods

::: theorem The DC methods hold in the phasor domain {#thm-ac}
Consider a linear circuit in the sinusoidal steady state at a single angular frequency $\omega$, with every element replaced by its impedance at $\omega$ and every independent source by its phasor. Then nodal analysis, mesh analysis, the voltage and current dividers, series–parallel and wye–delta reduction, source transformation, superposition, and the Thévenin and Norton theorems all hold exactly as in a resistive circuit, with resistances replaced by impedances, conductances by admittances, and real source values by phasors.
:::

::: proof
Each of the DC results is derived from three ingredients only: KCL, KVL, and element laws that are linear, $v = Ri$ for resistors and $v = r\,i_x$, $i = g\,v_x$ (and so on) for dependent sources. In the phasor domain KCL and KVL hold by [[circuits-2/sinusoids-phasors#thm-kirchhoff]], and every element law has the same linear form $\mathbf V = Z\mathbf I$ with a complex $Z$. The derivations use only addition, multiplication and division of the coefficients, which are the operations of any field. Since the complex numbers form a field, every step remains valid with complex coefficients, and so does every conclusion.
:::

The theorem has one standing condition: **one frequency at a time**. Impedances depend on $\omega$, so a circuit with sources at different frequencies is a different phasor-domain circuit at each of them. We return to that case under superposition.

There is one notational point. In the phasor domain the node voltages and mesh currents are complex unknowns, and a system of $n$ complex equations is equivalent to $2n$ real ones. By hand, two complex unknowns are comfortable; beyond that, use a calculator or a few lines of code with complex arithmetic. The structure, though, is exactly what you know.

### Dividers

::: proposition AC voltage and current dividers {#prop-acdiv}
For two impedances $Z_1$ and $Z_2$ in series across a voltage $\mathbf V$, the voltage across $Z_2$ is

$$
\mathbf V_2 = \frac{Z_2}{Z_1 + Z_2}\,\mathbf V.
$$

For two admittances $Y_1$ and $Y_2$ in parallel carrying a total current $\mathbf I$, the current in $Y_1$ is

$$
\mathbf I_1 = \frac{Y_1}{Y_1 + Y_2}\,\mathbf I = \frac{Z_2}{Z_1 + Z_2}\,\mathbf I.
$$
:::

::: proof
In series, $\mathbf I = \mathbf V/(Z_1 + Z_2)$ and $\mathbf V_2 = Z_2\mathbf I$. In parallel, $\mathbf V = \mathbf I/(Y_1 + Y_2)$ and $\mathbf I_1 = Y_1\mathbf V$; multiplying numerator and denominator by $Z_1Z_2$ gives the impedance form.
:::

The divider ratios are complex, so a divider can **shift the phase** as well as scale the magnitude, and with reactances of opposite sign the magnitude of the "fraction" can exceed one.

::: example A current divider {#ex-divider}
A current $\mathbf I = 1\angle0^\circ\,\mathrm A$ enters a $10\,\Omega$ resistor in parallel with a capacitor of impedance $-j10\,\Omega$. Find the current in each branch.
::: solution
The admittances are $Y_R = 0.1\,\mathrm S$ and $Y_C = 1/(-j10) = j0.1\,\mathrm S$. By [[#prop-acdiv]],

$$
\mathbf I_C = \frac{j0.1}{0.1 + j0.1}\,(1\angle0^\circ) = \frac{0.1\angle90^\circ}{0.1414\angle45^\circ} = 0.707\angle45^\circ = 0.5 + j0.5\,\mathrm A,
$$

and $\mathbf I_R = \mathbf I - \mathbf I_C = 0.5 - j0.5 = 0.707\angle-45^\circ\,\mathrm A$. Each branch carries $0.707\,\mathrm A$, and $0.707 + 0.707 = 1.414 \ne 1$: the branch currents are $90^\circ$ apart (the resistor current is in phase with the common voltage, the capacitor current leads it by $90^\circ$), and they add as phasors. Since the two admittances have equal magnitude, the current splits equally in magnitude; a DC divider with two equal resistors would also split equally, but with $0.5\,\mathrm A$ in each.
:::
:::

## Nodal analysis

::: algorithm Nodal analysis in the phasor domain {#alg-nodal}
1. Convert the circuit to the phasor domain at the source frequency.
2. Choose a reference node and label the other node-voltage phasors $\mathbf V_1, \dots, \mathbf V_n$.
3. Write KCL at each non-reference node: the sum of the currents leaving through the impedances, $(\mathbf V_k - \mathbf V_m)/Z_{km}$, equals the source current entering. Treat a voltage source between two non-reference nodes as a **supernode**, exactly as in [[circuits-1/nodal-mesh]].
4. Solve the complex linear system $\mathbf Y\,\mathbf v = \mathbf i_s$ and convert the answers back to time functions.
:::

Without dependent sources the **admittance matrix** $\mathbf Y$ has the same pattern as the conductance matrix of a resistive circuit: diagonal entry $k$ is the sum of all admittances connected to node $k$, and the off-diagonal entry $(k, m)$ is minus the admittance between nodes $k$ and $m$. It is symmetric, but its entries are complex.

::: example One unknown node {#ex-acnode}
A node is connected to a source $\mathbf V_s = 10\angle0^\circ\,\mathrm V$ through a capacitor of impedance $-j20\,\Omega$, and to the reference through a $10\,\Omega$ resistor. Find the node voltage $\mathbf V$.
::: solution
KCL at the node, with currents leaving:

$$
\frac{\mathbf V - 10}{-j20} + \frac{\mathbf V}{10} = 0.
$$

With $1/(-j20) = j0.05\,\mathrm S$ this is $\mathbf V(0.1 + j0.05) = j0.5$, so

$$
\mathbf V = \frac{j0.5}{0.1 + j0.05} = \frac{j0.5\,(0.1 - j0.05)}{0.1^2 + 0.05^2} = \frac{0.025 + j0.05}{0.0125} = 2 + j4 = 4.47\angle63.43^\circ\,\mathrm V.
$$

Check with the element laws: the capacitor current is $(10 - 2 - j4)\times j0.05 = 0.2 + j0.4\,\mathrm A$ and the resistor current is $(2 + j4)/10 = 0.2 + j0.4\,\mathrm A$, equal as KCL requires. The node voltage leads the source by $63.4^\circ$: this is the $RC$ high-pass circuit with the output across the resistor, and the output leads.
:::
:::

::: example Two nodes from a time-domain description {#ex-nodal2}
A current source $i_s(t) = 2\cos(1000t)\,\mathrm A$ injects current into node 1. Node 1 is connected to the reference by $R_1 = 10\,\Omega$ and to node 2 by an inductor $L = 10\,\mathrm{mH}$. Node 2 is connected to the reference by a capacitor $C = 50\,\mathrm{\mu F}$ in parallel with $R_2 = 20\,\Omega$. Find $v_1(t)$ and $v_2(t)$.
::: solution
At $\omega = 1000\,\mathrm{rad/s}$: $Z_L = j10\,\Omega$, so $Y_L = -j0.1\,\mathrm S$; $Z_C = -j20\,\Omega$, so $Y_C = j0.05\,\mathrm S$; and $\mathbf I_s = 2\angle0^\circ\,\mathrm A$. KCL at the two nodes:

$$
\begin{aligned}
\text{node 1:}\quad & \frac{\mathbf V_1}{10} + \frac{\mathbf V_1 - \mathbf V_2}{j10} = 2,\\
\text{node 2:}\quad & \frac{\mathbf V_2 - \mathbf V_1}{j10} + \frac{\mathbf V_2}{-j20} + \frac{\mathbf V_2}{20} = 0.
\end{aligned}
$$

In matrix form,

$$
\begin{bmatrix} 0.1 - j0.1 & j0.1\\ j0.1 & 0.05 - j0.05 \end{bmatrix}\begin{bmatrix}\mathbf V_1\\ \mathbf V_2\end{bmatrix} = \begin{bmatrix}2\\ 0\end{bmatrix}.
$$

(The diagonal entry of node 2 is $-j0.1 + j0.05 + 0.05 = 0.05 - j0.05$.) The determinant is $(0.1 - j0.1)(0.05 - j0.05) - (j0.1)^2 = -j0.01 + 0.01 = 0.01 - j0.01$. By Cramer's rule,

$$
\mathbf V_1 = \frac{2(0.05 - j0.05)}{0.01 - j0.01} = 10\angle0^\circ\,\mathrm V, \qquad \mathbf V_2 = \frac{-j0.2}{0.01 - j0.01} = 10 - j10 = 14.14\angle-45^\circ\,\mathrm V.
$$

So $v_1(t) = 10\cos(1000t)\,\mathrm V$ and $v_2(t) = 14.14\cos(1000t - 45^\circ)\,\mathrm V$.

Check KCL at node 1: the resistor takes $\mathbf V_1/10 = 1\,\mathrm A$ and the inductor $(\mathbf V_1 - \mathbf V_2)/(j10) = j10/(j10) = 1\,\mathrm A$, total $2\,\mathrm A$. The far node has a larger voltage amplitude than the driven node: the inductor and the capacitor at node 2 partly resonate, which is impossible in a network of resistors alone.
:::
:::

## Mesh analysis

::: algorithm Mesh analysis in the phasor domain {#alg-mesh}
1. Convert the circuit to the phasor domain. Check that it is planar.
2. Assign a clockwise mesh-current phasor $\mathbf I_1, \dots, \mathbf I_m$ to each mesh.
3. Write KVL around each mesh: the sum of the voltage drops $Z(\mathbf I_k - \mathbf I_{\text{neighbour}})$ equals the sum of the source voltages driving current in the direction of $\mathbf I_k$. A current source shared by two meshes forms a **supermesh**.
4. Solve $\mathbf Z\,\mathbf i = \mathbf v_s$ and form branch currents as differences of mesh currents.
:::

::: example One mesh, and the KVL check {#ex-acmesh}
A source $\mathbf V_s = 12\angle0^\circ\,\mathrm V$ drives a $10\,\Omega$ resistor in series with an inductor of impedance $j8\,\Omega$. Find the current and the voltage across each element, and check KVL.
::: solution
$Z = 10 + j8 = 12.81\angle38.66^\circ\,\Omega$, so

$$
\mathbf I = \frac{12\angle0^\circ}{12.81\angle38.66^\circ} = 0.937\angle-38.66^\circ\,\mathrm A.
$$

Then $\mathbf V_R = 10\,\mathbf I = 9.37\angle-38.66^\circ = 7.32 - j5.85\,\mathrm V$ and $\mathbf V_L = j8\,\mathbf I = 7.50\angle51.34^\circ = 4.68 + j5.85\,\mathrm V$. Their sum is $12.00 + j0.00\,\mathrm V$, the source, as KVL requires. The two element voltages are exactly $90^\circ$ apart, so their magnitudes add in squares: $9.37^2 + 7.50^2 = 144 = 12^2$.
:::
:::

::: widget complexplane
mode: sum
z: 1.829, -1.463
w: 1.171, 1.463
caption: The phasor diagram of the mesh example, drawn in units of $4\,\mathrm V$: $z$ is $\mathbf V_R$, $w$ is $\mathbf V_L$ and their sum is the source $\mathbf V_s = 3$ units $= 12\angle0^\circ\,\mathrm V$. The two element voltages are perpendicular because the resistor's voltage is in phase with the current and the inductor's leads it by $90^\circ$. Drag $w$ so that it stays perpendicular to $z$ and watch the sum: this is how the voltages redistribute as the frequency, and with it the reactance, changes.
:::

::: example Two meshes {#ex-mesh2}
A source $v_s(t) = 20\cos(500t)\,\mathrm V$ drives mesh 1, made of the source, $R_1 = 4\,\Omega$ and a capacitor $C = 500\,\mathrm{\mu F}$. The capacitor is shared with mesh 2, which also contains an inductor $L = 16\,\mathrm{mH}$ and $R_2 = 4\,\Omega$. Find the mesh currents and the capacitor current as functions of time.
::: solution
At $\omega = 500\,\mathrm{rad/s}$: $Z_C = 1/(j\times500\times5\times10^{-4}) = -j4\,\Omega$ and $Z_L = j(500)(0.016) = j8\,\Omega$. With clockwise mesh currents,

$$
\begin{aligned}
\text{mesh 1:}\quad & (4 - j4)\mathbf I_1 - (-j4)\mathbf I_2 = 20,\\
\text{mesh 2:}\quad & -(-j4)\mathbf I_1 + (-j4 + j8 + 4)\mathbf I_2 = 0,
\end{aligned}
\qquad\text{that is}\qquad
\begin{bmatrix} 4 - j4 & j4\\ j4 & 4 + j4\end{bmatrix}\begin{bmatrix}\mathbf I_1\\ \mathbf I_2\end{bmatrix} = \begin{bmatrix}20\\ 0\end{bmatrix}.
$$

The determinant is $(4 - j4)(4 + j4) - (j4)^2 = 32 + 16 = 48$. Hence

$$
\mathbf I_1 = \frac{20(4 + j4)}{48} = 1.667 + j1.667 = 2.357\angle45^\circ\,\mathrm A, \qquad \mathbf I_2 = \frac{-j4\times20}{48} = -j1.667 = 1.667\angle-90^\circ\,\mathrm A.
$$

The capacitor current (downward, in the direction of $\mathbf I_1$) is $\mathbf I_1 - \mathbf I_2 = 1.667 + j3.333 = 3.727\angle63.43^\circ\,\mathrm A$. In the time domain:

$$
i_1(t) = 2.357\cos(500t + 45^\circ)\,\mathrm A, \quad i_2(t) = 1.667\cos(500t - 90^\circ)\,\mathrm A, \quad i_C(t) = 3.727\cos(500t + 63.43^\circ)\,\mathrm A.
$$

Check KVL around mesh 2: $-j4(\mathbf I_2 - \mathbf I_1) + (4 + j8)\mathbf I_2 = (-j4)(-1.667 - j3.333) + (4 + j8)(-j1.667) = (-13.33 + j6.667) + (13.33 - j6.667) = 0$. The capacitor carries more current than the source supplies, again because of the opposite reactances.
:::
:::

::: remark Nodal or mesh?
The choice is made as in DC circuits: count the unknowns. Nodal analysis needs one equation per non-reference node minus one per voltage source; mesh analysis needs one per mesh minus one per current source. In the phasor domain one more consideration appears: impedances in series add, admittances in parallel add, so nodal analysis is natural when many elements are in parallel and mesh analysis when many are in series. Circuit simulators always use (modified) nodal analysis, because it applies to non-planar circuits too.
:::

## Superposition and source transformation

Superposition in the phasor domain is the same as in DC: turn on one independent source at a time (voltage sources become short circuits, current sources open circuits), solve, and add the responses. With all sources at one frequency we may add the **phasors**.

::: example Superposition at one frequency {#ex-acsupp}
A node is connected to a source $\mathbf V_1 = 10\angle0^\circ\,\mathrm V$ through a $10\,\Omega$ resistor, to a source $\mathbf V_2 = 6\angle90^\circ\,\mathrm V$ through a capacitor of impedance $-j20\,\Omega$, and to the reference through another $10\,\Omega$ resistor. Find the node voltage $\mathbf V$ directly and by superposition.
::: solution
Directly, KCL at the node:

$$
\frac{\mathbf V - 10}{10} + \frac{\mathbf V - j6}{-j20} + \frac{\mathbf V}{10} = 0.
$$

With $1/(-j20) = j0.05$, this is $\mathbf V(0.2 + j0.05) = 1 + j6\times j0.05 = 1 - 0.3 = 0.7$, so

$$
\mathbf V = \frac{0.7}{0.2 + j0.05} = 3.294 - j0.824 = 3.40\angle-14.04^\circ\,\mathrm V.
$$

By superposition, the total admittance from the node to the reference with both sources shorted is $Y = 0.1 + j0.05 + 0.1 = 0.2 + j0.05\,\mathrm S$. With only $\mathbf V_1$ on, the injected short-circuit current is $10\times0.1 = 1\,\mathrm A$ and $\mathbf V' = 1/Y = 4.706 - j1.176\,\mathrm V$. With only $\mathbf V_2$ on, it is $j6\times j0.05 = -0.3\,\mathrm A$ and $\mathbf V'' = -0.3/Y = -1.412 + j0.353\,\mathrm V$. The sum is $3.294 - j0.824\,\mathrm V$, the same as the direct result.
:::
:::

When the sources have **different frequencies**, superposition is not optional: it is the only way to use phasors at all.

::: example A DC source and an AC source together {#ex-multifreq}
A source $v_s(t) = 12 + 6\cos(2000t)\,\mathrm V$ drives a $30\,\Omega$ resistor in series with a $20\,\mathrm{mH}$ inductor. Find the current $i(t)$.
::: solution
Treat the source as two sources in series, one at $\omega = 0$ and one at $\omega = 2000\,\mathrm{rad/s}$, and solve the circuit once for each.

At DC the inductor is a short circuit ($Z_L = j\omega L = 0$): $I_0 = 12/30 = 0.4\,\mathrm A$.

At $2000\,\mathrm{rad/s}$, $Z_L = j(2000)(0.02) = j40\,\Omega$ and $Z = 30 + j40 = 50\angle53.13^\circ\,\Omega$: $\mathbf I_1 = 6\angle0^\circ/50\angle53.13^\circ = 0.12\angle-53.13^\circ\,\mathrm A$.

Add the **time functions**:

$$
i(t) = 0.4 + 0.12\cos(2000t - 53.13^\circ)\,\mathrm A.
$$

Adding the "phasors" $0.4$ and $0.12\angle-53.13^\circ$ into one complex number would be meaningless, because they rotate at different speeds.
:::
:::

::: quiz
A circuit contains a source $5\cos(100t)\,\mathrm V$ and a source $5\cos(300t)\,\mathrm V$. Which procedure gives the correct steady-state current in a given branch?
- [ ] Add the source phasors to $10\angle0^\circ\,\mathrm V$ and solve once at $\omega = 200\,\mathrm{rad/s}$.
- [ ] Solve once at $\omega = 100\,\mathrm{rad/s}$ with both sources on, then add the phasors.
- [x] Solve at $100\,\mathrm{rad/s}$ with only the first source on and at $300\,\mathrm{rad/s}$ with only the second, then add the two time functions.
- [ ] Solve at both frequencies and add the two current phasors.
::: solution
Every impedance depends on $\omega$, so each source must be treated in its own phasor-domain circuit with the other source turned off. The two answers are sinusoids of different frequencies, which can only be added as functions of time; their sum is not a sinusoid and has no single phasor.
:::
:::

::: warning Source transformations keep their direction and their impedance {#warn-acst}
A voltage source $\mathbf V_s$ in series with $Z$ is equivalent at its terminals to a current source $\mathbf I_s = \mathbf V_s/Z$ in parallel with the **same** $Z$, with the current arrow pointing towards the terminal at the $+$ end of the voltage source. Two errors are common. One is to divide by $\abs Z$ instead of $Z$, which gives the right magnitude and the wrong phase. The other is to forget that the impedance is the same complex number in both forms: do not change $-j20\,\Omega$ into $+j20\,\Omega$ or into $1/(-j20)$ when you redraw it in parallel. To check a transformation, compute the open-circuit voltage and the short-circuit current of both forms; they must agree.
:::

## Thévenin and Norton equivalents

::: theorem Thévenin's and Norton's theorems in the phasor domain {#thm-thevenin-ac}
At a single frequency, any linear two-terminal network is equivalent at its terminals to a voltage source $\mathbf V_{\text{th}}$ in series with an impedance $Z_{\text{th}}$, and to a current source $\mathbf I_{\text{N}}$ in parallel with $Z_{\text{th}}$, where

- $\mathbf V_{\text{th}}$ is the open-circuit voltage phasor at the terminals,
- $\mathbf I_{\text{N}}$ is the short-circuit current phasor, and
- $Z_{\text{th}} = \mathbf V_{\text{th}}/\mathbf I_{\text{N}}$, which, if the network has no dependent sources, is also the impedance seen at the terminals with all independent sources turned off.
:::

The proof is that of [[circuits-1/network-theorems]] with complex quantities, by [[#thm-ac]]: drive the terminals with a test current, use superposition to split the terminal voltage into the part due to the internal sources (the open-circuit voltage) and the part due to the test current (proportional to it, with constant of proportionality $Z_{\text{th}}$). The equivalent is valid at the frequency for which it was computed and at no other.

::: example Thévenin equivalent of an RC divider {#ex-acthev}
A source $\mathbf V_s = 12\angle0^\circ\,\mathrm V$ (peak) is in series with a $10\,\Omega$ resistor and a capacitor of impedance $-j20\,\Omega$. Find the Thévenin and Norton equivalents at the terminals across the capacitor.
::: solution
The open-circuit voltage follows from the voltage divider:

$$
\mathbf V_{\text{th}} = 12\times\frac{-j20}{10 - j20} = 12\times\frac{-j20\,(10 + j20)}{10^2 + 20^2} = 12\times\frac{400 - j200}{500} = 9.6 - j4.8 = 10.73\angle-26.57^\circ\,\mathrm V.
$$

With the source shorted, the resistor and the capacitor are in parallel across the terminals:

$$
Z_{\text{th}} = \frac{1}{0.1 + j0.05} = \frac{0.1 - j0.05}{0.0125} = 8 - j4\,\Omega = 8.94\angle-26.57^\circ\,\Omega.
$$

The short-circuit current is the source current with the capacitor shorted, $\mathbf I_{\text{N}} = 12/10 = 1.2\angle0^\circ\,\mathrm A$, and indeed $\mathbf V_{\text{th}}/Z_{\text{th}} = 10.73\angle-26.57^\circ/8.94\angle-26.57^\circ = 1.2\angle0^\circ\,\mathrm A$. The network is equivalent to $9.6 - j4.8\,\mathrm V$ in series with $8 - j4\,\Omega$; [[circuits-2/ac-power]] finds the load that extracts the most power from it.
:::
:::

::: example A Thévenin impedance with a dependent source {#ex-thev-dep}
A source $\mathbf V_s = 10\angle0^\circ\,\mathrm V$ drives a current $\mathbf I_x$ through $R_1 = 4\,\Omega$ into node $a$. A capacitor of impedance $-j4\,\Omega$ connects node $a$ to the reference node $b$, and a current-controlled current source of value $2\mathbf I_x$ injects current from $b$ into $a$. Find the Thévenin equivalent at terminals $a$–$b$.
::: solution
*Open circuit.* KCL at $a$: the current arriving, $\mathbf I_x + 2\mathbf I_x$, leaves through the capacitor, so $3\mathbf I_x = \mathbf V/(-j4) = j\mathbf V/4$, with $\mathbf I_x = (10 - \mathbf V)/4$. Hence $3(10 - \mathbf V) = j\mathbf V$ and

$$
\mathbf V_{\text{th}} = \frac{30}{3 + j} = 9 - j3 = 9.49\angle-18.43^\circ\,\mathrm V.
$$

*Short circuit.* With $a$ shorted to $b$, the capacitor has no voltage, $\mathbf I_x = 10/4 = 2.5\,\mathrm A$, and the short carries $\mathbf I_{\text{N}} = 3\mathbf I_x = 7.5\,\mathrm A$. Therefore

$$
Z_{\text{th}} = \frac{\mathbf V_{\text{th}}}{\mathbf I_{\text{N}}} = \frac{9 - j3}{7.5} = 1.2 - j0.4\,\Omega.
$$

*Check by a test source.* Turn off $\mathbf V_s$ (only the independent source) and apply a voltage $\mathbf V$ at $a$. Then $\mathbf I_x = -\mathbf V/4$ and the test current is $\mathbf I_t = j\mathbf V/4 - 3\mathbf I_x = \mathbf V(3 + j)/4$, so $Z_{\text{th}} = 4/(3 + j) = 1.2 - j0.4\,\Omega$, as before. Simply combining the passive elements, $4\,\Omega \parallel -j4\,\Omega = 2 - j2\,\Omega$, would be wrong: the dependent source must stay on.
:::
:::

::: quiz
A $230\,\mathrm V$ RMS, $50\,\mathrm{Hz}$ supply drives a $10\,\Omega$ resistor in series with a $100\,\mathrm{\mu F}$ capacitor. What is the RMS current?
- [x] About $6.9\,\mathrm A$
- [ ] About $23\,\mathrm A$
- [ ] About $7.2\,\mathrm A$
- [ ] About $5.6\,\mathrm A$
::: solution
$\abs{Z_C} = 1/(\omega C) = 1/(2\pi\times50\times10^{-4}) = 31.83\,\Omega$, so $\abs Z = \sqrt{10^2 + 31.83^2} = 33.36\,\Omega$ and $I = 230/33.36 = 6.89\,\mathrm A$ RMS. $23\,\mathrm A$ ignores the capacitor; $7.2\,\mathrm A$ ignores the resistor ($230/31.83$); $5.6\,\mathrm A$ adds the magnitudes $10 + 31.83$ instead of combining them as a complex number.
:::
:::

::: example Design: a phase-lag network and its load {#ex-lag-design}
A sensor interface needs a signal at $400\,\mathrm{Hz}$ delayed in phase by $60^\circ$. Use a series $10\,\mathrm{k\Omega}$ resistor and a shunt capacitor, output across the capacitor. (a) Choose $C$ from the E12 series. (b) The output feeds an input of $47\,\mathrm{k\Omega}$. What phase shift is obtained, and how should $C$ be changed to restore $60^\circ$?
::: solution
(a) Unloaded, the output is $\mathbf V_{\text{in}}/(1 + j\omega RC)$, with phase $-\tan^{-1}(\omega RC)$. For $60^\circ$, $\omega RC = \tan60^\circ = 1.732$, so

$$
C = \frac{1.732}{(2\pi\times400)(10^4)} = 68.9\,\mathrm{nF}.
$$

The E12 value $68\,\mathrm{nF}$ gives $\omega RC = 1.709$, a phase of $-59.7^\circ$ and an amplitude ratio $1/\sqrt{1 + 1.709^2} = 0.505$.

(b) By [[#thm-thevenin-ac]], the network seen by the load is $\mathbf V_{\text{th}} = \mathbf V_{\text{in}}/(1 + j\omega RC) = 0.505\angle-59.67^\circ\,\mathbf V_{\text{in}}$ in series with $Z_{\text{th}} = R\parallel Z_C = R/(1 + j\omega RC) = 2550 - j4359\,\Omega$. With $R_L = 47\,\mathrm{k\Omega}$,

$$
\mathbf V_L = \mathbf V_{\text{th}}\,\frac{R_L}{R_L + Z_{\text{th}}} = \frac{\mathbf V_{\text{in}}}{1 + R/R_L + j\omega RC} = 0.477\angle-54.64^\circ\,\mathbf V_{\text{in}}.
$$

The load cuts the phase shift by $5^\circ$. To restore $60^\circ$ we need $\omega RC/(1 + R/R_L) = \tan60^\circ$, so $C = 1.732\times1.213/(2\pi\times400\times10^4) = 83.6\,\mathrm{nF}$; the E12 value $82\,\mathrm{nF}$ gives $-59.5^\circ$ at an amplitude of $0.418$. The alternative is to buffer the output with a voltage follower ([[circuits-1/operational-amplifiers]]), whose very high input impedance leaves the unloaded design intact.
:::
:::

::: widget plot
f: 1/sqrt((1 + 10/RL)^2 + (2*pi*x*1e4*68e-9)^2); -atan(2*pi*x*1e4*68e-9/(1 + 10/RL))/(pi/2)
x: 0, 2000
y: -1.1, 1.1
sliders: RL=47:5:500:1
hlines: -0.6667
labels: \lvert\mathbf V_L/\mathbf V_{\text{in}}\rvert; \text{phase}/90^\circ
caption: The lag network of the design example ($R = 10\,\mathrm{k\Omega}$, $C = 68\,\mathrm{nF}$) loaded by $R_L$ (slider, in kΩ), against frequency in hertz. The lower curve is the phase divided by $90^\circ$, so the dashed line at $-0.667$ marks $-60^\circ$. At $R_L = 500\,\mathrm{k\Omega}$ the phase curve crosses $-60^\circ$ near $400\,\mathrm{Hz}$; reduce $R_L$ towards $5\,\mathrm{k\Omega}$ and watch both the gain and the phase shift fall as the load draws current from the Thévenin impedance.
:::

## Checking phasor answers

Complex arithmetic gives many opportunities for small errors: a sign of $j$, a quadrant of an arctangent, a reciprocal of the wrong part. Four checks catch nearly all of them.

1. **An element law.** Pick one element, compute its voltage from its current with $\mathbf V = Z\mathbf I$, and compare with the difference of the node voltages.
2. **A Kirchhoff law** you did not use in the solution: KVL around a mesh in a nodal solution, KCL at a node in a mesh solution, both done in rectangular form.
3. **Limits.** Set $\omega \to 0$ (inductors short, capacitors open) or $\omega \to \infty$ (the opposite) and check that the answer tends to the obvious DC or high-frequency value.
4. **Phase sense.** A capacitive path advances the current; an inductive path delays it. If an $RC$ low-pass output leads its input, something is wrong.

::: application Line drop on an AC feeder
A distribution feeder has resistance and inductive reactance, typically comparable in size. For a feeder of impedance $Z_\ell = 0.2 + j0.3\,\Omega$ carrying $\mathbf I = 100\angle-30^\circ\,\mathrm A$ RMS to a load at $\mathbf V_L = 230\angle0^\circ\,\mathrm V$ RMS, KVL gives the sending-end voltage $\mathbf V_S = \mathbf V_L + Z_\ell\mathbf I = 230 + (0.3606\angle56.31^\circ)(100\angle-30^\circ) = 262.3 + j16.0 = 262.8\angle3.49^\circ\,\mathrm V$. The voltage drop in magnitude, $32.8\,\mathrm V$, is much larger than it would be for the same current in phase with the voltage ($\mathbf V_S = 250.0 + j30.0$, $\abs{\mathbf V_S} = 251.8\,\mathrm V$): a lagging current through an inductive line costs voltage. This phasor calculation is the basis of voltage regulation in [[power-systems]], and of the case for the power-factor correction of [[circuits-2/ac-power]].
:::

::: history
The network theorems were found for DC circuits and carried over to AC once impedance became a complex number. Hermann von Helmholtz stated the equivalent-source idea in 1853, and Léon Charles Thévenin, a French telegraph engineer, published it in 1883 as a general theorem for networks of conductors. The current-source dual was described independently in 1926 by Edward Lawry Norton in an internal memorandum at Bell Laboratories and by Hans Ferdinand Mayer of Siemens. Arthur Kennelly, whose 1893 paper treated impedance as a complex quantity, published the wye–delta transformation in 1899. With Steinmetz's symbolic method in common use, all of these became tools of the sinusoidal steady state, and the nodal formulation, written as a complex admittance matrix, is the core of the AC analysis in every circuit simulator since SPICE (1973).
:::

## Where this leads

The methods of this lesson are the working tools of the rest of the course. [[circuits-2/ac-power]] uses the Thévenin equivalent to find the load that draws maximum average power, and the KVL of the feeder above to justify power-factor correction. [[circuits-2/three-phase-circuits]] reduces a balanced three-phase system to one single-phase circuit solved by these methods. [[circuits-2/magnetically-coupled-circuits]] adds mutual inductance to the mesh equations. In [[circuits-2/frequency-response]] the divider ratios become transfer functions of $\omega$, and in [[circuits-2/two-port-networks]] the Thévenin idea is extended to networks with two pairs of terminals.

::: summary
- At a single frequency, nodal and mesh analysis, dividers, source transformation, superposition and the Thévenin and Norton theorems hold in the phasor domain with impedances, admittances and complex source phasors.
- The admittance (nodal) matrix of a circuit without dependent sources is symmetric with complex entries; solve it by hand for two unknowns, by computer beyond.
- Complex divider ratios scale and shift; with reactances of opposite sign, branch quantities can exceed the source.
- Sources at different frequencies must be handled by superposition: solve once per frequency with that frequency's impedances, then add the time functions, never the phasors.
- $Z_{\text{th}} = \mathbf V_{\text{oc}}/\mathbf I_{\text{sc}}$ always; with dependent sources, keep them on and use a test source or the open- and short-circuit pair.
- Loading a network changes its output in phase as well as magnitude; a Thévenin equivalent predicts by how much.
- Check every result with an element law, an unused Kirchhoff law, the DC and high-frequency limits, and the expected sense of the phase.
:::

## Exercises

::: exercise Admittance of a capacitor {level=1 check="2*pi*159*1e-6"}
Find the admittance of a $1\,\mathrm{\mu F}$ capacitor at $159\,\mathrm{Hz}$. Enter its magnitude in siemens.
::: solution
$Y_C = j\omega C = j(2\pi\times159)(10^{-6}) = j0.999\times10^{-3}\,\mathrm S$, a magnitude of about $1\,\mathrm{mS}$. (At $159\,\mathrm{Hz}$, $\omega \approx 1000\,\mathrm{rad/s}$.)
:::
:::

::: exercise Parallel admittance {level=1 check="sqrt(0.2^2+0.1^2)"}
A $5\,\Omega$ resistor is in parallel with a capacitor whose susceptance is $0.1\,\mathrm S$. Find the magnitude of the total admittance, in siemens, and the impedance of the combination.
::: solution
$Y = 0.2 + j0.1\,\mathrm S$, $\abs Y = \sqrt{0.2^2 + 0.1^2} = 0.224\,\mathrm S$. The impedance is $Z = 1/Y = (0.2 - j0.1)/0.05 = 4 - j2\,\Omega$.
:::
:::

::: exercise Series impedance {level=1 check="sqrt(164)"}
A $10\,\Omega$ resistor in series with an inductor of reactance $8\,\Omega$ is driven by $12\angle0^\circ\,\mathrm V$. Find the magnitude of the total impedance, in ohms.
::: solution
$\abs Z = \sqrt{10^2 + 8^2} = \sqrt{164} = 12.81\,\Omega$, and the current amplitude is $12/12.81 = 0.937\,\mathrm A$.
:::
:::

::: exercise Thévenin equivalent of a divider {level=2 check="3*sqrt(2)"}
A source $6\angle0^\circ\,\mathrm V$ is in series with a $4\,\Omega$ resistor and a capacitor of impedance $-j4\,\Omega$. Find the Thévenin equivalent across the capacitor. Enter $\abs{\mathbf V_{\text{th}}}$ in volts.
::: hint
$\mathbf V_{\text{th}}$ is the divider output; $Z_{\text{th}}$ is the resistor in parallel with the capacitor.
:::
::: solution
$\mathbf V_{\text{th}} = 6\times\dfrac{-j4}{4 - j4} = 6\times\dfrac{-j4(4 + j4)}{32} = 6(0.5 - j0.5) = 3 - j3 = 4.24\angle-45^\circ\,\mathrm V$, and $Z_{\text{th}} = 1/(0.25 + j0.25) = 2 - j2\,\Omega$. Check: $\mathbf I_{\text{N}} = 6/4 = 1.5\,\mathrm A$ and $(3 - j3)/(2 - j2) = 1.5$.
:::
:::

::: exercise Current divider {level=2 check="1/sqrt(2)"}
A current of $1\angle0^\circ\,\mathrm A$ divides between a $10\,\Omega$ resistor and a capacitor of impedance $-j10\,\Omega$ in parallel. Find the amplitude of the capacitor current, in amperes, and its phase.
::: solution
$\mathbf I_C = \dfrac{j0.1}{0.1 + j0.1} = 0.5 + j0.5 = 0.707\angle45^\circ\,\mathrm A$. The amplitude is $1/\sqrt2 = 0.707\,\mathrm A$ and it leads the total current by $45^\circ$.
:::
:::

::: exercise A node with a tank {level=2 check="40"}
A node is fed from a source $20\angle0^\circ\,\mathrm V$ through a capacitor of impedance $-j10\,\Omega$, and connected to the reference through a $20\,\Omega$ resistor and an inductor of impedance $j10\,\Omega$ in parallel. Find the node voltage. Enter its magnitude in volts.
::: hint
Write KCL with admittances and collect the terms in $\mathbf V$.
:::
::: solution
KCL: $(\mathbf V - 20)\,j0.1 + \mathbf V(0.05 - j0.1) = 0$. The $j0.1$ terms cancel, leaving $0.05\,\mathbf V = j2$, so $\mathbf V = j40 = 40\angle90^\circ\,\mathrm V$. The node voltage is twice the source amplitude: the capacitor and the inductor have equal and opposite reactances, so seen from the resistor the source looks like an ideal current source $20/(-j10) = j2\,\mathrm A$, and all of it flows in the $20\,\Omega$ resistor. Check: the resistor carries $j40/20 = j2\,\mathrm A$, the inductor $j40/(j10) = 4\,\mathrm A$ and the capacitor $(20 - j40)\,j0.1 = 4 + j2\,\mathrm A$, and $4 + j2 = j2 + 4$.
:::
:::

::: exercise Two frequencies {level=2 check="4/sqrt(2)"}
A source $v_s(t) = 5 + 4\cos(1000t)\,\mathrm V$ drives a $1\,\mathrm{k\Omega}$ resistor in series with a $1\,\mathrm{\mu F}$ capacitor. Find the capacitor voltage $v_C(t)$. Enter the amplitude of its AC component in volts.
::: solution
At DC the capacitor is open, so its DC voltage is $5\,\mathrm V$. At $1000\,\mathrm{rad/s}$, $\omega RC = 1$ and the divider gives $4/(1 + j) = 2.83\angle-45^\circ\,\mathrm V$. So $v_C(t) = 5 + 2.83\cos(1000t - 45^\circ)\,\mathrm V$; the AC amplitude is $4/\sqrt2 = 2.83\,\mathrm V$.
:::
:::

::: exercise Norton current {level=2 check="1.2"}
Find the Norton current, in amperes, of the network of [[#ex-acthev]] by shorting its terminals, and confirm that $\mathbf V_{\text{th}} = Z_{\text{th}}\mathbf I_{\text{N}}$.
::: solution
With the capacitor shorted, the source drives $12/10 = 1.2\angle0^\circ\,\mathrm A$ through the resistor and the short. Then $Z_{\text{th}}\mathbf I_{\text{N}} = (8 - j4)(1.2) = 9.6 - j4.8\,\mathrm V = \mathbf V_{\text{th}}$.
:::
:::

::: exercise Mesh analysis with a dependent source {level=3 check="sqrt(8000/2368)"}
In the two-mesh circuit of [[#ex-mesh2]], insert in mesh 2 a current-controlled voltage source of value $2\mathbf I_1$ (volts, with $\mathbf I_1$ in amperes), oriented so that it drives current in the direction of $\mathbf I_2$. Find $\mathbf I_2$. Enter $\abs{\mathbf I_2}$ in amperes.
::: hint
Only the mesh-2 equation changes: move $2\mathbf I_1$ to the left-hand side. The matrix is no longer symmetric.
:::
::: solution
Mesh 1 is unchanged: $(4 - j4)\mathbf I_1 + j4\,\mathbf I_2 = 20$. Mesh 2: $j4\,\mathbf I_1 + (4 + j4)\mathbf I_2 = 2\mathbf I_1$, that is $(-2 + j4)\mathbf I_1 + (4 + j4)\mathbf I_2 = 0$. The determinant is $(4 - j4)(4 + j4) - (j4)(-2 + j4) = 32 + 16 + j8 = 48 + j8$, and

$$
\mathbf I_2 = \frac{-(-2 + j4)(20)}{48 + j8} = \frac{40 - j80}{48 + j8} = 0.541 - j1.757 = 1.838\angle-72.90^\circ\,\mathrm A.
$$

$\abs{\mathbf I_2} = \sqrt{8000/2368} = 1.838\,\mathrm A$. Also $\mathbf I_1 = 20(4 + j4)/(48 + j8) = 1.892 + j1.351 = 2.325\angle35.54^\circ\,\mathrm A$.
:::
:::

::: exercise The Maxwell bridge {level=3 check="0.1"}
An AC bridge has a source connected between nodes $A$ and $C$. One branch from $A$ to $C$ consists of $Z_1$ (from $A$ to $B$) and $Z_3$ (from $B$ to $C$); the other consists of $Z_2$ (from $A$ to $D$) and $Z_x$ (from $D$ to $C$). A detector is connected between $B$ and $D$. (a) Show that the detector reads zero when $Z_1Z_x = Z_2Z_3$. (b) In the **Maxwell bridge**, $Z_1$ is a resistor $R_1$ in parallel with a capacitor $C_1$, $Z_2 = R_2$, $Z_3 = R_3$, and $Z_x = R_x + j\omega L_x$ is an unknown inductor. Find $R_x$ and $L_x$ at balance, and show that the result does not depend on $\omega$. (c) Evaluate for $R_2 = R_3 = 1\,\mathrm{k\Omega}$, $C_1 = 0.1\,\mathrm{\mu F}$, $R_1 = 50\,\mathrm{k\Omega}$; enter $L_x$ in henries.
::: hint
At balance $\mathbf V_B = \mathbf V_D$, and no current flows in the detector, so each side is a plain voltage divider.
:::
::: solution
(a) With no detector current, $\mathbf V_B = \mathbf V_{AC}\,Z_3/(Z_1 + Z_3)$ and $\mathbf V_D = \mathbf V_{AC}\,Z_x/(Z_2 + Z_x)$. Setting them equal: $Z_3(Z_2 + Z_x) = Z_x(Z_1 + Z_3)$, so $Z_2Z_3 = Z_1Z_x$.

(b) $Z_x = Z_2Z_3/Z_1 = R_2R_3\,Y_1 = R_2R_3(1/R_1 + j\omega C_1)$. Equating real and imaginary parts, $R_x = R_2R_3/R_1$ and $L_x = R_2R_3C_1$. The frequency cancels, so the bridge balances at all frequencies at once, which makes it insensitive to harmonics in the source. Balance requires both a real and an imaginary condition, so two elements ($R_1$ and $C_1$, say) must be adjustable.

(c) $L_x = (10^3)(10^3)(10^{-7}) = 0.1\,\mathrm H$ and $R_x = 10^6/(5\times10^4) = 20\,\Omega$.
:::
:::

::: exercise Thévenin equivalent with a dependent source {level=3}
A source $\mathbf V_s = 12\angle0^\circ\,\mathrm V$ is in series with $R = 6\,\Omega$ and connected to node $a$. From $a$ to the reference $b$ is an inductor of impedance $j6\,\Omega$. A voltage-controlled current source $g\mathbf V_{ab}$, with $g = 0.1\,\mathrm S$, draws current out of node $a$ to $b$. Find $\mathbf V_{\text{th}}$ and $Z_{\text{th}}$ at $a$–$b$, and explain why $Z_{\text{th}}$ is not $6\parallel j6\,\Omega$.
::: solution
*Open circuit.* KCL at $a$: $(\mathbf V - 12)/6 + \mathbf V/(j6) + 0.1\mathbf V = 0$, so $\mathbf V(1/6 - j/6 + 0.1) = 2$, that is $\mathbf V(0.2667 - j0.1667) = 2$ and

$$
\mathbf V_{\text{th}} = \frac{2}{0.2667 - j0.1667} = 5.393 + j3.371 = 6.36\angle32.0^\circ\,\mathrm V.
$$

*Short circuit.* $\mathbf V_{ab} = 0$, so the dependent source and the inductor carry nothing, and $\mathbf I_{\text{N}} = 12/6 = 2\,\mathrm A$.

$Z_{\text{th}} = \mathbf V_{\text{th}}/\mathbf I_{\text{N}} = 2.697 + j1.685\,\Omega = 3.18\angle32.0^\circ\,\Omega$. The dependent source behaves at the terminals like a conductance of $0.1\,\mathrm S$ ($10\,\Omega$) in parallel, because its current is proportional to the terminal voltage; so $Z_{\text{th}} = 1/(1/6 + 1/(j6) + 0.1)$, whereas $6\parallel j6 = 3 + j3\,\Omega$ leaves it out.
:::
:::
