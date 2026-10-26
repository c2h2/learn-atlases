Every machine is a set of parts held together, and most of the holding is done by bolts, screws and welds. A car engine has cylinder-head bolts that must keep a gasket sealed against combustion pressure at every firing stroke; a wind turbine has hundreds of large bolts in its tower flanges and blade roots, loaded by the wind for twenty years; a crane boom, a machine frame or a bicycle is a structure of welded joints. Joints are where machines most often fail, because they are where load passes from one part to another through small, highly stressed regions: the root of a thread, the toe of a weld, the edge of a glue line.

The central idea of this chapter is that a good bolted joint is a **preloaded spring system**. Tightening the nut stretches the bolt and squeezes the clamped parts (the **members**) together. Because the members are usually several times stiffer than the bolt, an external load that tries to pull the joint apart mostly *relieves the compression in the members* and adds only a small fraction to the bolt force — provided the joint stays closed. This is why a properly tightened bolt survives fatigue loads that would break a loose one within hours, and why the most important number on a bolted-joint drawing is the tightening specification. Welded and bonded joints have no preload: there the geometry of the weld or the glue line, and the residual stresses, decide the life.

The processes of welding, brazing, riveting and bonding are taught in [[manufacturing/joining]]; this chapter is about sizing the joints. It uses fatigue methods from [[machine-design/fatigue]] and friction from [[statics/friction]]. Notation follows Budynas and Nisbett, *Shigley's Mechanical Engineering Design* (11th edition): $d$ nominal (major) diameter, $p$ pitch, $A_t$ tensile stress area, $S_p$ proof strength, $F_i$ preload, $P$ external tensile load on one bolt, $k_b$ and $k_m$ bolt and member stiffness, $C$ joint constant, $n$ a factor of safety. Tension is positive.

Real joints are designed to current standards — ISO 898-1:2013 for bolt property classes, VDI 2230 Part 1 (2015) for high-duty bolted joints, EN 1993-1-8 and EN 1993-1-9 for bolted and welded steel structures, AWS D1.1 for structural welding. This chapter teaches the principles behind those documents; it is no substitute for them.

## Threaded fasteners

A screw thread is a helical ridge on a cylinder. Turning a nut on a bolt advances it by one **lead** per revolution; for the usual single-start thread the lead equals the **pitch** $p$, the axial distance between adjacent threads. Almost all general-purpose fasteners now use the ISO metric thread: a symmetric $60°$ profile with flat (or slightly rounded) crests and roots, designated M$d \times p$, for example M20 × 2.5. Each nominal diameter has a standard **coarse** pitch, used unless there is a reason not to, and one or more **fine** pitches, used for thin walls, fine adjustment or higher strength in very hard bolts.

::: definition Thread diameters and tensile stress area {#def-thread}
For an ISO metric external thread of nominal (major) diameter $d$ and pitch $p$ (ISO 68-1, ISO 724):
- the **pitch diameter** is $d_2 = d - 0.6495\,p$, the diameter at which the thread ridge and the groove are equally wide;
- the **minor diameter** of the bolt is $d_3 = d - 1.2269\,p$, the diameter at the thread root;
- the **lead angle** $\lambda$ of a single-start thread satisfies $\tan\lambda = p/(\pi d_2)$;
- the **tensile stress area** is the area of a circle whose diameter is the mean of $d_2$ and $d_3$:
$$
A_t = \frac{\pi}{4}\left(\frac{d_2 + d_3}{2}\right)^2 = \frac{\pi}{4}\,(d - 0.9382\,p)^2.
$$ {#eq-at}
:::

The tensile stress area is not a geometric section of the bolt. It is an empirical area: tensile tests on threaded rods show that a threaded bar breaks at a load equal to its material's tensile strength times $A_t$, slightly more than the root area $A_r = \pi d_3^2/4$, because the helical ridge stiffens the core. All bolt strengths are quoted on $A_t$, and so are the stresses in this chapter. Values for the coarse-pitch series, from [[#eq-at]] and in agreement with Budynas and Nisbett, Table 8-1:

| thread | $p$ (mm) | $d_3$ (mm) | $A_r$ (mm²) | $A_t$ (mm²) |
|---|---|---|---|---|
| M6 | $1$ | $4.77$ | $17.9$ | $20.1$ |
| M8 | $1.25$ | $6.47$ | $32.8$ | $36.6$ |
| M10 | $1.5$ | $8.16$ | $52.3$ | $58.0$ |
| M12 | $1.75$ | $9.85$ | $76.3$ | $84.3$ |
| M16 | $2$ | $13.55$ | $144$ | $157$ |
| M20 | $2.5$ | $16.93$ | $225$ | $245$ |
| M24 | $3$ | $20.32$ | $324$ | $353$ |

### Strength of bolts

Steel bolts are sold in **property classes** defined by ISO 898-1. The class number encodes the strength: in "8.8" the first figure is one hundredth of the nominal tensile strength in MPa ($800\ \mathrm{MPa}$) and the second is ten times the ratio of nominal yield to tensile strength ($0.8$). Nuts have a matching class (ISO 898-2) chosen so that, if a joint is overloaded, the bolt breaks rather than the nut threads stripping — a bolt failure is obvious, a stripped thread may not be.

For design the important strength is the **proof strength** $S_p$: the stress the bolt must carry without measurable permanent extension in the proof-load test. It is a little below the 0.2 % yield strength, because the thread yields locally before the bulk of the bolt does. The minimum values of ISO 898-1:2013 for the classes most used in machinery are:

| property class | $S_p$ (MPa) | $S_y$ (MPa) | $S_{ut}$ (MPa) | material |
|---|---|---|---|---|
| 4.6 | $225$ | $240$ | $400$ | low or medium carbon steel |
| 8.8, $d \le 16\ \mathrm{mm}$ | $580$ | $640$ | $800$ | medium carbon steel, quenched and tempered |
| 8.8, $d > 16\ \mathrm{mm}$ | $600$ | $660$ | $830$ | medium carbon steel, quenched and tempered |
| 10.9 | $830$ | $940$ | $1040$ | alloy steel, quenched and tempered |
| 12.9 | $970$ | $1100$ | $1220$ | alloy steel, quenched and tempered |

The **proof load** of a bolt is $F_p = A_tS_p$. Classes 8.8 and 10.9 cover most machinery; 12.9 is used for socket-head cap screws and highly loaded compact joints, but very high-strength bolts are more susceptible to hydrogen embrittlement and stress corrosion and are not electroplated without special precautions.

## Preload and tightening torque

Why tighten a bolt at all, rather than let it carry the external load directly? Preload does four jobs:

1. it keeps the joint **closed** under the external load, so that gaskets seal and the parts do not hammer against each other;
2. it reduces the **fluctuation** of the bolt force under a varying load, which is what gives a bolted joint its fatigue strength ([[#prop-sharing]]);
3. it generates **friction** at the faying surfaces, so that a shear load can be carried by friction instead of by the bolt shank bearing on the hole;
4. it resists **self-loosening**: a joint that does not slip transversely does not unscrew.

The higher the preload, the better each of these is done, so bolts are tightened close to their proof load. Budynas and Nisbett (ch. 8) recommend
$$
F_i = \begin{cases} 0.75\,F_p & \text{for connections that will be taken apart and reused,} \\ 0.90\,F_p & \text{for permanent connections,} \end{cases} \qquad F_p = A_tS_p.
$$ {#eq-preload}
Structural steelwork to EN 1993-1-8 uses a preload of $0.7\,f_{ub}A_s$ for preloaded high-strength bolts, where $f_{ub}$ is the bolt's tensile strength — the same idea in different terms. Note that [[#eq-preload]] is the *intended* preload; what the bolt actually receives depends on how it is tightened.

### The torque–preload relation

Most bolts are tightened with a torque wrench, so the designer must convert the required preload into a torque. The torque has to do three things: stretch the bolt (raise the load up the helical incline of the thread), overcome friction on the thread flanks, and overcome friction between the nut face (or bolt head) and the member.

::: proposition Tightening torque {#prop-torque}
To turn a nut against a preload $F_i$ on an ISO thread (flank half-angle $\alpha = 30°$, lead angle $\lambda$, pitch diameter $d_2$), with Coulomb friction coefficient $f$ on the thread flanks and $f_c$ under the nut face, whose mean bearing diameter is $d_c$, requires a torque
$$
T = F_i\,\frac{d_2}{2}\,\frac{\tan\lambda + f\sec\alpha}{1 - f\tan\lambda\sec\alpha} + F_i\,f_c\,\frac{d_c}{2}.
$$ {#eq-torque-exact}
Writing $T = KF_id$ defines the **torque coefficient**
$$
K = \frac{d_2}{2d}\,\frac{\tan\lambda + f\sec\alpha}{1 - f\tan\lambda\sec\alpha} + \frac{f_c\,d_c}{2d}.
$$ {#eq-k}
:::

::: proof
**Assumptions.** The thread is single-start; the nut is turned at constant speed (no inertia); friction is Coulomb friction with constant coefficients; the thread load acts at the pitch diameter $d_2$ and the nut-face friction at the mean diameter $d_c$; the lead angle is small, so the angle between the flank normal and the axial plane is taken as $\alpha$ (the exact value $\alpha_n$, with $\tan\alpha_n = \tan\alpha\cos\lambda$, differs by less than 0.1 % for ISO coarse threads).

**Unrolled thread.** Unwrap one turn of the thread at the pitch diameter: it becomes an incline of length $\pi d_2$ rising $p$, at angle $\lambda$. The nut thread is a block pushed up this incline by a horizontal (circumferential) force $Q$ while carrying the axial load $F_i$. The free-body diagram of the block shows: $F_i$ acting axially (down the axis, opposing the advance); $Q$ acting circumferentially; the normal force $N$ from the bolt flank, perpendicular to the incline; and the friction force opposing the sliding, directed down the incline.

**Effect of the flank angle.** On a $60°$ thread the flank is also inclined at $\alpha$ in the axial plane. The flank normal force needed to supply an axial component $N$ is $N/\cos\alpha$, so the friction force is $fN/\cos\alpha = (f\sec\alpha)N$. The thread therefore behaves like a square thread with an effective friction coefficient $f' = f\sec\alpha$.

**Equilibrium.** Resolving along the axis and circumferentially,
$$
N\cos\lambda - f'N\sin\lambda = F_i, \qquad Q = N\sin\lambda + f'N\cos\lambda.
$$
Eliminating $N$ and dividing numerator and denominator by $\cos\lambda$,
$$
Q = F_i\,\frac{\sin\lambda + f'\cos\lambda}{\cos\lambda - f'\sin\lambda} = F_i\,\frac{\tan\lambda + f\sec\alpha}{1 - f\tan\lambda\sec\alpha}.
$$
The thread torque is $Q\,d_2/2$.

**Nut face.** The nut face presses on the member with total force $F_i$ and slides on it; the friction force $f_cF_i$ acts at the mean radius $d_c/2$, adding $F_if_cd_c/2$. Summing gives [[#eq-torque-exact]], and dividing by $F_id$ gives [[#eq-k]].

**Check.** With no friction, $T = F_i(d_2/2)\tan\lambda = F_ip/(2\pi)$: the work $2\pi T$ done in one turn equals the work $F_ip$ done in advancing the nut one pitch against $F_i$, as energy conservation requires.
:::

For a hexagon nut on a clearance hole the bearing annulus runs from about $d$ to the washer-face diameter of about $1.5d$, so Budynas and Nisbett take $d_c = 1.25d$ and the second term becomes $0.625f_c$. With $f = f_c = 0.15$ — typical of dry, as-received steel — [[#eq-k]] gives $K = 0.194$ for an M20 × 2.5 bolt and almost the same for every other coarse size, because $d_2/d$ and $\tan\lambda$ hardly change through the series. Hence the widely used rule
$$
T = K\,F_i\,d, \qquad K \approx 0.2,
$$ {#eq-torque}
with $K = 0.2$ the value Budynas and Nisbett adopt when the condition of the bolt is not stated. Their tabulated values range from about $0.12$ for bolts with anti-seize compound through $0.18$ for lubricated and $0.20$ for zinc-plated bolts to $0.30$ for non-plated black-finish bolts.

The breakdown of $K = 0.194$ is instructive. The stretching term $(d_2/2d)\tan\lambda = p/(2\pi d) = 0.020$ is about 10 % of the total; thread friction takes about 41 % and nut-face friction about 48 %. **Roughly nine-tenths of the tightening torque is spent on friction**, so a modest change in friction produces a large change in preload. If the same torque is applied to a lubricated bolt ($f = f_c = 0.10$, $K = 0.136$), the preload rises by $0.194/0.136 - 1 = 43\ \%$ — enough to yield a bolt that was meant to be tightened to $0.75F_p$.

This scatter is the main weakness of torque control. VDI 2230 accounts for it with a **tightening factor** $\alpha_A = F_{M,\max}/F_{M,\min}$, the ratio of the largest to the smallest preload that the tightening method can produce, and sizes the bolt so that the *largest* preload does not overstress it while the *smallest* still does its job. More accurate methods control the preload more directly: turn-of-nut (angle) tightening, yield-controlled tightening, ultrasonic measurement of bolt elongation and hydraulic tensioners.

### Stress in the bolt during tightening

While the nut is being turned, the thread friction torque also twists the bolt, so the bolt is under combined tension and torsion. Once the wrench is removed much of the torsion relaxes, but at the end of tightening the combined stress is highest, and it decides whether the bolt yields during assembly. The von Mises stress ([[machine-design/static-failure]]) is
$$
\sigma' = \sqrt{\sigma^2 + 3\tau^2}, \qquad \sigma = \frac{F_i}{A_t}, \qquad \tau = \frac{16\,T_\text{thread}}{\pi d_s^3},
$$
with $d_s = \sqrt{4A_t/\pi}$ the diameter equivalent to the stress area and $T_\text{thread}$ the first term of [[#eq-torque-exact]]. Because of this torsion a bolt tightened by torque reaches yield at an axial preload below $A_tS_y$; this is one reason for the margin in [[#eq-preload]].

::: example Preload and torque for an M20 bolt {#ex-preload}
An M20 × 2.5 bolt of property class 8.8 is used in a joint that must be taken apart for maintenance. Find the proof load, the recommended preload and the tightening torque with $K = 0.2$. Then, taking $f = f_c = 0.15$, check the combined stress in the bolt at the end of tightening.
::: solution
**Proof load.** From the tables, $A_t = 245\ \mathrm{mm^2}$, and for class 8.8 with $d > 16\ \mathrm{mm}$, $S_p = 600\ \mathrm{MPa}$, $S_y = 660\ \mathrm{MPa}$. So
$$
F_p = A_tS_p = 245\times600 = 147\,000\ \mathrm{N} = 147\ \mathrm{kN}.
$$
**Preload.** Reusable joint: $F_i = 0.75F_p = 110.25\ \mathrm{kN}$.

**Torque.** From [[#eq-torque]],
$$
T = KF_id = 0.2\times110\,250\ \mathrm{N}\times0.020\ \mathrm{m} = 441\ \mathrm{N\,m}.
$$
**Stress during tightening.** $d_2 = 20 - 0.6495\times2.5 = 18.376\ \mathrm{mm}$, $\tan\lambda = 2.5/(\pi\times18.376) = 0.0433$ ($\lambda = 2.48°$), $\sec 30° = 1.1547$. The thread part of $K$ is
$$
\frac{18.376}{40}\times\frac{0.0433 + 0.15\times1.1547}{1 - 0.15\times0.0433\times1.1547} = 0.4594\times\frac{0.2165}{0.9925} = 0.1002,
$$
so $T_\text{thread} = 0.1002\times110\,250\times20 = 221.0\times10^3\ \mathrm{N\,mm}$. With $d_s = \sqrt{4\times245/\pi} = 17.66\ \mathrm{mm}$,
$$
\sigma = \frac{110\,250}{245} = 450\ \mathrm{MPa}, \qquad \tau = \frac{16\times221.0\times10^3}{\pi\times17.66^3} = 204\ \mathrm{MPa},
$$
$$
\sigma' = \sqrt{450^2 + 3\times204^2} = 572\ \mathrm{MPa}, \qquad \frac{S_y}{\sigma'} = \frac{660}{572} = 1.15.
$$
**Sanity check.** The bolt does not yield during tightening, but the torsion has used up most of the margin between $0.75S_p$ and $S_y$: the margin of $660/450 = 1.47$ on axial stress alone falls to $1.15$. This is why tightening to $0.9F_p$ by torque is reserved for permanent joints where some local yielding is acceptable. The full $K$ from [[#eq-k]] is $0.1002 + 0.625\times0.15 = 0.194$, so the "exact" torque would be $428\ \mathrm{N\,m}$ — within the scatter of the friction coefficients.
:::
:::

::: warning Common mistakes with bolts
- **Treating torque as preload.** A torque specification fixes the preload only for a stated friction condition. Lubricating, plating or reusing a bolt changes $K$ by tens of per cent; the torque must be given together with the lubrication condition.
- **Using the shank area for stresses.** Bolt strengths are quoted on the tensile stress area $A_t$; stresses in the threaded part must be computed on $A_t$ too.
- **Reusing yield-tightened bolts.** Bolts tightened to or beyond yield (common in engine cylinder heads) have been plastically stretched and are generally specified for single use.
- **Ignoring the joint stiffness.** The bolt does not carry the external load $P$; it carries $F_i + CP$ while the joint is closed and $P$ after it opens. Analysing the bolt as if it carried $P$ alone, without preload, gets both the static and the fatigue answers wrong.
- **Letting a fatigue-loaded joint open.** Once the members separate, the full load fluctuation goes into the bolt and its fatigue life collapses.
:::

## Stiffness of the bolt and the members

To find how an external load is shared between bolt and members we need their stiffnesses. The bolt is a set of springs in series: the unthreaded shank and the threaded part within the grip carry the same force, so their compliances add.

::: definition Bolt stiffness, member stiffness and joint constant {#def-stiffness}
Let the **grip** $l$ be the total thickness of the clamped members (and washers). Within the grip let $l_d$ be the length of unthreaded shank, of area $A_d = \pi d^2/4$, and $l_t = l - l_d$ the length of threaded bolt, of area $A_t$. Then
- the **bolt stiffness** is
$$
k_b = \frac{A_dA_tE_b}{A_dl_t + A_tl_d},
$$ {#eq-kb}
the series combination of $A_dE_b/l_d$ and $A_tE_b/l_t$;
- the **member stiffness** $k_m$ is the axial force per unit shortening of the clamped members between the bearing faces of the head and the nut;
- the **joint constant** (load factor) is
$$
C = \frac{k_b}{k_b + k_m}.
$$ {#eq-c}
:::

[[#eq-kb]] neglects the compliance of the bolt head and of the threads engaged in the nut. VDI 2230 adds them as short extra lengths of bolt, which lowers $k_b$ noticeably for short grips; for teaching purposes [[#eq-kb]] is adequate.

The members are harder. They are not a bar of known cross-section: the compression spreads out from the bearing face under the head into the plate, so the stressed region widens with depth. A simple and well-tested model replaces it by a **pressure cone** (frustum) of half-angle $\alpha$ starting at the bearing face. Measurements and analyses of the pressure distribution give $\alpha$ between about $25°$ and $33°$; Budynas and Nisbett use $30°$.

::: proposition Stiffness of a frustum {#prop-frustum}
A hollow frustum of a linear-elastic material with modulus $E$, height $t$, hole diameter $d$, smaller-end diameter $D$ and half-apex angle $\alpha$, compressed axially between its ends, has stiffness
$$
k = \frac{\pi E d\tan\alpha}{\ln\left[\dfrac{(2t\tan\alpha + D - d)(D + d)}{(2t\tan\alpha + D + d)(D - d)}\right]}.
$$ {#eq-frustum}
For a joint of two members of the same material and equal thickness $l/2$, with $D = 1.5d$ (the washer face) and $\alpha = 30°$, the two frusta meet at mid-grip and act in series, giving
$$
k_m = \frac{0.5774\,\pi E d}{2\ln\left(5\,\dfrac{0.5774\,l + 0.5\,d}{0.5774\,l + 2.5\,d}\right)}.
$$ {#eq-km}
:::

::: proof
**Assumptions.** The compressive stress is uniform over each cross-section of the cone and zero outside it; the material is linear-elastic and isotropic; lateral (Poisson) effects and friction at the interfaces are neglected.

At distance $x$ from the small end the cone's outer diameter is $D + 2x\tan\alpha$, so the annular area is
$$
A(x) = \pi\left[\left(x\tan\alpha + \frac{D}{2}\right)^2 - \left(\frac{d}{2}\right)^2\right] = \pi(u - a)(u + a), \qquad u = x\tan\alpha + \frac{D}{2},\ \ a = \frac{d}{2}.
$$
Under a force $P$ the element $dx$ shortens by $P\,dx/(EA)$ ([[mechanics-of-materials/axial-loading]]). With $dx = du/\tan\alpha$ and the partial fractions $\dfrac{1}{(u - a)(u + a)} = \dfrac{1}{2a}\left(\dfrac{1}{u - a} - \dfrac{1}{u + a}\right)$,
$$
\delta = \frac{P}{\pi E\tan\alpha}\int_{D/2}^{t\tan\alpha + D/2}\frac{du}{(u - a)(u + a)} = \frac{P}{\pi E d\tan\alpha}\left[\ln\frac{u - a}{u + a}\right]_{D/2}^{t\tan\alpha + D/2}.
$$
Evaluating,
$$
\delta = \frac{P}{\pi E d\tan\alpha}\ln\frac{(2t\tan\alpha + D - d)(D + d)}{(2t\tan\alpha + D + d)(D - d)},
$$
and $k = P/\delta$ is [[#eq-frustum]].

For the symmetric joint each frustum has $t = l/2$ and $D = 1.5d$, so $2t\tan\alpha = l\tan\alpha$, $D - d = 0.5d$ and $D + d = 2.5d$. The logarithm's argument becomes $\dfrac{(l\tan\alpha + 0.5d)(2.5d)}{(l\tan\alpha + 2.5d)(0.5d)} = 5\,\dfrac{l\tan\alpha + 0.5d}{l\tan\alpha + 2.5d}$. Two equal springs in series have half the stiffness of one, and $\tan30° = 0.5774$, which gives [[#eq-km]].
:::

For members of different materials or thicknesses, the grip is split into frusta at mid-grip and at each interface, [[#eq-frustum]] is applied to each piece with its own $E$, $t$ and $D$, and the compliances are added. An alternative is the curve fitted by Wileman, Choudhury and Green to finite-element results and quoted by Budynas and Nisbett (ch. 8): $k_m = EdA\exp(Bd/l)$, with $A = 0.787\,15$ and $B = 0.628\,73$ for steel members. For ordinary proportions the two estimates agree within a few per cent.

::: example Joint constant of a flange joint {#ex-stiffness}
The M20 class 8.8 bolt of [[#ex-preload]] clamps two steel plates, each $25\ \mathrm{mm}$ thick, with a nut; there are no washers. The bolt is M20 × 80 with a thread length of $46\ \mathrm{mm}$ ($2d + 6$ for an ISO 4014 bolt of this length). Take $E = 207\ \mathrm{GPa}$ for all parts. Find $k_b$, $k_m$ and $C$.
::: solution
**Lengths.** Grip $l = 50\ \mathrm{mm}$. Unthreaded shank $80 - 46 = 34\ \mathrm{mm}$, all within the grip, so $l_d = 34\ \mathrm{mm}$ and $l_t = 50 - 34 = 16\ \mathrm{mm}$.

**Bolt.** $A_d = \pi\times20^2/4 = 314.2\ \mathrm{mm^2}$, $A_t = 245\ \mathrm{mm^2}$. With $E = 207\,000\ \mathrm{N/mm^2}$, from [[#eq-kb]],
$$
k_b = \frac{314.2\times245\times207\,000}{314.2\times16 + 245\times34} = \frac{1.5934\times10^{10}}{5027 + 8330} = 1.193\times10^{6}\ \mathrm{N/mm}.
$$
**Members.** $0.5774\,l = 28.87\ \mathrm{mm}$, so the argument of the logarithm in [[#eq-km]] is $5\times(28.87 + 10)/(28.87 + 50) = 2.464$, $\ln 2.464 = 0.9018$, and
$$
k_m = \frac{0.5774\times\pi\times207\,000\times20}{2\times0.9018} = 4.16\times10^{6}\ \mathrm{N/mm}.
$$
The Wileman fit gives $207\,000\times20\times0.787\,15\times e^{0.628\,73\times0.4} = 4.19\times10^6\ \mathrm{N/mm}$, within 1 %.

**Joint constant.** $C = 1.193/(1.193 + 4.163) = 0.223$.

**Sanity check.** The members are about $3.5$ times stiffer than the bolt, so the bolt takes about a fifth of any external load, as is typical of steel joints with a grip of two to three diameters. A longer, thinner bolt (or a reduced-shank "waisted" bolt) would lower $k_b$ and $C$; a soft gasket in the grip would lower $k_m$ drastically and raise $C$ towards 1.
:::
:::

## The tension joint under external load

Now let an external tensile force $P$ pull the joint apart along the bolt axis (for a joint with several bolts, $P$ is the share of one bolt). Think of the bolt as a soft spring and the members as a stiff spring, assembled so that the bolt is stretched and the members compressed by the same force $F_i$. Pulling on the joint lengthens the bolt a little more and lets the members spring back by the *same* amount, as long as they stay in contact.

::: proposition Load sharing in a preloaded joint {#prop-sharing}
In a joint with preload $F_i$, bolt stiffness $k_b$ and member stiffness $k_m$, an external tensile load $P$ applied at the bearing faces changes the bolt force $F_b$ and the member force $F_m$ (tension positive) to
$$
F_b = F_i + CP, \qquad F_m = (1 - C)P - F_i,
$$ {#eq-sharing}
as long as $F_m < 0$ (the members remain in contact). The joint separates when
$$
P = P_0 = \frac{F_i}{1 - C},
$$ {#eq-separation}
and for $P > P_0$ the bolt carries the whole load, $F_b = P$.
:::

::: proof
**Assumptions.** Bolt and members are linear-elastic; the external load is applied at the bearing faces under the head and nut, so that the whole grip of the members is unloaded by it (if it is applied inside the members, part of the members acts in series with the bolt and $C$ falls — VDI 2230 treats this with a load-introduction factor); the members are in contact over their whole interface.

**Free-body diagram.** Cut through the bolt and the members at a plane in the grip and keep the upper half. Forces on it: the external load $P$ (upwards, tension); the bolt force $F_b$ in the cut bolt (downwards on the upper part when the bolt is in tension); the member force $F_m$ in the cut members (downwards when in tension, so an upward push when, as here, they are in compression). Equilibrium:
$$
F_b + F_m = P.
$$
**Before the load.** $F_b = F_i$, $F_m = -F_i$; the sum is zero, as it must be with $P = 0$.

**Compatibility.** The load $P$ moves the bearing faces apart by $\delta$. Because bolt and members span the same two faces, the bolt lengthens by $\delta$ and the members lengthen (are decompressed) by the same $\delta$. Hence $\Delta F_b = k_b\delta$ and $\Delta F_m = k_m\delta$, and from equilibrium $\Delta F_b + \Delta F_m = P$, so
$$
\delta = \frac{P}{k_b + k_m}, \qquad \Delta F_b = \frac{k_b}{k_b + k_m}P = CP, \qquad \Delta F_m = (1 - C)P.
$$
Adding these to the initial values gives [[#eq-sharing]].

**Separation.** The members can carry compression only. $F_m$ reaches zero when $(1 - C)P = F_i$, which is [[#eq-separation]]. Beyond that the members carry nothing and equilibrium gives $F_b = P$. At $P = P_0$ both expressions give $F_b = F_i + CF_i/(1 - C) = F_i/(1 - C) = P_0$, so the bolt force is continuous.
:::

The **joint diagram** below plots the two forces against the external load. While the joint is closed the bolt force rises slowly, with slope $C$, and the clamping force falls with slope $1 - C$; after separation the bolt force follows the line $F_b = P$.

::: widget plot
f: if(x < fi/(1 - c), fi + c*x, x); if(x < fi/(1 - c), fi - (1 - c)*x, 0); x
x: 0, 250
y: 0, 250
sliders: fi=110:20:200:1, c=0.22:0.05:0.95:0.01
labels: F_b\ \text{(bolt tension)}; -F_m\ \text{(clamping force)}; F_b = P
caption: Joint diagram: forces in kN against the external load $P$ per bolt, in kN. The defaults are those of [[#ex-stiffness]] and [[#ex-static]]: $F_i = 110\ \mathrm{kN}$ and $C = 0.22$, so the joint separates at $P_0 = F_i/(1 - C) = 141\ \mathrm{kN}$, where the clamping force reaches zero and the bolt curve joins the line $F_b = P$. Between $P = 0$ and $40\ \mathrm{kN}$ the bolt force changes by only $0.22\times40 = 8.8\ \mathrm{kN}$. Now raise $c$ to $0.9$, as for a joint with a soft gasket: the bolt takes almost the whole load fluctuation. Then lower $fi$: separation comes earlier, and beyond it every kilonewton of $P$ goes into the bolt.
:::

### Static factors of safety

Three different things can go wrong under an increasing tensile load, and each gets its own factor of safety (Budynas and Nisbett, ch. 8):

$$
n_p = \frac{S_pA_t}{CP + F_i}, \qquad n_L = \frac{S_pA_t - F_i}{CP}, \qquad n_0 = \frac{F_i}{P(1 - C)}.
$$ {#eq-static-n}

- $n_p$ is the **proof-strength factor**: the ratio of proof load to bolt force. Because $F_i$ is already $0.75F_p$, it is never much above $1.33$ and says little about the reserve against the external load.
- $n_L$ is the **load factor**: the factor by which $P$ alone could be multiplied before the bolt reaches its proof load, keeping $F_i$ fixed. This is the meaningful margin against overload.
- $n_0$ is the factor against **separation**: the factor by which $P$ could be multiplied before the joint opens, $P_0/P$.

::: example Static check of the flange joint {#ex-static}
The joint of [[#ex-stiffness]] ($F_i = 110.25\ \mathrm{kN}$, $C = 0.223$, $A_t = 245\ \mathrm{mm^2}$, $S_p = 600\ \mathrm{MPa}$) carries an external load of $P = 40\ \mathrm{kN}$ per bolt. Find the bolt and member forces and the three factors of safety.
::: solution
**Forces.** From [[#eq-sharing]],
$$
F_b = 110.25 + 0.223\times40 = 119.2\ \mathrm{kN}, \qquad F_m = 0.777\times40 - 110.25 = -79.2\ \mathrm{kN}.
$$
Of the $40\ \mathrm{kN}$ applied, the bolt force rises by $8.9\ \mathrm{kN}$ and the clamping force falls by $31.1\ \mathrm{kN}$.

**Factors.** $S_pA_t = 147\ \mathrm{kN}$:
$$
n_p = \frac{147}{119.2} = 1.23, \qquad n_L = \frac{147 - 110.25}{0.223\times40} = \frac{36.75}{8.91} = 4.13, \qquad n_0 = \frac{110.25}{40\times0.777} = 3.55.
$$
**Separation load.** $P_0 = 110.25/0.777 = 141.9\ \mathrm{kN}$.

**Sanity check.** The bolt can take four times the working load before reaching proof, and the joint separates at $3.5$ times the working load — separation, not bolt overload, is the governing static limit, which is the usual case for well-preloaded joints. The low $n_p$ is not alarming: it reflects the deliberately high preload.
:::
:::

## Fatigue of bolted joints

Bolts fail in fatigue at the first engaged thread in the nut, where the thread root is a sharp notch and the load transfer from bolt to nut is concentrated; less often under the head or at the thread run-out. The fatigue stress concentration factors are large — Budynas and Nisbett quote $K_f = 3.0$ for rolled threads and $3.8$ for cut threads in classes 8.8 and above — and the endurance strength of a bolt hardly rises with its tensile strength, because stronger steels are more notch-sensitive. Threads **rolled** (formed by cold rolling) rather than cut have better fatigue strength, because the grain flow follows the thread contour and the root is left with compressive residual stress; rolling *after* heat treatment keeps that residual stress and is better still.

If the external load per bolt fluctuates between $0$ and $P$ — the common case for a cover, a cylinder head or a bearing cap — the bolt force fluctuates between $F_i$ and $F_i + CP$. On the tensile stress area the stress components are
$$
\sigma_a = \frac{CP}{2A_t}, \qquad \sigma_m = \frac{CP}{2A_t} + \frac{F_i}{A_t} = \sigma_a + \sigma_i, \qquad \sigma_i = \frac{F_i}{A_t}.
$$ {#eq-bolt-stresses}
The preload makes the mean stress large and the joint constant makes the amplitude small. As the external load grows, $\sigma_a$ and $\sigma_m$ grow together, one for one: the **load line** in the $\sigma_m$–$\sigma_a$ plane starts at the preload point $(\sigma_i, 0)$ and rises at $45°$, rather than starting at the origin as in [[machine-design/fatigue]].

Since the thread notch is already included in measured bolt data, Budynas and Nisbett (ch. 8) give **fully corrected endurance strengths** $S_e$ for bolts with rolled threads, to be used with the stress on $A_t$ and no further stress concentration or Marin factors:

| ISO property class | sizes | $S_e$ (MPa) |
|---|---|---|
| 8.8 | M16–M36 | $129$ |
| 9.8 | M1.6–M16 | $140$ |
| 10.9 | M5–M36 | $162$ |
| 12.9 | M1.6–M36 | $190$ |

These are fully reversed equivalent values for a Goodman line; they are not stresses a bolt could carry with zero mean.

**Goodman criterion for bolts** (Budynas and Nisbett, ch. 8). The Goodman line $\sigma_a/S_e + \sigma_m/S_{ut} = 1$ meets the load line $\sigma_m = \sigma_a + \sigma_i$ at the limiting amplitude $S_a$; substituting $\sigma_m = S_a + \sigma_i$ and solving,
$$
S_a = \frac{S_e\,(S_{ut} - \sigma_i)}{S_{ut} + S_e}, \qquad n_f = \frac{S_a}{\sigma_a} = \frac{S_e\,(S_{ut} - \sigma_i)}{\sigma_a\,(S_{ut} + S_e)}.
$$ {#eq-bolt-goodman}
Here $n_f$ is the factor by which the alternating component may grow, at constant preload, before the Goodman line is reached. It is an empirical design rule, with the scatter of the fatigue data behind it; Budynas and Nisbett also give the corresponding Gerber and ASME-elliptic forms.

VDI 2230 Part 1 (2015) takes a different and simpler route for bolts rolled before heat treatment (the usual production route): the permissible stress *amplitude* at high cycle numbers is taken as independent of the mean stress,
$$
\sigma_{ASV} = 0.85\left(\frac{150}{d} + 45\right)\ \mathrm{MPa} \qquad (d \text{ in mm}),
$$ {#eq-vdi}
which for M20 gives $44.6\ \mathrm{MPa}$. For bolts rolled after heat treatment, VDI 2230 raises this value by a factor that depends on the preload. The two approaches agree well in the range where bolts are actually preloaded, as the next example shows.

::: widget plot
f: e*(1 - x/u); sp - x; if(x >= si, x - si, 0/0)
x: 0, 1000
y: 0, 250
sliders: u=830:600:1300:10, e=129:60:250:1, sp=600:400:1000:10, si=450:0:900:5
points: 468.2,18.2
labels: \text{Goodman line}; \text{proof line } \sigma_a + \sigma_m = S_p; \text{load line from the preload}
caption: Fatigue diagram for a bolt, stress amplitude against mean stress on $A_t$, in MPa. Sliders: $u = S_{ut}$, $e = S_e$, $sp = S_p$ and $si = \sigma_i = F_i/A_t$. The defaults are the M20 class 8.8 bolt of [[#ex-bolt-fatigue]]; its working point $(468.2, 18.2)$ is marked on the load line, which starts at the preload stress on the horizontal axis and rises at $45°$. The load line meets the Goodman line at $S_a = 51\ \mathrm{MPa}$, about $2.8$ times the working amplitude. Raise $si$ (more preload): the intersection moves down — in this model more preload slightly *reduces* the fatigue factor, while it improves the separation margin (see the exercises). Lower $si$ towards zero and notice that the proof line, not fatigue, then limits the bolt.
:::

::: example Fatigue of the flange bolt {#ex-bolt-fatigue}
The external load on each bolt of [[#ex-static]] varies between $0$ and $40\ \mathrm{kN}$ for an indefinite number of cycles. The M20 class 8.8 bolt has rolled threads. Find the fatigue factor of safety by the Goodman rule [[#eq-bolt-goodman]], and compare with VDI 2230's amplitude [[#eq-vdi]]. What would happen if the preload were lost?
::: solution
**Stresses.** From [[#eq-bolt-stresses]], with $C = 0.223$ and $A_t = 245\ \mathrm{mm^2}$,
$$
\sigma_a = \frac{0.223\times40\,000}{2\times245} = 18.2\ \mathrm{MPa}, \qquad \sigma_i = \frac{110\,250}{245} = 450\ \mathrm{MPa}, \qquad \sigma_m = 468.2\ \mathrm{MPa}.
$$
**Goodman.** $S_e = 129\ \mathrm{MPa}$, $S_{ut} = 830\ \mathrm{MPa}$:
$$
S_a = \frac{129\times(830 - 450)}{830 + 129} = \frac{49\,020}{959} = 51.1\ \mathrm{MPa}, \qquad n_f = \frac{51.1}{18.2} = 2.81.
$$
**VDI 2230.** $\sigma_{ASV} = 0.85\times(150/20 + 45) = 44.6\ \mathrm{MPa}$, so $n_f = 44.6/18.2 = 2.45$. The two estimates of the endurable amplitude, $51$ and $45\ \mathrm{MPa}$, are close; both say that a preloaded M20 bolt can endure an amplitude of only about $45$–$50\ \mathrm{MPa}$ — some 6 % of its tensile strength.

**Lost preload.** If the bolt had loosened to zero preload the members would separate at once and the bolt would carry the whole load: $\sigma_a = 40\,000/(2\times245) = 81.6\ \mathrm{MPa}$, $4.5$ times more than before and well above the endurable amplitude. The bolt would fail in fatigue.

**Sanity check.** The preload has not made the bolt stronger; it has reduced the *amplitude* the bolt sees by the factor $C = 0.223$. That reduction, not the material, is what makes the joint survive.
:::
:::

**Design measures for fatigue-loaded bolts** follow directly from [[#eq-bolt-stresses]]: keep $C$ small (long, slender or waisted bolts; stiff members; no soft gaskets in the clamped grip — use O-rings or metal-to-metal contact instead), keep the preload reliably high enough that the joint never separates (accurate tightening, locking against self-loosening), use rolled threads, and reduce the thread-load concentration (nuts of more compliant design, or a larger number of smaller bolts).

### Self-loosening

Vibration does not loosen a bolt by shaking it axially. Gerhard Junker showed in 1969 that the dangerous loading is **transverse**: if the clamped parts slip sideways relative to each other, the head or nut bearing face and the threads slip too, and while they slip the thread friction no longer holds the nut, so the small "off-torque" from the thread helix unscrews it a little with every cycle. Junker's transverse-vibration machine is now the standard way of testing locking devices (for example DIN 65151). The remedy is first to prevent slip — sufficient preload, enough friction, enough bolts — and only second to add locking elements. Spring washers are of little use against transverse slip; prevailing-torque nuts, adhesive thread-lockers and wedge-locking washers are more effective.

## Bolted joints in shear

Many bolted joints carry load perpendicular to the bolt axis: lap joints and splices, brackets, flanged couplings. They are designed in one of two ways.

A **bearing-type** joint lets the plates slip until the bolt shanks bear on the hole walls, and then each bolt is a pin in shear. For a joint with $n$ bolts, each sheared in $n_s$ planes, loaded by a force $F$ that the bolts share equally, three checks are made:
- shear of the bolt: $\tau = F/(n\,n_sA)$, with $A$ the shank area $\pi d^2/4$ if the shank lies in the shear plane, or the root area $A_r$ if the threads do;
- bearing on the bolt and plate: $\sigma_b = F/(n\,d\,t)$, with $t$ the thickness of the thinnest plate;
- tension on the net section of the plate (gross width minus the holes), and tear-out of the plate edge behind the last bolt, which is why minimum edge distances are specified (at least $1.2$ times the hole diameter in EN 1993-1-8).

A **friction-grip** (slip-resistant) joint uses high-strength preloaded bolts so that the load is carried by friction between the faying surfaces and no slip occurs. The slip load is
$$
F_\text{slip} = \mu\,n_s\sum F_i,
$$ {#eq-slip}
with $\mu$ the slip factor of the prepared surfaces and $n_s$ the number of friction interfaces. EN 1090-2 classifies surface preparations with slip factors from $0.2$ (untreated) to $0.5$ (blasted). Friction-grip joints are used under fatigue or reversing loads, where slip would cause fretting and self-loosening, and where alignment must be kept.

A bolt group loaded eccentrically in its plane, as in a bracket bolted to a column, is analysed exactly like the weld group of the next section: each bolt carries an equal share of the direct shear plus a share of the moment proportional to its distance from the centroid of the group.

## Welded joints

Welding fuses the parts into one. It is cheaper and lighter than bolting for permanent joints, it seals, and it allows complex structures to be built up from plate; but it puts heat into the parts, so welds have residual stresses near yield, distortion, a heat-affected zone with altered properties, and possible defects — porosity, slag inclusions, lack of fusion, cracks — that are hard to see. The processes and their hazards (arc radiation, fumes, burns, fire, electric shock) are covered in [[manufacturing/joining]]; welding is done only by trained welders with proper equipment and supervision, and welds in structures and pressure equipment are made and inspected to qualified procedures.

::: definition Butt and fillet welds {#def-welds}
- A **butt weld** (groove weld) joins two parts edge to edge and, with full penetration, restores the full section; it is designed with the same stresses as the parent plate, on the thinner plate's section.
- A **fillet weld** joins two surfaces at an angle, usually $90°$, with an approximately triangular section. Its **leg** (size) $h$ is the side of the largest right isosceles triangle that fits in the section, and its **throat** $t$ is the height of that triangle measured from the root,
$$
t = h\cos45° = 0.707\,h.
$$
The **throat area** of a weld of effective length $l$ is $0.707\,hl$, and the conventional design stress in a fillet weld is the force divided by the throat area, treated as a shear stress whatever the direction of the load.
:::

The real stress field in a fillet weld is complicated: the load passes through the weld at an angle, there are stress concentrations at the root and the toe, and a weld loaded transversely is noticeably stronger than one loaded along its length (by roughly 20–50 %, depending on the code's model). Design codes recognise this in different ways but all start from the force per unit length of weld divided by the throat. Two widely used approaches:

- **Allowable-stress design (AWS D1.1, AISC).** The shear stress on the throat of a fillet weld must not exceed $0.30\,S_{ut}$ of the **electrode** (filler metal), regardless of load direction; the adjacent base metal is checked separately. For an E70xx electrode ($S_{ut} = 482\ \mathrm{MPa}$, Budynas and Nisbett, Table 9-3) the allowable throat stress is $0.30\times482 = 145\ \mathrm{MPa}$.
- **Limit-state design (EN 1993-1-8).** The **directional method** resolves the stresses on the throat plane into a normal stress $\sigma_\perp$ and shear stresses $\tau_\perp$, $\tau_\parallel$ and requires $\sqrt{\sigma_\perp^2 + 3(\tau_\perp^2 + \tau_\parallel^2)} \le f_u/(\beta_w\gamma_{M2})$ and $\sigma_\perp \le 0.9f_u/\gamma_{M2}$, with factored loads, where $f_u$ is the tensile strength of the weaker part joined, $\beta_w$ a correlation factor ($0.8$ for S235 up to $0.9$ for S355) and $\gamma_{M2}$ the partial factor ($1.25$ recommended). The **simplified method** uses only the force per unit length on the throat with the design shear strength $f_{vw,d} = f_u/(\sqrt3\,\beta_w\gamma_{M2})$, which is conservative for transverse welds.

The two systems must not be mixed: allowable stresses go with service (unfactored) loads, limit-state resistances with factored loads.

### Weld groups under eccentric load

A bracket welded to a column and loaded off the weld group's centroid is loaded by a direct shear force and a twisting moment in the plane of the welds. The usual elastic analysis treats the welds as thin lines of throat thickness $0.707h$.

::: proposition Stresses in a weld group under in-plane eccentric load {#prop-weld-group}
Let a group of fillet welds, all of leg $h$, with total length $L$ and centroid $G$, carry an in-plane force $V$ whose line of action lies at distance $e$ from $G$, so that $M = Ve$. Then the throat stress at a point of the weld at distance $r$ from $G$ is the vector sum of
$$
\tau' = \frac{V}{A}\ \ (\text{parallel to } V), \qquad \tau'' = \frac{Mr}{J}\ \ (\text{perpendicular to the radius } r),
$$ {#eq-weld-group}
where $A = 0.707\,hL$ is the total throat area and $J = 0.707\,h\,J_u$, with $J_u = \int r^2\,ds$ the **unit polar moment** of the weld lines about $G$.
:::

::: proof
**Assumptions.** The part being joined (the bracket) is rigid; the welds are linear-elastic and thin compared with the group's dimensions, so each weld element carries a force per unit length acting in the plane of the joint and uniform across its throat; the column is rigid.

**Superposition.** Replace $V$ by a force $V$ at $G$ plus a couple $M = Ve$. Under the force at $G$ the rigid bracket translates parallel to $V$; every weld element is sheared by the same amount, so the stress is uniform, and equilibrium gives $\tau'A = V$.

**Rotation.** Under the couple the bracket rotates by a small angle $\theta$ about $G$; rotation about the centroid is the one that produces no resultant force, because the first moment of the throat area about its own centroid is zero. An element at radius $r$ is displaced by $r\theta$ perpendicular to $r$, so its stress is $\tau'' = c\,r$ in that direction, with $c$ a constant. Equilibrium of moments about $G$:
$$
M = \int \tau''\,r\,(0.707h\,ds) = c\,0.707h\int r^2\,ds = c\,J, \qquad c = \frac{M}{J},
$$
which gives $\tau'' = Mr/J$. The resultant stress at any point is the vector sum of $\tau'$ and $\tau''$ at that point.
:::

$J_u$ is computed from the weld lines like the polar moment of a thin ring section, using the parallel-axis theorem. For a single straight weld of length $d$, $J_u = d^3/12$ about its midpoint. For two parallel welds of length $d$ a distance $b$ apart (centroid midway), $J_u = d(3b^2 + d^2)/6$; for a closed rectangle $b \times d$, $J_u = (b + d)^3/6$ (Budynas and Nisbett, Table 9-1). The largest resultant stress occurs at the weld point farthest from $G$ on the side where $\tau''$ and $\tau'$ reinforce.

::: example A welded bracket {#ex-weld-group}
A steel bracket is welded to a column by two vertical fillet welds, each $d = 120\ \mathrm{mm}$ long, $b = 100\ \mathrm{mm}$ apart, with leg $h = 8\ \mathrm{mm}$. A downward load $V = 25\ \mathrm{kN}$ acts $e = 200\ \mathrm{mm}$ to the right of the centroid of the weld group. The electrode is E70xx. Find the largest throat stress and the smallest leg that meets the AWS allowable.
::: solution
**Free-body diagram.** The bracket carries the load $V$ downward at $200\ \mathrm{mm}$ from $G$; the welds exert on it an upward resultant $V$ and an anticlockwise couple $M = Ve$. Axes: $x$ to the right, $y$ upward, origin at $G$.

**Section properties.** $A = 1.414\,hd = 1.414\times8\times120 = 1357\ \mathrm{mm^2}$.
$$
J_u = \frac{d(3b^2 + d^2)}{6} = \frac{120\times(30\,000 + 14\,400)}{6} = 888\,000\ \mathrm{mm^3}, \qquad J = 0.707\times8\times888\,000 = 5.023\times10^6\ \mathrm{mm^4}.
$$
**Stresses.** $M = 25\,000\times200 = 5.0\times10^6\ \mathrm{N\,mm}$. Primary shear, on the bracket upward: $\tau' = 25\,000/1357 = 18.4\ \mathrm{MPa}$. The critical points are the top and bottom of the right-hand weld, at $(50, \pm60)\ \mathrm{mm}$, $r = 78.1\ \mathrm{mm}$, where the anticlockwise couple's stress has an upward component. At $(50, 60)$:
$$
\tau''_x = -\frac{M\,y}{J} = -\frac{5\times10^6\times60}{5.023\times10^6} = -59.7\ \mathrm{MPa}, \qquad \tau''_y = \frac{M\,x}{J} = \frac{5\times10^6\times50}{5.023\times10^6} = 49.8\ \mathrm{MPa}.
$$
Total: $\tau_x = -59.7$, $\tau_y = 18.4 + 49.8 = 68.2\ \mathrm{MPa}$, so
$$
\tau_{\max} = \sqrt{59.7^2 + 68.2^2} = 90.7\ \mathrm{MPa}.
$$
**Allowable.** $0.30\times482 = 144.6\ \mathrm{MPa}$, so the $8\ \mathrm{mm}$ weld has a margin of $144.6/90.7 = 1.59$. Since all stresses scale as $1/h$, the smallest leg is $8\times90.7/144.6 = 5.0\ \mathrm{mm}$; a $6\ \mathrm{mm}$ weld would be specified, subject to the code's minimum fillet size for the plate thickness and a check of the base metal in shear.

**Sanity check.** The moment dominates: $\tau'' = Mr/J = 77.8\ \mathrm{MPa}$, four times the direct shear, as expected for an eccentricity ($200\ \mathrm{mm}$) larger than the weld group itself. Moving the load in to $e = 0$ would leave only $18.4\ \mathrm{MPa}$.
:::
:::

### Fatigue of welded joints

Welded joints are the weak link of fatigue-loaded structures, for three reasons. The weld toe is a sharp geometric notch, often with tiny undercuts or slag intrusions that act as ready-made cracks, so there is almost no crack-initiation life. Welding leaves tensile residual stresses of the order of the yield strength near the weld, so the *local* stress cycle is near yield at its top whatever the nominal mean stress. And as a result the fatigue strength of a welded detail is essentially **independent of the strength of the steel**: a high-strength steel buys static strength but no extra fatigue strength at a weld.

Codes therefore classify welded details by geometry, not material, and give their fatigue strength as a **stress-range** curve that ignores the mean stress. In EN 1993-1-9 (and similarly in the IIW recommendations edited by Hobbacher) each detail is assigned a **detail category** — the stress range $\Delta\sigma_C$ in MPa that it endures for $2\times10^6$ cycles — from $160$ for plain rolled plate down to $36$ for the worst welded details; the S–N curves have slope $m = 3$ on log–log axes (life proportional to $\Delta\sigma^{-3}$) down to a constant-amplitude fatigue limit at $5\times10^6$ cycles. Full-penetration butt welds ground flush rank near the top of the welded categories; load-carrying fillet welds, attachments ending in a fillet weld and cover-plate ends rank near the bottom. In a machine-design calculation in the style of [[machine-design/fatigue]], Budynas and Nisbett instead apply fatigue stress concentration factors to the nominal throat stress ($1.2$ at a reinforced butt weld, $1.5$ at the toe of a transverse fillet weld, $2.7$ at the end of a parallel fillet weld, $2.0$ at a T-butt joint with sharp corners).

The practical consequences: put welds in regions of low stress range where possible, avoid fillet welds that carry the main load across the joint in fatigue-critical members, end attachments with smooth tapers, and improve critical welds by toe grinding, TIG dressing or peening, which remove the toe defects and (for peening) the tensile residual stress.

## Adhesive joints

A bonded joint transmits load by shear through a thin adhesive layer over a large area. It joins dissimilar and thin materials without holes or heat, seals and damps, and spreads the load — in principle. In practice the load transfer is far from uniform, because the adherends stretch.

::: proposition Volkersen's shear-lag solution {#prop-volkersen}
In a lap joint of overlap length $l$ and width $b$ between two identical adherends of thickness $t$ and modulus $E$, bonded by an adhesive layer of thickness $t_a$ and shear modulus $G_a$, under a tensile force $F$, the adhesive shear stress at distance $x$ from the middle of the overlap is
$$
\tau(x) = \tau_\text{avg}\,\frac{\omega l}{2}\,\frac{\cosh\omega x}{\sinh(\omega l/2)}, \qquad \tau_\text{avg} = \frac{F}{bl}, \qquad \omega^2 = \frac{2G_a}{E\,t\,t_a},
$$
and its maximum, at the ends of the overlap, is
$$
\frac{\tau_{\max}}{\tau_\text{avg}} = \frac{\omega l}{2}\coth\frac{\omega l}{2}.
$$ {#eq-volkersen}
:::

::: proof
**Assumptions.** The adherends are in uniform tension through their thickness (no bending); the adhesive carries only shear, uniform through its thickness, and is linear-elastic; everything is uniform across the width.

Let adherend 1 enter the overlap from the left at $x = -l/2$ carrying the force per unit width $q = F/b$ and end at $x = l/2$; adherend 2 starts at $x = -l/2$ and leaves to the right carrying $q$. Let $N_1(x)$ and $N_2(x)$ be their forces per unit width and $u_1$, $u_2$ their displacements. The adhesive shear stress is $\tau = G_a(u_2 - u_1)/t_a$.

**Equilibrium.** A slice $dx$ of adherend 1 has $N_1$ at each end and the adhesive shear $\tau\,dx$ on its face, so $dN_1/dx = -\tau$; likewise $dN_2/dx = +\tau$, and $N_1 + N_2 = q$ throughout.

**Elasticity.** $du_1/dx = N_1/(Et)$, $du_2/dx = N_2/(Et)$. Differentiating $\tau$,
$$
\frac{d\tau}{dx} = \frac{G_a}{t_aEt}(N_2 - N_1), \qquad \frac{d^2\tau}{dx^2} = \frac{G_a}{t_aEt}(\tau + \tau) = \omega^2\tau.
$$
**Solution.** The boundary conditions ($N_1 = q$, $N_2 = 0$ at $x = -l/2$ and the reverse at $x = l/2$) are symmetric, so $\tau = A\cosh\omega x$. The adhesive must transfer the whole force: $\int_{-l/2}^{l/2}\tau\,dx = q$, giving $2A\sinh(\omega l/2)/\omega = q$ and $A = q\omega/[2\sinh(\omega l/2)]$. (One checks that this also satisfies $d\tau/dx = \omega^2q/2$ at $x = l/2$, which is the elastic condition there.) With $\tau_\text{avg} = q/l$ this is the stated distribution, and its value at $x = \pm l/2$ gives [[#eq-volkersen]].

**Limits.** For $\omega l \to 0$ (rigid adherends or a very soft adhesive), $(\omega l/2)\coth(\omega l/2) \to 1$: uniform shear. For large $\omega l$ the ratio tends to $\omega l/2$, and $\tau_{\max} \to q\omega/2$, independent of $l$.
:::

That last limit is the practical message. Beyond an overlap of a few times $1/\omega$, the middle of the joint carries almost nothing, and making the overlap longer does not lower the peak stress at its ends. For example, aluminium adherends $2\ \mathrm{mm}$ thick ($E = 70\ \mathrm{GPa}$) bonded with a $0.2\ \mathrm{mm}$ layer of an adhesive with an assumed shear modulus of $1\ \mathrm{GPa}$ have $\omega = 0.267\ \mathrm{mm^{-1}}$; a $25\ \mathrm{mm}$ overlap has $\omega l = 6.7$ and a peak-to-average ratio of $3.35$. Volkersen's analysis neglects the bending of a single-lap joint, whose load path is offset by the adherend thickness; Goland and Reissner's analysis of 1944 added it and showed that it produces **peel** (through-thickness tensile) stresses at the overlap ends, to which adhesives are especially weak. Good bonded joints therefore keep the adhesive in shear and compression, avoid peel (double-lap, scarf and stepped joints, tapered adherend ends, fillets of adhesive at the overlap ends), and are designed with strengths from tests of the actual adhesive, surface preparation and environment — moisture and temperature degrade many adhesives considerably.

::: history
Joseph Whitworth's paper "On an uniform system of screw threads" (1841) proposed a single series of British threads with a $55°$ angle and rounded crests and roots, which became the British Standard Whitworth thread. In 1864 William Sellers proposed to the Franklin Institute in Philadelphia a $60°$ thread with flat crests and roots that could be cut and measured more easily; it became the United States standard, and in 1948 the United States, the United Kingdom and Canada agreed on the Unified inch thread based on it. The ISO metric thread uses the same $60°$ basic profile; ISO issued it as recommendation ISO/R 68 in 1958, and as the standard ISO 68 in 1973. On the analysis of joints, O. Volkersen's shear-lag analysis of 1938, made for riveted joints, became the basis of adhesive-joint stress analysis, and M. Goland and E. Reissner added the bending and peel stresses of single-lap joints in 1944. Gerhard Junker's 1969 SAE paper on the self-loosening of fasteners under vibration introduced the transverse-vibration test that bears his name. The VDI guideline 2230 on the systematic calculation of high-duty bolted joints appeared in the 1970s (editions of 1974 and 1977) and, revised, is now the most complete calculation standard for bolted joints; J. H. Bickford's *An Introduction to the Design and Behavior of Bolted Joints* is the standard English-language book on the subject.
:::

::: quiz
A preloaded bolted joint has $C = 0.2$. The external load on one bolt rises from $0$ to $10\ \mathrm{kN}$ and the joint stays closed. By how much does the bolt force rise?
- [ ] $10\ \mathrm{kN}$
- [ ] $8\ \mathrm{kN}$
- [x] $2\ \mathrm{kN}$
- [ ] It does not change, because the preload carries the load.
::: solution
By [[#eq-sharing]], $\Delta F_b = CP = 0.2\times10 = 2\ \mathrm{kN}$; the other $8\ \mathrm{kN}$ is taken by a reduction of the clamping force between the members. The bolt force does change — only a small part of the load reaches it.
:::
:::

::: quiz
A fatigue-loaded welded bracket in S235 steel keeps cracking at the toe of a fillet weld. Which change is *least* likely to help?
- [ ] Moving the weld to a region of lower stress range.
- [ ] Grinding or peening the weld toe.
- [x] Making the bracket from a higher-strength steel of the same thickness.
- [ ] Redesigning the detail so that the fillet weld does not carry the main load.
::: solution
The fatigue strength of a welded detail is set by the toe geometry and the near-yield residual stresses, and is essentially independent of the parent steel's strength; the detail categories of EN 1993-1-9 are the same for all structural steels. The other three changes lower the stress range at the toe or improve the toe itself.
:::
:::

::: summary
- ISO metric threads M$d\times p$: stresses and strengths are based on the tensile stress area $A_t = \tfrac{\pi}{4}(d - 0.9382p)^2$; bolt strength is given by ISO 898-1 property classes, with the proof strength $S_p$ as the design value.
- Preload $F_i \approx 0.75F_p$ (reusable) or $0.90F_p$ (permanent), $F_p = A_tS_p$. Torque $T = KF_id$ with $K \approx 0.2$; about 90 % of the torque overcomes friction, so friction scatter gives preload scatter.
- Bolt stiffness from shank and thread in series; member stiffness from pressure cones ([[#prop-frustum]]); joint constant $C = k_b/(k_b + k_m)$, typically $0.15$–$0.3$ for steel joints without gaskets.
- Closed joint: $F_b = F_i + CP$, $F_m = (1 - C)P - F_i$; separation at $P_0 = F_i/(1 - C)$ ([[#prop-sharing]]). Static factors $n_p$, $n_L$, $n_0$.
- Fatigue: $\sigma_a = CP/(2A_t)$, load line from $(\sigma_i, 0)$ at $45°$, Goodman with fully corrected $S_e$ for rolled threads; endurable amplitudes are only about $40$–$60\ \mathrm{MPa}$, so keeping $C$ small and the joint closed is everything.
- Shear joints: bearing type (shear, bearing, net section) or friction grip, $F_\text{slip} = \mu n_s\sum F_i$.
- Fillet welds: throat $0.707h$, force over throat area as shear; weld groups by direct plus torsional shear $Mr/J$ with $J = 0.707hJ_u$. Allowable stress or limit-state rules; weld fatigue by detail category, independent of steel strength.
- Adhesive lap joints: shear concentrates at the overlap ends, $\tau_{\max}/\tau_\text{avg} = (\omega l/2)\coth(\omega l/2)$; avoid peel.
:::

## Exercises

::: exercise Proof load {level=1 check="203.35"}
Find the proof load of an M20 × 2.5 bolt of property class 10.9 ($A_t = 245\ \mathrm{mm^2}$). (Enter the proof load in kN.)
::: solution
$S_p = 830\ \mathrm{MPa}$, so $F_p = A_tS_p = 245\times830 = 203\,350\ \mathrm{N} = 203.35\ \mathrm{kN}$, $1.38$ times the proof load of the class 8.8 bolt of [[#ex-preload]]. For a reusable joint the preload would be $0.75\times203.35 = 152.5\ \mathrm{kN}$.
:::
:::

::: exercise Tightening torque {level=1 check="120"}
An M12 bolt is to be tightened to a preload of $50\ \mathrm{kN}$. Using $T = KF_id$ with $K = 0.2$, find the torque. (Enter the torque in N·m.)
::: solution
$T = 0.2\times50\,000\ \mathrm{N}\times0.012\ \mathrm{m} = 120\ \mathrm{N\,m}$. Check: $A_t = 84.3\ \mathrm{mm^2}$, so the preload stress is $593\ \mathrm{MPa}$, about $0.71S_p$ for class 10.9 or above $S_p = 580\ \mathrm{MPa}$ for class 8.8 — this preload needs a class 10.9 bolt.
:::
:::

::: exercise Bolt force under load {level=1 check="42"}
A joint has $k_b = 0.5\ \mathrm{kN/\mu m}$ and $k_m = 2.0\ \mathrm{kN/\mu m}$, and a preload of $40\ \mathrm{kN}$. Find the bolt force when an external tensile load of $10\ \mathrm{kN}$ is applied. (Enter the bolt force in kN.)
::: solution
$C = 0.5/(0.5 + 2.0) = 0.2$. The separation load is $P_0 = 40/0.8 = 50\ \mathrm{kN} > 10\ \mathrm{kN}$, so the joint is closed and $F_b = F_i + CP = 40 + 0.2\times10 = 42\ \mathrm{kN}$; the member force is $F_m = 0.8\times10 - 40 = -32\ \mathrm{kN}$. Check: $F_b + F_m = 10\ \mathrm{kN} = P$.
:::
:::

::: exercise Separation factor {level=2 check="3"}
A cylinder-head bolt has a preload of $36\ \mathrm{kN}$ and the joint constant is $C = 0.25$. The gas pressure produces a peak external load of $16\ \mathrm{kN}$ per bolt. Find the factor of safety against joint separation, $n_0$. (Enter $n_0$.)
::: solution
$n_0 = F_i/[P(1 - C)] = 36/(16\times0.75) = 36/12 = 3$. The joint opens at $P_0 = 36/0.75 = 48\ \mathrm{kN}$. If the preload were $25$ % lower because of friction scatter ($27\ \mathrm{kN}$), $n_0$ would fall to $2.25$ — the reason VDI 2230 checks the minimum preload against separation and the maximum against bolt strength.
:::
:::

::: exercise Side fillet welds {level=2 check="98.98"}
A flat bar is welded to a gusset plate by two parallel fillet welds, each $50\ \mathrm{mm}$ long, with leg $h = 10\ \mathrm{mm}$, loaded along their length. Taking the throat as $0.707h$ and an allowable throat shear stress of $140\ \mathrm{MPa}$, find the largest axial load. (Enter the load in kN.)
::: solution
Throat area $A = 0.707\times10\times(2\times50) = 707\ \mathrm{mm^2}$; $F = 140\times707 = 98\,980\ \mathrm{N} = 98.98\ \mathrm{kN}$. The bar itself must also be checked: a $10\ \mathrm{mm}$ bar carrying this load at an allowable tensile stress of, say, $150\ \mathrm{MPa}$ needs a width of at least $66\ \mathrm{mm}$, and parallel welds should be at least as long as the bar is wide so that the load spreads across it.
:::
:::

::: exercise Bolt fatigue {level=2 check="20"}
An M10 × 1.5 bolt of class 10.9 ($A_t = 58.0\ \mathrm{mm^2}$, $S_p = 830$, $S_{ut} = 1040\ \mathrm{MPa}$, rolled threads, $S_e = 162\ \mathrm{MPa}$) is preloaded to $0.75F_p$ in a joint with $C = 0.25$. The external load varies between $0$ and $9.28\ \mathrm{kN}$. Find the alternating stress in the bolt, then the Goodman fatigue factor and the separation factor. (Enter $\sigma_a$ in MPa.)
::: solution
$\sigma_a = CP/(2A_t) = 0.25\times9280/116 = 20.0\ \mathrm{MPa}$. Preload $F_i = 0.75\times58\times830 = 36.1\ \mathrm{kN}$, $\sigma_i = 622.5\ \mathrm{MPa}$. From [[#eq-bolt-goodman]], $S_a = 162\times(1040 - 622.5)/(1040 + 162) = 56.3\ \mathrm{MPa}$, $n_f = 56.3/20.0 = 2.81$. Separation: $n_0 = 36\,105/(9280\times0.75) = 5.19$. VDI 2230 gives $\sigma_{ASV} = 0.85\times(15 + 45) = 51\ \mathrm{MPa}$, $n_f = 2.55$.
:::
:::

::: exercise Friction-grip splice {level=2 check="240"}
A double-cover splice (two friction interfaces) in a steel tie uses four preloaded bolts, each with a preload of $100\ \mathrm{kN}$, on surfaces with slip factor $\mu = 0.3$. Find the slip load of the joint. (Enter the load in kN.)
::: solution
$F_\text{slip} = \mu n_s\sum F_i = 0.3\times2\times(4\times100) = 240\ \mathrm{kN}$. In a structural design to EN 1993-1-8 this characteristic value would be divided by a partial factor and the preload itself taken as $0.7f_{ub}A_s$; the bolts must also be checked in bearing in case the joint slips under an overload.
:::
:::

::: exercise Does more preload help fatigue? {level=3}
(a) Using [[#eq-bolt-goodman]], show that at fixed $\sigma_a$ the Goodman fatigue factor $n_f$ of a bolt *decreases* as the preload stress $\sigma_i$ increases. (b) Evaluate $n_f$ for the M20 class 8.8 bolt of [[#ex-bolt-fatigue]] ($\sigma_a = 18.2\ \mathrm{MPa}$) at $\sigma_i/S_p = 0.5$, $0.6$, $0.75$ and $0.9$. (c) Explain why designers nevertheless specify high preloads for fatigue-loaded joints.
::: solution
(a) $n_f = S_e(S_{ut} - \sigma_i)/[\sigma_a(S_{ut} + S_e)]$ is linear in $\sigma_i$ with slope $-S_e/[\sigma_a(S_{ut} + S_e)] < 0$. Geometrically, the load line starts further right on the $\sigma_m$ axis and meets the falling Goodman line lower.

(b) With $S_p = 600$, $S_{ut} = 830$, $S_e = 129\ \mathrm{MPa}$: $\sigma_i = 300, 360, 450, 540\ \mathrm{MPa}$ give $S_a = 71.3, 63.2, 51.1, 39.0\ \mathrm{MPa}$ and $n_f = 3.92, 3.47, 2.81, 2.14$ (computed with $\sigma_a = 18.2\ \mathrm{MPa}$).

(c) The Goodman calculation holds $\sigma_a$ fixed, i.e. assumes the joint stays closed. In service the decisive risks are (i) separation, after which $\sigma_a$ jumps from $CP/(2A_t)$ to $P/(2A_t)$ — 4.5 times larger in [[#ex-bolt-fatigue]]; (ii) preload loss by embedding of the surface roughness, relaxation and self-loosening, which a high initial preload tolerates; (iii) slip in the interface, which causes fretting and loosening. Test data also show (and VDI 2230 assumes for bolts rolled before heat treatment) that the endurable amplitude of a bolt is nearly independent of the mean stress, so the penalty in (a) is partly an artefact of the Goodman line. High preload is therefore the right choice, with the margin checked against yield during tightening.
:::
:::

::: exercise Overlap length of a bonded joint {level=3}
Two aluminium strips ($E = 70\ \mathrm{GPa}$, $t = 2\ \mathrm{mm}$) are bonded in a single-lap joint with an adhesive layer $t_a = 0.2\ \mathrm{mm}$ thick whose shear modulus is taken as $G_a = 1\ \mathrm{GPa}$. (a) Find $\omega$ and the ratio $\tau_{\max}/\tau_\text{avg}$ for overlaps of $12.5$, $25$ and $50\ \mathrm{mm}$. (b) For a given load, compare the peak shear stresses of the $25$ and $50\ \mathrm{mm}$ overlaps and comment. (c) What does Volkersen's model leave out, and how would you design the joint in practice?
::: solution
(a) $\omega^2 = 2G_a/(Ett_a) = 2\times1000/(70\,000\times2\times0.2) = 0.0714\ \mathrm{mm^{-2}}$, $\omega = 0.267\ \mathrm{mm^{-1}}$. $\omega l = 3.34$, $6.68$, $13.36$ and $(\omega l/2)\coth(\omega l/2) = 1.79$, $3.35$, $6.68$.

(b) $\tau_\text{avg}$ halves when $l$ doubles, but the ratio doubles: $\tau_{\max} = 3.35F/(25b)$ against $6.68F/(50b)$ — equal within 0.3 %. Beyond about $25\ \mathrm{mm}$ the extra overlap carries almost no load; $\tau_{\max} \to F\omega/(2b)$.

(c) It omits the bending of the single-lap joint (load-path eccentricity) and the resulting peel stresses at the overlap ends (Goland and Reissner), adhesive plasticity (which in tough adhesives spreads the load and makes longer overlaps somewhat useful) and environmental degradation. In practice: prefer double-lap or scarf joints, taper the adherend ends and leave adhesive fillets to reduce peel, prepare the surfaces as the adhesive supplier specifies, and base the strength on tests of the actual joint in the service environment, with a substantial factor of safety.
:::
:::

::: exercise Bolting a pressure-vessel cover {level=3}
A steel cover closes a cylinder of $300\ \mathrm{mm}$ bore containing a fluid at a pressure that cycles between $0$ and $2\ \mathrm{MPa}$. The seal is an O-ring, so the cover bears metal-to-metal on the flange; cover and flange are each $20\ \mathrm{mm}$ thick, and through-bolts can be placed on a $360\ \mathrm{mm}$ pitch circle. Propose the number, size and class of bolts, the preload and torque, and check separation, proof load and fatigue. Budynas and Nisbett suggest a bolt spacing on the pitch circle of between about $3$ and $6$ bolt diameters to keep the clamping pressure even. State what else a real design must satisfy.
::: solution
**Load.** $F = p\pi D^2/4 = 2\times\pi\times300^2/4 = 141.4\ \mathrm{kN}$ at peak pressure.

**Layout.** Try M10 class 8.8 bolts. Spacing $\pi\times360/(N\times10)$ between 3 and 6 requires $N \ge 19$; take $N = 20$ (spacing $5.65d$). Then $P = 141.4/20 = 7.07\ \mathrm{kN}$ per bolt.

**Preload and torque.** $A_t = 58.0\ \mathrm{mm^2}$, $S_p = 580\ \mathrm{MPa}$, $F_p = 33.6\ \mathrm{kN}$, $F_i = 0.75F_p = 25.2\ \mathrm{kN}$, $T = 0.2\times25\,230\times0.010 = 50\ \mathrm{N\,m}$ (dry, as-received).

**Stiffness.** With an M10 × 50 bolt (thread length $26\ \mathrm{mm}$), $l = 40$, $l_d = 24$, $l_t = 16\ \mathrm{mm}$: $k_b = 0.356\times10^6\ \mathrm{N/mm}$; [[#eq-km]] gives $k_m = 1.75\times10^6\ \mathrm{N/mm}$; $C = 0.169$.

**Static.** $n_0 = 25.23/(7.07\times0.831) = 4.3$; $n_L = (33.64 - 25.23)/(0.169\times7.07) = 7.0$; $n_p = 1.27$.

**Fatigue.** $\sigma_a = 0.169\times7069/(2\times58) = 10.3\ \mathrm{MPa}$. VDI 2230 [[#eq-vdi]]: $\sigma_{ASV} = 0.85\times(15 + 45) = 51\ \mathrm{MPa}$, $n_f \approx 5$. (Budynas and Nisbett's tabulated $S_e$ for class 8.8 starts at M16; class 9.8 or 10.9 values could be used instead.)

**Judgement.** Twenty M10 class 8.8 bolts, $F_i \approx 25\ \mathrm{kN}$, about $50\ \mathrm{N\,m}$ with a stated lubrication condition, are ample; fewer, larger bolts would fail the spacing guideline. A real design must follow the pressure-equipment code that applies (for example EN 13445 or the ASME Boiler and Pressure Vessel Code, Section VIII), which sets allowable bolt stresses, flange and cover thickness (cover bending and flange rotation, which this model ignores) and test requirements, and must consider minimum preload with tightening scatter, temperature, corrosion and the hazard of stored pressure energy during testing and maintenance.
:::
:::
