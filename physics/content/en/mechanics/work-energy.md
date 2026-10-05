A crate is pushed across a floor, a spring is released, and a block slides down a slope. In each case Newton's second law will give the acceleration, and a second integration will give the speed. That route works, and it is the one developed in [[mechanics/newton-laws]]. It becomes awkward as soon as the force changes with position, or the path is curved, or we care only about the speed and not about the time. There is a more direct route. Multiply the second law by a small displacement and add the pieces up. The left-hand side is the **work** done by the force. The right-hand side collapses to the change in a quantity that depends only on the mass and the speed, the **kinetic energy**.

That identity is the work–energy theorem. When the forces that do work can be written as slopes of a **potential energy**, the sum of kinetic and potential energy is constant, or it changes by exactly the work of the forces that are left over. The point of this chapter is to make those statements precise, to prove them for a particle of constant mass in one dimension, and to use them on the standard problems: a spring, kinetic friction on a flat surface, a smooth incline, and a rough incline. Throughout, take $g = 9.80\,\mathrm{m/s^2}$.

Energy here is a bookkeeping device for the equations of motion. It is not a new law. Every hypothesis we need — constant mass, an inertial frame, a force that is the net force — is inherited from Newton's laws.

## Work

Suppose a particle moves along a straight line through a displacement $\Delta\mathbf{r}$ of length $s$, while a constant force $\mathbf{F}$ acts on it. The force and the displacement need not point the same way. Only the component of $\mathbf{F}$ along $\Delta\mathbf{r}$ contributes to the pushing of the particle along its path.

::: definition Work of a constant force {#def-work}
The **work** done by a constant force $\mathbf{F}$ on a particle that undergoes a displacement $\Delta\mathbf{r}$ is the scalar

$$
W = \mathbf{F}\cdot\Delta\mathbf{r} = Fs\cos\theta,
$$ {#eq-work-const}

where $F = \abs{\mathbf{F}}$, $s = \abs{\Delta\mathbf{r}}$, and $\theta$ is the angle between the two vectors when they are placed tail to tail. The SI unit is the joule: $1\,\mathrm{J} = 1\,\mathrm{N\cdot m} = 1\,\mathrm{kg\,m^2/s^2}$.
:::

Work is a scalar, and it may be positive, negative or zero. If $\theta < 90^\circ$, the force has a component along the displacement and does positive work. If $\theta = 90^\circ$, it does none: the upright normal force on a block sliding horizontally, and the weight on that same slide, are the standard cases. If $\theta > 90^\circ$, the force opposes the displacement and does negative work. Kinetic friction does that along a sliding surface.

Say which force and which object. The work done by friction on a crate is not the work done by the person pushing it. The theorem below uses the net force.

A force that varies along the path, or a path that is not straight, is handled by cutting the path into small pieces. On a piece $\dd \mathbf{r}$ short enough that $\mathbf{F}$ is nearly constant,

$$
\dd W = \mathbf{F}\cdot\dd \mathbf{r} = F_s\,\dd s,
$$

where $F_s$ is the tangential component. Adding the pieces gives a line integral.

::: definition Work of a variable force {#def-work-variable}
The work done by a force $\mathbf{F}$ along a path $C$ from $A$ to $B$ is

$$
W = \int_C \mathbf{F}\cdot\dd \mathbf{r}.
$$ {#eq-work-var}

In one dimension, with the motion along the $x$-axis from $x_1$ to $x_2$ and $F$ the $x$-component of the force,

$$
W = \int_{x_1}^{x_2} F\,\dd x.
$$ {#eq-work-1d}
:::

The integral follows the motion in the order travelled. If the particle moves left, $\dd x$ is negative on that part. If $F$ is constant, [[#eq-work-1d]] reduces to $W = F(x_2 - x_1)$, in agreement with [[#eq-work-const]]. Work adds over forces and over consecutive pieces of one path. It does not, in general, take the same value on two different paths between the same endpoints. That is the distinction between conservative and non-conservative forces.

A short calculation shows why the path can matter. Take a $1.00\,\mathrm{kg}$ book slid on a horizontal table with $\mu_k = 0.200$. The friction force has magnitude $\mu_k mg = 0.200\times 9.80 = 1.96\,\mathrm{N}$ and always opposes the velocity. Along a straight $2.00\,\mathrm{m}$ slide the work done by friction is $-1.96\times 2.00 = -3.92\,\mathrm{J}$. Along a $5.00\,\mathrm{m}$ curve with the same endpoints it is $-1.96\times 5.00 = -9.80\,\mathrm{J}$. Same endpoints, different work. No function of position alone can record this force.

::: quiz
A suitcase is carried at constant velocity across a level floor. The upward force exerted by the traveller on the suitcase does
- [ ] positive work, because the traveller is tiring
- [x] no work, because that force is perpendicular to the horizontal displacement
- [ ] negative work, because the suitcase is heavy
- [ ] work equal to the weight times the distance, because the forces balance
::: solution
The displacement is horizontal and the force in the question is vertical, so $\theta = 90^\circ$ and $\cos\theta = 0$. Tiredness is real, but it is not work done on the suitcase by the upward force: the point of application moves perpendicular to that force. The weight is likewise vertical and does no work on this particular journey. Constant velocity tells us the net force vanishes; it does not by itself tell us the work of each separate force.
:::
:::

::: intuition Work as a sum of pushes along the path
Project the force onto the tangent at each point of the path. Positive projections are counted with the distance travelled, negative projections are subtracted, and perpendicular forces drop out. The integral in [[#eq-work-var]] is that sum. A negative result means the force is removing kinetic energy.
:::

## Kinetic energy and the work–energy theorem

The integral of the net force can be evaluated without knowing the path in detail, because Newton's second law ties the force to the velocity.

::: lemma Acceleration and the velocity differential {#lem-chain}
Let a particle move on the $x$-axis, with velocity $v = \deriv{x}{t}$ and acceleration $a = \deriv{v}{t}$. Wherever $v \neq 0$,

$$
a = v\deriv{v}{x},
$$

and therefore $a\,\dd x = v\,\dd v$.
:::

::: proof
On any time interval where $v$ does not change sign, $x$ is a strictly monotonic function of $t$, so $t$ may be treated as a function of $x$ and the chain rule applies:

$$
a = \deriv{v}{t} = \deriv{v}{x}\deriv{x}{t} = v\deriv{v}{x}.
$$

Multiplying by $\dd x$ gives $a\,\dd x = v\,\dd v$. If the particle reverses, split the motion into pieces on which $v$ does not change sign and apply the identity on each piece. At an isolated instant when $v = 0$ the contribution to either integral below is zero, so those instants do not affect the result.
:::

::: definition Kinetic energy {#def-kinetic}
The **kinetic energy** of a particle of mass $m$ and speed $v$ is

$$
K = \tfrac12 m v^2.
$$ {#eq-kinetic}

Kinetic energy is a scalar. It is never negative, and it is zero only when the particle is instantaneously at rest. It depends on the speed, not on the direction: $v$ and $-v$ give the same $K$.
:::

The factor $\tfrac12$ is not optional decoration. It is the factor that makes the next theorem true with no extra coefficient. The historical note at the end of the chapter records why older writers sometimes omitted it.

::: theorem Work–energy theorem {#thm-work-energy}
Let a particle of constant mass $m$ move on the $x$-axis from position $x_1$ to position $x_2$, with speed $v_1$ at $x_1$ and speed $v_2$ at $x_2$. Let $F$ be the net force on the particle. Then the work done by the net force equals the change in kinetic energy:

$$
W_{\mathrm{net}} = \int_{x_1}^{x_2} F\,\dd x = \tfrac12 m v_2^2 - \tfrac12 m v_1^2 = \Delta K.
$$ {#eq-wet}
:::

::: proof
The hypotheses are constant mass and the identification of $F$ with the net force, so Newton's second law reads $F = m a = m\,\deriv{v}{t}$. Then

$$
\begin{aligned}
W_{\mathrm{net}}
&= \int_{x_1}^{x_2} F\,\dd x
= \int_{x_1}^{x_2} m\deriv{v}{t}\,\dd x.
\end{aligned}
$$

By [[#lem-chain]], $\deriv{v}{t}\,\dd x = v\,\dd v$, and the limits change from the positions $(x_1, x_2)$ to the corresponding velocities $(v_1, v_2)$:

$$
\begin{aligned}
W_{\mathrm{net}}
&= \int_{v_1}^{v_2} m v\,\dd v
= m\left[\tfrac12 v^2\right]_{v_1}^{v_2}
= \tfrac12 m v_2^2 - \tfrac12 m v_1^2
= \Delta K.
\end{aligned}
$$

The same identity can be read in time. Differentiating [[#eq-kinetic]] along the motion gives

$$
\deriv{K}{t} = m v\deriv{v}{t} = F v = F\deriv{x}{t},
$$

and integrating from $t_1$ to $t_2$ recovers $W_{\mathrm{net}} = \Delta K$. This form makes the treatment of turning points automatic, and it is the reason the chain-rule step is legitimate.
:::

The two sides are separate calculations. The left-hand side uses forces and distances; the right-hand side uses the mass and the two speeds. If they disagree, a force has been omitted, the wrong force has been called the net force, or the mass was not constant. Direction enters only through the sign of $F\,\dd x$. Kinetic energy itself depends on speed, so a reversal of direction does not make $K$ negative.

$F$ in [[#eq-wet]] is the net force. The work of one force equals $\Delta K$ only when every other force does no work, or has already been included. Gravity, the normal force, friction and a push are sorted later into a potential or a remainder. The theorem itself wants the sum.

## Power

Work says how much energy a force transfers. It does not say how fast. A small motor and a large one may do the same work, the large one finishing sooner.

::: proposition Instantaneous power {#prop-power}
Let a force $\mathbf{F}$ act on a particle whose velocity is $\mathbf{v}$. The **power** of that force, the rate at which it does work, is

$$
P = \deriv{W}{t} = \mathbf{F}\cdot\mathbf{v}.
$$ {#eq-power}

The SI unit is the watt: $1\,\mathrm{W} = 1\,\mathrm{J/s}$.
:::

::: proof
Over a short interval the displacement is $\dd \mathbf{r} = \mathbf{v}\,\dd t$, so the work done by $\mathbf{F}$ in that interval is $\dd W = \mathbf{F}\cdot\dd \mathbf{r} = \mathbf{F}\cdot\mathbf{v}\,\dd t$. Dividing by $\dd t$ gives [[#eq-power]]. If several forces act, each has its own power, and the power of the net force equals $\deriv{K}{t}$, which is the time derivative already computed in the proof of [[#thm-work-energy]].
:::

The average power over a finite interval is $P_{\mathrm{av}} = W/\Delta t$. When $P$ is constant, $W = Pt$.

A tug pulls a barge with a force of $250\,\mathrm{N}$ in the direction of the motion, at a steady speed of $4.00\,\mathrm{m/s}$. The power of the tug is

$$
P = Fv = 250\times 4.00 = 1.00\times 10^3\,\mathrm{W} = 1.00\,\mathrm{kW}.
$$

In $10.0\,\mathrm{s}$ the work done is $Pt = 1.00\times 10^4\,\mathrm{J}$. The barge moves $s = vt = 40.0\,\mathrm{m}$, and $Fs = 250\times 40.0$ gives the same $1.00\times 10^4\,\mathrm{J}$.

Power can be negative. Kinetic friction is antiparallel to $\mathbf{v}$, so on a horizontal surface it removes kinetic energy at the rate $\mu_k mg v$. A force perpendicular to $\mathbf{v}$ has zero power at that instant.

## Conservative forces

The book on the table showed that the work of friction between two points depends on which route is taken. Gravity does not behave that way. Lift a mass through a height $h$, lower it, carry it sideways: the work done by gravity between two positions depends on the two heights and on nothing else about the route. Forces with that property are the ones for which a potential energy exists.

::: definition Conservative force {#def-conservative}
A force is **conservative** if the work it does on a particle moving from a point $A$ to a point $B$ is the same for every path from $A$ to $B$. Equivalently, the work done by the force around every closed path is zero.
:::

::: proof
The two sentences are equivalent, so this is a short argument rather than a new physical hypothesis. Suppose first that the work between any two points is path-independent. Take a closed loop, and break it into a path $C$ from $A$ to $B$ and a path $D$ from $B$ back to $A$. The return along $D$ is the reverse of a path from $A$ to $B$, so its work is minus the work of that outward path. Path independence makes the outward works of $C$ and of the reverse of $D$ equal, and the loop sum is zero.

Conversely, suppose every closed loop has zero work. Let $C$ and $D$ be two paths from $A$ to $B$. Travel out along $C$ and back along the reverse of $D$. That loop has work zero, so the work along $C$ equals the work along $D$.
:::

In one dimension the condition is milder. If $F = F(x)$ depends only on position, there is only one route from $x_1$ to $x_2$ up to reversals that cancel, and $\int_{x_1}^{x_2} F(x)\,\dd x$ depends only on the endpoints. Every such force is conservative. Kinetic friction fails the test because it depends on the direction of the velocity, and a force switched on by hand fails it because it depends on time.

In two or three dimensions a force may depend only on position and still do positive work around a loop. The line-integral test is the definition, not the mere absence of time in the formula. The problems below are one-dimensional; the same definition is used for gravity in [[mechanics/gravitation]].

## Potential energy

Path independence means the work can be stored as a difference of values of a function of position.

::: theorem Potential energy {#thm-potential}
Let $F(x)$ be a force on a particle constrained to the $x$-axis, depending only on position. Fix a reference point $x_0$ and define

$$
U(x) = -\int_{x_0}^{x} F(s)\,\dd s.
$$ {#eq-potential-def}

Then $U$ is a **potential energy** for $F$: it satisfies

$$
F = -\deriv{U}{x},
$$ {#eq-potential-deriv}

and the work done by $F$ from $x_1$ to $x_2$ is

$$
W = -\Delta U = -\big(U(x_2) - U(x_1)\big).
$$ {#eq-w-cons}

Adding a constant to $U$ does not change $F$ or $\Delta U$. The choice of $x_0$ is a choice of that constant.
:::

::: proof
Differentiating [[#eq-potential-def]] by the fundamental theorem of calculus gives $\deriv{U}{x} = -F(x)$, which is [[#eq-potential-deriv]]. The work is then

$$
W = \int_{x_1}^{x_2} F(x)\,\dd x = -\int_{x_1}^{x_2}\deriv{U}{x}\,\dd x = -\big(U(x_2) - U(x_1)\big).
$$

If $U$ is replaced by $U + C$, the derivative is unchanged and so is every difference $U(x_2) - U(x_1)$.
:::

The minus sign is the convention that makes the force point towards lower $U$. Positive work by a conservative force is then a decrease of potential energy, and $K$ rises by the same amount if that force is the only one doing work.

Two potentials cover almost every problem in this course. Both come from [[#eq-potential-deriv]] with a stated choice of the zero.

**Gravity near the Earth.** Over heights much smaller than the Earth's radius the gravitational force on a particle of mass $m$ is constant. Take the $y$-axis upward. Then $F_y = -mg$. The instruction $-{\deriv{U}{y}} = F_y$ becomes

$$
\deriv{U}{y} = mg.
$$

Integrating, $U_g(y) = mgy + C$. The zero is arbitrary; the usual choice is $U_g(0) = 0$, which fixes $C = 0$ and gives

$$
U_g = mgy.
$$ {#eq-ug}

The exact potential $-GMm/r$ is left to [[mechanics/gravitation]]. Here $y$ in [[#eq-ug]] is measured upward from a stated zero, and the same zero is used at both ends of the problem.

**A spring obeying Hooke's law.** Let $x$ be the displacement of the free end from the unstretched position, positive when the spring is stretched. The force exerted by the spring on the mass is $F = -kx$ with $k > 0$. Then $-\deriv{U}{x} = -kx$, so $\deriv{U}{x} = kx$. Integrating,

$$
U_s(x) = \tfrac12 k x^2 + C.
$$

The choice $U_s(0) = 0$ matches the unstretched spring to zero stored energy and removes $C$:

$$
U_s = \tfrac12 k x^2.
$$ {#eq-us}

Compression is a negative $x$ if $x$ is signed, but $x^2$ does not care: a compression of $0.150\,\mathrm{m}$ stores the same energy as an extension of $0.150\,\mathrm{m}$. The force $-kx$ is conservative because it is a function of $x$ alone. The potential [[#eq-us]] is what the integral in [[#eq-potential-def]] produces.

::: widget springenergy
k: 200
m: 0.4
A: 0.15
caption: The figure shows kinetic energy, potential energy and their sum for a mass on a spring. Pause it and read the two energies at several positions; the sum should not change.
:::

The figure uses the spring of the first worked example below: $k = 200\,\mathrm{N/m}$, $m = 0.400\,\mathrm{kg}$, amplitude $A = 0.15\,\mathrm{m}$. The sum of the two energies is constant. Its value is the total mechanical energy fixed by the amplitude,

$$
E = \tfrac12 k A^2 = \tfrac12\times 200\times (0.15)^2 = 100\times 0.0225 = 2.25\,\mathrm{J}.
$$

At $x = \pm A$ one has $K = 0$ and $U = 2.25\,\mathrm{J}$; at $x = 0$ the values are reversed. The two bars add to $2.25\,\mathrm{J}$ at every position, which is [[#thm-mechanical]] for a single conservative force.

## The mechanical-energy ledger

::: definition Mechanical energy {#def-mechanical}
If $K$ is the kinetic energy of a particle and $U$ is the total potential energy of the conservative forces acting on it, the **mechanical energy** is

$$
E = K + U.
$$ {#eq-emech}
:::

::: theorem Mechanical energy and non-conservative work {#thm-mechanical}
Let the mass be constant, so that [[#thm-work-energy]] applies. Split the net work into the work $W_{\mathrm{cons}}$ of the conservative forces and the work $W_{\mathrm{nc}}$ of everything else. Let $U$ be a potential energy for all of the conservative forces that do work. Then

$$
W_{\mathrm{nc}} = \Delta K + \Delta U = \Delta E.
$$ {#eq-wnc}

In particular, if every force that does work is conservative, then $W_{\mathrm{nc}} = 0$ and $E$ is constant.
:::

::: proof
The work–energy theorem gives $W_{\mathrm{net}} = \Delta K$. Split the net work as $W_{\mathrm{net}} = W_{\mathrm{cons}} + W_{\mathrm{nc}}$. For the conservative part, [[#eq-w-cons]] gives $W_{\mathrm{cons}} = -\Delta U$, where $\Delta U$ is the sum of the changes in each potential (gravity, springs, and any other conservative contribution you have defined). Therefore

$$
\Delta K = -\Delta U + W_{\mathrm{nc}},
$$

which rearranges to [[#eq-wnc]]. If $W_{\mathrm{nc}} = 0$, then $\Delta K + \Delta U = 0$, so $K + U$ has the same value at the two ends of the interval.
:::

Forces that do no work need not appear in $U$ and need not appear in $W_{\mathrm{nc}}$. They are already absent from $W_{\mathrm{net}}$. The normal force from a surface that does not move is the important case: the surface constrains the particle, the displacement lies in the surface, and the normal is perpendicular to that displacement, so its work is zero. Static friction, while it prevents slipping and the contact point does not move along the force, likewise does no work. Kinetic friction does negative work. It belongs in $W_{\mathrm{nc}}$, and it has no potential energy.

The ledger is used in a fixed order.

1. Name the object, the initial event, and the final event.
2. Draw the forces and mark which of them do work on that interval.
3. Choose a zero of potential energy and compute $U$ at each end. For gravity, state which height is $y = 0$. For a spring, $x = 0$ is the unstretched position, and the zero of $U_s$ is already fixed by [[#eq-us]] once that origin is chosen.
4. Compute $W_{\mathrm{nc}}$ along the actual path. On a rough surface this is $-\mu_k Ns$ if the kinetic-friction force has constant magnitude and opposes the motion over a distance $s$.
5. Write $K_i + U_i + W_{\mathrm{nc}} = K_f + U_f$ and solve. Keep extra digits until the last line, then round.

Equation [[#eq-wnc]] says that $K + U$ has changed by $W_{\mathrm{nc}}$. Heating, sound and permanent deformation are outside this ledger. In this course the statement stops at $W_{\mathrm{nc}} = \Delta E$.

::: warning What not to put in the ledger
The normal force from a surface that does not move does no work when the object's displacement is perpendicular to that force. Do not include it in $W_{\mathrm{nc}}$, and do not invent a potential for it. Kinetic friction does negative work, so mechanical energy is not conserved while the object is sliding. Do not add a term called "heat" to $E$ unless heat has been defined and given a unit in the same ledger. In this course the non-conservative contribution is the work $W_{\mathrm{nc}}$, and the statement is $W_{\mathrm{nc}} = \Delta E_{\mathrm{mech}}$. A second, related, mistake is to count friction twice: once as $W_{\mathrm{nc}}$ and again as a drop in some frictional potential. Friction has no potential. It appears once.
:::

::: example A released spring {#ex-spring}
A spring with constant $k = 200\,\mathrm{N/m}$ is compressed by $0.150\,\mathrm{m}$ against a block of mass $m = 0.400\,\mathrm{kg}$. The block is released from rest on a smooth horizontal table. Find the speed of the block as it passes the unstretched position of the spring.
::: solution
The table is smooth, so friction does no work. Gravity and the normal force are vertical, the displacement is horizontal, and those two forces do no work either. The spring force is conservative, with potential [[#eq-us]]. Mechanical energy is therefore constant.

Take $x = 0$ at the unstretched position. The compression $0.150\,\mathrm{m}$ means the initial displacement satisfies $x_i^2 = (0.150)^2$. The initial speed is zero.

$$
\begin{aligned}
U_i &= \tfrac12 k x_i^2 = \tfrac12\times 200\times (0.150)^2 \\
&= 100\times 0.0225 = 2.25\,\mathrm{J}, \\
K_i &= 0.
\end{aligned}
$$

At the unstretched position, $U_f = 0$. Conservation gives $K_f = 2.25\,\mathrm{J}$:

$$
\tfrac12 m v^2 = 2.25, \qquad v^2 = \frac{2\times 2.25}{0.400} = \frac{4.50}{0.400} = 11.25.
$$

Hence

$$
v = \sqrt{11.25} = 3.354\,\mathrm{m/s},
$$

which is $3.35\,\mathrm{m/s}$ to three significant figures. The sign of the velocity depends on which side the spring was compressed from; the speed is $3.35\,\mathrm{m/s}$ either way. The same $2.25\,\mathrm{J}$ is the constant sum drawn by the figure above, since $\tfrac12 k A^2$ with $A = 0.15\,\mathrm{m}$ is the energy just computed.
:::
:::

::: example Kinetic friction on a horizontal surface {#ex-friction-flat}
A block of mass $m = 5.00\,\mathrm{kg}$ slides on a horizontal surface with coefficient of kinetic friction $\mu_k = 0.300$. It passes a point with speed $4.00\,\mathrm{m/s}$. Find the work done by friction over the next $2.00\,\mathrm{m}$, and the speed at the end of that $2.00\,\mathrm{m}$.
::: solution
The normal force balances the weight, so $N = mg$. The kinetic-friction force has magnitude

$$
f_k = \mu_k mg = 0.300\times 5.00\times 9.80.
$$

First $0.300\times 5.00 = 1.50$, then $1.50\times 9.80 = 14.7\,\mathrm{N}$. Friction opposes the displacement, so its work over $s = 2.00\,\mathrm{m}$ is

$$
W_f = -14.7\times 2.00 = -29.4\,\mathrm{J}.
$$

Gravity and the normal force do no work, and there is no spring. The only potential that could change is gravitational, and the height does not change, so $\Delta U = 0$. The ledger [[#eq-wnc]] reduces to $W_f = \Delta K$.

$$
\begin{aligned}
K_i &= \tfrac12\times 5.00\times (4.00)^2 = 2.50\times 16.0 = 40.0\,\mathrm{J}, \\
K_f &= K_i + W_f = 40.0 - 29.4 = 10.6\,\mathrm{J}.
\end{aligned}
$$

Solve $\tfrac12 m v_f^2 = 10.6$:

$$
v_f^2 = \frac{2\times 10.6}{5.00} = \frac{21.2}{5.00} = 4.24, \qquad v_f = \sqrt{4.24} = 2.059\,\mathrm{m/s}.
$$

To three significant figures, $v_f = 2.06\,\mathrm{m/s}$. The final kinetic energy is still positive, so the block is still moving after $2.00\,\mathrm{m}$.

The constant-acceleration formula gives the same square. Here $a = -\mu_k g = -0.300\times 9.80 = -2.94\,\mathrm{m/s^2}$, and

$$
v_f^2 = (4.00)^2 + 2(-2.94)(2.00) = 16.0 - 11.76 = 4.24.
$$

The agreement is expected: [[#thm-work-energy]] was obtained by integrating the second law, and $v^2 = u^2 + 2as$ is that integration for constant $a$.
:::
:::

::: example A smooth incline of any angle {#ex-smooth-incline}
A block slides from rest down a smooth incline of height $1.20\,\mathrm{m}$. The angle of the incline may be anything between $0$ and $90^\circ$, and the mass is arbitrary. Find the speed at the bottom.
::: solution
Choose $y = 0$ at the bottom and $y$ upward, so the initial potential energy is $U_i = mgh$ with $h = 1.20\,\mathrm{m}$, and $U_f = 0$. The initial kinetic energy is zero. The incline is smooth, so friction does no work. The normal force is perpendicular to the displacement along the slope, so it does no work. Gravity is conservative. [[#thm-mechanical]] says $E$ is constant:

$$
0 + mgh = \tfrac12 m v^2 + 0.
$$

The mass cancels (it is not zero), and

$$
v = \sqrt{2gh} = \sqrt{2\times 9.80\times 1.20} = \sqrt{23.52} = 4.8497\,\mathrm{m/s}.
$$

To three significant figures, $v = 4.85\,\mathrm{m/s}$. The angle never entered: a steeper slope is shorter, and the drop in potential depends only on the height. A pendulum bob released from rest at the same height reaches the same speed at the bottom, because the tension is perpendicular to the velocity and does no work.

The acceleration does depend on the angle. The free-body diagram in [[mechanics/newton-laws]] gives $a = g\sin\theta$ down the slope. The distance along the slope is $s = h/\sin\theta$, so

$$
v^2 = 2as = 2(g\sin\theta)\frac{h}{\sin\theta} = 2gh,
$$

provided $\sin\theta \neq 0$. The angle cancels only after $a$ and $s$ are multiplied. Energy does that cancellation before either quantity is computed, which is why a question about the time of descent still needs the acceleration.
:::
:::

::: quiz
A block slides down a rough straight incline, starting from rest. Which statement matches [[#thm-mechanical]]?
- [ ] $K + U$ is constant, because gravity is conservative
- [ ] The normal force does negative work and removes the potential energy
- [x] The work done by kinetic friction equals the change in $K + U$
- [ ] Kinetic energy is constant because the forces along the slope balance
::: solution
Gravity is conservative and is already inside $U = mgy$. The normal force does no work on the straight incline. Kinetic friction does negative work and is not conservative, so $W_{\mathrm{nc}} = W_f = \Delta K + \Delta U$, which is not zero. The block starts from rest and gains speed, so $K$ is not constant, and the forces along the slope do not balance.
:::
:::

::: example A rough incline {#ex-rough-incline}
A block of mass $m = 2.00\,\mathrm{kg}$ starts from rest at the top of a rough incline of height $1.50\,\mathrm{m}$. The distance along the slope is $3.00\,\mathrm{m}$, and $\mu_k = 0.200$. Find the speed at the bottom, and set out the energy ledger.
::: solution
The height and the slope length fix the angle with the horizontal. The vertical rise is opposite that angle, so

$$
\sin\theta = \frac{1.50}{3.00} = 0.500, \qquad \theta = 30^\circ.
$$

Then $\cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - 0.250} = \sqrt{0.750} = \sqrt{3}/2$. Equivalently, a $30^\circ$ angle has adjacent side over hypotenuse equal to $\sqrt{3}/2$.

The acceleration perpendicular to the slope is zero, and friction lies along the slope, so the normal force has magnitude $N = mg\cos\theta$. Kinetic friction has magnitude $\mu_k N$ and points up the slope, opposite the downward displacement. Its work is

$$
\begin{aligned}
W_f &= -\mu_k mg\cos\theta\cdot s \\
&= -0.200\times 2.00\times 9.80\times\frac{\sqrt{3}}{2}\times 3.00.
\end{aligned}
$$

Compute inward. First $0.200\times 2.00\times 9.80 = 3.920$. Then

$$
3.920\times\frac{\sqrt{3}}{2} = 3.920\times 0.8660254 = 3.39482,
$$

and $3.39482\times 3.00 = 10.184$. Thus $W_f = -10.184\,\mathrm{J}$. The normal force does no work. Gravity is accounted for by the potential, not by a second work term.

Take $U = 0$ at the bottom. The block starts from rest.

$$
U_i = mgh = 2.00\times 9.80\times 1.50 = 29.40\,\mathrm{J}, \qquad K_i = 0, \qquad U_f = 0.
$$

The ledger $K_i + U_i + W_f = K_f + U_f$ becomes

$$
K_f = 29.40 + (-10.184) = 19.216\,\mathrm{J}.
$$

Then $\tfrac12 m v^2 = 19.216$, so $v^2 = 19.216$ and

$$
v = \sqrt{19.216} = 4.3836\,\mathrm{m/s}.
$$

To three significant figures, $v = 4.38\,\mathrm{m/s}$. One further digit, $4.384\,\mathrm{m/s}$, is what the square root gives before that rounding.

| Contribution | Value |
|---|---:|
| Initial kinetic energy | $0$ |
| Initial potential energy $mgy$ | $29.40\,\mathrm{J}$ |
| Work by kinetic friction | $-10.184\,\mathrm{J}$ |
| Final potential energy | $0$ |
| Final kinetic energy | $19.216\,\mathrm{J}$ |

The initial mechanical energy plus $W_f$ is the final kinetic energy. The $10.184\,\mathrm{J}$ removed by friction is $W_{\mathrm{nc}}$, not an extra term in $E$. Setting $W_f = 0$ recovers the smooth incline; setting $\Delta U = 0$ recovers the horizontal slide.
:::
:::

::: history From vis viva to the joule
In 1678 Robert Hooke stated the linear law for a spring: the restoring force is proportional to the extension from the unstretched length. The potential [[#eq-us]] is the integral of that law, not a separate experimental claim. Gottfried Wilhelm Leibniz, at the end of the seventeenth century, argued that the quantity worth tracking in impact and fall was the *vis viva*, $mv^2$, without the factor $\tfrac12$. The modern kinetic energy $\tfrac12 mv^2$ became standard during the nineteenth century, because that is the quantity whose change equals the work. Gaspard-Gustave Coriolis, in *Du calcul de l'effet des machines* (1829), defined the work of a force along a path and related it to the change in vis viva. The joule, the newton and the watt are later names for units already fixed by those definitions.
:::

## Where this leads

The work–energy theorem is Newton's second law integrated along the path. Questions about time, or about a force that does no work but changes the direction, go back to [[mechanics/newton-laws]]. Questions about speed, when the work is known, stay here.

Rotation adds $\tfrac12 I\omega^2$ and replaces force times distance by torque times angle; rolling uses both, in [[mechanics/rotation]]. Orbits replace $mgy$ by $-GMm/r$ in [[mechanics/gravitation]]. The spring energy $\tfrac12 kA^2$ is the total energy of simple harmonic motion in [[oscillations]]. Momentum, in [[mechanics/momentum]], is the integral of Newton's second law over time rather than distance. A collision often needs both ledgers: momentum because the contact force is unknown, and energy because an elastic assumption, or a coefficient of restitution, replaces that unknown.

::: summary
- Work done by a constant force is $W = \mathbf{F}\cdot\Delta\mathbf{r} = Fs\cos\theta$, in joules. For a variable force it is the line integral $\int_C \mathbf{F}\cdot\dd \mathbf{r}$. Work is a scalar, and it is always the work done by a named force.
- For a particle of constant mass the work of the net force equals the change in kinetic energy, $W_{\mathrm{net}} = \Delta K$ with $K = \tfrac12 mv^2$. The proof is the substitution $a\,\dd x = v\,\dd v$.
- The instantaneous power of a force is $P = \deriv{W}{t} = \mathbf{F}\cdot\mathbf{v}$.
- A force is conservative when its work between two points is path-independent, equivalently when its work around every closed loop vanishes. Then $F = -\deriv{U}{x}$ and $W_{\mathrm{cons}} = -\Delta U$.
- Near the Earth, $U_g = mgy$ with $y$ upward and an arbitrary zero. For a Hookean spring, $U_s = \tfrac12 kx^2$ with $x$ measured from the unstretched position and $U_s(0) = 0$.
- Mechanical energy is $E = K + U$. It is constant when every force that does work is conservative. Otherwise $W_{\mathrm{nc}} = \Delta E$.
- A stationary normal force perpendicular to the displacement does no work. Kinetic friction does negative work and is not given a potential. The ledger does not contain a heat term.
- On a smooth descent through height $h$ the speed at the bottom is $\sqrt{2gh}$, independent of mass and of the slope angle. Rough surfaces break that independence through $W_f$.
:::

## Exercises

::: exercise Work of a tilted force {#exr-tilted level=1 check="24"}
A constant force of magnitude $16.0\,\mathrm{N}$ acts on a crate while the crate moves $3.00\,\mathrm{m}$ in a straight line. The force makes an angle of $60^\circ$ with the displacement. Find the work done by this force.
::: solution
Use [[#eq-work-const]]. Here $\cos 60^\circ = 1/2$, so

$$
W = Fs\cos\theta = 16.0\times 3.00\times\tfrac12 = 48.0\times\tfrac12 = 24.0\,\mathrm{J}.
$$

The parallel component is $8.00\,\mathrm{N}$, and $8.00\times 3.00 = 24.0\,\mathrm{J}$ again. The perpendicular component does no work.
:::
:::

::: exercise Kinetic energy of a thrown ball {#exr-kinetic level=1 check="14.4"}
A ball of mass $0.800\,\mathrm{kg}$ has speed $6.00\,\mathrm{m/s}$. Find its kinetic energy.
::: solution
By [[#def-kinetic]],

$$
K = \tfrac12 mv^2 = \tfrac12\times 0.800\times (6.00)^2 = 0.400\times 36.0 = 14.4\,\mathrm{J}.
$$

The direction of the velocity does not enter $K$.
:::
:::

::: exercise Lifting a book {#exr-lift level=1 check="49"}
A book of mass $4.00\,\mathrm{kg}$ is raised a vertical distance $1.25\,\mathrm{m}$ at constant speed. Find the increase in its gravitational potential energy. Take $y$ upward.
::: solution
From [[#eq-ug]], with the same arbitrary zero at both ends,

$$
\Delta U_g = mg\Delta y = 4.00\times 9.80\times 1.25.
$$

First $9.80\times 1.25 = 12.25$, then $4.00\times 12.25 = 49.0\,\mathrm{J}$. The increase is $49.0\,\mathrm{J}$. Constant speed is not required for $\Delta U$. It does imply that the lifting force does $+49.0\,\mathrm{J}$, since $\Delta K = 0$ and gravity does $-49.0\,\mathrm{J}$.
:::
:::

::: exercise Work of a variable force {#exr-variable level=2 check="32/3"}
A particle moves along the $x$-axis from $x = 0$ to $x = 2.00\,\mathrm{m}$ under the force $F(x) = 4x^2$, where $x$ is in metres and $F$ is in newtons. Find the work done by this force.
::: solution
The force is not constant, so use [[#eq-work-1d]] rather than $Fs\cos\theta$:

$$
W = \int_0^{2} 4x^2\,\dd x = \left[\frac{4}{3}x^3\right]_0^{2} = \frac{4}{3}\times 8 = \frac{32}{3}\,\mathrm{J}.
$$

The value $\tfrac{32}{3}\,\mathrm{J}$ is exact for the force law as written. It equals $\Delta K$ only if this $F$ is the net force.
:::
:::

::: exercise Leaving a spring {#exr-spring-launch level=2 check="2"}
A block of mass $0.500\,\mathrm{kg}$ is held at rest against a spring of constant $k = 200\,\mathrm{N/m}$, compressing it by $0.100\,\mathrm{m}$, on a smooth horizontal table. The block is released. Find its speed at the instant the spring reaches its unstretched length.
::: solution
The surface is smooth and horizontal, so only the spring does work, and $E$ is constant. The initial compression stores

$$
U_i = \tfrac12 k x^2 = \tfrac12\times 200\times (0.100)^2 = 100\times 0.0100 = 1.00\,\mathrm{J},
$$

and $K_i = 0$. At the unstretched position $U_f = 0$, so $K_f = 1.00\,\mathrm{J}$:

$$
\tfrac12\times 0.500\times v^2 = 1.00, \qquad v^2 = \frac{2.00}{0.500} = 4.00, \qquad v = 2.00\,\mathrm{m/s}.
$$

The speed is $2.00\,\mathrm{m/s}$, by the same balance as [[#ex-spring]].
:::
:::

::: exercise Distance to stop {#exr-stop level=2 check="10"}
A block of mass $2.50\,\mathrm{kg}$ slides on a horizontal surface with $\mu_k = 0.250$. Its initial speed is $7.00\,\mathrm{m/s}$. How far does it slide before stopping?
::: solution
The friction force has magnitude $\mu_k mg$ and does work $W_f = -\mu_k mgs$ over a distance $s$. The surface is horizontal, so $\Delta U = 0$, and $W_f = \Delta K$. Stopping means $K_f = 0$, so

$$
-\mu_k m g s = 0 - \tfrac12 m v_i^2.
$$

The mass cancels. Then

$$
s = \frac{v_i^2}{2\mu_k g} = \frac{(7.00)^2}{2\times 0.250\times 9.80} = \frac{49.0}{4.90} = 10.0\,\mathrm{m}.
$$

The block slides $10.0\,\mathrm{m}$. As a check, $f_k = 0.250\times 2.50\times 9.80 = 6.125\,\mathrm{N}$ and $K_i = \tfrac12\times 2.50\times 49.0 = 61.25\,\mathrm{J}$, and $61.25/6.125 = 10.0\,\mathrm{m}$.
:::
:::

::: exercise Smooth slide, then a rough patch {#exr-patch level=3 check="5"}
A block starts from rest and slides down a smooth slope through a vertical height $2.00\,\mathrm{m}$, then onto a long horizontal rough patch with $\mu_k = 0.400$. How far along the patch does the block travel before it stops? The mass is not given.
::: hint
Use conservation of mechanical energy on the smooth slope, where the normal force does no work. On the patch the height is constant, so only friction changes the mechanical energy. You should find that the mass and $g$ both cancel.
:::
::: solution
Take $U = 0$ on the horizontal patch. On the smooth slope, friction is absent and the normal force does no work, so

$$
mgh = \tfrac12 mv^2, \qquad v^2 = 2gh = 2\times 9.80\times 2.00 = 39.2\,\mathrm{m^2/s^2}.
$$

This is the square of the speed at the bottom, and it is the initial value for the rough patch. On the patch $\Delta U = 0$ and $W_f = -\mu_k m g s$, and the block stops, so $K_f = 0$. The ledger gives

$$
-\mu_k m g s = 0 - \tfrac12 m v^2 = -mgh.
$$

Cancel $mg$ (neither factor is zero):

$$
s = \frac{h}{\mu_k} = \frac{2.00}{0.400} = 5.00\,\mathrm{m}.
$$

The distance is $5.00\,\mathrm{m}$. The mass, $g$ and the slope angle all cancel, which is the smooth-incline result of [[#ex-smooth-incline]] fed into a horizontal friction ledger.
:::
:::

::: exercise Differentiating the mechanical energy {#exr-proof level=3}
A particle of constant mass $m$ moves on the $x$-axis under a net force $F$ that depends only on position. Suppose $F = -\deriv{U}{x}$ for a differentiable function $U$. Prove that the mechanical energy $E = \tfrac12 mv^2 + U(x)$ is constant along the motion. State the hypotheses where you use them.
::: hint
Differentiate $E$ with respect to $t$, using the chain rule on $U(x(t))$. Replace $m\deriv{v}{t}$ by $F$, then replace $F$ by $-\deriv{U}{x}$.
:::
::: solution
The hypotheses are: the mass is constant, so $F = m a$ applies with that $m$; the motion is along the $x$-axis; and the net force is the derivative of a single function $U$, so every force that does work has already been included in $U$.

Let $v = \deriv{x}{t}$. Differentiate $E$ along the trajectory:

$$
\begin{aligned}
\deriv{E}{t}
&= \deriv{}{t}\left(\tfrac12 m v^2\right) + \deriv{}{t}U(x) \\
&= m v\deriv{v}{t} + \deriv{U}{x}\deriv{x}{t}.
\end{aligned}
$$

Constant mass was used to keep $m$ outside the derivative. Newton's second law replaces $m\deriv{v}{t}$ by $F$, and $\deriv{x}{t} = v$, so

$$
\deriv{E}{t} = F v + \deriv{U}{x}\, v = \left(F + \deriv{U}{x}\right) v.
$$

The potential relation $F = -\deriv{U}{x}$ makes the bracket zero. Hence $\deriv{E}{t} = 0$ at every instant, and $E$ is constant on the interval of the motion.

This is the differential form of the conservation half of [[#thm-mechanical]]. A non-conservative force would leave its power $F_{\mathrm{nc}} v$ on the right-hand side.
:::
:::

::: exercise Speed at the bottom of a rough incline {#exr-rough-numbers level=3}
A block of mass $1.20\,\mathrm{kg}$ starts from rest at the top of a straight rough incline. The vertical height is $0.800\,\mathrm{m}$, the distance along the slope is $2.00\,\mathrm{m}$, and $\mu_k = 0.100$. Find the speed at the bottom.
::: hint
Find $\sin\theta$ from the opposite side and the hypotenuse, then $\cos\theta = \sqrt{1 - \sin^2\theta}$. The normal force is $mg\cos\theta$, not $mg$.
:::
::: solution
The slope length is the hypotenuse of the right triangle, so

$$
\sin\theta = \frac{0.800}{2.00} = 0.400, \qquad \cos\theta = \sqrt{1 - 0.400^2} = \sqrt{0.840} = 0.916515.
$$

Friction has magnitude $\mu_k mg\cos\theta$ and opposes the downhill displacement, so

$$
\begin{aligned}
W_f &= -\mu_k mg\cos\theta\cdot s \\
&= -0.100\times 1.20\times 9.80\times 0.916515\times 2.00.
\end{aligned}
$$

First $0.100\times 1.20\times 9.80 = 1.176$. Then $1.176\times 0.916515 = 1.07782$, and $1.07782\times 2.00 = 2.15564$. Thus $W_f = -2.156\,\mathrm{J}$ to four figures (the unrounded product is $-2.1556\,\mathrm{J}$).

Take $U = 0$ at the bottom. Then

$$
U_i = mgh = 1.20\times 9.80\times 0.800 = 9.408\,\mathrm{J}, \qquad K_i = 0.
$$

The ledger gives

$$
K_f = 9.408 - 2.15564 = 7.25236\,\mathrm{J}.
$$

Hence

$$
v = \sqrt{\frac{2K_f}{m}} = \sqrt{\frac{2\times 7.25236}{1.20}} = \sqrt{12.0873} = 3.4767\,\mathrm{m/s}.
$$

To three significant figures, $v = 3.48\,\mathrm{m/s}$. The normal force did no work and was used only to obtain the magnitude of the friction. Using $\mu_k mg$ instead of $\mu_k mg\cos\theta$ would overstate the friction, because $0.100$ is not a large coefficient but $\cos\theta$ is still noticeably below $1$.
:::
:::
