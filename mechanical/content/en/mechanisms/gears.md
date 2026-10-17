---
id: mechanisms/gears
title: "Spur, Helical and Bevel Gears"
summary: "The law of gearing, why the involute won, minimum teeth and interference, contact ratio, bending and pitting strength, helical geometry and how to choose a gear."
translated: false
tags: ["involute", "pressure angle", "contact ratio", "Lewis bending", "pitting", "helical gears"]
---

::: warning The gear is the only positive-drive return mechanism
A cam can push and cannot pull, and everything in [[mechanisms/cams]] is an argument about what happens when that asymmetry is pushed hard enough. A gear has no such problem: **its teeth are form-closed in both directions**, so a gear pair transmits torque through a reversal, through a stall, through an oscillation, with no spring, no gravity and no second mechanism holding the contact. That is the whole reason the gear is the most widely used machine element in existence and the reason its failure — not a broken cam, but a spalled tooth flank or a sheared tooth root — takes a machine out of service just as completely.

The price of form-closure is a chain of constraints that cams do not have to obey. **Two gears must have the same module.** They must be cut by the same basic rack. Their centre distance is fixed to within a few hundredths of a millimetre by the geometry that makes them roll without slipping, and getting it wrong does not merely introduce backlash, it destroys the contact ratio. And their tooth count is bounded below by interference, which is why the smallest gear in almost every gearbox is the one that decides the module.
:::

## What you already know

- **Rolling without slipping** — the pitch circles of a gear pair are the two circles that roll on each other, exactly as the wheels of [[mechanisms/mechanisms-mobility]]'s friction-drive discussion did, with the difference that the teeth make the rolling exact rather than dependent on friction.
- **Transmission angle and pressure angle** — the cam's $\tan \psi = s' / \left( r_p + s \right)$ in [[mechanisms/cams]] is a special case of the gear's pressure angle, and the gear's is *constant* while the cam's wanders through the lift.
- **Hertz contact stress** — $p_0 = \sqrt{ F E^{*} / ( \pi b R ) }$ from [[mechanisms/cams]] governs gear pitting exactly as it governed cam wear, with one crucial difference: the relative radius of curvature $R$ at a gear contact *changes continuously* through the mesh, and goes to zero at the ends of the path of contact.
- **Instant centres** — the pitch point of a gear pair is the instant centre of the two links, and Kennedy's theorem in [[mechanisms/velocity-analysis]] is what forces it to stay put.
- **Equivalent inertia and torque** — $T_{\mathrm{eq}} = T / \left( \eta i \right)$ and $J_{\mathrm{eq}} = J / i^{2}$ from [[mechanisms/acceleration-analysis]], which is why a gearbox is chosen as much for the inertia it hides as for the speed it produces.

## The law of gearing: why there is only one family of curves that works

::: definition The law of gearing {#def-law}
Two tooth profiles are **conjugate** — they transmit a constant angular velocity ratio — if and only if **the common normal to the two surfaces at every point of contact passes through a fixed point on the line of centres**. That fixed point is the **pitch point** $P$, and the two circles through $P$ centred on the two axes are the pitch circles.

Equivalently, with $O_1 P = r_1$, $O_2 P = r_2$ and $N_1$, $N_2$ the feet of the perpendiculars from the two centres to the common normal,

$$
\frac{\omega_1}{\omega_2} = \frac{r_2}{r_1} = \frac{O_2 N_2}{O_1 N_1} \cos^{2} \theta_{\mathrm{press}} \quad \Rightarrow \quad \boxed{ \; O_1 N_1 \ \text{and} \ O_2 N_2 \ \text{cut by the common normal must give a constant ratio} \; }
$$

and the simplest way to guarantee that is to make $N_1$ and $N_2$ *fixed points* — that is, to make the common normal a **fixed straight line tangent to two fixed circles**. Those circles are the base circles, and the profiles that do it are involutes.
:::

::: exercise Derivation: why the base circles must be tangent {#deriv-involute level=3}
::: solution
Take a common normal that is a fixed line $\ell$ tangent to a circle of radius $r_{b1}$ about $O_1$ and to a circle of radius $r_{b2}$ about $O_2$. The contact point may be anywhere along $\ell$, so the ratio $O_1 N_1 / O_2 N_2 = r_{b1} / r_{b2}$ is constant by construction, and the law of gearing is satisfied *at every contact point simultaneously* — which is more than any curved-normal family achieves.

Now ask what profile on link 1 is compatible with an arbitrary profile on link 2. As link 1 rolls on link 2 without slipping, the contact point traces on link 1 the locus of the tangency point of a line rolling on the base circle. **Unwrap a taut string from a circle of radius $r_b$: the free end traces the involute**, and the parametric form falls straight out of the construction, with $t$ the unwound angle,

$$
x = r_b \left( \cos t + t \sin t \right) , \qquad y = r_b \left( \sin t - t \cos t \right)
$$

so that the radius and the local pressure angle at parameter $t$ are

$$
r = r_b \sqrt{ 1 + t^{2} } , \qquad \cos \phi = \frac{r_b}{r} = \frac{1}{\sqrt{ 1 + t^{2} } } , \qquad t = \tan \phi
$$

and the **involute function**, the angular half-width of the tooth as a function of pressure angle, is

$$
\operatorname{inv} \phi = \tan \phi - \phi
$$

Two facts follow and both matter in practice. **The involute of a circle depends on one parameter only, $r_b$** — so a gear of 20 teeth and a gear of 200 teeth with the same base circle carry the same curve, which is what makes a single cutting tool work for a whole range of tooth counts. **And the involute exists only outside its base circle**, which is the geometric root of every one of the limits in this lesson: minimum teeth, undercutting, and the fact that a gear with too few teeth is not merely weak but *geometrically wrong*.
:::
:::

::: widget plot
title: Involute shape and the involute function
f: 1/cos(x*pi/180); 1/cos(14.5*pi/180)
x: 0, 30
y: 1, 1.15
labels: r/r_base, r/r_base at 14.5 degrees
caption: Every involute is the same curve scaled by its base radius. Reading outward from the base circle, the radius grows as $1 / \cos \phi$ and the tooth thins by $2 \operatorname{inv} \phi$ per unit radius — the two effects that together produce undercutting. The straight line is $r / r_b$ against the working pressure angle; the horizontal line marks the 14.5° historical standard, whose involute barely reaches $r / r_b = 1.055$ before the tooth has thinned to nothing.
:::

## Why the involute won, against better-looking curves

Three families were tried before the involute was standardised in the middle of the nineteenth century, and the reasons each lost are worth knowing because each is still used somewhere.

**The epicycloid** — the curve traced by a point on a circle rolling *outside* another — was the standard for clock and textile machinery until about 1900 and is still used in clock wheels. It is generated by rolling circles whose diameters are in the ratio of the gear ratio, which means **an epicycloidal pinion will only work with one wheel**. It is also stronger in bending, because the flank is convex-against-concave over the whole contact and the film is thicker. It lost because of the first property: a standardised interchangeable gear system cannot be built from curves that are ratio-specific.

**The cycloid** — a point on a circle rolling *inside* — is the internal mate of the epicycloid and shares its ratio-specificity. It survives in **rotary-engine and Roots-blower lobes**, where the ratio is fixed by definition and the conjugate action must be exact over a very large contact.

**The involute** is generated by a straight line rolling on a circle, so **its generating element is a straight line — which means the cutting tool's cutting edge is a straight line, which means it can be made, ground, checked and replicated to a tolerance no cam could hold.** A rack of the same straight-sided profile is the *same* tool. A hob is nothing but a rack wrapped round a cylinder. The involute won the world not because it is the best curve but because **it is the only one whose tool is a straight line**, and gear manufacture is the history of that fact.

The consequence you pay for: the involute's contact curvature is poor near the ends of the path of contact, its tooth is thin at the root, and it is sensitive to centre distance. Every one of those costs is a direct result of the manufacturing advantage that made it standard.

## The geometry of a spur gear

::: definition Standard proportions {#def-proportions}
A spur gear is defined by its **module** $m = d / N$ (millimetres per tooth, the SI replacement for the diametral pitch $P = 25.4 / m$ still used in inch practice), its tooth count $N$ and its pressure angle $\phi$. The standard full-depth proportions, from the basic rack of ISO 53 or AGMA 291.02, are

| Feature | Symbol | Value | Note |
|---|---|---|---|
| Pitch diameter | $d$ | $m N$ | Where the pitch circles roll |
| Base diameter | $d_b$ | $m N \cos \phi$ | The involute's generating circle |
| Addendum | $a$ | $1.0 \, m$ | Pitch circle to tip |
| Dedendum | $b_d$ | $1.25 \, m$ | Pitch circle to root; $0.25 m$ is radial clearance |
| Tip diameter | $d_a$ | $m ( N + 2 )$ | |
| Root diameter | $d_f$ | $m ( N - 2.5 )$ | |
| Circular pitch | $p$ | $\pi m$ | Arc, pitch circle to pitch circle |
| Base pitch | $p_b$ | $\pi m \cos \phi$ | **The pitch that actually matters** |
| Tooth thickness | $s$ | $\pi m / 2$ | On the pitch circle, for zero backlash |
| Centre distance | $C$ | $m ( N_1 + N_2 ) / 2$ | Standard, unshifted |

**The base pitch, not the circular pitch, is the quantity that governs whether two gears mesh.** Two gears mesh if and only if their base pitches are equal, and since $p_b = \pi m \cos \phi$ that means equal module *and* equal pressure angle. A $14.5^{\circ}$ gear and a $20^{\circ}$ gear of the same module will not mesh at all, and a $20^{\circ}$ gear will not mesh with a $20^{\circ}$ helical gear's transverse section unless the helix is accounted for.
:::

::: example Geometry of a 24-tooth, module-4 pinion {#ex-geometry}
Compute the diameters, the pitches and the tooth thickness at the base circle for $N = 24$, $m = 4\ \mathrm{mm}$, $\phi = 20^{\circ}$.

**Answer.** $d = 96$, $d_a = 104$, $d_f = 86$, $C$ with a $72$-tooth wheel $= 192\ \mathrm{mm}$.

::: solution
$$
d_b = 96 \cos 20^{\circ} = 90.21\ \mathrm{mm} , \qquad p = \pi \times 4 = 12.566\ \mathrm{mm} , \qquad p_b = 12.566 \times 0.93969 = 11.808\ \mathrm{mm}
$$

The tooth thickness at any radius $r_x$ follows from the constancy of the base-circle "space": the arc from the tooth centreline to the flank, measured on the base circle, is invariant,

$$
s_x = 2 r_x \left[ \frac{s}{d} + \operatorname{inv} \phi - \operatorname{inv} \phi_x \right] , \qquad \cos \phi_x = \frac{d_b}{d_x}
$$

At the base circle $\phi_x = 0$, $\operatorname{inv} 0 = 0$, and with $s = \pi m / 2 = 6.283\ \mathrm{mm}$, $\operatorname{inv} 20^{\circ} = 0.36397 - 0.34907 = 0.014904$,

$$
s_b = 2 \times 45.106 \times \left[ \frac{6.283}{96} + 0.014904 \right] = 90.21 \times 0.080402 = 7.253\ \mathrm{mm} = 1.813 \, m
$$

**Compare with the $1.571 \, m$ at the pitch circle: the tooth has lost a quarter of its thickness between the pitch circle and the base circle, and it keeps losing.** That is undercutting in embryo, and the reason the number of teeth — not the module, not the face width — decides whether a gear is manufacturable at all.
:::
:::

## Interference: the tooth count below which the gear is wrong

The involute exists only outside the base circle. Below the base circle the flank is not an involute at all — it is whatever the cutting tool left behind, and the cutting tool is a rack-shaped hob whose tip sweeps a cycloid. If the *other* gear's tip reaches down into that region, it digs a scoop out of the flank near the root. That is **interference**, and unlike every other failure in this lesson it is not a matter of degree: an interfering gear is not a slightly worse gear, it is a gear whose tooth has been cut away where the tooth was needed.

::: theorem Minimum teeth to avoid interference {#thm-minteeth}
For a pinion of $N_1$ teeth driving an external gear of $N_2 = G N_1$ teeth at standard centres, with pressure angle $\phi$ and addendum $a = 1.0 \, m$, interference begins when either tip circle crosses the tangency point of the line of action with the *other* base circle. Writing $r = m N / 2$, $r_a = r + m$, $r_b = r \cos \phi$ and $C = r_1 + r_2$, the condition that the gear's tip stay inside the line of action is

$$
\sqrt{ r_{a2}^{2} - r_{b2}^{2} } \; \le \; C \sin \phi
$$

which reduces, after squaring and cancelling, to

$$
\boxed{ \; N_1 \left( N_1 + 2 N_2 \right) \ \ge \ \frac{4 \left( N_2 + 1 \right)}{\sin^{2} \phi} \; } \qquad \text{and symmetrically} \qquad N_2 \left( N_2 + 2 N_1 \right) \ \ge \ \frac{4 \left( N_1 + 1 \right)}{\sin^{2} \phi}
$$

For a pinion against a **rack** ($G \to \infty$) this collapses to the famous

$$
\boxed{ \; N_{\min} = \frac{2}{\sin^{2} \phi} \; } \qquad \Rightarrow \qquad
\begin{cases} N_{\min} = 31.9 & \phi = 14.5^{\circ} \\[4pt] N_{\min} = 17.1 & \phi = 20^{\circ} \\[4pt] N_{\min} = 11.2 & \phi = 25^{\circ} \end{cases}
$$
:::

::: widget plot
title: Minimum pinion teeth against pressure angle
f: 2/pow(sin(x*pi/180),2)
x: 14, 30
y: 8, 40
caption: The rack case, $N_{\min} = 2 / \sin^{2} \phi$. **The curve is brutally steep at the low-pressure-angle end**: moving from $14.5^{\circ}$ to $20^{\circ}$ throws away fifteen teeth of minimum, which is exactly why the nineteenth century's $14.5^{\circ}$ standard was abandoned as soon as gear-cutting machinery made the changeover cheap. The $20^{\circ}$ value of 17.1 is the origin of the industry's habit of never specifying a pinion below 17 teeth, and of the profile-shift system's entire reason for existing, which is to let you use 12.
:::

::: example Reading the interference table {#ex-interference}
Find the smallest unshifted $20^{\circ}$ pinion for ratios $G = 1$, $G = 3$ and $G = \infty$, and check whether a $19 / 57$ pair is safe.

**Answer.** Solving $G N + 1 \le N^{2} ( 1 + 2 G ) \sin^{2} \phi / 4$ for $N$:

| Ratio $G$ | Minimum $N_1$ | Binding constraint |
|---|---|---|
| 1 | 12.32 → **13** | either, by symmetry |
| 3 | 14.98 → **15** | gear tip into pinion flank |
| $\infty$ (rack) | 17.10 → **18** | rack tip into pinion flank |

::: solution
The $19 / 57$ pair has $G = 3$ and $N_1 = 19 > 15$, so it is safe with four teeth to spare. Checking the geometry directly for the pinion,

$$
\sqrt{ r_{a1}^{2} - r_{b1}^{2} } = \sqrt{ 28.5^{2} - 26.69^{2} } = 10.29\ \mathrm{mm} \; < \; C \sin \phi = 114 \times 0.34202 = 38.99\ \mathrm{mm}
$$

**Two things in the table are worth dwelling on.** First, the minimum pinion tooth count *increases* with the gear ratio, from 13 at 1:1 to 18 against a rack — a small gear meshing with a big one is worse off than two identical ones, because a big gear's tip circle is nearly a straight line and a straight-sided rack tip is the worst possible shape to dig with. Second, **the number 17 is not a strength limit and not a manufacturing limit.** An 18-tooth pinion and a 12-tooth pinion of the same module carry almost the same bending load; the 12-tooth one has simply been scooped.
:::
:::

::: warning Profile shift is not a refinement, it is the standard solution
Every limit in the last section assumes the **standard rack**, with addendum exactly $1.0 \, m$ and the pitch circle of the gear tangent to the pitch line of the rack. Slide the rack away from the gear centre by $x m$ — a **profile shift** or **addendum modification** of $x$ — and the tooth you generate is thicker at the base, the tip is narrower, and the interference condition becomes

$$
N_{\min} ( x ) = \frac{ 2 \left( 1.0 - x \right)}{\sin^{2} \phi} \qquad \Rightarrow \qquad x = + 0.3 \ \text{brings} \ N_{\min} \ \text{from} \ 17.1 \ \text{to} \ 12.0
$$

The whole ISO 53 addendum-modification system exists to buy those five teeth, because five teeth is the difference between a $57\ \mathrm{mm}$ pinion and a $38\ \mathrm{mm}$ pinion, which is the difference between a gearbox that fits and one that does not. **The cost is that the gears are no longer interchangeable, no longer cut by a standard tool without setting, and no longer tolerant of centre-distance error** — a shifted pair must be run at its design centre distance to within tighter tolerances than an unshifted one, for reasons the next section makes quantitative. In practice: $x_1 = +0.4$, $x_2 = -0.4$ for a pair, summing to zero so the standard centre distance still works, is the most common single decision in gear proportioning and the one least often written down on the drawing.
:::

## Contact ratio: how many teeth are carrying

::: definition Contact ratio {#def-crr}
The **path of contact** is the length of the line of action swept by the contact point, from where the pinion's tip circle crosses it to where the gear's tip circle crosses it,

$$
L = \sqrt{ r_{a1}^{2} - r_{b1}^{2} } + \sqrt{ r_{a2}^{2} - r_{b2}^{2} } - C \sin \phi
$$

The **transverse contact ratio** is that length measured in base pitches,

$$
\boxed{ \; m_p = \frac{L}{p_b} = \frac{ \sqrt{ r_{a1}^{2} - r_{b1}^{2} } + \sqrt{ r_{a2}^{2} - r_{b2}^{2} } - C \sin \phi }{ \pi m \cos \phi } \; }
$$

and it is the average number of tooth pairs in contact. **A contact ratio below 1.0 is not merely inefficient — it is a pair of cam-follower pairs**, with the line of action no longer guaranteed to pass through the pitch point and the velocity ratio no longer constant.
:::

::: widget plot
title: Contact ratio against pinion size, 3:1 pair
f: (sqrt(pow(1.5*x+1,2)-pow(1.4095389*x,2))+sqrt(pow(0.5*x+1,2)-pow(0.4698463*x,2))-2*x*0.3420201)/(pi*0.9396926)
x: 15, 80
y: 1.4, 1.9
caption: Contact ratio for a 3:1 pair of unshifted $20^{\circ}$ gears of any module, against pinion tooth count. **The curve is nearly flat above 25 teeth** — going from a 30-tooth to a 60-tooth pinion buys only 0.10 of contact ratio while quadrupling the gearbox. Below 20 teeth it rises steeply, which is one of the few genuine arguments for a small pinion: **more teeth in contact, hence lower load per tooth and less noise.** The 15-tooth end of the curve is only reachable with profile shift.
:::

::: example Contact ratio of a 20/40 module-3 pair {#ex-crr}
Compute the path of contact and the contact ratio for $N_1 = 20$, $N_2 = 40$, $m = 3\ \mathrm{mm}$, $\phi = 20^{\circ}$, standard proportions and standard centres.

**Answer.** $L = 14.48\ \mathrm{mm}$, $m_p = 1.635$.

::: solution
$$
r_1 = 30 , \quad r_{a1} = 33 , \quad r_{b1} = 28.190 \qquad r_2 = 60 , \quad r_{a2} = 63 , \quad r_{b2} = 56.382 \qquad C = 90
$$

$$
L = \sqrt{ 63^{2} - 56.382^{2} } + \sqrt{ 33^{2} - 28.190^{2} } - 90 \times 0.34202 = 28.109 + 17.155 - 30.782 = 14.48\ \mathrm{mm}
$$

$$
p_b = \pi \times 3 \times 0.93969 = 8.857\ \mathrm{mm} \qquad \Rightarrow \qquad m_p = \frac{ 14.48 }{ 8.857 } = \boxed{ 1.635 }
$$

**Read what the 0.635 means.** For 63.5% of the mesh cycle two pairs of teeth share the load and for 36.5% only one pair carries it — and the transition between the two is not smooth. As the second pair comes into contact its own tooth-thickness error and its own deflection under load mean the load does not step from one pair to two instantly; it ramps, and the ramp is a **transmission-error fluctuation at the mesh frequency**, which is the dominant source of gear whine. **The single most effective noise treatment available to a gear designer is to raise the contact ratio from 1.4 to 1.7**, and the two ways of doing it — more teeth at smaller module, or a helix angle — are the two ways it is done.
:::
:::

## Centre distance: the tolerance that is tighter than it looks

An unshifted gear pair is designed for $C = m ( N_1 + N_2 ) / 2$. Put it at a slightly larger centre distance and it still turns — nothing jams — but three things happen at once, and the third is the one that surprises people.

1. **Backlash appears.** The tooth space is wider than the tooth by $j \approx 2 \Delta C \tan \phi$ at the pitch circle.
2. **The operating pressure angle rises.** The pitch circles are no longer the reference circles; the gears now roll on each other at whatever radii make the base circles tangent to a line through the new centre. The involute function is what relates them:

$$
\operatorname{inv} \phi_{\mathrm{op}} = \operatorname{inv} \phi + \frac{ 2 \tan \phi \; \Delta C }{ r_1 + r_2 }
$$

3. **The contact ratio collapses**, because $C \sin \phi$ in the numerator of $L$ grows while both tip-circle terms stay fixed.

::: example Centre-distance sensitivity, 20/40 module-3 {#ex-centre}
::: solution
| $\Delta C$ (mm) | $\phi_{\mathrm{op}}$ | backlash $j$ (mm) | $m_p$ |
|---|---|---|---|
| 0 | $20.00^{\circ}$ | 0 | 1.635 |
| +0.05 | $20.17^{\circ}$ | 0.037 | 1.606 |
| +0.10 | $20.34^{\circ}$ | 0.074 | 1.578 |
| +0.20 | $20.67^{\circ}$ | 0.151 | 1.522 |
| +0.45 | $21.46^{\circ}$ | 0.354 | 1.388 |
| +0.90 | $22.72^{\circ}$ | 0.754 | 1.168 |
| +1.80 | $24.86^{\circ}$ | 1.668 | 0.779 |

**Half a tenth of a millimetre of extra centre distance costs one twentieth of a contact ratio.** A housing bored at $\pm 0.1\ \mathrm{mm}$ — a tolerable figure for a general-purpose machining operation — therefore costs about a tenth of contact ratio, which is about a sixth of the load-sharing benefit and enough to be audible. This is why gearbox housings are jig-bored in one setting with the covers bolted on, why the bearing bores are often reamed after final assembly, and why the tolerance on centre distance in a quality-10 aerospace gearbox is $\pm 0.013\ \mathrm{mm}$ and not $\pm 0.1$.

**And note the shape of the last two rows.** At $+ 0.9\ \mathrm{mm}$ the contact ratio has fallen below 1.2 and the pair is approaching single-pair contact through the whole cycle; at $+ 1.8\ \mathrm{mm}$ it is below 1.0, which means the gears are no longer conjugate over the whole mesh and are being driven partly by tooth-tip interference. **Nothing about that gearbox is visibly wrong — the shafts turn freely, the backlash looks generous, and the teeth will fail in a few thousand cycles.**
:::
:::

## Tooth bending: the oldest strength formula in mechanical engineering

::: definition The Lewis equation {#def-lewis}
Model the tooth as a cantilever loaded at the outer corner of the tip, along the line of action. Cut it at the section where an inscribed parabola of uniform strength is tangent to the loaded flank — in practice, at or just below the base circle — and write bending stress as $\sigma = M c / I$ for a rectangular section of thickness $t$ and unit width:

$$
\sigma_F = \frac{6 W_t a}{b \, t^{2}}
$$

with $W_t$ the transmitted load, $a$ the moment arm from the load to the critical section and $b$ the face width. Writing $t = Y' m$ and $a = k' m$ turns this into the **Lewis equation**,

$$
\boxed{ \; \sigma_F = \frac{ W_t }{ b \, m \, Y } \; } \qquad Y = \frac{ t^{2} }{ 6 a m }
$$

where $Y$ is the **Lewis form factor**, a pure number depending on tooth count and pressure angle alone. The tooth is then checked against a bending endurance $\sigma_{F,\lim}$ with a safety factor, exactly as a shaft is checked against a fatigue limit — because that is what it is: **a tooth root fails as a fully-reversed bending fatigue specimen cycling at the mesh frequency.**
:::

The Lewis equation dates from 1892 and is still, in essence, what every gear code does. What it omits is worth listing, because each omission is a correction factor in the modern AGMA and ISO formulations:

| Omission | Consequence | AGMA factor | Typical |
|---|---|---|---|
| Stress concentration at the root fillet | Actual root stress 30-50% higher | built into $Y$ / $J$ | 1.2-1.5 |
| Shear and compression on the section | few per cent | ignored | — |
| Load shared between two pairs | 15-20% lower where $m_p > 1$ | $1 / m_p$-type | 0.85 |
| Tooth deflection and dynamic overshoot | load rises with speed | $K_v$ | 1.05-1.6 |
| Misalignment and shaft deflection | load crowds one end | $K_{H\beta}$ | 1.05-1.4 |
| Unequal tooth spacing | overload on the stiffest pair | $K_{H\alpha}$ | 1.05-1.25 |
| Duty cycle and starting peaks | the real peak, not the average | $K_A$ | 1.0-2.0 |

::: example Bending stress in a 55 kW industrial pinion {#ex-bend}
A $55\ \mathrm{kW}$, $730\ \mathrm{rev / min}$ blower reducer runs at $i = 5.22$ on an $18 / 94$ pair of module $6$, pressure angle $20^{\circ}$, unshifted, in 42CrMo4 quenched and tempered at $300\ \mathrm{HB}$, hobbed to AGMA quality 8, oil-bath lubricated. Design life $10^{9}$ revolutions of the pinion. Take the pinion face width $b_1 = 75\ \mathrm{mm}$, the wheel $b_2 = 70\ \mathrm{mm}$, $K_A = 1.25$, and a root-fillet factor $K_F = 1.4$.

**Answer.** $\sigma_F = 170\ \mathrm{MPa}$ at the pinion root against $\sigma_{F,\lim} = 430\ \mathrm{MPa}$: $S_F = 2.5$.

::: solution
$$
T_1 = \frac{ 55\,000 }{ 730 \times 2 \pi / 60 } = 719.5\ \mathrm{N \cdot m} , \qquad d_1 = 6 \times 18 = 108\ \mathrm{mm} , \qquad W_t = \frac{ 2 \times 719.5 }{ 0.108 } = 13\,323\ \mathrm{N}
$$

The critical-section thickness comes from the base-circle formula of [[#ex-geometry]],

$$
s_b = 2 r_b \! \left[ \frac{ \pi m }{ 2 d} + \operatorname{inv} \phi \right] = 2 \times 50.74 \times \left[ \frac{ \pi }{ 36 } + 0.014904 \right] = 10.37\ \mathrm{mm} = 1.728 \, m
$$

and with the standard moment arm $a = 1.2 \, m = 7.2\ \mathrm{mm}$ and the wheel's narrower face width governing,

$$
\sigma_F = K_F K_v \frac{1}{\bar{m}_p} \frac{ 6 W_t a }{ b \, s_b^{2} } = 1.4 \times 1.25 \times \frac{ 1 }{ 0.85 } \times \frac{ 6 \times 13\,323 \times 7.2 }{ 70 \times 10.37^{2} } = 2.059 \times 82.4 = \boxed{ 170\ \mathrm{MPa} }
$$

**The number is unremarkable and that is the point.** A $300\ \mathrm{HB}$ through-hardened gear has a bending endurance near $430\ \mathrm{MPa}$ at $10^{9}$ cycles, so the tooth is running at 40% of its bending capacity and the bending failure will never happen. **Ask instead what the face width would be if bending alone set the design: $24.5\ \mathrm{mm}$.** The gear has $70\ \mathrm{mm}$ of face width because of something else, and that something is the next section.
:::
:::

## Surface durability: why the face width really is 70 mm

::: definition Pitting and the contact safety factor {#def-pitting}
Two gear flanks are two curved bodies in line contact, and the Hertz pressure at the pitch point follows from the same $p_0 = \sqrt{ F E^{*} / ( \pi b R ) }$ that closed [[mechanisms/cams]]. The relative radius of curvature at the pitch point is set by the two base-circle tangents,

$$
\frac{1}{R} = \frac{1}{r_1 \sin \phi} + \frac{1}{r_2 \sin \phi} \qquad \Rightarrow \qquad p_0 = \sqrt{ \frac{ W_t E^{*} }{ \pi b R } } \ , \qquad E^{*} = \frac{ E }{ 1 - \nu^{2} } = 113.7\ \mathrm{GPa}\ \text{(steel)}
$$

**Unlike the cam, $R$ is not constant.** It is $\rho_1 \rho_2 / ( \rho_1 + \rho_2 )$ with $\rho_i$ the radius of curvature of the *flank*, and it falls towards zero at both ends of the path of contact, where the contact approaches the pinion's tip and the gear's root. The peak pressure therefore occurs not at the pitch point but near the inner end of the mesh, and it is 10-20% above the pitch-point value.
:::

::: example Pitting check of the same pinion {#ex-pit}
::: solution
$$
r_1 = 54 , \quad r_2 = 282\ \mathrm{mm} \qquad \Rightarrow \qquad \frac{1}{R} = \frac{1}{ 54 \times 0.34202 } + \frac{1}{ 282 \times 0.34202 } = 0.05414 + 0.01041 = 0.06455
$$

$$
R = 15.50\ \mathrm{mm} \qquad p_0 = \sqrt{ \frac{ 1.25 \times 13\,323 \times 113\,700 }{ 0.85 \times \pi \times 70 \times 15.50 } } = \boxed{ 1\,185\ \mathrm{MPa} }
$$

against $\sigma_{H,\lim} = 1\,250\ \mathrm{MPa}$ for a $300\ \mathrm{HB}$ through-hardened surface at $10^{9}$ cycles — **a contact safety factor of $1.05$, and with the $10$-$20\%$ end-of-mesh concentration included, actually about $0.95$.** The design is pitting-limited, and the honest conclusion is that $70\ \mathrm{mm}$ is the *minimum* face width, not a comfortable one.

**Now the two numbers side by side.** Bending needed $24.5\ \mathrm{mm}$ of face width; pitting needs $54\ \mathrm{mm}$ at the same allowable-stress ratio. **The gear is 2.9 times wider than it needs to be to survive bending, purely so that its surface survives.** Every gear designer learns this backwards at first, by checking bending first and being surprised. The rule of thumb that falls out of it is worth memorising: **for through-hardened steel gears of industrial quality, pitting governs; for case-hardened ground gears, bending starts to close the gap, and for a nitrided or through-hardened cast gear pitting governs even more overwhelmingly.**
:::
:::

::: widget plot
title: Safety factor against face width, bending and pitting
f: 1185*sqrt(65/x)/1250; 169.6*65/x/430
x: 30, 120
y: 0.2, 1.6
caption: The two safety factors for the 55 kW pinion against face width, both normalised so that 1.0 is the allowable. **The pitting curve is the shallow one — $S_H \propto \sqrt{b}$ — which is why buying surface life with face width is so expensive: doubling the width buys 41% more contact margin.** The bending curve is $S_F \propto b$, steep and cheap. The crossing at about $38\ \mathrm{mm}$ is where the two failure modes are equally probable, and it is the point a designer who has chosen through-hardened steel has no way of reaching.
:::

::: exercise Face width by pitting {level=1 check="41"}
The same $18 / 94$ module-6 pair is rebuilt in case-hardened and ground $20\mathrm{MnCr5}$ with $\sigma_{H,\lim} = 1\,500\ \mathrm{MPa}$ and $\sigma_{F,\lim} = 850\ \mathrm{MPa}$, all other factors unchanged. What face width does the **pitting** check require?

::: solution
$p_0 \propto 1 / \sqrt{b}$, and $p_0 = 1\,185\ \mathrm{MPa}$ at $b = 70\ \mathrm{mm}$, so

$$
b = 70 \times \left( \frac{ 1\,185 }{ 1\,500 } \right)^{2} = 70 \times 0.6241 = \boxed{ 41\ \mathrm{mm} }
$$

**a 41% reduction in face width, and a rather larger reduction in price**, because the ground case-hardened gears cost several times the through-hardened ones and the saving has to be weighed against that and not against the steel. Checking bending at $b = 41$: $\sigma_F = 169.6 \times 65 / 41 = 269\ \mathrm{MPa}$ against $850$, so $S_F = 3.2$ — **bending has become even less of an issue while the surface has become the whole design.** That is the characteristic signature of a case-hardened gear, and it is why aerospace gears are ground: not for strength, but for the surface.
:::
:::

::: warning What a pit actually is
Pitting is not "the surface wearing out". A Hertzian contact has its maximum **shear** stress not at the surface but $0.78 b_h$ below it, in a material that is in compression at the surface and therefore immune to opening a crack there. On a gear the picture is worse, because the sliding velocity reverses sign at the pitch line: **above the pitch line the sliding drives any surface crack open, below it drives the crack shut with a wedge of oil behind it.** The observed consequence is that pitting starts below the pitch line on the pinion flank, at the depth of maximum shear, and that a pit is produced when a subsurface crack, wedged open by oil at $1\,000$ atmospheres of peak pressure, finally breaks through to the surface and lifts a flake out.

Three practical consequences. **Oil viscosity helps:** a thicker film reduces the wedging, which is why a gear that is pitting is often helped by going up a viscosity grade long before it is helped by going up in size. **A harder surface helps by raising the shear strength, not the yield strength**, which is why the empirical relation between Brinell hardness and allowable contact stress is so nearly linear. **And a small amount of initial pitting on a run-in gear is normal and beneficial**, because the pits load-share and the flanks conform; the codes' "allowable" contact stress is a design life, not a no-damage threshold.
:::

## Dynamics: the mesh is a spring whose stiffness keeps changing

Two meshing pairs are two Hertzian springs in parallel, and as the contact point travels along the line of action the number of pairs changes between $\lfloor m_p \rfloor$ and $\lceil m_p \rceil$. **The mesh stiffness therefore fluctuates at the mesh frequency**, and for steel gears the single-pair stiffness per unit face width is about $20\ \mathrm{N / \mu m}$ per mm — so the $70\ \mathrm{mm}$ pinion above has a mesh stiffness of order $1.4 \times 10^{9}\ \mathrm{N / m}$ per pair and deflects about $5\text{–}6\ \mu\mathrm{m}$ under its $13.3\ \mathrm{kN}$ load.

That number matters because **it is the same size as the manufacturing error.** An AGMA quality-8 gear has a profile and pitch error of $8$-$12\ \mu\mathrm{m}$; a quality-12 ground gear has $2$-$3\ \mu\mathrm{m}$. When the error is large compared with the elastic deflection, the incoming pair has to be bent into place before it can carry anything, and the load history over the mesh cycle is dominated by the error rather than by the geometry. That is the physical content of the dynamic load factor $K_v$:

| AGMA quality | $V < 5\ \mathrm{m/s}$ | $V = 10$ | $V = 20$ | $V = 30$ |
|---|---|---|---|---|
| 6 (milled) | 1.10 | 1.25 | 1.55 | — |
| 8 (hobbed, fine) | 1.08 | 1.18 | 1.38 | 1.65 |
| 10 (shaved) | 1.05 | 1.12 | 1.25 | 1.45 |
| 12 (ground) | 1.03 | 1.07 | 1.15 | 1.30 |
| 14 (superfinishing) | 1.02 | 1.05 | 1.10 | 1.22 |

Representative published values for steel gears in oil, and the shape of the table is the message: **grinding buys you a speed limit, not a strength.** At $4\ \mathrm{m/s}$ the difference between quality 6 and quality 12 is 7% of load; at $30\ \mathrm{m/s}$ it is 35%, and the $30\ \mathrm{m/s}$ gearbox cannot be built at quality 6 at all.

::: exercise Mesh frequency and resonance {level=1 check="219"}
For the $18$-tooth, $730\ \mathrm{rev / min}$ pinion above, what is the mesh frequency? And if the first torsional mode of the motor-pinion system is measured at $110\ \mathrm{Hz}$, is the design acceptable?

::: solution
$$
f_{\text{mesh}} = \frac{ N_1 n }{ 60 } = \frac{ 18 \times 730 }{ 60 } = \boxed{ 219\ \mathrm{Hz} }
$$

**against a torsional natural frequency of $110\ \mathrm{Hz}$ — a ratio of $0.50$, which is exactly on the boundary of the usual $1.5\!:\!1$ separation rule and should not be accepted.** The system is running at twice its natural frequency, which in a linear system is a region of *reduced* response, but gear meshing is not linear: the stiffness fluctuation at $219\ \mathrm{Hz}$ contains a strong second harmonic and, more importantly, the load reversal at every mesh-cycle transition is an impulse train that will find $110\ \mathrm{Hz}$ whether the designer wanted it to or not. The remedies in order of cheapness: **change the tooth count by one** (17 or 19 teeth moves the mesh to 207 or 231 Hz, which is not much), **change the pinion speed by changing the ratio**, **add a torsional damper on the motor shaft**, or **re-tune the mode by lengthening the pinion nose**. The first is free and the last is the one that actually works.
:::
:::

## Efficiency, heat and the worm gear's apology

::: example Efficiency table and the heat it does not remove {#ex-eff}
| Type | Efficiency per stage | Note |
|---|---|---|
| Spur or helical, ground, splash-lubricated | 0.985-0.995 | churning losses dominate at high speed |
| Spur or helical, industrial hobbed | 0.97-0.985 | |
| Straight bevel | 0.98 | |
| Spiral bevel | 0.96-0.98 | sliding added by the spiral |
| Hypoid | 0.94-0.96 | heavy sliding; needs an EP extreme-pressure oil |
| Planetary, per planet-race mesh | 0.97-0.985 | multiply by the number of meshes in the path |
| Worm, lead angle $15^{\circ}$ | 0.82 | |
| Worm, lead angle $5^{\circ}$ | 0.45 | |
| Worm, lead angle $2^{\circ}$ | 0.25 | approaching self-locking |

::: solution
The $55\ \mathrm{kW}$ reducer at $\eta = 0.985$ dissipates

$$
P_{\mathrm{loss}} = 55\,000 \times ( 1 - 0.985 ) = 825\ \mathrm{W}
$$

A grey-cast iron housing in still air sheds about $1.0$-$1.3\ \mathrm{kW}$ per square metre of surface at a $40\ \mathrm{K}$ rise, so **$825\ \mathrm{W}$ needs roughly $0.8\ \mathrm{m^{2}}$ of effective surface — a $500 \times 500\ \mathrm{mm}$ box has about $0.5\ \mathrm{m^{2}}$, and the gearbox will run hot.** The standard fixes, in order, are fins, a fan on the shaft, an oil cooler, and a bigger box; and the standard mistake is to size the box from the shaft centres and discover the thermal problem at the acceptance test, when the oil hits $95^{\circ}\mathrm{C}$ and the seals go.

**Now compare the worm.** The same $55\ \mathrm{kW}$ through a $5^{\circ}$-lead worm at $\eta = 0.45$ dissipates $30.3\ \mathrm{kW}$ — **more than half the input power, fifty times the helical's loss, in a box a fraction of the size.** That is why worm gears are used at low duty cycle or low power, why they are derated heavily for continuous service, why they need a cooler before they need a stronger gear, and why the design question for a worm gearbox is never "will it break" but "will it boil".
:::
:::

::: widget plot
title: Worm efficiency against lead angle
f: tan(x*pi/180)/tan((x+3)*pi/180); tan(x*pi/180)/tan((x+6)*pi/180)
x: 1, 25
y: 0, 1
labels: \mu = 0.0524 \left( \phi = 3^{\circ} \right); \mu = 0.105 \left( \phi = 6^{\circ} \right)
caption: $\eta = \tan \lambda / \tan ( \lambda + \phi )$ for two coefficient-of-friction levels, the low one representing a well-lubricated bronze-on-steel pair at operating temperature and the high one representing cold starts. **Efficiency crosses 50% at the friction angle and self-locks below it** — the lower curve locks at $\lambda < 3^{\circ}$, the upper at $\lambda < 6^{\circ}$. **Self-locking is sold as a safety feature on hoists and is in fact an efficiency disaster bought at 25%:** a self-locking worm is a brake that consumes power while it holds, and a hoist that must hold for long periods should have a load brake, not a low-lead worm.
:::

## Helical gears: the same involute, dragged sideways

::: definition Helical geometry {#def-helical}
A helical gear is a spur gear whose tooth trace is a helix of **helix angle** $\psi$ on the cylinder. Everything about it follows from one fact: **the transverse section of a helical gear is the involute of a larger base circle than the one it was cut with.** Writing the subscript $n$ for the normal plane (perpendicular to the tooth) and $t$ for the transverse plane,

$$
m_n = m_t \cos \psi \qquad \tan \phi_t = \frac{ \tan \phi_n }{ \cos \psi } \qquad d = \frac{ m_n N }{ \cos \psi }
$$

and the gear behaves, for both geometry and strength, like a **virtual** or **equivalent spur gear** of

$$
\boxed{ \; N_v = \frac{ N }{ \cos^{3} \psi } \; }
$$

teeth. The cube comes from the ellipse: the tooth sits on the equivalent ellipse of the pitch cylinder cut by the helix, whose radius of curvature at the ends is $d / ( 2 \cos^{2} \psi )$, and the third cosine is the projection of the load direction.
:::

Three consequences, in order of how much they change designs.

**1. The contact ratio gains a second, independent term.** Because the tooth enters contact gradually along a diagonal line rather than abruptly across the whole face, the **face contact ratio** adds to the transverse one,

$$
m_F = \frac{ b \sin \psi }{ \pi m_n } \qquad m_{\text{total}} = m_p + m_F
$$

and unlike $m_p$ it is **unbounded** — you can buy as much of it as the face width and helix angle allow. A spur gear is stuck at 1.6; a helical gear at $\psi = 20^{\circ}$ with $b = 70\ \mathrm{mm}$, $m_n = 6$ reaches 2.96. **That is the single largest reason helical gears replaced spur gears in everything that has to be quiet.**

**2. The undercut limit relaxes.** Since the gear behaves like $N_v$ teeth, the minimum count becomes $N_{\min} = 17.1 \cos^{3} \psi$: at $\psi = 20^{\circ}$ that is 15 teeth, at $25^{\circ}$ it is 9. **A helical pinion can be several teeth smaller than a spur one before it is scooped**, and in a gearbox where the pinion diameter sets the centre distance, three teeth is the whole envelope.

**3. You have created an axial thrust.** The tooth trace is inclined, so the normal force has a component along the shaft:

$$
F_a = W_t \tan \psi
$$

For the 55 kW pinion at $\psi = 20^{\circ}$ that is $13\,323 \times 0.364 = 4\,850\ \mathrm{N}$ of axial load on a shaft that was previously carrying none — a thrust bearing, a shoulder, a spacer and a shim stack. **This is the tax, and there are only two ways to avoid it: put the helix angle to zero, which is a spur gear, or cut the tooth as two opposite-handed halves on the same blank, which is a herringbone or double-helical gear** and which cancels the thrust exactly while adding a groove that no hob can cut to the root. Herringbone gears are made for heavy turbine and ship reduction duty precisely because at $10\,000\ \mathrm{kW}$ the thrust is a hundred kilonewtons and the bearing that would carry it is bigger than the gear.

::: widget plot
title: Total contact ratio against helix angle
f: 1.688+70*sin(x*pi/180)/(pi*6)
x: 0, 30
y: 1.5, 3.6
caption: The 55 kW gear's contact ratio as its helix angle grows, with the face width and normal module held fixed. **The curve is nearly linear because $m_F$ is the whole story** — the transverse term barely moves, since $m_p$ depends on $N_v$ and $\phi_t$ in ways that partly cancel. The designer's ceiling is not the curve but the $4\,850\ \mathrm{N}$ of axial thrust at $20^{\circ}$, which grows as $\tan \psi$: **$15^{\circ}$ is the usual compromise, $20^{\circ}$ is what you use when the bearing is already there, and $30^{\circ}$ is what you use on a herringbone where the thrust cancels.**
:::

## Bevel, worm, internal and planetary in one paragraph each

**Straight bevel** gears are involute teeth on a cone, and the whole design is done on the **back cone at the large end** because the tooth shrinks to nothing at the apex. The virtual number of teeth is $N_v = N / \cos \delta$ where $\delta$ is the pitch-cone half-angle, so a $1 : 1$ bevel pair at $20^{\circ}$ pressure angle behaves like a $28 / 28$ spur pair and can be cut with a No. 3 tool. Their weakness is that any mounting-distance error changes the contact pattern, which is why they are shipped with a lapped-contact pattern specified on the drawing and why a differential that has been re-shimmed without checking the pattern howls.

**Spiral bevel** gears add a spiral angle, which gives them a contact ratio above 2 and makes them quiet enough for a car axle — and makes them **sensitive to a hundredth of a millimetre of offset**, which is exploited deliberately in the **hypoid** gear of a rear axle: the pinion axis is dropped below the wheel axis, giving an extra tooth-pair in contact and a smaller driveshaft tunnel, at the price of heavy sliding that demands an extreme-pressure oil and costs 4% of the power.

**Worm gears** are a screw driving an arc of a worm wheel, and their whole character comes from the sliding velocity between them, which is high even at rest and which is why they are always bronze-on-steel, always efficiency-limited, and always thermally limited. Their genuine advantages are a ratio of 60:1 in one stage, near-silent operation, and shock absorption from the bronze. Their cost is up to 60% of the power.

**Internal gears** — a gear inside a ring — have an internal-contact Hertz formula in which the two curvatures *subtract* rather than add, giving a much larger relative radius and therefore a lower contact stress and a higher bending strength for the same size. They also have an interference limit at the *ring* that is far more restrictive than the pinion's, and they cannot be hobbed, only shaper-cut or broached, which is why they are expensive. They are used wherever the envelope is the constraint: planetary gearboxes, ring-and-pinion steering, and the final drive of every automatic transmission.

**Planetary gears** split the torque over $n$ planet meshes, which is the only way to make a gearbox that is small, light and carries a huge torque. The cost is a carrier, $n$ planet bearings, and the requirement that all $n$ planets share equally — which they do not, unless the ring gear is free to float axially or the carrier is made deliberately soft. **A five-planet stage does not carry five times the load of a single mesh; a well-designed one carries about 3.5 times, and a badly designed one carries about 2.5 times with one planet doing most of the work and being found scorched at teardown.** The design rule is that the torsional stiffness of the carrier and shafts must be low compared with the mesh stiffness, so that elastic deformation equalises the load paths rather than concentrating them.

## Manufacturing, quality numbers and backlash

The AGMA quality number runs from about 4 to 14 and is a specification of pitch, profile and lead error, not a grade of vague excellence:

| Quality | Process | Pitch error | Typical use |
|---|---|---|---|
| 4-6 | Sand-cast, saw-cut, milled | 50-100 $\mu$m | Open gears, mining girth gears |
| 7-8 | Hobbed, shaped | 15-30 $\mu$m | Industrial reducers, agricultural |
| 9-10 | Shaved after hobbing | 8-15 $\mu$m | Automotive transmissions |
| 11-12 | Ground | 3-8 $\mu$m | Aircraft, machine-tool, wind |
| 13-14 | Fine ground, superfinished | 1-3 $\mu$m | Spindles, gyro drives, space |

**The process sequence is the design.** A case-hardened gear must be ground because it moves $0.05$-$0.15\ \mathrm{mm}$ in hardening; a shaved gear must be through-hardened below the transformation range or the shave tears. A hobbed gear can be put straight into a gearbox; a ground gear must be put into a gearbox whose bearings were fitted after the housing was cleaned, because a single $30\ \mu\mathrm{m}$ chip under a bearing outer race is a fifth of a quality grade.

**Backlash** is the arc the pinion turns through with the wheel held. It is not an error but a specified quantity, needed for thermal expansion between two housings at different temperatures, for an oil film, and for the tolerance stack of the centre distance. The standard minimum is roughly $0.10 \, m$ for industrial gears and $0.02$-$0.04 \, m$ for instrument gears, and it is set by **thickness variation** — cutting the tooth thinner than nominal — never by opening the centre distance, for the reason tabulated in [[#ex-centre]].

::: example Backlash by thickness, not by centre distance {#ex-backlash}
A module-6 pair needs $0.20\ \mathrm{mm}$ of backlash at the pitch circle. Compare achieving it by thinning the teeth and by opening the centre distance.

**Answer.** By thickness: each tooth is cut $0.10\ \mathrm{mm}$ thin, the centre distance is untouched, and the contact ratio is unchanged.

::: solution
By centre distance, reading the table of [[#ex-centre]], $j = 0.20\ \mathrm{mm}$ corresponds to $\Delta C \approx 0.27\ \mathrm{mm}$, at which

$$
\phi_{\mathrm{op}} \approx 20.9^{\circ}, \qquad m_p \approx 1.49 \quad \text{against} \ 1.635
$$

**a loss of 9% of contact ratio for a backlash that costs nothing when bought with tooth thickness.** The only case where centre-distance backlash is correct is a *shifted* pair whose design centre distance already differs from $m ( N_1 + N_2 ) / 2$, and even then the shift is chosen so that the required backlash falls out of the tooth thicknesses $x_1$, $x_2$ rather than from the bore-to-bore dimension.
:::
:::

## Choosing a gear: the decision tree nobody prints

::: example Selecting the stage {#ex-select}
Specify the gear type for each of these, and say why.

**(a)** A $7.5\ \mathrm{kW}$, $1450\ \mathrm{rev / min}$ to $48\ \mathrm{rev / min}$ conveyor drive, continuous, in a cement plant, budget-constrained.
**(b)** A $250\ \mathrm{W}$ robot wrist joint requiring $180 : 1$ with less than $0.05^{\circ}$ of lost motion.
**(c)** A $2\ \mathrm{MW}$ wind-turbine main drive from $14$ to $1500\ \mathrm{rev / min}$, designed for 20 years without opening.
**(d)** A $0.75\ \mathrm{kW}$ conveyor that must stop and hold on a $15^{\circ}$ incline when the power fails.

**Answer.**

::: solution
**(a)** $i = 30.2$. Two stages of helical at $i \approx 5.5$ each gives $30.25$ — close enough to be exact only if the tooth counts divide, so use $17 \times 19 / ( 51 \times 53 )$... in practice **two helical stages at 5.5 and 5.5, or one helical at 5.5 and one worm at 5.5 if the shafts must be at right angles.** For a parallel-shaft conveyor: **two helical stages, through-hardened, hobbed to quality 8, splash-lubricated, $\eta = 0.97$.** Case-hardening is not justified at 7.5 kW; the gearbox will be housing-limited, not gear-limited.

**(b)** Lost motion of $0.05^{\circ}$ at $180 : 1$ means $9\ \mathrm{mrad}$ of output lost motion referred to the input, which no involute gear train can achieve at any price because the backlash of three stages adds. **The answer is a harmonic drive or a cycloidal (RV) reducer**, both of which use many teeth in contact simultaneously and preload them. **Note that this is a cycloid, not an involute** — the curve the nineteenth century discarded for being ratio-specific is exactly what you want when the ratio is fixed and the accuracy is everything.

**(c)** $i = 107$. No single stage does this. **The industry standard is one planetary stage at $i \approx 5$ plus two helical stages at $i \approx 4.6$ each**, with the planetary carrying the torque at low speed where the diameter is affordable. Twenty years without opening means: case-carburised and ground 18CrNiMo7-6, $S_H \ge 1.3$, $S_F \ge 2.0$, a filtration rating of $\beta_{15} > 200$ on the oil, and — the part people forget — **a ring-gear tooth-count that is coprime with the pinion's**, so that each pinion tooth meets each wheel tooth only once every $N_1 N_2$ meshes and wear is spread over the whole face.

**(d)** $0.75\ \mathrm{kW}$, hold on an incline. **A worm gear with a lead angle below the friction angle**, which is the one application where self-locking is genuinely the right answer, because the power it dissipates while holding is zero — the load is static, there is no sliding, and the static friction angle is higher than the dynamic one. **The warning is that "self-locking" is not a substitute for a brake under any safety standard that matters**, because a worm's static friction coefficient depends on temperature, on whether the oil has drained, and on whether the drive has recently been back-driven, none of which a risk assessment can guarantee.
:::
:::

::: exercise Minimum teeth with profile shift {level=1 check="11"}
A $20^{\mathrm{\circ}}$ pinion meshes with a rack. What is the smallest tooth count that avoids undercutting with a profile shift of $x = + 0.4$?

::: solution
The rack's tip is what does the digging, and shifting the rack away from the gear centre by $x m$ moves the generated root outward by the same amount, so the interference condition becomes

$$
N_{\min} = \frac{ 2 \left( 1 - x \right)}{\sin^{2} \phi} = \frac{ 2 \times 0.6 }{ 0.11698 } = 10.26 \ \Rightarrow \ \boxed{ 11 }
$$

**Six teeth cheaper than the unshifted 17, and the price is threefold.** The tooth's tip narrows — at $x = + 0.4$ a 12-tooth pinion's tip lands come to a point unless the addendum is trimmed — the mating gear must be shifted by $- 0.4$ or the centre distance changes, and the pair can no longer be replaced by a catalogue gear. **This is why the profile-shift system has tables, nomographs and a notation of its own, and why a drawing for a shifted gear carries the pinion-roll-over dimension and the span-measurement over $k$ teeth rather than a simple pitch diameter.**
:::
:::

::: exercise Contact ratio at the interference limit {level=2 check="1.44"}
Compute the transverse contact ratio of a $13 / 13$ pair of $20^{\circ}$ gears with standard proportions. Is the result comfortable?

::: solution
With unit module, $r_1 = r_2 = 6.5$, $r_a = 7.5$, $r_b = 6.108$, $C = 13$:

$$
L = 2 \sqrt{ 7.5^{2} - 6.108^{2} } - 13 \times 0.34202 = 2 \times 4.352 - 4.446 = 4.258\ \mathrm{mm}
$$

$$
p_b = \pi \cos 20^{\circ} = 2.952\ \mathrm{mm} \qquad \Rightarrow \qquad m_p = \frac{ 4.258 }{ 2.952 } = \boxed{ 1.44 }
$$

**against 1.635 for the $20 / 40$ pair of [[#ex-crr]].** The 13-tooth gear is not merely closer to the interference limit — it is also 12% noisier and carries 12% more load per tooth, because it spends 56% of the mesh cycle in single-pair contact instead of 36%. **This is the trade that profile shift is supposed to solve and often makes worse: shifting to remove undercutting at 12 teeth also shortens the path of contact.** The honest answer when a designer wants a 12-tooth pinion is usually to accept 15 teeth and a bigger module, not to fight the geometry for three teeth.
:::
:::

::: exercise Virtual tooth count of a helical pinion {level=1 check="15"}
A helical pinion is required to run unshifted against a $\phi_n = 20^{\circ}$ rack at a helix angle of $20^{\circ}$. What is the smallest tooth count that avoids undercutting?

::: solution
The helical gear behaves like a spur gear of $N_v = N / \cos^{3} \psi$ teeth, so undercutting is avoided when $N_v \ge 17.1$:

$$
N \ \ge \ 17.1 \cos^{3} 20^{\circ} = 17.1 \times 0.8214 = 14.19 \ \Rightarrow \ \boxed{ 15 }
$$

**Two teeth fewer than the spur equivalent, which in a 40 mm-centre-distance gearbox is the difference between a design and two designs.** Note what the relaxation is *not*: it is not that the tooth is stronger, and not that the contact is gentler — it is that the tool, seen in the plane normal to the tooth, is generating a curve on a *larger* effective pitch circle, and larger effective pitch circles are further from the base circle where the involute stops existing. **The same reasoning is why a $25^{\circ}$ pressure angle buys still more: at $\psi = 25^{\circ}$ the answer is 9 teeth, and at $30^{\circ}$ with a $25^{\circ}$ rack it is 7 — at which point the axial thrust has become the whole design.**
:::
:::

::: exercise Worm efficiency and the self-locking boundary {level=1 check="0.77"}
A worm drive has a lead angle of $12^{\circ}$ and a coefficient of friction of $0.06$ at operating temperature. What is its efficiency, and does it self-lock when cold at $\mu = 0.12$?

::: solution
$$
\phi = \arctan 0.06 = 3.43^{\circ} \qquad \eta = \frac{ \tan 12^{\circ} }{ \tan \left( 12 + 3.43 \right)^{\circ} } = \frac{ 0.2126 }{ 0.2762 } = \boxed{ 0.77 }
$$

Cold, $\phi = 6.84^{\circ}$ and $\lambda + \phi = 18.84^{\circ}$, still below $90^{\circ}$, so **it does not self-lock either way.** The self-locking boundary is $\lambda < \phi$, i.e. $\lambda < 3.4^{\circ}$ hot and $\lambda < 6.8^{\circ}$ cold — and note the direction of the trap: **a worm designed to self-lock when hot will self-lock more reliably cold, but a worm designed to be on the safe side of self-locking cold is already at $\eta \approx 0.45$ hot.** The one genuinely reliable statement is that no worm should be relied on as the sole means of holding a load, and every hoist standard says so.
:::
:::

::: exercise Bevel virtual teeth {level=1 check="28"}
A $1 : 1$ straight-bevel pair has 20 teeth each and a $20^{\circ}$ pressure angle. What spur gear would a 20-tooth bevel blank behave like, and what does that imply for the cutter number?

::: solution
The pitch-cone half-angle is $\delta = 45^{\circ}$ and the virtual count is

$$
N_v = \frac{ N }{ \cos \delta } = \frac{ 20 }{ 0.7071 } = 28.3 \ \Rightarrow \ \boxed{ 28 }
$$

**which is comfortably above the 17-tooth interference limit — and that is why bevel gears almost never undercut while their pinion counterparts routinely do.** The cone's virtual pitch circle is $\sqrt{2}$ times the actual one, so the tooth sits on a larger effective circle and further from where the involute runs out. The practical consequence is the old eight-cutter No. 1 to No. 8 set, whose No. 3 cutter covers $21.5^{\circ}$ to $29^{\circ}$ virtual: **a No. 3 cutter cut this bevel and also cut a 28-tooth spur gear, which is exactly the economy the system was invented for and exactly the ratio-specificity the involute made unnecessary.**
:::
:::

::: quiz
Two gears of the same module, same face width, same material and same heat treatment carry the same load. Gear A has 17 teeth, gear B has 60 teeth, each meshing with an identical 60-tooth wheel. Which statement is correct?

- [ ] Gear A is weaker in bending because its teeth are more highly curved
- [x] Gear A has the higher contact stress and the lower contact ratio, and it is closer to the interference limit — three separate penalties for the same diameter saving
- [ ] Gear B is quieter only because it is larger
- [ ] Both are equally stressed because the module is the same

::: solution
All three penalties land on A. The contact stress goes as $1 / \sqrt{ R }$ and $1 / R = 1 / ( r_1 \sin \phi ) + 1 / ( r_2 \sin \phi )$, so the smaller pinion has the smaller $R$ and the higher $p_0$ — for $17 / 60$ against $60 / 60$, roughly $1\,530$ against $1\,290\ \mathrm{MPa}$ at equal load. The contact ratio is 1.60 against 1.85. And 17 is exactly at the unshifted interference limit while 60 is nowhere near it. **The reason small pinions are nevertheless used is that everything else in the machine scales with the centre distance: the housing, the shafts, the bearings and the mass. Gear design is the negotiation of that trade and nothing else.**
:::
:::

::: quiz
A gearbox is assembled with a centre distance $0.15\ \mathrm{mm}$ over nominal and the measured backlash is within specification. Should the build be accepted?

- [ ] Yes — backlash is the specified acceptance criterion, and it is met
- [x] No, or at least not without checking the contact pattern, because the backlash may have been bought with centre distance at the cost of contact ratio
- [ ] Yes, provided the oil level is correct
- [ ] No — any positive centre-distance error is a reject regardless of backlash

::: solution
From the table of [[#ex-centre]], $\Delta C = + 0.15\ \mathrm{mm}$ on this pair gives $j \approx 0.23\ \mathrm{mm}$ of backlash and $m_p \approx 1.55$ against 1.635 — **a correct backlash hiding a 5% loss of contact ratio and a $0.5^{\circ}$ rise in operating pressure angle.** The correct acceptance criteria are the **contact pattern** under load (a blueing or film-marking test showing the print centred on the flank and not at the tip or heel) and the **pinion roll-over** or span-over-wires dimension, which measures tooth thickness directly. **Backlash is a symptom, not a property: the same measured backlash can mean a correctly cut gear at the right centre distance or a thin-cut gear at the wrong one, and only the pattern test distinguishes them.**
:::
:::

::: history
| Year | Who | What |
|---|---|---|
| c. 250 BC | Archytas of Tarentum, and later Ctesibius and Hero | Toothed wheels for transmitting motion appear in Greek mechanism descriptions; Vitruvius describes water-wheel gearing with wooden teeth and bronze rims a century later |
| 1450s | Filippo Brunelleschi | G drive for the Florence Cathedral hoist: the first fully documented industrial gear train, with teeth cut as separate pegs on a wooden wheel — the tooth form is arbitrary and the gears grind |
| 1674 | Ole Rømer | Proposes that teeth should be cut to a common curve so that any pinion meshes with any wheel — the first statement of the problem the law of gearing solves |
| 1765 | Leonhard Euler | Gives the epicycloidal and involute profiles analytically and shows both satisfy the law of gearing; the paper is unread by machinists for eighty years |
| 1695 | Philippe de La Hire | Recommends epicycloidal teeth for practical wheels and gives the construction by which one tool serves a range of tooth counts — the first approach to the interchangeable tooth |
| 1841 | Robert Willis | *Principles of Mechanisms* — the first account that treats tooth profiles as a kinematic problem rather than a pattern-shop tradition, and the book that carried the involute system into British practice |
| 1856 | O. E. Becker, then David Brown & Sons | The involute system is adopted as a factory standard at the Price's Candles works and then by the Sheffield machine trade; the $14\frac{1}{2}^{\circ}$ composite form follows in 1861 as the "British Association" involute |
| 1892 | Robert Willson Lewis | *"Investigation of the Strength of Gear Teeth"*, Proceedings of the Engineering Congress at the World's Columbian Exposition, Chicago — the cantilever formula, and the origin of the sentence "the tooth is a cantilever" |
| 1920s-30s | Earl Buckingham | Dynamic load measurements on the Chicago laboratory test stands produce the dynamic-load equation, the surface-durability equation and the quality-number system, all of them derived from measured noise and measured tooth error rather than from theory |
| 1958-63 | AGMA 2101 / ISO R701 | The load-capacity standards are harmonised into the form still used, with the geometry factor $J$ replacing Lewis's $Y$ once photoelastic root-stress measurement had shown that the fillet concentration had to be separated from the cantilever stress rather than buried inside a form factor |
| 1970s | H. Winter and the Aachen school, with K. Niemann | Micro-geometry: the discovery that a gear's noise is set by the *twist* of the tooth flank under load, and that the correction is to cut the tooth with a deliberate twist and crowning that cancels the deflection computed in advance |
:::

## Where this leads

The gear is where this course's two halves meet. The **kinematics** of [[mechanisms/position-analysis]] and [[mechanisms/velocity-analysis]] was about finding where things are and how fast they move; the gear settles that question by construction, permanently, with one integer — the tooth ratio — replacing a trigonometric solution. The **dynamics** of [[mechanisms/acceleration-analysis]] and [[mechanisms/machine-dynamics]] was about the forces that kinematics implies; the gear spends most of its design life on exactly one of them, the Hertz contact pressure.

Three things follow from taking that seriously. **Elastohydrodynamic lubrication** explains why the $1\,185\ \mathrm{MPa}$ of [[#ex-pit]] does not destroy the surface, and why a $2\ \mu\mathrm{m}$ film of oil at $150^{\circ}\mathrm{C}$ is the actual load-carrying member of every gearbox in the world; the film-thickness ideas are introduced in [[fluid-mechanics/fluid-properties]]. **Contact fatigue** explains why the same surface fails at $10^{9}$ cycles rather than $10^{3}$, and belongs with [[materials-science/failure]]. **Transmission-error dynamics** explains gear noise, which in a car cabin is a design constraint as binding as strength, and belongs with [[vibrations/harmonic-excitation]].

And the failure you will be called about is a spalled flank on a gearbox that was checked and found adequate. What happened is in the last table of this lesson: the contact pattern moved. A shaft deflected $0.08\ \mathrm{mm}$ under a load the design had estimated at $0.05$, the crowning that had been computed for the first load is wrong for the second, the print walked to the edge of a $70\ \mathrm{mm}$ face, and the local pressure doubled. **Gears do not fail because the average stress was too high. They fail because the stress was not average.**

::: summary
- The **law of gearing** requires the common normal at contact to pass through a fixed pitch point; the involute achieves it by making the common normal a fixed line tangent to two base circles, and it won the world because its generating element is a straight line, which makes the cutting tool a rack.
- A gear is defined by module $m$, tooth count $N$ and pressure angle $\phi$. **Two gears mesh if and only if their base pitches $\pi m \cos \phi$ are equal** — module and pressure angle must both match.
- **Minimum teeth against a rack is $N_{\min} = 2 / \sin^{2} \phi$**: 31.9 at $14.5^{\circ}$, 17.1 at $20^{\circ}$, 11.2 at $25^{\circ}$. Below it the gear is not weak, it is scooped. Profile shift buys about six teeth and costs interchangeability and centre-distance tolerance.
- **Contact ratio $m_p = L / p_b$** is the average number of pairs in contact; 1.4-1.9 for spur gears. Below 1.0 the pair is not a gear train. Every tenth of contact ratio is worth roughly a tenth of the load per tooth and several decibels.
- **Centre distance is the tightest tolerance in a gearbox.** $+ 0.05\ \mathrm{mm}$ costs a twentieth of a contact ratio; $+ 0.9\ \mathrm{mm}$ costs 30% of it and looks perfectly acceptable on a backlash gauge.
- **Bending is $\sigma_F = W_t / ( b m Y )$ and pitting is $p_0 = \sqrt{ W_t E^{*} / ( \pi b R ) }$.** For through-hardened industrial gears pitting needs 2-3 times the face width bending needs. Check pitting first.
- **The dynamic factor $K_v$ is a manufacturing-quality story, not a speed story.** Grinding buys a speed limit; at $4\ \mathrm{m/s}$ a quality-6 gear is only 7% worse than a quality-12 one.
- **Helical gears add an unbounded face contact ratio $m_F = b \sin \psi / ( \pi m_n )$, relax the undercut limit by $\cos^{3} \psi$, and create an axial thrust $W_t \tan \psi$** that must be carried, cancelled by a herringbone, or accepted as the price of silence.
:::

## Further reading

- R. C. Juvinall and K. M. Marshek, *Fundamentals of Machine Component Design*, 7th ed., Wiley, 2020 — the clearest worked Lewis and AGMA bending examples in any text
- J. E. Shigley and C. R. Mischke (ed.), *Mechanical Engineering Design*, 11th ed., McGraw-Hill, 2020 — the gear chapters as the standard first exposure, with the interference tables
- AGMA 2101-09, *Fundamental Rating Factors and Calculation Methods for Involute Spur and Helical Gear Teeth* — the standard itself, and the only source that states clearly which factors are measured and which are assumed
- I. K. A. Nielsen, *Vibration Signals of Geared Gearboxes*, PhD thesis, Aalborg University, 2019 — the modern treatment of transmission error, mesh stiffness and what a vibration spectrum actually says about a gear
- F. L. Litvin and A. Fuentes, *Gear Geometry and Applied Theory*, 2nd ed., Cambridge University Press, 2004 — the contact-path and undercutting theory done with differential geometry, and the only serious treatment of face-milled and ground bevel geometry
- D. W. Lewis, *Investigation of the Strength of Gear Teeth*, 1892 — short enough to read, and still worth reading because the model is transparent in a way the codes are not
- B. J. Hamrock, S. R. Schmid and B. O. Jacobson, *Fundamentals of Fluid Film Lubrication*, 3rd ed., CRC Press, 2004 — the gear-specific chapters on film thickness and specific film
- K. L. Johnson, *Contact Mechanics*, Cambridge University Press, 1985 — the subsurface shear-stress distribution, the wedging action of oil driven into a surface crack, and the plastic-execution limits of a hardened case
