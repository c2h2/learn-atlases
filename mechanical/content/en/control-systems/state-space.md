A transfer function relates an output to an input. A state-space model relates the **whole present** of a system to its own past and to the input, and out of that difference comes everything that makes the modern methods worth the linear algebra: the ability to handle several inputs and several outputs at once, to say precisely which parts of a system a given actuator can reach and a given sensor can see, to place closed-loop poles by arithmetic instead of by sketching, and to estimate a variable that cannot be measured. The framework is not a better way of doing what the frequency methods do — for a single loop they do it better — it is the only way of doing the things a single loop cannot.

The subject reduces to three questions and their rank tests. **Can the input drive every mode?** Controllability, and the answer is a matrix rank. **Can the output reveal every mode?** Observability, and the answer is a transposed matrix rank. **If both, how fast and how well?** Pole placement and the observer, and the answer is that you may put the closed-loop poles anywhere you like and the estimator poles anywhere you like, independently, and the two designs multiply. Everything else — the optimal regulators, the Kalman filter, the loop-transfer recovery that reconciles this freedom with the frequency-domain margins — builds on these three.

::: warning Pole placement is easy to misuse
Given a controllable model, arbitrary pole placement is a formula, and a designer who has just learned it will place the closed-loop poles wherever the specification asks and the observer poles a decade or more above them. Both moves need care. Placing poles far to the left of what the plant's own dynamics support demands **control effort**: the feedback gain required grows rapidly as the desired bandwidth rises, and for a plant with a right-half-plane zero or a lightly damped flexible mode the gain computed to move poles past it can be **destabilising in the real plant**, because the model that produced the gain is not the plant. Placing the observer very fast has a subtler cost: the faster the observer, the more closely the loop recovers the margins of the state-feedback design, but the compensator's gain at high frequency rises roughly in proportion to the observer bandwidth, so sensor noise and unmodelled high-frequency dynamics are amplified. The rule that keeps both honest is that **the closed-loop bandwidth should stay below the frequency at which the model's error becomes large**, and that the observer is typically placed two to five times faster than the controller, with its exact speed set by the sensor noise. The separation principle is arithmetically true whatever is chosen; the engineering lies in these choices.
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
C_c = \begin{bmatrix} 800 & 0 \end{bmatrix},
$$
which is the same $A$ because the physical states happened to be the phase variables.
**Modal form.** The eigenvalues are $0$ and $- 0.1$; with $T$ the modal matrix,
$$
A_\Lambda = \begin{bmatrix} 0 & 0 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_\Lambda = \begin{bmatrix} 8000 \\ - 8000 \end{bmatrix}, \quad
C_\Lambda = \begin{bmatrix} 1 & 1 \end{bmatrix} .
$$
With $C_\Lambda$ normalised to ones, the modal $B$ lists the residues of the partial-fraction expansion, $8000 / s - 8000 / \left( s + 0.1 \right)$: both are nonzero, so both modes are controllable and observable, and their near-cancellation above $0.1\ \mathrm{rad / s}$ is why the axis behaves there like the pure double integrator $800 / s^{2}$. Had the friction been zero, the two eigenvalues would have coalesced at the origin and the modal form would not exist — a defective matrix, a repeated pole with one eigenvector — and the Jordan form or the physical coordinates must be used instead.

*Check.* $C \left( sI - A \right)^{- 1} B = \left[ 1 \; 1 \right] \operatorname{diag} \left( 1 / s , 1 / \left( s + 0.1 \right) \right) \left[ 8000 , - 8000 \right]^{T} = 8000 \left( \frac{1}{s} - \frac{1}{s + 0.1} \right) = \frac{800}{s \left( s + 0.1 \right)}$ $\checkmark$

*Sanity.* The three representations have identical input-output behaviour and identical pole-placement answers, and the choice between them is a choice of what to **see**. The modal form is the one that answers "can I control the flexible mode?" and the physical form is the one that answers "what does the sensor measure?"; the controllable canonical form is convenient for computing gains but hides both.
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
The system is controllable when $\operatorname{rank} \mathcal{C} = n$ and observable when $\operatorname{rank} \mathcal{O} = n$. Equivalently, the **Popov-Belevitch-Hautus** tests: uncontrollable if and only if some left eigenvector $w$ of $A$ satisfies $w^{H} B = 0$, and unobservable if and only if some right eigenvector $v$ satisfies $C v = 0$. An uncontrollable mode keeps its open-loop eigenvalue whatever feedback is applied, so the plant can be stabilised only if every uncontrollable mode is already stable (**stabilisability**). An unobservable mode cannot be corrected by an observer, whose error in that mode decays only at the mode's own rate, so a working observer needs every unobservable mode to be stable (**detectability**). A mode that is both is hidden from the input-output description entirely and appears in the closed loop unchanged.
:::

::: proof Why the rank tests are what they are {#proof-rank}
**Controllability.** Iterating $\dot{x} = A x + B u$ over $n$ sampling instants, or working the continuous-time integral for a piecewise-constant input over $\left[ 0 , T \right]$, expresses the reachable set as the span of $\left\{ B , A B , \ldots \right\}$:
$$
x (T ) - \mathrm{e}^{A T} x (0 ) = \int_0^{T} \mathrm{e}^{A \left( T - \tau \right)} B u \, \mathrm{d} \tau
= \sum_{k = 0}^{\infty} \frac{A^{k} B}{k!} \int_0^{T} \left( T - \tau \right)^{k} u (\tau ) \mathrm{d} \tau .
$$
Every term lies in the column space of $\mathcal{C}$, and by Cayley-Hamilton no term adds anything beyond $A^{n - 1} B$, so the reachable set **is** that column space. $\checkmark$
**The diagonal case, where the meaning is visible.** For $A = \operatorname{diag} \left( \lambda_i \right)$,
$$
\mathcal{C} = \begin{bmatrix} b_1 & \lambda_1 b_1 & \cdots \\ b_2 & \lambda_2 b_2 & \cdots \\ \vdots & \vdots & \end{bmatrix},
$$
and row $i$ vanishes if and only if $b_i = 0$. A mode whose input coefficient is zero cannot be moved, and the rank test is the statement that a Vandermonde matrix of distinct $\lambda_i$ has full rank once every row is nonzero. $\checkmark$
**Duality.** $\left( A , B \right)$ controllable if and only if $\left( A^{T} , C \right)$ observable, since $\mathcal{O} \left( A , C \right) = \mathcal{C}^{T} \left( A^{T} , C^{T} \right)$. Every controllability theorem therefore has an observability twin, and the observer design below is the controller design with the arrows reversed. $\checkmark$

*Note.* The rank test is a statement about an **exact** model, and this is where the engineering begins. A mode that is uncontrollable to within one part in $10^{6}$ is controllable in arithmetic and useless in practice, because the gain needed to control it is a million times the gain that would control a properly actuated mode. The practical quantity is therefore not the rank but the **smallest singular value** of $\mathcal{C}$, or better, the minimum control energy
$$
E_{\min} = x_T^{T} W_c \left( T \right)^{- 1} x_T ,
\qquad
W_c (T ) = \int_0^{T} \mathrm{e}^{A \tau} B B^{T} \mathrm{e}^{A^{T} \tau} \mathrm{d} \tau,
$$
to reach a target state $x_T$. A mode with a small $\sigma_{\min} (\mathcal{C})$ has a large $E_{\min}$, and a designer who computes it before placing poles may find that a specification which looked achievable needs an actuator that does not exist.
:::

::: widget plot
f: abs(sin(pi*x)); abs(sin(2*pi*x))
x: 0, 1
y: 0, 1.05
labels: mode 1; mode 2
caption: The magnitude of the first two mode shapes of a uniform simply-supported beam against the position of a single force actuator. Where a curve crosses zero, that mode is uncontrollable from that actuator position: an actuator at mid-span cannot excite the second mode at all, and the rank test reports it exactly. The designer's move is to place actuators away from the nodes of the modes that must be controlled — which is why actuator placement on a flexible structure is decided before the controller is designed.
:::

::: example Which modes can you reach? {#ex-reach}
A simply-supported bridge deck of span $L$ is to be controlled by a single tuned mass damper modelled as a force actuator at mid-span. Which of the first four vertical modes can it control, and what does the rank test say?
::: solution
The mode shapes are $\varphi_n \left( x \right) = \sin \left( n \pi x / L \right)$, so in modal coordinates the input vector is $B_n = \varphi_n \left( x_a \right)$ and at mid-span
$$
B_n = \sin \frac{n \pi}{2} = 1 , 0 , - 1 , 0 , \ldots
$$
The even modes have a **node** at mid-span and are uncontrollable. Each mode contributes two states, and the odd modes' states are controllable because their eigenvalues $\pm \mathrm{j} \omega_1$, $\pm \mathrm{j} \omega_3$ are distinct and their input coefficients nonzero; for the even modes the corresponding rows of the modal $\mathcal{C}$ vanish, so of the eight states of the four modes only four are controllable and the rank is $4$.
**The authority.** For the third mode the actuator also sits at an **antinode**, so the modal force per newton is the same as for the first mode. But a simply supported beam's natural frequencies grow as $n^{2}$, so $\omega_3 = 9 \omega_1$ and the third mode's modal stiffness is $81$ times the first's: the actuator reaches it fully, yet a given force moves it far less.
**The fix.** Move the damper off mid-span. At $x_a = 0.2 L$, $B_n = \sin \left( 0.2 n \pi \right) = 0.59 , 0.95 , 0.95 , 0.59$, and all four modes are reachable from one actuator. Two dampers at $L / 4$ and $3 L / 4$ would reach the first three modes but sit exactly on nodes of the fourth.

*Check.* With actuators at $L / 4$ and $3 L / 4$, $B_n = \left[ \sin \frac{n\pi}{4} , \sin \frac{3 n\pi}{4} \right]$ gives $\left[ 0.707 , 0.707 \right]$ for $n = 1$, $\left[ 1 , - 1 \right]$ for $n = 2$, $\left[ 0.707 , 0.707 \right]$ for $n = 3$ and $\left[ 0 , 0 \right]$ for $n = 4$ — the fourth mode is uncontrollable from that pair. $\checkmark$

*Sanity.* The rank test is exact and the physics is approximate: a real deck's modes are not perfectly sinusoidal, a real damper is not a point force, and the "uncontrollable" even modes are weakly controllable through the deck's asymmetry — which is worse than truly uncontrollable, because the designer's model says the mode is not there and the wind or the traffic says it is. The engineering habit is to treat an actuator close to a mode's node as having little authority over it, and to draw a modal controllability plot before the actuator positions are fixed.
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
whose high-frequency behaviour is set by $L$ and whose order equals the plant's. A fast observer drives the loop towards the margins of the state-feedback design (the idea behind loop-transfer recovery) but makes this compensator's high-frequency gain large, so it amplifies sensor noise and reacts to unmodelled high-frequency dynamics; a slow observer is quiet but changes the margins. The separation principle is a statement about **poles**, and a designer who reads it as a statement about **performance** can produce a loop that has exactly the poles it asked for and still has poor margins or excessive noise. $\checkmark$
:::

::: example Pole placement with an observer {#ex-poleplace}
Design a state-feedback controller and observer for the motor axis of [[#ex-motor-ss]], with a closed-loop natural frequency of $20\ \mathrm{rad / s}$, damping $0.707$, and an observer at $100\ \mathrm{rad / s}$ with damping $0.9$.
::: solution
**Feedback.** With $A$ and $B$ as in [[#ex-motor-ss]], the characteristic polynomial of $A - B K$ is
$$
s^{2} + \left( 0.1 + 800 k_2 \right) s + 800 k_1 ,
$$
and matching $s^{2} + 2 \times 0.707 \times 20 s + 400 = s^{2} + 28.28 s + 400$ gives
$$
k_1 = 0.500\ \mathrm{A / rad}, \qquad k_2 = 0.0352\ \mathrm{A\, s / rad} .
$$
**Feedforward.** The closed-loop DC gain from $r$ to $\theta$ is $800 k_r / \left( 800 k_1 \right)$, so unity requires $k_r = k_1 = 0.500\ \mathrm{A / rad}$ of reference.
**Observer.** $A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & - 0.1 \end{bmatrix}$ with characteristic polynomial
$$
s^{2} + \left( L_1 + 0.1 \right) s + \left( 0.1 L_1 + L_2 \right) = s^{2} + 180 s + 10^{4},
$$
so $L_1 = 179.9\ \mathrm{s^{- 1}}$ and $L_2 = 9982\ \mathrm{s^{- 2}}$.
**Check.** The four closed-loop eigenvalues are $- 14.14 \pm 14.14\ \mathrm{j}$ and $- 90 \pm 43.6\ \mathrm{j}$ — exactly the two designs, as the separation principle requires.

*Sanity.* Eliminating the observer, the controller from measured angle to current is $C (s ) = \left( 442 s + 5000 \right) / \left( s^{2} + 208 s + 15\,470 \right)$: a zero at $11.3\ \mathrm{rad / s}$ that supplies the velocity feedback, and the observer's pole pair, which rolls the gain off. Its gain rises from $0.32\ \mathrm{A / rad}$ at DC to a peak of $2.1\ \mathrm{A / rad}$ near $120\ \mathrm{rad / s}$, and the loop's sensitivity peak is $M_s = 1.42$, against $1.00$ for the ideal state feedback. Moving the observer to $1000\ \mathrm{rad / s}$ brings $M_s$ down to $1.05$ but raises the compensator's peak gain tenfold, to $20\ \mathrm{A / rad}$, so ten times more encoder noise reaches the current command. That is the observer trade in two numbers, and the reason the observer bandwidth is chosen against the sensor's noise rather than as fast as possible.
:::
:::

::: example An observer that estimates what cannot be measured {#ex-estimator}
A tank of cross-sectional area $A_t$ has its level measured, but the **inflow** — the disturbance that matters — is not. Estimate it.
::: solution
**Model.** With $h$ the level, $q_{in}$ the unknown inflow and $u$ the measured outflow, $A_t \dot{h} = q_{in} - u$, so with $x = \left[ h , q_{in} \right]^{T}$ and $q_{in}$ modelled as a constant,
$$
\dot{x} = \begin{bmatrix} 0 & 1 / A_t \\ 0 & 0 \end{bmatrix} x + \begin{bmatrix} - 1 / A_t \\ 0 \end{bmatrix} u,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**Observability.** $\mathcal{O} = \begin{bmatrix} 1 & 0 \\ 0 & 1 / A_t \end{bmatrix}$ — full rank. The inflow is observable because it shows up as the **slope** of the level, which is exactly what an integrator-based estimator extracts.
**Observer.** $A - LC = \begin{bmatrix} - L_1 & 1 / A_t \\ - L_2 & 0 \end{bmatrix}$ with characteristic polynomial $s^{2} + L_1 s + L_2 / A_t$. Choosing a double pole at $- \omega_o$ gives $L_1 = 2 \omega_o$, $L_2 = A_t \omega_o^{2}$, and the estimator has the structure of a second-order (type-2) phase-locked loop: the level error drives the level estimate, and the level error also integrates into the inflow estimate.
**Time scale.** With $A_t = 4\ \mathrm{m^{2}}$ and a nominal inflow of $0.02\ \mathrm{m^{3} / s}$, choosing $\omega_o = 0.02\ \mathrm{rad / s}$ (a $50\ \mathrm{s}$ time constant) gives $L_1 = 0.04\ \mathrm{s^{- 1}}$, $L_2 = 1.6 \times 10^{- 3}\ \mathrm{m^{2} / s^{2}}$, and an inflow estimate whose step response $1 - \left( 1 + \omega_o t \right) \mathrm{e}^{- \omega_o t}$ is within five per cent after $4.74 / \omega_o \approx 240\ \mathrm{s}$.

*Check.* With $u = 0$, the estimator's transfer function from $y$ to $\hat{q}_{in}$ is $A_t s \, \omega_o^{2} / \left( s^{2} + 2 \omega_o s + \omega_o^{2} \right)$, which at low frequency gives $\hat{q}_{in} \approx A_t s y$ — the area times the rate of change of level — so the whole design is a **filtered derivative** with the filter placed by $\omega_o$. $\checkmark$

*Sanity.* The unknown-input estimator is the most under-used idea in this lesson, because it replaces a measured disturbance with a computed one and the computed one needs no calibration. Its limitation is exactly the limitation of any derivative: the estimate of $q_{in}$ is only as good as the level signal's slope, and the filter's gain from level to inflow estimate peaks at $A_t \omega_o / 2 = 0.04\ \mathrm{m^{2} / s}$ at $\omega = \omega_o$, so $2\ \mathrm{cm}$ of level noise near that frequency produces up to $8 \times 10^{- 4}\ \mathrm{m^{3} / s}$ of inflow noise, four per cent of the nominal — acceptable. Halve the estimator's time constant to get faster tracking and the noise doubles, which is the same trade the derivative filter makes and for the same reason.
:::
:::

::: example Design {#ex-design-two-mass}
A servo axis drives a load through a harmonic drive. The motor inertia reflected to the output is $J_m = 0.05\ \mathrm{kg\, m^{2}}$, the load inertia is $J_L = 0.05\ \mathrm{kg\, m^{2}}$ and the coupling's torsional stiffness is $K_c = 2000\ \mathrm{N\, m / rad}$. The specification asks for a dominant closed-loop pair at $- 32 \pm 32\ \mathrm{j}$ ($\zeta = 0.71$), and the load position is measured. Design the loop and decide what to measure.
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
\frac{\Theta_m}{\Tau} = \frac{20 \left( s^{2} + 40{,}000 \right)}{s^{2} \left( s^{2} + 80{,}000 \right)},
$$
which has the antiresonance at $\omega_a = 200\ \mathrm{rad / s}$ and is the better-behaved plant.
**State feedback.** With $x = \left[ \theta_L , \omega_L , \delta , \dot{\delta} \right]^{T}$ the model is controllable from $\tau$, and placing the four poles at $- 32 \pm 32\ \mathrm{j}$ and, for the resonant pair, $- 20 \pm 15\ \mathrm{j}$ gives
$$
K = \begin{bmatrix} 1.60 & 0.152 & - 3740 & 5.20 \end{bmatrix}
$$
in units of $\mathrm{N\, m}$ per radian and per radian per second. The third entry is the revealing one. In the deflection equation the feedback adds $- 20 \times \left( - 3740 \right) \delta = + 74{,}800 \delta$ against the coupling's $- 80{,}000 \delta$: to drag the resonant pair from $283\ \mathrm{rad / s}$ down to $- 20 \pm 15\ \mathrm{j}$ the controller cancels $93\ \%$ of the coupling's stiffness. That is the over-reach of the warning in concrete form — a gain that works only if the stiffness is known to a few per cent. Leaving the resonant pair near its natural frequency and merely damping it, for example at $\zeta = 0.5$ and $\omega_n = 283\ \mathrm{rad / s}$, gives far more modest deflection gains and is the better use of the method.
**Observer.** The deflection and its rate are not measured, so a fourth-order observer is needed. Placing it at five times the controller puts it at $160\ \mathrm{rad / s}$, uncomfortably near the $200\ \mathrm{rad / s}$ antiresonance of the motor-sensing plant and squarely below the $283\ \mathrm{rad / s}$ resonance of the load-sensing one; the observer's gain then feeds the estimation error into the torque command at the frequencies where the mode it is trying to control lives, and any error in the modelled stiffness turns into excitation of that mode.

*Design comment.* Three options beat the fourth-order design, and a drive engineer takes them in this order. **Notch the torque command** at $283\ \mathrm{rad / s}$ and close a PID position loop at $32\ \mathrm{rad / s}$: a typical notch costs only about $6$ to $9^{\circ}$ of phase at the crossover and the whole design is verifiable by frequency response. **Add a motor-side encoder**, which makes the deflection directly measurable, reduces the observer's job, and gives a collocated measurement whose phase does not fall below $- 180^{\circ}$ through the resonance. Or **stiffen the coupling**, which pushes $\omega_r$ above $500\ \mathrm{rad / s}$ and makes the fourth-order design comfortable. What the arithmetic establishes is the reason all three exist: with an undamped resonance at only nine times the crossover and a state estimator that must be placed between the crossover and that resonance, the framework's answer exists on the model but is fragile in the plant. The framework earns its cost when the structure has **several** flexible modes near the bandwidth, or several inputs — a robot arm, a gantry, a disk drive — where no single notch suffices.
:::
:::

::: history
The state-space method in control is largely the work of **Rudolf E. Kálmán** around 1960, at the Research Institute for Advanced Studies in Baltimore. In 1960 he introduced controllability and observability (*"On the general theory of control systems"*, first IFAC congress, Moscow), the linear-quadratic regulator (*"Contributions to the theory of optimal control"*), and the recursive filter that bears his name (*"A new approach to linear filtering and prediction problems"*, *Journal of Basic Engineering*); with **John Bertram** he carried Lyapunov's second method into control the same year, and with **Richard S. Bucy** he published the continuous-time **Kalman-Bucy filter** in 1961. The optimal regulator built on **Richard Bellman**'s dynamic programming of the 1950s.
The observer is **David Luenberger**'s, from his 1964 paper *"Observing the state of a linear system"* in the *IEEE Transactions on Military Electronics*. The coefficient-matching formula for single-input pole placement is usually credited to **Bass and Gura** (1965), and the compact single-input formula used in this lesson to **Jürgen Ackermann** (1972). The geometric theory of the late 1960s and 1970s — **Basile and Marro**'s controlled invariants and **W. M. Wonham**'s *Linear Multivariable Control: a Geometric Approach* (1974) — and textbooks such as **Roger Brockett**'s *Finite Dimensional Linear Systems* (1970) and **Thomas Kailath**'s *Linear Systems* (1980) made the subject standard. The reconciliation with frequency-domain robustness came with **John Doyle** and **Gunter Stein**'s loop-transfer recovery (1979) and their 1981 paper *"Multivariable feedback design: concepts for a classical/modern synthesis"*.
:::

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

## Where this leads

The observer's noise sensitivity is the same trade as the derivative filter of [[control-systems/pid-control]], the recovered loop's sensitivity peak is the waterbed of [[control-systems/feedback-stability]], the discretisation that a real observer needs is the subject of [[control-systems/digital-control]], and the two-mass plant of [[#ex-design-two-mass]] is the two-degree-of-freedom resonance of [[vibrations/two-degrees-of-freedom]] seen from the control side.

::: summary
- A state model is a coordinate system on a transfer function; the modal coordinates are the ones that show which modes an actuator can reach and a sensor can see.
- Controllability and observability are rank tests, and their practical content is not the rank but the smallest singular value and the control energy it implies.
- Controllable systems admit arbitrary pole placement by Ackermann's formula; observable systems admit arbitrary observer pole placement, and the two designs are independent because the combined matrix is block triangular.
- The separation principle is about poles and not about performance: the compensator it produces has the observer's dynamics in its high-frequency behaviour, and a faster observer buys margin at the cost of noise gain.
- Unknown-input estimation is an under-used technique that turns an unmeasured disturbance into a filtered derivative of what is measured, with the same noise trade as any derivative.
- For a single-input single-output plant with one flexible mode, a notch and a PID are usually cheaper than a full-order design; the framework pays when there are several modes, several inputs or unmeasured states that must be reconstructed.
:::

## Exercises

::: exercise States {level=1 check="2"}
How many states does a model of a mass connected to ground by a spring and a dashpot in parallel need, with the position as output and a force on the mass as input?
::: solution
Two — the mass's position (the spring's deflection) and its velocity.
:::
:::

::: exercise Rank {level=1 check="1"}
For $A = \operatorname{diag} \left( 1 , 2 \right)$ and $B = \left[ 1 , 0 \right]^{T}$, what is the rank of the controllability matrix?
::: solution
One. The second mode has no input coefficient and is uncontrollable.
:::
:::

::: exercise Dual {level=1 check="3"}
If $\left( A , B \right)$ is controllable with $n = 3$ states, what is the rank of the observability matrix of the pair $\left( A^{T} , B^{T} \right)$ (that is, with $A^{T}$ as system matrix and $B^{T}$ as output matrix)?
::: solution
Three: the observability matrix of $\left( A^{T} , B^{T} \right)$ is the transpose of the controllability matrix of $\left( A , B \right)$, so the pair is observable and the rank is $n = 3$.
:::
:::

::: exercise Eigenvalues {level=1 check="2"}
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
= \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 200 & 20 \\ 0 & 200 \end{bmatrix} = \begin{bmatrix} 200 & 20 \end{bmatrix} ,
$$
since $A^{2} = 0$ for the double integrator.
*Sanity.* $\omega_n = \sqrt{200} = 14.1$ and $2 \zeta \omega_n = 20$ give $\zeta = 0.707$, and the general rule $K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$ for a double integrator follows immediately — which is the same answer as placing a PD controller by matching coefficients, and the first indication that state feedback on a system whose states are all measured is not a new technique but a systematic version of the old one.
:::
:::

::: exercise Observer gain {level=2}
For $A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & - 3 \end{smallmatrix} \right]$, $C = \left[ 1 \; 0 \right]$, find $L$ for observer poles at $- 6 \pm 6\ \mathrm{j}$.
::: solution
$A - LC$ has characteristic polynomial $s^{2} + \left( L_1 + 3 \right) s + \left( 3 L_1 + L_2 \right)$; matching $s^{2} + 12 s + 72$ gives $L_1 = 9$ and $L_2 = 45$.
*Sanity.* The observer's poles have magnitude $\sqrt{72} = 8.5\ \mathrm{rad / s}$, about three times the plant's own pole at $- 3$, which is a modest and defensible ratio; the gain $L_2 = 45$ is the equivalent derivative action and is the number to check against the measurement noise before the design is accepted.
:::
:::

::: exercise Separation {level=2}
For a second-order plant, a design places the controller poles at $- 5 \pm 5\ \mathrm{j}$ and both observer poles at $- 50$. List the closed-loop eigenvalues of the combined system.
::: solution
$- 5 + 5\ \mathrm{j}$, $- 5 - 5\ \mathrm{j}$, $- 50$ and $- 50$ — four eigenvalues for a second-order plant with a second-order observer, the union of the two designs.
*Sanity.* The observer pole at $- 50$ is ten times the real part of the dominant pair, which is at the upper end of the useful range; the transient weighting of that fast mode is what makes the step response of an observer-based design differ from the state-feedback design's, and it can be large even when the poles are exactly where they were asked to be.
:::
:::

::: exercise Derivation {level=3}
Show that for $A = \operatorname{diag} \left( \lambda_1 , \ldots , \lambda_n \right)$ with distinct eigenvalues and a single input $B = \left[ b_1 , \ldots , b_n \right]^{T}$, the system is controllable if and only if every $b_i \ne 0$, and state what happens for a repeated eigenvalue.
::: solution
$\mathcal{C} = \left[ B , AB , \ldots , A^{n - 1} B \right]$ has row $i$ equal to $b_i \left[ 1 , \lambda_i , \ldots , \lambda_i^{n - 1} \right]$, so $\mathcal{C} = \operatorname{diag} \left( b_i \right) V$ where $V$ is the Vandermonde matrix of the $\lambda_i$. A Vandermonde matrix of distinct nodes is nonsingular, so $\operatorname{rank} \mathcal{C} = n$ if and only if every $b_i \ne 0$.
For a **repeated** eigenvalue of a diagonal $A$, say $\lambda_1 = \lambda_2$, rows $1$ and $2$ of $\mathcal{C}$ are $b_1 v$ and $b_2 v$ with the same row $v$, so they are linearly dependent and a single input can **never** control both modes. The PBH test says the same: $\operatorname{rank} \left[ \lambda_1 I - A , B \right] \le n - 1$, because $\lambda_1 I - A$ has two zero rows and one column $B$ cannot fill both. With $m$ inputs the condition becomes that the rows of $B$ belonging to the repeated eigenvalue are linearly independent.
*Sanity.* The distinction is not pedantry: a model built from measured frequency-response data is identified only up to a similarity transformation, and a designer who tests controllability by inspecting the entries of a $B$ matrix in a modal realisation obtained from a numerical fit will get the wrong answer whenever two eigenvalues are close, because the modal matrix becomes ill-conditioned and the entries of $B$ become meaningless. The rank test on the original physical realisation, or the PBH test, is the only reliable procedure.
:::
:::

::: exercise Design {level=3}
A first-order plant $\dot{x} = - x + 2 u$, $y = x$, is to be controlled by state feedback with an integral term to track a step with zero error, and an observer at twice the closed-loop rate. Place the two controller poles at $- 3 \pm 3\ \mathrm{j}$ and find all the gains.
::: solution
**Augment.** With $\dot{z} = r - x$ and $u = - k_1 x + k_2 z$,
$$
\begin{bmatrix} \dot{x} \\ \dot{z} \end{bmatrix}
= \begin{bmatrix} - 1 - 2 k_1 & 2 k_2 \\ - 1 & 0 \end{bmatrix}
\begin{bmatrix} x \\ z \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} r ,
$$
whose characteristic polynomial is $s^{2} + \left( 1 + 2 k_1 \right) s + 2 k_2$. Matching $s^{2} + 6 s + 18$ gives
$$
k_1 = 2.5, \qquad k_2 = 9.0 .
$$
**Observer.** For the plant alone, $\left( A - L C \right) = - 1 - L = - 6$ gives $L = 5$.
**Check.** The closed-loop transfer function from $r$ to $y$ is $18 / \left( s^{2} + 6 s + 18 \right)$ — no zeros, because the integral action's zero has been cancelled by the structure — with $\zeta = 0.707$, $\omega_n = 4.24$ and a $2\ \%$ settling time of $1.33\ \mathrm{s}$.

*Sanity.* The observer is a first-order filter with a pole at $- 6$ against the closed loop's real part of $- 3$, a ratio of two, which is the minimum usual separation. Eliminating $\hat{x}$ and $z$ gives the controller $u = \left[ 9 \left( s + 6 \right) r - \left( 21.5 s + 54 \right) y \right] / \left[ s \left( s + 11 \right) \right]$: an integrator, a zero at $- 2.51$ and a roll-off pole at $- 11$ — recognisably a PI controller with a filter, the kind of compensator someone could have drawn in 1950. Since $x$ is measured here the observer is only a noise filter; its value in the exercise is in seeing the reduction, and in the framework's answer to "what is an integral controller?": state feedback on a state that integrates the tracking error.
:::
:::
