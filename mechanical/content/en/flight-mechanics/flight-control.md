The previous lesson ended with a diagnosis: the jet transport, as its airframe alone would fly it, has a Dutch roll that takes four cycles to halve, a marginal phugoid, and a short period that is only just adequate. A century ago the cure would have been a bigger fin or a different tail. Today it is feedback: sensors measure the motion, a computer works out control-surface commands, and actuators move the surfaces — continuously and much faster than a pilot could. This lesson introduces the main ideas of aircraft flight control: **stability augmentation** (dampers that change the modes), **autopilots** (outer loops that hold an attitude, altitude or heading), and **fly-by-wire** control laws, in which the pilot's stick commands a motion rather than a surface deflection, and the airframe may even be unstable without the computer.

The tools are those of [[control-systems/transfer-functions]], [[control-systems/root-locus]], [[control-systems/pid-control]] and [[control-systems/state-space]]; the plant models are the linear state-space models of [[flight-mechanics/aircraft-equations-of-motion]], and the targets are the handling-qualities requirements of [[flight-mechanics/dynamic-modes]]. As with every safety-critical system, real flight control systems are designed, verified and certified to airworthiness rules and software and hardware assurance standards; this lesson teaches the principles behind them.

## The flight control system {#sec-fcs}

In an aircraft with **mechanical (reversible) controls**, cables and rods connect the stick and pedals directly to the surfaces, and the pilot feels the aerodynamic hinge moments ([[flight-mechanics/longitudinal-static-stability#sec-stick-free]]). As aircraft grew larger and faster those forces became too large, and **powered controls** — hydraulic actuators driven by the pilot's linkage — were introduced; being irreversible, they need an **artificial feel** system (springs, or a feel unit scheduled with dynamic pressure) to give the pilot the stick forces he or she expects. Once the surface is moved by an actuator, its command can be modified electrically: a **stability augmentation system** (SAS) adds small, limited-authority commands from rate gyros to the pilot's input. **Fly-by-wire** (FBW) goes all the way: the stick is an electrical sensor, a computer calculates every surface command, and the mechanical link is removed altogether.

::: definition Feedback control of an aircraft {#def-fcs}
A **flight control law** computes control-surface commands $\mathbf u$ from the pilot's commands $\mathbf u_p$ and measured states $\mathbf y = \mathbf C\mathbf x$. A linear law with constant gains, $\mathbf u = \mathbf u_p + \mathbf K\mathbf y$, applied to the plant $\dot{\mathbf x} = \mathbf A\mathbf x + \mathbf B\mathbf u$, gives the closed-loop system
$$
\dot{\mathbf x} = (\mathbf A + \mathbf B\mathbf K\mathbf C)\,\mathbf x + \mathbf B\,\mathbf u_p ,
$$ {#eq-closed-loop}
whose eigenvalues — the **augmented modes** — are moved by the choice of $\mathbf K$. A **damper** feeds back an angular rate; a **stability augmentation** loop feeds back an angle (of attack, sideslip); an **autopilot** closes outer loops on attitude, altitude, heading or speed.
:::

The sensors are rate gyros (today usually ring-laser or fibre-optic, often inside an inertial reference unit), accelerometers, angle-of-attack and sideslip vanes, and air-data probes for dynamic pressure, airspeed and altitude. Because all the stability derivatives scale with dynamic pressure, gains are **scheduled** with flight condition — typically with dynamic pressure and Mach number — so that one set of gains is not asked to work from approach to cruise.

## The pitch damper {#sec-pitch-damper}

The short-period damping is governed by $M_q + M_{\dot\alpha}$ ([[flight-mechanics/dynamic-modes#prop-short-period]]). A pitch-rate gyro and the elevator can add to it: command
$$
\Delta\delta_e = K_q\,\Delta q + \Delta\delta_{e,\text{pilot}},
$$ {#eq-pitch-damper}
with $K_q > 0$ (a nose-up rate commands trailing-edge-down elevator, which gives a nose-down moment since $M_{\delta e} < 0$).

::: proposition Short period with pitch-rate feedback {#prop-pitch-damper}
In the short-period approximation, neglecting the elevator's direct lift ($Z_{\delta e}$), the pitch damper [[#eq-pitch-damper]] replaces $M_q$ by $M_q + M'_{\delta e}K_q$, where $M'_{\delta e} = M_{\delta e} + M_{\dot w}Z_{\delta e}$. The closed-loop short-period characteristics are
$$
\omega_{sp}^2 = \frac{Z_\alpha(M_q + M'_{\delta e}K_q)}{u_0} - M_\alpha,\qquad
2\zeta_{sp}\omega_{sp} = -\left(M_q + M'_{\delta e}K_q + M_{\dot\alpha} + \frac{Z_\alpha}{u_0}\right).
$$ {#eq-sp-damper}
Rate feedback increases both the damping ratio and (slightly) the frequency.
:::

::: proof
Substitute $\Delta\delta_e = K_q\Delta q$ into the pitch equation of the short-period model, $\Delta\dot q = (M_\alpha + M_{\dot\alpha}Z_\alpha/u_0)\Delta\alpha + (M_q + M_{\dot\alpha})\Delta q + M'_{\delta e}\Delta\delta_e$ (the elevator's input to the third row of $\mathbf B_{\text{long}}$, [[flight-mechanics/aircraft-equations-of-motion#eq-a-long]]). The coefficient of $\Delta q$ becomes $M_q + M_{\dot\alpha} + M'_{\delta e}K_q$; this is the same as replacing $M_q$ by $M_q + M'_{\delta e}K_q$. The formulas then follow from [[flight-mechanics/dynamic-modes#eq-sp]]. Since $M'_{\delta e} < 0$ and $Z_\alpha < 0$, a positive $K_q$ makes the damping term larger and $\omega_{sp}^2$ larger. Assumptions: those of the short-period approximation; ideal (instantaneous) sensor and actuator; $Z_{\delta e}$ neglected (it changes the $\Delta\dot\alpha$ equation slightly).
:::

::: example A pitch damper for the jet transport {#ex-pitch-damper}
Choose $K_q$ to give the jet transport's short period a damping ratio of $0.70$ in cruise, and check the result on the full fourth-order model including $Z_{\delta e}$.
::: solution
From [[flight-mechanics/aircraft-equations-of-motion#ex-long-derivs]]: $Z_\alpha/u_0 = -0.4059$, $M_\alpha = -0.7564$, $M_{\dot\alpha} = -0.0751$, $M_q = -0.2253\ \mathrm{s^{-1}}$, and $M'_{\delta e} = -1.650 + (-3.26\times10^{-4})(-5.908) = -1.648\ \mathrm{s^{-2}}$. Write $M_{qe} = -0.2253 - 1.648K_q$. Then
$$
\omega^2 = 0.4059\,(0.2253 + 1.648K_q) + 0.7564,\qquad 2\zeta\omega = 0.2253 + 1.648K_q + 0.0751 + 0.4059 .
$$
Setting $\zeta = 0.70$ and solving (a one-variable equation, by trial or with a root finder) gives $K_q = 0.493\ \mathrm{rad\ per\ rad/s}$ (about $0.5^\circ$ of elevator per degree per second of pitch rate), with $\omega_{sp} = 1.085\ \mathrm{rad/s}$. Including $Z_{\delta e}$ in the two-state model gives $K_q = 0.488$; with that gain the full fourth-order closed-loop eigenvalues are $-0.756 \pm 0.771\mathrm{i}$ ($\omega_n = 1.080$, $\zeta = 0.700$) and $-0.00196 \pm 0.0485\mathrm{i}$ (phugoid, $\zeta = 0.040$). Sanity check: the damper roughly doubles the short-period damping and, as a by-product, raises the phugoid damping from $0.028$ to $0.040$ — just Level 1. An elevator rate of $0.5^\circ$ per $^\circ/\mathrm{s}$ is a modest authority; real dampers are limited to a few degrees so that a failure cannot produce a large upset.
:::
:::

::: widget plot
f: exp((-0.40592 - 0.22535 - 1.6485*K - 0.07512)/2*x)*(cos(sqrt(-0.40592*(-0.22535 - 1.6485*K) + 0.75645 - ((-0.40592 - 0.22535 - 1.6485*K - 0.07512)/2)^2)*x) + (-0.40592 - (-0.40592 - 0.22535 - 1.6485*K - 0.07512)/2)/sqrt(-0.40592*(-0.22535 - 1.6485*K) + 0.75645 - ((-0.40592 - 0.22535 - 1.6485*K - 0.07512)/2)^2)*sin(sqrt(-0.40592*(-0.22535 - 1.6485*K) + 0.75645 - ((-0.40592 - 0.22535 - 1.6485*K - 0.07512)/2)^2)*x))
x: 0, 15
y: -0.6, 1.1
sliders: K=0:0:0.9:0.01
hlines: 0
labels: \Delta\alpha(t)/\Delta\alpha(0)
caption: Response of the jet transport's angle of attack (normalised) to an initial disturbance, against time in seconds, in the short-period approximation with pitch-damper gain $K_q$ (`K`, rad of elevator per rad/s of pitch rate; $Z_{\delta e}$ neglected). At $K_q = 0$ the angle of attack swings about $30\,\%$ past zero and rings for over ten seconds; at $K_q \approx 0.5$ ($\zeta = 0.7$) there is a single small overshoot; at $0.9$ the response is almost dead-beat. More gain is not free: it amplifies sensor noise, uses actuator authority, and with real actuator lags eventually destabilises the loop.
:::

## The yaw damper {#sec-yaw-damper}

The Dutch roll of swept-wing jets is so lightly damped that a yaw damper is essential; swept-wing jet transports have had them since the first generation of the 1950s. The obvious law feeds yaw rate to the rudder, $\Delta\delta_r = K_r\,\Delta r$ with $K_r > 0$ (nose-right rate commands trailing-edge-left rudder, a nose-left moment). In the crude Dutch-roll approximation this simply adds $N_{\delta r}K_r$ to $N_r$.

There is a catch. In a steady turn the yaw rate is not zero — it is $r = \dot\psi\cos\phi$ ([[flight-mechanics/aircraft-equations-of-motion#ex-turn-rates]]) — so a plain yaw damper applies rudder *against* every turn, which the pilot must overpower. The cure is a **washout filter**, a high-pass filter that passes the oscillating yaw rate of the Dutch roll but blocks the steady yaw rate of a turn:
$$
\Delta\delta_r(s) = K_r\,\frac{\tau_ws}{\tau_ws + 1}\,\Delta r(s),
$$ {#eq-washout}
with a time constant $\tau_w$ of a few seconds: long enough that the Dutch-roll oscillation (period about $6\ \mathrm{s}$) passes almost unchanged, short enough that the steady yaw rate of a turn is washed out within a few seconds. In state-space form the filter adds a state $x_w$ with $\dot x_w = (r - x_w)/\tau_w$ and the command is $K_r(r - x_w)$.

::: example A yaw damper for the jet transport {#ex-yaw-damper}
For the jet transport's lateral model ([[flight-mechanics/aircraft-equations-of-motion#ex-lat-derivs]], with $Y_{\delta r} = 2.532\ \mathrm{m\,s^{-2}}$, $L_{\delta r} = 0.288\ \mathrm{s^{-2}}$ and $N_{\delta r} = -0.672\ \mathrm{s^{-2}}$ per radian of rudder), find the closed-loop modes for a plain yaw damper with $K_r = 1.0$, and for a washed-out damper with $K_r = 1.2$, $\tau_w = 3\ \mathrm{s}$. What rudder does each apply in a steady $25^\circ$-banked turn at cruise?
::: solution
*Plain damper*, $K_r = 1.0$: the closed-loop matrix $\mathbf A_{\text{lat}} + \mathbf b_{\delta r}K_r\mathbf e_r^{\mathsf T}$ has eigenvalues $-0.327 \pm 0.953\mathrm{i}$ (Dutch roll $\omega_n = 1.008$, $\zeta = 0.32$), $-1.059$ (roll) and $-0.092$ (spiral). The spiral root has moved from $-0.0034$ to $-0.092$: the damper is resisting the slow yawing of the spiral mode — and of any turn.

*Washed-out damper*, $K_r = 1.2$, $\tau_w = 3\ \mathrm{s}$ (five states): Dutch roll $\omega_n = 0.85$, $\zeta = 0.32$; the spiral root stays near $-0.0027$, close to the airframe value, and the remaining roots are the roll mode ($-1.02$) and a real root at $-0.70$ associated with the filter.

*Steady turn* at $25^\circ$ bank: $\dot\psi = g\tan\phi/u_0 = 9.807 \times 0.4663/230.15 = 0.01987\ \mathrm{rad/s}$ and $r = \dot\psi\cos\phi = 0.0180\ \mathrm{rad/s}$. The plain damper commands $\delta_r = 1.0 \times 0.0180 = 0.018\ \mathrm{rad} = 1.0^\circ$ against the turn, continuously; the washed-out damper commands zero once the turn is established (after a few $\tau_w$). Sanity check: Dutch-roll damping rose from $0.027$ to $0.32$, comfortably above the Level 1 minimum of $0.08$, and $\zeta\omega = 0.27\ \mathrm{rad/s} > 0.15$; the washout costs a little damping for a given gain, which is why the gain was raised from $1.0$ to $1.2$.
:::
:::

::: widget phaseplane
f: -0.0587*x - y
g: 1.008*x - (0.112 + 0.672*K)*y
x: -0.06, 0.06
y: -0.06, 0.06
sliders: K=0:0:2:0.05
points: 0.05, 0
nullclines: false
caption: The jet transport's Dutch roll in the two-state approximation, sideslip $\beta$ (rad, horizontal) against yaw rate $r$ (rad/s, vertical), with yaw-damper gain $K_r$ (`K`). The trajectory starts from a $0.05\ \mathrm{rad}$ sideslip. At $K = 0$ it circles many times before settling; as the gain rises the spiral tightens. (Remember from [[flight-mechanics/dynamic-modes]] that this approximation overstates the airframe's damping — the full model with roll coupling needs a somewhat higher gain for the same result.)
:::

## Augmenting stability: relaxed static stability {#sec-relaxed}

A tail sized for a healthy static margin is larger and heavier than one sized only for control, and in cruise its download costs trim drag. If the computer supplies the pitch stiffness, the aircraft can fly with a small or even negative static margin — **relaxed static stability** (RSS). Feeding back angle of attack,
$$
\Delta\delta_e = K_\alpha\,\Delta\alpha ,
$$
adds $M'_{\delta e}K_\alpha$ to $M_\alpha$: an artificial static margin.

::: example Stabilising an unstable aircraft {#ex-rss}
Suppose the jet transport's centre of gravity is moved aft until $C_{m\alpha} = +0.10\ \mathrm{rad^{-1}}$ (a static margin of $-1.8\,\%$), so $M_\alpha = +0.1375\ \mathrm{s^{-2}}$. Find the open-loop modes, and the angle-of-attack feedback gain that restores the original $M_\alpha = -0.7564\ \mathrm{s^{-2}}$.
::: solution
Open loop, the full longitudinal model has eigenvalues $-0.766$, $+0.102$ and $-0.0238 \pm 0.0761\mathrm{i}\ \mathrm{s^{-1}}$: the short-period oscillation has split into two real roots, one of them unstable, with a time to double of $\ln 2/0.102 = 6.8\ \mathrm{s}$ — a pitch divergence a pilot could perhaps hold for a while, but not fly precisely. The gain: $K_\alpha = (-0.7564 - 0.1375)/(-1.648) = 0.542$ (rad of elevator per rad of angle of attack). With $\Delta\delta_e = 0.542\,\Delta w/u_0$ the closed-loop eigenvalues are $-0.361 \pm 0.850\mathrm{i}$ and $-0.00155 \pm 0.0568\mathrm{i}$ — almost exactly the original aircraft's. Adding the pitch damper ($K_q = 0.488$) gives $-0.763 \pm 0.774\mathrm{i}$, a well-damped short period again. Sanity check: the feedback simply replaces the aerodynamic stiffness lost by moving the centre of gravity. The catch is that the aircraft now *depends* on the loop: a sensor or computer failure leaves an unstable aircraft, which is why such systems are built with multiple redundant channels.
:::
:::

The F-16 was the first production aircraft designed with relaxed static stability (at subsonic speeds) and a full-authority fly-by-wire system to provide it; RSS is used for agility in combat aircraft and, in mild form, to reduce trim drag in transports with fuel-transfer centre-of-gravity control.

::: algorithm Designing a stability augmentation loop {#alg-sas}
1. **Model.** Linearise the aircraft at the design flight condition ([[flight-mechanics/aircraft-equations-of-motion#eq-a-long]] or [[flight-mechanics/aircraft-equations-of-motion#eq-a-lat]]) and add actuator, sensor and filter dynamics as extra states.
2. **Targets.** From the handling-qualities requirements, choose target frequencies and damping ratios for the modes to be changed, and limits for the modes that must not be harmed.
3. **Loop choice.** Pick the feedback that acts most directly on the deficient mode (pitch rate to elevator for short-period damping, yaw rate through a washout to rudder for Dutch-roll damping, angle of attack to elevator for stiffness), using the approximate mode formulas to see which derivative the loop augments.
4. **Gain.** Vary the gain and compute the closed-loop eigenvalues of $\mathbf A + \mathbf B\mathbf K\mathbf C$ (a root locus); choose the gain that meets the targets with the smallest authority.
5. **Robustness.** Check gain and phase margins with actuator and sensor lags and sampling delay, and check the eigenvalues over the range of mass, centre of gravity and flight condition; schedule the gain with dynamic pressure where needed.
6. **Limits and failures.** Set the authority limit so that a runaway or a failed sensor cannot cause an unrecoverable upset; check the response with the loop saturated or disengaged.
7. **Validate** in nonlinear piloted simulation and finally in flight test.
:::

## Autopilots {#sec-autopilot}

An autopilot holds a flight condition by closing outer loops around the augmented aircraft. In pitch the usual structure is a cascade: an inner pitch-rate loop (the damper), a pitch-attitude loop around it, and an altitude or flight-path loop around that, with an **autothrottle** controlling speed. In roll and yaw: the yaw damper, a bank-angle loop through the ailerons, and a heading loop that commands bank.

::: example Pitch-attitude hold {#ex-attitude-hold}
With the pitch damper of [[#ex-pitch-damper]] engaged, a proportional attitude loop $\Delta\delta_e = K_q\Delta q + K_\theta(\Delta\theta - \theta_c)$ is added, with $K_\theta = 1.0$ (rad/rad) and the throttle fixed. Find the closed-loop poles and the steady response to a $1^\circ$ step in commanded attitude $\theta_c$.
::: solution
The closed-loop matrix $\mathbf A_{\text{long}} + \mathbf B_{\text{long}}[0,\ 0,\ K_q,\ K_\theta]$ has eigenvalues $-0.625 \pm 1.448\mathrm{i}$ ($\omega_n = 1.58\ \mathrm{rad/s}$, $\zeta = 0.40$), $-0.252$ and $-0.0148\ \mathrm{s^{-1}}$. The phugoid oscillation has gone — attitude is no longer free to exchange with speed — and has been replaced by a slow real root (time constant $68\ \mathrm{s}$). Steady state, from $\mathbf 0 = \mathbf A_{cl}\mathbf x_{ss} - \mathbf B K_\theta\theta_c$: $\Delta\theta_{ss} = 0.703^\circ$, $\Delta u_{ss} = -12.1\ \mathrm{m/s}$ and $\Delta\alpha_{ss} = 0.65^\circ$. Simulating, the attitude reaches $0.96^\circ$ after $10\ \mathrm{s}$ and then sags over several minutes to $0.70^\circ$ as the aircraft slows. Sanity check: with thrust fixed, a steady nose-up attitude can only be held at a lower speed (the climb trades kinetic energy and then settles at a speed where the drag balance permits it), and a proportional loop cannot remove the steady error. Real autopilots add integral action on the attitude error and an autothrottle to hold speed — together they make attitude hold and speed hold independent.
:::
:::

**Altitude hold** wraps another loop around attitude hold: $\theta_c = K_h(h_c - h) + \dots$, with $\dot h = u_0\Delta\theta - \Delta w$ (plus integral action). **Heading hold** commands bank angle in proportion to heading error, since in a coordinated turn $\dot\psi = g\tan\phi/u_0$. In each case the inner loop must be several times faster than the outer, so that the outer loop sees an inner loop that has "already settled" — the same bandwidth separation as in cascade control of machines ([[control-systems/pid-control]]).

::: warning Lags, limits and the sign of a gain
Three warnings for anyone designing a flight control loop. (i) **Signs**: with the conventions of this course, $M_{\delta e} < 0$ and $N_{\delta r} < 0$, so stabilising rate feedback has a *positive* gain from rate to deflection; a sign error turns a damper into a destabiliser, and checking every sign through the whole chain (sensor, computer, actuator, surface) is a standard part of ground testing. (ii) **Lags**: actuators (bandwidths of about $10$–$30\ \mathrm{rad/s}$), sensor filters, computation and sampling ([[control-systems/digital-control]]) add phase lag; a gain that is fine with ideal components can cause oscillation, and a time delay of even $0.1$–$0.2\ \mathrm{s}$ between pilot input and response degrades handling and can provoke **pilot-induced oscillation**. (iii) **Saturation**: surfaces have limited travel and rate; a loop designed linearly may lose control when the actuator hits its rate limit, as in several fly-by-wire flight-test incidents.
:::

## Fly-by-wire control laws {#sec-fbw}

With full authority over the surfaces, the control law need not move the elevator in proportion to the stick. Modern FBW laws make the stick command a *response*:

- In pitch, the stick commands a blend of **pitch rate and normal load factor** — at low speed the pilot feels a pitch-rate command, at high speed a load-factor ("g") command. Criteria such as $C^\ast$ (a weighted sum of normal acceleration and pitch rate) are used to shape the response. Releasing the stick holds the flight path: trim is automatic.
- In roll, the stick commands **roll rate**; releasing it holds the bank angle.
- **Envelope protection** limits angle of attack (so the aircraft cannot be stalled by stick input in normal operation), load factor (within the structural limits of [[flight-mechanics/manoeuvres-takeoff-landing#def-vn]]), bank angle and speed.
- **Turn coordination and yaw damping** are automatic.

The control law is a set of feedback loops like those above, with gains scheduled over the whole flight envelope, integrators to remove steady errors, command filters to shape the response, and logic for degraded modes when sensors or computers fail.

**Redundancy and integrity.** Because the aircraft cannot fly without its control system, FBW architectures use several independent computers (typically three or four channels, often with **dissimilar** hardware and software developed by separate teams to avoid common-mode errors), multiple sensors with voting and monitoring, independent electrical and hydraulic power supplies, and **reversionary laws** (from "normal" to "alternate" to "direct" in Airbus terminology) that progressively remove protections as failures accumulate. The certification standards for the software and electronic hardware (such as RTCA DO-178C and DO-254) demand evidence that each level of failure is sufficiently improbable — for catastrophic failure conditions in transport aircraft, typically of the order of $10^{-9}$ per flight hour.

::: quiz
Why does a yaw damper for a transport aircraft include a washout (high-pass) filter?
- [ ] To remove sensor noise at high frequency
- [x] So that the damper does not oppose the steady yaw rate of a coordinated turn, while still damping the Dutch-roll oscillation
- [ ] To increase the Dutch-roll natural frequency
- [ ] To stabilise the spiral mode
::: solution
In a steady turn $r = \dot\psi\cos\phi \ne 0$. Plain yaw-rate feedback would apply rudder against the turn; the washout passes the oscillatory yaw rate of the Dutch roll (period about $6\ \mathrm{s}$) but removes the steady component, so the damper is inactive in established turns. Noise filtering is a low-pass job, and the washout leaves the spiral mode close to its airframe value rather than stabilising it.
:::
:::

::: history
Lawrence Sperry demonstrated a gyroscopic stabiliser on a Curtiss flying boat at the Concours de la Sécurité en Aéroplane near Paris in June 1914, flying with his hands off the controls while his mechanic walked out on the wing — the first public demonstration of automatic stabilisation. Autopilots built on gyroscopic references became common in the 1930s, and yaw dampers became standard with the swept-wing jet transports of the 1950s. Concorde (first flight 1969) had analogue fly-by-wire signalling with a mechanical back-up. NASA's F-8 Digital Fly-By-Wire research aircraft, flown first on 25 May 1972 by Gary E. Krier at what is now the Armstrong Flight Research Center, was the first fixed-wing aircraft to fly with a digital fly-by-wire system and no mechanical back-up, using a computer derived from the Apollo guidance computer; the programme ran until 1985. The General Dynamics F-16 (first flight 1974) brought full-authority fly-by-wire and relaxed static stability into production, and the Airbus A320 (first flight 22 February 1987, entry into service with Air France in April 1988) was the first airliner with digital fly-by-wire flight controls and side-stick controllers.
:::

::: summary
- Feedback $\mathbf u = \mathbf u_p + \mathbf K\mathbf y$ moves the modes to the eigenvalues of $\mathbf A + \mathbf B\mathbf K\mathbf C$; gains are scheduled with dynamic pressure and Mach number.
- Pitch damper: $\delta_e = K_qq$ adds $M'_{\delta e}K_q$ to $M_q$; $K_q \approx 0.5$ raised the jet transport's short-period damping from $0.38$ to $0.70$.
- Yaw damper with washout $K_r\tau_ws/(\tau_ws + 1)$ damps the Dutch roll ($0.027 \to 0.32$) without opposing steady turns.
- Angle-of-attack feedback restores stiffness lost by relaxed static stability, at the price of dependence on the loop.
- Autopilots cascade outer loops (attitude, altitude, heading) around inner damping loops; proportional attitude hold leaves a steady error and a speed change unless integral action and an autothrottle are added.
- Fly-by-wire laws command responses (rate, load factor), provide envelope protection, and rely on redundant, dissimilar architectures certified to stringent probability targets.
:::

## Exercises

::: exercise Elevator command from a damper {level=1 check="1.5"}
A pitch damper has $K_q = 0.50$ (degrees of elevator per degree per second of pitch rate). What elevator deflection does it command when the pitch rate is $3^\circ/\mathrm{s}$? (Enter the deflection in degrees.)
::: solution
$\Delta\delta_e = 0.50 \times 3 = 1.5^\circ$, trailing edge down, opposing the nose-up rate.
:::
:::

::: exercise Washout corner frequency {level=1 check="0.333"}
A washout filter has $\tau_w = 3\ \mathrm{s}$. Find its corner frequency. (Enter it in rad/s, rounded to three decimal places.)
::: solution
The corner is at $\omega = 1/\tau_w = 0.333\ \mathrm{rad/s}$. The Dutch roll at about $1\ \mathrm{rad/s}$ is three times higher and passes with gain $\lvert\mathrm{i}\omega\tau_w/(\mathrm{i}\omega\tau_w + 1)\rvert = 3/\sqrt{10} = 0.95$ and a phase lead of $18^\circ$; a turn lasting a minute is effectively at zero frequency and is blocked.
:::
:::

::: exercise Rudder opposing a turn {level=1 check="0.99"}
A plain yaw damper with $K_r = 1.0$ (rad/rad/s) is fitted to an aircraft turning steadily at $\dot\psi = 0.020\ \mathrm{rad/s}$ with $\phi = 30^\circ$. What rudder does it apply? (Enter the deflection in degrees, rounded to two decimal places.)
::: solution
$r = \dot\psi\cos\phi = 0.020 \times 0.8660 = 0.01732\ \mathrm{rad/s}$, so $\delta_r = K_rr = 0.01732\ \mathrm{rad} = 0.99^\circ$, held for as long as the turn lasts and opposing it; the pilot must hold opposite rudder pressure. A washout removes it.
:::
:::

::: exercise Pitch-damper gain for a target damping {level=2 check="0.17"}
Using [[#eq-sp-damper]] with the jet transport's derivatives, find the pitch-damper gain $K_q$ that gives $\zeta_{sp} = 0.50$. (Enter $K_q$ in rad per rad/s, rounded to two decimal places.)
::: solution
Let $m = 0.2253 + 1.648K_q$. Then $\omega^2 = 0.4059m + 0.7564$ and $2\zeta\omega = m + 0.4810$. With $\zeta = 0.5$: $(m + 0.4810)^2 = 0.4059m + 0.7564$, i.e. $m^2 + 0.5561m - 0.5250 = 0$, $m = 0.4980$, so $K_q = (0.4980 - 0.2253)/1.648 = 0.165$, i.e. $0.17$ to two decimal places.
:::
:::

::: exercise Artificial static margin {level=2 check="0.044"}
For the jet transport, $M_\alpha$ changes by $-0.7564/0.55 = -1.375\ \mathrm{s^{-2}}$ per unit change of $C_{m\alpha}$, and $C_{L\alpha} = 5.5$. An angle-of-attack feedback with $K_\alpha = 0.20$ is added. By how much does it increase the effective static margin? (Enter the increase as a fraction of $\bar c$, rounded to three decimal places.)
::: solution
$\Delta M_\alpha = M'_{\delta e}K_\alpha = -1.648 \times 0.20 = -0.3297\ \mathrm{s^{-2}}$, equivalent to $\Delta C_{m\alpha} = -0.3297/1.375 = -0.2397$. The static margin is $-C_{m\alpha}/C_{L\alpha}$, so it increases by $0.2397/5.5 = 0.0436$ — i.e. $0.044$ — about $4.4\,\%$ of the mean chord.
:::
:::

::: exercise Bank angle for a heading change {level=2 check="1.32"}
A heading-hold autopilot commands $\phi_c = K_\psi(\psi_c - \psi)$ with $K_\psi = 2.0$ and a bank limit of $25^\circ$. At $230\ \mathrm{m/s}$, how long does a $90^\circ$ heading change take once the bank is established at the limit? (Enter the time in minutes, rounded to two decimal places.)
::: solution
The commanded bank is $2.0 \times 90^\circ = 180^\circ$, so the limiter holds $25^\circ$ for most of the turn. Turn rate $\dot\psi = g\tan 25^\circ/V = 9.80665 \times 0.46631/230 = 0.01988\ \mathrm{rad/s}$, so $90^\circ = 1.5708\ \mathrm{rad}$ takes $79.0\ \mathrm{s} = 1.32\ \mathrm{min}$ at the $25^\circ$ limit (the final part, where the command falls below $25^\circ$ — the last $12.5^\circ$ of heading — takes a little longer).
:::
:::

::: exercise Stability of a damper with actuator lag {level=3}
Model the short period of the jet transport with the pitch damper and a first-order actuator $\delta_e = \delta_c/(\tau_as + 1)$, $\tau_a = 0.1\ \mathrm{s}$. Write the three-state model, and explain (or compute) what happens to the closed-loop poles as $K_q$ is increased far beyond the design value.
::: solution
States $(\Delta\alpha, \Delta q, \Delta\delta_e)$: $\Delta\dot\alpha = -0.406\Delta\alpha + \Delta q$ (neglecting $Z_{\delta e}$); $\Delta\dot q = -0.726\Delta\alpha - 0.3005\Delta q - 1.648\Delta\delta_e$; $\Delta\dot\delta_e = (K_q\Delta q - \Delta\delta_e)/\tau_a$. The open-loop transfer function from $\delta_c$ to $q$ has three poles (the short-period pair and the actuator pole at $-10$) and one zero (at $s = -0.406$, from the $\alpha$ equation). With two more poles than zeros, the root locus has two asymptotes at $\pm 90^\circ$ crossing the real axis at the centroid $(-0.706 - 10 + 0.406)/2 = -5.15$: as $K_q$ grows, one branch goes to the zero and the short-period pair breaks away and heads towards the asymptotes, becoming an oscillatory "actuator mode" whose damping falls with gain. With a pure lag the system stays stable in theory (the asymptotes are in the left half-plane), but adding the sensor filter, a sampling delay or a second-order actuator brings more poles and makes the asymptotes cross into the right half-plane — instability at high gain. This is why damper gains are limited and why phase and gain margins are part of every flight-control specification.
:::
:::

::: exercise Specifying a fly-by-wire system {level=3}
You are writing the top-level requirements for the pitch axis of a fly-by-wire system for a new regional aircraft. List the requirements you would set for (a) the response to the pilot's stick, (b) envelope protection, (c) behaviour after failures, and (d) robustness, and explain how each would be verified.
::: solution
A good answer includes: (a) a commanded response type (pitch rate at low speed blending into load factor at high speed), with targets for short-period frequency and damping (from a flying-qualities standard), time delay (below about $0.1\ \mathrm{s}$), absence of overshoot in flight path, automatic trim, and stick force/displacement per $g$; verified by linear analysis, piloted simulation (with Cooper–Harper ratings) and flight test. (b) Angle-of-attack protection below the stall with margin, load-factor limits matching the V–n diagram (for example $+2.5$/$-1.0$ in clean configuration), high-speed protection below $V_D$/$M_D$, and pitch-attitude limits; verified by simulation of all edge cases and by flight test. (c) Graceful degradation: no single failure may cause loss of control; reversionary laws with clearly signalled loss of protections; failure probabilities meeting the certification targets ($10^{-9}$ per flight hour for catastrophic conditions); verified by failure-modes analysis, fault-tree analysis and iron-bird tests. (d) Stability margins (for example $6\ \mathrm{dB}$ gain and $45^\circ$ phase) over the whole envelope including variations of centre of gravity, mass, aerodynamic uncertainty, structural modes (notch filters), actuator rate limits; verified by analysis with uncertainty models, Monte Carlo simulation and ground resonance tests. Software and hardware are developed to the applicable assurance standards.
:::
:::
