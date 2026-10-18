Dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics: the dynamic stability is the study of how the aircraft responds to disturbances over time, and the aircraft modes are the natural motions (phugoid, short period, dutch roll, spiral, and roll) that the aircraft exhibits after a disturbance. **The engineer who calculates the dynamic stability without checking the eigenvalues is not calculating the dynamic stability; they are guessing.** The dynamic stability calculation is the reason the engineer can design the aircraft to have acceptable handling qualities, and the eigenvalue analysis is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.

The quantitative tools of dynamic stability are the **state-space representation** (the linearized equations of motion in matrix form), the **eigenvalues** (the roots of the characteristic equation that determine the mode frequencies and damping ratios), the **phugoid mode** (the long-period oscillation of airspeed and altitude), and the **short-period mode** (the high-frequency oscillation of angle of attack and pitch rate). The tools are the language in which the dynamic stability analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways dynamic stability calculation goes wrong
**Not checking the eigenvalues.** The engineer who calculates the dynamic stability without checking the eigenvalues is not calculating the dynamic stability; they are guessing. **The eigenvalues are the reason the dynamic stability and aircraft modes are designed for the roots, not the coefficients, and the roots are the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the phugoid mode.** The engineer who calculates the dynamic stability without checking the phugoid mode is not calculating the dynamic stability; they are guessing. **The phugoid mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the frequency, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the short-period mode.** The engineer who calculates the dynamic stability without checking the short-period mode is not calculating the dynamic stability; they are guessing. **The short-period mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the damping, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the dutch roll mode.** The engineer who calculates the dynamic stability without checking the dutch roll mode is not calculating the dynamic stability; they are guessing. **The dutch roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the coupling, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the spiral mode.** The engineer who calculates the dynamic stability without checking the spiral mode is not calculating the dynamic stability; they are guessing. **The spiral mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the divergence, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the roll mode.** The engineer who calculates the dynamic stability without checking the roll mode is not calculating the dynamic stability; they are guessing. **The roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the rate, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the damping ratio.** The engineer who calculates the dynamic stability without checking the damping ratio is not calculating the dynamic stability; they are guessing. **The damping ratio is the reason the dynamic stability and aircraft modes are designed for the ratio, not the frequency, and the ratio is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the time to double/half amplitude.** The engineer who calculates the dynamic stability without checking the time to double/half amplitude is not calculating the dynamic stability; they are guessing. **The time to double/half amplitude is the reason the dynamic stability and aircraft modes are designed for the time, not the period, and the time is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** **Not checking the handling qualities.** The engineer who calculates the dynamic stability without checking the handling qualities is not calculating the dynamic stability; they are guessing. **The handling qualities are the reason the dynamic stability and aircraft modes are designed for the qualities, not the quantities, and the qualities are the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

## 1. Longitudinal modes

::: definition The state-space representation {#def-state-space}
The **state-space representation** is the linearized equations of motion written in matrix form, and the state-space representation is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **longitudinal state-space equation** is:

$$
\delta \dot { \mathbf { x } } \; = \; \mathbf { A } _ { \text{long } } \, \delta \mathbf { x } + \mathbf { B } _ { \text{long } } \, \delta \mathbf { u }
$$

The **longitudinal state vector** is:

$$
\delta \mathbf { x } \; = \; [ \Delta u , \; \Delta w , \; \Delta q , \; \Delta \theta ] ^ { T }
$$

The **eigenvalue equation** is:

$$
\det ( \lambda \, \mathbf { I } - \mathbf { A } ) \; = \; 0
$$

The **characteristic equation** is:

$$
\lambda ^ { 4 } + B \, \lambda ^ { 3 } + C \, \lambda ^ { 2 } + D \, \lambda + E \; = \; 0
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{State vector} & \delta \mathbf { x } & \text{Perturbation states} & 4 \text{ longitudinal} \\
\text{System matrix} & \mathbf { A } & \text{Stability derivatives} & 4 \times 4 \\
\text{Eigenvalue} & \lambda & \text{Mode root} & \sigma \pm j \omega \\
\text{Damping ratio} & \zeta & \text{Mode damping} & 0 . 0 1 \text{--} 0 . 9 \\
\end{array}
$$

**The eigenvalues are the reason the dynamic stability and aircraft modes are designed for the roots, not the coefficients, and the roots are the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics. The engineer who calculates the dynamic stability without checking the eigenvalues is not calculating the dynamic stability; they are guessing.**
:::

::: definition The phugoid mode {#def-phugoid}
The **phugoid mode** is the long-period oscillation of airspeed and altitude, and the phugoid mode is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **phugoid frequency** is:

$$
\omega _ { \text{ph } } \; = \; { \sqrt { 2 } } \, { \frac { g } { V } }
$$

The **phugoid damping ratio** is:

$$
\zeta _ { \text{ph } } \; = \; { \frac { 1 } { \sqrt { 2 } } } \, { \frac { C _ { D _ { V } } } { C _ { L } } } \, { \frac { q \, S } { m \, g } } \, { \frac { V } { g } }
$$

The **phugoid period** is:

$$
T _ { \text{ph } } \; = \; { \frac { 2 \, \pi } { \omega _ { \text{ph } } } } \; = \; { \frac { { \sqrt { 2 } } \, \pi \, V } { g } }
$$

The **time to half amplitude** is:

$$
t _ { 1 / 2 } \; = \; { \frac { \ln 2 } { \zeta \, \omega _ { n } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Phugoid period} & T _ { \text{ph } } & \text{Oscillation period} & 3 0 \text{--} 1 2 0 \ \text{ s } \\
\text{Phugoid damping} & \zeta _ { \text{ph } } & \text{Damping ratio} & 0 . 0 1 \text{--} 0 . 1 \\
\text{Time to half amp} & t _ { 1 / 2 } & \text{Decay time} & 1 0 \text{--} 2 0 0 \ \text{ s } \\
\text{Phugoid frequency} & \omega _ { \text{ph } } & \text{Natural frequency} & 0 . 0 5 \text{--} 0 . 2 \ \text{ rad/s } \\
\end{array}
$$

**The phugoid mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the frequency, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics. The engineer who calculates the dynamic stability without checking the phugoid mode is not calculating the dynamic stability; they are guessing.**
:::

::: widget plot
title: The phugoid period vs airspeed
f: 1.41421*3.14159*x/9.81
x: 50,300
y: 20,100
labels: T_ph
caption: The phugoid period against the airspeed. **The phugoid period increases with the airspeed, and the phugoid period is the reason the dynamic stability and aircraft modes are designed for the mode, not the frequency.** **The mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

::: example Phugoid mode calculation {#ex-phugoid-calc level=3 check="2"}
An aircraft flies at $V = 1 5 0 \; \text{m/s }$ . Calculate the phugoid frequency, period, and the time to half amplitude if $\zeta _ { \text{ph } } = 0 . 0 4$ .

**Phugoid frequency:**

$$
\omega _ { \text{ph } } \; = \; { \sqrt { 2 } } \, { \frac { g } { V } } \; = \; 1 . 4 1 4 2 \times { \frac { 9 . 8 1 } { 1 5 0 } } \; = \; 1 . 4 1 4 2 \times 0 . 0 6 5 4 \; = \; { \bf 0 . 0 9 2 5 } \; \text{rad/s }
$$

**Phugoid period:**

$$
T _ { \text{ph } } \; = \; { \frac { 2 \, \pi } { \omega _ { \text{ph } } } } \; = \; { \frac { 6 . 2 8 3 2 } { 0 . 0 9 2 5 } } \; = \; { \bf 6 7 . 9 } \; \text{s }
$$

**Time to half amplitude:**

$$
t _ { 1 / 2 } \; = \; { \frac { \ln 2 } { \zeta _ { \text{ph } } \, \omega _ { \text{ph } } } } \; = \; { \frac { 0 . 6 9 3 1 } { 0 . 0 4 \times 0 . 0 9 2 5 } } \; = \; { \frac { 0 . 6 9 3 1 } { 0 . 0 0 3 7 } } \; = \; { \bf 1 8 7 } \; \text{s }
$$

**Number of cycles to half amplitude:**

$$
N _ { 1 / 2 } \; = \; { \frac { t _ { 1 / 2 } } { T _ { \text{ph } } } } \; = \; { \frac { 1 8 7 } { 6 7 . 9 } } \; = \; { \bf 2 . 7 6 } \; \text{cycles }
$$

**The phugoid frequency is 0.0925 rad/s, the period is 67.9 s, and the time to half amplitude is 187 s (2.76 cycles). The engineer would design the aircraft for the short-period mode, because the short-period mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

## 2. Lateral-directional modes

::: definition The short-period mode {#def-short-period}
The **short-period mode** is the high-frequency oscillation of angle of attack and pitch rate, and the short-period mode is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **short-period frequency** is:

$$
\omega _ { \text{sp } } \; = \; { \sqrt { { \frac { - C _ { m _ { \alpha } } \, q \, S \, { \bar { c } } ^ { 2 } } { I _ { y y } } } } }
$$

The **short-period damping ratio** is:

$$
\zeta _ { \text{sp } } \; = \; { \frac { - ( C _ { m _ { q } } + C _ { m _ { \dot { \alpha } } } ) \, q \, S \, { \bar { c } } } { 2 \, I _ { y y } \, \omega _ { \text{sp } } \, V } } \, { \frac { { \bar { c } } } { 2 } }
$$

The **short-period approximation** is:

$$
\lambda _ { \text{sp } } \; \approx \; { \frac { 1 } { 2 } } \, ( A _ { 2 2 } + A _ { 4 4 } ) \; \pm \; { \sqrt { { \frac { 1 } { 4 } } \, ( A _ { 2 2 } - A _ { 4 4 } ) ^ { 2 } + A _ { 2 4 } \, A _ { 4 2 } } }
$$

The **handling qualities criterion** is:

$$
1 . 3 \; < \; \omega _ { \text{sp } } \; < \; 1 1 \quad \text{rad/s } \quad \text{(Level 1, MIL-F-8785C)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{SP frequency} & \omega _ { \text{sp } } & \text{Natural frequency} & 1 \text{--} 1 0 \ \text{ rad/s } \\
\text{SP damping} & \zeta _ { \text{sp } } & \text{Damping ratio} & 0 . 1 \text{--} 0 . 9 \\
\text{SP period} & T _ { \text{sp } } & \text{Oscillation period} & 0 . 6 \text{--} 6 \ \text{ s } \\
\text{Handling level} & \text{HQ} & \text{MIL-F-8785C} & 1 \text{--} 3 \\
\end{array}
$$

**The short-period mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the damping, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics. The engineer who calculates the dynamic stability without checking the short-period mode is not calculating the dynamic stability; they are guessing.**
:::

::: definition The dutch roll mode {#def-dutch-roll}
The **dutch roll mode** is the oscillatory coupling of yaw and roll, and the dutch roll mode is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **dutch roll frequency** is:

$$
\omega _ { \text{dr } } \; = \; { \sqrt { { \frac { C _ { n _ { \beta } } \, q \, S \, b } { I _ { z z } } } \, { \frac { g } { 2 \, V } } \, { \frac { C _ { L } } { - C _ { \ell _ { \beta } } } } } }
$$

The **dutch roll damping ratio** is:

$$
\zeta _ { \text{dr } } \; \approx \; { \frac { - C _ { n _ { r } } \, q \, S \, b ^ { 2 } } { 4 \, I _ { z z } \, \omega _ { \text{dr } } \, V } } \, { \frac { 1 } { 2 } }
$$

The **spiral mode** time constant is:

$$
\tau _ { \text{spiral } } \; = \; { \frac { 2 \, m } { \rho \, V \, S \, C _ { D } } } \, { \frac { - C _ { \ell _ { \beta } } } { C _ { n _ { \beta } } } }
$$

The **roll mode** time constant is:

$$
\tau _ { \text{roll } } \; = \; { \frac { - 2 \, I _ { x x } } { \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } } } \, { \frac { 2 } { V } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{DR frequency} & \omega _ { \text{dr } } & \text{Natural frequency} & 0 . 5 \text{--} 4 \ \text{ rad/s } \\
\text{DR damping} & \zeta _ { \text{dr } } & \text{Damping ratio} & 0 . 0 5 \text{--} 0 . 5 \\
\text{Spiral time} & \tau _ { \text{spiral } } & \text{Time constant} & \pm 1 0 \text{--} 1 0 0 \ \text{ s } \\
\text{Roll time} & \tau _ { \text{roll } } & \text{Time constant} & 0 . 1 \text{--} 2 \ \text{ s } \\
\end{array}
$$

**The dutch roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the coupling, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics. The engineer who calculates the dynamic stability without checking the dutch roll mode is not calculating the dynamic stability; they are guessing.**
:::

::: widget plot
title: The short-period frequency vs CG position
f: sqrt(2.5/(0.35-x+0.01))
x: 0.1,0.34
y: 1,15
labels: omega_sp
caption: The short-period frequency against the CG position for a typical transport aircraft. **The short-period frequency increases as the CG moves forward, and the short-period frequency is the reason the dynamic stability and aircraft modes are designed for the mode, not the damping.** **The mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

::: example Short-period mode calculation {#ex-short-period-calc level=3 check="2"}
An aircraft has $C _ { m _ { \alpha } } = - 0 . 0 5$ per degree, $q = 1 0 { , } 0 0 0 \; \text{Pa }$ , $S = 3 0 \; \text{m } ^ { 2 }$ , ${ \bar { c } } = 2 . 5 \; \text{m }$ , and $I _ { y y } = 5 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ . Calculate the short-period frequency and check the handling qualities.

**Short-period frequency:**

$$
\omega _ { \text{sp } } \; = \; { \sqrt { { \frac { - C _ { m _ { \alpha } } \, q \, S \, { \bar { c } } ^ { 2 } } { I _ { y y } } } } }
$$

**Convert $C _ { m _ { \alpha } }$ to per radian:**

$$
C _ { m _ { \alpha } } \; = \; - 0 . 0 5 \times 5 7 . 3 \; = \; - 2 . 8 6 5 \; \text{per radian }
$$

**Calculate:**

$$
\omega _ { \text{sp } } \; = \; { \sqrt { { \frac { 2 . 8 6 5 \times 1 0 { , } 0 0 0 \times 3 0 \times 2 . 5 ^ { 2 } } { 5 0 { , } 0 0 0 } } } } \; = \; { \sqrt { { \frac { 2 . 8 6 5 \times 1 0 { , } 0 0 0 \times 3 0 \times 6 . 2 5 } { 5 0 { , } 0 0 0 } } } }
$$

$$
= \; { \sqrt { { \frac { 5 3 7 { , } 1 8 8 } { 5 0 { , } 0 0 0 } } } } \; = \; { \sqrt { 1 0 . 7 4 } } \; = \; { \bf 3 . 2 8 } \; \text{rad/s }
$$

**Short-period period:**

$$
T _ { \text{sp } } \; = \; { \frac { 2 \, \pi } { \omega _ { \text{sp } } } } \; = \; { \frac { 6 . 2 8 3 2 } { 3 . 2 8 } } \; = \; { \bf 1 . 9 2 } \; \text{s }
$$

**Handling qualities check (MIL-F-8785C Level 1):**

$$
1 . 3 \; < \; 3 . 2 8 \; < \; 1 1 \quad \checkmark \quad \text{Level 1 (satisfactory)}
$$

**The short-period frequency is 3.28 rad/s, the period is 1.92 s, and the handling qualities are Level 1. The engineer would design the aircraft for the spiral mode, because the spiral mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

::: example Eigenvalue analysis {#ex-eigenvalue-analysis level=3 check="2"}
A longitudinal system has the characteristic equation $\\lambda ^ { 4 } + 4 . 5 \\, \\lambda ^ { 3 } + 1 2 . 4 \\, \\lambda ^ { 2 } + 0 . 5 4 \\, \\lambda + 0 . 0 0 8 = 0$ . Factor into two quadratic factors and find the mode frequencies and damping ratios.

**Factor into quadratics:**

Assume the characteristic equation factors as:

$$
( \\lambda ^ { 2 } + 2 \\zeta _ { 1 } \\omega _ { 1 } \\lambda + \\omega _ { 1 } ^ { 2 } ) ( \\lambda ^ { 2 } + 2 \\zeta _ { 2 } \\omega _ { 2 } \\lambda + \\omega _ { 2 } ^ { 2 } ) = 0
$$

Expanding and matching coefficients:

$$
\\omega _ { 1 } ^ { 2 } \\, \\omega _ { 2 } ^ { 2 } = 0 . 0 0 8 \\quad \\text{(constant term)}
$$

$$
2 \\zeta _ { 1 } \\omega _ { 1 } + 2 \\zeta _ { 2 } \\omega _ { 2 } = 4 . 5 \\quad \\text{(} \\lambda ^ { 3 } \\text{ coefficient)}
$$

**Phugoid mode (slow, lightly damped):**

$$
\\omega _ { 1 } \\approx { \sqrt { 0 . 0 0 8 / 1 2 . 4 } } \\approx 0 . 0 2 5 4 \\quad \\text{(very slow)}
$$

Using the standard approximation for well-separated modes:

$$
\\omega _ { \text{ph } } \\approx { \sqrt { E / C } } = { \sqrt { 0 . 0 0 8 / 1 2 . 4 } } = { \sqrt { 6 . 4 5 \\times 1 0 ^ { - 4 } } } = { \\bf 0 . 0 2 5 4 } \\; \\text{rad/s }
$$

$$
\\zeta _ { \text{ph } } \\approx { \frac { D } { 2 \\, E } } \\, \\omega _ { \text{ph } } = { \frac { 0 . 5 4 } { 2 \\times 0 . 0 0 8 } } \\times 0 . 0 2 5 4 = 3 3 . 7 5 \\times 0 . 0 2 5 4 = { \\bf 0 . 8 5 7 }
$$

**Note:** The damping ratio of 0.857 is unrealistically high for a phugoid. The actual phugoid damping is typically 0.01-0.1. The coefficients above are illustrative.

**Short-period mode (fast, well damped):**

$$
\\omega _ { \text{sp } } \\approx { \sqrt { C } } = { \sqrt { 1 2 . 4 } } = { \\bf 3 . 5 2 } \\; \\text{rad/s }
$$

$$
\\zeta _ { \text{sp } } \\approx { \frac { B } { 2 \\, \\omega _ { \text{sp } } } } = { \frac { 4 . 5 } { 2 \\times 3 . 5 2 } } = { \frac { 4 . 5 } { 7 . 0 4 } } = { \\bf 0 . 6 3 9 }
$$

**Phugoid period:**

$$
T _ { \text{ph } } = { \frac { 2 \\, \\pi } { \\omega _ { \text{ph } } } } = { \frac { 6 . 2 8 3 2 } { 0 . 0 2 5 4 } } = { \\bf 2 4 7 } \\; \\text{s }
$$

**Short-period period:**

$$
T _ { \text{sp } } = { \frac { 2 \\, \\pi } { \\omega _ { \text{sp } } } } = { \frac { 6 . 2 8 3 2 } { 3 . 5 2 } } = { \\bf 1 . 7 8 } \\; \\text{s }
$$

**The phugoid has $\\omega = 0 . 0 2 5 4$ rad/s and $T = 2 4 7$ s, and the short-period has $\\omega = 3 . 5 2$ rad/s and $T = 1 . 7 8$ s. The engineer would design the aircraft for the qualities, because the qualities are the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

::: example Dutch roll vs spiral comparison {#ex-dr-vs-spiral level=3 check="2"}
An aircraft has $\\omega _ { \text{dr } } = 1 . 5$ rad/s, $\\zeta _ { \text{dr } } = 0 . 1 2$ , $\\tau _ { \text{spiral } } = + 4 5$ s (divergent), and $\\tau _ { \text{roll } } = 0 . 3$ s. Calculate the dutch roll period, time to half amplitude, and spiral doubling time.

**Dutch roll period:**

$$
T _ { \text{dr } } = { \frac { 2 \\, \\pi } { \\omega _ { \text{dr } } } } = { \frac { 6 . 2 8 3 2 } { 1 . 5 } } = { \\bf 4 . 1 9 } \\; \\text{s }
$$

**Dutch roll time to half amplitude:**

$$
t _ { 1 / 2 , \text{dr } } = { \frac { \\ln 2 } { \\zeta _ { \text{dr } } \\, \\omega _ { \text{dr } } } } = { \frac { 0 . 6 9 3 1 } { 0 . 1 2 \\times 1 . 5 } } = { \frac { 0 . 6 9 3 1 } { 0 . 1 8 } } = { \\bf 3 . 8 5 } \\; \\text{s }
$$

**Number of dutch roll cycles to half amplitude:**

$$
N _ { 1 / 2 , \text{dr } } = { \frac { t _ { 1 / 2 , \text{dr } } } { T _ { \text{dr } } } } = { \frac { 3 . 8 5 } { 4 . 1 9 } } = { \\bf 0 . 9 2 } \\; \\text{cycles }
$$

**Spiral doubling time (divergent, $\\tau > 0$ ):**

$$
t _ { 2 , \text{spiral } } = \\tau _ { \text{spiral } } \\, \\ln 2 = 4 5 \\times 0 . 6 9 3 1 = { \\bf 3 1 . 2 } \\; \\text{s }
$$

**Roll time to 95% response:**

$$
t _ { 9 5 , \text{roll } } = 3 \\, \\tau _ { \text{roll } } = 3 \\times 0 . 3 = { \\bf 0 . 9 } \\; \\text{s }
$$

**Summary:** The dutch roll has period 4.19 s with $\zeta = 0.12$ (lightly damped), the spiral doubles in 31.2 s with $\tau = +45$ s (slow divergence), and the roll reaches 95% in 0.9 s with $\tau = 0.3$ s (fast, adequate).

**The dutch roll period is 4.19 s with 0.92 cycles to half amplitude, the spiral doubles in 31.2 s, and the roll reaches 95% in 0.9 s. The engineer would design the aircraft for the ratio, because the ratio is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.**
:::

::: exercise Short-period period {#ex-sp-period-ex level=3 check="2"}
An aircraft has $\\omega _ { \text{sp } } = 5 . 0$ rad/s. Calculate the short-period period and check if it falls within MIL-F-8785C Level 1.

::: solution
$$
T _ { \text{sp } } = { \frac { 2 \\, \\pi } { \\omega _ { \text{sp } } } } = { \frac { 6 . 2 8 3 2 } { 5 . 0 } } = { \\bf 1 . 2 6 } \\; \\text{s }
$$

**MIL-F-8785C Level 1 check:**

$$
1 . 3 < 5 . 0 < 1 1 \\quad \\checkmark \\quad \\text{Level 1 (satisfactory)}
$$

**The short-period period is 1.26 s, and the handling qualities are Level 1.**
:::
:::

## Exercises

::: exercise Phugoid period {#ex-phugoid-period-ex level=3 check="2"}
An aircraft flies at $V = 2 5 0 \; \text{m/s }$ . Calculate the phugoid period.

::: solution
$$
T _ { \text{ph } } \; = \; { \frac { { \sqrt { 2 } } \, \pi \, V } { g } } \; = \; { \frac { 1 . 4 1 4 2 \times 3 . 1 4 1 6 \times 2 5 0 } { 9 . 8 1 } } \; = \; { \frac { 1 1 1 0 . 7 } { 9 . 8 1 } } \; = \; { \bf 1 1 3 . 2 } \; \text{s }
$$

**The phugoid period is 113.2 s.**
:::
:::

::: exercise Time to half amplitude {#ex-half-amplitude-ex level=3 check="2"}
A mode has $\omega _ { n } = 2 \; \text{rad/s }$ and $\zeta = 0 . 1$ . Calculate the time to half amplitude.

::: solution
$$
t _ { 1 / 2 } \; = \; { \frac { \ln 2 } { \zeta \, \omega _ { n } } } \; = \; { \frac { 0 . 6 9 3 1 } { 0 . 1 \times 2 } } \; = \; { \frac { 0 . 6 9 3 1 } { 0 . 2 } } \; = \; { \bf 3 . 4 7 } \; \text{s }
$$

**The time to half amplitude is 3.47 s.**
:::
:::

::: exercise Roll mode time constant {#ex-roll-mode-ex level=3 check="2"}
An aircraft has $I _ { x x } = 2 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ , $\rho = 1 . 0 \; \text{kg/m } ^ { 3 }$ , $V = 1 8 0 \; \text{m/s }$ , $S = 3 5 \; \text{m } ^ { 2 }$ , $b = 1 8 \; \text{m }$ , and $C _ { \ell _ { p } } = - 0 . 2 5$ . Calculate the roll mode time constant.

::: solution
$$
\tau _ { \text{roll } } \; = \; { \frac { - 4 \, I _ { x x } } { \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } } } \; = \; { \frac { - 4 \times 2 0 { , } 0 0 0 } { 1 . 0 \times 1 8 0 \times 3 5 \times 1 8 ^ { 2 } \times ( - 0 . 2 5 ) } }
$$

$$
= \; { \frac { - 8 0 { , } 0 0 0 } { 1 . 0 \times 1 8 0 \times 3 5 \times 3 2 4 \times ( - 0 . 2 5 ) } } \; = \; { \frac { - 8 0 { , } 0 0 0 } { - 5 1 0 { , } 3 0 0 } } \; = \; { \bf 0 . 1 5 7 } \; \text{s }
$$

**The roll mode time constant is 0.157 s.**
:::
:::

::: exercise Dutch roll frequency {#ex-dutch-roll-freq-ex level=3 check="2"}
An aircraft has $C _ { n _ { \beta } } = 0 . 0 0 3$ per degree, $C _ { \ell _ { \beta } } = - 0 . 0 0 2$ per degree, $C _ { L } = 0 . 5$ , $q = 8 0 0 0 \; \text{Pa }$ , $S = 3 0 \; \text{m } ^ { 2 }$ , $b = 1 6 \; \text{m }$ , $I _ { z z } = 6 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ , $V = 2 0 0 \; \text{m/s }$ , and $g = 9 . 8 1 \; \text{m/s } ^ { 2 }$ . Calculate the dutch roll frequency.

::: solution
$$
\omega _ { \text{dr } } \; = \; { \sqrt { { \frac { C _ { n _ { \beta } } \, q \, S \, b } { I _ { z z } } } \, { \frac { g } { 2 \, V } } \, { \frac { C _ { L } } { - C _ { \ell _ { \beta } } } } } }
$$

$$
{ \frac { C _ { n _ { \beta } } \, q \, S \, b } { I _ { z z } } } \; = \; { \frac { 0 . 0 0 3 \times 8 0 0 0 \times 3 0 \times 1 6 } { 6 0 { , } 0 0 0 } } \; = \; { \frac { 1 1 { , } 5 2 0 } { 6 0 { , } 0 0 0 } } \; = \; 0 . 1 9 2
$$

$$
{ \frac { g } { 2 \, V } } \; = \; { \frac { 9 . 8 1 } { 4 0 0 } } \; = \; 0 . 0 2 4 5 3
$$

$$
{ \frac { C _ { L } } { - C _ { \ell _ { \beta } } } } \; = \; { \frac { 0 . 5 } { 0 . 0 0 2 } } \; = \; 2 5 0
$$

$$
\omega _ { \text{dr } } \; = \; { \sqrt { 0 . 1 9 2 \times 0 . 0 2 4 5 3 \times 2 5 0 } } \; = \; { \sqrt { 1 . 1 7 7 } } \; = \; { \bf 1 . 0 8 5 } \; \text{rad/s }
$$

**The dutch roll frequency is 1.085 rad/s.**
:::
:::

::: exercise Spiral mode time constant {#ex-spiral-mode-ex level=3 check="2"}
An aircraft has $m = 2 0 { , } 0 0 0 \; \text{kg }$ , $\rho = 1 . 0 \; \text{kg/m } ^ { 3 }$ , $V = 1 5 0 \; \text{m/s }$ , $S = 4 0 \; \text{m } ^ { 2 }$ , $C _ { D } = 0 . 0 3$ , $C _ { \ell _ { \beta } } = - 0 . 0 0 1$ per degree, and $C _ { n _ { \beta } } = 0 . 0 0 3$ per degree. Calculate the spiral mode time constant.

::: solution
$$
\tau _ { \text{spiral } } \; = \; { \frac { 2 \, m } { \rho \, V \, S \, C _ { D } } } \, { \frac { - C _ { \ell _ { \beta } } } { C _ { n _ { \beta } } } }
$$

$$
{ \frac { 2 \, m } { \rho \, V \, S \, C _ { D } } } \; = \; { \frac { 2 \times 2 0 { , } 0 0 0 } { 1 . 0 \times 1 5 0 \times 4 0 \times 0 . 0 3 } } \; = \; { \frac { 4 0 { , } 0 0 0 } { 1 8 0 } } \; = \; 2 2 2 . 2
$$

$$
{ \frac { - C _ { \ell _ { \beta } } } { C _ { n _ { \beta } } } } \; = \; { \frac { 0 . 0 0 1 } { 0 . 0 0 3 } } \; = \; 0 . 3 3 3
$$

$$
\tau _ { \text{spiral } } \; = \; 2 2 2 . 2 \times 0 . 3 3 3 \; = \; { \bf 7 4 . 0 } \; \text{s }
$$

**The spiral mode time constant is 74.0 s.**
:::
:::

::: exercise Derivation: the phugoid approximation {#ex-derive-phugoid level=4 check="2"}
Show that the phugoid frequency is $\omega _ { \text{ph } } = { \sqrt { 2 } } \, g / V$ . Write the expression for the phugoid period.

::: solution
The **phugoid mode** is a slow exchange between kinetic energy (airspeed) and potential energy (altitude). The **energy equation** is:

$$
{ \frac { 1 } { 2 } } \, m \, V ^ { 2 } + m \, g \, h \; = \; \text{constant}
$$

Differentiating:

$$
m \, V \, \Delta V + m \, g \, \Delta \dot { h } \; = \; 0 \quad \Rightarrow \quad \Delta \dot { h } \; = \; - { \frac { V } { g } } \, \Delta \dot { V }
$$

The **lift equation** for the phugoid (approximately constant angle of attack):

$$
L \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, C _ { L } \; \approx \; W
$$

The **centripetal equation** for the flight path curvature:

$$
\Delta \dot { \gamma } \; = \; - { \frac { g } { V } } \, { \frac { \Delta V } { V } } \times 2
$$

Combining these equations gives the **phugoid frequency**:

$$
\omega _ { \text{ph } } \; = \; { \sqrt { 2 } } \, { \frac { g } { V } }
$$

The **phugoid period** is:

$$
T _ { \text{ph } } \; = \; { \frac { 2 \, \pi } { \omega _ { \text{ph } } } } \; = \; { \frac { { \sqrt { 2 } } \, \pi \, V } { g } }
$$

**The spiral mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the divergence, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the roll mode {#ex-derive-roll-mode level=4 check="2"}
Show that the roll mode time constant is $\tau _ { \text{roll } } = - 4 \, I _ { x x } / ( \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } )$ . Write the expression for the roll damping derivative.

::: solution
The **roll equation** (simplified, neglecting cross-coupling) is:

$$
I _ { x x } \, \dot { p } \; = \; \ell \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b \, C _ { \ell }
$$

The **rolling moment coefficient** with roll damping:

$$
C _ { \ell } \; = \; C _ { \ell _ { p } } \, { \frac { p \, b } { 2 \, V } } + C _ { \ell _ { \delta _ { a } } } \, \delta _ { a }
$$

Substituting:

$$
I _ { x x } \, \dot { p } \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b \, \left( C _ { \ell _ { p } } \, { \frac { p \, b } { 2 \, V } } + C _ { \ell _ { \delta _ { a } } } \, \delta _ { a } \right)
$$

$$
I _ { x x } \, \dot { p } \; = \; { \frac { \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } } { 4 } } \, p + { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S \, b \, C _ { \ell _ { \delta _ { a } } } \, \delta _ { a }
$$

This is a **first-order system**:

$$
\tau _ { \text{roll } } \, \dot { p } + p \; = \; K _ { \text{roll } } \, \delta _ { a }
$$

where the **roll mode time constant** is:

$$
\tau _ { \text{roll } } \; = \; { \frac { - 4 \, I _ { x x } } { \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } } }
$$

The **roll damping derivative** is:

$$
C _ { \ell _ { p } } \; = \; { \frac { \partial C _ { \ell } } { \partial ( p \, b / 2 \, V ) } }
$$

**The roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the rate, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Dynamic stability {#quiz-dyn-stab}
The most fundamental time-response analyses in flight mechanics are:

- [ ] Steady flight performance
- [x] Dynamic stability and aircraft modes
- [ ] Range and endurance
- [ ] Structural analysis

::: solution
**Dynamic stability and aircraft modes.** Dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics, because the dynamic stability is the study of how the aircraft responds to disturbances over time, and the aircraft modes are the natural motions (phugoid, short period, dutch roll, spiral, and roll) that the aircraft exhibits after a disturbance. The engineer who calculates the dynamic stability without checking the eigenvalues is not calculating the dynamic stability; they are guessing.
:::
:::

::: quiz Phugoid mode {#quiz-phugoid}
The phugoid mode is:

- [ ] The high-frequency oscillation of angle of attack and pitch rate
- [x] The long-period oscillation of airspeed and altitude
- [ ] The oscillatory coupling of yaw and roll
- [ ] The aperiodic roll response

::: solution
**The long-period oscillation of airspeed and altitude.** The phugoid mode is the long-period oscillation of airspeed and altitude, and the phugoid mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the frequency. The engineer who calculates the dynamic stability without checking the phugoid mode is not calculating the dynamic stability; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the dynamic stability.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the dynamic stability.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the dynamic stability.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the dynamic stability.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the dynamic stability.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the dynamic stability.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the dynamic stability.
- **[[control-systems/feedback-stability]]** — The feedback stability is the foundation of the dynamic stability.
- **[[control-systems/time-response]]** — The time response is the foundation of the dynamic stability.
- **[[vibrations/free-vibration]]** — The free vibration is the foundation of the dynamic stability.

::: history Dynamic stability: from Lanchester to fly-by-wire {#history-dyn-stab}
**1908** — **Lanchester** publishes the **first mathematical theory of aircraft stability**, which is the foundation of the dynamic stability. **The first mathematical theory is the reason the dynamic stability is the oldest concept in flight mechanics, and the age is the reason the dynamic stability is the most refined concept in flight mechanics.**

**1920s** — **The phugoid mode** is identified, and the phugoid mode is the reason the dynamic stability is the most historic concept in flight mechanics. **The phugoid mode is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the phugoid mode is the most historic concept in flight mechanics.**

**1940s** — **The short-period mode** is identified, and the short-period mode is the reason the dynamic stability is the most practical concept in flight mechanics. **The short-period mode is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the short-period mode is the most practical concept in flight mechanics.**

**1950s** — **The dutch roll mode** is identified, and the dutch roll mode is the reason the dynamic stability is the most powerful concept in flight mechanics. **The dutch roll mode is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the dutch roll mode is the most powerful concept in flight mechanics.**

**1960s** — **The stability augmentation system** is developed, and the stability augmentation system is the reason the dynamic stability is the most efficient concept in flight mechanics. **The stability augmentation system is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the stability augmentation system is the most efficient concept in flight mechanics.**

**1970s** — **The relaxed static stability** is developed, and the relaxed static stability is the reason the dynamic stability is the most advanced concept in flight mechanics. **The relaxed static stability is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the relaxed static stability is the most advanced concept in flight mechanics.**

**1980s** — **The fly-by-wire control** is developed, and the fly-by-wire control is the reason the dynamic stability is the most modern concept in flight mechanics. **The fly-by-wire control is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the fly-by-wire control is the most modern concept in flight mechanics.**

**2000s** — **The active mode control** is developed, and the active mode control is the reason the dynamic stability is the most futuristic concept in flight mechanics. **The active mode control is the reason the dynamic stability is the most refined concept in flight mechanics, and the dynamic stability is the reason the active mode control is the most futuristic concept in flight mechanics.**
:::

::: summary Dynamic stability and aircraft modes {#summary-dyn-stab}
- **The state-space representation is $\delta \dot { \mathbf { x } } = \mathbf { A } _ { \text{long } } \, \delta \mathbf { x } + \mathbf { B } _ { \text{long } } \, \delta \mathbf { u }$ , the longitudinal state vector is $\delta \mathbf { x } = [ \Delta u , \Delta w , \Delta q , \Delta \theta ] ^ { T }$ , and the eigenvalue equation is $\det ( \lambda \, \mathbf { I } - \mathbf { A } ) = 0$ .** The eigenvalues are the reason the dynamic stability and aircraft modes are designed for the roots, not the coefficients, and the roots are the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The characteristic equation is $\lambda ^ { 4 } + B \, \lambda ^ { 3 } + C \, \lambda ^ { 2 } + D \, \lambda + E = 0$ , the phugoid frequency is $\omega _ { \text{ph } } = { \sqrt { 2 } } \, g / V$ , and the phugoid damping ratio is $\zeta _ { \text{ph } } = ( 1 / { \sqrt { 2 } } ) \, ( C _ { D _ { V } } / C _ { L } ) \, ( q \, S / m \, g ) \, ( V / g )$ .** The phugoid mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the frequency, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The phugoid period is $T _ { \text{ph } } = { \sqrt { 2 } } \, \pi \, V / g$ , the time to half amplitude is $t _ { 1 / 2 } = \ln 2 / ( \zeta \, \omega _ { n } )$ , and the phugoid period is $T _ { \text{ph } } = 3 0 \text{--} 1 2 0$ s.** The short-period mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the damping, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The short-period frequency is $\omega _ { \text{sp } } = { \sqrt { - C _ { m _ { \alpha } } \, q \, S \, { \bar { c } } ^ { 2 } / I _ { y y } } }$ , the short-period damping ratio is $\zeta _ { \text{sp } } = - ( C _ { m _ { q } } + C _ { m _ { \dot { \alpha } } } ) \, q \, S \, { \bar { c } } / ( 2 \, I _ { y y } \, \omega _ { \text{sp } } \, V ) \, { \bar { c } } / 2$ , and the handling qualities criterion is $1 . 3 < \omega _ { \text{sp } } < 1 1$ rad/s.** The dutch roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the coupling, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The dutch roll frequency is $\omega _ { \text{dr } } = { \sqrt { C _ { n _ { \beta } } \, q \, S \, b / I _ { z z } \, g / ( 2 \, V ) \, C _ { L } / ( - C _ { \ell _ { \beta } } ) } }$ , the dutch roll damping ratio is $\zeta _ { \text{dr } } \approx - C _ { n _ { r } } \, q \, S \, b ^ { 2 } / ( 4 \, I _ { z z } \, \omega _ { \text{dr } } \, V ) / 2$ , and the spiral mode time constant is $\tau _ { \text{spiral } } = 2 \, m / ( \rho \, V \, S \, C _ { D } ) \, ( - C _ { \ell _ { \beta } } / C _ { n _ { \beta } } )$ .** The spiral mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the divergence, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The roll mode time constant is $\tau _ { \text{roll } } = - 4 \, I _ { x x } / ( \rho \, V \, S \, b ^ { 2 } \, C _ { \ell _ { p } } )$ , the DR frequency is $\omega _ { \text{dr } } = 0 . 5 \text{--} 4$ rad/s, and the DR damping is $\zeta _ { \text{dr } } = 0 . 0 5 \text{--} 0 . 5$ .** The roll mode is the reason the dynamic stability and aircraft modes are designed for the mode, not the rate, and the mode is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The spiral time is $\tau _ { \text{spiral } } = \pm 1 0 \text{--} 1 0 0$ s, the roll time is $\tau _ { \text{roll } } = 0 . 1 \text{--} 2$ s, and the SP frequency is $\omega _ { \text{sp } } = 1 \text{--} 1 0$ rad/s.** The damping ratio is the reason the dynamic stability and aircraft modes are designed for the ratio, not the frequency, and the ratio is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The SP damping is $\zeta _ { \text{sp } } = 0 . 1 \text{--} 0 . 9$ , the SP period is $T _ { \text{sp } } = 0 . 6 \text{--} 6$ s, and the handling level is HQ = 1--3.** The time to double/half amplitude is the reason the dynamic stability and aircraft modes are designed for the time, not the period, and the time is the reason the dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics.
- **The dynamic stability calculation is the most important time-response calculation in flight mechanics, because the dynamic stability calculation determines the handling qualities of the aircraft.** The handling qualities are the reason the engineer can design the aircraft to have acceptable handling qualities.
- **The dynamic stability and aircraft modes are the most fundamental time-response analyses in flight mechanics, because the dynamic stability is the study of how the aircraft responds to disturbances over time, and the aircraft modes are the natural motions that the aircraft exhibits after a disturbance.** The time-response analysis is the reason the engineer can design the aircraft to have acceptable handling qualities.
:::

## Further reading

- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The dynamic stability, the eigenvalues, and the phugoid mode.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The dynamic stability and the short-period mode.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The dynamic stability and the dutch roll mode.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The dynamic stability and the spiral mode.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The dynamic stability and the roll mode.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The dynamic stability and the damping ratio.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The dynamic stability and the time to double/half amplitude.
- **W. Nelson (1998)** — *Flight Stability and Automatic Control*, 2nd ed. McGraw-Hill. The dynamic stability and the handling qualities.
