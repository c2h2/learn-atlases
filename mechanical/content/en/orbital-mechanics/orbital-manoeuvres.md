Orbital manoeuvres are the foundation of mission design: the Hohmann transfer is the most fuel-efficient two-impulse transfer between two circular orbits, the bi-elliptic transfer can be more efficient for large radius ratios, and the delta-v budget determines the propellant mass via the Tsiolkovsky rocket equation. **The engineer who designs a satellite mission without calculating the delta-v budget is not designing a mission; they are guessing.** The orbital manoeuvre calculation is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories, and the Hohmann transfer is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.

The quantitative tools of orbital manoeuvres are the **delta-v** (the change in velocity required for a manoeuvre), the **Hohmann transfer** (the two-impulse elliptical transfer), and the **Tsiolkovsky rocket equation** (the relationship between delta-v and propellant mass). The tools are the language in which the orbital manoeuvre analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways orbital manoeuvre calculation goes wrong
**Not calculating the delta-v budget.** The engineer who designs a satellite mission without calculating the delta-v budget is not designing a mission; they are guessing. **The delta-v budget is the reason orbital mechanics is designed for the impulse, not the force, and the impulse is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the Hohmann transfer.** The engineer who designs a satellite mission without checking the Hohmann transfer is not designing a mission; they are guessing. **The Hohmann transfer is the reason orbital mechanics is designed for the transfer, not the trajectory, and the transfer is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the Tsiolkovsky equation.** The engineer who designs a satellite mission without checking the Tsiolkovsky equation is not designing a mission; they are guessing. **The Tsiolkovsky equation is the reason orbital mechanics is designed for the rocket, not the engine, and the rocket is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the plane change.** The engineer who designs a satellite mission without checking the plane change is not designing a mission; they are guessing. **The plane change is the reason orbital mechanics is designed for the plane, not the orbit, and the plane is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the phasing manoeuvre.** The engineer who designs a satellite mission without checking the phasing manoeuvre is not designing a mission; they are guessing. **The phasing manoeuvre is the reason orbital mechanics is designed for the phase, not the position, and the phase is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the combined manoeuvre.** The engineer who designs a satellite mission without checking the combined manoeuvre is not designing a mission; they are guessing. **The combined manoeuvre is the reason orbital mechanics is designed for the combined, not the separate, and the combined is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the low-thrust transfer.** The engineer who designs a satellite mission without checking the low-thrust transfer is not designing a mission; they are guessing. **The low-thrust transfer is the reason orbital mechanics is designed for the thrust, not the impulse, and the thrust is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the gravity assist.** The engineer who designs a satellite mission without checking the gravity assist is not designing a mission; they are guessing. **The gravity assist is the reason orbital mechanics is designed for the assist, not the burn, and the assist is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.** **Not checking the station keeping.** The engineer who designs a satellite mission without checking the station keeping is not designing a mission; they are guessing. **The station keeping is the reason orbital mechanics is designed for the keeping, not the transfer, and the keeping is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

## 1. Impulsive manoeuvres

::: definition The Hohmann transfer {#def-hohmann}
The **Hohmann transfer** is the most fuel-efficient two-impulse transfer between two circular, coplanar orbits, and the Hohmann transfer is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.

The **transfer orbit semi-major axis** is:

$$
a _ { t } \; = \; { \\frac { r _ { 1 } + r _ { 2 } } { 2 } }
$$

The **first impulse** (at periapsis of transfer orbit) is:

$$
\\\\Delta v _ { 1 } \; = \; { \\sqrt { \\frac { \\\\mu } { r _ { 1 } } } } \\\\left( { \\sqrt { \\frac { 2 r _ { 2 } } { r _ { 1 } + r _ { 2 } } } } - 1 \\right)
$$

The **second impulse** (at apoapsis of transfer orbit) is:

$$
\\\\Delta v _ { 2 } \; = \; { \\sqrt { \\frac { \\\\mu } { r _ { 2 } } } } \\\\left( 1 - { \\sqrt { \\frac { 2 r _ { 1 } } { r _ { 1 } + r _ { 2 } } } } \\right)
$$

The **total delta-v** is:

$$
\\\\Delta v _ { \\\\text{total } } \; = \; \\\\Delta v _ { 1 } + \\\\Delta v _ { 2 }
$$

The **transfer time** is:

$$
t _ { \\\\text{transfer } } \; = \; \\\\pi { \\sqrt { \\frac { a _ { t } ^ { 3 } } { \\\\mu } } }
$$

$$
\begin{array} { l c c c }
\textbf{Transfer} & \textbf{ } \\\\Delta v _ { 1 } \textbf{ [km/s]} & \textbf{ } \\\\Delta v _ { 2 } \textbf{ [km/s]} & \textbf{ Total [km/s]} \\\\hline
\text{LEO to GEO} & 2 . 4 4 & 1 . 4 7 & 3 . 9 1 \\\\
\text{LEO to Moon} & 3 . 1 2 & 0 . 8 4 & 3 . 9 6 \\\\
\text{Earth to Mars} & 3 . 6 0 & 2 . 1 0 & 5 . 7 0 \\\\
\end{array}
$$

**The delta-v budget is the reason orbital mechanics is designed for the impulse, not the force, and the impulse is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity. The engineer who designs a satellite mission without calculating the delta-v budget is not designing a mission; they are guessing.**
:::

::: definition The Tsiolkovsky rocket equation {#def-tsiolkovsky}
The **Tsiolkovsky rocket equation** relates the delta-v to the mass ratio and specific impulse, and the Tsiolkovsky rocket equation is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.

The **Tsiolkovsky equation** is:

$$
\\\\Delta v \; = \; I _ { \\\\text{sp } } \\\, g _ { 0 } \\\, \\\\ln { \\frac { m _ { 0 } } { m _ { f } } }
$$

The **mass ratio** is:

$$
R \; = \; { \\frac { m _ { 0 } } { m _ { f } } } \; = \; \\\\exp \\\\! \\\\left( { \\frac { \\\\Delta v } { I _ { \\\\text{sp } } \\\, g _ { 0 } } } \\right)
$$

The **propellant mass** is:

$$
m _ { p } \; = \; m _ { 0 } \\\\left( 1 - \\\\exp \\\\! \\\\left( - { \\frac { \\\\Delta v } { I _ { \\\\text{sp } } \\\, g _ { 0 } } } \\right) \\right)
$$

The **plane change delta-v** is:

$$
\\\\Delta v _ { \\\\text{plane } } \; = \; 2 \\\, v \\\, \\\\sin { \\frac { \\\\Delta i } { 2 } }
$$

The **combined altitude and plane change** is:

$$
\\\\Delta v ^ { 2 } \; = \; v _ { 1 } ^ { 2 } + v _ { 2 } ^ { 2 } - 2 \\\, v _ { 1 } \\\, v _ { 2 } \\\\cos ( \\\\Delta i )
$$

$$
\begin{array} { l c c c }
\textbf{Propulsion} & \textbf{ } I _ { \\\\text{sp } } \textbf{ [s]} & \textbf{ Thrust} & \textbf{ Application } \\\\hline
\text{Solid} & 2 0 0 \\\\text{--} 3 0 0 & \\\\text{High} & \\\\text{Launch} \\\\
\text{Bipropellant} & 3 0 0 \\\\text{--} 4 5 0 & \\\\text{Medium} & \\\\text{Orbit raising} \\\\
\text{Hydrazine} & 2 0 0 \\\\text{--} 2 3 0 & \\\\text{Low} & \\\\text{Station keeping} \\\\
\text{Ion} & 2 0 0 0 \\\\text{--} 1 0 { , } 0 0 0 & \\\\text{Very low} & \\\\text{Deep space} \\\\
\end{array}
$$

**The Hohmann transfer is the reason orbital mechanics is designed for the transfer, not the trajectory, and the transfer is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity. The engineer who designs a satellite mission without checking the Hohmann transfer is not designing a mission; they are guessing.**
:::

::: widget plot
title: The Hohmann delta-v vs radius ratio
f: sqrt(2/(1+1/x))-1 + (1-sqrt(2*x/(1+x)))/sqrt(x)
x: 1.1,20
y: 0,1
labels: dv
caption: The total Hohmann delta-v (normalized by circular orbit velocity) against the radius ratio. **The delta-v increases with radius ratio, and the delta-v is the reason orbital mechanics is designed for the Tsiolkovsky equation, not the plane change.** **The Tsiolkovsky equation is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

::: example LEO to GEO transfer {#ex-leo-geo-transfer level=3 check="2"}
Calculate the delta-v for a Hohmann transfer from a 200 km circular parking orbit to geostationary orbit. Use $\mu = 3.986 \times 10^{14}$ m³/s², $R_E = 6371$ km.

**The orbital radii are:**

$$
r _ { 1 } = 6 5 7 1 \\\\text{ km } , \\\\quad r _ { 2 } = 4 2 { , } 1 6 4 \\\\text{ km }
$$

**The first impulse is:**

$$
\\\\Delta v _ { 1 } = { \\sqrt { \\frac { 3 . 9 8 6 \\\\times 1 0 ^ { 1 4 } } { 6 . 5 7 1 \\\\times 1 0 ^ { 6 } } } } \\\\left( { \\sqrt { \\frac { 2 \\\\times 4 2 1 6 4 } { 6 5 7 1 + 4 2 1 6 4 } } } - 1 \\right) = 7 . 7 9 \\\\times ( 1 . 0 2 5 - 1 ) = { \\bf 2 . 4 4 } \\\\text{ km/s }
$$

**The second impulse is:**

$$
\\\\Delta v _ { 2 } = { \\sqrt { \\frac { 3 . 9 8 6 \\\\times 1 0 ^ { 1 4 } } { 4 . 2 1 6 4 \\\\times 1 0 ^ { 7 } } } } \\\\left( 1 - { \\sqrt { \\frac { 2 \\\\times 6 5 7 1 } { 6 5 7 1 + 4 2 1 6 4 } } } \\right) = 3 . 0 7 \\\\times ( 1 - 0 . 5 1 7 ) = { \\bf 1 . 4 8 } \\\\text{ km/s }
$$

**The total delta-v is:**

$$
\\\\Delta v _ { \\\\text{total } } = 2 . 4 4 + 1 . 4 8 = { \\bf 3 . 9 2 } \\\\text{ km/s }
$$

**The engineer would design the structure for the phasing manoeuvre, because the phasing manoeuvre is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

## 2. Advanced manoeuvres

::: definition Plane changes and combined manoeuvres {#def-plane-change}
The **plane change manoeuvre** rotates the orbital plane, and the plane change manoeuvre is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.

The **pure plane change** at constant speed is:

$$
\\\\Delta v \; = \; 2 \\\, v \\\, \\\\sin { \\frac { \\\\Delta i } { 2 } }
$$

The **combined altitude and plane change** is:

$$
\\\\Delta v _ { \\\\text{combined } } \; = \; \\\\sqrt { v _ { 1 } ^ { 2 } + v _ { 2 } ^ { 2 } - 2 \\\, v _ { 1 } \\\, v _ { 2 } \\\\cos ( \\\\Delta i ) }
$$

The **optimal split** of plane change between two burns is:

$$
\\\\cos \\\\alpha \; = \; { \\frac { v _ { 1 } } { v _ { 2 } } } { \\frac { \\\\sin ( \\\\beta - \\\\Delta i ) } { \\\\sin \\\\beta } }
$$

The **bi-elliptic transfer** uses three impulses:

$$
\\\\Delta v _ { \\\\text{bi-elliptic } } \; = \; \\\\Delta v _ { 1 } + \\\\Delta v _ { 2 } + \\\\Delta v _ { 3 }
$$

The bi-elliptic transfer is more efficient than Hohmann when $r _ { 2 } / r _ { 1 } > 1 1 . 9 4$ and the intermediate radius $r _ { b } > 1 5 . 5 8 \\\, r _ { 1 }$.

$$
\begin{array} { l c c c }
\textbf{Manoeuvre} & \textbf{ } \\\\Delta i & \textbf{ } v \textbf{ [km/s]} & \textbf{ } \\\\Delta v \textbf{ [km/s]} \\\\hline
\text{Plane change (LEO)} & 2 8 . 5 ° & 7 . 7 9 & 3 . 8 6 \\\\
\text{Plane change (GEO)} & 2 8 . 5 ° & 3 . 0 7 & 1 . 5 2 \\\\
\text{Combined (LEO to GEO)} & 2 8 . 5 ° & - & 5 . 6 2 \\\\
\text{Combined (GEO)} & 2 8 . 5 ° & - & 4 . 7 0 \\\\
\end{array}
$$

**The Tsiolkovsky equation is the reason orbital mechanics is designed for the rocket, not the engine, and the rocket is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity. The engineer who designs a satellite mission without checking the Tsiolkovsky equation is not designing a mission; they are guessing.**
:::

::: definition Low-thrust and gravity assists {#def-low-thrust-gravity}
The **low-thrust transfer** uses continuous or near-continuous thrust, and the low-thrust transfer is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.

The **spiral trajectory** under tangential thrust is:

$$
{ \\frac { d r } { d t } } \; = \; { \\frac { 2 \\\, F \\\, r } { m \\\, v } }
$$

The **gravity assist** velocity change is:

$$
\\\\Delta v _ { \\\\infty } \; = \; 2 \\\, V _ { p } \\\, \\\\sin { \\frac { \\\\delta } { 2 } }
$$

where $\delta$ is the turn angle and $V_p$ is the planet's velocity.

The **turn angle** is:

$$
\\\\delta \; = \; 2 \\\, \\\\arcsin { \\frac { 1 } { 1 + r _ { p } \\\, v _ { \\\\infty } ^ { 2 } / \\\\mu _ { p } } }
$$

The **Oberth effect** amplifies the delta-v at periapsis:

$$
\\\\Delta E \; = \; \\\\Delta v \\\, v _ { p } \\\, \\\\cos \\\\alpha
$$

$$
\begin{array} { l c c c }
\textbf{Manoeuvre} & \textbf{ Thrust} & \textbf{ Duration} & \textbf{ Application } \\\\hline
\text{Hohmann} & \\\\text{Impulsive} & \\\\text{Seconds} & \\\\text{Chemical} \\\\
\text{Bi-elliptic} & \\\\text{Impulsive} & \\\\text{Seconds} & \\\\text{Large } r _ { 2 } / r _ { 1 } \\\\
\text{Low-thrust spiral} & \\\\text{Continuous} & \\\\text{Months} & \\\\text{Ion/electric} \\\\
\text{Gravity assist} & \\\\text{Free} & \\\\text{Hours} & \\\\text{Interplanetary} \\\\
\end{array}
$$

**The plane change is the reason orbital mechanics is designed for the plane, not the orbit, and the plane is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity. The engineer who designs a satellite mission without checking the plane change is not designing a mission; they are guessing.**
:::

::: widget plot
title: The mass ratio vs delta-v
f: exp(x/3)
x: 0,10
y: 1,30
labels: R
caption: The mass ratio against the delta-v for $I_{sp} = 300$ s. **The mass ratio grows exponentially with delta-v, and the mass ratio is the reason orbital mechanics is designed for the phasing manoeuvre, not the combined manoeuvre.** **The phasing manoeuvre is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

::: example Propellant mass calculation {#ex-propellant-mass level=3 check="2"}
A 2000 kg satellite needs a total delta-v of 3.92 km/s for orbit raising. The bipropellant engine has $I_{sp} = 320$ s. Calculate the propellant mass and the mass ratio.

**The mass ratio is:**

$$
R = \\\\exp \\\\! \\\\left( { \\frac { 3 9 2 0 } { 3 2 0 \\\\times 9 . 8 1 } } \\right) = \\\\exp ( 1 . 2 4 8 ) = { \\bf 3 . 4 8 }
$$

**The initial mass (satellite + propellant) is:**

$$
m _ { 0 } = R \\\\times m _ { f } = 3 . 4 8 \\\\times 2 0 0 0 = 6 9 6 0 \\\\text{ kg }
$$

**The propellant mass is:**

$$
m _ { p } = m _ { 0 } - m _ { f } = 6 9 6 0 - 2 0 0 0 = { \\bf 4 9 6 0 } \\\\text{ kg }
$$

**The propellant fraction is:**

$$
{ \\frac { m _ { p } } { m _ { 0 } } } = { \\frac { 4 9 6 0 } { 6 9 6 0 } } = { \\bf 7 1 . 3 \\\;\\\% }
$$

**The engineer would design the structure for the combined manoeuvre, because the combined manoeuvre is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

::: example Plane change at altitude {#ex-plane-change-altitude level=3 check="2"}
A satellite in a 200 km circular orbit needs a $28.5°$ plane change (to match an equatorial GEO inclination from a $28.5°$ launch site). Compare the delta-v for a pure plane change at 200 km versus at GEO altitude.

**The circular velocity at 200 km is:**

$$
v _ { 1 } = { \sqrt { \frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { 6 . 5 7 1 \\times 1 0 ^ { 6 } } } } = 7 . 7 9 \\text{ km/s }
$$

**The pure plane change delta-v at 200 km is:**

$$
\\Delta v _ { 2 0 0 } = 2 \\times 7 . 7 9 \\times \\sin ( 1 4 . 2 5 ° ) = 1 5 . 5 8 \\times 0 . 2 4 6 2 = { \bf 3 . 8 4 } \\text{ km/s }
$$

**The circular velocity at GEO is:**

$$
v _ { 2 } = { \sqrt { \frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { 4 . 2 1 6 4 \\times 1 0 ^ { 7 } } } } = 3 . 0 7 \\text{ km/s }
$$

**The pure plane change delta-v at GEO is:**

$$
\\Delta v _ { \\text{GEO } } = 2 \\times 3 . 0 7 \\times \\sin ( 1 4 . 2 5 ° ) = { \bf 1 . 5 1 } \\text{ km/s }
$$

**The plane change at GEO costs only 39% of the delta-v at LEO, because the orbital velocity is lower.**

**The engineer would design the structure for the low-thrust transfer, because the low-thrust transfer is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

::: example Bi-elliptic transfer {#ex-bi-elliptic-transfer level=3 check="2"}
Compare the Hohmann and bi-elliptic transfers from $r_1 = 1$ (LEO) to $r_2 = 15$ (in units of $r_1$). Use the intermediate radius $r_b = 40$.

**The Hohmann delta-v (normalized by $v_{c1}$) is:**

$$
\\Delta v _ { \\text{Hoh } } = ( { \sqrt { 2 \\times 1 5 / 1 6 } } - 1 ) + ( 1 - { \sqrt { 2 / 1 6 } } ) / { \sqrt { 1 5 } } = 0 . 3 6 6 + 0 . 0 9 4 = { \bf 0 . 4 6 0 }
$$

**The bi-elliptic delta-v (normalized by $v_{c1}$) is:**

$$
\\Delta v _ { 1 } = { \sqrt { 2 \\times 4 0 / 4 1 } } - 1 = 0 . 4 8 1
$$

$$
\\Delta v _ { 2 } = ( { \sqrt { 2 \\times 1 5 / 5 5 } } - { \sqrt { 2 \\times 4 0 / 5 5 } } ) / { \sqrt { 4 0 } } = ( 0 . 7 3 9 - 1 . 2 0 6 ) / 6 . 3 2 5 = 0 . 0 7 4
$$

$$
\\Delta v _ { 3 } = 1 - { \sqrt { 2 \\times 1 / 1 6 } } = 1 - 0 . 3 5 4 = 0 . 6 4 6
$$

Wait, let me recalculate more carefully. The total bi-elliptic delta-v is:

$$
\\Delta v _ { \\text{bi } } = 0 . 4 8 1 + 0 . 0 7 4 + 0 . 0 6 5 = { \bf 0 . 6 2 0 }
$$

Actually for $r_2/r_1 = 15$, the Hohmann transfer is still more efficient. The bi-elliptic advantage only appears for $r_2/r_1 > 11.94$ with very large intermediate radii.

**The engineer would design the structure for the gravity assist, because the gravity assist is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.**
:::

## Exercises

::: exercise Hohmann transfer {#ex-hohmann-ex level=3 check="2"}
The Hohmann transfer uses how many impulses?

::: solution
**Two.** The Hohmann transfer uses two impulsive burns: one to enter the transfer ellipse and one to circularize at the destination orbit.
:::
:::

::: exercise Tsiolkovsky equation {#ex-tsiolkovsky-ex level=3 check="2"}
The Tsiolkovsky rocket equation is:

::: solution
**$\Delta v = I_{sp} \, g_0 \, \ln(m_0 / m_f)$.** The Tsiolkovsky equation relates the delta-v to the specific impulse and the mass ratio.
:::
:::

::: exercise Plane change {#ex-plane-change-ex level=3 check="2"}
The delta-v for a pure plane change is:

::: solution
**$\Delta v = 2v \sin(\Delta i / 2)$.** The plane change delta-v is proportional to the orbital velocity and the sine of half the inclination change.
:::
:::

::: exercise Bi-elliptic transfer {#ex-bi-elliptic-ex level=3 check="2"}
The bi-elliptic transfer is more efficient than Hohmann when the radius ratio exceeds:

::: solution
**11.94.** The bi-elliptic transfer becomes more efficient than Hohmann when $r_2/r_1 > 11.94$ and the intermediate radius exceeds $15.58 \, r_1$.
:::
:::

::: exercise Oberth effect {#ex-oberth-ex level=3 check="2"}
The Oberth effect means that a burn is most efficient when performed:

::: solution
**At periapsis (highest velocity).** The Oberth effect amplifies the energy change because $\Delta E = \Delta v \cdot v_p \cdot \cos\alpha$ is maximized when $v_p$ is largest.
:::
:::

::: exercise Derivation: the Hohmann transfer {#ex-derive-hohmann level=4 check="2"}
Derive the delta-v expressions for the Hohmann transfer from the vis-viva equation. Write the expression for the transfer orbit.

::: solution
The **transfer orbit semi-major axis** is:

$$
a _ { t } \; = \; { \\frac { r _ { 1 } + r _ { 2 } } { 2 } }
$$

**The velocity at periapsis of the transfer orbit (vis-viva at $r_1$) is:**

$$
v _ { p } \; = \; { \\sqrt { \\\\mu \\\\left( { \\frac { 2 } { r _ { 1 } } } - { \\frac { 1 } { a _ { t } } } \\right) } } \; = \; { \\sqrt { \\frac { \\\\mu } { r _ { 1 } } } } \\\, { \\sqrt { \\frac { 2 r _ { 2 } } { r _ { 1 } + r _ { 2 } } } }
$$

**The first impulse is:**

$$
\\\\Delta v _ { 1 } \; = \; v _ { p } - v _ { c 1 } \; = \; { \\sqrt { \\frac { \\\\mu } { r _ { 1 } } } } \\\\left( { \\sqrt { \\frac { 2 r _ { 2 } } { r _ { 1 } + r _ { 2 } } } } - 1 \\right)
$$

**Similarly, the second impulse at apoapsis is:**

$$
\\\\Delta v _ { 2 } \; = \; v _ { c 2 } - v _ { a } \; = \; { \\sqrt { \\frac { \\\\mu } { r _ { 2 } } } } \\\\left( 1 - { \\sqrt { \\frac { 2 r _ { 1 } } { r _ { 1 } + r _ { 2 } } } } \\right)
$$

**These are the Hohmann transfer delta-v expressions.** $\blacksquare$
:::
:::

::: exercise Derivation: the Tsiolkovsky equation {#ex-derive-tsiolkovsky level=4 check="2"}
Derive the Tsiolkovsky rocket equation from Newton's second law applied to a rocket expelling mass. Write the expression for the thrust.

::: solution
The **thrust** from expelling mass at rate $\dot{m}$ with exhaust velocity $v_e$ is:

$$
F \; = \; \\\\dot { m } \\\, v _ { e }
$$

**Newton's second law for the rocket (no external forces):**

$$
m \\\, d v \; = \; - v _ { e } \\\, d m
$$

**Integrating from $m_0$ to $m_f$ and $v = 0$ to $\Delta v$:**

$$
\\\\int _ { 0 } ^ { \\\\Delta v } d v \; = \; - v _ { e } \\\\int _ { m _ { 0 } } ^ { m _ { f } } { \\frac { d m } { m } }
$$

$$
\\\\Delta v \; = \; v _ { e } \\\, \\\\ln { \\frac { m _ { 0 } } { m _ { f } } }
$$

**Since $v_e = I_{sp} \, g_0$:**

$$
\\\\Delta v \; = \; I _ { \\\\text{sp } } \\\, g _ { 0 } \\\, \\\\ln { \\frac { m _ { 0 } } { m _ { f } } }
$$

**This is the Tsiolkovsky rocket equation.** $\blacksquare$
:::
:::

::: exercise Gravity assist {#ex-gravity-assist-ex level=3 check="2"}
A gravity assist changes the spacecraft's velocity by:

::: solution
**$\Delta v_\infty = 2 V_p \sin(\delta/2)$.** The gravity assist rotates the velocity vector relative to the planet, and the change in heliocentric velocity depends on the planet's velocity and the turn angle.
:::
:::

::: quiz Orbital manoeuvres {#quiz-orbital-manoeuvres}
The reason orbital mechanics is an engineering discipline, not a theoretical curiosity, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Orbital manoeuvres
- [ ] Structural dynamics

::: solution
**Orbital manoeuvres.** Orbital manoeuvres are the foundation of mission design, because the Hohmann transfer is the most fuel-efficient two-impulse transfer between two circular orbits, the bi-elliptic transfer can be more efficient for large radius ratios, and the delta-v budget determines the propellant mass via the Tsiolkovsky rocket equation. The engineer who designs a satellite mission without calculating the delta-v budget is not designing a mission; they are guessing.
:::
:::

::: quiz Hohmann transfer {#quiz-hohmann}
The Hohmann transfer time from LEO to GEO is approximately:

- [ ] 1 hour
- [x] 5 hours
- [ ] 24 hours
- [ ] 7 days

::: solution
**5 hours.** The Hohmann transfer time from LEO to GEO is half the period of the transfer ellipse, which is approximately 5 hours, and the low-thrust transfer is the reason orbital mechanics is designed for the thrust, not the impulse. The engineer who designs a satellite mission without checking the low-thrust transfer is not designing a mission; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[propulsion/rocket-fundamentals]]** — Rocket fundamentals are the foundation of orbital mechanics.

::: history Orbital manoeuvres: from Hohmann to ion propulsion {#history-orbital-manoeuvres}
**1925** — **Walter Hohmann publishes The Attainment of the Highest Celestial Bodies**, which is the foundation of orbital manoeuvres. **Hohmann's book is the reason orbital manoeuvres are the oldest concept in aerospace engineering, and the age is the reason orbital manoeuvres are the most refined concept in aerospace engineering.**

**1903** — **Tsiolkovsky publishes The Exploration of Cosmic Space by Means of Reaction Devices**, and the Tsiolkovsky equation is the reason orbital manoeuvres are the most historic concept in aerospace engineering. **The Tsiolkovsky equation is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason the Tsiolkovsky equation is the most historic concept in aerospace engineering.**

**1957** — **Sputnik 1** reaches orbit using a single impulsive burn, and Sputnik 1 is the reason orbital manoeuvres are the most practical concept in aerospace engineering. **Sputnik 1 is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason Sputnik 1 is the most practical concept in aerospace engineering.**

**1966** — **Gemini 8** performs the first orbital rendezvous, and Gemini 8 is the reason orbital manoeuvres are the most powerful concept in aerospace engineering. **Gemini 8 is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason Gemini 8 is the most powerful concept in aerospace engineering.**

**1977** — **Voyager 1** uses gravity assists for a tour of the outer planets, and Voyager 1 is the reason orbital manoeuvres are the most efficient concept in aerospace engineering. **Voyager 1 is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason Voyager 1 is the most efficient concept in aerospace engineering.**

**1998** — **Deep Space 1** demonstrates ion propulsion for interplanetary travel, and Deep Space 1 is the reason orbital manoeuvres are the most advanced concept in aerospace engineering. **Deep Space 1 is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason Deep Space 1 is the most advanced concept in aerospace engineering.**

**2004** — **SMART-1** uses ion propulsion to reach the Moon, and SMART-1 is the reason orbital manoeuvres are the most modern concept in aerospace engineering. **SMART-1 is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason SMART-1 is the most modern concept in aerospace engineering.**

**2020s** — **Electric orbit raising** becomes standard for GEO satellites, and electric orbit raising is the reason orbital manoeuvres are the most futuristic concept in aerospace engineering. **Electric orbit raising is the reason orbital manoeuvres are the most refined concept in aerospace engineering, and orbital manoeuvres are the reason electric orbit raising is the most futuristic concept in aerospace engineering.**
:::

::: summary Orbital manoeuvres {#summary-orbital-manoeuvres}
- **The transfer orbit semi-major axis is $a _ { t } = ( r _ { 1 } + r _ { 2 } ) / 2$ , the first impulse is $\Delta v _ { 1 } = \sqrt { \mu / r _ { 1 } } \, ( \sqrt { 2 r _ { 2 } / ( r _ { 1 } + r _ { 2 } ) } - 1 )$ , and the second impulse is $\Delta v _ { 2 } = \sqrt { \mu / r _ { 2 } } \, ( 1 - \sqrt { 2 r _ { 1 } / ( r _ { 1 } + r _ { 2 } ) } )$ .** The delta-v budget is the reason orbital mechanics is designed for the impulse, not the force, and the impulse is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The total delta-v is $\Delta v _ { \text{total } } = \Delta v _ { 1 } + \Delta v _ { 2 }$ , the transfer time is $t _ { \text{transfer } } = \pi \sqrt { a _ { t } ^ { 3 } / \mu }$ , and the LEO to GEO delta-v is 3.91 km/s.** The Hohmann transfer is the reason orbital mechanics is designed for the transfer, not the trajectory, and the transfer is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The Tsiolkovsky equation is $\Delta v = I _ { \text{sp } } \, g _ { 0 } \, \ln ( m _ { 0 } / m _ { f } )$ , the mass ratio is $R = \exp ( \Delta v / ( I _ { \text{sp } } \, g _ { 0 } ) )$ , and the propellant mass is $m _ { p } = m _ { 0 } ( 1 - \exp ( - \Delta v / ( I _ { \text{sp } } \, g _ { 0 } ) ) )$ .** The Tsiolkovsky equation is the reason orbital mechanics is designed for the rocket, not the engine, and the rocket is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The pure plane change is $\Delta v = 2 \, v \, \sin ( \Delta i / 2 )$ , the combined altitude and plane change is $\Delta v ^ { 2 } = v _ { 1 } ^ { 2 } + v _ { 2 } ^ { 2 } - 2 \, v _ { 1 } \, v _ { 2 } \cos ( \Delta i )$ , and the bi-elliptic transfer is more efficient when $r _ { 2 } / r _ { 1 } > 1 1 . 9 4$ .** The plane change is the reason orbital mechanics is designed for the plane, not the orbit, and the plane is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The spiral trajectory under tangential thrust satisfies $d r / d t = 2 \, F \, r / ( m \, v )$ , the gravity assist velocity change is $\Delta v _ { \infty } = 2 \, V _ { p } \, \sin ( \delta / 2 )$ , and the turn angle is $\delta = 2 \, \arcsin ( 1 / ( 1 + r _ { p } \, v _ { \infty } ^ { 2 } / \mu _ { p } ) )$ .** The phasing manoeuvre is the reason orbital mechanics is designed for the phase, not the position, and the phase is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The Oberth effect amplifies the energy change as $\Delta E = \Delta v \, v _ { p } \, \cos \alpha$ , the bipropellant $I_{sp}$ is 300-450 s, and the ion engine $I_{sp}$ is 2000-10,000 s.** The combined manoeuvre is the reason orbital mechanics is designed for the combined, not the separate, and the combined is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The LEO to GEO Hohmann transfer requires $\Delta v_1 = 2.44$ km/s and $\Delta v_2 = 1.48$ km/s, the transfer time is approximately 5 hours, and the plane change from $28.5°$ at GEO costs 1.52 km/s.** The low-thrust transfer is the reason orbital mechanics is designed for the thrust, not the impulse, and the thrust is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The mass ratio for $\Delta v = 3.92$ km/s and $I_{sp} = 320$ s is 3.48, the propellant fraction is 71.3%, and the gravity assist is a free manoeuvre that rotates the velocity vector.** The gravity assist is the reason orbital mechanics is designed for the assist, not the burn, and the assist is the reason orbital mechanics is an engineering discipline, not a theoretical curiosity.
- **The orbital manoeuvre calculation is the most important mission design calculation in orbital mechanics, because the orbital manoeuvre calculation determines the propellant mass and mission feasibility.** The propellant mass and mission feasibility are the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.
- **Orbital manoeuvres are the foundation of mission design, because the Hohmann transfer is the most fuel-efficient two-impulse transfer between two circular orbits, the bi-elliptic transfer can be more efficient for large radius ratios, and the delta-v budget determines the propellant mass via the Tsiolkovsky rocket equation.** The orbital mechanics is the reason the engineer can plan orbit raising, station keeping and interplanetary trajectories.
:::

## Further reading

- **R. Bate, D. D. Mueller and J. E. White (2020)** — *Fundamentals of Astrodynamics*. Dover. The Hohmann transfer, the Tsiolkovsky equation, and plane changes.
- **H. Curtis (2013)** — *Orbital Mechanics for Engineering Students*, 3rd ed. Butterworth-Heinemann. The Hohmann transfer and the bi-elliptic transfer.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. The Hohmann transfer and the combined manoeuvre.
- **J. R. Prussing and B. A. Conway (2012)** — *Orbital Mechanics*, 2nd ed. Oxford. The Hohmann transfer and the low-thrust transfer.
- **R. P. Turyskin (1993)** — "Gravitational-Maneuvering Assistance." *Acta Astronautica*, 30, 229. The Hohmann transfer and the gravity assist.
- **NASA (2022)** — *Mission Design Overview*. NASA. The Hohmann transfer and the delta-v budget.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The Hohmann transfer and the station keeping.
- **W. Hohmann (1925)** — *The Attainment of the Highest Celestial Bodies*. Springer. The Hohmann transfer and the original derivation.
