A crane hook holds an engine at rest. Three cables leave the hook at different angles, and the crane's hoist pulls upward. How much does each cable carry? The question has a complete answer even though nothing moves, and the answer comes from one line of algebra: the forces must add to zero.

That is the whole content of this chapter. When a body is in equilibrium the resultant force on it vanishes, and for a body small enough to be treated as a **particle** that is the only condition available. It sounds too simple to fill a chapter, and it is — but the skill is not in the condition, it is in getting the forces right. Almost every wrong answer in statics is a wrong free-body diagram: a reaction that was never drawn, a cable assumed to push, a weight put at the wrong place, a two-force member treated as a beam. This chapter therefore spends as much time on *drawing* the diagram as on solving the equations.

::: warning Statics is not the study of things that do not move
Equilibrium means zero *acceleration*, not zero velocity. A ship being towed at a steady $8\ \mathrm{kn}$, a parachute descending at terminal speed and an aircraft in steady level flight are all in equilibrium, and their forces are found by the same equations as a bridge pier's. Conversely a body that is momentarily at rest need not be in equilibrium: a ball at the top of its flight has zero velocity and full weight acting on it, and accelerates at $9.81\ \mathrm{m/s^{2}}$. The test is always $\sum \mathbf{F} = \mathbf{0}$, never "is it moving?".
:::

## The particle model and the free-body diagram

::: definition Particle and equilibrium {#def-particle}
A **particle** is a body whose dimensions are irrelevant to the force calculation being made: all its forces may be taken to act at one point, so no moment condition arises. A suspension-ring, a pulley, a bolt, a hook, a knot in a set of cables and a whole aircraft treated for range calculations are all particles in this sense. A **rigid body** that is not a particle needs the moment condition as well, which is the subject of [[statics/rigid-body-equilibrium]]. A particle is in **equilibrium** when and only when the vector sum of all forces acting on it vanishes,
$$
\sum \mathbf{F} = \mathbf{0}
\qquad\Longleftrightarrow\qquad
\textstyle \sum F_x = 0, \quad \sum F_y = 0, \quad \sum F_z = 0 .
$$
This is Newton's first law, and it is both necessary and sufficient for a particle.
:::

::: proposition Newton's first law as a computational rule {#prop-first-law}
If a particle is at rest or moves with constant velocity in an inertial frame, the resultant force on it is zero; and if the resultant force on it is zero it is at rest or moves with constant velocity. In components, a plane problem gives two independent scalar equations and a space problem gives three, so **at most** two or three unknown magnitudes or directions can be found.
:::

::: proof
Newton's second law for a particle of constant mass is $\sum \mathbf{F} = m \mathbf{a}$. Equilibrium is by definition the case $\mathbf{a} = \mathbf{0}$, which gives $\sum \mathbf{F} = \mathbf{0}$; the converse follows because $m \neq 0$. The number of independent equations equals the number of independent components of the vector equation, because the unit vectors $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ are linearly independent: if $A_x \mathbf{i} + A_y \mathbf{j} + A_z \mathbf{k} = \mathbf{0}$, dotting in turn with each unit vector gives $A_x = A_y = A_z = 0$. Two equations can determine at most two unknowns, which is why a ring supported by four cables cannot be solved from statics alone — a fact with real consequences for the rigging of loads, discussed in the exercises.
:::

Everything downstream of the free-body diagram is mechanical. Getting the diagram right is not, and the following procedure is worth following exactly, in this order, every time.

::: algorithm Free-body diagram for a particle {#alg-fbd}
1. **Isolate the particle.** Choose the point whose equilibrium you want — usually the point where several known and unknown forces meet — and draw it alone, detached from everything.
2. **Draw every force acting *on* it**, pointing in the direction the neighbour pulls or pushes. Cables, ropes and chains pull *away* along their own line and never push. A smooth surface pushes *along* its normal, away from the surface. A spring pulls if stretched, pushes if compressed. Weight acts vertically downwards through the particle.
3. **Label each force** with a symbol if its magnitude is unknown, and with its value and unit if it is known. Mark the angle that fixes each line of action, using angles given in the problem, not angles you have computed and might have got wrong.
4. **Choose axes and draw them on the diagram.** Pick them so that as many unknowns as possible lie along an axis; for an inclined-plane problem take one axis along the plane.
5. **Write each force in components** along those axes, then write $\sum F_x = 0$ and $\sum F_y = 0$ (and $\sum F_z = 0$ in space).
6. **Solve, then check**: are the signs of the unknowns consistent with the assumed senses? Does the answer behave sensibly as an angle goes to $0$ or $90^\circ$? Are the units right?
:::

::: warning A cable pulls; a strut may push
The most common single error is to let a cable push. A flexible cable, rope or chain can only carry tension along its own length, so if the solution gives a negative tension the physical conclusion is that the cable is **slack** and carries nothing — and the problem must then be re-solved without it, with a different geometry. A straight two-force member that is pinned at both ends (a strut, a tie, a link) can carry either sign, and a negative "compression" simply means it is in tension. Do not silently accept a negative cable tension as an answer.
:::

## Two or three forces in a plane

With two unknowns and two equations, a plane particle problem is a pair of simultaneous linear equations. Two special cases are worth recognising at once.

::: proposition Special force systems {#prop-special}
**Two-force particle.** If only two forces act on a particle in equilibrium, they are equal in magnitude, opposite in sense and collinear.

**Three-force particle, symmetric.** If three forces act on a particle, two of them making equal angles $\beta$ with the bisector of the angle between them and the third along that bisector, then the two inclined forces have equal magnitude $F = P / (2 \cos\beta)$ where $P$ is the third force.

**Lami's theorem.** If three forces $\mathbf{F}_1$, $\mathbf{F}_2$, $\mathbf{F}_3$ keep a particle in equilibrium and the angle between $\mathbf{F}_2$ and $\mathbf{F}_3$ is $\alpha_1$ (and cyclically), then
$$
\frac{F_1}{\sin\alpha_1} = \frac{F_2}{\sin\alpha_2} = \frac{F_3}{\sin\alpha_3} .
$$
:::

::: proof
For two forces, $\mathbf{F}_1 + \mathbf{F}_2 = \mathbf{0}$ gives $\mathbf{F}_2 = -\mathbf{F}_1$, which states all three properties at once. For the symmetric case, take the bisector as the $y$-axis: the components perpendicular to it are $\pm F \sin\beta$ and cancel automatically, while the components along it give $2 F \cos\beta - P = 0$. For Lami's theorem, close the three forces head to tail: $\sum \mathbf{F} = \mathbf{0}$ means they form a triangle, and the interior angles of that triangle are $\pi - \alpha_1$, $\pi - \alpha_2$, $\pi - \alpha_3$ because each side of the triangle is drawn parallel to, and in the sense of, one force while the angle between two consecutive sides is the supplement of the angle between the two forces. The sine rule for that triangle gives $F_1 / \sin(\pi - \alpha_1) = F_2 / \sin(\pi - \alpha_2) = F_3 / \sin(\pi - \alpha_3)$, and $\sin(\pi - \alpha) = \sin\alpha$. Lami's theorem is the three-force case of the general fact that a closed force polygon has as many equations as components, and it is faster than components when three forces and three angles are known.
:::

::: example Load on a smooth incline held by a cable {#ex-incline}
A machine of mass $200\ \mathrm{kg}$ rests on a smooth plane inclined at $30^\circ$ to the horizontal and is held by a cable parallel to the plane. Find the cable tension and the normal reaction.
::: solution
The machine is a particle with three forces: its weight $W = 200 \times 9.81 = 1962\ \mathrm{N}$ vertically down, the cable tension $T$ up the plane, and the normal reaction $N$ perpendicular to the plane and away from it. The plane is smooth, so there is no friction — an assumption the wording must state and the diagram must show.

Take $x$ along the plane (up the plane positive) and $y$ perpendicular to it. The weight resolves as $-W \sin 30^\circ$ along $x$ and $-W \cos 30^\circ$ along $y$; $T$ and $N$ lie along the axes. Then
$$
\textstyle \sum F_x = T - W \sin 30^\circ = 0 \quad\Longrightarrow\quad T = 1962 \times 0.500 = 981\ \mathrm{N},
$$
$$
\textstyle \sum F_y = N - W \cos 30^\circ = 0 \quad\Longrightarrow\quad N = 1962 \times 0.866 = 1699\ \mathrm{N}.
$$

*Sanity checks.* As the plane flattens ($\theta \to 0$) the tension tends to zero and the reaction to the full weight; as it steepens ($\theta \to 90^\circ$) the tension tends to the weight and the reaction to zero. Both limits are right. The reaction exceeds the weight's component along the plane, and $981^{2} + 1699^{2} = 1962^{2}$ to rounding, because the two components are the weight resolved at right angles.
:::
:::

::: example Two slings lifting a panel {#ex-two-slings}
A precast panel weighing $5\ \mathrm{kN}$ is lifted by two slings attached to a single crane hook. The slings make angles of $60^\circ$ and $30^\circ$ with the horizontal, on opposite sides of the vertical through the hook. Find the tension in each sling. Which is more heavily loaded, and by how much?
::: solution
The hook is the particle. Three forces act on it: the panel's weight $W = 5\ \mathrm{kN}$ down, tension $T_1$ along the steeper sling at $60^\circ$ to the horizontal, and tension $T_2$ along the shallower sling at $30^\circ$ on the other side. With $x$ horizontal and $y$ vertical,
$$
\textstyle \sum F_x = T_1 \cos 60^\circ - T_2 \cos 30^\circ = 0, \qquad
\sum F_y = T_1 \sin 60^\circ + T_2 \sin 30^\circ - 5000 = 0 .
$$
The first equation gives $T_1 = T_2 \cos 30^\circ / \cos 60^\circ = 1.732\, T_2$. Substituting into the second,
$$
1.732\, T_2 \times 0.8660 + 0.5000\, T_2 = 1.500\, T_2 + 0.500\, T_2 = 2.000\, T_2 = 5000,
$$
so
$$
T_2 = 2500\ \mathrm{N} = 2.50\ \mathrm{kN}, \qquad
T_1 = 1.732 \times 2500 = 4330\ \mathrm{N} = 4.33\ \mathrm{kN}.
$$
The **steeper** sling carries $73$ per cent more than the shallower one, and $87$ per cent of the whole weight on its own.

*Sanity check.* The two tensions are the sides of a right-angled force triangle with the weight as hypotenuse, because the slings are $60^\circ + 30^\circ = 90^\circ$ apart: $\sqrt{4330^{2} + 2500^{2}} = 5000\ \mathrm{N}$. That is a useful design fact — when two slings are at right angles, the load in each is $W \sin$ or $W \cos$ of its angle with the horizontal, and the total never exceeds $W$ in the pair but can approach $W$ in one of them.
:::
:::

::: widget plot
f: 5000/(2*sin(x*pi/180))
x: 5, 90
y: 2500, 29000
labels: \text{tension in each of two symmetric slings}
caption: Tension in each of two identical slings symmetrically placed at angle $x$ to the horizontal, lifting a $5\ \mathrm{kN}$ panel: $T = W / (2 \sin\theta)$. Drag along the curve. At $\theta = 90^\circ$ (slings vertical and together) each carries $2.5\ \mathrm{kN}$, half the load; at $\theta = 30^\circ$ each carries $5\ \mathrm{kN}$, the whole load; at $\theta = 5^\circ$ each carries $28.7\ \mathrm{kN}$, nearly six times the load. This curve is the reason sling-angle tables in every rigging manual limit the angle between sling and load, and why "shorter slings are safer slings" is a true saying about a two-leg lift.
:::

::: quiz
A picture of mass $4\ \mathrm{kg}$ hangs from a nail by a cord whose two halves each make $30^\circ$ with the horizontal. What is the tension in the cord?
- [ ] $20\ \mathrm{N}$
- [x] $39\ \mathrm{N}$
- [ ] $68\ \mathrm{N}$
- [ ] $78\ \mathrm{N}$
::: solution
The weight is $W = 4 \times 9.81 = 39.2\ \mathrm{N}$, and the two cord halves supply vertical components that add to it: $2 T \sin 30^\circ = 39.2$, so $T = 39.2\ \mathrm{N}$, numerically equal to the weight because $\sin 30^\circ = 0.5$. Pull the cord flatter and the tension grows as $1 / \sin\theta$ without limit: at $10^\circ$ it is $113\ \mathrm{N}$, at $2^\circ$ it is $562\ \mathrm{N}$. A cord hung nearly straight between two points cannot be made slack at any tension, which is why a washing line sags and why a cable roof needs pretension or a shallow curve.
:::
:::

## Weight, springs, and smooth surfaces

Three force types recur in particle problems and each has a rule.

**Weight.** A body of mass $m$ near the Earth's surface is acted on by $W = m g$ directed vertically downwards through its centre of mass. For a particle the centre of mass is the particle, so weight is applied there. In a free-body diagram weight is drawn *downwards on the page*, whatever the orientation of the plane or structure the body sits on.

**Springs.** A linear spring of stiffness $k$ (in $\mathrm{N/m}$) exerts $F = k s$ where $s$ is its extension from the unstressed length. The force pulls the two ends towards each other if the spring is stretched and pushes them apart if compressed. Springs are not cables: a coil spring can take either sign. Note that stiffness in $\mathrm{N/mm}$ is numerically $10^{3}$ times smaller than in $\mathrm{N/m}$, and mixing the two is a classic arithmetic error.

**Smooth surfaces and contacts.** A frictionless surface or pin can only push, and pushes along the common normal at the contact. A peg or corner in contact with a smooth curved surface pushes along the radius through the point of contact. If friction is present it acts along the tangent, opposing impending slip, and its magnitude is not known in advance — it takes whatever value equilibrium requires up to a limit $\mu N$. Problems in this chapter are frictionless; [[statics/friction]] deals with the rest.

::: example Spring-held roller against a wall {#ex-spring-roller}
A roller of weight $500\ \mathrm{N}$ rests against a smooth vertical wall and is held by a horizontal spring of stiffness $2.5\ \mathrm{kN/m}$ attached to its centre. Find the spring's extension and the reaction at the wall.
::: solution
The roller has three forces: weight $500\ \mathrm{N}$ down, the wall reaction $N$ horizontally away from the wall, and the spring force $F_s$ horizontally towards the wall. Vertical equilibrium can only be satisfied by something, and neither $N$ nor a horizontal spring has a vertical component — so the arrangement as described is impossible, and the real one has the spring inclined or the roller on a floor as well. Take the standard version: the roller rests on a smooth floor and touches a smooth vertical wall, with the horizontal spring between the roller and a fixed point.

Then the floor supplies a vertical reaction $R_f = 500\ \mathrm{N}$, and horizontally
$$
\textstyle \sum F_x = N - F_s = 0 .
$$
If the spring is stretched by $s = 40\ \mathrm{mm} = 0.040\ \mathrm{m}$, then
$$
F_s = k s = 2500 \times 0.040 = 100\ \mathrm{N}, \qquad N = 100\ \mathrm{N}.
$$
The wall pushes back with $100\ \mathrm{N}$ and the floor with $500\ \mathrm{N}$.

The point of the example is the false start. Counting the forces is a matter of asking, for each neighbour, "does it touch, and if I removed it would this body move?" — and if a required direction of force is missing from the diagram, the diagram is wrong, not the answer.
:::
:::

## Equilibrium in three dimensions

In space a particle gives three equations, so three unknowns can be found. The method is unchanged: express every force as a Cartesian vector using the unit vector of its line, sum, and set each component to zero.

::: example Three-cable support in space {#ex-3d-cables}
A load of $6\ \mathrm{kN}$ hangs at $A(0, 0, 0)$, supported by three cables to the points $B(3, 0, 4)\ \mathrm{m}$, $C(-3, 2, 4)\ \mathrm{m}$ and $D(0, -3, 4)\ \mathrm{m}$. Find the tension in each cable.
::: solution
The particle is the ring at $A$. The forces on it are the load $(0, 0, -6000)\ \mathrm{N}$ and three tensions directed from $A$ towards the anchorages. The unit vectors are
$$
\mathbf{u}_{AB} = \frac{3 \mathbf{i} + 4 \mathbf{k}}{\sqrt{9 + 16}} = 0.600 \mathbf{i} + 0.800 \mathbf{k}, \qquad r_{AB} = 5.00\ \mathrm{m},
$$
$$
\mathbf{u}_{AC} = \frac{-3 \mathbf{i} + 2 \mathbf{j} + 4 \mathbf{k}}{\sqrt{9 + 4 + 16}} = -0.557 \mathbf{i} + 0.371 \mathbf{j} + 0.743 \mathbf{k}, \qquad r_{AC} = 5.39\ \mathrm{m},
$$
$$
\mathbf{u}_{AD} = \frac{-3 \mathbf{j} + 4 \mathbf{k}}{\sqrt{9 + 16}} = -0.600 \mathbf{j} + 0.800 \mathbf{k}, \qquad r_{AD} = 5.00\ \mathrm{m}.
$$
Setting the three components of the sum to zero:
$$
\textstyle \sum F_x:\; 0.600\, T_{AB} - 0.557\, T_{AC} = 0 ,
$$
$$
\textstyle \sum F_y:\; 0.371\, T_{AC} - 0.600\, T_{AD} = 0 ,
$$
$$
\textstyle \sum F_z:\; 0.800\, T_{AB} + 0.743\, T_{AC} + 0.800\, T_{AD} - 6000 = 0 .
$$
The first two give $T_{AB} = 0.928\, T_{AC}$ and $T_{AD} = 0.619\, T_{AC}$. Substituting into the third,
$$
(0.800 \times 0.928 + 0.743 + 0.800 \times 0.619)\, T_{AC} = (0.743 + 0.743 + 0.495)\, T_{AC} = 1.981\, T_{AC} = 6000 ,
$$
$$
T_{AC} = 3029\ \mathrm{N}, \qquad T_{AB} = 2812\ \mathrm{N}, \qquad T_{AD} = 1875\ \mathrm{N}.
$$

*Sanity checks.* All three tensions are positive, so all three cables are taut and the arrangement works. The vertical components must add to the load: $0.800 \times 2812 + 0.743 \times 3029 + 0.800 \times 1875 = 2250 + 2250 + 1500 = 6000\ \mathrm{N}$. The horizontal components cancel in pairs by construction. And the sum of the three tensions, $7716\ \mathrm{N}$, exceeds the load by $29$ per cent — the price of the cables not being vertical, and the reason a lifting beam that makes cables vertical is always lighter than a bridle.
:::
:::

::: warning Three equations, three unknowns — no more
A particle in space gives exactly three independent equations. A ring held by four cables has four unknown tensions and cannot be solved: it is **statically indeterminate**, and the actual tensions depend on how much each cable was stretched when it was made fast. This is not a failure of the method but a property of the structure, and the engineer's response is either to add a condition (equal stiffnesses and a compatibility equation, which is [[mechanics-of-materials/axial-loading]]) or to arrange the geometry so that the extra cables are unnecessary. Never "take moments about a fourth axis" to get a fourth equation: for a concurrent force system every moment equation is a combination of the three force equations and adds nothing.
:::

::: history
The condition of equilibrium of concurrent forces was first stated correctly for the inclined plane by Stevin in 1586, whose *De Beghinselen des Waterwichts* solved the problem of a weight on a plane by imagining the plane as a closed loop of chain — the *clootcrans*, or wreath of spheres — and arguing that it could not turn, which is an equilibrium argument of great elegance. Galileo's *Le mecaniche* of 1600 gave the equilibrium of the lever by a virtual-work argument, and Varignon's *Projet d'une nouvelle méchanique* of 1687 put the composition of forces into the form used here. The systematic separation of "statics" as a body of doctrine, with free-body diagrams drawn for isolated bodies, belongs to the great French engineering schools of the 1800s: Poisson's *Traité de mécanique* of 1811 and Poinsot's *Éléments de statique* of 1808, the latter written for the Artillerie schools and reprinted twenty times. The reason this chapter insists on drawing the isolated body is that Poinsot's contemporaries, working from the whole-structure equations alone, repeatedly got the internal forces of frames wrong; the isolation step is what makes the subject mechanical rather than clever.
:::

## Where this leads

The particle equations are a special case of the rigid-body equations of [[statics/rigid-body-equilibrium]], which add the moment condition; the joints of [[statics/trusses]] are particles by design, and the method of joints is this chapter applied ten times. Contact with friction is in [[statics/friction]]. The same equilibrium equations, applied to a body that is not a particle and not rigid, become the governing equations of [[fluid-mechanics/control-volume-analysis]] and [[solid-mechanics/linear-elasticity]].

::: summary
- A particle is a body whose dimensions do not matter to the force calculation; its equilibrium condition is $\sum \mathbf{F} = \mathbf{0}$, giving two equations in a plane and three in space.
- The free-body diagram is the work: isolate the particle, draw every force the neighbours exert, label knowns and unknowns, choose axes, resolve.
- Cables pull only; a negative cable tension means the cable is slack and must be removed from the model.
- Smooth surfaces and pins push along the common normal; springs obey $F = k s$ and can push or pull; weight is $mg$ downwards.
- With two forces the system is trivial; with three, Lami's theorem or a force triangle is faster than components.
- A particle gives only as many equations as it has dimensions, so more unknowns than equations means a statically indeterminate problem, not a missing trick.
:::

## Exercises

::: exercise Two-force equilibrium {level=1 check="981"}
A $100\ \mathrm{kg}$ mass hangs from a single vertical cable. What is the cable tension? (Enter the force in N.)
::: solution
Two forces act on the mass, so they are equal, opposite and collinear: $T = mg = 100 \times 9.81 = 981\ \mathrm{N}$.
:::
:::

::: exercise Inclined plane {level=1 check="1699"}
A $200\ \mathrm{kg}$ machine rests on a smooth plane inclined at $30^\circ$ to the horizontal. What is the normal reaction? (Enter the force in N.)
::: solution
Perpendicular to the plane, $N = W \cos 30^\circ = 1962 \times 0.866 = 1699\ \mathrm{N}$. The component along the plane, $W \sin 30^\circ = 981\ \mathrm{N}$, must be held by a cable, a stop or friction; without one of these the machine is not in equilibrium.
:::
:::

::: exercise Symmetric slings {level=1 check="2453"}
A machine of mass $500\ \mathrm{kg}$ is lifted by two identical vertical slings. What is the tension in each? (Enter the force in N.)
::: solution
By symmetry each sling carries half the weight, $T = mg / 2 = 500 \times 9.81 / 2 = 2453\ \mathrm{N}$.

Tilt the slings to $60^\circ$ to the horizontal and each carries $mg / (2 \sin 60^\circ) = 2832\ \mathrm{N}$; tilt them to $30^\circ$ and each carries $4905\ \mathrm{N}$, the whole weight. The total on the crane hook is $4905\ \mathrm{N}$ in all three cases.
:::
:::

::: exercise Three cables in a plane {level=2}
A $15\ \mathrm{kN}$ load is supported at a ring by three cables. One goes vertically up to the crane hook, one runs down-left at $210^\circ$ and one down-right at $320^\circ$, angles measured anticlockwise from the $+x$-axis. Find the three tensions.
::: solution
Let $T_1$ be the vertical cable (at $90^\circ$), $T_2$ at $210^\circ$ and $T_3$ at $320^\circ$. Equilibrium of the ring:
$$
\textstyle \sum F_x = T_2 \cos 210^\circ + T_3 \cos 320^\circ = -0.8660\, T_2 + 0.7660\, T_3 = 0 ,
$$
$$
\textstyle \sum F_y = T_1 + T_2 \sin 210^\circ + T_3 \sin 320^\circ - 15 = T_1 - 0.5000\, T_2 - 0.6428\, T_3 - 15 = 0 .
$$
Two equations, three unknowns: the system is statically indeterminate. The two lower cables are both below the ring and can only pull it down, so unless they are deliberately tensioned they go slack, giving $T_2 = T_3 = 0$ and $T_1 = 15\ \mathrm{kN}$. If they *are* tensioned so that $T_3 = 6\ \mathrm{kN}$, then $T_2 = 0.8845 \times 6 = 5.31\ \mathrm{kN}$ and $T_1 = 15 + 2.65 + 3.86 = 21.5\ \mathrm{kN}$ — the hoist cable then carries $43$ per cent more than the load.

The engineering conclusion is that a bridle whose legs run below the lifting point is a bad design: it loads the hoist rope beyond the weight it lifts.
:::
:::

::: exercise Lami's theorem {level=2 check="1785"}
A $500\ \mathrm{kg}$ drum is held on a smooth plane inclined at $20^\circ$ by a horizontal force $P$. Find $P$. (Enter the force in N.)
::: solution
Three forces: weight $W = 500 \times 9.81 = 4905\ \mathrm{N}$ down, the horizontal force $P$, and the normal reaction $N$ perpendicular to the plane. Resolving horizontally and vertically with $N$ inclined $20^\circ$ from the vertical,
$$
N \cos 20^\circ = W, \qquad N \sin 20^\circ = P
\quad\Longrightarrow\quad
P = W \tan 20^\circ = 4905 \times 0.3640 = 1785\ \mathrm{N}.
$$
By Lami's theorem the same answer comes from $P / \sin(160^\circ) = W / \sin(110^\circ)$, since the angles between the three forces are $110^\circ$, $130^\circ$ and $120^\circ$ — a useful cross-check. Note that a *horizontal* hold force needs more than the $W \sin 20^\circ = 1676\ \mathrm{N}$ a force parallel to the plane would need.
:::
:::

::: exercise Space equilibrium {level=2}
A $4\ \mathrm{kN}$ load hangs at the origin, supported by cables to $B(2, 0, 4)\ \mathrm{m}$, $C(-2, 3, 4)\ \mathrm{m}$ and $D(0, -3, 4)\ \mathrm{m}$. Find the three tensions.
::: solution
Unit vectors: $\mathbf{u}_{AB} = (2, 0, 4)/4.472 = (0.447, 0, 0.894)$; $\mathbf{u}_{AC} = (-2, 3, 4)/5.385 = (-0.371, 0.557, 0.743)$; $\mathbf{u}_{AD} = (0, -3, 4)/5 = (0, -0.600, 0.800)$. The equations are
$$
0.447\, T_{AB} - 0.371\, T_{AC} = 0, \qquad
0.557\, T_{AC} - 0.600\, T_{AD} = 0, \qquad
0.894\, T_{AB} + 0.743\, T_{AC} + 0.800\, T_{AD} = 4000 .
$$
From the first two, $T_{AB} = 0.8305\, T_{AC}$ and $T_{AD} = 0.9283\, T_{AC}$. Substituting,
$$
(0.7425 + 0.7430 + 0.7426)\, T_{AC} = 2.228\, T_{AC} = 4000
\quad\Longrightarrow\quad
T_{AC} = 1795\ \mathrm{N},
$$
$$
T_{AB} = 1491\ \mathrm{N}, \qquad T_{AD} = 1666\ \mathrm{N}.
$$
Check: the vertical components are $1333 + 1334 + 1333 = 4000\ \mathrm{N}$, as required. The three cables happen to contribute almost equally here, which is a property of this geometry and not a general rule.
:::
:::

::: exercise Design: sling angle {level=3}
A $20\ \mathrm{kN}$ generator is lifted by a two-leg sling whose legs are each $3\ \mathrm{m}$ long, attached to two lifting points $2\ \mathrm{m}$ apart on the generator and to a single shackle above the centre. Find the angle each leg makes with the horizontal, the tension in each leg, and the force on the shackle. Then repeat for legs of $1.5\ \mathrm{m}$.
::: solution
With legs of $L = 3\ \mathrm{m}$ and half-spacing $1\ \mathrm{m}$, the angle with the horizontal is
$$
\theta = \arccos \frac{1}{3} = 70.5^\circ, \qquad \sin\theta = 0.943 .
$$
Each leg carries $T = W / (2 \sin\theta) = 20\,000 / (2 \times 0.943) = 10\,600\ \mathrm{N} = 10.6\ \mathrm{kN}$, and the shackle sees the full $20\ \mathrm{kN}$.

With legs of $L = 1.5\ \mathrm{m}$, $\cos\theta = 1 / 1.5 = 0.667$, $\theta = 48.2^\circ$, $\sin\theta = 0.745$, and
$$
T = \frac{20\,000}{2 \times 0.745} = 13\,400\ \mathrm{N} = 13.4\ \mathrm{kN},
$$
$27$ per cent higher, for a shackle load that is unchanged at $20\ \mathrm{kN}$.

The design lesson is that shortening a sling raises the load in it sharply while doing nothing for the lifting point, and that the *horizontal* components, $T \cos\theta = 10\,000\ \mathrm{N}$ and $8\,940\ \mathrm{N}$ in the two cases, squeeze the generator's lifting lugs inwards — a load the lugs must be designed for and which is easy to forget because it does not appear in the total lifted weight. Rigging practice keeps the sling angle above about $60^\circ$ to the horizontal, or uses a spreader beam that puts the legs vertical.
:::
:::

::: exercise Derivation {level=3}
A wheel of radius $R$ and weight $W$ rests against a kerb of height $h < R$. Show that the least *horizontal* force $P$, applied at the centre, that just lifts the wheel off the floor is $P = W \sqrt{R^{2} - (R - h)^{2}} / (R - h)$, and find also the least force of *any* direction. Evaluate both for $R = 0.3\ \mathrm{m}$, $h = 0.05\ \mathrm{m}$, $W = 400\ \mathrm{N}$.
::: solution
When the wheel is just lifting, the floor reaction vanishes and only three forces remain: $W$ down through the centre, $P$ horizontally at the centre, and the kerb reaction, which for a smooth corner acts along the line from the kerb edge $A$ to the centre $C$. Take moments about $A$, which eliminates the kerb reaction. The perpendicular distance from $A$ to the vertical through $C$ is $\sqrt{R^{2} - (R - h)^{2}}$, and the perpendicular distance from $A$ to the horizontal line of $P$ is $R - h$. Hence
$$
P (R - h) = W \sqrt{R^{2} - (R - h)^{2}}
\qquad\Longrightarrow\qquad
P = W\, \frac{\sqrt{R^{2} - (R - h)^{2}}}{R - h} .
$$
For $h \ll R$ this is $P \approx W \sqrt{2 R h} / R = W \sqrt{2 h / R}$: a small kerb needs a small force, and a larger wheel needs less than a smaller one for the same kerb.

The force is least when it is perpendicular to $AC$, that is inclined $\arcsin\!\big(\sqrt{R^{2} - (R-h)^{2}}/R\big)$ above the horizontal, and its magnitude is then
$$
P_{\min} = \frac{W \sqrt{R^{2} - (R - h)^{2}}}{R} .
$$
For $R = 0.3\ \mathrm{m}$, $h = 0.05\ \mathrm{m}$: $\sqrt{R^{2} - (R-h)^{2}} = \sqrt{0.09 - 0.0625} = 0.1658\ \mathrm{m}$, so
$$
P_{\text{horizontal}} = 400 \times \frac{0.1658}{0.25} = 265\ \mathrm{N}, \qquad
P_{\min} = 400 \times \frac{0.1658}{0.30} = 221\ \mathrm{N}
$$
at $\arcsin(0.1658/0.30) = 33.6^\circ$ above the horizontal. Pushing horizontally at the axle costs $20$ per cent more than pushing along the best direction — one reason a wheelbarrow is *lifted* at a kerb rather than shoved, the other being that lifting puts no load into the kerb face at all.

The moment-about-a-point step used here works for a particle only when all the forces are concurrent, in which case it adds nothing; for an extended body such as a wheel it is the essential step, and it belongs to [[statics/rigid-body-equilibrium]].
:::
:::
