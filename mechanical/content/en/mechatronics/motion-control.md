A machine tool cutting a contour, a pick-and-place robot loading circuit boards, a wafer stage in a lithography scanner and the print head of a 3D printer all perform the same task: make a mechanical axis follow a prescribed position as a function of time, quickly and accurately, despite friction, varying loads and the elasticity of the mechanism. That is **motion control**. It brings together everything earlier in the course — the motor and its drive ([[mechatronics/electric-actuators]]), the encoder ([[mechatronics/sensors]]), the sampled controller ([[mechatronics/microcontrollers]]) — and the control theory of [[control-systems/pid-control]] and [[control-systems/frequency-response]].

The chapter follows the signal path of a modern servo axis. A **trajectory generator** turns a move command ("go to 300 mm") into smooth reference profiles of position, velocity and acceleration. A **feedback controller**, usually a cascade of position, velocity and current loops, corrects the errors. **Feedforward** supplies the torque the move needs before any error appears. And the limits come from **friction**, **sampling and quantisation**, and **mechanical resonance**, each of which we model and quantify.

## The axis model {#sec-axis-model}

Consider a rotary axis: a motor of inertia $J_m$ drives a load through a transmission, and the total inertia referred to the motor shaft is $J = J_m + J_L/N^2$ ([[mechatronics/electric-actuators#prop-inertia-match]]). The drive's current loop — closed in the drive at a bandwidth of one to several kilohertz — makes the motor torque follow a commanded torque $u$ almost instantly. The free-body diagram of the rigid rotating assembly then has three torques: the motor torque $u$, a friction torque $-T_f(\omega)$, and a load or disturbance torque $-T_d$ (gravity, cutting forces). Newton's second law for rotation gives
$$
J\ddot\theta = u - T_f(\dot\theta) - T_d .
$$ {#eq-axis}
Ignoring friction and disturbance, the plant from torque command to angle is a **double integrator**, $\Theta(s)/U(s) = 1/(Js^2)$. A linear axis driven by a ball screw of lead $p$ is the same model with $J$ including $m(p/2\pi)^2$; a linear motor is the same with mass in place of inertia and force in place of torque. This model is the starting point; we add compliance later.

## Trajectory generation {#sec-trajectory}

If the controller is given a step in reference position, it demands an enormous torque at the first sample, saturates the drive, overshoots and excites every resonance of the machine. Instead the reference is a smooth profile that respects the axis's limits of velocity $v_{\max}$ and acceleration $a_{\max}$ (and in better systems also of **jerk**, the rate of change of acceleration).

::: proposition Trapezoidal velocity profile {#prop-trapezoid}
A move of distance $d$ from rest to rest, with velocity limit $v_{\max}$ and acceleration limit $a_{\max}$ used fully, takes the minimum time
$$
T = \begin{cases} \dfrac{d}{v_{\max}} + \dfrac{v_{\max}}{a_{\max}}, & d \ge \dfrac{v_{\max}^2}{a_{\max}} \quad\text{(trapezoid)},\\[2ex] 2\sqrt{\dfrac{d}{a_{\max}}}, & d < \dfrac{v_{\max}^2}{a_{\max}}\quad\text{(triangle, peak speed } \sqrt{a_{\max}d}\text{)}. \end{cases}
$$ {#eq-trapezoid}
In the trapezoidal case the acceleration and deceleration phases each last $t_a = v_{\max}/a_{\max}$.
:::

::: proof
Accelerate at $a_{\max}$ for $t_a = v_{\max}/a_{\max}$, covering $\tfrac12a_{\max}t_a^2 = v_{\max}^2/(2a_{\max})$; decelerate symmetrically over the same distance. If $d \ge v_{\max}^2/a_{\max}$, the remaining distance $d - v_{\max}^2/a_{\max}$ is covered at $v_{\max}$ in time $d/v_{\max} - v_{\max}/a_{\max}$, so the total is $2t_a + d/v_{\max} - t_a = d/v_{\max} + v_{\max}/a_{\max}$. Otherwise the axis must start decelerating before reaching $v_{\max}$: accelerating for time $t_1$ and decelerating for $t_1$ covers $a_{\max}t_1^2 = d$, so $t_1 = \sqrt{d/a_{\max}}$, $T = 2t_1$ and the peak speed is $a_{\max}t_1 = \sqrt{a_{\max}d}$. This profile is time-optimal for the given limits: at every instant the axis either accelerates or decelerates as hard as allowed or moves at full speed, and the area under the velocity curve (the distance) cannot be achieved in less time without exceeding a limit.
:::

The trapezoid has infinite jerk at its corners: the acceleration — and so the motor torque — jumps. Those jumps excite structural resonances, and the residual vibration after the move often takes longer to die out than the move itself. **S-curve** (jerk-limited) profiles replace each corner with a ramp of acceleration, lengthening the move slightly but reducing vibration and wear. Multi-axis machines use the same ideas along a path: an **interpolator** computes the reference positions of all axes at every sample so that the tool follows a straight line or arc at the programmed feed rate.

::: example A point-to-point move {#ex-trapezoid}
A linear axis with $v_{\max} = 0.50\ \mathrm{m/s}$ and $a_{\max} = 2.5\ \mathrm{m/s^2}$ moves (a) $0.30\ \mathrm{m}$, (b) $0.050\ \mathrm{m}$. Find the move times and peak speeds. The moving mass is $20\ \mathrm{kg}$ and the axis is driven by a ball screw with $10\ \mathrm{mm}$ lead; find the motor torque during acceleration (ignore the motor and screw inertia and friction) and the peak motor speed.
::: solution
$v_{\max}^2/a_{\max} = 0.25/2.5 = 0.10\ \mathrm{m}$.

(a) $d = 0.30 \ge 0.10$: trapezoid. $T = 0.30/0.50 + 0.50/2.5 = 0.60 + 0.20 = 0.80\ \mathrm{s}$; $t_a = 0.20\ \mathrm{s}$; peak speed $0.50\ \mathrm{m/s}$.

(b) $d = 0.050 < 0.10$: triangle. $T = 2\sqrt{0.050/2.5} = 2\sqrt{0.020} = 0.283\ \mathrm{s}$; peak speed $\sqrt{2.5 \times 0.050} = 0.354\ \mathrm{m/s}$.

Torque: force $ma = 20 \times 2.5 = 50\ \mathrm{N}$; through a screw of lead $p$ the torque is $Fp/(2\pi) = 50 \times 0.010/(2\pi) = 0.080\ \mathrm{N\,m}$. Peak motor speed $0.50/0.010 = 50\ \mathrm{rev/s} = 3000\ \mathrm{rev/min}$.

Sanity check: the distances under the velocity curves are $\tfrac12(0.80 + 0.40) \times 0.50 = 0.30\ \mathrm{m}$ and $\tfrac12 \times 0.283 \times 0.354 = 0.050\ \mathrm{m}$. The short move spends no time at full speed, so for short moves acceleration, not top speed, sets the cycle time — the reason pick-and-place machines are designed for very high accelerations.
:::
:::

::: widget plot
title: Trapezoidal velocity profile
f: max(0, min(min(a*x, min(v, sqrt(a*0.3))), a*(0.3/min(v, sqrt(a*0.3)) + min(v, sqrt(a*0.3))/a - x)))
x: 0, 1.6
y: 0, 1
sliders: v=0.5:0.2:1:0.05; a=2.5:0.5:10:0.1
labels: v(t)\ \text{(m/s)}
caption: Velocity (m/s) against time (s) for a $0.30\ \mathrm{m}$ move with velocity limit $v$ and acceleration limit $a$ on the sliders. The area under the curve is always $0.30\ \mathrm{m}$. Raise $v$ with $a$ fixed: beyond $v = \sqrt{0.3a}$ the profile becomes a triangle and the extra speed is never reached. Raise $a$: the ramps steepen and the move shortens, up to the limit $d/v$.
:::

## Feedback control of the axis {#sec-feedback}

### PD control and the stiffness of the axis

The simplest controller that stabilises a double integrator is proportional plus derivative: $u = K_p(\theta_r - \theta) - K_d\dot\theta$, with the derivative acting on the measured velocity (velocity feedback, as from a tachometer or the differenced encoder).

::: proposition PD control of an inertia {#prop-pd-inertia}
For the axis $J\ddot\theta = u - T_d$ with $u = K_p(\theta_r - \theta) - K_d\dot\theta$, the closed loop is
$$
J\ddot\theta + K_d\dot\theta + K_p\theta = K_p\theta_r - T_d,
$$ {#eq-pd-closed}
a second-order system with
$$
\omega_n = \sqrt{K_p/J},\qquad \zeta = \frac{K_d}{2\sqrt{K_pJ}};\qquad\text{equivalently}\quad K_p = J\omega_n^2,\quad K_d = 2\zeta\omega_nJ .
$$ {#eq-pd-gains}
A constant disturbance torque $T_d$ causes a steady position error $T_d/K_p$ (the axis behaves as a spring of stiffness $K_p$). A ramp reference $\theta_r = \Omega t$ is followed with a steady **following error** $e_{ss} = K_d\Omega/K_p$.
:::

::: proof
Substitute $u$ into $J\ddot\theta = u - T_d$ and rearrange to obtain [[#eq-pd-closed]]. Dividing by $J$ and comparing with $\ddot\theta + 2\zeta\omega_n\dot\theta + \omega_n^2\theta$ gives $\omega_n^2 = K_p/J$ and $2\zeta\omega_n = K_d/J$, i.e. [[#eq-pd-gains]]. Steady state under a constant $T_d$ with $\theta_r$ constant: $\dot\theta = \ddot\theta = 0$, so $K_p\theta = K_p\theta_r - T_d$ and $\theta_r - \theta = T_d/K_p$. For a ramp, in steady state the axis moves at $\dot\theta = \Omega$ with $\ddot\theta = 0$ and a constant lag $e = \theta_r - \theta$; with $T_d = 0$ the equation gives $K_d\Omega = K_p(\theta_r - \theta)$, so $e = K_d\Omega/K_p$.
:::

The proportional gain is a **servo stiffness**: a well-tuned axis resists a disturbance as if held by a spring of stiffness $K_p$ (in $\mathrm{N\,m/rad}$, or $\mathrm{N/m}$ for a linear axis), and the stiffness rises with the square of the bandwidth. Doubling $\omega_n$ quadruples the stiffness and quarters the position error under a cutting force — which is why the bandwidth of machine-tool axes is pushed as high as the structure allows.

Industrial drives implement the same law as a **cascade**: an outer position loop with proportional gain $K_v$ (often called the **$K_v$ factor**, in $\mathrm{s^{-1}}$) produces a velocity command $K_v(\theta_r - \theta)$, and an inner velocity loop with gain $K_{vel}$ (usually PI) produces the torque command. With a proportional velocity loop this is exactly PD control with $K_p = K_vK_{vel}$ and $K_d = K_{vel}$, and the following error at constant speed is $\Omega/K_v$. Cascades are tuned from the inside out — current, then velocity, then position — each loop several times slower than the one inside it, and they make it easy to limit velocity and current at the loop boundaries.

::: example Tuning a PD position loop {#ex-pd}
An axis has total inertia $J = 0.010\ \mathrm{kg\,m^2}$ at the motor. Choose $K_p$ and $K_d$ for $\omega_n = 100\ \mathrm{rad/s}$ and $\zeta = 0.7$. Find the position error under a steady disturbance of $1.0\ \mathrm{N\,m}$, and the following error at $10\ \mathrm{rad/s}$.
::: solution
$K_p = J\omega_n^2 = 0.010 \times 10^{4} = 100\ \mathrm{N\,m/rad}$; $K_d = 2 \times 0.7 \times 100 \times 0.010 = 1.4\ \mathrm{N\,m\,s/rad}$. Disturbance error $1.0/100 = 0.010\ \mathrm{rad}$ ($0.57°$). Following error $K_d\Omega/K_p = 1.4 \times 10/100 = 0.14\ \mathrm{rad}$ ($8.0°$); the equivalent $K_v = K_p/K_d = 71\ \mathrm{s^{-1}}$.

Sanity check: with a $5\ \mathrm{mm}$ lead screw ($p/2\pi = 0.796\ \mathrm{mm/rad}$), the following error corresponds to $0.11\ \mathrm{mm}$ at $8\ \mathrm{mm/s}$ — tolerable for point-to-point moves, which only need to arrive, but not for contouring, where two axes with different lags cut the wrong path. The cures are integral action for the static error and feedforward for the following error.
:::
:::

::: widget plot
title: Step response of the PD-controlled axis
f: 1 - exp(-z*x)*(cos(sqrt(1 - z^2)*x) + z/sqrt(1 - z^2)*sin(sqrt(1 - z^2)*x))
x: 0, 12
y: 0, 1.8
sliders: z=0.7:0.1:0.95:0.05
hlines: 0.98; 1.02
labels: \theta/\theta_r
caption: Response of the closed loop [[#eq-pd-closed]] to a small step in reference, against normalised time $\omega_nt$, for damping ratio $\zeta$ on the slider; the horizontal lines mark the $\pm 2\,\%$ band. Near $\zeta = 0.7$ the response is fast with a small overshoot ($4.6\,\%$); low damping rings, and high damping creeps into the band. Because the time axis is $\omega_nt$, every curve shrinks in proportion to $1/\omega_n$: the bandwidth sets the speed, the damping the shape. In practice steps are replaced by profiled moves.
:::

### Integral action and friction

Adding an integral term, $u = K_p e + K_i\int e\,\mathrm{d}t - K_d\dot\theta$, removes the steady error under a constant disturbance (gravity on a vertical axis, a constant cutting force), because the integrator keeps changing $u$ until $e = 0$. The closed loop is then third order, $Js^3 + K_ds^2 + K_ps + K_i = 0$, and the gains can be chosen to place its poles.

::: proposition Pole placement for PID control of an inertia {#prop-pid-poles}
For $J\ddot\theta = u$ with $u = K_pe + K_i\int e\,\mathrm{d}t - K_d\dot\theta$, the closed-loop characteristic polynomial equals $J(s + p)(s^2 + 2\zeta\omega_ns + \omega_n^2)$ — a real pole at $-p$ and a complex pair with natural frequency $\omega_n$ and damping $\zeta$ — when
$$
K_d = J(p + 2\zeta\omega_n),\qquad K_p = J(\omega_n^2 + 2\zeta\omega_np),\qquad K_i = Jp\,\omega_n^2 .
$$ {#eq-pid-poles}
:::

::: proof
With $e = \theta_r - \theta$, transform: $Js^2\Theta = (K_p + K_i/s)(\Theta_r - \Theta) - K_ds\Theta$. Multiply by $s$ and collect the $\Theta$ terms: $(Js^3 + K_ds^2 + K_ps + K_i)\Theta = (K_ps + K_i)\Theta_r$. Expand the target: $J(s + p)(s^2 + 2\zeta\omega_ns + \omega_n^2) = J[s^3 + (p + 2\zeta\omega_n)s^2 + (\omega_n^2 + 2\zeta\omega_np)s + p\omega_n^2]$. Equating coefficients of $s^2$, $s$ and $s^0$ gives [[#eq-pid-poles]].
:::

A common choice is $p$ between $\omega_n/4$ and $\omega_n$: a smaller $p$ makes the integral slow to remove disturbance errors, a larger one adds overshoot through the zero at $-K_i/K_p$.

**Friction** is the main non-linearity of mechanical axes. The simplest model adds **Coulomb** friction, a constant magnitude $T_c$ opposing the motion, to viscous friction $b\dot\theta$; real friction is larger at breakaway than in sliding (**stiction**) and falls with increasing speed at low speeds (the **Stribeck** effect). With PD control, Coulomb friction makes the axis stop anywhere within a **dead band** $\lvert e\rvert \le T_c/K_p$, where the spring force is too small to overcome friction. Integral action winds up until the axis breaks free, then overshoots and sticks on the other side: a slow oscillation called **hunting**, or, when the axis is moving slowly, **stick–slip**. Remedies are stiffer control, **friction compensation** (adding an estimate of $T_c\,\mathrm{sgn}(\dot\theta_r)$ to the feedforward torque), low-friction mechanics (linear guides with rolling elements, preloaded screws, air bearings) and avoiding integral action in a dead band.

## Feedforward {#sec-feedforward}

Feedback acts only after an error has appeared. When the reference trajectory is known in advance — as it always is in motion control — the torque it requires can be supplied directly. This is **feedforward**.

::: proposition Model-based feedforward {#prop-feedforward}
For the axis [[#eq-axis]] with viscous friction $T_f = b\dot\theta$ and no disturbance, the control
$$
u = \underbrace{J\ddot\theta_r + b\dot\theta_r}_{\text{feedforward}} + K_p(\theta_r - \theta) + K_d(\dot\theta_r - \dot\theta)
$$ {#eq-feedforward}
makes the tracking error $e = \theta_r - \theta$ obey
$$
J\ddot e + (K_d + b)\dot e + K_pe = 0,
$$
so that $e$ decays to zero from any initial error, for **any** reference trajectory, whatever its speed or acceleration.
:::

::: proof
Substitute [[#eq-feedforward]] into $J\ddot\theta = u - b\dot\theta$: $J\ddot\theta = J\ddot\theta_r + b\dot\theta_r + K_pe + K_d\dot e - b\dot\theta$. Moving $J\ddot\theta$ to the right and grouping, $0 = J\ddot e + b\dot e + K_pe + K_d\dot e$, which is the stated error equation. With $J$, $K_p > 0$ and $K_d + b > 0$, both roots of $Js^2 + (K_d + b)s + K_p$ have negative real parts, so $e \to 0$.
:::

Feedforward removes the following error — in [[#ex-pd]], from $0.14\ \mathrm{rad}$ to essentially zero at constant speed — without raising the feedback gains, and so without making the loop less stable or noisier. Its effectiveness depends on the accuracy of the model: a $10\,\%$ error in $J$ leaves $10\,\%$ of the acceleration torque to be supplied by feedback during acceleration. Feedback and feedforward have complementary jobs: **feedforward makes the axis follow the planned motion; feedback corrects the unplanned** — disturbances, model errors, the initial error. Smooth reference profiles are essential: the feedforward torque is proportional to $\ddot\theta_r$, so a jerk-free profile gives a smooth torque.

::: example Feedforward torque for a profiled move {#ex-feedforward}
For the move of [[#ex-trapezoid]](a), the axis at the motor has $J = 1.0\times10^{-4}\ \mathrm{kg\,m^2}$ (motor and screw) plus the reflected $20\ \mathrm{kg}$ carriage, and viscous friction $b = 2.0\times10^{-4}\ \mathrm{N\,m\,s/rad}$. Compute the feedforward torque during acceleration and during constant velocity.
::: solution
Reflected carriage inertia $m(p/2\pi)^2 = 20 \times (0.010/2\pi)^2 = 5.07\times10^{-5}\ \mathrm{kg\,m^2}$; total $J = 1.51\times10^{-4}\ \mathrm{kg\,m^2}$. Motor acceleration $\ddot\theta_r = a/(p/2\pi) = 2.5/1.592\times10^{-3} = 1571\ \mathrm{rad/s^2}$; motor speed at $0.5\ \mathrm{m/s}$, $\dot\theta_r = 314.2\ \mathrm{rad/s}$.

During acceleration (speed rising from $0$ to $314\ \mathrm{rad/s}$): $J\ddot\theta_r = 1.51\times10^{-4} \times 1571 = 0.237\ \mathrm{N\,m}$, plus $b\dot\theta_r$ rising to $0.063\ \mathrm{N\,m}$: up to $0.30\ \mathrm{N\,m}$. At constant speed: $b\dot\theta_r = 2.0\times10^{-4} \times 314.2 = 0.063\ \mathrm{N\,m}$. During deceleration: $-0.237 + 0.063 = -0.17\ \mathrm{N\,m}$ at the start, falling to $-0.24\ \mathrm{N\,m}$.

Sanity check: the carriage contributes only a third of the inertia; the motor and screw dominate, so the $0.080\ \mathrm{N\,m}$ found in [[#ex-trapezoid]] for the carriage alone badly underestimated the torque. The same numbers serve for motor sizing: peak about $0.30\ \mathrm{N\,m}$, and the rms over the cycle for the thermal check.
:::
:::

## Sampling, quantisation and resonance {#sec-limits}

Three effects limit how far the gains can be raised.

**Sampling delay.** A digital controller at sampling period $T$ adds a delay of about $T/2$ (hold) plus the computation time ([[mechatronics/microcontrollers]]). At the crossover frequency $\omega_c$ the phase lost is $\omega_c\tau_d$; to keep it below about $10°$–$20°$, sampling must be ten to thirty times faster than the crossover. Servo drives sample their position and velocity loops at $4$–$16\ \mathrm{kHz}$ for this reason.

**Quantisation.** Velocity computed by differencing an encoder at a high sampling rate is very coarse: with $n_e$ counts per revolution and period $T$, one count corresponds to $2\pi/(n_eT)$ rad/s ([[mechatronics/sensors#prop-speed]]). A high derivative gain multiplies this noise and produces audible torque noise and heating. High-resolution encoders (sine–cosine encoders interpolated to millions of counts per revolution), velocity observers and filtering of the derivative relieve it.

**Mechanical resonance.** Real transmissions are elastic: couplings, belts, screws and the frame itself. The simplest model that captures this is two inertias connected by a torsional spring.

::: proposition Two-mass resonance {#prop-two-mass}
A motor of inertia $J_m$ drives a load of inertia $J_L$ through a shaft of torsional stiffness $k$ (no damping). The transfer function from motor torque to motor angle is
$$
\frac{\Theta_m(s)}{U(s)} = \frac{J_Ls^2 + k}{s^2\left[J_mJ_Ls^2 + k(J_m + J_L)\right]},
$$ {#eq-two-mass}
which has an **antiresonance** (a pair of imaginary zeros) at $\omega_{ar} = \sqrt{k/J_L}$ and a **resonance** (a pair of imaginary poles) at $\omega_r = \sqrt{k(1/J_m + 1/J_L)}$, with $\omega_r/\omega_{ar} = \sqrt{1 + J_L/J_m}$.
:::

::: proof
Free-body diagrams: motor $J_m\ddot\theta_m = u - k(\theta_m - \theta_L)$; load $J_L\ddot\theta_L = k(\theta_m - \theta_L)$. Transform the load equation: $\Theta_L = k\Theta_m/(J_Ls^2 + k)$. Substitute into the motor equation: $J_ms^2\Theta_m = U - k\Theta_m + k^2\Theta_m/(J_Ls^2 + k)$, so
$$
U = \Theta_m\,\frac{(J_ms^2 + k)(J_Ls^2 + k) - k^2}{J_Ls^2 + k} = \Theta_m\,\frac{s^2\left[J_mJ_Ls^2 + k(J_m + J_L)\right]}{J_Ls^2 + k},
$$
which inverts to [[#eq-two-mass]]. The zeros satisfy $J_Ls^2 + k = 0$, $s = \pm j\sqrt{k/J_L}$; the non-zero poles satisfy $J_mJ_Ls^2 + k(J_m + J_L) = 0$, $s = \pm j\sqrt{k(J_m + J_L)/(J_mJ_L)}$. The ratio squared is $(J_m + J_L)/J_m$. As $k \to \infty$ the zeros and poles move to infinity together and the plant tends to $1/[(J_m + J_L)s^2]$, the rigid axis.
:::

Below the antiresonance the axis behaves as a rigid inertia $J_m + J_L$; above the resonance, the motor sees only its own inertia while the load is left behind. The resonance limits the bandwidth: a position loop cannot be much faster than about a third of $\omega_{ar}$ without exciting it. The larger the inertia ratio $J_L/J_m$, the wider apart the antiresonance and resonance, and the harder the control — one reason servo designers keep that ratio moderate. Remedies are a stiffer transmission, a **notch filter** in the velocity loop tuned to the resonance, a load-side encoder (which brings its own difficulties), and jerk-limited trajectories that do not excite it.

::: example Resonance of a belt-driven axis {#ex-resonance}
A servo motor with $J_m = 1.0\times10^{-4}\ \mathrm{kg\,m^2}$ drives, through a toothed belt, a load with reflected inertia $J_L = 4.0\times10^{-4}\ \mathrm{kg\,m^2}$; the belt's torsional stiffness referred to the motor is $k = 400\ \mathrm{N\,m/rad}$. Find the antiresonance and resonance frequencies and estimate the attainable position bandwidth.
::: solution
$\omega_{ar} = \sqrt{400/4.0\times10^{-4}} = \sqrt{10^6} = 1000\ \mathrm{rad/s}$ ($159\ \mathrm{Hz}$). $\omega_r = \sqrt{400(10^4 + 2500)} = \sqrt{5.0\times10^{6}} = 2236\ \mathrm{rad/s}$ ($356\ \mathrm{Hz}$). Ratio $\sqrt{1 + 4} = \sqrt5 = 2.24$. Bandwidth: about $\omega_{ar}/3 \approx 330\ \mathrm{rad/s}$, roughly $50\ \mathrm{Hz}$, at best; a velocity-loop notch filter at $356\ \mathrm{Hz}$ would usually be needed to reach it.

Sanity check: a rigid axis with this inertia would have no such limit; the compliance, not the motor, sets the bandwidth. Replacing the belt by a stiffer ball screw ($k$ several times larger) raises both frequencies by $\sqrt{k}$.
:::
:::

::: warning Tuning by gain alone, and the wrong encoder
Two frequent mistakes. (1) Trying to remove a following error or a contour error by raising the feedback gains. The gains are limited by sampling, quantisation noise and resonance; above those limits the axis oscillates or screams. Following error at speed is removed by velocity and acceleration feedforward, static errors by integral action, and the gains are set for disturbance rejection and stability margins. (2) Assuming that a motor encoder measures the load. Backlash, screw pitch errors, thermal growth and the elastic deflection of [[#prop-two-mass]] lie between them; the controller holds the motor perfectly while the tool is wrong. Precision machines add a load-side (linear-scale) encoder — and then must deal with the resonance appearing inside the loop.
:::

::: quiz
An axis with PD control has $K_p = 200\ \mathrm{N\,m/rad}$ and $K_d = 2\ \mathrm{N\,m\,s/rad}$. What is its following error at a constant $5\ \mathrm{rad/s}$ without feedforward?
- [ ] $0$
- [ ] $0.025\ \mathrm{rad}$
- [x] $0.05\ \mathrm{rad}$
- [ ] $0.5\ \mathrm{rad}$
::: solution
$e_{ss} = K_d\Omega/K_p = 2 \times 5/200 = 0.05\ \mathrm{rad}$ ([[#prop-pd-inertia]]). The velocity feedback opposes the motion with $K_d\Omega = 10\ \mathrm{N\,m}$, and the position error must supply an equal torque through $K_p$. Velocity feedforward ($K_d\dot\theta_r$) supplies it instead and removes the error.
:::
:::

::: history
Closed-loop control of machine axes from numerical data began at the Servomechanisms Laboratory of the Massachusetts Institute of Technology, where, following a proposal by John T. Parsons for machining helicopter rotor-blade templates from computed coordinates, a numerically controlled milling machine was demonstrated in 1952; its axes were driven by servomotors fed from punched tape. The first industrial robot, the Unimate of George Devol and Joseph Engelberger, went to work at a General Motors plant in 1961, with hydraulically driven, position-controlled joints. Computer numerical control (CNC), with a computer in place of hard-wired logic, spread through the 1970s, and digital servo drives with microprocessor-based velocity and position loops displaced analogue amplifiers during the 1980s and 1990s, making feedforward, notch filters and automatic tuning standard features.
:::

::: summary
- A current-controlled axis is a double integrator, $J\ddot\theta = u - T_f - T_d$, with $J$ the total inertia at the motor.
- Trapezoidal profiles: $T = d/v_{\max} + v_{\max}/a_{\max}$ (or $2\sqrt{d/a_{\max}}$ for short moves); S-curves limit jerk and residual vibration.
- PD control: $K_p = J\omega_n^2$, $K_d = 2\zeta\omega_nJ$; stiffness $K_p$, disturbance error $T_d/K_p$, following error $K_d\Omega/K_p = \Omega/K_v$. Cascades tune inside-out.
- PID by pole placement: $K_d = J(p + 2\zeta\omega_n)$, $K_p = J(\omega_n^2 + 2\zeta\omega_np)$, $K_i = Jp\omega_n^2$. Coulomb friction causes a dead band $T_c/K_p$ and, with integral action, hunting.
- Feedforward $J\ddot\theta_r + b\dot\theta_r$ removes following error for any trajectory; feedback handles the unplanned.
- Sampling delay, encoder quantisation and the two-mass resonance ($\omega_{ar} = \sqrt{k/J_L}$, $\omega_r = \omega_{ar}\sqrt{1 + J_L/J_m}$) limit the bandwidth.
:::

## Exercises

::: exercise Trapezoidal move time {level=1 check="0.9"}
An axis with $v_{\max} = 0.50\ \mathrm{m/s}$ and $a_{\max} = 5.0\ \mathrm{m/s^2}$ moves $0.40\ \mathrm{m}$ from rest to rest. Find the minimum move time. (Enter $T$ in s.)
::: solution
$v_{\max}^2/a_{\max} = 0.05\ \mathrm{m} < 0.40\ \mathrm{m}$, so trapezoid: $T = 0.40/0.50 + 0.50/5.0 = 0.80 + 0.10 = 0.90\ \mathrm{s}$.
:::
:::

::: exercise A short move {level=1 check="0.2"}
The same kind of axis, with $a_{\max} = 2.0\ \mathrm{m/s^2}$ and $v_{\max} = 1.0\ \mathrm{m/s}$, moves $20\ \mathrm{mm}$. Find the move time. (Enter $T$ in s.)
::: solution
$v_{\max}^2/a_{\max} = 0.5\ \mathrm{m} > 0.02\ \mathrm{m}$: triangle. $T = 2\sqrt{0.02/2.0} = 2 \times 0.1 = 0.20\ \mathrm{s}$, peak speed $\sqrt{2.0 \times 0.02} = 0.20\ \mathrm{m/s}$.
:::
:::

::: exercise Proportional gain for a given bandwidth {level=1 check="50"}
Find $K_p$ for an axis with $J = 0.020\ \mathrm{kg\,m^2}$ and a desired $\omega_n = 50\ \mathrm{rad/s}$. (Enter $K_p$ in N·m/rad.)
::: solution
$K_p = J\omega_n^2 = 0.020 \times 2500 = 50\ \mathrm{N\,m/rad}$. For $\zeta = 1$, $K_d = 2 \times 50 \times 0.020 = 2.0\ \mathrm{N\,m\,s/rad}$.
:::
:::

::: exercise Error under a disturbance {level=1 check="0.01"}
The axis of the previous exercise carries a steady disturbance torque of $0.50\ \mathrm{N\,m}$ under PD control. Find the steady position error. (Enter it in rad.)
::: solution
$e = T_d/K_p = 0.50/50 = 0.010\ \mathrm{rad}$.
:::
:::

::: exercise Following error of a cascade {level=2 check="4"}
A linear axis has a position-loop $K_v$ factor of $25\ \mathrm{s^{-1}}$ and no feedforward. Find the following error at $0.10\ \mathrm{m/s}$. (Enter it in mm.)
::: solution
$e = v/K_v = 0.10/25 = 4.0\times10^{-3}\ \mathrm{m} = 4\ \mathrm{mm}$. Machine-tool controls often express $K_v$ in $(\mathrm{m/min})/\mathrm{mm}$: here $25\ \mathrm{s^{-1}} = 1.5\ (\mathrm{m/min})/\mathrm{mm}$, and $6\ \mathrm{m/min}$ gives $4\ \mathrm{mm}$.
:::
:::

::: exercise Peak feedforward torque {level=2 check="4"}
An axis with $J = 0.020\ \mathrm{kg\,m^2}$ and negligible friction follows a profile with peak acceleration $200\ \mathrm{rad/s^2}$. Find the peak feedforward torque. (Enter it in N·m.)
::: solution
$J\ddot\theta_r = 0.020 \times 200 = 4.0\ \mathrm{N\,m}$.
:::
:::

::: exercise Friction dead band {level=2 check="0.004"}
An axis with Coulomb friction $T_c = 0.20\ \mathrm{N\,m}$ is under PD control with $K_p = 50\ \mathrm{N\,m/rad}$. Find the half-width of the band of positions in which it may come to rest. (Enter it in rad.)
::: solution
The axis stops wherever the restoring torque $K_p\lvert e\rvert$ is less than the friction it must overcome: $\lvert e\rvert \le T_c/K_p = 0.20/50 = 0.004\ \mathrm{rad}$. Integral action would remove this band but can cause hunting.
:::
:::

::: exercise Resonance ratio {level=2 check="2"}
In a two-mass axis the load inertia is three times the motor inertia. Find $\omega_r/\omega_{ar}$. (Enter the ratio.)
::: solution
$\sqrt{1 + J_L/J_m} = \sqrt{1 + 3} = 2$.
:::
:::

::: exercise PID gains by pole placement {level=3 check="5000"}
For $J = 0.010\ \mathrm{kg\,m^2}$, choose PID gains that place the closed-loop poles at a complex pair with $\omega_n = 100\ \mathrm{rad/s}$, $\zeta = 0.7$ and a real pole at $-50\ \mathrm{s^{-1}}$. Find all three gains. (Enter $K_i$ in N·m/(rad·s).)
::: solution
From [[#eq-pid-poles]]: $K_d = 0.010(50 + 140) = 1.9\ \mathrm{N\,m\,s/rad}$; $K_p = 0.010(10^4 + 2 \times 0.7 \times 100 \times 50) = 0.010 \times 17\,000 = 170\ \mathrm{N\,m/rad}$; $K_i = 0.010 \times 50 \times 10^4 = 5000\ \mathrm{N\,m/(rad\,s)}$. Check: the polynomial $0.01s^3 + 1.9s^2 + 170s + 5000$ divided by $0.01$ is $s^3 + 190s^2 + 17\,000s + 500\,000 = (s + 50)(s^2 + 140s + 10^4)$.
:::
:::

::: exercise Designing a pick-and-place axis {level=3}
A belt-driven pick-and-place axis must move a $2\ \mathrm{kg}$ head $0.40\ \mathrm{m}$ in $0.35\ \mathrm{s}$ including settling to $\pm 0.05\ \mathrm{mm}$, $60$ times a minute. Choose a velocity profile and its limits, estimate the motor torque and speed (pulley radius $20\ \mathrm{mm}$), choose an encoder and a sampling rate, and say how you would deal with the belt resonance and with settling.
::: solution
A good answer: allow about $0.05\ \mathrm{s}$ for settling, so $0.30\ \mathrm{s}$ for the move. A triangular profile would need $a = 4d/T^2 = 17.8\ \mathrm{m/s^2}$ and peak speed $2.67\ \mathrm{m/s}$; a trapezoid with $v_{\max} = 2.0\ \mathrm{m/s}$ needs $T = d/v + v/a$, i.e. $a = 2.0/(0.30 - 0.20) = 20\ \mathrm{m/s^2}$ — a jerk-limited S-curve with somewhat higher peak acceleration is better for settling. Force on the head $2 \times 20 = 40\ \mathrm{N}$ plus belt and pulley inertia and friction; torque at a $20\ \mathrm{mm}$ pulley about $0.8\ \mathrm{N\,m}$ for the head alone, perhaps $1.2$–$1.5\ \mathrm{N\,m}$ with motor and pulley inertia (compute with [[#ex-feedforward]]); motor speed $2.0/0.020 = 100\ \mathrm{rad/s}$ ($955\ \mathrm{rev/min}$). Resolution: $\pm 0.05\ \mathrm{mm}$ needs about $10\ \mathrm{\mu m}$ per count, i.e. $2\pi \times 20\ \mathrm{mm}/10\ \mathrm{\mu m} \approx 12\,600$ counts per revolution — a 17-bit or higher encoder. The belt's stretch makes the two-mass resonance the main limit: estimate it from the belt stiffness, use a notch filter and S-curve profiles, possibly input shaping, and acceleration feedforward; consider a load-side linear scale if the belt's elasticity at the end of the move exceeds the tolerance. Sample at $4$–$8\ \mathrm{kHz}$. Check rms torque over the $1\ \mathrm{s}$ cycle for the thermal rating.
:::
:::
