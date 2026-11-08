About three quarters of all faults on overhead transmission lines involve a single phase and earth: lightning flashes over one insulator string, or a conductor swings into a tree. Most of the rest involve two phases, with or without earth. Only a few percent are the balanced three-phase faults of [[power-systems/symmetrical-faults]]. An unbalanced fault breaks the symmetry on which per-phase analysis rests: the three phase currents are no longer equal and displaced by $120^\circ$, so we cannot draw one phase and infer the others.

The tool that restores simplicity is the method of **symmetrical components**, published by Charles Fortescue in 1918. Any set of three unbalanced phasors can be written as the sum of three balanced sets: a **positive-sequence** set rotating in the normal order, a **negative-sequence** set rotating in the reverse order, and a **zero-sequence** set of three equal phasors. A balanced network does not mix the sequences, so each sequence has its own independent per-phase network. An unbalanced fault, the only unbalanced element, then becomes a particular interconnection of the three **sequence networks** at the fault point. In this chapter we develop the transformation, find the sequence impedances of generators, lines and transformers (including the zero-sequence paths, which depend on earthing and winding connections), and derive the fault currents for single line-to-ground, line-to-line and double line-to-ground faults.

## Symmetrical components

The key is the complex operator that rotates a phasor by $120^\circ$.

::: definition The operator a {#def-operator-a}
The **operator** $a$ is the complex number
$$
a = 1\angle120^\circ = -\tfrac12 + j\tfrac{\sqrt3}2,
$$
so that $a^2 = 1\angle240^\circ = 1\angle-120^\circ$, $a^3 = 1$ and $1 + a + a^2 = 0$. Multiplying a phasor by $a$ rotates it $120^\circ$ anticlockwise. A balanced set in the sequence $a, b, c$ with phase $a$ equal to $\mathbf V$ is $(\mathbf V, a^2\mathbf V, a\mathbf V)$.
:::

::: widget complexplane
mode: roots
n: 3
caption: The cube roots of unity, $1$, $a = 1\angle120^\circ$ and $a^2 = 1\angle240^\circ$. They are the multipliers of a balanced three-phase set, and their sum is zero, which is why balanced phase currents need no neutral. Change $n$ and drag the number whose roots are shown: the roots of any $z$ form a regular polygon, but only for $n = 3$ and $z = 1$ do we get the operator $a$ of three-phase analysis.
:::

::: theorem Fortescue's decomposition {#thm-fortescue}
Any three phasors $\mathbf V_a$, $\mathbf V_b$, $\mathbf V_c$ can be written uniquely as the sum of a zero-sequence set $(\mathbf V_0, \mathbf V_0, \mathbf V_0)$, a positive-sequence set $(\mathbf V_1, a^2\mathbf V_1, a\mathbf V_1)$ and a negative-sequence set $(\mathbf V_2, a\mathbf V_2, a^2\mathbf V_2)$:
$$
\begin{bmatrix}\mathbf V_a\\ \mathbf V_b\\ \mathbf V_c\end{bmatrix} = A\begin{bmatrix}\mathbf V_0\\ \mathbf V_1\\ \mathbf V_2\end{bmatrix},\qquad A = \begin{bmatrix}1 & 1 & 1\\ 1 & a^2 & a\\ 1 & a & a^2\end{bmatrix},
$$ {#eq-abc}
with inverse
$$
\begin{bmatrix}\mathbf V_0\\ \mathbf V_1\\ \mathbf V_2\end{bmatrix} = \frac13\begin{bmatrix}1 & 1 & 1\\ 1 & a & a^2\\ 1 & a^2 & a\end{bmatrix}\begin{bmatrix}\mathbf V_a\\ \mathbf V_b\\ \mathbf V_c\end{bmatrix}.
$$ {#eq-012}
The same transformation applies to currents. The **sequence components** $\mathbf V_0$, $\mathbf V_1$, $\mathbf V_2$ are by convention those of phase $a$.
:::

::: proof
The decomposition is [[#eq-abc]] by definition of the three sets. It is unique if $A$ is invertible. Let $A^\star$ be the matrix in [[#eq-012]] (without the $\frac13$). The $(i, j)$ entry of $A^\star A$ is a sum of three terms of the form $a^{m}$ for $m = 0, k, 2k$ (mod $3$), where $k$ depends on $i - j$: on the diagonal $k = 0$ and the sum is $3$; off the diagonal $k\ne0$ and the sum is $1 + a + a^2 = 0$ or $1 + a^2 + a^4 = 1 + a^2 + a = 0$. Hence $A^\star A = 3I$ and $A^{-1} = \frac13A^\star$, which is [[#eq-012]].
:::

Two consequences are immediate. The zero-sequence component is one third of the sum of the phase quantities: $\mathbf I_0 = (\mathbf I_a + \mathbf I_b + \mathbf I_c)/3$, so the current in a neutral or earth return is $\mathbf I_n = 3\mathbf I_0$, and **zero-sequence currents cannot flow where there is no return path**: in a delta winding's line connections or an ungrounded star. And line-to-line voltages, which always sum to zero, have no zero-sequence component.

::: theorem Power in sequence components {#thm-sequence-power}
The total complex power of a three-phase circuit is
$$
\mathbf S = \mathbf V_a\mathbf I_a^* + \mathbf V_b\mathbf I_b^* + \mathbf V_c\mathbf I_c^* = 3\bigl(\mathbf V_0\mathbf I_0^* + \mathbf V_1\mathbf I_1^* + \mathbf V_2\mathbf I_2^*\bigr).
$$ {#eq-sequence-power}
:::

::: proof
$\mathbf S = \mathbf V_{abc}^{\mathsf T}\mathbf I_{abc}^* = (A\mathbf V_{012})^{\mathsf T}(A\mathbf I_{012})^* = \mathbf V_{012}^{\mathsf T}A^{\mathsf T}A^*\mathbf I_{012}^*$. Since $A$ is symmetric and $A^* = A^\star$ (conjugation swaps $a$ and $a^2$), $A^{\mathsf T}A^* = AA^\star = 3I$ by the proof of [[#thm-fortescue]].
:::

The factor $3$ appears because the components are those of one phase. The sequences do not exchange power with each other.

::: example Decomposing unbalanced currents {#ex-decompose}
A three-phase circuit carries $\mathbf I_a = 100\angle0^\circ\,\mathrm A$, $\mathbf I_b = 50\angle-120^\circ\,\mathrm A$ and $\mathbf I_c = 0$ (phase $c$ open). Find the sequence components and the neutral current.
::: solution
By [[#eq-012]]:
$$
\begin{aligned}
\mathbf I_0 &= \tfrac13(100 + 50\angle-120^\circ) = \tfrac13(75 - j43.30) = 28.87\angle-30^\circ\,\mathrm A,\\
\mathbf I_1 &= \tfrac13(100 + a\cdot50\angle-120^\circ) = \tfrac13(100 + 50\angle0^\circ) = 50.0\angle0^\circ\,\mathrm A,\\
\mathbf I_2 &= \tfrac13(100 + a^2\cdot50\angle-120^\circ) = \tfrac13(100 + 50\angle120^\circ) = \tfrac13(75 + j43.30) = 28.87\angle30^\circ\,\mathrm A.
\end{aligned}
$$
The neutral current is $3\mathbf I_0 = 86.6\angle-30^\circ\,\mathrm A$, which equals $\mathbf I_a + \mathbf I_b$ directly. Check phase $c$: $\mathbf I_0 + a\mathbf I_1 + a^2\mathbf I_2 = 28.87\angle-30^\circ + 50\angle120^\circ + 28.87\angle270^\circ = 0$. Unbalanced loads produce negative-sequence currents, which in rotating machines create a backward-rotating field that heats the rotor; generators therefore have a limit on continuous negative-sequence current, typically $5$ to $10\,\%$ of rated current.
:::
:::

## Sequence impedances and sequence networks

### Why the sequences decouple

::: theorem Sequence impedances of a symmetrical element {#thm-sequence-impedances}
A three-phase element whose impedance matrix has equal self impedances $Z_s$ and equal mutual impedances $Z_m$,
$$
\mathbf V_{abc} = \begin{bmatrix}Z_s & Z_m & Z_m\\ Z_m & Z_s & Z_m\\ Z_m & Z_m & Z_s\end{bmatrix}\mathbf I_{abc},
$$
is diagonalised by the symmetrical-component transformation: $\mathbf V_0 = Z_0\mathbf I_0$, $\mathbf V_1 = Z_1\mathbf I_1$, $\mathbf V_2 = Z_2\mathbf I_2$ with
$$
Z_0 = Z_s + 2Z_m,\qquad Z_1 = Z_2 = Z_s - Z_m.
$$ {#eq-z012}
:::

::: proof
$\mathbf V_{012} = A^{-1}Z_{abc}A\,\mathbf I_{012}$. The columns of $A$ are eigenvectors of $Z_{abc}$: for the first column $(1, 1, 1)^{\mathsf T}$, each row gives $Z_s + 2Z_m$; for the second, $(1, a^2, a)^{\mathsf T}$, the first row gives $Z_s + Z_m(a^2 + a) = Z_s - Z_m$, and the other rows give the same multiple of $a^2$ and $a$; similarly for the third. So $A^{-1}Z_{abc}A = \operatorname{diag}(Z_s + 2Z_m, Z_s - Z_m, Z_s - Z_m)$.
:::

Any element that is symmetrical among its phases (a transposed line, a transformer bank, a balanced load) therefore has independent sequence networks. Rotating machines are not described by such a matrix, since their rotor rotates in one direction, so their positive- and negative-sequence impedances differ, but they too have decoupled sequence networks. The **positive-sequence network** is the ordinary per-phase network of the balanced system, with the generator emfs; the **negative-** and **zero-sequence networks** contain no sources (generators produce balanced positive-sequence voltages only) and have their own impedances.

### Sequence impedances of power-system components

- **Synchronous machines.** $Z_1$ is $jX_d''$ (or $X_d'$, $X_d$ as in [[power-systems/symmetrical-faults]]). $Z_2$: negative-sequence currents create a field rotating backwards at twice synchronous speed relative to the rotor, which induces currents in the damper windings that keep the flux out, so $X_2\approx X_d''$ (more precisely $(X_d'' + X_q'')/2$). $Z_0$: zero-sequence currents produce almost no air-gap field, so $X_0$ is only a fraction of the leakage reactance, about $0.02$ to $0.1\,\mathrm{pu}$. If the neutral is grounded through $Z_n$, the zero-sequence network contains $3Z_n$, because the neutral carries $3\mathbf I_0$ while the network is drawn for one phase.
- **Transmission lines.** $Z_1 = Z_2$ is the series impedance of [[power-systems/line-models]]. $Z_0$ includes the earth return and the earth wires and is typically $2$ to $3.5$ times $Z_1$, with a larger resistance.
- **Transformers.** $Z_1 = Z_2$ is the leakage impedance. $Z_0$ equals the leakage impedance too, *if* a zero-sequence path exists, and that depends on the winding connections.

| Connection (side P – side S) | Zero-sequence network |
|---|---|
| grounded Y – grounded Y | series $Z_0$ connecting P and S |
| grounded Y – Δ | P connected to reference through $Z_0$; S open |
| ungrounded Y – any | P open (no path for zero sequence) |
| Δ – Δ | both sides open; nothing connected |

The delta winding is the subtle case. Zero-sequence currents induced in it circulate around the closed delta, so the grounded-star side sees a path to earth through the leakage impedance, but no zero-sequence current can leave the delta's terminals. This is why a star–delta transformer isolates the zero-sequence networks of the two systems it joins, and why a **grounding transformer** (a zigzag or star–delta unit) can create an earth point on an otherwise ungrounded system.

Star–delta transformers also shift phase: in the standard American convention the positive-sequence quantities on the high-voltage side lead those on the low-voltage side by $30^\circ$ and the negative-sequence quantities lag by $30^\circ$. Fault currents computed on one side must be shifted accordingly when they are carried to the other, although magnitudes are unaffected.

::: quiz
A generator is connected to a transmission line through a step-up transformer whose generator side is delta and whose line side is solidly grounded star. An earth fault occurs on the line. Which machines contribute zero-sequence current to the fault?
- [ ] The generator, through the transformer
- [x] Only the transformer's grounded star winding (with the delta providing the circulating path); the generator supplies none
- [ ] Neither, because a delta winding blocks all fault current
- [ ] Both equally
::: solution
In the zero-sequence network the grounded-star side of the transformer is connected to the reference through its leakage impedance, while the delta side is open. Zero-sequence current therefore flows from the earth through the transformer's star neutral into the fault, balanced by current circulating in the delta; none reaches the generator. The generator does supply positive- and negative-sequence current through the transformer.
:::
:::

::: warning The factor 3 in neutral impedances
A grounding impedance $Z_n$ between a star point and earth appears as $3Z_n$ in the zero-sequence network and not at all in the positive and negative ones. Forgetting the factor $3$ underestimates the effect of a grounding resistor or reactor threefold. Similarly the earth current is $3\mathbf I_0$, not $\mathbf I_0$.
:::

## Unbalanced faults

We consider faults at a bus $k$ whose sequence networks are reduced to their Thévenin equivalents: a positive-sequence source $\mathbf V_f$ (the pre-fault voltage) behind $Z_1$, and source-free negative- and zero-sequence networks of impedances $Z_2$ and $Z_0$ (the driving-point impedances $Z_{kk}^{(1)}$, $Z_{kk}^{(2)}$, $Z_{kk}^{(0)}$ of the three sequence bus impedance matrices). At the fault,
$$
\mathbf V_1 = \mathbf V_f - Z_1\mathbf I_1,\qquad \mathbf V_2 = -Z_2\mathbf I_2,\qquad \mathbf V_0 = -Z_0\mathbf I_0,
$$ {#eq-thevenin-seq}
with currents flowing *out* of the network into the fault. The fault itself supplies three more conditions, and the faulted phase is taken as $a$ (or, for faults between two phases, $b$ and $c$), so that the equations are as symmetrical as possible.

::: theorem Single line-to-ground fault {#thm-slg}
For a fault from phase $a$ to earth through impedance $Z_f$, the sequence networks are connected **in series**, and
$$
\mathbf I_0 = \mathbf I_1 = \mathbf I_2 = \frac{\mathbf V_f}{Z_0 + Z_1 + Z_2 + 3Z_f},\qquad \mathbf I_a = 3\mathbf I_0.
$$ {#eq-slg}
:::

::: proof
The fault conditions are $\mathbf I_b = \mathbf I_c = 0$ and $\mathbf V_a = Z_f\mathbf I_a$. From [[#eq-012]] with $\mathbf I_b = \mathbf I_c = 0$, $\mathbf I_0 = \mathbf I_1 = \mathbf I_2 = \mathbf I_a/3$. Then $\mathbf V_a = \mathbf V_0 + \mathbf V_1 + \mathbf V_2 = \mathbf V_f - (Z_0 + Z_1 + Z_2)\mathbf I_0$ by [[#eq-thevenin-seq]], and setting this equal to $Z_f\cdot3\mathbf I_0$ gives [[#eq-slg]]. Equal currents and voltages that add up to $3Z_f\mathbf I_0$ are exactly what a series connection of the three networks with $3Z_f$ produces.
:::

::: theorem Line-to-line fault {#thm-ll}
For a fault between phases $b$ and $c$ through $Z_f$ (not involving earth), the positive- and negative-sequence networks are connected **in parallel** (in opposition) and the zero-sequence network is not involved:
$$
\mathbf I_0 = 0,\qquad \mathbf I_1 = -\mathbf I_2 = \frac{\mathbf V_f}{Z_1 + Z_2 + Z_f},\qquad \mathbf I_b = -\mathbf I_c = -j\sqrt3\,\mathbf I_1.
$$ {#eq-ll}
:::

::: proof
The conditions are $\mathbf I_a = 0$, $\mathbf I_b = -\mathbf I_c$ and $\mathbf V_b - \mathbf V_c = Z_f\mathbf I_b$. From [[#eq-012]], $\mathbf I_0 = 0$ and $\mathbf I_1 = \frac13(a - a^2)\mathbf I_b$, $\mathbf I_2 = \frac13(a^2 - a)\mathbf I_b = -\mathbf I_1$. Since $a - a^2 = j\sqrt3$, $\mathbf I_b = -j\sqrt3\,\mathbf I_1$. For voltages, $\mathbf V_b - \mathbf V_c = (a^2 - a)(\mathbf V_1 - \mathbf V_2) = -j\sqrt3(\mathbf V_1 - \mathbf V_2)$. Setting this equal to $Z_f\mathbf I_b = -j\sqrt3Z_f\mathbf I_1$ gives $\mathbf V_1 - \mathbf V_2 = Z_f\mathbf I_1$, i.e. $\mathbf V_f - Z_1\mathbf I_1 - Z_2\mathbf I_1 = Z_f\mathbf I_1$ using $\mathbf I_2 = -\mathbf I_1$ in [[#eq-thevenin-seq]]; solving gives [[#eq-ll]].
:::

::: theorem Double line-to-ground fault {#thm-dlg}
For a fault from phases $b$ and $c$ to earth through a common impedance $Z_f$ (with the phases bolted together), the three sequence networks are connected **in parallel**, with $3Z_f$ in series with the zero-sequence network:
$$
\mathbf I_1 = \frac{\mathbf V_f}{Z_1 + \dfrac{Z_2(Z_0 + 3Z_f)}{Z_2 + Z_0 + 3Z_f}},\quad \mathbf I_2 = -\mathbf I_1\frac{Z_0 + 3Z_f}{Z_2 + Z_0 + 3Z_f},\quad \mathbf I_0 = -\mathbf I_1\frac{Z_2}{Z_2 + Z_0 + 3Z_f},
$$ {#eq-dlg}
and the earth current is $\mathbf I_b + \mathbf I_c = 3\mathbf I_0$.
:::

::: proof
The conditions are $\mathbf I_a = 0$ and $\mathbf V_b = \mathbf V_c = Z_f(\mathbf I_b + \mathbf I_c)$. From $\mathbf I_a = 0$: $\mathbf I_0 + \mathbf I_1 + \mathbf I_2 = 0$. From $\mathbf V_b = \mathbf V_c$ and [[#eq-012]]: $\mathbf V_1 = \frac13(\mathbf V_a + (a + a^2)\mathbf V_b) = \frac13(\mathbf V_a - \mathbf V_b)$ and likewise $\mathbf V_2 = \frac13(\mathbf V_a - \mathbf V_b)$, so $\mathbf V_1 = \mathbf V_2$. Also $\mathbf V_0 = \frac13(\mathbf V_a + 2\mathbf V_b)$, so $\mathbf V_0 - \mathbf V_1 = \mathbf V_b = Z_f\cdot3\mathbf I_0$. Thus $\mathbf V_1 = \mathbf V_2 = \mathbf V_0 - 3Z_f\mathbf I_0$, and the currents sum to zero: exactly a parallel connection of the three networks, with $3Z_f$ added to the zero-sequence branch. Current division of $\mathbf I_1$ between $Z_2$ and $Z_0 + 3Z_f$ gives [[#eq-dlg]].
:::

::: example Four fault types at one bus {#ex-four-faults}
At a $132\,\mathrm{kV}$ bus the Thévenin sequence impedances are $Z_1 = Z_2 = j0.12$ and $Z_0 = j0.08\,\mathrm{pu}$ on $100\,\mathrm{MVA}$ (several solidly earthed star–delta transformers nearby make $Z_0$ small). With $\mathbf V_f = 1\,\mathrm{pu}$, find the fault current for bolted three-phase, single line-to-ground, line-to-line and double line-to-ground faults, in kA ($I_b = 437.4\,\mathrm A$). For the SLG fault find the voltages of the healthy phases.
::: solution
*Three-phase:* $I = 1/0.12 = 8.333\,\mathrm{pu} = 3.64\,\mathrm{kA}$.

*SLG* ([[#eq-slg]]): $\mathbf I_0 = 1/(j0.32) = -j3.125$, $\mathbf I_a = -j9.375\,\mathrm{pu}$, $4.10\,\mathrm{kA}$: $12.5\,\%$ more than the three-phase fault, because $Z_0 < Z_1$. Voltages: $\mathbf V_0 = -j0.08\times(-j3.125) = -0.25$, $\mathbf V_1 = 1 - 0.375 = 0.625$, $\mathbf V_2 = -0.375$. Then $\mathbf V_b = \mathbf V_0 + a^2\mathbf V_1 + a\mathbf V_2 = 0.944\angle-113.4^\circ$ and $\mathbf V_c = 0.944\angle113.4^\circ\,\mathrm{pu}$: the healthy phases dip slightly.

*LL* ([[#eq-ll]]): $\mathbf I_1 = 1/(j0.24) = -j4.167$, $\abs{\mathbf I_b} = \sqrt3\times4.167 = 7.217\,\mathrm{pu} = 3.16\,\mathrm{kA}$, which is $\sqrt3/2 = 0.866$ of the three-phase value since $Z_2 = Z_1$.

*DLG* ([[#eq-dlg]]): $Z_2\parallel Z_0 = j0.048$, $\mathbf I_1 = 1/(j0.168) = -j5.952$, $\mathbf I_2 = j5.952\times0.08/0.20 = j2.381$, $\mathbf I_0 = j5.952\times0.12/0.20 = j3.571$. Phase currents: $\mathbf I_b = \mathbf I_0 + a^2\mathbf I_1 + a\mathbf I_2 = 8.99\angle143.4^\circ$ and $\mathbf I_c = 8.99\angle36.6^\circ\,\mathrm{pu}$ ($3.93\,\mathrm{kA}$ each), and the earth current $3\mathbf I_0 = 10.71\,\mathrm{pu} = 4.69\,\mathrm{kA}$.

On this solidly earthed system the largest phase current is the SLG fault's; breaker duties must be checked for it as well as for the three-phase fault.
:::
:::

::: quiz
For a bolted fault at the terminals of an unloaded generator with $X_2 = X_1$, what is the ratio of line-to-line to three-phase fault current?
- [ ] $1$
- [x] $\sqrt3/2\approx0.87$
- [ ] $1/\sqrt3\approx0.58$
- [ ] $3/2$
::: solution
Three-phase: $V_f/X_1$. Line-to-line: $\sqrt3V_f/(X_1 + X_2) = \sqrt3V_f/(2X_1)$. The ratio is $\sqrt3/2$. A line-to-line fault is never the largest when $X_2\approx X_1$; it matters for protection because it must still be detected.
:::
:::

::: widget plot
f: 3/(2 + k + 3*x); 1; sqrt(3)/(2 + x)
x: 0, 2
y: 0, 1.6
sliders: k=0.5:0.2:5:0.1
labels: I_{\text{SLG}}/I_{3\phi}; I_{3\phi}\ \text{(bolted)}; I_{LL}/I_{3\phi}
caption: Single line-to-ground fault current as a fraction of the three-phase fault current at the same bus, against the fault impedance expressed as $x = Z_f/Z_1$, for purely reactive impedances with $Z_2 = Z_1$ and $Z_0 = kZ_1$. With solid earthing ($x = 0$) the SLG current exceeds the three-phase current whenever $k < 1$; raise $k$ (long lines, few earthed neutrals) and the SLG current falls. A grounding impedance of a fraction of $Z_1$ reduces it dramatically, which is the purpose of neutral reactors and resistors. The third curve is the line-to-line fault through the same $Z_f$; it never involves $Z_0$.
:::

### Overvoltages on healthy phases and the earthing of systems

The voltage of the healthy phases during an SLG fault depends on $Z_0/Z_1$. With $Z_2 = Z_1$ and reactive impedances, $\mathbf V_b = \mathbf V_f\bigl[a^2 - (Z_0 - Z_1)/(Z_0 + 2Z_1)\bigr]$, whose magnitude rises from $1\,\mathrm{pu}$ at $Z_0 = Z_1$ to $1.25$ at $Z_0 = 3Z_1$ and towards $\sqrt3$ as $Z_0\to\infty$ (an ungrounded system, in which a single earth fault simply shifts the neutral). Transmission systems are **effectively earthed** ($X_0/X_1\le3$, $R_0/X_1\le1$), keeping the overvoltage below about $1.4\,\mathrm{pu}$ so that surge arresters and insulation can be rated for less. Distribution systems use solid earthing, resistance earthing (to limit earth-fault current to hundreds of amperes, reducing damage and touch voltages) or resonant (Petersen coil) earthing, in which a reactor tuned to the line capacitance nearly cancels the earth-fault current so that arcs extinguish themselves.

::: example SLG fault on a generator and a neutral reactor {#ex-neutral-reactor}
A $100\,\mathrm{MVA}$, $13.8\,\mathrm{kV}$ generator has $X_1 = X_d'' = 0.15$, $X_2 = 0.17$ and $X_0 = 0.05\,\mathrm{pu}$. (a) With the neutral solidly grounded and the machine unloaded at rated voltage, compare the SLG, LL and three-phase terminal fault currents. (b) Generator standards require that the winding not be subjected to a fault current larger than the three-phase value. Design a neutral reactor that makes the SLG current equal to the three-phase current.
::: solution
(a) Three-phase: $1/0.15 = 6.667\,\mathrm{pu}$. SLG: $3/(0.15 + 0.17 + 0.05) = 8.108\,\mathrm{pu}$. LL: $\sqrt3/(0.15 + 0.17) = 5.413\,\mathrm{pu}$. With $I_b = 4184\,\mathrm A$ these are $27.9$, $33.9$ and $22.6\,\mathrm{kA}$. The SLG current is $22\,\%$ higher than the three-phase current because the generator's $X_0$ is so small.

(b) With a neutral reactance $X_n$, the zero-sequence impedance is $X_0 + 3X_n$, and we need $3/(0.37 + 3X_n) = 6.667$, so $0.37 + 3X_n = 0.45$ and $X_n = 0.0267\,\mathrm{pu}$. With $Z_b = 13.8^2/100 = 1.904\,\Omega$, $X_n = 0.0508\,\Omega$. The reactor carries current only during earth faults, so it is a short-time rated device. Its effect on the healthy-phase voltages is mild: with solid grounding they are $0.935\,\mathrm{pu}$, with the reactor $1.003\,\mathrm{pu}$. (Large generators connected through a step-up transformer are in fact usually grounded through a high resistance via a distribution transformer, which limits earth-fault current to a few amperes; the reactor solution suits generators connected directly to a distribution bus.)
:::
:::

### Faults seen through a star–delta transformer

A fault on one side of a star–delta transformer looks quite different from the other side, and protection engineers must know how. Two effects combine: the zero-sequence current on the grounded-star side does not pass the delta, and the positive- and negative-sequence currents are shifted by $+30^\circ$ and $-30^\circ$ respectively. The following example shows the result for the most common case, an earth fault on the low-voltage side of a distribution transformer.

::: example An earth fault behind a Dyn transformer {#ex-dyn}
A $1\,\mathrm{MVA}$, $11/0.4\,\mathrm{kV}$ distribution transformer, delta on the $11\,\mathrm{kV}$ side and solidly earthed star on the $400\,\mathrm V$ side, has a leakage reactance of $0.05\,\mathrm{pu}$. The $11\,\mathrm{kV}$ source has a fault level of $250\,\mathrm{MVA}$ ($Z_1 = Z_2$). Find the current for a bolted earth fault on phase $a$ at the $400\,\mathrm V$ terminals, compare it with a three-phase fault there, and find the currents in the $11\,\mathrm{kV}$ lines. Take the high-voltage positive-sequence quantities as leading the low-voltage ones by $30^\circ$.
::: solution
On a $1\,\mathrm{MVA}$ base the source is $j1/250 = j0.004\,\mathrm{pu}$. At the $400\,\mathrm V$ terminals $Z_1 = Z_2 = j0.054$. The zero-sequence network on the LV side contains only the transformer's $j0.05$ to the reference (the delta isolates the source), so $Z_0 = j0.050$.

SLG: $\mathbf I_0 = \mathbf I_1 = \mathbf I_2 = 1/(j0.158) = -j6.329$, $\mathbf I_a = -j18.99\,\mathrm{pu}$. With $I_b = 10^6/(\sqrt3\times400) = 1443\,\mathrm A$, that is $27.4\,\mathrm{kA}$, a little more than the three-phase fault ($1/0.054 = 18.52\,\mathrm{pu} = 26.7\,\mathrm{kA}$).

HV side: the zero-sequence current stays in the delta; $\mathbf I_1$ becomes $-j6.329\angle30^\circ$ and $\mathbf I_2$ becomes $-j6.329\angle-30^\circ$. Recombining with [[#eq-abc]]: $\mathbf I_A = 10.96\angle-90^\circ$, $\mathbf I_B = 0$, $\mathbf I_C = 10.96\angle90^\circ\,\mathrm{pu}$. With $I_b = 10^6/(\sqrt3\times11\,000) = 52.5\,\mathrm A$, two of the $11\,\mathrm{kV}$ lines carry $575\,\mathrm A$ in opposite directions and the third carries nothing: the LV earth fault looks like a line-to-line fault from the HV side, with $1/\sqrt3$ of the LV per-unit current. An HV earth-fault relay sees nothing at all, and HV overcurrent relays see only $58\,\%$ of the per-unit fault current, which must be allowed for when grading them with LV fuses.
:::
:::

::: application Unbalanced faults in real networks
For a network fault study one builds three sequence bus impedance matrices, $Z_{\text{bus}}^{(0)}$, $Z_{\text{bus}}^{(1)}$ and $Z_{\text{bus}}^{(2)}$, as in [[power-systems/symmetrical-faults]], with transformer connections determining the zero-sequence topology. The driving-point impedances at the fault bus go into [[#eq-slg]], [[#eq-ll]] or [[#eq-dlg]]; the sequence voltages at every other bus follow from $\mathbf V_i^{(s)} = \mathbf V_i^{(s,0)} - Z_{ik}^{(s)}\mathbf I_s$ (with $\mathbf V^{(2,0)} = \mathbf V^{(0,0)} = 0$), and phase quantities from [[#eq-abc]], with the $30^\circ$ shifts across star–delta transformers. Protective relays use exactly these quantities: earth-fault relays measure $3\mathbf I_0$, negative-sequence relays detect unbalance, and distance relays compensate for the zero-sequence impedance of the line.
:::

::: history
Charles LeGeyt Fortescue, an engineer at Westinghouse, presented "Method of symmetrical co-ordinates applied to the solution of polyphase networks" to the American Institute of Electrical Engineers in 1918; the paper, written to analyse induction motors under unbalanced conditions, became the foundation of unbalanced fault analysis. C. F. Wagner and R. D. Evans of Westinghouse developed the sequence-network method for power systems and published the standard book *Symmetrical Components* in 1933. Edith Clarke of General Electric, the first woman to be professionally employed as an electrical engineer in the United States, extended the methods and developed the $\alpha\beta0$ components (Clarke components) in her *Circuit Analysis of A-C Power Systems* (1943).
:::

## Where this leads

The fault currents and voltages of this chapter and the last are the inputs to protection design in [[power-systems/protection-smart-grid]]: the setting of overcurrent relays, the reach of distance relays and the sensitivity of earth-fault schemes. Unbalanced faults also affect stability, since a single-phase fault depresses the transferable power less than a three-phase fault: in [[power-systems/power-system-stability]] an unbalanced fault is represented in the positive-sequence network by the **fault shunt** $Z_2 + Z_0$ (SLG) or $Z_2$ (LL), which follows from the connections of the sequence networks derived here.

::: summary
- Any three phasors decompose uniquely into zero-, positive- and negative-sequence sets: $\mathbf V_{abc} = A\mathbf V_{012}$, $\mathbf V_{012} = \frac13A^\star\mathbf V_{abc}$, with $a = 1\angle120^\circ$.
- Balanced (phase-symmetrical) elements do not couple the sequences; $Z_0 = Z_s + 2Z_m$, $Z_1 = Z_2 = Z_s - Z_m$. Machines have $X_2\approx X_d''$ and small $X_0$; lines have $Z_0\approx2$–$3.5Z_1$.
- Zero-sequence current needs a return path: star–delta transformers pass it only on the grounded-star side; neutral impedances appear as $3Z_n$.
- SLG: networks in series, $\mathbf I_a = 3\mathbf V_f/(Z_0 + Z_1 + Z_2 + 3Z_f)$. LL: positive and negative in parallel, $\abs{\mathbf I_b} = \sqrt3V_f/\abs{Z_1 + Z_2 + Z_f}$. DLG: all three in parallel.
- The SLG fault can exceed the three-phase fault when $Z_0 < Z_1$; healthy-phase voltages rise towards $\sqrt3$ as earthing weakens.
:::

## Exercises

::: exercise Zero-sequence current {level=1 check="10/3"}
The phase currents are $\mathbf I_a = 10\angle0^\circ$, $\mathbf I_b = 10\angle180^\circ$ and $\mathbf I_c = 10\angle180^\circ\,\mathrm A$. Find $\abs{\mathbf I_0}$ in amperes and the neutral current.
::: solution
$\mathbf I_0 = (10 - 10 - 10)/3 = -3.33\,\mathrm A$, so $\abs{\mathbf I_0} = 3.33\,\mathrm A$ and the neutral current is $3\mathbf I_0 = -10\,\mathrm A$, i.e. $10\,\mathrm A$.
:::
:::

::: exercise SLG fault current {level=1 check="3/(0.1+0.1+0.05)"}
At a bus, $Z_1 = Z_2 = j0.10$ and $Z_0 = j0.05\,\mathrm{pu}$. Find the bolted SLG fault current in per unit with $V_f = 1$.
::: solution
$\mathbf I_a = 3/(j0.25)$, magnitude $12.0\,\mathrm{pu}$ (compared with $10\,\mathrm{pu}$ for a three-phase fault).
:::
:::

::: exercise Line-to-line fault {level=1 check="sqrt(3)/(0.2+0.25)"}
A generator with $X_1 = 0.20$ and $X_2 = 0.25\,\mathrm{pu}$ is unloaded at $1\,\mathrm{pu}$. Find the magnitude of the line-to-line fault current at its terminals.
::: solution
$\abs{\mathbf I_b} = \sqrt3/(0.20 + 0.25) = 3.85\,\mathrm{pu}$.
:::
:::

::: exercise Sequence impedances of a line {level=2 check="0.4+2*0.15"}
A transposed line has self reactance $j0.40\,\Omega/\mathrm{km}$ and mutual reactance $j0.15\,\Omega/\mathrm{km}$ between phases (including earth-return effects). Find its zero-sequence reactance per km in ohms, and its positive-sequence reactance.
::: solution
By [[#eq-z012]], $X_0 = 0.40 + 2\times0.15 = 0.70\,\Omega/\mathrm{km}$ and $X_1 = 0.40 - 0.15 = 0.25\,\Omega/\mathrm{km}$, so $X_0/X_1 = 2.8$.
:::
:::

::: exercise A resistance-grounded distribution system {level=2 check="11e3/sqrt(3)/400"}
An $11\,\mathrm{kV}$ distribution system is earthed through a resistor at the substation transformer's star point. The sequence impedances of the source and feeder are small compared with the resistor. Find the resistance in ohms that limits the earth-fault current to $400\,\mathrm A$.
::: solution
With $Z_0 + Z_1 + Z_2\ll3R_n$, [[#eq-slg]] gives $I_a = 3V_{\text{ph}}/(3R_n) = V_{\text{ph}}/R_n$, so $R_n = 6351/400 = 15.9\,\Omega$. (The exact value is slightly smaller once the network impedances are included in quadrature.)
:::
:::

::: exercise DLG earth current {level=2 check="3*(1/(0.15+0.15*0.1/0.25))*0.15/0.25"}
At a bus with $Z_1 = Z_2 = j0.15$ and $Z_0 = j0.10\,\mathrm{pu}$, find the magnitude of the earth current $3\mathbf I_0$ for a bolted double line-to-ground fault.
::: solution
$Z_2\parallel Z_0 = j0.06$, $\mathbf I_1 = 1/(j0.21) = -j4.762$, $\mathbf I_0 = -\mathbf I_1\times0.15/0.25 = j2.857$, so $\abs{3\mathbf I_0} = 8.57\,\mathrm{pu}$.
:::
:::

::: exercise Power in sequence components {level=2}
In [[#ex-decompose]], suppose the phase-to-neutral voltages are balanced, $\mathbf V_a = 230\angle0^\circ\,\mathrm V$. Compute the total complex power both from phase quantities and from [[#eq-sequence-power]].
::: solution
Phase quantities: $\mathbf V_a\mathbf I_a^* = 23\,000$, $\mathbf V_b\mathbf I_b^* = 230\angle-120^\circ\times50\angle120^\circ = 11\,500$, $\mathbf V_c\mathbf I_c^* = 0$: $\mathbf S = 34\,500\,\mathrm{VA}$ (real). Sequence: balanced voltages have only $\mathbf V_1 = 230$, so $\mathbf S = 3\mathbf V_1\mathbf I_1^* = 3\times230\times50 = 34\,500\,\mathrm{VA}$. The zero- and negative-sequence currents carry no power because there is no zero- or negative-sequence voltage.
:::
:::

::: exercise Healthy-phase voltage {level=3}
For an SLG fault on phase $a$ with $Z_2 = Z_1$, $Z_f = 0$ and $Z_0 = kZ_1$, show that $\mathbf V_b = \mathbf V_f\left(a^2 - \dfrac{k - 1}{k + 2}\right)$ and find $\abs{\mathbf V_b}$ for $k = 3$ and as $k\to\infty$.
::: hint
Compute $\mathbf V_0$, $\mathbf V_1$, $\mathbf V_2$ from [[#eq-thevenin-seq]] with $\mathbf I_0 = \mathbf V_f/((k + 2)Z_1)$.
:::
::: solution
$\mathbf V_0 = -k\mathbf V_f/(k + 2)$, $\mathbf V_1 = \mathbf V_f(k + 1)/(k + 2)$, $\mathbf V_2 = -\mathbf V_f/(k + 2)$. Then $\mathbf V_b = \mathbf V_0 + a^2\mathbf V_1 + a\mathbf V_2 = \frac{\mathbf V_f}{k + 2}\bigl(-k + (k + 1)a^2 - a\bigr)$. Using $a = -1 - a^2$: $-k + (k + 1)a^2 + 1 + a^2 = (k + 2)a^2 - (k - 1)$, so $\mathbf V_b = \mathbf V_f\bigl(a^2 - \frac{k - 1}{k + 2}\bigr)$. For $k = 3$: $a^2 - 0.4 = -0.9 - j0.866$, magnitude $1.249\,\mathrm{pu}$. As $k\to\infty$: $a^2 - 1 = -1.5 - j0.866$, magnitude $\sqrt3$: the full line-to-line voltage, as in an ungrounded system.
:::
:::

::: exercise Designing a Petersen coil {level=3 check="1/(3*2*pi*50*1.5e-6)"}
An ungrounded $20\,\mathrm{kV}$, $50\,\mathrm{Hz}$ cable network has a capacitance of $1.5\,\mu\mathrm F$ from each phase to earth (total for the network). Show that an earth fault on one phase draws a capacitive current of $3\omega CV_{\text{ph}}$, and find the reactance in ohms of a neutral reactor (Petersen coil) that cancels it.
::: hint
In the zero-sequence network the three phase-to-earth capacitances appear as $-j/(\omega C)$ per phase, and the neutral reactor as $3jX_n$, in parallel.
:::
::: solution
With the network ungrounded, the zero-sequence network is just the capacitance, $Z_0 = -jX_C$ with $X_C = 1/(\omega C)$; $Z_1$ and $Z_2$ are negligible in comparison. So $\mathbf I_a = 3\mathbf V_f/Z_0 = j3\omega C\mathbf V_f$, a capacitive current of $3\omega CV_{\text{ph}} = 3\times314.16\times1.5\times10^{-6}\times11\,547 = 16.3\,\mathrm A$. Adding a neutral reactor puts $j3X_n$ in parallel with $-jX_C$ in the zero-sequence network; the parallel combination is infinite (zero fault current) when $3X_n = X_C$, i.e. $X_n = 1/(3\omega C) = 1/(3\times314.16\times1.5\times10^{-6}) = 707\,\Omega$. In practice the coil is tuned close to resonance, and the small residual current lets the arc extinguish itself; the coil is named after Waldemar Petersen, who introduced it in the late 1910s.
:::
:::
