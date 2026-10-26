Push on the end of a diving board and it bends; let go and it springs back, returning the work you did. While the board is held bent, that work is stored in the material as **strain energy**, distributed through every fibre in proportion to the square of its stress. This simple observation — that a deformed elastic body is a store of energy, and that the work of the loads must equal what is stored — turns out to be one of the most productive ideas in mechanics. It gives the deflection of a curved hook or a pin-jointed frame in a few lines, where the differential equations of [[mechanics-of-materials/beam-deflection]] would need pages; it supplies the missing equation for statically indeterminate structures; and, recast as a statement that the true displacement field *minimises* the total potential energy, it turns the boundary-value problem of [[solid-mechanics/linear-elasticity]] into an optimisation problem that a computer can solve approximately. That last step is the finite element method.

This chapter develops energy methods in the order an engineer uses them. It defines strain energy and the work of loads and proves Clapeyron's and the Betti–Maxwell theorems; proves Castigliano's theorem and uses it, with the dummy-load device, for beams, curved bars, trusses and redundant structures; derives the principle of virtual work, of which the unit-load method is a corollary; and finishes with the principle of minimum potential energy and the Rayleigh–Ritz method, the direct ancestor of finite elements.

## Strain energy

Load a bar slowly from zero to a force $P$. Each increment of extension $d\Delta$ absorbs work $P\,d\Delta$, so the total work is the area under the force–extension curve. If the material is elastic the work is fully recoverable and is stored as strain energy; if the curve is a straight line, it is a triangle of area $\tfrac12 P\Delta$. Dividing by the volume $AL$ turns force and extension into stress and strain and gives the energy per unit volume.

::: definition Strain energy density and complementary energy density {#def-energy-density}
For an elastic material the **strain energy density** is the work done per unit volume by the stresses as the strains grow from zero,
$$
U_0 = \int_0^{\varepsilon_{ij}} \sigma_{ij}\,d\varepsilon_{ij},
$$
and the **complementary energy density** is $U_0^* = \int_0^{\sigma_{ij}} \varepsilon_{ij}\,d\sigma_{ij}$, so that $U_0 + U_0^* = \sigma_{ij}\varepsilon_{ij}$. For a **linear** elastic material the two are equal,
$$
U_0 = U_0^* = \tfrac12\sigma_{ij}\varepsilon_{ij}
= \tfrac12\bigl(\sigma_x\varepsilon_x + \sigma_y\varepsilon_y + \sigma_z\varepsilon_z + \tau_{xy}\gamma_{xy} + \tau_{yz}\gamma_{yz} + \tau_{zx}\gamma_{zx}\bigr),
$$
which for uniaxial stress is $\sigma^2/(2E)$ and for pure shear $\tau^2/(2G)$. The **strain energy** of a body is $U = \int_V U_0\,dV$; its unit is the joule.
:::

Integrating $\sigma^2/(2E)$ over a cross-section with the elementary stress distributions gives the strain energy of slender members in terms of their internal forces. With $N$ the axial force, $M$ the bending moment, $T$ the torque and $V$ the shear force, all functions of position $x$ along the member,

$$
U = \int_0^L \frac{N^2}{2EA}\,dx + \int_0^L \frac{M^2}{2EI}\,dx + \int_0^L \frac{T^2}{2GJ}\,dx + \int_0^L \frac{f_s V^2}{2GA}\,dx .
$$ {#eq-member-energy}

For bending, $\int_A (My/I)^2/(2E)\,dA = M^2/(2EI)$ because $\int_A y^2\,dA = I$; torsion of a circular shaft follows the same way with $J$. The shear term contains a **form factor** $f_s = \frac{A}{I^2}\int_A \frac{Q^2}{b^2}\,dA$, which equals $6/5$ for a rectangle and $10/9$ for a solid circle. In beams more than about five depths long the shear term is a few per cent of the bending term or less and is usually dropped; in short, deep members and sandwich panels it is not negligible.

::: theorem Clapeyron's theorem {#thm-clapeyron}
If a linear elastic body, supported so that the supports do no work, is loaded by forces $P_1, \dots, P_n$ (which may include couples) applied gradually from zero, and $\Delta_i$ is the displacement of the point of application of $P_i$ in the direction of $P_i$ (a rotation for a couple), then
$$
U = \tfrac12\sum_{i=1}^n P_i\,\Delta_i .
$$
:::

::: proof
Assume small displacements, linear elasticity and loads applied quasi-statically (no kinetic energy). Because the body is elastic the stored energy depends only on the final state, not on the loading path, so we may choose the path: apply all loads together in fixed proportion, $P_i(s) = sP_i$ with $s$ rising from $0$ to $1$. By linearity every displacement is then $\Delta_i(s) = s\Delta_i$. The work done is
$$
W = \sum_i \int_0^1 P_i(s)\,\frac{d\Delta_i}{ds}\,ds = \sum_i P_i\Delta_i\int_0^1 s\,ds = \tfrac12\sum_i P_i\Delta_i .
$$
The supports do no work and no energy is dissipated, so $W = U$.
:::

The factor $\tfrac12$ is the triangle under a straight force–displacement line. Clapeyron's theorem alone gives a deflection when only one load acts: for a cantilever with end load $P$, $U = \int_0^L (Px)^2/(2EI)\,dx = P^2L^3/(6EI) = \tfrac12 P\Delta$, so $\Delta = PL^3/(3EI)$. With more than one load it gives one equation for several unknowns; Castigliano's theorem removes that limitation.

::: theorem Betti–Maxwell reciprocal theorem {#thm-betti}
For a linear elastic body with fixed supports, let load system $A$ (forces $P_i$) produce displacements $\Delta_i^{B}$ at the points and in the directions of load system $B$ (forces $Q_j$), and let $B$ produce displacements $\Delta_i^{A}$ under the loads of $A$. Then
$$
\sum_i P_i\,\Delta_i^{A\leftarrow B} = \sum_j Q_j\,\Delta_j^{B\leftarrow A},
$$
the work of system $A$ on the displacements caused by $B$ equals the work of $B$ on the displacements caused by $A$ (**Betti**). In particular, the displacement at point 1 due to a unit load at point 2 equals the displacement at 2 due to a unit load at 1: the **flexibility coefficients** are symmetric, $f_{12} = f_{21}$ (**Maxwell**).
:::

::: proof
Apply $A$ first: the work done is $W_{AA} = \tfrac12\sum P_i\Delta_i^{A\leftarrow A}$ by Clapeyron. Then apply $B$ with $A$ already in place: $B$ does $\tfrac12\sum Q_j\Delta_j^{B\leftarrow B}$, and the loads $P_i$, already at full value, ride through the displacements $\Delta_i^{A\leftarrow B}$ caused by $B$ and do the full work $\sum P_i\Delta_i^{A\leftarrow B}$ (no factor $\tfrac12$: the force is constant during that motion). Total:
$$
W_1 = \tfrac12\sum P_i\Delta_i^{A\leftarrow A} + \tfrac12\sum Q_j\Delta_j^{B\leftarrow B} + \sum P_i\Delta_i^{A\leftarrow B}.
$$
Applying $B$ first and $A$ second gives the same expression with the last term replaced by $\sum Q_j\Delta_j^{B\leftarrow A}$. By superposition the final state is the same either way, and an elastic body stores an energy that depends only on its final state, so $W_1 = W_2$ and the cross terms are equal. For single unit loads $P_1 = 1$ and $Q_2 = 1$, Betti's identity becomes $1\cdot f_{12} = 1\cdot f_{21}$.
:::

Maxwell's theorem is often surprising in practice. A load hung at the tip of a cantilever deflects its mid-point by exactly as much as the same load hung at the mid-point deflects the tip — $5PL^3/(48EI)$ in both cases. It also guarantees that every stiffness matrix of a linear elastic structure is symmetric, a fact finite element programs exploit to halve their storage.

## Castigliano's theorem

Write the displacements of a linear structure under loads $P_1,\dots,P_n$ as $\Delta_i = \sum_j f_{ij}P_j$, with flexibility coefficients $f_{ij}$. Clapeyron's theorem makes the strain energy a quadratic form in the loads, $U = \tfrac12\sum_i\sum_j f_{ij}P_iP_j$. Differentiate with respect to one load and use Maxwell's symmetry: the displacement under that load falls out.

::: theorem Castigliano's second theorem {#thm-castigliano}
For a linear elastic structure with fixed supports, with the strain energy $U(P_1,\dots,P_n)$ expressed as a function of the independent applied loads, the displacement of the point of application of $P_k$ in the direction of $P_k$ is
$$
\Delta_k = \frac{\partial U}{\partial P_k}.
$$ {#eq-castigliano}
For a couple $C_k$, $\partial U/\partial C_k$ is the rotation in the sense of the couple.
:::

::: proof
Assumptions: linear elastic material, small displacements (so superposition holds and equilibrium is written on the undeformed geometry), supports that do no work. By superposition $\Delta_i = \sum_j f_{ij}P_j$, and by [[#thm-clapeyron]]
$$
U = \tfrac12\sum_i P_i\Delta_i = \tfrac12\sum_i\sum_j f_{ij}P_iP_j .
$$
Differentiate with respect to $P_k$. The product $P_iP_j$ contributes when $i = k$ or $j = k$:
$$
\frac{\partial U}{\partial P_k} = \tfrac12\sum_j f_{kj}P_j + \tfrac12\sum_i f_{ik}P_i = \tfrac12\sum_j f_{kj}P_j + \tfrac12\sum_j f_{kj}P_j = \Delta_k,
$$
where the middle step used $f_{ik} = f_{ki}$ from [[#thm-betti]].
:::

::: remark Engesser's form and the first theorem
For a non-linear elastic material the proof above fails, but the result survives if $U$ is replaced by the complementary energy $U^*$: $\Delta_k = \partial U^*/\partial P_k$ (Crotti and Engesser). Conversely, Castigliano's **first theorem**, $P_k = \partial U/\partial\Delta_k$ with $U$ written as a function of displacements, holds for any elastic material and is the energy statement behind the stiffness method of [[finite-element-method/direct-stiffness]].
:::

For slender members, differentiate [[#eq-member-energy]] under the integral sign, which avoids squaring and then differentiating:

$$
\Delta_k = \int_0^L \frac{N}{EA}\frac{\partial N}{\partial P_k}\,dx + \int_0^L \frac{M}{EI}\frac{\partial M}{\partial P_k}\,dx + \int_0^L \frac{T}{GJ}\frac{\partial T}{\partial P_k}\,dx .
$$ {#eq-castigliano-members}

Two devices make this a general tool. A **dummy load**: to find a displacement where no load acts, or in a direction no load acts, add a fictitious load $Q$ there, differentiate, and then set $Q = 0$. And for a **statically indeterminate** structure, treat a redundant reaction $R$ as an applied load: if the support does not move, $\partial U/\partial R = 0$ — the redundant takes the value that minimises the strain energy (Menabrea's **principle of least work**).

::: algorithm Deflections and redundants by Castigliano's theorem {#alg-castigliano}
1. Draw the free-body diagram; choose the redundants (if any) and label them as unknown loads $R_1, R_2,\dots$.
2. If the displacement wanted is not under an existing load, add a dummy load $Q$ (or couple) at that point in that direction.
3. Write $N(x)$, $M(x)$, $T(x)$ in every segment in terms of the real loads, $Q$ and the redundants, with one consistent sign convention per segment.
4. For each redundant at an unyielding support, set $\partial U/\partial R_j = 0$ and solve for $R_j$.
5. Compute $\Delta = \partial U/\partial Q$ from [[#eq-castigliano-members]], then put $Q = 0$. A positive result means the displacement is in the assumed direction of $Q$.
:::

::: example Deflection of a curved bar {#ex-quarter-ring}
A quarter-circle bar of radius $R = 0.5\,\mathrm{m}$ lies in a vertical plane with its centre $O$ at the origin. It is built in at $A = (R, 0)$, where its tangent is vertical, and is free at its top end $B = (0, R)$, where a load $P = 200\,\mathrm{N}$ acts vertically downward. The bar is a round steel rod, $d = 20\,\mathrm{mm}$, $E = 200\,\mathrm{GPa}$. Find the vertical and horizontal deflections of $B$, considering bending only.
::: solution
**Free-body diagram.** Cut the bar at the point $S = (R\cos\theta, R\sin\theta)$, $0 \le \theta \le \pi/2$, and keep the part $SB$. Acting on it: the load $P$ downward at $B$; a dummy horizontal load $Q$ at $B$ pointing in $+x$; and the internal force and moment at $S$. Taking moments about $S$ (anticlockwise positive) of the loads at $B$, with $\mathbf{r}_B - \mathbf{r}_S = (-R\cos\theta,\ R - R\sin\theta)$:
$$
M(\theta) = (-R\cos\theta)(-P) - (R - R\sin\theta)(Q) = PR\cos\theta - QR(1 - \sin\theta).
$$
The arc length element is $ds = R\,d\theta$, and the curvature of the bar is small compared with its depth ($R/d = 25$), so the straight-beam energy $M^2/(2EI)$ applies.

**Vertical deflection** (in the direction of $P$), with $Q = 0$:
$$
\delta_v = \int_0^{\pi/2}\frac{M}{EI}\frac{\partial M}{\partial P}\,R\,d\theta = \frac{PR^3}{EI}\int_0^{\pi/2}\cos^2\theta\,d\theta = \frac{\pi PR^3}{4EI}.
$$
**Horizontal deflection** (in the direction of $Q$), with $\partial M/\partial Q = -R(1 - \sin\theta)$ and then $Q = 0$:
$$
\delta_h = \int_0^{\pi/2}\frac{PR\cos\theta\,\bigl[-R(1 - \sin\theta)\bigr]}{EI}\,R\,d\theta = -\frac{PR^3}{EI}\Bigl[\sin\theta - \tfrac12\sin^2\theta\Bigr]_0^{\pi/2} = -\frac{PR^3}{2EI}.
$$
The negative sign means $B$ moves in $-x$, towards the line of the centre.

**Numbers.** $I = \pi d^4/64 = 7.854\times10^{-9}\,\mathrm{m^4}$, $EI = 1571\,\mathrm{N\,m^2}$, $PR^3 = 200 \times 0.125 = 25\,\mathrm{N\,m^3}$:
$$
\delta_v = \frac{\pi \times 25}{4 \times 1571}\,\mathrm{m} = 12.5\,\mathrm{mm}, \qquad
\delta_h = \frac{25}{2 \times 1571}\,\mathrm{m} = 7.96\,\mathrm{mm}.
$$
The largest moment is $PR = 100\,\mathrm{N\,m}$ at the root, giving a bending stress $M(d/2)/I = 127\,\mathrm{MPa}$, within the elastic range of a structural steel.

**Sanity check.** Dimensions: $PR^3/(EI)$ is $\mathrm{N\,m^3}/(\mathrm{N\,m^2}) = \mathrm{m}$ ✓. A straight cantilever of the same length $\pi R/2 = 0.785\,\mathrm{m}$ would deflect $P(\pi R/2)^3/(3EI) = 20.6\,\mathrm{mm}$; the curved bar is stiffer because much of its length lies close to the line of action of $P$, where the moment arm $R\cos\theta$ is small. A load also produces a displacement *perpendicular* to itself, which a straight-beam formula would never show.
:::
:::

::: example A two-bar bracket {#ex-truss}
A pin-jointed bracket has supports $A = (0, 0)$ and $B = (0, 3)\,\mathrm{m}$ on a wall and a joint $C = (4, 0)\,\mathrm{m}$, with members $AC$ (horizontal, $4\,\mathrm{m}$) and $BC$ ($5\,\mathrm{m}$). A load $P = 30\,\mathrm{kN}$ hangs vertically from $C$. Both members are steel with $A = 500\,\mathrm{mm^2}$, $E = 200\,\mathrm{GPa}$. Find the vertical and horizontal deflections of $C$.
::: solution
**Free-body diagram of joint C** (tension positive): $P$ downward; $F_{BC}$ along $CB$, direction $(-0.8, 0.6)$; $F_{AC}$ along $CA$, direction $(-1, 0)$.
Vertical: $0.6F_{BC} - P = 0 \Rightarrow F_{BC} = P/0.6 = 50\,\mathrm{kN}$ (tension). Horizontal: $-0.8F_{BC} - F_{AC} = 0 \Rightarrow F_{AC} = -40\,\mathrm{kN}$ (compression).

For a truss, [[#eq-castigliano-members]] reduces to $\Delta = \sum F\,(\partial F/\partial P)\,L/(EA)$. Here $\partial F_{BC}/\partial P = 5/3$ and $\partial F_{AC}/\partial P = -4/3$, and $EA = 2\times10^{11} \times 5\times10^{-4} = 1.0\times10^{8}\,\mathrm{N}$:
$$
\delta_v = \frac{(50\,000)(5/3)(5) + (-40\,000)(-4/3)(4)}{1.0\times10^{8}}\,\mathrm{m} = \frac{416\,667 + 213\,333}{1.0\times10^{8}}\,\mathrm{m} = 6.30\,\mathrm{mm}\ \text{(down)}.
$$
For the horizontal deflection add a dummy load $Q$ at $C$ in $+x$. The joint equations become $0.6F_{BC} = P$ and $-0.8F_{BC} - F_{AC} + Q = 0$, so $\partial F_{BC}/\partial Q = 0$ and $\partial F_{AC}/\partial Q = 1$. With $Q = 0$:
$$
\delta_h = \frac{(-40\,000)(1)(4)}{1.0\times10^{8}}\,\mathrm{m} = -1.60\,\mathrm{mm},
$$
that is, $1.60\,\mathrm{mm}$ towards the wall.

**Sanity check.** The horizontal movement is just the shortening of $AC$: $40\,000 \times 4/10^8 = 1.6\,\mathrm{mm}$ ✓, because $BC$ only swings about $B$ to accommodate it. The stresses are $100\,\mathrm{MPa}$ in $BC$ and $-80\,\mathrm{MPa}$ in $AC$; the compression member must also be checked for buckling ([[mechanics-of-materials/buckling]]), which no energy calculation of deflection will reveal.
:::
:::

::: example A propped cantilever by least work {#ex-propped}
A beam of span $L = 6\,\mathrm{m}$ is built in at its right end and rests on a roller at its left end. It carries a uniform load $w = 12\,\mathrm{kN/m}$. Find the roller reaction, the fixed-end moment and the largest sagging moment.
::: solution
**Free-body diagram.** Roller reaction $R$ upward at $x = 0$; the distributed load $w$ downward over $0 \le x \le L$; at the wall a vertical reaction and a fixing moment. One unknown more than statics can supply: choose $R$ as the redundant.

The bending moment at $x$ (sagging positive), from the free body to the left of the cut, is $M(x) = Rx - wx^2/2$. The roller does not move, so
$$
\frac{\partial U}{\partial R} = \int_0^L \frac{M}{EI}\frac{\partial M}{\partial R}\,dx = \frac{1}{EI}\int_0^L\Bigl(Rx - \frac{wx^2}{2}\Bigr)x\,dx = \frac{1}{EI}\Bigl(\frac{RL^3}{3} - \frac{wL^4}{8}\Bigr) = 0
\quad\Rightarrow\quad R = \frac{3wL}{8}.
$$
Numbers: $R = 3 \times 12 \times 6/8 = 27\,\mathrm{kN}$. The fixed-end moment is $M(L) = RL - wL^2/2 = 162 - 216 = -54\,\mathrm{kN\,m}$, that is $wL^2/8$ hogging. The shear force $R - wx$ vanishes at $x = R/w = 2.25\,\mathrm{m}$, where the sagging moment is the largest: $R^2/(2w) = 27^2/24 = 30.4\,\mathrm{kN\,m}$.

**Sanity check.** Vertical equilibrium: wall reaction $= wL - R = 72 - 27 = 45\,\mathrm{kN} = 5wL/8$ ✓. The prop takes less than half the load ($3/8$ instead of the simply supported $1/2$) because the built-in end is stiffer; and the result does not depend on $EI$, as a redundant in a uniform beam with rigid supports should not.
:::
:::

The least-work statement can be seen directly. With $w = L = EI = 1$, the strain energy as a function of the trial value of $R$ is $U(R) = \int_0^1 (Rx - x^2/2)^2/2\,dx = R^2/6 - R/8 + 1/40$, a parabola.

::: widget plot
f: x^2/6 - x/8 + 1/40
x: 0, 0.8
y: 0, 0.08
tangent: 0.15
points: 0.375, 0.0015625
vlines: 0.375
caption: Strain energy of the propped cantilever (with $w = L = EI = 1$) against the trial value $R$ of the prop reaction on the horizontal axis. Drag the tangent point: its slope is $\partial U/\partial R$, which by Castigliano's theorem is the upward displacement of the prop. The slope is negative for small $R$ (the beam end would sag below the prop) and positive for large $R$ (the prop would lift the end); it is zero, and $U$ is least, only at $R = 3/8$ — the reaction that makes the prop displacement zero.
:::

::: warning Partial derivatives need independent loads
Castigliano's theorem differentiates $U$ with respect to a load *with all the other independent loads held fixed*. Two errors follow from forgetting this. First, a reaction that is determined by statics is not an independent load: write the moments in terms of the applied loads (and redundants), not in terms of reactions you have not eliminated. Second, if two loads are tied together — "a load $P$ at each end" — then $\partial U/\partial P$ gives the **sum** of the two displacements (the relative displacement for equal and opposite loads), not the displacement of one point. To find one of them, give the two loads different names, differentiate, and only then set them equal. The ring under diametral compression ([[#ex-ring]] in the exercises) uses this deliberately: $\partial U/\partial P$ is the change of the diameter.
:::

## The principle of virtual work

Castigliano's theorem requires linearity. A more fundamental statement, valid for any material, connects any set of forces in equilibrium with any set of displacements that fit together. It needs no energy at all — only equilibrium and geometry.

::: theorem Principle of virtual work {#thm-virtual-work}
Let $\sigma_{ij}$ be **any** stress field in equilibrium with body forces $b_i$ in $V$ and with surface tractions $t_i = \sigma_{ij}n_j$ on $S$, and let $u_i$ be **any** continuous displacement field (small, so that $\varepsilon_{ij} = \tfrac12(u_{i,j} + u_{j,i})$) — the two need not be related by a constitutive law. Then
$$
\int_V \sigma_{ij}\,\varepsilon_{ij}\,dV = \int_V b_i\,u_i\,dV + \int_S t_i\,u_i\,dS,
$$ {#eq-virtual-work}
internal virtual work equals external virtual work.
:::

::: proof
Using $t_i = \sigma_{ij}n_j$ and the divergence theorem,
$$
\int_S t_iu_i\,dS = \int_S \sigma_{ij}u_in_j\,dS = \int_V (\sigma_{ij}u_i)_{,j}\,dV = \int_V \sigma_{ij,j}u_i\,dV + \int_V \sigma_{ij}u_{i,j}\,dV.
$$
Equilibrium gives $\sigma_{ij,j} = -b_i$, so the first volume integral is $-\int_V b_iu_i\,dV$. Split $u_{i,j}$ into its symmetric part $\varepsilon_{ij}$ and antisymmetric part (the rotation); the product of the symmetric $\sigma_{ij}$ with an antisymmetric tensor is zero, so $\sigma_{ij}u_{i,j} = \sigma_{ij}\varepsilon_{ij}$. Rearranging gives [[#eq-virtual-work]]. Only equilibrium, the symmetry of stress, small-displacement kinematics and continuity of $u_i$ were used.
:::

The theorem is used in two ways. In the **principle of virtual displacements**, the stresses are the real ones and $u_i$ is an imagined small displacement $\delta u_i$ that respects the supports; then $\delta u_i = 0$ on $S_u$ and [[#eq-virtual-work]] becomes an equilibrium statement, the weak form on which finite elements are built ([[finite-element-method/weak-forms]]). In the **principle of virtual forces**, the displacements are the real ones and the stresses are an imagined set in equilibrium with a convenient load — a single unit load. That gives the most useful deflection formula in structural analysis.

::: proposition The unit-load method {#prop-unit-load}
To find the displacement $\Delta$ of a point of a framed structure in a chosen direction, apply a unit load at that point in that direction to the unloaded structure and find the internal forces $n(x)$, $m(x)$, $t(x)$ it produces (any set in equilibrium with the unit load will do). Then, if the real internal forces are $N$, $M$, $T$ and the material is linear elastic,
$$
1\cdot\Delta = \sum\int \frac{nN}{EA}\,dx + \sum\int \frac{mM}{EI}\,dx + \sum\int \frac{tT}{GJ}\,dx .
$$ {#eq-unit-load}
For a truss, $\Delta = \sum_k n_kN_kL_k/(E_kA_k)$.
:::

::: proof
Apply [[#thm-virtual-work]] with the virtual (unit-load) stress system and the real displacements. The external virtual work is the unit load times the real displacement of its point, $1\cdot\Delta$; the supports do no work because the real displacements there are zero. The internal virtual work of a slender member reduces to stress resultants times the real generalised strains: axial strain $N/(EA)$, curvature $M/(EI)$, twist rate $T/(GJ)$, giving the terms of [[#eq-unit-load]]. Linearity is used only to write the real strains in terms of $N$, $M$, $T$; with a non-linear law or with a temperature change, the real strains are inserted directly — for example a thermal curvature $\alpha\,\Delta T_\text{gradient}/h$ in place of $M/(EI)$.
:::

Comparing with [[#eq-castigliano-members]]: $m = \partial M/\partial Q$ is exactly the moment due to a unit dummy load, so for linear structures the unit-load method and Castigliano's theorem with a dummy load are the same calculation. The unit-load method is more general, since it also handles temperature changes, lack of fit and support settlement.

## The principle of minimum potential energy

Now restrict attention to linear elastic bodies, and ask a different question: among all displacement fields that respect the supports, which one does nature choose?

::: definition Total potential energy {#def-potential}
A displacement field is **kinematically admissible** if it is continuous and satisfies the displacement boundary conditions on $S_u$. For such a field the **total potential energy** of a body with prescribed tractions $\bar t_i$ on $S_t$ and body forces $b_i$ is
$$
\Pi[\mathbf{u}] = U[\mathbf{u}] - \int_V b_iu_i\,dV - \int_{S_t}\bar t_iu_i\,dS,
$$
the strain energy minus the work the loads would do if held constant through the displacement — the "potential of the loads". For a beam in bending with distributed load $w(x)$ and point loads $P_k$,
$$
\Pi[v] = \int_0^L \tfrac12 EI\,(v'')^2\,dx - \int_0^L w\,v\,dx - \sum_k P_k\,v(x_k).
$$ {#eq-beam-potential}
:::

::: theorem Principle of minimum potential energy {#thm-min-pe}
For a linear elastic body with positive definite strain energy, the displacement field that satisfies all the equations of elasticity makes $\Pi$ smaller than any other kinematically admissible field does:
$$
\Pi[\mathbf{u}^\star + \mathbf{w}] - \Pi[\mathbf{u}^\star] = U[\mathbf{w}] \ge 0,
$$
with equality only if $\mathbf{w}$ produces no strain. Conversely, a kinematically admissible field that makes $\Pi$ stationary is the exact solution.
:::

::: proof
Let $\mathbf{u}^\star$ be the exact solution, with stresses $\sigma^\star_{ij}$, and let $\mathbf{u} = \mathbf{u}^\star + \mathbf{w}$ be any other admissible field; then $\mathbf{w} = \mathbf{0}$ on $S_u$. Because $U_0$ is a quadratic form, $U_0(\varepsilon^\star + \varepsilon^w) = U_0(\varepsilon^\star) + \sigma^\star_{ij}\varepsilon^w_{ij} + U_0(\varepsilon^w)$ — the cross term uses the symmetry of the elastic constants, $\tfrac12 C_{ijkl}(\varepsilon^\star_{ij}\varepsilon^w_{kl} + \varepsilon^w_{ij}\varepsilon^\star_{kl}) = \sigma^\star_{kl}\varepsilon^w_{kl}$. Hence
$$
\Pi[\mathbf{u}] - \Pi[\mathbf{u}^\star] = \Bigl[\int_V \sigma^\star_{ij}\varepsilon^w_{ij}\,dV - \int_V b_iw_i\,dV - \int_{S_t}\bar t_iw_i\,dS\Bigr] + U[\mathbf{w}].
$$
Apply [[#thm-virtual-work]] to the equilibrium field $\sigma^\star$ and the displacement field $\mathbf{w}$: the external work on $S_u$ vanishes because $\mathbf{w} = \mathbf{0}$ there, and on $S_t$ the traction is $\bar t_i$. So the bracket is zero and the difference equals $U[\mathbf{w}] \ge 0$. For the converse: if $\Pi$ is stationary at an admissible $\mathbf{u}$, its first variation vanishes for every admissible $\mathbf{w}$, which by integration by parts (the proof of [[#thm-virtual-work]] read backwards) gives the equilibrium equations in $V$ and the traction conditions on $S_t$.
:::

The theorem has two consequences that matter in practice. Any approximate admissible field gives an energy *above* the true one, so approximations can be ranked: lower $\Pi$ is better. And because the error in $\Pi$ is the strain energy of the error, an approximate displacement field is too *stiff*: for a single point load $P$, $\Pi_\text{min} = -\tfrac12 P\Delta$ (by Clapeyron), so a higher $\Pi$ means a smaller $\Delta$. Approximate displacement-based solutions **underestimate** deflections under a single load.

### The Rayleigh–Ritz method

::: algorithm Rayleigh–Ritz {#alg-ritz}
1. Choose trial functions $\psi_1(x),\dots,\psi_n(x)$, each satisfying the **displacement** (kinematic) boundary conditions; the force conditions need not be satisfied, since stationarity of $\Pi$ supplies them approximately.
2. Write the approximation $v(x) = \sum_k a_k\psi_k(x)$ with unknown coefficients $a_k$.
3. Substitute into $\Pi$, which becomes a quadratic function of the $a_k$: $\Pi = \tfrac12\mathbf{a}\T\mathbf{K}\mathbf{a} - \mathbf{a}\T\mathbf{F}$.
4. Set $\partial\Pi/\partial a_k = 0$ for every $k$: the linear system $\mathbf{K}\mathbf{a} = \mathbf{F}$, with a symmetric "stiffness matrix" $K_{jk} = \int EI\,\psi_j''\psi_k''\,dx$ and "load vector" $F_k = \int w\psi_k\,dx + \sum P_i\psi_k(x_i)$.
5. Solve, and check convergence by adding terms.
:::

When the trial functions are chosen as simple polynomials that are non-zero only over a small piece of the structure, step 4 is exactly the assembly of a finite element stiffness matrix: the finite element method is the Rayleigh–Ritz method with local trial functions ([[finite-element-method/direct-stiffness]]).

::: example One-term Ritz solution of a simply supported beam {#ex-ritz-ss}
A simply supported beam of span $L = 5\,\mathrm{m}$ and $EI = 1.0\times10^{7}\,\mathrm{N\,m^2}$ carries a uniform load $w = 10\,\mathrm{kN/m}$. Use the trial function $v = a\sin(\pi x/L)$ (positive downward) to estimate the mid-span deflection and bending moment, and compare with the exact values $5wL^4/(384EI)$ and $wL^2/8$.
::: solution
The trial function vanishes at $x = 0$ and $x = L$, the kinematic conditions; it also happens to satisfy $v'' = 0$ there. With $v'' = -a(\pi/L)^2\sin(\pi x/L)$, $\int_0^L\sin^2(\pi x/L)\,dx = L/2$ and $\int_0^L\sin(\pi x/L)\,dx = 2L/\pi$:
$$
\Pi(a) = \frac{EI}{2}\,a^2\Bigl(\frac{\pi}{L}\Bigr)^4\frac{L}{2} - w\,a\,\frac{2L}{\pi},
\qquad
\frac{d\Pi}{da} = 0 \;\Rightarrow\; a = \frac{4wL^4}{\pi^5 EI} = 0.013071\,\frac{wL^4}{EI}.
$$
Exact: $5/384 = 0.013021$. Numerically, $wL^4/(EI) = 10^4 \times 625/10^7 = 0.625\,\mathrm{m}$, so
$$
v_\text{Ritz} = 0.013071 \times 0.625 = 8.17\,\mathrm{mm}, \qquad v_\text{exact} = 8.14\,\mathrm{mm},
$$
an error of $+0.39\,\%$. The moment from the trial function is $M = EI\,v''$ in magnitude, at mid-span $EI\,a\,\pi^2/L^2 = 4wL^2/\pi^3 = 0.1290\,wL^2 = 32.3\,\mathrm{kN\,m}$, against the exact $wL^2/8 = 31.25\,\mathrm{kN\,m}$, an error of $+3.2\,\%$.

**Sanity check.** Why is the deflection here slightly *over*-estimated, when the theorem says the Ritz solution is too stiff? The guarantee is on the energy: $\Pi_\text{Ritz} \ge \Pi_\text{exact}$, which for a distributed load means the *load-weighted average* deflection $\int wv\,dx$ is too small, not the deflection at every point. The pattern of errors is the general one: displacements are accurate, moments (second derivatives) less so, and shear forces (third derivatives) least of all. In fact the sine is the first term of the exact Fourier series $v = \sum_{n\ \text{odd}} 4wL^4\sin(n\pi x/L)/(n^5\pi^5EI)$, whose further terms fall off as $1/n^5$.
:::
:::

::: widget plot
f: x*(1-x)/2; sum(4/((2k-1)^3*pi^3)*sin((2k-1)*pi*x), k, 1, N); 0.5 - x; sum(4/((2k-1)^2*pi^2)*cos((2k-1)*pi*x), k, 1, N)
x: 0, 1
y: -0.6, 0.6
sliders: N=1:1:8:1
labels: M/wL^2\ \text{exact}; M/wL^2\ \text{Ritz}; V/wL\ \text{exact}; V/wL\ \text{Ritz}
caption: Rayleigh–Ritz with $N$ sine terms for the uniformly loaded simply supported beam, plotted against $x/L$: bending moment (first pair) and shear force (second pair), each with its exact distribution. With $N = 1$ the moment is already within about 3 % but the shear force is a poor cosine. Increase $N$: the moment converges almost at once, while the shear force still wiggles with $N = 8$, and is slowest to converge at the supports. Each derivative of a Ritz solution costs accuracy — which is why finite element stresses are least reliable where shear and stress gradients are large.
:::

::: example Polynomial trial functions for a cantilever {#ex-ritz-cantilever}
A cantilever of length $L$, built in at $x = 0$, carries an end load $P$ at $x = L$. Find the Ritz approximations to the tip deflection with (a) $v = a x^2$ and (b) $v = a x^2 + b x^3$.
::: solution
Both trial functions satisfy the kinematic conditions $v(0) = 0$, $v'(0) = 0$. The free-end conditions (zero moment and shear) are force conditions and are not imposed.

(a) $v'' = 2a$, so $U = \tfrac12 EI\int_0^L 4a^2\,dx = 2EIa^2L$ and the load potential is $-P\,v(L) = -PaL^2$. Then $d\Pi/da = 4EIaL - PL^2 = 0$, $a = PL/(4EI)$, and the tip deflection is $aL^2 = PL^3/(4EI)$: 75 % of the exact $PL^3/(3EI)$, too stiff as the theorem predicts. The trial function has constant curvature, as if the moment were uniform, whereas the true moment falls linearly to zero at the tip.

(b) $v'' = 2a + 6bx$:
$$
\Pi = \frac{EI}{2}\bigl(4a^2L + 12abL^2 + 12b^2L^3\bigr) - P\bigl(aL^2 + bL^3\bigr).
$$
$\partial\Pi/\partial a = 0$: $4aL + 6bL^2 = PL^2/EI$; $\partial\Pi/\partial b = 0$: $6aL^2 + 12bL^3 = PL^3/EI$. Dividing by $L$ and $L^2$: $4a + 6bL = PL/EI$ and $6a + 12bL = PL/EI$. Doubling the first and subtracting the second gives $2a = PL/EI$, so $a = PL/(2EI)$ and $b = -P/(6EI)$. Then
$$
v = \frac{PLx^2}{2EI} - \frac{Px^3}{6EI}, \qquad v(L) = \frac{PL^3}{3EI},
$$
the **exact** solution. **Sanity check:** the exact deflection of an end-loaded cantilever is a cubic, so a trial space containing all cubics that satisfy the kinematic conditions must contain it, and minimum potential energy then picks it out. Ritz solutions become exact whenever the trial functions can represent the true solution.
:::
:::

::: remark Shear energy and the meaning of "built in"
Adding the shear term of [[#eq-member-energy]] with $f_s = 6/5$ to the cantilever gives an extra tip deflection $6PL/(5GA)$. The exact two-dimensional solution in [[solid-mechanics/linear-elasticity]] gives $3PL/(2GA)$ when the cross-section at the wall is held vertical at the centroid. The difference is not an error in either: a real built-in end is neither, and the shear correction depends on how the support restrains the warping of the section. Both are a few per cent for ordinary proportions; for deep beams the support detail must be modelled.
:::

::: quiz
A linear elastic cantilever is analysed by the Rayleigh–Ritz method with a single-term polynomial that satisfies $v(0) = v'(0) = 0$. Under an end load $P$, which statements about the approximation are guaranteed?
- [x] Its total potential energy is greater than or equal to the exact minimum.
- [x] Its tip deflection is less than or equal to the exact tip deflection.
- [ ] Its root bending moment is less than or equal to the exact root bending moment.
- [ ] Adding more terms can make the tip deflection estimate worse.
::: solution
Minimum potential energy guarantees $\Pi_\text{Ritz} \ge \Pi_\text{exact}$. For a single point load, the stationary value is $\Pi = -\tfrac12 P\Delta$ (stationarity of the Ritz solution implies Clapeyron's relation within the trial space), so a higher $\Pi$ means a smaller $\Delta$: the tip deflection is bounded from below by the Ritz value. Nothing is guaranteed about moments: the one-term $ax^2$ estimate gives a uniform moment $PL/2$, *below* the exact root moment $PL$ but *above* the exact tip moment of zero. Adding terms enlarges the trial space, so the minimum of $\Pi$ cannot rise, and $\Delta$ cannot fall.
:::
:::

::: history
The energy methods of structural analysis grew out of nineteenth-century work on elastic frames. Benoît Clapeyron's theorem on the equality of work and strain energy was published by Gabriel Lamé in his *Leçons sur la théorie mathématique de l'élasticité des corps solides* (1852). James Clerk Maxwell stated the reciprocal theorem for frames in 1864, in a paper "On the calculation of the equilibrium and stiffness of frames" in the *Philosophical Magazine*, and Enrico Betti generalised it to elastic bodies in 1872. Luigi Federico Menabrea announced the principle of least work for statically indeterminate frames in 1858; his proof was incomplete, and Alberto Castigliano, a young railway engineer, put it on a firm footing in his Turin diploma thesis of 1873 and in his book *Théorie de l'équilibre des systèmes élastiques et ses applications* (1879), which also contains the theorems that bear his name. Lord Rayleigh used assumed modes to estimate vibration frequencies in *The Theory of Sound* (1877), and Walther Ritz turned the idea into a systematic method of approximation in a 1909 paper in the *Journal für die reine und angewandte Mathematik*. Richard Courant's 1943 paper on variational methods used piecewise-linear trial functions on triangles, and the finite element method as engineers know it appeared in 1956 in a paper by M. J. Turner, R. W. Clough, H. C. Martin and L. J. Topp on the stiffness of aircraft structures.
:::

## Where this leads

The principle of virtual work is the starting point of [[finite-element-method/weak-forms]], and the Rayleigh–Ritz algorithm with piecewise trial functions is [[finite-element-method/direct-stiffness]]. In this course, minimum potential energy gives the buckling loads of plates in [[solid-mechanics/plates]] (a structure becomes unstable when the second variation of $\Pi$ can become zero); the energy balance of a growing crack is the foundation of [[solid-mechanics/fracture-mechanics]]; and the upper- and lower-bound theorems of limit analysis in [[solid-mechanics/plasticity]] are the plastic counterparts of the principle of virtual work. In dynamics, Rayleigh's quotient estimates natural frequencies with the same trial functions used here.

::: summary
- Strain energy density is $\tfrac12\sigma_{ij}\varepsilon_{ij}$ for a linear material; for slender members $U = \int N^2/(2EA) + \int M^2/(2EI) + \int T^2/(2GJ)\,(+\int f_sV^2/(2GA))$.
- Clapeyron: $U = \tfrac12\sum P_i\Delta_i$. Betti–Maxwell: cross-work is reciprocal and flexibility (and stiffness) matrices are symmetric.
- Castigliano: $\Delta_k = \partial U/\partial P_k$ for linear structures; add a dummy load for displacements where no load acts; $\partial U/\partial R = 0$ gives a redundant at a rigid support (least work).
- Virtual work holds for any equilibrium stress field paired with any compatible displacement field, for any material. With a unit virtual load it gives the unit-load method $\Delta = \sum\int mM/(EI)\,dx + \dots$, which also handles thermal strain and settlement.
- Minimum potential energy: among admissible displacement fields, the exact one minimises $\Pi = U - (\text{work potential of loads})$; the excess is the strain energy of the error.
- Rayleigh–Ritz: trial functions satisfying the kinematic conditions turn $\Pi$ into a quadratic form; $\mathbf{K}\mathbf{a} = \mathbf{F}$ gives the coefficients. Results are too stiff in energy; displacements converge fastest, moments and shears more slowly. With local polynomial trial functions it is the finite element method.
:::

## Exercises

::: exercise Energy in a bar {level=1 check="100"}
A steel tie of length $2\,\mathrm{m}$ and area $500\,\mathrm{mm^2}$ ($E = 200\,\mathrm{GPa}$) carries an axial force of $100\,\mathrm{kN}$. How much strain energy does it store? (Enter the energy in J.)
::: solution
$U = P^2L/(2EA) = (10^5)^2 \times 2/(2 \times 2\times10^{11} \times 5\times10^{-4}) = 2\times10^{10}/(2\times10^{8}) = 100\,\mathrm{J}$. Check by Clapeyron: extension $\Delta = PL/(EA) = 2\,\mathrm{mm}$ and $\tfrac12 P\Delta = \tfrac12 \times 10^5 \times 0.002 = 100\,\mathrm{J}$ ✓.
:::
:::

::: exercise Reciprocity in a test {level=1 check="3.2"}
In a load test on a bridge girder, a $5\,\mathrm{kN}$ load at point A deflects point B by $2.0\,\mathrm{mm}$. What deflection at A would an $8\,\mathrm{kN}$ load at B produce, if the girder is linear elastic? (Enter the deflection in mm.)
::: solution
By Maxwell's theorem $f_{BA} = f_{AB} = 2.0/5 = 0.4\,\mathrm{mm/kN}$, so the deflection at A is $0.4 \times 8 = 3.2\,\mathrm{mm}$. No information about the girder's shape, section or supports is needed.
:::
:::

::: exercise Cantilever by Castigliano {level=1 check="20"}
Use Castigliano's theorem to find the tip deflection of a cantilever of length $2\,\mathrm{m}$ and $EI = 4\times10^{5}\,\mathrm{N\,m^2}$ under an end load of $3\,\mathrm{kN}$. (Enter the deflection in mm.)
::: solution
With $x$ from the tip, $M = -Px$ and $\partial M/\partial P = -x$, so $\Delta = \int_0^L Px^2/(EI)\,dx = PL^3/(3EI) = 3000 \times 8/(3 \times 4\times10^{5}) = 0.020\,\mathrm{m} = 20\,\mathrm{mm}$.
:::
:::

::: exercise End slope by unit load {level=2 check="8"}
A simply supported beam of span $L = 4\,\mathrm{m}$ and $EI = 2\times10^{6}\,\mathrm{N\,m^2}$ carries a central load $P = 16\,\mathrm{kN}$. Use the unit-load method (with a unit couple at the left support) to find the slope there. (Enter the slope in milliradians.)
::: solution
Real moment: $M = Px/2$ for $0 \le x \le L/2$, symmetric about mid-span. A unit clockwise couple at the left end $x = 0$ of a simply supported beam produces reactions $1/L$ (down at the left, up at the right) and the moment $m = 1 - x/L$ (sagging positive) along the span. Then
$$
\theta = \int_0^{L/2}\frac{(1 - x/L)(Px/2)}{EI}\,dx + \int_{L/2}^{L}\frac{(1 - x/L)\,P(L - x)/2}{EI}\,dx = \frac{P}{2EI}\Bigl(\frac{L^2}{12} + \frac{L^2}{24}\Bigr) = \frac{PL^2}{16EI}.
$$
(The first integral is $\tfrac{P}{2EI}[\tfrac{L^2}{8} - \tfrac{L^2}{24}] = \tfrac{P}{2EI}\cdot\tfrac{L^2}{12}$; the second, with $u = L - x$, is $\tfrac{P}{2EI}\int_0^{L/2}\tfrac{u^2}{L}\,du = \tfrac{P}{2EI}\cdot\tfrac{L^2}{24}$.) Numerically $\theta = 16\,000 \times 16/(16 \times 2\times10^{6}) = 0.008\,\mathrm{rad} = 8\,\mathrm{mrad}$, the standard table value.
:::
:::

::: exercise Propped cantilever with a point load {level=2 check="10"}
A beam of span $L$ is built in at its right end and propped on a roller at its left end. A load $P = 32\,\mathrm{kN}$ acts at mid-span. Find the prop reaction by least work. (Enter the reaction in kN.)
::: solution
With $x$ from the prop and $R$ the redundant: $M = Rx$ for $x < L/2$ and $M = Rx - P(x - L/2)$ for $x > L/2$, with $\partial M/\partial R = x$. Setting $\partial U/\partial R = 0$:
$$
R\frac{L^3}{3} - P\int_{L/2}^{L}\Bigl(x - \frac L2\Bigr)x\,dx = R\frac{L^3}{3} - P\cdot\frac{5L^3}{48} = 0 \;\Rightarrow\; R = \frac{5P}{16}.
$$
(The integral: $[x^3/3 - Lx^2/4]_{L/2}^{L} = (L^3/3 - L^3/4) - (L^3/24 - L^3/16) = L^3/12 + L^3/48 = 5L^3/48$.) So $R = 5 \times 32/16 = 10\,\mathrm{kN}$, independent of $L$ and $EI$.
:::
:::

::: exercise Symmetric two-bar truss {level=2 check="0.4"}
A load $P = 10\,\mathrm{kN}$ hangs from the joint of two identical bars, each $2\,\mathrm{m}$ long with $EA = 1.0\times10^{8}\,\mathrm{N}$, pinned to a ceiling and each inclined at $60°$ to the vertical. Find the vertical deflection of the joint. (Enter the deflection in mm.)
::: solution
By symmetry each bar carries tension $F = P/(2\cos60°) = P$, so $\partial F/\partial P = 1/(2\cos60°) = 1$. Then $\delta = 2 \times F(\partial F/\partial P)L/(EA) = PL/(2EA\cos^2 60°) = 2PL/(EA) = 2 \times 10^4 \times 2/10^8 = 4\times10^{-4}\,\mathrm{m} = 0.4\,\mathrm{mm}$. Note the $1/\cos^2\theta$: shallow bars are both highly stressed and very flexible, because each bar's extension is amplified geometrically into a larger vertical movement.
:::
:::

::: exercise Ritz for a uniformly loaded cantilever {level=2 check="2/3"}
A cantilever of length $L$, built in at $x = 0$, carries a uniform load $w$. Using the single trial function $v = ax^2$, find the Ritz estimate of the tip deflection, and give its ratio to the exact value $wL^4/(8EI)$. (Enter the ratio as a fraction.)
::: solution
$U = \tfrac12 EI\int_0^L(2a)^2\,dx = 2EIa^2L$; load potential $-\int_0^L wax^2\,dx = -waL^3/3$. Then $d\Pi/da = 4EIaL - wL^3/3 = 0$, $a = wL^2/(12EI)$, and $v(L) = wL^4/(12EI)$. Ratio $= 8/12 = 2/3$. Too stiff, as expected: constant curvature cannot follow a moment that falls from $wL^2/2$ at the root to zero at the tip.
:::
:::

::: exercise Ritz for a central point load {level=3 check="2/pi^4"}
Use the one-term trial function $v = a\sin(\pi x/L)$ to estimate the mid-span deflection of a simply supported beam under a central point load $P$. Write the result as $c\,PL^3/(EI)$ and compare $c$ with the exact $1/48$. (Enter $c$ as an exact expression.)
::: solution
$U = \tfrac{EI}{2}a^2(\pi/L)^4(L/2) = \pi^4EIa^2/(4L^3)$ and the load potential is $-P\,v(L/2) = -Pa$. Then $d\Pi/da = \pi^4EIa/(2L^3) - P = 0$, so $a = 2PL^3/(\pi^4EI)$ and $c = 2/\pi^4 = 0.020532$, against $1/48 = 0.020833$: $1.4\,\%$ low, which for a single point load is the guaranteed direction. The error is larger than for the distributed load ($0.4\,\%$) because the true deflected shape has a kink in its third derivative under the load, which a smooth sine cannot reproduce.
:::
:::

::: exercise A ring under diametral compression {level=3 check="pi/4 - 2/pi" #ex-ring}
A thin circular ring of radius $R$ and bending stiffness $EI$ is squeezed between two equal and opposite forces $P$ along a diameter. (a) Using symmetry and least work, find the bending moment $M_0$ at the sections at $90°$ to the load. (b) Using Castigliano's theorem, show that the loaded diameter shortens by $\delta = (\pi/4 - 2/\pi)\,PR^3/(EI)$. Consider bending only. (Enter the coefficient of $PR^3/(EI)$.)
::: solution
(a) Cut the ring along the diameter perpendicular to the load and consider one quarter, from a side section ($\theta = 0$) to the load point ($\theta = \pi/2$), with $\theta$ measured from the side. At the side section, by symmetry, there is no shear force; the normal force is $P/2$ (compressive) and the moment $M_0$ is unknown — the ring is internally indeterminate. Taking moments about the point at angle $\theta$ of the forces on the quarter, $M(\theta) = M_0 - \tfrac{P}{2}R(1 - \cos\theta)$. Symmetry also requires the side section not to rotate, so $\partial U/\partial M_0 = \int_0^{\pi/2} M\,R\,d\theta/(EI) = 0$:
$$
M_0\frac{\pi}{2} - \frac{PR}{2}\Bigl(\frac{\pi}{2} - 1\Bigr) = 0 \;\Rightarrow\; M_0 = \frac{PR}{2}\Bigl(1 - \frac{2}{\pi}\Bigr) = 0.182\,PR,
$$
and at the load point $M(\pi/2) = M_0 - PR/2 = -PR/\pi = -0.318\,PR$, the largest moment in the ring.

(b) The pair of loads $P$ does work on the relative approach of the load points, so $\partial U/\partial P = \delta$ (see the warning on tied loads). The whole ring is four quarters, $U = 4\int_0^{\pi/2} M^2R\,d\theta/(2EI)$, and since $M$ is proportional to $P$, $\partial U/\partial P = 2U/P$:
$$
\delta = \frac{4R}{EIP}\int_0^{\pi/2}M^2\,d\theta.
$$
Write $M = \tfrac{PR}{2}(\cos\theta - \tfrac{2}{\pi})$. Then $\int_0^{\pi/2}(\cos\theta - 2/\pi)^2\,d\theta = \pi/4 - (4/\pi)(1) + (4/\pi^2)(\pi/2) = \pi/4 - 2/\pi$, and
$$
\delta = \frac{4R}{EIP}\cdot\frac{P^2R^2}{4}\Bigl(\frac{\pi}{4} - \frac{2}{\pi}\Bigr) = \Bigl(\frac{\pi}{4} - \frac{2}{\pi}\Bigr)\frac{PR^3}{EI} = 0.149\,\frac{PR^3}{EI}.
$$
The coefficient is small because the ring's moments change sign and partly cancel; the same calculation with a horizontal pair of dummy loads gives the increase of the other diameter, $(2/\pi - 1/2)PR^3/(EI) = 0.137\,PR^3/(EI)$.
:::
:::

::: exercise Design: stiffness of a C-frame {level=3}
A small hydraulic press has a C-shaped steel frame: two horizontal arms of length $a = 0.30\,\mathrm{m}$ joined by a vertical back of length $h = 0.40\,\mathrm{m}$, all of the same section. The press force $P = 20\,\mathrm{kN}$ pushes the ends of the arms apart. (a) Show by the unit-load method that the opening of the jaw, considering bending only, is $\delta = \dfrac{P}{EI}\Bigl(\dfrac{2a^3}{3} + a^2h\Bigr)$. (b) Choose a solid rectangular section $60\,\mathrm{mm}$ wide so that $\delta \le 0.10\,\mathrm{mm}$ ($E = 200\,\mathrm{GPa}$), and check the bending stress. (c) Discuss what this design neglects.
::: solution
(a) Free bodies: in an arm at distance $x$ from its jaw end the moment is $Px$; in the back, the arm length is the moment arm throughout, $M = Pa$. A unit pair of loads at the jaw ends gives $m = M/P$. Hence
$$
\delta = 2\int_0^a\frac{Px^2}{EI}\,dx + \int_0^h\frac{Pa^2}{EI}\,dx = \frac{P}{EI}\Bigl(\frac{2a^3}{3} + a^2h\Bigr).
$$
(b) $\tfrac23 a^3 + a^2h = 0.018 + 0.036 = 0.054\,\mathrm{m^3}$. Then $I \ge P \times 0.054/(E\,\delta_\text{max}) = 20\,000 \times 0.054/(2\times10^{11} \times 10^{-4}) = 5.4\times10^{-5}\,\mathrm{m^4}$. For a width of $60\,\mathrm{mm}$, $I = bd^3/12$ gives $d^3 \ge 12 \times 5.4\times10^{-5}/0.06 = 0.0108\,\mathrm{m^3}$, so $d \ge 0.221\,\mathrm{m}$; take $d = 225\,\mathrm{mm}$ ($I = 5.70\times10^{-5}\,\mathrm{m^4}$, $\delta = 0.095\,\mathrm{mm}$). The largest moment is $Pa = 6\,\mathrm{kN\,m}$ in the back and at the arm roots, giving $\sigma = M(d/2)/I = 6000 \times 0.1125/5.70\times10^{-5} = 11.8\,\mathrm{MPa}$. Stiffness, not strength, governs: the stress is a small fraction of yield — typical of machine frames, which are sized for deflection.
(c) The back contributes two-thirds of the opening, so a deeper back alone would be more efficient than a uniform section, and a hollow or I-section would save mass for the same $I$. With arms only $1.3$–$1.8$ depths long, shear deformation and the flexibility of the corners (which beam theory treats as rigid) are significant; a finite element model or a test would refine the estimate. Fatigue at the inside corners, where the stress is concentrated, needs a generous fillet. As with every example in this atlas, a real press frame is designed to the relevant machinery safety standards and checked by a qualified engineer.
:::
:::
