A particle gives two equations, and that is enough for a knot in a cable. It is not enough for a beam. A horizontal beam held by a pin at one end can be pushed at the other and spin about the pin even though the forces sum to zero, because two equal and opposite forces that are not collinear form a couple. A rigid body therefore needs the moment condition as well as the force condition, and the whole of elementary structural statics follows from writing both.

This chapter is where statics becomes useful. Everything after it — shear-force diagrams, deflections, buckling, influence lines, matrix analysis — is the equilibrium conditions of this chapter applied with more forces, more members and better bookkeeping. The bookkeeping is the difficulty, and the reward for getting it right is that a structure's support reactions can be found before any material property is mentioned, which is why a structural scheme can be judged sound or unsound at the sketch stage.

::: warning Two supports at the same point are one support
A common and expensive error is to draw two pins, or two rollers, at the same location and count four reaction components. Two collinear rollers give two parallel forces whose lines coincide with a single reaction's; they are one constraint, not two. Similarly, a "fixed" support drawn as a pin plus a roller at the same point is a fixed support and gives three components, and a pin at each end of a beam drawn as simply supported makes the beam indeterminate and invalidates the standard formulas. Count the components before solving: $r$ components and $n$ independent equilibrium equations ($n = 3$ in a plane, $6$ in space) give $r = n$ for determinacy, $r > n$ for indeterminacy, and $r < n$ for a mechanism.
:::

## Conditions for rigid-body equilibrium

::: definition Resultant force and resultant moment {#def-resultants}
For a system of forces $\mathbf{F}_i$ acting at points $P_i$ of a rigid body, the **resultant force** and the **resultant moment about $O$** are
$$
\mathbf{F}_R = \sum_i \mathbf{F}_i , \qquad
\mathbf{M}_{R,O} = \sum_i \mathbf{r}_i \times \mathbf{F}_i .
$$
The body is in **equilibrium** when and only when both vanish:
$$
\mathbf{F}_R = \mathbf{0}, \qquad \mathbf{M}_{R,O} = \mathbf{0}.
$$
In a plane problem with $x$ and $y$ in the plane of the forces these are the three scalar equations
$$
\textstyle \sum F_x = 0, \qquad \sum F_y = 0, \qquad \sum M_O = 0 ;
$$
in space they are six.
:::

::: proposition Independence of the moment centre {#prop-moment-centre}
If $\mathbf{F}_R = \mathbf{0}$, then $\mathbf{M}_{R,O} = \mathbf{0}$ for one point $O$ implies $\mathbf{M}_{R,O'} = \mathbf{0}$ for every point $O'$. Consequently any of the three moment equations may be replaced by a moment equation about any other point, and the alternative sets
$$
\textstyle \sum F_x = 0, \sum M_A = 0, \sum M_B = 0 \quad (AB \text{ not vertical}), \qquad
\sum M_A = \sum M_B = \sum M_C = 0 \quad (A, B, C \text{ non-collinear})
$$
are each equivalent to the standard three.
:::

::: proof
For two points $O$ and $O'$ separated by $\mathbf{a}$,
$$
\mathbf{M}_{R,O'} = \sum_i (\mathbf{r}_i - \mathbf{a}) \times \mathbf{F}_i
= \mathbf{M}_{R,O} - \mathbf{a} \times \sum_i \mathbf{F}_i
= \mathbf{M}_{R,O} - \mathbf{a} \times \mathbf{F}_R .
$$
If $\mathbf{F}_R = \mathbf{0}$ the second term vanishes and the two moments are equal, so one being zero makes the other zero. This is why a couple has the same moment everywhere, and why the choice of moment centre in a hand calculation is entirely free — take it where the most unknowns cross, so that they drop out. For the alternative sets: $\sum F_x = 0$ and $\sum M_A = 0$ leave at most a residual vertical force acting through $A$, and $\sum M_B = 0$ then forces it to vanish unless the line $AB$ is vertical (the residual has moment about $B$ equal to its magnitude times the horizontal distance between $A$ and $B$, which is zero only if they share an $x$-coordinate); and three non-collinear moment equations force both force sums to zero, since a residual force would have to pass through all three points and no line contains three non-collinear points. These alternatives are genuinely useful: three moment equations about three points solve a plane problem with no simultaneous equations at all.
:::

::: definition Constraints, reactions and determinacy {#def-constraints}
A **constraint** removes an independent motion of the body; each removes one degree of freedom and introduces one **reaction** component. The plane catalogue is:

| Support | Reaction components | Unknowns |
|---|---|---|
| Roller, smooth surface, short link | force normal to the surface or along the link | 1 |
| Pin or hinge, smooth cylinder | $F_x$, $F_y$ | 2 |
| Fixed (built-in, cantilever) | $F_x$, $F_y$, $M$ | 3 |

A body is **statically determinate** when the reactions can be found from equilibrium alone, which in a plane requires exactly three reaction components arranged so that no motion is left unrestrained and no reaction is redundant. Fewer than three components leaves a **mechanism**; more than three makes the problem **statically indeterminate**, to be solved by [[mechanics-of-materials/beam-deflection]].
:::

::: algorithm Equilibrium of a rigid body {#alg-rbe}
1. **Decide what to isolate.** The whole structure if the supports are external; a member or group of members if internal pin forces are wanted. Every isolated body gets its own three equations.
2. **Draw the free-body diagram**: the isolated body alone, with every applied load, every couple, and a reaction for each constraint *as if the constraint had been cut away*.
3. **Choose directions for unknown reactions.** Any direction will do; a negative answer means the sense is opposite. For a two-force member, decide by inspection that the force is along the line joining the pins.
4. **Replace distributed loads by resultants** at their centroids, and resolve inclined forces into components placed at convenient points.
5. **Write the equations, choosing the moment centre to eliminate as many unknowns as possible.** Take moments about the intersection of two unknown lines of action to solve for a third directly.
6. **Check with an equation not yet used** — a moment about a different point, or the sum of forces in the other direction. A correct answer satisfies every equation; a wrong one usually fails one.
7. **Sanity-check**: do the reactions sum to the applied load? Do they increase where the load is nearer? Do they have the right sign at a hold-down?
:::

## Plane equilibrium: worked cases

::: example Simply supported beam with a point load and a distributed load {#ex-beam}
A beam $AB$ is $6\ \mathrm{m}$ long, pinned at $A$ and on a roller at $B$. It carries a $40\ \mathrm{kN}$ downward point load $1.5\ \mathrm{m}$ from $A$ and a uniformly distributed load of $20\ \mathrm{kN/m}$ over the whole span. Find the reactions.
::: solution
The free-body diagram has three unknowns: $A_x$, $A_y$ at the pin and $N_B$ at the roller, which is vertical because the roller track is horizontal. Replace the distributed load by its resultant, $20 \times 6 = 120\ \mathrm{kN}$ acting at mid-span, $3\ \mathrm{m}$ from $A$.

Moments about $A$ eliminate $A_x$ and $A_y$ in one stroke:
$$
\textstyle \sum M_A = N_B \times 6 - 40 \times 1.5 - 120 \times 3 = 0
\quad\Longrightarrow\quad
N_B = \frac{60 + 360}{6} = 70.0\ \mathrm{kN} .
$$
Vertical forces:
$$
\textstyle \sum F_y = A_y + 70.0 - 40 - 120 = 0
\quad\Longrightarrow\quad
A_y = 90.0\ \mathrm{kN} .
$$
Horizontal forces: $A_x = 0$, since no load has a horizontal component.

*Check*, taking moments about $B$:
$$
\textstyle \sum M_B = -A_y \times 6 + 40 \times 4.5 + 120 \times 3 = -540 + 180 + 360 = 0 . \checkmark
$$
*Sanity.* The total downward load is $160\ \mathrm{kN}$ and the reactions sum to $160\ \mathrm{kN}$. The nearer support carries more: $A$ is closer to both load resultants, and $90 > 70$. Moving the point load to mid-span would give $80$ and $80$; moving it to $B$ would give $60$ and $100$. All consistent.
:::
:::

::: example Bracket with a cable and a pin {#ex-bracket}
A horizontal boom $AB$ of length $3\ \mathrm{m}$ is pinned to a wall at $A$ and held by a cable from $B$ to a point $C$ on the wall $2\ \mathrm{m}$ above $A$. A load of $10\ \mathrm{kN}$ hangs at $B$. Find the cable tension and the reaction at $A$. Neglect the boom's weight.
::: solution
The boom is a three-force body: the load at $B$, the cable tension along $BC$, and the pin reaction at $A$. The cable makes
$$
\theta = \arctan \frac{2}{3} = 33.7^{\circ} \quad \text{with the horizontal}, \qquad
\sin\theta = 0.5547, \quad \cos\theta = 0.8321 .
$$
Take moments about $A$, which eliminates the pin reaction entirely. Only the vertical component of the tension has a moment arm about $A$ (the horizontal component acts along the boom, whose line passes through $A$):
$$
\textstyle \sum M_A = T \sin\theta \times 3 - 10 \times 3 = 0
\quad\Longrightarrow\quad
T \sin\theta = 10 \quad\Longrightarrow\quad T = \frac{10}{0.5547} = 18.03\ \mathrm{kN}.
$$
Then
$$
\textstyle \sum F_x = A_x - T \cos\theta = 0 \quad\Longrightarrow\quad A_x = 18.03 \times 0.8321 = 15.0\ \mathrm{kN}\ \text{(towards the wall)},
$$
$$
\textstyle \sum F_y = A_y + T \sin\theta - 10 = A_y + 10 - 10 = 0 \quad\Longrightarrow\quad A_y = 0 .
$$
The pin carries $15.0\ \mathrm{kN}$ horizontally and nothing vertically, so the boom is in pure compression of $15.0\ \mathrm{kN}$ and the cable's vertical component alone holds the load.

*Check.* The three forces must be concurrent for a three-force body. The load at $B$ is vertical and the cable passes through $B$; the pin reaction's line must therefore also pass through $B$ — and it does, since $A_y = 0$ makes the pin force horizontal along $AB$, which contains $B$. The geometry confirms the algebra.

*Sanity.* Lowering $C$ to $1\ \mathrm{m}$ above $A$ gives $\sin\theta = 0.316$ and $T = 31.6\ \mathrm{kN}$, $75$ per cent more, with the same $10\ \mathrm{kN}$ held. A shallow cable is a bad cable, exactly as in [[statics/particle-equilibrium]].
:::
:::

::: example A beam loaded by a couple {#ex-couple-beam}
A beam $4\ \mathrm{m}$ long is pinned at $A$ and on a roller at $B$, and carries a clockwise applied couple of $60\ \mathrm{kN\,m}$ at mid-span. Find the reactions.
::: solution
There is no vertical load at all, yet the reactions are not zero: a couple can only be balanced by another couple, which here is provided by the two support forces.
$$
\textstyle \sum M_A = N_B \times 4 - 60 = 0 \quad\Longrightarrow\quad N_B = 15\ \mathrm{kN}\ \text{up},
$$
$$
\textstyle \sum F_y = A_y + 15 = 0 \quad\Longrightarrow\quad A_y = -15\ \mathrm{kN},
$$
so $A$ pulls *down* with $15\ \mathrm{kN}$. The two reactions form a counter-couple of $15 \times 4 = 60\ \mathrm{kN\,m}$, equal and opposite to the applied one.

*The design point.* A support that can only push upwards — a bearing pad sitting on a plinth, a sleeper under a rail — cannot supply the $15\ \mathrm{kN}$ downward force, and the beam lifts off. Any structure carrying a significant applied moment needs **hold-down bolts** at one support. This is why a gantry rail joint is bolted down and not merely rested, and why baseplates under moment-resisting columns have bolts in tension.
:::
:::

::: widget plot
f: 90 - 40*heaviside(x-1.5) - 20*x
x: 0, 6
y: -80, 100
labels: \text{shear force } V(x) \text{ in the beam of Example 1}
caption: Shear force along the $6\ \mathrm{m}$ beam of Example 1, $V(x) = 90 - 40\langle x - 1.5 \rangle^{0} - 20 x$ in $\mathrm{kN}$, with its $40\ \mathrm{kN}$ jump under the point load at $x = 1.5\ \mathrm{m}$. The value at the left end is the reaction $A_y = 90\ \mathrm{kN}$ and the value at the right end is $-70\ \mathrm{kN}$, minus the reaction $N_B$; the point where $V$ crosses zero, at $x = 2.5\ \mathrm{m}$, is where the bending moment is greatest ($122.5\ \mathrm{kN\,m}$). Reading reactions off a shear diagram's endpoints is a useful check in the other direction.
:::

## Two-force and three-force members

::: proposition Two-force members {#prop-two-force}
A member subjected to forces at exactly two points, and nowhere else (including no applied couples and negligible weight), carries forces that are equal, opposite and **collinear along the line joining the two points**. Its internal force is a single axial force, in tension or compression, whatever the member's shape.
:::

::: proof
Force equilibrium gives $\mathbf{F}_1 + \mathbf{F}_2 = \mathbf{0}$, so $\mathbf{F}_2 = -\mathbf{F}_1$. Moment equilibrium about point 1 gives $\mathbf{r}_{12} \times \mathbf{F}_2 = \mathbf{0}$, so $\mathbf{F}_2$ is parallel to $\mathbf{r}_{12}$, the vector from point 1 to point 2. Hence both forces lie along the line joining the two points. The argument never used the member's shape, which is why a bent tie rod and a straight one behave identically as long as the pins are in the same places — and why a member that carries a load *between* its pins, or its own significant weight, is not a two-force member and must be drawn as a beam.
:::

::: example Frame with an internal hinge {#ex-hinge-frame}
Two members $AE$ and $EB$ are pin-connected at $E$. $A$ and $B$ are pins $6\ \mathrm{m}$ apart on the same level, and $E$ is $4\ \mathrm{m}$ above the line $AB$, $3\ \mathrm{m}$ horizontally from $A$. A vertical load of $20\ \mathrm{kN}$ acts at the midpoint of $AE$. Find the reactions and the hinge force.
::: solution
**Whole structure.** $B$ is a pin, so there are four reaction components and only three equations — but member $EB$ carries forces only at $E$ and $B$, so it is a **two-force member** and its force is directed along $EB$. The direction $E \to B$ is $(3, -4) / 5$, so the reaction at $B$ has components proportional to $(-0.6, 0.8)$ times a scalar $s$ (compression towards $E$). Moments about $A$ for the whole structure:
$$
\textstyle \sum M_A = 6 \times (0.8 s) - 1.5 \times 20 = 0
\quad\Longrightarrow\quad
4.8 s = 30 \quad\Longrightarrow\quad s = 6.25\ \mathrm{kN},
$$
$$
B_x = -0.6 \times 6.25 = -3.75\ \mathrm{kN}, \qquad B_y = 0.8 \times 6.25 = 5.00\ \mathrm{kN}.
$$
Then
$$
\textstyle \sum F_x = A_x - 3.75 = 0 \quad\Longrightarrow\quad A_x = 3.75\ \mathrm{kN},
\qquad
\sum F_y = A_y + 5.00 - 20 = 0 \quad\Longrightarrow\quad A_y = 15.0\ \mathrm{kN}.
$$
The reaction at $A$ has magnitude $\sqrt{3.75^{2} + 15.0^{2}} = 15.5\ \mathrm{kN}$, and the hinge at $E$ transmits $s = 6.25\ \mathrm{kN}$ along $EB$.

*Check on member $AE$ alone.* Forces on $AE$: $(3.75, 15.0)$ at $A(0,0)$, $(0, -20)$ at $(1.5, 2)$, and $( -3.75, 5.0)$ at $E(3, 4)$.
$$
\textstyle \sum F_x = 3.75 - 3.75 = 0, \qquad \sum F_y = 15.0 - 20 + 5.0 = 0 ,
$$
$$
\textstyle \sum M_A = [3 \times 5.0 - 4 \times (-3.75)] + [1.5 \times (-20)] = (15 + 15) - 30 = 0 . \checkmark
$$
*Sanity.* The load is nearer $A$ than $B$ in the horizontal sense, and $A_y = 15 > B_y = 5$ in the ratio $3 : 1$, which is the inverse ratio of the horizontal distances $1.5 : 4.5$. Correct.
:::
:::

::: warning Do not "take moments of a whole structure" about a point on a member you intend to cut
When a structure is isolated whole, internal pin forces do not appear and cannot be found; when it is cut, the cut face must carry the internal force and its moment. Mixing the two — writing an equation that contains a reaction from the whole-structure diagram and an internal force from a member diagram — produces an equation that means nothing. Every equation must come from one free-body diagram. If you find yourself reaching for a symbol from a different diagram, stop and redraw.
:::

## Three-dimensional equilibrium

::: definition Six equations, and the reactions they give {#def-3d}
A rigid body in space has six equilibrium equations, $\sum F_x = \sum F_y = \sum F_z = 0$ and $\sum M_x = \sum M_y = \sum M_z = 0$. The space catalogue of single constraints is:

| Constraint | Prevents | Reaction components |
|---|---|---|
| Roller / smooth surface | translation normal to the surface | 1 |
| Ball-and-socket | translation in any direction | 3 |
| Single hinge about a known axis | translation, and rotation about the two axes perpendicular to the hinge axis | 5 (3 forces + 2 moments perpendicular to the hinge axis) |
| Fixed (built-in) | all motion | 6 |
| Short link (two-force member) | translation along its own axis | 1 |

A body needs six independent constraints, and as in a plane they must be arranged so that no motion is left free and none is restrained twice.
:::

::: example Crate under a side push: tipping {#ex-crate}
A crate of weight $W = 8\ \mathrm{kN}$, uniform, sits on a horizontal floor and is pushed at its top edge by a horizontal force $P = 3\ \mathrm{kN}$. The crate is $1.2\ \mathrm{m}$ wide and $1.5\ \mathrm{m}$ high. Find the normal reaction and its line of action, and determine whether the crate tips.
::: solution
Model the crate as a rigid body in a plane (the problem is uniform in the third direction). Four unknowns appear if the floor is modelled as a distributed contact, so the contact must be reduced: a rigid crate on a rigid floor has either one contact patch at each bottom edge (two vertical reactions, no horizontal because the floor is smooth) or one patch at one edge if it is just tipping. Take the smooth-floor model with reactions $N_1$ and $N_2$ at the two bottom corners, $A$ (left, on the side from which $P$ pushes) and $B$ (right, the edge about which the crate would tip), $1.2\ \mathrm{m}$ apart, and a frictionless floor so no horizontal reaction.

Horizontal equilibrium then requires $P$ to be balanced by nothing — so the floor cannot be smooth, and the horizontal reaction is friction. Take the crate on the point of tipping about $B$ to find the critical $P$:
$$
\textstyle \sum M_B = P \times 1.5 - W \times 0.6 = 0
\quad\Longrightarrow\quad
P_{\text{tip}} = \frac{8 \times 0.6}{1.5} = 3.20\ \mathrm{kN}.
$$
The applied $P = 3\ \mathrm{kN}$ is $94$ per cent of the tipping value, so the crate does not tip but comes close. With $P = 3\ \mathrm{kN}$ the normal reaction's line of action has moved from the centreline towards $B$; taking moments about the centreline $G$ at the base,
$$
N_{\text{total}} = 8\ \mathrm{kN}, \qquad
e = \frac{P \times 1.5}{W} = \frac{4.5}{8} = 0.5625\ \mathrm{m} \ \text{from the centreline towards } B,
$$
which is $0.6 - 0.5625 = 0.0375\ \mathrm{m}$ inside the edge $B$. The whole $8\ \mathrm{kN}$ is carried within $38\ \mathrm{mm}$ of the edge $B$.

*Sanity.* The tipping ratio is $P / W = b / (2 h) = 1.2 / 3.0 = 0.40$: a crate this shape tips at $40$ per cent of its weight in side thrust. Widen the base to $1.8\ \mathrm{m}$ and the ratio becomes $0.60$, a $50$ per cent improvement for a $50$ per cent increase in width — the reason shipping containers are stacked wide and low, and the reason a forklift has a wheelbase rather than a wheeltrack doing the work.
:::
:::

::: history
The conditions of equilibrium of a rigid body — zero resultant force and zero resultant moment — were assembled from Stevin's composition of forces and Varignon's theorem of moments, and put into analytic form by Euler, whose *Découverte d'un nouveau principe de mécanique* (written 1750) wrote Newton's second law as component equations and whose *Theoria motus corporum solidorum seu rigidorum* (1765) split the motion of a rigid body into translation of the centre of mass and rotation about it. Euler also met the first statically indeterminate problem: in a memoir of 1773 on a table standing on four legs he observed that statics alone cannot share the load between the legs, and he resolved it by allowing the floor to deform. The counting rule for determinacy belongs to the nineteenth century: Möbius showed in his *Lehrbuch der Statik* (1837) that a plane framework of $n$ joints needs $2n - 3$ bars to be rigid, Rankine's *Manual of Applied Mechanics* (1858) gave a graphical treatment of framed structures, and Clerk Maxwell's 1864 paper *On the calculation of the equilibrium and stiffness of frames* stated the counting rule for plane and space frames and introduced the reciprocal theorem of structural analysis. Maxwell's rule is the ancestor of every determinacy check in structural analysis and of the matrix methods of the twentieth century.
:::

::: quiz
A plane rigid body is supported by four reaction components. What does that imply?
- [ ] The reactions can be found from equilibrium alone
- [x] The problem is statically indeterminate
- [ ] The body is a mechanism
- [ ] One reaction must be zero
::: solution
Four unknowns and three equations means the reactions cannot all be found from equilibrium: the problem is **statically indeterminate** to the first degree and needs a compatibility condition involving the body's stiffness, which is the subject of [[mechanics-of-materials/beam-deflection]]. Fewer than three components leaves a mechanism; exactly three, properly arranged, is determinate. The count is a necessary condition, not a sufficient one — three parallel reactions still leave a mechanism even though the count is right.
:::
:::

## Where this leads

Reactions found here become the shear force and bending moment diagrams of [[statics/centroids-distributed-loads]] and the internal force resultants of [[solid-mechanics/stress-strain-3d]]. The same equations applied to a body on the point of sliding give [[statics/friction]]. Frames and machines are the subject of [[statics/trusses]] and [[statics/frames-machines]]. When the count of reactions exceeds the count of equations the problem becomes statically indeterminate and needs the deformation of [[mechanics-of-materials/beam-deflection]].

::: summary
- A rigid body in a plane needs three equilibrium equations, $\sum F_x = \sum F_y = \sum M_O = 0$; in space, six.
- If the resultant force is zero, the moment is the same about every point, so the moment centre may be chosen freely and alternative equation sets are valid.
- Count reaction components against equations: equal means determinate, more means indeterminate, fewer means a mechanism.
- Two-force members carry force along the line joining their pins whatever their shape; three-force bodies have concurrent lines of action.
- Take moments where unknowns cross, and always check with an equation you have not used.
- An applied couple requires a force couple in the reactions, which means hold-down at one support.
:::

## Exercises

::: exercise Cantilever {level=1 check="60"}
A cantilever of length $2\ \mathrm{m}$ carries a downward point load of $30\ \mathrm{kN}$ at the free end. What is the moment reaction at the fixed support? (Enter the answer in $\mathrm{kN\,m}$.)
::: solution
$M = 30 \times 2 = 60\ \mathrm{kN\,m}$, counteracting the load's moment. The fixed support also takes a vertical force of $30\ \mathrm{kN}$ and, if the load is not vertical, a horizontal one. A cantilever is statically determinate because the fixed support supplies exactly the three components a plane problem needs.
:::
:::

::: exercise Overhanging beam {level=1 check="-15"}
A beam is supported at $A$ ($x = 0$) and $B$ ($x = 4\ \mathrm{m}$), with a $1\ \mathrm{m}$ overhang beyond $B$. A downward load of $60\ \mathrm{kN}$ acts at the tip of the overhang. What is the vertical reaction at $A$? (Enter the answer in kN, up positive.)
::: solution
Moments about $B$ eliminate $B_y$. The load is $1\ \mathrm{m}$ beyond $B$ and $A$ is $4\ \mathrm{m}$ behind it, so
$$
\textstyle \sum M_B = -A_y \times 4 + 60 \times 1 = 0
\quad\Longrightarrow\quad
A_y = +15\ \mathrm{kN}\ \text{downwards} = -15\ \mathrm{kN}\ \text{(up positive)} .
$$
Then $\sum F_y = 0$ gives $B_y = 60 + 15 = 75\ \mathrm{kN}$ upward. Check by moments about $A$: $75 \times 4 - 60 \times 5 = 300 - 300 = 0$.

The overhang lifts the span end, so support $A$ must hold the beam *down*. A bearing pad that can only push upwards would let the beam fall off its seat, which is the practical lesson and the reason bridge bearings on overhanging spans are anchored.
:::
:::

::: exercise Reactions of a beam with a couple {level=1 check="20"}
A beam $5\ \mathrm{m}$ long, pinned at one end and on a roller at the other, carries a couple of $100\ \mathrm{kN\,m}$. What is the magnitude of each reaction? (Enter the answer in kN.)
::: solution
The reactions form a couple equal and opposite to the applied one: $R \times 5 = 100$, so $R = 20\ \mathrm{kN}$, one up and one down. There is no vertical load, so the two reactions are equal and opposite.
:::
:::

::: exercise Ladder {level=2}
A uniform ladder of weight $W$ leans against a smooth vertical wall and rests on a rough horizontal floor of coefficient of friction $\mu = 0.4$. Find the least angle with the horizontal at which it stands without slipping.
::: solution
Let $L$ be the length and $\theta$ the angle with the horizontal. Forces: weight $W$ at mid-length, the wall reaction $N_w$ horizontal at the top, the floor reaction with vertical component $N_f$ and friction $F = \mu N_f$ at the foot.
$$
\textstyle \sum F_y = N_f - W = 0 \quad\Longrightarrow\quad N_f = W,
$$
$$
\textstyle \sum F_x = F - N_w = 0 \quad\Longrightarrow\quad N_w = \mu W ,
$$
$$
\textstyle \sum M_{\text{foot}} = N_w L \sin\theta - W \frac{L}{2} \cos\theta = 0
\quad\Longrightarrow\quad
\mu W \sin\theta = \frac{W}{2} \cos\theta .
$$
Hence
$$
\tan\theta_{\min} = \frac{1}{2 \mu} = \frac{1}{0.8} = 1.25
\quad\Longrightarrow\quad
\theta_{\min} = 51.3^{\circ}.
$$
*Sanity.* The familiar "one in four" ladder rule — put the foot one quarter of the working height out from the wall — corresponds to $\tan\theta = 4$, $\theta = 76^{\circ}$, comfortably above $51.3^{\circ}$, and it also keeps the ladder's line of thrust well inside the friction cone. On a smooth floor $\mu = 0$ and no angle works: a ladder cannot stand against a smooth wall on a smooth floor at any angle.
:::
:::

::: exercise Three-hinged frame {level=2}
A three-hinged portal frame has pins at the two supports $A$ and $B$, $8\ \mathrm{m}$ apart, a hinge at the crown $4\ \mathrm{m}$ above the supports, and carries a vertical load of $40\ \mathrm{kN}$ at a point $3\ \mathrm{m}$ horizontally from $A$ on the left rafter. Find the reactions.
::: solution
Whole frame: $\sum M_A = 0$ gives $B_y \times 8 - 40 \times 3 = 0$, so $B_y = 15\ \mathrm{kN}$ and $A_y = 25\ \mathrm{kN}$. Horizontal: $A_x + B_x = 0$, so the two are equal and opposite.

The crown hinge supplies the extra condition: the moment about $C$ of the forces on either side is zero. For the right half, whose only loads are $B_y = 15\ \mathrm{kN}$ and $B_x$ at $B$, with $C$ at $4\ \mathrm{m}$ horizontally and $4\ \mathrm{m}$ vertically from $B$,
$$
\textstyle \sum M_C^{\text{right}} = 15 \times 4 - B_x \times 4 = 0
\quad\Longrightarrow\quad
B_x = 15\ \mathrm{kN}, \qquad A_x = 15\ \mathrm{kN}\ \text{inwards}.
$$
*Check on the left half:* $A_y = 25$ at $4\ \mathrm{m}$ horizontally from $C$, the $40\ \mathrm{kN}$ load $1\ \mathrm{m}$ horizontally from $C$, $A_x = 15$ at $4\ \mathrm{m}$ below $C$:
$$
\textstyle \sum M_C^{\text{left}} = 25 \times (-4) + 40 \times 1 + 15 \times 4 = -100 + 40 + 60 = 0 . \checkmark
$$
*Sanity.* The horizontal thrust of $15\ \mathrm{kN}$ exists even though no horizontal load is applied — an arch or a portal with a hinge must thrust, and its foundation must resist it. This is the reason a three-hinged arch needs a tie rod or a heavy footing, and why a "simply supported" portal frame is rarely drawn with a hinge at the crown unless the thrust is intended to be taken.
:::
:::

::: exercise Two-force member identification {level=2}
In the frame of Example 4, replace the load position so that the $20\ \mathrm{kN}$ load acts at the midpoint of $EB$ instead. Find the reactions and state whether $EB$ is still a two-force member.
::: solution
$EB$ is **no longer** a two-force member, because it now carries three forces: at $E$, at $B$ and at the load point. Its force is not along $EB$, and the four reaction components must be found from four equations — three for the whole structure and one from the hinge at $E$ (the moment about $E$ of the forces on $AE$ is zero, and $AE$ now carries only the forces at $A$ and $E$).

Member $AE$ is now the two-force member, so the reaction at $A$ is along $AE$: direction $(3, 4) / 5$, giving $A_x = 0.6 a$ and $A_y = 0.8 a$. Whole-structure equations:
$$
\textstyle \sum M_A = 6 B_y - 4.5 \times 20 = 0 \quad\Longrightarrow\quad B_y = 15\ \mathrm{kN},
$$
$$
\textstyle \sum F_y = 0.8 a + 15 - 20 = 0 \quad\Longrightarrow\quad a = 6.25\ \mathrm{kN}, \qquad A_x = 3.75\ \mathrm{kN}, \quad A_y = 5.00\ \mathrm{kN},
$$
$$
\textstyle \sum F_x = 3.75 + B_x = 0 \quad\Longrightarrow\quad B_x = -3.75\ \mathrm{kN}.
$$
The numerical reactions are the same as before, transposed between the two supports, because the load has moved to the mirror position in the horizontal sense. The important difference is that the *member* $EB$ now bends: it must be designed as a beam-column, not as a link. Identifying which members bend and which do not is the first job in framing, and it changes the answer to "what is this member?" rather than "what is the load?".
:::
:::

::: exercise Space equilibrium {level=3}
A uniform rectangular plate of weight $600\ \mathrm{N}$ lies in a horizontal plane, measuring $1.2\ \mathrm{m}$ by $0.9\ \mathrm{m}$, with corners $O(0, 0, 0)$, $A(1.2, 0, 0)$, $B(1.2, 0.9, 0)$ and $C(0, 0.9, 0)$. It is supported by a ball-and-socket at $O$ and by three vertical links at $A$, $B$ and $C$. Find the force in each link.
::: solution
The ball at $O$ gives three components and the three links give three more: six unknowns and six equations. The links are vertical, so each force is $(0, 0, F_i)$. Vertical equilibrium and the two moment equations about horizontal axes through $O$ are the only ones that involve the link forces (the other three give $O_x = O_y = 0$ and are trivially satisfied):
$$
\textstyle \sum F_z = O_z + F_A + F_B + F_C - 600 = 0 ,
$$
$$
\textstyle \sum M_x = 0.9 F_B + 0.9 F_C - 600 \times 0.45 = 0
\quad\Longrightarrow\quad
F_B + F_C = 300 ,
$$
$$
\textstyle \sum M_y = -1.2 F_A - 1.2 F_B + 600 \times 0.6 = 0
\quad\Longrightarrow\quad
F_A + F_B = 300 .
$$
That is three equations for the four vertical unknowns $O_z$, $F_A$, $F_B$, $F_C$: any value of $F_B$ gives $F_A = F_C = 300 - F_B$ and $O_z = F_B$, so the system is **statically indeterminate** to the first degree. The sixth equation, $\sum M_z = 0$, contains no unknown at all.

The reason is geometric. The ball at $O$ and the three vertical links between them supply four vertical reactions but nothing that can resist rotation about the vertical axis through $O$, so the plate is at once indeterminate (in the vertical load sharing) and partially constrained (it can spin about $O$). Physically, the load at the centre can be carried entirely by the diagonal pair $A$ and $C$ ($F_A = F_C = 300\ \mathrm{N}$, $F_B = O_z = 0$), entirely by the other diagonal pair $O$ and $B$, or by any mix. Removing the link at $B$ makes the vertical problem determinate ($F_A = F_C = 300\ \mathrm{N}$, $O_z = 0$), and adding a horizontal link, for example at $A$ in the $y$-direction, removes the free rotation.

*Design lesson.* Six reaction components do not guarantee determinacy: the constraints must be *independent*. Parallel supports are the classic trap, and the check is to ask whether the constraint set can resist each of the six motions.
:::
:::

::: exercise Design: hold-down {level=3}
A sign $2.4\ \mathrm{m}$ wide by $1.2\ \mathrm{m}$ deep is carried by two identical side frames, one at each end of the sign; each frame has a front post and a back post $2.0\ \mathrm{m}$ apart in the direction of the wind, and the sign's centre is $3.5\ \mathrm{m}$ above the ground. Wind pressure is $0.8\ \mathrm{kN/m^{2}}$ normal to the face. The structure weighs $6\ \mathrm{kN}$, acting on the centreline. Find the maximum uplift and the maximum compression in the post bases, and state the implication for the foundations.
::: solution
The wind force is $P = 0.8 \times 2.4 \times 1.2 = 2.30\ \mathrm{kN}$, acting at a height of $3.5\ \mathrm{m}$ and shared equally by the two posts, so each side frame takes $1.15\ \mathrm{kN}$ at $3.5\ \mathrm{m}$.

Consider one side frame: horizontal force $1.15\ \mathrm{kN}$ at $3.5\ \mathrm{m}$, weight $3\ \mathrm{kN}$ on the centreline midway between the posts, posts $2.0\ \mathrm{m}$ apart. Overturning moment about the leeward base:
$$
M_O = 1.15 \times 3.5 = 4.03\ \mathrm{kN\,m}, \qquad \text{restoring moment} = 3 \times 1.0 = 3.00\ \mathrm{kN\,m}.
$$
The overturning moment exceeds the restoring moment, so the windward base must be held **down**. Taking moments about the leeward base, with $R_{\text{windward}}$ the upward reaction at the windward base $2.0\ \mathrm{m}$ upwind,
$$
\textstyle \sum M_{\text{leeward}} = R_{\text{windward}} \times 2.0 - 3 \times 1.0 + 1.15 \times 3.5 = 0
\quad\Longrightarrow\quad
R_{\text{windward}} = -\frac{4.03 - 3.00}{2.0} = -0.51\ \mathrm{kN},
$$
an uplift of $0.51\ \mathrm{kN}$ that the windward foundation must resist, and $R_{\text{leeward}} = 3 + 0.51 = 3.51\ \mathrm{kN}$ of compression at the leeward base.

*Implication.* A base plate resting under its own weight cannot resist $0.51\ \mathrm{kN}$ of uplift, so the frame would rock and the holding-down bolts would fatigue. Each post needs at least two bolts rated for the uplift with the usual factor of safety, grouted so that the compression is taken by the concrete and the tension by the bolts, and the design must check the *reversal*, not the maximum compression. This is the everyday reason sign posts, gantries and light masts are bolted rather than bedded, and why the bolt group is checked in the load combination where the wind is on the *back* of the sign.
:::
:::
