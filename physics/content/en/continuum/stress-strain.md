Pull on a steel bar and it stretches a little; let go and it springs back. Push a spoon through honey and the honey flows round it. Both behaviours are described by the same two ideas. **Stress** says how the material on one side of an imaginary cut pushes on the material on the other side. **Strain** says how the shape of a small piece of material has changed. A solid is a continuum in which stress depends on strain; a fluid is one in which, as [[continuum/viscous-flow]] will show, stress depends on the *rate* of strain. This chapter builds the two objects with no assumption about the material at all.

Here is the question that forces the full machinery on us. A steel rod of diameter $12.0\,\mathrm{mm}$ carries a tension of $20.0\,\mathrm{kN}$. The force per unit area on a cross-section is $F/A$. But what is the force per unit area on a plane cut at $30^\circ$ to the cross-section? It has a normal part and a tangential part, and both depend on the orientation of the cut. A single number cannot hold that information. A vector cannot either, since the answer is a different vector for each plane. What can hold it is a linear map from the normal of the plane to the force on it: a second-rank tensor.

The tools are [[math-methods/vector-calculus|vector calculus]], the divergence theorem from [[math-methods/integral-theorems]] and Newton's second law from [[mechanics/newton-laws]]. Index notation with the summation convention is used throughout: a repeated index is summed from $1$ to $3$, so $\sigma_{ij}n_j$ means $\sum_j \sigma_{ij}n_j$. The pressure of the first-year chapter [[mechanics/fluids]] will reappear as the special case of a stress that pushes equally in all directions.

## The continuum hypothesis {#continuum}

Matter is made of atoms, but we do not want to follow $10^{23}$ of them. We want fields: a density $\rho(\mathbf x, t)$, a velocity $\mathbf v(\mathbf x, t)$, a displacement $\mathbf u(\mathbf x, t)$, defined at every point and differentiable.

::: definition Continuum fields {#def-continuum}
A material is treated as a **continuum** on a length scale $L$ when there is an intermediate scale $\ell$ with $a \ll \ell \ll L$, where $a$ is the microscopic scale (the interatomic spacing in a solid or liquid, the mean free path in a gas). A **material particle** at $\mathbf x$ is a volume of size $\ell^3$ centred on $\mathbf x$. Its density is the mass in it divided by $\ell^3$; its velocity is the momentum in it divided by its mass. These averages are, to good accuracy, independent of the precise $\ell$ chosen, and they define smooth fields.
:::

The separation of scales is easy to satisfy. Air at room conditions has about $2.5\times10^{25}$ molecules per cubic metre. A cube of side $1\,\mu\mathrm m$ contains $2.5\times10^{7}$ of them, so the relative statistical fluctuation of the count is about $1/\sqrt{2.5\times 10^7} = 2\times10^{-4}$. The mean free path is about $70\,\mathrm{nm}$. In water or steel the interatomic spacing is a few tenths of a nanometre, and a cube of side $1\,\mu\mathrm m$ holds some $10^{10}$ atoms. Continuum mechanics therefore works down to micrometres in liquids and solids, and it fails in a rarefied gas (the upper atmosphere, a vacuum pump) where the mean free path becomes comparable with the size of the container.

::: remark The continuum is a model, not a claim
Nothing in this course says that matter is continuous. It says that averages over material particles obey closed partial differential equations, with a few material constants — density, elastic moduli, viscosity — that summarise the microscopic physics. Computing those constants from atoms is the business of [[statistical-mechanics]] and [[condensed-matter]].
:::

## Body forces and surface forces {#forces}

Take any region $V$ inside the material, bounded by a surface $S$. The rest of the universe acts on the material in $V$ in two ways.

- **Body forces** act on every element of volume: gravity, or electromagnetic forces on a charged or magnetised medium. We write them as a force per unit volume $\mathbf f(\mathbf x)$, so the total is $\int_V \mathbf f\,\dd V$. For gravity $\mathbf f = \rho\mathbf g$.
- **Surface forces** are exerted across $S$ by the material just outside it. They come from intermolecular forces of very short range, and from the transport of momentum by molecules crossing $S$. Either way their effect is confined to a layer of molecular thickness at $S$, so on the continuum scale it is a force per unit area.

::: definition Traction {#def-traction}
Let $\dd A$ be a small element of surface at $\mathbf x$ with unit normal $\mathbf n$. The force exerted on the material on the side $\mathbf n$ points *away from* by the material on the side $\mathbf n$ points *towards* is $\mathbf t(\mathbf x, \mathbf n)\,\dd A$. The vector $\mathbf t(\mathbf x, \mathbf n)$ is the **traction** (or stress vector) on that element. Its component along $\mathbf n$, $\sigma_n = \mathbf t\cdot\mathbf n$, is the **normal stress**; positive $\sigma_n$ is tension. The rest, $\mathbf t - \sigma_n\mathbf n$, is the **shear stress** on the element.
:::

In words: $\mathbf t(\mathbf n)$ is the force per area that the outside exerts on the inside when $\mathbf n$ is the outward normal. The assumption that the surface force depends only on the position and the normal, and not on the curvature of the surface, is **Cauchy's stress principle**. It is justified by the short range of the forces.

Stress has the units of pressure, pascals. Engineers usually quote megapascals: $1\,\mathrm{MPa} = 1\,\mathrm{N/mm^2}$. A structural steel yields at about $250\,\mathrm{MPa}$; atmospheric pressure is $0.101\,\mathrm{MPa}$.

## Cauchy's theorem: stress is a tensor {#cauchy}

The traction is, a priori, an arbitrary function of the direction $\mathbf n$. Newton's second law, applied to very small pieces of material, forces it to be linear in $\mathbf n$. The argument uses the fact that surface forces scale with area, $\ell^2$, while inertia and body forces scale with volume, $\ell^3$. On a small enough piece the surface forces must balance among themselves.

::: lemma Action and reaction {#lem-action}
$\mathbf t(\mathbf x, -\mathbf n) = -\mathbf t(\mathbf x, \mathbf n)$.
:::

::: proof
Consider a thin flat slab of material centred on $\mathbf x$, with faces of area $A$ and normals $\pm\mathbf n$, and thickness $h$. Newton's second law for the slab is

$$
\mathbf t(\mathbf n)A + \mathbf t(-\mathbf n)A + (\text{forces on the edges}) + \int_{\text{slab}}(\mathbf f - \rho\mathbf a)\,\dd V = 0.
$$

The edge area and the volume are both proportional to $h$. Let $h \to 0$ with $A$ fixed, then divide by $A$ and let the slab shrink onto $\mathbf x$, using continuity of $\mathbf t$ in $\mathbf x$. What remains is $\mathbf t(\mathbf n) + \mathbf t(-\mathbf n) = 0$.
:::

::: theorem Cauchy's stress theorem {#thm-cauchy}
Suppose the traction is continuous in $\mathbf x$ and $\mathbf n$, and the body force and the acceleration are bounded. Then at each point there are nine numbers $\sigma_{ij}(\mathbf x)$ such that, for every unit vector $\mathbf n$,

$$
t_i(\mathbf x, \mathbf n) = \sigma_{ij}(\mathbf x)\,n_j .
$$ {#eq-cauchy}

The number $\sigma_{ij}$ is the $i$-component of the traction on a plane whose normal is the $j$-th coordinate axis: $\sigma_{ij} = t_i(\mathbf e_j)$.
:::

::: proof
Fix $\mathbf x$ and a unit vector $\mathbf n$ with all three components positive. Build a tetrahedron with its vertex at $\mathbf x$, three faces in the coordinate planes and a fourth face, of area $A$, with outward normal $\mathbf n$ at distance $h$ from $\mathbf x$. The face in the plane perpendicular to $\mathbf e_j$ is the projection of the slanted face onto that plane, so its area is $A_j = A n_j$, and its outward normal is $-\mathbf e_j$. The volume is $\frac13 hA$.

Newton's second law for the material in the tetrahedron reads

$$
\int_{A}\mathbf t(\mathbf n)\,\dd A + \sum_{j=1}^{3}\int_{A_j}\mathbf t(-\mathbf e_j)\,\dd A + \int_{V}(\mathbf f - \rho\mathbf a)\,\dd V = 0 .
$$

Divide by $A$ and let $h \to 0$ at fixed $\mathbf n$. The volume term is bounded by a constant times $hA/3$, so after division it vanishes in the limit. By continuity, each surface integral divided by $A$ tends to the traction at $\mathbf x$ times the area ratio:

$$
\mathbf t(\mathbf n) + \sum_j n_j\,\mathbf t(-\mathbf e_j) = 0 .
$$

By [[#lem-action]], $\mathbf t(-\mathbf e_j) = -\mathbf t(\mathbf e_j)$, hence $\mathbf t(\mathbf n) = \sum_j n_j\,\mathbf t(\mathbf e_j)$. Taking the $i$-component gives [[#eq-cauchy]] with $\sigma_{ij} = t_i(\mathbf e_j)$.

If some components of $\mathbf n$ are negative, use the tetrahedron whose coordinate faces have outward normals $-\operatorname{sgn}(n_j)\mathbf e_j$; the same argument with [[#lem-action]] gives the same formula. If some component is zero, the formula follows by continuity in $\mathbf n$.
:::

The nine numbers $\sigma_{ij}$ form the **Cauchy stress tensor** $\boldsymbol\sigma$. In matrix form $\mathbf t = \boldsymbol\sigma\mathbf n$. The diagonal entries $\sigma_{11}, \sigma_{22}, \sigma_{33}$ are normal stresses on the coordinate planes; the off-diagonal entries are shear stresses. Because $\mathbf t$ and $\mathbf n$ are vectors and the relation holds in every frame, the components transform under a rotation $R$ as $\sigma'_{ij} = R_{ik}R_{jl}\sigma_{kl}$, which is what makes $\boldsymbol\sigma$ a tensor rather than a mere table.

### The equation of motion

Newton's second law for a finite region $V$ now becomes a partial differential equation. The total surface force is $\oint_S \sigma_{ij}n_j\,\dd A$, and the divergence theorem turns it into $\int_V \partial_j\sigma_{ij}\,\dd V$.

::: theorem Cauchy's equation of motion {#thm-motion}
If $\boldsymbol\sigma$ is continuously differentiable, then at every point of the material

$$
\rho\,a_i = \pdv{\sigma_{ij}}{x_j} + f_i ,
$$ {#eq-motion}

where $\mathbf a$ is the acceleration of the material particle at that point. In equilibrium, $\partial_j\sigma_{ij} + f_i = 0$.
:::

::: proof
For any region $V$ moving with the material, the rate of change of momentum equals the total force:

$$
\int_V \rho\,a_i\,\dd V = \oint_S \sigma_{ij}n_j\,\dd A + \int_V f_i\,\dd V = \int_V\left(\pdv{\sigma_{ij}}{x_j} + f_i\right)\dd V .
$$

(That the left side is the rate of change of momentum of the region is a statement about moving volumes proved in [[continuum/fluid-kinematics]]; here we only need that each material particle has mass $\rho\,\dd V$ and acceleration $\mathbf a$.) The integrand $\rho a_i - \partial_j\sigma_{ij} - f_i$ is continuous and integrates to zero over every region. If it were positive at some point it would be positive on a small ball around it, and the integral over that ball would be positive. So it vanishes everywhere.
:::

The physical content of [[#eq-motion]] is that only the *variation* of stress accelerates material. A uniformly stressed bar, however large the stress, has $\partial_j\sigma_{ij} = 0$ and stays put.

### Symmetry of the stress tensor

Newton's second law is not the only balance law. The angular momentum of every piece of material must change at the rate set by the torques on it. This forces $\sigma_{ij} = \sigma_{ji}$, so only six of the nine components are independent.

::: theorem Symmetry of stress {#thm-symmetric}
If there are no body torques and no couple stresses (torques per unit area not arising from the moment of $\mathbf t$), then $\sigma_{ij} = \sigma_{ji}$.
:::

::: proof
The torque about the origin on a material region $V$ is $\oint_S \epsilon_{ijk}x_j t_k\,\dd A + \int_V \epsilon_{ijk}x_j f_k\,\dd V$, and the rate of change of its angular momentum is $\int_V \epsilon_{ijk}x_j\rho a_k\,\dd V$. Write $t_k = \sigma_{kl}n_l$ and use the divergence theorem:

$$
\oint_S \epsilon_{ijk}x_j\sigma_{kl}n_l\,\dd A = \int_V \epsilon_{ijk}\pdv{}{x_l}\bigl(x_j\sigma_{kl}\bigr)\dd V = \int_V \epsilon_{ijk}\bigl(\delta_{jl}\sigma_{kl} + x_j\partial_l\sigma_{kl}\bigr)\dd V .
$$

The angular momentum balance therefore reads

$$
\int_V \epsilon_{ijk}x_j\bigl(\rho a_k - \partial_l\sigma_{kl} - f_k\bigr)\dd V = \int_V \epsilon_{ijk}\sigma_{kj}\,\dd V .
$$

The left side vanishes by [[#eq-motion]]. So $\int_V\epsilon_{ijk}\sigma_{kj}\,\dd V = 0$ for every region, and by the argument at the end of the previous proof $\epsilon_{ijk}\sigma_{kj} = 0$ at every point. For $i = 3$ this is $\sigma_{21} - \sigma_{12} = 0$, and similarly for the other two components.
:::

::: intuition The little square
Draw a small square of side $\ell$ in the $xy$-plane. Shear stress $\sigma_{yx}$ on the two faces normal to $x$ makes a couple of size $\sigma_{yx}\ell^2\cdot\ell$ per unit depth; $\sigma_{xy}$ on the faces normal to $y$ makes an opposing couple $\sigma_{xy}\ell^3$. The moment of inertia of the square scales as $\ell^4$. If the couples did not cancel, the angular acceleration would grow like $1/\ell$ as the square shrinks, without bound. Shear stresses come in matched pairs on perpendicular faces.
:::

::: example Traction on an oblique plane {#ex-traction}
At a point in a loaded component the stress tensor, in megapascals, is

$$
\boldsymbol\sigma = \begin{pmatrix} 10 & 4 & 0 \\ 4 & -6 & 2 \\ 0 & 2 & 3\end{pmatrix}.
$$

Find the traction, the normal stress and the magnitude of the shear stress on the plane with unit normal $\mathbf n = \frac13(1, 2, 2)$.
::: solution
By [[#eq-cauchy]], $\mathbf t = \boldsymbol\sigma\mathbf n$:

$$
\mathbf t = \frac13\begin{pmatrix} 10 + 8 + 0 \\ 4 - 12 + 4 \\ 0 + 4 + 6\end{pmatrix} = \frac13\begin{pmatrix}18\\-4\\10\end{pmatrix} = \begin{pmatrix}6.00\\-1.33\\3.33\end{pmatrix}\mathrm{MPa}.
$$

The normal stress is

$$
\sigma_n = \mathbf t\cdot\mathbf n = \frac19(18 - 8 + 20) = \frac{30}{9} = 3.33\,\mathrm{MPa},
$$

a tension. The magnitude of the traction is $\abs{\mathbf t} = \frac13\sqrt{324 + 16 + 100} = \frac{\sqrt{440}}{3} = 6.99\,\mathrm{MPa}$, so the shear stress has magnitude

$$
\tau = \sqrt{\abs{\mathbf t}^2 - \sigma_n^2} = \sqrt{\frac{440}{9} - \frac{100}{9}} = \frac{\sqrt{340}}{3} = 6.15\,\mathrm{MPa}.
$$

The traction is far from parallel to $\mathbf n$: on this plane the material is mostly being sheared.
:::
:::

### Pressure is isotropic stress

In a fluid at rest there are no shear stresses, because a fluid by definition cannot resist shear in equilibrium. Then on every plane $\mathbf t = -p\,\mathbf n$ for some $p$. [[#exr-isotropic]] shows that this forces $\sigma_{ij} = -p\,\delta_{ij}$ with the same $p$ for every orientation: Pascal's law of [[mechanics/fluids]] is a theorem about tensors. For a general stress we *define* the mean pressure as

$$
p = -\tfrac13\sigma_{kk} = -\tfrac13(\sigma_{11} + \sigma_{22} + \sigma_{33}),
$$ {#eq-pressure}

and split $\sigma_{ij} = -p\,\delta_{ij} + s_{ij}$, where the **deviatoric stress** $s_{ij}$ has zero trace. The trace of a tensor is unchanged by rotations, so $p$ is the same in every frame. The deviatoric part is what changes shape; the pressure is what changes volume.

## Principal stresses {#principal}

Because $\boldsymbol\sigma$ is a real symmetric matrix, the spectral theorem of linear algebra applies (see the Maths Atlas lesson [The spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)). There is an orthonormal basis of eigenvectors, and in that basis the stress tensor is diagonal.

::: theorem Principal stresses {#thm-principal}
At every point there are three mutually perpendicular directions $\mathbf n^{(1)}, \mathbf n^{(2)}, \mathbf n^{(3)}$, the **principal axes**, on whose planes the traction is purely normal: $\boldsymbol\sigma\mathbf n^{(k)} = \sigma_k\mathbf n^{(k)}$. The real numbers $\sigma_1 \ge \sigma_2 \ge \sigma_3$ are the **principal stresses**. They are the roots of

$$
\det(\boldsymbol\sigma - \lambda I) = -\lambda^3 + I_1\lambda^2 - I_2\lambda + I_3 = 0,
$$

with the **invariants** $I_1 = \sigma_{kk}$, $I_2 = \frac12(\sigma_{ii}\sigma_{jj} - \sigma_{ij}\sigma_{ij})$ and $I_3 = \det\boldsymbol\sigma$. The largest and smallest normal stress over all planes through the point are $\sigma_1$ and $\sigma_3$, and the largest shear stress is $\frac12(\sigma_1 - \sigma_3)$, on the planes at $45^\circ$ to the first and third axes.
:::

::: proof
The existence of a real orthonormal eigenbasis is the spectral theorem for real symmetric matrices, and the characteristic polynomial written out gives the invariants. In the principal basis, a unit normal $\mathbf n = (n_1, n_2, n_3)$ carries traction $(\sigma_1 n_1, \sigma_2 n_2, \sigma_3 n_3)$, so

$$
\sigma_n = \sigma_1 n_1^2 + \sigma_2 n_2^2 + \sigma_3 n_3^2 .
$$

The weights $n_k^2$ are non-negative and sum to $1$, so $\sigma_n$ is a weighted average of the principal stresses and lies between $\sigma_3$ and $\sigma_1$, with the extremes attained at $\mathbf n = \mathbf n^{(1)}$ and $\mathbf n^{(3)}$.

For the shear, $\tau^2 = \abs{\mathbf t}^2 - \sigma_n^2 = \sum_k\sigma_k^2 n_k^2 - \bigl(\sum_k \sigma_k n_k^2\bigr)^2$. This is the variance of a random variable taking value $\sigma_k$ with probability $n_k^2$. A variable confined to $[\sigma_3, \sigma_1]$ has variance at most $\frac14(\sigma_1 - \sigma_3)^2$, attained only by putting probability $\frac12$ at each end. So $\tau \le \frac12(\sigma_1 - \sigma_3)$, with equality for $n_1^2 = n_3^2 = \frac12$, $n_2 = 0$: the normals at $45^\circ$ between the first and third principal axes.
:::

In plane problems, where one principal direction is known to be $z$, the rotation of the other two is a one-parameter family. Rotate the axes by an angle $\theta$ about $z$. The normal stress and shear stress on the plane whose normal makes angle $\theta$ with $x$ are

$$
\begin{aligned}
\sigma_n(\theta) &= \frac{\sigma_{xx} + \sigma_{yy}}{2} + \frac{\sigma_{xx} - \sigma_{yy}}{2}\cos 2\theta + \sigma_{xy}\sin 2\theta, \\
\tau(\theta) &= -\frac{\sigma_{xx} - \sigma_{yy}}{2}\sin 2\theta + \sigma_{xy}\cos 2\theta .
\end{aligned}
$$ {#eq-rotation}

These follow from $\sigma_n = \mathbf n\cdot\boldsymbol\sigma\mathbf n$ and $\tau = \mathbf m\cdot\boldsymbol\sigma\mathbf n$ with $\mathbf n = (\cos\theta, \sin\theta)$, $\mathbf m = (-\sin\theta, \cos\theta)$ and the double-angle formulae. As $\theta$ varies, the point $(\sigma_n, \tau)$ runs round a circle of centre $\frac12(\sigma_{xx} + \sigma_{yy})$ and radius $\sqrt{\frac14(\sigma_{xx} - \sigma_{yy})^2 + \sigma_{xy}^2}$: **Mohr's circle**, the engineer's picture of [[#eq-rotation]]. The stationary points of $\sigma_n$ are where $\tau = 0$, at $\tan 2\theta = 2\sigma_{xy}/(\sigma_{xx} - \sigma_{yy})$.

::: widget plot
f: (a+b)/2 + (a-b)/2*cos(2*x) + c*sin(2*x); -(a-b)/2*sin(2*x) + c*cos(2*x)
x: 0, pi
y: -100, 100
sliders: a=80:-100:100:5; b=-20:-100:100:5; c=30:-60:60:5
labels: normal stress; shear stress
piticks: true
caption: Normal stress $\sigma_n$ and shear stress $\tau$ (in MPa) on a plane whose normal makes angle $\theta$ with the $x$-axis, for a plane stress state with $\sigma_{xx} = a$, $\sigma_{yy} = b$, $\sigma_{xy} = c$. With the opening values $80, -20, 30$ the normal stress peaks at $88.3$ near $\theta = 0.27$ ($15.5^\circ$), exactly where the shear curve crosses zero; the minimum $-28.3$ is a quarter turn later. Set $a = 50$, $b = -50$, $c = 0$ and then $a = b = 0$, $c = 50$: pure shear is just tension and compression of equal size seen at $45^\circ$. Set $a = b$, $c = 0$ and both curves go flat — an isotropic stress has no preferred plane.
:::

::: example Principal stresses in a plane state {#ex-principal}
A thin plate is in plane stress with $\sigma_{xx} = 80\,\mathrm{MPa}$, $\sigma_{yy} = -20\,\mathrm{MPa}$, $\sigma_{xy} = 30\,\mathrm{MPa}$ and $\sigma_{zz} = \sigma_{xz} = \sigma_{yz} = 0$. Find the principal stresses, the principal directions and the largest shear stress.
::: solution
One principal axis is $z$, with principal stress $0$. In the $xy$-plane, the eigenvalues of $\begin{pmatrix}80 & 30\\ 30 & -20\end{pmatrix}$ solve $\lambda^2 - 60\lambda + (-1600 - 900) = 0$:

$$
\lambda = 30 \pm \sqrt{900 + 2500} = 30 \pm\sqrt{3400} = 30 \pm 58.3 .
$$

The in-plane principal stresses are $88.3\,\mathrm{MPa}$ and $-28.3\,\mathrm{MPa}$, so the ordered principal stresses are $\sigma_1 = 88.3$, $\sigma_2 = 0$, $\sigma_3 = -28.3\,\mathrm{MPa}$. The direction of $\sigma_1$ satisfies

$$
\tan 2\theta = \frac{2\times 30}{80 - (-20)} = 0.6, \qquad \theta = \tfrac12\arctan 0.6 = 15.5^\circ
$$

from the $x$-axis; the direction of $\sigma_3$ is at $105.5^\circ$. Substituting $\theta = 15.5^\circ$ into [[#eq-rotation]] gives $\sigma_n = 88.3$ and $\tau = 0$, confirming the choice of root. By [[#thm-principal]] the largest shear stress is $\frac12(\sigma_1 - \sigma_3) = \frac12(88.3 + 28.3) = 58.3\,\mathrm{MPa}$, on planes at $45^\circ$ to the principal directions. Here the third principal stress is in the plane; had both in-plane principal stresses been positive, the largest shear would have involved the out-of-plane zero, which is a frequent oversight in plate calculations.
:::
:::

::: example The rod in tension {#ex-rod}
Answer the opening question. A rod of diameter $12.0\,\mathrm{mm}$ carries a tension $F = 20.0\,\mathrm{kN}$ along its axis $x$. Find the normal and shear stress on a plane whose normal makes $30.0^\circ$ with the axis, and the largest shear stress in the rod.
::: solution
Away from the ends the stress is uniform, with $\sigma_{xx} = F/A$ and all other components zero:

$$
\sigma_{xx} = \frac{20.0\times10^{3}\,\mathrm N}{\pi(6.00\times10^{-3}\,\mathrm m)^2} = 1.768\times10^{8}\,\mathrm{Pa} = 177\,\mathrm{MPa}.
$$

With $\sigma_{yy} = \sigma_{xy} = 0$, [[#eq-rotation]] reduces to $\sigma_n = \sigma_{xx}\cos^2\theta$ and $\abs\tau = \sigma_{xx}\sin\theta\cos\theta$. At $\theta = 30.0^\circ$:

$$
\sigma_n = 176.8\times 0.750 = 133\,\mathrm{MPa}, \qquad \abs\tau = 176.8\times 0.433 = 76.6\,\mathrm{MPa}.
$$

The principal stresses are $\sigma_{xx}$, $0$, $0$, so the largest shear stress is $\frac12\sigma_{xx} = 88.4\,\mathrm{MPa}$, on planes at $45^\circ$ to the axis. This is why a ductile metal bar pulled to failure often breaks with a cone-shaped surface at roughly $45^\circ$: metals yield by slip, and slip is driven by shear.
:::
:::

::: quiz
A material element is in pure shear: $\sigma_{xy} = \sigma_{yx} = \tau_0$ and all other components zero. Which statement is correct?
- [ ] There are no planes with normal stress, since the state is pure shear.
- [x] The principal stresses are $\tau_0$, $0$ and $-\tau_0$, with the non-zero ones along the diagonals $x = \pm y$.
- [ ] The principal stresses are $\tau_0$, $\tau_0$ and $0$.
- [ ] The mean pressure is $-\tau_0$.
::: solution
The $2\times2$ block $\begin{pmatrix}0&\tau_0\\\tau_0&0\end{pmatrix}$ has eigenvalues $\pm\tau_0$ with eigenvectors $(1, \pm1)/\sqrt2$. So pure shear is tension $\tau_0$ along one diagonal and compression $\tau_0$ along the other. The trace is zero, so $p = 0$ by [[#eq-pressure]]. This is why a stick of chalk twisted until it breaks fractures along a helix at $45^\circ$ to its axis: chalk is brittle and fails in tension, and the tensile principal direction in torsion is at $45^\circ$.
:::
:::

## Displacement and strain {#strain}

Stress describes forces; strain describes geometry. Label each material particle by its position $\mathbf X$ in a reference configuration, usually the unloaded state. After deformation it is at $\mathbf x = \mathbf X + \mathbf u(\mathbf X)$. The vector field $\mathbf u$ is the **displacement**.

A uniform translation $\mathbf u = \text{const}$ does not deform anything, nor does a rigid rotation. Deformation lives in the way $\mathbf u$ varies from point to point, that is, in the gradient $\partial u_i/\partial X_j$. Two neighbouring particles separated by $\dd\mathbf X$ before deformation are separated afterwards by

$$
\dd x_i = \dd X_i + \pdv{u_i}{X_j}\dd X_j .
$$

The squared lengths therefore differ by

$$
\abs{\dd\mathbf x}^2 - \abs{\dd\mathbf X}^2 = 2E_{ij}\,\dd X_i\,\dd X_j, \qquad E_{ij} = \frac12\left(\pdv{u_i}{X_j} + \pdv{u_j}{X_i} + \pdv{u_k}{X_i}\pdv{u_k}{X_j}\right).
$$ {#eq-green}

The symmetric tensor $E_{ij}$ is the **Green–Lagrange strain**. It vanishes for any rigid motion, however large the rotation, because rigid motions preserve every length.

::: definition Small-strain tensor {#def-strain}
When all displacement gradients are small, $\abs{\partial u_i/\partial X_j} \ll 1$, the quadratic term in [[#eq-green]] is negligible and the distinction between $\mathbf X$ and $\mathbf x$ in the derivatives can be dropped. The **infinitesimal strain tensor** is

$$
\varepsilon_{ij} = \frac12\left(\pdv{u_i}{x_j} + \pdv{u_j}{x_i}\right),
$$ {#eq-strain}

and the **infinitesimal rotation** is $\Omega_{ij} = \frac12\bigl(\partial u_i/\partial x_j - \partial u_j/\partial x_i\bigr)$, so that $\partial u_i/\partial x_j = \varepsilon_{ij} + \Omega_{ij}$.
:::

The antisymmetric part $\Omega_{ij}$ has three independent components, and $\Omega_{ij}\dd x_j = (\boldsymbol\phi\times\dd\mathbf x)_i$ with $\boldsymbol\phi = \frac12\nabla\times\mathbf u$. It rotates every small line element through the same small angle $\boldsymbol\phi$, so it changes no lengths and no angles. All the deformation is in $\varepsilon_{ij}$. The meaning of the components is the content of the next theorem.

::: theorem Meaning of the strain components {#thm-strain-meaning}
To first order in the displacement gradients:

1. a line element along the unit vector $\mathbf n$ changes its length by the fraction $\varepsilon_{nn} = n_i\varepsilon_{ij}n_j$; in particular $\varepsilon_{11}$ is the fractional extension of a fibre along $x$;
2. two line elements along perpendicular unit vectors $\mathbf a$ and $\mathbf b$ have the angle between them reduced by $2a_i\varepsilon_{ij}b_j$; in particular the right angle between the $x$- and $y$-axes decreases by $2\varepsilon_{12}$;
3. a small volume changes by the fraction $\Delta V/V = \varepsilon_{kk} = \nabla\cdot\mathbf u$.
:::

::: proof
(1) Write $\dd\mathbf X = s\,\mathbf n$. From [[#eq-green]] with the quadratic term dropped, $\abs{\dd\mathbf x}^2 = s^2(1 + 2\varepsilon_{nn})$, so $\abs{\dd\mathbf x} = s(1 + \varepsilon_{nn} + O(\varepsilon^2))$, and the fractional change of length is $\varepsilon_{nn}$.

(2) After deformation the two elements are $\mathbf a + (\nabla\mathbf u)\mathbf a$ and $\mathbf b + (\nabla\mathbf u)\mathbf b$ (per unit original length), where $(\nabla\mathbf u)_{ij} = \partial u_i/\partial x_j$. Their dot product, to first order, is

$$
\mathbf a\cdot\mathbf b + a_i\pdv{u_i}{x_j}b_j + b_i\pdv{u_i}{x_j}a_j = 0 + 2a_i\varepsilon_{ij}b_j ,
$$

and their lengths are $1 + O(\varepsilon)$. The cosine of the new angle $\frac{\pi}{2} - \gamma$ is $\sin\gamma \approx \gamma$, which to first order equals the dot product. So $\gamma = 2a_i\varepsilon_{ij}b_j$.

(3) A small parallelepiped with edges $\dd\mathbf X^{(1)}, \dd\mathbf X^{(2)}, \dd\mathbf X^{(3)}$ is mapped to one with edges $(I + \nabla\mathbf u)\dd\mathbf X^{(k)}$. Its volume is multiplied by $\det(I + \nabla\mathbf u) = 1 + \tr(\nabla\mathbf u) + O(\varepsilon^2)$, and $\tr(\nabla\mathbf u) = \partial_k u_k = \varepsilon_{kk}$; the rotation part has zero trace.
:::

So the diagonal components are stretches and the off-diagonal components are half the change of a right angle. Being symmetric, $\boldsymbol\varepsilon$ has principal axes, along which the material is stretched or compressed without shear, and three principal strains $\varepsilon_1, \varepsilon_2, \varepsilon_3$ whose sum is the volume strain.

::: warning Engineering shear strain is twice the tensor component
Many engineering texts write $\gamma_{xy} = \partial u_x/\partial y + \partial u_y/\partial x = 2\varepsilon_{xy}$, the full change of the right angle, and call it the shear strain. It is the natural quantity in a torsion test, but it is *not* a tensor component: if you put $\gamma_{xy}$ into a matrix and rotate it, or take its eigenvalues, you get wrong answers. Convert to $\varepsilon_{xy} = \frac12\gamma_{xy}$ before doing tensor algebra, and check which convention a formula or a strain-gauge data sheet uses.
:::

::: example A plane displacement field {#ex-strain}
A plate deforms with displacement $u_x = \kappa(2x + y)$, $u_y = \kappa(3x - y)$, $u_z = 0$, where $\kappa = 1.00\times10^{-3}$. Find the strain and rotation, the principal strains and their directions, and the fractional change of area.
::: solution
The displacement gradients are constant: $\partial_x u_x = 2\kappa$, $\partial_y u_x = \kappa$, $\partial_x u_y = 3\kappa$, $\partial_y u_y = -\kappa$. By [[#eq-strain]],

$$
\varepsilon_{xx} = 2\kappa, \qquad \varepsilon_{yy} = -\kappa, \qquad \varepsilon_{xy} = \tfrac12(\kappa + 3\kappa) = 2\kappa ,
$$

and $\Omega_{xy} = \frac12(\kappa - 3\kappa) = -\kappa$: the whole plate also turns through $\phi_z = -\Omega_{xy} = +1.00\times10^{-3}\,\mathrm{rad}$, anticlockwise, which deforms nothing.

The principal strains are the eigenvalues of $\kappa\begin{pmatrix}2 & 2\\2 & -1\end{pmatrix}$, roots of $\lambda^2 - \kappa\lambda - 6\kappa^2 = 0$:

$$
\lambda = \kappa\,\frac{1 \pm 5}{2} = 3\kappa \text{ or } -2\kappa ,
$$

that is $\varepsilon_1 = 3.00\times10^{-3}$ and $\varepsilon_2 = -2.00\times10^{-3}$. The eigenvector for $3\kappa$ solves $(2-3)v_x + 2v_y = 0$, so it is along $(2, 1)$, at $\arctan\frac12 = 26.6^\circ$ to $x$; the other is perpendicular. A fibre along $(2,1)$ lengthens by $0.300\,\%$ and one along $(-1, 2)$ shortens by $0.200\,\%$. The fractional change of area is the trace, $\varepsilon_{xx} + \varepsilon_{yy} = \kappa = 1.00\times10^{-3}$, equal to $\varepsilon_1 + \varepsilon_2$ as it must be.
:::
:::

::: example When is a strain small? {#ex-small}
A rubber band is stretched uniformly along $x$ by $1.00\,\%$, and separately by $50.0\,\%$. Compare the Green–Lagrange strain $E_{xx}$ with the infinitesimal $\varepsilon_{xx}$ in each case.
::: solution
A uniform stretch by the factor $\lambda$ has $u_x = (\lambda - 1)X$, so $\partial u_x/\partial X = \lambda - 1$. Then $\varepsilon_{xx} = \lambda - 1$ while, from [[#eq-green]],

$$
E_{xx} = (\lambda - 1) + \tfrac12(\lambda - 1)^2 = \tfrac12(\lambda^2 - 1).
$$

For $\lambda = 1.01$: $\varepsilon_{xx} = 0.0100$, $E_{xx} = 0.01005$. The difference is half a per cent of the strain itself, and it is the size of the error every formula of [[continuum/elasticity]] makes. For $\lambda = 1.50$: $\varepsilon_{xx} = 0.500$ and $E_{xx} = 0.625$, a $25\,\%$ difference. Metals and rocks break or yield at strains below about $10^{-2}$, so for them the small-strain theory is excellent right up to failure. Rubber, tendons and soft tissue routinely exceed it and need finite-strain elasticity.
:::
:::

::: remark Compatibility
Six strain components are computed from three displacement components, so not every symmetric field $\varepsilon_{ij}(\mathbf x)$ comes from a displacement. The strains must satisfy six **compatibility conditions**, first written by Saint-Venant, of which a typical one is $\partial_y^2\varepsilon_{xx} + \partial_x^2\varepsilon_{yy} = 2\partial_x\partial_y\varepsilon_{xy}$. They guarantee that the small deformed pieces fit together without gaps. When one solves for displacements, as in [[continuum/elasticity]], compatibility holds automatically.
:::

::: quiz
Which displacement field, with $\alpha$ a small constant, produces zero infinitesimal strain?
- [ ] $\mathbf u = \alpha(x, y, z)$
- [ ] $\mathbf u = \alpha(y, 0, 0)$
- [x] $\mathbf u = \alpha(-y, x, 0)$
- [ ] $\mathbf u = \alpha(x, -y, 0)$
::: solution
For $\mathbf u = \alpha(-y, x, 0)$ the gradients are $\partial_y u_x = -\alpha$ and $\partial_x u_y = \alpha$, so $\varepsilon_{xy} = 0$, and the diagonal terms vanish: this is a small rigid rotation through angle $\alpha$ about $z$. The first field is a uniform dilation with $\varepsilon_{kk} = 3\alpha$. The second is simple shear, $\varepsilon_{xy} = \alpha/2$, which is a pure shear plus a rotation. The fourth stretches along $x$ and compresses along $y$ with no change of area — the same pure shear as the second, viewed in axes rotated by $45^\circ$.
:::
:::

::: application Strain gauges
A strain gauge is a thin foil resistor glued to a surface. When the surface stretches by $\varepsilon$ along the gauge, the resistance changes by a fraction $k\varepsilon$ with gauge factor $k \approx 2$ for metal foils. A typical gauge resolves $10^{-6}$ in strain. Because the surface is in plane stress, three gauges at $0^\circ$, $45^\circ$ and $90^\circ$ — a rosette — measure $\varepsilon_{nn}$ in three directions, which by part (1) of [[#thm-strain-meaning]] are three linear combinations of $\varepsilon_{xx}$, $\varepsilon_{yy}$, $\varepsilon_{xy}$. Solving gives the full plane strain tensor and hence the principal strains. The engineering practice of stress analysis is developed in the Mechanical Engineering Atlas lessons [Stress transformation](/learn/mechanical/lesson.php?c=mechanics-of-materials&l=stress-transformation) and [Three-dimensional stress and strain](/learn/mechanical/lesson.php?c=solid-mechanics&l=stress-strain-3d).
:::

::: history Who invented stress
Euler, in his fluid papers of the 1750s, had already treated pressure as a force per unit area acting across any internal surface. The general concept came from Augustin-Louis Cauchy, who presented it to the Paris Académie des Sciences in September 1822, published a summary in 1823, and gave the full theory — the tetrahedron argument, the symmetry of the tensor, principal stresses and the strain tensor — in his *Exercices de mathématiques* of 1827–28. Claude-Louis Navier had derived equations of elastic equilibrium in 1821 from a model of molecules joined by central forces, and Siméon Denis Poisson pursued the molecular approach; Cauchy's continuum route made the result independent of any molecular picture. Adhémar Barré de Saint-Venant published the compatibility conditions in 1864, and Christian Otto Mohr introduced his circle in 1882.
:::

## Where this leads {#leads}

The stress tensor and the strain tensor are, so far, unrelated: [[#eq-motion]] has six unknown stresses and three unknown displacements. A **constitutive law** closes the system. For an elastic solid at small strain, stress is a linear function of strain — Hooke's law — and that is [[continuum/elasticity]], where the same equation of motion produces seismic waves. For a fluid the stress depends on the velocity gradients instead, and [[continuum/fluid-kinematics]] sets up the description of motion that a fluid needs; [[continuum/ideal-flow]] takes $\sigma_{ij} = -p\,\delta_{ij}$, and [[continuum/viscous-flow]] adds the viscous stresses. The electromagnetic field also carries a stress tensor, the Maxwell stress, treated in [[electrodynamics]].

::: summary
- On the scale of micrometres and above, matter is described by smooth fields; surface forces are tractions $\mathbf t(\mathbf n)$, force per unit area.
- Cauchy's tetrahedron argument shows $t_i = \sigma_{ij}n_j$: the stress tensor $\boldsymbol\sigma$ maps a plane's normal to the force per area on it.
- Momentum balance gives $\rho a_i = \partial_j\sigma_{ij} + f_i$; angular-momentum balance gives $\sigma_{ij} = \sigma_{ji}$.
- A symmetric stress has three perpendicular principal axes with purely normal traction; normal stress ranges over $[\sigma_3, \sigma_1]$ and the largest shear is $\frac12(\sigma_1 - \sigma_3)$ at $45^\circ$.
- The mean pressure is $p = -\frac13\sigma_{kk}$; the traceless remainder is the deviatoric stress.
- For small displacement gradients the strain is $\varepsilon_{ij} = \frac12(\partial_i u_j + \partial_j u_i)$; diagonal entries are fractional stretches, off-diagonal entries half the decrease of a right angle, and $\varepsilon_{kk}$ the fractional volume change.
- The antisymmetric part of $\nabla\mathbf u$ is a rigid rotation; the engineering shear strain $\gamma_{xy}$ is $2\varepsilon_{xy}$.
:::

## Exercises

::: exercise Normal stress on a plane {level=1 check="22/9"}
For the stress tensor of [[#ex-traction]], find the normal stress (in MPa) on the plane with normal $\mathbf n = \frac13(2, -1, 2)$.
::: solution
First the traction, row by row:

$$
\boldsymbol\sigma\mathbf n = \frac13\begin{pmatrix}20 - 4 + 0\\ 8 + 6 + 4\\ 0 - 2 + 6\end{pmatrix} = \frac13\begin{pmatrix}16\\18\\4\end{pmatrix}\mathrm{MPa}.
$$

Then

$$
\sigma_n = \mathbf n\cdot\boldsymbol\sigma\mathbf n = \frac19(2\times16 - 1\times18 + 2\times4) = \frac{22}{9} = 2.44\,\mathrm{MPa}.
$$

As a check, the quadratic form $\sigma_{ij}n_in_j$ written out is $\frac19\bigl(10\cdot4 - 6\cdot1 + 3\cdot4 + 2\cdot4\cdot(2)(-1) + 2\cdot2\cdot(-1)(2)\bigr) = \frac19(40 - 6 + 12 - 16 - 8) = \frac{22}{9}$, the same.
:::
:::

::: exercise Mean pressure {level=1 check="50"}
The stress at a point inside a rock, in MPa, is $\sigma_{xx} = -50$, $\sigma_{yy} = -80$, $\sigma_{zz} = -20$, $\sigma_{xy} = 10$, other shear components zero. Find the mean pressure in MPa, and the deviatoric stress.
::: solution
By [[#eq-pressure]], $p = -\frac13(-50 - 80 - 20) = 50\,\mathrm{MPa}$. The deviatoric stress is $s_{ij} = \sigma_{ij} + p\,\delta_{ij}$: $s_{xx} = 0$, $s_{yy} = -30$, $s_{zz} = 30$, $s_{xy} = 10\,\mathrm{MPa}$, and the others zero. Its trace is zero, as it should be. The rock is under $50\,\mathrm{MPa}$ of confining pressure, roughly that at $2\,\mathrm{km}$ depth, with a $30\,\mathrm{MPa}$ deviatoric part that is what could make it fracture or creep.
:::
:::

::: exercise Stretch of a diagonal fibre {level=1 check="0.0025"}
For the displacement field of [[#ex-strain]], find the fractional change of length of a fibre along the diagonal $\mathbf n = (1, 1, 0)/\sqrt2$.
::: solution
By part (1) of [[#thm-strain-meaning]], $\varepsilon_{nn} = n_i\varepsilon_{ij}n_j = \frac12(\varepsilon_{xx} + 2\varepsilon_{xy} + \varepsilon_{yy}) = \frac12(2 + 4 - 1)\kappa = 2.5\kappa = 2.50\times10^{-3}$. It lies between the principal strains $3\kappa$ and $-2\kappa$, as any $\varepsilon_{nn}$ must, and is close to $3\kappa$ because the diagonal is only $18.4^\circ$ from the first principal direction.
:::
:::

::: exercise Principal stresses {level=2 check="55"}
In plane stress, $\sigma_{xx} = 50\,\mathrm{MPa}$, $\sigma_{yy} = 10\,\mathrm{MPa}$ and $\sigma_{xy} = 15\,\mathrm{MPa}$. Find the largest principal stress (in MPa), the angle of its direction from $x$, and the largest shear stress in the material, remembering $\sigma_{zz} = 0$.
::: solution
The in-plane principal stresses are

$$
\frac{50 + 10}{2} \pm\sqrt{\left(\frac{50 - 10}{2}\right)^2 + 15^2} = 30 \pm\sqrt{400 + 225} = 30 \pm 25 ,
$$

so $55\,\mathrm{MPa}$ and $5\,\mathrm{MPa}$. The direction of the larger one has $\tan 2\theta = 30/40 = 0.75$, $\theta = 18.4^\circ$. The three principal stresses are $\sigma_1 = 55$, $\sigma_2 = 5$, $\sigma_3 = 0$. The largest in-plane shear is $\frac12(55 - 5) = 25\,\mathrm{MPa}$, but by [[#thm-principal]] the largest shear overall is $\frac12(\sigma_1 - \sigma_3) = 27.5\,\mathrm{MPa}$, on planes inclined at $45^\circ$ to the plate surface.
:::
:::

::: exercise Volume change of a cube {level=2 check="-0.1"}
A steel cube of side $10.0\,\mathrm{cm}$ is deformed with $\varepsilon_{xx} = -2.0\times10^{-4}$, $\varepsilon_{yy} = \varepsilon_{zz} = 0.5\times10^{-4}$ and shear strain $\varepsilon_{xy} = 1.0\times10^{-4}$. Find the change of its volume $\Delta V$, in cubic centimetres (negative for a decrease).
::: solution
By part (3) of [[#thm-strain-meaning]], $\Delta V/V = \varepsilon_{kk} = (-2.0 + 0.5 + 0.5)\times10^{-4} = -1.0\times10^{-4}$. The shear strain changes angles, not volume, and does not enter. With $V = 1000\,\mathrm{cm^3}$,

$$
\Delta V = -1.0\times10^{-4}\times1000\,\mathrm{cm^3} = -0.10\,\mathrm{cm^3}.
$$

The cube loses a tenth of a cubic centimetre. A strain of this size in steel corresponds to stresses of tens of megapascals, as [[continuum/elasticity]] will show.
:::
:::

::: exercise Shear stress on a weld {level=2 check="25*sqrt(3)"}
Two plates are joined by a straight weld line that makes $30^\circ$ with the $y$-axis (so its normal makes $30^\circ$ with $x$). The plates are pulled along $x$ with uniform stress $\sigma_{xx} = 100\,\mathrm{MPa}$. Find the magnitude of the shear stress on the weld, in MPa.
::: solution
For uniaxial stress, [[#eq-rotation]] gives $\abs\tau = \sigma_{xx}\sin\theta\cos\theta = \frac12\sigma_{xx}\sin2\theta$ on the plane whose normal makes angle $\theta$ with $x$. With $\theta = 30^\circ$,

$$
\abs\tau = 50\sin 60^\circ = 25\sqrt3 = 43.3\,\mathrm{MPa}.
$$

The normal stress is $100\cos^2 30^\circ = 75\,\mathrm{MPa}$. Welds are often weaker in shear than the parent metal, so a scarf joint is checked against both.
:::
:::

::: exercise Isotropic stress {level=3 #exr-isotropic}
Suppose that at a point the traction on every plane is normal to it: for every unit $\mathbf n$ there is a number $\lambda(\mathbf n)$ with $\mathbf t(\mathbf n) = \lambda(\mathbf n)\,\mathbf n$. Prove that $\lambda$ is independent of $\mathbf n$, so that $\sigma_{ij} = -p\,\delta_{ij}$ for some $p$.
::: hint
Every unit vector is then an eigenvector of $\boldsymbol\sigma$. Apply this to $\mathbf e_1$, $\mathbf e_2$ and $(\mathbf e_1 + \mathbf e_2)/\sqrt2$.
:::
::: solution
By [[#thm-cauchy]], $\boldsymbol\sigma\mathbf n = \lambda(\mathbf n)\mathbf n$ for every unit $\mathbf n$. Take $\mathbf n = \mathbf e_1$ and $\mathbf e_2$: $\boldsymbol\sigma\mathbf e_1 = \lambda_1\mathbf e_1$ and $\boldsymbol\sigma\mathbf e_2 = \lambda_2\mathbf e_2$. Now take $\mathbf m = (\mathbf e_1 + \mathbf e_2)/\sqrt2$. By linearity

$$
\boldsymbol\sigma\mathbf m = \frac{\lambda_1\mathbf e_1 + \lambda_2\mathbf e_2}{\sqrt2},
$$

and by hypothesis this equals $\lambda(\mathbf m)(\mathbf e_1 + \mathbf e_2)/\sqrt2$. Comparing components gives $\lambda_1 = \lambda(\mathbf m) = \lambda_2$. The same argument gives $\lambda_2 = \lambda_3$. So $\boldsymbol\sigma$ has the single eigenvalue $\lambda$ on an orthonormal basis, hence $\boldsymbol\sigma = \lambda I$, and $\lambda(\mathbf n) = \lambda$ for every $\mathbf n$. Writing $\lambda = -p$ gives $\sigma_{ij} = -p\,\delta_{ij}$. This is Pascal's law: in a fluid at rest, which can carry no shear stress, the pressure at a point is the same on every plane through it. Note that the proof used only the linearity provided by Cauchy's theorem.
:::
:::

::: exercise Small strain of a finite rotation {level=3}
A body is rotated rigidly through angle $\theta$ about $z$, so $u_x = (\cos\theta - 1)x - \sin\theta\,y$ and $u_y = \sin\theta\,x + (\cos\theta - 1)y$. Compute the infinitesimal strain $\varepsilon_{ij}$ and the Green–Lagrange strain $E_{ij}$. Show that $E_{ij} = 0$ exactly, while $\varepsilon_{xx}$ is of order $\theta^2$, and evaluate $\varepsilon_{xx}$ for $\theta = 0.0100\,\mathrm{rad}$ and for $\theta = 0.500\,\mathrm{rad}$. What does this say about the domain of validity of [[#def-strain]]?
::: solution
The displacement gradient is

$$
\nabla\mathbf u = \begin{pmatrix}\cos\theta - 1 & -\sin\theta \\ \sin\theta & \cos\theta - 1\end{pmatrix}.
$$

Its symmetric part is $\varepsilon_{xx} = \varepsilon_{yy} = \cos\theta - 1$, $\varepsilon_{xy} = 0$. The quadratic term of [[#eq-green]] is $\frac12(\nabla\mathbf u)\T(\nabla\mathbf u)$, whose $xx$ entry is $\frac12\bigl[(\cos\theta - 1)^2 + \sin^2\theta\bigr] = \frac12(2 - 2\cos\theta) = 1 - \cos\theta$, and whose $xy$ entry is $\frac12\bigl[-(\cos\theta - 1)\sin\theta + \sin\theta(\cos\theta - 1)\bigr] = 0$. The $yy$ entry is also $1 - \cos\theta$. Adding, $E_{xx} = E_{yy} = (\cos\theta - 1) + (1 - \cos\theta) = 0$ and $E_{xy} = 0$, as a rigid motion must give.

The infinitesimal strain $\cos\theta - 1 \approx -\theta^2/2$ is a spurious contraction. For $\theta = 0.0100$ it is $-5.0\times10^{-5}$; for $\theta = 0.500$ it is $-0.122$. The infinitesimal theory therefore requires the *rotations* as well as the strains to be small: a strain of $10^{-3}$ is meaningless if the element has also turned through $0.1\,\mathrm{rad}$, which produces a fake strain of $5\times10^{-3}$. This is the reason a slender beam or a fishing rod, whose pieces rotate a great deal while straining very little, needs a geometrically nonlinear theory.
:::
:::

::: exercise Extremal normal stress {level=3}
Prove, using a Lagrange multiplier, that the stationary values of $\sigma_n(\mathbf n) = \sigma_{ij}n_in_j$ on the unit sphere $n_in_i = 1$ are attained exactly when $\mathbf n$ is an eigenvector of $\boldsymbol\sigma$, and that the stationary value is the corresponding principal stress. Where in the argument is the symmetry of $\boldsymbol\sigma$ used?
::: solution
Stationary points of $\sigma_{ij}n_in_j$ subject to $n_in_i = 1$ are stationary points of $F = \sigma_{ij}n_in_j - \lambda(n_in_i - 1)$. Differentiating with respect to $n_k$,

$$
\pdv{F}{n_k} = \sigma_{kj}n_j + \sigma_{ik}n_i - 2\lambda n_k = (\sigma_{kj} + \sigma_{jk})n_j - 2\lambda n_k .
$$

By [[#thm-symmetric]], $\sigma_{jk} = \sigma_{kj}$, so the condition is $\sigma_{kj}n_j = \lambda n_k$: $\mathbf n$ is an eigenvector with eigenvalue $\lambda$. Conversely, every unit eigenvector satisfies the condition. At such a point $\sigma_n = n_k\sigma_{kj}n_j = \lambda n_kn_k = \lambda$. Symmetry entered when the two terms of the derivative were combined. For a non-symmetric matrix the stationary directions of the quadratic form are the eigenvectors of its symmetric part, not of the matrix — one more reason it matters that the stress is symmetric.
:::
:::
