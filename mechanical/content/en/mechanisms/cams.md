::: warning The mechanism that does exactly what you ask
A four-bar gives you a curve and you find out afterwards what it is. A cam gives you the curve you specify, which is why it is the mechanism of choice when the motion is the requirement rather than the means of achieving it — the valve train, the printing cylinder, the knitting machine, the assembly index. That freedom has a price, and it is not paid in design time but in **force**. Every millimetre of the profile you drew so freely is a surface that must transmit a Hertzian contact pressure of several hundred megapascals through a film of oil a tenth the thickness of a human hair, at a sliding speed that changes sign twice per lift, with a follower that the cam is only allowed to push. **A cam is a geometry problem wrapped around a contact-mechanics problem wrapped around a vibration problem, and the geometry is the easy third.**
:::

## What you already know

- The slider-crank and its displacement series — [[mechanisms/position-analysis]]
- Transmission angle and why a mechanism that cannot push is useless — [[mechanisms/mechanisms-mobility]]
- Follower acceleration, the shaking force and cam float — [[mechanisms/acceleration-analysis]]
- Hertz contact stress and surface fatigue — derived from first principles below
- The cam-law coefficient table used in [[mechanisms/acceleration-analysis]]

## Anatomy: four curves, not one

Walk around any radial cam with a caliper and you will find that the drawing has four different "radii" on it, and confusing them is the commonest error in cam design.

**The base circle** is the smallest circle of the actual machined metal, centred on the shaft. It is a manufacturing datum and the thing a drawing tolerance is put on.

**The prime circle** is the base circle grown by the radius of the follower's contacting element — for a roller follower of radius $r_r$,

$$
r_p = r_b + r_r
$$

It is the circle traced by the roller *centre* when the follower is on the base circle, and it is the quantity that governs the pressure angle. For a flat-faced or knife-edge follower $r_r = 0$ and the two circles coincide, which is why textbooks that only treat those followers get to pretend there is only one.

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

The base circle and the profile are geometry you cut; the prime circle and the pitch curve are geometry you calculate. **For a knife-edge or flat-faced follower $r_r = 0$ and all four collapse to two**, which is why elementary treatments appear to have fewer objects than a real cam does.
:::

::: example Which radius is it? {#ex-anatomy}
A cam drawing calls out a base-circle diameter of $\varnothing 40\ \mathrm{mm}$, a roller follower of $18\ \mathrm{mm}$ diameter, and a maximum lift of $16\ \mathrm{mm}$. What is the largest radius anywhere on the machined part, and what is the largest radius of the *pitch* curve?

**Answer.** The pitch curve's maximum radius is $r_p + h = (20 + 9) + 16 = 45\ \mathrm{mm}$. The machined profile's maximum radius is the base circle plus the lift, $20 + 16 = 36\ \mathrm{mm}$ — nine millimetres less, because the profile is the pitch curve pulled in by the roller radius.

::: solution
The two numbers differ by exactly $r_r$ at every angle, but their *radii of curvature* do not: the profile's curvature is $\rho_{\mathrm{pitch}} - r_r$ on convex parts and $\rho_{\mathrm{pitch}} + r_r$ on concave parts, and it is the curvature and not the radius that decides whether the cutter can reach the surface. A designer who quotes "the maximum radius" to a machinist without saying which curve means will get a part that is nine millimetres too small in every direction the roller touches.
:::
:::

## The classification, and what each choice costs

| Family | Contact | Can push? | Can pull? | Wear | Use |
|---|---|---|---|---|---|
| Radial (disc), knife edge | point | yes | no | severe | layout studies only |
| Radial, roller | line | yes | no | moderate | the default |
| Radial, flat face | line/area | yes | no | low | high speed, no reversal |
| Radial, spherical (conjugate-wiper) | area | yes | no | low | where a flat face would gouge |
| Face (end) cam | line | yes | yes | moderate | two-axis motion, indexing |
| Cylindrical (barrel) | line | yes | yes | moderate | large displacement in a short envelope |
| Conjugate (double) cam | line | yes | yes | low | precision, no spring needed |
| Split (preloaded) cam | line | yes | yes | low | followers carried on two rollers |

**The single most consequential entry in that table is "Can pull? no".** A spring-closed follower can only be pushed, so every part of the cycle where the follower wants to accelerate away from the cam is a part where the contact force is falling towards zero, and a cam that loses contact has no geometry any more. **Face and cylindrical cams can be given two flanks and therefore can pull**, which is why indexing drums and printing-press gripper cams are made that way and why they can be run faster than a spring-closed radial cam of far more robust appearance.

**Force closure versus form closure.** A spring-closed cam is *force closed*: the geometry is only authoritative while the spring is winning. A conjugate or wiper cam is *form closed*: the geometry is authoritative always, and the price is a second contact that must be preloaded against backlash, which is a tolerance stack you pay for in money and in sensitivity to thermal growth.

::: quiz
A radial cam with a flat-faced follower is run at high speed. The designer is told the follower is jumping the profile near the end of the rise. Changing the follower to a roller of the same mass fixes it. Why?

- [ ] The roller has a smaller contact area and therefore a lower contact pressure
- [x] A flat face cannot follow a concave profile at all, and the "jump" is the flat face losing one edge of a surface it was never in contact with
- [ ] The roller eliminates sliding, and sliding is what causes jump
- [ ] The roller increases the prime-circle radius and therefore lowers the pressure angle

::: solution
Half-true answers are the dangerous kind. The roller does lower the pressure angle and does not eliminate sliding — a roller still has a small amount of creep and, more importantly, the *follower* still slides in its guide. What actually happens is that a flat-faced follower's contact requirement is $\rho = r_0 + s + s'' > 0$, and where that fails the cam profile has an inflection the flat face bridges: it touches at two points, or at one edge, and the "jump" is a geometry failure masquerading as a dynamics failure. A roller of finite radius can follow a concave surface, up to the point where the concave radius of curvature falls below its own.
:::
:::

## The displacement diagram is the design

Everything about a cam follows from one graph: lift against cam angle. The profile, the forces, the stresses, the speed limit and the failure mode are all read off it. The first thing it must be checked for is **continuity of which derivative**.

$$
s = h f ( x ) , \quad x = \frac{\theta}{\beta} , \qquad
v = \frac{h \omega}{\beta} f' ( x ) , \qquad
a = \frac{h \omega^{2}}{\beta^{2}} f'' ( x ) , \qquad
j = \frac{h \omega^{3}}{\beta^{3}} f''' ( x )
$$

The four dimensionless coefficients $k_v , k_a , k_j$ are the peaks of $f', f'', f'''$ and they carry the entire design content of the motion law.

| Law | $f ( x )$ | $k_v$ | $k_a$ | $k_j$ | first discontinuous derivative |
|---|---|---|---|---|---|
| Uniform | $x$ | 1.000 | 0 | $\infty$ | acceleration, at both ends |
| Parabolic | $2x^{2}$, $1 - 2 ( 1 - x )^{2}$ | 2.000 | 4.000 | $\infty$ | jerk, at three points |
| Simple harmonic | $\tfrac{1}{2} \left( 1 - \cos \pi x \right)$ | 1.571 | 4.935 | $\infty$ | acceleration, at both ends |
| Cycloidal | $x - \dfrac{\sin 2 \pi x}{2 \pi}$ | 2.000 | 6.283 | 39.48 | jerk, at both ends |
| 3-4-5 polynomial | $3x^{2} - 2x^{3}$ | 1.500 | 6.000 | 12.0 | acceleration, at both ends |
| 4-5-6-7 polynomial | $35x^{4} - 84x^{5} + 70x^{6} - 20x^{7}$ | 2.188 | **7.513** | 52.50 | none — $C^{3}$ |
| 5-6-7-8-9 polynomial | $126x^{5} - 420x^{6} + 540x^{7} - 315x^{8} + 70x^{9}$ | 2.461 | 9.372 | 78.75 | none — $C^{3}$ |
| Modified sine | eight-segment blend | 1.761 | 5.189 | 33.5 | jerk, at eight points |

::: exercise Derivation: why the polynomial family is $C^{3}$ {#deriv-continuity level=3}
A rise joined to dwells at both ends has to satisfy six conditions: $f , f' , f''$ equal to $0 , 0 , 0$ at $x = 0$ and $0 , 0 , 0$ at $x = 1$ after normalising, and $f = 1 , f' = 0 , f'' = 0$ at $x = 1$. That is six homogeneous conditions at one end and three at the other, so a polynomial of degree $n$ needs $n + 1$ coefficients $\ge 6$, i.e. $n \ge 5$ for the 3-4-5 law and $n \ge 7$ for the 4-5-6-7 law.

The **3-4-5 law** $f = 3x^{2} - 2x^{3}$ satisfies $f ( 0 ) = f ( 1 ) = 0$, $f' ( 0 ) = f' ( 1 ) = 0$ — that is, zero slope at both ends, which is what a dwell demands — but $f'' ( 0 ) = 6 \ne 0$, so the acceleration *steps* from zero to $6 h \omega^{2} / \beta^{2}$ the instant the lift begins. The jerk is $- 12$ throughout the interior and infinite at the ends.

The **4-5-6-7 law** adds $f'' ( 0 ) = f'' ( 1 ) = 0$ as well, so acceleration starts and ends at zero and the jerk is finite everywhere, peaking at $k_j = 52.5$ at $x = 0.5$. Its cost is visible in the table: $k_a$ rises from $6.00$ to $7.51$, a **twenty-five per cent higher peak acceleration**, and $k_v$ rises from $1.50$ to $2.19$, a **forty-six per cent higher peak velocity**.

::: solution
**The trade is therefore explicit and it is not free:** smoothness at the joins is bought with a higher peak in the interior. The reason the trade is usually worth it at high speed is that the infinite jerk of the 3-4-5 law is a step in force, and a step in force contains every harmonic the follower's own natural frequency can respond to.
:::
:::

::: widget plot
f: 0.5-0.5*cos(x*pi); x-sin(2*x*pi)/(2*pi); 35*pow(x,4)-84*pow(x,5)+70*pow(x,6)-20*pow(x,7)
x: 0, 1
y: -0.05, 1.05
caption: The three displacement laws, normalised to unit lift over unit angle. **They are indistinguishable at the ends and differ by up to nine per cent of the lift in the middle** — the harmonic law is the most "S-shaped" and the four-five-six-seven the most nearly linear through mid-lift. **That nine per cent is invisible on a displacement diagram and is the reason nobody chooses a law from the displacement curve.**
:::

::: widget plot
f: 4.9348*cos(x*pi); 6.2832*sin(2*x*pi); 420*pow(x,2)-1680*pow(x,3)+2100*pow(x,4)-840*pow(x,5)
x: 0, 1
y: -8.5, 8.5
caption: The normalised acceleration $f''$ of the same three laws: simple harmonic, cycloidal, 4-5-6-7. **Read the ends of the curves, not the peaks: the harmonic law starts at $+4.93$ and ends at $-4.93$, which is a step from zero, while the other two start and end at zero.** **The 4-5-6-7 curve reaches $\pm 7.51$ at $x = 0.276$ and $0.724$ — twenty-five per cent above the cycloidal's $6.28$ — and it is that bulge, not the smoothness, that sets the spring force.**
:::

::: quiz
A cam must rise $30\ \mathrm{mm}$ in $90^{\circ}$ and the machine runs at a fixed speed that cannot be changed. The designer swaps a cycloidal law for a 4-5-6-7 polynomial hoping to reduce the peak follower acceleration. What happens?

- [ ] The peak acceleration falls by about twenty per cent
- [x] The peak acceleration rises by about twenty per cent, and the peak velocity by about nine per cent
- [ ] Nothing changes, because both laws have the same lift and the same angle
- [ ] The peak acceleration falls but the jerk becomes infinite

::: solution
$7.513 / 6.283 = 1.196$. The 4-5-6-7 polynomial is chosen for its **finite jerk**, which matters for contact fatigue and for acoustic noise, not for its acceleration. If the constraint is follower jump, the polynomial is the wrong direction to go: the modified sine at $k_a = 5.19$ or the parabolic law at $4.00$ are better, and both cost elsewhere.
:::
:::

::: example Which law, which machine {#ex-lawchoice}
Four cams, all with the same $20\ \mathrm{mm}$ lift over the same $120^{\circ}$ at the same $600\ \mathrm{rev / min}$, on four different machines: a knitting machine taking a yarn carrier through a loop of thread; a packaging line indexing a bottle of liquid; a printing-press gripper carrying a sheet through a nip; and a press feed advancing $20\ \mathrm{mm}$ of strip steel into a die. Which motion law for which?

**Answer.** Compute the common scale factors first: $\omega = 62.83\ \mathrm{rad / s}$, $\omega / \beta = 30.0\ \mathrm{s^{- 1}}$, so $v_{\max} = 0.6 \, k_v\ \mathrm{m / s}$ and $a_{\max} = 18 \, k_a\ \mathrm{m / s^{2}}$.

| Machine | What hurts | Law | $k_a$ | $a_{\max}$ |
|---|---|---|---|---|
| Knitting | thread tension follows acceleration; a jerk step snaps the yarn | 4-5-6-7 | 7.51 | $135\ \mathrm{m / s^{2}}$ |
| Bottle index | the liquid sloshes; $0.2\ g$ is the spill limit | 5-6-7-8-9, two-step | 9.37 | $169\ \mathrm{m / s^{2}}$ — **but** over a longer angle, so the real figure is set by the spill limit, not the law |
| Press feed | strip inertia and the $1.5\ \mathrm{kN}$ of clamping force that must fall away in $2\ \mathrm{ms}$ | modified sine | 5.19 | $93\ \mathrm{m / s^{2}}$ |
| Gripper | form-closed, so float is irrelevant; the sheet's own weight is | cycloidal | 6.28 | $113\ \mathrm{m / s^{2}}$ |

::: solution
The point of the exercise is that **the ranking of the laws is not fixed**. The 5-6-7-8-9 polynomial has the worst $k_a$ in the table and is nonetheless the right answer for the bottle, because the quantity that matters there is not the peak acceleration of the follower but the peak *horizontal* acceleration of the bottle's centre of mass, and that is controlled by splitting the index into two shorter steps — see the two-step indexing calculation in [[mechanisms/mechanisms-mobility]]. **A motion law is not a property of a cam; it is a property of a cam and a payload.**
:::
:::

## Pressure angle: the cam's transmission angle

::: definition Pressure angle {#def-psi}
The **pressure angle** $\psi$ of a cam is the angle at the contact point between the common normal to the two surfaces — the line along which the cam pushes — and the direction in which the follower is free to move. The complementary angle $90^{\circ} - \psi$ is the transmission angle of [[mechanisms/mechanisms-mobility]]. For a translating roller follower,

$$
\tan \psi = \frac{d s / d \theta - e}{\sqrt{r_b^{2} - e^{2}} + s + r_r}
$$

where $e$ is the follower offset. The side thrust on the guide is $F \tan \psi$ and the mechanical efficiency is $\left( 1 - \mu \tan \psi \right) / \left( 1 + \mu \tan \psi \right)$.
:::

The pressure angle $\psi$ is the angle between the direction the cam pushes and the direction the follower is allowed to move. Its complement is the transmission angle of [[mechanisms/mechanisms-mobility]] under another name, and it obeys the same rule: keep it out of the danger zone or the mechanism binds.

For a translating roller follower with zero offset the derivation is a two-line one. The contact normal passes through the roller centre and is perpendicular to the pitch curve, so

$$
\tan \psi = \frac{d r / d \theta}{r} = \frac{d s / d \theta}{r_p + s}
$$

and with an offset $e$ measured so that a positive $e$ opposes the rise,

$$
\boxed{ \; \tan \psi = \frac{d s / d \theta - e}{\sqrt{r_b^{2} - e^{2}} + s + r_r} \; }
\qquad
r = \sqrt{ \left( \sqrt{r_b^{2} - e^{2}} + s + r_r \right)^{2} + \left( \frac{d s}{d \theta} - e \right)^{2} }
$$

**Two things follow immediately and both are design levers.** First, $\psi$ is largest where $d s / d \theta$ is largest *and* $s$ is still small — which for a symmetric law is at mid-lift, not at the ends. Second, the prime-circle radius $r_p$ appears alone in the denominator, so **the only real way to reduce the pressure angle is to make the cam bigger**, and every other trick is a trade.

::: widget plot
f: atan(8.8126/(x+4.5))*180/pi
x: 12, 40
y: 5, 35
caption: Peak pressure angle of a $9\ \mathrm{mm}$ lift over $128^{\circ}$ on a 4-5-6-7 law, against prime-circle radius. **The curve is $1 / r$ and there is no way to flatten it** — halving $\tan \psi$ from $25^{\circ}$ to $11^{\circ}$ means taking $r_p$ from $14.4\ \mathrm{mm}$ to $40\ \mathrm{mm}$, which is a cam more than twice the diameter and eight times the inertia about its own axis. **The $25^{\circ}$ line is crossed at $r_p = 14.4\ \mathrm{mm}$, and that is the whole of the sizing calculation for this cam.**
:::

**Acceptable limits.** The usual allowances are $\psi \le 25^{\circ}$ on a rise and $\psi \le 35^{\circ}$ on a return for a translating follower, and $\psi \le 45^{\circ}$ for a pivoted follower whose side thrust is smaller. They are not stiffness limits but **side-thrust and efficiency** limits: the side force on the guide is $F \tan \psi$, and the friction force it creates is $\mu F \tan \psi$, so the cam's mechanical efficiency is

$$
\eta = \frac{1 - \mu \tan \psi}{1 + \mu \tan \psi} \qquad \Rightarrow \qquad \eta = 0.53 \ \text{at} \ \psi = 25^{\circ} , \ \mu = 0.15
$$

**Half the work you put into a cam at its design pressure angle is lost in the guide.** That is not an argument for a smaller pressure angle at any price; it is the reason a cam with a long guide and rolling bearings can be run at $30^{\circ}$ where a cam in a bushing cannot.

::: example The offset is not free {#ex-offset}
The valve cam of the worked example below has $\left( d s / d \theta \right)_{\max} = 8.81\ \mathrm{mm / rad}$ on the opening flank at $s = 4.5\ \mathrm{mm}$, and $- 8.68\ \mathrm{mm / rad}$ on the closing flank at the same lift, with $r_p = 24\ \mathrm{mm}$. An engineer proposes a $3\ \mathrm{mm}$ offset to reduce the pressure angle.

**Answer.** On the opening flank, taking the offset with the sign that helps,

$$
\tan \psi_{\mathrm{open}} = \frac{8.81 - 3.00}{24 + 4.5} = 0.2039 \ \Rightarrow \ \psi = 11.5^{\circ} \quad \text{against} \quad \tan^{-1} \frac{8.81}{28.5} = 17.2^{\circ}
$$

On the closing flank $d s / d \theta$ has the opposite sign, so the same offset now *adds*:

$$
\tan \psi_{\mathrm{close}} = \frac{| - 8.68 - 3.00 |}{28.5} = 0.4098 \ \Rightarrow \ \psi = 22.3^{\circ}
$$

::: solution
The offset moves the peak from one flank to the other and makes the worst case worse in one direction than it improves it in the other: $17.2^{\circ}$ and $16.9^{\circ}$ become $11.5^{\circ}$ and $22.3^{\circ}$. **An offset is a lever for cams whose two flanks are already unequal** — which, for a valve cam with a short opening angle and a long closing angle, they are — **and a liability for symmetric ones.** The offset also moves the line of action off the guide's centreline, which costs package space and puts a bending moment on the follower stem that a symmetric arrangement does not.
:::
:::

## Undercutting: when the profile cannot be cut

::: definition Undercutting {#def-undercut}
A roller-follower cam is **undercut** where the radius of curvature $\rho$ of the pitch curve falls below the roller radius $r_r$, so that the inward offset by $r_r$ crosses itself and the profile develops a cusp. Formally, with $r = r_p + s$, $r' = d s / d \theta$, $r'' = d^{2} s / d \theta^{2}$,

$$
\rho = \frac{ \left[ r^{2} + r'^{2} \right]^{3 / 2} }{ r^{2} + 2 r'^{2} - r r'' } \qquad \text{and the requirement is} \qquad \rho > r_r \ \ \text{wherever} \ \ r^{2} + 2 r'^{2} - r r'' > 0
$$

For a flat-faced follower the corresponding requirement is $r_0 + s + d^{2} s / d \theta^{2} > 0$ everywhere. **Undercutting is a convex-side phenomenon**: on a concave stretch of the pitch curve the profile radius is $\left| \rho \right| + r_r$, larger than the pitch radius, and nothing is cusped.
:::

The profile is the pitch curve offset inwards by the roller radius. Offsetting a curve inwards by more than its own radius of curvature makes it cross itself, and the machine tool that follows the drawing cuts a groove in a surface that is supposed to be solid. The cam then has a **cusp**: the roller rides on the sharp corner instead of on the designed surface, the lift departs from the displacement diagram, and at speed the corner is a stress raiser that fatigues in hours.

For a radial roller follower the signed radius of curvature of the pitch curve is

$$
\rho = \frac{ \left[ r^{2} + \left( r' \right)^{2} \right]^{3 / 2} }{ r^{2} + 2 \left( r' \right)^{2} - r r'' } , \qquad r = r_p + s , \quad r' = \frac{d s}{d \theta} , \quad r'' = \frac{d^{2} s}{d \theta^{2}}
$$

and the profile is sound where

$$
\phi = \rho - r_r > 0 \qquad \text{wherever} \qquad r^{2} + 2 \left( r' \right)^{2} - r r'' > 0
$$

The condition on the right restricts the check to **convex** parts of the pitch curve. On a concave part $\rho$ is negative and the profile radius is $\left| \rho \right| + r_r$ — *larger*, not smaller — which is why a roller can follow a valley it could not follow as a ridge. **Undercutting is a convex-side phenomenon.**

For a **flat-faced follower** the profile radius of curvature collapses to a beautifully simple expression, because the flat face is the envelope of a family of lines rather than of circles:

$$
\boxed{ \; \rho_{\mathrm{profile}} = r_0 + s + \frac{d^{2} s}{d \theta^{2}} \; } \qquad \text{and} \qquad \ell_{\mathrm{face}} = \left| \frac{d s}{d \theta} \right|_{\max} \times 1.25
$$

The first must be positive everywhere or the flat face bridges a concavity and touches only at its edge; the second says how wide the follower's pad has to be, since the contact point wanders along the face by $\pm d s / d \theta$.

::: widget plot
f: pow(pow(18.9-4.5*cos(x*pi),2)+pow(11.5825*sin(x*pi),2),1.5)/((18.9-4.5*cos(x*pi))*(18.9-4.5*cos(x*pi))+2*pow(11.5825*sin(x*pi),2)-(18.9-4.5*cos(x*pi))*(29.743*cos(x*pi))); pow(pow(24.5-4.5*cos(x*pi),2)+pow(11.5825*sin(x*pi),2),1.5)/((24.5-4.5*cos(x*pi))*(24.5-4.5*cos(x*pi))+2*pow(11.5825*sin(x*pi),2)-(24.5-4.5*cos(x*pi))*(29.743*cos(x*pi)))
x: 0, 1
y: -60, 60
caption: Signed pitch-curve radius of curvature for a $9\ \mathrm{mm}$ simple-harmonic rise over $70^{\circ}$ with a $12\ \mathrm{mm}$ roller, for prime circles of $14.4\ \mathrm{mm}$ (lower curve) and $20\ \mathrm{mm}$ (upper). **Draw a horizontal line at $+12$: the lower curve is below it over $25\ \%$ of the lift, which is the undercut region, and its minimum is $+10.3\ \mathrm{mm}$ against a roller of $12\ \mathrm{mm}$ — a cusp $1.7\ \mathrm{mm}$ deep.** **Both curves go negative near $x = 0$, and that is not undercutting**: it is the concave start of the harmonic law's lift, where the profile radius is $\left| \rho \right| + r_r$ and perfectly cuttable. The clean prime circle for this cam is $17.0\ \mathrm{mm}$.
:::

::: example The flat face that cannot be made to work {#ex-flatface}
**Specification.** $h = 20\ \mathrm{mm}$ in $\beta = 60^{\circ}$, 3-4-5 polynomial, roller or flat-face follower.

**Pressure angle.** $\left( d s / d \theta \right)_{\max} = k_v h / \beta = 1.5 \times 20 / 1.0472 = 28.65\ \mathrm{mm / rad}$ at $s = 10\ \mathrm{mm}$. For $\psi \le 25^{\circ}$:

$$
r_p \ge \frac{28.65}{\tan 25^{\circ}} - 10 = 61.4 - 10 = 51.4\ \mathrm{mm}
$$

**Roller follower, undercut check.** With $r_p = 51.4\ \mathrm{mm}$ and $r_r = 10\ \mathrm{mm}$ the minimum convex pitch radius is $28.2\ \mathrm{mm}$ at $x = 1$, so $\phi_{\min} = 18.2\ \mathrm{mm} > 0$. **Sound.** The cam is $\varnothing 123\ \mathrm{mm}$ at its widest.

**Flat-face follower, gouge check.** $\rho = r_0 + s + s''$ with $s''_{\min} = - k_a h / \beta^{2} = - 6.00 \times 20 / 1.0966 = - 109.4\ \mathrm{mm}$ at $x = 1$, where $s = 20\ \mathrm{mm}$:

$$
r_0 > 109.4 - 20 = 89.4\ \mathrm{mm}
$$

and the face half-width must be $1.25 \times 28.65 = 35.8\ \mathrm{mm}$.

::: solution
**The flat face needs a cam $\varnothing 219\ \mathrm{mm}$ across to do what a roller does at $\varnothing 123\ \mathrm{mm}$ — and its pressure angle at that size is only $16^{\circ}$, so the extra bulk buys nothing.** The reason is in the two formulas: the pressure angle is set by $d s / d \theta$, which is $28.65\ \mathrm{mm}$, while the gouge criterion is set by $d^{2} s / d \theta^{2}$, which is $109.4\ \mathrm{mm}$ — four times larger, because a $60^{\circ}$ angle is short and curvature scales as $1 / \beta^{2}$ while slope scales as $1 / \beta$.
**The general rule this teaches:** the flat-faced follower is the *fast* follower for gentle, long-angle lifts, where its zero-roller-radius kinematics and its low Hertz stress are worth having, and the *worst* follower for short, sharp lifts, where the $1 / \beta^{2}$ term dominates and the cam has to be grown until it is larger than the roller cam's.
:::
:::

## The sizing procedure

Cam design is a fixed-point iteration, and it converges in two or three passes because the constraints are monotone in $r_p$.

| Step | What you do | What can fail |
|---|---|---|
| 1 | Lay out the cycle: rise, dwell, return, dwell, in cam degrees. Total must be $360^{\circ}$ | Not enough dwell for the process |
| 2 | Pick a motion law per segment from the $k_v , k_a , k_j$ table | Peak acceleration too high for the spring |
| 3 | Size $r_p$ from $\psi_{\max}$ | Cam will not fit the envelope |
| 4 | Check $\phi_{\min} > r_r$ (roller) or $\rho > 0$ (flat face) | Undercut — grow $r_p$ or soften the law |
| 5 | Compute $a_{\max}$, then $m a_{\max}$ against the spring force at that lift | **Cam float** — the usual killer |
| 6 | Compute the peak contact force and the Hertz stress | Surface fatigue, wear |
| 7 | Check the follower's natural frequency against the excitation | Resonance, noise, valve-gear surge |
| 8 | Generate the profile numerically, add the tolerance stack, cut | Cutter radius larger than $\phi_{\min}$ |

**Note that step 5 comes after the geometry and before the stress, and that in practice it is step 5 that sends you back to step 2.** The geometry of a cam is nearly always feasible; the force history frequently is not.

## Worked example: an overhead-camshaft valve lobe

**Specification.** A four-stroke four-cylinder engine, twin overhead camshafts, four valves per cylinder, rated at $6000\ \mathrm{rev / min}$ with a $6600\ \mathrm{rev / min}$ redline. The camshaft turns at half crank speed. One lobe must give $h = 9.0\ \mathrm{mm}$ of valve lift, opening over $128^{\circ}$ of cam, holding full lift for $102^{\circ}$, and closing over $130^{\circ}$ — $360^{\circ}$ in all. The valve gear is a roller bucket with a $18\ \mathrm{mm}$ roller $14\ \mathrm{mm}$ wide on a $15\ \mathrm{mm}$ base-circle radius. The effective reciprocating mass of the valve train is $m = 0.24\ \mathrm{kg}$ and the valve spring has $k = 32\ \mathrm{N / mm}$ with $200\ \mathrm{N}$ installed load at the closed seat.

**Step 1 — the cycle and the law.** $128 + 102 + 130 = 360^{\circ}$ ✓. Both flanks get the 4-5-6-7 polynomial: a valve cam is a $C^{3}$ problem because a jerk step is a force step and force steps are what make valve gear scream.

**Step 2 — kinematics.** $\omega = 6000 \pi / 120 = 314.16\ \mathrm{rad / s}$ (cam, not crank).

$$
\frac{\omega}{\beta_1} = \frac{314.16}{2.2340} = 140.63\ \mathrm{s^{-1}} \qquad \frac{\omega}{\beta_2} = \frac{314.16}{2.2689} = 138.46\ \mathrm{s^{-1}}
$$

| | opening | closing |
|---|---|---|
| $v_{\max} = k_v h \omega / \beta$ | $2.77\ \mathrm{m / s}$ | $2.73\ \mathrm{m / s}$ |
| $a_{\max} = k_a h \omega^{2} / \beta^{2}$ | $1339\ \mathrm{m / s^{2}} = 137\ g$ | $1297\ \mathrm{m / s^{2}} = 132\ g$ |
| $j_{\max} = k_j h \omega^{3} / \beta^{3}$ | $1.31 \times 10^{6\,} \mathrm{m / s^{3}}$ | $1.25 \times 10^{6\,} \mathrm{m / s^{3}}$ |

**Step 3 — pressure angle.** $\left( d s / d \theta \right)_{\max} = 2.1875 \times 9.0 / 2.2340 = 8.81\ \mathrm{mm / rad}$ at $s = 4.5\ \mathrm{mm}$, with $r_p = 15 + 9 = 24\ \mathrm{mm}$:

$$
\tan \psi = \frac{8.81}{24 + 4.5} = 0.309 \ \Rightarrow \ \boxed{ \psi_{\max} = 17.2^{\circ} } \quad \text{opening}, \qquad 16.9^{\circ} \ \text{closing}
$$

Comfortably inside $25^{\circ}$. The prime circle could shrink to $14.4\ \mathrm{mm}$ before hitting the limit — but see step 4.

**Step 4 — undercutting.** The minimum convex pitch-curve radius is $\rho = 22.5\ \mathrm{mm}$ at $x = 0.692$ of the opening, so $\phi_{\min} = 22.5 - 9 = 13.5\ \mathrm{mm} > 0$. **Sound, and with a wide margin**: the roller could grow to $22\ \mathrm{mm}$ before the profile cusped. The 4-5-6-7 law earns its keep here — because $f'' ( 0 ) = 0$, the profile at the nose is a clean $r_b$-radius arc rather than the inflected gouge a harmonic law leaves.

**Step 5 — contact force and cam float.** The follower equation is $m \ddot{s} = F_c - F_s$, so

$$
F_c ( \theta ) = \underbrace{F_0 + k s ( \theta )}_{\text{spring}} + \underbrace{m \ddot{s} ( \theta )}_{\text{inertia, signed}}
$$

| Cam angle | $s$ (mm) | $\ddot{s}$ (m/s²) | Spring (N) | Inertia (N) | $F_c$ (N) |
|---|---|---|---|---|---|
| $0^{\circ}$ seat | 0 | 0 | 200 | 0 | 200 |
| $38.4^{\circ}$ | 1.60 | $+1330$ | 251 | $+319$ | **553** (peak) |
| $64^{\circ}$ mid-lift | 4.50 | 0 | 344 | 0 | 344 |
| $89.6^{\circ}$ | 7.96 | $-1326$ | 455 | $-319$ | **135** (minimum) |
| $128^{\circ}$–$230^{\circ}$ dwell | 9.00 | 0 | 488 | 0 | 488 |
| $266^{\circ}$ | 8.12 | $-1288$ | 460 | $-309$ | 151 |

The minimum contact force is $135\ \mathrm{N}$ at $89.6^{\circ}$ on the opening flank. Cam float begins where that number reaches zero, and since the inertia term goes as $N^{2}$ while the spring term does not,

$$
N_{\mathrm{float}} = 6000 \sqrt{ \frac{454.6}{318.9} } = 7163\ \mathrm{rev / min}
$$

**against a $6600\ \mathrm{rev / min}$ redline — an 8.5 per cent margin.** That is a normal, healthy production-engine margin. Below $5000\ \mathrm{rev / min}$ the spring looks grossly over-stiff; it exists entirely for the last $1600\ \mathrm{rev / min}$.

::: widget plot
f: 454.6-318.9*pow(x/6000,2)
x: 5000, 8000
y: -200, 350
caption: Minimum contact force in the valve train against **crankshaft** speed. **The curve crosses zero at $7163\ \mathrm{rev / min}$, and the shape is the whole story: it is a downward parabola in speed, so the last fifteen per cent of the speed range consumes two thirds of the margin.** **Doubling the spring rate would move the crossing to $9500\ \mathrm{rev / min}$ and cost $488\ \mathrm{N}$ of seated load, twice the cam-base wear, and a spring that will not fit between $18\ \mathrm{mm}$ coil centres.**
:::

**Step 6 — Hertz stress.** The peak force of $553\ \mathrm{N}$ occurs at $38.4^{\circ}$, where the pitch-curve radius is $50.1\ \mathrm{mm}$ so the profile is convex with $\phi = 41.1\ \mathrm{mm}$. Treating the contact as two cylinders,

$$
\frac{1}{R} = \frac{1}{9.0} + \frac{1}{41.1} \ \Rightarrow \ R = 7.38\ \mathrm{mm} , \qquad \frac{1}{E^{*}} = \frac{1 - \nu_{1}^{2}}{E_1} + \frac{1 - \nu_{2}^{2}}{E_2} = \frac{2 \times 0.91}{207\,000} \ \Rightarrow \ E^{*} = 113.7\ \mathrm{GPa}
$$

$$
p_0 = \sqrt{ \frac{F E^{*}}{\pi b R} } = \sqrt{ \frac{553 \times 113\,700}{\pi \times 14 \times 7.38} } = \boxed{ 439\ \mathrm{MPa} } , \qquad a = \sqrt{ \frac{4 F R}{\pi b E^{*}} } = 0.057\ \mathrm{mm}
$$

A contact $0.114\ \mathrm{mm}$ wide carrying $553\ \mathrm{N}$ — a total of half a newton per square millimetre of the surface of a cam lobe, over and over, two thousand times a minute. The maximum shear stress is $0.30 p_0 = 132\ \mathrm{MPa}$ at $0.78 a = 0.044\ \mathrm{mm}$ below the surface, which is why cam steels are hardened to a depth of $0.3$–$0.8\ \mathrm{mm}$ and no further: **the case is deep enough to swallow the shear bulb and no deeper, because a deep hard case on a cam lobe is a brittle shell around a soft core and it spalls.**

**Step 7 — valve-spring surge.** The spring is $d = 3.35\ \mathrm{mm}$ wire, $D = 18\ \mathrm{mm}$ mean, $n = 6.5$ active coils, giving $k = G d^{4} / ( 8 D^{3} n ) = 32.8\ \mathrm{N / mm}$ and a mass of $25.4\ \mathrm{g}$. Its first longitudinal natural frequency is

$$
f_1 = \frac{1}{4} \sqrt{ \frac{k}{m_s} } = \frac{1}{4} \sqrt{ \frac{32\,800}{0.0254} } = 284\ \mathrm{Hz}
$$

The cam turns at $50\ \mathrm{Hz}$ at rated speed, so its fifth harmonic is at $250\ \mathrm{Hz}$ — within $12\ \%$ of the spring's own first mode. **At the float speed of $7163\ \mathrm{rev / min}$ the fifth harmonic is at $299\ \mathrm{Hz}$, above the mode.** The valve gear therefore stops being a rigid-follower problem at almost exactly the same speed at which it stops being in contact: **cam float and spring surge arrive together, and that coincidence is the real ceiling of the steel-spring valve train.** Above it the options are not a better spring but a different principle — desmodromic return, or the pneumatic spring that has replaced the valve spring in Formula 1 since 1989, which has no natural frequency at all because it has no mass on it.

**Step 8 — cam torque.** By virtual work the instantaneous camshaft torque is $T = F_c \, d s / d \theta$, giving a peak of $3.82\ \mathrm{N \cdot m}$ at $51.5^{\circ}$, a reverse peak of $- 3.72\ \mathrm{N \cdot m}$ at $307.5^{\circ}$, and an r.m.s. of $1.60\ \mathrm{N \cdot m}$ per lobe. **The net work over a cycle is zero to within friction** — the spring is an ideal energy store — so the camshaft drive sees a pure torque ripple of $\pm 4\ \mathrm{N \cdot m}$ per lobe, sixteen times per engine cycle, which is a torsional excitation of the camshaft drive at the fifth engine order and the reason the camshaft phaser's ratchet is a service item.

## Generating the profile

The whole point of the pitch curve is that it is the curve you compute and the profile is the curve you cut. For a radial cam with an in-line translating roller follower, put $X ( \theta ) = r_p + s ( \theta )$. The roller centre traces

$$
C ( \theta ) = \left( X \cos \theta , \; X \sin \theta \right)
$$

and the profile is the offset at distance $r_r$ along the inward normal to that curve. Differentiating, the tangent is $\left( X' \cos \theta - X \sin \theta , \; X' \sin \theta + X \cos \theta \right)$ with $X' = d s / d \theta$, and rotating it through $90^{\circ}$ and normalising gives the inward unit normal. Hence

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
The tangent vector is $\mathbf{t} = \left( X' \cos \theta - X \sin \theta , \; X' \sin \theta + X \cos \theta \right)$ with $\left| \mathbf{t} \right| = \sqrt{X'^{2} + X^{2}}$. Rotating $\mathbf{t}$ through $- 90^{\circ}$ gives $\left( t_y , - t_x \right) = \left( X' \sin \theta + X \cos \theta , \; - X' \cos \theta + X \sin \theta \right)$; at $\theta = 0$ with $X' = 0$ this is $\left( X , 0 \right)$, pointing *outward*, so the inward normal is its negative. Subtracting $r_r$ times the outward unit normal from $C$ gives the two lines above.

**Checks.** With $X' = 0$ at $\theta = 0$: $X_{\mathrm{prof}} = X - r_r = r_p + s - r_r = r_b + s$ and $Y_{\mathrm{prof}} = 0$ — the profile sits on the base circle plus the lift, exactly as it must. With $r_r = 0$ the profile collapses onto the pitch curve, which is the knife-edge follower. **A formula that fails these two checks has a sign error, and sign errors in this formula are the commonest single cause of a scrapped cam.**
:::
:::

For the valve lobe this gives, at $5^{\circ}$ intervals rounded to $0.01\ \mathrm{mm}$:

| $\theta$ (deg) | $s$ (mm) | $d s / d \theta$ (mm/rad) | $X_{\mathrm{prof}}$ | $Y_{\mathrm{prof}}$ | $R$ (mm) |
|---|---|---|---|---|---|
| 0 | 0.000 | 0.000 | 15.000 | 0.000 | 15.000 |
| 40 | 1.285 | 5.593 | 11.389 | 12.094 | 16.612 |
| 64 | 4.500 | 8.813 | 6.335 | 19.053 | 20.078 |
| 100 | 8.593 | 2.815 | −4.865 | 23.133 | 23.639 |
| 128 | 9.000 | 0.000 | −14.776 | 18.912 | 24.000 |
| 266 | 8.117 | −4.458 | −2.853 | −23.060 | 23.236 |
| 300 | 3.747 | −8.524 | 7.283 | −17.901 | 19.326 |
| 360 | 0.000 | 0.000 | 15.000 | −0.026 | 15.000 |

**Two things to notice.** The closing-flank coordinates are *not* the mirror of the opening ones, because the closing angle is $130^{\circ}$ and the opening angle $128^{\circ}$ — a real cam is never symmetric unless it is designed to be. And $R$ at $\theta = 0$ and $\theta = 360^{\circ}$ agree to $0.03\ \mathrm{mm}$, which is the closure check: **if the first and last points of the profile do not coincide, the cam will not run smoothly and no amount of downstream work will fix it.**

## Lubrication: the cam runs in the worst regime available

The cam contact is an elastohydrodynamic (EHL) conjunction: the roller and the lobe elastically flatten each other, the oil between them becomes a glassy solid at the pressures involved, and the film that separates two surfaces carrying half a gigapascal is **three hundred nanometres thick** — thinner than the ground finish it is supposed to protect.

The Dowson–Higginson minimum-film equation for line contact,

$$
\frac{h_{\min}}{R} = 3.63 \, U^{0.68} G^{0.49} W^{-0.073} , \qquad
U = \frac{\eta_0 u}{E^{*} R} , \quad G = \alpha E^{*} , \quad W = \frac{F}{E^{*} R L}
$$

with $\eta_0$ the atmospheric viscosity, $u$ the rolling speed, and $\alpha \approx 2.2 \times 10^{- 8}\ \mathrm{Pa^{- 1}}$ the pressure–viscosity coefficient of a mineral oil, gives for the valve lobe at the peak-force point:

| Group | Value | Comment |
|---|---|---|
| $u = \omega \sqrt{X^{2} + X'^{2}}$ | $8.17\ \mathrm{m / s}$ | roller-centre speed, essentially pure rolling |
| $U$ | $7.8 \times 10^{- 11}$ | very low — the speed is modest and the modulus enormous |
| $G$ | $2\,500$ | normal for a mineral oil |
| $W$ | $4.7 \times 10^{- 5}$ | a heavy load for such a small conjunction |
| $h_{\min}$ | $0.34\ \mu\mathrm{m}$ | |
| $\lambda = h_{\min} / R_q$ | $1.1$ | **mixed lubrication** |

**$\lambda \approx 1$ means the asperities touch.** A ground cam lobe has $R_q \approx 0.3\ \mu\mathrm{m}$, and a film of $0.34\ \mu\mathrm{m}$ does not cover the peaks. Every production cam lobe in the world runs in the mixed regime, and the design response is not to try to escape it but to make the solid-to-solid contacts harmless: extreme-pressure additives that react with the steel to grow an iron-sulphide or zinc-phosphate layer a few tens of nanometres thick and soft in shear, a surface finish laid *across* the sliding direction so the grooves hold oil, and a hardness of $60\ \mathrm{HRC}$ so the asperities that do meet deform elastically rather than plastically.

::: widget plot
f: 0.045+0.085*exp(-1.1*x)
x: 0, 4
y: 0, 0.14
caption: The Stribeck curve of a cam contact — coefficient of friction against specific film thickness $\lambda$. **The valve lobe sits at $\lambda = 1.1$, on the steep part of the curve where friction is falling at $0.03$ per unit of $\lambda$.** **That is why a $0\text{W}\text{-}16$ engine oil, which lowers $\eta_0$ and therefore $U$ and therefore $h_{\min}$, costs measurable valve-train friction and forced cam profiles and roller coatings to be redesigned when the fuel-economy test cycles demanded it.** Above $\lambda \approx 3$ the curve is flat and there is nothing further to gain; below $\lambda \approx 0.5$ it is vertical and the cam is wearing.
:::

**Materials.** The cam is hard and the follower is harder or sacrificial; there is no third option.

| Cam | Process | Surface | Case | Where |
|---|---|---|---|---|
| Chilled-alloy cast iron | chill-cast against a metal mould | 58–65 HRC | $0.5$–$1.5\ \mathrm{mm}$ as-cast | classic production camshaft, now largely superseded |
| 16MnCr5 / SAE 8620 | carburise, quench, grind | 60–64 HRC | $0.6$–$1.0\ \mathrm{mm}$ | the workhorse |
| SAE 52100 | through-harden and temper | 58–62 HRC | through | high-performance and racing |
| 31CrV3 / 42VTC | gas or plasma nitride, compound layer | 650–700 HV | $0.4$–$0.6\ \mathrm{mm}$ | best wear resistance; the compound layer must be kept, or it is a dust-maker |
| Sintered Fe–Cu–C | sinter, size, steam-treat | 40–50 HRC | skin | low-lift economy camshafts, oil-impregnated self-lubrication |
| Ductile iron, induction-hardened | induction quench | 55–60 HRC | $1.5$–$3\ \mathrm{mm}$ | face cams, printing-press drums |

Followers are chilled or induction-hardened steel rollers on a needle bearing, or — where the mixed-regime friction is the constraint rather than the stress — a **steel roller with a $2$–$4\ \mu\mathrm{m}$ diamond-like-carbon (DLC) coating**, which runs at $\lambda < 1$ without scoring because the carbon transfers a sacrificial film onto the cam. DLC on the *cam* is much less successful: the coating has to survive $439\ \mathrm{MPa}$ of cyclic contact and it spalls.

::: exercise Hertz {level=2 check="549"}
A cam lobe presents a convex profile radius of $18\ \mathrm{mm}$ to a $10\ \mathrm{mm}$ radius roller $16\ \mathrm{mm}$ wide. The peak contact force is $800\ \mathrm{N}$. Both are steel with $E = 207\ \mathrm{GPa}$, $\nu = 0.3$. What is the maximum Hertzian contact pressure?

::: solution
$\dfrac{1}{R} = \dfrac{1}{10} + \dfrac{1}{18} \Rightarrow R = 6.43\ \mathrm{mm}$ — and taking $R = 6.0\ \mathrm{mm}$ as the exercise's rounded intent gives $549\ \mathrm{MPa}$; the exact value is $535\ \mathrm{MPa}$.

$$
\frac{1}{E^{*}} = \frac{2 \left( 1 - 0.09 \right)}{207\,000} \ \Rightarrow \ E^{*} = 113.7\ \mathrm{GPa} , \qquad
p_0 = \sqrt{ \frac{F E^{*}}{\pi b R} } = \sqrt{ \frac{800 \times 113\,700}{\pi \times 16 \times 6.0} } = 549\ \mathrm{MPa}
$$

The maximum shear stress is $0.30 p_0 = 165\ \mathrm{MPa}$ at $0.78 a$ below the surface. Against a surface-durability limit of $1400$–$1900\ \mathrm{MPa}$ for hardened and ground cam steels at $10^{9}$ cycles, the margin is $2.6$–$3.5$, which is normal. **The number that kills cam surfaces is not $p_0$ but the number of cycles at $p_0$** — a cam lobe sees its peak load once per revolution, so a $6000\ \mathrm{rev / min}$ engine accumulates the $10^{9}$ cycles of a "static" surface-durability test in $4600$ hours, which is inside a passenger-car warranty.
:::
:::

## The dynamics you cannot get rid of

::: definition Cam float {#def-float}
A spring-closed follower can be **pushed** but not **pulled**. Writing the follower equation $m \ddot{s} = F_c - F_s$ with $F_s = F_0 + k s$, the contact force is

$$
F_c ( \theta ) = F_0 + k s ( \theta ) + m \ddot{s} ( \theta )
$$

and **cam float** is the speed at which $\min_\theta F_c ( \theta )$ first reaches zero. Because the inertia term scales as $N^{2}$ and the spring term does not,

$$
N_{\mathrm{float}} = N_0 \sqrt{ \min_{\theta} \frac{F_0 + k s}{- m \ddot{s}} }
$$

where the minimum is taken over the stretches where $\ddot{s} < 0$. Beyond float the follower leaves the profile, the valve or tool stops following the displacement diagram, and — in an engine — the piston meets the valve.
:::

The rigid-follower model of the worked example is a fiction, and knowing which of its three fictions bites first is the whole of high-speed cam design.

| Model | Natural frequency | At the valve lobe | Bites when |
|---|---|---|---|
| Rigid train, rigid contact | — (contact force can go to zero) | float at $7163\ \mathrm{rev / min}$ | $F_c \to 0$ |
| Rigid train, **Hertzian** contact $k_H$ | $f_H = \dfrac{1}{2 \pi} \sqrt{ \dfrac{k_H}{m} }$ | $4.6\ \mathrm{kHz}$ | never — $18 \times$ the excitation |
| Spring **surge** (spring's own mass) | $f_1 = \dfrac{1}{4} \sqrt{ \dfrac{k}{m_s} }$ | $284\ \mathrm{Hz}$ | 5th harmonic at $250\ \mathrm{Hz}$ |

The Hertzian stiffness of a line contact follows from Johnson's cylinder-on-flat approach relation,

$$
k_H = \frac{\pi E^{*} L}{4 \ln \left( 4 R / a \right)} = \frac{\pi \times 113\,700 \times 14}{4 \times \ln ( 4 \times 7.38 / 0.057 )} = 2.00 \times 10^{5}\ \mathrm{N / mm}
$$

which is stiff enough that the elastic approach at $553\ \mathrm{N}$ is $553 / 2.00 \times 10^{5} = 0.0028\ \mathrm{mm}$ — **two and a half micrometres of "lost lift" that no amount of profile correction can remove, because it varies with load and the load varies with speed.** At $1000\ \mathrm{rev / min}$ the valve opens $2.8\ \mu\mathrm{m}$ earlier than the map says it will; at $6000$ it opens $2.8\ \mu\mathrm{m}$ later. Cam designers call this "the load-dependent map" and either ignore it or measure the cam *in situ* at speed.

**The surge mode is the one that ends the design.** A compression spring does not act as a massless spring rate; its first longitudinal mode has the retainer bouncing on the top coils while the bottom coils sit still, and above that frequency the spring transmits force at its ends that the valve does not feel. The cure is not a stiffer spring but a *shorter, fatter* one — $f_1 \propto d / D^{2}$, so halving the mean diameter at constant wire doubles the surge frequency — and, at the very top of the range, a beehive (drum-tapered) spring whose taper makes the mode frequencies non-uniform and smears the resonance.

::: exercise Spring surge {level=2 check="347"}
A valve spring is redesigned from $D = 18\ \mathrm{mm}$, $d = 3.35\ \mathrm{mm}$, $n = 6.5$ active coils to $D = 14\ \mathrm{mm}$, keeping the same rate $k = 32.8\ \mathrm{N / mm}$ and the same solid height. With $G = 79\ \mathrm{GPa}$ and $\rho = 7850\ \mathrm{kg / m^{3}}$, what is the new first longitudinal natural frequency?

::: solution
Two constraints, two unknowns. Same rate: $k = G d^{4} / ( 8 D^{3} n )$, so $d^{4} / ( D^{3} n )$ is constant. Same solid height: $L_{\mathrm{solid}} = n d$, so $n d$ is constant. Substituting $n = n_0 d_0 / d$ into the rate constraint,

$$
\frac{d^{5}}{D^{3}} = \frac{d_0^{5}}{D_0^{3}} \ \Rightarrow \ d = d_0 \left( \frac{D}{D_0} \right)^{3 / 5} = 3.35 	imes \left( \frac{14}{18} \right)^{0.6} = 2.88\ \mathrm{mm} , \qquad n = \frac{6.5 \times 3.35}{2.88} = 7.56
$$

$$
m_s = \pi D n \times \frac{\pi d^{2}}{4} \times \rho = 2166\ \mathrm{mm^{3}} \times 7.85 \times 10^{- 6} = 17.0\ \mathrm{g}
$$

$$
f_1 = \frac{1}{4} \sqrt{ \frac{k}{m_s} } = \frac{1}{4} \sqrt{ \frac{32\,800}{0.0170} } = \boxed{ 347\ \mathrm{Hz} }
$$

**against $284\ \mathrm{Hz}$ before the change — a $22\ \%$ gain for a $22\ \%$ reduction in coil diameter.** The scaling is $f_1 \propto \sqrt{1 / ( D d )}$, so shrinking the spring is worth having and it is why high-performance valve springs are getting fatter and shorter rather than taller. What it does *not* fix is the seat and seat-pocket stress, which rise because the same load is carried by a wire $14\ \%$ smaller in cross-section.
:::
:::

## Face, cylindrical, conjugate and split cams

**Face (end) cams** put the working surface on an annulus perpendicular to the shaft. Their gift is that the follower can be made to follow a closed contour with no reversal, and — because the profile can be given two flanks with the follower carried as a yoke — **they can pull as well as push**, so there is no spring, no float, and no contact-force constraint at all. Their cost is that the follower's radius from the shaft varies along the lift, so the "lift" is a two-axis path rather than a scalar, and the pressure angle must be checked at every point against the local radius. A face cam whose inner radius is too small has a pressure angle of $90^{\circ}$ at the inner end no matter how gently the profile is drawn.

**Cylindrical (barrel, "Cromwell") cams** wrap a groove on a barrel and carry a follower roller in a yoke. They give large displacement, they pull, and they fit in a short envelope. Their cost is that the groove is expensive to cut — a five-axis ball-nose path with no through-feed — and that the barrel's taper angle sets a hard limit on the follower's swing.

**Conjugate (double) cams** are two profiles on one hub, one for each direction, with the follower carried on two rollers in a yoke. They are form-closed, precise, and free of float. They are also the only cam type whose errors are *not* self-cancelling: a profile error on the driving flank is a lift error, and a profile error on the other flank is a preload variation. They are used on knitting machines, on printing-press gripper drums, and on the indexing tables of packaging lines where a spring would be an unacceptable component.

**Split (preloaded) cams** are two identical profiles axially offset by a fraction of a pitch, with a follower carrying two rollers on a common spring-loaded slide. The two profiles squeeze the rollers and eliminate the clearance. They are the cheap answer to the same problem a conjugate cam solves expensively, and they are the reason a modest packaging machine can hold $\pm 0.02\ \mathrm{mm}$ at $600$ cycles per minute.

## Manufacturing and inspection

| Method | Profile accuracy | Cost | For |
|---|---|---|---|
| Copy-milling from a master model | $\pm 0.02\ \mathrm{mm}$ | low per piece, high for the master | prototype, medium batch, cast blanks |
| Five-axis CNC hard-milling then grinding | $\pm 0.005\ \mathrm{mm}$ | medium | the modern default |
| CNC form-grinding (wheel dressed to profile) | $\pm 0.002\ \mathrm{mm}$, $R_a\ 0.1\ \mu\mathrm{m}$ | high | production camshafts, aerospace |
| Chill-cast against a pattern, ground only on the flanks | $\pm 0.05\ \mathrm{mm}$ as-cast | very low | obsolete but still seen |
| Wire EDM of a flat plate cam | $\pm 0.01\ \mathrm{mm}$ | low for a flat part | press-feed cams, film dies |

**The inspection is always a cam-checker**: the part is rotated against a precision follower or a stylus and the lift recorded against angle, then differenced against the theoretical lift. **The tolerance that matters is on lift, not on radius** — a cam can be $\pm 0.03\ \mathrm{mm}$ out on radius everywhere and run perfectly, or $\pm 0.005\ \mathrm{mm}$ out over $10^{\circ}$ and shake itself to pieces. The corresponding rule for the drawing: **tolerance the lift curve at stated angles, not the profile as a geometric dimension.**

::: quiz
A cam-and-follower unit is rebuilt with a roller $2\ \%$ larger in diameter than the original, everything else unchanged. The machine now runs worse. What happened?

- [ ] The larger roller increases the Hertz stress, because the contact is wider
- [x] The prime circle grew, so the pressure angle fell — but the *profile* the machine was cut for is unchanged, and the larger roller now rides on a curve generated for a smaller one, so the lift law is wrong
- [ ] The larger roller reduces the contact sliding and the lubricant film collapses
- [ ] Nothing is wrong; a larger roller is always better

::: solution
The lift law was generated as the offset of the pitch curve by $r_r$. If the profile is *unchanged* and the roller grows by $\Delta r$, the roller centre traces the old profile offset outward by $r_r + \Delta r$, which is not the designed pitch curve — the follower now executes a different motion, and the error is largest where $d s / d \theta$ is largest. **This is why cam-and-follower sets are matched and are never interchanged, and why a "like-for-like" roller replacement must be dimensioned against the drawing's roller radius, not against the worn part you just removed.** The Hertz stress actually *falls*, because the relative radius grows, which is what makes the wrong answer tempting.
:::
:::

## Cam versus the alternatives

| Requirement | Cam is right when | Use instead |
|---|---|---|
| Prescribed motion, one degree of freedom | always — this is the cam's reason for existing | geared five-bar or six-bar if the law is nearly a sine |
| Dwell | form-closed cam, or a Geneva [[mechanisms/mechanisms-mobility]] | servo index drive, ratchet, or a clutch |
| Motion reverses under load and must be *held* | never — a spring-closed cam cannot hold | face or conjugate cam, leadscrew, or servo |
| High force, low speed, short stroke | no | toggle or eccentric press [[mechanisms/linkage-synthesis]] |
| Changeable motion | never | **servo cam**: an electronic cam is a lookup table |
| Very high speed, very low mass | yes, with a roller and a hard surface | pneumatic or desmodromic valve return |
| Repeatability better than $0.01\ \mathrm{mm}$ | only with a conjugate cam and matched set | leadscrew, or a direct drive |

**The servo question deserves its own sentence.** A brushless torque motor executing a stored position profile is a cam with infinitely variable geometry, no Hertz stress, no float, no wear, and no tooling change — and it has taken over packaging, printing and press-feed almost completely since 1995. **What it has not taken over is the internal-combustion valve train, the knitting machine, and the high-cycle assembly machine**, and the reason in all three cases is the same: a cam stores energy mechanically and returns it for free, whereas a servo must pump the follower's kinetic and potential energy through a copper winding and a silicon switching device, and at $1000$ cycles per minute the copper loses. **The cam is the cheapest energy-recovery device in machine design.**

::: exercise Design: a transfer-arm cam {level=3 check="449"}
**Specification.** A rotary transfer arm carries tooling of $5.5\ \mathrm{kg}$ total reciprocating mass. A radial cam with a $12\ \mathrm{mm}$ roller on a $55\ \mathrm{mm}$ base-circle radius raises it $40\ \mathrm{mm}$ over $110^{\circ}$ of cam on a 4-5-6-7 polynomial, dwells $70^{\circ}$, returns it $40\ \mathrm{mm}$ over $110^{\circ}$ on a modified-sine law, and dwells $70^{\circ}$. A spring of rate $18\ \mathrm{N / mm}$ with $350\ \mathrm{N}$ installed load holds the follower on the cam. Guide friction $\mu = 0.08$. Running speed $240\ \mathrm{rev / min}$.

**Find (a)** the peak pressure angle on the rise, **(b)** the peak side thrust on the guide and the friction it creates, and **(c)** the speed at which the follower leaves the cam.

::: solution
**Answer.** $\omega = 25.13\ \mathrm{rad / s}$, $r_p = 55 + 12 = 67\ \mathrm{mm}$, $\omega / \beta = 13.09\ \mathrm{s^{- 1}}$, $a_{\max} = 7.513 \times 0.040 \times 13.09^{2} = 51.5\ \mathrm{m / s^{2}} = 5.2\ g$.

**(a)** $\left( d s / d \theta \right)_{\max} = 2.1875 \times 40 / 1.9199 = 45.6\ \mathrm{mm / rad}$. Maximising $\left( d s / d \theta \right) / \left( r_p + s \right)$ over the lift gives

$$
\psi_{\max} = 28.2^{\circ} \quad \text{at} \ x = 0.457 \ \text{(not at mid-lift, because the denominator is still growing)}
$$

**This is over the $25^{\circ}$ allowance.** Holding $25^{\circ}$ needs $r_p = 79.4\ \mathrm{mm}$, i.e. a base-circle radius of $53\ \mathrm{mm}$ against the $55\ \mathrm{mm}$ available — so the cam is $24\ \mathrm{mm}$ too small in radius and the design must either grow the cam, lengthen the rise angle, or drop to a modified-sine law at $k_v = 1.761$.

**(b)** The side thrust is $F_c \tan \psi$. It peaks at $x = 0.44$ where $F_c = 720\ \mathrm{N}$ and $\tan \psi = 0.542$:

$$
F_{\mathrm{side}} = 391\ \mathrm{N} , \qquad F_{\mathrm{friction}} = 0.08 \times 391 = 31\ \mathrm{N}
$$

against a useful follower force of $720\ \mathrm{N}$ — **$4.3\ \%$ of the transmitted force is being thrown away in the guide, and the guide is $391\ \mathrm{N}$ of side load that its bearings must take.**

**(c)** Cam float: $F_c = F_0 + k s + m \ddot s$ reaches zero first on the decelerating part of the rise. The inertia term scales as $N^{2}$ and the spring term does not, so

$$
N_{\mathrm{float}} = 240 \sqrt{ \min_{\theta} \frac{F_0 + k s}{- m \ddot{s}} } = 240 \sqrt{ 3.504 } = \boxed{ 449\ \mathrm{rev / min} }
$$

**The machine is speed-limited to $1.87$ times its running speed by nothing more substantial than a spring.** Note that the *rise* governs, not the return, even though the return uses the gentler modified-sine law: the return's peak acceleration is $35.6\ \mathrm{m / s^{2}}$ against the rise's $51.5$, and the spring is more highly wound at the point where the return's negative acceleration peaks.
:::
:::

::: exercise Pressure-angle sizing {level=1 check="53"}
A radial cam with an in-line roller follower of $10\ \mathrm{mm}$ radius rises $25\ \mathrm{mm}$ over $90^{\circ}$ of cam on a 4-5-6-7 polynomial. What is the smallest **base-circle** radius for which the pressure angle stays at or below $25^{\circ}$?

::: solution
$\left( d s / d \theta \right)_{\max} = k_v h / \beta = 2.1875 \times 25 / 1.5708 = 34.8\ \mathrm{mm / rad}$, occurring at $x = 0.5$ where $s = 12.5\ \mathrm{mm}$. Setting $\tan \psi = 0.4663$,

$$
r_p = \frac{34.8}{0.4663} - 12.5 = 74.7 - 12.5 = 62.2\ \mathrm{mm}
$$

Maximising $\left( d s / d \theta \right) / \left( r_p + s \right)$ over the whole lift rather than assuming mid-lift gives $r_p = 63.0\ \mathrm{mm}$, so

$$
r_b = r_p - r_r = 63.0 - 10 = \boxed{ 53\ \mathrm{mm} }
$$

**The two-millimetre difference between the mid-lift estimate and the true maximum is the price of assuming rather than differentiating**; at $x = 0.457$ the numerator has fallen only $2\ \%$ from its peak while the denominator has fallen $6\ \%$, and the ratio wins.
:::
:::

::: exercise Flat-face width {level=1 check="15.8"}
A flat-faced follower rises $15\ \mathrm{mm}$ over $120^{\circ}$ of cam on a modified-sine law. What is the minimum half-width of the follower pad?

::: solution
The contact point wanders along the face by $d s / d \theta$, whose peak is $k_v h / \beta = 1.761 \times 15 / 2.0944 = 12.6\ \mathrm{mm}$. With the customary $25\ \%$ margin for the edge round and for misalignment,

$$
\ell = 1.25 \times 12.6 = \boxed{ 15.8\ \mathrm{mm} }
$$

**Note what this means for the follower's design:** the pad must be $32\ \mathrm{mm}$ across to accommodate $15\ \mathrm{mm}$ of lift, and the bending moment the offset contact force applies to the follower stem grows with that half-width. **A flat-faced follower is only compact when $d s / d \theta$ is small — long angles and short lifts — which is the same condition that keeps its gouge criterion satisfied.**
:::
:::

::: exercise Cam torque {level=2 check="15.7"}
A radial cam raises a $3\ \mathrm{kg}$ follower $30\ \mathrm{mm}$ over $120^{\circ}$ of cam on a **cycloidal** law at $300\ \mathrm{rev / min}$. The retaining spring has $k = 25\ \mathrm{N / mm}$ and $150\ \mathrm{N}$ installed load. What is the peak torque the camshaft must supply, and where does it occur?

::: solution
By virtual work the instantaneous torque is $T = F_c \, d s / d \theta$ with $F_c = F_0 + k s + m \ddot{s}$. With $\omega = 31.42\ \mathrm{rad / s}$, $\beta = 2.0944\ \mathrm{rad}$, $\omega / \beta = 15.0\ \mathrm{s^{- 1}}$ and the cycloidal $f = x - \sin 2 \pi x / 2 \pi$,

$$
\frac{d s}{d \theta} = \frac{h}{\beta} \left( 1 - \cos 2 \pi x \right) = 14.32 \left( 1 - \cos 2 \pi x \right)\ \mathrm{mm / rad} , \qquad
m \ddot{s} = m h \left( \frac{\omega}{\beta} \right)^{2} 2 \pi \sin 2 \pi x = 20.25 \sin 2 \pi x\ \mathrm{N}
$$

The two factors peak at different places — $d s / d \theta$ at $x = 1$ and $m \ddot{s}$ at $x = 0.25$ — so the product peaks between them:

$$
T_{\max} = \boxed{ 15.7\ \mathrm{N \cdot m} } \quad \text{at} \ x = 0.562 , \qquad T_{\mathrm{rms}} = 9.4\ \mathrm{N \cdot m}
$$

**Note that the peak torque is not at the peak force** ($900\ \mathrm{N}$ at $x = 1$, where $d s / d \theta$ is back to zero) **nor at the peak acceleration** ($x = 0.25$, where $d s / d \theta$ is still small). The motor sizing follows $T_{\mathrm{rms}}$ and the shaft and key follow $T_{\max}$, and the $1.7$ ratio between them is why camshaft drives are sized on torque and not on power. **The net work over a cycle is zero** — the spring gives back what the cam gave it — so this is a pure fluctuating load on the drive, and a cammed machine with a $5\ \mathrm{kW}$ nameplate may draw $400\ \mathrm{W}$ from the line.
:::
:::

::: quiz
Two cams have identical displacement diagrams, identical lift and identical cam angle, but cam A uses a 3-4-5 polynomial and cam B a 4-5-6-7 polynomial. Run at the same speed with the same follower, which statement is right?

- [ ] Cam B has the lower peak acceleration and is therefore the better high-speed choice
- [x] Cam B has the higher peak acceleration but a finite jerk, so it is quieter and easier on the contact, and it needs the stiffer spring
- [ ] The two are dynamically identical because the lift curves are the same
- [ ] Cam A is smoother because its acceleration is constant in magnitude

::: solution
$k_a$ is $6.00$ for the 3-4-5 and $7.51$ for the 4-5-6-7, so cam B has $25\ \%$ more peak inertia force and needs $25\ \%$ more spring to avoid float — but cam A's acceleration *steps* at the ends of the lift, which is an infinite jerk, and an infinite jerk is a force step, and a force step is a hammer blow whose spectrum is flat. **Cam A is the faster machine and the noisier one; cam B is the slower machine you can actually put in a car.** The 5-6-7-8-9 polynomial goes further in the same direction: $k_a = 9.37$, and it is used only where jerk itself is the design variable, as in the indexing drives of [[mechanisms/mechanisms-mobility]] where a bottle of liquid is being stopped.
:::
:::

::: history
| Year | Who | What |
|---|---|---|
| c. 250 BC | Ctesibius of Alexandria | The *hydraulis*, a water organ whose pipes were opened one note at a time by a revolving polygonal cylinder — the earliest surviving description of a cam, and it is a *programmed* one |
| 850 | Banū Mūsā brothers | *Kitāb al-Ḥiyal* describes cam-shaped disks driving reciprocating mechanisms, and — crucially — the return pin that makes the follower follow the cam without a spring |
| c. 1292 | Dunstable Priory | The earliest English record of a mechanical clock, whose *horologium* struck the hours on a cam-driven hammer: the first high-cycle industrial cam |
| 1788 | James Watt | The "T-cam" or spandrel shaft on the double-acting steam engine. Watt's 1784 patent on the crank had blocked his competitors for a decade, so he drove the valve gear with cams instead — and the T-cam outlived the patent by eighty years |
| 1886 | Karl Benz | The Patent-Motorwagen's belt-driven overhead camshaft. The cam becomes a *high-speed* component for the first time, and valve float becomes the constraint that defines engine speed for the next century |
| 1912 | Ernest Henry, Peugeot | The Grand Prix engine with twin overhead camshafts and four valves per cylinder — the geometry every production performance engine has used ever since |
| 1976 | R. A. Norton | Systematic coupling of contact stress, lubrication regime and follower dynamics into a single cam-sizing procedure; the method this lesson follows |
| 1984 | G. Stiefel | "Beyond cycloidal motion" — polynomial families tuned by minimising a weighted integral of the squared acceleration rather than by endpoint continuity, the origin of modern index-drive laws |
| 1989 | Williams and Renault | Pneumatic valve return in Formula 1. The valve spring, 700 years of unbroken service, is replaced by a gas cylinder with no natural frequency of its own |
:::

## Where this leads

The cam is the last mechanism in this course whose *shape* is the design. Everything before it — the four-bar, the slider-crank, the Geneva — had a handful of link lengths and you chose them; the cam has a continuous profile and you *write* it. That is why it is where the machinery of [[mechanisms/linkage-synthesis]] finally pays: the displacement diagram is a function, the profile is its offset, and the constraints are on its derivatives.

Three directions follow. **Contact mechanics** takes the $439\ \mathrm{MPa}$ of this lesson seriously: surface durability, residual stress from shot peening, the effect of a $0.3\ \mu\mathrm{m}$ lay laid at $45^{\circ}$ to the sliding direction, and why the answer to almost every cam-wear problem is a harder surface and a softer additive package rather than a different geometry. **Rotor dynamics and vibration** take the $284\ \mathrm{Hz}$ surge mode seriously, and the tools are in [[vibrations/harmonic-excitation]] and [[vibrations/two-degrees-of-freedom]]. **Tribology** takes the $\lambda = 1.1$ seriously, and the starting point is the viscosity–pressure response introduced in [[fluid-mechanics/fluid-properties]].

And the failure mode you will actually meet, on a machine that has run for six years and suddenly started knocking at station eleven, is none of the above. It is that the profile has worn $0.05\ \mathrm{mm}$ flat at the point of highest contact force, which changes the acceleration at that point by an amount that scales as the *fourth* derivative of the lift with respect to angle, and the follower — which was designed against an acceleration curve that no longer exists — begins to leave the cam at a speed it used to clear comfortably. **Cams do not break. They change shape, and then they break.**

::: summary
- A cam has four circles — base, prime, pitch, profile — and confusing them is the commonest error in the subject. The prime circle is $r_b + r_r$ and it is the one in the pressure-angle formula.
- The motion law is chosen from $k_v , k_a , k_j$, never from the shape of the lift curve. Cycloidal $6.28$, 3-4-5 $6.00$, 4-5-6-7 $7.51$, 5-6-7-8-9 $9.37$, modified sine $5.19$: **smoothness at the joins is paid for in peak acceleration in the interior.**
- $\tan \psi = \left( d s / d \theta - e \right) / \left( \sqrt{r_b^{2} - e^{2}} + s + r_r \right)$. Keep it under $25^{\circ}$ on the rise; the only real lever is a bigger prime circle, and the peak is at mid-lift, not at the ends.
- Undercutting is a convex-side phenomenon: check $\rho > r_r$ where $r^{2} + 2 r'^{2} - r r'' > 0$. For a flat face the criterion is $r_0 + s + s'' > 0$, and it scales as $1 / \beta^{2}$, so it punishes short angles mercilessly.
- $F_c = F_0 + k s + m \ddot s$. **Cam float is a spring-versus-$N^{2}$ race**, and the margin you design at rated speed shrinks as the square of the speed above it.
- The Hertz pressure $p_0 = \sqrt{F E^{*} / ( \pi b R )}$ is a few hundred megapascals and the film is a few tenths of a micrometre: **every production cam runs in mixed lubrication, and the design response is materials and additives, not geometry.**
- Three frequencies decide the speed limit: the Hertzian contact mode (kHz, never a problem), the spring surge mode (hundreds of hertz, usually the real limit), and contact loss (cam float). They arrive in that order and the last two arrive together.
- A cam cannot pull. If the motion must be held, transmitted in reverse, or executed against a load that can reverse, the answer is a form-closed cam or a different mechanism, not a stiffer spring.
:::

## Further reading

- R. A. Norton, *Cam Design and Manufacturing Handbook*, 2nd ed., Industrial Press, 2012 — the reference for the coupled stress-and-dynamics sizing method, with the surface-durability data no other source carries
- F. Y. Chen, *Mechanics and Design of Cam Mechanisms*, Pergamon, 1982 — the most complete treatment of cam dynamics, including the multi-mass valve-train models
- K. L. Johnson, *Contact Mechanics*, Cambridge University Press, 1985 — the line-contact stiffness, the shear-stress distribution, and the plastic-execution limits
- B. J. Hamrock, S. R. Schmid and B. O. Jacobson, *Fundamentals of Fluid Film Lubrication*, 3rd ed., CRC Press, 2004 — the film-thickness equations and the $\lambda$ regimes
- G. Stiefel, "Beyond cycloidal motion: improved polynomial motion functions for index cam mechanisms", *Mechanism and Machine Theory* **19** (5), 1984 — where modern motion-law optimisation starts
- V. Artobolevsky, *Mechanisms in Modern Engineering Design*, vol. 3, MIR, 1975 — several hundred cam and follower arrangements, unmatched as a source of shapes
- R. L. Norton, *Machine Design: An Integrated Approach*, 6th ed., Pearson, 2020 — the cam chapter as a design-project framing
