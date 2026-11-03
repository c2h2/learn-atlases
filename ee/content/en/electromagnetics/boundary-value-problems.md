In the previous two chapters we found fields by starting from known charges: Coulomb's law integrates over them, Gauss's law exploits their symmetry. Most practical problems are posed the other way round. You know the **potentials** of the electrodes, because they are connected to a supply or to ground, but not how charge distributes itself over their surfaces; that distribution is part of the answer. What is the capacitance of a microstrip on a circuit board? How strong is the field at the corner of a busbar at $20\,\mathrm{kV}$? What is the potential inside a reverse-biased diode? Each is a **boundary-value problem**: a differential equation for the potential in a region, plus conditions on its boundary.

The differential equation is Poisson's equation, which follows in one line from Gauss's law and $\mathbf E = -\nabla V$. This chapter derives it, proves the uniqueness theorem that makes boundary-value problems well posed, and then works through the main solution methods: direct integration for one-dimensional problems, separation of variables for rectangular and cylindrical geometries, the method of images for conductors that are planes or spheres, and finite differences, the simplest numerical method and the ancestor of every commercial field solver. The mathematical theory of Laplace's equation is in the Maths Atlas [Laplace equation](/learn/maths/lesson.php?c=pde&l=laplace-equation) chapter; here the emphasis is on electrodes, devices and numbers.

## Poisson's and Laplace's equations

Gauss's law in a linear dielectric reads $\nabla\cdot(\epsilon\mathbf E) = \rho_v$ ([[electromagnetics/conductors-dielectrics#def-polarisation]]), and the static field is the negative gradient of a potential ([[electromagnetics/electrostatics#thm-conservative]]). Substituting the second into the first gives one scalar equation for $V$.

::: theorem Poisson's and Laplace's equations {#thm-poisson}
In a region with permittivity $\epsilon(\mathbf r)$ and free charge density $\rho_v$, the electrostatic potential satisfies

$$
\nabla\cdot(\epsilon\nabla V) = -\rho_v .
$$

If $\epsilon$ is uniform this is **Poisson's equation**,

$$
\nabla^2V = -\frac{\rho_v}{\epsilon} ,
$$ {#eq-poisson}

and in a charge-free region it reduces to **Laplace's equation** $\nabla^2V = 0$.
:::

The Laplacian in each coordinate system is given in [[electromagnetics/vector-analysis#eq-laplacian]]. A solution of Laplace's equation is called a **harmonic function**. Harmonic functions have a property that explains a great deal of their behaviour.

::: proposition Mean-value property {#prop-mean}
If $\nabla^2V = 0$ in a region, then the value of $V$ at any point equals the average of $V$ over any sphere centred on that point and lying inside the region. Consequently $V$ has no local maxima or minima inside a charge-free region: its extreme values occur on the boundary.
:::

::: proof
Let $\bar V(R)$ be the average of $V$ over the sphere of radius $R$ about the point $P$, $\bar V(R) = \frac{1}{4\pi}\oint V(R,\theta,\phi)\,\mathrm d\Omega$. Differentiating under the integral, $\bar V'(R) = \frac1{4\pi}\oint\frac{\partial V}{\partial r}\,\mathrm d\Omega = \frac{1}{4\pi R^2}\oint\nabla V\cdot\mathrm d\mathbf S$, which by the divergence theorem equals $\frac{1}{4\pi R^2}\int\nabla^2V\,\mathrm dv = 0$. So $\bar V$ is constant, and as $R\to0$ it tends to $V(P)$. If $V$ had a strict maximum at $P$, its average over a small sphere would be less than $V(P)$, a contradiction.
:::

An immediate engineering consequence is **Earnshaw's theorem**: a charge cannot be held in stable equilibrium by electrostatic forces alone, since its potential energy $qV$ would need a minimum in free space. Another is the basis of the finite-difference method below: on a grid, the potential at each node is approximately the average of its neighbours.

### Uniqueness

A boundary-value problem is useful only if its data determine the answer. They do.

::: theorem Uniqueness theorem {#thm-uniqueness}
Let $V$ satisfy Poisson's equation with a given $\rho_v$ in a region $\Omega$ bounded by conductors (or other surfaces). If on each part of the boundary either $V$ (a **Dirichlet** condition) or the normal derivative $\partial V/\partial n$ (a **Neumann** condition) is specified, the solution is unique, up to an additive constant if only Neumann conditions are given.
:::

::: proof
Suppose $V_1$ and $V_2$ are both solutions and let $W = V_1 - V_2$. Then $\nabla^2W = 0$ in $\Omega$, and on every part of the boundary either $W = 0$ or $\partial W/\partial n = 0$. Apply the divergence theorem to $W\nabla W$, using $\nabla\cdot(W\nabla W) = \abs{\nabla W}^2 + W\nabla^2W$:

$$
\int_\Omega\abs{\nabla W}^2\,\mathrm dv = \oint_{\partial\Omega}W\frac{\partial W}{\partial n}\,\mathrm dS - \int_\Omega W\nabla^2W\,\mathrm dv = 0 .
$$

The integrand on the left is non-negative, so $\nabla W = \mathbf 0$ throughout, and $W$ is constant. With at least one Dirichlet condition the constant is zero.
:::

Uniqueness is what licenses every trick in this chapter. Find **any** function that satisfies the equation and the boundary conditions, by guessing, by separation, by images or by numerical relaxation, and it is **the** solution. It also justifies the Faraday cage: inside a closed conductor with no enclosed charge, $V = $ const satisfies Laplace's equation and the boundary condition, so it is the only solution and the field inside is zero.

## One-dimensional problems: direct integration

When the potential depends on a single coordinate, Laplace's equation is an ordinary differential equation and can be integrated twice; the two constants come from the two electrode potentials.

| geometry | equation | general solution |
|---|---|---|
| parallel plates, $V(x)$ | $\dfrac{\mathrm d^2V}{\mathrm dx^2} = 0$ | $V = Ax + B$ |
| coaxial cylinders, $V(\rho)$ | $\dfrac1\rho\dfrac{\mathrm d}{\mathrm d\rho}\left(\rho\dfrac{\mathrm dV}{\mathrm d\rho}\right) = 0$ | $V = A\ln\rho + B$ |
| concentric spheres, $V(r)$ | $\dfrac1{r^2}\dfrac{\mathrm d}{\mathrm dr}\left(r^2\dfrac{\mathrm dV}{\mathrm dr}\right) = 0$ | $V = -\dfrac Ar + B$ |
| wedge between planes $\phi = 0$, $\phi = \alpha$, $V(\phi)$ | $\dfrac{1}{\rho^2}\dfrac{\mathrm d^2V}{\mathrm d\phi^2} = 0$ | $V = A\phi + B$ |

::: example The coaxial capacitor from Laplace's equation {#ex-coax-laplace}
The inner conductor of a coaxial line ($\rho = a$) is held at $V_0$ and the outer ($\rho = b$) at $0$. Find $V(\rho)$, $\mathbf E$, the surface charge on the inner conductor and the capacitance per unit length.
::: solution
From the table $V = A\ln\rho + B$. The conditions $V(b) = 0$ and $V(a) = V_0$ give $B = -A\ln b$ and $A\ln(a/b) = V_0$, so

$$
V(\rho) = V_0\,\frac{\ln(b/\rho)}{\ln(b/a)}, \qquad \mathbf E = -\frac{\mathrm dV}{\mathrm d\rho}\,\mathbf a_\rho = \frac{V_0}{\rho\ln(b/a)}\,\mathbf a_\rho .
$$

On the inner conductor, by [[electromagnetics/conductors-dielectrics#prop-conductor]], $\rho_s = D_n = \epsilon V_0/(a\ln(b/a))$. The charge per unit length is $\rho_s\cdot2\pi a = 2\pi\epsilon V_0/\ln(b/a)$, so $C' = 2\pi\epsilon/\ln(b/a)$. This is the result of [[electromagnetics/conductors-dielectrics]], obtained here without assuming the charge first: we assumed the voltage and let the equation tell us the charge.
:::
:::

When there is space charge, Poisson's equation is integrated in the same way, with the charge density as a source term. The most important example in electronics is the depletion region of a $pn$ junction.

::: example The depletion region of a diode {#ex-pn}
In a one-sided $p^+n$ silicon junction ($\epsilon_r = 11.7$), the $n$ side is doped with $N_D = 10^{22}\,\mathrm m^{-3}$ ($10^{16}\,\mathrm{cm^{-3}}$). Under reverse bias the region $0 < x < W$ is depleted of electrons and holds the fixed charge $\rho_v = qN_D$ of the ionised donors; the heavily doped $p^+$ side contributes a negligible width. The total potential across the depletion region (built-in plus reverse bias) is $5\,\mathrm V$. Find $V(x)$, $E(x)$, the depletion width $W$ and the peak field.
::: solution
Poisson's equation in the depleted region is $\mathrm d^2V/\mathrm dx^2 = -qN_D/\epsilon$. Beyond $x = W$ the silicon is neutral and field-free, so $E(W) = 0$; choose $V(W) = 0$. Integrating once,

$$
E(x) = -\frac{\mathrm dV}{\mathrm dx} = -\frac{qN_D}{\epsilon}(W - x),
$$

a field that is largest in magnitude at the junction $x = 0$ and falls linearly to zero at the edge (it points in the $-x$ direction, from the positive donors towards the negative acceptors). Integrating again with $V(W) = 0$,

$$
V(x) = \frac{qN_D}{2\epsilon}(W - x)^2, \qquad V_{\text{tot}} = V(0) = \frac{qN_DW^2}{2\epsilon} .
$$

Solving for the width,

$$
W = \sqrt{\frac{2\epsilon V_{\text{tot}}}{qN_D}} = \sqrt{\frac{2(11.7)(8.854\times10^{-12})(5)}{(1.602\times10^{-19})(10^{22})}} = 8.04\times10^{-7}\,\mathrm m = 0.80\,\mathrm{\mu m},
$$

and the peak field is $\abs{E(0)} = qN_DW/\epsilon = 2V_{\text{tot}}/W = 1.24\times10^7\,\mathrm{V/m}$, or $124\,\mathrm{kV/cm}$. Five volts across less than a micrometre produce a field four times the breakdown strength of air; silicon withstands it, but only up to a limit discussed in [[semiconductor-devices/pn-junction]].
:::
:::

::: widget plot
f: -(1 - x)*if(x < 1, 1, 0); (1 - x)^2*if(x < 1, 1, 0)
x: -0.2, 1.4
y: -1.1, 1.1
labels: E/\lvert E_{\max}\rvert; V/V_{\text{tot}}
vlines: 0; 1
caption: Field and potential across the depleted $n$ region of a one-sided junction, position in units of the depletion width $W$. Uniform charge gives a linearly varying field (a triangle) and a parabolic potential. The area of the field triangle, $\tfrac12\abs{E_{\max}}W$, equals the total potential, which is why $\abs{E_{\max}} = 2V_{\text{tot}}/W$.
:::

::: example Designing for a breakdown field {#ex-pn-design}
Silicon of moderate doping breaks down by avalanche at about $3\times10^7\,\mathrm{V/m}$. For the one-sided junction of [[#ex-pn]], what is the highest donor density that keeps the peak field below this value at a total reverse voltage of $50\,\mathrm V$? How wide is the depletion region then?
::: solution
From the example, $\abs{E_{\max}} = qN_DW/\epsilon$ with $W = \sqrt{2\epsilon V/(qN_D)}$, so

$$
\abs{E_{\max}} = \sqrt{\frac{2qN_DV}{\epsilon}}\quad\Longrightarrow\quad N_D \le \frac{\epsilon E_{\text{br}}^2}{2qV} = \frac{(1.036\times10^{-10})(3\times10^7)^2}{2(1.602\times10^{-19})(50)} = 5.8\times10^{21}\,\mathrm m^{-3},
$$

that is $5.8\times10^{15}\,\mathrm{cm^{-3}}$. The depletion width is then $W = 2V/E_{\text{br}} = 100/(3\times10^7) = 3.3\,\mathrm{\mu m}$, so the lightly doped layer must be at least this thick. Higher voltage ratings need lighter doping and thicker layers: power diodes rated at a kilovolt have drift regions of order $100\,\mathrm{\mu m}$, and their extra resistance is the price of the rating. (Real breakdown fields depend on doping; device texts tabulate them.)
:::
:::

## Separation of variables

When the potential depends on two or three coordinates, Laplace's equation is a partial differential equation. If the boundaries are coordinate surfaces, we can look for solutions that are products of functions of one variable each.

### Rectangular coordinates

Consider a long rectangular trough, $0 < x < a$, $0 < y < b$, uniform in $z$. The two side walls and the bottom are grounded and the top lid, insulated from them by thin gaps, is held at $V_0$. Laplace's equation is $\partial^2V/\partial x^2 + \partial^2V/\partial y^2 = 0$. Try $V = X(x)Y(y)$; dividing by $XY$,

$$
\frac{X''}{X} = -\frac{Y''}{Y} .
$$

The left side depends only on $x$ and the right only on $y$, so both equal a constant, $-k^2$. Then $X'' + k^2X = 0$ and $Y'' - k^2Y = 0$. The conditions $X(0) = X(a) = 0$ require $X = \sin(n\pi x/a)$ with $k = n\pi/a$, $n = 1, 2, \dots$; the condition $Y(0) = 0$ requires $Y = \sinh(n\pi y/a)$. Each product satisfies Laplace's equation and the three grounded walls, and so does any sum of them:

$$
V(x,y) = \sum_{n=1}^\infty c_n\sin\frac{n\pi x}{a}\,\sinh\frac{n\pi y}{a} .
$$

The last condition, $V(x, b) = V_0$, is a Fourier sine series ([Maths Atlas: Fourier series](/learn/maths/lesson.php?c=pde&l=fourier-series)): $c_n\sinh(n\pi b/a)$ must be the sine coefficients of the constant $V_0$ on $(0, a)$, which are $4V_0/(n\pi)$ for odd $n$ and $0$ for even $n$. Hence

$$
V(x,y) = \frac{4V_0}{\pi}\sum_{n\ \text{odd}}\frac1n\,\sin\frac{n\pi x}{a}\,\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)} .
$$ {#eq-trough}

::: widget contour
f: if(x < 0, 0, if(x > 1, 0, if(y > b, 0, sum(4/(pi*(2k - 1))*sin((2k - 1)*pi*x)*sinh((2k - 1)*pi*y)/sinh((2k - 1)*pi*b), k, 1, 25))))
x: 0, 1
y: 0, 2
levels: 20
gradient: true
point: 0.5, 0.5
sliders: b=1:0.5:2:0.05
caption: Equipotentials in the trough of [[#eq-trough]] (normalised to $V_0 = 1$, width $a = 1$, height $b$), summed to 25 odd terms. The point starts at the centre of the square trough, where the potential is exactly $V_0/4$. Increase $b$ (the region above the lid is shown as zero): the region near the lid looks the same, but the field decays rapidly with depth, like $e^{-\pi y/a}$, because the higher terms die away fastest. Near the corners where the lid meets the walls the contours crowd together: the field is singular across the insulating gaps.
:::

::: example The centre of a square trough {#ex-trough-centre}
For a square trough ($a = b$), find the potential at the centre, (a) from the series [[#eq-trough]], (b) without any series.
::: solution
(a) At $x = a/2$, $y = a/2$, $\sin(n\pi/2) = \pm1$ for odd $n$ and $\sinh(n\pi/2)/\sinh(n\pi) = 1/(2\cosh(n\pi/2))$, so

$$
V = \frac{4V_0}{\pi}\left(\frac{1}{2\cosh(\pi/2)} - \frac{1}{3\cdot2\cosh(3\pi/2)} + \cdots\right) = \frac{4V_0}{\pi}(0.19927 - 0.00299 + 0.00008 - \cdots) = 0.2500\,V_0 .
$$

The series converges very fast at the centre: one term already gives $0.254\,V_0$.

(b) Imagine four problems, in each of which a different side is at $V_0$ and the other three are grounded. By symmetry each gives the same potential $V_c$ at the centre. Adding them (superposition) gives the problem with all four sides at $V_0$, whose solution is $V = V_0$ everywhere by uniqueness. So $4V_c = V_0$ and $V_c = V_0/4$ exactly.
:::
:::

### Cylindrical coordinates

In cylindrical coordinates, for problems uniform in $z$, Laplace's equation separates with $V = R(\rho)\Phi(\phi)$ into $\Phi'' + n^2\Phi = 0$ and $\rho^2R'' + \rho R' - n^2R = 0$. For the potential to be single-valued $n$ must be an integer, and the solutions are

$$
V = (A_0 + B_0\ln\rho) + \sum_{n=1}^\infty\left(A_n\rho^n + B_n\rho^{-n}\right)\left(C_n\cos n\phi + D_n\sin n\phi\right).
$$

(In spherical coordinates, axially symmetric solutions are $(A_nr^n + B_nr^{-n-1})P_n(\cos\theta)$ with Legendre polynomials $P_n$; see Cheng or Griffiths.)

::: example A conducting cylinder in a uniform field {#ex-cylinder}
A long grounded conducting cylinder of radius $a$, along the $z$-axis, is placed in a field that is uniform far away, $\mathbf E_0 = E_0\,\mathbf a_x$. Find the potential outside, the surface charge, and the maximum field.
::: solution
Far away $V\to-E_0x = -E_0\rho\cos\phi$, which suggests keeping only the $n = 1$, $\cos\phi$ terms: $V = (A\rho + B/\rho)\cos\phi$. The far condition gives $A = -E_0$, and $V(a, \phi) = 0$ for all $\phi$ gives $B = E_0a^2$. Thus

$$
V(\rho,\phi) = -E_0\left(\rho - \frac{a^2}{\rho}\right)\cos\phi .
$$

This satisfies Laplace's equation, the boundary condition on the cylinder and the condition at infinity, so by [[#thm-uniqueness]] it is the solution. On the surface the field is radial, $E_\rho = -\partial V/\partial\rho\big|_{\rho=a} = 2E_0\cos\phi$, and the induced charge is $\rho_s = \epsilon_0E_\rho = 2\epsilon_0E_0\cos\phi$: positive on the side facing downstream ($\phi = 0$) and negative on the upstream side. The maximum field, at $\phi = 0$ and $\pi$, is $2E_0$, **independent of the radius**. A conductor of circular cross-section doubles the field locally; a sphere triples it (exercise below), and sharper shapes do far worse.
:::
:::

## The method of images

Some problems with conducting planes or spheres can be solved by replacing the conductor with fictitious **image charges** placed outside the region of interest, chosen so that the conductor's surface becomes an equipotential. By uniqueness, the field in the real region is then the field of the real and image charges together.

::: theorem Image in a conducting plane {#thm-image}
A point charge $Q$ at height $h$ above an infinite grounded conducting plane $z = 0$ produces, in the region $z > 0$, the same field as $Q$ at $(0,0,h)$ together with an image charge $-Q$ at $(0,0,-h)$, with the plane removed. The same holds for line charges and for any distribution of charge above the plane, each element having its mirror image of opposite sign.
:::

::: proof
The potential of $Q$ and $-Q$ is $V = \dfrac{Q}{4\pi\epsilon_0}\left(\dfrac1{R_+} - \dfrac1{R_-}\right)$, where $R_\pm$ are the distances to $(0,0,\pm h)$. In $z > 0$ it satisfies Poisson's equation with the real charge as its only source, since the image is outside the region. On the plane $z = 0$ every point is equidistant from the two charges, so $V = 0$; and $V\to0$ at infinity. These are exactly the conditions of the real problem, so by [[#thm-uniqueness]] the solutions coincide in $z > 0$. (Below the plane the real field is zero, not the image field: the images describe only the region they are not in.)
:::

::: example A charge above a ground plane {#ex-image}
A charge $Q = 10\,\mathrm{nC}$ is $h = 5\,\mathrm{cm}$ above a large grounded metal plate. Find the induced surface charge density on the plate, its total, and the force on $Q$.
::: solution
On the plate, at distance $\rho$ from the foot of the perpendicular, both charges are at distance $\sqrt{\rho^2 + h^2}$. Their fields have equal and opposite horizontal components and equal vertical components, so the field just above the plate is

$$
E_z = -2\cdot\frac{Q}{4\pi\epsilon_0(\rho^2+h^2)}\cdot\frac{h}{\sqrt{\rho^2+h^2}} = -\frac{Qh}{2\pi\epsilon_0(\rho^2+h^2)^{3/2}} ,
$$

and $\rho_s = \epsilon_0E_z = -\dfrac{Qh}{2\pi(\rho^2+h^2)^{3/2}}$. At the foot ($\rho = 0$) this is $-Q/(2\pi h^2) = -10^{-8}/(2\pi\times0.0025) = -6.37\times10^{-7}\,\mathrm{C/m^2}$. Integrating over the plane,

$$
\int_0^\infty\rho_s\,2\pi\rho\,\mathrm d\rho = -Qh\int_0^\infty\frac{\rho\,\mathrm d\rho}{(\rho^2+h^2)^{3/2}} = -Qh\cdot\frac1h = -Q :
$$

all the flux of $Q$ ends on the plate. The force on $Q$ is the force from its image, at distance $2h$:

$$
F = \frac{Q^2}{4\pi\epsilon_0(2h)^2} = \frac{(8.988\times10^9)(10^{-8})^2}{0.1^2} = 8.99\times10^{-5}\,\mathrm N ,
$$

attractive, towards the plate.
:::
:::

::: widget contour
f: 1/sqrt(x^2 + (y - h)^2 + 0.002) - 1/sqrt(x^2 + (y + h)^2 + 0.002)
x: -2.5, 2.5
y: -2, 2.5
levels: 22
gradient: true
point: 0.5, 0.5
sliders: h=1:0.3:2:0.1
caption: A charge at height $h$ above the plane $y = 0$ and its image at $-h$. The line $y = 0$ is the zero equipotential, so a grounded conductor can be placed there without changing anything above it. Drag the point onto the plane: the field there is always perpendicular to it, as at a real conductor. Only the upper half is physical; the lower half shows the fictitious image field.
:::

The images of a line charge $\rho_L$ at height $h$ above ground give the capacitance of a **single wire over ground**, the model of an overhead line or of a wire above a circuit-board ground plane. The exact result for a wire of radius $a$ is

$$
C' = \frac{2\pi\epsilon}{\operatorname{arccosh}(h/a)} \approx \frac{2\pi\epsilon}{\ln(2h/a)} \quad (h\gg a),
$$ {#eq-wire-ground}

twice the capacitance of the two-wire line of spacing $2h$ (the plane halves the voltage for the same charge). Images also work for two planes meeting at an angle $\pi/n$ (needing $2n - 1$ images) and for spheres, where a charge $Q$ at distance $d$ from the centre of a grounded sphere of radius $a$ has an image $-Qa/d$ at distance $a^2/d$.

::: warning Images only describe the region they are not in
The image charges are bookkeeping, not real. They give the correct field only on the real side of the conductor; inside the conductor the field is zero. And the energy of a charge near a plane is **half** what you get by treating the image as real: the image moves when the charge moves, and integrating $\tfrac12\epsilon_0E^2$ over the real half-space only gives $W = -Q^2/(16\pi\epsilon_0h)$, not $-Q^2/(8\pi\epsilon_0h)$.
:::

::: quiz
A long wire carrying charge $\rho_L$ runs parallel to a grounded plane at height $h$. You double $h$. What happens to the capacitance per unit length between the wire and the plane, when $h\gg a$?
- [ ] It halves.
- [x] It decreases, but by much less than half.
- [ ] It doubles.
- [ ] It does not change, since the image moves too.
::: solution
From [[#eq-wire-ground]], $C'\approx2\pi\epsilon/\ln(2h/a)$: the height enters only through a logarithm. For $a = 1\,\mathrm{mm}$ and $h = 1\,\mathrm m$, $\ln(2000) = 7.6$; doubling $h$ makes it $\ln(4000) = 8.3$, a decrease of only $9\,\%$. Line capacitances and inductances are notoriously insensitive to geometry for this reason.
:::
:::

## Numerical solution: finite differences

When the boundaries are irregular, which in practice is almost always, we solve Laplace's equation numerically. The simplest method replaces the region by a square grid of spacing $h$ and approximates the derivatives by differences.

::: definition Five-point finite-difference approximation {#def-fd}
On a grid with spacing $h$, Taylor expansion gives $V(x\pm h, y) = V \pm hV_x + \tfrac12h^2V_{xx} \pm \tfrac16h^3V_{xxx} + O(h^4)$, so

$$
\nabla^2V \approx \frac{V_E + V_W + V_N + V_S - 4V_0}{h^2}
$$

with error $O(h^2)$, where $V_0$ is the node and $V_E$, $V_W$, $V_N$, $V_S$ are its four neighbours. Laplace's equation becomes, at every interior node,

$$
V_0 = \tfrac14\left(V_E + V_W + V_N + V_S\right) ,
$$ {#eq-fd}

and Poisson's equation adds the term $h^2\rho_v/(4\epsilon)$ on the right.
:::

Equation [[#eq-fd]] is the discrete mean-value property. Written for all interior nodes it is a large, sparse system of linear equations. Small systems can be solved directly; large ones are solved by iteration: sweep through the grid replacing each node by the average of its neighbours (**Jacobi** if the new values are used only in the next sweep, **Gauss–Seidel** if each new value is used at once), until the changes are negligible.

::: algorithm Finite-difference solution of Laplace's equation {#alg-fd}
1. Cover the region by a grid; set the boundary nodes to the electrode potentials and the interior nodes to a guess (zero, or the average of the boundary values).
2. Repeat: for every interior node, replace $V_0$ by the average of its four neighbours (Gauss–Seidel), or by $V_0 + \omega(\bar V - V_0)$ with $1 < \omega < 2$ (successive over-relaxation, which converges much faster).
3. Stop when the largest change in a sweep is below a tolerance.
4. Compute $\mathbf E$ from differences of $V$, and the charge on an electrode from $\rho_s = \epsilon E_n$ summed over its surface, to obtain capacitance.
5. Halve $h$ and repeat to check that the answer has converged.
:::

::: example A hand-sized grid {#ex-fd}
Solve the square trough ($a = b$, lid at $V_0 = 100\,\mathrm V$, other sides grounded) on a grid with spacing $h = a/3$, so that there are four interior nodes. Compare with the series [[#eq-trough]].
::: solution
By symmetry about $x = a/2$ the two upper interior nodes have the same potential $V_1$, and the two lower ones the same $V_2$. Applying [[#eq-fd]]: an upper node has neighbours $100$ (lid), $0$ (wall), $V_1$ (its partner) and $V_2$ (below); a lower node has neighbours $V_1$, $V_2$, $0$ and $0$. So

$$
4V_1 = 100 + V_1 + V_2, \qquad 4V_2 = V_1 + V_2 \quad\Longrightarrow\quad 3V_1 - V_2 = 100, \qquad -V_1 + 3V_2 = 0,
$$

giving $V_1 = 37.5\,\mathrm V$ and $V_2 = 12.5\,\mathrm V$. The series gives $38.07\,\mathrm V$ and $11.93\,\mathrm V$ at these points, so even this coarse grid is within $0.6\,\mathrm V$. With $h = a/4$ (nine nodes) the centre node comes out at exactly $25.00\,\mathrm V$, and the node just below the lid at $52.68\,\mathrm V$ against an exact $54.05\,\mathrm V$; the largest errors are near the singular corners where the lid meets the walls.
:::
:::

::: widget iterative
matrix: 3,-1; -1,3
b: 100,0
method: gauss-seidel
start: 0,0
caption: The two node equations of [[#ex-fd]], $3V_1 - V_2 = 100$ and $-V_1 + 3V_2 = 0$, solved by iteration from a start of zero. Each step replaces one node by the average implied by its equation. Switch between Jacobi and Gauss–Seidel: both converge to $(37.5, 12.5)$, Gauss–Seidel roughly twice as fast. Diagonal dominance (each node depends on the average of its neighbours) is what guarantees convergence.
:::

::: application Field solvers for interconnect
Signal-integrity engineers extract the capacitance and inductance per unit length of every trace geometry on a board or chip with **2D field solvers** that solve Laplace's equation in the cross-section by finite elements or boundary elements. The finite-element method uses triangles that fit curved and sloping boundaries better than a square grid, and refines the mesh automatically near corners where the field is singular; but each element still enforces a discrete version of the same mean-value property. The capacitance matrix of a bundle of traces, obtained by setting one conductor to $1\,\mathrm V$ and the rest to $0$ in turn, gives the crosstalk between them.
:::

::: history
Siméon Denis Poisson published his equation in 1813, correcting Laplace's equation for the interior of a body containing matter; Pierre-Simon Laplace had used $\nabla^2V = 0$ for the gravitational potential in the 1780s. William Thomson (Lord Kelvin) introduced the method of images in 1848, and James Clerk Maxwell used it extensively in his *Treatise* of 1873. The idea of solving the equation by repeated averaging on a grid was published by Lewis Fry Richardson in 1911 for stresses in a masonry dam; Richard Southwell's "relaxation methods" of the 1940s made it a hand-calculation technique for engineers, and David Young's analysis of successive over-relaxation in 1950 made it efficient on the first electronic computers.
:::

## Where this leads

Laplace's equation appears again wherever a potential-like quantity is in equilibrium: the magnetic scalar potential in current-free regions ([[electromagnetics/magnetostatics]]), steady current flow in resistive media (where $\nabla\cdot(\sigma\nabla V) = 0$ is solved with the same methods), and, in a modified form, the transverse fields of transmission lines and waveguides, whose static cross-sectional fields determine $C'$ and $L'$ ([[electromagnetics/transmission-lines]]). Separation of variables in rectangular and cylindrical coordinates gives the modes of rectangular and circular waveguides in [[rf-microwave/waveguides]], and Poisson's equation in a semiconductor is the starting point of [[semiconductor-devices/pn-junction]] and [[semiconductor-devices/mos-capacitor]].

::: summary
- With $\mathbf E = -\nabla V$ and $\nabla\cdot\mathbf D = \rho_v$, the potential obeys Poisson's equation $\nabla^2V = -\rho_v/\epsilon$, and Laplace's equation $\nabla^2V = 0$ where there is no charge.
- Harmonic functions equal their averages over spheres and have no interior extrema; a charge cannot be trapped stably by static fields.
- The uniqueness theorem: with $V$ or $\partial V/\partial n$ given on the boundary, the solution is unique. Any method that produces a solution produces *the* solution.
- One-dimensional problems integrate directly ($Ax+B$, $A\ln\rho+B$, $-A/r+B$); a uniform space charge gives a linear field and a parabolic potential, as in a $pn$ junction, where $W = \sqrt{2\epsilon V/(qN)}$.
- Separation of variables gives series solutions for rectangular and cylindrical boundaries; a cylinder in a uniform field doubles the field at its surface.
- The method of images replaces planes and spheres by fictitious charges; a charge $Q$ at height $h$ above ground is attracted with force $Q^2/(16\pi\epsilon_0h^2)$.
- Finite differences turn Laplace's equation into "each node is the average of its neighbours", solved by iteration; refine the grid to check convergence.
:::

## Exercises

::: exercise Is it a potential? {level=1 check="-4*8.854187817e-12"}
Show that $V_1 = x^2 - y^2$ satisfies Laplace's equation. The function $V_2 = x^2 + y^2$ (volts, metres) does not; what charge density, in $\mathrm{C/m^3}$, would be needed in vacuum for it to be a potential?
::: solution
$\nabla^2V_1 = 2 - 2 = 0$. For $V_2$, $\nabla^2V_2 = 4$, so Poisson's equation requires $\rho_v = -\epsilon_0\nabla^2V_2 = -4\epsilon_0 = -3.54\times10^{-11}\,\mathrm{C/m^3}$.
:::
:::

::: exercise Between concentric spheres {level=1 check="25"}
A sphere of radius $1\,\mathrm{cm}$ at $100\,\mathrm V$ is surrounded by a concentric grounded shell of radius $3\,\mathrm{cm}$. Find the potential, in volts, at $r = 2\,\mathrm{cm}$.
::: solution
$V = -A/r + B$ with $V(3) = 0$ and $V(1) = 100$ ($r$ in cm) gives $V = 100\,(1/r - 1/3)/(1 - 1/3)$. At $r = 2$: $V = 100(0.5 - 0.3333)/0.6667 = 25\,\mathrm V$. (Not $50\,\mathrm V$: the potential falls steeply near the inner sphere, where the field is strongest.)
:::
:::

::: exercise One relaxation step {level=1 check="37.5"}
On a square grid, an interior node has neighbours at $0$, $0$, $100$ and $50\,\mathrm V$. What value, in volts, does one Gauss–Seidel update give it?
::: solution
$V_0 = \tfrac14(0 + 0 + 100 + 50) = 37.5\,\mathrm V$.
:::
:::

::: exercise A wire over ground {level=2 check="2*pi*8.854187817e-12/acosh(1000)"}
A wire of radius $2\,\mathrm{mm}$ runs $2\,\mathrm m$ above flat ground. Find its capacitance to ground per metre, in $\mathrm{F/m}$. How much does the approximation $\ln(2h/a)$ differ from the exact formula?
::: solution
$h/a = 1000$, $\operatorname{arccosh}(1000) = 7.6009$, so $C' = 2\pi(8.854\times10^{-12})/7.6009 = 7.32\times10^{-12}\,\mathrm{F/m}$. The approximation uses $\ln2000 = 7.6009$ as well: the two agree to better than one part in $10^6$ at this ratio.
:::
:::

::: exercise The image force {level=2 check="1e-12/(16*pi*8.854187817e-12)"}
A charge of $1\,\mathrm{\mu C}$ is held $1\,\mathrm m$ above a grounded conducting plane. Find the force on it, in newtons.
::: solution
The image $-1\,\mathrm{\mu C}$ is $2\,\mathrm m$ away, so $F = Q^2/(4\pi\epsilon_0(2h)^2) = (8.988\times10^9)(10^{-12})/4 = 2.25\times10^{-3}\,\mathrm N$, attractive.
:::
:::

::: exercise Space charge between grounded plates {level=2 check="1e-5*1e-4/(8*8.854187817e-12)"}
The region between two grounded plates at $x = 0$ and $x = d$ contains a uniform charge density $\rho_0$ in vacuum. Solve Poisson's equation for $V(x)$ and find the maximum potential, in volts, for $\rho_0 = 10^{-5}\,\mathrm{C/m^3}$ and $d = 1\,\mathrm{cm}$.
::: solution
$V'' = -\rho_0/\epsilon_0$ gives $V = -\rho_0x^2/(2\epsilon_0) + Ax + B$; $V(0) = 0$ gives $B = 0$ and $V(d) = 0$ gives $A = \rho_0d/(2\epsilon_0)$. So $V = \rho_0x(d - x)/(2\epsilon_0)$, maximal at $x = d/2$ with $V_{\max} = \rho_0d^2/(8\epsilon_0) = 10^{-5}\times10^{-4}/(7.083\times10^{-11}) = 14.1\,\mathrm V$.
:::
:::

::: exercise Depletion width {level=2 check="sqrt(2*11.7*8.854187817e-12*10/(1.602176634e-19*1e21))"}
A one-sided silicon junction has $N_D = 10^{21}\,\mathrm m^{-3}$ on its lightly doped side and a total junction potential of $10\,\mathrm V$. Find the depletion width in metres and the peak field.
::: solution
$W = \sqrt{2\epsilon V/(qN_D)} = \sqrt{2(1.036\times10^{-10})(10)/(1.602\times10^{-19}\times10^{21})} = 3.60\times10^{-6}\,\mathrm m$, and $\abs{E_{\max}} = 2V/W = 5.6\times10^6\,\mathrm{V/m}$. Ten times lighter doping and twice the voltage give a width $\sqrt{20}\approx4.5$ times that of [[#ex-pn]].
:::
:::

::: exercise A sphere in a uniform field {level=3}
A grounded conducting sphere of radius $a$ is placed in a uniform field $E_0\,\mathbf a_z$. Show that $V = -E_0\left(r - a^3/r^2\right)\cos\theta$ outside the sphere, find the surface charge density, and show that the maximum surface field is $3E_0$.
::: hint
Check that $r\cos\theta$ and $\cos\theta/r^2$ both satisfy Laplace's equation in spherical coordinates, then impose $V(a,\theta) = 0$ and $V\to-E_0z$ far away.
:::
::: solution
$r\cos\theta = z$ is harmonic, and $\cos\theta/r^2$ is the dipole potential, harmonic for $r > 0$. The given $V$ vanishes at $r = a$ for all $\theta$ and tends to $-E_0r\cos\theta = -E_0z$ at infinity; by uniqueness it is the solution. On the surface $E_r = -\partial V/\partial r|_a = E_0(1 + 2a^3/a^3)\cos\theta = 3E_0\cos\theta$ and $E_\theta = 0$ (since $V = 0$ all over the surface), so $\rho_s = 3\epsilon_0E_0\cos\theta$, with maximum field $3E_0$ at the poles $\theta = 0, \pi$. The term $E_0a^3\cos\theta/r^2$ is the field of the induced dipole $p = 4\pi\epsilon_0a^3E_0$.
:::
:::

::: exercise Superposition in a trough {level=3}
In the square trough of [[#ex-trough-centre]], the lid is at $V_0$, the left wall at $2V_0$, and the right wall and bottom at $0$. Find the potential at the centre without summing a series, and write down the full solution in terms of [[#eq-trough]].
::: hint
Superpose two problems, each with only one non-zero side. A rotated copy of [[#eq-trough]] describes the side wall.
:::
::: solution
By superposition the solution is the sum of the lid problem (lid $V_0$, others $0$) and a left-wall problem (left wall $2V_0$, others $0$). Each single-side problem has centre potential equal to a quarter of its side potential (by the four-sides argument), so $V_c = V_0/4 + 2V_0/4 = 3V_0/4$. In full, with $a = b$, $V(x,y) = V_{\text{lid}}(x, y) + 2V_{\text{lid}}(y, a - x)$, where $V_{\text{lid}}$ is [[#eq-trough]]: rotating the trough by $90^\circ$ maps the left wall onto the lid. By uniqueness this sum is the solution, since it satisfies Laplace's equation and all four boundary conditions.
:::
:::
