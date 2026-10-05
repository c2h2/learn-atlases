A ball thrown forward in a railway carriage has one velocity relative to the carriage and another relative to the platform. Both numbers are correct. They are statements about different frames, and there is no third, frame-free speed waiting behind them. Newtonian mechanics is at ease with that. The laws in [[mechanics/newton-laws]] are written for inertial frames, and a carriage that moves at constant velocity is as good an inertial frame as the platform.

What Newtonian mechanics adds, and what this chapter writes out in coordinates, is a definite rule for passing from one inertial frame to another. There is one time, shared by every frame. A length measured at one instant has the same value in every frame. Velocities therefore subtract. Accelerations do not: the same free particle has the same acceleration in every inertial frame, which is why a force law that depends on separations of bodies can take the same form in all of them.

That package is the Galilean transformation. It is the kinematics behind the ship argument of 1632, behind every ground speed you compute from an airspeed and a wind, and behind the fact that a ball dropped in the carriage lands at your feet. It is also the rule this course is about to refuse for light. A light wave, on the evidence of [[magnetism/electromagnetic-waves]], travels in vacuum at a speed fixed by the constants of the vacuum, not at a speed measured through a medium you can chase. The last sections show, by direct substitution, that a Galilean change of frame does not preserve that wave. The repair is the subject of [[relativity]].

Throughout, an **event** is something that happens at one place and one time: a flash, a collision, a particle passing a mark. Frames disagree about the coordinates of an event. They do not disagree about which event it was.

## Inertial frames {#inertial}

The first law in [[mechanics/newton-laws]] is a selection rule for frames. We restate it in the form this course will keep, because everything later is a comparison of inertial frames with one another.

::: definition Inertial frame {#def-inertial}
A **free particle** is a particle on which the net force is zero. A frame is an **inertial frame** if, in that frame, every free particle moves with constant velocity: in a straight line at constant speed, or else remains at rest. A frame that moves at constant velocity relative to an inertial frame is itself inertial. A frame that accelerates or rotates relative to an inertial frame is not.
:::

The ground is a good enough inertial frame for the mechanics in this chapter. The small effects of the Earth's rotation are left out, as they were in [[mechanics/newton-laws]]. A carriage braking, a lift speeding up, and a turntable are not inertial frames. In those frames a free particle does not move at constant velocity, so the same force law does not read $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ with $\mathbf{a}$ measured there.

A carriage on a straight track at constant speed is inertial. So is the platform. The whole content of the Galilean transformation is the relation between the coordinates those two frames assign to one and the same event. Nothing in the transformation says which of them is "really" at rest. The principle we are preparing is that no mechanical experiment, done inside a closed carriage, can decide the question.

::: intuition The test comes before the algebra
If you are unsure whether a frame is allowed, ignore the formulae and watch a free particle. Constant velocity means the frame is inertial and the second law may be used as written. Any other behaviour means the frame is accelerating or rotating relative to an inertial frame, and a velocity subtraction will not repair it. The Galilean transformation, below, relates inertial frames only. It is not a recipe for a braking car.
:::

## Events and the standard configuration {#events}

Before writing a transformation we fix how the axes are laid out. The physics does not depend on that choice. A messy layout produces messy algebra and the same events.

::: definition Event and standard configuration {#def-standard}
An **event** has, in a frame $S$, coordinates $(t, x, y, z)$: a time and a position. A second inertial frame $S'$ is in **standard configuration** with $S$ when three things hold. The axes of $S'$ are parallel to the axes of $S$. The origin of $S'$ moves along the positive $x$-axis of $S$ at constant speed $v$, with $v$ allowed to be positive or negative but constant. The origins coincide at $t = 0$, and at that moment the clocks read the same: the event "origins coincide" is $(0,0,0,0)$ in both frames.
:::

Any pair of inertial frames can be brought into standard configuration by choosing the origins, the zero of time, and the direction of the $x$-axis. We always do that before calculating. The velocity $\mathbf{v}$ of $S'$ relative to $S$ then has components $(v, 0, 0)$. The velocity of $S$ relative to $S'$ is $(-v, 0, 0)$: if the carriage moves to your right, the platform moves to the passenger's left, at the same speed.

Coordinates are labels we attach to events. They are not objects carried about by the particle. Changing frames changes the labels. It does not change the particle, and it does not change which pairs of events are "the throw" and "the catch".

## The Galilean transformation {#transformation}

The Newtonian relation between the labels is now short enough to write in one line. We state it as a definition because, inside this chapter, it is the assumption. The next chapter replaces it. What we can prove from it, we prove.

::: definition Galilean transformation {#def-galilean}
Let $S'$ be in standard configuration with $S$, moving at constant velocity $v$ along the shared $x$-axis. The **Galilean transformation** from the coordinates of an event in $S$ to its coordinates in $S'$ is

$$
x' = x - v t, \qquad y' = y, \qquad z' = z, \qquad t' = t.
$$ {#eq-galilean}

The inverse, from $S'$ back to $S$, is

$$
x = x' + v t', \qquad y = y', \qquad z = z', \qquad t = t'.
$$ {#eq-galilean-inverse}
:::

Two assumptions are packed into [[#eq-galilean]], and both are abandoned for light later. The first is $t' = t$: one time for every frame. Clocks that were set together at the origin stay in agreement everywhere, on this rule, whatever their motion. The second is that a rod laid along $x$, at rest in $S$, has the same length in $S'$. If its ends are at $x_1$ and $x_2$ at one common time $t$, then

$$
x'_2 - x'_1 = (x_2 - v t) - (x_1 - v t) = x_2 - x_1.
$$

The $v t$ terms cancel because the two ends are recorded at the same $t$, and because $t'$ does not differ from $t$. Transverse lengths are untouched for the same reason: $y' = y$ and $z' = z$. Under a Galilean transformation, distances between simultaneous events are invariants. Time intervals are invariants. Velocities are not.

The formula $x' = x - v t$ is the statement that the origin of $S'$, which is the moving point $x = v t$, carries the label $x' = 0$. Every other point on the $x$-axis is measured from that origin, with a metre that agrees with the metre of $S$.

::: example One event, two labels {#ex-event}
An event has coordinates $x = 30.0\,\mathrm{m}$ and $t = 2.00\,\mathrm{s}$ in $S$. The frame $S'$ is in standard configuration with speed $v = 10.0\,\mathrm{m/s}$. Find the coordinates of the same event in $S'$.
::: solution
Apply [[#eq-galilean]] directly. The time is shared:

$$
t' = t = 2.00\,\mathrm{s}.
$$

The spatial label along the boost is

$$
x' = 30.0 - (10.0)(2.00) = 10.0\,\mathrm{m},
$$

and $y' = y$, $z' = z$. The event is not a different event because $10.0 \neq 30.0$. It is the same flash, recorded by an origin that, at $t = 2.00\,\mathrm{s}$, has already moved $20.0\,\mathrm{m}$ along $x$. The inverse check is $x = x' + v t' = 10.0 + (10.0)(2.00) = 30.0\,\mathrm{m}$.

If a second event happens at the same $t$ and at $x = 34.0\,\mathrm{m}$, its $x'$ is $14.0\,\mathrm{m}$. The separation of the two events is $4.00\,\mathrm{m}$ in both frames. That cancellation is the length rule of this chapter, and it uses $t' = t$ in an essential way.
:::
:::

## Velocity and acceleration {#velocity}

A particle is a curve of events, $x(t)$ in $S$. The same curve has a description $x'(t')$ in $S'$. Differentiating the transformation gives the relation between the velocities, and differentiating again gives the relation between the accelerations. The first relation is a subtraction. The second is an identity.

::: theorem Galilean velocity addition {#thm-velocity}
Let $S'$ move at constant velocity $v$ relative to $S$ in standard configuration, and let a particle have $x$-component of velocity $u = \deriv{x}{t}$ in $S$. In $S'$ the $x$-component is

$$
u' = u - v.
$$ {#eq-u-gal}

The transverse components are unchanged: if $u_y = \deriv{y}{t}$ and $u_z = \deriv{z}{t}$, then $u'_y = u_y$ and $u'_z = u_z$. In vector form, if $\mathbf{v}_{\mathrm{frame}}$ is the velocity of $S'$ relative to $S$,

$$
\mathbf{u}' = \mathbf{u} - \mathbf{v}_{\mathrm{frame}}.
$$ {#eq-u-gal-vec}
:::

::: proof
Differentiate [[#eq-galilean]] with respect to time. Because $t' = t$, derivatives with respect to $t'$ and with respect to $t$ are the same operation. The frame velocity $v$ is constant, so

$$
u' = \deriv{x'}{t'} = \deriv{}{t}(x - v t) = \deriv{x}{t} - v = u - v.
$$

For the transverse coordinates, $y' = y$ gives $u'_y = u_y$, and likewise for $z$. The vector equation is those three components written together. The inverse is $u = u' + v$, which is [[#eq-galilean-inverse]] differentiated, or [[#eq-u-gal]] solved for $u$.
:::

The name "addition" is slightly misleading for [[#eq-u-gal]], which is a subtraction when $u'$ is what you want. The rule earns the name from the inverse: the velocity relative to the platform is the velocity relative to the carriage plus the velocity of the carriage. Both directions appear in the worked example below. What the equation never says is that the particle has one velocity. It has a velocity in each frame, and the two numbers differ by $v$.

::: proposition Invariance of acceleration {#prop-accel}
Under the hypotheses of [[#thm-velocity]], the acceleration of the particle is the same in $S$ and in $S'$. If $\mathbf{a} = \deriv{\mathbf{u}}{t}$ and $\mathbf{a}' = \deriv{\mathbf{u}'}{t'}$, then

$$
\mathbf{a}' = \mathbf{a}.
$$ {#eq-a-inv}
:::

::: proof
Differentiate [[#eq-u-gal-vec]] with respect to time. The frame velocity is constant, so its derivative is zero, and $t' = t$, so

$$
\mathbf{a}' = \deriv{\mathbf{u}'}{t} = \deriv{}{t}\bigl(\mathbf{u} - \mathbf{v}_{\mathrm{frame}}\bigr) = \deriv{\mathbf{u}}{t} = \mathbf{a}.
$$

Component by component, $a'_x = \deriv{}{t}(u - v) = a_x$ and $a'_y = a_y$, $a'_z = a_z$. The step fails if $v$ is not constant: a braking carriage is not an inertial frame, and [[#eq-galilean]] is not the transformation to use.
:::

::: corollary Relative velocity {#cor-relative}
Let two particles have velocities $\mathbf{u}_1$ and $\mathbf{u}_2$ in an inertial frame $S$. Their relative velocity $\mathbf{u}_1 - \mathbf{u}_2$ has the same value in every inertial frame related to $S$ by a Galilean transformation.
:::

::: proof
In $S'$, [[#eq-u-gal-vec]] gives $\mathbf{u}'_1 = \mathbf{u}_1 - \mathbf{v}_{\mathrm{frame}}$ and $\mathbf{u}'_2 = \mathbf{u}_2 - \mathbf{v}_{\mathrm{frame}}$. Subtract:

$$
\mathbf{u}'_1 - \mathbf{u}'_2 = \mathbf{u}_1 - \mathbf{u}_2.
$$

The frame velocity cancels. Closing speeds of two bodies, and the velocity of one body relative to another, are Galilean invariants. The velocity of either body relative to the platform is not.
:::

::: example The ball in the carriage {#ex-train}
A carriage moves at $20.0\,\mathrm{m/s}$ relative to the platform, in standard configuration, so $v = 20.0\,\mathrm{m/s}$. A passenger throws a ball forward at $15.0\,\mathrm{m/s}$ relative to the carriage, along $x$. Find the velocity of the ball relative to the platform. Repeat the problem for a throw backward at $15.0\,\mathrm{m/s}$ relative to the carriage.
::: solution
Take $S$ as the platform and $S'$ as the carriage. The throw is described most directly in the carriage, so the given numbers are $u'$, and [[#eq-u-gal]] solved for $u$ is the platform velocity:

$$
u = u' + v.
$$

Forward: $u' = +15.0\,\mathrm{m/s}$, so

$$
u = 15.0 + 20.0 = 35.0\,\mathrm{m/s}.
$$

Backward: $u' = -15.0\,\mathrm{m/s}$, the minus sign recording the sense opposite the carriage's velocity, so

$$
u = -15.0 + 20.0 = 5.00\,\mathrm{m/s}.
$$

Both results are platform velocities. The statements "the speed is $35.0\,\mathrm{m/s}$" and "the speed is $15.0\,\mathrm{m/s}$" can be true together, because they name different frames. Neither number is a property of the ball alone.

After the ball has left the hand, and while air resistance is neglected, the only acceleration is the vertical $-g$, with $g = 9.80\,\mathrm{m/s^2}$, in the platform frame. By [[#prop-accel]] the acceleration in the carriage is the same. The horizontal component of velocity is constant in each frame, and the two constants differ by $20.0\,\mathrm{m/s}$.
:::
:::

A vertical throw makes the same point in two dimensions, and it is the ship argument reduced to one ball. Suppose the passenger throws the ball straight up at $15.0\,\mathrm{m/s}$ relative to the carriage and catches it at the same height. Upward is positive. The time of flight is the time from $u_y = 15.0\,\mathrm{m/s}$ to $u_y = -15.0\,\mathrm{m/s}$ at $a_y = -9.80\,\mathrm{m/s^2}$,

$$
t = \frac{30.0}{9.80} = 3.06\,\mathrm{s}.
$$

In the carriage the horizontal velocity of the ball is zero, so the ball returns to the hand. In the platform frame the ball had horizontal velocity $20.0\,\mathrm{m/s}$ throughout, and during those $3.06\,\mathrm{s}$ it moves

$$
(20.0)\left(\frac{30.0}{9.80}\right) = 61.2\,\mathrm{m}
$$

down the platform. Both descriptions are complete. The landing place relative to the passenger is an invariant of the sort [[#cor-relative]] describes: the ball and the hand have the same horizontal velocity in every Galilean frame, so their separation along $x$ does not grow.

::: example Rain against the window {#ex-rain}
In the platform frame, rain falls vertically at $8.00\,\mathrm{m/s}$. A carriage moves at $20.0\,\mathrm{m/s}$ in the positive $x$ direction. Find the velocity of the rain relative to the carriage, its speed, and the angle from the vertical at which it meets the window.
::: solution
Take downward as the negative $y$ direction. In the platform frame, $u_x = 0$ and $u_y = -8.00\,\mathrm{m/s}$. The carriage is $S'$, with $v = 20.0\,\mathrm{m/s}$. [[#eq-u-gal-vec]] gives

$$
u'_x = 0 - 20.0 = -20.0\,\mathrm{m/s}, \qquad u'_y = -8.00\,\mathrm{m/s}.
$$

The rain's speed relative to the carriage is

$$
\abs{\mathbf{u}'} = \sqrt{(20.0)^2 + (8.00)^2} = \sqrt{464} = 21.5\,\mathrm{m/s}.
$$

The angle $\theta$ from the vertical satisfies

$$
\tan\theta = \frac{\abs{u'_x}}{\abs{u'_y}} = \frac{20.0}{8.00} = 2.50, \qquad \theta = 68.2^{\circ}.
$$

The streaks on the window slant backwards. A passenger who quoted $8.00\,\mathrm{m/s}$ as "the speed of the rain" would be quoting the platform frame, and would mis-set the angle of an umbrella. The acceleration of a raindrop, if we treat it as already at terminal speed, is zero in both frames, in agreement with [[#prop-accel]]. The velocities are not zero, and they do not agree.
:::
:::

::: widget boost
v: 0.2
u: 0.3
caption: Frame velocity v/c = 0.2 and object velocity u/c = 0.3. The figure adds them in two ways. The Galilean sum is v + u = 0.500, in units of c. The Einstein sum, which the readout calls u'/c, is (v + u)/(1 + v u) = 0.472. Drag either slider. At a few tenths of c the two dots have already separated, and the Einstein dot stays inside the marks at ±1. The panel also prints γ(v) = 1/sqrt(1 − v²/c²), equal to 1.021 at v = 0.2c; that factor belongs to the transformation derived in the next chapter, and it is not part of the Galilean rule.
:::

::: widget plot
f: x+0.3 ; (x+0.3)/(1+0.3*x)
x: 0, 0.9
y: 0, 1.35
labels: Galilean sum; Einstein sum
caption: Both curves add a variable velocity x, in units of c, to the fixed velocity 0.3c. The straight line is the Galilean sum x + 0.3. The lower curve is the relativistic sum (x + 0.3)/(1 + 0.3 x), the rule the boost figure uses. Near x = 0 the curves are close. By x = 0.2 they already differ, and the straight line is the one that will cross 1.
:::

## Where the two addition rules differ {#rules}

[[#thm-velocity]] is the whole of velocity arithmetic in this chapter. Applied to light, it says something sharp. If a light pulse has velocity $+c$ in a frame $S$, then in a frame moving at $+v$ relative to $S$ the same pulse has velocity $c - v$. A pulse sent the other way has velocity $-c$ in $S$ and $-c - v$ in the moving frame, so its speed is $c + v$. Light, if it obeyed the Galilean rule, would have speed $c \pm v$.

At everyday speeds the fraction $v/c$ is small, which is why the rule has survived in mechanics. With $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$ and a carriage at $20.0\,\mathrm{m/s}$,

$$
\frac{v}{c} = \frac{20.0}{2.99792458\times 10^{8}} = 6.67\times 10^{-8}.
$$

A Galilean shift of a light speed by one carriage velocity would change that speed by less than a part in ten million. For two ordinary velocities the disagreement between [[#eq-u-gal]] and the relativistic rule used on the figure is smaller still. The relativistic sum of collinear velocities $v$ and $u$, in units where $c = 1$, is $(v+u)/(1+vu)$. Restoring $c$, the platform speed of the ball would be

$$
\frac{u' + v}{1 + u' v/c^{2}}
$$

instead of $u' + v$. For $15.0\,\mathrm{m/s}$ and $20.0\,\mathrm{m/s}$ the correction in the denominator is

$$
\frac{u' v}{c^{2}} = \frac{300}{c^{2}} = 3.34\times 10^{-15}.
$$

The two predictions for the platform speed differ by a fraction of that order. No measurement of a ball can see it. The Galilean rule is not an approximation we apologise for in the carriage. It is the correct low-speed limit of the rule the next chapter derives, and at $20\,\mathrm{m/s}$ the limit has already been reached for every practical purpose.

The interesting numbers are fractions of $c$, where the two rules separate on the figure above. The arithmetic is short, and it is the comparison the rest of the course keeps returning to.

::: example Two tenths and three tenths of c {#ex-tenths}
Add the collinear velocities $0.200c$ and $0.300c$ with the Galilean rule, and again with the relativistic rule $(v+u)/(1+vu)$ in units of $c$.
::: solution
Galilean addition, [[#eq-u-gal]] in the inverse direction, is ordinary arithmetic:

$$
0.200c + 0.300c = 0.500c.
$$

The relativistic sum, in units of $c$, is

$$
\frac{0.2 + 0.3}{1 + 0.2\times 0.3} = \frac{0.5}{1.06} = 0.471698\ldots,
$$

which is $0.472c$ to three significant figures. The algebra is exactly the expression $(0.2+0.3)/(1+0.2\times 0.3)$. The relativistic sum is smaller than the Galilean sum by $0.0283c$. Nothing in this chapter has justified the relativistic formula. It is the rule drawn on the figure, derived from the Lorentz transformation in the next chapter, and recorded here so that the size of the disagreement is a computed number rather than a slogan. At these speeds the disagreement is several per cent. At carriage speeds it was $10^{-15}$.
:::
:::

An aether wind of the size once expected from the Earth's orbit is a similar comparison with a more famous number. Take $v = 3.00\times 10^{4}\,\mathrm{m/s}$, about $30\,\mathrm{km/s}$. Then

$$
\frac{v}{c} = 1.00\times 10^{-4}.
$$

Galilean addition would give light the two speeds

$$
c - v = 2.99762458\times 10^{8}\,\mathrm{m/s}, \qquad c + v = 2.99822458\times 10^{8}\,\mathrm{m/s}.
$$

The shift is $30.0\,\mathrm{km/s}$ on a speed of $3.00\times 10^{8}\,\mathrm{m/s}$. That is the order of the effect a nineteenth-century aether theory asked an interferometer to find. We return to the measurement in the next chapter. Here the only claim is kinematic: $c \pm v$ is what [[#thm-velocity]] predicts, and $c \pm v$ is what electromagnetism will refuse.

## Newton's laws in every inertial frame {#newton}

Acceleration is invariant. The second law relates force to acceleration. For the law to have the same form in every inertial frame, the force must be invariant as well, or must change in a way that matches. The forces of elementary mechanics do the first of those things, for a reason that is easy to see from [[#eq-galilean]] and easy to lose when a medium is involved.

::: proposition Newtonian relativity {#prop-newton}
Suppose the mass $m$ of a particle is the same positive number in every inertial frame, and suppose every force on it is a function only of the differences of position of the bodies that interact, and of their relative velocities. Then $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ holds in one inertial frame if and only if it holds, with the same forces, in every inertial frame related to the first by a Galilean transformation.
:::

::: proof
By [[#prop-accel]], $\mathbf{a}' = \mathbf{a}$. By the hypothesis on $m$, the products $m\mathbf{a}$ and $m\mathbf{a}'$ therefore agree. It remains to check the forces. For any two particles, [[#eq-galilean]] gives

$$
x'_2 - x'_1 = (x_2 - v t) - (x_1 - v t) = x_2 - x_1,
$$

and the same for $y$ and $z$. Every difference of coordinates, at a shared time, is invariant. By [[#cor-relative]], every relative velocity is invariant. A force that is a function only of those quantities therefore takes the same value in $S$ and in $S'$. Hence $\mathbf{F}' = \mathbf{F}$, and $\mathbf{F} = m\mathbf{a}$ is the same statement as $\mathbf{F}' = m\mathbf{a}'$.
:::

A spring, a Newtonian gravitational force, and the tension in a string are covered by [[#prop-newton]]. Their laws mention separations, or rates of change of separations, and nothing else. This is why a mechanics laboratory in the hold of a ship that moves uniformly cannot detect the motion. The forces and the accelerations are the ones the laboratory already knows.

The mass in [[#prop-newton]] is the inertial mass of [[mechanics/newton-laws]]. It is not given a factor that depends on speed. Nothing in the Galilean theory suggests such a factor, and this course will not introduce one later under another name. When momentum and energy are rebuilt, the mass $m$ that enters them is still this invariant.

The hypothesis on the forces is not optional, and drag is the standard way to break it. Drag through the air depends on the velocity of the body relative to the air, not only on velocities of bodies relative to each other. If the air is at rest in one frame, that frame is preferred by the force law. A carriage with the windows open is not the closed ship. The next section is that observation applied to waves.

## Sound has a rest frame {#sound}

A sound wave of small amplitude travels, relative to the air, at a speed fixed by the air. Call that speed $c_{\mathrm{s}}$ in the rest frame of the air. Galilean addition then does exactly what it did for the ball. In a frame moving at velocity $v$ through the air, a sound wave that propagates in the positive $x$ direction has velocity $c_{\mathrm{s}} - v$, and a wave that propagates in the negative $x$ direction has speed $c_{\mathrm{s}} + v$. There is a preferred frame: the frame in which the two speeds agree.

That preference is why the Doppler formula for sound is not symmetric between motion of the source and motion of the observer. The formula in [[oscillations/sound]] has to say which of them is moving relative to the air. An observer moving towards a source that is at rest in the air, and a source moving towards an observer who is at rest in the air, at the same speed relative to the air, do not produce the same shift. The medium has selected a frame, and [[#thm-velocity]] then does the rest. Nothing there contradicts [[#prop-newton]]. The force on a parcel of air depends on the air around it. The wave's speed is a speed through a material, and materials have rest frames.

If light were a vibration of a material, even a strange one, the same structure would apply. The material was called the luminiferous aether. In the aether's rest frame, light would travel at $c$ in every direction. In a laboratory moving at velocity $v$ through the aether, Galilean addition would give the speeds $c \pm v$ computed above. The Earth's orbital speed, of order $30\,\mathrm{km/s}$, would be a wind of that size past the apparatus, unless the aether were dragged along completely with the Earth. Electromagnetism does not fit that pattern. The reason is not a detail of Doppler algebra. It is that the vacuum equations fix a speed with no medium left over to be at rest.

## Why electromagnetism does not fit {#maxwell}

In vacuum, Maxwell's equations imply a wave equation for the electric field and for the magnetic field, with propagation speed

$$
c = \frac{1}{\sqrt{\mu_0 \eps_0}}.
$$

The constants here are $\mu_0 = 4\pi\times 10^{-7}\,\mathrm{N\,A^{-2}}$ and $\eps_0 = 8.854187817\times 10^{-12}\,\mathrm{C^{2}\,N^{-1}\,m^{-2}}$. Their combination is

$$
\frac{1}{\sqrt{\mu_0 \eps_0}} = 2.99792458\times 10^{8}\,\mathrm{m/s},
$$

agreeing with the defined value $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$ to every digit the given $\eps_0$ can support. The raw quotient is larger than that defined value by about $0.011\,\mathrm{m/s}$, which sits inside one unit in the last place of the supplied $\eps_0$. The speed in the wave equation is not a speed we measured through a named medium and then inserted. It is assembled from the two constants that already stand in Coulomb's law and in the magnetic force between currents. [[magnetism/electromagnetic-waves]] derives the wave. This chapter asks what a change of frame does to it.

A spherical shell of light is the cleanest test, and it uses only algebra.

::: proposition A light sphere is not Galilean {#prop-sphere}
Suppose a flash at the common origin at $t = 0$ produces a spherical front which, in the inertial frame $S$, is the set of events

$$
x^{2} + y^{2} + z^{2} = c^{2} t^{2}.
$$ {#eq-sphere}

Under the Galilean transformation [[#eq-galilean]] with $v \neq 0$, those events do not satisfy $x'^{2} + y'^{2} + z'^{2} = c^{2} t'^{2}$.
:::

::: proof
Substitute $x = x' + v t'$, $y = y'$, $z = z'$ and $t = t'$ into [[#eq-sphere]]:

$$
(x' + v t')^{2} + y'^{2} + z'^{2} = c^{2} t'^{2}.
$$

Expand the square:

$$
x'^{2} + y'^{2} + z'^{2} + 2 v x' t' + v^{2} t'^{2} = c^{2} t'^{2}.
$$

The cross term $2 v x' t'$ and the term $v^{2} t'^{2}$ are not zero for every point of the front when $v \neq 0$. The equation $x'^{2} + y'^{2} + z'^{2} = c^{2} t'^{2}$ would require both of them to vanish identically on the front, and they do not. For a concrete point, the event $x = c t$, $y = z = 0$ lies on the front in $S$. Its image is $x' = (c - v) t'$, $y' = z' = 0$, and $(c - v)^{2} t'^{2} = c^{2} t'^{2}$ forces $v = 0$ or $v = 2c$. A frame of ordinary velocity $v$ does not keep the front spherical about the origin of $S'$ with radius $c t'$.
:::

In $S'$ the front is dragged. The centre of the sphere, if one insists on reading the expanded equation as a sphere, moves, and the radius does not grow at the single speed $c$ in every direction. That is $c \pm v$ again, now for a whole shell rather than for one ray. [[#prop-sphere]] is the statement that Galilean kinematics and a universal speed of light contradict each other. One of them has to be given up. Mechanics, through [[#prop-newton]], is on the side of the Galilean transformation. The vacuum wave equation is on the side of a single speed $c$.

The same clash can be written differentially, which is how it appears in the field equations rather than in one flash.

::: theorem The wave equation is not Galilean-invariant {#thm-wave}
Suppose a field component $E$ satisfies the one-dimensional wave equation in $S$,

$$
\pdv{^{2} E}{x^{2}} - \frac{1}{c^{2}}\pdv{^{2} E}{t^{2}} = 0,
$$

with $c$ constant. Let $x' = x - v t$ and $t' = t$, with $v$ constant and nonzero. Then, as a function of $x'$ and $t'$, $E$ does not in general satisfy

$$
\pdv{^{2} E}{x'^{2}} - \frac{1}{c^{2}}\pdv{^{2} E}{t'^{2}} = 0.
$$
:::

::: proof
The chain rule for the first derivatives, using $\partial x'/\partial x = 1$, $\partial t'/\partial x = 0$, $\partial x'/\partial t = -v$ and $\partial t'/\partial t = 1$, is

$$
\pdv{E}{x} = \pdv{E}{x'}, \qquad \pdv{E}{t} = -v\,\pdv{E}{x'} + \pdv{E}{t'}.
$$

Differentiate again. The spatial derivative passes through unchanged,

$$
\pdv{^{2} E}{x^{2}} = \pdv{^{2} E}{x'^{2}},
$$

while the time derivative acts as the operator $-v\,\partial/\partial x' + \partial/\partial t'$ applied twice:

$$
\pdv{^{2} E}{t^{2}} = v^{2}\,\pdv{^{2} E}{x'^{2}} - 2v\,\frac{\partial^{2} E}{\partial x'\,\partial t'} + \pdv{^{2} E}{t'^{2}}.
$$

Substitute these into the wave equation in $S$ and collect terms:

$$
\left(1 - \frac{v^{2}}{c^{2}}\right)\pdv{^{2} E}{x'^{2}} + \frac{2v}{c^{2}}\frac{\partial^{2} E}{\partial x'\,\partial t'} - \frac{1}{c^{2}}\pdv{^{2} E}{t'^{2}} = 0.
$$

If $E$ also satisfied the wave equation in $S'$ with the same $c$, the cross derivative would have to be absent and the coefficient of $\partial^{2} E/\partial x'^{2}$ would have to equal $1$. Both fail when $v \neq 0$. A wave of the form $f(x - c t)$, which solves the equation in $S$, becomes $f\bigl(x' - (c - v) t'\bigr)$ in the new coordinates, a wave of speed $c - v$ rather than $c$.
:::

[[#thm-wave]] does not say that Maxwell's equations are wrong. It says they cannot hold, with the same $c$, in every inertial frame, if the frames are related by [[#eq-galilean]]. Something has to yield. The possibilities that were open at the end of the nineteenth century were these. One: the equations hold in a single preferred frame, the rest frame of an aether, and other frames see $c \pm v$. Two: moving bodies contract, or clocks misbehave, in just such a way that an aether wind is hidden. Three: the transformation between inertial frames is not Galilean, the vacuum equations hold in every inertial frame, and $c$ is the speed of light in all of them.

This course takes the third road, starting in the next chapter. The first road is what a Michelson interferometer was built to test. The second was a real proposal, due to FitzGerald and to Lorentz, and it is not foolish: it is an attempt to keep the aether and still match a null result. Einstein's move was to stop using the aether as the thing that defines the coordinates.

There is a second, quieter symptom in the force law itself. The magnetic force on a charge is $q\,\mathbf{v}\times\mathbf{B}$, and $\mathbf{v}$ is a velocity, so it depends on the frame. A charge at rest beside a current-carrying wire feels no magnetic force. The same objects, described from a frame in which the charge moves with the drift of one of the currents, are not "a charge at rest". Under a Galilean transformation the split between electric and magnetic forces does not rearrange into the Lorentz force in the new frame, while Maxwell's equations keep their form. We do not transform the fields in this chapter. [[#thm-wave]] is already a sufficient contradiction. The field transformation becomes a tidy one only after the coordinate transformation itself has been replaced.

::: warning A speed belongs to a frame
"The ball's speed is $35.0\,\mathrm{m/s}$" is a platform sentence. "The ball's speed is $15.0\,\mathrm{m/s}$" is a carriage sentence. There is no frame-free speed of the ball, and averaging the two numbers does not produce one. Accelerations agree, by [[#prop-accel]]. Velocities do not, by [[#thm-velocity]]. The same warning applies to light if you are still using this chapter's rule: $c$ in one frame and $c - v$ in another are not two opinions about a single number. They are what Galilean addition requires. The next chapter drops that requirement for vacuum light, and then, as a consequence, for every velocity.
:::

::: quiz
A carriage moves at constant velocity $20\,\mathrm{m/s}$ relative to the platform. A passenger throws a ball forward at $15\,\mathrm{m/s}$ relative to the carriage, along the same line. While the ball is in the air, air resistance is neglected. Which statement is correct?
- [ ] The ball has one speed, $35\,\mathrm{m/s}$, and both frames must use that number.
- [ ] The ball has one speed, $15\,\mathrm{m/s}$, because the throw fixes the speed.
- [x] Relative to the carriage the horizontal velocity is $15\,\mathrm{m/s}$; relative to the platform it is $35\,\mathrm{m/s}$. The acceleration is the same in the two frames.
- [ ] The accelerations differ, because the velocities differ, so Newton's second law can hold in only one of the two frames.
::: solution
[[#ex-train]] is this situation. Velocity addition, [[#eq-u-gal]], shifts the horizontal velocity by the frame velocity and leaves you with two true statements about two frames. [[#prop-accel]] says the accelerations agree, so the second law is not forced to choose a frame. The first two options invent a frame-free speed. The fourth confuses the fact that velocities change with the fact that their rates of change do not.
:::
:::

## Where this leads {#leads}

The next chapter of [[relativity]] keeps the principle that no inertial-frame experiment detects uniform motion, and adds a second principle: the speed of light in vacuum does not depend on the motion of the source, and takes the same value in every inertial frame. Those two sentences contradict [[#eq-u-gal]] for a light ray. The coordinate transformation that replaces [[#eq-galilean]] is the Lorentz transformation. Time intervals and lengths of moving rods then depend on the frame. This chapter's results are not discarded. They are the limit $v \ll c$, in which $t' = t$ is good enough and $c \pm v$ cannot be told from $c$ by any carriage-scale measurement.

[[mechanics/newton-laws]] remains the mechanics of that limit. [[magnetism/electromagnetic-waves]] remains the source of the wave speed that would not take a Galilean shift. What changes is the kinematics that sits between them.

::: history The ship of 1632
Galileo Galilei argued the mechanical principle in the *Dialogue Concerning the Two Chief World Systems* (1632), on the second day. The speaker asks you to shut yourself in the main cabin below decks, with a friend, and to bring small flying animals, a bowl of water with fish in it, and a bottle that drips into a vessel underneath. While the ship is at rest you watch the animals fly, the fish swim, the drops fall into the vessel, a jump, and an object thrown to your companion. Then the ship is set moving uniformly, without rocking. None of those motions inside the closed cabin changes: the drops still fall into the vessel, and you still throw equally well towards the bow and towards the stern. The ship's motion is shared by the objects, the cabin, and the air in the cabin. Galileo notes that the conclusion depends on being enclosed. Up on deck, where the outside air is not carried with the ship, smoke and flying animals need not keep up.

He did not write [[#eq-galilean]]. The algebraic transformation is the later coordinate form of that argument, once a single time coordinate and a Euclidean ruler are granted. The formula is what we have used. The cabin is why [[#prop-newton]] matters.

The difficulty with light is much later. Maxwell's dynamical theory of 1865 identified light with an electromagnetic wave whose speed is fixed by the electromagnetic constants, which is the speed computed in this chapter. How that statement sits with Galileo's cabin is the question the next chapter answers. We have not quoted Galileo, and we do not need a quotation: the experiments in the cabin are the argument.
:::

::: summary
- An inertial frame is one in which every free particle has constant velocity. Frames related by a constant relative velocity are both inertial or both not.
- Events are labelled by $(t, x, y, z)$. In standard configuration, $S'$ moves at constant $v$ along $x$, the axes are parallel, and the origins coincide at $t = t' = 0$.
- The Galilean transformation is $x' = x - v t$, $y' = y$, $z' = z$, $t' = t$. It encodes one shared time and lengths that agree for simultaneous events.
- Velocities subtract: $\mathbf{u}' = \mathbf{u} - \mathbf{v}_{\mathrm{frame}}$. A forward throw at $15.0\,\mathrm{m/s}$ in a carriage at $20.0\,\mathrm{m/s}$ is a $35.0\,\mathrm{m/s}$ motion on the platform; a backward throw at $15.0\,\mathrm{m/s}$ is $5.00\,\mathrm{m/s}$ on the platform.
- Accelerations are invariant. Relative velocities of two particles are invariant. The velocity of one particle relative to a frame is not.
- If mass is invariant and forces depend only on separations and relative velocities, $\mathbf{F} = m\mathbf{a}$ has the same form in every inertial frame. A medium at rest in one frame, such as the air for sound, selects a preferred frame and breaks that pattern.
- Galilean addition applied to light gives speeds $c \pm v$. A spherical light front is not mapped to a spherical front, and the wave equation with speed $c$ does not keep its form. At $0.200c$ and $0.300c$ the Galilean sum is $0.500c$ and the relativistic sum $(0.2+0.3)/(1+0.2\times 0.3)$ is $0.472c$.
- Everyday values of $v/c$ are tiny ($6.67\times 10^{-8}$ at $20.0\,\mathrm{m/s}$), so the Galilean rule remains the mechanics of the laboratory. It is the rule this course gives up for light.
:::

## Exercises {#exercises}

::: exercise Walking in a ship {level=1 check="9.5"}
A ship moves at $8.00\,\mathrm{m/s}$ relative to the dock, in standard configuration. A passenger walks forward at $1.50\,\mathrm{m/s}$ relative to the ship, along $x$. Find the passenger's velocity relative to the dock, in $\mathrm{m/s}$.
::: solution
The dock is $S$ and the ship is $S'$, with $v = 8.00\,\mathrm{m/s}$. The walk is given in the ship, so $u' = 1.50\,\mathrm{m/s}$. The inverse of [[#eq-u-gal]] is

$$
u = u' + v = 1.50 + 8.00 = 9.50\,\mathrm{m/s}.
$$

The positive sign means the passenger moves in the positive $x$ direction relative to the dock, faster than the ship by the walking speed. The acceleration of a steady walk is zero in both frames. The two velocities, $1.50\,\mathrm{m/s}$ and $9.50\,\mathrm{m/s}$, are both correct, and they are not two attempts at one number.
:::
:::

::: exercise Walking towards the stern {level=1 check="6.5"}
The ship and passenger of the previous exercise are unchanged, except that the passenger walks towards the stern at $1.50\,\mathrm{m/s}$ relative to the ship. Find the velocity relative to the dock, in $\mathrm{m/s}$, with the ship's velocity taken as positive.
::: solution
Towards the stern is the negative direction in standard configuration, so $u' = -1.50\,\mathrm{m/s}$ and $v = 8.00\,\mathrm{m/s}$. Then

$$
u = -1.50 + 8.00 = 6.50\,\mathrm{m/s}.
$$

The passenger still moves forward relative to the dock, because the ship is faster than the walk. Reporting $9.50\,\mathrm{m/s}$ again would mean the direction of the walk had been ignored. Reporting $-6.50\,\mathrm{m/s}$ would mean the positive sense had been flipped without saying so. The sign convention is part of the answer.
:::
:::

::: exercise Coordinates of a flash {level=1 check="30"}
A flash has coordinates $x = 48.0\,\mathrm{m}$, $t = 3.00\,\mathrm{s}$ in $S$. The frame $S'$ moves at $v = 6.00\,\mathrm{m/s}$ in standard configuration. Find $x'$ in metres.
::: solution
[[#eq-galilean]] gives $t' = 3.00\,\mathrm{s}$ and

$$
x' = 48.0 - (6.00)(3.00) = 48.0 - 18.0 = 30.0\,\mathrm{m}.
$$

The $18.0\,\mathrm{m}$ is how far the origin of $S'$ has travelled along $x$ by the time of the flash. It is not a length of an object. The inverse, $x = 30.0 + (6.00)(3.00) = 48.0\,\mathrm{m}$, recovers the original label. A second flash at the same time and at $x = 50.0\,\mathrm{m}$ would have $x' = 32.0\,\mathrm{m}$, and the separation would be $2.00\,\mathrm{m}$ in both frames.
:::
:::

::: exercise Subtracting a frame velocity {level=2 check="7"}
In the platform frame a particle has $x$-component of velocity $u = 12.0\,\mathrm{m/s}$. A carriage moves at $v = 5.00\,\mathrm{m/s}$ in standard configuration relative to the platform. Find the $x$-component of the particle's velocity relative to the carriage, in $\mathrm{m/s}$.
::: solution
Here the given velocity is in $S$, and the question asks for $S'$. [[#eq-u-gal]] applies as written:

$$
u' = u - v = 12.0 - 5.00 = 7.00\,\mathrm{m/s}.
$$

Adding $5.00$ instead of subtracting it is the inverse operation, and it answers a different question: what platform velocity corresponds to a carriage velocity of $12.0\,\mathrm{m/s}$. That number would be $17.0\,\mathrm{m/s}$, and it is not this problem. Draw the standard configuration and decide which symbol you were given before you touch the sign.
:::
:::

::: exercise The slant of the rain {level=2 check="5/3"}
Rain falls vertically at $9.00\,\mathrm{m/s}$ in the ground frame. A train moves horizontally at $15.0\,\mathrm{m/s}$. Find $\tan\theta$, where $\theta$ is the angle from the vertical at which the rain meets the train.
::: solution
In the ground frame, $u_x = 0$ and the vertical component has magnitude $9.00\,\mathrm{m/s}$. In the train frame, [[#eq-u-gal-vec]] shifts only the horizontal component:

$$
u'_x = -15.0\,\mathrm{m/s}, \qquad u'_y = -9.00\,\mathrm{m/s}
$$

if downward is negative. The angle from the vertical satisfies

$$
\tan\theta = \frac{15.0}{9.00} = \frac{5}{3}.
$$

The speed relative to the train, not requested, is $\sqrt{15.0^{2} + 9.00^{2}} = \sqrt{306} = 17.5\,\mathrm{m/s}$. The angle is a statement about the train frame. In the ground frame the angle from the vertical is zero, and both descriptions are right. This is [[#ex-rain]] with different numbers, and the same warning: do not call either speed "the" speed of the rain.
:::
:::

::: exercise The relativistic comparison {level=2 check="(0.2+0.3)/(1+0.2*0.3)"}
Two collinear velocities are $0.200c$ and $0.300c$. Compute their relativistic sum in units of $c$, using $(v+u)/(1+vu)$, and compare it with the Galilean sum.
::: solution
The Galilean sum is $0.200 + 0.300 = 0.500$, in units of $c$. The relativistic sum is

$$
\frac{0.2 + 0.3}{1 + 0.2\times 0.3} = \frac{0.5}{1.06} = 0.471698\ldots = 0.472
$$

to three significant figures, again in units of $c$. The value $0.472c$ is the three-figure rounding of that exact quotient, not a different formula. The difference, $0.0283c$, is the separation of the two dots on the boost figure when the sliders sit at $0.2$ and $0.3$. This exercise uses the relativistic rule as a given function. The derivation is the next chapter's, from the Lorentz transformation, and the Galilean value $0.500c$ remains the answer whenever the hypotheses of [[#thm-velocity]] are the ones in force.
:::
:::

::: exercise Prove that acceleration is invariant {level=3}
State the hypotheses, and prove that if $S'$ is related to $S$ by [[#eq-galilean]] then every particle has the same acceleration in the two frames. Point out the step that fails if the relative velocity of the frames is not constant.
::: hint
Differentiate $x' = x - v t$ twice, and use $t' = t$. Keep $v$ outside the derivative only after you have said why you may.
:::
::: solution
Hypotheses: $S'$ is in standard configuration with the inertial frame $S$, the relative velocity $v$ is constant, and the coordinates are related by $x' = x - v t$, $y' = y$, $z' = z$, $t' = t$. Let a particle have coordinates $x(t)$ in $S$. Its acceleration component in $S$ is $a_x = \dd^{2} x/\dd t^{2}$. In $S'$,

$$
a'_x = \frac{\dd^{2} x'}{\dd t'^{2}}.
$$

Because $t' = t$, the derivative is an ordinary derivative with respect to $t$. Because $v$ is constant,

$$
\deriv{x'}{t} = \deriv{x}{t} - v, \qquad \frac{\dd^{2} x'}{\dd t^{2}} = \frac{\dd^{2} x}{\dd t^{2}}.
$$

The same calculation with $y' = y$ and $z' = z$ gives $a'_y = a_y$ and $a'_z = a_z$. So $\mathbf{a}' = \mathbf{a}$.

If $v$ is a function of time, the first derivative is $\deriv{x}{t} - v(t)$, and the second derivative is $a_x - \deriv{v}{t}$. The accelerations then differ by the acceleration of the frame. That is the right answer for a braking carriage, and it is outside the hypotheses: [[#eq-galilean]] was written for constant $v$, and a frame with changing $v$ is not inertial.
:::
:::

::: exercise The wave equation after a boost {level=3}
A field depends on $x$ and $t$ through the combination $x - c t$ only, with $c$ constant, so it satisfies the one-dimensional wave equation in $S$. Using $x' = x - v t$ and $t' = t$ with $v$ constant and $v \neq 0$, rewrite the field as a function of $x'$ and $t'$ and read off its speed in $S'$. Explain why that speed is not $c$.
::: hint
Solve the transformation for $x - c t$ in terms of $x'$ and $t'$. You do not need the general chain rule if the wave is a function of one combination; [[#thm-wave]] is the general case.
:::
::: solution
From the inverse transformation, $x = x' + v t'$ and $t = t'$, so

$$
x - c t = x' + v t' - c t' = x' - (c - v)\, t'.
$$

A field that is an arbitrary function $f(x - c t)$ in $S$ is the function $f\bigl(x' - (c - v)\, t'\bigr)$ in $S'$. That is a wave travelling in the positive $x'$ direction at speed $c - v$, not at speed $c$. The wave equation in $S'$ with the original speed $c$ would have required the combination $x' - c t'$. The leftover $v$ is the Galilean shift of [[#thm-velocity]] applied to a signal that had speed $c$ in $S$.

The conclusion uses $v \neq 0$. It also uses $t' = t$, which is the assumption the next chapter drops. If a theory insists that the same field equation, with the same $c$, holds in every inertial frame, this calculation shows that the inertial frames cannot be related by the Galilean transformation. That is the clash [[#thm-wave]] states for a general field, specialised here to a one-way wave so the speed can be read off by eye.
:::
:::
