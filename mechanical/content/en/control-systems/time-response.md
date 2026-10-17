The time response is what the customer feels: how long the machine takes, how far it overshoots, how much error it carries while it is following, and how long it takes to shrug off a disturbance. Everything else in classical design is a means to those four numbers, and in a great deal of industry the design is specified, checked and argued about entirely in their terms.

Three structures cover almost everything. A **first-order** process has one number, its time constant, and the whole of its behaviour is that $63.2$ per cent arrives in one time constant and $98$ per cent in four — which is why a process's time constant is measured with a stopwatch and not with a computer. A **second-order** system has two, and the remarkable fact that its overshoot depends on the damping ratio alone and its settling time on the product $\zeta \omega_n$ alone turns a step test into a measurement of the poles. And an **integrating** process — a level, a position, a speed with no friction — has no steady state at all, so its "gain" is a ramp rate and its controller must contain an integrator to have any hope of holding still.

::: warning A step test measures what you excite, not what you control
Every model identified from a step test is a model of the plant **at that operating point, in that direction, with the rest of the loop held as it was**. The gain of a control valve is the slope of its installed characteristic, which changes by a factor of three between ten and ninety per cent open; the time constant of a temperature loop is the time constant of the sensor when the loop is driven fast and of the whole vessel when it is driven slowly; and a level loop tested with the outlet valve locked gives a pure integrator where the real plant is self-regulating. The identification procedures below are sound, and the reason they so often produce a model that will not tune is not the arithmetic but the test: a step that is too small is lost in noise, one that is too large moves the plant to a different operating point, and one applied with the plant oscillating under automatic control measures the controller. The professional habit is to test in manual, in both directions, at two operating points, and to be suspicious of a model whose parameters come out too clean.
:::

## First order, second order and type

::: definition First-order response and its measurement {#def-first}
A first-order system $K G(s) = K / \left( \tau s + 1 \right)$ responds to a step of size $\Delta u$ with
$$
y (t ) = K \Delta u \left( 1 - e^{- t / \tau} \right),
$$
so $63.2$ per cent of the final change arrives in one time constant, $86.5$ per cent in two and $98.2$ per cent in four. Its rise time from ten to ninety per cent is $\tau \ln 9 = 2.20\, \tau$, and its bandwidth — the frequency at which the magnitude falls by $3\ \mathrm{dB}$ — is $1 / \tau$, giving the useful identity
$$
t_r f_B = \frac{\ln 9}{2 \pi} = 0.35 .
$$
Two numbers are measured from a step: the **gain** $K$ from the final change, and the **time constant** from the shape.
:::

::: definition Second-order response and its four numbers {#def-second}
The standard form
$$
G (s ) = \frac{\omega_n^{2}}{s^{2} + 2 \zeta \omega_n s + \omega_n^{2}}
$$
has a step response
$$
y (t ) = 1 - \frac{e^{- \zeta \omega_n t}}{\sqrt{1 - \zeta^{2}}}
\sin \left( \omega_d t + \arccos \zeta \right),
\qquad \omega_d = \omega_n \sqrt{1 - \zeta^{2}},
$$
and four numbers describe it: the **percentage overshoot**
$M_p = e^{- \pi \zeta / \sqrt{1 - \zeta^{2}}}$, the **rise time** $t_r \approx 1.8 / \omega_n$, the **settling time** to two per cent $t_s \approx 4 / \left( \zeta \omega_n \right)$, and the **peak time** $t_p = \pi / \omega_d$. The overshoot depends on $\zeta$ alone, the settling time on the product $\zeta \omega_n$ alone, and the rise time on $\omega_n$ alone — which is why a step test identifies a pair of poles from three numbers.
:::

::: proof The four numbers of the second-order response {#proof-second}
Write the step response in the equivalent form
$$
y (t ) = 1 - e^{- \zeta \omega_n t} \left( \cos \omega_d t + \frac{\zeta}{\sqrt{1 - \zeta^{2}}} \sin \omega_d t \right) .
$$
Differentiating, the cosine terms cancel and
$$
\dot{y} = \frac{\omega_n}{\sqrt{1 - \zeta^{2}}} e^{- \zeta \omega_n t} \sin \omega_d t ,
$$
which vanishes for $t > 0$ only when $\omega_d t = n \pi$. The first peak is therefore at
$$
t_p = \frac{\pi}{\omega_d} = \frac{\pi}{\omega_n \sqrt{1 - \zeta^{2}}} .
$$
Substituting, with $\cos \pi = - 1$ and $\sin \pi = 0$,
$$
y \left( t_p \right) = 1 + e^{- \zeta \omega_n \pi / \omega_d}
\quad\Longrightarrow\quad
\boxed{ M_p = e^{- \pi \zeta / \sqrt{1 - \zeta^{2}}} } . \qquad \checkmark
$$
For the settling time, the response differs from its final value by at most the envelope $e^{- \zeta \omega_n t} / \sqrt{1 - \zeta^{2}}$, which falls below $0.02$ when
$$
t \ge \frac{\ln \left( 50 / \sqrt{1 - \zeta^{2}} \right)}{\zeta \omega_n}
\approx \frac{3.9}{\zeta \omega_n} \approx \frac{4}{\zeta \omega_n}
$$
for $\zeta$ up to about $0.7$, the square-root factor contributing only $0.2$ to the numerator there. $\checkmark$

*Note.* The envelope argument gives an upper bound and not the settling time, because the oscillation may already be inside the band when the envelope crosses it and because the bound is loose when $\sqrt{1 - \zeta^{2}}$ is small. For $\zeta = 0.9$ the exact two-per-cent settling time is $5.8 / \zeta \omega_n$ against the rule's $4 / \zeta \omega_n$, a forty-five per cent error, because the response is dominated by its slow nearly-real pole and the "envelope" of the fast pair no longer describes it. The practical rule is to use $4 / \zeta \omega_n$ for $\zeta$ below $0.8$ and to compute the response directly above it, which costs nothing and avoids the error exactly where a heavily damped design lives.
:::

::: definition System type and steady-state error {#def-type}
For a unity loop with controller and plant $G_C G = L$, the error to a command is
$$
E (s ) = \frac{R (s )}{1 + L (s )} .
$$
Writing $s^{k} L (s ) \rightarrow K_p$ for $k = 0$, $K_v = \lim s L$ and $K_a = \lim s^{2} L$, the **final value theorem** gives the steady error to the three standard commands, provided the loop is stable:

| Type (pure integrators in $L$) | Step $1$ | Ramp $1 / s$ | Parabolic $1 / s^{2}$ |
|---|---|---|---|
| 0 | $1 / \left( 1 + K_p \right)$ | $\infty$ | $\infty$ |
| 1 | $0$ | $1 / K_v$ | $\infty$ |
| 2 | $0$ | $0$ | $1 / K_a$ |

The **type** is the number of pure integrators in the loop, and it is the only thing that decides whether the error is finite or infinite.
:::

::: proof The error constants and why type is all-powerful {#proof-type}
By the final value theorem, $e_{\infty} = \lim_{s \to 0} s E (s ) = \lim s R (s ) / \left( 1 + L (s ) \right)$, provided $s E (s )$ has no pole on the imaginary axis or in the right half-plane. For a step, $R = 1 / s$, so
$$
e_{\infty} = \lim_{s \to 0} \frac{1}{1 + L (s )} = \frac{1}{1 + K_p},
$$
which is zero only if $K_p = \infty$, that is only if $L$ has a pole at the origin. For a ramp,
$$
e_{\infty} = \lim_{s \to 0} \frac{1}{s + L (s )} = \frac{1}{\lim s L} = \frac{1}{K_v},
$$
finite only if $s L$ tends to a non-zero constant, which needs at least one integrator. Each additional command power of $s$ in the denominator demands one more integrator in the loop. $\checkmark$

*Note.* The proviso is not a technicality: the final value theorem **fails** for an unstable loop, and applying it to an unstable system returns a finite number that means nothing, which is a standard examination trap and a real one, because a simulated error trace that has not yet blown up looks like convergence. The second practical point is that the table is about **pure** integrators. A real plant has a lag, so a "type 1" loop has a finite but very large low-frequency gain rather than an infinite one, and its step error is not zero but $1 / \left( 1 + L_0 \right)$ with $L_0$ the DC loop gain — which is why a specification written as "zero steady error" is really a specification on the DC loop gain, and why an integrator built from an operational amplifier with a bias current drifts, and why industrial controllers use leaky integrators with a reset of a few minutes rather than the ideal one.
:::

::: widget plot
f: exp(-pi*x/sqrt(1-x*x))
x: 0.2, 0.95
y: 0, 0.55
labels: Mp / 1
caption: Percentage overshoot of a second-order system against damping ratio. The curve is steep at low damping and flat above 0.7, which is why overshoot is a good measuring instrument for zeta below 0.5 and a poor one above 0.8 — a five per cent error in reading a five per cent overshoot near zeta of 0.7 is a fifteen per cent error in the damping ratio, and near zeta of 0.9 the overshoot is too small to measure against noise at all.
:::

::: example A thermocouple {#ex-thermo}
A sheathed thermocouple in a furnace has a time constant of $8\ \mathrm{s}$ and a sensitivity of $1.0$. A control system samples it every $2\ \mathrm{s}$. Find the time to reach ninety-eight per cent of a step, and the error of a reading taken $2\ \mathrm{s}$ after a sudden change.
::: solution
$$
t_{98\%} = 4 \tau = 32\ \mathrm{s}, \qquad
\frac{y (2 )}{y_\infty} = 1 - e^{- 2 / 8} = 0.221 ,
$$
so a reading two seconds after a step reads $22$ per cent of the way to the truth and is in error by $78$ per cent of the change.

*Check.* The ten-to-ninety per cent rise time is $2.20 \times 8 = 17.6\ \mathrm{s}$, and the equivalent $3\ \mathrm{dB}$ bandwidth is $1 / 8 = 0.125\ \mathrm{rad / s}$, or $20\ \mathrm{mHz}$. $\checkmark$

*Sanity.* The thermocouple is a **sensor**, and its time constant is a lag inserted inside the loop, where it is indistinguishable from a plant lag and consumes phase exactly as effectively. A temperature loop whose sensor has an eight-second time constant cannot be closed much faster than about one cycle in thirty seconds, no matter how good the controller is, and this is why the single most effective improvement to a temperature control loop is usually not the controller but a **smaller, faster sensor** placed where the heat is rather than where the average is. The sampling every two seconds is separately harmless — the Nyquist rate for a $20\ \mathrm{mHz}$ signal is forty times the sampling rate here — which is a useful reminder that sampling is rarely the binding constraint on a slow process, sensor lag always is.
:::
:::

::: example Identifying a process {#ex-fopdt}
A step from forty to sixty per cent valve opening on a heater raises a tank temperature by $8\ \mathrm{K}$, the response first moving at $10\ \mathrm{s}$, reaching twenty-eight per cent of the final change at $23.3\ \mathrm{s}$ and sixty-three per cent at $50\ \mathrm{s}$. Fit a first-order plus dead-time model.
::: solution
$$
K = \frac{8\ \mathrm{K}}{20\ \%} = 0.40\ \mathrm{K / \%},
\qquad
\tau = 1.5 \left( t_{63} - t_{28} \right) = 1.5 \times 26.7 = 40\ \mathrm{s},
\qquad
\theta = t_{63} - \tau = 10\ \mathrm{s}.
$$
The model is
$$
G (s ) = \frac{0.40\, e^{- 10 s}}{40 s + 1} .
$$
*Check.* The dead time is the $10\ \mathrm{s}$ before the first movement, and the two-point formula gives $\theta = t_{63} - \tau = 50 - 40 = 10\ \mathrm{s}$ — the same number from two independent measurements, which is the test for whether the model form is right. $\checkmark$

*Sanity.* The ratio $\theta / \tau = 0.25$ is the single number that decides how hard the loop is to control, and the whole of process-control practice is organised around it. Below $0.1$ the loop is easy and a PID tuned by any reasonable rule works; around $0.3$ the derivative term starts to earn its keep; above $1.0$ the loop is fundamentally difficult and the achievable bandwidth is set by the delay, not by the process, with a closed-loop time constant of about $\theta$ at best. The dead time here is the transport lag from the heater to the sensor, and if the plant can be re-piped so that the sensor sits closer, the loop becomes four times easier — a mechanical change worth more than any controller.
:::
:::

::: example Meeting a specification {#ex-spec}
A positioning axis must settle to two per cent in one second with no more than five per cent overshoot. Find the required damping ratio and natural frequency, and the region of the pole plane that satisfies both.
::: solution
$$
M_p \le 0.05 \Rightarrow \zeta \ge \left[ 1 + \left( \frac{\pi}{\ln 0.05} \right)^{2} \right]^{- 1 / 2} = 0.690,
\qquad
t_s \le 1 \Rightarrow \zeta \omega_n \ge 4.0\ \mathrm{s^{- 1}} .
$$
At $\zeta = 0.690$, $\omega_n \ge 4.0 / 0.690 = 5.80\ \mathrm{rad / s}$, giving
$$
t_r \approx \frac{1.8}{5.80} = 0.31\ \mathrm{s}, \qquad
t_p = \frac{\pi}{5.80 \sqrt{1 - 0.69^{2}}} = 0.66\ \mathrm{s}.
$$
*Check.* The exact two-per-cent settling time computed from the response is $1.03\ \mathrm{s}$ against the envelope estimate of $1.00\ \mathrm{s}$ — a three per cent error, as expected for $\zeta$ below $0.8$. $\checkmark$

*Sanity.* The design region is the intersection of a **wedge** and a **half-plane**: the damping-ratio requirement is a wedge bounded by lines at $\pm \arccos 0.69 = \pm 46^{\circ}$ from the imaginary axis, and the settling-time requirement is the half-plane to the left of $\sigma = - 4$. The wedge is a statement about the **angle** of the poles and the half-plane about their **real part**, and every frequency-domain margin has an equivalent picture of this kind — which is the geometric content of the root-locus and $M$-circle methods and the reason they were design tools rather than illustrations. Note also what the specification does **not** say: nothing about the noise, the actuator's saturation, or the flexible mode at $40\ \mathrm{Hz}$ that the axis also has. Real specifications are always under-determined, and the designer's judgement is exercised entirely in the gaps.
:::
:::

::: example A tracking antenna {#ex-antenna}
A radar antenna must track a target moving at $0.02\ \mathrm{rad / s}$. The loop has an integral controller giving $K_v = 20\ \mathrm{s^{- 1}}$. Find the tracking error, and say what a type-2 loop would do.
::: solution
$$
e_{\infty} = \frac{\text{ramp rate}}{K_v} = \frac{0.02}{20} = 1.0 \times 10^{- 3}\ \mathrm{rad} = 0.057^{\circ}.
$$
A type-2 loop has $e_{\infty} = 0$ for a ramp and $1 / K_a$ for an acceleration.

*Check.* If the beamwidth is $1^{\circ}$, the error is $5.7$ per cent of the beam — acceptable for search but not for tracking, where the rule of thumb is that the pointing error should be under a tenth of the beamwidth. $\checkmark$

*Sanity.* The velocity error is not a defect to be tuned out by raising $K_v$ without limit, because $K_v$ is the low-frequency loop gain and raising it drags the crossover frequency up toward the antenna's structural modes, which are always closer than the specification assumes. The trade is exact: for a fixed phase margin, the achievable $K_v$ is bounded by the crossover, and the crossover is bounded by the first flexible mode. The escape is **feedforward**: measure the target's rate and apply the required torque directly, which removes the error without touching the loop gain, and this is why every real tracking system has a rate feedforward path and quotes its "closed-loop" accuracy as though the feedforward were free. The second escape is type 2, and it is usually refused because two integrators in the loop cost $180^{\circ}$ of phase at low frequency and make the loop hard to stabilise against a rate sensor whose own differentiator adds more.
:::
:::

::: example An integrating process {#ex-integrator}
A tank of $2\ \mathrm{m^{2}}$ cross-section is filled by a valve of $0.02\ \mathrm{m^{3} / s}$ per per cent and drained by a pump whose flow is independent of level. Design the level loop.
::: solution
The plant is a pure integrator, because $\dot{h} = \left( 0.02\, u - q_{\text{out}} \right) / 2$:
$$
G (s ) = \frac{0.01}{s}\ \mathrm{(m / s)} \text{ per } \% .
$$
**Proportional only.** The closed loop is $0.01 K_c / \left( s + 0.01 K_c \right)$, a first-order lag with time constant $100 / K_c$ — stable, but with a **permanent offset** after a change in outflow, because the valve must be moved to hold the new level and a proportional controller can only move it if there is an error to move it with.
**Proportional plus integral.** With $C = K_c \left( 1 + 1 / T_i s \right)$,
$$
s^{2} + 0.01 K_c\, s + \frac{0.01 K_c}{T_i} = 0
\quad\Longrightarrow\quad
\omega_n^{2} = \frac{0.01 K_c}{T_i}, \qquad
2 \zeta \omega_n = 0.01 K_c ,
$$
so the integral time sets the damping independently of the speed: $T_i = 2 \zeta / \omega_n$. Choosing $\omega_n = 0.10\ \mathrm{rad / s}$ and $\zeta = 0.71$,
$$
T_i = \frac{2 \times 0.71}{0.10} = 14\ \mathrm{s}, \qquad
K_c = \frac{2 \times 0.71 \times 0.10}{0.01} = 14\ \% \text{ per m of level}.
$$
*Check.* The valve's own bandwidth is a quarter of a hertz, and the loop crossover of $0.1\ \mathrm{rad / s}$ is a decade below it, so the valve has been treated as ideal. $\checkmark$

*Sanity.* The offset under proportional control is a structural property and not a nuisance, which is why **every** level loop, and every speed loop of a vehicle climbing a hill, contains integral action. The cost is the well-known one: an integrator in the controller adds $90^{\circ}$ of phase lag at low frequency and winds up when the valve hits its stop, which is why a level loop on a plant about to overflow is a loop whose controller is sitting at one hundred per cent with an integrator that has been quietly integrating for two minutes and will not come back for another two. Anti-windup is not an optional extra on an integrating process; it is the part of the controller that decides whether the plant floods.
:::
:::

::: example Design {#ex-design-press}
A hydraulic press positions a platen to $\pm 0.05\ \mathrm{mm}$ against a load. The valve-flow gain is $2 \times 10^{- 4}\ \mathrm{m^{3} / s / mA}$, the ram area $50\ \mathrm{cm^{2}}$, the total mass $800\ \mathrm{kg}$, the oil-volume modulus $1\ \mathrm{GPa}$, the trapped volume $200\ \mathrm{cm^{3}}$ and the viscous damping $5\ \mathrm{kN\, s / m}$. Design the loop.
::: solution
**Plant.** Ram velocity $= q / A$, so the position gain is $1 / A s$. The oil column is a spring
$$
k_h = \frac{\beta A^{2}}{V} = \frac{10^{9} \times \left( 5 \times 10^{- 3} \right)^{2}}{2 \times 10^{- 4}} = 1.25 \times 10^{8}\ \mathrm{N / m},
$$
The oil column acts as a spring of stiffness $k_h = \beta A^{2} / V$, giving an **oil-resonance** frequency
$$
\omega_h = \sqrt{\frac{k_h}{m}} = \sqrt{\frac{1.25 \times 10^{8}}{800}} = 395\ \mathrm{rad / s} \left( 63\ \mathrm{Hz} \right),
\qquad
\zeta_h = \frac{c}{2 \sqrt{k_h m}} = \frac{5000}{2 \times 3.16 \times 10^{5}} = 0.0079 .
$$
**Loop.** The resonance is the design constraint: with a structural damping ratio of $0.008$ the peak is $1 / 2 \zeta_h = 63$, or $36\ \mathrm{dB}$, so the crossover must lie well below $63\ \mathrm{Hz}$. Taking a crossover of $8\ \mathrm{Hz}$, a quarter of the resonance, and treating the plant as an integrator there,
$$
K_c = \frac{\omega_c A}{K_q} = \frac{50 \times 5 \times 10^{- 3}}{2 \times 10^{- 4}} = 1250\ \mathrm{mA / m} = 1.25\ \mathrm{mA / mm},
$$
with integral action at a decade below the crossover and derivative action to add phase.

*Design comment.* The oil resonance at sixty-three hertz with a damping ratio under one per cent is the whole design problem, and it is why high-performance electro-hydraulic position loops are closed around a **load-cell** or an **accelerometer** in addition to the position transducer: the extra measurement provides velocity feedback that damps the resonance electrically, since the oil itself will not. The second decision is the crossover. Eight hertz gives a settling time of about $0.5\ \mathrm{s}$ and a $\pm 0.05\ \mathrm{mm}$ accuracy that requires the position feedback to be good to fifty microns at the crossover — against a valve whose dead band alone is worth a tenth of a millimetre, so the loop must be closed with a **dither** signal, at a frequency well above the crossover, whose only purpose is to keep the spool off its seat. Every one of these features — the undamped resonance, the dead band, the dither, the need for a second sensor — is invisible in the transfer function and decisive in the machine.
:::
:::

::: history
The quantitative description of transient response grew out of the **servomechanism** work of the Second World War — fire-control, radar tracking and gun-laying — collected in the MIT Radiation Laboratory series and in the System Design Group's *Principles of Servomechanisms* of 1953, which is where the error-constant table and the language of "type" are standardised. The **second-order paradigm** and the $M_p$–$\zeta$–$t_s$ design charts are the same literature's legacy, and **Hoagland**'s 1947 paper on the "dominant-pole" method made higher-order reduction respectable; **Chin**'s 1951 *Frequency Response* and **Tsien**'s *Engineering Frequency-Response Design* of 1954 gave the $t_r \omega_n \approx 1.8$ rule and the trade-off charts that every controls undergraduate still copies. **Ziegler and Nichols**' 1942 tuning rules are the origin of the process-reaction-curve method of Example 2, and their oscillation-tuning rule remains the most-used single procedure in industrial control seventy-five years on, in part because it needs no model at all. The **first-order-plus-dead-time** model as the standard process representation, and the two-point identification of Example 2, are the chemical-engineering literature of the 1960s and 1970s, formalised in **Cutan** and **Corripio**'s work and in **Åström** and **Hägglund**'s *Identification for Control* of 1995. **Otto Smith**'s predictor of 1957 is still the standard structural answer to dead time and still rarely implemented, because it needs a model good enough to be worth having.
:::

::: quiz
A loop's plant has no integrator and its controller is proportional only. What is the steady error to a step command?
- [ ] Zero, because the loop is stable
- [x] $1 / \left( 1 + K_p \right)$, finite and non-zero, where $K_p$ is the loop gain
- [ ] Infinite
- [ ] It depends on the plant's time constant
::: solution
The final value theorem gives $e_\infty = 1 / \left( 1 + K_p \right)$ with $K_p$ the DC **loop** gain, so the error can be made small but never zero without an integrator. The plant's time constant affects how fast the error settles, not how large it ends up. This is the reason a proportional-only temperature loop sits at a slightly different temperature whenever the load changes, and why the industry word for the offset — "proportional band" — is a statement about the error and not about the controller.
:::
:::

## Where this leads

The second-order response is the same mathematics as the underdamped free vibration of [[vibrations/free-vibration]] and the forced response of [[vibrations/harmonic-excitation]], the trade-off between speed and stability that appears here as a wedge in the pole plane is made quantitative by the frequency-domain margins of [[control-systems/frequency-response]], the integral action whose windup is complained of above is designed in [[control-systems/pid-control]], and the flexible mode that limits the hydraulic loop is that of [[vibrations/two-degrees-of-freedom]].

::: summary
- A first-order process delivers $63$ per cent in one time constant and $98$ per cent in four, and its rise time and bandwidth satisfy $t_r f_B = 0.35$.
- A second-order system's overshoot measures its damping ratio alone, its settling time the product $\zeta \omega_n$ alone and its rise time $\omega_n$ alone, so three numbers from one step test identify a pole pair.
- The design region in the pole plane is a wedge from the damping requirement and a half-plane from the settling-time requirement.
- Steady-state error is decided by the number of pure integrators in the loop and by nothing else; type $k$ kills the error to commands up to $t^{k} / \left( k - 1 \right)!$.
- An integrating process cannot be held at a setpoint by proportional action, and its controller must integrate — which makes anti-windup a safety feature.
- The ratio of dead time to time constant, not either alone, decides how hard a loop is, and no controller recovers what the delay has taken.
:::

## Exercises

::: exercise Time constant {level=1 check="4"}
How many time constants does a first-order system take to reach ninety-eight per cent of a step?
::: solution
Four, since $1 - e^{- 4} = 0.982$.
:::
:::

::: exercise Overshoot {level=1 check="0.7"}
What damping ratio gives about five per cent overshoot?
::: solution
$\zeta \approx 0.69$.
:::
:::

::: exercise Type {level=1 check="1"}
How many integrators are in the loop of a type-1 system?
::: solution
One.
:::
:::

::: exercise Settling time {level=1 check="2"}
With $\zeta \omega_n = 2\ \mathrm{s^{- 1}}$, what is the two-per-cent settling time?
::: solution
$4 / 2 = 2\ \mathrm{s}$.
:::
:::

::: exercise Bandwidth {level=2}
A sensor's ten-to-ninety per cent rise time is $0.5\ \mathrm{s}$. Find its time constant and its $3\ \mathrm{dB}$ bandwidth in hertz.
::: solution
$$
\tau = \frac{0.5}{\ln 9} = 0.228\ \mathrm{s}, \qquad
f_B = \frac{1}{2 \pi \tau} = 0.70\ \mathrm{Hz}.
$$
*Sanity.* The identity $t_r f_B = 0.35$ is worth memorising because it converts a datasheet rise time into a bandwidth and back, and because it is the same relation in electronics, in photodetectors and in control loops: a sensor that is fast enough to see a phenomenon is one whose bandwidth exceeds the phenomenon's frequency, and no signal processing recovers what the sensor's own lag has removed. Note that the relation is for a **first-order** response; a sensor with a second-order response has a rise time that depends on its damping and can be made arbitrarily short by under-damping it, which is why "rise time" alone is a misleading specification without the accompanying step-response plot.
:::
:::

::: exercise Identification {level=2}
A step of $10\ \%$ on a valve produces a final change of $- 4\ \mathrm{K}$, with $t_{28} = 15\ \mathrm{s}$ and $t_{63} = 40\ \mathrm{s}$. Find the first-order-plus-dead-time model and the ratio $\theta / \tau$.
::: solution
$$
K = - 0.40\ \mathrm{K / \%}, \qquad
\tau = 1.5 \times 25 = 37.5\ \mathrm{s}, \qquad
\theta = 40 - 37.5 = 2.5\ \mathrm{s},
\qquad
\frac{\theta}{\tau} = 0.067 .
$$
*Sanity.* A dead-time ratio below a tenth means the loop is easy: Ziegler-Nichols proportional-plus-integral tuning gives $K_c = 0.9 \tau / \left( K \theta \right) = 34$ with an integral time of $\tau / 1.2 = 31\ \mathrm{s}$, and the loop will be stable and well behaved, and the derivative term adds nothing. The negative sign matters for the tuning but not for the difficulty, and it is the reason every loop's controller has a direction-of-action setting that is wrong more often than anyone admits.
:::
:::

::: exercise Steady-state error {level=2}
A loop has $L (s ) = 50 / \left[ s \left( 1 + 0.1 s \right)\left( 1 + 0.5 s \right) \right]$. Find the steady error to a unit step, a unit ramp and a ramp of $0.1\ \mathrm{s^{- 1}}$.
::: solution
Type 1 with $K_v = \lim s L = 50\ \mathrm{s^{- 1}}$.
Step: $0$. Ramp: $1 / 50 = 0.02$. Ramp of $0.1$: $0.1 / 50 = 0.002$.
*Sanity.* The velocity constant is the **low-frequency loop gain divided by the integrator's own rate**, and it is the number quoted in servodatasheets because it converts a commanded rate directly into a following error. Note that the two lags at $10$ and $2\ \mathrm{rad / s}$ do not appear in $K_v$ at all — the error constant is a purely low-frequency statement — but they decide the stability, and a designer who optimises $K_v$ without checking the phase at the resulting crossover has designed a good steady-state error and an oscillatory transient.
:::
:::

::: exercise Second order {level=3}
A plant $2 / \left[ s \left( 1 + s \right) \right]$ is placed in a unity loop. Find the closed-loop $\zeta$, $\omega_n$, overshoot and settling time, and the steady error to a ramp of $0.5$.
::: solution
$$
T = \frac{2}{s^{2} + s + 2}
\quad\Longrightarrow\quad
\omega_n = 1.414\ \mathrm{rad / s}, \quad \zeta = 0.354 ,
$$
$$
M_p = e^{- \pi \times 0.354 / 0.935} = 30.5\ \%,
\qquad
t_s = \frac{4}{0.354 \times 1.414} = 8.0\ \mathrm{s},
\qquad
K_v = 2 \Rightarrow e_\infty = 0.25 .
$$
*Sanity.* A closed-loop damping ratio of $0.35$ and a thirty per cent overshoot is what a proportional-only loop on an integrating plant typically gives, and it is the reason the plain proportional controller is almost never used alone: the loop is stable, the steady error is finite, and the transient is unusable. Adding derivative feedback raises $\zeta$ without changing $K_v$, and adding integral action raises $K_v$ to infinity and usually lowers $\zeta$ — which is the whole of the PID trade in one example, and the reason the three terms are tuned together and not one at a time.
:::
:::

::: exercise Dominant poles {level=3}
A system has poles at $- 2 \pm 3\ \mathrm{j}$ and at $- 20$, and a zero at $- 21$. Decide whether a second-order model is adequate and estimate the error.
::: solution
The third pole is at ten times the real part of the dominant pair, and the zero at $- 21$ sits within five per cent of the pole at $- 20$, so the pair **cancels** and the third mode is both fast and unexcited. A second-order model is adequate, and its error is dominated by the residual of the cancellation, of order the $1$ per cent separation divided by the distance to the dominant pair.
*Sanity.* Pole-zero pairs that nearly cancel are everywhere — a sensor's own dynamics cancelling a filter, a bypass capacitor across a winding, a vibration absorber tuned to a mode — and the rule for deciding whether to keep them in the model is to compare the residue $r_k$ of the fast mode with those of the dominant pair, not the pole locations alone. A fast pole with a large residue can matter more than a slow one with a small residue, and the residue is what a simulation reveals and what a pole-zero plot hides.
:::
:::

::: exercise Derivation {level=3}
Derive the relation $t_r \omega_n \approx 1.8$ for a second-order system and state the range of damping ratio over which it holds to ten per cent.
::: solution
The ten-to-ninety per cent rise time is the difference of the times at which the response crosses $0.1$ and $0.9$. Numerically evaluating the standard step response gives
$$
\omega_n t_r = 1.55,\ 1.77,\ 1.95,\ 2.14,\ 2.36
\quad \text{for} \quad \zeta = 0.3, 0.5, 0.7, 0.9, 1.0 ,
$$
so $t_r \omega_n \approx 1.8$ holds to within ten per cent for $\zeta$ between $0.45$ and $0.75$, and to within twenty per cent from $0.3$ to $1.0$.
*Sanity.* The rule's usefulness is that it converts a **speed** requirement into a natural frequency without any reference to damping, which is the damping-insensitive half of the design; its danger is that it is quoted outside its range, where a heavily damped or a resonant design can be twenty-five per cent out. The professional habit is to use it to size $\omega_n$ and then to compute the response exactly, which takes a minute and settles the argument.
:::
:::
