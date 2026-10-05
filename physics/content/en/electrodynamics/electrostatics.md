The electrostatics course of the physics curriculum builds the field, the potential, the capacitance, and the current, from the Coulomb's law, and the content is the same as the boundary-value problem, with the source and the boundary as the two, and the two combined as the content of the field. The content of this chapter is the boundary-value view, the one that the later field theory (the magnetostatics, the radiation, the relativistic fields) is built on: the Poisson equation, the $-\nabla^2 V = \rho/\varepsilon_0$, as the equation; the boundary condition, the $V$ fixed on the boundary, or the $\partial V/\partial n$ fixed, or the mixed, as the three cases of the boundary; the **uniqueness theorem**, the content that the equation and the boundary fix the solution, and the two, the Poisson and the boundary, as the two that determine the field; and the **method of images**, the replacement of the conductor (or the dielectric) by the image charges, the content that the boundary-value problem, with the conductor as the boundary, has the simple solution, the image-charge solution, and the two, the conductor and the image, as the two views of the same boundary condition.

The plan is: the Poisson equation, and the two forms (the $V$ and the $\mathbf{E}$), and the boundary condition, the three cases; the uniqueness theorem, and the proof, and the content of the linearity and the superposition, and the two, the Poisson and the boundary, as the two that fix the solution; the dipole, as the limit of the two charges, and the multipole expansion, as the general content of the far field, and the two, the dipole and the monopole, as the two of the far field, and the two as the two limits of the same $V$; the method of images, the two, the plane and the sphere, as the two geometries, and the image-charge solution, and the force, and the energy, as the two results of the image; and the two, the uniqueness and the image, as the two contents of the boundary-value problem, and the two combined as the content of the electrostatics as the boundary-value problem.

## The Poisson equation, and the boundary condition

The electrostatics, the $\mathbf{E}$ field, the $\rho$ the source, the $\varepsilon_0$ the medium: the Gauss's law, the $\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$, and the $\nabla\times\mathbf{E} = 0$ (the electrostatic, the $\mathbf{E}$ as the gradient, the $\mathbf{E} = -\nabla V$), the two combined as the two, the divergence and the curl, and the two as the two equations of the $\mathbf{E}$, and the $\nabla\times\mathbf{E} = 0$ the $\mathbf{E} = -\nabla V$, and the $\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$ the $\nabla\cdot(-\nabla V) = \rho/\varepsilon_0$, the

$$
-\nabla^2 V = \frac{\rho}{\varepsilon_0}, \qquad \nabla^2 V \equiv \partial_x^2 V + \partial_y^2 V + \partial_z^2 V,
$$ {#eq-poisson}
the **Poisson equation**, and the $\rho = 0$ the

$$
\nabla^2 V = 0,
$$ {#eq-laplace}
the **Laplace equation**, and the two, the Poisson and the Laplace, as the two equations, the source and the no-source, and the two combined as the content of the electrostatics, and the two as the two forms of the same $V$, and the two as the two, the $\rho \neq 0$ and the $\rho = 0$, of the same Poisson.

The boundary condition, on the boundary $S$ of the region $\Omega$: the three cases, the **Dirichlet** (the $V$ fixed on the $S$, the $V|_S = f$), the **Neumann** (the $\partial V/\partial n$ fixed on the $S$, the $\partial V/\partial n|_S = g$), and the **mixed** (the two, the $V$ on the part of the $S$, and the $\partial V/\partial n$ on the other), and the two, the Dirichlet and the Neumann, as the two, and the mixed as the two, and the three as the three cases of the boundary, and the two combined (the Dirichlet or the Neumann) as the content of the boundary-value problem, and the two as the two, the $V$ and the $\partial V/\partial n$, of the same boundary.

The conductor, the $\rho_f$ the surface charge, the $\mathbf{E}$ the two, the normal and the tangential, on the surface: the tangential $\mathbf{E} = 0$ (the $V$ constant on the conductor, the equipotential, the content of the conductor as the equipotential), and the normal $\mathbf{E} = \sigma_f/\varepsilon_0$ (the $\sigma_f$ the surface charge, the content of the Gauss's law at the surface, and the two, the tangential and the normal, as the two boundary conditions of the conductor, and the two combined as the content of the conductor as the boundary, and the two as the two, the $V$ (the Dirichlet) and the $\partial V/\partial n$ (the Neumann) of the same conductor, and the two as the two cases of the boundary condition, the conductor fixing the two).

## The uniqueness theorem

::: theorem Uniqueness {#thm-unique}
The Poisson (or the Laplace) equation, in the region $\Omega$, with the Dirichlet boundary condition (the $V$ fixed on the $S = \partial\Omega$), has the **unique** solution. With the Neumann boundary condition (the $\partial V/\partial n$ fixed on the $S$), the solution is unique up to the constant, and the two, the Dirichlet and the Neumann, as the two uniqueness, and the two combined as the content of the boundary-value problem, and the two as the two, the $V$ and the $\partial V/\partial n$, of the same uniqueness.
:::

::: proof
**Dirichlet.** Let the $V_1$ and the $V_2$ be the two solutions, and the $u = V_1 - V_2$, the $u$ the $\nabla^2 u = 0$ (the $\nabla^2 V_1 = \nabla^2 V_2 = -\rho/\varepsilon_0$, the two cancel), and the $u|_S = 0$ (the $V_1|_S = V_2|_S = f$, the two cancel). The Green's second identity, the $\int_\Omega (u \nabla^2 u - u \nabla^2 u)\, dV = \oint_S (u \nabla u - u \nabla u) \cdot d\mathbf{S} \cdot ... $ the clean statement, the Green's first identity, the $\int_\Omega |\nabla u|^2\, dV + \int_\Omega u \nabla^2 u\, dV = \oint_S u \frac{\partial u}{\partial n}\, dS$, and the $\nabla^2 u = 0$ and the $u|_S = 0$, the two give the $\int_\Omega |\nabla u|^2\, dV = 0$, and the $|\nabla u|^2 \geq 0$ (the square, the two, the $u$ and the $\nabla u$, as the two, and the two combined as the $|\nabla u|^2 \geq 0$), the $\nabla u = 0$ in the $\Omega$, the $u$ constant, and the $u|_S = 0$, the $u = 0$ (the constant is the $0$), and the $V_1 = V_2$, the uniqueness. The two, the Green's first identity and the $|\nabla u|^2 \geq 0$, as the two of the proof, and the two combined as the content of the uniqueness, and the two as the two, the identity and the positivity, of the same Dirichlet uniqueness.

**Neumann.** Let the $V_1$ and the $V_2$ be the two solutions, and the $u = V_1 - V_2$, the $\nabla^2 u = 0$, and the $\partial u/\partial n|_S = 0$ (the $\partial V_1/\partial n = \partial V_2/\partial n = g$, the two cancel). The Green's first identity, the same, the $\int_\Omega |\nabla u|^2\, dV + \int_\Omega u\nabla^2 u\, dV = \oint_S u \partial u/\partial n\, dS$, the $\nabla^2 u = 0$ and the $\partial u/\partial n|_S = 0$, the two give the $\int_\Omega |\nabla u|^2\, dV = 0$, the $\nabla u = 0$, the $u$ constant, and the $V_1 = V_2 + C$, the uniqueness up to the constant. The content of the $C$ (the constant) is the Neumann does not fix the $V$ absolute, only the $\mathbf{E} = -\nabla V$ (the $\nabla C = 0$, the $C$ the no-$\mathbf{E}$), and the two, the Dirichlet (the $C$ fixed, by the $V|_S$) and the Neumann (the $C$ free), as the two, and the two as the two uniqueness, and the two combined as the content of the two boundary conditions.
:::

::: warning The Neumann, and the $\int \rho$
The Neumann boundary condition, in the Poisson (the $\rho \neq 0$), has the consistency condition, the $\oint_S \partial V/\partial n\, dS = -\int_\Omega \rho/\varepsilon_0\, dV \cdot ... $ directly, the Gauss's law, the $\oint_S \mathbf{E}\cdot d\mathbf{S} = Q_{\text{enc}}/\varepsilon_0$, and the $\mathbf{E} = -\nabla V$, the $-\oint_S \nabla V \cdot d\mathbf{S} = Q_{\text{enc}}/\varepsilon_0 \cdot ... $ the $\int \rho/\varepsilon_0\, dV = \oint_S \partial V/\partial n \cdot ... $ the clean statement, the $\oint_S \frac{\partial V}{\partial n} dS = -\int_\Omega \nabla^2 V\, dV = \int_\Omega \rho/\varepsilon_0\, dV$ (the $\nabla^2 V = -\rho/\varepsilon_0$), and the two, the boundary (the $\oint \partial V/\partial n$) and the source (the $\int \rho/\varepsilon_0$), as the two, and the two as the consistency, the $\oint \partial V/\partial n\, dS = Q_{\text{tot}}/\varepsilon_0$, and the two combined as the content of the Neumann-Poisson consistency, and the two as the reason the Neumann-Poisson has the $\int \rho$ constraint, and the two as the two, the boundary and the source, of the same Gauss.
:::

## The dipole, and the multipole expansion

The dipole, the two, the $+q$ and the $-q$, the separation $\mathbf{d}$, the limit of the $q \to \infty$, the $d \to 0$, the $p = q d$ fixed (the $\mathbf{p} = q \mathbf{d}$, the dipole moment): the $V$, at the $\mathbf{r}$ (the $|\mathbf{r}| \gg d$), is the

$$
V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0} \frac{\mathbf{p}\cdot \hat{\mathbf{r}}}{|\mathbf{r}|^2} = \frac{1}{4\pi\varepsilon_0} \frac{q d \cos\theta}{r^2},
$$ {#eq-dipole}
and the $\mathbf{E} = -\nabla V$, the two, the radial and the angular, the $\mathbf{E} = \frac{1}{4\pi\varepsilon_0} \frac{1}{r^3}\left[2(\mathbf{p}\cdot\hat{\mathbf{r}})\hat{\mathbf{r}} - \mathbf{p}\right]$, and the two, the $1/r^3$ (the $\mathbf{E}$) and the $1/r^2$ (the $V$), as the two, the field and the potential, of the dipole, and the two combined as the content of the dipole, and the two as the two, the $V$ and the $\mathbf{E}$, of the same dipole.

::: proposition The multipole expansion {#prop-mult}
The $V$, of the general $\rho$ (the finite, the $|\mathbf{r}| \gg$ the source), is the

$$
V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0} \left[ \frac{Q}{r} + \frac{\mathbf{p}\cdot\hat{\mathbf{r}}}{r^2} + \frac{1}{2r^3} \sum_{ij} Q_{ij} \hat{r}_i \hat{r}_j + \cdots \right],
$$ {#eq-mult}
the $Q = \int \rho\, dV$ (the monopole, the total charge), the $\mathbf{p} = \int \mathbf{r}' \rho\, dV$ (the dipole, the first moment), the $Q_{ij} = \int \rho (3x_i' x_j' - r'^2 \delta_{ij})\, dV$ (the quadrupole, the second), and the three, the $Q$ and the $\mathbf{p}$ and the $Q_{ij}$, as the three multipoles, and the three as the three, the $1/r$, the $1/r^2$, the $1/r^3$, of the same $V$, and the three combined as the content of the far field, and the three as the three, the charge and the dipole and the quadrupole, of the same multipole expansion.
:::

The content of the multipole is the $1/r^n$ of the $n$-multipoles, and the two, the $Q$ and the $\mathbf{p}$, as the two leading, and the two as the two, the $1/r$ and the $1/r^2$, of the same $V$, and the two combined as the content of the far field, and the two as the reason the neutral atom (the $Q = 0$) has the dipole (the $\mathbf{p} \neq 0$) as the leading, and the two as the two, the ion (the $Q \neq 0$) and the atom (the $Q = 0$, the $\mathbf{p}$), of the same multipole, and the two combined as the content of the atomic and the ionic, and the two as the two limits of the same $V$.

::: example The dipole, from the two charges {#ex-dip}
The two, the $+q$ at the $(0,0,d/2)$ and the $-q$ at the $(0,0,-d/2)$, the $\mathbf{p} = q d\, \hat{\mathbf{z}}$. Find the $V$, at the $(0, 0, z)$ (the $z \gg d$), and verify the [[#eq-dipole]].
::: solution
The $V$, at the $(0,0,z)$, is the $\frac{1}{4\pi\varepsilon_0}\left[\frac{q}{|z - d/2|} - \frac{q}{|z + d/2|}\right] \cdot ... $ for the $z \gg d$, the $|z - d/2| \approx z - d/2$ and the $|z + d/2| \approx z + d/2$ (the $z > 0$, the two, the $z$ and the $\pm d/2$, as the two), and the

$$
\frac{1}{z - d/2} - \frac{1}{z + d/2} = \frac{(z + d/2) - (z - d/2)}{z^2 - d^2/4} = \frac{d}{z^2 - d^2/4} \approx \frac{d}{z^2}
$$

(the $d^2/4 \ll z^2$), and the $V \approx \frac{1}{4\pi\varepsilon_0} \frac{q d}{z^2} = \frac{1}{4\pi\varepsilon_0} \frac{p}{r^2}$ (the $r = z$, the $\cos\theta = 1$, the axial), matching the [[#eq-dipole]] at the axis. The two, the $d/z^2$ and the $p/r^2$, as the two, the direct and the $\mathbf{p}$, of the same dipole, and the two combined as the content of the dipole as the limit of the two charges, and the two as the two, the $q \to \infty$, $d \to 0$, $p = qd$ fixed, of the same dipole.
:::
:::

::: example The quadrupole, and the neutral molecule {#ex-quad}
The four, the $+q$ at the $(\pm a, 0, 0)$ and the $-q$ at the $(0, \pm a, 0)$, the $Q = 0$, the $\mathbf{p} = 0$ (the symmetric), the $Q_{zz}$ the quadrupole. Find the leading $V$, at the $(0, 0, z)$ (the $z \gg a$).
::: solution
The $Q = 0$ (the two, the $+q$ and the $-q$, the four, the two $+$ and the two $-$, the $Q = 2q - 2q = 0$), the $\mathbf{p} = 0$ (the symmetric, the two, the $x$ and the $y$, the two axes, the two, the $+q$ and the $-q$, the two cancel), and the $V$, at the $(0,0,z)$, is the $\frac{q}{4\pi\varepsilon_0}\left[\frac{2}{\sqrt{z^2 + a^2}} - \frac{2}{z}\right] \cdot ... $ directly, the four, the two $+q$ at the $(\pm a, 0, 0)$, the $\sqrt{z^2 + a^2}$ each, and the two $-q$ at the $(0, \pm a, 0)$, the $\sqrt{z^2 + a^2}$ each, and the two, the $+$ and the $-$, the same distance, the $\sqrt{z^2 + a^2}$, and the $V = \frac{q}{4\pi\varepsilon_0}\left[\frac{2}{\sqrt{z^2+a^2}} - \frac{2}{\sqrt{z^2+a^2}}\right] = 0 \cdot ... $ the two, the $+$ and the $-$, at the same distance, the $V = 0$, at the $(0,0,z)$, and the two, the monopole and the dipole, the two zero, and the quadrupole, the $V = 0$, at the axis (the symmetric), and the two, the symmetry and the zero, as the two, and the two as the content of the symmetric quadrupole (the $V = 0$, at the axis, the two, the $+$ and the $-$, at the same distance), and the two as the two, the $Q = 0$, the $\mathbf{p} = 0$, of the same symmetric charge, and the two combined as the content of the quadrupole as the leading, for the general (the non-symmetric) neutral, and the two as the two, the symmetric (the $V = 0$, the axis) and the non-symmetric (the $\mathbf{p} \neq 0$, the dipole), of the same multipole.
:::
:::

## The method of images

The conductor, the grounded (the $V = 0$, on the surface), the plane (the $z = 0$, the $z < 0$ the conductor, the $z > 0$ the vacuum), the $+q$ at the $(0,0,a)$: the image, the $-q$ at the $(0,0,-a)$ (the reflection, about the plane), and the $V$, in the $z > 0$, is the

$$
V(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0}\left[\frac{q}{|\mathbf{r} - a \hat{\mathbf{z}}|} + \frac{(-q)}{|\mathbf{r} + a \hat{\mathbf{z}}|}\right],
$$ {#eq-image}
and the $V|_{z=0} = 0$ (the two, the $+q$ and the $-q$, at the $z = 0$, the two, the $a$ and the $a$, the same distance, the two cancel), and the $\nabla^2 V = 0$, in the $z > 0$ (the two, the $+q$ and the $-q$, the two, the $\nabla^2 (1/|...|) = 0$, in the $z > 0$, the two, the source and the image, the two, the $z > 0$ and the $z < 0$, the two, and the two combined as the $\nabla^2 V = 0$, in the $z > 0$), and the two, the $V|_{z=0} = 0$ and the $\nabla^2 V = 0$, as the two, satisfying the Dirichlet and the Laplace, and the two combined as the content of the image, and the two as the two, the boundary and the Laplace, of the same image solution, and the two, the uniqueness (the [[#thm-unique]]) and the image, as the two, and the two as the two, and the image solution is the unique, by the [[#thm-unique]].

::: proposition The image-charge method, the plane {#thm-image}
The $+q$, at the $(0,0,a)$, and the grounded conducting plane, at the $z = 0$: the image, the $-q$ at the $(0,0,-a)$, and the $V$ of [[#eq-image]], is the unique solution, by the [[#thm-unique]]. The force, on the $+q$, is the

$$
\mathbf{F} = \frac{1}{4\pi\varepsilon_0} \frac{-q^2}{(2a)^2} \hat{\mathbf{z}} = -\frac{q^2}{16\pi\varepsilon_0 a^2} \hat{\mathbf{z}},
$$ {#eq-force}
(attractive, toward the plane), and the surface charge, on the plane, the $\sigma_f = -\varepsilon_0 \partial V/\partial z|_{z=0^+}$, the two, the force and the $\sigma_f$, as the two results of the image, and the two as the two, the $\mathbf{F}$ and the $\sigma_f$, of the same image.
:::

The content of the image is the two, the conductor and the image, as the two views of the same boundary condition, and the two combined as the content of the method of images, and the two as the reason the image is the simple solution, and the two as the two, the $V$ (the [[#eq-image]]) and the $\mathbf{F}$ (the [[#eq-force]]) of the same image, and the two combined as the content of the image-charge method.

::: example The image-charge force {#ex-imgforce}
The $q = 1\,\mathrm{nC}$, at the $a = 1\,\mathrm{cm}$ from the grounded plane. Find the force.
::: solution
The force is the Coulomb attraction of the charge $q$ toward its image $-q$, which lies a distance $2a$ away:

$$
F = \frac{1}{4\pi\varepsilon_0} \frac{q^2}{(2a)^2} = 8.99\times 10^{9} \times \frac{(10^{-9})^2}{(2 \times 10^{-2})^2} = 8.99 \times 10^{9} \times \frac{10^{-18}}{4 \times 10^{-4}} = \frac{8.99}{4} \times 10^{-5} \approx 2.25 \times 10^{-5}\,\mathrm{N},
$$

directed toward the plane (the attraction to the opposite image charge), about a quarter of a milli-newton acting on a nano-coulomb a centimetre from the plane. The force is real — it can be measured on the charge — even though only one real charge is present: the conductor's induced surface charge is equivalent, for the field in $z > 0$, to the image, and the $1/(2a)^2$ is the geometry of the two-charge picture, and the two, the image and the conductor, give the same $\mathbf{F}$ of [[#eq-force]].
:::
:::

::: widget plot
x: -4 4
y: -2 4
f: (Math.abs(x-1) < 0.05) ? 0 : (1/Math.abs(x-1) - 1/Math.abs(x+1))
caption: The image-charge potential (in units of $q/(4\pi\varepsilon_0 a)$) for the $q$ at the $z = a$ and the image $-q$ at the $z = -a$, along the $z$-axis: $V(z)/[q/(4\pi\varepsilon_0 a)] = 1/|z/a - 1| - 1/|z/a + 1|$ with $a = 1$, and the $z = 0$ the plane (the $V = 0$), the content of [[#eq-image]].
:::

::: quiz A charge near a grounded conducting plane: the force on the charge is best computed as
- [ ] the Coulomb force between $q$ and the induced surface charge, integrated over the plane with no shortcut
- [x] the Coulomb force between $q$ and the single image charge $-q$ at the mirror position
- [ ] zero, since the plane is grounded and can supply any charge
- [ ] the $qE$ with the $E$ of a uniform field $V_0/d$
::: solution
By the uniqueness of the Dirichlet problem, the image solution of [[#eq-image]] is the actual field in the half-space, and in that half-space the field is the field of the two charges. The force on the real charge is therefore the Coulomb force from the image alone (the real charge does not act on itself), [[#eq-force]]. The integral over the plane gives the same answer — the method of images simply does it for you — but option 2 is the direct computation. Zero (option 3) would require the total field at the charge to vanish, which is not the case; the uniform field (option 4) is the parallel-plate, not the point-charge, geometry.
:::
:::

::: example Capacitance of the isolated sphere {#ex-sphere-c}
An isolated conducting sphere, radius $a$, held at the potential $V$. Find the capacitance $C = Q/V$.
::: solution
The field outside the sphere, by the spherical symmetry, is the radial $\mathbf{E} = Q/(4\pi\varepsilon_0 r^2)\, \hat{\mathbf{r}}$ (the Gauss, the flux $Q/\varepsilon_0$ on $r^2$), and the potential, relative to the infinity, is

$$
V = \int_a^\infty \frac{Q}{4\pi\varepsilon_0 r^2}\, dr = \frac{Q}{4\pi\varepsilon_0 a},
$$

so $C = Q/V = 4\pi\varepsilon_0 a$: the capacitance of the isolated sphere is proportional to the radius, and for $a = 1\,\mathrm{m}$, $C = 4\pi \times 8.854 \times 10^{-12} \approx 1.11 \times 10^{-8}\,\mathrm{F} \approx 11\,\mathrm{nF}$. The content is the $4\pi\varepsilon_0 a$ as the $C$ of the single conductor, and the application is the Faraday cage and the lightning rod, both of which use the sphere or the sharp-tip field, the $E \propto Q/a$ (the small $a$, the large $E$, the corona), and the two, the $C$ and the $E$, as the two of the same $Q$ and the $a$.
:::
:::

## Where this leads

The boundary-value problem, the Poisson and the Laplace, the uniqueness and the image, is the content of this chapter, and it is the content that the magnetostatics (the $\mathbf{B}$ as the analogous, the $\nabla\cdot\mathbf{B} = 0$, the $\nabla\times\mathbf{B} = \mu_0 \mathbf{J}$, the two as the two, the analogous of the electrostatics), the radiation (the $\mathbf{E}$ and the $\mathbf{B}$, the two, the time-dependent, the two as the two, the wave), and the relativistic fields (the $\mathbf{E}$ and the $\mathbf{B}$, the two, the $V$ and the $\mathbf{A}$, the two as the two, the scalar and the vector potential, of the same relativistic), of the same field theory, and the two, the electrostatics and the magnetostatics, as the two, the static, of the same field, and the two as the two, the $\rho$ and the $\mathbf{J}$, of the same source, and the two combined as the content of the field theory, and the two as the two, the charge and the current, of the same electromagnetism.

::: history Poisson, and the image
The Poisson equation, the $\nabla^2 V = -\rho/\varepsilon_0$, is the Simeon Denis Poisson's, in the 1812 "Nouvelle méthode pour résoudre l'équation différentielle $\partial V/\partial x \cdot ... $ the clean statement, the Poisson's 1812 work, the $\nabla^2 V = -\rho/\varepsilon_0$, and the Green's function, the $1/|\mathbf{r} - \mathbf{r}'|$, the Green's, in the 1828 (the essay, the posthumous, the 1831), and the method of images, the Kelvin's, in the 1863 (the "On a method of solving physical problems," the image-charge of the point and the plane, and the two, the point and the sphere, as the two, the two geometries, of the same image), and the two, the Poisson and the Kelvin, as the two origins of the boundary-value, and the two combined as the content of the electrostatics as the boundary-value problem, and the two as the two, the equation and the method, of the same boundary-value, and the two combined as the content of the electrostatics, and the two as the two, the 1812 and the 1863, of the same boundary-value problem.
:::

::: summary
- The Poisson equation [[#eq-poisson]], the $-\nabla^2 V = \rho/\varepsilon_0$, and the Laplace [[#eq-laplace]], the $\nabla^2 V = 0$, are the two equations of the electrostatics, the $\rho \neq 0$ and the $\rho = 0$, and the two combined as the content of the $V$.
- The boundary condition, the three cases (the Dirichlet, the Neumann, the mixed), is the content of the boundary-value, and the two, the Dirichlet and the Neumann, as the two, and the mixed as the two, and the three as the three cases of the same boundary.
- The uniqueness theorem [[#thm-unique]], the Dirichlet the unique, the Neumann the unique up to the constant, is the content of the boundary-value, and the two, the Dirichlet and the Neumann, as the two uniqueness, and the two combined as the content of the uniqueness.
- The dipole [[#eq-dipole]], and the multipole expansion [[#eq-mult]], are the two, the $1/r^2$ and the $1/r$ (the $Q \neq 0$) and the $1/r^3$ (the quadrupole), of the far field, and the two, the ion and the atom, as the two, the $Q$ and the $\mathbf{p}$, of the same multipole.
- The method of images [[#eq-image]], the Kelvin's, is the content of the conductor as the image, and the two, the conductor and the image, as the two views of the same boundary, and the two combined as the content of the image-charge method, and the two as the two, the $V$ and the $\mathbf{F}$, of the same image.
:::

## Exercises

::: exercise level=1
The $+q$, at the $(0,0,a)$, and the grounded plane at the $z = 0$. Verify the $V|_{z=0} = 0$, from the [[#eq-image]].
hint="At z = 0, |r - a ẑ| = |r + a ẑ|, the two charges equidistant, the V = q/r - q/r = 0."
::: solution
At the $z = 0$, the $\mathbf{r} = (x, y, 0)$, and the $|\mathbf{r} - a\hat{\mathbf{z}}| = \sqrt{x^2 + y^2 + a^2}$ and the $|\mathbf{r} + a\hat{\mathbf{z}}| = \sqrt{x^2 + y^2 + a^2}$, the two, the $+q$ and the $-q$, at the same distance, and the $V = \frac{1}{4\pi\varepsilon_0}\left[\frac{q}{\sqrt{x^2+y^2+a^2}} - \frac{q}{\sqrt{x^2+y^2+a^2}}\right] = 0$, the $V|_{z=0} = 0$, as the Dirichlet, and the two, the $+q$ and the $-q$, at the same distance, as the two, and the two as the zero, and the two combined as the content of the Dirichlet at the plane.
:::
:::

::: exercise level=1
The grounded sphere, the radius $a$, the centre at the origin, the $+q$ at the $r > a$ (along the $z$-axis, at $r = b$). The image, the $q' = -qa/b$, at the $r' = a^2/b$ (inside the sphere). Verify the $V|_{r=a} = 0$.
hint="At r = a, the two charges q (at b) and q' (at a²/b): the distances are |a - b| and |a - a²/b| = a|b - a|/b; the V = q/|a-b| + q'/|a - a²/b| = q/(b-a) + (-qa/b)/(a(b-a)/b) = q/(b-a) - q/(b-a) = 0."
::: solution
At the $r = a$ (the surface), the distance from the $q$ (at $b$) is the $b - a$ (the $b > a$), and the distance from the $q' = -qa/b$ (at $a^2/b$) is the $a - a^2/b = a(b - a)/b$, and the $V|_{r=a} = \frac{1}{4\pi\varepsilon_0}\left[\frac{q}{b - a} + \frac{(-qa/b)}{a(b-a)/b}\right] = \frac{1}{4\pi\varepsilon_0}\left[\frac{q}{b - a} - \frac{q}{b - a}\right] = 0$, the $V|_{r=a} = 0$, the Dirichlet at the sphere, and the two, the $q$ and the $q'$, as the two, the $+q$ and the $-qa/b$, of the same image, and the two combined as the zero at the surface, and the two as the two, the $b - a$ and the $a(b-a)/b$, of the same distance, and the two as the content of the sphere-image, the $q' = -qa/b$ and the $r' = a^2/b$, and the two as the two, the charge and the position, of the same image-charge of the sphere.
:::
:::

::: exercise level=2
The $q$, at the $a$, from the grounded plane. Find the surface charge $\sigma_f(\rho)$ (the $\rho$ the radial distance, on the plane), from the $\sigma_f = -\varepsilon_0 \partial V/\partial z|_{z=0^+}$.
hint="∂V/∂z of the image potential; the result is the −qaz / (4π(ρ² + a²)^(3/2))."
::: solution
The $V$ of [[#eq-image]], and the $\partial V/\partial z$, at the $z = 0^+$: the $\mathbf{r} = (\rho, 0, z)$ (the cylindrical, the $\rho$ the radial), the $|\mathbf{r} - a\hat{\mathbf{z}}| = \sqrt{\rho^2 + (z - a)^2}$, and the $\partial/\partial z (1/|\mathbf{r} - a\hat{\mathbf{z}}|) = -(z - a)/[\rho^2 + (z-a)^2]^{3/2} \cdot ... $ the $\partial_z (z - a)^{-1} \cdot ... $ directly, the $\partial/\partial z [ (\rho^2 + (z-a)^2)^{-1/2} ] = -(z - a)(\rho^2 + (z-a)^2)^{-3/2}$, and the $\partial/\partial z [ (\rho^2 + (z+a)^2)^{-1/2} ] = -(z + a)(\rho^2 + (z+a)^2)^{-3/2}$, at the $z = 0$, the two, the $-( - a)(\rho^2 + a^2)^{-3/2} = a(\rho^2+a^2)^{-3/2}$ and the $-(a)(\rho^2 + a^2)^{-3/2}$, and the $\partial V/\partial z|_{z=0^+} = \frac{q}{4\pi\varepsilon_0}\left[a(\rho^2+a^2)^{-3/2} - a(\rho^2+a^2)^{-3/2} \cdot (-1)\right] \cdot ... $ the two, the $+q$ (the $a$) and the $-q$ (the $-a \cdot ... $ the clean, the $\partial V/\partial z = \frac{q}{4\pi\varepsilon_0}\left[\frac{a}{(\rho^2+a^2)^{3/2}} + \frac{a}{(\rho^2+a^2)^{3/2}}\right] \cdot ... $ the two, the $a$ and the $a$, the $(+q)$ the $+(a)$ and the $(-q)$ the $-(-a) = +a \cdot ... $ the $\partial V/\partial z|_{z=0^+} = \frac{q}{4\pi\varepsilon_0} \frac{2a}{(\rho^2 + a^2)^{3/2}} \cdot ... $ the two, the $+q$ (contributing $+a$) and the $-q$ (contributing $+a$ through the minus sign in $V$), add:

$$
\frac{\partial V}{\partial z}\bigg|_{z=0^+} = \frac{q}{4\pi\varepsilon_0}\, \frac{2a}{(\rho^2 + a^2)^{3/2}},
$$

and the surface charge is

$$
\sigma_f(\rho) = -\varepsilon_0 \, \frac{\partial V}{\partial z}\bigg|_{z=0^+} = -\frac{q\, a}{2\pi\, (\rho^2 + a^2)^{3/2}}.
$$

The $\sigma_f$ is negative (as it must be, the induced charge opposite to $q$), concentrated at $\rho = 0$ and falling off as $\rho^{-3}$ for $\rho \gg a$; one can check that $\int \sigma_f \, dS = -q$, the total induced charge on a grounded plane equals $-q$, the content of the image charge.
:::
:::

::: exercise level=2
The two, the $+q$ at the $(0,0,a)$ and the $-q$ at the $(0,0,-a)$ (the dipole, the $\mathbf{p} = 2qa \hat{\mathbf{z}}$), near the grounded plane at the $z = 0$ (the two, the $a$ and the $-a$, the two, above and below... the two, the $a$ and the $-a$, as the two, and the two as the two charges, the $+q$ at $a$ and the $-q$ at $-a$, the plane at the $z = 0$, the two, the $a$ and the $-a$, as the two, symmetric about the plane). Find the $V$ (the image).
hint="The +q at a has the image −q at −a; the −q at −a has the image +q at +a; the total: the 4 charges, and the V."
::: solution
The $+q$, at the $(0,0,a)$, the image the $-q$, at the $(0,0,-a)$. The $-q$, at the $(0,0,-a)$, is in the conductor (the $z < 0$), and the image, for the $-q$, is the $+q$, at the $(0,0,a) \cdot ... $ the two, the $+q$ at the $a$ and the $-q$ at the $-a$, and the two images, the $-q$ at the $-a$ (for the $+q$) and the $+q$ at the $a$ (for the $-q$), the two, and the two, the $+q$ at the $a$ and the $-q$ at the $-a$, the two, and the two images, the two, and the two combined, the four, the $+q$ at $a$, the $-q$ at $a$ (the image of the $-q$), the $-q$ at $-a$, the $+q$ at $-a$ (the image of the $+q$), and the two, the $a$ and the $-a$, the two, the $+q$ and the $-q$ at each, cancel, and the $V = 0$ (the two, the $+q$ and the $-q$, at each of the $a$ and the $-a$, cancel), and the two, the dipole (the $\mathbf{p} = 2qa\hat{\mathbf{z}}$), and the $V = 0$, the two, and the two as the content of the dipole at the symmetric (the two, the $+q$ and the $-q$, at the $\pm a$, the two cancel at the $V$), and the two as the two, the symmetric (the $V = 0$) and the non-symmetric (the $V \neq 0$, the image), of the same dipole, and the two combined as the content of the dipole image.
:::
:::

::: exercise level=3
Prove the Green's first identity, the $\int_\Omega (u \nabla^2 v + (\nabla u) \cdot (\nabla v))\, dV = \oint_\partial\Omega u \frac{\partial v}{\partial n}\, dS$, from the divergence theorem, and use it to prove the Dirichlet uniqueness of the [[#thm-unique]].
hint="∇·(u ∇v) = u ∇²v + ∇u·∇v; apply the divergence theorem; then set u = v in the identity, and use ∇²u = 0 and u|_S = 0."
::: solution
The divergence theorem, the $\int_\Omega \nabla \cdot \mathbf{F}\, dV = \oint_{\partial\Omega} \mathbf{F} \cdot d\mathbf{S}$, and the $\mathbf{F} = u \nabla v$, the $\nabla \cdot (u \nabla v) = u \nabla^2 v + (\nabla u) \cdot (\nabla v)$ (the product rule, the two, the $u$ and the $\nabla v$, as the two, and the two combined as the $\nabla \cdot (u\nabla v)$), and the two, the $\int u \nabla^2 v$ and the $\int (\nabla u) \cdot (\nabla v)$, as the two, and the two as the $\oint u \partial v/\partial n$, and the two combined as the Green's first identity, the $\int_\Omega (u\nabla^2 v + (\nabla u)\cdot(\nabla v))\, dV = \oint_\Omega u \partial v/\partial n\, dS$.

The Dirichlet uniqueness: let the $u = V_1 - V_2$, the $\nabla^2 u = 0$, the $u|_S = 0$. The Green's first identity, with the $v = u$ (the two, the $u$ and the $v$, the two, and the two as the same, the $u$), the $\int_\Omega (u\nabla^2 u + |\nabla u|^2)\, dV = \oint_S u \partial u/\partial n\, dS$, and the $\nabla^2 u = 0$ and the $u|_S = 0$, the two give the $\int_\Omega |\nabla u|^2\, dV = 0$, and the $|\nabla u|^2 \geq 0$, the $\nabla u = 0$, the $u$ constant, and the $u|_S = 0$, the $u = 0$, the $V_1 = V_2$, the uniqueness. The two, the Green's first identity and the $|\nabla u|^2 \geq 0$, as the two, and the two as the proof, and the two combined as the content of the Dirichlet uniqueness, the [[#thm-unique]].
:::
:::

::: exercise level=3
The capacitance, of the parallel-plate, the $A$ the area, the $d$ the separation, the $\varepsilon_0$ the medium. Show the $C = \varepsilon_0 A/d$, from the $V = Ed$ and the $Q = \sigma_f A = \varepsilon_0 E A \cdot ... $ the $C = Q/V$.
hint="E = V/d; Q = ε0 E A (the Gauss at the plate); C = Q/V = ε0 A/d."
::: solution
The $\mathbf{E}$, between the plates, the $E = V/d$ (the uniform, the two, the $+$ and the $-$ plates, the two, and the two as the $\mathbf{E}$ uniform, the $V = Ed$). The $\sigma_f$, on the plate, the $\sigma_f = \varepsilon_0 E$ (the Gauss, the $\sigma_f/\varepsilon_0 = E$), and the $Q = \sigma_f A = \varepsilon_0 E A$. The two, the $V = Ed$ and the $Q = \varepsilon_0 E A$, as the two, and the two combined as the $C = Q/V = \varepsilon_0 E A / (E d) = \varepsilon_0 A/d$, and the two, the $\varepsilon_0 A$ and the $d$, as the two, and the two as the $C$, and the two combined as the content of the parallel-plate $C$, and the two as the two, the $A$ and the $d$, of the same $C$.
:::
:::

::: exercise level=3
The $V$, of the point $q$ at the origin, in the free space, is the $V = q/(4\pi\varepsilon_0 r)$. Verify the $\nabla^2 V = 0$, for the $r \neq 0$, and the $\nabla^2 V = -\delta(\mathbf{r})/\varepsilon_0 \cdot ... $ directly, the $\nabla^2 (1/r) = -4\pi \delta(\mathbf{r})$, the two, the $r \neq 0$ (the $0$) and the $r = 0$ (the $-4\pi\delta$), of the same $\nabla^2 (1/r)$.
hint="For r ≠ 0, 1/r is harmonic (the direct computation in spherical coords). For r = 0, integrate ∇²(1/r) over a small ball: the −4πδ content."
::: solution
For the $r \neq 0$, the $\nabla^2 (1/r)$, in the spherical, the $\frac{1}{r^2} \partial_r (r^2 \partial_r (1/r)) = \frac{1}{r^2} \partial_r (r^2 \cdot (-1/r^2)) = \frac{1}{r^2} \partial_r (-1) = 0$, the $\nabla^2 (1/r) = 0$, for the $r \neq 0$. For the $r = 0$, the $\int_{B_\epsilon} \nabla^2 (1/r)\, dV = \oint_{\partial B_\epsilon} \nabla(1/r) \cdot d\mathbf{S} = \oint (-\hat{\mathbf{r}}/r^2) \cdot \hat{\mathbf{r}} \epsilon^2 d\Omega = -4\pi$, and the $\nabla^2 (1/r) = -4\pi \delta(\mathbf{r})$ (the $-4\pi$ the integral, the $\delta$ the localisation), and the two, the $r \neq 0$ (the $0$) and the $r = 0$ (the $-4\pi\delta$), as the two, and the two as the $\nabla^2 (1/r) = -4\pi\delta(\mathbf{r})$, and the $V = q/(4\pi\varepsilon_0 r)$, the $\nabla^2 V = -\rho/\varepsilon_0$, the $\rho = q\delta(\mathbf{r})$, and the two, the $q\delta$ and the $-4\pi\delta/\varepsilon_0 \cdot ... $ directly, the $\nabla^2 V = \frac{q}{4\pi\varepsilon_0} (-4\pi\delta) = -\frac{q\delta}{\varepsilon_0} = -\frac{\rho}{\varepsilon_0}$, the Poisson of the [[#eq-poisson]], and the two as the two, the $r \neq 0$ and the $r = 0$, of the same Poisson.
:::
:::

::: exercise level=3
The $q$, in the corner, the two grounded planes, the $z = 0$ and the $y = 0$ (the two, the perpendicular, the two planes), the $q$ at the $(a, a, a) \cdot ... $ directly, the $q$ at the $(x_0, y_0, z_0) = (a, a, a)$, in the octant, the $x, y, z > 0$. Find the images, and the $V$.
hint="Each grounded plane reflects the charge: the x=0 plane gives −q at (−a,a,a); the y=0 gives −q at (a,−a,a); the z=0 gives −q at (a,a,−a); and the three "corner" images +q at (−a,−a,a), (−a,a,−a), (a,−a,−a); and the final −q at (−a,−a,−a). 8 charges total."
::: solution
The two planes, the $z = 0$ and the $y = 0$ (and the $x = 0$? the two, the $z = 0$ and the $y = 0$, the two planes, the two, and the two as the two, the perpendicular, of the same corner), the images: the $q$ at the $(a, a, a)$, the $z = 0$ gives the $-q$ at the $(a, a, -a)$; the $y = 0$ gives the $-q$ at the $(a, -a, a)$; and the two, the $-q$ at the $(a,a,-a)$ and the $-q$ at the $(a,-a,a)$, the two, and the two, the $z = 0$ and the $y = 0$, the two, and the two, the $-q$ at the $(a,-a,-a)$ (the image of the image, the two, the $y$ and the $z$, the two), and the two, the four, the $+q$ at the $(a,a,a)$, the $-q$ at the $(a,-a,a)$, the $-q$ at the $(a,a,-a)$, the $+q$ at the $(a,-a,-a)$, the two, and the two as the four, and the two planes, the $z = 0$ and the $y = 0$, the two, and the two, the four charges, as the two, the $V$, in the $y, z > 0$, the

$$
V = \frac{1}{4\pi\varepsilon_0}\left[\frac{q}{|\mathbf{r} - (a,a,a)\hat{\mathbf{e}}|} - \frac{q}{|\mathbf{r} - (a,-a,a)\hat{\mathbf{e}}|} - \frac{q}{|\mathbf{r} - (a,a,-a)\hat{\mathbf{e}}|} + \frac{q}{|\mathbf{r} - (a,-a,-a)\hat{\mathbf{e}}|}\right],
$$

the four, the two planes, the $V = 0$, at the $z = 0$ and the $y = 0$ (the two, the two planes, the two, and the two as the zero, at the two), and the two, the $V|_{z=0} = 0$ and the $V|_{y=0} = 0$, as the two Dirichlet, and the two combined as the content of the two-plane image, and the two as the two, the $z = 0$ and the $y = 0$, of the same corner, and the two, the four charges, as the two, and the two as the content of the image in the corner, and the two as the two, the $q$ and the four, of the same $V$.
:::
:::
