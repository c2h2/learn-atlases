A door swings on its hinges, a grindstone spins on a fixed axle, and a ball rolls down a slope. In each case the useful coordinate is an angle. The physics is still Newton's, as in [[mechanics/newton-laws]] and [[mechanics/motion-1d]], but the names change: angular position, angular velocity and angular acceleration replace their linear partners, torque replaces force, and the moment of inertia — which depends on how the mass is arranged around the axis — replaces mass.

The relations below are true only when the angle is in radians: a degree measure fed into a radian formula is a standard way to get a confident wrong answer. We compute the moment of inertia of a rod by integration, prove the parallel-axis theorem, and then connect torque to angular acceleration and to kinetic energy. Rolling without slipping is a constraint, not a new law, and it decides which of a sphere, a disc and a hoop wins a race down a slope.

Throughout, take $g = 9.80\,\mathrm{m/s^2}$. Everything proved here is for a single fixed axis, or for rolling in a straight line. A rigid body free to tumble, with the angular momentum not necessarily along the angular velocity, is left to [[analytical-mechanics]].

## Angular kinematics

Choose an axis and a reference line perpendicular to it. The **angular position** $\theta$ is the angle from that line to a line fixed in the body. The positive sense is a choice, fixed by the right-hand rule: fingers curling with increasing $\theta$, thumb along the axis. The signs of $\omega$ and $\alpha$ mean nothing until that choice is made and kept.

::: definition Angular velocity and angular acceleration {#def-omega}
Let $\theta(t)$ be the angular position, in radians, of a rigid body about a chosen axis. The **angular velocity** and the **angular acceleration** about that axis are

$$
\omega = \deriv{\theta}{t}, \qquad \alpha = \deriv{\omega}{t} = \deriv{^2\theta}{t^2}.
$$ {#eq-omega-def}

Both are signed scalars for a fixed axis. The vector angular velocity $\boldsymbol{\omega}$ points along the axis in the positive sense when $\omega > 0$.
:::

The radian is forced by the derivative. An angle in radians is an arc length divided by a radius, so $\omega$ has the unit $\mathrm{s^{-1}}$, written $\mathrm{rad/s}$ only as a reminder. In degrees, $\deriv{\theta}{t}$ is not the arc length's rate of change divided by $R$, and every formula below would carry a factor $\pi/180$. Never insert a degree measure into $\omega = v/R$. Convert first: a full turn is $2\pi$ radians, and $180^\circ = \pi$ radians.

Consider a point of the body at perpendicular distance $R$ from the axis. As the body turns through an angle $\theta$, the point travels on a circle of radius $R$. The arc length along that circle, measured from the position $\theta = 0$, is

$$
s = R\theta,
$$

with $\theta$ in radians. Differentiating with respect to time, and using that $R$ is constant for a rigid body,

$$
v = \deriv{s}{t} = R\deriv{\theta}{t} = R\omega.
$$

This $v$ is the **tangential speed**. Differentiating again,

$$
a_t = \deriv{v}{t} = R\alpha,
$$

the **tangential acceleration**. There is also an inward, or centripetal, acceleration. The same components separate it from $a_t$.

Put the centre of the circle at the origin and write the position as $x = R\cos\theta$, $y = R\sin\theta$, with $\theta$ increasing in the positive sense. Then

$$
\begin{aligned}
v_x &= -R\sin\theta\,\omega, & v_y &= R\cos\theta\,\omega, \\
a_x &= -R\cos\theta\,\omega^2 - R\sin\theta\,\alpha, & a_y &= -R\sin\theta\,\omega^2 + R\cos\theta\,\alpha.
\end{aligned}
$$

The speed is $\sqrt{v_x^2 + v_y^2} = R\abs{\omega}$. Along the outward radial direction $(\cos\theta, \sin\theta)$, the acceleration is

$$
a_x\cos\theta + a_y\sin\theta = -R\omega^2,
$$

so the radial acceleration has magnitude $\omega^2 R$ and points towards the centre. Since $v = R\omega$ when we compare magnitudes,

$$
a_r = \frac{v^2}{R} = \omega^2 R,
$$

towards the centre. Along $(-\sin\theta, \cos\theta)$ the component is $R\alpha$, that is $a_t$. Either acceleration can be present without the other: $\omega^2 R$ survives at $\alpha = 0$, and $R\alpha$ survives at the instant $\omega = 0$.

::: proposition Tangential and radial acceleration {#prop-kinematic}
For a point at perpendicular distance $R$ from a fixed axis, with the angle in radians,

$$
s = R\theta, \qquad v = R\omega, \qquad a_t = R\alpha, \qquad a_r = \omega^2 R = \frac{v^2}{R},
$$ {#eq-kinematic}

where $a_r$ is directed from the point towards the centre of its circle. These four relations are false if $\theta$, $\omega$ or $\alpha$ is expressed in degrees.
:::

::: proof
The arc-length formula $s = R\theta$ is the definition of radian measure. Differentiating once and twice with $R$ fixed gives $v = R\omega$ and $a_t = R\alpha$. The component calculation above shows that the acceleration towards the centre is $\omega^2 R$. Substituting $v = R\omega$ into $v^2/R$ produces the same inward acceleration. If the angle were in degrees, the arc length would be $s = R\theta\pi/180$, and the factors of $\pi/180$ would survive in $v$ and in $a_t$, so [[#eq-kinematic]] would not hold.
:::

::: intuition A dictionary, not a new world
Angular kinematics is the one-dimensional kinematics of the arc length $s = R\theta$. Dividing by $R$ turns $v$ into $\omega$ and $a_t$ into $\alpha$. The radial acceleration changes the direction of the velocity rather than the value of $\omega$, so it has no partner in that dictionary. A formula below that looks familiar from [[mechanics/motion-1d]] got there by this route.
:::

::: warning Degrees, skidding and mismatched axes
Three errors account for most wrong answers here. Do not put a degree measure into [[#eq-kinematic]]: $\omega = v/R$ and $\theta = s/R$ are in radians. Do not impose $v = \omega R$ on a wheel that is skidding; if the surfaces slip, $v$ and $\omega R$ are independent. Do not write $\tau = I\alpha$ with the torque about one axis and $I$ about another. Both refer to the same axis, fixed in this chapter, or the centre-of-mass axis in the rolling argument below.
:::

## Constant angular acceleration

When $\alpha$ is constant, $\omega$ is linear in time and $\theta$ is quadratic. The derivation is the one in [[mechanics/motion-1d]], copied across the dictionary above. The hypotheses are: $\alpha$ constant, and $\theta$ in radians.

::: theorem Constant angular acceleration {#thm-const-alpha}
If $\alpha$ is constant, and $\theta_0$ and $\omega_0$ are the angular position and angular velocity at $t = 0$, then

$$
\begin{aligned}
\omega &= \omega_0 + \alpha t, \\
\theta &= \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2, \\
\omega^2 &= \omega_0^2 + 2\alpha\,(\theta - \theta_0).
\end{aligned}
$$ {#eq-const-alpha}
:::

::: proof
By [[#def-omega]], $\alpha = \deriv{\omega}{t}$. If $\alpha$ does not depend on $t$, integration from $0$ to $t$ gives $\omega - \omega_0 = \alpha t$, which is the first line. Then $\deriv{\theta}{t} = \omega_0 + \alpha t$. Integrating from $0$ to $t$ gives the second line. For the third, use the chain rule in the form $\alpha = \deriv{\omega}{t} = \bigl(\deriv{\omega}{\theta}\bigr)\bigl(\deriv{\theta}{t}\bigr) = \omega\deriv{\omega}{\theta}$, so $\omega\,\dd\omega = \alpha\,\dd\theta$. Integrating from the initial state to a later state, $\tfrac{1}{2}\bigl(\omega^2 - \omega_0^2\bigr) = \alpha\,(\theta - \theta_0)$, because $\alpha$ is constant and may leave the integral. Rearrangement is the third line. The same integration with $\theta$ in degrees would be differentiating a different function, and [[#eq-const-alpha]] would be the wrong statement.
:::

Use the third equation when the time is neither given nor wanted, and the first when the angle is not needed. When $\alpha$ is not constant, none of the three survives: integrate $\alpha(t)$, or use work and energy.

::: example Braking a wheel {#ex-brake}
A wheel spinning at $\omega_0 = 10.0\,\mathrm{rad/s}$ is braked so that $\alpha = -2.00\,\mathrm{rad/s^2}$, constant, until it stops. Find the time taken and the angle turned, in radians.
::: solution
Stop means $\omega = 0$. The first line of [[#eq-const-alpha]] gives $0 = 10.0 + (-2.00)\,t$, so $t = 10.0/2.00 = 5.00\,\mathrm{s}$.

The angle follows from the second line, taking $\theta_0 = 0$:

$$
\theta = (10.0)(5.00) + \tfrac{1}{2}(-2.00)(5.00)^2 = 50.0 - 25.0 = 25.0\,\mathrm{rad}.
$$

The third line is a check that does not use $t$. With $\omega = 0$,

$$
0 = (10.0)^2 + 2(-2.00)\,\theta \implies 4.00\,\theta = 100, \implies \theta = 25.0\,\mathrm{rad}.
$$

The two routes agree. Dividing by $2\pi$ converts the angle to $25.0/(2\pi) = 3.98$ revolutions; the theorem itself produced radians.
:::
:::

::: quiz
A turntable speeds up at constant $\alpha > 0$, starting from rest. Which statement is correct?
- [ ] The angle turned in the first $2\,\mathrm{s}$ equals the angle turned in the next $2\,\mathrm{s}$, because $\alpha$ is constant
- [x] The angle turned in successive equal time intervals increases, because $\omega$ is larger in the later interval
- [ ] The inward acceleration of a point on the rim is constant, because $\alpha$ is constant
- [ ] The formula $\theta = \tfrac{1}{2}\alpha t^2$ is valid with $\theta$ in degrees, provided $\alpha$ is also written per second squared in degrees
::: solution
From rest, $\theta = \tfrac{1}{2}\alpha t^2$. The angle from $t = 0$ to $t = 2$ is $2\alpha$, while the angle from $t = 2$ to $t = 4$ is $\tfrac{1}{2}\alpha\cdot 16 - 2\alpha = 6\alpha$, three times as large, because $\omega$ has grown. The inward acceleration is $\omega^2 R$, not constant. The quadratic formula was derived for radians.
:::
:::

## Moment of inertia

A force applied to a rigid body does not, by itself, tell you the angular acceleration. A force at the rim of a wheel is more effective than the same force near the hub, and a wheel with its mass in the rim is harder to spin than a wheel of the same mass with the mass near the hub. Both facts are carried by one quantity.

::: definition Moment of inertia {#def-inertia}
The **moment of inertia** of a system of particles about a chosen axis is

$$
I = \sum_i m_i r_i^2,
$$ {#eq-I-particles}

where $r_i$ is the perpendicular distance of the particle of mass $m_i$ from the axis, not the distance from a point. For a continuous body with mass density such that $\dd m$ is the mass in an infinitesimal piece,

$$
I = \int r^2\,\dd m,
$$

again with $r$ the perpendicular distance to the axis. The SI unit is $\mathrm{kg\cdot m^2}$.
:::

At fixed mass, moving matter farther from the axis increases $I$. There is no single moment of inertia of a body: every axis has its own. The rod is the model calculation, because the integral is elementary and the parallel-axis theorem then moves the result.

::: theorem Moment of inertia of a thin rod {#thm-rod}
A uniform thin rod of mass $M$ and length $L$ has moment of inertia $I = \tfrac{1}{12}ML^2$ about an axis perpendicular to the rod and passing through its centre.
:::

::: proof
Lay the rod along the $x$-axis from $x = -L/2$ to $x = L/2$, and take the axis to be the $z$-axis, through the centre. Uniformity means the linear density $\lambda = M/L$ is constant, so $\dd m = \lambda\,\dd x$, and the perpendicular distance from the axis to the mass at position $x$ is $\abs{x}$. Therefore

$$
I = \int_{-L/2}^{L/2} x^2\lambda\,\dd x = \lambda\left[\frac{x^3}{3}\right]_{-L/2}^{L/2} = \lambda\cdot\frac{2}{3}\left(\frac{L}{2}\right)^3 = \lambda\cdot\frac{2}{3}\cdot\frac{L^3}{8} = \lambda\frac{L^3}{12}.
$$

Substitute $\lambda = M/L$ to obtain $I = \tfrac{1}{12}ML^2$. The rod is treated as thin, so the perpendicular distance really is $\abs{x}$.
:::

Three further results are standard. A thin ring or hoop of mass $M$ and radius $R$, about its central axis, has every mass element at distance $R$, so [[#eq-I-particles]] gives $I = MR^2$. A disc or solid cylinder about its axis is a stack of such rings. The ring between $r$ and $r + \dd r$ has mass $\dd m = (2M/R^2)\,r\,\dd r$, and contributes $r^2\,\dd m$, so

$$
I = \int_0^R r^2\cdot\frac{2M}{R^2}\,r\,\dd r = \frac{2M}{R^2}\cdot\frac{R^4}{4} = \tfrac{1}{2}MR^2.
$$

A solid sphere of mass $M$ and radius $R$, about a diameter, has $I = \tfrac{2}{5}MR^2$. The integral is the disc calculation repeated on slices of the ball; it is an exercise below, and the result is the one used for a rolling sphere. Do not replace $\tfrac{2}{5}$ by the fraction for a different body.

| Body | Axis | $I$ |
|---|---|---|
| Thin ring or hoop | Central axis | $MR^2$ |
| Disc or solid cylinder | Symmetry axis | $\tfrac{1}{2}MR^2$ |
| Solid sphere | Any diameter | $\tfrac{2}{5}MR^2$ |
| Thin rod | Perpendicular, through the centre | $\tfrac{1}{12}ML^2$ |
| Thin rod | Perpendicular, through one end | $\tfrac{1}{3}ML^2$ |

The last line is not a new integration. It is the parallel-axis theorem of the next section, applied to the rod. Each entry is about the axis named beside it.

::: example A barbell of two spheres {#ex-barbell}
Two solid spheres, each of mass $m = 2.00\,\mathrm{kg}$ and radius $R = 0.100\,\mathrm{m}$, have their centres $0.800\,\mathrm{m}$ apart. They are joined by a light rod along the line of centres. Find the moment of inertia of the barbell about an axis perpendicular to the rod and passing through its midpoint.
::: solution
The rod is light, so it contributes nothing. Each sphere, about a diameter parallel to the chosen axis, has

$$
I_{\mathrm{sphere}} = \tfrac{2}{5}mR^2 = \tfrac{2}{5}(2.00)(0.100)^2 = (0.400)(0.0100) = 0.00800\,\mathrm{kg\cdot m^2}.
$$

The midpoint axis is parallel to that diameter, and the distance between the two axes is half the separation of the centres, $d = 0.400\,\mathrm{m}$. The parallel-axis theorem, [[#thm-parallel]] below, adds $md^2$ for each sphere:

$$
md^2 = (2.00)(0.400)^2 = (2.00)(0.160) = 0.320\,\mathrm{kg\cdot m^2}.
$$

One sphere therefore contributes $0.00800 + 0.320 = 0.328\,\mathrm{kg\cdot m^2}$, and the two spheres contribute

$$
I = 2\times 0.328 = 0.656\,\mathrm{kg\cdot m^2}.
$$

Almost all of this is the $md^2$ term: as point masses the two spheres would contribute $2md^2 = 0.640\,\mathrm{kg\cdot m^2}$, and the extra $0.0160\,\mathrm{kg\cdot m^2}$ is their finite size. The axes in the shift are parallel. An axis along the rod is a different moment of inertia, and this theorem does not reach it.
:::
:::

## The parallel-axis theorem

Tabulated moments pass through the centre of mass. Hinges and the end of a rod need a parallel axis. The theorem does not relate axes that meet at an angle.

::: theorem Parallel-axis theorem {#thm-parallel}
Let $I_{\mathrm{cm}}$ be the moment of inertia of a body of mass $M$ about an axis through the centre of mass. Let $I$ be the moment of inertia about a second axis, parallel to the first, at perpendicular distance $d$ from it. Then

$$
I = I_{\mathrm{cm}} + Md^2.
$$ {#eq-parallel}

The shift $Md^2$ is the moment of inertia the body would have if all its mass were at the centre of mass. The theorem does not apply to a pair of axes that fail to be parallel.
:::

::: proof
It is enough to prove the result for a system of particles; a continuous body is the same argument with integrals in place of sums. Choose coordinates so that the centre-of-mass axis is the $z$-axis and the centre of mass lies at the origin. Then $\sum_i m_i x_i = 0$ and $\sum_i m_i y_i = 0$. The parallel axis meets the $xy$-plane at $(a, b)$, so the distance between the axes is $d = \sqrt{a^2 + b^2}$, and the perpendicular distance from particle $i$ to the new axis is the distance in the plane from $(x_i, y_i)$ to $(a, b)$. Hence

$$
\begin{aligned}
I &= \sum_i m_i\bigl[(x_i - a)^2 + (y_i - b)^2\bigr] \\
&= \sum_i m_i(x_i^2 + y_i^2) - 2a\sum_i m_i x_i - 2b\sum_i m_i y_i + (a^2 + b^2)\sum_i m_i.
\end{aligned}
$$

The cross-term sums vanish because the origin is the centre of mass. The first sum is $I_{\mathrm{cm}}$, and $(a^2 + b^2)M = Md^2$. Therefore $I = I_{\mathrm{cm}} + Md^2$.

If the second axis is not parallel to the first, the squared distance is not $(x_i - a)^2 + (y_i - b)^2$ with a single fixed $(a, b)$, and the cross terms do not organise themselves into $Md^2$. Parallelism is a hypothesis of the theorem, not a convenience.
:::

Since $Md^2 \ge 0$, the moment about an axis in a given direction is smallest through the centre of mass. For the thin rod, a shift by $d = L/2$ moves the axis to one end:

$$
I_{\mathrm{end}} = \tfrac{1}{12}ML^2 + M\left(\frac{L}{2}\right)^2 = \tfrac{1}{12}ML^2 + \tfrac{1}{4}ML^2 = \tfrac{1}{3}ML^2.
$$

A direct integration agrees. With the rod from $x = 0$ to $x = L$ and the axis through the origin, $I = \int_0^L x^2 (M/L)\,\dd x = (M/L)\bigl[x^3/3\bigr]_0^L = \tfrac{1}{3}ML^2$. That is the moment of inertia of a rod pendulum about its pivot.

::: history
In the *Horologium oscillatorium* (1673), Christiaan Huygens analysed the compound pendulum, a rigid body swinging about a fixed pivot under gravity. The length that sets the period is, in modern language, $I/(Md)$ with $I$ taken about the pivot, and that $I$ is the centre-of-mass moment shifted out to the pivot. Huygens did not write $I = I_{\mathrm{cm}} + Md^2$, but the shift is already what locates his centre of oscillation. Leonhard Euler's *Theoria motus corporum solidorum seu rigidorum* (1765) gave the equations of motion of a rigid body, with moments of inertia about axes fixed in the body. The fixed-axis law of the next section is the case in which a bearing holds the axis still. The free rigid body is the subject of [[analytical-mechanics]].
:::

## Torque and the rotational law

On a fixed axis the quantity that governs $\alpha$ is not the force itself but its moment about the axis.

::: definition Torque {#def-torque}
The **torque** of a force $\mathbf{F}$ about a point $O$ is the vector

$$
\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F},
$$ {#eq-torque}

where $\mathbf{r}$ is the position of the point of application relative to $O$. Its magnitude is $\tau = rF\sin\phi = F\,\ell$, where $\phi$ is the angle between $\mathbf{r}$ and $\mathbf{F}$, and the **lever arm** $\ell = r\sin\phi$ is the perpendicular distance from $O$ to the line of action of $\mathbf{F}$. The direction of $\boldsymbol{\tau}$ is fixed by the right-hand rule: fingers curling in the sense in which $\mathbf{F}$ would rotate the body about $O$, thumb along $\boldsymbol{\tau}$. About a fixed axis, only the component of $\boldsymbol{\tau}$ along that axis enters the equation of motion, and we write it as a signed scalar $\tau$.
:::

A force through $O$ has lever arm zero and does not turn the body. The same force, with its line of action a perpendicular distance $\ell$ from $O$, has torque $F\ell$. Pushing a door near the hinge is hard because $\ell$ is small; pushing at the handle, perpendicular to the door, makes $\ell$ the width of the door.

::: theorem Fixed-axis law and rotational kinetic energy {#thm-rotlaw}
Suppose a rigid body rotates about an axis that is fixed in an inertial frame. Let $I$ be the moment of inertia about that axis, let $\tau$ be the net torque of all external forces about that axis, and let $\omega$ be the angular velocity. Then

$$
\tau = I\alpha, \qquad K = \tfrac{1}{2}I\omega^2.
$$ {#eq-rotlaw}

Internal forces that are central, equal and opposite along the line joining the particles they act on, contribute nothing to $\tau$. The identity $\tau = I\alpha$ uses $\tau$ and $I$ about the same axis. It is a fixed-axis statement: the motion of a rigid body whose axis is not held fixed is taken up in [[analytical-mechanics]].
:::

::: proof
Each particle moves on a circle of its own perpendicular radius $r_i$, with the same $\omega$ and the same $\alpha$. The tangential part of Newton's second law is $F_{i,t} = m_i r_i\alpha$, signs chosen so that a positive tangential force increases $\omega$. Radial and axial forces have no lever arm about the axis, so the torque on particle $i$ is $r_i F_{i,t} = m_i r_i^2\alpha$.

Sum over the particles. For an internal pair, $\mathbf{F}_{ij} = -\mathbf{F}_{ji}$ along the line joining the particles, and the torques about any point on the axis sum to $(\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij} = \mathbf{0}$. Bearings push on the axis itself and have lever arm zero. What survives is the net external torque $\tau$ about the axis, and

$$
\tau = \sum_i m_i r_i^2\alpha = I\alpha,
$$

where $\alpha$ factors out because it is common to every particle. That is the first half of [[#eq-rotlaw]].

For the kinetic energy, the speed of particle $i$ is $v_i = r_i\abs{\omega}$, so

$$
K = \sum_i\tfrac{1}{2}m_i v_i^2 = \tfrac{1}{2}\omega^2\sum_i m_i r_i^2 = \tfrac{1}{2}I\omega^2.
$$

The step $v_i = r_i\abs{\omega}$ uses rigidity and a fixed axis. A body that is also sliding has further kinetic energy, treated with rolling below.
:::

Torque plays the role of force, $I$ of mass and $\alpha$ of acceleration, but only about one and the same fixed axis. When $\tau$ is constant the work it does through an angle in radians is $\tau\,\Delta\theta$, and $\tau\,\Delta\theta = \Delta\bigl(\tfrac{1}{2}I\omega^2\bigr)$. That work–energy form is what we use when a pivot does no work and gravity is easier as a potential.

::: application Why a long pole steadies a walker
A tightrope walker's long pole has a large moment of inertia about the rope, because its mass sits far from that axis. A small unwanted torque then produces a small $\alpha$, and the walker has time to correct the lean. A flywheel uses the same law in the energy form: piston strokes deliver torque in pulses, and between them $\tfrac{1}{2}I\omega^2$ keeps $\omega$ from falling much. In both cases a bearing, or the rope, holds the axis, which is why [[#thm-rotlaw]] applies.
:::

::: example A disc under a steady torque {#ex-torque-disc}
A uniform disc of mass $M = 2.00\,\mathrm{kg}$ and radius $R = 0.300\,\mathrm{m}$ is free to rotate about its central axis, which is fixed. A constant torque $\tau = 0.450\,\mathrm{N\cdot m}$ is applied about that axis, starting from rest. Find $I$, $\alpha$, and the angular velocity, the kinetic energy and the angle turned after $4.00\,\mathrm{s}$.
::: solution
The disc formula gives

$$
I = \tfrac{1}{2}MR^2 = \tfrac{1}{2}(2.00)(0.300)^2 = (1.00)(0.0900) = 0.0900\,\mathrm{kg\cdot m^2}.
$$

[[#thm-rotlaw]] about the same axis gives $\alpha = \tau/I = 0.450/0.0900 = 5.00\,\mathrm{rad/s^2}$. The torque is constant, so $\alpha$ is constant, and [[#thm-const-alpha]] applies with $\omega_0 = 0$ and $\theta_0 = 0$. After $t = 4.00\,\mathrm{s}$,

$$
\omega = \alpha t = (5.00)(4.00) = 20.0\,\mathrm{rad/s}.
$$

The kinetic energy is

$$
K = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(0.0900)(20.0)^2 = (0.0450)(400) = 18.0\,\mathrm{J}.
$$

The angle turned is

$$
\theta = \tfrac{1}{2}\alpha t^2 = \tfrac{1}{2}(5.00)(4.00)^2 = (2.50)(16.0) = 40.0\,\mathrm{rad}.
$$

As a check, $\omega^2 = 2\alpha\theta$ gives $(20.0)^2 = 400$ and $2(5.00)(40.0) = 400$. The work done by the torque is $\tau\theta = (0.450)(40.0) = 18.0\,\mathrm{J}$, equal to $K$, which is the work–energy statement for a torque on a body that starts from rest.

A point on the rim then has $v = R\omega = (0.300)(20.0) = 6.00\,\mathrm{m/s}$, $a_t = R\alpha = (0.300)(5.00) = 1.50\,\mathrm{m/s^2}$ and $a_r = \omega^2 R = (400)(0.300) = 120\,\mathrm{m/s^2}$. The inward acceleration dominates because it grows with $\omega^2$.
:::
:::

## Rolling without slipping

A wheel rolling in a straight line is not turning about a fixed axis: the centre moves, and the rotation is about an axis through the centre whose direction stays fixed. The link, when the wheel does not skid, is a constraint at the contact.

Let $v$ be the speed of the centre and $\omega$ the angular speed about the centre, with the positive sense of $\omega$ chosen so that the bottom point moves backwards relative to the centre. Relative to the centre that point has speed $\omega R$ opposite to $\mathbf{v}$. No slip means the material point in contact is instantaneously at rest, so the two contributions cancel:

$$
v = \omega R.
$$

Differentiating at constant radius gives $a = \alpha R$, with $a = \deriv{v}{t}$ the acceleration of the centre and the same matching of signs. These are constraints, not laws, and they fail when the wheel skids: then $v$ and $\omega$ are independent, coupled only by friction. Static friction can maintain $v = \omega R$ without by itself deciding either value.

Now let a round body of mass $m$, radius $R$ and $I = k\,mR^2$ about its centre roll without slipping down an incline of angle $\theta$. From the table, $k = \tfrac{2}{5}$ for a solid sphere, $k = \tfrac{1}{2}$ for a disc or solid cylinder, and $k = 1$ for a thin hoop. Released from rest, it tends to slide down, so static friction $f$ acts up the plane. Take the positive direction down the plane.

::: theorem Acceleration of an object rolling down an incline {#thm-rolling}
A round rigid body with $I = k\,mR^2$ about its centre, rolling without slipping down an incline of angle $\theta$, has acceleration of its centre

$$
a = \frac{g\sin\theta}{1 + k}
$$ {#eq-rolling-a}

down the plane. The static frictional force acts up the plane and has magnitude

$$
f = \frac{k}{1 + k}\,mg\sin\theta.
$$ {#eq-rolling-f}

Friction does no work while the no-slip condition holds, because the material point in contact is instantaneously at rest, so the mechanical energy is conserved. From rest, after a vertical drop $h$,

$$
v^2 = \frac{2gh}{1 + k}.
$$ {#eq-rolling-v}

The Newtonian argument and the energy argument give the same $a$. If the surfaces cannot supply the force in [[#eq-rolling-f]], the body skids and neither $a = \alpha R$ nor [[#eq-rolling-a]] may be used.
:::

::: proof
Newton's second law for the centre of mass, positive down the plane, reads

$$
mg\sin\theta - f = ma,
$$

The normal force balances the perpendicular component of the weight, and $f$ points up the plane. About the centre the weight has no torque, and on a round body the normal force is radial, so it has none either. Friction at the rim has lever arm $R$ and torque $fR$ in the sense that increases $\omega$. The relation $\tau = I\alpha$ still holds about the centre, even though the centre accelerates: that is the centre-of-mass form proved in [[mechanics/angular-momentum]]. Thus $fR = I\alpha$. With the no-slip constraint $a = \alpha R$,

$$
f = \frac{I a}{R^2} = k\,ma.
$$

Substitute into the equation for the centre:

$$
mg\sin\theta - k\,ma = ma \implies g\sin\theta = a(1 + k) \implies a = \frac{g\sin\theta}{1 + k}.
$$

Friction has cancelled from the equation for $a$. It is still present, and it is determined: $f = k\,ma = \bigl[k/(1 + k)\bigr]mg\sin\theta$, which is [[#eq-rolling-f]]. The normal force is $N = mg\cos\theta$, so the static friction required of the surface is available only if $\mu_s N \ge f$, that is

$$
\mu_s \ge \frac{k}{1 + k}\tan\theta.
$$

If the inequality fails, the contact slips, $a = \alpha R$ is false, and the derivation stops applying.

For the energy route, the material point in contact has velocity zero when $v = \omega R$, so static friction and the normal force have power zero and do no work. Gravity is conservative, and mechanical energy is conserved. After a vertical drop $h$ the loss in potential energy equals the gain in kinetic energy of the centre plus rotation about the centre,

$$
mgh = \tfrac{1}{2}mv^2 + \tfrac{1}{2}I\omega^2.
$$

The constraint $v = \omega R$, maintained throughout if the body starts from rest without slipping and $\mu_s$ is large enough, gives $\tfrac{1}{2}I\omega^2 = \tfrac{1}{2}(kmR^2)(v^2/R^2) = \tfrac{1}{2}kmv^2$. Hence

$$
mgh = \tfrac{1}{2}mv^2(1 + k) \implies v^2 = \frac{2gh}{1 + k},
$$

which is [[#eq-rolling-v]]. Let $s$ be the distance along the plane, so $h = s\sin\theta$. From rest, $v^2 = 2as$, and the energy result becomes $2as = 2g(s\sin\theta)/(1 + k)$, hence $a = g\sin\theta/(1 + k)$. The two routes agree.

The same kinetic energy can be written with [[#thm-parallel]]. About the contact point, $I_P = I_{\mathrm{cm}} + mR^2 = mR^2(k + 1)$, and while the contact point is instantaneously at rest, $K = \tfrac{1}{2}I_P\omega^2 = \tfrac{1}{2}m(1 + k)v^2$. This checks the split. It is not a licence to apply $\tau = I\alpha$ about that moving point without the argument of the next chapter.
:::

A larger $k$ stores a larger share of the lost potential energy in rotation, so the centre accelerates more slowly. Friction is essential, because without it there is no torque, but it drops out of $a$ provided the surface can supply [[#eq-rolling-f]] as static friction.

::: widget rolling
angle: 30
caption: A solid sphere, a disc and a hoop are released together. The sphere reaches the bottom first because I/(m R^2) is smallest. The angle here is 30°, the angle used in the worked example.
:::

::: example A sphere, a disc and a hoop on a thirty-degree incline {#ex-rolling}
A solid sphere, a disc and a thin hoop roll without slipping down the same incline of angle $\theta = 30^\circ$, starting from rest. Take $g = 9.80\,\mathrm{m/s^2}$ and $\sin 30^\circ = \tfrac{1}{2}$. Find the acceleration of each centre. For a vertical drop $h = 0.500\,\mathrm{m}$, find the speed of the sphere at the bottom, and check it against $v^2 = 2as$.
::: solution
Here $g\sin\theta = (9.80)(\tfrac{1}{2}) = 4.90\,\mathrm{m/s^2}$, and [[#eq-rolling-a]] divides that number by $1 + k$.

For the sphere, $k = \tfrac{2}{5}$, so $1 + k = \tfrac{7}{5} = 1.40$ and

$$
a_{\mathrm{sphere}} = \frac{4.90}{1.40} = 3.50\,\mathrm{m/s^2}.
$$

For the disc, $k = \tfrac{1}{2}$, so $1 + k = \tfrac{3}{2}$ and

$$
a_{\mathrm{disc}} = \frac{4.90}{3/2} = \frac{9.80}{3} = 3.2666\ldots\,\mathrm{m/s^2},
$$

which is $3.267\,\mathrm{m/s^2}$ to four figures.

For the hoop, $k = 1$, so $1 + k = 2$ and

$$
a_{\mathrm{hoop}} = \frac{4.90}{2} = 2.45\,\mathrm{m/s^2},
$$

which is $g/4$. The sphere is fastest because $k$ is smallest. Mass and radius cancelled separately once $I$ was written as $k\,mR^2$, so a large hoop and a small hoop roll down together.

The frictional force is $f = \bigl[k/(1 + k)\bigr]mg\sin\theta = \bigl[k/(1 + k)\bigr]m(4.90)$. The dimensionless factors are $k/(1 + k) = (2/5)/(7/5) = 2/7$ for the sphere, $(1/2)/(3/2) = 1/3$ for the disc, and $1/2$ for the hoop. Hence, with $m$ in kilograms and $f$ in newtons,

$$
f_{\mathrm{sphere}} = \tfrac{2}{7}(4.90)\,m = 1.40\,m, \qquad f_{\mathrm{disc}} = \tfrac{4.90}{3}\,m = 1.633\ldots\,m, \qquad f_{\mathrm{hoop}} = 2.45\,m.
$$

The hoop demands the most friction for a given weight. The sphere's speed after a drop of $h = 0.500\,\mathrm{m}$ follows from [[#eq-rolling-v]]:

$$
v^2 = \frac{2gh}{1 + k} = \frac{2(9.80)(0.500)}{1.40} = \frac{9.80}{1.40} = 7.00\,\mathrm{m^2/s^2},
$$

so $v = \sqrt{7.00} = 2.646\,\mathrm{m/s}$. Along the slope, $s = h/\sin\theta = 0.500/(\tfrac{1}{2}) = 1.00\,\mathrm{m}$, and $v^2 = 2as = 2(3.50)(1.00) = 7.00\,\mathrm{m^2/s^2}$ again. The fraction of the lost potential energy that ends in rotation is $k/(1 + k)$: $2/7$ for the sphere, $1/3$ for the disc and $1/2$ for the hoop. Static friction enforced the constraint and did none of the work.
:::
:::

## Where this leads

The next chapter, [[mechanics/angular-momentum]], replaces $\tau = I\alpha$ by torque equals the rate of change of angular momentum. That is what survives when a pivot can push but exerts no torque, and when no axis is fixed. Orbits in [[mechanics/gravitation]] are the example: the force on a planet is central, and the angular momentum about the Sun is constant. When $I$ becomes a tensor and $\mathbf{L}$ need not point along $\boldsymbol{\omega}$, the subject is [[analytical-mechanics]]. The formulae here remain the ones for a fixed axis, or for a wheel rolling without slipping in a straight line.

::: summary
- Angular position in rotational kinematics is in radians. Then $\omega = \deriv{\theta}{t}$, $\alpha = \deriv{\omega}{t}$, and a point at distance $R$ from the axis has $s = R\theta$, $v = R\omega$, $a_t = R\alpha$ and inward acceleration $\omega^2 R$.
- Constant $\alpha$ repeats the straight-line formulae: $\omega = \omega_0 + \alpha t$, $\theta = \theta_0 + \omega_0 t + \tfrac{1}{2}\alpha t^2$ and $\omega^2 = \omega_0^2 + 2\alpha\,\Delta\theta$.
- The moment of inertia about an axis is $I = \sum m_i r_i^2 = \int r^2\,\dd m$, with $r$ the perpendicular distance to that axis. A thin rod has $\tfrac{1}{12}ML^2$ about its centre and $\tfrac{1}{3}ML^2$ about one end.
- A hoop has $MR^2$ about its central axis, a disc or solid cylinder $\tfrac{1}{2}MR^2$ about its axis, and a solid sphere $\tfrac{2}{5}MR^2$ about a diameter.
- For a parallel axis at distance $d$ from a centre-of-mass axis, $I = I_{\mathrm{cm}} + Md^2$. The theorem does not apply to axes that are not parallel.
- Torque is $\mathbf{r}\times\mathbf{F}$, with magnitude equal to force times lever arm. About a fixed axis, $\tau = I\alpha$ and $K = \tfrac{1}{2}I\omega^2$, with $\tau$ and $I$ about that same axis.
- Rolling without slipping imposes $v = \omega R$ and $a = \alpha R$. Down an incline the centre accelerates at $a = g\sin\theta/(1 + k)$ with $k = I/(mR^2)$, and static friction does no work.
- On a $30^\circ$ incline the accelerations are $3.50\,\mathrm{m/s^2}$ for a solid sphere, $3.267\,\mathrm{m/s^2}$ for a disc and $2.45\,\mathrm{m/s^2}$ for a hoop. After a drop of $0.500\,\mathrm{m}$ the sphere's speed is $2.646\,\mathrm{m/s}$.
:::

## Exercises

::: exercise Speed of a point on the rim {#exr-rim level=1 check="1.4"}
A wheel of radius $0.350\,\mathrm{m}$ rotates at a constant angular velocity of $4.00\,\mathrm{rad/s}$. Find the tangential speed, in $\mathrm{m/s}$, of a point on the rim.
::: solution
The angle is already in radians per second, so [[#eq-kinematic]] applies directly. The tangential speed is

$$
v = R\omega = (0.350)(4.00) = 1.40\,\mathrm{m/s}.
$$

The inward acceleration is not asked for; it would be $\omega^2 R = 16.0\times 0.350 = 5.60\,\mathrm{m/s^2}$, and the tangential acceleration is zero because $\omega$ is constant.
:::
:::

::: exercise Moment of inertia of a rod about its centre {#exr-rod level=1 check="0.096"}
A uniform thin rod has mass $M = 0.800\,\mathrm{kg}$ and length $L = 1.20\,\mathrm{m}$. Find its moment of inertia, in $\mathrm{kg\cdot m^2}$, about an axis perpendicular to the rod and passing through its centre.
::: solution
[[#thm-rod]] gives $I = \tfrac{1}{12}ML^2$. First $L^2 = (1.20)^2 = 1.44\,\mathrm{m^2}$, so

$$
ML^2 = (0.800)(1.44) = 1.152\,\mathrm{kg\cdot m^2}, \qquad I = \frac{1.152}{12} = 0.0960\,\mathrm{kg\cdot m^2}.
$$

The question asks for the centre, not the end.
:::
:::

::: exercise Angle turned by a turntable {#exr-turntable level=1 check="45"}
A turntable starts from rest and turns with constant angular acceleration $\alpha = 2.50\,\mathrm{rad/s^2}$ for $6.00\,\mathrm{s}$. Through what angle, in radians, does it turn?
::: solution
Use [[#eq-const-alpha]] with $\omega_0 = 0$ and $\theta_0 = 0$. The angle does not require the final angular velocity:

$$
\theta = \tfrac{1}{2}\alpha t^2 = \tfrac{1}{2}(2.50)(6.00)^2 = (1.25)(36.0) = 45.0\,\mathrm{rad}.
$$

As a check, $\omega = \alpha t = (2.50)(6.00) = 15.0\,\mathrm{rad/s}$, and $\omega^2 = 2\alpha\theta$ gives $225 = 2(2.50)\,\theta = 5.00\,\theta$, so $\theta = 45.0\,\mathrm{rad}$ again.
:::
:::

::: exercise How far ahead is the sphere? {#exr-race level=2 check="10/7"}
A solid sphere and a thin hoop roll without slipping down the same incline of angle $30^\circ$, starting from rest side by side. When the hoop has travelled $1.00\,\mathrm{m}$ along the slope, how far along the slope, in metres, has the sphere travelled?
::: hint
The accelerations are in the ratio of $1/(1 + k)$, and from rest the distances in a common time are in the ratio of the accelerations.
:::
::: solution
From [[#ex-rolling]], or directly from [[#eq-rolling-a]] with $\sin 30^\circ = \tfrac{1}{2}$,

$$
a_{\mathrm{sphere}} = \frac{g/2}{7/5} = 3.50\,\mathrm{m/s^2}, \qquad a_{\mathrm{hoop}} = \frac{g/2}{2} = 2.45\,\mathrm{m/s^2},
$$

using $g = 9.80\,\mathrm{m/s^2}$. The ratio is

$$
\frac{a_{\mathrm{sphere}}}{a_{\mathrm{hoop}}} = \frac{3.50}{2.45} = \frac{350}{245} = \frac{10}{7},
$$

which is also $(1/1.40)/(1/2) = 2/1.40 = 10/7$, and the value of $g$ cancels. Both objects start from rest, so the distance along the slope in a time $t$ is $s = \tfrac{1}{2}at^2$. In the same time the distances are in the ratio of the accelerations. When $s_{\mathrm{hoop}} = 1.00\,\mathrm{m}$,

$$
s_{\mathrm{sphere}} = \frac{10}{7}\times 1.00 = \frac{10}{7}\,\mathrm{m}.
$$

The sphere is ahead by $10/7 - 1 = 3/7\,\mathrm{m}$, about $0.429\,\mathrm{m}$. The masses and radii never enter.
:::
:::

::: exercise Speed of a disc after a short drop {#exr-disc-speed level=2 check="sqrt(98/15)"}
A disc rolls without slipping, from rest, down a slope, and loses $0.500\,\mathrm{m}$ of height. Find its speed at the bottom, in $\mathrm{m/s}$. Use $g = 9.80\,\mathrm{m/s^2}$.
::: solution
For a disc $k = \tfrac{1}{2}$ and $1 + k = \tfrac{3}{2}$. Energy, [[#eq-rolling-v]], does not require the angle of the slope:

$$
v^2 = \frac{2gh}{1 + k} = \frac{2(9.80)(0.500)}{3/2} = \frac{9.80}{3/2} = \frac{9.80\times 2}{3} = \frac{19.6}{3} = \frac{98}{15}.
$$

Hence $v = \sqrt{98/15}\,\mathrm{m/s}$. Numerically $98/15 = 6.5333\ldots$ and $v = 2.556\,\mathrm{m/s}$. The same $v^2$ follows from $a = g\sin\theta/(3/2)$ and $s = h/\sin\theta$, since $v^2 = 2as = 2gh/(3/2)$ and the angle cancels. Static friction does no work, which is why the energy equation closes without a frictional term.
:::
:::

::: exercise Least friction that lets a disc roll {#exr-mu level=2 check="sqrt(3)/9"}
A disc is placed at rest on an incline of angle $30^\circ$. Find the smallest coefficient of static friction that allows it to roll down without slipping. Give the exact value.
::: hint
The required frictional force is [[#eq-rolling-f]], and the normal force is $mg\cos\theta$. Divide.
:::
::: solution
For a disc $k = \tfrac{1}{2}$, so $k/(1 + k) = (1/2)/(3/2) = 1/3$. [[#thm-rolling]] requires

$$
\mu_s \ge \frac{k}{1 + k}\tan\theta = \frac{1}{3}\tan 30^\circ.
$$

Since $\tan 30^\circ = 1/\sqrt{3}$,

$$
\mu_{\min} = \frac{1}{3\sqrt{3}} = \frac{\sqrt{3}}{9}.
$$

Numerically $\sqrt{3}/9 \approx 0.1925$. A smaller coefficient cannot supply $f = \tfrac{1}{3}mg\sin\theta$ while $N = mg\cos\theta$, so the disc skids, $v$ and $\omega R$ part company, and the acceleration is no longer $g\sin\theta/(1 + k)$. The mass and the radius cancelled, as they do in $a$ itself.
:::
:::

::: exercise A rod released from the horizontal {#exr-rod-fall level=3 check="39.2"}
A uniform rod of length $L = 0.750\,\mathrm{m}$ is pivoted smoothly about a fixed horizontal axis through one end, perpendicular to the rod. It is released from rest in the horizontal position. Find $\omega^2$, in $\mathrm{rad^2/s^2}$, when the rod reaches the vertical position, hanging down. Take $g = 9.80\,\mathrm{m/s^2}$.
::: hint
The pivot does not move, so the force there does no work. The centre of mass drops a distance $L/2$, and the moment of inertia about the pivot is the end-axis value.
:::
::: solution
Let the mass be $M$. It will cancel, which is why the problem does not specify it. About the pivot, [[#thm-parallel]] or the end-rod formula gives $I = \tfrac{1}{3}ML^2$.

The centre of mass drops a distance $L/2 = 0.375\,\mathrm{m}$. The pivot does not move, so its force does no work, and mechanical energy is conserved:

$$
Mg\frac{L}{2} = \tfrac{1}{2}I\omega^2 = \tfrac{1}{2}\cdot\tfrac{1}{3}ML^2\,\omega^2 = \tfrac{1}{6}ML^2\omega^2.
$$

Cancel $M$ and multiply through by $6/L^2$:

$$
\omega^2 = \frac{6}{L^2}\cdot g\frac{L}{2} = \frac{3g}{L} = \frac{3\times 9.80}{0.750} = \frac{29.4}{0.750} = 39.2\,\mathrm{rad^2/s^2}.
$$

Check the division: $0.750\times 39.2 = 29.25 + 0.15 = 29.4$.
:::
:::

::: exercise Moment of inertia of a solid sphere {#exr-sphere level=3}
Prove that a uniform solid sphere of mass $M$ and radius $R$ has moment of inertia $\tfrac{2}{5}MR^2$ about a diameter. You may use the disc result $I = \tfrac{1}{2}mr^2$ for each slice.
::: hint
Slice the sphere perpendicular to the diameter. A slice at height $z$ is a disc of radius $\sqrt{R^2 - z^2}$, and its own axis is the diameter, so no parallel-axis shift is required.
:::
::: solution
Place the centre at the origin and the diameter along the $z$-axis. The volume of the sphere is $\tfrac{4}{3}\pi R^3$, so the uniform density is $\rho = M\big/\bigl(\tfrac{4}{3}\pi R^3\bigr) = 3M/(4\pi R^3)$.

A slice perpendicular to the $z$-axis, between $z$ and $z + \dd z$, has radius $a = \sqrt{R^2 - z^2}$ and volume $\pi a^2\,\dd z$, up to an error that vanishes in the limit $\dd z \to 0$. Its mass is

$$
\dd m = \rho\,\pi a^2\,\dd z = \frac{3M}{4\pi R^3}\cdot\pi a^2\,\dd z = \frac{3M}{4R^3}\,a^2\,\dd z.
$$

The slice is a disc of radius $a$ whose axis is the $z$-axis itself, so its moment about the diameter is $\tfrac{1}{2}\,a^2\,\dd m$, with no parallel-axis correction. Integrate from $z = -R$ to $z = R$:

$$
I = \int \tfrac{1}{2}a^2\,\dd m = \int_{-R}^{R}\tfrac{1}{2}a^2\cdot\frac{3M}{4R^3}\,a^2\,\dd z = \frac{3M}{8R^3}\int_{-R}^{R} a^4\,\dd z.
$$

Now $a^2 = R^2 - z^2$ and $a^4 = (R^2 - z^2)^2 = R^4 - 2R^2 z^2 + z^4$. The integrand is even, so

$$
\int_{-R}^{R}(R^4 - 2R^2 z^2 + z^4)\,\dd z = 2\left[R^4 z - 2R^2\frac{z^3}{3} + \frac{z^5}{5}\right]_0^{R} = 2\left(R^5 - \frac{2R^5}{3} + \frac{R^5}{5}\right).
$$

The coefficient of $R^5$ is $1 - \tfrac{2}{3} + \tfrac{1}{5} = \tfrac{15}{15} - \tfrac{10}{15} + \tfrac{3}{15} = \tfrac{8}{15}$, and the integral equals $2R^5\cdot\tfrac{8}{15} = \tfrac{16}{15}R^5$. Therefore

$$
I = \frac{3M}{8R^3}\cdot\frac{16}{15}R^5 = \frac{3M\cdot 16\,R^2}{8\cdot 15} = \frac{3M\cdot 2\,R^2}{15} = \frac{6}{15}MR^2 = \tfrac{2}{5}MR^2.
$$

This is the moment used for a rolling sphere.
:::
:::
