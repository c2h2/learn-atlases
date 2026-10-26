Outside the thin boundary layer and wake, the air flowing past a well-designed wing at low speed behaves almost exactly as an ideal fluid: incompressible, inviscid, and free of vorticity. That observation turns aerodynamics from an intractable problem in the Navier–Stokes equations into a problem in **Laplace's equation**, which is linear — so complicated flows can be built by adding simple ones together. This chapter develops that machinery: the velocity potential and the stream function, the four elementary flows (uniform stream, source, doublet, vortex), and their superpositions for the half-body, the cylinder and the spinning cylinder. It ends with the **Kutta–Joukowski theorem**, $L' = \rho_\infty V_\infty \Gamma$, which says that lift per unit span is the density times the speed times the *circulation* — and leaves one question open, *what fixes $\Gamma$?*, which [[aerodynamics/thin-airfoil-theory]] answers.

You will need the kinematics of [[fluid-mechanics/fluid-kinematics]] (vorticity, streamlines), Bernoulli's equation and the governing equations of [[fluid-mechanics/navier-stokes]], and the force coefficients of [[aerodynamics/aerodynamic-forces]]. Throughout, the flow is two-dimensional in the $(x, y)$ plane, with polar coordinates $(r, \theta)$, velocity $\mathbf{V} = (u, v)$ or $(V_r, V_\theta)$, and the free stream $V_\infty$ along $+x$.

## Ideal flow and why it is a good model

Three idealisations are made, and each needs a reason. **Incompressibility** ($\nabla \cdot \mathbf{V} = 0$) is accurate to a few per cent below $M_\infty \approx 0.3$; corrections for higher speeds come in [[aerodynamics/compressible-airfoils]]. **Inviscid** flow is accurate outside the boundary layer at the high Reynolds numbers of flight, $\mathrm{Re} \sim 10^6$–$10^8$, where the boundary layer is a fraction of a per cent of the chord thick; it fails in separated regions. **Irrotationality** follows from the other two by a classical result:

::: definition Vorticity and circulation {#def-circulation}
The **vorticity** of a flow is $\boldsymbol{\omega} = \nabla \times \mathbf{V}$; in two dimensions it has one component, $\omega_z = \partial v/\partial x - \partial u/\partial y$, equal to twice the local angular velocity of a fluid element. A flow with $\boldsymbol{\omega} = \mathbf{0}$ everywhere is **irrotational**. The **circulation** round a closed curve $C$ is
$$
\Gamma = -\oint_C \mathbf{V}\cdot d\mathbf{s},
$$
with $C$ traversed anticlockwise. The minus sign is the aerodynamic convention (Anderson's): it makes $\Gamma$ **positive for clockwise circulation**, which is the sense of the circulation round a wing producing positive lift with the stream from left to right. By Stokes's theorem, $\Gamma = -\iint_A \omega_z\,dA$ over the area enclosed by $C$.
:::

Kelvin's circulation theorem states that, in an inviscid, barotropic fluid under conservative body forces, the circulation round a closed curve moving with the fluid does not change. A uniform free stream has zero vorticity; following any fluid element from far upstream, its vorticity stays zero, so the flow outside the boundary layer and wake is irrotational. Vorticity is created only at solid walls, by viscosity, and is confined to the boundary layer and the wake that it sheds.

## Velocity potential and stream function

::: definition Velocity potential and stream function {#def-phi-psi}
In a two-dimensional, incompressible, irrotational flow:

- the **velocity potential** $\phi(x, y)$ is a function with $\mathbf{V} = \nabla\phi$, i.e. $u = \partial\phi/\partial x$, $v = \partial\phi/\partial y$, or $V_r = \partial\phi/\partial r$, $V_\theta = \frac{1}{r}\partial\phi/\partial\theta$;
- the **stream function** $\psi(x, y)$ is a function with $u = \partial\psi/\partial y$, $v = -\partial\psi/\partial x$, or $V_r = \frac{1}{r}\partial\psi/\partial\theta$, $V_\theta = -\partial\psi/\partial r$.

Curves $\psi = \text{const}$ are **streamlines**; curves $\phi = \text{const}$ are **equipotential lines**. The volume flow rate per unit depth between two streamlines is the difference of their $\psi$ values.
:::

::: proposition Both functions satisfy Laplace's equation {#prop-laplace}
A potential $\phi$ exists if and only if the flow is irrotational, and a stream function $\psi$ exists if and only if the two-dimensional flow is incompressible. When both hold,
$$
\nabla^2\phi = \frac{\partial^2\phi}{\partial x^2} + \frac{\partial^2\phi}{\partial y^2} = 0, \qquad \nabla^2\psi = 0,
$$
and the streamlines and equipotentials cross at right angles wherever $\mathbf{V} \ne \mathbf{0}$.
:::

::: proof
If $\mathbf{V} = \nabla\phi$ then $\omega_z = \partial^2\phi/\partial x\,\partial y - \partial^2\phi/\partial y\,\partial x = 0$; conversely, zero curl in a simply connected region makes $\int \mathbf{V}\cdot d\mathbf{s}$ path-independent, which defines $\phi$. Similarly, $u = \psi_y$, $v = -\psi_x$ makes $\partial u/\partial x + \partial v/\partial y = \psi_{yx} - \psi_{xy} = 0$; conversely, zero divergence makes $u\,dy - v\,dx$ an exact differential, which defines $\psi$. Now substitute: continuity with $\mathbf{V} = \nabla\phi$ gives $\nabla\cdot\nabla\phi = \nabla^2\phi = 0$; irrotationality with the stream-function velocities gives $\omega_z = -\psi_{xx} - \psi_{yy} = 0$. Finally $\nabla\phi\cdot\nabla\psi = \phi_x\psi_x + \phi_y\psi_y = u(-v) + v(u) = 0$, so the gradients — the normals to the two families of curves — are perpendicular. Along a streamline $d\psi = \psi_x\,dx + \psi_y\,dy = -v\,dx + u\,dy = 0$, i.e. $dy/dx = v/u$, the slope of the velocity: streamlines are tangent to $\mathbf{V}$. Between two streamlines, the flow across any curve joining them is $\int (u\,dy - v\,dx) = \int d\psi = \psi_2 - \psi_1$. Assumptions: steady (or instantaneous) two-dimensional flow; for $\phi$ to be single-valued the region must be simply connected or the circulation round every hole must be zero — a condition that the vortex below violates on purpose.
:::

Laplace's equation is **linear**: if $\phi_1$ and $\phi_2$ are solutions, so is $\phi_1 + \phi_2$, and the velocities add. That is the whole strategy of potential-flow aerodynamics. The boundary conditions are that the velocity tends to $V_\infty$ far away and that there is **no flow through the body surface**: $\mathbf{V}\cdot\mathbf{n} = 0$, which says the body surface is itself a streamline. Pick elementary solutions whose sum has a closed streamline of the right shape, and you have the flow around that shape. The pressure follows *afterwards* from Bernoulli, $C_p = 1 - V^2/V_\infty^2$, which is not linear — pressures do not superpose, velocities do.

## The elementary flows

::: proposition The four elementary flows {#prop-elementary}
The following are solutions of Laplace's equation (in polar coordinates centred on the origin, with $\Lambda$, $\kappa$, $\Gamma$ constants):

| flow | $\phi$ | $\psi$ | velocity |
|---|---|---|---|
| uniform stream | $V_\infty x = V_\infty r\cos\theta$ | $V_\infty y = V_\infty r\sin\theta$ | $u = V_\infty$, $v = 0$ |
| source (sink if $\Lambda < 0$) | $\dfrac{\Lambda}{2\pi}\ln r$ | $\dfrac{\Lambda}{2\pi}\theta$ | $V_r = \dfrac{\Lambda}{2\pi r}$, $V_\theta = 0$ |
| doublet | $\dfrac{\kappa}{2\pi}\dfrac{\cos\theta}{r}$ | $-\dfrac{\kappa}{2\pi}\dfrac{\sin\theta}{r}$ | $V_r = -\dfrac{\kappa}{2\pi}\dfrac{\cos\theta}{r^2}$, $V_\theta = -\dfrac{\kappa}{2\pi}\dfrac{\sin\theta}{r^2}$ |
| vortex (clockwise for $\Gamma > 0$) | $-\dfrac{\Gamma}{2\pi}\theta$ | $\dfrac{\Gamma}{2\pi}\ln r$ | $V_r = 0$, $V_\theta = -\dfrac{\Gamma}{2\pi r}$ |

The source emits a volume flow $\Lambda$ per unit depth; the vortex has circulation $\Gamma$ round any curve enclosing the origin and zero round any curve that does not; the doublet is the limit of a source and a sink a distance $\ell$ apart as $\ell \to 0$ with $\kappa = \Lambda\ell$ fixed and the source upstream of the sink.
:::

::: proof
In polar coordinates $\nabla^2 f = f_{rr} + f_r/r + f_{\theta\theta}/r^2$. For $\ln r$: $-1/r^2 + 1/r^2 + 0 = 0$. For $\theta$: all three terms vanish. For $\cos\theta/r$: $2\cos\theta/r^3 - \cos\theta/r^3 - \cos\theta/r^3 = 0$, and likewise for $\sin\theta/r$; $r\cos\theta = x$ and $r\sin\theta = y$ are linear in $x, y$. The velocities follow from the definitions; the pairs are consistent, e.g. for the vortex $V_\theta = \tfrac1r\phi_\theta = -\Gamma/(2\pi r)$ and $V_\theta = -\psi_r = -\Gamma/(2\pi r)$.

Source strength: the volume flow across a circle of radius $r$ is $\int_0^{2\pi} V_r\,r\,d\theta = \Lambda$, independent of $r$ — mass is conserved everywhere except at the origin, where it is created. Vortex circulation: $\Gamma_C = -\oint V_\theta\,r\,d\theta = -\left(-\tfrac{\Gamma}{2\pi r}\right)(2\pi r) = \Gamma$ round a circle; the vorticity is zero everywhere except at the origin (where it is a delta function), so by Stokes's theorem any curve not enclosing the origin has zero circulation. Doublet: a source at $(-\ell/2, 0)$ and a sink at $(+\ell/2, 0)$ have $\psi = \tfrac{\Lambda}{2\pi}(\theta_1 - \theta_2)$, where $\theta_{1,2}$ are the angles seen from each; for small $\ell$, $\theta_1 - \theta_2 \approx -\ell\sin\theta/r$, giving $\psi \to -\kappa\sin\theta/(2\pi r)$. Assumptions: two-dimensional, incompressible, irrotational flow except at the singular point.
:::

The vortex deserves a second look. It is irrotational everywhere except at its centre, yet the circulation round it is not zero: the potential $\phi = -\Gamma\theta/2\pi$ is *multivalued*, jumping by $\Gamma$ each time one goes round. That is the loophole through which lift enters potential flow.

::: example A Rankine half-body {#ex-half-body}
A source of strength $\Lambda = 10\,\mathrm{m^2/s}$ sits at the origin in a uniform stream $V_\infty = 10\,\mathrm{m/s}$. Find the stagnation point, the half-thickness of the body far downstream, and the velocity and $C_p$ on the body directly above the source.
::: solution
The combined stream function is $\psi = V_\infty r\sin\theta + \Lambda\theta/2\pi$. On the negative $x$-axis ($\theta = \pi$) the velocity is $u = V_\infty - \Lambda/(2\pi |x|)$, which vanishes at
$$
x_s = -\frac{\Lambda}{2\pi V_\infty} = -\frac{10}{2\pi(10)} = -0.159\,\mathrm{m}.
$$
The stagnation streamline has $\psi = \Lambda/2$ (its value at $\theta = \pi$); it divides the fluid from the source and is the body surface. Far downstream ($\theta \to 0$ from above), $V_\infty y \to \Lambda/2$, so the half-thickness is $h = \Lambda/(2V_\infty) = 0.5\,\mathrm{m}$ — by continuity, all the source's flow $\Lambda$ is carried downstream at $V_\infty$ inside a width $2h$. Directly above the source ($\theta = \pi/2$) the surface has $V_\infty r + \Lambda/4 = \Lambda/2$, i.e. $r = \Lambda/(4V_\infty) = 0.25\,\mathrm{m}$. There
$$
V_r = V_\infty\cos\theta + \frac{\Lambda}{2\pi r} = 0 + \frac{10}{2\pi(0.25)} = 6.37\,\mathrm{m/s}, \qquad V_\theta = -V_\infty\sin\theta = -10\,\mathrm{m/s},
$$
so $V = 11.85\,\mathrm{m/s}$ and $C_p = 1 - (1.185)^2 = -0.405$. *Sanity check:* the velocity is tangential to the body (the body slopes outward there, and $V_r > 0$ with $V_\theta < 0$ is a flow up and to the right), and the flow is faster than free stream on the shoulder, so $C_p < 0$, as on the shoulder of any blunt nose.
:::
:::

## The non-lifting cylinder and d'Alembert's paradox

Add a doublet to the uniform stream:
$$
\psi = V_\infty r\sin\theta\left(1 - \frac{R^2}{r^2}\right), \qquad R^2 = \frac{\kappa}{2\pi V_\infty}.
$$ {#eq-psi-cyl}
The streamline $\psi = 0$ consists of the $x$-axis and the circle $r = R$, so this is the flow past a circular cylinder of radius $R$. Differentiating,
$$
V_r = V_\infty\cos\theta\left(1 - \frac{R^2}{r^2}\right), \qquad V_\theta = -V_\infty\sin\theta\left(1 + \frac{R^2}{r^2}\right),
$$
and on the surface $V_r = 0$ (tangency, as required) and $V_\theta = -2V_\infty\sin\theta$. The surface pressure coefficient is
$$
C_p = 1 - 4\sin^2\theta .
$$ {#eq-cp-cyl}
It equals $1$ at the stagnation points $\theta = 0, \pi$, crosses zero at $\theta = 30^\circ, 150^\circ$ and reaches $-3$ at the top and bottom, where the flow runs at twice the free-stream speed. The distribution is symmetric fore and aft and top and bottom, so the pressure force integrates to zero in both directions: **no lift and no drag**. Zero lift is plausible by symmetry. Zero drag is d'Alembert's paradox, and the explanation is viscous: on a real cylinder the boundary layer cannot climb the adverse pressure gradient on the rear half, separates, and the rear pressure stays low (the measured base pressure coefficient is about $-1$ at subcritical Reynolds numbers), which gives drag coefficients near $1.2$. For a streamlined body, by contrast, the boundary layer stays attached nearly to the trailing edge and the potential-flow pressure distribution is close to reality — which is why potential flow is useful for wings and useless for the drag of a bluff body.

::: example Pressure on a cylinder {#ex-cylinder}
A long cylinder of radius $0.1\,\mathrm{m}$ stands in a sea-level stream at $20\,\mathrm{m/s}$. According to potential flow, what are the maximum surface speed and the minimum gauge pressure, and where on the surface does the pressure equal $p_\infty$?
::: solution
The maximum speed is $|V_\theta| = 2V_\infty = 40\,\mathrm{m/s}$ at $\theta = \pm 90^\circ$. With $q_\infty = \tfrac12(1.225)(20)^2 = 245\,\mathrm{Pa}$ and $C_p = -3$ there, the minimum gauge pressure is $-735\,\mathrm{Pa}$. $C_p = 0$ requires $\sin^2\theta = \tfrac14$: $\theta = 30^\circ, 150^\circ, 210^\circ, 330^\circ$ from the rear stagnation point (equivalently $\pm 30^\circ$ from either end of the horizontal diameter). *Sanity checks:* none of these results depends on $R$ — potential flow has no length scale besides the body — and the speed doubling is the classical "velocity ratio 2" for a circular cylinder. The real flow separates at about $80^\circ$ from the *front* stagnation point at subcritical $\mathrm{Re}$ (here $\mathrm{Re} = 2.7\times10^5$), so the predicted rear half is unreliable.
:::
:::

## The lifting cylinder

Now add a clockwise vortex of strength $\Gamma$ at the centre. A vortex has $V_r = 0$, so the circle $r = R$ stays a streamline, and the uniform-stream condition at infinity is untouched. With the constant chosen so that $\psi = 0$ on the surface,
$$
\psi = V_\infty r\sin\theta\left(1 - \frac{R^2}{r^2}\right) + \frac{\Gamma}{2\pi}\ln\frac{r}{R}, \qquad
V_\theta\big|_{r=R} = -2V_\infty\sin\theta - \frac{\Gamma}{2\pi R}.
$$ {#eq-lifting-cyl}
**Every value of $\Gamma$ gives a valid flow** past the same cylinder: the boundary-value problem has no unique solution once the body is a hole in the plane. The stagnation points, where $V_\theta = 0$, sit at
$$
\sin\theta_s = -\frac{\Gamma}{4\pi V_\infty R},
$$ {#eq-stag}
moving down symmetrically from $\theta = 0, \pi$ as $\Gamma$ grows; at $\Gamma = 4\pi V_\infty R$ they merge at the bottom, and beyond that the stagnation point leaves the surface and lies in the flow below the cylinder, with a ring of fluid circulating permanently round the body.

::: widget contour
f: if(x^2 + y^2 < 1, 0, y*(1 - 1/(x^2 + y^2)) + G/(2*pi)*ln(sqrt(x^2 + y^2)))
x: -3, 3
y: -2.2, 2.2
levels: 24
gradient: false
sliders: G=4:0:16:0.2
point: 2, 1
caption: Streamlines (contours of $\psi$) of [[#eq-lifting-cyl]] for $V_\infty = 1$ and $R = 1$, with $G = \Gamma$ on the slider; the unit circle is the body (its interior is blanked, and the $\psi = 0$ contour traces the surface only roughly). At $G = 0$ the pattern is symmetric (no lift). As $G$ increases the stagnation points slide down the surface by [[#eq-stag]]: at $G = 2\pi \approx 6.3$ they are at $\theta_s = -30^\circ$ and $-150^\circ$, and at $G = 4\pi \approx 12.6$ they merge at the bottom. Notice how the streamlines crowd together above the cylinder (fast flow, low pressure) and spread out below it.
:::

::: theorem Lift of the cylinder with circulation {#thm-cyl-lift}
The flow [[#eq-lifting-cyl]] exerts on the cylinder, per unit span, a lift (perpendicular to $V_\infty$)
$$
L' = \rho_\infty V_\infty \Gamma
$$
and zero drag, whatever the radius.
:::

::: proof
On the surface, Bernoulli gives $p = p_\infty + \tfrac12\rho_\infty\left(V_\infty^2 - V_\theta^2\right)$ with $V_\theta^2 = 4V_\infty^2\sin^2\theta + \dfrac{2V_\infty\Gamma\sin\theta}{\pi R} + \dfrac{\Gamma^2}{4\pi^2R^2}$. The pressure acts along the inward normal $-(\cos\theta, \sin\theta)$ on the element $R\,d\theta$, so
$$
D' = -\int_0^{2\pi} p\cos\theta\,R\,d\theta, \qquad L' = -\int_0^{2\pi} p\sin\theta\,R\,d\theta.
$$
Constants integrate to zero against $\cos\theta$ and $\sin\theta$, and so do $\sin^2\theta\cos\theta$, $\sin\theta\cos\theta$ and $\sin^3\theta$ over a full period. The only surviving term is the cross term in $V_\theta^2$ against $\sin\theta$:
$$
L' = -R\int_0^{2\pi}\left(-\tfrac12\rho_\infty\right)\frac{2V_\infty\Gamma\sin\theta}{\pi R}\sin\theta\,d\theta
= \frac{\rho_\infty V_\infty\Gamma}{\pi}\int_0^{2\pi}\sin^2\theta\,d\theta = \rho_\infty V_\infty\Gamma ,
$$
and every term of $D'$ vanishes. Assumptions: steady, incompressible, inviscid flow; Bernoulli with one constant throughout, valid because the flow is irrotational.
:::

::: widget plot
f: 1 - (2*sin(x) + B)^2; 1 - 4*sin(x)^2
x: 0, 2pi
y: -9, 1.5
piticks: true
sliders: B=1:0:2:0.05
labels: C_p\ \text{with circulation}; C_p\ \text{without circulation}
caption: Surface pressure coefficient on the cylinder against $\theta$ (measured anticlockwise from the rear stagnation point of the non-lifting flow), with $B = \Gamma/(2\pi V_\infty R)$ on the slider. Without circulation the curve is symmetric and integrates to zero force. With $B > 0$ the upper half ($0 < \theta < \pi$) becomes strongly negative while the lower half moves towards $C_p = 1$: the area between them, weighted by $\sin\theta$, is the lift $c_l = 2\pi B$. The curve stays symmetric about $\theta = \pi/2$, which is why the drag is still zero.
:::

The **lift coefficient** of the cylinder, based on its diameter, is $c_l = L'/(q_\infty\,2R) = \Gamma/(V_\infty R)$. Physically the circulation adds to the speed over the top and subtracts from it underneath; Bernoulli turns the speed difference into a pressure difference. A rotating cylinder drags a circulation into being through its boundary layer — the **Magnus effect**, which curves a spinning ball's flight and drives Flettner-rotor ships — but real rotors reach only a fraction of the ideal circulation $2\pi R \cdot \omega R$ that a no-slip "solid-body" argument suggests, so measured rather than ideal coefficients must be used.

::: example Stagnation points and lift of a spinning cylinder {#ex-spinning}
A cylinder of radius $0.5\,\mathrm{m}$ in a sea-level stream at $10\,\mathrm{m/s}$ carries a clockwise circulation $\Gamma = 2\pi V_\infty R = 31.4\,\mathrm{m^2/s}$. Find the stagnation points, the lift per metre, $c_l$, and the surface $C_p$ at the top and bottom.
::: solution
By [[#eq-stag]], $\sin\theta_s = -31.4/(4\pi \times 10 \times 0.5) = -0.5$, so $\theta_s = -30^\circ$ and $-150^\circ$ ($210^\circ$): both stagnation points have moved $30^\circ$ below the horizontal diameter. The lift is $L' = 1.225 \times 10 \times 31.4 = 385\,\mathrm{N/m}$, and $c_l = \Gamma/(V_\infty R) = 2\pi = 6.28$. On the surface $\Gamma/(2\pi R) = 10\,\mathrm{m/s}$, so at the top $V_\theta = -20 - 10 = -30\,\mathrm{m/s}$, $C_p = 1 - 9 = -8$; at the bottom $V_\theta = +20 - 10 = 10\,\mathrm{m/s}$, $C_p = 0$. *Sanity check:* the lift is upward for a clockwise vortex with the stream from the left, as it must be (faster flow on top). And $c_l = 6.3$ is far beyond any airfoil's $1.5$–$2$ — but this is ideal flow; real rotating cylinders separate and need end plates and high spin ratios to approach even half of it.
:::
:::

::: quiz
In the potential flow past a circular cylinder *with* circulation, what happens to the drag as $\Gamma$ increases?
- [ ] It increases in proportion to $\Gamma^2$, like induced drag
- [ ] It increases in proportion to $\Gamma$
- [x] It stays exactly zero
- [ ] It becomes negative (a thrust)
::: solution
The pressure distribution remains symmetric about the vertical axis for every $\Gamma$, so $D' = 0$: d'Alembert's paradox survives the addition of circulation. Induced drag is a three-dimensional effect of trailing vortices ([[aerodynamics/finite-wings]]); in two-dimensional inviscid flow it does not exist.
:::
:::

## The Kutta–Joukowski theorem

The cylinder result is not special. Any two-dimensional body in steady, inviscid, incompressible flow, viewed from far away, looks like the free stream plus a vortex of strength equal to the circulation round the body, plus terms that die away faster than $1/r$ (a closed body cannot be a net source). That is enough to compute the force.

::: theorem Kutta–Joukowski theorem {#thm-kj}
A two-dimensional body of any shape in a steady, inviscid, incompressible stream $V_\infty$, with circulation $\Gamma$ (clockwise positive) round any curve enclosing it, experiences a force per unit span
$$
L' = \rho_\infty V_\infty\Gamma
$$
perpendicular to the free stream, and zero force parallel to it.
:::

::: proof
Apply the momentum equation to the fluid between the body surface $S_b$ and a large circle $C$ of radius $r$ centred on the body, with outward unit normal $\mathbf{n} = (\cos\theta, \sin\theta)$ on $C$. In steady flow the net momentum outflow equals the sum of the forces on the fluid. On $S_b$ there is no flow through the surface, and the pressure force on the fluid there is minus the force $\mathbf{F}$ on the body. Hence
$$
\mathbf{F} = -\oint_C \left[(p - p_\infty)\,\mathbf{n} + \rho_\infty\mathbf{V}\,(\mathbf{V}\cdot\mathbf{n})\right]r\,d\theta ,
$$
where $p_\infty$ may be subtracted because a constant pressure exerts no net force round a closed curve. This is exact for any $r$, so we may evaluate it as $r \to \infty$. There the velocity is $\mathbf{V} = (V_\infty + u', v')$ with the perturbation dominated by the vortex,
$$
u' = \frac{\Gamma\sin\theta}{2\pi r}, \qquad v' = -\frac{\Gamma\cos\theta}{2\pi r}, \qquad \text{plus } O(r^{-2}),
$$
which is the clockwise vortex of [[#prop-elementary]] in Cartesian components. Bernoulli gives $p - p_\infty = -\rho_\infty V_\infty u' + O(r^{-2})$, and $\mathbf{V}\cdot\mathbf{n} = V_\infty\cos\theta + (u'\cos\theta + v'\sin\theta) = V_\infty\cos\theta + O(r^{-2})$ (the vortex velocity is purely tangential). Terms of order $r^{-2}$, multiplied by the circumference $\propto r$, vanish as $r \to \infty$. The $y$-component is then
$$
F_y = -\int_0^{2\pi}\left[-\rho_\infty V_\infty\frac{\Gamma\sin\theta}{2\pi r}\sin\theta + \rho_\infty\left(-\frac{\Gamma\cos\theta}{2\pi r}\right)V_\infty\cos\theta\right]r\,d\theta
= \frac{\rho_\infty V_\infty\Gamma}{2\pi}\int_0^{2\pi}\left(\sin^2\theta + \cos^2\theta\right)d\theta = \rho_\infty V_\infty\Gamma .
$$
Half of the lift comes from the pressure on $C$ and half from the downward momentum flux. The $x$-component is $F_x = -\int_0^{2\pi}\left[-\rho_\infty V_\infty u'\cos\theta + \rho_\infty(V_\infty + u')V_\infty\cos\theta\right]r\,d\theta$; the $u'$ terms cancel exactly and $\int_0^{2\pi}\cos\theta\,d\theta = 0$, so $F_x = 0$. Assumptions: steady, two-dimensional, inviscid, incompressible and irrotational flow outside the body; a closed body (zero net source strength); the far-field expansion of the perturbation, which holds for any body because the potential outside a circle enclosing it has a Laurent-type expansion in $1/r$.
:::

Two consequences are worth stating at once. First, **lift requires circulation**: no circulation, no lift, whatever the shape. Second, **potential flow alone cannot say how much circulation** there is — the lifting cylinder showed a whole family of solutions. For a sharp-trailing-edged airfoil, nature makes the choice: the circulation adjusts until the flow leaves the trailing edge smoothly (the **Kutta condition**), and that is the subject of [[aerodynamics/thin-airfoil-theory]].

::: example How much circulation does a wing section carry? {#ex-kj-airfoil}
A section of chord $c = 2\,\mathrm{m}$ flies at $V_\infty = 60\,\mathrm{m/s}$ at sea level with $c_l = 0.8$. Find the lift per unit span and the circulation round it.
::: solution
$L' = q_\infty c\,c_l = \tfrac12(1.225)(60)^2(2)(0.8) = 3528\,\mathrm{N/m}$. By the Kutta–Joukowski theorem,
$$
\Gamma = \frac{L'}{\rho_\infty V_\infty} = \frac{3528}{1.225 \times 60} = 48.0\,\mathrm{m^2/s}.
$$
In general $\Gamma = \tfrac12 V_\infty c\,c_l$ — here $\tfrac12(60)(2)(0.8) = 48$. *Sanity check:* if this circulation were produced by an average extra speed $\Delta V$ on the upper surface and an equal deficit on the lower, the line integral round the section would give $\Gamma \approx 2c\,\Delta V$, so $\Delta V \approx 12\,\mathrm{m/s}$, 20 per cent of the flight speed — a plausible magnitude for the velocity difference between the surfaces of a wing at moderate lift.
:::
:::

::: example A stagnation-point flow {#ex-corner}
The stream function $\psi = Axy$ with $A = 2\,\mathrm{s^{-1}}$ describes the flow near the front stagnation point of a blunt body (the wall is $y = 0$). Show that it is irrotational, find its velocity potential, and find the speed and the pressure drop $p_0 - p$ at $(x, y) = (1, 0.5)\,\mathrm{m}$ for air of density $1.225\,\mathrm{kg/m^3}$.
::: solution
$u = \psi_y = Ax$, $v = -\psi_x = -Ay$. Then $\omega_z = v_x - u_y = 0 - 0 = 0$: irrotational, and continuity $u_x + v_y = A - A = 0$ also holds. Integrating $\phi_x = Ax$ gives $\phi = \tfrac12Ax^2 + g(y)$, and $\phi_y = g'(y) = -Ay$ gives $\phi = \tfrac12 A(x^2 - y^2)$. At $(1, 0.5)$: $u = 2$, $v = -1\,\mathrm{m/s}$, $V = \sqrt5 = 2.24\,\mathrm{m/s}$. With $p_0$ the stagnation pressure at the origin, Bernoulli gives $p_0 - p = \tfrac12\rho V^2 = \tfrac12(1.225)(5) = 3.06\,\mathrm{Pa}$. *Sanity check:* the streamlines $xy = \text{const}$ are hyperbolas approaching the wall and turning along it, and $\nabla^2\psi = 0$ and $\nabla^2\phi = A - A = 0$, as [[#prop-laplace]] requires.
:::
:::

::: warning Superpose velocities and potentials, never pressures
Because Bernoulli is quadratic in the speed, the pressure of a superposed flow is **not** the sum of the pressures of its parts. In the spinning-cylinder example, the uniform flow past the cylinder alone gives $C_p = -3$ at the top and the vortex alone gives $C_p = 1 - (10/10)^2 = 0$ for the same point measured against $V_\infty$ — but the combined flow gives $C_p = -8$. Always add $\phi$, $\psi$ or the velocity components, then form $V^2$, then apply Bernoulli. A related trap: the sign of $\Gamma$. This course takes clockwise as positive, so that positive lift corresponds to positive $\Gamma$ with the stream from left to right; mathematics texts usually take anticlockwise positive, which flips the sign in the vortex formulas but not the physics.
:::

::: history
Jean le Rond **d'Alembert** showed in his *Essai d'une nouvelle théorie de la résistance des fluides* (1752) that an ideal fluid exerts no resistance on a body, a result at odds with every experiment and later called his paradox. William **Rankine** built closed bodies from sources and sinks in a uniform stream ("On the mathematical theory of stream-lines", 1871). Heinrich Gustav **Magnus** reported the sideways force on a spinning cylinder in 1852, and Lord **Rayleigh** in 1877 explained the swerve of a spinning tennis ball by superposing a circulation on the flow round a cylinder. The connection between circulation and lift was proposed by Frederick **Lanchester** in Britain, and made quantitative independently by Wilhelm **Kutta**, whose 1902 Habilitation work (published only as a short excerpt) computed the lift of circular-arc surfaces with a finite velocity at the trailing edge, and by Nikolai **Joukowski** (Zhukovsky), who in 1906 stated the general theorem $L' = \rho V\Gamma$ and went on to construct the Joukowski airfoils by conformal mapping.
:::

## Summary

::: summary
- Outside boundary layers and wakes, low-speed flow is incompressible, inviscid and irrotational; then $\mathbf{V} = \nabla\phi$ and $u = \psi_y$, $v = -\psi_x$, with $\nabla^2\phi = \nabla^2\psi = 0$.
- Laplace's equation is linear: superpose uniform stream, source, doublet and vortex ([[#prop-elementary]]) until a streamline has the shape of the body; then get the pressure from $C_p = 1 - V^2/V_\infty^2$.
- Uniform stream + doublet = cylinder, $C_p = 1 - 4\sin^2\theta$, zero lift and zero drag (d'Alembert's paradox; real drag comes from separation).
- Adding a vortex keeps the cylinder a streamline for any $\Gamma$: the solution is not unique. The stagnation points sit at $\sin\theta_s = -\Gamma/(4\pi V_\infty R)$ and the lift is $\rho_\infty V_\infty\Gamma$.
- **Kutta–Joukowski:** any two-dimensional body has $L' = \rho_\infty V_\infty\Gamma$ and zero drag in steady potential flow. Lift needs circulation; a further physical condition (the Kutta condition) fixes how much.
:::

## Exercises

::: exercise Pressure on the cylinder {level=1 check="-1"}
Find the potential-flow pressure coefficient on the surface of a non-lifting circular cylinder at $45^\circ$ from the front stagnation point. (Enter $C_p$.)
::: solution
$C_p = 1 - 4\sin^2 45^\circ = 1 - 4 \times \tfrac12 = -1$, by [[#eq-cp-cyl]]. The local speed there is $2V_\infty\sin45^\circ = \sqrt2\,V_\infty$.
:::
:::

::: exercise Nose of a half-body {level=1 check="0.318"}
A Rankine half-body in a stream of $5\,\mathrm{m/s}$ has a total thickness of $2\,\mathrm{m}$ far downstream. Find the source strength and the distance of the stagnation point upstream of the source. (Enter the distance in metres.)
::: solution
Far downstream all the source flow passes through the width $2h$ at $V_\infty$: $\Lambda = V_\infty \times 2h = 5 \times 2 = 10\,\mathrm{m^2/s}$. The stagnation point is at $\Lambda/(2\pi V_\infty) = 10/(10\pi) = 0.318\,\mathrm{m}$ upstream of the source.
:::
:::

::: exercise Circulation for a given lift {level=1 check="32.7"}
A wing section in a sea-level stream at $50\,\mathrm{m/s}$ produces $2000\,\mathrm{N}$ of lift per metre of span. What circulation does it carry? (Enter $\Gamma$ in $\mathrm{m^2/s}$.)
::: solution
$\Gamma = L'/(\rho_\infty V_\infty) = 2000/(1.225 \times 50) = 32.7\,\mathrm{m^2/s}$.
:::
:::

::: exercise Doublet strength {level=2 check="3.77"}
What doublet strength, placed in a uniform stream of $15\,\mathrm{m/s}$, produces the flow past a cylinder of radius $0.2\,\mathrm{m}$? (Enter $\kappa$ in $\mathrm{m^3/s}$.)
::: solution
From [[#eq-psi-cyl]], $R^2 = \kappa/(2\pi V_\infty)$, so $\kappa = 2\pi V_\infty R^2 = 2\pi(15)(0.04) = 3.77\,\mathrm{m^3/s}$.
:::
:::

::: exercise Where are the stagnation points? {level=2 check="14.5"}
A cylinder in a stream carries a clockwise circulation $\Gamma = \pi V_\infty R$. Find the angular positions of its stagnation points. (Enter the angle below the horizontal diameter, in degrees.)
::: solution
By [[#eq-stag]], $\sin\theta_s = -\pi V_\infty R/(4\pi V_\infty R) = -0.25$, so $\theta_s = -14.5^\circ$ and $-165.5^\circ$: both points lie $14.5^\circ$ below the horizontal diameter, one near the front and one near the back.
:::
:::

::: exercise A potential and its stream function {level=2 check="2*sqrt(2)"}
A plane flow has velocity potential $\phi = x^2 - y^2$ (SI units). Find its stream function and the speed at the point $(1, 1)$. (Enter the speed in m/s.)
::: solution
$u = \phi_x = 2x$, $v = \phi_y = -2y$. From $\psi_y = u = 2x$: $\psi = 2xy + h(x)$, and $-\psi_x = -2y - h'(x) = v = -2y$ gives $h' = 0$, so $\psi = 2xy$ (the stagnation-point flow of example [[#ex-corner]] with $A = 2$). At $(1,1)$, $V = \sqrt{4 + 4} = 2\sqrt2 = 2.83\,\mathrm{m/s}$.
:::
:::

::: exercise A spiral vortex {level=2 check="63.4"}
A source of strength $\Lambda = 4\,\mathrm{m^2/s}$ and a clockwise vortex of strength $\Gamma = 8\,\mathrm{m^2/s}$ sit together at the origin. At $r = 0.5\,\mathrm{m}$, find the speed and the angle between the streamline and the radial direction. (Enter the angle in degrees.)
::: solution
$V_r = \Lambda/(2\pi r) = 4/\pi = 1.273\,\mathrm{m/s}$ and $V_\theta = -\Gamma/(2\pi r) = -8/\pi = -2.546\,\mathrm{m/s}$, so $V = 2.85\,\mathrm{m/s}$ and the angle from the radial direction is $\arctan(2.546/1.273) = \arctan 2 = 63.4^\circ$. The ratio $V_\theta/V_r = -\Gamma/\Lambda$ is the same at every radius, so the streamlines are logarithmic spirals — a model of the flow in a vortex chamber or a bathtub drain.
:::
:::

::: exercise Zero drag and the lift integral, done properly {level=3}
For the lifting cylinder [[#eq-lifting-cyl]], write out $C_p(\theta)$ on the surface in terms of $\theta$ and $B = \Gamma/(2\pi V_\infty R)$, and integrate it to obtain $c_l = 2\pi B$ (based on the diameter) and $c_d = 0$. Check your $C_p$ against example [[#ex-spinning]], where $B = 1$.
::: solution
On the surface $V_\theta/V_\infty = -(2\sin\theta + B)$, so $C_p = 1 - (2\sin\theta + B)^2 = 1 - B^2 - 4B\sin\theta - 4\sin^2\theta$. With $B = 1$: at $\theta = 90^\circ$, $C_p = 1 - 9 = -8$; at $\theta = 270^\circ$, $C_p = 1 - 1 = 0$, as in the example. The section coefficients based on the diameter $2R$ follow by resolving the pressure on the element $R\,d\theta$:
$$
c_l = -\frac{1}{2}\int_0^{2\pi} C_p\sin\theta\,d\theta, \qquad c_d = -\frac{1}{2}\int_0^{2\pi} C_p\cos\theta\,d\theta.
$$
For $c_l$ only $-4B\sin\theta$ survives: $c_l = -\tfrac12(-4B)(\pi) = 2\pi B$. For $c_d$, every term ($1 - B^2$, $\sin\theta$, $\sin^2\theta$) integrates to zero against $\cos\theta$, so $c_d = 0$. Since $2\pi B = \Gamma/(V_\infty R)$, $L' = q_\infty(2R)c_l = \rho_\infty V_\infty\Gamma$, in agreement with [[#thm-cyl-lift]].
:::
:::

::: exercise A rotor sail: ideal and real {level=3 check="33.1"}
A rotor sail is a vertical cylinder $3\,\mathrm{m}$ in diameter and $18\,\mathrm{m}$ tall spun on a ship in a $10\,\mathrm{m/s}$ apparent wind (sea-level air). (a) What is the largest lift coefficient (based on diameter) that potential flow allows while the stagnation points remain on the surface? (b) Tests on such rotors with end plates give lift coefficients of about $10$ at high spin ratios. Estimate the side force with $c_l = 10$ based on the projected area $D \times h$. (c) Discuss why the real value is lower than ideal and what limits the useful spin. (Enter the force for part (b) in kN.)
::: solution
(a) The stagnation points coincide at the bottom when $\Gamma = 4\pi V_\infty R$, which gives $c_l = \Gamma/(V_\infty R) = 4\pi = 12.6$.

(b) $F = q_\infty\,D\,h\,c_l = \tfrac12(1.225)(10)^2(3)(18)(10) = 33\,075\,\mathrm{N} = 33.1\,\mathrm{kN}$.

(c) In a real fluid the circulation is induced by the boundary layer dragged round by the surface, and the fluid separates on the side where the surface moves against the stream; the net circulation is less than any ideal estimate, and the separated wake adds a substantial drag that potential flow says is zero. Over the finite height, the flow also spills round the ends (a three-dimensional loss treated in [[aerodynamics/finite-wings]]), which is why end plates help. Increasing the spin raises the lift only until the gain flattens out while the power to spin the rotor and the drag keep rising; the useful operating point is a design trade between side force, rotor power, drag, structural loads and wind direction, and it must be fixed from test data rather than from potential flow.
:::
:::
