Disturb an aircraft from trim and let go of the controls, and it does not simply return: it oscillates, drifts, rolls and yaws in a few characteristic patterns — the **modes** of the aircraft. A conventional aircraft has five of them. In pitch there is a quick, usually well-damped nodding of the nose (the **short-period** mode) and a slow, lightly damped exchange of height and speed with a period of a minute or two (the **phugoid**). In roll and yaw there is a heavily damped **roll subsidence**, a slow **spiral** mode that either restores or steepens a bank, and a coupled yawing and rolling oscillation, the **Dutch roll**. Their frequencies and damping decide how the aircraft "feels" to fly and whether it needs artificial stability: they are the core of **handling qualities**.

This lesson takes the linearised state-space models of [[flight-mechanics/aircraft-equations-of-motion]] for the jet transport, computes their eigenvalues and eigenvectors, and derives the classical approximate formulas that connect each mode to a few stability derivatives — the formulas a designer uses to decide which part of the aircraft to change. The theory of linear systems and eigenvalues is in [[control-systems/state-space]] and [[control-systems/time-response]].

## Modes, eigenvalues and what they mean {#sec-eigen}

For $\dot{\mathbf x} = \mathbf A\mathbf x$, every solution is a combination of terms $\mathbf v\,e^{\lambda t}$, where $\lambda$ is an eigenvalue of $\mathbf A$ and $\mathbf v$ its eigenvector. A real eigenvalue gives a non-oscillatory **subsidence** ($\lambda < 0$) or **divergence** ($\lambda > 0$); a complex pair $\lambda = -\zeta\omega_n \pm \mathrm{i}\,\omega_n\sqrt{1 - \zeta^2}$ gives an oscillation.

::: definition Mode characteristics {#def-mode}
For a mode with eigenvalue $\lambda = \sigma \pm \mathrm{i}\,\omega_d$:
- **natural frequency** $\omega_n = \lvert\lambda\rvert = \sqrt{\sigma^2 + \omega_d^2}$ and **damping ratio** $\zeta = -\sigma/\omega_n$;
- **period** $T = 2\pi/\omega_d$;
- **time to half amplitude** $t_{1/2} = \ln 2/\lvert\sigma\rvert$ if $\sigma < 0$, or **time to double amplitude** $t_2 = \ln 2/\sigma$ if $\sigma > 0$;
- for a real eigenvalue, the **time constant** $\tau = -1/\lambda$;
- the **mode shape**: the eigenvector, giving the relative amplitudes and phases of the state variables in that mode.
:::

The eigenvalues are the roots of the characteristic polynomial $\det(\lambda\mathbf I - \mathbf A) = 0$, a quartic for each of the two decoupled sets. Bryan's stability condition is that all roots have negative real parts, which for a quartic $\lambda^4 + A_3\lambda^3 + A_2\lambda^2 + A_1\lambda + A_0$ is the **Routh–Hurwitz** condition: all coefficients positive and $A_3A_2A_1 - A_1^2 - A_3^2A_0 > 0$ ([[control-systems/feedback-stability]]). The sign of the constant term alone is often decisive: $A_0 < 0$ means a real positive root, a non-oscillatory divergence.

## Longitudinal modes {#sec-longitudinal}

::: example Longitudinal modes of the jet transport {#ex-long-modes}
Find the eigenvalues and mode characteristics of the jet transport's longitudinal matrix from [[flight-mechanics/aircraft-equations-of-motion#ex-a-long]], and describe the mode shapes.
::: solution
The characteristic polynomial is $\lambda^4 + 0.7114\lambda^3 + 0.8534\lambda^2 + 0.004960\lambda + 0.002747$, all coefficients positive, and the Routh discriminant $0.7114 \times 0.8534 \times 0.004960 - 0.004960^2 - 0.7114^2 \times 0.002747 = 0.003011 - 0.0000246 - 0.001390 = 0.001597 > 0$: stable. Numerically (any eigenvalue routine):

| mode | $\lambda$ / $\mathrm{s^{-1}}$ | $\omega_n$ / $\mathrm{rad\,s^{-1}}$ | $\zeta$ | period / s | $t_{1/2}$ / s |
|---|---|---|---|---|---|
| short period | $-0.3541 \pm 0.8500\mathrm{i}$ | 0.921 | 0.385 | 7.39 | 1.96 |
| phugoid | $-0.00157 \pm 0.0569\mathrm{i}$ | 0.0569 | 0.0276 | 110 | 441 |

Mode shapes (eigenvectors scaled to unit pitch attitude $\Delta\theta$): in the **short-period** mode $\lvert\Delta\alpha\rvert = \lvert\Delta w\rvert/u_0 = 1.08\lvert\Delta\theta\rvert$ while $\lvert\Delta u\rvert/u_0 = 0.025\lvert\Delta\theta\rvert$ — a pitching motion at almost constant speed in which angle of attack and attitude change together. In the **phugoid** $\lvert\Delta u\rvert/u_0 = 0.75\lvert\Delta\theta\rvert$ with $\Delta u$ about $90^\circ$ out of phase with $\Delta\theta$, while $\lvert\Delta\alpha\rvert = 0.017\lvert\Delta\theta\rvert$ — the aircraft climbs and slows, then dives and speeds up, at almost constant angle of attack. Sanity check: the two modes are separated in frequency by a factor of $16$, which is what allows each to be studied with the other "frozen"; the phugoid takes almost four cycles to halve its amplitude, so the pilot sees it as a slow, persistent wandering of speed and height.
:::
:::

### The short-period mode

Because speed hardly changes in the short-period motion, set $\Delta u = 0$ and drop the $X$ equation. What remains is a second-order system in $\Delta\alpha = \Delta w/u_0$ and $\Delta q$.

::: proposition Short-period approximation {#prop-short-period}
With $\Delta u = 0$, $\theta_0 = 0$, and $Z_\alpha = u_0Z_w$, $M_\alpha = u_0M_w$, $M_{\dot\alpha} = u_0M_{\dot w}$,
$$
\begin{bmatrix}\Delta\dot\alpha\\ \Delta\dot q\end{bmatrix} =
\begin{bmatrix} Z_\alpha/u_0 & 1\\ M_\alpha + M_{\dot\alpha}Z_\alpha/u_0 & M_q + M_{\dot\alpha}\end{bmatrix}
\begin{bmatrix}\Delta\alpha\\ \Delta q\end{bmatrix},
$$ {#eq-sp-matrix}
whose characteristic equation $\lambda^2 + 2\zeta_{sp}\omega_{sp}\lambda + \omega_{sp}^2 = 0$ has
$$
\omega_{sp} = \sqrt{\frac{Z_\alpha M_q}{u_0} - M_\alpha},\qquad
\zeta_{sp} = -\frac{M_q + M_{\dot\alpha} + Z_\alpha/u_0}{2\,\omega_{sp}} .
$$ {#eq-sp}
:::

::: proof
The $z$-force equation of [[flight-mechanics/aircraft-equations-of-motion#eq-lin-long]] divided by $mu_0$, with $\Delta u = 0$, $\theta_0 = 0$ and the derivatives normalised by mass, gives $\Delta\dot\alpha = (Z_\alpha/u_0)\Delta\alpha + \Delta q$. The pitch equation is $\Delta\dot q = M_\alpha\Delta\alpha + M_{\dot\alpha}\Delta\dot\alpha + M_q\Delta q$; substituting $\Delta\dot\alpha$ gives the second row of [[#eq-sp-matrix]]. The characteristic polynomial of a $2\times2$ matrix is $\lambda^2 - (\text{trace})\lambda + \det$: trace $= Z_\alpha/u_0 + M_q + M_{\dot\alpha}$, determinant $= (Z_\alpha/u_0)(M_q + M_{\dot\alpha}) - M_\alpha - M_{\dot\alpha}Z_\alpha/u_0 = Z_\alpha M_q/u_0 - M_\alpha$. Matching with $\lambda^2 + 2\zeta\omega\lambda + \omega^2$ gives [[#eq-sp]].
:::

The formulas show what to change. The frequency is set mainly by the **pitch stiffness** $-M_\alpha \propto -C_{m\alpha} = aK_n$: a larger static margin gives a faster, stiffer short period, and as the centre of gravity moves to the neutral point the frequency falls (it does not quite reach zero, because of the $Z_\alpha M_q$ term). The damping comes from **pitch damping** $M_q + M_{\dot\alpha}$ (mostly the tail) and the **lift-curve slope** through $Z_\alpha$. Both scale with dynamic pressure, so at high altitude, where $q$ is low for a given true airspeed, the short period becomes slower and less damped — one reason transports carry pitch dampers.

For the jet transport: $Z_\alpha/u_0 = -0.406$, $M_q = -0.2253$, $M_{\dot\alpha} = -0.0751$, $M_\alpha = -0.7564\ \mathrm{s^{-2}}$:
$$
\omega_{sp} = \sqrt{(-0.406)(-0.2253) + 0.7564} = \sqrt{0.0915 + 0.7564} = 0.921\ \mathrm{rad/s},\qquad
\zeta_{sp} = \frac{0.2253 + 0.0751 + 0.406}{2 \times 0.921} = 0.384,
$$
agreeing with the full fourth-order result to three figures.

::: widget phaseplane
f: -0.406*x + y
g: -(Ka*0.7564 - 0.0305)*x - Mq*y
x: -0.2, 0.2
y: -0.25, 0.25
sliders: Ka=1:0.1:3:0.05; Mq=0.3005:0:1.5:0.01
points: 0.15, 0
nullclines: false
caption: The short-period approximation in the $(\Delta\alpha, \Delta q)$ plane (rad, rad/s) for the jet transport. `Ka` scales the pitch stiffness $-M_\alpha$ (1 = the present static margin) and `Mq` is the total pitch damping $-(M_q + M_{\dot\alpha})$ in $\mathrm{s^{-1}}$. The trajectory starts from a $0.15\ \mathrm{rad}$ angle-of-attack disturbance. Raise `Mq` — as a pitch damper does — and the spiral becomes a direct approach; lower `Ka` towards $0.1$ (centre of gravity near the neutral point) and the motion becomes sluggish and slow.
:::

### The phugoid

In the phugoid the angle of attack barely changes, so the lift coefficient is nearly constant and the motion is an exchange between kinetic and potential energy. Lanchester described it in 1908 by imagining a glider without drag: as it climbs it slows, its lift (at constant $C_L$) falls below its weight and the path curves down; descending, it speeds up, lift exceeds weight and the path curves up.

::: proposition Phugoid approximation (Lanchester) {#prop-phugoid}
Neglecting pitching dynamics ($\Delta\alpha \approx 0$, $\Delta\dot q$ equation dropped) and with $C_{Du} = C_{Lu} = 0$ in level flight,
$$
\omega_p = \sqrt2\,\frac{g}{u_0},\qquad \zeta_p = \frac{1}{\sqrt2\,(L/D)},\qquad T_p = \frac{\sqrt2\,\pi u_0}{g}.
$$ {#eq-phugoid}
:::

::: proof
With $\Delta w = 0$ the remaining longitudinal equations are $\Delta\dot u = X_u\Delta u - g\Delta\theta$ and, from the $z$-equation, $0 = Z_u\Delta u + u_0\Delta q = Z_u\Delta u + u_0\Delta\dot\theta$. Differentiating the first and substituting $\Delta\dot\theta = -Z_u\Delta u/u_0$: $\Delta\ddot u - X_u\Delta\dot u - (gZ_u/u_0)\Delta u = 0$. So $\omega_p^2 = -gZ_u/u_0$ and $2\zeta_p\omega_p = -X_u$. From [[flight-mechanics/aircraft-equations-of-motion#prop-xz-derivs]] in level flight ($qSC_L = mg$): $Z_u = -2g/u_0$ and $X_u = -2g/(u_0\,L/D)$. Hence $\omega_p = \sqrt2\,g/u_0$ and $\zeta_p = (2g/(u_0L/D))/(2\sqrt2g/u_0) = 1/(\sqrt2\,L/D)$; the period is $2\pi/\omega_p$.
:::

The phugoid period depends only on speed — about $0.45$ s per m/s of airspeed — and its damping only on $L/D$: aerodynamically efficient aircraft have poorly damped phugoids. For the jet transport the approximation gives $\omega_p = 1.414 \times 9.807/230.15 = 0.0603\ \mathrm{rad/s}$ ($T_p = 104\ \mathrm{s}$) and $\zeta_p = 1/(1.414 \times 17.02) = 0.042$, against $0.0569\ \mathrm{rad/s}$ ($110\ \mathrm{s}$) and $0.028$ from the full model. The frequency is good; the damping is $50\,\%$ too high, because the approximation ignores the small changes of angle of attack (through $X_w$ and $M_u$-type couplings) that in this case feed energy back into the motion. Compressibility ($C_{Du}$, $C_{mu}$ near the drag rise) and thrust variation with speed change the phugoid considerably at high subsonic Mach numbers, so the full model or flight test is needed to predict its damping.

::: widget plot
f: exp(-x/(sqrt(2)*LD)*sqrt(2)*9.80665/V)*cos(sqrt(2)*9.80665/V*sqrt(1 - 1/(2*LD^2))*x)
x: 0, 600
y: -1.1, 1.1
sliders: V=230:50:300:5; LD=17:5:25:0.5
labels: \Delta u(t)/\Delta u(0)
caption: Phugoid response of the speed perturbation (normalised) against time in seconds, from Lanchester's approximation, for true airspeed $V$ (m/s) and lift-to-drag ratio $L/D$. The period grows in proportion to speed; the damping falls as $L/D$ rises. At $V = 230$ and $L/D = 17$ the amplitude halves only after about four cycles (the full model is even less damped). A sailplane at $25\ \mathrm{m/s}$ with $L/D = 40$ has a period of only $11\ \mathrm{s}$, but takes over ten cycles to settle.
:::

::: warning Approximations are for insight, not for numbers
The short-period approximation is usually excellent; the phugoid and Dutch-roll approximations often are not. The jet transport's phugoid damping comes out $50\,\%$ too high, and its Dutch-roll damping (below) three times too high. Use the approximate formulas to see which derivatives matter and in which direction to change them, but compute mode characteristics for design and certification from the full fourth-order models (or the nonlinear equations), and check them against flight test. The other classic error is to read the damping ratio from the real part alone: $\zeta = -\sigma/\omega_n$, not $-\sigma$.
:::

## Lateral–directional modes {#sec-lateral}

::: example Lateral–directional modes of the jet transport {#ex-lat-modes}
Find the eigenvalues of $\mathbf A_{\text{lat}}$ from [[flight-mechanics/aircraft-equations-of-motion#ex-lat-derivs]] and identify the modes.
::: solution
The characteristic polynomial is $\lambda^4 + 1.1320\lambda^3 + 1.1850\lambda^2 + 1.2054\lambda + 0.004129$, with eigenvalues

| mode | $\lambda$ / $\mathrm{s^{-1}}$ | characteristics |
|---|---|---|
| roll subsidence | $-1.072$ | $\tau = 0.93\ \mathrm{s}$ |
| spiral | $-0.00344$ | $\tau = 291\ \mathrm{s}$, $t_{1/2} = 202\ \mathrm{s}$ (stable) |
| Dutch roll | $-0.0283 \pm 1.058\mathrm{i}$ | $\omega_n = 1.059\ \mathrm{rad/s}$, $\zeta = 0.027$, period $5.94\ \mathrm{s}$, $t_{1/2} = 24.5\ \mathrm{s}$ |

The Dutch-roll eigenvector, scaled to unit $\beta$, has $\lvert\phi\rvert = 2.5$, $\lvert r\rvert = 0.98\ \mathrm{rad/s}$ and $\lvert p\rvert = 2.65\ \mathrm{rad/s}$ per radian of sideslip: the aircraft rolls through two and a half times its sideslip angle, with the bank lagging the sideslip by about $135^\circ$. Sanity check: the roll mode is fast and the spiral very slow, as expected; the Dutch roll is lightly damped — taking four cycles to halve — which is typical of swept-wing jets at altitude and is why they have yaw dampers ([[flight-mechanics/flight-control]]).
:::
:::

### Roll subsidence

In a roll the dominant moments are the aileron moment and the roll damping $L_p$; sideslip builds up only slowly. Dropping the side-force and yaw equations leaves $\Delta\dot p = L_p\Delta p + L_{\delta a}\Delta\delta_a$, a first-order system:
$$
\lambda_{\text{roll}} \approx L_p,\qquad \tau_{\text{roll}} = -\frac{1}{L_p},\qquad p_{ss} = -\frac{L_{\delta a}}{L_p}\,\delta_a .
$$ {#eq-roll-mode}
For the jet transport $\tau \approx 1/0.961 = 1.04\ \mathrm{s}$, against $0.93\ \mathrm{s}$ exact. The steady roll rate is the one found from the moment balance in [[flight-mechanics/lateral-static-stability#prop-roll]]; the time constant says how quickly it is reached. Since $L_p \propto \rho u_0b^2/I_x$, the roll mode slows at altitude and for aircraft with heavy wings (fuel, wing-mounted engines).

### The spiral mode

The spiral mode is the slow evolution of bank angle and heading. If a wing drops, the aircraft sideslips towards it; the fin then yaws the nose into the slip (through $N_\beta$), and the outer wing, now moving faster, gains lift and rolls the aircraft further (through $L_r$), while the dihedral effect ($L_\beta$) acts to level the wings. Which wins decides the stability. Because the motion is so slow, the constant and linear terms of the characteristic quartic dominate near $\lambda = 0$: $\lambda_s \approx -A_0/A_1$. For level flight, expanding the determinant gives $A_0 = (g/u_0)(L_\beta N_r - N_\beta L_r)$, so

::: proposition Spiral stability condition {#prop-spiral}
With the lateral model [[flight-mechanics/aircraft-equations-of-motion#eq-a-lat]] in level flight, the spiral mode is stable if and only if
$$
L_\beta N_r - N_\beta L_r > 0 ,
$$ {#eq-spiral}
and its root is approximately $\lambda_s \approx -A_0/A_1$, where $A_0$ and $A_1$ are the last two coefficients of the characteristic polynomial.
:::

::: proof
The constant term of $\det(\lambda\mathbf I - \mathbf A)$ is $\det(-\mathbf A) = \det\mathbf A$ for a $4\times4$ matrix. Expanding $\det\mathbf A_{\text{lat}}$ along the last row (whose only non-zero entry is the $1$ in the $p$ column) and then along the last column (only $g/u_0$ in the first row survives) gives $\det\mathbf A = (g/u_0)\,(L_\beta N_r - N_\beta L_r)$, with the signs of the cofactor expansion both positive here. A real root crosses zero exactly when $A_0$ changes sign, and with the other three roots stable it is the spiral root that does so. Near $\lambda = 0$ the polynomial is approximately $A_1\lambda + A_0$, giving $\lambda_s \approx -A_0/A_1$. Assumption: the spiral root is much smaller in magnitude than the others, so that the $\lambda^2$ and higher terms are negligible near it.
:::

For the jet transport: $L_\beta N_r = (-3.745)(-0.1121) = 0.4200$ and $N_\beta L_r = (1.008)(0.3204) = 0.3230$, so the condition holds and the spiral is stable; $\lambda_s \approx -0.004129/1.2054 = -0.00343$, matching the exact $-0.00344$. Note the conflict: a strong dihedral effect ($L_\beta$ large and negative) helps the spiral, but a strong weathercock effect ($N_\beta$) hurts it — and strong $N_\beta$ is what damps the Dutch roll's tendency to wander. Many aircraft have a slightly unstable spiral mode; it is acceptable if divergence is slow enough for the pilot to correct without noticing (MIL-F-8785C, for example, allows a time to double of not less than $20\ \mathrm{s}$ in cruise for Level 1).

### The Dutch roll

The Dutch roll is the lateral counterpart of the short period: a yawing oscillation driven by the weathercock stiffness $N_\beta$ and damped by the yaw damping $N_r$, with a rolling motion coupled in by the dihedral effect. A crude approximation ignores the roll entirely: with $\phi = p = 0$,
$$
\omega_{dr} \approx \sqrt{N_\beta + \frac{Y_\beta N_r}{u_0}},\qquad
\zeta_{dr} \approx -\frac{Y_\beta/u_0 + N_r}{2\,\omega_{dr}} .
$$ {#eq-dutch-roll}
For the jet transport this gives $\omega_{dr} = 1.007\ \mathrm{rad/s}$ and $\zeta_{dr} = 0.085$, against $1.059$ and $0.027$ from the full model. The frequency is fair; the damping is three times too high, because the large rolling component (bank $2.5$ times sideslip) — driven by the swept wing's strong dihedral effect $L_\beta$ — feeds energy into the yawing motion through the yaw-due-to-roll derivative $N_p$ and the gravity term. The ratio $\lvert\phi/\beta\rvert$ in the Dutch roll is a key handling-qualities parameter: a large value means a "wallowing" rolling oscillation that is hard to damp with ailerons and unpleasant for passengers.

::: example Effect of a larger fin on the lateral modes {#ex-fin-modes}
Suppose a larger fin raises $C_{n\beta}$ from $0.12$ to $0.16$ and $C_{nr}$ from $-0.18$ to $-0.24$, other derivatives unchanged. Estimate the new spiral condition and Dutch-roll characteristics.
::: solution
$N_\beta = 0.16 \times 4.0332\times10^{7}/4.8\times10^{6} = 1.344\ \mathrm{s^{-2}}$ and $N_r = -0.24 \times 2.9905\times10^{6}/4.8\times10^{6} = -0.1495\ \mathrm{s^{-1}}$. Spiral: $L_\beta N_r - N_\beta L_r = (-3.745)(-0.1495) - (1.344)(0.3204) = 0.5600 - 0.4306 = 0.129 > 0$, still stable (and slightly more so: the extra yaw damping outweighs the extra weathercock stiffness here). Dutch roll from the full matrix: the eigenvalues become $-0.0538 \pm 1.199\mathrm{i}$, so $\omega_{dr} = 1.200\ \mathrm{rad/s}$ and $\zeta_{dr} = 0.045$ (the spiral root moves to $-0.0036$). Sanity check: the frequency rises roughly as $\sqrt{N_\beta}$ ($\sqrt{1.344/1.008} = 1.15$, actual $1.13$), and the damping improves only modestly — a $33\,\%$ larger fin still leaves the Dutch roll far below the $\zeta = 0.08$ needed for Level 1. This is why yaw dampers, not bigger fins, are the standard solution.
:::
:::

## Handling qualities {#sec-handling}

Whether a set of modes is acceptable is judged by pilots. In the **Cooper–Harper rating scale** (G. E. Cooper and R. P. Harper Jr., NASA TN D-5153, 1969) a test pilot performs a defined task and rates the aircraft from 1 (excellent, pilot compensation not a factor) to 10 (major deficiencies, control will be lost), by answering a short decision tree: is it controllable? is adequate performance attainable with tolerable workload? is it satisfactory without improvement? Ratings 1–3.5 correspond to **Level 1** (clearly adequate for the mission phase), 3.5–6.5 to **Level 2** (adequate, with increased workload or degraded performance) and 6.5–9 to **Level 3** (the aircraft can be controlled safely, but workload is excessive or performance inadequate).

Specifications translate these levels into mode requirements, so that an aircraft can be designed to them before it flies. The U.S. military specification MIL-F-8785C, *Flying Qualities of Piloted Airplanes* (1980), later replaced by the MIL-STD-1797 series, is the most widely used and quoted; it classifies aircraft (Class I small light, II medium, III large heavy, IV high-manoeuvrability) and flight phases (Category A demanding manoeuvring and precision tracking, B cruise and climb, C take-off and landing). A selection of its Level 1 requirements, as tabulated in Nelson (1998):

| mode | Level 1 requirement (selection) |
|---|---|
| phugoid | $\zeta_p \ge 0.04$ (Level 2: $\zeta_p \ge 0$; Level 3: time to double $\ge 55\ \mathrm{s}$) |
| short period | $0.35 \le \zeta_{sp} \le 1.30$ (Categories A and C); $0.30 \le \zeta_{sp} \le 2.0$ (Category B) |
| Dutch roll, Category B | $\zeta_{dr} \ge 0.08$, $\zeta_{dr}\omega_{dr} \ge 0.15\ \mathrm{rad/s}$, $\omega_{dr} \ge 0.4\ \mathrm{rad/s}$ (Level 2: $0.02$, $0.05$, $0.4$) |
| roll mode | $\tau \le 1.4\ \mathrm{s}$ (Class III, all categories) |
| spiral | time to double $\ge 20\ \mathrm{s}$ (Category B) |

The short-period *frequency* requirement is expressed through the **control anticipation parameter** $\omega_{sp}^2/(n/\alpha)$, the ratio of the initial pitch acceleration to the steady load factor per unit angle of attack, which captures how quickly and how strongly the aircraft responds to a pull on the stick. These numbers are given to illustrate how the modes are judged; a real design is assessed against the full, current specification for its class and phase.

::: example Handling qualities of the jet transport in cruise {#ex-handling}
Rate the jet transport's modes in cruise (Class III, Category B) against the table.
::: solution
Short period: $\zeta_{sp} = 0.385$, inside $0.30$–$2.0$ — Level 1. Phugoid: $\zeta_p = 0.028 < 0.04$ — Level 2 (but $> 0$). Roll: $\tau = 0.93\ \mathrm{s} \le 1.4\ \mathrm{s}$ — Level 1. Spiral: stable — Level 1. Dutch roll: $\zeta_{dr} = 0.027$ (needs $0.08$) and $\zeta_{dr}\omega_{dr} = 0.027 \times 1.059 = 0.029\ \mathrm{rad/s}$ (needs $0.15$ for Level 1 and $0.05$ for Level 2) — worse than Level 2. Sanity check: the result is typical of an unaugmented swept-wing transport: the Dutch roll is the deficient mode, and the phugoid is marginal. The cure — a yaw damper to raise the Dutch-roll damping above about $0.3$, and if needed an autothrottle or pitch-attitude autopilot loop for the phugoid — is the subject of [[flight-mechanics/flight-control]].
:::
:::

::: quiz
An airliner's centre of gravity is moved aft towards (but not to) the stick-fixed neutral point. Which change in the longitudinal modes would you expect?
- [ ] The phugoid period shortens markedly.
- [x] The short-period frequency falls, since the pitch stiffness $-M_\alpha$ falls with the static margin.
- [ ] The short-period damping ratio falls to zero.
- [ ] Nothing changes; the modes depend only on the inertia.
::: solution
$\omega_{sp}^2 = Z_\alpha M_q/u_0 - M_\alpha$ and $-M_\alpha \propto aK_n$. As $K_n \to 0$, $\omega_{sp}^2$ falls to $Z_\alpha M_q/u_0$, the damping ratio $\zeta_{sp} \propto 1/\omega_{sp}$ actually *rises*, and the aircraft becomes sluggish and over-damped in pitch. The phugoid is affected only weakly.
:::
:::

::: history
F. W. Lanchester's *Aerodonetics* (1908), the second volume of his *Aerial Flight*, analysed the long-period oscillation of a glider and named it the **phugoid** — from a Greek root he took to mean "flight" (it actually means "flight" in the sense of fleeing). G. H. Bryan's *Stability in Aviation* (1911) gave the general small-disturbance theory and the stability criteria for the two quartics, and in the 1940s NACA turned pilot opinion into quantitative requirements: R. R. Gilruth's *Requirements for Satisfactory Flying Qualities of Airplanes* (NACA Report 755, 1943) set out measurable criteria that pilots' comments could be checked against. The Cooper–Harper scale of 1969 standardised how pilots' opinions are recorded, and MIL-F-8785C (1980) and its successors set the mode requirements used, directly or adapted, across the industry.
:::

::: summary
- Each eigenvalue is a mode: $\omega_n = \lvert\lambda\rvert$, $\zeta = -\mathrm{Re}\,\lambda/\omega_n$, $t_{1/2} = \ln2/\lvert\mathrm{Re}\,\lambda\rvert$; the eigenvector is the mode shape.
- Short period: $\omega_{sp}^2 = Z_\alpha M_q/u_0 - M_\alpha$, $2\zeta_{sp}\omega_{sp} = -(M_q + M_{\dot\alpha} + Z_\alpha/u_0)$ — set by static margin and tail damping; usually an excellent approximation.
- Phugoid (Lanchester): $\omega_p = \sqrt2g/u_0$, $\zeta_p = 1/(\sqrt2L/D)$, period $\approx 0.45\ \mathrm{s}$ per m/s; damping is not reliably predicted by the approximation.
- Roll subsidence $\tau \approx -1/L_p$; spiral stable iff $L_\beta N_r - N_\beta L_r > 0$, root $\approx -A_0/A_1$.
- Dutch roll driven by $N_\beta$, damped by $N_r$, coupled to roll by $L_\beta$; the roll coupling makes simple approximations poor.
- Handling qualities: Cooper–Harper ratings and Levels 1–3; MIL-F-8785C-type requirements; unaugmented swept-wing jets typically need a yaw damper.
:::

## Exercises

::: exercise Reading an eigenvalue {level=1 check="0.6"}
A mode has eigenvalues $-0.6 \pm 0.8\mathrm{i}\ \mathrm{s^{-1}}$. Find its damping ratio. (Enter $\zeta$ exactly.)
::: solution
$\omega_n = \sqrt{0.36 + 0.64} = 1.0\ \mathrm{rad/s}$ and $\zeta = 0.6/1.0 = 0.6$. The period is $2\pi/0.8 = 7.85\ \mathrm{s}$ and the time to half amplitude $\ln 2/0.6 = 1.16\ \mathrm{s}$.
:::
:::

::: exercise Phugoid period of a light aircraft {level=1 check="22.7"}
Using Lanchester's approximation, find the phugoid period of the light aircraft at $50\ \mathrm{m/s}$. (Enter the period in s, rounded to one decimal place.)
::: solution
$T_p = \sqrt2\pi u_0/g = 1.4142 \times 3.1416 \times 50/9.80665 = 22.652\ \mathrm{s}$, i.e. $22.7\ \mathrm{s}$ to one decimal place. (With $L/D \approx 10.9$ at that speed, $\zeta_p \approx 0.065$.)
:::
:::

::: exercise Phugoid damping {level=1 check="0.0283"}
Find Lanchester's phugoid damping ratio for a sailplane with $L/D = 25$. (Enter $\zeta_p$ rounded to three significant figures.)
::: solution
$\zeta_p = 1/(\sqrt2 \times 25) = 0.0283$.
:::
:::

::: exercise Short period at a different centre of gravity {level=2 check="0.715"}
Moving the jet transport's centre of gravity aft reduces $M_\alpha$ from $-0.7564$ to $-0.4200\ \mathrm{s^{-2}}$, other derivatives unchanged. Use [[#eq-sp]] to find the new short-period natural frequency. (Enter $\omega_{sp}$ in rad/s, rounded to three decimal places.)
::: solution
With $Z_\alpha M_q/u_0 = (-0.40592)(-0.22535) = 0.09147$: $\omega_{sp} = \sqrt{0.09147 + 0.4200} = \sqrt{0.51147} = 0.715\ \mathrm{rad/s}$, and $\zeta_{sp} = 0.7064/(2 \times 0.715) = 0.494$.
:::
:::

::: exercise Roll mode time constant {level=2 check="0.74"}
A business jet has $C_{lp} = -0.40$, $b = 16\ \mathrm{m}$, $S = 30\ \mathrm{m^2}$, $I_x = 4.0\times10^{4}\ \mathrm{kg\,m^2}$ and flies at $u_0 = 200\ \mathrm{m/s}$ with $q = 7000\ \mathrm{Pa}$. Estimate the roll-mode time constant. (Enter $\tau$ in s, rounded to two decimal places.)
::: solution
$L_p = qSb^2C_{lp}/(2I_xu_0) = 7000 \times 30 \times 256 \times (-0.40)/(2 \times 4.0\times10^{4} \times 200) = -21\,504/16\,000 = -1.344\ \mathrm{s^{-1}}$, so $\tau = 1/1.344 = 0.744\ \mathrm{s}$, i.e. $0.74\ \mathrm{s}$ — comfortably inside the $1.0$–$1.4\ \mathrm{s}$ limits typical of Level 1.
:::
:::

::: exercise Spiral stability {level=2}
An aircraft has $L_\beta = -2.0\ \mathrm{s^{-2}}$, $N_\beta = 1.5\ \mathrm{s^{-2}}$, $L_r = 0.40\ \mathrm{s^{-1}}$ and $N_r = -0.25\ \mathrm{s^{-1}}$. Is its spiral mode stable? Which single derivative would you change, and by how much, to make it neutrally stable?
::: solution
$L_\beta N_r - N_\beta L_r = (-2.0)(-0.25) - (1.5)(0.40) = 0.50 - 0.60 = -0.10 < 0$: unstable (a slow divergence). For neutral stability with only $L_\beta$ changed, $L_\beta = N_\beta L_r/N_r = -0.60/0.25 = -2.4\ \mathrm{s^{-2}}$ — $20\,\%$ more dihedral effect. Alternatively $N_\beta$ could be cut to $1.25\ \mathrm{s^{-2}}$, at the cost of Dutch-roll frequency.
:::
:::

::: exercise Mode shape from an eigenvector {level=3}
For the jet transport's phugoid, the eigenvector scaled to $\Delta\theta = 1$ has $\Delta u = 171.6\ \mathrm{m/s}$ leading $\Delta\theta$ by $94^\circ$. Using the Lanchester equations of [[#prop-phugoid]], derive the predicted amplitude ratio $\lvert\Delta u\rvert/(u_0\lvert\Delta\theta\rvert)$ and phase, compare them with the eigenvector, and explain the phase physically.
::: solution
From the proof of [[#prop-phugoid]], $\Delta\dot\theta = -Z_u\Delta u/u_0 = (2g/u_0^2)\Delta u$. For a mode $e^{\mathrm{i}\omega t}$, $\mathrm{i}\omega\Delta\theta = (2g/u_0^2)\Delta u$, so $\Delta u/\Delta\theta = \mathrm{i}\omega u_0^2/(2g)$: speed leads attitude by $90^\circ$ (attitude is highest a quarter-cycle after speed is highest, i.e. when the aircraft has slowed in the climb), and $\lvert\Delta u\rvert/(u_0\lvert\Delta\theta\rvert) = \omega u_0/(2g)$. With the exact $\omega = 0.0569$: $0.0569 \times 230.15/(2 \times 9.807) = 0.668$; the full eigenvector gives $171.6/230.15 = 0.746$ and a phase of $94^\circ$ — reasonable agreement for so simple a model. Physically: in a climb the aircraft converts speed to height, so speed is falling while the nose is up and height is rising — the speed oscillation leads the attitude oscillation.
:::
:::

::: exercise A yaw damper requirement {level=3}
How much yaw damping $N_r$ would the jet transport need to meet the Level 1 Dutch-roll requirement $\zeta_{dr}\omega_{dr} \ge 0.15\ \mathrm{rad/s}$, according to the crude approximation [[#eq-dutch-roll]]? Why is the true requirement larger? Suggest how to find it properly.
::: solution
In the approximation $\zeta\omega = -(Y_\beta/u_0 + N_r)/2$, so $\zeta\omega \ge 0.15$ needs $-(−0.0587 + N_r) \ge 0.30$, i.e. $N_r \le -0.241\ \mathrm{s^{-1}}$, about twice the airframe's $-0.112$. The true requirement is larger because the roll coupling, which the approximation ignores, removes damping: the full model gives $\zeta\omega = 0.028$ where the approximation gives $0.085$. The proper method: add $\Delta N_r$ to the third row of $\mathbf A_{\text{lat}}$ (that is what a yaw-rate feedback $\delta_r = K_rr$ does, with $\Delta N_r = N_{\delta r}K_r$), compute the eigenvalues as $K_r$ varies — a root locus — and pick the gain that places the Dutch roll where required, checking that the spiral and roll modes are not harmed and that steady turns are not opposed (which leads to the washout filter of [[flight-mechanics/flight-control]]).
:::
:::
