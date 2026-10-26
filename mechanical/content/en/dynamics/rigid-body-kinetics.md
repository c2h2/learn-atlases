Putting forces into the kinematics of the last lesson turns dynamics into a tool rather than a description. A rigid body needs **three** equations in a plane — two force components and one moment — where a particle needed two, and the third one is what makes a body turn. Everything else is bookkeeping: choosing the right point about which to take moments, recognising which unknowns the choice eliminates, and remembering that the inertia terms are not forces and do not appear on the force side of the equation.

Two forms of the equations are worth having. The first, $\sum \mathbf{F} = m \mathbf{a}_G$ with $\sum M_G = I_G \alpha$, is the safe one and always valid. The second, taking moments about an arbitrary point $P$, picks up extra terms unless $P$ is the mass centre or a fixed point, and the temptation to take moments about whatever looks convenient is the source of most errors in this subject. The one case where it pays handsomely is the **instantaneous centre** or the **contact point** of a rolling body, where the moment equation about that point involves no friction force at all — used correctly, it saves two of the three equations.

::: warning $\sum M_P = I_P \alpha$ only for $P$ fixed, at the mass centre, or instantaneously at rest with the right $I$
The equation $\sum M_G = I_G \alpha$ holds for the mass centre always. For another point $P$,
$$
\sum M_P = I_G \alpha + \left[ \text{terms in } \mathbf{r}_{G / P} \times m \mathbf{a}_P \right],
$$
which vanish only if $P$ is fixed in an inertial frame, or is the mass centre, or — for a body in plane motion rolling on a fixed surface — is the contact point, in which case $\sum M_C = I_C \alpha$ with $I_C$ taken about the contact point. Using $I_P \alpha$ about an arbitrary point $P$ is wrong, and it is wrong in a way that usually gives an answer within $20$ per cent of the truth, which makes it hard to catch.
:::

## Equations of motion for a rigid body

::: definition Plane kinetics of a rigid body {#def-rbk-eom}
For a rigid body of mass $m$ with mass centre $G$ and centroidal mass moment of inertia $I_G$, in plane motion,
$$
\sum F_x = m \left( a_G \right)_x, \qquad
\sum F_y = m \left( a_G \right)_y, \qquad
\sum M_G = I_G \alpha .
$$
Equivalently, the system of external forces is **equipollent** to the vector $m \mathbf{a}_G$ at $G$ plus the couple $I_G \alpha$: drawing the free-body diagram and the "inertia diagram" side by side and equating forces and moments is the whole method. For a body rolling without slipping on a fixed surface, taking moments about the contact point $C$ gives the shortcut
$$
\sum M_C = I_C \alpha, \qquad I_C = I_G + m d^{2} ,
$$
which eliminates the friction force at once.
:::

::: proof The moment equation about the mass centre {#proof-rigid-moment}
Model the body as a system of particles. About the mass centre, write the angular momentum as $\mathbf{H}_G = \sum \left( \boldsymbol{\rho}_i \times m_i \dot{\boldsymbol{\rho}}_i \right)$ where $\boldsymbol{\rho}_i = \mathbf{r}_i - \mathbf{r}_G$. Differentiating,
$$
\dot{\mathbf{H}}_G = \sum \boldsymbol{\rho}_i \times m_i \ddot{\boldsymbol{\rho}}_i
+ \sum \dot{\boldsymbol{\rho}}_i \times m_i \dot{\boldsymbol{\rho}}_i .
$$
The second sum vanishes because $\dot{\boldsymbol{\rho}}_i$ is parallel to $\mathbf{v}_i - \mathbf{v}_G$ for a rigid body, so each term is a vector crossed with a scalar multiple of itself. In the first, $\ddot{\boldsymbol{\rho}}_i = \ddot{\mathbf{r}}_i - \ddot{\mathbf{r}}_G$, and
$$
\sum \boldsymbol{\rho}_i \times m_i \ddot{\mathbf{r}}_G
= \left( \sum m_i \boldsymbol{\rho}_i \right) \times \ddot{\mathbf{r}}_G = \mathbf{0}
$$
by the definition of the mass centre. What remains is $\sum \boldsymbol{\rho}_i \times \mathbf{F}_i = \sum M_G$ on the left, and on the right, for a rigid body in plane motion,
$$
\sum \boldsymbol{\rho}_i \times m_i \ddot{\boldsymbol{\rho}}_i = I_G \alpha \, \mathbf{k} .
$$
Hence $\sum M_G = I_G \alpha$.

*Note the two cancellations.* Both come from the definition of $G$, and neither works about any other point — which is exactly why the mass centre is the only point about which the moment equation is always this simple.
:::

::: example Spool pulled by a cord {#ex-spool-kinetics}
A spool of mass $12\ \mathrm{kg}$, outer radius $200\ \mathrm{mm}$, inner radius $100\ \mathrm{mm}$ and centroidal radius of gyration $150\ \mathrm{mm}$ rests on a rough floor. A cord wound on the core is pulled horizontally at $60\ \mathrm{N}$ at a height of $300\ \mathrm{mm}$ above the floor. Find the acceleration, the angular acceleration and the friction force. What is the minimum friction coefficient?
::: solution
Let $a$ be the acceleration of the centre to the right and $\alpha = a / R$ the clockwise angular acceleration. Resolving horizontally, with $F$ the friction force taken positive to the right,
$$
P + F = m a ,
$$
and taking moments about the centre, where $P$ acts at $r$ above $G$ and $F$ at $R$ below it,
$$
P r - F R = I_G \alpha = I_G \frac{a}{R} .
$$
Eliminating $F = m a - P$,
$$
P \left( R + r \right) = a \left( m R + \frac{I_G}{R} \right)
\quad\Longrightarrow\quad
a = \frac{P R \left( R + r \right)}{m \left( k^{2} + R^{2} \right)}
= \frac{60 \times 0.2 \times 0.3}{12 \left( 0.0225 + 0.04 \right)} = 4.80\ \mathrm{m / s^{2}} ,
$$
$$
\alpha = \frac{4.80}{0.2} = 24.0\ \mathrm{rad / s^{2}}, \qquad
F = 12 \times 4.80 - 60 = - 2.4\ \mathrm{N} .
$$
The friction is **$2.4\ \mathrm{N}$ backwards**, and the normal force is $N = m g = 117.7\ \mathrm{N}$, so
$$
\mu_{\min} = \frac{2.4}{117.7} = 0.020 .
$$
*Check.* Taking moments about the contact point $C$, where the friction has no moment,
$$
P \times 0.3 = I_C \alpha, \qquad I_C = m \left( k^{2} + R^{2} \right) = 12 \times 0.0625 = 0.75\ \mathrm{kg\,m^{2}} ,
$$
$$
\alpha = \frac{18}{0.75} = 24.0\ \mathrm{rad / s^{2}} \quad \checkmark
$$
*Sanity.* The friction is tiny and points **backwards**, against the pull — which surprises most people twice over. Its direction is set by the height at which the cord leaves: pull above the **critical height** $h = R \left( 1 + k^{2} / R^{2} \right) = 0.2 \times 1.5625 = 312.5\ \mathrm{mm}$ and the spool rolls **towards** you with friction forwards; pull below it and friction reverses. At exactly $312.5\ \mathrm{mm}$ the friction is zero and the spool rolls with no tendency to slip at all. This is a different criterion from the yo-yo reversal of [[dynamics/rigid-body-kinematics]], where the angle of the cord decides which way the spool rolls: here the spool always rolls towards a horizontal pull, and only the friction changes sign.
:::
:::

::: widget plot
f: 60*0.2*(0.2+x)/(12*(0.0225+0.04))
x: 0, 0.2
y: 0, 7
labels: \text{acceleration of the centre } \left( \mathrm{m/s^2} \right)
caption: Acceleration of the spool of the example above against the radius $x$ of the core on which the $60\ \mathrm{N}$ cord is wound, for a cord pulling horizontally at height $R + x$. The relation is linear in $x$ because the moment arm of the pull about the contact point is exactly $R + x$, while the inertia $I_C$ is unchanged. Winding the cord on the **bottom** of the core instead of the top reverses the sign of $r$ and gives $a = 1.60\ \mathrm{m / s^{2}}$ in the same direction — the spool still rolls towards the pull, but far more slowly, and the backward friction grows from $2.4$ to $40.8\ \mathrm{N}$.
:::

::: definition Kinetic diagrams and D'Alembert's principle {#def-dalembert}
The three scalar equations of plane motion can be written as a **balance** by moving the inertia terms to the force side:
$$
\sum F_x - m \left( a_G \right)_x = 0, \qquad
\sum F_y - m \left( a_G \right)_y = 0, \qquad
\sum M_G - I_G \alpha = 0 .
$$
The quantities $- m \mathbf{a}_G$ and $- I_G \alpha$ are called **inertia force** and **inertia couple**; they are not forces, they are a bookkeeping device, and they must be applied at the mass centre with the correct sign. The method is called **D'Alembert's principle** and it lets a dynamics problem be solved with the statics of [[statics/rigid-body-equilibrium]] — including the tricks of statics, such as taking moments about a point to eliminate unknowns or using three-force-body geometry.

Used carelessly the trick misleads, because an inertia force is not a real force and has no reaction pair; used carefully it is the fastest route to the answer in linkages with several moving members, and it is the basis of the **balancing** of reciprocating machinery, where the whole design problem is to arrange that the sum of the $m \mathbf{a}$ vectors of the moving parts vanishes.
:::

::: theorem Centre of percussion {#thm-percussion}
A body free to rotate about a fixed point $O$, with mass $m$, mass centre at $G$ with $\bar{r} = O G$ and centroidal radius of gyration $k$, receives an impulse $J$ perpendicular to $O G$ at distance $q$ from $O$. The impulse at $O$ vanishes when
$$
q = \frac{I_O}{m \bar{r}} = \bar{r} + \frac{k^{2}}{\bar{r}} .
$$
This point is the **centre of percussion**; it is also the **centre of oscillation**, the point whose simple-pendulum length equals the body's equivalent length $I_O / m \bar{r}$.
:::

::: proof Impulse and momentum for the struck body {#proof-percussion}
Let the body be struck so that it acquires angular velocity $\omega$ about $O$. Its mass centre acquires velocity $\bar{v} = \omega \bar{r}$, and the linear impulse–momentum equation gives, with $J_O$ the impulse at the pivot,
$$
J + J_O = m \bar{v} = m \omega \bar{r} .
$$
The angular impulse about $O$ gives
$$
J q = I_O \omega \quad\Longrightarrow\quad \omega = \frac{J q}{I_O} .
$$
Substituting,
$$
J_O = \frac{J m \bar{r} q}{I_O} - J
= J \left( \frac{m \bar{r} q}{I_O} - 1 \right) ,
$$
which vanishes when $q = I_O / m \bar{r}$. Writing $I_O = m \left( k^{2} + \bar{r}^{2} \right)$ gives the stated form. $\checkmark$

*Note the reciprocity.* Since $q = \bar{r} + k^{2} / \bar{r}$, if the body is pivoted instead at its centre of percussion, its mass centre is $\bar{r}' = q - \bar{r} = k^{2} / \bar{r}$ from the new pivot, and its new centre of percussion is at $\bar{r}' + k^{2} / \bar{r}' = k^{2} / \bar{r} + \bar{r} = q$ from it — the original pivot. The two points are interchangeable, and this is the property Kater exploited to measure $g$ without knowing where the centre of mass was.
:::

::: example Compound pendulum {#ex-compound-pendulum}
A connecting rod of mass $4\ \mathrm{kg}$ is suspended from a knife-edge $300\ \mathrm{mm}$ from its mass centre and oscillates with a period of $1.50\ \mathrm{s}$. Find its centroidal radius of gyration.
::: solution
For small oscillations of a physical pendulum,
$$
T = 2 \pi \sqrt{\frac{I_O}{m g \bar{r}}}
\quad\Longrightarrow\quad
I_O = \frac{T^{2} m g \bar{r}}{4 \pi^{2}}
= \frac{1.5^{2} \times 4 \times 9.81 \times 0.3}{39.48} = 0.671\ \mathrm{kg\,m^{2}} ,
$$
$$
k_G^{2} = \frac{I_O}{m} - \bar{r}^{2} = 0.1677 - 0.09 = 0.0777
\quad\Longrightarrow\quad
k_G = 0.279\ \mathrm{m} .
$$
*Check.* The equivalent simple-pendulum length is $I_O / m \bar{r} = 0.671 / 1.2 = 0.559\ \mathrm{m}$, and $T = 2 \pi \sqrt{0.559 / 9.81} = 1.50\ \mathrm{s}$ $\checkmark$

*Sanity.* This is a **measurement**, not a toy: swinging a component about two knife-edges and solving the two resulting periods for $k_G$ and for the position of the mass centre is the standard industrial way of finding the inertia of a connecting rod, a crankshaft or a satellite model, and it is accurate to better than one per cent with a stopwatch and a good knife-edge. The reversible form — Kater's pendulum — goes further and measures $g$ itself, and reversible pendulums provided the absolute gravity measurements of the nineteenth and early twentieth centuries, including the Potsdam reference value adopted in 1909.
:::
:::

## Rolling and slipping

::: example Cylinder rolling down an incline {#ex-cylinder-incline}
A solid cylinder rolls without slipping down a $30^{\circ}$ incline. Find its acceleration and the minimum friction coefficient. What changes for a thin-walled pipe of the same radius?
::: solution
With $I_G = m R^{2} / 2$ and $a = \alpha R$, take moments about the contact point $C$:
$$
m g \sin \theta \times R = I_C \alpha, \qquad I_C = \tfrac{1}{2} m R^{2} + m R^{2} = \tfrac{3}{2} m R^{2} ,
$$
$$
\alpha = \frac{g \sin \theta}{1.5 R}, \qquad
a = \alpha R = \frac{g \sin \theta}{1.5} = \frac{9.81 \times 0.5}{1.5} = 3.27\ \mathrm{m / s^{2}} .
$$
**Friction.** From $m g \sin \theta - F = m a$,
$$
F = m \left( g \sin \theta - a \right) = m \times 1.635, \qquad
N = m g \cos \theta = m \times 8.50 ,
$$
$$
\mu_{\min} = \frac{1.635}{8.50} = 0.192 = \frac{\tan \theta}{3} .
$$
**Thin-walled pipe.** With $I_G = m R^{2}$, $a = g \sin \theta / 2 = 2.45\ \mathrm{m / s^{2}}$ and $\mu_{\min} = \tan \theta / 2 = 0.289$.

*Sanity.* The acceleration is independent of both mass and radius, so a cotton reel and a railway wheel roll down the same slope together — but a solid cylinder beats a hollow one, and the ordering $1 > \tfrac{5}{7} > \tfrac{2}{3} > \tfrac{1}{2}$ of $a / \left( g \sin \theta \right)$ for a frictionless sliding block, a solid sphere, a solid cylinder and a hoop or thin pipe is exactly the ordering of $k^{2} / R^{2}$ from $0$ to $1$. That is why a pipe **filled** with liquid, which adds mass without much rotational inertia, rolls faster than an empty one, and why the ratio $k^{2} / R^{2}$ — not the mass — is what the acceleration of a rolling body depends on. It is also why a racing cyclist cares about **rotational** mass at the rim far more than the same mass on the frame: at $k = R$ every kilogram of tyre and rim costs twice the accelerating effort of a kilogram of frame.
:::
:::

::: example Atwood machine with a massive pulley {#ex-atwood-pulley}
An Atwood machine has masses of $12\ \mathrm{kg}$ and $8\ \mathrm{kg}$ on a rope over a pulley of radius $150\ \mathrm{mm}$ and moment of inertia $0.06\ \mathrm{kg\,m^{2}}$. Find the acceleration and the two rope tensions.
::: solution
The pulley's inertia makes the two tensions **different**, which is the whole point:
$$
m_1 g - T_1 = m_1 a, \qquad T_2 - m_2 g = m_2 a, \qquad
\left( T_1 - T_2 \right) R = I \frac{a}{R} .
$$
Adding the first two and using $T_1 - T_2 = I a / R^{2}$,
$$
\left( m_1 - m_2 \right) g = a \left( m_1 + m_2 + \frac{I}{R^{2}} \right)
\quad\Longrightarrow\quad
a = \frac{4 \times 9.81}{20 + 0.06 / 0.0225} = \frac{39.24}{22.67} = 1.73\ \mathrm{m / s^{2}} ,
$$
$$
T_1 = 12 \left( 9.81 - 1.73 \right) = 97.0\ \mathrm{N}, \qquad
T_2 = 8 \left( 9.81 + 1.73 \right) = 92.3\ \mathrm{N}.
$$
*Check.* $\left( T_1 - T_2 \right) R = \left( 96.95 - 92.33 \right) \times 0.15 = 0.693\ \mathrm{N\,m}$ and $I a / R = 0.06 \times 1.731 / 0.15 = 0.692\ \mathrm{N\,m}$ — equal within rounding. $\checkmark$

*Sanity.* The pulley's inertia enters the acceleration exactly like an extra mass $I / R^{2} = 2.67\ \mathrm{kg}$ added to the system, and the difference in the two tensions is not a paradox but the torque that spins the pulley up. That $I / R^{2}$ is the **effective mass** of a rotating element referred to a linear motion, and it is why a bicycle's wheels matter so much more than its frame: a rim of mass $m$ at radius $R$ has $I = m R^{2}$, so it contributes $2 m$ to the accelerating mass, once as translation and once as rotation. Two kilograms of wheel cost the same effort as four kilograms of frame, which is the single most useful fact in bicycle-wheel design.
:::
:::

## Torque, inertia and reflected mass

::: example Hoist drum {#ex-hoist-drum}
A winding drum of mass $200\ \mathrm{kg}$ and radius of gyration $300\ \mathrm{mm}$ has a rope at $400\ \mathrm{mm}$ radius lifting a $500\ \mathrm{kg}$ cage. The driving torque is $2500\ \mathrm{N\,m}$. Find the acceleration, the rope tension and the torque required for steady lifting.
::: solution
**Equations.** For the cage, $T - m g = m a$; for the drum,
$$
M - T R = I \alpha = I \frac{a}{R}, \qquad I = 200 \times 0.3^{2} = 18\ \mathrm{kg\,m^{2}} .
$$
Eliminating $T$,
$$
M - m g R = a \left( m R + \frac{I}{R} \right)
\quad\Longrightarrow\quad
a = \frac{2500 - 500 \times 9.81 \times 0.4}{500 \times 0.4 + 18 / 0.4}
= \frac{538}{245} = 2.20\ \mathrm{m / s^{2}} ,
$$
$$
T = 500 \left( 9.81 + 2.20 \right) = 6003\ \mathrm{N} .
$$
**Steady lifting** needs $M = m g R = 1962\ \mathrm{N\,m}$, so $538\ \mathrm{N\,m}$ — $22$ per cent of the applied torque — goes into acceleration.

*Check.* The drum's rope tension equals the cage's, since the rope is massless; the drum's own bearing friction has been neglected. The **effective inertia** seen at the drum shaft is
$$
I_{\text{eff}} = I + m R^{2} = 18 + 500 \times 0.16 = 98\ \mathrm{kg\,m^{2}} ,
$$
five and a half times the drum's own, and $82$ per cent of it is the load "reflected" through the rope. $\checkmark$

*Sanity.* That reflected-inertia idea is the single most useful calculation in drive engineering. Every rotating element in a drive train contributes $m r^{2}$ or $I$ referred to one shaft through the **square** of the gear ratio, so a motor driving a hoist through a $10 : 1$ reducer sees the drum-and-load inertia divided by $100$ — which is why a small, fast motor can drive a huge load, and why the ratio that **maximises** the load acceleration is the one that makes the motor's own inertia equal to the reflected load inertia. Get the ratio wrong by a factor of three and you lose $40$ per cent of the achievable acceleration, since the acceleration varies as $2 / \left( n / n_0 + n_0 / n \right)$ about the optimum ratio $n_0$; get it backwards and the motor is doing nothing but spinning itself up.
:::
:::

::: example Rod released from horizontal {#ex-rod-hinge}
A uniform slender rod of mass $8\ \mathrm{kg}$ and length $1.2\ \mathrm{m}$ is hinged at one end and released from rest in the horizontal position. Find its initial angular acceleration, the reaction at the hinge, and its angular speed when it becomes vertical.
::: solution
**Angular acceleration.** Taking moments about the hinge, where the reaction has no moment, and using $I_O = m L^{2} / 3$:
$$
m g \frac{L}{2} = I_O \alpha = \frac{m L^{2}}{3} \alpha
\quad\Longrightarrow\quad
\alpha = \frac{3 g}{2 L} = \frac{3 \times 9.81}{2 \times 1.2} = 12.26\ \mathrm{rad / s^{2}} .
$$
**Hinge reaction.** The mass centre accelerates downwards at $\bar{a} = \alpha L / 2 = 7.36\ \mathrm{m / s^{2}}$, so
$$
m g - R = m \bar{a}
\quad\Longrightarrow\quad
R = m \left( g - \bar{a} \right) = 8 \times 2.45 = 19.6\ \mathrm{N} = \frac{m g}{4} .
$$
**Speed at the bottom.** By energy, $m g L / 2 = \tfrac{1}{2} I_O \omega^{2}$:
$$
\omega = \sqrt{\frac{3 g}{L}} = \sqrt{24.53} = 4.95\ \mathrm{rad / s} .
$$
*Check.* The free end then moves at $\omega L = 5.94\ \mathrm{m / s}$, faster than a particle falling freely through the same $1.2\ \mathrm{m}$ would move at $\sqrt{2 g L} = 4.85\ \mathrm{m / s}$ — because the rod's own mass distribution lets the upper parts fall and give up energy to the lower tip. $\checkmark$

*Sanity.* The reaction of $m g / 4$ is a quarter of the rod's weight, so the hinge is **relieved** at the moment of release, and the free end falls at $\tfrac{3}{2} g$, faster than gravity. That is the classic demonstration that a part of a falling body accelerates faster than $g$: put a coin on the free end of a hinged rod held horizontal and release it, and the rod drops away from the coin, which is left to follow at only $g$. The same arithmetic gives the **centre of percussion**, at $2 L / 3$ from the hinge, where the impulse produces no reaction at the pivot — one definition of the "sweet spot" of a bat, a racket or a hammer.
:::
:::

::: warning Friction in rolling can point either way, and assuming the wrong way is not fatal
For a wheel being **driven**, the friction at the ground points **forwards**, in the direction of motion, because the tyre would otherwise slip backwards. For a **braked** wheel it points backwards. For a freely rolling wheel pulled at its centre on a level surface it is zero in the ideal case and backwards in practice, because it must supply the moment to overcome the tyre's rolling resistance. The safe procedure is to draw the friction in an assumed direction, solve, and read the sign — never to argue about it first. If the magnitude you obtain exceeds $\mu N$, the assumption of rolling without slipping is invalid and the problem must be redone with $F = \mu_k N$ and $a \ne \alpha R$.
:::

::: history
The dynamics of a rigid body is Euler's, in the Berlin and St Petersburg memoirs from 1750 onwards that created the subject, culminating in the *Theoria motus corporum solidorum seu rigidorum* of 1765 with its equations of rotation about the principal axes. The **centre of oscillation** is Huygens's, in the *Horologium oscillatorium* of 1673, and the closely related **centre of percussion** was discussed by Wallis and others in the same decades; the **instantaneous axis** of a body in general motion is treated in Poinsot's *Théorie nouvelle de la rotation des corps* of 1834. The **compound pendulum** as a precision instrument — Kater's reversible pendulum of 1818, which measured $g$ without needing to know where the centre of mass was — is one of the elegant applications of the $I = m k^{2} + m d^{2}$ result, and it remained the standard absolute determination of gravity until the drop-timer methods of the 1950s. The **reflected inertia** idea, the "equivalent moment of inertia" of a geared drive, is standard in electric-drive engineering, and the same calculation underlies the flywheel chapters of the nineteenth-century steam-engine texts.
:::

## Where this leads

Energy and momentum methods applied to rigid bodies are in [[dynamics/rigid-body-energy-momentum]], the three-dimensional equations with the products of inertia are in [[dynamics/three-dimensional-dynamics]], and the vibration of the systems analysed here is developed in [[vibrations/free-vibration]]. Gearing and the reflected-inertia calculation are worked through in [[mechanisms/gear-trains]], and the flywheel sizing of the design exercise below is applied in [[machine-design/clutches-brakes-belts]].

::: summary
- A plane-moving rigid body needs three equations: $\sum F_x = m a_x$, $\sum F_y = m a_y$, $\sum M_G = I_G \alpha$.
- The moment equation is simplest about the mass centre or a fixed point; about the contact point of a rolling body it eliminates friction.
- Rolling without slipping couples $a = \alpha R$, and the acceleration of a rolling body is independent of its mass and size and depends only on $k^{2} / R^{2}$.
- Friction in rolling takes whatever direction and magnitude the no-slip condition requires, up to $\mu N$; assume a direction and let the sign decide.
- A translationally loaded rotating system has an **effective inertia** $I + m r^{2}$ at the shaft, and gear ratios enter it as the **square** of the ratio.
- The centre of percussion is the point where an impulse produces no reaction at the pivot; it lies at $I_O / m \bar{r}$ from the pivot.
:::

::: quiz
A solid cylinder and a thin-walled pipe, each of mass $M$ and radius $R$, roll without slipping side by side down the same incline from rest. Which reaches the bottom first, and what happens if both masses are doubled?
- [ ] The pipe arrives first; doubling the mass makes both arrive earlier
- [x] The solid cylinder arrives first, and doubling the mass changes nothing
- [ ] They arrive together, because the acceleration is independent of the body
- [ ] They arrive together only if their masses are equal
::: solution
The acceleration of a rolling body is $a = g \sin \theta / \left( 1 + k^{2} / R^{2} \right)$, which contains neither mass nor size. For the solid cylinder $k^{2} / R^{2} = \tfrac{1}{2}$ giving $a = 0.667 \, g \sin \theta$, and for the thin pipe $k^{2} / R^{2} = 1$ giving $a = 0.5 \, g \sin \theta$ — the cylinder wins by a third, and mass is irrelevant. The physics is that the pipe must give a larger share of its lost potential energy to rotation, since all its mass sits at the full radius, so less is left for translation. Doubling both masses multiplies the driving force and the inertia by the same factor. This is why the moment of inertia, not the mass, is the number to ask for when a rotating part has to be accelerated: a flywheel's storage per kilogram goes as $k^{2} \omega^{2}$, and moving mass outward is the cheapest way to buy inertia — until the stress limits it.
:::
:::

## Exercises

::: exercise Moment of inertia {level=1 check="240"}
A solid cylinder of mass $20\ \mathrm{kg}$ and radius $0.3\ \mathrm{m}$ rolls without slipping. Find its kinetic energy at $4\ \mathrm{m / s}$ (enter it in J), and its radius of gyration about the contact point.
::: solution
$$
T = \tfrac{1}{2} m v^{2} \left( 1 + \tfrac{1}{2} \right) = 0.75 \times 20 \times 16 = 240\ \mathrm{J}.
$$
Since $T = \tfrac{1}{2} I_C \omega^{2}$ with $\omega = v / R$, $I_C = 2 T R^{2} / v^{2} = 2 \times 240 \times 0.09 / 16 = 2.70\ \mathrm{kg\,m^{2}}$, and $k_C = \sqrt{I_C / m} = \sqrt{0.135} = 0.367\ \mathrm{m}$, which is $\sqrt{k^{2} + R^{2}} = R \sqrt{3 / 2}$.
:::
:::

::: exercise Rolling {level=1 check="0.289"}
A thin-walled pipe of radius $R$ rolls without slipping down an incline of $30^{\circ}$. Find the minimum coefficient of friction.
::: solution
$\mu_{\min} = \tan \theta / 2 = 0.289$.
:::
:::

::: exercise Reflected inertia {level=1 check="98"}
For the hoist of [[#ex-hoist-drum]], what is the effective moment of inertia referred to the drum shaft?
::: solution
$I_{\text{eff}} = I + m R^{2} = 18 + 500 \times 0.4^{2} = 98\ \mathrm{kg\,m^{2}}$.
:::
:::

::: exercise Falling yo-yo {level=2}
A yo-yo of mass $0.2\ \mathrm{kg}$, outer radius $30\ \mathrm{mm}$ and axle radius $6\ \mathrm{mm}$, with $k = 20\ \mathrm{mm}$, unwinds from a string held fixed above. Find the downward acceleration and the tension.
::: solution
$$
a = \frac{g}{1 + k^{2} / r^{2}} = \frac{9.81}{1 + 400 / 36} = 0.81\ \mathrm{m / s^{2}},
$$
$$
T = m \left( g - a \right) = 0.2 \times 9.00 = 1.80\ \mathrm{N}.
$$
*Sanity.* The acceleration is only $8$ per cent of $g$, because the axle radius is small compared with the radius of gyration: the smaller the axle, the slower the unwind, and the tension is correspondingly $92$ per cent of the weight. That is why a yo-yo descends gently, and why a modern yo-yo with a ball-bearing axle can "sleep" — spin at the bottom of the string while the string slips round the bearing — for a time set by the bearing friction.
:::
:::

::: exercise Centre of percussion {level=2}
A uniform bat of length $L$ is pivoted at one end. Where is its centre of percussion, and where should a ball be struck so that the pivot feels no impulse? Repeat for a physical pendulum whose centre of mass is at $\bar{r}$ and radius of gyration $k$ about the mass centre.
::: solution
An impulse $J$ at distance $q$ from the pivot gives
$$
J = m \bar{v} = m \omega \bar{r}, \qquad
J q = I_O \omega = m \left( k^{2} + \bar{r}^{2} \right) \omega ,
$$
so $q = \left( k^{2} + \bar{r}^{2} \right) / \bar{r}$. For a uniform rod, $k^{2} = L^{2} / 12$ and $\bar{r} = L / 2$, giving
$$
q = \frac{L^{2} / 12 + L^{2} / 4}{L / 2} = \frac{2 L}{3} .
$$
*Sanity.* Note that $q = \bar{r} + k^{2} / \bar{r}$ is the **centre of oscillation**, and that the two are reciprocal: pivoting the body at the centre of percussion makes the old pivot the new centre of percussion. That reciprocity is what makes Kater's reversible pendulum work. The centre of percussion is one definition of a bat's "sweet spot"; another, the node of the bat's fundamental bending mode, where the hands feel least vibration, lies at a somewhat different place.
:::
:::

::: exercise Braking {level=2}
A $60\ \mathrm{kg}$ flywheel of radius of gyration $300\ \mathrm{mm}$ runs at $600\ \mathrm{rpm}$ and is brought to rest by a constant torque in $20$ revolutions. Find the braking torque and the time.
::: solution
$\omega = 62.83\ \mathrm{rad / s}$, $I = 60 \times 0.09 = 5.4\ \mathrm{kg\,m^{2}}$, $\phi = 20 \times 2 \pi = 125.7\ \mathrm{rad}$:
$$
\alpha = \frac{\omega^{2}}{2 \phi} = \frac{3948}{251.3} = 15.71\ \mathrm{rad / s^{2}}, \qquad
M = I \alpha = 84.8\ \mathrm{N\,m},
$$
$$
t = \frac{\omega}{\alpha} = 4.0\ \mathrm{s}.
$$
*Sanity.* The energy to be dissipated is $\tfrac{1}{2} \times 5.4 \times 62.83^{2} = 10\,650\ \mathrm{J}$, and $M \phi = 84.8 \times 125.7 = 10\,660\ \mathrm{J}$ — a useful cross-check that always works. The **power** at the start is $M \omega = 5330\ \mathrm{W}$, which is why a brake on a flywheel is a heat problem and not a torque problem: $10.7\ \mathrm{kJ}$ dumped into a $5\ \mathrm{kg}$ cast-iron drum in four seconds raises its temperature by about $5\ \mathrm{K}$, and brake fade on a long descent is the same calculation done repeatedly.
:::
:::

::: exercise Design {level=3}
A punching press makes a $50\ \mathrm{mm}$ hole through $20\ \mathrm{mm}$ mild-steel plate, requiring about $8\ \mathrm{kJ}$ per hole, at $25$ punches a minute. The flywheel runs at a mean $250\ \mathrm{rpm}$ and the speed drop must not exceed $8$ per cent. Size the flywheel and find the motor rating.
::: solution
**Speed fluctuation.** $\omega = 2 \pi \times 250 / 60 = 26.18\ \mathrm{rad / s}$ and $\omega_1 - \omega_2 = 0.08 \times 26.18 = 2.094\ \mathrm{rad / s}$.
**Moment of inertia.**
$$
I = \frac{E}{\omega^{2} \left( \omega_1 - \omega_2 \right) / \omega}
= \frac{8000}{26.18^{2} \times 0.08} = 146\ \mathrm{kg\,m^{2}} .
$$
**Motor rating.** The mean power is
$$
P = \frac{8000 \times 25}{60} = 3333\ \mathrm{W} = 3.33\ \mathrm{kW},
$$
so a $4\ \mathrm{kW}$ motor is selected, against a **peak** demand of $8\ \mathrm{kJ}$ in the $0.15\ \mathrm{s}$ of the punching stroke, which would be $53\ \mathrm{kW}$ without the flywheel.
**Flywheel.** For a rim-type wheel with $90$ per cent of the mass at a mean radius of $500\ \mathrm{mm}$,
$$
m = \frac{I}{0.9 \times 0.5^{2}} = \frac{146}{0.225} = 649\ \mathrm{kg}.
$$
*Design comment.* The flywheel does not reduce the **energy** required, only the **power** the motor must deliver: it takes $3.33\ \mathrm{kW}$ continuously and gives it back in $0.15\ \mathrm{s}$. That is the whole reason for one, and it is why a press is rated by both its tonnage and its flywheel energy. Two cautions follow. First, a $649\ \mathrm{kg}$ cast-iron rim at $500\ \mathrm{mm}$ radius running at $250\ \mathrm{rpm}$ stores only $0.5 \times 0.5^{2} \times 26.18^{2} = 86\ \mathrm{J}$ per kilogram of rim, which is modest. A thin rim stores $v^{2} / 2$ per kilogram and carries a hoop stress $\rho v^{2}$, so its specific energy is $\sigma / \left( 2 \rho \right)$, fixed by the material's strength-to-density ratio; a high-strength steel rim can run at $150\ \mathrm{m / s}$ rather than the $13\ \mathrm{m / s}$ of this one and store $11\ \mathrm{kJ / kg}$, which is why energy-storage flywheels use strong steel or composite rims running fast. Second, the $8$ per cent speed drop is an assumed allowance; the punch also needs a minimum ram speed through the cut, so in practice the flywheel is checked against the press's load–stroke diagram as well as against the coefficient of fluctuation.
:::
:::

::: exercise Derivation {level=3}
Derive the equations of motion of a wheel of mass $m$, radius $R$ and centroidal radius of gyration $k$, rolling without slipping on a horizontal surface, first when driven by a pure couple $M$ about its axle and then when driven by a horizontal force $P$ applied at height $y$ above the axle. Show that the friction force reverses at a definite height and identify it.
::: solution
**Couple on the axle.** With $F$ the friction taken forwards, and $a = \alpha R$,
$$
F = m a, \qquad M - F R = I_G \frac{a}{R} ,
$$
$$
a = \frac{M R}{m \left( k^{2} + R^{2} \right)}, \qquad
F = \frac{M R}{k^{2} + R^{2}} \quad \text{forwards} .
$$
The friction is necessarily **forwards** because it is the only horizontal force and the wheel accelerates forwards; the bound $F \le \mu m g$ gives the maximum drive torque
$$
M_{\max} = \mu m g \, \frac{k^{2} + R^{2}}{R} .
$$
**Force at height $y$.** Resolving and taking clockwise moments about the centre,
$$
P + F = m a, \qquad P y - F R = I_G \frac{a}{R} .
$$
Eliminating $a$,
$$
a = \frac{P R \left( R + y \right)}{m \left( k^{2} + R^{2} \right)}, \qquad
\boxed{F = \frac{P \left( R y - k^{2} \right)}{k^{2} + R^{2}}} .
$$
The friction therefore **vanishes** when
$$
y = \frac{k^{2}}{R}, \qquad \text{that is at height } \ h = R + \frac{k^{2}}{R} \text{ above the ground},
$$
is **forwards** above that height and **backwards** below it. For the spool of [[#ex-spool-kinetics]], $k^{2} / R = 0.0225 / 0.2 = 112.5\ \mathrm{mm}$, so the cord at $y = 100\ \mathrm{mm}$ gives a backward friction of $2.4\ \mathrm{N}$, exactly as found.

*Comment.* The unifying statement is that the friction at a rolling contact is whatever the no-slip condition requires, and its sign is set by which side of the **critical height** $R + k^{2} / R$ the line of action of the applied force falls. Two limits are worth noticing. As $k \to 0$ (all the mass at the axle) the critical height tends to $R$ and any force above the axle drives the friction forwards, which is intuitive; as $k \to R$ (a hoop) it tends to $2 R$, the top of the wheel, so a hoop needs no friction when pulled at its top and has **backward** friction when pulled anywhere below it. The other check is the pure couple, which is the limit $P \to \infty$, $y \to \infty$ at fixed $P y = M$, and gives $F$ forwards as derived separately. Every case in this lesson — the pulled spool, the driven wheel, the braked wheel, the cylinder on the incline — is one instance of the single rule, and deriving it once is worth more than memorising the four answers.
:::
:::
