You are standing on a long, level platform and a train slides past at a steady speed. Drop a coin. It falls straight down to the floor of the carriage, the way it would if the train were standing still. Throw a ball to a fellow passenger; for all practical purposes it flies exactly as it would between two people on the platform. The mechanics of what happens inside the carriage does not seem to care that the carriage is moving. This is not an accident. As [[relativity/galilean]] showed, the laws of mechanics preserve their form when you change from one **inertial** frame to another, and the bookkeeping that does it is the Galilean transformation between coordinates.

Electromagnetism broke the habit. Maxwell's equations in vacuum predict waves that travel at a definite speed, $c \approx 2.99792458\times 10^{8}\,\mathrm{m/s}$. A definite speed of *what, relative to what*? If velocity is relative to the observer's frame, then, on the Galilean picture, the waves of light should travel at $c+v$ with respect to an observer moving at $v$ with respect to… what? The ether had been invented as the answer, as the stuff through which the waves run and the speed is measured — and the famous 1887 Michelson–Morley experiment could not find the ether wind. Einstein, in his 1905 paper, did the opposite of what everyone else was doing. He stopped asking "what is $c$ relative to?" and instead made invariance of $c$ a *rule*: every inertial observer measures the same speed of light. Together with the principle that all inertial frames are equivalent, that one rule forces a new arithmetic of space and time on the rest of physics.

This chapter states the two rules and derives, with no hidden physics, the coordinate transformation they imply. The derivation is elementary algebra. Its consequences are not: time and length stop being absolute. Time dilation and length contraction, and the relativity of simultaneity behind them, are the subject of [[relativity/time-and-length]]; the energy and momentum that come out of the new kinematics are [[relativity/velocity-energy]].

## The two postulates

Before stating them, the vocabulary needs one precise word. An **inertial frame** is a reference frame in which a particle with no force acting on it moves in a straight line at constant speed. A laboratory bolted to a turning centrifuge is not one. A spacecraft coasting far from masses is an excellent one — in [[relativity/galilean#def-inertial]], inertial frames of mechanics are defined exactly this way, and nothing about the definition is about to change. Each frame carries a full set of measurement apparatus: rulers at rest in that frame, and a lattice of **clocks at rest in that frame**, arranged all over space. Events — a flash here, a collision there — are local happenings at a point of space and an instant of time, and every frame assigns such an event its own coordinates $(x, t)$ in one spatial dimension. Which clock to consult is part of the bookkeeping: the clock *at the event's location in that frame*, as set by that frame's own procedure for synchronisation ([[relativity/time-and-length#def-sync]]).

The two postulates, as Einstein stated them in 1905:

::: axiom Postulate of relativity {#ax-relativity}
The laws of physics take the same form in every inertial frame.
:::

::: axiom Postulate of the constancy of the speed of light {#ax-light}
The speed of light in vacuum is the same constant $c$ in every inertial frame, independent of the motion of the source.
:::

The first postulate is the Newtonian one, upgraded: not the laws of mechanics, but the laws of *physics*, including the Maxwell equations that fail the Galilean test. The second postulate is the empirical bite. "Independent of the motion of the source" matters: a flash from a headlamp on a moving train does not get sped up. The source's velocity drops out of the answer.

These are not derivable from anything more basic — a postulate is a rule agreed with nature. What follows *from* them, and from nothing else plus algebra, is the transformation between the coordinates two inertial frames assign to the same events. That is the content of this chapter.

## What the transformation can be

Label the frames $S$ and $S'$, as in [[relativity/galilean#def-galilean]]. $S'$ moves at constant speed $v$ in the $+x$ direction relative to $S$. The origins coincide at $t = t' = 0$, and the axes are parallel. We seek $(x', t')$ in terms of $(x, t)$.

Two structural constraints apply before a single number enters.

::: proposition Linearity {#prop-linear}
The transformation from the coordinates of an event in $S$ to its coordinates in $S'$ is linear: it is made of constant multiplications and additions, and there is no squaring or dividing by coordinates.
:::

::: proof
A free particle at rest in $S'$ (so $x' = 0$ for all $t'$) moves at the constant speed $v$ in $S$: the worldline $x' = 0$ must map to the straight, uniform worldline $x = vt$ in $S$. If the map were nonlinear — if $x'$ contained something like $x^2$ or $xt$ — then the straight line $x = vt$ would come back from $S'$ bent or non-uniform, contradicting the postulate that force-free motion is straight and uniform in every inertial frame.

The same argument, in the other direction, says that a line $x = ut$ of uniform motion in $S$ must be a line of uniform motion in $S'$. A function that sends every non-vertical line to a line, with the origin to the origin, is affine: linear up to a constant, and the coincidence of origins kills the constants. The coefficients cannot depend on the event: if they did, the transformation from $S$ to $S'$ would differ from event to event, which is a contradiction, since the frames themselves are fixed and the relation between them is one fixed relation of coordinate systems.

So, for a single spatial dimension,
$$
x' = A\,x + B\,t, \qquad t' = C\,t + D\,x,
$$ {#eq-general}
with $A, B, C, D$ constants independent of the event. Linearity is a consequence of the first postulate plus homogeneity of space and time; the second postulate will then fix the four constants.
:::

The origin of $S'$ sits, by definition, at $x = vt$ in $S$, and it has coordinate $x' = 0$ in its own frame. Substituting $x = vt$ into the first of [[#eq-general]] gives $0 = A v t + B t$ for all $t$, so $B = -A v$:

$$
x' = A\,(x - v t).
$$ {#eq-xfactor}

That already is more than Galilean mechanics allows. In the Galilean transformation of [[relativity/galilean#eq-galilean]], time is shared, $t' = t$, and space is sheared by $-vt$ with coefficient $1$. Here the coefficient of the same shear is an unknown $A$, and the time coordinate is allowed to be a mixture of $t$ and $x$ at once. That second piece is where all the new physics is, because it is exactly what the second postulate demands.

## The light front fixes the time coordinate

A flash fired at the common origin at $t = t' = 0$ spreads out spherically. On our axis, the right-going edge of the disturbance is the **light front**, $x = c t$ in $S$. In $S'$ the same flash spreads from the origin of $S'$, and the right-going edge is $x' = c t'$ there: nothing in the second postulate says *which* frame gets to see the front at a different speed. It says both see it at $c$.

So the line $x = c t$ in the $S$ coordinates must be carried by the transformation to the line $x' = c t'$ in the $S'$ coordinates. Apply [[#eq-general]] to the right-going front, $x = c t$, writing $\beta = v/c$:

$$
x' = A\,(c t - v t) = A c\,(1 - \beta)\,t, \qquad t' = (C + D\,c)\,t.
$$ {#eq-rfront}

The requirement that this line be the light front in $S'$, $x' = c t'$, makes $x'$ and $t'$ satisfy $x' = c t'$ point by point; dividing the first of [[#eq-rfront]] by the second and setting the ratio to $c$ gives the constraint

$$
C + D\,c = A\,(1 - \beta).
$$ {#eq-rconstraint}

::: proposition Light-front constraint {#prop-lightfront}
The transformation maps the right-going light front to the right-going light front and the left-going light front to the left-going light front:
$$
x = c t \iff x' = c t', \qquad x = -c t \iff x' = -c t'.
$$ {#eq-lightfront}
:::

The left-going front is the other half of the same spherical flash and is handled identically. Apply [[#eq-general]] to it, $x = -c t$:

$$
x' = A\,(-c t - v t) = -A c\,(1 + \beta)\,t, \qquad t' = (C - D\,c)\,t,
$$

and the requirement $x' = -c t'$ along this line gives, by the same division,

$$
C - D\,c = A\,(1 + \beta).
$$ {#eq-lconstraint}

Add [[#eq-rconstraint]] and [[#eq-lconstraint]]: the $D$ terms cancel and $C = A$. Subtract them: $2 D c = A(1-\beta) - A(1+\beta) = -2 A \beta$, so $D = -A \beta / c$. With $C = A$ and $D = -A\beta/c$ the time coordinate is

$$
t' = C t + D x = A \left(t - \frac{\beta}{c}\,x\right) = A\left(t - \frac{v x}{c^2}\right),
$$

and, together with [[#eq-xfactor]], this is

$$
x' = A\,(x - v t), \qquad t' = A\left(t - \frac{v x}{c^2}\right).
$$ {#eq-pregamma}

The time coordinate of $S'$ is genuinely contaminated by position: two events that $S$ calls simultaneous, $t_1 = t_2$, but at different $x$, are *not* simultaneous in $S'$. The second postulate has already broken absolute time before any numbers are put in. Only one constant remains, $A$, and it is fixed without any physical input at all, by requiring the transformation to be an actual change of coordinates: its inverse must agree with the same law with $v$ replaced by $-v$, which it must, since $S$ moves at $-v$ relative to $S'$ and the frames are on equal footing.

## The Lorentz transformation

::: theorem Lorentz transformation {#thm-lorentz2}
The unique linear transformation between the coordinates of two inertial frames $S$ and $S'$, in relative transverse-free motion at speed $v$ with origins coincident at $t=t'=0$, that maps light fronts to light fronts, is, with $\beta = v/c$ and

$$
\gamma = \frac{1}{\sqrt{1 - \beta^2}} = \frac{1}{\sqrt{1 - v^2/c^2}},
$$ {#eq-gamma}

$$
x' = \gamma\,(x - v t), \qquad t' = \gamma\left(t - \frac{v x}{c^2}\right).
$$ {#eq-lorentz2}
:::

::: proof
Start from [[#eq-pregamma]]. Because the two frames are equivalent — the first postulate is a statement about the *pair* of frames, not a preference for one of them — the inverse law is the same law read with $v$ replaced by $-v$: the same unknown coefficient $A$ and the opposite relative velocity:

$$
x = A\,(x' + v t'), \qquad t = A\left(t' + \frac{v x'}{c^2}\right).
$$ {#eq-inverse}

(There is no new constant here: if the forward map from $S$ to $S'$ and the reverse map from $S'$ to $S$ carried different scale factors, composing the round trip $S \to S' \to S$ would leave a leftover scale on every event, contradicting that a round trip is the identity. Reciprocity is what fixes the two scale factors to be equal, and then the composition fixes their common value.)

Now substitute [[#eq-inverse]] into the forward $x$-law and demand that the result be $x'$:

$$
x - v t \;=\; A(x' + v t') - v A\left(t' + \frac{v x'}{c^2}\right) \;=\; A x' + A v t' - A v t' - \frac{A v^2}{c^2}\,x' \;=\; A\left(1 - \frac{v^2}{c^2}\right)x' .
$$

The $t'$ terms cancel exactly — $+Avt'$ against $-Av\,t'$ — because the *same* $A$ and the *same* $v$ appear in the two laws; that cancellation is the content of reciprocity, not an assumption smuggled in. Hence, for every event,

$$
x' \;=\; A(x - v t) \;=\; A^2\left(1 - \frac{v^2}{c^2}\right) x' .
$$

The coefficient must be one:

$$
A^2 = \frac{1}{1 - v^2/c^2} \qquad\Longrightarrow\qquad A = \frac{1}{\sqrt{1 - v^2/c^2}} = \gamma,
$$

with the positive root, since $A$ is continuous in $v$ and must reduce to the Galilean coefficient $1$ as $v \to 0$. The $t$-law composes to the identity by identical algebra — the $x'$ terms there cancel in exactly the way the $t'$ terms cancelled above. Substituting $A = \gamma$ into [[#eq-pregamma]] gives [[#eq-lorentz2]]. \qquad∎
:::

The derivation is deliberately spelled out in full because the only two *inputs* are (i) the two frames are equivalent, so the inverse law is the forward law with $v \to -v$, and (ii) both frames see the light front at $c$. Everything else — the factor $\gamma$, the mixing of time and position, the invariance of the quantity $c^2 t^2 - x^2$ — is algebra. The price of that algebra is paid at $v \gg c$, where $\gamma \to \infty$, and nothing in the derivation is mysterious.

::: corollary Invariant interval {#cor-interval}
The quantity $c^2 t^2 - x^2$ is the same in $S$ and $S'$: for any event,

$$
c^2 t'^2 - x'^2 = c^2 t^2 - x^2.
$$ {#eq-interval2}
:::

::: proof
Substitute [[#eq-lorentz2]] with $A = \gamma$:

$$
c^2 t'^2 - x'^2 = \gamma^2 c^2\left(t - \frac{v x}{c^2}\right)^2 - \gamma^2(x - v t)^2 = \gamma^2\left[c^2 t^2 - 2 v t x + \frac{v^2 x^2}{c^2} - x^2 + 2 v t x - v^2 t^2\right]
$$

$$
= \gamma^2\left[\left(c^2 - v^2\right) t^2 + \left(\frac{v^2}{c^2} - 1\right) x^2\right] = \gamma^2 (c^2 - v^2)\left[t^2 - \frac{x^2}{c^2}\right] = \gamma^2 c^2\left(1 - \frac{v^2}{c^2}\right)\left(t^2 - \frac{x^2}{c^2}\right).
$$

Since $\gamma^2 = 1/(1 - v^2/c^2)$, the prefactor is exactly $c^2$, and

$$
c^2 t'^2 - x'^2 = c^2 t^2 - x^2. \qquad\blacksquare
$$
:::

The invariant $c^2 t^2 - x^2$ (or its sign-reversed cousin $x^2 - c^2 t^2$ — the choice is a convention) is the thing that all inertial frames agree on. It is the replacement for the separately-absolute distance and time of the Galilean world. That it is *this* quantity, and not $t$ alone or $x$ alone, is not a coincidence: it is the quadratic form that the group of Lorentz transformations preserves, and the group condition is exactly what fixed $A = \gamma$ in the proof of [[#thm-lorentz2]]. The full structure of that invariant — four-vectors, the mass shell, invariants in collisions — is [[relativity/four-vectors]].

## The low-speed limit is Galilean

::: corollary Galilean limit {#cor-galilean}
As $v/c \to 0$, the Lorentz transformation [[#eq-lorentz2]] reduces to the Galilean transformation $x' = x - vt$, $t' = t$.
:::

::: proof
Let $\beta = v/c$. Then $\gamma = 1/\sqrt{1-\beta^2} = 1 + \beta^2/2 + O(\beta^4)$ and

$$
x' = \gamma(x - vt) = \left(1 + \frac{\beta^2}{2} + \cdots\right)(x - vt) = (x - vt)\left(1 + O(\beta^2)\right),
$$

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = \left(1 + O(\beta^2)\right)\left(t - \beta \frac{x}{c}\right) = t + O(\beta) \cdot \frac{x}{c} + O(\beta^2) t.
$$

For any apparatus of finite size $x \leq L$ and duration $t \leq T$ in units where $cL$ and $cT$ are the natural scales, the corrections to $x' = x - vt$ and $t' = t$ are $O(v^2/c^2)$ and $O(v L / c^2 \cdot c) = O(v L/(c^2/c)) = O(v L / c) \cdot O(1)$, both vanishing as $v/c \to 0$. At $v = 10\,\mathrm{m/s}$, $\beta \approx 3.3\times 10^{-8}$ and $\gamma - 1 \approx 5.5\times 10^{-16}$: the Galilean result is good to about sixteen significant figures, which is why the Galilean transformation of [[relativity/galilean#eq-galilean]] worked so well for the mechanics of everyday life and only failed, spectacularly, for light. \qquad∎
:::

The postulates do not discard Newton. At low speed relative to $c$, they reproduce Newton's transformation exactly, and every mechanics result of [[relativity/galilean]] survives. That is not a limitation of the two postulates; it is the point. The new physics is not "the world is different"; it is "the world is the same at low speed and different at high speed, and the difference is in the coordinates, not in the physics".

## Worked examples

::: example Invariance of the light front, checked numerically {#ex-lightfront-check}
Take $\beta = 0.6$, so $\gamma = 1/\sqrt{1 - 0.36} = 1/\sqrt{0.64} = 1.25$. The event $E = (x, t) = (3, 4)$ in units where $c = 1$ lies on the light front, since $x^2 - t^2 = 9 - 16 = -7 = -(4^2 - 3^2)$, i.e. $c^2 t^2 - x^2 = 16 - 9 = 7$. Find $E' = (x', t')$ in $S'$ and check that $E'$ also lies on the light front.
::: solution
Apply [[#eq-lorentz2]] with $v = 0.6$, $c = 1$:

$$
x' = \gamma(x - vt) = 1.25(3 - 0.6 \times 4) = 1.25(3 - 2.4) = 1.25 \times 0.6 = 0.75,
$$

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = 1.25\left(4 - 0.6 \times 3\right) = 1.25(4 - 1.8) = 1.25 \times 2.2 = 2.75.
$$

Check the invariant: $c^2 t'^2 - x'^2 = 2.75^2 - 0.75^2 = 7.5625 - 0.5625 = 7$. Both frames give $7$. The event $E'$ has $t' = 2.75 \neq |x'| = 0.75$, so $E$ is not *on* the light front in either frame — the invariant is the invariant, not equality of $|x'|$ and $t'$. The light front itself is the set of events with $c^2 t^2 = x^2$; check one: $F = (x,t) = (4,4)$, $x = t$ so $F$ is light. Then

$$
x' = 1.25(4 - 0.6 \times 4) = 1.25 \times 1.6 = 2.0, \qquad t' = 1.25(4 - 0.6 \times 4) = 1.25 \times 1.6 = 2.0.
$$

$x' = t' = 2.0$: $F'$ is on the light front in $S'$ as well. The light front is a set of events, and every event on it in $S$ is on it in $S'$, exactly as [[#prop-lightfront]] requires.
:::
:::

::: example Time dilation read off the transformation {#ex-dilation-readoff}
A clock at rest in $S'$ ticks. Between two ticks the clock reads $\Delta t' = \tau$ (its own time). What does $S$ assign to the time between those two ticks?
::: solution
The clock is at rest in $S'$, so both tick-events happen at the same position in $S'$: $\Delta x' = 0$. Use the inverse Lorentz law (same form, $v \to -v$):

$$
\Delta t = \gamma\left(\Delta t' - \frac{v\, \Delta x'}{c^2}\right) = \gamma\left(\Delta t' - 0\right) = \gamma\, \Delta t' = \gamma\, \tau.
$$

The moving clock, read by $S$, accumulates $\tau$ proper time while the coordinate time in $S$ advances by $\gamma \tau > \tau$. So $S$ sees the $S'$ clock run *slow*. This is the time-dilation formula of [[relativity/time-and-length#thm-dilation]], and it has been read directly off the Lorentz transformation with no additional physics. Note the asymmetry of the setup: the two events here are *co-located in $S'$* but *not* co-located in $S$. The dilation formula applies to pairs of events that happen at the same place in one frame; for arbitrary pairs, the general law is [[#eq-lorentz2]] itself.
:::
:::

::: example The origin of $S'$ in the $S$ coordinates {#ex-origin-track}
Find the worldline of the origin of $S'$ as $S$ records it.
::: solution
The origin of $S'$ is the set of events with $x' = 0$ by definition. Set the $x'$-equation of [[#eq-lorentz2]] to zero:

$$
0 = \gamma(x - v t) \quad\Longrightarrow\quad x = v t.
$$

The origin of $S'$ sweeps out $x = vt$ in $S$, as required by the setup: $S'$ moves at speed $v$ in $S$. Check the $t'$ coordinate of that worldline:

$$
t' = \gamma\left(t - \frac{v(v t)}{c^2}\right) = \gamma t\left(1 - \frac{v^2}{c^2}\right) = \gamma t\,\frac{1}{\gamma^2} = \frac{t}{\gamma}.
$$

So along the worldline of the origin, $S'$ time runs at $1/\gamma$ of $S$ time: the clock at the origin of $S'$ (which is co-located with itself, trivially) reads $t' = t/\gamma$ when $S$ reads $t$. That is the same time-dilation statement as [[#ex-dilation-readoff]], approached from the other side.
:::
:::

::: example Low-speed sanity check of the algebra {#ex-galilean-check}
Verify directly that for $v/c = \varepsilon$ small, $x' = x - vt + O(\varepsilon^2)$ and $t' = t + O(\varepsilon)$.
::: solution
Expand $\gamma$ in powers of $\varepsilon = v/c$:

$$
\gamma = (1 - \varepsilon^2)^{-1/2} = 1 + \frac{\varepsilon^2}{2} + O(\varepsilon^4).
$$

Then

$$
x' = \gamma(x - v t) = \left(1 + \frac{\varepsilon^2}{2} + \cdots\right)(x - \varepsilon c t) = x - \varepsilon c t + \frac{\varepsilon^2 x}{2} + O(\varepsilon^3),
$$

so the correction to the Galilean $x' = x - vt$ is $O(\varepsilon^2 x) = O(v^2 x / c^2)$. For $t'$:

$$
t' = \gamma\left(t - \frac{v x}{c^2}\right) = \left(1 + \frac{\varepsilon^2}{2} + \cdots\right)\left(t - \frac{x}{c}\varepsilon\right) = t - \frac{\varepsilon x}{c} + \frac{\varepsilon^2 t}{2} + O(\varepsilon^3).
$$

The leading correction to $t' = t$ is $-\varepsilon x/c = -v x/c^2$, which is $O(v x / c^2)$. For a laboratory of size $x \leq 1\,\mathrm{m}$ and $v = 10\,\mathrm{m/s}$, this is $\sim 10 / (9\times 10^{16}) \sim 1.1\times 10^{-16}\,\mathrm{s}$: utterly below any direct measurement, consistent with [[#cor-galilean]] and with the historical fact that the Galilean transformation worked for centuries before the Michelson–Morley experiment forced the question.
:::
:::

The one consequence that deserves a live look is the velocity-addition law that [[#eq-lorentz2]] carries with it, which the next chapter derives fully. With $c = 1$ as the unit of speed in the figure, drag the frame speed $v$ and the particle speed $u$ and compare the Einstein composition with the naive sum:

::: widget boost
v: 0.5
u: 0.6
caption: Set $v$ and $u$ near $1$ and watch the Einstein result stay below $1$ while the Galilean sum $u + v$ crosses it: no composition of sub-light speeds reaches $c$ from below, and a light ray ($u = 1$) stays a light ray at any $v$.
:::

## Quick checks

::: quiz Why does the second postulate force $t'$ to depend on $x$?
- [ ] Because light is a medium and the medium moves with the source
- [ ] Because if $t' = t$ the speed of light would be $c \pm v$ in $S'$, not $c$
- [x] Because the light front $x = ct$ in $S$ must map to $x' = ct'$ in $S'$, and no single time coordinate $t' = t$ can satisfy that for both the right- and left-going fronts
- [ ] Because clocks run slow in $S'$ by an amount that depends on position
::: solution
[[#prop-lightfront]] is the operative constraint. If $t' = t$ (the Galilean assumption), then the right-going front $x = ct$ gives $x' = x - vt$ (from the $x'$-equation with $A = 1$ to be consistent with the low-speed limit), so the front in $S'$ is $x' = (c - v)t$, which moves at speed $c - v$, not $c$. The left-going front similarly gives $c + v$. The only way both fronts move at $c$ in $S'$ is for $t'$ to be a function of both $t$ and $x$, which is exactly what $t' = \gamma(t - vx/c^2)$ is. The dependence of $t'$ on $x$ is not an optional refinement; it is the single structural change that makes light's speed invariant.
:::
:::

::: quiz The Lorentz transformation with $v \to 0$ gives...
- [ ] A Galilean transformation with an extra $O(v^2)$ correction to $t'$
- [x] Exactly the Galilean transformation $x' = x - vt$, $t' = t$, as $v/c \to 0$
- [ ] A Galilean transformation in which $t$ is replaced by $t/\gamma$
- [ ] No transformation at all, since the frames coincide
::: solution
[[#cor-galilean]] proves the limit explicitly: both $x'$ and $t'$ reduce to their Galilean forms in the $v/c \to 0$ limit, with corrections of order $v^2/c^2$ and $v x/c^2$ respectively, both vanishing. At $v = 10\,\mathrm{m/s}$ the first correction is around $10^{-16}$, below any practical measurement. The Lorentz transformation does not merely *approximate* the Galilean transformation at low speed; it *is* the Galilean transformation in the strict limit, and the two postulates are consistent with the two centuries of successful Newtonian mechanics built on it.
:::
:::

::: warning Not $t' = t$, and not just "time is weird"
The most common error in this material is to write down $x' = \gamma(x - vt)$ but keep $t' = t$, then be puzzled when the light front comes out at $c - v$ in $S'$. The $t'$-equation $t' = \gamma(t - vx/c^2)$ is not a side feature; it is the part of the transformation that makes the second postulate true. Any calculation in which $t'$ is set equal to $t$ is calculating the wrong transformation. Similarly, "time dilation" and "length contraction" are both consequences of the two equations together, not separate effects. They are two views of the one transformation [[#eq-lorentz2]].
:::

::: intuition The light cone is the spine of the transformation
The set of events satisfying $c^2 t^2 - x^2 = 0$ — the light cone — is the set that the Lorentz transformation *preserves*. The invariant $c^2 t^2 - x^2$ of [[#cor-interval]] is a generalisation of that: the whole family of surfaces $c^2 t^2 - x^2 = \text{constant}$ is a family of hyperboloids, and the Lorentz transformation rotates between them while preserving the quadratic form, exactly as a spatial rotation preserves $x^2 + y^2$ while rotating the plane. The "rotation" here is in the plane spanned by $x$ and $ct$, with the invariant being $c^2 t^2 - x^2$ rather than $x^2 + y^2$ — the difference in sign is what makes the geometry hyperbolic rather than circular, and it is the sign that makes $\gamma$ have a pole at $v = c$ rather than at $v = 0$.
:::

## Where this leads

The consequences the two postulates force on time and length — time dilation, length contraction, the twin-paradox structure — are worked out in [[relativity/time-and-length]]. The velocity-addition law, the relativistic Doppler shift, and the energy–momentum relation all follow as applications of the same Lorentz transformation, in [[relativity/velocity-energy]]. The geometric form of the same content — four-vectors, invariants, and the mass shell — is [[relativity/four-vectors]]. None of those chapters adds a new postulate; they all use the one transformation of [[#thm-lorentz2]].

::: history Einstein's 1905 derivation
Einstein's 1905 paper, "On the Electrodynamics of Moving Bodies," does not mention the Michelson–Morley experiment in its argument; it starts from the two postulates and derives the Lorentz transformation as a coordinate-change law, exactly as this chapter has done. The Michelson–Morley experiment of 1887, and the Lorentz ether theory that preceded Einstein, provided the physical context, but the 1905 result is a consequence of the postulates plus algebra, not of the ether measurements. Minkowski, in 1908, reformulated the same content as the geometry of a four-dimensional spacetime with invariant $c^2 t^2 - x^2 - y^2 - z^2$, which is the form used throughout this course from [[relativity/four-vectors]] onward. The two postulates are not "Einstein's guess"; they are the two experimentally-grounded facts (equivalence of inertial frames, invariance of $c$) that any consistent coordinate-change law must incorporate.
:::

::: summary
- The two postulates — equivalence of inertial frames, invariance of $c$ — are the full physical input; the rest of this section is algebra.
- Linearity of the coordinate transformation follows from the first postulate plus homogeneity of space and time ([[#prop-linear]]).
- The invariance of the light front in both frames forces $t' = \gamma(t - vx/c^2)$, i.e. $t'$ depends on both $t$ and $x$ ([[#prop-lightfront]]).
- The inverse-symmetry requirement (the same law in reverse) fixes $A = \gamma = 1/\sqrt{1 - v^2/c^2}$ ([[#thm-lorentz2]]).
- The Lorentz transformation preserves the invariant $c^2 t^2 - x^2$ ([[#cor-interval]]); that is the replacement for separately-absolute space and time.
- In the $v/c \to 0$ limit, the Lorentz transformation reduces exactly to the Galilean transformation ([[#cor-galilean]]); low-speed Newtonian mechanics is not violated, it is recovered.
:::

## Exercises

::: exercise level=1
Write down the Lorentz transformation for a frame $S''$ that moves at speed $v = 0.8\,c$ relative to $S$, with the same origin-coincidence convention. Compute $x''$ and $t''$ for the event $(x, t) = (0, 1\,\mathrm{s})$ in $S$. Use $c = 3\times 10^{8}\,\mathrm{m/s}$ and give $x''$ in metres, $t''$ in seconds.
check="1.6667"
::: solution
$v = 0.8c$, $\beta = 0.8$, $\gamma = 1/\sqrt{1 - 0.64} = 1/\sqrt{0.36} = 1/0.6 = 5/3$. The event is $x = 0$, $t = 1\,\mathrm{s}$. Apply [[#eq-lorentz2]]:

$$
x'' = \gamma(x - vt) = \frac{5}{3}(0 - 0.8c \times 1) = \frac{5}{3} \times \frac{-4}{5} \cdot c = -\frac{4}{3}c = -\frac{4 \times 3\times 10^{8}}{3}\,\mathrm{m} = -4\times 10^{8}\,\mathrm{m},
$$

$$
t'' = \gamma\left(t - \frac{v x}{c^2}\right) = \frac{5}{3}\left(1 - 0\right) = \frac{5}{3}\,\mathrm{s} \approx 1.6667\,\mathrm{s}.
$$

The check value is $t'' = 5/3 \approx 1.6667$.
:::
:::

::: exercise level=1
Verify explicitly that the invariant $c^2 t^2 - x^2$ is the same in both frames for the event $(x,t) = (6, 8)$ in units $c = 1$, with $\beta = 0.6$, $\gamma = 1.25$.
::: solution
In $S$: $c^2 t^2 - x^2 = 1 \cdot 64 - 36 = 28$. Transform: $x' = 1.25(6 - 0.6 \times 8) = 1.25(6 - 4.8) = 1.25 \times 1.2 = 1.5$; $t' = 1.25(8 - 0.6 \times 6) = 1.25(8 - 3.6) = 1.25 \times 4.4 = 5.5$. In $S'$: $c^2 t'^2 - x'^2 = 1 \cdot 30.25 - 2.25 = 28$. Both frames give $28$. \qquad∎
:::
:::

::: exercise level=2 {#ex-exercise-3}
A rod of rest length $L_0$ lies along the $x'$ axis of $S'$, with one end at $x' = 0$ and the other at $x' = L_0$. Find the length of the rod as assigned by $S$, using only the Lorentz transformation and the definition of length as the distance between the two ends *at the same $S$-time*.
hint="Length in S requires the two end-events to be simultaneous in S. Apply the time equation to each end and solve for the x-positions at a common t."
::: solution
The two ends are at $x' = 0$ and $x' = L_0$ in $S'$. Let the left end have $S'$-coordinates $(0, t'_L)$ and the right end $(L_0, t'_R)$. Apply the inverse Lorentz law ($v \to -v$):

$$
x_L = \gamma(0 + v t'_L) = \gamma v t'_L, \qquad t_L = \gamma(t'_L + 0) = \gamma t'_L,
$$

$$
x_R = \gamma(L_0 + v t'_R), \qquad t_R = \gamma(t'_R + v L_0 / c^2).
$$

Length in $S$ requires simultaneity: $t_L = t_R$. So

$$
\gamma t'_L = \gamma\left(t'_R + \frac{v L_0}{c^2}\right) \quad\Longrightarrow\quad t'_L - t'_R = \frac{v L_0}{c^2}.
$$

The length in $S$ is $L = x_R - x_L = \gamma(L_0 + v t'_R) - \gamma v t'_L = \gamma L_0 + \gamma v(t'_R - t'_L) = \gamma L_0 - \gamma v \cdot \frac{v L_0}{c^2} = \gamma L_0\left(1 - \frac{v^2}{c^2}\right) = \gamma L_0 \cdot \frac{1}{\gamma^2} = \frac{L_0}{\gamma}$.

So the moving rod is measured at length $L_0 / \gamma < L_0$ in $S$: the rod is *contracted* in the direction of motion, as stated in [[relativity/time-and-length#thm-contraction]]. The contraction is a consequence of the requirement that "length in $S$" means "distance between the ends at the same $S$-time," combined with the fact that the Lorentz transformation does not preserve simultaneity of events at different positions. It is not that the rod is "physically squashed" in any absolute sense; it is that the two frames disagree about which pairs of end-events are simultaneous, and the distance in $S$ is shorter.
:::
:::

::: exercise level=2
Show that the velocity-addition law $u' = (u - v)/(1 - uv/c^2)$ follows directly from the Lorentz transformation, by differentiating $x' = \gamma(x - vt)$ and $t' = \gamma(t - vx/c^2)$ with respect to $t$ and using $u = dx/dt$.
::: solution
Differentiate the $x'$-equation with respect to $t$ (holding the particle's worldline fixed, so $x = x(t)$):

$$
\frac{dx'}{dt} = \gamma\left(\frac{dx}{dt} - v\right) = \gamma(u - v).
$$

Differentiate the $t'$-equation:

$$
\frac{dt'}{dt} = \gamma\left(1 - \frac{v}{c^2}\frac{dx}{dt}\right) = \gamma\left(1 - \frac{v u}{c^2}\right).
$$

The velocity in $S'$ is $u' = dx'/dt' = (dx'/dt)/(dt'/dt)$:

$$
u' = \frac{\gamma(u - v)}{\gamma(1 - vu/c^2)} = \frac{u - v}{1 - \frac{v u}{c^2}}.
$$

The $\gamma$ cancels, which is a useful sanity check: the $\gamma$ factors are the same in numerator and denominator because the same transformation law applies to both $x'$ and $t'$. In the low-speed limit $uv/c^2 \to 0$, this reduces to $u' = u - v$, the Galilean velocity law of [[relativity/galilean#thm-velocity]], consistent with [[#cor-galilean]] applied to velocities.
:::
:::

::: exercise level=3 {#ex-exercise-5}
Suppose a frame $S'$ moves at $v = 0.5c$ relative to $S$, and a particle moves at speed $u = 0.9c$ in the $+x$ direction in $S$. Find the particle's speed $u'$ in $S'$, and verify that the result is less than $c$ and that $u' \to c$ as $u \to c$ at fixed $v$.
::: solution
Use the velocity-addition law just derived:

$$
u' = \frac{u - v}{1 - \frac{uv}{c^2}} = \frac{0.9c - 0.5c}{1 - \frac{0.9 \times 0.5 \cdot c^2}{c^2}} = \frac{0.4c}{1 - 0.45} = \frac{0.4c}{0.55} \approx 0.727\,c.
$$

Check $u' < c$: $0.727c < c$. Now check the $u \to c$ limit at fixed $v$:

$$
\lim_{u \to c} \frac{u - v}{1 - uv/c^2} = \frac{c - v}{1 - v/c} = \frac{c - v}{(c - v)/c} = c.
$$

A light ray in $S$ is a light ray in $S'$, as [[#ax-light]] requires. The fact that $u' < c$ for all $u < c$ (at fixed sub-c $v$) is not a coincidence; it is a direct consequence of the velocity-addition law, and the limit $u' \to c$ as $u \to c$ is the invariance of the light speed in both frames.
:::
:::

::: exercise level=3
The postulate of relativity says the laws of physics are the same in every inertial frame. Explain, using only the Lorentz transformation, why a free-particle Lagrangian $L = -mc^2\sqrt{1 - v^2/c^2}$ (where $v$ is the particle's speed in a given frame) is consistent with the postulate: i.e. why a Lagrangian built from the invariant speed $v$ and the invariant $c$ gives the same physics in both frames.
hint="The key is that v^2 = v'v' in a frame-independent way; the Lagrangian depends on v only through v^2/c^2, which is invariant under the Lorentz transformation."
::: solution
The speed of a particle in a frame is $v = dx/dt$ in that frame's coordinates. The invariant $c^2 t^2 - x^2$ of [[#cor-interval]] implies, for infinitesimal displacements along the particle's worldline, that $c^2 dt^2 - dx^2$ is the same in both frames: $c^2 dt'^2 - dx'^2 = c^2 dt^2 - dx^2$. Dividing through by $dt^2$ and using $dx = v\,dt$, $dx' = v'\,dt'$:

$$
c^2 - v^2 = c^2\left(\frac{dt'}{dt}\right)^2 - v'^2\left(\frac{dt'}{dt}\right)^2 = \left(c^2 - v'^2\right)\left(\frac{dt'}{dt}\right)^2.
$$

From [[#eq-lorentz2]], $dt'/dt = \gamma(1 - v u/c^2)$ evaluated on the particle's worldline — for a particle moving at speed $u = v$ (a free particle at rest in its own frame, or a general one), the ratio $dt/dt'$ is the time-dilation factor $\gamma(v)$, so $dt'/dt = 1/\gamma$ for the rest-frame case. In the rest frame of the particle, $v' = 0$, and $c^2 - v^2 = c^2 / \gamma^2$, giving $\gamma = 1/\sqrt{1 - v^2/c^2}$, the same $\gamma$ as in [[#eq-gamma]]. The Lagrangian $L = -mc^2\sqrt{1 - v^2/c^2} = -mc^2/\gamma$ is therefore a function of the invariant $v^2/c^2$ (via $\gamma$) and the constant $c$, and is the same in both frames up to the choice of frame in which $v$ is defined. The physics — the action $S = \int L\,dt$, the equations of motion — are frame-independent because the quantity being integrated, $L$, is built solely from the invariant $v^2/c^2$ and the constant $c$. This is the content of the postulate of relativity, [[#ax-relativity]], for a free particle: the Lagrangian and hence the action are the same in both frames, even though $v$ and $v'$ are not.
:::
:::

::: exercise level=3
Prove that the Lorentz transformation is an isometry of the Minkowski metric $\eta = \mathrm{diag}(1, -1)$, i.e. that the matrix $\Lambda = \begin{pmatrix} \gamma & -\gamma\beta \\ -\gamma\beta & \gamma \end{pmatrix}$ acting on $(ct, x)^T$ satisfies $\Lambda^T \eta \Lambda = \eta$.
::: solution
Write $\eta = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ and $\Lambda = \gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix}$. Compute $\Lambda^T \eta \Lambda$:

$$
\Lambda^T \eta = \gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \gamma\begin{pmatrix} 1 & \beta \\ -\beta & -1 \end{pmatrix}.
$$

Then

$$
\Lambda^T \eta \Lambda = \gamma\begin{pmatrix} 1 & \beta \\ -\beta & -1 \end{pmatrix}\gamma\begin{pmatrix} 1 & -\beta \\ -\beta & 1 \end{pmatrix} = \gamma^2\begin{pmatrix} 1 - \beta^2 & -\beta + \beta \\ -\beta + \beta & \beta^2 - 1 \end{pmatrix} = \gamma^2\begin{pmatrix} 1 - \beta^2 & 0 \\ 0 & -(1 - \beta^2) \end{pmatrix}.
$$

Since $\gamma^2 = 1/(1 - \beta^2)$, the $\gamma^2(1 - \beta^2)$ factors are $1$, and

$$
\Lambda^T \eta \Lambda = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix} = \eta. \qquad\blacksquare
$$

This is the matrix statement of [[#cor-interval]]: the quadratic form $c^2 t^2 - x^2 = (ct)^2 - x^2$ is preserved by the linear map $\Lambda$, which is exactly the definition of an isometry of the Minkowski metric. The "circle" in this geometry is the hyperbola $c^2 t^2 - x^2 = \text{const}$, and the Lorentz transformation rotates between the hyperbolae without changing the value of the invariant.
:::
:::

::: exercise level=3
The two postulates are stated in one spatial dimension. Explain, in words and with one equation, why the extension to three spatial dimensions is not a new physical assumption: i.e. why the same single postulate (invariance of $c$) plus the same linearity reasoning gives the full Lorentz transformation with $\gamma = 1/\sqrt{1 - v^2/c^2}$, where $v = |\mathbf{v}|$ is the speed of the relative motion of the frames.
hint="The boost is in the direction of relative motion; decompose the transverse coordinates and show they are unchanged."
::: solution
Let $S'$ move at $\mathbf{v} = v\hat{x}$ relative to $S$. The linearity argument of [[#prop-linear]] applies in three dimensions: the transformation must be linear in $(x, y, z, t)$ with constant coefficients. The second postulate says the light front is a sphere in every frame: $x^2 + y^2 + z^2 - c^2 t^2 = 0$ in $S$ must map to $x'^2 + y'^2 + z'^2 - c^2 t'^2 = 0$ in $S'$. The transformation that mixes $x$ and $t$ (the boost direction) is the one derived above: $x' = \gamma(x - vt)$, $t' = \gamma(t - vx/c^2)$. The transverse coordinates $y, z$ must map to $y' = y$, $z' = z$ (the no-transverse-shear condition, which follows from the isotropy of space and the fact that a boost in the $x$ direction should not mix in $y$ or $z$; if it did, the light sphere would become an ellipsoid in $S'$, changing the speed of light in the transverse directions). The full transformation is then

$$
x' = \gamma(x - vt), \qquad t' = \gamma\left(t - \frac{v x}{c^2}\right), \qquad y' = y, \qquad z' = z,
$$

and the invariant is $c^2 t^2 - x^2 - y^2 - z^2$, preserved by construction: the transverse part $y^2 + z^2$ is unchanged, and the $x$–$t$ part is preserved as in [[#cor-interval]]. The single postulate (invariance of $c$) plus linearity and isotropy therefore determines the full three-dimensional Lorentz transformation with no additional physical input; the $\gamma$ factor is the same as in the one-dimensional case because the boost is in one direction and the transverse coordinates decouple.
:::
:::
