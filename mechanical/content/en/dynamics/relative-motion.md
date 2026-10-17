Almost every real measurement of motion is made from something that is itself moving. The pilot's airspeed is measured relative to the air, the driver's speed is relative to the road, the robot's tool speed is relative to its wrist, the conveyor's product speed is relative to the belt, and the acceleration you feel in a car is the car's relative to the ground. Newton's second law, however, holds only in a non-accelerating frame — so the practical problem of dynamics is usually to relate measurements made in one frame to the equation written in another.

For **translating** frames the relation is simple addition, and this lesson is about doing that addition carefully and about the closely related problem of **constrained** or dependent motion, where several bodies are tied together by inextensible cables and one known velocity determines all the others. Both are bookkeeping rather than physics, and both are places where confident, unwritten reasoning produces wrong answers.

::: warning Relative velocity is a vector difference, not a subtraction of magnitudes
If $\\mathbf{v}_{A/C}$ and $\\mathbf{v}_{B/C}$ are two velocities measured in the same frame, the velocity of $A$ relative to $B$ is
$$
\\mathbf{v}_{A / B} = \\mathbf{v}_{A / C} - \\mathbf{v}_{B / C} .
$$
Two cars each at $60\ \\mathrm{km / h}$ have a relative speed of $120\ \\mathrm{km / h}$ head-on, $0$ if they run in parallel, and $85\ \\mathrm{km / h}$ at a $60^{\\circ}$ intersection. The subtraction must be done component by component, and the answer must be checked for a limiting case — usually "what if the two velocities are equal", which must give zero.
:::

## Translating frames

::: definition Relative motion with translating axes {#def-relative}
Let $x y$ be a fixed frame and $x^{\\prime} y^{\\prime}$ a frame in **pure translation** with origin at $B$. Then
$$
\\mathbf{r}_{A / B} = \\mathbf{r}_A - \\mathbf{r}_B, \\qquad
\\mathbf{v}_{A / B} = \\mathbf{v}_A - \\mathbf{v}_B, \\qquad
\\mathbf{a}_{A / B} = \\mathbf{a}_A - \\mathbf{a}_B .
$$
The relative acceleration enters Newton's law as $\\sum \\mathbf{F} = m \\left( \\mathbf{a}_B + \\mathbf{a}_{A / B} \\right)$, so an observer riding with $B$ must introduce a fictitious force $- m \\mathbf{a}_B$ to make $F = ma$ work. Because the frame only translates, the axes never rotate and no Coriolis or centripetal terms appear; that simplification is what makes this case tractable and also what makes it inadequate for a rotating frame, treated in [[dynamics/three-dimensional-dynamics]].
:::

::: example Closest approach {#ex-closest-approach}
Car $A$ travels east at $60\ \\mathrm{km / h}$ and is $500\ \\mathrm{m}$ west of an intersection; car $B$ travels north at $80\ \\mathrm{km / h}$ and is $400\ \\mathrm{m}$ south of it. Find the velocity of $A$ relative to $B$, the time to closest approach and the distance of closest approach.
::: solution
Take east as $x$ and north as $y$, with $v_A = 16.67\ \\mathrm{m / s}$ and $v_B = 22.22\ \\mathrm{m / s}$.
$$
\\mathbf{r}_{A / B} = \\left( - 500 \\mathbf{i} + 0 \\right) - \\left( 0 - 400 \\mathbf{j} \\right)
= - 500 \\mathbf{i} + 400 \\mathbf{j}\ \\mathrm{m},
$$
$$
\\mathbf{v}_{A / B} = 16.67 \\mathbf{i} - 22.22 \\mathbf{j}\ \\mathrm{m / s}, \\qquad
\\left| \\mathbf{v}_{A / B} \\right| = 27.8\ \\mathrm{m / s}.
$$
**Time to closest approach.** Closest approach occurs when $\\mathbf{r} \\cdot \\mathbf{v} = 0$:
$$
t = - \\frac{\\mathbf{r} \\cdot \\mathbf{v}}{v^{2}}
= - \\frac{\\left( - 500 \\right) \\left( 16.67 \\right) + 400 \\left( - 22.22 \\right)}{27.78^{2}}
= \\frac{8335 + 8888}{771.6} = 22.3\ \\mathrm{s}.
$$
**Distance of closest approach.**
$$
d = \\frac{\\left| r_x v_y - r_y v_x \\right|}{\\left| \\mathbf{v} \\right|}
= \\frac{\\left| \\left( - 500 \\right) \\left( - 22.22 \\right) - 400 \\times 16.67 \\right|}{27.78}
= \\frac{11\,110 - 6668}{27.78} = 160\ \\mathrm{m}.
$$
*Check.* At $t = 22.3\ \\mathrm{s}$, $\\mathbf{r}_{A / B} = \\left( - 500 + 16.67 \\times 22.3, \; 400 - 22.22 \\times 22.3 \\right) = \\left( - 128, \; - 96.5 \\right)$, of magnitude $160\ \\mathrm{m}$, and $\\mathbf{r} \\cdot \\mathbf{v} = - 128 \\times 16.67 + \\left( - 96.5 \\right) \\times \\left( - 22.22 \\right) = - 2134 + 2144 \\approx 0$. $\checkmark$

*Sanity.* The relative-motion method turns a two-body problem into a one-body problem: $B$ is treated as stationary and $A$ moves in a straight line at $27.8\ \\mathrm{m / s}$, and the closest approach is simply the perpendicular distance from $B$ to that line. This is exactly the calculation behind a collision-avoidance alarm, a ship-plotting radar and the "miss distance" of two spacecraft, and the reason it is done in the relative frame is that the answer — a single number, the miss distance — falls out of a cross product rather than out of two quadratics.
:::
:::

::: example Rain in a moving vehicle {#ex-rain}
Rain falls vertically at $10\ \\mathrm{m / s}$ in still air. A car travels at $60\ \\mathrm{km / h}$. At what angle does the rain appear to fall, and at what inclination to a horizontal should a windscreen be set so that the drops run along it without striking it?
::: solution
$$
\\mathbf{v}_{\\text{rain} / \\text{car}} = \\mathbf{v}_{\\text{rain}} - \\mathbf{v}_{\\text{car}}
= - 10 \\mathbf{j} - 16.67 \\mathbf{i}\ \\mathrm{m / s},
$$
$$
\\left| \\mathbf{v} \\right| = \\sqrt{10^{2} + 16.67^{2}} = 19.4\ \\mathrm{m / s}, \\qquad
\\alpha = \\tan^{-1} \\frac{10}{16.67} = 31.0^{\\circ} .
$$
The rain appears to come down at $31.0^{\\circ}$ from the horizontal, sweeping forward. A surface **parallel** to that direction lets the drops run along it, so the windscreen should be inclined at $31^{\\circ}$ to the horizontal, or $59^{\\circ}$ to the vertical.

*Sanity.* Real windscreens are set at $30$ to $35^{\\circ}$ to the **vertical**, considerably steeper than the $59^{\\circ}$ the rain argument asks for, which is why rain is not cleared by a windscreen's slope at any speed and why wipers exist. The same relative-velocity argument explains three familiar things: why side windows on a fast car throw rain backwards and upwards rather than down, why a lorry's spray is drawn into a following car's windscreen (the low-pressure wake behind the lorry pulls it), and why the front of a train is shaped to throw rain and insects sideways rather than to shed them.
:::
:::

::: widget plot
f: sqrt(100+(x/3.6)^2)
x: 0, 120
y: 0, 40
labels: \text{apparent rain speed (m/s)}
caption: Apparent speed of vertically falling $10\ \\mathrm{m / s}$ rain as seen from a vehicle travelling at $x\ \\mathrm{km / h}$. The curve is $\\sqrt{100 + v^{2}}$, so at $60\ \\mathrm{km / h}$ the drops arrive at $19.4\ \\mathrm{m / s}$ — nearly twice their true speed — and at $120\ \\mathrm{km / h}$ at $36.5\ \\mathrm{m / s}$. The kinetic energy per unit mass, which is what a windscreen wiper blade must absorb and what an insect's impact delivers to a paintwork, grows as $100 + v^{2}$ and is dominated by the vehicle's own speed above about $60\ \\mathrm{km / h}$.
:::

## Constrained and dependent motion

::: theorem The velocity ratio and the mechanical advantage {#thm-velocity-ratio}
For an ideal machine — massless inextensible cables, massless frictionless pulleys, rigid links — the ratio of the velocity of the effort to the velocity of the load equals the ratio of the load force to the effort force:
$$
\frac{v_{\text{effort}}}{v_{\text{load}}} = \frac{F_{\text{load}}}{F_{\text{effort}}} = n .
$$
The number $n$, the **velocity ratio**, is fixed by the geometry of the reeving alone and is unaffected by friction, by the mass of the load or by the acceleration of the system. The **mechanical advantage** $F_{\text{load}} / F_{\text{effort}}$ equals $n$ only in the ideal case; with friction it is $n \eta$, where $\eta$ is the efficiency.
:::

::: proof
Give the system a virtual displacement $\delta s_{\text{load}}$. Because every cable has constant length, the kinematic constraint differentiates to a linear relation between the velocities, and hence between virtual displacements:
$$
\delta s_{\text{effort}} = n \, \delta s_{\text{load}} .
$$
For an ideal machine in equilibrium the total virtual work vanishes for every admissible displacement,
$$
F_{\text{effort}} \, \delta s_{\text{effort}} - F_{\text{load}} \, \delta s_{\text{load}} = 0 ,
$$
since no energy is stored or dissipated. Substituting the constraint,
$$
F_{\text{effort}} \, n \, \delta s_{\text{load}} = F_{\text{load}} \, \delta s_{\text{load}}
\quad\Longrightarrow\quad
\frac{F_{\text{load}}}{F_{\text{effort}}} = n .
$$
With friction the same argument gives $F_{\text{effort}} \, n \, \delta s_{\text{load}} = F_{\text{load}} \, \delta s_{\text{load}} + \delta W_{\text{friction}}$, so the effort rises and the mechanical advantage falls to $n \eta$.
:::

::: proof Closest approach {#proof-closest-approach}
In the relative frame the particle moves on the straight line $\mathbf{r} (t) = \mathbf{r}_0 + \mathbf{v} t$, and the squared separation from the origin is
$$
D^{2} (t) = r_0^{2} + 2 \left( \mathbf{r}_0 \cdot \mathbf{v} \right) t + v^{2} t^{2} .
$$
This is a parabola in $t$ with its minimum where the derivative vanishes,
$$
t^{*} = - \frac{\mathbf{r}_0 \cdot \mathbf{v}}{v^{2}} ,
$$
and at that instant
$$
d^{2} = D^{2} \left( t^{*} \right)
= r_0^{2} - \frac{\left( \mathbf{r}_0 \cdot \mathbf{v} \right)^{2}}{v^{2}}
= \frac{r_0^{2} v^{2} - \left( \mathbf{r}_0 \cdot \mathbf{v} \right)^{2}}{v^{2}}
= \frac{\left| \mathbf{r}_0 \times \mathbf{v} \right|^{2}}{v^{2}} ,
$$
using Lagrange's identity in the last step. Hence $d = \left| \mathbf{r}_0 \times \mathbf{v} \right| / \left| \mathbf{v} \right|$, the perpendicular distance from the origin to the relative line of sight. Note that $t^{*} < 0$ means the bodies have already passed each other and the separation is increasing.
:::


::: algorithm Dependent motion of connected particles {#alg-dependent}
When several particles are connected by inextensible cables of constant total length:

1. Attach a fixed datum to each cable and measure a coordinate $s_i$ to each connection point, choosing all coordinates positive in the direction each particle is **assumed** to move.
2. Write one **length equation** per cable: the sum of the segments equals the cable's constant length.
3. Differentiate once for velocities and twice for accelerations. Every term appears with the sign it had in the length equation.
4. A pulley to which **no** cable is attached and around which a single cable runs has a constant tension side ratio; a pulley to which a cable is **anchored at one end** and which the same cable passes twice contributes $2 s$ to the length equation, and therefore a factor of $2$ to the velocity relation.

The mechanical advantage and the velocity ratio are the same number, because the cable is inextensible: a system that halves the force doubles the rope you must pull.
:::

::: example Pulley system {#ex-pulley-dependent}
In a block and tackle, the load $B$ hangs from a moving block around which the cable passes twice, the cable being anchored overhead and led to a winch at $A$. If the winch takes in cable at $0.6\ \\mathrm{m / s}$, find the speed of the load. Repeat if the load is raised $3\ \\mathrm{m}$.
::: solution
Measure $s_A$ down from the fixed anchor to the winch end and $s_B$ down from the same datum to the load. The cable length is
$$
s_A + 2 s_B = l ,
$$
because the moving block is supported by two legs of cable. Differentiating,
$$
v_A + 2 v_B = 0 \\quad\\Longrightarrow\\quad v_B = - \\frac{v_A}{2} = - 0.3\ \\mathrm{m / s},
$$
so the load rises at $0.3\ \\mathrm{m / s}$, half the winch speed. Raising it $3\ \\mathrm{m}$ takes $6\ \\mathrm{m}$ of cable and $6 / 0.6 = 10\ \\mathrm{s}$.

*Check.* Differentiating again gives $a_A + 2 a_B = 0$, so the load's acceleration is also half the cable's — and the tension in the single cable is half the load's weight (neglecting friction), confirming that the velocity ratio and the mechanical advantage are the same $2$. $\checkmark$

*Sanity.* The rule that generalises is: **count the cable legs supporting the moving block**. A gun tackle has $2$, a luffing tackle $3$, a two-fold double purchase $4$ and a three-fold $6$. The force is divided by that number and the rope speed multiplied by it, so a $10\ \\mathrm{t}$ lift with a three-fold purchase needs a $1.7\ \\mathrm{t}$ pull but four times the rope length — and the efficiency falls with every additional sheave, typically by $5$ to $8$ per cent each, so a six-fold tackle at $70$ per cent efficiency is worse than a two-fold at $95$ per cent. That trade-off, not the mechanical advantage, is why a real chain block has three sheaves and not eight.
:::
:::

::: example Two balls, one delay {#ex-two-balls}
A ball is thrown vertically up from the ground at $30\ \\mathrm{m / s}$. Two seconds later a second ball is thrown up from the same point at $30\ \\mathrm{m / s}$. When and where do they meet, and does the answer depend on $g$?
::: solution
Take $t$ from the first throw. For $t > 2$,
$$
s_1 = 30 t - \\tfrac{1}{2} g t^{2}, \\qquad
s_2 = 30 \\left( t - 2 \\right) - \\tfrac{1}{2} g \\left( t - 2 \\right)^{2} .
$$
Setting $s_1 = s_2$ and cancelling the $t^{2}$ terms,
$$
0 = - 60 + \\tfrac{1}{2} g \\left[ t^{2} - \\left( t - 2 \\right)^{2} \\right]
= - 60 + \\tfrac{1}{2} g \\left( 4 t - 4 \\right),
$$
$$
t = \\frac{60}{2 g} + 1 = \\frac{30}{g} + 1 = 4.06\ \\mathrm{s},
$$
$$
s = 30 \\times 4.058 - 4.905 \\times 4.058^{2} = 121.7 - 80.8 = 40.9\ \\mathrm{m}.
$$
**Does it depend on $g$?** The meeting **time** does — it is $30 / g + 1$ — but the meeting is at the same height fraction in either case, and on the Moon, where $g = 1.62$, the balls meet at $t = 19.5\ \\mathrm{s}$ and $s = 294\ \\mathrm{m}$.

*Check.* The relative acceleration of the two balls is zero, since both have $- g$. So in the frame of the first ball the second approaches at a constant relative speed of $30\ \\mathrm{m / s}$ from an initial separation of $s_1 (2) = 60 - 19.6 = 40.4\ \\mathrm{m}$, taking $40.4 / 30 = 1.35\ \\mathrm{s}$ — giving $t = 2 + 1.35 = 3.35\ \\mathrm{s}$.

*Wait — the two methods disagree.* They do not, and the discrepancy is the whole point of the example. The relative-velocity method must use the **relative position at $t = 2$**, which is $s_1 (2) - s_2 (2) = 40.4 - 0 = 40.4\ \\mathrm{m}$, and the relative **velocity**, which is $v_1 (2) - v_2 (2) = \\left( 30 - 19.6 \\right) - 30 = - 19.6\ \\mathrm{m / s}$, not $- 30$. The closing time is $40.4 / 19.6 = 2.06\ \\mathrm{s}$, giving $t = 2 + 2.06 = 4.06\ \\mathrm{s}$. $\checkmark$ The algebraic method and the relative method agree exactly; the error was in assuming the second ball's speed relative to the first was $30\ \\mathrm{m / s}$ when the first had already slowed to $10.4\ \\mathrm{m / s}$.
:::
:::

## Applications

::: example River crossing {#ex-river}
A river $100\ \\mathrm{m}$ wide flows at $1.5\ \\mathrm{m / s}$. A boat that does $4\ \\mathrm{m / s}$ in still water must cross. Find (a) the heading that takes it straight across and the time; (b) the heading that minimises the time and the resulting drift.
::: solution
**(a) Straight across.** The boat must head upstream at $\\alpha$ where
$$
\\sin \\alpha = \\frac{1.5}{4} \\quad\\Longrightarrow\\quad \\alpha = 22.0^{\\circ},
$$
giving a ground speed of
$$
v = \\sqrt{4^{2} - 1.5^{2}} = 3.708\ \\mathrm{m / s}, \\qquad
t = \\frac{100}{3.708} = 27.0\ \\mathrm{s}.
$$
**(b) Shortest time.** Head straight across, at right angles to the bank:
$$
t = \\frac{100}{4} = 25.0\ \\mathrm{s}, \\qquad
\\text{drift} = 1.5 \\times 25.0 = 37.5\ \\mathrm{m}.
$$
*Sanity.* The two headings differ by $22^{\\circ}$ and the two times by only $8$ per cent, so the drift costs $37.5\ \\mathrm{m}$ of landing point but saves $2\ \\mathrm{s}$. The general result is that the current affects the crossing **time** not at all when the boat heads square across, because the current is perpendicular to the rowing and the two velocity components are independent. This independence of perpendicular motions is Galileo's principle and it is the reason a swimmer caught in a current should swim straight to the near bank rather than fight upstream: the downstream drift is the same either way, and the crossing time is minimised by pointing at the bank.
:::
:::

::: example Aircraft wind triangle {#ex-wind-triangle}
A pilot must fly $300\ \\mathrm{km}$ on a track of $040^{\\circ}$ with an airspeed of $320\ \\mathrm{km / h}$ in a wind of $80\ \\mathrm{km / h}$ **from** $090^{\\circ}$. Find the heading to steer, the ground speed and the time.
::: solution
Take $x$ east and $y$ north. The wind blows **towards** $270^{\\circ}$, so $\\mathbf{w} = \\left( - 80, 0 \\right)$. The required track direction is $\\left( \\sin 40, \\cos 40 \\right) = \\left( 0.643, 0.766 \\right)$ and the unit vector perpendicular to it, to the right, is $\\left( 0.766, - 0.643 \\right)$.

**Cross-track condition.** The ground velocity must have no component across the track:
$$
320 \\sin \\left( H - 40^{\\circ} \\right) + \\mathbf{w} \\cdot \\left( 0.766, - 0.643 \\right) = 0 ,
$$
$$
320 \\sin \\left( H - 40^{\\circ} \\right) - 61.3 = 0
\\quad\\Longrightarrow\\quad
H = 40 + 11.0 = 051^{\\circ} .
$$
**Ground speed.**
$$
V = 320 \\cos 11.0^{\\circ} + \\mathbf{w} \\cdot \\left( 0.643, 0.766 \\right)
= 314.1 - 51.4 = 262.7\ \\mathrm{km / h},
$$
$$
t = \\frac{300}{262.7} = 1.142\ \\mathrm{h} = 1\ \\mathrm{h}\ 9\ \\mathrm{min}.
$$
*Check.* The wind is $80\ \\mathrm{km / h}$ and the cross-track component needed to cancel it is $61.3\ \\mathrm{km / h}$, which is $19$ per cent of the airspeed — a small-angle correction of $11^{\\circ}$, consistent. Had the wind been a pure headwind the ground speed would be $240\ \\mathrm{km / h}$ and the time $1.25\ \\mathrm{h}$; the beam component costs $11.5$ per cent of the ground speed through the $\\cos$ term alone. $\checkmark$

*Sanity.* This is the wind triangle, and it is solved graphically by pilots with a plotting triangle and numerically by every flight-management computer. The important qualitative result is that a **beam** wind costs you time even though it blows neither with you nor against you, because the crab angle wastes $1 - \\cos 11^{\\circ} = 1.8$ per cent of the airspeed directly and forces a longer path if uncorrected. The round-trip penalty is worse still: out and home against the same beam wind the times are $1.142\ \\mathrm{h}$ and $1.318\ \\mathrm{h}$, an average ground speed of $247\ \\mathrm{km / h}$ against a no-wind $320$ — which is why a tailwind never pays for the headwind it will produce on the way back, and why airlines route for the jet stream one way and detour around it the other.
:::
:::

::: warning Dependent motion equations are signed, and the signs are not obvious
Write the length equation before you write anything else, and never try to reason out "if $A$ goes down then $B$ goes up" in your head. The classic failure is a cable that passes under a moving pulley and over a fixed one: the moving pulley contributes $2 s$ to the length, the fixed one contributes nothing, and getting that backwards inverts the velocity ratio. A reliable check is energy: the tension in a single massless cable does work $T v_{\\text{cable}}$ at one end and $- T v_{\\text{load}}$ at the other, and if the velocity ratio is $n$ then the force ratio must be $n$ too. If your kinematics gives a velocity ratio that does not match the mechanical advantage you can see in the reeving, one of the two is wrong.
:::

::: history
The principle that motions in perpendicular directions are independent — that a ball dropped from the mast of a moving ship lands at the foot of the mast — is Galileo's, argued in the *Dialogo* of 1632 with the cabin of a ship below decks as his thought experiment, and it is the first statement of what is now called a Galilean transformation. Newton made it explicit in the corollaries to the *Principia*, where he showed that "a body having been moved in any direction by any force will afterwards proceed uniformly in a straight line in the direction compounded of the motions which it would have had separately". The systematic use of relative velocity in the graphical analysis of machines is a nineteenth-century engineering practice, formalised by Kennedy's **three-centres theorem** of 1886, which states that three bodies moving relative to one another have three instantaneous centres lying on a straight line, and which made the velocity diagram of a linkage a ruler-and-compass construction. The **wind triangle** dates from the first powered flights, and its instrument, the drift meter, was one of the earliest pieces of air navigation equipment; the equivalent problem at sea is the current triangle of the 1900s, solved on the chart with parallel rulers. The dependent-motion equations of pulley systems appear in every mechanics text from the 1790s onward and are the oldest piece of applied kinematics in engineering education, older than the subject's own dynamics.
:::

## Where this leads

Relative acceleration in a **rotating** frame, where the Coriolis term appears, is developed in [[dynamics/three-dimensional-dynamics]], and the instantaneous-centre version of the same idea is in [[dynamics/rigid-body-kinematics]]. The dependent-motion equations become the constraint equations of [[dynamics/rigid-body-kinetics]] and of [[mechanisms/velocity-analysis]], and the wind triangle reappears in [[flight-mechanics/steady-flight-performance]].

::: summary
- Relative velocity and acceleration are vector differences between quantities measured in the **same** frame; never subtract magnitudes.
- A translating frame introduces no extra terms; a rotating one introduces centripetal and Coriolis terms, and the two must not be confused.
- For connected particles, write one cable-length equation per cable, differentiate, and let the signs fall out.
- A moving pulley contributes $2 s$ to the length equation; a fixed one contributes nothing. Velocity ratio equals mechanical advantage for an inextensible cable.
- Perpendicular motions are independent: a river's current does not change the time to cross if you point straight across.
- Closest approach is a one-line calculation in the relative frame: $d = \\left| \\mathbf{r} \\times \\mathbf{v} \\right| / \\left| \\mathbf{v} \\right|$.
:::

::: quiz
A cable-run hoist has a mechanical advantage of $4$. If the hoist is $80$ per cent efficient, what force is needed to lift $400\ \mathrm{N}$, and how much cable must be pulled to raise the load $1\ \mathrm{m}$?
- [ ] $100\ \mathrm{N}$ and $1\ \mathrm{m}$
- [x] $125\ \mathrm{N}$ and $4\ \mathrm{m}$
- [ ] $125\ \mathrm{N}$ and $1\ \mathrm{m}$
- [ ] $500\ \mathrm{N}$ and $4\ \mathrm{m}$
::: solution
$125\ \mathrm{N}$ and $4\ \mathrm{m}$. The **distance** is set by kinematics and not at all by friction: an inextensible cable of constant length requires $4\ \mathrm{m}$ to be paid out for $1\ \mathrm{m}$ of lift whether the sheaves are brass or rusted solid. The **force** is set by energy: the ideal $100\ \mathrm{N}$ becomes $100 / 0.8 = 125\ \mathrm{N}$. Separating the kinematic from the energetic part of a machine is the single most useful habit in elementary machine analysis, and the reason a machine's velocity ratio is a pure number while its mechanical advantage is a measured one.
:::
:::

## Exercises

::: exercise Relative velocity {level=1 check="100"}
Two trains travel on parallel tracks in the same direction at $80$ and $60\ \\mathrm{km / h}$. A $200\ \\mathrm{m}$-long train overtakes a stationary observer in the slower train's frame. At what relative speed does the faster train pass the slower, and how long does a $200\ \\mathrm{m}$ coach take to pass a window in the slower one?
::: solution
The relative speed is $20\ \\mathrm{km / h} = 5.56\ \\mathrm{m / s}$, and the time is $200 / 5.56 = 36\ \\mathrm{s}$.
:::
:::

::: exercise Dependent motion {level=1 check="1.0"}
A load is supported by a moving pulley around which a single cable passes, one end of the cable being fixed overhead. If the free end is pulled up $2\ \\mathrm{m}$, how far does the load rise?
::: solution
$s_{\\text{free}} + 2 s_{\\text{load}} = l$, so $\\Delta s_{\\text{load}} = - \\Delta s_{\\text{free}} / 2 = 1\ \\mathrm{m}$... 

*Note.* Careful with the datum. If the free end is pulled **up** by $2\ \\mathrm{m}$, the cable shortens above the pulley by $2\ \\mathrm{m}$ and that $2\ \\mathrm{m}$ is shared between the two legs supporting the pulley, so the load rises $1\ \\mathrm{m}$. The answer to enter is $1.0$.
:::
:::

::: exercise Independent motions {level=1 check="20"}
A swimmer who can do $2\ \\mathrm{m / s}$ in still water swims straight across a river flowing at $1.5\ \\mathrm{m / s}$ and $40\ \\mathrm{m}$ wide. How far downstream does she land?
::: solution
The crossing time is $40 / 2 = 20\ \\mathrm{s}$, independent of the current, and the drift is $1.5 \\times 20 = 30\ \\mathrm{m}$.
*Note.* The answer to enter is the **time**, $20\ \\mathrm{s}$; the drift is $30\ \\mathrm{m}$.
:::
:::

::: exercise Relative acceleration {level=2}
A lift accelerates upwards at $2\ \\mathrm{m / s^{2}}$. A ball is thrown straight up inside it at $10\ \\mathrm{m / s}$ relative to the lift. How long before it returns to the thrower, and how high does it go relative to the lift?
::: solution
In the lift's frame the ball has an acceleration of $- \\left( g + a \\right) = - 11.81\ \\mathrm{m / s^{2}}$, so
$$
t = \\frac{2 \\times 10}{11.81} = 1.69\ \\mathrm{s}, \\qquad
h = \\frac{10^{2}}{2 \\times 11.81} = 4.23\ \\mathrm{m}.
$$
*Sanity.* In an inertial frame the ball's acceleration is $- g$ throughout and the lift floor accelerates up to meet it, which is why the return time is shorter than the $2.04\ \\mathrm{s}$ of a stationary lift. The fictitious force $m a$ in the lift frame is exactly the difference, and this is the simplest illustration of why an accelerating observer must invent one.
:::
:::

::: exercise Wind triangle {level=2}
For the flight of Example 7, find the time for the return leg from the destination back to the origin on the reciprocal track of $220^{\\circ}$.
::: solution
The reciprocal track direction is $\\left( - 0.643, - 0.766 \\right)$ and the perpendicular is $\\left( - 0.766, 0.643 \\right)$.
$$
320 \\sin \\left( H' \\right) + \\mathbf{w} \\cdot \\left( - 0.766, 0.643 \\right) = 0
\\quad\\Longrightarrow\\quad
320 \\sin \\beta + 61.3 = 0 \\quad\\Longrightarrow\\quad \\beta = - 11.0^{\\circ},
$$
so the heading is $220 - 11 = 209^{\\circ}$, and
$$
V = 320 \\cos 11.0^{\\circ} - 51.4 = 262.7\ \\mathrm{km / h} \times \\ldots
$$
*Note.* The wind's along-track component reverses sign on the reciprocal track, from $- 51.4$ to $+ 51.4\ \\mathrm{km / h}$, so
$$
V_{\\text{return}} = 314.1 + 51.4 = 365.5\ \\mathrm{km / h}, \\qquad
t = \\frac{300}{365.5} = 0.821\ \\mathrm{h} = 49.2\ \\mathrm{min}.
$$
The round trip is $68.5 + 49.2 = 117.7\ \\mathrm{min}$ against $56.3\ \\mathrm{min}$ in still air, an average ground speed of $306\ \\mathrm{km / h}$ against $320$. The beam wind costs $19$ per cent of the round-trip time even though it is neither with nor against the aircraft at any point.
:::
:::

::: exercise Closest approach {level=2}
Ship $A$ steams north at $15$ knots and is $4\ \\mathrm{nm}$ west of ship $B$, which steams east at $20$ knots. Find the closest approach.
::: solution
Take $x$ east, $y$ north. $\\mathbf{r}_{A / B} = \\left( - 4, 0 \\right)\ \\mathrm{nm}$, $\\mathbf{v}_{A / B} = \\left( - 20, 15 \\right)\ \\mathrm{kn}$, $\\left| \\mathbf{v} \\right| = 25\ \\mathrm{kn}$.
$$
d = \\frac{\\left| r_x v_y - r_y v_x \\right|}{\\left| \\mathbf{v} \\right|}
= \\frac{\\left| \\left( - 4 \\right) \\times 15 - 0 \\times \\left( - 20 \\right) \\right|}{25} = 2.40\ \\mathrm{nm},
$$
$$
t = - \\frac{\\mathbf{r} \\cdot \\mathbf{v}}{v^{2}} = - \\frac{80}{625} \\times 60 = 7.7\ \\mathrm{min}.
$$
*Sanity.* The answer is a **miss distance**, and it is the number every collision-avoidance system computes. Note that $t$ is positive, so the closest approach is in the future; if the sign comes out negative the vessels have already passed and the distance is increasing.
:::
:::

::: exercise Design {level=3}
A package moves at $2\ \\mathrm{m / s}$ on a conveyor in the $x$-direction. A diverter belt travelling at $1.5\ \\mathrm{m / s}$ is to be laid so that a package leaving the conveyor is carried away with **no relative sliding** at the moment of transfer. Find the required direction of the diverter belt and the relative velocity at the instant before contact.
::: solution
For no sliding at transfer, the diverter's velocity must equal the **change** in the package's velocity, and the package must arrive on the diverter with a relative velocity parallel to the diverter's surface. If the diverter runs at angle $\\theta$ to the $x$-axis, its velocity is $1.5 \\left( \\cos \\theta, \\sin \\theta \\right)$ and the relative velocity of the package with respect to it is
$$
\\mathbf{v}_{p / d} = \\left( 2 - 1.5 \\cos \\theta, \; - 1.5 \\sin \\theta \\right).
$$
For this to be **along** the diverter's direction, the component perpendicular to it must vanish:
$$
\\left( 2 - 1.5 \\cos \\theta \\right) \\sin \\theta - \\left( - 1.5 \\sin \\theta \\right) \\cos \\theta \\times ( - 1 ) = 0
\\quad\\Longrightarrow\\quad
2 \\sin \\theta - 1.5 \\cos \\theta \\sin \\theta + 1.5 \\sin \\theta \\cos \\theta = 0 ,
$$
which gives $\\sin \\theta = 0$, i.e. no divergence is possible with a matching-speed belt.

*Note.* The algebra has proved something real: a belt cannot take a package off at right angles without sliding, because the package's velocity component along the diverter must be reduced from $2 \\cos \\theta$ to zero, and any change in velocity is sliding. The design answer is therefore to **accept** the sliding and size for it. Take $\\theta = 30^{\\circ}$:
$$
\\mathbf{v}_{p / d} = \\left( 2 - 1.30, \; - 0.75 \\right) = \\left( 0.70, - 0.75 \\right), \\qquad
\\left| \\mathbf{v}_{p / d} \\right| = 1.03\ \\mathrm{m / s}.
$$
The package therefore arrives with $1.03\ \\mathrm{m / s}$ of relative motion, which is dissipated in a distance $d = v_{\\text{rel}}^{2} / \\left( 2 \\mu g \\right) = 1.03^{2} / \\left( 2 \\times 0.3 \\times 9.81 \\right) = 0.18\ \\mathrm{m}$ of diverter length.

*Design comment.* This is why a real cross-belt diverter is a short low-friction slide rather than a driven belt, why the transition is tapered over $200$ to $300\ \\mathrm{mm}$, and why the packages on a parcel-sorting conveyor are always slightly scuffed. The sliding distance of $180\ \\mathrm{mm}$ is also the reason a diverter placed too close to a bend throws packages: the sliding impulse has to be taken by the side guide, not by the belt.
:::
:::

::: exercise Derivation {level=3}
Derive the acceleration transformation between two frames, one of which translates **and rotates**, and identify each term. Then show that for a frame rotating at constant $\\omega$ about a fixed axis the result reduces to the centripetal, Coriolis and Euler terms.
::: solution
Let $S$ be inertial and $S^{\\prime}$ rotate with angular velocity $\\boldsymbol{\\omega}$ and translate with origin $O^{\\prime}$. For any vector $\\mathbf{A}$,
$$
\\left( \\dot{\\mathbf{A}} \\right)_S = \\left( \\dot{\\mathbf{A}} \\right)_{S^{\\prime}} + \\boldsymbol{\\omega} \\times \\mathbf{A} .
$$
Applying this twice to $\\mathbf{r} = \\mathbf{r}_{O^{\\prime}} + \\mathbf{r}^{\\prime}$,
$$
\\mathbf{v} = \\mathbf{v}_{O^{\\prime}} + \\left( \\dot{\\mathbf{r}}^{\\prime} \\right)_{S^{\\prime}} + \\boldsymbol{\\omega} \\times \\mathbf{r}^{\\prime} ,
$$
$$
\\mathbf{a} = \\mathbf{a}_{O^{\\prime}} + \\left( \\ddot{\\mathbf{r}}^{\\prime} \\right)_{S^{\\prime}}
+ \\dot{\\boldsymbol{\\omega}} \\times \\mathbf{r}^{\\prime} + 2 \\boldsymbol{\\omega} \\times \\left( \\dot{\\mathbf{r}}^{\\prime} \\right)_{S^{\\prime}}
+ \\boldsymbol{\\omega} \\times \\left( \\boldsymbol{\\omega} \\times \\mathbf{r}^{\\prime} \\right) .
$$
The five terms are, in order: the acceleration of the moving origin; the acceleration **relative** to the moving frame; the **Euler** term from a changing spin; the **Coriolis** term; and the **centripetal** term.

**Constant spin.** With $\\dot{\\boldsymbol{\\omega}} = 0$ and $\\boldsymbol{\\omega}$ along a fixed $z$-axis, the Euler term vanishes and
$$
\\boldsymbol{\\omega} \\times \\left( \\boldsymbol{\\omega} \\times \\mathbf{r}^{\\prime} \\right) = - \\omega^{2} \\rho \\mathbf{e}_\\rho ,
$$
where $\\rho$ is the perpendicular distance from the axis, so the centripetal term is $\\omega^{2} \\rho$ directed **inwards** towards the axis. The Coriolis term $2 \\boldsymbol{\\omega} \\times \\mathbf{v}^{\\prime}$ is perpendicular to the relative velocity and hence does no work:
$$
\\mathbf{v}^{\\prime} \\cdot \\left( 2 \\boldsymbol{\\omega} \\times \\mathbf{v}^{\\prime} \\right) \\equiv 0 .
$$

*Comment.* The identity $\\left( \\dot{\\mathbf{A}} \\right)_S = \\left( \\dot{\\mathbf{A}} \\right)_{S^{\\prime}} + \\boldsymbol{\\omega} \\times \\mathbf{A}$ is the single most useful result in applied dynamics, and every formula in this and the next three courses that contains a $\\omega$ multiplied by a velocity comes from it. Note that the Coriolis term does no work yet can be the largest force in the problem — on a turbine blade, on a rifle bullet over a kilometre of flight, on a weather system over a day — because a force that does no work can still redirect a motion completely.
:::
:::
