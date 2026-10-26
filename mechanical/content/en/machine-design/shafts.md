A shaft is the backbone of almost every machine that transmits power by rotation. It carries the gears, pulleys, sprockets, impellers and rotors that put torque into it or take torque out, and it is held in position by bearings that react the forces those elements produce. A gearbox shaft, a pump shaft, a machine-tool spindle and a car's drive shaft all do the same job: they twist under the torque they transmit, bend under the transverse forces of the elements they carry, and rotate, so that every point on their surface passes through tension and compression once per revolution.

Three things can go wrong, and a shaft design must check all three. The shaft can break, almost always by fatigue starting at a shoulder fillet, keyseat or groove where the bending stress is concentrated. It can deflect too much, so that gears mesh badly, bearings run misaligned and seals leak, long before it is anywhere near breaking. And it can whirl: at certain speeds, the critical speeds, small out-of-balance forces build up a large bow in the rotating shaft. This chapter treats the three in turn, after the layout decisions that fix where the stress raisers and loads are, and ends with the keys, couplings and interference fits that join the shaft to the elements it drives.

The fatigue method used here is that of [[machine-design/fatigue]]: Marin factors for the endurance limit, $K_f$ and $K_{fs}$ for notches, the von Mises combination of alternating and mean stresses, and the Goodman, Gerber and ASME-elliptic criteria. Deflections use the beam theory of [[mechanics-of-materials/beam-deflection]], and critical speeds connect to [[vibrations/vibration-fundamentals]] and [[vibrations/continuous-systems]]. Notation follows Budynas and Nisbett, *Shigley's Mechanical Engineering Design* (11th edition), whose Chapter 7 is the basis of the method.

## Shaft layout

::: definition Shaft, axle and spindle {#def-shaft}
A **shaft** is a rotating member, usually of circular cross-section, that transmits power, and therefore torque. An **axle** carries rotating elements such as wheels but transmits no torque; it may rotate (a railway wheelset axle) or be stationary (the axle of a trailer wheel). A **spindle** is a short shaft, typically of a machine tool, where stiffness and running accuracy matter more than strength.
:::

Most of the important decisions about a shaft are taken before any stress is calculated, when the layout is drawn. A typical gearbox shaft is a stepped cylinder. Each element sits on a seat of its own diameter, and the steps between seats form **shoulders** against which gears and bearings are located axially. The diameters usually grow from the ends towards the middle, so that each element can be slid on from one end over the smaller seats and pressed against its shoulder. Elements are held against the shoulders by spacer sleeves, retaining rings (circlips) in grooves, locknuts on threaded ends, or the hub of the next element.

The layout decides the loads and the stresses through a few rules that experienced designers follow:

- **Keep the shaft short and the overhangs small.** Bending moments, deflections and slopes all grow quickly with the span: the deflection under a central load grows as $l^3$. Gears and pulleys should sit close to the bearings, and an overhung pulley or impeller should be as near the bearing as possible.
- **Use two bearings where possible.** A shaft on two bearings is statically determinate; a third bearing makes the reactions depend on alignment and housing stiffness, which are uncertain.
- **Locate the shaft axially at one bearing only.** One bearing, the **fixed** (locating) bearing, is clamped axially on the shaft and in the housing and takes the axial loads in both directions. The other, the **floating** bearing, is free to slide axially, in the housing or (for cylindrical roller bearings) within the bearing itself, so that thermal expansion of the shaft relative to the housing does not load the bearings axially. A steel shaft $300\ \mathrm{mm}$ long that runs $40\ \mathrm{K}$ warmer than its housing grows by about $12\times10^{-6}\times300\times40 = 0.14\ \mathrm{mm}$ — ample to overload a bearing pair that is clamped at both ends. Short shafts with small temperature differences are sometimes mounted cross-located instead, each bearing taking thrust in one direction.
- **Put stress raisers where the moment is small.** Retaining-ring grooves, threads and keyseat ends concentrate stress strongly; near the ends of a simply supported shaft, where the moment falls to zero, they cost little.
- **Respect the bearing maker's abutment dimensions.** The shoulder must be high enough to support the bearing ring, and the fillet radius must be smaller than the bearing's corner chamfer, so that the bearing seats squarely. When this forces a small, sharp fillet, a relief groove or a separate shoulder ring can be used.

Shafts are usually made of medium-carbon steel, cold-drawn for smaller sizes and turned from hot-rolled bar for larger ones: AISI 1040–1050 or EN C45 for ordinary duty, alloy steels such as 4140 (42CrMo4) where strength must be higher, and case-hardened steels where a shaft forms its own bearing or gear surface. One fact shapes the choice: Young's modulus is about $207\ \mathrm{GPa}$ for all of them. An alloy steel buys strength, not stiffness, so a shaft whose size is set by deflection gains nothing from it.

### Loads on the shaft

::: definition Torque transmitted {#def-torque}
A shaft transmitting power $P$ at angular speed $\omega$ carries the torque
$$
T = \frac{P}{\omega}, \qquad \omega = \frac{2\pi n}{60}\ \ (n\ \text{in rpm}),
$$ {#eq-torque}
so that $T\,[\mathrm{N\,m}] = 9549\,P\,[\mathrm{kW}]/n\,[\mathrm{rpm}]$. The torque acts only on the portion of the shaft between the element that puts power in and the element that takes it out.
:::

The torque is turned into transverse forces by the elements on the shaft. A spur gear of pitch diameter $d_p$ and pressure angle $\phi$ carries a tangential force $W_t = 2T/d_p$ and a radial (separating) force $W_r = W_t\tan\phi$; helical and bevel gears add an axial force, which the fixed bearing must take (the forces are derived in [[machine-design/gear-design]]). A belt pulley is pulled towards the other pulley by the sum of the belt tensions $F_1 + F_2$, which can be several times the net driving force $F_1 - F_2$ ([[machine-design/clutches-brakes-belts]]). Each force is resolved into two perpendicular planes containing the shaft axis, the shear-force and bending-moment diagrams are drawn in each plane, and the two moments are combined as a vector:
$$
M = \sqrt{M_{xy}^2 + M_{xz}^2}.
$$ {#eq-resultant}
This is legitimate for a round shaft: the bending stress at the surface depends only on the magnitude of the moment vector, not on its direction, and the shaft rotates through every direction anyway. Note that the resultant moment is not, in general, largest where either component is largest, so it is evaluated at every candidate section.

::: example Loads on a gear shaft {#ex-loads}
A countershaft transmits $11\ \mathrm{kW}$ at $600\ \mathrm{rpm}$. Power enters through a flexible coupling on an overhung end to the left of bearing $A$ and leaves through a spur gear (pitch diameter $200\ \mathrm{mm}$, module $4\ \mathrm{mm}$, pressure angle $20°$) that sits $120\ \mathrm{mm}$ from $A$. Bearing $B$ is $300\ \mathrm{mm}$ from $A$. The gear seat has a keyseat, and a shoulder for the gear is at $100\ \mathrm{mm}$ from $A$. Find the torque, the gear forces, the bearing reactions, and the bending moment at the gear and at the shoulder.
::: solution
**Torque.** $\omega = 2\pi\times600/60 = 62.83\ \mathrm{rad/s}$, $T = 11\,000/62.83 = 175.1\ \mathrm{N\,m}$. It acts between the coupling and the gear.

**Gear forces.** $W_t = 2T/d_p = 2\times175.1/0.200 = 1751\ \mathrm{N}$; $W_r = 1751\tan20° = 637\ \mathrm{N}$. They lie in perpendicular planes and act at the same section, so their resultant $F = \sqrt{1751^2 + 637^2} = 1863\ \mathrm{N}$ can be treated as one transverse force (any orientation of the plane of $F$ gives the same moment magnitudes).

**Free-body diagram.** The shaft is a simple beam of span $l = 300\ \mathrm{mm}$: the force $F$ at $a = 120\ \mathrm{mm}$ from $A$ ($b = 180\ \mathrm{mm}$ from $B$), and reactions $R_A$ and $R_B$ opposing it at the bearings. The coupling transmits torque only. Moments about $B$ and $A$:
$$
R_A = \frac{Fb}{l} = \frac{1863\times180}{300} = 1118\ \mathrm{N}, \qquad R_B = \frac{Fa}{l} = \frac{1863\times120}{300} = 745\ \mathrm{N}.
$$

**Moments.** At the gear, $M = R_Aa = 1118\times0.120 = 134.1\ \mathrm{N\,m}$; at the shoulder, $M = R_A\times0.100 = 111.8\ \mathrm{N\,m}$.

**Sanity check.** $R_A + R_B = 1863\ \mathrm{N} = F$. The bearing nearer the gear takes the larger share, as it should. Both critical sections, the keyseat at the gear and the shoulder fillet, carry the full torque and most of the maximum moment.
:::
:::

## Stresses at a critical section

A shaft that turns under gear or belt forces fixed in space sees a bending moment whose direction is fixed while the material turns through it. A point on the surface therefore passes from the tension side to the compression side and back once per revolution: the bending stress is **fully reversed**, with amplitude equal to the static bending stress, even though the moment itself is constant. The torque from a steady power flow is steady. The usual case is therefore rotating bending plus steady torsion, but the method below allows both to have alternating and mean parts (a reciprocating engine, for example, produces a strongly fluctuating torque).

::: definition Alternating and mean shaft loads {#def-components}
At a section of a rotating shaft, let $M_a$ and $M_m$ be the alternating and mean bending moments seen by a surface point, and $T_a$ and $T_m$ the alternating and mean torques. With $K_f$ and $K_{fs}$ the fatigue stress-concentration factors of the section in bending and torsion, the surface stresses of a solid round shaft of diameter $d$ are
$$
\sigma_a = K_f\frac{32M_a}{\pi d^3}, \quad \sigma_m = K_f\frac{32M_m}{\pi d^3}, \quad \tau_a = K_{fs}\frac{16T_a}{\pi d^3}, \quad \tau_m = K_{fs}\frac{16T_m}{\pi d^3}.
$$ {#eq-stresses}
For a steady transverse load on a rotating shaft, $M_a = M$ and $M_m = 0$; for a steady torque, $T_m = T$ and $T_a = 0$.
:::

Axial stresses from helical-gear thrust or the weight of a vertical shaft are usually small compared with the bending stress and are left out, as in [[#eq-stresses]]; when they are not, they are added to $\sigma_m$ (a steady axial load on a rotating shaft is a mean stress). Transverse shear stress is zero at the surface where the bending stress is greatest and is also ignored, except for short, heavily loaded shafts.

::: proposition The DE-Goodman shaft equations {#prop-de-goodman}
Under the assumptions listed in the proof, the factor of safety for infinite life of a solid round shaft of diameter $d$ is given by
$$
\frac1n = \frac{16}{\pi d^3}\left\{\frac{1}{S_e}\left[4(K_fM_a)^2 + 3(K_{fs}T_a)^2\right]^{1/2} + \frac{1}{S_{ut}}\left[4(K_fM_m)^2 + 3(K_{fs}T_m)^2\right]^{1/2}\right\},
$$ {#eq-de-goodman}
and the diameter needed for a design factor $n$ is
$$
d = \left(\frac{16n}{\pi}\left\{\frac{1}{S_e}\left[4(K_fM_a)^2 + 3(K_{fs}T_a)^2\right]^{1/2} + \frac{1}{S_{ut}}\left[4(K_fM_m)^2 + 3(K_{fs}T_m)^2\right]^{1/2}\right\}\right)^{1/3}.
$$ {#eq-de-goodman-d}
These are equations 7-7 and 7-8 of Budynas and Nisbett.
:::

::: proof
**Assumptions.** (i) The critical point is on the surface of a solid round section and carries only a bending stress $\sigma$ and a torsional shear stress $\tau$ (axial and transverse-shear stresses neglected). (ii) The bending and torsional components are in phase, so that the alternating and mean parts may each be combined into a von Mises equivalent stress, as in the combined-loading algorithm of [[machine-design/fatigue]]. (iii) Failure for infinite life is governed by the modified Goodman line through $S_e$ and $S_{ut}$, with $S_e$ evaluated for bending ($k_c = 1$). (iv) All stresses grow in proportion when the loads are increased by the factor $n$ (a radial load line). (v) The material is ductile and isotropic, and $K_f$, $K_{fs}$ apply to the stresses.

**Equivalent stresses.** For a plane state with one normal stress $\sigma$ and one shear stress $\tau$, the von Mises stress is $\sigma' = (\sigma^2 + 3\tau^2)^{1/2}$. Applying this separately to the alternating and the mean parts of [[#eq-stresses]]:
$$
\sigma_a' = \left[\left(\frac{32K_fM_a}{\pi d^3}\right)^2 + 3\left(\frac{16K_{fs}T_a}{\pi d^3}\right)^2\right]^{1/2} = \frac{16}{\pi d^3}\left[4(K_fM_a)^2 + 3(K_{fs}T_a)^2\right]^{1/2},
$$
since $32 = 2\times16$ puts a factor $4$ inside the bracket; likewise $\sigma_m' = \dfrac{16}{\pi d^3}\left[4(K_fM_m)^2 + 3(K_{fs}T_m)^2\right]^{1/2}$.

**Goodman.** With a radial load line the Goodman factor of safety is $1/n = \sigma_a'/S_e + \sigma_m'/S_{ut}$. Substituting the two equivalent stresses and taking out the common factor $16/(\pi d^3)$ gives [[#eq-de-goodman]]. Solving it for $d^3$ and taking the cube root gives [[#eq-de-goodman-d]].
:::

The name "DE-Goodman" records the two ingredients: the distortion-energy (von Mises) theory for combining bending and torsion, and the Goodman line for the mean stress. Replacing the Goodman line by the other criteria of [[machine-design/fatigue]] gives the companion equations (Budynas and Nisbett, §7-4). Write
$$
A = \left[4(K_fM_a)^2 + 3(K_{fs}T_a)^2\right]^{1/2}, \qquad B = \left[4(K_fM_m)^2 + 3(K_{fs}T_m)^2\right]^{1/2}.
$$
Then

$$
\text{DE-Gerber:}\quad \frac1n = \frac{8A}{\pi d^3S_e}\left\{1 + \left[1 + \left(\frac{2BS_e}{AS_{ut}}\right)^2\right]^{1/2}\right\},
$$ {#eq-de-gerber}
$$
\text{DE-ASME elliptic:}\quad \frac1n = \frac{16}{\pi d^3}\left[4\left(\frac{K_fM_a}{S_e}\right)^2 + 3\left(\frac{K_{fs}T_a}{S_e}\right)^2 + 4\left(\frac{K_fM_m}{S_y}\right)^2 + 3\left(\frac{K_{fs}T_m}{S_y}\right)^2\right]^{1/2}.
$$ {#eq-de-elliptic}

The DE-Goodman equation is the most conservative of the three and the simplest to solve for $d$; DE-Gerber and DE-ASME elliptic lie closer to test data for ductile steels and usually give diameters a few per cent smaller. All three are infinite-life criteria; for a finite life $S_e$ is replaced by the fatigue strength $S_f$ at that life.

A fatigue criterion does not check yielding on the first cycle, so a Langer-type check follows with the largest von Mises stress, built from the peak moment and peak torque:
$$
\sigma'_{\max} = \left[\left(\frac{32K_f(M_m + M_a)}{\pi d^3}\right)^2 + 3\left(\frac{16K_{fs}(T_m + T_a)}{\pi d^3}\right)^2\right]^{1/2}, \qquad n_y = \frac{S_y}{\sigma'_{\max}}.
$$ {#eq-yield}
Using $K_f$ here is conservative: a ductile notch root that yields locally does not make the shaft fail. Some designers omit it in the yield check; Budynas and Nisbett keep it.

### What "the ASME equation" means

Older textbooks and many design handbooks give a different formula under the name "ASME equation":
$$
d^3 = \frac{16}{\pi\tau_\text{all}}\sqrt{(K_bM)^2 + (K_tT)^2},
$$ {#eq-old-asme}
where $K_b$ and $K_t$ (not stress-concentration factors) are empirical combined shock-and-fatigue factors for bending and torsion. It comes from the *Code for the Design of Transmission Shafting* published by the ASME in 1927 (later ASA B17c), and it is a static formula: $\sqrt{M^2 + T^2}$ is the equivalent torque of the maximum-shear-stress (Tresca) theory, and fatigue enters only through the factors and a low allowable shear stress, set at $0.30S_y$ but not more than $0.18S_{ut}$, reduced by a quarter where there are keyways. It does not distinguish alternating from mean stresses and does not use $K_f$ or the endurance limit. That code was replaced by ANSI/ASME B106.1M-1985, *Design of Transmission Shafting*, which uses a fatigue method: for rotating bending $M$ and steady torque $T$ its diameter equation is
$$
d = \left\{\frac{32n}{\pi}\left[\left(\frac{K_fM}{S_e}\right)^2 + \frac34\left(\frac{T}{S_y}\right)^2\right]^{1/2}\right\}^{1/3},
$$ {#eq-b106}
which is exactly [[#eq-de-elliptic]] with $M_m = T_a = 0$ and $K_{fs} = 1$ (take $4$ out of the square root as $2$, and $16\times2 = 32$). B106.1M has since been withdrawn (the Conveyor Equipment Manufacturers Association reports 1994) without a direct successor, but its method is still used in industry and is reproduced for reference in ANSI/AGMA 6001-D97. Real shafts in regulated industries are designed to the standards of those industries, for example EN 13103 and EN 13104 for railway axles; this chapter teaches the principles, not a substitute for them.

## Designing the diameter

The DE equations need $K_f$, $K_{fs}$ and $S_e$, and all three depend on the diameter that is being sought: $K_t$ depends on the fillet radius ratio $r/d$ and the step ratio $D/d$, the notch sensitivity $q$ on the radius $r$, and the size factor $k_b$ on $d$. The way out is iteration, starting from typical values. Budynas and Nisbett (Table 7-1) give the following first-iteration estimates of $K_t$, chosen to be on the safe side for typical proportions:

| feature | $K_t$ (bending) | $K_{ts}$ (torsion) | $K_t$ (axial) |
|---|---|---|---|
| shoulder fillet, sharp ($r/d = 0.02$) | $2.7$ | $2.2$ | $3.0$ |
| shoulder fillet, well rounded ($r/d = 0.1$) | $1.7$ | $1.5$ | $1.9$ |
| end-milled keyseat ($r/d = 0.02$) | $2.14$ | $3.0$ | — |
| sled-runner keyseat | $1.7$ | — | — |
| retaining-ring groove | $5.0$ | $3.0$ | $5.0$ |

A sharp fillet is what a bearing shoulder usually forces; a well-rounded one is possible under a gear whose bore is chamfered. An end-milled keyseat ends abruptly in a pocket; a sled-runner keyseat, cut with a disc cutter, runs out gradually and concentrates bending stress less. For the first pass, $q = 1$ ($K_f = K_t$) is a safe assumption.

::: algorithm Shaft design for strength {#alg-shaft}
1. Lay out the shaft: positions of elements and bearings, shoulders, keyseats and grooves; fixed and floating bearings.
2. From the power and speed find the torque [[#eq-torque]] and its extent; find the forces of every element, draw the moment diagrams in two planes and combine them by [[#eq-resultant]].
3. Pick the candidate critical sections: the largest moments, and every stress raiser in a region of high moment and torque. Find $M_a$, $M_m$, $T_a$, $T_m$ at each.
4. First iteration: estimate $K_f = K_t$ and $K_{fs} = K_{ts}$ from the table above; find $S_e$ with $k_c = 1$ and an assumed $k_b \approx 0.9$; solve [[#eq-de-goodman-d]] (or the Gerber or elliptic form) for $d$ at each section with the chosen design factor.
5. Choose standard diameters, step ratios (typically $D/d \approx 1.1$–$1.5$) and fillet radii compatible with the bearings and elements.
6. Second iteration: with the real geometry, find $K_t$, $K_{ts}$ from the charts, $q$, $K_f$, $K_{fs}$ and $k_b$; recompute $n$ at every critical section by [[#eq-de-goodman]] and $n_y$ by [[#eq-yield]].
7. Check deflections and slopes ([[#eq-scaling]] and the limits below) and the first critical speed; enlarge the shaft if needed and re-check.
:::

::: widget plot
f: (16*n/pi*(4280*x/s + 5196.15*t/690))^(1/3); (8*n/(pi*s)*(4280*x + sqrt((4280*x)^2 + (2*5196.15*t*s/690)^2)))^(1/3); (16*n/pi*sqrt((4280*x/s)^2 + (5196.15*t/580)^2))^(1/3)
x: 0, 400
y: 0, 50
sliders: t=175:0:600:5, s=236:150:350:1, n=1.5:1:3:0.05
labels: d\ \text{DE-Goodman}; d\ \text{DE-Gerber}; d\ \text{DE-ASME elliptic}
caption: Required diameter in mm against the alternating bending moment $M_a$ in N·m, at an end-milled keyseat ($K_f = 2.14$, $K_{fs} = 3.0$) in a steel with $S_{ut} = 690\ \mathrm{MPa}$ and $S_y = 580\ \mathrm{MPa}$. The sliders set the steady torque $t = T_m$ (N·m), the endurance limit $s = S_e$ (MPa) and the design factor $n$. With the defaults, which are those of [[#ex-size]], $M_a = 134\ \mathrm{N\,m}$ needs $30.6\ \mathrm{mm}$ by DE-Goodman and about $28\ \mathrm{mm}$ by the other two. Set $t = 0$: the three curves coincide, because with no mean stress the criteria differ only on the mean axis. Then set $M_a$ near zero and raise $t$: Goodman and Gerber agree again (both pass through $S_{ut}$), and the elliptic curve, which uses $S_y$ on the mean axis, asks for more. Note also how weakly $d$ depends on everything — a cube root: doubling the moment raises the diameter by only about a quarter.
:::

::: example Sizing the countershaft {#ex-size}
The shaft of [[#ex-loads]] is machined from cold-drawn AISI 1050 steel, $S_{ut} = 690\ \mathrm{MPa}$, $S_y = 580\ \mathrm{MPa}$ (Budynas and Nisbett, Table A-20). Size the gear seat at the keyseat for a DE-Goodman design factor $n = 1.5$, then check the keyseat and the shoulder fillet at $100\ \mathrm{mm}$ with the chosen diameter. Use 50 % reliability and room temperature, and take $q = 1$ throughout.
::: solution
**Loads at the keyseat.** Rotating bending $M_a = 134.1\ \mathrm{N\,m}$, $M_m = 0$; steady torque $T_m = 175.1\ \mathrm{N\,m}$, $T_a = 0$. End-milled keyseat: $K_f = 2.14$, $K_{fs} = 3.0$.

**Endurance limit, first estimate.** $S_e' = 0.5\times690 = 345\ \mathrm{MPa}$; machined, $k_a = 4.51\times690^{-0.265} = 0.798$; guess $k_b = 0.9$; $k_c = k_d = k_e = k_f = 1$. $S_e = 0.798\times0.9\times345 = 247.7\ \mathrm{MPa}$.

**First diameter.** In N and mm, the two terms of [[#eq-de-goodman-d]] are
$$
\frac{2K_fM_a}{S_e} = \frac{2\times2.14\times134\,100}{247.7} = 2318\ \mathrm{mm^3}, \qquad \frac{\sqrt3\,K_{fs}T_m}{S_{ut}} = \frac{1.732\times3.0\times175\,100}{690} = 1318\ \mathrm{mm^3},
$$
so $d = [(16\times1.5/\pi)(2318 + 1318)]^{1/3} = (7.639\times3636)^{1/3} = 30.3\ \mathrm{mm}$.

**Iterate $k_b$.** At $d = 30.3\ \mathrm{mm}$, $k_b = 1.24\times30.3^{-0.107} = 0.861$, $S_e = 236.9\ \mathrm{MPa}$, and the same calculation gives $d = 30.6\ \mathrm{mm}$; a further pass changes nothing. Choose $d = 32\ \mathrm{mm}$ for the gear seat, with a shoulder of $38\ \mathrm{mm}$.

**Check the keyseat at $d = 32\ \mathrm{mm}$.** $k_b = 0.856$, $S_e = 235.5\ \mathrm{MPa}$.
$$
\sigma_a = \frac{2.14\times32\times134\,100}{\pi\times32^3} = 89.2\ \mathrm{MPa}, \qquad \tau_m = \frac{3.0\times16\times175\,100}{\pi\times32^3} = 81.6\ \mathrm{MPa},
$$
so $\sigma_a' = 89.2\ \mathrm{MPa}$, $\sigma_m' = \sqrt3\times81.6 = 141.4\ \mathrm{MPa}$ and
$$
\frac1n = \frac{89.2}{235.5} + \frac{141.4}{690} = 0.379 + 0.205 = 0.584, \qquad n = 1.71.
$$
By [[#eq-de-gerber]] $n = 2.14$; by [[#eq-de-elliptic]] $n = 2.22$. Yield: $\sigma'_{\max} = \sqrt{89.2^2 + 3\times81.6^2} = 167.2\ \mathrm{MPa}$, $n_y = 580/167.2 = 3.47$.

**Check the shoulder at $100\ \mathrm{mm}$** ($d = 32\ \mathrm{mm}$, $M_a = 111.8\ \mathrm{N\,m}$, same torque). With a well-rounded fillet ($r = 3.2\ \mathrm{mm}$, $K_t = 1.7$, $K_{ts} = 1.5$): $\sigma_a = 59.1\ \mathrm{MPa}$, $\tau_m = 40.8\ \mathrm{MPa}$, $1/n = 59.1/235.5 + 70.7/690$, $n = 2.83$. With a sharp fillet ($K_t = 2.7$, $K_{ts} = 2.2$): $\sigma_a = 93.8\ \mathrm{MPa}$, $\tau_m = 59.9\ \mathrm{MPa}$, $n = 1.82$.

**Sanity check.** The keyseat governs, as expected from its high $K_{fs} = 3.0$ acting on the large steady torque; it was the section used for sizing, and rounding up to $32\ \mathrm{mm}$ took $n$ from $1.5$ to $1.71$, consistent with $n \propto d^3$ ($1.5\times(32/30.6)^3 = 1.72$). Fatigue governs over yield by a factor of two. With real notch sensitivities ($q \approx 0.8$–$0.9$ for this steel and radius) the factors would be a little higher.
:::
:::

::: warning Mistakes that undo a shaft calculation
- **Treating rotating bending as steady.** A constant moment on a rotating shaft produces a fully reversed stress: $M_a = M$, $M_m = 0$. Only a load that rotates with the shaft (an unbalance, for example) gives a steady bending stress.
- **Checking only the section of largest moment.** Shafts fail at shoulders, keyseats and grooves, often away from the maximum moment. Every stress raiser in a loaded region is a candidate.
- **Using $k_c = 0.59$ for torsion inside a von Mises equation**, which counts the shear-strength reduction twice. The DE equations use $S_e$ for bending.
- **Adding moment components algebraically** instead of as vectors, [[#eq-resultant]].
- **Stopping at strength.** Most gearbox shafts are larger than strength requires, because deflection, slope at the bearings or critical speed sets the size.
- **Calling [[#eq-old-asme]] a fatigue criterion.** It is a static formula with empirical factors; it does not know whether the stresses alternate.
:::

## Deflection and slope

A shaft can be strong enough and still be unusable. If it bends, a pair of meshing gears separate and tilt, so the load concentrates at one end of the face; bearings run with their rings misaligned; seals wear unevenly. The limits are set by the elements, not by the shaft. Budynas and Nisbett (Table 7-2) collect typical maximum values:

| element | typical maximum |
|---|---|
| slope at a tapered roller bearing | $0.0005$–$0.0012\ \mathrm{rad}$ |
| slope at a cylindrical roller bearing | $0.0008$–$0.0012\ \mathrm{rad}$ |
| slope at a deep-groove ball bearing | $0.001$–$0.003\ \mathrm{rad}$ |
| slope at a spherical or self-aligning ball bearing | $0.026$–$0.052\ \mathrm{rad}$ |
| slope at an uncrowned spur gear | below $0.0005\ \mathrm{rad}$ |
| deflection at a spur gear, coarse teeth (module above about $2.5\ \mathrm{mm}$) | $0.25\ \mathrm{mm}$ ($0.010\ \mathrm{in}$) |
| deflection at a spur gear, medium teeth (module about $1.3$–$2.3\ \mathrm{mm}$) | $0.13\ \mathrm{mm}$ ($0.005\ \mathrm{in}$) |
| deflection at a spur gear, fine teeth (module about $0.5$–$1.3\ \mathrm{mm}$) | $0.08\ \mathrm{mm}$ ($0.003\ \mathrm{in}$) |

The gear limits were originally given in terms of diametral pitch (teeth per inch); the module ranges are conversions. Bearing makers' catalogues give the permissible misalignment of each bearing type and should be used when available.

Shaft deflections are beam deflections ([[mechanics-of-materials/beam-deflection]]) with two complications. The loads lie in two planes, so the deflections are found in each plane and combined as vectors, like the moments. And a stepped shaft has a different $I$ on each step, so the curvature $M/(EI)$ is discontinuous. For a first check the shaft is often treated as uniform, with a representative diameter; final checks integrate $M/(EI)$ numerically along the steps or use a beam finite-element program. Small steps near the bearings matter more for the slope there than their length suggests, because the slope at a support is the integral of the curvature over the whole span.

::: proposition Diameter scaling for stiffness {#prop-scaling}
If every diameter of a shaft is multiplied by the same factor and the loads and lengths are unchanged, every deflection and slope varies as $d^{-4}$. Hence, if a calculated deflection or slope $y_\text{old}$ must be brought to an allowable value $y_\text{all}$ with a design factor $n_d$, the diameters must be multiplied by
$$
\frac{d_\text{new}}{d_\text{old}} = \left|\frac{n_d\,y_\text{old}}{y_\text{all}}\right|^{1/4}.
$$ {#eq-scaling}
:::

::: proof
**Assumptions.** Linear-elastic small deflections governed by $EIv'' = M$; the bending moments are fixed by statics (the shaft on two bearings is statically determinate) and so do not change with the diameters; shear deformation negligible.

Multiplying every diameter by $\lambda$ multiplies every $I = \pi d^4/64$ by $\lambda^4$ and leaves $M(x)$ unchanged, so the curvature $v'' = M/(EI)$ is divided by $\lambda^4$ everywhere. Slope and deflection are obtained from the curvature by integrations whose constants are fixed by the support conditions $v = 0$ at the bearings, which are linear; therefore $v'$ and $v$ are also divided by $\lambda^4$. Setting $n_dy_\text{old}/\lambda^4 = y_\text{all}$ gives [[#eq-scaling]].
:::

For a single transverse force $F$ at distance $a$ from bearing $A$ and $b$ from bearing $B$ on a uniform shaft of span $l = a + b$, the standard results are
$$
\theta_A = \frac{Fb(l^2 - b^2)}{6EIl}, \qquad \theta_B = \frac{Fa(l^2 - a^2)}{6EIl}, \qquad y_F = \frac{Fa^2b^2}{3EIl},
$$ {#eq-point-load}
with $y_F$ the deflection under the load; more loads are added by superposition.

::: example Stiffness of the countershaft {#ex-deflection}
Treat the shaft of [[#ex-size]] as uniform with $d = 32\ \mathrm{mm}$ ($E = 207\ \mathrm{GPa}$). Find the slopes at the bearings, the deflection at the gear and the slope at the gear, and compare them with the limits for deep-groove ball bearings and a module-$4$ spur gear. What diameter would tapered roller bearings with a $0.0005\ \mathrm{rad}$ limit need?
::: solution
**Section.** $I = \pi\times32^4/64 = 51\,470\ \mathrm{mm^4}$, $EI = 207\,000\times51\,470 = 1.065\times10^{10}\ \mathrm{N\,mm^2}$. The force is the resultant $F = 1863\ \mathrm{N}$ (the uniform shaft is equally stiff in every plane, so the deflection lies in the plane of $F$), with $a = 120$, $b = 180$, $l = 300\ \mathrm{mm}$.

**Slopes at the bearings.** By [[#eq-point-load]],
$$
\theta_A = \frac{1863\times180\times(300^2 - 180^2)}{6\times1.065\times10^{10}\times300} = \frac{1.932\times10^{10}}{1.918\times10^{13}} = 0.00101\ \mathrm{rad}, \qquad \theta_B = 0.00088\ \mathrm{rad}.
$$

**At the gear.** $y_F = 1863\times120^2\times180^2/(3\times1.065\times10^{10}\times300) = 0.091\ \mathrm{mm}$. The slope at $x = a$ follows from differentiating $v = Fbx(l^2 - b^2 - x^2)/(6EIl)$: $\theta_F = Fb(l^2 - b^2 - 3a^2)/(6EIl) = 0.00025\ \mathrm{rad}$.

**Comparison.** Deep-groove ball bearings, $0.001$–$0.003\ \mathrm{rad}$: $\theta_A$ is at the bottom of the range, acceptable but with no margin. Gear deflection $0.091\ \mathrm{mm}$ against $0.25\ \mathrm{mm}$ and gear slope $0.00025$ against $0.0005\ \mathrm{rad}$: both acceptable.

**Tapered roller bearings.** By [[#eq-scaling]] with $n_d = 1$, $d = 32\times(0.00101/0.0005)^{1/4} = 32\times1.192 = 38.1\ \mathrm{mm}$, so about $40\ \mathrm{mm}$ — a quarter more than strength needs.

**Sanity check.** The real bearing seats ($30\ \mathrm{mm}$, say) are smaller than $32\ \mathrm{mm}$, so the true slopes are somewhat larger than these uniform-shaft values; this is why a final check integrates along the actual steps. The order of magnitude, a tenth of a millimetre and a milliradian, is typical of a well-proportioned gearbox shaft.
:::
:::

## Critical speeds

Turn a slender shaft carrying a disc faster and faster. At a certain speed it bows out violently and the bow rotates with the shaft; above that speed it straightens again. The speed is a **critical speed**, and the motion is called **whirling**. It is a resonance: the out-of-balance force of the disc rotates at the shaft speed, and when the speed equals a natural frequency of lateral vibration of the shaft on its bearings, the response is limited only by damping.

::: definition Critical speed {#def-critical}
A **critical speed** of a rotating shaft is a speed at which the synchronous response to unbalance is a maximum. For a shaft with negligible gyroscopic effects and rigid bearings, the critical speeds are equal to the natural frequencies $\omega_1 < \omega_2 < \dots$ of lateral (bending) vibration of the non-rotating shaft with its attached masses; $\omega_1$ is the **first critical speed**.
:::

::: proposition Whirl of an unbalanced disc (Jeffcott rotor) {#prop-jeffcott}
A disc of mass $m$, whose centre of mass lies a distance $e$ from the shaft axis, is mounted on a shaft whose lateral stiffness at the disc is $k$; let $\omega_n = \sqrt{k/m}$. In steady synchronous whirl at speed $\omega$ without damping, the shaft centre at the disc deflects radially by
$$
r = \frac{e\,(\omega/\omega_n)^2}{1 - (\omega/\omega_n)^2},
$$ {#eq-jeffcott}
measured in the direction of the eccentricity. The deflection grows without bound as $\omega \to \omega_n$; above $\omega_n$ it is negative, and as $\omega \to \infty$, $r \to -e$: the disc spins about its own centre of mass.
:::

::: proof
**Assumptions.** Massless shaft; rigid bearings; disc at mid-span so that it does not tilt and has no gyroscopic coupling; no damping; gravity neglected (or its static sag subtracted); linear shaft stiffness; steady whirl, in which the bent shaft and the disc rotate together at $\omega$ as a rigid configuration.

In steady whirl the geometric centre of the disc, the point where the shaft passes through, moves on a circle of radius $r$, and the centre of mass, rigidly offset by $e$ along the same radial line, on a circle of radius $r + e$. The only transverse force on the disc is the elastic restoring force of the shaft, $kr$ towards the axis. Newton's second law for the centre of mass in uniform circular motion requires a centripetal force $m\omega^2(r + e)$, so
$$
kr = m\omega^2(r + e) \quad\Longrightarrow\quad r = \frac{m\omega^2e}{k - m\omega^2} = \frac{e\,(\omega/\omega_n)^2}{1 - (\omega/\omega_n)^2}.
$$
For $\omega < \omega_n$, $r > 0$: the shaft bows towards the heavy side. For $\omega > \omega_n$, $r < 0$: the geometric centre lies on the opposite side of the axis from the heavy spot, and $r \to -e$ as $\omega \to \infty$, so the centre of mass $r + e \to 0$ lies on the bearing axis.
:::

This is the forced response of [[vibrations/vibration-fundamentals]] in another form: [[#eq-jeffcott]] is the rotating-unbalance response with the shaft speed as the excitation frequency. Two consequences are worth stating. First, in synchronous whirl the bent shape turns with the shaft, so the fibres see a steady bending stress, not a reversed one; the danger at a critical speed is the size of the deflection, which can wreck seals, bearings and rotor clearances, and the large bearing forces. Second, a shaft can run steadily above its first critical speed (it is "supercritical"), provided it passes through the critical speed quickly and with enough damping. Steam and gas turbines, centrifuges and many high-speed spindles do so. Ordinary industrial shafts are kept below their first critical speed with a margin; Budynas and Nisbett recommend a first critical speed at least twice the operating speed.

For a uniform shaft of mass $m'$ per unit length, simply supported at both ends, the continuous-beam analysis of [[vibrations/continuous-systems]] gives the first natural frequency
$$
\omega_1 = \left(\frac{\pi}{l}\right)^2\sqrt{\frac{EI}{m'}}.
$$ {#eq-uniform}
Real shafts are stepped and carry discs, and for them two classical estimates are used.

::: proposition Rayleigh's estimate {#prop-rayleigh}
Let a massless shaft carry concentrated masses $m_i$, and let $y_i$ be the static deflections at the masses when each mass is loaded by its own weight $m_ig$ acting in the same transverse direction. Then
$$
\omega_1 \approx \sqrt{\frac{g\sum m_iy_i}{\sum m_iy_i^2}},
$$ {#eq-rayleigh}
and the estimate is never below the true first critical speed.
:::

::: proof
**Assumptions.** Linear-elastic shaft on rigid bearings; concentrated masses without rotary inertia or gyroscopic effects; free undamped vibration.

**Energy balance.** Suppose the shaft vibrates harmonically in its first mode, $y_i(t) = Y_i\cos\omega t$. The maximum kinetic energy, at the instant of zero deflection, is $\tfrac12\omega^2\sum m_iY_i^2$. The maximum strain energy, at the extreme position, is the work done in slowly applying forces $F_i$ that produce the deflections $Y_i$, namely $\tfrac12\sum F_iY_i$. With no damping the two maxima are equal.

**Assumed shape.** The true mode shape is unknown. Rayleigh's method uses an approximation to it, here the static deflection curve under the forces $F_i = m_ig$, for which the deflections $y_i$ and the forces are related exactly. Then $\tfrac12\omega^2\sum m_iy_i^2 = \tfrac12\sum m_igy_i$, which is [[#eq-rayleigh]].

**Upper bound.** For any admissible shape $\mathbf{y}$ the ratio $\omega_R^2 = U_{\max}/(\tfrac12\sum m_iy_i^2)$, the Rayleigh quotient, is a weighted average of the squares of the natural frequencies, with weights equal to the squared participation of each mode in $\mathbf{y}$; it therefore cannot be smaller than the smallest, $\omega_1^2$, and equals it only when $\mathbf{y}$ is the first mode shape. The static deflection curve is close to the first mode, so the estimate is close and slightly high.
:::

In practice the deflections $y_i$ are those under the weights acting as if the shaft were horizontal, whatever its real orientation; only the shape matters. For a shaft with masses in different planes, all the forces are imagined in one plane.

::: proposition Dunkerley's estimate {#prop-dunkerley}
Let $a_{ij}$ be the influence coefficients of the shaft (the deflection at station $i$ due to a unit force at station $j$), and let $\omega_{ii} = 1/\sqrt{a_{ii}m_i}$ be the natural frequency the shaft would have with mass $m_i$ alone on it. Then
$$
\frac{1}{\omega_1^2} \approx \sum_i\frac{1}{\omega_{ii}^2} = \sum_i a_{ii}m_i,
$$ {#eq-dunkerley}
and the estimate is never above the true first critical speed.
:::

::: proof
**Assumptions.** As for Rayleigh's estimate.

**Eigenvalue problem.** With the shaft's flexibility matrix $\mathbf{A} = [a_{ij}]$, the deflections due to the inertia forces $-m_j\ddot y_j$ are $y_i = -\sum_j a_{ij}m_j\ddot y_j$. For harmonic motion at frequency $\omega$, $\ddot y_j = -\omega^2y_j$, so $\mathbf{A}\mathbf{M}\mathbf{y} = \omega^{-2}\mathbf{y}$, with $\mathbf{M}$ the diagonal mass matrix. The eigenvalues of $\mathbf{A}\mathbf{M}$ are $\lambda_k = 1/\omega_k^2$.

**Trace.** The sum of the eigenvalues of a matrix equals its trace: $\sum_k 1/\omega_k^2 = \sum_i a_{ii}m_i$. The matrix $\mathbf{A}$ is symmetric (Maxwell's reciprocal theorem) and positive definite, and $\mathbf{M}$ is diagonal with positive entries, so $\mathbf{A}\mathbf{M}$ is similar to $\mathbf{M}^{1/2}\mathbf{A}\mathbf{M}^{1/2}$, which is positive definite; all its eigenvalues are positive.

**Bound.** Dropping all terms but the first, $1/\omega_1^2 < \sum_k 1/\omega_k^2 = \sum_i a_{ii}m_i$, which gives [[#eq-dunkerley]] as a lower bound for $\omega_1$. The error is the neglected $\sum_{k \ge 2}1/\omega_k^2$, which is small when the higher critical speeds are well above the first.
:::

Dunkerley's estimate is the easier one by hand, because each $\omega_{ii}$ needs only one deflection formula, and terms are simply added; the shaft's own mass can be included approximately by adding the term $1/\omega_s^2$ for the bare shaft, from [[#eq-uniform]]. Rayleigh's needs the full static deflection curve but is much closer. Between them they bracket the first critical speed.

::: widget plot
f: 1/sqrt(((1/48 + p^2*(1-p)^2/3*x) + sqrt((1/48 + p^2*(1-p)^2/3*x)^2 - 4*(p^2*(1-p)^2/144 - (p*(0.75-p^2)/12)^2)*x))/2); sqrt(((1/48 + p*(0.75-p^2)/12*x) + x*(p*(0.75-p^2)/12 + p^2*(1-p)^2/3*x))/((1/48 + p*(0.75-p^2)/12*x)^2 + x*(p*(0.75-p^2)/12 + p^2*(1-p)^2/3*x)^2)); 1/sqrt(1/48 + p^2*(1-p)^2/3*x)
x: 0, 5
y: 3, 7.5
sliders: p=0.25:0.05:0.5:0.01
labels: \text{exact}; \text{Rayleigh}; \text{Dunkerley}
caption: First critical speed of a massless, simply supported shaft carrying a mass $m_1$ at mid-span and a mass $m_2$ at a fraction $p$ of the span from one bearing, in units of $\sqrt{EI/(m_1l^3)}$, against the mass ratio $m_2/m_1$. At $m_2 = 0$ all three give $\sqrt{48} = 6.93$. With $p = 0.25$ the Rayleigh curve lies on top of the exact one (within $0.05$ %), while Dunkerley's is up to 2 % low. Move $p$ towards $0.05$ (a heavy mass close to a bearing) and raise the mass ratio: the static deflection shape now differs more from the mode shape and Rayleigh drifts up by a few per cent, Dunkerley down — but they always bracket the exact value. At $p = 0.5$ the two masses coincide and all three agree.
:::

::: example Critical speed of a two-disc shaft {#ex-critical}
A steel shaft of diameter $40\ \mathrm{mm}$ ($E = 207\ \mathrm{GPa}$, $\rho = 7850\ \mathrm{kg/m^3}$) is simply supported on bearings $800\ \mathrm{mm}$ apart and carries a $25\ \mathrm{kg}$ disc at $250\ \mathrm{mm}$ and a $40\ \mathrm{kg}$ disc at $500\ \mathrm{mm}$ from the left bearing. Estimate the first critical speed by Rayleigh's and Dunkerley's methods, neglecting the shaft mass, compare them with the exact value, and then allow for the shaft mass. The shaft is to run at $1500\ \mathrm{rpm}$; is it acceptable?
::: solution
**Stiffness.** $I = \pi\times0.04^4/64 = 1.257\times10^{-7}\ \mathrm{m^4}$, $EI = 26\,010\ \mathrm{N\,m^2}$. For a unit load at distance $b$ from the right bearing, the deflection at $x$ (left of the load) is $a(x) = bx(l^2 - b^2 - x^2)/(6EIl)$. With stations $x_1 = 0.25\ \mathrm{m}$, $x_2 = 0.5\ \mathrm{m}$:
$$
a_{11} = 3.028\times10^{-7}, \quad a_{22} = 3.604\times10^{-7}, \quad a_{12} = a_{21} = 2.928\times10^{-7}\ \mathrm{m/N}.
$$

**Rayleigh.** Static deflections under the weights: $y_1 = g(a_{11}m_1 + a_{12}m_2) = 9.81\times(7.57 + 11.71)\times10^{-6} = 0.189\ \mathrm{mm}$; $y_2 = g(a_{21}m_1 + a_{22}m_2) = 0.213\ \mathrm{mm}$. Then
$$
\omega_1 \approx \sqrt{\frac{9.81\times(25\times0.189 + 40\times0.213)\times10^{-3}}{(25\times0.189^2 + 40\times0.213^2)\times10^{-6}}} = 218.9\ \mathrm{rad/s} = 2091\ \mathrm{rpm}.
$$

**Dunkerley.** $\omega_{11} = 1/\sqrt{a_{11}m_1} = 363.4\ \mathrm{rad/s}$, $\omega_{22} = 1/\sqrt{a_{22}m_2} = 263.4\ \mathrm{rad/s}$, so $1/\omega_1^2 = 1/363.4^2 + 1/263.4^2$ and $\omega_1 \approx 213.3\ \mathrm{rad/s} = 2037\ \mathrm{rpm}$.

**Exact.** The larger eigenvalue of $\mathbf{AM}$ gives $\omega_1 = 218.9\ \mathrm{rad/s}$ (and $\omega_2 = 944\ \mathrm{rad/s}$). Rayleigh is high by $0.01$ %, Dunkerley low by $2.6$ %.

**Shaft mass.** $m' = 7850\times\pi\times0.02^2 = 9.86\ \mathrm{kg/m}$ (a total of $7.9\ \mathrm{kg}$). By [[#eq-uniform]], the bare shaft has $\omega_s = (\pi/0.8)^2\sqrt{26\,010/9.86} = 792\ \mathrm{rad/s}$. Adding its term to Dunkerley's sum: $\omega_1 \approx 205.9\ \mathrm{rad/s} = 1966\ \mathrm{rpm}$.

**Acceptability.** About $1970$–$2090\ \mathrm{rpm}$ is only $1.3$–$1.4$ times the running speed, short of the factor of two. Without the shaft mass, every critical speed varies as $\sqrt{k/m} \propto d^2$; to reach $3000\ \mathrm{rpm}$ the diameter must rise to about $40\sqrt{3000/2091} = 48\ \mathrm{mm}$, so $50\ \mathrm{mm}$.

**Sanity check.** The bounds behave as proved: Dunkerley below, Rayleigh above, both close because $\omega_2$ is more than four times $\omega_1$. The static sag of $0.2\ \mathrm{mm}$ also gives a quick estimate, $\sqrt{g/\delta} = \sqrt{9.81/0.0002} = 221\ \mathrm{rad/s}$ — the familiar rule that a static sag $\delta$ corresponds to a natural frequency near $\sqrt{g/\delta}$.
:::
:::

The methods above assume rigid bearings and ignore gyroscopic effects. Flexible bearings and housings lower the critical speeds, sometimes considerably; overhung discs and large rotors make the critical speeds depend on the running speed through gyroscopic moments; oil-film bearings add stiffness and damping that vary with speed, and can drive unstable whirl. These are the subject of rotor dynamics, and high-speed machinery is analysed with dedicated rotor-dynamics software and, in some industries, to standards such as the API standards for turbomachinery.

## Keys, couplings and interference fits

### Keys

::: definition Parallel key {#def-key}
A **parallel key** is a bar of rectangular or square section, of width $b$, height $h$ and length $l$, set half in a keyseat milled in the shaft and half in a keyway in the hub, that transmits torque between them by bearing on its sides. With a torque $T$ on a shaft of diameter $d$, the key carries a tangential force
$$
F = \frac{2T}{d}
$$ {#eq-key-force}
at the shaft surface.
:::

The key can fail in two ways. It can shear across the plane between shaft and hub, on an area $bl$; and its sides, or the sides of the keyseat or keyway, can be crushed (yield in bearing) over the depth of engagement $h_c$ on either side of that plane:
$$
\tau = \frac{F}{bl} \le \frac{S_{sy}}{n}, \qquad \sigma_c = \frac{F}{h_cl} \le \frac{S_y}{n},
$$ {#eq-key}
with $S_{sy} \approx 0.577S_y$ by the distortion-energy theory and $S_y$ that of the weakest of key, shaft and hub. For a square key in a symmetric keyseat, $h_c = h/2$; for the rectangular keys of DIN 6885-1 the engagement in the hub, $h - t_1$ (with $t_1$ the shaft keyseat depth), is the smaller and usually governs. These are nominal stresses; the load is not uniform along the key, which is one reason long keys gain little (a common rule keeps the key length below about $1.5d$; longer hubs use two keys or a spline).

Key sizes are standardised as functions of the shaft diameter: ISO 773 and DIN 6885-1 in metric practice, ANSI B17.1 in inch practice (which uses square keys, for example a $\tfrac{5}{16}\ \mathrm{in}$ square key on shafts over $1\tfrac14$ up to $1\tfrac38\ \mathrm{in}$). The designer chooses the length and, if necessary, the key material. Keys are commonly made of a slightly weaker steel than the shaft, so that an overload shears the inexpensive key rather than damaging the shaft or hub; the keyseat's stress concentration (table above) is part of the shaft design.

::: example A key for the gear {#ex-key}
The gear of [[#ex-loads]] ($T = 175.1\ \mathrm{N\,m}$) sits on the $32\ \mathrm{mm}$ seat of [[#ex-size]]. DIN 6885-1 specifies, for shafts over $30$ up to $38\ \mathrm{mm}$, a key $b\times h = 10\times8\ \mathrm{mm}$ with a shaft keyseat depth $t_1 = 5.0\ \mathrm{mm}$. The key is cold-drawn AISI 1020 ($S_y = 390\ \mathrm{MPa}$), weaker than the shaft and the gear hub. Find the key length needed for a factor of safety of $2$.
::: solution
**Force.** $F = 2T/d = 2\times175\,100/32 = 10\,940\ \mathrm{N}$.

**Shear.** $S_{sy} = 0.577\times390 = 225\ \mathrm{MPa}$. $l \ge nF/(bS_{sy}) = 2\times10\,940/(10\times225) = 9.7\ \mathrm{mm}$.

**Crushing.** Hub-side engagement $h_c = h - t_1 = 8 - 5 = 3\ \mathrm{mm}$ (the shaft side has $5\ \mathrm{mm}$). $l \ge nF/(h_cS_y) = 2\times10\,940/(3\times390) = 18.7\ \mathrm{mm}$.

**Choice.** Crushing governs. A standard key length of $25\ \mathrm{mm}$ or more would do; in practice the key is made nearly as long as the hub (here $40\ \mathrm{mm}$, so a $32$ or $36\ \mathrm{mm}$ key), which lowers the bearing stress further. If the key has rounded ends, only the straight length $l - b$ counts as bearing length.

**Sanity check.** The shaft itself, at the keyseat, carries a nominal torsional stress $16T/(\pi d^3) = 27\ \mathrm{MPa}$; the key at $25\ \mathrm{mm}$ length has $\tau = 44\ \mathrm{MPa}$ and $\sigma_c = 146\ \mathrm{MPa}$, of the same order as the shaft stresses, which is what a well-matched joint looks like.
:::
:::

Where keys cannot carry the torque or where a hub must slide, **splines** are used: many integral keys around the shaft, usually with involute flanks (ISO 4156 in metric practice), which share the load and centre the hub. Light loads can be carried by set screws, pins or tapered clamping elements.

### Interference fits

A hub can also be pressed or shrunk onto a slightly oversized shaft. The interference produces a contact pressure $p$ at the interface, calculated from the thick-cylinder theory of [[solid-mechanics/thick-cylinders-discs]], and friction at the interface transmits torque and axial force. If the pressure is uniform over a seat of diameter $d$ and length $l$ and the coefficient of friction is $\mu$, the friction force available is $\mu p\,\pi dl$, acting at radius $d/2$, so
$$
T_\text{max} = \frac{\pi}{2}\mu p\,d^2l, \qquad F_{a,\max} = \pi\mu p\,dl.
$$ {#eq-press-fit}
Coefficients of friction for dry steel-on-steel press fits are typically taken in the range $0.1$–$0.2$, higher for shrink fits; the value is uncertain and the design must allow for it. The fits are specified by the ISO 286 system of limits and fits (H7/p6 or H7/s6 for a light to medium press fit, for example), and the pressure must be found for the extreme interferences the tolerances allow. Interference fits avoid the keyseat's stress concentration, but they create their own: the pressure peaks at the edges of the hub, and slip there produces fretting, the cause of many fatigue failures at wheel seats and gear seats. A small shoulder or relief groove under the hub edge and a hub that is slightly longer than needed help.

### Couplings

Couplings join two shafts. **Rigid couplings** — a sleeve, a pair of bolted flanges or a split clamp — make the two shafts behave as one and require them to be accurately aligned; any misalignment is forced out by bending the shafts and loading their bearings. **Flexible couplings** accept small misalignments: jaw couplings with an elastomer spider, disc and diaphragm couplings with thin steel laminations, gear couplings with crowned teeth, bellows couplings, and Oldham couplings for parallel offset. Each type has a catalogue rating of torque, speed and permissible angular, parallel and axial misalignment, and some add useful torsional damping. A single universal (Hooke's, or Cardan) joint transmits torque through a large angle but makes the output speed fluctuate twice per revolution; two joints arranged correctly cancel the fluctuation, as in a vehicle propeller shaft.

::: history
The theory of whirling began with W. J. M. Rankine's paper "On the centrifugal force of rotating shafts" in *The Engineer* (1869). Rankine's model, without the inertia forces that couple the two directions of motion, predicted that above the whirling speed the deflection would grow without limit, and his conclusion long discouraged attempts to run shafts above it. In 1894 Stanley Dunkerley published "On the whirling and vibration of shafts" in the *Philosophical Transactions of the Royal Society* (series A, vol. 185), a long theoretical and experimental study whose empirical summation rule for shafts carrying pulleys is the estimate still called Dunkerley's method. The engineering proof that Rankine was wrong came from Gustaf de Laval's high-speed steam turbines, whose slender shafts ran above their critical speed; in 1895 August Föppl explained theoretically, and checked on a model, why a disc on a flexible shaft centres itself at high speed. H. H. Jeffcott's paper of 1919 in the *Philosophical Magazine* (series 6, vol. 37), on the effect of unbalance near a whirling speed, gave the simple model of [[#prop-jeffcott]], now called the Jeffcott rotor. Rayleigh's energy method appeared in his *Theory of Sound* (1877). For strength, the ASME's 1927 transmission-shafting code with its equivalent-torque formula was the standard for decades; ANSI/ASME B106.1M-1985 replaced it with a fatigue method, and the DE-Goodman family of equations now taught follows the treatment in Shigley's textbook.
:::

::: quiz
A shaft rotates at constant speed under a steady gear force and transmits a steady torque. At a point on the shaft surface at the gear, the bending stress is
- [ ] steady, because the gear force is steady.
- [x] fully reversed, with an amplitude equal to the static bending stress.
- [ ] repeated, from zero to twice the static bending stress.
- [ ] zero, because the torque dominates.
::: solution
The moment vector is fixed in space while the material rotates through it, so each surface point sees $+\sigma$, then $-\sigma$, once per revolution: $M_a = M$, $M_m = 0$. The torsional stress, by contrast, is steady.
:::
:::

::: quiz
For a shaft carrying several discs, Rayleigh's method using the static deflection curve and Dunkerley's method give, respectively,
- [ ] two lower bounds to the first critical speed.
- [x] an upper and a lower bound to the first critical speed.
- [ ] a lower and an upper bound to the first critical speed.
- [ ] exact values if the shaft mass is neglected.
::: solution
The Rayleigh quotient of any assumed shape is at least $\omega_1^2$, so Rayleigh's estimate is high; Dunkerley's sum includes all the positive terms $1/\omega_k^2$, so it overestimates $1/\omega_1^2$ and underestimates $\omega_1$. Neither is exact unless the static shape is the mode shape (Rayleigh) or there is only one mass (Dunkerley).
:::
:::

::: summary
- Layout first: short spans, elements near bearings, one fixed and one floating bearing, stress raisers where the moment is small; the modulus, and hence stiffness, is the same for all steels.
- Torque $T = P/\omega$; gear and belt forces in two planes, combined into the resultant moment $M = \sqrt{M_{xy}^2 + M_{xz}^2}$.
- A steady load on a rotating shaft gives fully reversed bending; steady torque gives mean shear. With $K_f$ and $K_{fs}$, combine by von Mises and apply Goodman: the DE-Goodman equations [[#eq-de-goodman]] and [[#eq-de-goodman-d]]; DE-Gerber and DE-ASME elliptic are less conservative; check yield with $\sigma'_{\max}$.
- Iterate: start from typical $K_t$ values (Shigley Table 7-1) and $k_b \approx 0.9$, choose standard sizes, then recheck with the real geometry.
- The old "ASME equation" is a static Tresca formula with empirical factors; ANSI/ASME B106.1M-1985 (withdrawn) used the DE-ASME-elliptic form.
- Deflections and slopes are limited by the gears and bearings (typical limits: $0.001$–$0.003\ \mathrm{rad}$ for ball bearings, below $0.0005\ \mathrm{rad}$ at spur gears); they scale as $d^{-4}$.
- Critical speeds are lateral natural frequencies: $\omega_1 = (\pi/l)^2\sqrt{EI/m'}$ for a uniform simple shaft; Rayleigh's estimate is an upper bound, Dunkerley's a lower bound. Keep $\omega_1$ above about twice the running speed, or design for supercritical running.
- Keys: $F = 2T/d$, check shear on $bl$ and crushing on $h_cl$; interference fits carry $T = \tfrac{\pi}{2}\mu pd^2l$ but cause fretting at hub edges.
:::

## Exercises

::: exercise Torque from power {level=1 check="80"}
A shaft transmits $12\ \mathrm{kW}$ at $150\ \mathrm{rad/s}$. Find the torque. (Enter $T$ in N·m.)
::: solution
$T = P/\omega = 12\,000/150 = 80\ \mathrm{N\,m}$. In rpm, $150\ \mathrm{rad/s}$ is $1432\ \mathrm{rpm}$, and $9549\times12/1432 = 80\ \mathrm{N\,m}$ as well.
:::
:::

::: exercise Scaling a critical speed {level=1 check="6"}
A uniform, simply supported shaft is redesigned with a diameter $1.5$ times larger and a bearing span half as long. By what factor does its first critical speed change? (Enter the factor.)
::: solution
By [[#eq-uniform]], $\omega_1 \propto l^{-2}\sqrt{I/m'} \propto l^{-2}\sqrt{d^4/d^2} = d/l^2$. The factor is $1.5/0.5^2 = 6$.
:::
:::

::: exercise Key shear stress {level=1 check="20"}
A $40\ \mathrm{mm}$ shaft transmits $200\ \mathrm{N\,m}$ through a key of width $10\ \mathrm{mm}$ and length $50\ \mathrm{mm}$. Find the shear stress in the key. (Enter $\tau$ in MPa.)
::: solution
$F = 2T/d = 2\times200\,000/40 = 10\,000\ \mathrm{N}$; $\tau = F/(bl) = 10\,000/(10\times50) = 20\ \mathrm{MPa}$.
:::
:::

::: exercise Dunkerley with two masses {level=2 check="240"}
A shaft carries two discs. With each disc alone on the shaft, the natural frequencies would be $300\ \mathrm{rad/s}$ and $400\ \mathrm{rad/s}$. Estimate the first critical speed with both discs by Dunkerley's method, neglecting the shaft mass. (Enter $\omega_1$ in rad/s.)
::: solution
$1/\omega_1^2 = 1/300^2 + 1/400^2 = (16 + 9)/(1.44\times10^6)$, so $\omega_1 = 1200/5 = 240\ \mathrm{rad/s}$. This is a lower bound: the true value is somewhat higher.
:::
:::

::: exercise Enlarging a shaft for bearing slope {level=2 check="45"}
A uniform $30\ \mathrm{mm}$ shaft is calculated to have a slope of $0.00405\ \mathrm{rad}$ at a cylindrical roller bearing whose permissible slope is $0.0008\ \mathrm{rad}$. With a design factor of $1$, what diameter is needed? (Enter $d$ in mm.)
::: solution
By [[#eq-scaling]], $d = 30\times(0.00405/0.0008)^{1/4} = 30\times5.0625^{1/4} = 30\times1.5 = 45\ \mathrm{mm}$. The slope varies as $d^{-4}$, so a 50 % larger diameter divides it by about $5$.
:::
:::

::: exercise Factor of safety at a shoulder {level=2}
A rotating shaft of diameter $40\ \mathrm{mm}$ has, at a shoulder fillet, a rotating bending moment of $300\ \mathrm{N\,m}$ and a steady torque of $400\ \mathrm{N\,m}$, with $K_f = 1.7$ and $K_{fs} = 1.5$. The fully corrected endurance limit is $S_e = 220\ \mathrm{MPa}$, $S_{ut} = 700\ \mathrm{MPa}$, $S_y = 500\ \mathrm{MPa}$. Find the DE-Goodman and DE-ASME-elliptic factors of safety and the yield factor of safety.
::: solution
**Stresses.** $\sigma_a = 1.7\times32\times300\,000/(\pi\times40^3) = 81.2\ \mathrm{MPa}$; $\tau_m = 1.5\times16\times400\,000/(\pi\times40^3) = 47.7\ \mathrm{MPa}$; $\sigma_m' = \sqrt3\times47.7 = 82.7\ \mathrm{MPa}$.

**DE-Goodman.** $1/n = 81.2/220 + 82.7/700 = 0.369 + 0.118 = 0.487$, $n = 2.05$.

**DE-ASME elliptic.** $1/n = \sqrt{(81.2/220)^2 + (82.7/500)^2} = \sqrt{0.1361 + 0.0274} = 0.404$, $n = 2.47$.

**Yield.** $\sigma'_{\max} = \sqrt{81.2^2 + 3\times47.7^2} = 115.9\ \mathrm{MPa}$, $n_y = 500/115.9 = 4.31$.
:::
:::

::: exercise Torque capacity of a press fit {level=2}
A gear hub is pressed onto a $40\ \mathrm{mm}$ shaft over a length of $50\ \mathrm{mm}$; the contact pressure (from the thick-cylinder analysis at the minimum interference) is $30\ \mathrm{MPa}$ and $\mu = 0.12$. Find the torque and the axial force the fit can transmit, and compare the torque with that of a $12\times8\ \mathrm{mm}$ key, $40\ \mathrm{mm}$ long, with $3\ \mathrm{mm}$ hub engagement in a material with $S_y = 390\ \mathrm{MPa}$ (crushing, factor of safety $1$).
::: solution
**Press fit.** $T = \tfrac{\pi}{2}\times0.12\times30\times40^2\times50 = 452\,400\ \mathrm{N\,mm} = 452\ \mathrm{N\,m}$; $F_a = \pi\times0.12\times30\times40\times50 = 22\,600\ \mathrm{N}$.

**Key.** Crushing force $F = h_clS_y = 3\times40\times390 = 46\,800\ \mathrm{N}$, $T = Fd/2 = 46\,800\times0.020 = 936\ \mathrm{N\,m}$.

**Comment.** The key carries about twice as much, but the press fit has no keyseat, centres the hub precisely and carries axial load. Its capacity depends directly on $\mu$ and on the minimum interference, both uncertain, so press fits for torque are designed with generous margins or combined with a key.
:::
:::

::: exercise The DE-Gerber equation {level=3}
Derive [[#eq-de-gerber]] from the Gerber criterion $n\sigma_a'/S_e + (n\sigma_m'/S_{ut})^2 = 1$ and the von Mises equivalent stresses of [[#prop-de-goodman]]. Show that it reduces to the DE-Goodman result when the mean stress is zero.
::: solution
**Equivalent stresses.** From the proof of [[#prop-de-goodman]], $\sigma_a' = 16A/(\pi d^3)$ and $\sigma_m' = 16B/(\pi d^3)$.

**Quadratic in $n$.** The Gerber condition $\dfrac{n\sigma_a'}{S_e} + \dfrac{n^2\sigma_m'^2}{S_{ut}^2} = 1$ is a quadratic $\alpha n^2 + \beta n - 1 = 0$ with $\alpha = \sigma_m'^2/S_{ut}^2$, $\beta = \sigma_a'/S_e$. Its positive root, written as $1/n$, is
$$
\frac1n = \frac{2\alpha}{-\beta + \sqrt{\beta^2 + 4\alpha}} = \frac{2\alpha(\beta + \sqrt{\beta^2 + 4\alpha})}{4\alpha} = \frac{\beta}{2}\left[1 + \sqrt{1 + \frac{4\alpha}{\beta^2}}\right],
$$
after multiplying numerator and denominator by $\beta + \sqrt{\beta^2 + 4\alpha}$.

**Substitute.** $\beta/2 = 8A/(\pi d^3S_e)$ and $4\alpha/\beta^2 = 4\sigma_m'^2S_e^2/(S_{ut}^2\sigma_a'^2) = (2BS_e/(AS_{ut}))^2$, which gives [[#eq-de-gerber]].

**Zero mean.** With $B = 0$ the bracket is $2$ and $1/n = 16A/(\pi d^3S_e)$, the DE-Goodman result with $B = 0$: the criteria differ only through the mean stress.
:::
:::

::: exercise How good is Rayleigh's method? {level=3}
A uniform shaft of mass $m'$ per unit length is simply supported over a span $l$. Its static deflection under its own weight $w = m'g$ per unit length is $y(x) = \dfrac{w}{24EI}\,x\,(l^3 - 2lx^2 + x^3)$. Using the continuous form of Rayleigh's estimate, $\omega^2 = g\int_0^l y\,dx\big/\int_0^l y^2\,dx$, find $\omega_1$ and compare it with the exact [[#eq-uniform]].
::: solution
**Integrals.** With $\xi = x/l$, $y = \dfrac{wl^4}{24EI}\,\xi(1 - 2\xi^2 + \xi^3)$. Then $\int_0^1\xi(1 - 2\xi^2 + \xi^3)\,d\xi = \tfrac12 - \tfrac12 + \tfrac15 = \tfrac15$, and
$$
\int_0^1\xi^2(1 - 2\xi^2 + \xi^3)^2d\xi = \int_0^1(\xi^2 - 4\xi^4 + 2\xi^5 + 4\xi^6 - 4\xi^7 + \xi^8)\,d\xi = \tfrac13 - \tfrac45 + \tfrac13 + \tfrac47 - \tfrac12 + \tfrac19 = \tfrac{31}{630}.
$$

**Estimate.** $\omega^2 = \dfrac{g\,(wl^4/24EI)\,l\,(1/5)}{(wl^4/24EI)^2\,l\,(31/630)} = \dfrac{24EI}{m'l^4}\cdot\dfrac{630}{5\times31} = \dfrac{3024}{31}\,\dfrac{EI}{m'l^4}$, so $\omega_1 \approx \dfrac{9.877}{l^2}\sqrt{\dfrac{EI}{m'}}$.

**Comparison.** The exact coefficient is $\pi^2 = 9.870$. Rayleigh's estimate is high, as it must be, by only $0.07$ %: the static deflection curve under uniform load is very close to the half-sine mode shape.
:::
:::

::: exercise Design a two-gear countershaft {level=3}
A countershaft transmits $7.5\ \mathrm{kW}$ at $500\ \mathrm{rpm}$. Bearings $A$ and $B$ are $400\ \mathrm{mm}$ apart. A driven spur gear $C$ (pitch diameter $240\ \mathrm{mm}$) is $100\ \mathrm{mm}$ from $A$, and a driving spur pinion $D$ (pitch diameter $80\ \mathrm{mm}$) is $300\ \mathrm{mm}$ from $A$; pressure angles are $20°$. Taking $x$ along the shaft, the mating gears are placed so that the forces on the shaft are: at $C$, $W_t$ in $-y$ and $W_r$ in $-z$; at $D$, $W_r$ in $+y$ and $W_t$ in $-z$. Propose a layout (bearing arrangement, shoulders, means of locating the gears), find the critical sections, and choose diameters for a DE-Goodman design factor of $1.5$ with cold-drawn AISI 1050 ($S_{ut} = 690$, $S_y = 580\ \mathrm{MPa}$), both gears keyed. Say what you would check next.
::: solution
**Torque and forces.** $T = 7500/(2\pi\times500/60) = 143.2\ \mathrm{N\,m}$, between $C$ and $D$ only. At $C$: $W_t = 2\times143.2/0.240 = 1194\ \mathrm{N}$, $W_r = 434\ \mathrm{N}$. At $D$: $W_t = 2\times143.2/0.080 = 3581\ \mathrm{N}$, $W_r = 1303\ \mathrm{N}$.

**Reactions and moments.** In the $xy$ plane ($-1194\ \mathrm{N}$ at $C$, $+1303\ \mathrm{N}$ at $D$): $R_{By} = -(-1194\times0.1 + 1303\times0.3)/0.4 = -679\ \mathrm{N}$, $R_{Ay} = 569\ \mathrm{N}$; $M_{Cy} = 56.9$, $M_{Dy} = -67.9\ \mathrm{N\,m}$. In the $xz$ plane ($-434$ at $C$, $-3581\ \mathrm{N}$ at $D$): $R_{Az} = 1221\ \mathrm{N}$, $R_{Bz} = 2794\ \mathrm{N}$; $M_{Cz} = 122.1$, $M_{Dz} = 279.4\ \mathrm{N\,m}$. Resultants: $M_C = 134.7\ \mathrm{N\,m}$, $M_D = 287.6\ \mathrm{N\,m}$; bearing loads $1347\ \mathrm{N}$ at $A$ and $2876\ \mathrm{N}$ at $B$.

**Layout (one sensible choice).** Fixed bearing at $B$ (the more heavily loaded one, near the pinion), clamped by a locknut; floating bearing at $A$. A central collar between the gears, about $48\ \mathrm{mm}$, forms the shoulders for both gears; spacer sleeves hold the gears against it from the bearing inner rings. Keyseats end short of the shoulder fillets.

**Diameters.** At the pinion keyseat ($M_a = 287.6\ \mathrm{N\,m}$, $T_m = 143.2\ \mathrm{N\,m}$, $K_f = 2.14$, $K_{fs} = 3.0$), iterating [[#eq-de-goodman-d]] with $k_b$ gives $d = 36.5\ \mathrm{mm}$ ($S_e \approx 232\ \mathrm{MPa}$): choose $40\ \mathrm{mm}$ (DIN key $12\times8$). At the gear keyseat ($M_a = 134.7\ \mathrm{N\,m}$) $d = 29.9\ \mathrm{mm}$: choose $35\ \mathrm{mm}$, so that the gear can pass over the bearing seat, and bearing seats of $30\ \mathrm{mm}$ near the ends where the moments vanish (check the fillets there with the local $M$ and $T$; at $B$ there is no torque). The pinion is small: with a $40\ \mathrm{mm}$ bore and a keyway, the rim under its teeth is thin, and a pinion cut integral with the shaft may be better.

**Next checks.** Recheck each fillet and keyseat with real $K_t$, $q$ and $k_b$; deflection and slope at $D$ (the heavy pinion load near $B$) and slopes at the bearings, against the limits for the chosen bearings; the first critical speed (at $500\ \mathrm{rpm}$ almost certainly far above the running speed); bearing life with the reactions ([[machine-design/bearings]]); key lengths. Different but equally valid layouts — pinion integral, different bearing arrangement — lead to different numbers; what matters is that each choice is justified.
:::
:::
