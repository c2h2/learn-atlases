Move a magnet past a stationary loop of wire, and a current flows: the changing magnetic field induces an electric field, by Faraday's law. Hold the magnet still and move the loop instead, and the same current flows, now explained by the magnetic force $q\mathbf v\times\mathbf B$ on the moving charges in the wire. One phenomenon, two explanations, depending only on who is moving. Einstein opened his 1905 paper "On the electrodynamics of moving bodies" with exactly this asymmetry, and the resolution is that $\mathbf E$ and $\mathbf B$ are not separate things. They are components of a single object, the **electromagnetic field tensor**, and an observer's motion decides how that object splits into an electric part and a magnetic part.

This chapter makes the statement precise. Charge and current density combine into a four-vector, as do the scalar and vector potentials. Maxwell's equations then take a form that is manifestly the same in every inertial frame, the transformation law of the fields follows from that of four-vectors, and two combinations of $\mathbf E$ and $\mathbf B$ turn out to be the same for all observers. With the transformation in hand, the field of a uniformly moving charge, which required the Liénard–Wiechert machinery of [[electrodynamics/radiation]], follows from Coulomb's law in two lines.

The Lorentz transformation and four-vectors are those of [[relativity/four-vectors]], with the same conventions: coordinates $x^\mu = (ct, x, y, z)$, the metric $\eta_{\mu\nu} = \mathrm{diag}(1, -1, -1, -1)$, so that $x_\mu = (ct, -x, -y, -z)$, and the boost along $x$ with velocity $v = \beta c$,

$$
x'^\mu = \Lambda^\mu{}_\nu x^\nu, \qquad \Lambda = \begin{pmatrix}\gamma & -\gamma\beta & 0 & 0\\ -\gamma\beta & \gamma & 0 & 0\\ 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 1\end{pmatrix}.
$$ {#eq-boost}

Repeated indices, one up and one down, are summed. The derivative $\partial_\mu = \partial/\partial x^\mu = (c^{-1}\partial_t, \nabla)$ is a covariant four-vector, and $\partial^\mu = (c^{-1}\partial_t, -\nabla)$. The scalar product of four-vectors, such as $\partial_\mu J^\mu$ or $\partial_\mu\partial^\mu = c^{-2}\partial_t^2 - \nabla^2$, is a Lorentz invariant.

## The four-current and the four-potential {#four-current}

Electric charge is invariant: the charge of an electron is the same in every frame, as the exact neutrality of atoms in motion and the stability of charge in accelerators confirm. Consider charge density $\rho_0$ at rest in some frame. In a frame where it moves with velocity $\mathbf u$, a volume element is Lorentz-contracted by $1/\gamma_u$, so the density is $\rho = \gamma_u\rho_0$ and the current density $\mathbf J = \rho\mathbf u = \gamma_u\rho_0\mathbf u$. These are $\rho_0$ times the components of the four-velocity $U^\mu = \gamma_u(c, \mathbf u)$, which is a four-vector, and $\rho_0$ is invariant.

::: definition Four-current and four-potential {#def-four-current}
The **four-current** and **four-potential** are

$$
J^\mu = (c\rho, \mathbf J), \qquad A^\mu = \left(\frac{V}{c}, \mathbf A\right).
$$ {#eq-four-current}

Both transform as four-vectors under [[#eq-boost]].
:::

In this notation the continuity equation is $\partial_\mu J^\mu = \partial_t\rho + \nabla\cdot\mathbf J = 0$, a Lorentz scalar statement, true in all frames if in one. The Lorenz condition of [[electrodynamics/maxwell-equations#eq-lorenz]] is $\partial_\mu A^\mu = c^{-2}\partial_tV + \nabla\cdot\mathbf A = 0$, and the two wave equations $\Box V = -\rho/\varepsilon_0$ and $\Box\mathbf A = -\mu_0\mathbf J$ of [[electrodynamics/maxwell-equations#eq-wave-pot]] combine, using $\mu_0\varepsilon_0 = 1/c^2$, into

$$
\partial_\nu\partial^\nu A^\mu = \mu_0J^\mu .
$$ {#eq-wave-four}

The left side is the invariant operator $\partial_\nu\partial^\nu$ acting on a four-vector, and the right side is a four-vector: the equation has the same form in every frame. That $A^\mu$ is a four-vector is therefore not an extra assumption but a consequence of [[#eq-wave-four]], provided the Lorenz gauge is imposed in every frame (it is, since $\partial_\mu A^\mu$ is a scalar).

::: example A moving line charge carries a current {#ex-line}
A long straight line of charge with density $\lambda_0$ at rest in frame $S'$ moves with speed $v$ along its length in frame $S$. Find the charge and current per unit length in $S$, and the fields there.
::: solution
In $S'$, $J'^\mu$ per unit cross-section integrates to $(c\lambda_0, 0, 0, 0)$. Transforming to $S$, in which $S'$ moves at $+v$ along $x$, uses the inverse of [[#eq-boost]] (replace $\beta$ by $-\beta$): $c\lambda = \gamma c\lambda_0$ and $I = \gamma v\lambda_0$. So $\lambda = \gamma\lambda_0$, larger because the line is contracted, and $I = \lambda v$. In $S$ the electric field is $\mathbf E = \frac{\gamma\lambda_0}{2\pi\varepsilon_0s}\hat{\mathbf s}$ and the magnetic field is $\mathbf B = \frac{\mu_0\gamma\lambda_0v}{2\pi s}\hat{\boldsymbol\phi}$. Note that $\mathbf B = \frac{1}{c^2}\mathbf v\times\mathbf E$, with $\mathbf v = v\hat{\mathbf x}$: as we shall see in general, a field that is purely electric in one frame is, in another, accompanied by a magnetic field $\mathbf v\times\mathbf E/c^2$.
:::
:::

## The field tensor {#field-tensor}

The fields are derivatives of the potentials: $\mathbf E = -\nabla V - \partial_t\mathbf A$ and $\mathbf B = \nabla\times\mathbf A$. In four-vector language both are antisymmetric combinations of $\partial^\mu A^\nu$.

::: definition Electromagnetic field tensor {#def-field-tensor}
The **field tensor** is $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$. Its components are

$$
F^{\mu\nu} = \begin{pmatrix}
0 & -E_x/c & -E_y/c & -E_z/c\\
E_x/c & 0 & -B_z & B_y\\
E_y/c & B_z & 0 & -B_x\\
E_z/c & -B_y & B_x & 0
\end{pmatrix},
$$ {#eq-field-tensor}

with rows labelled by $\mu = 0, 1, 2, 3$ and columns by $\nu$. It is antisymmetric, $F^{\nu\mu} = -F^{\mu\nu}$.
:::

To see the entries, compute two. With $\partial^0 = c^{-1}\partial_t$ and $\partial^1 = -\partial_x$,

$$
F^{01} = \partial^0A^1 - \partial^1A^0 = \frac1c\frac{\partial A_x}{\partial t} + \frac{\partial}{\partial x}\frac{V}{c} = -\frac{1}{c}\left(-\frac{\partial V}{\partial x} - \frac{\partial A_x}{\partial t}\right) = -\frac{E_x}{c},
$$

$$
F^{12} = \partial^1A^2 - \partial^2A^1 = -\frac{\partial A_y}{\partial x} + \frac{\partial A_x}{\partial y} = -(\nabla\times\mathbf A)_z = -B_z .
$$

The others follow by cyclic relabelling. The six independent components of an antisymmetric $4\times4$ array are exactly the six components of $\mathbf E$ and $\mathbf B$. A gauge transformation $A^\mu\to A^\mu - \partial^\mu\lambda$ (which is $V\to V - \partial_t\lambda$, $\mathbf A\to\mathbf A + \nabla\lambda$) leaves $F^{\mu\nu}$ unchanged, since partial derivatives commute.

::: theorem Covariant Maxwell equations {#thm-covariant}
Maxwell's equations are equivalent to

$$
\partial_\mu F^{\mu\nu} = \mu_0J^\nu
$$ {#eq-covariant-inhom}

together with the **Bianchi identity**

$$
\partial^\lambda F^{\mu\nu} + \partial^\mu F^{\nu\lambda} + \partial^\nu F^{\lambda\mu} = 0 .
$$ {#eq-bianchi}

The first contains Gauss's law ($\nu = 0$) and the Ampère–Maxwell law ($\nu = 1, 2, 3$); the second contains $\nabla\cdot\mathbf B = 0$ and Faraday's law. The Lorentz force on a charge $q$ with four-velocity $U^\mu$ is

$$
\deriv{p^\mu}{\tau} = qF^{\mu\nu}U_\nu .
$$ {#eq-covariant-force}
:::

::: proof
For $\nu = 0$: $\partial_\mu F^{\mu0} = \partial_iF^{i0} = \sum_i\partial_i(E_i/c) = c^{-1}\nabla\cdot\mathbf E$, and $\mu_0J^0 = \mu_0c\rho$, so $\nabla\cdot\mathbf E = \mu_0c^2\rho = \rho/\varepsilon_0$. For $\nu = 1$:

$$
\partial_\mu F^{\mu1} = \frac1c\frac{\partial}{\partial t}\left(-\frac{E_x}{c}\right) + \frac{\partial B_z}{\partial y} - \frac{\partial B_y}{\partial z} = -\frac{1}{c^2}\frac{\partial E_x}{\partial t} + (\nabla\times\mathbf B)_x ,
$$

and setting this equal to $\mu_0J_x$ gives the $x$-component of the Ampère–Maxwell law; $\nu = 2, 3$ are the same by relabelling. For the Bianchi identity, substitute $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$: the six terms cancel in pairs because partial derivatives commute, so it holds for any field derived from potentials. Conversely, its components are the homogeneous equations. With $(\lambda, \mu, \nu) = (1, 2, 3)$, and $\partial^i = -\partial_i$,

$$
\partial^1F^{23} + \partial^2F^{31} + \partial^3F^{12} = (-\partial_x)(-B_x) + (-\partial_y)(-B_y) + (-\partial_z)(-B_z) = \nabla\cdot\mathbf B = 0 .
$$

With $(0, 1, 2)$, using $F^{20} = E_y/c$ and $F^{01} = -E_x/c$,

$$
\partial^0F^{12} + \partial^1F^{20} + \partial^2F^{01} = -\frac1c\left(\frac{\partial B_z}{\partial t} + \frac{\partial E_y}{\partial x} - \frac{\partial E_x}{\partial y}\right) = -\frac1c\left(\frac{\partial B_z}{\partial t} + (\nabla\times\mathbf E)_z\right) = 0,
$$

the $z$-component of Faraday's law; $(0, 2, 3)$ and $(0, 3, 1)$ give the other two. Any other choice of indices either repeats one of these or vanishes by antisymmetry.

For the force, $U_\nu = \gamma(c, -\mathbf u)$. The spatial component $\mu = 1$ is

$$
F^{1\nu}U_\nu = F^{10}\gamma c + F^{12}(-\gamma u_y) + F^{13}(-\gamma u_z) = \gamma\bigl(E_x + u_yB_z - u_zB_y\bigr) = \gamma(\mathbf E + \mathbf u\times\mathbf B)_x .
$$

Since $\dd\tau = \dd t/\gamma$, $\dd\mathbf p/\dd t = q(\mathbf E + \mathbf u\times\mathbf B)$, the Lorentz force with relativistic momentum. The time component is $F^{0\nu}U_\nu = \sum_i(-E_i/c)(-\gamma u_i) = \gamma\mathbf E\cdot\mathbf u/c$, so $\dd(\gamma mc^2)/\dd t = q\mathbf E\cdot\mathbf u$: the rate of work.
:::

Both [[#eq-covariant-inhom]] and [[#eq-bianchi]] are tensor equations: if they hold in one frame, they hold in all, provided $F^{\mu\nu}$ transforms as a tensor. That is the content of relativistic invariance of electrodynamics. Maxwell's equations, written in 1865, needed no modification for special relativity; it was mechanics that had to change.

::: remark Gauge invariance requires charge conservation
The interaction of a current with the field enters the action of the theory as $-\int J_\mu A^\mu\,\dd^4x$. Under a gauge transformation $A^\mu\to A^\mu - \partial^\mu\lambda$ this changes by $\int J_\mu\partial^\mu\lambda\,\dd^4x = -\int\lambda\,\partial^\mu J_\mu\,\dd^4x$ after integrating by parts. The physics is unchanged for every $\lambda$ only if $\partial_\mu J^\mu = 0$. Gauge invariance and local charge conservation are two faces of one fact; the same link, made in reverse, is how the gauge principle of [[particles]] turns a conserved charge into a force-carrying field.
:::

::: remark The energy–momentum tensor
The conservation laws of [[electrodynamics/maxwell-equations]] also unite. The symmetric tensor $T^{\mu\nu} = \frac{1}{\mu_0}\left(-F^{\mu\alpha}F^\nu{}_\alpha + \frac14\eta^{\mu\nu}F_{\alpha\beta}F^{\alpha\beta}\right)$, with the sign conventions used here, has $T^{00} = u$, the energy density; $T^{0i} = S_i/c$, the Poynting vector; and $T^{ij}$ equal to minus the Maxwell stress tensor. Maxwell's equations imply $\partial_\mu T^{\mu\nu} = -F^{\nu\lambda}J_\lambda$, whose $\nu = 0$ component is Poynting's theorem and whose spatial components are the momentum balance with the Lorentz force density. Energy flux and momentum density are the same components $T^{0i} = T^{i0}$, which is why the momentum density of the field is $\mathbf S/c^2$.
:::

::: example Hyperbolic motion {#ex-hyperbolic}
An electron starts from rest in a uniform field $E = 1.00\times10^{6}\,\mathrm{V/m}$. Using [[#eq-covariant-force]], find its speed and the distance travelled after $10.0\,\mathrm{ns}$, and compare with Newtonian mechanics.
::: solution
The spatial part of [[#eq-covariant-force]] is $\dd\mathbf p/\dd t = q\mathbf E$ with $\mathbf p = \gamma m\mathbf v$. For a constant field and a start from rest, $p = eEt$ (taking the direction of motion as positive). Then $\gamma = \sqrt{1 + (p/mc)^2}$ and $v = pc/\sqrt{p^2 + m^2c^2}$. With $eEt = (1.602\times10^{-19})(1.00\times10^{6})(1.00\times10^{-8}) = 1.602\times10^{-21}\,\mathrm{kg\,m/s}$ and $m_ec = 2.731\times10^{-22}\,\mathrm{kg\,m/s}$, $p/m_ec = 5.87$, so

$$
\gamma = \sqrt{1 + 5.87^2} = 5.95, \qquad \frac vc = \frac{5.87}{5.95} = 0.986 .
$$

Integrating $v = c\,(at/c)/\sqrt{1 + (at/c)^2}$, with $a = eE/m_e$, gives $x = \frac{c^2}{a}\left(\sqrt{1 + (at/c)^2} - 1\right) = 2.53\,\mathrm{m}$. The time component of [[#eq-covariant-force]] says the kinetic energy equals the work done, $(\gamma - 1)m_ec^2 = eEx$, and indeed $(5.95 - 1)(0.511\,\mathrm{MeV}) = 2.53\,\mathrm{MeV} = e\times(1.00\,\mathrm{MV/m})\times(2.53\,\mathrm{m})$. Newtonian mechanics would give $v = at = 5.9c$ and $x = \frac12at^2 = 8.8\,\mathrm{m}$. The worldline $x(t)$ is a hyperbola in spacetime, which is why this is called hyperbolic motion; its proper acceleration is constant.
:::
:::

## How the fields transform {#transformation}

A rank-two tensor transforms with one factor of $\Lambda$ per index, $F'^{\mu\nu} = \Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}$, which in matrix form is $F' = \Lambda F\Lambda\T$.

::: theorem Transformation of the fields {#thm-transform}
Under a boost with velocity $\mathbf v$, the components of the fields parallel and perpendicular to $\mathbf v$ transform as

$$
\mathbf E'_\parallel = \mathbf E_\parallel, \qquad \mathbf B'_\parallel = \mathbf B_\parallel, \qquad \mathbf E'_\perp = \gamma\bigl(\mathbf E + \mathbf v\times\mathbf B\bigr)_\perp, \qquad \mathbf B'_\perp = \gamma\left(\mathbf B - \frac{\mathbf v\times\mathbf E}{c^2}\right)_\perp .
$$ {#eq-transform}

For a boost along $x$ these read

$$
\begin{aligned}
E'_x &= E_x, & E'_y &= \gamma(E_y - vB_z), & E'_z &= \gamma(E_z + vB_y),\\
B'_x &= B_x, & B'_y &= \gamma\left(B_y + \frac{v}{c^2}E_z\right), & B'_z &= \gamma\left(B_z - \frac{v}{c^2}E_y\right).
\end{aligned}
$$ {#eq-transform-x}
:::

::: proof
Use [[#eq-boost]], whose only non-trivial entries are $\Lambda^0{}_0 = \Lambda^1{}_1 = \gamma$ and $\Lambda^0{}_1 = \Lambda^1{}_0 = -\gamma\beta$. For $F'^{01}$,

$$
F'^{01} = \Lambda^0{}_\alpha\Lambda^1{}_\beta F^{\alpha\beta} = \Lambda^0{}_0\Lambda^1{}_1F^{01} + \Lambda^0{}_1\Lambda^1{}_0F^{10} = \gamma^2F^{01} - \gamma^2\beta^2F^{01} = F^{01},
$$

using $F^{00} = F^{11} = 0$ and $F^{10} = -F^{01}$; so $E'_x = E_x$. For $F'^{02}$, the second index is untouched ($\Lambda^2{}_\beta = \delta^2_\beta$):

$$
F'^{02} = \Lambda^0{}_0F^{02} + \Lambda^0{}_1F^{12} = \gamma\left(-\frac{E_y}{c}\right) - \gamma\beta(-B_z),
$$

and $F'^{02} = -E'_y/c$ gives $E'_y = \gamma(E_y - vB_z)$. For $F'^{12}$,

$$
F'^{12} = \Lambda^1{}_0F^{02} + \Lambda^1{}_1F^{12} = -\gamma\beta\left(-\frac{E_y}{c}\right) + \gamma(-B_z),
$$

and $F'^{12} = -B'_z$ gives $B'_z = \gamma(B_z - \beta E_y/c) = \gamma(B_z - vE_y/c^2)$. The components $F'^{03}$ and $F'^{13}$ give $E'_z$ and $B'_y$ the same way, and $F'^{23} = F^{23}$ gives $B'_x = B_x$. For $\mathbf v = v\hat{\mathbf x}$, $\mathbf v\times\mathbf B = v(0, -B_z, B_y)$ and $\mathbf v\times\mathbf E = v(0, -E_z, E_y)$, so the components agree with [[#eq-transform]], which is written without reference to axes and so holds for a boost in any direction.
:::

For $v\ll c$, $\mathbf E'\approx\mathbf E + \mathbf v\times\mathbf B$: the electric field in the frame of a moving charge is what the lab calls the full Lorentz force per unit charge. That is the resolution of Einstein's magnet-and-loop puzzle. In the loop's frame there is an electric field $\mathbf v\times\mathbf B$ that drives the current; in the magnet's frame there is only $\mathbf B$, and the force $q\mathbf v\times\mathbf B$ acts on the moving charges. Both give the same emf.

::: warning The fields are not the spatial parts of four-vectors
It is tempting to transform $\mathbf E$ as if it were a three-vector part of some four-vector, contracting or dilating one component. It is not: $\mathbf E$ and $\mathbf B$ mix with each other, the components *parallel* to the boost are the ones that do not change, and the perpendicular components grow by $\gamma$, the opposite of what length contraction would suggest. Nor is $\mathbf B$ "the field seen by a moving observer"; both observers see both fields, related by [[#eq-transform]]. When in doubt, go back to $F'^{\mu\nu} = \Lambda^\mu{}_\alpha\Lambda^\nu{}_\beta F^{\alpha\beta}$, or check with charges and currents as in [[#ex-capacitor]].
:::

::: example A moving capacitor {#ex-capacitor}
A large parallel-plate capacitor, with surface charge densities $\pm\sigma_0$ and field $E_0 = \sigma_0/\varepsilon_0$ in its rest frame $S'$, moves at speed $v$ through the lab. Find the lab fields from the charges and currents directly, (a) when the plates are parallel to the velocity and (b) when they are perpendicular to it, and compare with [[#eq-transform]].
::: solution
(a) Let the plates be parallel to the $xz$-plane, so the field is along $y$, and let them move along $x$. In the lab a patch of plate is contracted along $x$ by $1/\gamma$ while carrying the same charge (charge is invariant), so $\sigma = \gamma\sigma_0$, and $E_y = \sigma/\varepsilon_0 = \gamma E_0$. The moving charge sheets are also surface currents $K = \sigma v$ in opposite directions on the two plates, which, like a pair of current sheets ([[electrodynamics/magnetostatics]]), produce a field between them of magnitude $\mu_0K = \mu_0\gamma\sigma_0v = \gamma vE_0/c^2$, along $z$. The inverse of [[#eq-transform-x]], with $\mathbf B' = \mathbf 0$, gives $E_y = \gamma E'_y$ and $B_z = \gamma vE'_y/c^2$: the same.

(b) Now let the plates be perpendicular to $x$, so the field is along $x$. The plates' area is perpendicular to the motion and is not contracted, so $\sigma = \sigma_0$ and $E_x = E_0$; the plates move along their normal, the currents produce no field between them, and $B = 0$. Again [[#eq-transform-x]] agrees: $E_x = E'_x$. The transformation law is nothing more than charge invariance plus length contraction, applied to whatever sources produce the field.
:::
:::

::: example Magnetism as a relativistic effect {#ex-purcell}
A long wire carries current $I$ and is electrically neutral in the lab. A charge $q$ moves parallel to it at distance $s$ with speed $v$, in the direction of the conventional current. Find the force on $q$ in the lab and in the rest frame of $q$, and show that they agree.
::: solution
In the lab, $B = \mu_0I/(2\pi s)$ and $\mathbf E = \mathbf 0$. The force is $qvB = \frac{\mu_0qvI}{2\pi s}$, directed towards the wire (parallel currents attract).

In the rest frame $S'$ of $q$, moving at $+v$ along the wire, the charge is at rest and only $\mathbf E'$ can push it. The wire's four-current per unit cross-section integrates to $(c\lambda, I) = (0, I)$ in the lab. Transforming with [[#eq-boost]],

$$
c\lambda' = \gamma\left(c\lambda - \beta I\right) = -\gamma\beta I, \qquad \lambda' = -\frac{\gamma vI}{c^2}.
$$

The wire is negatively charged in $S'$. In the lab the densities of the fixed ions and of the drifting electrons cancel; in $S'$ the two populations move at different velocities, their densities transform by different factors, and the cancellation fails at order $vu/c^2$, with $u$ the drift speed. Its field at $q$ is radial, $E' = \lambda'/(2\pi\varepsilon_0s)$, giving a force $q\lambda'/(2\pi\varepsilon_0s) = -\frac{\gamma qvI}{2\pi\varepsilon_0c^2s} = -\gamma\frac{\mu_0qvI}{2\pi s}$, towards the wire. Transverse forces transform as $F_\perp = F'_\perp/\gamma$ (from [[#eq-covariant-force]]: $\dd p_\perp$ is invariant while $\dd t = \gamma\,\dd t'$), so the lab force is $\frac{\mu_0qvI}{2\pi s}$, as before. Alternatively, [[#eq-transform]] gives directly $\mathbf E' = \gamma\mathbf v\times\mathbf B$, of magnitude $\gamma vB$.

For $I = 10.0\,\mathrm{A}$ and $v = 1.00\times10^{6}\,\mathrm{m/s}$, $\lambda' = 1.11\times10^{-10}\,\mathrm{C/m}$. That tiny charge, about $7\times10^{8}$ electrons per metre out of the $10^{23}$ or so per metre that are moving, produces the whole magnetic force: magnetism is a small relativistic correction to electrostatics that is visible only because the huge electric forces cancel so precisely in neutral matter.
:::
:::

::: widget plot
f: (1 - x*s)/sqrt(1 - x^2); (s - x)/sqrt(1 - x^2); ((1 - x*s)^2 - (s - x)^2)/(1 - x^2)
x: 0, 0.95
y: -2, 3
sliders: s=0.5:0:0.95:0.01
labels: E′/E; cB′/E; (E′² − c²B′²)/E²
caption: Lab fields $E_y = E$ and $cB_z = sE$ (perpendicular, with $cB < E$), seen from a frame moving along $x$ at $\beta$ (horizontal axis), by [[#eq-transform-x]]. The magnetic field falls through zero at $\beta = s$: in that frame the field is purely electric. The third curve, $E'^2 - c^2B'^2$, stays flat at $1 - s^2$ for every $\beta$, though both fields change: it is an invariant. Move $s$ and watch the zero of $cB'$ follow it; with $cB > E$ no boost can remove the magnetic field, and instead $E'$ could be made to vanish.
:::

### The invariants {#invariants}

From a tensor one can build scalars by contracting all its indices. For the field tensor there are two independent ones.

::: theorem Invariants of the field {#thm-invariants}
The quantities

$$
\mathbf E\cdot\mathbf B \qquad\text{and}\qquad E^2 - c^2B^2
$$ {#eq-invariants}

have the same value in every inertial frame. In tensor form, $F_{\mu\nu}F^{\mu\nu} = -2(E^2/c^2 - B^2)$.
:::

::: proof
Rotations preserve dot products, so it suffices to check a boost along $x$, using [[#eq-transform-x]]. The parallel components are unchanged. For the perpendicular part of $\mathbf E'\cdot\mathbf B'$,

$$
\begin{aligned}
E'_yB'_y + E'_zB'_z &= \gamma^2\Bigl[(E_y - vB_z)\Bigl(B_y + \tfrac{v}{c^2}E_z\Bigr) + (E_z + vB_y)\Bigl(B_z - \tfrac{v}{c^2}E_y\Bigr)\Bigr]\\
&= \gamma^2\Bigl[E_yB_y + E_zB_z - \tfrac{v^2}{c^2}(E_yB_y + E_zB_z)\Bigr] = E_yB_y + E_zB_z ,
\end{aligned}
$$

since the cross terms $\pm\frac{v}{c^2}E_yE_z$ and $\mp vB_yB_z$ cancel and $\gamma^2(1 - v^2/c^2) = 1$. For the second invariant,

$$
\begin{aligned}
E'^2_\perp - c^2B'^2_\perp &= \gamma^2\Bigl[(E_y - vB_z)^2 + (E_z + vB_y)^2 - c^2\Bigl(B_y + \tfrac{v}{c^2}E_z\Bigr)^2 - c^2\Bigl(B_z - \tfrac{v}{c^2}E_y\Bigr)^2\Bigr]\\
&= \gamma^2\Bigl[(E_y^2 + E_z^2)\Bigl(1 - \tfrac{v^2}{c^2}\Bigr) - c^2(B_y^2 + B_z^2)\Bigl(1 - \tfrac{v^2}{c^2}\Bigr)\Bigr] = E_\perp^2 - c^2B_\perp^2,
\end{aligned}
$$

where again the cross terms $-2vE_yB_z + 2vE_zB_y$ cancel against $-2vB_yE_z + 2vB_zE_y$. For the tensor form, lowering both indices changes the sign of the $0i$ entries only, so $F_{\mu\nu}F^{\mu\nu} = 2\sum_i(-E_i^2/c^2) + 2\sum_iB_i^2$.
:::

The invariants classify fields. If $\mathbf E\cdot\mathbf B\ne0$, no frame has a purely electric or purely magnetic field. If $\mathbf E\cdot\mathbf B = 0$ and $E > cB$, there is a frame in which $\mathbf B' = \mathbf 0$; if $E < cB$, one in which $\mathbf E' = \mathbf 0$. A plane wave has both invariants zero, $\mathbf E\perp\mathbf B$ and $E = cB$, so it looks like a plane wave to every observer, though its amplitude and frequency change by the Doppler factor.

::: example A plane wave seen by a receding observer {#ex-doppler}
A plane wave $\mathbf E = E_0\cos(kx - \omega t)\hat{\mathbf y}$, $\mathbf B = (E_0/c)\cos(kx - \omega t)\hat{\mathbf z}$ travels along $x$. Find its amplitude, frequency and intensity in a frame moving at $\beta$ along $x$. Evaluate the amplitude for $E_0 = 1.00\times10^{3}\,\mathrm{V/m}$ and $\beta = 0.600$.
::: solution
By [[#eq-transform-x]], $E'_y = \gamma(E_y - vB_z) = \gamma(1 - \beta)E_y$ and $cB'_z = \gamma(cB_z - \beta E_y) = \gamma(1-\beta)E_y$. So the wave is still a plane wave, $E' = cB'$, with amplitude multiplied by

$$
\gamma(1-\beta) = \frac{1 - \beta}{\sqrt{(1-\beta)(1+\beta)}} = \sqrt{\frac{1-\beta}{1+\beta}} .
$$

The phase $kx - \omega t = -k_\mu x^\mu$ with $k^\mu = (\omega/c, k, 0, 0)$ is a Lorentz scalar (it counts wave crests, which every observer counts the same), so $k^\mu$ is a four-vector and $\omega' = \gamma(\omega - vk) = \gamma(1-\beta)\omega$: the frequency is reduced by the same factor, the relativistic Doppler shift of [[relativity/velocity-energy]]. The intensity, proportional to $E'^2$, falls by $(1-\beta)/(1+\beta)$. For $\beta = 0.600$, the factor is $\sqrt{0.4/1.6} = 0.500$, so $E'_0 = 500\,\mathrm{V/m}$, the frequency halves, and the intensity drops to a quarter. In photon language: each photon's energy halves, and the receding observer meets photons at half the rate.
:::
:::

::: example The E×B drift {#ex-drift}
Uniform fields $\mathbf E = E\hat{\mathbf y}$ and $\mathbf B = B\hat{\mathbf z}$ with $E < cB$ fill a region. Find the frame in which the electric field vanishes, and describe the motion of a charge released from rest in the lab. Evaluate the speed for $E = 1.00\times10^{4}\,\mathrm{V/m}$ and $B = 1.00\times10^{-2}\,\mathrm{T}$.
::: solution
Try a boost along $x$, perpendicular to both fields. By [[#eq-transform-x]], $E'_y = \gamma(E - vB)$, which vanishes for $v = E/B$; this is less than $c$ because $E < cB$. In vector form the velocity is

$$
\mathbf v_d = \frac{\mathbf E\times\mathbf B}{B^2},
$$

since $\hat{\mathbf y}\times\hat{\mathbf z} = \hat{\mathbf x}$. In that frame the field is purely magnetic, $B' = \gamma(B - vE/c^2) = B/\gamma$, and a charge simply circles at the cyclotron frequency. Seen from the lab, a charge released from rest has velocity $-\mathbf v_d$ in the drifting frame; it circles there, so in the lab it moves along a cycloid whose guiding centre drifts at $\mathbf v_d$, whatever the sign of its charge. Here

$$
v_d = \frac{E}{B} = \frac{1.00\times10^{4}}{1.00\times10^{-2}} = 1.00\times10^{6}\,\mathrm{m/s},
$$

about $0.003c$, so $\gamma\approx1$ and the non-relativistic picture is accurate. The drift is independent of charge and mass, so electrons and ions drift together, which is why the $\mathbf E\times\mathbf B$ drift moves whole plasmas in the Earth's magnetosphere and in tokamaks.
:::
:::

::: quiz
In the lab there is a pure magnetic field $\mathbf B$. Which statements about another inertial frame are correct?
- [x] It may see an electric field, perpendicular to both $\mathbf v$ and $\mathbf B$.
- [ ] It may see a purely electric field if it moves fast enough.
- [x] $\mathbf E'\cdot\mathbf B' = 0$ in every frame.
- [ ] $\lvert\mathbf B'\rvert$ is the same in every frame.
::: solution
By [[#eq-transform]], $\mathbf E' = \gamma(\mathbf v\times\mathbf B)_\perp$, perpendicular to $\mathbf v$ and $\mathbf B$. The invariants are $\mathbf E\cdot\mathbf B = 0$ and $E^2 - c^2B^2 = -c^2B^2 < 0$ in the lab, so in every frame $\mathbf E'\cdot\mathbf B' = 0$ and $c^2B'^2 = E'^2 + c^2B^2\ge c^2B^2$: the magnetic field can be made larger but never removed, and never made smaller than $B$.
:::
:::

::: quiz
In some frame $\mathbf E = E\hat{\mathbf x}$ and $\mathbf B = B\hat{\mathbf x}$, parallel and both non-zero. Which statements are correct?
- [x] No inertial frame sees a purely electric field.
- [ ] A boost along $x$ changes both fields.
- [x] A boost along $y$ produces fields that are no longer parallel.
- [ ] A fast enough boost makes $E^2 - c^2B^2$ change sign.
::: solution
$\mathbf E\cdot\mathbf B = EB\ne0$ is invariant, so neither field can vanish in any frame. For a boost along $x$ both fields are parallel components and are unchanged by [[#eq-transform]]. For a boost $v\hat{\mathbf y}$ both are perpendicular, and $\mathbf E' = \gamma(E\hat{\mathbf x} - vB\hat{\mathbf z})$, $\mathbf B' = \gamma(B\hat{\mathbf x} + (vE/c^2)\hat{\mathbf z})$: the electric field tilts one way and the magnetic field the other, so they are no longer parallel. $E^2 - c^2B^2$ is invariant and cannot change sign.
:::
:::

## The field of a uniformly moving charge {#moving-charge}

In its rest frame, a point charge has only a Coulomb field. The field in any other frame follows from [[#thm-transform]].

::: theorem Field of a uniformly moving charge {#thm-moving}
A charge $q$ moves with constant velocity $\mathbf v = v\hat{\mathbf x}$. Let $\mathbf R$ be the vector from its *present* position to the field point, and $\psi$ the angle between $\mathbf R$ and $\mathbf v$. Then

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0}\,\frac{1 - \beta^2}{(1 - \beta^2\sin^2\psi)^{3/2}}\,\frac{\hat{\mathbf R}}{R^2}, \qquad \mathbf B = \frac{1}{c^2}\mathbf v\times\mathbf E .
$$ {#eq-moving}
:::

::: proof
Let $S'$ be the rest frame of the charge, moving at $+v$ along $x$ relative to the lab $S$, with the charge at the origin of $S'$ and the origins coinciding at $t = 0$. In $S'$, $\mathbf B' = \mathbf 0$ and $\mathbf E' = \frac{q}{4\pi\varepsilon_0}\frac{\mathbf r'}{r'^3}$. The inverse of [[#eq-transform-x]] (replace $v$ by $-v$ and exchange primed and unprimed) with $\mathbf B' = \mathbf 0$ gives

$$
E_x = E'_x, \qquad E_y = \gamma E'_y, \qquad E_z = \gamma E'_z, \qquad B_y = -\frac{\gamma v}{c^2}E'_z, \qquad B_z = \frac{\gamma v}{c^2}E'_y .
$$

The field point has lab coordinates $(x, y, z)$ at lab time $t$, and $S'$ coordinates $x' = \gamma(x - vt)$, $y' = y$, $z' = z$. Write $\mathbf R = (x - vt, y, z)$, the vector from the charge's present position. Then

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0r'^3}\bigl(\gamma(x - vt),\ \gamma y,\ \gamma z\bigr) = \frac{q\gamma}{4\pi\varepsilon_0}\frac{\mathbf R}{r'^3},
$$

which points radially from the present position. The denominator is

$$
r'^2 = \gamma^2(x - vt)^2 + y^2 + z^2 = \gamma^2R^2\cos^2\psi + R^2\sin^2\psi = \gamma^2R^2\bigl(1 - \beta^2\sin^2\psi\bigr),
$$

using $1 = \gamma^2(1 - \beta^2)$ in the form $\sin^2\psi = \gamma^2(1-\beta^2)\sin^2\psi$. Substituting, $\mathbf E = \frac{q}{4\pi\varepsilon_0}\frac{\gamma\mathbf R}{\gamma^3R^3(1 - \beta^2\sin^2\psi)^{3/2}}$, which is [[#eq-moving]] since $1/\gamma^2 = 1 - \beta^2$. For $\mathbf B$, the two non-zero components are $\frac{v}{c^2}$ times $(-E_z, E_y)$ in the $(y,z)$ slots, which is $\frac{1}{c^2}\mathbf v\times\mathbf E$.
:::

The field points away from where the charge *is*, not from where it was, even though no signal travels faster than light: for uniform motion the retarded position and velocity determine the present position, and the Liénard–Wiechert potential of [[electrodynamics/radiation]] showed the same thing. The field is weaker than Coulomb's ahead of and behind the charge, by $1 - \beta^2 = 1/\gamma^2$, and stronger at right angles, by $\gamma$. For a fast charge it is flattened into a pancake perpendicular to the motion, with angular width of order $1/\gamma$. Gauss's law still holds: the total flux is $q/\varepsilon_0$, redistributed.

The same result follows even more quickly from the potentials. In $S'$, $A'^\mu = (V'/c, \mathbf 0)$ with $V' = q/(4\pi\varepsilon_0r')$. Transforming the four-vector back to the lab, $V = \gamma V'$ and $\mathbf A = \gamma\mathbf vV'/c^2 = \mathbf vV/c^2$, with $r' = \gamma R\sqrt{1 - \beta^2\sin^2\psi}$ as in the proof:

$$
V = \frac{q}{4\pi\varepsilon_0}\frac{1}{R\sqrt{1 - \beta^2\sin^2\psi}}, \qquad \mathbf A = \frac{\mathbf v}{c^2}V,
$$

which is exactly the Liénard–Wiechert potential of a uniformly moving charge rewritten in terms of the present position in [[electrodynamics/radiation]]. The laborious retarded-time algebra and a two-line Lorentz boost agree, as they must, since the retarded potentials are themselves Lorentz covariant.

::: remark Larmor's formula is invariant
The energy radiated by a charge in a time $\dd t$ and the time itself transform in the same way (both are time components of four-vectors, $\dd E$ of the radiated four-momentum and $\dd t$ of $\dd x^\mu$, for radiation emitted symmetrically in the instantaneous rest frame), so the radiated power is a Lorentz scalar. In the instantaneous rest frame, Larmor's formula applies; writing $a^2$ there as $-a_\mu a^\mu$, with $a^\mu = \dd^2x^\mu/\dd\tau^2$ the four-acceleration, gives the invariant $P = -\frac{q^2}{6\pi\varepsilon_0c^3}a_\mu a^\mu$. Expanding $a^\mu$ in terms of the lab velocity and acceleration reproduces Liénard's formula, [[electrodynamics/radiation#eq-lienard]].
:::

::: widget plot
f: (1 - b^2)/(1 - b^2*sin(x)^2)^1.5; 1
x: 0, 3.1416
y: 0, 8
sliders: b=0.6:0:0.98:0.01
labels: E R² (moving charge); Coulomb
caption: The field strength of a uniformly moving charge, $E R^2$ in units of $q/4\pi\varepsilon_0$, against the angle $\psi$ between the line from the charge's present position and its velocity (radians). At $\beta = 0$ the curve is the flat Coulomb value $1$. At $\beta = 0.6$ the field is $0.64$ ahead and behind ($\psi = 0, \pi$) and $1.25 = \gamma$ broadside. Push $\beta$ to $0.98$: the broadside value is $\gamma = 5.0$ and the peak is only a few tenths of a radian wide, while the field along the line of motion has fallen to $0.04$. Notice that the area under the curve weighted by $\sin\psi$, the total flux, is the same for every $\beta$.
:::

::: example The pancake of an LHC proton {#ex-lhc}
A proton in the Large Hadron Collider has energy $6.80\,\mathrm{TeV}$. Find $\gamma$, the peak transverse field at a perpendicular distance of $1.00\,\mathrm{mm}$ from its path, and the duration of the field pulse felt at that point.
::: solution
With $m_pc^2 = 0.938\,\mathrm{GeV}$, $\gamma = 6800/0.938 = 7.25\times10^{3}$. At closest approach $\psi = 90^\circ$ and [[#eq-moving]] gives $E = \gamma\frac{q}{4\pi\varepsilon_0b^2}$:

$$
E = (7.25\times10^{3})\frac{(8.988\times10^{9})(1.602\times10^{-19})}{(1.00\times10^{-3})^2} = (7.25\times10^{3})(1.44\times10^{-3}\,\mathrm{V/m}) = 10.4\,\mathrm{V/m}.
$$

The field is large only while $\lvert x - vt\rvert\lesssim b/\gamma$, so the pulse lasts about $b/(\gamma c) = 4.6\times10^{-16}\,\mathrm{s}$. The time integral of the transverse field, the quantity that sets the impulse given to a charge at distance $b$, is $\int E_y\,\dd t = q/(2\pi\varepsilon_0bv)$, independent of $\gamma$: the pancake is stronger and shorter in exact proportion. Such short, intense pulses are equivalent, by Fourier analysis, to a flux of photons, the Weizsäcker–Williams description used for photon–photon collisions at the LHC.
:::
:::

::: history From Lorentz to Minkowski
Oliver Heaviside calculated the field of a uniformly moving charge in 1888, and G. F. C. Searle examined it further in 1897, finding the flattening in the direction of motion. Hendrik Antoon Lorentz, in work from 1892 to 1904, developed the theory of electrons moving through a stationary ether and found the transformations under which Maxwell's equations keep their form, at first to first order in $v/c$ and in 1904 exactly; Joseph Larmor had obtained the exact transformation in 1897–1900. Henri Poincaré in 1905 showed that the transformations form a group and named them after Lorentz. Albert Einstein's paper of 1905 derived them from two postulates, without an ether, and gave the transformation of $\mathbf E$ and $\mathbf B$ in the form [[#eq-transform]], opening with the moving-magnet puzzle. Hermann Minkowski, in 1908, introduced the four-dimensional formalism and wrote the field as the antisymmetric tensor $F^{\mu\nu}$ of this chapter.
:::

## Where this leads {#leads}

The covariant equation [[#eq-covariant-inhom]] follows from the Lagrangian density $-\frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu} - J_\mu A^\mu$, a field theory in the sense of [[analytical-mechanics]]; its energy–momentum tensor collects the energy density, Poynting vector and Maxwell stress tensor of [[electrodynamics/maxwell-equations]] into one object. Quantising that field theory gives quantum electrodynamics, and replacing the single gauge field $A^\mu$ by several that interact with each other gives the gauge theories of the weak and strong forces in [[particles]]. In general relativity ([[gravitation]]) the same covariant equations hold with $\partial_\mu$ replaced by covariant derivatives in curved spacetime.

::: summary
- Charge is invariant; $J^\mu = (c\rho, \mathbf J)$ and $A^\mu = (V/c, \mathbf A)$ are four-vectors, the continuity equation is $\partial_\mu J^\mu = 0$, and in the Lorenz gauge $\partial_\nu\partial^\nu A^\mu = \mu_0J^\mu$.
- $\mathbf E$ and $\mathbf B$ are the six components of the antisymmetric tensor $F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$, with $F^{0i} = -E_i/c$ and $F^{12} = -B_z$.
- Maxwell's equations are $\partial_\mu F^{\mu\nu} = \mu_0J^\nu$ plus the Bianchi identity; the Lorentz force is $\dd p^\mu/\dd\tau = qF^{\mu\nu}U_\nu$. All are valid in every inertial frame.
- Under a boost, parallel components are unchanged and $\mathbf E'_\perp = \gamma(\mathbf E + \mathbf v\times\mathbf B)_\perp$, $\mathbf B'_\perp = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)_\perp$.
- $\mathbf E\cdot\mathbf B$ and $E^2 - c^2B^2$ are invariant; they decide whether a frame exists with purely electric or purely magnetic field. Perpendicular fields with $E < cB$ are removed by the drift $\mathbf E\times\mathbf B/B^2$.
- A uniformly moving charge has a radial field from its present position, reduced by $1/\gamma^2$ along the motion and enhanced by $\gamma$ across it, with $\mathbf B = \mathbf v\times\mathbf E/c^2$.
- Magnetism is the relativistic partner of electrostatics: the magnetic force between currents is the electric force of tiny charge densities that appear in a moving frame.
:::

## Exercises {#exercises}

::: exercise A magnetic field seen on the move {level=1 check="1.00"}
In the lab there is a uniform field $\mathbf B = 1.00\,\mathrm{T}\,\hat{\mathbf z}$ and no electric field. Find the electric field, in $\mathrm{MV/m}$, in a frame moving at $1.00\times10^{6}\,\mathrm{m/s}$ along $x$.
::: solution
By [[#eq-transform-x]], $E'_y = \gamma(0 - vB_z) = -\gamma vB_z$ and $E'_x = E'_z = 0$. Here $\gamma = 1.0000056$, so $E'_y = -1.00\times10^{6}\,\mathrm{V/m}$: a field of $1.00\,\mathrm{MV/m}$ along $-\hat{\mathbf y}$. A charge at rest in the moving frame feels $q\mathbf E'$, which is the lab's $q\mathbf v\times\mathbf B$; with $\mathbf v = v\hat{\mathbf x}$, $\mathbf v\times\mathbf B = -vB\hat{\mathbf y}$, as it should.
:::
:::

::: exercise A drift speed {level=1 check="1.00e6"}
Find the $\mathbf E\times\mathbf B$ drift speed in $\mathrm{m/s}$ for perpendicular fields $E = 1.00\times10^{4}\,\mathrm{V/m}$ and $B = 1.00\times10^{-2}\,\mathrm{T}$.
::: solution
From [[#ex-drift]], $v_d = E/B = 1.00\times10^{6}\,\mathrm{m/s}$. The condition $E < cB$ holds, since $cB = 3.00\times10^{6}\,\mathrm{V/m}$, so the drift frame exists.
:::
:::

::: exercise Removing the magnetic field {level=1 check="0.5"}
In the lab, $\mathbf E = 6.00\times10^{8}\,\mathrm{V/m}\,\hat{\mathbf x}$ and $\mathbf B = 1.00\,\mathrm{T}\,\hat{\mathbf y}$. Show that there is a frame in which the field is purely electric, and find its speed as a fraction of $c$.
::: solution
$\mathbf E\cdot\mathbf B = 0$ and $E^2 - c^2B^2 = (36.0 - 8.99)\times10^{16} > 0$, so by [[#thm-invariants]] such a frame exists. Boost along $\mathbf E\times\mathbf B\propto\hat{\mathbf z}$. For a boost along $z$, [[#eq-transform]] gives $\mathbf B'_\perp = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)$ with $\mathbf v\times\mathbf E = vE\,\hat{\mathbf z}\times\hat{\mathbf x} = vE\hat{\mathbf y}$, so $B'_y = \gamma(B - vE/c^2)$, which vanishes for $v = c^2B/E = (2.998\times10^{8})^2(1.00)/(6.00\times10^{8}) = 1.50\times10^{8}\,\mathrm{m/s}$, that is $\beta = 0.500$ (to three figures). In that frame $E' = \gamma(E - vB) = E/\gamma = \sqrt{E^2 - c^2B^2} = 5.20\times10^{8}\,\mathrm{V/m}$, consistent with the invariant.
:::
:::

::: exercise Time to reach 0.99c {level=1 check="12.0"}
An electron starts from rest in a uniform field of $1.00\times10^{6}\,\mathrm{V/m}$. How long, in ns, does it take to reach $0.990c$?
::: solution
From [[#ex-hyperbolic]], $p = eEt$, and $p = \gamma m_ev = m_ec\,\beta\gamma$. At $\beta = 0.990$, $\beta\gamma = 0.990/\sqrt{1 - 0.9801} = 7.02$. So $t = m_ec\,\beta\gamma/(eE) = (2.731\times10^{-22})(7.02)/((1.602\times10^{-19})(1.00\times10^{6})) = 1.20\times10^{-8}\,\mathrm{s} = 12.0\,\mathrm{ns}$. Newtonian mechanics would have it pass $c$ after $1.7\,\mathrm{ns}$.
:::
:::

::: exercise The LHC pancake {level=2 check="10.4"}
For a $6.80\,\mathrm{TeV}$ proton ($m_pc^2 = 0.938\,\mathrm{GeV}$), find the peak transverse field, in $\mathrm{V/m}$, at $1.00\,\mathrm{mm}$ from its path, and the ratio of the field $1.00\,\mathrm{mm}$ directly ahead to the Coulomb value.
::: solution
From [[#ex-lhc]], $E_\perp = \gamma e/(4\pi\varepsilon_0b^2) = 10.4\,\mathrm{V/m}$. Directly ahead, $\psi = 0$ and [[#eq-moving]] gives the Coulomb value times $1 - \beta^2 = 1/\gamma^2 = 1/(7.25\times10^{3})^2 = 1.90\times10^{-8}$.
:::
:::

::: exercise The invariant in tensor form {level=2}
Lower the indices of [[#eq-field-tensor]] with $\eta_{\mu\nu}$ to find $F_{\mu\nu}$, and compute $F_{\mu\nu}F^{\mu\nu}$ explicitly. Then compute $F^{\mu\nu}F_{\nu\mu}$ and explain the sign.
::: solution
Lowering an index multiplies by $\eta = \mathrm{diag}(1,-1,-1,-1)$, so $F_{\mu\nu} = \eta_{\mu\alpha}\eta_{\nu\beta}F^{\alpha\beta}$. Entries with one time and one space index get one factor $-1$; entries with two space indices get $(-1)^2 = 1$. Thus $F_{0i} = +E_i/c$ and $F_{ij} = F^{ij}$. In the sum $F_{\mu\nu}F^{\mu\nu}$ each of the six pairs appears twice (as $\mu\nu$ and $\nu\mu$):

$$
F_{\mu\nu}F^{\mu\nu} = 2\sum_i F_{0i}F^{0i} + 2\sum_{i<j}F_{ij}F^{ij} = 2\sum_i\left(\frac{E_i}{c}\right)\left(-\frac{E_i}{c}\right) + 2\left(B_z^2 + B_y^2 + B_x^2\right) = 2\left(B^2 - \frac{E^2}{c^2}\right).
$$

Since $F$ is antisymmetric, $F_{\nu\mu} = -F_{\mu\nu}$ and $F^{\mu\nu}F_{\nu\mu} = -F^{\mu\nu}F_{\mu\nu} = 2(E^2/c^2 - B^2)$. Both are invariant because every index is contracted; the sign depends only on which order the indices are written.
:::
:::

::: exercise Charge density of a moving current {level=2 check="111"}
A neutral wire carries $10.0\,\mathrm{A}$. Find the magnitude of its linear charge density, in $\mathrm{pC/m}$, in a frame moving along the wire at $1.00\times10^{6}\,\mathrm{m/s}$.
::: solution
From [[#ex-purcell]], $\lvert\lambda'\rvert = \gamma vI/c^2 = (1.0000056)(1.00\times10^{6})(10.0)/(2.998\times10^{8})^2 = 1.11\times10^{-10}\,\mathrm{C/m} = 111\,\mathrm{pC/m}$. It is negative if the frame moves in the direction of the conventional current.
:::
:::

::: exercise A receding observer {level=2 check="500"}
A plane wave of amplitude $1.00\times10^{3}\,\mathrm{V/m}$ is observed from a frame moving away from the source, along the direction of propagation, at $\beta = 0.600$. Find the amplitude in that frame, in $\mathrm{V/m}$, and the ratio of the observed to the emitted intensity.
::: solution
From [[#ex-doppler]], $E'_0 = \sqrt{(1-\beta)/(1+\beta)}\,E_0 = \sqrt{0.400/1.600}\times1.00\times10^{3} = 500\,\mathrm{V/m}$. The intensity scales as $E_0^2$, so it falls to $0.250$ of the original. Check with the invariants: both are zero before and after, as for any plane wave.
:::
:::

::: exercise Fields of a moving capacitor {level=2 check="0.445"}
In its rest frame a capacitor has field $1.00\times10^{5}\,\mathrm{V/m}$ between plates parallel to its velocity. It moves at $\beta = 0.800$. Find the lab electric field and the lab magnetic field between the plates, the latter in mT.
::: solution
From [[#ex-capacitor]], $E = \gamma E_0$ with $\gamma = 1/\sqrt{1 - 0.640} = 1.667$, so $E = 1.67\times10^{5}\,\mathrm{V/m}$, and $B = \gamma vE_0/c^2 = \beta E/c = (0.800)(1.667\times10^{5})/(2.998\times10^{8}) = 4.45\times10^{-4}\,\mathrm{T} = 0.445\,\mathrm{mT}$. Check the invariant: $E^2 - c^2B^2 = E^2(1 - \beta^2) = E_0^2$, its rest-frame value.
:::
:::

::: exercise A frame with parallel fields {level=3}
Let $\mathbf E$ and $\mathbf B$ be uniform with $\mathbf E\times\mathbf B\ne\mathbf 0$. Prove that a boost with velocity $\mathbf v$ along $\mathbf E\times\mathbf B$ makes $\mathbf E'$ parallel to $\mathbf B'$ if and only if

$$
\frac{\beta}{1 + \beta^2} = \frac{c\,\lvert\mathbf E\times\mathbf B\rvert}{E^2 + c^2B^2},
$$

and show that this equation always has a solution with $0 < \beta < 1$.
::: hint
With $\mathbf v\perp\mathbf E$ and $\mathbf v\perp\mathbf B$, both fields are entirely perpendicular to $\mathbf v$. Expand $\mathbf E'\times\mathbf B'$ with the BAC–CAB rule.
:::
::: solution
Since $\mathbf v$ is along $\mathbf E\times\mathbf B$, it is perpendicular to both fields, and [[#eq-transform]] gives $\mathbf E' = \gamma(\mathbf E + \mathbf v\times\mathbf B)$ and $\mathbf B' = \gamma(\mathbf B - \mathbf v\times\mathbf E/c^2)$. Expand:

$$
\frac{\mathbf E'\times\mathbf B'}{\gamma^2} = \mathbf E\times\mathbf B - \frac{\mathbf E\times(\mathbf v\times\mathbf E)}{c^2} + (\mathbf v\times\mathbf B)\times\mathbf B - \frac{(\mathbf v\times\mathbf B)\times(\mathbf v\times\mathbf E)}{c^2}.
$$

With $\mathbf v\cdot\mathbf E = \mathbf v\cdot\mathbf B = 0$: $\mathbf E\times(\mathbf v\times\mathbf E) = \mathbf vE^2$; $(\mathbf v\times\mathbf B)\times\mathbf B = -\mathbf vB^2$; and $(\mathbf v\times\mathbf B)\times(\mathbf v\times\mathbf E) = \mathbf v\,[(\mathbf v\times\mathbf B)\cdot\mathbf E] - \mathbf E\,[(\mathbf v\times\mathbf B)\cdot\mathbf v] = -\mathbf v\,[\mathbf v\cdot(\mathbf E\times\mathbf B)]$. Writing $\mathbf v = v\hat{\mathbf u}$ and $\mathbf E\times\mathbf B = P\hat{\mathbf u}$ with $P = \lvert\mathbf E\times\mathbf B\rvert$,

$$
\frac{\mathbf E'\times\mathbf B'}{\gamma^2} = \hat{\mathbf u}\left[P - v\left(\frac{E^2}{c^2} + B^2\right) + \frac{v^2}{c^2}P\right].
$$

This vanishes if and only if $P(1 + v^2/c^2) = v(E^2/c^2 + B^2)$, that is $\beta/(1+\beta^2) = cP/(E^2 + c^2B^2)$. The right side, call it $k$, satisfies $0 < k\le\frac12$, because $cP\le cEB\le\frac12(E^2 + c^2B^2)$. The function $\beta/(1+\beta^2)$ increases from $0$ to $\frac12$ as $\beta$ runs from $0$ to $1$, so there is a solution $\beta\in(0, 1]$, with $\beta = 1$ only if $k = \frac12$, which requires $\mathbf E\perp\mathbf B$ and $E = cB$, a plane-wave field, for which no frame works. In all other cases $0<\beta<1$. Explicitly $\beta = (1 - \sqrt{1 - 4k^2})/(2k)$.
:::
:::

::: exercise Broadside against head-on {level=3 check="12.1"}
For a charge moving at $\beta = 0.900$, find the ratio of the field strength at distance $R$ perpendicular to the motion to that at the same distance directly ahead, and show that the total flux through a sphere centred on the present position is still $q/\varepsilon_0$.
::: solution
From [[#eq-moving]], at $\psi = 90^\circ$ the factor is $(1-\beta^2)/(1-\beta^2)^{3/2} = \gamma$, and at $\psi = 0$ it is $1 - \beta^2 = 1/\gamma^2$. The ratio is $\gamma^3 = (1 - 0.810)^{-3/2} = (0.190)^{-3/2} = 12.1$. For the flux, $\mathbf E$ is radial from the present position, so through a sphere of radius $R$

$$
\Phi = \frac{q}{4\pi\varepsilon_0}(1-\beta^2)\int_0^\pi\frac{2\pi\sin\psi\,\dd\psi}{(1 - \beta^2\sin^2\psi)^{3/2}}.
$$

With $u = \cos\psi$, $1 - \beta^2\sin^2\psi = (1-\beta^2) + \beta^2u^2$, and $\int_{-1}^{1}\frac{\dd u}{(a^2 + \beta^2u^2)^{3/2}} = \frac{2}{a^2\sqrt{a^2+\beta^2}}$ with $a^2 = 1 - \beta^2$, so $a^2 + \beta^2 = 1$. The integral is $2\pi\cdot2/(1-\beta^2)$, and $\Phi = \frac{q}{4\pi\varepsilon_0}\cdot4\pi = q/\varepsilon_0$. Gauss's law holds in every frame, as it must, since $\nabla\cdot\mathbf E = \rho/\varepsilon_0$ is one component of the covariant equation [[#eq-covariant-inhom]].
:::
:::
