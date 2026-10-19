Everything built rests on something else, and at every contact there is a force parallel to the surfaces that no equation would predict if you had never heard of friction. A ladder stands on a smooth floor only if the floor is not smooth. A belt transmits power only because it is clamped onto a pulley. A bolt stays tight, a nut does not back off, a car stops, a person walks, and a wedge holds a shelf level. Friction is the reason, and it is the only force in elementary statics whose magnitude is not given by equilibrium but only bounded by it.

That single difference — an inequality rather than an equation — changes the character of the whole subject. A friction problem has a *range* of answers, and the interesting questions are at the ends of the range: the least force that will move a body, the greatest load a brake can hold, the steepest slope before a wall pushes its footing sideways. Getting those right is the difference between a design that works and one that slides, and getting them wrong is usually a matter of using the wrong coefficient or the wrong normal force.

::: warning Friction is not $\mu N$; it is at most $\mu N$
The most common error in the whole of statics is to write $F = \mu N$ when the body is not on the point of sliding. Static friction takes whatever value equilibrium requires, from zero up to the limit $\mu_s N$. A block resting on a horizontal table has $F = 0$, not $F = \mu_s N$. Write $F \le \mu_s N$ always, and replace the inequality by an equality **only** when the problem says "on the point of sliding", "just moves", "impending motion", or when you are deliberately finding a limiting value. Solving a non-limiting problem with $F = \mu_s N$ gives an answer that is not merely wrong but physically impossible.
:::

## The law of dry friction

::: definition Dry (Coulomb) friction {#def-friction}
When two dry surfaces press together with a normal force $N$ and are tending to slide, they exert on each other a tangential **friction force** $F$ opposing the relative motion or its tendency. The empirical laws of Coulomb friction are
$$
F \le \mu_s N \ \text{(static)}, \qquad F_k = \mu_k N \ \text{(kinetic)}, \qquad \mu_k \lesssim \mu_s ,
$$
with $\mu_s$ and $\mu_k$ the coefficients of static and kinetic friction. The **friction angle** $\phi$ is defined by
$$
\tan \phi = \mu ,
$$
and the resultant of $N$ and $F$ lies within a **friction cone** of semi-angle $\phi$ about the common normal.
:::

::: proposition The friction cone and the angle of repose {#prop-repose}
A body of weight $W$ on a plane inclined at $\theta$ to the horizontal is on the point of sliding when
$$
\tan \theta = \mu_s ,
$$
so the **angle of repose** equals the friction angle. More generally, a body on which a force $P$ acts is in equilibrium if and only if the resultant of $P$ and $W$ falls inside the friction cone at every contact.
:::

::: proof
Resolve the weight along and normal to the plane. Equilibrium gives $F = W \sin \theta$ and $N = W \cos \theta$, so the no-slip condition $F \le \mu_s N$ becomes $W \sin \theta \le \mu_s W \cos \theta$, that is $\tan \theta \le \mu_s$, with equality at the point of sliding. The weight cancels, which is why the angle of repose does not depend on the mass of the object — a fact first recorded by de la Hire and confirmed by Newton, and the reason a heap of sand has the same slope whether it is a cup or a lorry load. For the general statement, the contact can supply any resultant whose tangential and normal components satisfy $F \le \mu_s N$, which is exactly the set of directions within angle $\phi = \arctan \mu_s$ of the normal: a cone. Equilibrium is possible if and only if the other forces can be balanced by a contact force in that cone.
:::

::: algorithm Problems of impending motion {#alg-friction}
1. Decide **which contact slips first** and **in which direction**. If there are several contacts, this is the unknown of the problem, and each candidate must be tried.
2. Draw the free-body diagram, with friction drawn in the direction **opposing the impending relative motion** — not opposing the applied force, and not opposing the motion of the body as a whole.
3. Set $F = \mu N$ **at the slipping contact only**; leave friction at other contacts as an unknown $F \le \mu N$ unless they too are limiting.
4. Solve the equilibrium equations.
5. Check the assumption: verify $F \le \mu N$ at every non-limiting contact, and verify that the assumed slip direction gives a positive $F$. If either fails, another contact governs and the problem must be re-solved with a different assumption.
:::

::: example Block on an incline, pushed horizontally {#ex-incline-push}
A block of mass $50\ \mathrm{kg}$ rests on a plane inclined at $15^{\circ}$. The coefficient of static friction is $\mu_s = 0.35$. Find the least horizontal force $P$ that will start the block moving up the plane, and state whether the block slides on its own.
::: solution
**Does it slide alone?** The angle of repose is $\phi = \arctan 0.35 = 19.29^{\circ}$, and $15^{\circ} < 19.29^{\circ}$, so the block stands. Equivalently, the required friction is $W \sin 15^{\circ} = 490.5 \times 0.2588 = 127.0\ \mathrm{N}$ while the available friction is $\mu_s W \cos 15^{\circ} = 0.35 \times 490.5 \times 0.9659 = 165.8\ \mathrm{N}$. It stands with $77$ per cent of its friction capacity unused.

**Least horizontal push up the plane.** At impending motion up the plane, friction acts down the plane at its limit. Resolve along and normal to the plane, with $P$ horizontal:
$$
\textstyle \sum F_{\text{normal}} = N - W \cos 15^{\circ} - P \sin 15^{\circ} = 0 ,
$$
$$
\textstyle \sum F_{\text{along}} = P \cos 15^{\circ} - W \sin 15^{\circ} - \mu_s N = 0 .
$$
Substituting $N = W \cos 15^{\circ} + P \sin 15^{\circ}$ into the second,
$$
P \left( \cos 15^{\circ} - \mu_s \sin 15^{\circ} \right) = W \left( \sin 15^{\circ} + \mu_s \cos 15^{\circ} \right)
\quad\Longrightarrow\quad
P = W \tan(\theta + \phi) ,
$$
$$
P = 490.5 \times \tan(34.29^{\circ}) = 490.5 \times 0.6819 = 334\ \mathrm{N}.
$$
*Sanity.* Pushing *up* the plane needs $334\ \mathrm{N}$ against a weight of $490.5\ \mathrm{N}$; pushing parallel to the plane would need only $W \sin 15^{\circ} + \mu_s W \cos 15^{\circ} = 127.0 + 165.8 = 292.8\ \mathrm{N}$. The horizontal push is $14$ per cent worse because part of it presses the block into the plane and increases the friction it must overcome. That is the general rule: **pushing downwards on a body makes it harder to move than pulling it**, which is why a vacuum cleaner is pushed and a sledge is pulled.
:::
:::

::: example Ladder on the point of slipping {#ex-ladder}
A ladder $AB$ of length $6\ \mathrm{m}$ and weight $200\ \mathrm{N}$ leans against a smooth vertical wall at an angle of $60^{\circ}$ to the horizontal floor. The coefficient of friction at the floor is $\mu = 0.4$. A person of weight $700\ \mathrm{N}$ climbs the ladder. How far up can they go before the ladder slips?
::: solution
Forces: the wall reaction $N_w$ horizontal at $A$ (the wall is smooth, so no vertical friction there), the floor normal reaction $N_f$ and friction $F$ at $B$, the ladder's weight $200\ \mathrm{N}$ at mid-length, and the person's $700\ \mathrm{N}$ at distance $x$ up the ladder from $B$.

Vertical equilibrium:
$$
\textstyle \sum F_y = N_f - 200 - 700 = 0 \quad\Longrightarrow\quad N_f = 900\ \mathrm{N}.
$$
At the point of slipping the floor friction is limiting:
$$
F = \mu N_f = 0.4 \times 900 = 360\ \mathrm{N}, \qquad
\textstyle \sum F_x = F - N_w = 0 \quad\Longrightarrow\quad N_w = 360\ \mathrm{N}.
$$
Moments about $B$, taking anticlockwise positive, with the ladder making $60^{\circ}$ to the floor:
$$
\textstyle \sum M_B = N_w \times 6 \sin 60^{\circ} - 200 \times 3 \cos 60^{\circ} - 700 \, x \cos 60^{\circ} = 0
$$
$$
360 \times 6 \times 0.8660 = 200 \times 3 \times 0.5 + 700 \, x \times 0.5
\quad\Longrightarrow\quad
1870.6 = 300 + 350 \, x
$$
$$
x = \frac{1570.6}{350} = 4.49\ \mathrm{m}\ \text{up the ladder, that is}\ 75\ \text{per cent of its length}.
$$
*Check.* The person stands $4.49\ \mathrm{m}$ up a $6\ \mathrm{m}$ ladder, so their horizontal distance from $B$ is $4.49 \cos 60^{\circ} = 2.24\ \mathrm{m}$ and their moment about $B$ is $700 \times 2.24 = 1570\ \mathrm{N\,m}$, matching the term above.

*Sanity.* If the wall were rough the ladder would be safer; if $\mu$ fell to $0.3$, $N_w$ would be $270\ \mathrm{N}$ and $x = 1150 / 350 = 3.29\ \mathrm{m}$, only $55$ per cent of the length. The "one-in-four" ladder rule — foot one quarter of the working height out — gives $\tan \theta = 4$, $\theta = 76^{\circ}$, and at that angle the required $\mu$ for a person at the top is only $0.25$, comfortably below $0.4$.
:::
:::

## Wedges

::: definition Wedge and its force balance {#def-wedge}
A wedge of half-angle $\alpha$ converts an axial force into a much larger transverse force. With friction of coefficient $\mu$ on both faces and a load $Q$ on the back, the axial force needed to drive it in is
$$
P = Q \, \frac{\tan \alpha + \mu}{1 - \mu \tan \alpha} = Q \tan(\alpha + \phi), \qquad \tan \phi = \mu ,
$$
and the force needed to drive it *out* is $Q \tan(\phi - \alpha)$. The wedge is **self-holding** — it will not be pushed out by the load — when $\phi > \alpha$, that is $\mu > \tan \alpha$.
:::

::: proof
Each face carries a normal reaction $N$ and a friction force $\mu N$ directed so as to oppose the wedge's inward motion. Resolving for the wedge, whose axis is horizontal and whose faces are inclined at $\alpha$ to it, the two faces together give a transverse reaction $2(N \cos \alpha - \mu N \sin \alpha)$ and an axial resistance $2(N \sin \alpha + \mu N \cos \alpha)$. Equating the transverse reaction to $Q$ and the axial force to $P$, and dividing,
$$
\frac{P}{Q} = \frac{\sin \alpha + \mu \cos \alpha}{\cos \alpha - \mu \sin \alpha}
= \frac{\tan \alpha + \mu}{1 - \mu \tan \alpha} = \tan(\alpha + \phi),
$$
using the tangent addition formula with $\mu = \tan \phi$. Reversing the friction for outward motion gives $\tan(\phi - \alpha)$, which is negative when $\phi > \alpha$: the load then has to be *held back*, and the wedge holds itself. Setting $\mu = 0$ gives $P = Q \tan \alpha$, the ideal wedge, whose mechanical advantage $1 / \tan \alpha$ can be made arbitrarily large by making the wedge thin — but only up to the point where the self-holding condition and the yielding of the surfaces take over.
:::

::: example Driving and holding a wedge {#ex-wedge}
A wedge with a $1:8$ taper and $\mu = 0.25$ on both faces is driven under a machine foot carrying $Q = 10\ \mathrm{kN}$. Find the force to drive it in, the force needed to withdraw it, and the mechanical advantage.
::: solution
The half-angle satisfies $\tan \alpha = 1 / 8 = 0.125$, so $\alpha = 7.125^\circ$, and the friction angle is $\phi = \arctan 0.25 = 14.04^\circ$.

**Driving in.**
$$
P_{\text{in}} = Q \tan(\alpha + \phi) = 10 \tan(21.16^\circ) = 10 \times 0.3871 = 3.87\ \mathrm{kN},
$$
giving a mechanical advantage of $Q / P_{\text{in}} = 2.58$.

**Withdrawing.** The friction now reverses, so
$$
P_{\text{out}} = Q \tan(\phi - \alpha) = 10 \tan(6.91^\circ) = 10 \times 0.1212 = 1.21\ \mathrm{kN}.
$$
Because $\phi = 14.04^\circ > \alpha = 7.125^\circ$ the wedge is **self-holding**: the load cannot push it out by itself, and $1.21\ \mathrm{kN}$ of pull is required to draw it. That pull is the load a wedge-release mechanism must overcome, and it is $31$ per cent of the force used to drive the wedge in — the asymmetry between $3.87$ and $1.21\ \mathrm{kN}$ is the whole of the wedge's usefulness as a clamp.

*Sanity.* Halving the taper to $1:16$ gives $\alpha = 3.576^\circ$ and $P_{\text{in}} = 10 \tan(17.62^\circ) = 3.17\ \mathrm{kN}$, an improvement of only $18$ per cent for a halving of the taper, because friction dominates at these angles: with $\mu = 0$ the same wedge would need only $1.25\ \mathrm{kN}$. Meanwhile the self-holding margin grows from $\phi - \alpha = 6.9^\circ$ to $10.5^\circ$, so a finer wedge holds harder. Real shims and packing wedges are made as fine as the space allows for exactly this reason.
:::
:::

## Belt friction

::: theorem Euler–Eytelwein (capstan) equation {#thm-capstan}
A flexible belt wrapped through an angle $\beta$ (in radians) around a circular pulley or capstan with coefficient of friction $\mu$ supports tensions $T_1$ (tight side) and $T_2$ (slack side) related, at impending slip, by
$$
\frac{T_1}{T_2} = e^{\mu \beta} .
$$
The relation is independent of the pulley's radius and of how the tension varies along the wrap; for a V-groove of included angle $2 \gamma$, replace $\mu$ by $\mu / \sin \gamma$.
:::

::: proof
Consider an element of belt subtending $\mathrm{d} \theta$, with tension $T$ on one face and $T + \mathrm{d} T$ on the other, and a normal pressure $p$ per unit arc length. Radial equilibrium of the element (mass neglected) gives
$$
p\, \mathrm{d} \theta = 2 T \sin \frac{\mathrm{d} \theta}{2} \approx T\, \mathrm{d} \theta \quad\Longrightarrow\quad p = T ,
$$
per unit radius. Tangential equilibrium at impending slip gives
$$
(T + \mathrm{d} T) - T = \mu p\, \mathrm{d} \theta = \mu T\, \mathrm{d} \theta
\quad\Longrightarrow\quad
\frac{\mathrm{d} T}{T} = \mu\, \mathrm{d} \theta .
$$
Integrating from the slack side to the tight side, $\ln (T_1 / T_2) = \mu \beta$, which is the result. Note that $p = T$ means the normal pressure is proportional to the tension, so the high-tension end presses harder and generates more friction per unit angle — this is why the ratio is exponential and not linear, and why the radius cancels. For a V-groove, the wedge action multiplies the normal force: $2 N \sin \gamma = p'\, \mathrm{d} \theta$, so the friction per unit normal load becomes $\mu / \sin \gamma$, and a $34^{\circ}$ groove with $\mu = 0.3$ behaves as though $\mu$ were $0.3 / \sin 17^{\circ} = 1.03$.
:::

::: example Flat belt drive {#ex-belt}
A flat belt transmits power from a pulley of $300\ \mathrm{mm}$ diameter running at $1200\ \mathrm{rev/min}$. The angle of wrap is $160^{\circ}$ and $\mu = 0.3$. If the tight-side tension is $500\ \mathrm{N}$, find the slack-side tension, the torque transmitted and the power.
::: solution
The wrap angle is $\beta = 160 \times \pi / 180 = 2.7925\ \mathrm{rad}$, so
$$
e^{\mu \beta} = e^{0.3 \times 2.7925} = e^{0.8378} = 2.311 .
$$
Then
$$
T_2 = \frac{T_1}{2.311} = \frac{500}{2.311} = 216\ \mathrm{N},
$$
and the effective (net driving) tension is
$$
T_1 - T_2 = 500 - 216 = 284\ \mathrm{N}.
$$
The torque on the pulley is
$$
\mathcal{T} = (T_1 - T_2) r = 284 \times 0.150 = 42.6\ \mathrm{N\,m},
$$
and the belt speed is
$$
v = \pi d n / 60 = \pi \times 0.300 \times 1200 / 60 = 18.85\ \mathrm{m/s},
$$
so the power is
$$
\mathcal{P} = (T_1 - T_2) v = 284 \times 18.85 = 5350\ \mathrm{W} = 5.35\ \mathrm{kW}.
$$
*Sanity.* Both $T_1$ and $T_2$ are positive, so the belt is taut. The ratio $T_1 / T_2 = 2.31$ is the maximum available before slip; running at a lower ratio is normal, and the belt must be tensioned so that $T_2$ stays positive at full load — a slack side that goes slack flutters and whips. Note also that at $18.85\ \mathrm{m/s}$ centrifugal tension is significant: it reduces the grip without adding to the transmitted force, and at speeds above about $25\ \mathrm{m/s}$ it dominates the design.
:::
:::

::: widget plot
f: exp(0.3*x*pi/180)
x: 0, 360
y: 1, 62
labels: \text{capstan tension ratio } e^{\mu \beta}
caption: Holding ratio $T_1 / T_2 = e^{\mu \beta}$ against wrap angle $\beta$ for $\mu = 0.3$. One turn of rope on a bollard ($\beta = 360^{\circ}$) gives a ratio of $6.6$; two turns give $43$; four turns give $1834$. This is why a mooring line is taken three or four turns around a capstan and then merely held by hand, why a rock climber's belay device works, and why a rope wrapped round a tree can hold a vehicle. The exponent is the whole story: the ratio grows with the *angle*, not with the contact area or the radius.
:::

## Screw friction

::: proposition Torque of a power screw {#prop-screw}
A square-threaded screw of mean radius $r$ and lead $L$ under an axial load $Q$, with coefficient of friction $\mu$ on the thread flanks, requires an advancing torque
$$
\mathcal{T} = Q r \tan(\alpha + \phi), \qquad
\tan \alpha = \frac{L}{2 \pi r}, \quad \tan \phi = \mu ,
$$
and a torque $Q r \tan(\phi - \alpha)$ to be held back when lowering. The screw is self-locking when $\mu > L / (2 \pi r)$, and its raising efficiency is
$$
\eta = \frac{\tan \alpha}{\tan(\alpha + \phi)} .
$$
:::

::: proof
Unwrap one turn of the thread: the helix becomes a straight ramp of horizontal length $2 \pi r$ and rise $L$, so its inclination is $\alpha = \arctan(L / 2 \pi r)$. The load $Q$ sits on this ramp, and the thread must supply a horizontal force $H$ to push it up. This is exactly the inclined-plane problem of Example 1 with $P$ replaced by $H$ and $W$ by $Q$, so $H = Q \tan(\alpha + \phi)$, and the torque is $H r$. Lowering reverses the friction, giving $Q \tan(\phi - \alpha)$; the screw is self-locking when this is negative, that is $\phi > \alpha$, which on taking tangents is $\mu > L / (2 \pi r)$. The efficiency is the ideal torque divided by the actual: $\eta = Q r \tan \alpha / (Q r \tan(\alpha + \phi))$. For a V-thread or Acme thread of flank angle $\beta$ the same formulas hold with $\mu$ replaced by $\mu / \cos \beta$, which is why an Acme thread ($\beta = 14.5^{\circ}$) has about $3$ per cent more friction than a square thread and a metric ISO thread ($\beta = 30^{\circ}$) has $15$ per cent more.
:::

::: example Screw jack {#ex-jack}
A screw jack has a square thread of mean radius $15\ \mathrm{mm}$ and lead $6\ \mathrm{mm}$, carrying $20\ \mathrm{kN}$, with $\mu = 0.12$. Find the torque to raise the load, the torque needed to lower it, and the efficiency.
::: solution
$$
\tan \alpha = \frac{6}{2 \pi \times 15} = 0.06366 \quad\Longrightarrow\quad \alpha = 3.64^{\circ},
\qquad
\phi = \arctan 0.12 = 6.84^{\circ},
$$
$$
\mathcal{T}_{\text{raise}} = 20\,000 \times 0.015 \times \tan(10.48^{\circ})
= 300 \times 0.1850 = 55.5\ \mathrm{N\,m},
$$
$$
\mathcal{T}_{\text{lower}} = 300 \times \tan(3.20^{\circ}) = 300 \times 0.0559 = 16.8\ \mathrm{N\,m} \quad (\text{must be applied to lower it}),
$$
$$
\eta = \frac{\tan 3.64^{\circ}}{\tan 10.48^{\circ}} = \frac{0.0637}{0.1850} = 34.4\ \text{per cent}.
$$
*Sanity.* Two thirds of the work is lost in the thread, which is characteristic of a power screw and the reason a ball screw recovers most of it — at the cost of losing self-locking, so a ball-screw jack needs a brake. Since $\mu = 0.12 > L / (2 \pi r) = 0.0637$, the jack holds its load with no torque applied, which is the safety requirement for anything that lifts a person.
:::
:::

::: warning Which coefficient, and which normal force
Three errors recur. First, using the kinetic coefficient where the static one is required, or vice versa: $\mu_k$ is for a body already sliding and is typically $10$ to $40$ per cent below $\mu_s$, so a design for "holding" must use $\mu_s$ and one for "stopping distance" must use something between them. Second, taking the normal force as the weight: on an incline, in a V-groove, under a bolt's pretension or in a band brake, $N$ has nothing to do with $m g$. Third, using a catalogue value of $\mu$ measured in a clean laboratory on the same materials, when the real surfaces are oily, rusty, painted or greased — a $30$ per cent reduction in $\mu$ reduces a wedge's holding capacity, a belt's transmitted power and a bolt's preload retention by the same $30$ per cent. Always design friction on the *lower* bound of what the surface condition can give, and never on a value you have not measured or specified.
:::

::: history
Leonardo da Vinci wrote around 1493 that "the friction produced by the movement of a body is, ceteris paribus, of known proportion to the weight and figure of the body", and recorded that friction is independent of the apparent area of contact and proportional to load — two of the three laws usually credited to Amontons, who rediscovered them in 1699 and announced them to the Académie des Sciences. Coulomb's *Théorie des machines simples* (1785) added the distinction between static and kinetic friction and the independence of sliding speed, from experiments on ropes and on sledges, and is the origin of the name. The capstan equation was derived by Leonhard Euler in *Scientia navalis* (1749) and independently by the Italian engineer Eytelwein in 1808; Tredgold published it in English in 1820 and applied it to belt drives, which is why it is sometimes called Tredgold's formula. The angle-of-friction method for wedges and screws, in which $\mu$ is replaced geometrically by an angle, is due to Robert Willis in his *Principles of Mechanism* of 1841, and remained the standard design tool until the analytic formulas displaced it in the 1890s.
:::

::: quiz
A block is held at rest on a horizontal table by a horizontal force of $5\ \mathrm{N}$. The coefficient of static friction is $0.5$ and the normal force is $100\ \mathrm{N}$. What is the friction force?
- [ ] $50\ \mathrm{N}$
- [x] $5\ \mathrm{N}$
- [ ] $45\ \mathrm{N}$
- [ ] zero
::: solution
$5\ \mathrm{N}$. Equilibrium requires the friction to balance the applied force exactly; the value $\mu_s N = 50\ \mathrm{N}$ is only the *limit*, and the block is using a tenth of it. Writing $F = \mu_s N = 50\ \mathrm{N}$ here would give a net force of $45\ \mathrm{N}$ and an acceleration that does not exist. The answer would be $50\ \mathrm{N}$ only if the problem said the block was on the point of sliding.
:::
:::

## Where this leads

Friction at a bearing becomes the lubrication theory of [[machine-design/bearings]]. Frictional torque is the load case for [[machine-design/clutches-brakes-belts]], and bolt friction is the reason a bolt's preload is so uncertain in [[machine-design/fasteners-joints]]. Friction-induced vibration — squeal, chatter, stick-slip — appears in [[vibrations/two-degrees-of-freedom]] and in machining.

::: summary
- Static friction is an inequality, $F \le \mu_s N$; equality holds only at impending slip, and using it elsewhere is a category error.
- The friction angle $\phi = \arctan \mu$ and the friction cone turn friction problems into geometry, and the angle of repose equals the friction angle.
- Wedges, screws and inclined planes are all the same calculation: $P = Q \tan(\alpha + \phi)$, with self-holding when $\phi > \alpha$.
- Belt friction is exponential in the wrap angle, $T_1 / T_2 = e^{\mu \beta}$, independent of radius; a V-groove multiplies $\mu$ by $1 / \sin \gamma$.
- A power screw is an inclined plane wrapped on a cylinder, is usually self-locking, and is usually less than $50$ per cent efficient.
- Design on the lower bound of $\mu$ for the real surface condition, and always identify which contact slips first.
:::

## Exercises

::: exercise Angle of repose {level=1 check="19.3"}
The coefficient of static friction between a crate and a truck floor is $0.35$. What is the maximum slope, in degrees, of the ramp the truck can drive onto before the crate slides? (Enter the angle in degrees.)
::: solution
$\theta_{\max} = \arctan 0.35 = 19.3^{\circ}$, independent of the crate's mass. In practice ramps are limited to about $10^{\circ}$, because a wet or oily floor may give $\mu = 0.2$ ($11^{\circ}$) and because braking on the ramp adds a deceleration component that the friction must also supply.
:::
:::

::: exercise Pull versus push {level=1 check="293"}
A $50\ \mathrm{kg}$ block is dragged at constant speed up a $15^{\circ}$ plane by a force parallel to the plane, with $\mu = 0.35$. Find the force. (Enter the answer in N.)
::: solution
$P = W (\sin 15^{\circ} + \mu \cos 15^{\circ}) = 490.5 (0.2588 + 0.35 \times 0.9659) = 490.5 \times 0.5969 = 293\ \mathrm{N}$. Pulling at $15^{\circ}$ above the plane would reduce this slightly, because the vertical component relieves the normal force; pushing at the same angle below the plane would raise it to $334\ \mathrm{N}$.
:::
:::

::: exercise Belt {level=1 check="2.31"}
For the flat belt of Example 6, what is the ratio $T_1 / T_2$? (Enter the ratio to two decimal places.)
::: solution
$e^{\mu \beta} = e^{0.3 \times 2.7925} = 2.31$. Increasing the wrap from $160^{\circ}$ to $200^{\circ}$ raises the ratio to $e^{1.047} = 2.85$, a $23$ per cent gain for a $25$ per cent increase in angle — which is why an idler pulley is fitted to increase wrap before the belt is ever made wider.
:::
:::

::: exercise Wedge {level=2}
A $10^{\circ}$ included-angle wedge with $\mu = 0.3$ on both faces is used to lift a $5\ \mathrm{kN}$ load. Find the driving force and state whether the wedge is self-holding.
::: solution
Half-angle $\alpha = 5^{\circ}$, friction angle $\phi = \arctan 0.3 = 16.70^{\circ}$. Then
$$
P = 5 \tan(21.70^{\circ}) = 5 \times 0.3980 = 1.99\ \mathrm{kN}.
$$
Since $\phi = 16.70^{\circ} > \alpha = 5^{\circ}$, the wedge is self-holding: the load cannot push it out, and the mechanical advantage is $5 / 1.99 = 2.51$. Only about $40$ per cent of the effort is recovered if the wedge is driven back out, so a wedge is a poor machine and a good clamp — which is exactly what it is for.
:::
:::

::: exercise Band brake {level=2}
A band brake has a drum of $500\ \mathrm{mm}$ diameter, a band wrapped $270^{\circ}$, $\mu = 0.3$ and a slack-side tension of $200\ \mathrm{N}$. Find the holding torque, and the torque if the same band is used on a V-grooved drum of $40^{\circ}$ included angle.
::: solution
$\beta = 270^{\circ} = 4.712\ \mathrm{rad}$, so
$$
T_1 = 200 \, e^{0.3 \times 4.712} = 200 \times 4.111 = 822\ \mathrm{N},
$$
$$
\mathcal{T} = (T_1 - T_2) r = (822 - 200) \times 0.250 = 155.5\ \mathrm{N\,m}.
$$
On a $40^{\circ}$ V-groove the effective coefficient is $\mu / \sin 20^{\circ} = 0.3 / 0.342 = 0.877$, giving
$$
T_1 = 200 \, e^{0.877 \times 4.712} = 200 \times 60.6 = 12\,120\ \mathrm{N}, \qquad
\mathcal{T} = 11\,920 \times 0.250 = 2980\ \mathrm{N\,m},
$$
nineteen times as much. The exponential makes small changes in $\mu$ enormous in effect: this is why a band brake is self-energising and can grab violently, and why a V-grooved brake is rarely used where the load must be released smoothly.
:::
:::

::: exercise Screw {level=2}
An M24 bolt ($d = 24\ \mathrm{mm}$, pitch $3\ \mathrm{mm}$) with $\mu = 0.15$ on the thread and $\mu_c = 0.15$ under the head is tightened to a preload of $20\ \mathrm{kN}$. Estimate the torque, using the mean radius $r_2 = 10.9\ \mathrm{mm}$ and flank angle $30^{\circ}$, and the fraction of the torque that reaches the thread.
::: solution
Thread torque, with $\mu / \cos 30^{\circ} = 0.1732$ as the effective coefficient:
$$
\tan \alpha = \frac{3}{2 \pi \times 10.9} = 0.04382, \quad \alpha = 2.51^{\circ}, \qquad
\phi = \arctan 0.1732 = 9.83^{\circ},
$$
$$
\mathcal{T}_{\text{thread}} = 20\,000 \times 0.0109 \times \tan(12.34^{\circ}) = 218 \times 0.2188 = 47.7\ \mathrm{N\,m}.
$$
Head (collar) friction, taking an effective radius of $0.7 d = 16.8\ \mathrm{mm}$:
$$
\mathcal{T}_{\text{head}} = 0.15 \times 20\,000 \times 0.0168 = 50.4\ \mathrm{N\,m}.
$$
Total $\mathcal{T} = 98\ \mathrm{N\,m}$, of which only $49$ per cent goes into stretching the bolt; the rest is wasted under the head.

*Design comment.* This is the central fact of bolting. A $10$ per cent change in the head friction changes the total torque by $5$ per cent but the preload by nothing, while a $10$ per cent change in *thread* friction changes the preload by about $10$ per cent. Since $\mu$ varies by a factor of two between dry, lubricated and waxed threads, a torque-wrench tightening gives a preload scatter of $\pm 30$ per cent, and critical joints are therefore tightened by angle (turn-of-nut) or by measuring stretch.
:::
:::

::: exercise Which slips first {level=3}
A block of weight $W_1 = 200\ \mathrm{N}$ rests on a rough horizontal table ($\mu_1 = 0.25$) and carries a second block of weight $W_2 = 100\ \mathrm{N}$ on a rough upper surface ($\mu_2 = 0.4$). A horizontal force $P$ is applied to the lower block. Find the value of $P$ at which motion impends, and describe the motion.
::: solution
Two mechanisms are possible: the two blocks slide together over the table, or the upper block slides on the lower one.

**Case A, both slide together.** Normal force on the table $= 300\ \mathrm{N}$, so limiting friction $= 0.25 \times 300 = 75\ \mathrm{N}$ and $P = 75\ \mathrm{N}$. Check that the upper block can be carried: it needs a horizontal force of $m_2 a$ to accelerate with the lower block, and at impending motion the acceleration is zero, so it needs nothing and the interface friction required is $0 \le \mu_2 \times 100 = 40\ \mathrm{N}$. The check passes.

**Case B, upper block slips on the lower.** This requires the interface to be limiting at $40\ \mathrm{N}$, which would need the upper block to accelerate at $40 / (100 / 9.81) = 3.92\ \mathrm{m/s^{2}}$ while the lower one is being pulled — but the table friction of $75\ \mathrm{N}$ is reached at a lower $P$ than any mechanism requiring relative slip.

So motion impends at $P = 75\ \mathrm{N}$ with the two blocks moving together. If $P$ is applied to the **upper** block instead, the answer changes: the upper block slips on the lower at $P = 40\ \mathrm{N}$, because $40\ \mathrm{N}$ is less than the $75\ \mathrm{N}$ needed to move the pair. Which block you push decides which contact governs, and the same structure can be made to fail in either of two ways by moving the load half a metre.
:::
:::

::: exercise Derivation {level=3}
Derive the torque to turn a flat collar thrust bearing of inner radius $r_i$ and outer radius $r_o$ carrying an axial load $W$ with coefficient of friction $\mu$, first assuming uniform contact pressure and then assuming uniform wear. Compare the two for $r_i / r_o = 0.6$ and for $r_i / r_o = 0.8$, and explain why thrust pads and clutch facings are made narrow relative to their radius.
::: solution
Consider an annular element of radius $r$ and width $\mathrm{d} r$ carrying pressure $p$. Its normal force is $\mathrm{d} N = 2 \pi r p\, \mathrm{d} r$ and its friction torque is $\mathrm{d} \mathcal{T} = \mu r\, \mathrm{d} N = 2 \pi \mu p r^{2}\, \mathrm{d} r$.

**Uniform pressure**, $p$ constant. Then $W = \pi p (r_o^{2} - r_i^{2})$, so $p = W / \pi (r_o^{2} - r_i^{2})$, and
$$
\mathcal{T} = 2 \pi \mu p \frac{r_o^{3} - r_i^{3}}{3}
= \frac{2}{3} \mu W \frac{r_o^{3} - r_i^{3}}{r_o^{2} - r_i^{2}} .
$$

**Uniform wear**, in which the wear rate is proportional to $p v = p \omega r$ and hence $p r = c$ constant. Then $W = \int 2 \pi r c\, \mathrm{d} r = 2 \pi c (r_o - r_i)$, so $c = W / 2 \pi (r_o - r_i)$, and
$$
\mathcal{T} = 2 \pi \mu c \frac{r_o^{2} - r_i^{2}}{2} = \mu W \frac{r_o + r_i}{2} .
$$
Uniform wear is the realistic assumption for a run-in bearing, and it defines the **friction radius** $r_f = (r_o + r_i) / 2$.

For $r_i / r_o = 0.6$, uniform pressure gives $\mathcal{T} / \mu W r_o = \tfrac{2}{3} (1 - 0.216) / (1 - 0.36) = 0.925$ and uniform wear gives $(1 + 0.6) / 2 = 0.800$: a difference of $16$ per cent. For $r_i / r_o = 0.8$ the two are $0.903$ and $0.900$, within $0.4$ per cent. The two assumptions therefore agree only for a narrow annulus, and a wide thrust pad must be analysed for wear rather than for pressure — which is why clutches and thrust washers are always made narrow relative to their radius, so that the design torque is predictable.
:::
:::
