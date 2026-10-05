A stone thrown across a courtyard is not the one-dimensional motion of [[mechanics/motion-1d]]. Along a chosen straight line a single signed coordinate was enough. In a plane the stone has a horizontal position and a vertical position, and the two change for different reasons. If air resistance is left out, nothing horizontal pushes or drags the stone, so the horizontal velocity stays at whatever value the throw gave it. Vertically the stone is in free fall, with the same constant acceleration as an object dropped from rest. The curved path is not a third kind of motion. It is the curve those two motions trace when they run together.

Where does the stone land, how high does it rise, and how long is it in the air? A single expression for the range is earned only after those questions are component equations, and only when the landing height equals the launch height. From a cliff, or onto a slope, that expression is the wrong tool. The component equations, with the landing height the problem really has, are the right one.

Position, velocity and acceleration are vectors, differentiated component by component. A projectile is constant acceleration with a horizontal part of zero. Relative velocity is a subtraction. Uniform circular motion keeps a fixed distance from a centre, so the speed can be constant while the velocity is not, and the acceleration points towards the centre. None of this names the force. That is [[mechanics/newton-laws]].

Throughout, take $g = 9.80\,\mathrm{m/s^{2}}$ unless a problem says otherwise, take $y$ positive upward, and neglect air resistance except where a remark says that the neglect is the point. Angles that appear inside a derivative, such as the product $\omega t$, are in radians. A launch angle given in degrees is left in degrees inside $\sin$ and $\cos$; it is converted to radians only when it is used as a pure number in $\omega t$.

## Position, velocity and acceleration

Choose an origin and two fixed perpendicular axes in the plane, with unit vectors $\mathbf{i}$ and $\mathbf{j}$. A particle's **position** at time $t$ is the vector from the origin to the particle,

$$
\mathbf{r}(t) = x(t)\,\mathbf{i} + y(t)\,\mathbf{j}.
$$

The coordinates $x(t)$ and $y(t)$ are ordinary functions of time, and everything later in the chapter is obtained from them by differentiation. The origin is a choice. The derivatives do not depend on where it was placed; the coordinates themselves do.

::: definition Position, velocity and acceleration {#def-pva}
The **velocity** and the **acceleration** are the derivatives

$$
\mathbf{v} = \deriv{\mathbf{r}}{t} = \deriv{x}{t}\,\mathbf{i} + \deriv{y}{t}\,\mathbf{j}, \qquad \mathbf{a} = \deriv{\mathbf{v}}{t} = \deriv{v_x}{t}\,\mathbf{i} + \deriv{v_y}{t}\,\mathbf{j}.
$$ {#eq-velocity}

Equivalently, $\mathbf{v}$ is the limit of the average velocity over a vanishing interval,

$$
\mathbf{v}(t) = \lim_{\Delta t \to 0} \frac{\mathbf{r}(t+\Delta t) - \mathbf{r}(t)}{\Delta t},
$$

and $\mathbf{a}$ is the same construction applied to $\mathbf{v}$. The **speed** is the magnitude $\abs{\mathbf{v}}$, a scalar. The velocity is the vector.
:::

The limit is the definition used on a line in [[mechanics/motion-1d]], applied to $\mathbf{r}$. Differentiation in fixed axes acts component by component, so a calculation in the plane is two one-dimensional calculations recombined at the end. The speed is not $v_x + v_y$, and the direction of $\mathbf{v}$ need not be the direction of $\mathbf{r}$.

Two consequences are used constantly. The velocity is tangent to the path, because over a short interval $\Delta\mathbf{r}$ lies along the path. And $\mathbf{a} = \mathbf{0}$ means that each component of $\mathbf{v}$ is constant, so the particle moves in a straight line at constant speed. A constant speed by itself does not imply $\mathbf{a} = \mathbf{0}$: the direction of $\mathbf{v}$ may still be changing. Circular motion, later in the chapter, is the standard example.

::: proposition Component motions {#prop-components}
Let $\mathbf{a} = a_x\,\mathbf{i} + a_y\,\mathbf{j}$ be constant. Then

$$
\mathbf{v}(t) = \mathbf{v}_0 + \mathbf{a}\, t, \qquad \mathbf{r}(t) = \mathbf{r}_0 + \mathbf{v}_0\, t + \tfrac{1}{2}\mathbf{a}\, t^{2},
$$ {#eq-const-a}

where $\mathbf{r}_0 = \mathbf{r}(0)$ and $\mathbf{v}_0 = \mathbf{v}(0)$. Each coordinate is an independent one-dimensional motion with constant acceleration. More generally, even if the acceleration is not constant, the coordinate $x$ may be solved on its own whenever $a_x$ depends only on $t$, $x$ and $v_x$, and likewise for $y$.
:::

::: proof
Write $\mathbf{a} = \deriv{\mathbf{v}}{t}$. If $\mathbf{a}$ is constant, integrating from $0$ to $t$ gives $\mathbf{v}(t) - \mathbf{v}_0 = \mathbf{a}\, t$. A second integration uses $v_x = \deriv{x}{t}$:

$$
x(t) - x(0) = \int_0^t \bigl(v_{x0} + a_x t'\bigr)\,\dd t' = v_{x0}\, t + \tfrac{1}{2} a_x t^{2},
$$

and the same calculation in $y$. Adding the two components is [[#eq-const-a]]. Nothing in the $x$ integration refers to $y$ or to $v_y$, so the horizontal motion can be finished before the vertical motion is begun. The same separation holds without constant acceleration whenever the differential equation for $x$ does not contain $y$ or $v_y$, and conversely: each equation is then a closed one-dimensional problem, with its own initial conditions.
:::

The separation is a hypothesis, not a law of nature. Air resistance of the usual kind depends on the speed $\sqrt{v_x^{2} + v_y^{2}}$, so the drag in the $x$ equation depends on $v_y$ and [[#eq-const-a]] ceases to be the motion. Projectiles without air resistance are the first application because there the separation really does hold.

::: example Reading a position function {#ex-position}
A particle moves in the plane with position, in metres when $t$ is in seconds,

$$
\mathbf{r}(t) = \bigl(0.500\, t^{3}\bigr)\,\mathbf{i} + \bigl(2.00\, t\bigr)\,\mathbf{j}.
$$

Find the velocity and acceleration at a general time, and the position, velocity, speed and acceleration at $t = 2.00\,\mathrm{s}$.
::: solution
Differentiate component by component, using [[#def-pva]]. The derivative of $0.500\, t^{3}$ is $1.50\, t^{2}$, and the derivative of $2.00\, t$ is $2.00$, so

$$
\mathbf{v}(t) = \bigl(1.50\, t^{2}\bigr)\,\mathbf{i} + 2.00\,\mathbf{j}, \qquad \mathbf{a}(t) = \bigl(3.00\, t\bigr)\,\mathbf{i}.
$$

The $y$ acceleration is zero: the vertical motion is uniform, at $2.00\,\mathrm{m/s}$, for the whole of the motion. The horizontal acceleration grows in proportion to $t$. The two components do not interfere, which is the separation in [[#prop-components]] in a case where $\mathbf{a}$ is not constant.

At $t = 2.00\,\mathrm{s}$,

$$
\begin{aligned}
\mathbf{r} &= \bigl(0.500 \times 8.00\bigr)\,\mathbf{i} + \bigl(2.00 \times 2.00\bigr)\,\mathbf{j} = 4.00\,\mathbf{i} + 4.00\,\mathbf{j}\ \mathrm{m}, \\
\mathbf{v} &= \bigl(1.50 \times 4.00\bigr)\,\mathbf{i} + 2.00\,\mathbf{j} = 6.00\,\mathbf{i} + 2.00\,\mathbf{j}\ \mathrm{m/s}, \\
\mathbf{a} &= \bigl(3.00 \times 2.00\bigr)\,\mathbf{i} = 6.00\,\mathbf{i}\ \mathrm{m/s^{2}}.
\end{aligned}
$$

The speed is the magnitude of the velocity, not the sum of the components:

$$
\abs{\mathbf{v}} = \sqrt{6.00^{2} + 2.00^{2}} = \sqrt{40.0} = 6.325\,\mathrm{m/s}.
$$

The velocity points $\arctan(2.00/6.00) = 18.43^{\circ}$ above the $x$ axis, while the position lies at $45^{\circ}$. The two vectors need not be parallel.
:::
:::

::: intuition Two clocks, one path
Picture the coordinates as two clocks started by the same initial conditions. The $x$ clock does not look at the $y$ clock. At each time you read both and plot the point $(x, y)$. The path can bend, loop or reverse even though each clock, taken alone, is an ordinary one-dimensional motion. Conversely, a complicated path does not mean that the component equations are complicated. It may only mean that the two simple motions are being read together.
:::

## Projectile motion

A **projectile** here means a particle launched with speed $v$ at an angle $\theta$ above the horizontal, and thereafter accelerated only by gravity. Place the launch at the origin, take $y$ positive upward, and neglect air resistance. Then $a_x = 0$ and $a_y = -g$, both constant, so [[#prop-components]] applies with $\mathbf{v}_0 = (v\cos\theta)\,\mathbf{i} + (v\sin\theta)\,\mathbf{j}$.

::: theorem Level-ground projectile {#thm-projectile}
Under those conditions the components are

$$
x(t) = (v\cos\theta)\, t, \qquad y(t) = (v\sin\theta)\, t - \tfrac{1}{2} g t^{2}.
$$ {#eq-xy}

While the projectile is in the air, and provided $\cos\theta \neq 0$, the path is the parabola

$$
y = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$ {#eq-traj}

The greatest height above the launch point is

$$
H = \frac{(v\sin\theta)^{2}}{2g},
$$ {#eq-height}

reached at time $t_H = (v\sin\theta)/g$, provided $\sin\theta > 0$. If in addition the projectile returns to the height from which it was launched — the landing height equals the launch height — then the **time of flight** and the **range** are

$$
T = \frac{2 v\sin\theta}{g}, \qquad R = \frac{v^{2}\sin 2\theta}{g}.
$$ {#eq-range}
:::

::: proof
Integrate $a_x = 0$ and $a_y = -g$ from the initial velocity, as in [[#prop-components]]. The horizontal velocity never changes, so $x = (v\cos\theta)\, t$. The vertical velocity is $v_y = v\sin\theta - g t$, and a further integration from $y(0) = 0$ gives the second half of [[#eq-xy]].

The vertical velocity is zero at the top, so $t_H = (v\sin\theta)/g$. Substitute into $y(t)$:

$$
H = (v\sin\theta)\cdot\frac{v\sin\theta}{g} - \tfrac{1}{2} g\left(\frac{v\sin\theta}{g}\right)^{2} = \frac{v^{2}\sin^{2}\theta}{g} - \frac{v^{2}\sin^{2}\theta}{2g} = \frac{(v\sin\theta)^{2}}{2g}.
$$

This step uses only $v_y = 0$. It does not require the projectile to come back down to $y = 0$, so [[#eq-height]] is the height above the launch on a cliff as well as on level ground.

To remove $t$ from [[#eq-xy]], solve the horizontal equation for the time, $t = x/(v\cos\theta)$, which needs $\cos\theta \neq 0$. A vertical launch is a line, not the graph of a function $y(x)$. Substitute:

$$
y = (v\sin\theta)\cdot\frac{x}{v\cos\theta} - \tfrac{1}{2} g\frac{x^{2}}{v^{2}\cos^{2}\theta} = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

That is [[#eq-traj]]. The path is a quadratic polynomial in $x$, hence a parabola, for as long as the constant-acceleration model holds.

Now impose the level-ground condition $y(T) = 0$, with $T > 0$. From [[#eq-xy]],

$$
0 = T\left(v\sin\theta - \tfrac{1}{2} g T\right),
$$

so $T = 2 v\sin\theta / g$. The factor $T = 0$ is the launch itself. The range is the horizontal position at this later root:

$$
R = x(T) = (v\cos\theta)\cdot\frac{2 v\sin\theta}{g} = \frac{v^{2}\,(2\sin\theta\cos\theta)}{g} = \frac{v^{2}\sin 2\theta}{g},
$$

where the last step is the double-angle identity. The identity is the only reason the angle appears as $2\theta$ rather than as a product $\sin\theta\cos\theta$.
:::

::: corollary Greatest range, and complementary angles {#cor-range}
On level ground, with $v$ and $g$ fixed and $0 < \theta < 90^{\circ}$, the range $R(\theta) = (v^{2}/g)\sin 2\theta$ is greatest at $\theta = 45^{\circ}$, where

$$
R_{\max} = \frac{v^{2}}{g}.
$$

The angles $\theta$ and $90^{\circ} - \theta$ give the same range. They do not give the same height or the same time of flight.
:::

::: proof
For $\theta$ between $0$ and $90^{\circ}$ the double angle $2\theta$ lies between $0$ and $180^{\circ}$, where $\sin 2\theta \le 1$, with equality only at $2\theta = 90^{\circ}$, that is at $\theta = 45^{\circ}$. Therefore $R \le v^{2}/g$, with equality only at $45^{\circ}$.

For the second statement, replace $\theta$ by $90^{\circ} - \theta$. Then $2(90^{\circ} - \theta) = 180^{\circ} - 2\theta$, and $\sin(180^{\circ} - 2\theta) = \sin 2\theta$, so $R$ is unchanged. The height [[#eq-height]] depends on $\sin^{2}\theta$, and $\sin(90^{\circ} - \theta) = \cos\theta$, so the two heights agree only when $\sin\theta = \cos\theta$, that is at $45^{\circ}$ itself. The times of flight are in the ratio of the sines, and likewise agree only at $45^{\circ}$.
:::

On level ground the upward and downward trips take the same time $T/2$, because $v_y$ changes at a constant rate from $+v\sin\theta$ to $-v\sin\theta$. Since $v_x$ is constant, the apex is halfway along the range. That symmetry belongs to a flight that starts and ends at the same height; the cliff example below does not have it. As a dimensional check, $v^{2}/g$ is a length and $v/g$ is a time, which is what [[#eq-range]] and [[#eq-height]] require.

::: widget projectile
v: 20
angle: 30
g: 9.8
caption: Vary the launch angle and compare 30° with 60°. The ranges match on level ground, while the steeper trajectory climbs higher. Notice that the range is greatest near 45°.
:::

::: example Level ground at thirty and at sixty degrees {#ex-level}
A projectile is launched at $20.0\,\mathrm{m/s}$ from level ground. Take $g = 9.80\,\mathrm{m/s^{2}}$ and neglect air resistance. Find the time of flight, the range and the greatest height for $\theta = 30^{\circ}$, and again for $\theta = 60^{\circ}$.
::: solution
The landing height equals the launch height, so [[#thm-projectile]] applies. For $\theta = 30^{\circ}$ one has $\sin 30^{\circ} = 1/2$ and $\sin 60^{\circ} = \sqrt{3}/2$, and the double angle in the range is $60^{\circ}$.

$$
\begin{aligned}
T &= \frac{2 \times 20.0 \times \sin 30^{\circ}}{9.80} = \frac{20.0}{9.80} = 2.041\,\mathrm{s}, \\
R &= \frac{20.0^{2} \times \sin 60^{\circ}}{9.80} = \frac{400 \times \sin 60^{\circ}}{9.80} = 35.35\,\mathrm{m}, \\
H &= \frac{(20.0 \times \sin 30^{\circ})^{2}}{2 \times 9.80} = \frac{10.0^{2}}{19.60} = 5.102\,\mathrm{m}.
\end{aligned}
$$

The horizontal velocity is constant at $20.0 \times \cos 30^{\circ} = 17.32\,\mathrm{m/s}$. At the apex the vertical component is zero, so the speed is $17.32\,\mathrm{m/s}$, not zero: only one component has vanished. The apex is at $x = R/2 = 17.67\,\mathrm{m}$, halfway along the range, at time $T/2 = 1.020\,\mathrm{s}$.

For $\theta = 60^{\circ}$ the double angle is $120^{\circ}$, and $\sin 120^{\circ} = \sin 60^{\circ}$. The range is therefore the same $35.35\,\mathrm{m}$, as [[#cor-range]] requires. The vertical launch speed is $20.0 \times \sin 60^{\circ} = 17.32\,\mathrm{m/s}$, and

$$
H = \frac{17.32^{2}}{19.60} = 15.31\,\mathrm{m}, \qquad T = \frac{2 \times 17.32}{9.80} = 3.535\,\mathrm{s}.
$$

The unrounded height is $(10.0\sqrt{3})^{2}/19.60 = 300/19.60$, which is $15.31\,\mathrm{m}$ to four figures. The height is three times the $30^{\circ}$ value, because $H$ depends on $\sin^{2}\theta$ and $\sin 60^{\circ}/\sin 30^{\circ} = \sqrt{3}$. The time of flight is larger by $\sqrt{3}$, not by $3$. The speed at the apex is $20.0\times\cos 60^{\circ} = 10.0\,\mathrm{m/s}$, against $17.32\,\mathrm{m/s}$ for the shallower throw: the same range is travelled more slowly, and therefore takes longer.
:::
:::

The widget uses $g = 9.8\,\mathrm{m/s^{2}}$, the same value as $9.80$ to the precision of that display. Reading a range off the figure should agree with [[#eq-range]] for a level landing. It will not agree with a landing below the launch, because the figure, like the formula, brings the projectile back to the launch height.

::: example A throw from a cliff {#ex-cliff}
A stone is thrown from the edge of a cliff at $15.0\,\mathrm{m/s}$ and $40^{\circ}$ above the horizontal. The ground below is $20.0\,\mathrm{m}$ beneath the launch. Take $g = 9.80\,\mathrm{m/s^{2}}$ and neglect air resistance. Find the time of flight and the horizontal distance from the edge to the landing point.
::: solution
The landing height does not equal the launch height, so the range formula in [[#eq-range]] is not available. Keep [[#eq-xy]], and set $y = -20.0\,\mathrm{m}$ rather than $y = 0$. With $\sin 40^{\circ} = 0.6428$ and $\cos 40^{\circ} = 0.7660$,

$$
v_{x} = 15.0 \times 0.7660 = 11.49\,\mathrm{m/s}, \qquad v_{y0} = 15.0 \times 0.6428 = 9.642\,\mathrm{m/s}.
$$

The vertical equation becomes $-20.0 = 9.642\, t - \tfrac{1}{2}(9.80)\, t^{2}$, which rearranges to the quadratic

$$
4.90\, t^{2} - 9.642\, t - 20.0 = 0.
$$

The positive root is required. Completing the quadratic formula, or using the equivalent closed form $t = \bigl[v_{y0} + \sqrt{v_{y0}^{2} + 2 g h}\bigr]/g$ with $h = 20.0\,\mathrm{m}$,

$$
\sqrt{9.642^{2} + 2 \times 9.80 \times 20.0} = \sqrt{92.97 + 392.0} = \sqrt{484.97} = 22.02,
$$

$$
t = \frac{9.642 + 22.02}{9.80} = \frac{31.66}{9.80} = 3.231\,\mathrm{s}.
$$

The negative root of the quadratic corresponds to a time before the launch on the mathematical parabola, and it is discarded. The horizontal velocity is constant, so the landing is at

$$
x = 11.49 \times 3.231 = 37.13\,\mathrm{m}
$$

from the edge. Had one wrongly used $R = v^{2}\sin 2\theta / g$ with $2\theta = 80^{\circ}$, the result would have been $22.61\,\mathrm{m}$, short of the true landing by more than a third. The formula is not a rough approximation here. It answers a different question, namely where the stone would land if the cliff were not there and the ground were at the launch height.

The greatest height above the launch is still [[#eq-height]], because that result never used the landing condition: $H = 9.642^{2}/19.60 = 4.743\,\mathrm{m}$, at time $9.642/9.80 = 0.984\,\mathrm{s}$ and at horizontal position $11.31\,\mathrm{m}$. That is far short of halfway to the landing at $37.13\,\mathrm{m}$. The symmetry about the apex belonged to level ground.

At impact, $v_y = 9.642 - 9.80 \times 3.231 = -22.02\,\mathrm{m/s}$, while $v_x$ is still $11.49\,\mathrm{m/s}$. The impact speed is $\sqrt{11.49^{2} + 22.02^{2}} = 24.84\,\mathrm{m/s}$, larger than the launch speed because the stone is $20.0\,\mathrm{m}$ lower and the downward component has grown. No energy argument was required; the components are enough.
:::
:::

::: warning Where the range formula does not apply
The expression $R = v^{2}\sin 2\theta / g$ needs two restrictions: no air resistance, and a landing height equal to the launch height. Either one failing makes the expression false. With air resistance, $a_x$ is not zero and the components couple through the speed. With a lower landing, as in [[#ex-cliff]], the flight time is the positive root of a quadratic, and the level-ground range can be wrong by a large fraction. The height [[#eq-height]] is wider: it is the greatest height above the launch whenever $a_y = -g$ and the projectile does rise.
:::

::: history Two motions, compounded
In *Two New Sciences* (1638) Galileo argued that a projectile, neglecting air resistance, follows a parabola, because the horizontal motion is uniform and the vertical motion is the same uniformly accelerated motion as free fall. He treated air resistance as a separate effect that pulls a real trajectory off that curve. The argument is kinematic. The force law behind $a_x = 0$ and $a_y = -g$ is Newton's, half a century later; what [[#thm-projectile]] still uses is Galileo's separation of the two motions.
:::

::: quiz
A projectile is launched on level ground, and air resistance is neglected. Which statement is true?
- [ ] The speed is constant, because the acceleration is constant.
- [ ] The range is greatest at $60^{\circ}$, because that flight lasts longer than the flight at $45^{\circ}$.
- [x] The horizontal velocity is constant, and the ranges at $30^{\circ}$ and at $60^{\circ}$ are equal.
- [ ] The formula $R = v^{2}\sin 2\theta / g$ holds for a landing far below the launch.
::: solution
Constant acceleration changes the velocity, so the speed is not constant: in [[#ex-level]] it falls from $20.0\,\mathrm{m/s}$ to $17.32\,\mathrm{m/s}$ at the apex. [[#cor-range]] puts the greatest range at $45^{\circ}$ and makes the $30^{\circ}$ and $60^{\circ}$ ranges equal. The range formula needs a landing at the launch height, which is why the last statement fails, as [[#ex-cliff]] shows. The horizontal velocity is constant because $a_x = 0$.
:::
:::

::: application A package released from an aircraft
An aircraft in level flight at $60.0\,\mathrm{m/s}$ releases a package from a height of $44.1\,\mathrm{m}$. In the ground frame the package inherits the aircraft's horizontal velocity and has zero initial vertical velocity: a projectile with $\theta = 0$. Vertically, $4.90\, t^{2} = 44.1$, so $t = 3.00\,\mathrm{s}$. Horizontally it travels $60.0\times 3.00 = 180\,\mathrm{m}$. The level-ground range formula does not apply, because the package never returns to the release height. The same release, watched from the aircraft, starts from rest; the two descriptions differ by the relative velocity of the frames.
:::

## Relative velocity

A position only means something once a frame has been named. If two frames are in use — the ground, and the water of a river, or the ground and a moving boat — the velocities measured in those frames differ by the relative velocity of the frames. Let $\mathbf{r}_A$ and $\mathbf{r}_B$ be positions in one inertial frame, and write $\mathbf{r}_A = \mathbf{r}_B + \mathbf{r}_{A/B}$, where $\mathbf{r}_{A/B}$ is the position of $A$ relative to $B$.

::: proposition Relative velocity {#prop-relative}
Differentiating $\mathbf{r}_A = \mathbf{r}_B + \mathbf{r}_{A/B}$ with respect to time gives

$$
\mathbf{v}_A = \mathbf{v}_B + \mathbf{v}_{A/B}, \qquad \mathbf{v}_{A/B} = \mathbf{v}_A - \mathbf{v}_B.
$$ {#eq-relative}

The velocity of $A$ relative to $B$ is the velocity of $A$ minus the velocity of $B$, both taken in the same frame. Subtraction reverses when the labels are swapped: $\mathbf{v}_{B/A} = -\mathbf{v}_{A/B}$.
:::

::: proof
Both positions are vectors in one frame, so they may be differentiated in that frame. The derivative of a sum is the sum of the derivatives:

$$
\deriv{\mathbf{r}_A}{t} = \deriv{\mathbf{r}_B}{t} + \deriv{\mathbf{r}_{A/B}}{t}.
$$

The first two derivatives are $\mathbf{v}_A$ and $\mathbf{v}_B$. Define $\mathbf{v}_{A/B} = \deriv{\mathbf{r}_{A/B}}{t}$. Rearrangement is [[#eq-relative]]. Swapping the labels $A$ and $B$ changes the sign of the difference, so $\mathbf{v}_{B/A} = -\mathbf{v}_{A/B}$. The argument uses only the classical addition of displacements in one frame. It does not require either particle to be moving at constant velocity.
:::

The proposition is classical kinematics: one time for both frames, and vector addition of velocities. It does not say which frame is inertial, and it is not the relativistic rule. The practical content is a discipline of labels. "The speed of the boat" is incomplete when the water is moving. The speed relative to the water and the speed relative to the ground are different numbers, and a crossing time uses one of them, not a mixture.

::: example Crossing a river {#ex-river}
A river is $80.0\,\mathrm{m}$ wide and flows downstream at $2.00\,\mathrm{m/s}$. A boat's speed relative to the water is under the helmsman's control. Take the $x$ axis straight across the river and the $y$ axis downstream.

(a) The boat points straight across, and its speed relative to the water is $1.50\,\mathrm{m/s}$. Find the time to reach the far bank, the downstream drift, and the speed relative to the ground.

(b) The boat's speed relative to the water is instead $2.50\,\mathrm{m/s}$, and the helmsman aims upstream of the straight-across line so as to land directly opposite the starting point. Find the aiming angle and the time to cross.
::: solution
(a) The velocity of the boat relative to the water is $1.50\,\mathbf{i}\,\mathrm{m/s}$, and the velocity of the water relative to the ground is $2.00\,\mathbf{j}\,\mathrm{m/s}$. By [[#prop-relative]] the ground velocity is the sum,

$$
\mathbf{v}_{\text{ground}} = 1.50\,\mathbf{i} + 2.00\,\mathbf{j}\ \mathrm{m/s}.
$$

Only the $x$ component carries the boat towards the far bank. The crossing time is the width divided by that component,

$$
t = \frac{80.0}{1.50} = 53.3\,\mathrm{s}.
$$

During that time the downstream velocity is a constant $2.00\,\mathrm{m/s}$, so the drift is

$$
y = 2.00 \times \frac{80.0}{1.50} = 107\,\mathrm{m}.
$$

That quotient is $320/3 = 106.7\,\mathrm{m}$ before it is rounded to three figures as $107\,\mathrm{m}$. The ground speed is the magnitude

$$
\sqrt{1.50^{2} + 2.00^{2}} = \sqrt{2.25 + 4.00} = \sqrt{6.25} = 2.50\,\mathrm{m/s}.
$$

The boat does not move straight across the river. Its track on the ground is a straight line at an angle $\arctan(2.00/1.50)$ downstream of the straight-across direction, because both components are constant.

(b) Let $\varphi$ be the angle upstream from the straight-across line. The velocity relative to the water is then $(2.50\cos\varphi)\,\mathbf{i} - (2.50\sin\varphi)\,\mathbf{j}$, and the ground velocity has $y$ component $-2.50\sin\varphi + 2.00$. Landing opposite the start means that this component vanishes:

$$
\sin\varphi = \frac{2.00}{2.50} = 0.800, \qquad \varphi = 53.1^{\circ}.
$$

Then $\cos\varphi = 0.600$, since $0.600^{2} + 0.800^{2} = 1$, and the across-component is $2.50\times 0.600 = 1.50\,\mathrm{m/s}$. The crossing time is $80.0/1.50 = 53.3\,\mathrm{s}$, with no drift. The match with the time in (a) is an accident of these numbers: the speeds through the water are different, $1.50\,\mathrm{m/s}$ and $2.50\,\mathrm{m/s}$. In general, aiming upstream spends part of the boat's speed cancelling the current, and the crossing takes longer than an across-aimed crossing at the same speed through the water.
:::
:::

The same subtraction compares any two velocities. When both are constant, the closest approach occurs when the relative position is perpendicular to $\mathbf{v}_A - \mathbf{v}_B$. An exercise below uses that condition.

## Uniform circular motion

A particle in **uniform circular motion** moves on a circle of fixed radius $R$ at constant speed $v$. The velocity is not constant. It turns so as to stay tangent to the circle, and a turning velocity is an acceleration even though the speed does not change. Let the centre of the circle be the origin, and write the position as a function of time with constant angular speed $\omega$:

$$
\mathbf{r}(t) = (R\cos\omega t)\,\mathbf{i} + (R\sin\omega t)\,\mathbf{j}.
$$

At $t = 0$ the particle is at $(R, 0)$. As $t$ increases it moves anticlockwise. One revolution brings $\omega t$ from $0$ to $2\pi$, so the period is $T = 2\pi/\omega$ and the ordinary frequency is $f = 1/T = \omega/(2\pi)$. The angular speed and the linear speed are related by $v = \omega R$: in one period the particle travels the circumference $2\pi R$, so $v = 2\pi R/T = \omega R$.

::: proposition Centripetal acceleration {#prop-ucm}
For the motion $\mathbf{r}(t) = (R\cos\omega t)\,\mathbf{i} + (R\sin\omega t)\,\mathbf{j}$ with $R$ and $\omega$ constant, the velocity is perpendicular to the position vector, and the acceleration is

$$
\mathbf{a} = -\omega^{2}\,\mathbf{r}.
$$ {#eq-centrip}

Hence $\mathbf{a}$ points from the particle towards the centre, and its magnitude is

$$
\abs{\mathbf{a}} = \omega^{2} R = \frac{v^{2}}{R},
$$

where $v = \omega R$ is the constant speed. This is a statement about the motion, not about the force. The force that must be acting to produce $\mathbf{a}$ is identified in [[mechanics/newton-laws]].
:::

::: proof
Differentiate the components. The derivative of $\cos\omega t$ is $-\omega\sin\omega t$, and the derivative of $\sin\omega t$ is $\omega\cos\omega t$, so

$$
\mathbf{v} = \deriv{\mathbf{r}}{t} = (-R\omega\sin\omega t)\,\mathbf{i} + (R\omega\cos\omega t)\,\mathbf{j}.
$$

The scalar product with the position is

$$
\mathbf{r}\cdot\mathbf{v} = R\cos\omega t\cdot(-R\omega\sin\omega t) + R\sin\omega t\cdot(R\omega\cos\omega t) = 0,
$$

so $\mathbf{v}$ is perpendicular to $\mathbf{r}$. Its magnitude is $R\omega\sqrt{\sin^{2}\omega t + \cos^{2}\omega t} = R\omega$, which is the constant speed $v$.

Differentiate again:

$$
\mathbf{a} = \deriv{\mathbf{v}}{t} = (-R\omega^{2}\cos\omega t)\,\mathbf{i} + (-R\omega^{2}\sin\omega t)\,\mathbf{j} = -\omega^{2}\,\mathbf{r}.
$$

The vector $-\mathbf{r}$ points from the particle back to the origin, which is the centre. The magnitude is $\omega^{2} R$. Substituting $\omega = v/R$ converts that magnitude into $v^{2}/R$. Both expressions will be needed: $\omega^{2} R$ when the motion is given as a number of revolutions per second, and $v^{2}/R$ when the speed and the radius are the data.
:::

::: remark If the angular speed is not constant
The proposition assumes constant $\omega$. If $\omega = \omega(t)$ on the same circle, differentiation leaves the inward term $-\omega^{2}\,\mathbf{r}$ and adds a tangential term of magnitude $R\abs{\alpha}$, with $\alpha = \deriv{\omega}{t}$. Uniform circular motion is $\alpha = 0$. The tangential piece is taken up in [[mechanics/rotation]].
:::

::: remark Radians in the derivative
The step from $\cos\omega t$ to $-\omega\sin\omega t$ is the chain rule in radians. If a frequency is given in revolutions per second, multiply by $2\pi$ before calling the result $\omega$ inside these derivatives. Inserting a frequency in revolutions, or an angle in degrees, as though it were $\omega$ in radians, produces an acceleration wrong by powers of $2\pi$ or of $\pi/180$.
:::

::: intuition The velocity arrow turns
Think of $\mathbf{v}$ as an arrow of fixed length $v$, always tangent to the circle. In a short time $\Delta t$ the radius turns through $\Delta\theta = \omega\,\Delta t$, and the velocity arrow turns through the same angle. The tip of that arrow moves a distance $v\,\Delta\theta$, so $\abs{\Delta\mathbf{v}}/\Delta t$ has magnitude $v\omega$. With $v = \omega R$ this is $\omega^{2} R = v^{2}/R$. At $(R, 0)$, with $\mathbf{v}$ along $+\mathbf{j}$, a small anticlockwise turn gives $\mathbf{v}$ a component along $-\mathbf{i}$, towards the centre. The calculus proves [[#eq-centrip]]; the turning arrow shows why a constant speed can still have an inward acceleration.
:::

::: example Two revolutions per second {#ex-disc}
A point on a rotating disc moves in a circle of radius $0.800\,\mathrm{m}$ and makes $2.00$ revolutions per second, at constant angular speed. Find the angular speed, the period, the linear speed and the magnitude of the acceleration.
::: solution
The frequency is $f = 2.00\,\mathrm{s^{-1}}$, so the period is $T = 1/f = 0.500\,\mathrm{s}$. The angular speed in radians per second is

$$
\omega = 2\pi f = 4\pi = 12.57\,\mathrm{rad/s}.
$$

The same period from $T = 2\pi/\omega$ is $2\pi/(4\pi) = 0.500\,\mathrm{s}$, which checks the conversion from revolutions to radians. The linear speed is

$$
v = \omega R = 4\pi \times 0.800 = 10.05\,\mathrm{m/s}.
$$

The acceleration has magnitude

$$
\abs{\mathbf{a}} = \omega^{2} R = (4\pi)^{2} \times 0.800 = 12.8\,\pi^{2} = 126.3\,\mathrm{m/s^{2}},
$$

directed from the point towards the centre. The square $\omega^{2} = (4\pi)^{2} = 157.9\,\mathrm{s^{-2}}$ is not the acceleration: multiply by the radius. The value $126.3\,\mathrm{m/s^{2}}$ is about thirteen times $g$. Which force produces it — tension, friction or a normal force — is a question for [[mechanics/newton-laws]]. The kinematics stops at $\mathbf{a}$.
:::
:::

## Where this leads

The constant-acceleration formulae of [[mechanics/motion-1d]] are the component equations of this chapter. Keeping the components separate, and refusing a range formula when the landing height is not the launch height, is the whole of the projectile analysis. Relative velocity is the same derivative, applied to a difference of positions.

The chapter does not explain why $a_y = -g$, or which force sustains circular motion. [[mechanics/newton-laws]] identifies the inward acceleration with a net force $m v^{2}/R$, and identifies the weight $mg$ as the force that produces $a_y = -g$ near the Earth. [[mechanics/gravitation]] replaces that constant $g$ by an inverse-square acceleration, and the parabola of [[#eq-traj]] becomes a conic. The same circular kinematics is the reference circle for simple harmonic motion in [[oscillations]]: the coordinate of uniform circular motion is $R\cos\omega t$.

::: summary
- Position, velocity and acceleration are vectors related by $\mathbf{v} = \deriv{\mathbf{r}}{t}$ and $\mathbf{a} = \deriv{\mathbf{v}}{t}$, taken component by component in fixed axes.
- If $a_x$ does not depend on the $y$ motion and $a_y$ does not depend on the $x$ motion, the two components may be solved separately and then recombined. Constant acceleration is the main case, and it integrates to $\mathbf{r} = \mathbf{r}_0 + \mathbf{v}_0 t + \tfrac{1}{2}\mathbf{a}\, t^{2}$.
- For a projectile with no air resistance, $a_x = 0$ and $a_y = -g$. The path is the parabola [[#eq-traj]].
- The greatest height above the launch is $H = (v\sin\theta)^{2}/(2g)$. The time of flight $T = 2 v\sin\theta / g$ and the range $R = v^{2}\sin 2\theta / g$ need a further hypothesis: the landing height equals the launch height.
- On level ground the greatest range is $v^{2}/g$, at $45^{\circ}$. Complementary angles $\theta$ and $90^{\circ} - \theta$ share a range and not a height. Neither statement survives air resistance, or a landing at a different height.
- The velocity of $A$ relative to $B$ is $\mathbf{v}_A - \mathbf{v}_B$. A crossing aimed straight across a current drifts downstream; a crossing with no drift aims upstream so that the relative-to-water velocity cancels the current.
- In uniform circular motion, $\mathbf{a} = -\omega^{2}\,\mathbf{r}$: the acceleration has magnitude $v^{2}/R = \omega^{2} R$ and points towards the centre, even though the speed is constant. The force that produces it is not part of the kinematics.
:::

## Exercises

::: exercise Speed from the components {#exr-speed level=1 check="10"}
At a certain instant the velocity of a particle is $8.00\,\mathbf{i} - 6.00\,\mathbf{j}$, in metres per second. Find the speed, in metres per second.
::: solution
The speed is the magnitude of the velocity. The components are perpendicular, so

$$
\abs{\mathbf{v}} = \sqrt{8.00^{2} + (-6.00)^{2}} = \sqrt{64.0 + 36.0} = \sqrt{100} = 10.0.
$$

The result is Pythagoras's theorem in the velocity plane. The negative sign on the $y$ component affects the direction, which is below the positive $x$ axis, and it does not affect the speed. The answer is $10.0\,\mathrm{m/s}$.
:::
:::

::: exercise Time of flight on level ground {#exr-flight level=1 check="1"}
A particle is launched at $9.80\,\mathrm{m/s}$ at $30^{\circ}$ above the horizontal, from level ground, and returns to the same height. Take $g = 9.80\,\mathrm{m/s^{2}}$ and neglect air resistance. Find the time of flight, in seconds.
::: solution
The landing height equals the launch height, so the time of flight is [[#eq-range]],

$$
T = \frac{2 \times 9.80 \times \sin 30^{\circ}}{9.80} = 2 \times \tfrac{1}{2} = 1.00\,\mathrm{s}.
$$

The launch speed was chosen equal to the numerical value of $g$, and $\sin 30^{\circ} = 1/2$, so the factors cancel. The same cancellation does not give the range: $R = v^{2}\sin 60^{\circ}/g$ still has to be evaluated, and it was not asked for. The answer is $1.00\,\mathrm{s}$.
:::
:::

::: exercise Acceleration on a circle {#exr-circle level=1 check="50"}
A particle moves at a constant speed of $10.0\,\mathrm{m/s}$ around a circle of radius $2.00\,\mathrm{m}$. Find the magnitude of its acceleration, in $\mathrm{m/s^{2}}$.
::: solution
Uniform circular motion has inward acceleration of magnitude $v^{2}/R$, by [[#prop-ucm]]. The speed is constant and the radius is constant, so

$$
\abs{\mathbf{a}} = \frac{v^{2}}{R} = \frac{10.0^{2}}{2.00} = \frac{100}{2.00} = 50.0\,\mathrm{m/s^{2}}.
$$

The direction is towards the centre. The magnitude is the whole of what was asked. The acceleration is not zero: the velocity is changing direction. The answer is $50.0\,\mathrm{m/s^{2}}$.
:::
:::

::: exercise A horizontal throw {#exr-horizontal level=2 check="20"}
A stone is thrown horizontally at $10.0\,\mathrm{m/s}$ from the edge of a cliff. The ground is $19.6\,\mathrm{m}$ below the launch. Take $g = 9.80\,\mathrm{m/s^{2}}$ and neglect air resistance. How far, in metres, from the base of the cliff does the stone land?
::: hint
Set $y = -19.6\,\mathrm{m}$ in the vertical motion with zero initial vertical velocity. Do not use the level-ground range formula: the launch angle is zero, and that formula would give zero.
:::
::: solution
Take the launch as the origin, $y$ upward, and the throw along the positive $x$ axis. Then $v_x = 10.0\,\mathrm{m/s}$ and $v_{y0} = 0$, so

$$
y(t) = -\tfrac{1}{2}(9.80)\, t^{2}.
$$

The ground is $y = -19.6\,\mathrm{m}$:

$$
19.6 = 4.90\, t^{2}, \qquad t^{2} = 4.00, \qquad t = 2.00\,\mathrm{s},
$$

taking the positive root. The horizontal velocity is constant, and the horizontal distance is

$$
x = 10.0 \times 2.00 = 20.0\,\mathrm{m}.
$$

The level-ground formula $R = v^{2}\sin 2\theta / g$ does not apply. The landing is not at the launch height, and with $\theta = 0$ that formula would have returned $0$, which is the statement that a horizontally launched projectile never comes back up to the launch height. The answer is $20.0\,\mathrm{m}$.
:::
:::

::: exercise Straight across {#exr-boat level=2 check="10"}
A boat's speed relative to the water is $5.00\,\mathrm{m/s}$. The current is $3.00\,\mathrm{m/s}$, and the river is $40.0\,\mathrm{m}$ wide. The boat is aimed so that its track on the ground is straight across the river. Find the time to cross, in seconds.
::: hint
Aim upstream at an angle $\varphi$ with $\sin\varphi = v_{\text{current}}/v_{\text{boat}}$. The crossing speed is the surviving component $\sqrt{v_{\text{boat}}^{2} - v_{\text{current}}^{2}}$.
:::
::: solution
Let the across-direction be $x$ and the downstream direction be $y$. To cancel the current, the boat's velocity relative to the water must have a $y$ component of $-3.00\,\mathrm{m/s}$. With a water-speed of $5.00\,\mathrm{m/s}$,

$$
\sin\varphi = \frac{3.00}{5.00} = 0.600, \qquad \cos\varphi = \sqrt{1 - 0.600^{2}} = 0.800,
$$

where $\varphi$ is the angle upstream of the straight-across line. The ground velocity across the river is

$$
5.00 \times 0.800 = 4.00\,\mathrm{m/s},
$$

which is also $\sqrt{5.00^{2} - 3.00^{2}}$. The width is $40.0\,\mathrm{m}$, so

$$
t = \frac{40.0}{4.00} = 10.0\,\mathrm{s}.
$$

The drift is zero by construction. The crossing time is $10.0\,\mathrm{s}$.
:::
:::

::: exercise Half the maximum range {#exr-half level=2 check="15"}
On level ground, neglecting air resistance, a projectile is launched at fixed speed. Find the smaller launch angle, in degrees, at which the range is half its maximum value.
::: hint
Write $R/R_{\max} = \sin 2\theta$ from [[#cor-range]], and set the ratio equal to $1/2$.
:::
::: solution
By [[#cor-range]], $R_{\max} = v^{2}/g$ and $R = (v^{2}/g)\sin 2\theta$, so

$$
\frac{R}{R_{\max}} = \sin 2\theta.
$$

Half the maximum range means $\sin 2\theta = 1/2$. For a launch angle between $0$ and $90^{\circ}$ the double angle lies between $0$ and $180^{\circ}$, where the sine takes the value $1/2$ at $30^{\circ}$ and at $150^{\circ}$. Therefore

$$
2\theta = 30^{\circ} \quad\text{or}\quad 2\theta = 150^{\circ}, \qquad \theta = 15^{\circ} \quad\text{or}\quad \theta = 75^{\circ}.
$$

The two angles are complementary, so [[#cor-range]] already requires them to share a range; the calculation shows that this common range is half the maximum. The smaller angle is $15^{\circ}$. The result does not depend on $v$ or on $g$, provided the level-ground hypotheses hold so that the range really is proportional to $\sin 2\theta$.
:::
:::

::: exercise The trajectory is a parabola {#exr-parabola level=3}
A projectile is launched from the origin with speed $v$ at an angle $\theta$ above the horizontal, with $\cos\theta \neq 0$. Air resistance is neglected and $a_y = -g$, $a_x = 0$. Eliminate the time between the component equations and obtain

$$
y = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

Then set the landing height equal to the launch height and recover $R = v^{2}\sin 2\theta / g$. Point to the step that uses the double-angle identity, and to the step that would be illegitimate if the landing were lower than the launch.
::: hint
From $x = (v\cos\theta)\, t$, solve for $t$ and substitute into $y(t)$. Setting $y = 0$ factors as a product; one factor is the launch.
:::
::: solution
The component equations are [[#eq-xy]],

$$
x = (v\cos\theta)\, t, \qquad y = (v\sin\theta)\, t - \tfrac{1}{2} g t^{2}.
$$

Solve the first for the time, $t = x/(v\cos\theta)$. This division is the step that needs $\cos\theta \neq 0$. Substitute into $y$:

$$
y = (v\sin\theta)\cdot\frac{x}{v\cos\theta} - \tfrac{1}{2} g\left(\frac{x}{v\cos\theta}\right)^{2} = x\tan\theta - \frac{g x^{2}}{2 v^{2}\cos^{2}\theta}.
$$

The right-hand side is a quadratic polynomial in $x$, so the graph is a parabola. No assumption about the landing has been used: this is the path for as long as the constant-acceleration model holds.

Now impose a landing at the launch height, $y = 0$, and look for $x \neq 0$:

$$
0 = x\left(\tan\theta - \frac{g x}{2 v^{2}\cos^{2}\theta}\right).
$$

The root $x = 0$ is the launch. The other root is

$$
x = \frac{2 v^{2}\cos^{2}\theta\cdot\tan\theta}{g} = \frac{2 v^{2}\cos^{2}\theta\cdot\sin\theta}{g\cos\theta} = \frac{2 v^{2}\sin\theta\cos\theta}{g} = \frac{v^{2}\sin 2\theta}{g}.
$$

The double-angle identity $\sin 2\theta = 2\sin\theta\cos\theta$ is the last step. The step that fails if the landing is a height $h$ below the launch is the substitution $y = 0$. The correct condition is then $y = -h$, which produces a quadratic equation for $t$, or for $x$, and does not factor into the level-ground range. Using $y = 0$ in that situation is not an approximation. It is the wrong boundary condition.
:::
:::

::: exercise Closest approach {#exr-closest level=3 check="15*sqrt(2)"}
At $t = 0$, boat A is at the origin and moves with constant velocity $3.00\,\mathbf{i}\,\mathrm{m/s}$. Boat B is at $30.0\,\mathbf{j}$ metres and moves with constant velocity $-3.00\,\mathbf{j}\,\mathrm{m/s}$. Coordinates are in metres. Find the exact distance of closest approach, in metres.
::: hint
Work with the relative position $\mathbf{r}_B - \mathbf{r}_A$. The distance is smallest when the relative position is perpendicular to the relative velocity, so their scalar product is zero.
:::
::: solution
The positions at time $t$, in metres, are $\mathbf{r}_A = (3.00\, t)\,\mathbf{i}$ and $\mathbf{r}_B = (30.0 - 3.00\, t)\,\mathbf{j}$. The position of B relative to A is

$$
\mathbf{r} = \mathbf{r}_B - \mathbf{r}_A = (-3.00\, t)\,\mathbf{i} + (30.0 - 3.00\, t)\,\mathbf{j},
$$

and the relative velocity is the constant vector $\mathbf{v} = -3.00\,\mathbf{i} - 3.00\,\mathbf{j}$, in metres per second, by [[#prop-relative]]. The distance decreases for as long as $\mathbf{r}$ has a component along $\mathbf{v}$, and it is smallest when $\mathbf{r}\cdot\mathbf{v} = 0$:

$$
(-3.00\, t)(-3.00) + (30.0 - 3.00\, t)(-3.00) = 9.00\, t - 90.0 + 9.00\, t = 18.0\, t - 90.0.
$$

Set the scalar product equal to zero: $t = 90.0/18.0 = 5.00\,\mathrm{s}$. The relative position is then

$$
\mathbf{r} = (-15.0)\,\mathbf{i} + (15.0)\,\mathbf{j}\ \mathrm{m},
$$

and the distance is

$$
\abs{\mathbf{r}} = \sqrt{(-15.0)^{2} + 15.0^{2}} = \sqrt{450} = 15\sqrt{2}\,\mathrm{m}.
$$

The exact distance of closest approach is $15\sqrt{2}$ metres.
:::
:::
