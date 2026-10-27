Kinematics describes how a robot can move; dynamics says what it costs. To swing a loaded arm through a trajectory the motors must supply torques that accelerate the links, fight gravity, and overcome the coupling forces that one moving link exerts on another — the centrifugal pull on the elbow when the shoulder spins, the reaction on the shoulder when the forearm accelerates. The **equations of motion** of a serial manipulator relate joint torques $\boldsymbol\tau$ to joint positions, velocities and accelerations, and for every rigid serial arm they have the same structure,
$$
M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau ,
$$
with a configuration-dependent mass matrix $M$, Coriolis and centrifugal terms $C\dot{\mathbf q}$, and gravity torques $\mathbf g$. This chapter derives that structure with Lagrange's equations, using the Jacobians of [[robotics/jacobians]] to express each link's kinetic energy; proves the properties that make the model useful for control (positive definite $M$, the skew-symmetry of $\dot M - 2C$, linearity in the inertial parameters); works out the planar two-link arm and a geared single joint completely; and then develops the recursive Newton–Euler algorithm that computes the same torques link by link in time proportional to the number of links. From here on joint variables are written $\mathbf q$ (angles for revolute joints, lengths for prismatic ones), as is usual in dynamics and control. Rigid-body kinetics, mass moments of inertia and the parallel-axis theorem are taken from [[dynamics/rigid-body-kinetics]] and [[dynamics/three-dimensional-dynamics]]; Lagrange's equations are introduced in [[dynamics/rigid-body-energy-momentum]].

## Kinetic and potential energy of a serial arm {#sec-energy}

Let link $i$ have mass $m_i$, centre of mass $\mathbf p_{ci}(\mathbf q)$ and inertia tensor $\mathcal I_i$ about its centre of mass, expressed in a frame fixed to the link. Its orientation is $R_i(\mathbf q)$, so its inertia tensor in base coordinates is $R_i\mathcal I_iR_i^{\mathsf T}$. The velocity of the centre of mass and the angular velocity of the link are linear in $\dot{\mathbf q}$, by exactly the argument that gave the end-effector Jacobian, but stopping at link $i$:
$$
\dot{\mathbf p}_{ci} = J_{v,i}(\mathbf q)\,\dot{\mathbf q},\qquad \boldsymbol\omega_i = J_{\omega,i}(\mathbf q)\,\dot{\mathbf q},
$$ {#eq-link-jacobians}
where $J_{v,i}$ and $J_{\omega,i}$ are $3\times n$ matrices whose columns $i+1,\dots,n$ are zero (joints beyond link $i$ do not move it), and whose column $j\le i$ is $(\mathbf z_{j-1}\times(\mathbf p_{ci} - \mathbf o_{j-1}),\ \mathbf z_{j-1})$ for a revolute joint and $(\mathbf z_{j-1}, \mathbf 0)$ for a prismatic one.

::: proposition The mass matrix {#prop-mass-matrix}
The total kinetic energy of the arm is a quadratic form in the joint velocities,
$$
K = \tfrac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q},\qquad
M(\mathbf q) = \sum_{i=1}^n\Big(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i}\Big),
$$ {#eq-mass-matrix}
and $M(\mathbf q)$ is symmetric and positive definite for every $\mathbf q$.
:::

::: proof
The kinetic energy of a rigid body is the sum of translational energy of its centre of mass and rotational energy about it, $K_i = \frac12m_i\lVert\dot{\mathbf p}_{ci}\rVert^2 + \frac12\boldsymbol\omega_i^{\mathsf T}(R_i\mathcal I_iR_i^{\mathsf T})\boldsymbol\omega_i$ (König's theorem, [[dynamics/three-dimensional-dynamics]]). Substituting [[#eq-link-jacobians]] gives $K_i = \frac12\dot{\mathbf q}^{\mathsf T}\big(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i}\big)\dot{\mathbf q}$, and summing over links gives [[#eq-mass-matrix]]. Each term is symmetric because $\mathcal I_i$ is. For positive definiteness, $\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} = 2K \ge 0$ since masses and inertia tensors are positive (semi)definite. If $2K = 0$, every link has zero centre-of-mass velocity and zero angular velocity; in particular link 1 is at rest, which (link 1 being attached to the base by joint 1, and having non-zero mass or inertia about joint 1) forces $\dot q_1 = 0$; then link 2 is at rest relative to link 1, forcing $\dot q_2 = 0$; and so on. So $\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} > 0$ for $\dot{\mathbf q} \ne \mathbf 0$. The assumption that each link has mass or inertia that is moved by its own joint excludes massless links, for which $M$ can be singular.
:::

The potential energy in a uniform gravity field $\mathbf g_0$ (for example $(0, 0, -9.81)\,\mathrm{m/s^2}$) is $P(\mathbf q) = -\sum_i m_i\mathbf g_0^{\mathsf T}\mathbf p_{ci}(\mathbf q)$, the sum of $m_igh_i$ over the links' centre-of-mass heights.

## The Euler–Lagrange equations {#sec-lagrange}

::: theorem Equations of motion of a serial manipulator {#thm-eom}
With Lagrangian $\mathcal L = K - P$, $K = \frac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q}$ and generalised forces $\boldsymbol\tau$ (joint torques and forces, the only non-conservative forces), Lagrange's equations $\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q_k} - \frac{\partial\mathcal L}{\partial q_k} = \tau_k$ take the form
$$
\sum_j m_{kj}(\mathbf q)\ddot q_j + \sum_{i,j}c_{ijk}(\mathbf q)\dot q_i\dot q_j + g_k(\mathbf q) = \tau_k ,\qquad k = 1,\dots,n,
$$
with the **Christoffel symbols** and gravity torques
$$
c_{ijk} = \frac12\left(\frac{\partial m_{kj}}{\partial q_i} + \frac{\partial m_{ki}}{\partial q_j} - \frac{\partial m_{ij}}{\partial q_k}\right),\qquad g_k = \frac{\partial P}{\partial q_k}.
$$
In matrix form $M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau$, where $C$ has entries $C_{kj} = \sum_ic_{ijk}\dot q_i$.
:::

::: proof
$\partial\mathcal L/\partial\dot q_k = \sum_jm_{kj}\dot q_j$ (using the symmetry of $M$), so
$$
\frac{d}{dt}\frac{\partial\mathcal L}{\partial\dot q_k} = \sum_jm_{kj}\ddot q_j + \sum_{i,j}\frac{\partial m_{kj}}{\partial q_i}\dot q_i\dot q_j .
$$
Also $\partial\mathcal L/\partial q_k = \frac12\sum_{i,j}\frac{\partial m_{ij}}{\partial q_k}\dot q_i\dot q_j - \partial P/\partial q_k$. Subtracting, the velocity terms are $\sum_{i,j}\big(\frac{\partial m_{kj}}{\partial q_i} - \frac12\frac{\partial m_{ij}}{\partial q_k}\big)\dot q_i\dot q_j$. Since $\dot q_i\dot q_j$ is symmetric in $i, j$, we may replace $\frac{\partial m_{kj}}{\partial q_i}$ by its symmetrised version $\frac12\big(\frac{\partial m_{kj}}{\partial q_i} + \frac{\partial m_{ki}}{\partial q_j}\big)$ without changing the sum. This gives the Christoffel form. The assumptions are those of Lagrangian mechanics: rigid links, ideal (workless) joint constraints, holonomic coordinates $\mathbf q$, and all non-conservative effects (motor torques, friction) collected in $\boldsymbol\tau$.
:::

Terms with $i = j$ ($\dot q_i^2$) are **centrifugal**; terms with $i\ne j$ ($\dot q_i\dot q_j$) are **Coriolis**. The matrix $C$ is not unique — many matrices give the same vector $C\dot{\mathbf q}$ — but the Christoffel choice has a special property.

::: proposition Structural properties {#prop-properties}
For the Christoffel matrix $C$:
1. **Skew-symmetry**: $N(\mathbf q,\dot{\mathbf q}) = \dot M(\mathbf q) - 2C(\mathbf q,\dot{\mathbf q})$ is skew-symmetric, so $\mathbf x^{\mathsf T}N\mathbf x = 0$ for all $\mathbf x$.
2. **Power balance**: along any motion, $\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$.
3. **Linearity in the parameters**: there is a matrix $Y(\mathbf q,\dot{\mathbf q},\ddot{\mathbf q})$ of known functions and a constant vector $\boldsymbol\pi$ of inertial parameters (masses, first moments $m_i\mathbf r_{ci}$, inertia tensor entries) such that $M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = Y(\mathbf q,\dot{\mathbf q},\ddot{\mathbf q})\,\boldsymbol\pi$.
:::

::: proof
(1) $\dot m_{kj} = \sum_i\frac{\partial m_{kj}}{\partial q_i}\dot q_i$, and $C_{kj} = \sum_ic_{ijk}\dot q_i$, so
$$
N_{kj} = \sum_i\Big(\frac{\partial m_{kj}}{\partial q_i} - \frac{\partial m_{kj}}{\partial q_i} - \frac{\partial m_{ki}}{\partial q_j} + \frac{\partial m_{ij}}{\partial q_k}\Big)\dot q_i = \sum_i\Big(\frac{\partial m_{ij}}{\partial q_k} - \frac{\partial m_{ki}}{\partial q_j}\Big)\dot q_i .
$$
Swapping $k$ and $j$ and using the symmetry of $M$ ($m_{ij} = m_{ji}$) gives $N_{jk} = \sum_i\big(\frac{\partial m_{ik}}{\partial q_j} - \frac{\partial m_{ji}}{\partial q_k}\big)\dot q_i = -N_{kj}$.
(2) $\frac{d}{dt}K = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \frac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q}$ and $\frac{d}{dt}P = \dot{\mathbf q}^{\mathsf T}\mathbf g$. Substitute $M\ddot{\mathbf q} = \boldsymbol\tau - C\dot{\mathbf q} - \mathbf g$: $\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau + \frac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q} = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$ by (1). The physical content — the motors' power equals the rate of change of mechanical energy — holds for any valid $C$, but only the skew-symmetric choice makes the identity hold term by term, which is what control proofs use ([[robotics/robot-control]]).
(3) Write the centre of mass of link $i$ as $\mathbf p_{ci} = \mathbf o_i + R_i\mathbf r_{ci}$ with $\mathbf r_{ci}$ constant in the link frame. The kinetic energy of link $i$ can be written with the inertia tensor about the frame origin, $\bar{\mathcal I}_i = \mathcal I_i + m_i(\lVert\mathbf r_{ci}\rVert^2I - \mathbf r_{ci}\mathbf r_{ci}^{\mathsf T})$ (parallel-axis theorem), as $K_i = \frac12m_i\lVert\dot{\mathbf o}_i\rVert^2 + m_i\dot{\mathbf o}_i^{\mathsf T}(\boldsymbol\omega_i\times R_i\mathbf r_{ci}) + \frac12\boldsymbol\omega_i^{\mathsf T}R_i\bar{\mathcal I}_iR_i^{\mathsf T}\boldsymbol\omega_i$, which is linear in $m_i$, in the first moment $m_i\mathbf r_{ci}$ and in the six entries of $\bar{\mathcal I}_i$, with coefficients that are functions of $\mathbf q, \dot{\mathbf q}$. $P_i = -\mathbf g_0^{\mathsf T}(m_i\mathbf o_i + R_im_i\mathbf r_{ci})$ is linear in the same parameters. Lagrange's equations are linear operations on $\mathcal L$, so the torques are linear in these ten parameters per link.
:::

Linearity in the parameters is what makes it possible to *identify* a robot's inertial parameters from measured motions and torques by least squares, and to adapt them online. Skew-symmetry makes the robot **passive**: the energy it stores can only come from the motors.

## The planar two-link arm {#sec-2r}

::: example Dynamics of a 2R arm in a vertical plane {#ex-2r-dynamics}
Two uniform rigid links move in a vertical plane, joint angles measured anticlockwise with $q_1$ from the horizontal. Link $i$ has mass $m_i$, length $L_i$, centre of mass at $\ell_i = L_i/2$ and central moment of inertia $I_i = m_iL_i^2/12$ about an axis perpendicular to the plane. Derive $M$, $C$ and $\mathbf g$. Then, for $m_1 = 2.0\,\mathrm{kg}$, $m_2 = 1.5\,\mathrm{kg}$, $L_1 = 0.6\,\mathrm m$, $L_2 = 0.5\,\mathrm m$, compute the torques needed at $\mathbf q = (30^\circ, 60^\circ)$, $\dot{\mathbf q} = (1.0, -0.5)\,\mathrm{rad/s}$, $\ddot{\mathbf q} = (2.0, 1.0)\,\mathrm{rad/s^2}$.
::: solution
*Free-body picture.* Each link carries its weight $m_ig$ at its centre of mass; joint 1 carries the base reaction and motor torque $\tau_1$; joint 2 carries equal and opposite internal forces and the motor torque $\tau_2$ (acting on link 2, with $-\tau_2$ on link 1). The Lagrangian method needs only the energies.
*Kinematics.* $\mathbf p_{c1} = \ell_1(c_1, s_1)$, $\mathbf p_{c2} = (L_1c_1 + \ell_2c_{12},\ L_1s_1 + \ell_2s_{12})$, so
$$
J_{v,1} = \begin{bmatrix} -\ell_1s_1 & 0\\ \ell_1c_1 & 0\end{bmatrix},\qquad
J_{v,2} = \begin{bmatrix} -L_1s_1 - \ell_2s_{12} & -\ell_2s_{12}\\ L_1c_1 + \ell_2c_{12} & \ell_2c_{12}\end{bmatrix},
$$
and the angular velocities are $\omega_1 = \dot q_1$, $\omega_2 = \dot q_1 + \dot q_2$, i.e. $J_{\omega,1} = [1\ 0]$, $J_{\omega,2} = [1\ 1]$.
*Mass matrix.* From [[#eq-mass-matrix]], using $J_{v,2}^{\mathsf T}J_{v,2}$ entries $L_1^2 + \ell_2^2 + 2L_1\ell_2c_2$, $\ell_2^2 + L_1\ell_2c_2$, $\ell_2^2$:
$$
M(\mathbf q) = \begin{bmatrix}
m_1\ell_1^2 + I_1 + m_2(L_1^2 + \ell_2^2 + 2L_1\ell_2c_2) + I_2 & m_2(\ell_2^2 + L_1\ell_2c_2) + I_2\\
m_2(\ell_2^2 + L_1\ell_2c_2) + I_2 & m_2\ell_2^2 + I_2
\end{bmatrix}.
$$
*Coriolis and centrifugal terms.* Only $m_{11}$ and $m_{12}$ depend on $\mathbf q$, through $q_2$: $\partial m_{11}/\partial q_2 = 2h$, $\partial m_{12}/\partial q_2 = h$, with $h = -m_2L_1\ell_2s_2$. The non-zero Christoffel symbols are $c_{121} = c_{211} = h$, $c_{221} = h$, $c_{112} = -h$, so
$$
C(\mathbf q,\dot{\mathbf q}) = \begin{bmatrix} h\dot q_2 & h(\dot q_1 + \dot q_2)\\ -h\dot q_1 & 0\end{bmatrix},\qquad
C\dot{\mathbf q} = \begin{bmatrix} h(2\dot q_1\dot q_2 + \dot q_2^2)\\ -h\dot q_1^2\end{bmatrix}.
$$
*Gravity.* $P = m_1g\ell_1s_1 + m_2g(L_1s_1 + \ell_2s_{12})$, so $g_1 = (m_1\ell_1 + m_2L_1)gc_1 + m_2\ell_2gc_{12}$ and $g_2 = m_2\ell_2gc_{12}$.
*Numbers.* $I_1 = 2.0\times0.36/12 = 0.0600\,\mathrm{kg\,m^2}$, $I_2 = 1.5\times0.25/12 = 0.03125\,\mathrm{kg\,m^2}$, $\ell_1 = 0.30$, $\ell_2 = 0.25\,\mathrm m$; $c_2 = 0.5$, $s_2 = 0.8660$.
$$
M = \begin{bmatrix} 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0.15) + 0.03125 & 1.5(0.0625 + 0.075) + 0.03125\\ \cdot & 1.5(0.0625) + 0.03125\end{bmatrix} = \begin{bmatrix} 1.1300 & 0.2375\\ 0.2375 & 0.1250\end{bmatrix}\mathrm{kg\,m^2}.
$$
$h = -1.5\times0.6\times0.25\times0.8660 = -0.1949\,\mathrm{kg\,m^2}$, so $C\dot{\mathbf q} = \big(-0.1949(2(1.0)(-0.5) + 0.25),\ 0.1949(1.0)^2\big) = (0.1461, 0.1949)\,\mathrm{N\,m}$. Gravity: $q_1 + q_2 = 90^\circ$ so $c_{12} = 0$, $g_1 = (0.6 + 0.9)(9.81)(0.8660) = 12.744\,\mathrm{N\,m}$, $g_2 = 0$. Finally
$$
\boldsymbol\tau = M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \begin{bmatrix} 2.260 + 0.2375 + 0.1461 + 12.744\\ 0.475 + 0.125 + 0.1949 + 0\end{bmatrix} = \begin{bmatrix} 15.39\\ 0.795\end{bmatrix}\mathrm{N\,m}.
$$
Sanity checks: gravity dominates $\tau_1$ (a 3.5 kg arm held out at an angle), and $g_2 = 0$ because link 2 is vertical. The centrifugal term $0.195\,\mathrm{N\,m}$ on joint 2 is the outward pull on the forearm caused by the shoulder spinning at $1\,\mathrm{rad/s}$; it is a quarter of joint 2's total torque — dynamic coupling is not negligible even at modest speeds.
:::
:::

::: example Checking skew-symmetry {#ex-skew}
Verify property 1 of [[#prop-properties]] for the arm and state of [[#ex-2r-dynamics]].
::: solution
$\dot M = \frac{\partial M}{\partial q_2}\dot q_2$ with $\partial m_{11}/\partial q_2 = 2h$, $\partial m_{12}/\partial q_2 = h$: $\dot M = \dot q_2\begin{bmatrix} 2h & h\\ h & 0\end{bmatrix} = \begin{bmatrix} 0.1949 & 0.0974\\ 0.0974 & 0\end{bmatrix}$ (with $h = -0.1949$, $\dot q_2 = -0.5$). And $C = \begin{bmatrix} h\dot q_2 & h(\dot q_1 + \dot q_2)\\ -h\dot q_1 & 0\end{bmatrix} = \begin{bmatrix} 0.0974 & -0.0974\\ 0.1949 & 0\end{bmatrix}$. Then
$$
\dot M - 2C = \begin{bmatrix} 0.1949 - 0.1949 & 0.0974 + 0.1949\\ 0.0974 - 0.3898 & 0\end{bmatrix} = \begin{bmatrix} 0 & 0.2923\\ -0.2923 & 0\end{bmatrix},
$$
skew-symmetric ✓. If we had instead written the same vector $C\dot{\mathbf q}$ as $\begin{bmatrix} 2h\dot q_2 & h\dot q_2\\ -h\dot q_1 & 0\end{bmatrix}\dot{\mathbf q}$ (equally valid for computing torques), $\dot M - 2C$ would have diagonal entry $2h\dot q_2 - 4h\dot q_2 \ne 0$: not skew. The property belongs to the Christoffel factorisation.
:::
:::

How strongly does the configuration change the inertia? The figure plots the entries of $M$ against the elbow angle.

::: widget plot
f: 0.18 + 0.06 + m2*(0.36 + 0.0625 + 0.3*cos(x)) + m2*0.25/12; m2*(0.0625 + 0.15*cos(x)) + m2*0.25/12; m2*0.0625 + m2*0.25/12
x: -pi, pi
y: -0.2, 2
sliders: m2=1.5:0.5:5:0.1
labels: m_{11}; m_{12}; m_{22}
piticks: true
caption: Entries of the mass matrix ($\mathrm{kg\,m^2}$) of the arm of the worked example against the elbow angle $q_2$, with the forearm mass $m_2$ (including any payload spread along it) adjustable. The inertia seen by the shoulder, $m_{11}$, is largest with the arm stretched ($q_2 = 0$) and smallest folded ($q_2 = \pm\pi$): with $m_2 = 1.5\,\mathrm{kg}$ it varies by a factor of almost 3. Increase $m_2$ and the variation grows. A fixed-gain joint controller tuned for one configuration is therefore too soft or too stiff in another — one motivation for the model-based controllers of [[robotics/robot-control]].
:::

## Actuators, gears and reflected inertia {#sec-gears}

Electric motors ([[mechatronics/electric-actuators]]) run fast with small torque, so each joint has a reduction gear of ratio $N$ (motor angle $= Nq$). A motor torque $\tau_m$ produces joint torque $N\tau_m$ (ignoring gear losses), and the rotor's own inertia $J_m$, spinning $N$ times faster than the joint, contributes kinetic energy $\frac12J_m(N\dot q)^2$: the **reflected inertia** $N^2J_m$ adds to the diagonal entry of $M$ for that joint.

::: example A geared single-link arm {#ex-geared}
A uniform link of mass $2.0\,\mathrm{kg}$ and length $0.50\,\mathrm m$ is driven about one end through a gearbox of ratio $N = 100$ by a motor with rotor inertia $J_m = 2.0\times10^{-5}\,\mathrm{kg\,m^2}$. With $q$ measured from the downward vertical and viscous friction $b\dot q$ at the joint, write the equation of motion and compare the terms.
::: solution
Kinetic energy $K = \frac12(I_O + N^2J_m)\dot q^2$ with $I_O = mL^2/3 = 2.0\times0.25/3 = 0.1667\,\mathrm{kg\,m^2}$ and $N^2J_m = 10^4\times2.0\times10^{-5} = 0.200\,\mathrm{kg\,m^2}$. Potential energy $P = -mg\frac L2\cos q$. Lagrange's equation with generalised force $N\tau_m - b\dot q$:
$$
(I_O + N^2J_m)\,\ddot q + b\dot q + mg\tfrac L2\sin q = N\tau_m,\qquad 0.367\,\ddot q + b\dot q + 4.905\sin q = 100\,\tau_m .
$$
The motor's reflected inertia is larger than the link's own inertia. That has two consequences. Dynamically, the total inertia changes little when the payload or configuration changes (a heavily geared joint "looks" nearly constant to its motor) — the reason the independent-joint controllers of [[robotics/robot-control]] work well on industrial arms. Energetically, accelerating the rotor costs more than accelerating the link. The largest gravity torque, $4.905\,\mathrm{N\,m}$ with the link horizontal, needs only $0.049\,\mathrm{N\,m}$ from the motor. In the same way, coupling torques from other links are divided by $N$ before they reach the motor, while the motor's inertia is multiplied by $N^2$.
:::
:::

## The recursive Newton–Euler algorithm {#sec-rne}

The Lagrangian derivation gives insight and closed-form expressions, but differentiating symbolic energies for six links produces enormous formulas. For computing the torques of a given motion — the **inverse dynamics** problem $\boldsymbol\tau = \mathrm{ID}(\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q})$, needed in every cycle of a model-based controller — the Newton–Euler equations applied link by link are far more efficient.

::: algorithm Recursive Newton–Euler inverse dynamics {#alg-rne}
Data: for each link $i$, mass $m_i$, centre-of-mass position, inertia tensor $\mathcal I_i$, and the joint axis $\mathbf z_{i-1}$. Input: $\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q}$. Initialise the base with $\boldsymbol\omega_0 = \boldsymbol\alpha_0 = \mathbf 0$ and $\mathbf a_0 = -\mathbf g_0$ (a fictitious upward acceleration of the base that accounts for gravity on every link at once).
1. **Forward (outward) recursion**, $i = 1,\dots,n$: for a revolute joint
$$
\boldsymbol\omega_i = \boldsymbol\omega_{i-1} + \dot q_i\mathbf z_{i-1},\qquad
\boldsymbol\alpha_i = \boldsymbol\alpha_{i-1} + \ddot q_i\mathbf z_{i-1} + \dot q_i\,\boldsymbol\omega_{i-1}\times\mathbf z_{i-1},
$$
$$
\mathbf a_{e,i} = \mathbf a_{e,i-1} + \boldsymbol\alpha_i\times\mathbf r_{i-1,i} + \boldsymbol\omega_i\times(\boldsymbol\omega_i\times\mathbf r_{i-1,i}),\qquad
\mathbf a_{c,i} = \mathbf a_{e,i-1} + \boldsymbol\alpha_i\times\mathbf r_{i-1,ci} + \boldsymbol\omega_i\times(\boldsymbol\omega_i\times\mathbf r_{i-1,ci}),
$$
where $\mathbf a_{e,i}$ is the acceleration of the origin of frame $i$ (the far end of link $i$), $\mathbf r_{i-1,i} = \mathbf o_i - \mathbf o_{i-1}$ and $\mathbf r_{i-1,ci} = \mathbf p_{ci} - \mathbf o_{i-1}$.
2. **Backward (inward) recursion**, $i = n,\dots,1$, with $\mathbf f_{n+1}$, $\mathbf n_{n+1}$ the wrench applied by the tool on the environment (zero in free motion): the force $\mathbf f_i$ and moment $\mathbf n_i$ exerted on link $i$ by link $i-1$ are
$$
\mathbf f_i = \mathbf f_{i+1} + m_i\mathbf a_{c,i},\qquad
\mathbf n_i = \mathbf n_{i+1} + \mathbf r_{i-1,ci}\times m_i\mathbf a_{c,i} + \mathbf r_{i-1,i}\times\mathbf f_{i+1} + \mathcal I_i^{(0)}\boldsymbol\alpha_i + \boldsymbol\omega_i\times(\mathcal I_i^{(0)}\boldsymbol\omega_i),
$$
with $\mathcal I_i^{(0)} = R_i\mathcal I_iR_i^{\mathsf T}$, the moments being taken about $\mathbf o_{i-1}$.
3. **Joint torques**: $\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf n_i$ (revolute) or $\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf f_i$ (prismatic).
:::

Each recursion visits each link once with a fixed amount of arithmetic, so the cost grows **linearly** in $n$ — the decisive advantage reported by Luh, Walker and Paul in 1980. The outward pass is rigid-body kinematics; the inward pass is Newton's second law $\mathbf f_i - \mathbf f_{i+1} + m_i\mathbf g_0 = m_i\mathbf a_{c,i}$ (gravity hidden in the base acceleration) and Euler's equation $\sum\mathbf M_{c} = \mathcal I\boldsymbol\alpha + \boldsymbol\omega\times\mathcal I\boldsymbol\omega$ for each link, rearranged to give the unknown force and moment from the inner joint. The joint torque is the component of that moment along the joint axis; the other components are carried by the bearings.

::: example Newton–Euler for the 2R arm {#ex-rne}
Recompute the torques of [[#ex-2r-dynamics]] with the recursive Newton–Euler algorithm.
::: solution
Work in the plane; vectors are $(x, y)$, angular quantities are scalars about $\hat{\mathbf k}$, and for a planar vector $\mathbf r$ we write $\mathbf r^\perp = \hat{\mathbf k}\times\mathbf r = (-r_y, r_x)$, so $\alpha\hat{\mathbf k}\times\mathbf r = \alpha\mathbf r^\perp$ and $\omega\hat{\mathbf k}\times(\omega\hat{\mathbf k}\times\mathbf r) = -\omega^2\mathbf r$. Unit vectors along the links: $\mathbf e_1 = (\cos30^\circ, \sin30^\circ)$, $\mathbf e_2 = (\cos90^\circ, \sin90^\circ) = (0, 1)$. To keep the arithmetic visible we apply gravity explicitly rather than through the base acceleration.
*Outward.* $\omega_1 = 1.0$, $\alpha_1 = 2.0$; $\omega_2 = 0.5$, $\alpha_2 = 3.0\,\mathrm{rad/s^2}$ (planar, so no $\boldsymbol\omega\times\mathbf z$ term). Accelerations:
$$
\mathbf a_{c1} = \alpha_1(\ell_1\mathbf e_1)^\perp - \omega_1^2\ell_1\mathbf e_1 = 2.0(-0.15, 0.2598) - (0.2598, 0.15) = (-0.5598, 0.3696)\,\mathrm{m/s^2},
$$
$$
\mathbf a_{e1} = 2.0(-0.3, 0.5196) - (0.5196, 0.3) = (-1.1196, 0.7392),\quad
\mathbf a_{c2} = \mathbf a_{e1} + 3.0(\ell_2\mathbf e_2)^\perp - 0.25\,\ell_2\mathbf e_2 = (-1.8696, 0.6767)\,\mathrm{m/s^2}.
$$
*Inward, link 2.* Newton: the force $\mathbf f_2$ from link 1 on link 2 satisfies $\mathbf f_2 + m_2\mathbf g_0 = m_2\mathbf a_{c2}$, so $\mathbf f_2 = 1.5\big((-1.8696, 0.6767) + (0, 9.81)\big) = (-2.804, 15.730)\,\mathrm N$. Euler about the centre of mass of link 2, where $\mathbf f_2$ acts at $-\ell_2\mathbf e_2 = (0, -0.25)$ relative to it: $\tau_2 + (\text{moment of }\mathbf f_2) = I_2\alpha_2$, with moment $= r_xf_y - r_yf_x = 0 - (-0.25)(-2.804) = -0.701$, so $\tau_2 = 0.03125\times3.0 + 0.701 = 0.795\,\mathrm{N\,m}$.
*Inward, link 1.* $\mathbf f_1 = m_1(\mathbf a_{c1} - \mathbf g_0) + \mathbf f_2 = 2.0(-0.5598, 10.1796) + (-2.804, 15.730) = (-3.924, 36.089)\,\mathrm N$. About the centre of mass of link 1: $\mathbf f_1$ acts at $-\ell_1\mathbf e_1 = (-0.2598, -0.15)$, giving moment $(-0.2598)(36.089) - (-0.15)(-3.924) = -9.965\,\mathrm{N\,m}$; $-\mathbf f_2$ acts at $+\ell_1\mathbf e_1 = (0.2598, 0.15)$, giving $(0.2598)(-15.730) - (0.15)(2.804) = -4.507\,\mathrm{N\,m}$; the joint-2 motor reacts on link 1 with $-\tau_2$. So $\tau_1 - \tau_2 - 9.965 - 4.507 = I_1\alpha_1 = 0.120$, i.e. $\tau_1 = 0.120 + 0.795 + 9.965 + 4.507 = 15.39\,\mathrm{N\,m}$.
Both torques agree with the Lagrangian result $(15.39, 0.795)\,\mathrm{N\,m}$ ✓. The by-products — the joint reaction forces $\mathbf f_1$, $\mathbf f_2$ — are what a designer needs to size bearings; Lagrange's method does not provide them.
:::
:::

::: warning Do not double-count gravity, and keep moment points straight
In the recursive algorithm, gravity enters *either* as the fictitious base acceleration $\mathbf a_0 = -\mathbf g_0$ *or* as an explicit weight on every link — never both. Similarly, the moment balance must be taken about one consistent point per link (the centre of mass, or the joint), with every force's moment arm measured from that point; mixing the two is the most common source of wrong Newton–Euler torques. A quick test of any dynamics code: at rest ($\dot{\mathbf q} = \ddot{\mathbf q} = \mathbf 0$) it must return exactly the static gravity torques, and in a frictionless simulation with $\boldsymbol\tau = \mathbf 0$ the total energy $K + P$ must stay constant.
:::

## Forward dynamics and simulation {#sec-simulation}

**Forward dynamics** is the opposite problem: given the torques, find the motion. Solving the equations of motion for the accelerations,
$$
\ddot{\mathbf q} = M(\mathbf q)^{-1}\big(\boldsymbol\tau - C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} - \mathbf g(\mathbf q)\big),
$$ {#eq-forward-dynamics}
which is always possible because $M$ is positive definite, gives a first-order system in the state $(\mathbf q, \dot{\mathbf q})$ that a numerical integrator advances in time ([linear and nonlinear ODE systems](/learn/maths/lesson.php?c=ode&l=nonlinear-systems)). A simulator needs $M$ (which can itself be computed with $n$ calls to the inverse-dynamics routine, one per column, with zero velocity and gravity and a unit acceleration) and the bias $C\dot{\mathbf q} + \mathbf g$ (one call with zero acceleration). Faster $O(n)$ forward-dynamics algorithms exist (Featherstone's articulated-body algorithm), but for arms with six or seven joints the $M^{-1}$ approach is common.

::: widget phaseplane
f: y
g: -k*sin(x) - c*y
x: -7, 7
y: -6, 6
sliders: k=13.4:1:30:0.1; c=0.5:0:5:0.1
caption: Phase portrait of the unactuated geared link of the worked example, $\ddot q = -k\sin q - c\dot q$ with $x = q$ (rad, from the downward vertical) and $y = \dot q$ (rad/s). With the link alone, $k = mg(L/2)/I_O = 29.4\,\mathrm{s^{-2}}$; with the motor's reflected inertia added, $k = 4.905/0.367 = 13.4\,\mathrm{s^{-2}}$, so the swinging is slower. Set $c = 0$ to see the closed orbits of conservative motion ($K + P$ constant) around the stable equilibria at $q = 0, \pm2\pi$, separated by the saddles at $q = \pm\pi$ (link upright); increase $c$ and every orbit spirals into the hanging position as friction removes energy, exactly as the power balance $\frac{d}{dt}(K + P) = -cI\dot q^2$ (with $I$ the total inertia) predicts.
:::

::: quiz
A robot controller computes $\boldsymbol\tau = M(\mathbf q)\ddot{\mathbf q}_d + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q)$ every millisecond for a desired acceleration $\ddot{\mathbf q}_d$. Which algorithm is most suitable?
- [ ] Forward dynamics with the articulated-body algorithm
- [x] Recursive Newton–Euler inverse dynamics with $\ddot{\mathbf q} = \ddot{\mathbf q}_d$
- [ ] Symbolic differentiation of the Lagrangian at each step
- [ ] Numerical integration of [[#eq-forward-dynamics]]
::: solution
The required quantity is exactly the inverse dynamics $\mathrm{ID}(\mathbf q, \dot{\mathbf q}, \ddot{\mathbf q}_d)$, which recursive Newton–Euler computes in $O(n)$ operations without forming $M$ or $C$. Forward dynamics answers the opposite question (motion from torque), and symbolic differentiation at run time is far too slow.
:::
:::

::: history
The equations of motion of linked rigid bodies follow from Lagrange's *Mécanique analytique* (1788) and Euler's rigid-body equations, but applying them to robot arms in real time was a computational problem. In 1980 J. Y. S. Luh, M. W. Walker and R. P. C. Paul published "On-line computational scheme for mechanical manipulators", a recursive Newton–Euler formulation whose cost grows linearly with the number of links; they reported computing the joint torques of the Stanford Arm in about 4.5 ms on a PDP-11/45 minicomputer, fast enough for on-line control. Roy Featherstone's spatial-vector formulation and his articulated-body algorithm for forward dynamics, collected in *Rigid Body Dynamics Algorithms* (2008), underlie most modern robot simulators.
:::

::: summary
- Kinetic energy $K = \frac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q}$ with $M = \sum_i(m_iJ_{v,i}^{\mathsf T}J_{v,i} + J_{\omega,i}^{\mathsf T}R_i\mathcal I_iR_i^{\mathsf T}J_{\omega,i})$, symmetric positive definite.
- Lagrange's equations give $M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \boldsymbol\tau$ with Christoffel symbols $c_{ijk} = \frac12(\partial_im_{kj} + \partial_jm_{ki} - \partial_km_{ij})$ and $\mathbf g = \nabla P$.
- $\dot M - 2C$ is skew-symmetric; $\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau$; the dynamics are linear in the inertial parameters, $Y\boldsymbol\pi$.
- For the 2R arm the shoulder inertia varies with $\cos q_2$, and coupling torques are significant even at moderate speed.
- Gearing adds reflected inertia $N^2J_m$ and divides load torques by $N$; heavily geared joints look nearly decoupled to their motors.
- Recursive Newton–Euler computes inverse dynamics in $O(n)$: outward velocities and accelerations, inward forces and moments, $\tau_i = \mathbf z_{i-1}^{\mathsf T}\mathbf n_i$.
- Forward dynamics $\ddot{\mathbf q} = M^{-1}(\boldsymbol\tau - C\dot{\mathbf q} - \mathbf g)$ is integrated to simulate the arm; check codes with static gravity torques and energy conservation.
:::

## Exercises

::: exercise Reflected inertia {#exr-reflected level=1 check="0.075"}
A joint motor has rotor inertia $3.0\times10^{-5}\,\mathrm{kg\,m^2}$ and drives the joint through a $50{:}1$ gearbox. What inertia does it add at the joint? (Enter it in $\mathrm{kg\,m^2}$.)
::: solution
$N^2J_m = 2500\times3.0\times10^{-5} = 0.075\,\mathrm{kg\,m^2}$ — comparable to the inertia of a $1\,\mathrm{kg}$, $0.5\,\mathrm m$ link about its end ($0.083\,\mathrm{kg\,m^2}$).
:::
:::

::: exercise Static gravity torque {#exr-gravity level=1 check="10.19"}
A single link of mass $3.0\,\mathrm{kg}$, with its centre of mass $0.40\,\mathrm m$ from the joint, is held still at $30^\circ$ above the horizontal. What joint torque is needed? (Enter it in N·m, rounded to two decimal places; $g = 9.81\,\mathrm{m/s^2}$.)
::: solution
$\tau = mg\ell\cos30^\circ = 3.0\times9.81\times0.40\times0.8660 = 10.19\,\mathrm{N\,m}$: the weight times its horizontal distance from the joint, the static special case $\boldsymbol\tau = \mathbf g(\mathbf q)$ of the equations of motion.
:::
:::

::: exercise Kinetic energy of the 2R arm {#exr-kinetic level=1 check="1.4298"}
For the arm of [[#ex-2r-dynamics]], compute the kinetic energy at $q_2 = 45^\circ$ (any $q_1$) with $\dot{\mathbf q} = (1.0, 2.0)\,\mathrm{rad/s}$. (Enter $K$ in J, rounded to four decimal places.)
::: solution
At $c_2 = \cos45^\circ = 0.70711$:
$$
\begin{aligned}
m_{11} &= 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0.3\times0.70711) + 0.03125 = 0.24 + 0.95195 + 0.03125 = 1.22320,\\
m_{12} &= 1.5(0.0625 + 0.15\times0.70711) + 0.03125 = 0.25285 + 0.03125 = 0.28410,\qquad m_{22} = 0.125
\end{aligned}
$$
(all in $\mathrm{kg\,m^2}$). Then $K = \frac12(m_{11}\dot q_1^2 + 2m_{12}\dot q_1\dot q_2 + m_{22}\dot q_2^2) = \frac12(1.22320 + 1.13640 + 0.50000) = 1.4298\,\mathrm J$. The cross term $2m_{12}\dot q_1\dot q_2$ is almost as large as the shoulder term: the energy is not a sum of independent joint energies.
:::
:::

::: exercise A centrifugal torque {#exr-centrifugal level=2 check="0.9"}
For the arm of [[#ex-2r-dynamics]] at $q_2 = 90^\circ$, the shoulder spins at $\dot q_1 = 2\,\mathrm{rad/s}$ with $\dot q_2 = 0$ and no accelerations. What torque must joint 2 supply to resist the centrifugal effect (ignore gravity)? Interpret its sign. (Enter $\tau_2$ in N·m.)
::: solution
$(C\dot{\mathbf q})_2 = -h\dot q_1^2 = m_2L_1\ell_2s_2\dot q_1^2 = 1.5\times0.6\times0.25\times1\times4 = 0.90\,\mathrm{N\,m}$. Positive: with the forearm at right angles, the centrifugal force on its centre of mass points radially outward from the shoulder and tends to swing the forearm clockwise (to open the elbow towards the stretched position, reducing $q_2$); the motor must push anticlockwise to hold $q_2$ fixed.
:::
:::

::: exercise Mass matrix at a right-angled elbow {#exr-m11 level=2 check="0.905"}
Compute $m_{11}$ for the arm of [[#ex-2r-dynamics]] at $q_2 = 90^\circ$, and find the ratio of its largest to smallest value over all $q_2$. (Enter $m_{11}(90^\circ)$ in $\mathrm{kg\,m^2}$.)
::: solution
$m_{11} = 0.18 + 0.06 + 1.5(0.36 + 0.0625 + 0) + 0.03125 = 0.905\,\mathrm{kg\,m^2}$. Its extremes are at $c_2 = \pm1$: $0.905 \pm 1.5\times0.3 = 1.355$ and $0.455\,\mathrm{kg\,m^2}$, a ratio of $2.98$.
:::
:::

::: exercise Identifying parameters {#exr-identify level=2 check="0.2"}
A single joint obeys $\tau = a\ddot q + b\cos q$ with unknown $a$ (inertia) and $b$ (gravity moment $mg\ell$). Two measurements are made: at rest at $q = 0$ the torque is $4.2\,\mathrm{N\,m}$; at $q = 90^\circ$ with $\ddot q = 5.0\,\mathrm{rad/s^2}$ it is $1.0\,\mathrm{N\,m}$. Write the regressor form $\tau = Y\boldsymbol\pi$ and find the parameters. (Enter $a$ in $\mathrm{kg\,m^2}$.)
::: solution
$Y = [\ddot q\ \ \cos q]$, $\boldsymbol\pi = (a, b)$. First measurement: $4.2 = 0\cdot a + 1\cdot b$, so $b = 4.2\,\mathrm{N\,m}$. Second: $1.0 = 5.0a + 0\cdot b$, so $a = 0.20\,\mathrm{kg\,m^2}$. In practice many noisy measurements along an "exciting" trajectory are stacked, $\boldsymbol\tau_{\text{all}} = Y_{\text{all}}\boldsymbol\pi$, and solved by least squares; the trajectory must make $Y_{\text{all}}$ well conditioned (here, both accelerations and gravity must vary).
:::
:::

::: exercise Energy and passivity {#exr-passivity level=3}
(a) Using [[#prop-properties]], show that if $\boldsymbol\tau = -D\dot{\mathbf q}$ with $D$ symmetric positive definite (pure joint damping), the total energy $K + P$ never increases. (b) Show that $\int_0^T\dot{\mathbf q}^{\mathsf T}\boldsymbol\tau\,dt \ge -\big(K(0) + P(0) - P_{\min}\big)$ for any torque history: the arm cannot deliver more energy than it initially stored. (c) Part (a) uses only the vector $C\dot{\mathbf q}$, so it holds for any matrix $C$ that produces the correct Coriolis and centrifugal torques. Why, then, do controller stability proofs insist on the Christoffel $C$?
::: solution
(a) $\frac{d}{dt}(K + P) = \dot{\mathbf q}^{\mathsf T}\boldsymbol\tau = -\dot{\mathbf q}^{\mathsf T}D\dot{\mathbf q} \le 0$, with equality only at rest. (b) Integrating the power balance, $\int_0^T\dot{\mathbf q}^{\mathsf T}\boldsymbol\tau\,dt = (K + P)(T) - (K + P)(0) \ge 0 + P_{\min} - K(0) - P(0)$, since $K \ge 0$ and $P \ge P_{\min}$ (the potential is bounded below on a compact configuration space). This is the definition of passivity from torque to velocity. (c) In tracking-control proofs ([[robotics/robot-control]]) the term that must vanish is $\mathbf x^{\mathsf T}(\dot M - 2C)\mathbf x$ for a vector $\mathbf x$ that is *not* $\dot{\mathbf q}$ — typically a velocity error $\dot{\mathbf e}$ — because the controller uses $C(\mathbf q,\dot{\mathbf q})$ multiplied by a reference velocity. That requires $\dot M - 2C$ to be skew-symmetric as a matrix, which is true for the Christoffel factorisation and false for other factorisations giving the same $C\dot{\mathbf q}$ ([[#ex-skew]]).
:::
:::

::: exercise Choosing a gear ratio {#exr-gear level=3 check="100"}
A motor with rotor inertia $J_m$ and maximum torque $\tau_{\max}$ drives a pure inertia $I_L$ (no gravity, no friction) through a gear ratio $N$. (a) Show that the load acceleration is $\ddot q = N\tau_{\max}/(I_L + N^2J_m)$ and find the ratio $N^*$ that maximises it. (b) Evaluate $N^*$ for $I_L = 0.50\,\mathrm{kg\,m^2}$, $J_m = 5.0\times10^{-5}\,\mathrm{kg\,m^2}$. (c) Discuss why real robot joints often use ratios different from $N^*$. (Enter $N^*$.)
::: solution
(a) Energy: $K = \frac12(I_L + N^2J_m)\dot q^2$ and the motor's generalised force on $q$ is $N\tau_{\max}$, so $(I_L + N^2J_m)\ddot q = N\tau_{\max}$. Maximise $f(N) = N/(I_L + N^2J_m)$: $f'(N) = (I_L + N^2J_m - 2N^2J_m)/(\cdot)^2 = 0$ gives $N^{*2}J_m = I_L$, $N^* = \sqrt{I_L/J_m}$ — **inertia matching**: the reflected motor inertia equals the load inertia. (b) $N^* = \sqrt{0.50/5.0\times10^{-5}} = \sqrt{10^4} = 100$. Then $\ddot q_{\max} = 100\tau_{\max}/(0.5 + 0.5) = 100\tau_{\max}\,\mathrm{rad/s^2}$ per N·m. (c) Gravity loads require torque even at rest, favouring larger $N$; the motor's maximum speed limits joint speed to $\omega_{m,\max}/N$, favouring smaller $N$; the load inertia varies with configuration and payload, so no single $N$ matches it; larger $N$ reduces the effect of load variations and disturbances on the motor ([[#ex-geared]]) but increases friction, backlash and the stiffness problems of the transmission, and lowers back-drivability, which matters for safe human contact.
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar derive the Euler–Lagrange equations and their properties in this chapter's notation and treat the independent-joint model with gears; Craig gives a clear account of the iterative Newton–Euler equations in the modified DH convention; Featherstone develops spatial vectors, recursive Newton–Euler and the articulated-body algorithm; Siciliano et al. cover dynamic parameter identification.
