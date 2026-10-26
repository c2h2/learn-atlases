The trajectory planner produces a reference $\mathbf q_d(t)$; the controller's job is to compute, a thousand times a second or more, the motor torques that make the real joints follow it despite gravity, payload changes, friction and the dynamic coupling between links — and, when the tool touches something, to control the contact force as well as the motion. This chapter builds the standard controllers in order of increasing use of the robot model. **Independent-joint PD and PID control** treats each joint as a separate geared motor and the rest of the robot as a disturbance; it is what most industrial arms run, and works because large gear ratios shrink the coupling. **PD with gravity compensation** adds the one model term that causes steady errors and is provably stable for any positive gains. **Computed-torque control** cancels the full nonlinear dynamics of [[robotics/manipulator-dynamics]] and leaves linear, decoupled error dynamics with chosen natural frequency and damping. For tasks in contact with the environment we then switch from controlling position to controlling the *relation* between position and force — **impedance and admittance control** — or split the task directions into force-controlled and position-controlled ones — **hybrid position/force control**. The classical control background (second-order systems, PID, stability) is in [[control-systems/time-response]] and [[control-systems/pid-control]]; the actuators and sensors are described in [[mechatronics/electric-actuators]] and [[mechatronics/sensors]].

## The joint as a control plant {#sec-plant}

From [[robotics/manipulator-dynamics]], joint $k$ obeys $\sum_jm_{kj}(\mathbf q)\ddot q_j + (C\dot{\mathbf q})_k + g_k(\mathbf q) = \tau_k$. With a motor of rotor inertia $J_m$ driving through a gear ratio $N$ and viscous friction $b$ at the joint, split the equation into a constant part and the rest:
$$
J\,\ddot q_k + b\,\dot q_k = u_k - d_k,\qquad J = \bar m_{kk} + N^2J_m ,
$$ {#eq-joint-plant}
where $u_k = N\tau_{m,k}$ is the torque delivered at the joint, $\bar m_{kk}$ a nominal (average) value of $m_{kk}(\mathbf q)$, and the **disturbance** $d_k$ collects everything else: the variation of $m_{kk}$, the off-diagonal inertial coupling $\sum_{j\ne k}m_{kj}\ddot q_j$, Coriolis and centrifugal torques, and gravity. Seen from the motor shaft, inertia terms are scaled by $1/N^2$ relative to $J_m$ and disturbances by $1/N$, which is why heavily geared joints (ratios of 50–200 are common) behave almost like independent linear plants.

::: definition Independent-joint control {#def-independent}
**Independent-joint control** designs a single-input single-output controller for each joint from the linear model [[#eq-joint-plant]], treating $d_k$ as an unknown, bounded, slowly varying disturbance. The tracking error is $e = q - q_d$ (the convention used throughout this chapter, so that a positive error means the joint is ahead of its reference).
:::

## PD and PID control of one joint {#sec-pid}

::: proposition PD control of a joint {#prop-pd}
For a constant set point $q_d$ and the PD law $u = -K_pe - K_d\dot q$, the closed loop of [[#eq-joint-plant]] is
$$
J\ddot e + (b + K_d)\dot e + K_pe = -d .
$$
It is stable for $K_p > 0$, $b + K_d > 0$, with natural frequency and damping ratio
$$
\omega_n = \sqrt{K_p/J},\qquad \zeta = \frac{b + K_d}{2\sqrt{K_pJ}},
$$ {#eq-pd-design}
and a constant disturbance $d$ leaves the steady-state error $e_{ss} = -d/K_p$.
:::

::: proof
With $q_d$ constant, $e = q - q_d$ gives $\dot e = \dot q$, $\ddot e = \ddot q$. Substituting $u$ into $J\ddot q + b\dot q = u - d$ gives $J\ddot e + b\dot e = -K_pe - K_d\dot e - d$, which rearranges to the stated equation. Its characteristic polynomial $Js^2 + (b + K_d)s + K_p$ has both roots in the open left half-plane iff all coefficients have the same sign (a second-order Routh–Hurwitz condition), i.e. $K_p > 0$ and $b + K_d > 0$. Dividing by $J$ and comparing with the standard form $s^2 + 2\zeta\omega_ns + \omega_n^2$ gives [[#eq-pd-design]]. For constant $d$, the steady state ($\ddot e = \dot e = 0$) is $K_pe_{ss} = -d$.
:::


The steady-state error is the PD controller's weakness: gravity is a large, configuration-dependent, nearly constant disturbance, and it leaves the arm sagging below its target. Two cures follow — an integral term, or a gravity model.

::: example Tuning a geared joint {#ex-pd}
The geared single link of [[robotics/manipulator-dynamics]] has total inertia $J = 0.367\,\mathrm{kg\,m^2}$ (link plus reflected rotor) and $b = 0.10\,\mathrm{N\,m\,s/rad}$. (a) Choose $K_p$ and $K_d$ for critical damping with $\omega_n = 10\,\mathrm{rad/s}$. (b) The worst gravity torque is $4.905\,\mathrm{N\,m}$ (link horizontal). What steady-state error does it cause? (c) Add an integral term $K_i\int e\,dt$: for which $K_i$ is the loop stable, and what happens with $K_i = 100\,\mathrm{N\,m/(rad\,s)}$?
::: solution
(a) $K_p = J\omega_n^2 = 0.367\times100 = 36.7\,\mathrm{N\,m/rad}$; $b + K_d = 2\zeta\omega_nJ = 2\times1\times10\times0.367 = 7.34$, so $K_d = 7.24\,\mathrm{N\,m\,s/rad}$.
(b) $\lvert e_{ss}\rvert = 4.905/36.7 = 0.134\,\mathrm{rad} = 7.7^\circ$ — far too much for most tasks. Raising $\omega_n$ to $30\,\mathrm{rad/s}$ would cut it ninefold (the error scales as $1/\omega_n^2$) but is limited by the structural resonances and the sampling rate.
(c) With PID the closed loop is $J\dddot e + (b + K_d)\ddot e + K_p\dot e + K_ie = 0$ for constant $d$ (differentiate once), with characteristic polynomial $Js^3 + (b + K_d)s^2 + K_ps + K_i$. The Routh–Hurwitz conditions for a cubic $a_3s^3 + a_2s^2 + a_1s + a_0$ with positive coefficients are $a_2a_1 > a_3a_0$, so stability requires
$$
0 < K_i < \frac{(b + K_d)K_p}{J} = \frac{7.34\times36.7}{0.367} = 734\,\mathrm{N\,m/(rad\,s)}.
$$
With $K_i = 100$ the roots of $0.367s^3 + 7.34s^2 + 36.7s + 100$ are $s = -14.4$ and $s = -2.82 \pm 3.32j$: stable, with the constant gravity error now removed, but the slow complex pair (time constant $1/2.82 = 0.35\,\mathrm s$) means the sag is integrated away only gradually, with some overshoot. Integral action also winds up when the motor saturates, so practical PID loops limit the integrator (anti-windup, [[control-systems/pid-control]]).
:::
:::

::: widget phaseplane
f: y
g: (-Kp*(x - 1) - Kd*y - G*cos(x))/0.367
x: -0.5, 2
y: -4, 4
sliders: Kp=36.7:5:150:0.1; Kd=7.24:0:20:0.1; G=4.905:0:10:0.1
points: 0, 0; -0.3, 2; 0.3, -3
caption: A single geared link under PD control towards $q_d = 1\,\mathrm{rad}$, with gravity torque $G\cos q$ ($q$ from the horizontal; $x = q$, $y = \dot q$; $J = 0.367\,\mathrm{kg\,m^2}$). The trajectories converge to an equilibrium *below* $q = 1$, where the nullclines cross: the PD steady-state error $G\cos q/K_p$. Raise $K_p$ and the equilibrium moves towards 1; set $G = 0$ (gravity compensated) and it sits exactly at 1. Lower $K_d$ to see oscillatory approach; the damping ratio follows [[#eq-pd-design]].
:::

## PD plus gravity compensation {#sec-pdg}

If the controller knows the gravity torques $\mathbf g(\mathbf q)$ — which requires only the masses and centre-of-mass positions — it can add them and remove the sag exactly. The striking fact is that this simple law is stable for the full nonlinear, coupled arm, not just for the linearised joints.

::: theorem PD plus gravity compensation (Takegaki–Arimoto) {#thm-pd-gravity}
For a rigid manipulator $M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) = \boldsymbol\tau$, a constant set point $\mathbf q_d$, and symmetric positive definite gain matrices $K_p$, $K_d$, the control law
$$
\boldsymbol\tau = -K_p(\mathbf q - \mathbf q_d) - K_d\dot{\mathbf q} + \mathbf g(\mathbf q)
$$ {#eq-pd-gravity}
makes the equilibrium $(\mathbf q, \dot{\mathbf q}) = (\mathbf q_d, \mathbf 0)$ globally asymptotically stable.
:::

::: proof
Let $\mathbf e = \mathbf q - \mathbf q_d$ and consider the Lyapunov function
$$
V = \tfrac12\dot{\mathbf q}^{\mathsf T}M(\mathbf q)\dot{\mathbf q} + \tfrac12\mathbf e^{\mathsf T}K_p\mathbf e ,
$$
the kinetic energy plus the energy of a virtual spring $K_p$ pulling the arm to $\mathbf q_d$. $V$ is positive definite in $(\mathbf e, \dot{\mathbf q})$ because $M$ and $K_p$ are. Along closed-loop motions, using $M\ddot{\mathbf q} = \boldsymbol\tau - C\dot{\mathbf q} - \mathbf g = -K_p\mathbf e - K_d\dot{\mathbf q} - C\dot{\mathbf q}$,
$$
\dot V = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \tfrac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q} + \dot{\mathbf q}^{\mathsf T}K_p\mathbf e
= -\dot{\mathbf q}^{\mathsf T}K_d\dot{\mathbf q} + \tfrac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q}
= -\dot{\mathbf q}^{\mathsf T}K_d\dot{\mathbf q} \le 0,
$$
by the skew-symmetry of $\dot M - 2C$ ([[robotics/manipulator-dynamics]]). So $V$ never increases and all trajectories are bounded. $\dot V = 0$ only where $\dot{\mathbf q} = \mathbf 0$. On a trajectory staying in that set, $\ddot{\mathbf q} = \mathbf 0$ too, and the closed-loop equation reduces to $\mathbf 0 = -K_p\mathbf e$, i.e. $\mathbf e = \mathbf 0$. By LaSalle's invariance principle every trajectory converges to the largest invariant set in $\{\dot V = 0\}$, which is the single point $(\mathbf e, \dot{\mathbf q}) = (\mathbf 0, \mathbf 0)$; and since $V$ is radially unbounded, this holds from every initial state. Assumptions: rigid links and joints, exact gravity model, no actuator saturation, continuous-time control.
:::

The proof is an energy argument: the controller shapes the potential energy (it cancels gravity and adds a spring with its minimum at $\mathbf q_d$) and injects damping; a passive mechanical system with a unique potential minimum and damping must come to rest there. The law is widely used for set-point regulation and for compliant, safe behaviour of arms near people: lowering $K_p$ makes the arm softer without endangering stability.

## Computed-torque control {#sec-computed-torque}

For fast tracking of a trajectory $\mathbf q_d(t)$, PD plus gravity is not enough: inertial and Coriolis torques along the trajectory produce tracking errors. Computed torque uses the whole model.

::: proposition Computed-torque control {#prop-computed-torque}
With the control law
$$
\boldsymbol\tau = M(\mathbf q)\big(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e\big) + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q),\qquad \mathbf e = \mathbf q - \mathbf q_d ,
$$ {#eq-computed-torque}
and an exact model, the tracking error obeys the linear, decoupled equation
$$
\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0 .
$$
With diagonal gains $K_p = \mathrm{diag}(\omega_i^2)$, $K_d = \mathrm{diag}(2\zeta_i\omega_i)$ and $\omega_i, \zeta_i > 0$, each joint's error decays exponentially like a second-order system with natural frequency $\omega_i$ and damping ratio $\zeta_i$, for any trajectory and any initial error.
:::

::: proof
Substitute [[#eq-computed-torque]] into the equations of motion: $M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = M(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e) + C\dot{\mathbf q} + \mathbf g$. The $C$ and $\mathbf g$ terms cancel, leaving $M(\mathbf q)(\ddot{\mathbf q} - \ddot{\mathbf q}_d + K_d\dot{\mathbf e} + K_p\mathbf e) = \mathbf 0$. Since $M(\mathbf q)$ is invertible for every $\mathbf q$ (positive definite), the bracket vanishes: $\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0$. With diagonal gains this is $n$ independent equations $\ddot e_i + 2\zeta_i\omega_i\dot e_i + \omega_i^2e_i = 0$, each with characteristic roots of negative real part for $\omega_i, \zeta_i > 0$, so every solution decays exponentially. The law is an instance of **feedback linearisation**: an inner loop that cancels the nonlinearity and an outer loop that places the poles of a double integrator.
:::

::: example Computed torque for the 2R arm {#ex-computed-torque}
The 2R arm of [[robotics/manipulator-dynamics]] is at $\mathbf q = (30^\circ, 60^\circ)$, $\dot{\mathbf q} = (1.0, -0.5)\,\mathrm{rad/s}$, while the reference has $\ddot{\mathbf q}_d = (2.0, 1.0)\,\mathrm{rad/s^2}$, and the errors are $\mathbf e = (0.01, -0.02)\,\mathrm{rad}$, $\dot{\mathbf e} = \mathbf 0$. Choose gains for $\omega_n = 20\,\mathrm{rad/s}$, $\zeta = 1$ on both joints and compute the torques.
::: solution
$K_p = \omega_n^2I = 400I\ \mathrm{s^{-2}}$, $K_d = 2\zeta\omega_nI = 40I\ \mathrm{s^{-1}}$ — note that in computed torque the gains have units of acceleration per error, not torque per error, because $M$ multiplies them. The commanded acceleration is
$$
\mathbf v = \ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e = (2.0 - 4.0,\ 1.0 + 8.0) = (-2.0, 9.0)\,\mathrm{rad/s^2}.
$$
With $M$, $C\dot{\mathbf q}$ and $\mathbf g$ from the dynamics chapter's example,
$$
\boldsymbol\tau = \begin{bmatrix} 1.1300 & 0.2375\\ 0.2375 & 0.1250\end{bmatrix}\begin{bmatrix} -2.0\\ 9.0\end{bmatrix} + \begin{bmatrix} 0.1461\\ 0.1949\end{bmatrix} + \begin{bmatrix} 12.744\\ 0\end{bmatrix} = \begin{bmatrix} -0.1225 + 0.1461 + 12.744\\ 0.650 + 0.1949\end{bmatrix} = \begin{bmatrix} 12.77\\ 0.845\end{bmatrix}\mathrm{N\,m}.
$$
Compare with the feedforward torque at zero error, $(15.39, 0.795)\,\mathrm{N\,m}$: joint 1, ahead of its reference by $0.01\,\mathrm{rad}$, is braked; joint 2, behind by $0.02\,\mathrm{rad}$, is pushed forward. The correction on joint 1 is computed through the full inertia matrix, so the two joints' corrections are coupled exactly as the arm's dynamics require.
:::
:::

In practice the model is never exact. With estimates $\hat M$, $\hat C$, $\hat{\mathbf g}$ the error equation becomes $\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \boldsymbol\eta$, with a residual $\boldsymbol\eta = \hat M^{-1}\big((\hat M - M)\ddot{\mathbf q} + (\hat C - C)\dot{\mathbf q} + \hat{\mathbf g} - \mathbf g\big)$ that acts as a disturbance; with good gains it produces small bounded errors ([[#exr-robust]]), and adaptive or robust variants estimate or bound it. The control law is computed at a fixed sampling rate, typically $1$–$8\,\mathrm{kHz}$ on modern controllers; the chosen $\omega_n$ must be well below both the sampling rate and the lowest structural resonance of the arm and drives, which in practice limits $\omega_n$ to some tens of rad/s.

::: warning Gains that look fine on paper can destabilise a real joint
The analyses above assume rigid links, rigid gearboxes and continuous-time control. Real transmissions (harmonic drives, belts) are springs, with resonances often at $10$–$30\,\mathrm{Hz}$, and a digital controller adds a delay of about one sampling period. Raising $K_p$ and $K_d$ to shrink tracking errors eventually excites these resonances and the loop goes unstable even though the rigid model predicts any positive gain is stable. Tune on the real machine starting from low gains, keep $\omega_n$ several times below the first resonance, and remember that derivative action on a noisy encoder signal amplifies noise (filter the derivative). Testing a new controller on a real arm is done at low speed with the workcell cleared, a hand on the emergency stop, and the arm's safety functions active.
:::

## Task-space control {#sec-task-space}

Many tasks are defined in Cartesian coordinates: hold the tool at a pose, follow a seam. The simplest task-space controller is the Cartesian analogue of [[#thm-pd-gravity]]: compute a virtual spring–damper wrench at the tool and map it to joint torques with the transpose Jacobian of [[robotics/jacobians]],
$$
\boldsymbol\tau = J(\mathbf q)^{\mathsf T}\big(K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}\big) + \mathbf g(\mathbf q),
$$ {#eq-cartesian-pd}
with $\mathbf x = \mathbf f(\mathbf q)$ the tool position and $\dot{\mathbf x} = J\dot{\mathbf q}$. The same Lyapunov argument, with $V = \frac12\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} + \frac12(\mathbf x - \mathbf x_d)^{\mathsf T}K_x(\mathbf x - \mathbf x_d)$, gives $\dot V = -\dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} \le 0$ ([[#exr-cartesian]]): the tool comes to rest at $\mathbf x_d$ provided $J$ is non-singular there. The law never inverts the Jacobian, so it degrades gracefully near singularities, and $K_x$ is a physically meaningful **Cartesian stiffness** — the tool behaves like a mass on springs of stiffness $K_x$ attached to $\mathbf x_d$. Khatib's operational-space formulation goes further: it uses the task-space inertia $\Lambda = (JM^{-1}J^{\mathsf T})^{-1}$ to make the tool's closed-loop dynamics linear and decoupled in Cartesian coordinates, the task-space equivalent of computed torque.

## Interaction control: impedance and admittance {#sec-impedance}

A position controller with high gains is the wrong tool for contact. If a stiff arm is commanded $1\,\mathrm{mm}$ into a steel surface, the contact force is whatever is needed to bend the arm and the surface by $1\,\mathrm{mm}$ — possibly thousands of newtons. Pure force control fails the other way: in free space there is nothing to push against, and the arm accelerates until it hits something. **Impedance control** specifies the dynamic relation between the tool's deviation from its reference and the external force:
$$
M_d\ddot{\tilde{\mathbf x}} + D_d\dot{\tilde{\mathbf x}} + K_d\tilde{\mathbf x} = \mathbf F_{\text{ext}},\qquad \tilde{\mathbf x} = \mathbf x - \mathbf x_d ,
$$ {#eq-impedance}
a desired mass–spring–damper. In free space $\mathbf F_{\text{ext}} = \mathbf 0$ and the tool tracks $\mathbf x_d$; in contact it yields like a spring of stiffness $K_d$. Torque-controlled arms realise [[#eq-impedance]] directly (the Cartesian PD law [[#eq-cartesian-pd]] is impedance control with the robot's own inertia); stiff, position-controlled industrial arms realise it as **admittance control**: a force sensor at the wrist measures $\mathbf F_{\text{ext}}$, [[#eq-impedance]] is integrated in software to obtain a modified position reference, and the inner position loop tracks it.

::: proposition Contact force under impedance control {#prop-contact}
A tool under impedance control with stiffness $K_d$ (one direction, static case) is commanded to $x_d$, a distance $\delta = x_d - x_w > 0$ beyond the surface of an environment that behaves as a spring of stiffness $k_e$ with its surface at $x_w$. At equilibrium the contact force and penetration are
$$
F = \frac{K_dk_e}{K_d + k_e}\,\delta,\qquad x - x_w = \frac{K_d}{K_d + k_e}\,\delta .
$$
:::

::: proof
At rest, the tool's impedance gives $K_d(x - x_d) = F_{\text{ext}}$, where $F_{\text{ext}}$ is the force of the environment on the tool; the environment, compressed by $x - x_w > 0$, pushes back with $F_{\text{ext}} = -k_e(x - x_w)$. Equating, $K_d(x - x_d) = -k_e(x - x_w)$, so $x = (K_dx_d + k_ex_w)/(K_d + k_e)$ and $x - x_w = K_d(x_d - x_w)/(K_d + k_e)$. The magnitude of the contact force is $F = k_e(x - x_w) = K_dk_e\delta/(K_d + k_e)$: the two springs in series. Assumptions: quasi-static contact, linear springs, contact maintained ($x > x_w$).
:::

::: example Pressing against a stiff surface {#ex-impedance}
A tool under impedance control with $K_d = 2000\,\mathrm{N/m}$ is commanded $10\,\mathrm{mm}$ into a surface with stiffness $k_e = 50\,\mathrm{kN/m}$. Find the contact force and how far the surface is pushed in. Compare with a stiff position controller whose effective stiffness is $K = 2\times10^6\,\mathrm{N/m}$.
::: solution
Series stiffness $K_dk_e/(K_d + k_e) = 2000\times50000/52000 = 1923\,\mathrm{N/m}$, so $F = 1923\times0.010 = 19.2\,\mathrm N$, and the surface deflects $(2000/52000)\times10 = 0.38\,\mathrm{mm}$; the tool stops $9.6\,\mathrm{mm}$ short of its commanded position. With the stiff position controller the series stiffness is $2\times10^6\times5\times10^4/(2.05\times10^6) = 48.8\,\mathrm{kN/m}$ and $F = 488\,\mathrm N$, with the surface pushed in $9.8\,\mathrm{mm}$ — 25 times the force for the same command. The force under impedance control is dominated by the *softer* spring, which the designer chooses; under stiff position control it is dominated by the environment, which the designer does not know precisely. Errors in the surface's position therefore translate into small, predictable force errors under impedance control.
:::
:::

::: widget plot
f: x*1000*ke/(x + 1000*ke)*0.01; x*0.01
x: 0, 20000
y: 0, 200
sliders: ke=50:5:500:5
labels: F\ \text{(N), environment } k_e\ \text{in kN/m}; K_d\delta\ \text{(rigid environment)}
caption: Contact force for a commanded penetration $\delta = 10\,\mathrm{mm}$ against the impedance stiffness $K_d$ (N/m, horizontal axis), for an environment of stiffness $k_e$ set by the slider. While $K_d \ll k_e$ the force follows the straight line $K_d\delta$ and hardly depends on $k_e$: the designer's spring sets the force. Lower $k_e$ towards $5\,\mathrm{kN/m}$ (a foam pad) and the curve bends over well below the line: the environment's own compliance now limits the force.
:::

## Hybrid position/force control {#sec-hybrid}

When a task has some directions in which the tool must move freely and others in which it is constrained by the environment, the two can be controlled separately. Mason's idea of **natural and artificial constraints** formalises the split. In a constraint frame attached to the task, each of the six directions (three translations, three rotations) is either constrained in *velocity* by the environment — so position cannot be controlled and force is specified instead — or constrained in *force* — so force cannot be controlled and position is specified. For wiping a table with a flat tool, the table imposes natural constraints $v_z = 0$, $\omega_x = \omega_y = 0$ (the tool cannot move into it or tilt), while friction-free sliding imposes $f_x = f_y = 0$, $n_z = 0$; the task supplies artificial constraints on the complementary quantities: a pressing force $f_z = F_d$ and moments $n_x = n_y = 0$, and a wiping motion in $x, y$ with orientation about $z$.

::: algorithm Hybrid position/force control {#alg-hybrid}
1. Choose a task (constraint) frame and a diagonal **selection matrix** $S$ with $S_{ii} = 1$ for directions under position control and $0$ for those under force control.
2. Compute the position-loop command in task coordinates, $\mathbf w_x = K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}$, and the force-loop command, $\mathbf w_f = \mathbf F_d + K_f(\mathbf F_d - \mathbf F) + K_{fi}\int(\mathbf F_d - \mathbf F)\,dt$, with $\mathbf F$ the measured wrench.
3. Combine them so that each direction receives only its own loop: $\mathbf w = S\mathbf w_x + (I - S)\mathbf w_f$.
4. Map to joint torques with $\boldsymbol\tau = J^{\mathsf T}\mathbf w + \mathbf g(\mathbf q)$ (with $J$ expressed in the task frame), or, in a model-based version, through the task-space inertia.
:::

Force sensors and contact are noisy and stiff, so force loops usually use integral action and modest bandwidth. On a position-controlled robot the force loop is often implemented as an outer loop that adjusts the position reference in the force-controlled directions.

::: example An integral force loop on a position-controlled arm {#ex-force-loop}
A stiff industrial arm under position control presses a tool on a surface of stiffness $k_e = 50\,\mathrm{kN/m}$. An outer loop adjusts the commanded position in the normal direction at the rate $\dot x_c = K_f(F_d - F)$, where $F = k_e(x_c - x_w)$ is the measured force (the position loop being much faster than the force loop, $x \approx x_c$). Choose $K_f$ for a force time constant of $0.05\,\mathrm s$, and find the response to a step in $F_d$ from 0 to $20\,\mathrm N$.
::: solution
Differentiating $F = k_e(x_c - x_w)$: $\dot F = k_e\dot x_c = k_eK_f(F_d - F)$, a first-order lag with time constant $T_f = 1/(k_eK_f)$. For $T_f = 0.05\,\mathrm s$, $K_f = 1/(50000\times0.05) = 4\times10^{-4}\,\mathrm{m/(N\,s)}$. After the step, $F(t) = 20(1 - e^{-t/0.05})\,\mathrm N$: 63% at $50\,\mathrm{ms}$, 95% at $150\,\mathrm{ms}$, with no overshoot and zero steady-state error (the loop is integral). The commanded position moves $20/50000 = 0.4\,\mathrm{mm}$ into the surface. The design depends on $k_e$: on a surface ten times stiffer the same $K_f$ gives a time constant of $5\,\mathrm{ms}$, which may exceed the position loop's bandwidth and the force sensor's filtering and destabilise the loop — force-loop gains must be set for the stiffest surface expected.
:::
:::

::: quiz
A robot must insert a peg into a close-fitting vertical hole. In the constraint frame aligned with the hole axis $z$, which assignment is correct for the insertion phase?
- [ ] position control in $x$, $y$, $z$; force control in none
- [x] force control (zero force) in $x$, $y$ and zero moments about $x$, $y$; position or velocity control along $z$ and about $z$
- [ ] force control along $z$; position control in $x$, $y$
- [ ] force control in all six directions
::: solution
The hole constrains lateral motion and tilting (natural constraints $v_x = v_y = 0$, $\omega_x = \omega_y = 0$), so those directions are force-controlled with zero desired force and moment, letting the peg comply with the hole. Motion along and rotation about the axis are free and are position- (or velocity-) controlled to push the peg in. Commanding positions in $x$, $y$ fights the hole and causes jamming.
:::
:::

::: history
Joint-space PD and PID loops ran the first industrial arms. Computed-torque control became practical once Luh, Walker and Paul (1980) showed how to evaluate the inverse dynamics on-line. In 1981 Takegaki and Arimoto proved, by an energy (Lyapunov) argument, that PD control with gravity compensation regulates a nonlinear manipulator for any positive gains, and Raibert and Craig, at the Jet Propulsion Laboratory, published hybrid position/force control based on Mason's natural and artificial constraints. Neville Hogan's three-part paper "Impedance control: an approach to manipulation" (1985) argued that a manipulator interacting with its environment should regulate its mechanical impedance, and Oussama Khatib's operational-space formulation (1987) unified motion and force control in task coordinates.
:::

::: summary
- Each joint is approximately $J\ddot q + b\dot q = u - d$ with $J$ including the reflected rotor inertia $N^2J_m$; coupling, Coriolis and gravity torques form the disturbance $d$, reduced by gearing.
- PD: $\omega_n = \sqrt{K_p/J}$, $\zeta = (b + K_d)/(2\sqrt{K_pJ})$, steady error $-d/K_p$; PID removes constant errors if $K_i < (b + K_d)K_p/J$.
- PD plus gravity compensation $\boldsymbol\tau = -K_p\mathbf e - K_d\dot{\mathbf q} + \mathbf g(\mathbf q)$ is globally asymptotically stable for any positive definite gains (Lyapunov function: kinetic energy plus spring energy; uses $\dot M - 2C$ skew).
- Computed torque $\boldsymbol\tau = M(\ddot{\mathbf q}_d - K_d\dot{\mathbf e} - K_p\mathbf e) + C\dot{\mathbf q} + \mathbf g$ gives linear decoupled error dynamics $\ddot{\mathbf e} + K_d\dot{\mathbf e} + K_p\mathbf e = \mathbf 0$; model errors act as disturbances.
- Task-space PD $\boldsymbol\tau = J^{\mathsf T}(K_x(\mathbf x_d - \mathbf x) - D_x\dot{\mathbf x}) + \mathbf g$ gives a Cartesian stiffness without inverting $J$.
- Impedance control sets $M_d\ddot{\tilde{\mathbf x}} + D_d\dot{\tilde{\mathbf x}} + K_d\tilde{\mathbf x} = \mathbf F_{\text{ext}}$; against a surface of stiffness $k_e$ the contact force is the series-spring value $K_dk_e\delta/(K_d + k_e)$. Admittance control implements it around a position loop.
- Hybrid control splits task directions with a selection matrix into position- and force-controlled ones, following natural and artificial constraints.
:::

## Exercises

::: exercise PD gains from specifications {#exr-gains level=1 check="32"}
A joint has $J = 0.50\,\mathrm{kg\,m^2}$ and negligible friction. Choose $K_p$ and $K_d$ for $\omega_n = 8\,\mathrm{rad/s}$ and $\zeta = 0.7$. (Enter $K_p$ in N·m/rad.)
::: solution
$K_p = J\omega_n^2 = 0.5\times64 = 32\,\mathrm{N\,m/rad}$; $K_d = 2\zeta\omega_nJ = 2\times0.7\times8\times0.5 = 5.6\,\mathrm{N\,m\,s/rad}$. The step response then overshoots by $e^{-\pi\zeta/\sqrt{1-\zeta^2}} = 4.6\%$.
:::
:::

::: exercise Sag under gravity {#exr-sag level=1 check="0.15"}
A PD-controlled joint with $K_p = 40\,\mathrm{N\,m/rad}$ holds a link whose gravity torque is $6.0\,\mathrm{N\,m}$. What is the steady-state error? (Enter its magnitude in rad.)
::: solution
$\lvert e_{ss}\rvert = d/K_p = 6.0/40 = 0.15\,\mathrm{rad} = 8.6^\circ$. Gravity compensation removes it entirely if the model is right; an integrator removes it slowly.
:::
:::

::: exercise Series springs {#exr-series level=1 check="4.5455"}
A tool with impedance stiffness $1000\,\mathrm{N/m}$ is commanded $5\,\mathrm{mm}$ into a surface of stiffness $10\,\mathrm{kN/m}$. What contact force results? (Enter $F$ in N, rounded to four decimal places.)
::: solution
$F = \frac{1000\times10000}{11000}\times0.005 = 909.09\times0.005 = 4.5455\,\mathrm N$. The surface is compressed $0.45\,\mathrm{mm}$.
:::
:::

::: exercise PID stability limit {#exr-pid level=2 check="734"}
For the joint of [[#ex-pd]] with $K_p = 36.7\,\mathrm{N\,m/rad}$ and $K_d = 7.24\,\mathrm{N\,m\,s/rad}$, derive the largest integral gain for which the PID loop is stable. (Enter $K_i$ in N·m/(rad·s).)
::: solution
The characteristic polynomial is $0.367s^3 + 7.34s^2 + 36.7s + K_i$. The Routh array has first column $0.367$, $7.34$, $(7.34\times36.7 - 0.367K_i)/7.34$, $K_i$; all positive iff $0 < K_i < 7.34\times36.7/0.367 = 734$. At $K_i = 734$ a pair of roots sits on the imaginary axis at $s = \pm j\sqrt{36.7/0.367} = \pm10j$: the loop oscillates at $\omega_n$.
:::
:::

::: exercise Force-loop gain {#exr-force level=2 check="0.002"}
For the integral force loop of [[#ex-force-loop]] on a surface of stiffness $k_e = 10\,\mathrm{kN/m}$, what gain $K_f$ gives a time constant of $0.05\,\mathrm s$? (Enter $K_f$ in m/(N·s).)
::: solution
$K_f = 1/(k_eT_f) = 1/(10^4\times0.05) = 2\times10^{-3}\,\mathrm{m/(N\,s)}$, five times the value for the $50\,\mathrm{kN/m}$ surface. A loop tuned for the soft surface is five times too fast on the stiff one — tune for the stiffest.
:::
:::

::: exercise Computed torque with an error in the velocity {#exr-ct level=2 check="10.51"}
Repeat [[#ex-computed-torque]] with the same position errors but $\dot{\mathbf e} = (0.05, 0)\,\mathrm{rad/s}$. (Enter $\tau_1$ in N·m, rounded to two decimal places.)
::: solution
The commanded acceleration changes by $-K_d\dot{\mathbf e} = (-2.0, 0)$, so $\mathbf v = (-4.0, 9.0)\,\mathrm{rad/s^2}$ and $\boldsymbol\tau$ changes by $M(-2.0, 0) = (-2.26, -0.475)\,\mathrm{N\,m}$: $\boldsymbol\tau = (12.77 - 2.26,\ 0.845 - 0.475) = (10.51, 0.370)\,\mathrm{N\,m}$. Joint 1 moving faster than its reference is braked harder, and through $m_{21}$ joint 2's torque changes too.
:::
:::

::: exercise Stability of Cartesian PD control {#exr-cartesian level=3}
Prove that the task-space law [[#eq-cartesian-pd]] with symmetric positive definite $K_x$, $D_x$ and a constant $\mathbf x_d$ makes $V = \frac12\dot{\mathbf q}^{\mathsf T}M\dot{\mathbf q} + \frac12\tilde{\mathbf x}^{\mathsf T}K_x\tilde{\mathbf x}$ ($\tilde{\mathbf x} = \mathbf x - \mathbf x_d$) non-increasing, and state what can be concluded about convergence. Show also that, near the equilibrium, the joint-space stiffness felt by small joint displacements is $J^{\mathsf T}K_xJ$.
::: solution
$\dot V = \dot{\mathbf q}^{\mathsf T}M\ddot{\mathbf q} + \frac12\dot{\mathbf q}^{\mathsf T}\dot M\dot{\mathbf q} + \tilde{\mathbf x}^{\mathsf T}K_x\dot{\mathbf x}$. With $M\ddot{\mathbf q} = J^{\mathsf T}(-K_x\tilde{\mathbf x} - D_x\dot{\mathbf x}) - C\dot{\mathbf q}$ and $\dot{\mathbf x} = J\dot{\mathbf q}$:
$\dot V = -\dot{\mathbf x}^{\mathsf T}K_x\tilde{\mathbf x} - \dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} + \frac12\dot{\mathbf q}^{\mathsf T}(\dot M - 2C)\dot{\mathbf q} + \tilde{\mathbf x}^{\mathsf T}K_x\dot{\mathbf x} = -\dot{\mathbf x}^{\mathsf T}D_x\dot{\mathbf x} \le 0$. Trajectories are bounded. On the set $\dot V = 0$, $\dot{\mathbf x} = J\dot{\mathbf q} = \mathbf 0$; if $J$ is non-singular along the way this means $\dot{\mathbf q} = \mathbf 0$, then $\ddot{\mathbf q} = \mathbf 0$ and $J^{\mathsf T}K_x\tilde{\mathbf x} = \mathbf 0$, so $\tilde{\mathbf x} = \mathbf 0$ (again needing $J$ non-singular). LaSalle then gives convergence to $\mathbf x_d$ — but only locally in general: at a singular configuration $J^{\mathsf T}K_x\tilde{\mathbf x}$ can vanish with $\tilde{\mathbf x} \ne \mathbf 0$, and the arm can come to rest there, and for a redundant arm $\mathbf q$ itself need not converge (self-motion is undamped unless joint damping is added). Stiffness: for a small joint displacement $\delta\mathbf q$ from equilibrium, $\delta\mathbf x = J\delta\mathbf q$ and the restoring torque is $-J^{\mathsf T}K_x\delta\mathbf x = -J^{\mathsf T}K_xJ\,\delta\mathbf q$.
:::
:::

::: exercise Robustness of computed torque to a gravity error {#exr-robust level=3 check="0.006812"}
A single joint with true dynamics $J\ddot q + g = \tau$ is controlled by computed torque with the correct $J = 0.367\,\mathrm{kg\,m^2}$ but a gravity estimate $\hat g = g + \Delta g$, where $\Delta g = 1.0\,\mathrm{N\,m}$ is constant, and gains $K_p = 400\,\mathrm{s^{-2}}$, $K_d = 40\,\mathrm{s^{-1}}$. Derive the error equation and the steady-state error for a constant set point. (Enter $e_{ss}$ in rad, rounded to six decimal places.)
::: solution
$\tau = J(\ddot q_d - K_d\dot e - K_pe) + \hat g$, so $J\ddot q + g = J(\ddot q_d - K_d\dot e - K_pe) + g + \Delta g$, i.e. $\ddot e + K_d\dot e + K_pe = \Delta g/J$. At steady state $e_{ss} = \Delta g/(JK_p) = 1.0/(0.367\times400) = 0.006812\,\mathrm{rad} = 0.39^\circ$, positive (the arm sits above the target because the controller over-compensates gravity). Because the computed-torque gains are multiplied by $J$, the effective stiffness is $JK_p = 147\,\mathrm{N\,m/rad}$. An integral term in the outer loop, $-K_i\int e\,dt$ added to $\mathbf v$, would remove the error.
:::
:::

::: exercise Choosing a controller for robotic polishing {#exr-design level=3}
A six-axis industrial arm (stiff, position-controlled, with a six-axis wrist force sensor) must polish a curved car-body panel whose shape is known only to $\pm2\,\mathrm{mm}$, pressing with $30 \pm 3\,\mathrm N$ while moving along the surface at $0.1\,\mathrm{m/s}$. Propose a control structure, say which directions are force- and which position-controlled, how you would choose gains, and what can go wrong.
::: solution
A good answer: use hybrid force/position (or admittance) control in a task frame attached to the tool and aligned with the local surface normal $z$. Natural constraints: the surface prevents motion along $z$ and tilting about $x$, $y$ (if the tool is flat), so control the normal force $f_z = 30\,\mathrm N$ and zero moments $n_x$, $n_y$ (letting the tool align with the surface); control position (the polishing path) in $x$, $y$ and orientation about $z$. Because the arm is position-controlled, implement the force loop as an outer admittance or integral loop adjusting the normal position reference ([[#ex-force-loop]]), tuned for the stiffest contact expected (panel plus tool and sensor compliance); a compliant polishing pad lowers $k_e$ and makes the loop more robust. A $\pm2\,\mathrm{mm}$ shape uncertainty with a $30\,\mathrm N$ force and a $\pm3\,\mathrm N$ tolerance means the effective contact stiffness seen by the force loop should be under about $3\,\mathrm N/2\,\mathrm{mm} = 1.5\,\mathrm{N/mm}$ if the loop were proportional only, which is why integral action (or a soft pad) is needed. Feedforward the expected normal from the CAD model so the force loop only corrects small errors. Hazards: loss of contact at edges (the force loop then drives the tool towards the panel — limit the commanded velocity and position correction), friction forces in $x$, $y$ disturbing the force measurement (compensate or filter), sensor noise and drift (zero the sensor out of contact, low-pass filter), and the speed: at $0.1\,\mathrm{m/s}$ the surface normal changes along the path, so the task frame must be updated continuously.
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar treat independent-joint control with actuator dynamics, PD with gravity compensation and computed torque, with Lyapunov proofs in this chapter's notation; Siciliano et al. give a detailed account of impedance, admittance, force and hybrid control; Lynch and Park cover task-space motion control and hybrid motion–force control in screw notation.
