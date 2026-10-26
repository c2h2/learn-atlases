Velocity analysis is the interesting half of kinematics, but you cannot differentiate a mechanism you have not yet been able to **place**. Position analysis answers the question every linkage design review must settle before any force, motor or tolerance is discussed: **given the input, where is everything else?** For a slider–crank the answer contains a square root. For a four-bar it is a quadratic, and its two roots are the two ways the linkage can be assembled. For a six-bar it is a quadratic nested inside another, and for a general parallel manipulator such as the Stewart–Gough platform the forward position problem has up to forty solutions, which is why such machines are usually solved numerically.

This lesson covers the cases an engineer actually meets — **the vector loop, the quadratic, the choice of root, and the error you accept when you approximate** — and the fact that the hard part of position analysis is often not solving the equation but **choosing the right root of it, at every step, without ever switching.**

::: warning Five position errors that look like arithmetic
**Taking the wrong root.** Every closed four-bar loop gives a quadratic, and both roots are correct solutions of the equations; only one of them is your machine. The two roots are the **open** and **crossed** assembly modes (circuits), and the crossed one is a real, buildable linkage — just not the one on the drawing. A numerical solver should start each step from the previous solution so that it stays on one circuit. The two roots coincide at a limit position, and there the choice is not merely ambiguous: the solution can continue on either branch.

**Confusing circuit with branch.** A linkage's **circuit** is a set of configurations reachable without disassembly; within one circuit, a **branch** is a stretch of motion between two singular (limit) positions. A Grashof crank–rocker driven by its crank has two circuits and stays in the one it was assembled in. A linkage driven from a link that cannot rotate fully may reach a limit position and then go on along either branch. The corresponding design failures are called **circuit defects** and **branch defects**, and a synthesis method that only checks precision points can miss both.

**Dropping the second-order term.** The slider–crank's exact displacement is $s = r \left( 1 - \cos\theta \right) + l \left( 1 - \sqrt{1 - \lambda^2 \sin^2 \theta} \right)$, with $\lambda = r / l$. The "pure cosine" approximation $s \approx r(1 - \cos\theta)$ drops the second term entirely; at $\lambda = 0.25$ and $35^\circ$ it is wrong by $4.1\ \mathrm{mm}$ in a $200\ \mathrm{mm}$ stroke — $19\ \%$ of the displacement at that angle. Keeping the term $(r^2 / 2l) \sin^2\theta$ reduces the error to a few hundredths of a millimetre.

**Losing the transmission angle in the algebra.** A position solution that reports joint angles but not the transmission angle has reported the geometry and hidden the design. In the worked four-bar below the transmission angle falls to $29^\circ$ once a cycle; at that instant the coupler force needed for a given output torque is about twice what it would be at $90^\circ$. Plot $\mu \left( \theta \right)$ alongside the coordinates.

**Assuming the loop closes.** Loop equations can fail to have a real solution — the input has reached a position the rest of the chain cannot follow — and in a mechanism with a **redundant constraint** (a double parallelogram, a frame with two diagonals) the equations are consistent only for exact dimensions. A least-squares solver will still return an answer; it is the residual that tells you the loop did not close. Always report it.
:::

## The vector loop

::: definition Loop-closure equations {#def-loop}
**Write each link as a vector along its own axis, add them round a closed loop, and set the sum to zero.** In complex notation a link of length $L$ at angle $\theta$ is $L e^{i\theta} = L \left( \cos\theta + i \sin\theta \right)$, and a loop of $n$ links is

$$
\boxed{ \sum_{k = 1}^{n} L_k e^{i \theta_k} = 0 }
$$

**which is two real equations** — one for the real part, one for the imaginary — **and can therefore be solved for two unknowns.** A four-bar has four angles, of which one is the input and one (the ground's) is fixed; a slider–crank has an unknown angle and an unknown length. A loop with three unknowns needs a second input or a second loop.

$$
\begin{array}{l c c l l}
\text{Loop} & \text{Vectors} & \text{Unknowns} & \text{Equations} & \text{Character of the solution} \\
\text{Four-bar} & 4 & 2 & 2 & \text{quadratic — two circuits} \\
\text{Slider--crank, in-line} & 3 & 2 & 2 & \text{square root, two assembly modes} \\
\text{Slider--crank, offset} & 4 & 2 & 2 & \text{square root with an offset term} \\
\text{Five-bar} & 5 & 3 & 2 & \text{needs a second input} \\
\text{Watt six-bar} & 4 + 4 & 4 & 4 & \text{two quadratics in sequence} \\
\text{Stephenson six-bar (some inversions)} & 4 + 4 & 4 & 4 & \text{coupled; generally solved numerically}
\end{array}
$$

**The four-bar, written out.** With ground $d$ along the real axis, crank $a$ at $\theta_2$, coupler $b$ at $\theta_3$ and rocker $c$ at $\theta_4$:

$$
a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}
$$

**Eliminate $\theta_3$** by isolating the coupler term and taking the squared modulus — $\left| b e^{i\theta_3} \right|^2 = b^2$ whatever $\theta_3$ is:

$$
b^2 = a^2 + c^2 + d^2 - 2 a d \cos \theta_2 + 2 c d \cos \theta_4 - 2 a c \cos \left( \theta_2 - \theta_4 \right)
$$

**and dividing by $2ac$ gives Freudenstein's equation**, published in 1954–55:

$$
\boxed{ K_1 \cos \theta_4 - K_2 \cos \theta_2 + K_3 = \cos \left( \theta_2 - \theta_4 \right) }, \qquad
K_1 = \frac{d}{a}, \quad K_2 = \frac{d}{c}, \quad K_3 = \frac{a^2 - b^2 + c^2 + d^2}{2 a c}
$$

**The three constants carry the whole input–output relation of the four-bar.** Freudenstein's equation is worth knowing because it makes **synthesis** algebraic: three desired pairs $\left( \theta_2, \theta_4 \right)$ give three linear equations in $K_1, K_2, K_3$, and therefore a three-point function generator by hand — see the derivation exercise below and [[mechanisms/linkage-synthesis]].
:::

::: definition Solving the quadratic {#def-quadratic}
**Substitute the half-angle** $u = \tan \left( \theta_4 / 2 \right)$, so that $\cos \theta_4 = \left( 1 - u^2 \right) / \left( 1 + u^2 \right)$ and $\sin \theta_4 = 2 u / \left( 1 + u^2 \right)$. The loop equation becomes

$$
A u^2 + B u + C = 0 \qquad \Rightarrow \qquad
\boxed{ \theta_4 = 2 \arctan \left( \frac{- B \pm \sqrt{B^2 - 4 A C}}{2 A} \right) }
$$

**The coefficients.** Collecting the terms of the squared-modulus equation in $\cos\theta_4$ and $\sin\theta_4$ gives $G + E \cos\theta_4 - 2ac\sin\theta_2 \sin\theta_4 = 0$ with

$$
\begin{aligned}
G &= a^2 + c^2 + d^2 - b^2 - 2 a d \cos \theta_2, &
E &= 2 c \left( d - a \cos \theta_2 \right), \\
A' &= G - E, \qquad B' = - 4 a c \sin \theta_2, \qquad C' = G + E &
\theta_4 &= 2 \arctan \frac{- B' \pm \sqrt{B'^2 - 4 A' C'}}{2 A'}
\end{aligned}
$$

**A worked check on the mechanism of the next example** ($a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$, $\theta_2 = 40^\circ$):
$$
G = 0.25 + 0.81 + 1.21 - 1.44 - 1.10 \cos 40^\circ = - 0.01265, \qquad E = 1.8 \times 0.71698 = 1.29056
$$
$$
A' = - 1.30321, \quad B' = - 1.15702, \quad C' = 1.27791, \qquad B'^2 - 4 A' C' = 1.33869 + 6.66154 = 8.00023
$$
$$
u = \frac{1.15702 \pm 2.82847}{- 2.60642} \qquad \Rightarrow \qquad
u = 0.64128 \Rightarrow \theta_4 = \mathbf{65.34^\circ}, \qquad
u = - 1.52910 \Rightarrow \theta_4 = \mathbf{246.37^\circ}
$$
**These are the open and crossed circuits of the four-bar, from one quadratic and one sign choice.**

**The discriminant decides whether the loop closes.** $B'^2 - 4 A' C' < 0$ means **the loop cannot close at this input**: the crank has reached a position the rest of the chain cannot follow. For a Grashof crank–rocker driven by its crank the discriminant stays positive all the way round; for a link that cannot rotate fully it reaches zero at the limit positions and is negative beyond them. Where the discriminant is close to zero the two roots are close together, the output changes rapidly with the input, and — as the next definitions show — the transmission angle is close to $0^\circ$ or $180^\circ$.
:::

::: example Four-bar position by the diagonal method {#ex-fbpos}
A four-bar has crank $a = 0.5\ \mathrm{m}$, coupler $b = 1.2\ \mathrm{m}$, rocker $c = 0.9\ \mathrm{m}$ and ground $d = 1.1\ \mathrm{m}$, with the crank at $\theta_2 = 40^\circ$. Find $\theta_3$, $\theta_4$, the coupler point $P$ at $0.8\ \mathrm{m}$ from $A$ at $30^\circ$ to $AB$, and the transmission angle.
::: solution
**The check first.** $s + l = 0.5 + 1.2 = 1.7$, $p + q = 0.9 + 1.1 = 2.0$: **Grashof**, and the shortest link is the crank, adjacent to the ground, so this is a **crank–rocker** and $\theta_2$ may take any value.
**The diagonal method, which is the one to use by hand and in a spreadsheet.** Place $O_2$ at the origin and $O_4$ at $\left( 1.1, 0 \right)$.
$$
A = 0.5 \left( \cos 40^\circ, \sin 40^\circ \right) = \left( 0.3830,\; 0.3214 \right)
$$
**The diagonal from $A$ to $O_4$:**
$$
\vec{f} = \left( 1.1 - 0.3830,\; 0 - 0.3214 \right) = \left( 0.7170,\; - 0.3214 \right)
\qquad f = 0.7857\ \mathrm{m}, \qquad \alpha = - 24.14^\circ
$$
**The triangle $A$–$B$–$O_4$** has sides $b = 1.2$, $c = 0.9$, $f = 0.7857$, so the angle at $A$ between $AB$ and the diagonal is
$$
\cos \beta = \frac{b^2 + f^2 - c^2}{2 b f} = \frac{1.44 + 0.6173 - 0.81}{2 \times 1.2 \times 0.7857} = \frac{1.2473}{1.8857} = 0.6615
\qquad \beta = 48.59^\circ
$$
**The two circuits.** $\theta_3 = \alpha \pm \beta$:
$$
\text{open: } \theta_3 = - 24.14 + 48.59 = \mathbf{24.44^\circ}, \qquad
\text{crossed: } \theta_3 = - 24.14 - 48.59 = \mathbf{- 72.73^\circ}
$$
**The open circuit:**
$$
B = A + 1.2 \left( \cos 24.44^\circ, \sin 24.44^\circ \right) = \left( 1.4755,\; 0.8179 \right)
\qquad \Rightarrow \qquad \theta_4 = \arctan \frac{0.8179}{1.4755 - 1.1} = \mathbf{65.34^\circ}
$$
**The crossed circuit:**
$$
B' = A + 1.2 \left( \cos \left( - 72.73^\circ \right), \sin \left( - 72.73^\circ \right) \right) = \left( 0.7392,\; - 0.8245 \right)
\qquad \Rightarrow \qquad \theta_4' = \mathbf{246.37^\circ}
$$
**Check that both close the loop:** $\left| B - O_4 \right| = \sqrt{0.3755^2 + 0.8179^2} = 0.900$ and $\left| B' - O_4 \right| = \sqrt{0.3608^2 + 0.8245^2} = 0.900$. Both are correct answers to the equations — which is why a question about a four-bar must specify the circuit. Both agree with the half-angle solution above.
**The coupler point.** $P$ lies at $30^\circ$ to $AB$ at a radius of $0.8$:
$$
P = A + 0.8 \left( \cos 54.44^\circ, \sin 54.44^\circ \right)
= \left( 0.3830 + 0.4652,\; 0.3214 + 0.6508 \right) = \mathbf{\left( 0.848,\; 0.972 \right)}
$$
**The transmission angle**, measured at $B$ between the coupler and the rocker:
$$
\cos \mu = \frac{b^2 + c^2 - f^2}{2 b c} = \frac{1.44 + 0.81 - 0.6173}{2 \times 1.2 \times 0.9} = \frac{1.6327}{2.16} = 0.7559
\qquad \boxed{ \mu = 40.9^\circ }
$$
**Over the whole cycle.** $\mu$ depends on $\theta_2$ only through the diagonal,
$$
f^2 = a^2 + d^2 - 2 a d \cos \theta_2 = 1.46 - 1.10 \cos \theta_2
$$
**which is smallest at $\theta_2 = 0$ and largest at $180^\circ$:**
$$
\theta_2 = 0: \quad f = 0.600, \quad \cos \mu = \frac{2.25 - 0.36}{2.16} = 0.875, \quad \mu_{\min} = \mathbf{29.0^\circ}
$$
$$
\theta_2 = 180^\circ: \quad f = 1.600, \quad \cos \mu = \frac{2.25 - 2.56}{2.16} = - 0.1435, \quad \mu_{\max} = \mathbf{98.3^\circ}
$$
**The mechanism is below the $40^\circ$ rule for about $76^\circ$ of each crank revolution.** Because $\mu$ depends only on the ratios of the lengths, the fix is a change of proportion: shortening the crank to $0.30\ \mathrm{m}$ (other links unchanged) raises $\mu_{\min}$ to $41.8^\circ$, but cuts the rocker's swing from $76.7^\circ$ to $44.3^\circ$ — the usual trade between output swing and transmission angle.
*Sanity.* The rocker's limit positions, found below, are $63.93^\circ$ (at $\theta_2 = 28.40^\circ$) and $140.60^\circ$ (at $\theta_2 = 234.70^\circ$). $\theta_4 = 65.34^\circ$ lies between them and close to the lower one, as it should, since $\theta_2 = 40^\circ$ is only $11.6^\circ$ past the crank angle of that limit. The crossed circuit's $\theta_4' = 246.37^\circ$ belongs to the other circuit, which has its own limits; a crank–rocker driven by its crank never passes from one circuit to the other.
:::
:::

## The slider–crank, and the term everyone drops

::: definition Slider–crank displacement {#def-slidercrank}
**With crank $r$, connecting rod $l$, ratio $\lambda = r / l$ and offset $e$** (the perpendicular distance of the slider's line from the crank centre), the rod angle $\phi$ and the slider position $x$ measured from the crank centre are:

$$
\boxed{ \phi = \arcsin \left( \lambda \sin \theta - \frac{e}{l} \right) }, \qquad
x = r \cos \theta + l \cos \phi
$$

**with $e = 0$ for the in-line case.** Many car engines have a small piston-pin offset, typically a millimetre or two, towards the major-thrust side to reduce piston slap. The offset enters inside the arcsine because it shifts the slider's line relative to the crank centre; it moves the dead-centre crank angles slightly away from $0^\circ$ and $180^\circ$ and makes the forward and return strokes take slightly different crank angles.

**Displacement from top dead centre** (in-line), where $x_{\mathrm{TDC}} = r + l$:

$$
\boxed{ s = r \left( 1 - \cos \theta \right) + l \left[ 1 - \sqrt{1 - \lambda^2 \sin^2 \theta} \right] }
$$

**The binomial expansion, which is where the familiar second term comes from:**

$$
\sqrt{1 - \lambda^2 \sin^2 \theta} \approx 1 - \frac{\lambda^2 \sin^2 \theta}{2} - \frac{\lambda^4 \sin^4 \theta}{8}
\qquad \Rightarrow \qquad
\boxed{ s \approx r \left( 1 - \cos \theta \right) + \frac{r^2}{2 l} \sin^2 \theta }
$$

$$
\begin{array}{c l c c c}
\lambda = r / l & \text{typical application} & \text{second term at } 90^\circ & \text{as a fraction of the stroke} & \text{error of dropping it at } 30^\circ \\
0.20 & \text{long-rod engine or compressor} & 0.100\, r & 5.0\, \% & 15.8\, \% \\
0.25 & \text{compressor, stationary engine} & 0.125\, r & 6.3\, \% & 19.0\, \% \\
0.30 & \text{car engine} & 0.150\, r & 7.5\, \% & 22.0\, \% \\
0.34 & \text{short-rod engine} & 0.170\, r & 8.5\, \% & 24.2\, \%
\end{array}
$$

(The last column is the error of the pure-cosine approximation as a percentage of the exact displacement at $\theta = 30^\circ$.)

**Reading the table.** The second term is always positive: the piston is **farther** from top dead centre than the crank geometry alone would put it, because the rod is inclined. Near top dead centre the first term grows like $r \theta^2 / 2$ and the second like $\lambda r \theta^2 / 2$, so **their ratio is about $\lambda$ for small angles**, and the fractional error of dropping the second term is about $\lambda / (1 + \lambda)$ there — set by the rod ratio, not by where in the stroke you look.

**Velocity and acceleration, by differentiating** (with $\omega = d\theta/dt$ constant):

$$
v = \frac{ds}{dt} = r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right], \qquad
a \approx r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta \right]
$$

with $v$ positive away from top dead centre. **Two consequences matter in engine design.** The acceleration has a **second harmonic** of relative amplitude $\lambda$, so at $\lambda = 0.3$ the reciprocating mass produces a shaking force at twice crank speed of $30\ \%$ of the first-order amplitude. In an inline four-cylinder engine the first-order forces cancel between cylinders but the second-order ones add; they can be cancelled by a pair of counter-rotating balance shafts running at twice crank speed (the Lanchester arrangement), or avoided by other cylinder layouts — see [[mechanisms/machine-dynamics]]. And **the piston's peak speed is not $r\omega$ at $90^\circ$**: at $\lambda = 0.25$ it occurs at $76.7^\circ$ and is $3.1\ \%$ higher, close to $r\omega(1 + \lambda^2/2)$.
:::

::: example Slider–crank displacement and the cost of approximating {#ex-sc}
A compressor has crank radius $r = 100\ \mathrm{mm}$, connecting-rod length $l = 400\ \mathrm{mm}$ and runs at $300\ \mathrm{rev / min}$. Find the piston displacement, velocity and acceleration at $\theta = 35^\circ$, and the error of the two approximations.
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
**The error of the two-term form is $0.02\ \mathrm{mm}$ — about one tenth of one per cent** — and it is almost exactly the next term of the expansion, $r^4 \sin^4 \theta / \left( 8 l^3 \right) = 0.021\ \mathrm{mm}$. **The approximation that does matter is the pure cosine:**
$$
s_{\mathrm{cosine}} = r \left( 1 - \cos \theta \right) = 18.08\ \mathrm{mm}
\qquad \text{error} = 4.13\ \mathrm{mm} = 19\ \% \text{ of the displacement} = 2.1\ \% \text{ of the stroke}
$$
**The velocity.** $\omega = 2 \pi \times 300 / 60 = 31.42\ \mathrm{rad / s}$:
$$
v = 100 \times 31.42 \left[ \sin 35^\circ + \frac{0.25 \sin 70^\circ}{2 \sqrt{1 - 0.0625 \sin^2 35^\circ}} \right]
= 3142 \left[ 0.5736 + \frac{0.2349}{1.9793} \right]
$$
$$
v = 3142 \times 0.6923 = 2175\ \mathrm{mm / s} = \mathbf{2.18\ \mathrm{m / s}}
$$
directed away from top dead centre, as it must be $35^\circ$ after it. The second term adds $21\ \%$ to the velocity at this angle: it is proportional to $\sin 2\theta$, which peaks at $45^\circ$, while the first term peaks at $90^\circ$.
**The acceleration**, to the usual first order in $\lambda$:
$$
a \approx 100 \times 31.42^2 \left[ \cos 35^\circ + 0.25 \cos 70^\circ \right]
= 98{,}696 \left[ 0.8192 + 0.0855 \right] = 89{,}300\ \mathrm{mm / s^2} = \mathbf{89.3\ \mathrm{m / s^2}}
$$
**which is $9.1\ g$**; it is positive in the convention above, so at $35^\circ$ the piston is still speeding up as it moves away from top dead centre. (Differentiating the exact displacement numerically gives $89.7\ \mathrm{m/s^2}$, so the first-order formula is within half a per cent.) The second-harmonic term contributes $10\ \%$ of the acceleration at this angle. A $0.45\ \mathrm{kg}$ piston and pin need an inertia force of $0.45 \times 89.3 = 40\ \mathrm{N}$ at this instant.
**The stroke check.**
$$
s \left( 0^\circ \right) = 0, \qquad s \left( 180^\circ \right) = 100 \times 2 + 0 = 200.0\ \mathrm{mm} \quad \checkmark
$$
**All three expressions are exact at both dead centres, because $\sin\theta$ vanishes there**; any statement of the form "the approximation is good to $x$ per cent" must say at which angle.
*Sanity.* $v$ is zero at $\theta = 0$ and $180^\circ$, $2.18\ \mathrm{m / s}$ at $35^\circ$, and peaks at $3.24\ \mathrm{m / s}$ at $76.7^\circ$. The **mean piston speed** is twice the stroke times the rotational speed, $2 \times 0.200 \times 5 = 2.0\ \mathrm{m / s}$, so the peak-to-mean ratio is $1.62$ — close to $\pi / 2 = 1.57$, the value for a pure sinusoid. Mean piston speed is the usual duty parameter for engines and compressors because it does not depend on crank angle.
:::
:::

::: widget plot
f: 500-(100*cos(x*pi/180)+400*sqrt(1-0.0625*pow(sin(x*pi/180),2)))
x: 0, 360
y: 0, 205
caption: The exact piston displacement of the $100$–$400$ millimetre compressor slider–crank, measured from top dead centre, against crank angle in degrees. **The curve is not a cosine: it is fuller than a cosine near top dead centre and flatter near bottom dead centre.** The difference is the connecting rod's inclination — a Scotch yoke, which drives the piston through a sliding slot instead of a rod, gives $s = r \left( 1 - \cos\theta \right)$ exactly. Read the curve at $90^\circ$: the piston is $112.7$ millimetres from top dead centre, not $100$ — past the middle of its $200$ millimetre stroke by $12.7$ millimetres, close to the second-order term $r^2 / 2l = 12.5$ millimetres.
:::

## Branches, limits and the shape of the answer

::: definition Limit positions and quick return {#def-limits}
**A crank–rocker's rocker reaches its two extreme positions when the crank and coupler are collinear** — extended and folded — because then the distance $O_2 B$ is at its maximum $a + b$ or its minimum $b - a$, and $B$ can go no further.

$$
\left| O_2 B \right|_{\max} = a + b, \qquad \left| O_2 B \right|_{\min} = b - a
$$

Applying the cosine rule to the triangle $O_2 O_4 B$ with $O_2 B = a \pm b$ gives the interior angle at $O_4$ and the crank angle:

$$
\theta_{4,\lim} = 180^\circ - \arccos \frac{c^2 + d^2 - \left( a \pm b \right)^2}{2 c d}, \qquad
\psi_{\lim} = \arccos \frac{d^2 + \left( a \pm b \right)^2 - c^2}{2 d \left( a \pm b \right)}
$$

where $\psi$ is the angle of $O_2 B$ above the ground line; at the extended position the crank angle is $\theta_2 = \psi$, and at the folded position the crank points away from $B$, $\theta_2 = 180^\circ + \psi$.

**For the mechanism of the worked example** ($a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$):

$$
\begin{array}{c c c c}
& \left| O_2 B \right| & \theta_4 & \text{crank angle} \\
\text{extended} & 1.700 & 63.93^\circ & \theta_2 = 28.40^\circ \\
\text{folded} & 0.700 & 140.60^\circ & \theta_2 = 180^\circ + 54.70^\circ = 234.70^\circ
\end{array}
$$

**The rocker's total swing is $140.60 - 63.93 = 76.67^\circ$.**

**The quick-return ratio.** The crank turns $234.70 - 28.40 = 206.30^\circ$ while the rocker swings out and $360 - 206.30 = 153.70^\circ$ while it swings back, so at constant crank speed

$$
\boxed{ \text{time ratio} = \frac{206.30}{153.70} = \mathbf{1.342} }
$$

**The return stroke takes $25\ \%$ less time than the outward stroke.** Quick-return mechanisms — this crank–rocker, the Whitworth drive and the crank-and-slotted-lever drive of the shaping machine — use the slow stroke for cutting and the fast one for the idle return.
:::

::: definition Circuit and branch defects {#def-defects}
**The set of all positions of a one-freedom linkage is a curve (or several closed curves) in the space of its joint angles** — its **configuration space**. Each separate closed curve is a **circuit**; singular points, where the output's derivative with respect to the input becomes infinite, divide a circuit into **branches**. The common defects of a synthesised linkage are described in these terms:

$$
\begin{array}{l l l}
\textbf{Circuit defect} & \text{the required positions lie on different circuits} & \text{the linkage must be disassembled to reach them} \\
\textbf{Branch defect} & \text{the required positions lie on different branches} & \text{the linkage must pass a singular position} \\
\textbf{Order defect} & \text{the positions are reached in the wrong order} & \text{the input–output function is not monotonic} \\
\textbf{Singularity} & \text{a limit or dead-centre position inside the range} & \text{the Jacobian loses rank}
\end{array}
$$

**These are ways a linkage that passes its mobility count and satisfies every precision point can still fail to do the job.** The derivation exercise at the end of this lesson produces a function generator with exactly this kind of problem: it passes through its three precision points, but its output reaches a maximum between the second and third and comes back.

**The singularity test.** Write the loop equations as $\mathbf{f} \left( \mathbf{x}, \theta \right) = 0$ with $\mathbf{x}$ the dependent coordinates. Then

$$
\frac{d \mathbf{x}}{d \theta} = - \left( \frac{\partial \mathbf{f}}{\partial \mathbf{x}} \right)^{- 1} \frac{\partial \mathbf{f}}{\partial \theta}
$$

**and the mechanism is singular where** $\det \left( \partial \mathbf{f} / \partial \mathbf{x} \right) = 0$. For the four-bar with $\mathbf{x} = \left( \theta_3, \theta_4 \right)$ this determinant is $b c \sin \left( \theta_3 - \theta_4 \right)$, whose magnitude is $b c \sin \mu$ ([[mechanisms/velocity-analysis]]). It vanishes when the coupler and rocker are in line — exactly where the two roots of the position quadratic coincide and the transmission angle is $0^\circ$ or $180^\circ$. **Geometry (the transmission angle), algebra (the discriminant) and calculus (the Jacobian) describe one condition.**
:::

::: example Newton–Raphson that cannot converge {#ex-newton}
After the first loop of a Watt six-bar has been solved, the closure equation of the second loop at one input angle reduces to the scalar equation $f \left( \theta_6 \right) = 0.6 \cos \theta_6 - 0.7537 = 0$. Starting from $\theta_6 = 60^\circ$, carry out two Newton–Raphson iterations and interpret the result.
::: solution
**The iteration.** $f \left( \theta_6 \right) = 0.6 \cos \theta_6 - 0.7537$, $f' \left( \theta_6 \right) = - 0.6 \sin \theta_6$, and $\theta^{(k+1)} = \theta^{(k)} - f / f'$.
**Iterate 1.**
$$
\theta_6^{(0)} = 60^\circ = 1.0472\ \mathrm{rad}, \qquad
f = 0.6 \times 0.5 - 0.7537 = - 0.4537, \qquad
f' = - 0.6 \times 0.8660 = - 0.5196
$$
$$
\theta_6^{(1)} = 1.0472 - \frac{- 0.4537}{- 0.5196} = 1.0472 - 0.8731 = 0.1741\ \mathrm{rad} = 9.97^\circ
$$
**Iterate 2.**
$$
f = 0.6 \cos 9.97^\circ - 0.7537 = 0.5909 - 0.7537 = - 0.1628, \qquad
f' = - 0.6 \sin 9.97^\circ = - 0.1039
$$
$$
\theta_6^{(2)} = 0.1741 - \frac{- 0.1628}{- 0.1039} = 0.1741 - 1.5665 = - 1.3924\ \mathrm{rad} = - 79.8^\circ
$$
**The iteration is not converging.** The step grew from $0.87$ to $1.57\ \mathrm{rad}$ because the derivative is small where the cosine is flat, and the next iterate jumps again. The reason is simple: **the equation has no root.** $\cos \theta_6 = 0.7537 / 0.6 = 1.256 > 1$ is impossible, so the second loop cannot close at this input. No starting guess will help.
**What to do about it.** The second loop is asking for a position the chain cannot reach. The response is not a better starting guess but a check of the second loop's link lengths against the range of positions the first loop actually delivers.
$$
\begin{array}{l l}
\text{1. Check the residual} & \text{report } \left| f \right| \text{ and not just the iterate; a residual of } 0.16 \text{ is not a solution} \\
\text{2. Bracket, then bisect} & \text{bisection cannot diverge, and a failure to bracket shows that no root exists} \\
\text{3. Continue from the previous step} & \text{use the last valid position as the starting value, so the solver stays on one circuit} \\
\text{4. Homotopy / continuation} & \text{track the solution from an input where the loop does close} \\
\text{5. Change the dimensions} & \text{if no input closes the loop, the linkage is wrong, not the solver}
\end{array}
$$
*Sanity.* Plotting $f$ over a full turn shows it between $-1.354$ and $-0.154$ — always negative, so no root exists. A solver that reports "did not converge" here is giving the right answer; one that reports an angle after a fixed number of iterations without checking $|f|$ is not.
:::
:::

::: widget plot
f: atan2(0.5*sin(x*pi/180)+1.2*sin(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180))))),0.5*cos(x*pi/180)+1.2*cos(atan2(-0.5*sin(x*pi/180),1.1-0.5*cos(x*pi/180))+acos((2.09-1.1*cos(x*pi/180))/(2.4*sqrt(1.46-1.1*cos(x*pi/180)))))-1.1)*180/pi
x: 0, 360
y: 60, 145
caption: The rocker angle $\theta_4$ (degrees) of the $0.5$–$1.2$–$0.9$–$1.1$ metre four-bar against crank angle, open circuit, computed by the diagonal method. **The curve is not sinusoidal: it rises from its minimum of $63.9^\circ$ at $\theta_2 = 28.4^\circ$ to its maximum of $140.6^\circ$ at $\theta_2 = 234.7^\circ$, then falls back much more quickly.** The rising part occupies $206^\circ$ of crank rotation and the falling part $154^\circ$; that asymmetry is the quick-return ratio of $1.34$. Notice also how flat the curve is near its two extremes — there the rocker's angular velocity passes through zero.
:::

## Straight-line and path generation, computed

::: example A coupler curve and its straightness {#ex-coupler}
For the four-bar of the earlier example, take the coupler point $P$ at $r = 0.8\ \mathrm{m}$ from $A$ and $\gamma = 30^\circ$ to $AB$. Compute its path over the crank's full rotation and measure how far its flattest $60^\circ$ stretch departs from a straight line.
::: solution
**The point's coordinates at any crank angle:**
$$
P \left( \theta_2 \right) = \left( a \cos \theta_2, a \sin \theta_2 \right) + r \left( \cos \left( \theta_3 + \gamma \right), \sin \left( \theta_3 + \gamma \right) \right)
$$
**Evaluated every $30^\circ$** (open circuit, metres):
$$
\begin{array}{c c c c c c c c c c c c c}
\theta_2 & 0 & 30 & 60 & 90 & 120 & 150 & 180 & 210 & 240 & 270 & 300 & 330 \\
P_x & 0.686 & 0.860 & 0.756 & 0.520 & 0.250 & 0.014 & -0.147 & -0.220 & -0.207 & -0.116 & 0.047 & 0.310 \\
P_y & 0.778 & 0.927 & 1.052 & 1.108 & 1.058 & 0.913 & 0.718 & 0.521 & 0.366 & 0.292 & 0.341 & 0.540
\end{array}
$$
(At $\theta_2 = 40^\circ$ the same formula gives $(0.848, 0.972)$, the point found earlier.) The curve is a closed oval about $1.1\ \mathrm{m}$ across.
**Finding the flattest stretch.** For every $60^\circ$ window of crank angle, fit a straight line to the points (by least squares) and measure the spread of the perpendicular distances. The best window runs from $\theta_2 = 292.5^\circ$ to $352.5^\circ$: the chord is $0.725\ \mathrm{m}$ long and the points lie within a band $17\ \mathrm{mm}$ wide — a deviation of $2.3\ \%$ of the length. **That is far too poor for a straight-line guide**: this linkage was not proportioned for it.
**Linkages proportioned for straightness.** **Chebyshev's linkage** — a crossed four-bar with ground $2$, rockers $2.5$ and coupler $1$, the coupler midpoint traced — moves its midpoint over a run equal to the ground length with a computed deviation of about $0.25\ \%$ of the run; scaled to a $0.725\ \mathrm{m}$ run that is under $2\ \mathrm{mm}$. **Watt's linkage** is even better near its centre but degrades rapidly: with rockers of $1$ and coupler $0.5$, the deviation is about $0.08\ \%$ over a run of $0.4$ and $1.6\ \%$ over a run of $0.8$.
**When the line must be exact,** neither will do. An exact line needs a sliding pair (a slideway or crosshead guide) or an exact straight-line linkage such as Peaucellier's, with more links and more joints to wear.
*Sanity.* A four-bar coupler curve is an algebraic curve of degree six, so it can meet a straight line in at most six points: it can be made to cross a desired line several times and stay close to it between crossings, but it cannot contain a straight segment. That is why the improvement in straightness comes from choosing proportions, and why exact straight-line motion needs more links or a slider.
:::
:::

::: quiz
Solving the four-bar position quadratic at $\theta_2 = 60^{ \circ }$ returns $\theta_4 = 41.2^{ \circ }$ and $118.6^{ \circ }$; the linkage is a Grashof crank–rocker assembled with $\theta_4 = 118.6^{ \circ }$. A Newton–Raphson solver seeded with $\theta_4 = 120^{ \circ }$ at $\theta_2 = 60^{ \circ }$ is stepped in $1^{ \circ }$ increments to $\theta_2 = 61^{ \circ }$ and returns $41.9^{ \circ }$. What has happened?

- [ ] Accumulated round-off error in the iteration
- [x] The solver has jumped circuit: $41.9^{ \circ }$ is a root of the same loop equation, a geometrically valid position, but of the other assembly mode, which this linkage cannot reach without being disassembled
- [ ] The loop does not close at $\theta_2 = 61^{ \circ }$, so the solver has returned a spurious root
- [ ] The transmission angle has passed through zero and the Jacobian has become singular

::: solution
**Both roots solve the loop equation**, and a solver given only the equation has no way of knowing which one the mechanism is in. A one-degree step should keep the answer within a degree or so of $118.6^{ \circ }$; a jump of $77^{ \circ }$ means the iteration has been attracted to the other root. For a Grashof crank–rocker the two assembly modes never meet, so the result is a different linkage, not a different position of this one. **The defences are cheap: seed each step from the previous solution, limit the step size, and check that the new answer is close to the old one and that the loop residual is small** — and, when the closed-form quadratic is available, simply keep the same sign of the square root from step to step.
:::
:::

::: history
**Ferdinand Freudenstein** completed his doctoral thesis at Columbia University in 1954 and published "An Analytical Approach to the Design of Four-Link Mechanisms" (Transactions of the ASME, 1954) and "Approximate Synthesis of Four-Bar Linkages" (1955), which contain the equation now named after him and the algebraic approach to function generation built on it. In **1959** he and **George N. Sandor** published one of the first papers on the synthesis of linkages with a programmed digital computer. Long before, **Pafnuty Chebyshev**'s memoir on Watt-type parallel motions (presented in 1853, published in 1854) had posed the problem of choosing a linkage's proportions to minimise its largest error — the origin of the polynomials that bear his name. The analysis of slider–crank kinematics by series expansion in the rod ratio, used here, has been standard in engine dynamics since the nineteenth century.
:::

## Where this leads

The velocity and acceleration that follow from differentiating these loops are [[mechanisms/velocity-analysis]] and [[mechanisms/acceleration-analysis]]; the choice of proportions that makes the transmission angle and the structural error acceptable is [[mechanisms/linkage-synthesis]]; similar loop equations, with a contact constraint in place of a turning pair, appear in [[mechanisms/cams]] and [[mechanisms/gears]]; and the singularity condition $\det \left( \partial \mathbf{f} / \partial \mathbf{x} \right) = 0$ is the same determinant that makes a [[robotics]] manipulator lose a degree of freedom.

::: summary
- A closed planar vector loop is two real equations and solves for two unknowns; the four-bar reduces to a quadratic in $\tan \left( \theta_4 / 2 \right)$ whose two roots are the open and crossed circuits.
- Freudenstein's equation $K_1 \cos\theta_4 - K_2 \cos\theta_2 + K_3 = \cos(\theta_2 - \theta_4)$ is linear in its three constants and gives a three-point function generator by hand.
- A negative discriminant means the loop cannot close; a zero discriminant is a limit position, where the transmission angle is $0^\circ$ or $180^\circ$ and the Jacobian is singular.
- Slider–crank displacement is $s = r(1-\cos\theta) + l[1 - \sqrt{1 - \lambda^2 \sin^2\theta}]$; the second-order term is $\lambda r / 2$ at $90^\circ$, and dropping it costs roughly a fraction $\lambda/(1+\lambda)$ of the displacement near top dead centre.
- Rocker limits occur at crank–coupler collinearity; the ratio of the two crank arcs between them is the quick-return ratio.
- Circuit, branch and order defects can spoil a linkage that satisfies every precision point; check the motion over the whole range.
- Newton–Raphson needs a residual check, a previous-step start and preferably a bracket; a root that does not exist is a dimensioning error, not a convergence error.
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
$v=r\omega[\sin\theta+\lambda\sin2\theta/(2\sqrt{1-\lambda^2\sin^2\theta})]=3.142\times[0.5736+0.1187]=2.18$ m/s.
:::
:::

::: exercise Rocker limits {level=1 check="76.7"}
For the four-bar $a=0.5$, $b=1.2$, $c=0.9$, $d=1.1$ metres, give the rocker's total swing in degrees.
::: solution
At the extended position ($O_2B=1.7$) $\theta_4=63.93^\circ$; at the folded position ($O_2B=0.7$) $\theta_4=140.60^\circ$; swing $=76.7^\circ$.
:::
:::

::: exercise Quick return {level=1 check="1.34"}
For the same four-bar, give the quick-return (time) ratio of the slow stroke to the fast stroke.
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

::: exercise Roots {level=2 check="46.1"}
A four-bar's half-angle quadratic gives $A' = 0.32$, $B' = -1.10$, $C' = 0.41$. Solve for both values of $\theta_4$, and give (in degrees) the one that belongs to the circuit in which the rocker moves between $30^\circ$ and $100^\circ$.
::: solution
$$
\theta_4 = 2 \arctan \frac{1.10 \pm \sqrt{1.21 - 4 \times 0.32 \times 0.41}}{0.64}
= 2 \arctan \frac{1.10 \pm \sqrt{0.6852}}{0.64}
= 2 \arctan \frac{1.10 \pm 0.8278}{0.64}
$$
$$
u_1 = 3.012 \Rightarrow \theta_4 = 2 \times 71.63^\circ = 143.3^\circ, \qquad
u_2 = 0.4254 \Rightarrow \theta_4 = 2 \times 23.04^\circ = \mathbf{46.1^\circ}
$$
Only $46.1^\circ$ lies in the stated range, so it belongs to that circuit; $143.3^\circ$ is the other assembly mode. Checking every computed root against the known range of the output is a cheap way to catch a circuit jump.
:::
:::

::: exercise Scotch yoke {level=2}
A Scotch yoke with $r = 100\ \mathrm{mm}$ at $300\ \mathrm{rev / min}$ drives a piston. Compare its displacement, velocity and acceleration at $35^\circ$ with those of the $100$–$400$ millimetre slider–crank, and state why Scotch yokes are uncommon in engines.
::: solution
$$
s = r \left( 1 - \cos \theta \right) = 18.08\ \mathrm{mm}, \qquad
v = r \omega \sin \theta = 3.142 \times 0.5736 = 1.802\ \mathrm{m / s}
$$
$$
a = r \omega^2 \cos \theta = 98.70 \times 0.8192 = 80.8\ \mathrm{m / s^2} = 8.24\ g
$$
**Against the slider–crank:** displacement $18.08$ against $22.22$ millimetres (the yoke's is $19\ \%$ smaller), velocity $1.80$ against $2.18$ metres per second, and acceleration $80.8$ against $89.3$ metres per second squared. **The whole of the difference is the second-order term** of the slider–crank.
**Why the yoke is uncommon in engines.** Its motion is a pure sinusoid, so its reciprocating inertia force has no second harmonic — an advantage for balance. But the full piston load is carried by a block sliding in the yoke's slot, a heavily loaded sliding contact that is harder to lubricate and wears faster than the rotating pin joints of a connecting rod, and the slot and block add reciprocating mass. Scotch yokes are used where loads and speeds are moderate and a sinusoidal motion is useful: some pumps, valve actuators and test machines.
:::
:::

::: exercise Derivation {level=3}
Derive Freudenstein's equation from the four-bar loop. Then find the three $K$ constants of a function generator required to satisfy $\theta_2 = 0^\circ$, $\theta_4 = 30^\circ$; $\theta_2 = 45^\circ$, $\theta_4 = 60^\circ$; $\theta_2 = 90^\circ$, $\theta_4 = 75^\circ$, find the link lengths for $a = 1$, and check whether the linkage actually moves through the three points in order.
::: solution
**The derivation.** The loop is $a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$. Isolate the coupler:
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
**The synthesis.** Substituting the three pairs gives three linear equations in $K_1, K_2, K_3$:
$$
\begin{array}{r c l}
0.8660 K_1 - K_2 + K_3 & = & \cos \left( - 30^\circ \right) = 0.8660 \\
0.5 K_1 - 0.7071 K_2 + K_3 & = & \cos \left( - 15^\circ \right) = 0.9659 \\
0.2588 K_1 - 0 \cdot K_2 + K_3 & = & \cos \left( 15^\circ \right) = 0.9659
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
K_2 = 0.3411 \times \left( - 0.3754 \right) = \mathbf{- 0.1280}, \qquad
K_3 = 0.9659 - 0.2588 \times \left( - 0.3754 \right) = \mathbf{1.0631}
$$
**The link lengths.** Taking $a = 1$:
$$
d = K_1 a = - 0.3754, \qquad c = \frac{d}{K_2} = \frac{- 0.3754}{- 0.1280} = 2.932, \qquad
b^2 = a^2 + c^2 + d^2 - 2 a c K_3 = 1 + 8.596 + 0.141 - 6.234 = 3.503
$$
$$
b = 1.872
$$
**$d < 0$ is not an error:** it means the output pivot lies on the other side of the input pivot, at $(-0.3754, 0)$, from the one assumed when the loop was drawn.
**Grashof check.** The lengths are $0.3754$, $1$, $1.872$, $2.932$: $s + l = 0.3754 + 2.932 = 3.307$ against $p + q = 1 + 1.872 = 2.872$. **$s + l > p + q$: the chain is non-Grashof, and no link can rotate fully.**
**Does it move through the points in order?** Solving the position at each input angle (with the half-angle quadratic, staying on the root that gives $\theta_4 = 30^\circ$ at $\theta_2 = 0$) shows $\theta_4$ rising to a **maximum of $77.1^\circ$ at $\theta_2 = 84.5^\circ$** and falling back to $75^\circ$ at $\theta_2 = 90^\circ$; the input reaches its own limit position at $\theta_2 = 91.3^\circ$. The three precision points are satisfied exactly, but the third lies past the output's turning point, so the function is not monotonic over the range — an **order defect**, and very close to a limit position where the transmission angle is poor.
*Sanity.* Three conditions, three unknowns, exact fit: Freudenstein's method guarantees the precision points and nothing else. The lesson is that a synthesis result must always be checked by position analysis over the whole range — here the remedy is to move the precision points (for example to Chebyshev spacing inside a narrower range) or to change the required function so that it can be met before the limit position.
:::
:::

::: exercise Design {level=3}
Design the **four-bar drive for a windscreen wiper**: the blade must sweep $105^\circ$ at $42$ cycles per minute; the motor drives the crank through a worm gear; the blade shaft must be able to deliver an assumed $25\ \mathrm{N \cdot m}$ (covering wiping friction, wind load and margin). Give the topology, the proportions, the transmission-angle check, the motor torque and the main failure modes and tests.
::: solution
**Topology.** A continuously rotating motor and an oscillating blade call for a **crank–rocker**: the crank turns once per wiping cycle and the rocker oscillates. With a worm reduction the crank runs at $42\ \mathrm{rev/min}$ ($4.40\ \mathrm{rad/s}$). Mobility: $N = 4$, $J_1 = 4$, $M = 3(3) - 8 = 1$.
**Can one four-bar give $105^\circ$?** The rocker's swing between its limit positions is
$$
\theta_{4,\lim} = 180^\circ - \arccos \frac{c^2 + d^2 - \left( a \pm b \right)^2}{2 c d}
$$
and a search over crank, coupler and ground lengths (rocker fixed at $100\ \mathrm{mm}$) shows that the best minimum transmission angle achievable with a $105^\circ$ swing is about $35^\circ$, below the $40^\circ$ rule. A $105^\circ$ swing from one four-bar is possible but poorly transmitting.
**The usual solution:** a crank–rocker with a moderate swing, followed by a second linkage (a rocker–rocker four-bar or a lever pair) that multiplies the angle at the blade by about $105 / 80 = 1.32$. For the first four-bar take
$$
\boxed{ a = 64, \quad b = 366, \quad c = 100, \quad d = 374\ \mathrm{mm} }
$$
**Grashof:** $s + l = 64 + 374 = 438 < p + q = 366 + 100 = 466$, crank adjacent to ground: a crank–rocker.
**Limit positions:**
$$
a + b = 430: \quad \cos = \frac{100^2 + 374^2 - 430^2}{2 \times 100 \times 374} = - 0.4682 \qquad \theta_{4} = 180^\circ - 117.92^\circ = 62.08^\circ
$$
$$
b - a = 302: \quad \cos = \frac{100^2 + 374^2 - 302^2}{2 \times 100 \times 374} = 0.7844 \qquad \theta_{4} = 180^\circ - 38.34^\circ = 141.66^\circ
$$
$$
\text{swing} = 141.66 - 62.08 = \mathbf{79.6^\circ}
$$
The crank angles of the two limits are $11.86^\circ$ and $191.86^\circ$ — exactly $180^\circ$ apart, so the time ratio is $1.00$ and the blade sweeps at the same average speed in both directions (this happens when $a^2 + d^2 \approx b^2 + c^2$).
**Transmission angle.**
$$
\theta_2 = 0: \cos \mu = \frac{366^2 + 100^2 - 310^2}{2 \times 366 \times 100} = 0.6538, \quad \mu = 49.2^\circ; \qquad
\theta_2 = 180^\circ: \cos \mu = \frac{366^2 + 100^2 - 438^2}{73{,}200} = - 0.6542, \quad \mu = 130.9^\circ
$$
**$\mu$ stays between $49^\circ$ and $131^\circ$**, inside the $40^\circ$–$140^\circ$ rule.
**Motor torque.** Assume $90\ \%$ efficiency for each linkage. The rocker must supply $25 \times 1.32 / 0.9 = 36.7\ \mathrm{N \cdot m}$ to the second linkage. Solving the velocity equations of the first four-bar over a revolution gives a largest $\left| \omega_4 / \omega_2 \right|$ of $0.679$ (at $\theta_2 \approx 307^\circ$), so the peak crank torque is
$$
T_2 = \frac{36.7 \times 0.679}{0.9} = 27.7\ \mathrm{N \cdot m}
$$
Through a $50{:}1$ worm gear of efficiency $0.55$, the motor must deliver $27.7 / \left( 50 \times 0.55 \right) = 1.0\ \mathrm{N \cdot m}$ at $42 \times 50 = 2100\ \mathrm{rev/min}$. A worm of this ratio and efficiency is close to self-locking, which helps keep the blades parked against wind.
**Failure modes.** Pin and bush wear (the sweep grows and the blade can strike the screen edge); blade stalled by ice or snow (the motor's stall torque must be below what would yield the linkage, or a thermal cut-out must act); fatigue of the thin links under reversing load; and loss of the park position if the motor's park switch fails.
**Tests.** Sweep angle and clearance to the screen edge measured new and after durability cycling; motor current against blade position compared with the model; stalled-blade test to show the motor stops before any link yields; low-temperature operation. The example teaches the kinematic method; production wiper systems are designed and validated to the vehicle manufacturer's and regulatory requirements.
:::
:::
