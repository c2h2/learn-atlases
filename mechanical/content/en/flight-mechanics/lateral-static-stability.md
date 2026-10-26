An aircraft flying straight and level is symmetric about its plane of symmetry, and the forces of [[flight-mechanics/longitudinal-static-stability]] all act in that plane. A gust from the side, an engine failure, a crosswind on the approach or a deflected aileron breaks the symmetry. The aircraft then slips sideways relative to the air, and three new quantities appear: a side force, a **yawing moment** about the vertical axis and a **rolling moment** about the longitudinal axis. This lesson asks the static questions about them: does the aircraft turn its nose back into the relative wind after a sideslip (directional or "weathercock" stability)? Does a sideslip make it roll away from the slip (the dihedral effect)? And how large must the rudder and ailerons be to balance an engine failure, a crosswind, or to roll the aircraft at a useful rate?

Roll and yaw are always coupled — yawing changes the speed of each wing and so their lift, and rolling tilts the lift and makes the aircraft slip — so "lateral" (roll) and "directional" (yaw) stability are studied together. Their dynamic consequences, the Dutch roll and spiral modes, are in [[flight-mechanics/dynamic-modes]].

## Sideslip and the lateral–directional coefficients {#sec-sideslip}

::: definition Sideslip angle and lateral–directional coefficients {#def-sideslip}
With body axes $x$ forward, $y$ to the right wing and $z$ down (the axes are set out fully in [[flight-mechanics/aircraft-equations-of-motion]]), let the velocity of the aircraft relative to the air have components $(u, v, w)$. The **sideslip angle** is
$$
\beta = \sin^{-1}\frac{v}{V} \approx \frac{v}{V},
$$
positive when the relative wind comes from the right (the aircraft moves to its right through the air). The side force $Y$, rolling moment $\mathcal{L}$ (positive right wing down) and yawing moment $N$ (positive nose right) are made dimensionless with the span $b$:
$$
C_Y = \frac{Y}{qS},\qquad C_l = \frac{\mathcal{L}}{qSb},\qquad C_n = \frac{N}{qSb}.
$$
The rudder deflection $\delta_r$ is positive trailing edge to the left (producing a nose-left moment); the aileron deflection $\delta_a$ is defined positive when it produces a positive (right-wing-down) rolling moment.
:::

A symmetric aircraft in symmetric flight has $C_Y = C_l = C_n = 0$, so to first order each coefficient is a linear combination of $\beta$, the control deflections and the angular rates. The static derivatives with respect to $\beta$ are the subject of this lesson:
$$
C_{n\beta} = \frac{\partial C_n}{\partial\beta},\qquad C_{l\beta} = \frac{\partial C_l}{\partial\beta},\qquad C_{Y\beta} = \frac{\partial C_Y}{\partial\beta}.
$$

## Directional stability {#sec-directional}

If a gust yaws the nose to the left while the aircraft continues along its original path, the relative wind now comes from the right: $\beta > 0$. A directionally stable aircraft responds with a nose-right yawing moment, turning back into the wind like a weathervane:

::: definition Directional (weathercock) stability {#def-directional}
An aircraft is **directionally stable** if
$$
C_{n\beta} > 0 .
$$
:::

The fuselage and nacelles, seen from the side, behave like a slender body: the side force on the forward part of the fuselage acts ahead of the centre of gravity and gives a *destabilising* contribution $C_{n\beta,f} < 0$ (typically $-0.03$ to $-0.10\ \mathrm{rad^{-1}}$ for light aircraft). The wing contributes little. The **vertical tail** provides the stability.

**Free-body diagram of the fin in sideslip.** The vertical tail, of area $S_v$ and lift-curve slope $a_v$, has its aerodynamic centre a distance $l_v$ behind the centre of gravity and $z_v$ above the roll axis. In sideslip the flow at the fin is turned by the fuselage and wing (the **sidewash** angle $\sigma$, with gradient $\mathrm{d}\sigma/\mathrm{d}\beta$), and the dynamic pressure there is $\eta_vq$. The fin meets the flow at angle of attack $\alpha_v = \beta(1 + \mathrm{d}\sigma/\mathrm{d}\beta)$ (sidewash in this convention adds to the sideslip) and produces a side force to the left, $Y_v = -\eta_vqS_va_v\alpha_v$, at its aerodynamic centre.

::: proposition Vertical-tail contribution to directional stability {#prop-fin}
With the **vertical tail volume coefficient** $V_v = l_vS_v/(Sb)$, the vertical tail contributes
$$
C_{n\beta,v} = \eta_v\,V_v\,a_v\left(1 + \frac{\mathrm{d}\sigma}{\mathrm{d}\beta}\right),\qquad
C_{Y\beta,v} = -\eta_v\frac{S_v}{S}a_v\left(1 + \frac{\mathrm{d}\sigma}{\mathrm{d}\beta}\right),\qquad
C_{l\beta,v} = C_{Y\beta,v}\,\frac{z_v}{b},
$$ {#eq-fin}
and a rudder of effectiveness $\tau_r$ gives
$$
C_{n\delta r} = -\eta_v\,V_v\,a_v\,\tau_r,\qquad C_{Y\delta r} = \eta_v\frac{S_v}{S}a_v\tau_r,\qquad C_{l\delta r} = C_{Y\delta r}\,\frac{z_v}{b}.
$$ {#eq-rudder}
:::

::: proof
The side force on the fin is $Y_v = -\eta_vqS_va_v(1 + \mathrm{d}\sigma/\mathrm{d}\beta)\beta$, acting at $(x, y, z) = (-l_v, 0, -z_v)$ relative to the centre of gravity. The moment of a force $(0, Y_v, 0)$ at that point is $\mathbf{r}\times\mathbf{F} = (z_vY_v,\ 0,\ -l_vY_v)$. Hence the yawing moment is $N = -l_vY_v = \eta_vqS_va_v(1 + \mathrm{d}\sigma/\mathrm{d}\beta)l_v\beta$ and the rolling moment is $\mathcal{L} = z_vY_v$. Dividing by $qSb$ (or $qS$ for the side force) and differentiating with respect to $\beta$ gives [[#eq-fin]]. A rudder deflected trailing edge left by $\delta_r$ adds a fin lift $\eta_vqS_va_v\tau_r\delta_r$ to the *right* ($+y$), which by the same moment arms gives [[#eq-rudder]]. Assumptions: linear fin aerodynamics, small $\beta$, fin effectiveness unaffected by the horizontal tail position (in reality an end-plating tailplane raises the effective aspect ratio of the fin, and a T-tail more so).
:::

Typical total values of $C_{n\beta}$ are $0.05$–$0.15\ \mathrm{rad^{-1}}$ (roughly $0.001$–$0.003$ per degree). Too little and the aircraft wanders in yaw and is prone to Dutch roll; too much and it becomes spirally divergent (see below) and is uncomfortable in turbulence.

::: example Directional stability of the light aircraft {#ex-fin}
The light aircraft ($S = 16.2\ \mathrm{m^2}$, $b = 11.02\ \mathrm{m}$) has a fin of $S_v = 1.6\ \mathrm{m^2}$ with $a_v = 3.0\ \mathrm{rad^{-1}}$, $l_v = 4.6\ \mathrm{m}$, $\eta_v = 0.95$ and $\mathrm{d}\sigma/\mathrm{d}\beta = 0.10$; the fuselage contributes $C_{n\beta,f} = -0.060\ \mathrm{rad^{-1}}$. Find $C_{n\beta}$ and the rudder power $C_{n\delta r}$ for a rudder effectiveness $\tau_r = 0.50$. What yawing moment does a $5^\circ$ sideslip produce at $50\ \mathrm{m/s}$ at sea level?
::: solution
$V_v = 4.6 \times 1.6/(16.2 \times 11.02) = 0.04122$. Fin contribution: $C_{n\beta,v} = 0.95 \times 0.04122 \times 3.0 \times 1.10 = 0.1292\ \mathrm{rad^{-1}}$; total $C_{n\beta} = 0.1292 - 0.060 = 0.0692\ \mathrm{rad^{-1}}$ ($0.00121$ per degree). Rudder: $C_{n\delta r} = -0.95 \times 0.04122 \times 3.0 \times 0.50 = -0.0587\ \mathrm{rad^{-1}}$. At $50\ \mathrm{m/s}$, $q = 1531\ \mathrm{Pa}$ and $qSb = 2.734\times10^{5}\ \mathrm{N\,m}$; for $\beta = 5^\circ = 0.0873\ \mathrm{rad}$, $N = 0.0692 \times 0.0873 \times 2.734\times10^{5} = 1651\ \mathrm{N\,m}$, nose right — back into the wind. Sanity check: the fin provides about twice the fuselage's destabilising moment, a typical balance; and a rudder of half the fin's effectiveness can hold a sideslip of $\beta = -C_{n\delta r}\delta_r/C_{n\beta}$, i.e. about $0.85\delta_r$.
:::
:::

::: widget plot
f: (0.95*4.6*Sv/(16.2*11.02)*3.0*1.1 + Cf)*x*pi/180; 0
x: -15, 15
y: -0.025, 0.025
sliders: Sv=1.6:0:3:0.05; Cf=-0.06:-0.15:0:0.005
labels: C_n
caption: Yawing-moment coefficient of the light aircraft against sideslip $\beta$ (degrees) for fin area $S_v$ (m²) and fuselage contribution $C_{n\beta,f}$ (`Cf`, per radian). A positive slope is directionally stable: a slip from the right produces a nose-right moment. Shrink the fin and the slope passes through zero at $S_v = 0.74\ \mathrm{m^2}$; below that the fuselage wins and the aircraft would yaw away from the relative wind. Nacelles and a longer nose make `Cf` more negative and require a bigger fin.
:::

## Roll stability and the dihedral effect {#sec-dihedral}

There is no "roll stiffness" in the sense of a moment proportional to bank angle: an aircraft banked in still air feels no aerodynamic rolling moment from the bank itself, since the airflow relative to it is unchanged. What bank does is tilt the lift, so the aircraft begins to slip sideways towards the lower wing. The **dihedral effect** is the rolling moment due to that sideslip.

::: definition Dihedral effect {#def-dihedral-effect}
An aircraft has a **stable dihedral effect** if a sideslip produces a rolling moment that lifts the wing towards which it is slipping:
$$
C_{l\beta} < 0 .
$$
With $\beta > 0$ (slipping to the right, after a right-wing-down bank), $C_l < 0$ rolls the aircraft left, back towards wings level.
:::

Several features contribute. **Geometric dihedral** $\Gamma$ (the wings inclined upward by $\Gamma$ from root to tip): in a sideslip $v$, the component of $v$ normal to the right wing is $v\sin\Gamma$ upward, which raises its angle of attack by $\beta\Gamma$, while the left wing's falls by the same amount. **Wing sweep**: the wing into the wind has a smaller effective sweep and higher lift — the contribution is proportional to $C_L\tan\Lambda$, so it grows at low speed. **Wing position**: the cross-flow around the fuselage raises the upwind wing's angle of attack on a high-wing aircraft (stabilising) and lowers it on a low-wing one (destabilising). **Vertical tail**: its side force acts above the roll axis ($C_{l\beta,v}$ in [[#eq-fin]]), stabilising.

::: proposition Rolling moment due to geometric dihedral {#prop-dihedral}
For a straight wing of span $b$, taper ratio $\lambda = c_t/c_r$, section lift-curve slope $a$ (per radian) and small dihedral angle $\Gamma$, strip theory gives
$$
C_{l\beta,\Gamma} = -\frac{a\,\Gamma}{6}\,\frac{1 + 2\lambda}{1 + \lambda},
$$ {#eq-dihedral}
which is $-a\Gamma/4$ for a rectangular wing.
:::

::: proof
Divide each half-wing into chordwise strips of width $\mathrm{d}y$ at distance $y$ from the centre line. In a sideslip $\beta$, the right-wing strips have their angle of attack increased by $\beta\Gamma$ and the left-wing strips decreased by the same amount. Each strip's lift changes by $\mathrm{d}L = \pm qac(y)\beta\Gamma\,\mathrm{d}y$ and acts at arm $y$, the increased lift on the right wing giving a negative (left-wing-down) rolling moment, as does the decreased lift on the left wing. Summing both halves,
$$
\mathcal{L} = -2qa\beta\Gamma\int_0^{b/2}c(y)\,y\,\mathrm{d}y .
$$
For a linear taper $c(y) = c_r[1 - (1 - \lambda)\,2y/b]$:
$$
\int_0^{b/2}c\,y\,\mathrm{d}y = c_r\left[\frac{b^2}{8} - (1 - \lambda)\frac{2}{b}\cdot\frac{b^3}{24}\right] = \frac{c_rb^2}{24}(1 + 2\lambda) .
$$
With $S = c_r(1 + \lambda)b/2$, $C_l = \mathcal{L}/(qSb) = -2a\beta\Gamma\,\dfrac{c_rb^2(1 + 2\lambda)/24}{c_r(1 + \lambda)b^2/2} = -\dfrac{a\beta\Gamma}{6}\dfrac{1 + 2\lambda}{1 + \lambda}$. Assumptions: strip theory (each strip responds to its own local angle of attack — it ignores the induced-velocity coupling of lifting-line theory, so with $a$ taken as the two-dimensional slope it overestimates the effect, and many texts use the three-dimensional slope instead), small angles, unswept wing.
:::

Only a little dihedral effect is wanted: enough for the aircraft to level its wings gently, but not so much that the Dutch roll becomes poorly damped or that crosswind landings need large aileron. Low-wing light aircraft typically have $5^\circ$–$7^\circ$ of geometric dihedral to overcome the wing–fuselage effect; high-wing aircraft $1^\circ$–$3^\circ$; swept-wing transports, which get a large dihedral effect from sweep, often have small dihedral, and many high-wing swept aircraft have **anhedral** (negative $\Gamma$).

## Roll control {#sec-roll-control}

Ailerons deflected in opposite directions on the two wings change the lift distribution antisymmetrically. As the aircraft starts to roll at rate $p$, each strip at $y$ meets an additional vertical velocity $py$, which changes its angle of attack by $py/V$ in the direction that *opposes* the roll: the down-going wing sees more angle of attack, the up-going wing less. This is **roll damping**, and it quickly balances the aileron moment, so that a steady roll rate is reached within a second or so.

::: proposition Roll damping and aileron power by strip theory {#prop-roll}
For a straight tapered wing, with the non-dimensional roll rate $\hat p = pb/(2V)$,
$$
C_{lp} = \frac{\partial C_l}{\partial\hat p} = -\frac{a}{12}\,\frac{1 + 3\lambda}{1 + \lambda},
\qquad
C_{l\delta a} = \frac{2a\tau_a}{Sb}\int_{y_1}^{y_2}c(y)\,y\,\mathrm{d}y ,
$$ {#eq-roll}
for ailerons between spanwise stations $y_1$ and $y_2$ with effectiveness $\tau_a$ (deflected by $\pm\delta_a$ on the two wings). The steady roll rate is reached when the moments balance:
$$
\frac{pb}{2V} = -\frac{C_{l\delta a}}{C_{lp}}\,\delta_a .
$$ {#eq-roll-rate}
:::

::: proof
*Damping:* a strip at $y$ on the right wing moving down at $py$ gains angle of attack $py/V$; the change of lift $qac\,(py/V)\,\mathrm{d}y$ acts at arm $y$ and opposes the roll, and the left wing contributes equally. Hence $\mathcal{L} = -2qa(p/V)\int_0^{b/2}cy^2\,\mathrm{d}y$. With the linear taper, $\int_0^{b/2}cy^2\,\mathrm{d}y = c_r(b/2)^3(1 + 3\lambda)/12$, and dividing by $qSb$ and by $\hat p = pb/(2V)$ gives $C_{lp}$. *Ailerons:* each aileron strip changes its lift by $qac\,\tau_a\delta_a\,\mathrm{d}y$, upwards on one wing and downwards on the other, so $\mathcal{L} = 2qa\tau_a\delta_a\int_{y_1}^{y_2}cy\,\mathrm{d}y$. *Steady roll:* $C_{l\delta a}\delta_a + C_{lp}\hat p = 0$. Assumptions: strip theory, rigid wing (wing twist under aileron load reduces the effectiveness and at high dynamic pressure can reverse it — **aileron reversal**), no sideslip.
:::

The quantity $pb/(2V)$ is the **helix angle**: the angle, in radians, of the helix traced by the wing tip. Gilruth's NACA flying-qualities criteria of the 1940s asked for a helix angle of about $0.07$ or more at full aileron; later specifications such as MIL-F-8785C state the requirement more directly, as the time to bank through a given angle for each class of aircraft and flight phase. Because $p = \hat p\cdot 2V/b$, the roll rate at full aileron grows with speed until stick forces, aileron reversal or a roll-rate limiter cap it.

::: example Steady roll rate of the light aircraft {#ex-roll}
The light aircraft's wing ($b = 11.02\ \mathrm{m}$, $S = 16.2\ \mathrm{m^2}$, $\lambda = 0.70$, $a = 4.8\ \mathrm{rad^{-1}}$ per strip) has ailerons from $60\,\%$ to $95\,\%$ of the semi-span with $\tau_a = 0.40$. Find $C_{lp}$, $C_{l\delta a}$ and the steady roll rate at $\delta_a = 15^\circ$ at $30$ and $50\ \mathrm{m/s}$.
::: solution
Root and tip chords: $c_r = 2S/[b(1 + \lambda)] = 32.4/(11.02 \times 1.7) = 1.729\ \mathrm{m}$, $c_t = 1.210\ \mathrm{m}$. Roll damping: $C_{lp} = -(4.8/12)(1 + 2.1)/1.7 = -0.729$. Aileron integral, from $y_1 = 3.307\ \mathrm{m}$ to $y_2 = 5.236\ \mathrm{m}$ with $c(y) = 1.729(1 - 0.05444y)$:
$$
\int_{y_1}^{y_2}c\,y\,\mathrm{d}y = 1.729\left[\frac{y^2}{2} - 0.05444\frac{y^3}{3}\right]_{3.307}^{5.236} = 10.88\ \mathrm{m^3},
$$
so $C_{l\delta a} = 2 \times 4.8 \times 0.40 \times 10.88/(16.2 \times 11.02) = 0.234\ \mathrm{rad^{-1}}$. Then $\hat p = (0.234/0.729) \times 0.2618 = 0.0840$, and $p = 0.0840 \times 2V/b$: $0.457\ \mathrm{rad/s} = 26.2^\circ/\mathrm{s}$ at $30\ \mathrm{m/s}$ and $43.6^\circ/\mathrm{s}$ at $50\ \mathrm{m/s}$. Sanity check: a helix angle of $0.084$ is in the range quoted above, and light aircraft do roll at $30^\circ$–$60^\circ/\mathrm{s}$ at full aileron. Strip theory overestimates both moments, but their ratio — which is what sets $\hat p$ — is much better.
:::
:::

**Adverse yaw.** The down-going aileron raises the lift and therefore the induced drag of its wing, while the up-going aileron reduces them; the result is a yawing moment *away* from the intended turn ($C_{n\delta a} < 0$ for $C_{l\delta a} > 0$). Rolling itself adds more, since the lift vectors of the down-going and up-going wing tilt forward and aft respectively (the derivative $C_{np}$, negative at low speed). The pilot compensates with rudder ("coordinating the turn"); designers reduce it with differential or Frise ailerons, spoilers (which reduce lift and add drag on the down-going side, giving favourable yaw) and on transport aircraft with an automatic yaw damper ([[flight-mechanics/flight-control]]).

## Asymmetric flight: crosswind and engine failure {#sec-asymmetric}

In steady asymmetric flight all three equations must balance at once:
$$
C_{Y\beta}\beta + C_{Y\delta r}\delta_r + C_L\sin\phi = 0,\qquad
C_{l\beta}\beta + C_{l\delta a}\delta_a + C_{l\delta r}\delta_r = 0,\qquad
C_{n\beta}\beta + C_{n\delta a}\delta_a + C_{n\delta r}\delta_r + C_{n,T} = 0,
$$ {#eq-lateral-trim}
where $\phi$ is the bank angle (the lift component $W\sin\phi \approx C_L\sin\phi\,qS$ balances any side force) and $C_{n,T}$ is a yawing moment from asymmetric thrust. These are the lateral counterpart of the trim equations [[flight-mechanics/longitudinal-static-stability#eq-trim]].

::: example Crosswind approach in a sideslip {#ex-crosswind}
The light aircraft approaches at $33\ \mathrm{m/s}$ with a $6\ \mathrm{m/s}$ crosswind from the right and uses a wing-low sideslip to keep its fuselage aligned with the runway. With the derivatives of [[#ex-fin]] and [[#ex-roll]], the vertical-tail derivatives of [[#eq-fin]] with $z_v = 0.90\ \mathrm{m}$, dihedral $\Gamma = 1.5^\circ$ (strip theory, $\lambda = 0.7$) and a low-wing contribution of $+0.010\ \mathrm{rad^{-1}}$, find the rudder and aileron deflections (neglect $C_{n\delta a}$).
::: solution
Sideslip: the relative wind comes from the right at $\beta = \sin^{-1}(6/33) = 10.48^\circ = 0.1829\ \mathrm{rad}$. Dihedral effect: $C_{l\beta,\Gamma} = -(4.8 \times 0.02618/6)(2.4/1.7) = -0.0296$; fin, $C_{Y\beta,v} = -0.95 \times (1.6/16.2) \times 3.0 \times 1.10 = -0.3096$ and $C_{l\beta,v} = -0.3096 \times 0.90/11.02 = -0.0253$; so $C_{l\beta} = -0.0296 - 0.0253 + 0.010 = -0.0448\ \mathrm{rad^{-1}}$. Rudder side force and roll: $C_{Y\delta r} = 0.95 \times 0.0988 \times 3.0 \times 0.5 = 0.1407$, $C_{l\delta r} = 0.1407 \times 0.90/11.02 = 0.01149$.

Yaw balance: $\delta_r = -C_{n\beta}\beta/C_{n\delta r} = -0.0692 \times 0.1829/(-0.0587) = 0.2155\ \mathrm{rad} = 12.3^\circ$ (trailing edge left, holding the nose left against the weathercock tendency). Roll balance:
$$
\delta_a = -\frac{C_{l\beta}\beta + C_{l\delta r}\delta_r}{C_{l\delta a}} = -\frac{-0.00820 + 0.00248}{0.234} = 0.0245\ \mathrm{rad} = 1.4^\circ ,
$$
right wing down, into the wind. Side force: $C_Y = -0.3096 \times 0.1829 + 0.1407 \times 0.2155 = -0.0263$; with $C_L = 2W/(\rho V^2S) = 0.998$, the bank needed to balance it is $\sin^{-1}(0.0263/0.998) = 1.5^\circ$ into the wind (more in practice, since the fuselage adds side force). Sanity check: the rudder is the limiting control — about half its travel for a $6\ \mathrm{m/s}$ crosswind — which is why light aircraft have a maximum demonstrated crosswind of the order of $7$–$8\ \mathrm{m/s}$ ($15\ \mathrm{kt}$).
:::
:::

**Engine failure.** When an engine of a multi-engine aircraft fails, the thrust of the live engine and the drag of the dead one (windmilling or feathered) produce a yawing moment $N_T = (T + D_{\text{dead}})\,y_e$, where $y_e$ is the lateral distance of the engines from the centre line. The rudder must balance it. Since the rudder moment is proportional to $q$ and $N_T$ is roughly constant (or rises as speed falls, for a propeller), there is a speed below which full rudder is not enough: the **minimum control speed** $V_{MC}$. For constant $N_T$ and maximum rudder $\delta_{r,\max}$,
$$
V_{MC} = \sqrt{\frac{2N_T}{\rho Sb\,\lvert C_{n\delta r}\rvert\,\delta_{r,\max}}} .
$$ {#eq-vmc}
Certification rules allow up to $5^\circ$ of bank towards the live engine in determining $V_{MC}$ (the bank tilts the lift to counter the rudder's side force, reducing the sideslip and the rudder needed), and require $V_{MC}$ to be below the take-off safety speed.

::: example Minimum control speed of a light twin {#ex-vmc}
A light twin ($m = 2000\ \mathrm{kg}$, $S = 16.5\ \mathrm{m^2}$, $b = 11.6\ \mathrm{m}$, $C_{n\delta r} = -0.075\ \mathrm{rad^{-1}}$, $\delta_{r,\max} = 25^\circ$) has its engines $1.8\ \mathrm{m}$ from the centre line. At take-off power each produces $2.5\ \mathrm{kN}$, and a windmilling propeller adds $0.3\ \mathrm{kN}$ of drag. Estimate $V_{MC}$ at sea level (wings level, zero sideslip) and compare with the stall speed for $C_{L,\max} = 1.7$.
::: solution
$N_T = (2500 + 300) \times 1.8 = 5040\ \mathrm{N\,m}$. With $\delta_{r,\max} = 0.4363\ \mathrm{rad}$:
$$
V_{MC} = \sqrt{\frac{2 \times 5040}{1.225 \times 16.5 \times 11.6 \times 0.075 \times 0.4363}} = \sqrt{1313.7} = 36.2\ \mathrm{m/s}.
$$
The stall speed is $\sqrt{2 \times 19\,613/(1.225 \times 16.5 \times 1.7)} = 33.8\ \mathrm{m/s}$, so $V_{MC}$ is $1.07V_s$. Sanity check: $V_{MC}$ close to the stall speed is typical of light twins and is the reason for the long-standing training emphasis on keeping above the "red-line" $V_{MC}$ speed after an engine failure; below it, the aircraft yaws and rolls towards the dead engine whatever the pilot does. Feathering the dead propeller removes most of $D_{\text{dead}}$ and lowers $V_{MC}$ by about $\sqrt{2500/2800}$, $5\,\%$.
:::
:::

::: widget plot
f: (180/pi)*NT/(0.5*1.225*x^2*16.5*11.6*0.075); 25
x: 25, 70
y: 0, 50
sliders: NT=5040:2000:8000:10
labels: \delta_r\ \text{required}\ (^\circ); \delta_{r,\max}
caption: Rudder angle needed to balance an engine failure on the light twin against airspeed (m/s), for asymmetric yawing moment $N_T$ (N·m) on the slider; the horizontal line is the rudder travel. Where the curve crosses it is $V_{MC}$ — $36\ \mathrm{m/s}$ for $5040\ \mathrm{N\,m}$. The required deflection rises as $1/V^2$: halving the speed quadruples it. Move the engines outboard (larger $N_T$) and $V_{MC}$ rises as $\sqrt{N_T}$.
:::

::: warning Signs in the lateral–directional derivatives
Conventions differ between books and companies, and a wrong sign reverses the meaning of a derivative. In this course: $\beta > 0$ when the wind comes from the right; $C_{n\beta} > 0$ is directionally stable; $C_{l\beta} < 0$ is a stable dihedral effect; $\delta_r > 0$ is trailing edge left, giving $C_{n\delta r} < 0$; $\delta_a > 0$ gives $C_{l\delta a} > 0$. A frequent error is to think that $C_{l\beta}$, like $C_{m\alpha}$, measures a restoring moment against *bank angle*: it does not — there is none — it measures the rolling moment due to the *sideslip* that the bank causes. Another is to take the vertical tail's moment arm from the wing's aerodynamic centre: for $C_{n\beta}$ the arm is from the centre of gravity, which moves with loading.
:::

::: quiz
Which change increases the stable dihedral effect (makes $C_{l\beta}$ more negative) of a conventional aircraft?
- [ ] Moving the wing from a high-wing to a low-wing position
- [x] Increasing wing sweepback at a given lift coefficient
- [ ] Reducing the geometric dihedral angle
- [ ] Mounting the fin below the fuselage (a ventral fin) instead of above it
::: solution
Sweepback gives a dihedral effect proportional to $C_L\tan\Lambda$. A low wing is destabilising, less dihedral reduces the effect, and a fin below the roll axis produces a rolling moment of the opposite sign to a fin above it.
:::
:::

::: history
Cayley's 1810 instalment of "On Aerial Navigation" argued that wings set at an upward angle give stability in roll — the first statement of the dihedral effect — and his and later model gliders used it. The Wright brothers, unlike most of their contemporaries, did not seek inherent lateral stability; they controlled roll by **wing warping** from their 1899 kite onwards. On their 1902 glider they found that warping produced adverse yaw that could drag the aircraft into a slipping spiral, and cured it by making the fixed vertical tail movable and linking it to the warping — combined roll and yaw control, the basis of every later aircraft. Ailerons as separate hinged surfaces came into general use soon after, and the strip-theory estimates of roll damping and aileron power used in this lesson appear in the stability literature from Bryan's *Stability in Aviation* (1911) onwards.
:::

::: summary
- Sideslip $\beta \approx v/V$; coefficients $C_Y$, $C_l$, $C_n$ referred to $qS$ and $qSb$.
- Directional stability $C_{n\beta} > 0$; the fuselage is destabilising and the fin provides $\eta_vV_va_v(1 + \mathrm{d}\sigma/\mathrm{d}\beta)$ with $V_v = l_vS_v/(Sb)$.
- Dihedral effect $C_{l\beta} < 0$ from geometric dihedral ($-a\Gamma(1 + 2\lambda)/[6(1 + \lambda)]$ by strip theory), sweep, high wing and fin; low wings are destabilising.
- Roll damping $C_{lp} = -(a/12)(1 + 3\lambda)/(1 + \lambda)$; steady helix angle $pb/2V = -C_{l\delta a}\delta_a/C_{lp}$.
- Ailerons cause adverse yaw; coordinated turns need rudder.
- Steady asymmetric flight balances side force, roll and yaw together: crosswind sideslips and engine-out trim; $V_{MC} \propto \sqrt{N_T/(\lvert C_{n\delta r}\rvert\delta_{r,\max})}$.
:::

## Exercises

::: exercise Vertical tail volume {level=1 check="0.0412"}
Find the vertical tail volume coefficient of the light aircraft ($S_v = 1.6\ \mathrm{m^2}$, $l_v = 4.6\ \mathrm{m}$, $S = 16.2\ \mathrm{m^2}$, $b = 11.02\ \mathrm{m}$). (Enter $V_v$ rounded to three significant figures.)
::: solution
$V_v = 4.6 \times 1.6/(16.2 \times 11.02) = 7.36/178.5 = 0.0412$. Typical values are $0.02$–$0.05$ for light aircraft and $0.06$–$0.09$ for transports, whose engines are farther outboard.
:::
:::

::: exercise Rectangular-wing dihedral effect {level=1 check="-0.0436"}
A rectangular wing ($\lambda = 1$) with $a = 5.0\ \mathrm{rad^{-1}}$ has $2^\circ$ of dihedral. Find $C_{l\beta}$ due to dihedral by strip theory. (Enter it in $\mathrm{rad^{-1}}$, rounded to three significant figures.)
::: solution
$C_{l\beta} = -a\Gamma/4 = -5.0 \times 0.034907/4 = -0.0436\ \mathrm{rad^{-1}}$.
:::
:::

::: exercise Roll damping {level=1 check="-0.694"}
Find $C_{lp}$ by strip theory for a wing with $a = 5.0\ \mathrm{rad^{-1}}$ and taper ratio $\lambda = 0.5$. (Enter it rounded to three significant figures.)
::: solution
$1 + 3\lambda = 2.5$ and $1 + \lambda = 1.5$, so $C_{lp} = -(5.0/12) \times 2.5/1.5 = -0.41667 \times 1.6667 = -0.694$. A rectangular wing of the same slope would have $-5.0/6 = -0.833$: taper moves area inboard, where the roll-induced angle of attack is smaller.
:::
:::

::: exercise Fin area for a stability target {level=2 check="1.98"}
For the light aircraft of [[#ex-fin]], what fin area gives $C_{n\beta} = 0.10\ \mathrm{rad^{-1}}$, other quantities unchanged? (Enter $S_v$ in $\mathrm{m^2}$, rounded to two decimal places.)
::: solution
Need $C_{n\beta,v} = 0.10 + 0.060 = 0.160$. Since $C_{n\beta,v} \propto S_v$: $S_v = 1.6 \times 0.160/0.1292 = 1.98\ \mathrm{m^2}$, $24\,\%$ larger, also raising the rudder power in proportion if the rudder is scaled with the fin.
:::
:::

::: exercise Roll rate at higher speed {level=2 check="61.1"}
Using the helix angle $pb/2V = 0.0840$ of [[#ex-roll]] at full aileron, find the roll rate at $70\ \mathrm{m/s}$. (Enter $p$ in degrees per second, rounded to one decimal place.)
::: solution
$p = 0.0840 \times 2 \times 70/11.02 = 1.0671\ \mathrm{rad/s} = 61.1^\circ/\mathrm{s}$ — if the pilot can still apply full aileron against the stick forces, which grow with $q$.
:::
:::

::: exercise Minimum control speed with a feathered propeller {level=2 check="34.2"}
Repeat [[#ex-vmc]] with the dead propeller feathered, so that its drag is negligible. (Enter $V_{MC}$ in m/s, rounded to one decimal place.)
::: solution
$N_T = 2500 \times 1.8 = 4500\ \mathrm{N\,m}$; $V_{MC} = 36.25\sqrt{4500/5040} = 34.25\ \mathrm{m/s}$, i.e. $34.2\ \mathrm{m/s}$ — now barely above the $33.8\ \mathrm{m/s}$ stall speed.
:::
:::

::: exercise Strip-theory dihedral derivation for an elliptic wing {level=3}
Repeat the derivation of [[#prop-dihedral]] for a wing of elliptic planform, $c(y) = c_0\sqrt{1 - (2y/b)^2}$: find the constant $k$ in $C_{l\beta,\Gamma} = -k\,a\Gamma$ and compare it with the rectangular ($k = 0.25$) and $\lambda = 0.5$ tapered values.
::: solution
$\int_0^{b/2}c\,y\,\mathrm{d}y = c_0\int_0^{b/2}y\sqrt{1 - 4y^2/b^2}\,\mathrm{d}y$. Put $u = 1 - 4y^2/b^2$, $\mathrm{d}u = -8y\,\mathrm{d}y/b^2$: the integral is $c_0(b^2/8)\int_0^1\sqrt u\,\mathrm{d}u = c_0b^2/12$. The area is $S = \pi c_0b/4$. Then $C_{l\beta} = -2a\Gamma\,(c_0b^2/12)/(\pi c_0b^2/4) = -\dfrac{2a\Gamma}{3\pi}$, so $k = 2/(3\pi) = 0.212$. Rectangular: $0.25$; taper $0.5$: $(1 + 1)/(6 \times 1.5) = 0.222$. The more the chord is concentrated inboard, the smaller the arm of the extra lift and the weaker the dihedral effect per degree — one reason tapered wings need a little more dihedral.
:::
:::

::: exercise Choosing the fin for a twin {level=3}
A designer must size the fin and rudder of the light twin of [[#ex-vmc]] so that $V_{MC} \le 1.05$ times the stall speed with the critical propeller windmilling, while keeping $C_{n\beta}$ between $0.06$ and $0.15\ \mathrm{rad^{-1}}$. The present design has $C_{n\delta r} = -0.075\ \mathrm{rad^{-1}}$. Find the rudder power needed, and discuss how you would obtain it and what else changes.
::: solution
$1.05V_s = 1.05 \times 33.79 = 35.48\ \mathrm{m/s}$. From [[#eq-vmc]], $\lvert C_{n\delta r}\rvert \propto 1/V_{MC}^2$: $0.075 \times (36.25/35.48)^2 = 0.0783\ \mathrm{rad^{-1}}$, a $4.4\,\%$ increase. Options: more rudder chord or span (raising $\tau_r$ or the rudder's share of $S_v$), a larger fin (raises $C_{n\beta}$ as well — check the upper limit and the spiral mode), a longer tail arm (heavier fuselage), more rudder travel (limited by flow separation on the rudder at large deflections), or reducing $N_T$: engines closer to the centre line (propeller clearance), counter-rotating propellers (removing the "critical engine" asymmetry of P-factor), autofeather. A good answer also checks the rudder pedal force at $V_{MC}$ (rules set a maximum), the larger fin's effect on Dutch-roll damping and on crosswind handling, and notes that the real $V_{MC}$ is determined in flight test at up to $5^\circ$ bank and with the most unfavourable centre of gravity (aft, shortest rudder arm).
:::
:::
