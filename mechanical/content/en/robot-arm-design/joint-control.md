[[robotics/robot-control]] showed, with a rigid joint and ideal torque, why PD control with gravity compensation works and what computed-torque control adds. A real joint is not that plant. Its torque comes through a current loop with a bandwidth and a delay; its position is measured by an encoder with a resolution and sampled at a finite rate; its reducer has friction that sticks and slips and a spring that lets the link ring against the motor; and its inertia changes by a factor of several between a folded and an outstretched arm. This chapter is about controlling that joint: the **cascade** of current, velocity and position loops used in practically every servo drive, how to choose their bandwidths and tune them on the hardware, and the three additions that turn an adequate servo into a good one — **feedforward**, **gravity compensation** and **friction compensation** — and finally how to live with **joint flexibility** and resonance, with notch filters and sensible bandwidth limits. The running example is the shoulder of the arm specified in [[robot-arm-design/arm-specification]], with the motor of [[robot-arm-design/joint-actuators]] and the strain-wave reducer of [[robot-arm-design/gear-reducers]]. Classical control background — PID, Bode plots, margins, sampled-data systems — is in [[control-systems/pid-control]], [[control-systems/frequency-response]] and [[control-systems/digital-control]].

## The cascade {#sec-cascade}

::: definition Cascaded joint servo {#def-cascade}
A **cascaded** joint servo consists of three nested loops, each regulating a quantity whose reference is the output of the loop outside it:
- the **current (torque) loop**, innermost: regulates $i_q$ (and $i_d$) in the motor by field-oriented control, with a reference from the velocity loop;
- the **velocity loop**: regulates the motor speed, usually with a PI controller, with a reference from the position loop;
- the **position loop**, outermost: regulates the joint angle, usually with a proportional controller, with a reference from the trajectory generator.
Feedforward terms from the trajectory (velocity, torque) are added at the inputs of the inner loops.
:::

The arrangement is not a matter of taste. Each inner loop makes the plant seen by the next loop simpler: the current loop turns a motor with resistance, inductance and back-emf into a nearly ideal torque source; the velocity loop turns an inertia with friction and disturbances into a nearly ideal velocity source. Each loop has a natural place to impose a limit — maximum current, maximum speed — so that saturation is handled where it occurs. And the loops can be tuned one at a time, from the inside out.

The price is that each loop must be considerably faster than the one around it, otherwise the outer loop sees the inner loop's dynamics as an unmodelled lag. The usual rule is a **bandwidth separation** of about $3$ to $10$ between successive loops. Typical values in arm joints (as of 2026):

| loop | sample rate | closed-loop bandwidth | controller | runs in |
|---|---|---|---|---|
| current | 10–40 kHz (PWM-synchronous) | 1–3 kHz | PI per axis ($d$, $q$) | drive |
| velocity | 2–10 kHz | 20–200 Hz (motor side; lower for compliant joints) | PI (+ filters) | drive |
| position | 1–8 kHz | 5–30 Hz | P (+ feedforward) | drive or joint controller |
| trajectory / interpolation | 250 Hz–1 kHz | — | set-points over a fieldbus | robot controller |

The bandwidths fall by roughly a factor of ten per loop, and the position-loop bandwidth of a few hertz to a few tens of hertz is what the user perceives as the stiffness and tracking accuracy of the arm. The lower end applies to lightweight arms with compliant strain-wave joints; stiff industrial arms reach the upper end.

## The current loop {#sec-current}

Each axis of the field-oriented current controller ([[robot-arm-design/joint-actuators]]) sees, after the decoupling feedforward, the plant $1/(R + Ls)$ from voltage to current.

::: proposition PI current loop by pole–zero cancellation {#prop-current-loop}
For the plant $G(s) = 1/(R + Ls)$ and the PI controller $C(s) = K_p + K_i/s$, choosing
$$
K_p = \omega_cL,\qquad K_i = \omega_cR
$$ {#eq-current-pi}
makes the open loop $\omega_c/s$ and the closed loop the first-order system $\omega_c/(s + \omega_c)$, with bandwidth $\omega_c$ and phase margin $90°$ in the absence of delay. A pure time delay $T_d$ in the loop reduces the phase margin to $90° - \omega_cT_d$ (in degrees, with $\omega_cT_d$ converted from radians).
:::

::: proof
$C(s)G(s) = \dfrac{K_ps + K_i}{s}\cdot\dfrac{1}{Ls + R} = \dfrac{K_p(s + K_i/K_p)}{sL(s + R/L)}$. With $K_i/K_p = R/L$ the factors cancel, leaving $K_p/(Ls) = \omega_c/s$. The closed loop is $\dfrac{\omega_c/s}{1 + \omega_c/s} = \dfrac{\omega_c}{s + \omega_c}$. The open loop has magnitude $1$ at $\omega = \omega_c$ and phase $-90°$, a margin of $90°$. A delay multiplies the open loop by $e^{-sT_d}$, of unit magnitude and phase $-\omega T_d$, which does not move the crossover and subtracts $\omega_cT_d$ from the phase there.
:::

The delay is what limits the bandwidth. A digital current loop measures the current, computes, and applies the new duty cycle at the next PWM period; the measurement-to-effect delay is typically about $1.5$ sample periods (one for computation and update, half for the zero-order hold of the PWM).

::: example Tuning the shoulder's current loop {#ex-current}
The shoulder motor has phase resistance $R = 0.033\,\Omega$ and inductance $L = 0.10\,\mathrm{mH}$; the drive's PWM and current sampling run at $20\,\mathrm{kHz}$. Find the PI gains for current-loop bandwidths of $2\,\mathrm{kHz}$ and $1\,\mathrm{kHz}$, and the phase margin of each.
::: solution
Delay $T_d = 1.5/20\,000 = 75\,\mathrm{\mu s}$.

$2\,\mathrm{kHz}$: $\omega_c = 12\,566\,\mathrm{rad/s}$; $K_p = 12\,566\times1.0\times10^{-4} = 1.26\,\mathrm{V/A}$, $K_i = 12\,566\times0.033 = 415\,\mathrm{V/(A\,s)}$. Phase lost to delay $\omega_cT_d = 0.942\,\mathrm{rad} = 54°$: margin $36°$ — too little; the current would overshoot and ring.

$1\,\mathrm{kHz}$: $K_p = 0.628\,\mathrm{V/A}$, $K_i = 207\,\mathrm{V/(A\,s)}$; delay costs $27°$, margin $63°$ — a well-damped loop.

*Rule of thumb*: with $1.5$ periods of delay, a current-loop bandwidth of about $1/20$ of the PWM frequency gives a comfortable margin. The $1\,\mathrm{kHz}$ loop is still twenty times faster than the velocity loop designed below, so the velocity loop may treat torque as instantaneous.
:::
:::

Two practical points. The gains depend on $L$ and $R$, which vary: $L$ falls at high current as the iron saturates, and $R$ rises by $40\,\%$ between a cold and a hot winding. Pole–zero cancellation is therefore approximate, and drives either schedule the gains with current and temperature or accept some loss of margin. And the current loop must be tuned with the voltage limit in mind: when the back-emf uses up the bus voltage ([[robot-arm-design/joint-actuators]]), the current loop saturates and its integrators must be stopped from winding up.

## The velocity loop {#sec-velocity}

With an ideal torque source, the mechanical plant seen from the motor torque $T_m$ to the motor speed $\omega_m$ is, for a rigid joint, the total inertia referred to the motor:
$$
J_{\text{tot}} = J_m + \frac{J_L}{N^2},
$$
plus friction. For the shoulder with the arm outstretched, $J_{\text{tot}} = 1.2\times10^{-4} + 7.03/100^2 = 8.23\times10^{-4}\,\mathrm{kg\,m^2}$; with the arm folded and unloaded, $J_L$ may drop to a fifth, and $J_{\text{tot}}$ to about $2.6\times10^{-4}$. The velocity loop must work across that range.

A PI velocity controller $T_m^* = K_v\bigl(1 + \omega_i/s\bigr)(\omega_m^* - \omega_m)$ on the rigid plant $1/(J_{\text{tot}}s)$ gives the open loop
$$
L(s) = \frac{K_v}{J_{\text{tot}}s}\left(1 + \frac{\omega_i}{s}\right),
$$ {#eq-velocity-loop}
which crosses unity near $\omega_v = K_v/J_{\text{tot}}$ when $\omega_i \ll \omega_v$. The integral corner $\omega_i$ is placed a factor of about $4$ below the crossover (losing about $14°$ of phase there) to remove steady disturbances — above all gravity and friction — without eroding the margin.

**Velocity measurement.** The velocity is not measured; it is computed from encoder positions by differencing, $\hat\omega = \Delta\theta/T_s$, which quantises it to steps of one count per sample period: a 17-bit motor encoder sampled at $4\,\mathrm{kHz}$ gives steps of $2\pi/2^{17}\times4000 = 0.19\,\mathrm{rad/s}$ at the motor. High velocity gain amplifies this quantisation into torque noise and audible hiss, so velocity estimates are filtered (or obtained from an observer), and the filter's phase lag joins the delay budget. High-resolution motor encoders matter as much for the velocity loop as for position.

## Joint flexibility and resonance {#sec-flexibility}

The rigid model breaks down above the joint's torsional resonance. The reducer and the joint structure act as a spring between the motor and the link ([[robot-arm-design/gear-reducers]]), and the velocity loop measures the motor, not the link.

::: proposition The two-mass joint seen from the motor {#prop-two-mass}
Let the motor inertia $J_m$ be connected through a reducer of ratio $N$ and torsional stiffness $k$ (at the output) to a link of inertia $J_L$, with a damping $c$ in parallel with the spring. Referred to the motor side ($J_L' = J_L/N^2$, $k' = k/N^2$, $c' = c/N^2$), the transfer function from motor torque to motor speed is
$$
\frac{\omega_m}{T_m}(s) = \frac{J_L's^2 + c's + k'}{s\,\bigl[J_mJ_L's^2 + (J_m + J_L')(c's + k')\bigr]}.
$$ {#eq-two-mass}
It has an **anti-resonance** (a pair of lightly damped zeros) at $\omega_a = \sqrt{k'/J_L'} = \sqrt{k/J_L}$ and a **resonance** (a pair of lightly damped poles) at $\omega_r = \sqrt{k'(1/J_m + 1/J_L')} = \omega_a\sqrt{1 + r}$, where $r = J_L'/J_m$ is the **inertia ratio**. Relative to the rigid model $1/(J_{\text{tot}}s)$, the gain is unchanged well below $\omega_a$ and is $1 + r$ times higher well above $\omega_r$.
:::

::: proof
Equations of motion on the motor side, with $\theta_m$ and $\theta_L'$ the motor angle and the link angle times $N$: $J_m\ddot\theta_m = T_m - k'(\theta_m - \theta_L') - c'(\dot\theta_m - \dot\theta_L')$ and $J_L'\ddot\theta_L' = k'(\theta_m - \theta_L') + c'(\dot\theta_m - \dot\theta_L')$. In Laplace form, the second gives $\theta_L' = \dfrac{c's + k'}{J_L's^2 + c's + k'}\theta_m$. Substituting in the first: $T_m = \theta_m\left[J_ms^2 + (c's + k')\dfrac{J_L's^2}{J_L's^2 + c's + k'}\right]$, so $\dfrac{\theta_m}{T_m} = \dfrac{J_L's^2 + c's + k'}{s^2[J_mJ_L's^2 + (J_m + J_L')(c's + k')]}$ and $\omega_m = s\theta_m$ gives [[#eq-two-mass]]. With $c' = 0$ the numerator vanishes at $s^2 = -k'/J_L'$ and the bracket at $s^2 = -k'(J_m + J_L')/(J_mJ_L')$, which are $\omega_a^2$ and $\omega_r^2$; their ratio is $(J_m + J_L')/J_m = 1 + r$. As $s \to 0$ the function tends to $1/[(J_m + J_L')s]$, the rigid model; as $s \to \infty$ it tends to $1/(J_ms)$, which is $(J_m + J_L')/J_m = 1 + r$ times larger.
:::

Physically: at low frequency motor and link move together. At $\omega_a$ the link swings on the spring in antiphase with almost no motor motion — the motor encoder sees nothing while the link oscillates — and above $\omega_r$ the spring isolates the link, so the motor sees only its own inertia. For the shoulder, $k = 7.8\times10^4\,\mathrm{N\,m/rad}$ and $J_L = 7.03\,\mathrm{kg\,m^2}$ give $f_a = 16.8\,\mathrm{Hz}$; with $r = 0.703/0.12 = 5.86$, $f_r = 16.8\sqrt{6.86} = 43.9\,\mathrm{Hz}$.

::: widget plot
title: Motor-side response of a flexible joint
f: 20*log10(sqrt((1+r)^2*(((2*pi*fa)^2 - (2*pi*x)^2)^2 + (2*z*(2*pi*fa)*(2*pi*x))^2)/(((1+r)*(2*pi*fa)^2 - (2*pi*x)^2)^2 + ((1+r)*2*z*(2*pi*fa)*(2*pi*x))^2))); 20*log10(1 + r) + 0*x
x: 1, 120
y: -30, 40
sliders: r=5.86:0.2:12:0.1; fa=16.8:5:40:0.2; z=0.05:0.01:0.3:0.01
labels: \lvert G/G_{\text{rigid}}\rvert\ (\mathrm{dB}); 20\log_{10}(1+r)
caption: Gain of the flexible joint [[#eq-two-mass]] divided by the rigid-body model $1/(J_{\text{tot}}s)$, in dB, against frequency in Hz, for inertia ratio $r = J_L/(N^2J_m)$, anti-resonance $f_a$ and damping ratio $z$. Starting values are those of the shoulder. Below $f_a$ the rigid model is right (0 dB); the dip at $f_a$ is the anti-resonance, the peak at $f_r = f_a\sqrt{1+r}$ the resonance; above it the gain settles $1+r$ times (here 16.7 dB) above the rigid model. Reduce $r$ (a heavier motor, or a folded arm) and the two features move together and shrink; reduce the damping and they sharpen.
:::

Three consequences shape the tuning.

1. **The gain margin shrinks by the factor $1 + r$.** A velocity loop designed on the rigid model has its true high-frequency crossover at $K_v/J_m$ rather than $K_v/J_{\text{tot}}$, $1 + r$ times higher, where delays and filters cost much more phase. A large inertia ratio — a light motor through a high ratio driving a heavy outstretched arm — is the classic cause of a joint that cannot be tuned stiff. Rules of thumb in servo practice put the comfortable range at $r$ below about $5$ to $10$.
2. **The load is controlled only below the anti-resonance.** Above $\omega_a$ the motor and link no longer move together, so a velocity loop whose bandwidth exceeds $\omega_a$ controls the motor tightly while the link rings. Practical velocity-loop bandwidths for compliant joints are therefore kept at or below $\omega_a$, and the position-loop bandwidth a factor of $3$ or more below that.
3. **Every other resonance needs checking too.** Couplings, motor mounts, the link's bending modes and the base all add modes. A mode above the velocity crossover still causes oscillation if its resonance peak lifts the loop gain above unity where the phase is poor; that is what **notch filters** are for.

::: definition Notch filter {#def-notch}
A second-order **notch filter** centred at $\omega_n$ is
$$
F(s) = \frac{s^2 + 2\zeta_z\omega_ns + \omega_n^2}{s^2 + 2\zeta_p\omega_ns + \omega_n^2},\qquad \zeta_z < \zeta_p ,
$$ {#eq-notch}
with unit gain far from $\omega_n$, a depth $\lvert F(j\omega_n)\rvert = \zeta_z/\zeta_p$, and a width that grows with $\zeta_p$. It is placed in series with the velocity controller to cancel a resonance peak of the plant. It adds phase lag below $\omega_n$ and phase lead above it.
:::

::: example Velocity loop and notch for the shoulder {#ex-velocity}
Design the shoulder's PI velocity loop for a rigid-model bandwidth of $15\,\mathrm{Hz}$ (just below $f_a = 16.8\,\mathrm{Hz}$) with $J_{\text{tot}} = 8.23\times10^{-4}\,\mathrm{kg\,m^2}$. Find the true high-frequency crossover. A frequency sweep then shows a second, motor-mount resonance at $380\,\mathrm{Hz}$ with a peak $15\,\mathrm{dB}$ above the rigid line. Will the loop oscillate there if the velocity loop runs at $4\,\mathrm{kHz}$ with $375\,\mathrm{\mu s}$ of total delay? Design a notch to suppress it and find its cost in phase at the crossover.
::: solution
*Gains*: $\omega_v = 2\pi\times15 = 94.2\,\mathrm{rad/s}$, $K_v = \omega_vJ_{\text{tot}} = 0.0776\,\mathrm{N\,m\,s/rad}$ (motor side), $\omega_i = \omega_v/4 = 23.6\,\mathrm{rad/s}$.

*True crossover*: above $f_r = 43.9\,\mathrm{Hz}$ the plant is $1/(J_ms)$, so the open loop crosses unity at $K_v/J_m = 0.0776/1.2\times10^{-4} = 647\,\mathrm{rad/s} = 103\,\mathrm{Hz}$. There the delay costs $647\times375\times10^{-6} = 0.243\,\mathrm{rad} = 14°$ and the PI's integral term about $2°$ — the margin is still good, but the loop's crossover is seven times higher than the design figure, which is why noise and quantisation are worse than the rigid design predicts.

*The 380 Hz mode*: on the high-frequency line the loop gain at $380\,\mathrm{Hz}$ is $103/380 = 0.27$, i.e. $-11.3\,\mathrm{dB}$; the resonance peak adds $15\,\mathrm{dB}$, giving $+3.7\,\mathrm{dB}$ — above unity. The phase there is about $-90°$ from the integrator-like plant, $-51°$ from the delay ($2\pi\times380\times375\times10^{-6}\,\mathrm{rad}$) and up to $-180°$ more through the resonance itself: the loop will very likely oscillate at about $380\,\mathrm{Hz}$ — heard as a whistle from the joint.

*Notch*: centre $f_n = 380\,\mathrm{Hz}$, $\zeta_z = 0.05$, $\zeta_p = 0.5$: depth $0.05/0.5 = 0.1$ ($-20\,\mathrm{dB}$), bringing the peak to $3.7 - 20 = -16.3\,\mathrm{dB}$. Its cost at the $103\,\mathrm{Hz}$ crossover, from [[#eq-notch]] with $s = j2\pi\times103$: magnitude $-0.35\,\mathrm{dB}$ and phase $-14.6°$. The total phase lag at crossover rises to about $31°$, still leaving a margin near $60°$.

*Caveat*: a structural mode's frequency moves with the arm's pose and payload. A notch narrower than that variation is useless in other poses; either the notch is made wider (larger $\zeta_p$, more phase cost), scheduled with pose, or the mode is removed mechanically (a stiffer mount).
:::
:::

## The position loop and feedforward {#sec-position}

With a velocity loop of bandwidth $\omega_v$, the position loop sees approximately an integrator: commanded velocity in, position out. A proportional controller $\omega^* = K_{pp}(q_d - q)$ then gives a first-order closed loop with bandwidth $K_{pp}$, which must be well below $\omega_v$ (factor $3$ to $5$).

::: proposition Following error of a proportional position loop {#prop-following}
If the velocity loop is ideal and the position loop is $\dot q = K_{pp}(q_d - q) + \dot q_{ff}$, then for a reference moving at constant velocity $v$:
- without feedforward ($\dot q_{ff} = 0$) the steady following error is $e = q_d - q = v/K_{pp}$;
- with velocity feedforward $\dot q_{ff} = \dot q_d$ the error decays to zero.
:::

::: proof
The error obeys $\dot e = \dot q_d - \dot q = \dot q_d - \dot q_{ff} - K_{pp}e$. Without feedforward and with $\dot q_d = v$: $\dot e = v - K_{pp}e$, whose steady state is $e = v/K_{pp}$. With $\dot q_{ff} = \dot q_d$: $\dot e = -K_{pp}e$, so $e(t) = e(0)e^{-K_{pp}t} \to 0$.
:::

With $K_{pp} = 30\,\mathrm{s^{-1}}$ (bandwidth $4.8\,\mathrm{Hz}$) and the shoulder moving at $3.14\,\mathrm{rad/s}$, the following error without feedforward would be $3.14/30 = 0.105\,\mathrm{rad} = 6°$ — $94\,\mathrm{mm}$ at the tool. Feedback alone is hopeless for tracking a fast path; feedback is there to correct errors, and **feedforward** does the work:

- **Velocity feedforward**: add $\dot q_d$ (times $N$ for the motor side) to the velocity reference.
- **Torque (acceleration) feedforward**: add the torque the trajectory needs, computed from the arm model, to the current reference: $\boldsymbol\tau_{ff} = M(\mathbf q_d)\ddot{\mathbf q}_d + C(\mathbf q_d, \dot{\mathbf q}_d)\dot{\mathbf q}_d + \mathbf g(\mathbf q_d) + \boldsymbol\tau_f(\dot{\mathbf q}_d)$ — the computed-torque law of [[robotics/robot-control]] used as a feedforward, so that the velocity loop's integrator does not have to build up the acceleration torque from an error. Even a crude version (only the diagonal inertia, $m_{kk}\ddot q_{d,k}$) removes most of the error during acceleration.

The feedforward needs a smooth trajectory — at least continuous acceleration, preferably bounded jerk ([[robotics/trajectory-planning]]) — because steps in the commanded acceleration become steps in torque that excite the joint resonance.

**Which encoder closes the position loop?** If the position loop uses the motor encoder, it is fast and collocated but blind to reducer twist and transmission error. If it uses the output encoder of a dual-encoder joint ([[robot-arm-design/joint-actuators]]), it controls the link angle the user cares about, but the loop now spans the compliant reducer (non-collocated), and its bandwidth must stay well below $\omega_a$ to remain stable. A common compromise: velocity loop on the motor encoder, position loop on the motor encoder plus a slowly filtered correction equal to the difference between the two encoders.

## Gravity compensation {#sec-gravity}

Gravity is a large, slowly varying, configuration-dependent torque. Without a model, the velocity loop's integrator must supply it, which works in steady state but has two bad effects: during fast moves the integrator lags behind the changing gravity torque, and at power-up — or whenever the brake releases — the arm drops until the integrator has wound up.

**Gravity compensation** adds $\mathbf g(\mathbf q)$, computed from the arm's mass model, directly to the torque command ([[robotics/robot-control]] proves that PD plus gravity compensation is globally stable for a rigid arm). Its accuracy depends on the payload being known: a payload mass error $\Delta m$ at distance $d$ leaves a torque error $\Delta m\,g\,d$ for the integrator to remove. Arms therefore let the user enter the payload and its centre of mass, or estimate them from joint torques in a few test poses.

::: example The drop on brake release {#ex-drop}
The shoulder runs with $K_v = 0.0776\,\mathrm{N\,m\,s/rad}$ and $K_{pp} = 30\,\mathrm{s^{-1}}$ (both on the motor side, $N = 100$). With the arm outstretched (gravity torque $95.2\,\mathrm{N\,m}$), the brake is released. (a) Without gravity compensation, how far does the tool, $0.9\,\mathrm m$ out, sag before the integrator takes over? (b) With gravity compensation but a payload mass entered $1\,\mathrm{kg}$ too low?
::: solution
Before the integrator acts, the cascade behaves like a spring. A motor position error $e_m$ produces a velocity command $K_{pp}e_m$ and, at rest, a torque $K_vK_{pp}e_m$: the motor-side stiffness is $K_vK_{pp} = 0.0776\times30 = 2.33\,\mathrm{N\,m/rad}$. At the joint, a joint error $e$ is a motor error $Ne$, and the motor torque is multiplied by $N$, so the joint stiffness is $N^2K_vK_{pp} = 10^4\times2.33 = 2.33\times10^4\,\mathrm{N\,m/rad}$.

(a) Gravity torque $95.2\,\mathrm{N\,m}$ gives $e = 95.2/2.33\times10^4 = 4.1\,\mathrm{mrad}$, a sag of $0.9\times4.1 = 3.7\,\mathrm{mm}$ at the tool, recovered by the integrator over a few times $1/\omega_i = 42\,\mathrm{ms}$ — a visible dip, and a hazard if the tool is close to a part. (In practice the drive also pre-loads the torque before opening the brake, which is a crude form of the same compensation.)

(b) The torque error is $1\times9.81\times0.9 = 8.8\,\mathrm{N\,m}$, a transient sag of $0.38\,\mathrm{mrad}$, $0.34\,\mathrm{mm}$ at the tool: an order of magnitude better, and it shows why payload identification matters.

*Sanity check*: a joint stiffness of $2.3\times10^4\,\mathrm{N\,m/rad}$ from the servo is less than a third of the reducer's $7.8\times10^4$ — at low frequency, the servo, not the gearbox, is the softest spring until the integrator acts.
:::
:::

## Friction and its compensation {#sec-friction}

Friction in a geared joint comes mainly from the reducer (tooth contacts, wave-generator bearing) and the seals and bearings. It is large — in strain-wave joints often several per cent to more than ten per cent of rated torque — and it varies with speed, load, temperature and wear.

::: definition Static friction models {#def-friction}
The friction torque $\tau_f$ opposing a joint moving at speed $v$ is modelled, in increasing detail, as
- **Coulomb**: $\tau_f = \tau_c\,\sgn(v)$, a constant magnitude opposing motion;
- **Coulomb plus viscous**: $\tau_f = \tau_c\,\sgn(v) + b\,v$;
- **Stribeck**: $\tau_f = \bigl[\tau_c + (\tau_s - \tau_c)\,e^{-(\lvert v\rvert/v_s)^\delta}\bigr]\sgn(v) + b\,v$, where $\tau_s > \tau_c$ is the static (breakaway) friction, $v_s$ the Stribeck velocity at which friction falls from $\tau_s$ towards $\tau_c$, and $\delta$ a shape exponent (often $1$ or $2$).
At $v = 0$ the friction torque takes whatever value in $[-\tau_s, \tau_s]$ balances the applied torque (sticking). Dynamic models such as the LuGre model add an internal state to describe pre-sliding displacement and hysteresis.
:::

::: widget plot
title: Friction models of a joint
f: (tc + (ts - tc)*exp(-(abs(x)/vs)^2))*sign(x) + b*x; tc*sign(x) + b*x
x: -1, 1
y: -20, 20
sliders: tc=6:0:15:0.5; ts=9:0:20:0.5; vs=0.05:0.005:0.3:0.005; b=4:0:20:0.5
labels: \text{Stribeck}; \text{Coulomb + viscous}
caption: Joint friction torque (N·m) against joint speed (rad/s) for the Stribeck model ($\delta = 2$) and the simpler Coulomb-plus-viscous model. The Stribeck curve has a falling region at low speed: in it, friction *decreases* as speed increases, which acts as negative damping and causes stick–slip. Raise $t_s$ above $t_c$ to deepen the dip; widen $v_s$ to stretch it. The vertical jump at zero speed is what a controller must cross at every reversal.
:::

Friction harms a joint servo in three characteristic ways:

- **Stick–slip** at low speed: in the falling part of the Stribeck curve the joint sticks, torque builds until it breaks away, it lurches forward, slows and sticks again. The tool moves in jerks along a slow path.
- **Hunting** (limit cycling) around a set-point: integral action pushes the joint past the target after it breaks away, then pushes it back, indefinitely.
- **Reversal errors** (quadrant glitches): when a joint reverses, friction jumps from $+\tau_c$ to $-\tau_c$, and until the integrator has swung through $2\tau_c$ the joint lags. On a circle drawn by the tool, each place where a joint reverses shows a small bump.

**Compensation** adds an estimate $\hat\tau_f$ to the torque feedforward. Using the *commanded* speed $\dot q_d$, not the measured one, avoids feeding noise back; replacing $\sgn(v)$ by a smooth function such as $\tanh(v/\varepsilon)$ avoids chattering at zero. Because the friction varies with temperature and load, the model is identified per joint (run the joint at a series of constant speeds in both directions and record the torque), often at several temperatures, and the residual is left to the integrator or to a **disturbance observer** that estimates the unknown torque from the difference between the commanded torque and the torque implied by the measured acceleration.

::: example The reversal error at the shoulder {#ex-friction}
The shoulder has Coulomb friction $\tau_c = 6\,\mathrm{N\,m}$ at the joint, and the cascade's joint stiffness before integral action is $2.33\times10^4\,\mathrm{N\,m/rad}$ ([[#ex-drop]]). Estimate the transient position error at the tool ($0.9\,\mathrm m$) when the joint reverses, (a) without friction compensation, (b) with a model that is $80\,\%$ accurate.
::: solution
(a) At reversal the friction torque changes by $2\tau_c = 12\,\mathrm{N\,m}$. Until the integrator has changed its output by the same amount, the proportional part must supply it, so the joint error peaks at about $12/2.33\times10^4 = 0.52\,\mathrm{mrad}$: $0.46\,\mathrm{mm}$ at the tool — ten times the repeatability.

(b) The feedforward supplies $80\,\%$ of the jump; the remaining $2.4\,\mathrm{N\,m}$ gives $0.10\,\mathrm{mrad}$, $0.09\,\mathrm{mm}$.

*Interpretation*: friction compensation is worth an order of magnitude in path accuracy at reversals, and the quality of the friction model, not the feedback gain, sets the result. Stiffer feedback would help too, but it is limited by the resonances discussed above.
:::
:::

::: warning Tuning in one pose and running in another
A joint tuned with the arm folded and unloaded (low inertia, low inertia ratio, high resonance frequencies) can oscillate with the arm outstretched and loaded (high inertia, high ratio, lower resonance) — and a joint tuned outstretched will be sluggish and over-damped when folded. Gains must be checked at the extremes of inertia: at minimum and maximum $J_L$, with and without payload, and at low and high temperature (friction, motor resistance). Where the range is too wide for one set of gains, schedule them with the configuration — the joint inertia $m_{kk}(\mathbf q)$ is available from the arm model — or normalise the velocity-loop gain by the current inertia estimate.
:::

## Sample rates and delays {#sec-sampling}

Each digital loop contributes delay: about half a sample period for the zero-order hold, plus computation and communication. A delay $T_d$ costs phase $\omega T_d$ at frequency $\omega$, so at a crossover $\omega_c$ it costs $360°\,f_cT_d$. To keep this below about $20°$, the total delay must be less than about $1/(18f_c)$, which with $1.5$ to $2$ periods of delay requires sample rates of roughly $20$ to $40$ times the crossover frequency. That is the origin of the rates in the table at the start of the chapter.

The trajectory generator runs slower, typically at $250\,\mathrm{Hz}$ to $1\,\mathrm{kHz}$ ([[robot-arm-design/software-stack]]), and sends set-points over a fieldbus such as EtherCAT. The drive must **interpolate** between them (linearly or with cubic splines) at its position-loop rate; otherwise the position reference is a staircase at the fieldbus rate, which excites the joint at that frequency and its harmonics. Any jitter in the arrival of set-points becomes a position error equal to the velocity times the timing error, which is why the fieldbus cycle is synchronised to the drives' clocks (EtherCAT's distributed clocks serve exactly this purpose).

## A tuning procedure {#sec-procedure}

::: algorithm Commissioning a joint servo {#alg-tuning}
1. **Current loop.** Measure $R$ and $L$ (the drive's auto-tune applies voltage steps), set the PI by [[#eq-current-pi]] at about $1/20$ of the PWM frequency, and check a current step: rise time about $0.35/f_c$, small overshoot.
2. **Identify the mechanics.** With the arm in its stiffest-to-control pose (largest inertia), excite the joint with a chirp or random torque in closed velocity loop at low gain and record the motor-side frequency response. Read off $J_{\text{tot}}$ from the low-frequency slope, $J_m$ from the high-frequency slope, $f_a$, $f_r$ and any higher modes. Repeat in the folded pose.
3. **Velocity loop.** Set $K_v$ for a rigid-model bandwidth at or below $f_a$, $\omega_i \approx \omega_v/4$. Add notch filters for modes whose peaks approach unity loop gain; add a low-pass filter on the velocity estimate if quantisation noise is audible. Check phase and gain margins (aim for about $45°$ and $6\,\mathrm{dB}$ or more) in both poses.
4. **Position loop.** Set $K_{pp}$ about $3$ to $5$ times below the velocity bandwidth (in rad/s), add velocity feedforward ($100\,\%$), then torque feedforward from the model.
5. **Gravity and friction.** Identify the mass model (from joint torques in many static poses) and the friction curve (constant-speed runs in both directions); add both to the feedforward.
6. **Validate.** Run the real trajectories at full speed and payload; measure following error, settling time at the target, reversal errors on a circle test and the output-encoder error; repeat cold and warm. Retune only the step that the measurements point to.
:::

::: quiz
After tuning, a shoulder joint whistles at about 400 Hz only when the arm is folded and unloaded. Which change is most appropriate?
- [ ] Increase the position-loop gain
- [ ] Remove the velocity feedforward
- [x] Add or retune a notch filter at the whistle frequency, checking the outstretched pose too
- [ ] Increase the integral gain of the velocity loop
::: solution
A high-pitched tone at a fixed frequency is a resonance that the velocity loop is driving into oscillation. In the folded pose the joint inertia is lower, so the loop gain $K_v/J$ is higher and the resonance peak can reach unity gain. A notch at that frequency (or gain scheduling with the pose) removes it; the position gain, feedforward and integral gain act at much lower frequencies.
:::
:::

::: history
The proportional–integral–derivative law was analysed by Nicolas Minorsky in 1922 for the automatic steering of ships, and the first widely used tuning rules were published by John Ziegler and Nathaniel Nichols in 1942. The cascaded current–speed–position structure grew out of the control of electric drives in machine tools and rolling mills in the mid-twentieth century and became universal with digital servo drives in the 1980s. Friction in lubricated contacts was mapped against speed by Richard Stribeck in experiments on journal and rolling bearings published in 1902; the systematic treatment of friction compensation in machines came much later, notably in Brian Armstrong-Hélouvry's survey and book of the early 1990s and in the LuGre dynamic friction model of Canudas de Wit and colleagues (1995). Mark Spong's 1987 model of the elastic-joint robot, with a motor and a link coupled by a spring, made joint flexibility a standard part of robot control.
:::

## Where this leads {#sec-leads}

The joint servos are now a set of well-behaved position (or torque) actuators that accept set-points at a few hundred to a thousand hertz. [[robot-arm-design/software-stack]] builds the layers above them — the robot description, ROS 2 control, motion planning — and [[robot-arm-design/calibration]] makes the set-points they receive correspond to where the tool really is.

::: summary
- Joint servos are cascades: current (1–3 kHz bandwidth) inside velocity (tens to a couple of hundred Hz) inside position (a few to 30 Hz), with a 3–10× separation between loops. Tune from the inside out.
- Current loop: PI with $K_p = \omega_cL$, $K_i = \omega_cR$; delay ($\approx 1.5$ PWM periods) limits $\omega_c$ to about $1/20$ of the PWM frequency.
- Velocity loop: $K_v = \omega_vJ_{\text{tot}}$, $\omega_i \approx \omega_v/4$; velocity from encoder differences is quantised and must be filtered.
- A flexible joint has an anti-resonance $\omega_a = \sqrt{k/J_L}$ and a resonance $\omega_r = \omega_a\sqrt{1 + r}$; above $\omega_r$ the motor sees only its own inertia, so the loop gain is $1 + r$ times the rigid design. Keep the velocity bandwidth at or below $\omega_a$ and $r$ moderate; notch higher modes.
- Proportional position control lags by $v/K_{pp}$; velocity and torque feedforward from the trajectory and the model do the tracking.
- Gravity compensation removes the sag on brake release and during motion; it needs the payload.
- Friction (Coulomb, viscous, Stribeck) causes stick–slip, hunting and reversal errors; compensate with a model driven by the commanded speed, and leave the residual to the integrator or an observer.
- Check every tuning at the extremes of inertia, payload and temperature; sample at 20–40× the crossover and interpolate set-points.
:::

## Exercises

::: exercise Current-loop gains {level=1 check="0.942"}
A motor phase has $R = 0.15\,\Omega$ and $L = 0.30\,\mathrm{mH}$. Find $K_p$ for a current-loop bandwidth of $500\,\mathrm{Hz}$ by pole–zero cancellation. (Enter $K_p$ in V/A, to three decimal places.)
::: solution
$\omega_c = 2\pi\times500 = 3142\,\mathrm{rad/s}$; $K_p = \omega_cL = 3142\times3.0\times10^{-4} = 0.942\,\mathrm{V/A}$; $K_i = \omega_cR = 471\,\mathrm{V/(A\,s)}$.
:::
:::

::: exercise Following error {level=1 check="0.04"}
A joint with a proportional position loop $K_{pp} = 50\,\mathrm{s^{-1}}$ and no feedforward follows a ramp at $2.0\,\mathrm{rad/s}$. What is its steady following error? (Enter the error in rad.)
::: solution
$e = v/K_{pp} = 2.0/50 = 0.04\,\mathrm{rad} = 2.3°$. Velocity feedforward removes it.
:::
:::

::: exercise Resonance from anti-resonance {level=1 check="54.2"}
A joint's motor-side frequency response shows an anti-resonance at $18\,\mathrm{Hz}$, and the inertia ratio is $r = 8.06$. At what frequency is the resonance? (Enter it in Hz, to one decimal place.)
::: solution
$f_r = f_a\sqrt{1 + r} = 18\times\sqrt{9.06} = 18\times3.010 = 54.2\,\mathrm{Hz}$.
:::
:::

::: exercise Phase margin with delay {level=2 check="48"}
A current loop designed by pole–zero cancellation has bandwidth $1.25\,\mathrm{kHz}$; the PWM runs at $16\,\mathrm{kHz}$ and the delay is $1.5$ PWM periods. Find the phase margin. (Enter it in degrees, to the nearest degree.)
::: solution
$T_d = 1.5/16\,000 = 93.75\,\mathrm{\mu s}$; $\omega_cT_d = 2\pi\times1250\times93.75\times10^{-6} = 0.736\,\mathrm{rad} = 42.2°$; margin $90 - 42.2 = 47.8 \approx 48°$. If the drive applied its new duty cycle a full period later (delay $2.5$ periods), the lag would be $70.3°$ and the margin under $20°$: the update scheme matters as much as the PWM frequency.
:::
:::

::: exercise Servo stiffness {level=2 check="1.5"}
A joint with ratio $N = 120$ has motor-side gains $K_v = 0.05\,\mathrm{N\,m\,s/rad}$ and $K_{pp} = 40\,\mathrm{s^{-1}}$. A torque disturbance of $43.2\,\mathrm{N\,m}$ is applied at the joint. What is the transient joint error before the integrator acts? (Enter it in mrad.)
::: solution
Joint stiffness $N^2K_vK_{pp} = 14\,400\times0.05\times40 = 28\,800\,\mathrm{N\,m/rad}$; error $43.2/28\,800 = 1.5\times10^{-3}\,\mathrm{rad} = 1.5\,\mathrm{mrad}$.
:::
:::

::: exercise Depth of a notch {level=2 check="-26.0"}
A notch filter has $\zeta_z = 0.02$ and $\zeta_p = 0.4$. What is its depth at the centre frequency? (Enter it in dB, to one decimal place.)
::: solution
$20\log_{10}(0.02/0.4) = 20\log_{10}0.05 = -26.0\,\mathrm{dB}$. Its width is set mainly by $\zeta_p = 0.4$, which also sets the phase lag it adds below the centre.
:::
:::

::: exercise Friction identification {level=2}
A joint is run at constant speeds and the motor torque is recorded (converted to joint torque): $+0.1\,\mathrm{rad/s}$: $7.2\,\mathrm{N\,m}$; $+0.5$: $8.0$; $+1.0$: $9.0$; and the mirror values for negative speeds. Fit a Coulomb-plus-viscous model from the two higher speeds and comment on the point at $0.1\,\mathrm{rad/s}$.
::: solution
From $0.5$ and $1.0\,\mathrm{rad/s}$: $b = (9.0 - 8.0)/0.5 = 2.0\,\mathrm{N\,m\,s/rad}$, $\tau_c = 8.0 - 2.0\times0.5 = 7.0\,\mathrm{N\,m}$. The model predicts $7.2\,\mathrm{N\,m}$ at $0.1\,\mathrm{rad/s}$, matching the measurement, so there is no clear Stribeck dip at this speed; a test at lower speeds (say $0.005$–$0.05\,\mathrm{rad/s}$) and a breakaway test from rest would be needed to find $\tau_s$ and $v_s$. Gravity must be removed from the data (run at a pose where it is constant and average both directions, or use a horizontal axis).
:::
:::

::: exercise Bandwidth limit from the inertia ratio {level=3}
Using [[#eq-two-mass]], show that if the velocity loop is designed on the rigid model with crossover $\omega_v$ and $\omega_v \ll \omega_a$, its open-loop gain at high frequency ($\omega \gg \omega_r$) is $(1 + r)\omega_v/\omega$, and hence that a delay $T_d$ limits the rigid-model bandwidth to roughly $\omega_v < \varphi_{\max}/[(1 + r)T_d]$, where $\varphi_{\max}$ is the phase (in radians) that may be lost to delay. Evaluate for $r = 5.86$, $T_d = 375\,\mathrm{\mu s}$, $\varphi_{\max} = 30°$, and discuss what a designer can change.
::: solution
With $K_v = \omega_vJ_{\text{tot}}$ and, at high frequency, plant $1/(J_mj\omega)$, the open-loop magnitude is $K_v/(J_m\omega) = \omega_vJ_{\text{tot}}/(J_m\omega) = (1 + r)\omega_v/\omega$ (the PI's integral term is negligible there). It crosses unity at $\omega_c = (1 + r)\omega_v$, where the delay costs $\omega_cT_d$. Requiring $\omega_cT_d < \varphi_{\max}$ gives $\omega_v < \varphi_{\max}/[(1 + r)T_d]$. Numbers: $\varphi_{\max} = 0.524\,\mathrm{rad}$, so $\omega_v < 0.524/(6.86\times3.75\times10^{-4}) = 204\,\mathrm{rad/s}$ ($32\,\mathrm{Hz}$). The designer can reduce $r$ (a motor with more inertia, or a lower ratio — which raises $J_m$ relative to $J_L/N^2$), reduce the delay (faster loop rate, less filtering, faster encoder interface), or accept lower bandwidth. Note that the anti-resonance ($16.8\,\mathrm{Hz}$) is the tighter limit for this joint anyway.
:::
:::

::: exercise Planning the commissioning of a new arm {level=3}
You are responsible for commissioning the joint servos of a new six-axis arm before its first customer demonstration in two weeks. Write a plan: the measurements you will make on each joint, in what order, the tools and test software you need, the acceptance criteria (with numbers, using this chapter's example where helpful), and the risks — including safety risks during tuning.
::: solution
A good plan follows [[#alg-tuning]] joint by joint from the wrist inwards or the base outwards (wrist first is common because its tuning does not depend on the others' gains, but base and shoulder carry the risk), with: drive auto-tune of current loops and a check of step responses; frequency-response measurement at two or more poses per joint with logged data; velocity-loop design with stated margins (≥ 45°, ≥ 6 dB) at the worst pose; notch filters listed with their frequencies; position loops with following-error limits (e.g. < 1 mrad during full-speed moves with feedforward, settling to ±10 µrad in < 100 ms); payload and friction identification; validation with ISO 9283-style repeatability runs and a circle test. Tools: drive software with oscilloscope and Bode functions, a data logger at ≥ 1 kHz, an output-encoder or laser-tracker check. Safety: tuning is done with reduced speed and torque limits, the arm in a cleared and fenced area, an enabling device and emergency stop in hand, brakes checked before gains are raised, and gravity-loaded joints supported or tested with the arm in a pose where an instability cannot drive the arm into the floor or the operator ([[robot-arm-design/arm-safety]]). Risks: resonances that move with pose, thermal drift of friction, untested interactions between joints in fast multi-joint moves — leave time for full-speed tests with payload.
:::
:::
