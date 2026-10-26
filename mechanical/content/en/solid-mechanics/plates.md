A beam is a structure that is long in one direction; a **plate** is one that is thin in one direction — a flat sheet loaded perpendicular to its surface. The bottom of a water tank, the deck plating of a ship between its stiffeners, the skin of an aircraft wing between stringers, a flat inspection cover bolted to a pressure vessel, a silicon pressure-sensor diaphragm and a printed circuit board are all plates. They carry load the way a beam does, by bending, but they bend in two directions at once, and the two directions are coupled: bending a sheet of paper in one direction makes it stiff against bending in the other. That coupling — the twisting moment — is what makes a plate stiffer than a set of parallel beams of the same span.

This chapter develops the classical theory of thin plates due to Kirchhoff. It is the two-dimensional analogue of Euler–Bernoulli beam theory ([[mechanics-of-materials/beam-deflection]]): an assumption about how the plate deforms reduces the three-dimensional elasticity problem of [[solid-mechanics/linear-elasticity]] to one fourth-order partial differential equation for the deflection $w(x, y)$. We solve it for rectangular plates by double Fourier series (Navier's method) and for circular plates in closed form, and then use the same equation to find when a plate in compression buckles — the two-dimensional version of Euler's column problem in [[mechanics-of-materials/buckling]].

**Conventions.** The mid-plane of the plate is the $x$–$y$ plane; $z$ points **downward**, as do the deflection $w$ and the lateral load $q$ (force per unit area). The plate has uniform thickness $t$, so $-t/2 \le z \le t/2$. Moments and shear forces are **per unit length** of edge ($\mathrm{N\,m/m}$ and $\mathrm{N/m}$). A positive bending moment produces tension on the bottom face ($z > 0$), as a sagging moment does in a beam.

## Kirchhoff's assumptions and the kinematics

::: definition Kirchhoff plate {#def-kirchhoff}
A **Kirchhoff (thin) plate** is a flat plate of uniform thickness $t$, small compared with its span $a$ (roughly $t/a < 1/10$), of linear-elastic isotropic material, whose lateral deflection $w$ is small compared with $t$, and which deforms so that:
1. straight lines normal to the mid-plane remain straight, normal to the deformed mid-plane and unstretched (no transverse shear strain, $\gamma_{xz} = \gamma_{yz} = 0$; $\varepsilon_z = 0$);
2. the mid-plane does not stretch (no membrane forces);
3. the normal stress $\sigma_z$ is negligible compared with the in-plane stresses (plane stress in each layer).
:::

The first assumption is the plate version of "plane sections remain plane and normal". Its consequence is that the whole displacement field follows from $w$. A normal at $(x, y)$ rotates by the slopes $\partial w/\partial x$ and $\partial w/\partial y$, so a point at depth $z$ moves in-plane by
$$
u = -z\frac{\partial w}{\partial x}, \qquad v = -z\frac{\partial w}{\partial y},
$$
and the strains of [[solid-mechanics/stress-strain-3d]] are
$$
\varepsilon_x = -z\frac{\partial^2 w}{\partial x^2}, \qquad \varepsilon_y = -z\frac{\partial^2 w}{\partial y^2}, \qquad \gamma_{xy} = -2z\frac{\partial^2 w}{\partial x\,\partial y}.
$$ {#eq-plate-strain}
The three quantities $\kappa_x = -\partial^2w/\partial x^2$, $\kappa_y = -\partial^2w/\partial y^2$ and $\kappa_{xy} = -\partial^2w/\partial x\partial y$ are the **curvatures** and the **twist** of the mid-plane. A plate deformed into a saddle, $w = cxy$, has no curvature in $x$ or $y$ but a uniform twist: lines parallel to $x$ stay straight but rotate as you move along $y$.

## Moments and the plate equation

::: proposition Moment–curvature relations {#prop-moment-curvature}
In a Kirchhoff plate the moments per unit length are
$$
M_x = -D\left(\frac{\partial^2w}{\partial x^2} + \nu\frac{\partial^2w}{\partial y^2}\right), \quad
M_y = -D\left(\frac{\partial^2w}{\partial y^2} + \nu\frac{\partial^2w}{\partial x^2}\right), \quad
M_{xy} = -D(1 - \nu)\frac{\partial^2w}{\partial x\,\partial y},
$$ {#eq-moments}
where the **flexural rigidity** is
$$
D = \frac{Et^3}{12(1 - \nu^2)} .
$$ {#eq-D}
The stresses vary linearly through the thickness and are largest at the faces: $\sigma_x = 12M_xz/t^3$, with $\sigma_{x,\max} = 6M_x/t^2$, and similarly for $\sigma_y$ and $\tau_{xy}$.
:::

::: proof
Each layer is in plane stress, so by Hooke's law ([[solid-mechanics/linear-elasticity]]) and [[#eq-plate-strain]]
$$
\sigma_x = \frac{E}{1 - \nu^2}(\varepsilon_x + \nu\varepsilon_y) = -\frac{Ez}{1 - \nu^2}\left(w_{,xx} + \nu w_{,yy}\right), \qquad \tau_{xy} = G\gamma_{xy} = -\frac{Ez}{1 + \nu}w_{,xy},
$$
with commas denoting derivatives. The moment per unit length is the first moment of the stress through the thickness, $M_x = \int_{-t/2}^{t/2}\sigma_xz\,dz$; since $\int z^2\,dz = t^3/12$, this gives $M_x = -\frac{Et^3}{12(1 - \nu^2)}(w_{,xx} + \nu w_{,yy})$, and likewise $M_y$. For the twisting moment $M_{xy} = \int\tau_{xy}z\,dz = -\frac{Et^3}{12(1 + \nu)}w_{,xy} = -D(1 - \nu)w_{,xy}$, using $\frac{1}{1 + \nu} = \frac{1 - \nu}{1 - \nu^2}$. Eliminating $w$ between the expressions for $\sigma_x$ and $M_x$ gives $\sigma_x = 12M_xz/t^3$.
:::

The rigidity $D$ is $EI$ per unit width with $I = t^3/12$, enlarged by $1/(1 - \nu^2)$ — about 10 % for metals. The factor appears because a strip of plate cannot contract sideways freely (the neighbouring strips stop it), so it bends as if it were in plane strain across its width.

::: theorem The plate equation {#thm-plate}
The deflection of a Kirchhoff plate with uniform rigidity $D$ under lateral load $q(x, y)$ satisfies the biharmonic equation
$$
\nabla^4w = \frac{\partial^4w}{\partial x^4} + 2\frac{\partial^4w}{\partial x^2\partial y^2} + \frac{\partial^4w}{\partial y^4} = \frac{q}{D}.
$$ {#eq-plate}
The transverse shear forces per unit length are $Q_x = -D\,\partial(\nabla^2w)/\partial x$ and $Q_y = -D\,\partial(\nabla^2w)/\partial y$.
:::

::: proof
Take an element $dx\times dy$ of the plate. Its edges carry the moments $M_x$, $M_y$, $M_{xy}$ and shear forces $Q_x$, $Q_y$ per unit length, and its top face the load $q\,dx\,dy$. Vertical equilibrium (the shear forces change across the element):
$$
\frac{\partial Q_x}{\partial x} + \frac{\partial Q_y}{\partial y} + q = 0 .
$$
Moment equilibrium about an axis parallel to $y$ (neglecting the higher-order moment of $q$):
$$
\frac{\partial M_x}{\partial x} + \frac{\partial M_{xy}}{\partial y} - Q_x = 0, \qquad\text{and similarly}\qquad \frac{\partial M_{xy}}{\partial x} + \frac{\partial M_y}{\partial y} - Q_y = 0 .
$$
Substituting the shear forces into the first equation:
$$
\frac{\partial^2M_x}{\partial x^2} + 2\frac{\partial^2M_{xy}}{\partial x\,\partial y} + \frac{\partial^2M_y}{\partial y^2} + q = 0 .
$$
Now insert [[#eq-moments]]:
$$
-D\bigl[w_{,xxxx} + \nu w_{,xxyy} + 2(1 - \nu)w_{,xxyy} + w_{,yyyy} + \nu w_{,xxyy}\bigr] + q = 0,
$$
and the $\nu$ terms cancel to leave $D(w_{,xxxx} + 2w_{,xxyy} + w_{,yyyy}) = q$. The shear-force expressions follow from $Q_x = M_{x,x} + M_{xy,y} = -D(w_{,xxx} + \nu w_{,xyy} + (1 - \nu)w_{,xyy}) = -D(\nabla^2w)_{,x}$. The equation is the plate counterpart of $EIw'''' = q$; it holds under the assumptions of [[#def-kirchhoff]] and is exact within them.
:::

### Boundary conditions

A fourth-order equation needs two conditions on each edge. For an edge $x = $ constant:

- **Clamped:** $w = 0$ and $\partial w/\partial x = 0$.
- **Simply supported:** $w = 0$ and $M_x = 0$. Since $w = 0$ along the edge, $w_{,yy} = 0$ there too, so the second condition reduces to $\partial^2w/\partial x^2 = 0$.
- **Free:** at first sight three conditions — $M_x = 0$, $Q_x = 0$ and $M_{xy} = 0$ — which is one too many. Kirchhoff resolved this in 1850: a twisting moment distributed along an edge is statically equivalent to a vertical force per unit length $\partial M_{xy}/\partial y$ (replace the couple on each short length $dy$ by two opposite vertical forces $M_{xy}$ a distance $dy$ apart; neighbouring forces cancel except for their difference). The correct conditions are $M_x = 0$ and the **effective (Kirchhoff) shear**
$$
V_x = Q_x + \frac{\partial M_{xy}}{\partial y} = -D\left[\frac{\partial^3w}{\partial x^3} + (2 - \nu)\frac{\partial^3w}{\partial x\,\partial y^2}\right] = 0 .
$$
The same replacement leaves unbalanced concentrated forces $2M_{xy}$ at the corners of a rectangular plate. A simply supported rectangular plate under uniform load must be held **down** at its corners by these forces; if it is merely resting on its supports, the corners lift.

## Rectangular plates: Navier's solution

For a rectangular plate $0 \le x \le a$, $0 \le y \le b$ simply supported on all four edges, every term of the double sine series $\sin(m\pi x/a)\sin(n\pi y/b)$ vanishes on the edges together with its second normal derivative, so it satisfies both simply supported conditions automatically.

::: theorem Navier's solution {#thm-navier}
Expand the load as a double sine series,
$$
q(x, y) = \sum_{m=1}^\infty\sum_{n=1}^\infty q_{mn}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}, \qquad q_{mn} = \frac{4}{ab}\int_0^a\!\!\int_0^b q\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}\,dy\,dx .
$$
The deflection of the simply supported plate is
$$
w = \sum_{m,n}\frac{q_{mn}}{\pi^4D\left(\dfrac{m^2}{a^2} + \dfrac{n^2}{b^2}\right)^2}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}.
$$
For a uniform load $q_0$, $q_{mn} = 16q_0/(\pi^2mn)$ for odd $m$ and $n$ and zero otherwise.
:::

::: proof
Substitute one term $w_{mn}\sin(m\pi x/a)\sin(n\pi y/b)$ into [[#eq-plate]]. Each $x$-derivative brings a factor $m\pi/a$ and each $y$-derivative $n\pi/b$, with two derivatives of a sine giving a minus sign, so
$$
\nabla^4 \to \pi^4\left[\left(\frac ma\right)^4 + 2\left(\frac ma\right)^2\left(\frac nb\right)^2 + \left(\frac nb\right)^4\right] = \pi^4\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2.
$$
Matching coefficients with the load series term by term gives $w_{mn}$. The boundary conditions hold term by term, and the solution is unique ([[solid-mechanics/linear-elasticity]]), so this is the solution. For a uniform load, $\int_0^a\sin(m\pi x/a)\,dx = \frac{a}{m\pi}(1 - \cos m\pi)$, which is $2a/(m\pi)$ for odd $m$ and zero for even $m$; hence $q_{mn} = \frac{4q_0}{ab}\cdot\frac{2a}{m\pi}\cdot\frac{2b}{n\pi} = \frac{16q_0}{\pi^2mn}$.
:::

At the centre of a uniformly loaded plate, $\sin(m\pi/2)\sin(n\pi/2) = \pm1$, and the series converges fast for the deflection (each term falls like $1/(mn(m^2 + n^2)^2)$) and more slowly for the moments (an extra factor $m^2$ or $n^2$). For a **square** plate ($a = b$) the sums give
$$
w_{\max} = 0.00406\,\frac{q_0a^4}{D}, \qquad M_{x,\max} = M_{y,\max} = 0.0479\,q_0a^2 \quad (\nu = 0.3),
$$ {#eq-square}
values tabulated by Timoshenko and Woinowsky-Krieger. The first term alone gives $4/\pi^6 = 0.00416$, only 2.4 % high.

::: example A square tank panel {#ex-square}
A square steel panel $1.0\ \mathrm{m}\times1.0\ \mathrm{m}$, $10\ \mathrm{mm}$ thick, simply supported on all edges, carries a water pressure of $10\ \mathrm{kPa}$ (about $1\ \mathrm{m}$ of water). With $E = 200\ \mathrm{GPa}$, $\nu = 0.3$, find the maximum deflection and stress.
::: solution
$$
D = \frac{200\times10^{9}\times0.010^3}{12(1 - 0.09)} = 1.832\times10^{4}\ \mathrm{N\,m}.
$$
From [[#eq-square]]:
$$
w_{\max} = 0.00406\times\frac{10^{4}\times1.0^4}{1.832\times10^{4}} = 2.22\times10^{-3}\ \mathrm{m} = 2.22\ \mathrm{mm},
$$
$$
M_{\max} = 0.0479\times10^{4}\times1.0^2 = 479\ \mathrm{N\,m/m}, \qquad \sigma_{\max} = \frac{6M}{t^2} = \frac{6\times479}{0.010^2} = 28.7\ \mathrm{MPa}.
$$
Sanity checks. (1) $w/t = 0.22$: small enough for the linear theory; above about $w/t \approx 0.5$ the mid-plane stretches, membrane action stiffens the plate and Kirchhoff's theory overestimates the deflection. (2) A simply supported *strip* of span $1\ \mathrm{m}$ (a beam of unit width) would have $w = 5qa^4/(384D) = 7.11\ \mathrm{mm}$ and $M = qa^2/8 = 1250\ \mathrm{N\,m/m}$: the two-way plate deflects 69 % less and carries 62 % less moment, because the load is shared between two directions and the twisting moments help. (3) The corners need a hold-down force $2M_{xy}$ to stop them lifting.
:::
:::

### Long plates and cylindrical bending

As a rectangular plate gets longer, the region near its centre stops feeling the short edges: the deflection there becomes independent of the long coordinate, and the plate bends like a strip spanning the short direction — **cylindrical bending**. With $w = w(x)$ only, the plate equation becomes $D\,d^4w/dx^4 = q$, the beam equation with $EI$ replaced by $D$. The strip is in plane strain across its width, so it also carries a moment $M_y = \nu M_x$ along its length, even though it does not bend in that direction. The Navier coefficients approach the strip values quickly:

| $b/a$ (long/short side) | $1$ | $1.5$ | $2$ | $3$ | $5$ | $\infty$ (strip) |
|---|---|---|---|---|---|---|
| $w_{\max}D/(q_0a^4)$ | $0.00406$ | $0.00772$ | $0.01013$ | $0.01223$ | $0.01297$ | $5/384 = 0.01302$ |
| $M_{x,\max}/(q_0a^2)$ (short span) | $0.0479$ | $0.0812$ | $0.1017$ | $0.1189$ | $0.1246$ | $1/8 = 0.125$ |
| $M_{y,\max}/(q_0a^2)$ (long span) | $0.0479$ | $0.0498$ | $0.0464$ | $0.0406$ | $0.0377$ | $\nu/8 = 0.0375$ |

(Simply supported edges, uniform load, $\nu = 0.3$, $a$ the **short** side; values from Navier's series summed to convergence.) By $b/a = 3$ the plate is within 6 % of the strip. This is why ship and tank plating between closely spaced stiffeners is usually designed as a strip spanning the stiffener spacing.

::: example Deck plating between stiffeners {#ex-deck}
Steel deck plating ($E = 200\ \mathrm{GPa}$, $\nu = 0.3$), $8\ \mathrm{mm}$ thick, spans $600\ \mathrm{mm}$ between longitudinal stiffeners and $1200\ \mathrm{mm}$ between transverse frames, under a uniform pressure of $20\ \mathrm{kPa}$. Treating the edges as simply supported, find the maximum deflection and stress, and compare with the strip approximation.
::: solution
$D = 200\times10^{9}\times0.008^3/(12\times0.91) = 9377\ \mathrm{N\,m}$. With $b/a = 2$ and $a = 0.6\ \mathrm{m}$:
$$
w_{\max} = 0.01013\times\frac{2\times10^{4}\times0.6^4}{9377} = 2.80\times10^{-3}\ \mathrm{m} = 2.80\ \mathrm{mm},
$$
$$
M_{x,\max} = 0.1017\times2\times10^{4}\times0.6^2 = 732\ \mathrm{N\,m/m}, \qquad \sigma_{\max} = \frac{6\times732}{0.008^2} = 68.6\ \mathrm{MPa}.
$$
The strip approximation gives $w = 5qa^4/384D = 3.60\ \mathrm{mm}$ and $\sigma = 6(qa^2/8)/t^2 = 84.4\ \mathrm{MPa}$: 23 % conservative on stress at this aspect ratio, and simpler. Sanity check: $w/t = 0.35$, near the upper limit of small-deflection theory; at higher pressures membrane tension develops and the true deflection and bending stress are lower than these linear values. In practice deck plating is often closer to clamped at the stiffeners (adjacent bays deflect symmetrically), which lowers the mid-span stress but raises the stress at the stiffener lines; classification-society rules specify which to use.
:::
:::

::: widget surface
f: sin(m*pi*x/3)*sin(pi*y)
x: 0, 3
y: 0, 1
sliders: m=1:1:6:1
color: height
resolution: 50
caption: The deflected shape $\sin(m\pi x/a)\sin(\pi y/b)$ of a simply supported plate with $a/b = 3$ — one term of Navier's series, and also a buckling mode of the same plate (below). Drag to rotate and step $m$ from 1 to 6. A uniform load excites mainly $m = 1$; in compression along $x$, this plate buckles into $m = 3$ nearly square half-waves, because short waves cost less bending energy in the $y$-direction than long ones.
:::

## Circular plates

For an axisymmetric circular plate the Laplacian is $\nabla^2 = \frac{1}{r}\frac{d}{dr}\left(r\frac{d}{dr}\right)$, and the plate equation becomes an ordinary differential equation that integrates directly:
$$
\frac{1}{r}\frac{d}{dr}\left\{r\frac{d}{dr}\left[\frac{1}{r}\frac{d}{dr}\left(r\frac{dw}{dr}\right)\right]\right\} = \frac{q}{D}.
$$ {#eq-circular}
The radial and circumferential moments are $M_r = -D\left(w'' + \nu w'/r\right)$ and $M_\theta = -D\left(w'/r + \nu w''\right)$.

::: proposition Uniformly loaded circular plates {#prop-circular}
A solid circular plate of radius $a$ under uniform pressure $q$ has the following deflections and moments.

**Clamped edge:**
$$
w = \frac{q(a^2 - r^2)^2}{64D}, \qquad w_{\max} = \frac{qa^4}{64D}, \qquad M_r(a) = -\frac{qa^2}{8}, \qquad M_r(0) = M_\theta(0) = \frac{(1 + \nu)qa^2}{16}.
$$
The largest stress is at the edge: $\sigma_{r,\max} = \dfrac{3qa^2}{4t^2}$ (tension on the top face).

**Simply supported edge:**
$$
w = \frac{q(a^2 - r^2)}{64D}\left(\frac{5 + \nu}{1 + \nu}a^2 - r^2\right), \qquad w_{\max} = \frac{(5 + \nu)qa^4}{64(1 + \nu)D}, \qquad M_{\max} = M_r(0) = \frac{(3 + \nu)qa^2}{16},
$$
with the largest stress $\sigma_{\max} = \dfrac{3(3 + \nu)qa^2}{8t^2}$ at the centre.
:::

::: proof
Integrate [[#eq-circular]] four times, multiplying by $r$ before each integration that needs it:
$$
w = \frac{qr^4}{64D} + C_1r^2\ln r + C_2r^2 + C_3\ln r + C_4 .
$$
In a solid plate the slope and moment must be finite at $r = 0$, which rules out $C_1$ and $C_3$. So $w = qr^4/64D + C_2r^2 + C_4$.

Clamped: $w'(a) = qa^3/16D + 2C_2a = 0$ gives $C_2 = -qa^2/32D$; $w(a) = 0$ gives $C_4 = qa^4/64D$. Hence $w = q(r^4 - 2a^2r^2 + a^4)/64D = q(a^2 - r^2)^2/64D$. Then $w' = -qr(a^2 - r^2)/16D$ and $w'' = -q(a^2 - 3r^2)/16D$; at $r = a$, $w' = 0$ and $w'' = qa^2/8D$, so $M_r = -qa^2/8$; at $r = 0$, $w'' = w'/r = -qa^2/16D$, so $M_r = M_\theta = (1 + \nu)qa^2/16$. The edge moment is larger in magnitude for all $\nu < 1$, and $\sigma = 6M/t^2$ gives $3qa^2/4t^2$.

Simply supported: $w(a) = 0$ and $M_r(a) = 0$. With $w' = qr^3/16D + 2C_2r$ and $w'' = 3qr^2/16D + 2C_2$, the moment condition at $r = a$ is $\frac{3qa^2}{16D} + 2C_2 + \nu\left(\frac{qa^2}{16D} + 2C_2\right) = 0$, so $C_2 = -\frac{(3 + \nu)qa^2}{32(1 + \nu)D}$, and $w(a) = 0$ fixes $C_4$; collecting terms gives the stated $w$. At the centre $w'' = w'/r = 2C_2$, so $M_r = M_\theta = -D(1 + \nu)2C_2 = (3 + \nu)qa^2/16$.
:::

::: widget plot
f: (1 - x^2)^2; (1 - x^2)*((5 + nu)/(1 + nu) - x^2)
x: 0, 1
y: 0, 4.5
sliders: nu=0.3:0:0.5:0.01
labels: \text{clamped}; \text{simply supported}
caption: Deflection of a uniformly loaded circular plate in units of $qa^4/64D$ against $r/a$. The clamped plate's centre deflection is 1; the simply supported plate's is $(5 + \nu)/(1 + \nu)$, about 4.1 for $\nu = 0.3$. Notice the slopes at $r/a = 1$: zero for the clamped plate, where the large edge moment lives, and steep for the simply supported plate, whose largest moment is at the centre. Real bolted covers lie somewhere between the two curves.
:::

::: example A clamped inspection cover {#ex-cover}
A flat circular steel cover of radius $a = 150\ \mathrm{mm}$ and thickness $t = 12\ \mathrm{mm}$, effectively clamped around its edge, carries a pressure of $0.5\ \mathrm{MPa}$ ($E = 200\ \mathrm{GPa}$, $\nu = 0.3$). Find the centre deflection and the maximum stress, and compare with a simply supported cover.
::: solution
$$
D = \frac{200\times10^{9}\times0.012^3}{12\times0.91} = 3.165\times10^{4}\ \mathrm{N\,m}.
$$
Clamped:
$$
w_{\max} = \frac{qa^4}{64D} = \frac{0.5\times10^{6}\times0.15^4}{64\times3.165\times10^{4}} = 1.25\times10^{-4}\ \mathrm{m} = 0.125\ \mathrm{mm},
$$
$$
\sigma_{\max} = \frac{3qa^2}{4t^2} = \frac{3\times0.5\times150^2}{4\times12^2} = 58.6\ \mathrm{MPa}\ \text{at the edge}, \qquad \sigma(0) = \frac{6}{t^2}\cdot\frac{1.3\,qa^2}{16} = 38.1\ \mathrm{MPa}.
$$
Simply supported: $w_{\max} = \tfrac{5.3}{1.3}\times0.125 = 0.509\ \mathrm{mm}$ and $\sigma_{\max} = 3(3.3)qa^2/8t^2 = 96.7\ \mathrm{MPa}$ at the centre.

Sanity check: $w/t = 0.01$, firmly in the small-deflection range. The two idealisations bracket a real bolted cover; a designer would use the simply supported value for the stress at the centre and the clamped value for the stress at the edge, because each is the worst case for its location. Flat covers on pressure vessels are designed to the applicable code (for example ASME Boiler and Pressure Vessel Code, Section VIII), whose formulas embody these results with factors for the attachment detail; pressure tests of such parts are carried out to the code by trained personnel.
:::
:::

::: warning Flat plates are inefficient pressure boundaries — and the theory has limits
A flat plate carries pressure by bending, so its stress scales as $(a/t)^2$, whereas a curved shell carries it by membrane tension, scaling as $a/t$ ([[solid-mechanics/thick-cylinders-discs]]). For the cover in [[#ex-cover]], a hemispherical head of the same radius and thickness would carry only $pa/2t = 3.1\ \mathrm{MPa}$, nearly twenty times less than the flat plate's $58.6\ \mathrm{MPa}$. That is why vessel ends are dished. Two common errors when using plate formulas: (1) applying them when $w$ is not small compared with $t$ — thin diaphragms quickly develop membrane stresses that the linear theory ignores; (2) applying them to thick plates ($t/a > 0.1$) or near concentrated loads, where transverse shear deformation (Mindlin–Reissner theory) and three-dimensional effects matter. Check $w/t$ and $t/a$ every time.
:::

## Buckling of plates in compression

A thin plate loaded in its own plane by a compressive force per unit length $N_x$ stays flat until the load reaches a critical value, at which an adjacent bent equilibrium becomes possible. The analysis follows the Euler column ([[mechanics-of-materials/buckling]]): in the slightly bent state the in-plane force acting through the curvature adds a lateral load $-N_x\,\partial^2w/\partial x^2$ (compression positive), so
$$
D\nabla^4w + N_x\frac{\partial^2w}{\partial x^2} = 0 .
$$ {#eq-buckling}

::: theorem Buckling of a simply supported plate {#thm-plate-buckling}
A rectangular plate of length $a$ (in the load direction) and width $b$, simply supported on all four edges and compressed uniformly along $x$, buckles at
$$
\sigma_{cr} = \frac{N_{x,cr}}{t} = k\,\frac{\pi^2E}{12(1 - \nu^2)}\left(\frac tb\right)^2, \qquad k = \min_{m = 1, 2, \dots}\left(\frac{mb}{a} + \frac{a}{mb}\right)^2,
$$
where $m$ is the number of half-waves along the length. For $a/b \ge 1$, $k$ never falls below 4 and equals 4 whenever $a/b$ is an integer; the plate buckles into approximately square half-waves.
:::

::: proof
Try $w = W\sin(m\pi x/a)\sin(n\pi y/b)$, which satisfies the simply supported conditions. Substituting into [[#eq-buckling]]:
$$
D\pi^4\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2 - N_x\frac{m^2\pi^2}{a^2} = 0 \quad\Rightarrow\quad N_x = \frac{D\pi^2a^2}{m^2}\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right)^2 .
$$
$N_x$ increases with $n$, so the lowest load has $n = 1$ (one half-wave across the width). Rearranging with $n = 1$,
$$
N_x = \frac{\pi^2D}{b^2}\left(\frac{mb}{a} + \frac{a}{mb}\right)^2,
$$
and the critical value is the minimum over integers $m$. Dividing by $t$ and inserting $D = Et^3/12(1 - \nu^2)$ gives $\sigma_{cr}$. For fixed $m$, $k(\beta) = (m/\beta + \beta/m)^2$ with $\beta = a/b$ has its minimum value 4 at $\beta = m$ (by the inequality $u + 1/u \ge 2$). The curves for $m$ and $m + 1$ cross where $m/\beta + \beta/m = (m + 1)/\beta + \beta/(m + 1)$, i.e. at $\beta = \sqrt{m(m + 1)}$: $\sqrt2$, $\sqrt6$, $\sqrt{12}$, …
:::

::: widget plot
f: (1/x + x)^2; (2/x + x/2)^2; (3/x + x/3)^2; (4/x + x/4)^2
x: 0.3, 5
y: 0, 12
labels: m = 1; m = 2; m = 3; m = 4
hlines: 4
caption: Buckling coefficient $k$ of a simply supported plate in uniaxial compression against the aspect ratio $a/b$, one curve per number of half-waves $m$. The plate buckles in whichever mode is lowest, so the true $k$ is the lower envelope — a festoon touching $k = 4$ at $a/b = 1, 2, 3, 4$. Beyond $a/b \approx 1$, $k$ stays between 4 and 4.5: a long plate's buckling stress depends on its *width*, not its length. Short plates ($a/b < 1$) are much stronger, approaching wide-column behaviour.
:::

The result is the basis of the design of stiffened panels: stringers or stiffeners divide a skin into panels whose *width* $b$ controls $\sigma_{cr}$. Compare a column: a strip $b$ wide and $a$ long, free along its sides, would buckle at $\pi^2E/12(1 - \nu^2)\cdot(t/a)^2$ (with $k = 1$ and the length in place of the width) — far lower when $a > b$. Supporting the long edges changes everything. Other edge conditions give other values of $k$: about 6.97 for loaded edges simply supported and long edges clamped, and about 0.43 for one long edge free (an outstanding flange).

Unlike a column, a plate does not collapse at its buckling load. Once buckled, the material near the supported edges, which cannot deflect, keeps carrying increasing stress, while the centre sheds load. Von Kármán's **effective width** concept replaces the non-uniformly stressed plate by two strips at the edges carrying the edge stress; design codes for thin-walled steel and aluminium members and aircraft skin panels use this **post-buckling reserve** deliberately.

::: example An aircraft skin panel {#ex-skin}
An aluminium-alloy wing skin ($E = 70\ \mathrm{GPa}$, $\nu = 0.33$), $1.5\ \mathrm{mm}$ thick, is supported by stringers at $150\ \mathrm{mm}$ pitch and by ribs at $450\ \mathrm{mm}$ pitch. Treating the panel as simply supported, find the compressive stress at which it buckles, and compare with a strip of the same skin that is supported only at the ribs.
::: solution
$a/b = 450/150 = 3$, an integer, so $k = 4$ with $m = 3$ half-waves along the panel:
$$
\sigma_{cr} = 4\times\frac{\pi^2\times70\,000}{12(1 - 0.33^2)}\left(\frac{1.5}{150}\right)^2 = 4\times6.461\times10^{4}\times10^{-4} = 25.8\ \mathrm{MPa}.
$$
A strip supported only at the ribs behaves as a wide column of length $450\ \mathrm{mm}$ ($k = 1$ with $b$ replaced by $a$): $\sigma_{cr} = 6.461\times10^{4}\times(1.5/450)^2 = 0.72\ \mathrm{MPa}$ — 36 times lower. The stringers are what make thin skin usable in compression.

Sanity check: $25.8\ \mathrm{MPa}$ is far below the alloy's yield strength (several hundred MPa), so this skin buckles elastically at a modest load. That is intended in many designs: the skin buckles in service, the stringers and the effective width of skin next to them carry the compression, and the skin is checked to recover elastically when the load is removed. Aircraft panels are certified to airworthiness regulations with test evidence; this calculation is the starting point, not the design.
:::
:::

::: history
The plate equation has an unusual history. In 1809 the French Academy offered a prize for a mathematical theory of the vibration patterns that Ernst Chladni had made visible by sprinkling sand on vibrating plates (published in 1787). Sophie Germain won it in 1816 with a theory whose final equation, after a correction by Lagrange, was the right one, though her derivation was flawed. Navier presented the double-series solution for a simply supported rectangular plate in 1820. Gustav Kirchhoff's paper of 1850 put the theory on its modern basis — the assumptions of [[#def-kirchhoff]], derivation from energy, and the resolution of the free-edge boundary conditions. G. H. Bryan obtained the buckling load of a simply supported plate in compression in 1891, and Theodore von Kármán, E. E. Sechler and L. H. Donnell introduced the effective-width approach for post-buckled plates in 1932, in work motivated by thin-walled metal aircraft.
:::

::: quiz
A long simply supported plate of width $b$ buckles in compression at $\sigma_{cr}$. If its thickness is doubled, the buckling stress becomes
- [ ] $2\sigma_{cr}$
- [x] $4\sigma_{cr}$
- [ ] $8\sigma_{cr}$
::: solution
$\sigma_{cr} \propto (t/b)^2$, so doubling $t$ multiplies it by 4. (The buckling *load* per unit width, $N_{cr} = \sigma_{cr}t$, rises by 8, as $D \propto t^3$.)
:::
:::

::: quiz
Why does a simply supported rectangular plate under uniform pressure tend to lift at its corners?
- [ ] Because the pressure is larger at the corners.
- [x] Because the twisting moments along the edges are statically equivalent to edge shear plus concentrated corner forces, which must be reacted by holding the corners down.
- [ ] Because Poisson's ratio makes the corners contract.
::: solution
Kirchhoff's edge condition replaces $M_{xy}$ by the effective shear $\partial M_{xy}/\partial y$ along the edge plus a concentrated force $2M_{xy}$ at each corner. For the uniformly loaded plate the supports must pull the corners down, in the direction of the load; without that hold-down force the corners rise off the supports.
:::
:::

::: summary
- Kirchhoff plate theory: thin plate, small deflection, normals stay straight and normal; everything follows from the deflection $w(x, y)$.
- Moments per unit length: $M_x = -D(w_{,xx} + \nu w_{,yy})$, $M_{xy} = -D(1 - \nu)w_{,xy}$, with $D = Et^3/12(1 - \nu^2)$; face stress $6M/t^2$.
- Equilibrium gives $D\nabla^4w = q$. Two conditions per edge: clamped ($w = w_{,n} = 0$), simply supported ($w = M_n = 0$), free ($M_n = 0$ and the Kirchhoff shear $V_n = 0$); rectangular plates have corner forces $2M_{xy}$.
- Navier: double sine series for simply supported rectangles; square plate under uniform load $w_{\max} = 0.00406qa^4/D$, $M_{\max} = 0.0479qa^2$ ($\nu = 0.3$).
- Circular plates under uniform load: clamped $w_{\max} = qa^4/64D$, edge stress $3qa^2/4t^2$; simply supported $w_{\max} = (5 + \nu)qa^4/64(1 + \nu)D$, centre stress $3(3 + \nu)qa^2/8t^2$.
- Flat plates resist pressure inefficiently (stress $\propto (a/t)^2$) — hence dished heads.
- Compression buckling: $\sigma_{cr} = k\pi^2E(t/b)^2/12(1 - \nu^2)$ with $k = 4$ for long simply supported plates; plates have post-buckling strength.
:::

## Exercises

::: exercise Flexural rigidity of a glass pane {level=1 check="800"}
A glass pane is $5\ \mathrm{mm}$ thick, with $E = 72\ \mathrm{GPa}$ and $\nu = 0.25$. Find its flexural rigidity. (Enter $D$ in N m.)
::: solution
$D = Et^3/12(1 - \nu^2) = 72\times10^{9}\times(0.005)^3/(12\times0.9375) = 9000/11.25 = 800\ \mathrm{N\,m}$.
:::
:::

::: exercise A clamped diaphragm {level=1 check="0.3125"}
A clamped circular plate of radius $0.2\ \mathrm{m}$ and flexural rigidity $D = 800\ \mathrm{N\,m}$ carries a uniform pressure of $10\ \mathrm{kPa}$. Find its centre deflection. (Enter it in mm.)
::: solution
$w_{\max} = qa^4/64D = 10^{4}\times0.0016/(64\times800) = 3.125\times10^{-4}\ \mathrm{m} = 0.3125\ \mathrm{mm}$. With $t = 5\ \mathrm{mm}$ (the pane above), $w/t = 0.06$: the small-deflection theory applies.
:::
:::

::: exercise Which buckling mode? {level=1 check="2"}
A simply supported plate with $a/b = 1.5$ is compressed along its length $a$. How many half-waves $m$ form along the length at buckling? (Enter $m$.)
::: solution
$k(m = 1) = (1/1.5 + 1.5)^2 = 4.694$; $k(m = 2) = (2/1.5 + 1.5/2)^2 = (25/12)^2 = 4.340$; $k(m = 3) = (2 + 0.5)^2 = 6.25$. The minimum is at $m = 2$, consistent with the crossover at $a/b = \sqrt2 = 1.414$ between $m = 1$ and $m = 2$.
:::
:::

::: exercise Clamped versus simply supported {level=2 check="4.2"}
For a uniformly loaded circular plate of a material with $\nu = 0.25$, find the ratio of the centre deflection when simply supported to that when clamped. (Enter the ratio.)
::: solution
$\dfrac{(5 + \nu)/(1 + \nu)}{1} = \dfrac{5.25}{1.25} = 4.2$. Clamping the edge makes the plate more than four times stiffer.
:::
:::

::: exercise Edge stress in a clamped plate {level=2 check="60"}
A clamped circular plate of radius $100\ \mathrm{mm}$ and thickness $5\ \mathrm{mm}$ carries $0.2\ \mathrm{MPa}$. Find the maximum bending stress. (Enter it in MPa.)
::: solution
At the edge, $\sigma = 3qa^2/4t^2 = 3\times0.2\times100^2/(4\times25) = 60\ \mathrm{MPa}$, tensile on the loaded (top) face.
:::
:::

::: exercise One term of Navier's series {level=2 check="4/pi^6"}
Using only the $m = n = 1$ term of Navier's solution, find the centre deflection of a uniformly loaded, simply supported square plate in the form $w = c\,q_0a^4/D$. (Enter the exact coefficient $c$, e.g. as an expression in pi.)
::: solution
$q_{11} = 16q_0/\pi^2$ and $\pi^4D(1/a^2 + 1/a^2)^2 = 4\pi^4D/a^4$, so $w_{11} = \frac{16q_0}{\pi^2}\cdot\frac{a^4}{4\pi^4D} = \frac{4}{\pi^6}\frac{q_0a^4}{D}$, i.e. $c = 4/\pi^6 = 0.004161$, against the converged $0.004062$ — 2.4 % high, since all the other terms at the centre alternate in sign and partly cancel.
:::
:::

::: exercise Derive the clamped-plate solution from energy {level=3}
For the clamped circular plate under uniform pressure, assume $w = W(1 - r^2/a^2)^2$, which satisfies both clamped conditions. The bending strain energy of an axisymmetric plate is
$$
U = \pi D\int_0^a\left[(w'')^2 + \frac{(w')^2}{r^2} + \frac{2\nu w'w''}{r}\right]r\,dr .
$$
Use the principle of minimum potential energy ([[solid-mechanics/energy-methods]]) to find $W$, and explain why the answer is exact.
::: solution
With $\xi = r/a$: $w' = -4W\xi(1 - \xi^2)/a$, $w'' = -4W(1 - 3\xi^2)/a^2$. Then $U = \frac{16\pi DW^2}{a^2}\int_0^1\left[(1 - 3\xi^2)^2 + (1 - \xi^2)^2 + 2\nu(1 - \xi^2)(1 - 3\xi^2)\right]\xi\,d\xi$. The integrals (all from 0 to 1) are $\int(1 - 3\xi^2)^2\xi\,d\xi = \tfrac12 - \tfrac32 + \tfrac32 = \tfrac12$, $\int(1 - \xi^2)^2\xi\,d\xi = \tfrac12 - \tfrac12 + \tfrac16 = \tfrac16$, and $\int(1 - \xi^2)(1 - 3\xi^2)\xi\,d\xi = \int(\xi - 4\xi^3 + 3\xi^5)\,d\xi = \tfrac12 - 1 + \tfrac12 = 0$. So $U = \frac{16\pi DW^2}{a^2}\cdot\frac23 = \frac{32\pi DW^2}{3a^2}$, independent of $\nu$. The work of the load is $\int_0^aqw\,2\pi r\,dr = 2\pi qa^2W\int_0^1(1 - \xi^2)^2\xi\,d\xi = \pi qa^2W/3$. Minimising $\Pi = U - \pi qa^2W/3$: $\frac{64\pi DW}{3a^2} = \frac{\pi qa^2}{3}$, so $W = qa^4/64D$ — the exact result, because the assumed shape *is* the exact deflected shape ([[#prop-circular]]), and the Ritz method returns the exact solution whenever the exact solution lies in the trial family.
:::
:::

::: exercise Choosing a stringer pitch {level=3}
An aluminium-alloy skin ($E = 70\ \mathrm{GPa}$, $\nu = 0.33$, $\sigma_Y = 300\ \mathrm{MPa}$) of thickness $2.0\ \mathrm{mm}$ must not buckle below a compressive stress of $60\ \mathrm{MPa}$ (a design condition chosen by the structure's designer). Ribs are $500\ \mathrm{mm}$ apart. (a) What is the largest stringer pitch $b$ if the panels are treated as simply supported with $k = 4$? (b) How many stringers does a $1.2\ \mathrm{m}$ wide skin then need? (c) Discuss what else limits the choice: the stringers' own buckling, rivet pitch, mass, and whether allowing the skin to buckle before limit load would be acceptable.
::: solution
(a) $60 = 4\times\frac{\pi^2\times70\,000}{12(1 - 0.1089)}\left(\frac{2.0}{b}\right)^2 = 2.584\times10^{5}\times\frac{4}{b^2}$, so $b^2 = 1.034\times10^{6}/60 = 1.723\times10^{4}$ and $b = 131\ \mathrm{mm}$. The rib pitch gives $a/b = 3.8$, so $k$ is within a few per cent of 4. ✓
(b) $1200/131 = 9.2$ bays, so 10 bays and 9 interior stringers (pitch $120\ \mathrm{mm}$), plus the spars at the edges.
(c) A good answer notes: stringers must themselves resist column buckling between ribs (Euler, with the effective width of skin attached) and local buckling of their flanges ($k \approx 0.43$ for an outstanding flange); rivet pitch must be close enough to prevent inter-rivet buckling of the skin; more stringers add mass and cost, so the optimum balances skin thickness against stringer count (thicker skin, wider pitch is often lighter overall); and many aircraft designs allow skin buckling above a fraction of limit load because of the post-buckling reserve, provided the buckles disappear on unloading and fatigue at rivet lines is checked. Final sizing is done to the airworthiness regulations with test evidence.
:::
:::
