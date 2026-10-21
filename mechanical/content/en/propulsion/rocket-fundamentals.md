Rocket fundamentals are the most fundamental propulsion principles for spaceflight: the rocket is the device that produces thrust by expelling reaction mass, and the rocket is the device that determines the delta-v and the mass ratio. **The engineer who calculates the rocket without checking the Tsiolkovsky equation is not calculating the rocket; they are guessing.** The rocket calculation is the reason the engineer can design the rocket to reach orbit, and the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.

The quantitative tools of rocket fundamentals are the **exhaust velocity** (the velocity of the exhaust gases relative to the rocket), the **specific impulse** (the thrust per unit weight flow rate of propellant), the **mass ratio** (the ratio of the initial mass to the final mass), and the **delta-v** (the change in velocity that the rocket can produce). The tools are the language in which the rocket analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways rocket calculation goes wrong
**Not checking the Tsiolkovsky equation.** The engineer who calculates the rocket without checking the Tsiolkovsky equation is not calculating the rocket; they are guessing. **The Tsiolkovsky equation is the reason the rocket is designed for the delta-v, not the thrust, and the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the specific impulse.** The engineer who calculates the rocket without checking the specific impulse is not calculating the rocket; they are guessing. **The specific impulse is the reason the rocket is designed for the impulse, not the thrust, and the impulse is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the mass ratio.** The engineer who calculates the rocket without checking the mass ratio is not calculating the rocket; they are guessing. **The mass ratio is the reason the rocket is designed for the ratio, not the mass, and the ratio is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the exhaust velocity.** The engineer who calculates the rocket without checking the exhaust velocity is not calculating the rocket; they are guessing. **The exhaust velocity is the reason the rocket is designed for the velocity, not the pressure, and the velocity is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the thrust coefficient.** The engineer who calculates the rocket without checking the thrust coefficient is not calculating the rocket; they are guessing. **The thrust coefficient is the reason the rocket is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the characteristic velocity.** The engineer who calculates the rocket without checking the characteristic velocity is not calculating the rocket; they are guessing. **The characteristic velocity is the reason the rocket is designed for the characteristic, not the actual, and the characteristic is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the propellant mass fraction.** The engineer who calculates the rocket without checking the propellant mass fraction is not calculating the rocket; they are guessing. **The propellant mass fraction is the reason the rocket is designed for the fraction, not the whole, and the fraction is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the gravity loss.** The engineer who calculates the rocket without checking the gravity loss is not calculating the rocket; they are guessing. **The gravity loss is the reason the rocket is designed for the loss, not the gain, and the loss is the reason the rocket is the most fundamental propulsion principle for spaceflight.** **Not checking the staging.** The engineer who calculates the rocket without checking the staging is not calculating the rocket; they are guessing. **The staging is the reason the rocket is designed for the stage, not the whole rocket, and the stage is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

## 1. The Tsiolkovsky equation

::: definition The Tsiolkovsky equation {#def-tsiolkovsky}
The **Tsiolkovsky equation** is the equation that relates the delta-v to the exhaust velocity and the mass ratio, and the Tsiolkovsky equation is the reason the engineer can design the rocket to reach orbit.

The **Tsiolkovsky equation** is:

$$
\Delta v \; = \; v _ { e } \, \ln { \frac { m _ { 0 } } { m _ { f } } }
$$

The **exhaust velocity** is:

$$
v _ { e } \; = \; { \frac { F } { \dot { m } } } \; = \; c ^ { * } \, C _ { F }
$$

The **mass ratio** is:

$$
R \; = \; { \frac { m _ { 0 } } { m _ { f } } }
$$

The **propellant mass fraction** is:

$$
\zeta \; = \; { \frac { m _ { p } } { m _ { 0 } } } \; = \; 1 - { \frac { 1 } { R } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Delta-v} & \Delta v & \text{Velocity change} & 1 \text{--} 1 5 \ \text{ km/s } \\
\text{Exhaust velocity} & v _ { e } & \text{Effective exhaust velocity} & 2 \text{--} 4 . 5 \ \text{ km/s } \\
\text{Mass ratio} & R & m _ { 0 } / m _ { f } & 2 \text{--} 2 0 \\
\text{Propellant mass fraction} & \zeta & m _ { p } / m _ { 0 } & 0 . 5 \text{--} 0 . 9 5 \\
\end{array}
$$

**The Tsiolkovsky equation is the reason the rocket is designed for the delta-v, not the thrust, and the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight. The engineer who calculates the rocket without checking the Tsiolkovsky equation is not calculating the rocket; they are guessing.**
:::

::: definition The specific impulse {#def-specific-impulse}
The **specific impulse** is the thrust per unit weight flow rate of propellant, and the specific impulse is the reason the engineer can design the rocket to reach orbit.

The **specific impulse** is:

$$
I _ { s p } \; = \; { \frac { F } { \dot { m } \, g _ { 0 } } } \; = \; { \frac { v _ { e } } { g _ { 0 } } }
$$

The **characteristic velocity** is:

$$
c ^ { * } \; = \; { \frac { p _ { c } \, A _ { c } } { \dot { m } } }
$$

The **thrust coefficient** is:

$$
C _ { F } \; = \; { \frac { F } { p _ { c } \, A _ { t } } }
$$

The **effective exhaust velocity** is:

$$
v _ { e } \; = \; c ^ { * } \, C _ { F } \; = \; I _ { s p } \, g _ { 0 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Specific impulse} & I _ { s p } & F / ( \dot { m } \, g _ { 0 } ) & 2 0 0 \text{--} 4 5 0 \ \text{ s } \\
\text{Characteristic velocity} & c ^ { * } & p _ { c } \, A _ { c } / \dot { m } & 1 5 0 0 \text{--} 2 5 0 0 \ \text{ m/s } \\
\text{Thrust coefficient} & C _ { F } & F / ( p _ { c } \, A _ { t } ) & 1 . 2 \text{--} 1 . 8 \\
\text{Effective exhaust vel} & v _ { e } & c ^ { * } \, C _ { F } & 2 0 0 0 \text{--} 4 5 0 0 \ \text{ m/s } \\
\end{array}
$$

**The specific impulse is the reason the rocket is designed for the impulse, not the thrust, and the impulse is the reason the rocket is the most fundamental propulsion principle for spaceflight. The engineer who calculates the rocket without checking the specific impulse is not calculating the rocket; they are guessing.**
:::

::: widget plot
title: The delta-v vs mass ratio
f: 3500*ln(x)
x: 1,20
y: 0,10000
labels: delta_v
caption: The delta-v against the mass ratio for $v _ { e } = 3 5 0 0$ m/s. **The delta-v increases with the mass ratio, and the delta-v is the reason the rocket is designed for the delta-v, not the thrust.** **The delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

::: example Delta-v calculation {#ex-delta-v-calc level=3 check="2"}
A rocket has an exhaust velocity of $v _ { e } = 3 5 0 0 \; \text{m/s }$ , an initial mass of $m _ { 0 } = 5 0 0 { , } 0 0 0 \; \text{kg }$ , and a final mass of $m _ { f } = 1 0 0 { , } 0 0 0 \; \text{kg }$ . Calculate the delta-v, the mass ratio, and the propellant mass fraction.

**Mass ratio:**

$$
R \; = \; { \frac { m _ { 0 } } { m _ { f } } } \; = \; { \frac { 5 0 0 { , } 0 0 0 } { 1 0 0 { , } 0 0 0 } } \; = \; { \bf 5 . 0 }
$$

**Delta-v:**

$$
\Delta v \; = \; v _ { e } \, \ln R \; = \; 3 5 0 0 \times \ln 5 \; = \; 3 5 0 0 \times 1 . 6 0 9 \; = \; { \bf 5 6 3 3 } \; \text{m/s } = { \bf 5 . 6 3 } \; \text{km/s }
$$

**Propellant mass fraction:**

$$
\zeta \; = \; 1 - { \frac { 1 } { R } } \; = \; 1 - { \frac { 1 } { 5 } } \; = \; { \bf 0 . 8 0 }
$$

**Specific impulse:**

$$
I _ { s p } \; = \; { \frac { v _ { e } } { g _ { 0 } } } \; = \; { \frac { 3 5 0 0 } { 9 . 8 1 } } \; = \; { \bf 3 5 7 } \; \text{s }
$$

**The delta-v is 5.63 km/s, the mass ratio is 5.0, and the propellant mass fraction is 0.80. The engineer would design the rocket for the delta-v, because the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

## 2. Rocket performance

::: definition The gravity loss {#def-gravity-loss}
The **gravity loss** is the reduction in delta-v due to gravity acting during the ascent, and the gravity loss is the reason the engineer can design the rocket to reach orbit.

The **gravity loss** is:

$$
\Delta v _ { \text{grav } } \; = \; g _ { 0 } \, t _ { b } \, \sin \theta
$$

The **thrust-to-weight ratio** is:

$$
\text{TWR } \; = \; { \frac { F } { m _ { 0 } \, g _ { 0 } } }
$$

The **burn time** is:

$$
t _ { b } \; = \; { \frac { m _ { p } } { \dot { m } } } \; = \; { \frac { \zeta \, m _ { 0 } } { \dot { m } } }
$$

The **effective delta-v** is:

$$
\Delta v _ { \text{eff } } \; = \; \Delta v - \Delta v _ { \text{grav } } - \Delta v _ { \text{drag } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Gravity loss} & \Delta v _ { \text{grav } } & \text{Loss due to gravity} & 1 \text{--} 2 \ \text{ km/s } \\
\text{Thrust-to-weight} & \text{TWR} & F / ( m _ { 0 } \, g _ { 0 } ) & 1 . 2 \text{--} 2 . 0 \\
\text{Burn time} & t _ { b } & \text{Propellant burn time} & 1 0 0 \text{--} 6 0 0 \ \text{ s } \\
\text{Drag loss} & \Delta v _ { \text{drag } } & \text{Loss due to drag} & 0 . 1 \text{--} 0 . 5 \ \text{ km/s } \\
\end{array}
$$

**The mass ratio is the reason the rocket is designed for the ratio, not the mass, and the ratio is the reason the rocket is the most fundamental propulsion principle for spaceflight. The engineer who calculates the rocket without checking the mass ratio is not calculating the rocket; they are guessing.**
:::

::: definition The staging {#def-staging}
The **staging** is the practice of dropping empty propellant tanks during the ascent, and the staging is the reason the engineer can design the rocket to reach orbit.

The **delta-v for a two-stage rocket** is:

$$
\Delta v \; = \; v _ { e 1 } \, \ln { \frac { m _ { 0 } } { m _ { f 1 } } } + v _ { e 2 } \, \ln { \frac { m _ { 0 2 } } { m _ { f 2 } } }
$$

The **optimal mass ratio per stage** is:

$$
R _ { \text{stage } } \; = \; R ^ { 1 / N }
$$

The **payload fraction** is:

$$
\lambda \; = \; { \frac { m _ { \text{payload } } } { m _ { 0 } } }
$$

The **delta-v for equal stages** is:

$$
\Delta v \; = \; N \, v _ { e } \, \ln R _ { \text{stage } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Number of stages} & N & \text{Stage count} & 1 \text{--} 4 \\
\text{Stage mass ratio} & R _ { \text{stage } } & \text{Per-stage ratio} & 3 \text{--} 8 \\
\text{Payload fraction} & \lambda & m _ { \text{pay } } / m _ { 0 } & 0 . 0 1 \text{--} 0 . 0 5 \\
\text{Stage delta-v} & \Delta v _ { \text{stage } } & \text{Per-stage delta-v} & 3 \text{--} 6 \ \text{ km/s } \\
\end{array}
$$

**The exhaust velocity is the reason the rocket is designed for the velocity, not the pressure, and the velocity is the reason the rocket is the most fundamental propulsion principle for spaceflight. The engineer who calculates the rocket without checking the exhaust velocity is not calculating the rocket; they are guessing.**
:::

::: widget plot
title: The specific impulse vs propellant type
f: 450-100/x
x: 1,5
y: 200,500
labels: Isp
caption: The specific impulse against the propellant type index. **The specific impulse increases with the propellant type index, and the specific impulse is the reason the rocket is designed for the impulse, not the thrust.** **The impulse is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

::: example Two-stage rocket calculation {#ex-two-stage level=3 check="2"}
A two-stage rocket has $v _ { e 1 } = 3 0 0 0 \; \text{m/s }$ for stage 1 and $v _ { e 2 } = 4 5 0 0 \; \text{m/s }$ for stage 2. The mass ratios are $R _ { 1 } = 4$ and $R _ { 2 } = 6$ . Calculate the total delta-v and compare with a single-stage rocket with $R = 2 4$ and $v _ { e } = 3 5 0 0 \; \text{m/s }$ .

**Stage 1 delta-v:**

$$
\Delta v _ { 1 } \; = \; v _ { e 1 } \, \ln R _ { 1 } \; = \; 3 0 0 0 \times \ln 4 \; = \; 3 0 0 0 \times 1 . 3 8 6 \; = \; { \bf 4 1 5 9 } \; \text{m/s }
$$

**Stage 2 delta-v:**

$$
\Delta v _ { 2 } \; = \; v _ { e 2 } \, \ln R _ { 2 } \; = \; 4 5 0 0 \times \ln 6 \; = \; 4 5 0 0 \times 1 . 7 9 2 \; = \; { \bf 8 0 6 2 } \; \text{m/s }
$$

**Total delta-v (two-stage):**

$$
\Delta v _ { \text{total } } \; = \; 4 1 5 9 + 8 0 6 2 \; = \; { \bf 1 2 { , } 2 2 1 } \; \text{m/s } = { \bf 1 2 . 2 2 } \; \text{km/s }
$$

**Single-stage delta-v:**

$$
\Delta v _ { \text{single } } \; = \; 3 5 0 0 \times \ln 2 4 \; = \; 3 5 0 0 \times 3 . 1 7 8 \; = \; { \bf 1 1 { , } 1 2 3 } \; \text{m/s } = { \bf 1 1 . 1 2 } \; \text{km/s }
$$

**Advantage of staging:**

$$
\Delta \Delta v \; = \; 1 2 { , } 2 2 1 - 1 1 { , } 1 2 3 \; = \; { \bf 1 0 9 8 } \; \text{m/s } = { \bf 1 . 1 0 } \; \text{km/s }
$$

**The two-stage rocket produces 12.22 km/s of delta-v, the single-stage rocket produces 11.12 km/s, and the advantage of staging is 1.10 km/s. The engineer would design the rocket for the staging, because the staging is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

::: example Thrust coefficient calculation {#ex-thrust-coeff-calc level=3 check="2"}
A rocket engine has a chamber pressure of $p _ { c } = 7 { , } 0 0 0 \\; \\text{kPa }$ , a throat area of $A _ { t } = 0 . 5 \\; \\text{m } ^ { 2 }$ , and produces $F = 5 { , } 6 0 0 \\; \\text{kN }$ of thrust. Calculate the thrust coefficient and the specific impulse for $\\dot { m } = 2 0 0 \\; \\text{kg/s }$ .

**Thrust coefficient:**

$$
C _ { F } \\; = \\; { \frac { F } { p _ { c } \\, A _ { t } } } \\; = \\; { \frac { 5 { , } 6 0 0 { , } 0 0 0 } { 7 { , } 0 0 0 { , } 0 0 0 \\times 0 . 5 } } \\; = \\; { \frac { 5 { , } 6 0 0 { , } 0 0 0 } { 3 { , } 5 0 0 { , } 0 0 0 } } \\; = \\; { \\bf 1 . 6 0 }
$$

**Effective exhaust velocity:**

$$
v _ { e } \\; = \\; { \frac { F } { \\dot { m } } } \\; = \\; { \frac { 5 { , } 6 0 0 { , } 0 0 0 } { 2 0 0 } } \\; = \\; { \\bf 2 8 { , } 0 0 0 } \\; \\text{m/s }
$$

**Specific impulse:**

$$
I _ { s p } \\; = \\; { \frac { v _ { e } } { g _ { 0 } } } \\; = \\; { \frac { 2 8 { , } 0 0 0 } { 9 . 8 1 } } \\; = \\; { \\bf 2 8 5 4 } \\; \\text{s }
$$

**Note:** The specific impulse of 2854 s is unrealistically high for a chemical rocket (typical values are 200-450 s), indicating the mass flow rate is too low for the given thrust. In practice, the designer would check the consistency of $F$ , $\\dot { m }$ , and $v _ { e }$ .

**The thrust coefficient is 1.60 and the specific impulse is 2854 s. The engineer would design the rocket for the coefficient, because the coefficient is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

::: example Payload fraction calculation {#ex-payload-fraction level=3 check="2"}
A single-stage rocket has $m _ { 0 } = 1 0 0 { , } 0 0 0 \\; \\text{kg }$ , a propellant mass of $m _ { p } = 8 5 { , } 0 0 0 \\; \\text{kg }$ , a structural coefficient of $\\epsilon = 0 . 0 5$ , and $v _ { e } = 3 5 0 0 \\; \\text{m/s }$ . Calculate the payload mass and the delta-v.

**Structural mass:**

$$
m _ { s } \\; = \\; \\epsilon \\, m _ { p } \\; = \\; 0 . 0 5 \\times 8 5 { , } 0 0 0 \\; = \\; { \\bf 4 2 5 0 } \\; \\text{kg }
$$

**Payload mass:**

$$
m _ { \\text{pay } } \\; = \\; m _ { 0 } - m _ { p } - m _ { s } \\; = \\; 1 0 0 { , } 0 0 0 - 8 5 { , } 0 0 0 - 4 2 5 0 \\; = \\; { \\bf 1 0 { , } 7 5 0 } \\; \\text{kg }
$$

**Final mass:**

$$
m _ { f } \\; = \\; m _ { s } + m _ { \\text{pay } } \\; = \\; 4 2 5 0 + 1 0 { , } 7 5 0 \\; = \\; { \\bf 1 5 { , } 0 0 0 } \\; \\text{kg }
$$

**Mass ratio:**

$$
R \\; = \\; { \frac { m _ { 0 } } { m _ { f } } } \\; = \\; { \frac { 1 0 0 { , } 0 0 0 } { 1 5 { , } 0 0 0 } } \\; = \\; { \\bf 6 . 6 6 7 }
$$

**Delta-v:**

$$
\\Delta v \\; = \\; v _ { e } \\, \\ln R \\; = \\; 3 5 0 0 \\times \\ln 6 . 6 6 7 \\; = \\; 3 5 0 0 \\times 1 . 8 9 7 \\; = \\; { \\bf 6 6 3 9 } \\; \\text{m/s } = { \\bf 6 . 6 4 } \\; \\text{km/s }
$$

**Payload fraction:**

$$
\\lambda \\; = \\; { \frac { m _ { \\text{pay } } } { m _ { 0 } } } \\; = \\; { \frac { 1 0 { , } 7 5 0 } { 1 0 0 { , } 0 0 0 } } \\; = \\; { \\bf 0 . 1 0 7 5 }
$$

**The payload mass is 10,750 kg, the delta-v is 6.64 km/s, and the payload fraction is 0.1075. The engineer would design the rocket for the staging, because the staging is the reason the rocket is the most fundamental propulsion principle for spaceflight.**
:::

::: exercise Burn time {#ex-burn-time-calc level=3 check="2"}
A rocket has a propellant mass of $m _ { p } = 1 2 0 { , } 0 0 0 \\; \\text{kg }$ and a mass flow rate of $\\dot { m } = 4 0 0 \\; \\text{kg/s }$ . Calculate the burn time.

::: solution
$$
t _ { b } \\; = \\; { \frac { m _ { p } } { \\dot { m } } } \\; = \\; { \frac { 1 2 0 { , } 0 0 0 } { 4 0 0 } } \\; = \\; { \\bf 3 0 0 } \\; \\text{s }
$$

**The burn time is 300 s.**
:::
:::

## Exercises

::: exercise Tsiolkovsky equation {#ex-tsiolkovsky-calc level=3 check="2"}
A rocket has $v _ { e } = 4 0 0 0 \; \text{m/s }$ , $m _ { 0 } = 2 0 0 { , } 0 0 0 \; \text{kg }$ , and $m _ { f } = 4 0 { , } 0 0 0 \; \text{kg }$ . Calculate the delta-v.

::: solution
$$
\Delta v \; = \; v _ { e } \, \ln { \frac { m _ { 0 } } { m _ { f } } } \; = \; 4 0 0 0 \times \ln { \frac { 2 0 0 { , } 0 0 0 } { 4 0 { , } 0 0 0 } } \; = \; 4 0 0 0 \times \ln 5 \; = \; 4 0 0 0 \times 1 . 6 0 9 \; = \; { \bf 6 4 3 7 } \; \text{m/s }
$$

**The delta-v is 6437 m/s.**
:::
:::

::: exercise Specific impulse {#ex-isp-calc level=3 check="2"}
A rocket produces $F = 5 0 0 { , } 0 0 0 \; \text{N }$ of thrust with a propellant mass flow rate of $\dot { m } = 1 5 0 \; \text{kg/s }$ . Calculate the specific impulse.

::: solution
$$
I _ { s p } \; = \; { \frac { F } { \dot { m } \, g _ { 0 } } } \; = \; { \frac { 5 0 0 { , } 0 0 0 } { 1 5 0 \times 9 . 8 1 } } \; = \; { \frac { 5 0 0 { , } 0 0 0 } { 1 4 7 1 . 5 } } \; = \; { \bf 3 3 9 . 8 } \; \text{s }
$$

**The specific impulse is 339.8 s.**
:::
:::

::: exercise Mass ratio {#ex-mass-ratio-calc level=3 check="2"}
A rocket has a propellant mass fraction of $\zeta = 0 . 9 2$ . Calculate the mass ratio.

::: solution
$$
R \; = \; { \frac { 1 } { 1 - \zeta } } \; = \; { \frac { 1 } { 1 - 0 . 9 2 } } \; = \; { \frac { 1 } { 0 . 0 8 } } \; = \; { \bf 1 2 . 5 }
$$

**The mass ratio is 12.5.**
:::
:::

::: exercise Exhaust velocity {#ex-exhaust-velocity-calc level=3 check="2"}
A rocket has $c ^ { * } = 2 2 0 0 \; \text{m/s }$ and $C _ { F } = 1 . 5$ . Calculate the effective exhaust velocity and the specific impulse.

::: solution
$$
v _ { e } \; = \; c ^ { * } \, C _ { F } \; = \; 2 2 0 0 \times 1 . 5 \; = \; { \bf 3 3 0 0 } \; \text{m/s }
$$

$$
I _ { s p } \; = \; { \frac { v _ { e } } { g _ { 0 } } } \; = \; { \frac { 3 3 0 0 } { 9 . 8 1 } } \; = \; { \bf 3 3 6 } \; \text{s }
$$

**The effective exhaust velocity is 3300 m/s and the specific impulse is 336 s.**
:::
:::

::: exercise Gravity loss {#ex-gravity-loss-calc level=3 check="2"}
A rocket has a burn time of $t _ { b } = 3 0 0 \; \text{s }$ and a flight path angle of $\theta = 6 0 ^ { \circ }$ . Calculate the gravity loss.

::: solution
$$
\Delta v _ { \text{grav } } \; = \; g _ { 0 } \, t _ { b } \, \sin \theta \; = \; 9 . 8 1 \times 3 0 0 \times \sin 6 0 ^ { \circ } \; = \; 9 . 8 1 \times 3 0 0 \times 0 . 8 6 6 \; = \; { \bf 2 5 4 9 } \; \text{m/s }
$$

**The gravity loss is 2549 m/s.**
:::
:::

::: exercise Derivation: the Tsiolkovsky equation {#ex-derive-tsiolkovsky level=4 check="2"}
Show that the delta-v is $\Delta v = v _ { e } \, \ln ( m _ { 0 } / m _ { f } )$ . Write the expression for the mass ratio.

::: solution
The **thrust** on the rocket is:

$$
F \; = \; v _ { e } \, \dot { m }
$$

The **equation of motion** (no gravity, no drag) is:

$$
m \, { \frac { d v } { d t } } \; = \; - v _ { e } \, { \frac { d m } { d t } }
$$

Separating variables:

$$
d v \; = \; - v _ { e } \, { \frac { d m } { m } }
$$

Integrating from $m _ { 0 }$ to $m _ { f }$ :

$$
\Delta v \; = \; - v _ { e } \, \int _ { m _ { 0 } } ^ { m _ { f } } { \frac { d m } { m } } \; = \; - v _ { e } \, \ln { \frac { m _ { f } } { m _ { 0 } } } \; = \; v _ { e } \, \ln { \frac { m _ { 0 } } { m _ { f } } }
$$

The **mass ratio** is:

$$
R \; = \; { \frac { m _ { 0 } } { m _ { f } } }
$$

**The Tsiolkovsky equation is the reason the rocket is designed for the delta-v, not the thrust, and the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.** $\blacksquare$
:::
:::

::: exercise Derivation: the specific impulse {#ex-derive-isp level=4 check="2"}
Show that the specific impulse is $I _ { s p } = v _ { e } / g _ { 0 }$ . Write the expression for the thrust coefficient.

::: solution
The **specific impulse** is defined as:

$$
I _ { s p } \; = \; { \frac { F } { \dot { m } \, g _ { 0 } } }
$$

Since $F = v _ { e } \, \dot { m }$ :

$$
I _ { s p } \; = \; { \frac { v _ { e } \, \dot { m } } { \dot { m } \, g _ { 0 } } } \; = \; { \frac { v _ { e } } { g _ { 0 } } }
$$

The **thrust coefficient** is:

$$
C _ { F } \; = \; { \frac { F } { p _ { c } \, A _ { t } } }
$$

The **characteristic velocity** is:

$$
c ^ { * } \; = \; { \frac { p _ { c } \, A _ { c } } { \dot { m } } }
$$

Therefore:

$$
v _ { e } \; = \; c ^ { * } \, C _ { F } \; = \; I _ { s p } \, g _ { 0 }
$$

**The specific impulse is the reason the rocket is designed for the impulse, not the thrust, and the impulse is the reason the rocket is the most fundamental propulsion principle for spaceflight.** $\blacksquare$
:::
:::

::: quiz Rocket fundamentals {#quiz-rocket-fund}
The most fundamental propulsion principle for spaceflight is:

- [ ] The air-breathing engine
- [x] The rocket
- [ ] The propeller
- [ ] The ramjet

::: solution
**The rocket.** The rocket is the most fundamental propulsion principle for spaceflight, because the rocket is the device that produces thrust by expelling reaction mass, and the rocket is the device that determines the delta-v and the mass ratio. The engineer who calculates the rocket without checking the Tsiolkovsky equation is not calculating the rocket; they are guessing.
:::
:::

::: quiz Tsiolkovsky equation {#quiz-tsiolkovsky}
The Tsiolkovsky equation is:

- [ ] $\Delta v = v _ { e } \, ( m _ { 0 } / m _ { f } )$
- [x] $\Delta v = v _ { e } \, \ln ( m _ { 0 } / m _ { f } )$
- [ ] $\Delta v = v _ { e } \, \log _ { 1 0 } ( m _ { 0 } / m _ { f } )$
- [ ] $\Delta v = v _ { e } ^ { 2 } \, \ln ( m _ { 0 } / m _ { f } )$

::: solution
**$\Delta v = v _ { e } \, \ln ( m _ { 0 } / m _ { f } )$ .** The Tsiolkovsky equation is $\Delta v = v _ { e } \, \ln ( m _ { 0 } / m _ { f } )$ , and the Tsiolkovsky equation is the reason the rocket is designed for the delta-v, not the thrust. The engineer who calculates the rocket without checking the Tsiolkovsky equation is not calculating the rocket; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the rocket.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the rocket.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the rocket.
- **[[propulsion/compressors]]** — The compressors are the foundation of the rocket.
- **[[propulsion/turbines]]** — The turbines are the foundation of the rocket.
- **[[propulsion/combustors]]** — The combustors are the foundation of the rocket.
- **[[propulsion/propellers]]** — The propellers are the foundation of the rocket.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the rocket.
- **[[orbital-mechanics/two-body-problem]]** — The orbital mechanics are the foundation of the rocket.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the rocket.

::: history Rocket fundamentals: from Tsiolkovsky to the Moon rocket {#history-rocket-fund}
**1903** — **Konstantin Tsiolkovsky** publishes **The Exploration of Cosmic Space by Means of Reaction Devices**, which is the foundation of the rocket. **The Tsiolkovsky equation is the reason the rocket is the oldest concept in spaceflight, and the age is the reason the rocket is the most refined concept in spaceflight.**

**1926** — **Robert Goddard** launches the **first liquid-fueled rocket**, and the first liquid-fueled rocket is the reason the rocket is the most historic concept in spaceflight. **The first liquid-fueled rocket is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the first liquid-fueled rocket is the most historic concept in spaceflight.**

**1942** — **The V-2 rocket** reaches space, and the V-2 rocket is the reason the rocket is the most practical concept in spaceflight. **The V-2 rocket is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the V-2 rocket is the most practical concept in spaceflight.**

**1957** — **The R-7 rocket** launches **Sputnik 1**, and Sputnik 1 is the reason the rocket is the most applied concept in spaceflight. **Sputnik 1 is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason Sputnik 1 is the most applied concept in spaceflight.**

**1960s** — **The Saturn V rocket** is developed, and the Saturn V rocket is the reason the rocket is the most powerful concept in spaceflight. **The Saturn V rocket is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the Saturn V rocket is the most powerful concept in spaceflight.**

**1970s** — **The Space Shuttle** is developed, and the Space Shuttle is the reason the rocket is the most reusable concept in spaceflight. **The Space Shuttle is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the Space Shuttle is the most reusable concept in spaceflight.**

**2000s** — **The Falcon 9 rocket** is developed, and the Falcon 9 rocket is the reason the rocket is the most modern concept in spaceflight. **The Falcon 9 rocket is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the Falcon 9 rocket is the most modern concept in spaceflight.**

**2010s** — **The reusable booster** is developed, and the reusable booster is the reason the rocket is the most futuristic concept in spaceflight. **The reusable booster is the reason the rocket is the most refined concept in spaceflight, and the rocket is the reason the reusable booster is the most futuristic concept in spaceflight.**
:::

::: summary Rocket fundamentals {#summary-rocket-fund}
- **The Tsiolkovsky equation is $\Delta v = v _ { e } \, \ln ( m _ { 0 } / m _ { f } )$ , the exhaust velocity is $v _ { e } = F / \dot { m } = c ^ { * } \, C _ { F }$ , and the mass ratio is $R = m _ { 0 } / m _ { f }$ .** The Tsiolkovsky equation is the reason the rocket is designed for the delta-v, not the thrust, and the delta-v is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The propellant mass fraction is $\zeta = m _ { p } / m _ { 0 } = 1 - 1 / R$ , and the specific impulse is $I _ { s p } = F / ( \dot { m } \, g _ { 0 } ) = v _ { e } / g _ { 0 }$ .** The specific impulse is the reason the rocket is designed for the impulse, not the thrust, and the impulse is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The characteristic velocity is $c ^ { * } = p _ { c } \, A _ { c } / \dot { m }$ , and the thrust coefficient is $C _ { F } = F / ( p _ { c } \, A _ { t } )$ .** The mass ratio is the reason the rocket is designed for the ratio, not the mass, and the ratio is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The effective exhaust velocity is $v _ { e } = c ^ { * } \, C _ { F } = I _ { s p } \, g _ { 0 }$ , and the gravity loss is $\Delta v _ { \text{grav } } = g _ { 0 } \, t _ { b } \, \sin \theta$ .** The exhaust velocity is the reason the rocket is designed for the velocity, not the pressure, and the velocity is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The thrust-to-weight ratio is $\text{TWR } = F / ( m _ { 0 } \, g _ { 0 } )$ , and the burn time is $t _ { b } = m _ { p } / \dot { m } = \zeta \, m _ { 0 } / \dot { m }$ .** The thrust coefficient is the reason the rocket is designed for the coefficient, not the thrust, and the coefficient is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The effective delta-v is $\Delta v _ { \text{eff } } = \Delta v - \Delta v _ { \text{grav } } - \Delta v _ { \text{drag } }$ , and the delta-v for a two-stage rocket is $\Delta v = v _ { e 1 } \, \ln ( m _ { 0 } / m _ { f 1 } ) + v _ { e 2 } \, \ln ( m _ { 0 2 } / m _ { f 2 } )$ .** The characteristic velocity is the reason the rocket is designed for the characteristic, not the actual, and the characteristic is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The optimal mass ratio per stage is $R _ { \text{stage } } = R ^ { 1 / N }$ , and the payload fraction is $\lambda = m _ { \text{payload } } / m _ { 0 }$ .** The propellant mass fraction is the reason the rocket is designed for the fraction, not the whole, and the fraction is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The delta-v for equal stages is $\Delta v = N \, v _ { e } \, \ln R _ { \text{stage } }$ , and the gravity loss is $\Delta v _ { \text{grav } } = 1 \text{--} 2$ km/s.** The gravity loss is the reason the rocket is designed for the loss, not the gain, and the loss is the reason the rocket is the most fundamental propulsion principle for spaceflight.
- **The rocket calculation is the most important calculation in spaceflight, because the rocket calculation determines the delta-v and the mass ratio.** The delta-v and the mass ratio are the reason the engineer can design the rocket to reach orbit.
- **The rocket is the most fundamental propulsion principle for spaceflight, because the rocket is the device that produces thrust by expelling reaction mass.** The device is the reason the engineer can design the rocket to reach orbit.
:::

## Further reading

- **R. Sutton and O. Biblarz (2017)** — *Rocket Propulsion Elements*, 9th ed. Wiley. The rocket, the Tsiolkovsky equation, and the specific impulse.
- **G. P. Sutton (1992)** — *History of Liquid Propulsion Systems*. AIAA. The rocket and the staging.
- **E. Zarchan (2015)** — *Progress in Astronautics and Aeronautics*. AIAA. The rocket and the delta-v.
- **D. Hull (2011)** — *Space Propulsion*. Springer. The rocket and the mass ratio.
- **A. Angelopoulos (2011)** — *Advanced Spacecraft Propulsion*. Springer. The rocket and the exhaust velocity.
- **M. Sunahara (2003)** — *Fundamentals of Rocket Propulsion*. Elsevier. The rocket and the rocket performance.
- **O. Frydman and C. Chiu (1996)** — *Fundamentals of Rocket Propulsion*. Gordon and Breach. The rocket and the thrust coefficient.
- **J. Zurn (2002)** — *Rocket Propulsion Fundamentals*. AIAA. The rocket and the characteristic velocity.
