A robot arm starts as a sentence from a customer: "pick 4 kg castings from a conveyor and place them in a fixture 700 mm away, every 6 seconds, to within a tenth of a millimetre". Before anyone chooses a motor, that sentence has to become a specification — how many joints, in what arrangement, with what reach, payload, speed and repeatability — and the specification has to become a requirement for every joint: the peak and continuous torque it must deliver, the speed it must reach, and the angular error it may contribute at the tool. This chapter does both. It surveys the kinematic layouts in use and what each is good for, defines reach, payload, speed, repeatability and accuracy the way data sheets and ISO 9283 do, and then sizes the joints of a realistic six-axis arm (5 kg payload, 850 mm reach) by a static gravity budget, a dynamic torque budget, a thermal (rms) check and a tip-error budget. The kinematics behind the layouts is in [[robotics/forward-kinematics]] and [[robotics/inverse-kinematics]], the relation between joint torques and tip forces in [[robotics/jacobians]], and the equations of motion in [[robotics/manipulator-dynamics]]; this chapter uses them as tools.

## From a task to a specification {#sec-task}

A good specification lists the quantities that drive the design and the conditions under which each holds. The ones that matter most for the mechanical design are:

- **Payload**: the mass the arm carries at its flange, *including* the gripper or tool, and where its centre of mass sits relative to the flange.
- **Reach and workspace**: the region the tool centre point (TCP) must reach, and with which orientations.
- **Speed and cycle time**: joint speeds, TCP speed and the time for a reference move.
- **Repeatability and accuracy**: how closely the arm returns to a taught pose, and how closely it reaches a pose computed from a model.
- **Environment and duty**: duty cycle, ambient temperature, cleanliness or washdown, and whether the arm works beside people (which caps speeds and forces, see [[robot-arm-design/arm-safety]]).

The first four interact. Doubling the reach at the same payload roughly doubles the gravity torque at the shoulder *and* doubles the tip error produced by a given angular error at that joint; a faster cycle raises the acceleration torques and the heat in every motor. The specification is therefore a set of trade-offs, and the purpose of the calculations below is to price each one before it is fixed.

## Degrees of freedom and kinematic layouts {#sec-layouts}

::: definition Degrees of freedom of an arm {#def-dof}
The **degrees of freedom** (DoF) of a serial arm are the number of independently driven joints, normally equal to the number of motors. A rigid body in space has six DoF (three of position, three of orientation), so an arm needs **six** joints to place its tool at an arbitrary position *and* orientation within its workspace. An arm with fewer than six joints can only reach a subset of poses; one with more than six is **redundant**: a given tool pose can be reached by a continuum of joint configurations (the self-motion, or null space, of [[robotics/jacobians]]).
:::

Fewer joints are not simply worse: every joint removed is a motor, gearbox, encoder, brake and cable loop removed, and the remaining joints are stiffer and cheaper. The art is to give the task exactly the freedoms it needs.

| layout | DoF | freedoms of the tool | typical use | notes |
|---|---|---|---|---|
| SCARA | 4 | $x$, $y$, $z$, rotation about vertical | assembly, pick-and-place on a table | two parallel vertical revolute axes, a vertical screw–spline; gravity carried by bearings, so very fast |
| articulated palletiser | 4 (sometimes 5) | $x$, $y$, $z$, rotation about vertical | stacking boxes and bags | a parallelogram keeps the flange horizontal, so no wrist pitch joint is needed |
| 5-axis articulated | 5 | position + two rotations | welding with axisymmetric torches, dispensing, simple machine tending | the tool's roll about its own axis is not controlled — fine if the tool is symmetric |
| 6-axis articulated, spherical wrist | 6 | full pose | general industrial work | three wrist axes intersect at one point: closed-form inverse kinematics (Pieper) |
| 6-axis with offset wrist | 6 | full pose | many collaborative arms | parallel shoulder, elbow and wrist-1 axes; still solvable in closed form, avoids a wrist singularity in the middle of the workspace but has others |
| 7-axis | 7 | full pose + one self-motion | collaborative and research arms, reaching around obstacles | the elbow can swing at fixed tool pose; avoids singularities and joint limits but adds cost and a harder inverse kinematics |

The **articulated 6-axis arm** with a spherical wrist is the reference design. Joint 1 (the base, or waist) turns about a vertical axis; joints 2 (shoulder) and 3 (elbow) are parallel horizontal axes that place the wrist centre; joints 4, 5 and 6 (wrist roll, pitch, roll) orient the tool. The decoupling makes the arm easy to reason about: the first three joints carry the load over a long lever and need large torques; the wrist joints carry a short lever and need high speeds and small torques. That split is the first fact of joint sizing.

The **SCARA** (Selective Compliance Assembly Robot Arm) puts its two big revolute axes vertical. Gravity then acts along the axes and is carried by the bearings, not the motors, so the joint torques are purely inertial; the arm is stiff vertically and compliant horizontally — useful for pushing pegs into holes — and cycle times well under a second for short moves are routine. Its workspace is an annulus in a horizontal plane times the stroke of the vertical axis, and it cannot tilt the tool.

**Seven-axis** arms are the norm in research and common in collaborative products because the redundant joint lets the elbow move away from people, fixtures and joint limits while the tool holds still, and because with seven joints a singular configuration in the middle of a task can usually be avoided. The price is one more actuator in the heaviest part of the chain and a redundancy-resolution problem in the controller.

::: quiz
A dispensing robot draws a bead of adhesive along a 3D seam with a round nozzle. The nozzle must stay normal to the surface, but its rotation about its own axis does not matter. What is the smallest number of joints that can do this anywhere in the workspace?
- [ ] 3
- [ ] 4
- [x] 5
- [ ] 6
::: solution
The task needs three position coordinates plus the direction of the nozzle axis — two angles — which is five independent quantities. Rotation about the nozzle's own axis is free because the nozzle is axisymmetric. A five-axis arm suffices. Four joints (a SCARA) can only keep the nozzle vertical, which works only if every surface is horizontal.
:::
:::

## Workspace and reach {#sec-workspace}

::: definition Reach and workspace {#def-reach}
The **reachable workspace** is the set of TCP positions the arm can attain with at least one orientation; the **dexterous workspace** is the subset in which every orientation is attainable. The **reach** quoted on a data sheet is the maximum horizontal distance from the base axis (joint 1) to a reference point at the wrist — usually the wrist centre or the flange; the data sheet states which — with the arm fully stretched.
:::

Three practical points follow from the definition.

1. **Check which point the reach refers to.** A tool adds its own length. A gripper 150 mm long on an arm whose 850 mm reach is measured to the flange gives up to 1000 mm to the fingertips — but only when pointing outwards; pointing downwards it adds nothing to the horizontal reach and subtracts from the height.
2. **Do not plan to work at full reach.** At full stretch the shoulder and elbow are collinear, a singular configuration ([[robotics/jacobians]]): the arm cannot move the TCP radially, the joint speeds needed for a given TCP speed grow without bound, and the gravity torques are at their maximum. A useful rule is to keep the working area within about 80–90 % of the reach.
3. **The dexterous workspace is much smaller than the reachable one.** Near the boundary, and close to the base, the tool can only take a few orientations. A task that needs the tool tilted ±45° in every direction must fit inside the dexterous region, which the arm vendor's simulation or a quick inverse-kinematics sweep reveals.

For an articulated arm with upper arm $a_2$ and forearm $a_3$ (shoulder to elbow and elbow to wrist centre), the wrist centre reaches a shell between radii $\lvert a_2 - a_3\rvert$ and $a_2 + a_3$ about the shoulder, cut by the joint limits and by the arm's own base. Nearly equal $a_2$ and $a_3$ let the wrist come close to the shoulder; a short forearm gives a large hole in the middle of the workspace.

## Payload, speed and cycle time {#sec-payload-speed}

The rated **payload** is the largest mass the arm can carry at full speed and acceleration *with its centre of mass at a stated position* relative to the flange. Data sheets add a **payload diagram**: the allowed mass as a function of the distance of its centre of mass from the flange (along the tool axis and sideways), and the allowed moments of inertia about the wrist axes. The limits come from the wrist joints: joint 5 sees the payload weight times its offset from the joint-5 axis, and joints 4 and 6 see the inertia of the payload about their axes. A 5 kg arm may carry its full 5 kg only within about 50–100 mm of the flange, and much less on a long tool.

Speed is specified in two ways. **Joint speeds**, in degrees per second, are set by the motor's maximum speed divided by the gear ratio; typical values for small industrial arms (as of 2026) are 180–360 °/s for the base axes and 400–1000 °/s for the wrist. **TCP speed** follows from the joint speeds and the Jacobian; at radius $r$ from an axis turning at $\dot q$ it is $r\dot q$. Collaborative arms are usually slower by design and are limited to a TCP speed agreed in the risk assessment when people are present (often a few hundred millimetres per second up to about 1 m/s).

Neither number says how long a real move takes, because short moves never reach top speed: they are dominated by acceleration and settling time. That is why many vendors quote a **cycle time** for a reference pick-and-place path, for example the commonly used 25 mm up – 300 mm across – 25 mm down and back. For sizing, the useful quantities are the joint accelerations, which turn directly into torques.

## Repeatability and accuracy {#sec-repeatability}

The two words are often used interchangeably in conversation and never on a data sheet.

::: definition Pose repeatability and accuracy (ISO 9283) {#def-repeatability}
Command the arm $n$ times (ISO 9283 uses $n = 30$) to the same pose, approaching it in the same way, and measure the attained positions $\mathbf x_j$. Let $\bar{\mathbf x}$ be their mean (the barycentre) and $l_j = \lVert \mathbf x_j - \bar{\mathbf x}\rVert$ the distance of each from it, with mean $\bar l$ and standard deviation $S_l$. The **position repeatability** is
$$
RP = \bar l + 3S_l .
$$ {#eq-rp}
The **position accuracy** is the distance from the commanded position $\mathbf x_c$ to the barycentre, $AP = \lVert \bar{\mathbf x} - \mathbf x_c\rVert$. Data sheets usually quote $RP$ as "±0.03 mm", the radius of a sphere containing nearly all attained positions.
:::

Repeatability measures *scatter*; accuracy measures *bias*. They have different causes and different cures:

- Repeatability is limited by what is not the same from one visit to the next: encoder resolution and noise, the part of gear backlash and friction that is not repeated, servo settling, thermal drift during the test. It matters whenever positions are **taught** by jogging the arm there, since the arm then has only to come back.
- Accuracy is limited by everything that makes the model differ from the real arm: link lengths and joint offsets off nominal, deflection of links and gearboxes under the payload, thermal expansion. These are largely repeatable, so they do not spoil repeatability. Accuracy matters whenever positions are **computed** — from CAD data, from a camera, or by an offline program — and it is improved by calibration ([[robot-arm-design/calibration]]).

As a guide (typical ranges, as of 2026): small six-axis industrial arms have repeatabilities of about ±0.01–0.03 mm, collaborative arms ±0.02–0.1 mm, and large arms carrying 100 kg or more ±0.05–0.1 mm. Absolute accuracy is rarely published; an uncalibrated arm is typically off by a few tenths of a millimetre to a few millimetres, and vendor calibration typically brings that down to a few tenths.

::: warning A repeatability figure is not an accuracy figure
A buyer who reads "repeatability ±0.02 mm" and plans to pick parts located by a camera to within 0.05 mm will be disappointed: the camera gives a *computed* pose, so what matters is the absolute accuracy of the arm (plus the camera-to-robot calibration), which is likely ten to a hundred times worse than the repeatability. Specify both, say which tasks need which, and test each the way ISO 9283 does — repeatability under the rated load at a fixed approach direction, accuracy against an external measurement such as a laser tracker.
:::

## Sizing the joints: the static gravity budget {#sec-gravity}

The largest single load on the shoulder and elbow of an articulated arm is usually the weight of everything beyond them. It is present whenever the arm is powered, so it sets both the peak torque (when added to acceleration torques) and much of the continuous torque.

::: proposition Static gravity torque at a revolute joint {#prop-gravity-torque}
Let joint $i$ turn about a unit axis $\mathbf z_i$ through a point $O_i$, and let the bodies distal to it have masses $m_k$ with centres of mass at $\mathbf r_k$. In static equilibrium the motor torque that joint $i$ must supply is
$$
\tau_{g,i} = -\,\mathbf z_i\cdot\sum_{k\,\text{distal}} (\mathbf r_k - O_i)\times m_k\mathbf g ,
$$ {#eq-gravity-torque}
where $\mathbf g$ is the gravity vector. For a horizontal joint axis this is $g\sum_k m_k\,d_k$, with $d_k$ the horizontal distance from the axis to the centre of mass $k$ measured perpendicular to the axis. For a vertical joint axis $\tau_{g,i} = 0$.
:::

::: proof
Take as free body everything distal to joint $i$ (draw it: the weights $m_k\mathbf g$ acting at $\mathbf r_k$, and at the joint the reaction force and the reaction moment from the proximal link; the component of the reaction moment along $\mathbf z_i$ is the joint torque $\tau_i$, the other two components are carried by the bearings). Moment equilibrium about $O_i$ gives $\tau_i\mathbf z_i + \mathbf M_\perp + \sum_k(\mathbf r_k - O_i)\times m_k\mathbf g = \mathbf 0$, where $\mathbf M_\perp \perp \mathbf z_i$ is the bearing moment. Dotting with $\mathbf z_i$ eliminates $\mathbf M_\perp$ and gives [[#eq-gravity-torque]]. Equivalently, $\tau_g = \partial P/\partial\mathbf q$, the gradient of the potential energy, as in [[robotics/manipulator-dynamics]]. For a horizontal axis and $\mathbf g = -g\,\mathbf e_z$ the triple product reduces to $g$ times the horizontal lever arm; for a vertical axis $\mathbf z_i\parallel\mathbf g$, so every term $(\mathbf r_k - O_i)\times\mathbf g$ is perpendicular to $\mathbf z_i$ and the torque vanishes.
:::

The torque is largest when the lever arms are largest, which for the shoulder of an articulated arm means the arm stretched out horizontally. Sizing at that pose is conservative but standard: the arm *will* be asked to go there.

::: example Gravity budget of a 5 kg, 850 mm six-axis arm {#ex-gravity}
A six-axis arm with a spherical wrist has an upper arm $a_2 = 400\,\mathrm{mm}$ (shoulder to elbow) and a forearm $a_3 = 350\,\mathrm{mm}$ (elbow to wrist centre); the flange is $100\,\mathrm{mm}$ beyond the wrist centre, so the reach to the flange is $850\,\mathrm{mm}$ (shoulder offset from joint 1 neglected). The rated payload is $5.0\,\mathrm{kg}$ including the gripper, with its centre of mass $50\,\mathrm{mm}$ beyond the flange. Estimated masses, from a first layout: upper-arm structure $4.0\,\mathrm{kg}$ with centre at mid-length; elbow actuator (joint-3 motor, reducer, brake, encoder) $2.5\,\mathrm{kg}$ at the elbow; forearm structure $2.0\,\mathrm{kg}$ at mid-length; wrist assembly (joints 4–6) $3.0\,\mathrm{kg}$ at the wrist centre. Find the static gravity torques at joints 2 and 3 with the arm stretched horizontally.
::: solution
*Free body for joint 2*: everything beyond the shoulder; the forces are the five weights below, acting downwards; the shoulder bearings supply a vertical force and moments about horizontal axes perpendicular to $\mathbf z_2$; the joint torque $\tau_2$ acts about $\mathbf z_2$. With the arm horizontal the lever arms are the distances from the shoulder axis:

| item | $m$ (kg) | $d$ from J2 (m) | $m\,d$ (kg m) | $d$ from J3 (m) | $m\,d$ (kg m) |
|---|---|---|---|---|---|
| upper arm | 4.0 | 0.200 | 0.800 | — | — |
| elbow actuator | 2.5 | 0.400 | 1.000 | 0 | 0 |
| forearm | 2.0 | 0.575 | 1.150 | 0.175 | 0.350 |
| wrist assembly | 3.0 | 0.750 | 2.250 | 0.350 | 1.050 |
| payload | 5.0 | 0.900 | 4.500 | 0.500 | 2.500 |
| **sum** | 16.5 | | **9.700** | | **3.900** |

By [[#eq-gravity-torque]],
$$
\tau_{g,2} = 9.81\times9.700 = 95.2\,\mathrm{N\,m},\qquad \tau_{g,3} = 9.81\times3.900 = 38.3\,\mathrm{N\,m}.
$$
The payload is less than a third of the moving mass but contributes $4.50/9.70 = 46\,\%$ of the shoulder torque, because it sits at the end of the lever. The wrist assembly, at $3.0\,\mathrm{kg}$, contributes another $23\,\%$: every gram saved in the wrist is worth about four times as much at the shoulder as a gram saved in the upper arm.

*Sanity check*: a single $16.5\,\mathrm{kg}$ mass at the arm's mass-weighted mean radius $9.70/16.5 = 0.59\,\mathrm m$ would give the same torque — about $60\,\%$ of the reach, which is plausible for a chain whose heavy parts are towards the tip.
:::
:::

The wrist joints are sized in the same way with the payload diagram. If joint 6's actuator and the flange ($0.8\,\mathrm{kg}$, centre $70\,\mathrm{mm}$ from the joint-5 axis) and the payload ($5.0\,\mathrm{kg}$ at $150\,\mathrm{mm}$) hang horizontally from joint 5, then $\tau_{g,5} = 9.81\,(0.8\times0.07 + 5.0\times0.15) = 7.9\,\mathrm{N\,m}$ — an order of magnitude below the shoulder, as the layout predicted. Joints 4 and 6 see gravity torque only when the payload's centre of mass is off their axes; joint 1, with a vertical axis, sees none at all if the base is level.

::: widget plot
title: Shoulder torque of the example arm
f: 9.81*(5.2 + 0.9*m)*cos(x*pi/180); 9.81*(5.2 + 0.9*m)*cos(x*pi/180) + (2.9825 + 0.81*m)*a; 1.3*(9.81*(5.2 + 0.9*m) + (2.9825 + 0.81*m)*a)
x: -90, 90
y: -20, 260
sliders: m=5:0:10:0.5; a=6:0:15:0.5
labels: \tau_g; \tau_g + J\ddot q_2; 1.3\,\tau_{\text{peak}}
caption: Joint-2 torque (N·m) of the arm of [[#ex-gravity]], stretched straight, against the shoulder angle in degrees from the horizontal. The gravity torque (first curve) is largest with the arm horizontal; the second curve adds the torque to accelerate upwards at $a$ rad/s²; the flat line is the peak requirement with a 1.3 safety factor. Move $m$: every kilogram of payload adds about 8.8 N·m of gravity torque and 0.81 kg m² of inertia. Set $m = 0$ to see how much of the joint the arm's own structure uses.
:::

## Adding the dynamic torque {#sec-dynamic}

When a joint accelerates, its motor must also supply the inertial torque. From [[robotics/manipulator-dynamics]], $\boldsymbol\tau = M(\mathbf q)\ddot{\mathbf q} + C(\mathbf q,\dot{\mathbf q})\dot{\mathbf q} + \mathbf g(\mathbf q) + \boldsymbol\tau_f$, with friction $\boldsymbol\tau_f$. For a first sizing, the useful simplification is to accelerate one joint at a time from rest in the worst pose: then $\dot{\mathbf q} = \mathbf 0$, the Coriolis term vanishes and joint $i$ needs $\tau_i = m_{ii}\ddot q_i + g_i$. The diagonal mass-matrix entry $m_{ii}$ is the moment of inertia of everything distal, about the joint axis, in that pose — computed with the parallel-axis theorem from the same mass table. Coupled motions and the Coriolis terms are then checked by simulating the real trajectories with the full model, once the masses are better known.

The motor's own rotor also has to be accelerated, and seen from the joint it contributes $N^2J_m$ (reflected inertia, [[robotics/manipulator-dynamics]]), which can be as large as the link inertia. Rotor torque is supplied by the motor *before* the gearbox, so the cleanest bookkeeping is: size the *joint output* torque from the link side (this chapter), then add $J_m N\ddot q$ at the motor shaft when the motor and ratio are chosen ([[robot-arm-design/gear-reducers]]).

::: example Peak torque at the shoulder and elbow {#ex-dynamic}
For the arm of [[#ex-gravity]], estimate the inertia about joint 2 with the arm stretched, treating the two arm structures as uniform rods ($I_G = mL^2/12$) and the rest as point masses. The trajectory generator limits joint 2 to $\ddot q_2 = 6.0\,\mathrm{rad/s^2}$ and joint 3 to $9.0\,\mathrm{rad/s^2}$. Find the peak torques, and the requirement with a safety factor of 1.3.
::: solution
*Joint 2.* By the parallel-axis theorem, $I_2 = \sum_k (I_{G,k} + m_kd_k^2)$:
$$
\begin{aligned}
I_2 &= \underbrace{4.0(0.20)^2 + \tfrac{4.0(0.40)^2}{12}}_{\text{upper arm }0.213} + \underbrace{2.5(0.40)^2}_{0.400} + \underbrace{2.0(0.575)^2 + \tfrac{2.0(0.35)^2}{12}}_{\text{forearm }0.682} + \underbrace{3.0(0.75)^2}_{1.688} + \underbrace{5.0(0.90)^2}_{4.050}\\
&= 7.03\,\mathrm{kg\,m^2}.
\end{aligned}
$$
Accelerating upwards from the horizontal, $\tau_2 = I_2\ddot q_2 + \tau_{g,2} = 7.03\times6.0 + 95.2 = 42.2 + 95.2 = 137\,\mathrm{N\,m}$.

*Joint 3.* About the elbow, $I_3 = 2.0(0.175)^2 + \tfrac{2.0(0.35)^2}{12} + 3.0(0.35)^2 + 5.0(0.50)^2 = 0.0817 + 0.3675 + 1.25 = 1.70\,\mathrm{kg\,m^2}$, so $\tau_3 = 1.70\times9.0 + 38.3 = 15.3 + 38.3 = 53.6\,\mathrm{N\,m}$.

*Requirement.* With a factor of 1.3 for model uncertainty, friction and controller headroom, joint 2 needs about $180\,\mathrm{N\,m}$ peak and joint 3 about $70\,\mathrm{N\,m}$ peak at the joint output.

*Sanity check*: the payload alone is $5.0\times0.9^2 = 4.05\,\mathrm{kg\,m^2}$, $58\,\%$ of $I_2$ — consistent with its $46\,\%$ share of the gravity torque, since inertia weights the distance squared. Gravity dominates the shoulder ($95$ against $42\,\mathrm{N\,m}$); for the base joint 1, with no gravity torque, the same $I_1 \approx I_2$ (arm stretched horizontally) gives a purely inertial $42\,\mathrm{N\,m}$ at the same acceleration, which is why base and shoulder joints of the same arm often use different actuator sizes.
:::
:::

## The thermal check: rms torque {#sec-rms}

A motor can deliver its peak torque for a second or two but heats with the square of the current, and current is proportional to torque. Its continuous rating is therefore compared with the root-mean-square torque over a repeating cycle.

::: definition RMS torque of a duty cycle {#def-rms}
For a joint torque $\tau(t)$ repeated with period $T$, the **rms torque** is
$$
\tau_{\text{rms}} = \sqrt{\frac1T\int_0^T\tau^2(t)\,\dd t} \;=\; \sqrt{\frac{\sum_j \tau_j^2\,t_j}{\sum_j t_j}}
$$ {#eq-rms}
for a cycle made of segments of constant torque $\tau_j$ lasting $t_j$. A joint is thermally adequate if $\tau_{\text{rms}}$ does not exceed the continuous torque rating at the actual ambient temperature and mounting, and the cycle period is short compared with the motor's thermal time constant (minutes for a joint motor), so that the winding sees the average heating rather than each peak.
:::

The justification is that copper loss is $i^2R$ and $i \propto \tau$, so mean heating is proportional to the mean of $\tau^2$; [[mechatronics/electric-actuators]] gives the same check for a single axis. The rms torque also feeds into gearbox life, which depends on a different average (a cubic mean, [[robot-arm-design/gear-reducers]]).

::: example RMS torque of the shoulder in a pick-and-place cycle {#ex-rms}
In a $2.0\,\mathrm s$ cycle the shoulder of the example arm, near horizontal, accelerates upwards for $0.3\,\mathrm s$ ($137\,\mathrm{N\,m}$), moves at constant speed for $0.4\,\mathrm s$ ($95.2\,\mathrm{N\,m}$), decelerates for $0.3\,\mathrm s$ ($95.2 - 42.2 = 53.0\,\mathrm{N\,m}$) and then waits for $1.0\,\mathrm s$ while the gripper works. Find the rms torque (a) if the motor holds the arm during the wait, (b) if a holding brake is applied during the wait.
::: solution
(a) $\tau_{\text{rms}} = \sqrt{\dfrac{137.4^2(0.3) + 95.2^2(0.4) + 53.0^2(0.3) + 95.2^2(1.0)}{2.0}} = \sqrt{\dfrac{5663 + 3622 + 842 + 9055}{2.0}} = 97.9\,\mathrm{N\,m}$.

(b) With the brake on, the torque during the wait is zero: $\tau_{\text{rms}} = \sqrt{(5663 + 3622 + 842)/2.0} = 71.1\,\mathrm{N\,m}$.

The rms torque in (a) is barely above the static gravity torque: in a cycle that keeps the arm extended, holding the arm up, not moving it, is what heats the motor. A brake cuts the heating by $1 - 71.1^2/97.9^2 = 47\,\%$ — but engaging and releasing a brake takes tens of milliseconds and wears it, so it suits waits of seconds, not the short pauses of a fast cycle. Note too that this cycle is pessimistic, since a real path rarely keeps the arm horizontal. The joint-2 actuator must therefore deliver roughly $180\,\mathrm{N\,m}$ peak and $100\text{–}130\,\mathrm{N\,m}$ continuous (rms with margin).
:::
:::

::: widget plot
title: RMS shoulder torque against waiting time
f: sqrt((137.35^2*0.3 + 95.16^2*0.4 + 52.96^2*0.3 + h*95.16^2*x)/(1 + x)); 95.16 + 0*x
x: 0, 6
y: 0, 120
sliders: h=1:0:1:1
labels: \tau_{\text{rms}}; \tau_{g,2}
caption: RMS torque (N·m) of the cycle of [[#ex-rms]] against the waiting time in seconds. With $h = 1$ the motor holds the arm during the wait and the rms torque tends to the gravity torque (flat line) however long the wait. Set $h = 0$ (brake applied): the rms torque now falls steadily as the wait lengthens, because the motor rests. The move itself (first 1 s) is the same in both cases.
:::

## Speed and power {#sec-speed}

Joint speeds come from the cycle time and the TCP speed. With joint 2 at $180\,\mathrm{°/s} = 3.14\,\mathrm{rad/s}$, the payload at $0.9\,\mathrm m$ moves at $2.8\,\mathrm{m/s}$. The mechanical power at the joint output is $\tau\dot q$; if the full peak torque were needed at full speed, joint 2 would need $137\times3.14 = 430\,\mathrm W$. In practice peak torque occurs at low speed (at the start of the move) and peak speed at modest torque, so the real peak power is lower, but the motor-and-drive torque–speed curve must contain *every* $(\dot q, \tau)$ point of the trajectory, not just the two extremes. The speed also sets the gear ratio: a motor with a maximum speed of $5000\,\mathrm{rev/min}$ ($524\,\mathrm{rad/s}$) behind a ratio of $N$ gives a joint speed of $524/N\,\mathrm{rad/s}$, so $N \le 524/3.14 = 167$ for this joint — the start of the trade-off taken up in [[robot-arm-design/gear-reducers]].

## The error budget at the tip {#sec-error-budget}

The repeatability specification must be divided among the joints. A small error $\delta\mathbf q$ in the joint angles moves the TCP by $\delta\mathbf x = J(\mathbf q)\,\delta\mathbf q$ ([[robotics/jacobians]]). For one revolute joint the tip moves by $r_i\,\delta q_i$, where $r_i$ is the distance from the joint axis to the TCP; independent random errors add in quadrature.

::: proposition Tip error from independent joint errors {#prop-error-budget}
If the joint-angle errors $\delta q_i$ are independent, zero-mean and have standard deviations $\sigma_i$, and $r_i$ is the perpendicular distance from axis $i$ to the TCP, then the standard deviation of the TCP position error satisfies
$$
\sigma_x^2 \le \sum_i r_i^2\sigma_i^2 ,
$$ {#eq-error-budget}
with equality in the worst direction when all joint axes are parallel. With equal $\sigma_i = \sigma_q$, $\sigma_x \le \sigma_q\sqrt{\sum_i r_i^2}$.
:::

::: proof
The translational part of $J$ has columns $\mathbf z_i\times(\mathbf p - \mathbf o_i)$ for revolute joints, of length $r_i$. Then $\delta\mathbf x = \sum_i \mathbf j_i\,\delta q_i$, and for independent zero-mean errors $\E\lVert\delta\mathbf x\rVert^2 = \sum_i\lVert\mathbf j_i\rVert^2\sigma_i^2 = \sum_i r_i^2\sigma_i^2$. This is the total variance summed over the three directions, which bounds the variance in any one direction; when all columns are parallel (all axes parallel and the arm in a plane) the whole variance lies along one direction and the bound is attained.
:::

The budget treats joint errors as random. Systematic errors — a link $0.2\,\mathrm{mm}$ too long, a reducer that winds up by a fixed angle under the payload — do not scatter from visit to visit and belong in the *accuracy* budget, where they add linearly and are mostly removed by calibration.

::: example Joint repeatability needed for ±0.05 mm {#ex-error-budget}
The arm of [[#ex-gravity]] must achieve $RP = 0.05\,\mathrm{mm}$ with the arm stretched (the worst pose) and the TCP at the payload's centre of mass. Joint 4 and joint 6 are aligned with the forearm and the tool, so their axes pass through the TCP; joint 5 is $0.15\,\mathrm m$ from it. Treating $RP$ as $3\sigma_x$, find the angular repeatability needed at each joint if it is shared equally, and compare with the resolution of a 19-bit absolute encoder on the joint output.
::: solution
Lever arms: $r_1 = 0.90$ (horizontal distance from the base axis), $r_2 = 0.90$, $r_3 = 0.50$, $r_4 = 0$, $r_5 = 0.15$, $r_6 = 0\,\mathrm m$. Then
$$
\sqrt{\textstyle\sum r_i^2} = \sqrt{0.81 + 0.81 + 0.25 + 0.0225} = 1.376\,\mathrm m .
$$
With $\sigma_x = 0.05/3 = 0.0167\,\mathrm{mm}$, [[#eq-error-budget]] gives
$$
\sigma_q = \frac{1.67\times10^{-5}\,\mathrm m}{1.376\,\mathrm m} = 1.21\times10^{-5}\,\mathrm{rad} = 12\,\mathrm{\mu rad}\ (2.5\ \text{arcsec}).
$$
Each joint must return to within $3\sigma_q = 36\,\mathrm{\mu rad} = 7.5\,\text{arcsec}$. A 19-bit encoder has a step of $2\pi/2^{19} = 12.0\,\mathrm{\mu rad}$ — just enough by itself, leaving nothing for backlash, friction and servo error. A motor-side encoder seen through a $100{:}1$ reducer is $100$ times finer, but then the reducer's lost motion enters the budget. This is the case for dual encoders and low-backlash reducers argued in [[robot-arm-design/joint-actuators]] and [[robot-arm-design/gear-reducers]].

*Sanity check*: $7.5$ arcsec at $0.9\,\mathrm m$ is $0.9\times36\times10^{-6} = 33\,\mathrm{\mu m}$ — the same order as the target, as it must be, since joints 1 and 2 dominate the sum.
:::
:::

The same lever arms scale the *stiffness* requirement: a torsional compliance at joint 2 that lets it wind up $\Delta q$ under the payload moves the TCP by $0.9\,\Delta q$. That deflection is repeatable, so it hurts accuracy rather than repeatability — unless the payload changes from part to part. The full deflection budget, including link bending, is in [[robot-arm-design/links-and-structure]].

## A sizing procedure {#sec-procedure}

::: algorithm Sizing the joints of a serial arm {#alg-sizing}
1. **Write the specification**: payload with centre of mass and inertia, reach, workspace and orientations, cycle and speeds, repeatability and accuracy, environment, collaborative or not.
2. **Choose the layout**: the number of DoF the task needs ([[#sec-layouts]]), then link lengths that cover the workspace with margin from the boundary.
3. **Estimate masses** of links and actuators from a first layout or from similar arms; actuators are typically the larger share.
4. **Static gravity torques** joint by joint in the worst pose ([[#prop-gravity-torque]]).
5. **Dynamic torques** from the acceleration limits, using the diagonal inertia in the worst pose; then the peak torque per joint, times a safety factor (1.2–1.5).
6. **RMS torque** over representative cycles ([[#def-rms]]), and the peak power and torque–speed points.
7. **Error and stiffness budgets** at the tip ([[#prop-error-budget]]), turned into angular repeatability, encoder resolution and torsional stiffness per joint.
8. **Choose actuators** ([[robot-arm-design/joint-actuators]], [[robot-arm-design/gear-reducers]]), then *update the masses* in step 3 with the real parts and repeat from step 4 until the numbers stop changing.
:::

Step 8 is where the iteration bites: the elbow and wrist actuators are payload for the shoulder. If the wrist assembly in [[#ex-gravity]] grows from $3.0$ to $4.0\,\mathrm{kg}$, the shoulder gravity torque grows by $9.81\times0.75 = 7.4\,\mathrm{N\,m}$ and its inertia by $0.56\,\mathrm{kg\,m^2}$, which may push the shoulder into the next actuator size, which adds mass at the base (harmless) — but if the elbow actuator grows, the shoulder pays again. The result is that heavy arms get heavier, and that lightweight wrist actuators are worth a great deal.

::: history
The first electrically driven arms designed for computer control came from university laboratories. At Stanford in 1969 Victor Scheinman built the Stanford Arm, a six-axis arm with a sliding prismatic joint, electric motors, harmonic-drive reducers and potentiometers and encoders on the joints, small enough to be driven by a computer of the day. Scheinman went on to design the MIT Arm and then, for Unimation with funding from General Motors, the PUMA, delivered in 1978, whose all-revolute six-axis layout with a spherical wrist became a pattern for later articulated arms. In the same year Hiroshi Makino of Yamanashi University in Japan demonstrated the SCARA concept, two vertical revolute axes giving an arm compliant in the horizontal plane and stiff vertically, which went into production in the early 1980s and made high-speed assembly robots commonplace. The standard way of testing arms, ISO 9283 (*Manipulating industrial robots — Performance criteria and related test methods*), was first published in 1990; its current edition dates from 1998.
:::

## Where this leads {#sec-leads}

The joint requirements derived here — peak and rms torque, speed, angular repeatability and stiffness — are the inputs to the rest of the course. [[robot-arm-design/joint-actuators]] chooses the motor, drive and encoders that produce them; [[robot-arm-design/gear-reducers]] chooses the ratio and the reducer type; [[robot-arm-design/links-and-structure]] designs links stiff enough not to waste the budget; and [[robot-arm-design/joint-control]] closes the loops that turn the hardware into a servo.

::: summary
- Give the task exactly the DoF it needs: 4 for SCARA-type planar work with vertical tools, 5 for axisymmetric tools, 6 for full pose, 7 for redundancy around obstacles and singularities.
- In an articulated arm, joints 1–3 carry a long lever and need large torques; the wrist carries a short lever and needs speed. Mass in the wrist costs most.
- Reach is measured to a stated point, usually wrist centre or flange; work inside about 80–90 % of it, away from the stretched singularity. The dexterous workspace is much smaller than the reachable one.
- Repeatability ($RP = \bar l + 3S_l$, ISO 9283) is scatter; accuracy is bias. Taught positions need repeatability; computed positions need accuracy, which needs calibration.
- Static gravity torque $\tau_{g,i} = g\sum m_kd_k$ about a horizontal axis, zero about a vertical one; add $m_{ii}\ddot q_i$ for acceleration and a 1.2–1.5 safety factor for the peak.
- Check the motor thermally with $\tau_{\text{rms}} = \sqrt{\sum\tau_j^2t_j/\sum t_j}$; holding the arm against gravity often dominates.
- Tip error from joint errors: $\sigma_x \le \sqrt{\sum r_i^2\sigma_i^2}$. For ±0.05 mm at 0.9 m, each joint needs a few arcseconds.
- Iterate: actuator masses are payload for the joints behind them.
:::

## Exercises

::: exercise Shoulder torque of a small arm {level=1 check="23.544"}
A two-link arm held horizontal carries a $3.0\,\mathrm{kg}$ payload at $0.60\,\mathrm m$ from the shoulder axis; its structure and actuators beyond the shoulder total $2.0\,\mathrm{kg}$ with centre of mass $0.30\,\mathrm m$ from the axis. Find the static gravity torque at the shoulder. (Enter the torque in N·m.)
::: solution
$\tau_g = g\sum m_kd_k = 9.81\,(3.0\times0.60 + 2.0\times0.30) = 9.81\times2.40 = 23.544\,\mathrm{N\,m}$.
:::
:::

::: exercise TCP speed from a joint speed {level=1 check="2.670"}
Joint 1 of an arm turns at $180\,\mathrm{°/s}$ with the TCP $0.85\,\mathrm m$ from its axis and all other joints still. How fast does the TCP move? (Enter the speed in m/s, to three decimal places.)
::: solution
$\dot q = 180\,\mathrm{°/s} = \pi\,\mathrm{rad/s}$; $v = r\dot q = 0.85\pi = 2.670\,\mathrm{m/s}$. That is far above the speeds usually allowed near people, which is one reason collaborative operation caps TCP speed rather than joint speed.
:::
:::

::: exercise Repeatability from test data {level=1 check="0.024"}
In an ISO 9283 test of 30 visits to one pose, the distances of the attained positions from their barycentre have mean $\bar l = 0.012\,\mathrm{mm}$ and standard deviation $S_l = 0.004\,\mathrm{mm}$. The barycentre lies $0.41\,\mathrm{mm}$ from the commanded position. State the position repeatability and position accuracy. (Enter $RP$ in mm.)
::: solution
$RP = \bar l + 3S_l = 0.012 + 0.012 = 0.024\,\mathrm{mm}$, quoted as ±0.024 mm. $AP = 0.41\,\mathrm{mm}$. The arm is seventeen times more repeatable than it is accurate — typical of an uncalibrated arm.
:::
:::

::: exercise Elbow torque with a heavier payload {level=2 check="48.069"}
The arm of [[#ex-gravity]] is offered with a $7.0\,\mathrm{kg}$ payload rating, with the same centre-of-mass position and no other changes. Find the new static gravity torque at joint 3 with the arm horizontal. (Enter the torque in N·m, to three decimal places.)
::: solution
About the elbow: $\sum m d = 2.0\times0.175 + 3.0\times0.35 + 7.0\times0.50 = 0.35 + 1.05 + 3.50 = 4.90\,\mathrm{kg\,m}$, so $\tau_{g,3} = 9.81\times4.90 = 48.069\,\mathrm{N\,m}$, $26\,\%$ more than with $5\,\mathrm{kg}$. The shoulder grows from $95.2$ to $9.81\times11.5 = 112.8\,\mathrm{N\,m}$ — and in practice the elbow actuator would have to grow too, adding to the shoulder again.
:::
:::

::: exercise Reading a payload diagram {level=2 check="0.192"}
The joint-5 actuator of a wrist may hold at most $10\,\mathrm{N\,m}$ of static gravity torque. The parts of the wrist beyond joint 5 contribute $0.56\,\mathrm{N\,m}$ of their own. For a $5.0\,\mathrm{kg}$ payload, how far from the joint-5 axis may its centre of mass lie? (Enter the distance in m, to three decimal places.)
::: solution
The payload may contribute $10 - 0.56 = 9.44\,\mathrm{N\,m}$, so $d \le 9.44/(5.0\times9.81) = 9.44/49.05 = 0.192\,\mathrm m$. If the flange is $0.10\,\mathrm m$ beyond the joint-5 axis, the centre of mass may be at most $92\,\mathrm{mm}$ beyond the flange: a long gripper quickly forces a lower payload. The dynamic torque during wrist accelerations reduces the allowance further, which is why vendors draw payload diagrams from the full dynamics.
:::
:::

::: exercise RMS torque of a joint {level=2 check="35.53"}
A joint's cycle is: $0.2\,\mathrm s$ at $80\,\mathrm{N\,m}$, $0.6\,\mathrm s$ at $30\,\mathrm{N\,m}$, $0.2\,\mathrm s$ at $-20\,\mathrm{N\,m}$ and $1.0\,\mathrm s$ at $25\,\mathrm{N\,m}$. Find the rms torque. (Enter it in N·m, to two decimal places.)
::: solution
$\sum\tau^2t = 6400(0.2) + 900(0.6) + 400(0.2) + 625(1.0) = 1280 + 540 + 80 + 625 = 2525\,\mathrm{N^2\,m^2\,s}$ over $T = 2.0\,\mathrm s$, so $\tau_{\text{rms}} = \sqrt{2525/2.0} = \sqrt{1262.5} = 35.53\,\mathrm{N\,m}$. The negative segment heats the motor just as a positive one does: squaring removes the sign. The 80 N·m peak must separately lie under the motor's peak torque at the speed where it occurs.
:::
:::

::: exercise Joint repeatability for a tighter specification {level=2 check="7.27"}
For the arm and pose of [[#ex-error-budget]], the repeatability target is tightened to $RP = 0.03\,\mathrm{mm}$ ($= 3\sigma_x$). What standard deviation $\sigma_q$ of the angular error is allowed at each joint if it is shared equally? (Enter $\sigma_q$ in µrad, to two decimal places.)
::: solution
$\sigma_x = 0.01\,\mathrm{mm} = 1.0\times10^{-5}\,\mathrm m$; $\sigma_q = 1.0\times10^{-5}/1.376 = 7.27\times10^{-6}\,\mathrm{rad} = 7.27\,\mathrm{\mu rad}$ (1.5 arcsec). A 19-bit output encoder (12.0 µrad step, quantisation standard deviation $12.0/\sqrt{12} = 3.5\,\mathrm{\mu rad}$) would use half the allowance on its own; a 20- or 21-bit encoder, or an unequal split giving the wrist joints a looser share, is needed.
:::
:::

::: exercise Why the SCARA is fast {level=2}
A SCARA's first two joints have vertical axes. Explain, using [[#prop-gravity-torque]], what loads the joint motors carry and what loads the bearings carry, and why this lets a SCARA of the same payload and reach as an articulated arm run shorter cycle times. What does it give up?
::: solution
For a vertical axis $\mathbf z_i\parallel\mathbf g$, every term $(\mathbf r_k - O_i)\times m_k\mathbf g$ is horizontal, so its component along $\mathbf z_i$ is zero: the motors carry no gravity torque, only the inertial torques $m_{ii}\ddot q_i$ (and friction). The weight and its overturning moment are carried by the joint bearings (crossed-roller or angular-contact pairs, [[robot-arm-design/links-and-structure]]) and the structure. Since the whole torque capacity goes into acceleration, and the links can be short, stiff castings in a plane, higher accelerations are possible with the same motors, and the motors do not heat while holding position. The SCARA gives up the ability to tilt the tool (only rotation about vertical), works in an annular horizontal workspace below its arm, and has a small vertical stroke.
:::
:::

::: exercise Gravity torque as a gradient {level=3}
For a planar arm with joints 2 and 3 parallel and horizontal, link lengths $a_2$, $a_3$, joint angles $q_2$ (from the horizontal) and $q_3$ (relative), a point mass $m_a$ at the elbow and $m_b$ at the tip, write the potential energy $P(q_2, q_3)$ and show that $\partial P/\partial q_2$ and $\partial P/\partial q_3$ agree with [[#eq-gravity-torque]]. For which $q_2$, $q_3$ is the joint-2 torque largest?
::: solution
Heights: elbow $a_2\sin q_2$, tip $a_2\sin q_2 + a_3\sin(q_2 + q_3)$. So $P = m_ag\,a_2\sin q_2 + m_bg\,[a_2\sin q_2 + a_3\sin(q_2 + q_3)]$. Then
$\partial P/\partial q_2 = g[(m_a + m_b)a_2\cos q_2 + m_ba_3\cos(q_2 + q_3)]$ and $\partial P/\partial q_3 = g\,m_ba_3\cos(q_2 + q_3)$. The horizontal distances from joint 2 are $a_2\cos q_2$ (elbow) and $a_2\cos q_2 + a_3\cos(q_2 + q_3)$ (tip), and from joint 3 $a_3\cos(q_2 + q_3)$ (tip): exactly $g\sum m_kd_k$. The joint-2 torque is largest in magnitude when both cosines are $\pm1$ with the same sign, i.e. $q_2 = 0$ or $\pi$ and $q_3 = 0$: arm stretched horizontally, as assumed in [[#ex-gravity]].
:::
:::

::: exercise Specifying an arm for machine tending {level=3}
A CNC lathe must be loaded with steel blanks of up to $3\,\mathrm{kg}$ (diameter $60\text{–}100\,\mathrm{mm}$, length up to $150\,\mathrm{mm}$) from a tray beside it, and the finished parts returned. The chuck is $600\,\mathrm{mm}$ inside the machine door, and the operator loads trays by hand next to the robot. Write a specification (DoF, reach, payload including gripper, speed, repeatability) and justify each number. Then estimate the shoulder gravity torque with the method of [[#ex-gravity]], stating your mass assumptions.
::: solution
A good answer: **DoF** — 6, because the blank must be presented to the chuck horizontally along the spindle axis and picked vertically from the tray; a dual gripper (one jaw for the blank, one for the finished part) saves a trip and needs the sixth axis to swap. **Payload** — two parts plus a double gripper: $2\times3 + 2.5 \approx 8.5\,\mathrm{kg}$, so a $10\,\mathrm{kg}$ class arm, checking the payload diagram for the offset of the double gripper. **Reach** — chuck $600\,\mathrm{mm}$ beyond the door plus the distance from robot base to door ($\approx 400\,\mathrm{mm}$) plus gripper length gives a TCP distance of about $1.1\,\mathrm m$ to the flange, so a reach of about $1.3\,\mathrm m$ to keep within 85 %. **Repeatability** — the chuck jaws accept a radial error of about $0.2\,\mathrm{mm}$, and positions are taught, so ±0.05 mm is ample. **Speed** — the lathe cycle (say 90 s) is long; tending takes 15–20 s, and since an operator works next to the arm, a collaborative arm or a speed-and-separation-monitored cell with reduced speed is appropriate ([[robot-arm-design/arm-safety]]). **Shoulder torque** — e.g. structure and actuators $25\,\mathrm{kg}$ at a mean radius of $0.6\,\mathrm m$, payload $8.5\,\mathrm{kg}$ at $1.35\,\mathrm m$: $\tau_g = 9.81(15 + 11.5) \approx 260\,\mathrm{N\,m}$; with acceleration and margin, a peak requirement around $400\,\mathrm{N\,m}$. The answer should note that the payload dominates and that a lighter single gripper with two trips would cut it.
:::
:::
