An airfoil section in a two-dimensional wind tunnel is an idealisation: it spans the tunnel from wall to wall, so the air has nowhere to go but over and under it. A real wing ends. At the tips, the high-pressure air below the wing spills round into the low-pressure region above, and the flow rolls up into a pair of **trailing vortices** that stream behind the aircraft for kilometres. Those vortices induce a downward velocity — **downwash** — over the whole wing, which tilts the local flow and the lift vector backwards. The backward component of the lift is a drag that has no counterpart in two dimensions: the **induced drag**, the price of producing lift with a wing of finite span. It is typically a quarter to two-fifths of an airliner's drag in cruise and the larger part of it at take-off and in the climb, and it is why gliders and long-range aircraft have long, slender wings.

This chapter quantifies all of that with Prandtl's **lifting-line theory**. You will need the vortex ideas and Kutta–Joukowski theorem of [[aerodynamics/potential-flow]], and the section lift curve $c_l = a_0(\alpha - \alpha_{L=0})$ from [[aerodynamics/thin-airfoil-theory]]; the Glauert integral proved there is used again. Notation: span $b$, wing area $S$, aspect ratio $AR = b^2/S$, local chord $c(y)$ with $y$ the spanwise coordinate measured from the plane of symmetry, wing coefficients $C_L$, $C_{D,i}$, section coefficients $c_l$.

## The vortex system of a finite wing

Three facts about vortices in an ideal fluid, due to Helmholtz, set the structure. A vortex filament has the same strength (circulation) along its whole length; it cannot end in the fluid, but must close on itself, extend to infinity, or end on a boundary; and it moves with the fluid. A wing carries a bound circulation $\Gamma(y)$ which must fall to zero at the tips (there is no pressure difference across a tip). Wherever $\Gamma$ changes along the span, the filaments that carry it cannot simply stop: each change $d\Gamma$ turns downstream as a **trailing vortex** of strength $-\left(d\Gamma/dy\right)dy$. The wing leaves a **vortex sheet** behind it, strongest near the tips where $\Gamma$ falls fastest, which within a few spans rolls up into two concentrated tip vortices. The simplest model with this structure is the **horseshoe vortex**: a bound vortex of constant strength $\Gamma$ along the span, turning into two trailing vortices of strength $\Gamma$ at the tips — and, far behind, closed by the starting vortex left on the runway.

The velocity induced by a vortex filament of arbitrary shape is given by a formula that has the same form as the Biot–Savart law of magnetism.

::: proposition Biot–Savart law and the semi-infinite filament {#prop-biot-savart}
A vortex filament of strength $\Gamma$ induces at a point $P$ the velocity
$$
d\mathbf{V} = \frac{\Gamma}{4\pi}\,\frac{d\mathbf{l}\times\mathbf{r}}{|\mathbf{r}|^3}
$$
from each element $d\mathbf{l}$, where $\mathbf{r}$ is the vector from the element to $P$. For a straight filament, a point at perpendicular distance $h$ sees a velocity of magnitude
$$
V = \frac{\Gamma}{4\pi h}\left(\cos\beta_1 - \cos\beta_2\right),
$$ {#eq-straight-filament}
where $\beta_1$, $\beta_2$ are the angles between the filament direction and the lines to $P$ from its two ends. An infinite filament gives $\Gamma/(2\pi h)$, the two-dimensional point vortex; a **semi-infinite** filament, for a point level with its end, gives half of that, $\Gamma/(4\pi h)$.
:::

::: proof
For a straight filament along a line, put the foot of the perpendicular from $P$ at the origin, the filament along $s$, so that an element at $s$ is at distance $r = \sqrt{s^2 + h^2}$ from $P$ and $|d\mathbf{l}\times\mathbf{r}| = h\,ds$; every element's contribution points in the same direction (normal to the plane of filament and $P$). Then $V = \frac{\Gamma}{4\pi}\int\frac{h\,ds}{(s^2 + h^2)^{3/2}}$. With $s = -h\cot\beta$, $ds = h\csc^2\beta\,d\beta$ and $s^2 + h^2 = h^2\csc^2\beta$, the integrand becomes $\sin\beta\,d\beta/h$, so $V = \frac{\Gamma}{4\pi h}\int_{\beta_1}^{\beta_2}\sin\beta\,d\beta = \frac{\Gamma}{4\pi h}(\cos\beta_1 - \cos\beta_2)$. An infinite line has $\beta_1 = 0$, $\beta_2 = \pi$, giving $\Gamma/(2\pi h)$, which agrees with the two-dimensional vortex and fixes the constant $1/4\pi$ in the Biot–Savart law. A semi-infinite filament starting level with $P$ has $\beta_1 = \pi/2$, $\beta_2 = \pi$: $\Gamma/(4\pi h)$. Assumptions: incompressible, inviscid flow; the induced velocity of a vortex is the kinematic consequence of its vorticity, exactly as a magnetic field is of a current.
:::

## Prandtl's lifting-line theory

Model the wing by a single **lifting line** along the span (the locus of the quarter-chord points, where thin-airfoil theory puts each section's lift), carrying a bound circulation $\Gamma(y)$ that varies along the span, with a flat trailing sheet behind it. Each section is assumed to behave like a two-dimensional airfoil — but in a flow tilted by the downwash.

::: definition Downwash, induced and effective angles {#def-downwash}
The **downwash** $w(y)$ is the downward velocity induced at the lifting line by the trailing vortex sheet. The **induced angle of attack** is $\alpha_i = w/V_\infty$ (small angles). The **effective angle of attack** of a section is the angle between its chord and the *local* relative wind,
$$
\alpha_\text{eff} = \alpha - \alpha_i ,
$$
where $\alpha$ is the geometric angle of attack between the chord and the free stream (including any twist). The section's lift, perpendicular to the local relative wind, is tilted back by $\alpha_i$; its component along $V_\infty$ is the **induced drag**.
:::

::: theorem Prandtl's lifting-line equation {#thm-lifting-line}
For a straight wing of high aspect ratio in steady, incompressible flow, with sections of lift slope $a_0$ and zero-lift angle $\alpha_{L=0}(y)$, the circulation distribution satisfies, at every station $y_0$ on the span,
$$
\alpha(y_0) = \frac{2\,\Gamma(y_0)}{a_0\,V_\infty\,c(y_0)} + \alpha_{L=0}(y_0) + \frac{1}{4\pi V_\infty}\int_{-b/2}^{b/2}\frac{\left(d\Gamma/dy\right)dy}{y_0 - y},
$$ {#eq-lifting-line}
with $\Gamma(\pm b/2) = 0$. The last term is the induced angle $\alpha_i(y_0)$. The lift and induced drag are
$$
L = \rho_\infty V_\infty\int_{-b/2}^{b/2}\Gamma\,dy, \qquad D_i = \rho_\infty\int_{-b/2}^{b/2}w\,\Gamma\,dy = \rho_\infty V_\infty\int_{-b/2}^{b/2}\alpha_i\,\Gamma\,dy .
$$ {#eq-L-Di}
:::

::: proof
*Downwash.* Between $y$ and $y + dy$ the bound circulation changes by $(d\Gamma/dy)\,dy$, and by Helmholtz's theorem a trailing filament of that strength (with the sign that keeps the total circulation continuous) runs from the lifting line to infinity downstream. By [[#prop-biot-savart]] a semi-infinite filament induces at the point $y_0$ on the lifting line, level with its start and a distance $|y_0 - y|$ from it, a vertical velocity of magnitude $\left|(d\Gamma/dy)\,dy\right|/\left(4\pi|y_0 - y|\right)$. Checking the direction for a filament outboard on the right-hand wing, where $\Gamma$ is falling ($d\Gamma/dy < 0$, $y > y_0$): the tip-vortex sense makes air rise outboard of it and descend inboard, i.e. downward at $y_0$. Hence, with downwash positive,
$$
w(y_0) = \frac{1}{4\pi}\int_{-b/2}^{b/2}\frac{\left(d\Gamma/dy\right)dy}{y_0 - y} ,
$$
taken as a principal value, and $\alpha_i = w/V_\infty$ is the last term of [[#eq-lifting-line]].

*Section law.* Each section sees a local free stream $V_\infty$ tilted down by $\alpha_i$, so its lift per unit span is $L' = \tfrac12\rho_\infty V_\infty^2c\,a_0\left(\alpha - \alpha_i - \alpha_{L=0}\right)$. By the Kutta–Joukowski theorem it is also $\rho_\infty V_\infty\Gamma$. Equating gives $\alpha = 2\Gamma/(a_0V_\infty c) + \alpha_{L=0} + \alpha_i$, which is [[#eq-lifting-line]].

*Forces.* The local force $\rho_\infty V_\infty\Gamma\,dy$ is perpendicular to the local relative wind; its component perpendicular to $V_\infty$ is the lift (with $\cos\alpha_i \approx 1$), and its component along $V_\infty$ is $\rho_\infty V_\infty\Gamma\sin\alpha_i\,dy \approx \rho_\infty w\Gamma\,dy$. Integrating gives [[#eq-L-Di]]. Assumptions: steady, incompressible, inviscid flow; a straight, unswept wing of large aspect ratio, so that each section sees a nearly two-dimensional flow and the downwash varies slowly along the span; the trailing sheet is flat and does not roll up over the wing; small angles; the section lift curve is linear.
:::

The equation is an integro-differential equation for $\Gamma(y)$: the unknown appears both on its own and inside an integral of its derivative. Two routes lead to solutions — choose a $\Gamma$ and find the corresponding wing (the elliptic case), or choose the wing and solve for $\Gamma$ by a series (the general case).

## The elliptic lift distribution

::: theorem The elliptically loaded wing {#thm-elliptic}
If the circulation is elliptic along the span,
$$
\Gamma(y) = \Gamma_0\sqrt{1 - \left(\frac{2y}{b}\right)^2},
$$
then the downwash is **uniform** along the span, $w = \Gamma_0/(2b)$, and
$$
\alpha_i = \frac{C_L}{\pi AR}, \qquad C_{D,i} = \frac{C_L^2}{\pi AR}.
$$ {#eq-elliptic}
An untwisted wing with the same section throughout has elliptic loading if and only if its chord varies elliptically; its lift-curve slope is then
$$
a = \frac{dC_L}{d\alpha} = \frac{a_0}{1 + a_0/(\pi AR)} .
$$ {#eq-slope-elliptic}
:::

::: proof
Substitute $y = -\tfrac b2\cos\theta$, so that $\theta$ runs from $0$ to $\pi$ along the span and $\Gamma = \Gamma_0\sin\theta$. Then $(d\Gamma/dy)\,dy = d\Gamma = \Gamma_0\cos\theta\,d\theta$ and $y_0 - y = \tfrac b2(\cos\theta - \cos\theta_0)$, so
$$
w(\theta_0) = \frac{1}{4\pi}\int_0^\pi\frac{\Gamma_0\cos\theta\,d\theta}{\tfrac b2\left(\cos\theta - \cos\theta_0\right)} = \frac{\Gamma_0}{2\pi b}\cdot\pi = \frac{\Gamma_0}{2b},
$$
using Glauert's integral $\int_0^\pi\cos\theta\,d\theta/(\cos\theta - \cos\theta_0) = \pi$ ([[aerodynamics/thin-airfoil-theory]]). The lift is $L = \rho_\infty V_\infty\Gamma_0\tfrac b2\int_0^\pi\sin^2\theta\,d\theta = \tfrac\pi4\rho_\infty V_\infty b\Gamma_0$, so $\Gamma_0 = 2V_\infty SC_L/(\pi b)$ and $\alpha_i = \Gamma_0/(2bV_\infty) = SC_L/(\pi b^2) = C_L/(\pi AR)$. The downwash being uniform, [[#eq-L-Di]] gives $D_i = \alpha_iL$, so $C_{D,i} = \alpha_iC_L = C_L^2/(\pi AR)$.

For the planform: with uniform $\alpha_i$, the same $\alpha$ and $\alpha_{L=0}$ everywhere, [[#eq-lifting-line]] gives $\Gamma(y)/c(y) = \text{const}$, so $c(y)$ must be elliptic; conversely an elliptic chord makes the elliptic $\Gamma$ satisfy the equation. Then every section has the same $c_l = a_0(\alpha - \alpha_i - \alpha_{L=0})$, equal to $C_L$, and substituting $\alpha_i = C_L/(\pi AR)$ gives $C_L = a_0(\alpha - \alpha_{L=0})/\left(1 + a_0/(\pi AR)\right)$, which is [[#eq-slope-elliptic]].
:::

The result has a striking physical reading. Induced drag is $D_i = L^2/(\tfrac12\rho_\infty V_\infty^2\,\pi b^2)$: it depends on the **span loading** $L/b$, not on wing area. Doubling the span at fixed lift and speed quarters the induced drag. And since $q_\infty \propto V_\infty^2$, induced drag falls as $1/V_\infty^2$ — it dominates at low speed (take-off, climb, loiter), while profile drag, growing as $V_\infty^2$, dominates at high speed.

::: example An airliner in cruise {#ex-airliner}
A twin-engined airliner of mass $60\,\mathrm{t}$ with $S = 125\,\mathrm{m^2}$ and $b = 34\,\mathrm{m}$ cruises at $230\,\mathrm{m/s}$ at $10.7\,\mathrm{km}$, where the ISA density is $0.380\,\mathrm{kg/m^3}$. Treating the wing as elliptically loaded, find $C_L$, the induced angle and the induced drag.
::: solution
$AR = 34^2/125 = 9.25$ and $q_\infty = \tfrac12(0.3796)(230)^2 = 10.04\,\mathrm{kPa}$. Lift equals weight: $C_L = 60\,000 \times 9.81/(10\,040 \times 125) = 0.469$. Then
$$
\alpha_i = \frac{0.469}{\pi \times 9.25} = 0.0161\,\mathrm{rad} = 0.92^\circ, \qquad C_{D,i} = \frac{0.469^2}{\pi \times 9.25} = 0.00757,
$$
and $D_i = C_{D,i}q_\infty S = 0.00757 \times 10\,040 \times 125 = 9.50\,\mathrm{kN}$. As a check, $D_i = W^2/(q_\infty\pi b^2) = (588\,600)^2/(10\,040\,\pi \times 34^2) = 9.50\,\mathrm{kN}$. *Sanity check:* aircraft of this class cruise at a total drag of roughly $W/17 \approx 35\,\mathrm{kN}$, so the induced drag is about a quarter of the total, in the expected range; a real wing with $e \approx 0.85$ (below) would have about $11\,\mathrm{kN}$.
:::
:::

## General loading: Glauert's series

For an arbitrary wing, expand the circulation in a Fourier sine series that vanishes at both tips,
$$
\Gamma(\theta) = 2bV_\infty\sum_{n=1}^{N}A_n\sin n\theta, \qquad y = -\tfrac b2\cos\theta .
$$ {#eq-gamma-series}

::: theorem Lift and induced drag of a general loading {#thm-general-loading}
With [[#eq-gamma-series]], the induced angle, lift coefficient and induced drag coefficient are
$$
\alpha_i(\theta_0) = \sum_n nA_n\frac{\sin n\theta_0}{\sin\theta_0}, \qquad
C_L = \pi AR\,A_1, \qquad
C_{D,i} = \pi AR\sum_n nA_n^2 = \frac{C_L^2}{\pi AR}\left(1 + \delta\right),
$$ {#eq-general-cdi}
where $\delta = \sum_{n\ge2}n\left(A_n/A_1\right)^2 \ge 0$. For a given span and lift the induced drag is least, $\delta = 0$, when the loading is elliptic. The **span efficiency factor** is $e = 1/(1 + \delta)$. The coefficients satisfy the **monoplane equation**
$$
\mu(\theta_0)\left[\alpha(\theta_0) - \alpha_{L=0}(\theta_0)\right] = \sum_n A_n\sin n\theta_0\left(1 + \frac{n\,\mu(\theta_0)}{\sin\theta_0}\right), \qquad \mu = \frac{c\,a_0}{4b}.
$$ {#eq-monoplane}
:::

::: proof
$d\Gamma = 2bV_\infty\sum nA_n\cos n\theta\,d\theta$, and as in [[#thm-elliptic]]
$$
\alpha_i(\theta_0) = \frac{1}{4\pi V_\infty}\int_0^\pi\frac{2bV_\infty\sum nA_n\cos n\theta\,d\theta}{\tfrac b2(\cos\theta - \cos\theta_0)} = \frac1\pi\sum nA_n\cdot\frac{\pi\sin n\theta_0}{\sin\theta_0},
$$
by Glauert's integral. Lift: $L = \rho_\infty V_\infty\int\Gamma\,dy = \rho_\infty V_\infty\cdot2bV_\infty\cdot\tfrac b2\sum A_n\int_0^\pi\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\rho_\infty V_\infty^2b^2A_1$, so $C_L = \pi b^2A_1/S = \pi AR\,A_1$. Induced drag: $D_i = \rho_\infty V_\infty\int\alpha_i\Gamma\,dy$; with $dy = \tfrac b2\sin\theta\,d\theta$, the $\sin\theta$ cancels the denominator of $\alpha_i$, and orthogonality $\int_0^\pi\sin n\theta\sin m\theta\,d\theta = \tfrac\pi2\delta_{nm}$ leaves $D_i = \rho_\infty V_\infty^2b^2\tfrac\pi2\sum nA_n^2$, i.e. $C_{D,i} = \pi AR\sum nA_n^2$. Factoring out $A_1^2 = (C_L/\pi AR)^2$ gives the $(1 + \delta)$ form; every term of $\delta$ is non-negative, so $\delta = 0$ (only $A_1$, i.e. elliptic loading) minimises $C_{D,i}$ at given $C_L$ and $AR$. Finally, substituting [[#eq-gamma-series]] and $\alpha_i$ into [[#eq-lifting-line]] and multiplying through by $\mu = ca_0/(4b)$ gives [[#eq-monoplane]]. Assumptions: those of [[#thm-lifting-line]].
:::

For a symmetric wing at no sideslip only odd $n$ appear. In practice the monoplane equation is enforced at $N$ stations on one half-span and the $N$ unknown odd coefficients are found from an $N \times N$ linear system — a collocation method, and in effect a panel method along the span.

::: algorithm Solving the monoplane equation {#alg-monoplane}
1. Choose $N$ (4–10 is usually enough) and stations $\theta_k = k\pi/(2N)$, $k = 1, \dots, N$, on the half-span $0 < \theta \le \pi/2$.
2. At each station evaluate the chord $c(\theta_k)$, the geometric angle $\alpha(\theta_k)$ including twist, $\alpha_{L=0}(\theta_k)$ and $\mu_k = c_ka_0/(4b)$.
3. Form the matrix $M_{kj} = \sin n_j\theta_k\left(1 + n_j\mu_k/\sin\theta_k\right)$ with $n_j = 1, 3, 5, \dots$ and the right-hand side $\mu_k(\alpha_k - \alpha_{L=0,k})$, and solve for the $A_{n_j}$.
4. Compute $C_L = \pi AR\,A_1$, $\delta = \sum_{j\ge2}n_j(A_{n_j}/A_1)^2$, $C_{D,i} = C_L^2(1 + \delta)/(\pi AR)$, and the spanwise lift coefficient $c_l(y) = 2\Gamma/(V_\infty c)$.
5. Repeat with larger $N$ until $C_L$ and $\delta$ stop changing.
:::

::: example A rectangular wing by hand {#ex-rectangular}
An untwisted rectangular wing of aspect ratio $6$ has sections with $a_0 = 2\pi$ and $\alpha_{L=0} = 0$, at $\alpha = 5^\circ$. Solve the monoplane equation with two terms ($A_1$, $A_3$) at $\theta = 45^\circ$ and $90^\circ$, and compare with a converged solution.
::: solution
The chord is $c = b/AR$, so $\mu = a_0/(4AR) = 2\pi/24 = 0.2618$ everywhere, and the right-hand side is $\mu\alpha = 0.2618 \times 0.08727 = 0.02285$. At $\theta = 45^\circ$ ($\sin\theta = 0.7071$, $\sin3\theta = 0.7071$) and $90^\circ$ ($\sin\theta = 1$, $\sin3\theta = -1$):
$$
\begin{aligned}
0.7071(1 + 0.3702)A_1 + 0.7071(1 + 1.1107)A_3 &= 0.02285 &&\Rightarrow\; 0.9689A_1 + 1.4925A_3 = 0.02285,\\
1.2618A_1 - 1.7854A_3 &= 0.02285 .
\end{aligned}
$$
Solving: $A_1 = 0.020727$, $A_3 = 0.001852$. Then $C_L = \pi(6)(0.020727) = 0.391$, $\delta = 3(0.001852/0.020727)^2 = 0.024$, $e = 0.977$, and $C_{D,i} = 0.391^2(1.024)/(6\pi) = 0.0083$. With $N = 4$ terms the results become $C_L = 0.395$ and $\delta = 0.046$; with $N = 8$, $C_L = 0.3953$, $\delta = 0.048$, $e = 0.954$. *Sanity check:* the lift is converged to 1 per cent with two terms, the drag factor $\delta$ needs more, because it depends on the *squares* of the small higher harmonics; and the rectangular wing, which carries too much load near its tips compared with the ellipse, has about 5 per cent more induced drag than an elliptic wing of the same span — the classical result for $AR = 6$.
:::
:::

The same computation shows why tapered wings are popular: for $AR = 8$ and $a_0 = 2\pi$, a rectangular wing has $\delta = 0.068$, a taper ratio (tip chord/root chord) of $0.4$ gives $\delta = 0.013$, and a pointed tip gives $\delta = 0.157$. A straight taper of about $0.3$–$0.4$ is within 1–2 per cent of elliptic in induced drag and far easier to build.

## Lift-curve slope and drag polar of a finite wing

The induced angle reduces the effective incidence, so a finite wing needs more angle of attack than its sections for the same lift: its lift curve is **flatter**. For a general planform the lifting-line result can be written
$$
a = \frac{a_0}{1 + \dfrac{a_0}{\pi AR}\left(1 + \tau\right)},
$$ {#eq-slope-general}
with $\tau$ a small planform factor (about $0.05$–$0.25$ for straight wings) that, strictly, is *not* the same as $\delta$. In preliminary design both are often replaced by one efficiency factor, $a \approx a_0/\left(1 + a_0/(\pi e AR)\right)$; for $a_0 = 2\pi$, $AR = 8$ and $e = 0.85$ this gives $a = 2\pi/(1 + 2/6.8) = 4.86$ per radian, against $5.03$ for an elliptic wing and $2\pi = 6.28$ for the section. Lifting-line theory loses accuracy below an aspect ratio of about $4$; there an empirical formula of Helmbold's type is used,
$$
a = \frac{2\pi AR}{2 + \sqrt{AR^2\left(1 + \tan^2\Lambda_{c/2}\right) + 4}}\qquad(\text{incompressible}),
$$ {#eq-helmbold}
which for unswept wings ($\Lambda_{c/2} = 0$) is Helmbold's 1942 correction of lifting-line theory and, with the sweep term, the low-speed form of the lift-slope formula of the USAF DATCOM. It gives $4.91$ per radian for $AR = 8$ and $3.36$ for $AR = 3$, and tends to the slender-wing value $\pi AR/2$ as $AR \to 0$.

::: widget plot
f: 2*pi/(1 + 2/(e*x)); 2*pi*x/(2 + sqrt(x^2*(1 + tan(L*pi/180)^2) + 4)); pi*x/2
x: 0.5, 20
y: 0, 6.5
sliders: e=0.85:0.6:1:0.01, L=0:0:50:1
hlines: 6.283
labels: a_0/(1 + a_0/\pi e AR); \text{Helmbold--DATCOM, sweep}\ L; \pi AR/2\ \text{(slender wing)}
caption: Wing lift-curve slope (per radian) against aspect ratio, for sections with $a_0 = 2\pi$ (the horizontal line). The first curve is lifting-line theory with efficiency $e$; at $AR = 8$, $e = 0.85$ it reads $4.86$. The second is [[#eq-helmbold]] with half-chord sweep $L$ degrees: increase $L$ to see sweep flatten the lift curve. The two agree within a few per cent for $AR \gtrsim 6$; at low aspect ratio lifting-line theory over-predicts and the empirical curve approaches the slender-wing limit $\pi AR/2$.
:::

::: example Angle of attack of a finite wing {#ex-slope}
A wing of aspect ratio $8$ uses a symmetric section with $a_0 = 2\pi$ per radian. Taking $e = 0.85$ in the lift slope, what angle of attack gives $C_L = 0.5$? Compare with the section at the same lift coefficient.
::: solution
$a = 2\pi/\left(1 + 2\pi/(\pi \times 0.85 \times 8)\right) = 6.2832/1.2941 = 4.855$ per radian. Then $\alpha = 0.5/4.855 = 0.1030\,\mathrm{rad} = 5.90^\circ$. The section alone needs $0.5/(2\pi) = 0.0796\,\mathrm{rad} = 4.56^\circ$; the difference, $1.34^\circ$, is the induced angle (somewhat more than the elliptic value $C_L/(\pi AR) = 0.0199\,\mathrm{rad} = 1.14^\circ$, because $e < 1$). *Sanity check:* the finite wing's slope is $77$ per cent of the section's, which is typical of moderate aspect ratios.
:::
:::

The total drag of a wing — and, with its profile and interference drag lumped in, of a whole aircraft — is commonly written as the **parabolic drag polar**
$$
C_D = C_{D,0} + \frac{C_L^2}{\pi e AR},
$$ {#eq-polar}
where now $e$, the **Oswald efficiency factor**, includes both the non-elliptic span loading and the part of the profile drag that grows with lift; typical values are $0.7$–$0.85$ for complete aircraft. The best lift-to-drag ratio follows by minimising $C_D/C_L$:
$$
C_L^* = \sqrt{\pi e AR\,C_{D,0}}, \qquad \left(\frac LD\right)_\text{max} = \frac12\sqrt{\frac{\pi e AR}{C_{D,0}}},
$$ {#eq-ldmax}
at which point induced and zero-lift drag are equal. Aspect ratio and cleanliness ($C_{D,0}$) count equally under the square root, which is why sailplanes have both very high aspect ratios and very smooth surfaces.

::: example Best glide of a light aircraft {#ex-ldmax}
A light aircraft has $C_{D,0} = 0.025$, $AR = 8$ and $e = 0.80$. Find the lift coefficient for best $L/D$, the value of $(L/D)_\text{max}$, and the drag split at that point.
::: solution
$\pi eAR = \pi(0.8)(8) = 20.11$. Then $C_L^* = \sqrt{20.11 \times 0.025} = 0.709$ and $(L/D)_\text{max} = \tfrac12\sqrt{20.11/0.025} = 14.2$. At $C_L^*$ the induced drag coefficient is $0.709^2/20.11 = 0.025$, equal to $C_{D,0}$, so the total is $0.050$ and $L/D = 0.709/0.050 = 14.2$. *Sanity check:* glide ratios of $9$–$14$ are typical for such aircraft with the propeller windmilling or stopped, and the best-glide lift coefficient of about $0.7$ corresponds to a speed some 30 per cent above stall.
:::
:::

::: quiz
At fixed weight and altitude, an aircraft flies twice as fast. By what factor does its induced drag change?
- [ ] It doubles
- [ ] It stays the same
- [ ] It halves
- [x] It falls to a quarter
::: solution
$D_i = L^2/(q_\infty\pi eb^2)$ with $L = W$ fixed, and $q_\infty \propto V_\infty^2$, so $D_i \propto 1/V_\infty^2$: doubling the speed quarters it. (Profile drag rises by a factor of four over the same change, which is why total drag has a minimum.)
:::
:::

::: warning Aspect ratio, span and the efficiency factors
Three common slips. **Using geometric area for $AR$ inconsistently:** $AR = b^2/S$ uses the *reference* area, including the part of the wing inside the fuselage; mixing that with a net area gives the wrong $C_{D,i}$. **Confusing the factors:** the span efficiency $e = 1/(1 + \delta)$ of lifting-line theory, the lift-slope factor $\tau$, and the Oswald factor of a whole aircraft (which includes lift-dependent profile drag and fuselage effects) are three different numbers; quote which one you mean. **Applying elliptic results to swept or low-aspect-ratio wings:** lifting-line theory assumes a straight wing of high aspect ratio; for $AR \lesssim 4$, strong sweep or delta planforms use vortex-lattice methods or empirical data such as [[#eq-helmbold]]. And remember that the theory is inviscid and linear: no stall, no profile drag, and no compressibility (see [[aerodynamics/compressible-airfoils]]).
:::

## Sweep and wingtip devices

A swept wing, with its quarter-chord line inclined at an angle $\Lambda$ to the span-normal direction, was introduced to delay compressibility effects, and its aerodynamics are covered in [[aerodynamics/compressible-airfoils]] and [[aerodynamics/supersonic-hypersonic]]. At low speed sweep has three main consequences: the lift slope falls (roughly as $\cos\Lambda$ for large aspect ratio, and as in [[#eq-helmbold]]); the spanwise loading moves outboard on aft-swept wings, so the tips tend to stall first unless the wing is twisted down at the tips ("washout"); and the spanwise flow thickens the boundary layer towards the tips. Lifting-line theory cannot handle sweep properly because the bound vortex is no longer perpendicular to the stream; the **vortex-lattice method**, which covers the wing with a grid of horseshoe vortices and enforces tangency at a control point in each, is the standard generalisation.

Winglets and other **wingtip devices** reduce induced drag not by "blocking" the tip vortex but by changing the span loading and the shape of the trailing wake: in effect they behave like a modest increase in span, for less root bending moment and within a gate-width limit. The trade between the induced-drag saving, the added profile drag and weight, and the structural cost is a design question that each aircraft answers differently.

::: application Wake vortices and separation of aircraft
The trailing vortices of a large aircraft are strong and long-lived. For an elliptic loading the circulation at mid-span is $\Gamma_0 = 4L/(\pi\rho_\infty V_\infty b)$; for a $300\,\mathrm{t}$ aircraft on approach ($V_\infty = 75\,\mathrm{m/s}$, $b = 65\,\mathrm{m}$, sea level) that is about $630\,\mathrm{m^2/s}$, and at $10\,\mathrm{m}$ from the rolled-up core a vortex of that strength induces a swirl of about $\Gamma_0/(2\pi \times 10) = 10\,\mathrm{m/s}$ — enough to roll a light aircraft that crosses it. The vortices descend behind the generating aircraft at a speed of a metre or two per second and decay over minutes. Air-traffic-control separation minima between heavy and light aircraft on approach and departure exist because of this; they are set by the regulators from measurements, not from this estimate.
:::

::: history
Frederick **Lanchester** described the trailing-vortex system of a finite wing and the origin of induced drag in *Aerodynamics* (1907). Ludwig **Prandtl** and his Göttingen colleagues, notably Albert **Betz** and Max **Munk**, turned the idea into the quantitative lifting-line theory of 1918–1919 (*Tragflügeltheorie*), including the result that elliptic loading gives the least induced drag for a given span and lift, and the Göttingen wind tunnel confirmed the predicted effect of aspect ratio on lift slope and drag. Hermann **Glauert** introduced the Fourier-series solution used here in *The Elements of Aerofoil and Airscrew Theory* (1926). The efficiency factor of the parabolic drag polar is named after W. Bailey **Oswald**, whose NACA Report 408 (1932) set out general formulas and charts for airplane performance.
:::

## Summary

::: summary
- A finite wing's bound circulation must vanish at the tips; every spanwise change $d\Gamma$ is shed as a trailing vortex. The trailing sheet induces a downwash $w$ and an induced angle $\alpha_i = w/V_\infty$ that tilts the lift back: induced drag.
- Prandtl's lifting-line equation: $\alpha = 2\Gamma/(a_0V_\infty c) + \alpha_{L=0} + \alpha_i$, with $\alpha_i = \frac{1}{4\pi V_\infty}\int\frac{d\Gamma/dy}{y_0 - y}\,dy$.
- Elliptic loading: uniform downwash, $\alpha_i = C_L/(\pi AR)$, $C_{D,i} = C_L^2/(\pi AR)$, $a = a_0/(1 + a_0/\pi AR)$; the minimum induced drag for given span and lift. $D_i = L^2/(q_\infty\pi b^2)$: span loading matters, and $D_i \propto 1/V_\infty^2$.
- General loading by Glauert's series: $C_L = \pi AR\,A_1$, $C_{D,i} = C_L^2(1 + \delta)/(\pi AR)$, $e = 1/(1 + \delta)$; solve the monoplane equation by collocation. Taper of $0.3$–$0.4$ is nearly elliptic.
- Drag polar $C_D = C_{D,0} + C_L^2/(\pi eAR)$; $(L/D)_\text{max} = \tfrac12\sqrt{\pi eAR/C_{D,0}}$, where induced drag equals zero-lift drag.
- With $a_0 = 2\pi$, $AR = 8$, $e = 0.85$: $a \approx 4.86$ per radian. Use empirical or vortex-lattice methods for low $AR$ and sweep.
:::

## Exercises

::: exercise Induced drag coefficient {level=1 check="0.0127"}
A wing of aspect ratio $10$ with span efficiency $e = 0.9$ flies at $C_L = 0.6$. Find its induced drag coefficient. (Enter $C_{D,i}$.)
::: solution
$C_{D,i} = C_L^2/(\pi eAR) = 0.36/(\pi \times 0.9 \times 10) = 0.0127$.
:::
:::

::: exercise Induced angle {level=1 check="2.08"}
An elliptically loaded wing of aspect ratio $7$ operates at $C_L = 0.8$. Find the induced angle of attack. (Enter $\alpha_i$ in degrees.)
::: solution
$\alpha_i = C_L/(\pi AR) = 0.8/(7\pi) = 0.03638\,\mathrm{rad} = 2.08^\circ$.
:::
:::

::: exercise Lift slope per degree {level=1 check="0.0800"}
Sections with $a_0 = 2\pi$ per radian are used on a wing of aspect ratio $6$; take $e = 0.9$ in the lift-slope formula. Find the wing lift-curve slope. (Enter it per degree.)
::: solution
$a = 2\pi/\left(1 + 2/(0.9 \times 6)\right) = 6.2832/1.3704 = 4.585$ per radian $= 0.0800$ per degree, against $0.1097$ per degree for the section.
:::
:::

::: exercise Longer span {level=2 check="0.892"}
The airliner of example [[#ex-airliner]] is given a wing of $36\,\mathrm{m}$ span instead of $34\,\mathrm{m}$, with the same weight, speed, altitude and span efficiency. By what factor does its induced drag change? (Enter the ratio new/old.)
::: solution
$D_i = W^2/(q_\infty\pi eb^2) \propto 1/b^2$, so the ratio is $(34/36)^2 = 0.892$: an 11 per cent reduction, about $1.0\,\mathrm{kN}$ here. The wing area does not appear. The price is a larger root bending moment and a heavier wing.
:::
:::

::: exercise Best glide of a sailplane {level=2 check="38.8"}
A sailplane has $AR = 25$, $e = 0.92$ and $C_{D,0} = 0.012$. Find its maximum lift-to-drag ratio. (Enter $(L/D)_\text{max}$.)
::: solution
$(L/D)_\text{max} = \tfrac12\sqrt{\pi(0.92)(25)/0.012} = \tfrac12\sqrt{6021} = 38.8$, at $C_L^* = \sqrt{\pi(0.92)(25)(0.012)} = 0.93$. Real high-performance sailplanes reach 40–60 thanks to even lower $C_{D,0}$ from extensive laminar flow; the parabolic polar is also only an approximation for laminar-flow sections.
:::
:::

::: exercise Downwash of an elliptic wing {level=2 check="3.71"}
For the airliner of example [[#ex-airliner]], find the mid-span circulation $\Gamma_0$ and the uniform downwash at the wing. (Enter $w$ in m/s.)
::: solution
$L = \tfrac\pi4\rho_\infty V_\infty b\Gamma_0$ gives $\Gamma_0 = 4 \times 588\,600/(\pi \times 0.3796 \times 230 \times 34) = 252\,\mathrm{m^2/s}$, and $w = \Gamma_0/(2b) = 252/68 = 3.71\,\mathrm{m/s}$. Check against the induced angle: $w = V_\infty\alpha_i = 230 \times 0.01614 = 3.71\,\mathrm{m/s}$.
:::
:::

::: exercise Minimum induced drag, derived {level=3}
Show directly from [[#eq-general-cdi]] that, among all spanwise loadings producing a given lift on a wing of given span, the elliptic one has least induced drag. Then show that the downwash $\alpha_i(\theta_0)$ is constant along the span only for the elliptic loading, and explain physically why a uniform downwash is the optimum.
::: solution
Given lift fixes $A_1 = C_L/(\pi AR)$; then $C_{D,i} = \pi AR(A_1^2 + 2A_2^2 + 3A_3^2 + \dots)$ is least when every $A_n$ with $n \ge 2$ is zero, i.e. $\Gamma \propto \sin\theta$, the ellipse. From [[#eq-general-cdi]], $\alpha_i = \sum nA_n\sin n\theta_0/\sin\theta_0$; this is constant ($= A_1$) if all higher $A_n$ vanish, and conversely a constant $\alpha_i$ requires $\sum nA_n\sin n\theta_0 = k\sin\theta_0$, which by orthogonality forces $A_n = 0$ for $n \ge 2$. Physically: induced drag is the rate at which the wing puts kinetic energy into the wake per unit distance, while lift is the rate at which it gives the air downward momentum. For a given momentum (lift), the kinetic energy $\tfrac12\sum m v^2$ is least when every parcel of air is given the same downward velocity — the same reason that spreading a given impulse evenly over a mass minimises the energy. Uniform downwash is that condition, and the elliptic loading produces it.
:::
:::

::: exercise A tapered wing by collocation {level=3 check="0.987"}
Write a short program to solve the monoplane equation (algorithm [[#alg-monoplane]]) for an untwisted, straight-tapered wing of aspect ratio $8$ with sections of $a_0 = 2\pi$ and $\alpha_{L=0} = 0$. Find the span efficiency factor for a taper ratio of $0.4$, and plot $e$ against taper ratio from $0$ to $1$. Comment on the shape of the curve and on what limits the choice of taper in practice. (Enter $e$ for taper ratio $0.4$ to three decimal places.)
::: solution
With the chord $c(y) = c_r\left[1 - (1 - \lambda)\,|2y/b|\right]$, $c_r = 2S/\left(b(1 + \lambda)\right)$, and $N = 12$ odd terms, the solution gives $\delta = 0.0676$ ($e = 0.937$) for $\lambda = 1$, $\delta = 0.0245$ ($e = 0.976$) for $\lambda = 0.6$, $\delta = 0.0132$ ($e = 0.987$) for $\lambda = 0.4$, $\delta = 0.0145$ for $\lambda = 0.3$, $\delta = 0.026$ for $\lambda = 0.2$ and $\delta \approx 0.16$ ($e = 0.86$) for a pointed tip. The curve has a broad maximum near $\lambda \approx 0.35$–$0.4$, where the straight taper best approximates the ellipse: too little taper overloads the tips, too much underloads them. In practice the choice also depends on tip stall (high taper concentrates section lift coefficients outboard, so small tip chords stall first at low Reynolds number), on structural depth and fuel volume at the root, on manufacturing, and, for swept wings, on the outboard shift of loading caused by sweep — which is why swept transport wings use more taper than this unswept optimum, together with washout.
:::
:::
