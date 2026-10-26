A structure holds a load; a mechanism moves one part in a prescribed way relative to another. The first question this course asks about any assembly of rigid bodies is therefore an arithmetic one: **given a set of links and a set of connections between them, how many independent coordinates are needed to fix the position of every part?** That number is the mechanism's **degrees of freedom** or **mobility** $M$, and it is the first number you compute about any linkage because it tells you what you are looking at. $M = 0$ is a structure; $M = 1$ is a mechanism that one motor or one hand can drive; $M = 2$ needs two inputs (or one input and a spring, a stop or a second load) before its motion is determined; and $M < 0$ is an over-constrained frame that can be assembled only if its parts are made to consistent dimensions and that carries locked-in stress if they are not.

The counting rule is short — one line of arithmetic — and dates from the 1880s. It is known as the **Gruebler–Kutzbach criterion**, and much of this lesson is about when it gives the wrong answer and why. It fails not through bad arithmetic but because of geometry: **the rule counts constraint equations, and in special geometries some of those equations repeat one another.**

::: warning Six mobility errors that cost a prototype
**Counting a compound hinge as one joint.** Where three links meet at one pin there are **two** turning pairs, not one: the second and third links each turn relative to the first. Counting the pin once undercounts $J_1$ by one and overstates the planar mobility by two. The usual rule — where $n$ links meet at a pin, count $n - 1$ joints — is worth memorising because the error is invisible on a drawing.

**Counting a rigid triangle as three links.** A ternary link drawn as a triangle of three bars welded or bolted at the corners is **one** rigid body. Counting its three sides as three links pinned together adds two links and three joints, and $3 \times 2 - 2 \times 3 = 0$ — the count happens to come out the same because a pin-jointed triangle is itself a structure. It stops coming out the same as soon as one corner of the "triangle" is also a joint to another link, so the safe habit is to identify the rigid bodies first.

**Forgetting an idle freedom.** A roller follower spins about its own pin; the spin transmits no motion and is called an **idle**, **passive** or **redundant** degree of freedom. The formula counts it, so a cam with a roller follower comes out at $M = 2$ when it has one useful freedom. The clean way to handle it is to **weld the roller to its arm and recount**, which gives a count you can check, rather than to subtract one from the answer.

**Believing the formula about special geometry.** The criterion assumes generic dimensions. A parallelogram four-bar is fine ($M = 1$), but add a third parallel link of the same length — as in the coupling rods of a steam locomotive or a parallel-link drafting machine — and the count gives $N = 5$, $J_1 = 6$, $M = 3(4) - 12 = 0$ for a linkage that plainly moves. The third link's constraint is **redundant**: equal lengths make it duplicate what the other two already enforce. Made with lengths that differ by a few tenths of a millimetre, the same linkage binds.

**Applying the planar formula to a spatial mechanism.** The planar criterion gives every link three coordinates; a spatial link has six. A Hooke (universal) joint coupling two shafts at an angle, or a Stewart platform, cannot be counted with $3(N-1) - 2J_1$ at all; use the spatial form and the freedoms of the actual pairs.

**Choosing a mechanism by mobility alone.** A linkage with $M = 1$ can still pass through a **toggle** or **dead-centre** position at which the output cannot be driven from the input — the transmission angle is zero and the required input force is unbounded. A four-bar whose rocker is the input and whose crank is the output (as in a treadle) stalls at the two dead centres unless a flywheel carries it through. The same geometry is used deliberately in toggle clamps and presses, where a very large force is wanted near the end of the stroke.
:::

## Counting

::: definition Kinematic pairs and links {#def-pairs}
**A link is a rigid body**; a **kinematic pair** is a connection between two links that permits a definite relative motion. **A lower pair** is a surface contact — turning (revolute), prismatic, cylindrical, spherical, planar, helical — and **a higher pair** is a line or point contact — a gear tooth on a gear tooth, a cam on a follower, a wheel on a rail.

$$
\begin{array}{l c c l}
\text{Pair} & \text{Space } f & \text{Planar } f & \text{Relative motion} \\
\text{Rigid (welded)} & 0 & 0 & \text{none — the two are one link} \\
\text{Turning (revolute)} & 1 & 1 & \text{rotation about a fixed axis} \\
\text{Prismatic (sliding)} & 1 & 1 & \text{translation along a fixed axis} \\
\text{Helical (screw)} & 1 & - & \text{rotation coupled to translation} \\
\text{Cylindrical} & 2 & - & \text{rotation and translation, independent} \\
\text{Planar} & 3 & - & \text{translation and rotation in a plane} \\
\text{Spherical (ball)} & 3 & - & \text{three rotations} \\
\text{Rolling contact, no slip (higher)} & 3 & 1 & \text{planar: rolling only} \\
\text{Point contact, rolling and sliding (higher)} & 5 & 2 & \text{planar: rolling and sliding}
\end{array}
$$

**Reading the two $f$ columns.** In a **planar** mechanism every free link has three coordinates — $x$, $y$, $\theta$ — and a turning or prismatic pair removes two of them, leaving one relative freedom. **A planar higher pair that rolls without slipping also removes two** (the contact point cannot separate and cannot slip), so it counts as a one-freedom pair; **a higher pair whose surfaces may both roll and slide removes only one** — the contact can move along the common tangent — and counts as a two-freedom pair, $J_2$. Gear teeth and cam–follower contacts slide as well as roll, so each mesh or cam contact is counted as one $J_2$.

**The counting conventions that decide whether your answer is right.**

$$
\begin{array}{l l}
\text{Compound hinge} & n \text{ links at one pin } = n - 1 \text{ turning pairs} \\
\text{Rigid sub-triangle} & \text{counts as one link, whatever its shape} \\
\text{Half joint} & \text{a higher pair with rolling and sliding; counts as } J_2 = 1 \\
\text{Idle rotation} & \text{weld the spinning member and recount} \\
\text{Redundant constraint} & \text{a joint whose constraint is already implied by the geometry} \\
\text{Frame} & \text{the fixed link is one of the } N \text{ links}
\end{array}
$$

**Counting a six-bar.** A **Watt** six-bar has two ternary links and four binary links — six links in all, one of them the frame — joined by **seven** simple turning pairs, so $M = 3(5) - 2(7) = 1$. If the same chain is drawn with three links sharing one pin, that pin must be counted as two joints; counting it once gives $J_1 = 6$ and $M = 3$, a mechanism that apparently needs three inputs.
:::

::: definition The Gruebler–Kutzbach criterion {#def-kutzbach}
**For a planar mechanism** of $N$ links (including the frame) with $J_1$ one-freedom pairs and $J_2$ two-freedom pairs (half joints):

$$
\boxed{ M = 3 \left( N - 1 \right) - 2 J_1 - J_2 }
$$

**For a spatial mechanism** with $f_i$ the freedom of the $i$-th pair:

$$
\boxed{ M = 6 \left( N - 1 \right) - \sum_{i} \left( 6 - f_i \right) = 6 \left( N - 1 \right) - \sum c_i }
$$

**The criterion is a count, not a proof.** $M$ is the number of free coordinates left after subtracting the number of constraint equations; it equals the true mobility only if every constraint equation is independent of the others. It does not say which outputs are useful, and it does not guarantee that the mechanism can be assembled.

$$
\begin{array}{l c c c c l}
\text{Mechanism} & N & J_1 & J_2 & M & \text{Comment} \\
\text{Four-bar chain} & 4 & 4 & 0 & 1 & \text{the workhorse} \\
\text{Slider–crank} & 4 & 4 & 0 & 1 & \text{three turning pairs, one prismatic} \\
\text{Inverted slider–crank} & 4 & 4 & 0 & 1 & \text{same count, different machine} \\
\text{Five-bar chain} & 5 & 5 & 0 & 2 & \text{two inputs required} \\
\text{Six-bar, Watt} & 6 & 7 & 0 & 1 & \text{ternary links adjacent} \\
\text{Six-bar, Stephenson} & 6 & 7 & 0 & 1 & \text{ternary links separated} \\
\text{Geneva drive} & 3 & 2 & 1 & 1 & \text{pin in slot is the half joint} \\
\text{Cam, roller follower} & 4 & 3 & 1 & 2 & M = 1 \text{ after welding the roller} \\
\text{Gear pair} & 3 & 2 & 1 & 1 & \text{two shafts plus the mesh} \\
\text{Peaucellier cell, no crank} & 7 & 8 & 0 & 2 & \text{the cell alone has two freedoms} \\
\text{Peaucellier linkage, with crank} & 8 & 10 & 0 & 1 & \text{exact straight line} \\
\text{Double parallelogram} & 5 & 6 & 0 & 0 & M = 1 \text{ in fact; one redundant constraint} \\
\text{Triangle of three bars} & 3 & 3 & 0 & 0 & \text{a structure} \\
\text{Four-bar braced by both diagonals} & 6 & 8 & 0 & -1 & \text{over-constrained frame}
\end{array}
$$

**The three ways the count misleads.**
**One: passive freedoms.** A freedom that no input controls and no output feels — a roller's spin, or, in a spatial count, a binary link with a ball joint at each end spinning about its own axis. The count is then **too high** by the number of passive freedoms.
**Two: redundant constraints.** Constraint equations that duplicate one another because of special dimensions — equal and parallel links, parallel or concurrent axes. The count is then **too low** by the number of redundant constraints, and the real mobility is $M + r$. The double parallelogram is the standard example. A designer facing $M \le 0$ for something that should move should therefore ask whether the geometry is special before adding a joint — and remember that a redundant constraint that is satisfied only by exact dimensions becomes a real, stress-producing constraint when the parts are made with tolerances.
**Three: special configurations.** A mechanism can momentarily gain a freedom at a particular position: a four-bar with $s + l = p + q$ can fold flat, and at the folded position it can continue in either of two ways. Spatial linkages such as Bennett's and Bricard's move although the spatial count gives zero or less, because their dimensions satisfy special conditions throughout the motion.
:::

::: example Counting four mechanisms {#ex-count1}
Find the mobility of (a) a slider–crank, (b) a Watt six-bar, (c) a cam with a roller oscillating follower, and (d) a Geneva drive.
::: solution
**(a) Slider–crank.** Links: frame, crank, connecting rod, slider. $N = 4$. Joints: three turning pairs and one prismatic pair, all one-freedom: $J_1 = 4$, $J_2 = 0$.
$$
M = 3 \left( 4 - 1 \right) - 2 \left( 4 \right) = 9 - 8 = \mathbf{1}
$$
The slider is a link because it is a rigid body with its own position; the guide is not a separate link because it is part of the frame.
**(b) Watt six-bar.** Links: two ternary links and four binary links, one of the binary links being the frame: $N = 6$. Each ternary link has three pins and each binary link two, so the link-ends number $2 \times 3 + 4 \times 2 = 14$; every simple pin joins two link-ends, so
$$
J_1 = \frac{14}{2} = 7 \qquad \Rightarrow \qquad M = 3 \left( 5 \right) - 2 \left( 7 \right) = 15 - 14 = \mathbf{1}
$$
**The link-end count is a useful check.** Summing the number of pin holes on every link and halving it gives $J_1$ directly when every pin joins exactly two links; where three links share a pin, the three link-ends at that pin make two joints, not one and a half, so such pins must be counted separately.
**(c) Cam with roller oscillating follower.** Links: frame, cam, follower arm, roller. $N = 4$. Joints: cam–frame, arm–frame and roller–arm turning pairs, $J_1 = 3$; cam–roller contact, which can roll and slide, $J_2 = 1$.
$$
M = 3 \left( 3 \right) - 2 \left( 3 \right) - 1 = 9 - 6 - 1 = \mathbf{2}
$$
**The second freedom is the roller's spin about its own pin.** Weld the roller to its arm: $N = 3$, $J_1 = 2$, $J_2 = 1$:
$$
M = 3 \left( 2 \right) - 2 \left( 2 \right) - 1 = 6 - 4 - 1 = \mathbf{1}
$$
(If the roller is assumed to roll without slipping on the cam, the contact counts as a one-freedom pair, $J_1 = 4$, and $M = 9 - 8 = 1$ directly — the roller's spin is then tied to the cam's motion. Either model gives one useful freedom.)
**(d) Geneva drive.** Links: frame, driver (the crank with its pin and its locking disc, one rigid body) and the slotted wheel. $N = 3$. Joints: driver–frame and wheel–frame turning pairs, $J_1 = 2$. During indexing the pin slides and turns in the slot, a half joint, $J_2 = 1$:
$$
M = 3 \left( 2 \right) - 2 \left( 2 \right) - 1 = 6 - 4 - 1 = \mathbf{1}
$$
During the dwell the pin is out of the slot and the locking disc bears on a concave arc of the wheel instead — again one sliding contact, $J_2 = 1$, and again $M = 1$: the driver keeps turning while the wheel is held still. **The mobility is one throughout; what changes between the phases is which contact carries the constraint**, and at the two instants of transfer both contacts act together.
*Sanity.* All four answers are one useful freedom, which matches experience: each of these mechanisms is driven by a single motor. A four-slot Geneva indexes during $90^\circ$ of driver rotation and dwells during the other $270^\circ$, so its wheel is stationary for $75\ \%$ of the cycle — while the driver, and the mechanism's single freedom, keep moving.
:::
:::

## Geometry that the count cannot see

::: definition Grashof's condition and rotatability {#def-grashof}
**For a four-bar** with shortest link $s$, longest link $l$ and the other two $p$, $q$:

$$
\boxed{ s + l \; \le \; p + q \qquad \text{(Grashof condition: at least one link can rotate fully relative to the others)} }
$$

$$
\begin{array}{l l l}
\text{Grashof, shortest link is the frame} & \text{double-crank (drag-link)} & \text{both side links rotate fully} \\
\text{Grashof, shortest link adjacent to frame} & \text{crank–rocker} & \text{the shortest link is the crank} \\
\text{Grashof, shortest link is the coupler} & \text{double-rocker} & \text{the coupler rotates fully, both side links rock} \\
s + l = p + q & \text{change point} & \text{the links can fold flat; assembly mode can switch} \\
s + l > p + q & \text{non-Grashof triple-rocker} & \text{no link rotates fully}
\end{array}
$$

**Why the equality case needs care.** At $s + l = p + q$ the four links can lie along one line, and at that instant the mechanism has **two possible continuations**: it can carry on in its present assembly mode or switch into the other. Mechanisms that pass through such a position (some folding furniture, parallelogram and kite linkages) need a stop, a latch, a spring or enough inertia to choose the intended branch.

**Deriving the condition for a crank–rocker.** With crank $a$, coupler $b$, rocker $c$ and ground $g$, the diagonal from the crank pin to the rocker pivot has length $f$ with $f^2 = g^2 + a^2 - 2 g a \cos\theta$. The triangle coupler–rocker–diagonal can close only if $\left| b - c \right| \le f \le b + c$, and the crank can turn fully only if this holds for every $\theta$:

$$
\left( b - c \right)^2 \; \le \; g^2 + a^2 - 2 g a \cos\theta \; \le \; \left( b + c \right)^2 \quad \text{for every } \theta
$$

$f$ is smallest at $\theta = 0$ ($f = g - a$) and largest at $\theta = 180^\circ$ ($f = g + a$), so the two conditions are $g + a \le b + c$ and $g - a \ge \left| b - c \right|$. With the crank the shortest link these combine into $s + l \le p + q$. **The condition is thus a statement about the two extreme diagonals, the two instants at which the crank is in line with the ground.**
:::

::: definition Transmission angle and mechanical advantage {#def-transmission}
**The transmission angle** $\mu$ of a four-bar is the angle between the coupler and the output link at the joint where they meet. The coupler (a two-force member if it carries no other load) pushes along its own line, and only the component of that force perpendicular to the output link produces output torque; that component is proportional to $\sin \mu$. **Force is transmitted best at $\mu = 90^\circ$ and not at all at $\mu = 0$ or $180^\circ$.**

$$
\cos \mu = \frac{b^2 + c^2 - f^2}{2 b c}, \qquad f^2 = g^2 + a^2 - 2 g a \cos \theta
$$

**A common design rule is $40^\circ \le \mu \le 140^\circ$ over the working cycle** (some texts accept $30^\circ$ for slow, lightly loaded linkages). Below about $40^\circ$ the coupler force needed for a given output torque grows as $1 / \sin\mu$, the joint reactions and friction grow with it, and small clearances or friction can make the mechanism stick.

**The toggle.** Two equal links meeting at a knee, each inclined at a small angle $\alpha$ to the line joining their outer pins, convert a transverse force $F_{\mathrm{in}}$ at the knee into an axial force

$$
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \frac{1}{2 \tan \alpha} \to \infty \quad \text{as } \alpha \to 0
$$

(resolve the forces at the knee: each link carries $F_{\mathrm{out}} / \cos\alpha$, and the two transverse components $2 F_{\mathrm{out}} \tan\alpha$ balance $F_{\mathrm{in}}$). At $\alpha = 1^\circ$ the ideal ratio is $1 / (2 \tan 1^\circ) = 28.6$, so a $200\ \mathrm{N}$ push at the knee gives about $5.7\ \mathrm{kN}$ at the jaw — before friction and the elasticity of the frame, which in practice limit the force. **A toggle clamp holds because it is pushed just past the straight position against a stop**: the load then tends to drive the knee further against the stop, not back, so the clamp cannot be opened by the clamped load.

**Mechanical advantage by instant centres.** For an input link $2$ and an output link $4$, both pivoted to the frame $1$, the angular-velocity ratio is fixed by their relative instant centre $I_{24}$, which lies on the line through the two fixed pivots:

$$
\frac{\omega_{4}}{\omega_{2}} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}}
$$

**and the ideal torque ratio $T_4 / T_2$ is its reciprocal** (power in equals power out for a lossless mechanism). The method needs only a drawing of the mechanism in the position of interest, and it rests on the theorem below.

::: theorem Aronhold–Kennedy {#thm-kennedy}
**Three bodies in plane motion relative to one another have three instant centres, and the three lie on a straight line.**
**Proof sketch.** Take body $1$ as reference and let $P_{12}$ and $P_{13}$ be the centres of bodies $2$ and $3$ relative to it. Any point $Q$ of body $2$ has a velocity perpendicular to the line $P_{12} Q$, and any point of body $3$ coincident with $Q$ has a velocity perpendicular to $P_{13} Q$. The instant centre $P_{23}$ is the point at which the coincident points of bodies $2$ and $3$ have the **same** velocity. If $Q$ is off the line $P_{12} P_{13}$, the two velocity directions are different, so the velocities cannot be equal; hence $P_{23}$ must lie on the line $P_{12} P_{13}$. $\blacksquare$
**The number of instant centres** of an $N$-link mechanism is $\binom{N}{2} = N \left( N - 1 \right) / 2$: **four links have six, six links have fifteen, eight links have twenty-eight.** Those at pins are found by inspection; the rest come from Kennedy's theorem, each as the intersection of two lines through known centres.
:::
:::

::: widget plot
f: acos((20800-(10900-6000*cos(x*pi/180)))/19200)*180/pi
x: 0, 360
y: 30, 85
caption: The transmission angle of a four-bar with ground $100$, crank $30$, coupler $120$ and rocker $80$ millimetres, plotted against crank angle. **The minimum of $34.1^\circ$ occurs at $\theta = 0$ and the maximum of $78.3^\circ$ at $\theta = 180^\circ$** — the two positions in which the crank lies along the ground line and the diagonal $f$ is shortest and longest. The mechanism falls below the $40^\circ$ rule for part of every revolution. Notice that the curve depends only on ratios of lengths: scaling every link changes nothing, so the fix is to change the proportions — a shorter crank or a different coupler-to-rocker ratio — not the size.
:::

## Straight lines, dwell and the shape of motion

::: definition Straight-line and function-generating linkages {#def-straightline}
**A four-bar cannot draw an exact straight line.** A point on a four-bar's coupler traces a **coupler curve**, an algebraic curve of degree six, which can be made very flat over a limited span but cannot contain a straight segment. **An exact straight line needs either a sliding pair or a linkage of more links** — the Peaucellier–Lipkin and Hart linkages are the classic exact solutions.

$$
\begin{array}{l c c l}
\text{Mechanism} & N & J_1 & \text{Straightness} \\
\text{Watt's linkage} & 4 & 4 & \text{approximate (figure-eight curve, flat near its crossing)} \\
\text{Chebyshev's linkage} & 4 & 4 & \text{approximate} \\
\text{Roberts's linkage} & 4 & 4 & \text{approximate} \\
\text{Hart's inversor, with crank} & 6 & 7 & \text{exact} \\
\text{Peaucellier–Lipkin, with crank} & 8 & 10 & \text{exact} \\
\text{Scott Russell (with a slider)} & 4 & 4 & \text{exact, but uses a sliding pair}
\end{array}
$$

**The Peaucellier count.** The inversor cell consists of a rhombus of four equal bars and two equal long bars joining two opposite corners of the rhombus to a fixed pivot $O$: with the frame, $N = 7$. Joints: at $O$ three links meet (frame and both long bars), two joints; at each of the two rhombus corners joined to a long bar three links meet, two joints each; the other two corners, $P$ and $Q$, are simple pins:
$$
J_1 = 2 + 2 + 2 + 1 + 1 = 8 \qquad \Rightarrow \qquad M = 3 \left( 6 \right) - 2 \left( 8 \right) = 18 - 16 = 2
$$
**Two is correct:** $P$ can be put anywhere in an annulus, and $Q$ then sits at its inverse point, with $OP \cdot OQ$ constant. Adding a crank pivoted to the frame and pinned to $P$ adds one link and two joints (the crank's pivot, and a third link at $P$): $N = 8$, $J_1 = 10$, $M = 21 - 20 = 1$. If the crank's pivot is placed so that $P$'s circle passes through $O$, the inverse of that circle is a straight line, and $Q$ moves along it exactly.

**Chebyshev's linkage** is a crossed four-bar with ground $2$, two equal rockers of $2.5$ and a coupler of $1$ (in any unit); the midpoint of the coupler moves along a nearly straight line of length equal to the ground. Computing its path shows a deviation of about $0.005$ over a run of $2$ — roughly $0.25\ \%$ of the run. **Watt's linkage** — two equal rockers swinging in opposite senses, joined by a short coupler, the coupler's midpoint traced — is good near the middle and degrades quickly: with rockers of $1$ and a coupler of $0.5$, the computed deviation is about $0.0003$ over a vertical run of $0.4$ and $0.013$ over a run of $0.8$.

**Function generation.** A four-bar can be made to satisfy an input–output relation $\theta_4 = f \left( \theta_2 \right)$ exactly at a number of **precision points** equal to the number of design parameters. Freudenstein's equation (see [[mechanisms/position-analysis]]) has three link ratios; adding the two zero-angle datums of input and output gives five, so a four-bar can match a function at up to five points, with an error that oscillates in sign between them. Chebyshev's 1854 memoir on linkages is where the idea of choosing those points to minimise the largest error — minimax approximation — first appears.
:::

::: definition Intermittent motion {#def-intermittent}
$$
\begin{array}{l c l}
\text{Mechanism} & \text{Dwell fraction} & \text{Comment} \\
\text{Geneva, 4-slot} & 0.750 & \text{simple, positively locked during dwell} \\
\text{Geneva, 6-slot} & 0.667 & \text{lower peak acceleration} \\
\text{Geneva, 8-slot} & 0.625 & \text{lower still, shorter dwell} \\
\text{Ratchet and pawl} & \text{adjustable} & \text{friction-free stepping, but impact and noise} \\
\text{Cam indexer (globoid or parallel)} & \text{chosen by design} & \text{any motion law, locked during dwell} \\
\text{Servo-driven index} & \text{programmable} & \text{needs a brake or lock to hold}
\end{array}
$$

**The Geneva's velocity law.** For an $n$-slot Geneva with centre distance $a$ and crank radius $r = a \sin \left( 180^\circ / n \right)$ — the size that makes the pin enter each slot radially — and with the crank angle $\theta$ measured from the line of centres, the wheel's angular position during engagement is
$$
\psi = \arctan \frac{r \sin \theta}{a - r \cos \theta}, \qquad \left| \theta \right| \le 90^\circ - \frac{180^\circ}{n}
$$
**At entry and exit the pin moves along the slot, so the wheel's angular velocity is zero there and the wheel starts and stops without a velocity jump.** Its angular velocity is greatest at $\theta = 0$, when the pin is deepest in the slot. Its angular **acceleration**, however, jumps from zero to a finite value at entry and back at exit, so the jerk is theoretically infinite at both instants.

**The two design numbers.** The crank's engagement angle is $180^{\circ} - 360^{\circ} / n$, and the dwell fraction is
$$
\boxed{ \; \text{dwell fraction} = \frac{1}{2} + \frac{1}{n} \; } \qquad
\begin{array}{c c c c}
n & 4 & 6 & 8 \\
\text{dwell} & 0.750 & 0.667 & 0.625 \\
\ddot{\psi}_{\max} / \omega_d^2 & 5.41 & 1.35 & 0.70
\end{array}
$$
where $\omega_d$ is the constant driver speed. **More slots mean a much lower peak acceleration and a shorter dwell.** A four-slot wheel's peak angular acceleration is about $7.7$ times an eight-slot wheel's at the same driver speed — and an $n$-slot Geneva gives an index of $360^\circ / n$, so the slot count is set by the number of stations, not chosen freely. The peak acceleration does not occur at mid-index, where the velocity is greatest and the acceleration is zero, but part-way between entry and mid-index: for the four-slot wheel at $11.5^\circ$ of crank rotation either side of mid-index.
:::

## Worked cases

::: example Grashof classification {#ex-grashof}
Classify the four-bars (a) $40$, $110$, $130$, $160$; (b) $50$, $100$, $120$, $150$; (c) $60$, $80$, $100$, $120$ millimetres, the links being listed in order round the loop and the last one being the frame.
::: solution
**(a)** $s = 40$, $l = 160$, $p + q = 110 + 130 = 240$.
$$
s + l = 200 \; < \; 240 \qquad \text{Grashof}
$$
The shortest link ($40$) is next to the frame ($160$), so the mechanism is a **crank–rocker** with the $40$-millimetre link as the crank.
**The type depends on which link is fixed.** Grashof's condition is a property of the chain; the type is a property of the inversion. With the links in the order $40$, $110$, $130$, $160$ round the loop, the $40$ link is adjacent to $110$ and $160$ and opposite $130$:
$$
\begin{array}{l l}
\text{frame} = 160 \text{ or } 110 & \text{crank–rocker} \quad \text{(shortest link adjacent to frame)} \\
\text{frame} = 40 & \text{double-crank} \quad \text{(shortest link is the frame)} \\
\text{frame} = 130 & \text{double-rocker} \quad \text{(shortest link is the coupler)}
\end{array}
$$
**(b)** $s = 50$, $l = 150$, $p + q = 220$:
$$
s + l = 200 \; < \; 220 \qquad \text{Grashof}
$$
The shortest link is adjacent to the frame, so this is also a **crank–rocker**.
**(c)** $s = 60$, $l = 120$, $p + q = 180$:
$$
s + l = 180 \; = \; 180 \qquad \text{change point}
$$
The four links can lie along one line. With the $60$ link as crank this happens once per revolution, and at that instant the linkage can continue in either assembly mode; it needs a stop, a spring or a second linkage to guide it through, or must be kept away from that position.
*Sanity.* Computing the positions over a full turn of the crank confirms the two crank–rockers and shows how differently they behave. For (a) — crank $40$, coupler $110$, rocker $130$ — the rocker swings $35.9^\circ$ and the transmission angle stays between $59.3^\circ$ and $112.6^\circ$. For (b) — crank $50$, coupler $100$, rocker $120$ — the rocker swings $49.3^\circ$ and the transmission angle ranges from $53.1^\circ$ to $130.5^\circ$. The larger crank-to-frame ratio buys a larger swing at the cost of a wider spread of transmission angle; both pass the $40^\circ$ rule.
:::
:::

::: example Locating instant centres {#ex-centres}
A four-bar has frame $A_0 A_4$, crank $A_0 A$, coupler $A B$ and rocker $A_4 B$, with $A_0 A_4 = 100$, $A_0 A = 40$, $A B = 120$, $A_4 B = 90$ millimetres and crank angle $\theta = 60^\circ$ (open assembly, $B$ above the frame). Find the six instant centres and the velocity ratio $\omega_4 / \omega_2$, numbering the links $1$ = frame, $2$ = crank, $3$ = coupler, $4$ = rocker.
::: solution
**The count.** $N = 4$, so $\binom{4}{2} = 6$ instant centres.
**Four are known from the pins:** $I_{12} = A_0$, $I_{23} = A$, $I_{34} = B$, $I_{14} = A_4$.
**Two are found from Kennedy's theorem.** The remaining pairs are $\left( 1, 3 \right)$ and $\left( 2, 4 \right)$.
- $I_{13}$ lies on the line $I_{12} I_{23} = A_0 A$ (bodies $1, 2, 3$) **and** on the line $I_{14} I_{34} = A_4 B$ (bodies $1, 4, 3$). It is their intersection.
- $I_{24}$ lies on $I_{12} I_{14} = A_0 A_4$ (bodies $2, 1, 4$) **and** on $I_{23} I_{34} = A B$ (bodies $2, 3, 4$). It is their intersection.
**The coordinates.** With $A_0$ at the origin and $A_4$ at $\left( 100, 0 \right)$:
$$
A = \left( 40 \cos 60^\circ,\; 40 \sin 60^\circ \right) = \left( 20.0,\; 34.64 \right)
$$
**Locating $B$:** it lies on the circle of radius $120$ about $A$ and the circle of radius $90$ about $A_4$:
$$
\left( x - 20 \right)^2 + \left( y - 34.64 \right)^2 = 14{,}400, \qquad
\left( x - 100 \right)^2 + y^2 = 8{,}100
$$
Solving gives $B = \left( 128.8,\; 85.27 \right)$ for the open assembly; the crossed assembly gives $B = \left( 57.5,\; - 79.3 \right)$.
**$I_{13}$:** the line $A_0 A$ is $y = 1.732 x$; the line $A_4 B$ has slope $85.27 / \left( 128.8 - 100 \right) = 2.961$, so $y = 2.961 \left( x - 100 \right)$.
$$
1.732 x = 2.961 x - 296.1 \qquad \Rightarrow \qquad x = 240.9, \quad y = 417.3
\qquad I_{13} = \left( 240.9,\; 417.3 \right)
$$
**$I_{24}$:** the line $A B$ has slope $\left( 85.27 - 34.64 \right) / \left( 128.8 - 20.0 \right) = 0.4653$, so $y = 34.64 + 0.4653 \left( x - 20 \right)$; setting $y = 0$:
$$
x = 20 - \frac{34.64}{0.4653} = - 54.44 \qquad I_{24} = \left( - 54.44,\; 0 \right)
$$
**The velocity ratio.**
$$
\frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}}
= \frac{54.44}{54.44 + 100} = \frac{54.44}{154.44} = \mathbf{0.3525}
$$
**Reading the result.** Because $I_{24}$ lies **outside** the segment $A_0 A_4$, the two links turn in the **same** sense; when $I_{24}$ falls between the pivots they turn in opposite senses. When the crank and coupler are in line, the coupler line passes through $A_0$, $I_{24}$ coincides with $I_{12}$, and the ratio is zero — these are the rocker's two extreme positions.
**The mechanical advantage.** For a lossless mechanism the output torque is $T_4 = T_2 \, \omega_2 / \omega_4 = 2.84\, T_2$ at this instant; a force ratio follows by dividing each torque by the lever arm at which the force acts.
*Sanity.* Solving the velocity loop equations directly (the method of [[mechanisms/velocity-analysis]]) gives $\omega_4 / \omega_2 = 0.3525$ and $\omega_3 / \omega_2 = - 0.0905$. The coupler turns very slowly, which is why its instant centre $I_{13}$ is far away — $482\ \mathrm{mm}$ from $A_0$; a body in pure translation would have its instant centre at infinity. As a check on the construction, $I_{13}$, $I_{12}$ and $I_{23}$ are collinear and so are $I_{13}$, $I_{14}$ and $I_{34}$, by construction; $I_{24}$, $I_{23}$, $I_{34}$ must also be collinear, and they are, because $I_{24}$ was put on the coupler line.
:::
:::

::: example A linkage for a hospital bed {#ex-bed}
The back section of a bed pivots at its lower end $O$ and must rise from $0^\circ$ to $65^\circ$. The section and the part of the patient it carries weigh $500\ \mathrm{N}$ with the centre of gravity $350\ \mathrm{mm}$ from $O$. It is to be driven by a linear actuator (an electric motor and lead screw) rated at $2{,}000\ \mathrm{N}$ with a maximum stroke of $150\ \mathrm{mm}$; the actuator's base pivot $G$ is on the frame at $\left( -550, -100 \right)\ \mathrm{mm}$ from $O$, and its rod end is pinned to a lever on the section at $E$, $150\ \mathrm{mm}$ from $O$ and perpendicular to the section, pointing downward when the section is flat. Check the mobility, the stroke, the peak actuator force and the transmission angle, and say how the section is held when the motor stops.
::: solution
**Mobility.** Links: frame, back section with its lever (one rigid body), actuator body, actuator rod. $N = 4$. Joints: section–frame, actuator body–frame and rod–lever turning pairs, and the rod sliding in the body, a prismatic pair: $J_1 = 4$.
$$
M = 3 \left( 3 \right) - 2 \left( 4 \right) = 1 \quad \checkmark
$$
This is an **inverted slider–crank**: the actuator's length is the single input, and the section angle $\beta$ is the output.
**Geometry.** With $O$ at the origin and $\beta$ the section angle, the lever end is at $E = 0.150 \left( \cos \left( \beta - 90^\circ \right), \sin \left( \beta - 90^\circ \right) \right)\ \mathrm{m}$ and the actuator length is $L = \left| E - G \right|$. At $\beta = 0$, $E = \left( 0, -0.150 \right)$ and
$$
L \left( 0 \right) = \sqrt{0.550^2 + 0.050^2} = 0.552\ \mathrm{m}; \qquad
L \left( 65^\circ \right) = 0.687\ \mathrm{m}
$$
**so the stroke needed is $135\ \mathrm{mm}$, inside the $150\ \mathrm{mm}$ available.** The actuator **extends** as the section rises.
**Force, by virtual work.** For a small rotation $\delta\beta$, the actuator does work $F \, \delta L$ and the weight absorbs $W x_g \cos\beta \, \delta\beta$. With $\delta L / \delta \beta = h$, the perpendicular distance from $O$ to the actuator's line,
$$
F = \frac{W x_g \cos \beta}{h}
$$
At $\beta = 0$ the actuator's unit vector is $\left( 0.550, -0.050 \right) / 0.552 = \left( 0.996, -0.091 \right)$ and $h = \left| E_x u_y - E_y u_x \right| = 0.150 \times 0.996 = 0.149\ \mathrm{m}$:
$$
F \left( 0 \right) = \frac{500 \times 0.350 \times 1}{0.149} = 1{,}171\ \mathrm{N}
$$
Evaluating every degree:
$$
\begin{array}{c c c c c}
\beta & L\ (\mathrm{m}) & W x_g \cos\beta\ (\mathrm{N \cdot m}) & F\ (\mathrm{N}) & \mu \\
0^\circ & 0.552 & 175.0 & 1{,}171 & 84.8^\circ \\
13^\circ & 0.586 & 170.5 & 1{,}192 & 72.5^\circ \\
26^\circ & 0.617 & 157.3 & 1{,}202 & 60.8^\circ \\
39^\circ & 0.645 & 136.0 & 1{,}192 & 49.5^\circ \\
52^\circ & 0.668 & 107.7 & 1{,}150 & 38.7^\circ \\
65^\circ & 0.687 & 74.0 & 1{,}048 & 28.1^\circ
\end{array}
$$
**The peak is $1{,}202\ \mathrm{N}$ near $\beta = 27^\circ$**, so the $2{,}000\ \mathrm{N}$ actuator has a margin of $1.66$ on the static load, which must also cover friction, acceleration and a heavier patient. The load moment falls as the section rises, but so does the actuator's lever arm $h$, which is why the force curve is nearly flat.
**Transmission angle.** Here $\mu$ is the angle between the actuator line and the lever $OE$. It falls from $85^\circ$ to $28^\circ$ over the travel: below $40^\circ$ for the last $15^\circ$ or so of rise. The force table already accounts for it — $h = 0.150 \sin \mu$ — but a small $\mu$ also means large pin reactions and a large change in force for a small error in the pivot positions. Moving $G$ upward or lengthening the lever would raise $\mu$ near the top, at the cost of a longer stroke.
**Holding.** The mechanism itself is not self-locking: with $\mu$ well away from $0^\circ$ and $180^\circ$ the weight can always back-drive the actuator rod. **Holding comes from the actuator**: a lead screw whose efficiency in reverse is zero or negative (a small lead angle with a plain nut), or a brake on the motor. A ball screw, being efficient in both directions, would need a brake.
*Sanity.* The work done by the actuator over the stroke must equal the potential energy gained: $\int F \, dL$ over the table is roughly $1{,}170\ \mathrm{N} \times 0.135\ \mathrm{m} \approx 158\ \mathrm{J}$, and the weight rises by $0.350 \sin 65^\circ = 0.317\ \mathrm{m}$, $500 \times 0.317 = 159\ \mathrm{J}$. The two agree. The example teaches the principle; a real bed is designed and tested to the applicable medical-device standards (IEC 60601-2-52 for medical beds), including overload, durability and pinch-point requirements.
:::
:::

::: quiz
A planar mechanism of eight links and ten turning pairs gives $M = 3 ( 8 - 1 ) - 2 ( 10 ) = 1$ by Gruebler's criterion. When the input crank is turned, part of the linkage flops about freely while another part will not move at all. What is the most likely explanation?

- [ ] Gruebler's criterion systematically over-counts planar mechanisms and must be corrected by one
- [x] The count is global: one sub-chain is a structure (or over-constrained, $M_{\mathrm{sub}} \le 0$) while another has two freedoms, so the total comes out at one although no part of the linkage has exactly one freedom
- [ ] One of the joints is a higher pair that has been miscounted as a turning pair
- [ ] The mechanism is in fact spatial and the planar formula does not apply

::: solution
**The criterion counts freedoms for the chain as a whole.** If the links and joints are distributed so that one loop is a rigid triangle (mobility zero) and the rest forms a five-bar loop (mobility two), the total is still $3(N-1) - 2J_1 = 1$, but the triangle cannot move and the five-bar is under-constrained. **Whenever the count and the assembly disagree, apply the count to each sub-chain separately**, and look also for special geometry — equal and parallel links, parallel or concurrent axes — that makes some constraints redundant. The double parallelogram ($N = 5$, $J_1 = 6$, count $0$, true mobility $1$) is the standard example of the second effect.
:::
:::

::: history
**Pafnuty Chebyshev** presented his memoir on the linkages known as "parallelograms" — Watt-type parallel motions — to the St Petersburg Academy in 1853, and it was published in 1854. In it he asked how to choose a linkage's proportions so that the largest deviation from a straight line is as small as possible, and the polynomials now named after him first appear there. **Charles-Nicolas Peaucellier**, a French army engineer, proposed his exact straight-line inversor in 1864; **Yom Tov Lipman Lipkin** found it independently in 1871. **Franz Reuleaux**'s *Theoretische Kinematik* (1875; English translation by A. B. W. Kennedy, 1876) introduced the systematic language of links, pairs and kinematic chains used in this lesson. **Martin Grübler** published his counting criterion for plane kinematic chains in 1883, and **Franz Grashof**'s *Theoretische Maschinenlehre* of the same year contains the rotatability condition that bears his name; **Carl Kutzbach** gave the general form for spatial mechanisms in 1929. The theorem of three centres was published by **Siegfried Aronhold** in 1872 and independently by **Alexander Kennedy** in *The Mechanics of Machinery* in 1886.
:::

## Where this leads

The mobility count is the first thing done to every mechanism in [[mechanisms/position-analysis]], [[mechanisms/velocity-analysis]] and [[mechanisms/acceleration-analysis]]; the transmission-angle rule is why [[mechanisms/linkage-synthesis]] spends much of its time on proportions rather than topology; the instant-centre method is the shortest route into [[mechanisms/gears]]' tooth-action geometry; and the toggle and self-locking arguments reappear in [[machine-design]]'s clutches, brakes and fasteners and in [[robotics]]' singularity analysis.

::: summary
- Mobility is $M = 3(N-1) - 2J_1 - J_2$ in the plane and $6(N-1) - \sum c_i$ in space; $M=0$ is a structure, $M=1$ is a mechanism driven by one input, $M<0$ is over-constrained.
- Count $n-1$ turning pairs where $n$ links meet at a pin; a rigid triangle is one link; weld idle rollers before counting.
- The criterion is a count of equations, not a proof: passive freedoms make it too high, redundant constraints make it too low, and special positions can add a freedom momentarily.
- Grashof's $s+l \le p+q$ decides whether a link can rotate fully; the four-bar's type is decided by which link is the frame.
- Keep the transmission angle roughly between $40^\circ$ and $140^\circ$; a toggle multiplies force as $1/(2\tan\alpha)$ and holds when pushed just over centre against a stop.
- Kennedy's theorem puts three instant centres on a line, and $N(N-1)/2$ of them exist; the angular-velocity ratio is a ratio of drawn lengths.
- Exact straight lines need a sliding pair or more than four links; a four-bar's coupler curve can only approximate one.
- A Geneva's dwell fraction is $\tfrac12 + \tfrac1n$; its peak acceleration falls steeply with slot number.
:::

## Exercises

::: exercise Four-bar mobility {level=1 check="1"}
Give the planar mobility of a four-bar chain with four links and four turning pairs.
::: solution
$M=3(4-1)-2(4)=9-8=1$.
:::
:::

::: exercise Five-bar mobility {level=1 check="2"}
Give the planar mobility of a five-bar chain with five links and five turning pairs.
::: solution
$M=3(5-1)-2(5)=12-10=2$.
:::
:::

::: exercise Compound hinge {level=1 check="1"}
A six-link planar chain has five simple pins and one pin at which three links meet. Give the mobility.
::: solution
The triple pin counts as two joints: $J_1=5+2=7$; $M=3(5)-2(7)=15-14=1$.
:::
:::

::: exercise Cam mobility {level=1 check="1"}
Give the useful mobility of a cam mechanism with a roller oscillating follower, after welding the roller to its arm.
::: solution
$N=3$, $J_1=2$, $J_2=1$: $M=3(2)-2(2)-1=1$.
:::
:::

::: exercise Spatial mobility {level=1 check="6"}
Give the mobility of a single free rigid body in space, counted with the spatial criterion as a body plus a fixed reference with no joints ($N=2$).
::: solution
$M=6(N-1)-\sum c_i=6(1)-0=6$: three translations and three rotations.
:::
:::

::: exercise Grashof {level=1 check="0"}
For a four-bar with links $60$, $80$, $100$ and $120$ millimetres, give the value of $(s+l)-(p+q)$ in millimetres and state whether the chain is Grashof.
::: solution
$s+l=60+120=180$, $p+q=80+100=180$: the difference is $0$ — a change-point chain, on the boundary of the Grashof condition.
:::
:::

::: exercise Instant centres {level=1 check="15"}
Give the number of instant centres in a six-link mechanism.
::: solution
$\binom{6}{2}=6\times5/2=15$.
:::
:::

::: exercise Transmission angle {level=1 check="34.1"}
For the four-bar of the widget — ground $100$, crank $30$, coupler $120$, rocker $80$ millimetres — give the minimum transmission angle in degrees.
::: solution
At $\theta=0$, $f^2=10900-6000=4900$; $\cos\mu=(14400+6400-4900)/19200=0.8281$, $\mu=34.1^\circ$.
:::
:::

::: exercise Toggle advantage {level=2 check="9.54"}
A toggle clamp has two equal links, each inclined at $\alpha = 3^\circ$ to the line joining their outer pins. Give the ideal force ratio $F_{\mathrm{out}}/F_{\mathrm{in}}$ for a transverse force at the knee, and explain why the clamp is set slightly over centre in use.
::: solution
$$
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \frac{1}{2 \tan 3^\circ} = \frac{1}{2 \times 0.05241} = 9.54
$$
The ratio grows without limit as $\alpha \to 0$, but so does the sensitivity to dimensions and to the elastic stretch of the frame, so the real clamping force is set by stiffness and adjustment, not by the ideal ratio. **Set just past centre against a stop**, the clamped load pushes the knee further onto the stop rather than back through centre, so the load cannot open the clamp; opening it needs a deliberate pull on the handle.
:::
:::

::: exercise A mechanism that will not move {level=2 check="-1"}
A designer braces a four-bar chain by adding **both** diagonals as pin-ended bars. Give the planar mobility from the criterion, and state two remedies if the frame binds on assembly.
::: solution
Each diagonal adds one link and two pin joints. Corner pins where three links now meet count as two joints; equivalently, count link-ends: four sides and two diagonals have twelve ends, each corner joins three of them and contributes two joints:
$$
N = 6, \qquad J_1 = 8 \qquad \Rightarrow \qquad M = 3 \left( 5 \right) - 2 \left( 8 \right) = 15 - 16 = -1
$$
**One constraint is redundant**: one diagonal already makes the four-bar a structure ($N = 5$, $J_1 = 6$, $M = 0$). With both diagonals the frame can be assembled without force only if the second diagonal's length is exactly what the first diagonal's geometry demands. **The remedies are to remove the redundancy** — omit one diagonal, or give it a slotted hole or an adjustable length that is fixed after assembly — **or to accept it and make the parts to tolerances tight enough that the assembly stress is acceptable** (the usual choice in trusses, where the members are elastic enough to absorb small misfits).
:::
:::

::: exercise Derivation {level=3}
Derive the Gruebler–Kutzbach criterion for a planar mechanism, express it in terms of the number of independent loops, and show which numbers of links are possible for a one-freedom linkage built only from turning pairs.
::: solution
**Count the coordinates.** $N$ links in the plane have $3N$ coordinates. **The frame is fixed**, which removes $3$: $3 \left( N - 1 \right)$ coordinates remain.
**Count the constraints.** A planar turning or prismatic pair forces two coordinates of the two links to agree, so it removes $2$; a planar higher pair that may roll and slide only keeps the surfaces in contact, so it removes $1$. With $J_1$ and $J_2$ pairs:
$$
\boxed{ M = 3 \left( N - 1 \right) - 2 J_1 - J_2 }
$$
**The limits of the argument.** The coordinate count is exact; the constraint count is right **only if every constraint equation is independent of the others**. Writing the constraints as $\Phi \left( \mathbf{q} \right) = 0$, the mobility at a regular configuration is
$$
M = 3 \left( N - 1 \right) - \operatorname{rank} \left( \frac{\partial \Phi}{\partial \mathbf{q}} \right)
$$
**and the criterion replaces the rank by the number of equations.** The two differ when the Jacobian loses rank — redundant constraints from special dimensions, or a singular configuration.
**A single loop.** A loop of $n$ binary links joined by $n$ turning pairs has $N = n$ and $J_1 = n$:
$$
M = 3 \left( n - 1 \right) - 2 n = n - 3
$$
A loop of three bars is a structure, four bars give one freedom, and each further bar in the same loop adds one.
**The loop form.** A chain of $N$ links and $J_1$ joints has $L = J_1 - N + 1$ independent loops, so $J_1 = N - 1 + L$ and
$$
\boxed{ \; M = 3 \left( N - 1 \right) - 2 \left( N - 1 + L \right) = N - 1 - 2 L \; }
\qquad
\begin{array}{c c c c}
& N & L & M \\
\text{four-bar} & 4 & 1 & 1 \\
\text{five-bar} & 5 & 1 & 2 \\
\text{Watt six-bar} & 6 & 2 & 1 \\
\text{Stephenson six-bar} & 6 & 2 & 1 \\
\text{seven-bar, two loops} & 7 & 2 & 2 \\
\text{eight-bar, three loops} & 8 & 3 & 1
\end{array}
$$
For planar chains with only one-freedom pairs, the mobility depends only on the numbers of links and loops, both of which can be read from a sketch.
**The parity rule.** Setting $M = 1$ in $M = 3(N-1) - 2J_1$ gives
$$
J_1 = \frac{3 N - 4}{2}
$$
**which requires $N$ even.** A one-freedom planar linkage built only from turning (or prismatic) pairs has an even number of links: four, six, eight, … A five-link linkage with one freedom must therefore include a higher pair (for example $N = 5$, $J_1 = 5$, $J_2 = 1$ gives $M = 12 - 10 - 1 = 1$).
**Check on the Watt six-bar.** $N = 6$, $L = 2$, so $M = 6 - 1 - 4 = 1$; $J_1 = 6 - 1 + 2 = 7$; and $3(5) - 2(7) = 1$. Three routes, one answer.
:::
:::

::: exercise Design {level=3}
Choose an **indexing mechanism for a rotary packaging table** with eight stations, $45$ indexes per minute, a payload of $12\ \mathrm{kg}$ per station at a mean radius of $0.5\ \mathrm{m}$, a table inertia of $9\ \mathrm{kg \cdot m^2}$, a dwell of at least $0.9\ \mathrm{s}$ per cycle for fill, seal and check, and a positional repeatability of $\pm 0.05^\circ$. Compare a Geneva drive with a cam indexer, size the peak output torque, and list the main failure modes and acceptance tests.
::: solution
**The duty.** $45$ indexes per minute is one index every $60 / 45 = 1.333\ \mathrm{s}$; the dwell must be at least $0.9\ \mathrm{s}$, so the dwell fraction must be at least $0.9 / 1.333 = 0.675$ and the index must take no more than $0.433\ \mathrm{s}$. Eight stations means each index is $45^\circ = 0.7854\ \mathrm{rad}$. The repeatability of $\pm 0.05^\circ$ ($8.7 \times 10^{-4}\ \mathrm{rad}$) is $\pm 0.07\ \mathrm{mm}$ at a tool $80\ \mathrm{mm}$ from the axis and $\pm 0.44\ \mathrm{mm}$ at the $0.5\ \mathrm{m}$ station radius.
**The Geneva.** A $45^\circ$ index needs an **eight-slot** wheel. Its dwell fraction is $\frac{1}{2} + \frac{1}{8} = 0.625$, giving a dwell of $0.625 \times 1.333 = 0.833\ \mathrm{s}$ — **less than the $0.9\ \mathrm{s}$ required**. A Geneva's dwell fraction is fixed by its slot count, so the eight-slot Geneva fails on timing whatever its size. (For comparison: the driver turns once per index, $\omega_d = 0.75 \times 2\pi = 4.712\ \mathrm{rad/s}$, and the peak wheel acceleration would be $0.70\, \omega_d^2 = 0.70 \times 22.2 = 15.5\ \mathrm{rad/s^2}$.)
**Mobility of the candidates.** Geneva: frame, driver, wheel; $N = 3$, $J_1 = 2$, $J_2 = 1$, $M = 1$. Cam indexer (a globoid or parallel cam driving a turret of rollers): with the rollers welded to the turret, frame, cam and turret give the same count, $M = 1$. Both are single-input mechanisms, and both lock the output positively during the dwell — the Geneva by its locking disc, the cam indexer by a dwell portion of the cam track that holds the rollers.
**The cam indexer.** Its motion law and index angle are chosen when the cam is designed, so the index can be made to occupy exactly $0.433\ \mathrm{s}$ of each $1.333\ \mathrm{s}$ — $117^\circ$ of a constant-speed input shaft. With a **modified-sine** law (peak-velocity coefficient $1.76$, peak-acceleration coefficient $5.53$):
$$
\dot{\psi}_{\max} = 1.76 \times \frac{0.7854}{0.433} = 3.19\ \mathrm{rad/s}, \qquad
\ddot{\psi}_{\max} = 5.53 \times \frac{0.7854}{0.433^2} = 23.2\ \mathrm{rad/s^2}
$$
**Torque.** The output inertia is
$$
I = 8 \times 12 \times 0.5^2 + 9 = 24 + 9 = 33\ \mathrm{kg \cdot m^2}
\qquad \Rightarrow \qquad T_{\max} = 33 \times 23.2 = 766\ \mathrm{N \cdot m}
$$
plus bearing friction and any process loads. Peak lateral acceleration of the payload at $0.5\ \mathrm{m}$ is $23.2 \times 0.5 = 11.6\ \mathrm{m/s^2}$, about $1.2\, g$: the fixtures must hold the products against that, and if the products are open containers of liquid a gentler law or a longer index time is needed.
**Choice.** A cam indexer with a modified-sine law, sized for at least $766\ \mathrm{N \cdot m}$ output torque with a service factor from the supplier's catalogue. A servo-driven index would also meet the timing, but needs a brake or mechanical lock to hold position during the dwell without power.
**Failure modes.** Cam-follower (roller) wear, which shows first as lost repeatability; overload from a jam, which needs a torque-limiting clutch on the output; fixture loosening under the $1.2\, g$ peak; and a resonance of the table on its bearings if the index rate or its harmonics approach the table's first natural frequency.
**Acceptance tests.** Repeatability measured with a dial gauge at the tool radius over at least $100$ consecutive indexes; index and dwell times measured against the cam timing; input torque recorded over the cycle and compared with the model; repeatability re-measured after a long durability run. The example illustrates the selection logic; the drive itself is sized from the manufacturer's rating data and checked by qualified engineers.
:::
:::
