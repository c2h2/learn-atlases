The cylinder of a 70 MPa hydraulic press, the barrel of a plastics injection unit, a high-pressure pipe for a waterjet cutter and the bore of a diesel fuel-injection rail all have walls that are not thin: the outer radius may be one and a half or twice the inner. The thin-wall formula $\sigma_\theta = pr/t$ of [[mechanics-of-materials/stress-transformation]] assumes the hoop stress is uniform through the wall, and for such walls it is not. The material near the bore is stretched around a smaller circumference by the same radial displacement and carries far more hoop stress than the material at the outside — and no amount of extra thickness can carry that stress away from the bore.

The same mathematics describes the hub of a gear shrunk onto a shaft, where an interference creates a contact pressure that transmits torque by friction, and the disc of a turbine or compressor, where the load is not a pressure but the centrifugal inertia of the disc itself. This chapter solves all three with one idea, due to Lamé: in an axisymmetric body the only displacement is radial, $u(r)$, and the equations of [[solid-mechanics/stress-strain-3d]] and [[solid-mechanics/linear-elasticity]] collapse to a single ordinary differential equation.

Sign convention: tensile stress positive; pressure $p$ is positive when it pushes on the surface (so a pressure at the bore gives $\sigma_r = -p$ there). Radii are $a$ (inner) and $b$ (outer); for a shrink fit the interface radius is $c$.

## Axisymmetric equilibrium and kinematics

Use cylindrical coordinates $(r, \theta, z)$. For a body of revolution under loads that do not depend on $\theta$, symmetry forbids shear stresses $\tau_{r\theta}$ and $\tau_{\theta z}$ and any circumferential displacement, and in a long cylinder away from its ends (or in a thin disc) $\tau_{rz}$ is zero too. The stresses $\sigma_r, \sigma_\theta, \sigma_z$ are then principal stresses.

::: proposition Radial equilibrium {#prop-radial-eq}
For an axisymmetric stress state with radial body force $f_r$ per unit volume,
$$
\frac{d\sigma_r}{dr} + \frac{\sigma_r - \sigma_\theta}{r} + f_r = 0 .
$$ {#eq-radial}
For a body rotating at constant angular velocity $\omega$, the d'Alembert inertia force is $f_r = \rho\omega^2 r$.
:::

::: proof
Take the element between radii $r$ and $r + dr$, subtending angle $d\theta$, of unit axial length. The radial force on the inner face is $-\sigma_r\,r\,d\theta$ and on the outer face $+(\sigma_r + d\sigma_r)(r + dr)\,d\theta$. The two side faces, area $dr$, carry hoop forces $\sigma_\theta\,dr$, each inclined at $d\theta/2$ to the tangent; their combined radial component is $-2\sigma_\theta\,dr\sin(d\theta/2) \approx -\sigma_\theta\,dr\,d\theta$, pointing inward. The body force contributes $f_r\,r\,dr\,d\theta$. Summing and dropping second-order terms:
$$
\sigma_r\,dr\,d\theta + r\,d\sigma_r\,d\theta - \sigma_\theta\,dr\,d\theta + f_r\,r\,dr\,d\theta = 0,
$$
and dividing by $r\,dr\,d\theta$ gives [[#eq-radial]]. For steady rotation each particle has centripetal acceleration $\omega^2 r$ towards the axis; in a frame rotating with the body this is equivalent to an outward body force $\rho\omega^2 r$.
:::

The kinematics are just as short. A ring of material at radius $r$ moves out to $r + u$; its circumference grows from $2\pi r$ to $2\pi(r + u)$ and a radial fibre $dr$ stretches by $du$:
$$
\varepsilon_r = \frac{du}{dr}, \qquad \varepsilon_\theta = \frac{u}{r}.
$$ {#eq-axi-strain}
Eliminating $u$ gives the compatibility condition $\varepsilon_r = d(r\varepsilon_\theta)/dr$. Notice what $\varepsilon_\theta = u/r$ means: the same outward displacement stretches a small ring at the bore much more than a large ring at the outside. That is the whole reason thick walls are inefficient.

## The Lamé solution

::: theorem Lamé's equations {#thm-lame}
In an axisymmetric linear-elastic, isotropic cylinder or disc with no body force, in plane stress ($\sigma_z = 0$, a thin disc), plane strain ($\varepsilon_z = 0$) or generalised plane strain ($\varepsilon_z$ constant, a long cylinder with closed ends), the radial and hoop stresses are
$$
\sigma_r = A - \frac{B}{r^2}, \qquad \sigma_\theta = A + \frac{B}{r^2},
$$ {#eq-lame}
with constants $A$ and $B$ fixed by the boundary conditions. For internal pressure $p_i$ at $r = a$ and external pressure $p_o$ at $r = b$,
$$
A = \frac{p_i a^2 - p_o b^2}{b^2 - a^2}, \qquad B = \frac{(p_i - p_o)\,a^2b^2}{b^2 - a^2}.
$$ {#eq-lame-constants}
:::

::: proof
Plane stress first. Hooke's law with $\sigma_z = 0$ gives
$$
\sigma_r = \frac{E}{1 - \nu^2}\left(\frac{du}{dr} + \nu\frac{u}{r}\right), \qquad \sigma_\theta = \frac{E}{1 - \nu^2}\left(\frac{u}{r} + \nu\frac{du}{dr}\right).
$$
Then $\sigma_r - \sigma_\theta = \dfrac{E(1 - \nu)}{1 - \nu^2}\left(\dfrac{du}{dr} - \dfrac{u}{r}\right)$ and $\dfrac{d\sigma_r}{dr} = \dfrac{E}{1 - \nu^2}\left(u'' + \nu\dfrac{u'}{r} - \nu\dfrac{u}{r^2}\right)$. Substituting into [[#eq-radial]] with $f_r = 0$, the terms in $\nu$ cancel:
$$
\frac{d^2u}{dr^2} + \frac{1}{r}\frac{du}{dr} - \frac{u}{r^2} = \frac{d}{dr}\left[\frac{1}{r}\frac{d(ru)}{dr}\right] = 0 .
$$
Integrating twice, $u = C_1 r + C_2/r$. Back in Hooke's law, $u' + \nu u/r = C_1(1 + \nu) - C_2(1 - \nu)/r^2$, so $\sigma_r = A - B/r^2$ and $\sigma_\theta = A + B/r^2$ with $A = EC_1/(1 - \nu)$, $B = EC_2/(1 + \nu)$.

For plane strain or constant $\varepsilon_z$, Hooke's law relating $\sigma_r, \sigma_\theta$ to $\varepsilon_r, \varepsilon_\theta$ has the same form with $E$ and $\nu$ replaced by other constants (and a constant term from $\varepsilon_z$), and the same differential equation results: the stresses always have the form [[#eq-lame]]; only the displacement formula changes.

Boundary conditions: $\sigma_r(a) = -p_i$ and $\sigma_r(b) = -p_o$. Subtracting, $B(1/a^2 - 1/b^2) = p_i - p_o$, which gives $B$; then $A = -p_o + B/b^2$ simplifies to [[#eq-lame-constants]].
:::

Two consequences are worth reading off before using the formulas. First, $\sigma_r + \sigma_\theta = 2A$ is the same at every radius. Second, $\sigma_\theta - \sigma_r = 2B/r^2$ — twice the maximum in-plane shear — falls off as $1/r^2$: the shear is concentrated at the bore whatever the wall thickness.

::: corollary Cylinder under internal pressure only {#cor-internal}
With $p_o = 0$ and $k = b/a$,
$$
\sigma_r = \frac{p_i}{k^2 - 1}\left(1 - \frac{b^2}{r^2}\right) \le 0, \qquad \sigma_\theta = \frac{p_i}{k^2 - 1}\left(1 + \frac{b^2}{r^2}\right) > 0,
$$
with the largest hoop stress at the bore, $\sigma_{\theta,\max} = p_i\,\dfrac{k^2 + 1}{k^2 - 1}$. If the ends are closed and the end load $p_i\pi a^2$ is carried by the wall, the axial stress is uniform, $\sigma_z = \dfrac{p_i a^2}{b^2 - a^2} = \dfrac{p_i}{k^2 - 1} = A$. The radial displacement follows from Hooke's law, $u = \dfrac{r}{E}\bigl[\sigma_\theta - \nu(\sigma_r + \sigma_z)\bigr]$.
:::

The thin-wall limit is a useful check. Put $b = a + t$ with $t \ll a$: then $k^2 - 1 \approx 2t/a$ and $k^2 + 1 \approx 2$, so $\sigma_{\theta,\max} \approx p_i a/t$, the thin-wall formula, and $\sigma_z \approx p_i a/2t$.

::: widget plot
f: if(x <= k, (1 + k^2/x^2)/(k^2 - 1), 0/0); if(x <= k, (1 - k^2/x^2)/(k^2 - 1), 0/0); if(x <= k, 1/(k^2 - 1), 0/0)
x: 1, 4
y: -1.2, 3
sliders: k=2:1.1:4:0.05
labels: \sigma_\theta/p_i; \sigma_r/p_i; \sigma_z/p_i\ \text{(closed ends)}
hlines: 0
caption: Stresses through the wall of a cylinder under internal pressure, divided by $p_i$, against $r/a$; the slider sets the radius ratio $k = b/a$. Start at $k = 1.1$: the hoop stress is almost uniform at about $10p_i$ — the thin-wall case. Increase $k$: the hoop stress at the bore falls, but never below $p_i$ (its limit as $k \to \infty$), while the material near the outside does less and less. Note that $\sigma_\theta - \sigma_r$ at the bore is $2k^2p_i/(k^2 - 1)$, which tends to $2p_i$, not to zero.
:::

::: example A hydraulic cylinder {#ex-hydraulic}
A closed-ended steel hydraulic cylinder has inner radius $a = 50\ \mathrm{mm}$, outer radius $b = 80\ \mathrm{mm}$ and working pressure $40\ \mathrm{MPa}$ ($E = 200\ \mathrm{GPa}$, $\nu = 0.3$). Find the stresses at the bore and the outside, the axial stress, and the increase in bore diameter. Compare with the thin-wall formula.
::: solution
$b^2 - a^2 = 6400 - 2500 = 3900\ \mathrm{mm^2}$, so
$$
A = \frac{40\times2500}{3900} = 25.64\ \mathrm{MPa}, \qquad B = \frac{40\times2500\times6400}{3900} = 1.641\times10^{5}\ \mathrm{MPa\,mm^2}.
$$
At the bore, $B/a^2 = 65.64\ \mathrm{MPa}$:
$$
\sigma_r = 25.64 - 65.64 = -40.0\ \mathrm{MPa}\ (= -p_i\ ✓), \qquad \sigma_\theta = 25.64 + 65.64 = 91.3\ \mathrm{MPa}.
$$
At the outside, $B/b^2 = 25.64\ \mathrm{MPa}$: $\sigma_r = 0$ ✓ and $\sigma_\theta = 51.3\ \mathrm{MPa}$. The closed ends give $\sigma_z = A = 25.6\ \mathrm{MPa}$ throughout.

Bore displacement:
$$
u(a) = \frac{a}{E}\bigl[\sigma_\theta - \nu(\sigma_r + \sigma_z)\bigr] = \frac{50}{200\,000}\bigl[91.28 - 0.3(-40 + 25.64)\bigr] = 0.0239\ \mathrm{mm},
$$
so the bore diameter grows by $0.048\ \mathrm{mm}$ — a number that matters for the piston seals.

The thin-wall formula with the inner radius gives $p a/t = 40\times50/30 = 66.7\ \mathrm{MPa}$, and with the mean radius $86.7\ \mathrm{MPa}$; both underestimate the true bore hoop stress of $91.3\ \mathrm{MPa}$. Sanity check: $\sigma_r + \sigma_\theta = 51.3\ \mathrm{MPa} = 2A$ at both radii, and the average hoop stress, $\int_a^b\sigma_\theta\,dr/(b - a)$, equals $p_i a/(b - a) = 66.7\ \mathrm{MPa}$, exactly the thin-wall value — as it must, because the hoop force on a half-cylinder must balance $p_i \times 2a$ regardless of how it is distributed.
:::
:::

## Yield, and why thickness alone is not enough

At the bore all three principal stresses are known: $\sigma_\theta = A + B/a^2$, $\sigma_r = -p_i$ and (closed ends) $\sigma_z = A$, which lies exactly midway between the other two. Yielding starts at the bore.

::: proposition First-yield pressure of a thick cylinder {#prop-first-yield}
For a cylinder under internal pressure with $k = b/a$ and yield strength $\sigma_Y$, first yield at the bore occurs at
$$
p_Y = \frac{\sigma_Y}{2}\left(1 - \frac{1}{k^2}\right) \quad\text{(Tresca)}, \qquad p_Y = \frac{\sigma_Y}{\sqrt3}\left(1 - \frac{1}{k^2}\right) \quad\text{(von Mises, closed ends)}.
$$
Both tend to finite limits, $\sigma_Y/2$ and $\sigma_Y/\sqrt3$, as $k \to \infty$.
:::

::: proof
At the bore $\sigma_\theta - \sigma_r = 2B/a^2 = 2p_i b^2/(b^2 - a^2) = 2p_ik^2/(k^2 - 1)$. With closed ends $\sigma_z = A$ is the intermediate principal stress, so the Tresca maximum shear is $(\sigma_\theta - \sigma_r)/2$; setting $\sigma_\theta - \sigma_r = \sigma_Y$ gives the first result. (For open ends $\sigma_z = 0$ also lies between $\sigma_r < 0$ and $\sigma_\theta > 0$, so the Tresca result is the same.) For von Mises, the principal stresses are $A - B/a^2$, $A$, $A + B/a^2$, so $\sigma_{\mathrm{vM}} = \sqrt{\tfrac12[(B/a^2)^2 + (B/a^2)^2 + (2B/a^2)^2]} = \sqrt3\,B/a^2$; setting this equal to $\sigma_Y$ gives the second.
:::

The limit is the important practical lesson: a cylinder of a material with $\sigma_Y = 350\ \mathrm{MPa}$ can never contain more than $175\ \mathrm{MPa}$ elastically by Tresca, however thick it is made. Doubling the radius ratio from 2 to 4 raises the first-yield pressure only from $0.375\sigma_Y$ to $0.469\sigma_Y$. To go further, designers pre-stress the bore into compression: by **shrinking** a second cylinder over the first (a compound cylinder, below), by **wire or strip winding** under tension, or by **autofrettage** — pressurising the cylinder once beyond first yield so that the inner layers deform plastically; on unloading, the elastic outer layers squeeze them into residual compression, which subtracts from the working hoop stress. Autofrettage is analysed with the elastic–plastic methods of [[solid-mechanics/plasticity]].

::: example Choosing the wall of a high-pressure cylinder {#ex-wall}
A cylinder of steel with $\sigma_Y = 350\ \mathrm{MPa}$ must work at $p_i = 100\ \mathrm{MPa}$ with a factor of safety $n = 1.5$ against first yield by the Tresca criterion. Find the minimum ratio $b/a$. What is the largest working pressure that this factor of safety allows, for any wall thickness?
::: solution
Tresca with the factor of safety: $\sigma_\theta - \sigma_r \le \sigma_Y/n = 233.3\ \mathrm{MPa}$ at the bore. With $\sigma_\theta - \sigma_r = 2p_ik^2/(k^2 - 1)$:
$$
\frac{2(100)k^2}{k^2 - 1} \le 233.3 \;\Rightarrow\; \frac{k^2}{k^2 - 1} \le 1.1667 \;\Rightarrow\; k^2 \ge 7.00 \;\Rightarrow\; k \ge 2.65 .
$$
For a $100\ \mathrm{mm}$ bore the outside diameter must be at least $265\ \mathrm{mm}$ — a wall of $82\ \mathrm{mm}$.

The largest working pressure for any $k$ follows from $k \to \infty$: $2p_i \le 233.3\ \mathrm{MPa}$, so $p_i < 116.7\ \mathrm{MPa}$. At $120\ \mathrm{MPa}$ no plain cylinder of this steel meets the requirement; a stronger steel, a compound or autofrettaged cylinder is needed. Sanity check: at $k = 2.65$ the bore hoop stress is $p_i(k^2 + 1)/(k^2 - 1) = 100\times8/6 = 133\ \mathrm{MPa}$ — far below $\sigma_Y$ — yet the cylinder is at its limit, because the radial compression $-100\ \mathrm{MPa}$ adds to the shear. The thin-wall habit of checking only $\sigma_\theta$ would be badly unconservative here.
:::
:::

::: warning Pressure signs, radial versus diametral interference, and which "thin-wall" radius
Three mistakes recur. (1) A pressure is a compressive normal stress: the boundary condition at a pressurised bore is $\sigma_r = -p_i$, not $+p_i$; getting this wrong flips $B$ and puts the maximum stress at the outside. (2) Interference is quoted on the **diameter** in drawings and fit standards (ISO 286), but the Lamé formulas use the **radial** interference $\delta = \Delta_d/2$; mixing them doubles or halves the contact pressure. (3) The thin-wall formula $pr/t$ is not conservative for thick walls whichever radius is used — at $b/a = 1.6$ it underestimates the bore hoop stress by 27 % with the inner radius ([[#ex-hydraulic]]). Use Lamé whenever $t/a$ exceeds about 0.1.
:::

## Shrink fits and compound cylinders

Press or shrink a hub with bore radius slightly smaller than the shaft, and the two parts must deform until they share a common interface radius. The hub's bore grows outward and the shaft's surface moves inward; the contact pressure $p$ that achieves this is a compatibility problem: two Lamé solutions joined by one geometric condition.

::: proposition Interference-fit pressure {#prop-shrink}
A tube $a \le r \le c$ is fitted inside a tube $c \le r \le b$ with **radial interference** $\delta$ (the outer radius of the inner part exceeds the inner radius of the outer part by $\delta$). If both are of the same material and $\delta \ll c$, the interface pressure is
$$
p = \frac{E\delta}{c}\,\frac{(b^2 - c^2)(c^2 - a^2)}{2c^2(b^2 - a^2)} .
$$
For a hub on a solid shaft ($a = 0$): $p = \dfrac{E\delta}{2c}\left(1 - \dfrac{c^2}{b^2}\right)$. For different materials,
$$
\delta = \frac{pc}{E_o}\left(\frac{b^2 + c^2}{b^2 - c^2} + \nu_o\right) + \frac{pc}{E_i}\left(\frac{c^2 + a^2}{c^2 - a^2} - \nu_i\right).
$$
:::

::: proof
Use plane stress (short hubs; for long parts the difference is a small $\nu$ term). The outer part has internal pressure $p$, so at $r = c$: $\sigma_r = -p$, $\sigma_\theta = p(b^2 + c^2)/(b^2 - c^2)$, and its bore moves outward by $u_o = (c/E_o)(\sigma_\theta - \nu_o\sigma_r) = (pc/E_o)\bigl[(b^2 + c^2)/(b^2 - c^2) + \nu_o\bigr]$. The inner part has external pressure $p$: from [[#eq-lame-constants]] with $p_i = 0$, $p_o = p$, at $r = c$: $\sigma_r = -p$ and $\sigma_\theta = -p(c^2 + a^2)/(c^2 - a^2)$, so its surface moves by $u_i = (c/E_i)(\sigma_\theta - \nu_i\sigma_r) = -(pc/E_i)\bigl[(c^2 + a^2)/(c^2 - a^2) - \nu_i\bigr]$ (inward). Compatibility: the gap closed must equal the interference, $u_o - u_i = \delta$, which is the general formula. With equal $E$ and $\nu$ the $\nu$ terms cancel, and
$$
\frac{b^2 + c^2}{b^2 - c^2} + \frac{c^2 + a^2}{c^2 - a^2} = \frac{2c^2(b^2 - a^2)}{(b^2 - c^2)(c^2 - a^2)},
$$
which gives the same-material result; $a = 0$ gives the solid-shaft case.
:::

The pressure in a hub on a solid shaft depends on the hub only through $c/b$: a hub of outer diameter twice the bore gives three-quarters of the value $E\delta/2c$ that an infinitely large hub would give. In the solid shaft, $\sigma_r = \sigma_\theta = -p$ everywhere (a uniform biaxial compression: $B = 0$ because the stress must be finite at $r = 0$).

::: example A shrink-fitted coupling hub {#ex-shrink}
A steel hub of outside diameter $200\ \mathrm{mm}$ and length $80\ \mathrm{mm}$ is shrunk onto a solid steel shaft of diameter $100\ \mathrm{mm}$ with a diametral interference of $0.050\ \mathrm{mm}$ ($E = 200\ \mathrm{GPa}$, coefficient of friction $\mu = 0.15$, thermal expansion $\alpha = 12\times10^{-6}\ \mathrm{K^{-1}}$). Find the interface pressure, the hoop stress at the hub bore, the torque the fit can transmit by friction, and the temperature rise of the hub needed to assemble it with $0.03\ \mathrm{mm}$ of diametral clearance.
::: solution
Radial interference $\delta = 0.025\ \mathrm{mm}$; $c = 50\ \mathrm{mm}$, $b = 100\ \mathrm{mm}$:
$$
p = \frac{200\,000\times0.025}{2\times50}\left(1 - \frac{50^2}{100^2}\right) = 50\times0.75 = 37.5\ \mathrm{MPa}.
$$
Hoop stress at the hub bore:
$$
\sigma_\theta = p\,\frac{b^2 + c^2}{b^2 - c^2} = 37.5\times\frac{12\,500}{7500} = 62.5\ \mathrm{MPa},
$$
with $\sigma_r = -37.5\ \mathrm{MPa}$; the shaft is in uniform compression $\sigma_r = \sigma_\theta = -37.5\ \mathrm{MPa}$.

Friction torque: the normal force on the interface is $p \times 2\pi cL$, acting at radius $c$:
$$
T = \mu\,p\,(2\pi cL)\,c = 0.15\times37.5\times2\pi\times50^2\times80 = 7.07\times10^{6}\ \mathrm{N\,mm} = 7.07\ \mathrm{kN\,m}.
$$
Assembly: the hub bore must grow by the interference plus clearance, $0.080\ \mathrm{mm}$ on a $100\ \mathrm{mm}$ diameter:
$$
\Delta T = \frac{0.080}{12\times10^{-6}\times100} = 67\ \mathrm{K}.
$$
Sanity checks: the strain $\delta/c = 5\times10^{-4}$ is small, as linear elasticity requires; heating to about $90\ ^\circ\mathrm{C}$ is a routine shop operation (done with induction heaters or ovens, with heat-resistant gloves, because a hot hub that seizes part-way on cannot be pulled off). The torque estimate is sensitive to $\mu$, which for dry steel varies by a factor of two; fit standards and couplings catalogues give design values.
:::
:::

In a **compound cylinder** both parts are tubes, and the shrinkage pressure puts the inner tube's bore into hoop *compression* before any working pressure is applied. The working pressure then acts on the assembly as a single thick cylinder, and the two stress distributions add. The residual compression at the inner bore and the residual tension at the outer tube's bore flatten the hoop stress profile, so that both bores can be brought to yield together — the best use of the material. For two tubes of the same material the optimum interface radius is $c = \sqrt{ab}$, as [[#ex-compound]] shows.

## Rotating discs

A disc spinning at angular velocity $\omega$ loads itself: each ring of material needs an inward force $\rho\omega^2 r$ per unit volume to keep it on its circle, and the only sources of that force are the hoop tension in the ring and the radial stress from its neighbours. Because the load comes from the mass, the stresses scale with $\rho\omega^2 b^2 = \rho v_{\text{tip}}^2$ — the density times the square of the rim speed — independent of the absolute size of the disc.

::: theorem Stresses in a rotating disc of uniform thickness {#thm-disc}
For a thin disc (plane stress) of uniform thickness, density $\rho$ and Poisson's ratio $\nu$, rotating at $\omega$,
$$
\sigma_r = A - \frac{B}{r^2} - \frac{3 + \nu}{8}\rho\omega^2 r^2, \qquad
\sigma_\theta = A + \frac{B}{r^2} - \frac{1 + 3\nu}{8}\rho\omega^2 r^2 .
$$
(a) **Solid disc**, radius $b$, free rim: $\sigma_r = \dfrac{3 + \nu}{8}\rho\omega^2(b^2 - r^2)$, $\sigma_\theta = \dfrac{3 + \nu}{8}\rho\omega^2 b^2 - \dfrac{1 + 3\nu}{8}\rho\omega^2 r^2$, with maximum $\sigma_r = \sigma_\theta = \dfrac{3 + \nu}{8}\rho\omega^2 b^2$ at the centre.

(b) **Disc with a central hole**, radii $a$ and $b$, both edges free:
$$
\sigma_r = \frac{3 + \nu}{8}\rho\omega^2\left(a^2 + b^2 - \frac{a^2b^2}{r^2} - r^2\right), \qquad
\sigma_\theta = \frac{3 + \nu}{8}\rho\omega^2\left(a^2 + b^2 + \frac{a^2b^2}{r^2} - \frac{1 + 3\nu}{3 + \nu}r^2\right),
$$
with the maximum stress the hoop stress at the bore, $\sigma_\theta(a) = \dfrac{3 + \nu}{4}\rho\omega^2\left(b^2 + \dfrac{1 - \nu}{3 + \nu}a^2\right)$.
:::

::: proof
The derivation of [[#thm-lame]] carries over with the body force $f_r = \rho\omega^2 r$ in [[#eq-radial]]:
$$
\frac{E}{1 - \nu^2}\,\frac{d}{dr}\left[\frac{1}{r}\frac{d(ru)}{dr}\right] = -\rho\omega^2 r .
$$
Try a particular solution $u_p = -Kr^3$: $\frac{1}{r}\frac{d}{dr}(-Kr^4) = -4Kr^2$, whose derivative is $-8Kr$, so $K = (1 - \nu^2)\rho\omega^2/(8E)$. Its stresses: $u_p' + \nu u_p/r = -(3 + \nu)Kr^2$ gives $\sigma_{r,p} = -\tfrac{3 + \nu}{8}\rho\omega^2r^2$, and $u_p/r + \nu u_p' = -(1 + 3\nu)Kr^2$ gives $\sigma_{\theta,p} = -\tfrac{1 + 3\nu}{8}\rho\omega^2r^2$. Adding the homogeneous Lamé solution gives the general form.

(a) Finite stress at $r = 0$ requires $B = 0$; $\sigma_r(b) = 0$ gives $A = \tfrac{3 + \nu}{8}\rho\omega^2b^2$. Since $3 + \nu > 1 + 3\nu$ for $\nu < 1$, both stresses decrease outward, and both equal $A$ at the centre.

(b) $\sigma_r(a) = \sigma_r(b) = 0$: subtracting the two conditions gives $B(1/a^2 - 1/b^2) = \tfrac{3 + \nu}{8}\rho\omega^2(b^2 - a^2)$, so $B = \tfrac{3 + \nu}{8}\rho\omega^2a^2b^2$, and then $A = \tfrac{3 + \nu}{8}\rho\omega^2(a^2 + b^2)$. Substituting gives the formulas; at $r = a$ the hoop stress is $\tfrac{3 + \nu}{8}\rho\omega^2\bigl[2b^2 + 2a^2 - \tfrac{1 + 3\nu}{3 + \nu}a^2\bigr]$, which rearranges to the stated maximum.
:::

The most striking result is the effect of a small hole. As $a \to 0$ the bore hoop stress tends to $\tfrac{3 + \nu}{4}\rho\omega^2b^2$ — **twice** the centre stress of the solid disc. A pinhole doubles the stress at the centre, because the free surface of the hole forces $\sigma_r = 0$ there and the hoop stress must make up the difference: a stress concentration factor of 2, the rotating-disc analogue of the factor 3 at a hole in a plate under tension ([[solid-mechanics/linear-elasticity]]).

::: widget plot
f: if(x >= al, (3 + nu)/8*(1 + al^2 - al^2/x^2 - x^2), 0/0); if(x >= al, (3 + nu)/8*(1 + al^2 + al^2/x^2) - (1 + 3*nu)/8*x^2, 0/0)
x: 0, 1
y: 0, 0.9
sliders: al=0.2:0:0.8:0.01; nu=0.3:0:0.5:0.01
labels: \sigma_r/\rho\omega^2b^2; \sigma_\theta/\rho\omega^2b^2
caption: Stresses in a rotating disc of uniform thickness, divided by $\rho\omega^2b^2 = \rho v_\text{tip}^2$, against $r/b$; the slider $al$ is the hole ratio $a/b$. At $a/b = 0$ (solid disc) both curves start at $(3 + \nu)/8 = 0.41$ at the centre. Now move $a/b$ to $0.01$: the hoop stress at the bore jumps to almost $0.83$ — double — while the stress a little way from the hole hardly changes. That is a stress concentration, and it is why turbine discs are given thick hubs.
:::

::: example A steel disc at 6000 rpm {#ex-disc}
A steel disc of outer radius $300\ \mathrm{mm}$ ($\rho = 7850\ \mathrm{kg/m^3}$, $\nu = 0.3$) runs at $6000\ \mathrm{rpm}$. Find the maximum stress (a) if it is solid and (b) if it has a central hole of radius $50\ \mathrm{mm}$. Where does the largest radial stress occur in case (b)?
::: solution
$\omega = 6000\times2\pi/60 = 628.3\ \mathrm{rad/s}$, tip speed $\omega b = 188.5\ \mathrm{m/s}$, and
$$
\rho\omega^2b^2 = 7850\times188.5^2 = 2.789\times10^{8}\ \mathrm{Pa} = 278.9\ \mathrm{MPa}.
$$
(a) Solid disc: $\sigma_{\max} = \tfrac{3.3}{8}\times278.9 = 115.1\ \mathrm{MPa}$ at the centre (both $\sigma_r$ and $\sigma_\theta$). At the rim, $\sigma_\theta = \tfrac{1 - \nu}{4}\rho\omega^2b^2 = 48.8\ \mathrm{MPa}$.

(b) With $a/b = 1/6$:
$$
\sigma_\theta(a) = \frac{3.3}{4}\times278.9\times\left(1 + \frac{0.7}{3.3}\times\frac{1}{36}\right) = 231.5\ \mathrm{MPa},
$$
twice the solid-disc value. The radial stress has its maximum where $d\sigma_r/dr = 0$, i.e. $a^2b^2/r^3 = r$, $r = \sqrt{ab} = 122.5\ \mathrm{mm}$, where
$$
\sigma_{r,\max} = \frac{3.3}{8}\rho\omega^2(b - a)^2 = 0.4125\times7850\times628.3^2\times0.25^2 = 79.9\ \mathrm{MPa}.
$$
Sanity check: the stresses depend on $\rho v_\text{tip}^2$ only, so a disc of half the radius at twice the speed has the same stresses. An order-of-magnitude check: $\rho v^2 = 279\ \mathrm{MPa}$ — a thin ring spinning at this rim speed would carry exactly $\rho v^2$, and the disc's peak stress is a fraction of order one of it.
:::
:::

### Discs of variable thickness

A turbine designer can do better than a uniform disc by making the disc thicker at the hub, where the material must hold up all the rings outside it. In the limit, the thickness can be chosen so that $\sigma_r = \sigma_\theta = \sigma$ everywhere — the **disc of uniform strength**, whose profile is
$$
h(r) = h_0\exp\left(-\frac{\rho\omega^2r^2}{2\sigma}\right)
$$ {#eq-uniform-strength}
(derived in an exercise). Real discs need a rim to carry the blades and a hub to fit the shaft, so they approximate this profile rather than follow it. Their stresses are computed numerically — by dividing the disc into rings of constant thickness, each with its own Lamé constants, joined by continuity of $u$ and of the radial force $\sigma_r h$, or by finite elements ([[finite-element-method]]) — and their burst speed is demonstrated by spin tests.

::: application Flywheels, turbine discs and spin testing
Because stress scales with $\rho v_\text{tip}^2$, the energy a rotor can store per unit mass is limited by the specific strength $\sigma/\rho$ of its material, not by its size; this is why energy-storage flywheels use filament-wound carbon-fibre rims ([[solid-mechanics/composites]]) and why aero-engine discs are forged from nickel or titanium alloys with high strength-to-density ratios. Disc designs are checked against the applicable codes and airworthiness rules, and burst margins are demonstrated in spin pits — armoured, evacuated chambers — because a disc fragment carries enormous kinetic energy. Rotor bursts are among the hazards that aircraft engine certification specifically addresses.
:::

::: history
Gabriel Lamé's *Leçons sur la théorie mathématique de l'élasticité des corps solides* (1852), the first book devoted to the mathematical theory of elasticity, included the solution for the hollow cylinder under internal and external pressure that carries his name. Rotating discs became a central design problem with high-speed steam turbines; the systematic treatment of disc stresses, including discs of variable thickness, is associated with Aurel Stodola's book on steam turbines, *Die Dampfturbinen*, first published in 1903 and translated into English as *Steam and Gas Turbines*.
:::

::: quiz
A solid disc and an identical disc with a very small central hole spin at the same speed. Compared with the solid disc's centre stress, the maximum stress in the disc with the hole is about
- [ ] the same
- [ ] $1.5$ times larger
- [x] twice as large
- [ ] three times as large
::: solution
As $a \to 0$, $\sigma_\theta(a) \to \tfrac{3 + \nu}{4}\rho\omega^2b^2$, twice the solid-disc centre value $\tfrac{3 + \nu}{8}\rho\omega^2b^2$. The free surface of the hole sets $\sigma_r = 0$, so the hoop stress alone must provide what $\sigma_r$ and $\sigma_\theta$ shared.
:::
:::

::: quiz
A thick cylinder under internal pressure is made twice as thick. What happens to its first-yield pressure?
- [ ] It doubles.
- [x] It rises, but by much less than a factor of two, and never beyond $\sigma_Y/2$ (Tresca).
- [ ] It is unchanged.
::: solution
$p_Y = \tfrac{\sigma_Y}{2}(1 - 1/k^2)$: from $k = 2$ to $k = 3$ it rises from $0.375\sigma_Y$ to $0.444\sigma_Y$, and the limit as $k \to \infty$ is $0.5\sigma_Y$.
:::
:::

::: summary
- Axisymmetric problems reduce to one unknown, the radial displacement $u(r)$, with $\varepsilon_r = du/dr$, $\varepsilon_\theta = u/r$ and radial equilibrium $d\sigma_r/dr + (\sigma_r - \sigma_\theta)/r + f_r = 0$.
- Lamé: $\sigma_r = A - B/r^2$, $\sigma_\theta = A + B/r^2$; constants from the boundary pressures ($\sigma_r = -p$ at a pressurised surface).
- Under internal pressure the hoop stress and the shear are largest at the bore; closed ends add a uniform $\sigma_z = p_ia^2/(b^2 - a^2)$.
- First yield (Tresca) at $p_Y = \tfrac{\sigma_Y}{2}(1 - a^2/b^2)$, never more than $\sigma_Y/2$: beyond a point, thickness does not help; compound cylinders, winding and autofrettage pre-compress the bore.
- Interference fits: the contact pressure follows from compatibility of the two radial displacements; for a hub on a solid shaft $p = \tfrac{E\delta}{2c}(1 - c^2/b^2)$ with $\delta$ the **radial** interference.
- Rotating discs: stresses scale with $\rho v_\text{tip}^2$; a solid disc peaks at the centre at $\tfrac{3 + \nu}{8}\rho\omega^2b^2$, and a small central hole doubles that.
:::

## Exercises

::: exercise Bore hoop stress {level=1 check="100"}
A cylinder has inner radius $100\ \mathrm{mm}$ and outer radius $200\ \mathrm{mm}$ and carries an internal pressure of $60\ \mathrm{MPa}$. Find the hoop stress at the bore. (Enter it in MPa.)
::: solution
$k = 2$: $\sigma_{\theta,\max} = p_i(k^2 + 1)/(k^2 - 1) = 60\times5/3 = 100\ \mathrm{MPa}$. At the outside, $\sigma_\theta = 2p_i/(k^2 - 1) = 40\ \mathrm{MPa}$; with closed ends, $\sigma_z = 20\ \mathrm{MPa}$.
:::
:::

::: exercise External pressure {level=1 check="-80"}
A tube with $a = 50\ \mathrm{mm}$, $b = 100\ \mathrm{mm}$ is loaded by an external pressure of $30\ \mathrm{MPa}$ only. Find the hoop stress at the bore. (Enter it in MPa, with sign.)
::: solution
With $p_i = 0$: $A = -p_ob^2/(b^2 - a^2) = -30\times10\,000/7500 = -40\ \mathrm{MPa}$ and $B = -p_oa^2b^2/(b^2 - a^2)$, so $B/a^2 = -40\ \mathrm{MPa}$. At the bore $\sigma_\theta = A + B/a^2 = -80\ \mathrm{MPa}$, i.e. $-2p_ob^2/(b^2 - a^2)$. The bore, not the outside, is the most highly stressed point even though the load is applied outside.
:::
:::

::: exercise A solid disc {level=1 check="132"}
A solid disc of uniform thickness ($\rho = 8000\ \mathrm{kg/m^3}$, $\nu = 0.3$) has a rim speed of $200\ \mathrm{m/s}$. Find the maximum stress. (Enter it in MPa.)
::: solution
$\rho v^2 = 8000\times200^2 = 3.2\times10^{8}\ \mathrm{Pa}$; $\sigma_{\max} = \tfrac{3.3}{8}\times320 = 132\ \mathrm{MPa}$ at the centre.
:::
:::

::: exercise Interference pressure {level=2 check="45"}
A steel hub of outer radius $80\ \mathrm{mm}$ is shrunk onto a solid steel shaft of radius $40\ \mathrm{mm}$ with a diametral interference of $0.048\ \mathrm{mm}$ ($E = 200\ \mathrm{GPa}$). Find the contact pressure. (Enter it in MPa.)
::: solution
Radial interference $\delta = 0.024\ \mathrm{mm}$. $p = \tfrac{E\delta}{2c}(1 - c^2/b^2) = \tfrac{200\,000\times0.024}{80}\times0.75 = 60\times0.75 = 45\ \mathrm{MPa}$. Using the diametral value by mistake would give $90\ \mathrm{MPa}$.
:::
:::

::: exercise First-yield pressure {level=2 check="112.5"}
A cylinder with $b/a = 2$ is made of steel with $\sigma_Y = 300\ \mathrm{MPa}$. Find the internal pressure at first yield by the Tresca criterion. (Enter it in MPa.)
::: solution
$p_Y = \tfrac{\sigma_Y}{2}(1 - 1/k^2) = 150\times0.75 = 112.5\ \mathrm{MPa}$. By von Mises (closed ends) it would be $\tfrac{300}{\sqrt3}\times0.75 = 129.9\ \mathrm{MPa}$.
:::
:::

::: exercise Limiting rim speed of a disc with a bore {level=2 check="200"}
A disc with a small central bore ($a \ll b$) is made of steel with $\rho = 8000\ \mathrm{kg/m^3}$, $\nu = 0.3$, and the hoop stress at the bore must not exceed $264\ \mathrm{MPa}$. Neglecting the $a^2$ term, find the maximum rim speed. (Enter it in m/s.)
::: solution
$\sigma_\theta(a) \approx \tfrac{3 + \nu}{4}\rho v^2 = 0.825\times8000\,v^2 = 6600\,v^2 \le 2.64\times10^{8}$, so $v^2 \le 40\,000$ and $v \le 200\ \mathrm{m/s}$. A solid disc of the same material could run at $\sqrt2$ times this speed, $283\ \mathrm{m/s}$, for the same peak stress.
:::
:::

::: exercise The disc of uniform strength {level=3}
A disc has variable thickness $h(r)$, small enough in slope that the stresses are uniform through the thickness. (a) By taking an element of thickness $h$, show that radial equilibrium becomes
$$
\frac{d}{dr}(h r\sigma_r) - h\sigma_\theta + \rho\omega^2r^2h = 0 .
$$
(b) Show that $\sigma_r = \sigma_\theta = \sigma$ (constant) is possible if $h = h_0\exp(-\rho\omega^2r^2/2\sigma)$. (c) For a steel disc ($\rho = 7850\ \mathrm{kg/m^3}$) running at $\sigma = 400\ \mathrm{MPa}$ with a radius of $0.4\ \mathrm{m}$ at $10\,000\ \mathrm{rpm}$, find the ratio of rim to centre thickness.
::: solution
(a) Repeat the proof of [[#prop-radial-eq]] with forces multiplied by the local thickness: the radial faces carry $\sigma_r h r\,d\theta$, which changes by $d(\sigma_rhr)\,d\theta$ across $dr$; the side faces give $-\sigma_\theta h\,dr\,d\theta$; the inertia force is $\rho\omega^2r\,(hr\,dr\,d\theta)$. Dividing by $dr\,d\theta$ gives the result.
(b) With $\sigma_r = \sigma_\theta = \sigma$: $\sigma(h + rh') - \sigma h + \rho\omega^2r^2h = 0$, so $h'/h = -\rho\omega^2r/\sigma$ and $\ln(h/h_0) = -\rho\omega^2r^2/2\sigma$. Strains are then equal, $\varepsilon_r = \varepsilon_\theta = (1 - \nu)\sigma/E$, which is compatible since $u = \varepsilon_\theta r$ gives $du/dr = \varepsilon_\theta$.
(c) $\omega = 1047.2\ \mathrm{rad/s}$, $\rho\omega^2r^2/2\sigma = 7850\times1047.2^2\times0.16/(8\times10^{8}) = 1.722$, so $h_\text{rim}/h_0 = e^{-1.722} = 0.179$: the centre is about 5.6 times as thick as the rim. A real disc must also support the blade load at the rim, which sets $\sigma_r$ there and changes the profile.
:::
:::

::: exercise The optimum compound cylinder {#ex-compound level=3}
Two tubes of the same material are shrunk together to form a compound cylinder with inner radius $a$, interface radius $c$ and outer radius $b$. Under the working pressure the bores of both tubes are to reach the same Tresca stress $\sigma_\theta - \sigma_r$. (a) Explain why the condition for the best design is that the working pressure carried by each tube, treated as if it were a separate cylinder loaded by the pressure difference across it, gives equal stress in each. (b) Show that, with this approach, the optimum interface radius is $c = \sqrt{ab}$ and the maximum working pressure is $p = \sigma_Y(1 - a/b)$ — compared with $\tfrac{\sigma_Y}{2}(1 - a^2/b^2)$ for a single cylinder. (c) Evaluate both for $b/a = 3$.
::: solution
(a) Because the problem is linear, the final stress in each tube is the sum of the shrink stresses and the working-pressure stresses; equivalently, each tube in the final state carries the pressure on its inner surface minus that on its outer surface. A design in which one bore reaches yield first wastes the other tube, so the optimum is the one where both reach the limit together.

(b) In the final state let the interface pressure be $p_c$. The inner tube ($a$ to $c$) has internal pressure $p$ and external $p_c$; at its bore, $\sigma_\theta - \sigma_r = 2B_1/a^2 = 2(p - p_c)c^2/(c^2 - a^2)$. The outer tube ($c$ to $b$) has internal $p_c$: $\sigma_\theta - \sigma_r = 2p_cb^2/(b^2 - c^2)$ at its bore. Setting both equal to $\sigma_Y$:
$$
p_c = \frac{\sigma_Y}{2}\left(1 - \frac{c^2}{b^2}\right), \qquad p - p_c = \frac{\sigma_Y}{2}\left(1 - \frac{a^2}{c^2}\right),
$$
so $p = \tfrac{\sigma_Y}{2}\left(2 - c^2/b^2 - a^2/c^2\right)$. Maximising over $c$: $d/dc(c^2/b^2 + a^2/c^2) = 0$ gives $c^4 = a^2b^2$, $c = \sqrt{ab}$, and then $c^2/b^2 = a^2/c^2 = a/b$, so $p_{\max} = \sigma_Y(1 - a/b)$.

(c) $b/a = 3$: compound $p = \sigma_Y(1 - 1/3) = 0.667\sigma_Y$; single cylinder $\tfrac{\sigma_Y}{2}(1 - 1/9) = 0.444\sigma_Y$ — a 50 % increase for the same total wall. (The required interference follows from [[#prop-shrink]] using the shrink pressure, which is $p_c$ minus the interface pressure that $p$ alone would produce in a solid-wall cylinder.)
:::
:::

::: exercise Design a shrink fit {level=3}
A gear with a hub of outer diameter $120\ \mathrm{mm}$ and length $60\ \mathrm{mm}$ is to be shrunk onto a solid steel shaft of $60\ \mathrm{mm}$ diameter and transmit $2.0\ \mathrm{kN\,m}$ with a factor of safety of 2 against slip ($\mu = 0.12$). The hub steel has $\sigma_Y = 400\ \mathrm{MPa}$. Choose the diametral interference, check the hub stresses, and comment on what else a designer must consider.
::: solution
Required pressure: $T_\text{slip} = 2\times2.0 = 4.0\ \mathrm{kN\,m} = \mu p\,2\pi c^2L$ with $c = 30\ \mathrm{mm}$, $L = 60\ \mathrm{mm}$: $p = 4.0\times10^{6}/(0.12\times2\pi\times900\times60) = 98.2\ \mathrm{MPa}$. Interference: $p = \tfrac{E\delta}{2c}(1 - c^2/b^2)$ with $c/b = 0.5$ gives $\delta = 2cp/(0.75E) = 2\times30\times98.2/(0.75\times200\,000) = 0.0393\ \mathrm{mm}$, a diametral interference of about $0.079\ \mathrm{mm}$ — choose a standard ISO 286 fit whose *minimum* interference exceeds this. Hub bore stresses at that pressure: $\sigma_\theta = p(b^2 + c^2)/(b^2 - c^2) = 98.2\times5/3 = 164\ \mathrm{MPa}$, $\sigma_r = -98\ \mathrm{MPa}$; Tresca $\sigma_\theta - \sigma_r = 262\ \mathrm{MPa}$, a factor of $1.53$ against yield — but the *maximum* interference of the chosen fit (perhaps $1.5$–$2$ times the minimum) must also be checked, and it may cause yield. Other considerations: the gear teeth and keyway weaken the hub; the fit pressure concentrates at the hub ends, causing fretting fatigue of the shaft; the hub's centrifugal growth at speed reduces the pressure; thermal transients may loosen the fit; and the assembly temperature must not temper the steel. Real fits are designed to standards (for example DIN 7190) and verified by test.
:::
:::
