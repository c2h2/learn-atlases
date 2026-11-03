In [[control-systems/stability#ex-maglev-pd]] we stabilised the magnetic levitator with a PD controller: a current proportional to the gap error plus a current proportional to its rate of change. Seen through the state-space lens of [[control-systems/state-space-models]], that controller is a weighted sum of the plant's two **state variables**, $\delta y$ and $\dot{\delta y}$, and its two gains were exactly enough to put the two closed-loop poles wherever we wanted. That observation generalises in a powerful way: if every state of an $n$th-order controllable plant is fed back with its own gain, all $n$ closed-loop poles can be placed at will — no root-locus sketching, no trial-and-error lead design.

Two obstacles stand in the way, and this chapter overcomes both. First, we rarely measure every state: an encoder gives a motor's angle but not its speed or current, and the levitator's sensor gives the gap but not its velocity. An **observer** — a real-time simulation of the plant, corrected by the measured output — estimates the missing states, and the **separation principle** guarantees that the estimator and the state feedback can be designed independently. Second, pole placement says nothing about *where* the poles should go; the **linear-quadratic regulator** answers that by minimising a cost that trades state error against control effort. Along the way we add integral action as an extra state, so that state-feedback loops reject constant disturbances just as PI loops do.

## State feedback and pole placement

For the plant $\dot x = Ax + Bu$, $y = Cx$ with a single input, **state feedback** is the control law

$$
u = -Kx + Nr,
$$ {#eq-state-feedback}

where $K = [k_1\ \ k_2\ \cdots\ k_n]$ is a row of gains and $N$ a scalar reference gain. Substituting,

$$
\dot x = (A - BK)x + BNr,
$$

so the closed-loop poles are the eigenvalues of $A - BK$, the roots of $\det(sI - A + BK)$. Each gain enters the coefficients of this polynomial, and the question is whether the $n$ gains can produce any desired polynomial.

::: theorem Pole placement {#thm-pole-placement}
If $(A, B)$ is controllable, then for every monic polynomial $\alpha_c(s) = s^n + \alpha_{n-1}s^{n-1} + \dots + \alpha_0$ with real coefficients there is a unique gain $K$ with $\det(sI - A + BK) = \alpha_c(s)$. If $(A, B)$ is not controllable, the eigenvalues of the uncontrollable part of $A$ are eigenvalues of $A - BK$ for every $K$.
:::

::: proof
Suppose first that $(A, B)$ is in controllable canonical form ([[control-systems/state-space-models#thm-ccf]]), with last row $[-a_0\ \ -a_1\ \cdots\ -a_{n-1}]$ and $B = [0\ \cdots\ 0\ \ 1]^{\mathsf T}$. Then $BK$ is zero except for its last row, which is $K$, so $A - BK$ is again a companion matrix with last row $[-(a_0 + k_1)\ \cdots\ -(a_{n-1} + k_n)]$. Its characteristic polynomial is $s^n + (a_{n-1} + k_n)s^{n-1} + \dots + (a_0 + k_1)$, and choosing $k_{i+1} = \alpha_i - a_i$ gives $\alpha_c$; the choice is unique. For a general controllable $(A, B)$ there is an invertible $P$ that transforms it to this form — the transformation can be built from the controllability matrix, which is invertible precisely because the system is controllable — and since $\det(sI - A + BK)$ is unchanged by similarity, the gain $\bar K$ found in canonical coordinates gives $K = \bar KP^{-1}$ in the original ones. If the system is not controllable, the Kalman decomposition puts $A$ in block-triangular form with the uncontrollable block untouched by $BK$, so its eigenvalues stay put.
:::

For low orders the simplest method is to write out $\det(sI - A + BK)$ and match coefficients. For larger systems a closed formula is convenient.

::: algorithm Ackermann's formula {#alg-ackermann}
For a controllable single-input $(A, B)$ and desired characteristic polynomial $\alpha_c(s)$:

$$
K = \begin{bmatrix}0 & \cdots & 0 & 1\end{bmatrix}\mathcal C^{-1}\,\alpha_c(A),\qquad \alpha_c(A) = A^n + \alpha_{n-1}A^{n-1} + \dots + \alpha_0I,
$$ {#eq-ackermann}

where $\mathcal C = [B\ \ AB\ \cdots\ A^{n-1}B]$ is the controllability matrix. (Numerically more robust algorithms are used in software for high orders.)
:::

::: example Placing the levitator's poles {#ex-maglev-sf}
For the levitator with its coil ([[control-systems/state-space-models]], exercise "The levitator with its coil"), $A = \begin{bmatrix}0 & 1 & 0\\ 1962 & 0 & -19.62\\ 0 & 0 & -20\end{bmatrix}$, $B = [0\ \ 0\ \ 2]^{\mathsf T}$, with states $\delta y$ (m), $\dot{\delta y}$ (m/s), $\delta i$ (A) and input $\delta v$ (V). Find the state-feedback gain that places the closed-loop poles at $-60 \pm 60j$ and $-200$.
::: solution
The desired polynomial is $(s^2 + 120s + 7200)(s + 200) = s^3 + 320s^2 + 31\,200s + 1\,440\,000$. With $K = [k_1\ \ k_2\ \ k_3]$, only the last row of $A$ changes:

$$
A - BK = \begin{bmatrix}0 & 1 & 0\\ 1962 & 0 & -19.62\\ -2k_1 & -2k_2 & -20 - 2k_3\end{bmatrix}.
$$

Expanding $\det(sI - A + BK)$ along the first row,

$$
s^3 + (20 + 2k_3)s^2 - (1962 + 39.24k_2)s - (39\,240 + 3924k_3 + 39.24k_1).
$$

Matching coefficients: $20 + 2k_3 = 320$ gives $k_3 = 150\,\mathrm{V/A}$; $-(1962 + 39.24k_2) = 31\,200$ gives $k_2 = -845\,\mathrm{V\,s/m}$; and $-(39\,240 + 588\,600 + 39.24k_1) = 1\,440\,000$ gives $k_1 = -52\,700\,\mathrm{V/m}$. So

$$
\delta v = -Kx = 52\,700\,\delta y + 845\,\dot{\delta y} - 150\,\delta i .
$$

The signs make physical sense: if the ball drops ($\delta y > 0$) or is falling ($\dot{\delta y} > 0$), the voltage rises to increase the current; the negative current feedback speeds up the coil, whose own time constant ($50\,\mathrm{ms}$) is far too slow for a closed-loop pole at $-200$. Ackermann's formula gives the same $K$.
:::
:::

### The reference gain

State feedback fixes the poles; the reference gain $N$ fixes the DC gain. With $u = -Kx + Nr$, the closed-loop transfer function from $r$ to $y$ is $T(s) = C(sI - A + BK)^{-1}BN$, and $T(0) = 1$ requires

$$
N = \frac{-1}{C(A - BK)^{-1}B}.
$$ {#eq-reference-gain}

For the levitator with output $y = \delta y$, this gives $N = -3.67\times10^4\,\mathrm{V/m}$: a reference step of $1\,\mathrm{mm}$ settles with the coil current up by $0.1\,\mathrm{A}$ and the voltage up by $1\,\mathrm{V}$. The difficulty is that $N$ depends on the model. If the ball's mass or the magnet constant differ from their nominal values, the gap settles at the wrong place; a constant disturbance force produces an offset, exactly like a proportional controller.

::: warning Fast poles cost large gains
Pole placement will place poles anywhere, including places the hardware cannot reach. Moving a pole a long way from its open-loop position needs large gains, which saturate the actuator on any sizable error and amplify sensor noise. In [[#ex-maglev-sf]], a $1\,\mathrm{mm}$ gap error alone calls for $53\,\mathrm{V}$. A useful rule is to move poles only as far as the specifications demand, and to leave well-damped open-loop poles roughly where they are.
:::

### Integral action

To reject constant disturbances and make the steady state independent of the model, add the integral of the tracking error as an extra state, $\dot x_I = r - y$, and feed it back:

$$
\frac{\dd}{\dd t}\begin{bmatrix}x\\ x_I\end{bmatrix} = \begin{bmatrix}A & 0\\ -C & 0\end{bmatrix}\begin{bmatrix}x\\ x_I\end{bmatrix} + \begin{bmatrix}B\\ 0\end{bmatrix}u + \begin{bmatrix}0\\ 1\end{bmatrix}r,\qquad u = -Kx - k_Ix_I .
$$ {#eq-integral-sf}

If the augmented system is controllable — which holds when $(A, B)$ is controllable and the plant has no zero at $s = 0$ — all $n + 1$ poles can be placed, and by the same argument as [[control-systems/pid-control#thm-integral]], $\dot x_I = 0$ in steady state forces $y = r$ exactly.

::: example A speed controller with integral action {#ex-speed-sf}
Design a state-feedback speed controller with integral action for the motor of [[control-systems/state-space-models#ex-motor-ss]] (states $i$, $\omega$; $A = \begin{bmatrix}-2000 & -50\\ 2500 & -0.5\end{bmatrix}$, $B = [1000\ \ 0]^{\mathsf T}$, $y = \omega$), placing the closed-loop poles at $-300 \pm 300j$ and $-2000$.
::: solution
The augmented system has states $i$, $\omega$, $x_I$ and $u = -k_1i - k_2\omega - k_3x_I$. Its closed-loop matrix is

$$
\begin{bmatrix}-2000 - 1000k_1 & -50 - 1000k_2 & -1000k_3\\ 2500 & -0.5 & 0\\ 0 & -1 & 0\end{bmatrix}.
$$

Writing $a = 2000 + 1000k_1$, $c = 50 + 1000k_2$ and $d = 1000k_3$, its characteristic polynomial is $s^3 + (a + 0.5)s^2 + (0.5a + 2500c)s - 2500d$. The target is $(s + 2000)(s^2 + 600s + 180\,000) = s^3 + 2600s^2 + 1.38\times10^6s + 3.6\times10^8$. Matching:

$$
a = 2599.5,\quad c = \frac{1.38\times10^6 - 1299.75}{2500} = 551.5,\quad d = -\frac{3.6\times10^8}{2500} = -144\,000,
$$

so $k_1 = 0.600\,\mathrm{V/A}$, $k_2 = 0.501\,\mathrm{V\,s/rad}$ and $k_3 = -144\,\mathrm{V/rad}$. The controller is

$$
v = -0.600\,i - 0.501\,\omega + 144\int(r - \omega)\,\dd t .
$$

A simulated step in $r$ overshoots by $4.2\,\%$, peaks at $11\,\mathrm{ms}$ and settles in $15\,\mathrm{ms}$; a constant load torque is rejected with zero steady-state error. The current feedback $k_1$ is a little "virtual resistance", adding damping to the electrical mode; the structure is a PI speed controller with an inner proportional current loop, which is what [[control-systems/pid-control]] arrived at by different means.
:::
:::

::: quiz
A plant has $A = \begin{bmatrix}1 & 0\\ 0 & -2\end{bmatrix}$ and $B = [1\ \ 0]^{\mathsf T}$. Which closed-loop pole sets can state feedback achieve?
- [ ] Any pair of poles, since there are two gains.
- [x] Any pole in place of $+1$, but $-2$ always remains.
- [ ] None, because the plant is unstable.
- [ ] Only poles in the left half-plane.
::: solution
$\mathcal C = [B\ \ AB] = \begin{bmatrix}1 & 1\\ 0 & 0\end{bmatrix}$ has rank $1$: the second state is uncontrollable. $A - BK = \begin{bmatrix}1 - k_1 & -k_2\\ 0 & -2\end{bmatrix}$ has eigenvalues $1 - k_1$ and $-2$. The unstable mode is controllable, so the system can be stabilised (it is **stabilisable**), but the pole at $-2$ cannot be moved.
:::
:::

## Observers

State feedback needs every state; sensors provide only $y = Cx$. The idea of the **Luenberger observer** is to run a model of the plant in parallel with it, drive the model with the same input, and correct it continuously with the difference between the measured and predicted outputs.

::: definition Full-order observer {#def-observer}
A **full-order observer** for $\dot x = Ax + Bu$, $y = Cx$ is the system

$$
\dot{\hat x} = A\hat x + Bu + L\,(y - C\hat x),
$$ {#eq-observer}

where $\hat x$ is the state estimate and $L$ is a column of **observer gains**. The **estimation error** $\tilde x = x - \hat x$ obeys

$$
\dot{\tilde x} = (A - LC)\,\tilde x .
$$ {#eq-observer-error}
:::

Subtracting [[#eq-observer]] from the plant equation gives [[#eq-observer-error]]: the input cancels, and the error decays on its own if $A - LC$ is stable, however the plant is driven. Choosing $L$ is a pole-placement problem for the matrix $A - LC$, whose eigenvalues equal those of its transpose $A^{\mathsf T} - C^{\mathsf T}L^{\mathsf T}$ — the state-feedback problem for the "dual" pair $(A^{\mathsf T}, C^{\mathsf T})$.

::: theorem Observer pole placement {#thm-observer-placement}
If $(A, C)$ is observable, the eigenvalues of $A - LC$ can be placed at the roots of any monic real polynomial $\alpha_o(s)$ by a unique choice of $L$, given by the dual of Ackermann's formula,

$$
L = \alpha_o(A)\,\mathcal O^{-1}\begin{bmatrix}0\\ \vdots\\ 0\\ 1\end{bmatrix}.
$$ {#eq-observer-ackermann}
:::

::: proof
$(A, C)$ is observable exactly when $(A^{\mathsf T}, C^{\mathsf T})$ is controllable, since the observability matrix of the first is the transpose of the controllability matrix of the second. By [[#thm-pole-placement]] there is a unique row $K_o$ with $\det(sI - A^{\mathsf T} + C^{\mathsf T}K_o) = \alpha_o(s)$; transposing, $L = K_o^{\mathsf T}$ gives $\det(sI - A + LC) = \alpha_o(s)$. Applying [[#eq-ackermann]] to the dual pair and transposing gives [[#eq-observer-ackermann]].
:::

How fast should the observer be? Its error must die out faster than the controlled dynamics, so that the controller acts on a good estimate — a common choice is observer poles two to six times faster than the controller poles. Faster is not always better: a fast observer has large gains $L$ and passes sensor noise straight into the estimate. The optimal balance between the two, given the noise statistics, is the **Kalman filter** ([[random-signals/estimation-kalman]]).

::: example Estimating speed from an encoder {#ex-observer}
A motor with negligible inductance has the model $\dot\theta = \omega$, $\dot\omega = -63\omega + 1250v$ (from [[control-systems/time-response#ex-servo]]: $1/\tau = 63\,\mathrm{s^{-1}}$, $K_m/\tau = 1250$), and an encoder measures $\theta$. Design an observer with both poles at $-500\,\mathrm{s^{-1}}$ that estimates $\omega$, and describe how an initial error in the speed estimate decays.
::: solution
Here $A = \begin{bmatrix}0 & 1\\ 0 & -63\end{bmatrix}$, $B = [0\ \ 1250]^{\mathsf T}$, $C = [1\ \ 0]$, and the pair is observable ([[control-systems/state-space-models#ex-observability]]). With $L = [l_1\ \ l_2]^{\mathsf T}$,

$$
A - LC = \begin{bmatrix}-l_1 & 1\\ -l_2 & -63\end{bmatrix},\qquad \det(sI - A + LC) = s^2 + (l_1 + 63)s + 63l_1 + l_2 .
$$

The target is $(s + 500)^2 = s^2 + 1000s + 250\,000$, so $l_1 = 937\,\mathrm{s^{-1}}$ and $l_2 = 250\,000 - 63\times937 = 190\,969\,\mathrm{s^{-2}}$. The observer is

$$
\dot{\hat\theta} = \hat\omega + 937(\theta - \hat\theta),\qquad \dot{\hat\omega} = -63\hat\omega + 1250v + 190\,969(\theta - \hat\theta).
$$

If the speed estimate starts wrong by $\tilde\omega_0$ (and the angle estimate is right), the error dynamics give $\tilde\omega(t) = \tilde\omega_0e^{-500t}(1 + 437t)$: the error at first decays only at the motor's own rate (its initial slope is $-63\tilde\omega_0$ per second, as for an uncorrected model), then collapses as the angle error builds up and the correction takes hold, falling below $2\,\%$ of its initial value after about $11\,\mathrm{ms}$. Unlike differentiating the encoder signal, the observer uses the model and the known input, so it produces a smooth speed estimate even from a coarsely quantised angle.
:::
:::

::: widget plot
f: exp(-p*x/1000)*(1 + (p - 63)*x/1000); exp(-63*x/1000)
x: 0, 30
y: -0.2, 1.6
sliders: p=500:100:2000:10
hlines: 0
labels: \tilde\omega(t)/\tilde\omega_0\ \text{observer}; \text{open-loop model}
caption: Decay of the speed-estimation error of the observer of [[#ex-observer]] (blue) against time in milliseconds, with both observer poles at $-p$ on the slider, compared with an uncorrected model running in parallel with the plant (orange), whose error decays only at the motor's own rate, $63\,\mathrm{s^{-1}}$. A faster observer kills the error sooner, but at a price: its gains, $l_1 = 2p - 63$ and $l_2 = p^2 - 63l_1$, grow too, and with them the amount of encoder noise passed into the estimate.
:::

## The separation principle

Now connect the two: feed back the estimate, $u = -K\hat x + Nr$. Does an observer error destabilise the loop?

::: theorem Separation principle {#thm-separation}
For the plant $\dot x = Ax + Bu$, $y = Cx$ with the observer [[#eq-observer]] and the control law $u = -K\hat x + Nr$, the closed-loop eigenvalues are the eigenvalues of $A - BK$ (the state-feedback poles) together with those of $A - LC$ (the observer poles). The state-feedback gain and the observer gain can therefore be designed independently.
:::

::: proof
Use $x$ and the error $\tilde x = x - \hat x$ as the state of the combined system. With $\hat x = x - \tilde x$, the plant obeys $\dot x = Ax - BK(x - \tilde x) + BNr = (A - BK)x + BK\tilde x + BNr$, and the error obeys [[#eq-observer-error]], which does not involve $x$ or $r$. So

$$
\frac{\dd}{\dd t}\begin{bmatrix}x\\ \tilde x\end{bmatrix} = \begin{bmatrix}A - BK & BK\\ 0 & A - LC\end{bmatrix}\begin{bmatrix}x\\ \tilde x\end{bmatrix} + \begin{bmatrix}BN\\ 0\end{bmatrix}r .
$$

The matrix is block upper-triangular, so its characteristic polynomial is the product $\det(sI - A + BK)\det(sI - A + LC)$.
:::

The block structure says more: the reference $r$ does not excite the observer error at all, so the transfer function from $r$ to $y$ is exactly that of full state feedback — the observer poles cancel. They appear only in the response to disturbances, initial errors and noise. An observer-based controller is in the end a dynamic compensator of order $n$, with transfer function from $y$ to $u$

$$
C(s) = K\,(sI - A + BK + LC)^{-1}L,
$$ {#eq-observer-compensator}

and for low-order plants it can be compared directly with the lead compensators of [[control-systems/compensator-design]]. For the two-state levitator the full-order observer gives a second-order compensator; a reduced-order observer, which estimates only the unmeasured velocity, reduces it to first order — a lead network, as found by classical design.

::: remark Robustness is not separated
The separation principle concerns pole positions for the nominal model. Robustness — gain and phase margins at the plant input — is *not* separated: an observer-based design can have much smaller margins than the full-state-feedback design it imitates, because the loop now passes through the observer's model. Check the margins of the loop broken at the plant input, with the transfer function [[#eq-observer-compensator]], as for any compensator.
:::

## An introduction to optimal control

Pole placement answers "how" but not "where". A systematic answer is to ask for the control that minimises a cost balancing how far the state strays against how hard the actuator works.

::: definition Linear-quadratic regulator {#def-lqr}
For $\dot x = Ax + Bu$ the **linear-quadratic regulator (LQR)** problem is to minimise

$$
J = \int_0^\infty\bigl(x^{\mathsf T}Qx + u^{\mathsf T}Ru\bigr)\,\dd t
$$ {#eq-lqr-cost}

over all inputs, where the weights $Q$ (symmetric, positive semidefinite) and $R$ (symmetric, positive definite) express how much each state deviation and each unit of control effort cost.
:::

::: theorem LQR solution {#thm-lqr}
If $(A, B)$ is controllable and $(A, Q^{1/2})$ observable, the minimising control is the state feedback $u = -Kx$ with

$$
K = R^{-1}B^{\mathsf T}P,
$$ {#eq-lqr-gain}

where $P$ is the unique symmetric positive definite solution of the **algebraic Riccati equation**

$$
A^{\mathsf T}P + PA - PBR^{-1}B^{\mathsf T}P + Q = 0 .
$$ {#eq-riccati}

The closed loop $A - BK$ is stable, and the minimum cost from $x(0) = x_0$ is $x_0^{\mathsf T}Px_0$.
:::

::: proof
(Sketch.) Suppose $V(x) = x^{\mathsf T}Px$ with $P$ satisfying [[#eq-riccati]]. Along any trajectory, $\frac{\dd V}{\dd t} = x^{\mathsf T}(A^{\mathsf T}P + PA)x + 2u^{\mathsf T}B^{\mathsf T}Px$. Adding $x^{\mathsf T}Qx + u^{\mathsf T}Ru$ and using the Riccati equation, a completion of squares gives

$$
x^{\mathsf T}Qx + u^{\mathsf T}Ru + \frac{\dd V}{\dd t} = (u + R^{-1}B^{\mathsf T}Px)^{\mathsf T}R\,(u + R^{-1}B^{\mathsf T}Px) \ge 0 .
$$

Integrating from $0$ to $\infty$ for a stabilising input ($V \to 0$): $J = x_0^{\mathsf T}Px_0 + \int_0^\infty(\cdots)^{\mathsf T}R(\cdots)\,\dd t \ge x_0^{\mathsf T}Px_0$, with equality exactly when $u = -R^{-1}B^{\mathsf T}Px$. Existence and uniqueness of the stabilising solution $P$ under the stated conditions is proved in texts on optimal control, for example Anderson and Moore, *Optimal Control: Linear Quadratic Methods*.
:::

For a scalar plant the Riccati equation can be solved by hand, and the result shows the whole idea.

::: example A scalar LQR for a motor {#ex-lqr}
The speed of a motor obeys $\dot x = -63x + 1250u$ ($x$ the speed deviation in rad/s, $u$ the voltage in V). Find the LQR gain for the cost $\int(qx^2 + ru^2)\,\dd t$ and the closed-loop pole as functions of $q/r$, and evaluate them for $q/r = 0.01$.
::: solution
With $a = -63$, $b = 1250$, the Riccati equation [[#eq-riccati]] is the scalar quadratic $2aP - b^2P^2/r + q = 0$, whose positive root is

$$
P = \frac{r}{b^2}\Bigl(a + \sqrt{a^2 + b^2q/r}\Bigr).
$$

The gain is $K = bP/r = \bigl(a + \sqrt{a^2 + b^2q/r}\bigr)/b$, and the closed-loop pole is

$$
a - bK = -\sqrt{a^2 + b^2\,q/r}.
$$

For $q/r = 0.01$: the pole is at $-\sqrt{3969 + 15\,625} = -140\,\mathrm{s^{-1}}$ and $K = (-63 + 140)/1250 = 0.0616\,\mathrm{V\,s/rad}$. Whatever the weights, the closed loop is stable. When control is expensive ($q/r \to 0$) the pole stays at the open-loop $-63$ — LQR does not spend effort on a plant that is already stable; when control is cheap ($q/r$ large) the pole moves out as $\sqrt{q/r}$, and the gain grows in proportion. For an unstable plant ($a > 0$) the expensive-control limit is the mirror image $-a$: the cheapest way to stabilise is to reflect the unstable pole.
:::
:::

::: widget plot
f: -sqrt(63^2 + 1250^2*10^x); -63
x: -5, 0
y: -1300, 0
labels: \text{closed-loop pole }(\mathrm{s^{-1}}); \text{open-loop pole}
caption: The LQR closed-loop pole of the motor speed loop of [[#ex-lqr]] against $\log_{10}(q/r)$. For small $q/r$ (control expensive) the pole stays near the open-loop $-63\,\mathrm{s^{-1}}$; as control becomes cheaper the pole moves left, eventually in proportion to $\sqrt{q/r}$, along with the gain and the actuator effort. Choosing $q/r$ is choosing a point on this curve.
:::

LQR designs also come with a robustness guarantee that pole placement does not offer: for a single-input plant with full state feedback, the LQR loop has a phase margin of at least $60^\circ$, an unlimited upward gain margin and a downward gain margin of at least $1/2$ ($-6\,\mathrm{dB}$), whatever the weights (Kalman, 1964). The guarantee is lost when an observer is inserted — the remark above — which motivated the robust-control methods of the 1980s.

::: application State feedback in power electronics and drives
Grid-connected inverters with $LCL$ output filters have a third-order plant with a lightly damped resonance; measuring the inverter current, the capacitor voltage and the grid current and feeding back all three with pole-placement gains damps the resonance "actively", without the losses of a damping resistor. Field-oriented motor drives estimate the rotor flux, which cannot be measured, with an observer driven by the measured currents and the applied voltages; "sensorless" drives go further and estimate the rotor speed and angle from the back-EMF, removing the encoder altogether ([[electric-machines/special-machines]]).
:::

::: history
Pole assignment by state feedback was shown to be possible for every controllable system by W. M. Wonham in 1967, after earlier special cases by Rissanen and others; J. Ackermann published his formula in 1972. David Luenberger introduced observers in his Stanford thesis and the 1964 paper "Observing the state of a linear system". Rudolf Kálmán solved the linear-quadratic regulator problem in 1960 and, with Richard Bucy, the continuous-time optimal estimator, the Kalman–Bucy filter, in 1961; the Kalman filter was soon at work in the navigation computers of the Apollo spacecraft, and the combination of the two, the linear-quadratic-Gaussian (LQG) controller, became the centrepiece of 1960s optimal control. John Doyle's 1978 paper "Guaranteed margins for LQG regulators" — its abstract reads in full "There are none." — showed that the robustness of LQR does not survive the observer, and helped launch robust control theory.
:::

## Where this leads

State feedback and observers are implemented on microcontrollers in discrete time; [[control-systems/digital-control]] discretises the plant exactly with the matrix exponential, and the same pole-placement and observer formulas then apply in the $z$-plane, including the "deadbeat" designs that have no continuous counterpart. The Kalman filter of [[random-signals/estimation-kalman]] chooses the observer gain optimally for given noise levels. Multi-input LQR, model predictive control (which adds constraints such as actuator limits to the optimisation) and robust control are the subjects of graduate courses; Åström and Murray's *Feedback Systems* and Franklin, Powell and Emami-Naeini give good introductions.

::: summary
- State feedback $u = -Kx + Nr$ gives closed-loop matrix $A - BK$; if $(A, B)$ is controllable, its eigenvalues can be placed anywhere (by matching coefficients or Ackermann's formula).
- The reference gain $N = -1/[C(A - BK)^{-1}B]$ sets the DC gain but depends on the model; integral action, by augmenting the state with $\int(r - y)$, removes steady-state error robustly.
- Fast closed-loop poles need large gains, which saturate actuators and amplify noise.
- An observer $\dot{\hat x} = A\hat x + Bu + L(y - C\hat x)$ has error dynamics $A - LC$; if $(A, C)$ is observable its poles can be placed anywhere, typically two to six times faster than the controller.
- Separation principle: with $u = -K\hat x$, the closed-loop poles are those of $A - BK$ and of $A - LC$; robustness, however, is not separated.
- LQR minimises $\int(x^{\mathsf T}Qx + u^{\mathsf T}Ru)\,\dd t$ with $K = R^{-1}B^{\mathsf T}P$ from the Riccati equation; it always stabilises and, with full state feedback, guarantees $60^\circ$ phase margin.
:::

## Exercises

::: exercise Gains for a double integrator {level=1}
For $\dot x_1 = x_2$, $\dot x_2 = u$, find the state-feedback gain that places the closed-loop poles at $-2 \pm 2j$.
::: solution
$A - BK = \begin{bmatrix}0 & 1\\ -k_1 & -k_2\end{bmatrix}$ has characteristic polynomial $s^2 + k_2s + k_1$. The target $(s + 2)^2 + 4 = s^2 + 4s + 8$ gives $K = [8\ \ 4]$: position gain $8$, velocity gain $4$ — a PD controller.
:::
:::

::: exercise Reference gain {level=1 check="8"}
For the double integrator of the previous exercise with output $y = x_1$ and $K = [8\ \ 4]$, find $N$ for unit DC gain.
::: solution
$C(A - BK)^{-1}B$: $(A - BK)^{-1} = \frac{1}{8}\begin{bmatrix}-4 & -1\\ 8 & 0\end{bmatrix}$, so $C(A - BK)^{-1}B = -1/8$ and $N = 8$. Directly: in steady state $x_2 = 0$ and $0 = -8x_1 + Nr$, so $x_1 = r$ needs $N = 8 = k_1$.
:::
:::

::: exercise Observer gains {level=1}
For $A = \begin{bmatrix}0 & 1\\ 0 & 0\end{bmatrix}$, $C = [1\ \ 0]$, find the observer gain $L$ that places both observer poles at $-10$.
::: solution
$A - LC = \begin{bmatrix}-l_1 & 1\\ -l_2 & 0\end{bmatrix}$, characteristic polynomial $s^2 + l_1s + l_2$. The target $(s + 10)^2 = s^2 + 20s + 100$ gives $L = [20\ \ 100]^{\mathsf T}$.
:::
:::

::: exercise The levitator without the coil {level=2}
For the two-state levitator $A = \begin{bmatrix}0 & 1\\ 1962 & 0\end{bmatrix}$, $B = [0\ \ {-19.62}]^{\mathsf T}$, find the state-feedback gain for poles at $-60 \pm 60j$ and compare it with the PD gains of [[control-systems/stability#ex-maglev-pd]].
::: solution
$A - BK = \begin{bmatrix}0 & 1\\ 1962 + 19.62k_1 & 19.62k_2\end{bmatrix}$, with characteristic polynomial $s^2 - 19.62k_2s - (1962 + 19.62k_1)$. Matching $s^2 + 120s + 7200$: $k_2 = -6.12\,\mathrm{A\,s/m}$ and $k_1 = -467\,\mathrm{A/m}$. So $\delta i = 467\,\delta y + 6.12\,\dot{\delta y}$ — a PD controller, with smaller gains than the $610$ and $7.14$ of the earlier design because the poles are placed at $\omega_n = 84.9\,\mathrm{rad/s}$ instead of $100$.
:::
:::

::: exercise Separation in numbers {level=2}
A controller designed for $A - BK$ with poles at $-60 \pm 60j$ is combined with an observer with poles at $-300$ and $-300$. List the closed-loop poles. Which of them appear in the transfer function from the reference to the output?
::: solution
By [[#thm-separation]], the closed loop has poles $-60 \pm 60j$, $-300$, $-300$. Only $-60 \pm 60j$ appear in $Y(s)/R(s)$; the observer poles are cancelled because $r$ does not excite the estimation error. They do appear in the response to initial estimation errors and to disturbances.
:::
:::

::: exercise LQR for an unstable plant {level=2}
For the scalar plant $\dot x = 5x + u$, find the LQR gain and closed-loop pole for $q = r = 1$, and the limit of the pole as $q/r \to 0$.
::: solution
$a = 5$, $b = 1$: the pole is $-\sqrt{25 + 1} = -5.10$ and $K = 5 + \sqrt{26} = 10.10$. As $q/r \to 0$ the pole tends to $-5$, the mirror image of the unstable open-loop pole, and $K \to 2a = 10$: stabilising an unstable plant always costs effort, however little we weight the state.
:::
:::

::: exercise Observer for the levitator {level=2}
For the two-state levitator measuring $\delta y$ only ($C = [1\ \ 0]$), design an observer with poles at $-200 \pm 200j$.
::: solution
$A - LC = \begin{bmatrix}-l_1 & 1\\ 1962 - l_2 & 0\end{bmatrix}$, characteristic polynomial $s^2 + l_1s + (l_2 - 1962)$. The target $s^2 + 400s + 80\,000$ gives $l_1 = 400\,\mathrm{s^{-1}}$ and $l_2 = 81\,962\,\mathrm{s^{-2}}$. Note that $l_2$ must first cancel the "negative spring" $1962$ before it can add stiffness — the observer's model of the unstable plant must itself be stabilised by the correction.
:::
:::

::: exercise The Riccati equation for a double integrator {level=3}
For $\dot x_1 = x_2$, $\dot x_2 = u$ with $Q = \operatorname{diag}(q, 0)$ and $R = 1$, solve the Riccati equation and show that $K = [\sqrt q\ \ \sqrt{2}\,q^{1/4}]$. What damping ratio does the closed loop have, whatever $q$?
::: hint
Write $P = \begin{bmatrix}p_1 & p_2\\ p_2 & p_3\end{bmatrix}$ and write out the three distinct entries of [[#eq-riccati]].
:::
::: solution
With $A = \begin{bmatrix}0 & 1\\ 0 & 0\end{bmatrix}$, $B = [0\ \ 1]^{\mathsf T}$: $PB = [p_2\ \ p_3]^{\mathsf T}$, and the Riccati equation gives three scalar equations: $(1,1)$: $-p_2^2 + q = 0$; $(1,2)$: $p_1 - p_2p_3 = 0$; $(2,2)$: $2p_2 - p_3^2 = 0$. Taking positive roots, $p_2 = \sqrt q$, $p_3 = \sqrt{2p_2} = \sqrt2\,q^{1/4}$, $p_1 = p_2p_3$. Then $K = B^{\mathsf T}P = [p_2\ \ p_3] = [\sqrt q\ \ \sqrt2\,q^{1/4}]$. The closed-loop polynomial is $s^2 + \sqrt2\,q^{1/4}s + \sqrt q$, i.e. $\omega_n = q^{1/4}$ and $2\zeta\omega_n = \sqrt2\,\omega_n$: $\zeta = 1/\sqrt2 = 0.707$ for every $q$. The weight sets the speed; the damping of $0.707$ comes for free.
:::
:::

::: exercise An observer-based compensator {level=3}
For the double integrator with $K = [8\ \ 4]$ and $L = [20\ \ 100]^{\mathsf T}$ (from the first and third exercises), compute the compensator transfer function [[#eq-observer-compensator]] from $y$ to $u$ and identify its type.
::: solution
$A - BK - LC = \begin{bmatrix}-20 & 1\\ -108 & -4\end{bmatrix}$, so $sI - (A - BK - LC) = \begin{bmatrix}s + 20 & -1\\ 108 & s + 4\end{bmatrix}$ with determinant $s^2 + 24s + 188$. Its inverse times $L$ is $\frac{1}{s^2 + 24s + 188}\begin{bmatrix}s + 4 & 1\\ -108 & s + 20\end{bmatrix}\begin{bmatrix}20\\ 100\end{bmatrix} = \frac{1}{s^2 + 24s + 188}\begin{bmatrix}20s + 180\\ 100s - 160\end{bmatrix}$. Multiplying by $K$: $C(s) = \dfrac{8(20s + 180) + 4(100s - 160)}{s^2 + 24s + 188} = \dfrac{560s + 800}{s^2 + 24s + 188}$. It has a zero at $-1.43$ and poles at $-12 \pm 6.6j$: a lead-type compensator with a second-order roll-off, which is what one would design by hand for a double integrator. (With the sign convention $u = -C(s)y$.)
:::
:::
