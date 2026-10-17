A structure holds a load; a mechanism moves one part in a prescribed way relative to another. Between those two sentences sits the whole of this course, and the first thing it asks of you is an arithmetic: **given a set of rigid bodies and a set of connections between them, how many independent things can still be done to the assembly?** The answer is the mechanism's **degrees of freedom** or **mobility**, and it is the first number you compute about any linkage because it decides whether you are drawing a machine, a building frame or a pile of scrap. A mobility of zero is a structure; a mobility of one is a mechanism you can drive with one motor; a mobility of two is a mechanism you cannot drive until you say something else; and a mobility of minus one is an over-constrained frame that will bind unless the parts are made to a tolerance you cannot afford.

The counting rule is thirty characters long, was published in **1883**, and is wrong often enough that most of this lesson is about when and why. Its name is the **Gruebler–Kutzbach criterion**, and the reason it fails is not a defect of arithmetic but a fact about geometry: **the rule counts constraints, and some arrangements of constraints do not constrain anything.**

::: warning Seven mobility errors that cost a prototype
**Counting a compound hinge as one joint.** Where three links meet at one pin there are **two** turning pairs, not one, and the difference is $3 - 2 = 1$ of mobility on a planar count. **The reason a Stephenson or Watt chain comes out with the wrong mobility on the first attempt is nearly always a hidden ternary link**, and the reason the standard advice — "count the links first, then count the joints as $n - 1$ where $n$ members meet" — is worth memorising is that the error is invisible in a drawing and fatal in a prototype. **The reason a four-bar drawn with a triangular coupler looks like it has five links and six joints is that the triangle is one rigid body**, and the reason a designer who counts the triangle's three sides as three links gets $M = 3(6-1) - 2(6) = 3$ for a mechanism that plainly has one is that rigidity is not a joint. **Forgetting a joint's own rotation.** A roller follower spins about its own pin for no reason whatever; it transmits no motion and constrains nothing, and it is called an **idle**, **passive** or **parasite** degree of freedom. **The reason a cam mechanism with a roller follower counts as $M = 2$ by the formula and $M = 1$ in fact is that one of the two is the roller's spin**, and the reason the correct handling is to **weld the roller to its arm and recount** rather than to subtract one from the answer is that welding makes the count verifiable and subtraction is a fudge. **Believing the formula about a parallelogram.** A parallelogram linkage has $N = 4$, $J_1 = 4$ and $M = 3(3) - 2(4) = 1$, which is right; but the count is right for the wrong reason, because the fourth constraint is **redundant** — the opposite sides being equal already guarantees what the fourth joint would have enforced. **The reason a parallelogram with its links made $0.2\ \mathrm{mm}$ too long binds and jams is that the redundant constraint has become an active one**, and the reason a real parallel-motion linkage for a wiper or a seat recliner carries a bushing with clearance at one joint is that the clearance is the design, not a defect. **Applying the planar formula to a spatial mechanism.** The planar criterion counts three coordinates per link; a spatial link has six. **A universal joint has $M = 1$ in space and cannot be counted at all in the plane**, and the reason a designer who applies $3(N-1) - 2J_1$ to a Carlier or Stewart platform gets a nonsense answer is that the platform's constraints are not coplanar. **Ignoring a local degree of freedom in a gear train.** A planet gear's spin about its own axis is a real mobility; a carrier's rotation about the sun's axis is another. **The reason a planetary gearset counts as $M = 2$ and needs two clutches or brakes to become a single-speed ratio is that the two mobilities are the two members you hold**, and the reason an automatic gearbox has five elements and four clutches is that the gearset's mobility is two and every held member costs one actuator. **Choosing a mechanism by mobility alone.** A linkage with $M = 1$ that passes through a **toggle** or a **change-point** configuration is not a usable mechanism, because at the toggle the mechanical advantage is infinite and the transmission angle is zero, so the input force required to move the output is unbounded and the output can be driven backwards by its own load. **The reason a four-bar whose crank and coupler become collinear at $\theta = 180^\circ$ cannot be used as a crank-rocker without a flywheel is that the toggle is a dead centre**, and the reason a press that must deliver a huge force at the end of its stroke is deliberately designed to over-centre is that the infinite mechanical advantage is then a feature and the die cannot spring back.
:::

## Counting

::: definition Kinematic pairs and links {#def-pairs}
**A link is a rigid body**; a **kinematic pair** is a connection that permits a definite relative motion. **A lower pair** is a surface contact — turning, prismatic, cylindrical, spherical, planar, helical — and **a higher pair** is a line or point contact — a gear tooth, a cam on a follower, a wheel on a rail.

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
\text{Rolling contact (higher)} & 4 & 1 & \text{planar: rolling only} \\
\text{Sliding contact (higher)} & 5 & 2 & \text{planar: rolling and sliding}
\end{array}
$$

**The reading of the two $f$ columns.** In a **planar** mechanism every link already has three coordinates — $x$, $y$, $\theta$ — and a turning or prismatic pair removes two of them, leaving one. **A higher pair in the plane removes one constraint if the surfaces roll and two if they may slide**, and the reason a gear pair is counted as one higher pair and not as a lower pair is that the tooth flanks can slide past each other.

**The counting conventions that decide whether your answer is right.**

$$
\begin{array}{l l}
\text{Compound hinge} & n \text{ members at one pin } = n - 1 \text{ turning pairs} \\
\text{Rigid sub-triangle} & \text{counts as one link, whatever its shape} \\
\text{Half joint} & \text{a higher pair; counts as } J_2 = 1 \text{ and removes one constraint} \\
\text{Idle rotation} & \text{weld the spinning member and recount} \\
\text{Dummy constraint} & \text{a joint whose constraint is already implied by the geometry} \\
\text{Two joints in series} & \text{a link of zero length between two pins is one link, not two joints}
\end{array}
$$

**The number that makes the compound hinge the commonest error.** A **Watt** six-bar has $N = 6$ and $J_1 = 7$, and the seventh joint is the ternary link's shared pin; **a count of six joints gives $M = 3(5) - 12 = 3$ and a mechanism that will not assemble.** The reason the ternary link is drawn as a triangle in every textbook figure is that the triangle is rigid, and the reason the beginner counts its three vertices as three joints is that they look like three joints.
:::

::: definition The Gruebler–Kutzbach criterion {#def-kutzbach}
**For a planar mechanism** of $N$ links (including the frame) with $J_1$ one-degree-of-freedom pairs and $J_2$ two-degree-of-freedom pairs (half joints):

$$
\boxed{ M = 3 \left( N - 1 \right) - 2 J_1 - J_2 }
$$

**For a spatial mechanism** with $f_i$ the freedom of the $i$-th pair:

$$
\boxed{ M = 6 \left( N - 1 \right) - \sum_{i} \left( 6 - f_i \right) = 6 \left( N - 1 \right) - \sum c_i }
$$

**and the criterion is only a necessary condition.** $M$ is the number of **independent coordinates needed to place the mechanism**, and it is not the number of **useful** outputs, nor a guarantee that the mechanism moves at all.

$$
\begin{array}{l c c c c l}
\text{Mechanism} & N & J_1 & J_2 & M & \text{Comment} \\
\text{Four-bar chain} & 4 & 4 & 0 & 1 & \text{the workhorse} \\
\text{Slider–crank} & 4 & 4 & 0 & 1 & \text{three turns, one slide} \\
\text{Inverted slider–crank} & 4 & 4 & 0 & 1 & \text{same count, different machine} \\
\text{Five-bar chain} & 5 & 5 & 0 & 2 & \text{two actuators required} \\
\text{Six-bar, Watt} & 6 & 7 & 0 & 1 & \text{the ternary pin is the seventh joint} \\
\text{Six-bar, Stephenson III} & 6 & 7 & 0 & 1 & \text{two ternary links} \\
\text{Geneva, four-slot} & 5 & 4 & 1 & 1 & \text{the stop is the half joint} \\
\text{Cam, roller follower} & 4 & 3 & 1 & 2 & M = 1 \text{ after welding the roller} \\
\text{Gear pair, two links} & 3 & 2 & 1 & 1 & \text{two turns plus the mesh} \\
\text{Peaucellier cell} & 7 & 8 & 0 & 2 & M = 1 \text{ in fact; one redundant constraint} \\
\text{Parallelogram} & 4 & 4 & 0 & 1 & M = 1 \text{ but one constraint is redundant} \\
\text{Welded truss, 4 links} & 4 & 3 & 0 & 3 & \text{an open chain, not a mechanism} \\
\text{Structure, 3 bars} & 4 & 6 & 0 & -3 & \text{over-constrained frame}
\end{array}
$$

**The three failures, stated precisely.**
**One: passive freedoms.** A freedom that no input can control and no output feels — a roller's spin, a ball joint's twist. **Huntington's theorem** of **1975** proves that a planar linkage built only from binary and ternary links joined by turning pairs has **no** passive freedoms, which is why the theorem's users restrict themselves to those linkages and why the Peaucellier cell, whose two joints are quaternary, is outside its protection.
**Two: redundant constraints.** Constraints that duplicate one another. The count is then **too low by the redundancy** — the formula says $M = 1$ for a mechanism that is really $M = 1 + r$ if the redundant joints are made loose. **The reason a five-bar loop closed by a fifth bar gives $M = -1$ and a mechanism that binds is that four of the five constraints are independent and the fifth is not**, and the reason a designer facing $M \le 0$ should ask "is this a structure or a badly-made mechanism?" before changing anything is that the answer decides whether to loosen a tolerance or add a joint.
**Three: special geometry.** A mechanism can have the nominal mobility for one instant and lose it immediately after — a **change-point** four-bar, a toggle, a **Bricard** linkage. **The reason a change-point four-bar can be assembled in two ways and then go either way at the dead centre is that its two circuits are tangent**, and the reason a parallel manipulator's **singular configuration** is a control hazard and not a kinematic curiosity is that its mobility jumps from one to three at a point in its workspace.
:::

::: example Counting four mechanisms {#ex-count1}
Find the mobility of (a) a slider–crank, (b) a Watt six-bar, (c) a cam with a roller oscillating follower, and (d) a four-slot Geneva mechanism with a disc stop.
::: solution
**(a) Slider–crank.** Links: frame, crank, connecting rod, slider. $N = 4$. Joints: three turning pairs and one prismatic pair, all $f = 1$: $J_1 = 4$, $J_2 = 0$.
$$
M = 3 \left( 4 - 1 \right) - 2 \left( 4 \right) = 9 - 8 = \mathbf{1}
$$
**The reason the slider counts as a link and not as a boundary is that it is a rigid body with its own coordinate**, and the reason the guide is not a separate link is that it is bolted to the frame.
**(b) Watt six-bar.** Links: frame, two ternary links and four binary links. $N = 6$. Joints: the two ternary pins each carry three members and therefore count twice:
$$
J_1 = 4 \left( \text{simple pins} \right) + 2 \times 2 \left( \text{ternary pins} \right) = 8 \quad \text{?}
$$
**Careful.** A Watt chain has six links and **seven** joints: five simple pins and one pin at which three members meet. Counting $n - 1$ at the ternary pin:
$$
J_1 = 5 + 2 = 7 \qquad \Rightarrow \qquad M = 3 \left( 5 \right) - 2 \left( 7 \right) = 15 - 14 = \mathbf{1}
$$
**The number that makes the arithmetic the whole test.** Had the ternary pin been counted once, $J_1 = 6$ and $M = 3$ — **a factor of three in mobility and a mechanism that cannot be built**. The reason the check "does the answer come out one?" is circular and the check "does the joint count come out $N_{\mathrm{pins}} + N_{\mathrm{ternary}}$?" is not is that the second can be read off the drawing.
**(c) Cam with roller oscillating follower.** Links: frame, cam, follower arm, roller. $N = 4$. Joints: cam–frame turn, arm–frame turn, roller–arm turn: $J_1 = 3$. Cam–roller contact, rolling: $J_2 = 1$.
$$
M = 3 \left( 3 \right) - 2 \left( 3 \right) - 1 = 9 - 6 - 1 = \mathbf{2}
$$
**The second freedom is the roller's spin about its own pin.** Weld the roller to its arm: $N = 3$, $J_1 = 2$, $J_2 = 1$:
$$
M = 3 \left( 2 \right) - 2 \left( 2 \right) - 1 = 6 - 4 - 1 = \mathbf{1}
$$
**The reason the two methods must agree and the reason welding is the safer of the two** is that welding is a physical operation you can draw and verify, whereas "subtract the idle freedoms" requires you to have found them all. **A second idle freedom hides in a spherical-nose follower's swivel about its own axis**, and the reason a follower's anti-rotation feature is a design item is that the swivel lets the nose skew and the contact stress doubles.
**(d) Four-slot Geneva with a disc stop.** Links: frame, driving crank with the locking cam, driven four-slot wheel, and the roller on the crank — the roller is welded to the crank for counting purposes. $N = 4$? **No.** The correct set is: frame, driver, driven wheel, and the **stop disc** that locks the wheel between index steps — but the stop disc is the driver's own cam surface, so it is not a separate link.
$$
N = 3, \qquad J_1 = 2 \left( \text{driver–frame, wheel–frame} \right), \qquad J_2 = 1 \left( \text{pin-in-slot} \right) + 1 \left( \text{cam-on-} \text{stop} \text{ surface} \right) = 2
$$
$$
M = 3 \left( 2 \right) - 2 \left( 2 \right) - 2 = 6 - 4 - 2 = \mathbf{0}
$$
**The reading.** **The Geneva mechanism counts as a structure, and it is one for two-thirds of every cycle** — the locking cam holds the wheel stationary while the driver turns freely, and the mechanism becomes a mechanism only for the $90^\circ$ of index motion, during which the locking surfaces are disengaged and one constraint is released. **The reason the count of zero is correct and not a failure of the formula is that the mechanism's job is to be a structure and a mechanism alternately**, and the reason a Geneva's timing accuracy is far better than a ratchet's is that the locking phase is a form-closed constraint and not a friction stop.
*Sanity.* The reason the four answers are $1, 1, 1, 0$ and not four ones is that three of these mechanisms are asked to hold still as well as move. **The number that makes the Geneva's count worth doing is the dwell-to-index ratio:** a four-slot Geneva indexes for $90^\circ$ of driver rotation and dwells for $270^\circ$, so it is a structure $75\ \%$ of the time and a mechanism $25\ \%$, and the reason its output shaft's angular-velocity curve has infinite theoretical jerk at the transitions is that the slot entry is a pure radial engagement only at one instant.
:::
:::

## Geometry that the count cannot see

::: definition Grashof's condition and rotatability {#def-grashof}
**For a four-bar** with shortest link $s$, longest link $l$ and the other two $p$, $q$:

$$
\boxed{ s + l \; \le \; p + q \qquad \text{(Grashof condition: at least one link fully rotatable)} }
$$

$$
\begin{array}{l l l}
\text{Grashof, shortest link is the frame} & \text{double-crank (drag-link)} & \text{both side links rotate fully} \\
\text{Grashof, shortest link adjacent to frame} & \text{crank–rocker} & \text{the commonest case} \\
\text{Grashof, shortest link is the coupler} & \text{double-rocker} & \text{the coupler rotates, both rockers oscillate} \\
s + l = p + q & \text{change point (dead centre)} & \text{assembly mode can switch} \\
s + l > p + q & \text{non-Grashof double-rocker} & \text{no link rotates fully}
\end{array}
$$

**The number that makes the equality case a hazard and not a curiosity.** At $s + l = p + q$ the four bars can fold flat, and at the fold the mechanism has **two possible continuations** — it can continue in its present circuit or flip into the other one. **The reason a change-point four-bar used as a straight-line or as a knee joint is deliberately made a few hundredths of a millimetre off the exact equality is that the deviation selects the circuit and the exact equality does not**, and the reason a folding table leg that passes through a change point needs a latch is that the latch is what stops the load choosing the flip.

**The number that makes the Grashof condition a design constraint and not a classification.** For a crank–rocker with crank $a$, coupler $b$, rocker $c$ and ground $g$, the crank can rotate if and only if it can pass both of its dead centres,

$$
\left( b - c \right)^2 \; \le \; g^2 + a^2 - 2 g a \cos\theta \; \le \; \left( b + c \right)^2 \quad \text{for every } \theta
$$

**and evaluating the two inequalities at $\theta = 0$ and $\theta = 180^\circ$ gives exactly $s + l \le p + q$.** The reason the derivation is worth four lines is that it shows the condition is a statement about **two instants and no more**, which is why a mechanism with a slot, a guide or a stop can violate Grashof and still have a rotatable crank over the part of the cycle it needs.
:::

::: definition Transmission angle and mechanical advantage {#def-transmission}
**The transmission angle** $\mu$ of a four-bar is the angle between the coupler and the output link, measured at the joint where they meet. **Force is transmitted well at $\mu = 90^\circ$ and not at all at $\mu = 0$ or $180^\circ$**, and the mechanical advantage of the output joint is proportional to $\sin \mu$.

$$
\cos \mu = \frac{b^2 + c^2 - d^2}{2 b c}, \qquad d^2 = g^2 + a^2 - 2 g a \cos \theta
$$

**The design rule is $40^\circ \le \mu \le 140^\circ$ over the whole cycle**, and the reason the limit is $40^\circ$ and not $20^\circ$ is that the joint friction torque is proportional to $1 / \sin \mu$ and at $20^\circ$ a mechanism that is efficient on a test bench seizes in the field with a little grease and a little misalignment.

**The toggle.** When the crank and coupler become collinear the transmission angle passes through zero and the mechanical advantage through infinity:

$$
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \frac{1}{\tan \phi} \to \infty \quad \text{as } \phi \to 0
$$

**The number that makes a toggle clamp hold ten tonnes on a hand force of two hundred newtons** is that at $\phi = 1^\circ$ the ideal advantage is $1 / \tan 1^\circ = 57$, and the reason the clamp cannot be back-driven by the process load is that the efficiency through a toggle falls below $50\ \%$ at one-quarter of the angle at which the advantage exceeds two — **the same geometry that multiplies the force also refuses to let the load return it**, which is the difference between a clamp and a lever.

**Mechanical advantage by instant centres.** For two links $i$ and $j$ driven through a common link, the velocity ratio is the inverse ratio of the distances from their instant centre to the two fixed centres:

$$
\frac{\omega_{\mathrm{out}}}{\omega_{\mathrm{in}}} = \frac{\text{distance from } I_{\mathrm{in,out}} \text{ to the input pivot}}{\text{distance from } I_{\mathrm{in,out}} \text{ to the output pivot}}
$$

**and the mechanical advantage is its reciprocal.** The reason this is the fastest way to size a linkage is that it needs no algebra, only a drawing — and the reason it is exact is Kennedy's theorem.

::: theorem Aronhold–Kennedy {#thm-kennedy}
**Three bodies moving relative to one another have three instant centres, and they lie on a straight line.**
**Proof sketch.** Let the three bodies be $1$, $2$, $3$ with instant centres $P_{12}$, $P_{13}$, $P_{23}$. The velocity of the point of body $2$ coincident with $P_{12}$ is perpendicular to the line joining it to $P_{13}$ only if $P_{23}$ lies on that line; **if $P_{23}$ were off the line, the two bodies $2$ and $3$ would have two different velocities at the same point, which is impossible.** $\blacksquare$
**The number of instant centres** of an $N$-link mechanism is $\binom{N}{2} = N \left( N - 1 \right) / 2$: **four links have six, six links have fifteen, eight links have twenty-eight.** The reason the count matters is that Kennedy's theorem locates them two at a time and the construction closes only if you choose the right three bodies — and the reason a six-bar's fifteen centres take a page to find and a minute to check is that each is the intersection of two lines each found from a different triple.
:::
:::

::: widget plot
f: acos((20800-(10900-6000*cos(x*pi/180)))/19200)*180/pi
x: 0, 360
y: 30, 85
caption: The transmission angle of a four-bar with ground $100$, crank $30$, coupler $120$ and rocker $80$ millimetres, plotted against crank angle. **The minimum of $34^\circ$ occurs at $\theta = 0$ and the maximum of $78^\circ$ at $\theta = 180^\circ$** — the two dead-centre positions of the crank, which is where $d$ is shortest and longest. **The mechanism fails the $40^\circ$ rule** and the reason it must be re-proportioned rather than merely re-sized is that the minimum transmission angle is set by the ratio of the two extreme diagonals and not by the scale: **the fix is to lengthen the rocker or shorten the crank, and the reason shortening the crank is usually the cheaper of the two is that it also reduces the input torque ripple.**
:::

## Straight lines, dwell and the shape of motion

::: definition Straight-line and function-generating linkages {#def-straightline}
**A straight line is not free.** A point on a four-bar's coupler traces a **coupler curve**, and a coupler curve is a sextic — a sixth-degree algebraic curve — which can be made very flat over a short span but never exactly straight. **Exact straightness needs either a sliding pair or six or more links.**

$$
\begin{array}{l c c l}
\text{Mechanism} & N & J_1 & \text{Straightness} \\
\text{Watt's parallel motion} & 5 & 6 & \text{approximate, } 1 / 600 \text{ of span} \\
\text{Chebyshev } 2\text{-}1\text{-}2 & 4 & 4 & \text{approximate, three exact points} \\
\text{Hart's inversor} & 6 & 7 & \text{approximate, on a circle} \\
\text{Peaucellier–Lipkin cell} & 7 & 8 & \text{exact} \\
\text{Scott Russell} & 4 & 4 & \text{exact, but needs a sliding pair} \\
\text{Lemniscate (Watt, } s = l \text{)} & 4 & 4 & \text{approximate, very flat centre}
\end{array}
$$

**The Peaucellier cell is the interesting count.** Links: frame, four rhombus bars and two long bars: $N = 7$. Joints: two fixed pins, two simple rhombus vertices, and **two vertices at which three bars meet**:
$$
J_1 = 2 + 2 + 2 \times 2 = 8 \qquad \Rightarrow \qquad M = 3 \left( 6 \right) - 2 \left( 8 \right) = 18 - 16 = 2
$$
**The formula says two and the mechanism has one.** The rhombus is a parallelogram, and a parallelogram's fourth joint adds a constraint that the equality of opposite sides already imposed — **one redundant constraint**, so the true mobility is $2 - 1 = 1$. **The reason the Peaucellier cell is the standard counter-example to the Kutzbach criterion is exactly this**, and the reason it is also the standard example of a mechanism that must be made to a tolerance is that the redundancy becomes an active constraint the moment the bars are not exactly equal.

**Chebyshev's linkage** is a four-bar with $l_{\mathrm{ground}} = 4$, $l_{\mathrm{crank}} = l_{\mathrm{rocker}} = 1.5$, $l_{\mathrm{coupler}} = 3.5$ and a coupler point at $5 / 7$ along the coupler; **its path deviates from a straight line by $1 / 4000$ of its length** and it has **three points of exact straightness**, which is the maximum a four-bar can deliver. **The number that makes three the maximum is the number of free parameters:** a four-bar's coupler point position is set by five numbers, and a straight line segment to third order costs three conditions, so three exact points and two remaining freedoms is the whole of the design space. **This is Chebyshev's 1853 result on function approximation with a hinge mechanism, and it is the same counting argument that underlies every "order of accuracy" statement in this course.**

**Function generation.** A mechanism that makes $y = f \left( x \right)$ can be made to satisfy $n$ **precision points** exactly if it has $n$ adjustable parameters; a four-bar has five, so it can fit five points exactly and the error between them oscillates. **The reason a five-point fit is preferred to a three-point fit over the same range is that the maximum error falls by a factor of about four**, and the reason nobody fits five points on a mechanism that must also pass a transmission-angle check is that the five conditions leave nothing to trade.
:::

::: definition Intermittent motion {#def-intermittent}
$$
\begin{array}{l c c l}
\text{Mechanism} & \text{Dwell fraction} & \text{Index accuracy} & \text{Limiting factor} \\
\text{Geneva, 4-slot} & 0.750 & \pm 0.02^{\circ} & \text{slot-entry jerk} \\
\text{Geneva, 8-slot} & 0.625 & \pm 0.02^{\circ} & \text{slot-entry jerk} \\
\text{Geneva, 6-slot} & 0.667 & \pm 0.02^{\circ} & \text{lower throughput} \\
\text{Ratchet and pawl} & \text{adjustable} & \text{friction-limited} & \text{pawl bounce at speed} \\
\text{Escapement (clock)} & 0.99 & \text{very high} & \text{impulse loss} \\
\text{Cam index (globoid)} & \text{continuous} & \pm 0.05^{\circ} & \text{cam wear} \\
\text{Crank and slot} & 0.50 & \text{sinusoidal} & \text{no true dwell}
\end{array}
$$

**The Geneva's velocity law.** For a four-slot Geneva with centre distance $a$ and crank radius $r = a \sin 45^\circ = 0.707 a$, the driven wheel's angular position during engagement is
$$
\psi = - \arctan \frac{r \sin \theta}{a - r \cos \theta}
$$
**and its angular velocity is zero at $\theta = 0$ only if the slot is entered radially** — which happens at exactly one instant, $\theta = 0$, and is the reason the pin enters the slot without impact at that instant and why the **jerk** $d^3 \psi / dt^3$ is nevertheless infinite at entry and exit.
**The two design numbers.** The crank's engagement angle is $180^{\circ} - 360^{\circ} / \left( 2 n \right)$ and the dwell fraction is
$$
\boxed{ \; \text{dwell fraction} = \frac{1}{2} + \frac{1}{n} \; } \qquad
\begin{array}{c c c c}
n & 4 & 6 & 8 \\
\text{dwell} & 0.750 & 0.667 & 0.625 \\
\ddot{\psi}_{\max} / \omega_d^2 & 1.48 & 0.73 & 0.42
\end{array}
$$
**The trade that makes the Geneva a compromise.** More slots means a **lower peak acceleration** — and therefore a higher permissible speed and a heavier permissible payload — and a **shorter dwell**, which is the part of the cycle in which the workpiece is worked on. **The number that makes a four-slot Geneva a fast machine and a bad one is that its dwell fraction is the highest of the family while its peak angular acceleration is three and a half times an eight-slot's**, and the reason a packaging line that needs a long dwell and a gentle index uses a **globoid cam** or a **servo-driven index** is that the Geneva cannot give both.
:::

## Worked cases

::: example Grashof classification {#ex-grashof}
Classify the four-bars (a) $40$, $110$, $130$, $160$; (b) $50$, $100$, $120$, $150$; (c) $60$, $80$, $100$, $120$ millimetres, taking the last dimension as the frame in each case, and state the type.
::: solution
**(a)** $s = 40$, $l = 160$, $p + q = 110 + 130 = 240$.
$$
s + l = 200 \; < \; 240 \qquad \text{Grashof}
$$
**The shortest link is $40$, and the frame is $160$ — the shortest link is adjacent to the frame**, so the mechanism is a **crank–rocker** with the $40$-millimetre link as the crank.
**The check that catches the common error.** The classification depends on **which link is the frame**, and the reason the same four bars give three different mechanisms is that Grashof's condition is a property of the chain and the type is a property of the inversion:
$$
\begin{array}{l l}
\text{frame} = 160 & \text{crank–rocker} \quad \text{(shortest link adjacent to frame)} \\
\text{frame} = 40 & \text{double-crank} \quad \text{(shortest link is the frame)} \\
\text{frame} = 110 \text{ or } 130 & \text{double-rocker with a rotating coupler}
\end{array}
$$
**(b)** $s = 50$, $l = 150$, $p + q = 220$:
$$
s + l = 200 \; < \; 220 \qquad \text{Grashof, and the frame } \left( 150 \right) \text{ is the longest link}
$$
**The shortest link is adjacent to the frame, so this is also a crank–rocker** — but a much better-behaved one, because the ratio $l / s = 3.0$ against (a)'s $4.0$ means the rocker's swing is less extreme and the transmission angle stays higher.
**(c)** $s = 60$, $l = 120$, $p + q = 180$:
$$
s + l = 180 \; = \; 180 \qquad \text{change point}
$$
**The four bars fold flat.** At that configuration the crank and coupler are collinear and the rocker and frame are collinear, and the mechanism can continue in its present circuit or flip into the other. **The number that makes this a design decision and not a curiosity is that the fold is reached at exactly one crank angle and the mechanism must be prevented from reaching it by a stop, a latch or a spring, or else designed to pass through it with enough inertia to choose the intended continuation** — which is what a folding chair's seat spring does.
*Sanity.* The reason $s + l \le p + q$ is the whole of the classification is that the four bars can reach the folded configuration if and only if the sum of two opposite bars equals the sum of the other two, and the reason the inequality is strict for a usable mechanism is that a mechanism that can fold is a mechanism that can collapse. **The number that makes (a) a poor choice is its $l / s = 4$:** the rocker's angular swing is $128^\circ$ and its minimum transmission angle is $23^\circ$, against (b)'s swing of $104^\circ$ and minimum of $41^\circ$.
:::
:::

::: example Locating instant centres {#ex-centres}
A four-bar has frame $A_0 A_4$, crank $A_0 A$, coupler $A B$ and rocker $A_4 B$, with $A_0 A_4 = 100$, $A_0 A = 40$, $A B = 120$, $A_4 B = 90$ millimetres and crank angle $\theta = 60^\circ$. Find the six instant centres and the velocity ratio $\omega_4 / \omega_2$.
::: solution
**The count.** $N = 4$, so $\binom{4}{2} = 6$ instant centres.
**Four are known from the joints:** $I_{12} = A_0$, $I_{23} = A$, $I_{34} = B$, $I_{14} = A_4$.
**Two are found from Kennedy's theorem.** The remaining pairs are $\left( 1, 3 \right)$ and $\left( 2, 4 \right)$.
- $I_{13}$ lies on the line $I_{12} I_{23} = A_0 A$ **and** on the line $I_{14} I_{34} = A_4 B$. **It is their intersection.**
- $I_{24}$ lies on $A_0 A_4$ **and** on $A B$. **It is their intersection.**
**The coordinates.** With $A_0$ at the origin and $A_4$ at $\left( 100, 0 \right)$:
$$
A = \left( 40 \cos 60^\circ,\; 40 \sin 60^\circ \right) = \left( 20.0,\; 34.64 \right)
$$
**Locating $B$:** it lies on the circle of radius $120$ about $A$ and radius $90$ about $A_4$.
$$
\left( x - 20 \right)^2 + \left( y - 34.64 \right)^2 = 14{,}400, \qquad
\left( x - 100 \right)^2 + y^2 = 8{,}100
$$
Subtracting and solving gives $B = \left( 108.3,\; 83.1 \right)$ — **the open circuit**; the crossed circuit gives $B = \left( 66.0,\; - 24.4 \right)$.
**$I_{13}$:** the line $A_0 A$ is $y = 1.732 x$; the line $A_4 B$ has slope $\left( 83.1 - 0 \right) / \left( 108.3 - 100 \right) = 0.9667$, so $y = 0.9667 \left( x - 100 \right)$.
$$
1.732 x = 0.9667 x - 96.67 \qquad \Rightarrow \qquad x = - 148.3, \quad y = - 256.9
\qquad I_{13} = \left( - 148.3,\; - 256.9 \right)
$$
**$I_{24}$:** the line $A B$ has slope $\left( 83.1 - 34.64 \right) / \left( 108.3 - 20.0 \right) = 0.6505$, so $y = 34.64 + 0.6505 \left( x - 20 \right)$; setting $y = 0$:
$$
x = 20 - \frac{34.64}{0.6505} = - 33.26 \qquad I_{24} = \left( - 33.26,\; 0 \right)
$$
**The velocity ratio.** Kennedy's construction gives the angular-velocity-ratio theorem:
$$
\frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}}
= \frac{\left| - 33.26 - 0 \right|}{\left| - 33.26 - 100 \right|} = \frac{33.26}{133.26} = \mathbf{0.2496}
$$
**The reading.** **The rocker turns at a quarter of the crank's speed at this instant, in the same sense** because $I_{24}$ lies **outside** the segment $A_0 A_4$; when the coupler line crosses between the two frame pivots the ratio changes sign, and the reason a rocker's velocity curve passes through zero twice per crank revolution is that $I_{24}$ recedes to infinity at each of the rocker's two extreme positions.
**The mechanical advantage.** The output force divided by the input force is the reciprocal of the velocity ratio times the efficiency:
$$
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} \approx \frac{1}{0.2496} \times \frac{r_{\mathrm{in}}}{r_{\mathrm{out}}}
$$
**and the reason the ratio of lever arms appears is that the velocity ratio is an angular one** — the reason the instant-centre method gives the answer in one division and the loop-equation method gives it in two pages of algebra is that Kennedy's theorem is the loop equation, drawn.
*Sanity.* The reason $I_{13}$ is $295\ \mathrm{mm}$ from $A_0$ and outside the mechanism is that the coupler is nearly in pure translation at this configuration, and a body in pure translation has its instant centre at infinity. **The number that makes the construction checkable is that $I_{12}$, $I_{13}$ and $I_{14}$ are not collinear while $I_{12}$, $I_{23}$, $I_{13}$ are and $I_{14}$, $I_{34}$, $I_{13}$ are** — three collinear triples, one for each of the four triples of bodies, and the reason a draughtsman draws the two lines in a different colour is that a single misplaced line puts $I_{13}$ on the wrong side of the frame and reverses the sign of the answer.
:::
:::

::: example A linkage for a hospital bed {#ex-bed}
Design the lift mechanism for a **hospital bed's back section**: the section is $1.8\ \mathrm{m}$ long, pivots at its foot, must rise from $0^\circ$ to $65^\circ$, must be driven by a single $500\ \mathrm{N}$ max-force linear actuator with $320\ \mathrm{mm}$ of stroke, and must hold its position with the actuator de-energised.
::: solution
**The requirement, restated as kinematics.** One input, one output, a prescribed two-position path with a force constraint between them, and a **self-locking** property. The self-locking requirement is the one that chooses the mechanism: a mechanism whose mechanical advantage is **finite** at every position will back-drive, so the linkage must pass near a toggle or the actuator must be a lead-screw type.
**The candidate set.**
$$
\begin{array}{l c c c}
\text{Mechanism} & \text{Mobility} & \text{Self-locking} & \text{Actuator force} \\
\text{Direct actuator on the section} & 1 & \text{no} & 3{,}900\ \mathrm{N} \quad \text{rejected} \\
\text{Four-bar, actuator on the coupler} & 1 & \text{no} & 620\ \mathrm{N} \\
\text{Four-bar near toggle at } 65^\circ & 1 & \text{marginal} & 470\ \mathrm{N} \\
\text{Six-bar with a knee joint} & 1 & \text{yes} & 410\ \mathrm{N} \quad \text{chosen} \\
\text{Lead-screw actuator, direct} & 1 & \text{yes} & 3{,}900\ \mathrm{N} \quad \text{motor too large}
\end{array}
$$
**The chosen topology: a knee-joint six-bar.** The back section is the rocker of a four-bar; the actuator drives the coupler through a **second** four-bar whose two links become collinear near the top of travel. Mobility:
$$
N = 6, \qquad J_1 = 7 \qquad \Rightarrow \qquad M = 3 \left( 5 \right) - 14 = 1 \quad \checkmark
$$
**The stroke match.** The actuator must shorten by $320\ \mathrm{mm}$ while the section rises $65^\circ$. The knee joint's mechanical advantage varies as
$$
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \frac{1}{2 \sin \left( \phi / 2 \right)}
$$
where $\phi$ is the knee's opening angle. Setting $\phi = 168^\circ$ at the bottom and $\phi = 22^\circ$ at the top:
$$
\left. \frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} \right|_{\mathrm{bottom}} = \frac{1}{2 \sin 84^\circ} = 0.503, \qquad
\left. \frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} \right|_{\mathrm{top}} = \frac{1}{2 \sin 11^\circ} = 2.62
$$
**The load.** A $1.8\ \mathrm{m}$ section with a $75\ \mathrm{kg}$ patient has a moment about the foot pivot of
$$
M_g = 75 \times 9.81 \times 0.9 \cos \beta = 662 \cos \beta\ \mathrm{N \cdot m}
$$
**at the worst angle $\beta = 0$, and the actuator's required force is $662 / \left( 0.503 \times 0.32 \right) = 4{,}120\ \mathrm{N}$** — far over the $500\ \mathrm{N}$ limit. **The knee joint alone is not enough; the four-bar must contribute a further ratio of $8.2$.**
**The re-proportioning.** Lengthen the four-bar's input arm to $260\ \mathrm{mm}$ and shorten the actuator's attachment to $70\ \mathrm{mm}$:
$$
\text{four-bar ratio at } \beta = 0: \quad \frac{260}{70} \times \sin 78^\circ = 3.64
\qquad \Rightarrow \qquad F_{\mathrm{act}} = \frac{662}{3.64 \times 0.503 \times 0.32} = 1{,}130\ \mathrm{N}
$$
**still over.** The remaining factor must come from the geometry, and the reason the design converges on a **compound knee with a $14^\circ$ residual** rather than a deeper toggle is that a deeper toggle makes the mechanism **over-centre**, and an over-centred bed back-rest cannot be lowered by the patient's own weight when the actuator fails — which the standard forbids.
**The final compromise:** a knee residual of $14^\circ$ giving a holding advantage of $4.1$, a four-bar ratio of $3.64$, and a **braking gear on the actuator** to carry the residual back-drive:
$$
F_{\mathrm{act,raise}} = \frac{662}{3.64 \times 4.1 \times 0.32} = 139\ \mathrm{N} \quad \text{at } \beta = 0
$$
**with a peak of $430\ \mathrm{N}$ at $\beta = 65^\circ$ where the four-bar ratio falls to $1.1$** — inside the $500\ \mathrm{N}$ limit with $14\ \%$ margin.
**The transmission-angle check.** The four-bar's minimum transmission angle over the working range is $46^\circ$, and the reason it is not higher is that raising it shortens the actuator's effective stroke below $320\ \mathrm{mm}$. **The number that makes $46^\circ$ acceptable is that the mechanism is not required to be back-drivable, so the friction penalty of a low transmission angle costs efficiency and not function** — and the reason the same $46^\circ$ would be rejected in a high-speed linkage is that the inertia forces scale with $1 / \sin^2 \mu$.
**The failure modes.**
$$
\begin{array}{l l}
\text{Actuator fails at } \beta = 65^\circ & \text{the knee holds by geometry; verified by a dead-load test at } 1.5 \times \text{ rated} \\
\text{Actuator fails at } \beta = 0 & \text{the brake holds; the brake is spring-applied and current-released} \\
\text{Pin wear at the knee} & \text{the advantage falls as the residual angle grows; inspected at } 0.1\ \mathrm{mm} \text{ clearance} \\
\text{Patient leans on the rail} & \text{a } 250\ \mathrm{N} \text{ side load at the head end must not back-drive the knee} \\
\text{Entrance at the knee joint} & \text{a } 4\ \mathrm{mm} \text{ gap must remain at full raise; the pinch point is the safety item}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Mobility} & \text{one input, verified by the count and by a physical prototype with all pins free} \\
\text{Force} & \text{measured actuator force against angle, within } \pm 10\ \% \text{ of the model} \\
\text{Holding} & 1.5 \times \text{ rated load held for } 10 \text{ minutes with the actuator de-energised} \\
\text{Cyclic} & 10{,}000 \text{ cycles at } 1.5 \times \text{ rated, then re-measure the force curve and the knee clearance} \\
\text{Single-fault} & \text{failure of either pin must leave the section supported} \\
\text{Entrance} & \text{IEC 60601-2-52 finger-and-probe test at every moving joint}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE MECHANISM SHALL BE DEMONSTRATED TO HAVE ONE DEGREE OF FREEDOM WITH ALL JOINTS LUBRICATED AND WITHIN TOLERANCE, AND THE DEMONSTRATION SHALL BE REPEATED AFTER THE CYCLING TEST."** **"THE BACK-REST SHALL NOT DESCEND BY MORE THAN TEN DEGREES FROM ITS HIGHEST POSITION WITH THE ACTUATOR DISCONNECTED AND THE RATED LOAD APPLIED."** **"THE ACTUATOR FORCE AGAINST ANGLE CURVE SHALL BE MEASURED AND REPORTED, AND THE RATED FORCE OF THE SUPPLIED ACTUATOR SHALL EXCEED THE PEAK MEASURED VALUE BY AT LEAST TWENTY PER CENT."** **"EVERY PIN SHALL BE DOUBLY RETAINED AND NO SINGLE FASTENER SHALL BE THE SOLE MEANS OF PREVENTING A JOINT SEPARATION."**
*Design comment.* The general rule is that **a self-locking requirement is a mobility requirement in disguise** — it says the mechanism must be a structure when un-driven, which is a statement about a toggle and not about a brake — and the reason the medical-device standard specifies a measured force curve rather than a calculated one is that the calculated curve is exact only for perfectly rigid links, and a $0.3\ \mathrm{mm}$ pin clearance moves the toggle by three degrees and the peak force by twenty per cent.
:::
:::

::: history
**Chebyshov** (Chebyshev) read a paper in **1853** on the translational linkages of James Watt and showed that a four-bar could guide a point along a straight line to within one part in four thousand — and then went much further, proving in the same work that a hinge mechanism with $n$ parameters can fit $n$ precision points exactly, which is the theorem every function-generation chapter still uses and which antedates by a decade the approximation theory for which he is actually famous. **Sarkis Gruebler** published his criterion in **1883** in a paper on the construction of mechanisms; **Karl Kutzbach** generalised it to three dimensions in **1916** in the same journal, and both were reacting to a practical need — the classification of the textile and printing machinery of the period. **The Peaucellier–Lipkin cell is of 1864: a schoolboy of sixteen named I. M. S. Lipkin submitted the design to the Imperial Technical School in St Petersburg a few weeks after Peaucellier published it in a French engineering journal, and the priority dispute was never settled.** **Aronhold stated his theorem on the collinearity of three instant centres in 1872 and Kennedy published it in 1886; Reuleaux had by then built the kinematic model of the machine from the pair concept, and his 1876 Kinematics der Maschinen is the book that made the subject a discipline rather than a collection of devices.** **Grashof's condition was published in 1883 in the same volume as Gruebler's criterion, and Huntington's proof that planar linkages of binary and ternary links have no passive freedoms did not appear until 1975 — ninety-two years after the criterion it repairs.**
:::

## Where this leads

The mobility count is the first thing done to every mechanism in [[mechanisms/position-analysis]], [[mechanisms/velocity-analysis]] and [[mechanisms/acceleration-analysis]]; the transmission-angle rule is the reason [[mechanisms/linkage-synthesis]] spends most of its time on proportions and not on topology; the instant-centre method is the shortest route into [[mechanisms/gears]]' tooth-action geometry; and the toggle and self-locking arguments reappear in [[machine-design]]'s clutches, brakes and fasteners and in [[robotics]]' singularity analysis, where a redundant constraint is called a **constraint conflict** and costs the same prototype it always has.

::: summary
- Mobility is $M = 3(N-1) - 2J_1 - J_2$ in the plane and $6(N-1) - \sum c_i$ in space; $M=0$ is a structure, $M=1$ is a drivable mechanism, $M<0$ is over-constrained.
- Count $n-1$ turning pairs where $n$ members meet at a pin; a rigid triangle is one link; weld idle rollers before counting.
- The criterion is necessary and not sufficient: passive freedoms, redundant constraints and special geometry are its three failure modes.
- Huntington's theorem protects linkages of binary and ternary links with turning pairs only; the Peaucellier cell, with its quaternary joints, is not protected.
- Grashof's $s+l \le p+q$ decides rotatability; the mechanism's type is decided by which link is the frame.
- Keep the transmission angle between $40^\circ$ and $140^\circ$; a toggle is where the mechanical advantage is infinite and the mechanism becomes a clamp.
- Kennedy's theorem puts three instant centres on a line, and $N(N-1)/2$ of them exist; the velocity ratio is a ratio of drawn lengths.
- Exact straight lines need six or more links or a sliding pair; a four-bar buys three exact points and no more.
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
A six-bar Watt chain has $N=6$, five simple pins and one pin where three members meet. Give the mobility.
::: solution
$J_1=5+2=7$; $M=3(5)-2(7)=15-14=1$.
:::
:::

::: exercise Cam mobility {level=1 check="1"}
Give the useful mobility of a cam mechanism with a roller oscillating follower, after welding the roller to its arm.
::: solution
$N=3$, $J_1=2$, $J_2=1$: $M=3(2)-2(2)-1=1$.
:::
:::

::: exercise Spatial mobility {level=1 check="6"}
Give the mobility of a single free rigid body in space.
::: solution
$M=6(N-1)-\sum c_i=6(0)-0=6$.
:::
:::

::: exercise Grashof {level=1 check="0"}
For a four-bar with links $60$, $80$, $100$ and $120$ millimetres, give the value of $(s+l)-(p+q)$ and state whether the chain is Grashof.
::: solution
$s+l=60+120=180$, $p+q=80+100=180$: the difference is $0$ — a change point.
:::
:::

::: exercise Instant centres {level=1 check="15"}
Give the number of instant centres in a six-link mechanism.
::: solution
$\binom{6}{2}=6\times5/2=15$.
:::
:::

::: exercise Transmission angle {level=1 check="34.1"}
For the four-bar of the widget — ground $100$, crank $30$, coupler $120$, rocker $80$ — give the minimum transmission angle in degrees.
::: solution
At $\theta=0$, $d^2=10900-6000=4900$; $\cos\mu=(14400+6400-4900)/19200=0.8281$, $\mu=34.1^\circ$.
:::
:::

::: exercise Toggle advantage {level=2}
A toggle clamp has an included-angle deviation of $\phi = 3^\circ$ from full extension. Give the ideal mechanical advantage $1/(2\sin(\phi/2))$ and state the efficiency at which it stops being back-drivable.
::: solution
$$
\frac{1}{2 \sin 1.5^\circ} = \frac{1}{2 \times 0.02618} = 19.1
$$
**A mechanism stops being back-drivable when its forward efficiency falls below the reciprocal of the square root of the ideal advantage**, which here is $1 / \sqrt{19.1} = 0.229$: **an efficiency below $23\ \%$ makes the clamp self-locking**, and the reason real toggle clamps use a plain bushing rather than a needle roller at the knee is that the plain bushing's $25$ to $30\ \%$ efficiency is exactly what makes the clamp hold.
:::
:::

::: exercise A mechanism that will not move {level=2}
A designer closes a four-bar chain with a fifth bar across the diagonals and finds $M = -1$. Give the count and state the two remedies.
::: solution
$$
N = 5, \qquad J_1 = 6 \qquad \Rightarrow \qquad M = 3 \left( 4 \right) - 2 \left( 6 \right) = 12 - 12 = 0
$$
**The count gives zero, not minus one** — the fifth bar has turned the mechanism into a structure. To get $M = -1$ the designer must have added a **second** redundant bar, $J_1 = 7$, giving $M = 12 - 14 = -2$, or has a frame that fixes two extra coordinates. **The two remedies are to remove the redundant constraint — replace one turning pair by a cylindrical pair, or make one joint a slot — or to accept the structure and hold the links to the tolerance that makes the geometry consistent.** The reason the first is almost always chosen is that a $0.05\ \mathrm{mm}$ consistency tolerance over a $500\ \mathrm{mm}$ four-bar is a jig-borer's job and a slot is a five-minute change.
:::
:::

::: exercise Derivation {level=3}
Derive the Gruebler–Kutzbach criterion for a planar mechanism, and derive the condition under which a closed $n$-bar loop has zero mobility.
::: solution
**Count the coordinates.** $N$ links in the plane have $3N$ coordinates. **The frame is fixed**, which removes $3$: $3 \left( N - 1 \right)$ coordinates remain.
**Count the constraints.** A planar turning or prismatic pair forces two coordinates to agree, so it removes $2$; a planar higher pair with sliding removes $1$ more loosely, and with rolling removes $1$. With $J_1$ and $J_2$ pairs:
$$
\boxed{ M = 3 \left( N - 1 \right) - 2 J_1 - J_2 }
$$
**The independent-coordinates argument, stated so its limits are visible.** The $3(N-1)$ count is right; the constraint count is right **only if every constraint is independent of the others**. Writing the constraint equations as $\Phi \left( \mathbf{q} \right) = 0$, the mobility is
$$
M = 3 \left( N - 1 \right) - \operatorname{rank} \left( \frac{\partial \Phi}{\partial \mathbf{q}} \right)
$$
**and the criterion replaces the rank by the number of equations.** The two differ exactly when the Jacobian loses rank, which happens when the constraints are geometrically dependent — a parallelogram, a redundant bar, or any configuration at which the mechanism is singular.
**The closed $n$-bar loop.** A single loop of $n$ binary links joined by $n$ turning pairs has $N = n$ links including the frame and $J_1 = n$:
$$
M = 3 \left( n - 1 \right) - 2 n = n - 3
$$
**so a loop of three bars is a structure, a loop of four bars is a mechanism of one mobility, and each additional bar in the same loop adds one mobility.** The reason a five-bar loop needs two actuators is that $M = 2$, and the reason a six-bar **single** loop is rarely used where a Watt or Stephenson **two**-loop chain is is that the single loop's $M = 3$ needs three inputs while the two-loop six-bar's $M = 1$ needs one.
**The loop form, which is the useful one.** A chain of $N$ links with $J_1$ joints has $L = J_1 - N + 1$ independent loops, so $J_1 = N - 1 + L$ and
$$
\boxed{ \; M = 3 \left( N - 1 \right) - 2 \left( N - 1 + L \right) = N - 1 - 2 L \; }
\qquad
\begin{array}{c c c c}
& N & L & M \\
\text{four-bar} & 4 & 1 & 1 \\
\text{five-bar} & 5 & 1 & 2 \\
\text{Watt six-bar} & 6 & 2 & 1 \\
\text{Stephenson six-bar} & 6 & 2 & 1 \\
\text{seven-bar, two loops} & 7 & 2 & 4
\end{array}
$$
**The reading of the loop form is that in a planar all-binary, all-turning-pair mechanism, mobility depends only on the link count and the loop count** — and the reason it is the fastest of the three equivalent statements is that a drawing tells you $N$ and $L$ directly, whereas $J_1$ requires you to have found every compound hinge.
**The corollary that rejects topologies on sight.** Setting $M = 1$ in $M = 3(N-1) - 2J_1$ gives
$$
J_1 = \frac{3 N - 4}{2}
$$
**which requires $N$ even.** A one-mobility planar mechanism built only from binary links and one-degree-of-freedom pairs must have an **even** number of links: four, six, eight — and **a five-link all-binary one-mobility planar mechanism does not exist.**
*Sanity.* The reason the corollary is worth memorising is that the designer who wants a one-input five-bar linkage is forced into one of exactly two devices: **a ternary link** — which makes it a six-bar — **or a joint of higher order**, and the reason the second is nearly always worse is that a higher pair costs more to make, wears faster and cannot be lubricated as well as a pin in a bushing.
**The check that ties the three statements together.** For the Watt six-bar: $N = 6$, $L = 2$, so $M = 6 - 1 - 4 = 1$, and $J_1 = 6 - 1 + 2 = 7$, and $3(5) - 2(7) = 1$. **Three routes, one answer, and the reason the loop count is the one to use in a review meeting is that it can be read off a schematic in four seconds and the joint count cannot.**
:::
:::

::: exercise Design {level=3}
Design the **indexing mechanism for a rotary packaging table** with eight stations, $45$ stations per minute, a payload of $12\ \mathrm{kg}$ per station, and a positional repeatability of $\pm 0.05^\circ$, and state the topology, the motion law, the sizing, the failure modes and the acceptance tests.
::: solution
**The duty.** Eight stations at $45$ per minute means one index per $1.333\ \mathrm{s}$, of which the dwell must occupy at least $0.9\ \mathrm{s}$ for fill, seal and check. **The motion requirement is $45^\circ$ of index in $0.43\ \mathrm{s}$ with a dwell of $0.90\ \mathrm{s}$, and a positional repeatability of $\pm 0.05^\circ$ at the $1.2\ \mathrm{m}$-diameter table's periphery is $\pm 1.05\ \mathrm{mm}$ — which is loose — but the $\pm 0.05^\circ$ is required at the **fill nozzle**, which is $80\ \mathrm{mm}$ from the axis, so the tolerance is $\pm 0.07\ \mathrm{mm}$.**
**The candidate set.**
$$
\begin{array}{l c c c c}
\text{Mechanism} & \text{Dwell} & \text{Repeatability} & \text{Peak accel.} & \text{Verdict} \\
\text{Four-slot Geneva} & 0.750 & \pm 0.02^\circ & 1.48\,\omega_d^2 & \text{too violent for } 12\ \mathrm{kg} \\
\text{Six-slot Geneva} & 0.667 & \pm 0.02^\circ & 0.73\,\omega_d^2 & \text{index time marginal} \\
\text{Eight-slot Geneva} & 0.625 & \pm 0.02^\circ & 0.42\,\omega_d^2 & \text{dwell too short} \\
\text{Globoid cam index} & \text{programmable} & \pm 0.05^\circ & \text{smooth} & \text{candidate} \\
\text{Servo and harmonic drive} & \text{programmable} & \pm 0.01^\circ & \text{programmable} & \text{candidate} \\
\text{Ratchet and pawl} & \text{adjustable} & \text{friction-limited} & \text{bounce} & \text{rejected}
\end{array}
$$
**The first test is the dwell.** A Geneva's dwell fraction is $\frac{1}{2} + \frac{1}{n}$, so an eight-slot wheel gives $0.625$ against the required $0.675$ — **the eight-slot fails on timing before anything else is considered**, and a six-slot at $0.667$ is a hair short. **The mobility count of any Geneva is nonetheless one**, and for an eight-slot wheel with the locking cam counted as part of the driver:
$$
N = 4 \left( \text{frame, driver, wheel, locking disc} \right), \quad J_1 = 3, \quad J_2 = 2 \qquad \Rightarrow \qquad M = 9 - 6 - 2 = 1 \quad \checkmark
$$
**The dwell is $180^{\circ} + 360^{\circ} / \left( 2 n \right) = 225^{\circ}$ of driver rotation and the index $135^{\circ}$**, and because the driver makes exactly one revolution per index the driver speed is set by the cycle alone:
$$
\omega_{\mathrm{driver}} = \frac{45}{60} = 0.75\ \mathrm{rev / s} = 45\ \mathrm{rev / min}
\qquad \Rightarrow \qquad \omega_d = 4.712\ \mathrm{rad / s}
$$
**The acceleration.** Taking the tabulated coefficient for an eight-slot wheel,
$$
\ddot{\psi}_{\max} = 0.42\, \omega_d^2 = 0.42 \times 22.2 = 9.3\ \mathrm{rad / s^2}
$$
**The torque at the table.** The table's own inertia plus eight stations of $12\ \mathrm{kg}$ at a mean radius of $0.5\ \mathrm{m}$:
$$
I = 8 \times 12 \times 0.5^2 + I_{\mathrm{table}} = 24 + 9 = 33\ \mathrm{kg \cdot m^2}
\qquad \Rightarrow \qquad T = 33 \times 9.3 = 307\ \mathrm{N \cdot m}
$$
**The number that makes the Geneva's torque acceptable and its timing not.** $307\ \mathrm{N \cdot m}$ is a servable figure, but the eight-slot's $0.625$ dwell fraction gives an index time of $0.50\ \mathrm{s}$ against the $0.433\ \mathrm{s}$ available, and **a Geneva's dwell fraction cannot be tuned — it is fixed by the slot count**, which is the difference between a cam and a Geneva. **The four-slot wheel would give the dwell but a peak of $1.48 \times 22.2 = 32.9\ \mathrm{rad / s^2}$ and $1{,}085\ \mathrm{N \cdot m}$, and the reason that is rejected is not the torque but the $12\ \mathrm{kg}$ of loose payload**, which at $0.5\ \mathrm{m}$ radius sees $16.5\ \mathrm{m / s^2}$ — one and a half times $g$ — and walks off its fixture. **The reason the repeatability requirement then becomes easy is that a servo's positioning error is a function of its encoder and not of the mechanism's clearances**, and the reason the cam is retained at all is that a servo holding a vertical table against a side load for $0.9\ \mathrm{s}$ every cycle creeps, and a form-closed cam does not.
**The chosen scheme: a servo-driven globoid (parallel) cam index drive**, whose motion law is set by the ground profile and whose dwell fraction is therefore a free parameter. Setting $45^{\circ}$ of index into $0.433\ \mathrm{s}$ on a **4-5-6-7 polynomial**, whose peak-acceleration coefficient is $5.77$:
$$
\ddot{\psi}_{\max} = 5.77 \frac{\Delta \psi}{t^2} = 5.77 \times \frac{0.7854}{0.433^2} = 24.2\ \mathrm{rad / s^2}
\qquad \Rightarrow \qquad T = 33 \times 24.2 = 799\ \mathrm{N \cdot m}
$$
**with a further $48\ \mathrm{N \cdot m}$ from the harmonic drive's own inertia reflected to the output**, giving a peak of $847\ \mathrm{N \cdot m}$ and an RMS of $310\ \mathrm{N \cdot m}$. **A $1{:}80$ harmonic drive turns that into a $10.6\ \mathrm{N \cdot m}$ peak at the motor, which a $5.5\ \mathrm{kW}$ servo delivers at $3{,}000\ \mathrm{rev / min}$ with $40\ \%$ margin.** The $\pm 0.05^\circ$ is achieved by the cam's ground profile and a rigid output flange, and the reason the cam is retained at all rather than a pure servo is that a servo holding a vertical table against a side load for $0.9\ \mathrm{s}$ every cycle creeps, and a form-closed cam does not.
**The failure modes.**
$$
\begin{array}{l l}
\text{Cam follower wear} & \text{the repeatability degrades before the profile is visibly damaged; measured monthly} \\
\text{Payload spillage into the joint} & \text{the drive is above the fill heads; IP69K and a positive-pressure purge} \\
\text{Servo following error} & \text{a jam trips the drive; the trip threshold is set at } 1.3 \times \text{ the profiled torque} \\
\text{Table resonance} & \text{the } 33\ \mathrm{kg \cdot m^2} \text{ table on its bearings has a first mode near } 28\ \mathrm{Hz} \text{; the index rate is } 0.75\ \mathrm{Hz} \\
\text{Loss of the locking phase} & \text{the table must not move when un-driven; a brake is fitted and tested weekly}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Repeatability} & \text{a } 0.001\ \mathrm{mm} \text{ dial gauge at } 80\ \mathrm{mm} \text{ radius, } 100 \text{ consecutive indices, } 3\sigma \le \pm 0.05^\circ \\
\text{Index time} & \text{measured against the profiled cam angle, within } \pm 2\ \% \\
\text{Torque} & \text{a torque transducer on the input, peak within } \pm 10\ \% \text{ of the model} \\
\text{Wear} & \text{repeatability re-measured after } 10^6 \text{ cycles} \\
\text{Single fault} & \text{a servo enable removal at the worst phase must not move the table more than } 0.1^\circ \\
\text{Clean-in-place} & \text{the drive is washed down at } 80^\circ\mathrm{C} \text{ with caustic, and the grease is food-grade H1}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE INDEX REPEATABILITY SHALL BE MEASURED AT THE TOOLING RADIUS SPECIFIED, OVER ONE HUNDRED CONSECUTIVE CYCLES, AND REPORTED AS A THREE-SIGMA VALUE."** **"THE MECHANISM SHALL HOLD THE TABLE AGAINST THE MAXIMUM SIDE LOAD WITH THE DRIVE DE-ENERGISED AND AFTER ONE MILLION CYCLES."** **"THE PEAK AND RMS TORQUE SHALL BE MEASURED AND THE DRIVE SIZED WITH NOT LESS THAN THIRTY PER CENT MARGIN ON PEAK TORQUE."** **"THE ACTUAL MOTION PROFILE, NOT THE NOMINAL ONE, SHALL BE RECORDED AT COMMISSIONING AND RETAINED AS THE BASELINE FOR CONDITION MONITORING."**
*Design comment.* The general rule is that **an intermittent-motion mechanism is chosen by its dwell and its locking, and only third by its index accuracy** — which is why the Geneva survives in high-speed bottling and the ratchet does not, and why the modern answer is a servo plus a form-closed cam rather than either alone, because the cam supplies the zero-cost locking and the servo supplies the changeable profile.
:::
:::
