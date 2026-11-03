A transfer function describes a system by what comes out for what goes in. That is enough to design the loops of the previous chapters, but it hides things an engineer often needs to see: the current in the motor winding while the speed loop settles, the voltage across a capacitor that is not the output, the initial energy stored in an inductor, or the fact that some internal mode is not affected by the input at all. It also becomes awkward for systems with several inputs and outputs — a three-phase inverter, a quadcopter, a multi-loop power supply — where a matrix of transfer functions must be kept consistent.

The **state-space** description keeps all of this. It writes an $n$th-order system as $n$ first-order differential equations for $n$ **state variables**, collected in a vector, in the matrix form $\dot x = Ax + Bu$, $y = Cx + Du$. For circuits the states are the capacitor voltages and inductor currents; for mechanisms, positions and velocities. This chapter shows how to write state models of the course's running examples, how to convert between state space and transfer functions, how to solve the state equation with the **matrix exponential**, and how to test whether every state can be influenced by the input (**controllability**) and deduced from the output (**observability**). These two properties are what make the pole-placement and observer designs of [[control-systems/state-feedback]] possible. Linear algebra is used throughout; eigenvalues are reviewed in [Maths Atlas: eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues), and linear systems of ODEs in [Maths Atlas: linear systems](/learn/maths/lesson.php?c=ode&l=linear-systems).

## State and state equations

::: definition State {#def-state}
The **state** of a dynamic system at time $t_0$ is a set of variables $x_1(t_0), \dots, x_n(t_0)$ such that, together with the input $u(t)$ for $t \ge t_0$, they determine the output and the state for all $t \ge t_0$. The smallest such $n$ is the **order** of the system.
:::

In a circuit the natural state variables are the quantities that describe stored energy and cannot jump: capacitor voltages ($\tfrac12Cv^2$) and inductor currents ($\tfrac12Li^2$). Knowing them at $t_0$ and the source waveforms after $t_0$ is exactly what is needed to solve the circuit, which is why the initial conditions of [[circuits-2/laplace-circuit-analysis]] were always capacitor voltages and inductor currents. In a mechanism the states are positions (spring energy) and velocities (kinetic energy).

::: definition Linear state-space model {#def-ss}
A linear time-invariant system with $m$ inputs $u$, $p$ outputs $y$ and $n$ states $x$ is described by

$$
\dot x(t) = Ax(t) + Bu(t), \qquad y(t) = Cx(t) + Du(t),
$$ {#eq-ss}

where $A$ is $n\times n$ (the **system matrix**), $B$ is $n\times m$, $C$ is $p\times n$ and $D$ is $p\times m$. For a single-input single-output (SISO) system $B$ is a column, $C$ a row and $D$ a scalar.
:::

Nonlinear systems $\dot x = f(x, u)$ fit the same framework after linearisation: by [[control-systems/modelling-dynamic-systems#thm-linearise]], $A$ and $B$ are the Jacobian matrices $\partial f/\partial x$ and $\partial f/\partial u$ at the operating point.

::: example A series RLC circuit {#ex-rlc-ss}
A series RLC circuit with $R = 10\,\Omega$, $L = 1\,\mathrm{mH}$ and $C = 10\,\mathrm{\mu F}$ is driven by a voltage $u$; the output is the capacitor voltage. Write a state-space model and find the eigenvalues of $A$.
::: solution
Take $x_1 = v_C$ and $x_2 = i$. The capacitor law gives $\dot x_1 = i/C$; Kirchhoff's voltage law around the loop gives $L\dot x_2 = u - Ri - v_C$. So

$$
\dot x = \begin{bmatrix}0 & 1/C\\ -1/L & -R/L\end{bmatrix}x + \begin{bmatrix}0\\ 1/L\end{bmatrix}u = \begin{bmatrix}0 & 10^5\\ -1000 & -10^4\end{bmatrix}x + \begin{bmatrix}0\\ 1000\end{bmatrix}u, \qquad y = \begin{bmatrix}1 & 0\end{bmatrix}x .
$$

The eigenvalues are the roots of $\det(sI - A) = s^2 + 10^4s + 10^8$: $s = -5000 \pm 8660j$, that is $\omega_n = 10^4\,\mathrm{rad/s}$ and $\zeta = 0.5$, the same as the poles of $1/(LCs^2 + RCs + 1)$. The model also gives the current, $i = x_2$, which the transfer function from $u$ to $v_C$ does not show.
:::
:::

::: example The DC motor in state space {#ex-motor-ss}
Write a state model of the motor of [[control-systems/modelling-dynamic-systems#ex-motor]] with input $v$, disturbance $\tau_L$ and states $i$, $\omega$ and $\theta$.
::: solution
From [[control-systems/modelling-dynamic-systems#eq-motor-ode]], $\dot i = (v - Ri - K\omega)/L$, $\dot\omega = (Ki - b\omega - \tau_L)/J$ and $\dot\theta = \omega$:

$$
\frac{\dd}{\dd t}\begin{bmatrix}i\\ \omega\\ \theta\end{bmatrix} = \begin{bmatrix}-R/L & -K/L & 0\\ K/J & -b/J & 0\\ 0 & 1 & 0\end{bmatrix}\begin{bmatrix}i\\ \omega\\ \theta\end{bmatrix} + \begin{bmatrix}1/L & 0\\ 0 & -1/J\\ 0 & 0\end{bmatrix}\begin{bmatrix}v\\ \tau_L\end{bmatrix}.
$$

Numerically the upper-left block is $\begin{bmatrix}-2000 & -50\\ 2500 & -0.5\end{bmatrix}$, and $B$ has entries $1/L = 1000$ and $-1/J = -5\times10^4$. A speed sensor gives $C = [0\ \ 1\ \ 0]$; an encoder gives $C = [0\ \ 0\ \ 1]$; measuring the current as well gives a second row $[1\ \ 0\ \ 0]$. The two inputs — one we control, one we do not — sit side by side in $B$.
:::
:::

The averaged buck converter of [[control-systems/modelling-dynamic-systems#prop-buck]] is already in state form: with $x = [i_L\ \ v_o]\T$ and input $d$, $A = \begin{bmatrix}0 & -1/L\\ 1/C & -1/(RC)\end{bmatrix}$ and $B = [V_{in}/L\ \ 0]\T$. State-space averaging was in fact invented for converters: the model in each switch position is linear, and averaging the two $A$ matrices with weights $d$ and $1 - d$ gives the averaged model.

::: widget phaseplane
matrix: 0, 1; -1, -1
x: -3, 3
y: -3, 3
caption: The RLC circuit of [[#ex-rlc-ss]] in normalised units: $x$ is the capacitor voltage and $y$ the current scaled by $\sqrt{L/C}$, with time in units of $1/\omega_n$, so $A = \begin{bmatrix}0 & 1\\ -1 & -2\zeta\end{bmatrix}$. With $-2\zeta = -1$ every trajectory spirals into the origin: the stored energy oscillates between capacitor and inductor while the resistor dissipates it. Change the lower-right entry: at $0$ (no resistance) the orbits close; below $-2$ ($\zeta > 1$) the spiral becomes a node; a positive value (negative resistance, as in an oscillator) makes the spiral grow.
:::

## From transfer function to state space

Every proper rational transfer function has state-space models, and infinitely many of them. One standard choice can be written down directly from the coefficients.

::: theorem Controllable canonical form {#thm-ccf}
The strictly proper transfer function

$$
G(s) = \frac{b_{n-1}s^{n-1} + \dots + b_1s + b_0}{s^n + a_{n-1}s^{n-1} + \dots + a_1s + a_0}
$$

is realised by

$$
A = \begin{bmatrix}0 & 1 & 0 & \cdots & 0\\ 0 & 0 & 1 & \cdots & 0\\ \vdots & & & \ddots & \vdots\\ 0 & 0 & 0 & \cdots & 1\\ -a_0 & -a_1 & -a_2 & \cdots & -a_{n-1}\end{bmatrix},\quad B = \begin{bmatrix}0\\ 0\\ \vdots\\ 0\\ 1\end{bmatrix},\quad C = \begin{bmatrix}b_0 & b_1 & \cdots & b_{n-1}\end{bmatrix},\quad D = 0 .
$$ {#eq-ccf}
:::

::: proof
Introduce an auxiliary signal $z$ with $Z(s) = U(s)/\bigl(s^n + a_{n-1}s^{n-1} + \dots + a_0\bigr)$, i.e. $z^{(n)} + a_{n-1}z^{(n-1)} + \dots + a_0z = u$. Then $Y(s) = (b_{n-1}s^{n-1} + \dots + b_0)Z(s)$, i.e. $y = b_{n-1}z^{(n-1)} + \dots + b_0z$. Choosing the states $x_1 = z$, $x_2 = \dot z$, …, $x_n = z^{(n-1)}$ gives $\dot x_k = x_{k+1}$ for $k < n$ and $\dot x_n = z^{(n)} = u - a_0x_1 - \dots - a_{n-1}x_n$, which is the stated $A$ and $B$; the output equation is $y = b_0x_1 + \dots + b_{n-1}x_n$. A proper but not strictly proper $G$ is first split into a constant $D = G(\infty)$ plus a strictly proper remainder.
:::

The characteristic polynomial of the companion matrix in [[#eq-ccf]] is the denominator of $G$, so its eigenvalues are the poles. The name "controllable" will be explained below: this form is always controllable. Its dual, the **observable canonical form**, uses $A\T$, swaps the roles of $B$ and $C\T$, and is always observable.

::: example A realisation of the servo {#ex-servo-ccf}
Find the controllable canonical form of the servo loop gain $G(s) = 250\,000/[s(s + 63)(s + 200)]$.
::: solution
The denominator is $s^3 + 263s^2 + 12\,600s + 0$, so $a_2 = 263$, $a_1 = 12\,600$, $a_0 = 0$, and the numerator is $b_0 = 250\,000$:

$$
A = \begin{bmatrix}0 & 1 & 0\\ 0 & 0 & 1\\ 0 & -12\,600 & -263\end{bmatrix},\quad B = \begin{bmatrix}0\\ 0\\ 1\end{bmatrix},\quad C = \begin{bmatrix}250\,000 & 0 & 0\end{bmatrix}.
$$

The states are $z$, $\dot z$, $\ddot z$ with $y = 250\,000z$: the output angle and its first two derivatives, scaled. This realisation is mathematically correct but physically opaque — its states are not the amplifier output, the current and the speed — which is why physical models such as [[#ex-motor-ss]] are preferred whenever they are available.
:::
:::

### Change of state variables

If $x$ is a state vector, so is $z = P^{-1}x$ for any invertible matrix $P$. Substituting $x = Pz$ in [[#eq-ss]] gives the **similar** realisation

$$
\dot z = P^{-1}APz + P^{-1}Bu, \qquad y = CPz + Du .
$$ {#eq-similarity}

The matrices change, but nothing physical does: $\det(sI - P^{-1}AP) = \det\bigl(P^{-1}(sI - A)P\bigr) = \det(sI - A)$, so the eigenvalues are unchanged, and (see below) so is the transfer function. If $A$ has $n$ independent eigenvectors and $P$ is the matrix of eigenvectors, $P^{-1}AP$ is diagonal: the **modal form**, in which each state is one natural mode of the system.

::: widget transform2d
matrix: -3, 1; 1, -3
eigen: true
caption: The system matrix of two identical, coupled RC sections (see the exercise "A diagonalisable exponential"), shown as a linear map of the plane. The eigenvectors $[1\ \ 1]^{\mathsf T}$ and $[1\ \ {-1}]^{\mathsf T}$ are the directions that $A$ only stretches: along them the state equation decouples into two scalar equations, the "sum" mode with eigenvalue $-2$ and the "difference" mode with eigenvalue $-4$. Taking these vectors as the columns of $P$ gives the modal form. Edit the off-diagonal entries and watch the eigen-directions turn; make them unequal and the eigenvectors are no longer perpendicular.
:::

Modal coordinates make the structure of a system visible at a glance. In the coupled-RC example a disturbance that raises both capacitor voltages equally excites only the slow sum mode, while one that raises one and lowers the other excites only the fast difference mode; any initial state is a mixture of the two, and each part decays at its own rate. The same decomposition, applied to the inductor currents of a multi-phase converter or to the line voltages of a three-phase system (where it is the symmetrical-component transformation of [[power-systems/unsymmetrical-faults]]), turns one coupled problem into several independent ones.

## From state space to transfer function

::: theorem Transfer function of a state-space model {#thm-ss-tf}
The transfer function (matrix) of [[#eq-ss]] is

$$
G(s) = C(sI - A)^{-1}B + D .
$$ {#eq-ss-tf}

Each entry is a rational function whose denominator divides $\det(sI - A)$, so every pole of $G$ is an eigenvalue of $A$. The transfer function is unchanged by a change of state variables.
:::

::: proof
Transforming $\dot x = Ax + Bu$ with zero initial state gives $sX(s) = AX(s) + BU(s)$, so $(sI - A)X = BU$ and $X = (sI - A)^{-1}BU$ wherever $sI - A$ is invertible, i.e. away from the eigenvalues. Then $Y = CX + DU = [C(sI - A)^{-1}B + D]U$. By Cramer's rule $(sI - A)^{-1} = \operatorname{adj}(sI - A)/\det(sI - A)$, whose entries are polynomials divided by $\det(sI - A)$; cancellation may remove some factors, so the poles are a subset of the eigenvalues. For the similar realisation, $CP(sI - P^{-1}AP)^{-1}P^{-1}B = CP\,P^{-1}(sI - A)^{-1}P\,P^{-1}B = C(sI - A)^{-1}B$.
:::

The words "divides" and "subset" in the theorem matter: an eigenvalue of $A$ can be missing from $G(s)$. When that happens, part of the system is invisible from the input–output point of view, and the next section explains why.

::: example The motor's transfer function from its state model {#ex-motor-tf}
Using the $(i, \omega)$ part of [[#ex-motor-ss]] with input $v$ and output $\omega$, compute $G(s)$ by [[#eq-ss-tf]].
::: solution
With $A = \begin{bmatrix}-2000 & -50\\ 2500 & -0.5\end{bmatrix}$, $B = [1000\ \ 0]\T$ and $C = [0\ \ 1]$:

$$
sI - A = \begin{bmatrix}s + 2000 & 50\\ -2500 & s + 0.5\end{bmatrix},\qquad (sI - A)^{-1} = \frac{1}{(s + 2000)(s + 0.5) + 125\,000}\begin{bmatrix}s + 0.5 & -50\\ 2500 & s + 2000\end{bmatrix}.
$$

Then $C(sI - A)^{-1}B$ picks out the lower-left entry times $1000$:

$$
G(s) = \frac{2.5\times10^6}{s^2 + 2000.5s + 126\,000},
$$

which is [[control-systems/modelling-dynamic-systems#eq-motor-tf]] divided through by $LJ = 2\times10^{-8}$. The eigenvalues of $A$, $-65.1$ and $-1935$, are the poles found there.
:::
:::

## Solving the state equation

For a scalar equation $\dot x = ax + bu$ the solution is $x(t) = e^{at}x(0) + \int_0^te^{a(t - \tau)}bu(\tau)\,\dd\tau$. The matrix case is identical once the exponential of a matrix is defined.

::: definition Matrix exponential {#def-expm}
For a square matrix $A$,

$$
e^{At} = I + At + \frac{A^2t^2}{2!} + \frac{A^3t^3}{3!} + \cdots .
$$ {#eq-expm}

The series converges for every $A$ and $t$. It satisfies $\dfrac{\dd}{\dd t}e^{At} = Ae^{At}$, $e^{A\cdot0} = I$, $e^{A(t + \tau)} = e^{At}e^{A\tau}$ and $(e^{At})^{-1} = e^{-At}$, and its Laplace transform is $(sI - A)^{-1}$.
:::

::: theorem Solution of the state equation {#thm-state-solution}
The solution of $\dot x = Ax + Bu$ with $x(0) = x_0$ is

$$
x(t) = e^{At}x_0 + \int_0^te^{A(t - \tau)}Bu(\tau)\,\dd\tau,
$$ {#eq-state-solution}

the sum of the **zero-input response** (the first term) and the **zero-state response** (the convolution of the input with the impulse response $e^{At}B$). The output is $y = Cx + Du$.
:::

::: proof
Multiply $\dot x - Ax = Bu$ on the left by $e^{-At}$. Since $\frac{\dd}{\dd t}(e^{-At}x) = e^{-At}\dot x - Ae^{-At}x = e^{-At}(\dot x - Ax)$ (the matrices $A$ and $e^{-At}$ commute), we have $\frac{\dd}{\dd t}(e^{-At}x) = e^{-At}Bu$. Integrating from $0$ to $t$: $e^{-At}x(t) - x_0 = \int_0^te^{-A\tau}Bu(\tau)\,\dd\tau$. Multiplying by $e^{At}$ gives [[#eq-state-solution]]. Uniqueness follows from the standard theory of linear ODEs.
:::

If $A = P\Lambda P^{-1}$ with $\Lambda = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$, then $A^k = P\Lambda^kP^{-1}$ and so $e^{At} = P\operatorname{diag}(e^{\lambda_1t}, \dots, e^{\lambda_nt})P^{-1}$: every entry of $e^{At}$ is a combination of the **modes** $e^{\lambda_it}$. Hence $x(t) \to 0$ for every initial state exactly when all eigenvalues have negative real parts (with repeated eigenvalues the modes include $t^ke^{\lambda t}$, which still decay). This **internal** or **asymptotic stability** implies BIBO stability of every transfer function of the system; the converse fails when an unstable mode is hidden from the input or the output, as in the warning of [[control-systems/stability]].

::: example A matrix exponential {#ex-expm}
Compute $e^{At}$ for $A = \begin{bmatrix}0 & 1\\ -2 & -3\end{bmatrix}$ and the free response from $x_0 = [1\ \ 0]\T$.
::: solution
Using the Laplace transform,

$$
(sI - A)^{-1} = \begin{bmatrix}s & -1\\ 2 & s + 3\end{bmatrix}^{-1} = \frac{1}{(s + 1)(s + 2)}\begin{bmatrix}s + 3 & 1\\ -2 & s\end{bmatrix}.
$$

Partial fractions entry by entry, e.g. $\frac{s + 3}{(s + 1)(s + 2)} = \frac{2}{s + 1} - \frac{1}{s + 2}$, give

$$
e^{At} = \begin{bmatrix}2e^{-t} - e^{-2t} & e^{-t} - e^{-2t}\\ -2e^{-t} + 2e^{-2t} & -e^{-t} + 2e^{-2t}\end{bmatrix}.
$$

Checks: at $t = 0$ this is $I$; its derivative at $0$ is $\begin{bmatrix}-2 + 2 & -1 + 2\\ 2 - 4 & 1 - 4\end{bmatrix} = A$. The free response from $[1\ \ 0]\T$ is the first column: $x_1 = 2e^{-t} - e^{-2t}$, $x_2 = -2e^{-t} + 2e^{-2t}$. At $t = 1$, $x = [0.600\ \ -0.465]\T$ (confirmed by summing the series numerically).
:::
:::

::: warning The matrix exponential is not the exponential of the entries
$e^{At}$ is not the matrix whose entries are $e^{a_{ij}t}$, and $e^{(A + B)t} \neq e^{At}e^{Bt}$ unless $A$ and $B$ commute. For the matrix of [[#ex-expm]], the entry-wise exponential at $t = 1$ would have $e^{0} = 1$ in the top-left corner instead of $0.600$. Compute $e^{At}$ from $(sI - A)^{-1}$, from the eigen-decomposition, or numerically (scaling and squaring of the series is the standard method in software).
:::

## Controllability and observability

Can the input steer every state? Can every state be deduced from the output? For transfer functions these questions do not even arise; in state space they have precise answers.

::: definition Controllability and observability {#def-co}
The system $(A, B)$ is **controllable** if for every initial state $x_0$ and every target state $x_1$ there is an input that takes the state from $x_0$ to $x_1$ in finite time. The system $(A, C)$ is **observable** if the initial state $x_0$ can be determined uniquely from the input and output over a finite interval.
:::

::: theorem Kalman's rank tests {#thm-rank}
For the $n$th-order system [[#eq-ss]]:

1. $(A, B)$ is controllable if and only if the **controllability matrix** $\mathcal C = \begin{bmatrix}B & AB & A^2B & \cdots & A^{n-1}B\end{bmatrix}$ has rank $n$.
2. $(A, C)$ is observable if and only if the **observability matrix** $\mathcal O = \begin{bmatrix}C\\ CA\\ \vdots\\ CA^{n-1}\end{bmatrix}$ has rank $n$.
:::

::: proof
(Sketch for controllability.) By [[#eq-state-solution]], the state reached from $x_0 = 0$ is $x(t) = \int_0^te^{A(t - \tau)}Bu(\tau)\,\dd\tau$. By the Cayley–Hamilton theorem, $A^n$ is a linear combination of $I, A, \dots, A^{n-1}$, so every power of $A$, and hence $e^{A(t - \tau)}$, is such a combination. Therefore every reachable state is a combination of the columns of $B, AB, \dots, A^{n-1}B$; if $\mathcal C$ has rank less than $n$, states outside its column space can never be reached. Conversely, if $\mathcal C$ has full rank, the **controllability Gramian** $W = \int_0^te^{A\tau}BB\T e^{A\T\tau}\,\dd\tau$ is invertible, and the input $u(\tau) = B\T e^{A\T(t - \tau)}W^{-1}x_1$ reaches $x_1$ at time $t$. Observability is the dual statement: with $u = 0$, $y(t) = Ce^{At}x_0$, and its derivatives at $t = 0$ are $Cx_0, CAx_0, \dots$; $x_0$ is determined uniquely if and only if $\mathcal Ox_0 = 0$ implies $x_0 = 0$.
:::

::: example A bridge that cannot be steered {#ex-bridge}
Two RC branches, $R_1C_1$ and $R_2C_2$, are connected in parallel across the same voltage source $u$; the states are the capacitor voltages $x_1$, $x_2$, and the output is the bridge voltage $y = x_1 - x_2$. When is the system controllable, and what is its transfer function?
::: solution
Each branch obeys $\dot x_k = (u - x_k)/(R_kC_k) = a_k(u - x_k)$ with $a_k = 1/(R_kC_k)$, so

$$
A = \begin{bmatrix}-a_1 & 0\\ 0 & -a_2\end{bmatrix},\quad B = \begin{bmatrix}a_1\\ a_2\end{bmatrix},\quad \mathcal C = \begin{bmatrix}a_1 & -a_1^2\\ a_2 & -a_2^2\end{bmatrix},\quad \det\mathcal C = a_1a_2(a_1 - a_2).
$$

The system is controllable unless the time constants are equal. If $R_1C_1 = R_2C_2$, both capacitors see identical equations, so $x_1 - x_2$ obeys $\dot{(x_1 - x_2)} = -a(x_1 - x_2)$ whatever the input: the difference can only decay from its initial value. The transfer function is $Y/U = \frac{a_1}{s + a_1} - \frac{a_2}{s + a_2} = \frac{(a_1 - a_2)s}{(s + a_1)(s + a_2)}$, which vanishes identically when $a_1 = a_2$ — the balanced bridge has no input–output behaviour at all, although it has two states.
:::
:::

::: example What an encoder can see {#ex-observability}
A motor with negligible inductance has states $\theta$ and $\omega$ and $A = \begin{bmatrix}0 & 1\\ 0 & -1/\tau\end{bmatrix}$. Is the system observable from (a) a speed sensor, $C = [0\ \ 1]$; (b) an encoder, $C = [1\ \ 0]$?
::: solution
(a) $\mathcal O = \begin{bmatrix}C\\ CA\end{bmatrix} = \begin{bmatrix}0 & 1\\ 0 & -1/\tau\end{bmatrix}$, rank $1$: not observable. The speed tells us nothing about the absolute angle, which is the integral of the speed plus an unknown constant. (b) $\mathcal O = \begin{bmatrix}1 & 0\\ 0 & 1\end{bmatrix}$, rank $2$: observable. Knowing the angle over an interval, we can differentiate it to obtain the speed. This is why position-controlled drives use encoders and estimate speed from them, not the other way round.
:::
:::

::: quiz
A third-order system has a transfer function $G(s) = C(sI - A)^{-1}B$ of only second order. What can you conclude?
- [ ] $A$ has a repeated eigenvalue.
- [x] The system is uncontrollable or unobservable (or both): one mode is cancelled.
- [ ] The system is unstable.
- [ ] The state-space model must contain an error.
::: solution
A pole–zero cancellation in $C(sI - A)^{-1}B$ means one eigenvalue of $A$ does not appear in $G$. By the Kalman decomposition (see the remark below), that mode is either not excited by the input or not seen at the output. It might be stable or unstable; the transfer function cannot tell.
:::
:::

::: remark Minimal realisations and the Kalman decomposition
A realisation is **minimal** if no realisation of the same transfer function has fewer states. Kalman (1963) and Gilbert (1963) showed that a realisation is minimal if and only if it is both controllable and observable, and that every system can be transformed so that its states split into four groups: controllable and observable, controllable but unobservable, uncontrollable but observable, and neither. The transfer function sees only the first group. An uncontrollable or unobservable mode is harmless if it is stable — the balanced bridge's difference mode decays on its own — and fatal if it is not, since no controller can then stabilise it.
:::

::: application Is a power converter controllable?
The averaged buck converter has $\mathcal C = [B\ \ AB] = \begin{bmatrix}V_{in}/L & 0\\ 0 & V_{in}/(LC)\end{bmatrix}$, rank $2$ for any $V_{in} \neq 0$: both the inductor current and the output voltage can be set by the duty cycle. Multi-phase converters, in which several inductors share one capacitor, are a different matter: with identical phases driven by the same duty cycle, the *differences* between the phase currents are uncontrollable, exactly like the balanced bridge. They are driven apart by component mismatch, which is why multi-phase controllers measure each phase current and adjust each duty cycle separately — current sharing makes the hidden modes controllable.
:::

::: history
State-variable methods were developed in the late 1950s for aerospace guidance, where multi-input multi-output systems, digital computers and optimal trajectories made transfer functions inadequate. Rudolf Kálmán introduced the concepts of controllability and observability and their rank tests in papers of 1960, including "On the general theory of control systems" at the first IFAC congress in Moscow; Elmer Gilbert's 1963 paper on the controllability and observability of multivariable systems and Kalman's 1963 work on canonical structure gave the decomposition into four parts. Lev Pontryagin's maximum principle (1956) and Richard Bellman's dynamic programming (1957) provided the optimisation side of the new "modern control".
:::

## Where this leads

State-space models are the language of [[control-systems/state-feedback]], where a controllable system's eigenvalues are placed anywhere by $u = -Kx$ and an observable system's states are estimated by an observer, and of the Kalman filter in [[random-signals/estimation-kalman]]. In [[control-systems/digital-control]] the matrix exponential gives the exact discretisation of a plant driven through a zero-order hold, $x[k + 1] = e^{AT}x[k] + \int_0^Te^{A\tau}\,\dd\tau\,Bu[k]$. Circuit simulators such as SPICE effectively integrate state equations of this kind ([[circuits-1/circuit-simulation]]).

::: summary
- The state is the minimal information needed, with future inputs, to predict the future; in circuits it is capacitor voltages and inductor currents.
- A linear model is $\dot x = Ax + Bu$, $y = Cx + Du$; nonlinear models give $A$, $B$ as Jacobians.
- Any proper $G(s)$ can be realised in controllable canonical form from its coefficients; realisations are related by similarity, $A \to P^{-1}AP$, which preserves eigenvalues and transfer function.
- $G(s) = C(sI - A)^{-1}B + D$; its poles are eigenvalues of $A$, but some eigenvalues may cancel.
- $x(t) = e^{At}x_0 + \int_0^te^{A(t - \tau)}Bu\,\dd\tau$; $e^{At}$ is a combination of the modes $e^{\lambda_it}$, and the system is internally stable iff all eigenvalues have negative real parts.
- Controllable iff $[B\ AB\ \cdots\ A^{n-1}B]$ has rank $n$; observable iff $[C; CA; \dots; CA^{n-1}]$ has rank $n$.
- Minimal realisations are controllable and observable; lost modes are harmless only if stable.
:::

## Exercises

::: exercise A parallel RC with an inductor {level=1}
A current source $u$ drives a parallel combination of $R$, $L$ and $C$. Taking $x_1 = v_C$ (the common voltage) and $x_2 = i_L$, write the state equations.
::: solution
KCL at the top node: $C\dot x_1 = u - x_1/R - x_2$. The inductor: $L\dot x_2 = x_1$. So $A = \begin{bmatrix}-1/(RC) & -1/C\\ 1/L & 0\end{bmatrix}$, $B = [1/C\ \ 0]\T$.
:::
:::

::: exercise Eigenvalues are poles {level=1 check="-2"}
For $A = \begin{bmatrix}-1 & 1\\ 0 & -2\end{bmatrix}$, $B = [0\ \ 1]\T$, $C = [1\ \ 0]$, find $G(s)$ and give its pole that is furthest from the origin.
::: solution
$(sI - A)^{-1} = \frac{1}{(s + 1)(s + 2)}\begin{bmatrix}s + 2 & 1\\ 0 & s + 1\end{bmatrix}$, so $G(s) = \frac{1}{(s + 1)(s + 2)}$. The poles are $-1$ and $-2$; the furthest from the origin is $-2$.
:::
:::

::: exercise Controllable canonical form {level=1}
Write the controllable canonical form of $G(s) = (s + 3)/(s^2 + 4s + 5)$.
::: solution
$A = \begin{bmatrix}0 & 1\\ -5 & -4\end{bmatrix}$, $B = [0\ \ 1]\T$, $C = [3\ \ 1]$, $D = 0$.
:::
:::

::: exercise A diagonalisable exponential {level=2}
For $A = \begin{bmatrix}-3 & 1\\ 1 & -3\end{bmatrix}$, find the eigenvalues and eigenvectors and hence $e^{At}$.
::: solution
The eigenvalues are $-2$ (eigenvector $[1\ \ 1]\T$) and $-4$ (eigenvector $[1\ \ {-1}]\T$). With $P = \begin{bmatrix}1 & 1\\ 1 & -1\end{bmatrix}$, $P^{-1} = \tfrac12P$,

$$
e^{At} = \frac12\begin{bmatrix}e^{-2t} + e^{-4t} & e^{-2t} - e^{-4t}\\ e^{-2t} - e^{-4t} & e^{-2t} + e^{-4t}\end{bmatrix}.
$$

Physically: two identical coupled RC sections; the sum mode decays at rate $2$ and the difference mode at rate $4$.
:::
:::

::: exercise The levitator with its coil {level=2}
The levitator with coil dynamics (exercise "A levitator with coil dynamics" in [[control-systems/modelling-dynamic-systems]]) has states $x = [\delta y\ \ \dot{\delta y}\ \ \delta i]\T$, input $\delta v$ and $\ddot{\delta y} = 1962\,\delta y - 19.62\,\delta i$, $\dot{\delta i} = -20\,\delta i + 2\,\delta v$. Write $A$ and $B$, find the characteristic polynomial and test controllability.
::: solution
$A = \begin{bmatrix}0 & 1 & 0\\ 1962 & 0 & -19.62\\ 0 & 0 & -20\end{bmatrix}$, $B = [0\ \ 0\ \ 2]\T$. $\det(sI - A) = (s + 20)(s^2 - 1962) = s^3 + 20s^2 - 1962s - 39\,240$. $AB = [0\ \ {-39.24}\ \ {-40}]\T$, $A^2B = [-39.24\ \ 784.8\ \ 800]\T$, and $\det[B\ AB\ A^2B] = -3080 \neq 0$: controllable. The voltage reaches the ball through the current, and the current through the coil — a chain, which is always controllable when each link is non-zero.
:::
:::

::: exercise Observability of the RLC circuit {level=2}
For the RLC circuit of [[#ex-rlc-ss]], is the system observable if the measured output is (a) the capacitor voltage; (b) the current; (c) the resistor voltage?
::: solution
(a) $C = [1\ \ 0]$, $CA = [0\ \ 10^5]$: $\mathcal O$ has rank $2$, observable. (b) $C = [0\ \ 1]$, $CA = [-1000\ \ {-10^4}]$: rank $2$, observable. (c) $C = [0\ \ R] = [0\ \ 10]$: a multiple of (b), observable. In a second-order circuit with both elements coupled, any single non-trivial measurement is enough, because each state influences the other.
:::
:::

::: exercise A similarity transformation {level=2}
Show that the RLC model of [[#ex-rlc-ss]], rewritten with the scaled states $z_1 = x_1$ and $z_2 = x_2\sqrt{L/C}$ and time in units of $1/\omega_n$, takes the form $\dot z = \begin{bmatrix}0 & 1\\ -1 & -2\zeta\end{bmatrix}z$ used in the phase-plane figure.
::: solution
With $\sqrt{L/C} = 10\,\Omega$, $x = Pz$ for $P = \operatorname{diag}(1, 0.1)$, and $P^{-1}AP = \begin{bmatrix}0 & 10^5\times0.1\\ -1000/0.1 & -10^4\end{bmatrix} = \begin{bmatrix}0 & 10^4\\ -10^4 & -10^4\end{bmatrix}$. Dividing by $\omega_n = 10^4\,\mathrm{rad/s}$ (rescaling time $t' = \omega_nt$) gives $\begin{bmatrix}0 & 1\\ -1 & -1\end{bmatrix}$, i.e. $2\zeta = 1$, $\zeta = 0.5$. In general $P^{-1}AP/\omega_n = \begin{bmatrix}0 & 1\\ -1 & -R\sqrt{C/L}\end{bmatrix}$ and $R\sqrt{C/L} = 2\zeta$.
:::
:::

::: exercise Hidden instability {level=3}
Consider $A = \begin{bmatrix}1 & 0\\ 0 & -2\end{bmatrix}$, $B = [0\ \ 1]\T$, $C = [1\ \ 1]$. (a) Find $G(s)$. (b) Is the system controllable? Observable? (c) Is it BIBO stable? Internally stable? (d) What happens to $x_1$ if the initial state is $[10^{-6}\ \ 0]\T$?
::: solution
(a) $(sI - A)^{-1} = \operatorname{diag}\bigl(1/(s - 1), 1/(s + 2)\bigr)$, so $G(s) = C(sI - A)^{-1}B = 1/(s + 2)$. (b) $\mathcal C = \begin{bmatrix}0 & 0\\ 1 & -2\end{bmatrix}$, rank $1$: uncontrollable. $\mathcal O = \begin{bmatrix}1 & 1\\ 1 & -2\end{bmatrix}$, rank $2$: observable. (c) $G$ is BIBO stable, but $A$ has an eigenvalue at $+1$: not internally stable. (d) $x_1 = 10^{-6}e^{t}$, which reaches $1$ after $13.8\,\mathrm{s}$ and grows without bound; the output shows it (the mode is observable), but no input can stop it.
:::
:::

::: exercise Controllable canonical form is controllable {level=3}
Prove that the pair $(A, B)$ of [[#eq-ccf]] is controllable for every choice of the coefficients $a_k$, and write down the controllability matrix for $n = 3$.
::: hint
Compute $B$, $AB$ and $A^2B$ for $n = 3$ and look at their structure.
:::
::: solution
For $n = 3$, $B = [0\ \ 0\ \ 1]\T$, $AB = [0\ \ 1\ \ {-a_2}]\T$ and $A^2B = [1\ \ {-a_2}\ \ a_2^2 - a_1]\T$. So

$$
\mathcal C = \begin{bmatrix}0 & 0 & 1\\ 0 & 1 & -a_2\\ 1 & -a_2 & a_2^2 - a_1\end{bmatrix},
$$

an anti-triangular matrix with ones on the anti-diagonal, whose determinant is $-1$. In general $A^kB$ has zeros in its first $n - k - 1$ positions and a $1$ in position $n - k$, because multiplying a vector by the companion matrix shifts its entries up by one place and creates a new entry only in the last position. So $\mathcal C$ is anti-triangular with unit anti-diagonal, $\det\mathcal C = \pm1$, and the pair is controllable whatever the $a_k$.
:::
:::
