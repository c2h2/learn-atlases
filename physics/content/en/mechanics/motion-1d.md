A stone thrown straight up and a car braking in a straight line are the same problem once a positive sense has been chosen. Every vector on that line collapses to a signed number. Position, velocity and acceleration become functions of time, related in general by derivatives and, when the acceleration is constant, by three explicit formulae.

Those formulae are false for a spring, and false for a stone once air resistance is admitted. The usual error is not bad algebra but a failure to read the hypothesis. What constant acceleration does cover, it covers completely: free fall near the Earth with air resistance neglected, and any other straight-line motion in which the acceleration really does not change.

Vectors and units are assumed from [[mechanics/units-vectors]]. A velocity may be negative; a speed may not. Whenever a number is required, $g = 9.80\,\mathrm{m/s^2}$. [[mechanics/motion-2d]] puts the second dimension back, and [[mechanics/newton-laws]] says why the acceleration has the value it has. Here the acceleration is given, and the question is the motion.

## Position, displacement and distance {#position}

To describe motion on a line we choose an origin and a positive sense, and we do not change them mid-problem. Both choices are conventions. A different choice changes signs in the answer and does not change the motion: two correct solutions with opposite positive senses differ only by those signs.

::: definition Displacement and distance {#def-displacement}
The **position** of a particle at time $t$ is the signed coordinate $x(t)$, measured in the chosen frame. If the particle is at position $x_1$ at time $t_1$ and at position $x_2$ at time $t_2$, the **displacement** over that interval is the signed change

$$
\Delta x = x_2 - x_1.
$$

The **distance travelled** over the same interval is the length of the path actually followed. On a line it is the sum of the absolute values of the displacements over each piece of the motion on which the particle does not reverse direction.
:::

Displacement says where the particle finished relative to where it started. Distance says how much ground was covered. They agree only when the particle never reverses. A stone thrown up from the ground and caught at the ground has displacement zero and distance travelled equal to twice the maximum height. The symbol $\Delta$ means final minus initial. It is not a factor you can cancel, and $\Delta(x^2)$ is not $(\Delta x)^2$.

Signs are part of the data. A position $x = -3.00\,\mathrm{m}$ lies $3.00\,\mathrm{m}$ on the negative side of the origin. A displacement $\Delta x = -3.00\,\mathrm{m}$ means the particle finished $3.00\,\mathrm{m}$ to the negative side of where it started, whatever the origin was. The absolute value $\abs{\Delta x}$ is the straight-line distance between the endpoints, which is still not the distance travelled if the particle reversed in between.

::: example Out and back {#ex-out-back}
A particle on the $x$-axis moves from $x = 0$ to $x = 10.0\,\mathrm{m}$ and then back to $x = 4.00\,\mathrm{m}$. Find the displacement and the distance travelled.
::: solution
Take the whole trip as one interval. The initial position is $0$ and the final position is $4.00\,\mathrm{m}$, so

$$
\Delta x = 4.00 - 0 = 4.00\,\mathrm{m}.
$$

The particle reversed, so the distance travelled is not $\abs{\Delta x}$. Split the motion at the turning point. On the outward piece the displacement is $10.0 - 0 = 10.0\,\mathrm{m}$, and the distance is $10.0\,\mathrm{m}$. On the return piece the displacement is $4.00 - 10.0 = -6.00\,\mathrm{m}$, and the distance is the absolute value $6.00\,\mathrm{m}$. The total distance travelled is

$$
10.0 + 6.00 = 16.0\,\mathrm{m}.
$$

The two answers, $4.00\,\mathrm{m}$ and $16.0\,\mathrm{m}$, are both correct and they describe different things. Any later average will inherit the distinction: divide the displacement by the time and you have an average velocity; divide the distance by the time and you have an average speed.
:::
:::

## Velocity and acceleration {#velocity}

Position against time is the raw description. The rate at which position changes is the velocity, and the rate at which velocity changes is the acceleration. Each rate has an average over a finite interval and an instantaneous value at one moment. The instantaneous values are derivatives: slopes of tangents, obtained as limits of chord slopes.

::: definition Velocity {#def-velocity}
Let the position be a function $x(t)$. On an interval from $t$ to $t + \Delta t$ with $\Delta t \neq 0$, the **average velocity** is

$$
v_{\mathrm{avg}} = \frac{\Delta x}{\Delta t} = \frac{x(t+\Delta t) - x(t)}{\Delta t}.
$$ {#eq-v-avg}

The **instantaneous velocity** at time $t$ is the derivative

$$
v(t) = \deriv{x}{t} = \lim_{\Delta t \to 0} \frac{x(t+\Delta t) - x(t)}{\Delta t},
$$ {#eq-v}

provided the limit exists. The **speed** at time $t$ is $\abs{v(t)}$. The **average speed** over an interval is the distance travelled divided by the duration, which is not in general equal to $\abs{v_{\mathrm{avg}}}$.
:::

Average velocity has the sign of the displacement, even if the particle spent most of the interval going the other way. Average speed is path length divided by duration, and it has no sign.

On a graph of $x$ against $t$, average velocity is the slope of a chord and instantaneous velocity is the slope of the tangent. A horizontal tangent is an instant of zero velocity. A negative slope means motion in the negative sense.

The limit in [[#eq-v]] is what "velocity at an instant" means. At $\Delta t = 0$ the ratio $\Delta x/\Delta t$ is the indeterminate form $0/0$; the derivative is the value the average approaches, not the result of substituting zero. For a formula, differentiate by the usual rules. For a graph or a table, estimate the slope.

::: definition Acceleration {#def-acceleration}
The **average acceleration** on an interval on which the velocity changes by $\Delta v$ in a time $\Delta t \neq 0$ is $\Delta v/\Delta t$. The **instantaneous acceleration** is

$$
a(t) = \deriv{v}{t} = \frac{\dd^2 x}{\dd t^2},
$$ {#eq-a}

provided the derivatives exist.
:::

On a graph of $v$ against $t$, acceleration is the slope. A positive acceleration means $v$ is increasing algebraically: a positive velocity becomes more positive, or a negative velocity becomes less negative. We will not say "deceleration". We will give the sign of $a$, and say separately whether the speed increases.

The speed increases when $v$ and $a$ have the same sign, and decreases when they have opposite signs. At an instant with $v = 0$ and $a \neq 0$, the particle is instantaneously at rest and is about to move in the direction of $a$.

::: example Average and instantaneous {#ex-cubic}
A particle moves on a line with position $x(t) = c t^3$, where $c = 1.00\,\mathrm{m/s^3}$ and $t$ is in seconds. Find the average velocity between $t = 1.00\,\mathrm{s}$ and $t = 3.00\,\mathrm{s}$, and the instantaneous velocity and acceleration at each endpoint.
::: solution
The constant $c$ carries the units, so $x$ is in metres when $t$ is in seconds. At the endpoints,

$$
x(1.00) = 1.00\,\mathrm{m}, \qquad x(3.00) = 27.0\,\mathrm{m}.
$$

The displacement and the duration are $\Delta x = 27.0 - 1.00 = 26.0\,\mathrm{m}$ and $\Delta t = 2.00\,\mathrm{s}$, so [[#eq-v-avg]] gives

$$
v_{\mathrm{avg}} = \frac{26.0\,\mathrm{m}}{2.00\,\mathrm{s}} = 13.0\,\mathrm{m/s}.
$$

On $t > 0$ the position $c t^3$ is strictly increasing, so the particle does not reverse, the distance travelled is also $26.0\,\mathrm{m}$, and the average speed equals the average velocity.

Differentiate. With $c$ constant,

$$
v(t) = \deriv{x}{t} = 3 c t^2, \qquad a(t) = \deriv{v}{t} = 6 c t.
$$

At the endpoints, $v(1.00) = 3.00\,\mathrm{m/s}$ and $v(3.00) = 27.0\,\mathrm{m/s}$. Neither equals the average $13.0\,\mathrm{m/s}$. Their arithmetic mean is $(3.00+27.0)/2 = 15.0\,\mathrm{m/s}$, which is not the average either. That mean equals the average velocity only when the acceleration is constant. Here $a(t) = 6ct$, so $a(1.00) = 6.00\,\mathrm{m/s^2}$ and $a(3.00) = 18.0\,\mathrm{m/s^2}$. The hypothesis of the next section fails.
:::
:::

::: quiz
A stone is thrown straight up. At the highest point, which statement is correct if upward is the positive sense?
- [ ] The velocity and the acceleration are both zero.
- [ ] The acceleration is zero, but the velocity is still upward.
- [x] The velocity is zero and the acceleration is $-g$, not zero.
- [ ] The velocity is zero and the acceleration is $+g$.
::: solution
The highest point is where the tangent to $x(t)$ is horizontal, so $v = 0$. While the stone is in the air and air resistance is neglected, the acceleration is the constant $-g$ at every instant, including the instant when the velocity passes through zero. If the acceleration vanished at the top, the velocity would stop changing and the stone would stay there. Upward positive makes $g$ itself positive and the acceleration negative.
:::
:::

## Motion with constant acceleration {#constant}

Problems usually run the other way from the cubic example. The acceleration is known, often because the forces are constant, and the motion is what we want. Integration recovers it for a general $a(t)$. When $a$ is constant the integrals are elementary, and they produce the three formulae below. The derivation is short. The hypothesis is not optional.

::: theorem Constant acceleration {#thm-const-a}
Suppose that on a time interval containing $t = 0$ the acceleration $a$ is constant, and that at time $t = 0$ the position is $x_0$ and the velocity is $v_0$. Then, throughout the interval,

$$
v(t) = v_0 + a t,
$$ {#eq-v-const}

$$
x(t) = x_0 + v_0 t + \frac{1}{2} a t^2,
$$ {#eq-x-const}

$$
v(t)^2 = v_0^2 + 2 a \bigl(x(t) - x_0\bigr).
$$ {#eq-v2}

If the initial instant is some $t_0$ other than zero, replace $t$ everywhere by $t - t_0$.
:::

::: proof
By [[#def-acceleration]], $a = \deriv{v}{t}$. The hypothesis is that this derivative equals the same number $a$ at every instant of the interval. The functions whose derivative is the constant $a$ are exactly the linear functions $v(t) = a t + C$. The condition $v(0) = v_0$ fixes $C = v_0$, which is [[#eq-v-const]]. Equivalently, by the fundamental theorem of calculus,

$$
v(t) - v(0) = \int_0^t \deriv{v}{t'}\,\dd t' = \int_0^t a\,\dd t' = a t,
$$

where pulling $a$ out of the integral is precisely the step that fails if $a$ depends on time.

Position is recovered the same way from [[#def-velocity]]. The function $v(t) = v_0 + a t$ has antiderivative $v_0 t + \frac12 a t^2$, and $x(0) = x_0$ fixes the constant of integration:

$$
x(t) = x_0 + \int_0^t (v_0 + a t')\,\dd t' = x_0 + \Bigl[v_0 t' + \frac{1}{2} a t'^2\Bigr]_0^t = x_0 + v_0 t + \frac{1}{2} a t^2.
$$

That is [[#eq-x-const]]. The third formula contains no time. It is obtained by eliminating $t$ between the first two, not by a new physical assumption. If $a = 0$, then [[#eq-v-const]] says $v(t) = v_0$, and the right-hand side of [[#eq-v2]] is $v_0^2 + 0$, so the identity holds. If $a \neq 0$, solve [[#eq-v-const]] for the time,

$$
t = \frac{v - v_0}{a},
$$

and substitute into [[#eq-x-const]]:

$$
\begin{aligned}
x - x_0 &= v_0\left(\frac{v-v_0}{a}\right) + \frac{1}{2} a \left(\frac{v-v_0}{a}\right)^2 \\
&= \frac{2 v_0 (v - v_0) + (v - v_0)^2}{2a} \\
&= \frac{2 v_0 v - 2 v_0^2 + v^2 - 2 v v_0 + v_0^2}{2a} \\
&= \frac{v^2 - v_0^2}{2a}.
\end{aligned}
$$

Multiplying through by $2a$ gives [[#eq-v2]]. The elimination does not divide by $v$, so it remains valid at a turning point where the velocity passes through zero.
:::

There is a second route to [[#eq-v2]]. By the chain rule, wherever $v \neq 0$,

$$
a = \deriv{v}{t} = \deriv{v}{x}\deriv{x}{t} = v \deriv{v}{x},
$$

so $v\,\dd v = a\,\dd x$. If $a$ is constant, integration from $(x_0, v_0)$ to $(x, v)$ gives [[#eq-v2]] again. Treating $v$ as a function of $x$ needs the particle not to reverse on that interval, since a turning point is visited twice, with two velocities. The elimination proof does not need that restriction, so it covers a flight that goes up and comes back down.

The three formulae are not independent: the third follows from the first two. Choose the one that contains the knowns and the unknown, and not the quantity you neither know nor want. If time is unwanted, use [[#eq-v2]]. If position is unwanted, use [[#eq-v-const]]. If you need $x$ as a function of $t$, use [[#eq-x-const]].

There is also a useful rewrite that makes the average velocity easy to see. From [[#eq-v-const]], the arithmetic mean of the initial and final velocities is

$$
\frac{v_0 + v}{2} = \frac{v_0 + (v_0 + a t)}{2} = v_0 + \frac{1}{2} a t.
$$

Multiply by the duration and compare with [[#eq-x-const]]:

$$
x - x_0 = \left(\frac{v_0 + v}{2}\right) t.
$$

So, when $a$ is constant, the displacement equals the mean of the endpoint velocities times the time. This is not a fourth independent formula, and it fails when $a$ changes. The cubic example already disagreed: the mean of the endpoint velocities was $15.0\,\mathrm{m/s}$ and the true average was $13.0\,\mathrm{m/s}$.

::: corollary Mean velocity under constant acceleration {#cor-mean-speed}
Under the hypotheses of [[#thm-const-a]], the average velocity on the interval from $0$ to $t$ equals the arithmetic mean of the initial and final velocities,

$$
\frac{\Delta x}{t} = \frac{v_0 + v(t)}{2}.
$$
:::

::: proof
The displacement from [[#eq-x-const]] is $\Delta x = v_0 t + \frac12 a t^2$. The final velocity from [[#eq-v-const]] is $v(t) = v_0 + a t$, so

$$
\frac{v_0 + v(t)}{2}\, t = \left(v_0 + \frac{1}{2} a t\right) t = v_0 t + \frac{1}{2} a t^2 = \Delta x.
$$

Divide by $t$ for $t \neq 0$. For constant $a$ the graph of $x$ is a parabola, and the chord slope between the endpoints equals the slope at the midpoint in time.
:::

::: warning Constant acceleration is a hypothesis
Equations [[#eq-v-const]], [[#eq-x-const]] and [[#eq-v2]] are false when the acceleration changes: false for a spring, false for motion with air resistance, and false across a join between two different constant values of $a$. Use them on each piece, taking the final state of one piece as the initial state of the next, and do not feed an averaged $a$ to the formulae on the union. Check the hypothesis before you substitute. The spring is treated in [[oscillations]].
:::

### Free fall

Near the Earth, with air resistance neglected, every body has the same downward acceleration, of magnitude

$$
g = 9.80\,\mathrm{m/s^2}.
$$

The sign is a convention. **In this chapter upward is positive, and we keep that choice,** so free fall has

$$
a = -g = -9.80\,\mathrm{m/s^2}.
$$

A book that takes downward as positive writes $a = +g$ and reverses every upward velocity. Both conventions describe the same stones. Mixing them in one solution does not. The symbol $g$ is a positive magnitude; the minus sign lives in $a$, not inside $g$.

Free fall is [[#thm-const-a]] with this $a$. A body thrown upward slows at $9.80\,\mathrm{m/s^2}$, is instantaneously at rest at the top, and speeds up downward at the same rate. The velocity at the top is zero. The acceleration there is still $-g$. The time going up equals the time coming back to the same height, because [[#eq-x-const]] is a parabola symmetric about its vertex.

::: example A stone thrown upward {#ex-stone}
A stone is thrown vertically upward from ground level with initial speed $15.0\,\mathrm{m/s}$. Taking upward as positive and $g = 9.80\,\mathrm{m/s^2}$, find the time at which the stone reaches its highest point, the height of that point, and the time and velocity at which the stone returns to the ground.
::: solution
Set up the conventions before substituting. The origin is at ground level, so $x_0 = 0$. Upward is positive, so $v_0 = +15.0\,\mathrm{m/s}$ and $a = -g = -9.80\,\mathrm{m/s^2}$. The acceleration is constant while the stone is in the air and air resistance is neglected, so [[#thm-const-a]] applies from the throw until the return.

At the highest point the velocity is zero, not the acceleration. Equation [[#eq-v-const]] with $v = 0$ gives

$$
0 = 15.0 + (-9.80)\, t, \qquad t = \frac{15.0}{9.80} = 1.5306\ldots\,\mathrm{s}.
$$

To three significant figures, matching the data, the time to the top is $1.53\,\mathrm{s}$. The exact quotient $15/9.80 = 75/49$ is the value to keep if it is going to be substituted further; rounding to $1.53$ and then reusing it is how a later line drifts by a centimetre.

The height follows from [[#eq-v2]], which does not need the time:

$$
0 = (15.0)^2 + 2(-9.80)\bigl(x_{\max} - 0\bigr), \qquad x_{\max} = \frac{225}{2 \times 9.80} = \frac{225}{19.6} = 11.4796\ldots\,\mathrm{m}.
$$

To three significant figures the maximum height is $11.5\,\mathrm{m}$. One extra digit, $11.48\,\mathrm{m}$, is worth keeping inside a longer calculation. The same height comes from [[#eq-x-const]] with the exact time $t = 15/9.80$:

$$
x_{\max} = (15.0)\left(\frac{15.0}{9.80}\right) + \frac{1}{2}(-9.80)\left(\frac{15.0}{9.80}\right)^2 = \frac{225}{9.80} - \frac{225}{2 \times 9.80} = \frac{225}{19.6},
$$

so the two formulae agree, as the theorem says they must.

The stone returns to the ground when $x = 0$ again. Equation [[#eq-x-const]] gives

$$
0 = (15.0)\, t + \frac{1}{2}(-9.80)\, t^2 = t \bigl(15.0 - 4.90\, t\bigr).
$$

One root is $t = 0$, the launch. The other is

$$
t = \frac{15.0}{4.90} = \frac{150}{49} = 3.0612\ldots\,\mathrm{s},
$$

which is $3.06\,\mathrm{s}$ to three significant figures, and exactly twice the time to the top. The velocity at that instant, from [[#eq-v-const]], is

$$
v = 15.0 + (-9.80)\left(\frac{15.0}{4.90}\right).
$$

Since $9.80/4.90 = 2$, the second term is $-2 \times 15.0 = -30.0$, and

$$
v = 15.0 - 30.0 = -15.0\,\mathrm{m/s}.
$$

The minus sign is the direction. The stone passes the ground moving downward, opposite the positive sense we chose. Its speed is $15.0\,\mathrm{m/s}$, the same as the launch speed, which is what [[#eq-v2]] also says: at $x = x_0$ one has $v^2 = v_0^2$, so $v = \pm v_0$, and the return selects the negative root. A reported answer of $+15.0\,\mathrm{m/s}$ would be the launch velocity, not the return velocity. The sign is the part of the answer that says which way the stone is going.
:::
:::

::: widget motion
x0: 0
v0: 15
a: -9.8
T: 3.2
caption: The curve is $x(t) = x_0 + v_0 t + \frac12 a t^2$ for the stone of the worked example: the figure opens at $x_0 = 0$, $v_0 = 15$ and $a = -9.8$. Press play and watch $v$ fall through zero at the top of the parabola, a little after $t = 1.5\,\mathrm{s}$, while $a$ stays negative. The stone is back near $x = 0$ just after $t = 3\,\mathrm{s}$, with $v$ near $-15$. Then drag $a$ to $0$ and notice that the graph becomes a straight line: constant velocity, not a throw.
:::

The figure uses $a = -9.8$, which is the same number as $-9.80$. The time at which $v = 0$ is $15/9.8 = 1.53\,\mathrm{s}$, the same instant computed above. What the animation shows, in a way a single algebraic line does not, is that the slope changes smoothly through zero. There is no kink at the top, and no interval during which the velocity rests.

::: example A car braking {#ex-car}
A car travelling in a straight line at $25.0\,\mathrm{m/s}$ brakes with a constant acceleration of $-4.00\,\mathrm{m/s^2}$. How far does it travel before stopping, and how long does the stop take?
::: solution
Choose the positive sense in the direction of the initial velocity, so $v_0 = +25.0\,\mathrm{m/s}$, and put the origin at the point where the brakes are applied, so $x_0 = 0$. The acceleration is $a = -4.00\,\mathrm{m/s^2}$, constant by the statement of the problem, until the car stops. Stopping means $v = 0$, not $a = 0$. After the car stops, the acceleration is whatever the brakes and the road do to a car at rest; the constant-acceleration interval ends there, and we do not extend the formulae past it.

The unknown we want first is a distance, and the time is not asked for yet, so [[#eq-v2]] is the formula that avoids $t$:

$$
0 = (25.0)^2 + 2(-4.00)(x - 0), \qquad x = \frac{-625}{2 \times (-4.00)} = \frac{-625}{-8.00} = \frac{625}{8} = 78.125\,\mathrm{m}.
$$

To three significant figures the stopping distance is $78.1\,\mathrm{m}$. The two minus signs are the algebra of a positive $v_0^2$ moved across the equation, and of a negative acceleration. The distance comes out positive, as it must while the car is still moving forward.

The time comes from [[#eq-v-const]], now that we want it:

$$
0 = 25.0 + (-4.00)\, t, \qquad t = \frac{25.0}{4.00} = 6.25\,\mathrm{s}.
$$

This quotient is exact for the data as given. As a check, the mean-velocity relation of [[#cor-mean-speed]] says the average velocity during the stop is $(25.0 + 0)/2 = 12.5\,\mathrm{m/s}$, and $12.5 \times 6.25 = 78.125\,\mathrm{m}$, the same distance. If the acceleration had varied during the stop, this check would have failed and [[#eq-v2]] would not have been available in the first place.
:::
:::

## Graphs and motion in stages {#graphs}

A graph is read with the same three correspondences. The velocity is the slope of $x$ against $t$: a straight piece has constant velocity and zero acceleration, a piece bending upward has positive acceleration, and a piece bending downward has negative acceleration. You need the way the slope changes, not the formula of the curve.

The acceleration is the slope of $v$ against $t$. Constant acceleration is a straight line on that graph, and a horizontal intercept is an instant of zero velocity. The signed area under $v$ against $t$ is the displacement, because $v\,\Delta t$ is a small contribution to $\Delta x$ and adding those contributions is integration. Area above the axis is positive and area below it is negative. The distance travelled is the integral of the speed, which is the same area with every piece counted positive.

The table below is the stone of [[#ex-stone]], sampled so that the three correspondences can be checked against numbers you already know. Times $1.53\,\mathrm{s}$ and $3.06\,\mathrm{s}$ are the three-significant-figure values, so the row at the "top" has a residual velocity of a few millimetres per second rather than exact zero. The exact top is at $15/9.80\,\mathrm{s}$.

| $t$ ($\mathrm{s}$) | $x$ ($\mathrm{m}$) | $v$ ($\mathrm{m/s}$) | what the slopes are doing |
|---|---|---|---|
| $0$ | $0$ | $+15.0$ | $x$ rising steeply; $v$ about to fall |
| $0.50$ | $6.28$ | $+10.1$ | slope of $x$ still positive, smaller |
| $1.00$ | $10.1$ | $+5.20$ | still rising, bending over |
| $1.53$ | $11.48$ | $+0.006$ | tangent nearly horizontal; $v$ crossing zero |
| $2.00$ | $10.4$ | $-4.60$ | $x$ falling; $v$ negative and still decreasing |
| $3.06$ | $+0.02$ | $-15.0$ | back at the ground, to this rounding |

From the launch to the top, $v(t)$ is a straight line from $15.0\,\mathrm{m/s}$ down to zero, and the triangular area is $\frac12 \times 15.0 \times (15/9.80) = 11.48\,\mathrm{m}$, the maximum height. On the way down the signed area cancels that displacement, so the round trip has $\Delta x = 0$. The distance travelled is about $23.0\,\mathrm{m}$, twice the height. The graph of $x$ against $t$ is a parabola opening downward, with slope running from $+15.0$ through zero to $-15.0$, and the slope of that slope is the constant $-9.80\,\mathrm{m/s^2}$.

::: example Reading the stone from its graphs {#ex-graphs}
Using only the correspondences above and the table, say on which part of the flight the stone is speeding up, and explain how the table shows that the acceleration is negative throughout.
::: solution
Speed is $\abs{v}$. It falls from $15.0\,\mathrm{m/s}$ to zero on the way up, so the stone slows, and it grows from zero to $15.0\,\mathrm{m/s}$ on the way down, so the stone speeds up while $v$ is negative. On that piece $v$ and $a$ have the same sign.

Reading down the velocity column, $v$ decreases at every step, including across the top, so the slope of $v$ against $t$ is negative throughout. From $t = 0$ to $t = 0.50\,\mathrm{s}$ the velocity drops by $4.9\,\mathrm{m/s}$, and it drops by another $4.9\,\mathrm{m/s}$ in the next half-second. The acceleration is therefore the constant $-9.8\,\mathrm{m/s^2}$, which is why [[#eq-x-const]] was legal. A table in which $v$ dropped quickly and then slowly would have been a changing acceleration, and the constant-acceleration formula would not have produced it.
:::
:::

A motion with two accelerations is solved in pieces. Finish the first piece with [[#thm-const-a]], and use its final position and velocity as the initial data of the next. Keep a global clock and write $t - t_0$ on each piece, or reset the clock; do not average the accelerations and feed the average to [[#eq-x-const]].

::: example Acceleration, then coasting {#ex-stages}
A cyclist starts from rest and accelerates at a constant $1.20\,\mathrm{m/s^2}$ for $5.00\,\mathrm{s}$, then coasts at constant velocity for a further $10.0\,\mathrm{s}$. Find the velocity at the changeover and the position at the end of the coast. Then show that feeding a single acceleration, either $1.20\,\mathrm{m/s^2}$ or the time-averaged acceleration, into [[#eq-x-const]] over the full $15.0\,\mathrm{s}$ gives the wrong position.
::: solution
Put the origin at the start and the positive sense in the direction of travel, and keep a global clock with $t = 0$ at the start. On the first piece, $0 \le t \le 5.00\,\mathrm{s}$, the hypotheses of [[#thm-const-a]] hold with $x_0 = 0$, $v_0 = 0$ and $a = 1.20\,\mathrm{m/s^2}$. At the changeover,

$$
v_1 = 0 + (1.20)(5.00) = 6.00\,\mathrm{m/s},
$$

$$
x_1 = 0 + 0 + \frac{1}{2}(1.20)(5.00)^2 = (0.600)(25.0) = 15.0\,\mathrm{m}.
$$

On the second piece the acceleration is a different constant, namely zero. The initial data for this piece are $t_0 = 5.00\,\mathrm{s}$, $x_0 = 15.0\,\mathrm{m}$ and $v_0 = 6.00\,\mathrm{m/s}$. For $5.00 \le t \le 15.0\,\mathrm{s}$,

$$
v(t) = 6.00\,\mathrm{m/s},
$$

$$
x(t) = 15.0 + (6.00)\,(t - 5.00).
$$

At $t = 15.0\,\mathrm{s}$ the position is $15.0 + (6.00)(10.0) = 75.0\,\mathrm{m}$, and the velocity is still $6.00\,\mathrm{m/s}$. The coasting piece contributes $60.0\,\mathrm{m}$, four times the distance covered while accelerating, because the cyclist holds the final speed for twice as long as the acceleration lasted, and the acceleration piece was itself only at half that speed on average.

Now the two wrong calculations, which are the point of the example. If someone inserts $a = 1.20\,\mathrm{m/s^2}$ into [[#eq-x-const]] for the whole $15.0\,\mathrm{s}$, with $v_0 = 0$,

$$
x(15.0) = \frac{1}{2}(1.20)(15.0)^2 = (0.600)(225) = 135\,\mathrm{m},
$$

and the predicted final velocity is $(1.20)(15.0) = 18.0\,\mathrm{m/s}$. Both numbers describe a cyclist who kept accelerating, which is a different ride. The time-averaged acceleration is more seductive, because it reproduces the final velocity. The velocity rose by $6.00\,\mathrm{m/s}$ in $15.0\,\mathrm{s}$, so the average acceleration is $6.00/15.0 = 0.400\,\mathrm{m/s^2}$. Feeding that constant to [[#eq-x-const]] gives

$$
x(15.0) = \frac{1}{2}(0.400)(225) = 45.0\,\mathrm{m},
$$

which is not $75.0\,\mathrm{m}$. The mean-velocity shortcut fails on the same interval: $(v_0 + v_{\mathrm{final}})/2 = 3.00\,\mathrm{m/s}$ and $3.00 \times 15.0 = 45.0\,\mathrm{m}$ again. The true average velocity is $\Delta x/\Delta t = 75.0/15.0 = 5.00\,\mathrm{m/s}$. Equality with the mean of the endpoints needs [[#cor-mean-speed]], one constant acceleration on the whole interval. On each piece it holds, with mean velocities $3.00\,\mathrm{m/s}$ and $6.00\,\mathrm{m/s}$ and displacements $15.0\,\mathrm{m}$ and $60.0\,\mathrm{m}$.
:::
:::

On the $v$–$t$ graph the motion is the line from $(0,0)$ to $(5,6)$, then the horizontal line to $(15,6)$. The area under that broken line is $75\,\mathrm{m}$. The chord from $(0,0)$ to $(15,6)$ is the time-averaged acceleration, and the triangle under it has area $45\,\mathrm{m}$.

::: history Galileo and the mean speed
Galileo Galilei, in the *Discourses on Two New Sciences* (1638), argued that if air resistance is neglected, the distance fallen from rest grows with the square of the time. In our sign convention that statement is $s = \frac12 g t^2$, the distance below the release point: [[#eq-x-const]] with $v_0 = 0$ and $a = -g$, rewritten as a positive distance fallen. He reached it by combining experiment with an assumption about how speed grows, not by writing derivatives.

The mean-speed relation is older. The Oxford calculators of the fourteenth century stated that a body with a uniformly changing speed covers, in a given time, the same distance it would have covered by moving steadily at the speed halfway between the initial and final speeds. The usual citation is William Heytesbury's *Regule solvendi sophismata* (1335). Nicole Oresme, later in the same century, gave a graphical argument: if speed is drawn as a straight line against time, the area of the resulting triangle or trapezium equals the area of the rectangle whose height is the mean speed. That area is [[#cor-mean-speed]]. What neither Heytesbury nor Oresme nor Galileo had was the identification of instantaneous velocity with a derivative, which is how we proved the same formulae for an arbitrary constant $a$, not only for free fall from rest.
:::

## Where this leads {#leads}

In [[mechanics/motion-2d]] the position is a vector, differentiated one component at a time. Projectile motion is this chapter twice: free fall in $y$, with $a_y = -g$, and zero acceleration in $x$. Uniform circular motion is the first case in which the speed is constant and the acceleration is not, because the direction of $\mathbf{v}$ changes. The constant-acceleration formulae do not apply to it.

[[mechanics/newton-laws]] supplies the cause. A constant net force is this chapter. When the force depends on position or on velocity, $a$ is not constant and the equation of motion is a differential equation. The spring is the first of those, in [[oscillations]]. Air resistance is why a real stone thrown up at $15.0\,\mathrm{m/s}$ does not return at exactly $-15.0\,\mathrm{m/s}$.

Velocity remains $\deriv{x}{t}$ in every extension. What does not survive is reaching for [[#eq-v2]] before asking whether $a$ is constant.

::: summary
- Choose an origin and a positive sense before writing equations, and keep them. With upward positive, free fall has $a = -g$ and $g = 9.80\,\mathrm{m/s^2}$ is positive.
- Displacement $\Delta x$ is signed. Distance travelled is not. Average velocity is $\Delta x/\Delta t$; average speed is distance divided by time.
- Instantaneous velocity is $v = \deriv{x}{t}$, and instantaneous acceleration is $a = \deriv{v}{t} = \dd^2 x/\dd t^2$. On a graph, velocity is the slope of $x(t)$ and acceleration is the slope of $v(t)$.
- The signed area under a graph of $v$ against $t$ is the displacement.
- If, and only if, $a$ is constant, then $v = v_0 + at$, $x = x_0 + v_0 t + \frac12 a t^2$, and $v^2 = v_0^2 + 2a(x-x_0)$. The third follows from the first two.
- Under that same hypothesis the average velocity equals the mean of the initial and final velocities.
- The three formulae are false for a spring, for motion with air resistance, and across a join between two different accelerations. Use them on each constant piece, then match position and velocity at the join.
- At the top of a vertical throw the velocity is zero and the acceleration is still $-g$. The stone of the worked example returns at $-15.0\,\mathrm{m/s}$, not at $+15.0\,\mathrm{m/s}$.
:::

## Exercises {#exercises}

::: exercise Distance travelled {level=1 check="13"}
A particle moves from $x = -2.00\,\mathrm{m}$ to $x = 6.00\,\mathrm{m}$, then to $x = 1.00\,\mathrm{m}$, without reversing except at the join. Find the distance travelled, in metres.
::: solution
The motion has two pieces, and it reverses only at the join, so the distance is the sum of the absolute displacements. The first piece contributes

$$
\abs{6.00 - (-2.00)} = 8.00\,\mathrm{m}.
$$

The second contributes

$$
\abs{1.00 - 6.00} = 5.00\,\mathrm{m}.
$$

The distance travelled is $8.00 + 5.00 = 13.0\,\mathrm{m}$. The displacement over the whole trip is $1.00 - (-2.00) = 3.00\,\mathrm{m}$, which is not what was asked. The two quantities differ by the out-and-back portion between $x = 1.00\,\mathrm{m}$ and $x = 6.00\,\mathrm{m}$, counted twice in the distance and not at all in the net displacement.
:::
:::

::: exercise Average velocity {level=1 check="3.6"}
At time $t = 1.00\,\mathrm{s}$ a particle is at $x = 4.00\,\mathrm{m}$. At time $t = 3.50\,\mathrm{s}$ it is at $x = 13.0\,\mathrm{m}$. Find the average velocity in $\mathrm{m/s}$.
::: solution
The displacement and the duration are

$$
\Delta x = 13.0 - 4.00 = 9.00\,\mathrm{m}, \qquad \Delta t = 3.50 - 1.00 = 2.50\,\mathrm{s}.
$$

By [[#eq-v-avg]],

$$
v_{\mathrm{avg}} = \frac{9.00}{2.50} = 3.60\,\mathrm{m/s}.
$$

The positive sign means the net displacement is in the positive sense. This number is not an instantaneous velocity, and it is not a speed, unless you have a separate reason to believe the particle never reversed. The data give you only the two endpoints.
:::
:::

::: exercise Distance under constant acceleration {level=1 check="20"}
A particle starts from rest and accelerates at a constant $2.50\,\mathrm{m/s^2}$ for $4.00\,\mathrm{s}$. How far does it travel, in metres?
::: solution
The acceleration is constant, the initial velocity is $v_0 = 0$, and we may take $x_0 = 0$. Equation [[#eq-x-const]] gives

$$
x = 0 + 0 + \frac{1}{2}(2.50)(4.00)^2 = (1.25)(16.0) = 20.0\,\mathrm{m}.
$$

The particle does not reverse, because $v(t) = (2.50) t$ stays non-negative, so the distance travelled equals the displacement. The final velocity, not requested, is $(2.50)(4.00) = 10.0\,\mathrm{m/s}$, and the mean-velocity check is $(0 + 10.0)/2 \times 4.00 = 20.0\,\mathrm{m}$.
:::
:::

::: exercise Stopping distance of a tram {level=2 check="108"}
A tram moving at $18.0\,\mathrm{m/s}$ brakes with constant acceleration $-1.50\,\mathrm{m/s^2}$. Find the distance, in metres, it travels before stopping.
::: solution
Take the positive sense along the initial velocity and the origin at the point where braking begins, so $v_0 = 18.0\,\mathrm{m/s}$, $x_0 = 0$ and $a = -1.50\,\mathrm{m/s^2}$. Stopping means $v = 0$. The time is not needed, so use [[#eq-v2]]:

$$
0 = (18.0)^2 + 2(-1.50)(x - 0), \qquad 3.00\, x = 324, \qquad x = \frac{324}{3.00} = 108\,\mathrm{m}.
$$

Equivalently, $x = (0 - 18.0^2)/(2 \times -1.50) = -324/-3.00 = 108\,\mathrm{m}$. The acceleration is constant by assumption on this interval, and the formula must not be extended past the stop. The time taken, as a check, is $18.0/1.50 = 12.0\,\mathrm{s}$, and the mean velocity $9.00\,\mathrm{m/s}$ times $12.0\,\mathrm{s}$ is $108\,\mathrm{m}$.
:::
:::

::: exercise Time of flight {level=2 check="40/9.8"}
A stone is thrown vertically upward from ground level at $20.0\,\mathrm{m/s}$ and caught at ground level. Take upward as positive and $g = 9.80\,\mathrm{m/s^2}$. Find the time of flight, in seconds.
::: solution
Set $x_0 = 0$, $v_0 = +20.0\,\mathrm{m/s}$ and $a = -9.80\,\mathrm{m/s^2}$. The flight ends at the next instant when $x = 0$. From [[#eq-x-const]],

$$
0 = (20.0)\, t + \frac{1}{2}(-9.80)\, t^2 = t\bigl(20.0 - 4.90\, t\bigr).
$$

Discard $t = 0$, the launch. The return is at

$$
t = \frac{20.0}{4.90} = \frac{40.0}{9.80}\,\mathrm{s}.
$$

The same result is twice the time to the top, and the time to the top is $v_0/g = 20.0/9.80$. The velocity on return is $-20.0\,\mathrm{m/s}$. The numerical value $40/9.8 = 4.08\,\mathrm{s}$ to three significant figures; the exact quotient is the appropriate exact answer.
:::
:::

::: exercise Acceleration, then a coast {level=2 check="33"}
A trolley starts from rest, accelerates at a constant $2.00\,\mathrm{m/s^2}$ for $3.00\,\mathrm{s}$, and then coasts at constant velocity for $4.00\,\mathrm{s}$. Find its final displacement from the start, in metres.
::: solution
Treat the motion as two constant-acceleration pieces, as in [[#ex-stages]]. On the first piece, $v_0 = 0$, $a = 2.00\,\mathrm{m/s^2}$ and the duration is $3.00\,\mathrm{s}$:

$$
v_1 = (2.00)(3.00) = 6.00\,\mathrm{m/s}, \qquad x_1 = \frac{1}{2}(2.00)(3.00)^2 = 9.00\,\mathrm{m}.
$$

On the second piece, $a = 0$, the initial velocity is $6.00\,\mathrm{m/s}$ and the duration is $4.00\,\mathrm{s}$, so the additional displacement is $(6.00)(4.00) = 24.0\,\mathrm{m}$. The final displacement is

$$
9.00 + 24.0 = 33.0\,\mathrm{m}.
$$

A single application of [[#eq-x-const]] with $a = 2.00\,\mathrm{m/s^2}$ over $7.00\,\mathrm{s}$ would give $\frac12(2.00)(49.0) = 49.0\,\mathrm{m}$, which continues the acceleration into the coast and is not the motion described. The time-averaged acceleration is $6.00/7.00\,\mathrm{m/s^2}$, and feeding it to the constant-acceleration formula gives $\frac12 \cdot (6/7) \cdot 49 = 21.0\,\mathrm{m}$, also wrong. The piece-by-piece total $33.0\,\mathrm{m}$ is the one that respects the hypothesis.
:::
:::

::: exercise The mean-speed relation {level=3}
State the hypotheses carefully, and prove that if the acceleration is constant then the displacement during a time $t$ equals the arithmetic mean of the initial and final velocities, multiplied by $t$. Explain, with the particle of [[#ex-cubic]], why the same statement fails when the acceleration is not constant.
::: hint
Start from $v = v_0 + at$ and $x = x_0 + v_0 t + \frac12 a t^2$, and eliminate $a$. For the counterexample, compare $(v(1) + v(3))/2$ with $\Delta x/\Delta t$ on $[1, 3]$.
:::
::: solution
Hypothesis: on the interval from time $0$ to time $t > 0$ the acceleration $a$ is constant, the position at time $0$ is $x_0$, and the velocity at time $0$ is $v_0$. Let $v$ denote the velocity at time $t$. By [[#thm-const-a]],

$$
v = v_0 + a t, \qquad \Delta x = v_0 t + \frac{1}{2} a t^2.
$$

Solve the first equation for $a t$, namely $a t = v - v_0$, and substitute $\frac12 a t^2 = \frac12 (a t)\, t = \frac12 (v - v_0)\, t$ into the displacement:

$$
\Delta x = v_0 t + \frac{1}{2}(v - v_0)\, t = \frac{1}{2}(v_0 + v)\, t = \left(\frac{v_0 + v}{2}\right) t.
$$

That is the mean-speed relation. The proof used constancy of $a$ when it invoked the two formulae; there is no step that would survive an arbitrary $a(t)$.

For the counterexample, take $x(t) = c t^3$ with $c = 1.00\,\mathrm{m/s^3}$, as in [[#ex-cubic]]. Then $v(t) = 3 c t^2$, so $v(1.00) = 3.00\,\mathrm{m/s}$ and $v(3.00) = 27.0\,\mathrm{m/s}$. The arithmetic mean of the endpoint velocities is $15.0\,\mathrm{m/s}$. The true average velocity on the interval is

$$
\frac{x(3.00) - x(1.00)}{3.00 - 1.00} = \frac{26.0}{2.00} = 13.0\,\mathrm{m/s}.
$$

These differ. The acceleration $a(t) = 6 c t$ is not constant on $[1.00, 3.00]$, so the hypothesis is false and the conclusion is not obliged to hold. It does not.
:::
:::

::: exercise A formula used outside its range {level=3}
A particle has velocity $v(t) = b + k t^2$, where $b = 2.00\,\mathrm{m/s}$, $k = 3.00\,\mathrm{m/s^3}$ and $t$ is in seconds, and it passes $x = 0$ at $t = 0$. Find $x(t)$ and $a(t)$. Then, at the instant $t = 1.00\,\mathrm{s}$, compute both sides of the constant-acceleration relation $v^2 = v_0^2 + 2 a (x - x_0)$, using the instantaneous acceleration at that instant on the right-hand side, and show that the two sides are not equal.
::: hint
Integrate $v(t)$ to get $x(t)$. The constant-acceleration relation is not available, because $a(t) = 2 k t$ depends on time. The comparison at $t = 1$ is a numerical illustration of that fact, not a second method of computing $x$.
:::
::: solution
The acceleration is the derivative of the given velocity:

$$
a(t) = \deriv{v}{t} = 2 k t = (6.00\,\mathrm{m/s^3})\, t.
$$

It is not constant. The position is the integral of the velocity, with $x(0) = 0$:

$$
x(t) = \int_0^t \bigl(b + k s^2\bigr)\,\dd s = b t + \frac{1}{3} k t^3.
$$

With the given values, $x(t) = (2.00\,\mathrm{m/s})\, t + (1.00\,\mathrm{m/s^3})\, t^3$. At $t = 1.00\,\mathrm{s}$,

$$
v = 2.00 + 3.00 = 5.00\,\mathrm{m/s}, \qquad x = 2.00 + 1.00 = 3.00\,\mathrm{m}, \qquad a = 6.00\,\mathrm{m/s^2}.
$$

The initial velocity, at $t = 0$, is $v_0 = b = 2.00\,\mathrm{m/s}$, and $x_0 = 0$. The left-hand side of the constant-acceleration relation is

$$
v^2 = (5.00)^2 = 25.0\,\mathrm{m^2/s^2}.
$$

The right-hand side, using the instantaneous $a(1.00)$ as though it had been the constant acceleration all along, is

$$
v_0^2 + 2 a (x - x_0) = (2.00)^2 + 2(6.00)(3.00) = 4.00 + 36.0 = 40.0\,\mathrm{m^2/s^2}.
$$

The two sides differ: $25.0 \neq 40.0$. The differentiation and the integration are correct, and [[#eq-v2]] was applied where its hypothesis is false. A velocity–position relation for this motion has to come from eliminating $t$ between the true $v(t)$ and $x(t)$.
:::
:::
