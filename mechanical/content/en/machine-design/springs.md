Press a ballpoint pen, close a car door, open an engine valve or lift the lid of a piano and a helical spring does the work: it deflects in proportion to the load, stores the work done on it as strain energy, and gives it back. Springs hold valves against their seats, keep clutch plates clamped, return pedals and levers, preload bearings, absorb shock in buffers and weigh loads in spring balances. They are among the most highly stressed parts in any machine — a good valve spring works at shear stresses above $500\ \mathrm{MPa}$ for hundreds of millions of cycles — and they are designed with a small, well-tested set of formulas that this chapter derives.

The key observation is simple. Pull or push on a helical spring along its axis and the wire is hardly stretched at all: every cross-section of the wire carries a **torque** $FD/2$, the axial force times the coil radius. A helical spring is a torsion bar wound into a helix. Its stiffness follows from the angle of twist of that bar ([[mechanics-of-materials/torsion]]), and its stress from the torsion formula, corrected for the direct shear and for the curvature of the wire. Fatigue ([[machine-design/fatigue]]) then decides the life of springs under repeated load, and two phenomena peculiar to long, slender, light coils — buckling and surge — set further limits.

Notation: $d$ wire diameter, $D$ mean coil diameter (to the wire centreline), $C = D/d$ the spring index, $N_a$ the number of active coils, $G$ the shear modulus, $F$ the axial force and $y$ (or $\delta$) the axial deflection. Forces in compression springs are taken positive in compression.

## Geometry of a helical compression spring

::: definition Spring index, active coils and lengths {#def-geometry}
For a helical spring wound from round wire of diameter $d$ on a mean diameter $D$:
- the **spring index** is $C = D/d$; the outside diameter is $D + d$ and the inside diameter $D - d$;
- the **pitch** $p$ is the axial distance between adjacent coils, and the **helix angle** $\lambda$ satisfies $\tan\lambda = p/(\pi D)$;
- the **total coils** $N_t$ include the end coils; the **active coils** $N_a$ are those free to deflect, $N_t = N_a + N_e$ where $N_e$ is the number of inactive end coils;
- the **free length** $L_0$ is the unloaded length, and the **solid length** $L_s$ the length with all coils touching;
- the **spring rate** (stiffness) is $k = dF/dy$, constant for an ideal helical spring.
:::

The ends decide how many coils are inactive and how the length is measured. The four standard end forms are listed below, as tabulated in Budynas and Nisbett, *Shigley's Mechanical Engineering Design*, Table 10-1. "Squared" (closed) ends have the last coil wound with zero pitch so that it sits flat; "ground" ends are also ground flat, which removes part of the end coil so that the spring stands square on a plate.

| end form | end coils $N_e$ | total coils $N_t$ | free length $L_0$ | solid length $L_s$ |
|---|---|---|---|---|
| plain | $0$ | $N_a$ | $pN_a + d$ | $d(N_t + 1)$ |
| plain and ground | $1$ | $N_a + 1$ | $p(N_a + 1)$ | $dN_t$ |
| squared (closed) | $2$ | $N_a + 2$ | $pN_a + 3d$ | $d(N_t + 1)$ |
| squared and ground | $2$ | $N_a + 2$ | $pN_a + 2d$ | $dN_t$ |

Squared-and-ground ends are the usual choice for compression springs that must apply a well-centred force; plain ends are cheaper but the force acts off-centre and the spring tends to bow. These counts are idealisations: the real number of active coils depends on how the end coil seats and is often found by measuring the rate of a prototype.

## Deflection and spring rate

::: proposition Deflection of a close-coiled helical spring {#prop-deflection}
A helical spring with small helix angle, wire diameter $d$, mean coil diameter $D$ and $N_a$ active coils, made of a linear-elastic material with shear modulus $G$, deflects under an axial force $F$ by
$$
y = \frac{8FD^3N_a}{Gd^4},
$$ {#eq-deflection}
so its rate is
$$
k = \frac{F}{y} = \frac{d^4G}{8D^3N_a}.
$$ {#eq-rate}
Including the small contribution of the direct shear force in the wire, the deflection is $y = \dfrac{8FD^3N_a}{Gd^4}\left(1 + \dfrac{1}{2C^2}\right)$.
:::

::: proof
**Assumptions.** The helix angle is small (below about $10°$), so each coil lies almost in a plane perpendicular to the spring axis and the wire may be treated as a straight bar of length $L = \pi DN_a$ in pure torsion; the load acts along the spring axis; the material is linear-elastic; plane sections of the wire remain plane; the curvature of the wire, which redistributes stress (next section), has a negligible effect on the overall twist.

**Internal loads.** Cut the spring at any point of the wire and keep one end. The free-body diagram of the end part shows the applied force $F$ along the spring axis and, on the cut face, the internal actions that balance it: a shear force $F$ (parallel to the axis, at the wire centre, a distance $D/2$ from the axis) and a couple. Moments about the wire centre give the couple: a torque about the wire's own axis,
$$
T = F\frac{D}{2}.
$$
The torque is the same at every section, so the wire is in uniform torsion.

**Twist.** By the torsion formula, an element $ds$ of wire twists by $d\varphi = T\,ds/(GJ)$, with $J = \pi d^4/32$. The total angle of twist along the active wire is
$$
\theta = \frac{TL}{GJ} = \frac{(FD/2)(\pi DN_a)}{G\,\pi d^4/32} = \frac{16FD^2N_a}{Gd^4}.
$$

**From twist to axial deflection.** When an element $ds$ twists by $d\varphi$, the whole of the spring beyond it turns rigidly through $d\varphi$ about the tangent to the wire at the element. With a small helix angle that tangent is perpendicular to the spring axis, and the load line is at distance $D/2$ from it, so the load point moves along the axis by $dy = (D/2)\,d\varphi$. Adding the contributions of all elements,
$$
y = \frac{D}{2}\,\theta = \frac{D}{2}\cdot\frac{16FD^2N_a}{Gd^4} = \frac{8FD^3N_a}{Gd^4},
$$
which is [[#eq-deflection]]; [[#eq-rate]] follows by dividing $F$ by $y$.

**Direct shear (Castigliano).** The same result follows from the strain energy. Torsion stores $U_T = T^2L/(2GJ)$, and the transverse shear force $F$ stores approximately $U_V = F^2L/(2AG)$ with $A = \pi d^2/4$. By Castigliano's theorem ([[solid-mechanics/energy-methods]]),
$$
y = \frac{\partial (U_T + U_V)}{\partial F} = \frac{FD^2L}{4GJ} + \frac{FL}{AG} = \frac{8FD^3N_a}{Gd^4} + \frac{4FDN_a}{Gd^2} = \frac{8FD^3N_a}{Gd^4}\left(1 + \frac{1}{2C^2}\right).
$$
For $C = 6$ the bracket is $1.014$, so the direct-shear term is usually dropped.
:::

Three features of [[#eq-rate]] guide every design. The rate rises as $d^4$, so a small change in wire size changes the rate a lot; it falls as $D^3$; and it is inversely proportional to the number of active coils, so cutting a spring in half doubles its rate. The modulus is the shear modulus: about $79$–$82\ \mathrm{GPa}$ for spring steels (Budynas and Nisbett, Table 10-5), $69\ \mathrm{GPa}$ for 302 stainless and roughly $40$–$45\ \mathrm{GPa}$ for phosphor bronze and beryllium copper.

Springs combine like other elastic elements. Springs **in parallel** (side by side, or nested one inside another, as in many engine valve springs) share the deflection, so their rates add: $k = k_1 + k_2$. Springs **in series** (end to end) share the force, so their compliances add: $1/k = 1/k_1 + 1/k_2$.

::: example Rate, deflection and stress of a small spring {#ex-rate}
A compression spring is wound from $d = 2.5\ \mathrm{mm}$ steel wire on a mean diameter $D = 20\ \mathrm{mm}$ and has $N_a = 10$ active coils; take $G = 80\ \mathrm{GPa}$. Find the rate and the deflection under $F = 60\ \mathrm{N}$.
::: solution
**Rate.** Working in N and mm ($G = 80\,000\ \mathrm{N/mm^2}$):
$$
k = \frac{d^4G}{8D^3N_a} = \frac{2.5^4\times80\,000}{8\times20^3\times10} = \frac{39.0625\times80\,000}{640\,000} = 4.883\ \mathrm{N/mm}.
$$
**Deflection.** $y = F/k = 60/4.883 = 12.29\ \mathrm{mm}$.

**Direct-shear correction.** $C = 20/2.5 = 8$, so the bracket is $1 + 1/128 = 1.008$ and $y = 12.38\ \mathrm{mm}$ — less than 1 % more, well inside the scatter in $G$ and in the effective number of coils.

**Sanity check.** Doubling $d$ to $5\ \mathrm{mm}$ would multiply the rate by $16$; the units $\mathrm{mm^4\cdot (N/mm^2)/mm^3} = \mathrm{N/mm}$ are those of a rate. The stress in this spring is worked out in [[#ex-stress]].
:::
:::

## Stresses in the wire

The torque $T = FD/2$ produces the familiar torsional shear stress $16T/(\pi d^3) = 8FD/(\pi d^3)$ at the wire surface. Two effects modify it. The direct shear force $F$ adds a shear stress that is largest at the inside of the coil, where it acts in the same direction as the torsional stress. And the wire is curved: the fibres on the inside of the coil are shorter than those on the outside, so for the same angle of twist they are strained more. Both effects raise the stress at the **inner** surface of the coil, which is where helical springs crack.

::: proposition Shear stress with the direct-shear factor {#prop-ks}
Ignoring curvature, the maximum shear stress in the wire of a helical spring under axial force $F$ is
$$
\tau = K_s\frac{8FD}{\pi d^3}, \qquad K_s = 1 + \frac{0.5}{C}.
$$ {#eq-ks}
:::

::: proof
**Assumptions.** Straight-bar torsion theory for the torque, and the direct shear taken as uniformly distributed over the cross-section (an approximation; the exact shear distribution of a round section peaks at $4/3$ of the mean, which is part of what the curvature factors below account for).

At the inner surface of the coil the torsional shear stress $Tr/J$ and the direct shear $F/A$ act in the same direction, so they add:
$$
\tau = \frac{T(d/2)}{\pi d^4/32} + \frac{F}{\pi d^2/4} = \frac{8FD}{\pi d^3} + \frac{4F}{\pi d^2} = \frac{8FD}{\pi d^3}\left(1 + \frac{d}{2D}\right) = \frac{8FD}{\pi d^3}\left(1 + \frac{0.5}{C}\right).
$$
:::

The curvature correction cannot be found from straight-bar theory. A. M. Wahl, analysing the curved wire as a portion of a ring in torsion, obtained a factor that includes both the direct shear and the curvature; M. Bergsträsser proposed a simpler expression that agrees with it within about 1 % over the practical range. Both are approximations to the exact elasticity solution:
$$
K_W = \frac{4C - 1}{4C - 4} + \frac{0.615}{C} \quad \text{(Wahl)}, \qquad K_B = \frac{4C + 2}{4C - 3} \quad \text{(Bergsträsser)},
$$ {#eq-wahl}
and the maximum shear stress at the inner surface is
$$
\tau = K_B\frac{8FD}{\pi d^3} \quad (\text{or } K_W \text{ in place of } K_B).
$$ {#eq-tau}
Budynas and Nisbett use $K_B$; many spring handbooks and EN 13906-1 (helical compression springs, European standard) use a factor of the Wahl or Bergsträsser type. The ratio $K_B/K_s$ is the pure curvature effect, sometimes written $K_c$.

::: widget plot
f: 1 + 0.5/x; (4*x - 1)/(4*x - 4) + 0.615/x; (4*x + 2)/(4*x - 3)
x: 3, 16
y: 1, 1.6
labels: K_s = 1 + 0.5/C; K_W\ \text{(Wahl)}; K_B\ \text{(Bergsträsser)}
vlines: 4; 12
caption: Stress-correction factors against the spring index $C = D/d$. The vertical lines mark the usual design range $4 \le C \le 12$. At $C = 4$ curvature adds about 23 % to the direct-shear factor ($K_B = 1.385$ against $K_s = 1.125$); at $C = 12$ only about 7 %. The Wahl and Bergsträsser curves are almost indistinguishable — follow them down to $C = 3$ to see them separate. Tightly wound springs (small $C$) are hard to make and are highly stressed on the inside of the coil; very open ones (large $C$) tangle and buckle.
:::

::: example Stress in the spring of the first example {#ex-stress}
For the spring of [[#ex-rate]] ($d = 2.5\ \mathrm{mm}$, $D = 20\ \mathrm{mm}$, $C = 8$) under $F = 60\ \mathrm{N}$, compare the stress predicted with no correction, with $K_s$, with $K_W$ and with $K_B$.
::: solution
The uncorrected torsional stress is
$$
\frac{8FD}{\pi d^3} = \frac{8\times60\times20}{\pi\times2.5^3} = \frac{9600}{49.09} = 195.6\ \mathrm{MPa}.
$$
With $C = 8$: $K_s = 1.0625$, $K_W = \tfrac{31}{28} + \tfrac{0.615}{8} = 1.1840$, $K_B = \tfrac{34}{29} = 1.1724$. The corrected stresses are $207.8$, $231.6$ and $229.3\ \mathrm{MPa}$.

**Comment.** Neglecting curvature would understate the stress at the inner fibre by about 10 %; the two curvature factors differ by 1 %. For static loading with set removal some designers use only $K_s$, on the argument that local yielding at the inner fibre redistributes stress; for fatigue the full factor is always used.
:::
:::

::: warning Common slips in spring calculations
- Using the **outside** diameter for $D$. The formulas use the mean diameter, $D = OD - d$; with $C = 6$, using the outside diameter overstates the deflection by $(7/6)^3 = 1.59$.
- Using the **total** coils in the rate formula. Only active coils deflect; the end coils of a squared spring are dead.
- Applying $K_B$ twice: once in the stress and again as a fatigue stress-concentration factor. The curvature factor *is* the stress concentration of the spring.
- Forgetting that $d$ enters to the fourth power in the rate and third in the stress: a tolerance of $\pm1\%$ on the wire diameter gives about $\pm4\%$ on the rate.
- Mixing units: with $F$ in N and lengths in mm, stresses come out in $\mathrm{N/mm^2} = \mathrm{MPa}$ and $G$ must be in MPa.
:::

## Spring materials

Most springs are cold-drawn steel wire. Drawing a wire through successively smaller dies cold-works it and orients its microstructure; the result is a tensile strength that rises steeply as the wire gets thinner. Budynas and Nisbett (Table 10-4, from spring-industry data) fit the minimum tensile strength by
$$
S_{ut} = \frac{A}{d^m},
$$ {#eq-sut}
with $d$ in mm and $S_{ut}$ in MPa. Some of their constants:

| material | typical use | $m$ | $A$ ($\mathrm{MPa\cdot mm^m}$) |
|---|---|---|---|
| music wire (ASTM A228) | best high-carbon wire for small springs | $0.145$ | $2211$ |
| oil-tempered wire (A229) | general-purpose, larger sizes | $0.187$ | $1855$ |
| hard-drawn wire (A227) | cheapest, low duty | $0.190$ | $1783$ |
| chrome–vanadium (A232) | shock and fatigue loads | $0.168$ | $2005$ |
| chrome–silicon (A401) | high stress, valve springs | $0.108$ | $1974$ |

Each fit is valid only over a stated range of diameters (for music wire, roughly $0.1$–$6.5\ \mathrm{mm}$); outside it, use the supplier's data. Spring wire specified to European standards (EN 10270) has similar strength classes.

Springs fail in shear, so the design needs the torsional strengths. Budynas and Nisbett (Table 10-6) give the torsional yield strength of compression springs as a fraction of $S_{ut}$:
$$
S_{sy} \ge 0.45\,S_{ut} \quad \text{(music wire and cold-drawn carbon steel, set not removed)},
$$ {#eq-ssy}
$0.50\,S_{ut}$ for hardened and tempered carbon and low-alloy steels, and $0.60$–$0.75\,S_{ut}$ when the spring has been **set** (preset): compressed beyond yield after manufacture, which leaves favourable residual stresses and a slightly shorter spring. The torsional ultimate strength used in fatigue is estimated as $S_{su} = 0.67\,S_{ut}$.

## Designing for static load

A compression spring must do three things under static or slowly varying load: give the required force at the working length, not yield even when closed solid (because sooner or later someone will compress it solid), and not buckle.

**Clash allowance.** The working deflection should stop short of solid. Budynas and Nisbett recommend a **fractional overrun to closure** $\xi \ge 0.15$: the deflection from free to solid is at least $1.15$ times the maximum working deflection, so that the coils do not clash in service.

**Solid safety factor.** The stress at solid length, $\tau_s = K_B\,8F_sD/(\pi d^3)$ with $F_s = k(L_0 - L_s)$, should satisfy $n_s = S_{sy}/\tau_s \ge 1.2$.

**Proportions.** The same source recommends $4 \le C \le 12$ and $3 \le N_a \le 15$. Below $C = 4$ the wire is hard to coil and the curvature stress is high; above $12$ springs tangle in bulk handling. Too few coils make the end effects dominant; too many make the spring prone to buckling and surge.

**Buckling.** A long compression spring loaded between plates can bow sideways like a column. A spring of free length $L_0$ is absolutely stable (it cannot buckle at any deflection) if
$$
L_0 < \frac{\pi D}{\alpha}\left[\frac{2(E - G)}{2G + E}\right]^{1/2},
$$ {#eq-buckle}
which for steel ($E = 207\ \mathrm{GPa}$, $G = 79.3\ \mathrm{GPa}$) is $L_0 < 2.63\,D/\alpha$. The end-condition constant is $\alpha = 0.5$ for a spring between flat, parallel plates (fixed ends), $0.707$ for one fixed and one pivoted end, $1$ for both ends pivoted and $2$ for one end clamped and the other free (Budynas and Nisbett, §10-7). This criterion is quoted rather than derived: it is the stability limit of a coil spring treated as a column with bending, shear and axial compliance (the theory of Haringx and Wahl), and the constant $2.63$ comes from evaluating the bracket for steel: $2(207 - 79.3)/(2\times79.3 + 207) = 0.699$, whose square root is $0.836$, and $\pi\times0.836 = 2.63$. The form of the result is a column result: longer and more slender springs and freer ends (larger $\alpha$, as for the effective-length factor of an Euler column in [[mechanics-of-materials/buckling]]) are less stable. Springs that exceed the limit can still be used if guided by a rod inside or a tube outside, at the cost of friction and wear.

The usual design procedure fixes as many quantities as possible from the function (forces, deflections, space) and searches over the remaining free choice — usually the wire diameter.

::: algorithm Static design of a helical compression spring {#alg-static}
1. From the function, fix the maximum working force $F_{\max}$, the required rate $k$ (or two force–length pairs) and the space: maximum outside diameter, minimum inside diameter (over a rod), available length.
2. Choose a material and end form. Choose a trial mean diameter $D$ that fits the space.
3. For a trial standard wire size $d$: compute $C = D/d$, $K_B$, $S_{ut}$ from [[#eq-sut]] and $S_{sy}$ from [[#eq-ssy]].
4. Set the solid force from the overrun, $F_s = (1 + \xi)F_{\max}$, compute $\tau_s$ from [[#eq-tau]] and $n_s = S_{sy}/\tau_s$.
5. Compute $N_a = d^4G/(8D^3k)$ from [[#eq-rate]]; round to a practical value (often to a half coil) and recompute $k$.
6. Compute $N_t$, the solid length $L_s$, the free length $L_0 = L_s + (1 + \xi)F_{\max}/k$ and check buckling with [[#eq-buckle]].
7. Accept the design if $4 \le C \le 12$, $3 \le N_a \le 15$, $n_s \ge 1.2$, the spring fits and it is stable; otherwise change $d$ (or $D$) and repeat. Among acceptable designs choose by cost, mass or size.
:::

::: example Designing a return spring {#ex-design}
A spring of squared-and-ground music wire must exert $F_{\max} = 250\ \mathrm{N}$ at its working deflection and have a rate close to $5\ \mathrm{N/mm}$. It works between flat, parallel plates in a bore of $32\ \mathrm{mm}$ diameter. Use $D = 25\ \mathrm{mm}$, $G = 80\ \mathrm{GPa}$, $\xi = 0.15$ and the criteria of [[#alg-static]].
::: solution
**Trial wire sizes.** With $F_s = 1.15\times250 = 287.5\ \mathrm{N}$, for each wire size:

| $d$ (mm) | $C$ | $S_{ut}$ (MPa) | $S_{sy}$ (MPa) | $\tau_s$ (MPa) | $n_s$ | $N_a$ for $k = 5$ |
|---|---|---|---|---|---|---|
| $3.0$ | $8.33$ | $1885$ | $848$ | $790$ | $1.07$ | $10.4$ |
| $3.2$ | $7.81$ | $1868$ | $840$ | $657$ | $1.28$ | $13.4$ |
| $3.5$ | $7.14$ | $1844$ | $830$ | $510$ | $1.63$ | $19.2$ |

$3.0\ \mathrm{mm}$ fails the solid check; $3.5\ \mathrm{mm}$ needs too many coils. Take $d = 3.2\ \mathrm{mm}$. In detail: $S_{ut} = 2211/3.2^{0.145} = 1868\ \mathrm{MPa}$, $S_{sy} = 0.45\times1868 = 840.5\ \mathrm{MPa}$; $K_B = (4\times7.8125 + 2)/(4\times7.8125 - 3) = 1.177$;
$$
\tau_s = 1.177\times\frac{8\times287.5\times25}{\pi\times3.2^3} = 657\ \mathrm{MPa}, \qquad n_s = \frac{840.5}{657} = 1.28.
$$
**Coils.** $N_a = 3.2^4\times80\,000/(8\times25^3\times5) = 13.4$; take $N_a = 13.5$, giving $k = 4.97\ \mathrm{N/mm}$.

**Lengths.** $N_t = 15.5$, $L_s = dN_t = 3.2\times15.5 = 49.6\ \mathrm{mm}$. Working deflection $y_{\max} = 250/4.97 = 50.3\ \mathrm{mm}$, deflection to solid $1.15\times50.3 = 57.8\ \mathrm{mm}$, so $L_0 = 49.6 + 57.8 = 107.4\ \mathrm{mm}$.

**Buckling.** Between parallel plates $\alpha = 0.5$: limit $2.63\times25/0.5 = 131.5\ \mathrm{mm} > 107.4\ \mathrm{mm}$, stable.

**Fit.** Outside diameter $25 + 3.2 = 28.2\ \mathrm{mm}$; a compression spring's diameter grows slightly as it is compressed, and the $3.8\ \mathrm{mm}$ diametral clearance in the $32\ \mathrm{mm}$ bore is ample.

**Check.** All criteria pass: $C = 7.8$, $N_a = 13.5$, $n_s = 1.28$. The spring mass is about $67\ \mathrm{g}$ ([[#ex-fatigue]]). A cheaper hard-drawn wire would need a larger diameter, since its $A$ is 19 % lower.
:::
:::

## Fatigue of springs

Springs in engines, pumps, switches and suspensions are loaded repeatedly, almost always between two compressive forces $F_{\min}$ and $F_{\max}$ — a spring is never reversed. The alternating and mean forces are
$$
F_a = \frac{F_{\max} - F_{\min}}{2}, \qquad F_m = \frac{F_{\max} + F_{\min}}{2},
$$
and since stress is proportional to force, $\tau_a = K_B\,8F_aD/(\pi d^3)$ and $\tau_m = K_B\,8F_mD/(\pi d^3)$, with the same factor $K_B$ in both (the convention of Budynas and Nisbett).

Spring wire is tested in its finished state, so the general Marin-factor approach of [[machine-design/fatigue]] is replaced by direct test data. F. P. Zimmerli of the Associated Spring Corporation reported (1957) that for steel spring wires under about $10\ \mathrm{mm}$ diameter the infinite-life torsional strength is essentially independent of the material and of the tensile strength,. As quoted by Budynas and Nisbett, the endurance-strength components are
$$
\text{unpeened: } S_{sa} = 241\ \mathrm{MPa},\ S_{sm} = 379\ \mathrm{MPa}; \qquad \text{shot-peened: } S_{sa} = 398\ \mathrm{MPa},\ S_{sm} = 534\ \mathrm{MPa}.
$$ {#eq-zimmerli}
Each pair is a single point on the $\tau_m$–$\tau_a$ fatigue diagram: for unpeened wire, a stress cycle between $379 - 241 = 138\ \mathrm{MPa}$ and $379 + 241 = 620\ \mathrm{MPa}$ that the springs survived indefinitely. The corrected curvature factor is already in the measured stresses, so no further stress concentration factor is applied.

To use the point for other stress ratios, draw a failure line through it and through the torsional ultimate strength $S_{su} = 0.67S_{ut}$ on the mean-stress axis. Extending that line back to $\tau_m = 0$ gives the fully reversed torsional endurance strength
$$
S_{se} = \frac{S_{sa}}{1 - S_{sm}/S_{su}} \quad\text{(Goodman)}, \qquad S_{se} = \frac{S_{sa}}{1 - (S_{sm}/S_{su})^2} \quad\text{(Gerber)},
$$ {#eq-sse}
and the fatigue factor of safety on the load line through the origin (both forces scaled by $n_f$) is
$$
\frac{1}{n_f} = \frac{\tau_a}{S_{se}} + \frac{\tau_m}{S_{su}} \quad\text{(Goodman)}, \qquad n_f = \frac12\left(\frac{S_{su}}{\tau_m}\right)^2\frac{\tau_a}{S_{se}}\left[-1 + \sqrt{1 + \left(\frac{2\tau_mS_{se}}{S_{su}\tau_a}\right)^2}\right] \quad\text{(Gerber)}.
$$ {#eq-nf}
The Gerber parabola fits spring-fatigue data better; the Goodman line is more conservative. A separate check against yield at the peak stress, $n_y = S_{sy}/(\tau_a + \tau_m)$, completes the analysis.

::: widget plot
f: (241/(1 - 379/s))*(1 - x/s); (241/(1 - (379/s)^2))*(1 - (x/s)^2); r*x
x: 0, 1700
y: 0, 700
sliders: s=1250:900:1500:10, r=0.43:0.1:1.5:0.01
points: 379,241
labels: \text{Goodman line}; \text{Gerber parabola}; \text{load line } \tau_a = r\,\tau_m
caption: Spring fatigue diagram, alternating against mean shear stress in MPa, for unpeened steel wire. The marked point is Zimmerli's endurance data $(S_{sm}, S_{sa}) = (379, 241)\ \mathrm{MPa}$; both failure curves pass through it and reach the mean-stress axis at $S_{su}$ (slider $s$). The straight line from the origin is the load line of a spring with $\tau_a/\tau_m = r$; the spring of [[#ex-fatigue]] has $r = 0.43$ and $S_{su} \approx 1250\ \mathrm{MPa}$. Where the load line meets a failure curve gives the stresses at infinite life; the factor of safety is the ratio of that distance from the origin to the working point's. Notice how little the endurance intercept $S_{se}$ changes with $S_{su}$ — stronger wire buys static strength, not much fatigue strength.
:::

::: example Fatigue check and surge of the return spring {#ex-fatigue}
The spring designed in [[#ex-design]] ($d = 3.2\ \mathrm{mm}$, $D = 25\ \mathrm{mm}$, $N_a = 13.5$, $k = 4.97\ \mathrm{N/mm}$, music wire, unpeened) works between $F_{\min} = 100\ \mathrm{N}$ and $F_{\max} = 250\ \mathrm{N}$. Find the fatigue factor of safety by Goodman and by Gerber, check yield at $F_{\max}$, and find the first surge frequency ($\rho = 7850\ \mathrm{kg/m^3}$).
::: solution
**Stresses.** $F_a = 75\ \mathrm{N}$, $F_m = 175\ \mathrm{N}$; $K_B = 1.177$ and $8D/(\pi d^3) = 8\times25/(\pi\times32.77) = 1.943\ \mathrm{mm^{-2}}$:
$$
\tau_a = 1.177\times1.943\times75 = 171.5\ \mathrm{MPa}, \qquad \tau_m = 1.177\times1.943\times175 = 400.2\ \mathrm{MPa}.
$$
**Strengths.** $S_{ut} = 1868\ \mathrm{MPa}$, $S_{su} = 0.67\times1868 = 1251\ \mathrm{MPa}$. From [[#eq-sse]]: Goodman $S_{se} = 241/(1 - 379/1251) = 345.7\ \mathrm{MPa}$; Gerber $S_{se} = 241/(1 - 0.3029^2) = 265.3\ \mathrm{MPa}$.

**Factors of safety.** Goodman: $1/n_f = 171.5/345.7 + 400.2/1251 = 0.496 + 0.320 = 0.816$, $n_f = 1.23$. Gerber, from [[#eq-nf]] with $2\tau_mS_{se}/(S_{su}\tau_a) = 0.990$: $n_f = 1.29$.

**Yield.** $\tau_{\max} = 171.5 + 400.2 = 571.7\ \mathrm{MPa}$, $n_y = 840.5/571.7 = 1.47$.

**Surge.** Active wire mass $m = \rho\,(\pi d^2/4)(\pi DN_a) = 7850\times\tfrac{\pi^2}{4}\times(3.2\times10^{-3})^2\times0.025\times13.5 = 0.0669\ \mathrm{kg}$. With both ends against plates, [[#prop-surge]] gives $f_1 = \tfrac12\sqrt{k/m} = \tfrac12\sqrt{4970/0.0669} = 136\ \mathrm{Hz}$.

**Judgement.** The spring will survive indefinitely with a modest margin ($1.23$ by Goodman). Shot peening would raise $n_f$ to about $1.9$. With the rule that the first surge frequency should be at least 15–20 times the operating frequency, the spring may cycle at up to about $7\ \mathrm{Hz}$ ($400$ cycles per minute) without surge.
:::
:::

## Surge

A spring is not a massless rate: its coils have mass, and a sudden motion at one end travels along the spring as a compression wave. If the motion of the end is periodic and one of its harmonics coincides with a natural frequency of the spring, the coils vibrate violently between the ends — **surge** — the forces at the ends fluctuate, the coils may clash and the stress far exceeds the static value. Engine valve springs, driven by the cam at many harmonics of the camshaft frequency, are the classical case.

::: proposition Natural frequencies of a helical spring {#prop-surge}
A helical spring of rate $k$ and active mass $m$, uniformly distributed along its length, has natural frequencies
$$
f_n = \frac{n}{2}\sqrt{\frac{k}{m}} \quad (n = 1, 2, \dots) \quad\text{with both ends fixed (between plates)},
$$ {#eq-surge}
and $f_n = \dfrac{2n - 1}{4}\sqrt{\dfrac{k}{m}}$ with one end fixed and the other free. The frequencies are in hertz when $k$ is in N/m and $m$ in kg.
:::

::: proof
**Assumptions.** The spring is modelled as a uniform elastic rod in axial motion: its length $l$, mass per unit length $m/l$ and axial stiffness $EA_\text{eq}$ chosen so that a length $l$ has rate $k$, i.e. $EA_\text{eq} = kl$. Coil clash, damping and the variation of active coils with deflection are ignored.

Let $u(x, t)$ be the axial displacement of the coil at position $x$. A short segment $dx$ has mass $(m/l)\,dx$ and the force in the spring at $x$ is $kl\,\partial u/\partial x$. Newton's second law for the segment gives the wave equation
$$
\frac{m}{l}\frac{\partial^2u}{\partial t^2} = kl\frac{\partial^2u}{\partial x^2} \quad\Longrightarrow\quad \frac{\partial^2u}{\partial t^2} = c^2\frac{\partial^2u}{\partial x^2}, \qquad c = l\sqrt{\frac{k}{m}}.
$$
With both ends fixed, $u(0, t) = u(l, t) = 0$, the separated solutions are $u = \sin(n\pi x/l)\cos\omega_nt$ with $\omega_n = n\pi c/l = n\pi\sqrt{k/m}$, so $f_n = \omega_n/2\pi = (n/2)\sqrt{k/m}$. With one end free ($\partial u/\partial x = 0$ at $x = l$), the modes are $\sin[(2n - 1)\pi x/2l]$ and $f_n = \tfrac{2n - 1}{4}\sqrt{k/m}$. (The same wave equation and modes appear for a bar in [[vibrations/continuous-systems]].)
:::

The active mass of a round-wire spring is $m = \rho\,\dfrac{\pi^2d^2DN_a}{4}$. Budynas and Nisbett advise that the fundamental frequency be at least 15–20 times the frequency of the applied force, so that the significant harmonics of the forcing cannot excite it. When that is impossible, as in high-speed engines, designers use nested springs of different frequencies, variable-pitch (progressive) springs whose coils close progressively and change the frequency during the stroke, or friction dampers.

## Extension and torsion springs

**Extension springs** are close-wound so that adjacent coils press on each other: the spring carries an **initial tension** $F_i$ before it begins to extend, and the force–deflection line is $F = F_i + ky$. The body is analysed exactly like a compression spring; the hooks or loops at the ends are the weak points, where the wire is bent as well as twisted. With the hook bend radius $r_1$ and $C_1 = 2r_1/d$, the bending stress at the inside of the hook is $\sigma_A = F\left[(K)_A\dfrac{16D}{\pi d^3} + \dfrac{4}{\pi d^2}\right]$ with $(K)_A = \dfrac{4C_1^2 - C_1 - 1}{4C_1(C_1 - 1)}$, and the torsional stress at the side bend (radius $r_2$, $C_2 = 2r_2/d$) is $\tau_B = (K)_B\,8FD/(\pi d^3)$ with $(K)_B = (4C_2 - 1)/(4C_2 - 4)$ (Budynas and Nisbett, §10-11). The initial tension that can be wound in depends on the index; the preferred range of the initial torsional stress quoted there is
$$
\tau_i = \frac{231}{e^{0.105C}} \pm 6.9\left(4 - \frac{C - 3}{6.5}\right)\ \mathrm{MPa},
$$
about $77$–$122\ \mathrm{MPa}$ at $C = 8$. Extension springs have no solid length to stop overload, so a broken extension spring in a safety function (a door, a brake) must have a back-up.

**Helical torsion springs**, as in clothes pegs, hinges and starter recoils, are loaded by a moment $M$ about the coil axis. Now the wire is in **bending**, not torsion: the moment is the same at every section of the wire, so the wire is a beam in pure bending of length $L = \pi DN_a$. Its angle of rotation is $\theta = ML/(EI)$ with $I = \pi d^4/64$:
$$
\theta = \frac{64MDN_a}{Ed^4}\ \text{rad}, \qquad k' = \frac{M}{\theta} = \frac{d^4E}{64DN_a}.
$$ {#eq-torsion-spring}
Budynas and Nisbett replace $64$ by $10.8\times2\pi = 67.8$ (rate per radian) to allow for friction between the coils and the arbor, which measurements show. The bending stress at the inside of the coil is $\sigma = K_i\,32M/(\pi d^3)$ with $K_i = (4C^2 - C - 1)/[4C(C - 1)]$. A torsion spring should always be loaded in the direction that winds it up (reduces the coil diameter), because then the residual stresses from coiling oppose the working stress at the inner fibre.

::: application Valve springs and suspension springs
An automotive engine valve spring is a short, highly stressed chrome–silicon spring, shot-peened and often of oval or "beehive" (tapered) form to reduce the moving mass and raise the surge frequency; it has to keep the valve following the cam at the highest engine speed. A car's coil suspension spring is the opposite case: large ($d$ of $10$–$15\ \mathrm{mm}$), hot-wound from silicon–chromium or similar steels, peened and preset, and often variable-pitch or barrel-shaped to fit the space and to give a progressive rate. Both are designed with the formulas of this chapter, then verified by fatigue tests of real springs, because the residual stresses from coiling, setting and peening control their lives.
:::

::: history
Robert Hooke published his law of springs, *ut tensio, sic vis* ("as the extension, so the force"), in *Lectures de Potentia Restitutiva, or of Spring* (1678), using coiled wire springs among his examples. The modern design method for helical springs is largely the work of A. M. Wahl of Westinghouse, whose curvature correction factor and book *Mechanical Springs* (1944; second edition 1963) gave designers the stress formulas used in this chapter. F. P. Zimmerli's fatigue tests on spring wire, reported in 1957, showed that the endurance strength of small steel spring wire hardly depends on its tensile strength and supplied the data still quoted in textbooks. Today helical springs are designed to standards such as EN 13906 (in Europe) and the design handbooks of the spring industry; this chapter teaches the principles behind them, not a substitute for them.
:::

::: quiz
A spring is replaced by one with the same wire, the same number of active coils and a mean diameter 20 % larger. By what factor does its rate change?
- [ ] $1/1.2 = 0.83$
- [ ] $1/1.2^2 = 0.69$
- [x] $1/1.2^3 = 0.58$
- [ ] $1/1.2^4 = 0.48$
::: solution
$k = d^4G/(8D^3N_a)$, so $k \propto D^{-3}$ and $1/1.728 = 0.58$. The stress at a given force rises by $1.2$ times the change in $K_B$, which is slightly smaller at the larger index.
:::
:::

::: quiz
Where does a helical compression spring under fatigue loading usually crack, and why?
- [ ] At the outside of the coil, where the wire is longest.
- [x] At the inside of the coil, where the torsional and direct shear stresses add and the curvature raises the strain.
- [ ] At mid-coil height, where bending is largest.
- [ ] At the end coils, because they are inactive.
::: solution
At the inner fibre the direct shear adds to the torsional shear, and because the inner fibres of a curved bar are shorter they are strained more for the same twist. The factor $K_B$ accounts for both; the crack runs at about $45°$ to the wire axis, along a plane of maximum tensile stress.
:::
:::

::: summary
- A helical spring is a torsion bar: the wire carries torque $FD/2$ along a length $\pi DN_a$; from the twist, $y = 8FD^3N_a/(Gd^4)$ and $k = d^4G/(8D^3N_a)$ ([[#prop-deflection]]).
- The maximum shear stress is at the inner surface of the coil: $\tau = K_B\,8FD/(\pi d^3)$, with $K_B = (4C + 2)/(4C - 3)$ or Wahl's factor including direct shear and curvature; $K_s = 1 + 0.5/C$ includes only direct shear.
- Wire strength depends on size, $S_{ut} = A/d^m$; torsional yield about $0.45S_{ut}$ (set not removed), torsional ultimate $0.67S_{ut}$.
- Static design: overrun to solid $\xi \ge 0.15$, $n_s \ge 1.2$ at solid, $4 \le C \le 12$, $3 \le N_a \le 15$, and absolute stability $L_0 < 2.63D/\alpha$ for steel.
- Fatigue: Zimmerli's endurance data ($241/379\ \mathrm{MPa}$ unpeened, $398/534\ \mathrm{MPa}$ peened) with a Goodman or Gerber line to $S_{su}$.
- Surge: $f_1 = \tfrac12\sqrt{k/m}$ between plates; keep it 15–20 times above the forcing frequency.
- Extension springs: initial tension and hook stresses; torsion springs: the wire is in bending, $k' = d^4E/(64DN_a)$ ideal.
:::

## Exercises

::: exercise Spring rate {level=1 check="7.8125"}
A compression spring has $d = 4\ \mathrm{mm}$, $D = 32\ \mathrm{mm}$, $N_a = 10$ and $G = 80\ \mathrm{GPa}$. Find its rate. (Enter the rate in N/mm.)
::: solution
$k = d^4G/(8D^3N_a) = 256\times80\,000/(8\times32\,768\times10) = 20\,480\,000/2\,621\,440 = 7.8125\ \mathrm{N/mm}$. Note $C = 8$, as in [[#ex-rate]]: scaling $d$ and $D$ together by a factor $s$ scales the rate by $s$ (here $1.6\times4.883 = 7.81$).
:::
:::

::: exercise Curvature factor {level=1 check="1.2"}
A spring is wound from $3\ \mathrm{mm}$ wire on a mean diameter of $21\ \mathrm{mm}$. Find the Bergsträsser factor $K_B$, and then the maximum shear stress under $F = 100\ \mathrm{N}$. (Enter $K_B$.)
::: solution
$C = 7$ and $K_B = (4\times7 + 2)/(4\times7 - 3) = 30/25 = 1.2$. Then $\tau = 1.2\times8\times100\times21/(\pi\times27) = 1.2\times198.1 = 237.7\ \mathrm{MPa}$. Wahl's factor gives $K_W = 27/24 + 0.615/7 = 1.2129$, about 1 % higher.
:::
:::

::: exercise Springs in series {level=1 check="2"}
Two compression springs of rates $6\ \mathrm{N/mm}$ and $3\ \mathrm{N/mm}$ are stacked end to end with a guide between them. Find the rate of the combination. (Enter the rate in N/mm.)
::: solution
In series the force is common and the deflections add: $1/k = 1/6 + 1/3 = 1/2$, so $k = 2\ \mathrm{N/mm}$. If instead they were nested and loaded side by side the rates would add, $9\ \mathrm{N/mm}$.
:::
:::

::: exercise Free and solid lengths {level=2 check="86"}
A squared-and-ground compression spring has $d = 3\ \mathrm{mm}$, $N_a = 10$ and a pitch of $8\ \mathrm{mm}$. Find the free length and the solid length. (Enter the free length in mm.)
::: solution
From the end-form table: $L_0 = pN_a + 2d = 80 + 6 = 86\ \mathrm{mm}$; $N_t = N_a + 2 = 12$, $L_s = dN_t = 36\ \mathrm{mm}$. The deflection from free to solid is $50\ \mathrm{mm}$; with $\xi = 0.15$ the maximum working deflection is $50/1.15 = 43.5\ \mathrm{mm}$.
:::
:::

::: exercise Buckling limit {level=2 check="131.5"}
A steel compression spring of mean diameter $25\ \mathrm{mm}$ works between flat, parallel plates. Find the largest free length for absolute stability. (Enter the length in mm.)
::: solution
With $\alpha = 0.5$, [[#eq-buckle]] gives $L_0 < 2.63\times25/0.5 = 131.5\ \mathrm{mm}$. If one end could pivot ($\alpha = 0.707$), the limit would drop to $93\ \mathrm{mm}$.
:::
:::

::: exercise Surge frequency {level=2 check="250"}
A valve spring has a rate of $10\ \mathrm{N/mm}$ and an active mass of $40\ \mathrm{g}$, and works between the cylinder head and the valve retainer. Find its fundamental surge frequency. (Enter the frequency in Hz.)
::: solution
$k = 10\,000\ \mathrm{N/m}$, $m = 0.040\ \mathrm{kg}$: $f_1 = \tfrac12\sqrt{10\,000/0.04} = \tfrac12\times500 = 250\ \mathrm{Hz}$. With the 15–20 times rule the fundamental of the forcing (once per camshaft revolution) should not exceed about $12.5$–$17\ \mathrm{Hz}$, i.e. a camshaft speed of $750$–$1000\ \mathrm{rpm}$ — far below a modern engine's, which is why valve springs are designed for high frequency and damped and why the harmonics of the cam profile are controlled.
:::
:::

::: exercise Fatigue of a small spring {level=2}
A music-wire spring with $d = 2.0\ \mathrm{mm}$ and $D = 16\ \mathrm{mm}$ (unpeened, squared and ground) cycles between $20\ \mathrm{N}$ and $60\ \mathrm{N}$. Find the fatigue factor of safety by the Goodman and Gerber criteria and the factor of safety against yield at the peak force.
::: solution
$C = 8$, $K_B = 1.1724$. $F_a = 20\ \mathrm{N}$, $F_m = 40\ \mathrm{N}$; $8D/(\pi d^3) = 128/(8\pi) = 5.093\ \mathrm{mm^{-2}}$, so $\tau_a = 1.1724\times5.093\times20 = 119.4\ \mathrm{MPa}$ and $\tau_m = 238.8\ \mathrm{MPa}$. $S_{ut} = 2211/2^{0.145} = 2000\ \mathrm{MPa}$, $S_{su} = 1340\ \mathrm{MPa}$, $S_{sy} = 900\ \mathrm{MPa}$.

Goodman: $S_{se} = 241/(1 - 379/1340) = 336.1\ \mathrm{MPa}$; $1/n_f = 119.4/336.1 + 238.8/1340 = 0.355 + 0.178 = 0.534$, $n_f = 1.87$.

Gerber: $S_{se} = 241/(1 - 0.2829^2) = 262.0\ \mathrm{MPa}$; $2\tau_mS_{se}/(S_{su}\tau_a) = 0.782$; $n_f = \tfrac12(1340/238.8)^2(119.4/262.0)[-1 + \sqrt{1 + 0.782^2}] = 1.93$.

Yield: $\tau_{\max} = 358.3\ \mathrm{MPa}$, $n_y = 900/358.3 = 2.51$. Fatigue governs.
:::
:::

::: exercise Torsion-spring rotation {level=2 check="1.5"}
A helical torsion spring has $d = 2\ \mathrm{mm}$, $D = 20\ \mathrm{mm}$ and $N_a = 5$ active turns, $E = 200\ \mathrm{GPa}$. Using the ideal formula [[#eq-torsion-spring]] (no friction allowance), find the angle through which a moment of $750\ \mathrm{N\,mm}$ winds it. (Enter the angle in radians.)
::: solution
$\theta = 64MDN_a/(Ed^4) = 64\times750\times20\times5/(200\,000\times16) = 4\,800\,000/3\,200\,000 = 1.5\ \mathrm{rad}$ ($86°$). With the friction-corrected constant $67.8$ in place of $64$ the angle is $1.59\ \mathrm{rad}$. The bending stress, with $C = 10$ and $K_i = 389/360 = 1.081$, is $1.081\times32\times750/(8\pi) = 1032\ \mathrm{MPa}$, about 52 % of $S_{ut} = 2000\ \mathrm{MPa}$. Bending allowables for static torsion springs are a larger fraction of $S_{ut}$ than the torsional allowables of compression springs, because the wire yields in bending at a higher stress than in shear.
:::
:::

::: exercise Deflection including direct shear {level=3}
(a) Repeat the Castigliano derivation of [[#prop-deflection]], but now use the strain energy of transverse shear in a round section with the shape factor $10/9$, $U_V = \tfrac{10}{9}\,F^2L/(2AG)$. (b) For which index does the direct-shear term add 1 % to the deflection, and 5 %? (c) Explain why this correction is almost never made in practice, while the corresponding correction to the *stress* (from $K_s$) is.
::: solution
(a) $y = \partial U/\partial F = 8FD^3N_a/(Gd^4) + \tfrac{10}{9}\cdot 4FDN_a/(Gd^2) = \tfrac{8FD^3N_a}{Gd^4}\left(1 + \tfrac{5}{9C^2}\right)$.
(b) $5/(9C^2) = 0.01$ gives $C = 7.45$; $= 0.05$ gives $C = 3.33$ — below the practical range.
(c) Deflection is an average over the whole wire, and the shear contribution averages to a term of order $1/C^2$; stress is a local peak, and the direct shear adds a term of order $1/C$ exactly where the torsional stress is greatest. Uncertainty in the effective number of active coils (perhaps $\pm\tfrac14$ coil, 2 % in a 12-coil spring) and in $G$ already exceeds the deflection correction.
:::
:::

::: exercise Design a spring for a safety valve {level=3}
A small relief valve needs a spring that holds a poppet closed with $120\ \mathrm{N}$ at an installed length of $40\ \mathrm{mm}$ and gives $150\ \mathrm{N}$ when the valve is fully open, $6\ \mathrm{mm}$ further compressed. The spring sits over a $14\ \mathrm{mm}$ guide and inside a $26\ \mathrm{mm}$ bore; it sees occasional cycling only. Choose material, $d$, $D$, $N_a$, end form and free length, and check solid stress and buckling. Discuss what else must be considered for a pressure-relief device.
::: solution
**Rate.** $k = (150 - 120)/6 = 5\ \mathrm{N/mm}$; maximum working force $150\ \mathrm{N}$; with $\xi = 0.15$, $F_s = 172.5\ \mathrm{N}$.

**Space.** $D - d > 14$ and $D + d < 26$, with clearance: take $D = 20\ \mathrm{mm}$.

**Wire.** Music wire, squared and ground. Trying $d = 2.5\ \mathrm{mm}$: $C = 8$, $K_B = 1.172$, $\tau_s = 1.172\times8\times172.5\times20/(\pi\times15.625) = 659\ \mathrm{MPa}$; $S_{ut} = 1936$, $S_{sy} = 871\ \mathrm{MPa}$, $n_s = 1.32$ — acceptable. $N_a = 2.5^4\times80\,000/(8\times8000\times5) = 9.77$; take $9.75$, $k = 5.01\ \mathrm{N/mm}$.

**Lengths.** Installed deflection $120/5.01 = 24.0\ \mathrm{mm}$, so $L_0 = 40 + 24.0 = 64.0\ \mathrm{mm}$. $N_t = 11.75$, $L_s = 29.4\ \mathrm{mm}$; fully open length $34\ \mathrm{mm}$, leaving $4.6\ \mathrm{mm}$ to solid — the overrun is $\xi = 4.6/30.0 = 0.15$, just meeting the guideline (good).

**Buckling.** $2.63\times20/0.5 = 105\ \mathrm{mm} > 64\ \mathrm{mm}$, and the guide rod adds security.

**Further considerations.** A relief valve is a safety device made and certified to a pressure-equipment code (for example ISO 4126 or ASME Section VIII requirements) and its set pressure is verified by test; the spring's tolerances (wire diameter, coils, set) shift the opening pressure, so a means of adjustment is needed; corrosion or temperature may call for stainless steel (lower $G$ and $S_{ut}$, redo the design); and relaxation (loss of force over time at stress) must be limited, which favours a preset spring with a lower working stress.
:::
:::
