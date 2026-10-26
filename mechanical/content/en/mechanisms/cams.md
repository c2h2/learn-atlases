::: warning The mechanism that does exactly what you ask
A four-bar gives you a curve and you find out afterwards what it is. A cam gives you the curve you specify, which is why it is the mechanism of choice when the motion itself is the requirement — the valve train, the printing cylinder, the knitting machine, the assembly index. That freedom has a price, paid not in design time but in **force**. Every millimetre of the profile is a surface that must transmit a Hertzian contact pressure of several hundred megapascals through an oil film a few hundred nanometres thick, and a spring-closed follower can only be pushed, never pulled. **A common mistake is to treat cam design as a drawing exercise: the geometry is usually the easy part, and the contact stresses, the lubrication and the follower dynamics are what limit a real cam.**
:::

## What you already know

- The slider-crank and its displacement series — [[mechanisms/position-analysis]]
- Transmission angle and why a mechanism that cannot push is useless — [[mechanisms/mechanisms-mobility]]
- Follower acceleration, the shaking force and cam float — [[mechanisms/acceleration-analysis]]
- Hertz contact stress and surface fatigue — the line-contact results are quoted below from Johnson's *Contact Mechanics*
- The cam-law coefficient table used in [[mechanisms/acceleration-analysis]]

## Anatomy: four curves, not one

Walk around any radial cam with a caliper and you will find that the drawing has four different "radii" on it, and confusing them is the commonest error in cam design.

**The base circle** is the smallest circle of the actual machined metal, centred on the shaft. It is a manufacturing datum and the thing a drawing tolerance is put on.

**The prime circle** is the base circle grown by the radius of the follower's contacting element — for a roller follower of radius $r_r$,

$$
r_p = r_b + r_r
$$

It is the circle traced by the roller *centre* when the follower is on the base circle, and it is the quantity that governs the pressure angle. For a knife-edge follower $r_r = 0$ and the two circles coincide.

**The pitch curve** is the path of the roller centre relative to the cam — the locus of the *trace point*. It is the curve you actually compute from the displacement law, and for a radial in-line roller follower it is simply

$$
r(\theta) = r_p + s(\theta)
$$

**The profile** (or *working curve*) is the metal surface: the envelope of all the roller positions, i.e. the pitch curve offset inwards by $r_r$. It is the curve the cutter follows, and it is the curve that gets undercut.

::: definition The four cam circles {#def-circles}
For a radial cam of base-circle radius $r_b$ driving a roller follower of radius $r_r$ with displacement $s ( \theta )$, the four curves are

$$
r_{\mathrm{base}} = r_b , \qquad r_{\mathrm{prime}} = r_p = r_b + r_r , \qquad r_{\mathrm{pitch}} ( \theta ) = r_p + s ( \theta ) , \qquad r_{\mathrm{profile}} = \text{offset of the pitch curve by } r_r
$$

The base circle and the profile are geometry you cut; the prime circle and the pitch curve are geometry you calculate. **For a knife-edge follower $r_r = 0$ and the four collapse to two.** (A flat-faced follower has no trace point at a fixed distance from the surface, and its profile is found as the envelope of the face lines instead.)
:::

::: example Which radius is it? {#ex-anatomy}
A cam drawing calls out a base-circle diameter of $\varnothing 40\ \mathrm{mm}$, a roller follower of $18\ \mathrm{mm}$ diameter, and a maximum lift of $16\ \mathrm{mm}$. What is the largest radius anywhere on the machined part, and what is the largest radius of the *pitch* curve?

**Answer.** The pitch curve's maximum radius is $r_p + h = (20 + 9) + 16 = 45\ \mathrm{mm}$. The machined profile's maximum radius is the base circle plus the lift, $20 + 16 = 36\ \mathrm{mm}$ — nine millimetres less, because the profile is the pitch curve pulled in by the roller radius.

::: solution
The two curves are $r_r$ apart along every common normal, but their *radii of curvature* differ: the profile's radius of curvature is $\rho_{\mathrm{pitch}} - r_r$ on convex parts and $\left| \rho_{\mathrm{pitch}} \right| + r_r$ on concave parts, and it is the curvature, not the radius, that decides whether the cutter can produce the surface. A dimension quoted to a machinist as "the maximum radius" without saying which curve is meant can produce a part that is off by the roller radius, $9\ \mathrm{mm}$, wherever the roller touches.
:::
:::

## The classification, and what each choice costs

| Family | Contact | Can push? | Can pull? | Wear | Use |
|---|---|---|---|---|---|
| Radial (disc), knife edge | point | yes | no | severe | layout studies only |
| Radial, roller | line | yes | no | moderate | the default |
| Radial, flat face | line | yes | no | low | high speed, no reversal |
| Radial, spherical (curved) face | point/line | yes | no | low | where a flat face would need too large a cam |
| Face (end) cam, grooved | line | yes | yes | moderate | two-direction motion, indexing |
| Cylindrical (barrel) | line | yes | yes | moderate | large displacement in a short envelope |
| Conjugate (double) cam | line | yes | yes | low | precision, no spring needed |
| Split (preloaded) cam | line | yes | yes | low | followers carried on two rollers |

**The single most consequential entry in that table is "Can pull? no".** A spring-closed follower can only be pushed, so wherever the follower must decelerate faster than the spring can decelerate it, the contact force falls towards zero, and a cam that loses contact no longer controls the motion. **Grooved face cams, barrel cams and conjugate cams have two flanks and can therefore pull**, which is why indexing drums and printing-press gripper cams are made that way.

**Force closure versus form closure.** A spring-closed cam is *force closed*: the geometry governs the motion only while the spring keeps the follower in contact. A conjugate or grooved cam is *form closed*: the geometry governs always, and the price is a second contact that must be preloaded or toleranced against backlash, which costs money and makes the assembly sensitive to thermal growth.

::: quiz
A radial cam with a flat-faced follower is run at high speed. The designer is told the follower is jumping the profile near the end of the rise. Changing the follower to a roller of the same mass fixes it. Why?

- [ ] The roller has a smaller contact area and therefore a lower contact pressure
- [x] A flat face cannot follow a concave stretch of profile; where the profile needs one, the face bridges it and touches at the edges, so the motion departs from the design
- [ ] The roller eliminates sliding, and sliding is what causes jump
- [ ] The roller increases the prime-circle radius and therefore lowers the pressure angle

::: solution
Half-true answers are the dangerous kind. A flat-faced follower has zero pressure angle (for a face perpendicular to its stroke), so the pressure angle is not the issue, and a roller does not remove sliding in the follower's guide. What happens is that a flat-faced follower requires the profile to be convex everywhere, $\rho = r_b + s + s'' > 0$ (with $s'' = d^2 s / d\theta^2$). Where that fails, the profile the displacement law asks for has a concave stretch that the flat face bridges: it touches at two points, the follower does not execute the designed motion, and the result looks like a dynamic jump although it is a geometric failure. A roller of finite radius can follow a concave surface as long as the concave radius of curvature is larger than its own radius.
:::
:::

## The displacement diagram is the design

Everything about a cam follows from one graph: lift against cam angle. The profile, the forces, the stresses, the speed limit and the failure mode are all read off it. The first thing it must be checked for is **which derivative is first discontinuous**.

$$
s = h f ( x ) , \quad x = \frac{\theta}{\beta} , \qquad
v = \frac{h \omega}{\beta} f' ( x ) , \qquad
a = \frac{h \omega^{2}}{\beta^{2}} f'' ( x ) , \qquad
j = \frac{h \omega^{3}}{\beta^{3}} f''' ( x )
$$

The three dimensionless coefficients $k_v , k_a , k_j$ are the peak magnitudes of $f', f'', f'''$, and they carry the design content of the motion law.

| Law | $f ( x )$ | $k_v$ | $k_a$ | $k_j$ | first discontinuous derivative |
|---|---|---|---|---|---|
| Uniform | $x$ | 1.000 | $\infty$ | $\infty$ | velocity, at both ends |
| Parabolic | $2x^{2}$, $1 - 2 ( 1 - x )^{2}$ | 2.000 | 4.000 | $\infty$ | acceleration, at three points |
| Simple harmonic | $\tfrac{1}{2} \left( 1 - \cos \pi x \right)$ | 1.571 | 4.935 | $\infty$ | acceleration, at both ends |
| Cycloidal | $x - \dfrac{\sin 2 \pi x}{2 \pi}$ | 2.000 | 6.283 | 39.48 | jerk, at both ends |
| 3-4-5 polynomial | $10x^{3} - 15x^{4} + 6x^{5}$ | 1.875 | 5.774 | 60.00 | jerk, at both ends |
| 4-5-6-7 polynomial | $35x^{4} - 84x^{5} + 70x^{6} - 20x^{7}$ | 2.188 | **7.513** | 52.50 | none up to jerk — $C^{3}$ |
| 5-6-7-8-9 polynomial | $126x^{5} - 420x^{6} + 540x^{7} - 315x^{8} + 70x^{9}$ | 2.461 | 9.372 | 78.75 | none up to the fourth derivative — $C^{4}$ |
| Modified sine | three-segment sine blend | 1.760 | 5.528 | 69.47 | jerk, at both ends |

::: exercise Derivation: why the polynomial family is $C^{3}$ {#deriv-continuity level=3}
A rise from one dwell to another, normalised to $f(0) = 0$, $f(1) = 1$, must match the dwells in slope and curvature: $f'(0) = f''(0) = 0$ and $f'(1) = f''(1) = 0$. Show that these six conditions give the 3-4-5 polynomial, find its jerk at the ends, and show that adding $f'''(0) = f'''(1) = 0$ gives the 4-5-6-7 polynomial. Compare their $k_v$ and $k_a$.

::: solution
**Six conditions** need six coefficients, so a polynomial of degree five. With $f'(0) = f''(0) = 0$ and $f(0) = 0$ the constant, linear and quadratic terms vanish, leaving $f = c_3 x^3 + c_4 x^4 + c_5 x^5$. The three conditions at $x = 1$,
$$
c_3 + c_4 + c_5 = 1, \qquad 3 c_3 + 4 c_4 + 5 c_5 = 0, \qquad 6 c_3 + 12 c_4 + 20 c_5 = 0,
$$
give $c_3 = 10$, $c_4 = -15$, $c_5 = 6$: the **3-4-5 law**. Its jerk is $f''' = 60 - 360 x + 360 x^2$, so $f'''(0) = f'''(1) = 60$: the acceleration starts and ends at zero, but its slope jumps from $0$ to $60\, h \omega^3 / \beta^3$ the instant the rise begins — a finite step in jerk.
**Eight conditions** ($f''' = 0$ at both ends as well) need degree seven, and the same procedure gives $f = 35 x^4 - 84 x^5 + 70 x^6 - 20 x^7$, the **4-5-6-7 law**. Its jerk is continuous, zero at both ends and largest in magnitude, $52.5$, at $x = 0.5$.
**The cost** is visible in the table: $k_a$ rises from $5.774$ to $7.513$, a **30 per cent higher peak acceleration**, and $k_v$ from $1.875$ to $2.188$, a **17 per cent higher peak velocity**. Smoothness at the joins is bought with higher peaks in the interior. It is usually worth it at high speed because a jerk step is a sudden change in the rate of change of force, which excites the follower train's natural frequencies.
:::
:::

::: widget plot
f: 0.5-0.5*cos(x*pi); x-sin(2*x*pi)/(2*pi); 35*pow(x,4)-84*pow(x,5)+70*pow(x,6)-20*pow(x,7)
x: 0, 1
y: -0.05, 1.05
labels: \text{harmonic}; \text{cycloidal}; \text{4-5-6-7}
caption: The three displacement laws, normalised to unit lift over unit angle. **They are nearly indistinguishable at the ends and differ by at most eight per cent of the lift** (harmonic against 4-5-6-7, near $x = 0.3$ and $0.7$). The harmonic law is the least steep through mid-lift ($k_v = 1.57$) and the 4-5-6-7 the steepest ($k_v = 2.19$). Differences this small are hard to see on a displacement diagram, which is why a law is chosen from its derivatives, not from the displacement curve.
:::

::: widget plot
f: 4.9348*cos(x*pi); 6.2832*sin(2*x*pi); 420*pow(x,2)-1680*pow(x,3)+2100*pow(x,4)-840*pow(x,5)
x: 0, 1
y: -8.5, 8.5
labels: \text{harmonic}; \text{cycloidal}; \text{4-5-6-7}
caption: The normalised acceleration $f''$ of the same three laws: simple harmonic, cycloidal, 4-5-6-7. **Read the ends of the curves, not only the peaks: the harmonic law starts at $+4.93$ and ends at $-4.93$, a step from the zero of the dwells, while the other two start and end at zero.** The 4-5-6-7 curve reaches $\pm 7.51$ at $x = 0.276$ and $0.724$ — twenty per cent above the cycloidal's $6.28$ — and that higher peak, not the smoothness, sets the spring force needed against float.
:::

::: quiz
A cam must rise $30\ \mathrm{mm}$ in $90^{\circ}$ and the machine runs at a fixed speed that cannot be changed. The designer swaps a cycloidal law for a 4-5-6-7 polynomial hoping to reduce the peak follower acceleration. What happens?

- [ ] The peak acceleration falls by about twenty per cent
- [x] The peak acceleration rises by about twenty per cent, and the peak velocity by about nine per cent
- [ ] Nothing changes, because both laws have the same lift and the same angle
- [ ] The peak acceleration falls but the jerk becomes infinite

::: solution
$7.513 / 6.283 = 1.196$ and $2.188 / 2.000 = 1.094$. The 4-5-6-7 polynomial is chosen for its **continuous jerk** (the cycloidal jerk steps by $39.5$ at each end), which matters for vibration and noise, not for its acceleration. If the constraint is follower float, the polynomial goes the wrong way: the modified sine at $k_a = 5.53$ or the parabolic law at $4.00$ have lower peaks, and both cost elsewhere (the parabolic law has acceleration steps).
:::
:::

::: example Which law, which machine {#ex-lawchoice}
Four cams, all with the same $20\ \mathrm{mm}$ lift over the same $120^{\circ}$ at the same $600\ \mathrm{rev / min}$, on four different machines: a knitting machine taking a yarn carrier through a loop of thread; a packaging line indexing a bottle of liquid; a printing-press gripper carrying a sheet through a nip; and a press feed advancing $20\ \mathrm{mm}$ of strip steel into a die. Which motion law for which?

**Answer.** Compute the common scale factors first: $\omega = 62.83\ \mathrm{rad / s}$, $\beta = 2.094\ \mathrm{rad}$, $\omega / \beta = 30.0\ \mathrm{s^{- 1}}$, so $v_{\max} = 0.020 \times 30.0 \, k_v = 0.6 \, k_v\ \mathrm{m / s}$ and $a_{\max} = 0.020 \times 900 \, k_a = 18 \, k_a\ \mathrm{m / s^{2}}$.

| Machine | What hurts | Law | $k_a$ | $a_{\max}$ |
|---|---|---|---|---|
| Knitting | yarn tension follows the follower's acceleration; abrupt changes snap the yarn | 4-5-6-7 | 7.51 | $135\ \mathrm{m / s^{2}}$ |
| Bottle index | the liquid sloshes; the payload's acceleration history must be smooth | 5-6-7-8-9 | 9.37 | $169\ \mathrm{m / s^{2}}$ at this angle — in practice the index angle is lengthened until the bottle's acceleration is acceptable |
| Press feed | strip inertia; the lowest peak acceleration for a given time | modified sine | 5.53 | $100\ \mathrm{m / s^{2}}$ |
| Gripper | form-closed, so float is irrelevant; a well-proven smooth law is enough | cycloidal | 6.28 | $113\ \mathrm{m / s^{2}}$ |

::: solution
The point of the exercise is that **the ranking of the laws is not fixed**. The 5-6-7-8-9 polynomial has the highest $k_a$ in the table and is nonetheless a reasonable choice for the bottle, because what matters there is the smoothness of the bottle's acceleration (its jerk and the next derivative), not the follower's peak acceleration — and the peak is then brought down by giving the index a longer cam angle. **A motion law is chosen for a cam and its payload together, not for the cam alone.**
:::
:::

## Pressure angle: the cam's transmission angle

::: definition Pressure angle {#def-psi}
The **pressure angle** $\psi$ of a cam is the angle at the contact point between the common normal to the two surfaces — the line along which the cam pushes — and the direction in which the follower is free to move. The complementary angle $90^{\circ} - \psi$ plays the role of the transmission angle of [[mechanisms/mechanisms-mobility]]. For a translating roller follower with offset $e$,

$$
\tan \psi = \frac{d s / d \theta - e}{\sqrt{r_p^{2} - e^{2}} + s}
$$

with $d s / d \theta$ in length per radian. The side thrust on the guide is $F \tan \psi$ and the friction it causes in the guide is $\mu F \tan \psi$.
:::

The pressure angle $\psi$ is the angle between the direction the cam pushes and the direction the follower is allowed to move. Like the transmission angle of a linkage, it must be kept out of the range where the follower binds in its guide.

For a translating roller follower with zero offset the derivation takes two lines. The contact normal passes through the roller centre and is perpendicular to the pitch curve $r = r_p + s$; for a polar curve the angle between the normal and the radius vector satisfies $\tan \psi = r' / r$, so

$$
\tan \psi = \frac{d r / d \theta}{r} = \frac{d s / d \theta}{r_p + s}
$$

and with an offset $e$, measured so that a positive $e$ reduces the pressure angle on the rise,

$$
\boxed{ \; \tan \psi = \frac{d s / d \theta - e}{\sqrt{r_p^{2} - e^{2}} + s} \; }
$$

**Two things follow, and both are design levers.** First, $\psi$ is largest where $d s / d \theta$ is large *and* $s$ is still small — for a symmetric law slightly before mid-lift, not at the ends. Second, the prime-circle radius $r_p$ appears alone in the denominator, so **the direct way to reduce the pressure angle is a bigger cam**; an offset or a longer rise angle are the alternatives, and each is a trade.

::: widget plot
f: atan(8.8126/(x+4.5))*180/pi
x: 12, 40
y: 5, 35
caption: The mid-lift estimate of the peak pressure angle for a $9\ \mathrm{mm}$ lift over $128^{\circ}$ on a 4-5-6-7 law, against prime-circle radius in millimetres. **The curve falls only slowly: the $25^{\circ}$ line is crossed at $r_p = 14.4\ \mathrm{mm}$, and bringing the angle down to $11^{\circ}$ needs $r_p = 40\ \mathrm{mm}$** — a cam almost three times the diameter and, for the same width, about sixty times the moment of inertia about its axis. (The exact maximum, taken over the whole rise, is a few tenths of a degree higher than this estimate.)
:::

**Acceptable limits.** A common design limit for a translating roller follower is $\psi \le 30^{\circ}$, and many designers use $25^{\circ}$ on a loaded rise for margin; oscillating (pivoted) followers tolerate larger values, up to about $45^{\circ}$. These are not stiffness limits but **side-thrust and friction** limits: the side force on the guide is $F \tan \psi$, and the friction force it creates is $\mu F \tan \psi$, which at $\psi = 25^{\circ}$ and $\mu = 0.15$ is $0.15 \times 0.466 = 7\ \%$ of the transmitted force for a simple guide. An overhung follower stem multiplies the guide reactions by its lever ratio, and as $\psi$ grows the friction can approach the driving force and the follower jams. That is why a cam with a long guide on rolling bearings can run at $30^{\circ}$ where a cam with a short plain bushing cannot.

::: example The offset is not free {#ex-offset}
The valve cam of the worked example below has $\left( d s / d \theta \right)_{\max} = 8.81\ \mathrm{mm / rad}$ on the opening flank at $s = 4.5\ \mathrm{mm}$, and $- 8.68\ \mathrm{mm / rad}$ on the closing flank at the same lift, with $r_p = 24\ \mathrm{mm}$. An engineer proposes a $3\ \mathrm{mm}$ offset to reduce the pressure angle.

**Answer.** With the offset, $\sqrt{r_p^2 - e^2} + s = \sqrt{576 - 9} + 4.5 = 23.81 + 4.5 = 28.31\ \mathrm{mm}$. On the opening flank, taking the offset with the sign that helps,

$$
\tan \psi_{\mathrm{open}} = \frac{8.81 - 3.00}{28.31} = 0.2052 \ \Rightarrow \ \psi = 11.6^{\circ} \quad \text{against} \quad \tan^{-1} \frac{8.81}{28.5} = 17.2^{\circ}
$$

On the closing flank $d s / d \theta$ has the opposite sign, so the same offset now *adds*:

$$
\tan \psi_{\mathrm{close}} = \frac{| - 8.68 - 3.00 |}{28.31} = 0.4126 \ \Rightarrow \ \psi = 22.4^{\circ}
$$

::: solution
The offset moves the peak from one flank to the other and makes the worst case worse: $17.2^{\circ}$ and $16.9^{\circ}$ become $11.6^{\circ}$ and $22.4^{\circ}$. **An offset is useful when one flank is much more demanding than the other** — a short, fast opening and a long, slow closing, for example — **and a liability for symmetric cams.** The offset also moves the line of action off the guide's centreline, which costs space and puts a bending moment on the follower stem.
:::
:::

## Undercutting: when the profile cannot be cut

::: definition Undercutting {#def-undercut}
A roller-follower cam is **undercut** where the radius of curvature $\rho$ of the pitch curve falls below the roller radius $r_r$, so that the inward offset by $r_r$ crosses itself and the profile develops a cusp. Formally, with $r = r_p + s$, $r' = d s / d \theta$, $r'' = d^{2} s / d \theta^{2}$,

$$
\rho = \frac{ \left[ r^{2} + r'^{2} \right]^{3 / 2} }{ r^{2} + 2 r'^{2} - r r'' } \qquad \text{and the requirement is} \qquad \rho > r_r \ \ \text{wherever} \ \ r^{2} + 2 r'^{2} - r r'' > 0
$$

For a flat-faced follower the corresponding requirement is $r_b + s + d^{2} s / d \theta^{2} > 0$ everywhere. **Undercutting is a convex-side phenomenon**: on a concave stretch of the pitch curve the profile radius is $\left| \rho \right| + r_r$, larger than the pitch radius, and nothing is cusped.
:::

The profile is the pitch curve offset inwards by the roller radius. Offsetting a curve inwards by more than its own radius of curvature makes the offset cross itself, and a cutter that follows it removes metal that the roller needs. The cam then has a **cusp**: the roller rides on a sharp corner instead of on the designed surface, the lift departs from the displacement diagram, and the corner is a stress raiser that wears and fatigues quickly.

For a radial roller follower the signed radius of curvature of the pitch curve is

$$
\rho = \frac{ \left[ r^{2} + \left( r' \right)^{2} \right]^{3 / 2} }{ r^{2} + 2 \left( r' \right)^{2} - r r'' } , \qquad r = r_p + s , \quad r' = \frac{d s}{d \theta} , \quad r'' = \frac{d^{2} s}{d \theta^{2}}
$$

and the profile is sound where

$$
\phi = \rho - r_r > 0 \qquad \text{wherever} \qquad r^{2} + 2 \left( r' \right)^{2} - r r'' > 0
$$

The condition on the right restricts the check to **convex** parts of the pitch curve. On a concave part $\rho$ is negative and the profile radius is $\left| \rho \right| + r_r$ — *larger*, not smaller — which is why a roller can follow a valley it could not follow as a ridge.

For a **flat-faced follower** (face perpendicular to the stroke) the profile radius of curvature has a simple expression, because the profile is the envelope of a family of lines rather than of circles:

$$
\boxed{ \; \rho_{\mathrm{profile}} = r_b + s + \frac{d^{2} s}{d \theta^{2}} \; } \qquad \text{and} \qquad \ell_{\mathrm{face}} = 1.25 \left| \frac{d s}{d \theta} \right|_{\max}
$$

The first must be positive everywhere or the flat face bridges a concavity and touches only at its edges; the second gives the half-width of the follower face, because the contact point moves along the face a distance $d s / d \theta$ from the follower axis; the factor $1.25$ is a customary margin for the edge radius and misalignment.

::: widget plot
f: pow(pow(18.9-4.5*cos(x*pi),2)+pow(11.5714*sin(x*pi),2),1.5)/((18.9-4.5*cos(x*pi))*(18.9-4.5*cos(x*pi))+2*pow(11.5714*sin(x*pi),2)-(18.9-4.5*cos(x*pi))*(29.755*cos(x*pi))); pow(pow(24.5-4.5*cos(x*pi),2)+pow(11.5714*sin(x*pi),2),1.5)/((24.5-4.5*cos(x*pi))*(24.5-4.5*cos(x*pi))+2*pow(11.5714*sin(x*pi),2)-(24.5-4.5*cos(x*pi))*(29.755*cos(x*pi)))
x: 0, 1
y: -60, 60
caption: Signed pitch-curve radius of curvature, in millimetres, for a $9\ \mathrm{mm}$ simple-harmonic rise over $70^{\circ}$, for prime circles of $14.4\ \mathrm{mm}$ (lower curve) and $20\ \mathrm{mm}$ (upper), against the fraction $x$ of the rise. **Draw a horizontal line at $+12$, the radius of a $24\ \mathrm{mm}$ roller: the lower curve is below it over the last $25\ \%$ of the rise, which is the undercut region, and its minimum is $10.3\ \mathrm{mm}$ at the end of the rise — $1.7\ \mathrm{mm}$ short of the roller radius.** Both curves are negative near $x = 0$, and that is not undercutting: it is the concave start of the harmonic rise, where the profile radius is $\left| \rho \right| + r_r$ and can be cut. The smallest prime circle that avoids undercutting with this roller is $16.8\ \mathrm{mm}$.
:::

::: example The flat face that cannot be made to work {#ex-flatface}
**Specification.** $h = 20\ \mathrm{mm}$ in $\beta = 60^{\circ} = 1.0472\ \mathrm{rad}$, 3-4-5 polynomial, roller or flat-face follower.

**Pressure angle (roller).** $\left( d s / d \theta \right)_{\max} = k_v h / \beta = 1.875 \times 20 / 1.0472 = 35.81\ \mathrm{mm / rad}$ at $s = 10\ \mathrm{mm}$. For $\psi \le 25^{\circ}$ the mid-lift estimate is

$$
r_p \ge \frac{35.81}{\tan 25^{\circ}} - 10 = 76.8 - 10 = 66.8\ \mathrm{mm}
$$

and maximising $\left( d s / d \theta \right) / \left( r_p + s \right)$ over the whole rise gives $r_p = 67.4\ \mathrm{mm}$.

**Roller follower, undercut check.** With $r_p = 67.4\ \mathrm{mm}$ and $r_r = 10\ \mathrm{mm}$ the minimum convex pitch radius of curvature is $39.5\ \mathrm{mm}$ at $x = 0.79$, so $\phi_{\min} = 29.5\ \mathrm{mm} > 0$. **Sound.** The base circle is $r_b = 57.4\ \mathrm{mm}$ and the cam is $2 \times (57.4 + 20) = \varnothing 155\ \mathrm{mm}$ at its widest.

**Flat-face follower, convexity check.** $\rho = r_b + s + s''$ with $s'' = h f'' / \beta^{2}$. Its most negative value is $- k_a h / \beta^{2} = - 5.774 \times 20 / 1.0966 = - 105.3\ \mathrm{mm}$ at $x = 0.789$, where $s = 18.7\ \mathrm{mm}$; minimising $s + s''$ over the rise gives $- 86.7\ \mathrm{mm}$, so

$$
r_b > 86.7\ \mathrm{mm}
$$

and the face half-width must be $1.25 \times 35.81 = 44.8\ \mathrm{mm}$.

::: solution
**The flat face needs a cam about $\varnothing 213\ \mathrm{mm}$ across, $2 \times (86.7 + 20)$, to do what a roller does at $\varnothing 155\ \mathrm{mm}$, and a face $90\ \mathrm{mm}$ wide.** Its pressure angle is zero (the face is perpendicular to the stroke), so the extra size buys nothing there. The reason is in the two formulas: the roller's size is set by $d s / d \theta$, here $35.8\ \mathrm{mm}$, while the flat face's convexity criterion is set by $d^{2} s / d \theta^{2}$, here $105\ \mathrm{mm}$ — about three times larger, because a $60^{\circ}$ rise is short and $s''$ scales as $1 / \beta^{2}$ while $s'$ scales as $1 / \beta$.
**The general rule:** the flat-faced follower suits gentle, long-angle lifts, where its compactness and low contact stress are worth having, and is a poor choice for short, sharp lifts, where the $1 / \beta^{2}$ term dominates and the cam must grow larger than the roller cam.
:::
:::

## The sizing procedure

Cam design is an iteration, and it usually converges in two or three passes because the geometric constraints all improve as $r_p$ grows.

| Step | What you do | What can fail |
|---|---|---|
| 1 | Lay out the cycle: rise, dwell, return, dwell, in cam degrees. Total must be $360^{\circ}$ | Not enough dwell for the process |
| 2 | Pick a motion law per segment from the $k_v , k_a , k_j$ table | Peak acceleration too high for the spring |
| 3 | Size $r_p$ from $\psi_{\max}$ | Cam will not fit the envelope |
| 4 | Check $\phi_{\min} > 0$ (roller) or $\rho > 0$ (flat face) | Undercut — grow $r_p$ or soften the law |
| 5 | Compute $a_{\max}$, then $m a$ against the spring force at that lift | **Cam float** — the usual limit |
| 6 | Compute the peak contact force and the Hertz stress | Surface fatigue, wear |
| 7 | Check the follower's and spring's natural frequencies against the excitation | Resonance, noise, valve-spring surge |
| 8 | Generate the profile numerically, add the tolerances, cut | Cutter radius larger than the smallest concave profile radius |

**Step 5 comes after the geometry and before the stress, and in practice it is step 5 that sends you back to step 2.** The geometry of a cam is nearly always feasible; the force history often is not.

## Worked example: an overhead-camshaft valve lobe

**Specification.** A four-stroke four-cylinder engine, twin overhead camshafts, four valves per cylinder, rated at $6000\ \mathrm{rev / min}$ with a $6600\ \mathrm{rev / min}$ redline. The camshaft turns at half crank speed. One lobe must give $h = 9.0\ \mathrm{mm}$ of valve lift, opening over $128^{\circ}$ of cam, holding full lift for $102^{\circ}$, and closing over $130^{\circ}$ — $360^{\circ}$ in all. (The long full-lift dwell keeps the arithmetic simple; real valve lobes have no dwell at full lift.) The follower is an in-line roller of $18\ \mathrm{mm}$ diameter and $14\ \mathrm{mm}$ width on a $15\ \mathrm{mm}$ base-circle radius. The effective reciprocating mass of the valve train is $m = 0.24\ \mathrm{kg}$ and the valve spring has $k = 32\ \mathrm{N / mm}$ with $200\ \mathrm{N}$ installed load at the closed seat.

**Step 1 — the cycle and the law.** $128 + 102 + 130 = 360^{\circ}$ ✓. Both flanks get the 4-5-6-7 polynomial: its jerk is continuous, so the force on the valve train changes smoothly and excites less vibration.

**Step 2 — kinematics.** At rated engine speed the cam turns at $3000\ \mathrm{rev / min}$, $\omega = 3000 \times 2 \pi / 60 = 314.16\ \mathrm{rad / s}$.

$$
\frac{\omega}{\beta_1} = \frac{314.16}{2.2340} = 140.63\ \mathrm{s^{-1}} \qquad \frac{\omega}{\beta_2} = \frac{314.16}{2.2689} = 138.46\ \mathrm{s^{-1}}
$$

| | opening | closing |
|---|---|---|
| $v_{\max} = k_v h \omega / \beta$ | $2.77\ \mathrm{m / s}$ | $2.73\ \mathrm{m / s}$ |
| $a_{\max} = k_a h \omega^{2} / \beta^{2}$ | $1337\ \mathrm{m / s^{2}} = 136\ g$ | $1296\ \mathrm{m / s^{2}} = 132\ g$ |
| $j_{\max} = k_j h \omega^{3} / \beta^{3}$ | $1.31 \times 10^{6}\ \mathrm{m / s^{3}}$ | $1.25 \times 10^{6}\ \mathrm{m / s^{3}}$ |

**Step 3 — pressure angle.** $\left( d s / d \theta \right)_{\max} = 2.1875 \times 9.0 / 2.2340 = 8.81\ \mathrm{mm / rad}$ at $s = 4.5\ \mathrm{mm}$, with $r_p = 15 + 9 = 24\ \mathrm{mm}$; the mid-lift estimate is

$$
\tan \psi = \frac{8.81}{24 + 4.5} = 0.309 \ \Rightarrow \ \psi = 17.2^{\circ} \ \text{opening}, \qquad 16.9^{\circ} \ \text{closing}
$$

and the exact maxima over each flank are $\boxed{ \psi_{\max} = 17.3^{\circ} }$ opening (at $60.3^{\circ}$ of cam) and $17.1^{\circ}$ closing. Comfortably inside $25^{\circ}$; the estimate suggests the prime circle could shrink to about $14.4\ \mathrm{mm}$ before reaching the limit — but see step 4.

**Step 4 — undercutting.** The minimum convex pitch-curve radius of curvature is $\rho = 22.5\ \mathrm{mm}$ at $88.5^{\circ}$ ($x = 0.69$ of the opening), so $\phi_{\min} = 22.5 - 9 = 13.5\ \mathrm{mm} > 0$. **Sound, with a wide margin**: a roller of up to $22.5\ \mathrm{mm}$ radius would still not cusp the profile. Because the 4-5-6-7 law has zero acceleration at both ends of each flank, the pitch-curve curvature is continuous where the flanks join the base circle and the full-lift arc.

**Step 5 — contact force and cam float.** The follower equation is $m \ddot{s} = F_c - F_s$, so

$$
F_c ( \theta ) = \underbrace{F_0 + k s ( \theta )}_{\text{spring}} + \underbrace{m \ddot{s} ( \theta )}_{\text{inertia, signed}}
$$

| Cam angle | $s$ (mm) | $\ddot{s}$ (m/s²) | Spring (N) | Inertia (N) | $F_c$ (N) |
|---|---|---|---|---|---|
| $0^{\circ}$ seat | 0 | 0 | 200 | 0 | 200 |
| $38.4^{\circ}$ | 1.13 | $+1319$ | 236 | $+317$ | **553** (peak) |
| $64^{\circ}$ mid-lift | 4.50 | 0 | 344 | 0 | 344 |
| $89.6^{\circ}$ | 7.87 | $-1319$ | 452 | $-317$ | **135** (minimum) |
| $128^{\circ}$–$230^{\circ}$ dwell | 9.00 | 0 | 488 | 0 | 488 |
| $269^{\circ}$ | 7.86 | $-1277$ | 452 | $-307$ | 145 |

The minimum contact force is $135\ \mathrm{N}$ near $89.6^{\circ}$ on the opening flank. Contact is lost where $F_0 + k s + m \ddot s$ first reaches zero; the inertia term goes as $N^{2}$ while the spring term does not, and the critical point is at $90.6^{\circ}$, where the spring force is $454.6\ \mathrm{N}$ and the inertia term at rated speed is $-319.0\ \mathrm{N}$:

$$
N_{\mathrm{float}} = 6000 \sqrt{ \frac{454.6}{319.0} } = 7163\ \mathrm{rev / min}
$$

**against a $6600\ \mathrm{rev / min}$ redline — an 8.5 per cent margin in speed** (about 18 per cent in force). Below $5000\ \mathrm{rev / min}$ the spring looks much stiffer than necessary; it is sized for the top of the speed range.

::: widget plot
f: 454.6-319.0*pow(x/6000,2)
x: 5000, 8000
y: -200, 350
caption: Contact force at the critical cam angle ($90.6^{\circ}$) in newtons against **crankshaft** speed in revolutions per minute. **The curve crosses zero at $7163$ revolutions per minute.** It is a downward parabola in speed, so the margin disappears quickly at the top of the range: between $6000$ and $6600$ revolutions per minute the force falls from $136$ to $69$ newtons. A stiffer spring moves the crossing up, at the cost of higher seat load, contact stress and wear on the cam.
:::

**Step 6 — Hertz stress.** The peak force of $553\ \mathrm{N}$ occurs at $38.4^{\circ}$, where the pitch-curve radius of curvature is $48.3\ \mathrm{mm}$, so the profile is convex with $\phi = 39.3\ \mathrm{mm}$. Treating the contact as two steel cylinders ($E = 207\ \mathrm{GPa}$, $\nu = 0.3$) of length $b = 14\ \mathrm{mm}$,

$$
\frac{1}{R} = \frac{1}{9.0} + \frac{1}{39.3} \ \Rightarrow \ R = 7.32\ \mathrm{mm} , \qquad \frac{1}{E^{*}} = \frac{1 - \nu_{1}^{2}}{E_1} + \frac{1 - \nu_{2}^{2}}{E_2} = \frac{2 \times 0.91}{207\,000} \ \Rightarrow \ E^{*} = 113.7\ \mathrm{GPa}
$$

$$
p_0 = \sqrt{ \frac{F E^{*}}{\pi b R} } = \sqrt{ \frac{553 \times 113\,700}{\pi \times 14 \times 7.32} } = \boxed{ 442\ \mathrm{MPa} } , \qquad a = \sqrt{ \frac{4 F R}{\pi b E^{*}} } = 0.057\ \mathrm{mm}
$$

The contact band is only $2a = 0.114\ \mathrm{mm}$ wide, and the lobe passes through it once per camshaft revolution — $3000$ times a minute at rated speed. The maximum shear stress is $0.30 p_0 = 133\ \mathrm{MPa}$ at $0.79 a = 0.045\ \mathrm{mm}$ below the surface. Cam surfaces are therefore hardened to a case depth (typically several tenths of a millimetre) well below the depth of maximum shear, so that the subsurface stress peak lies in hard material with margin for wear and grinding.

**Step 7 — valve-spring surge.** The spring is $d = 3.35\ \mathrm{mm}$ wire, $D = 18\ \mathrm{mm}$ mean coil diameter, $n = 6.5$ active coils, $G = 79\ \mathrm{GPa}$, giving $k = G d^{4} / ( 8 D^{3} n ) = 32.8\ \mathrm{N / mm}$ and an active-coil mass $m_s = \rho \, \pi D n \, \pi d^2 / 4 = 25.4\ \mathrm{g}$. With both ends of the spring held (seat and retainer), its first longitudinal ("surge") natural frequency is

$$
f_1 = \frac{1}{2} \sqrt{ \frac{k}{m_s} } = \frac{1}{2} \sqrt{ \frac{32\,800}{0.0254} } = 568\ \mathrm{Hz}
$$

The cam turns at $50\ \mathrm{Hz}$ at rated speed, so $f_1$ is about the $11$th harmonic of the cam frequency; at the redline ($55\ \mathrm{Hz}$) it is about the $10$th, and at the float speed ($59.7\ \mathrm{Hz}$) about the $9.5$th. The lift curve's harmonic content falls with order but is not zero there, so as the engine speeds up, lower and stronger harmonics approach the surge frequency. **At the top of the speed range the rigid-follower model stops being reliable for two reasons at once: contact is close to being lost, and the spring's own vibration modifies the force it applies.** Beyond this, designers turn to dual or conical ("beehive") springs, to desmodromic valve gear, or — in Formula 1 since Renault's EF15B engine of 1986 — to pneumatic valve return, whose gas spring has very little moving mass.

**Step 8 — cam torque.** By virtual work the instantaneous camshaft torque is $T = F_c \, d s / d \theta$, giving a peak of $3.82\ \mathrm{N \cdot m}$ at $51.5^{\circ}$, a reverse peak of $- 3.72\ \mathrm{N \cdot m}$ at $307.5^{\circ}$, and an r.m.s. value of $1.60\ \mathrm{N \cdot m}$ per lobe. **The net work over a cycle is zero apart from friction** — in this frictionless model the spring returns all the energy it stores — so the camshaft drive sees a torque that fluctuates by about $\pm 4\ \mathrm{N \cdot m}$ per lobe. Summed over all the lobes on a shaft, this fluctuating torque is a torsional excitation of the camshaft drive (chain or belt) that must be checked.

## Generating the profile

The pitch curve is the curve you compute and the profile is the curve you cut. For a radial cam with an in-line translating roller follower, put $X ( \theta ) = r_p + s ( \theta )$. The roller centre traces

$$
C ( \theta ) = \left( X \cos \theta , \; X \sin \theta \right)
$$

and the profile is the offset at distance $r_r$ along the inward normal to that curve. Differentiating, the tangent is $\left( X' \cos \theta - X \sin \theta , \; X' \sin \theta + X \cos \theta \right)$ with $X' = d s / d \theta$, and rotating it through $90^{\circ}$ and normalising gives the inward unit normal.

::: exercise Derivation: the profile as a CNC path {#deriv-profile level=3}
Show that the cam profile of a radial in-line roller-follower cam is

$$
\boxed{ \;
\begin{aligned}
X_{\mathrm{prof}} &= X \cos \theta - r_r \, \frac{X' \sin \theta + X \cos \theta}{\sqrt{X^{2} + X'^{2}}} \\[4pt]
Y_{\mathrm{prof}} &= X \sin \theta + r_r \, \frac{X' \cos \theta - X \sin \theta}{\sqrt{X^{2} + X'^{2}}}
\end{aligned} \;}
$$

and check it against the two trivial cases $\theta = 0$ with $X' = 0$, and any $\theta$ with $r_r = 0$.

::: solution
The tangent vector is $\mathbf{t} = \left( X' \cos \theta - X \sin \theta , \; X' \sin \theta + X \cos \theta \right)$ with $\left| \mathbf{t} \right| = \sqrt{X'^{2} + X^{2}}$. Rotating $\mathbf{t}$ through $- 90^{\circ}$ gives $\left( t_y , - t_x \right) = \left( X' \sin \theta + X \cos \theta , \; - X' \cos \theta + X \sin \theta \right)$; at $\theta = 0$ with $X' = 0$ this is $\left( X , 0 \right)$, pointing *outward*. Subtracting $r_r$ times this outward unit normal from $C$ gives the two lines above.

**Checks.** With $X' = 0$ at $\theta = 0$: $X_{\mathrm{prof}} = X - r_r = r_p + s - r_r = r_b + s$ and $Y_{\mathrm{prof}} = 0$ — the profile sits on the base circle plus the lift, as it must. With $r_r = 0$ the profile collapses onto the pitch curve, which is the knife-edge follower. A formula that fails these two checks has a sign error, and a sign error here produces a profile offset the wrong way — a scrapped cam.
:::
:::

For the valve lobe this gives, at selected angles:

| $\theta$ (deg) | $s$ (mm) | $d s / d \theta$ (mm/rad) | $X_{\mathrm{prof}}$ | $Y_{\mathrm{prof}}$ | $R$ (mm) |
|---|---|---|---|---|---|
| 0 | 0.000 | 0.000 | 15.000 | 0.000 | 15.000 |
| 40 | 1.285 | 5.593 | 11.389 | 12.094 | 16.612 |
| 64 | 4.500 | 8.813 | 6.335 | 19.053 | 20.078 |
| 100 | 8.593 | 2.815 | −4.865 | 23.133 | 23.639 |
| 128 | 9.000 | 0.000 | −14.776 | 18.912 | 24.000 |
| 266 | 8.117 | −4.458 | −2.853 | −23.060 | 23.236 |
| 300 | 3.747 | −8.524 | 7.283 | −17.901 | 19.326 |
| 360 | 0.000 | 0.000 | 15.000 | 0.000 | 15.000 |

**Two things to notice.** The closing-flank coordinates are *not* the mirror of the opening ones, because the closing angle is $130^{\circ}$ and the opening angle $128^{\circ}$. And the first and last points coincide, which is the closure check: if they do not, the displacement diagram does not add up to $360^{\circ}$ or the lift does not return to zero, and the error must be found before the profile is cut.

## Lubrication: the cam runs in a difficult regime

The cam contact is an elastohydrodynamic (EHL) conjunction: the roller and the lobe flatten each other elastically, the oil's viscosity rises by orders of magnitude at the contact pressure, and the film that separates two surfaces carrying several hundred megapascals is **a few hundred nanometres thick** — comparable with the roughness of the ground surfaces it is supposed to separate.

The Dowson–Higginson minimum-film equation for line contact,

$$
\frac{h_{\min}}{R} = 2.65 \, U^{0.70} G^{0.54} W^{-0.13} , \qquad
U = \frac{\eta_0 u}{E' R} , \quad G = \alpha E' , \quad W = \frac{F}{E' R b} , \quad E' = 2 E^{*}
$$

with $\eta_0$ the viscosity at inlet temperature and atmospheric pressure, $u$ the mean entraining (rolling) speed, and $\alpha$ the pressure–viscosity coefficient, gives for the valve lobe at the peak-force point, taking hot engine oil with $\eta_0 = 0.008\ \mathrm{Pa \cdot s}$ and $\alpha = 2.2 \times 10^{- 8}\ \mathrm{Pa^{- 1}}$:

| Group | Value | Comment |
|---|---|---|
| $u = \omega \sqrt{X^{2} + X'^{2}} \, \phi / \rho$ | $6.6\ \mathrm{m / s}$ | speed of the contact point along the profile; for pure rolling the mean entraining speed |
| $U$ | $3.2 \times 10^{- 11}$ | low — modest speed, very high modulus |
| $G$ | $5\,000$ | typical for a mineral oil on steel |
| $W$ | $2.4 \times 10^{- 5}$ | |
| $h_{\min}$ | $0.34\ \mu\mathrm{m}$ | |
| $\Lambda = h_{\min} / \sqrt{R_{q1}^2 + R_{q2}^2}$ | $0.8$ | **mixed lubrication** (with $R_q = 0.3\ \mu\mathrm{m}$ on each surface) |

**$\Lambda < 1$ means the asperities touch.** A ground cam lobe and roller of $R_q \approx 0.3\ \mu\mathrm{m}$ each have a composite roughness of $0.42\ \mu\mathrm{m}$, and a film of $0.34\ \mu\mathrm{m}$ does not cover the peaks. Highly loaded cam contacts commonly run in the mixed regime, and the design response is to make the solid-to-solid contacts harmless rather than to try to escape it: anti-wear and extreme-pressure additives that form protective surface films, a fine surface finish, and a high surface hardness so that the asperities that meet deform elastically rather than plastically.

::: widget plot
f: 0.045+0.085*exp(-1.1*x)
x: 0, 4
y: 0, 0.14
caption: A schematic Stribeck-type curve for a cam contact — coefficient of friction against the film-thickness ratio $\Lambda$ (the numbers are illustrative, not measured). **The valve lobe sits at $\Lambda \approx 0.8$, on the steep part of the curve, where small changes in film thickness change the friction noticeably.** A lower-viscosity oil lowers $\eta_0$, hence $U$ and $h_{\min}$, and moves the contact further to the left. Above $\Lambda \approx 3$ the surfaces are fully separated and there is little further to gain; well below $\Lambda = 1$ wear accelerates.
:::

**Materials.** The cam and the follower are both hard; one of them may be made the cheaper, replaceable part.

| Cam | Process | Surface | Case | Where |
|---|---|---|---|---|
| Chilled cast iron | cast against chills at the lobes | 50–60 HRC | chilled layer a few mm | classic production camshafts |
| Case-hardening steel (16MnCr5, SAE 8620) | carburise, quench, grind | 58–63 HRC | $0.5$–$1.0\ \mathrm{mm}$ | general machinery cams |
| Bearing steel (SAE 52100) | through-harden and temper | 58–62 HRC | through | small, highly loaded cams |
| Nitriding steel (31CrMoV9) | gas or plasma nitride | 650–800 HV | $0.3$–$0.6\ \mathrm{mm}$ | good wear resistance, low distortion |
| Ductile iron, induction-hardened | induction quench | 50–58 HRC | $1.5$–$3\ \mathrm{mm}$ | large face cams, printing-press drums |

Followers are hardened steel rollers on needle bearings, or hardened flat tappets; in many current engines the tappets carry a thin diamond-like-carbon (DLC) coating to reduce friction in the mixed regime. (The hardness and case-depth figures are typical ranges; the actual specification comes from the material standard and the supplier.)

::: exercise Hertz {level=2 check="531"}
A cam lobe presents a convex profile radius of $18\ \mathrm{mm}$ to a $10\ \mathrm{mm}$ radius roller $16\ \mathrm{mm}$ wide. The peak contact force is $800\ \mathrm{N}$. Both are steel with $E = 207\ \mathrm{GPa}$, $\nu = 0.3$. What is the maximum Hertzian contact pressure? (Enter the pressure in MPa.)

::: solution
$$
\frac{1}{R} = \frac{1}{10} + \frac{1}{18} \Rightarrow R = 6.43\ \mathrm{mm} , \qquad
\frac{1}{E^{*}} = \frac{2 \left( 1 - 0.09 \right)}{207\,000} \ \Rightarrow \ E^{*} = 113.7\ \mathrm{GPa}
$$
$$
p_0 = \sqrt{ \frac{F E^{*}}{\pi b R} } = \sqrt{ \frac{800 \times 113\,700}{\pi \times 16 \times 6.43} } = \boxed{ 531\ \mathrm{MPa} }
$$
The maximum shear stress is $0.30 p_0 = 159\ \mathrm{MPa}$ at about $0.79 a$ below the surface. Hardened and ground steels are commonly used at contact pressures well above $1\ \mathrm{GPa}$, so the static margin is comfortable; what limits cam surfaces is fatigue under the number of cycles. A lobe sees its peak load once per camshaft revolution, so a camshaft at $3000\ \mathrm{rev / min}$ accumulates $10^{9}$ cycles in $10^9 / (3000 \times 60) = 5\,560$ hours.
:::
:::

## The dynamics you cannot get rid of

::: definition Cam float {#def-float}
A spring-closed follower can be **pushed** but not **pulled**. Writing the follower equation $m \ddot{s} = F_c - F_s$ with $F_s = F_0 + k s$, the contact force is

$$
F_c ( \theta ) = F_0 + k s ( \theta ) + m \ddot{s} ( \theta )
$$

and **cam float** is the speed at which $\min_\theta F_c ( \theta )$ first reaches zero. Because the inertia term scales as $N^{2}$ and the spring term does not, if $\ddot{s}$ is evaluated at a reference speed $N_0$,

$$
N_{\mathrm{float}} = N_0 \sqrt{ \min_{\theta} \frac{F_0 + k s}{- m \ddot{s}} }
$$

where the minimum is taken over the stretches where $\ddot{s} < 0$. Beyond float the follower leaves the profile, the valve or tool stops following the displacement diagram, and — in an interference engine — the valve can strike the piston.
:::

The rigid-follower model of the worked example rests on three idealisations, and knowing which one fails first is a large part of high-speed cam design.

| Model | Natural frequency | At the valve lobe | Fails when |
|---|---|---|---|
| Rigid train, rigid contact | — (contact force can go to zero) | float at $7163\ \mathrm{rev / min}$ | $F_c \to 0$ |
| Rigid train, **Hertzian** contact $k_H$ | $f_H = \dfrac{1}{2 \pi} \sqrt{ \dfrac{k_H}{m} }$ | about $6.5\ \mathrm{kHz}$ | rarely — over $100 \times$ the cam frequency |
| Spring **surge** (spring's own mass) | $f_1 = \dfrac{1}{2} \sqrt{ \dfrac{k}{m_s} }$ | $568\ \mathrm{Hz}$ | a strong harmonic of the cam frequency reaches $f_1$ |

The Hertzian approach of two cylinders in line contact follows from Johnson's analysis,

$$
\delta = \frac{F}{\pi E^{*} b} \left[ \ln \frac{4 R_1}{a} + \ln \frac{4 R_2}{a} - 1 \right] = \frac{553}{\pi \times 113\,700 \times 14} \left[ \ln \frac{36}{0.057} + \ln \frac{157}{0.057} - 1 \right] = 0.0015\ \mathrm{mm}
$$

(for two bodies of the same material), with a tangent stiffness at that load of about $4 \times 10^{5}\ \mathrm{N / mm}$. The elastic approach of about $1.5\ \mu\mathrm{m}$ at peak load is lost lift that varies with load, and the load varies with speed; it is small compared with the deflections of the rest of the valve train (rocker, pushrod, camshaft bending), which are why real valve-train models are multi-mass.

**The surge mode is usually the one that limits the design.** A compression spring is not a massless spring: in its first longitudinal mode the coils in the middle oscillate while the ends are held, and near that frequency the force the spring applies to the retainer differs considerably from $F_0 + k s$. Because $k \propto d^4 / ( D^3 n )$ and $m_s \propto d^2 D n$, the surge frequency is $f_1 \propto d / ( D^{2} n )$: a smaller coil diameter raises it strongly. Progressive-rate and conical ("beehive") springs, whose coils do not all vibrate together, are also used to spread and damp the resonance.

::: exercise Spring surge {level=2 check="694"}
A valve spring is redesigned from $D = 18\ \mathrm{mm}$, $d = 3.35\ \mathrm{mm}$, $n = 6.5$ active coils to $D = 14\ \mathrm{mm}$, keeping the same rate $k = 32.8\ \mathrm{N / mm}$ and the same solid height. With $G = 79\ \mathrm{GPa}$, $\rho = 7850\ \mathrm{kg / m^{3}}$ and both ends held, what is the new first longitudinal natural frequency? (Enter the frequency in Hz.)

::: solution
Two constraints, two unknowns. Same rate: $k = G d^{4} / ( 8 D^{3} n )$, so $d^{4} / ( D^{3} n )$ is constant. Same solid height: $L_{\mathrm{solid}} \approx n d$ (counting active coils only), so $n d$ is constant. Substituting $n = n_0 d_0 / d$ into the rate constraint,

$$
\frac{d^{5}}{D^{3}} = \frac{d_0^{5}}{D_0^{3}} \ \Rightarrow \ d = d_0 \left( \frac{D}{D_0} \right)^{3 / 5} = 3.35 \times \left( \frac{14}{18} \right)^{0.6} = 2.88\ \mathrm{mm} , \qquad n = \frac{6.5 \times 3.35}{2.88} = 7.56
$$

$$
m_s = \pi D n \times \frac{\pi d^{2}}{4} \times \rho = 2167\ \mathrm{mm^{3}} \times 7.85 \times 10^{- 6}\ \mathrm{kg / mm^3} = 17.0\ \mathrm{g}
$$

$$
f_1 = \frac{1}{2} \sqrt{ \frac{k}{m_s} } = \frac{1}{2} \sqrt{ \frac{32\,800}{0.0170} } = \boxed{ 694\ \mathrm{Hz} }
$$

**against $568\ \mathrm{Hz}$ before the change — a $22\ \%$ gain for a $22\ \%$ reduction in coil diameter.** Under these two constraints $m_s \propto d D$, so $f_1 \propto 1 / \sqrt{D d}$. What the change does *not* help is the wire stress: the same load is carried by a wire $14\ \%$ smaller in diameter, so the shear stress in the coils rises (partly offset by the smaller coil diameter) and must be rechecked for fatigue.
:::
:::

## Face, cylindrical, conjugate and split cams

**Face (end) cams** put the working surface on the face of a disc, perpendicular to the shaft. Cut as a groove with the roller running inside it, **they can pull as well as push**, so there is no return spring and no float. Their cost is that a groove has two flanks and only one can touch at a time, so the roller reverses its rotation whenever the contact changes flank, and the clearance in the groove becomes backlash.

**Cylindrical (barrel) cams** wrap a groove around a drum and carry a roller follower, either translating parallel to the axis or on a swinging arm. They give large displacement, they pull as well as push, and they fit in a short envelope. Their cost is that the groove is expensive to cut accurately, and the roller's contact with the groove walls involves some unavoidable sliding because different points of a cylindrical roller want to move at different speeds.

**Conjugate (double) cams** are two plate profiles on one hub, one for each direction, with the follower carried on two rollers. They are form-closed, precise and free of float. Their two profiles must be made as a matched pair: an error on one flank is a lift error, and an error on the other a change in preload. They are used on knitting machines, printing-press gripper drums and indexing drives where a spring would be unacceptable.

**Split (preloaded) cams** use two rollers pressed against the cam surfaces by a spring, so that clearance is taken up without making the two profiles to a matched tolerance. They are a cheaper answer to the problem a conjugate cam solves with precision.

## Manufacturing and inspection

| Method | Typical profile accuracy | Cost | For |
|---|---|---|---|
| Copy-milling from a master model | $\pm 0.02\ \mathrm{mm}$ | low per piece, high for the master | older production, cast blanks |
| CNC milling then grinding | $\pm 0.005\ \mathrm{mm}$ | medium | the modern default |
| CNC cam grinding (wheel follows the computed profile) | $\pm 0.002\ \mathrm{mm}$ | high | production camshafts |
| Wire EDM of a flat plate cam | $\pm 0.01\ \mathrm{mm}$ | low for a flat part | press-feed cams, thin plate cams |

(The accuracies are typical orders of magnitude; real capability depends on the machine and the part.)

**The inspection is always a lift check**: the part is rotated against a precision follower or a probe, the lift is recorded against angle and compared with the theoretical lift. **The tolerance that matters is on lift and its derivatives, not on radius** — a small, smooth error in radius changes the lift by a small, smooth amount and the dynamics hardly at all, whereas a short, sharp error of a few micrometres changes the second derivative of the lift, and with it the acceleration, a great deal. The corresponding rule for the drawing: **tolerance the lift curve at stated angles, not the profile as a geometric dimension.**

::: quiz
A cam-and-follower unit is rebuilt with a roller $2\ \%$ larger in diameter than the original, everything else unchanged. The machine now runs worse. What happened?

- [ ] The larger roller increases the Hertz stress, because the contact is wider
- [x] The profile was cut for the original roller; with a larger roller the roller centre no longer traces the designed pitch curve, so the lift law is wrong
- [ ] The larger roller reduces the contact sliding and the lubricant film collapses
- [ ] Nothing is wrong; a larger roller is always better

::: solution
The profile was generated as the inward offset of the pitch curve by $r_r$. If the profile is *unchanged* and the roller grows by $\Delta r$, the roller centre traces the profile offset outward by $r_r + \Delta r$, which is not the designed pitch curve: the follower now executes a different motion, and the error is largest where the profile's curvature differs most from that of a circle. **This is why cams and followers are specified together, and why a replacement roller must be made to the drawing's roller radius, not to the worn part.** The Hertz stress actually *falls* slightly, because the relative radius of curvature grows, which is what makes the first answer tempting.
:::
:::

## Cam versus the alternatives

| Requirement | Cam is right when | Use instead |
|---|---|---|
| Prescribed motion, one degree of freedom | almost always — this is the cam's reason for existing | geared five-bar or six-bar if the law is nearly a sine |
| Dwell | form-closed cam, or a Geneva ([[mechanisms/mechanisms-mobility]]) | servo index drive, ratchet, or a clutch |
| Motion reverses under load and must be *held* | only if form-closed — a spring-closed cam cannot hold against a reversing load | face or conjugate cam, leadscrew, or servo |
| High force, low speed, short stroke | rarely | toggle or eccentric press ([[mechanisms/linkage-synthesis]]) |
| Changeable motion | never | **servo ("electronic cam")**: the motion is a stored table |
| Very high speed, very low mass | yes, with a roller and a hard surface | pneumatic or desmodromic valve return |
| Repeatability better than $0.01\ \mathrm{mm}$ | only with a conjugate cam and matched set | leadscrew, or a direct drive |

**The servo alternative deserves its own sentence.** A servo motor executing a stored position profile is a cam whose motion can be changed in software, with no cam wear and no tooling change, and it has displaced mechanical cams in many packaging, printing and press-feed applications. Mechanical cams remain in internal-combustion valve trains, knitting machines and many high-rate assembly machines. One reason is energy: with a spring-closed cam the follower's kinetic and spring energy are exchanged mechanically within each cycle, whereas a servo must supply and absorb that energy electrically, with losses in the windings and drive at every cycle; at very high cycle rates and small motions that becomes expensive in heat and motor size.

::: exercise Design: a transfer-arm cam {level=3 check="449"}
**Specification.** A rotary transfer arm carries tooling of $5.5\ \mathrm{kg}$ total reciprocating mass. A radial cam with a $12\ \mathrm{mm}$ radius roller on a $55\ \mathrm{mm}$ base-circle radius raises it $40\ \mathrm{mm}$ over $110^{\circ}$ of cam on a 4-5-6-7 polynomial, dwells $70^{\circ}$, returns it $40\ \mathrm{mm}$ over $110^{\circ}$ on a modified-sine law, and dwells $70^{\circ}$. A spring of rate $18\ \mathrm{N / mm}$ with $350\ \mathrm{N}$ installed load holds the follower on the cam. Guide friction $\mu = 0.08$. Running speed $240\ \mathrm{rev / min}$.

**Find (a)** the peak pressure angle on the rise, **(b)** the peak side thrust on the guide and the friction it creates, and **(c)** the cam speed at which the follower leaves the cam. (Enter the answer to (c) in rev/min.)

::: solution
**Basics.** $\omega = 25.13\ \mathrm{rad / s}$, $r_p = 55 + 12 = 67\ \mathrm{mm}$, $\beta = 1.9199\ \mathrm{rad}$, $\omega / \beta = 13.09\ \mathrm{s^{- 1}}$, $a_{\max} = 7.513 \times 0.040 \times 13.09^{2} = 51.5\ \mathrm{m / s^{2}} = 5.2\ g$.

**(a)** $\left( d s / d \theta \right)_{\max} = 2.1875 \times 40 / 1.9199 = 45.6\ \mathrm{mm / rad}$. Maximising $\left( d s / d \theta \right) / \left( r_p + s \right)$ over the lift gives

$$
\psi_{\max} = 28.2^{\circ} \quad \text{at} \ x = 0.457 \ \text{(before mid-lift, where } s \text{ is still smaller)}
$$

**This is over a $25^{\circ}$ design allowance.** Holding $25^{\circ}$ needs $r_p = 79.4\ \mathrm{mm}$, i.e. a base-circle radius of $67.4\ \mathrm{mm}$ against the $55\ \mathrm{mm}$ provided — $12.4\ \mathrm{mm}$ more. The alternatives are a longer rise angle, or a modified-sine rise ($k_v = 1.760$), which gives $\psi_{\max} = 23.4^{\circ}$ on the existing cam.

**(b)** The side thrust is $F_c \tan \psi$. It peaks at $x = 0.44$, where $F_c = 732\ \mathrm{N}$ and $\tan \psi = 0.533$:

$$
F_{\mathrm{side}} = 390\ \mathrm{N} , \qquad F_{\mathrm{friction}} = 0.08 \times 390 = 31\ \mathrm{N}
$$

against a transmitted follower force of $732\ \mathrm{N}$ — **$4.3\ \%$ of it is lost in guide friction, and the guide bearings must carry a $390\ \mathrm{N}$ side load.**

**(c)** Cam float: $F_c = F_0 + k s + m \ddot s$ reaches zero first on the decelerating part of the rise. The inertia term scales as $N^{2}$ and the spring term does not, so

$$
N_{\mathrm{float}} = 240 \sqrt{ \min_{\theta} \frac{F_0 + k s}{- m \ddot{s}} } = 240 \sqrt{ 3.504 } = \boxed{ 449\ \mathrm{rev / min} }
$$

**The float speed is $1.87$ times the running speed.** The rise governs, not the return: on the return the modified-sine peak acceleration is $5.528 \times 0.040 \times 13.09^2 = 37.9\ \mathrm{m / s^{2}}$ against the rise's $51.5$, and the return's deceleration towards the cam occurs near full lift, where the spring force is high; the return alone would float only at $539\ \mathrm{rev / min}$.
:::
:::

::: exercise Pressure-angle sizing {level=1 check="53"}
A radial cam with an in-line roller follower of $10\ \mathrm{mm}$ radius rises $25\ \mathrm{mm}$ over $90^{\circ}$ of cam on a 4-5-6-7 polynomial. What is the smallest **base-circle** radius for which the pressure angle stays at or below $25^{\circ}$? (Enter the radius in mm.)

::: solution
$\left( d s / d \theta \right)_{\max} = k_v h / \beta = 2.1875 \times 25 / 1.5708 = 34.8\ \mathrm{mm / rad}$, occurring at $x = 0.5$ where $s = 12.5\ \mathrm{mm}$. Setting $\tan \psi = 0.4663$ there,

$$
r_p = \frac{34.8}{0.4663} - 12.5 = 74.7 - 12.5 = 62.2\ \mathrm{mm}
$$

Maximising $\left( d s / d \theta \right) / \left( r_p + s \right)$ over the whole lift rather than assuming mid-lift gives $r_p = 63.0\ \mathrm{mm}$, so

$$
r_b = r_p - r_r = 63.0 - 10 = \boxed{ 53\ \mathrm{mm} }
$$

The mid-lift estimate is slightly unconservative: just before mid-lift the slope is still close to its peak while the lift, and hence the denominator, is smaller, so the ratio is a little larger there.
:::
:::

::: exercise Flat-face width {level=1 check="15.8"}
A flat-faced follower rises $15\ \mathrm{mm}$ over $120^{\circ}$ of cam on a modified-sine law. What is the minimum half-width of the follower face, with the customary $25\ \%$ margin? (Enter the half-width in mm.)

::: solution
The contact point moves along the face a distance $d s / d \theta$ from the follower axis, whose peak is $k_v h / \beta = 1.760 \times 15 / 2.0944 = 12.6\ \mathrm{mm}$. With the $25\ \%$ margin for the edge radius and misalignment,

$$
\ell = 1.25 \times 12.6 = \boxed{ 15.8\ \mathrm{mm} }
$$

The face must be about $32\ \mathrm{mm}$ across for $15\ \mathrm{mm}$ of lift, and the bending moment the offset contact force applies to the follower stem grows with that offset. **A flat-faced follower is compact only when $d s / d \theta$ is small — long angles and short lifts — the same condition that keeps its convexity criterion satisfied.**
:::
:::

::: exercise Cam torque {level=2 check="15.7"}
A radial cam raises a $3\ \mathrm{kg}$ follower $30\ \mathrm{mm}$ over $120^{\circ}$ of cam on a **cycloidal** law at $300\ \mathrm{rev / min}$. The retaining spring has $k = 25\ \mathrm{N / mm}$ and $150\ \mathrm{N}$ installed load. Neglecting friction, what is the peak torque the camshaft must supply during the rise, and where does it occur? (Enter the torque in N·m.)

::: solution
By virtual work the instantaneous torque is $T = F_c \, d s / d \theta$ with $F_c = F_0 + k s + m \ddot{s}$. With $\omega = 31.42\ \mathrm{rad / s}$, $\beta = 2.0944\ \mathrm{rad}$, $\omega / \beta = 15.0\ \mathrm{s^{- 1}}$ and the cycloidal $f = x - \sin 2 \pi x / 2 \pi$,

$$
\frac{d s}{d \theta} = \frac{h}{\beta} \left( 1 - \cos 2 \pi x \right) = 14.32 \left( 1 - \cos 2 \pi x \right)\ \mathrm{mm / rad} , \qquad
m \ddot{s} = m h \left( \frac{\omega}{\beta} \right)^{2} 2 \pi \sin 2 \pi x = 127.2 \sin 2 \pi x\ \mathrm{N}
$$

The force and the slope peak at different places — $F_c$ reaches $900\ \mathrm{N}$ at $x = 1$, where $d s / d \theta$ is back to zero, and $d s / d \theta$ peaks at $x = 0.5$ — so the product peaks between them. Evaluating $T(x)$ over the rise:

$$
T_{\max} = \boxed{ 15.7\ \mathrm{N \cdot m} } \quad \text{at} \ x = 0.562 , \qquad T_{\mathrm{rms}} = 9.4\ \mathrm{N \cdot m} \ \text{over the rise}
$$

The shaft and key are sized on $T_{\max}$ and the motor's thermal rating on the r.m.s. torque over the whole cycle. **Over a full cycle the net work is zero apart from friction** — the spring gives back on the return what the cam gave it on the rise — so the drive sees mainly a fluctuating load, which a flywheel or the inertia of the drive can smooth.
:::
:::

::: quiz
Two cams have the same lift and the same cam angle, but cam A uses a 3-4-5 polynomial and cam B a 4-5-6-7 polynomial. Run at the same speed with the same follower, which statement is right?

- [ ] Cam B has the lower peak acceleration and is therefore the better high-speed choice
- [x] Cam B has the higher peak acceleration but a continuous jerk, so it excites less vibration, and it needs the stiffer spring
- [ ] The two are dynamically identical because the lift curves are the same
- [ ] Cam A is smoother because its acceleration is constant in magnitude

::: solution
$k_a$ is $5.774$ for the 3-4-5 and $7.513$ for the 4-5-6-7, so cam B has $30\ \%$ more peak inertia force and needs correspondingly more spring force to avoid float. But cam A's jerk *steps* from zero to $60\, h\omega^3/\beta^3$ at each end of the lift, an abrupt change in the rate of change of force, whereas cam B's jerk rises smoothly from zero. **Cam A allows a lighter spring; cam B runs more smoothly in a vibration-sensitive train.** The 5-6-7-8-9 polynomial goes further in the same direction: $k_a = 9.37$, used where smoothness of the higher derivatives matters more than the peak acceleration.
:::
:::

::: history
| Year | Who | What |
|---|---|---|
| 1206 | Ismail al-Jazari | *The Book of Knowledge of Ingenious Mechanical Devices* describes machines — automata and water-raising devices among them — in which pegs or cams on a rotating shaft operate levers in a programmed sequence |
| 1912 | Ernest Henry and the Peugeot racing team | The Peugeot L76 Grand Prix car combines two overhead camshafts with four valves per cylinder, the arrangement later adopted by most high-performance engines |
| 1948 | W. M. Dudley | Publishes the "polydyne" approach to valve-cam design (SAE), in which the polynomial cam law is chosen to account for the elasticity of the valve train |
| 1953 | D. A. Stoddart | A series of articles in *Machine Design* develops polydyne cam design for general practice |
| 1986 | Renault (Bernard Dudot) | The EF15B Formula 1 engine introduces pneumatic valve return, replacing the steel valve spring with a gas spring of very low moving mass |
:::

## Where this leads

The cam is the mechanism in this course whose *shape* is the design. The four-bar, the slider-crank and the Geneva each had a handful of link lengths to choose; the cam has a continuous profile that you write as a function. That is where the ideas of [[mechanisms/linkage-synthesis]] — prescribing the motion and deriving the geometry — reach their most direct form: the displacement diagram is a function, the profile is its offset, and the constraints are on its derivatives.

Three directions follow. **Contact mechanics** takes the $442\ \mathrm{MPa}$ of this lesson further: surface durability, residual stresses from case hardening and shot peening, and surface finish. **Vibration** takes the $568\ \mathrm{Hz}$ surge mode and the elastic follower train further, with the tools in [[vibrations/harmonic-excitation]] and [[vibrations/two-degrees-of-freedom]]. **Tribology** takes the $\Lambda \approx 0.8$ further, starting from the viscosity and its pressure dependence introduced in [[fluid-mechanics/fluid-properties]].

The failure most often met on a machine that has run for years is gradual: the profile wears where the contact force is highest, the local curvature of the lift changes, and because the acceleration is the second derivative of the lift, a wear pattern only a few micrometres deep but short in angle can change the acceleration, and the contact force, noticeably. A follower that cleared the float limit when new can then begin to leave the cam at a speed it used to run at comfortably. **Cams usually wear out of their designed motion before they break.**

::: summary
- A cam has four curves — base circle, prime circle, pitch curve, profile — and confusing them is the commonest error in the subject. The prime circle is $r_b + r_r$ and it is the one in the pressure-angle formula.
- The motion law is chosen from $k_v , k_a , k_j$, never from the shape of the lift curve. $k_a$: modified sine $5.53$, 3-4-5 $5.77$, cycloidal $6.28$, 4-5-6-7 $7.51$, 5-6-7-8-9 $9.37$: **smoothness at the joins is paid for in peak acceleration in the interior.**
- $\tan \psi = \left( d s / d \theta - e \right) / \left( \sqrt{r_p^{2} - e^{2}} + s \right)$. Keep it below about $25$–$30^{\circ}$ for a translating follower; the direct lever is a bigger prime circle, and the peak is near mid-lift, not at the ends.
- Undercutting is a convex-side phenomenon: check $\rho > r_r$ where $r^{2} + 2 r'^{2} - r r'' > 0$. For a flat face the criterion is $r_b + s + s'' > 0$, and $s''$ scales as $1 / \beta^{2}$, so short angles demand large cams.
- $F_c = F_0 + k s + m \ddot s$. **Cam float is a race between the spring force and an inertia force that grows as $N^{2}$**, so the force margin shrinks as the square of the speed.
- The Hertz pressure $p_0 = \sqrt{F E^{*} / ( \pi b R )}$ is a few hundred megapascals and the film is a few tenths of a micrometre: **highly loaded cams commonly run in mixed lubrication, and the design response is materials, finish and additives, not geometry.**
- Three frequencies matter: the Hertzian contact mode (kilohertz, rarely a problem), the spring surge mode (hundreds of hertz, often the practical limit), and the float speed. At the top of the speed range the last two tend to arrive together.
- A spring-closed cam cannot pull. If the motion must be held, transmitted in reverse, or executed against a load that can reverse, the answer is a form-closed cam or a different mechanism, not a stiffer spring.
:::

## Further reading

- R. L. Norton, *Cam Design and Manufacturing Handbook*, 2nd ed., Industrial Press, 2009 — motion laws, sizing, dynamics and manufacture of cams in one design-oriented volume
- H. A. Rothbart (ed.), *Cam Design Handbook*, McGraw-Hill, 2004 — a broad handbook covering motion laws, dynamics, materials and manufacture
- F. Y. Chen, *Mechanics and Design of Cam Mechanisms*, Pergamon, 1982 — a thorough treatment of cam kinematics and dynamics, including elastic follower models
- K. L. Johnson, *Contact Mechanics*, Cambridge University Press, 1985 — line-contact stresses and deformation, and the subsurface stress field
- B. J. Hamrock, S. R. Schmid and B. O. Jacobson, *Fundamentals of Fluid Film Lubrication*, 2nd ed., Marcel Dekker, 2004 — the elastohydrodynamic film-thickness equations and the lubrication regimes
- I. I. Artobolevsky, *Mechanisms in Modern Engineering Design*, Mir, 1975–1980 — a multi-volume catalogue of mechanisms, including many cam and follower arrangements
- R. L. Norton, *Machine Design: An Integrated Approach*, 6th ed., Pearson, 2020 — machine-element context for cam followers, springs and bearings
