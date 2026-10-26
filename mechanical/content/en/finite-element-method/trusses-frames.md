In [[finite-element-method/direct-stiffness]] every node moved along one line. Real structures are not so obliging: the members of a truss point in many directions, and the members of a frame bend as well as stretch. This chapter adds the two ingredients needed for skeletal structures of any shape. The first is a **coordinate transformation**, which writes the stiffness of an inclined bar in terms of the horizontal and vertical displacements of its ends so that members of different orientation can be assembled at a common node. The second is the **beam element**, whose nodes carry a rotation as well as a transverse displacement, and whose stiffness follows from the cubic deflection curves of [[mechanics-of-materials/beam-deflection]]. Combining the bar and the beam gives the **plane frame element**, with which a building frame, a machine chassis or a crane jib can be analysed. Everything is assembled and solved exactly as before; only the element matrices change.

## The plane truss element

A truss member is a bar pinned at both ends and loaded only at its joints, so it carries only an axial force (see [[statics/trusses]]). In its own **local** coordinate $\hat x$, which points from node $i$ to node $j$, it is the bar element of the previous chapter with stiffness $EA/L$. The nodes, however, move in two dimensions, and the global displacement components $(u, v)$ at a node are shared by every member that meets there.

::: definition Direction cosines and the plane truss element {#def-truss}
Let a bar run from node $i$ at $(x_i, y_i)$ to node $j$ at $(x_j, y_j)$, with length $L = \sqrt{(x_j - x_i)^2 + (y_j - y_i)^2}$. Its **direction cosines** are
$$
c = \cos\theta = \frac{x_j - x_i}{L}, \qquad s = \sin\theta = \frac{y_j - y_i}{L},
$$
where $\theta$ is measured anticlockwise from the global $x$ axis. Each node has two degrees of freedom, $u$ (along $x$) and $v$ (along $y$); the element displacement vector is $\mathbf{d}^{(e)} = [u_i, v_i, u_j, v_j]^{\mathsf T}$. The **elongation** of the bar, to first order in the displacements, is the projection of the relative displacement on the bar axis:
$$
\delta = (u_j - u_i)\,c + (v_j - v_i)\,s.
$$ {#eq-elongation}
:::

The elongation formula is a small-displacement statement. Moving node $j$ sideways (perpendicular to the bar) by $w$ changes the length only by $w^2/(2L)$, which is second order and is neglected; this is why a single bar provides no stiffness against sideways motion and why the bar's transverse DOFs are carried only by other members. The neglected term becomes important in [[finite-element-method/nonlinear-analysis]].

::: proposition Stiffness of a plane truss element {#prop-truss-k}
In global coordinates the plane truss element has
$$
\mathbf{k}^{(e)} = \frac{EA}{L}\begin{bmatrix} c^2 & cs & -c^2 & -cs \\ cs & s^2 & -cs & -s^2 \\ -c^2 & -cs & c^2 & cs \\ -cs & -s^2 & cs & s^2 \end{bmatrix} = \mathbf{T}^{\mathsf T}\,\hat{\mathbf{k}}\,\mathbf{T}, \qquad \mathbf{T} = \begin{bmatrix} c & s & 0 & 0 \\ 0 & 0 & c & s \end{bmatrix},
$$ {#eq-truss-k}
where $\hat{\mathbf{k}} = (EA/L)[1, -1; -1, 1]$ is the local bar stiffness. The axial force and stress are recovered from $N = (EA/L)\,\delta$ and $\sigma = N/A$, with $\delta$ from [[#eq-elongation]].
:::

::: proof
The local axial displacements are the projections $\hat u_i = c\,u_i + s\,v_i$ and $\hat u_j = c\,u_j + s\,v_j$, i.e. $\hat{\mathbf{d}} = \mathbf{T}\mathbf{d}^{(e)}$. The local nodal forces $\hat{\mathbf{f}} = \hat{\mathbf{k}}\hat{\mathbf{d}}$ act along the bar axis, so their global components are $\mathbf{f}^{(e)} = \mathbf{T}^{\mathsf T}\hat{\mathbf{f}}$ (force $\hat f_i$ along the axis has components $\hat f_i c$ and $\hat f_i s$). Combining, $\mathbf{f}^{(e)} = \mathbf{T}^{\mathsf T}\hat{\mathbf{k}}\mathbf{T}\,\mathbf{d}^{(e)}$. Multiplying out gives the explicit matrix. The same result follows from energy: $U = \tfrac12 (EA/L)\delta^2$ with $\delta = [-c, -s, c, s]\,\mathbf{d}^{(e)}$, so $\mathbf{k}^{(e)} = (EA/L)\,\mathbf{b}\mathbf{b}^{\mathsf T}$ with $\mathbf{b} = [-c, -s, c, s]^{\mathsf T}$, which is the explicit matrix again. The latter form shows at once that $\mathbf{k}^{(e)}$ has rank one: only one deformation — stretching — costs energy.
:::

The rank-one structure is worth keeping in mind. A $4 \times 4$ matrix of rank one has three independent zero-energy motions: two rigid translations and one rigid rotation (to first order, a rotation moves node $j$ perpendicular to the bar). Supports and other members must suppress all three, for each part of the structure, or the global matrix is singular — the matrix version of the statement that a truss must be stable and properly supported.

### Space trusses and inclined supports

In three dimensions each node has three DOFs $(u, v, w)$ and the bar direction has three cosines $c_x = \Delta x/L$, $c_y = \Delta y/L$, $c_z = \Delta z/L$. With $\mathbf{b} = [-c_x, -c_y, -c_z, c_x, c_y, c_z]^{\mathsf T}$ the energy argument of the proof gives directly
$$
\mathbf{k}^{(e)} = \frac{EA}{L}\,\mathbf{b}\,\mathbf{b}^{\mathsf T} \quad (6 \times 6), \qquad \delta = \mathbf{b}^{\mathsf T}\mathbf{d}^{(e)}.
$$
A roller support whose rolling surface is inclined at angle $\beta$ prescribes the displacement normal to that surface, not $u$ or $v$. The usual treatment rotates that node's two DOFs into the skewed directions with a $2\times2$ rotation (the same $c, s$ algebra), after which the normal component is struck out like any other support.

::: example A three-bar hanger {#ex-three-bar}
A free node at the origin hangs from three supports at $(-2, 2)$, $(0, 2)$ and $(2, 2)\,\mathrm{m}$ by three steel bars ($E = 200\,\mathrm{GPa}$, $A = 500\,\mathrm{mm^2}$ each). A load with components $F_x = 20\,\mathrm{kN}$ and $F_y = -50\,\mathrm{kN}$ acts at the free node. Find its displacement and the forces in the three bars.
::: solution
Free-body diagram of the node: the applied load, and the three bar forces acting along the bars, each assumed tensile (pulling the node towards its support). Two equilibrium equations, three unknown bar forces: indeterminate to the first degree.

Units N, mm. Take each bar from the free node (node $i$, DOFs $u, v$) to its support (node $j$, fixed). Only the $2 \times 2$ block of the free node is needed, which by [[#eq-truss-k]] is $(EA/L)[c^2, cs; cs, s^2]$.

| bar | to | $L$ (mm) | $c$ | $s$ | $EA/L$ (N/mm) |
|---|---|---|---|---|---|
| 1 | $(-2, 2)$ | 2828.4 | $-0.7071$ | $0.7071$ | 35 355 |
| 2 | $(0, 2)$ | 2000 | 0 | 1 | 50 000 |
| 3 | $(2, 2)$ | 2828.4 | $0.7071$ | $0.7071$ | 35 355 |

Assembling the three blocks: $K_{uu} = 35\,355(0.5) + 0 + 35\,355(0.5) = 35\,355$, $K_{vv} = 35\,355(0.5) + 50\,000 + 35\,355(0.5) = 85\,355$, $K_{uv} = 35\,355(-0.5) + 0 + 35\,355(0.5) = 0$ (the symmetric layout decouples $u$ and $v$). So
$$
u = \frac{20\,000}{35\,355} = 0.5657\,\mathrm{mm}, \qquad v = \frac{-50\,000}{85\,355} = -0.5858\,\mathrm{mm}.
$$
Bar forces from $N = (EA/L)\,\delta$ with $\delta = (0 - u)c + (0 - v)s$:
- bar 1: $\delta = -0.5657(-0.7071) + 0.5858(0.7071) = 0.8142\,\mathrm{mm}$, $N_1 = 28.79\,\mathrm{kN}$ (stress $57.6\,\mathrm{MPa}$);
- bar 2: $\delta = 0.5858\,\mathrm{mm}$, $N_2 = 29.29\,\mathrm{kN}$ ($58.6\,\mathrm{MPa}$);
- bar 3: $\delta = -0.5657(0.7071) + 0.5858(0.7071) = 0.0142\,\mathrm{mm}$, $N_3 = 0.50\,\mathrm{kN}$ ($1.0\,\mathrm{MPa}$).

*Check* equilibrium of the node, each bar pulling along its unit vector towards the support: $x$: $28.79(-0.7071) + 0 + 0.50(0.7071) = -20.0\,\mathrm{kN}$, balancing $+20$; $y$: $28.79(0.7071) + 29.29 + 0.50(0.7071) = 50.0\,\mathrm{kN}$, balancing $-50$. The horizontal load is carried almost entirely by bar 1, which it stretches, while it nearly unloads bar 3.
:::
:::

## The beam element

A beam element carries transverse load by bending. Its deflection $v(x)$ satisfies, in the Euler–Bernoulli theory of [[mechanics-of-materials/beam-deflection]], $EI\,v'''' = q(x)$ with bending moment $M = EI\,v''$ and shear force $V = -EI\,v'''$ (with the sagging-positive moment convention used there; we shall only need $M = EIv''$). Joining two beam segments requires continuity of deflection *and slope*, so each beam node carries two DOFs: the transverse displacement $v$ and the rotation $\theta = dv/dx$, positive anticlockwise.

::: proposition Hermite shape functions {#prop-hermite}
For a beam element of length $L$ with nodal DOFs $\mathbf{d}^{(e)} = [v_1, \theta_1, v_2, \theta_2]^{\mathsf T}$, the unique cubic $v(x)$ with $v(0) = v_1$, $v'(0) = \theta_1$, $v(L) = v_2$, $v'(L) = \theta_2$ is $v = N_1v_1 + N_2\theta_1 + N_3v_2 + N_4\theta_2$, where, with $\xi = x/L$,
$$
N_1 = 1 - 3\xi^2 + 2\xi^3, \quad N_2 = L(\xi - 2\xi^2 + \xi^3), \quad N_3 = 3\xi^2 - 2\xi^3, \quad N_4 = L(-\xi^2 + \xi^3).
$$ {#eq-hermite}
In the absence of load between the nodes the cubic is the exact Euler–Bernoulli deflection.
:::

::: proof
Write $v = a_0 + a_1x + a_2x^2 + a_3x^3$. The four conditions are linear in the $a$'s: $a_0 = v_1$, $a_1 = \theta_1$, $a_0 + a_1L + a_2L^2 + a_3L^3 = v_2$, $a_1 + 2a_2L + 3a_3L^2 = \theta_2$. Solving the last two for $a_2, a_3$ gives $a_2 = (3(v_2 - v_1) - L(2\theta_1 + \theta_2))/L^2$, $a_3 = (2(v_1 - v_2) + L(\theta_1 + \theta_2))/L^3$; collecting the coefficient of each nodal value yields [[#eq-hermite]]. The system has a unique solution because its determinant is $L^4 \neq 0$. With $q = 0$ on the element, $EIv'''' = 0$ makes the exact solution a cubic, and a cubic is fixed by the four end values, so it coincides with the interpolant.
:::

::: widget plot
f: 1 - 3x^2 + 2x^3; x - 2x^2 + x^3; 3x^2 - 2x^3; -x^2 + x^3
x: 0, 1
y: -0.2, 1.05
labels: N_1; N_2/L; N_3; N_4/L
caption: The four Hermite cubics on $0 \le \xi \le 1$. $N_1$ and $N_3$ are the deflected shapes for a unit end displacement with both end slopes held at zero; $N_2/L$ and $N_4/L$ are the shapes for a unit end rotation with both end displacements held. Check the slopes at the ends: each function has slope one at "its" end and zero at the other. Notice that $N_1 + N_3 = 1$ (rigid translation) and $N_2 + N_4 + L N_3 = x$ (rigid rotation about node 1) — the element can move rigidly without strain.
:::

::: proposition Beam element stiffness matrix {#prop-beam-k}
For a uniform Euler–Bernoulli beam element ($EI$ constant),
$$
\mathbf{k}^{(e)} = \frac{EI}{L^3}\begin{bmatrix} 12 & 6L & -12 & 6L \\ 6L & 4L^2 & -6L & 2L^2 \\ -12 & -6L & 12 & -6L \\ 6L & 2L^2 & -6L & 4L^2 \end{bmatrix},
$$ {#eq-beam-k}
acting on $[v_1, \theta_1, v_2, \theta_2]^{\mathsf T}$ and producing the nodal shear forces and moments $[F_1, M_1, F_2, M_2]^{\mathsf T}$ (upward and anticlockwise positive).
:::

::: proof
The bending strain energy is $U = \tfrac12\int_0^L EI\,(v'')^2\,dx$. With $v = \mathbf{N}\mathbf{d}^{(e)}$ we have $v'' = \mathbf{B}\mathbf{d}^{(e)}$, $\mathbf{B} = d^2\mathbf{N}/dx^2$, so $U = \tfrac12\mathbf{d}^{(e)\mathsf T}\left(\int_0^L EI\,\mathbf{B}^{\mathsf T}\mathbf{B}\,dx\right)\mathbf{d}^{(e)}$ and $\mathbf{k}^{(e)} = \int_0^L EI\,\mathbf{B}^{\mathsf T}\mathbf{B}\,dx$. Differentiating [[#eq-hermite]] twice ($d/dx = L^{-1}d/d\xi$):
$$
\mathbf{B} = \frac{1}{L^2}\left[\,-6 + 12\xi,\ \ L(-4 + 6\xi),\ \ 6 - 12\xi,\ \ L(-2 + 6\xi)\,\right].
$$
Each entry is $k_{ab} = (EI/L^3)\int_0^1 \hat B_a\hat B_b\,d\xi$ with $\hat B$ the bracketed functions. For example $k_{11} = (EI/L^3)\int_0^1(12\xi - 6)^2d\xi = (EI/L^3)\cdot 12$, and $k_{22} = (EI/L^3)L^2\int_0^1(6\xi - 4)^2d\xi = (EI/L^3)\cdot 4L^2$, $k_{24} = (EI/L^3)L^2\int_0^1(6\xi - 4)(6\xi - 2)d\xi = (EI/L^3)\cdot 2L^2$. The rest follow in the same way. Because the shape functions are exact for an unloaded beam, the matrix is the *exact* stiffness of a uniform Euler–Bernoulli beam, identical to the slope-deflection equations of classical structural analysis.
:::

Each column again has a direct meaning. Column 2 says that to rotate end 1 by a unit angle with the other three DOFs held, you need a moment $4EI/L$ at end 1 and a moment $2EI/L$ at end 2 (the "carry-over" of one half), together with shears $\pm 6EI/L^2$ to keep the element in moment balance. Assumptions: small deflections, plane sections remaining plane and normal to the axis (no shear deformation — the Timoshenko element adds it for deep beams), linear elastic material, bending about a principal axis.

### Loads between the nodes

A distributed load cannot be applied to a beam model directly; it is replaced by **consistent nodal loads**, the nodal forces and moments that do the same virtual work as the real load over the Hermite displacement field: $\mathbf{f}_q^{(e)} = \int_0^L \mathbf{N}^{\mathsf T}q(x)\,dx$. For a uniform load $q$ (upward positive) this gives
$$
\mathbf{f}_q^{(e)} = \left[\ \frac{qL}{2},\ \ \frac{qL^2}{12},\ \ \frac{qL}{2},\ \ -\frac{qL^2}{12}\ \right]^{\mathsf T},
$$ {#eq-udl}
which are the fixed-end reactions of a clamped–clamped beam with their signs reversed. The nodal displacements obtained with these loads are exact. The member end forces, however, are $\mathbf{k}^{(e)}\mathbf{d}^{(e)} - \mathbf{f}_q^{(e)}$, and the deflection *between* nodes given by the Hermite cubic misses the quartic part of the true curve; for internal deflections and moments one adds the fixed–fixed particular solution or uses more elements.

::: warning Lumping a beam load is not the same as consistent loading
A tempting shortcut is to apply $qL/2$ at each end of a loaded beam element and no moments. For the nodal *forces* this is correct, but the omitted moments $\pm qL^2/12$ cancel only where two equal loaded elements meet; at a fixed end, a roller or a change of load they do not, and the result is wrong. A propped cantilever with a uniform load modelled by one element and lumped loads gives a rotation of zero at the roller instead of $qL^3/(48EI)$. Use [[#eq-udl]], and remember to subtract $\mathbf{f}_q^{(e)}$ when recovering member end forces.
:::

::: example A cantilever with one element {#ex-cantilever}
A steel cantilever ($E = 200\,\mathrm{GPa}$, $I = 8.0 \times 10^{6}\,\mathrm{mm^4}$) of length $L = 2\,\mathrm{m}$ carries a downward tip load $P = 10\,\mathrm{kN}$. Using one beam element, find the tip deflection and rotation.
::: solution
Node 1 is clamped ($v_1 = \theta_1 = 0$); node 2 carries $F_2 = -10\,000\,\mathrm{N}$, $M_2 = 0$. The reduced system is the lower-right block of [[#eq-beam-k]]:
$$
\frac{EI}{L^3}\begin{bmatrix} 12 & -6L \\ -6L & 4L^2 \end{bmatrix}\begin{bmatrix} v_2 \\ \theta_2 \end{bmatrix} = \begin{bmatrix} -P \\ 0 \end{bmatrix}.
$$
The second row gives $\theta_2 = 3v_2/(2L)$; the first then gives $(EI/L^3)(12 - 9)v_2 = -P$, so
$$
v_2 = -\frac{PL^3}{3EI} = -\frac{10\,000 \times 2000^3}{3 \times 200\,000 \times 8.0\times10^6} = -16.67\,\mathrm{mm}, \qquad \theta_2 = -\frac{PL^2}{2EI} = -0.0125\,\mathrm{rad}.
$$
*Check.* These are the textbook formulas exactly, as [[#prop-hermite]] promised for an element with no load between its nodes; the negative rotation is clockwise, as expected for a tip that droops. The deflection is $L/120$, large but still a small-deflection problem.
:::
:::

::: example A propped cantilever under uniform load {#ex-propped}
A beam of length $L = 5\,\mathrm{m}$ with $EI = 1.0 \times 10^{13}\,\mathrm{N\,mm^2}$ ($E = 200\,\mathrm{GPa}$, $I = 50 \times 10^6\,\mathrm{mm^4}$) is clamped at $x = 0$ and simply supported at $x = L$; it carries a downward uniform load $w = 10\,\mathrm{kN/m}$. Analyse it with one element, find the reactions, and compare the midspan deflection from one and two elements with the exact value.
::: solution
*One element.* Units N, mm: $w = 10\,\mathrm{N/mm}$, so $q = -10\,\mathrm{N/mm}$. Consistent loads from [[#eq-udl]]: $\mathbf{f}_q = [-25\,000,\ -2.083\times10^{7},\ -25\,000,\ +2.083\times10^{7}]^{\mathsf T}$ (N, N mm). Supports: $v_1 = \theta_1 = v_2 = 0$, leaving only $\theta_2$:
$$
\frac{4EI}{L}\,\theta_2 = \frac{wL^2}{12} \quad\Rightarrow\quad \theta_2 = \frac{wL^3}{48EI} = \frac{10 \times 5000^3}{48 \times 10^{13}} = 2.604\times10^{-3}\,\mathrm{rad}.
$$
This is the exact end rotation of a propped cantilever. End forces $\mathbf{k}\mathbf{d} - \mathbf{f}_q$: using column 4 of [[#eq-beam-k]] times $\theta_2$, i.e. $(EI/L^3)[6L, 2L^2, -6L, 4L^2]\theta_2 = [6\,250,\ 1.042\times10^{7},\ -6\,250,\ 2.083\times10^{7}]$, minus $\mathbf{f}_q$:
$$
[F_1, M_1, F_2, M_2] = [31\,250\,\mathrm{N},\ 3.125\times10^{7}\,\mathrm{N\,mm},\ 18\,750\,\mathrm{N},\ 0].
$$
So $R_A = 31.25\,\mathrm{kN} = 5wL/8$, $M_A = 31.25\,\mathrm{kN\,m} = wL^2/8$ (anticlockwise on the beam: hogging at the wall), $R_B = 18.75\,\mathrm{kN} = 3wL/8$, and the moment at the roller is zero, as it must be. All four are exact.

*Midspan deflection.* The exact curve is $v = -\dfrac{w x^2(3L^2 - 5Lx + 2x^2)}{48EI}$, giving $v(L/2) = -wL^4/(192EI) = -3.255\,\mathrm{mm}$. The one-element Hermite cubic gives $v(L/2) = N_4(\tfrac12)\theta_2 = -\tfrac{L}{8}\theta_2 = -1.628\,\mathrm{mm}$ — only half. With two elements, the midspan node is a DOF and the solution gives $v = -3.255\,\mathrm{mm}$ exactly there, with the largest deflection between nodes, $3.357\,\mathrm{mm}$ near $x = 2.9\,\mathrm{m}$, against the exact $3.385\,\mathrm{mm}$ at $x = 0.5785L = 2.89\,\mathrm{m}$.

*Check.* $R_A + R_B = 50\,\mathrm{kN} = wL$. The lesson: nodal values from consistent loads are exact, but the field between nodes is only an interpolation; ask for results where you have nodes.
:::
:::

::: widget plot
f: -13.0208*(x/5)^2*(3-5*(x/5)+2*(x/5)^2); 13.0208*((x/5)^3-(x/5)^2); if(x<2.5, -3.25521*(3*(x/2.5)^2-2*(x/2.5)^3) - 1.62760*((x/2.5)^3-(x/2.5)^2), -3.25521*(1-3*((x-2.5)/2.5)^2+2*((x-2.5)/2.5)^3) - 1.62760*((x-2.5)/2.5-2*((x-2.5)/2.5)^2+((x-2.5)/2.5)^3) + 6.51042*(((x-2.5)/2.5)^3-((x-2.5)/2.5)^2))
x: 0, 5
y: -3.6, 0.2
labels: \text{exact}; \text{1 element}; \text{2 elements}
points: 2.5,-3.2552; 2.5,-1.6276
caption: Deflection (mm) of the propped cantilever of [[#ex-propped]] against $x$ (m). All three curves pass through the exact nodal values — zero deflection at both supports and, for the two-element model, the exact midspan value — and have the exact end rotations. Between nodes the Hermite cubic can only interpolate; the one-element curve is half the true midspan deflection, while two elements are already within 1 % everywhere.
:::

## The plane frame element

A frame member both stretches and bends. In its local axes ($\hat x$ along the member, $\hat y$ perpendicular, anticlockwise from $\hat x$) the two actions are uncoupled for small displacements, so the local stiffness is simply the bar matrix on the axial DOFs and the beam matrix on the transverse ones:

::: proposition Plane frame element {#prop-frame}
With local DOFs $\hat{\mathbf{d}} = [\hat u_1, \hat v_1, \theta_1, \hat u_2, \hat v_2, \theta_2]^{\mathsf T}$ and $a = EA/L$, $b = EI/L^3$,
$$
\hat{\mathbf{k}} = \begin{bmatrix} a & 0 & 0 & -a & 0 & 0 \\ 0 & 12b & 6bL & 0 & -12b & 6bL \\ 0 & 6bL & 4bL^2 & 0 & -6bL & 2bL^2 \\ -a & 0 & 0 & a & 0 & 0 \\ 0 & -12b & -6bL & 0 & 12b & -6bL \\ 0 & 6bL & 2bL^2 & 0 & -6bL & 4bL^2 \end{bmatrix}.
$$
In global coordinates $\mathbf{k}^{(e)} = \mathbf{T}^{\mathsf T}\hat{\mathbf{k}}\mathbf{T}$, where $\mathbf{T}$ is block diagonal with two copies of
$$
\mathbf{r} = \begin{bmatrix} c & s & 0 \\ -s & c & 0 \\ 0 & 0 & 1 \end{bmatrix}.
$$
:::

::: proof
At each node the local translations are the global ones rotated by $\theta$: $\hat u = cu + sv$, $\hat v = -su + cv$, while a rotation about the $z$ axis is the same in both frames. Hence $\hat{\mathbf{d}} = \mathbf{T}\mathbf{d}$. Nodal forces transform the same way and, because $\mathbf{r}$ is orthogonal ($\mathbf{r}^{-1} = \mathbf{r}^{\mathsf T}$), $\mathbf{f} = \mathbf{T}^{\mathsf T}\hat{\mathbf{f}}$. Then $\mathbf{f} = \mathbf{T}^{\mathsf T}\hat{\mathbf{k}}\mathbf{T}\mathbf{d}$. Equivalently, the strain energy is invariant, $\tfrac12\hat{\mathbf{d}}^{\mathsf T}\hat{\mathbf{k}}\hat{\mathbf{d}} = \tfrac12\mathbf{d}^{\mathsf T}(\mathbf{T}^{\mathsf T}\hat{\mathbf{k}}\mathbf{T})\mathbf{d}$. The block structure of $\hat{\mathbf{k}}$ (no coupling between axial and bending DOFs) holds for a straight member with its axis through the section centroid under small displacements; axial force does change bending stiffness (the $P$–$\Delta$ effect), a geometric nonlinearity.
:::

A rigid joint between frame members shares all three DOFs, so moments are transmitted. A **hinge** (pin) shares only the translations: the members get separate rotation DOFs at that node, or the moment at the released end is condensed out of the element matrix. Because axial stiffness $EA/L$ is usually several orders larger than the bending stiffness $12EI/L^3$, frame members are almost inextensible, and the global matrix has entries that differ by large factors — harmless in double precision, but the reason hand methods often assume inextensible members.

::: example A portal frame under a lateral load {#ex-portal}
A portal frame has two columns of height $4\,\mathrm{m}$ with fixed bases at $(0, 0)$ and $(6, 0)\,\mathrm{m}$ and a beam of span $6\,\mathrm{m}$ joining their tops rigidly. All members are steel with $E = 200\,\mathrm{GPa}$, $A = 6000\,\mathrm{mm^2}$, $I = 50 \times 10^6\,\mathrm{mm^4}$. A horizontal wind load $H = 10\,\mathrm{kN}$ acts at the top of the left column. Find the sway and the base reactions.
::: solution
*Model.* Nodes 1 $(0, 0)$, 2 $(0, 4000)$, 3 $(6000, 4000)$, 4 $(6000, 0)\,\mathrm{mm}$; elements 1–2 (column, $\theta = 90°$, $c = 0$, $s = 1$), 2–3 (beam, $c = 1$, $s = 0$), 4–3 (column). Nodes 1 and 4 are fixed, leaving six free DOFs $u_2, v_2, \theta_2, u_3, v_3, \theta_3$. For the columns, $\mathbf{T}$ swaps roles: local axial is global $v$, local transverse is $-u$. Element constants: columns $EA/L = 300\,000\,\mathrm{N/mm}$, $12EI/L^3 = 1875\,\mathrm{N/mm}$; beam $EA/L = 200\,000\,\mathrm{N/mm}$, $12EI/L^3 = 555.6\,\mathrm{N/mm}$. Assembling the three $6 \times 6$ global matrices into the $12 \times 12$ system and solving the $6 \times 6$ free block (done by computer; it is routine but long by hand) gives
$$
u_2 = 4.284\,\mathrm{mm}, \quad u_3 = 4.259\,\mathrm{mm}, \quad v_2 = -v_3 = 0.0089\,\mathrm{mm}, \quad \theta_2 = -8.06\times10^{-4}, \quad \theta_3 = -7.99\times10^{-4}\,\mathrm{rad}.
$$
The beam shortens by $0.025\,\mathrm{mm}$ under its axial force of about $5\,\mathrm{kN}$; the vertical displacements are the column shortening and lengthening caused by overturning.

Reactions ($\mathbf{R} = \mathbf{K}\mathbf{d} - \mathbf{F}$ at the base DOFs): horizontal $-5.01$ and $-4.99\,\mathrm{kN}$, vertical $-2.66$ and $+2.66\,\mathrm{kN}$, base moments $12.04$ and $11.98\,\mathrm{kN\,m}$.

*Checks.* $\sum F_x$: $10 - 5.01 - 4.99 = 0$. Moments about the left base: the load gives $10 \times 4 = 40\,\mathrm{kN\,m}$ clockwise, resisted by the base moments $12.04 + 11.98 = 24.02$ plus the vertical-reaction couple $2.66 \times 6 = 15.99$, total $40.0\,\mathrm{kN\,m}$. Bounds: if the beam were infinitely stiff, each column would be a fixed–fixed member with sway stiffness $12EI/h^3$, and $\Delta = Hh^3/(24EI) = 2.67\,\mathrm{mm}$; with no beam each column would be a free cantilever, $\Delta = Hh^3/(6EI) = 10.67\,\mathrm{mm}$ for the two sharing equally. The computed $4.28\,\mathrm{mm}$ lies between, closer to the stiff-beam bound because the beam ($I/L = 8.3\times10^3\,\mathrm{mm^3}$) is not much less stiff than the columns ($12.5\times10^3\,\mathrm{mm^3}$).
:::
:::

::: quiz
A plane truss model has 6 nodes, 9 bars and pin supports at two nodes. After assembly and removal of the supported DOFs, the solver reports a singular stiffness matrix. Which is the most likely cause?
- [ ] Too many bars: a redundant member makes $\mathbf{K}$ singular.
- [x] A mechanism: some joint or group of members can move without stretching any bar, for example a node where only collinear bars meet.
- [ ] The bars have different areas.
- [ ] The direction cosines of some bars are negative.
::: solution
$\mathbf{K}_{ff}$ is singular exactly when a non-zero displacement produces no elongation in any bar — a mechanism. Counting gives $2 \times 6 = 12$ DOFs, $9 + 4 = 13$ bars plus reaction components, so the truss is not deficient in number; the problem must be the arrangement, e.g. a node joined by two collinear bars, which can move perpendicular to them with no first-order stretching. Redundant bars make a structure stiffer, never singular, and negative cosines are just orientations.
:::
:::

::: history
The truss and frame elements came first because aircraft and civil engineers already possessed the matrix formulation of structural analysis: the slope-deflection equations of the beam element date from the early twentieth century, and moment distribution, Hardy Cross's iterative way of solving them by hand, from 1930. What changed in the 1950s was the computer. Turner, Clough, Martin and Topp's 1956 paper on the Boeing delta wing treated the spars and ribs as bars and beams and the skin as triangular plates, all transformed to global axes and added into one matrix, and Argyris's 1954–55 articles in *Aircraft Engineering* gave the general theory of transforming and assembling element matrices. General-purpose programs followed in the 1960s: NASA's NASTRAN was developed in the late 1960s, and Swanson Analysis Systems, the company behind ANSYS, was founded in 1970. The space-frame analyses that design every tall building and offshore platform today are these same matrices, assembled millions of times.
:::

::: summary
- A plane truss element is a bar whose axial displacement is the projection $c\,u + s\,v$ of its nodal displacements; $\mathbf{k}^{(e)} = \mathbf{T}^{\mathsf T}\hat{\mathbf{k}}\mathbf{T} = (EA/L)\mathbf{b}\mathbf{b}^{\mathsf T}$, a rank-one matrix with three rigid-body modes in 2-D.
- Member force is recovered from the elongation $\delta = (u_j - u_i)c + (v_j - v_i)s$; a 3-D bar uses three direction cosines in the same way.
- A singular truss matrix means a mechanism or insufficient supports, not redundancy.
- The beam element has DOFs $v$ and $\theta$ at each node; its Hermite cubic shape functions are exact for an unloaded Euler–Bernoulli beam, so $\mathbf{k}^{(e)} = (EI/L^3)[12, 6L, \dots]$ is the exact slope-deflection stiffness.
- Distributed loads become consistent nodal loads $\int\mathbf{N}^{\mathsf T}q\,dx$ (for a UDL $qL/2$ and $\pm qL^2/12$); nodal displacements are then exact, but member end forces need $-\mathbf{f}_q$ and deflections between nodes are only interpolated.
- The plane frame element superposes bar and beam stiffness in local axes and rotates them with the block-diagonal $\mathbf{T}$; hinges release rotations.
- Check every solution by equilibrium of reactions and by simple bounding models.
:::

## Exercises

::: exercise One entry of an inclined bar {level=1 check="30"}
A steel bar ($E = 200\,\mathrm{GPa}$, $A = 400\,\mathrm{mm^2}$, $L = 2\,\mathrm{m}$) is inclined at $30°$ to the $x$ axis. What is the entry $k_{11}$ (the $u_i$–$u_i$ term) of its global stiffness matrix? (Enter it in kN/mm.)
::: solution
$EA/L = 200\,000 \times 400/2000 = 40\,000\,\mathrm{N/mm}$ and $c^2 = \cos^2 30° = 0.75$, so $k_{11} = 30\,000\,\mathrm{N/mm} = 30\,\mathrm{kN/mm}$.
:::
:::

::: exercise Stress from nodal displacements {level=1 check="88"}
A bar runs from node $i$ at $(0, 0)$ to node $j$ at $(3, 4)\,\mathrm{m}$; $E = 200\,\mathrm{GPa}$. A solution gives $u_i = v_i = 0$, $u_j = 1.0\,\mathrm{mm}$, $v_j = 2.0\,\mathrm{mm}$. What is the stress in the bar? (Enter it in MPa; tension positive.)
::: solution
$L = 5000\,\mathrm{mm}$, $c = 0.6$, $s = 0.8$. Elongation $\delta = 1.0(0.6) + 2.0(0.8) = 2.2\,\mathrm{mm}$, strain $4.4\times10^{-4}$, stress $200\,000 \times 4.4\times10^{-4} = 88\,\mathrm{MPa}$ tension.
:::
:::

::: exercise Tip rotation of a cantilever {level=1 check="0.0125"}
For the cantilever of [[#ex-cantilever]], verify from the reduced $2 \times 2$ system that the magnitude of the tip rotation is $PL^2/(2EI)$ and evaluate it. (Enter $|\theta_2|$ in rad.)
::: solution
From the second row, $\theta_2 = 3v_2/(2L)$ with $v_2 = -PL^3/(3EI)$, so $\theta_2 = -PL^2/(2EI) = -10\,000 \times 2000^2/(2 \times 1.6\times10^{12}) = -0.0125\,\mathrm{rad}$.
:::
:::

::: exercise Consistent moments for a floor beam {level=2 check="9"}
A beam element of length $3\,\mathrm{m}$ carries a uniform load of $12\,\mathrm{kN/m}$. What is the magnitude of each consistent nodal moment? Explain why these moments cancel at an interior node between two identical loaded elements but not at a support. (Enter the moment in kN m.)
::: solution
$qL^2/12 = 12 \times 3^2/12 = 9\,\mathrm{kN\,m}$, anticlockwise at the left node and clockwise at the right node for an upward load (reversed for a downward one). At an interior node the right end of one element contributes $-9$ and the left end of the next $+9$: they cancel. At a support or at the end of a loaded region there is no partner, and the moment must be kept.
:::
:::

::: exercise A symmetric two-bar hanger {level=2 check="1.302"}
Two identical steel bars ($E = 200\,\mathrm{GPa}$, $A = 300\,\mathrm{mm^2}$) run from supports at $(-1.5, 2)\,\mathrm{m}$ and $(1.5, 2)\,\mathrm{m}$ to a free node at the origin, which carries a downward load of $40\,\mathrm{kN}$. Derive the vertical stiffness of the node from [[#eq-truss-k]] and find the deflection. (Enter the downward deflection in mm.)
::: solution
Each bar has $L = 2.5\,\mathrm{m}$, $|c| = 0.6$, $s = 0.8$, $EA/L = 200\,000 \times 300/2500 = 24\,000\,\mathrm{N/mm}$. The $vv$ entry sums to $2 \times 24\,000 \times 0.64 = 30\,720\,\mathrm{N/mm}$, and the $uv$ entries cancel by symmetry. Deflection $= 40\,000/30\,720 = 1.302\,\mathrm{mm}$. In formula form $\delta = PL/(2EA\sin^2\theta)$: flatter hangers (small $\sin\theta$) are much more flexible.
:::
:::

::: exercise A fixed–fixed beam with a central load {level=2 check="1.667"}
A beam of length $4\,\mathrm{m}$, clamped at both ends, with $E = 200\,\mathrm{GPa}$ and $I = 20\times10^6\,\mathrm{mm^4}$, carries a downward point load of $20\,\mathrm{kN}$ at midspan. Model it with two beam elements, use symmetry to argue that $\theta = 0$ at midspan, and find the central deflection. (Enter its magnitude in mm.)
::: solution
With $L_e = 2000\,\mathrm{mm}$ the free DOFs are $v_2, \theta_2$ at midspan. The $\theta_2$ row has the contributions $-6EI/L_e^2\,v_2$ (element 1) and $+6EI/L_e^2\,v_2$ (element 2), which cancel, so $(8EI/L_e)\theta_2 = 0$ and $\theta_2 = 0$. The $v_2$ row gives $2 \times 12EI/L_e^3\,v_2 = -P$, so $v_2 = -PL_e^3/(24EI) = -PL^3/(192EI) = -20\,000 \times 4000^3/(192 \times 4\times10^{12}) = -1.667\,\mathrm{mm}$. This is the exact result, since the point load sits on a node.
:::
:::

::: exercise A space-truss member {level=3 check="22.449"}
A space-truss member runs from node $i$ at $(0, 0, 0)$ to node $j$ at $(2, 3, 6)\,\mathrm{m}$; $E = 200\,\mathrm{GPa}$, $A = 500\,\mathrm{mm^2}$. Node $i$ is fixed and node $j$ displaces by $(1, -1, 2)\,\mathrm{mm}$. Find the axial force. Then show that the displacement $(3, -2, 0)$ of node $j$ produces no first-order force, and explain why. (Enter the axial force for the first displacement in kN.)
::: solution
$L = \sqrt{4 + 9 + 36} = 7\,\mathrm{m}$, direction cosines $(2/7, 3/7, 6/7)$. Elongation $\delta = (2 \cdot 1 + 3 \cdot (-1) + 6 \cdot 2)/7 = 11/7 = 1.571\,\mathrm{mm}$. $EA/L = 200\,000 \times 500/7000 = 14\,286\,\mathrm{N/mm}$, so $N = 22\,449\,\mathrm{N} = 22.449\,\mathrm{kN}$ tension. For $(3, -2, 0)$: $\delta = (6 - 6 + 0)/7 = 0$; the displacement is perpendicular to the member, so to first order it only rotates the bar. A space-truss node therefore needs at least three non-coplanar members to be stable.
:::
:::

::: exercise A beam stiffness entry from energy {level=3}
Starting from $\mathbf{k}^{(e)} = \int_0^L EI\,\mathbf{B}^{\mathsf T}\mathbf{B}\,dx$ with the Hermite functions, derive $k_{12} = 6EI/L^2$ and $k_{44} = 4EI/L$. Then show that the sum of the first and third rows of [[#eq-beam-k]] is zero and that row 2 + row 4 equals $-L$ times row 3; interpret both facts as equilibrium of the element.
::: solution
With $\hat B_1 = 12\xi - 6$, $\hat B_2 = L(6\xi - 4)$, $\hat B_4 = L(6\xi - 2)$ and $dx = L\,d\xi$: $k_{12} = (EI/L^3)L\int_0^1(12\xi - 6)(6\xi - 4)d\xi$. The integral is $\int_0^1(72\xi^2 - 84\xi + 24)d\xi = 24 - 42 + 24 = 6$, so $k_{12} = 6EI/L^2$. $k_{44} = (EI/L^3)L^2\int_0^1(6\xi - 2)^2d\xi = (EI/L)(12 - 12 + 4) = 4EI/L$. Row 1 + row 3 $= (EI/L^3)[0, 0, 0, 0]$: the two end shears of a free element balance (vertical equilibrium). Row 2 + row 4 $= (EI/L^3)[12L, 6L^2, -12L, 6L^2] = -L \times$ row 3: the end moments plus the moment of the end shear $F_2$ about node 1 vanish (moment equilibrium). The matrix is therefore singular with two rigid-body modes, translation and rotation.
:::
:::

::: exercise Truss or frame? {level=3}
A steel roof truss with welded gusset-plate joints is to be checked. Discuss whether it should be modelled with truss elements or frame elements. Your answer should address: what the two models assume about the joints; what quantities each gives; when "secondary" bending stresses from joint rigidity are significant (think of the member slenderness $L/r$); and how you would use both models together to decide. Suggest a quantitative check you could carry out with the elements of this chapter.
::: solution
A truss model assumes frictionless pins: members carry axial force only, and the forces follow from statics for a determinate truss. A frame model makes the joints rigid, so members also carry end moments ("secondary moments") induced by the joint rotations needed for compatibility. For slender members ($L/r$ above about 50–100) the bending stiffness $EI/L$ is small compared with axial stiffness $EA/L$ (their ratio is $(r/L)^2$), so secondary stresses are typically a few per cent to perhaps 20 % of the axial stresses; for short, stocky members, or where loads are applied between joints (purlins on a top chord), bending is primary and a frame model is necessary. A practical procedure: solve both models; compare axial forces (they should agree closely if the truss idealisation is reasonable); take the frame model's end moments and compute $\sigma = N/A \pm Mc/I$; check members with loads between nodes as beams; and remember that real gusset joints are neither perfect pins nor perfectly rigid, so the two models bracket the behaviour. Joint eccentricities and the buckling of compression members must be checked separately against the applicable design code; this analysis is not a substitute for it.
:::
:::
