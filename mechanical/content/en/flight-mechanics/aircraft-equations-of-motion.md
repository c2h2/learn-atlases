The static analyses of the previous lessons answered "is there a restoring moment?". To answer "what happens next?" — how the aircraft moves after a gust, how quickly it responds to the pilot, whether its oscillations die out — we need its **equations of motion**: Newton's laws for a rigid body with six degrees of freedom, written in axes that move with the aircraft, together with a model of how the aerodynamic forces depend on the motion. The full equations are nonlinear and coupled, and they are what every flight simulator integrates. For small disturbances from steady flight they become linear and split neatly into two independent sets, longitudinal and lateral–directional, each a fourth-order linear system whose eigenvalues are the aircraft's natural modes ([[flight-mechanics/dynamic-modes]]).

The rigid-body mechanics — angular momentum, the inertia tensor, Euler's equations and the derivative of a vector in a rotating frame — is developed in [[dynamics/three-dimensional-dynamics]]; the linear algebra of state-space models in [[control-systems/state-space]] and Maths Atlas's [eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues).

## Axes and attitude {#sec-axes}

::: definition Earth, body and stability axes {#def-axes}
- **Earth axes** $Ox_Ey_Ez_E$: fixed to the ground, $x_E$ north, $y_E$ east, $z_E$ down (NED). For aircraft flight mechanics the Earth is treated as flat and non-rotating, so these axes are taken as inertial.
- **Body axes** $Ox_by_bz_b$: fixed in the aircraft with origin at the centre of gravity, $x_b$ forward in the plane of symmetry, $y_b$ towards the right wing, $z_b$ downward in the plane of symmetry.
- **Stability axes**: body axes whose $x$-axis is aligned with the relative wind in the reference (trim) condition, so that the reference angle of attack is zero. Once chosen they stay fixed in the aircraft during the disturbed motion.

In body axes the velocity of the centre of gravity relative to the air has components $(u, v, w)$, the angular velocity $(p, q, r)$ (roll, pitch and yaw rates), the resultant aerodynamic and thrust force $(X, Y, Z)$ and moment about the centre of gravity $(\mathcal{L}, M, N)$. The angle of attack and sideslip are $\alpha = \tan^{-1}(w/u)$ and $\beta = \sin^{-1}(v/V)$.
:::

The orientation of the body axes relative to Earth axes is described by three successive rotations, the **Euler angles**: starting with the two frames aligned, rotate by the **heading** $\psi$ about $z$, then by the **pitch attitude** $\theta$ about the new $y$, then by the **bank angle** $\phi$ about the new $x$. This is the "3-2-1" sequence; the order matters, because finite rotations do not commute. A vector with Earth-axis components $\mathbf{x}_E$ has body-axis components $\mathbf{x}_b = \mathbf{R}\,\mathbf{x}_E$ with
$$
\mathbf{R} = \begin{bmatrix} 1 & 0 & 0\\ 0 & \cos\phi & \sin\phi\\ 0 & -\sin\phi & \cos\phi\end{bmatrix}
\begin{bmatrix} \cos\theta & 0 & -\sin\theta\\ 0 & 1 & 0\\ \sin\theta & 0 & \cos\theta\end{bmatrix}
\begin{bmatrix} \cos\psi & \sin\psi & 0\\ -\sin\psi & \cos\psi & 0\\ 0 & 0 & 1\end{bmatrix}.
$$ {#eq-rotation}
Applied to the weight $(0, 0, mg)$ in Earth axes, only the last column of the product matters:
$$
\mathbf{W}_b = mg\begin{bmatrix} -\sin\theta\\ \cos\theta\sin\phi\\ \cos\theta\cos\phi\end{bmatrix}.
$$ {#eq-gravity}

::: proposition Euler-angle kinematics {#prop-euler-rates}
The rates of change of the Euler angles are related to the body angular rates by
$$
\dot\phi = p + (q\sin\phi + r\cos\phi)\tan\theta,\qquad
\dot\theta = q\cos\phi - r\sin\phi,\qquad
\dot\psi = \frac{q\sin\phi + r\cos\phi}{\cos\theta}.
$$ {#eq-euler-rates}
:::

::: proof
The angular velocity of the body is the vector sum of the three Euler rates, each about its own axis: $\dot\psi$ about the Earth $z$-axis, $\dot\theta$ about the intermediate $y$-axis (after the $\psi$ rotation), and $\dot\phi$ about the body $x$-axis. Express each in body axes. $\dot\phi$ is already along $x_b$: $(\dot\phi, 0, 0)$. The intermediate $y$-axis is carried into body axes by the bank rotation only: $(0, \dot\theta\cos\phi, -\dot\theta\sin\phi)$. The Earth $z$-axis is carried by the pitch and bank rotations, giving the third column of $\mathbf{R}$ without the $\psi$ factor: $\dot\psi(-\sin\theta, \cos\theta\sin\phi, \cos\theta\cos\phi)$. Adding,
$$
p = \dot\phi - \dot\psi\sin\theta,\qquad q = \dot\theta\cos\phi + \dot\psi\cos\theta\sin\phi,\qquad r = -\dot\theta\sin\phi + \dot\psi\cos\theta\cos\phi .
$$
Multiplying the second by $\sin\phi$ and the third by $\cos\phi$ and adding gives $q\sin\phi + r\cos\phi = \dot\psi\cos\theta$, the third of [[#eq-euler-rates]]. Multiplying the second by $\cos\phi$ and the third by $-\sin\phi$ and adding gives $\dot\theta$. Substituting $\dot\psi$ into $p = \dot\phi - \dot\psi\sin\theta$ gives $\dot\phi$.
:::

The $\tan\theta$ and $1/\cos\theta$ terms become infinite at $\theta = \pm90^\circ$: the Euler-angle description is singular in vertical flight (**gimbal lock**), because heading and bank then describe the same rotation. Simulators of aerobatic aircraft and spacecraft therefore integrate the four-parameter **quaternion** instead, which has no singularity; for conventional flight Euler angles are adequate and much easier to interpret.

::: example Body rates in a steady turn {#ex-turn-rates}
The light aircraft flies the level turn of [[flight-mechanics/manoeuvres-takeoff-landing#ex-turn]]: bank $\phi = 60^\circ$, turn rate $\dot\psi = 0.3397\ \mathrm{rad/s}$, pitch attitude assumed $\theta = 0$. What do the body-mounted rate gyros read?
::: solution
In the steady turn $\dot\phi = \dot\theta = 0$. From the expressions in the proof: $p = -\dot\psi\sin\theta = 0$, $q = \dot\psi\cos\theta\sin\phi = 0.3397 \times 0.8660 = 0.2942\ \mathrm{rad/s}$, $r = \dot\psi\cos\theta\cos\phi = 0.3397 \times 0.5 = 0.1698\ \mathrm{rad/s}$. Sanity check: $\sqrt{q^2 + r^2} = 0.3397$, the turn rate, as it must be — the aircraft rotates about the vertical, which in body axes points partly along $z_b$ and partly along $y_b$. In a steep turn the aircraft is mostly *pitching* in its own axes: this is why the pilot pulls back to turn, and why a pitch damper acts in turns.
:::
:::

::: widget plot
f: tan(x*pi/180); 1/cos(x*pi/180)
x: -89, 89
y: -12, 12
labels: \tan\theta; \sec\theta
caption: The factors $\tan\theta$ and $\sec\theta$ that multiply $q\sin\phi + r\cos\phi$ in [[#eq-euler-rates]], against pitch attitude $\theta$ (degrees). They are close to $0$ and $1$ in normal flight but grow without bound as $\theta \to \pm 90^\circ$: near vertical flight a small body rate produces a huge rate of change of heading and bank. That is the gimbal-lock singularity of Euler angles, not a physical effect.
:::

## The rigid-body equations {#sec-rigid-body}

The aircraft is treated as a rigid body of constant mass (fuel burn is slow compared with the motions of interest), with the plane $x_bz_b$ a plane of symmetry. Then the products of inertia $I_{xy}$ and $I_{yz}$ vanish, and the inertia tensor in body axes is
$$
\mathbf{I} = \begin{bmatrix} I_x & 0 & -I_{xz}\\ 0 & I_y & 0\\ -I_{xz} & 0 & I_z\end{bmatrix},
$$
constant because the axes are fixed in the body.

::: proposition Equations of motion in body axes {#prop-eom}
For a rigid, symmetric aircraft of constant mass over a flat non-rotating Earth, the force equations are
$$
\begin{aligned}
m(\dot u + qw - rv) &= X - mg\sin\theta,\\
m(\dot v + ru - pw) &= Y + mg\cos\theta\sin\phi,\\
m(\dot w + pv - qu) &= Z + mg\cos\theta\cos\phi,
\end{aligned}
$$ {#eq-force}
and the moment equations are
$$
\begin{aligned}
\mathcal{L} &= I_x\dot p - I_{xz}(\dot r + pq) + (I_z - I_y)qr,\\
M &= I_y\dot q + (I_x - I_z)pr + I_{xz}(p^2 - r^2),\\
N &= I_z\dot r - I_{xz}(\dot p - qr) + (I_y - I_x)pq ,
\end{aligned}
$$ {#eq-moment}
where $(X, Y, Z)$ and $(\mathcal{L}, M, N)$ are the aerodynamic and propulsive forces and moments.
:::

::: proof
**Forces.** Newton's second law holds in the inertial (Earth) frame: $\mathbf{F} + \mathbf{W} = m\,(\mathrm{d}\mathbf{V}/\mathrm{d}t)_E$. The velocity is resolved in body axes, which rotate at $\boldsymbol\omega = (p, q, r)$; the derivative of a vector in a rotating frame (the transport theorem of [[dynamics/three-dimensional-dynamics]]) is
$$
\left(\frac{\mathrm{d}\mathbf{V}}{\mathrm{d}t}\right)_E = \left(\frac{\mathrm{d}\mathbf{V}}{\mathrm{d}t}\right)_b + \boldsymbol\omega\times\mathbf{V}
= \begin{bmatrix}\dot u\\ \dot v\\ \dot w\end{bmatrix} + \begin{bmatrix} qw - rv\\ ru - pw\\ pv - qu\end{bmatrix}.
$$
With the weight from [[#eq-gravity]] this gives [[#eq-force]]. (Wind is assumed steady and uniform, so the velocity relative to the air and to the ground differ by a constant.)

**Moments.** About the centre of gravity, $\mathbf{M} = (\mathrm{d}\mathbf{H}/\mathrm{d}t)_E$ with angular momentum $\mathbf{H} = \mathbf{I}\boldsymbol\omega = (I_xp - I_{xz}r,\ I_yq,\ I_zr - I_{xz}p)$. By the transport theorem with constant $\mathbf{I}$, $\mathbf{M} = \mathbf{I}\dot{\boldsymbol\omega} + \boldsymbol\omega\times\mathbf{I}\boldsymbol\omega$. The $x$-component: $I_x\dot p - I_{xz}\dot r + q(I_zr - I_{xz}p) - r(I_yq) = I_x\dot p - I_{xz}(\dot r + pq) + (I_z - I_y)qr$. The $y$- and $z$-components follow in the same way: $I_y\dot q + r(I_xp - I_{xz}r) - p(I_zr - I_{xz}p)$ and $I_z\dot r - I_{xz}\dot p + p(I_yq) - q(I_xp - I_{xz}r)$, which rearrange to [[#eq-moment]]. These are Euler's equations with a product of inertia.
:::

To complete the description, the kinematic equations [[#eq-euler-rates]] give the attitude, and the **navigation equations** $\dot{\mathbf{x}}_E = \mathbf{R}^{\mathsf T}(u, v, w)^{\mathsf T}$ (plus the wind) give the position. Together that is twelve first-order ordinary differential equations in twelve states $(u, v, w, p, q, r, \phi, \theta, \psi, x_E, y_E, z_E)$ — the core of every six-degree-of-freedom flight simulator. Heading and position do not appear on the right-hand sides of the dynamics (the flat-Earth atmosphere does not depend on them, except through altitude), so for stability work only the first eight matter.

::: warning Body axes rotate
The terms $qw - rv$, etc., in [[#eq-force]] are not "forces": they are the parts of the inertial acceleration that appear because the axes rotate. Leaving them out — writing $m\dot w = Z + mg\cos\theta\cos\phi$ — gives an aircraft that cannot turn or pull up, because in a steady pull-up $\dot w = 0$ while the inertial acceleration $-qu$ (upward, in body $z$) is what the extra lift produces. Two other common slips: using the Euler-angle rates $\dot\theta$, $\dot\psi$ in place of the body rates $q$, $r$ (they coincide only for wings-level flight), and forgetting the product of inertia $I_{xz}$, which couples roll and yaw in [[#eq-moment]] and is significant for most aircraft in stability axes.
:::

## Steady flight and small disturbances {#sec-linearisation}

The reference flight condition is steady, wings-level, symmetric flight: $v_0 = p_0 = q_0 = r_0 = \phi_0 = 0$, and, in stability axes, $w_0 = 0$, so $u_0 = V$. The force equations then reduce to $X_0 = mg\sin\theta_0$ and $Z_0 = -mg\cos\theta_0$, which are the steady-flight balances of [[flight-mechanics/steady-flight-performance#prop-steady]] with $\theta_0 = \gamma_0$ (the flight-path angle, since the stability $x$-axis lies along the flight path).

Now perturb: $u = u_0 + \Delta u$, $w = \Delta w$, $q = \Delta q$, $\theta = \theta_0 + \Delta\theta$, and so on, and expand every term to first order in the perturbations. Products such as $q\,w$ and $p\,r$ are of second order and are dropped; $\sin(\theta_0 + \Delta\theta) \approx \sin\theta_0 + \Delta\theta\cos\theta_0$; and $qu \approx u_0\Delta q$.

::: proposition Linearised equations and decoupling {#prop-decoupling}
To first order in small disturbances from steady, symmetric, wings-level flight, the equations of motion separate into a **longitudinal** set in $(\Delta u, \Delta w, \Delta q, \Delta\theta)$,
$$
\begin{aligned}
m\,\Delta\dot u &= \Delta X - mg\cos\theta_0\,\Delta\theta,\\
m(\Delta\dot w - u_0\Delta q) &= \Delta Z - mg\sin\theta_0\,\Delta\theta,\\
I_y\,\Delta\dot q &= \Delta M,\qquad \Delta\dot\theta = \Delta q,
\end{aligned}
$$ {#eq-lin-long}
and a **lateral–directional** set in $(\Delta v, \Delta p, \Delta r, \Delta\phi)$,
$$
\begin{aligned}
m(\Delta\dot v + u_0\Delta r) &= \Delta Y + mg\cos\theta_0\,\Delta\phi,\\
I_x\Delta\dot p - I_{xz}\Delta\dot r &= \Delta\mathcal{L},\qquad
I_z\Delta\dot r - I_{xz}\Delta\dot p = \Delta N,\\
\Delta\dot\phi &= \Delta p + \tan\theta_0\,\Delta r,
\end{aligned}
$$ {#eq-lin-lat}
provided the aerodynamic perturbations $\Delta X, \Delta Z, \Delta M$ depend only on longitudinal variables and $\Delta Y, \Delta\mathcal{L}, \Delta N$ only on lateral ones.
:::

::: proof
Substitute the perturbed variables into [[#eq-force]], [[#eq-moment]] and [[#eq-euler-rates]], subtract the reference equations, and drop products of perturbations. For example the $x$-force equation: $m(\Delta\dot u + \Delta q\,\Delta w - \Delta r\,\Delta v) = X_0 + \Delta X - mg(\sin\theta_0 + \Delta\theta\cos\theta_0)$; the products are second order and $X_0 = mg\sin\theta_0$ cancels, leaving the first line of [[#eq-lin-long]]. In the $z$-equation $-qu = -\Delta q(u_0 + \Delta u) \approx -u_0\Delta q$. In the moment equations every inertial coupling term ($qr$, $pr$, $p^2 - r^2$, $pq$) is a product of two perturbation rates and drops out, leaving $I_y\Delta\dot q = \Delta M$ and the coupled roll–yaw pair. In [[#eq-euler-rates]], with $\phi_0 = 0$: $\Delta\dot\theta = \Delta q$ and $\Delta\dot\phi = \Delta p + \Delta r\tan\theta_0$. Finally, the condition on the aerodynamics follows from symmetry: a symmetric aircraft experiences the same $X$, $Z$, $M$ when sideslipping left or right, so these are even functions of $v$, $p$, $r$ and their first derivatives with respect to them vanish at the symmetric reference; likewise $Y$, $\mathcal{L}$, $N$ are odd in the lateral variables and unchanged to first order by symmetric ones.
:::

The decoupling is what makes flight dynamics tractable: two fourth-order problems instead of one eighth-order one. It fails in rapid rolling manoeuvres (where $pr$ and $pq$ are no longer small — **inertia coupling**, which caused several accidents with early jet fighters of high fuselage-to-wing inertia ratio), near the stall, and for asymmetric configurations.

## Stability derivatives {#sec-derivatives}

The aerodynamic perturbations are written as linear combinations of the motion variables and the controls, with the partial derivatives evaluated at the reference condition — the **stability derivatives** introduced by G. H. Bryan:
$$
\Delta X = \frac{\partial X}{\partial u}\Delta u + \frac{\partial X}{\partial w}\Delta w + \frac{\partial X}{\partial\delta_e}\Delta\delta_e + \dots,
\qquad
\Delta M = \frac{\partial M}{\partial u}\Delta u + \frac{\partial M}{\partial w}\Delta w + \frac{\partial M}{\partial\dot w}\Delta\dot w + \frac{\partial M}{\partial q}\Delta q + \frac{\partial M}{\partial\delta_e}\Delta\delta_e,
$$
and similarly for the others. The derivative with respect to $\dot w$ represents the lag of downwash: the tail feels the change of wing angle of attack only after the air has travelled from the wing to the tail. It is convenient to divide each force derivative by the mass and each moment derivative by the relevant moment of inertia; we write, for instance, $X_u = (\partial X/\partial u)/m$ and $M_q = (\partial M/\partial q)/I_y$ (the notation of Nelson; Etkin and Cook use other normalisations, so check before mixing sources).

::: definition Non-dimensional stability derivatives {#def-derivatives}
The dimensionless derivatives are taken with respect to $\hat u = \Delta u/u_0$, $\alpha \approx \Delta w/u_0$, $\hat q = q\bar c/(2u_0)$, $\hat{\dot\alpha} = \dot\alpha\bar c/(2u_0)$, $\beta \approx \Delta v/u_0$, $\hat p = pb/(2u_0)$ and $\hat r = rb/(2u_0)$ — for example
$$
C_{m\alpha} = \frac{\partial C_m}{\partial\alpha},\qquad C_{mq} = \frac{\partial C_m}{\partial\hat q},\qquad C_{lp} = \frac{\partial C_l}{\partial\hat p},\qquad C_{Du} = \frac{\partial C_D}{\partial\hat u}.
$$
They depend on the aircraft's shape, Mach number, and (weakly) Reynolds number, but not on its size or speed, and are what wind-tunnel tests, CFD and handbook methods provide.
:::

::: proposition Longitudinal force derivatives from the lift and drag curves {#prop-xz-derivs}
In stability axes, with thrust independent of speed and $C_{Lu} = C_{Du} = 0$ (no Mach-number effects), the force derivatives with respect to $u$ and $w$ are
$$
X_u = -\frac{2qSC_{D}}{m u_0},\qquad Z_u = -\frac{2qSC_{L}}{m u_0},\qquad
X_w = \frac{qS(C_L - C_{D\alpha})}{m u_0},\qquad Z_w = -\frac{qS(C_{L\alpha} + C_D)}{m u_0},
$$ {#eq-xz-derivs}
with $C_L$, $C_D$ evaluated at the reference condition and $q = \tfrac12\rho u_0^2$.
:::

::: proof
In stability axes the aerodynamic force has components $X = -D\cos\alpha + L\sin\alpha$ and $Z = -L\cos\alpha - D\sin\alpha$, where $\alpha$ is the (perturbation) angle of attack, zero in the reference condition. With $L = \tfrac12\rho V^2SC_L$ and $V \approx u$: $\partial L/\partial u = \rho u_0SC_L = 2qSC_L/u_0$ when $C_L$ itself does not depend on $u$, and likewise for $D$. At $\alpha = 0$, $\partial X/\partial u = -\partial D/\partial u$ and $\partial Z/\partial u = -\partial L/\partial u$, giving $X_u$ and $Z_u$. For $w$: $\alpha \approx w/u_0$, so $\partial/\partial w = (1/u_0)\,\partial/\partial\alpha$, and at $\alpha = 0$, $\partial X/\partial\alpha = -\partial D/\partial\alpha + L = qS(C_L - C_{D\alpha})$, $\partial Z/\partial\alpha = -\partial L/\partial\alpha - D = -qS(C_{L\alpha} + C_D)$. Dividing by $m$ gives [[#eq-xz-derivs]].
:::

The moment derivatives follow the same pattern: $M_w = qS\bar c\,C_{m\alpha}/(u_0I_y)$, $M_{\dot w} = C_{m\dot\alpha}(\bar c/2u_0)qS\bar c/(u_0I_y)$, $M_q = C_{mq}(\bar c/2u_0)qS\bar c/I_y$, and the lateral ones are listed in [[#ex-lat-derivs]]. For a conventional aircraft the tail provides most of $C_{mq}$: a pitch rate $q$ changes the tail angle of attack by $ql_t/u_0$, giving $C_{mq} \approx -2\eta\bar V_Ha_t\,l_t/\bar c$.

::: example Longitudinal derivatives of the jet transport {#ex-long-derivs}
The jet transport cruises at $u_0 = 230.15\ \mathrm{m/s}$ (Mach $0.78$) at $11\ \mathrm{km}$, $q = 9639\ \mathrm{Pa}$, with $m = 70\,000\ \mathrm{kg}$, $S = 122.6\ \mathrm{m^2}$, $\bar c = 4.19\ \mathrm{m}$, $I_y = 3.6\times10^{6}\ \mathrm{kg\,m^2}$. Its non-dimensional derivatives (stability axes, per radian) are: $C_L = 0.5809$, $C_D = 0.0341$, $C_{L\alpha} = 5.5$, $C_{D\alpha} = 0.268$, $C_{m\alpha} = -0.55$, $C_{m\dot\alpha} = -6.0$, $C_{mq} = -18.0$, $C_{L\delta e} = 0.35$, $C_{m\delta e} = -1.20$. Compute the dimensional derivatives.
::: solution
$qS = 9639 \times 122.6 = 1.1817\times10^{6}\ \mathrm{N}$; $qS/(mu_0) = 1.1817\times10^{6}/(70\,000 \times 230.15) = 0.07335\ \mathrm{s^{-1}}$; $qS\bar c/I_y = 1.1817\times10^{6} \times 4.19/3.6\times10^{6} = 1.3754\ \mathrm{s^{-2}}$; $\bar c/(2u_0) = 0.009103\ \mathrm{s}$.
$$
\begin{aligned}
X_u &= -2 \times 0.0341 \times 0.07335 = -0.00501\ \mathrm{s^{-1}}, &
X_w &= (0.5809 - 0.268) \times 0.07335 = 0.0230\ \mathrm{s^{-1}},\\
Z_u &= -2 \times 0.5809 \times 0.07335 = -0.0852\ \mathrm{s^{-1}}, &
Z_w &= -(5.5 + 0.0341) \times 0.07335 = -0.406\ \mathrm{s^{-1}},\\
M_w &= -0.55 \times 1.3754/230.15 = -0.003287\ \mathrm{m^{-1}s^{-1}}, &
M_{\dot w} &= -6.0 \times 0.009103 \times 1.3754/230.15 = -3.26\times10^{-4}\ \mathrm{m^{-1}},\\
M_q &= -18.0 \times 0.009103 \times 1.3754 = -0.2253\ \mathrm{s^{-1}}, &
M_{\delta e} &= -1.20 \times 1.3754 = -1.650\ \mathrm{s^{-2}},
\end{aligned}
$$
and $Z_{\delta e} = -0.35 \times 1.1817\times10^{6}/70\,000 = -5.908\ \mathrm{m\,s^{-2}}$. Per unit angle of attack rather than vertical velocity: $Z_\alpha = u_0Z_w = -93.4\ \mathrm{m\,s^{-2}}$ and $M_\alpha = u_0M_w = -0.756\ \mathrm{s^{-2}}$. Sanity check: the units are consistent with $\Delta\dot u = X_u\Delta u + \dots$ (accelerations); $X_u = -2g/(u_0\,L/D) = -2 \times 9.807/(230.15 \times 17.02) = -0.00501$ — the speed derivative is set by the lift-to-drag ratio, a result used again for the phugoid.
:::
:::

## The state-space form {#sec-state-space}

Collecting terms, with $\Delta\dot w$ appearing on the right of the pitch equation through $M_{\dot w}$ and eliminated using the $Z$ equation (and neglecting $Z_{\dot w}$ and $Z_q$, which are small compared with $m$ and $mu_0$), the longitudinal equations in the state $\mathbf{x} = (\Delta u, \Delta w, \Delta q, \Delta\theta)^{\mathsf T}$ take the form $\dot{\mathbf{x}} = \mathbf{A}\mathbf{x} + \mathbf{B}\Delta\delta_e$:
$$
\mathbf{A}_{\text{long}} = \begin{bmatrix}
X_u & X_w & 0 & -g\cos\theta_0\\
Z_u & Z_w & u_0 & -g\sin\theta_0\\
M_u + M_{\dot w}Z_u & M_w + M_{\dot w}Z_w & M_q + M_{\dot w}u_0 & -M_{\dot w}g\sin\theta_0\\
0 & 0 & 1 & 0
\end{bmatrix},\qquad
\mathbf{B}_{\text{long}} = \begin{bmatrix} X_{\delta e}\\ Z_{\delta e}\\ M_{\delta e} + M_{\dot w}Z_{\delta e}\\ 0\end{bmatrix}.
$$ {#eq-a-long}

::: example The longitudinal system matrix {#ex-a-long}
Assemble $\mathbf{A}_{\text{long}}$ for the jet transport in level cruise ($\theta_0 = 0$, $M_u = 0$, $X_{\delta e} = 0$) from [[#ex-long-derivs]].
::: solution
The third row: $M_{\dot w}Z_u = (-3.26\times10^{-4})(-0.0852) = 2.78\times10^{-5}$; $M_w + M_{\dot w}Z_w = -0.003287 + 1.32\times10^{-4} = -0.003154$; $M_q + M_{\dot w}u_0 = -0.2253 - 0.0751 = -0.3005$. Hence
$$
\mathbf{A}_{\text{long}} = \begin{bmatrix}
-0.00501 & 0.0230 & 0 & -9.807\\
-0.0852 & -0.406 & 230.15 & 0\\
2.78\times10^{-5} & -0.003154 & -0.3005 & 0\\
0 & 0 & 1 & 0
\end{bmatrix},\qquad
\mathbf{B}_{\text{long}} = \begin{bmatrix} 0\\ -5.908\\ -1.648\\ 0\end{bmatrix}.
$$
Sanity check: the matrix has the expected structure — a gravity term coupling pitch attitude to speed, the large $u_0$ coupling pitch rate to vertical velocity, and small speed derivatives. Its eigenvalues, computed in [[flight-mechanics/dynamic-modes]], are $-0.354 \pm 0.850\mathrm{i}$ and $-0.00157 \pm 0.0569\mathrm{i}\ \mathrm{s^{-1}}$: one fast, well-damped oscillation and one very slow, lightly damped one.
:::
:::

The lateral–directional equations are usually written in $\mathbf{x} = (\beta, p, r, \phi)^{\mathsf T}$. With $I_{xz}$ neglected (or absorbed into "primed" derivatives $L'_\beta$, $N'_\beta$, … that solve the coupled roll–yaw pair), level flight and $Y_p$, $Y_r$ neglected:
$$
\mathbf{A}_{\text{lat}} = \begin{bmatrix}
Y_\beta/u_0 & 0 & -1 & g\cos\theta_0/u_0\\
L_\beta & L_p & L_r & 0\\
N_\beta & N_p & N_r & 0\\
0 & 1 & 0 & 0
\end{bmatrix},
$$ {#eq-a-lat}
with $Y_\beta = qSC_{Y\beta}/m$, $L_\beta = qSbC_{l\beta}/I_x$, $L_p = qSb^2C_{lp}/(2I_xu_0)$, and so on.

::: example Lateral derivatives of the jet transport {#ex-lat-derivs}
For the jet transport at the same cruise condition with $b = 34.13\ \mathrm{m}$, $I_x = 1.4\times10^{6}$ and $I_z = 4.8\times10^{6}\ \mathrm{kg\,m^2}$ ($I_{xz}$ neglected) and $C_{Y\beta} = -0.80$, $C_{l\beta} = -0.13$, $C_{n\beta} = 0.12$, $C_{lp} = -0.45$, $C_{np} = -0.03$, $C_{lr} = 0.15$, $C_{nr} = -0.18$, assemble $\mathbf{A}_{\text{lat}}$.
::: solution
$qSb = 4.0332\times10^{7}\ \mathrm{N\,m}$; $qSb^2/(2u_0) = 2.9905\times10^{6}\ \mathrm{N\,m\,s}$.
$$
\begin{aligned}
Y_\beta &= -0.80 \times 1.1817\times10^{6}/70\,000 = -13.51\ \mathrm{m\,s^{-2}}, &
L_\beta &= -0.13 \times 4.0332\times10^{7}/1.4\times10^{6} = -3.745\ \mathrm{s^{-2}},\\
N_\beta &= 0.12 \times 4.0332\times10^{7}/4.8\times10^{6} = 1.008\ \mathrm{s^{-2}}, &
L_p &= -0.45 \times 2.9905\times10^{6}/1.4\times10^{6} = -0.961\ \mathrm{s^{-1}},\\
N_p &= -0.03 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.0187\ \mathrm{s^{-1}}, &
L_r &= 0.15 \times 2.9905\times10^{6}/1.4\times10^{6} = 0.320\ \mathrm{s^{-1}},\\
N_r &= -0.18 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.112\ \mathrm{s^{-1}}. & &
\end{aligned}
$$
With $Y_\beta/u_0 = -0.0587\ \mathrm{s^{-1}}$ and $g/u_0 = 0.0426\ \mathrm{s^{-1}}$,
$$
\mathbf{A}_{\text{lat}} = \begin{bmatrix}
-0.0587 & 0 & -1 & 0.0426\\
-3.745 & -0.961 & 0.320 & 0\\
1.008 & -0.0187 & -0.112 & 0\\
0 & 1 & 0 & 0
\end{bmatrix}.
$$
Sanity check: the roll derivatives are large because $I_x$ is the smallest inertia; the $-1$ in the first row says that a yaw rate turns the nose away from the velocity vector and so creates sideslip, and $g/u_0$ that bank angle tilts the lift and makes the aircraft slip. Its eigenvalues (next lesson) are $-0.0283 \pm 1.058\mathrm{i}$, $-1.072$ and $-0.0034\ \mathrm{s^{-1}}$.
:::
:::

::: widget phaseplane
f: -0.406*x + y
g: -0.726*x - 0.3005*y
x: -0.2, 0.2
y: -0.2, 0.2
points: 0.15, 0; -0.1, 0.1; 0, -0.15
nullclines: true
caption: The short-period approximation of the jet transport's pitch motion (developed in [[flight-mechanics/dynamic-modes]]): state $(\Delta\alpha, \Delta q)$ in radians and rad/s, from the second and third rows of $\mathbf{A}_{\text{long}}$ with speed held constant. Every trajectory spirals into the trim point in a few seconds — the linearised dynamics near a stable trim. Notice that the spirals are tighter (less damped) than a critically damped motion: this aircraft overshoots slightly after a pitch disturbance.
:::

::: quiz
In the linearised longitudinal equations, why does the pitch-rate perturbation $\Delta q$ appear multiplied by $u_0$ in the $z$-force equation?
- [ ] Because of the pitch damping derivative $M_q$
- [x] Because body axes rotate: a pitch rate turns the body $x$-axis away from the velocity vector, which appears in body axes as a rate of change of $w$
- [ ] Because of the downwash lag
- [ ] Because the thrust line is inclined
::: solution
It is the $-qu$ term of the transport theorem in [[#eq-force]], linearised to $-u_0\Delta q$. In a steady pull-up with $\dot w = 0$, the extra lift $\Delta Z = -mu_0\Delta q$ is exactly the centripetal force of the curved flight path.
:::
:::

::: history
G. H. Bryan and W. E. Williams wrote down linearised equations for the longitudinal motion of a glider in 1904, and Bryan's *Stability in Aviation* (1911) gave the full small-disturbance equations in body axes, introduced the **stability derivatives** (he called them "resistance derivatives"), and showed that the motion splits into longitudinal and lateral sets whose stability follows from the roots of quartic characteristic equations — essentially the framework of this lesson. Leonard Bairstow and his colleagues at the National Physical Laboratory developed wind-tunnel methods for measuring the derivatives in the years just before the First World War, and examined when the symmetric and asymmetric motions may be treated independently, turning Bryan's theory into an engineering tool. The 1950s brought electronic analogue and then digital computers able to integrate the full nonlinear six-degree-of-freedom equations, and the inertia-coupling problems of that decade's high-speed aircraft, predicted by William H. Phillips of NACA Langley in 1948 (NACA TN 1627), showed where the linear decoupled theory breaks down.
:::

::: summary
- Body axes ($x$ forward, $y$ right, $z$ down) rotate with the aircraft; Euler angles $(\psi, \theta, \phi)$ in the 3-2-1 sequence give its attitude; gravity in body axes is $mg(-\sin\theta, \cos\theta\sin\phi, \cos\theta\cos\phi)$.
- Euler rates: $\dot\phi = p + (q\sin\phi + r\cos\phi)\tan\theta$, $\dot\theta = q\cos\phi - r\sin\phi$, $\dot\psi = (q\sin\phi + r\cos\phi)\sec\theta$ — singular at $\theta = \pm90^\circ$.
- Forces: $m(\dot{\mathbf V}_b + \boldsymbol\omega\times\mathbf V) = \mathbf F + \mathbf W$; moments: $\mathbf M = \mathbf I\dot{\boldsymbol\omega} + \boldsymbol\omega\times\mathbf I\boldsymbol\omega$ with $I_{xz}$ for a symmetric aircraft.
- Linearised about steady symmetric flight, the equations split into longitudinal $(\Delta u, \Delta w, \Delta q, \Delta\theta)$ and lateral $(\beta, p, r, \phi)$ sets.
- Aerodynamics enter as stability derivatives; $X_u = -2qSC_D/(mu_0)$, $Z_w = -qS(C_{L\alpha} + C_D)/(mu_0)$, $M_q = C_{mq}(\bar c/2u_0)qS\bar c/I_y$, etc.
- Each set is $\dot{\mathbf x} = \mathbf A\mathbf x + \mathbf B\mathbf u$; the eigenvalues of $\mathbf A$ are the aircraft's modes.
:::

## Exercises

::: exercise Gravity in body axes {level=1 check="3633"}
The light aircraft ($m = 1100\ \mathrm{kg}$) has $\theta = 10^\circ$ and $\phi = 20^\circ$. Find the $y_b$-component of its weight. (Enter it in N, rounded to the nearest newton.)
::: solution
$W_y = mg\cos\theta\sin\phi = 10\,787 \times 0.98481 \times 0.34202 = 3633\ \mathrm{N}$. The other components are $W_x = -10\,787\sin 10^\circ = -1873\ \mathrm{N}$ and $W_z = 10\,787\cos 10^\circ\cos 20^\circ = 9983\ \mathrm{N}$; their magnitudes combine to $10\,787\ \mathrm{N}$.
:::
:::

::: exercise Heading rate from body rates {level=1 check="0.0364"}
An aircraft at $\theta = 10^\circ$, $\phi = 20^\circ$ has body rates $p = 0.10$, $q = 0.05$ and $r = 0.02\ \mathrm{rad/s}$. Find $\dot\psi$. (Enter it in rad/s, rounded to three significant figures.)
::: solution
$\dot\psi = (q\sin\phi + r\cos\phi)/\cos\theta = (0.05 \times 0.34202 + 0.02 \times 0.93969)/0.98481 = (0.017101 + 0.018794)/0.98481 = 0.0364\ \mathrm{rad/s}$. Also $\dot\theta = 0.0401$ and $\dot\phi = 0.1063\ \mathrm{rad/s}$.
:::
:::

::: exercise Speed derivative from L/D {level=1 check="-0.00501"}
Show that for level flight with $C_{Du} = 0$, $X_u = -2g/(u_0\,L/D)$, and evaluate it for $u_0 = 230.15\ \mathrm{m/s}$ and $L/D = 17.02$. (Enter $X_u$ in $\mathrm{s^{-1}}$, rounded to three significant figures.)
::: solution
$X_u = -2qSC_D/(mu_0)$ and in level flight $qSC_L = mg$, so $qSC_D = mg\,C_D/C_L = mg/(L/D)$; hence $X_u = -2g/(u_0\,L/D) = -2 \times 9.80665/(230.15 \times 17.02) = -0.00501\ \mathrm{s^{-1}}$.
:::
:::

::: exercise Pitch damping of the light aircraft {level=2 check="-12.5"}
Estimate $C_{mq} \approx -2\eta\bar V_Ha_t\,l_t/\bar c$ for the tail of the light aircraft ($\eta = 0.90$, $\bar V_H = 0.5669$, $a_t = 4.0\ \mathrm{rad^{-1}}$, $l_t = 4.5\ \mathrm{m}$, $\bar c = 1.47\ \mathrm{m}$). (Enter $C_{mq}$ rounded to three significant figures.)
::: solution
$C_{mq} \approx -2 \times 0.90 \times 0.5669 \times 4.0 \times (4.5/1.47) = -2 \times 0.90 \times 0.5669 \times 4.0 \times 3.061 = -12.5$. Derivation: a pitch rate $q$ raises the tail angle of attack by $ql_t/u_0 = 2\hat q\,l_t/\bar c$, which changes the tail lift coefficient by $a_t \times 2\hat ql_t/\bar c$ and the moment by $-\eta\bar V_H$ times that. (Many texts add about $10\,\%$ for the wing and fuselage.)
:::
:::

::: exercise Transport theorem in a pull-up {level=2}
In a steady pull-up the light aircraft flies at $u = 50\ \mathrm{m/s}$, $w = 0$, $q = 0.2\ \mathrm{rad/s}$, wings level and momentarily at $\theta = 0$. Use [[#eq-force]] to find the aerodynamic force $Z$ and the load factor, and check against the pull-up formula of [[flight-mechanics/manoeuvres-takeoff-landing#eq-pullup]].
::: solution
With $\dot w = 0$, $p = v = 0$: $m(-qu) = Z + mg$, so $Z = -m(qu + g) = -1100 \times (10 + 9.807) = -21\,788\ \mathrm{N}$ (upward lift of $21.8\ \mathrm{kN}$). The load factor is $-Z/W = 21\,788/10\,787 = 2.02$. The flight-path radius is $u/q = 250\ \mathrm{m}$, and $1 + V^2/(gR) = 1 + 2500/(9.807 \times 250) = 2.02$. ✓
:::
:::

::: exercise Inertia coupling {level=2}
Using [[#eq-moment]] with $I_{xz} = 0$, show that a fighter rolling steadily at $p$ with a small yaw rate $r$ experiences a pitching acceleration $\dot q = (I_z - I_x)pr/I_y$, and estimate it for $I_x = 2.5\times10^{4}$, $I_y = 1.6\times10^{5}$, $I_z = 1.8\times10^{5}\ \mathrm{kg\,m^2}$, $p = 3\ \mathrm{rad/s}$, $r = 0.1\ \mathrm{rad/s}$ with no aerodynamic pitching moment.
::: solution
The pitch equation with $M = 0$, $I_{xz} = 0$: $I_y\dot q + (I_x - I_z)pr = 0$, so $\dot q = (I_z - I_x)pr/I_y = (1.8\times10^{5} - 2.5\times10^{4}) \times 0.3/1.6\times10^{5} = 0.29\ \mathrm{rad/s^2}$ — about $17^\circ/\mathrm{s^2}$, comparable to full elevator authority. For slender aircraft with mass concentrated in the fuselage ($I_x \ll I_z$), fast rolls generate large pitching and yawing moments that the linear, decoupled theory cannot represent.
:::
:::

::: exercise Characteristic polynomial {level=3}
Using a computer or by hand, find the characteristic polynomial $\det(s\mathbf I - \mathbf A_{\text{long}})$ of the matrix in [[#ex-a-long]], and show that it factors approximately into $(s^2 + 0.708s + 0.848)(s^2 + 0.00314s + 0.00324)$.
::: solution
Expanding the determinant (or with `numpy.poly`) gives $s^4 + 0.7114s^3 + 0.8534s^2 + 0.004960s + 0.002747$. Multiplying the suggested factors: $s^4 + (0.708 + 0.00314)s^3 + (0.848 + 0.708 \times 0.00314 + 0.00324)s^2 + (0.708 \times 0.00324 + 0.848 \times 0.00314)s + 0.848 \times 0.00324 = s^4 + 0.7111s^3 + 0.8535s^2 + 0.004957s + 0.002748$ — agreement to about $1\,\%$ in every coefficient. The large gap between the two natural frequencies ($0.92$ and $0.057\ \mathrm{rad/s}$) is what allows the two-mode factorisation, and it is the basis of the short-period and phugoid approximations of [[flight-mechanics/dynamic-modes]].
:::
:::

::: exercise Choosing a simulation model {level=3}
A team must build a simulator to evaluate (a) the autopilot's altitude-hold performance in cruise, (b) recovery from a $90^\circ$-bank upset, and (c) an aerobatic aircraft flying a vertical climb with rolls. For each, state which equations of this lesson they should use (linear or nonlinear, decoupled or coupled, Euler angles or quaternions), justify the choice, and list the main data they need.
::: solution
(a) Altitude hold in cruise involves small disturbances about steady level flight: the linear longitudinal model [[#eq-a-long]] with $\Delta h$ added as a fifth state ($\Delta\dot h = u_0\Delta\theta - \Delta w$) is adequate for control design; data: the longitudinal stability and control derivatives at the cruise condition, engine thrust response. Final verification on the nonlinear model. (b) A $90^\circ$ bank is not a small disturbance: the coupling between lateral and longitudinal motion (lift tilted, nose dropping) is essential — use the full nonlinear six-degree-of-freedom equations [[#eq-force]]–[[#eq-moment]] with Euler angles (no vertical flight), and aerodynamic data over a wide range of $\alpha$, $\beta$ and rates, including near the stall. (c) Vertical flight makes the Euler-angle kinematics singular: use quaternions for attitude; the full nonlinear coupled equations with $I_{xz}$, inertia coupling during rolls, and engine torque and gyroscopic effects; aerodynamic data at high angles of attack and sideslip. In all cases a good answer mentions validation of the model against flight-test data.
:::
:::
