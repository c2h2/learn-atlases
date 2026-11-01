An industrial arm is a machine that can move several kilograms at several metres per second, in directions that are hard for a bystander to predict, and that stops only when something tells it to. The first recorded death caused by an industrial robot occurred in 1979, and the hazards — impact, crushing and clamping between the arm and a fixed object, parts thrown from a gripper, unexpected start-up during maintenance — have not changed since. What has changed is how arms are made safe: from cages that keep people out, to arms that share a workspace with people and limit their own speed, separation, force and power. This chapter covers the engineering of that safety for the people who build arms and integrate them into cells: risk assessment, the robot safety standards (ISO 10218 and ISO/TS 15066), the four modes of collaborative operation with the separation-distance and energy calculations behind them, functional safety and performance levels (ISO 13849-1), stop categories (IEC 60204-1), and the hardware — safety-rated controllers, safe torque off and brakes — that implements it. It builds on the general introduction to machine safety in [[mechatronics/system-integration]], the arm's stopping behaviour from [[robot-arm-design/joint-control]], and the end effectors of [[robot-arm-design/end-effectors]], which are often the most dangerous part of a collaborative application.

::: warning This chapter teaches principles, not compliance
Robot safety is a regulated field. The standards cited here are summarised and paraphrased, not reproduced; their exact requirements, tables and limits must be taken from the current editions, which are revised from time to time (ISO 10218 was revised in 2025). Numerical values in the worked examples are labelled where they are assumptions chosen for illustration and must not be used as design values. Real robot cells are designed, validated and documented by qualified people to the standards and regulations that apply where they are used, and no example here is an approved design.
:::

## Risk assessment {#sec-risk}

Every safety design starts from a **risk assessment** in the sense of ISO 12100 (*Safety of machinery — General principles for design — Risk assessment and risk reduction*, 2010), the basic standard for all machinery.

::: definition Hazard, risk and risk reduction {#def-risk}
A **hazard** is a potential source of harm (a moving arm, a pinch point between gripper fingers, a falling part, stored energy in a spring or in compressed air). A **hazardous situation** is a circumstance in which a person is exposed to a hazard. **Risk** combines the **severity** of the possible harm with the **probability** of its occurrence, which in turn depends on the frequency and duration of exposure, the probability of the hazardous event, and the possibility of avoiding or limiting the harm. **Risk reduction** lowers severity or probability until the residual risk is acceptable, applying, in order of preference, (1) **inherently safe design measures**, (2) **safeguarding and complementary protective measures**, and (3) **information for use** — the "three-step method".
:::

::: algorithm Risk assessment and reduction (after ISO 12100) {#alg-risk}
1. **Determine the limits of the machine**: intended use and reasonably foreseeable misuse, all phases of life (transport, installation, commissioning, production, teaching, maintenance, cleaning, decommissioning), the people involved (operators, maintenance staff, bystanders) and their training.
2. **Identify the hazards and hazardous situations** in every phase — for an arm: impact and clamping by the arm, the tool and the part; ejected parts; unexpected start-up; electrical, pneumatic and thermal hazards; ergonomics; hazards specific to the process (a laser, a welding arc, a sharp blade).
3. **Estimate the risk** of each: severity, exposure, probability, possibility of avoidance.
4. **Evaluate** whether risk reduction is needed.
5. **Reduce the risk** by the three-step method, then return to step 2: every protective measure can introduce new hazards (a light curtain invites people to reach through it; a reduced-speed mode invites people to stand closer).
6. **Document** the assessment, the measures and the validation; the residual risks go into the information for use.
:::

For robot applications the inherently safe measures are often the most effective and the least used: a lighter arm and gripper, rounded and padded surfaces, no pinch points between the arm and fixed structures (a gap of at least the size of the body part concerned, or no gap at all), a lower maximum speed, a workspace that the arm physically cannot leave (mechanical stops), and grippers that cannot exert crushing forces. Safeguarding — fixed guards, interlocked doors, light curtains, laser scanners, and the collaborative techniques below — deals with what remains.

## The robot safety standards {#sec-standards}

Three documents are central for arms, alongside general machinery standards.

- **ISO 10218-1** sets safety requirements for the robot itself: what the *manufacturer* of an arm must provide — stopping functions, speed and position limiting, the teach pendant's enabling device and emergency stop, reduced speed in manual mode, the means to move the arm without drive power to free a trapped person, published stopping times and distances, and the safety-related control system's performance.
- **ISO 10218-2** sets requirements for robot systems, applications and cells: what the *integrator* must do — layout, safeguarding, the end effector, the workpiece, integration of the safety functions, and validation.
- **ISO/TS 15066** (2016), a technical specification, gives guidance for **collaborative** operation, including the separation-distance formula for speed and separation monitoring and, in its Annex A, a body model with limits on contact force and pressure for power and force limiting.

ISO 10218 became a two-part standard with Part 1 in 2006 and Part 2 in 2011, when Part 1 was also revised. **Revised editions of both parts were published in 2025.** As publicly described, the 2025 revision restructures the requirements, makes the functional-safety requirements more explicit, treats collaboration as a property of the *application* rather than of the robot — reflecting that no robot is safe for collaboration independently of its tool, task and layout — absorbs much of the guidance of ISO/TS 15066 into the standard itself, and adds requirements on cybersecurity insofar as it affects safety. The descriptions in this chapter follow the established concepts that the 2011 editions and ISO/TS 15066 introduced and that remain in use; a designer must work from the current text of whichever edition applies to the product and market. In the European Union these standards are harmonised under machinery legislation — the Machinery Directive 2006/42/EC, replaced by the Machinery Regulation (EU) 2023/1230, which applies from January 2027 — and compliance with harmonised standards gives a presumption of conformity with the corresponding legal requirements.

Several requirements that recur in robot-specific standards are worth knowing by heart:

- **Manual reduced speed**: when the arm is moved from the teach pendant, the tool-centre-point speed is limited to $250\,\mathrm{mm/s}$ unless further measures apply.
- **Enabling device**: manual motion requires holding a three-position enabling switch in its middle position; releasing it *or squeezing it hard* (a panic reaction) stops the arm.
- **Emergency stop** on the pendant and at the cell, overriding all other functions.
- **Stopping data**: the manufacturer publishes stopping times and distances of the main axes for the stop categories provided, for combinations of speed, extension and payload, so that integrators can compute safety distances.

## Stopping the arm {#sec-stopping}

**IEC 60204-1** (*Safety of machinery — Electrical equipment of machines*) defines three **stop categories**:

| category | what happens | typical robot use |
|---|---|---|
| 0 | immediate removal of power to the actuators (an uncontrolled stop); in an arm, the drives' torque is switched off and the holding brakes engage | emergency stop, fault reaction, loss of power |
| 1 | a controlled stop with power available to the actuators to achieve the stop, then removal of power when stopped | emergency stop and protective stop on most arms |
| 2 | a controlled stop with power left available to the actuators | protective stop for collaborative operation (safety-rated monitored stop) |

An **emergency stop** (ISO 13850) must be category 0 or 1, chosen by risk assessment. A **protective stop**, triggered by a safeguard such as a door switch or a scanner, may be category 0, 1 or 2. In the drive these map onto the safety sub-functions of IEC 61800-5-2: **safe torque off** (STO, which removes the gate-drive power by hardware so that the motor cannot produce torque — category 0), **safe stop 1** (SS1: decelerate, then STO — category 1), **safe stop 2** (SS2: decelerate, then **safe operating stop**, SOS, which monitors standstill with the drive powered — category 2), plus **safely limited speed** (SLS), **safely limited position** (SLP) and **safe brake control** (SBC).

Arms usually prefer category 1 to category 0 even for emergency stops, for two reasons. A controlled stop with the motors decelerates harder than the brakes alone, so the arm stops *sooner*; and it can keep the tool on its programmed path, whereas a brake stop of six joints with different brake torques sends the tool along an unplanned curve.

::: example Category 0 against category 1 stopping distance {#ex-stop}
The tool of an arm moves at $1.5\,\mathrm{m/s}$ when a stop is triggered. Assume (illustrative values) that in a category 1 stop the controller reacts in $10\,\mathrm{ms}$ and then decelerates the tool along its path at $10\,\mathrm{m/s^2}$, and that in a category 0 stop the holding brakes engage $30\,\mathrm{ms}$ after STO and then decelerate the tool at an equivalent $5\,\mathrm{m/s^2}$. Compare the stopping distances.
::: solution
For a reaction time $t_r$ at speed $v$ followed by constant deceleration $a$, the distance is $s = vt_r + v^2/(2a)$.

Category 1: $s = 1.5\times0.010 + 1.5^2/(2\times10) = 0.015 + 0.1125 = 0.128\,\mathrm m$.

Category 0: $s = 1.5\times0.030 + 1.5^2/(2\times5) = 0.045 + 0.225 = 0.270\,\mathrm m$.

The controlled stop is twice as short and stays on the path. The uncontrolled stop is still needed — it is what happens when the drives or the controller fail, and it is the reaction to a fault in the stopping function itself — so safety distances must be computed for the stop that the safety function actually guarantees. If the controlled deceleration is monitored by the safety controller (SS1 with monitored deceleration), it can be relied upon; if not, the category 0 distance applies. Sanity check: the quadratic term dominates, so halving the speed cuts the braking part by four — the basis of speed reduction near people.
:::
:::

**Brakes** on robot joints are spring-applied, electrically released holding brakes: they hold the arm when power is off and act as the last resort in a category 0 stop, but they are not designed as service brakes, and repeated emergency stops from full speed wear them. Their holding torque must exceed the gravity torque at the worst pose with the heaviest tool and part, with margin; they are tested periodically (by commanding a torque against the closed brake and checking that the joint does not move), a function that the safety controller can automate through safe brake control and safe brake test. Vertical and gravity-loaded axes are the critical ones: a joint that loses its brake falls.

## Safety-rated control {#sec-safety-control}

The robot's motion controller is a complex, frequently updated software system and is not trusted with safety ([[robot-arm-design/software-stack]]). Safety functions run in a separate **safety-rated** part of the control system: a dual-channel safety controller (two processors that compute the same function from redundant inputs and compare results), safety-rated encoders or redundant position measurement, STO and brake control in the drives with feedback, and safety-rated inputs from the e-stop, the enabling device, door switches and sensors. Modern arm controllers implement a set of configurable **safety functions** in this layer: safe joint and Cartesian position limits (virtual walls, keep-out zones, a tool-orientation cone), safe speed limits for joints and the tool, momentum and power limits, force limits, and monitoring of stopping time and distance. A violation triggers a protective stop.

::: definition Performance level (ISO 13849-1) {#def-pl}
ISO 13849-1 (current edition 2023) grades the ability of a safety-related part of a control system to perform a safety function by its **performance level** PL a (lowest) to e (highest), defined by the **average probability of a dangerous failure per hour** $\mathrm{PFH}_D$:

| PL | $\mathrm{PFH}_D$ (per hour) |
|---|---|
| a | $10^{-5}$ to below $10^{-4}$ |
| b | $3\times10^{-6}$ to below $10^{-5}$ |
| c | $10^{-6}$ to below $3\times10^{-6}$ |
| d | $10^{-7}$ to below $10^{-6}$ |
| e | $10^{-8}$ to below $10^{-7}$ |

The PL achieved depends on the **category** of the architecture (B, 1, 2, 3, 4 — from single-channel to redundant with high diagnostic coverage), the **mean time to dangerous failure** of each channel, the **diagnostic coverage**, and measures against **common-cause failure**, as well as on the avoidance of systematic (design and software) faults. The **required** performance level $\mathrm{PL_r}$ of each safety function is set from the risk: the standard's risk graph uses severity (S1 slight, S2 serious), frequency or duration of exposure (F1, F2) and possibility of avoidance (P1, P2), from $\mathrm{PL_r}$ a for S1-F1-P1 to e for S2-F2-P2.
:::

IEC 62061 grades the same functions by **safety integrity level** (SIL 1–3), with PL d corresponding roughly to SIL 2 and PL e to SIL 3. For industrial robots, the 2011 edition of ISO 10218-1 required safety-related control functions to achieve PL d with a category 3 architecture unless the risk assessment justified otherwise; that requirement is widely used as the baseline, and the current edition must be consulted for the specific requirements of each function.

::: example Performance level of a stop function {#ex-pl}
A protective-stop function consists of three subsystems in series: a safety laser scanner (data sheet: PL d, $\mathrm{PFH}_D = 5.0\times10^{-8}\,\mathrm{h^{-1}}$), a safety controller (PL e, $\mathrm{PFH}_D = 1.0\times10^{-9}\,\mathrm{h^{-1}}$) and the drives' STO with dual-channel wiring (PL e, $\mathrm{PFH}_D = 1.2\times10^{-8}\,\mathrm{h^{-1}}$). (These values are illustrative.) The risk assessment gives S2 (serious injury possible), F2 (frequent exposure) and P1 (avoidance possible under some conditions). What PL is required, and what does the function achieve?
::: solution
*Required.* On the risk graph, S2-F2-P1 gives $\mathrm{PL_r} = $ d.

*Achieved.* For subsystems in series the dangerous failure rates add: $\mathrm{PFH}_D = 5.0\times10^{-8} + 1.0\times10^{-9} + 1.2\times10^{-8} = 6.3\times10^{-8}\,\mathrm{h^{-1}}$. Numerically this lies in the PL e band ($10^{-8}$ to $10^{-7}$), but a function cannot be rated higher than its weakest subsystem's PL: the scanner is PL d, so the function achieves PL d. Since $\mathrm{PL} = \mathrm{PL_r}$, the requirement is met.

Sanity check: $6.3\times10^{-8}$ per hour is one dangerous failure in about $1.6\times10^7$ hours, some 1800 years of continuous operation — for one function in one cell. The figure is meaningful only if the systematic requirements (design process, software verification, correct wiring, periodic testing) are also met; most real failures of safety functions are systematic (a bridged interlock, a wrong configuration), not random.
:::
:::

## Collaborative operation {#sec-collaborative}

Collaboration means that a person and an arm work in a shared space while the arm is in automatic operation. The robot standards and ISO/TS 15066 describe four ways of making that safe; an application may combine them.

::: definition The four collaborative operation methods {#def-collab}
- **Safety-rated monitored stop (SMS)**: the arm stops (category 2, standstill monitored by the safety controller) before a person enters the collaborative workspace and stays stopped while the person is there; it resumes automatically when the person leaves. Example: a person loads a fixture while the arm waits.
- **Hand guiding (HG)**: the operator moves the arm directly by hand, through a guiding device near the tool with an enabling switch and emergency stop, while the arm runs at a safety-rated reduced speed. Example: positioning a heavy load assisted by the arm.
- **Speed and separation monitoring (SSM)**: the arm and the person may move in the workspace at the same time; sensors measure the separation, and the safety controller slows the arm and stops it before the separation falls below a protective separation distance.
- **Power and force limiting (PFL)**: contact between the arm (with its tool and part) and a person is permitted, but the arm is designed and controlled so that the forces, pressures and energy transferred in a contact stay below limits that are not expected to cause injury.
:::

### Speed and separation monitoring

The idea of SSM is a race: when a person is detected approaching, the arm must be able to stop — and has stopped — before the person can reach it. The **protective separation distance** collects every distance that can be covered in that race.

::: proposition Protective separation distance {#prop-ssm}
Let a person approach at speed $v_h$ while the arm moves towards them at speed $v_r$. Let $T_r$ be the reaction time of the system (sensor detection, processing and the safety controller's reaction until the stop begins) and $T_s$ the arm's stopping time, during which it covers its stopping distance $S_s$. Then the separation at the moment of detection must be at least
$$
S_p = \underbrace{v_h(T_r + T_s)}_{S_h} + \underbrace{v_rT_r}_{S_r} + S_s + C + Z_d + Z_r ,
$$ {#eq-ssm}
where $C$ is the **intrusion distance** (how far a body part can reach towards the hazard before it is detected), $Z_d$ the position uncertainty of the person from the sensing system, and $Z_r$ the position uncertainty of the arm. This is the form given in ISO/TS 15066, which also allows the speeds to vary with time.
:::

::: proof
At the moment $t_0$ when the person is detected, put the person at distance $d$ from the nearest point of the arm along the line of approach. During $[t_0, t_0 + T_r]$ the system has not yet begun to stop: the person moves $v_hT_r$ towards the arm and the arm $v_rT_r$ towards the person. During the stop, $[t_0 + T_r, t_0 + T_r + T_s]$, the person moves a further $v_hT_s$ and the arm its stopping distance $S_s$. No contact occurs if the sum of these approach distances is less than $d$: $d > v_h(T_r + T_s) + v_rT_r + S_s$. The detected position may be in error by up to $Z_d$ for the person and $Z_r$ for the arm, and the sensor may detect the person only after a part of the body has already protruded by $C$ beyond the detected position; adding these worst cases gives [[#eq-ssm]]. The assumptions are constant (worst-case) speeds and a straight-line approach; time-varying speeds replace the products by integrals of the speeds over the same intervals.
:::

The human approach speed is taken from ISO 13855 (*Positioning of safeguards with respect to the approach of the human body*) when it is not measured: $1.6\,\mathrm{m/s}$ for walking approach, and $2.0\,\mathrm{m/s}$ for hand and arm movements at short distances. The same standard gives intrusion distances for different sensors; for a laser scanner detecting legs in a horizontal plane at height $H$ (mm) above the floor, it gives $C = 1200\,\mathrm{mm} - 0.4H$, but not less than $850\,\mathrm{mm}$ — a large term that accounts for the arm reaching forward over the detection plane.

::: example Speed and separation monitoring with a laser scanner {#ex-ssm}
A floor-mounted safety laser scanner at $H = 300\,\mathrm{mm}$ monitors the approach to an arm. Its measurement uncertainty is $Z_d = 0.10\,\mathrm m$; the arm's position uncertainty is $Z_r = 0.02\,\mathrm m$. The system reaction time is $T_r = 0.10\,\mathrm s$. At full speed, $v_r = 1.0\,\mathrm{m/s}$, the arm's published stopping data give $S_s = 0.15\,\mathrm m$ in $T_s = 0.30\,\mathrm s$ (consistent with a constant deceleration of $3.33\,\mathrm{m/s^2}$). (a) Find the protective separation distance. (b) Recompute at a reduced speed of $0.25\,\mathrm{m/s}$, assuming the same deceleration. (c) How would a sensing system that tracks the person's body directly, with $C = 0.20\,\mathrm m$, change the layout? (Illustrative values throughout.)
::: solution
(a) $C = 1200 - 0.4\times300 = 1080\,\mathrm{mm} = 1.08\,\mathrm m$ (above the 850 mm minimum). With $v_h = 1.6\,\mathrm{m/s}$: $S_h = 1.6(0.10 + 0.30) = 0.64\,\mathrm m$, $S_r = 1.0\times0.10 = 0.10\,\mathrm m$, $S_s = 0.15\,\mathrm m$. Total: $S_p = 0.64 + 0.10 + 0.15 + 1.08 + 0.10 + 0.02 = 2.09\,\mathrm m$.

(b) At $0.25\,\mathrm{m/s}$: $T_s = 0.25/3.33 = 0.075\,\mathrm s$, $S_s = 0.25^2/(2\times3.33) = 0.0094\,\mathrm m$, $S_h = 1.6(0.10 + 0.075) = 0.28\,\mathrm m$, $S_r = 0.025\,\mathrm m$. Total: $S_p = 0.28 + 0.025 + 0.009 + 1.08 + 0.12 = 1.51\,\mathrm m$. A typical layout uses this as a *warning field*: at about 2.1 m the arm slows to 0.25 m/s; at 1.5 m it stops (safety-rated monitored stop); it resumes when the person leaves.

(c) With $C = 0.20\,\mathrm m$ the distances fall to $1.21\,\mathrm m$ at full speed and $0.63\,\mathrm m$ at reduced speed. The intrusion distance, a property of the *sensor and its mounting*, was the largest single term — which is why direct body tracking, if it achieves the required performance level, allows much tighter cells.

Sanity check: at reduced speed the human term $S_h$ and the intrusion distance dominate; the arm's own motion contributes less than 4 cm. Below a certain speed, slowing the arm further buys little: the remaining distance is the person's own approach during the reaction time. Shortening $T_r$ helps at every speed.
:::
:::

::: widget plot
f: h*(r + x/a) + x*r + x^2/(2*a) + C + z
x: 0, 2
y: 0, 3.5
sliders: h=1.6:1.6:2:0.1; r=0.1:0.02:0.3:0.01; a=3.33:1:10:0.1; C=1.08:0.1:1.2:0.01; z=0.12:0:0.3:0.01
labels: S_p\ (\mathrm m)
caption: Protective separation distance $S_p$ in metres from [[#eq-ssm]] against the arm's speed $v_r$ in m/s, with constant deceleration $a$ (m/s²), so that $T_s = v_r/a$ and $S_s = v_r^2/2a$: human speed $h$, reaction time $r$ (s), intrusion distance $C$ and combined uncertainty $z = Z_d + Z_r$ (m). The curve starts at $hr + C + z$ even for a stationary arm. Move $C$ from a scanner's 1.08 m to 0.1 m and watch the whole curve drop; double $a$ and the curve flattens at high speed.
:::

### Power and force limiting

In PFL the arm is allowed to touch the person. Two kinds of contact are distinguished: **transient contact**, a brief impact in free space after which the person's body part can recoil (an arm hitting a hand that is not trapped), and **quasi-static contact**, in which the body part is clamped between the arm and a fixed object, so the force persists until the arm backs off. Clamping is far more dangerous: there is no recoil, and the force rises as long as the arm keeps pushing.

Annex A of ISO/TS 15066 provides a **body model** that divides the body into regions (head, torso, arms, hands, legs and their parts) and gives, for each, a maximum permissible pressure and a maximum permissible force for quasi-static contact, derived from studies of the onset of pain. For transient contact it permits higher values — up to twice the quasi-static ones for most regions, with more restrictive treatment of the head and face. It also gives, for each region, an effective mass and an effective spring constant, so that a permissible force can be converted into a permissible speed. The tables themselves must be taken from the specification (or its successor content in ISO 10218-2:2025); this chapter does not reproduce them.

::: proposition Permissible speed for transient contact (energy model) {#prop-pfl}
Model a transient collision as a two-body impact in which the body region (effective mass $m_H$, spring constant $k$) is compressed until the relative motion stops, and all relative kinetic energy is stored as elastic energy. If the robot's effective mass is $m_R$ and the relative speed at contact is $v_{\mathrm{rel}}$, the peak contact force is
$$
F = v_{\mathrm{rel}}\sqrt{\mu k},\qquad \mu = \left(\frac{1}{m_H} + \frac{1}{m_R}\right)^{-1},
$$ {#eq-pfl}
so the permissible relative speed for a permissible force $F_{\max}$ is $v_{\max} = F_{\max}/\sqrt{\mu k}$. ISO/TS 15066 estimates the robot's effective mass as $m_R = M/2 + m_L$, with $M$ the total mass of the moving parts of the robot and $m_L$ the effective payload (tool plus workpiece).
:::

::: proof
In the centre-of-mass frame of the two bodies the relative motion behaves like a single body of reduced mass $\mu = m_Hm_R/(m_H + m_R)$ moving at $v_{\mathrm{rel}}$; its kinetic energy is $\tfrac12\mu v_{\mathrm{rel}}^2$ (the kinetic energy of the centre of mass is unchanged by the internal contact force and cannot be stored). At maximum compression $x$ the relative velocity is zero and, with a linear spring $F = kx$ and no losses, $\tfrac12\mu v_{\mathrm{rel}}^2 = \tfrac12kx^2 = F^2/(2k)$. Solving, $F = v_{\mathrm{rel}}\sqrt{\mu k}$. The assumptions — linear stiffness, no damping or plastic deformation, a free (unclamped) body region, and a robot that keeps its speed until maximum compression — make the estimate conservative for force in most cases but invalid for clamping, where the body part cannot recoil. The effective-mass rule $M/2 + m_L$ is an empirical approximation for a typical arm moving its tool; it is not exact for any particular pose.
:::

::: example A permissible speed for transient hand contact {#ex-pfl}
A collaborative arm has moving parts of total mass $M = 20\,\mathrm{kg}$ and carries a tool and part of $m_L = 2\,\mathrm{kg}$. For this example *assume* a hand region with effective mass $m_H = 0.6\,\mathrm{kg}$, effective spring constant $k = 75\,\mathrm N/\mathrm{mm}$ and a permissible transient force of $280\,\mathrm N$ (values chosen to be of the order of those in the specification; a real design takes them from the standard). Find the permissible speed, and repeat for a payload of $8\,\mathrm{kg}$.
::: solution
$m_R = M/2 + m_L = 10 + 2 = 12\,\mathrm{kg}$. $\mu = (1/0.6 + 1/12)^{-1} = (1.667 + 0.083)^{-1} = 0.571\,\mathrm{kg}$. With $k = 75\times10^3\,\mathrm{N/m}$, $\sqrt{\mu k} = \sqrt{0.571\times75\,000} = 207\,\mathrm{N\,s/m}$, so $v_{\max} = 280/207 = 1.35\,\mathrm{m/s}$.

With $m_L = 8\,\mathrm{kg}$: $m_R = 18\,\mathrm{kg}$, $\mu = (1.667 + 0.056)^{-1} = 0.580\,\mathrm{kg}$, $\sqrt{\mu k} = 209\,\mathrm{N\,s/m}$, $v_{\max} = 1.34\,\mathrm{m/s}$ — almost unchanged, because the reduced mass is dominated by the lighter body, the hand. For a heavy body region (for example the torso, with an effective mass of tens of kilograms) the robot's mass dominates and the permissible speed falls substantially with payload.

Sanity check: speeds of the order of $1\,\mathrm{m/s}$ for transient contact with a free hand, but much lower for clamping situations and for the head, are what collaborative applications typically use. The *pressure* limit must also be checked: a sharp tool edge concentrates the same force on a few square millimetres and can exceed the permissible pressure far below the force limit — which is why collaborative tools have rounded edges and padding.
:::
:::

::: widget plot
f: F/sqrt(k*1000*m*x/(m + x))
x: 0.5, 40
y: 0, 3
sliders: F=280:50:500:10; k=75:5:150:5; m=0.6:0.5:40:0.1
labels: v_{\max}\ (\mathrm{m/s})
caption: Permissible relative speed from [[#eq-pfl]] against the robot's effective mass $m_R$ in kg, for a body region of effective mass $m$ (kg) and spring constant $k$ (N/mm) and a permissible force $F$ (N) — all slider values are illustrative, not taken from the standard. For a light region (small $m$) the curve flattens quickly: adding payload changes little. Raise $m$ towards a torso-like value and the permissible speed keeps falling as the robot gets heavier.
:::

**Clamping** needs a different analysis: the force is limited not by energy but by how hard the arm pushes before it detects the contact and backs off. Collaborative arms detect contact from joint torque sensors or from the residual between measured motor currents and the dynamic model's prediction (a momentum observer), and react by stopping and, ideally, reversing slightly to release the trapped part. Until detection, a clamped body part is compressed at the arm's speed.

::: example Force overshoot while clamping {#ex-clamp}
An arm moving at $0.5\,\mathrm{m/s}$ closes on a hand resting against a fixture. The contact detection, from first contact to the start of the stop, takes $10\,\mathrm{ms}$; take the hand's spring constant as $75\,\mathrm{N/mm}$ (assumed). Estimate the clamping force reached before the arm even starts to stop, and the arm speed that would keep it below $140\,\mathrm N$ (an assumed limit for this example).
::: solution
If the arm keeps its speed until detection, the compression is $x = vt_d = 0.5\times0.010 = 5\,\mathrm{mm}$ and the force $kx = 75\times5 = 375\,\mathrm N$ — before any braking, and the arm's stopping distance adds more. To stay below $140\,\mathrm N$ the compression must be below $140/75 = 1.87\,\mathrm{mm}$, i.e. $v < 1.87\,\mathrm{mm}/10\,\mathrm{ms} = 0.187\,\mathrm{m/s}$, and lower still once the stopping distance after detection is included. Sanity check: this is why applications with clamping hazards run slowly in the clamping zones, or eliminate the clamping geometry (no fixed surface within reach of the tool's motion, or a minimum gap), which is the inherently safe solution.
:::
:::

::: remark Validating PFL by measurement
Calculated speeds are a starting point. ISO/TS 15066 and the practice that followed it validate PFL applications by **measuring** contact forces and pressures at the actual hazard points with a biofidelic measuring device — a force gauge with springs and damping pads that mimic the stiffness of the body region, and pressure-sensitive film — at the speeds, payloads and poses of the real program. Measurements are repeated after any change of program, tool or layout, because PFL is a property of the whole application, not of the arm.
:::

## The pieces together {#sec-together}

A safe collaborative application combines measures across layers:

- **Arm** (manufacturer, ISO 10218-1): safety-rated controller with limiting functions (position, speed, force, power, momentum), category 1 and 2 stops with monitored deceleration, STO and safe brake control, reliable contact detection, published stopping data, means to release a trapped person.
- **Tool and part** (integrator, ISO 10218-2): rounded, padded geometry; grip that holds through emergency stops ([[robot-arm-design/end-effectors]]); limited gripper force or guarded finger pinch points; no sharp edges on the part, or a different collaborative method where they cannot be avoided.
- **Layout**: no clamping geometry, or speed reduced near it; sensors positioned by [[#eq-ssm]]; collaborative and non-collaborative zones clearly marked.
- **Validation**: every safety function tested, PL calculated and documented, forces measured, information for use written, and the whole re-validated after changes.

::: quiz
An integrator buys an arm marketed as "collaborative" and fits a gripper with a knife for cutting packaging tape. What follows for the safety of the application?
- [ ] Nothing: the arm is certified collaborative, so the application is too.
- [ ] Only the gripper's mass must be entered into the arm's payload settings.
- [x] A new risk assessment is needed; the knife creates a cutting hazard that power and force limiting cannot address, so another method (guarding, speed and separation monitoring or a monitored stop) is needed where people can reach it.
- [ ] The arm's force limit must be lowered until the knife is safe.
::: solution
Collaboration is a property of the application: arm, tool, part, task and layout together. A blade concentrates force on a tiny area, so the permissible pressure is exceeded at any force an arm could usefully apply; force limiting cannot make it safe. The risk assessment must cover the knife, and the application must prevent contact with it — for example by keeping people out of reach while it is exposed, or by a retracting, guarded blade.
:::
:::

::: history
On 25 January 1979 Robert Williams was killed at Ford's Flat Rock casting plant in Michigan when a parts-retrieval robot struck him — the first recorded death caused by an industrial robot; in 1981 Kenji Urada died at a Kawasaki Heavy Industries plant in Japan while working inside a robot's envelope. Such accidents led to the first robot safety standard, ANSI/RIA R15.06, published in the United States in 1986, and to ISO 10218, first published in 1992 and later split into a part for robots (2006) and a part for robot systems (2011). The 2011 editions introduced collaborative operation into the standard, and ISO/TS 15066 followed in 2016 with its body model for power and force limiting, based on pain-threshold studies. Functional safety had meanwhile been put on a probabilistic footing by IEC 61508 (1998–2000) and ISO 13849-1 (2006), and the revised ISO 10218 parts appeared in 2025.
:::

::: summary
- Start with an ISO 12100 risk assessment over the whole life and all users; reduce risk by inherently safe design first, then safeguarding, then information; iterate, because measures create hazards.
- ISO 10218-1 (robot) and -2 (application and integration), revised in 2025 — the revision treats collaboration as a property of the application, absorbs ISO/TS 15066 guidance and adds cybersecurity; work from the current text. Manual reduced speed $250\,\mathrm{mm/s}$, three-position enabling device, published stopping data.
- IEC 60204-1 stop categories: 0 (power off, brakes), 1 (controlled stop, then power off), 2 (controlled stop, power kept); STO, SS1, SS2/SOS, SLS, SBC in the drives (IEC 61800-5-2). Category 1 usually stops shorter and on path, but distances must be based on the guaranteed stop.
- Safety functions run in a safety-rated, redundant controller with STO and brakes, not in the motion software. PL a–e by $\mathrm{PFH}_D$ ($10^{-7}$–$10^{-6}$ for d, $10^{-8}$–$10^{-7}$ for e); series rates add; the weakest subsystem's PL limits the function. Robot safety functions are typically PL d, category 3.
- Collaborative methods: safety-rated monitored stop, hand guiding, speed and separation monitoring, power and force limiting.
- SSM: $S_p = v_h(T_r + T_s) + v_rT_r + S_s + C + Z_d + Z_r$, $v_h = 1.6\,\mathrm{m/s}$ (walking) from ISO 13855; the intrusion distance $C$ often dominates.
- PFL: body-region limits on force and pressure (ISO/TS 15066 Annex A); transient contact $F = v_{\mathrm{rel}}\sqrt{\mu k}$, $m_R = M/2 + m_L$; clamping is limited by detection time and speed; validate by measurement.
:::

## Exercises

::: exercise The human term {level=1 check="0.528"}
In a speed-and-separation calculation the reaction time is $0.08\,\mathrm s$ and the arm's stopping time $0.25\,\mathrm s$. Taking $v_h = 1.6\,\mathrm{m/s}$, find the distance $S_h$ the person covers. (Enter $S_h$ in m.)
::: solution
$S_h = v_h(T_r + T_s) = 1.6\times(0.08 + 0.25) = 0.528\,\mathrm m$.
:::
:::

::: exercise Stopping distance at reduced speed {level=1 check="31.25"}
An arm stops with a constant deceleration of $4\,\mathrm{m/s^2}$. What is its braking distance from $0.5\,\mathrm{m/s}$ (excluding the reaction time)? (Enter the distance in mm.)
::: solution
$v^2/(2a) = 0.25/8 = 0.03125\,\mathrm m = 31.25\,\mathrm{mm}$. From $1.0\,\mathrm{m/s}$ it would be four times as long, $125\,\mathrm{mm}$.
:::
:::

::: exercise Effective robot mass {level=1 check="18"}
Using the approximation of ISO/TS 15066, what is the effective mass of an arm whose moving parts total $30\,\mathrm{kg}$, carrying a $3\,\mathrm{kg}$ tool and part? (Enter the mass in kg.)
::: solution
$m_R = M/2 + m_L = 15 + 3 = 18\,\mathrm{kg}$.
:::
:::

::: exercise Intrusion distance of a scanner {level=1 check="1040"}
A safety laser scanner detects legs in a horizontal plane $400\,\mathrm{mm}$ above the floor. What intrusion distance does the ISO 13855 rule $C = 1200\,\mathrm{mm} - 0.4H$ (minimum $850\,\mathrm{mm}$) give? (Enter $C$ in mm.)
::: solution
$C = 1200 - 0.4\times400 = 1040\,\mathrm{mm}$, above the minimum. Raising the scanning plane reduces $C$, but a plane that is too high lets a person crawl underneath, so the standard limits the height.
:::
:::

::: exercise Series failure rates {level=2 check="4e-8"}
A safety function uses a light curtain ($\mathrm{PFH}_D = 2.0\times10^{-8}\,\mathrm{h^{-1}}$, PL e), a safety relay ($5.0\times10^{-9}$, PL e) and a drive's STO ($1.5\times10^{-8}$, PL e) in series. Find the total $\mathrm{PFH}_D$ and the PL. (Enter the total in h⁻¹.)
::: solution
$2.0\times10^{-8} + 0.5\times10^{-8} + 1.5\times10^{-8} = 4.0\times10^{-8}\,\mathrm{h^{-1}}$, within the PL e band ($10^{-8}$ to below $10^{-7}$), and every subsystem is PL e, so the function can reach PL e, subject to the systematic requirements.
:::
:::

::: exercise Permissible speed {level=2 check="1.12"}
Assume (illustrative values) a body region with effective mass $3.0\,\mathrm{kg}$ and spring constant $25\,\mathrm{N/mm}$, a permissible transient force of $280\,\mathrm N$, and a robot effective mass of $15\,\mathrm{kg}$. What is the permissible relative speed by [[#eq-pfl]]? (Enter the speed in m/s.)
::: solution
$\mu = (1/3 + 1/15)^{-1} = (0.4)^{-1} = 2.5\,\mathrm{kg}$; $\sqrt{\mu k} = \sqrt{2.5\times25\,000} = 250\,\mathrm{N\,s/m}$; $v_{\max} = 280/250 = 1.12\,\mathrm{m/s}$.
:::
:::

::: exercise Clamping force from detection delay {level=2 check="150"}
An arm moving at $0.25\,\mathrm{m/s}$ needs $8\,\mathrm{ms}$ to detect a clamping contact. With an assumed body stiffness of $75\,\mathrm{N/mm}$, what force is reached at detection, if the arm keeps its speed until then? (Enter the force in N.)
::: solution
$x = 0.25\times0.008 = 2.0\,\mathrm{mm}$; $F = 75\times2.0 = 150\,\mathrm N$. Halving the detection time or the speed halves it; the stopping distance after detection adds to it.
:::
:::

::: exercise Required performance level {level=2}
For each hazardous situation, find $\mathrm{PL_r}$ from the risk graph described in [[#def-pl]] (S2-F2-P2 → e, S2-F2-P1 → d, S2-F1-P2 → d, S2-F1-P1 → c, S1-F2-P2 → c, S1-F2-P1 → b, S1-F1-P2 → b, S1-F1-P1 → a): (a) a maintenance technician occasionally enters a cell with a 50 kg-payload arm; (b) an operator loads a fixture beside a small collaborative arm many times per hour, with possible pinching of fingers by the gripper; (c) a bystander walks past a cell boundary where a slow conveyor could trap a sleeve. Justify each parameter.
::: solution
(a) A heavy arm can cause serious, irreversible injury (S2); entry is occasional and short (F1); avoidance is unlikely because such an arm moves faster than a person can react (P2): PL d. (b) Pinched fingers by a small gripper are usually slight, reversible injuries (S1) — if the gripper force is limited; exposure is frequent (F2); avoidance is possible since the operator sees the slow gripper (P1): PL b — but if the gripper can crush (high force), S2 applies and the result is PL d. (c) Entanglement on a conveyor can be serious (S2), exposure is frequent for passers-by (F2) but avoidance is possible at low speed (P1): PL d. The point of the exercise is that the parameters must be argued and documented; borderline choices are made conservatively.
:::
:::

::: exercise Deriving the separation distance with variable speeds {level=3}
Generalise [[#prop-ssm]] to an arm whose speed towards the person during the stop decreases linearly from $v_r$ to zero over $T_s$, and a person whose speed is $v_h(t)$. Show that the arm's term becomes $v_rT_r + \tfrac12v_rT_s$, and explain why ISO/TS 15066 nevertheless asks for the *measured* stopping distance $S_s$ rather than this formula.
::: solution
The arm approaches by $\int_{t_0}^{t_0 + T_r}v_r\,dt + \int_{t_0 + T_r}^{t_0 + T_r + T_s}v_r\bigl(1 - (t - t_0 - T_r)/T_s\bigr)dt = v_rT_r + \tfrac12v_rT_s$, and the person by $\int_{t_0}^{t_0 + T_r + T_s}v_h(t)\,dt$, which reduces to $v_h(T_r + T_s)$ for constant speed. So $S_s = \tfrac12v_rT_s$ for constant deceleration. Real arms do not decelerate uniformly: the stopping distance depends on the pose (inertia), the payload, which joints are moving, and the stop category; brakes have engagement delays and torque that varies with temperature and wear; and the distance of interest is that of the arm's nearest point to the person, not of the tool. The standard therefore requires stopping data measured for the relevant conditions (from the manufacturer's data, or measured in the application), and the safety controller can monitor stopping performance and stop the arm harder if it is not achieved.
:::
:::

::: exercise A safety concept for a collaborative palletiser {level=3}
A cobot palletises 12 kg cartons at the end of a packaging line. Operators replace full pallets at two stations on either side of the arm, about every 20 minutes, while the arm continues to work on the other pallet. Propose a safety concept: the hazards, the collaborative method(s) for each zone, the sensors and their placement, the speeds, the safety functions and their PL, and what you would validate by measurement. State your assumptions.
::: solution
One reasonable concept. *Hazards*: impact by the arm and carton (heavy payload: 12 kg plus gripper, so PFL limits would force very low speeds); clamping between carton and pallet or the column; dropped cartons from the vacuum gripper; the pallet-change area. *Method*: not PFL for the main motion — the payload is too heavy and the motion too fast. Use SSM (or zone-based SMS) with area sensing: a safety laser scanner per station, or light curtains at the station entrances with muting, dividing each side into a warning field (arm slows to a reduced speed and restricts itself to the far pallet by safe position limiting) and a protective field (arm stops if it is in, or could reach, that side). *Distances*: computed by [[#eq-ssm]] with the measured stopping data at the reduced speed and full payload, ISO 13855 approach speeds and intrusion distances, and the scanner's tolerance zone; the arm's safe zone limit keeps it physically on the far side while a person is at the near pallet, so that the person never shares the reachable space. *Safety functions*: protective stop (category 1 with monitored deceleration, fallback category 0), safely limited position (keep-out zone for the occupied side), safely limited speed, vacuum loss detection with the gripper designed to hold through an emergency stop or a mechanical carton support. Each $\mathrm{PL_r}$ from the risk graph — likely d (S2, F2, P1) — implemented in category 3. *Validation*: functional tests of every field and zone, measurement of stopping distances at the configured speeds and payloads, verification of the zone limits with the heaviest carton at the largest extension, and periodic re-test (scanner fields, brake tests). The concept is an example of applying the principles of this chapter; a real palletiser is designed and validated to the current standards by qualified engineers.
:::
:::

## Further reading

The standards themselves — ISO 12100, ISO 10218-1 and -2 (current editions), ISO/TS 15066, ISO 13849-1 and -2, ISO 13850, ISO 13855, IEC 60204-1 and IEC 61800-5-2 — are the primary sources and must be used for design. The robot-safety chapter of the *Springer Handbook of Robotics* explains the background of collaborative safety and the injury research behind it. National occupational-safety bodies and robot industry associations publish guidance documents and case studies that show how the standards are applied to real cells.
