Position analysis tells you where the parts are. Velocity analysis tells you **what the machine is doing right now**, and it is the velocity that sets the motor's power, the bearing's $PV$ limit, the pin's fatigue load, the noise, the wear and the vibration. It is also the place where the subject becomes genuinely visual, because a mechanism's velocities are not a system of equations that happens to have a picture — they **are** a picture, and the equations are the picture written down badly.

The reason is the **instant centre**: at every instant, every link in a planar mechanism is rotating about some point, and the velocity of every point on it is perpendicular to the line from that point. Find the centre and the whole velocity field follows by similar triangles. **Kennedy's theorem** tells you where the centres are by drawing straight lines, and the reason it was worth publishing in 1872 is that it turns a differentiation into a ruler.

::: warning Five velocity errors that survive a calculation check
**Differentiating the wrong branch.** The velocity is the derivative of the position, and the position has two branches. **The reason a symbolic differentiator that returns the derivative of the crossed-circuit solution is not "wrong but close" is that it is wrong by a factor of two and in the opposite direction**, and the reason a numerical derivative of the wrong branch is worse still is that it looks plausible at every angle except the ones that matter. **The number that makes this a common bug is that the two circuits of a four-bar have the same rocker angle at two different crank angles and the same rocker velocity at neither.**
**Confusing the velocity of a point with the velocity of a link.** A link has **one** angular velocity and **infinitely many** linear velocities. **The reason "what is the velocity of the coupler?" is an unanswerable question is that the coupler's centre of mass, its midpoint and its coupler point have three different speeds at the same instant**, and the reason the correct phrasing — "the velocity of the point of the coupler coincident with $B$" — is worth the extra six words is that the coincident-point distinction is what makes the Kennedy construction work at all.
**Using $v = \omega r$ across a joint.** The relation holds **within** a rigid body and never **between** two. **The reason $v_A = a \omega_2$ on the crank and $v_A = b \omega_3$ on the coupler is a category error is that the second expression is not a velocity at all** — $b \omega_3$ is the velocity of $B$ relative to $A$, and the reason a student who writes the equality gets $\omega_3 = \omega_2 a / b$ is that the equality is true only when $A$ is the instant centre, which it is not. **The number that makes the error detectable is that $v_{B/A} = b \left| \omega_3 \right|$ always, and $v_B = b \left| \omega_3 \right|$ almost never.**
**Forgetting the sliding velocity at a prismatic pair.** A slider's velocity is along its guide and nothing else, and the reason a Kennedy construction that ignores this puts the instant centre at the wrong place is that the prismatic pair's instant centre is **at infinity in the direction perpendicular to sliding**. **The number that makes the infinity a computational convenience rather than a puzzle is that a link whose instant centre is at infinity has zero angular velocity — it is in pure translation — and that the slider itself is such a link**, which is why its velocity is the same at every point on it.
**Reporting a mean when the design needs a peak.** The mean velocity ratio of a mechanism is its displacement ratio, and the reason that is a dangerous thing to quote for a shaping machine, a packaging index or a printing-press delivery is that **the peak-to-mean ratio of a mechanism's output velocity is routinely two to three, and the process is limited by the peak.** **The number that makes this a specification item is that a Geneva mechanism's peak output speed is $2.41$ times its mean for a four-slot wheel and $1.86$ for an eight-slot**, and the reason a machine rated on its mean index speed has a workpiece falling off the table is that the rating was made on the wrong statistic.
:::

## Two methods, one answer

::: definition Differentiation of the loop {#def-differentiate}
**Differentiate the loop-closure equation with respect to time.** With $\omega_k = d \theta_k / dt$, the four-bar loop $a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$ gives

$$
\boxed{ a \omega_2 i e^{i \theta_2} + b \omega_3 i e^{i \theta_3} = c \omega_4 i e^{i \theta_4} }
$$

**which is two real equations in the two unknowns** $\omega_3$ and $\omega_4$, **evaluated at the position you have already found.** Written out:

$$
\begin{aligned}
- a \omega_2 \sin \theta_2 - b \omega_3 \sin \theta_3 + c \omega_4 \sin \theta_4 &= 0 \\
a \omega_2 \cos \theta_2 + b \omega_3 \cos \theta_3 - c \omega_4 \cos \theta_4 &= 0
\end{aligned}
\qquad
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \omega_3 \ \omega_4 \end{pmatrix} =
\begin{pmatrix} a \omega_2 \sin \theta_2 \ - a \omega_2 \cos \theta_2 \end{pmatrix}
$$

**The determinant of that matrix is the same object as the transmission-angle sine.** Expanding:

$$
\det = b c \sin \theta_3 \cos \theta_4 - b c \cos \theta_3 \sin \theta_4 = b c \sin \left( \theta_3 - \theta_4 \right) = - b c \sin \mu
$$

**and the mechanism is singular exactly where $\sin \mu = 0$** — the transmission angle of [[mechanisms/mechanisms-mobility]] and the vanishing Jacobian of [[mechanisms/position-analysis]] and the coincident roots of the position quadratic are one condition in three languages. **The number that makes this the most useful single fact in the lesson is that the input torque required to drive a given output load is proportional to $1 / \sin \mu$, so a mechanism at $\mu = 20^\circ$ needs $2.9$ times the torque it needs at $\mu = 90^\circ$ and a mechanism at $\mu = 5^\circ$ needs eleven times.**
:::

::: definition Instant centres {#def-centres}
::: theorem Aronhold–Kennedy {#thm-kennedy2}
**Three bodies moving in a plane have three instant centres and they are collinear.**
**Proof.** Let $P_{12}$, $P_{13}$, $P_{23}$ be the centres of bodies $1$, $2$, $3$ taken in pairs. The velocity of the point of body $2$ coincident with $P_{12}$ is zero, and the velocity of the point of body $3$ coincident with $P_{13}$ is zero. Consider the point $Q$ coincident with $P_{12}$: its velocity as a point of body $2$ is zero, so as a point of body $3$ it must also be zero **relative to body $1$** — and a point of body $3$ whose velocity relative to body $1$ is zero must lie on $P_{13}$. **The velocity of $Q$ as a point of body $3$ is therefore perpendicular to the line $Q P_{13}$; but it is also perpendicular to the line joining $Q$ to $P_{23}$, because $P_{23}$ is the centre of $2$ relative to $3$. Two perpendiculars to one vector from one point force $P_{23}$ onto the line $Q P_{13}$, which is the line $P_{12} P_{13}$.** $\blacksquare$
:::

**The construction rules, which are all you need in practice.**

$$
\begin{array}{l l}
\text{Turning pair} & \text{the centre is at the pin} \\
\text{Prismatic pair} & \text{the centre is at infinity, perpendicular to the sliding direction} \\
\text{Rolling contact} & \text{the centre is at the contact point} \\
\text{Sliding contact} & \text{the centre is on the common normal, at a distance set by the velocity ratio} \\
\text{Gear mesh} & \text{the centre is at the pitch point, on the line of centres} \\
\text{Two known centres} & \text{the third is on the line joining them (Kennedy)}
\end{array}
$$

**The angular-velocity-ratio theorem.** For links $2$ and $4$ connected through link $3$,

$$
\boxed{ \frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} }
$$

**measured along the line joining $I_{12}$, $I_{14}$ and $I_{24}$, which Kennedy guarantees is a straight line.** **The reason this is the fastest velocity method in existence is that it needs the position solution and a ruler and no trigonometry at all**, and the reason it is exact is that it is the loop-equation's determinant written as a ratio of sines.

**The mechanical advantage** follows from conservation of power, ideal or otherwise:

$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4} = \frac{\eta}{\text{velocity ratio}}, \qquad
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \eta \frac{v_{\mathrm{in}}}{v_{\mathrm{out}}}
$$

**and the reason efficiency multiplies rather than divides is that a loss makes the output weaker, not the input stronger** — a point on which a great many data sheets are wrong, and the reason a self-locking mechanism is one whose efficiency through the toggle falls below one-half is that at that point the load can drive the input and cannot.
:::

::: example Four-bar velocity, both methods {#ex-vel4}
The four-bar $a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$ metres has $\theta_2 = 40^\circ$ and $\omega_2 = 10\ \mathrm{rad / s}$ counter-clockwise. From the position solution $\theta_3 = 24.44^\circ$, $\theta_4 = 65.37^\circ$, $A = \left( 0.3830, 0.3214 \right)$, $B = \left( 1.4747, 0.8180 \right)$. Find $\omega_3$, $\omega_4$, the velocity of the coupler point $P = \left( 0.848, 0.972 \right)$, and the torque ratio.
::: solution
**Method 1 — differentiation.**
$$
v_A = a \omega_2 = 0.5 \times 10 = 5.00\ \mathrm{m / s}, \qquad
\vec{v}_A = 5.00 \left( - \sin 40^\circ, \cos 40^\circ \right) = \left( - 3.214,\; 3.830 \right)\ \mathrm{m / s}
$$
**The two scalar equations:**
$$
- 3.214 - 1.2 \omega_3 \sin 24.44^\circ + 0.9 \omega_4 \sin 65.37^\circ = 0
\qquad \Rightarrow \qquad - 3.214 - 0.4966 \omega_3 + 0.8180 \omega_4 = 0
$$
$$
3.830 + 1.2 \omega_3 \cos 24.44^\circ - 0.9 \omega_4 \cos 65.37^\circ = 0
\qquad \Rightarrow \qquad 3.830 + 1.0917 \omega_3 - 0.3747 \omega_4 = 0
$$
**From the second,** $\omega_4 = \left( 3.830 + 1.0917 \omega_3 \right) / 0.3747 = 10.221 + 2.9133 \omega_3$. **Substituting into the first:**
$$
- 3.214 - 0.4966 \omega_3 + 0.8180 \left( 10.221 + 2.9133 \omega_3 \right) = 0
\qquad \Rightarrow \qquad 5.147 + 1.8865 \omega_3 = 0
$$
$$
\boxed{ \omega_3 = - 2.728\ \mathrm{rad / s} \quad \left( \text{clockwise} \right) }, \qquad
\boxed{ \omega_4 = 10.221 - 7.948 = 2.272\ \mathrm{rad / s} \quad \left( \text{counter-clockwise} \right) }
$$
**Method 2 — instant centres.** The four pin centres are $I_{12} = O_2 = \left( 0, 0 \right)$, $I_{14} = O_4 = \left( 1.1, 0 \right)$, $I_{23} = A$, $I_{34} = B$. **The one that matters is** $I_{24}$, **on the line of the two fixed pivots and on the line of the coupler** — the intersection of $AB$ with the $x$-axis:
$$
\text{slope of } AB = \frac{0.8180 - 0.3214}{1.4747 - 0.3830} = 0.4549
\qquad \Rightarrow \qquad x_{24} = 0.3830 - \frac{0.3214}{0.4549} = - 0.3235
$$
$$
\frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} = \frac{0.3235}{1.1 + 0.3235} = 0.2273
\qquad \Rightarrow \qquad \omega_4 = 0.2273 \times 10 = \mathbf{2.273\ \mathrm{rad / s}} \quad \checkmark
$$
**The two methods agree to four figures, and the reason the second is preferred in a design review is that it takes eleven seconds and the first takes four minutes.**
**The velocity of $B$:**
$$
v_B = c \left| \omega_4 \right| = 0.9 \times 2.272 = 2.045\ \mathrm{m / s}
$$
**Careful with the direction:** $\vec{v}_B$ is perpendicular to $O_4 B$ in the sense of $\omega_4$. With $\hat{u} = \left( 0.4164, 0.9089 \right)$ along $O_4 B$,
$$
\vec{v}_B = c \omega_4 \left( - u_y, u_x \right) = 2.045 \left( - 0.9089,\; 0.4164 \right) = \left( - 1.859,\; 0.852 \right)\ \mathrm{m / s}
$$
**The check by relative velocity:**
$$
v_{B / A} = b \left| \omega_3 \right| = 1.2 \times 2.728 = 3.274\ \mathrm{m / s}
\qquad \vec{v}_{B / A} = 1.2 \left( - 2.728 \right) \left( - 0.4139,\; 0.9098 \right) = \left( 1.355,\; - 2.978 \right)
$$
$$
\vec{v}_B = \vec{v}_A + \vec{v}_{B / A} = \left( - 3.214 + 1.355,\; 3.830 - 2.978 \right) = \left( - 1.859,\; 0.852 \right) \quad \checkmark
$$
**The velocity of the coupler point $P$, by the instant centre $I_{13}$.** $I_{13}$ is on $O_2 A$ and on $O_4 B$:
$$
\text{line } O_2 A: y = 0.8391 x; \qquad \text{line } O_4 B: y = 2.1830 \left( x - 1.1 \right)
\qquad \Rightarrow \qquad I_{13} = \left( 1.787,\; 1.500 \right)
$$
$$
\overline{O_2 I_{13}} = 2.333\ \mathrm{m}, \qquad v_{I_{13}} = \omega_2 \times 2.333 = 23.33\ \mathrm{m / s}
$$
$$
\overline{P I_{13}} = \sqrt{\left( 1.787 - 0.848 \right)^2 + \left( 1.500 - 0.972 \right)^2} = 1.076\ \mathrm{m}
\qquad \Rightarrow \qquad v_P = \left| \omega_3 \right| \times 1.076 = 2.728 \times 1.076 = \mathbf{2.94\ \mathrm{m / s}}
$$
**The check by vector addition:** $\vec{r}_{P / A} = \left( 0.465, 0.651 \right)$, so
$$
\vec{v}_P = \vec{v}_A + \omega_3 \hat{z} \times \vec{r}_{P / A} = \left( - 3.214, 3.830 \right) + \left( - 2.728 \right) \left( - 0.651, 0.465 \right) = \left( - 1.438,\; 2.561 \right)
$$
$$
\left| \vec{v}_P \right| = \sqrt{2.068 + 6.559} = 2.94\ \mathrm{m / s} \quad \checkmark
$$
**The torque ratio.**
$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4} = \frac{1}{0.2273} = 4.40 \text{ ideal}, \qquad
T_4 = 0.90 \times 4.40 \, T_2 = 3.96 \, T_2 \text{ at } 90\ \% \text{ joint efficiency}
$$
**The reading.** **The mechanism multiplies torque by $4.4$ at this instant and by $1 / 0.833 = 1.2$ at $\theta_2 = 0$, and by $1 / 0.57 = 1.75$ at $\theta_2 = 90^\circ$** — a factor of $3.6$ variation across one revolution, and the reason a motor sized on the mean torque stalls is that the sizing must be done on the worst-case instant, which for this mechanism is where the transmission angle is smallest.
*Sanity.* The reason $v_{I_{13}} = 23.33\ \mathrm{m / s}$ is not the velocity of anything physical is that $I_{13}$ is $2.33\ \mathrm{m}$ from the crank pivot and **outside the mechanism entirely** — the coupler's instant centre is a point of space, and the reason the number is nevertheless correct is that the velocity of the point of link $2$ coincident with $I_{13}$ equals the velocity of the point of link $3$ coincident with $I_{13}$, which is what Kennedy's theorem guarantees and what the $2.94\ \mathrm{m / s}$ check confirms.
:::
:::

::: widget plot
f: -3.1416*(sin(x*pi/180)+0.25*sin(2*x*pi/180)/(2*sqrt(1-0.0625*pow(sin(x*pi/180),2))))
x: 0, 360
y: -3.4, 3.4
caption: The piston velocity of the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute, in metres per second. **The curve is not a sine wave: its peak of $3.24$ metres per second occurs at $76.7^\circ$ and not at ninety, and its positive and negative halves are mirror images only because the mechanism is in-line.** **The peak is $3.1\%$ above $r\omega$ and $3.24$ times the mean piston speed of $1.0$ metre per second**, and the reason the second harmonic term is visible in the curve's shape rather than only in its magnitude is that $\sin 2\theta$ is zero at ninety degrees — **the curve passes through $-r\omega$ exactly at the angle where the second term vanishes.**
:::

## Centrodes, and why a mechanism is a pair of rolling shapes

::: definition Centrodes {#def-centrodes}
**The instant centre of a moving link traces two curves: one on the fixed plane and one on the moving link.** They are the **fixed centrode** and the **moving centrode**, and **Kennedy's theorem implies that they roll on one another without slipping.**

$$
\begin{array}{l l l}
\text{Pair} & \text{Fixed centrode} & \text{Moving centrode} \\
\text{Turning pair} & \text{a point} & \text{the same point} \\
\text{Rolling wheel on a rail} & \text{the rail (a line)} & \text{the wheel (a circle)} \\
\text{Gear pair} & \text{two pitch circles} & \text{the same two circles} \\
\text{Four-bar coupler} & \text{a sextic-derived curve} & \text{its rolling partner} \\
\text{Slider--crank coupler} & \text{a curve through the pin, infinite at } 90^\circ & \text{a closed curve} \\
\text{Cam pair} & \text{the pitch curve} & \text{the follower's pitch curve}
\end{array}
$$

**The slider–crank's centrode is the instructive one.** The coupler's instant centre $I_{13}$ is the intersection of the crank line $O_2 A$ with the line through the wrist pin perpendicular to the slider axis. **At bottom dead centre it is at the pin; at ninety degrees it is at infinity, because the coupler is then instantaneously translating.** **The number that makes that a design fact is that the coupler's angular velocity is zero at ninety degrees and maximal near top and bottom dead centre** — for the $100$–$400$ millimetre mechanism at $300$ revolutions per minute, $\omega_{\mathrm{rod}} = 6.50\ \mathrm{rad / s}$ at $35^\circ$ and $7.85\ \mathrm{rad / s}$ at $90^\circ$ — and the reason a connecting rod is sized on its angular velocity and not only its linear one is that the rod's own **whipping** is driven by its angular acceleration, which peaks where its centre of mass barely moves.

**The gear pair is the centrode taken to its design conclusion.** Two teeth transmit motion as two **pitch shapes** rolling without slipping, and the whole of involute gear theory is the statement that **if the pitch shapes are circles, the tooth flanks can be a single curve — the involute — cut with one tool and interchangeable between any two gears of the same module and pressure angle.** **The number that makes that the most consequential fact in machine design is that a pair of gears with centre distance wrong by $0.5$ per cent still transmits a constant velocity ratio**, because the pitch circles simply grow in proportion and the rolling is unchanged; and the reason a chain drive or a belt on sprockets does not have this property is that its pitch shapes are **polygons**, and the reason a belt on pulleys does is that its pitch shape is a circle.
:::

::: example Velocity by polygon {#ex-polygon}
For the four-bar of the earlier example, construct the velocity polygon and read off $\omega_3$ and $\omega_4$.
::: solution
**The polygon is the vector equation $\vec{v}_B = \vec{v}_A + \vec{v}_{B / A}$ drawn to scale.**
**Step 1 — the known velocity.** $\vec{v}_A$ has magnitude $a \omega_2 = 5.00\ \mathrm{m / s}$ and is perpendicular to $O_2 A$, so at $\theta_2 = 40^\circ$ it points at $130^\circ$. **Choose a scale of $1\ \mathrm{m / s}$ per $20\ \mathrm{mm}$**, so $\vec{v}_A$ is a $100\ \mathrm{mm}$ line.
**Step 2 — the two directions.** $\vec{v}_B$ is perpendicular to $O_4 B$, so it lies along $155.4^\circ$. $\vec{v}_{B / A}$ is perpendicular to $AB$, so it lies along $114.4^\circ$.
**Step 3 — draw.** From the pole $o$, lay off $oa = 100\ \mathrm{mm}$ at $130^\circ$. From $o$ draw a line at $155.4^\circ$; from $a$ draw a line at $114.4^\circ$. **Their intersection is $b$.**
**Step 4 — measure.**
$$
\overline{ob} = 40.9\ \mathrm{mm} \Rightarrow v_B = 2.045\ \mathrm{m / s}, \qquad
\overline{ab} = 65.5\ \mathrm{mm} \Rightarrow v_{B / A} = 3.275\ \mathrm{m / s}
$$
$$
\omega_4 = \frac{v_B}{c} = \frac{2.045}{0.9} = \mathbf{2.27\ \mathrm{rad / s}}, \qquad
\omega_3 = \frac{v_{B / A}}{b} = \frac{3.275}{1.2} = \mathbf{2.73\ \mathrm{rad / s}} \quad \checkmark
$$
**The reading.** **The polygon and the algebra give the same numbers to the accuracy of a rule, and the reason the polygon is still taught is that it shows the designer where the answer comes from** — the direction of $\vec{v}_B$ is set by the rocker and the direction of $\vec{v}_{B/A}$ by the coupler, and **the triangle closes tightly or loosely according to how near a singularity the mechanism is.** A velocity polygon whose triangle is nearly degenerate is a mechanism whose torque ratio is enormous, and the reason an experienced designer draws the polygon before writing the equations is that the degeneracy is visible in a second and is buried in a determinant.
**The extension to a coupler point.** Divide $ab$ in the ratio $AP / AB$ — the **image** of the coupler in the velocity polygon is **similar** to the coupler itself, turned through $90^\circ$. With $AP / AB = 0.8 / 1.2 = 0.667$:
$$
p \text{ lies on } ab \text{ at } 0.667 \times 65.5 = 43.7\ \mathrm{mm} \text{ from } a, \text{ turned } 90^\circ \text{ from } AP
$$
**and measuring $\overline{op}$ gives $58.8\ \mathrm{mm}$, or $2.94\ \mathrm{m / s}$** — the instant-centre answer, read off a drawing.
:::
:::

::: example Geneva velocity and the peak-to-mean trap {#ex-geneva}
A four-slot Geneva with centre distance $a = 100\ \mathrm{mm}$ is driven at $\omega_d = 10\ \mathrm{rad / s}$. Find the peak output angular velocity and its ratio to the mean.
::: solution
**The geometry.** $r = a \sin \left( 180^\circ / n \right) = 100 \sin 45^\circ = 70.71\ \mathrm{mm}$.
**The motion law:**
$$
\tan \psi = \frac{r \sin \theta}{a - r \cos \theta}
\qquad \Rightarrow \qquad
\frac{d \psi}{d \theta} = \frac{r a \cos \theta - r^2}{\left( a - r \cos \theta \right)^2 + \left( r \sin \theta \right)^2} \cdot \frac{1}{1 + \tan^2 \psi}
= \frac{r a \cos \theta - r^2}{\left( a - r \cos \theta \right)^2 + r^2 \sin^2 \theta}
$$
**At $\theta = 0$:**
$$
\left. \frac{d \psi}{d \theta} \right|_0 = \frac{r a - r^2}{\left( a - r \right)^2} = \frac{r}{a - r}
= \frac{70.71}{29.29} = 2.414
\qquad \Rightarrow \qquad \boxed{ \dot{\psi}_{\max} = 2.414 \times 10 = 24.14\ \mathrm{rad / s} }
$$
**The mean.** The wheel turns $90^\circ = 1.5708\ \mathrm{rad}$ while the crank turns $90^\circ = 1.5708\ \mathrm{rad}$, so the mean ratio is $1.000$ and the mean output speed is $10.0\ \mathrm{rad / s}$.
$$
\frac{\dot{\psi}_{\max}}{\bar{\psi}} = \frac{24.14}{10.0} = \mathbf{2.41}
$$
**For an eight-slot wheel** $r = 100 \sin 22.5^\circ = 38.27\ \mathrm{mm}$, so
$$
\left. d \psi / d \theta \right|_0 = \frac{38.27}{61.73} = 0.620, \qquad
\text{mean ratio} = \frac{45^\circ}{135^\circ} = 0.333, \qquad
\frac{\mathrm{peak}}{\mathrm{mean}} = \frac{0.620}{0.333} = \mathbf{1.86}
$$
**The reading.** **The four-slot wheel's output moves at two and a half times its average speed at the middle of the index, and the eight-slot's at one and nine-tenths times.** The reason a machine specified on "index $90^\circ$ per second" has workpieces leaving their fixtures is that the specification quoted the mean, and the reason the peak-to-mean ratio belongs on the data sheet next to the dwell fraction is that the two together are the whole of the mechanism's dynamic character.
**The acceleration, for the same reason.** The peak angular acceleration of a four-slot Geneva is $5.38\, \omega_d^2$ and of an eight-slot $0.70\, \omega_d^2$ — **a factor of $7.7$ for a mechanism that costs the same to make** — and the reason the eight-slot is standard on rotary fillers carrying liquid is that $5.38 \times 100 = 538\ \mathrm{rad / s^2}$ at a $0.5\ \mathrm{m}$ radius is $269\ \mathrm{m / s^2}$, which is twenty-seven times gravity and would empty every bottle on the table. **The peak does not occur where the velocity peaks:** the velocity is greatest at $\theta = 0$ and the acceleration there is exactly zero, and the acceleration's maximum falls about $13^\circ$ of crank rotation later, where the velocity curve is steepest.
:::
:::

::: widget plot
f: (0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))) / ((0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180))))))-1.1)
x: 0, 360
y: -1.1, 0.65
caption: The angular-velocity ratio $\omega_4 / \omega_2$ of the $0.5$–$1.2$–$0.9$–$1.1$ metre four-bar, computed as the ratio of the two distances from the instant centre $I_{24}$ to the fixed pivots. **The ratio changes sign twice per revolution — the rocker reverses its sense of rotation relative to the crank — and its magnitude varies from $0.23$ to $1.04$, a factor of $4.6$.** **The two zeros are the rocker's extreme positions and the two infinities, just off the plot at $\theta_2 \approx 150^\circ$ and $210^\circ$, are where $I_{24}$ passes the fixed pivot $O_4$** — and the reason a designer reads the plot's flat regions rather than its peaks is that a mechanism used as a drive must work where the ratio is steady, which for this four-bar is nowhere.
:::

## Direct contact, sliding velocity and wear

::: definition Sliding at a contact {#def-sliding}
**Where two links touch at a higher pair, the velocities of the two coincident points are equal only if the pair rolls.** The difference is the **sliding velocity**, and it is the quantity that sets the wear, the friction power and the lubricant's film thickness.

$$
v_{\mathrm{slide}} = v_{\mathrm{contact,1}} - v_{\mathrm{contact,2}}, \qquad
P_{\mathrm{friction}} = \mu F_n v_{\mathrm{slide}}
$$

$$
\begin{array}{l c c l}
\text{Contact} & v_{\text{slide}} / \omega_1 r_1 & \text{at the pitch point} & \text{consequence} \\
\text{Pure rolling wheel} & 0 & \text{everywhere} & \text{wear-free in principle} \\
\text{Involute gear flank} & 0 & \text{maximum at the tip} & \text{wear at the addendum} \\
\text{Cycloidal gear flank} & 0 & \text{moderate} & \text{used in clocks for low friction} \\
\text{Flat-follower cam} & \text{never zero} & \text{maximum at the base circle} & \text{always wears} \\
\text{Knife-edge follower} & \text{never zero} & \text{large} & \text{prototype only} \\
\text{Belt on a pulley} & \text{creep only} & \text{—} & \text{ratio holds within } 2\ \%
\end{array}
$$

**The gear result is the one to carry away.** For an involute pair the sliding velocity is **zero at the pitch point and grows linearly to the tip and root**, reaching
$$
\frac{v_{\mathrm{slide}}}{v_{\mathrm{pitch}}} = \frac{\text{approach or recess path}}{r_{\mathrm{pitch}} \sin \phi} \approx 0.4 \text{ to } 0.6
$$
**and the reason gear teeth are therefore hardened at the tip and run-in at the pitch line is that the wear pattern is written directly by this curve** — a gear that has run for ten thousand hours shows a **worn band at the pitch line and sliding wear at the tip**, and the reason a gear-inspection standard measures tooth profile against the **working pitch circle** is that the working pitch circle is where the sliding velocity is zero and the geometry is therefore preserved.
:::

::: example Pressure angle and the sliding velocity of a cam {#ex-cam-vel}
A radial cam with a **flat-faced** reciprocating follower has base-circle radius $r_0 = 30\ \mathrm{mm}$, a harmonic rise of $h = 20\ \mathrm{mm}$ over $\beta = 120^\circ$ of cam rotation at $\omega = 30\ \mathrm{rad / s}$. Find the maximum follower velocity, the pressure angle and the sliding velocity, and state the design limit.
::: solution
**The motion law** (cycloidal, chosen for zero acceleration at the ends):
$$
v_{\max} = \frac{2 h \omega}{\beta} = \frac{2 \times 0.020 \times 30}{2.0944} = \mathbf{0.573\ \mathrm{m / s}}
\qquad \text{at } \theta = \beta / 2
$$
**The pressure angle of a flat follower** is set by the slope of the pitch curve:
$$
\tan \psi = \frac{1}{r_0 + s} \frac{d s}{d \theta}
$$
**At the point of maximum slope**, $s = h / 2 = 10\ \mathrm{mm}$ and $ds / d \theta = 2 h / \beta = 0.0191\ \mathrm{m / rad}$:
$$
\tan \psi = \frac{0.0191}{0.030 + 0.010} = 0.4775 \qquad \Rightarrow \qquad \psi_{\max} = \mathbf{25.5^\circ}
$$
**The design limit for a flat follower is $\psi \le 40^\circ$** — and the reason the flat follower gets a larger allowance than a roller follower's $25^\circ$ is that the flat face's load is distributed over a length rather than applied at a point, so the side thrust that jams a roller in its guide is spread over the face.
**The sliding velocity.** The contact normal of a flat-faced follower is along the follower axis, so the sliding takes place **in the plane of the face**. The contact point sits at a lateral offset $x_c = d s / d \theta$ from the axis, and the cam surface there moves at $\omega x_c$ across the face while the follower itself moves only along the axis:
$$
v_{\mathrm{slide}} = \omega \frac{d s}{d \theta}
$$
**and since $v_{\mathrm{follower}} = \omega \, d s / d \theta$ as well, the two are identical:**
$$
\boxed{ v_{\mathrm{slide}} = v_{\mathrm{follower}} = \mathbf{0.573\ \mathrm{m / s}} }
$$
**That identity is the whole case against a flat follower at speed.** Every metre per second the follower moves, the cam face slides across it at the same rate, and there is no instant in the cycle at which the sliding stops — so there is no instant at which an oil film can be regenerated, and the contact runs boundary-lubricated for its entire life.
**The friction power** at $\mu = 0.12$ and a $180\ \mathrm{N}$ spring-plus-inertia load:
$$
P = 0.12 \times 180 \times 0.573 = 12.4\ \mathrm{W}
$$
**The number that makes this a design decision.** $12.4\ \mathrm{W}$ dissipated at a line contact $12\ \mathrm{mm}$ wide is **$1.0\ \mathrm{kW}$ per metre of contact length**, and the reason a hardened-steel-on-hardened-steel flat follower at that loading needs oil, a crown on the face and a scheduled replacement interval is that a line contact at one kilowatt per metre runs above the boundary-lubrication limit of any oil that will stay in the machine. **The roller follower converts the sliding into a rolling contact at the cam interface and leaves only the sliding inside its own pin bearing, where the slip velocity is $\omega \, ds / d\theta$ across a $10\ \mathrm{mm}$ roller — a fifth of the power, in a bearing that can be relubricated and replaced for nine euros.**
*Sanity.* The reason $v_{\mathrm{slide}}$ is not zero even at the point of maximum rise is that a **flat** follower has no pitch circle at all — its pitch curve is the profile itself, offset by nothing — and the reason a **roller** follower's pressure angle is smaller for the same lift is that its pitch curve is the profile offset by the roller radius, which increases the effective base circle from $30$ to $40$ millimetres here and cuts $\tan \psi$ from $0.478$ to $0.358$, or $\psi_{\max}$ from $25.5^\circ$ to $19.7^\circ$. **The roller buys a twenty-three per cent reduction in pressure angle and an eighty per cent reduction in sliding power, and the reason it costs anything at all is that the roller's own contact stress is a Hertzian one and its needle bearing is the fatigue item.**
:::
:::

::: history
**Kennedy's 1886 paper on the velocities of mechanisms was a systematisation of what had been done graphically since Watt**, and the theorem itself is Aronhold's of **1872** — but the practical method, the velocity polygon, was already in the engineering textbooks of **Rankine (1858)** and **Willis (1841)**, and Willis's *Principles of Mechanism* contains a correct graphical velocity construction for a four-bar drawn with a compass and published before the word "velocity ratio" had a standard meaning. **The centrode concept is due to Poinsot, whose 1809 treatment of the moving and fixed polodes is the oldest part of the subject still in daily use, and its application to gears — the pitch circle as a centrode — is Reuleaux's.** **The Geneva mechanism's velocity law was first published by Ferri in 1880 in a paper on watch mechanisms; the peak-to-mean ratio of $2.41$ for the four-slot wheel appears in Artobolevskii's 1951 catalogue and in no earlier Western source.** **The cam pressure-angle limit of $25^\circ$ for a roller follower is a convention of the 1940s, and the $40^\circ$ for a flat follower is a convention of the same decade; neither is derived from anything, and the reason both survive is that no one has produced a better rule and the reason they are safe is that they are conservative by a factor of about two.**
:::

## Where this leads

The accelerations that follow by differentiating once more are [[mechanisms/acceleration-analysis]], and with them the inertia forces that make a high-speed linkage a dynamics problem; the velocity ratio is the quantity [[mechanisms/linkage-synthesis]] trades against the transmission angle; the sliding velocity is the whole of [[mechanisms/gears]]' wear and efficiency story and [[mechanisms/cams]]' pressure-angle story; and the instant-centre method generalises into the screw theory of [[robotics]]' Jacobians and the pitch-line analysis of [[propulsion]]'s gearboxes.

::: summary
- Differentiate the loop: two linear equations in the two unknown angular velocities, evaluated at the solved position.
- The determinant of that system is $-bc\sin\mu$; the transmission angle, the singular Jacobian and the coincident position roots are one condition.
- Kennedy's theorem puts three instant centres on a line; turning pairs are at pins, prismatic pairs at infinity, rolling contacts at the contact.
- $\omega_4 / \omega_2 = \overline{I_{12}I_{24}} / \overline{I_{14}I_{24}}$, and the mechanical advantage is its reciprocal times the efficiency.
- The velocity polygon's image of a coupler is similar to the coupler and turned through $90^\circ$.
- Fixed and moving centrodes roll without slipping; the slider–crank coupler's centrode runs to infinity at ninety degrees.
- Sliding velocity, not velocity, sets wear and friction power; it is zero at a gear's pitch point and never zero at a flat follower.
- Quote peak output speed, not mean: a four-slot Geneva peaks at $2.41$ times its own average.
:::

## Exercises

::: exercise Instant-centre count {level=1 check="6"}
Give the number of instant centres in a four-link planar mechanism.
::: solution
$\binom{4}{2}=4\times3/2=6$.
:::
:::

::: exercise Velocity ratio {level=1 check="2.27"}
For the four-bar of the worked example, give $\omega_4$ in radians per second when $\omega_2=10$ radians per second at $\theta_2=40^\circ$.
::: solution
$\overline{I_{12}I_{24}}/\overline{I_{14}I_{24}}=0.3235/1.4235=0.2273$; $\omega_4=2.27$ rad/s.
:::
:::

::: exercise Coupler angular velocity {level=1 check="2.73"}
For the same four-bar, give the magnitude of the coupler's angular velocity in radians per second.
::: solution
$\left|\omega_3\right|=2.73$ rad/s, clockwise.
:::
:::

::: exercise Torque ratio {level=1 check="4.40"}
For the same four-bar at $\theta_2=40^\circ$, give the ideal torque ratio $T_4/T_2$.
::: solution
$T_4/T_2=\omega_2/\omega_4=10/2.272=4.40$.
:::
:::

::: exercise Piston velocity {level=1 check="6.50"}
For the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute and $\theta=35^\circ$, give the connecting rod's angular velocity in radians per second.
::: solution
$\omega_{\mathrm{rod}}=\omega\lambda\cos\theta/\sqrt{1-\lambda^2\sin^2\theta}=31.416\times0.25\times0.8192/0.98967=6.50$ rad/s.
:::
:::

::: exercise Geneva peak {level=1 check="2.41"}
Give the peak-to-mean output angular velocity ratio of a four-slot Geneva mechanism.
::: solution
$r/(a-r)=\sin45^\circ/(1-\sin45^\circ)=2.414$; the mean ratio is $1.000$, so the peak-to-mean ratio is $2.41$.
:::
:::

::: exercise Geneva, eight slots {level=1 check="1.86"}
Give the peak-to-mean output angular velocity ratio of an eight-slot Geneva mechanism.
::: solution
$\left[\sin22.5^\circ/(1-\sin22.5^\circ)\right]/(45/135)=0.620/0.333=1.86$.
:::
:::

::: exercise Sliding velocity {level=1 check="0"}
Give the sliding velocity, in metres per second, at the pitch point of a pair of involute spur gears.
::: solution
Zero. The pitch point is the instant centre of the two gears, so the two coincident points have the same velocity; all the sliding is at the tip and root.
:::
:::

::: exercise Prismatic centre {level=2}
Where is the instant centre of a slider relative to the frame, and what is the slider's angular velocity?
::: solution
**At infinity, in the direction perpendicular to the sliding.** **The angular velocity is zero:** a link whose instant centre is at infinity has no rotation, and the reason the slider's velocity is therefore the same at every point on it is that $v = \omega r$ with $r$ measured from a point at infinity is uniform over the body. **The number that makes this a computational rule and not a paradox is that in the Kennedy construction the two lines that should meet at a prismatic pair's centre are parallel, and a program that solves for their intersection must handle the singular case explicitly** — which is why every linkage-analysis code stores the prismatic pair as a direction and a point rather than as a joint.
:::
:::

::: exercise Mechanical advantage of a toggle {level=2}
A toggle has an included-angle deviation of $\phi = 5^\circ$ and joint efficiency $0.30$. Is it self-locking, and what is its mechanical advantage?
::: solution
$$
\left( \mathrm{MA} \right)_{\mathrm{ideal}} = \frac{1}{2 \sin \left( \phi / 2 \right)} = \frac{1}{2 \sin 2.5^\circ} = 11.47
$$
**With losses the forward mechanical advantage is** $11.47 \times 0.30 = 3.44$, **and the reverse mechanical advantage is** $1 / \left( 11.47 \times 0.30 \right) = 0.29 < 1$, **so the toggle is self-locking.** **The condition is $\eta < 1 / \sqrt{\mathrm{MA}_{\mathrm{ideal}}} = 1 / \sqrt{11.47} = 0.295$**, and the reason a toggle clamp's plain bushings at $\eta \approx 0.25$ are chosen rather than needle rollers at $\eta \approx 0.90$ is that the needle rollers make the clamp back-drivable and the plain bushings do not.
:::
:::

::: exercise Derivation {level=3}
Differentiate the slider–crank loop to obtain the piston velocity and the connecting-rod angular velocity, and find the crank angle at which the piston speed is a maximum for $\lambda = 0.25$.
::: solution
**The loop.** $x = r \cos \theta + l \cos \phi$ with $l \sin \phi = r \sin \theta$, so $\sin \phi = \lambda \sin \theta$.
**Differentiate the constraint:**
$$
l \cos \phi \frac{d \phi}{d \theta} = r \cos \theta
\qquad \Rightarrow \qquad
\boxed{ \omega_\phi = \omega \frac{\lambda \cos \theta}{\cos \phi} = \frac{\omega \lambda \cos \theta}{\sqrt{1 - \lambda^2 \sin^2 \theta}} }
$$
**Differentiate the displacement:**
$$
\frac{d x}{d \theta} = - r \sin \theta - l \cos \phi \frac{d \phi}{d \theta} = - r \sin \theta - r \cos \theta \tan \phi
$$
$$
\boxed{ v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right] }
$$
**using $\tan \phi = \lambda \sin \theta / \sqrt{1 - \lambda^2 \sin^2 \theta}$ and $2 \sin \theta \cos \theta = \sin 2 \theta$.**
**The maximum.** Setting $d v / d \theta = 0$ and expanding to first order in $\lambda$ gives $\cos \theta + \lambda \cos 2 \theta = 0$, and with $\cos 2 \theta = 2 \cos^2 \theta - 1$:
$$
2 \lambda c^2 + c - \lambda = 0
\qquad \Rightarrow \qquad c = \frac{- 1 \pm \sqrt{1 + 8 \lambda^2}}{4 \lambda}
$$
**The minus root is $- 2.22$ and inadmissible; the plus root is the answer:**
$$
\cos \theta = \frac{- 1 + \sqrt{1 + 8 \times 0.0625}}{4 \times 0.25} = \frac{- 1 + 1.2247}{1.0} = 0.2247
\qquad \Rightarrow \qquad \theta = 77.0^\circ
$$
**The exact derivative, solved numerically, gives**
$$
\boxed{ \theta_{v_{\max}} = 76.7^\circ, \qquad v_{\max} = 1.031\, r \omega }
$$
**against the naive $90^\circ$ and $r \omega$ — the first-order estimate is out by $0.3^\circ$, which is why it is worth doing.** **The correction is $3.1\ \%$ in magnitude and $13.3^\circ$ in phase**, and the reason the phase correction matters more than the magnitude one is that the piston's acceleration — not its velocity — sets the inertia load, and the acceleration's zero crossing is displaced by the same $13^\circ$, which is $2.5\ \%$ of the cycle and enough to shift the timing of a valve event.
*Sanity.* The reason $v_{\max} / r \omega = 1.031$ matches $1 + \lambda^2 / 2 = 1.031$ is that the leading correction to the peak is second order in $\lambda$, and the reason the peak is **above** $r \omega$ rather than below is that the rod's angular motion adds to the piston's linear motion over the first half of the stroke and subtracts over the second.
:::
:::

::: exercise Design {level=3}
Design the **transfer mechanism of a rotary labelling head**: eight stations on a $900\ \mathrm{mm}$ pitch-diameter table, $60$ parts per minute, each station carries a $3\ \mathrm{kg}$ bottle, the index must complete in $0.35\ \mathrm{s}$, the positional repeatability at the label head must be $\pm 0.03^\circ$, the bottles are open and contain a free liquid, and the drive must be back-drivable-safe on loss of power. Give the topology, the motion law, the sizing, the failure modes and the acceptance tests.
::: solution
**The duty.** Eight stations at $60$ per minute is one index per $1.000\ \mathrm{s}$, of which $0.35\ \mathrm{s}$ is index and $0.65\ \mathrm{s}$ dwell — a dwell fraction of $0.65$.
**The candidate set.**
$$
\begin{array}{l c c c c}
\text{Mechanism} & \text{Dwell} & \text{Peak / mean} & \text{Repeatability} & \text{Verdict} \\
\text{Four-slot Geneva} & 0.750 & 2.41 & \pm 0.02^\circ & \text{index too fast, too violent} \\
\text{Six-slot Geneva} & 0.667 & 2.00 & \pm 0.02^\circ & 2.45\ g \text{ lateral — rejected} \\
\text{Eight-slot Geneva} & 0.625 & 1.86 & \pm 0.02^\circ & \text{dwell } 0.625 < 0.65 \\
\text{Globoid cam index} & \text{free} & \text{free} & \pm 0.03^\circ & \text{candidate} \\
\text{Servo and planetary roller screw} & \text{free} & \text{free} & \pm 0.01^\circ & \text{candidate} \\
\text{Servo and harmonic drive} & \text{free} & \text{free} & \pm 0.01^\circ & \text{creep on power loss}
\end{array}
$$
**The six-slot Geneva's timing works and its dynamics do not.** Its engagement angle is $180^\circ - 360^\circ / 6 = 120^\circ$ of crank, so at one crank revolution per second the index takes $120 / 360 = 0.333\ \mathrm{s}$ and the dwell $0.667\ \mathrm{s}$ — **both inside the requirement.** What fails is the acceleration: $1.35 \times \left( 2 \pi \right)^2 = 53.3\ \mathrm{rad / s^2}$, which at the $0.45\ \mathrm{m}$ station radius is $24.0\ \mathrm{m / s^2}$, or **$2.45\ g$ against the $0.2\ g$ the open liquid can tolerate.** **A Geneva's acceleration profile is fixed by its slot count and cannot be shaped; that is the whole of the reason this design is not a Geneva.**
**The chosen scheme: a servo-driven index with a form-closed globoid cam and a mechanical lock.** The cam supplies the motion law and the lock supplies the dwell, so the servo is unloaded during the dwell and the table cannot move on loss of power.
**The motion law.** $45^\circ$ in $0.35\ \mathrm{s}$ with zero velocity and acceleration at both ends. **A modified sine with a $50\ \%$ dwell-in-out** gives a peak-velocity coefficient of $1.76$ and a peak-acceleration coefficient of $5.19$:
$$
\bar{\omega} = \frac{0.7854}{0.35} = 2.244\ \mathrm{rad / s}, \qquad
\omega_{\max} = 1.76 \times 2.244 = 3.95\ \mathrm{rad / s}
$$
$$
\alpha_{\max} = 5.19 \times \frac{0.7854}{0.35^2} = 5.19 \times 6.424 = 33.3\ \mathrm{rad / s^2}
$$
**The inertia.** Eight bottles of $3\ \mathrm{kg}$ at $R = 0.45\ \mathrm{m}$, plus a $60\ \mathrm{kg}$ table:
$$
I = 8 \times 3 \times 0.45^2 + \frac{60 \times 0.45^2}{2} = 4.86 + 6.08 = 10.94\ \mathrm{kg \cdot m^2}
$$
**The torque:**
$$
T = 10.94 \times 33.3 + 0.03 \times \left( 8 \times 3 + 60 \right) \times 9.81 \times 0.02 / 0.45 = 364 + 1.3 \approx \mathbf{365\ \mathrm{N \cdot m}}
$$
**with an RMS of $0.44 \times 365 = 161\ \mathrm{N \cdot m}$ over the cycle.**
**The free liquid, which is the real constraint.** A $3\ \mathrm{kg}$ bottle of liquid in a $60\ \mathrm{mm}$ diameter neck experiences a lateral acceleration of $\alpha R = 33.3 \times 0.45 = 15.0\ \mathrm{m / s^2} = 1.53\ g$, and the reason the liquid sloshes over the rim is that a $1.5\ g$ lateral acceleration tilts a free surface by $57^\circ$. **The number that fixes the motion law is the $0.2\ g$ limit for an open liquid container:**
$$
\alpha_{\max} \le 0.2 \times 9.81 / 0.45 = 4.36\ \mathrm{rad / s^2}
\qquad \Rightarrow \qquad t_{\mathrm{index}} \ge 0.35 \sqrt{\frac{33.3}{4.36}} = 0.967\ \mathrm{s}
$$
**which is longer than the whole cycle.** **The acceleration limit and the index time are incompatible, and the reason the design must change is not the mechanism but the requirement.** The resolutions, in the order they should be tried:
$$
\begin{array}{l l}
\text{1. Close the container} & \text{a lid raises the limit to about } 1.0\ g \text{ and the index time falls to } 0.43\ \mathrm{s} \\
\text{2. Fill less} & \text{a } 70\ \% \text{ fill with a } 30\ \% \text{ headspace allows about } 0.6\ g \text{ before overflow} \\
\text{3. Index in two steps} & \text{two } 22.5^\circ \text{ indexes per station with a } 0.15\ \mathrm{s} \text{ pause between} \\
\text{4. Reduce the radius} & \text{a } 600\ \mathrm{mm} \text{ table halves } \alpha R \text{ at the same angular acceleration} \\
\text{5. Slow the line} & 45 \text{ per minute instead of } 60 \text{ gives } 0.47\ \mathrm{s} \text{ of index at } 0.4\ g
\end{array}
$$
**The chosen resolution is 3 and 4 together:** a **$700\ \mathrm{mm}$ pitch-diameter table** indexed in **two $22.5^\circ$ steps of $0.30\ \mathrm{s}$ each with a $0.10\ \mathrm{s}$ settle between**, giving
$$
\alpha_{\max} = 5.19 \times \frac{0.3927}{0.30^2} = 22.6\ \mathrm{rad / s^2}
\qquad \Rightarrow \qquad a_{\mathrm{lat}} = 22.6 \times 0.35 = 7.9\ \mathrm{m / s^2} = 0.81\ g
$$
**still above $0.2\ g$ but below the $1.0\ g$ of a lidded bottle**, and the reason the two-step index is nevertheless the right answer is that the settle time lets the liquid damp: **the slosh period of a $60\ \mathrm{mm}$ neck with a $40\ \mathrm{mm}$ fill depth is $T = 2 \pi \sqrt{d / g} = 0.40\ \mathrm{s}$, so a $0.10\ \mathrm{s}$ pause is a quarter of a slosh period and the residual surface tilt after settling is a third of the peak.**
**The final sizing** at $\alpha_{\max} = 22.6\ \mathrm{rad / s^2}$ on the $700\ \mathrm{mm}$ table, whose inertia is
$$
I = 8 \times 3 \times 0.35^2 + \frac{50 \times 0.35^2}{2} = 2.94 + 3.06 = 6.00\ \mathrm{kg \cdot m^2}
$$
$$
T_{\mathrm{peak}} = 6.00 \times 22.6 + 45 = 181\ \mathrm{N \cdot m}
$$
**and, because only $0.60\ \mathrm{s}$ of each $1.00\ \mathrm{s}$ cycle contains acceleration and only about $44\ \%$ of that is at the peak,**
$$
T_{\mathrm{RMS}} = 181 \times 0.44 \times \sqrt{0.60} = 61.6\ \mathrm{N \cdot m}
$$
**A $1.1\ \mathrm{kW}$ servo at $3{,}000\ \mathrm{rev / min}$ gives $3.50\ \mathrm{N \cdot m}$ rated and $10.5\ \mathrm{N \cdot m}$ peak; through a $1{:}35$ planetary roller-screw rotary index that is $122\ \mathrm{N \cdot m}$ continuous against $61.6$ required and $368\ \mathrm{N \cdot m}$ peak against $181$ required.** **The reason the roller screw is chosen over a harmonic drive is that the roller screw is back-drivable at about $50\ \%$ efficiency and the harmonic drive at about $25\ \%$, and neither holds on its own**; the mechanical lock on the table is what satisfies the power-loss requirement, and the reason the lock is a form-closed cam and not a brake is that a brake slips by an amount proportional to the torque and a cam does not move at all.
**The repeatability.** $\pm 0.03^\circ$ at the label head, which is $80\ \mathrm{mm}$ from the axis, is $\pm 0.042\ \mathrm{mm}$. **The servo's positioning error is $\pm 0.005^\circ$ and the cam's ground profile error is $\pm 0.01^\circ$; the lock's re-engagement error is $\pm 0.02^\circ$ and the table's bearing runout is $\pm 0.008^\circ$.** Root-sum-square:
$$
\sqrt{0.005^2 + 0.01^2 + 0.02^2 + 0.008^2} = 0.0247^\circ \quad \checkmark
$$
**The failure modes.**
$$
\begin{array}{l l}
\text{Lock does not engage at the dwell} & \text{a proximity switch interlocks the next index; the machine stops rather than double-steps} \\
\text{Servo following error on a jam} & \text{trip at } 1.3 \times \text{ profiled torque, which is below the linkage's yield} \\
\text{Slosh destabilises a bottle} & \text{the } 0.81\ g \text{ lateral peak is the design case; tested with the worst fill} \\
\text{Cam follower wear} & \text{repeatability degrades before the profile is visibly damaged; measured monthly} \\
\text{Table bearing creep} & \text{the lock carries the dwell load; the bearings see only the index} \\
\text{Loss of power mid-index} & \text{the servo holds by its own brake; the lock engages only at the dwell}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Repeatability} & 100 \text{ consecutive indices, a } 0.001\ \mathrm{mm} \text{ gauge at } 80\ \mathrm{mm}, 3\sigma \le \pm 0.03^\circ \\
\text{Index time} & \text{measured against the profiled cam angle, within } \pm 2\ \% \\
\text{Slosh} & \text{high-speed video of the worst fill at the specified fill level; no liquid at the rim} \\
\text{Torque} & \text{a torque transducer on the input; peak and RMS within } \pm 10\ \% \text{ of the model} \\
\text{Power loss} & \text{power removed at the worst phase; the table must not move more than } 0.05^\circ \\
\text{Durability} & 10^6 \text{ cycles, then re-measure repeatability and the lock's engagement error}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE INDEX REPEATABILITY SHALL BE MEASURED AT THE TOOLING RADIUS SPECIFIED OVER ONE HUNDRED CONSECUTIVE CYCLES AND REPORTED AS A THREE-SIGMA VALUE."** **"THE PEAK LATERAL ACCELERATION AT THE WORST-CASE FILL RADIUS SHALL BE MEASURED AND REPORTED, AND THE FILL LEVEL ABOVE WHICH THE CONTAINER MAY OVERFLOW SHALL BE STATED."** **"THE TABLE SHALL NOT MOVE MORE THAN FIVE HUNDREDTHS OF A DEGREE WITH THE DRIVE DE-ENERGISED AT ANY PHASE OF THE CYCLE."** **"THE ACTUAL MOTION PROFILE SHALL BE RECORDED AT COMMISSIONING AND RETAINED AS THE BASELINE FOR CONDITION MONITORING OF THE CAM AND THE LOCK."**
*Design comment.* The general rule is that **an indexing mechanism is sized by its acceleration and not by its speed, and by its dwell's locking and not by its index's accuracy** — and the reason this particular design ends in a two-step index rather than a faster mechanism is that the payload is a liquid, and a liquid does not care what the mechanism's motion law is, only what the peak acceleration is.
:::
:::
