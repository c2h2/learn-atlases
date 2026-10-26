Three numbers, tuned in ten minutes, run perhaps ninety per cent of the control loops on earth. That is the proportional-integral-derivative controller's uncomfortable distinction: it is the least sophisticated controller in this book and by a wide margin the most used, and the reason is not that it is optimal but that it is **structurally honest** about what a single-input-single-output industrial loop actually needs. The proportional term supplies gain where the plant has none. The integral term removes the offset that proportional feedback structurally cannot, and does so without the designer having to know the disturbance. The derivative term buys phase where the plant's lag has used it up. Nothing else is needed as often as it should be, and nothing else fails as rarely in as interesting a way.

What the textbooks under-teach is everything around the three constants: the derivative that kicks when the operator changes the setpoint, the integrator that quietly fills up while a valve is hard against its stop and then dumps its cargo an hour later, the tuning rule that produces a loop with a sensitivity peak of $2.4$ and is called "aggressive" rather than "poorly damped", and the structure of cascade, feedforward, split-range and characteriser functions that surrounds the PID in a real plant and in which the PID is a small and simple component. This lesson is about the algorithm, the tuning rules and their real margins, and the structures that keep a PID out of trouble.

::: warning A tuning rule is a starting point, and the aggressive ones are near the edge
Every classical tuning rule optimises something, and most of what it optimises is not what a designer wants. **Ziegler-Nichols**' rules target a quarter-amplitude decay — successive peaks in the ratio $1 : 4$, a damping ratio of about $0.2$ — and on the oven of [[#ex-tunings]] the settings they produce sit at a sensitivity peak of $2.4$: a loop that rings after every disturbance and that a plant whose gain or delay has grown may not survive. **Cohen-Coon** targets the same quarter-amplitude decay with a model-based correction for the delay, and for small delay-to-lag ratios is more aggressive still. **Lambda** and **Chien-Hrones-Reswick** tuning target a specified closed-loop time constant or a specified overshoot and are the ones to use when the loop matters. The professional habit is to start from a lambda tuning with a closed-loop time constant equal to the plant's dominant delay, check that the sensitivity peak is no more than about $1.6$, and only then decide whether the loop can afford to be faster — and to record which rule was used, because a loop tuned by Ziegler-Nichols on a plant that has since been changed is a loop with no documented margin at all.
:::

## The algorithm and its forms

::: definition The three forms of the positional algorithm {#def-pid-forms}
The **ideal** (non-interacting) form is
$$
u (t ) = K_c \left[ e (t ) + \frac{1}{T_i} \int_0^{t} e \, \mathrm{d} t^{\prime} + T_d \frac{\mathrm{d} e}{\mathrm{d} t} \right],
\qquad
e = y_{sp} - y .
$$
The **series** (interacting, pneumatic-legacy) form multiplies the lag and lead,
$$
u = K_c \left( 1 + \frac{1}{T_i s} \right)\left( 1 + T_d s \right) e
  = K_c \left[ 1 + \frac{1}{T_i s} + T_d s + \frac{T_d}{T_i s} \right] e ,
$$
and carries an extra constant term $T_d / T_i$, so the same nominal $K_c , T_i , T_d$ give a different loop: the series controller equals an ideal one with $K_c^{\prime} = K_c \left( 1 + T_d / T_i \right)$, $T_i^{\prime} = T_i + T_d$ and $T_d^{\prime} = T_i T_d / \left( T_i + T_d \right)$. The **parallel** form is $K_p + K_i / s + K_d s$ with $K_p = K_c$, $K_i = K_c / T_i$, $K_d = K_c T_d$. The conversions are one-to-one and a mismatch between a controller's documented form and the form assumed by whoever typed the constants is a real and common fault: for $T_d / T_i = 0.25$ the series form's proportional action is twenty-five per cent stronger than the ideal form's with the same numbers.
Two practical modifications are universal. The derivative acts on the **measurement**, not the error,
$$
u = K_c \left[ e + \frac{1}{T_i} \int e \, \mathrm{d} t - T_d \frac{\mathrm{d} y}{\mathrm{d} t} \right],
$$
so that a step change of setpoint does not produce an impulse of valve travel. And the derivative is **filtered**, $T_d s \rightarrow T_d s / \left( \tau_f s + 1 \right)$ with $\tau_f = T_d / N$ and $N$ between five and twenty, because an ideal differentiator has infinite gain at infinite frequency and every real sensor has noise.
:::

::: proof What a PID does to the loop {#proof-pid-zeros}
The ideal PID's transfer function is
$$
C (s ) = K_c \left( 1 + \frac{1}{T_i s} + T_d s \right)
      = \frac{K_c}{T_i s} \left( T_d T_i s^{2} + T_i s + 1 \right)
      = \frac{K_c}{T_i s} \left( 1 + \frac{s}{\omega_1} \right) \left( 1 + \frac{s}{\omega_2} \right) .
$$
**One pole at the origin, two zeros, no high-frequency pole.** The Bode signature is exact: $- 20$ dB/dec at low frequency from the integrator, flat at $20 \log K_c$ between the two zeros, and $+ 20$ dB/dec above them, terminating at whatever filter is fitted. The zeros are
$$
\omega_{1,2} = \frac{1 \mp \sqrt{1 - 4 T_d / T_i}}{2 T_d},
\qquad
\omega_z = \frac{1}{\sqrt{T_d T_i}},
\qquad
\zeta_z = \frac{1}{2} \sqrt{ \frac{T_i}{T_d} } ,
$$
so the zeros are **real** when $T_i \ge 4 T_d$ and a complex pair below that. $\checkmark$
**Why the ratio matters.** A complex zero pair contributes a resonant **peak** to the controller's magnitude and, worse, a fast phase **lead** that the designer did not ask for and cannot place. More directly, the closed-loop transfer function inherits the controller's zeros as its own, and a complex zero pair with $\zeta_z = 0.3$ adds an overshoot of its own to whatever the poles contribute. This is why the practical rule $T_d \le T_i / 4$ is quoted, and why a controller whose $T_d$ and $T_i$ have been tuned independently — by a commissioning engineer moving one knob at a time — often has a step response with a large overshoot that nobody can explain from the loop's stability margins, which are perfectly good. $\checkmark$
**The ceiling.** With a filtered derivative the controller's high-frequency gain tends to $K_c \left( 1 + N \right)$ instead of growing without limit, so the derivative's noise amplification is set by the filter ratio $N$ and not by $T_d$. The proportional-plus-filtered-derivative part is $1 + T_d s / \left( \tau_f s + 1 \right) = \left[ 1 + \left( T_d + \tau_f \right) s \right] / \left( 1 + \tau_f s \right)$, a lead network, and the phase it supplies at the crossover is
$$
\Delta \varphi = \arctan \left[ \omega_{gc} \left( T_d + \tau_f \right) \right] - \arctan \left( \omega_{gc} \tau_f \right),
$$
which for $\tau_f \ll 1 / \omega_{gc}$ reduces to the ideal $\arctan \left( \omega_{gc} T_d \right)$ and can never exceed $\arcsin \left[ N / \left( N + 2 \right) \right]$ — $56^{\circ}$ for $N = 10$ — rather than approaching $90^{\circ}$. The design rule that follows is $T_d$ of the order of $1 / \omega_{gc}$, which already buys $45^{\circ}$: beyond that the derivative supplies little more phase, more noise and a zero pair that must be watched. $\checkmark$
:::

::: definition Integral windup and its cures {#def-windup}
When the actuator saturates, the loop is **open** and the controller does not know it. The integrator continues to accumulate against a process that is no longer responding, and the controller's internal state — the integrator's value — diverges far beyond the value that would have kept the output at its limit. The excess must be unwound before the loop regains authority, and the unwinding time is
$$
t_{\text{recovery}} \approx \frac{T_i}{K_c} \cdot \frac{u_{\text{excess}}}{\left| e \right|} ,
$$
which for a large excess is minutes, not seconds. Three cures, in order of merit:
**Back-calculation.** Feed the difference between the demanded and the delivered output back to the integrator through a gain $1 / T_t$,
$$
\frac{\mathrm{d} x_i}{\mathrm{d} t} = \frac{K_c}{T_i} e + \frac{1}{T_t} \left( u_{\text{actual}} - u_{\text{demanded}} \right),
$$
which pins the integrator to the value consistent with saturation and lets it resume from there. $T_t = T_i$ is safe; for a PID, $T_t = \sqrt{T_i T_d}$ is a common faster choice.
**Conditional integration.** Freeze the integrator whenever the output is saturated **and** the error has the sign that would drive it further. Cheap, and wrong when the error is noisy.
**External reset (anti-windup feedback).** Use the measured actuator position as the integrator's limit reference — the right answer when the true limit is a valve's travel and not the controller's clamp.
:::

## Tuning rules and what they actually deliver

::: definition The tuning-rule family {#def-tuning}
Given a plant identified as first-order plus delay, $K \mathrm{e}^{- \theta s} / \left( \tau s + 1 \right)$, and writing $\rho = \theta / \tau$:

| Rule | $K_c$ | $T_i$ | $T_d$ | Targets |
|---|---|---|---|---|
| Ziegler-Nichols (open loop, PID) | $1.2 \tau / \left( K \theta \right)$ | $2 \theta$ | $\theta / 2$ | quarter-amplitude decay |
| Ziegler-Nichols (closed loop, PI) | $0.45 K_u$ | $P_u / 1.2$ | — | quarter-amplitude decay |
| Ziegler-Nichols (closed loop, PID) | $0.6 K_u$ | $P_u / 2$ | $P_u / 8$ | quarter-amplitude decay |
| Cohen-Coon (PI) | $\dfrac{\tau}{K \theta} \left( 0.9 + \dfrac{\rho}{12} \right)$ | $\theta \dfrac{30 + 3 \rho}{9 + 20 \rho}$ | — | quarter-amplitude decay |
| Chien-Hrones-Reswick (PID, setpoint, 0 % overshoot) | $0.6 \tau / \left( K \theta \right)$ | $\tau$ | $\theta / 2$ | setpoint tracking, no overshoot |
| Lambda / SIMC (PI) | $\dfrac{\tau}{K \left( \lambda + \theta \right)}$ | $\min \left( \tau , 4 \left( \lambda + \theta \right) \right)$ | — | closed-loop time constant $\lambda$ |

The closed-loop Ziegler-Nichols rule needs only the ultimate gain $K_u$ and period $P_u$ measured by pushing the loop to sustained oscillation, which is why it was the field rule for eighty years and why it is still the wrong answer whenever the loop is allowed to be tuned more carefully. The **lambda** rule (in the form given, Skogestad's SIMC rule, whose $\min$ keeps the integral time from becoming too long on lag-dominant plants) contains a continuous design parameter $\lambda$ — the desired closed-loop time constant — and is the only rule in the table that lets the designer choose how much margin to buy. $\lambda = \theta$ is the usual starting point and gives a sensitivity peak of about $1.6$ on a lag-dominant plant; a larger $\lambda$ buys more margin, while $\lambda = 0.5 \theta$ already pushes the peak towards $2$.
:::

::: widget plot
f: 0.5*sqrt(1/x)
x: 0.01, 1
y: 0, 3
labels: zeta_z / 1
caption: The damping ratio of a PID's own pair of zeros against the ratio Td over Ti. The curve crosses one at the ratio of 0.25, which is the boundary between real zeros and a complex pair, and it is the reason the constraint Td at or below Ti over four is quoted as a tuning rule in its own right. A controller left with Td over Ti of 0.5 has complex zeros with a damping ratio of 0.71, and complex controller zeros can add setpoint overshoot of their own while the stability margins look fine — a combination that sends commissioning engineers looking in the wrong places.
:::

::: example Four tunings of one oven {#ex-tunings}
The reflow-oven zone of the last lesson, $K = 0.8\ {}^{\circ}\mathrm{C}$ per per-cent, $\tau = 45\ \mathrm{s}$, $\theta = 12\ \mathrm{s}$, is to be tuned four ways. Compare.
::: solution
**Ultimate gain and period.** The phase condition $\omega \theta + \arctan \left( \omega \tau \right) = 180^{\circ}$ gives $\omega_u = 0.1437\ \mathrm{rad / s}$, so
$$
P_u = 43.7\ \mathrm{s}, \qquad
K_u = \frac{\sqrt{1 + \left( \omega_u \tau \right)^{2}}}{K} = \frac{6.54}{0.8} = 8.18 .
$$
**The four settings** (ZN-PID from $0.6 K_u$, $P_u / 2$, $P_u / 8$; ZN-PI from $0.45 K_u$, $P_u / 1.2$; lambda from the table; the last row is the frequency-response design of [[control-systems/frequency-response#ex-design-oven]]):

| Tuning | $K_c$ | $T_i$ | $T_d$ | $\omega_{gc}$ | $\varphi_m$ | $M_s$ |
|---|---|---|---|---|---|---|
| ZN-PID | $4.91$ | $21.9$ | $5.47$ | $0.085$ | $42^{\circ}$ | $2.38$ |
| ZN-PI | $3.68$ | $36.4$ | — | $0.067$ | $40^{\circ}$ | $2.36$ |
| Lambda, $\lambda = \theta$ | $2.34$ | $45$ | — | $0.042$ | $61^{\circ}$ | $1.59$ |
| Frequency-designed | $1.64$ | $45$ | — | $0.029$ | $70^{\circ}$ | $1.37$ |

**Reading the table.** The Ziegler-Nichols settings give a crossover nearly three times higher than the frequency design — and a sensitivity peak of $2.4$ against $1.4$. That peak is a $7.5\ \mathrm{dB}$ amplification of load disturbances at its frequency, and it is the whole of the difference between a loop that settles and a loop that rings.
**Why the phase margin is not the whole story.** The ZN-PID's $\varphi_m = 42^{\circ}$ at $0.085\ \mathrm{rad / s}$ and its $M_s = 2.38$ at $0.19\ \mathrm{rad / s}$ are both real, and the second number is the one that shows up in the product. The derivative's zero has pushed the loop gain back **up** at high frequency, so the magnitude curve is close to $0\ \mathrm{dB}$ over a broad band instead of crossing it once, and the distance to the critical point is much smaller than the phase margin suggests. This is the standard reason to quote $M_s$ rather than the two margins.

*Check.* Recomputing $M_s$ for the ZN-PI settings from $S = 1 / \left( 1 + L \right)$ over a frequency sweep gives $2.36$ at $0.104\ \mathrm{rad / s}$. A simulated setpoint step overshoots by $37\ \%$ with the ZN-PI settings and by $52\ \%$ with the ZN-PID (derivative on the measurement, $N = 10$), against $4\ \%$ for the lambda tuning and none for the frequency design. $\checkmark$

*Sanity.* The reason Ziegler-Nichols survives is that it is **measurable**: no model, no analyser, just the panel and a stopwatch, and a loop that oscillates is an unambiguous thing to observe. The reason it should usually be replaced is that its target — quarter-amplitude decay — was chosen in 1942 for pneumatic controllers tuned by hand, and it trades robustness for speed in a way few modern applications want. Where the loop must be fast, the lambda rule with $\lambda$ chosen from the required disturbance rejection is the honest method, and where the plant's $\rho = \theta / \tau$ is large — it is only $0.27$ here — no PID can give a well-damped response above a crossover of roughly $1 / \left( 2 \theta \right)$, and the answer for a dominant delay is a Smith predictor or a model-based controller.
:::
:::

::: example Windup during a door opening {#ex-windup}
The oven of [[#ex-tunings]] holds $95\ {}^{\circ}\mathrm{C}$ in a $25\ {}^{\circ}\mathrm{C}$ room with the ZN-PI settings, $K_c = 3.68$ and $T_i = 36.4\ \mathrm{s}$, and a heater limited to $0$–$100\ \%$. A door is opened for two minutes, and its cold draught is modelled as a load at the heater input worth $- 30\ {}^{\circ}\mathrm{C}$ at steady state. Compare the recovery with and without back-calculation.
::: solution
**Steady state.** The required output is $\left( 95 - 25 \right) / 0.8 = 87.5\ \%$, leaving only $12.5\ \%$ of headroom.
**The door opens.** The temperature falls and the output runs to $100\ \%$ within seconds; the loop is now open, and the plant heads for $25 + 0.8 \times 100 - 30 = 75\ {}^{\circ}\mathrm{C}$, an error of $20\ {}^{\circ}\mathrm{C}$. By the time the door closes it has reached $76.1\ {}^{\circ}\mathrm{C}$.
**The integrator's rate.** With an error approaching $20\ {}^{\circ}\mathrm{C}$,
$$
\frac{\mathrm{d} u_i}{\mathrm{d} t} = \frac{K_c}{T_i} e = \frac{3.68}{36.4} \times 20 = 2.02\ \% \ \text{per second},
$$
so over the two minutes the integral term accumulates an excess of a couple of hundred per cent. Simulating the loop, the controller's internal demand reaches $328\ \%$ against the $87.5\ \%$ it will need again.
**The door closes.** The output stays at $100\ \%$ for another four minutes while the excess is unwound, and the temperature climbs almost to the plant's saturated steady value,
$$
y_{\text{sat}} = 25 + 0.8 \times 100 = 105\ {}^{\circ}\mathrm{C},
$$
peaking at $104.9\ {}^{\circ}\mathrm{C}$ — a $10\ {}^{\circ}\mathrm{C}$ overshoot of a $95\ {}^{\circ}\mathrm{C}$ soak setpoint.
**With back-calculation** at $T_t = T_i$ the integrator is held near the value consistent with saturation, the output comes off its limit about $50\ \mathrm{s}$ after the door closes, and the peak is $98.2\ {}^{\circ}\mathrm{C}$ — a third of the overshoot. The undershoot during the door-open period is identical, $76.1\ {}^{\circ}\mathrm{C}$, because the actuator is saturated either way; anti-windup buys nothing while the disturbance lasts and everything afterwards.

*Check.* The temperature is back within $0.5\ {}^{\circ}\mathrm{C}$ of setpoint about $100\ \mathrm{s}$ after the door closes with back-calculation and about $360\ \mathrm{s}$ after it without. The two paths differ as well: without anti-windup the loop sails through setpoint to $105\ {}^{\circ}\mathrm{C}$ and comes back down; with it the overshoot is small and brief. $\checkmark$

*Sanity.* The $10\ {}^{\circ}\mathrm{C}$ overshoot is not a control-systems curiosity; in a reflow oven it is the difference between a good board and a delaminated one, and in an extruder it is degraded resin. Three rules prevent it. The output limits configured in the controller must be the **real** limits, so that the controller knows when it has no authority. The high clamp should leave headroom — a loop that needs $87.5\ \%$ at rest has $12.5\ \%$ for the whole of its disturbance rejection, which is a design error in the heater and not in the tuning. And the alarm on "controller output at limit for more than five minutes" is the only thing that tells the operator what has happened, because the temperature trace looks merely sluggish until the overshoot arrives.
:::
:::

::: proof Back-calculation and the recovery time {#proof-backcalc}
With back-calculation the integrator state obeys
$$
T_t \frac{\mathrm{d} x_i}{\mathrm{d} t} = \frac{T_t K_c}{T_i} e + \left( u_{\text{act}} - u_{\text{dem}} \right) .
$$
During saturation $u_{\text{act}}$ is constant at the limit and $u_{\text{dem}} = u_p + x_i$, so with $x_i^{*}$ the value that would give $u_{\text{dem}} = u_{\text{act}}$,
$$
T_t \frac{\mathrm{d} x_i}{\mathrm{d} t} = T_t \frac{K_c}{T_i} e - \left( x_i - x_i^{*} \right)
\quad\Longrightarrow\quad
x_i \rightarrow x_i^{*} + \frac{T_t K_c}{T_i} e
$$
with time constant $T_t$. The integrator therefore tracks the saturated value to within a bounded offset of $T_t K_c e / T_i$ instead of diverging, and on desaturation the loop resumes from there instead of first having to unwind the accumulated excess. $\checkmark$
**Choosing $T_t$.** Small $T_t$ tracks tightly but makes the integrator follow every brief excursion into saturation, including those caused by noise; large $T_t$ lets the integrator wander further before it is pulled back. $T_t = T_i$ is a safe default, and Åström and Hägglund suggest $T_t$ between $T_d$ and $T_i$, for example $\sqrt{T_i T_d}$, when the controller has derivative action. These are rules of thumb rather than optima. $\checkmark$
:::

::: definition Cascade control {#def-cascade}
Two loops, two measurements, two controllers: an **outer** (master) controller whose output is the **setpoint** of an inner (slave) controller, the inner loop enclosing the faster and better-measured part of the process.
$$
\text{error} \rightarrow \boxed{C_{\text{outer}}} \rightarrow y_{sp,\text{inner}} \rightarrow \boxed{C_{\text{inner}}} \rightarrow u \rightarrow \left[ G_{\text{inner}} \right] \rightarrow y_{\text{inner}} \rightarrow \cdots \rightarrow y_{\text{outer}}
$$
Three rules govern the design. The inner loop must be **five to ten times faster** than the outer, so that its closed loop is a near-unity gain over the outer loop's bandwidth and the two loops do not interact. The inner loop must enclose the **dominant disturbance** — that is the entire point of the structure. And the inner controller must be tuned **first**, with the outer loop open, because an untuned inner loop presents a resonant load to the outer.
The structure's cost is an extra transmitter and an extra tuning, and its failure mode is an inner loop that is not actually faster, in which case the two loops interact and the outer one can oscillate however carefully each was tuned on its own.
:::

::: example A jacketed reactor {#ex-cascade}
A stirred reactor is heated by jacket steam and controlled on reactor temperature. Steam-supply pressure fluctuations disturb the jacket temperature in seconds and the reactor temperature in minutes. The jacket responds to the steam valve with a gain of $0.4\ {}^{\circ}\mathrm{C}$ per per cent, a $40\ \mathrm{s}$ time constant and a $5\ \mathrm{s}$ delay; the reactor responds to the jacket temperature with a gain of $1.2\ {}^{\circ}\mathrm{C}$ per ${}^{\circ}\mathrm{C}$ (the reaction heat amplifies it), a $900\ \mathrm{s}$ time constant and a $60\ \mathrm{s}$ delay. Design the structure and tune it with the lambda rule.
::: solution
**Structure.** Inner loop on **jacket temperature** (or on steam-flow, which is faster still), outer loop on reactor temperature. The inner loop's setpoint is the outer controller's output.
**Time-scale separation.** The ratio of the two dominant time constants is $900 / 40 = 22$, comfortably above the rule's five.
**Inner tuning.** Lambda with $\lambda = \theta = 5\ \mathrm{s}$:
$$
K_{c,i} = \frac{40}{0.4 \times 10} = 10.0, \qquad T_{i,i} = 40\ \mathrm{s} .
$$
**Outer tuning.** With the inner loop closed the jacket follows its setpoint with unity gain, roughly as a first-order lag of $\lambda = 5\ \mathrm{s}$ after its own $5\ \mathrm{s}$ delay. Treating those $10\ \mathrm{s}$ as extra effective delay gives the outer plant $\theta^{\prime} = 60 + 10 = 70\ \mathrm{s}$ and $\tau = 900\ \mathrm{s}$, and with $\lambda = \theta^{\prime}$:
$$
K_{c,o} = \frac{900}{1.2 \times \left( 70 + 70 \right)} = 5.4, \qquad T_{i,o} = \min \left( 900 , 4 \times 140 \right) = 560\ \mathrm{s} .
$$
**Disturbance rejection.** A steam-header pressure drop worth $10\ {}^{\circ}\mathrm{C}$ of jacket temperature at steady state is caught by the inner loop: a simulation shows the jacket deviation peaking at only $2.0\ {}^{\circ}\mathrm{C}$ after about $20\ \mathrm{s}$ and falling below $1\ {}^{\circ}\mathrm{C}$ within $50\ \mathrm{s}$. The reactor sees only the integral of that brief deviation (about $100\ {}^{\circ}\mathrm{C\, s}$) through its $900\ \mathrm{s}$ lag, a deviation of about $0.1\ {}^{\circ}\mathrm{C}$ even before the outer loop acts. Without cascade the full $10\ {}^{\circ}\mathrm{C}$ jacket change would persist until the slow outer loop corrected it, and the reactor would drift towards a $12\ {}^{\circ}\mathrm{C}$ error on a time scale of many minutes.

*Check.* The inner loop's sensitivity peak at $\lambda = \theta$ is $M_s = 1.59$ — acceptable but not luxurious, and the reason a jacket loop is often detuned to $\lambda = 1.5 \theta$ when the outer loop is slow, at which point $M_s = 1.44$. $\checkmark$

*Sanity.* The alternative inner variable is **steam flow**, which is faster still and rejects supply-pressure changes before they reach the jacket at all. Its drawback is that a flow loop does not see disturbances that act on the jacket itself — fouling, a change in condensate removal, a change in the reactor's own heat demand — and flow signals are noisy and depend on the steam's density. The rule of thumb is that the inner loop should enclose the disturbance that matters most and use a measurement that is fast and reliable; many plants use both, a steam-flow loop inside a jacket-temperature loop inside the reactor-temperature loop.
:::
:::

::: example Feedforward plus feedback {#ex-feedforward}
A shell-and-tube heat exchanger heats a product stream from $60$ to $85\ {}^{\circ}\mathrm{C}$. The measured disturbances are the product flow $q$ and the inlet temperature $T_{in}$; the manipulated variable is the steam valve. Design the feedforward and check what it leaves for the feedback controller.
::: solution
**Static feedforward.** At steady state the required duty is $Q = q \rho c_p \left( 85 - T_{in} \right)$, and if the steam valve's gain to duty is $K_h$,
$$
u_{ff} = \frac{q \rho c_p}{K_h} \left( 85 - T_{in} \right) .
$$
**Dynamic matching.** The product path (flow to outlet temperature) and the steam path (valve to outlet temperature) have different dynamics. With both modelled as first order plus delay, $G_d = K_d \mathrm{e}^{- \theta_d s} / \left( \tau_d s + 1 \right)$ and $G = K \mathrm{e}^{- \theta s} / \left( \tau s + 1 \right)$, the ideal feedforward is $- G_d / G$, with
$$
\frac{G_d (s )}{G (s )} = \frac{K_d}{K} \cdot \frac{1 + \tau s}{1 + \tau_d s} \cdot \mathrm{e}^{- \left( \theta_d - \theta \right) s} .
$$
With $\tau_d = 90\ \mathrm{s}$, $\theta_d = 20\ \mathrm{s}$ for the flow path and $\tau = 40\ \mathrm{s}$, $\theta = 8\ \mathrm{s}$ for the steam path, the compensator is a lead-lag plus delay,
$$
\frac{G_d}{G} = \frac{K_d}{K} \cdot \frac{1 + 40 s}{1 + 90 s} \mathrm{e}^{- 12 s},
$$
which is realisable because the disturbance path has the **longer** delay, so the correction can wait $12\ \mathrm{s}$ and still arrive on time. Had the steam path had the longer delay, the ideal compensator would need a negative delay — a prediction — and the standard compromise is to drop the delay term and leave the mismatch to the feedback loop.
**What is left.** A perfect feedforward would leave nothing. In practice the gains are wrong by ten per cent — $K_h$ varies with condensate loading and the exchanger fouls — so the feedback controller's job is to correct the **residual**, which is a step of order $0.1 \times Q$ rather than the full disturbance. For a $20\ \%$ flow increase with no correction at all, the outlet would fall by $0.2 \times 25 = 5\ {}^{\circ}\mathrm{C}$; the feedforward leaves a residual of about $0.1 \times 5 = 0.5\ {}^{\circ}\mathrm{C}$ for the feedback controller to remove.
**The consequence for tuning.** Because the feedback loop now handles residuals and not full steps, it can be tuned more conservatively — a lower crossover and a lower sensitivity peak — which also reduces the valve's travel and wear.

*Check.* At $\omega = 0.02\ \mathrm{rad / s}$ the steam path has a phase of $- \arctan 0.8 - 0.16\ \mathrm{rad} = - 38.7^{\circ} - 9.2^{\circ} = - 47.8^{\circ}$ and the flow path $- \arctan 1.8 - 0.40\ \mathrm{rad} = - 60.9^{\circ} - 22.9^{\circ} = - 83.9^{\circ}$. The compensator contributes $\arctan 0.8 - \arctan 1.8 - 0.24\ \mathrm{rad} = - 22.2^{\circ} - 13.8^{\circ} = - 36.0^{\circ}$, and $- 47.8^{\circ} - 36.0^{\circ} = - 83.8^{\circ}$ matches the flow path, as it must. $\checkmark$

*Sanity.* Feedforward's arithmetic is easy and its economics are entirely in the **measurement**: a flow meter that must be bought, installed and calibrated, against the off-specification product that the feedback loop alone would let through. The rule that decides it is that feedforward pays when the disturbance is **large, measurable and fast** — a flow or an inlet temperature — and does not pay for a slow unmeasurable drift. And the failure mode to guard against is a failed transmitter: a feedforward path driven by a flow meter that has gone to zero will drive the steam valve to its stop, which is why a feedforward design carries a transmitter-health check that reverts to pure feedback when the measurement fails.
:::
:::

::: example Design {#ex-design-moulder}
An injection-moulding nozzle zone is a $2.4\ \mathrm{kW}$ band heater on about $1.6\ \mathrm{kg}$ of steel (heat capacity about $0.8\ \mathrm{kJ / K}$). A step test that raises the heater output by $10\ \%$ at $180\ {}^{\circ}\mathrm{C}$ gives, after a delay of $15\ \mathrm{s}$, an initial slope of $0.30\ {}^{\circ}\mathrm{C / s}$ and a time constant of $190\ \mathrm{s}$. The specification is a soak temperature held to $\pm 1\ {}^{\circ}\mathrm{C}$ against a $20\ \%$ change in screw speed, no significant overshoot of the setpoint, and a heater switched by a solid-state relay with a $2\ \mathrm{s}$ burst-fire period on $50\ \mathrm{Hz}$ mains. Design the loop.
::: solution
**Model.** $K = 0.30 \times 190 / 10 = 5.7\ {}^{\circ}\mathrm{C}$ per per cent, $\tau = 190\ \mathrm{s}$, $\theta = 15\ \mathrm{s}$, so $\rho = 0.079$ — an easy plant by delay, a hard one by actuator. (Consistency: $10\ \%$ of $2.4\ \mathrm{kW}$ is $240\ \mathrm{W}$, and $240 / 800 = 0.30\ {}^{\circ}\mathrm{C / s}$.)
**Structure.** Temperature control on the zone, with **feedforward** of screw speed, which is measured, large and fast. No derivative: the delay is short and the sensor is slow.
**Feedback tuning.** Lambda with $\lambda = 2 \theta = 30\ \mathrm{s}$ for a detuned, non-overshooting response:
$$
K_c = \frac{190}{5.7 \times 45} = 0.74, \qquad
T_i = \min \left( 190 , 4 \times 45 \right) = 180\ \mathrm{s} .
$$
**Actuator constraint.** A burst-fired relay with a $2\ \mathrm{s}$ period on $50\ \mathrm{Hz}$ mains switches whole cycles, $100$ per period, so it quantises the output to $1\ \%$ steps. The controller's output noise from a $0.2\ {}^{\circ}\mathrm{C}$ sensor noise is $K_c \times 0.2 = 0.15\ \%$, well below the quantisation, so no deadband is needed — but a **derivative** with $N = 10$ would have amplified it roughly elevenfold, to about $1.6\ \%$, more than a whole step, and would have made the relay chatter.
**Disturbance.** A $20\ \%$ screw-speed increase carries away extra heat equivalent to about $2.7\ \%$ of heater output ($65\ \mathrm{W}$). A simulation of the PI loop shows a peak deviation of $0.98\ {}^{\circ}\mathrm{C}$ per per cent of such a load, about a minute after it arrives, so $2.7\ {}^{\circ}\mathrm{C}$ — outside the $\pm 1\ {}^{\circ}\mathrm{C}$ specification, and retuning cannot fix it without giving up the margin the actuator needs. Feedforward of screw speed, with a static gain fitted from the machine's own specific-energy curve, removes about eighty-five per cent of it, leaving $0.4\ {}^{\circ}\mathrm{C}$.
**No overshoot.** The lambda tuning with $\lambda = 2 \theta = 30\ \mathrm{s}$ gives $\omega_{gc} = 0.022\ \mathrm{rad / s}$, $\varphi_m = 70^{\circ}$ and $M_s = 1.35$; a simulated setpoint step overshoots by less than one per cent.

*Design comment.* The interesting constraint here is not the loop but the **relay**. A $1\ \%$ output step is a $5.7\ {}^{\circ}\mathrm{C}$ change in steady temperature, so the heater's own quantisation is already a large fraction of the $\pm 1\ {}^{\circ}\mathrm{C}$ band, and any controller action that makes the output jump by more than a step or two on sensor noise cycles the heater hard for no benefit. The design therefore trades bandwidth for actuator life, and the specification's $\pm 1\ {}^{\circ}\mathrm{C}$ is met by the feedforward rather than by the feedback. The second thing worth stating is that **zone-to-zone coupling** — neighbouring zones at different temperatures conduct heat along the barrel — is a disturbance that a multivariable controller would handle and a set of single loops handles by each zone partly correcting for the other; the usual practical answer is to insulate between zones and tune each loop conservatively.
:::
:::

::: history
The three-term controller predates much of the theory that explains it. **Nicolas Minorsky**'s 1922 paper *"Directional stability of automatically steered bodies"*, written from observing helmsmen steering ships, gave the first theoretical analysis of proportional, integral and derivative actions for automatic ship steering. Pneumatic process controllers with proportional and reset (integral) action spread through industry in the 1930s, and by around 1940 controllers offering all three actions were commercial products. **John Ziegler and Nathaniel Nichols** of Taylor Instrument Companies published *"Optimum settings for automatic controllers"* in 1942 — a closed-loop ultimate-sensitivity test and an open-loop reaction-curve method, each with a table of settings — and it became one of the most cited papers in process control. **Cohen and Coon**'s 1953 paper *"Theoretical consideration of retarded control"* refined the reaction-curve rules for plants with delay, and **Chien, Hrones and Reswick**'s 1952 paper gave settings indexed by overshoot for setpoint and load changes. **Otto J. M. Smith**'s 1957 predictor made delay compensation possible. The internal-model-control route to PID tuning, from which the lambda rules descend, is **Rivera, Morari and Skogestad**'s 1986 paper, and **Skogestad**'s 2003 SIMC rules are the form given in the tuning table. **Åström and Hägglund**'s 1984 relay-feedback autotuner revived the Ziegler-Nichols idea with a relay in place of a hand test and found its way into many commercial controllers; their later work helped make the sensitivity peak a standard design target.
:::

::: quiz
A PID's derivative term is implemented with a filter, $T_d s \rightarrow T_d s / \left( \tau_f s + 1 \right)$. What sets the controller's high-frequency gain?
- [x] $K_c \left( 1 + N \right)$ where $N = T_d / \tau_f$ — the filter ratio, not the derivative time
- [ ] $K_c T_d$, the derivative time alone
- [ ] $K_c / T_i$, the integral time alone
- [ ] The high-frequency gain is unbounded whatever is done
::: solution
The filtered derivative's gain tends to $T_d / \tau_f = N$, so with the proportional term the controller's gain tends to $K_c \left( 1 + N \right)$ and stops there. That is why $N$ — typically five to twenty — is the parameter that decides how much sensor noise reaches the valve, and why changing $T_d$ with $N$ held fixed changes the phase supplied at the crossover without changing the high-frequency noise gain.
:::
:::

## Where this leads

The tuning rules of this lesson are the frequency-domain design of [[control-systems/frequency-response]] compressed into a table, the sensitivity peak they trade against is the waterbed of [[control-systems/feedback-stability]], the sampling period that a burst-fired relay imposes is the subject of [[control-systems/digital-control]], and the cascade structure's inner loop is the first-order model of [[control-systems/modelling-dynamic-systems]].

::: summary
- The PID is one integrator pole and two zeros; the zeros are real only when Ti is at least four times Td, and a complex pair adds overshoot that the stability margins do not reveal.
- The derivative must act on the measurement and must be filtered; its noise gain is set by the filter ratio N and not by Td.
- Ziegler-Nichols targets quarter-amplitude decay and on a typical lag-dominant plant delivers a sensitivity peak near 2.4; lambda tuning with a chosen closed-loop time constant is the rule in the family that lets the designer buy margin deliberately.
- A saturated actuator opens the loop and the integrator winds up; back-calculation with Tt of order Ti bounds the excess and shortens the recovery several-fold.
- Cascade puts a fast, well-measured inner loop around the dominant disturbance and requires a five-to-ten times separation of time scales; feedforward removes a measured disturbance from the feedback loop's workload and lets the feedback loop be detuned.
- In practice the binding constraint is usually the actuator — a valve's deadband, a relay's burst period, a heater's supply limit — and the tuning follows from that, not from the plant.
:::

## Exercises

::: exercise Series form {level=1 check="0.25"}
A series-form PID has $T_i = 20\ \mathrm{s}$ and $T_d = 5\ \mathrm{s}$. By what fraction is its proportional gain larger than that of an ideal-form PID with the same three numbers? (Enter the fraction as a decimal.)
::: solution
The extra constant term is $T_d / T_i = 5 / 20 = 0.25$, so the effective proportional gain is $K_c \left( 1 + 0.25 \right)$, twenty-five per cent larger.
:::
:::

::: exercise Derivative filter {level=1 check="0.4"}
A PID has $T_d = 4\ \mathrm{s}$ and a derivative filter with $N = 10$. What is the filter's time constant, in seconds?
::: solution
$\tau_f = T_d / N = 0.4\ \mathrm{s}$.
:::
:::

::: exercise Ziegler-Nichols {level=1 check="36.4"}
A loop pushed to sustained oscillation oscillates with an ultimate period of $43.7\ \mathrm{s}$. What is the Ziegler-Nichols integral time for a PI controller, in seconds?
::: solution
$T_i = P_u / 1.2 = 36.4\ \mathrm{s}$.
:::
:::

::: exercise Lambda {level=1 check="96"}
In lambda tuning with $\lambda = \theta = 12\ \mathrm{s}$ and a plant time constant of $\tau = 190\ \mathrm{s}$, the integral time is $T_i = \min \left( \tau , 4 \left( \lambda + \theta \right) \right)$. Which branch binds, and what is $T_i$ in seconds?
::: solution
$4 \left( 12 + 12 \right) = 96 < 190$, so the second branch binds and $T_i = 96\ \mathrm{s}$ — and for the moulder of [[#ex-design-moulder]] with $\lambda = 30\ \mathrm{s}$ and $\theta = 15\ \mathrm{s}$ it is $4 \times 45 = 180\ \mathrm{s}$.
:::
:::

::: exercise Zeros {level=2}
A PID has $T_i = 12\ \mathrm{s}$ and $T_d = 4\ \mathrm{s}$. Are its zeros real or complex, and what is their damping ratio?
::: solution
$T_i / T_d = 3 < 4$, so the zeros are a complex pair with $\zeta_z = 0.5 \sqrt{3} = 0.87$ — complex but well damped.
*Sanity.* The damping ratio is what matters and not the mere fact of complexity: a zero pair with $\zeta_z = 0.87$ behaves almost like two real zeros and its effect on the response is small, while $\zeta_z = 0.3$ can add a large overshoot. The rule $T_d \le T_i / 4$ is therefore conservative, and the reason it is still taught is that it is one inequality to remember and the arithmetic of the exact zeros is not.
:::
:::

::: exercise Ultimate gain {level=2 check="4.25"}
A plant $2 \mathrm{e}^{- 8 s} / \left( 40 s + 1 \right)$ is closed with proportional control. Find the ultimate gain and period. (Enter the ultimate gain.)
::: solution
Solve $8 \omega + \arctan \left( 40 \omega \right) = \pi$: $\omega_u = 0.211\ \mathrm{rad / s}$, $P_u = 29.8\ \mathrm{s}$, and
$$
K_u = \frac{\sqrt{1 + \left( 40 \times 0.211 \right)^{2}}}{2} = \frac{8.51}{2} = 4.25 .
$$
*Sanity.* The ultimate period of $29.8\ \mathrm{s}$ is $3.7$ times the delay. For any first-order-plus-delay plant the ratio lies between two (delay-dominant) and four (lag-dominant), because the lag contributes between $0^{\circ}$ and $90^{\circ}$ of the $180^{\circ}$: a loop that oscillates at a measured period therefore tells you the delay to within a factor of two before any other test is done.
:::
:::

::: exercise Windup {level=2 check="300"}
A PI controller with $K_c = 2.5$ and $T_i = 60\ \mathrm{s}$ saturates at $100\ \%$ with a constant error of $8$ units. How fast does its integrator accumulate, and how long would it take to build up a $100\ \%$ excess? (Enter the time in seconds.)
::: solution
$\mathrm{d} u_i / \mathrm{d} t = K_c e / T_i = 2.5 \times 8 / 60 = 0.33\ \%$ per second, so a $100\ \%$ excess in $300\ \mathrm{s}$.
*Sanity.* Five minutes of hidden accumulation, unwound at the same rate once the error reverses, is the reason a loop that was saturated during a start-up misbehaves for ten minutes afterwards and why the diagnosis is always "someone changed the setpoint too fast".
:::
:::

::: exercise Cascade {level=2 check="120"}
An outer loop has a dominant time constant of $600\ \mathrm{s}$. What is the slowest inner closed-loop time constant that satisfies the five-times separation rule, and what does the inner loop's closed-loop response do to the outer loop's delay? (Enter the time constant in seconds.)
::: solution
$600 / 5 = 120\ \mathrm{s}$ is the slowest allowed inner closed-loop time constant, and in practice the inner loop is made ten times faster, at $60\ \mathrm{s}$. Its closed loop then behaves roughly as a first-order lag of time constant $\lambda$ after its own delay, and that lag plus delay is added as extra effective delay to the outer plant, which must be included in the outer tuning.
*Sanity.* The added delay is a cost of cascade that is easy to forget, and it is why an inner loop tuned too slowly can make the outer loop **worse** than no cascade at all: the inner loop's $\lambda + \theta$ can easily exceed the outer plant's own delay, at which point the outer controller's phase margin has been spent buying nothing.
:::
:::

::: exercise Derivation {level=3}
Derive the lambda tuning rule for a PI controller on a first-order-delay plant by requiring the closed loop formed with the plant's **delay-free** model to be $1 / \left( \lambda s + 1 \right)$, and find the phase margin when the delay is put back.
::: solution
Requiring the closed loop $C G / \left( 1 + C G \right)$ to equal $1 / \left( \lambda s + 1 \right)$ is the same as requiring the open loop to be $1 / \left( \lambda s \right)$:
$$
C (s ) G_{\text{model}} (s ) = K_c \frac{T_i s + 1}{T_i s} \cdot \frac{K}{\tau s + 1} = \frac{1}{\lambda s} ,
$$
which holds exactly when the controller's zero cancels the plant's pole and the remaining integrator is scaled:
$$
T_i = \tau , \qquad \frac{K K_c}{T_i s} = \frac{1}{\lambda s}
\quad\Longrightarrow\quad
\boxed{ K_c = \frac{\tau}{K \lambda}, \quad T_i = \tau } .
$$
The true loop gain is this multiplied by the delay that the model did not contain, $L = \mathrm{e}^{- \theta s} / \left( \lambda s \right)$, which crosses over at $\omega_{gc} = 1 / \lambda$ with
$$
\varphi_m = 90^{\circ} - \omega_{gc} \theta = 90^{\circ} - \frac{\theta}{\lambda}\ \text{rad},
$$
only $33^{\circ}$ at $\lambda = \theta$. Repeating the derivation with the delay approximated in the model by $\mathrm{e}^{- \theta s} \approx 1 - \theta s$ gives $K_c = \tau / \left[ K \left( \lambda + \theta \right) \right]$, the form in the tuning table, for which $\omega_{gc} = 1 / \left( \lambda + \theta \right)$ and $\varphi_m = 90^{\circ} - \theta / \left( \lambda + \theta \right)\ \text{rad} = 61.4^{\circ}$ at $\lambda = \theta$. Requiring $\varphi_m \ge 60^{\circ}$ with this form gives $\lambda \gtrsim \theta$.
*Sanity.* The derivation makes the rule's two weaknesses explicit. It **cancels the plant's pole**, so a plant whose time constant changes by thirty per cent is no longer cancelled and the loop is mistuned in a specific and predictable way; and it **assumes the delay is known and constant**, so a plant whose delay varies with throughput — a pipe, a dryer, a web line — is mistuned at one end of its range. Both weaknesses are why model-matching tunings are detuned in practice to $\lambda \ge \theta$ rather than run at the theoretical limit.
:::
:::

::: exercise Design {level=3 check="4.7"}
A distillation column's reboiler duty loop has $K = 0.4\ {}^{\circ}\mathrm{C}$ per MW, $\tau = 900\ \mathrm{s}$, $\theta = 120\ \mathrm{s}$. The composition controller on the tray has a $2400\ \mathrm{s}$ time constant and cannot tolerate a reboiler oscillation with a period shorter than $3000\ \mathrm{s}$. Design the inner loop with the lambda rule and check the constraint. (Enter the final controller gain in MW per ${}^{\circ}\mathrm{C}$.)
::: solution
**Inner loop.** Lambda with $\lambda = \theta = 120\ \mathrm{s}$:
$$
K_c = \frac{900}{0.4 \times 240} = 9.4, \qquad T_i = 900\ \mathrm{s} .
$$
**Bandwidth.** The crossover falls at $\omega_{gc} = 0.00417\ \mathrm{rad / s}$, a period of $1508\ \mathrm{s}$ — shorter than the composition loop's $3000\ \mathrm{s}$ tolerance, so the inner loop must be detuned.
**Detune.** Requiring a period of $3000\ \mathrm{s}$ means $\omega_{gc} \le 0.0021\ \mathrm{rad / s}$, which needs $\lambda \approx 360\ \mathrm{s}$:
$$
K_c = \frac{900}{0.4 \times 480} = 4.7, \qquad T_i = 900\ \mathrm{s} ,
$$
giving a crossover period of $3016\ \mathrm{s}$, $\varphi_m = 76^{\circ}$ and $M_s = 1.25$.
**Check.** $\rho = 120 / 900 = 0.13$, so the plant is delay-friendly and the detune costs little in robustness; but the inner loop's closed-loop response, a lag of $\lambda = 360\ \mathrm{s}$ after a $120\ \mathrm{s}$ delay, is no longer fast compared with the composition plant's own $2400\ \mathrm{s}$, and the outer tuning must allow for it.

*Sanity.* Column control is the classic case where the cascade structure is forced by physics and limited by economics: the reboiler loop must be fast enough to reject steam-pressure changes and slow enough not to fight the composition loop's own very slow dynamics, and the two requirements differ by a factor of two in bandwidth. The industry's answer is a ratio feedforward from steam pressure to the reboiler setpoint, which rejects the pressure disturbance without closing a fast temperature loop at all — a solution that is cheaper than a fast cascade and does not spend the composition loop's margin.
:::
:::
