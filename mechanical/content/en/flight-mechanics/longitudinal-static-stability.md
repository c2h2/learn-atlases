The performance lessons treated the aircraft as a particle: lift, drag, thrust and weight act at one point, and the pitching moments were assumed to be balanced somehow. This lesson asks how. An aircraft in steady flight must be **trimmed** — the total pitching moment about its centre of gravity must be zero — and it should be **statically stable**: if a gust raises the nose, the aerodynamic moment that results should push the nose back down. Both properties depend on where the centre of gravity is, and on the horizontal tail, whose job is precisely to provide them. The analysis leads to the single most important number in an aircraft's loading manual: the allowable range of centre-of-gravity positions.

The aerodynamic ingredients — the aerodynamic centre, the moment coefficient $C_{m,ac}$ and the lift-curve slope — come from [[aerodynamics/aerodynamic-forces]] and [[aerodynamics/thin-airfoil-theory]]; downwash from [[aerodynamics/finite-wings]]. Dynamic stability, which asks how the aircraft returns (or not) over time, is the subject of [[flight-mechanics/dynamic-modes]].

## Static stability {#sec-static}

::: definition Static stability and trim {#def-static-stability}
An aircraft is **trimmed** at an angle of attack $\alpha_{\text{trim}}$ if the pitching-moment coefficient about the centre of gravity is zero there, $C_m(\alpha_{\text{trim}}) = 0$. It is **statically stable in pitch** (has positive **pitch stiffness**) if a small increase in angle of attack from trim produces a nose-down moment:
$$
C_{m\alpha} = \frac{\partial C_m}{\partial\alpha} < 0 .
$$
Positive $C_m$ is nose-up; $\alpha$ is measured from the zero-lift line of the aircraft, so that $C_L = a\alpha$ (with $a$ the lift-curve slope of the whole aircraft). Stability alone does not guarantee trim at a useful lift coefficient: for that the moment at zero lift must be positive, $C_{m0} > 0$, so that the line $C_m(\alpha)$ crosses zero at a positive $\alpha$.
:::

"Static" means that only the *initial tendency* is examined: whether the restoring moment has the right sign, not whether the motion that follows dies out. A statically unstable aircraft is always dynamically unstable; a statically stable one is usually, but not always, dynamically stable.

A plain wing on its own is a poor flying machine. Its lift acts at the aerodynamic centre with a constant moment $C_{m,ac}$, which is negative (nose-down) for a positively cambered section. If the centre of gravity is ahead of the aerodynamic centre the wing is stable but cannot trim at positive lift ($C_{m0} = C_{m,ac} < 0$); if it is behind, the wing is unstable. Flying wings solve this with reflexed or swept and twisted sections that make $C_{m,ac}$ positive; conventional aircraft add a horizontal tail.

## The moment equation {#sec-moment}

**Free-body diagram in pitch.** Measure distances along the mean aerodynamic chord $\bar c$ of the wing from its leading edge, as fractions of $\bar c$. The forces and moments that act on the aircraft in the plane of symmetry are:

- the lift of the **wing–body** combination $L_{wb}$, acting at its aerodynamic centre at $h_{ac}\bar c$, together with its constant moment $M_{ac} = qS\bar c\,C_{m,ac}$ (the body moves the aerodynamic centre forward of the wing's own, typically by $0.03$–$0.10\,\bar c$);
- the lift of the **horizontal tail** $L_t$, at the tail's aerodynamic centre, a distance $l_t$ behind the wing–body aerodynamic centre;
- the **weight**, at the centre of gravity at $h\bar c$;
- thrust and drag, whose moments are neglected here (their lines of action pass close to the centre of gravity on most aircraft; the effect of a high or low thrust line is a correction to $C_{m0}$ and, for propellers, to $C_{m\alpha}$).

The tail sits in the downwash of the wing, which reduces its angle of attack by the **downwash angle** $\varepsilon$, and in a slower, disturbed flow, expressed by the **tail efficiency** $\eta = q_t/q$ (typically $0.85$–$1.0$). If the tail is set at incidence $i_t$ relative to the wing–body zero-lift line and has an elevator deflected by $\delta_e$ (trailing edge down positive),
$$
\alpha_t = \alpha - \varepsilon + i_t,\qquad \varepsilon = \varepsilon_\alpha\,\alpha,\qquad C_{L,t} = a_t\alpha_t + a_e\delta_e ,
$$ {#eq-tail-alpha}
where $a_t$ is the tail lift-curve slope, $a_e = \tau a_t$ the elevator effectiveness ($\tau \approx 0.3$–$0.6$ for typical elevator-to-tail chord ratios) and $\varepsilon_\alpha = \mathrm{d}\varepsilon/\mathrm{d}\alpha$ the downwash gradient. Lifting-line theory gives, far downstream of an elliptically loaded wing, $\varepsilon = 2C_L/(\pi AR)$, so a first estimate is $\varepsilon_\alpha \approx 2a_{wb}/(\pi AR)$; at a real tail position it is somewhat smaller.

::: definition Tail volume coefficient {#def-tail-volume}
The **horizontal tail volume coefficient** is
$$
\bar V_H = \frac{l_tS_t}{S\bar c},
$$
the ratio of the "volume" $l_tS_t$ swept by the tail area about the wing–body aerodynamic centre to the reference volume $S\bar c$. Typical values are $0.5$–$0.8$ for light aircraft and $0.8$–$1.2$ for jet transports.
:::

::: proposition Pitching moment about the centre of gravity {#prop-cm}
With the assumptions above, the pitching-moment coefficient about the centre of gravity is
$$
C_m = C_{m,ac} + C_L\,(h - h_{ac}) - \eta\bar V_H\,C_{L,t},
$$ {#eq-cm}
where $C_L = C_{L,wb} + \eta(S_t/S)C_{L,t}$ is the lift coefficient of the whole aircraft. Its slope is
$$
C_{m\alpha} = a\,(h - h_{ac}) - \eta\bar V_H\,a_t(1 - \varepsilon_\alpha),\qquad
a = a_{wb} + \eta\frac{S_t}{S}a_t(1 - \varepsilon_\alpha).
$$ {#eq-cm-alpha}
:::

::: proof
Take moments about the centre of gravity, nose-up positive. The wing–body lift acts a distance $(h - h_{ac})\bar c$ *ahead* of the centre of gravity (if $h > h_{ac}$), giving a nose-up moment $L_{wb}(h - h_{ac})\bar c$. The tail lift acts a distance $l_t + (h_{ac} - h)\bar c$ behind the centre of gravity, giving a nose-down moment $L_t[l_t + (h_{ac} - h)\bar c]$. With $M_{ac}$:
$$
M = M_{ac} + L_{wb}(h - h_{ac})\bar c - L_tl_t + L_t(h - h_{ac})\bar c .
$$
The two terms in $(h - h_{ac})$ combine into $(L_{wb} + L_t)(h - h_{ac})\bar c = L(h - h_{ac})\bar c$. Dividing by $qS\bar c$ and writing $L_t = \eta qS_tC_{L,t}$ gives [[#eq-cm]]. Differentiating with respect to $\alpha$, using $\mathrm{d}C_{L,t}/\mathrm{d}\alpha = a_t(1 - \varepsilon_\alpha)$ from [[#eq-tail-alpha]] at fixed $\delta_e$ and $\mathrm{d}C_L/\mathrm{d}\alpha = a$, gives [[#eq-cm-alpha]]. Assumptions: small angles (lift and drag directions are not distinguished from the normal and axial directions), linear aerodynamics, thrust and drag moments and the vertical offsets of the surfaces neglected.
:::

## The neutral point and static margin {#sec-neutral-point}

[[#eq-cm-alpha]] is linear in the centre-of-gravity position $h$: moving the centre of gravity forward makes $C_{m\alpha}$ more negative. There is one position at which $C_{m\alpha} = 0$.

::: proposition Stick-fixed neutral point {#prop-neutral-point}
The pitch stiffness vanishes when the centre of gravity is at the **stick-fixed neutral point**
$$
h_n = h_{ac} + \eta\bar V_H\,\frac{a_t}{a}\,(1 - \varepsilon_\alpha),
$$ {#eq-neutral-point}
and for any other position
$$
C_{m\alpha} = -a\,(h_n - h) = -a\,K_n,\qquad K_n = h_n - h,
$$ {#eq-static-margin}
where $K_n$ is the **static margin**. The aircraft is statically stable if and only if the centre of gravity is ahead of the neutral point ($K_n > 0$). The neutral point is the aerodynamic centre of the whole aircraft.
:::

::: proof
Set [[#eq-cm-alpha]] to zero and solve for $h$: $a(h_n - h_{ac}) = \eta\bar V_Ha_t(1 - \varepsilon_\alpha)$, which is [[#eq-neutral-point]]. Substituting $\eta\bar V_Ha_t(1 - \varepsilon_\alpha) = a(h_n - h_{ac})$ back into [[#eq-cm-alpha]] gives $C_{m\alpha} = a(h - h_{ac}) - a(h_n - h_{ac}) = a(h - h_n)$. Since $a > 0$, $C_{m\alpha} < 0 \iff h < h_n$. Finally, about the point $h_n$ the moment does not change with $\alpha$ — the definition of an aerodynamic centre.
:::

The static margin is the distance, in mean chords, between the centre of gravity and the neutral point. Light aircraft fly with $K_n$ of about $0.05$–$0.25$ depending on loading; transports with $0.05$–$0.15$; some fly-by-wire combat aircraft, beginning with the F-16, are designed with very small or negative margins at subsonic speeds ("relaxed static stability"), the stability being supplied by the control system ([[flight-mechanics/flight-control]]).

::: example Neutral point of the light aircraft {#ex-neutral-point}
The light aircraft has $S = 16.2\ \mathrm{m^2}$, $AR = 7.5$, $\bar c = 1.47\ \mathrm{m}$, wing–body lift slope $a_{wb} = 4.8\ \mathrm{rad^{-1}}$ and aerodynamic centre $h_{ac} = 0.20$. Its tail has $S_t = 3.0\ \mathrm{m^2}$, $l_t = 4.5\ \mathrm{m}$, $a_t = 4.0\ \mathrm{rad^{-1}}$ and $\eta = 0.90$. Estimating $\varepsilon_\alpha$ from lifting-line theory, find the neutral point and the static margin with the centre of gravity at $h = 0.30$.
::: solution
$\bar V_H = 4.5 \times 3.0/(16.2 \times 1.47) = 0.5669$. $\varepsilon_\alpha = 2 \times 4.8/(\pi \times 7.5) = 0.4074$, so $1 - \varepsilon_\alpha = 0.5926$. Aircraft lift slope:
$$
a = 4.8 + 0.90 \times \frac{3.0}{16.2} \times 4.0 \times 0.5926 = 4.8 + 0.3950 = 5.195\ \mathrm{rad^{-1}}.
$$
Neutral point:
$$
h_n = 0.20 + 0.90 \times 0.5669 \times \frac{4.0}{5.195} \times 0.5926 = 0.20 + 0.2328 = 0.4328 .
$$
At $h = 0.30$: $K_n = 0.1328$ and $C_{m\alpha} = -5.195 \times 0.1328 = -0.690\ \mathrm{rad^{-1}}$. Sanity check: the tail moves the aerodynamic centre back by $0.23\bar c = 0.34\ \mathrm{m}$, and a static margin of $13\,\%$ is typical of a light aircraft at mid loading. Downwash matters: with $\varepsilon_\alpha = 0$ the tail term would be $0.39$ instead of $0.23$.
:::
:::

::: widget plot
f: -0.05 - 0.023271*(h - 0.2) + 0.071237 + 5.19504*(h - 0.43278)*x*pi/180 + (0.3*(h - 0.2) - 0.918367)*d*pi/180
x: -4, 16
y: -0.4, 0.4
sliders: h=0.30:0.10:0.55:0.01; d=0:-20:10:0.5
hlines: 0
labels: C_m
caption: Pitching-moment coefficient of the light aircraft against angle of attack $\alpha$ (degrees, from the zero-lift line) for centre of gravity $h$ (fraction of $\bar c$) and elevator angle $\delta_e$ (`d`, degrees, trailing edge down positive). Trim is where the line crosses zero. Move $h$ aft and the line flattens; at $h = 0.433$ it is horizontal (neutral point) and beyond it the slope reverses. Move the elevator trailing edge up (negative `d`) and the line shifts up, moving the trim point to a higher $\alpha$ — lower speed.
:::

::: warning Moving the centre of gravity
It is easy to get the direction wrong: moving the centre of gravity **aft** reduces the static margin and makes the aircraft *less* stable and lighter on the controls; moving it **forward** increases stability but needs more elevator to trim and to rotate on take-off. Loading an aircraft beyond the aft limit — baggage at the back, passengers moved aft, fuel burned from forward tanks — has caused fatal accidents, because the aircraft can become unstable and the pilot's corrections then grow instead of dying out. Note also that the neutral point is a property of the aircraft, but the static margin depends on the loading, and that $h$ is measured from the leading edge of the *mean aerodynamic chord*, not from the nose.
:::

## Trim and the elevator {#sec-trim}

The elevator changes the tail lift and so both $C_L$ and $C_m$. From [[#eq-cm]] and [[#eq-tail-alpha]], the derivatives with respect to $\delta_e$ are
$$
C_{L\delta} = \eta\frac{S_t}{S}a_e,\qquad C_{m\delta} = C_{L\delta}(h - h_{ac}) - \eta\bar V_H\,a_e ,
$$ {#eq-elevator-derivs}
so the linear model of the aircraft is
$$
C_L = C_{L0} + a\alpha + C_{L\delta}\delta_e,\qquad C_m = C_{m0} + C_{m\alpha}\alpha + C_{m\delta}\delta_e .
$$ {#eq-linear-model}
The elevator is a powerful moment generator ($C_{m\delta}$ is large and negative: trailing edge up gives nose-up moment) but a weak lift generator ($C_{L\delta}$ is small, and acts against the wanted lift when the elevator is raised).

::: proposition Trim elevator angle {#prop-trim}
The trimmed elevator angle and angle of attack for a required lift coefficient $C_L$ are
$$
\delta_{\text{trim}} = -\frac{C_{m0}\,a + C_{m\alpha}(C_L - C_{L0})}{\Delta},\qquad
\alpha_{\text{trim}} = \frac{(C_L - C_{L0})C_{m\delta} + C_{m0}C_{L\delta}}{\Delta},\qquad
\Delta = aC_{m\delta} - C_{m\alpha}C_{L\delta}.
$$ {#eq-trim}
The elevator angle per unit lift coefficient is
$$
\frac{\mathrm{d}\delta_{\text{trim}}}{\mathrm{d}C_L} = -\frac{C_{m\alpha}}{\Delta} = \frac{a\,K_n}{\Delta},
$$ {#eq-elevator-gradient}
and $\Delta = a\left[C_{L\delta}(h_n - h_{ac}) - \eta\bar V_Ha_e\right]$ does not depend on the centre-of-gravity position, so the gradient is proportional to the static margin.
:::

::: proof
Setting $C_m = 0$ and $C_L$ to its required value in [[#eq-linear-model]] gives two linear equations in $\alpha$ and $\delta_e$; Cramer's rule gives [[#eq-trim]]. Differentiating $\delta_{\text{trim}}$ with respect to $C_L$ gives $-C_{m\alpha}/\Delta$, and $C_{m\alpha} = -aK_n$. For $\Delta$, substitute $C_{m\delta}$ from [[#eq-elevator-derivs]] and $C_{m\alpha} = a(h - h_n)$: $\Delta = aC_{L\delta}(h - h_{ac}) - a\eta\bar V_Ha_e - a(h - h_n)C_{L\delta} = a[C_{L\delta}(h_n - h_{ac}) - \eta\bar V_Ha_e]$, in which $h$ has cancelled.
:::

Because $\Delta < 0$, a stable aircraft ($K_n > 0$) needs more trailing-edge-up elevator ($\delta$ more negative) to trim at a higher lift coefficient — that is, at a lower speed. This is the property pilots call **speed stability**: to fly slower you must pull. As the centre of gravity moves aft the gradient flattens, and at the neutral point the elevator angle no longer depends on speed. This gives the classic **flight-test method** for the neutral point: measure $\mathrm{d}\delta/\mathrm{d}C_L$ at two or more centre-of-gravity positions and extrapolate linearly to zero.

::: example Trim of the light aircraft {#ex-trim}
For the light aircraft of [[#ex-neutral-point]], take $C_{m,ac} = -0.05$, tail incidence $i_t = -2^\circ$ and elevator effectiveness $\tau = 0.45$. With the centre of gravity at $h = 0.30$, find the trim elevator angle and angle of attack in cruise ($C_L = 0.40$) and on approach ($C_L = 1.2$, flaps neglected).
::: solution
$a_e = 0.45 \times 4.0 = 1.80\ \mathrm{rad^{-1}}$; $C_{L\delta} = 0.90 \times 0.1852 \times 1.80 = 0.300\ \mathrm{rad^{-1}}$; $C_{m\delta} = 0.300 \times 0.10 - 0.90 \times 0.5669 \times 1.80 = 0.030 - 0.9184 = -0.8884\ \mathrm{rad^{-1}}$.

At $\alpha = \delta_e = 0$ the tail lift coefficient is $a_ti_t = 4.0 \times (-0.03491) = -0.1396$, so $C_{L0} = 0.90 \times 0.1852 \times (-0.1396) = -0.02327$ and, from [[#eq-cm]], $C_{m0} = -0.05 + (-0.02327)(0.10) - 0.90 \times 0.5669 \times (-0.1396) = -0.05 - 0.00233 + 0.07124 = 0.01891$.

$\Delta = 5.195 \times (-0.8884) - (-0.6898)(0.300) = -4.615 + 0.207 = -4.408$.

Cruise, $C_L - C_{L0} = 0.4233$:
$$
\delta_{\text{trim}} = -\frac{0.01891 \times 5.195 + (-0.6898)(0.4233)}{-4.408} = -\frac{0.09824 - 0.2920}{-4.408} = -0.04395\ \mathrm{rad} = -2.52^\circ,
$$
$$
\alpha_{\text{trim}} = \frac{0.4233 \times (-0.8884) + 0.01891 \times 0.300}{-4.408} = 0.08401\ \mathrm{rad} = 4.81^\circ .
$$
Approach, $C_L - C_{L0} = 1.2233$: $\delta_{\text{trim}} = -9.69^\circ$, $\alpha_{\text{trim}} = 14.05^\circ$. Sanity check: the gradient is $(-9.69 + 2.52)/0.8 = -8.97^\circ$ per unit $C_L$, equal to $aK_n/\Delta = 5.195 \times 0.1328/(-4.408)$ rad $= -8.97^\circ$; both elevator angles are well inside a typical travel of $-25^\circ$ to $+15^\circ$.
:::
:::

**Centre-of-gravity limits.** The **aft limit** is set by stability: a minimum static margin (stick-fixed and, more critically, stick-free — below) must remain, typically $5\,\%$. The **forward limit** is set by control power: with the centre of gravity far forward the elevator must be able to trim the aircraft at $C_{L,\max}$ in the landing configuration, including the nose-down moment of the flaps and the reduced downwash in ground effect, and to rotate the aircraft on take-off. The allowable range is typically $15$–$30\,\%$ of $\bar c$ for light aircraft.

::: example Locating the neutral point in flight test {#ex-flight-test}
In flight tests of the light aircraft the trim elevator angle was measured against $C_L$ at two loadings. With the centre of gravity at $h = 0.20$ the slope was $-15.72^\circ$ per unit $C_L$; at $h = 0.30$, $-8.97^\circ$. Estimate the neutral point.
::: solution
By [[#eq-elevator-gradient]], the slope is linear in $h$ and zero at $h_n$. It changes by $6.75^\circ$ per $0.10$ of chord, so it reaches zero $8.97/67.5 = 0.1329$ beyond $h = 0.30$: $h_n = 0.433$. Sanity check: this agrees with the estimate of [[#ex-neutral-point]] — of course, since the "measurements" were computed from the same model; in a real test the measured neutral point is the trustworthy one, because downwash and fuselage effects are hard to predict. Testing is done at safe forward positions and *extrapolated*: nobody flies at the neutral point to find it.
:::
:::

::: widget plot
f: (180/pi)*1.17851*(-0.05 - 0.023271*(h - 0.2) + 0.071237 + (h - 0.43278)*(x + 0.023271))
x: 0, 1.4
y: -25, 10
sliders: h=0.30:0.10:0.50:0.01
hlines: 0
labels: \delta_{\text{trim}}\ (^\circ)
caption: Trim elevator angle (degrees, trailing edge down positive) against lift coefficient for the light aircraft, with the centre of gravity $h$ on the slider. A stable aircraft has a falling line: more up-elevator to fly slower. At $h = 0.433$ the line is flat; beyond it the slope reverses and the aircraft needs *down* elevator to fly slower — unstable, and very hard to fly by hand. Move $h$ forward to $0.10$: the elevator needed at high $C_L$ approaches the travel limit, which sets the forward centre-of-gravity limit.
:::

## Stick-free stability and control forces {#sec-stick-free}

So far the elevator was held fixed ("stick-fixed"). In an aircraft with reversible (unpowered) controls, the pilot can let go of the stick, and the elevator then **floats** to the angle at which its aerodynamic hinge moment is zero. The hinge-moment coefficient of the elevator is modelled as
$$
C_h = \frac{H}{q_tS_ec_e} = C_{h0} + b_1\alpha_t + b_2\delta_e ,
$$ {#eq-hinge}
with $S_e$, $c_e$ the elevator area and chord; $b_1 = \partial C_h/\partial\alpha_t$ and $b_2 = \partial C_h/\partial\delta_e$ are both normally negative (the airload pushes a deflected elevator back towards neutral, and an increase of tail angle of attack pushes the elevator trailing edge up).

::: proposition Stick-free neutral point {#prop-stick-free}
If the elevator floats freely ($C_h = 0$), the effective tail lift-curve slope is reduced to $a_t(1 - \tau b_1/b_2)$, and the stick-free neutral point is, to a good approximation,
$$
h_n' = h_{ac} + \eta\bar V_H\,\frac{a_t}{a}\,(1 - \varepsilon_\alpha)\left(1 - \frac{\tau b_1}{b_2}\right).
$$ {#eq-stick-free}
With $b_1$ and $b_2$ of the same sign, $h_n' < h_n$: freeing the elevator moves the neutral point forward and reduces the static margin.
:::

::: proof
With $C_h = 0$ in [[#eq-hinge]], $\delta_{\text{free}} = -(C_{h0} + b_1\alpha_t)/b_2$. The tail lift becomes $C_{L,t} = a_t\alpha_t + a_e\delta_{\text{free}} = a_t\alpha_t(1 - \tau b_1/b_2) - a_eC_{h0}/b_2$, so its slope with respect to $\alpha_t$ is $a_t(1 - \tau b_1/b_2)$. Repeating the derivation of [[#prop-neutral-point]] with this slope replaces $a_t$ in the tail term by $a_t(1 - \tau b_1/b_2)$. The approximation: the aircraft lift slope $a$ also contains the tail slope, but the tail's share of $a$ is small (8 % for the light aircraft), so $a$ is kept at its stick-fixed value.
:::

::: example Stick-free margin of the light aircraft {#ex-stick-free}
The elevator of the light aircraft has hinge-moment derivatives $b_1 = -0.20\ \mathrm{rad^{-1}}$ and $b_2 = -0.40\ \mathrm{rad^{-1}}$, and $\tau = 0.45$. Find the stick-free neutral point and the stick-free static margin at $h = 0.30$, and the angle through which the free elevator floats when the tail angle of attack increases by $2^\circ$.
::: solution
The free-elevator factor is $1 - \tau b_1/b_2 = 1 - 0.45 \times (-0.20)/(-0.40) = 1 - 0.225 = 0.775$. From [[#ex-neutral-point]] the tail term of the stick-fixed neutral point is $0.2328$, so
$$
h_n' = 0.20 + 0.2328 \times 0.775 = 0.3804 ,
$$
and the stick-free margin at $h = 0.30$ is $0.080$, against $0.133$ stick-fixed. A $2^\circ$ increase of $\alpha_t$ makes the elevator float by $\Delta\delta = -(b_1/b_2)\Delta\alpha_t = -0.5 \times 2^\circ = -1^\circ$ (trailing edge up), which cancels $0.45 \times 1^\circ = 0.45^\circ$ of the $2^\circ$ change in tail angle of attack — the $22.5\,\%$ loss of tail effectiveness. Sanity check: $h_n' < h_n$ as the proposition requires, and an $8\,\%$ stick-free margin is an acceptable value for a light aircraft at mid loading.
:::
:::

Designers control $b_1$ and $b_2$ with aerodynamic balances (horn balances, set-back hinges), which reduce the hinge moments and stick forces but, as [[#eq-stick-free]] shows, also affect the stick-free stability.

The **stick force** the pilot feels is proportional to the hinge moment: $F_s = G\,H = G\,\eta qS_ec_eC_h$, where the gearing $G$ (rad/m) relates elevator angle to stick travel. Eliminating $\alpha$ and $\delta_e$ with the trim conditions leads to a stick force of the form $F_s = A_1q + A_2(W/S)$, where $A_2$ is proportional to the stick-free static margin $h_n' - h$ and $A_1$ contains the trim-tab setting. The tab is adjusted to make $F_s = 0$ at the chosen trim speed $V_{\text{trim}}$, and then the **stick-force gradient** at that speed is
$$
\left.\frac{\mathrm{d}F_s}{\mathrm{d}V}\right|_{\text{trim}} = -\frac{2A_2\,(W/S)}{V_{\text{trim}}},
$$ {#eq-stick-force-gradient}
proportional to the stick-free static margin and to the wing loading, inversely to the trim speed, and independent of the tab setting. Airworthiness rules require a stable gradient (a pull force to fly slower, a push to fly faster), which is why the stick-free margin, not the stick-fixed one, usually sets the aft centre-of-gravity limit of aircraft with manual controls.

::: quiz
An aircraft is trimmed hands-off at $60\ \mathrm{m/s}$. Its centre of gravity is then moved aft (but stays ahead of both neutral points) and it is retrimmed at the same speed. What changes?
- [ ] The elevator angle per unit $C_L$ becomes steeper and the stick-force gradient increases.
- [x] Less elevator change and less stick force are needed for a given speed change: the aircraft feels lighter and is less stable.
- [ ] Nothing changes, because the neutral point is fixed.
- [ ] The aircraft becomes unstable.
::: solution
Both the elevator-angle gradient [[#eq-elevator-gradient]] and the stick-force gradient [[#eq-stick-force-gradient]] are proportional to the (stick-fixed or stick-free) static margin, which falls as the centre of gravity moves aft. The neutral points are fixed, but the margin is the distance to them.
:::
:::

::: history
Sir George Cayley's model glider of 1804 already had a tail mounted behind the wing for stability, and Alphonse Pénaud's rubber-powered *planophore* of 1871 flew stably because its tail was set at a smaller incidence than the wing — the "longitudinal dihedral" that provides $C_{m0} > 0$. The Wright Flyer of 1903, by contrast, had a forward elevator and was deliberately unstable in pitch; the brothers were skilled enough to fly it, but its successors adopted aft tails. The mathematical theory began with G. H. Bryan and W. E. Williams, "The longitudinal stability of aerial gliders" (*Proceedings of the Royal Society*, 1904), and Bryan's book *Stability in Aviation* (1911). The neutral point, static margin and stick-free analysis took their textbook form in the 1930s and 1940s; C. D. Perkins and R. E. Hage's *Airplane Performance, Stability and Control* (Wiley, 1949) set the pattern followed by most later texts.
:::

::: summary
- Static stability in pitch: $C_{m\alpha} < 0$; useful trim needs also $C_{m0} > 0$, normally provided by a tail set at negative incidence relative to the wing.
- About the centre of gravity: $C_m = C_{m,ac} + C_L(h - h_{ac}) - \eta\bar V_HC_{L,t}$, with tail volume $\bar V_H = l_tS_t/(S\bar c)$ and downwash $\varepsilon = \varepsilon_\alpha\alpha$.
- Stick-fixed neutral point $h_n = h_{ac} + \eta\bar V_H(a_t/a)(1 - \varepsilon_\alpha)$; static margin $K_n = h_n - h$; $C_{m\alpha} = -aK_n$.
- Trim from two linear equations in $\alpha$ and $\delta_e$; the elevator gradient $\mathrm{d}\delta/\mathrm{d}C_L = aK_n/\Delta$ is proportional to static margin — the basis of the flight-test method.
- Aft centre-of-gravity limit from stability (minimum margin), forward limit from elevator power at high $C_L$ and in ground effect.
- A floating elevator multiplies the tail's effectiveness by $1 - \tau b_1/b_2$; the stick-free neutral point lies ahead of the stick-fixed one, and the stick-force gradient is proportional to the stick-free margin.
:::

## Exercises

::: exercise Tail volume coefficient {level=1 check="0.95"}
A jet transport has $S = 122.6\ \mathrm{m^2}$, $\bar c = 4.19\ \mathrm{m}$ and a horizontal tail of $S_t = 31\ \mathrm{m^2}$ whose aerodynamic centre is $l_t = 15.8\ \mathrm{m}$ behind the wing–body aerodynamic centre. Find $\bar V_H$. (Enter it rounded to two decimal places.)
::: solution
$\bar V_H = 15.8 \times 31/(122.6 \times 4.19) = 489.8/513.7 = 0.953$, i.e. $0.95$ — within the usual range for transports.
:::
:::

::: exercise Static margin from the moment slope {level=1 check="0.12"}
Wind-tunnel tests give $C_{m\alpha} = -0.66\ \mathrm{rad^{-1}}$ and $a = 5.5\ \mathrm{rad^{-1}}$ with the centre of gravity at $h = 0.28$. Find the static margin. (Enter $K_n$ as a fraction of $\bar c$, rounded to two decimal places.)
::: solution
$K_n = -C_{m\alpha}/a = 0.66/5.5 = 0.12$, so $h_n = 0.40$.
:::
:::

::: exercise Neutral point without downwash {level=1 check="0.573"}
Recompute the neutral point of [[#ex-neutral-point]] assuming, wrongly, that $\varepsilon_\alpha = 0$ (and recomputing $a$ consistently). (Enter $h_n$ rounded to three decimal places.)
::: solution
$a = 4.8 + 0.90 \times 0.1852 \times 4.0 = 5.4667$; $h_n = 0.20 + 0.90 \times 0.5669 \times 4.0/5.4667 = 0.20 + 0.3733 = 0.573$. Ignoring downwash would place the neutral point $0.14\bar c$ ($0.21\ \mathrm{m}$) too far aft and could lead to an aft limit at which the real aircraft is unstable.
:::
:::

::: exercise Aft limit for a required margin {level=2 check="0.35"}
For the light aircraft, the stick-free neutral point is $h_n' = 0.380$ (with $a$ kept at its stick-fixed value) and the stick-fixed neutral point is $0.433$. The designer requires a stick-fixed margin of at least $5\,\%$ and a stick-free margin of at least $3\,\%$. What is the aft centre-of-gravity limit? (Enter $h$ rounded to two decimal places.)
::: solution
Stick-fixed: $h \le 0.433 - 0.05 = 0.383$. Stick-free: $h \le 0.380 - 0.03 = 0.350$. The tighter limit governs: $h_{\text{aft}} = 0.350$.
:::
:::

::: exercise Elevator to trim at the forward limit {level=2 check="-17.8"}
For the light aircraft of [[#ex-trim]] with the centre of gravity at $h = 0.20$, find the trim elevator angle at $C_L = 1.2$. (Enter $\delta_{\text{trim}}$ in degrees, rounded to one decimal place.)
::: solution
At $h = 0.20$: $K_n = 0.2328$, $C_{m\alpha} = -5.195 \times 0.2328 = -1.2094$; $C_{m\delta} = 0.300 \times 0 - 0.9184 = -0.9184$; $C_{m0} = -0.05 + 0 + 0.07124 = 0.02124$; $\Delta = 5.195 \times (-0.9184) - (-1.2094)(0.300) = -4.771 + 0.363 = -4.408$ (unchanged, as [[#prop-trim]] predicts). $\delta = -[0.02124 \times 5.195 + (-1.2094)(1.2233)]/(-4.408) = -(0.1103 - 1.4795)/(-4.408) = -0.3106\ \mathrm{rad} = -17.8^\circ$. With a travel of $-25^\circ$ and the extra nose-down moments of flaps and ground effect, $h = 0.20$ is close to the forward limit.
:::
:::

::: exercise Neutral point from flight test {level=2 check="0.41"}
In a flight test the trim elevator gradient $\mathrm{d}\delta/\mathrm{d}C_L$ was $-12.0^\circ$ at $h = 0.21$ and $-6.0^\circ$ at $h = 0.31$. Estimate the stick-fixed neutral point. (Enter $h_n$ rounded to two decimal places.)
::: solution
The gradient rises by $6.0^\circ$ per $0.10$ of chord, so it reaches zero $0.10$ beyond $h = 0.31$: $h_n = 0.41$.
:::
:::

::: exercise Floating elevator {level=2}
Show that if $b_1 = 0$ the stick-free and stick-fixed neutral points coincide, and explain physically why a heavily balanced elevator with $b_2 \to 0$ is dangerous.
::: solution
With $b_1 = 0$ the factor $1 - \tau b_1/b_2 = 1$, so $h_n' = h_n$: a change of tail angle of attack produces no hinge moment, so the free elevator does not move when $\alpha$ changes, and the free tail behaves like a fixed one. If $b_2 \to 0$ with $b_1 < 0$, then $\tau b_1/b_2 \to +\infty$ (both negative) and the factor becomes large and negative: the floating elevator moves so far trailing-edge-up when $\alpha$ increases that the tail *loses* lift — the stick-free neutral point moves far forward and the aircraft becomes unstable hands-off, with near-zero or reversed stick forces. Over-balanced controls have caused accidents, which is why airworthiness rules require stable stick-force gradients.
:::
:::

::: exercise Sizing a tailplane {level=3 check="2.55"}
The light aircraft is to be redesigned so that its stick-fixed neutral point is at $h_n = 0.40$ (instead of $0.433$), keeping $l_t$, $a_t$, $\eta$ and $\varepsilon_\alpha$, to save tail weight and drag. What tail area is needed? Then discuss what you would check before accepting the smaller tail. (Enter $S_t$ in $\mathrm{m^2}$, rounded to two decimal places.)
::: solution
Let $s = S_t/S$. Then $\bar V_H = (l_t/\bar c)s = 3.0612\,s$ and $a = 4.8 + 0.90 \times 4.0 \times 0.5926\,s = 4.8 + 2.1333\,s$. The condition $h_n - h_{ac} = 0.20$:
$$
\frac{0.90 \times 3.0612\,s \times 4.0 \times 0.5926}{4.8 + 2.1333\,s} = 0.20 \;\Longrightarrow\; 6.5306\,s = 0.96 + 0.42667\,s \;\Longrightarrow\; s = 0.15727,
$$
so $S_t = 0.15727 \times 16.2 = 2.55\ \mathrm{m^2}$, $15\,\%$ smaller than the present $3.0\ \mathrm{m^2}$. Checks before accepting it: (i) the stick-free neutral point moves forward with it (to about $0.20 + 0.20 \times 0.775 = 0.355$), shrinking the usable centre-of-gravity range unless the hinge-moment parameters are changed; (ii) the forward limit: the elevator power $C_{m\delta} \propto \bar V_H$ falls by $15\,\%$, so trimming at $C_{L,\max}$ with flaps and in ground effect, and rotating on take-off, must be re-checked — the forward limit moves aft; (iii) the combined range between the two limits may become too small for the loading cases the aircraft must carry; (iv) dynamic stability (short-period damping, [[flight-mechanics/dynamic-modes]]) depends on the tail too; (v) spin recovery and stall behaviour, which depend on tail effectiveness at high angle of attack. In practice the tail is sized from a "scissor plot" of required tail area against centre-of-gravity position, with one line for each limit.
:::
:::
