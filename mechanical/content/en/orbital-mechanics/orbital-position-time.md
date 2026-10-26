The orbit equation of [[orbital-mechanics/two-body-problem]] tells us the *shape* of an orbit: the radius $r$ as a function of the true anomaly $\theta$. It does not tell us *when* the spacecraft is anywhere. Yet that is almost always the question an engineer asks — when will the satellite rise over the ground station, how long does it spend in the Earth's shadow, where will the probe be when the next burn is due, at what time does the transfer orbit reach apoapsis. This chapter answers it. The answer for an ellipse is **Kepler's equation**, $M = E - e\sin E$: a simple relation between time and a geometric angle, the eccentric anomaly, which itself is related to the true anomaly by a half-angle formula. Going from position to time is then a direct evaluation; going from time to position means solving a transcendental equation, which has no closed-form solution and is the classic application of Newton's method. Parabolic and hyperbolic orbits have their own versions — Barker's equation and the hyperbolic Kepler equation — and we derive all three from the conservation of angular momentum.

## Time from Kepler's second law {#sec-second-law}

Conservation of angular momentum, $h = r^2\dot\theta$, already contains the timing of an orbit. Separating the variables,
$$
\mathrm{d}t = \frac{r^2}{h}\,\mathrm{d}\theta = \frac{h^3}{\mu^2}\,\frac{\mathrm{d}\theta}{(1 + e\cos\theta)^2},
$$ {#eq-dt}
using $r = (h^2/\mu)/(1+e\cos\theta)$. Integrating from periapsis ($\theta = 0$, time $t_p$) to $\theta$ gives the **time since periapsis**,
$$
t - t_p = \frac{h^3}{\mu^2}\int_0^\theta \frac{\mathrm{d}\vartheta}{(1+e\cos\vartheta)^2}.
$$ {#eq-time-integral}
For a circle ($e = 0$) the integral is just $\theta$ and $t - t_p = (h^3/\mu^2)\,\theta = \theta/n$, where $n = \sqrt{\mu/r^3}$: the satellite moves at constant angular rate. For an ellipse the integral can be done in closed form, but the result is clumsy in $\theta$. Kepler's own route — through an auxiliary angle — is cleaner and gives an equation that is far easier to invert.

::: definition Mean motion and mean anomaly {#def-mean-anomaly}
For an elliptical orbit with period $T$ the **mean motion** is $n = 2\pi/T = \sqrt{\mu/a^3}$, the average angular rate. The **mean anomaly** is
$$
M = n\,(t - t_p),
$$
the angle a fictitious body moving uniformly round the orbit at rate $n$ would have swept since periapsis. $M$ grows linearly with time; it is not the direction of any physical vector. By Kepler's second law $M/2\pi$ is also the fraction of the ellipse's area swept since periapsis.
:::

::: definition Eccentric anomaly {#def-eccentric-anomaly}
Draw the **auxiliary circle** of radius $a$ concentric with the ellipse. Through the spacecraft draw the line perpendicular to the major axis and extend it to meet the circle. The **eccentric anomaly** $E$ is the angle at the *centre* of the ellipse between the direction to periapsis and the direction to that point on the circle. In coordinates with origin at the focus (the central body) and $x$ towards periapsis, the spacecraft is at
$$
x = a(\cos E - e), \qquad y = b\sin E, \qquad b = a\sqrt{1-e^2},
$$ {#eq-xy-E}
and its distance from the focus is
$$
r = a(1 - e\cos E).
$$ {#eq-r-E}
:::

The radius formula follows from [[#eq-xy-E]]: $r^2 = a^2(\cos E - e)^2 + a^2(1-e^2)\sin^2E = a^2(1 - 2e\cos E + e^2\cos^2E) = a^2(1-e\cos E)^2$. The three anomalies agree at periapsis ($0$) and apoapsis ($\pi$); in between, on the way out, $\theta > E > M$: the true anomaly runs ahead because the spacecraft is fastest near periapsis.

## Kepler's equation {#sec-kepler-equation}

::: theorem Kepler's equation {#thm-kepler}
On an elliptical orbit the eccentric anomaly and the time since periapsis are related by
$$
M = n\,(t - t_p) = E - e\sin E.
$$ {#eq-kepler}
:::

::: proof
Differentiate [[#eq-xy-E]] with respect to time: $\dot x = -a\sin E\,\dot E$, $\dot y = b\cos E\,\dot E$. The specific angular momentum is the $z$-component of $\mathbf{r}\times\mathbf{v}$:
$$
h = x\dot y - y\dot x = ab\,\dot E\left[(\cos E - e)\cos E + \sin^2E\right] = ab\,\dot E\,(1 - e\cos E).
$$
From [[orbital-mechanics/two-body-problem]], $h = \sqrt{\mu a(1-e^2)}$, and $ab = a^2\sqrt{1-e^2}$, so
$$
(1 - e\cos E)\,\dot E = \frac{h}{ab} = \sqrt{\frac{\mu}{a^3}} = n.
$$
The left side is the time derivative of $E - e\sin E$. Integrating from periapsis, where $E = 0$ at $t = t_p$, gives $E - e\sin E = n(t - t_p)$. The assumptions are those of the two-body problem with $0 \le e < 1$.
:::

There is also a lovely geometric reading, which is how Kepler found it. Stretching the ellipse by $a/b$ perpendicular to the major axis turns it into the auxiliary circle and multiplies all areas by $a/b$. The area swept from periapsis to the spacecraft becomes a circular sector of area $\tfrac12a^2E$ minus a triangle of area $\tfrac12a\cdot ae\cdot\sin E$ (the focus is a distance $ae$ from the centre), so the swept area in the ellipse is $\tfrac12ab\,(E - e\sin E)$. Dividing by the whole area $\pi ab$ gives the fraction of the period elapsed, $(E - e\sin E)/2\pi = M/2\pi$.

To use the equation we need $E$ in terms of $\theta$.

::: proposition Eccentric and true anomaly {#prop-E-theta}
For $0 \le e < 1$,
$$
\cos\theta = \frac{\cos E - e}{1 - e\cos E}, \qquad \sin\theta = \frac{\sqrt{1-e^2}\,\sin E}{1 - e\cos E},
$$
and, equivalently and without quadrant ambiguity,
$$
\tan\frac{\theta}{2} = \sqrt{\frac{1+e}{1-e}}\,\tan\frac{E}{2}.
$$ {#eq-half-angle}
:::

::: proof
Since $x = r\cos\theta$ and $y = r\sin\theta$, divide [[#eq-xy-E]] by [[#eq-r-E]]: $\cos\theta = (\cos E - e)/(1 - e\cos E)$ and $\sin\theta = \sqrt{1-e^2}\sin E/(1-e\cos E)$. Then
$$
1 + \cos\theta = \frac{(1-e)(1+\cos E)}{1-e\cos E}, \qquad 1 - \cos\theta = \frac{(1+e)(1-\cos E)}{1-e\cos E},
$$
and dividing the second by the first, $\tan^2(\theta/2) = \frac{1+e}{1-e}\tan^2(E/2)$. Since $\sin\theta$ and $\sin E$ have the same sign, $\theta/2$ and $E/2$ lie in the same quadrant of $(-\pi/2, \pi/2)$ when $\theta, E \in (-\pi, \pi)$, so the positive square root is the right one.
:::

The half-angle form is the one to code: with $\theta$ and $E$ taken in $(-\pi, \pi]$, $E = 2\arctan\!\big[\sqrt{(1-e)/(1+e)}\,\tan(\theta/2)\big]$ is never in the wrong quadrant, whereas $\arccos$ of the cosine formula returns only $0$ to $\pi$ and silently loses the outbound/inbound distinction. Combining the pieces, the **position-to-time** problem is direct: $\theta \to E \to M \to t$.

::: widget plot
f: 2*atan(sqrt((1 - e)/(1 + e))*tan(x/2)) - e*sqrt(1 - e^2)*sin(x)/(1 + e*cos(x)); x
x: -pi, pi
y: -pi, pi
sliders: e=0.5:0:0.95:0.01
labels: M(\theta); \text{circular orbit } (e = 0)
piticks: true
caption: Mean anomaly $M$ (proportional to time since periapsis) against true anomaly $\theta$, computed as $M = E - e\sin E$ with $E$ from the half-angle formula and $\sin E = \sqrt{1-e^2}\sin\theta/(1+e\cos\theta)$. The diagonal is the circular orbit. Raise $e$: the curve flattens near $\theta = 0$ — the spacecraft sweeps through a large angle around periapsis in very little time — and steepens near $\theta = \pm\pi$, where it crawls. At $e = 0.7$ a quarter period after periapsis ($M = \pi/2$) the satellite is already at $\theta \approx 2.70\ \mathrm{rad}$ ($155^\circ$). Reading the curve backwards — $\theta$ for a given $M$ — is the inverse problem that needs Newton's method.
:::

::: example Time to a given true anomaly {#ex-time-to-theta}
A spacecraft is in the geostationary transfer orbit of [[orbital-mechanics/two-body-problem]]: $r_p = 6628\ \mathrm{km}$, $r_a = 42\,164\ \mathrm{km}$, so $a = 24\,396\ \mathrm{km}$ and $e = 0.7283$. How long after perigee does it reach $\theta = 120^\circ$, and how high is it then?
::: solution
Period and mean motion: $T = 2\pi\sqrt{24\,396^3/398\,600} = 37\,922\ \mathrm{s}$, $n = 2\pi/T = 1.6569\times10^{-4}\ \mathrm{rad/s}$.

Eccentric anomaly from [[#eq-half-angle]]:
$$
\tan\frac{E}{2} = \sqrt{\frac{1-0.7283}{1+0.7283}}\,\tan 60^\circ = 0.3965 \times 1.7321 = 0.6868, \qquad E = 1.2035\ \mathrm{rad}\ (68.96^\circ).
$$
Mean anomaly from Kepler's equation:
$$
M = 1.2035 - 0.7283\sin(1.2035) = 1.2035 - 0.6797 = 0.5238\ \mathrm{rad}.
$$
Time: $t - t_p = M/n = 0.5238/1.6569\times10^{-4} = 3161\ \mathrm{s} = 52.7\ \mathrm{min}$. Radius: $r = a(1 - e\cos E) = 24\,396\,(1 - 0.7283 \times 0.3596) = 18\,016\ \mathrm{km}$, altitude $11\,638\ \mathrm{km}$.

*Check:* the orbit equation gives the same radius: $p = a(1-e^2) = 11\,455\ \mathrm{km}$ and $r = 11\,455/(1 + 0.7283\cos 120^\circ) = 18\,016\ \mathrm{km}$. The spacecraft has covered a third of the way round in angle but only $3161/37\,922 = 8.3\,\%$ of the period — it races through perigee and spends the rest of the orbit climbing to and falling from apogee.
:::
:::

## Solving Kepler's equation {#sec-solving}

The inverse problem — where is the spacecraft at a given time? — requires $E$ from $M$. The equation $E - e\sin E = M$ is transcendental; there is no finite formula for $E$ in elementary functions. But the function $f(E) = E - e\sin E - M$ is perfect for Newton's method ([root finding](/learn/maths/lesson.php?c=numerical-analysis&l=root-finding)): its derivative $f'(E) = 1 - e\cos E \ge 1 - e > 0$ never vanishes for an ellipse, so $f$ is strictly increasing, the root is unique, and it lies in $[M - e, M + e]$ because $\lvert e\sin E\rvert \le e$.

::: algorithm Newton's method for Kepler's equation {#alg-kepler-newton}
Given $M$ (reduced to $0 \le M < 2\pi$) and $0 \le e < 1$:

1. **Start.** $E_0 = M + e/2$ if $M < \pi$, otherwise $E_0 = M - e/2$. (For small $e$, $E_0 = M$ is also fine.)
2. **Iterate.** $E_{k+1} = E_k - \dfrac{E_k - e\sin E_k - M}{1 - e\cos E_k}$.
3. **Stop** when the correction is below a tolerance, e.g. $10^{-10}\ \mathrm{rad}$.
4. **Finish.** $\theta = 2\arctan\!\big[\sqrt{(1+e)/(1-e)}\,\tan(E/2)\big]$ and $r = a(1 - e\cos E)$.

Convergence is quadratic once the iterate is close — the number of correct digits roughly doubles each step — and three to five iterations reach machine precision for typical orbits. The start in step 1 shifts the guess towards the root, since the root satisfies $E - M = e\sin E$, which has the sign of $\sin M$. For $e$ very close to 1 and $M$ close to 0 Newton's method can overshoot badly from a poor start; production codes then use a cubic starting approximation or bracket the root and fall back to bisection.
:::

::: example Where is the spacecraft three hours after perigee? {#ex-newton}
For the transfer orbit of [[#ex-time-to-theta]], find $\theta$ and the altitude $3.000\ \mathrm{h}$ after perigee.
::: solution
$M = nt = 1.6569\times10^{-4} \times 10\,800 = 1.7894\ \mathrm{rad}$. Since $M < \pi$, $E_0 = M + e/2 = 2.1536$.

| $k$ | $E_k$ | $f(E_k)/f'(E_k)$ |
|---|---|---|
| 0 | 2.153 587 | −0.174 136 |
| 1 | 2.327 723 | +0.005 896 |
| 2 | 2.321 827 | +0.000 006 16 |
| 3 | 2.321 821 | $6.7\times10^{-12}$ |

So $E = 2.32182\ \mathrm{rad}$. Then $\tan(\theta/2) = \sqrt{1.7283/0.2717}\,\tan(1.16091) = 2.5221 \times 2.3184 = 5.847$, giving $\theta = 2\arctan 5.847 = 160.45^\circ$, and $r = 24\,396\,(1 - 0.7283\cos 2.32182) = 36\,521\ \mathrm{km}$, altitude $30\,143\ \mathrm{km}$.

*Check:* substitute back: $2.32182 - 0.7283\sin 2.32182 = 2.32182 - 0.53239 = 1.78943 = M$. Half the period is $5.27\ \mathrm{h}$, so at $3\ \mathrm{h}$ the spacecraft should be past $\theta = 90^\circ$ but not yet at apogee — and indeed it is $20^\circ$ short of it and only $5600\ \mathrm{km}$ below apogee radius: a GTO spends most of its time high up.
:::
:::

::: widget newton
f: x - 0.7283*sin(x) - 1.7894
x0: 2.1536
x: 0, 3.5
steps: 5
caption: Newton's method on Kepler's equation $f(E) = E - e\sin E - M$ for [[#ex-newton]] ($e = 0.7283$, $M = 1.7894\ \mathrm{rad}$), started from $E_0 = M + e/2$. Each tangent line meets the axis close to the root $E = 2.3218$, and the table shows the error collapsing quadratically. Drag the start to a poor value such as $E_0 = 0.3$: because $f'$ is smallest near $E = 0$ (it is $1 - e$ there), the first tangent is shallow and the iterates jump to $5.9$ and then $-7.6$, far off the plot, before stumbling back to the root. A unique root does not make every start a good one — hence the starting rule of [[#alg-kepler-newton]].
:::

For small eccentricity, $E$ can also be written as a power series in $e$. Iterating $E = M + e\sin E$ (a contraction for $e < 1$) gives
$$
E = M + e\sin M + \frac{e^2}{2}\sin 2M + O(e^3),
$$
whose general coefficients are Bessel functions, $E = M + \sum_{k\ge1}\frac{2}{k}J_k(ke)\sin kM$. The series is useful for analytical theories of nearly circular orbits and is the route by which perturbation theory expands the equations of motion in powers of $e$; for numerical work Newton's method is simpler and always better. (The related Lagrange series for $E$ in powers of $e$ diverges for some $M$ once $e$ exceeds the Laplace limit, $e \approx 0.6627$.)

::: example Time spent on the far half of a Molniya-type orbit {#ex-molniya}
A communications satellite has a period of half a sidereal day, $T = 43\,082\ \mathrm{s}$, and $e = 0.737$. What fraction of each orbit does it spend on the apogee side of the latus rectum ($\lvert\theta\rvert > 90^\circ$)?
::: solution
At $\theta = 90^\circ$: $\tan(E/2) = \sqrt{0.263/1.737}\tan 45^\circ = 0.3891$, $E = 0.7422\ \mathrm{rad}$, and $M = 0.7422 - 0.737\sin 0.7422 = 0.2440\ \mathrm{rad}$. By symmetry the satellite is on the perigee side ($-90^\circ < \theta < 90^\circ$) for a mean-anomaly interval $2 \times 0.2440 = 0.4881\ \mathrm{rad}$, a fraction $0.4881/2\pi = 7.8\,\%$ of the period — $0.93\ \mathrm{h}$. The remaining $92.2\,\%$, or $11.04\ \mathrm{h}$, is spent on the apogee side.

*Check:* for a circle the fraction would be exactly $50\,\%$; high eccentricity transfers almost all the time to the slow, distant part of the orbit. This is why such orbits can provide many hours of coverage of high latitudes from a single satellite.
:::
:::

::: warning Degrees, radians and the wrong branch {#warn-units}
Kepler's equation mixes an angle $E$ with $e\sin E$; it is only true with $E$ and $M$ in **radians**. Writing $M = E - e\sin E$ with $E = 68.96^\circ$ gives nonsense ($68.96 - 0.68$) that looks plausible. The second classic error is quadrant loss: computing $E$ from $\cos E = (e + \cos\theta)/(1 + e\cos\theta)$ with $\arccos$ returns $E \in [0, \pi]$, so a spacecraft on the inbound leg ($\theta < 0$ or $\theta > \pi$) is placed on the outbound leg, and the computed time since periapsis is wrong by up to a full period. Use the half-angle formula [[#eq-half-angle]] or $\operatorname{atan2}$. Finally, reduce $M$ to one revolution, $M \bmod 2\pi$, before iterating; time since periapsis on later revolutions adds whole periods.
:::

## Parabolic orbits: Barker's equation {#sec-parabola}

For $e = 1$, the orbit equation is $r = p/(1 + \cos\theta) = (p/2)\sec^2(\theta/2)$ with $p = h^2/\mu$.

::: proposition Barker's equation {#prop-barker}
On a parabolic orbit the time since periapsis is
$$
\frac{\mu^2}{h^3}\,(t - t_p) = M_p = \frac12\tan\frac{\theta}{2} + \frac16\tan^3\frac{\theta}{2},
$$ {#eq-barker}
and the inverse, from Cardano's formula for the cubic, is
$$
\tan\frac{\theta}{2} = \left(3M_p + \sqrt{9M_p^2 + 1}\right)^{1/3} - \left(3M_p + \sqrt{9M_p^2 + 1}\right)^{-1/3}.
$$
:::

::: proof
From [[#eq-dt]] with $e = 1$ and $1 + \cos\vartheta = 2\cos^2(\vartheta/2)$,
$$
t - t_p = \frac{h^3}{\mu^2}\int_0^\theta \frac{\mathrm{d}\vartheta}{4\cos^4(\vartheta/2)} = \frac{h^3}{2\mu^2}\int_0^{\theta/2}\sec^4 u\,\mathrm{d}u,
$$
with $u = \vartheta/2$. Writing $\sec^4u = (1 + \tan^2u)\sec^2u$ and substituting $w = \tan u$, $\mathrm{d}w = \sec^2u\,\mathrm{d}u$, the integral is $w + w^3/3$, so $t - t_p = (h^3/\mu^2)\left[\tfrac12\tan(\theta/2) + \tfrac16\tan^3(\theta/2)\right]$. For the inverse, $x = \tan(\theta/2)$ satisfies $x^3 + 3x - 6M_p = 0$, a depressed cubic with one real root; Cardano's formula with $s = \left(3M_p + \sqrt{9M_p^2+1}\right)^{1/3}$ gives $x = s - 1/s$, since the product of the two cube roots in Cardano's formula is $-1$.
:::

Parabolic orbits are a boundary case — no real trajectory has $e$ exactly 1 — but they are excellent approximations for long-period comets near perihelion, and Barker's equation is the reason the parabola, unlike the ellipse and hyperbola, needs no iteration.

::: example A parabolic pass {#ex-parabola}
A spacecraft passes the Earth on a parabolic trajectory with periapsis radius $7000\ \mathrm{km}$. How long does it take to go from periapsis to $\theta = 90^\circ$, and from $90^\circ$ to $120^\circ$?
::: solution
$h = \sqrt{2\mu r_p} = \sqrt{2 \times 398\,600 \times 7000} = 74\,704\ \mathrm{km^2/s}$, so $h^3/\mu^2 = 2624\ \mathrm{s}$.

At $\theta = 90^\circ$: $\tan 45^\circ = 1$, $M_p = \tfrac12 + \tfrac16 = 0.6667$, $t = 0.6667 \times 2624 = 1749\ \mathrm{s} = 29.2\ \mathrm{min}$; there $r = p/(1+\cos 90^\circ) = 2r_p = 14\,000\ \mathrm{km}$.

At $\theta = 120^\circ$: $\tan 60^\circ = 1.7321$, $M_p = 0.8660 + 0.8660 = 1.7321$, $t = 4544\ \mathrm{s} = 75.7\ \mathrm{min}$, with $r = 2r_p/(1+\cos 120^\circ) = 28\,000\ \mathrm{km}$. The next $30^\circ$ takes $2795\ \mathrm{s}$, longer than the first $90^\circ$.

*Check:* numerical integration of $\mathrm{d}t = (r^2/h)\,\mathrm{d}\theta$ from $0$ to $90^\circ$ gives $1749.17\ \mathrm{s}$, matching. The slowing-down is the parabola's speed $\sqrt{2\mu/r}$ falling as $r$ grows.
:::
:::

## Hyperbolic orbits {#sec-hyperbola}

For $e > 1$ the role of the eccentric anomaly is taken by the **hyperbolic anomaly** $F$, defined through hyperbolic functions in place of circular ones. With $a < 0$ (the convention of [[orbital-mechanics/two-body-problem]]), the position is
$$
r = a(1 - e\cosh F), \qquad \tanh\frac{F}{2} = \sqrt{\frac{e-1}{e+1}}\,\tan\frac{\theta}{2}.
$$ {#eq-F-theta}

::: proposition The hyperbolic Kepler equation {#prop-hyperbolic-kepler}
On a hyperbolic orbit
$$
M_h = e\sinh F - F = \frac{\mu^2}{h^3}\,(e^2 - 1)^{3/2}\,(t - t_p) = \sqrt{\frac{\mu}{(-a)^3}}\,(t - t_p).
$$ {#eq-kepler-h}
:::

::: proof
Take coordinates with origin at the focus and $x$ towards periapsis, and write the branch of the hyperbola as $x = \lvert a\rvert(e - \cosh F)$, $y = \lvert a\rvert\sqrt{e^2-1}\,\sinh F$. Then $r^2 = x^2 + y^2 = a^2\left(e^2 - 2e\cosh F + \cosh^2F + (e^2-1)\sinh^2F\right) = a^2(e\cosh F - 1)^2$, using $\cosh^2F - \sinh^2F = 1$, so $r = \lvert a\rvert(e\cosh F - 1) = a(1 - e\cosh F)$. As in the elliptical proof,
$$
h = x\dot y - y\dot x = a^2\sqrt{e^2-1}\,\dot F\left[(e - \cosh F)\cosh F + \sinh^2F\right] = a^2\sqrt{e^2-1}\,(e\cosh F - 1)\,\dot F.
$$
With $h = \sqrt{\mu\lvert a\rvert(e^2-1)}$ this becomes $(e\cosh F - 1)\dot F = \sqrt{\mu/\lvert a\rvert^3}$, which integrates to $e\sinh F - F = \sqrt{\mu/\lvert a\rvert^3}\,(t - t_p)$. Finally $h^3 = \mu^{3/2}\lvert a\rvert^{3/2}(e^2-1)^{3/2}$, so $\sqrt{\mu/\lvert a\rvert^3} = \mu^2(e^2-1)^{3/2}/h^3$. The half-angle relation [[#eq-F-theta]] follows exactly as in [[#prop-E-theta]], with $\cos E \to \cosh F$.
:::

Newton's method applies again, to $f(F) = e\sinh F - F - M_h$ with $f'(F) = e\cosh F - 1 > 0$; a good start is $F_0 = M_h$ for $M_h$ of order 1, or $F_0 = \ln(2M_h/e)$ for large $M_h$, where $\sinh F \approx e^F/2$.

::: example Leaving the Earth on a hyperbola {#ex-hyperbola}
The departure hyperbola of [[orbital-mechanics/two-body-problem]] has periapsis radius $6678\ \mathrm{km}$ and $v_\infty = 3.0\ \mathrm{km/s}$. How long after the periapsis burn is the probe $100\,000\ \mathrm{km}$ from the Earth's centre?
::: solution
$e = 1 + r_pv_\infty^2/\mu = 1.15078$, $h = \sqrt{\mu r_p(1+e)} = 75\,664\ \mathrm{km^2/s}$, $a = -\mu/v_\infty^2 = -44\,289\ \mathrm{km}$, $p = h^2/\mu = 14\,363\ \mathrm{km}$.

True anomaly at $r = 100\,000\ \mathrm{km}$: $\cos\theta = (p/r - 1)/e = (0.14363 - 1)/1.15078 = -0.7442$, $\theta = 138.09^\circ$ (outbound, so positive). The asymptote is at $\theta_\infty = \arccos(-1/e) = 150.3^\circ$, so the probe is already close to its asymptotic direction.

Hyperbolic anomaly: $\tanh(F/2) = \sqrt{0.15078/2.15078}\,\tan 69.04^\circ = 0.26477 \times 2.6110 = 0.6913$, $F = 2\operatorname{artanh}(0.6913) = 1.7010$.

Then $M_h = 1.15078\sinh 1.7010 - 1.7010 = 1.15078 \times 2.6485 - 1.7010 = 1.3469$, and
$$
t - t_p = \frac{M_h}{\sqrt{\mu/\lvert a\rvert^3}} = \frac{1.3469}{\sqrt{398\,600/44\,289^3}} = \frac{1.3469}{6.7740\times10^{-5}} = 19\,884\ \mathrm{s} = 5.52\ \mathrm{h}.
$$
*Check:* $r = a(1 - e\cosh F) = -44\,289\,(1 - 1.15078 \times 2.8310) = 100\,000\ \mathrm{km}$. An average radial speed of $(100\,000 - 6678)/19\,884 = 4.7\ \mathrm{km/s}$ is sensible for a probe that starts at $11.3\ \mathrm{km/s}$ and is heading for $3\ \mathrm{km/s}$.
:::
:::

::: remark Universal variables {#rem-universal}
Three equations for three kinds of conic are awkward in software, especially near $e = 1$ where both the elliptic and hyperbolic forms become ill-conditioned. The **universal variable** formulation replaces $E$, $F$ and $\tan(\theta/2)$ by one variable $\chi$ and writes the time equation with the **Stumpff functions** $C(z) = (1 - \cos\sqrt z)/z$ and $S(z) = (\sqrt z - \sin\sqrt z)/z^{3/2}$ (continued analytically to $z \le 0$ with hyperbolic functions), where $z = \chi^2/a$ is positive for ellipses, zero for parabolas and negative for hyperbolas. A single Newton iteration then propagates any orbit from a position and velocity. It is the form used to solve Lambert's problem in [[orbital-mechanics/orbit-determination]].
:::

::: quiz
Two satellites share the same orbit with $e = 0.5$. Satellite A passes periapsis at $t = 0$; satellite B passes apoapsis at $t = 0$. At $t = T/4$, which statement is true?
- [x] A has travelled more than $90^\circ$ in true anomaly, B less than $90^\circ$.
- [ ] Both have travelled exactly $90^\circ$ in true anomaly.
- [ ] A has travelled less than $90^\circ$, B more than $90^\circ$.
- [ ] They are at the same point of the orbit.
::: solution
A quarter period means $M$ advances by $\pi/2$. Starting at periapsis, $M = \pi/2$ gives $E = 2.02\ \mathrm{rad}$ (from Kepler's equation) and $\theta = 2.45\ \mathrm{rad} = 140^\circ$ — far more than $90^\circ$, because the satellite starts in the fast part of the orbit. B starts at apoapsis, $M = \pi$, and reaches $M = 3\pi/2$; by symmetry it is at $\theta = 360^\circ - 140^\circ = 220^\circ$, having moved only $40^\circ$.
:::
:::

::: history
Kepler derived the equation that bears his name in chapter 60 of *Astronomia Nova* (1609), from his area law and the geometry of the auxiliary circle — the argument of the paragraph after [[#thm-kepler]]. He could not invert it, and in the *Epitome Astronomiae Copernicanae* (published 1618–1621) proposed solving it by successive approximation. Newton took up "Kepler's problem" in the *Principia* (1687, Book I, Section VI), argued that no algebraic curve could solve it in general, and gave approximate methods. Finding $E$ from $M$ became one of the most-studied problems in numerical analysis, from Lagrange's series to modern starting approximations. The parabolic case is named after the English astronomer Thomas Barker (1722–1809), author of *An Account of the Discoveries concerning Comets* (1757); parabolic orbits were then the standard model for comets.
:::

## Where this leads {#sec-next}

With Kepler's equation an orbit can be propagated in its own plane: given $a$, $e$ and a time of periapsis passage, the position at any time follows. The next chapter, [[orbital-mechanics/orbital-elements]], orients that plane and the periapsis direction in space, completing the six numbers that pin down a two-body orbit. Kepler's equation reappears in orbit determination, in phasing and rendezvous timing ([[orbital-mechanics/orbital-manoeuvres]]) and in hyperbolic flyby timing ([[orbital-mechanics/interplanetary-trajectories]]).

::: summary
- Time along an orbit follows from $h = r^2\dot\theta$; for a circle the angular rate is the constant $n = \sqrt{\mu/r^3}$.
- On an ellipse, the mean anomaly $M = n(t - t_p)$ grows uniformly, and Kepler's equation $M = E - e\sin E$ links it to the eccentric anomaly $E$, with $r = a(1 - e\cos E)$ and $\tan(\theta/2) = \sqrt{(1+e)/(1-e)}\tan(E/2)$.
- Position to time is direct ($\theta \to E \to M \to t$); time to position needs Newton's method, which converges quickly because $f'(E) = 1 - e\cos E > 0$.
- Work in radians, and use half-angle formulas or atan2 to keep the outbound and inbound halves apart.
- Parabola: Barker's equation $\mu^2t/h^3 = \tfrac12\tan(\theta/2) + \tfrac16\tan^3(\theta/2)$, inverted exactly by Cardano's formula.
- Hyperbola: $e\sinh F - F = \sqrt{\mu/(-a)^3}\,(t - t_p)$ with $\tanh(F/2) = \sqrt{(e-1)/(e+1)}\tan(\theta/2)$.
- Universal variables with Stumpff functions treat all conics in one equation.
:::

## Exercises

::: exercise Mean anomaly after twenty minutes {level=1 check="60.7"}
A satellite has $a = 8000\ \mathrm{km}$ and $e = 0.1$. Find its period and the mean anomaly $20\ \mathrm{min}$ after perigee. (Enter $M$ in degrees to three significant figures.)
::: solution
$n = \sqrt{398\,600/8000^3} = 8.823\times10^{-4}\ \mathrm{rad/s}$, $T = 2\pi/n = 7121\ \mathrm{s} = 118.7\ \mathrm{min}$. $M = nt = 8.823\times10^{-4} \times 1200 = 1.0588\ \mathrm{rad} = 60.7^\circ$. (In this time the true anomaly has advanced further, because the satellite started at perigee.)
:::
:::

::: exercise From true to mean anomaly {level=1 check="33.6"}
For an orbit with $e = 0.3$, find the eccentric anomaly and the mean anomaly at $\theta = 60^\circ$. (Enter $M$ in degrees to three significant figures.)
::: solution
$\tan(E/2) = \sqrt{0.7/1.3}\,\tan 30^\circ = 0.7338 \times 0.5774 = 0.4237$, $E = 0.8015\ \mathrm{rad} = 45.92^\circ$. $M = 0.8015 - 0.3\sin 0.8015 = 0.8015 - 0.2155 = 0.5860\ \mathrm{rad} = 33.6^\circ$. As expected near periapsis, $\theta > E > M$.
:::
:::

::: exercise Fraction of the period near periapsis {level=1 check="70.4"}
A satellite has $e = 0.5$ and a period of $6.00\ \mathrm{h}$. How long does it spend on the periapsis side of the latus rectum, $-90^\circ < \theta < 90^\circ$? (Enter the time in minutes to three significant figures.)
::: solution
At $\theta = 90^\circ$: $\tan(E/2) = \sqrt{0.5/1.5} = 0.5774$, $E = \pi/3 = 1.0472\ \mathrm{rad}$, $M = 1.0472 - 0.5\sin(\pi/3) = 1.0472 - 0.4330 = 0.6142\ \mathrm{rad}$. The time from $-90^\circ$ to $90^\circ$ is $2M/n = (2 \times 0.6142/2\pi) \times 360\ \mathrm{min} = 0.1955 \times 360 = 70.4\ \mathrm{min}$ — under a fifth of the period for half the angle.
:::
:::

::: exercise Newton's method by hand {level=2 check="128.2"}
Solve Kepler's equation for $e = 0.6$ and $M = 1.0000\ \mathrm{rad}$ by Newton's method, starting from $E_0 = M + e/2$, and find the true anomaly. (Enter $\theta$ in degrees to four significant figures.)
::: solution
$E_0 = 1.3$. $f(1.3) = 1.3 - 0.6\sin 1.3 - 1 = -0.27809$, $f' = 1 - 0.6\cos 1.3 = 0.83950$, $E_1 = 1.3 + 0.27809/0.83950 = 1.63131$. $f(E_1) = 1.63131 - 0.59937 - 1 = 0.03194$, $f' = 1.03614$, $E_2 = 1.60004$. One more step gives $E_3 = 1.599749$, and the next correction is below $10^{-7}$. So $E = 1.59975\ \mathrm{rad}$. $\tan(\theta/2) = 2\tan(0.79987) = 2 \times 1.02938 = 2.0588$ (since $\sqrt{1.6/0.4} = 2$), $\theta = 2\arctan 2.0588 = 2.23726\ \mathrm{rad} = 128.2^\circ$.
:::
:::

::: exercise Time on a hyperbola {level=2 check="45.7"}
A spacecraft on a hyperbolic Earth flyby has $e = 1.5$ and periapsis radius $7000\ \mathrm{km}$. How long after periapsis does it reach $\theta = 100^\circ$? (Enter the time in minutes to three significant figures.)
::: solution
$h = \sqrt{\mu r_p(1+e)} = \sqrt{398\,600 \times 7000 \times 2.5} = 83\,519\ \mathrm{km^2/s}$. $\tanh(F/2) = \sqrt{0.5/2.5}\tan 50^\circ = 0.4472 \times 1.1918 = 0.5330$, $F = 1.1886$. $M_h = 1.5\sinh 1.1886 - 1.1886 = 1.5 \times 1.4889 - 1.1886 = 1.0447$. $t = M_h h^3/[\mu^2(e^2-1)^{3/2}] = 1.0447 \times 3666.8/1.3975 = 2741\ \mathrm{s} = 45.7\ \mathrm{min}$. (The asymptote is at $\theta_\infty = \arccos(-1/1.5) = 131.8^\circ$.)
:::
:::

::: exercise Coverage from a highly eccentric orbit {level=2 check="6.41"}
The half-sidereal-day orbit designed in [[orbital-mechanics/two-body-problem]] has $a = 26\,562\ \mathrm{km}$ and perigee radius $6978\ \mathrm{km}$. For how long in each orbit is the satellite more than $30\,000\ \mathrm{km}$ above the Earth's surface? (Enter the time in hours to three significant figures.)
::: solution
$e = 1 - r_p/a = 0.7373$, $T = 43\,082\ \mathrm{s}$. The satellite is above $r = 36\,378\ \mathrm{km}$ when $a(1 - e\cos E) > 36\,378$, i.e. $\cos E < (1 - 36\,378/26\,562)/0.7373 = -0.5012$, so $E_1 < E < 2\pi - E_1$ with $E_1 = 2.0958\ \mathrm{rad}$. $M_1 = 2.0958 - 0.7373\sin 2.0958 = 1.4570$. The time above is $(2\pi - 2M_1)/n = (1 - M_1/\pi)\,T = 0.5360 \times 43\,082\ \mathrm{s} = 23\,091\ \mathrm{s} = 6.41\ \mathrm{h}$ — more than half the period above $30\,000\ \mathrm{km}$, although that arc is well under half the orbit by angle.
:::
:::

::: exercise The first terms of the series solution {level=3 check="0.00445"}
Show by two fixed-point iterations of $E = M + e\sin E$, starting from $E = M$, that $E = M + e\sin M + \tfrac12e^2\sin 2M + O(e^3)$. For $e = 0.1$ and $M = 1\ \mathrm{rad}$, compare the one-term approximation $E \approx M + e\sin M$ with the exact root. (Enter the error $E_\text{exact} - (M + e\sin M)$ in radians to three significant figures.)
::: solution
First iteration: $E_1 = M + e\sin M$. Second: $E_2 = M + e\sin(M + e\sin M) = M + e\left[\sin M + e\sin M\cos M + O(e^2)\right] = M + e\sin M + \tfrac12e^2\sin 2M + O(e^3)$. Each iteration gains one power of $e$ because the map has derivative $e\cos E$, of magnitude at most $e$.

For $e = 0.1$, $M = 1$: Newton gives $E = 1.0885978$. The one-term value is $1 + 0.1\sin 1 = 1.0841471$, error $0.00445\ \mathrm{rad}$. The two-term value $1.0841471 + 0.005\sin 2 = 1.0886936$ has error $-9.6\times10^{-5}$, about $e$ times smaller, as the $O(e^3)$ remainder predicts.
:::
:::

::: exercise Kepler's equation by integration {level=3}
Starting from [[#eq-time-integral]], show by the substitution $\tan(\vartheta/2) = \sqrt{(1+e)/(1-e)}\tan(E'/2)$ that for $0 < e < 1$
$$
\int_0^\theta\frac{\mathrm{d}\vartheta}{(1 + e\cos\vartheta)^2} = \frac{E - e\sin E}{(1-e^2)^{3/2}},
$$
and hence recover Kepler's equation. Then explain why the same substitution cannot work for $e \ge 1$.
::: solution
Under the substitution, [[#prop-E-theta]] gives $1 + e\cos\vartheta = (1 - e^2)/(1 - e\cos E')$. Differentiating $\cos\vartheta = (\cos E' - e)/(1 - e\cos E')$: $-\sin\vartheta\,\mathrm{d}\vartheta = -\frac{(1-e^2)\sin E'}{(1-e\cos E')^2}\,\mathrm{d}E'$, and with $\sin\vartheta = \sqrt{1-e^2}\sin E'/(1 - e\cos E')$ this gives $\mathrm{d}\vartheta = \frac{\sqrt{1-e^2}}{1 - e\cos E'}\,\mathrm{d}E'$. Hence
$$
\frac{\mathrm{d}\vartheta}{(1+e\cos\vartheta)^2} = \frac{(1-e\cos E')^2}{(1-e^2)^2}\cdot\frac{\sqrt{1-e^2}}{1-e\cos E'}\,\mathrm{d}E' = \frac{1 - e\cos E'}{(1-e^2)^{3/2}}\,\mathrm{d}E',
$$
which integrates to $(E - e\sin E)/(1-e^2)^{3/2}$. Multiplying by $h^3/\mu^2 = [\mu a(1-e^2)]^{3/2}/\mu^2 = (1-e^2)^{3/2}/n$ gives $t - t_p = (E - e\sin E)/n$. For $e \ge 1$ the factor $\sqrt{(1-e)/(1+e)}$ is zero or imaginary: the auxiliary circle no longer exists. The analytic continuation $E = iF$ turns $\cos E$ into $\cosh F$ and $\sin E$ into $i\sinh F$, which is how the hyperbolic Kepler equation arises.
:::
:::

::: exercise Design: an eclipse timer {level=3}
A satellite on a circular orbit at altitude $800\ \mathrm{km}$, with the Sun in its orbital plane, enters the Earth's cylindrical shadow when it passes behind the Earth. (a) Show that the fraction of the orbit spent in shadow is $\arcsin(R_E/r)/\pi$ and evaluate it. (b) The satellite is moved to an orbit with the same $a$ but $e = 0.1$, with apogee in the middle of the shadow. Estimate the new shadow time using Kepler's equation, and say whether the batteries must be larger or smaller. State all simplifying assumptions.
::: solution
Assumptions: cylindrical shadow (parallel sunlight, no penumbra), spherical Earth of radius $6378\ \mathrm{km}$, Sun direction in the orbit plane and fixed during one orbit.

(a) The satellite is in shadow when its distance from the Sun–Earth line is less than $R_E$ on the night side: $r\sin\phi < R_E$, where $\phi$ is the angle from the anti-Sun direction. The shadow arc is $2\arcsin(R_E/r)$ out of $2\pi$, a fraction $\arcsin(R_E/r)/\pi$. With $r = 7178\ \mathrm{km}$: $\arcsin(0.8886) = 1.0938\ \mathrm{rad}$, fraction $0.3483$; $T = 6052\ \mathrm{s}$, so $35.1\ \mathrm{min}$ in shadow.

(b) With apogee in the shadow, the shadow boundary is where $r\sin\phi = R_E$ with $\phi = \pi - \theta$ and $r = a(1-e^2)/(1+e\cos\theta)$. Solving numerically (bisection) gives the edges at $\theta = \pm 2.125\ \mathrm{rad}$ (about $\pm 121.8^\circ$), so the shadow arc is $\phi = \pm 1.017\ \mathrm{rad}$ — narrower than the circular case's $\pm 1.094$ because the satellite is higher. Converting to time: $E = 2.0376\ \mathrm{rad}$, $M = 2.0376 - 0.1\sin 2.0376 = 1.9483$, and the shadow lasts $(2\pi - 2M)/n = (1 - M/\pi)T = 0.3798 \times 6052 = 2299\ \mathrm{s} = 38.3\ \mathrm{min}$. The shadow arc is shorter in angle but the satellite is slow at apogee, and the time effect wins: the eclipse is about $3.2\ \mathrm{min}$ longer, so the batteries must store about $9\,\%$ more energy. Moving perigee into the shadow would shorten the eclipse instead. (A real design adds the penumbra, the seasonal variation of the Sun's angle to the orbit plane, and margin for battery ageing.)
:::
:::
