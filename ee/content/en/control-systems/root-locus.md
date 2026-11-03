In [[control-systems/stability]] we found that the position servo with a slow power amplifier is stable for amplifier gains below $13.3\,\mathrm{V/rad}$ and oscillates at $112\,\mathrm{rad/s}$ at that limit. That answers one question, but a designer wants to know much more: where are the closed-loop poles for a gain of $2$, or $5$? Which gain gives a damping ratio of $0.5$? And if no gain gives an acceptable response, what should be added to the loop? Computing the roots of the characteristic polynomial for many gains would answer the first two questions by brute force, but not the third.

In 1948 Walter Evans showed that the paths traced by the closed-loop poles as a gain rises from zero to infinity — the **root locus** — can be sketched quickly by hand from a few rules that follow from one simple fact: a point $s$ is a closed-loop pole exactly when the loop gain there has phase $180^\circ$ and magnitude $1$. The sketch shows at a glance how the poles move, where the loop goes unstable, and what effect an added pole or zero will have. That makes the root locus as much a design tool as an analysis tool. This chapter derives the rules, applies them to the motor servo and to the buck converter of [[control-systems/modelling-dynamic-systems]], and uses the locus to choose gains and to place a compensator zero. Software draws exact loci in an instant; the value of the rules is that they tell you what the plot will look like before you compute it, and what to change when it looks wrong.

## The angle and magnitude conditions

Write the loop gain as a positive gain $K$ times a fixed rational function with monic numerator and denominator,

$$
L(s) = KG(s) = K\,\frac{(s - z_1)(s - z_2)\cdots(s - z_m)}{(s - p_1)(s - p_2)\cdots(s - p_n)},
$$ {#eq-loop-form}

with $m$ open-loop zeros $z_i$ and $n \ge m$ open-loop poles $p_j$. The closed-loop poles are the roots of $1 + KG(s) = 0$, equivalently of $D(s) + KN(s) = 0$.

::: definition Root locus {#def-root-locus}
The **root locus** of the loop [[#eq-loop-form]] is the set of points of the $s$-plane that are roots of $1 + KG(s) = 0$ for some $K \ge 0$, together with the values of $K$ at which they occur. Each closed-loop pole traces a continuous curve, a **branch**, as $K$ rises from $0$ to $\infty$.
:::

::: theorem Angle and magnitude conditions {#thm-conditions}
A point $s_0$ lies on the root locus if and only if

$$
\angle G(s_0) = \sum_{i=1}^{m}\angle(s_0 - z_i) - \sum_{j=1}^{n}\angle(s_0 - p_j) = \pm180^\circ(2k + 1),\quad k = 0, 1, \dots
$$ {#eq-angle}

and the gain that places a closed-loop pole there is

$$
K = \frac{1}{\abs{G(s_0)}} = \frac{\prod_j\abs{s_0 - p_j}}{\prod_i\abs{s_0 - z_i}} .
$$ {#eq-magnitude}
:::

::: proof
$1 + KG(s_0) = 0$ means $KG(s_0) = -1$. A complex number equals $-1$ exactly when its magnitude is $1$ and its angle is an odd multiple of $180^\circ$. Since $K > 0$ contributes no angle, the angle condition involves $G$ alone, and once it holds, $K = 1/\abs{G(s_0)}$ satisfies the magnitude condition. The angle of a product is the sum of the angles of the factors, and of a quotient the difference, which gives the sum form of [[#eq-angle]].
:::

The geometric reading of [[#eq-angle]] is what makes the method work by hand. Each factor $s_0 - z_i$ is a vector drawn from the zero $z_i$ to the trial point $s_0$, and $s_0 - p_j$ a vector from the pole $p_j$. A point is on the locus when the angles of the zero vectors minus the angles of the pole vectors add up to $180^\circ$; the gain there is the product of the pole-vector lengths divided by the product of the zero-vector lengths.

::: quiz
A loop gain $K/(s(s + 4))$ has its closed-loop poles at $s = -2 \pm 2j$ for some $K$. What is that $K$?
- [ ] $4$
- [x] $8$
- [ ] $2\sqrt2$
- [ ] $16$
::: solution
By [[#eq-magnitude]], $K = \abs{s_0}\,\abs{s_0 + 4}$ with $s_0 = -2 + 2j$: both vectors have length $\sqrt{8}$, so $K = 8$. Check: $s^2 + 4s + 8$ has roots $-2 \pm 2j$. The angle condition also holds: the vectors from $0$ and from $-4$ make angles of $135^\circ$ and $45^\circ$, and $-(135^\circ + 45^\circ) = -180^\circ$.
:::
:::

## The construction rules

The conditions of [[#thm-conditions]] lead to a handful of rules that fix the shape of a locus. Each is a consequence of $D(s) + KN(s) = 0$ or of the angle condition.

::: theorem Root-locus construction rules {#thm-rules}
For the loop [[#eq-loop-form]] with $K \ge 0$:

1. **Number of branches and symmetry.** There are $n$ branches, one per closed-loop pole, and the locus is symmetric about the real axis.
2. **Start and end points.** The branches start ($K = 0$) at the open-loop poles. As $K \to \infty$, $m$ branches end at the open-loop zeros and the other $n - m$ go to infinity.
3. **Real axis.** A point on the real axis lies on the locus if and only if the total number of real open-loop poles and zeros to its right is odd.
4. **Asymptotes.** The $n - m$ branches that go to infinity approach straight lines at angles
$$
\theta_k = \frac{(2k + 1)\,180^\circ}{n - m},\qquad k = 0, 1, \dots, n - m - 1,
$$
radiating from the **centroid** on the real axis
$$
\sigma_a = \frac{\sum_j p_j - \sum_i z_i}{n - m}.
$$ {#eq-centroid}
5. **Breakaway and break-in points.** Where branches meet on the real axis and leave it (or arrive and join it), $\dd K/\dd s = 0$, that is
$$
N(s)\,D'(s) - N'(s)\,D(s) = 0 .
$$ {#eq-breakaway}
6. **Imaginary-axis crossings** are found by setting $s = j\omega$ in $D + KN = 0$, or from the row of zeros of the Routh array ([[control-systems/stability]]).
7. **Angles of departure and arrival.** The angle at which a branch leaves a complex pole $p_\ell$ is
$$
\theta_{dep} = 180^\circ + \sum_i\angle(p_\ell - z_i) - \sum_{j\neq\ell}\angle(p_\ell - p_j),
$$ {#eq-departure}
and the angle at which a branch arrives at a complex zero is found in the same way.
:::

::: proof
**1.** $D + KN$ has degree $n$ (since $m \le n$), so it has $n$ roots, which depend continuously on $K$. Its coefficients are real, so complex roots come in conjugate pairs.

**2.** At $K = 0$ the equation is $D(s) = 0$. Writing it as $N(s) + D(s)/K = 0$ shows that as $K \to \infty$ the roots approach the roots of $N$; with only $m$ such roots, the remaining $n - m$ must grow without bound.

**3.** For a real trial point $\sigma$, a complex pair of poles or zeros contributes equal and opposite angles, which cancel. A real pole or zero to the left of $\sigma$ contributes $0^\circ$; one to the right contributes $180^\circ$. The total angle is $180^\circ$ times the number of real poles and zeros to the right, which is an odd multiple of $180^\circ$ exactly when that number is odd.

**4.** For large $\abs{s}$, $G(s) \approx 1/s^{n - m}$ to leading order, so the angle condition becomes $-(n - m)\angle s = (2k + 1)180^\circ$, giving the angles. For the centroid, expand $G(s)^{-1} = s^{n - m}\bigl(1 - (\sum p_j - \sum z_i)/s + \dots\bigr) \approx (s - \sigma_a)^{n - m}$ for large $s$, by the binomial theorem; so far away the locus looks like that of $K/(s - \sigma_a)^{n - m}$, whose branches are straight rays from $\sigma_a$.

**5.** On the real axis, $K = -D(\sigma)/N(\sigma)$ is real. Between two poles, $K$ is zero at both ends and positive in between, so it has a maximum; at that point two real roots coincide (a double root of $D + KN$) and then leave the axis as a complex pair. A double root satisfies both $D + KN = 0$ and $D' + KN' = 0$; eliminating $K$ gives [[#eq-breakaway]], which is the same as $\dd K/\dd s = 0$.

**6.** On the imaginary axis the real and imaginary parts of $D(j\omega) + KN(j\omega)$ must both vanish, giving two equations for $\omega$ and $K$.

**7.** Apply the angle condition to a point very close to $p_\ell$. All vectors except the one from $p_\ell$ itself have essentially the angles they have at $p_\ell$; the vector from $p_\ell$ has the unknown angle $\theta_{dep}$. Solving [[#eq-angle]] for $\theta_{dep}$ gives [[#eq-departure]].
:::

::: remark The centre of gravity is fixed
When $n - m \ge 2$, the coefficient of $s^{n-1}$ in $D + KN$ does not depend on $K$, so the sum of the closed-loop poles is constant. If some branches move left, others must move right. This is why a high-gain loop with three or more excess poles always goes unstable: as two branches dive left along the real axis, the complex pair is pushed to the right.
:::

::: example The motor servo's root locus {#ex-servo-locus}
Sketch the root locus of the position servo of [[control-systems/stability#ex-servo-range]], $L(s) = K/[s(s + 63)(s + 200)]$ with $K = 250\,000K_a$.
::: solution
**Branches.** $n = 3$, $m = 0$: three branches, all going to infinity, starting at $0$, $-63$ and $-200$.

**Real axis.** Points between $0$ and $-63$ have one pole to their right (odd): on the locus. Between $-63$ and $-200$ there are two: not on the locus. Left of $-200$, three: on the locus.

**Asymptotes.** Angles $60^\circ$, $180^\circ$ and $300^\circ$ ($= -60^\circ$) from the centroid $\sigma_a = (0 - 63 - 200)/3 = -87.7$.

**Breakaway.** With $N = 1$, [[#eq-breakaway]] becomes $D'(s) = 0$: $3s^2 + 526s + 12\,600 = 0$, with roots $-28.6$ and $-146.7$. Only $-28.6$ lies on a real-axis segment of the locus, so the branches from $0$ and $-63$ meet at $s = -28.6$, at gain $K = 28.6\times34.4\times171.4 = 1.69\times10^5$ ($K_a = 0.67$), and leave the axis vertically there.

**Crossing.** From the Routh array, the imaginary axis is crossed at $\pm112\,j$ when $K = 263\times12\,600 = 3.31\times10^6$ ($K_a = 13.3$).

So: the third branch runs from $-200$ to $-\infty$ along the real axis; the other two approach each other along the axis, break away at $-28.6$, curve upward and downward, bending to the right to approach the $\pm60^\circ$ asymptotes from $-87.7$, and cross into the right half-plane at $\pm112\,j$. The loop is stable for $0 < K_a < 13.3$, and the complex pair becomes less damped the higher the gain.
:::
:::

::: widget complexmap
f: 1 + 10000*K/(z*(z + 63)*(z + 200))
mode: domain
x: -260, 40
y: -150, 150
sliders: K=1:1:400:1
caption: Domain colouring of $1 + L(s)$ for the servo of [[#ex-servo-locus]] with $L = 10^4K/[s(s + 63)(s + 200)]$; the slider $K$ is the gain in units of $10^4$ (so $K_a = K/25$). The zeros of $1 + L$, where all colours meet around a dark point, are the closed-loop poles; the open-loop poles at $0$, $-63$ and $-200$ are the bright points. Increase $K$ from $1$: two zeros approach each other between $0$ and $-63$, meet near $-28.6$ at $K \approx 17$, split into a complex pair that follows the $\pm60^\circ$ asymptotes, and cross the imaginary axis at $K \approx 331$.
:::

::: widget plot
f: -x*(x + 63)*(x + 200)/10000
x: -70, 5
y: -5, 20
vlines: -28.6
labels: K(\sigma) = -D(\sigma)/N(\sigma)\ \ (\times10^4)
caption: The gain $K = -D(\sigma)$ needed to place a closed-loop pole at the real point $\sigma$, for the servo of [[#ex-servo-locus]] (in units of $10^4$). On the locus segment between $-63$ and $0$ it is positive, zero at both poles, and greatest at the breakaway point $\sigma = -28.6$, where $K = 16.9\times10^4$: for larger gains no real roots remain in this segment, because the two poles have left the axis as a complex pair.
:::

## Choosing a gain from the locus

Once the locus is sketched, the specifications of [[control-systems/time-response]] become a geometric question. A damping ratio $\zeta$ corresponds to a ray at angle $\arccos\zeta$ from the negative real axis; the closed-loop pole with that damping is where the locus crosses the ray, and the magnitude condition gives the gain.

::: algorithm Choosing a gain for a damping ratio {#alg-gain}
1. Draw the ray $s = r\,e^{j(180^\circ - \arccos\zeta)}$, $r > 0$.
2. Find $r$ where the angle condition [[#eq-angle]] holds along the ray (graphically, or by a one-variable search).
3. Compute $K$ at that point from [[#eq-magnitude]].
4. Find the remaining closed-loop poles at this $K$ (for example by dividing the known quadratic factor out of $D + KN$) and check that they are far enough left for the pair to dominate.
5. Confirm the design by simulating the step response.
:::

::: example A damping ratio of 0.5 {#ex-zeta-half}
Choose $K_a$ for the servo of [[#ex-servo-locus]] so that the dominant poles have $\zeta = 0.5$. Find all closed-loop poles, the velocity error constant and the overshoot.
::: solution
The ray for $\zeta = 0.5$ is at $60^\circ$ from the negative real axis: $s = r(-0.5 + 0.866j)$. At a trial point the angles of the three pole vectors are $120^\circ$ (from the origin) and $\arctan\bigl(0.866r/(63 - 0.5r)\bigr)$, $\arctan\bigl(0.866r/(200 - 0.5r)\bigr)$; their sum must be $180^\circ$. Solving for $r$ gives $r = 47.9$, so $s = -23.95 \pm 41.49j$. The pole-vector lengths are $47.9$, $\abs{39.05 + 41.49j} = 56.98$ and $\abs{176.05 + 41.49j} = 180.87$, so

$$
K = 47.9\times56.98\times180.87 = 4.94\times10^5,\qquad K_a = \frac{4.94\times10^5}{250\,000} = 1.97\,\mathrm{V/rad}.
$$

The sum of the closed-loop poles equals the sum of the open-loop poles, $-263$ (the remark above), so the third pole is at $-263 + 2\times23.95 = -215.1$. It is nine times further left than the pair, which therefore dominates: the predicted overshoot is $16.3\,\%$, and a simulation gives $15.8\,\%$ with $t_p = 81\,\mathrm{ms}$. The velocity error constant is $K_v = \lim sL(s) = K/(63\times200) = 39.2\,\mathrm{s^{-1}}$. Had we ignored the amplifier pole, as in [[control-systems/time-response#ex-servo]], the same damping ratio would have seemed to allow $K_a = 3.17$: the extra pole costs a third of the usable gain.
:::
:::

::: example Integral control of a buck converter {#ex-buck-locus}
The buck converter of [[control-systems/modelling-dynamic-systems#ex-buck]] ($\omega_n = 31\,623\,\mathrm{rad/s}$, $\zeta = 0.158$, DC gain $12\,\mathrm{V}$) is controlled by a pure integrator $C(s) = K_i/s$ acting on the voltage error. Sketch the root locus, find the departure angle from the resonant poles, and find the largest stable $K_i$.
::: solution
In units of $\omega_n$ (write $s = \omega_n\hat s$), the loop gain is $\hat K/[\hat s(\hat s^2 + 0.316\hat s + 1)]$ with $\hat K = 12K_i/\omega_n$, and the open-loop poles are at $0$ and $-0.158 \pm 0.987j$. There are three branches and no zeros, so three asymptotes at $60^\circ$, $180^\circ$, $-60^\circ$ from $\sigma_a = -0.316/3 = -0.105$. The whole negative real axis is on the locus (one pole, at the origin, to the right of every negative point).

Departure from $p = -0.158 + 0.987j$: the vector from the origin pole has angle $180^\circ - \arctan(0.987/0.158) = 99.1^\circ$, and the vector from the conjugate pole points straight up, $90^\circ$. By [[#eq-departure]],

$$
\theta_{dep} = 180^\circ - 99.1^\circ - 90^\circ = -9.1^\circ.
$$

The branch leaves the resonant pole heading to the right and slightly downward — towards the imaginary axis. The characteristic equation $\hat s^3 + 0.316\hat s^2 + \hat s + \hat K = 0$ is stable for $\hat K < 0.316$ (cubic condition), with the crossing at $\hat s = \pm j$. In real units: $12K_i < 0.316\,\omega_n = 10^4\,\mathrm{s^{-1}}$, so $K_i < 833\,\mathrm{s^{-1}}$ per volt of error. Even at a fraction of this, the resonant poles barely move and keep their light damping, while the integrator pole crawls slowly along the real axis: integral control alone gives a slow loop with a ringing resonance. The cure is a compensator whose zeros pull the branches from the resonance into the left half-plane ([[control-systems/compensator-design]]).
:::
:::

::: warning Use a monic G and a positive K
The rules assume [[#eq-loop-form]]: numerator and denominator monic, all gain collected in $K \ge 0$. If the plant has a negative gain — the levitator's $-19.62/(s^2 - 1962)$, or an inverting op-amp stage — either change the sign of the controller so the loop has negative feedback, or draw the **complementary ($0^\circ$) locus** for $K < 0$, where the angle condition is $\angle G = 0^\circ \pm 360^\circ k$ and the real-axis rule counts an *even* number of poles and zeros to the right. Mixing the two is a common source of loci that are exactly wrong.
:::

## Designing with the locus

If no gain on the locus meets the specifications, the locus itself must be changed by adding poles and zeros through a compensator. The rules tell us in which direction.

- **Adding a zero** pulls the locus towards it and to the left: it reduces the number of asymptotes by one and moves the centroid left. A zero is the root-locus signature of derivative action or of a lead compensator.
- **Adding a pole** pushes the locus to the right: it adds an asymptote and moves the centroid right. A pole at or near the origin (integral action, a lag compensator) improves steady-state error but costs stability.

::: example Adding a zero to the servo {#ex-pd-locus}
The servo of [[#ex-servo-locus]] must settle within about $50\,\mathrm{ms}$ with no more than about $10\,\%$ overshoot. Show that proportional control cannot achieve this, and design a controller $C(s) = K_p(1 + s/z_c)$ with a zero at $-z_c = -70$ that does.
::: solution
With proportional control the dominant pair lies on branches that leave the real axis at $-28.6$ and then bend right towards asymptotes from $-87.7$; their real part never exceeds about $28.6$, so $t_s \approx 4/\sigma$ cannot fall below about $140\,\mathrm{ms}$. A $2\,\%$ settling time of $50\,\mathrm{ms}$ needs $\sigma \ge 80\,\mathrm{s^{-1}}$.

With the zero, $L(s) = K(s + 70)/[s(s + 63)(s + 200)]$ with $K = 250\,000K_p/70$. Now $n - m = 2$: two asymptotes at $\pm90^\circ$ from

$$
\sigma_a = \frac{(0 - 63 - 200) - (-70)}{2} = -96.5 .
$$

The real-axis segments are $[-63, 0]$ and $[-200, -70]$. The branches from $0$ and $-63$ break away between them, curve out and bend towards the vertical asymptotes at $-96.5$; the branch from $-200$ moves right to end on the zero at $-70$. The loop is stable for every $K$, and the complex pair can now be moved as far left as $\sigma \approx 96$.

Along the ray $\zeta = 0.7$ ($45.6^\circ$), the angle condition holds at $s = -93.2 \pm 95.1j$, where [[#eq-magnitude]] gives $K = 1.94\times10^4$, so $K_p = 70K/250\,000 = 5.43\,\mathrm{V/rad}$ and the derivative time is $1/z_c = 14.3\,\mathrm{ms}$. The third closed-loop pole is at $-76.7$, close to the zero at $-70$, so its effect is largely cancelled. A simulation gives $7.0\,\%$ overshoot (slightly more than the $4.6\,\%$ of a pure $\zeta = 0.7$ pair, because of the zero), $t_s = 47\,\mathrm{ms}$ and $K_v = K\times70/12\,600 = 108\,\mathrm{s^{-1}}$ — faster *and* more accurate than any proportional design. A pure zero is not realisable on its own; in practice it comes with a pole well to the left, which is a lead compensator ([[control-systems/compensator-design]]).
:::
:::

::: intuition Why derivative action stabilises
A zero at $-z_c$ contributes $\angle(s + z_c)$, a positive angle, to the angle condition at every point above the real axis. Points that previously had too much lag to be on the locus — further left, where the pole vectors' angles add up to more than $180^\circ$ — become reachable. In the time domain, the zero makes the controller respond to the rate of change of the error, so it begins to brake the motor before the angle reaches its target.
:::

::: application Root loci in power electronics
Current-mode control of a DC–DC converter wraps a fast inner loop around the inductor current, which turns the LC resonance of the buck converter into an effectively first-order plant for the outer voltage loop; the root locus of the outer loop then looks like that of a well-behaved first-order system with a pole at the output filter's $RC$ frequency. The famous instability of peak current-mode control above $50\,\%$ duty cycle, cured by **slope compensation**, appears in a sampled-data model as a pole leaving the unit circle — a root locus in the $z$-plane ([[control-systems/digital-control]], [[power-electronics/converter-control]]).
:::

::: history
Walter R. Evans (1920–1999), working on aircraft guidance systems at North American Aviation, published "Graphical analysis of control systems" in the *Transactions of the AIEE* in 1948 and "Control system synthesis by root locus method" in 1950. To apply the angle condition by hand he invented the **Spirule**, a transparent protractor with a pivoting arm that added up the angles of pole and zero vectors, which was sold to engineers for decades. His 1954 book *Control-System Dynamics* made the method standard; it was the main design tool of the 1950s and 1960s, before computers made exact loci routine.
:::

## Where this leads

The root locus is the $s$-plane view of design; [[control-systems/frequency-response-methods]] gives the frequency-domain view of the same loops, in which the imaginary-axis crossing becomes the gain margin. In [[control-systems/pid-control]] the locus shows what integral and derivative action do, and [[control-systems/compensator-design]] places lead and lag poles and zeros by the angle condition. Loci with respect to parameters other than gain — a time constant, a load resistance — follow by rewriting the characteristic equation in the form $1 + KG(s) = 0$, and the same rules hold in the $z$-plane for sampled-data loops ([[control-systems/digital-control]]). A mechanical engineer's treatment with further examples is in the [Mechanical Atlas](/learn/mechanical/lesson.php?c=control-systems&l=root-locus).

::: summary
- The root locus is the set of closed-loop poles of $1 + KG(s) = 0$ for $K \ge 0$; a point is on it if $\angle G(s) = 180^\circ$ (odd multiple), and the gain there is $1/\abs{G(s)}$.
- Branches start at open-loop poles and end at zeros or at infinity along asymptotes at $(2k + 1)180^\circ/(n - m)$ from the centroid $(\sum p - \sum z)/(n - m)$.
- The real axis is on the locus to the left of an odd number of real poles and zeros; breakaway points satisfy $\dd K/\dd s = 0$.
- Imaginary-axis crossings come from the Routh array; departure angles from complex poles come from the angle condition.
- With $n - m \ge 2$ the sum of the closed-loop poles is constant, so with three or more excess poles a high gain drives a pair unstable.
- To choose a gain, intersect the locus with the ray of the required damping ratio and check that the remaining poles are far to the left.
- Zeros pull the locus left and stabilise; poles push it right. Use a monic $G$ and a positive gain, or the $0^\circ$ locus for negative gain.
:::

## Exercises

::: exercise Real-axis segments {level=1}
For $L(s) = K(s + 3)/[s(s + 1)(s + 5)]$, which parts of the real axis lie on the root locus? How many asymptotes are there, and where is their centroid?
::: solution
Counting real poles and zeros to the right: $(-1, 0)$ has one (on), $(-3, -1)$ two (off), $(-5, -3)$ three (on), $(-\infty, -5)$ four (off). So the segments are $[-1, 0]$ and $[-5, -3]$. With $n - m = 2$ there are two asymptotes at $\pm90^\circ$ from $\sigma_a = (0 - 1 - 5 + 3)/2 = -1.5$.
:::
:::

::: exercise A breakaway point {level=1 check="-1 + 1/sqrt(3)"}
Find the breakaway point of the root locus of $L(s) = K/[s(s + 1)(s + 2)]$.
::: solution
$D'(s) = 3s^2 + 6s + 2 = 0$ gives $s = -1 \pm 1/\sqrt3$, i.e. $-0.423$ and $-1.577$. Only $-0.423$ lies on the segment $[-1, 0]$ of the locus, so that is the breakaway point (at $K = 0.423\times0.577\times1.577 = 0.385$).
:::
:::

::: exercise Gain from the magnitude condition {level=1 check="10"}
For $L(s) = K/[s(s + 2)]$, find the gain $K$ that places the closed-loop poles at $-1 \pm 3j$.
::: solution
$K = \abs{-1 + 3j}\,\abs{1 + 3j} = \sqrt{10}\times\sqrt{10} = 10$. Check: $s^2 + 2s + 10$ has roots $-1 \pm 3j$.
:::
:::

::: exercise An imaginary-axis crossing {level=2}
Sketch the root locus of $L(s) = K/[(s + 1)(s + 2)(s + 4)]$, giving the asymptotes, the breakaway point and the imaginary-axis crossing with its gain.
::: solution
Three branches from $-1$, $-2$, $-4$; real-axis segments $[-2, -1]$ and $(-\infty, -4]$. Asymptotes at $\pm60^\circ$ and $180^\circ$ from $\sigma_a = -7/3 = -2.33$. Breakaway: $D' = 3s^2 + 14s + 14 = 0$ gives $s = -1.45$ (on the locus) and $-3.22$ (not on it). Crossing: $\Delta = s^3 + 7s^2 + 14s + 8 + K$; the Routh condition $7\times14 > 8 + K$ gives $K = 90$ at the limit, with $s^2 = -14$, i.e. $s = \pm3.74j$.
:::
:::

::: exercise A departure angle {level=2}
Find the angle of departure from the pole at $-1 + 2j$ for $L(s) = K(s + 2)/[(s^2 + 2s + 5)(s + 4)]$.
::: solution
At $p = -1 + 2j$: the zero vector from $-2$ is $1 + 2j$, angle $63.4^\circ$; the vector from the conjugate pole $-1 - 2j$ is $4j$, angle $90^\circ$; the vector from $-4$ is $3 + 2j$, angle $33.7^\circ$. By [[#eq-departure]], $\theta_{dep} = 180^\circ + 63.4^\circ - 90^\circ - 33.7^\circ = 119.7^\circ$: the branch leaves upward and to the left.
:::
:::

::: exercise Choosing a gain for a damping ratio {level=2}
For $L(s) = K/[s(s + 4)(s + 10)]$, find the gain for which the dominant closed-loop poles have $\zeta = 0.6$, the third pole, and the velocity error constant.
::: hint
Search along the ray $s = r(-0.6 + 0.8j)$ for the point where the three pole angles add up to $180^\circ$.
:::
::: solution
On the ray, the angle from the origin is $126.9^\circ$, so the other two must add up to $53.1^\circ$: $\arctan\frac{0.8r}{4 - 0.6r} + \arctan\frac{0.8r}{10 - 0.6r} = 53.1^\circ$. The solution is $r = 2.55$, so $s = -1.53 \pm 2.04j$. The gain is $\abs{s}\abs{s + 4}\abs{s + 10} = 2.55\times3.20\times8.71 = 71.2$. The third pole is at $-14 + 2\times1.53 = -10.94$, seven times further left. $K_v = 71.2/40 = 1.78\,\mathrm{s^{-1}}$.
:::
:::

::: exercise The levitator's locus {level=2}
For the levitator with a PD controller, $L(s) = K(s + 50)/(s^2 - 1962)$ (sign chosen for negative feedback), sketch the root locus and find the minimum $K$ for stability.
::: solution
Poles at $\pm44.3$, zero at $-50$; $n - m = 1$, one asymptote along the negative real axis. Real-axis segments: $[-44.3, 44.3]$ (one pole to the right of each point) and $(-\infty, -50]$ (three). The breakaway and break-in points satisfy [[#eq-breakaway]]: $(s + 50)(2s) - (s^2 - 1962) = s^2 + 100s + 1962 = 0$, so $s = -50 \pm \sqrt{538} = -26.8$ or $-73.2$. The branches from $\pm44.3$ move towards each other, meet at the breakaway point $-26.8$, leave the axis as a complex pair on a circle centred on the zero with radius $\sqrt{538} = 23.2$, and break in at $-73.2$, after which one branch moves right to the zero and the other left to $-\infty$. The characteristic polynomial is $s^2 + Ks + (50K - 1962)$, stable for $K > 1962/50 = 39.2$: below this gain one closed-loop pole is still in the right half-plane.
:::
:::

::: exercise Sum of the closed-loop poles {level=3}
(a) Prove that if $n - m \ge 2$ the sum of the closed-loop poles of $1 + KG(s) = 0$ does not depend on $K$. (b) Use this to show that for $L(s) = K/[s(s + a)(s + b)]$ with $a, b > 0$, once the real closed-loop pole has moved left past $-(a + b)$ the complex pair has positive real part. (c) Check with the Routh limit.
::: solution
(a) $D(s) = s^n - (\sum p_j)s^{n-1} + \dots$ and $KN(s)$ has degree $m \le n - 2$, so it does not affect the coefficient of $s^{n-1}$ in $D + KN$. That coefficient is minus the sum of the roots, which is therefore $\sum p_j$ for every $K$.

(b) The sum of the three closed-loop poles is $-(a + b)$. If the real pole is at $-c$ with $c > a + b$, the complex pair has real part $\tfrac12(c - a - b) > 0$.

(c) The Routh limit is $K = ab(a + b)$, where the pair is at $\pm j\sqrt{ab}$; dividing $s^3 + (a + b)s^2 + abs + ab(a + b) = (s^2 + ab)(s + a + b)$ shows the real pole is then exactly at $-(a + b)$, consistent with (b).
:::
:::

::: exercise A lead zero for the buck converter {level=3}
For the normalised buck loop of [[#ex-buck-locus]], a controller $C = \hat K(\hat s + 0.5)^2/\hat s$ (an integrator with two zeros — the core of a Type II/III compensator) is used, ignoring the extra high-frequency poles a real compensator has. (a) How many asymptotes does the locus have? (b) Show that the loop is stable for every $\hat K > 0$. (c) Where do the resonant poles go as $\hat K \to \infty$?
::: solution
(a) $L = \hat K(\hat s + 0.5)^2/[\hat s(\hat s^2 + 0.316\hat s + 1)]$ has $n = 3$, $m = 2$: one asymptote, along the negative real axis.

(b) $\Delta = \hat s^3 + 0.316\hat s^2 + \hat s + \hat K(\hat s^2 + \hat s + 0.25) = \hat s^3 + (0.316 + \hat K)\hat s^2 + (1 + \hat K)\hat s + 0.25\hat K$. All coefficients are positive for $\hat K > 0$ and $(0.316 + \hat K)(1 + \hat K) > 0.25\hat K$ holds for every $\hat K > 0$ (the left side exceeds $\hat K$), so the loop is always stable.

(c) The two resonant poles end on the double zero at $-0.5$ and the integrator pole goes to $-\infty$. In contrast to [[#ex-buck-locus]], the zeros pull the lightly damped branches into the left half-plane, and a large gain gives a well-damped, fast loop — until the neglected compensator poles and the switching frequency set a limit.
:::
:::
