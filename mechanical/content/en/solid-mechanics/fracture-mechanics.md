On a January night in 1943 the newly completed tanker SS *Schenectady*, lying at her fitting-out dock in Portland, Oregon, suddenly broke in two. She was carrying no cargo and no sea was running; the nominal stress in her deck was far below the yield strength of her steel. Among the thousands of welded Liberty ships and T2 tankers built in the Second World War, hundreds suffered serious brittle fractures, and a few broke completely. A decade later, two de Havilland Comet airliners — the first jet transports — broke up in flight in 1954; the investigation, which tested a complete fuselage to destruction in a water tank, traced the failures to fatigue cracks growing from the corners of cut-outs in the pressurised cabin.

None of these failures can be explained by comparing a stress with a strength. Each started from a **crack** — a weld defect, a fatigue crack, a notch — and a cracked body fails not when the stress somewhere reaches the strength, but when the crack can grow. **Fracture mechanics** is the theory that predicts when that happens. Its central result is that, in a linear-elastic body, the stress field near any crack tip has the same shape, and its intensity is measured by one number, the **stress intensity factor** $K$. Fracture occurs when $K$ reaches a material property, the **fracture toughness** $K_{Ic}$. That one idea lets an engineer calculate how large a crack a structure can tolerate, how fast a fatigue crack will grow to that size, and how often the structure must be inspected — the basis of **damage-tolerant design** of aircraft, pressure vessels, pipelines and bridges.

This chapter develops linear-elastic fracture mechanics (LEFM) from Griffith's energy argument and Irwin's stress-field argument, shows how they are connected, sets out its limits (the plastic zone, plane strain and the toughness test), and applies it to fatigue crack growth. It builds on [[solid-mechanics/linear-elasticity]] and on the materials picture of [[materials-science/failure]].

## Why stress is not enough

A sharp crack is an extreme stress raiser. For an elliptical hole of semi-axes $a$ (perpendicular to the load) and $b$ in a wide plate under remote tension $\sigma$, Inglis's elasticity solution gives the stress at the end of the major axis as
$$
\sigma_{\max} = \sigma\left(1 + \frac{2a}{b}\right) = \sigma\left(1 + 2\sqrt{\frac a\rho}\right),
$$ {#eq-inglis}
where $\rho = b^2/a$ is the radius of curvature at the tip. A circular hole ($a = b$) gives the factor 3 of [[solid-mechanics/linear-elasticity]]; a crack, with $\rho \to 0$, gives $\sigma_{\max} \to \infty$. If failure meant "$\sigma_{\max}$ reaches the strength", every cracked body would fail at zero load. Real cracked bodies do not, so a different criterion is needed: one that does not depend on the (unknowable, and in the limit zero) tip radius.

## Griffith's energy balance

Griffith's insight was to ask not about stress but about energy. When a crack extends, two things happen: new surface is created, which costs energy, and the body around the crack becomes more compliant, which releases stored elastic energy (or allows the loads to do work). The crack can grow when the energy released is at least enough to pay for the new surface.

::: definition Energy release rate {#def-G}
For a cracked body of thickness $B$ with crack length $a$, the **energy release rate** $G$ is the decrease in potential energy $\Pi$ (strain energy minus the potential of the applied loads) per unit area of crack growth:
$$
G = -\frac{1}{B}\frac{d\Pi}{da} .
$$
Its units are $\mathrm{J/m^2} = \mathrm{N/m}$. A crack grows when $G$ reaches a critical value $G_c$, the material's resistance to crack growth: for an ideally brittle solid $G_c = 2\gamma_s$, twice the surface energy (two faces are created), and for metals and polymers it is dominated by the plastic work done near the tip.
:::

::: theorem Griffith's fracture criterion {#thm-griffith}
An infinite plate of a linear-elastic material containing a through crack of length $2a$ perpendicular to a remote uniform tension $\sigma$ has energy release rate (per crack tip)
$$
G = \frac{\pi\sigma^2a}{E'}, \qquad E' = E\ \text{(plane stress)}, \quad E' = \frac{E}{1 - \nu^2}\ \text{(plane strain)},
$$
and fractures at
$$
\sigma_f = \sqrt{\frac{E'G_c}{\pi a}} = \sqrt{\frac{2E'\gamma_s}{\pi a}}\quad\text{(ideally brittle)}.
$$
:::

::: proof
Inglis's solution shows that introducing the crack into the plate at fixed remote stress raises the stored strain energy by $\pi\sigma^2a^2B/E'$ while the boundary loads do twice that amount of work, so that the potential energy (strain energy minus the work potential of the loads) falls by
$$
\Pi(a) - \Pi(0) = -\frac{\pi\sigma^2a^2B}{E'} .
$$
The crack has two tips, and growth $da$ at each tip increases the crack area by $2B\,da$. Hence
$$
G = -\frac{1}{2B}\frac{d\Pi}{da} = \frac{1}{2B}\cdot\frac{2\pi\sigma^2aB}{E'} = \frac{\pi\sigma^2a}{E'} .
$$
Setting $G = G_c$ gives $\sigma_f$. The equilibrium is unstable: $G$ grows with $a$, while $G_c$ is constant for an ideally brittle material, so once the crack starts to grow, the driving force exceeds the resistance by more and more. Griffith's own statement was for the total energy $U = -\pi\sigma^2a^2B/E' + 4a\gamma_sB$, whose maximum with respect to $a$ is the same condition.
:::

::: example Why glass is weak {#ex-glass}
Window glass has $E = 70\ \mathrm{GPa}$ and surface energy $\gamma_s \approx 1\ \mathrm{J/m^2}$. Estimate the fracture stress of a plate containing surface flaws equivalent to cracks of half-length $1\ \mu\mathrm{m}$, and compare with the theoretical strength of the atomic bonds, roughly $E/10$.
::: solution
$$
\sigma_f = \sqrt{\frac{2E\gamma_s}{\pi a}} = \sqrt{\frac{2\times70\times10^{9}\times1}{\pi\times1\times10^{-6}}} = 2.1\times10^{8}\ \mathrm{Pa} = 211\ \mathrm{MPa}.
$$
The theoretical strength is about $E/10 = 7000\ \mathrm{MPa}$, more than thirty times higher. Typical design strengths of ordinary glass are tens of MPa; freshly drawn glass fibres with pristine surfaces can reach several GPa. Griffith's explanation — the strength is controlled by the largest flaw, not by the bonds — is why glass is strengthened by protecting or compressing its surface (tempering, chemical toughening) rather than by changing its chemistry. Sanity check: halving the flaw size raises $\sigma_f$ by only $\sqrt2$, and the units work out as $\sqrt{\mathrm{Pa\cdot J/m^2/m}} = \mathrm{Pa}$.
:::
:::

For metals Griffith's surface energy is irrelevant: the energy absorbed by plastic deformation at the crack tip is thousands of times larger. Irwin and Orowan, independently in the late 1940s, proposed keeping Griffith's form but replacing $2\gamma_s$ by $G_c$, a measured toughness that includes the plastic work. This made the energy approach usable for engineering metals — provided the plastic zone is small.

### The compliance method

$G$ can be measured or computed from the load–displacement behaviour of a cracked component without knowing anything about the stresses near the tip.

::: proposition Energy release rate from compliance {#prop-compliance}
For a linear-elastic body loaded by a force $P$ with load-point displacement $\delta = C(a)P$, where $C$ is the compliance,
$$
G = \frac{P^2}{2B}\frac{dC}{da},
$$
whether the crack grows at fixed load or at fixed displacement.
:::

::: proof
At fixed load, the strain energy is $U = \tfrac12P\delta = \tfrac12CP^2$ and the potential of the load is $-P\delta = -CP^2$, so $\Pi = -\tfrac12CP^2$ and $G = -\frac1B\frac{d\Pi}{da} = \frac{P^2}{2B}\frac{dC}{da}$. At fixed displacement the load does no work, $\Pi = U = \tfrac12\delta^2/C$, and $G = -\frac1B\frac{dU}{da} = \frac{\delta^2}{2BC^2}\frac{dC}{da} = \frac{P^2}{2B}\frac{dC}{da}$, the same. The energy available for crack growth comes from different places — the loading system in one case, the stored strain energy in the other — but the amount is the same.
:::

::: example A double cantilever beam test {#ex-dcb}
In a double cantilever beam (DCB) specimen, used to measure the toughness of adhesive joints and composite laminates, two arms of width $B$ and depth $h$ are pulled apart by forces $P$ at the end of a crack of length $a$. Treating each arm as a cantilever, find $G$, and evaluate the load at which an adhesive with $G_c = 300\ \mathrm{J/m^2}$ debonds for aluminium arms ($E = 70\ \mathrm{GPa}$) with $B = 25\ \mathrm{mm}$, $h = 6\ \mathrm{mm}$, $a = 60\ \mathrm{mm}$.
::: solution
Each arm deflects $Pa^3/3EI$ with $I = Bh^3/12$, so the opening is $\delta = 2Pa^3/3EI$ and $C = 2a^3/3EI$. Then $dC/da = 2a^2/EI$ and
$$
G = \frac{P^2}{2B}\cdot\frac{2a^2}{EI} = \frac{P^2a^2}{BEI} = \frac{12P^2a^2}{B^2Eh^3}.
$$
Setting $G = G_c$:
$$
P_c = \frac{Bh}{a}\sqrt{\frac{G_cEh}{12}} = \frac{0.025\times0.006}{0.060}\sqrt{\frac{300\times70\times10^{9}\times0.006}{12}} = 0.0025\times1.025\times10^{5} = 256\ \mathrm{N}.
$$
Sanity check: $P_c \propto 1/a$, so the load needed to propagate the crack *falls* as it grows — but at fixed displacement $G = 9EI\delta^2/(4Ba^4)$ falls as $a^{-4}$, so in a displacement-controlled test the crack grows stably, which is why the DCB is a good test.
:::
:::

## The stress intensity factor

Irwin's complementary approach looks at the stresses. Near the tip of any crack in a linear-elastic body, the stresses have a universal form: they grow as $1/\sqrt r$ with distance $r$ from the tip, with an angular distribution that depends only on the mode of loading. All the information about the geometry and the load is concentrated into one scaling factor.

::: definition Modes and the stress intensity factor {#def-K}
There are three ways to load a crack: **mode I** (opening — tension normal to the crack plane), **mode II** (in-plane sliding) and **mode III** (out-of-plane tearing). For mode I, in polar coordinates $(r, \theta)$ centred at the tip with $\theta = 0$ straight ahead,
$$
\sigma_{ij} = \frac{K_I}{\sqrt{2\pi r}}\,f_{ij}(\theta) + \text{(terms bounded as } r \to 0), \qquad \text{for example}\quad \sigma_{yy}(r, 0) = \frac{K_I}{\sqrt{2\pi r}},
$$
where the functions $f_{ij}$ are universal: $f_{yy}(\theta) = \cos\frac\theta2\left(1 + \sin\frac\theta2\sin\frac{3\theta}{2}\right)$ and similar expressions for the other components. The **stress intensity factor** $K_I$, in $\mathrm{MPa\sqrt m}$, depends on load, crack size and geometry, and is written
$$
K_I = Y\sigma\sqrt{\pi a},
$$ {#eq-K}
with $\sigma$ a reference stress and $Y$ a dimensionless geometry factor: $Y = 1$ for a central crack of length $2a$ in an infinite plate, $Y \approx 1.12$ for a short edge crack of depth $a$ in a semi-infinite plate, and tabulated values (handbooks of stress intensity factors) for other cases.
:::

::: theorem Irwin's relation between $G$ and $K$ {#thm-irwin}
In a linear-elastic body under mode I,
$$
G = \frac{K_I^2}{E'},
$$
with $E' = E$ in plane stress and $E/(1 - \nu^2)$ in plane strain. The energy criterion $G = G_c$ and the stress criterion $K_I = K_{Ic}$ are therefore equivalent, with $K_{Ic} = \sqrt{E'G_c}$.
:::

::: proof
Irwin's crack-closure argument: the energy released when the crack grows by $\Delta a$ equals the work needed to close it again over that length. Before closure, the faces behind the new tip are open by the near-tip displacement of a crack of length $a + \Delta a$; at a distance $x$ ahead of the original tip, which is $\Delta a - x$ behind the new tip, the opening is $2v = \frac{8K_I}{E'}\sqrt{\frac{\Delta a - x}{2\pi}}$ (from the near-tip displacement field). Closing it requires the stresses that act ahead of the original tip, $\sigma_{yy} = K_I/\sqrt{2\pi x}$. The work per unit thickness, divided by $\Delta a$, is
$$
G = \lim_{\Delta a \to 0}\frac{1}{\Delta a}\int_0^{\Delta a}\frac12\sigma_{yy}(x)\,2v(x)\,dx = \lim\frac{1}{\Delta a}\int_0^{\Delta a}\frac{K_I}{\sqrt{2\pi x}}\cdot\frac{4K_I}{E'}\sqrt{\frac{\Delta a - x}{2\pi}}\,dx = \frac{2K_I^2}{\pi E'\Delta a}\int_0^{\Delta a}\sqrt{\frac{\Delta a - x}{x}}\,dx .
$$
The integral equals $\pi\Delta a/2$ (substitute $x = \Delta a\sin^2\phi$), giving $G = K_I^2/E'$. Check against Griffith: $K_I = \sigma\sqrt{\pi a}$ gives $K_I^2/E' = \pi\sigma^2a/E'$, which is [[#thm-griffith]]. ✓
:::

The practical form of LEFM is thus a single inequality,
$$
K_I = Y\sigma\sqrt{\pi a} < K_{Ic},
$$ {#eq-criterion}
connecting three quantities a designer cares about: the **stress** $\sigma$, the **crack size** $a$ (from inspection or assumption), and the **toughness** $K_{Ic}$ (a material property, measured by standard tests). Given any two, the third follows. Typical room-temperature values, as quoted in materials handbooks: high-strength aluminium alloys $20$–$35\ \mathrm{MPa\sqrt m}$; titanium alloys $40$–$100$; quenched-and-tempered steels $50$–$150$; mild structural steels above about $100$ at room temperature but much lower below their ductile–brittle transition; glass and ceramics $0.5$–$5$. Design uses certified test data for the actual material, thickness and temperature, not handbook ranges.

::: widget plot
f: K/sqrt(pi*x/1000); sy
x: 0.2, 50
y: 0, 1400
sliders: K=60:10:150:5; sy=1000:200:1400:10
labels: \text{fracture: } K_{Ic}/\sqrt{\pi a}; \text{yield } \sigma_Y
caption: Failure stress of a wide plate with a centre crack of half-length $a$ (in mm, horizontal axis) by fracture ($Y = 1$) and by yielding of the net section (roughly $\sigma_Y$ for small cracks). Start with a high-strength steel, $K_{Ic} = 60\ \mathrm{MPa\sqrt m}$ and $\sigma_Y = 1000\ \mathrm{MPa}$: the curves cross at $a = (K_{Ic}/\sigma_Y)^2/\pi \approx 1.1\ \mathrm{mm}$, so any crack longer than about a millimetre makes the part fail by fracture below yield. Now lower $\sigma_Y$ and raise $K_{Ic}$ (a tougher, softer steel): the crossover moves to tens of millimetres and the part yields first. Stronger is not always safer.
:::

::: example High-strength versus tough steel {#ex-steels}
A component is to be designed at a working stress of half the yield strength. Steel A has $\sigma_Y = 1000\ \mathrm{MPa}$ and $K_{Ic} = 60\ \mathrm{MPa\sqrt m}$; steel B has $\sigma_Y = 250\ \mathrm{MPa}$ and $K_{Ic} = 150\ \mathrm{MPa\sqrt m}$. For a centre crack in a wide plate ($Y = 1$), find the critical crack length $2a_c$ at the working stress for each steel.
::: solution
From [[#eq-criterion]], $a_c = \frac1\pi\left(\frac{K_{Ic}}{\sigma}\right)^2$.

Steel A at $\sigma = 500\ \mathrm{MPa}$: $a_c = \frac1\pi(60/500)^2 = 4.58\times10^{-3}\ \mathrm{m}$, so $2a_c = 9.2\ \mathrm{mm}$.

Steel B at $\sigma = 125\ \mathrm{MPa}$: $a_c = \frac1\pi(150/125)^2 = 0.458\ \mathrm{m}$, so $2a_c = 917\ \mathrm{mm}$.

The high-strength steel carries four times the stress but tolerates a crack a hundred times shorter — a crack small enough to be missed by routine inspection. Steel B's critical crack is so long that the plate would yield across its net section first; LEFM does not even apply. Sanity check on the scaling: $a_c \propto (K_{Ic}/\sigma)^2$, and $(150/125)/(60/500) = 10$, squared, is 100. ✓ This is the practical reason that ultra-high-strength steels are used only where inspection is reliable and the consequences of fracture are understood.
:::
:::

::: warning Units of K, crack length conventions and plane stress versus plane strain
(1) $K$ is in $\mathrm{MPa\sqrt m}$: put $a$ in **metres**, not millimetres, or the answer is wrong by $\sqrt{1000} = 31.6$. (2) For a centre crack the formula uses the **half**-length $a$; for an edge crack, the full depth $a$. Mixing them changes $K$ by $\sqrt2$ and the critical length by a factor of 2. (3) $K_{Ic}$ is the **plane-strain** toughness, a lower bound measured in thick specimens; thin sheets show higher apparent toughness because the plastic zone is larger, but that value is thickness-dependent and not a material constant. Using a thin-sheet value for a thick weld is unconservative. (4) Toughness of many steels collapses below the ductile–brittle transition temperature — the Liberty ships fractured in cold water — so the value must be for the service temperature.
:::

## The plastic zone and the limits of LEFM

The $1/\sqrt r$ singularity predicts infinite stress at the tip, but a real material yields. LEFM still works if the region where it fails — the **plastic zone** — is small compared with the crack and the body, because then the elastic $K$-field surrounds and controls it.

::: proposition Irwin's plastic-zone estimate {#prop-plastic-zone}
In plane stress, the length of the plastic zone ahead of a mode I crack tip in an elastic–perfectly plastic material is approximately
$$
r_p = \frac1\pi\left(\frac{K_I}{\sigma_Y}\right)^2,
$$
twice the distance $r_y = \frac{1}{2\pi}(K_I/\sigma_Y)^2$ at which the elastic $\sigma_{yy}$ equals $\sigma_Y$. In plane strain the triaxial constraint raises the stress needed to yield, and the zone is about a third as large, $r_p \approx \frac{1}{3\pi}(K_I/\sigma_Y)^2$.
:::

::: proof
First estimate: setting $\sigma_{yy}(r, 0) = K_I/\sqrt{2\pi r} = \sigma_Y$ gives $r_y = K_I^2/(2\pi\sigma_Y^2)$. But the stress that the elastic solution placed above $\sigma_Y$ within $r_y$, the area $\int_0^{r_y}K_I/\sqrt{2\pi r}\,dr - \sigma_Y r_y = 2\sigma_Y r_y - \sigma_Y r_y = \sigma_Yr_y$, cannot simply vanish: it must be carried further out, which the material can do only by yielding over an additional length. Irwin's force balance gives an extra $r_y$, so $r_p = 2r_y = K_I^2/(\pi\sigma_Y^2)$. In plane strain, along $\theta = 0$ the stresses near the tip are $\sigma_{xx} = \sigma_{yy}$ and $\sigma_{zz} = \nu(\sigma_{xx} + \sigma_{yy})$, so the von Mises stress is $(1 - 2\nu)\sigma_{yy}$, about $0.4\sigma_{yy}$ for $\nu = 0.3$: yield needs a much larger $\sigma_{yy}$, and the zone shrinks. The factor of roughly 3 is Irwin's commonly used estimate.
:::

The standard test for plane-strain fracture toughness (ASTM E399) requires the specimen thickness $B$, crack length $a$ and remaining ligament $W - a$ to satisfy
$$
B,\ a,\ (W - a) \ \ge\ 2.5\left(\frac{K_{Ic}}{\sigma_Y}\right)^2,
$$ {#eq-e399}
about 25 times the plane-strain plastic zone, so that the zone is surrounded by elastic material and the through-thickness constraint is high. For tough, low-strength steels this would need specimens hundreds of millimetres thick; for them, elastic–plastic fracture mechanics is used.

### Beyond LEFM: CTOD and the J-integral

When the plastic zone is not small, two measures replace $K$. Wells (1961) proposed the **crack-tip opening displacement** (CTOD), the separation of the crack faces at the tip, as the fracture parameter; it is widely used for welded steel structures. Rice (1968) introduced the **J-integral**,
$$
J = \int_\Gamma\left(W\,dy - \mathbf{t}\cdot\frac{\partial\mathbf{u}}{\partial x}\,ds\right),
$$
where $\Gamma$ is any contour around the crack tip from one face to the other, $W$ the strain energy density and $\mathbf{t}$ the traction on the contour. For a non-linear elastic (or deformation-plasticity) material $J$ is independent of the path, so it can be evaluated far from the tip where the stresses are well known, and it equals the energy release rate; for a linear-elastic material $J = G = K^2/E'$. The critical value $J_{Ic}$ is measured by standard tests in specimens much smaller than E399 requires.

::: example Is LEFM valid? {#ex-validity}
A $7075$-T6 aluminium plate ($\sigma_Y = 500\ \mathrm{MPa}$, $K_{Ic} = 28\ \mathrm{MPa\sqrt m}$, typical handbook values) is $5\ \mathrm{mm}$ thick. Find the plastic zone at fracture in plane stress and in plane strain, and the thickness needed for a valid E399 test. Is $K_{Ic}$ the right toughness for this plate?
::: solution
$(K_{Ic}/\sigma_Y)^2 = (28/500)^2 = 3.14\times10^{-3}\ \mathrm{m}$. Plane-stress zone: $r_p = 3.14\times10^{-3}/\pi = 1.0\ \mathrm{mm}$; plane strain: $r_p \approx 3.14\times10^{-3}/(3\pi) = 0.33\ \mathrm{mm}$. E399 thickness: $B \ge 2.5\times3.14\times10^{-3}\ \mathrm{m} = 7.8\ \mathrm{mm}$.

The plate is thinner than $7.8\ \mathrm{mm}$, so it is not fully in plane strain: its plastic zone (about $1\ \mathrm{mm}$) is a fifth of its thickness, and its apparent toughness will be somewhat higher than $K_{Ic}$. Using $K_{Ic}$ is conservative; a less conservative design would use a plane-stress or $R$-curve toughness measured on the actual thickness. Sanity check: the zone is small compared with any crack an inspector would look for (millimetres to tens of millimetres), so LEFM is appropriate.
:::
:::

## Fatigue crack growth

Under cyclic load, a crack well below the critical size grows a tiny amount each cycle. Paris, Gomez and Anderson (1961) and Paris and Erdogan (1963) showed that the growth rate per cycle is governed by the range of stress intensity factor in the cycle, $\Delta K = K_{\max} - K_{\min} = Y\Delta\sigma\sqrt{\pi a}$.

::: definition The Paris law {#def-paris}
Over the intermediate range of $\Delta K$, the fatigue crack growth rate follows
$$
\frac{da}{dN} = C(\Delta K)^m,
$$ {#eq-paris}
with material constants $C$ and $m$ (typically $m \approx 3$ for steels and $3$–$4$ for aluminium alloys). Below a **threshold** $\Delta K_{th}$ (a few $\mathrm{MPa\sqrt m}$ for steels) cracks do not grow measurably; near $K_{\max} = K_{Ic}$ growth accelerates to fracture. For ferrite–pearlite steels Barsom and Rolfe give the conservative fit $C = 6.9\times10^{-12}$ and $m = 3.0$, with $da/dN$ in $\mathrm{m/cycle}$ and $\Delta K$ in $\mathrm{MPa\sqrt m}$. The law is an empirical correlation; the constants depend on the material, the environment and the stress ratio $R = K_{\min}/K_{\max}$.
:::

::: proposition Fatigue life from the Paris law {#prop-life}
If $Y$ is constant, the number of cycles to grow a crack from $a_i$ to $a_f$ is
$$
N = \int_{a_i}^{a_f}\frac{da}{C(Y\Delta\sigma\sqrt{\pi a})^m} = \frac{a_i^{1 - m/2} - a_f^{1 - m/2}}{C\,(Y\Delta\sigma\sqrt\pi)^m\,(m/2 - 1)}, \qquad m \ne 2,
$$
and $N = \ln(a_f/a_i)/[C\pi(Y\Delta\sigma)^2]$ for $m = 2$.
:::

::: proof
Separate variables in [[#eq-paris]]: $dN = da/[C(Y\Delta\sigma\sqrt\pi)^m a^{m/2}]$. Integrate $a^{-m/2}$: $\int a^{-m/2}\,da = a^{1 - m/2}/(1 - m/2)$, which, evaluated from $a_i$ to $a_f$ and with the sign moved into the denominator, gives the stated result. For $m = 2$ the integral is $\ln a$. If $Y$ varies with $a$, as it does for finite bodies, the integral is evaluated numerically.
:::

For $m > 2$ the life is dominated by the first term: $N \approx a_i^{1 - m/2}/[\dots]$. The **initial** crack size controls the life, and the final size hardly matters. That has two consequences: inspection must find small cracks, and a modest error in the critical crack size changes the predicted life very little.

::: example Fatigue life of a cracked plate {#ex-fatigue}
A wide steel plate with an edge crack ($Y = 1.12$, assumed constant) carries a cyclic stress from $20$ to $200\ \mathrm{MPa}$. The steel has $K_{Ic} = 60\ \mathrm{MPa\sqrt m}$ and Paris constants $C = 6.9\times10^{-12}$, $m = 3$ (m/cycle, $\mathrm{MPa\sqrt m}$). An inspection can reliably find cracks $1\ \mathrm{mm}$ deep. Find the critical crack depth and the number of cycles to grow a $1\ \mathrm{mm}$ crack to failure. What fraction of the life is spent growing from $1$ to $2\ \mathrm{mm}$?
::: solution
Critical depth at $\sigma_{\max} = 200\ \mathrm{MPa}$:
$$
a_c = \frac1\pi\left(\frac{K_{Ic}}{Y\sigma_{\max}}\right)^2 = \frac1\pi\left(\frac{60}{1.12\times200}\right)^2 = 0.0228\ \mathrm{m} = 22.8\ \mathrm{mm}.
$$
With $\Delta\sigma = 180\ \mathrm{MPa}$, $C(Y\Delta\sigma\sqrt\pi)^3 = 6.9\times10^{-12}\times(1.12\times180\times1.7725)^3 = 3.148\times10^{-4}$, and with $m/2 - 1 = 0.5$:
$$
N = \frac{a_i^{-1/2} - a_c^{-1/2}}{0.5\times3.148\times10^{-4}} = \frac{31.62 - 6.62}{1.574\times10^{-4}} = 1.59\times10^{5}\ \text{cycles}.
$$
From $1$ to $2\ \mathrm{mm}$: $N_{1\to2} = (31.62 - 22.36)/1.574\times10^{-4} = 5.88\times10^{4}$ cycles, **37 %** of the life, and 89 % of the life is spent before the crack reaches half its critical size. Sanity check: the initial growth rate is $da/dN = C(1.12\times180\sqrt{\pi\times0.001})^3 = 1.0\times10^{-8}\ \mathrm{m}$ per cycle — about 10 nanometres, a few dozen atomic spacings, typical of the striations seen on fatigue fracture surfaces. If the plate sees 10 000 cycles a year, an inspection interval of a few years, with a safety factor on life, would be set from this calculation.
:::
:::

::: widget plot
f: if((ai/1000)^(-0.5) - 0.5*6.9e-12*(1.12*ds*sqrt(pi))^3*1000*x > 0, 1000/((ai/1000)^(-0.5) - 0.5*6.9e-12*(1.12*ds*sqrt(pi))^3*1000*x)^2, 0/0)
x: 0, 400
y: 0, 30
sliders: ai=1:0.2:5:0.1; ds=180:80:250:5
hlines: 22.8
caption: Crack depth $a$ (mm) against thousands of cycles for the plate of [[#ex-fatigue]], from the integrated Paris law with $m = 3$; the horizontal line is the critical depth $22.8\ \mathrm{mm}$ at $\sigma_{\max} = 200\ \mathrm{MPa}$ (strictly it falls as the stress range rises). The crack creeps for most of its life and then runs away. Double the initial size $a_i$ from 1 to 2 mm and the life falls by 37 %; reduce the stress range by 20 % and the life almost doubles ($1/0.8^3 = 1.95$). Both effects are why damage-tolerant design concentrates on inspection capability and stress range.
:::

## Damage-tolerant design

Fracture mechanics changed the philosophy of structural design for aircraft and other critical structures. The older **safe-life** approach designs a part to survive a specified life without cracking, with a scatter factor. The **fail-safe** approach provides redundant load paths so that the failure of one member does not cause collapse. The **damage-tolerant** approach, made a requirement for transport aircraft structures in the 1970s, assumes that flaws are present from manufacture or arise in service, and shows by analysis and test that the largest flaw that inspection might miss will not grow to critical size before the next inspection. Its ingredients are exactly those of this chapter: a stress intensity solution for the geometry, the material's $K_{Ic}$ (or residual-strength curve) and crack-growth data, the load spectrum, and a demonstrated inspection capability.

A related idea for pressure equipment is **leak-before-break**: if a through-wall crack long enough to leak detectably is still shorter than the critical length at the operating pressure, the vessel or pipe will reveal a crack by leaking before it can fracture. Assessment procedures such as BS 7910 and API 579-1/ASME FFS-1 set out these calculations; they are applied by qualified engineers, and this chapter teaches only the principles behind them.

::: history
C. E. Inglis published his solution for the stresses around an elliptical hole in 1913, in the *Transactions of the Institution of Naval Architects*. A. A. Griffith, working at the Royal Aircraft Establishment, used it in his 1921 paper "The phenomena of rupture and flow in solids" (*Philosophical Transactions of the Royal Society A*) to explain the strength of glass by an energy balance. After the wartime ship fractures, G. R. Irwin at the US Naval Research Laboratory and E. Orowan extended Griffith's idea to metals in the late 1940s, and Irwin's 1957 paper in the *Journal of Applied Mechanics* introduced the stress intensity factor. P. C. Paris and F. Erdogan's 1963 paper established the power-law correlation of fatigue crack growth with $\Delta K$. A. A. Wells proposed the crack-tip opening displacement in 1961, and J. R. Rice introduced the J-integral in 1968. The Comet accidents of 1954 and the investigations that followed — including full-scale pressure testing of a fuselage — made fatigue and fracture of pressurised structures a central concern of aircraft design.
:::

::: quiz
A centre crack in a wide plate doubles in length. By what factor does the fracture stress change?
- [ ] It halves.
- [x] It falls by a factor of $\sqrt2$.
- [ ] It falls by a factor of 4.
::: solution
$\sigma_f = K_{Ic}/\sqrt{\pi a} \propto a^{-1/2}$, so doubling $a$ divides $\sigma_f$ by $\sqrt2 \approx 1.41$.
:::
:::

::: quiz
Which statement about the plane-strain fracture toughness $K_{Ic}$ is correct?
- [ ] It increases with specimen thickness without limit.
- [x] It is the lower-bound toughness reached when the specimen is thick enough for plane strain at the crack tip.
- [ ] It is the same as the yield strength multiplied by $\sqrt{\text{thickness}}$.
::: solution
Apparent toughness falls with increasing thickness and levels off at $K_{Ic}$ once constraint is high; ASTM E399 ensures this by requiring $B \ge 2.5(K_{Ic}/\sigma_Y)^2$.
:::
:::

::: summary
- Stress-based criteria fail for cracks: the tip stress is unbounded (Inglis: $1 + 2\sqrt{a/\rho}$).
- Griffith: a crack grows when the energy release rate $G = -\frac1B\,d\Pi/da$ reaches $G_c$; for a centre crack $G = \pi\sigma^2a/E'$. Compliance: $G = \frac{P^2}{2B}\frac{dC}{da}$.
- Irwin: the near-tip field is $K/\sqrt{2\pi r}$ times a universal angular function; $K = Y\sigma\sqrt{\pi a}$; $G = K^2/E'$. Fracture when $K = K_{Ic}$.
- Critical crack size $a_c = \frac1\pi(K_{Ic}/Y\sigma)^2$: high-strength materials tolerate much smaller cracks.
- LEFM is valid when the plastic zone $\sim\frac1\pi(K/\sigma_Y)^2$ is small; E399 requires $B, a, W - a \ge 2.5(K_{Ic}/\sigma_Y)^2$. Otherwise use CTOD or $J$.
- Fatigue cracks grow as $da/dN = C(\Delta K)^m$; the life is controlled by the initial crack size. Damage-tolerant design sets inspection intervals from this.
:::

## Exercises

::: exercise Energy release rate {level=1 check="2"}
A steel component ($E = 200\ \mathrm{GPa}$) in plane stress has a crack with $K_I = 20\ \mathrm{MPa\sqrt m}$. Find the energy release rate. (Enter $G$ in kJ/m².)
::: solution
$G = K^2/E = (20\times10^{6})^2/(200\times10^{9}) = 2000\ \mathrm{J/m^2} = 2\ \mathrm{kJ/m^2}$.
:::
:::

::: exercise Elliptical hole {level=1 check="21"}
An elliptical hole in a wide plate has semi-axes $a = 10\ \mathrm{mm}$ (perpendicular to the load) and $b = 1\ \mathrm{mm}$. Find the stress concentration factor. (Enter $K_t$.)
::: solution
$K_t = 1 + 2a/b = 1 + 20 = 21$.
:::
:::

::: exercise Toughness test thickness {level=1 check="25"}
A steel has $K_{Ic} = 50\ \mathrm{MPa\sqrt m}$ and $\sigma_Y = 500\ \mathrm{MPa}$. What minimum specimen thickness does ASTM E399 require? (Enter it in mm.)
::: solution
$B \ge 2.5(K_{Ic}/\sigma_Y)^2 = 2.5\times(0.1)^2 = 0.025\ \mathrm{m} = 25\ \mathrm{mm}$.
:::
:::

::: exercise Scaling of the critical crack {level=2 check="8"}
A plate fractures at $400\ \mathrm{MPa}$ when it contains a crack of half-length $2\ \mathrm{mm}$. At what half-length will it fracture at $200\ \mathrm{MPa}$, if $Y$ is unchanged? (Enter it in mm.)
::: solution
$\sigma_f\sqrt a$ is constant, so $a_2 = a_1(\sigma_1/\sigma_2)^2 = 2\times4 = 8\ \mathrm{mm}$.
:::
:::

::: exercise Effect of stress range on fatigue life {level=2 check="16"}
An aluminium alloy obeys the Paris law with $m = 4$. If the stress range is halved (all else unchanged), by what factor does the crack-growth life increase? (Enter the factor.)
::: solution
$N \propto (\Delta\sigma)^{-m}$ for fixed initial and final crack sizes (the final size changes too if $\sigma_{\max}$ changes, but the life is insensitive to it). Halving $\Delta\sigma$ multiplies the life by $2^4 = 16$.
:::
:::

::: exercise Critical crack in a pressurised cylinder {level=2}
A thin-walled steel pipe of mean radius $500\ \mathrm{mm}$ and wall thickness $20\ \mathrm{mm}$ carries an internal pressure of $8\ \mathrm{MPa}$. The steel has $K_{Ic} = 120\ \mathrm{MPa\sqrt m}$ and $\sigma_Y = 450\ \mathrm{MPa}$. Treating a long axial through-wall crack as a centre crack in a flat plate under the hoop stress ($Y = 1$, ignoring the bulging correction), find the critical crack length $2a_c$. Does the pipe leak before it breaks?
::: solution
Hoop stress $\sigma = pr/t = 8\times500/20 = 200\ \mathrm{MPa}$. $a_c = \frac1\pi(120/200)^2 = 0.115\ \mathrm{m}$, so $2a_c = 229\ \mathrm{mm}$. A through-wall crack only $20\ \mathrm{mm}$ long (the wall thickness) already leaks, and is ten times shorter than critical; a surface crack would penetrate the wall and leak long before reaching critical length — leak-before-break is plausible. Real assessments include the **bulging (Folias) factor**, which raises $K$ for axial cracks in curved shells (by a factor of about $\sqrt{1 + 1.61a^2/rt}$, which here is $1.8$ at $a = 115\ \mathrm{mm}$, so the true critical length is much shorter and must be found by iteration), and check that the leak rate is detectable.
:::
:::

::: exercise Griffith's energy balance {level=3}
(a) Starting from the energy $U(a) = -\pi\sigma^2a^2B/E + 4a\gamma_sB$ for a plate with a crack of length $2a$, show that the crack is in (unstable) equilibrium at $\sigma = \sqrt{2E\gamma_s/\pi a}$. (b) Show that, under fixed grip (fixed displacement) conditions in a finite plate, the crack can be stable, and explain physically why. (c) Use the DCB result of [[#ex-dcb]] to show that $G$ falls with $a$ at fixed opening $\delta$.
::: solution
(a) $dU/da = -2\pi\sigma^2aB/E + 4\gamma_sB = 0$ gives $\sigma^2 = 2E\gamma_s/(\pi a)$. $d^2U/da^2 = -2\pi\sigma^2B/E < 0$: a maximum, so unstable — any growth lowers the energy further.
(b) Under fixed grips, crack growth reduces the load, because the compliance rises while the displacement is held. $G = \frac{\delta^2}{2BC^2}\frac{dC}{da}$ can decrease with $a$ if $C$ grows fast enough, in which case $dG/da < 0 = dG_c/da$ and growth stops after a small extension: the stored energy is finite and is consumed by the growth. Under fixed load the loading system supplies energy without limit.
(c) For the DCB, $C = 2a^3/3EI$ and $P = \delta/C$, so $G = \frac{P^2a^2}{BEI} = \frac{\delta^2}{C^2}\frac{a^2}{BEI} = \frac{9EI\delta^2}{4Ba^4}$, which falls as $a^{-4}$: stable growth in displacement control, which is why the DCB test can record a crack-growth resistance curve.
:::
:::

::: exercise Setting an inspection interval {level=3}
A welded steel bracket on a crane is subject to $2\times10^{5}$ load cycles a year with a stress range of $100\ \mathrm{MPa}$ and a maximum stress of $120\ \mathrm{MPa}$. Magnetic-particle inspection reliably finds surface cracks $3\ \mathrm{mm}$ deep. Take $Y = 1.12$, $K_{Ic} = 80\ \mathrm{MPa\sqrt m}$ at the lowest service temperature, and the Barsom–Rolfe constants for steel. (a) Find the critical crack depth and the crack-growth life from $3\ \mathrm{mm}$. (b) Propose an inspection interval and discuss what assumptions you would want to check before relying on it.
::: solution
(a) $a_c = \frac1\pi\left(\frac{80}{1.12\times120}\right)^2 = 0.113\ \mathrm{m}$ — larger than a real bracket, so in practice failure would come from net-section yielding or $Y$ growing with depth; take $a_f = 50\ \mathrm{mm}$ as a practical limit. $C(Y\Delta\sigma\sqrt\pi)^3 = 6.9\times10^{-12}\times(1.12\times100\times1.7725)^3 = 5.40\times10^{-5}$; $N = (0.003^{-1/2} - 0.05^{-1/2})/(0.5\times5.40\times10^{-5}) = (18.26 - 4.47)/2.70\times10^{-5} = 5.1\times10^{5}$ cycles, about **2.5 years**.
(b) A common rule is to inspect at no more than half the growth life, so that a crack missed once is caught at the next inspection: about every year, or more often. Assumptions to check: $Y$ for the real weld geometry (a weld toe adds a stress concentration that raises $\Delta K$ for small cracks), residual welding stresses (tensile residuals make the whole cycle effective, so use the full range as here), the actual load spectrum (occasional overloads, low-temperature toughness), the probability of detection of the inspection method at $3\ \mathrm{mm}$, environmental effects (corrosion fatigue increases $C$), and the consequences of failure. The assessment would be made to a recognised procedure such as BS 7910 by a qualified engineer.
:::
:::
