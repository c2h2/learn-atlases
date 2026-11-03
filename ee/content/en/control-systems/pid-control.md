Open the firmware of almost any motor drive, temperature controller, battery charger or quadcopter and you will find the same few lines of code: an error is computed, multiplied by one gain, added to a running sum multiplied by a second gain, and to a difference multiplied by a third. The **proportional–integral–derivative** (PID) controller is by far the most common controller in industry — surveys of process plants routinely find that well over nine-tenths of their loops are PI or PID — because three terms with clear meanings are enough for most plants, and because the terms can be tuned on site by people who do not have a model.

This chapter explains what each term does, in the time domain, on the root locus and on the Bode plot, and then designs PI controllers the way a drive engineer does: a fast inner **current loop** whose PI zero cancels the armature's electrical pole, and an outer **speed loop** built around it, a structure called **cascade control**. We then meet the classical Ziegler–Nichols tuning rules and a more modern alternative, and finish with what separates a textbook PID from one that works: derivative filtering, setpoint weighting, protection against **integrator windup**, and an op-amp realisation. Models come from [[control-systems/modelling-dynamic-systems]], and the design tools from [[control-systems/root-locus]] and [[control-systems/frequency-response-methods]].

## The three terms

::: definition PID controller {#def-pid}
A **PID controller** computes its output from the error $e = r - y$ as

$$
u(t) = K_p\,e(t) + K_i\int_0^te(\tau)\,\dd\tau + K_d\,\frac{\dd e}{\dd t},\qquad C(s) = K_p + \frac{K_i}{s} + K_ds,
$$ {#eq-pid-parallel}

the **parallel form**. The equivalent **standard (ISA) form** uses a gain, an **integral time** $T_i$ and a **derivative time** $T_d$:

$$
C(s) = K_p\left(1 + \frac{1}{T_is} + T_ds\right),\qquad K_i = \frac{K_p}{T_i},\quad K_d = K_pT_d .
$$ {#eq-pid-standard}

Omitting terms gives P, PI and PD controllers.
:::

The three terms look at the error in three different ways: proportional action responds to its present value, integral action to its accumulated past, and derivative action to its predicted future — the derivative times $T_d$ is the linear extrapolation of the error $T_d$ seconds ahead.

**Proportional action** alone leaves a steady-state error whenever the plant needs a non-zero input to hold the output at the setpoint: some error must remain to produce that input. We saw this in [[control-systems/modelling-dynamic-systems#ex-speed-loop]], where a proportional speed loop drooped under load, and in [[control-systems/time-response#ex-disturbance]], where a position servo held a load torque only with a $10^\circ$ angle error. Raising $K_p$ reduces the error but also reduces damping.

**Integral action** removes the error entirely.

::: theorem Integral action rejects constant disturbances {#thm-integral}
If a controller contains an integrator and the closed loop is stable, then the steady-state error is zero for every constant reference and for every constant disturbance entering the loop anywhere after the integrator, whatever the plant.
:::

::: proof
In steady state every signal in a stable loop driven by constant inputs is constant. The integrator's output $K_i\int e$ can only be constant if its input $e$ is zero. More formally: let the integrator be $1/s$ in a loop $L(s) = L_0(s)/s$, and let a constant disturbance $d/s$ enter at a point after the integrator, so that its path to the error is $-P_d(s)/(1 + L(s))$ for some stable $P_d$. By the final-value theorem the error is $\lim_{s\to0}s\cdot\frac{-P_d(s)}{1 + L_0(s)/s}\cdot\frac{d}{s} = \lim_{s\to0}\frac{-sP_d(s)d}{s + L_0(s)} = 0$ provided $L_0(0) \neq 0$, which holds because the plant has a non-zero DC gain (otherwise no constant input could hold a constant non-zero output). The same calculation with $P_d = 1$ covers the reference.
:::

The price of integral action is phase: $1/s$ contributes $-90^\circ$ at every frequency. A PI controller $K_p(1 + 1/(T_is)) = K_p(T_is + 1)/(T_is)$ is a pole at the origin plus a zero at $-1/T_i$; on the Bode plot it is an integrator below $1/T_i$ and a constant gain $K_p$ above, so its phase lag is significant only below a few times $1/T_i$. Place $1/T_i$ well below crossover and the PI controller fixes the steady state while costing little phase margin.

**Derivative action** adds a zero: a PD controller $K_p(1 + T_ds)$ has a zero at $-1/T_d$ and contributes phase *lead*, up to $+90^\circ$, at frequencies above $1/T_d$. That is the stabilising effect seen in [[control-systems/root-locus#ex-pd-locus]], where a zero pulled the servo's locus to the left. Its weakness is that its gain rises without bound with frequency, so it amplifies measurement noise; in practice it is always filtered (see below).

::: widget plot
f: 20*log10(k*sqrt(1 + (10^x*d - 1/(10^x*i))^2)); atan(10^x*d - 1/(10^x*i))*180/pi
x: -1, 3
y: -90, 90
sliders: k=1:0.1:10:0.1; i=0.1:0.01:2:0.01; d=0.01:0:0.2:0.002
hlines: 0
labels: 20\log_{10}\lvert C\rvert\ (\mathrm{dB}); \angle C\ (\text{degrees})
caption: Frequency response of the ideal PID controller $K_p(1 + 1/(T_is) + T_ds)$ against $\log_{10}\omega$, with $k = K_p$, $i = T_i$ and $d = T_d$ (in seconds) on the sliders. At low frequencies the integral term dominates (slope $-20\,\mathrm{dB/dec}$, phase $-90^\circ$); at high frequencies the derivative term dominates (slope $+20\,\mathrm{dB/dec}$, phase $+90^\circ$); in between the gain bottoms out near $K_p$. Set $d = 0$ to see a PI controller: its phase lag fades above $1/T_i$. The useful phase lead of the derivative term is bought with high-frequency gain.
:::

::: quiz
A PI controller has $T_i = 10\,\mathrm{ms}$. How much phase lag does it add at $\omega = 1000\,\mathrm{rad/s}$?
- [ ] $90^\circ$
- [ ] $45^\circ$
- [x] $5.7^\circ$
- [ ] None — a PI controller adds no phase above its zero.
::: solution
$C(j\omega) = K_p(1 - j/(\omega T_i))$, so the phase is $-\arctan(1/(\omega T_i)) = -\arctan(0.1) = -5.7^\circ$. The lag is $45^\circ$ at $\omega = 1/T_i = 100\,\mathrm{rad/s}$ and falls off above it; this is why the PI zero is placed a factor of $4$–$10$ below the crossover frequency.
:::
:::

## PI control of a current loop

The innermost loop of a motor drive controls the armature current, because current is torque: once the current follows its command quickly and accurately, the speed and position loops can treat the motor as an ideal torque source. The current loop's plant is the armature circuit,

$$
\frac{I(s)}{V(s)} = \frac{1}{Ls + R} = \frac{1/R}{\tau_es + 1},\qquad \tau_e = \frac{L}{R},
$$

with the back-EMF $K\omega$ treated as a slowly varying disturbance — the mechanical time constant is much longer than the current loop's response time, so from the current loop's point of view the speed is almost constant.

::: proposition Pole–zero cancellation design of a PI current loop {#prop-current-loop}
For the plant $1/(Ls + R)$ and the PI controller $K_p(1 + 1/(T_is))$, the choice $T_i = \tau_e = L/R$ cancels the plant pole with the controller zero and gives the loop gain

$$
L_i(s) = \frac{K_p}{Ls},
$$

an integrator crossing over at $\omega_{ci} = K_p/L$ with $90^\circ$ phase margin. The closed loop is first order with time constant $\tau_i = L/K_p = 1/\omega_{ci}$. For a desired bandwidth $\omega_{ci}$: $K_p = \omega_{ci}L$ and $K_i = K_p/T_i = \omega_{ci}R$.
:::

::: proof
$C(s)G(s) = K_p\,\dfrac{T_is + 1}{T_is}\cdot\dfrac{1/R}{\tau_es + 1}$. With $T_i = \tau_e$ the factors $T_is + 1$ and $\tau_es + 1$ cancel, leaving $K_p/(RT_is) = K_p/(Ls)$. Then $T(s) = L_i/(1 + L_i) = 1/(Ls/K_p + 1)$. The cancellation is acceptable because the cancelled pole is stable and well damped; if $L$ or $R$ differ from their nominal values the cancellation is imperfect, leaving a slow pole–zero pair near $-R/L$ with small residue, which causes a small, slow tail in the response but no instability.
:::

::: example Designing a 1 kHz current loop {#ex-current-loop}
Design a PI current controller for the motor of [[control-systems/modelling-dynamic-systems#ex-motor]] ($R = 2\,\Omega$, $L = 1\,\mathrm{mH}$) with a closed-loop bandwidth of $1\,\mathrm{kHz}$. The drive is a PWM bridge switching at $20\,\mathrm{kHz}$, which may be treated as a gain of $1$ from commanded to applied voltage. What is the response to the back-EMF?
::: solution
With $\omega_{ci} = 2\pi\times1000 = 6283\,\mathrm{rad/s}$, [[#prop-current-loop]] gives

$$
K_p = \omega_{ci}L = 6283\times10^{-3} = 6.28\,\mathrm{V/A},\qquad T_i = \frac{L}{R} = 0.5\,\mathrm{ms},\qquad K_i = \omega_{ci}R = 1.26\times10^4\,\mathrm{V/(A\,s)}.
$$

The closed loop is $I/I^* = 1/(1.59\times10^{-4}s + 1)$: a time constant of $0.16\,\mathrm{ms}$, so the current settles within about $0.6\,\mathrm{ms}$ of a step command. The crossover is a twentieth of the switching frequency, so the averaging assumption behind "PWM gain $= 1$" holds, and the phase lag of the PWM's effective delay of about half a switching period, $25\,\mathrm{\mu s}$, is $6283\times25\times10^{-6} = 0.16\,\mathrm{rad} = 9^\circ$ — a reduction of the phase margin from $90^\circ$ to $81^\circ$.

The back-EMF $K\omega$ enters as a disturbance at the plant input. With an integrator in the controller, [[#thm-integral]] guarantees zero steady-state current error for a constant speed; as the speed ramps, the integrator tracks the rising back-EMF with a small lag. Many drives add the measured $K\omega$ to the controller output as a **feedforward** term, so the integrator need not do this work.
:::
:::

## Cascade control

With a fast current loop in place, the speed loop sees a much simpler plant: from current command $i^*$ to speed,

$$
\frac{\Omega(s)}{I^*(s)} = \frac{1}{\tau_is + 1}\cdot\frac{K}{Js + b} \approx \frac{K}{Js}\cdot\frac{1}{\tau_is + 1},
$$

because the friction $b$ is negligible at the frequencies of interest. The inner loop has removed the electrical pole, the back-EMF and the armature resistance from the outer design, and it limits the motor current simply by limiting $i^*$.

::: definition Cascade control {#def-cascade}
In **cascade control** the output of an outer (master) controller is the setpoint of an inner (slave) loop that controls an intermediate variable of the plant. The inner loop is designed first and made substantially faster than the outer one — a bandwidth ratio of $5$ to $10$ is typical — so that the outer loop can treat it as a first-order lag or even as unity.
:::

Cascade control is everywhere in power electronics and drives: position loops around speed loops around current loops in servo drives; output-voltage loops around inductor-current loops in current-mode DC–DC converters; DC-link voltage loops around grid-current loops in inverters. Each inner loop rejects the disturbances that enter it — supply variations, back-EMF — before they reach the outer variable, and each one offers a natural place to impose a limit.

::: example A PI speed loop {#ex-speed-pi}
Design a PI speed controller for the motor of [[#ex-current-loop]] ($K = 0.05\,\mathrm{N\,m/A}$, $J = 2\times10^{-5}\,\mathrm{kg\,m^2}$) around the $1\,\mathrm{kHz}$ current loop, with a crossover at $\omega_c = 628\,\mathrm{rad/s}$ (a tenth of the current loop's) and the PI zero a factor of $4$ below crossover. Find $K_p$, $T_i$, the phase margin, the step response and the speed dip caused by a sudden load of $10\,\mathrm{mN\,m}$.
::: solution
The PI zero is at $1/T_i = \omega_c/4 = 157\,\mathrm{rad/s}$, so $T_i = 6.37\,\mathrm{ms}$. The loop gain is

$$
L(s) = K_p\left(1 + \frac{1}{T_is}\right)\frac{K}{Js}\cdot\frac{1}{\tau_is + 1}.
$$

At $\omega_c$: $\abs{1 + 1/(j\omega_cT_i)} = \sqrt{1 + 1/16} = 1.031$, $K/(J\omega_c) = 0.05/(2\times10^{-5}\times628) = 3.98$, and $\abs{1/(1 + j\omega_c\tau_i)} = 1/\sqrt{1 + 0.1^2} = 0.995$. Setting $\abs{L} = 1$ gives $K_p = 1/(1.031\times3.98\times0.995) = 0.245\,\mathrm{A\,s/rad}$, and $K_i = K_p/T_i = 38.5\,\mathrm{A/rad}$.

At crossover the PI term contributes $-\arctan(1/4) = -14.0^\circ$, the plant's integrator $-90^\circ$ the current loop $-\arctan0.1 = -5.7^\circ$, a total of $-109.7^\circ$ and a phase margin of $70.3^\circ$.

All three closed-loop poles turn out to be real ($-275$, $-392$ and $-5617\,\mathrm{s^{-1}}$), yet a simulation of a small step in speed command shows $14.8\,\%$ overshoot, peaking at $6.1\,\mathrm{ms}$ and settling in $17\,\mathrm{ms}$. The overshoot comes from the closed-loop *zero* at the PI zero, $-157\,\mathrm{s^{-1}}$, which lies to the right of all the poles (compare [[control-systems/time-response#prop-zero]]). A load step of $10\,\mathrm{mN\,m}$ makes the speed dip by at most $0.62\,\mathrm{rad/s}$, after which the integrator restores it exactly — compared with a permanent drop of $7.9\,\mathrm{rad/s}$ without feedback.
:::
:::

The overshoot caused by the PI zero affects only the response to the *reference*. The zero is not in the disturbance path, and it can be removed from the reference path without changing the loop, as we now see.

## Tuning rules

When no model is available, a PID controller can be tuned from a simple experiment on the plant. The best-known rules are those of Ziegler and Nichols (1942).

::: algorithm Ziegler–Nichols ultimate-gain method {#alg-zn}
1. With integral and derivative action switched off, raise the proportional gain until the loop oscillates steadily. Record this **ultimate gain** $K_u$ and the period of oscillation $T_u$.
2. Set the controller from the table:

| controller | $K_p$ | $T_i$ | $T_d$ |
|---|---|---|---|
| P | $0.5K_u$ | — | — |
| PI | $0.45K_u$ | $T_u/1.2$ | — |
| PID | $0.6K_u$ | $T_u/2$ | $T_u/8$ |
:::

$K_u$ is the gain margin of the plant under proportional control and $T_u = 2\pi/\omega_{180}$, so the experiment measures one point of the Nyquist plot: the phase-crossover point. Ziegler and Nichols chose the constants to give a **quarter-amplitude decay** of disturbance responses, which is aggressive by modern standards. A companion **step-response method** fits the plant's open-loop step response with a delay $\theta$ and a slope, and gives similar settings.

::: example Tuning the oven {#ex-zn}
The oven of [[control-systems/frequency-response-methods#ex-delay-loop]], $G(s) = e^{-2s}/(20s + 1)$, has $K_u = 16.35$ and $T_u = 7.70\,\mathrm{s}$. Find the Ziegler–Nichols PI and PID settings and their step responses. Compare with the SIMC rule for a first-order plant with delay, $K_p = \tau/(K(\tau_c + \theta))$, $T_i = \min(\tau, 4(\tau_c + \theta))$, with the closed-loop time constant $\tau_c$ set equal to the delay $\theta$.
::: solution
From the table: PI $K_p = 0.45\times16.35 = 7.36$, $T_i = 7.70/1.2 = 6.42\,\mathrm{s}$; PID $K_p = 0.6\times16.35 = 9.81$, $T_i = 3.85\,\mathrm{s}$, $T_d = 0.96\,\mathrm{s}$. Simulating the setpoint step (derivative acting on the measurement, filtered with $N = 10$), the ZN PI loop overshoots by $56\,\%$ and the PID loop by $63\,\%$, both settling (to $2\,\%$) in about $20$–$23\,\mathrm{s}$: fast, but far too oscillatory for an oven.

The SIMC rule (Skogestad, 2003) with $K = 1$, $\tau = 20\,\mathrm{s}$, $\theta = 2\,\mathrm{s}$ and $\tau_c = 2\,\mathrm{s}$ gives $K_p = 20/4 = 5$ and $T_i = \min(20, 16) = 16\,\mathrm{s}$. The step response overshoots by $8\,\%$ and settles in $20\,\mathrm{s}$ — no slower, much better damped, and with the phase margin of $73.5^\circ$ found earlier for $K = 5$ only slightly reduced by the integral action. Model-based rules like SIMC need only the three numbers $K$, $\tau$, $\theta$ of a step test and have largely replaced the Ziegler–Nichols tables in practice.
:::
:::

::: warning Do not tune by oscillating a real plant carelessly
The ultimate-gain experiment drives the loop to the edge of instability. On a motor or power converter that can mean destructive currents or voltages; on a chemical process, an off-specification batch. Raise the gain in small steps, keep the amplitude limited, and prefer a step test or a relay experiment (Åström–Hägglund autotuning, in which an on–off relay in the loop produces a small, controlled limit cycle at $\omega_{180}$) when there is any risk.
:::

## Practical PID

A PID controller that implements [[#eq-pid-standard]] literally will disappoint. Four modifications are used in every serious implementation.

**Derivative filtering.** The ideal derivative has unbounded gain at high frequencies. It is replaced by

$$
K_pT_ds \;\longrightarrow\; \frac{K_pT_ds}{1 + T_ds/N},
$$ {#eq-derivative-filter}

which behaves as a derivative below $N/T_d$ and as a constant gain $K_pN$ above it. Values $N = 5$–$20$ are typical; the extra pole costs a little phase near crossover.

**Derivative on measurement.** A step change of setpoint makes $\dd e/\dd t$ an impulse, and the derivative term "kicks" the actuator to its limit. Applying the derivative to $-y$ instead of to $e$ gives the same disturbance response without the kick, because $\dd r/\dd t = 0$ except at setpoint changes.

**Setpoint weighting.** More generally, the controller

$$
u = K_p\bigl(br - y\bigr) + \frac{K_p}{T_i}\int(r - y)\,\dd t - K_pT_d\frac{\dd y}{\dd t},\qquad 0 \le b \le 1,
$$ {#eq-setpoint-weight}

has the same loop gain, and so the same stability, disturbance rejection and robustness, as the standard PID, but a different zero in the reference path. With $b = 1$ it is the usual PID; with $b = 0$ (the "I-P" controller) the reference enters only through the integral, which removes the PI zero from the reference path. For the speed loop of [[#ex-speed-pi]], $b = 0$ eliminates the $14.8\,\%$ overshoot entirely (the response becomes monotonic, rising in $10.5\,\mathrm{ms}$ and settling in $18.5\,\mathrm{ms}$) while the load-step dip is unchanged. Setpoint weighting is a simple case of a **two-degree-of-freedom** controller, in which tracking and regulation are designed separately.

**Anti-windup.** Every actuator saturates: a PWM bridge cannot apply more than its supply voltage, and a current loop is deliberately limited to protect the motor. While the actuator is saturated, the loop is effectively open, the error stays large, and the integrator keeps integrating — **winding up** to a value far beyond what is needed. When the output finally reaches the setpoint, the integrator must unwind through a long period of negative error, producing a large overshoot.

::: algorithm Anti-windup by clamping and back-calculation {#alg-antiwindup}
Let $v$ be the controller's unsaturated output and $u = \operatorname{sat}(v)$ the actuator command.

1. **Clamping (conditional integration):** stop integrating whenever $u \neq v$ and the error would drive the integrator further in the direction of saturation.
2. **Back-calculation:** feed the saturation excess back into the integrator,
$$
\frac{\dd I}{\dd t} = \frac{K_p}{T_i}e + \frac{1}{T_t}(u - v),
$$
with a **tracking time constant** $T_t$, typically between $T_d$ and $T_i$ (or about $T_i/2$ for a PI controller). While saturated the integrator is pulled towards the value that just keeps $v$ at the limit.
:::

::: example Windup in a speed loop {#ex-windup}
The speed loop of [[#ex-speed-pi]] has its current command limited to $\pm6\,\mathrm{A}$ (the stall current at $12\,\mathrm{V}$). It is commanded to step from rest to $200\,\mathrm{rad/s}$. Compare the responses with no anti-windup, with clamping and with back-calculation ($T_t = T_i/2$).
::: solution
At $6\,\mathrm{A}$ the motor accelerates at $K\times6/J = 0.3/(2\times10^{-5}) = 15\,000\,\mathrm{rad/s^2}$, so even the best possible response needs $200/15\,000 = 13.3\,\mathrm{ms}$ to reach the setpoint. The proportional term alone, $0.245\times200 = 49\,\mathrm{A}$, saturates the command at once. Simulating:

| anti-windup | overshoot | $2\,\%$ settling time |
|---|---|---|
| none | $63\,\%$ | $39\,\mathrm{ms}$ |
| clamping | $1.6\,\%$ | $14.0\,\mathrm{ms}$ |
| back-calculation, $T_t = T_i/2$ | none | $16.8\,\mathrm{ms}$ |

Without protection, during the $13\,\mathrm{ms}$ acceleration the integrator accumulates $K_i\int e\,\dd t \approx 38.5\times1.3 = 50\,\mathrm{A}$ of command, which must be unwound by a long overshoot: the motor shoots past $200$ to $326\,\mathrm{rad/s}$. Either form of anti-windup gives a response close to the physical limit. Note that the *small-signal* response of this loop overshoots by $14.8\,\%$; the large-step behaviour is governed by saturation, not by the linear design.
:::
:::

::: widget phaseplane
f: -x + clamp(2*(0.8 - x) + y, -1, 1)
g: 4*(0.8 - x) - w*(2*(0.8 - x) + y - clamp(2*(0.8 - x) + y, -1, 1))
x: -0.2, 1.2
y: -1, 2
points: 0, 0
nullclines: false
sliders: w=0:0:10:0.5
caption: Integrator windup in the phase plane. A first-order plant $\dot x = -x + u$ is controlled by a PI controller with $K_p = 2$, $K_i = 4$ towards the setpoint $0.8$; $y$ is the integrator state and the actuator saturates at $u = \pm1$. The slider $w = 1/T_t$ is the back-calculation gain. With $w = 0$ the trajectory from rest climbs high in $y$ while the actuator is saturated and the output overshoots to $0.96$ ($20\,\%$); raise $w$ to $5$ and the integrator is held near its useful value, cutting the overshoot to about $2\,\%$. Click to start other trajectories.
:::

### An op-amp PID controller

Analog PID controllers are still built for fast loops — power-supply error amplifiers, laser-diode drivers, piezo stages — and the circuit is simple. An inverting stage ([[control-systems/modelling-dynamic-systems#prop-opamp]]) with input impedance $Z_1 = R_1\parallel C_1$ and feedback impedance $Z_2 = R_2 + 1/(sC_2)$ gives

$$
\frac{V_o}{V_i} = -\frac{Z_2}{Z_1} = -\left(R_2 + \frac{1}{sC_2}\right)\left(\frac{1}{R_1} + sC_1\right) = -\left[\left(\frac{R_2}{R_1} + \frac{C_1}{C_2}\right) + \frac{1}{sR_1C_2} + sR_2C_1\right],
$$ {#eq-opamp-pid}

a PID controller in the parallel form with $K_p = R_2/R_1 + C_1/C_2$, $K_i = 1/(R_1C_2)$ and $K_d = R_2C_1$. Factorised, it is the **series (interacting) form** $\frac{R_2}{R_1}(1 + 1/(sR_2C_2))(1 + sR_1C_1)$: a PI section with integral time $R_2C_2$ times a PD section with derivative time $R_1C_1$. A small resistor in series with $C_1$ supplies the derivative filter, and back-to-back Zener diodes across $C_2$ (or the op-amp's own output limits plus a clamp) provide crude anti-windup.

::: example Component values for an analog PID {#ex-opamp-pid}
Realise the series-form controller $2\,(1 + 1/(0.01s))(1 + 0.001s)$ with the circuit above and $R_1 = 10\,\mathrm{k\Omega}$, and find its parallel-form gains.
::: solution
$R_2/R_1 = 2$ gives $R_2 = 20\,\mathrm{k\Omega}$; $R_2C_2 = 10\,\mathrm{ms}$ gives $C_2 = 0.5\,\mathrm{\mu F}$ (use $470\,\mathrm{nF}$ in parallel with $33\,\mathrm{nF}$, or accept $6\,\%$ error with $470\,\mathrm{nF}$); $R_1C_1 = 1\,\mathrm{ms}$ gives $C_1 = 100\,\mathrm{nF}$. By [[#eq-opamp-pid]], $K_p = 2 + 0.1/0.5 = 2.2$, $K_i = 1/(10^4\times5\times10^{-7}) = 200\,\mathrm{s^{-1}}$ and $K_d = 2\times10^4\times10^{-7} = 2\,\mathrm{ms}$; equivalently $T_i = K_p/K_i = 11\,\mathrm{ms}$ and $T_d = K_d/K_p = 0.91\,\mathrm{ms}$ in standard form. The interaction between the terms is why series and parallel settings must not be confused. A $1\,\mathrm{k\Omega}$ resistor in series with $C_1$ limits the derivative gain to about $R_2/1\,\mathrm{k\Omega} = 20$ above $1/(1\,\mathrm{k\Omega}\times C_1) = 10^4\,\mathrm{rad/s}$, which is the filter of [[#eq-derivative-filter]] with $N \approx 9$.
:::
:::

::: application PID in silicon and software
A switching regulator's error amplifier with its RC network around it is an analog PI or PID controller (the "Type II" and "Type III" compensators of [[control-systems/compensator-design]]). In a microcontroller-based drive, the PID is a dozen lines executed in a timer interrupt every $50\,\mathrm{\mu s}$, with fixed-point arithmetic, saturation, anti-windup and a derivative filter; how to discretise it and what the sampling costs in phase margin is the subject of [[control-systems/digital-control]]. Industrial process controllers add autotuning, bumpless transfer between manual and automatic modes, and gain scheduling.
:::

::: history
Elmer Sperry's gyroscopic ship autopilots of the early 1920s already combined proportional and rate action. Nicolas Minorsky, who studied the steering of ships and later tested his ideas on the battleship USS *New Mexico*, published "Directional stability of automatically steered bodies" in 1922, the first theoretical analysis of a three-term controller. Pneumatic PID controllers spread through the process industries in the 1930s, and in 1942 John Ziegler and Nathaniel Nichols of the Taylor Instrument Companies published their tuning rules in "Optimum settings for automatic controllers". Karl Åström and Tore Hägglund's relay autotuner (1984) made automatic tuning routine, and Sigurd Skogestad's SIMC rules (2003) are among the most widely taught model-based alternatives.
:::

## Where this leads

PID control is lead–lag compensation with particular pole and zero positions: PI is a lag compensator with its pole at the origin, filtered PD is a lead compensator. [[control-systems/compensator-design]] designs these more freely to meet margin and error specifications. The state-feedback controllers of [[control-systems/state-feedback]] generalise PD control to feedback from every state, and integral action reappears there as an augmented state. Digital implementation, including the discretised PID and its anti-windup, is in [[control-systems/digital-control]]; current and voltage loops of converters are designed in [[power-electronics/converter-control]].

::: summary
- PID: $C(s) = K_p(1 + 1/(T_is) + T_ds)$; P reacts to the present error, I to its past, D to its predicted future.
- Integral action gives zero steady-state error for constant references and for constant disturbances entering after the integrator; it costs phase below about $1/T_i$, so the PI zero is placed a factor $4$–$10$ below crossover.
- Derivative action adds phase lead (a zero) and damping, but must be filtered and is best applied to the measurement.
- A PI current loop with $T_i = L/R$ cancels the electrical pole and gives a first-order loop of bandwidth $K_p/L$.
- Cascade control nests a fast inner loop (current) inside a slower outer loop (speed, voltage), with a bandwidth ratio of $5$–$10$.
- Ziegler–Nichols rules use the ultimate gain and period but give poorly damped loops; model-based rules such as SIMC are better.
- Setpoint weighting removes the reference overshoot caused by the PI zero without changing the loop; anti-windup (clamping or back-calculation) is essential whenever the actuator can saturate.
:::

## Exercises

::: exercise Parallel and standard forms {level=1 check="0.05"}
A PID controller has $K_p = 4$, $K_i = 80\,\mathrm{s^{-1}}$ and $K_d = 0.2\,\mathrm{s}$. Find $T_i$ (in seconds) and $T_d$.
::: solution
$T_i = K_p/K_i = 4/80 = 0.05\,\mathrm{s}$ and $T_d = K_d/K_p = 0.05\,\mathrm{s}$.
:::
:::

::: exercise A current-loop gain {level=1 check="2*pi*500*2.5e-3"}
A solenoid has $R = 5\,\Omega$ and $L = 2.5\,\mathrm{mH}$. Using pole–zero cancellation, find the PI gain $K_p$ (in V/A) for a current-loop bandwidth of $500\,\mathrm{Hz}$, and the integral time.
::: solution
$K_p = \omega_{ci}L = 2\pi\times500\times2.5\times10^{-3} = 7.85\,\mathrm{V/A}$ and $T_i = L/R = 0.5\,\mathrm{ms}$ ($K_i = \omega_{ci}R = 1.57\times10^4\,\mathrm{V/(A\,s)}$).
:::
:::

::: exercise Ziegler–Nichols settings {level=1}
A proportional loop oscillates steadily with $K_u = 8$ and period $T_u = 0.4\,\mathrm{s}$. Give the Ziegler–Nichols PI and PID settings in standard form.
::: solution
PI: $K_p = 3.6$, $T_i = 0.333\,\mathrm{s}$. PID: $K_p = 4.8$, $T_i = 0.2\,\mathrm{s}$, $T_d = 0.05\,\mathrm{s}$.
:::
:::

::: exercise P versus PI on a first-order plant {level=2}
A heater has $G(s) = 2/(50s + 1)$ (kelvin per watt, seconds). (a) With $C = K_p = 10$, find the steady-state error for a $10\,\mathrm{K}$ setpoint step and the closed-loop time constant. (b) With the PI controller $10(1 + 1/(50s))$, find the closed-loop transfer function and show that the steady-state error is zero.
::: solution
(a) $L = 20/(50s + 1)$, $T = 20/(50s + 21)$, DC gain $20/21$: the error is $10/21 = 0.48\,\mathrm{K}$, and the time constant is $50/21 = 2.4\,\mathrm{s}$. (b) $T_i = 50\,\mathrm{s}$ cancels the plant pole: $L = 10\times2/(50s) = 0.4/s$, so $T = 1/(2.5s + 1)$, with DC gain exactly $1$ and time constant $2.5\,\mathrm{s}$. The PI controller removes the error at almost no cost in speed.
:::
:::

::: exercise Setpoint weighting {level=2}
For a unity-feedback loop with plant $G(s)$ and the PI controller of [[#eq-setpoint-weight]] (no derivative), show that the transfer function from $r$ to $y$ is $\dfrac{K_p(bT_is + 1)G}{T_is + K_p(T_is + 1)G}$ and that the transfer function from a disturbance at the plant input to $y$ does not depend on $b$.
::: solution
$U = K_p(bR - Y) + \frac{K_p}{T_is}(R - Y) = \frac{K_p(bT_is + 1)}{T_is}R - \frac{K_p(T_is + 1)}{T_is}Y$. With $Y = G(U + D)$, multiplying by $T_is$: $T_isY = K_pG(bT_is + 1)R - K_pG(T_is + 1)Y + T_isGD$. Hence $Y[T_is + K_p(T_is + 1)G] = K_p(bT_is + 1)GR + T_isGD$. The denominator, and so the closed-loop poles and the disturbance response $T_isG/[T_is + K_p(T_is + 1)G]$, are independent of $b$; only the reference zero, at $-1/(bT_i)$, moves.
:::
:::

::: exercise Op-amp PI values {level=2}
Using the circuit of [[#eq-opamp-pid]] without $C_1$, design an analog PI controller with $K_p = 10$ and $T_i = 2\,\mathrm{ms}$ for $R_1 = 4.7\,\mathrm{k\Omega}$. What limits the gain at DC in a real op-amp?
::: solution
Without $C_1$, $V_o/V_i = -(R_2/R_1)(1 + 1/(sR_2C_2))$. $R_2 = 10\times4.7\,\mathrm{k\Omega} = 47\,\mathrm{k\Omega}$, $C_2 = 2\,\mathrm{ms}/47\,\mathrm{k\Omega} = 42.6\,\mathrm{nF}$ (use $43\,\mathrm{nF}$ from E24, or $39\,\mathrm{nF} + 3.3\,\mathrm{nF}$). At DC the capacitor is open and the gain is the op-amp's open-loop gain, $10^5$ or so, not infinite; the integrator is therefore "leaky" with a pole at about $1/(A_0R_2C_2) \approx 0.005\,\mathrm{rad/s}$, which leaves a negligible steady-state error.
:::
:::

::: exercise Speed of the unwinding {level=2}
In [[#ex-windup]] without anti-windup, estimate the integrator state at the moment the speed first reaches $200\,\mathrm{rad/s}$, given that the speed rises approximately linearly at $15\,000\,\mathrm{rad/s^2}$. Compare it with the integrator value needed in steady state.
::: solution
The error falls linearly from $200$ to $0$ over $13.3\,\mathrm{ms}$, so $\int e\,\dd t \approx \tfrac12\times200\times0.0133 = 1.33\,\mathrm{rad}$, and the integrator holds $K_i\times1.33 = 38.5\times1.33 = 51\,\mathrm{A}$ of current command. In steady state it only needs to supply the friction current $b\omega/K = 10^{-5}\times200/0.05 = 0.04\,\mathrm{A}$. The excess must be removed by negative error, i.e. overshoot, which is why the speed peaks so far above the setpoint.
:::
:::

::: exercise Symmetric placement in a cascade {level=3}
For the speed loop $L(s) = K_p\dfrac{T_is + 1}{T_is}\cdot\dfrac{K}{Js}\cdot\dfrac{1}{\tau_is + 1}$, (a) show that the phase margin is maximised when the crossover frequency is the geometric mean of $1/T_i$ and $1/\tau_i$, and find the maximum phase margin in terms of $a = \sqrt{T_i/\tau_i}$. (b) For $a = 4$, find $T_i$, the crossover and the phase margin with $\tau_i = 0.159\,\mathrm{ms}$.
::: hint
The phase is $-180^\circ + \arctan(\omega T_i) - \arctan(\omega\tau_i)$; differentiate with respect to $\omega$.
:::
::: solution
(a) $\mathrm{PM}(\omega) = \arctan(\omega T_i) - \arctan(\omega\tau_i)$. Its derivative vanishes when $T_i/(1 + \omega^2T_i^2) = \tau_i/(1 + \omega^2\tau_i^2)$, i.e. $\omega^2T_i\tau_i = 1$, $\omega_c = 1/\sqrt{T_i\tau_i}$. There $\omega_cT_i = a$ and $\omega_c\tau_i = 1/a$, so $\mathrm{PM}_{max} = \arctan a - \arctan(1/a)$, equivalently $\sin\mathrm{PM}_{max} = (a^2 - 1)/(a^2 + 1)$. This is the **symmetric optimum** of drive engineering. (b) $a = 4$: $T_i = 16\tau_i = 2.55\,\mathrm{ms}$, $\omega_c = 1/(4\tau_i) = 1571\,\mathrm{rad/s}$, $\mathrm{PM} = \arctan4 - \arctan0.25 = 75.96^\circ - 14.04^\circ = 61.9^\circ$. $K_p$ follows from $\abs{L(j\omega_c)} = 1$. At $\omega_c$ the PI factor has magnitude $\sqrt{1 + a^2}/a$ and the current-loop lag $a/\sqrt{1 + a^2}$, which cancel, so $K_p = J\omega_c/K = 2\times10^{-5}\times1571/0.05 = 0.628\,\mathrm{A\,s/rad}$.
:::
:::

::: exercise Derivative kick {level=3}
A PD controller $u = K_p(e + T_d\dot e)$ with derivative filter $N$, i.e. $C(s) = K_p\bigl(1 + T_ds/(1 + T_ds/N)\bigr)$, receives a unit step in the reference with $y$ initially constant. (a) Find $u(0^+)$ and the time constant with which the derivative contribution decays. (b) With $K_p = 2$, $T_d = 10\,\mathrm{ms}$ and $N = 10$, evaluate them, and explain why applying the derivative to $-y$ avoids the kick.
::: solution
(a) The derivative part $K_pT_ds/(1 + T_ds/N)$ responds to a unit step with $K_pN\,e^{-tN/T_d}$ (its transform is $K_pT_d/(1 + T_ds/N)$). So $u(0^+) = K_p + K_pN = K_p(1 + N)$, decaying with time constant $T_d/N$. (b) $u(0^+) = 2\times11 = 22$, decaying with time constant $1\,\mathrm{ms}$: a spike eleven times the proportional response, which would saturate most actuators. If the derivative acts on $-y$, a reference step does not pass through it at all; $y$ is continuous (the plant is strictly proper), so its derivative has no impulse, while disturbances, which do change $y$, still receive the full derivative action.
:::
:::
