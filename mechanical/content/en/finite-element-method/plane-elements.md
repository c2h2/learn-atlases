Bars and beams are one-dimensional idealisations: their stress state is described by one or two internal forces. A bracket plate, the web of a deep girder, a gear tooth or the wall of a thick pipe cannot be described that way — the stress varies over a two-dimensional region, and stress concentrations at holes and fillets are what the designer needs to know. This chapter builds the first **continuum elements**: the three-node **constant-strain triangle** and the four-node **bilinear quadrilateral**, for bodies in plane stress or plane strain. The recipe is the one derived in [[finite-element-method/weak-forms]] — virtual work, shape functions, Galerkin — now in two dimensions, with the elasticity of [[solid-mechanics/linear-elasticity]] supplying the stress–strain law. The algebra is heavier, so it is organised around three matrices: the shape functions $\mathbf{N}$, the strain–displacement matrix $\mathbf{B}$ and the constitutive matrix $\mathbf{D}$. Once those are in place, every element stiffness matrix has the same form $\int\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,dV$. We shall also meet the first serious failure of a finite element: the quadrilateral that is far too stiff in bending.

## Plane stress and plane strain

Many bodies are thin or long enough in one direction that the stresses and strains depend only on $x$ and $y$.

::: definition Plane stress and plane strain {#def-plane}
A body is in **plane stress** if $\sigma_z = \tau_{xz} = \tau_{yz} = 0$ throughout: a thin plate loaded in its own plane, with free faces $z = \pm t/2$ (brackets, gusset plates, the web of a beam). It is in **plane strain** if $\varepsilon_z = \gamma_{xz} = \gamma_{yz} = 0$: a long prismatic body loaded uniformly along its length and restrained from extending in $z$ (a dam, a retaining wall, a long pipe or tunnel lining). In both cases the in-plane state is described by
$$
\boldsymbol{\varepsilon} = \begin{bmatrix} \varepsilon_x \\ \varepsilon_y \\ \gamma_{xy} \end{bmatrix} = \begin{bmatrix} \partial u/\partial x \\ \partial v/\partial y \\ \partial u/\partial y + \partial v/\partial x \end{bmatrix}, \qquad \boldsymbol{\sigma} = \begin{bmatrix} \sigma_x \\ \sigma_y \\ \tau_{xy} \end{bmatrix} = \mathbf{D}\,\boldsymbol{\varepsilon},
$$ {#eq-strain}
where $\gamma_{xy}$ is the engineering shear strain and $\mathbf{D}$ is the **constitutive matrix**.
:::

::: proposition Constitutive matrices {#prop-D}
For an isotropic linear elastic material with Young's modulus $E$ and Poisson's ratio $\nu$,
$$
\mathbf{D}_{\text{plane stress}} = \frac{E}{1 - \nu^2}\begin{bmatrix} 1 & \nu & 0 \\ \nu & 1 & 0 \\ 0 & 0 & \tfrac{1 - \nu}{2} \end{bmatrix}, \qquad \mathbf{D}_{\text{plane strain}} = \frac{E}{(1 + \nu)(1 - 2\nu)}\begin{bmatrix} 1 - \nu & \nu & 0 \\ \nu & 1 - \nu & 0 \\ 0 & 0 & \tfrac{1 - 2\nu}{2} \end{bmatrix}.
$$
In plane stress the out-of-plane strain is $\varepsilon_z = -\nu(\sigma_x + \sigma_y)/E$; in plane strain the out-of-plane stress is $\sigma_z = \nu(\sigma_x + \sigma_y)$.
:::

::: proof
Three-dimensional Hooke's law gives $\varepsilon_x = [\sigma_x - \nu(\sigma_y + \sigma_z)]/E$, $\varepsilon_y = [\sigma_y - \nu(\sigma_x + \sigma_z)]/E$, $\varepsilon_z = [\sigma_z - \nu(\sigma_x + \sigma_y)]/E$ and $\gamma_{xy} = \tau_{xy}/G$ with $G = E/[2(1 + \nu)]$. *Plane stress:* set $\sigma_z = 0$ and solve the first two equations for $\sigma_x, \sigma_y$: $\sigma_x = E(\varepsilon_x + \nu\varepsilon_y)/(1 - \nu^2)$ and symmetrically; $\tau_{xy} = G\gamma_{xy} = \tfrac{E}{1 - \nu^2}\cdot\tfrac{1 - \nu}{2}\gamma_{xy}$. *Plane strain:* set $\varepsilon_z = 0$, which gives $\sigma_z = \nu(\sigma_x + \sigma_y)$; substitute into the first two equations and solve, which yields the second matrix. Both matrices are symmetric and positive definite for $-1 < \nu < \tfrac12$; the plane-strain matrix blows up as $\nu \to \tfrac12$, the incompressible limit, a fact that returns as volumetric locking in [[finite-element-method/convergence-meshing]].
:::

## Virtual work in two dimensions

For a plate of thickness $t$ occupying the region $A$, with body force $\mathbf{b}$ (per unit volume) and surface traction $\mathbf{q}$ (per unit area of edge surface) on part of its boundary $\Gamma_q$, the principle of virtual work reads
$$
\int_A \delta\boldsymbol{\varepsilon}^{\mathsf T}\boldsymbol{\sigma}\,t\,dA = \int_A \delta\mathbf{u}^{\mathsf T}\mathbf{b}\,t\,dA + \int_{\Gamma_q}\delta\mathbf{u}^{\mathsf T}\mathbf{q}\,t\,ds
$$ {#eq-vw2d}
for every virtual displacement $\delta\mathbf{u} = [\delta u, \delta v]^{\mathsf T}$ that vanishes on the supported boundary. This is the two-dimensional weak form; it can be derived from the equilibrium equations $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y + b_x = 0$ (and its $y$ partner) by multiplying by $\delta u$, $\delta v$ and using the divergence theorem, exactly as integration by parts was used in one dimension.

Inside an element, interpolate the displacements from the nodal values, $\mathbf{u} = \mathbf{N}\mathbf{d}^{(e)}$. Differentiating gives the strains, $\boldsymbol{\varepsilon} = \mathbf{B}\mathbf{d}^{(e)}$, and the stresses, $\boldsymbol{\sigma} = \mathbf{D}\mathbf{B}\mathbf{d}^{(e)}$. With the same interpolation for $\delta\mathbf{u}$ (Galerkin), [[#eq-vw2d]] becomes $\delta\mathbf{d}^{\mathsf T}(\mathbf{k}^{(e)}\mathbf{d} - \mathbf{f}^{(e)}) = 0$ element by element, with
$$
\mathbf{k}^{(e)} = \int_{A_e}\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,dA, \qquad \mathbf{f}^{(e)} = \int_{A_e}\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA + \int_{\Gamma_e}\mathbf{N}^{\mathsf T}\mathbf{q}\,t\,ds.
$$ {#eq-kgeneral}
These two formulas are the whole of linear static finite element analysis; the rest is the choice of $\mathbf{N}$ and the evaluation of the integrals.

## The constant-strain triangle

The simplest choice in two dimensions is a triangle with three corner nodes and a linear displacement field $u = \alpha_1 + \alpha_2x + \alpha_3y$ (and the same for $v$). Three coefficients, three nodal values: the field is fixed by the nodes, and along each edge it is linear and depends only on the two nodes of that edge, so neighbouring triangles stay joined — the mesh is **conforming**.

::: proposition The constant-strain triangle (CST) {#prop-cst}
Let a triangle have nodes 1, 2, 3 numbered anticlockwise at $(x_i, y_i)$, area
$$
A = \tfrac12\left[(x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1)\right],
$$
and define, with $(i, j, k)$ a cyclic permutation of $(1, 2, 3)$,
$$
b_i = y_j - y_k, \qquad c_i = x_k - x_j.
$$
The linear shape functions are $N_i = (a_i + b_ix + c_iy)/(2A)$ with $a_i = x_jy_k - x_ky_j$, and with $\mathbf{d}^{(e)} = [u_1, v_1, u_2, v_2, u_3, v_3]^{\mathsf T}$,
$$
\mathbf{B} = \frac{1}{2A}\begin{bmatrix} b_1 & 0 & b_2 & 0 & b_3 & 0 \\ 0 & c_1 & 0 & c_2 & 0 & c_3 \\ c_1 & b_1 & c_2 & b_2 & c_3 & b_3 \end{bmatrix}, \qquad \mathbf{k}^{(e)} = t\,A\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}.
$$ {#eq-cst}
:::

::: proof
$N_i$ must be linear, equal to 1 at node $i$ and 0 at nodes $j$ and $k$. The function $(a_i + b_ix + c_iy)$ vanishes at node $j$: $x_jy_k - x_ky_j + (y_j - y_k)x_j + (x_k - x_j)y_j = 0$, and likewise at node $k$; at node $i$ it equals twice the signed area of the triangle (expand the $3\times3$ determinant with rows $[1, x, y]$), so dividing by $2A$ gives 1. Then $\partial N_i/\partial x = b_i/(2A)$ and $\partial N_i/\partial y = c_i/(2A)$ are constants, and inserting $u = \sum N_iu_i$, $v = \sum N_iv_i$ in [[#eq-strain]] gives $\mathbf{B}$. Because $\mathbf{B}$ and $\mathbf{D}$ are constant over the element, the integral in [[#eq-kgeneral]] is $tA\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$. If the nodes are numbered clockwise, $A$ comes out negative — a common source of nonsense, checked for by codes.
:::

The shape functions $N_i$ of the triangle are its **area coordinates**: $N_1$ at a point $P$ equals the area of the sub-triangle $P23$ divided by $A$. They sum to one everywhere ($N_1 + N_2 + N_3 = 1$), which is what lets the element translate rigidly, and $\sum N_ix_i = x$, $\sum N_iy_i = y$, which lets it reproduce any linear field — in particular any state of constant strain. The price is that the strain is *only* constant: a CST cannot represent a strain gradient, so in regions where stress varies (bending, concentrations) a fine mesh is needed.

::: example Stiffness of a right triangle {#ex-cst-k}
A CST has nodes 1 $(0, 0)$, 2 $(40, 0)$, 3 $(0, 30)\,\mathrm{mm}$, thickness $t = 10\,\mathrm{mm}$, and is steel in plane stress, $E = 200\,\mathrm{GPa}$, $\nu = 0.3$. Compute $\mathbf{B}$ and $\mathbf{k}^{(e)}$ and check that a small rigid rotation produces no nodal forces.
::: solution
$A = \tfrac12(40 \times 30 - 0) = 600\,\mathrm{mm^2}$. Coefficients: $b_1 = y_2 - y_3 = -30$, $b_2 = y_3 - y_1 = 30$, $b_3 = y_1 - y_2 = 0$; $c_1 = x_3 - x_2 = -40$, $c_2 = x_1 - x_3 = 0$, $c_3 = x_2 - x_1 = 40$ (mm). So
$$
\mathbf{B} = \frac{1}{1200}\begin{bmatrix} -30 & 0 & 30 & 0 & 0 & 0 \\ 0 & -40 & 0 & 0 & 0 & 40 \\ -40 & -30 & 0 & 30 & 40 & 0 \end{bmatrix}\ \mathrm{mm^{-1}}.
$$
$\mathbf{D} = \frac{200\,000}{0.91}[1, 0.3, 0; 0.3, 1, 0; 0, 0, 0.35] = [219\,780, 65\,934, 0;\ 65\,934, 219\,780, 0;\ 0, 0, 76\,923]\,\mathrm{MPa}$. Multiplying out $tA\,\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$ (in kN/mm):
$$
\mathbf{k}^{(e)} = \begin{bmatrix} 1337.0 & 714.3 & -824.2 & -384.6 & -512.8 & -329.7 \\ 714.3 & 1753.7 & -329.7 & -288.5 & -384.6 & -1465.2 \\ -824.2 & -329.7 & 824.2 & 0 & 0 & 329.7 \\ -384.6 & -288.5 & 0 & 288.5 & 384.6 & 0 \\ -512.8 & -384.6 & 0 & 384.6 & 512.8 & 0 \\ -329.7 & -1465.2 & 329.7 & 0 & 0 & 1465.2 \end{bmatrix}.
$$
For example $k_{33} = tA\,(b_2/2A)^2D_{11} + tA(c_2/2A)^2D_{33} = 6000 \times (1/40)^2 \times 219\,780 = 824.2\,\mathrm{kN/mm}$.

*Checks.* The matrix is symmetric. The $x$ entries of each row ($k_{r1} + k_{r3} + k_{r5}$) sum to zero, and so do the $y$ entries: a rigid translation produces no force. A small rotation $\omega$ about the origin moves node $i$ by $(-\omega y_i, \omega x_i)$, i.e. $\mathbf{d} = \omega[0, 0, 0, 40, -30, 0]^{\mathsf T}$; then $\mathbf{B}\mathbf{d} = \tfrac{\omega}{1200}[0, 0, 30 \cdot 40 - 40 \cdot 30] = \mathbf{0}$, so no strain and no force. Three zero-energy modes (two translations, one rotation) are exactly the rigid-body motions of a plane body; a fourth would signal an error.
:::
:::

::: example Stresses from nodal displacements {#ex-cst-stress}
In a model, the triangle of [[#ex-cst-k]] has nodal displacements $u_1 = v_1 = 0$, $u_2 = 0.012\,\mathrm{mm}$, $v_2 = 0$, $u_3 = 0$, $v_3 = -0.003\,\mathrm{mm}$. Find the strains and stresses in plane stress and in plane strain, and the von Mises stress for plane stress.
::: solution
$\boldsymbol{\varepsilon} = \mathbf{B}\mathbf{d}$:
$$
\varepsilon_x = \frac{30 \times 0.012}{1200} = 3.0\times10^{-4}, \quad \varepsilon_y = \frac{40 \times (-0.003)}{1200} = -1.0\times10^{-4}, \quad \gamma_{xy} = \frac{30 \times 0 + 40 \times 0}{1200} = 0.
$$
Plane stress: $\sigma_x = 219\,780(3\times10^{-4}) + 65\,934(-1\times10^{-4}) = 59.3\,\mathrm{MPa}$, $\sigma_y = 65\,934(3\times10^{-4}) + 219\,780(-1\times10^{-4}) = -2.2\,\mathrm{MPa}$, $\tau_{xy} = 0$. Von Mises: $\sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} = 60.5\,\mathrm{MPa}$.

Plane strain, with $E/[(1 + \nu)(1 - 2\nu)] = 384\,615\,\mathrm{MPa}$: $\sigma_x = 384\,615(0.7 \times 3 - 0.3 \times 1)\times10^{-4} = 69.2\,\mathrm{MPa}$, $\sigma_y = 384\,615(0.3 \times 3 - 0.7 \times 1)\times10^{-4} = 7.7\,\mathrm{MPa}$, and $\sigma_z = 0.3(69.2 + 7.7) = 23.1\,\mathrm{MPa}$.

*Check.* The same strains need larger stresses in plane strain, because the material is prevented from contracting in $z$; the out-of-plane stress is substantial and must be included in a yield check. The strain is the same at every point of the element, and the computed stress is the element's single value — usually reported at the centroid.
:::
:::

## The bilinear quadrilateral

Triangles fit any shape but are stiff and dull. The four-node quadrilateral is the workhorse of plane analysis. We take it first as a rectangle of width $2a$ and height $2b$, with **local coordinates** $\xi = (x - x_c)/a$ and $\eta = (y - y_c)/b$ running from $-1$ to $1$; the general quadrilateral needs the mapping of [[finite-element-method/isoparametric-elements]].

::: definition The bilinear quadrilateral (Q4) {#def-q4}
With nodes 1 to 4 at $(\xi, \eta) = (-1, -1), (1, -1), (1, 1), (-1, 1)$, the **bilinear shape functions** are
$$
N_i(\xi, \eta) = \tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta), \qquad i = 1, \dots, 4,
$$
so that $u = \sum N_iu_i = \alpha_1 + \alpha_2\xi + \alpha_3\eta + \alpha_4\xi\eta$ and likewise for $v$. The strain matrix $\mathbf{B}$ is built from $\partial N_i/\partial x = a^{-1}\partial N_i/\partial\xi$ and $\partial N_i/\partial y = b^{-1}\partial N_i/\partial\eta$ in the pattern of [[#eq-cst]], and $\mathbf{k}^{(e)} = \int_{-1}^{1}\int_{-1}^{1}\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,ab\,d\xi\,d\eta$ ($8\times8$).
:::

Along any edge one of $\xi, \eta$ is fixed, so the field is linear along edges and the element is conforming with its neighbours and with CSTs. Inside, the extra term $\xi\eta$ makes $\varepsilon_x = \partial u/\partial x$ vary linearly with $y$ — exactly what bending requires. The integrand of $\mathbf{k}^{(e)}$ is a polynomial of degree at most two in each of $\xi$ and $\eta$, so a $2\times2$ Gauss rule integrates it exactly for a rectangle.

::: widget surface
f: (1+x)*(1+y)/4
x: -1, 1
y: -1, 1
contours: true
caption: The bilinear shape function $N_3 = \tfrac14(1 + \xi)(1 + \eta)$ of the Q4 element over its square $-1 \le \xi, \eta \le 1$ (drawn with $x = \xi$, $y = \eta$). Rotate the view: the surface is a twisted plane (a hyperbolic paraboloid) — straight along every line of constant $\xi$ or $\eta$, so the field is linear along each edge and matches its neighbour, but curved along the diagonals. The level curves are hyperbolas, not straight lines, which is the $\xi\eta$ term at work.
:::

## Consistent loads on edges

Surface tractions are converted to nodal forces by the boundary integral in [[#eq-kgeneral]]. On an edge of length $\ell$ of a linear element only the two end nodes have non-zero shape functions, which are linear along the edge, so the integrals are the one-dimensional ones of [[finite-element-method/weak-forms]]: a uniform traction $q$ (stress units) gives $q\,t\,\ell/2$ at each end node, and a traction varying linearly from $q_i$ to $q_j$ gives $\tfrac{t\ell}{6}(2q_i + q_j)$ and $\tfrac{t\ell}{6}(q_i + 2q_j)$. For a quadratic edge (three nodes, as in the eight-node element) a uniform traction is distributed $\tfrac16 : \tfrac23 : \tfrac16$ — not equally, a fact that surprises people who split loads by intuition. Body forces such as self-weight are distributed as $\int\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA$; for a CST the integral of each $N_i$ over the triangle is $A/3$, so each node receives a third of the element's weight.

::: example Pressure on a quadrilateral edge {#ex-edge}
A Q4 edge $60\,\mathrm{mm}$ long in a plate $10\,\mathrm{mm}$ thick carries (a) a uniform normal pressure of $5\,\mathrm{MPa}$; (b) a normal traction varying linearly from 0 at node $i$ to $6\,\mathrm{MPa}$ at node $j$. Find the consistent nodal forces.
::: solution
(a) Resultant $5 \times 60 \times 10 = 3000\,\mathrm{N}$; each node receives $1500\,\mathrm{N}$, directed along the inward normal.

(b) $\tfrac{t\ell}{6} = 100\,\mathrm{mm^2}$, so $f_i = 100(2 \times 0 + 6) = 600\,\mathrm{N}$ and $f_j = 100(0 + 2 \times 6) = 1200\,\mathrm{N}$. Resultant $1800\,\mathrm{N} = \tfrac12 \times 6 \times 60 \times 10$.

*Check.* The forces sum to the resultant, and in (b) their moment about node $i$ is $1200 \times 60 = 72\,000\,\mathrm{N\,mm}$, equal to the resultant times its lever arm, $1800 \times 40$: consistent loads preserve both the force and the moment of the traction.
:::
:::

## Bending: parasitic shear

Put a single Q4 rectangle into pure bending: apply equal and opposite horizontal forces at the top and bottom of one end. The exact solution has $u$ proportional to $xy$ and no shear strain. The Q4 can represent $u = \alpha\,\xi\eta$, and that mode gives the right linear variation of $\varepsilon_x$. But it also gives $\gamma_{xy} = \partial u/\partial y = \alpha\xi/b$ — a shear strain that is zero only on the element's centre line and grows towards its ends. The real beam has no shear here; the element manufactures it.

::: proposition Pure bending of a rectangular Q4 element {#prop-parasitic}
A rectangular Q4 element of length $2a$, height $2b$, in plane stress with Poisson's ratio $\nu$, subjected to pure bending by end couples, rotates by
$$
\frac{\theta_{Q4}}{\theta_{\text{exact}}} = \frac{1 - \nu^2}{1 + \tfrac{1 - \nu}{2}\left(\tfrac{a}{b}\right)^2}
$$
of the exact (beam-theory) rotation, when its $\mathbf{k}^{(e)}$ is integrated exactly (or by $2\times2$ Gauss).
:::

::: proof
Under a couple the element deforms in the mode $u = \alpha\,\xi\eta = \alpha\,xy/(ab)$, $v = 0$ (by symmetry no other mode is excited), with $\varepsilon_x = \alpha y/(ab)$, $\varepsilon_y = 0$, $\gamma_{xy} = \alpha x/(ab)$. Its strain energy, using $\mathbf{D}_{\text{plane stress}}$ and $\int\!\!\int y^2\,dA = \tfrac43ab^3$, $\int\!\!\int x^2\,dA = \tfrac43a^3b$, is
$$
U_{Q4} = \frac{t\alpha^2}{2a^2b^2}\left[\frac{E}{1 - \nu^2}\cdot\frac43ab^3 + G\cdot\frac43a^3b\right] = \frac{2t\alpha^2}{3ab}\left[\frac{Eb^2}{1 - \nu^2} + Ga^2\right].
$$
In the exact solution the same end displacements produce $\varepsilon_x = \alpha y/(ab)$ with $\sigma_y = 0$ (so $\varepsilon_y = -\nu\varepsilon_x$ is free to occur) and no shear: $U_{\text{exact}} = \tfrac12\int E\varepsilon_x^2\,t\,dA = \frac{2t\alpha^2}{3ab}Eb^2$. For the same couple, rotations are inversely proportional to the mode stiffnesses, i.e. $\theta_{Q4}/\theta_{\text{exact}} = U_{\text{exact}}/U_{Q4}$; with $G/E = 1/[2(1 + \nu)]$ this is the stated ratio. Two effects make the element too stiff: the factor $1 - \nu^2$, because the element cannot contract laterally ($\varepsilon_y = 0$), and the parasitic shear energy, which grows with the square of the aspect ratio $a/b$.
:::

For a square element with $\nu = 0.3$ the ratio is $0.674$; for an element twice as long as it is high, $0.379$; four times as long, $0.138$. This is **shear locking**: elongated Q4 elements in a bending-dominated region are disastrously stiff, and CSTs, which cannot represent a strain gradient at all, are worse. Remedies — reduced integration, incompatible modes, assumed-strain formulations and quadratic elements — are taken up in [[finite-element-method/isoparametric-elements]] and [[finite-element-method/convergence-meshing]].

::: widget plot
f: (1-nu^2)/(1+(1-nu)/2*x^2)
x: 0.25, 6
y: 0, 1
sliders: nu=0.3:0:0.49:0.01
labels: \theta_{Q4}/\theta_\text{exact}
points: 1,0.6741; 2,0.3792; 4,0.1379
caption: Rotation of a single Q4 rectangle in pure bending as a fraction of the exact value, against the aspect ratio $a/b$ (length over height). The marked points are for $\nu = 0.3$. Even a square element is a third too stiff, and the stiffness error grows with the square of the aspect ratio. Change $\nu$: the curve hardly moves — the problem is the parasitic shear, not the material.
:::

::: example A cantilever with triangles and quadrilaterals {#ex-cantilever}
A steel cantilever plate ($E = 200\,\mathrm{GPa}$, $\nu = 0.3$, plane stress) is $1000\,\mathrm{mm}$ long, $100\,\mathrm{mm}$ deep and $10\,\mathrm{mm}$ thick, fully fixed along its left edge, with a $10\,\mathrm{kN}$ downward end load distributed parabolically over the right edge (as the shear stress of beam theory). It is meshed with square elements, $n_x \times n_y$ Q4 elements or the same squares each split into two CSTs. Compare the tip deflections with beam theory.
::: solution
*Reference.* $I = th^3/12 = 8.333\times10^{5}\,\mathrm{mm^4}$; Euler–Bernoulli $PL^3/(3EI) = 20.00\,\mathrm{mm}$; with Timoshenko's shear correction $PL/(\kappa GA)$, $\kappa = 5/6$, $G = 76.9\,\mathrm{GPa}$, the total is $20.16\,\mathrm{mm}$.

*Finite element results* (average vertical displacement of the loaded edge, computed with a short program):

| mesh $n_x \times n_y$ | DOFs (total) | CST (mm) | ratio | Q4 (mm) | ratio |
|---|---|---|---|---|---|
| $10 \times 1$ | 44 | 4.62 | 0.229 | 13.58 | 0.674 |
| $20 \times 2$ | 126 | 10.83 | 0.537 | 17.91 | 0.888 |
| $40 \times 4$ | 410 | 16.54 | 0.820 | 19.50 | 0.968 |
| $80 \times 8$ | 1458 | 19.08 | 0.947 | 19.96 | 0.990 |

*Interpretation.* With one layer of square Q4 elements the ratio is $0.674$ — exactly the single-element prediction of [[#prop-parasitic]], because each element sees nearly pure bending. Each halving of the element size cuts the Q4 error by roughly a factor of three to four; the CST error falls slowly at first (77 % to 46 %) and reaches a similar rate only on fine meshes. A model with one or two elements through the depth of a bending member is not a coarse model; it is a wrong one. The CST mesh needs 1458 DOFs to approach 5 % accuracy, a result that the beam element of [[finite-element-method/trusses-frames]] gets exactly with 2 DOFs.
:::
:::

::: warning Plane stress or plane strain, and what thickness?
Two input errors are common and invisible in the output. **The wrong idealisation**: a thick, long component analysed in plane stress is too flexible and its out-of-plane stress $\sigma_z = \nu(\sigma_x + \sigma_y)$, which may matter for yielding or fracture, is missed; a thin plate analysed in plane strain is too stiff. **The thickness**: in plane stress $t$ multiplies every stiffness and load; codes that ask for "thickness" in plane strain usually use it only to scale the loads per unit length, and a model with $t = 1$ reports forces per unit thickness. Confirm the reaction totals against hand statics — with the thickness included — before reading any stress.
:::

## Assembling and reading two-dimensional results

Assembly is exactly the procedure of [[finite-element-method/direct-stiffness]], now with two DOFs per node: element entry $(2a - 1, 2b)$ goes to global entry $(2I - 1, 2J)$, and so on. Supports remove at least three rigid-body motions of a plane body — for example both DOFs at one node and one DOF at another, not in line. Results come out as nodal displacements and element stresses at sampling points. Because CST and Q4 strains are discontinuous between elements, plotted contours are usually **averaged** at the nodes, which makes them smooth but hides the size of the jumps; the difference between averaged and unaveraged stresses is a cheap and useful indicator of discretisation error, developed in [[finite-element-method/convergence-meshing]].

::: quiz
A thin bracket is meshed with one layer of long, thin Q4 elements along an arm that carries a bending load. The model predicts a deflection 40 % lower than a beam calculation. What is the most likely explanation?
- [ ] The beam calculation neglects shear deformation, which makes it too stiff.
- [x] The elements lock in shear: a coarse layer of elongated Q4 elements develops parasitic shear strain in bending and is far too stiff.
- [ ] The bracket should have been modelled in plane strain.
- [ ] Q4 elements are too flexible in bending, so the beam calculation must be wrong.
::: solution
Neglecting shear deformation makes a beam calculation under-predict the deflection slightly — the opposite of what is observed — and the effect is small for slender arms. Plane strain would make the model stiffer still. A single layer of elongated Q4 elements in bending is the textbook case of parasitic shear ([[#prop-parasitic]]): use several elements through the depth, near-square shapes, or elements formulated to avoid locking.
:::
:::

::: history
The constant-strain triangle has two independent origins. The 1956 paper of Turner, Clough, Martin and Topp derived it, alongside rectangular elements, for the skin panels of a delta wing, by assuming a linear displacement field inside each triangle. In 1960 Ray Clough derived it again by virtual work for general plane-stress problems in "The finite element method in plane stress analysis", presented at the 2nd ASCE Conference on Electronic Computation in Pittsburgh — the paper that gave the method its name. Clough and his Berkeley group then applied it to concrete dams, among the first large continuum analyses. The weakness of low-order elements in bending was recognised almost at once, and much of the element research of the following decades — incompatible modes, reduced integration, assumed strains — was aimed at curing it.
:::

::: summary
- Plane stress ($\sigma_z = 0$, thin plates) and plane strain ($\varepsilon_z = 0$, long bodies) share the strain vector $[\varepsilon_x, \varepsilon_y, \gamma_{xy}]$ but have different $\mathbf{D}$; in plane strain $\sigma_z = \nu(\sigma_x + \sigma_y)$.
- Every element follows from virtual work: $\mathbf{k}^{(e)} = \int\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}\,t\,dA$, $\mathbf{f}^{(e)} = \int\mathbf{N}^{\mathsf T}\mathbf{b}\,t\,dA + \int\mathbf{N}^{\mathsf T}\mathbf{q}\,t\,ds$.
- The CST has linear displacements and constant strain; $\mathbf{B}$ is built from $b_i = y_j - y_k$, $c_i = x_k - x_j$ and $\mathbf{k} = tA\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$. Its three zero-energy modes are the rigid-body motions.
- The Q4 has bilinear shape functions $\tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta)$, linear along edges, with strains that vary inside the element.
- Consistent edge loads: uniform traction $\tfrac12 qt\ell$ per node for linear edges, $\tfrac16 : \tfrac23 : \tfrac16$ for quadratic edges.
- In bending, Q4 elements develop parasitic shear and lock: a rectangle rotates only $(1 - \nu^2)/[1 + \tfrac{1 - \nu}{2}(a/b)^2]$ of the exact amount; CSTs are worse. Use several elements through the depth.
:::

## Exercises

::: exercise Area of a triangle {level=1 check="1200"}
A CST has nodes at $(0, 0)$, $(60, 0)$ and $(20, 40)\,\mathrm{mm}$. Compute $b_i$, $c_i$ and the area. (Enter $A$ in mm².)
::: solution
$b_1 = 0 - 40 = -40$, $b_2 = 40 - 0 = 40$, $b_3 = 0 - 0 = 0$; $c_1 = 20 - 60 = -40$, $c_2 = 0 - 20 = -20$, $c_3 = 60 - 0 = 60$. $A = \tfrac12(60 \times 40 - 20 \times 0) = 1200\,\mathrm{mm^2}$. Check: $\sum b_i = \sum c_i = 0$, and $2A = b_2c_3 - b_3c_2 = 40 \times 60 = 2400$.
:::
:::

::: exercise Out-of-plane stress in plane strain {level=1 check="42"}
A plane-strain analysis of a long steel tunnel lining ($\nu = 0.3$) gives $\sigma_x = 100\,\mathrm{MPa}$ and $\sigma_y = 40\,\mathrm{MPa}$ at a point. What is $\sigma_z$? (Enter it in MPa.)
::: solution
$\sigma_z = \nu(\sigma_x + \sigma_y) = 0.3 \times 140 = 42\,\mathrm{MPa}$.
:::
:::

::: exercise Nodal forces from a uniform traction {level=1 check="400"}
A uniform shear traction of $2\,\mathrm{MPa}$ acts along a $50\,\mathrm{mm}$ edge of a Q4 element in a plate $8\,\mathrm{mm}$ thick. What tangential force goes to each of the two edge nodes? (Enter it in N.)
::: solution
Resultant $2 \times 50 \times 8 = 800\,\mathrm{N}$; each node receives $400\,\mathrm{N}$ along the edge.
:::
:::

::: exercise Shear stress in a triangle {level=2 check="76.92"}
The triangle of [[#ex-cst-k]] has nodal displacements $u_1 = v_1 = 0$, $u_2 = 0$, $v_2 = 0.020\,\mathrm{mm}$, $u_3 = 0.015\,\mathrm{mm}$, $v_3 = 0$. Find $\varepsilon_x$, $\varepsilon_y$, $\gamma_{xy}$ and the shear stress. (Enter $\tau_{xy}$ in MPa.)
::: solution
From $\mathbf{B}$: $\varepsilon_x = (30u_2)/1200 = 0$; $\varepsilon_y = (-40v_1 + 40v_3)/1200 = 0$; $\gamma_{xy} = (-40u_1 - 30v_1 + 30v_2 + 40u_3)/1200 = (0.60 + 0.60)/1200 = 1.0\times10^{-3}$. $\tau_{xy} = G\gamma_{xy} = 76\,923 \times 10^{-3} = 76.92\,\mathrm{MPa}$. The displacement field $u = 0.015y/30$, $v = 0.020x/40$ is a pure shear (each side rotates by $5\times10^{-4}$ in opposite senses).
:::
:::

::: exercise An elongated element in bending {level=2 check="0.37917"}
Using [[#prop-parasitic]], what fraction of the exact rotation does a single Q4 rectangle twice as long as it is high ($a/b = 2$) give in pure bending, with $\nu = 0.3$? (Enter the ratio.)
::: solution
$(1 - 0.09)/(1 + 0.35 \times 4) = 0.91/2.4 = 0.3792$. The element is 2.6 times too stiff.
:::
:::

::: exercise A hydrostatic load {level=2 check="1200"}
The vertical edge of a Q4 element in the wall of a small pressurised plate model (plane stress, thickness $10\,\mathrm{mm}$) is $60\,\mathrm{mm}$ long and carries a fluid pressure rising linearly from 0 at the upper node $i$ to $6\,\mathrm{MPa}$ at the lower node $j$. Find the consistent nodal force at node $j$. (Enter it in N.)
::: solution
With $t\ell/6 = 10 \times 60/6 = 100\,\mathrm{mm^2}$: $f_j = 100(q_i + 2q_j) = 100 \times 12 = 1200\,\mathrm{N}$ and $f_i = 100(2q_i + q_j) = 600\,\mathrm{N}$. Splitting the resultant $1800\,\mathrm{N}$ equally would put $900\,\mathrm{N}$ on each node and misplace its line of action by $10\,\mathrm{mm}$.
:::
:::

::: exercise The plane-stress matrix {level=3}
Derive $\mathbf{D}_{\text{plane stress}}$ from three-dimensional Hooke's law and show that it is positive definite exactly when $-1 < \nu < 1$. Then derive $\mathbf{D}_{\text{plane strain}}$ and explain physically why its entries grow without bound as $\nu \to \tfrac12$ while those of $\mathbf{D}_{\text{plane stress}}$ do not.
::: solution
Following the proof of [[#prop-D]]: with $\sigma_z = 0$, $\begin{bmatrix}\varepsilon_x \\ \varepsilon_y\end{bmatrix} = \frac1E\begin{bmatrix} 1 & -\nu \\ -\nu & 1\end{bmatrix}\begin{bmatrix}\sigma_x \\ \sigma_y\end{bmatrix}$, and inverting the $2\times2$ matrix gives $\frac{E}{1 - \nu^2}[1, \nu; \nu, 1]$. Its eigenvalues are $E/(1 - \nu)$ and $E/(1 + \nu)$, positive for $-1 < \nu < 1$, and the shear entry $G = E/[2(1 + \nu)] > 0$ needs $\nu > -1$. In plane strain, $\varepsilon_z = 0$ forces $\sigma_z = \nu(\sigma_x + \sigma_y)$, and the in-plane matrix has eigenvalue (for equal biaxial strain) $E/[(1 + \nu)(1 - 2\nu)]$, which is twice the plane-strain bulk modulus $K + G/3$ and becomes infinite at $\nu = \tfrac12$. Physically, a plane-strain body that cannot change volume and cannot expand in $z$ cannot accommodate an in-plane area change at all; a plane-stress plate can always thicken or thin, so its in-plane stiffness stays finite.
:::
:::

::: exercise Rigid-body modes and supports {level=3}
(a) Show that a single CST has exactly three independent zero-energy displacement modes. (b) A plane model of a bracket is supported by fixing both DOFs of one node and the $x$ DOF of a second node directly above it. Is it properly supported? (c) Propose a support arrangement that removes rigid-body motion without introducing artificial stress for a plate loaded by self-equilibrated forces (for example two equal and opposite pulls), and explain why.
::: solution
(a) $\mathbf{B}$ is $3 \times 6$ with rank 3 (its rows are independent when $A \neq 0$), so its null space has dimension 3, and $\mathbf{k} = tA\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$ has the same null space because $\mathbf{D}$ is positive definite. The two translations and the rigid rotation lie in it and are independent, so they span it. (b) No: fixing a node removes both translations, and the second constraint must prevent rotation about the fixed node. A rotation about the fixed node moves a node directly above it horizontally, so constraining its $x$ DOF does prevent rotation — the model *is* supported. Had the second constraint been the $y$ DOF of a node directly above, it would not (rotation moves that node only in $x$ to first order). (c) For self-equilibrated loads use the minimum "3-2-1" set in 2-D: fix $u$ and $v$ at one node and one DOF at a second node chosen so that it prevents rotation (as in (b)). These three constraints are statically determinate, so their reactions are zero when the loads balance; any additional constraint would be redundant and would induce reactions and spurious stresses. Checking that the computed reactions are (nearly) zero confirms that the loads indeed balance.
:::
:::

::: exercise Choosing a mesh for a bracket {level=3}
A steel L-bracket, $8\,\mathrm{mm}$ thick, has arms $120\,\mathrm{mm}$ long and $30\,\mathrm{mm}$ wide, with an inside corner fillet of radius $5\,\mathrm{mm}$; it is bolted at one arm and loaded at the end of the other. You must estimate the peak stress at the fillet and the deflection of the loaded end. Decide on the idealisation, the element type, and a mesh strategy, and say how you would check that your answers are adequate. Use the cantilever table of [[#ex-cantilever]] to justify the number of elements through the arm width.
::: solution
A plate 8 mm thick loaded in its own plane is in plane stress. The arms are in bending, so the table argues for at least four (preferably eight) near-square Q4 elements through the 30 mm width to get the deflection within a few per cent, or quadratic elements with fewer. The fillet is a stress concentration with a radius of 5 mm, so elements there should be of order 1 mm or less (several elements along the quarter-circle arc), graded smoothly into the coarser arm mesh; triangles are convenient for the transition but should be avoided in the bending-dominated arms. The bolt region needs a deliberate idealisation (contact or a distributed constraint over the bolt-hole surface, not a single fixed node, which would create an artificial singularity). Checks: reactions equal the applied load; the deflection against a hand estimate treating each arm as a cantilever; the peak stress against a handbook stress-concentration factor for a filleted corner; and a refinement study — halve the element size near the fillet and confirm that the peak stress changes by only a few per cent. The result is an analysis estimate, not a design approval; the bracket must still be checked against the relevant design standard.
:::
:::
