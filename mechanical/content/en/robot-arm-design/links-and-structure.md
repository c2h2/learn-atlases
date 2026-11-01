With the joints chosen, the arm still needs a body: links that hold the joints apart, bearings that carry the loads the reducers should not, housings that hold motors and conduct away their heat, and a path for the cables through joints that turn. The links of a robot arm are an unusual structural problem. The stresses are low — a few megapascals in a well-proportioned aluminium tube — so strength rarely decides anything. What decides the design is **stiffness per unit mass**: every millimetre the structure bends under the payload is a millimetre of tip error, every kilogram of structure is a kilogram the joints behind it must lift and accelerate, and the lowest natural frequency of the structure caps how fast the servos can be tuned. This chapter builds the tip-deflection budget for the example arm of [[robot-arm-design/arm-specification]] — joint compliance, link bending and bearing tilt added together — and shows which term dominates (it is usually not the links). It then covers materials, tubes, bearings for moment loads, cable routing and thermal effects. Beam deflection is taught in [[mechanics-of-materials/beam-deflection]], torsion in [[mechanics-of-materials/torsion]], rolling bearings in [[machine-design/bearings]] and composites in [[solid-mechanics/composites]]; we apply them.

## Why stiffness, not strength {#sec-stiffness-not-strength}

Consider the upper arm of the example arm: an aluminium tube $400\,\mathrm{mm}$ long carrying the elbow, forearm, wrist and payload. The bending moment at its root equals the shoulder torque, at most $137\,\mathrm{N\,m}$ during acceleration. In a tube of $90\,\mathrm{mm}$ outside diameter and $3\,\mathrm{mm}$ wall ($I = 7.77\times10^{-7}\,\mathrm{m^4}$) the bending stress is
$$
\sigma = \frac{Mc}{I} = \frac{137\times0.045}{7.77\times10^{-7}} = 7.9\,\mathrm{MPa},
$$
some thirty times below the yield strength of a structural aluminium alloy such as 6061-T6 (about $240\text{–}275\,\mathrm{MPa}$). The tube could be made far thinner before it broke — and long before that it would have become too flexible. Two numbers measure a structure's merit for an arm:

::: definition Specific stiffness and the stiffness budget {#def-specific-stiffness}
The **specific stiffness** of a material is $E/\rho$, Young's modulus divided by density. For bending of a beam of given length and cross-section shape, deflection under its own weight scales as $\rho/E$, and the mass needed for a given stiffness scales with $\rho/E$ for a given section shape. The **stiffness budget** of an arm is the list of contributions to the tip deflection under a stated load (normally the rated payload in the worst pose), from every compliant element: joint reducers, joint bearings, link bending and torsion, and housings.
:::

| material (typical values) | $E$ (GPa) | $\rho$ (kg/m³) | $E/\rho$ (MN m/kg) | CTE ($10^{-6}$/K) | notes |
|---|---|---|---|---|---|
| structural steel | 200 | 7850 | 25 | 12 | stiff, heavy, cheap; bases and large castings |
| aluminium alloy (6061-T6, cast A356-T6) | 69–72 | 2680–2700 | 26 | 21–24 | the default for links and housings; machined or cast |
| magnesium alloy | 45 | 1800 | 25 | 26 | light castings; corrosion protection needed |
| titanium alloy (Ti-6Al-4V) | 114 | 4430 | 26 | 9 | expensive; used where strength per mass matters |
| CFRP, quasi-isotropic laminate | 50–70 | 1550–1600 | 32–44 | ≈ 2–4 | tubes and plates; joints to metal fittings need care |
| CFRP, unidirectional along fibres | 120–140 | 1550–1600 | 75–90 | ≈ 0 | the upper bound for a tube's bending stiffness |

Sources: handbook values (e.g. Callister & Rethwisch; Budynas & Nisbett); composite properties depend strongly on fibre, layup and fibre fraction. The striking fact is the first four rows: **steel, aluminium, magnesium and titanium all have the same specific stiffness**, about $25\,\mathrm{MN\,m/kg}$. Changing between them changes the size of a part of given stiffness, not its mass. Aluminium wins for links because, for the same mass, its parts are thicker — they can be made larger in section, which matters for buckling and for the geometry discussed next — and because it is easy to machine and cast. Only fibre composites beat the metals on specific stiffness, and then by a factor of about $1.5$ for practical layups.

## Tubes: put the material far from the axis {#sec-tubes}

::: proposition Bending stiffness of a thin-walled tube at fixed mass {#prop-tube}
A thin-walled circular tube of mean diameter $D$ and wall thickness $t \ll D$ has second moment of area $I \approx \pi D^3t/8$ and mass per unit length $m' = \rho\pi Dt$. At a fixed mass per unit length,
$$
I = \frac{m'D^2}{8\rho},
$$ {#eq-tube-I}
so the bending stiffness grows with the square of the diameter, and the deflection of a tube-shaped link under a given load falls as $1/D^2$. The torsional constant $J \approx \pi D^3t/4 = m'D^2/(4\rho)$ behaves in the same way.
:::

::: proof
For a thin ring of radius $R = D/2$ and thickness $t$, every element of area $\mathrm dA = tR\,\mathrm d\phi$ lies at distance $y = R\sin\phi$ from the bending axis, so $I = \int y^2\,\mathrm dA = tR^3\int_0^{2\pi}\sin^2\phi\,\mathrm d\phi = \pi tR^3 = \pi D^3t/8$. The area is $A = \pi Dt$, so $m' = \rho\pi Dt$ and $t = m'/(\rho\pi D)$. Substituting, $I = \pi D^3/8\times m'/(\rho\pi D) = m'D^2/(8\rho)$. The polar moment is $J = \int R^2\,\mathrm dA = 2\pi tR^3 = 2I$. For a beam of fixed length and load, deflection is proportional to $1/(EI)$ and so to $1/D^2$.
:::

The proposition explains why arm links are large-diameter, thin-walled tubes or hollow castings, and why collaborative arms look "fat" for their payload. The limit is set by geometry and by **local buckling** of a very thin wall: as $D/t$ grows, the wall wrinkles under compression at stresses far below yield, and it becomes hard to attach anything to it. Machined aluminium link tubes commonly have $D/t$ of about $15$ to $40$; thin-walled composite tubes go higher, with local reinforcement where fittings attach. The hollow centre is not wasted: it carries the cables.

::: widget plot
title: Tip deflection against tube diameter at fixed mass
f: 1000*122.6*0.064*8*2700/(3*69e9*mp*(x/1000)^2); 1000*122.6*0.064*8*1600/(3*90e9*mp*(x/1000)^2)
x: 40, 160
y: 0, 0.6
sliders: mp=2.2:0.8:5:0.1
labels: \text{aluminium};\ \text{CFRP (fibre-dominated)}
caption: Deflection (mm) at the end of a $400\,\mathrm{mm}$ cantilever tube carrying the $122.6\,\mathrm N$ end load of the example upper arm, against outside diameter in mm, for a fixed mass per unit length $m'$ (kg/m) — the thin-wall approximation [[#eq-tube-I]], with $E = 69\,\mathrm{GPa}$ for aluminium and an assumed $90\,\mathrm{GPa}$ axial modulus for a fibre-dominated CFRP tube. Doubling the diameter quarters the deflection at no cost in mass; the wall becomes thinner (at $m' = 2.2\,\mathrm{kg/m}$, an aluminium tube of 90 mm diameter has a 2.9 mm wall, of 120 mm a 2.2 mm wall). Lower $m'$ to see how quickly a lightweight link becomes flexible.
:::

## The tip-deflection budget {#sec-budget}

Under a static load, each compliant element of the arm deflects a little, and for small deflections the effects **superpose**: the tip deflection is the sum of the contributions, each computed as if the rest of the arm were rigid. Two kinds of contribution appear.

- A **rotational compliance** at a point (a reducer twisting, a bearing tilting, the end of a link rotating as it bends) rotates everything beyond it by a small angle $\theta$; the tip moves by $\theta$ times the perpendicular distance from the rotation axis to the tip.
- A **translational deflection** of a link end moves everything beyond it by that amount.

So a link that bends contributes twice: its end deflection $\delta$ and its end slope $\theta$ times the distance from its end to the tip. For a cantilevered link of length $L$ and bending stiffness $EI$ carrying an end force $P$, an end moment $M$ and its own weight $w$ per unit length ([[mechanics-of-materials/beam-deflection]]):
$$
\delta = \frac{PL^3}{3EI} + \frac{ML^2}{2EI} + \frac{wL^4}{8EI},\qquad \theta = \frac{PL^2}{2EI} + \frac{ML}{EI} + \frac{wL^3}{6EI}.
$$ {#eq-cantilever}

::: example Tip-deflection budget of the example arm {#ex-budget}
Build the vertical tip-deflection budget of the example arm stretched horizontally with its $5\,\mathrm{kg}$ payload, using the masses of [[robot-arm-design/arm-specification]] and:
- upper arm: aluminium tube ($E = 69\,\mathrm{GPa}$), $L = 0.40\,\mathrm m$, $D = 90\,\mathrm{mm}$, $t = 3.0\,\mathrm{mm}$, its $4.0\,\mathrm{kg}$ treated as uniformly distributed; at its end it carries the elbow actuator, forearm, wrist and payload ($12.5\,\mathrm{kg}$, end force $P = 122.6\,\mathrm N$) and the moment of those beyond the elbow ($M = 38.3\,\mathrm{N\,m}$);
- forearm: aluminium tube $L = 0.35\,\mathrm m$, $D = 75\,\mathrm{mm}$, $t = 2.5\,\mathrm{mm}$, $2.0\,\mathrm{kg}$ distributed; at its end the wrist and payload ($P = 78.5\,\mathrm N$) and the payload moment about the wrist centre ($M = 7.4\,\mathrm{N\,m}$);
- joint 2: the strain-wave reducer of [[robot-arm-design/gear-reducers]] (twist $1.39\,\mathrm{mrad}$ at $95.2\,\mathrm{N\,m}$);
- joint 3: a smaller reducer with an effective stiffness of $3.0\times10^4\,\mathrm{N\,m/rad}$ at its load of $38.3\,\mathrm{N\,m}$;
- joint 5: $1.0\times10^4\,\mathrm{N\,m/rad}$ at $7.9\,\mathrm{N\,m}$;
- joint-1 bearing: a crossed-roller bearing with tilting stiffness $1.0\times10^6\,\mathrm{N\,m/rad}$ under an overturning moment of $110\,\mathrm{N\,m}$.

Distances to the tip (the payload's centre of mass): $0.90\,\mathrm m$ from joints 1 and 2, $0.50\,\mathrm m$ from the elbow, $0.15\,\mathrm m$ from the wrist centre (joint 5). (The stiffness values for joints 3 and 5 and the bearing are illustrative.)
::: solution
*Sections*: upper arm $I = \tfrac{\pi}{64}(90^4 - 84^4)\,\mathrm{mm^4} = 7.77\times10^{-7}\,\mathrm{m^4}$, $EI = 5.36\times10^4\,\mathrm{N\,m^2}$; forearm $I = \tfrac{\pi}{64}(75^4 - 70^4) = 3.75\times10^{-7}\,\mathrm{m^4}$, $EI = 2.58\times10^4\,\mathrm{N\,m^2}$.

*Upper arm* by [[#eq-cantilever]] with $w = 98.1\,\mathrm{N/m}$: $\delta = 0.112\,\mathrm{mm}$, $\theta = 0.488\,\mathrm{mrad}$; tip contribution $0.112 + 0.488\times0.50 = 0.356\,\mathrm{mm}$.

*Forearm* with $w = 56.1\,\mathrm{N/m}$: $\delta = 0.065\,\mathrm{mm}$, $\theta = 0.301\,\mathrm{mrad}$; tip contribution $0.065 + 0.301\times0.15 = 0.110\,\mathrm{mm}$.

*Joints and bearing*: joint 2: $1.39\times0.90 = 1.247\,\mathrm{mm}$; joint 3: $(38.3/3.0\times10^4)\times0.50 = 0.638\,\mathrm{mm}$; joint 5: $(7.9/1.0\times10^4)\times0.15 = 0.119\,\mathrm{mm}$; joint-1 bearing: $(110/10^6)\times0.90 = 0.099\,\mathrm{mm}$.

| contribution | tip deflection (mm) | share |
|---|---|---|
| joint 2 reducer | 1.247 | 49 % |
| joint 3 reducer | 0.638 | 25 % |
| upper-arm bending | 0.356 | 14 % |
| joint 5 reducer | 0.119 | 5 % |
| forearm bending | 0.110 | 4 % |
| joint-1 bearing tilt | 0.099 | 4 % |
| **total** | **2.57** | |

*Interpretation*: three quarters of the sag comes from the reducers of joints 2 and 3; the links contribute less than a fifth. Making the links stiffer would barely help; a stiffer shoulder reducer (the next size up), an output encoder that measures the twist, or a stiffness model in the controller would. The sag is repeatable for a given payload, so it costs accuracy, not repeatability — but it changes by about half a millimetre when the payload is picked up, which is why a compliance model is part of [[robot-arm-design/calibration]].

*Sanity check*: a sag of the order of a millimetre or two at full payload and full reach is plausible for a lightweight arm with strain-wave joints, and is the reason joint compliance is modelled in calibration; a stiff industrial arm of the same reach, with larger cycloidal reducers and cast links, would sag several times less.
:::
:::

The budget also shows the dynamic side. Each compliance is a spring between inertias, and the softest springs set the lowest natural frequencies. The joint-2 reducer gave a mode near $17\,\mathrm{Hz}$ in [[robot-arm-design/gear-reducers]]; the upper arm itself, as a cantilever with the distal $12.5\,\mathrm{kg}$ at its end, has a bending stiffness $3EI/L^3 = 2.5\times10^6\,\mathrm{N/m}$ and a first mode of about $\frac{1}{2\pi}\sqrt{2.5\times10^6/(12.5 + 0.24\times4.0)} = 69\,\mathrm{Hz}$ (the $0.24$ is the usual effective-mass factor for a uniform cantilever's own mass). Structural modes well above the joint modes are the goal: then the joint servo, tuned below the joint modes, never excites the structure.

::: warning Don't forget the housings and the joints between parts
A budget built from link tubes and catalogue reducer stiffnesses often predicts noticeably less deflection than is measured on the real arm. The missing compliance is in the parts between: the bolted flange where a tube meets a housing (a thin flange bends; a bolt circle that is small compared with the tube diameter concentrates the load), the reducer's mounting to its housing, a thin motor housing that ovalises, and the joint's output bearing. Model the housings with finite elements ([[finite-element-method]]), keep load paths short and direct, make flanges thick and bolt circles large, and measure the assembled arm: hang a known weight on the flange, read the deflection with a dial gauge or laser tracker, and compare with the budget term by term by locking joints in turn.
:::

## Joint bearings and moment loads {#sec-bearings}

Every joint must carry the full set of loads from the links beyond it: an axial force, a radial force, the torque about the joint axis (taken by the reducer) and a **moment about axes perpendicular to the joint axis** — the overturning or tilting moment. In a base joint with a vertical axis, the whole weight of the outstretched arm creates a tilting moment of the same size as the shoulder torque. That moment must go into bearings, not into the reducer, whose teeth and flexspline tolerate only small misalignment.

::: proposition Bearing reactions under a moment load {#prop-bearing-pair}
A shaft supported by two bearings whose load centres are a distance $a$ apart carries a radial force $F$ midway between them and a moment $M$ about an axis perpendicular to the shaft. The radial reactions of the bearings are
$$
R_{1,2} = \frac F2 \pm \frac Ma .
$$ {#eq-bearing-pair}
:::

::: proof
Free-body diagram of the shaft: the external force $F$ at the mid-point, the external moment $M$, and the bearing reactions $R_1$ and $R_2$ (positive in the direction opposing $F$) at distances $a/2$ either side of the mid-point. Force balance: $R_1 + R_2 = F$. Moments about the mid-point: $(R_1 - R_2)\,a/2 = M$. Solving gives $R_1 = F/2 + M/a$, $R_2 = F/2 - M/a$.
:::

The lesson of [[#eq-bearing-pair]] is that the reactions grow as $1/a$: a moment carried by two bearings close together produces very large bearing forces. With $F = 200\,\mathrm N$, $M = 60\,\mathrm{N\,m}$ and $a = 50\,\mathrm{mm}$, the reactions are $1300\,\mathrm N$ and $-1100\,\mathrm N$ (the second bearing is pulled the other way): the moment, not the weight, dominates. A long joint can space its bearings widely; a compact robot joint cannot, which is why joints use bearings that carry moment loads within a single short unit:

- **Crossed-roller bearings**: one row of cylindrical rollers between V-grooved rings, alternate rollers crossed at $90°$, so that half the rollers carry load in each axial direction. One thin bearing carries radial, axial and moment loads with high tilting stiffness. It is the integrated output bearing of most strain-wave units and the usual joint bearing of compact arms.
- **Angular-contact ball or tapered-roller bearings in pairs**, mounted **back-to-back** (O arrangement): the lines of contact diverge outwards, so the effective spread between the load centres is larger than the physical spacing of the bearings, raising moment capacity and tilting stiffness. Two-stage cycloidal reducers use such pairs as their output bearings.
- **Four-point-contact ball bearings**: a single row that carries axial loads in both directions and moderate moments; common as slewing rings in bases.

Bearings are **preloaded** — pressed axially so that no rolling element is ever unloaded — because a clearance in a joint bearing is backlash that the output encoder will see but the controller cannot remove, and because preload raises the stiffness. Preload costs friction, which costs back-drivability and heat; the choice is part of the joint design. Rating life under the duty cycle and the static safety factor under the worst moment (including emergency stops and collisions) are checked as in [[machine-design/bearings]].

::: example Choosing between a crossed-roller bearing and a bearing pair {#ex-bearing}
The base joint of the example arm must carry an overturning moment of up to $250\,\mathrm{N\,m}$ (gravity plus acceleration and an emergency stop) and a radial force of $300\,\mathrm N$. The joint housing allows an axial length of $60\,\mathrm{mm}$. (a) With two deep-groove ball bearings whose centres are $45\,\mathrm{mm}$ apart, what radial reactions occur? (b) A crossed-roller bearing of the same outside diameter has a catalogue moment rating of $400\,\mathrm{N\,m}$ (illustrative). Which would you choose?
::: solution
(a) By [[#eq-bearing-pair]], $R_{1,2} = 300/2 \pm 250/0.045 = 150 \pm 5556\,\mathrm N$: $5706\,\mathrm N$ and $-5406\,\mathrm N$. Each bearing carries nearly $6\,\mathrm{kN}$ of radial load because of the moment — nineteen times the external radial force. Deep-groove bearings that fit a $60\,\mathrm{mm}$ housing at the diameter of a hollow joint may manage this statically, but their tilting stiffness under such loads, with internal clearance, would be poor, and their life short if the moment is often present.

(b) The crossed-roller bearing carries the moment within one row, with a moment rating $1.6$ times the worst case and a high tilting stiffness, in perhaps a third of the axial length, leaving room for the brake and encoder. It is the natural choice; the check that remains is its rating life under the duty cycle (using the equivalent load method of the catalogue) and its friction torque with the chosen preload.
:::
:::

## Materials and manufacture of links {#sec-materials}

Three constructions dominate (as of 2026):

- **Machined aluminium** tubes and housings, for small series and prototypes: accurate, quick, easy to change, but expensive per part and limited in shape.
- **Cast aluminium** (sand, permanent-mould or high-pressure die casting) or **cast magnesium**: complex hollow shapes with ribs, bosses and cable channels in one part, cheap in volume, accurate enough after machining the bearing seats and flanges. Most production industrial and collaborative arms use castings. Cast iron and steel are used for bases and the large arms of heavy robots, where mass at the base is harmless and damping is welcome.
- **Carbon-fibre-reinforced polymer** (CFRP) tubes bonded to metal end fittings: up to roughly $1.5$ times the stiffness per mass of aluminium for practical layups and near-zero thermal expansion along the tube. The difficulties are the joints (bonded or bonded-and-pinned metal fittings, which may dominate the compliance), damage tolerance (a knock can cause hidden delamination), cost, and electrical behaviour (CFRP is conductive; bonding and earthing must be designed). CFRP pays off on long, slender links where link bending is a large share of the budget, and in arms where every kilogram counts.

Additive manufacturing (laser powder-bed fusion of aluminium or titanium, and fibre-reinforced polymer printing for light arms) is used for brackets, prototypes and integrated cable channels, and increasingly for production parts in small series.

## Cable routing through rotating joints {#sec-cables}

Every joint must pass power and signals to the joints beyond it. The cable harness is a common cause of field failures in arms: cables that are bent too tightly, twisted too much, rubbed on edges or forced through a joint at a single point fail from fatigue after millions of cycles. Four methods are used.

1. **Through a hollow shaft**: the cable bundle runs along the joint axis through the hollow motor, reducer and bearing. When the joint turns, the bundle **twists** about its own axis instead of bending — the gentlest load a cable can take. Torsion-rated robot cables are specified by an allowed twist angle per unit free length (data sheets typically quote figures such as $\pm180°$ to $\pm360°$ per metre); the bundle needs enough free length between its clamps to spread the joint's range of motion.
2. **Externally, in a service loop or dress pack**: a loop of cable outside the joint that bends as the joint turns, guided by spring returns or cable carriers. Simpler to service, common on industrial arms for the process cables of the tool, but bulky and liable to snag.
3. **Slip rings**: sliding contacts that pass power and signals across a joint that turns without limit — needed when a joint must rotate continuously (some base joints, tool flanges, wrist roll on screwdriving or polishing). Slip rings add contact resistance and electrical noise, wear, need maintenance, and limit the data rates that can pass reliably unless contactless (inductive or optical) transfer is used for the data. Most arm joints avoid them by limiting rotation to about $\pm1$ to $\pm2$ turns.
4. **Reducing the number of conductors**: the most effective measure. With drives in the controller cabinet, every axis needs motor phases, protective earth, brake wires and an encoder cable through all the joints behind it; with drives inside each joint (integrated joint modules), a single DC bus and a fieldbus run through the whole arm.

::: example Counting conductors through the shoulder {#ex-cables}
Count the conductors passing through the shoulder (joint 2) of a six-axis arm for (a) central drives: per axis three motor phases, one protective earth, two brake wires and four encoder wires (power and serial data), plus twelve tool I/O wires; (b) integrated joint drives: a two-wire $48\,\mathrm V$ bus, protective earth, a four-wire EtherCAT link, four wires for a safety channel, and the same twelve tool wires.
::: solution
(a) Joints 3 to 6 lie beyond the shoulder: $4\times(3 + 1 + 2 + 4) = 40$ conductors, plus $12$ tool wires: $52$ conductors, in several cables, some of them heavy power cables.
(b) $2 + 1 + 4 + 4 + 12 = 23$, and only the two bus conductors carry significant current; the bundle is perhaps a third of the cross-section of (a), and its size does not grow with the number of joints.

The integrated design is the reason collaborative arms can route everything through hollow joints of modest bore. The cost is electronics in every joint — heat in a sealed housing, and drives exposed to the arm's vibration — and a bus that must carry the peak current of all joints at once ($6\times20\,\mathrm A$ at $48\,\mathrm V$ is $120\,\mathrm A$ in the worst case, which sizes the bus conductors).
:::
:::

## Thermal effects {#sec-thermal}

Heat reaches the structure from the joint motors (the $20\text{–}30\,\mathrm W$ of [[robot-arm-design/joint-actuators]] per large joint), from the drives in integrated joints, from reducer friction and from the environment. Two effects matter.

**Thermal expansion** changes link lengths. A link of length $L$ and expansion coefficient $\alpha$ warmed by $\Delta T$ grows by $\alpha L\Delta T$: for aluminium ($\alpha = 23.6\times10^{-6}\,\mathrm{K^{-1}}$), $10\,\mathrm K$ over $0.75\,\mathrm m$ gives $0.18\,\mathrm{mm}$, several times the repeatability of a good arm. The effect is repeatable at a given temperature but drifts during warm-up, which takes tens of minutes to an hour. The remedies are to warm up the arm before precision work (and calibrate warm, [[robot-arm-design/calibration]]), to measure temperatures and compensate in the kinematic model, or — for the most demanding applications — to use CFRP links ($\alpha$ near zero along the tube: $0.0075\,\mathrm{mm}$ in the same case).

::: example Warm-up drift of the example arm {#ex-thermal}
After an hour of production the upper arm of the example arm has warmed by $10\,\mathrm K$ and the forearm by $6\,\mathrm K$ above the temperature at which it was calibrated. Both are aluminium ($\alpha = 23.6\times10^{-6}\,\mathrm{K^{-1}}$). With the arm stretched horizontally, how far does the wrist centre move outwards? What would CFRP tubes ($\alpha \approx 1\times10^{-6}\,\mathrm{K^{-1}}$ along the tube) give, and how does each compare with a repeatability of ±0.05 mm?
::: solution
Aluminium: $\Delta r = \alpha(L_2\Delta T_2 + L_3\Delta T_3) = 23.6\times10^{-6}(0.40\times10 + 0.35\times6) = 23.6\times10^{-6}\times6.1 = 1.44\times10^{-4}\,\mathrm m = 0.144\,\mathrm{mm}$, almost three times the repeatability. CFRP tubes: $1\times10^{-6}\times6.1 = 6.1\,\mathrm{\mu m}$, negligible — though the aluminium joint housings and fittings at each end still grow, so a real CFRP arm gains less than this suggests.

The drift is radial when the arm is stretched; in other poses it moves the tool in other directions, so it cannot be removed by one fixed offset. Measuring the link temperatures and scaling the link lengths in the kinematic model, or running a warm-up cycle before precision work, are the usual cures.

*Sanity check*: $0.14\,\mathrm{mm}$ is about one part in $5000$ of the reach, consistent with $\alpha\Delta T \approx 2\times10^{-4}$.
:::
:::

**The structure is the heat sink.** A joint motor in a sealed housing has nowhere to put its losses except by conduction into the housing and links and then by natural convection and radiation from the arm's surface; the thermal resistance $R_{th}$ that limited the continuous torque in [[robot-arm-design/joint-actuators]] is largely the resistance of this path. Good thermal design puts the stator in close contact with a thick aluminium housing, avoids plastic covers over hot joints, and keeps touchable surfaces of collaborative arms at temperatures that are safe to touch. Composite links insulate rather than conduct, so a CFRP arm needs its joint housings to dissipate the heat themselves.

::: quiz
An aluminium arm repeats to ±0.02 mm when tested cold, but parts placed during the first 40 minutes of each shift drift by about 0.1 mm. What is the most likely cause, and the cheapest remedy?
- [ ] Encoder resolution; fit higher-resolution encoders
- [ ] Backlash in the reducers; fit preloaded reducers
- [x] Thermal growth of the links as the joints warm up; run a warm-up cycle before production
- [ ] Bending of the links under the payload; use stiffer tubes
::: solution
A drift that appears over tens of minutes after start-up and then stops is thermal: the joint motors warm the housings and links, which grow by $\alpha L\Delta T$ — $0.1\,\mathrm{mm}$ is about $6\,\mathrm K$ over $0.75\,\mathrm m$ of aluminium. Encoder resolution and backlash do not change with time; payload bending does not drift. A warm-up programme (or temperature compensation) is the cheapest remedy.
:::
:::

::: history
Early industrial robots, such as the hydraulic Unimate of 1961, had heavy cast and fabricated steel structures, and their stiffness came from mass. The move to electric drives in the 1970s and 1980s, led by arms such as ASEA's IRB 6 and the PUMA, brought cast aluminium links and the beginning of the search for low mass. Lightweight robotics as a research programme took shape at the German Aerospace Center (DLR), whose Light-Weight Robot arms of the 1990s and 2000s — built for space applications — combined thin-walled links, integrated joint electronics, hollow-shaft cable routing and joint torque sensing; the third generation reached a mass-to-payload ratio of about one, and its design was transferred to industry as a commercial lightweight arm. Carbon-fibre links appeared in high-speed parallel robots and in research arms from the 1990s, where their stiffness per mass and low thermal expansion justified their cost.
:::

## Where this leads {#sec-leads}

The structure fixes the masses that the joints carry — feed them back into the sizing of [[robot-arm-design/arm-specification]] — and the compliances and natural frequencies that the joint controller must live with, which is where [[robot-arm-design/joint-control]] begins.

::: summary
- Arm links are designed for stiffness per mass, not strength: stresses are typically a few MPa.
- Steel, aluminium, magnesium and titanium share $E/\rho \approx 25\,\mathrm{MN\,m/kg}$; only fibre composites do better, by about 1.5× for practical layups. Aluminium wins on section size, machining and casting.
- At fixed mass, a thin tube's $I = m'D^2/(8\rho)$: make links large in diameter and thin-walled, within local-buckling and attachment limits.
- Build a tip-deflection budget by superposition: link end deflection plus end slope times the distance to the tip, joint twist times distance, bearing tilt times distance. In lightweight arms the reducers usually dominate.
- Moment loads need crossed-roller bearings or preloaded back-to-back pairs; with two bearings $a$ apart the reactions are $F/2 \pm M/a$.
- Route cables through hollow shafts (twist, not bend), keep service loops for tool cables, use slip rings only for continuous rotation, and reduce the conductor count with integrated drives and a fieldbus.
- Thermal growth ($\alpha L\Delta T$) causes warm-up drift; the structure is the motors' heat sink.
:::

## Exercises

::: exercise Bending stress in a link {level=1 check="31.7"}
A solid aluminium bar of $30\,\mathrm{mm}$ diameter is used as a link and carries a root bending moment of $84\,\mathrm{N\,m}$. Find the maximum bending stress. (Enter the stress in MPa, to one decimal place.)
::: solution
$\sigma = Mc/I = 32M/(\pi d^3) = 32\times84/(\pi\times2.7\times10^{-5}) = 31.7\,\mathrm{MPa}$. A tube of the same mass but $60\,\mathrm{mm}$ diameter would have about a quarter of the deflection and a much lower stress; neither is close to yield.
:::
:::

::: exercise Thermal growth {level=1 check="0.142"}
An aluminium forearm ($\alpha = 23.6\times10^{-6}\,\mathrm{K^{-1}}$) of length $0.40\,\mathrm m$ warms by $15\,\mathrm K$. By how much does it grow? (Enter the growth in mm, to three decimal places.)
::: solution
$\Delta L = \alpha L\Delta T = 23.6\times10^{-6}\times0.40\times15 = 1.416\times10^{-4}\,\mathrm m = 0.142\,\mathrm{mm}$.
:::
:::

::: exercise Bearing reactions {level=1 check="2050"}
A joint shaft has two bearings with load centres $40\,\mathrm{mm}$ apart. It carries a radial load of $100\,\mathrm N$ midway between them and a tilting moment of $80\,\mathrm{N\,m}$. Find the larger bearing reaction. (Enter it in N.)
::: solution
$R = F/2 + M/a = 50 + 80/0.040 = 50 + 2000 = 2050\,\mathrm N$; the other is $-1950\,\mathrm N$. Doubling the spacing would halve the moment-induced part.
:::
:::

::: exercise Tube stiffness at fixed mass {level=2 check="1.778"}
An aluminium link tube of $60\,\mathrm{mm}$ diameter is replaced by one of $80\,\mathrm{mm}$ diameter with the same mass per unit length (thin-wall approximation). By what factor does its bending stiffness increase? (Enter the factor, to three decimal places.)
::: solution
By [[#eq-tube-I]], $I \propto D^2$ at fixed $m'$: factor $(80/60)^2 = 1.778$. The wall thins by the factor $60/80 = 0.75$.
:::
:::

::: exercise Contribution of a joint to tip deflection {level=2 check="78"}
A wrist joint with torsional stiffness $1.5\times10^4\,\mathrm{N\,m/rad}$ carries a gravity torque of $6.5\,\mathrm{N\,m}$, and the tool centre point is $0.18\,\mathrm m$ from its axis. How much does the joint's twist contribute to the tip deflection? (Enter the deflection in µm, to the nearest µm.)
::: solution
$\theta = 6.5/1.5\times10^4 = 4.33\times10^{-4}\,\mathrm{rad}$; tip contribution $0.18\times4.33\times10^{-4} = 7.8\times10^{-5}\,\mathrm m = 78\,\mathrm{\mu m}$ — more than the repeatability of most arms, from a wrist joint alone.
:::
:::

::: exercise CFRP upper arm {level=2 check="0.273"}
Repeat the upper-arm contribution of [[#ex-budget]] with a CFRP tube of the same dimensions and an axial modulus of $90\,\mathrm{GPa}$, keeping the loads the same. (Enter its tip contribution in mm, to three decimal places.) Is the change worth it?
::: solution
All bending terms scale with $1/E$: $0.356\times69/90 = 0.273\,\mathrm{mm}$. The tube mass falls from $0.89$ to $0.52\,\mathrm{kg}$ ($\rho = 1600\,\mathrm{kg/m^3}$). The total budget falls only from $2.57$ to $2.49\,\mathrm{mm}$ because link bending is a small share; the CFRP tube pays off through the mass saved (and the reduced thermal growth), not through the deflection.
:::
:::

::: exercise A cable through a hollow shaft {level=2}
A joint has a range of $\pm270°$ and its cable bundle is rated for $\pm180°$ of twist per metre of free length. What free length must the bundle have between its clamps on either side of the joint? What happens if the clamps are placed closer, and how could the range be accommodated if the space is not available?
::: solution
The bundle must take $270°$ of twist in each direction, so it needs $270/180 = 1.5\,\mathrm m$ of free length — usually far more than fits in one joint. Placing the clamps closer concentrates the twist, raising the shear strain in the conductors and insulation and shortening their fatigue life dramatically. Remedies: reduce the joint range to what the task needs (e.g. $\pm180°$ needs $1.0\,\mathrm m$); route the bundle in a spiral or a clock-spring (flat cable wound in a housing, as in a car's steering column) so that rotation unwinds a spiral instead of twisting a straight bundle; use a rotating cable guide that converts rotation into bending of a ribbon; or use a slip ring for low-current signals.
:::
:::

::: exercise Deflection of a link with an end moment {level=3 check="0.200"}
Derive the end slope $\theta = ML/(EI)$ and end deflection $\delta = ML^2/(2EI)$ of a cantilever under an end moment $M$ from the bending equation $EIv'' = M(x)$. Then evaluate the upper-arm terms due to $M = 38.3\,\mathrm{N\,m}$ alone in [[#ex-budget]] and their combined tip contribution $\delta + 0.5\,\theta$. (Enter the tip contribution in mm, to three decimal places.)
::: solution
Under an end moment the bending moment is $M$ everywhere, so $EIv'' = M$, $EIv' = Mx$ (with $v'(0) = 0$) and $EIv = Mx^2/2$ (with $v(0) = 0$). At $x = L$: $\theta = ML/(EI)$, $\delta = ML^2/(2EI)$. With $EI = 69\times10^9\times7.767\times10^{-7} = 5.359\times10^4\,\mathrm{N\,m^2}$: $\theta = 38.3\times0.40/5.359\times10^4 = 2.859\times10^{-4}\,\mathrm{rad}$ and $\delta = 38.3\times0.16/(2\times5.359\times10^4) = 5.72\times10^{-5}\,\mathrm m$. Tip contribution $0.0572 + 0.5\times0.2859 = 0.200\,\mathrm{mm}$ — more than half the upper arm's total of $0.356\,\mathrm{mm}$: the moment of the distal parts, not their weight as a force, does most of the bending.
:::
:::

::: exercise Halving the tip deflection {level=3}
The example arm's budget of $2.57\,\mathrm{mm}$ must be halved for a new product. Propose and evaluate changes, using the budget of [[#ex-budget]], with their cost in mass and money. Which single change gives most? Is any combination of link changes alone sufficient?
::: solution
A good answer starts from the shares: links together are $0.47\,\mathrm{mm}$, so even rigid links would leave $2.1\,\mathrm{mm}$ — link changes alone cannot halve the budget. The joint-2 reducer ($1.25\,\mathrm{mm}$) is the biggest term: the next size up typically roughly doubles stiffness ($-0.6\,\mathrm{mm}$) for perhaps $1\text{–}1.5\,\mathrm{kg}$ more at the shoulder (harmless for joint 2's own load, but more mass for joint 1 and the base). The joint-3 reducer ($0.64\,\mathrm{mm}$) likewise; a stiffer one there adds mass that joint 2 must carry (so iterate the sizing). Alternatively, keep the hardware and compensate: an output encoder on joints 2 and 3 measures the twist directly, removing their contribution from the *position* error (the controller then drives the output to the target), which addresses $1.9\,\mathrm{mm}$ at the cost of two encoders; or a compliance model in the controller, which is cheapest but only as good as the model (nonlinear, hysteretic). A defensible plan: output encoders on joints 2 and 3 plus a $1.5\times$ stiffer joint-3 housing, giving roughly $0.36 + 0.11 + 0.12 + 0.10 = 0.7\,\mathrm{mm}$ of uncompensated structural deflection.
:::
:::
