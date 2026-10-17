The transfer function is the whole of classical control in one fraction: everything a linear plant will ever do is written in where its poles and zeros are, and every design decision — how fast, how damped, how much disturbance it throws off, how much noise it lets in — is a statement about that fraction. It is also the point at which control stops being differential equations and becomes algebra with a geometry attached, which is why the subject was designable half a century before it was computable.

Three ideas carry the lesson. The **pole** of a transfer function is a mode the system will perform whether or not you ask it to, and the **zero** is a frequency the system refuses to transmit — and a zero in the right half-plane is a promise that the response must first go the wrong way. **Block-diagram algebra** reduces any interconnection of linear blocks to a single fraction, and the systematic version of it, Mason's gain formula, is the reason a complex loop can be read off a picture in a minute. And the **closed loop** changes the poles, which is the entire mechanism of feedback: the plant's poles are its fate, the loop's poles are a design choice, and the constraint on that choice is the subject of the next three lessons.

::: warning Zero initial conditions, and what that costs
A transfer function is defined as the ratio of output to input transforms **with all initial conditions zero**, and the qualification is not pedantry. A system with a non-zero initial state produces a response with extra terms — the "natural" part — that the transfer function does not contain, so a block diagram built from transfer functions silently assumes the plant starts at rest. Two failures follow. The first is practical: a servo whose integrator is wound up, or a furnace that is already hot, does not respond as the diagram says, which is the origin of the anti-windup and bumpless-transfer machinery of the PID lesson. The second is conceptual: a system that is not at rest is not linear about that rest point either, and the only honest treatment is the state equation, where the initial condition is an input like any other. The transfer function is a magnificent device for the problem it solves, and the problem is not "what will this machine do" but "what will this machine do when stimulated".
:::

## Transfer functions and their algebra

::: definition Transfer function, poles and zeros {#def-tf}
For $a_n y^{(n)} + \cdots + a_1 \dot{y} + a_0 y = b_m u^{(m)} + \cdots + b_1 \dot{u} + b_0 u$ with zero initial conditions,
$$
G (s ) = \frac{Y (s )}{U (s )} = \frac{b_m s^{m} + \cdots + b_1 s + b_0}{a_n s^{n} + \cdots + a_1 s + a_0}
= K \frac{\prod_{i} \left( s - z_i \right)}{\prod_{j} \left( s - p_j \right)} .
$$
The $p_j$ are the **poles**, which are the system's own modes and do not depend on the input; the $z_i$ are the **zeros**, which are the frequencies at which a sinusoidal input produces no output. The response to any input has poles at the $p_j$ **and** at the poles of the input, so a step makes a mode appear that a sinusoid at the wrong frequency does not. The system is stable if and only if every pole has a negative real part, and **proper** — physically realisable — only if $m \le n$.
:::

::: proof Partial fractions and the anatomy of a response {#proof-partial}
Write $Y (s ) = G (s ) U (s )$ and expand about a simple pole $p_k$,
$$
Y (s ) = \sum_k \frac{r_k}{s - p_k}, \qquad
r_k = \lim_{s \to p_k} \left( s - p_k \right) G (s ) U (s ) .
$$
Inverting term by term,
$$
y (t ) = \sum_k r_k e^{p_k t},
$$
so the response is a sum of exponentials, one per pole of the **product** $G U$: those with $p_j$ from $G$ are the natural response and decay if the system is stable, and those from $U$ are the forced response and persist. $\checkmark$

*Note.* Two consequences are worth having as reflexes. First, a **pole-zero cancellation** in $G U$ removes a mode from the output but not from the system: if an unstable plant pole is cancelled by a controller zero, the cancellation is exact only in exact arithmetic, and in the real loop the mode reappears, growing, in whatever state variable the diagram does not show. This is the single most dangerous idea in classical design and the reason every modern treatment insists on checking **internal** stability, meaning every transfer function between every pair of signals in the loop, not just the one to the output. Second, a repeated pole $p$ of multiplicity $m$ contributes $t^{j} e^{p t}$ for $j$ up to $m - 1$, so a system on the verge of instability ($p = 0$ twice) responds to a step with a ramp: marginal stability of a repeated pole is instability for practical purposes, which is why the Routh test is stated with a strict inequality.
:::

::: definition Block-diagram algebra and Mason's rule {#def-mason}
Three local rules reduce any diagram: blocks in **series** multiply, blocks in **parallel** add, and a **loop** of forward gain $G$ and return $H$ becomes $G / \left( 1 \pm G H \right)$. Takeoffs may be moved outward past a block (multiply by it) and summing points outward past a block (divide by it), and two summing points may be swapped. The systematic form is **Mason's gain formula**,
$$
T = \frac{1}{\Delta} \sum_k P_k \Delta_k,
\qquad
\Delta = 1 - \sum_i L_i + \sum_{i < j} L_i L_j - \cdots,
$$
where the $P_k$ are the forward paths from input to output, the $L_i$ are the individual loop gains, the second sum runs over pairs of **non-touching** loops, and $\Delta_k$ is $\Delta$ with the loops touching path $k$ removed.
:::

::: proof Mason's formula for a single loop {#proof-mason}
A diagram with one forward path $P$ and one loop $L$ is the equation
$$
x = P u + L x \quad\Longrightarrow\quad x = \frac{P}{1 - L} u ,
$$
which is Mason's formula with $\Delta = 1 - L$ and $\Delta_1 = 1$. For two non-touching loops the equations decouple into
$$
x_1 = P_1 u + L_1 x_1, \qquad x_2 = L_2 x_2 + \cdots
$$
and each contributes its own $1 / \left( 1 - L_i \right)$, whose product expands to $1 - L_1 - L_2 + L_1 L_2$, which is exactly $\Delta$ with the non-touching pair included. Adding a loop that **touches** both removes its $L_1 L_2$ term, because the two loops then share a node and cannot be iterated independently — which is the whole content of the "non-touching" rule, and the reason the formula terminates after finitely many terms. $\checkmark$

*Note.* Mason's formula is Cramer's rule applied to the node equations of the diagram, and that identity is worth knowing for two reasons. The first is that it tells you the formula can fail: if $\Delta = 0$ the diagram has a pole at the origin of the transform plane and the "gain" is infinite, which is the loop oscillating, so $\Delta = 0$ **is** the characteristic equation and the whole of stability theory lives in one denominator. The second is that it tells you what to do when the diagram is too big for the formula, which is about forty blocks: write the node equations and solve them numerically, which is what every simulation language does and which costs nothing now that it costs nothing.
:::

::: definition Non-minimum phase and delay {#def-nmp}
A transfer function all of whose zeros are in the left half-plane is **minimum phase**: among all systems with the same magnitude response it has the smallest phase lag, and its phase is recoverable from its magnitude by the Bode relations. A right-half-plane zero at $- z$ with $z > 0$ contributes the same magnitude as a left-half-plane one but an **extra** phase lag of $2 \arctan \left( \omega / z \right)$, and it forces the step response to move the wrong way first. A pure delay $e^{- T s}$ has no zeros at all, a flat magnitude and an unbounded phase lag, and is the limiting case of a right-half-plane zero as $z$ tends to zero.
:::

::: widget plot
f: x => 2+3*Math.exp(-x)-5*Math.exp(-x/2)
x: 0, 10
y: -0.15, 2.3
n: 400
labels: y(t)
caption: Step response of the non-minimum-phase system (2 - s) / ((1 + s)(1 + 2s)). The output falls to minus four per cent of its final value before turning, because the right-half-plane zero at s = 2 contributes an initial slope of minus one half; the area under the initial undershoot is exactly the integral of the zero's contribution, and no linear controller can remove it, only move it.
:::

::: example An RLC circuit {#ex-rlc}
A series circuit of $R = 100\ \Omega$, $L = 0.1\ \mathrm{H}$ and $C = 10\ \mu\mathrm{F}$ is driven by a voltage and its current is measured. Find the transfer function, its poles and zeros, and the response to a step of $10\ \mathrm{V}$.
::: solution
$$
\frac{I}{V} = \frac{1}{L s + R + 1 / C s} = \frac{s / L}{s^{2} + \left( R / L \right) s + 1 / L C}
= \frac{10\, s}{s^{2} + 1000\, s + 10^{6}} ,
$$
$$
\omega_n = \frac{1}{\sqrt{L C}} = 1000\ \mathrm{rad / s}, \qquad
\zeta = \frac{R}{2} \sqrt{\frac{C}{L}} = 0.50, \qquad
p = - 500 \pm 866\ \mathrm{j} .
$$
There is a **zero at the origin**: at $\omega = 0$ the capacitor blocks, so the steady current for a DC voltage is zero. The step response follows from $I (s ) = 10 \times 10 s /\left[ s \left( s^{2} + 1000 s + 10^{6} \right) \right]$,
$$
i (t ) = \frac{V}{L \omega_d} e^{- \zeta \omega_n t} \sin \omega_d t
= 0.115\, e^{- 500 t} \sin 866 t\ \mathrm{A} .
$$
*Check.* The final value is zero, as the zero at the origin requires, and the initial slope is $\left. \dot{i} \right|_0 = 0.115 \times 866 = 99.6\ \mathrm{A / s}$ against the expected $V / L = 100\ \mathrm{A / s}$, the inductor behaving as an open circuit at the instant of switching. $\checkmark$

*Sanity.* A series RLC with a current output is a **bandpass**: zero at DC because of the capacitor, zero at infinity because of the inductor, and a resonant peak at $\omega_n$ with a height of $1 / R = 10\ \mathrm{mS}$, which is $1 / \left( 2 \zeta \right)$ above the mid-band. The same pole-zero pattern appears in a mechanical vibration absorber, in a notch filter and in the mechanical impedance of a loudspeaker's motional branch, and in all of them the reading is the same: two energy stores of opposite kind in series give a bandpass, and the resistance alone sets how sharp it is.
:::
:::

::: example Reducing a servo diagram {#ex-reduce}
A position servo has an amplifier of gain $K_p$, a motor $\Theta / V = K_m / s \left( \tau s + 1 \right)$ with $K_m = 5\ \mathrm{rad / s / V}$ and $\tau = 0.1\ \mathrm{s}$, unity position feedback and a tachogenerator of $K_t$ around the motor. Find the closed-loop transfer function and the $K_t$ that gives $\zeta = 0.7$.
::: solution
The tach loop is inside the position loop, so reduce it first:
$$
\frac{\Theta}{V_e} = \frac{K_m}{s \left( \tau s + 1 \right) + K_m K_t s}
\quad\Longrightarrow\quad
\frac{\Theta}{\Theta_r} = \frac{K_p K_m}{\tau s^{2} + \left( 1 + K_p K_m K_t \right) s + K_p K_m} .
$$
With $K_p = 2$, $K_m = 5$ and $\tau = 0.1$,
$$
\omega_n^{2} = 100 \Rightarrow \omega_n = 10\ \mathrm{rad / s},
\qquad
2 \zeta \omega_n = 10 \left( 1 + 10 K_t \right) = 14
\quad\Longrightarrow\quad
K_t = 0.040\ \mathrm{V\, s / rad}.
$$
*Check.* The closed-loop damping without the tach is $\zeta = 1 / \left( 2 \times 10 \times 0.1 \right) = 0.05$, so the tachogenerator has raised the damping from five per cent to seventy. $\checkmark$

*Sanity.* The tach loop is a **derivative** feedback and it is the standard cure for a lightly damped plant, because it multiplies the $s$ coefficient without touching the constant term — it changes the damping and leaves the natural frequency, which is exactly the opposite of what output-derivative *feedforward* would do. Note what it costs: the tachogenerator adds its own noise, and its gain tolerance now sets the damping tolerance, so a tach that is five per cent weak gives $\zeta = 0.68$ rather than $0.70$ and is harmless, whereas a resolver-and-differentiator replacement whose differentiator contributes $120\ \mathrm{ms}$ of phase lag at the crossover is not. The lesson generalises: any measurement used for damping must be quiet at high frequency, because damping is a high-frequency property.
:::
:::

::: example A non-minimum-phase plant {#ex-nmp}
A plant has $G (s ) = \dfrac{2 - s}{\left( 1 + s \right)\left( 1 + 2 s \right)}$. Find its step response and the phase its right-half-plane zero costs it at $\omega = 1\ \mathrm{rad / s}$.
::: solution
$$
\frac{G}{s} = \frac{2}{s} + \frac{3}{1 + s} - \frac{10}{1 + 2 s}
\quad\Longrightarrow\quad
y (t ) = 2 + 3 e^{- t} - 5 e^{- t / 2} ,
$$
$$
y \left( 0.365 \right) = - 0.083 \quad \text{(four per cent undershoot)},
\qquad
y (\infty ) = 2 .
$$
The initial slope is $y' (0 ) = - 3 + 2.5 = - 0.5$, negative for a positive step. The zero contributes
$$
- 2 \arctan \frac{\omega}{2} = - 53.1^{\circ}
$$
at $\omega = 1$, on top of the $- 45^{\circ} - 63.4^{\circ}$ of the two poles, against $0^{\circ}$ for the minimum-phase plant with the same magnitude.

*Sanity.* The undershoot is not a defect of the design but a property of the plant, and it has a physical origin in every real case: a ship's steering gear turns the bow the wrong way briefly because the hull must first build up sway; an aircraft's pitch attitude initially drops when the elevator is raised because the tail's downforce is applied behind the centre of gravity; a CSTR's outlet concentration initially rises when the inlet is increased because of the residence-time distribution; and a boiler's drum level initially **falls** when the fuel is increased because the bubbles in the risers expand and push the water down — the famous "shrink and swell" that has confused boiler operators since the 1950s and that a level controller must be designed around, usually by controlling drum level with a three-element scheme that measures the steam flow. In every case the right-half-plane zero sets a ceiling on the achievable bandwidth of about one third of the zero's own frequency, and that ceiling is the design requirement.
:::
:::

::: example Mason's rule on a cascade loop {#ex-mason}
A drive has an amplifier $G_1 = 2$, a current loop around a motor $G_2 = 5 / s$ with a current-feedback element $H_1 = 0.5$, and a load $G_3 = 1 / \left( s + 1 \right)$ inside a unity position loop. Find the closed-loop transfer function by Mason's rule and check it by direct reduction.
::: solution
There is one forward path and two loops, and the loops touch:
$$
P = G_1 G_2 G_3 = \frac{10}{s \left( s + 1 \right)},
\qquad
L_1 = - G_2 H_1 = - \frac{2.5}{s},
\qquad
L_2 = - G_1 G_2 G_3 = - \frac{10}{s \left( s + 1 \right)} ,
$$
$$
T = \frac{P}{1 - L_1 - L_2}
= \frac{10}{s \left( s + 1 \right) + 2.5 \left( s + 1 \right) + 10}
= \frac{10}{s^{2} + 3.5\, s + 12.5} .
$$
**Check by reduction.** The inner loop alone is $G_2 / \left( 1 + G_2 H_1 \right) = 5 / \left( s + 2.5 \right)$, so the forward path is $10 / \left[ \left( s + 2.5 \right)\left( s + 1 \right) \right]$ and closing the outer loop gives $10 / \left[ \left( s + 2.5 \right)\left( s + 1 \right) + 10 \right]$, the same denominator. $\checkmark$
$$
\omega_n = 3.54\ \mathrm{rad / s}, \qquad \zeta = 0.495, \qquad M_p = 16.3\ \%.
$$
*Sanity.* The inner current loop has moved the plant's pole from the origin to $- 2.5\ \mathrm{s^{- 1}}$ — it has turned an integrator, which is marginally stable and impossible to control with proportional gain alone, into a first-order lag with a gain of two. That is the entire purpose of a current loop in a drive, and it is why every servo drive has one: the motor is an integrator from voltage to speed and from speed to position, two integrators in series cannot be stabilised by any single-loop proportional network, and the inner loop removes one of them. The residual damping of $0.50$ then says what the designer still has to do — add tach or derivative feedback, or accept a sixteen per cent overshoot on every move.
:::
:::

::: example Design {#ex-design-ff}
A furnace is controlled by a PID on its temperature. A disturbance enters as a measured change in the feed rate. Design the feedforward path and say what it cannot fix.
::: solution
With the plant $G_p$, the actuator $G_a$ and the disturbance path $G_d$, perfect compensation requires the feedforward $G_{ff}$ to make the output's dependence on the disturbance vanish:
$$
G_{ff} G_a G_p + G_d = 0
\qquad\Longrightarrow\qquad
G_{ff} = - \frac{G_d}{G_a G_p} .
$$
For a first-order furnace $G_p = K / \left( \tau s + 1 \right)$ with $G_a = 1$ and a disturbance entering through the same first order, $G_d = K_d / \left( \tau s + 1 \right)$ and
$$
G_{ff} = - \frac{K_d}{K} = - 0.30 ,
$$
a **pure gain**, because the disturbance and the control act through the same dynamics.

*Design comment.* Two things defeat this in practice and both are structural rather than numerical. The first is that the required $G_{ff}$ is the **inverse of the plant**, and any plant with a delay, a right-half-plane zero or more poles than zeros has an inverse that is not realisable — so the best achievable feedforward is a gain plus a lead, and the residual is left to the feedback loop. The second is that the disturbance path's gain drifts: here $K_d$ changes with the load, and a feedforward set for one operating point is wrong at another, which is why industrial feedforward schemes include an on-line **correction** term driven by the feedback controller's own output. The design rule that survives all of this is the valuable one: feedforward handles the **measurable** and **large** disturbance so that the feedback loop only has to handle the unmeasured residue, and it buys nothing at all for a disturbance that is small or unmeasured. A furnace's feed rate is measurable and large, so feedforward is worth having; its ambient temperature is measurable but small, and a feedforward path for it is a maintenance liability.
:::
:::

::: history
The **Laplace transform** is the work of Pierre-Simon Laplace's *Théorie analytique des probabilités* of 1812 and of his earlier memoirs of the 1780s, in which the transform appears as an instrument of integral calculus and not yet as an engineering tool. Its engineering use was invented, without justification, by **Oliver Heaviside** between 1893 and 1912, whose operational calculus manipulated $p = \mathrm{d} / \mathrm{d}t$ as though it were a number and got the right answers to telegraph-line problems that classical methods could not touch; the justification came only after his death, from **Thomas Bromwich**'s 1893 inversion integral, **Wiener**'s and **Lurentz**'s and **Doetsch**'s rigorous theories of the 1920s, and **Titchmarsh**'s *Introduction to the Theory of Fourier Integrals* of 1937, and Heaviside's fight with the establishment of the time is one of the instructive episodes of applied mathematics. **Black's** block diagram of the negative-feedback amplifier of 1927, drawn on the back of an envelope on a train and published in 1934, is the origin of the diagrammatic method, and **Nyquist**'s 1932 paper made the loop's geometry the design object. **Mason**'s gain formula of 1953 and his 1956 *Feedback Control Systems* with Zimmerman and Atten made signal-flow graphs routine. The **non-minimum-phase** constraint was worked out in the aircraft and ship-steering literature of the 1950s, and the **Bode sensitivity integral** — the theorem that makes the trade-off of this lesson quantitative — is **Hendrik Bode**'s 1945 *Network Analysis and Feedback Amplifier Design*, the book that taught a generation what feedback costs.
:::

::: quiz
A plant's step response initially moves **away** from its final value. Which statement is true?
- [ ] A derivative term in the controller can remove the undershoot
- [x] The plant has a right-half-plane zero or a dominant delay, and no linear controller can remove the initial reversal
- [ ] Increasing the loop gain will eliminate it
- [ ] It is a measurement error in the actuator
::: solution
The initial reversal is set by the plant's right-half-plane zeros, which appear unchanged in the loop's **complementary** transfer function and cannot be cancelled without an unstable cancellation elsewhere in the loop. A derivative term changes the closed-loop zeros but not the plant's, and raising the gain makes the undershoot faster and no smaller. The design consequence is a bandwidth ceiling of roughly one third of the zero's frequency, and the reason the ceiling is real: the same zeros that cause the undershoot also consume the phase margin that a faster loop would need.
:::
:::

## Where this leads

The second-order closed loop used throughout is the spring–mass–damper of [[vibrations/vibration-fundamentals]] in another dress, its time-domain behaviour is developed in [[vibrations/free-vibration]] and [[vibrations/harmonic-excitation]], the frequency-domain reading of poles and zeros is continued in [[vibrations/isolation-transmissibility]], and the flexible modes that limit a real servo's gain are those of [[vibrations/two-degrees-of-freedom]] and [[vibrations/continuous-systems]].

::: summary
- A transfer function is defined with zero initial conditions; its poles are the system's modes and its zeros are what it refuses to transmit.
- The response to any input is a sum of exponentials at the poles of the **product** $G U$, so cancellations hide modes rather than remove them.
- Series, parallel and loop reduction plus the takeoff and summing-point moves reduce any diagram; Mason's formula does it in one line and its denominator is the characteristic equation.
- A right-half-plane zero forces an initial move in the wrong direction and caps the achievable bandwidth at about a third of its own frequency; a delay is the same pathology with no zero at all.
- Nested loops must be separated in bandwidth by a factor of five to ten, inner ones faster, or the loops fight over the same phase.
- Feedforward must invert the plant, which is why it can never be perfect and why it is always used with feedback rather than instead of it.
:::

## Exercises

::: exercise Poles {level=1 check="-5"}
What is the pole of $G (s ) = 4 /(s + 5 )$?
::: solution
$s = - 5$.
:::
:::

::: exercise Order {level=1 check="1"}
How many poles does a first-order system have?
::: solution
One.
:::
:::

::: exercise Loop gain {level=1 check="0.5"}
What is the closed-loop gain of $G = 1$ with unity negative feedback?
::: solution
$1 / \left( 1 + 1 \right) = 0.5$.
:::
:::

::: exercise Properness {level=1 check="0"}
What is the largest value of $m - n$ for a realisable transfer function?
::: solution
Zero — the numerator degree may not exceed the denominator's.
:::
:::

::: exercise Poles and zeros {level=2}
Find the poles and zeros of $G (s ) = \dfrac{10 \left( s + 2 \right)}{s \left( s^{2} + 6 s + 25 \right)}$ and its steady-state response to a step.
::: solution
Zeros at $s = - 2$; poles at $s = 0$ and $s = - 3 \pm 4\ \mathrm{j}$. The pole at the origin makes the step response grow without bound, so there is no steady state.
*Sanity.* A pole at the origin is an **integrator**, and a single integrator in the forward path is what makes a step-tracking error zero — so the same pole that makes the open-loop response unbounded makes the closed-loop response perfect. This is the "type" of a system, and it is the reason a proportional controller alone always leaves a residual error on a step: the error has to be non-zero in order to produce the control effort that holds the output, and only an integrator can hold an output with zero error.
:::
:::

::: exercise Block reduction {level=2}
Reduce $G_1 = 1 /(s + 1 )$, $G_2 = 2 / \left( s + 3 \right)$ in series with unity negative feedback around the pair.
::: solution
$$
\frac{G_1 G_2}{1 + G_1 G_2} = \frac{2}{\left( s + 1 \right)\left( s + 3 \right) + 2}
= \frac{2}{s^{2} + 4 s + 5},
$$
with poles at $- 2 \pm \mathrm{j}$, $\omega_n = \sqrt{5}$ and $\zeta = 2 / \sqrt{5} = 0.894$.
*Sanity.* The open-loop poles are at $- 1$ and $- 3$; closing the loop moves them to $- 2 \pm \mathrm{j}$, so feedback has made the pair **equalised and oscillatory** — the average real part is unchanged while the separation has become imaginary. This is the standard picture of what feedback does to a pair of real poles: it pulls them together on the real axis and then pushes them off it, and the point at which they break away is the maximum achievable damping for that structure. No gain beyond that point helps the damping, only the speed, and this is why a designer who keeps turning up the gain eventually gets a faster and more oscillatory loop rather than a better one.
:::
:::

::: exercise Mason {level=2}
A diagram has one forward path $P = 10$ and two loops $L_1 = - 2$ and $L_2 = - 3$ that touch each other. Find the gain, and find it again if the loops did not touch.
::: solution
$$
T = \frac{P}{1 - L_1 - L_2} = \frac{10}{1 + 2 + 3} = 1.67 .
$$
*Sanity.* Had the two loops not touched, the denominator would have been $1 - L_1 - L_2 + L_1 L_2 = 12$, giving $0.833$. The difference is the product term, which appears only for non-touching loops: two loops that touch cannot both be iterated independently, so their product does not enter the denominator, and the touching case has **more** gain, that is less effective feedback.
:::
:::

::: exercise Non-minimum phase {level=3}
Show that a right-half-plane zero at $s = z$ contributes the same magnitude as a left-half-plane zero but $2 \arctan \left( \omega / z \right)$ more phase lag, and find the phase lag at $\omega = z$ for $z = 2$.
::: solution
$$
\left| \frac{\mathrm{i} \omega + z}{\mathrm{i} \omega - z} \right| = 1, \qquad
\arg \left( \mathrm{i} \omega + z \right) - \arg \left( \mathrm{i} \omega - z \right)
= \arctan \frac{\omega}{z} - \left( \pi - \arctan \frac{\omega}{z} \right) ,
$$
so the all-pass factor $\left( z - s \right) / \left( z + s \right)$ has unit magnitude and a phase of $- 2 \arctan \left( \omega / z \right)$, which at $\omega = z$ is $- 90^{\circ}$.
*Sanity.* Ninety degrees of phase lost for free in the magnitude — that is the whole economics of a non-minimum-phase zero, and it is why the phase margin of a plant with a zero at $2\ \mathrm{rad / s}$ is gone before the designer has done anything. The rule of thumb that follows is the one every drive and process engineer uses: keep the closed-loop bandwidth below one third of the right-half-plane zero's frequency, which costs about $17^{\circ}$ of phase and is survivable.
:::
:::

::: exercise Delay {level=3}
Approximate $e^{- T s}$ for $T = 1$ by the $\left[ 1 / 1 \right]$ Padé form $\left( 1 - s / 2 \right) / \left( 1 + s / 2 \right)$, and compare the two at $\omega = 1$.
::: solution
The Padé form is an **all-pass** with a right-half-plane zero at $2 / T$ and a left-half-plane pole at $2 / T$. At $\omega = 1$ the exact delay has a phase of $- 57.3^{\circ}$ and the approximation
$$
- 2 \arctan \frac{\omega}{2} = - 53.1^{\circ},
$$
seven per cent low, while both have exactly unit magnitude at every frequency.
*Sanity.* The Padé approximation is the standard way to put a delay into a root-locus or a state-space design, and its right-half-plane zero is not an artefact but a fair warning: a delay really is the limit of a non-minimum-phase zero as the zero goes to infinity in the wrong direction, and the approximation carries that structure into the design at the price of a pole and a zero that are not in the plant. The practical caution is that the approximation degrades above $\omega = 2 / T$, so a design that crosses over above the delay's corner frequency is being designed against a model that has stopped resembling the plant.
:::
:::

::: exercise Derivation {level=3}
For $G (s ) = \omega_n^{2} / \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)$ derive the step response and show that the percentage overshoot depends on the damping ratio alone.
::: solution
$$
Y (s ) = \frac{\omega_n^{2}}{s \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)}
= \frac{1}{s} - \frac{s + \zeta \omega_n}{\left( s + \zeta \omega_n \right)^{2} + \omega_d^{2}},
\qquad \omega_d = \omega_n \sqrt{1 - \zeta^{2}} ,
$$
$$
y (t ) = 1 - \frac{e^{- \zeta \omega_n t}}{\sqrt{1 - \zeta^{2}}}
\sin \left( \omega_d t + \arccos \zeta \right) .
$$
The first peak occurs at $\omega_d t = \pi$, so
$$
M_p = e^{- \pi \zeta / \sqrt{1 - \zeta^{2}}} . \quad \checkmark
$$
*Sanity.* The result is remarkable and worth internalising: the overshoot of a second-order system tells you its damping ratio and nothing else, so a single step test on a clean second-order plant measures $\zeta$ directly from one number. The inversion is $\zeta = \left[ 1 + \left( \pi / \ln M_p \right)^{2} \right]^{- 1 / 2}$, so a $10$ per cent overshoot means $\zeta = 0.59$ and a $5$ per cent overshoot means $0.69$. The formula also explains why $\zeta = 0.7$ is the default target: it gives $4.6$ per cent overshoot, a settling time of $4 / \left( 0.7 \omega_n \right) = 5.7 / \omega_n$, and the flattest available trade between the two, since the product of overshoot and settling time is minimised near $\zeta = 0.7$.
:::
:::
