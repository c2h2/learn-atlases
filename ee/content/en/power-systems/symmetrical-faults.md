A lightning strike flashes over an insulator, a tree falls across a line, a digger cuts a cable: a **fault** connects the conductors of a power system to each other or to earth through a low impedance. In the few tens of milliseconds before protection opens the circuit, currents of ten to fifty times normal flow, heating conductors, stressing windings with forces proportional to the square of the current, and depressing voltages across a wide area. Every circuit breaker must be able to interrupt the largest current that can flow through it, every busbar and cable must withstand it mechanically and thermally, and every protective relay must distinguish it from a heavy load. Fault calculations provide those numbers.

This chapter treats the **symmetrical** (balanced) three-phase fault, in which all three phases are shorted together. It is the least common type, perhaps $5\,\%$ of faults on transmission lines, but usually the most severe, and because it keeps the network balanced it can be analysed with the per-phase circuits we already have. We begin with the transient in a simple RL circuit, which explains the **DC offset** of fault currents. We then see how a synchronous generator's current decays through **subtransient**, **transient** and steady-state stages, characterised by three reactances. With the machines represented by voltages behind reactances, we compute fault currents by Thévenin's theorem, and then systematically for every bus at once with the **bus impedance matrix**. The chapter ends with the selection of circuit breakers and current-limiting reactors. The synchronous-machine model of [[electric-machines/synchronous-machines]] and the bus admittance matrix of [[power-systems/power-flow]] are assumed.

## Transients in an RL circuit

Seen from a fault, most of a power system is inductive, with a small resistance. The simplest model is a sinusoidal source suddenly switched onto a series RL circuit.

::: theorem Short-circuit current of an RL circuit {#thm-rl-transient}
A source $v(t) = V_m\sin(\omega t + \alpha)$ is connected at $t = 0$ to a series circuit of resistance $R$ and inductance $L$ with zero initial current. With $\abs Z = \sqrt{R^2 + \omega^2L^2}$, $\theta = \arctan(\omega L/R)$ and $T = L/R$,
$$
i(t) = \frac{V_m}{\abs Z}\Bigl[\sin(\omega t + \alpha - \theta) - \sin(\alpha - \theta)\,e^{-t/T}\Bigr].
$$ {#eq-rl-fault}
The current is the sum of a steady-state **symmetrical** AC component and a decaying **DC offset**. The offset is zero if the circuit closes at $\alpha = \theta$ and greatest, equal to the peak of the AC component, if it closes at $\alpha = \theta - 90^\circ$ (for highly inductive circuits, near a voltage zero).
:::

::: proof
KVL gives $L\,\mathrm di/\mathrm dt + Ri = V_m\sin(\omega t + \alpha)$. The particular (steady-state) solution is the phasor solution: amplitude $V_m/\abs Z$, lagging the voltage by $\theta$, i.e. $i_{ss}(t) = (V_m/\abs Z)\sin(\omega t + \alpha - \theta)$. The homogeneous solution is $Ke^{-t/T}$. The inductor current cannot jump, so $i(0) = 0$, giving $K = -(V_m/\abs Z)\sin(\alpha - \theta)$. The offset term vanishes when $\sin(\alpha - \theta) = 0$ and has its largest magnitude, $V_m/\abs Z$, when $\alpha - \theta = \pm90^\circ$.
:::

In the worst case the current starts at zero, and half a cycle later the AC component is at its peak with the same sign as the barely decayed offset, so the first peak approaches twice the symmetrical peak. The ratio depends on the decay of the offset in half a cycle, set by $X/R = \omega L/R$:
$$
\frac{i_{\text{peak}}}{\sqrt2\,I_{\text{sym}}}\approx1 + e^{-\pi/(X/R)},
$$ {#eq-peak-approx}
where $I_{\text{sym}}$ is the RMS symmetrical current. The standard IEC 60909 uses the closely equivalent factor $\kappa = 1.02 + 0.98e^{-3R/X}$. For $X/R = 15$ the exact worst-case factor, found numerically, is $1.814$, the approximation gives $1.811$ and $\kappa = 1.822$. High-voltage networks have $X/R$ of $10$ to $40$, so fault currents are strongly asymmetrical in their first cycles.

::: widget plot
f: sin(x + a - atan(XR)) - sin(a - atan(XR))*exp(-x/XR); sin(x + a - atan(XR)); -sin(a - atan(XR))*exp(-x/XR)
x: 0, 6*pi
y: -2, 2
piticks: true
sliders: a=0:0:3.1416:0.01; XR=15:1:40:0.5
labels: i(t)\ \text{(total)}; \text{AC component}; \text{DC offset}
caption: Fault current of an RL circuit, in units of the symmetrical peak $V_m/\lvert Z\rvert$, against $\omega t$; $a$ is the point on the voltage wave $\alpha$ (radians) at which the fault occurs and $XR$ the ratio $X/R$. With $a = 0$ (fault at a voltage zero) the offset is nearly maximal and the first peak approaches $2$. Move $a$ to about $\pi/2$ (a voltage peak) and the offset almost vanishes. Lower $X/R$ to see the offset decay within a cycle or two.
:::

::: example Peak current at an 11 kV switchboard {#ex-peak}
The symmetrical three-phase fault current at an $11\,\mathrm{kV}$ switchboard is $20\,\mathrm{kA}$ RMS, and the network's $X/R$ ratio at that point is $15$. Find the worst-case peak current for which the busbars and breakers must be braced.
::: solution
With $\kappa = 1.02 + 0.98e^{-3/15} = 1.822$, $i_{\text{peak}} = \kappa\sqrt2\,I_{\text{sym}} = 1.822\times1.414\times20 = 51.5\,\mathrm{kA}$. Electromagnetic forces between conductors are proportional to $i^2$, so this asymmetrical peak, not the $28.3\,\mathrm{kA}$ symmetrical peak, determines the mechanical design: the force is $(51.5/28.3)^2 = 3.3$ times larger. Switchgear is rated by its **peak withstand** (making) current, typically $2.5$ times the rated short-circuit breaking current at $50\,\mathrm{Hz}$ ($2.6$ at $60\,\mathrm{Hz}$), which covers $X/R$ up to about $14$; beyond that a higher rating or a check is needed.
:::
:::

## The synchronous generator on short circuit

A synchronous generator is not a constant voltage behind a fixed reactance during a fault. When its terminals are suddenly short-circuited, the armature currents try to change the flux linking the rotor, and the rotor circuits respond, by flux conservation, with induced currents that oppose the change. The **damper windings** (amortisseurs) react fastest; their induced currents decay within a few cycles. The **field winding** reacts too, its induced current decaying over about a second. Only then does the armature reaction penetrate the rotor fully and the current settle at the steady value set by the synchronous reactance $X_d$.

::: definition Subtransient, transient and synchronous reactances {#def-reactances}
For a three-phase short circuit at the terminals of a synchronous machine running unloaded at rated speed with internal voltage $E$, the RMS symmetrical (AC) armature current decays as
$$
I(t) = E\left[\Bigl(\frac1{X_d''} - \frac1{X_d'}\Bigr)e^{-t/T_d''} + \Bigl(\frac1{X_d'} - \frac1{X_d}\Bigr)e^{-t/T_d'} + \frac1{X_d}\right],
$$ {#eq-gen-envelope}
which defines the **direct-axis subtransient reactance** $X_d''$, the **transient reactance** $X_d'$ and the **synchronous reactance** $X_d$, and the short-circuit **subtransient** and **transient time constants** $T_d''$ and $T_d'$. The currents $I'' = E/X_d''$, $I' = E/X_d'$ and $I = E/X_d$ are the initial subtransient, transient and steady-state short-circuit currents.
:::

Typical values, in per unit on the machine rating, are: turbo-generators $X_d'' = 0.12$–$0.25$, $X_d' = 0.2$–$0.35$, $X_d = 1.0$–$2.3$, $T_d'' = 0.02$–$0.05\,\mathrm s$, $T_d' = 0.5$–$1.5\,\mathrm s$; salient-pole hydro generators with dampers have similar $X_d''$, somewhat larger $X_d'$ and smaller $X_d$. On top of this AC envelope there is a DC offset in each phase, as in [[#thm-rl-transient]], decaying with the **armature time constant** $T_a$ ($0.1$–$0.4\,\mathrm s$ for large machines).

::: proof
A full derivation uses Park's $dq$ model of the machine and is found in Kundur's or Krause's texts. The physical sketch is this. Immediately after the fault, flux linkages of all closed rotor circuits are conserved, so the armature flux is forced to bypass the rotor through leakage paths: the effective reactance is small, $X_d''$, combining the armature leakage with the leakage reactances of field and damper in parallel with the magnetising reactance. The damper currents decay with $T_d''$; afterwards only the field circuit opposes the flux change, and the reactance is $X_d'$, the leakage reactance plus the parallel combination of field leakage and magnetising reactance. When the field transient has decayed with $T_d'$, the armature flux crosses the rotor freely and the reactance is $X_d$. Each stage contributes an exponential term whose initial size is the difference of the currents on either side of it, which gives [[#eq-gen-envelope]].
:::

::: widget plot
f: (1/Xa - 1/Xb)*exp(-x/Ta) + (1/Xb - 1/Xc)*exp(-x/Tb) + 1/Xc; 1/Xc + (1/Xb - 1/Xc)*exp(-x/Tb)
x: 0, 3
y: 0, 8
sliders: Xa=0.15:0.08:0.3:0.01; Xb=0.25:0.15:0.5:0.01; Xc=1.2:0.6:2.5:0.05; Ta=0.035:0.01:0.1:0.005; Tb=1:0.3:2:0.05
labels: I(t)\ \text{(pu, RMS envelope)}; \text{transient + steady state only}
caption: RMS symmetrical short-circuit current of an unloaded generator at $E = 1\,\mathrm{pu}$ against time in seconds, with $X_a = X_d''$, $X_b = X_d'$, $X_c = X_d$, $T_a = T_d''$, $T_b = T_d'$. The second curve, extrapolated back to $t = 0$, meets the axis at $1/X_d'$: this is how $X_d'$ is measured from an oscillogram. The subtransient part has gone after about $0.1\,\mathrm s$, the time a fast breaker takes to open. Increase $T_b$ and note that the current at $0.5\,\mathrm s$, relevant to slow back-up protection, rises noticeably.
:::

::: example Short-circuit currents of a generator {#ex-generator}
A $100\,\mathrm{MVA}$, $13.8\,\mathrm{kV}$, $50\,\mathrm{Hz}$ generator with $X_d'' = 0.15$, $X_d' = 0.25$, $X_d = 1.2\,\mathrm{pu}$, $T_d'' = 0.035\,\mathrm s$ and $T_d' = 1.0\,\mathrm s$ runs unloaded at rated voltage when a three-phase fault occurs at its terminals. Find the initial subtransient, transient and steady-state currents in amperes, and the symmetrical current after $0.05\,\mathrm s$ and $0.5\,\mathrm s$.
::: solution
$I_b = 100\times10^6/(\sqrt3\times13\,800) = 4184\,\mathrm A$. With $E = 1\,\mathrm{pu}$: $I'' = 1/0.15 = 6.67\,\mathrm{pu} = 27.9\,\mathrm{kA}$; $I' = 4.00\,\mathrm{pu} = 16.7\,\mathrm{kA}$; $I = 0.833\,\mathrm{pu} = 3.49\,\mathrm{kA}$, less than rated current. From [[#eq-gen-envelope]]:
$$
I(0.05) = 2.667e^{-0.05/0.035} + 3.167e^{-0.05} + 0.833 = 0.639 + 3.012 + 0.833 = 4.48\,\mathrm{pu} = 18.8\,\mathrm{kA},
$$
and $I(0.5) = 0.000 + 1.921 + 0.833 = 2.75\,\mathrm{pu} = 11.5\,\mathrm{kA}$. The steady-state current is smaller than the rated current: a sustained short circuit does not overload a generator thermally, but the first cycles, with up to $\sqrt2\times27.9\times1.8\approx70\,\mathrm{kA}$ peak including offset, are a severe mechanical shock.
:::
:::

::: warning Which reactance, and which current?
Use $X_d''$ for the currents breakers must interrupt and withstand in the first cycles (and for the momentary rating), $X_d'$ for the currents a few cycles to a second later (relevant to time-delayed relays and to transient stability), and $X_d$ only for sustained conditions. Also keep straight whether a current is the **RMS symmetrical** value (what the formulas give), the **RMS asymmetrical** value including the DC offset, or an **instantaneous peak**: they differ by factors up to $1.7$ and $2.8$.
:::

## Fault currents with pre-fault load

In a real system the machines are loaded before the fault, so their internal voltages differ from $1\,\mathrm{pu}$. There are two equivalent ways to proceed.

The first is direct: from the pre-fault power flow, compute each machine's internal voltage behind its subtransient reactance, $\mathbf E'' = \mathbf V_t + jX_d''\mathbf I_{\text{pre}}$ for a generator (and $\mathbf E'' = \mathbf V_t - jX_d''\mathbf I_{\text{pre}}$ for a motor, with current into it); these voltages stay constant in the first cycles, so the network with the fault applied is solved with them as sources.

The second, which leads to the systematic method, uses superposition.

::: theorem Fault current by Thévenin's theorem {#thm-thevenin-fault}
Let $\mathbf V_f$ be the pre-fault voltage at the faulted bus and $Z_{\text{th}}$ the Thévenin impedance of the network seen from that bus, with all machine internal voltages replaced by short circuits (each machine represented by its subtransient reactance) and loads by their impedances. A fault through impedance $Z_f$ draws
$$
\mathbf I_f = \frac{\mathbf V_f}{Z_{\text{th}} + Z_f}.
$$ {#eq-thevenin-fault}
The current in any branch and the voltage at any bus during the fault are the pre-fault values plus the changes produced by injecting $-\mathbf I_f$ at the faulted bus into the network with all sources set to zero.
:::

::: proof
Represent the fault by a switch closing through $Z_f$. By the compensation (substitution) theorem, closing it is equivalent to inserting, in series with $Z_f$, two equal and opposite voltage sources $\mathbf V_f$ and $-\mathbf V_f$: one of them, with the original sources, reproduces the pre-fault state (no current flows in the fault branch, because the voltage across the open switch was $\mathbf V_f$). The other, acting alone with all original sources zeroed, drives $\mathbf V_f/(Z_{\text{th}} + Z_f)$ through the fault branch and produces all the changes. By linearity the total is the sum of the two.
:::

Since the load currents are typically small compared with fault currents, the pre-fault currents are often neglected and $\mathbf V_f$ taken as $1\,\mathrm{pu}$ (IEC 60909 uses $c\,V_n$ with a voltage factor $c = 1.1$ for maximum currents). The superposition method shows exactly what is neglected.

::: example A generator and a motor {#ex-gen-motor}
A generator ($X_d'' = 0.15\,\mathrm{pu}$) supplies a synchronous motor ($X_d'' = 0.20\,\mathrm{pu}$) through a line of reactance $0.10\,\mathrm{pu}$; all values are on a common base. The motor draws $0.6\,\mathrm{pu}$ power at $0.8$ power factor lagging at $1.0\,\mathrm{pu}$ terminal voltage when a bolted three-phase fault occurs at the motor terminals. Find the subtransient fault current and the currents supplied by the generator and the motor.
::: solution
*Pre-fault.* $\mathbf V_f = 1\angle0^\circ$, $\mathbf I_L = (0.6\angle36.87^\circ/1)^* = 0.48 - j0.36\,\mathrm{pu}$ (flowing from generator to motor).

*Fault current.* With sources zeroed, the Thévenin reactance at the motor bus is the generator branch ($j0.25$) in parallel with the motor ($j0.20$): $Z_{\text{th}} = j0.1111$. So $\mathbf I_f = 1/j0.1111 = -j9.00\,\mathrm{pu}$.

*Contributions.* The fault current divides inversely to the branch reactances: the generator branch supplies $-j9\times0.20/0.45 = -j4.00$ and the motor $-j5.00$. Adding the pre-fault current: the generator delivers $\mathbf I_g = 0.48 - j0.36 - j4.00 = 0.48 - j4.36\,\mathrm{pu}$ ($4.39\,\mathrm{pu}$), and the current flowing out of the motor towards the fault is $-\mathbf I_L - j5.00 = -0.48 - j4.64\,\mathrm{pu}$ ($4.66\,\mathrm{pu}$). Their sum is $-j9.00$, as it must be: the pre-fault load current cancels in the fault itself.

*Check by internal voltages.* $\mathbf E_g'' = 1 + j0.25(0.48 - j0.36) = 1.09 + j0.12$ and $\mathbf E_m'' = 1 - j0.20(0.48 - j0.36) = 0.928 - j0.096$; then $\mathbf E_g''/j0.25 = 0.48 - j4.36$ and $\mathbf E_m''/j0.20 = -0.48 - j4.64$, the same results. Note that the motor contributes *more* than the generator, simply because it is electrically closer; motor contributions are essential in industrial fault studies.
:::
:::

## The bus impedance matrix

For a network with many buses we want the fault current at every bus, and for each fault the voltages everywhere. The inverse of the bus admittance matrix delivers all of this at once.

::: definition Bus impedance matrix {#def-zbus}
The **bus impedance matrix** is $Z_{\text{bus}} = Y_{\text{bus}}^{-1}$, where $Y_{\text{bus}}$ includes the machine reactances (subtransient, for fault studies) as shunt admittances to the reference and, if desired, loads as constant admittances. Then $\mathbf V = Z_{\text{bus}}\mathbf I$: the diagonal element $Z_{kk}$ is the **driving-point impedance** of bus $k$ (the voltage at $k$ per unit current injected there) and $Z_{ik}$ is the **transfer impedance** (the voltage at $i$ per unit current injected at $k$).
:::

::: theorem Fault calculation with the bus impedance matrix {#thm-zbus-fault}
For a three-phase fault through $Z_f$ at bus $k$, with pre-fault voltages $\mathbf V_i^{(0)}$,
$$
\mathbf I_f = \frac{\mathbf V_k^{(0)}}{Z_{kk} + Z_f},\qquad \mathbf V_i = \mathbf V_i^{(0)} - Z_{ik}\mathbf I_f\quad(i = 1,\dots,n),
$$ {#eq-zbus-fault}
and the current from bus $i$ to bus $j$ through a branch of impedance $z_{ij}$ is $(\mathbf V_i - \mathbf V_j)/z_{ij}$.
:::

::: proof
By [[#thm-thevenin-fault]] the changes are caused by a current $-\mathbf I_f$ injected at bus $k$ alone. By the definition of $Z_{\text{bus}}$, injecting the vector $\Delta\mathbf I$ with $-\mathbf I_f$ in position $k$ and zeros elsewhere changes the voltages by $\Delta\mathbf V = Z_{\text{bus}}\Delta\mathbf I$, i.e. $\Delta\mathbf V_i = -Z_{ik}\mathbf I_f$. At bus $k$ itself the Thévenin impedance is the driving-point impedance, $Z_{\text{th}} = Z_{kk}$, so [[#eq-thevenin-fault]] gives $\mathbf I_f$. Adding the changes to the pre-fault voltages gives [[#eq-zbus-fault]].
:::

The whole fault study of a network therefore needs only the diagonal of $Z_{\text{bus}}$ for the fault currents and one column for the voltages during each fault. In large networks $Z_{\text{bus}}$ is full even though $Y_{\text{bus}}$ is sparse, so the required columns are computed from a sparse factorisation of $Y_{\text{bus}}$ rather than by forming the inverse; for small networks, and for teaching, the matrix can also be built element by element by the $Z_{\text{bus}}$ building algorithm, adding one branch at a time (a branch to the reference, a new bus, a link between existing buses), each step a simple update.

::: example Fault study of a three-bus network {#ex-zbus}
A $132\,\mathrm{kV}$ network on a $100\,\mathrm{MVA}$ base has generators at bus 1 ($X_d'' = 0.20$) and bus 2 ($X_d'' = 0.15$) and lines with reactances $x_{12} = 0.10$, $x_{13} = 0.20$, $x_{23} = 0.25\,\mathrm{pu}$; resistances and loads are neglected and all pre-fault voltages are $1\,\mathrm{pu}$. Find $Z_{\text{bus}}$, the fault current for a bolted three-phase fault at bus 3 in kA, the bus voltages during the fault, and the line currents. Repeat for a fault through $Z_f = j0.1\,\mathrm{pu}$.
::: solution
$Y_{\text{bus}}$, with the generators as admittances $-j5$ and $-j6.667$ to the reference:
$$
Y_{\text{bus}} = -j\begin{bmatrix}20 & -10 & -5\\ -10 & 20.667 & -4\\ -5 & -4 & 9\end{bmatrix},\qquad Z_{\text{bus}} = j\begin{bmatrix}0.1074 & 0.0695 & 0.0905\\ 0.0695 & 0.0979 & 0.0821\\ 0.0905 & 0.0821 & 0.1979\end{bmatrix}.
$$
*Bolted fault at bus 3.* $\mathbf I_f = 1/(j0.1979) = -j5.053\,\mathrm{pu}$. With $I_b = 100\times10^6/(\sqrt3\times132\times10^3) = 437.4\,\mathrm A$, $I_f = 2.21\,\mathrm{kA}$, a **fault level** of $505\,\mathrm{MVA}$. Bus voltages: $V_1 = 1 - 0.0905\times5.053 = 0.543$, $V_2 = 1 - 0.0821\times5.053 = 0.585$, $V_3 = 0$. Line currents: $\mathbf I_{13} = (0.543 - 0)/j0.20 = -j2.713$, $\mathbf I_{23} = 0.585/j0.25 = -j2.340$, and $\mathbf I_{12} = (0.543 - 0.585)/j0.10 = +j0.426$, i.e. $0.426\,\mathrm{pu}$ flows from bus 2 to bus 1. Generators: $\mathbf I_{g1} = (1 - 0.543)/j0.20 = -j2.287$, $\mathbf I_{g2} = (1 - 0.585)/j0.15 = -j2.766$. Check at bus 1: $2.287 + 0.426 = 2.713$.

*Fault through $j0.1$.* $\mathbf I_f = 1/j0.2979 = -j3.357\,\mathrm{pu}$ ($1.47\,\mathrm{kA}$); $V_1 = 0.696$, $V_2 = 0.724$, $V_3 = 0.336\,\mathrm{pu}$. A fault impedance of half the driving-point impedance reduces the current by a third and keeps the voltages markedly higher, which matters for protection that must detect high-impedance faults.
:::
:::

::: quiz
In [[#ex-zbus]], which element of $Z_{\text{bus}}$ alone determines how deeply the voltage at bus 2 sags for a bolted fault at bus 3?
- [ ] $Z_{22}$
- [x] $Z_{23}$, relative to $Z_{33}$
- [ ] $Z_{11}$
- [ ] None: the sag is the same at every bus
::: solution
From [[#eq-zbus-fault]], $V_2 = 1 - Z_{23}\mathbf I_f = 1 - Z_{23}/Z_{33}$ for a bolted fault at $1\,\mathrm{pu}$ pre-fault voltage. The ratio of the transfer impedance to the driving-point impedance is the depth of the voltage dip: $0.0821/0.1979 = 0.415$, leaving $0.585\,\mathrm{pu}$.
:::
:::

## Circuit breakers and fault levels

A **circuit breaker** must close onto a fault and carry its asymmetrical peak current, and it must interrupt the current at a natural current zero after its contacts part, withstanding the **transient recovery voltage** that appears across it. Modern high-voltage breakers use **SF₆** gas or vacuum (at medium voltage) as the interrupting medium and open in two to three cycles.

A breaker is specified by its rated voltage, its rated continuous current, its **rated short-circuit breaking current** (RMS symmetrical, with an allowance for the DC component at contact parting) and its **rated peak withstand (making) current**. Standard breaking currents form a series: $16$, $20$, $25$, $31.5$, $40$, $50$, $63\,\mathrm{kA}$. The **fault level** or **short-circuit MVA** at a bus, $\sqrt3V_{\text{nominal}}I_f$, equals $S_b/\abs{Z_{kk}}$ in per unit terms, and it characterises how "stiff" the bus is: a high fault level means small voltage dips when large motors start, but large breaker duties.

::: algorithm Selecting breakers by the simplified method {#alg-breaker}
1. Build the network with subtransient reactances for generators and large motors (and an equivalent source for the external grid, from its quoted fault level).
2. Compute the symmetrical fault current $I_f$ at each bus, normally for a three-phase fault with pre-fault voltage $1.0$ or $1.1\,\mathrm{pu}$; also check single line-to-ground faults ([[power-systems/unsymmetrical-faults]]), which can be larger near solidly earthed transformers.
3. For each breaker, find the largest current it can be required to interrupt (the fault on its load side with all other infeeds, or on its source side), and choose a rated breaking current above it, allowing for the DC component at contact parting where $X/R$ is high.
4. Check the peak making current $\kappa\sqrt2 I_f$ against the rated peak withstand.
:::

::: example Designing a current-limiting reactor {#ex-reactor}
An $11\,\mathrm{kV}$ switchboard is supplied from the grid through a transformer; the fault level contributed by the grid at the switchboard is $500\,\mathrm{MVA}$. A new $20\,\mathrm{MVA}$ generator with $X_d'' = 0.15\,\mathrm{pu}$ is to be connected to the same switchboard. The existing breakers are rated $25\,\mathrm{kA}$. Find the fault current with the generator connected, and the smallest series reactor in the grid infeed that keeps the fault current within the breaker rating.
::: solution
On $100\,\mathrm{MVA}$: the grid infeed is $Z_{\text{grid}} = 100/500 = j0.200\,\mathrm{pu}$ and the generator $j0.15\times100/20 = j0.750\,\mathrm{pu}$. Their parallel combination is $j0.1579$, so $I_f = 6.333\,\mathrm{pu}$; with $I_b = 100\times10^6/(\sqrt3\times11\,000) = 5249\,\mathrm A$, $I_f = 33.2\,\mathrm{kA}$, well over $25\,\mathrm{kA}$.

The limit is $25\,000/5249 = 4.763\,\mathrm{pu}$. The generator alone contributes $1/0.75 = 1.333\,\mathrm{pu}$, so the grid branch must contribute at most $3.430\,\mathrm{pu}$, requiring $0.200 + X_r\ge1/3.430 = 0.2916\,\mathrm{pu}$, so $X_r\ge0.0916\,\mathrm{pu}$. With $Z_b = 11^2/100 = 1.21\,\Omega$, that is $0.111\,\Omega$ per phase ($0.353\,\mathrm{mH}$ at $50\,\mathrm{Hz}$). Choosing a standard $0.12\,\Omega$ reactor gives $X_r = 0.0992\,\mathrm{pu}$ and $I_f = 1/0.2992 + 1.333 = 4.676\,\mathrm{pu} = 24.5\,\mathrm{kA}$.

The price is a voltage drop in the reactor at normal load ($I X_r\sin\theta$-dominated, about $1$ to $2\,\%$ at full load) and some reactive power loss; alternatives are to split the switchboard with a bus-section reactor or to replace the breakers.
:::
:::

::: history
The decaying short-circuit current of synchronous machines was recorded with oscillographs in the first decades of the twentieth century, and the concepts of transient and subtransient reactance were developed in the 1920s, notably by R. E. Doherty and C. A. Nickle of General Electric in a series of AIEE papers on synchronous machines (1926–1930), and given their modern form by Robert H. Park's two-reaction theory of 1929. Fault currents of large networks were computed on AC and DC network analysers from the late 1920s to the 1960s. The bus impedance matrix and its building algorithm were developed for digital computers in the late 1950s and 1960s. Circuit-breaker technology moved from oil and air-blast to SF₆, introduced commercially in the 1950s, and vacuum interrupters for medium voltage, commercial from the 1960s.
:::

## Where this leads

Symmetrical faults keep the network balanced. Most real faults involve one or two phases, and analysing them needs **symmetrical components**, the subject of [[power-systems/unsymmetrical-faults]]; the positive-sequence network used there is exactly the network of this chapter, and $Z_{\text{bus}}$ reappears for each sequence. The transient reactance and the voltage behind it are the generator model for [[power-systems/power-system-stability]], where we ask not how large the fault current is but whether the machines stay in synchronism while the fault is cleared. The fault currents and voltages computed here are what protective relays measure, in [[power-systems/protection-smart-grid]].

::: summary
- A fault current in an RL network has a symmetrical AC component and a DC offset that depends on the instant of the fault; the worst first peak is about $\sqrt2I_{\text{sym}}(1 + e^{-\pi R/X})$, or $\kappa\sqrt2I_{\text{sym}}$ with $\kappa = 1.02 + 0.98e^{-3R/X}$.
- A shorted generator's AC current decays from $E/X_d''$ through $E/X_d'$ to $E/X_d$ with time constants $T_d''$ (tens of ms) and $T_d'$ (about a second).
- By Thévenin's theorem $\mathbf I_f = \mathbf V_f/(Z_{\text{th}} + Z_f)$; during-fault quantities are pre-fault values plus the changes caused by injecting $-\mathbf I_f$.
- $Z_{\text{bus}} = Y_{\text{bus}}^{-1}$ (with machine reactances) gives all fault currents ($\mathbf V_k^{(0)}/(Z_{kk} + Z_f)$) and voltages during each fault ($\mathbf V_i^{(0)} - Z_{ik}\mathbf I_f$).
- The fault level $S_b/\abs{Z_{kk}}$ measures a bus's stiffness; breakers are chosen for symmetrical breaking current and asymmetrical peak making current; reactors limit fault levels at a cost in voltage drop.
:::

## Exercises

::: exercise Fault level from a per-unit impedance {level=1 check="100/0.08"}
The driving-point impedance at a bus is $j0.08\,\mathrm{pu}$ on $100\,\mathrm{MVA}$. Find the three-phase fault level in MVA.
::: solution
$S_f = S_b/\abs{Z_{kk}} = 100/0.08 = 1250\,\mathrm{MVA}$.
:::
:::

::: exercise Generator subtransient current {level=1 check="50e6/(sqrt(3)*11e3)/0.18"}
A $50\,\mathrm{MVA}$, $11\,\mathrm{kV}$ generator with $X_d'' = 0.18\,\mathrm{pu}$ is shorted at its terminals from no load at rated voltage. Find the initial symmetrical RMS current in amperes.
::: solution
$I_b = 50\times10^6/(\sqrt3\times11\,000) = 2624\,\mathrm A$; $I'' = 2624/0.18 = 14.58\,\mathrm{kA}$.
:::
:::

::: exercise Peak factor {level=1 check="1.02+0.98*exp(-3/25)"}
Find the IEC peak factor $\kappa$ for $X/R = 25$.
::: solution
$\kappa = 1.02 + 0.98e^{-0.12} = 1.02 + 0.869 = 1.889$.
:::
:::

::: exercise Current after three cycles {level=2 check="(1/0.2-1/0.3)*exp(-0.06/0.03)+(1/0.3-1/1.5)*exp(-0.06/0.8)+1/1.5"}
A generator with $X_d'' = 0.20$, $X_d' = 0.30$, $X_d = 1.5\,\mathrm{pu}$, $T_d'' = 0.03\,\mathrm s$, $T_d' = 0.8\,\mathrm s$, initially unloaded at $1\,\mathrm{pu}$, is shorted. Find the RMS symmetrical current in per unit at $t = 0.06\,\mathrm s$.
::: solution
$I = (5 - 3.333)e^{-2} + (3.333 - 0.667)e^{-0.075} + 0.667 = 0.226 + 2.474 + 0.667 = 3.37\,\mathrm{pu}$.
:::
:::

::: exercise Thévenin with a fault impedance {level=2 check="1/hypot(0.02,0.25)"}
At a bus with pre-fault voltage $1.0\,\mathrm{pu}$ the Thévenin impedance is $j0.20\,\mathrm{pu}$. A fault occurs through an arc resistance of $0.02\,\mathrm{pu}$ and a reactance of $0.05\,\mathrm{pu}$. Find the fault current magnitude in per unit.
::: solution
$\mathbf I_f = 1/(0.02 + j0.25)$, $\abs{\mathbf I_f} = 1/\sqrt{0.02^2 + 0.25^2} = 1/0.2508 = 3.99\,\mathrm{pu}$.
:::
:::

::: exercise Voltage dip at a remote bus {level=2 check="1-0.0905/0.1074"}
In [[#ex-zbus]], a bolted fault occurs at bus 1. Find the voltage at bus 3 during the fault in per unit.
::: solution
$\mathbf I_f = 1/(j0.1074) = -j9.31\,\mathrm{pu}$ and $V_3 = 1 - Z_{31}/Z_{11} = 1 - 0.0905/0.1074 = 0.157\,\mathrm{pu}$. Bus 3, which has no generation and is closely coupled to bus 1, collapses almost completely.
:::
:::

::: exercise Internal voltage of a loaded generator {level=2 check="sqrt(1.075^2+0.225^2)"}
A generator with $X_d'' = 0.25\,\mathrm{pu}$ delivers $\mathbf I = 0.9 - j0.3\,\mathrm{pu}$ at terminal voltage $1\angle0^\circ$. Find $\abs{\mathbf E''}$ and the subtransient current for a bolted fault at its terminals.
::: solution
$\mathbf E'' = 1 + j0.25(0.9 - j0.3) = 1.075 + j0.225$, $\abs{\mathbf E''} = 1.098\,\mathrm{pu}$. The fault current is $\mathbf E''/j0.25$, of magnitude $4.39\,\mathrm{pu}$, about $10\,\%$ more than the $4.0\,\mathrm{pu}$ estimate from an unloaded machine.
:::
:::

::: exercise Building Z-bus by adding a branch {level=3}
A network has $Z_{\text{bus}} = j\begin{bmatrix}0.15 & 0.05\\0.05 & 0.10\end{bmatrix}$. A new line of reactance $j0.20$ is added between buses 1 and 2. Show that the new matrix is $Z_{\text{new}} = Z - \dfrac{(Z_{:1} - Z_{:2})(Z_{1:} - Z_{2:})}{Z_{11} + Z_{22} - 2Z_{12} + z_b}$, and compute it. Check by inverting $Y_{\text{bus}}$.
::: hint
Adding a branch $z_b$ between buses $i$ and $j$ changes $Y_{\text{bus}}$ by $\mathbf a\mathbf a^{\mathsf T}/z_b$ with $\mathbf a = \mathbf e_i - \mathbf e_j$; use the Sherman–Morrison formula.
:::
::: solution
$Y_{\text{new}} = Y + \mathbf a\mathbf a^{\mathsf T}/z_b$. By Sherman–Morrison, $(Y + \mathbf a\mathbf a^{\mathsf T}/z_b)^{-1} = Z - Z\mathbf a\mathbf a^{\mathsf T}Z/(z_b + \mathbf a^{\mathsf T}Z\mathbf a)$, and $Z\mathbf a = Z_{:i} - Z_{:j}$, $\mathbf a^{\mathsf T}Z\mathbf a = Z_{ii} + Z_{jj} - 2Z_{ij}$, which is the stated formula. Here $Z_{:1} - Z_{:2} = j(0.10, -0.05)^{\mathsf T}$ and the denominator is $j(0.15 + 0.10 - 0.10 + 0.20) = j0.35$. Writing $Z\mathbf a = j\mathbf v$ with $\mathbf v = (0.10, -0.05)^{\mathsf T}$, the correction is $(j\mathbf v)(j\mathbf v)^{\mathsf T}/(j0.35) = j\,\mathbf v\mathbf v^{\mathsf T}/0.35$ with the sign of a subtraction, i.e. $Z_{\text{new}} = j\bigl(Z_r - \mathbf v\mathbf v^{\mathsf T}/0.35\bigr)$ where $Z = jZ_r$. Here $\mathbf v\mathbf v^{\mathsf T}/0.35 = \begin{bmatrix}0.02857 & -0.01429\\-0.01429 & 0.00714\end{bmatrix}$, so $Z_{\text{new}} = j\begin{bmatrix}0.1214 & 0.0643\\0.0643 & 0.0929\end{bmatrix}$. Check: $Y = Z^{-1} = -j\begin{bmatrix}8 & -4\\-4 & 12\end{bmatrix}$; adding the line, $Y_{\text{new}} = -j\begin{bmatrix}13 & -9\\-9 & 17\end{bmatrix}$, whose inverse is $\frac{j}{140}\begin{bmatrix}17 & 9\\9 & 13\end{bmatrix} = j\begin{bmatrix}0.1214 & 0.0643\\0.0643 & 0.0929\end{bmatrix}$.
:::
:::

::: exercise Choosing a breaker {level=3}
A $33\,\mathrm{kV}$ bus is fed by two $30\,\mathrm{MVA}$ transformers in parallel, each with $X = 0.10\,\mathrm{pu}$ on its rating, from a $132\,\mathrm{kV}$ grid with a fault level of $3000\,\mathrm{MVA}$; the network $X/R$ at the bus is $12$. Find the symmetrical fault current at the bus (pre-fault voltage $1.0\,\mathrm{pu}$), choose a standard breaker rating from $16$, $20$, $25$, $31.5\,\mathrm{kA}$, and check the peak making current against a rated peak withstand of $2.5$ times the breaking current.
::: hint
Work on $100\,\mathrm{MVA}$: the grid is $j100/3000$ and each transformer $j0.10\times100/30$.
:::
::: solution
Grid $j0.0333$; transformers $j0.3333$ each, $j0.1667$ in parallel; total $j0.2000\,\mathrm{pu}$, so $I_f = 5.0\,\mathrm{pu}$. $I_b = 100\times10^6/(\sqrt3\times33\,000) = 1750\,\mathrm A$, so $I_f = 8.75\,\mathrm{kA}$. A $16\,\mathrm{kA}$ breaker suffices, leaving margin for growth (a third transformer would give $1/(0.0333 + 0.1111) = 6.92\,\mathrm{pu} = 12.1\,\mathrm{kA}$, still within it). Peak: $\kappa = 1.02 + 0.98e^{-0.25} = 1.783$, $i_p = 1.783\times\sqrt2\times8.75 = 22.1\,\mathrm{kA}$, below $2.5\times16 = 40\,\mathrm{kA}$.
:::
:::
