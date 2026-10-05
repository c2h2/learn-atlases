Kinematics, as in [[mechanics/motion-2d]], says what an acceleration is. It does not say why a puck on ice and the same puck on grass, with the same position at one instant, have different accelerations a moment later. The difference is the interaction with the surroundings. Newton's laws turn that interaction into a vector called **force**, and they restrict the frames in which force and motion are related in the simplest way.

The three laws do different jobs. The first selects the frames. The second, inside those frames, relates the net force on a body to the rate of change of its momentum. The third constrains forces to come in pairs, on different bodies. Almost every later problem is the second law applied to one body, with every force on it and with no force that belongs on a different diagram.

Two warnings belong at the start, because they are the usual source of a confident wrong answer. Weight and the normal force from a surface can be equal and still not be a third-law pair. And the inward acceleration of circular motion, $v^{2}/R$ from [[mechanics/motion-2d]], is produced by whatever real forces point inward. "Centripetal force" is a name for their net inward contribution, not an extra arrow drawn beside them. Take $g = 9.80\,\mathrm{m/s^{2}}$ unless a problem says otherwise.

## Inertial frames and the first law

A law that mentions acceleration has to say with respect to what. Acceleration relative to a braking car is not acceleration relative to the road, and a law that held in both frames with the same forces would be a different law from the one Newton stated.

::: definition Inertial frame {#def-inertial}
A **free particle** is a particle on which the net force is zero. A frame is an **inertial frame** if, in that frame, every free particle moves with constant velocity: in a straight line at constant speed, or else remains at rest. Newton's **first law** is the assertion that inertial frames exist. The law defines them.
:::

The first law is not the special case $\mathbf{F} = \mathbf{0}$ of the second law. The second law, as used below, already assumes an inertial frame. The first law is what selects those frames. In a frame that accelerates relative to an inertial frame, a free particle does not move at constant velocity, so the same forces do not satisfy $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ with $\mathbf{a}$ measured there. This chapter does not add fictitious forces. Every $\mathbf{F} = m\mathbf{a}$ below is written in an inertial frame.

A frame moving at constant velocity relative to an inertial frame is itself inertial. A frame that accelerates or rotates relative to one is not. The ground is a good enough inertial frame for this course; the Coriolis deflection from the Earth's rotation is neglected. A lift speeding up, or the interior of a car on a bend, is not an inertial frame. The ground frame is the one in which the laws are applied, and the lift or the car is then an object with an acceleration.

Gravity, in this Newtonian accounting, is a force. A particle in free fall is therefore not a free particle in the sense of [[#def-inertial]]: relative to the ground the net force is its weight, and it accelerates. A frame attached to a falling lift is not inertial. Inside it a released object has acceleration zero relative to the lift, even though the gravitational force has not disappeared. This chapter treats gravity as a force and the ground as inertial.

::: intuition What the first law is for
The first law is a test, not a formula to substitute into. If you are unsure of a frame, ask what a free particle does in it. Constant velocity means the frame is allowed, and the second law may be used as $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$. Any other behaviour of a free particle means the frame is not allowed for that equation. The test comes before the algebra.
:::

## Momentum, mass and the second law

The quantity the second law actually governs is momentum, not acceleration. Acceleration enters only when the mass is constant.

::: definition Momentum and the second law {#def-momentum}
The **momentum** of a particle with mass $m$ and velocity $\mathbf{v}$ is

$$
\mathbf{p} = m\mathbf{v}.
$$ {#eq-momentum}

Newton's **second law** says that the net force on the particle equals the rate of change of its momentum,

$$
\mathbf{F}_{\mathrm{net}} = \deriv{\mathbf{p}}{t}.
$$ {#eq-second}

If $m$ is constant, this is $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$, with $\mathbf{a} = \deriv{\mathbf{v}}{t}$. The mass $m$ is a positive scalar, the same in every inertial frame of this chapter. It measures the inertia of the particle: for a given net force, a larger mass means a smaller acceleration.
:::

::: proof
If $m$ does not depend on time, the product rule on [[#eq-momentum]] gives $\deriv{\mathbf{p}}{t} = m\,\deriv{\mathbf{v}}{t} = m\mathbf{a}$. Substituting into [[#eq-second]] is $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$. The step is the constancy of $m$. It is not a rewriting that remains valid for a body that is gaining or losing mass.
:::

A rocket is the case the step excludes. Exhaust leaves carrying momentum, so the rocket body at time $t$ and a moment later are not the same collection of matter. Writing $\mathbf{F} = m\mathbf{a}$ for the rocket, or $\mathbf{F} = \deriv{(m\mathbf{v})}{t}$ with $\mathbf{v}$ the rocket's velocity alone, drops that momentum and gives the wrong thrust. The balance in [[mechanics/momentum]] applies [[#eq-second]] to a system of fixed composition, exhaust included. Until then, every $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ here assumes constant mass.

Force is a vector. The equation holds component by component in an inertial frame: $F_{\mathrm{net},x} = m a_x$ and $F_{\mathrm{net},y} = m a_y$ when $m$ is constant. A component of force produces acceleration in that component only. This is why axes are chosen along the acceleration when the geometry allows it: one component equation then has a known acceleration, often zero, and it solves for a force instead.

::: definition Weight {#def-weight}
The **weight** of a body is the gravitational force on it. Near the Earth, for motions small compared with the Earth's radius, that force is

$$
\mathbf{W} = m\mathbf{g},
$$

a vector of magnitude $mg$ directed downward, with $g = 9.80\,\mathrm{m/s^{2}}$ in the problems of this chapter. Weight is a force. Mass is not a force, and it is not $mg$.
:::

A person of mass $70.0\,\mathrm{kg}$ weighs $70.0\times 9.80 = 686\,\mathrm{N}$ near the Earth. On the Moon, where the surface gravity is about $1.62\,\mathrm{m/s^{2}}$, the weight is about $113\,\mathrm{N}$ and the mass is still $70.0\,\mathrm{kg}$. A spring scale reads the contact force, equal to the weight only when the vertical acceleration is zero.

The SI unit of force is the newton, $1\,\mathrm{N} = 1\,\mathrm{kg\,m/s^{2}}$. Writing a weight as "$5\,\mathrm{kg}$ downward" confuses mass with force: the weight of a $5.00\,\mathrm{kg}$ body is $49.0\,\mathrm{N}$.

## The third law and free-body diagrams

Forces come in pairs, and the two members of a pair are never exerted on the same body.

::: definition Newton's third law {#def-third}
If body $A$ exerts a force on body $B$, then $B$ exerts a force on $A$. The two forces are equal in magnitude, opposite in direction, and of the same kind: both gravitational, or both contact, or both electromagnetic. They act on different bodies. They are simultaneous.
:::

"Of the same kind" is what prevents a false pair. The Earth's gravitational pull on a book and the table's upward push can be equal when the book is at rest, and they are still not a third-law pair: one is gravitational, the other is contact, and both act on the book. The partner of the Earth's pull is the book's gravitational pull on the Earth. The partner of the normal force is the book's contact push on the table. Neither partner is drawn on the book.

When weight and normal force are equal, that equality comes from the second law. If $a_y = 0$, the vertical forces on that one body sum to zero. In a lift the equality disappears, while each genuine third-law pair remains equal. A third-law pair matches in every situation; weight and normal force match only when $a_y = 0$ and no other vertical forces act.

::: example A book on a table {#ex-book}
A book of mass $2.00\,\mathrm{kg}$ lies at rest on a horizontal table. Take $g = 9.80\,\mathrm{m/s^{2}}$. Identify the forces on the book, state the third-law partner of each, and find the magnitudes.
::: solution
The book's free-body diagram contains two forces, and only two.

The weight is the Earth's gravitational pull, magnitude $2.00\times 9.80 = 19.6\,\mathrm{N}$, downward. Its third-law partner is the book's gravitational pull on the Earth, $19.6\,\mathrm{N}$ upward, acting on the Earth. That partner is not drawn on the book.

The normal force is the table's contact push, upward. The book is at rest, so $a_y = 0$. With upward positive, $N - 19.6 = 0$, hence $N = 19.6\,\mathrm{N}$. Its third-law partner is the book's contact push on the table, $19.6\,\mathrm{N}$ downward, acting on the table. That partner is not drawn on the book either.

The weight and the normal force are equal because the acceleration vanishes, not because [[#def-third]] pairs them. They fail the "same kind" test, and they act on the same body. If the table were the floor of a lift with nonzero vertical acceleration, $N$ would change and the weight would not. The third-law partners would be unchanged in kind: Earth with book, gravitationally; book with table, by contact.
:::
:::

Drawing the diagram is the step that decides whether the algebra has a chance. The rules are short enough to state as a procedure.

::: algorithm Free-body diagram {#alg-fbd}
Isolate one body and draw it alone. Draw every force exerted *on* it by something else, and label the agent of each force. Do not draw forces the body exerts on other things, and do not draw both members of a third-law pair. Choose axes, preferably along the acceleration. Write $\sum F_x = m a_x$ and $\sum F_y = m a_y$, with $m$ constant. The left-hand side contains only the forces on the diagram. The acceleration is not a force and is not drawn as one. If two bodies are joined by a light inextensible string, the constraint that the string length is constant relates their accelerations; it is not an extra force.
:::

A light string has a further consequence. A piece of string with mass zero cannot have a nonzero net force, or its acceleration would be infinite. The tension therefore pulls equally at the two ends. Over a frictionless pulley of negligible rotational inertia the tension is the same on both sides. A massive pulley does not obey that conclusion; the two tensions then differ, which is a problem for [[mechanics/rotation]].

::: quiz
A book lies at rest on a table. Which statement is correct?
- [ ] The weight and the normal force are a third-law pair, which is why they are equal.
- [x] The weight and the normal force are equal because the acceleration is zero, and they are not a third-law pair.
- [ ] The normal force on the book is $mg$ for any motion of the table.
- [ ] The book's free-body diagram should show both the Earth's pull on the book and the book's pull on the Earth.
::: solution
Weight and the normal force are different kinds of force and both act on the book, so [[#def-third]] does not pair them. Their equality is $a_y = 0$, as in [[#ex-book]], and it fails in a lift. The book's pull on the Earth acts on the Earth and is not drawn on the book.
:::
:::

## Friction, the Atwood machine and the incline

A surface can exert a **normal force** perpendicular to itself and a frictional force parallel to itself. The normal force is whatever magnitude the second law requires in the perpendicular direction. It equals $mg$ for a body at rest on a horizontal surface with no other vertical forces, and it does not equal $mg$ on an incline, in a lift, or against a wall.

::: definition Dry friction {#def-friction}
Dry friction between two solid surfaces has two regimes. **Static friction** acts when the surfaces do not slide on each other. Its magnitude is whatever value, up to a maximum, prevents slipping:

$$
\abs{f_{\mathrm{s}}} \le \mu_{\mathrm{s}} N,
$$

and its direction opposes the impending slip. **Kinetic friction** acts when the surfaces are sliding. Its magnitude is $\mu_{\mathrm{k}} N$, and its direction opposes the relative motion of the surfaces. In both regimes $N$ is the normal force, not a synonym for $mg$. The coefficients $\mu_{\mathrm{s}}$ and $\mu_{\mathrm{k}}$ are dimensionless, and typically $\mu_{\mathrm{k}} \le \mu_{\mathrm{s}}$.
:::

Static friction is not a fixed fraction of $N$. The inequality is a limit: a book at rest on a level table, with nothing pushing it sideways, has $f_{\mathrm{s}} = 0$. Only at the point of slipping does $\abs{f_{\mathrm{s}}}$ reach $\mu_{\mathrm{s}} N$. Kinetic friction has the definite magnitude $\mu_{\mathrm{k}} N$ while sliding continues. Using $\mu_{\mathrm{s}} N$ for a body known to be stuck is the usual numerical mistake on an incline.

::: theorem The Atwood machine {#thm-atwood}
Two masses $m_1$ and $m_2$, with $m_2 > m_1$, are joined by a light inextensible string over a frictionless pulley of negligible rotational inertia. The masses are constant, and the frame is inertial. Then $m_2$ descends and $m_1$ rises with acceleration of magnitude

$$
a = \frac{(m_2 - m_1)\, g}{m_1 + m_2},
$$ {#eq-atwood-a}

and the tension is the same throughout the string,

$$
T = \frac{2 m_1 m_2 g}{m_1 + m_2}.
$$ {#eq-atwood-t}
:::

::: proof
The string length is fixed, so the two masses have accelerations of equal magnitude. Take the positive direction downward for $m_2$ and upward for $m_1$, so that a positive $a$ means $m_2$ descends. Each mass is a free-body problem of its own.

On $m_2$ the forces are the weight $m_2 g$ downward and the tension $T$ upward, so $m_2 g - T = m_2 a$. On $m_1$ the tension is upward and the weight downward, so $T - m_1 g = m_1 a$. The tension is the same in both equations because the string is light and the pulley is frictionless, as required by [[#alg-fbd]].

Add the two equations. The tension cancels:

$$
(m_2 - m_1)\, g = (m_1 + m_2)\, a, \qquad a = \frac{(m_2 - m_1)\, g}{m_1 + m_2}.
$$

That is [[#eq-atwood-a]]. Substitute back into the equation for $m_1$:

$$
T = m_1 g + m_1 a = m_1 g\left(1 + \frac{m_2 - m_1}{m_1 + m_2}\right) = m_1 g\cdot\frac{2 m_2}{m_1 + m_2} = \frac{2 m_1 m_2 g}{m_1 + m_2}.
$$

The equation for $m_2$ produces the same tension: $T = m_2(g - a) = 2 m_1 m_2 g/(m_1 + m_2)$. If $m_1 = m_2$, then $a = 0$ and $T = m_1 g$, which is the case of two equal masses hanging at rest. The hypotheses are essential. A heavy pulley would make the two tensions different, and a stretchable string would make the two accelerations different.
:::

::: example Masses of two and three kilograms {#ex-atwood}
Take $m_1 = 2.00\,\mathrm{kg}$, $m_2 = 3.00\,\mathrm{kg}$ and $g = 9.80\,\mathrm{m/s^{2}}$, with the idealisations of [[#thm-atwood]]. Find the acceleration and the tension, and check each mass separately.
::: solution
[[#eq-atwood-a]] and [[#eq-atwood-t]] give

$$
a = \frac{(3.00 - 2.00)\times 9.80}{2.00 + 3.00} = \frac{9.80}{5.00} = 1.960\,\mathrm{m/s^{2}},
$$

$$
T = \frac{2\times 2.00\times 3.00\times 9.80}{5.00} = \frac{117.6}{5.00} = 23.52\,\mathrm{N}.
$$

The heavier mass descends. Check $m_2$ on its own. Its weight is $3.00\times 9.80 = 29.40\,\mathrm{N}$, so the net force downward is $29.40 - 23.52 = 5.88\,\mathrm{N}$, and $m_2 a = 3.00\times 1.960 = 5.88\,\mathrm{N}$. Check $m_1$. The net force upward is $23.52 - 2.00\times 9.80 = 23.52 - 19.60 = 3.92\,\mathrm{N}$, and $m_1 a = 2.00\times 1.960 = 3.92\,\mathrm{N}$. Each free-body diagram satisfies the second law with the same $a$ and the same $T$. Had the two checks disagreed, the error would have been in the algebra that produced $a$ and $T$, not in the idea of checking.
:::
:::

::: application Why Atwood built the machine
George Atwood, in *A Treatise on the Rectilinear Motion and Rotation of Bodies* (1784), used this arrangement to measure $g$ with an acceleration small enough to time. From [[#eq-atwood-a]], a measured $a$ gives $g = (m_1 + m_2)a/(m_2 - m_1)$, provided the string is light and the pulley costs negligible torque.
:::

An incline is the same second law with axes rotated. The useful check on the components of the weight is the horizontal limit. At $\theta = 0$ the surface is level, so the downslope component of the weight must be zero and the normal force must be $mg$. Components $mg\sin\theta$ down the slope and $mg\cos\theta$ into the slope pass that test, because $\sin 0 = 0$ and $\cos 0 = 1$. Swapped components fail it.

::: proposition Block on a rough incline {#prop-incline}
A block of constant mass $m$ stays on a straight incline at angle $\theta$ to the horizontal. Take $x$ down the slope and $y$ outward along the normal. The normal force is $N = mg\cos\theta$.

If the block is at rest, static friction acts up the slope with magnitude $f_{\mathrm{s}} = mg\sin\theta$, and this is possible only when $\tan\theta \le \mu_{\mathrm{s}}$. The block then sticks. The value $\mu_{\mathrm{s}} N$ is the maximum available friction, not the friction that acts.

If the block is sliding down the slope, kinetic friction acts up the slope with magnitude $\mu_{\mathrm{k}} N$, and the acceleration down the slope is

$$
a = g\,(\sin\theta - \mu_{\mathrm{k}}\cos\theta).
$$ {#eq-incline}

If instead the block is sliding up the slope, kinetic friction reverses, and the acceleration down the slope is $g\,(\sin\theta + \mu_{\mathrm{k}}\cos\theta)$.
:::

::: proof
The acceleration perpendicular to the slope is zero while the block stays on the surface, so $\sum F_y = 0$. The outward normal is $N$, and the weight contributes $mg\cos\theta$ inward, as fixed by the $\theta = 0$ check above. Hence $N - mg\cos\theta = 0$, and $N = mg\cos\theta$. This is not $mg$ unless $\theta = 0$.

If the block is at rest, $\sum F_x = 0$ as well. Down the slope, $mg\sin\theta - f_{\mathrm{s}} = 0$, so $f_{\mathrm{s}} = mg\sin\theta$, directed up the slope to oppose the impending slip. [[#def-friction]] allows this only when $mg\sin\theta \le \mu_{\mathrm{s}} N = \mu_{\mathrm{s}} mg\cos\theta$. For $\cos\theta > 0$, that is $\tan\theta \le \mu_{\mathrm{s}}$. When the inequality holds and the block is placed at rest, it sticks, and the kinetic coefficient is not used.

If the block is sliding down, $f_{\mathrm{k}} = \mu_{\mathrm{k}} N$ up the slope, and

$$
mg\sin\theta - \mu_{\mathrm{k}} mg\cos\theta = m a, \qquad a = g\,(\sin\theta - \mu_{\mathrm{k}}\cos\theta).
$$

The mass cancels. If the block is sliding up the slope, friction reverses and points down the slope, which is the last sentence of the proposition. The kinetic formula assumes the block is still sliding. If it stops, static friction takes over. With $\mu_{\mathrm{k}} \le \mu_{\mathrm{s}}$, a slope steep enough that $\tan\theta > \mu_{\mathrm{s}}$ cannot hold a block at rest, and a block already moving down keeps accelerating.
:::

::: example Stick or slide {#ex-incline}
A block is placed on a $30^{\circ}$ incline. Take $g = 9.80\,\mathrm{m/s^{2}}$. First suppose it is already sliding down, with $\mu_{\mathrm{k}} = 0.200$. Find the acceleration. Then suppose instead that it is placed at rest and $\mu_{\mathrm{s}} = 0.70$. Does it stick? For a block of mass $2.00\,\mathrm{kg}$, find the normal force and the friction in each situation.
::: solution
Use [[#prop-incline]]. While the block slides down,

$$
a = 9.80\,\bigl(\sin 30^{\circ} - 0.200\cos 30^{\circ}\bigr) = 9.80\,\bigl(0.500 - 0.200\times 0.8660\bigr) = 9.80\times 0.3268 = 3.203\,\mathrm{m/s^{2}},
$$

down the slope. For $m = 2.00\,\mathrm{kg}$,

$$
N = mg\cos 30^{\circ} = 9.80\sqrt{3} = 16.97\,\mathrm{N}, \qquad f_{\mathrm{k}} = 0.200\times 9.80\sqrt{3} = 3.395\,\mathrm{N}
$$

up the slope. The net force down the slope is $mg\sin 30^{\circ} - f_{\mathrm{k}} = 9.80 - 3.395 = 6.405\,\mathrm{N}$, and $6.405/2.00 = 3.203\,\mathrm{m/s^{2}}$, in agreement with the formula. The normal force is not $mg = 19.6\,\mathrm{N}$.

Placed at rest, the block sticks if $\tan\theta \le \mu_{\mathrm{s}}$. Here $\tan 30^{\circ} = 1/\sqrt{3} = 0.577$, and $0.577 < 0.70$, so it sticks. Kinetic friction is irrelevant until something makes the block move. The static friction that actually acts is $f_{\mathrm{s}} = mg\sin 30^{\circ} = 9.80\,\mathrm{N}$ up the slope, not $\mu_{\mathrm{s}} N$. The maximum available is $\mu_{\mathrm{s}} N = 0.70\times 16.97 = 11.88\,\mathrm{N}$, and $9.80\,\mathrm{N}$ is inside that limit, which is the same comparison as $\tan 30^{\circ} \le 0.70$. If the block is later set sliding, the kinetic calculation returns, and $\mu_{\mathrm{s}}$ drops out of the acceleration.
:::
:::

::: widget incline
angle: 30
mu: 0.2
caption: Raise the angle until the block slides, and compare μ with tan θ. At 30° with this μ the block is already sliding, so lower the angle until it sticks, then raise it and watch the change: it sticks only while tan θ does not exceed μ.
:::

The widget uses one coefficient for both the sticking test and the sliding acceleration. Compare $\mu$ with $\tan\theta$: the block sticks only while $\tan\theta$ does not exceed $\mu$, and $\mu N$ is not the friction in that regime.

::: example Apparent weight in a lift {#ex-lift}
A person of mass $70.0\,\mathrm{kg}$ stands on a scale in a lift. Take $g = 9.80\,\mathrm{m/s^{2}}$, and take upward as positive. Find the scale reading when the lift accelerates upward at $2.00\,\mathrm{m/s^{2}}$, when it accelerates downward at $2.00\,\mathrm{m/s^{2}}$, and when the cable has broken so that the lift is in free fall.
::: solution
The scale reads the normal force, which is the contact force of the floor on the person. The forces on the person are $N$ upward and the weight $mg$ downward. The weight is $70.0\times 9.80 = 686\,\mathrm{N}$ in every part of the problem; the mass does not change, and neither does $g$. The second law in the inertial frame of the ground is

$$
N - mg = m a, \qquad N = m(g + a),
$$

where $a$ is positive upward.

Upward acceleration $a = +2.00\,\mathrm{m/s^{2}}$ gives $N = 70.0\times(9.80 + 2.00) = 70.0\times 11.80 = 826\,\mathrm{N}$. Downward acceleration $a = -2.00\,\mathrm{m/s^{2}}$ gives $N = 70.0\times(9.80 - 2.00) = 70.0\times 7.80 = 546\,\mathrm{N}$. Free fall is $a = -g$, so $N = 0$: the scale reads nothing, not because the weight has vanished, but because the person and the lift accelerate together and no contact force is required. The three readings are three different normal forces for one weight. They are the concrete form of the statement that $N$ and $mg$ are not glued together by the third law.
:::
:::

## Horizontal circles

Uniform circular motion has acceleration $v^{2}/R$ towards the centre. That result is kinematics, proved in [[mechanics/motion-2d]]. Newton's second law converts it into a requirement on the forces: in an inertial frame, the net force towards the centre has magnitude $m v^{2}/R$. The phrase **centripetal force** means that net inward force. It is a name, not a new physical agent, and it is not drawn in addition to the forces that actually act.

::: proposition Flat circular turn {#prop-curve}
A vehicle of constant mass $m$ moves at constant speed $v$ around a flat horizontal curve of radius $R$, in an inertial frame fixed to the ground. The vertical acceleration is zero, so $N = mg$. The horizontal acceleration has magnitude $v^{2}/R$ towards the centre, and on a flat road the only horizontal force is static friction at the tyres, which are not sliding sideways. Therefore

$$
f_{\mathrm{s}} = \frac{m v^{2}}{R}, \qquad \mu_{\mathrm{s}} \ge \frac{v^{2}}{R g}.
$$ {#eq-mu-min}

The minimum coefficient is $v^{2}/(R g)$. If the tyres are skidding sideways, the friction is kinetic, the path is no longer the intended circle, and this proposition does not describe the motion.
:::

::: proof
Vertical equilibrium, with no other vertical forces, is $N - mg = 0$. Horizontally, [[mechanics/motion-2d]] supplies an inward acceleration $v^{2}/R$ for motion at constant speed on a circle of radius $R$. The second law in the ground frame therefore requires a net inward force $m v^{2}/R$.

On a flat road the weight and the normal force are vertical. The remaining horizontal force is friction. It is static friction: the tyre is rolling, and the contact patch is not sliding across the road. Static friction can point towards the centre, and it will, up to its maximum $\mu_{\mathrm{s}} N = \mu_{\mathrm{s}} mg$. The motion is possible when the required friction does not exceed that maximum:

$$
\frac{m v^{2}}{R} \le \mu_{\mathrm{s}} m g, \qquad \mu_{\mathrm{s}} \ge \frac{v^{2}}{R g}.
$$

Nothing in the free-body diagram is labelled "centripetal force" except as a description of $f_{\mathrm{s}}$ itself. Adding a further inward arrow would count the same requirement twice and would invent an agent that has no body to belong to.
:::

::: example A car on a flat bend {#ex-car}
A car of mass $1000\,\mathrm{kg}$ travels at $20.0\,\mathrm{m/s}$ on a flat curve of radius $50.0\,\mathrm{m}$. Take $g = 9.80\,\mathrm{m/s^{2}}$. Find the inward force required, and the least coefficient of static friction that can supply it. If instead $\mu_{\mathrm{s}} = 0.70$, find the greatest speed at which the car can take the curve.
::: solution
The required inward force is the net force of [[#prop-curve]],

$$
\frac{m v^{2}}{R} = \frac{1000\times 20.0^{2}}{50.0} = \frac{1000\times 400}{50.0} = 8000\,\mathrm{N},
$$

supplied by static friction towards the centre. The normal force is $N = mg = 1000\times 9.80 = 9800\,\mathrm{N}$. The least coefficient is

$$
\mu_{\mathrm{s,min}} = \frac{v^{2}}{R g} = \frac{400}{50.0\times 9.80} = \frac{400}{490} = 0.816,
$$

which is also $8000/9800 = 0.816$. There is no additional centripetal arrow: the $8000\,\mathrm{N}$ *is* the friction.

If $\mu_{\mathrm{s}} = 0.70$, then $20.0\,\mathrm{m/s}$ is too fast. The greatest speed satisfies $v^{2} = \mu_{\mathrm{s}} R g$:

$$
v = \sqrt{0.70\times 50.0\times 9.80} = \sqrt{343} = 18.52\,\mathrm{m/s}.
$$

Above that speed the car skids. In the ground frame nothing pushes it outward: it simply fails to accelerate inward as much as the curve requires.
:::
:::

::: warning Two arrows that do not belong
Do not put both members of a third-law pair on one free-body diagram. The partner acts on a different body; drawing it cancels a real force or adds a force the body does not feel. Do not draw an extra centripetal-force arrow beside the real forces. On the flat bend the inward force is the static friction already on the diagram. A second inward arrow has no agent. The same habit appears as an outward "centrifugal force" in the ground frame. The ground is inertial, so there is no such force. The outward sensation belongs to the non-inertial frame of the car, which [[#def-inertial]] has excluded from $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$.
:::

::: quiz
A car rounds a flat bend at constant speed. Which description of the free-body diagram is right?
- [ ] Draw a centripetal-force arrow towards the centre, in addition to friction, weight and the normal force.
- [ ] Kinetic friction acts outward, away from the centre.
- [x] Static friction acts towards the centre. "Centripetal force" names that inward contribution, and it is not a further arrow.
- [ ] The normal force is horizontal and points towards the centre.
::: solution
The inward force is static friction, because the tyres are not sliding sideways. The normal force is vertical. An extra centripetal arrow would double-count the friction, and kinetic friction would describe a skid rather than this motion.
:::
:::

::: history The Principia, and the form F = ma
Newton's *Philosophiae Naturalis Principia Mathematica* (1687) stated three laws of motion and the inverse-square law of gravitation. He framed the second law as a proportionality between force and the change of motion, and motion in that sense is momentum, the reading used in [[#def-momentum]]. The form $\mathbf{F} = m\mathbf{a}$ is a later clarification: Euler published component equations of that kind in 1750. This chapter uses $\mathbf{F} = m\mathbf{a}$ when the mass is constant. The inverse-square law is the subject of [[mechanics/gravitation]].
:::

## Where this leads

The accelerations of [[mechanics/motion-2d]] now have a cause: weight gives $a_y = -g$, and a net inward force $m v^{2}/R$ gives circular motion. [[mechanics/work-energy]] integrates $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ along a path. [[mechanics/momentum]] integrates it in time, which is where collisions and the rocket excluded from $\mathbf{F} = m\mathbf{a}$ are treated. [[mechanics/rotation]] repeats the pattern for an extended body, and a pulley with rotational inertia no longer has equal tensions on the two sides.

A restoring force proportional to displacement, set equal to $ma$, is the oscillator equation of [[oscillations]]. The first law still decides the frame before that equation is written.

::: summary
- An inertial frame is one in which a free particle moves at constant velocity. The first law asserts that such frames exist, and $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ is used only inside them.
- Momentum is $\mathbf{p} = m\mathbf{v}$, and the net force equals $\deriv{\mathbf{p}}{t}$. Constant mass gives $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$. A rocket is not that case; see [[mechanics/momentum]].
- Mass is not weight. Weight is the force $mg$ downward near the Earth.
- Third-law forces are equal, opposite and of the same kind, and they act on different bodies. Weight and the normal force are not a third-law pair.
- On a free-body diagram, draw one body and every force on it. The normal force is not always $mg$, and $\abs{f_{\mathrm{s}}} = \mu_{\mathrm{s}} N$ only at the point of slipping.
- For an ideal Atwood machine, $a = (m_2 - m_1)g/(m_1 + m_2)$ and $T = 2 m_1 m_2 g/(m_1 + m_2)$.
- On a rough incline a block placed at rest sticks if $\tan\theta \le \mu_{\mathrm{s}}$. Sliding down, $a = g(\sin\theta - \mu_{\mathrm{k}}\cos\theta)$ and $N = mg\cos\theta$.
- On a flat curve the inward force is static friction of magnitude $m v^{2}/R$, so $\mu_{\mathrm{s}} \ge v^{2}/(Rg)$. Centripetal force is the name of that net force, not an extra arrow.
:::

## Exercises

::: exercise The weight of five kilograms {#exr-weight level=1 check="49"}
Find the weight, in newtons, of a body of mass $5.00\,\mathrm{kg}$ near the Earth. Take $g = 9.80\,\mathrm{m/s^{2}}$.
::: solution
Weight is $mg$, not $m$. With the downward direction understood,

$$
W = 5.00\times 9.80 = 49.0\,\mathrm{N}.
$$

The mass is $5.00\,\mathrm{kg}$ in every frame and on every planet. The weight is a force, and this particular value uses the Earth's surface gravity. The answer is $49.0\,\mathrm{N}$.
:::
:::

::: exercise Magnitude of the net force {#exr-net level=1 check="6"}
A particle of mass $3.00\,\mathrm{kg}$ has acceleration of magnitude $2.00\,\mathrm{m/s^{2}}$ in an inertial frame. The mass is constant. Find the magnitude of the net force on it, in newtons.
::: solution
[[#def-momentum]] gives $\mathbf{F}_{\mathrm{net}} = m\mathbf{a}$ because $m$ is constant. The magnitudes therefore satisfy

$$
\abs{\mathbf{F}_{\mathrm{net}}} = m\abs{\mathbf{a}} = 3.00\times 2.00 = 6.00\,\mathrm{N}.
$$

The direction of the net force is the direction of the acceleration. No particular direction was asked for. The answer is $6.00\,\mathrm{N}$.
:::
:::

::: exercise Normal force on a horizontal table {#exr-normal level=1 check="78.4"}
A block of mass $8.00\,\mathrm{kg}$ is at rest on a horizontal table, with no other vertical forces. Take $g = 9.80\,\mathrm{m/s^{2}}$. Find the normal force of the table on the block, in newtons.
::: solution
The vertical acceleration is zero, so the second law in the vertical direction says that the normal force balances the weight:

$$
N = mg = 8.00\times 9.80 = 78.4\,\mathrm{N},
$$

upward. This equality is $a_y = 0$, not the third law. The third-law partner of $N$ is the block's downward push on the table, which is not a force on the block. The answer is $78.4\,\mathrm{N}$.
:::
:::

::: exercise An Atwood acceleration {#exr-atwood level=2 check="4.9"}
An ideal Atwood machine, in the sense of [[#thm-atwood]], has masses $m_1 = 1.00\,\mathrm{kg}$ and $m_2 = 3.00\,\mathrm{kg}$. Take $g = 9.80\,\mathrm{m/s^{2}}$. Find the magnitude of the acceleration, in $\mathrm{m/s^{2}}$.
::: solution
The heavier mass descends. [[#eq-atwood-a]] gives

$$
a = \frac{(3.00 - 1.00)\times 9.80}{1.00 + 3.00} = \frac{2.00\times 9.80}{4.00} = \frac{19.6}{4.00} = 4.90\,\mathrm{m/s^{2}}.
$$

The acceleration asked for is $4.90\,\mathrm{m/s^{2}}$, with the heavier mass descending.
:::
:::

::: exercise The least static friction on a slope {#exr-mus level=2 check="1/sqrt(3)"}
A block is placed at rest on a $30^{\circ}$ incline. Find the smallest coefficient of static friction for which the block remains at rest. The answer is a pure number.
::: hint
The block sticks when $\tan\theta \le \mu_{\mathrm{s}}$. The least coefficient is the tangent of the angle.
:::
::: solution
By [[#prop-incline]], rest is possible when $\tan\theta \le \mu_{\mathrm{s}}$, and impossible when the inequality fails. The smallest coefficient that still holds the block is therefore

$$
\mu_{\mathrm{s}} = \tan 30^{\circ} = \frac{1}{\sqrt{3}}.
$$

The mass and $g$ cancel when the downslope component $mg\sin\theta$ is compared with the maximum friction $\mu_{\mathrm{s}} mg\cos\theta$. Kinetic friction does not enter, because the block is at rest. At this exact value the block is at the point of slipping, and $f_{\mathrm{s}} = \mu_{\mathrm{s}} N$. Any smaller coefficient lets it slide. The answer is $1/\sqrt{3}$.
:::
:::

::: exercise Inward force on a flat bend {#exr-bend level=2 check="4000"}
A vehicle of mass $800\,\mathrm{kg}$ takes a flat curve of radius $20.0\,\mathrm{m}$ at a constant speed of $10.0\,\mathrm{m/s}$. Find the magnitude of the inward force required, in newtons.
::: solution
The motion is the flat turn of [[#prop-curve]]. The inward force has magnitude

$$
\frac{m v^{2}}{R} = \frac{800\times 10.0^{2}}{20.0} = \frac{800\times 100}{20.0} = 4000\,\mathrm{N},
$$

and static friction towards the centre supplies it. The force asked for is $4000\,\mathrm{N}$.
:::
:::

::: exercise Scale reading in a lift {#exr-lift level=2 check="580"}
A person of mass $50.0\,\mathrm{kg}$ stands on a scale in a lift that accelerates upward at $1.80\,\mathrm{m/s^{2}}$. Take $g = 9.80\,\mathrm{m/s^{2}}$ and upward as positive. Find the scale reading, in newtons.
::: solution
The scale reads the normal force on the person. With upward positive, $N - mg = ma$, so

$$
N = m(g + a) = 50.0\times(9.80 + 1.80) = 50.0\times 11.60 = 580\,\mathrm{N}.
$$

The weight is $50.0\times 9.80 = 490\,\mathrm{N}$, which is not the reading. The extra $90\,\mathrm{N}$ is $m a$, required by the upward acceleration. The answer is $580\,\mathrm{N}$.
:::
:::

::: exercise Table and hanging block {#exr-hang level=3 check="2.45"}
A block of mass $3.00\,\mathrm{kg}$ slides on a horizontal table. The coefficient of kinetic friction is $0.250$. A light string runs from the block horizontally to a frictionless light pulley at the edge of the table, then vertically down to a hanging mass of $2.00\,\mathrm{kg}$. The hanging mass descends. Take $g = 9.80\,\mathrm{m/s^{2}}$. Find the magnitude of the acceleration, in $\mathrm{m/s^{2}}$.
::: hint
Draw two free-body diagrams. Kinetic friction on the table is $\mu_{\mathrm{k}}$ times the normal force, and the normal force on a horizontal table is the weight of the sliding block. The string constrains the two accelerations to have the same magnitude.
:::
::: solution
The table block has $N = m_{\mathrm{t}} g = 3.00\times 9.80 = 29.4\,\mathrm{N}$, because the vertical acceleration is zero and the string pulls horizontally. Kinetic friction opposes the motion towards the pulley:

$$
f_{\mathrm{k}} = 0.250\times 29.4 = 7.35\,\mathrm{N}.
$$

Take the positive direction as descent of the hanging mass, and as motion of the table block towards the pulley. The string is light and the pulley is frictionless, so the tension $T$ is the same in both equations. For the hanging mass, $m_{\mathrm{h}} g - T = m_{\mathrm{h}} a$. For the table block, $T - f_{\mathrm{k}} = m_{\mathrm{t}} a$. Add them:

$$
m_{\mathrm{h}} g - f_{\mathrm{k}} = (m_{\mathrm{h}} + m_{\mathrm{t}})\, a,
$$

$$
a = \frac{2.00\times 9.80 - 7.35}{2.00 + 3.00} = \frac{19.60 - 7.35}{5.00} = \frac{12.25}{5.00} = 2.45\,\mathrm{m/s^{2}}.
$$

As a check, $T = 3.00\times 2.45 + 7.35 = 14.70\,\mathrm{N}$. The hanging mass then has net force $19.60 - 14.70 = 4.90\,\mathrm{N}$, equal to $m_{\mathrm{h}} a$, and the table block has net force $7.35\,\mathrm{N}$, equal to $m_{\mathrm{t}} a$. The acceleration is $2.45\,\mathrm{m/s^{2}}$.
:::
:::

::: exercise A frictionless banked curve {#exr-bank level=3 check="45"}
A vehicle takes a circular curve of radius $R$ at constant speed $v$ on a road banked at an angle $\theta$ to the horizontal. There is no friction. Show that $\tan\theta = v^{2}/(R g)$. Then suppose the speed and the radius are matched so that $v^{2} = R g$. Find the banking angle, in degrees, at which the vehicle can travel the curve with no sideways force from friction.
::: hint
The normal force is perpendicular to the road. Its vertical component balances the weight, and its horizontal component is the inward force $m v^{2}/R$. Divide the two component equations.
:::
::: solution
There is no friction, so the forces on the vehicle are the weight and the normal force $N$ perpendicular to the road. Resolve $N$ into a vertical component $N\cos\theta$ and a horizontal component $N\sin\theta$ towards the centre of the curve. The vertical acceleration is zero:

$$
N\cos\theta = mg.
$$

The horizontal acceleration is $v^{2}/R$ towards the centre, from the kinematics of uniform circular motion, so the second law reads

$$
N\sin\theta = \frac{m v^{2}}{R}.
$$

Divide the second equation by the first. The mass and the normal force cancel:

$$
\tan\theta = \frac{v^{2}}{R g}.
$$

The road is frictionless, and the vehicle moves in a horizontal circle. If $v^{2} = R g$, then $\tan\theta = 1$, so $\theta = 45^{\circ}$. The angle is $45$ degrees.
:::
:::
