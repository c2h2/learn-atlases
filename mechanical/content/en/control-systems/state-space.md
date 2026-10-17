A transfer function relates an output to an input. A state-space model relates the **whole present** of a system to its own past and to the input, and out of that difference comes everything that makes the modern methods worth the linear algebra: the ability to handle several inputs and several outputs at once, to say precisely which parts of a system a given actuator can reach and a given sensor can see, to place closed-loop poles by arithmetic instead of by sketching, and to estimate a variable that cannot be measured. The framework is not a better way of doing what the frequency methods do — for a single loop they do it better — it is the only way of doing the things a single loop cannot.

The subject reduces to three questions and their rank tests. **Can the input drive every mode?** Controllability, and the answer is a matrix rank. **Can the output reveal every mode?** Observability, and the answer is a transposed matrix rank. **If both, how fast and how well?** Pole placement and the observer, and the answer is that you may put the closed-loop poles anywhere you like and the estimator poles anywhere you like, independently, and the two designs multiply. Everything else — the optimal regulators, the Kalman filter, the loop-transfer recovery that reconciles this freedom with the frequency-domain margins — is elaboration.

::: warning Pole placement is the most dangerous idea in this book
Given a controllable model, arbitrary pole placement is a formula, and a designer who has just learned it will place the closed-loop poles wherever the specification asks and the observer poles a decade above them. Both moves are wrong in specific and quantifiable ways. Placing poles far to the left of what the plant's own dynamics support demands **control effort**: the feedback gain required grows without bound as the desired bandwidth rises, and for a plant with a right-half-plane zero or a flexible mode the gain required to place poles past it is not merely large but **destabilising in the real plant**, because the model that produced the gain is not the plant. Placing the observer fast is worse, because the observer's gain $L$ appears in the feedback path multiplied by the plant's high-frequency gain, and the recovered loop's sensitivity peak grows roughly in proportion to the observer bandwidth — a design that becomes less robust as the estimator becomes more confident. The rule that keeps both honest is that **the closed-loop bandwidth may not exceed the frequency at which the model's error reaches unity**, and that the observer should be three to five times, not ten to fifty times, faster than the controller. Beyond that the separation principle is arithmetically true and practically useless.
:::

## The representation

::: definition State-space models and their non-uniqueness {#def-ss}
A linear time-invariant system is
$$
\dot{x} = A x + B u, \qquad y = C x + D u,
$$
with $x \in \mathbb{R}^{n}$ the **state** — the minimal set of numbers that, given $u (t )$ for $t \ge t_0$, determines $y (t )$ for all later time. The solution is
$$
x (t ) = \mathrm{e}^{A \left( t - t_0 \right)} x \left( t_0 \right) + \int_{t_0}^{t} \mathrm{e}^{A \left( t - \tau \right)} B u (\tau ) \mathrm{d} \tau,
\qquad
G (s ) = C \left( sI - A \right)^{- 1} B + D .
$$
The representation is **not unique**: for any nonsingular $T$, the substitution $x = T z$ gives $\tilde{A} = T^{- 1} A T$, $\tilde{B} = T^{- 1} B$, $\tilde{C} = C T$, and the same $G (s )$. Physical states — a position, a capacitor voltage, a tank level — are one choice among infinitely many, and the modal choice, which diagonalises $A$, is usually the one that reveals what the system can do. The transfer function is the invariant; the matrices are a coordinate system on it.
:::

::: example A motor position axis in three coordinate systems {#ex-motor-ss}
Write the state model of a DC motor position axis with an inner current loop, $J = 10^{- 4}\ \mathrm{kg\, m^{2}}$, viscous friction $b = 10^{- 5}\ \mathrm{N\, m\, s}$, torque constant $K = 0.08\ \mathrm{N\, m / A}$, taking the current reference as input and the shaft angle as output.
::: solution
**Physical states** $x = \left[ \theta , \omega \right]^{T}$ with $K / J = 800\ \mathrm{rad\, s^{- 2} / A}$ and $b / J = 0.1\ \mathrm{s^{- 1}}$:
$$
\dot{x} = \begin{bmatrix} 0 & 1 \\ 0 & - 0.1 \end{bmatrix} x + \begin{bmatrix} 0 \\ 800 \end{bmatrix} i,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**Controllable canonical form**, reading the transfer function $G = 800 / \left( s^{2} + 0.1 s \right)$ directly:
$$
A_c = \begin{bmatrix} 0 & 1 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_c = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad
C_c = \begin{bmatrix} 0 & 800 \end{bmatrix},
$$
which is the same $A$ because the physical states happened to be the phase variables.
**Modal form.** The eigenvalues are $0$ and $- 0.1$; with $T$ the modal matrix,
$$
A_\Lambda = \begin{bmatrix} 0 & 0 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_\Lambda = \begin{bmatrix} - 8000 \\ 8000 \end{bmatrix}, \quad
C_\Lambda = \begin{bmatrix} 1 & 1 \end{bmatrix} .
$$
The modal $B$ is the useful one: the two entries have **equal magnitude**, which says the integrator mode and the friction mode are equally controllable, and the modal $C$ says both are equally observable. Had the friction been zero, the two eigenvalues would have coalesced at the origin and the modal form would not exist — a defective matrix, a repeated pole with one eigenvector, and the reason a frictionless motor's model is best left in the physical coordinates.

*Check.* $C \left( sI - A \right)^{- 1} B = \left[ 1 \; 1 \right] \operatorname{diag} \left( 1 / s , 1 / \left( s + 0.1 \right) \right) \left[ - 8000 , 8000 \right]^{T} = 8000 \left( \frac{1}{s + 0.1} - \frac{1}{s} \right) = \frac{800}{s \left( s + 0.1 \right)}$ $\checkmark$

*Sanity.* The three representations have identical input-output behaviour and identical pole-placement answers, and the choice between them is a choice of what to **see**. The modal form is the one that answers "can I control the flexible mode?" and the physical form is the one that answers "what does the sensor measure?", and a designer who works only in the controllable canonical form will compute a correct gain and be unable to say why the second mode is ringing.
:::
:::

## Controllability and observability

::: definition The two rank tests {#def-rank}
The **controllability matrix** and the **observability matrix** are
$$
\mathcal{C} = \begin{bmatrix} B & A B & \cdots & A^{n - 1} B \end{bmatrix} \in \mathbb{R}^{n \times n m},
\qquad
\mathcal{O} = \begin{bmatrix} C \\ C A \\ \vdots \\ C A^{n - 1} \end{bmatrix} \in \mathbb{R}^{n p \times n} .
$$
The system is controllable when $\operatorname{rank} \mathcal{C} = n$ and observable when $\operatorname{rank} \mathcal{O} = n$. Equivalently, the **Popov-Belevitch-Hautus** tests: uncontrollable if and only if some left eigenvector $w$ of $A$ satisfies $w^{H} B = 0$, and unobservable if and only if some right eigenvector $v$ satisfies $C v = 0$. A mode that is both uncontrollable and unobservable is hidden from the design entirely and appears in the closed loop whether the designer likes it or not; a mode that is uncontrollable but observable is stable and irrelevant; a mode that is **controllable but unobservable** is the dangerous one, because the observer will estimate it wrongly and the controller will act on the error.
:::

::: proof Why the rank tests are what they are {#proof-rank}
**Controllability.** Iterating $\dot{x} = A x + B u$ over $n$ sampling instants, or working the continuous-time integral for a piecewise-constant input over $\left[ 0 , T \right]$, expresses the reachable set as the span of $\left\{ B , A B , \ldots \right\}$:
$$
x (T ) - \mathrm{e}^{A T} x (0 ) = \int_0^{T} \mathrm{e}^{A \left( T - \tau \right)} B u \, \mathrm{d} \tau
= \sum_{k = 0}^{\infty} \frac{\left( - 1 \right)^{k} A^{k} B}{k!} \int_0^{T} \left( T - \tau \right)^{k} u (\tau ) \mathrm{d} \tau .
$$
Every term lies in the column space of $\mathcal{C}$, and by Cayley-Hamilton no term adds anything beyond $A^{n - 1} B$, so the reachable set **is** that column space. $\checkmark$
**The diagonal case, where the meaning is visible.** For $A = \operatorname{diag} \left( \lambda_i \right)$,
$$
\mathcal{C} = \begin{bmatrix} b_1 & \lambda_1 b_1 & \cdots \ b_2 & \lambda_2 b_2 & \cdots \ \vdots \end{bmatrix},
$$
and row $i$ vanishes if and only if $b_i = 0$. A mode whose input coefficient is zero cannot be moved, and the rank test is the statement that a Vandermonde matrix of distinct $\lambda_i$ has full rank once every row is nonzero. $\checkmark$
**Duality.** $\left( A , B \right)$ controllable if and only if $\left( A^{T} , C \right)$ observable, since $\mathcal{O} \left( A , C \right) = \mathcal{C}^{T} \left( A^{T} , C^{T} \right)$. Every controllability theorem therefore has an observability twin, and the observer design below is the controller design with the arrows reversed. $\checkmark$

*Note.* The rank test is a statement about an **exact** model, and this is where the engineering begins. A mode that is uncontrollable to within one part in $10^{6}$ is controllable in arithmetic and useless in practice, because the gain needed to control it is a million times the gain that would control a properly actuated mode. The practical quantity is therefore not the rank but the **smallest singular value** of $\mathcal{C}$, or better, the minimum control energy
$$
E_{\min} = x_T^{T} W_c \left( T \right)^{- 1} x_T ,
\qquad
W_c (T ) = \int_0^{T} \mathrm{e}^{A \tau} B B^{T} \mathrm{e}^{A^{T} \tau} \mathrm{d} \tau,
$$
to reach a target state $x_T$. A mode with a small $\sigma_{\min} (\mathcal{C})$ has a large $E_{\min}$, and a designer who computes it before placing poles finds that the specification which looked achievable costs a actuator that does not exist.
:::

::: widget plot
f: abs(sin(pi*x)); abs(sin(2*pi*x))
x: 0, 1
y: 0, 1.05
labels: mode 1; mode 2
caption: The magnitude of the first two mode shapes of a uniform simply-supported beam against the position of a single force actuator. Where a curve crosses zero, that mode is uncontrollable from that actuator position: an actuator at mid-span cannot excite the second mode at all, and the rank test reports it exactly. The designer's move is to place actuators away from the nodes of the modes that must be controlled, and the reason a flexible structure with one actuator is a design problem and not a control problem.
:::

::: example Which modes can you reach? {#ex-reach}
A simply-supported bridge deck of span $L$ is to be controlled by a single tuned mass damper modelled as a force actuator at mid-span. Which of the first four vertical modes can it control, and what does the rank test say?
::: solution
The mode shapes are $\varphi_n \left( x \right) = \sin \left( n \pi x / L \right)$, so in modal coordinates the input vector is $B_n = \varphi_n \left( x_a \right)$ and at mid-span
$$
B_n = \sin \frac{n \pi}{2} = 1 , 0 , - 1 , 0 , \ldots
$$
The even modes have a **node** at mid-span and are uncontrollable. The controllability matrix for the odd modes is full rank because their eigenvalues $\omega_1 \ne \omega_3$ are distinct; for the even modes the corresponding rows of $\mathcal{C}$ vanish and the rank is $n - 2$.
**The energy.** For the third mode the actuator sits at an **antinode** of magnitude $1$, the same as for the first, so the force needed to inject a given modal energy is the same — but the third mode's modal mass is the same and its frequency is three times higher, so the same force produces three times the modal velocity per unit energy and the authority per newton is three times better.
**The fix.** Move the damper off mid-span, or use two dampers at $L / 4$ and $3 L / 4$, which are antinodes of the second mode and nodes of neither.

*Check.* With actuators at $L / 4$ and $3 L / 4$, $B_n = \left[ \sin \frac{n\pi}{4} , \sin \frac{3 n\pi}{4} \right]$ gives for $n = 2$ the vector $\left[ 0.707 , - 0.707 \right]$, nonzero and of full modal authority; for $n = 4$, $\left[ - 1 , 1 \right]$; and for $n = 3$, $\left[ 0.707 , 0.707 \right]$. $\checkmark$

*Sanity.* The rank test is exact and the physics is approximate: a real deck's modes are not perfectly sinusoidal, a real damper is not a point force, and the "uncontrollable" even modes are weakly controllable through the deck's asymmetry — which is worse than truly uncontrollable, because the designer's model says the mode is not there and the wind or the traffic says it is. The engineering rule is that an actuator within ten per cent of a mode's node has effectively no authority over it, and that a modal controllability plot drawn before the actuator positions are fixed costs an hour and prevents a retrofit.
:::
:::

## Pole placement and the observer

::: definition State feedback, Ackermann's formula and the observer {#def-placement}
With full-state feedback $u = - K x + k_r r$ the closed loop is $\dot{x} = \left( A - B K \right) x + B k_r r$, and if $\left( A , B \right)$ is controllable, $K$ may be chosen to place the $n$ closed-loop poles at any self-conjugate set. For single input, **Ackermann's formula** gives
$$
K = \begin{bmatrix} 0 & \cdots & 0 & 1 \end{bmatrix} \mathcal{C}^{- 1} \alpha_d (A ),
\qquad
\alpha_d (s ) = \prod_i \left( s - p_i \right) .
$$
For the double integrator $A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & 0 \end{smallmatrix} \right]$, $B = \left[ \begin{smallmatrix} 0 \\ 1 \end{smallmatrix} \right]$ this reduces to the textbook result $K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$.
The **full-order observer** propagates a model of the plant and corrects it by the output error,
$$
\dot{\hat{x}} = A \hat{x} + B u + L \left( y - C \hat{x} \right),
$$
and the error $e = x - \hat{x}$ obeys $\dot{e} = \left( A - L C \right) e$ independently of $u$. If $\left( A , C \right)$ is observable, $L$ places the observer poles anywhere. The **separation principle** states that with $u = - K \hat{x} + k_r r$ the combined $2 n$-state system has the $2 n$ eigenvalues $\operatorname{eig} \left( A - B K \right) \cup \operatorname{eig} \left( A - L C \right)$, so the two designs are done independently.
:::

::: proof The separation principle {#proof-separation}
With $u = - K \hat{x}$ and $e = x - \hat{x}$,
$$
\dot{x} = A x - B K \left( x - e \right) = \left( A - B K \right) x + B K e,
\qquad
\dot{e} = \left( A - L C \right) e,
$$
so in the coordinates $\left[ x , e \right]$ the system matrix is **block triangular**,
$$
\begin{bmatrix} \dot{x} \\ \dot{e} \end{bmatrix}
= \begin{bmatrix} A - B K & B K \\ 0 & A - L C \end{bmatrix}
\begin{bmatrix} x \\ e \end{bmatrix} .
$$
The eigenvalues of a block-triangular matrix are the union of the diagonal blocks' eigenvalues, and the off-diagonal $B K$ affects the **modes' shapes** and the transient weighting but not the poles. $\checkmark$
**What the principle does not say.** It says nothing about the **transient response**, and the off-diagonal block is exactly where the trouble lives: the closed-loop transfer function from $r$ to $y$ is not the transfer function of the state-feedback design, because the estimator's dynamics appear in it. Written out, the controller is a dynamic compensator
$$
C (s ) = K \left( sI - A + B K + L C \right)^{- 1} L ,
$$
whose high-frequency behaviour is set by $L$ and whose order equals the plant's. A fast observer makes this compensator behave like a high-gain differentiator, and the loop-recovery argument that reconciles the two designs shows that the recovered loop's sensitivity peak grows with the observer bandwidth. The separation principle is a statement about **poles**, and a designer who reads it as a statement about **performance** produces a loop that is stable, has the poles it asked for, and is fragile in ways the state-feedback design would never have been. $\checkmark$
:::

::: example Pole placement with an observer {#ex-poleplace}
Design a state-feedback controller and observer for the motor axis of Example 1, with a closed-loop natural frequency of $20\ \mathrm{rad / s}$, damping $0.707$, and an observer at $100\ \mathrm{rad / s}$ with damping $0.9$.
::: solution
**Feedback.** With $A$ and $B$ as in Example 1, the characteristic polynomial of $A - B K$ is
$$
s^{2} + \left( 0.1 + 800 k_2 \right) s + 800 k_1 ,
$$
and matching $s^{2} + 2 \times 0.707 \times 20 s + 400 = s^{2} + 28.28 s + 400$ gives
$$
k_1 = 0.500\ \mathrm{A / rad}, \qquad k_2 = 0.0352\ \mathrm{A\, s / rad} .
$$
**Feedforward.** The plant's DC gain from $i$ to $\theta$ is infinite, so $k_r$ is set by requiring the closed-loop DC gain to be unity: $k_r = 0.500\ \mathrm{A / rad}$ of reference.
**Observer.** $A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & - 0.1 \end{bmatrix}$ with characteristic polynomial
$$
s^{2} + \left( L_1 + 0.1 \right) s + \left( 0.1 L_1 + L_2 \right) = s^{2} + 180 s + 10^{4},
$$
so $L_1 = 179.9\ \mathrm{s^{- 1}}$ and $L_2 = 9982\ \mathrm{s^{- 2}}$.
**Check.** The four closed-loop eigenvalues are $- 14.14 \pm 14.14\ \mathrm{j}$ and $- 90 \pm 43.6\ \mathrm{j}$ — exactly the two designs, as the separation principle requires.

*Sanity.* The observer's gain $L_2$ of nearly ten thousand is the number to look at. It means the estimator reacts to a one-radian output error by driving the estimated velocity at $10^{4}\ \mathrm{rad / s}$ per second, and it means that **sensor noise is injected into the control signal with a gain of $L_2 / b = 12.5$ per unit of noise in the position measurement** — the equivalent of a derivative gain of $12.5\ \mathrm{A\, s / rad}$ against a feedback $k_2$ of $0.035$. The observer has, in effect, built a differentiator into the loop, and its corner is set by the observer bandwidth. This is why the "five times" rule exists: at $100\ \mathrm{rad / s}$ against a $20\ \mathrm{rad / s}$ controller the noise penalty is a factor of five in the derivative band, and at $1000\ \mathrm{rad / s}$ it is a factor of fifty and the encoder's noise floor decides the design.
:::
:::

::: example An observer that estimates what cannot be measured {#ex-estimator}
A tank level is measured, but the **inflow** — the disturbance that matters — is not. Estimate it.
::: solution
**Model.** With $h$ the level, $q_{in}$ the unknown inflow and $u$ the measured outflow, $A \dot{h} = q_{in} - u$, so with $x = \left[ h , q_{in} \right]^{T}$ and $q_{in}$ modelled as a constant,
$$
\dot{x} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} x + \begin{bmatrix} - 1 / A \\ 0 \end{bmatrix} u,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**Observability.** $\mathcal{O} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ — full rank. The inflow is observable because it shows up as the **slope** of the level, which is exactly what an integrator-based estimator extracts.
**Observer.** $A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & 0 \end{bmatrix}$ with $s^{2} + L_1 s + L_2$. Choosing a double pole at $- \omega_o$ gives $L_1 = 2 \omega_o$, $L_2 = \omega_o^{2}$, and the estimator is recognisably a **second-order generalisation of a phase-locked loop**: the level error drives the level estimate, and the level error also integrates into the inflow estimate.
**Time scale.** With $A = 4\ \mathrm{m^{2}}$ and a nominal inflow of $0.02\ \mathrm{m^{3} / s}$, choosing $\omega_o = 0.02\ \mathrm{rad / s}$ (a $50\ \mathrm{s}$ time constant) gives $L_1 = 0.04$, $L_2 = 4 \times 10^{- 4}$, and an inflow estimate that settles to within five per cent in about $250\ \mathrm{s}$ after a step change of inflow.

*Check.* The estimator's transfer function from $y$ to $\hat{q}_{in}$ is $L_2 / \left( s^{2} + L_1 s + L_2 \right) \times s$, which at low frequency gives $\hat{q}_{in} \approx s \hat{h}$ — the derivative of the level — and the whole design is a **filtered derivative** with the filter placed by $\omega_o$. $\checkmark$

*Sanity.* The unknown-input estimator is the most under-used idea in this lesson, because it replaces a measured disturbance with a computed one and the computed one needs no calibration. Its limitation is exactly the limitation of any derivative: the estimate of $q_{in}$ is only as good as the level signal's slope, and a level gauge with $2\ \mathrm{cm}$ of noise on a $50\ \mathrm{s}$ estimator gives an inflow noise of $2 \times 10^{- 2} \times \omega_o / \sqrt{2} \approx 2 \times 10^{- 4}\ \mathrm{m^{3} / s}$, one per cent of the nominal — acceptable. Halve the estimator's time constant to get faster tracking and the noise doubles, which is the same trade the derivative filter makes and for the same reason.
:::
:::

::: example Design {#ex-design-two-mass}
A servo axis drives a load through a harmonic drive. The motor inertia reflected to the output is $J_m = 0.05\ \mathrm{kg\, m^{2}}$, the load inertia is $J_L = 0.05\ \mathrm{kg\, m^{2}}$ and the coupling's torsional stiffness is $K_c = 2000\ \mathrm{N\, m / rad}$. The specification is a position bandwidth of $32\ \mathrm{rad / s}$ with $\zeta = 0.8$, and the load position is measured. Design the loop and decide what to measure.
::: solution
**The plant.** With $\delta = \theta_m - \theta_L$ the coupling deflection,
$$
\ddot{\theta}_L = \frac{K_c}{J_L} \delta = 40{,}000 \delta,
\qquad
\ddot{\delta} = - \frac{K_c \left( J_m + J_L \right)}{J_m J_L} \delta + \frac{1}{J_m} \tau = - 80{,}000 \delta + 20 \tau ,
$$
so the open-loop eigenvalues are two at the origin and a pair at $\pm 283\ \mathrm{j}$, and the transfer function from torque to **load** position is
$$
\frac{\Theta_L}{\Tau} = \frac{800{,}000}{s^{2} \left( s^{2} + 80{,}000 \right)} ,
$$
a double integrator with an **undamped** resonance at $\omega_r = 283\ \mathrm{rad / s}$ and **no antiresonance at all**. Sensing the **motor** instead gives
$$
\frac{\Theta_m}{\Tau} = \frac{800{,}000 \left( s^{2} + 40{,}000 \right)}{s^{2} \left( s^{2} + 80{,}000 \right)},
$$
which has the antiresonance at $\omega_a = 200\ \mathrm{rad / s}$ and is the better-behaved plant.
**State feedback.** With $x = \left[ \theta_L , \omega_L , \delta , \dot{\delta} \right]^{T}$ the model is controllable from $\tau$, and placing the four poles at $- 32 \pm 32\ \mathrm{j}$ and $- 20 \pm 15\ \mathrm{j}$ gives
$$
K = \begin{bmatrix} 1.60 & 0.152 & - 3740 & 5.20 \end{bmatrix}
$$
in units of $\mathrm{N\, m}$ per radian and per radian per second. The third entry is the interesting one: a **deflection feedback** of $3740\ \mathrm{N\, m}$ per radian of twist, twenty times the coupling's own stiffness, which is what damps the resonance that the load-sensing plant leaves undamped.
**Observer.** The deflection and its rate are not measured, so a fourth-order observer is needed. Placing it at five times the controller puts it at $160\ \mathrm{rad / s}$, uncomfortably near the $200\ \mathrm{rad / s}$ antiresonance of the motor-sensing plant and squarely below the $283\ \mathrm{rad / s}$ resonance of the load-sensing one; the observer's gain then feeds the estimation error into the torque command with enough gain to excite exactly the mode it is trying to damp.

*Design comment.* Three options beat the fourth-order design, and a drive engineer takes them in this order. **Notch the torque command** at $283\ \mathrm{rad / s}$ and close a PID position loop at $32\ \mathrm{rad / s}$: the notch costs $25^{\circ}$ of phase at the crossover and the whole design is verifiable by frequency response. **Add a motor-side encoder**, which makes the deflection directly measurable, reduces the observer to second order, and moves the plant's phase up by $180^{\circ}$ through the resonance. Or **stiffen the coupling**, which pushes $\omega_r$ above $500\ \mathrm{rad / s}$ and makes the fourth-order design comfortable. What the arithmetic establishes is the reason all three exist: with an undamped resonance at only nine times the crossover and a state estimator that must be placed between the crossover and that resonance, the framework's answer exists on the model and costs an $M_s$ check that fails. The framework earns its cost when the structure has **several** flexible modes near the bandwidth, or several inputs — a robot arm, a gantry, a disk drive — where no single notch suffices.
:::
:::

::: history
The state-space method arrives with **Rudolf E. Kálmán**'s 1960 memorandum *"A new approach to linear filtering and prediction problems"* at the Research Laboratories of Lockheed Aircraft in Palo Alto, and its 1961 sequel on controllability and observability. The reception is one of the discipline's celebrated embarrassments: the filtering paper was submitted to the *IRE Transactions on Automatic Control* and rejected, and Kálmán redirected it to the *Journal of Basic Engineering*, where it became one of the most cited papers in engineering; a later submission was rejected on the reviewer's advice that its results were of no interest, and Kálmán later wrote that he had learned from it to submit only to journals whose editors he knew. **Kálmán** and **Richard S. Bucy** published the finite-dimensional filter in 1961, and the **Kalman-Bucy filter** of 1960-1963 unified Wiener's frequency-domain filtering of the war years with the recursive least-squares of the statisticians.
Controllability and observability as rank tests, and the duality between them, are in **Kálmán**'s 1963 paper *"Mathematical formulation of the linear optimal control problem"* and in **Kalman and Bertram**'s 1960 Lyapunov paper. The observer is **Luenberger**'s 1964 note *"Observing the state of a linear system"*, published in *Mathematical Biosciences* to avoid an engineering journal's page limits, and the separation principle is in the same four pages. The geometric and structural theory is **Basile and Marro**'s, **Wolovich**'s and **Kailath**'s work through the 1960s, with **Roger W. Brockett**'s 1970 book and **Wonham**'s *Linear Multivariable Control* of 1979 the standard references. The pole-placement recipe most textbooks give is due to **Bass and Gura** (1965) in the general form and to **H. Ackermann** (1972) in the single-input formula, published in a paper explicitly written for classroom use. The optimal regulator is **Kálmán**'s 1960 result built on **Bellman**'s dynamic programming of 1957 and **Kalman and Yakubovich**'s positive-real lemma; the loop-transfer recovery that reconciles the resulting freedom with frequency-domain robustness is **H. Kimura**'s 1981 paper and **Doyle and Stein**'s 1981 paper *"Multivariable feedback design: concepts for a classical/modern synthesis"*, which is the essay that told a generation of control engineers that their two traditions were one.
:::

## Where this leads

::: quiz
A plant is controllable and a designer places the closed-loop poles far to the left of the plant's own dynamics. What is the consequence?
- [x] The feedback gain required grows without bound, and the real plant's unmodelled dynamics are excited
- [ ] Nothing — arbitrary pole placement is always safe
- [ ] The system becomes unobservable
- [ ] The observer must be slowed
::: solution
Pole placement is a property of the model, and the model stops being the plant at high frequency. Pushing the closed-loop poles past the frequency where the model's error reaches unity means the loop is being designed against dynamics that are not in the design, and the gain that was computed to place them is the gain that destabilises the real system.
:::
:::

The observer's noise sensitivity is the same trade as the derivative filter of [[control-systems/pid-control]], the recovered loop's sensitivity peak is the waterbed of [[control-systems/feedback-stability]], the discretisation that a real observer needs is the subject of [[control-systems/digital-control]], and the two-mass plant of Example 7 is the two-degree-of-freedom resonance of [[vibrations/two-degrees-of-freedom]] seen from the control side.

::: summary
- A state model is a coordinate system on a transfer function; the modal coordinates are the ones that show which modes an actuator can reach and a sensor can see.
- Controllability and observability are rank tests, and their practical content is not the rank but the smallest singular value and the control energy it implies.
- Controllable systems admit arbitrary pole placement by Ackermann's formula; observable systems admit arbitrary observer pole placement, and the two designs are independent because the combined matrix is block triangular.
- The separation principle is about poles and not about performance: the compensator it produces has the observer's dynamics in its high-frequency behaviour, and its sensitivity peak grows with observer bandwidth.
- Unknown-input estimation is an under-used technique that turns an unmeasured disturbance into a filtered derivative of what is measured, with the same noise trade as any derivative.
- For a single-input single-output plant with one flexible mode, a notch and a PID are usually cheaper than a full-order design; the framework pays when there are several modes, several inputs or unmeasured states that must be reconstructed.
:::

## Exercises

::: exercise States {level=1 check="2"}
How many states does a model of a mass, a spring and a dashpot in series need, with the position as output and a force as input?
::: solution
Two — the mass's velocity and the spring's deflection.
:::
:::

::: exercise Rank {level=1 check="0"}
For $A = \operatorname{diag} \left( 1 , 2 \right)$ and $B = \left[ 1 , 0 \right]^{T}$, what is the rank of the controllability matrix?
::: solution
One. The second mode has no input coefficient and is uncontrollable.
:::
:::

::: exercise Dual {level=1 check="1"}
If $\left( A , B \right)$ is controllable, what property does $\left( A^{T} , B^{T} \right)$ have?
::: solution
Observability — the observability matrix of $\left( A^{T} , B^{T} \right)$ is the transpose of the controllability matrix of $\left( A , B \right)$.
:::
:::

::: exercise Eigenvalues {level=1 check="4"}
For a controllable second-order system, how many closed-loop poles may state feedback place?
::: solution
Two — one per state.
:::
:::

::: exercise Canonical form {level=2}
Write the controllable canonical form of $G = \left( 3 s + 5 \right) / \left( s^{2} + 2 s + 7 \right)$ and read off $A , B , C$.
::: solution
$$
A = \begin{bmatrix} 0 & 1 \\ - 7 & - 2 \end{bmatrix}, \quad
B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad
C = \begin{bmatrix} 5 & 3 \end{bmatrix}, \quad D = 0 .
$$
*Sanity.* The last row of $A$ is the negative of the denominator's coefficients and $C$ is the numerator read in descending powers, which is the whole construction; the check is $C \left( sI - A \right)^{- 1} B = \left( 3 s + 5 \right) / \left( s^{2} + 2 s + 7 \right)$, and a designer who has done the multiplication once never again doubts the recipe.
:::
:::

::: exercise Ackermann {level=2}
Use Ackermann's formula on the double integrator with desired poles at $- 10 \pm 10\ \mathrm{j}$ and give $K$.
::: solution
$\alpha_d (s ) = s^{2} + 20 s + 200$, and $\mathcal{C} = \left[ B , AB \right] = \left[ \begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix} \right]$, so
$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \mathcal{C}^{- 1} \left( A^{2} + 20 A + 200 I \right)
= \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 200 & 20 \\ 20 & 20 \end{bmatrix} = \begin{bmatrix} 200 & 20 \end{bmatrix} .
$$
*Sanity.* $\omega_n = \sqrt{200} = 14.1$ and $2 \zeta \omega_n = 20$ give $\zeta = 0.707$, and the general rule $K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$ for a double integrator follows immediately — which is the same answer as placing a PD controller by matching coefficients, and the first indication that state feedback on a system whose states are all measured is not a new technique but a systematic version of the old one.
:::
:::

::: exercise Observer gain {level=2}
For $A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & - 3 \end{smallmatrix} \right]$, $C = \left[ 1 \; 0 \right]$, find $L$ for observer poles at $- 6 \pm 6\ \mathrm{j}$.
::: solution
$A - LC$ has characteristic polynomial $s^{2} + \left( L_1 + 3 \right) s + \left( 3 L_1 + L_2 \right)$; matching $s^{2} + 12 s + 72$ gives $L_1 = 9$ and $L_2 = 45$.
*Sanity.* The observer's poles are $0.6\ \mathrm{Hz}$-equivalent faster than the plant's own at $- 3$, which is a modest and defensible ratio; the gain $L_2 = 45$ is the equivalent derivative action and is the number to check against the measurement noise before the design is accepted.
:::
:::

::: exercise Separation {level=2}
A design places the controller poles at $- 5 \pm 5\ \mathrm{j}$ and the observer poles at $- 50$. List the closed-loop eigenvalues of the combined system.
::: solution
$- 5 + 5\ \mathrm{j}$, $- 5 - 5\ \mathrm{j}$ and $- 50$ — three eigenvalues for a third-order plant with a third-order observer, and no interaction between the two sets.
*Sanity.* The observer pole at $- 50$ is ten times the real part of the dominant pair, which is at the upper end of the useful range; the transient weighting of that fast mode is what makes the step response of an observer-based design differ from the state-feedback design's, and it can be large even when the poles are exactly where they were asked to be.
:::
:::

::: exercise Derivation {level=3}
Show that for $A = \operatorname{diag} \left( \lambda_1 , \ldots , \lambda_n \right)$ with distinct eigenvalues, the system is controllable if and only if no entry of any row of $B$ is zero, and state what the corresponding statement is for a repeated eigenvalue.
::: solution
$\mathcal{C} = \left[ B , AB , \ldots , A^{n - 1} B \right]$ has row $i$ equal to $b_i \left[ 1 , \lambda_i , \ldots , \lambda_i^{n - 1} \right]$, so $\mathcal{C} = \operatorname{diag} \left( b_i \right) V$ where $V$ is the Vandermonde matrix of the $\lambda_i$. A Vandermonde matrix of distinct nodes is nonsingular, so $\operatorname{rank} \mathcal{C} = n$ if and only if every $b_i \ne 0$.
For a **repeated** eigenvalue the Vandermonde argument fails and the correct statement is the PBH test: the mode is controllable if and only if $\operatorname{rank} \left[ \lambda I - A , B \right] = n$, which for a defective repeated eigenvalue can hold even when some $b_i$ vanish in a particular coordinate choice — the coordinate-dependent statement is meaningless and the PBH statement is not.
*Sanity.* The distinction is not pedantry: a model built from measured frequency-response data is identified only up to a similarity transformation, and a designer who tests controllability by inspecting the entries of a $B$ matrix in a modal realisation obtained from a numerical fit will get the wrong answer whenever two eigenvalues are close, because the modal matrix becomes ill-conditioned and the entries of $B$ become meaningless. The rank test on the original physical realisation, or the PBH test, is the only reliable procedure.
:::
:::

::: exercise Design {level=3}
A first-order plant $\dot{x} = - x + 2 u$, $y = x$, is to be controlled by state feedback with an integral term to track a step with zero error, and an observer at twice the closed-loop rate. Place the two controller poles at $- 3 \pm 3\ \mathrm{j}$ and find all the gains.
::: solution
**Augment.** With $\dot{z} = r - x$ and $u = - k_1 x - k_2 z$,
$$
\begin{bmatrix} \dot{x} \\ \dot{z} \end{bmatrix}
= \begin{bmatrix} - 1 - 2 k_1 & - 2 k_2 \\ - 1 & 0 \end{bmatrix}
\begin{bmatrix} x \\ z \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} r ,
$$
whose characteristic polynomial is $s^{2} + \left( 1 + 2 k_1 \right) s + 2 k_2$. Matching $s^{2} + 6 s + 18$ gives
$$
k_1 = 2.5, \qquad k_2 = 9.0 .
$$
**Observer.** For the plant alone, $\left( A - L C \right) = - 1 - L = - 6$ gives $L = 5$.
**Check.** The closed-loop transfer function from $r$ to $y$ is $18 / \left( s^{2} + 6 s + 18 \right)$ — no zeros, because the integral action's zero has been cancelled by the structure — with $\zeta = 0.707$, $\omega_n = 4.24$ and a $2\ \%$ settling time of $1.33\ \mathrm{s}$.

*Sanity.* The observer is a first-order filter with a pole at $- 6$ against the closed loop's real part of $- 3$, a ratio of two, which is the minimum defensible separation and gives a compensator $C (s ) = k_2 \left( s + 1 + L \right) / \left( s \left( s + 6 \right) \right) \ldots$ — recognisably a PID with a lag. Every observer-based design on a low-order plant reduces to a compensator someone could have drawn in 1950, and the exercise's value is in seeing the reduction: the framework's answer to "what is an integral controller?" is "an observer for a state that models the reference as a step disturbance", which is the correct and general answer.
:::
:::
