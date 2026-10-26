The root locus is the picture that made classical control a visual art: as a single parameter is swept from zero to infinity, the closed-loop poles trace curves across the plane, and those curves can be drawn to scale from the open-loop poles and zeros alone, without solving an equation. A designer who can sketch one in a minute can see, before any computation, how fast the loop can be made, how well it will be damped, whether a compensator will help and roughly where to put it.

The method rests on two conditions. The **angle condition** decides which points of the plane are on the locus, and it involves only the *angles* subtended by the open-loop poles and zeros — so the locus is a geometric object determined by the plant alone. The **magnitude condition** then supplies the gain at each point, and it involves only the *distances*, so the gain at a chosen pole location is read off a ruler. Everything else — the asymptotes, the breakaway points, the imaginary-axis crossings, the departure angles — is a corollary of those two.

::: warning The locus is drawn for one parameter and one model
A root locus answers exactly one question: where do the closed-loop poles go as **one** real gain goes from zero to infinity, with everything else in the model held fixed. Four failures follow from taking the answer too widely. A compensator's pole-zero pair moved by hand changes the locus, so a design is a sequence of sketches and not one. A parameter that is not an overall loop gain — a time constant, a tachogenerator gain inside an inner loop — must first be rearranged into the form $1 + K P' (s ) = 0$ (a **parameter** or contour locus), and a parameter that cannot be so arranged gives a locus to which the construction rules do not apply. A plant with a delay has a locus with infinitely many branches, of which the three or four nearest the origin are drawn and the rest are assumed harmless, an assumption that fails when a badly designed compensator pushes the outer branches in. And the model itself is uncertain: a locus that passes a tenth of a unit from the imaginary axis is a locus whose crossing gain is uncertain by a factor, which is why the professional use of the method is to **choose a design point** and then check its margins by an independent method, not to trust the sketch.
:::

## The angle condition and its consequences

::: definition The characteristic equation and the two conditions {#def-locus}
For an open-loop transfer function $L (s ) = K P (s )$ with $K$ real and positive, the closed-loop poles satisfy
$$
1 + K P (s ) = 0
\qquad\Longleftrightarrow\qquad
P (s ) = - \frac{1}{K} .
$$
Writing $P (s ) = \prod \left( s - z_i \right) / \prod \left( s - p_j \right)$ in polar form splits this into
$$
\textbf{angle:} \quad \sum_i \arg \left( s - z_i \right) - \sum_j \arg \left( s - p_j \right) = \pm 180^{\circ} \left( 2 k + 1 \right),
$$
$$
\textbf{magnitude:} \quad K = \frac{\prod_j \left| s - p_j \right|}{\prod_i \left| s - z_i \right|} .
$$
The angle condition involves no gain at all, so it alone decides the **shape** of the locus; the magnitude condition then labels each point with its gain.
:::

::: proof Where the locus comes from and where it goes {#proof-locus-rules}
**Start and end.** As $K \rightarrow 0$ the characteristic equation $1 + K P = 0$ requires $P \rightarrow \infty$, which happens at the open-loop **poles**; as $K \rightarrow \infty$ it requires $P \rightarrow 0$, which happens at the open-loop **zeros**, finite or infinite. There are $n$ branches, $m$ of them ending at finite zeros and $n - m$ at zeros at infinity. $\checkmark$
**Real-axis segments.** A test point on the real axis receives an angle of $180^{\circ}$ from every real pole or zero to its right and $0^{\circ}$ from every one to its left, while a complex-conjugate pair contributes $\pm \theta$ and $\mp \theta$, cancelling. The angle condition therefore reduces to "an **odd** number of real poles and zeros lie to the right", which is the whole rule. $\checkmark$
**Asymptotes.** For $\left| s \right|$ large the zeros cancel $m$ of the poles and $P (s ) \approx 1 / s^{n - m}$, so the branches at infinity satisfy $s^{n-m} \approx - K$, giving angles
$$
\theta_k = \frac{\left( 2 k + 1 \right) \pi}{n - m},
$$
and expanding $\prod \left( s - p_j \right) \approx s^{n} - s^{n-1} \sum p_j$ shows the asymptotes meet the real axis at the **centroid**
$$
\sigma_a = \frac{\sum_j p_j - \sum_i z_i}{n - m} . \qquad \checkmark
$$
**Departure.** The angle of departure $\theta_p$ from a complex pole $p$ satisfies $\theta_p = 180^{\circ} + \sum_i \angle \left( p - z_i \right) - \sum_{j \ne p} \angle \left( p - p_j \right)$, which is the angle condition evaluated at a point an infinitesimal distance from $p$, where every other pole and zero contributes its exact angle and only the pole itself contributes the unknown. $\checkmark$

*Note.* The rules carry the method's central qualitative message: **zeros attract the branches and poles repel them**. Adding a zero reduces the pole excess $n - m$, so there are fewer asymptotes and they lean less toward the right half-plane (two poles and no zeros give vertical asymptotes; two poles and one zero give a single asymptote along the negative real axis); adding a pole increases $n - m$, and with three or more excess poles the asymptotes at $\pm 60^{\circ}$ must cross into the right half-plane at some gain. Every compensator design is an application — a lead or a PD adds a zero and pulls the branches into a better damping region, a lag adds a pole–zero pair near the origin that barely moves them, and an extra unmodelled high-frequency pole, which the designer did not ask for, bends the whole locus toward instability. This is why the phrase "the extra pole at the amplifier's bandwidth will cost us phase" is not a vague worry.
:::

::: definition Breakaway, crossing and the dominant-pole region {#def-breakaway}
Where two branches leave the real axis, $\mathrm{d} K / \mathrm{d} s = 0$. Since
$$
K = - \frac{1}{P (s )} = - \frac{\prod \left( s - p_j \right)}{\prod \left( s - z_i \right)},
$$
the breakaway points solve
$$
\frac{\mathrm{d}}{\mathrm{d} s} \left[ \frac{\prod \left( s - p_j \right)}{\prod \left( s - z_i \right)} \right] = 0 .
$$
The crossing of the imaginary axis is found by substituting $s = \mathrm{j} \omega$ and separating real and imaginary parts, or more quickly by the Routh test of the previous lesson. The **dominant-pole region** is the wedge about the negative real axis within which the closed-loop damping ratio exceeds the specification and whose distance from the origin sets the settling time: the design point is chosen in it and the gain read off by the magnitude condition.
:::

::: definition Compensator structures on the locus {#def-comp}
Four networks cover most of root-locus design, and each has a picture rather than a formula:

| Compensator | Form | Geometry | Buys | Costs |
|---|---|---|---|---|
| Proportional-derivative | $K \left( s + z \right)$ | one zero, pulls branches left | damping and speed | high-frequency noise |
| Lead | $K \dfrac{s + z}{s + p}, \ z < p$ | zero nearer origin, net phase lead | transient response | gain at high frequency |
| Lag | $K \dfrac{s + z}{s + p}, \ z > p$ | pole nearer origin, near-cancellation | low-frequency gain | a slow closed-loop pole |
| Lead-lag | two pairs | lead for shape, lag for gain | both | two more poles and zeros |

The design procedure is the same in every case: choose the desired dominant-pole location from the time-domain specification, evaluate the angle the plant contributes there, place a **zero** to make up the deficiency, then place the compensator's pole far enough away that its own angle costs less than five or ten degrees. The gain follows from the magnitude condition.
:::

::: widget plot
f: sqrt(2-(x+2)*(x+2))
x: -3.414, -0.586
y: 0, 1.5
labels: Im(s)
caption: The complex part of the root locus of K(s + 2) / (s(s + 1)) is an exact circle centred on the zero at minus two with radius the square root of two, and its rightmost point at minus 0.586 is the breakaway computed from dK/ds = 0. Adding a zero to a plant with two poles bends the locus into a circle that runs to the left of the unmodified locus, which is the geometric reason a derivative term improves damping: the branches that would have gone vertical now curve away toward the zero.
:::

::: example Sketching a third-order locus {#ex-third}
Sketch the locus of $L = K / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right]$ and find the breakaway, the asymptotes and the crossing.
::: solution
**Real axis.** Locus on $\left( - 1 , 0 \right)$ and on $\left( - \infty , - 5 \right)$.
**Asymptotes.** $n - m = 3$, so angles of $\pm 60^{\circ}$ and $180^{\circ}$, meeting at
$$
\sigma_a = \frac{0 - 1 - 5}{3} = - 2.0 .
$$
**Breakaway.** $K = - \left( s^{3} + 6 s^{2} + 5 s \right)$, so $3 s^{2} + 12 s + 5 = 0$,
$$
s = - 0.472 \ \left( \text{valid, on } \left( - 1 , 0 \right) \right), \quad
s = - 3.53 \ \left( \text{rejected, no locus there} \right),
\qquad
K = 0.472 \times 0.528 \times 4.528 = 1.13 .
$$
**Crossing.** From the Routh test, $K = 30$ at $\omega = 2.24\ \mathrm{rad / s}$.

*Check.* The two branches that break away at $- 0.472$ must reach the asymptotes, and the asymptote at $60^{\circ}$ from $\sigma = - 2$ passes through the crossing point $\left( 0 , 2.24 \right)$ only approximately — at a real part of zero the asymptote predicts $\omega = 2 \tan 60^{\circ} = 3.46$, so the true branch bows inward by a third. $\checkmark$

*Sanity.* The inward bow is the reason asymptotes are a **guide** and not the locus, and why the crossing must always be computed rather than read: the asymptotes describe the branches only far from the poles and zeros, while the crossing happens at a moderate distance from them, exactly where the asymptotes are least accurate — here they would put it at $3.46\ \mathrm{rad / s}$ instead of $2.24$.
:::
:::

::: example A zero bends the locus {#ex-circle}
Show that the complex branches of the locus of $L = K (s + 2 ) / \left[ s \left( s + 1 \right) \right]$ lie on a circle, and find the breakaway.
::: solution
The angle condition at $s = \sigma + \mathrm{j} \omega$ is
$$
\arctan \frac{\omega}{\sigma + 2} - \arctan \frac{\omega}{\sigma} - \arctan \frac{\omega}{\sigma + 1} = 180^{\circ} .
$$
Taking tangents and simplifying with $\tan ( A + B + C )$ collapses the relation to
$$
\left( \sigma + 2 \right)^{2} + \omega^{2} = 2 ,
$$
a circle centred on the zero at $- 2$ with radius $\sqrt{2}$. The breakaway is its rightmost point, $\sigma = - 2 + \sqrt{2} = - 0.586$, and the same value follows from
$$
\frac{\mathrm{d}}{\mathrm{d} s} \frac{s \left( s + 1 \right)}{s + 2} = 0
\quad\Longrightarrow\quad
s^{2} + 4 s + 2 = 0 ,
$$
whose root in $\left( - 1 , 0 \right)$ is $- 0.586$. $\checkmark$

*Sanity.* Without the zero the two poles of $K / \left[ s \left( s + 1 \right) \right]$ break away at $- 0.5$ and travel **vertically** — the real part is pinned at $- 0.5$ for every gain, so the settling time is fixed at eight seconds and only the overshoot changes. Adding a zero at $- 2$ curves the branches left: the least-damped point of the circle is where it touches the $\zeta = 0.707$ line, at $- 1 \pm \mathrm{j}$, so the closed-loop damping never falls below $0.707$ at any gain, and at that point the real part is $- 1$ against $- 0.5$ — twice as fast. That is the whole of derivative action in one picture, and it is why the construction rule "put a zero near the dominant poles" is the first move in every root-locus design.
:::
:::

::: example Design by dominant poles {#ex-lead}
A position axis has $G = 1 / \left[ s \left( s + 1 \right) \right]$. Design a proportional-plus-derivative controller to place the closed-loop poles at $s = - 2 \pm 2\ \mathrm{j}$.
::: solution
**Angle deficiency.** At $s = - 2 + 2\ \mathrm{j}$,
$$
\angle s = 135.0^{\circ}, \qquad \angle \left( s + 1 \right) = 116.6^{\circ},
\qquad \text{total} = - 251.6^{\circ},
$$
so the plant is $71.6^{\circ}$ short of the angle condition and the controller's zero must supply exactly that.
**Place the zero.** A zero at $- z$ subtends $\arctan \left[ 2 / \left( z - 2 \right) \right] = 71.6^{\circ}$ at the design point, so
$$
z = 2 + \frac{2}{\tan 71.6^{\circ}} = 2 + 0.667 = 2.67 .
$$
**Gain from the magnitude condition.**
$$
K = \frac{\left| s \right| \, \left| s + 1 \right|}{\left| s + 2.67 \right|}
= \frac{2.828 \times 2.236}{2.108} = 3.00 .
$$
**Check.** The characteristic equation is $s^{2} + \left( 1 + K \right) s + 2.67 K = s^{2} + 4 s + 8$, with roots exactly at $- 2 \pm 2\ \mathrm{j}$. $\checkmark$
$$
\omega_n = 2.83\ \mathrm{rad / s}, \quad \zeta = 0.707, \quad
M_p = 4.3\ \% \ \text{(pole pair alone)}, \quad t_s = 2.0\ \mathrm{s}, \quad
K_v = K z = 8.0\ \mathrm{s^{- 1}} .
$$
The closed loop $T = 3 \left( s + 2.67 \right) / \left( s^{2} + 4 s + 8 \right)$ also has the controller's **zero** at $- 2.67$, close to the dominant pair, and a simulated step overshoots by $11.9$ per cent rather than $4.3$ — see [[#proof-dominant]].
*Sanity.* The proportional-only loop at the same natural frequency would need $K = 8$ and would have $\zeta = 1 / \left( 2 \sqrt{8} \right) = 0.18$, a fifty-seven per cent overshoot and a real part pinned at $- 0.5$. The derivative has bought a factor of four in settling time and of about five in overshoot ($57$ to $12$ per cent) for the price of one zero — and of the noise that zero amplifies, since a real derivative must be filtered and the filter takes back some of the phase at high frequency. Note also that $K_v = 8$ is the same as the proportional-only loop's: the PD has bought the damping without giving up any steady-state accuracy.
:::
:::

::: example Lag compensation {#ex-lag}
The design of [[#ex-lead]] has $K_v = 8\ \mathrm{s^{- 1}}$ but the specification demands $80\ \mathrm{s^{- 1}}$. Add a lag without disturbing the dominant poles.
::: solution
A lag network of ratio $\beta = 10$ placed very near the origin,
$$
C_{lag} (s ) = \frac{s + 0.10}{s + 0.010} ,
$$
multiplies the low-frequency gain by ten while contributing at the design point
$$
\angle \left( s + 0.10 \right) - \angle \left( s + 0.010 \right)
= 133.5^{\circ} - 134.9^{\circ} = - 1.3^{\circ}
$$
of phase, which moves the locus by less than the drawing's line width. The velocity constant becomes
$$
K_v = 8 \times \frac{0.10}{0.010} = 80\ \mathrm{s^{- 1}} .
$$
*Check.* The closed-loop poles are $- 1.95 \pm 2.02\ \mathrm{j}$ — barely moved — and $- 0.101$, the lag's own slow pole, which sits just below the lag zero at $- 0.10$. Its residue in the step response is $0.011$, so it contributes a slow tail of about one per cent of the step, decaying with a time constant of about $10\ \mathrm{s}$. $\checkmark$

*Sanity.* The lag's cost is not the $1.3^{\circ}$ of phase but the **slow tail** it inserts: the closed loop acquires a pole near $- 0.101$ and a zero at $- 0.10$ which almost, but not quite, cancel, and the residue of the near-cancellation is a long low exponential that is invisible on a two-per-cent settling-time plot and dominant in a loop that must settle to a tenth of a per cent. The design rule is to keep the lag's zero at least a decade below the dominant pair's real part, so that its phase cost is small, and to accept or explicitly specify the tail — or to use a feedforward path instead when the specification is on the tail rather than on the settling time.
:::
:::

::: example Positive feedback and the zero-degree locus {#ex-positive}
A load-cell amplifier has been wired with its sense lead reversed, so that a loop with $L = K / \left[ \left( s + 1 \right)\left( s + 2 \right)\left( s + 5 \right) \right]$ closes with **positive** feedback. Sketch the locus and find the stabilising range of $K$.
::: solution
The characteristic equation is $1 - K P = 0$, so $P = + 1 / K$ and the **angle condition becomes $0^{\circ}$ modulo $360^{\circ}$**. Every rule reverses:
**Real axis.** Locus where an **even** number of poles and zeros lie to the right, so on $\left( - 1 , \infty \right)$ and on $\left( - 5 , - 2 \right)$ — the complements of the negative-feedback case.
**Asymptotes.** $\theta_k = 2 k \pi / 3 = 0^{\circ}$, $\pm 120^{\circ}$, meeting at $\sigma_a = \left( - 1 - 2 - 5 \right) / 3 = - 2.67$. One branch runs straight right along the real axis.
**Breakaway.** $K = s^{3} + 8 s^{2} + 17 s + 10$ gives $3 s^{2} + 16 s + 17 = 0$, so $s = - 3.87$ on the $\left( - 5 , - 2 \right)$ segment.
**Stability.** The characteristic polynomial is
$$
s^{3} + 8 s^{2} + 17 s + \left( 10 - K \right) = 0,
$$
whose necessary condition requires $K < 10$. At $K = 10$ it factors as $s \left( s^{2} + 8 s + 17 \right)$, so the crossing is at the **origin** and the other two roots are at $- 4 \pm \mathrm{j}$.

*Sanity.* The instability is through a **real** pole and not through an oscillation: the branch that starts at $- 1$ walks right along the real axis, crosses at $K = 10$ and diverges monotonically. This is the diagnostic that distinguishes a sign error from a tuning error in the field — a loop that diverges without oscillating has the wrong sign or a positive stiffness term, while a loop that oscillates at a finite frequency has simply been over-gained — and it is worth knowing because a reversed sense lead is a common commissioning fault. The other two branches leave the breakaway at $- 3.87$ along the $\pm 120^{\circ}$ asymptotes into the left half-plane, so the real branch is the only route to instability.
:::
:::

::: example Design {#ex-design-joint}
A robot joint has inertia $J = 0.02\ \mathrm{kg\, m^{2}}$, negligible friction and a motor whose electrical dynamics are fast enough to be a gain of $K_m = 5\ \mathrm{N\, m / V}$. The gearbox reflects a load and gives a total inertia of $0.05\ \mathrm{kg\, m^{2}}$ at the motor. The specification is a two-per-cent settling time of $0.4\ \mathrm{s}$, closed-loop poles with a damping ratio of at least $0.69$ (the value that gives five per cent overshoot for a pole pair alone) and a ramp error under $0.5^{\circ}$ at $1\ \mathrm{rad / s}$. Design the loop.
::: solution
**Plant.** $G = K_m / \left( J s^{2} \right) = 5 / \left( 0.05 s^{2} \right) = 100 / s^{2}$ — a double integrator, whose proportional-only locus lies on the imaginary axis, so a zero is required.
**Specification.** $t_s = 4 / \zeta \omega_n \le 0.4$ gives $\zeta \omega_n \ge 10$, and with $\zeta \ge 0.69$, so $\omega_n \ge 14.5\ \mathrm{rad / s}$ and the design point is
$$
s = - 10 \pm 10.3\ \mathrm{j} .
$$
**PD.** At $s = - 10 + 10.3\ \mathrm{j}$ each of the plant's two integrators contributes $\arctan \left( 10.3 / - 10 \right)$, that is $134.2^{\circ}$, for a total of $268.4^{\circ}$. The zero must supply $268.4 - 180 = 88.4^{\circ}$, so
$$
z = 10 + \frac{10.3}{\tan 88.4^{\circ}} = 10 + 0.31 = 10.31 ,
$$
and the magnitude condition gives
$$
K = \frac{\left| s \right|^{2}}{100 \left| s + 10.31 \right|} = \frac{206.1}{100 \times 10.31} = 0.20 .
$$
**Check.** The characteristic equation is $s^{2} + 100 K \left( s + z \right) = s^{2} + 20 s + 206$, with roots $- 10 \pm 10.3\ \mathrm{j}$, $\omega_n = 14.4\ \mathrm{rad / s}$ and $\zeta = 0.70$.
**Ramp error.** $K_v = \lim_{s \to 0} s \times 0.20 \left( s + 10.31 \right) \times 100 / s^{2} = \infty$, so the ramp error is **zero** and the specification is met with room; the acceleration constant is $K_a = 206\ \mathrm{s^{- 2}}$, giving $1 / 206\ \mathrm{rad} = 0.28^{\circ}$ of error at an acceleration of $1\ \mathrm{rad / s^{2}}$.
**Step response.** The closed loop $T = \left( 20 s + 206 \right) / \left( s^{2} + 20 s + 206 \right)$ has a zero at $- 10.3$, and a simulated step settles in $0.34\ \mathrm{s}$ but overshoots by $21$ per cent. That is unavoidable in a type-2 loop: for a step, $\int_0^{\infty} e \,\mathrm{d}t = 1 / K_v = 0$, so the error must change sign.

*Design comment.* The pole placement is exact, but the step overshoot shows why robot joints are not commanded with steps: a trajectory generator supplies a smooth position reference, usually with velocity and acceleration feedforward, and the type-2 loop then tracks it with very small error. What the arithmetic does not show is three things that decide the machine. The first is the **friction** neglected in the model: with PD control Coulomb friction leaves a small steady position error, and once integral action is added to remove it the joint can stick–slip in a limit cycle; the cures are friction compensation or an observer, not simply more gain. The second is the **gear compliance**: if the gearbox's torsional stiffness referred to the motor is about $2000\ \mathrm{N\, m / rad}$, the torsional resonance is near $\sqrt{2000 / 0.05} / 2 \pi = 32\ \mathrm{Hz}$, about nine times the $3.5\ \mathrm{Hz}$ crossover — enough, but not infinitely so. The third is that the zero at $- 10.3$ is a **derivative**, and a derivative of a position measured on the motor side sees the gear's wind-up rather than the load's motion, which is one reason high-performance joints add a position sensor on the **output** flange.
:::
:::

::: proof Why dominant poles dominate {#proof-dominant}
For a pair of poles $p_{1,2}$ and a distant real pole $p_3 = - p$ the step response is
$$
y (t ) = 1 + A e^{p_1 t} + A^{*} e^{p_2 t} + B e^{p_3 t},
\qquad
B = \lim_{s \to p_3} \left( s - p_3 \right) \frac{T (s )}{s} .
$$
Writing $T = \omega_n^{2} p / \left[ \left( s^{2} + 2 \zeta \omega_n s + \omega_n^{2} \right)\left( s + p \right) \right]$ (unit DC gain, no zeros) with $p \gg \omega_n$, the distant residue is
$$
B = - \frac{\omega_n^{2}}{p^{2} - 2 \zeta \omega_n p + \omega_n^{2}}
\approx - \frac{\omega_n^{2}}{p^{2}} \rightarrow 0
$$
as $p$ grows, while the dominant residues tend to constants of order unity. The distant pole contributes a term of relative size about $\omega_n^{2} / p^{2}$: for $\zeta = 0.7$, a pole at $p = 5 \omega_n$ gives $\left| B \right| = 1 / 19 = 5$ per cent and one at $p = 10 \omega_n$ gives $1 / 87 = 1.1$ per cent, both decaying much faster than the dominant terms. $\checkmark$

*Note.* The estimate assumes that the closed loop has no **zero** near the dominant pair, and that is where the approximation breaks. A zero at $- z$ multiplies the pair's response by $\left( s / z + 1 \right)$, adding $1 / z$ times the **derivative** of the zero-free step response to it: for $\zeta = 0.5$ the overshoot of $16$ per cent becomes $22$ per cent with a zero at $- 1.5 \omega_n$ and $30$ per cent with one at $- \omega_n$, while the pole locations are untouched — which is why a design placed by pole location alone (as in [[#ex-lead]]) can overshoot by more than the damping ratio promised. The rule that follows is to check the **zeros** of the closed-loop transfer function as well as its poles, and to regard any closed-loop zero that lies within $1.5 \omega_n$ of the origin as part of the design rather than as a detail.
:::

::: history
The method is **Walter R. Evans**'s. Working on aircraft guidance and control problems at North American Aviation in the late 1940s, he wanted to see how all the closed-loop poles moved as a gain was changed, where the frequency methods of **Nyquist** and **Bode** gave the answer one frequency at a time. He published the idea as "Graphical analysis of control systems" in the *Transactions of the AIEE* in 1948 and the design procedure as "Control system synthesis by root locus method" in the same journal in 1950; his textbook *Control-System Dynamics* followed in 1954. Evans also devised the **Spirule**, a transparent protractor with a pivoting arm for adding angles and multiplying distances on the $s$-plane, which made the construction quick by hand in the decades before computers drew the locus. Within about a decade the root locus had joined the frequency-response methods as a standard part of control courses.
:::

::: quiz
A root-locus branch leaves the real axis. What is true at that point?
- [x] The gain there satisfies $\mathrm{d} K / \mathrm{d} s = 0$, and the branches leave at $\pm 90^{\circ}$ to the axis
- [ ] The gain is zero
- [ ] The damping ratio is exactly $0.707$
- [ ] An open-loop zero is present there
::: solution
Breakaway and entry points are the extrema of $K$ along the real axis, so $\mathrm{d} K / \mathrm{d} s = 0$ there, and the two branches leave symmetrically at $\pm 90^{\circ}$ because the angle condition must hold on both sides of a point where the real-axis contributions from the coincident poles exactly cancel. The damping ratio at the breakaway is whatever the geometry gives and is usually far from $0.707$ — which is why a designer who wants a particular damping ratio places the closed-loop poles directly and reads off the required gain, rather than hoping the breakaway lands somewhere useful.
:::
:::

## Where this leads

The damping ratio and settling time read off the design region are the time-domain quantities of [[control-systems/time-response]], the crossing gain computed by Routh is the subject of [[control-systems/feedback-stability]], the same design point read from a Bode plot is the frequency-domain equivalent developed in [[control-systems/frequency-response]], and the flexible mode that limits the joint design of [[#ex-design-joint]] is the two-degree-of-freedom resonance of [[vibrations/two-degrees-of-freedom]].

::: summary
- The angle condition decides the shape of the locus and involves no gain; the magnitude condition supplies the gain and involves only distances.
- Branches start at open-loop poles and end at zeros; the real-axis rule is an odd count to the right; the asymptotes meet at the centroid; zeros attract branches and poles repel them.
- Breakaway points come from dK/ds = 0 and imaginary-axis crossings from Routh — both must be computed, because asymptotes are wrong exactly where the answer is needed.
- A zero near the origin bends the locus left and buys damping; a pole near the origin in a lag pair buys low-frequency gain and costs a slow tail.
- Positive feedback reverses the angle condition and gives a zero-degree locus, one of whose asymptotes runs along the positive real axis.
- The method designs for one parameter and one model; the professional use is to choose a design point and verify it independently.
:::

## Exercises

::: exercise Branches {level=1 check="3"}
How many branches does the locus of $K / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right]$ have?
::: solution
Three — one per open-loop pole.
:::
:::

::: exercise Asymptotes {level=1 check="-2"}
What is the asymptote centroid of $K / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right]$?
::: solution
$\left( 0 - 1 - 5 \right) / 3 = - 2$.
:::
:::

::: exercise Real axis {level=1 check="2"}
For the locus of $K / \left[ s \left( s + 1 \right)\left( s + 5 \right) \right]$, how many separate intervals of the real axis belong to the locus?
::: solution
Two: $\left( - 1 , 0 \right)$, where one pole lies to the right, and $\left( - \infty , - 5 \right)$, where three do. The rule is an odd count of real poles and zeros to the right, because each contributes $180^{\circ}$ and only an odd number adds to $180^{\circ}$ modulo $360^{\circ}$. Complex pairs contribute nothing since their angles cancel in pairs.
:::
:::

::: exercise Starts and ends {level=1 check="0"}
At what value of the gain does a root-locus branch leave an open-loop pole?
::: solution
Zero.
:::
:::

::: exercise Asymptote angles {level=2}
Find the asymptote angles and centroid of $K \left( s + 3 \right) / \left[ s^{2} \left( s + 2 \right)\left( s + 6 \right) \right]$.
::: solution
$n - m = 3$, so angles of $\pm 60^{\circ}$ and $180^{\circ}$, and
$$
\sigma_a = \frac{\left( 0 + 0 - 2 - 6 \right) - \left( - 3 \right)}{3} = - 1.67 .
$$
*Sanity.* The double pole at the origin contributes two branches that leave at $\pm 90^{\circ}$ by the departure rule — and they bend into the **right** half-plane, because the zero at $- 3$ lies to the left of the pole at $- 2$ and cannot pull them back. Routh confirms it: the characteristic polynomial $s^{4} + 8 s^{3} + 12 s^{2} + K s + 3 K$ has an $s^{1}$ entry $K \left[ 1 - 192 / \left( 96 - K \right) \right]$, negative for every $K > 0$, so the loop is unstable at every gain. A type-2 loop needs its lead zero closer to the origin than the other plant poles; a sketch that takes ninety seconds shows this before any algebra.
:::
:::

::: exercise Breakaway {level=2}
Find the breakaway point of $K / \left[ s \left( s + 4 \right) \right]$.
::: solution
$K = - s \left( s + 4 \right)$, so $\mathrm{d} K / \mathrm{d} s = - \left( 2 s + 4 \right) = 0$ gives $s = - 2$, which is the midpoint of the two poles.
*Sanity.* For a two-pole plant with no zeros the breakaway is always the midpoint and the locus is the vertical line through it, which is the reason a plain proportional controller on a second-order plant can change the overshoot but never the settling time — the real part of the closed-loop pair is pinned at the average of the open-loop poles. Every lead or rate-feedback design exists to break that pin, and the picture of it breaking is the single most useful thing the root locus teaches.
:::
:::

::: exercise Crossing {level=2}
For $K / \left[ \left( s + 1 \right)\left( s + 2 \right)\left( s + 3 \right) \right]$, find the crossing gain and frequency.
::: solution
The characteristic polynomial is $s^{3} + 6 s^{2} + 11 s + \left( 6 + K \right)$, so
$$
6 \times 11 > 6 + K \quad\Longrightarrow\quad K = 60 ,
$$
and the auxiliary equation $6 s^{2} + 66 = 0$ gives $\omega = 3.32\ \mathrm{rad / s}$.
*Sanity.* The three poles are all slower than the crossing frequency of $3.3\ \mathrm{rad / s}$, which is the general pattern: a loop goes unstable at a frequency somewhere among or above its plant's own break frequencies, and this is why the observed oscillation period of a destabilised loop identifies the plant lags responsible. A commissioning engineer who has counted the period of an oscillation knows the frequency at which the loop's phase passes through $180^{\circ}$, and can therefore tell which of three lags is the one to attack.
:::
:::

::: exercise Design {level=3}
For the plant of [[#ex-lead]], place the closed-loop poles at $s = - 3 \pm 3\ \mathrm{j}$ instead and find the PD settings.
::: solution
At the new design point the plant contributes
$$
\angle s = 135.0^{\circ}, \qquad \angle \left( s + 1 \right) = 123.7^{\circ} \ \text{at} \ s = - 3 + 3\ \mathrm{j},
$$
so the total is $258.7^{\circ}$ and the zero must supply $78.7^{\circ}$, placing it at
$$
z = 3 + \frac{3}{\tan 78.7^{\circ}} = 3.60,
\qquad
K = \frac{\left| s \right| \left| s + 1 \right|}{\left| s + 3.60 \right|} = \frac{4.243 \times 3.606}{3.060} = 5.00 .
$$
The characteristic equation is $s^{2} + 6 s + 18 = 0$, with roots $- 3 \pm 3\ \mathrm{j}$ exactly.
*Sanity.* The zero must supply $78.7^{\circ}$, and a zero on the real axis can supply $90^{\circ}$ only when it lies directly below the design point; needing less than a right angle, it sits a little to the left. The general rule follows: if the deficiency exceeds $90^{\circ}$ the zero must sit to the **right** of the design point, and if it would have to lie in the right half-plane — or the deficiency approaches $180^{\circ}$ — a single zero cannot do the job and a lead pair or a second zero is needed.
:::
:::

::: exercise Lag {level=3}
For the design of [[#ex-lead]], the specification now demands $K_v = 40\ \mathrm{s^{- 1}}$. Choose the lag pair and estimate the phase it costs at the design point.
::: solution
The required ratio is $40 / 8 = 5$. Placing the zero more than a decade below the dominant real part of $- 2$, take
$$
\frac{s + 0.12}{s + 0.024},
\qquad
\angle \left( s + 0.12 \right) - \angle \left( s + 0.024 \right)
= 133.2^{\circ} - 134.7^{\circ} = - 1.4^{\circ}.
$$
*Sanity.* A degree and a half of phase at the design point barely moves the dominant pair; the real cost is the closed-loop pole near $- 0.12$, whose exponential tail is still at two per cent of its initial value after $\ln 50 / 0.12 = 32\ \mathrm{s}$ — sixteen times the settling time of the dominant pair. A specification written as "settles in two seconds" is met; one written as "within one per cent" is not, and the difference is the lag.
:::
:::

::: exercise Derivation {level=3}
Derive the circle result of [[#ex-circle]] for a general zero at $- z$ and poles at $0$ and $- 1$, and state for which values of $z$ the locus has complex branches at all.
::: solution
The angle condition
$$
\arctan \frac{\omega}{\sigma + z} = 180^{\circ} + \arctan \frac{\omega}{\sigma} + \arctan \frac{\omega}{\sigma + 1}
$$
has tangent
$$
\frac{\omega}{\sigma + z} = \frac{\dfrac{\omega}{\sigma} + \dfrac{\omega}{\sigma + 1}}{1 - \dfrac{\omega^{2}}{\sigma \left( \sigma + 1 \right)}} ,
$$
which on clearing denominators reduces to
$$
\left( \sigma + z \right)^{2} + \omega^{2} = z \left( z - 1 \right) .
$$
The radius is real only for $z > 1$ or $z < 0$ (a right-half-plane zero, whose circle reaches into the right half-plane): with the zero **between** the two poles, $0 < z < 1$, the branches stay on the real axis and there is no overshoot from complex poles at any gain.
*Sanity.* The condition $z > 1$ is the derivative term's design rule in one inequality — a zero placed to the **left** of the pole at $- 1$ bends the locus and buys damping, while a zero placed between the poles merely changes the real-axis distribution and can never produce oscillation. The degenerate case $z = 1$ cancels the plant's pole exactly and gives a single first-order closed loop for every gain, which is the "pole-zero cancellation" design that works perfectly in arithmetic and badly in practice, because the cancelled pole is still there in every state variable the output does not show.
:::
:::
