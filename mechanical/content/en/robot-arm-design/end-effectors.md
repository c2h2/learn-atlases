The arm delivers a flange to a pose; the **end effector** does the work. It is the part of a robot cell that is most often custom-made, most often changed, and most often responsible for failures in production: a part slips out of the fingers at the top of a fast move, a suction cup drops a carton with a printed film on it, a peg jams half-way into its hole. This chapter covers the main families of grippers — parallel-jaw, adaptive, vacuum, magnetic and soft — and the mechanics that decide whether a grasp holds: contact models and the friction cone, form and force closure, grasp quality, and the grip force needed when the part is accelerated. It then treats the hardware around the gripper: tool changers, wrist force–torque sensors, and passive and active compliance for assembly. The controllers that use force feedback (impedance, admittance, hybrid control) are in [[robotics/robot-control]]; the joint torque and stiffness of the arm that carries the tool are in [[robot-arm-design/joint-control]]. Everything the end effector adds — mass, length, a pinch point between fingers — also enters the arm's payload budget and the safety assessment of [[robot-arm-design/arm-safety]].

## Families of end effectors {#sec-families}

**Parallel-jaw grippers** move two (sometimes three) fingers symmetrically towards a centre line. They are the default for machined parts, cartons and anything with two parallel faces.

- *Pneumatic* grippers drive the jaws with a piston through a wedge, lever or rack. They are compact, robust and strong for their size: a 25 mm bore at 500 kPa gauge already gives $p A = 500\times10^3\times\pi(0.0125)^2 = 245\,\mathrm N$ before the mechanism's ratio. They close fully or open fully — force is set by the supply pressure, and position is known only at the end stops (by magnetic or inductive switches).
- *Electric* grippers drive the jaws with a motor and a lead screw, belt or rack. They can set the grip force (by motor current), the stroke and the speed, and report the jaw position — which doubles as a measurement of the part ("is this the 20 mm or the 22 mm bushing?"). Forces are lower per unit size than pneumatic grippers, and a self-locking screw keeps the grip if power is lost, which matters for safety.

**Adaptive (underactuated) grippers** have fingers with two or three phalanges driven by fewer actuators than joints, through linkages, tendons and springs. When the proximal phalanx meets the object it stops and the distal phalanx continues to close, so the finger wraps around irregular shapes without being told their geometry. They are favoured for varied objects in logistics and for collaborative applications; the price is that the grasp configuration, and hence the exact part position in the hand, depends on the object.

**Vacuum grippers** hold by the pressure difference across a cup or a foam pad. They dominate packaging, sheet metal, glass and carton handling: they need access to only one face, cost little, and pick from the top of a stack. The vacuum is produced either by a **venturi ejector** fed with compressed air (fast, compact, no moving parts, but a continuous consumer of compressed air unless it has an air-saving valve that switches off when vacuum is reached) or by an **electric pump or blower** (no compressed air, and high flow for porous or leaky surfaces such as cardboard).

**Magnetic grippers** hold ferromagnetic parts. Electromagnets lose their hold when the power fails, which is a hazard; *switchable permanent magnets* (rotated mechanically or pneumatically) and *electro-permanent magnets* (switched by a current pulse, holding with no power) keep the part if power is lost. Holding force depends strongly on the part: data-sheet values refer to thick, low-carbon steel with a clean, flat contact, and thin sheet (which saturates), paint, scale or an air gap of a few tenths of a millimetre reduce it substantially — manufacturers publish derating curves, which must be used.

**Soft grippers** use compliant materials to conform to the object. *Fin Ray*-type fingers bend towards a pressing object rather than away from it; *pneumatic network* (PneuNet) actuators are elastomer bodies with internal chambers that curl when inflated; *granular jamming* grippers press a membrane full of grains around an object and then evacuate it, so the grains lock into a solid cast of the object's shape; electroadhesive and gecko-inspired dry-adhesive pads hold flat and delicate parts. They are gentle and tolerant of position error, which suits food, fruit and mixed items, but their grip force, stiffness and precision are low compared with rigid fingers.

::: definition Gripping by force (friction) and by form {#def-grip-modes}
A **force-fit (friction) grasp** holds the object only by friction at the contacts: the gripper presses with normal forces, and the tangential friction forces carry the object's weight and inertia. A **form-fit grasp** holds the object by the geometry of the fingers — pockets, shoulders or a hook under the part — so that the load is carried by normal contact forces and the object cannot leave the hand in the loaded directions even without friction. Most practical grasps are a mixture: a gripper with shaped fingers that carry the weight by form and use friction only for the remaining directions.
:::

Designing fingers that turn a friction grasp into a form grasp is the most effective single improvement in gripper design. A friction grasp with $\mu = 0.3$ needs a squeeze of more than three times the load it carries; a finger with a ledge under the part carries the load directly, with the squeeze needed only to keep the part seated.

## Grasp mechanics {#sec-mechanics}

### Contact models and the friction cone

Model each finger–object contact as acting at a point $\mathbf r$ on the object surface, with inward unit normal $\mathbf n$. Three models are standard (Salisbury, 1982):

- a **frictionless point contact** transmits only a normal force $f_n\mathbf n$, $f_n \ge 0$;
- a **point contact with friction** transmits any force inside the **friction cone** — Coulomb's law with coefficient $\mu$;
- a **soft-finger contact** (a pad with a small contact patch) also transmits a limited moment about the normal.

::: definition Friction cone {#def-friction-cone}
At a point contact with Coulomb friction coefficient $\mu$, the contact can transmit a force $\mathbf f = f_n\mathbf n + \mathbf f_t$ ($\mathbf f_t \perp \mathbf n$) without slipping if and only if
$$
f_n \ge 0\quad\text{and}\quad \lVert\mathbf f_t\rVert \le \mu f_n ,
$$ {#eq-cone}
i.e. if $\mathbf f$ lies in a circular cone about the normal with half-angle $\arctan\mu$. Each contact force produces a **wrench** on the object, $\mathbf w = (\mathbf f, \mathbf r\times\mathbf f)\in\R^6$ (in the plane, $(f_x, f_y, (\mathbf r\times\mathbf f)_z)\in\R^3$).
:::

Friction coefficients for gripper design are uncertain — they depend on pad material, surface finish, oil and dust. Values used for preliminary design of rubber or polyurethane pads on clean, dry metal are often 0.3–0.5, falling to 0.1–0.2 for oily surfaces; a measured value for the actual pad and part is always better. For $\mu = 0.3$ the cone half-angle is $\arctan0.3 = 16.7^\circ$; for $\mu = 0.5$, $26.6^\circ$.

### Form closure and force closure

::: definition Form closure and force closure {#def-closure}
A grasp is in **form closure** if the contacts, treated as frictionless, prevent every motion of the object: any small rigid motion would make some contact penetrate. Equivalently, the contact wrenches with non-negative normal forces positively span the whole wrench space. A grasp is in **force closure** if, with friction, the contacts can resist any external wrench: for every $\mathbf w_{\mathrm{ext}}$ there are contact forces inside their friction cones whose total wrench is $-\mathbf w_{\mathrm{ext}}$.
:::

Form closure needs many contacts: at least 4 frictionless contacts for a planar object and at least 7 for a spatial one (results going back to Reuleaux in the nineteenth century and proved in general by Markenscoff, Ni and Papadimitriou in 1990). Fixtures and form-fit fingers use it. Force closure is what two-finger grippers achieve, and its condition for two contacts is simple.

::: proposition Two-contact force closure (antipodal grasp) {#prop-antipodal}
A planar object grasped at two point contacts with friction coefficient $\mu$ is in force closure if and only if the line segment joining the contacts lies strictly inside both friction cones — that is, the angle between the segment and each inward contact normal is less than $\arctan\mu$. Such a grasp is called **antipodal**.
:::

::: proof
*Sufficiency.* Let the contacts be $\mathbf r_1$, $\mathbf r_2$ and $\mathbf e = (\mathbf r_2 - \mathbf r_1)/\lVert\mathbf r_2 - \mathbf r_1\rVert$. If $\mathbf e$ is strictly inside cone 1 and $-\mathbf e$ strictly inside cone 2, the fingers can apply an internal squeeze $s\mathbf e$ at contact 1 and $-s\mathbf e$ at contact 2 with $s>0$; these forces have zero resultant and zero moment (they act along the same line), and they lie strictly inside the cones, so any small additional forces $\Delta\mathbf f_1$, $\Delta\mathbf f_2$ can be added without leaving the cones, and large ones by scaling $s$ up (cones are invariant under positive scaling). It remains to show that the contacts can produce any planar wrench $(F_x, F_y, M)$ to first order: forces in the two-dimensional cone interiors span every force direction, and a moment $M$ is produced by equal and opposite forces perpendicular to $\mathbf e$ at the two contacts (a couple of arm $\lVert\mathbf r_2 - \mathbf r_1\rVert$), which are available because each cone has a non-zero half-angle about a direction near $\pm\mathbf e$. Hence every wrench can be balanced: force closure.

*Necessity.* Suppose the segment lies outside cone 1, say. Consider a pure squeeze, or more generally an external wrench that tries to rotate the object about an axis through contact 2 in the direction that makes contact 1 slide. Any force at contact 2 has zero moment about $\mathbf r_2$, so the moment about $\mathbf r_2$ must come from contact 1 alone, $(\mathbf r_1 - \mathbf r_2)\times\mathbf f_1$; meanwhile the forces must balance, $\mathbf f_1 + \mathbf f_2 = -\mathbf F_{\mathrm{ext}}$. For an external wrench with zero force and a moment about $\mathbf r_2$, $\mathbf f_2 = -\mathbf f_1$ must lie in cone 2 and $\mathbf f_1$ in cone 1, so $\mathbf f_1$ is in cone 1 and in the negative of cone 2. The moment $(\mathbf r_1 - \mathbf r_2)\times\mathbf f_1$ has a sign set by which side of the line $\mathbf r_1\mathbf r_2$ the force $\mathbf f_1$ points; if neither $\mathbf e$ nor $-\mathbf e$ lies in cone 1, the cone lies entirely on one side of the line through the contacts, so only one sign of moment can be produced, and an external moment of the other sign cannot be resisted. (If the segment is on the boundary of a cone, moments are resisted only with forces on the edge of the cone, i.e. at incipient slip, which is excluded by "strictly".)
:::

::: example A tapered part in a parallel gripper {#ex-taper}
A parallel gripper with flat polyurethane pads ($\mu = 0.3$, assumed) grasps a part whose two gripped faces are not parallel but taper symmetrically with half-angle $\alpha$ (a wedge). For which $\alpha$ does the grasp hold under squeezing alone, and what happens for $\alpha = 10^\circ$ and $\alpha = 20^\circ$?
::: solution
The jaws move along the line joining the contacts, and the faces' inward normals are tilted by $\alpha$ from that line. By [[#prop-antipodal]] the grasp is in force closure if $\alpha < \arctan\mu = \arctan0.3 = 16.7^\circ$.

Physically: each pad presses with jaw force $F$ along the closing direction. Resolved on the inclined face, this is a normal force $F\cos\alpha$ and a tangential component $F\sin\alpha$ along the face that pushes the part out of the jaws (the pads slide towards the narrow end of the wedge). Friction can resist at most $\mu F\cos\alpha$, so the part stays if $\tan\alpha < \mu$. At $\alpha = 10^\circ$, $\tan\alpha = 0.176 < 0.3$: it holds, with the friction margin $0.3 - 0.176$ left to carry other loads. At $\alpha = 20^\circ$, $\tan\alpha = 0.364 > 0.3$: the part squirts out of the jaws, and squeezing harder makes it worse, not better, because the ejecting component grows with $F$ as fast as the friction does.

Sanity check: drafted castings and mouldings often have 1–3° of draft; those are comfortably held. Conical or wedge-shaped parts need shaped fingers (form fit) — pads machined to the taper, so that the contact normals are again along the closing direction.
:::
:::

### Grasp quality

Among the many force-closure grasps of an object, some are better than others. The most widely used measure is that of **Ferrari and Canny** (1992): approximate each friction cone by a few edge vectors, compute the wrenches of unit normal forces along those edges, and take the convex hull of all of them. The **$\varepsilon$-metric** is the radius of the largest ball, centred at the origin of wrench space, that fits inside this hull: the smallest external wrench (over all directions) that the grasp can resist per unit of total finger force. A grasp with $\varepsilon = 0$ is not in force closure; larger is better. Since forces and moments have different units, moments are divided by a characteristic length (for example the object's radius) first. Grasp planners in bin-picking software rank candidate grasps with such metrics combined with practical terms — distance of the grasp from the centre of mass, approach clearance, and the reachability of the pose ([[robotics/inverse-kinematics]]).

## Grip force under acceleration {#sec-grip-force}

The force a gripper must apply is set not by the part's weight but by its weight *plus* the inertial loads of the motion, with a margin for uncertainty in friction and for shocks.

::: proposition Required grip force for a friction grasp {#prop-grip}
A part of mass $m$ is held by $n$ fingers, each pressing with normal force $F$, with friction coefficient $\mu$ at every contact, and the load on the part (weight plus inertia) acts parallel to the contact surfaces. If the part's acceleration is $\mathbf a$, the grasp holds with safety factor $S$ if
$$
n\,\mu F \ \ge\ S\,m\,\lVert\mathbf g' \rVert ,\qquad \mathbf g' = \mathbf g - \mathbf a ,
$$ {#eq-grip}
where $\mathbf g$ is the gravitational acceleration vector, so that $\mathbf g'$ is the "effective gravity" seen in the part's frame. For vertical upward acceleration $a$, $\lVert\mathbf g'\rVert = g + a$. The safety factor, commonly taken as $2$ or more, covers uncertainty in $\mu$, shocks at start and stop, and wear of the pads.
:::

::: proof
In the gripper's accelerating frame the part is in equilibrium under the contact forces, its weight $m\mathbf g$ and the inertial (d'Alembert) force $-m\mathbf a$: the contacts must supply the tangential force $-m(\mathbf g - \mathbf a)$, of magnitude $m\lVert\mathbf g'\rVert$, since by assumption it lies in the contact planes. The normal forces of opposed fingers cancel (they are internal squeeze). The largest total tangential force the contacts can supply without slipping is $\sum\mu F = n\mu F$ by [[#eq-cone]]. So the part stays if $n\mu F \ge m\lVert\mathbf g'\rVert$, and with a margin $S$ the stated condition follows. If part of the load acts along the closing direction instead, it is carried by normal force on one finger (form) and reduces the friction requirement, so [[#eq-grip]] is conservative for that case.
:::

::: example Grip force for a fast pick {#ex-grip}
An electric parallel gripper with two fingers picks a $1.5\,\mathrm{kg}$ steel bracket by two vertical faces (gravity parallel to the pads), with $\mu = 0.3$. The arm lifts it with a vertical acceleration of up to $6\,\mathrm{m/s^2}$ and, during the transfer, a horizontal acceleration of up to $8\,\mathrm{m/s^2}$ along the pads. (a) Find the required grip force per finger with $S = 2$ for the lift alone. (b) The motion planner sometimes blends the lift and transfer, so both accelerations occur together. Recompute. (c) The gripper is rated at $140\,\mathrm N$ maximum. Is it adequate? What would a form-fit finger change?
::: solution
(a) $\lVert\mathbf g'\rVert = g + a = 9.81 + 6 = 15.81\,\mathrm{m/s^2}$. From [[#eq-grip]], $F \ge \dfrac{S\,m(g + a)}{n\mu} = \dfrac{2\times1.5\times15.81}{2\times0.3} = 79.1\,\mathrm N$ per finger.

(b) With both accelerations, $\mathbf g' = (-8, 0, -15.81)\,\mathrm{m/s^2}$ in a frame with $z$ up (sign of the horizontal part irrelevant), so $\lVert\mathbf g'\rVert = \sqrt{8^2 + 15.81^2} = 17.72\,\mathrm{m/s^2}$ and $F \ge 2\times1.5\times17.72/0.6 = 88.6\,\mathrm N$.

(c) $88.6\,\mathrm N < 140\,\mathrm N$, so the gripper is adequate at its rated force — provided the rating applies at the finger length used (grippers are derated for long fingers, because the jaw guides carry a moment) and the force is set to about $90$–$100\,\mathrm N$, not left at maximum, which would mark the part and waste energy. A finger with a ledge under the bracket would carry the vertical part of the load by form: then only the horizontal $8\,\mathrm{m/s^2}$ needs friction, $F \ge 2\times1.5\times8/0.6 = 40\,\mathrm N$, less than half.

Sanity check: in the static case ($a = 0$) the requirement would be $49\,\mathrm N$ per finger, about $3.3$ times the weight ($14.7\,\mathrm N$) divided between two fingers — the factor $S/\mu = 6.7$ shared by $n = 2$. A gripper whose force is only a few times the part's weight is not enough for a friction grasp.
:::
:::

::: widget plot
f: S*m*sqrt((9.81 + x)^2 + h^2)/(2*u)
x: 0, 20
y: 0, 300
sliders: m=1.5:0.1:10:0.1; u=0.3:0.1:0.8:0.05; S=2:1:4:0.5; h=0:0:15:0.5
hlines: 140
labels: F\ (\mathrm N)\ \text{per finger}
caption: Grip force per finger needed for a two-finger friction grasp, against the vertical acceleration $a$ in m/s², from [[#eq-grip]]: part mass $m$ (kg), friction coefficient $u$, safety factor $S$ and simultaneous horizontal acceleration $h$ (m/s²). The line at 140 N is a typical rating for a compact electric gripper. Raise $u$ from 0.3 to 0.6 — better pads — and the requirement halves; add horizontal acceleration and watch how little the curve rises until $h$ approaches $g + a$.
:::

::: warning Rated grip force is not holding force
The force on a gripper's data sheet is the normal (squeeze) force, usually at a stated finger length and supply pressure. The load it can hold is $\mu$ times that per finger — perhaps a third of it — and less still with long fingers, oily parts or worn pads. Confusing the two is the commonest gripper-sizing error. Two others follow it: forgetting the inertial load of fast moves (a cobot at $10\,\mathrm{m/s^2}$ doubles the effective weight), and forgetting what happens on an emergency stop, when the arm decelerates far harder than in normal motion and an underdesigned grasp releases the part exactly when people may be nearby ([[robot-arm-design/arm-safety]]).
:::

## Vacuum grippers {#sec-vacuum}

A cup sealed on a surface with an internal absolute pressure $p_i$ below the ambient pressure $p_a$ is pressed onto the surface by the pressure difference $\Delta p = p_a - p_i$ acting over the effective area $A$ inside the seal.

::: proposition Holding force of a suction cup {#prop-vacuum}
The theoretical holding force normal to the surface is $F_{\mathrm{th}} = \Delta p\,A$. For a part of mass $m$ lifted by $k$ cups with acceleration $\mathbf a$, writing $\mathbf g' = \mathbf g - \mathbf a$ as in [[#prop-grip]] and splitting it into a component $g'_n$ along the cup axis (pulling the part off) and $g'_t$ parallel to the surface (making it slide), the cups hold with safety factor $S$ if
$$
k\,\Delta p\,A\ \ge\ S\,m\left(g'_n + \frac{g'_t}{\mu}\right),
$$ {#eq-vacuum}
where $\mu$ is the friction coefficient between cup lip and part.
:::

::: proof
The atmosphere pushes on the part's outer face over the sealed area with $p_aA$ and the evacuated cup pushes on the inner face with $p_iA$; the net force towards the cup is $\Delta p\,A$ per cup. In the accelerating frame the part also carries $m\mathbf g'$. The component $mg'_n$ along the axis must be balanced directly: the remaining contact (normal) force between lips and part is $N = k\Delta pA - mg'_n$, which must be positive. The tangential component $mg'_t$ is carried by friction at the lips, at most $\mu N$. Requiring $\mu(k\Delta pA - mg'_n) \ge mg'_t$ gives $k\Delta pA \ge m(g'_n + g'_t/\mu)$, and the margin $S$ is applied to the load side.
:::

The friction term is why vacuum handling of parts held on a *vertical* face, or of parts moved fast sideways, needs much more vacuum force than lifting alone: with $\mu = 0.5$ a sideways load counts double. Supplier handbooks tabulate the same three load cases (horizontal surface lifted vertically, horizontal surface moved sideways, vertical surface) and recommend safety factors of at least 1.5 for smooth, dense parts and 2 or more for porous, rough, oily or flexible ones.

::: example Vacuum gripper for steel sheet {#ex-vacuum}
A $600\times400\times1.5\,\mathrm{mm}$ steel sheet ($\rho = 7850\,\mathrm{kg/m^3}$) is lifted from a stack by four flat cups of $40\,\mathrm{mm}$ effective diameter, with $\Delta p = 60\,\mathrm{kPa}$ (a vacuum of 60 kPa below atmospheric). The arm accelerates it at up to $5\,\mathrm{m/s^2}$ vertically and $5\,\mathrm{m/s^2}$ horizontally at the same time; the lip friction on slightly oiled sheet is taken as $\mu = 0.5$. Check the grip with $S = 2$.
::: solution
Mass: $m = 7850\times0.6\times0.4\times0.0015 = 2.83\,\mathrm{kg}$. With $z$ up and the sheet horizontal, $g'_n = g + a_v = 14.81\,\mathrm{m/s^2}$ and $g'_t = 5\,\mathrm{m/s^2}$. Required: $S\,m(g'_n + g'_t/\mu) = 2\times2.83\times(14.81 + 10.0) = 140\,\mathrm N$.

Available: $A = \pi(0.020)^2 = 1.257\times10^{-3}\,\mathrm{m^2}$, so $\Delta pA = 60\times10^3\times1.257\times10^{-3} = 75.4\,\mathrm N$ per cup and $302\,\mathrm N$ for four. The ratio $302/140 = 2.15$ is on top of the safety factor of 2, so the design has ample margin — which is appropriate, because the lips of flat cups on oily sheet and the sag of a thin sheet between cups both reduce the real force.

Sanity check: the static load is only $27.7\,\mathrm N$; the dynamic load and safety factor multiply it by five. Two further checks a designer would make: that the sheet does not peel off at the edges when it sags between cups (cup spacing), and that the vacuum is monitored by a switch, so that the arm does not start moving before vacuum is established, and stops safely if it is lost.
:::
:::

::: warning Gauge vacuum, absolute pressure and altitude
Vacuum is quoted in several ways: as a pressure below atmospheric ("60 kPa vacuum", "−0.6 bar" gauge), as a percentage of a full vacuum ("60 % vacuum"), or as an absolute pressure ("41 kPa absolute"). The force formula needs the *difference* $\Delta p$. Because $\Delta p$ can never exceed the ambient pressure, a gripper that works at sea level ($101.3\,\mathrm{kPa}$) loses capacity at altitude: at 1500 m the standard atmosphere gives about $84.6\,\mathrm{kPa}$, so an ejector that reaches 85 % vacuum delivers only $\Delta p \approx 72\,\mathrm{kPa}$ instead of $86\,\mathrm{kPa}$.
:::

The choice of cup matters as much as the vacuum level. **Flat cups** are stiff in shear and position the part precisely; **bellows cups** (1.5 or 2.5 folds) compensate height differences and tilt and lift the part slightly as they evacuate, at the cost of lateral stiffness — a part held on bellows swings at fast moves. Materials range from nitrile (oily parts) to silicone (food, high temperature, but it may leave residues that spoil painting) and polyurethane (wear-resistant). Porous parts such as cardboard leak continuously, so the vacuum generator is sized for the leakage flow, and the achieved $\Delta p$ is measured on the real material.

## Tool changers and the mechanical interface {#sec-changers}

The robot flange follows ISO 9409-1, which fixes the pitch circle, bolt pattern and centring features (a flange designated, for example, ISO 9409-1-50-4-M6 has a 50 mm pitch circle with four M6 holes). An end effector is bolted to it directly or through a **tool changer**: a master plate on the robot and a tool plate on each tool, locked by a pneumatically or electrically driven mechanism (balls, cams or a piston) that is designed to stay locked if the air or power fails. The changer passes compressed air, vacuum, electrical signals, power and sometimes Ethernet through modules on its faces, and identifies the tool so that the controller loads the right TCP and payload. Tool stands hold the idle tools in known positions, with sensors to confirm that a tool is present before the robot docks.

A changer adds mass (typically a few hundred grams to several kilograms) and length, and every millimetre of length moves the payload's centre of mass away from the flange. The arm's payload rating is given with a centre-of-mass offset and inertia limit, so the budget is written as a **moment**: an arm rated at $10\,\mathrm{kg}$ with the centre of mass $100\,\mathrm{mm}$ from the flange can carry the moment $10\times9.81\times0.1 = 9.8\,\mathrm{N\,m}$ at its wrist, and a tool stack of changer, force sensor and gripper whose centre of mass is $180\,\mathrm{mm}$ out leaves roughly $9.8/(9.81\times0.18) = 5.6\,\mathrm{kg}$ of total mass — before the part. The manufacturer's payload diagram, not this estimate, decides.

## Wrist force–torque sensors {#sec-ft}

A six-axis **force–torque (F/T) sensor** between the flange and the tool measures the three force and three moment components transmitted through it. Most use strain gauges (foil or silicon) on a machined flexure, with a calibration matrix that maps the six or more bridge signals to the wrench ([[mechatronics/sensors]]); capacitive and optical designs also exist. Typical industrial sensors for arms in the 5–20 kg class have force ranges of a few hundred newtons and resolutions of a few hundredths to a few tenths of a newton (manufacturers' data, as of 2026). Arms with torque sensors in every joint can estimate the tool wrench without a wrist sensor, through the Jacobian transpose ([[robotics/jacobians]]), but less accurately, because joint friction and model errors enter the estimate.

The sensor measures *everything* below it: the tool's weight, its inertia during motion, cable forces, and a slowly drifting offset. Before it can measure contact forces of a few newtons, the tool's weight and the offset must be removed. In the sensor frame the tool's weight is $m R^{\mathsf T}\mathbf g$, where $R$ is the sensor's orientation in the base frame, and it acts at the tool's centre of mass $\mathbf c$, so the reading of an untouched tool is
$$
\mathbf F_{\mathrm{meas}} = \mathbf F_0 + mR^{\mathsf T}\mathbf g,\qquad \mathbf M_{\mathrm{meas}} = \mathbf M_0 + \mathbf c\times(mR^{\mathsf T}\mathbf g),
$$ {#eq-ft-gravity}
with offsets $\mathbf F_0$, $\mathbf M_0$. Recording readings at several orientations gives linear equations for $\mathbf F_0$, $m$, $\mathbf M_0$ and $m\mathbf c$.

::: example Identifying a tool's mass and centre of mass {#ex-ft}
A wrist sensor's $z$ axis points from the flange towards the tool. With the tool hanging straight down the sensor reads $F_z = 14.32\,\mathrm N$; with the tool pointing straight up, $F_z = -9.22\,\mathrm N$. With the tool horizontal (sensor $x$ axis pointing down) it reads $M_y = 0.94\,\mathrm{N\,m}$ (after removing the moment offset). Find the tool's mass, the force offset and the distance of its centre of mass along $z$. What contact-force error results if the gravity compensation is omitted when the tool is tilted by $30^\circ$ from vertical?
::: solution
Pointing down, gravity acts along $+z$ of the sensor: $F_z = F_{0z} + mg$; pointing up, along $-z$: $F_z = F_{0z} - mg$. Subtracting, $2mg = 14.32 + 9.22 = 23.54\,\mathrm N$, so $mg = 11.77\,\mathrm N$ and $m = 1.20\,\mathrm{kg}$; adding, $F_{0z} = (14.32 - 9.22)/2 = 2.55\,\mathrm N$. Horizontal with $x$ down, the weight is $(mg, 0, 0)$ in the sensor frame, and with $\mathbf c = (0, 0, c_z)$, $\mathbf c\times\mathbf F = (0,\ c_z\,mg,\ 0)$, so $c_z = 0.94/11.77 = 0.080\,\mathrm m = 80\,\mathrm{mm}$.

Tilted by $30^\circ$, the uncompensated weight shows up as $mg\cos30^\circ = 10.2\,\mathrm N$ along $z$ and $mg\sin30^\circ = 5.9\,\mathrm N$ sideways, plus $c_z mg\sin30^\circ = 0.47\,\mathrm{N\,m}$ of moment — so a force controller trying to press with $5\,\mathrm N$ would instead see a phantom force of the same size and drive the tool away from, or into, the surface. With compensation by [[#eq-ft-gravity]] the residual error is set by the accuracy of $m$, $\mathbf c$ and the offset drift, typically a few tenths of a newton.

Sanity check: $1.2\,\mathrm{kg}$ at $80\,\mathrm{mm}$ is a plausible small gripper; in practice six or more orientations are used and the parameters fitted by least squares, as in [[robot-arm-design/calibration]].
:::
:::

## Compliance in assembly {#sec-compliance}

Inserting a peg into a hole with a clearance of a few hundredths of a millimetre is beyond the accuracy of any arm. Assembly succeeds because the parts are allowed to **comply**: chamfers guide the peg as long as the lateral error is smaller than the chamfer, and a compliant wrist lets the peg move sideways and tilt in response to the contact forces. Two failure modes limit this: **wedging**, where the peg tilts and contacts the hole at two points, and **jamming**, where the applied force points inside the friction cones of the two contacts, so that pushing harder does not help (both analysed by Whitney in the 1980s).

**Passive compliance.** The **remote centre compliance** (RCC), developed at the Charles Stark Draper Laboratory in the late 1970s, is a wrist made of elastomer shear pads or spring elements arranged so that its *centre of compliance* — the point at which a lateral force produces pure translation and a moment produces pure rotation — lies outside the device, near the tip of the peg. A lateral contact force on the chamfer then moves the peg sideways without tilting it, and a moment from two-point contact rotates it about its tip back into line. RCCs are characterised by lateral stiffness $K_x$ (typically tens of newtons per millimetre) and rotational stiffness $K_\theta$; the lateral force needed to correct an error $e$ is $K_xe$, which must stay well below the force that would damage the parts or make the chamfer contact stick. Passive compliance is fast and needs no control, but it is tuned for one geometry and makes the tool sway during free motion; many RCCs have a pneumatic lock for transport.

**Active compliance.** With a wrist F/T sensor (or joint torque sensing), the controller can make the arm behave as a programmable spring–damper — **impedance** or **admittance control** — or regulate force in some directions and position in others — **hybrid control** ([[robotics/robot-control]]). A typical insertion strategy: approach with low stiffness laterally and a set downward force; on contact, search in a spiral or tilt pattern until the force drops (the peg has found the hole); insert under force control; detect completion by the force rising at the bottom. Active compliance adapts to any geometry and reports what happened, but its bandwidth is limited by the control loop, so it is slower than a well-designed passive device, and the stiffness that can be rendered stably is limited by the loop delays of [[robot-arm-design/software-stack]].

**Built-in compliance.** Collaborative arms with joint torque sensing and quasi-direct drives ([[robot-arm-design/gear-reducers]]) are compliant by construction, and soft grippers and bellows cups add compliance at the contact. Every form of compliance trades precision of position for tolerance of error; the design question is where in the chain to put it.

## Finger design {#sec-fingers}

Most grippers are bought; their fingers are designed for each part. The checklist that experienced designers work through:

- **Shape for form fit.** Pockets, V-grooves or ledges that match the part carry load by geometry and centre the part in the hand. A cylinder held between a flat jaw and a V-groove is self-centring and gains friction (see the exercises). Leave clearance for the part's tolerance band and for the positioning error of the pick.
- **Pads.** Replaceable polyurethane or rubber pads increase friction and protect the part; their hardness (commonly Shore A 60–90) trades friction and conformity against wear and positioning accuracy. Hard fingers are used where the part position in the hand must be exact.
- **Length and mass.** Long fingers reach into fixtures but reduce the allowed grip force (the gripper's jaw guides carry a moment equal to force times finger length) and add inertia to the jaw drive. Keep fingers as short as access allows and check them against the gripper's moment ratings.
- **Stiffness and material.** Fingers are machined aluminium or steel, or 3D-printed polymers (nylon PA12 and similar) for fast iteration — a printed finger is cheap enough to redesign every week of commissioning but must be checked for deflection under the grip force and for creep.
- **Picking from surfaces.** Thin fingertips, or a fingernail-like edge, allow picking flat parts from a table; tapered tips allow entry between closely packed parts.
- **Sensing and safety.** Jaw-position feedback checks that a part is present and of the right size; fingers should not create new pinch points or sharp edges that the safety assessment has to deal with ([[robot-arm-design/arm-safety]]).

::: algorithm Selecting an end effector {#alg-select}
1. **Characterise the parts**: mass, size range, material, surface (porous, oily, delicate), tolerances, how they are presented (fixture, conveyor, bin), and what must happen to them after the grasp (placement accuracy, insertion, orientation).
2. **Choose the principle**: rigid parallel jaws for parts with opposed faces; vacuum for flat or top-accessible parts; magnetic for steel sheet and blanks; adaptive or soft fingers for varied or delicate items; combinations (vacuum plus fingers) for mixed tasks.
3. **Size the grip**: grip or vacuum force with accelerations and a safety factor ([[#eq-grip]], [[#eq-vacuum]]), including emergency-stop decelerations; design fingers for form fit wherever possible.
4. **Check the arm**: total tool mass, centre of mass and inertia against the payload diagram; stroke and cycle time of the gripper within the cycle budget.
5. **Add sensing and compliance** as the task needs: jaw position or vacuum switch for part presence; F/T sensor or passive compliance for contact tasks; tool changer if several tools share one arm.
6. **Assess safety and failure modes**: behaviour on loss of air or power (does the part stay?), pinch points, sharp edges; feed these into the risk assessment.
7. **Prototype and test** with real parts at production speed, measuring slip and drop rates over thousands of cycles.
:::

::: quiz
A logistics cell must pick sealed cardboard cartons of 0.5–12 kg from a pallet. Which end effector is usually chosen, and what is its main sizing issue?
- [ ] A two-finger parallel gripper, sized for the largest carton width.
- [x] A vacuum gripper with foam pads or several cups and an electric blower or high-flow generator, sized for the leakage flow through the cardboard and for the heaviest carton with dynamic loads.
- [ ] An electromagnetic gripper, sized for the weight of the heaviest carton.
- [ ] A granular-jamming soft gripper, sized for the carton edges.
::: solution
Cartons on a pallet are accessible only from the top and vary in size, so vacuum is the natural choice. Cardboard is porous and printed films and tapes make the seal imperfect, so the generator must supply enough flow to hold the needed $\Delta p$ despite leakage — measured on real cartons — and the force must cover the heaviest carton with accelerations and safety factor, by [[#eq-vacuum]]. Heavy cartons are often supported additionally by a fork or clamp (form fit) for fast moves. Magnets do not hold cardboard; a jamming gripper is too weak and slow for 12 kg; a parallel gripper needs access to two sides, which a tightly packed pallet does not give.
:::
:::

::: history
The first industrial robot, the Unimate installed at a General Motors plant in 1961, unloaded die castings with a simple two-jaw gripper, and grippers stayed simple, task-specific devices for decades. Research hands followed: the Stanford/JPL hand of Kenneth Salisbury (1982), with three fingers of three joints each, came with his analysis of contact types and grasp mobility, and the Utah/MIT hand (1980s) explored tendon-driven dexterity. The remote centre compliance came out of the Draper Laboratory's work on robotic assembly in the late 1970s, led by Daniel Whitney, which also produced the theory of wedging and jamming. Ferrari and Canny's grasp-quality metric (1992) became a standard tool of grasp planning. Soft grippers emerged in the 2000s and 2010s: the granular-jamming gripper of Brown and colleagues was published in 2010, and the elastomer PneuNet actuators of Whitesides's group around 2011. The flange interface is standardised in ISO 9409-1 (current edition 2004).
:::

::: summary
- Families: parallel-jaw (pneumatic: strong, two-position; electric: controlled force and position), adaptive underactuated fingers, vacuum (ejector or pump/blower; flat or bellows cups), magnetic (prefer switchable or electro-permanent), soft (Fin Ray, PneuNet, jamming, adhesion).
- Prefer form fit to friction: shaped fingers carry load by geometry and cut the needed grip force several-fold.
- Coulomb contacts transmit forces inside a cone of half-angle $\arctan\mu$. Form closure needs at least 4 (planar) or 7 (spatial) frictionless contacts; two-finger force closure requires the contact segment inside both friction cones ([[#prop-antipodal]]). The Ferrari–Canny $\varepsilon$-metric ranks grasps.
- Grip force: $n\mu F \ge S\,m\lVert\mathbf g - \mathbf a\rVert$, $S \ge 2$; include fast moves and emergency stops; rated squeeze force is not holding force.
- Vacuum: $k\Delta pA \ge S\,m(g'_n + g'_t/\mu)$; $\Delta p$ is the difference from ambient and falls with altitude; size porous applications for leakage flow.
- ISO 9409-1 flange; tool changers lock fail-safe and pass utilities; budget the tool stack as a moment about the flange.
- Wrist F/T sensors need gravity and offset compensation, $\mathbf F = \mathbf F_0 + mR^{\mathsf T}\mathbf g$, $\mathbf M = \mathbf M_0 + \mathbf c\times mR^{\mathsf T}\mathbf g$.
- Compliance: passive RCC places the centre of compliance near the peg tip; active impedance/admittance/hybrid control adapts to any geometry but is slower; chamfers and clearances do the rest.
:::

## Exercises

::: exercise Suction cup force {level=1 check="197.9"}
A flat suction cup has an effective diameter of $60\,\mathrm{mm}$ and operates at $70\,\mathrm{kPa}$ below atmospheric pressure. What is its theoretical holding force? (Enter the force in N, to four significant figures.)
::: solution
$F = \Delta pA = 70\times10^3\times\pi(0.030)^2 = 70\times10^3\times2.827\times10^{-3} = 197.9\,\mathrm N$.
:::
:::

::: exercise Friction-cone angle {level=1 check="26.57"}
What is the half-angle of the friction cone for a pad with $\mu = 0.5$? (Enter the angle in degrees, to four significant figures.)
::: solution
$\arctan0.5 = 26.57^\circ$. By [[#prop-antipodal]], a two-finger grasp on faces tapering at less than this half-angle holds by friction.
:::
:::

::: exercise Pneumatic gripper force {level=1 check="245.4"}
A pneumatic gripper has a piston of $25\,\mathrm{mm}$ bore supplied at $500\,\mathrm{kPa}$ gauge. Neglecting friction and the mechanism ratio, what force does the piston produce? (Enter the force in N, to four significant figures.)
::: solution
$F = pA = 500\times10^3\times\pi(0.0125)^2 = 245.4\,\mathrm N$. Gauge pressure is correct here, because atmospheric pressure acts on the other side of the piston. The jaw force follows from the mechanism's ratio and efficiency, given on the data sheet.
:::
:::

::: exercise Grip force for a small part {level=2 check="27.62"}
A $0.8\,\mathrm{kg}$ part is held by two fingers with $\mu = 0.4$ and lifted with an upward acceleration of $4\,\mathrm{m/s^2}$. With a safety factor of 2, what normal force must each finger apply? (Enter the force in N, to four significant figures.)
::: solution
By [[#eq-grip]], $F = S\,m(g + a)/(n\mu) = 2\times0.8\times13.81/(2\times0.4) = 27.62\,\mathrm N$.
:::
:::

::: exercise Vacuum at altitude {level=2 check="71.9"}
A vacuum ejector reaches 85 % vacuum (its internal absolute pressure is 15 % of ambient). The plant is at an altitude where the ambient pressure is $84.6\,\mathrm{kPa}$. What pressure difference does the ejector achieve? (Enter $\Delta p$ in kPa, to three significant figures.)
::: solution
$\Delta p = 0.85\times84.6 = 71.9\,\mathrm{kPa}$, against $0.85\times101.3 = 86.1\,\mathrm{kPa}$ at sea level: a 16 % loss of holding force for the same gripper.
:::
:::

::: exercise A tool's mass from two readings {level=2 check="1.223"}
A wrist F/T sensor reads $F_z = 20.0\,\mathrm N$ with the tool hanging down and $F_z = -4.0\,\mathrm N$ with it pointing up. Find the tool's mass and the sensor's $z$ offset. (Enter the mass in kg, to four significant figures; take $g = 9.81\,\mathrm{m/s^2}$.)
::: solution
As in [[#ex-ft]], $2mg = 20.0 + 4.0 = 24.0\,\mathrm N$, so $mg = 12.0\,\mathrm N$ and $m = 12.0/9.81 = 1.223\,\mathrm{kg}$; the offset is $(20.0 - 4.0)/2 = 8.0\,\mathrm N$ — large, suggesting the sensor should be re-biased, or a cable is pulling on the tool.
:::
:::

::: exercise A V-groove finger {level=2}
A cylinder is held between a flat jaw and a jaw with a symmetric V-groove whose two flanks have inward normals at $\pm\gamma$ to the closing direction. The jaw force is $F$ and the friction coefficient $\mu$ at all contacts. Find the maximum force along the cylinder's axis that friction can resist, and compare a $90^\circ$ V-groove ($\gamma = 45^\circ$) with two flat jaws.
::: solution
The flat jaw presses with $F$. At the V, two flank forces $N$ balance it: $2N\cos\gamma = F$, so $N = F/(2\cos\gamma)$. Friction along the axis is limited by the sum of all normal forces: $\mu(F + 2N) = \mu F(1 + 1/\cos\gamma)$. For two flat jaws, $2\mu F$. With $\gamma = 45^\circ$: $\mu F(1 + 1.414) = 2.41\,\mu F$, a 21 % gain, and the groove also centres the cylinder and resists sideways slip by form. Deeper grooves ($\gamma \to 90^\circ$) increase the factor without limit in theory, but the flanks then wedge the part and require a large opening force — a practical limit is $\gamma$ of about $60^\circ$ (a $60^\circ$ included angle).
:::
:::

::: exercise RCC correction force {level=2 check="24"}
A remote centre compliance has lateral stiffness $30\,\mathrm{N/mm}$. A peg arrives at a chamfered hole with a lateral error of $0.8\,\mathrm{mm}$. What lateral force does the RCC exert on the peg once it has been pushed into line? (Enter the force in N.)
::: solution
$F = K_xe = 30\times0.8 = 24\,\mathrm N$. On a $45^\circ$ chamfer this lateral force must come from the insertion force, roughly equal to it plus friction, so the arm pushes with somewhat more than $24\,\mathrm N$ while sliding down the chamfer; a softer RCC reduces both, at the price of more sway in free motion.
:::
:::

::: exercise Force closure of a two-finger grasp {level=3}
A square block of side $40\,\mathrm{mm}$ is grasped in the plane at two points: one at the middle of the left face, the other on the right face $10\,\mathrm{mm}$ above its middle. With $\mu = 0.3$, is the grasp in force closure? What is the smallest $\mu$ for which it is?
::: solution
The segment joining the contacts runs from $(0, 20)$ to $(40, 30)$ (mm), at an angle $\arctan(10/40) = 14.0^\circ$ to the horizontal. Both inward normals are horizontal (pointing $+x$ on the left face, $-x$ on the right), so the segment makes $14.0^\circ$ with each normal. Since $\arctan0.3 = 16.7^\circ > 14.0^\circ$, the segment lies inside both cones and the grasp is in force closure by [[#prop-antipodal]]. The limiting coefficient is $\tan14.0^\circ = 0.25$: below it, the block rotates out of the grasp under the squeeze itself. The margin ($16.7^\circ$ against $14.0^\circ$) is small: a slightly oily surface would lose the grasp, so a grasp planner would prefer contacts directly opposite each other ($0^\circ$), which maximise the margin.
:::
:::

::: exercise Design: a gripper for mixed machined parts {level=3}
A machine-tending cell loads a lathe with three families of steel parts: shafts of $20$–$40\,\mathrm{mm}$ diameter and up to $2.5\,\mathrm{kg}$, flanges of $80$–$120\,\mathrm{mm}$ diameter and up to $3\,\mathrm{kg}$, and small bushings of $15\,\mathrm{mm}$ diameter. The arm (rated $10\,\mathrm{kg}$) moves at up to $8\,\mathrm{m/s^2}$. The parts are lightly oiled. Propose an end effector: principle, fingers, grip force, sensing, and how the cell copes with a power or air failure. State your assumptions.
::: solution
One reasonable design. *Principle*: a double gripper (two parallel grippers at $90^\circ$ on one flange), so the arm can unload the finished part and load the raw part in one visit — the standard for machine tending. Electric grippers allow force and stroke per part family and report jaw position (part present, right size); pneumatic grippers are an alternative if compressed air is available and the families can share one stroke. *Fingers*: stepped V-grooves (for shafts and bushings) on the inner surfaces and outward-facing steps for gripping flanges by their bore or outer edge, designed so that each part sits against a shoulder (form fit along the axis). *Grip force*: assume $\mu = 0.15$ for oiled steel on hardened fingers. For the $3\,\mathrm{kg}$ flange held by friction in the worst orientation, with $\lVert\mathbf g'\rVert \le g + 8 = 17.8\,\mathrm{m/s^2}$ and $S = 2$, [[#eq-grip]] gives $F \ge 2\times3\times17.8/(2\times0.15) = 356\,\mathrm N$ per finger — too much for most compact electric grippers, which is why the shoulders (form fit) are needed: with the axial load carried by form, friction carries only the lateral components. The V-grooves add the factor of the previous exercise for shafts. *Payload*: two grippers ($2\times1.5\,\mathrm{kg}$), adapter ($0.5\,\mathrm{kg}$) and a $3\,\mathrm{kg}$ part make $6.5\,\mathrm{kg}$; check the centre of mass and inertia against the arm's payload diagram. *Sensing*: jaw position per gripper, a part-present check before closing the lathe chuck, and an air-blast nozzle to clear chips from the fingers. *Failure*: self-locking drives (or spring-assisted pneumatic grippers with check valves) keep the grip on power or air loss; the arm's brakes hold its position; the risk assessment covers a part released during an emergency stop — the worst case for grip, since the stop deceleration may exceed $8\,\mathrm{m/s^2}$.
:::
:::

## Further reading

The grasping and end-effector chapters of the *Springer Handbook of Robotics* cover contact models, closure and grasp quality with full references; Lynch and Park treat form and force closure in their chapter on grasping and manipulation; Mason's *Mechanics of Robotic Manipulation* (2001) gives a careful treatment of friction and closure. Monkman, Hesse, Steinmann and Schunk's *Robot Grippers* (2007) is a practical survey of gripper principles and design. Vacuum and gripper manufacturers publish sizing handbooks with the load cases used above; they are worth reading, with the caution that their numbers are for their products.
