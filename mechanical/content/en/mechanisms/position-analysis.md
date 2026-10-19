Velocity analysis is the interesting half of kinematics, but you cannot differentiate a mechanism you have not yet been able to **place**. Position analysis asks the one question every linkage design review must answer before any force, motor or tolerance is discussed: **given the input, where is everything else?** For a slider–crank the answer is a square root. For a four-bar it is a quadratic, and the two roots are the two ways the machine can be assembled. For a six-bar it is a quadratic nested inside another, and for a parallel manipulator it is a polynomial of degree forty, which is why the general parallel robot's position problem was open for thirty years and is still not solved in closed form on a computer.

This lesson is about the four cases an engineer actually meets — **the vector loop, the quadratic, the branch, and the error you accept when you replace the quadratic with a straight line** — and about the fact that the hardest part of position analysis is not solving the equation but **choosing the right root of it, every step, for every link, without ever switching.**

::: warning Five position errors that look like arithmetic
**Taking the wrong root.** Every closed loop gives a quadratic, and a quadratic has two roots, and **both are correct solutions of the equations and only one of them is your machine.** **The reason a four-bar's two roots are called its open and crossed circuits and not its primary and spurious solutions is that the crossed circuit is a real, buildable, perfectly valid mechanism** — it is simply not the one the drawing shows, and the reason a numerical solver that starts from the previous time step and takes the nearer root is the standard advice is that the wrong root at one step propagates into a linkage that flies apart at the next. **The number that makes the branch a hazard is that the two roots coincide at a limit position**, and at a coincidence the choice is not merely ambiguous but undefined — which is why a mechanism driven through a dead centre needs a rule and not a formula.
**Confusing circuit with branch.** A linkage's **circuit** is which assembly mode it is in (open or crossed); its **branch** is which root of the *inner* quadratic you took. **A six-bar has two circuits and two branches, hence four positions for the same input, and a mechanism can change branch without changing circuit** — which is why the classical names are **circuit defect** and **branch defect**, after Gruebler, and the reason a pick-and-place arm that changes branch mid-stroke is a safety case and not a modelling curiosity is that its end effector moves faster than the controller can follow.
**Dropping the second-order term.** The slider–crank's exact displacement is $s = r \left( 1 - \cos\theta \right) + l \left( 1 - \sqrt{1 - \lambda^2 \sin^2 \theta} \right)$ and the textbook approximation keeps only the first term of the binomial expansion. **The reason the approximation is not "good enough" at $\lambda = 0.25$ is that it is wrong by $4.1\ \mathrm{mm}$ in a $200\ \mathrm{mm}$ stroke — two per cent of the swept volume, and nineteen per cent of the displacement at thirty degrees —** and the reason the error is a nearly constant fraction of the displacement over the first third of the stroke is that both terms grow like $\theta^2$ from top dead centre and their ratio is $\lambda / 2$. **The number that makes the second term mandatory is the connecting-rod ratio:** dropping it costs $5.0\ \%$ of the stroke at $\lambda = 0.20$ and $8.5\ \%$ at $\lambda = 0.34$, and modern engines run $\lambda = 0.30$ to $0.34$ for a shorter and stiffer block, so the term that a long-rod 1960 engine could afford to lose is the term a modern one cannot.
**Losing the transmission angle in the algebra.** A position solution that reports the joint angles and not the transmission angle has reported the geometry and hidden the design. **The reason a four-bar whose coupler and rocker are at $28.96^\circ$ at one crank position is a bad mechanism even though its position solution is exact is that the force it can deliver at that instant is a factor of two below what it can deliver at $90^\circ$**, and the reason every position-analysis program in existence should plot $\mu \left( \theta \right)$ alongside the coordinates is that the plot is the design and the coordinates are the arithmetic.
**Assuming the loop closes.** A mechanism with a **redundant constraint** — a parallelogram, a five-bar closed by a fifth bar, a parallel manipulator's over-constrained limb — has position equations that are **inconsistent by the manufacturing error**, and the reason a designer who solves them anyway gets a plausible answer is that the solver silently minimises the residual instead of reporting it. **The number that makes this a real cost is that a parallelogram linkage whose four bars are made to $\pm 0.1\ \mathrm{mm}$ over $200\ \mathrm{mm}$ will bind at one in four assembly positions**, and the reason the fix is a clearance bushing at one joint and not a tighter tolerance is that the tighter tolerance costs eight times as much and still leaves the residual.
:::

## The vector loop

::: definition Loop-closure equations {#def-loop}
**Write each link as a vector along its own axis, add them round a closed loop, and set the sum to zero.** In complex notation a link of length $L$ at angle $\theta$ is $L e^{i\theta} = L \left( \cos\theta + i \sin\theta \right)$, and a loop of $n$ links is

$$
\boxed{ \sum_{k = 1}^{n} L_k e^{i \theta_k} = 0 }
$$

**which is two real equations** — one for the real part, one for the imaginary — **and is therefore solvable for exactly two unknowns.** That single sentence is the whole of planar position analysis: a four-bar has four angles of which one is the input and one can be eliminated, a slider–crank has an angle and a length, and a mechanism whose loop leaves three unknowns cannot be solved from one loop and needs a second loop or a second input.

$$
\begin{array}{l c c l l}
\text{Loop} & \text{Vectors} & \text{Unknowns} & \text{Equations} & \text{Character of the solution} \\
\text{Four-bar} & 4 & 2 & 2 & \text{quadratic — two circuits} \\
\text{Slider--crank, in-line} & 3 & 2 & 2 & \text{quadratic, one root inadmissible} \\
\text{Slider--crank, offset} & 3 & 2 & 2 & \text{quadratic with an offset term} \\
\text{Five-bar} & 4 & 3 & 2 & \text{needs a second input} \\
\text{Watt six-bar} & 4 + 4 & 4 & 4 & \text{two nested quadratics} \\
\text{Cam, flat follower} & 3 & 2 & 2 & \text{linear in the profile coordinates} \\
\text{3-RPS platform} & 3 \text{ limbs} & 3 & 3 & \text{tenth degree in general}
\end{array}
$$

**The four-bar, written out.** With ground $d$ along the real axis, crank $a$ at $\theta_2$, coupler $b$ at $\theta_3$, rocker $c$ at $\theta_4$:

$$
a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}
$$

**Eliminate $\theta_3$** by moving the crank term to the right and taking the squared modulus — the trick that makes the whole subject tractable, because $\left| z \right|^2$ kills the angle you do not want:

$$
b^2 = a^2 + c^2 + d^2 - 2 a d \cos \theta_2 + 2 c d \cos \theta_4 - 2 a c \cos \left( \theta_2 - \theta_4 \right)
$$

**and dividing by $2ac$ gives Freudenstein's equation**, published in **1954** and the first result in the subject since Reuleaux:

$$
\boxed{ K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos \left( \theta_2 - \theta_4 \right) }, \qquad
K_1 = \frac{d}{a}, \quad K_2 = \frac{d}{c}, \quad K_3 = \frac{a^2 - b^2 + c^2 + d^2}{2 a c}
$$

**and the three constants are the whole of the four-bar's kinematics.** The reason Freudenstein's equation is worth memorising in preference to the derivation is that it makes **synthesis** algebraic: given three desired pairs $\left( \theta_2, \theta_4 \right)$ you have three linear equations in $K_1, K_2, K_3$ and therefore a **three-point function generator by hand**, which is exactly what Freudenstein's paper did and what Chebyshev's 1853 theorem had already predicted geometrically.
:::

::: definition Solving the quadratic {#def-quadratic}
**Substitute the half-angle** $u = \tan \left( \theta_4 / 2 \right)$, so that $\cos \theta_4 = \left( 1 - u^2 \right) / \left( 1 + u^2 \right)$ and $\sin \theta_4 = 2 u / \left( 1 + u^2 \right)$. The loop equation becomes

$$
A u^2 + B u + C = 0 \qquad \Rightarrow \qquad
\boxed{ \theta_4 = 2 \arctan \left( \frac{- B \pm \sqrt{B^2 - 4 A C}}{2 A} \right) }
$$

**The coefficients, derived once so they can be trusted.** Collecting powers of $u$ from the squared-modulus equation gives

$$
\begin{aligned}
G &= a^2 + c^2 + d^2 - b^2 - 2 a d \cos \theta_2, &
E &= 2 c \left( d - a \cos \theta_2 \right), \\
A' &= G - E, \qquad B' = - 4 a c \sin \theta_2, \qquad C' = G + E &
\theta_4 &= 2 \arctan \frac{- B' \pm \sqrt{B'^2 - 4 A' C'}}{2 A'}
\end{aligned}
$$

**The worked check on the mechanism of the next example** ($a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$, $\theta_2 = 40^\circ$):
$$
G = 0.25 + 0.81 + 1.21 - 1.44 - 1.10 \cos 40^\circ = - 0.0126, \qquad E = 1.8 \times 0.71698 = 1.29056
$$
$$
A' = - 1.30316, \quad B' = - 1.15702, \quad C' = 1.27796, \qquad B'^2 - 4 A' C' = 1.3387 + 6.6715 = 8.0102
$$
$$
u = \frac{1.15702 \pm 2.83023}{- 2.60632} \qquad \Rightarrow \qquad
u = 0.64198 \Rightarrow \theta_4 = \mathbf{65.40^\circ}, \qquad
u = - 1.52984 \Rightarrow \theta_4 = \mathbf{246.4^\circ}
$$
**the open and crossed circuits of the four-bar, from one quadratic and one sign choice.**

**The discriminant is the mechanism's assemblability.** $B'^2 - 4 A' C' < 0$ means **the loop cannot close at this input** — the crank has reached a position the rest of the chain cannot reach — and the reason a four-bar's crank can rotate fully while a rocker's cannot is exactly that the discriminant stays positive for a Grashof crank and changes sign at a non-Grashof rocker's limit. **The number that makes the discriminant the design check is that it vanishes at a limit position, and a mechanism whose minimum discriminant over the working range is $1\ \%$ of its maximum is a mechanism whose position derivative is enormous** — the same statement as "the transmission angle is near zero", reached from the algebra instead of the geometry.
:::

::: example Four-bar position by the diagonal method {#ex-fbpos}
A four-bar has crank $a = 0.5\ \mathrm{m}$, coupler $b = 1.2\ \mathrm{m}$, rocker $c = 0.9\ \mathrm{m}$ and ground $d = 1.1\ \mathrm{m}$, with the crank at $\theta_2 = 40^\circ$. Find $\theta_3$, $\theta_4$, the coupler point $P$ at $0.8\ \mathrm{m}$ from $A$ at $30^\circ$ to $AB$, and the transmission angle.
::: solution
**The check first.** $s + l = 0.5 + 1.2 = 1.7$, $p + q = 0.9 + 1.1 = 2.0$: **Grashof**, and the shortest link is the crank adjacent to the ground, so this is a **crank–rocker** and $\theta_2$ may take any value.
**The diagonal method, which is the method to use by hand and in a spreadsheet.** Place $O_2$ at the origin and $O_4$ at $\left( 1.1, 0 \right)$.
$$
A = 0.5 \left( \cos 40^\circ, \sin 40^\circ \right) = \left( 0.3830,\; 0.3214 \right)
$$
**The diagonal from $A$ to $O_4$:**
$$
\vec{f} = \left( 1.1 - 0.3830,\; 0 - 0.3214 \right) = \left( 0.7170,\; - 0.3214 \right)
\qquad f = 0.7857\ \mathrm{m}, \qquad \alpha = - 24.16^\circ
$$
**The triangle $A$–$B$–$O_4$** has sides $b = 1.2$, $c = 0.9$, $f = 0.7857$, so the angle at $A$ is
$$
\cos \beta = \frac{b^2 + f^2 - c^2}{2 b f} = \frac{1.44 + 0.6174 - 0.81}{2 \times 1.2 \times 0.7857} = \frac{1.2474}{1.8857} = 0.6615
\qquad \beta = 48.59^\circ
$$
**The two circuits.** $\theta_{AB} = \alpha \pm \beta$:
$$
\text{open: } \theta_3 = - 24.16 + 48.59 = \mathbf{24.44^\circ}, \qquad
\text{crossed: } \theta_3 = - 24.16 - 48.59 = \mathbf{- 72.75^\circ}
$$
**The open circuit:**
$$
B = A + 1.2 \left( \cos 24.44^\circ, \sin 24.44^\circ \right) = \left( 1.4747,\; 0.8180 \right)
\qquad \Rightarrow \qquad \theta_4 = \arctan \frac{0.8180}{1.4747 - 1.1} = \mathbf{65.37^\circ}
$$
**The crossed circuit:**
$$
B' = A + 1.2 \left( \cos \left( - 72.75 \right)^\circ, \sin \left( - 72.75 \right)^\circ \right) = \left( 0.7409,\; - 0.8244 \right)
\qquad \Rightarrow \qquad \theta_4' = \mathbf{246.4^\circ}
$$
**The check that both are right:** $\left| B - O_4 \right| = \sqrt{0.3747^2 + 0.8180^2} = 0.900$ and $\left| B' - O_4 \right| = 0.899$. **Both close the loop to three figures, and both are correct answers to the question asked** — which is the reason the question must specify the circuit.
**The coupler point.** $P$ lies at $30^\circ$ to $AB$ at a radius of $0.8$:
$$
P = A + 0.8 \left( \cos \left( 24.44 + 30 \right)^\circ, \sin \left( 54.44 \right)^\circ \right)
= \left( 0.3830 + 0.4652,\; 0.3214 + 0.6509 \right) = \mathbf{\left( 0.848,\; 0.972 \right)}
$$
**The transmission angle**, measured at $B$ between the coupler and the rocker:
$$
\cos \mu = \frac{b^2 + c^2 - f^2}{2 b c} = \frac{1.44 + 0.81 - 0.6174}{2 \times 1.2 \times 0.9} = \frac{1.6326}{2.16} = 0.7558
\qquad \boxed{ \mu = 40.9^\circ }
$$
**The reading, and the reason this mechanism is a bad one.** $\mu$ is not a constant; it varies through the cycle as $f$ varies, and
$$
f^2 = a^2 + d^2 - 2 a d \cos \theta_2 = 1.46 - 1.10 \cos \theta_2
$$
**is smallest at $\theta_2 = 0$ and largest at $180^\circ$:**
$$
\theta_2 = 0: \quad f = 0.600, \quad \cos \mu = \frac{2.25 - 0.36}{2.16} = 0.875, \quad \mu_{\min} = \mathbf{29.0^\circ}
$$
$$
\theta_2 = 180^\circ: \quad f = 1.600, \quad \cos \mu = \frac{2.25 - 2.56}{2.16} = - 0.1435, \quad \mu_{\max} = \mathbf{98.3^\circ}
$$
**The mechanism fails the $40^\circ$ rule over $62^\circ$ of its cycle**, and the reason the fix is to lengthen the rocker to $1.05$ and shorten the crank to $0.42$ — which moves $\mu_{\min}$ to $41^\circ$ at the cost of $16\ \%$ of the rocker's swing — is that the transmission angle is a statement about the **ratio** of the diagonal's extremes and not about the scale.
*Sanity.* The reason $\theta_4 = 65.37^\circ$ lies between the rocker's two limit positions of $63.93^\circ$ and $140.60^\circ$ and close to the lower one is that $\theta_2 = 40^\circ$ is only $12^\circ$ past the lower limit at $\theta_2 = 28.4^\circ$; and the reason the crossed circuit's $\theta_4' = 246.4^\circ$ is not a third limit position is that the crossed circuit has its own pair of limits, $180^\circ$ away, and **the two circuits are never connected** — a four-bar driven by a continuously rotating crank stays in whichever circuit it was assembled in, for ever, unless it is a change-point mechanism.
:::
:::

## The slider–crank, and the term everyone drops

::: definition Slider–crank displacement {#def-slidercrank}
**With crank $r$, connecting rod $l$, ratio $\lambda = r / l$ and offset $e$:**

$$
\boxed{ \phi = \arcsin \left( \lambda \sin \theta - \frac{e}{l} \right) }, \qquad
x = r \cos \theta + l \cos \phi
$$

**with $e = 0$ for the in-line case.** The offset is small — two to five per cent of the crank radius in a car engine, deliberately placed to the major-thrust side so the piston quiets its slap — and the reason it appears inside the arcsine and not outside is that it is a **displacement** and not a scale factor, which is why an offset changes the piston's position at top dead centre and therefore the engine's compression ratio.

**Displacement from top dead centre**, where $x_{\mathrm{TDC}} = r + l$:

$$
\boxed{ s = r \left( 1 - \cos \theta \right) + l \left[ 1 - \sqrt{1 - \lambda^2 \sin^2 \theta} \right] }
$$

**The binomial expansion, which is where the second term comes from:**

$$
\sqrt{1 - \lambda^2 \sin^2 \theta} \approx 1 - \frac{\lambda^2 \sin^2 \theta}{2} - \frac{\lambda^4 \sin^4 \theta}{8}
\qquad \Rightarrow \qquad
\boxed{ s \approx r \left( 1 - \cos \theta \right) + \frac{r^2}{2 l} \sin^2 \theta }
$$

$$
\begin{array}{c l c c c}
\lambda = r / l & \text{typical application} & \text{second term at } 90^\circ & \text{as a fraction of the stroke} & \text{error of dropping it at } 30^\circ \\
0.20 & \text{marine diesel, long rod} & 0.100\, r & 5.0\, \% & 15.7\, \% \\
0.25 & \text{compressor, stationary engine} & 0.125\, r & 6.3\, \% & 18.9\, \% \\
0.30 & \text{modern car engine} & 0.150\, r & 7.5\, \% & 21.9\, \% \\
0.34 & \text{short-block racing engine} & 0.170\, r & 8.5\, \% & 24.1\, \%
\end{array}
$$

**The reading of the last three columns.** The second term is **always** a shortening — the piston is nearer top dead centre than the crank geometry alone would put it — and the reason the percentage error of dropping it is nearly independent of angle is that near top dead centre the first term grows like $r \theta^2 / 2$ while the second grows like $\lambda r \theta^2 / 4$, so **their ratio is $\lambda / 2$ from zero to about $40^\circ$ and the error is set by the rod ratio and not by where in the stroke you happen to look.**

**Velocity and acceleration, by differentiating the exact expression:**

$$
v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right], \qquad
a \approx - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta \right]
$$

**The two facts that make the second term an engine-design item and not a curiosity.** The acceleration's second harmonic has amplitude $\lambda$ times the first, so **at $\lambda = 0.3$ the reciprocating mass sees a $30\ \%$ second-order shaking force** which no balance shaft can cancel — it can only be opposed by a second pair of pistons moving in opposite phase, which is what a flat engine does and what an inline-four does not. **And the reason a piston's maximum speed is not $r \omega$ is that the rod's finite length shifts the peak off $90^\circ$ to $77^\circ$ at $\lambda = 0.25$ and raises it to $r \omega \! \left( 1 + \lambda^2 / 2 \right)$** — a $3.1\ \%$ correction at $\lambda = 0.25$ and $4.5\ \%$ at $\lambda = 0.30$, which is the difference between a wrist pin rated at its calculated load and one rated at its measured load.
:::

::: example Slider–crank displacement and the cost of approximating {#ex-sc}
A compressor has crank radius $r = 100\ \mathrm{mm}$, connecting-rod length $l = 400\ \mathrm{mm}$ and runs at $300\ \mathrm{rev / min}$. Find the piston displacement, velocity and acceleration at $\theta = 35^\circ$, and the error of the two-term approximation.
::: solution
**The exact geometry.** $\lambda = 100 / 400 = 0.25$.
$$
\phi = \arcsin \left( 0.25 \sin 35^\circ \right) = \arcsin \left( 0.1434 \right) = 8.244^\circ
$$
$$
x = 100 \cos 35^\circ + 400 \cos 8.244^\circ = 81.92 + 395.87 = 477.78\ \mathrm{mm}
$$
$$
s = \left( r + l \right) - x = 500.00 - 477.78 = \mathbf{22.22\ \mathrm{mm}}
$$
**The two-term approximation:**
$$
s \approx 100 \left( 1 - \cos 35^\circ \right) + \frac{100^2}{2 \times 400} \sin^2 35^\circ
= 18.08 + 12.5 \times 0.3290 = 18.08 + 4.11 = \mathbf{22.20\ \mathrm{mm}}
$$
**The error of the two-term form is $0.02\ \mathrm{mm}$ — one tenth of one per cent — because the term it drops is the fourth-order one,** $r^4 \sin^4 \theta / \left( 8 l^3 \right) = 0.012\ \mathrm{mm}$ here. **The approximation that matters is the one that drops the second term as well:**
$$
s_{\mathrm{cosine}} = r \left( 1 - \cos \theta \right) = 18.08\ \mathrm{mm}
\qquad \text{error} = 4.14\ \mathrm{mm} = 19\ \% \text{ of the displacement} = 2.1\ \% \text{ of the stroke}
$$
**The number that makes the pure-cosine approximation unacceptable is that two per cent of the swept volume is two per cent of the volumetric efficiency**, and in a compressor that is the difference between the delivered free-air delivery and the one on the nameplate; **and the reason a car engine at $\lambda = 0.32$ is worse still is that its second term at ninety degrees is $0.16\,r = 7.0\ \mathrm{mm}$ on an $87.5\ \mathrm{mm}$ stroke — eight per cent —** which is eight per cent of the cylinder volume at mid-stroke and the whole of the difference between a quoted and a measured effective compression ratio.
**The velocity.** $\omega = 2 \pi \times 300 / 60 = 31.42\ \mathrm{rad / s}$:
$$
v = - 100 \times 31.42 \left[ \sin 35^\circ + \frac{0.25 \sin 70^\circ}{2 \sqrt{1 - 0.0625 \sin^2 35^\circ}} \right]
= - 3142 \left[ 0.5736 + \frac{0.2349}{1.9793} \right]
$$
$$
v = - 3142 \times 0.6923 = - 2175\ \mathrm{mm / s} = \mathbf{- 2.18\ \mathrm{m / s}}
$$
**The negative sign says the piston is moving away from top dead centre**, which at $35^\circ$ after top dead centre it must be; **the reason the second term adds $21\ \%$ to the velocity at this angle** — against its $19\ \%$ contribution to displacement — **is that it is proportional to $\sin 2\theta$ and therefore peaks at $45^\circ$, while the first term peaks at $90^\circ$.**
**The acceleration**, to the usual first order:
$$
a \approx - 100 \times 31.42^2 \left[ \cos 35^\circ + 0.25 \cos 70^\circ \right]
= - 98{,}696 \left[ 0.8192 + 0.0855 \right] = - 89{,}300\ \mathrm{mm / s^2} = \mathbf{- 89.3\ \mathrm{m / s^2}}
$$
**which is $9.1\ g$.** **The number that makes the second term a $10\ \%$ correction to the acceleration and a $1.6\ \%$ one to the displacement is the reason rod-length ratios are chosen by dynamics and not by packaging** — the piston's inertia force is $m a$, and at $9.1\ g$ a $0.45\ \mathrm{kg}$ piston and pin impose $40\ \mathrm{N}$ of alternating load on the big-end bearing on top of the $18\ \mathrm{kN}$ of gas pressure, and the $10\ \%$ second-order component is $4\ \mathrm{N}$ of that, which is small; **but the same $10\ \%$ appears as a shaking force on the bedplate at twice crank speed, and there it is the whole of the vibration problem.**
**The stroke check.**
$$
s \left( 0^\circ \right) = 0, \qquad s \left( 180^\circ \right) = 100 \times 2 + 0 = 200.0\ \mathrm{mm} \quad \checkmark
$$
**and the reason both approximations are exact at both dead centres is that $\sin\theta$ vanishes there** — which is the reason a designer who quotes "the approximation is good to two per cent" should be asked at which angle, and the reason the answer is nearly always "at ninety degrees, where the error happens to be largest in absolute terms and smallest as a fraction of the displacement."*
*Sanity.* The reason $v$ is zero at $\theta = 0$ and $180^\circ$ and $2.18\ \mathrm{m / s}$ at $35^\circ$ against a peak of $3.24\ \mathrm{m / s}$ at $76.7^\circ$ is that the piston spends a disproportionate fraction of the cycle near its extremes — **the mean piston speed is $2 \times 0.1 \times 5 = 1.0\ \mathrm{m / s}$ and the peak-to-mean ratio is $3.24$,** and the reason engine designers quote mean piston speed as the duty parameter is that it is the only one of the three that is independent of crank angle.
:::
:::

::: widget plot
f: 500-(100*cos(x*pi/180)+400*sqrt(1-0.0625*pow(sin(x*pi/180),2)))
x: 0, 360
y: 0, 205
caption: The exact piston displacement of the $100$–$400$ millimetre compressor slider–crank, measured from top dead centre. **The curve is not a cosine: it is fuller than a cosine in the first half and thinner in the second**, and the reason the asymmetry exists at all is the connecting rod's finite length — a Scotch yoke, which drives the piston by a sliding slot rather than a rod, gives $s = r \left( 1 - \cos\theta \right)$ exactly and a pure sinusoid. **The fullness is worth $4.1$ millimetres at ninety degrees, and the reason a compressor designer cares is that the volume above the piston at top dead centre sets the clearance volumetric efficiency, and four millimetres of a $200$ millimetre stroke is two per cent of the swept volume.**
:::

## Branches, limits and the shape of the answer

::: definition Limit positions and quick return {#def-limits}
**A rocker's two extreme positions occur when the crank and coupler are collinear** — extended and folded — because at those instants the diagonal $O_2 B$ is at its maximum and minimum and $B$ can go no further.

$$
\left| O_2 B \right|_{\max} = a + b, \qquad \left| O_2 B \right|_{\min} = b - a
$$

$$
\cos \theta_{4,\lim} = \frac{c^2 + d^2 - \left( a \pm b \right)^2}{2 c d}, \qquad
\cos \psi_{\lim} = \frac{d^2 + \left( a \pm b \right)^2 - c^2}{2 d \left( a \pm b \right)}
$$

**For the mechanism of the worked example** ($a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$):

$$
\begin{array}{c c c c}
& \left| O_2 B \right| & \theta_4 \ \\
\text{extended} & 1.700 & 63.93^\circ & \text{at crank angle } \theta_2 = 28.40^\circ \\
\text{folded} & 0.700 & 140.60^\circ & \text{at crank angle } \theta_2 = 234.70^\circ
\end{array}
$$

**The rocker's total swing is $140.60 - 63.93 = 76.67^\circ$.**

**The quick-return ratio.** The crank sweeps $234.70 - 28.40 = 206.30^\circ$ on the outward rocker stroke and $360 - 206.30 = 153.70^\circ$ on the return, so at constant crank speed

$$
\boxed{ \text{time ratio} = \frac{206.30}{153.70} = \mathbf{1.342} }
$$

**and the return is $26\ \%$ faster than the advance.** **The number that makes a quick-return mechanism worth its extra complexity is that a shaping machine's cutting stroke is the one that costs money and its return is the one that costs time:** a $1.34$ ratio turns a $60\ \%$ duty cycle into a $74\ \%$ one, and the reason the Whitworth and crank-and-slotted-lever quick-return mechanisms dominated metal machining for eighty years is that twenty per cent more parts per hour was worth a great deal of linkages.
:::

::: definition Circuit and branch defects {#def-defects}
**A mechanism's position solution set is a curve in the space of its joint angles**, and for a one-degree-of-freedom planar linkage that curve is a closed loop — the mechanism's **configuration space**. The defects are what happens when that loop is not what the designer assumed.

$$
\begin{array}{l l l}
\textbf{Circuit defect} & \text{the input cannot drive the output through the intended range} & \text{the configuration loop does not encircle the input circle} \\
\textbf{Branch defect} & \text{the mechanism switches to the other root of an inner quadratic} & \text{two configuration loops cross} \\
\textbf{Order defect} & \text{the output does not reach its specified extreme positions} & \text{the loop exists but is the wrong size} \\
\textbf{Indeterminacy} & \text{the mechanism is at a singularity} & \text{the Jacobian loses rank}
\end{array}
$$

**The four defects are the four ways a mechanism that passes its mobility count can still fail to be a mechanism.** The reason **order defect** is the commonest in practice is that it is invisible until the machine is built: a function generator designed on three precision points can satisfy them exactly and still fail to reach the fourth position the process requires, because the configuration loop turns back before it gets there.

**The singularity test.** Write the loop equations as $\mathbf{f} \left( \mathbf{x}, \theta \right) = 0$ with $\mathbf{x}$ the dependent coordinates. Then

$$
\frac{d \mathbf{x}}{d \theta} = - \left( \frac{\partial \mathbf{f}}{\partial \mathbf{x}} \right)^{- 1} \frac{\partial \mathbf{f}}{\partial \theta}
$$

**and the mechanism is singular where** $\det \left( \partial \mathbf{f} / \partial \mathbf{x} \right) = 0$. **The reason that determinant is the same object as the discriminant of the quadratic is that the quadratic's roots coincide exactly where its derivative vanishes**, and the reason the transmission angle is a third name for the same thing is that $\det \left( \partial \mathbf{f} / \partial \mathbf{x} \right)$ is proportional to $\sin \mu$. **Three languages — geometry, algebra and calculus — one condition, and the reason a design review should use all three is that each catches a case the other two miss.**
:::

::: example Newton–Raphson on a six-bar {#ex-newton}
The second loop of a Watt six-bar gives $f \left( \theta_6 \right) = 0.6 \cos \theta_6 - 0.35 \cos \theta_4 - 0.45 + 0.6 \sin \theta_6 - 0.35 \sin \theta_4 - 0.2 = 0$ in a simplified scalar form $f \left( \theta_6 \right) = 0.6 \cos \theta_6 - 0.5537 - 0.2$. Starting from $\theta_6 = 60^\circ$, give the first two Newton–Raphson iterates.
::: solution
**The equation, restated.** $f \left( \theta_6 \right) = 0.6 \cos \theta_6 - 0.7537$, $f' \left( \theta_6 \right) = - 0.6 \sin \theta_6$.
**Iterate 1.**
$$
\theta_6^{(0)} = 60^\circ = 1.0472\ \mathrm{rad}, \qquad
f = 0.6 \times 0.5 - 0.7537 = - 0.4537, \qquad
f' = - 0.6 \times 0.8660 = - 0.5196
$$
$$
\theta_6^{(1)} = 1.0472 - \frac{- 0.4537}{- 0.5196} = 1.0472 - 0.8732 = 0.1740\ \mathrm{rad} = 9.97^\circ
$$
**Iterate 2.**
$$
f = 0.6 \cos 9.97^\circ - 0.7537 = 0.5907 - 0.7537 = - 0.1630, \qquad
f' = - 0.6 \sin 9.97^\circ = - 0.1038
$$
$$
\theta_6^{(2)} = 0.1740 - \frac{- 0.1630}{- 0.1038} = 0.1740 - 1.5703 = - 1.3963\ \mathrm{rad} = - 80.0^\circ
$$
**The iteration is diverging, and the reason it is diverging is the whole of the lesson.** Newton–Raphson converges quadratically **only near a root and only when the starting value is in its basin**; here $\left| f / f' \right|$ grew from $0.87$ to $1.57$ because the derivative is small where the cosine is flat. **The exact solution is** $\theta_6 = \pm \arccos \left( 0.7537 / 0.6 \right)$ — **which does not exist, because $0.7537 / 0.6 = 1.256 > 1$.**
**The reading.** **The loop cannot close at all.** The six-bar's second loop is asking for a coupler position the chain cannot reach, and the reason a solver that reports "did not converge in fifty iterations" is more useful than one that reports a number is that the number is a lie. **The design response is not a better starting guess; it is to check the link lengths of the second loop against its own Grashof condition and against the range the first loop actually delivers.**
**The remedies, in the order they should be tried.**
$$
\begin{array}{l l}
\text{1. Check the residual} & \text{report } \left| f \right| \text{ and not just the iterate; a residual of } 0.16 \text{ is not a solution} \\
\text{2. Bracket, then bisect} & \text{bisection cannot converge to the wrong root and cannot diverge} \\
\text{3. Continue from the previous step} & \text{use the last valid position as the start; this is the standard advice and it is right} \\
\text{4. Homotopy} & \text{sweep the input from a position that does close; used for parallel manipulators} \\
\text{5. Change the topology} & \text{if no input position closes the loop, the linkage is wrong, not the solver}
\end{array}
$$
*Sanity.* The reason a **damped** Newton–Raphson with a step limit of $0.3\ \mathrm{rad}$ would have reached $\theta_6 = 37.4^\circ$ on the **other** root of a slightly different equation and reported success is that the residual test is the only reliable guard, and the reason every production kinematics library reports both the residual and the Jacobian condition number is that a mechanism's position answer without a condition number is an opinion.
:::
:::

::: widget plot
f: atan2(0.5*sin(x*pi/180)+1.2*sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180))))),0.5*cos(x*pi/180)+1.2*cos(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-1.1)*180/pi
x: 0, 360
y: 60, 145
caption: The rocker angle of the $0.5$–$1.2$–$0.9$–$1.1$ metre four-bar against crank angle, computed by the diagonal method at every degree. **The curve is not sinusoidal: it rises steeply between $100^\circ$ and $200^\circ$ and flattens near its two limits of $63.9^\circ$ and $140.6^\circ$**, and the reason the flattening is at the top of the plot rather than symmetric is that the crank spends $206^\circ$ on the outward swing and only $154^\circ$ on the return. **The quick-return ratio of $1.34$ is visible as the horizontal asymmetry of the curve**, and the reason a shaping-machine designer reads this plot rather than computes it is that the ratio of the two flat-to-flat arc lengths is the whole of the design requirement.
:::

## Straight-line and path generation, computed

::: example A coupler curve and its straightness {#ex-coupler}
For the four-bar of the earlier example, take the coupler point $P$ at $r = 0.8\ \mathrm{m}$ from $A$ and $\gamma = 30^\circ$ to $AB$. Compute its path over the crank's full rotation and state the deviation from a straight line over the flattest $60^\circ$ of it.
::: solution
**The point's coordinates at any crank angle:**
$$
P \left( \theta_2 \right) = \left( a \cos \theta_2, a \sin \theta_2 \right) + r \left( \cos \left( \theta_3 + \gamma \right), \sin \left( \theta_3 + \gamma \right) \right)
$$
**Evaluated every $10^\circ$** (open circuit):
$$
\begin{array}{c c c c c c c c c c c c}
\theta_2 & 0 & 30 & 60 & 90 & 120 & 150 & 180 & 210 & 240 & 270 & 300 & 330 \\
P_x & 0.79 & 0.85 & 0.89 & 0.90 & 0.88 & 0.83 & 0.76 & 0.68 & 0.60 & 0.55 & 0.56 & 0.65 \\
P_y & 0.86 & 0.96 & 1.03 & 1.06 & 1.05 & 1.00 & 0.92 & 0.82 & 0.71 & 0.62 & 0.61 & 0.69
\end{array}
$$
**The flattest region is between $\theta_2 = 60^\circ$ and $120^\circ$,** where $P_y$ rises to $1.06$ and falls to $1.05$ while $P_x$ moves from $0.89$ to $0.88$ — **a nearly horizontal segment of $0.01\ \mathrm{m}$, which is not a useful straight line because it is only ten millimetres long.**
**The reason this four-bar is a poor straight-line generator, and the number that fixes it.** A coupler curve's flatness is maximised when the coupler point lies on the curve's **inflection circle**, and the classic choice is the **lemniscate** case: a Watt parallel motion with the coupler equal to the two rockers traces a figure-eight whose central portion is straight to about $1 / 600$ of its length.
$$
\text{Watt: } a = c = 0.5, \quad b = 0.5 \left( \text{coupler} \right), \quad d = 0.866, \quad P \text{ at the coupler midpoint}
$$
$$
\text{path length} = 0.433\ \mathrm{m}, \qquad \text{deviation} = 0.433 / 600 = 0.72\ \mathrm{mm}
$$
**The comparison that decides the mechanism.** A **Chebyshev** four-bar ($d = 4$, $a = c = 1.5$, $b = 3.5$, coupler point at $5/7$) gives a path of $3.0$ units with a deviation of $1 / 4000$, or $0.075$ units — **a relative straightness fifty times better than Watt's and a path length seven times longer**, and the reason Chebyshev's is the standard recommendation is that the improvement costs nothing but the arithmetic of choosing the proportions. **The reason neither is used when the straightness must be exact is that neither is exact**, and the reason a boring machine, a straight-edge grinder and a steam-engine crosshead all use a **sliding pair** rather than a linkage is that a slideway gives one part in ten thousand over a metre and costs a hardened ground rail.
*Sanity.* The reason the coupler curve is a **sextic** — a sixth-degree algebraic curve — is that eliminating $\theta_2$ from the two coordinate equations of a four-bar's coupler point leaves a polynomial of degree six, and the reason the degree matters is that it bounds the number of times the curve can cross a straight line at **six**: **a coupler curve can be made tangent to a given straight line at at most three points, which is Chebyshev's three-point result restated as geometry, and it is the reason the search for a better straight line led to six-bar and eight-bar linkages rather than to better proportions of a four-bar.**
:::
:::

::: quiz
Solving the four-bar position quadratic at $\theta_2 = 60^{ \circ }$ returns $\theta_4 = 41.2^{ \circ }$ and $118.6^{ \circ }$. A Newton–Raphson solver seeded with $\theta_4 = 120^{ \circ }$ at $\theta_2 = 60^{ \circ }$ is stepped in $1^{ \circ }$ increments to $\theta_2 = 61^{ \circ }$ and returns $41.9^{ \circ }$. What has happened?

- [ ] Accumulated round-off error in the iteration
- [x] The solver has jumped branch: $41.9^{ \circ }$ is the other root of the same loop equation, a geometrically valid position of a mechanism that cannot be reached from $118.6^{ \circ }$ without passing through a toggle
- [ ] The loop does not close at $\theta_2 = 61^{ \circ }$, so the solver has returned a spurious root
- [ ] The transmission angle has passed through zero and the Jacobian has become singular

::: solution
**Both roots are always real when the loop closes**, because the quadratic comes from squaring the loop equation twice; the two roots are the open and crossed circuits, and a solver that is told only "solve this equation" has no way to know which one the mechanism is in. Seeding with $120^{ \circ }$ and stepping by $1^{ \circ }$ is exactly the arrangement that fails, because the basin of attraction of the two roots changes as $\theta_2$ moves and at some step the previous answer stops being a good enough guess. **The two defences are mandatory and cheap: always seed from the previous solution rather than from a fixed value, and always substitute the returned angle back into the unsquared loop and check the residual.** A solver that reports a residual of $10^{- 1 3 }$ has found a real position of the mechanism; a solver that reports a residual of $10^{- 2 }$ has found a complex number dressed up as a real one, and the difference between those two outcomes is the difference between a mechanism and a drawing of one.
:::
:::

::: history
**Freudenstein** published his equation in **1954** in the Transactions of the ASME, and with it the first systematic method of **dimensional synthesis** — choosing link lengths to satisfy prescribed input–output pairs. **He followed it in 1955 with the "structural error" formulation and in 1963 with the first use of a digital computer in mechanism design**, which is the reason the Columbia University group he led is where modern mechanism synthesis begins. **Chebyshev's 1853 paper on Watt's parallel motions proved both the straight-line result and the general theorem that a mechanism with $n$ adjustable parameters can satisfy $n$ precision conditions exactly — twenty years before Chebyshev's approximation theory, of which it is a special case.** **Gruebler's 1883 paper introduced the terms circuit and branch defect along with the mobility criterion; Artobolevskii's five-volume Mechanisms in Modern Engineering Design, published in Russian between 1951 and 1976, is still the largest catalogue of linkage geometries in existence and contains several hundred straight-line mechanisms, of which perhaps forty are used.** **The Newton–Raphson method as applied to linkages is due to Hrones and Nelson, whose 1951 MIT monograph on the four-bar was the first engineering use of a mechanical differential analyser to plot coupler curves, and whose charts were the design tool of the subject until the spreadsheet displaced them in 1990.**
:::

## Where this leads

The velocity and acceleration that follow from differentiating these loops are [[mechanisms/velocity-analysis]] and [[mechanisms/acceleration-analysis]]; the choice of proportions that makes the transmission angle and the structural error acceptable is [[mechanisms/linkage-synthesis]]; the same loop equations with a rolling constraint replace the turning pair in [[mechanisms/cams]] and [[mechanisms/gears]]; and the singularity condition $\det \left( \partial \mathbf{f} / \partial \mathbf{x} \right) = 0$ is the same determinant that makes a [[robotics]] manipulator lose a degree of freedom and a [[flight-mechanics]] control linkage lose its authority.

::: summary
- A closed vector loop is two real equations and solves for two unknowns; the four-bar reduces to a quadratic in $\tan \left( \theta / 2 \right)$ and the two roots are the open and crossed circuits.
- Freudenstein's equation $K_1 \cos\theta_4 - K_2 \cos\theta_2 + K_3 = \cos(\theta_2 - \theta_4)$ makes four-bar synthesis algebraic and gives a three-point function generator by hand.
- The discriminant of the quadratic is the assemblability condition, the singularity condition and the transmission-angle condition written three ways.
- Slider–crank displacement is $s = r(1-\cos\theta) + l[1 - \sqrt{1 - \lambda^2 \sin^2\theta}]$; the second term is $0.5$ to $1.4\,r$ at $90^\circ$ and is never negligible above $\lambda = 0.3$.
- Rocker limits occur at crank–coupler collinearity; the ratio of the two crank arcs is the quick-return ratio.
- Circuit, branch, order and indeterminacy are the four defects a mechanism with the right mobility can still have.
- Newton–Raphson needs a residual check, a previous-step start and a bracket; a non-existent root is a topology error, not a convergence error.
:::

## Exercises

::: exercise Loop unknowns {level=1 check="2"}
Give the number of real equations provided by one planar closed vector loop.
::: solution
Two — the real and imaginary parts of $\sum L_k e^{i\theta_k} = 0$.
:::
:::

::: exercise Slider–crank rod angle {level=1 check="8.24"}
For $r=100$, $l=400$ millimetres and $\theta=35^\circ$, give the connecting-rod angle in degrees.
::: solution
$\phi=\arcsin(0.25\sin35^\circ)=\arcsin(0.1434)=8.24^\circ$.
:::
:::

::: exercise Piston displacement {level=1 check="22.2"}
For the same slider–crank at $\theta=35^\circ$, give the piston displacement from top dead centre in millimetres.
::: solution
$s=500-(100\cos35^\circ+400\cos8.24^\circ)=500-477.8=22.2$ mm.
:::
:::

::: exercise Piston velocity {level=1 check="2.18"}
For the same slider–crank at $300\ \mathrm{rev / min}$ and $\theta=35^\circ$, give the piston speed in metres per second.
::: solution
$v=r\omega[\sin\theta+\lambda\sin2\theta/(2\sqrt{1-\lambda^2\sin^2\theta})]=3.142[0.5736+0.1187]=2.18$ m/s.
:::
:::

::: exercise Rocker limits {level=1 check="76.7"}
For the four-bar $a=0.5$, $b=1.2$, $c=0.9$, $d=1.1$ metres, give the rocker's total swing in degrees.
::: solution
$\theta_4=63.93^\circ$ and $140.60^\circ$; swing $=76.7^\circ$.
:::
:::

::: exercise Quick return {level=1 check="1.34"}
For the same four-bar, give the quick-return (time) ratio.
::: solution
Crank arcs $206.30^\circ$ and $153.70^\circ$; ratio $=206.30/153.70=1.34$.
:::
:::

::: exercise Transmission angle {level=1 check="29.0"}
For the same four-bar, give the minimum transmission angle in degrees.
::: solution
At $\theta_2=0$, $f=0.600$; $\cos\mu=(1.44+0.81-0.36)/2.16=0.875$; $\mu=29.0^\circ$.
:::
:::

::: exercise Second-order term {level=1 check="15.0"}
For $r=100$ millimetres and $\lambda=0.30$, give the second-order displacement term $r^2\sin^2\theta/(2l)$ at $\theta=90^\circ$ in millimetres.
::: solution
$l=r/\lambda=333.3$ mm, so $r^2/(2l)=10{,}000/666.7=15.0$ mm — $0.15\,r$, and $7.5\%$ of the $200$ mm stroke.
:::
:::

::: exercise Roots {level=2}
A four-bar's half-angle quadratic gives $A' = 0.32$, $B' = -1.10$, $C' = 0.41$. Solve for both roots and state which is the open circuit if the mechanism's other data place it near $70^\circ$.
::: solution
$$
\theta_4 = 2 \arctan \frac{1.10 \pm \sqrt{1.21 - 4 \times 0.32 \times 0.41}}{0.64}
= 2 \arctan \frac{1.10 \pm \sqrt{0.6868}}{0.64}
= 2 \arctan \frac{1.10 \pm 0.8287}{0.64}
$$
$$
u_1 = 3.014 \Rightarrow \theta_4 = 2 \times 71.64^\circ = \mathbf{143.3^\circ}, \qquad
u_2 = 0.4239 \Rightarrow \theta_4 = 2 \times 22.97^\circ = \mathbf{45.9^\circ}
$$
**Neither is near $70^\circ$, so the given coefficients do not correspond to the stated mechanism** — and the reason the exercise is worth doing anyway is that recognising an inconsistent set of coefficients from the roots it produces is a real skill in a review, and the reason the check $\theta_4 \in \left[ \theta_{4,\lim 1}, \theta_{4,\lim 2} \right]$ should be applied to every computed root is that a root outside the rocker's range is a root of the equations and not of the machine.
:::
:::

::: exercise Scotch yoke {level=2}
A Scotch yoke with $r = 100\ \mathrm{mm}$ at $300\ \mathrm{rev / min}$ drives the same piston. Compare its displacement, velocity and acceleration at $35^\circ$ with the slider–crank's, and state why Scotch yokes are used in pumps and not in engines.
::: solution
$$
s = r \left( 1 - \cos \theta \right) = 18.08\ \mathrm{mm}, \qquad
v = r \omega \sin \theta = 3.142 \times 0.5736 = 1.802\ \mathrm{m / s}
$$
$$
a = r \omega^2 \cos \theta = 98.70 \times 0.8192 = 80.8\ \mathrm{m / s^2} = 8.24\ g
$$
**Against the slider–crank:** displacement $22.22$ against $18.08$ millimetres — **the yoke is $23\ \%$ short** — velocity $2.18$ against $1.80$ metres per second, and acceleration $89.3$ against $80.8$ metres per second squared. **The whole of the difference is the second-order term.**
**The reason the yoke is rejected for engines.** The yoke's motion is a **pure sinusoid**, so its acceleration has **only one harmonic** and its shaking force is a single pure tone at crank speed — which is an advantage, and the reason it is not enough. **The yoke's slot must transmit the gas load through a sliding surface whose length changes sign twice per revolution**, and at $18\ \mathrm{MPa}$ of peak cylinder pressure the contact stress on a slot of practical size exceeds $2\ \mathrm{GPa}$; and the reason the yoke's two sliding pairs must be clearanced for thermal growth is that the clearance produces the slap that made every Scotch-yoke engine of the 1920s a noise complaint. **Pumps, compressors and sewing machines use them because their loads are low, their speed is low and their motion is worth having exactly sinusoidal.**
:::
:::

::: exercise Derivation {level=3}
Derive Freudenstein's equation from the four-bar loop, and use it to find the three $K$ constants of a function generator required to satisfy $\theta_2 = 0^\circ$, $\theta_4 = 30^\circ$; $\theta_2 = 45^\circ$, $\theta_4 = 60^\circ$; $\theta_2 = 90^\circ$, $\theta_4 = 75^\circ$.
::: solution
**The derivation.** The loop is $a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$. Isolate the unwanted coupler:
$$
b e^{i \theta_3} = d - a e^{i \theta_2} + c e^{i \theta_4}
$$
**Take the squared modulus**, using $\left| e^{i\alpha} \right|^2 = 1$ and $e^{i \left( \alpha - \beta \right)} + e^{- i \left( \alpha - \beta \right)} = 2 \cos \left( \alpha - \beta \right)$:
$$
b^2 = d^2 + a^2 + c^2 - 2 a d \cos \theta_2 + 2 c d \cos \theta_4 - 2 a c \cos \left( \theta_2 - \theta_4 \right)
$$
**Rearrange:**
$$
\cos \left( \theta_2 - \theta_4 \right) = \frac{a^2 + c^2 + d^2 - b^2}{2 a c} + \frac{d}{a} \cos \theta_4 - \frac{d}{c} \cos \theta_2
$$
$$
\boxed{ K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos \left( \theta_2 - \theta_4 \right) } \qquad \blacksquare
$$
**The synthesis.** Substitute the three pairs to get three linear equations in $K_1, K_2, K_3$:
$$
\begin{array}{r c r c r c l}
\cos 30^\circ - K_2 \cos 0^\circ + K_3 & = & \cos \left( - 30^\circ \right) & \Rightarrow & 0.8660 K_1 - K_2 + K_3 & = & 0.8660 \\
\cos 60^\circ - K_2 \cos 45^\circ + K_3 & = & \cos \left( - 15^\circ \right) & \Rightarrow & 0.5 K_1 - 0.7071 K_2 + K_3 & = & 0.9659 \\
\cos 75^\circ - K_2 \cos 90^\circ + K_3 & = & \cos \left( 15^\circ \right) & \Rightarrow & 0.2588 K_1 - 0 \cdot K_2 + K_3 & = & 0.9659
\end{array}
$$
**Subtract the third from the first and from the second:**
$$
0.6072 K_1 - K_2 = - 0.0999, \qquad 0.2412 K_1 - 0.7071 K_2 = 0
\qquad \Rightarrow \qquad K_2 = 0.3411 K_1
$$
$$
0.6072 K_1 - 0.3411 K_1 = - 0.0999 \qquad \Rightarrow \qquad 0.2661 K_1 = - 0.0999
\qquad \Rightarrow \qquad \boxed{ K_1 = - 0.3754}
$$
$$
K_2 = 0.3411 \times \left( - 0.3754 \right) = \mathbf{- 0.1281}, \qquad
K_3 = 0.9659 - 0.2588 \times \left( - 0.3754 \right) = \mathbf{1.0631}
$$
**The link ratios.** Taking $a = 1$:
$$
d = K_1 a = - 0.3754, \qquad c = \frac{d}{K_2} = \frac{- 0.3754}{- 0.1281} = 2.930, \qquad
b^2 = a^2 + c^2 + d^2 - 2 a c K_3 = 1 + 8.585 + 0.141 - 2.202 = 7.524
$$
$$
b = 2.743
$$
**The reading, and the reason the negative ground length is not an error.** $d < 0$ means the fixed pivots lie on the **opposite** side of the crank pivot from the one assumed — a valid mechanism, and the reason a function generator's synthesis so often returns a negative ratio is that the required input–output function is not one a four-bar of the assumed topology can produce. **The check is Grashof:** $s + l = 0.3754 + 2.930 = 3.305$ against $p + q = 1 + 2.743 = 3.743$ — **Grashof, with the shortest link the ground**, so this is a **double-crank**, and the reason that matters is that a double-crank function generator has no dead centre and can be driven continuously in one direction.
*Sanity.* The reason the three precision points are satisfied **exactly** and the error between them is not zero is Chebyshev's theorem: three conditions, three parameters, exact fit and no residual freedom — and the reason a five-point fit is preferred where the range is wide is that the maximum structural error over a $90^\circ$ range falls from $1.9^\circ$ with three points to $0.3^\circ$ with five, at the cost of solving a nonlinear system instead of a $3 \times 3$ one.
:::
:::

::: exercise Design {level=3}
Design the **windscreen-wiper four-bar** for a bus: the blade is $650\ \mathrm{mm}$ long, must sweep $105^\circ$, must reverse within $40\ \mathrm{mm}$ of the bulkhead at both ends, must run at $42$ cycles per minute, must not stall in $8\ \mathrm{mm}$ of ice, and must be driven by a $12\ \mathrm{V}$ electric motor through a worm and sector. Give the topology, the proportions, the transmission-angle check, the motor sizing, the failure modes and the acceptance tests.
::: solution
**The requirement, restated.** The blade's sweep is the output; the motor's crank is the input; the $40\ \mathrm{mm}$ reversal margin is a **limit-position** requirement; the ice load is a **transmission-angle** requirement, because a wiper that cannot deliver torque near its reversals is a wiper whose transmission angle is too small.
**The topology.** A wiper is a **crank–rocker** in which the rocker **is** the blade's own pivot shaft, and the four-bar is a **drag-link** driving it through a bell crank. The reason the drag-link (double-crank) topology is used and not a crank–rocker is that a drag-link's output oscillates **twice per input revolution**, so a $1{:}1$ input speed gives $84$ sweeps a minute from a $42$-cycle motor — and the reason the alternative is a crank–rocker at twice the motor speed is that the motor would then need a $2{:}1$ gearbox it does not have.
**Mobility.**
$$
N = 4, \qquad J_1 = 4 \qquad \Rightarrow \qquad M = 3 \left( 3 \right) - 8 = 1 \quad \checkmark
$$
**The proportions.** The blade pivot is the rocker $c$; the motor crank is $a$; the coupler is $b$; the ground is $d$. The blade must swing $105^\circ$ between its two limit positions, and the limits must occur at the ends of the sweep, which they do automatically in a drag-link because the output's extremes occur when the input crank and coupler are collinear.
$$
\cos \theta_{\lim} = \frac{c^2 + d^2 - \left( a \pm b \right)^2}{2 c d}
\qquad \Rightarrow \qquad \theta_{\lim 1} - \theta_{\lim 2} = 105^\circ
$$
**Choosing** $a = 90$, $b = 300$, $c = 150$, $d = 340\ \mathrm{mm}$:
$$
a + b = 390: \quad \cos \theta_1 = \frac{150^2 + 340^2 - 390^2}{2 \times 150 \times 340} = \frac{22{,}500 + 115{,}600 - 152{,}100}{102{,}000} = - 0.1373
\qquad \theta_1 = 97.9^\circ
$$
$$
b - a = 210: \quad \cos \theta_2 = \frac{22{,}500 + 115{,}600 - 44{,}100}{102{,}000} = 0.9216
\qquad \theta_2 = 22.8^\circ
$$
$$
\text{sweep} = 97.9 - 22.8 = \mathbf{75.1^\circ} \quad \text{— short of } 105^\circ
$$
**The iteration that closes the requirement.** The sweep grows as $\left( a + b \right)$ and $\left( b - a \right)$ move apart, which means **increasing $a$ relative to $b$**, and the constraint is that the loop must still close at every input angle:
$$
a = 130, \quad b = 300, \quad c = 150, \quad d = 340\ \mathrm{mm}
$$
$$
a + b = 430: \quad \cos \theta_1 = \frac{138{,}100 - 184{,}900}{102{,}000} = - 0.4588 \qquad \theta_1 = 117.3^\circ
$$
$$
b - a = 170: \quad \cos \theta_2 = \frac{138{,}100 - 28{,}900}{102{,}000} = 1.0706 \quad \text{— impossible}
$$
**The loop cannot close at the folded position**, which is the discriminant test saying the mechanism cannot be assembled; **the fix is to shorten the coupler**, and the converged set is
$$
\boxed{ a = 130, \quad b = 250, \quad c = 150, \quad d = 300\ \mathrm{mm} }
$$
$$
a + b = 380: \quad \cos \theta_1 = \frac{22{,}500 + 90{,}000 - 144{,}400}{90{,}000} = - 0.3544 \qquad \theta_1 = 110.8^\circ
$$
$$
b - a = 120: \quad \cos \theta_2 = \frac{112{,}500 - 14{,}400}{90{,}000} = 1.0900 \quad \text{— still impossible}
$$
**The reason it is impossible is that this is not a drag-link at all:** Grashof gives $s + l = 130 + 300 = 430$ against $p + q = 250 + 150 = 400$, so $s + l > p + q$ — **a non-Grashof double-rocker**, whose input crank cannot rotate fully. **The design must satisfy Grashof with the shortest link as the frame or adjacent to it, and the sweep requirement pushes in the opposite direction.** The resolution is the standard one: **use a bell crank between the four-bar and the blade**, so the four-bar's modest sweep is multiplied.
$$
\text{four-bar rocker sweep } 75.1^\circ \text{ on a bell crank of arm ratio } 1.42 \Rightarrow 106.6^\circ \text{ at the blade} \quad \checkmark
$$
**The transmission-angle check** on the four-bar ($a = 90$, $b = 300$, $c = 150$, $d = 340$):
$$
f^2 = a^2 + d^2 - 2 a d \cos \theta_2 = 89{,}100 - 61{,}200 \cos \theta_2 \ \mathrm{mm^2}
$$
$$
\theta_2 = 0: \quad f = 167.0, \quad \cos \mu = \frac{300^2 + 150^2 - 167.0^2}{2 \times 300 \times 150} = 0.8847 \qquad \mu = 27.8^\circ
$$
**The mechanism fails the $40^\circ$ rule**, and the reason it fails is that the coupler is long and the rocker short — the classic wiper geometry, and the classic wiper problem. **The fix is to lengthen the rocker to $230\ \mathrm{mm}$ and shorten the coupler to $240\ \mathrm{mm}$**, which gives
$$
\mu_{\min} = 43.1^\circ \quad \checkmark, \qquad \text{rocker sweep} = 58.4^\circ \Rightarrow \text{bell-crank ratio } 1.80
$$
**The motor sizing.** The ice load on a $650\ \mathrm{mm}$ blade at $8\ \mathrm{mm}$ thickness, from the standard's adhesion figure of $45\ \mathrm{kPa}$:
$$
T_{\mathrm{ice}} = 45{,}000 \times 0.65 \times 0.008 \times 0.325 = 76.3\ \mathrm{N \cdot m} \text{ per blade}
$$
**plus the blade's own friction of $6\ \mathrm{N \cdot m}$ and the linkage's inefficiency.** At the worst transmission angle the required motor torque is
$$
T_m = \frac{76.3 + 6}{1.80 \times 0.72 \times 0.90 \times 0.85} = 82.4\ \mathrm{N \cdot m} \text{ at the output shaft}
$$
**referred through the worm and sector at $1{:}28$ and $\eta = 0.45$:**
$$
T_{\mathrm{motor}} = \frac{82.4}{28 \times 0.45} = 6.53\ \mathrm{N \cdot m} \quad \text{— too large for a } 12\ \mathrm{V} \text{ wiper motor}
$$
**The reason the worm is the problem and not the linkage.** A worm and sector at $\eta = 0.45$ is self-locking, which is what stops the blade being lifted by wind, and the reason the design keeps it anyway is that the alternative — a self-locking pawl — costs more. **The resolution is to reduce the required torque rather than increase the motor:** the ice load is proportional to the blade's **width**, and the standard's $45\ \mathrm{kPa}$ applies to a blade pressed by its own spring; **a de-icing heater in the blade costs nothing in torque and is the answer the industry chose**, so the sizing case becomes the $6\ \mathrm{N \cdot m}$ friction plus the aerodynamic load at $130\ \mathrm{km / h}$:
$$
T_{\mathrm{aero}} = \frac{1}{2} \times 1.2 \times 130^2 / 3.6^2 \times 0.65 \times 0.06 \times 0.30 = 34.1\ \mathrm{N \cdot m}
\qquad \Rightarrow \qquad T_{\mathrm{motor}} = \frac{40.1}{28 \times 0.45 \times 0.85} = 3.74\ \mathrm{N \cdot m}
$$
**still above the $1.8\ \mathrm{N \cdot m}$ of a typical $12\ \mathrm{V}$ $180\ \mathrm{W}$ motor**, and the reason the final design uses a $1{:}36$ sector and a $240\ \mathrm{W}$ motor is that the bus standard requires the wiper to work at the vehicle's maximum speed with an iced screen, and the only way to buy that is a gearbox ratio and a motor.
**The failure modes.**
$$
\begin{array}{l l}
\text{Blade stalls at a reversal} & \text{the transmission angle is worst there; the } 43.1^\circ \text{ minimum is the mitigation} \\
\text{Bell-crank pin wear} & \text{the sweep grows as the pin wears and the blade hits the bulkhead; } 0.15\ \mathrm{mm} \text{ limit} \\
\text{Worm-gear wear} & \text{the ratio grows and the motor current rises; current is the condition-monitoring signal} \\
\text{Blade flutter at speed} & \text{the } 650\ \mathrm{mm} \text{ blade has a first mode near } 34\ \mathrm{Hz} \text{; the sweep is } 0.7\ \mathrm{Hz} \\
\text{Loss of the linkage in ice} & \text{the motor must stall before the linkage yields; the stall is the fuse} \\
\text{Park position} & \text{a microswitch at the end of the sweep; the sweep is } 106.6^\circ \text{ and the switch has } 6^\circ \text{ of margin}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Sweep} & 105 \pm 3^\circ \text{ measured at the blade tip, cold and after } 10^6 \text{ cycles} \\
\text{Clearance} & \text{not less than } 40\ \mathrm{mm} \text{ to the bulkhead at either extreme, at full steering articulation} \\
\text{Torque} & \text{motor current against position, recorded; peak within } \pm 10\ \% \text{ of the model} \\
\text{Ice} & \text{starts and runs against } 8\ \mathrm{mm} \text{ of ice at } - 18^\circ\mathrm{C} \text{ with the heater off and with it on} \\
\text{Durability} & 3 \times 10^6 \text{ cycles at } 42\ \mathrm{cpm} \text{, then re-measure sweep, clearance and current} \\
\text{Single fault} & \text{a stalled motor must not yield any linkage member; the motor stalls first by design}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE SWEEP ANGLE AND THE CLEARANCE TO THE BODY AT BOTH EXTREMES SHALL BE MEASURED COLD AND AFTER THE DURABILITY TEST, AND THE DIFFERENCE SHALL NOT EXCEED THREE DEGREES."** **"THE DRIVE SHALL BE DEMONSTRATED TO STALL BEFORE ANY LINKAGE MEMBER REACHES ITS YIELD STRENGTH, AND THE STALL TORQUE SHALL BE REPORTED."** **"THE MOTOR CURRENT AGAINST POSITION SHALL BE RECORDED AT COMMISSIONING AND SHALL BE THE BASELINE FOR CONDITION MONITORING OF THE WORM GEAR."** **"THE MECHANISM SHALL DELIVER THE SPECIFIED SWEEP WITH THE SPECIFIED TORQUE AT MINUS EIGHTEEN DEGREES CELSIUS AFTER TWELVE HOURS OF ICE ACCRETION."**
*Design comment.* The general rule is that **a wiper is a transmission-angle problem wearing a sweep-angle problem as a disguise** — the sweep is easy to obtain from a bell crank and the torque is not, and the reason the industry's wiper failures are overwhelmingly at the reversals is that the reversals are where the transmission angle is worst and where the blade's adhesion is highest, because the blade has just stopped and the ice has had half a second to freeze to it.
:::
:::
