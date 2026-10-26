Position analysis tells you where the parts are. Velocity analysis tells you **what the machine is doing right now**, and velocities set the motor's power, a bearing's $PV$ product, the friction and wear at every sliding contact, and — after one more differentiation — the inertia forces. It is also where the subject becomes visual: a planar mechanism's velocities can be **drawn** as well as calculated, and the drawing often shows more clearly than the algebra why a mechanism behaves as it does.

The key idea is the **instant centre**: at every instant, every link in a planar mechanism is turning about some point relative to any other link, and the velocity of each of its points is perpendicular to the line joining the point to that centre. Find the centre and the whole velocity field of the link follows by proportion. **The Aronhold–Kennedy theorem** tells you where the centres are by drawing straight lines; it was published by Aronhold in 1872 and independently by Kennedy in 1886, and it turns much of a differentiation into a ruler construction.

::: warning Five velocity errors that survive a calculation check
**Differentiating on the wrong circuit.** The velocity is the derivative of the position, and the four-bar's position has two solutions. Velocities computed from the crossed-circuit angles are correct for the crossed linkage and wrong — generally in magnitude and often in sign — for the one on the drawing. Always substitute the angles of the circuit you are analysing.

**Asking for "the velocity of the coupler".** A link has **one** angular velocity but a different linear velocity at every point. The coupler's pin $A$, its pin $B$, its centre of mass and its coupler point all move differently at the same instant, so the question must name the point — and where two links share a point, it must name **which link's** point is meant.

**Using $v = \omega r$ across a joint.** $v = \omega r$ holds **within** one rigid body, with $r$ measured from that body's instant centre. On the crank, $v_A = a \omega_2$ because $O_2$ is the crank's centre; on the coupler, $b \omega_3$ is the speed of $B$ **relative to** $A$, not the speed of $A$ or of $B$. Writing $a \omega_2 = b \omega_3$ is a category error, and it gives the wrong $\omega_3$.

**Forgetting what a prismatic pair does to the instant centre.** A slider's velocity relative to its guide is along the guide, so the instant centre of slider and guide is **at infinity in the direction perpendicular to the sliding**. In a Kennedy construction the line "through" that centre is drawn as a line perpendicular to the guide through any other known centre. A slider on a fixed guide has zero angular velocity, so every point on it has the same velocity.

**Quoting a mean when the design needs a peak.** The mean velocity ratio of a mechanism is its displacement ratio, but the process is limited by the peak. A four-slot Geneva wheel's peak angular speed is $2.41$ times its mean during the index, and an eight-slot wheel's $1.86$ times; a machine rated on the mean index speed can still throw parts off its table at the peak.
:::

## Two methods, one answer

::: definition Differentiation of the loop {#def-differentiate}
**Differentiate the loop-closure equation with respect to time.** With $\omega_k = d \theta_k / dt$, the four-bar loop $a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$ gives

$$
\boxed{ a \omega_2 i e^{i \theta_2} + b \omega_3 i e^{i \theta_3} = c \omega_4 i e^{i \theta_4} }
$$

**which is two real equations in the two unknowns** $\omega_3$ and $\omega_4$, **evaluated at the position already found.** Written out:

$$
\begin{aligned}
- a \omega_2 \sin \theta_2 - b \omega_3 \sin \theta_3 + c \omega_4 \sin \theta_4 &= 0 \\
a \omega_2 \cos \theta_2 + b \omega_3 \cos \theta_3 - c \omega_4 \cos \theta_4 &= 0
\end{aligned}
\qquad
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \omega_3 \\ \omega_4 \end{pmatrix} =
\begin{pmatrix} a \omega_2 \sin \theta_2 \\ - a \omega_2 \cos \theta_2 \end{pmatrix}
$$

**Unlike the position equations, these are linear** — velocity analysis never has a choice of roots.

**The determinant of the matrix is tied to the transmission angle.** Expanding:

$$
\det = b c \sin \theta_3 \cos \theta_4 - b c \cos \theta_3 \sin \theta_4 = b c \sin \left( \theta_3 - \theta_4 \right), \qquad \left| \det \right| = b c \sin \mu
$$

since the angle between the coupler and the rocker is $\mu$ (or $180^\circ - \mu$). **The system is singular exactly where $\sin \mu = 0$**: the transmission angle of [[mechanisms/mechanisms-mobility]], the vanishing Jacobian of [[mechanisms/position-analysis]] and the coincident roots of the position quadratic are one condition. For a given output torque, the coupler force — and with it the input torque and the pin loads — grows roughly as $1 / \sin \mu$: about $2.9$ times its best value at $\mu = 20^\circ$ and $11.5$ times at $\mu = 5^\circ$.
:::

::: definition Instant centres {#def-centres}
::: theorem Aronhold–Kennedy {#thm-kennedy2}
**Three bodies moving in a plane relative to one another have three instant centres, and they are collinear.**
**Proof.** Let the bodies be $1$, $2$, $3$, take body $1$ as the reference, and let $P_{12}$ and $P_{13}$ be the instant centres of bodies $2$ and $3$ relative to it. Body $2$ is instantaneously turning about $P_{12}$, so any point $Q$ of body $2$ has a velocity relative to body $1$ perpendicular to $P_{12} Q$; likewise the point of body $3$ at $Q$ has a velocity perpendicular to $P_{13} Q$. The instant centre $P_{23}$ is, by definition, a point at which the coincident points of bodies $2$ and $3$ have the **same** velocity. If $Q$ is not on the line $P_{12} P_{13}$, the two perpendiculars point in different directions, so the two velocities cannot be equal unless both are zero — which happens only at $P_{12}$ and $P_{13}$ themselves when these coincide. Hence $P_{23}$ lies on the line $P_{12} P_{13}$. $\blacksquare$
:::

**The construction rules, which are all you need in practice.**

$$
\begin{array}{l l}
\text{Turning pair} & \text{the centre is at the pin} \\
\text{Prismatic pair} & \text{the centre is at infinity, perpendicular to the sliding direction} \\
\text{Rolling contact (no slip)} & \text{the centre is at the contact point} \\
\text{Rolling and sliding contact} & \text{the centre is on the common normal at the contact} \\
\text{Gear mesh} & \text{the centre is at the pitch point, on the line of centres} \\
\text{Any two known centres } P_{ij}, P_{jk} & \text{the third, } P_{ik} \text{, is on the line joining them (Kennedy)}
\end{array}
$$

**The angular-velocity-ratio theorem.** For links $2$ and $4$ both pivoted to the frame $1$,

$$
\boxed{ \frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} }
$$

**measured along the line through $I_{12}$, $I_{14}$ and $I_{24}$, which Kennedy's theorem guarantees is straight.** The ratio is positive (same sense of rotation) when $I_{24}$ lies outside the segment $I_{12} I_{14}$ and negative when it lies between them. It follows from the definition of $I_{24}$: the point there has the same velocity as part of link $2$, $\omega_2 \cdot \overline{I_{12} I_{24}}$, and as part of link $4$, $\omega_4 \cdot \overline{I_{14} I_{24}}$.

**The mechanical advantage** follows from conservation of power:

$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4}, \qquad
\frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} = \eta \frac{v_{\mathrm{in}}}{v_{\mathrm{out}}}
$$

with $\eta \le 1$ the efficiency: **losses make the output weaker**, so $\eta$ multiplies the ideal ratio.
:::

::: example Four-bar velocity, both methods {#ex-vel4}
The four-bar $a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$ metres has $\theta_2 = 40^\circ$ and $\omega_2 = 10\ \mathrm{rad / s}$ counter-clockwise. From the position solution (open circuit), $\theta_3 = 24.44^\circ$, $\theta_4 = 65.34^\circ$, $A = \left( 0.3830, 0.3214 \right)$, $B = \left( 1.4755, 0.8179 \right)$. Find $\omega_3$, $\omega_4$, the velocity of the coupler point $P = \left( 0.848, 0.972 \right)$, and the torque ratio.
::: solution
**Method 1 — differentiation.**
$$
v_A = a \omega_2 = 0.5 \times 10 = 5.00\ \mathrm{m / s}, \qquad
\vec{v}_A = 5.00 \left( - \sin 40^\circ, \cos 40^\circ \right) = \left( - 3.214,\; 3.830 \right)\ \mathrm{m / s}
$$
**The two scalar equations:**
$$
- 3.214 - 1.2 \omega_3 \sin 24.44^\circ + 0.9 \omega_4 \sin 65.34^\circ = 0
\qquad \Rightarrow \qquad - 3.214 - 0.4965 \omega_3 + 0.8179 \omega_4 = 0
$$
$$
3.830 + 1.2 \omega_3 \cos 24.44^\circ - 0.9 \omega_4 \cos 65.34^\circ = 0
\qquad \Rightarrow \qquad 3.830 + 1.0924 \omega_3 - 0.3755 \omega_4 = 0
$$
**From the second,** $\omega_4 = \left( 3.830 + 1.0924 \omega_3 \right) / 0.3755 = 10.200 + 2.9092 \omega_3$. **Substituting into the first:**
$$
- 3.214 - 0.4965 \omega_3 + 0.8179 \left( 10.200 + 2.9092 \omega_3 \right) = 0
\qquad \Rightarrow \qquad 5.129 + 1.8830 \omega_3 = 0
$$
$$
\boxed{ \omega_3 = - 2.724\ \mathrm{rad / s} \quad \left( \text{clockwise} \right) }, \qquad
\boxed{ \omega_4 = 10.200 - 7.925 = 2.276\ \mathrm{rad / s} \quad \left( \text{counter-clockwise} \right) }
$$
**Method 2 — instant centres.** The pin centres are $I_{12} = O_2 = \left( 0, 0 \right)$, $I_{14} = O_4 = \left( 1.1, 0 \right)$, $I_{23} = A$, $I_{34} = B$. **The one that gives $\omega_4$ is** $I_{24}$, on the line of the two fixed pivots and on the line of the coupler — the intersection of $AB$ with the $x$-axis:
$$
\text{slope of } AB = \frac{0.8179 - 0.3214}{1.4755 - 0.3830} = 0.4545
\qquad \Rightarrow \qquad x_{24} = 0.3830 - \frac{0.3214}{0.4545} = - 0.3241
$$
$$
\frac{\omega_4}{\omega_2} = \frac{\overline{I_{12} I_{24}}}{\overline{I_{14} I_{24}}} = \frac{0.3241}{1.1 + 0.3241} = 0.2276
\qquad \Rightarrow \qquad \omega_4 = 0.2276 \times 10 = \mathbf{2.276\ \mathrm{rad / s}} \quad \checkmark
$$
**The two methods agree.** $I_{24}$ lies outside $O_2 O_4$, so the rocker turns in the same sense as the crank.
**The velocity of $B$:**
$$
v_B = c \left| \omega_4 \right| = 0.9 \times 2.276 = 2.048\ \mathrm{m / s}
$$
**Its direction** is perpendicular to $O_4 B$ in the sense of $\omega_4$. With $\hat{u} = \left( 0.4172, 0.9088 \right)$ along $O_4 B$,
$$
\vec{v}_B = c \omega_4 \left( - u_y, u_x \right) = 2.048 \left( - 0.9088,\; 0.4172 \right) = \left( - 1.861,\; 0.854 \right)\ \mathrm{m / s}
$$
**Check by relative velocity.** With $\hat{e} = \left( 0.9104, 0.4138 \right)$ along $AB$:
$$
\vec{v}_{B / A} = b \omega_3 \left( - e_y, e_x \right) = 1.2 \left( - 2.724 \right) \left( - 0.4138,\; 0.9104 \right) = \left( 1.353,\; - 2.976 \right)
$$
$$
\vec{v}_B = \vec{v}_A + \vec{v}_{B / A} = \left( - 3.214 + 1.353,\; 3.830 - 2.976 \right) = \left( - 1.861,\; 0.854 \right) \quad \checkmark
$$
**The velocity of the coupler point $P$, by the instant centre $I_{13}$.** $I_{13}$ is on $O_2 A$ and on $O_4 B$:
$$
\text{line } O_2 A: y = 0.8391 x; \qquad \text{line } O_4 B: y = 2.1785 \left( x - 1.1 \right)
\qquad \Rightarrow \qquad I_{13} = \left( 1.789,\; 1.501 \right)
$$
The coupler is turning about $I_{13}$ at $\omega_3$. As a check, $A$ is $\overline{A I_{13}} = 2.336 - 0.5 = 1.836\ \mathrm{m}$ from it, and $\left| \omega_3 \right| \times 1.836 = 5.00\ \mathrm{m/s} = v_A$ ✓. For $P$:
$$
\overline{P I_{13}} = \sqrt{\left( 1.789 - 0.848 \right)^2 + \left( 1.501 - 0.972 \right)^2} = 1.079\ \mathrm{m}
\qquad \Rightarrow \qquad v_P = \left| \omega_3 \right| \times 1.079 = 2.724 \times 1.079 = \mathbf{2.94\ \mathrm{m / s}}
$$
**Check by vector addition:** $\vec{r}_{P / A} = \left( 0.465, 0.651 \right)$, so
$$
\vec{v}_P = \vec{v}_A + \omega_3 \hat{z} \times \vec{r}_{P / A} = \left( - 3.214, 3.830 \right) + \left( - 2.724 \right) \left( - 0.651, 0.465 \right) = \left( - 1.441,\; 2.563 \right)
$$
$$
\left| \vec{v}_P \right| = \sqrt{2.077 + 6.569} = 2.94\ \mathrm{m / s} \quad \checkmark
$$
**The torque ratio.**
$$
\frac{T_4}{T_2} = \eta \frac{\omega_2}{\omega_4} = \frac{1}{0.2276} = 4.39 \text{ ideal}, \qquad
T_4 = 0.90 \times 4.39 \, T_2 = 3.95 \, T_2 \text{ at } 90\ \% \text{ efficiency}
$$
**Over the cycle.** Repeating the calculation at other crank angles gives $\omega_4 / \omega_2 = - 0.833$ at $\theta_2 = 0$ (ideal torque ratio of magnitude $1.20$) and $0.563$ at $\theta_2 = 90^\circ$ (torque ratio $1.78$). The torque ratio varies by a large factor over one revolution, so a drive must be sized on the worst instant of the cycle, not on an average.
*Sanity.* The coupler's instant centre $I_{13}$ is $2.34\ \mathrm{m}$ from the crank pivot — far outside the linkage. That is normal: an instant centre is a point of the plane, not of the material, and here it simply says that the coupler is turning slowly about a distant point. The two independent checks on $\vec{v}_B$ and $\vec{v}_P$ confirm the numbers.
:::
:::

::: widget plot
f: 3.1416*(sin(x*pi/180)+0.25*sin(2*x*pi/180)/(2*sqrt(1-0.0625*pow(sin(x*pi/180),2))))
x: 0, 360
y: -3.4, 3.4
caption: The piston velocity (metres per second, positive away from top dead centre) of the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute, against crank angle in degrees. **The curve is not a sine wave: its peak of $3.24$ metres per second occurs at $76.7^\circ$, not at $90^\circ$**, and the return half is the mirror image of the outward half only because the mechanism is in-line. The peak is $3.1\ \%$ above $r\omega = 3.14$ metres per second and $1.62$ times the mean piston speed of $2.0$ metres per second. Notice that the curve passes through exactly $r\omega$ at $90^\circ$, where the second-harmonic term $\sin 2\theta$ is zero.
:::

## Centrodes, and why a mechanism is a pair of rolling shapes

::: definition Centrodes {#def-centrodes}
**As a link moves, its instant centre relative to the frame traces a curve on the fixed plane and another curve on the moving link.** They are the **fixed centrode** and the **moving centrode**, and a basic theorem of plane kinematics states that **the moving centrode rolls on the fixed centrode without slipping**. Any planar motion of a body can therefore be reproduced by rolling one curve on another.

$$
\begin{array}{l l l}
\text{Motion} & \text{Fixed centrode} & \text{Moving centrode} \\
\text{Rotation about a fixed pin} & \text{a point} & \text{the same point} \\
\text{Wheel rolling on a rail} & \text{the rail (a line)} & \text{the wheel's rim (a circle)} \\
\text{One gear relative to its mate} & \text{the mate's pitch circle} & \text{its own pitch circle} \\
\text{Four-bar coupler} & \text{a curve through the positions of } I_{13} & \text{its rolling partner on the coupler} \\
\text{Slider--crank connecting rod} & \text{a curve running to infinity where the rod translates} & \text{its partner on the rod}
\end{array}
$$

**The slider–crank rod is the instructive case.** The rod's instant centre relative to the frame is the intersection of the crank line $O_2 A$ with the line through the wrist pin perpendicular to the slider's path. **At top and bottom dead centre it is at the wrist pin** — the piston is momentarily at rest. **At $\theta = 90^\circ$ (and $270^\circ$) the two lines are parallel and the centre is at infinity: the rod is instantaneously translating**, and its angular velocity is zero. The rod's angular velocity is greatest at the dead centres: for the $100$–$400$ millimetre mechanism at $300$ revolutions per minute, $\omega_{\mathrm{rod}} = \omega \lambda = 7.85\ \mathrm{rad / s}$ at $0^\circ$ and $180^\circ$, $6.50\ \mathrm{rad / s}$ at $35^\circ$, and zero at $90^\circ$. Its angular **acceleration**, by contrast, is largest near $90^\circ$, where its angular velocity is changing sign.

**Gears are centrodes made solid.** Two gears transmit a constant velocity ratio when their pitch circles — the centrodes of their relative motion — roll on one another, and involute teeth are shaped so that this holds tooth after tooth. A useful consequence of the involute: if the centre distance of an involute pair is slightly wrong, the velocity ratio is still exactly constant (only the pressure angle and the backlash change), because the ratio is fixed by the base circles. A chain on sprockets does not have this property: its pitch line is a polygon, and the chain speed fluctuates once per tooth (chordal action).
:::

::: example Velocity by polygon {#ex-polygon}
For the four-bar of the earlier example, construct the velocity polygon and read off $\omega_3$ and $\omega_4$; then find the velocity of the coupler point $P$ from the velocity image.
::: solution
**The polygon is the vector equation $\vec{v}_B = \vec{v}_A + \vec{v}_{B / A}$ drawn to scale.**
**Step 1 — the known velocity.** $\vec{v}_A$ has magnitude $a \omega_2 = 5.00\ \mathrm{m / s}$ and is perpendicular to $O_2 A$; at $\theta_2 = 40^\circ$ with $\omega_2$ counter-clockwise it points at $130^\circ$. **Choose a scale of $1\ \mathrm{m / s}$ per $20\ \mathrm{mm}$**, so $\vec{v}_A$ is a $100\ \mathrm{mm}$ line.
**Step 2 — the two directions.** $\vec{v}_B$ is perpendicular to $O_4 B$, so it lies along the line at $65.34^\circ + 90^\circ = 155.34^\circ$. $\vec{v}_{B / A}$ is perpendicular to $AB$, so it lies along the line at $24.44^\circ + 90^\circ = 114.44^\circ$ (its sense is found from the drawing).
**Step 3 — draw.** From the pole $o$, lay off $oa = 100\ \mathrm{mm}$ at $130^\circ$. From $o$ draw a line at $155.34^\circ$; from $a$ draw a line at $114.44^\circ$. **Their intersection is $b$.**
**Step 4 — measure.**
$$
\overline{ob} = 41.0\ \mathrm{mm} \Rightarrow v_B = 2.05\ \mathrm{m / s}, \qquad
\overline{ab} = 65.4\ \mathrm{mm} \Rightarrow v_{B / A} = 3.27\ \mathrm{m / s}
$$
$$
\omega_4 = \frac{v_B}{c} = \frac{2.05}{0.9} = \mathbf{2.28\ \mathrm{rad / s}}, \qquad
\omega_3 = \frac{v_{B / A}}{b} = \frac{3.27}{1.2} = \mathbf{2.72\ \mathrm{rad / s}} \quad \checkmark
$$
The sense of $\omega_3$ follows from the direction of $\vec{v}_{B/A}$ on the drawing: $ab$ points downward and to the right, which is the velocity of $B$ about $A$ for a **clockwise** coupler.
**Why the polygon is still worth drawing.** The directions of $\vec{v}_B$ (set by the rocker) and $\vec{v}_{B/A}$ (set by the coupler) meet at an angle equal to the transmission angle, $40.9^\circ$ here. When that angle becomes small the intersection becomes ill-defined — the drawing shows a singular configuration before any determinant is computed.
**The velocity image of the coupler.** The points $a$, $b$, $p$ on the polygon form a triangle **similar** to the coupler triangle $A B P$, turned through $90^\circ$ (in the sense of $\omega_3$) and scaled by $\left| \omega_3 \right|$. So $ap$ has length $\left| \omega_3 \right| \cdot AP = 2.724 \times 0.8 = 2.18\ \mathrm{m / s}$, or $43.6\ \mathrm{mm}$, and is perpendicular to $AP$:
$$
\overline{op} = 58.8\ \mathrm{mm} \quad \Rightarrow \quad v_P = 2.94\ \mathrm{m / s}
$$
— the instant-centre answer, read from a drawing.
:::
:::

::: example Geneva velocity and the peak-to-mean trap {#ex-geneva}
A four-slot Geneva with centre distance $a = 100\ \mathrm{mm}$ is driven at $\omega_d = 10\ \mathrm{rad / s}$. Find the peak output angular velocity and its ratio to the mean during the index; repeat for an eight-slot wheel.
::: solution
**The geometry.** $r = a \sin \left( 180^\circ / n \right) = 100 \sin 45^\circ = 70.71\ \mathrm{mm}$.
**The motion law**, with the crank angle $\theta$ measured from the line of centres:
$$
\tan \psi = \frac{r \sin \theta}{a - r \cos \theta}
\qquad \Rightarrow \qquad
\frac{d \psi}{d \theta} = \frac{r a \cos \theta - r^2}{a^2 - 2 a r \cos \theta + r^2}
$$
**At $\theta = 0$** (pin deepest in the slot):
$$
\left. \frac{d \psi}{d \theta} \right|_0 = \frac{r a - r^2}{\left( a - r \right)^2} = \frac{r}{a - r}
= \frac{70.71}{29.29} = 2.414
\qquad \Rightarrow \qquad \boxed{ \dot{\psi}_{\max} = 2.414 \times 10 = 24.14\ \mathrm{rad / s} }
$$
**The mean during the index.** The wheel turns $90^\circ$ while the crank turns $180^\circ - 360^\circ / 4 = 90^\circ$, so the mean ratio is $1.000$ and the mean output speed during the index is $10.0\ \mathrm{rad / s}$:
$$
\frac{\dot{\psi}_{\max}}{\bar{\dot{\psi}}} = \frac{24.14}{10.0} = \mathbf{2.41}
$$
**For an eight-slot wheel** $r = 100 \sin 22.5^\circ = 38.27\ \mathrm{mm}$, so
$$
\left. d \psi / d \theta \right|_0 = \frac{38.27}{61.73} = 0.620, \qquad
\text{mean ratio} = \frac{45^\circ}{135^\circ} = 0.333, \qquad
\frac{\mathrm{peak}}{\mathrm{mean}} = \frac{0.620}{0.333} = \mathbf{1.86}
$$
**Reading the result.** The four-slot wheel reaches nearly two and a half times its average index speed at mid-index, the eight-slot wheel just under twice. Both peak-to-mean ratios belong on a data sheet beside the dwell fraction.
**The acceleration.** Differentiating once more gives peak angular accelerations of $5.41\, \omega_d^2$ for the four-slot wheel and $0.70\, \omega_d^2$ for the eight-slot — a factor of $7.7$. At $\omega_d = 10\ \mathrm{rad/s}$ the four-slot wheel reaches $541\ \mathrm{rad / s^2}$, which at a $0.5\ \mathrm{m}$ radius is $270\ \mathrm{m / s^2}$, about $28\, g$. **The acceleration peak is not where the velocity peaks:** at mid-index the velocity is greatest and the acceleration is zero; the acceleration's maximum lies $11.5^\circ$ of crank rotation either side of mid-index for the four-slot wheel, where the velocity curve is steepest.
*Sanity.* At entry and exit ($\theta = \pm 45^\circ$ for four slots) the formula gives $d\psi/d\theta = (ra \cos 45^\circ - r^2)/(\ldots) = 0$ because $r = a \cos 45^\circ$: the wheel starts and finishes the index at rest, as designed.
:::
:::

::: widget plot
f: (0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))) / ((0.5*sin((atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-x*pi/180)/sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180))))))-1.1)
x: 0, 360
y: -1.1, 0.65
caption: The angular-velocity ratio $\omega_4 / \omega_2$ of the $0.5$–$1.2$–$0.9$–$1.1$ metre four-bar against crank angle in degrees, computed from the position of the instant centre $I_{24}$ on the ground line. **The ratio is zero at $\theta_2 = 28.4^\circ$ and $234.7^\circ$ — the rocker's two extreme positions, where $I_{24}$ coincides with the crank pivot — and changes sign there.** Between them it rises to $+0.57$ (near $101^\circ$) during the slow outward swing and falls to $-1.04$ (near $344^\circ$) during the quick return. The asymmetry of the two lobes is the quick-return ratio seen in velocity: the return covers the same angle in less crank rotation, so it must be faster.
:::

## Direct contact, sliding velocity and wear

::: definition Sliding at a contact {#def-sliding}
**Where two links touch at a higher pair, the velocities of the two coincident points have equal components along the common normal** (otherwise the bodies would separate or interpenetrate). **Their difference lies along the common tangent: it is the sliding velocity**, and it governs the wear, the friction power and the lubrication of the contact.

$$
v_{\mathrm{slide}} = \left| \vec{v}_{C,1} - \vec{v}_{C,2} \right|, \qquad
P_{\mathrm{friction}} = \mu_f F_n v_{\mathrm{slide}}
$$

where $\mu_f$ is the coefficient of friction (not the transmission angle) and $F_n$ the normal force.

$$
\begin{array}{l c l}
\text{Contact} & \text{sliding velocity} & \text{consequence} \\
\text{Wheel rolling without slip} & 0 & \text{the contact point is the instant centre} \\
\text{Involute gear teeth} & 0 \text{ at the pitch point, growing towards tip and root} & \text{pitting near the pitch line, scuffing near the tips} \\
\text{Flat-faced cam follower} & \omega \left( r_0 + s \right) \text{, never zero} & \text{needs good lubrication and hard surfaces} \\
\text{Roller follower} & \text{small (roller rolls on the cam)} & \text{sliding moves into the roller's own bearing} \\
\text{Belt on a pulley} & \text{small creep} & \text{speed ratio slightly below the diameter ratio}
\end{array}
$$

**The gear result is the one to carry away.** For two gears turning at $\omega_1$ and $\omega_2$, the sliding velocity at a contact point a distance $x$ from the pitch point along the line of action is
$$
v_{\mathrm{slide}} = \left( \omega_1 + \omega_2 \right) x
$$
for external gears. It is **zero at the pitch point**, where the contact is pure rolling, and largest at the start and end of contact; its direction reverses as the contact passes the pitch point. That is why tooth surfaces typically show pitting near the pitch line (rolling with little sliding, high contact stress) and scuffing near the tips (high sliding).
:::

::: example Pressure angle and the sliding velocity of a cam {#ex-cam-vel}
A radial plate cam has base-circle radius $r_0 = 30\ \mathrm{mm}$ and gives a cycloidal rise of $h = 20\ \mathrm{mm}$ over $\beta = 120^\circ$ of cam rotation at $\omega = 30\ \mathrm{rad / s}$. Find the maximum follower velocity; the maximum pressure angle for a knife-edge follower and for a $10\ \mathrm{mm}$ roller follower; and, for a flat-faced follower, the pressure angle, the face width needed and the sliding velocity.
::: solution
**The motion law.** Cycloidal rise: $s = h \left[ \theta / \beta - \sin \left( 2\pi\theta / \beta \right) / 2\pi \right]$, so $ds/d\theta = (h / \beta) \left[ 1 - \cos \left( 2\pi\theta/\beta \right) \right]$, greatest at $\theta = \beta / 2$:
$$
\left( \frac{ds}{d\theta} \right)_{\max} = \frac{2 h}{\beta} = \frac{2 \times 0.020}{2.0944} = 0.01910\ \mathrm{m/rad}, \qquad
v_{\max} = \omega \left( \frac{ds}{d\theta} \right)_{\max} = \mathbf{0.573\ \mathrm{m / s}}
$$
**Pressure angle of a radial knife-edge or roller follower.** The angle $\varphi$ between the contact normal and the follower's line of motion satisfies
$$
\tan \varphi = \frac{ds / d\theta}{r_p + s}
$$
where $r_p$ is the prime-circle radius ($r_0$ for a knife edge, $r_0$ plus the roller radius for a roller). At mid-rise, $s = 10\ \mathrm{mm}$:
$$
\text{knife edge: } \tan \varphi = \frac{0.01910}{0.030 + 0.010} = 0.4775, \quad \varphi = 25.5^\circ
$$
The true maximum, found by evaluating $\varphi$ over the whole rise, is $26.1^\circ$ at $\theta = 54^\circ$ — slightly before mid-rise, because the denominator is still growing there. With a $10\ \mathrm{mm}$ roller, $r_p = 40\ \mathrm{mm}$ and the maximum falls to $\mathbf{21.2^\circ}$. A common guideline is to keep the pressure angle of a translating roller follower below about $30^\circ$; both pass.
**Flat-faced follower.** With the face perpendicular to the follower's axis, the contact normal is always along the axis, so **the pressure angle is zero throughout** — the flat face's great advantage. The price is paid elsewhere:
- **Face width.** The contact point lies a distance $ds/d\theta$ from the axis, so the face must extend at least $19.1\ \mathrm{mm}$ either side of it (plus a margin).
- **Sliding velocity.** Take the follower axis as $y$ and the contact point at $(x_c, r_0 + s)$ with $x_c = ds/d\theta$. The cam material there moves at $\omega \times$ its position vector, $\omega \left( - (r_0 + s),\; x_c \right)$. The $y$-component, $\omega x_c = \omega \, ds/d\theta$, is the follower's own velocity, as it must be; the $x$-component lies along the face, and the follower face has no velocity in that direction. So
$$
\boxed{ v_{\mathrm{slide}} = \omega \left( r_0 + s \right) }
$$
which is $30 \times 0.030 = 0.90\ \mathrm{m/s}$ at the start of the rise, $\mathbf{1.20\ \mathrm{m/s}}$ at mid-rise and $1.50\ \mathrm{m/s}$ at full lift. **It never falls to zero**, because the face always sits at least the base-circle radius from the cam's centre.
**Friction power** at $\mu_f = 0.12$ and a $180\ \mathrm{N}$ contact force:
$$
P = 0.12 \times 180 \times 1.20 = 25.9\ \mathrm{W} \quad \text{at mid-rise}, \qquad 32.4\ \mathrm{W} \text{ at full lift}
$$
That heat is generated in a narrow line contact, which is why flat-faced followers (such as the bucket tappets of many engines) run on hardened, well-lubricated surfaces, and are often offset from the cam so that they rotate and spread the wear.
**Roller follower.** The roller rolls on the cam with little slip, so the cam–roller contact sees almost no sliding; the sliding moves into the roller's pin or needle bearing, at a much smaller radius and in a lubricated, replaceable part.
*Sanity.* The radius of curvature of the cam profile under a flat follower is $r_0 + s + d^2s/d\theta^2$; for this law its minimum is $19.3\ \mathrm{mm}$, positive, so the profile is convex everywhere and the flat face can follow it. A smaller base circle or a faster rise would eventually make it negative, and a flat-faced follower cannot follow a concave or cusped profile.
:::
:::

::: quiz
In a four-bar with links numbered $1 =$ ground, $2 =$ input crank, $3 =$ coupler, $4 =$ output rocker, Kennedy's theorem locates the instant centre $I_{13}$ at:

- [ ] The midpoint of the line joining $I_{12}$ and $I_{34}$
- [x] The intersection of the line through $I_{12}$ and $I_{23}$ with the line through $I_{14}$ and $I_{34}$
- [ ] The intersection of the line through $I_{12}$ and $I_{34}$ with the line through $I_{14}$ and $I_{23}$
- [ ] Nowhere; it must be found by solving the velocity equations

::: solution
**The intersection of $I_{12} I_{23}$ with $I_{14} I_{34}$.** Kennedy's theorem says the three instant centres of three bodies in planar motion are collinear, so applying it to bodies $\{ 1 , 2 , 3 \}$ puts $I_{13}$ on the line $I_{12} I_{23}$ (the crank line), and applying it to $\{ 1 , 3 , 4 \}$ puts it on $I_{14} I_{34}$ (the rocker line); the intersection is $I_{13}$. Applied to $\{1, 2, 4\}$ and $\{2, 3, 4\}$, the same theorem puts $I_{24}$ on the ground line and on the coupler line, and the angular-velocity-ratio theorem then gives the ideal mechanical advantage

$$
M A = \frac{ T_4 }{ T_2 } = \frac{ \omega_2 }{ \omega_4 } = \frac{ \overline{ I_{14 } I_{24 } } }{ \overline{ I_{12 } I_{24 } } }
$$

**When the crank and coupler fall in line, the coupler line passes through $I_{12}$, so $I_{24}$ coincides with $I_{12}$: $\omega_4 = 0$ and the ideal advantage is infinite — the toggle at the rocker's extreme positions.** When the coupler and rocker fall in line, $I_{24}$ coincides with $I_{14}$ and the advantage is zero: the crank cannot drive the rocker there (a dead centre, $\mu = 0$). The method is exact at an instant, but becomes inaccurate graphically when the two lines meet at a shallow angle, and it gives no accelerations.
:::
:::

::: history
**Robert Willis**'s *Principles of Mechanism* (1841) classified mechanisms by the velocity ratio and directional relation they produce between driver and follower, the viewpoint of this lesson. **Franz Reuleaux**'s *Theoretische Kinematik* (1875) built the theory of planar motion on the instant centre and the pair of rolling curves — the centrodes — that every planar motion defines. The theorem of three centres was published by **Siegfried Aronhold** in 1872 and found independently by **Alexander Kennedy**, who gave it in *The Mechanics of Machinery* (1886). **Robert H. Smith** of Mason College, Birmingham, presented a graphical method of drawing velocity and acceleration diagrams for mechanisms to the Royal Society of Edinburgh in 1885; **Fleeming Jenkin**, in an abstract of Smith's paper, called the figure of the velocity diagram the "image" of the mechanism — the velocity image used in the polygon example above.
:::

## Where this leads

The accelerations that follow by differentiating once more are [[mechanisms/acceleration-analysis]], and with them the inertia forces that make a high-speed linkage a dynamics problem; the velocity ratio is the quantity [[mechanisms/linkage-synthesis]] trades against the transmission angle; sliding velocity is central to [[mechanisms/gears]]' wear and efficiency and to the follower choices of [[mechanisms/cams]]; and the instant-centre method generalises into the velocity Jacobians of [[robotics]].

::: summary
- Differentiate the loop: two linear equations in the two unknown angular velocities, evaluated at the solved position — no choice of roots.
- The determinant of that system has magnitude $bc\sin\mu$; the transmission angle, the singular Jacobian and the coincident position roots are one condition.
- Kennedy's theorem puts three instant centres on a line; turning pairs are at pins, prismatic pairs at infinity, rolling contacts at the contact point.
- $\omega_4 / \omega_2 = \overline{I_{12}I_{24}} / \overline{I_{14}I_{24}}$, and the actual torque ratio is the reciprocal times the efficiency.
- The velocity image of a link is similar to the link, turned through $90^\circ$ and scaled by its angular velocity.
- Fixed and moving centrodes roll without slipping; a slider–crank rod's centre is at the wrist pin at the dead centres and at infinity at $90^\circ$.
- Sliding velocity sets wear and friction power: zero at a gear's pitch point, $\omega(r_0+s)$ and never zero at a flat-faced follower.
- Quote peak output speed, not mean: a four-slot Geneva peaks at $2.41$ times its mean index speed.
:::

## Exercises

::: exercise Instant-centre count {level=1 check="6"}
Give the number of instant centres in a four-link planar mechanism.
::: solution
$\binom{4}{2}=4\times3/2=6$.
:::
:::

::: exercise Velocity ratio {level=1 check="2.28"}
For the four-bar of the worked example, give $\omega_4$ in radians per second when $\omega_2=10$ radians per second at $\theta_2=40^\circ$.
::: solution
$\overline{I_{12}I_{24}}/\overline{I_{14}I_{24}}=0.3241/1.4241=0.2276$; $\omega_4=2.28$ rad/s.
:::
:::

::: exercise Coupler angular velocity {level=1 check="2.72"}
For the same four-bar, give the magnitude of the coupler's angular velocity in radians per second.
::: solution
$\left|\omega_3\right|=2.72$ rad/s (clockwise), from the two loop equations or from $v_A/\overline{AI_{13}}=5.00/1.836$.
:::
:::

::: exercise Torque ratio {level=1 check="4.39"}
For the same four-bar at $\theta_2=40^\circ$, give the ideal torque ratio $T_4/T_2$.
::: solution
$T_4/T_2=\omega_2/\omega_4=10/2.276=4.39$.
:::
:::

::: exercise Rod angular velocity {level=1 check="6.50"}
For the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute and $\theta=35^\circ$, give the connecting rod's angular velocity in radians per second.
::: solution
$\omega_{\mathrm{rod}}=\omega\lambda\cos\theta/\sqrt{1-\lambda^2\sin^2\theta}=31.416\times0.25\times0.8192/0.98967=6.50$ rad/s.
:::
:::

::: exercise Geneva peak {level=1 check="2.41"}
Give the ratio of peak to mean output angular velocity during the index of a four-slot Geneva mechanism.
::: solution
$r/(a-r)=\sin45^\circ/(1-\sin45^\circ)=2.414$; the mean ratio during the index is $1.000$, so the peak-to-mean ratio is $2.41$.
:::
:::

::: exercise Geneva, eight slots {level=1 check="1.86"}
Give the ratio of peak to mean output angular velocity during the index of an eight-slot Geneva mechanism.
::: solution
$\left[\sin22.5^\circ/(1-\sin22.5^\circ)\right]/(45/135)=0.620/0.333=1.86$.
:::
:::

::: exercise Sliding velocity {level=1 check="0"}
Give the sliding velocity, in metres per second, at the pitch point of a pair of involute spur gears.
::: solution
Zero. The pitch point is the instant centre of the two gears' relative motion, so the two coincident points have the same velocity; sliding occurs only away from the pitch point.
:::
:::

::: exercise Prismatic centre {level=2}
Where is the instant centre of a slider relative to the frame, and what is the slider's angular velocity? How is a prismatic pair handled in a Kennedy construction?
::: solution
**At infinity, in the direction perpendicular to the sliding.** **The angular velocity is zero**: the slider translates, so every point on it has the same velocity — which is the limit of $v = \omega r$ as the centre recedes to infinity with $\omega r$ fixed. In a Kennedy construction, a line "through" a centre at infinity is drawn through the other known centre perpendicular to the guide. A computer program must treat this case explicitly, because the two lines whose intersection would locate the centre are parallel; linkage codes therefore store a prismatic pair as a direction rather than a point.
:::
:::

::: exercise Mechanical advantage of a toggle {level=2 check="5.72"}
A toggle press has two equal links, each inclined at $\alpha = 5^\circ$ to the line joining their outer pins, driven by a transverse force at the knee. Give the ideal force ratio $F_{\mathrm{out}}/F_{\mathrm{in}}$, and confirm it by virtual work (velocities).
::: solution
**By statics:**
$$
\left( \frac{F_{\mathrm{out}}}{F_{\mathrm{in}}} \right)_{\mathrm{ideal}} = \frac{1}{2 \tan \alpha} = \frac{1}{2 \tan 5^\circ} = 5.72
$$
**By velocities.** Let each link have length $L$, one outer pin fixed and the other (the ram) free to slide along the line of the pins. The ram is at $x = 2L\cos\alpha$ and the knee at height $y = L\sin\alpha$. Then $\dot x = -2L\sin\alpha\,\dot\alpha$ and $\dot y = L\cos\alpha\,\dot\alpha$, so
$$
\frac{v_{\mathrm{in}}}{v_{\mathrm{out}}} = \frac{\left| \dot y \right|}{\left| \dot x \right|} = \frac{\cos\alpha}{2 \sin\alpha} = \frac{1}{2\tan\alpha} = 5.72
$$
and, by conservation of power, $F_{\mathrm{out}} / F_{\mathrm{in}} = v_{\mathrm{in}} / v_{\mathrm{out}}$ — the same result. With an efficiency $\eta$ the force ratio becomes $5.72\,\eta$. As $\alpha \to 0$ the ram's velocity goes to zero for a finite knee velocity: the ram is at the end of its stroke, and the ideal advantage is infinite.
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
**Differentiate the position:**
$$
\frac{d x}{d \theta} = - r \sin \theta - l \sin \phi \frac{d \phi}{d \theta} = - r \sin \theta - r \cos \theta \tan \phi
$$
$$
\boxed{ v = - \frac{dx}{dt} = r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right] }
$$
(positive away from top dead centre), **using $\tan \phi = \lambda \sin \theta / \sqrt{1 - \lambda^2 \sin^2 \theta}$ and $2 \sin \theta \cos \theta = \sin 2 \theta$.**
**The maximum.** To first order in $\lambda$, $v \approx r\omega \left( \sin\theta + \tfrac{\lambda}{2} \sin 2\theta \right)$; setting $dv / d\theta = 0$ gives $\cos \theta + \lambda \cos 2 \theta = 0$, and with $\cos 2 \theta = 2 \cos^2 \theta - 1$ and $c = \cos\theta$:
$$
2 \lambda c^2 + c - \lambda = 0
\qquad \Rightarrow \qquad c = \frac{- 1 \pm \sqrt{1 + 8 \lambda^2}}{4 \lambda}
$$
**The minus root is $- 2.22$, outside $[-1, 1]$; the plus root is the answer:**
$$
\cos \theta = \frac{- 1 + \sqrt{1 + 8 \times 0.0625}}{4 \times 0.25} = \frac{- 1 + 1.2247}{1.0} = 0.2247
\qquad \Rightarrow \qquad \theta = 77.0^\circ
$$
**Maximising the exact expression numerically gives**
$$
\boxed{ \theta_{v_{\max}} = 76.7^\circ, \qquad v_{\max} = 1.031\, r \omega }
$$
so the first-order estimate is within $0.3^\circ$. Compared with a pure sinusoid, the peak is $3.1\ \%$ higher and $13.3^\circ$ earlier. Because the acceleration is zero where the velocity is greatest, the piston acceleration's zero crossing moves by the same $13.3^\circ$ — $3.7\ \%$ of a revolution.
*Sanity.* $v_{\max} / r \omega = 1.031$ matches $1 + \lambda^2 / 2 = 1.031$: the correction to the peak is second order in $\lambda$. The peak is above $r\omega$ because, on the outward stroke before $90^\circ$, the rod's swing adds to the piston's motion.
:::
:::

::: exercise Design {level=3}
Choose and size the **indexing drive of a rotary labelling machine**: eight stations, $60$ indexes per minute, each index to be completed in at most $0.35\ \mathrm{s}$, $3\ \mathrm{kg}$ bottles at a $0.45\ \mathrm{m}$ station radius on a $60\ \mathrm{kg}$ disc-shaped table, positional repeatability $\pm 0.03^\circ$ at the label head, and the table must not move if power is lost. The bottles contain liquid; take $0.2\, g$ as the lateral-acceleration limit for open bottles. Give the topology, the motion law, the sizing, the failure modes and the acceptance tests.
::: solution
**The duty.** $60$ indexes per minute is one per $1.000\ \mathrm{s}$: at most $0.35\ \mathrm{s}$ of index and at least $0.65\ \mathrm{s}$ of dwell, a dwell fraction of $0.65$. Each index is $45^\circ = 0.7854\ \mathrm{rad}$.
**Geneva?** A $45^\circ$ index needs an eight-slot wheel, whose dwell fraction is fixed at $0.625$: at one driver revolution per second the index takes $0.375\ \mathrm{s}$ — **too long**. The Geneva is rejected on timing.
**Cam indexer.** Its index angle and motion law are set by the cam design, so it can index in exactly $0.35\ \mathrm{s}$ and lock the turret during the dwell — which also satisfies the power-loss requirement mechanically. Mobility, with the turret rollers welded to the turret: $N = 3$, $J_1 = 2$, $J_2 = 1$, $M = 1$. With a **modified-sine** law (coefficients $C_v = 1.76$, $C_a = 5.53$):
$$
\dot{\psi}_{\max} = 1.76 \times \frac{0.7854}{0.35} = 3.95\ \mathrm{rad / s}, \qquad
\ddot{\psi}_{\max} = 5.53 \times \frac{0.7854}{0.35^2} = 35.5\ \mathrm{rad / s^2}
$$
**The liquid is the real constraint.** At the $0.45\ \mathrm{m}$ station radius the peak tangential acceleration is $35.5 \times 0.45 = 16.0\ \mathrm{m / s^2} = 1.63\, g$, eight times the $0.2\, g$ limit. Keeping to $0.2\, g$ would need
$$
\ddot{\psi}_{\max} \le \frac{0.2 \times 9.81}{0.45} = 4.36\ \mathrm{rad / s^2}
\qquad \Rightarrow \qquad t_{\mathrm{index}} \ge \sqrt{\frac{5.53 \times 0.7854}{4.36}} = 1.00\ \mathrm{s}
$$
**— the whole cycle.** No indexing mechanism can meet both the rate and the $0.2\, g$ limit; **the requirement must change**. The realistic options are: (1) label after capping, with the bottles held in pucks or clamps, and set a higher limit (say $1.5\, g$, to be confirmed by trial); (2) reduce the radius; (3) reduce the rate; or (4) use a continuous-motion machine, which removes the indexing accelerations altogether — the usual choice for high-speed labelling.
**Sizing for option (1) with a smaller table.** Reduce the pitch radius to $0.40\ \mathrm{m}$ and the table mass to $50\ \mathrm{kg}$. The peak lateral acceleration is then $35.5 \times 0.40 = 14.2\ \mathrm{m/s^2} = 1.45\, g$, inside the assumed $1.5\, g$. The output inertia is
$$
I = 8 \times 3 \times 0.40^2 + \tfrac{1}{2} \times 50 \times 0.40^2 = 3.84 + 4.00 = 7.84\ \mathrm{kg \cdot m^2}
\qquad \Rightarrow \qquad T_{\max} = 7.84 \times 35.5 = 278\ \mathrm{N \cdot m}
$$
plus friction; the indexer is chosen from the manufacturer's ratings with a service factor.
**Repeatability.** $\pm 0.03^\circ$ at a label head $80\ \mathrm{mm}$ from the axis is $\pm 0.042\ \mathrm{mm}$. With assumed contributions of $\pm 0.01^\circ$ (cam profile), $\pm 0.02^\circ$ (roller-to-track clearance at lock), $\pm 0.008^\circ$ (bearing run-out) and $\pm 0.005^\circ$ (input positioning), the root-sum-square is
$$
\sqrt{0.005^2 + 0.01^2 + 0.02^2 + 0.008^2} = 0.024^\circ \quad \checkmark
$$
**Failure modes.** Cam-roller wear (repeatability degrades first); a jam overloading the drive (fit an overload clutch); bottles shifting in their pucks at the acceleration peak; and loss of position on power loss if the cam's lock is worn.
**Acceptance tests.** Repeatability measured at the label radius over at least $100$ consecutive indexes; index time measured; high-speed video of bottles at the worst fill level during the index; input torque recorded and compared with the model; power removed at the worst phase of the cycle to show the table does not move. The example shows how velocity and acceleration analysis drive the choice; the machine itself is designed and checked by qualified engineers to the applicable machinery-safety requirements.
:::
:::
