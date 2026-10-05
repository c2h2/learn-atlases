The Lorentz transformation mixes time with one spatial coordinate. Taken one number at a time, $t$ and $x$ are different in every frame, and neither is a property of a pair of events. What does not change is a particular combination of them. That combination is the squared interval. Once it is in hand, energy and momentum stop being separate conservation laws that happen to look similar, and become two pieces of one object, the four-momentum, whose squared length is the mass.

This chapter keeps the mostly-minus sign: the squared interval is $(c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$. A positive value means a timelike separation. Books that flip the sign will flip every sentence of the form "positive means timelike", and they will write the four-velocity with squared length $-c^2$ rather than $c^2$. The physics is the same only after that translation. We will not switch signs mid-page.

The transformation itself is the one derived in [[relativity/time-and-length]]. Energy, momentum and the prohibition on a velocity-dependent mass are as in [[relativity/velocity-energy]]. The course map is [[relativity]]. The next chapter draws the same algebra as a diagram.

## Events and the interval {#events}

An experiment does not happen "at a time" in the abstract. It happens at a place and a time together. The collision of two particles, the emission of a flash, the reading of a clock hand against a nearby mark: each of these is an event. Coordinates are a labelling of events by an inertial frame, not a replacement for the events.

::: definition Event and interval {#def-interval}
An **event** is a single point of spacetime: one place, at one time. In an inertial frame its coordinates are the four numbers $(ct,\, x,\, y,\, z)$. We write them as $x^\mu$, with $\mu = 0,1,2,3$ and $x^0 = ct$.

For two events, the coordinate differences are $\Delta x^\mu$. The **squared interval** between them, in the mostly-minus convention, is

$$
(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2.
$$ {#eq-interval}

The separation is called **timelike** when $(\Delta s)^2 > 0$, **lightlike** (or null) when $(\Delta s)^2 = 0$, and **spacelike** when $(\Delta s)^2 < 0$.
:::

The symbol $(\Delta s)^2$ is the name of the whole expression, not the square of a number that is obliged to be positive. When the separation is spacelike, $(\Delta s)^2$ is a negative real number and we do not take its square root. When it is timelike and we have chosen which event is earlier along a clock's history, the positive square root is $c$ times a proper time, defined in the next section. When it is lightlike, a light ray in vacuum can pass through both events, and no massive clock can be present at both.

The three labels are about the pair of events, not about a frame. That claim is earned by the invariance proof below, not by the names. Until that proof, "timelike in this frame" would be the careful phrase. After it, the phrase is just "timelike".

A useful reading of [[#eq-interval]] is to compare the time separation with the distance. Set

$$
(\Delta r)^2 = (\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2.
$$

Then $(\Delta s)^2 = (c\Delta t)^2 - (\Delta r)^2$. The light-travel time across the gap is $\Delta r/c$. If the coordinate time $\Delta t$ is longer than that, a signal at speed $c$ or slower can leave the earlier event and arrive at the later one, and the interval is timelike. If $\Delta t$ is shorter, even light cannot make the trip, and the interval is spacelike. If the two times match, the interval is lightlike. This reading uses one frame's coordinates. The invariance theorem says the conclusion does not depend on which inertial frame supplied them.

::: example Two flashes {#ex-flashes}
A flash is emitted at the origin of an inertial frame. A second flash is emitted at $x = 3.00\,\mathrm{m}$, $y = z = 0$, at $t = 20.0\,\mathrm{ns}$. Classify the interval, say which flash is earlier, and find the proper time of an inertial clock that is present at both.
::: solution
The data are given to three significant figures. With $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$,

$$
c\times 20.0\times 10^{-9}\,\mathrm{s} = 5.99584916\,\mathrm{m},
$$

which rounds to $6.00\,\mathrm{m}$. From here we use $c\Delta t = 6.00\,\mathrm{m}$ and $\Delta x = 3.00\,\mathrm{m}$, so that every square stays consistent with that precision. Equation [[#eq-interval]] gives

$$
(\Delta s)^2 = (6.00)^2 - (3.00)^2 = 36.0 - 9.00 = 27.0\,\mathrm{m}^2.
$$

The value is positive, so the interval is timelike. The origin flash is the earlier event in this frame, because $\Delta t > 0$. [[#prop-order]] will say that every inertial frame agrees, which is special to the timelike case: a spacelike pair need not keep its order.

The proper time recorded by an inertial clock present at both flashes is

$$
\Delta\tau = \frac{\sqrt{(\Delta s)^2}}{c} = \frac{\sqrt{27.0}}{c}.
$$

Now $\sqrt{27.0} = 5.19615242\,\mathrm{m}$, so

$$
\Delta\tau = \frac{5.19615242}{2.99792458\times 10^{8}} = 1.73325\times 10^{-8}\,\mathrm{s},
$$

which is $1.73\times 10^{-8}\,\mathrm{s}$ to three significant figures.

The same number comes from time dilation, if the factor $\gamma$ is not rounded too early. The clock that visits both events moves at

$$
\beta = \frac{\Delta x}{c\Delta t} = \frac{3.00}{6.00} = 0.500.
$$

Then $\gamma = 1/\sqrt{1 - 0.500^2} = 1/\sqrt{0.750} = 1.154701$, and $\Delta t/\gamma = 20.0\times 10^{-9}/1.154701 = 1.732\times 10^{-8}\,\mathrm{s}$ when $\Delta t$ is recomputed from the rounded length $c\Delta t = 6.00\,\mathrm{m}$ as $\Delta t = 6.00/c$. The two routes agree. What fails is feeding the three-significant-figure value $\gamma = 1.15$ back into the division: $20.0\,\mathrm{ns}/1.15$ rounds to $1.74\times 10^{-8}\,\mathrm{s}$ and the last digit is an artefact. Keep the interval, or keep $\gamma$ to more digits than the answer.
:::
:::

::: example A spacelike pair {#ex-spacelike}
Two events have $c\Delta t = 3.00\,\mathrm{m}$ and $\Delta x = 5.00\,\mathrm{m}$, with $\Delta y = \Delta z = 0$. Classify the interval. Find the speed of a frame in which the events are simultaneous, and the spatial distance between them in that frame. Then take a boost at $\beta = 0.800$ along the separation and find $c\Delta t'$.
::: solution
The squared interval is

$$
(\Delta s)^2 = (3.00)^2 - (5.00)^2 = 9.00 - 25.0 = -16.0\,\mathrm{m}^2.
$$

It is spacelike. There is no proper time between these events: no clock, and no massive particle, can be present at both, because that would require a speed greater than $c$. The positive quantity built from the interval is the **proper distance**

$$
\ell = \sqrt{ -(\Delta s)^2 } = \sqrt{16.0} = 4.00\,\mathrm{m}.
$$

That is the distance measured in a frame where the two events are simultaneous. Such a frame exists. Boost along $x$ with

$$
\beta = \frac{c\Delta t}{\Delta x} = \frac{3.00}{5.00} = 0.600,
$$

which is less than $1$, as it must be for a spacelike pair. The time transformation $c\Delta t' = \gamma(c\Delta t - \beta\,\Delta x)$ then gives

$$
c\Delta t - \beta\,\Delta x = 3.00 - 0.600\times 5.00 = 0,
$$

so $\Delta t' = 0$. In that frame $(\Delta s)^2 = -(\Delta x')^2$, hence $|\Delta x'| = 4.00\,\mathrm{m}$.

A faster boost reverses the order. At $\beta = 0.800$, $\gamma = 1/\sqrt{1 - 0.640} = 1/0.600 = 5/3$. Then

$$
c\Delta t' = \frac{5}{3}\bigl(3.00 - 0.800\times 5.00\bigr) = \frac{5}{3}(3.00 - 4.00) = -\frac{5}{3}\,\mathrm{m} = -1.67\,\mathrm{m}.
$$

The event that was later in the original frame is earlier in this one. Nothing physical has travelled between them. What changed is which labelling of "earlier" the frame uses. [[#prop-order]] is the general statement.
:::
:::

## Invariance under a boost {#invariance}

A boost in standard configuration, with the primed frame moving at velocity $v = \beta c$ along the positive $x$-axis of the unprimed frame, and with origins coinciding, is

$$
\begin{aligned}
ct' &= \gamma (ct - \beta x), \\
x' &= \gamma (x - \beta\, ct), \\
y' &= y, \\
z' &= z,
\end{aligned}
$$ {#eq-boost}

where $\gamma = 1/\sqrt{1 - \beta^2}$ and $|\beta| < 1$. Differences of coordinates between two events obey the same formulae. An added constant, from a choice of origin, cancels when you subtract. A rotation of the axes can always line the spatial separation up with $x$ before the boost, so it is enough to prove invariance for [[#eq-boost]] and to note that a rotation leaves $(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2$ unchanged.

::: theorem Invariance of the interval {#thm-invariant}
Let two inertial frames be related by [[#eq-boost]]. Then

$$
(c\Delta t')^2 - (\Delta x')^2 - (\Delta y')^2 - (\Delta z')^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2.
$$

In particular, the labels timelike, lightlike and spacelike do not depend on the inertial frame.
:::

::: proof
Because $y' = y$ and $z' = z$, those terms match on the two sides. It remains to check the $t$ and $x$ pieces. Drop the $\Delta$ for a line, and restore it at the end: the algebra is identical for differences. Substitute [[#eq-boost]]:

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\bigl[(ct - \beta x)^2 - (x - \beta\, ct)^2\bigr] \\
&= \gamma^2\bigl[c^2 t^2 - 2\beta\, ct\, x + \beta^2 x^2 - x^2 + 2\beta\, x\, ct - \beta^2 c^2 t^2\bigr] \\
&= \gamma^2\bigl[(1 - \beta^2)c^2 t^2 - (1 - \beta^2)x^2\bigr] \\
&= \gamma^2(1 - \beta^2)\bigl[(ct)^2 - x^2\bigr].
\end{aligned}
$$

The prefactor is $1$, because $\gamma^2 = 1/(1 - \beta^2)$. Therefore $(ct')^2 - (x')^2 = (ct)^2 - x^2$. Adding the unchanged $-y^2 - z^2$ gives the interval. The sign of $(\Delta s)^2$ is the same in both frames, and a zero stays zero, so the three labels are invariant. The same identity holds for any finite pair of events, since only differences entered.
:::

The inverse of [[#eq-boost]] is the boost with $\beta$ replaced by $-\beta$. Physically, if $S'$ moves at $+v$ relative to $S$, then $S$ moves at $-v$ relative to $S'$. Algebraically,

$$
ct = \gamma(ct' + \beta x'), \qquad x = \gamma(x' + \beta\, ct'),
$$ {#eq-inverse}

and substituting one pair into the other returns the original coordinates, again because $\gamma^2(1 - \beta^2) = 1$. Four-momentum will use this inverse when a decay is known in the rest frame and wanted in the laboratory.

::: proposition Order of timelike events {#prop-order}
Suppose $(\Delta s)^2 > 0$ and $\Delta t > 0$. Then $\Delta t' > 0$ in every inertial frame related to the first by a boost of speed less than $c$. The earlier event stays earlier.

Suppose instead $(\Delta s)^2 < 0$. Then there is an inertial frame in which the two events are simultaneous, and there are inertial frames in which either event comes first.
:::

::: proof
The time part of a general boost of velocity $\mathbf{v}$ is

$$
\Delta t' = \gamma\left(\Delta t - \frac{\mathbf{v}\cdot\Delta\mathbf{r}}{c^2}\right),
$$

with $\gamma > 0$. The absolute value $|\mathbf{v}\cdot\Delta\mathbf{r}|$ is at most $v\,|\Delta\mathbf{r}|$.

If the interval is timelike, $|\Delta\mathbf{r}| < c\,|\Delta t|$. Then

$$
\left|\frac{\mathbf{v}\cdot\Delta\mathbf{r}}{c^2}\right| \le \frac{v}{c}\,\frac{|\Delta\mathbf{r}|}{c} < \frac{v}{c}\,|\Delta t| < |\Delta t|,
$$

the last step because $v < c$. The term subtracted from $\Delta t$ is strictly smaller than $|\Delta t|$, so $\Delta t'$ has the same sign as $\Delta t$.

If the interval is lightlike, $|\Delta\mathbf{r}| = c\,|\Delta t|$, and the same bound gives a subtraction strictly smaller than $|\Delta t|$ as soon as $v < c$. Lightlike order is preserved as well. There is still no frame in which a lightlike pair is simultaneous, because that would need $v = c$.

If the interval is spacelike, $|\Delta\mathbf{r}| > c\,|\Delta t|$. Align $\mathbf{v}$ with $\Delta\mathbf{r}$ and choose

$$
v = \frac{c^2\,|\Delta t|}{|\Delta\mathbf{r}|}.
$$

This speed is less than $c$. The subtraction $\mathbf{v}\cdot\Delta\mathbf{r}/c^2$ then equals $\Delta t$ exactly when $\mathbf{v}$ points so as to cancel a positive $\Delta t$, and $\Delta t' = 0$. Any larger subluminal speed in that same direction makes the subtraction bigger than $\Delta t$ and reverses the sign. [[#ex-spacelike]] is this construction with numbers.
:::

::: quiz
Two events have $(\Delta s)^2 = -4.00\,\mathrm{m}^2$ in the mostly-minus convention of this chapter. Which statement is right?
- [ ] The separation is timelike, and every inertial frame agrees on which event is earlier.
- [ ] The separation is lightlike, so a light ray can connect the events.
- [x] The separation is spacelike. Some inertial frames reverse the time order, and no massive clock is present at both events.
- [ ] The sign of $(\Delta s)^2$ depends on the frame, so the classification cannot be trusted.
::: solution
A negative squared interval is spacelike, by [[#def-interval]]. [[#thm-invariant]] says the sign is the same in every inertial frame, and [[#prop-order]] says a spacelike pair has frames with either time order, including a frame in which the events are simultaneous. A lightlike pair would have $(\Delta s)^2 = 0$. A timelike pair would have a positive square and a preserved order. The wrong options each confuse either the sign or the invariance.
:::
:::

## Proper time and four-velocity {#four-velocity}

The interval between two events is a property of the pair. A clock has a whole history, a curve of events called its worldline. The time the clock actually records is an integral along that curve, not the coordinate time of one frame, and not, for a curved worldline, the interval between the endpoints alone.

::: definition Proper time {#def-proper-time}
Along a worldline that is timelike at every instant, the **proper time** $\tau$ is the time recorded by a clock that follows that worldline. Between neighbouring events on the curve,

$$
(c\,\dd\tau)^2 = (c\,\dd t)^2 - \dd x^2 - \dd y^2 - \dd z^2,
$$ {#eq-dtau}

with $\dd\tau > 0$ when $\dd t > 0$. If the clock's velocity in the frame is $\mathbf{v}(t)$, this is equivalent to $\dd\tau = \dd t/\gamma$, where $\gamma = 1/\sqrt{1 - v^2/c^2}$ is computed from the instantaneous speed.
:::

::: proposition Proper time and gamma {#prop-dtau}
On a timelike worldline, $\dd\tau = \dd t/\gamma$ with the instantaneous $\gamma$. Between two events on an inertial worldline, the proper time is $\Delta\tau = \sqrt{(\Delta s)^2}/c$, and it equals $\Delta t/\gamma$ with the constant $\gamma$ of that straight motion. On a worldline that is not straight, $\int \dd\tau$ is still the clock reading, but it is smaller than the proper time of the inertial trip between the same endpoints. The comparison is proved in [[relativity/spacetime]].
:::

::: proof
Insert $\dd x = v_x\,\dd t$ and its partners into [[#eq-dtau]]:

$$
(c\,\dd\tau)^2 = c^2\dd t^2 - v^2\dd t^2 = c^2\dd t^2\left(1 - \frac{v^2}{c^2}\right) = \frac{c^2\dd t^2}{\gamma^2}.
$$

Both $\dd\tau$ and $\dd t$ are positive for a future-directed piece of the worldline, so $\dd\tau = \dd t/\gamma$. If the motion is inertial, $v$ is constant, the coordinate differences between the endpoints satisfy $(c\Delta\tau)^2 = (c\Delta t)^2 - (\Delta r)^2 = (\Delta s)^2$, and $\Delta\tau = \Delta t/\gamma$. The integral $\int\dd t/\gamma$ along a non-straight path is a different number. It depends on the path. The interval between the endpoints does not. They agree only for the inertial path, which is why [[#ex-flashes]] had to say "an inertial clock".
:::

A four-vector is any quartet $A^\mu$ that transforms, under a change of inertial frame, by the same rule as $\Delta x^\mu$. In particular, under [[#eq-boost]],

$$
A'^0 = \gamma(A^0 - \beta A^1), \qquad A'^1 = \gamma(A^1 - \beta A^0), \qquad A'^2 = A^2, \qquad A'^3 = A^3.
$$

By the same algebra as [[#thm-invariant]], the squared length

$$
A\cdot A = (A^0)^2 - (A^1)^2 - (A^2)^2 - (A^3)^2
$$ {#eq-dot}

is the same number in every inertial frame. The inner product of two four-vectors,

$$
A\cdot B = A^0 B^0 - A^1 B^1 - A^2 B^2 - A^3 B^3,
$$

is invariant as well. One way to see it is to expand $(A+B)\cdot(A+B) = A\cdot A + B\cdot B + 2\,A\cdot B$. Each squared length is invariant, so the cross term is invariant. This is the product we mean whenever a four-vector is dotted with a four-vector in this chapter. It is not the Euclidean dot product. The spatial minus signs are the whole of the convention.

::: definition Four-velocity {#def-four-velocity}
On a timelike worldline parametrised by its proper time, the **four-velocity** is

$$
U^\mu = \frac{\dd x^\mu}{\dd\tau}.
$$ {#eq-U-def}

In components, if the ordinary velocity is $\mathbf{v}$,

$$
U^\mu = (\gamma c,\, \gamma\mathbf{v}).
$$ {#eq-U-comp}
:::

There is no four-velocity of this kind for a light ray. Along a lightlike worldline $\dd\tau = 0$, and [[#eq-U-def]] would divide by zero. A photon has a four-momentum, defined below, but it does not have a rest frame and it does not have a $U^\mu$.

::: theorem Norm of the four-velocity {#thm-u-square}
For the four-velocity of any timelike worldline, $U\cdot U = c^2$.
:::

::: proof
By [[#eq-dtau]] and [[#eq-U-def]],

$$
U\cdot U = \frac{(c\,\dd t)^2 - \dd x^2 - \dd y^2 - \dd z^2}{(\dd\tau)^2} = \frac{(c\,\dd\tau)^2}{(\dd\tau)^2} = c^2.
$$

The component form gives the same result. From [[#prop-dtau]], $\dd t/\dd\tau = \gamma$ and $\dd\mathbf{r}/\dd\tau = \gamma\mathbf{v}$, which is [[#eq-U-comp]]. Then

$$
U\cdot U = \gamma^2 c^2 - \gamma^2 v^2 = \gamma^2 c^2\left(1 - \frac{v^2}{c^2}\right) = c^2,
$$

since $\gamma^2(1 - v^2/c^2) = 1$. The identity holds at each instant even when $\mathbf{v}$ is changing, because only the instantaneous differentials entered.
:::

::: intuition The hyperbola, not the circle
In units $c = 1$, the events at proper time $1$ from the origin lie on $(ct)^2 - x^2 = 1$, so $ct = \sqrt{1 + x^2}$ in the future. A Euclidean circle of radius $1$ would be $ct = \sqrt{1 - x^2}$. The two formulae differ by one sign, and the curves bend opposite ways. A boost slides an event along the hyperbola. It cannot move the event onto a different hyperbola, because that would change the interval, and [[#thm-invariant]] forbids the change. The figure below draws both curves on the same window so the contrast is visible. The arch that meets the horizontal axis is the circle. The curve that stays at or above height $1$ is the hyperbola.
:::

::: widget plot
f: sqrt(1-x^2); sqrt(1+x^2)
x: -1, 1
caption: Vertical axis read as ct, horizontal as x, in units c = 1, for |x| ≤ 1. The arch meeting the x-axis is the Euclidean semicircle ct = sqrt(1 − x²). The curve sitting on and above ct = 1 is the hyperbola ct = sqrt(1 + x²), the events one unit of proper time from the origin, because (ct)² − x² = 1. The hyperbola is the twin of the circle: adding x² closes a circle, subtracting x² opens the interval. There is no slider; compare the two bends. The hyperbola continues past |x| = 1, outside this window.
:::

A boost can be parametrised by a single number that adds when boosts are composed. The **rapidity** $\phi$ of a speed $v = \beta c$ along $x$ is defined by $\beta = \tanh\phi$, or $\phi = \mathrm{artanh}\,\beta$. Then $\gamma = \cosh\phi$ and $\gamma\beta = \sinh\phi$, because $\cosh^2\phi - \sinh^2\phi = 1$ is the same algebra as $\gamma^2 - \gamma^2\beta^2 = 1$, and the ratio of sinh to cosh is $\beta$. The four-velocity along $x$ is

$$
U^\mu = (c\cosh\phi,\, c\sinh\phi,\, 0,\, 0),
$$

and $U\cdot U = c^2(\cosh^2\phi - \sinh^2\phi) = c^2$ is [[#thm-u-square]] again. For $\beta = 0.600$, $(1+\beta)/(1-\beta) = 1.600/0.400 = 4$, so $\phi = \tfrac12\ln 4 = \ln 2 = 0.693147$. And $\cosh(\ln 2) = (2 + 1/2)/2 = 5/4 = 1.25$, which is $\gamma$ for $0.600c$.

Collinear boosts add rapidities. The addition formula

$$
\tanh(\phi_1 + \phi_2) = \frac{\tanh\phi_1 + \tanh\phi_2}{1 + \tanh\phi_1\,\tanh\phi_2}
$$

is the Einstein velocity addition of [[relativity/velocity-energy]], because $\beta = \tanh\phi$. Two successive boosts at $\beta = 0.600$ have $\phi = 2\ln 2$ and

$$
\beta = \frac{0.600 + 0.600}{1 + 0.600\times 0.600} = \frac{1.200}{1.360} = \frac{15}{17} = 0.882353,
$$

which is $\tanh(2\ln 2) = (4 - 1/4)/(4 + 1/4) = 15/17$. The angle a protractor measures on a spacetime diagram is not this $\phi$. The diagram chapter keeps them apart.

## Four-momentum {#four-momentum}

Newtonian momentum is $m\mathbf{v}$, and it is conserved in the absence of external force. At speeds comparable to $c$ that expression is not conserved in every inertial frame if $m$ is the mass you measure at rest. The repair, from [[relativity/velocity-energy]], is to put $\gamma$ next to $m\mathbf{v}$ and to treat the energy $\gamma m c^2$ as the time-component that the boost mixes with momentum. Four-vectors are that repair written as one object.

::: definition Four-momentum {#def-four-momentum}
A particle of invariant mass $m > 0$ has **four-momentum**

$$
p^\mu = m U^\mu = \left(\frac{E}{c},\, \mathbf{p}\right),
$$ {#eq-p-def}

where $E = \gamma m c^2$ is the energy and $\mathbf{p} = \gamma m\mathbf{v}$ is the momentum. The mass $m$ is the same number in every inertial frame. It is not $\gamma m$.
:::

The mass in [[#eq-p-def]] is the rest mass, also called the invariant mass. Older texts sometimes define a "relativistic mass" $\gamma m$ so that momentum looks like mass times velocity. We do not. That product already has a name: it is $p$. Giving it a second name makes $m$ look frame-dependent, and then $E = mc^2$ becomes ambiguous about which $m$ is meant. In this chapter $m$ is fixed, $E = \gamma m c^2$, and $\mathbf{p} = \gamma m\mathbf{v}$.

::: theorem Mass shell {#thm-mass-shell}
The four-momentum of a particle of invariant mass $m$ satisfies

$$
p\cdot p = m^2 c^2,
$$

which in energy and momentum is

$$
E^2 - p^2 c^2 = m^2 c^4.
$$ {#eq-shell}

A massless particle, in particular a photon in vacuum, has $m = 0$ and $E = pc$, but it is not described by $p^\mu = m U^\mu$.
:::

::: proof
For $m > 0$, [[#def-four-momentum]] and [[#thm-u-square]] give $p\cdot p = m^2\, U\cdot U = m^2 c^2$. Writing $p^0 = E/c$ and $p^2 = \mathbf{p}\cdot\mathbf{p}$ in the spatial Euclidean sense,

$$
\left(\frac{E}{c}\right)^2 - p^2 = m^2 c^2.
$$

Multiply through by $c^2$ to reach [[#eq-shell]]. Every step used invariant quantities or a definition, so the relation holds in every inertial frame. It is one constraint on $(E, \mathbf{p})$, not two independent facts.

For $m = 0$ the four-velocity is undefined, so the route through $U^\mu$ is closed. The relation $E = pc$ is the $m = 0$ case of [[#eq-shell]], taken as the description of a lightlike four-momentum. It matches $E = hf$ and $p = h/\lambda$ for a photon, since $f\lambda = c$, but the wave relation is not needed to use the shell.
:::

Kinetic energy is the energy above the rest energy,

$$
K = E - mc^2 = (\gamma - 1)mc^2,
$$

as in [[relativity/velocity-energy]]. It is never $\gamma mc^2$, and it is $\tfrac12 mv^2$ only in the low-speed expansion. The mass shell rearranges to a practical square root: if you know $E$ and $m$, then $pc = \sqrt{E^2 - m^2 c^4}$, taking the positive root for the magnitude.

::: example A particle at 0.800 c {#ex-moving}
A particle has rest energy $mc^2 = 300\,\mathrm{MeV}$ and speed $0.800c$. Find $E$ and $pc$, and check the mass shell.
::: solution
The Lorentz factor at $\beta = 0.800$ is

$$
\gamma = \frac{1}{\sqrt{1 - 0.800^2}} = \frac{1}{\sqrt{0.360}} = \frac{1}{0.600} = \frac{5}{3}.
$$

Energy and momentum then follow from [[#def-four-momentum]]:

$$
E = \gamma mc^2 = \frac{5}{3}\times 300\,\mathrm{MeV} = 500\,\mathrm{MeV},
$$

$$
pc = \gamma mc^2\cdot\beta = \frac{5}{3}\times 300\times 0.800\,\mathrm{MeV} = 400\,\mathrm{MeV}.
$$

The mass shell [[#eq-shell]] reads

$$
E^2 - (pc)^2 = 500^2 - 400^2 = 250000 - 160000 = 90000 = 300^2 = (mc^2)^2.
$$

It holds exactly for these values, not merely to three significant figures. The four-momentum in energy units is $(E, pc) = (500, 400)\,\mathrm{MeV}$ along the direction of motion. Its mostly-minus square is $(mc^2)^2$, not $E^2$ and not $(pc)^2$.
:::
:::

::: warning The sign, and the mass you are not allowed to redefine
This chapter uses $(\Delta s)^2 = (c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$. A positive square means timelike. A book that writes $(\Delta x)^2 - (c\Delta t)^2$ will call a positive square spacelike, and it will quote $p\cdot p = -m^2 c^2$. Translate the sign before comparing formulae. Do not translate half the formulae and leave the rest.

The invariant is $(\Delta s)^2$, or $E^2 - p^2 c^2$. It is not $\Delta t$, and it is not $\Delta x$. Both of those change under [[#eq-boost]].

Do not introduce a relativistic mass $\gamma m$. The factor $\gamma$ belongs in $E = \gamma mc^2$ and in $\mathbf{p} = \gamma m\mathbf{v}$. The symbol $m$ is the invariant mass on the mass shell. A photon has $m = 0$ and still has energy. That sentence is impossible if mass means $E/c^2$.
:::

## Invariants in collisions {#collisions}

In Newtonian mechanics an isolated system conserves the vector sum of $m\mathbf{v}$, and, if the collisions are elastic, the sum of $\tfrac12 mv^2$. Relativistically the single statement that replaces both, elastic or not, is conservation of four-momentum. Elasticity is the extra demand that the set of rest masses is the same before and after. An inelastic collision may change the rest masses. It may not change the total four-momentum.

We take that conservation law as the dynamical input, in the same sense that [[mechanics/momentum]] takes Newtonian conservation as the consequence of Newton's third law for an isolated system. What can be proved, rather than postulated, is that the law is consistent across frames, and that the squared length of the total four-momentum is a mass one can compute in any frame one likes.

::: theorem Conservation is frame-independent {#thm-conserve}
Suppose a process among a finite set of particles conserves the total four-momentum in one inertial frame: the sum of $p^\mu$ before the process equals the sum after. Then the sums are equal in every inertial frame.
:::

::: proof
A Lorentz transformation $\Lambda$ acts linearly on each four-momentum, and it acts the same way on every particle. If $\sum_i p_i^\mu = \sum_j q_j^\mu$ in the first frame, apply $\Lambda$ to both sides:

$$
\sum_i (\Lambda p_i)^\mu = \Lambda\left(\sum_i p_i\right)^\mu = \Lambda\left(\sum_j q_j\right)^\mu = \sum_j (\Lambda q_j)^\mu.
$$

The transformed totals match. Invariance of the inner product was not required for this step. Linearity was enough. The squared length of the total is then the same number before and after, and the same number in every frame, because it is $P\cdot P$ for $P^\mu = \sum p_i^\mu$.
:::

Define the **invariant mass** $M$ of a system by

$$
(Mc^2)^2 = E_{\mathrm{tot}}^2 - p_{\mathrm{tot}}^2 c^2,
$$ {#eq-Minv}

taking $M \ge 0$. For a single particle this $M$ is the $m$ of [[#eq-shell]]. For several particles it is not the sum of their masses, unless they are all at rest relative to one another.

::: proposition Invariant mass and the sum of masses {#prop-mass-sum}
Let two particles have invariant masses $m_1 > 0$ and $m_2 > 0$, and future-directed four-momenta. The invariant mass $M$ of the pair satisfies $M \ge m_1 + m_2$, with equality if and only if the two particles are at rest relative to each other.
:::

::: proof
Work in the rest frame of particle $1$, which exists because $m_1 > 0$. There $E_1 = m_1 c^2$ and $\mathbf{p}_1 = 0$. Particle $2$ has energy $E_2 \ge m_2 c^2$, with equality exactly when it is at rest in this same frame. The totals are $E = E_1 + E_2$ and $\mathbf{p} = \mathbf{p}_2$. Then

$$
\begin{aligned}
(Mc^2)^2 &= (m_1 c^2 + E_2)^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + 2 m_1 c^2 E_2 + E_2^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + m_2^2 c^4 + 2 m_1 c^2 E_2,
\end{aligned}
$$

where $E_2^2 - p_2^2 c^2 = m_2^2 c^4$ was used. Since $E_2 \ge m_2 c^2$,

$$
(Mc^2)^2 \ge m_1^2 c^4 + m_2^2 c^4 + 2 m_1 m_2 c^4 = (m_1 + m_2)^2 c^4,
$$

so $M \ge m_1 + m_2$. Equality holds precisely when $E_2 = m_2 c^2$, that is, when particle $2$ is at rest beside particle $1$. The left-hand side is an invariant, so the inequality is not an artefact of the frame we chose for the arithmetic.
:::

A decay is the same identity run backwards. A single particle of mass $M$ is a system whose invariant mass is $M$. It cannot decay into pieces whose rest masses sum to more than $M$. If the pieces are two particles of equal mass $m$, then $M \ge 2m$, and the momentum in the rest frame is fixed by the shell.

Consider a parent of mass $M$ at rest, decaying to two particles of equal mass $m$, with $M \ge 2m$. Conservation of momentum forces the daughters to emerge back to back with equal magnitudes: $\mathbf{p}$ and $-\mathbf{p}$. Conservation of energy forces $E_1 + E_2 = Mc^2$. Equal masses and equal $|p|$ force $E_1 = E_2$, because the shell makes $E$ a function of $|p|$ and $m$ only. Therefore each daughter has

$$
E = \frac{1}{2} Mc^2.
$$

The shell then gives

$$
(pc)^2 = E^2 - m^2 c^4 = \frac{1}{4}(Mc^2)^2 - (mc^2)^2 = \frac{c^4}{4}(M^2 - 4m^2),
$$

so

$$
|p| = \frac{c}{2}\sqrt{M^2 - 4m^2}, \qquad pc = \frac{1}{2}\sqrt{(Mc^2)^2 - 4(mc^2)^2}.
$$ {#eq-decay-p}

If $M = 2m$, then $p = 0$ and each daughter sits at rest, with $E = mc^2$. If $M < 2m$, the expression under the square root is negative. No real momentum satisfies both conservation and the two mass shells. The decay is kinematically forbidden, whatever the interaction would like to do.

::: example A two-body decay {#ex-decay}
A particle of rest energy $Mc^2 = 1000\,\mathrm{MeV}$ decays at rest into two particles, each of rest energy $mc^2 = 400\,\mathrm{MeV}$. Find the energy and the momentum of each daughter in the rest frame, and check the mass shell.
::: solution
The parent is at rest, so each daughter carries half the energy:

$$
E = \frac{1000}{2} = 500\,\mathrm{MeV}.
$$

Equation [[#eq-decay-p]], or the shell directly, gives

$$
pc = \sqrt{500^2 - 400^2} = \sqrt{250000 - 160000} = \sqrt{90000} = 300\,\mathrm{MeV}.
$$

The two momenta are opposite. Their common magnitude is $|p| = (c/2)\sqrt{M^2 - 4m^2}$. In energy units that is

$$
\frac{1}{2}\sqrt{1000^2 - 4\times 400^2} = \frac{1}{2}\sqrt{1000000 - 640000} = \frac{1}{2}\sqrt{360000} = \frac{1}{2}\times 600 = 300\,\mathrm{MeV},
$$

the same value. The mass-shell check asked for by the arithmetic is

$$
500^2 - 300^2 = 250000 - 90000 = 160000 = 400^2.
$$

Each daughter moves at $v/c = pc/E = 300/500 = 0.600$, and $\gamma = E/(mc^2) = 500/400 = 1.25$, which is $1/\sqrt{1 - 0.600^2}$. The direction of the pair is not fixed by conservation. The rest frame is isotropic. Any axis may be called $x$.

The threshold case $M = 2m$ would give $pc = 0$. Here $1000 > 800$, so the daughters are produced in motion. A parent with rest energy $700\,\mathrm{MeV}$ could not decay into these two daughters: $700 < 400 + 400$, which [[#prop-mass-sum]] forbids.
:::
:::

::: example The same decay in the laboratory {#ex-lab}
Take the decay of [[#ex-decay]], with the daughters emitted along the $x$-axis in the parent's rest frame $S'$. Let $S'$ move at $\beta = 0.600$ in the positive $x$ direction of the lab frame $S$. Find each daughter's lab energy and momentum, and check that the total four-momentum matches the parent's and that each daughter stays on its mass shell.
::: solution
The inverse boost [[#eq-inverse]], applied to $(E/c, p_x)$ in the same way as to $(ct, x)$, is

$$
E = \gamma(E' + \beta\, p'_x c), \qquad p_x c = \gamma(p'_x c + \beta E'),
$$

with $\gamma = 1.25$ and $\beta = 0.600$. In $S'$ the forward daughter has $E' = 500\,\mathrm{MeV}$ and $p'c = +300\,\mathrm{MeV}$, so

$$
\begin{aligned}
E_+ &= 1.25\bigl(500 + 0.600\times 300\bigr) = 1.25\times 680 = 850\,\mathrm{MeV}, \\
(pc)_+ &= 1.25\bigl(300 + 0.600\times 500\bigr) = 1.25\times 600 = 750\,\mathrm{MeV}.
\end{aligned}
$$

The backward daughter has $p'c = -300\,\mathrm{MeV}$, so

$$
\begin{aligned}
E_- &= 1.25\bigl(500 - 0.600\times 300\bigr) = 1.25\times 320 = 400\,\mathrm{MeV}, \\
(pc)_- &= 1.25\bigl(-300 + 0.600\times 500\bigr) = 1.25\times 0 = 0.
\end{aligned}
$$

The backward daughter is at rest in the lab. That is a feature of these numbers: its speed in $S'$ is $0.600c$, equal to the parent's speed, so the backward velocity addition cancels. It is not a general rule that one daughter stops.

Each shell still holds. For the forward daughter,

$$
850^2 - 750^2 = (850 - 750)(850 + 750) = 100\times 1600 = 160000 = 400^2.
$$

For the backward daughter, $400^2 - 0^2 = 160000 = 400^2$. The lab totals are

$$
E_+ + E_- = 850 + 400 = 1250\,\mathrm{MeV}, \qquad (pc)_+ + (pc)_- = 750.
$$

The parent itself, moving at $\beta = 0.600$ with rest energy $1000\,\mathrm{MeV}$, has

$$
E = 1.25\times 1000 = 1250\,\mathrm{MeV}, \qquad pc = 1.25\times 1000\times 0.600 = 750\,\mathrm{MeV}.
$$

The totals match, which is [[#thm-conserve]] in numbers. The invariant mass of the pair of daughters is

$$
\sqrt{1250^2 - 750^2} = \sqrt{(1250 - 750)(1250 + 750)} = \sqrt{500\times 2000} = \sqrt{1000000} = 1000\,\mathrm{MeV},
$$

the parent's rest energy, not $400 + 400 = 800\,\mathrm{MeV}$. The daughters' kinetic energy in the rest frame is part of $M$, not an extra on top of a sum of rest masses.
:::
:::

::: example Invariant mass of a collision {#ex-collision}
A particle of energy $1000\,\mathrm{MeV}$ and momentum $pc = 800\,\mathrm{MeV}$ strikes a particle at rest whose rest energy is $700\,\mathrm{MeV}$. Find the projectile's rest energy and the invariant mass energy of the two-particle system.
::: solution
The projectile's own shell fixes its rest energy before anything about the collision is used:

$$
mc^2 = \sqrt{1000^2 - 800^2} = \sqrt{1000000 - 640000} = \sqrt{360000} = 600\,\mathrm{MeV}.
$$

The target contributes $E = 700\,\mathrm{MeV}$ and no momentum. The totals are $E_{\mathrm{tot}} = 1700\,\mathrm{MeV}$ and $p_{\mathrm{tot}}c = 800\,\mathrm{MeV}$. Equation [[#eq-Minv]] gives

$$
Mc^2 = \sqrt{1700^2 - 800^2} = \sqrt{2890000 - 640000} = \sqrt{2250000} = 1500\,\mathrm{MeV}.
$$

The sum of the rest energies is $600 + 700 = 1300\,\mathrm{MeV}$, and $1500 > 1300$, in agreement with [[#prop-mass-sum]]. The difference, $200\,\mathrm{MeV}$, is kinetic energy available in the centre-of-momentum frame, where the total momentum vanishes and the total energy is $Mc^2$ itself. Whether a particular new particle can be produced is a question about whether the final rest masses fit under this $1500\,\mathrm{MeV}$, not about whether the beam energy alone exceeds one rest energy. The beam energy is frame-dependent. The $1500\,\mathrm{MeV}$ is not.
:::
:::

::: history Minkowski's lecture
Hermann Minkowski delivered the lecture "Raum und Zeit" in Cologne on 21 September 1908. There he set special relativity in geometric language: events as points, and a single invariant interval in place of a separate space and a separate time. The electromagnetic field tensor belongs to that same circle of his work. It is not in the June 1905 paper. Einstein's "Zur Elektrodynamik bewegter Körper" derives the transformation and the kinematics; it does not develop four-vectors. The four-velocity and the four-momentum are the later packaging of energy and momentum that makes [[#eq-shell]] look like the squared length it is.
:::

## Where this leads {#leads}

[[relativity/spacetime]] draws the interval on a diagram. The hyperbola of this chapter becomes the curve of constant proper time, the lightlike condition becomes a pair of lines at $45^\circ$, and the order statements of [[#prop-order]] become pictures of what can cause what. The twin effect is the inequality between $\int\dd\tau$ along two worldlines with the same endpoints, which was stated and not proved here.

The mass shell is the kinematic half of particle physics. Dynamical questions, cross sections and which decays the interactions actually allow, need more than $E^2 - p^2 c^2$. They cannot need less: a decay that violates [[#prop-mass-sum]] does not happen. Electrodynamics in four-vector form, including the field tensor Minkowski introduced, is taken up in [[electrodynamics]] once the charges and fields of the earlier courses are in place.

::: summary
- An event has coordinates $(ct, x, y, z)$. The squared interval $(\Delta s)^2 = (c\Delta t)^2 - (\Delta r)^2$ uses the mostly-minus sign. Positive means timelike, zero lightlike, negative spacelike.
- The interval is invariant under the Lorentz transformation. Timelike and lightlike order is the same in every inertial frame. Spacelike order is not, and there is a frame in which a spacelike pair is simultaneous.
- Proper time along a timelike worldline satisfies $(c\,\dd\tau)^2 = (c\,\dd t)^2 - \dd r^2$, so $\dd\tau = \dd t/\gamma$. Between two events, $\sqrt{(\Delta s)^2}/c$ is the proper time only for an inertial clock present at both.
- The four-velocity $U^\mu = \dd x^\mu/\dd\tau = (\gamma c, \gamma\mathbf{v})$ has $U\cdot U = c^2$. It is not defined for light.
- The four-momentum is $p^\mu = m U^\mu = (E/c, \mathbf{p})$ with $m$ the invariant mass, $E = \gamma mc^2$ and $\mathbf{p} = \gamma m\mathbf{v}$. The shell is $E^2 - p^2 c^2 = m^2 c^4$. There is no relativistic mass $\gamma m$ in these formulae.
- Total four-momentum is conserved in an isolated process in every inertial frame if it is conserved in one. The invariant mass of a system is not the sum of the rest masses unless the particles are relatively at rest, and it cannot be smaller than that sum.
- In the rest frame of a parent of rest energy $1000\,\mathrm{MeV}$ decaying to two particles of rest energy $400\,\mathrm{MeV}$, each daughter has $E = 500\,\mathrm{MeV}$ and $pc = 300\,\mathrm{MeV}$, and $500^2 - 300^2 = 400^2$.
:::

## Exercises {#exercises}

::: exercise Squared interval {level=1 check="36"}
Two events are separated by $c\Delta t = 10.0\,\mathrm{m}$ and $\Delta x = 8.00\,\mathrm{m}$, with $\Delta y = \Delta z = 0$. Find $(\Delta s)^2$ in $\mathrm{m}^2$.
::: solution
Use [[#eq-interval]] with the mostly-minus sign, time term first:

$$
(\Delta s)^2 = (10.0)^2 - (8.00)^2 = 100 - 64.0 = 36.0\,\mathrm{m}^2.
$$

The square is positive, so the separation is timelike. The proper time of an inertial clock present at both events would be $\sqrt{36.0}/c = 6.00/c = 2.00\times 10^{-8}\,\mathrm{s}$ to three significant figures, since $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$ and $6/c = 2.0014\times 10^{-8}\,\mathrm{s}$. The question asked only for the squared interval. A sign error, putting $(\Delta x)^2$ first, produces $-36.0\,\mathrm{m}^2$ and would classify the pair as spacelike. That is the other convention, not this one.
:::
:::

::: exercise Momentum from the shell {level=1 check="1200"}
A particle has rest energy $500\,\mathrm{MeV}$ and total energy $1300\,\mathrm{MeV}$. Find $pc$ in MeV.
::: solution
The mass shell [[#eq-shell]] fixes the momentum once $E$ and $m$ are known:

$$
pc = \sqrt{E^2 - (mc^2)^2} = \sqrt{1300^2 - 500^2} = \sqrt{1690000 - 250000} = \sqrt{1440000} = 1200\,\mathrm{MeV}.
$$

The positive root is the magnitude. As a check of the factors, $v/c = pc/E = 1200/1300 = 12/13$ and $\gamma = E/(mc^2) = 1300/500 = 13/5 = 2.60$. Then

$$
1 - \left(\frac{12}{13}\right)^2 = 1 - \frac{144}{169} = \frac{25}{169}, \qquad \sqrt{1 - \beta^2} = \frac{5}{13},
$$

so $1/\sqrt{1 - \beta^2} = 13/5$, matching $\gamma$. The arithmetic is a $5$-$12$-$13$ triangle scaled by $100\,\mathrm{MeV}$. Subtracting in the wrong order under the square root gives a negative number and usually means the rest energy was larger than the total energy, which cannot happen for a free particle.
:::
:::

::: exercise Lorentz factor at 0.600 c {level=1 check="5/4"}
Find $\gamma$ for a particle moving at $v = 0.600c$.
::: solution
By definition,

$$
\gamma = \frac{1}{\sqrt{1 - \beta^2}} = \frac{1}{\sqrt{1 - 0.600^2}} = \frac{1}{\sqrt{1 - 0.360}} = \frac{1}{\sqrt{0.640}} = \frac{1}{0.800} = 1.25 = \frac{5}{4}.
$$

The exact value is $5/4$. The four-velocity has time-component $\gamma c = (5/4)c$ and spatial component $\gamma v = (5/4)(0.600)c = 0.750c$, and

$$
(\gamma c)^2 - (\gamma v)^2 = c^2\left[\left(\frac{5}{4}\right)^2 - \left(\frac{3}{4}\right)^2\right] = c^2\left(\frac{25}{16} - \frac{9}{16}\right) = c^2,
$$

which is [[#thm-u-square]]. At this speed the rapidity is $\ln 2$, not the angle whose tangent is $0.600$.
:::
:::

::: exercise A frame of simultaneity {level=2 check="3/5"}
Two events have $c\Delta t = 9.00\,\mathrm{m}$ and $\Delta x = 15.0\,\mathrm{m}$, with no separation in $y$ or $z$. Find $v/c$ for an inertial frame in which the events are simultaneous.
::: solution
First classify. $(\Delta s)^2 = 9.00^2 - 15.0^2 = 81.0 - 225 = -144\,\mathrm{m}^2$, so the pair is spacelike and a simultaneity frame exists. Align the boost with the separation. From the proof of [[#prop-order]], the speed that cancels $\Delta t$ is

$$
\beta = \frac{c\Delta t}{\Delta x} = \frac{9.00}{15.0} = 0.600 = \frac{3}{5}.
$$

Check: $c\Delta t' = \gamma(9.00 - 0.600\times 15.0) = \gamma(9.00 - 9.00) = 0$. The proper distance in that frame is $\sqrt{144} = 12.0\,\mathrm{m}$. A timelike pair, with the $9.00$ and the $15.0$ swapped, would have given $\beta = 15/9 > 1$, which is not a frame. The formula $\beta = c\Delta t/\Delta x$ is only a velocity when $|\Delta x| > |c\Delta t|$.
:::
:::

::: exercise Another two-body decay {level=2 check="400"}
A particle of rest energy $1000\,\mathrm{MeV}$ decays at rest into two particles of rest energy $300\,\mathrm{MeV}$ each. Find $pc$ of each daughter, in MeV.
::: solution
Each daughter gets half the parent's energy, $E = 500\,\mathrm{MeV}$. The masses are equal, so the momenta are equal and opposite, and the shell gives

$$
pc = \sqrt{500^2 - 300^2} = \sqrt{250000 - 90000} = \sqrt{160000} = 400\,\mathrm{MeV}.
$$

The decay formula agrees:

$$
pc = \frac{1}{2}\sqrt{1000^2 - 4\times 300^2} = \frac{1}{2}\sqrt{1000000 - 360000} = \frac{1}{2}\times 800 = 400\,\mathrm{MeV}.
$$

This is not the decay in [[#ex-decay]]. There the daughters had rest energy $400\,\mathrm{MeV}$ and $pc = 300\,\mathrm{MeV}$. Here the rest energy and the momentum have swapped roles in the $3$-$4$-$5$ triangle, scaled by $100\,\mathrm{MeV}$: $300^2 + 400^2 = 500^2$. The parent rest energy $1000\,\mathrm{MeV}$ is still above the threshold $600\,\mathrm{MeV}$. Each daughter's speed is $v/c = 400/500 = 0.800$, and $\gamma = 500/300 = 5/3$.
:::
:::

::: exercise Invariant mass of a pair {level=2 check="1600"}
A particle of energy $1500\,\mathrm{MeV}$ and momentum $pc = 1200\,\mathrm{MeV}$ collides with a particle at rest of rest energy $500\,\mathrm{MeV}$. Find the invariant mass energy $Mc^2$ of the system, in MeV.
::: solution
The totals in this frame are $E_{\mathrm{tot}} = 1500 + 500 = 2000\,\mathrm{MeV}$ and $p_{\mathrm{tot}}c = 1200\,\mathrm{MeV}$. Equation [[#eq-Minv]] gives

$$
Mc^2 = \sqrt{2000^2 - 1200^2} = \sqrt{4000000 - 1440000} = \sqrt{2560000} = 1600\,\mathrm{MeV}.
$$

The projectile's own rest energy is $\sqrt{1500^2 - 1200^2} = \sqrt{2250000 - 1440000} = \sqrt{810000} = 900\,\mathrm{MeV}$. The sum of the rest energies is $900 + 500 = 1400\,\mathrm{MeV}$, which is less than $1600\,\mathrm{MeV}$, as [[#prop-mass-sum]] requires. Using $1500\,\mathrm{MeV}$ itself as if it were an invariant mass forgets the momentum. Using $900 + 500$ forgets the relative motion. Neither is $Mc^2$.
:::
:::

::: exercise Prove the invariance of the interval {level=3}
State the standard boost and prove that $(c\Delta t)^2 - (\Delta x)^2 - (\Delta y)^2 - (\Delta z)^2$ is unchanged. Explain why the result for coordinate differences, rather than for the coordinates themselves, is the statement you need for a pair of events.
::: hint
:::
Expand $(ct' - \beta\, \text{something})$. The cross terms cancel, and $\gamma^2(1 - \beta^2) = 1$ removes the remaining factor. Then say what an origin shift would have done to $t$ but not to $\Delta t$.
::: solution
The standard boost is [[#eq-boost]]: $ct' = \gamma(ct - \beta x)$, $x' = \gamma(x - \beta\, ct)$, $y' = y$, $z' = z$, with $\gamma = 1/\sqrt{1 - \beta^2}$. The $y$ and $z$ contributions to the interval match on both sides. For the other pair,

$$
\begin{aligned}
(ct')^2 - (x')^2
&= \gamma^2\bigl[(ct - \beta x)^2 - (x - \beta\, ct)^2\bigr] \\
&= \gamma^2\bigl[c^2 t^2 - 2\beta\, ct\, x + \beta^2 x^2 - (x^2 - 2\beta\, x\, ct + \beta^2 c^2 t^2)\bigr] \\
&= \gamma^2\bigl[(1 - \beta^2)(c^2 t^2 - x^2)\bigr] \\
&= (ct)^2 - x^2,
\end{aligned}
$$

because $\gamma^2(1 - \beta^2) = 1$. Hence the full mostly-minus square is invariant. Replacing $(ct, x, y, z)$ by $(\Delta(ct), \Delta x, \Delta y, \Delta z)$ does not change a line of the algebra, and the transformation law of differences is the same as [[#eq-boost]] even if the origins of the two frames do not coincide: a constant shift cancels in $\Delta t$ and in $\Delta x$. The coordinates of a single event are not invariant, and they are not what [[#eq-interval]] is about. The classification into timelike, lightlike and spacelike is invariant because it is the sign of an invariant.
:::
:::

::: exercise Why the rest masses cannot add past the parent {level=3}
Prove that two future-directed particles of masses $m_1 > 0$ and $m_2 > 0$ have invariant mass $M \ge m_1 + m_2$, with equality if and only if they are relatively at rest. Conclude whether a particle of rest energy $700\,\mathrm{MeV}$ can decay into two particles of rest energy $400\,\mathrm{MeV}$ each.
::: hint
:::
Sit in the rest frame of the first particle. Use $E_2 \ge m_2 c^2$ inside $E_{\mathrm{tot}}^2 - p_{\mathrm{tot}}^2 c^2$, and use the shell of particle $2$ to replace $E_2^2 - p_2^2 c^2$.
::: solution
In the rest frame of particle $1$, $E_1 = m_1 c^2$ and $\mathbf{p}_1 = 0$. Particle $2$ has $E_2 \ge m_2 c^2$ and $E_2^2 - p_2^2 c^2 = m_2^2 c^4$. The system's totals are $E = m_1 c^2 + E_2$ and $\mathbf{p} = \mathbf{p}_2$, so

$$
\begin{aligned}
(Mc^2)^2 &= (m_1 c^2 + E_2)^2 - p_2^2 c^2 \\
&= m_1^2 c^4 + 2 m_1 c^2 E_2 + (E_2^2 - p_2^2 c^2) \\
&= m_1^2 c^4 + m_2^2 c^4 + 2 m_1 c^2 E_2.
\end{aligned}
$$

The inequality $E_2 \ge m_2 c^2$ replaces the last term:

$$
(Mc^2)^2 \ge m_1^2 c^4 + m_2^2 c^4 + 2 m_1 m_2 c^4 = (m_1 + m_2)^2 c^4.
$$

Thus $M \ge m_1 + m_2$. Equality requires $E_2 = m_2 c^2$, so particle $2$ is at rest in the rest frame of particle $1$: the relative velocity is zero. The left-hand side is built from the total four-momentum, so it is frame-independent, and the inequality travels with it.

A parent of rest energy $700\,\mathrm{MeV}$ is a system of invariant mass energy $700\,\mathrm{MeV}$ before the decay, and the same invariant mass after it, by [[#thm-conserve]]. Two daughters of rest energy $400\,\mathrm{MeV}$ each would need $M \ge 800\,\mathrm{MeV}$. Since $700 < 800$, the decay is impossible. The gap is not something a clever angular distribution can close. There is no real momentum which puts both daughters on their mass shells and conserves four-momentum. If the parent had rest energy $800\,\mathrm{MeV}$, the daughters could be produced only at rest in the parent's frame.
:::
:::
