[[robot-arm-design/arm-specification]] turned a payload and reach into a list of numbers for every joint: a peak torque, a continuous (rms) torque, a top speed and an angular repeatability. This chapter chooses the parts that deliver them — the motor, the electronics that drive it and the encoders that tell the controller where it is. Three families of motor turn up in arms, and they correspond roughly to three kinds of arm: **hobby servos** in desktop and educational arms, **stepper motors** in low-cost arms and 3D-printer-derived designs, and **brushless permanent-magnet motors** under field-oriented control in every industrial and collaborative arm. We look at what each can and cannot do, then go deeply into the brushless joint: its constants, its thermal limits, field-oriented control, the drive and its bus voltage, and the encoders. The motor models of [[mechatronics/electric-actuators]] (torque constant, back-emf, the DC-motor equations) and the encoder basics of [[mechatronics/sensors]] are assumed; here they are applied to a joint.

## What a joint actuator has to do {#sec-requirements}

A robot joint is a demanding place for a motor. From the shoulder of the example arm in [[robot-arm-design/arm-specification]], the joint output must give about $180\,\mathrm{N\,m}$ peak and $100\text{–}130\,\mathrm{N\,m}$ continuous at speeds up to $3.1\,\mathrm{rad/s}$, and it must do so

- **at zero speed for long periods**, holding the arm against gravity — a load that produces heat but no mechanical work;
- **smoothly at very low speed**, because the arm creeps when it approaches a part or follows a slow path, and torque ripple shows up directly at the tool;
- **with known position at power-up**, because an arm that must be homed by driving each joint to a switch is a nuisance at best and dangerous in a crowded cell;
- **with low mass and small size**, because the actuator is payload for every joint behind it;
- **with a brake** that holds the arm when the power is off.

Torque density (torque per kilogram), the ability to make torque at standstill without overheating, and the quality of the position measurement are therefore the figures of merit, more than efficiency or top speed.

## Hobby servos {#sec-hobby}

A **hobby (RC) servo** is a complete position servo in a plastic box: a small brushed DC motor, a spur-gear train of ratio a few hundred, a potentiometer on the output shaft and a small controller that compares the potentiometer voltage with a commanded position. The command is a pulse every $20\,\mathrm{ms}$ whose width, typically $1.0$ to $2.0\,\mathrm{ms}$ (some servos accept $0.5$ to $2.5\,\mathrm{ms}$), maps to the output angle over a range of about $90°$ to $180°$.

Torque is quoted as **stall torque** in kg·cm at a stated supply voltage ($1\,\mathrm{kg\,cm} = 9.81\,\mathrm{N}\times0.01\,\mathrm m = 0.0981\,\mathrm{N\,m}$). Stall torque is the torque that stops the motor dead at full voltage; it is not a continuous rating, and a servo holding a load near its stall torque overheats within minutes.

Hobby servos are excellent for learning: cheap, self-contained, and enough for a desktop arm with a payload of a hundred grams or so. Their limits are equally clear. The controller is a proportional loop with a deadband: the output settles anywhere within about $\pm1°$ of the target, and gear backlash adds as much again. The user has no access to the motor current, so the servo cannot be torque-controlled and cannot sense a collision. Standard servos give no position feedback to the outside — the controller just assumes the servo got there. "Smart" serial-bus servos improve on this by reporting position, load (an estimate of current) and temperature, and accepting speed and torque limits; they are the usual step up for small arms.

::: example Payload of a desktop arm with hobby servos {#ex-hobby}
A desktop arm uses a servo rated $20\,\mathrm{kg\,cm}$ stall at the shoulder. Beyond the shoulder, held horizontal, are the upper link ($0.15\,\mathrm{kg}$ at $0.10\,\mathrm m$), the elbow servo ($0.06\,\mathrm{kg}$ at $0.15\,\mathrm m$) and the forearm with wrist and gripper ($0.05\,\mathrm{kg}$ at $0.22\,\mathrm m$). The payload is held $0.30\,\mathrm m$ from the shoulder axis. Using half the stall torque as the usable holding torque, what payload can the arm hold?
::: solution
Stall torque $T_s = 20\times0.0981 = 1.96\,\mathrm{N\,m}$; usable $0.98\,\mathrm{N\,m}$. The arm's own gravity torque is $9.81\,(0.15\times0.10 + 0.06\times0.15 + 0.05\times0.22) = 9.81\times0.035 = 0.343\,\mathrm{N\,m}$. The payload may add $0.98 - 0.343 = 0.637\,\mathrm{N\,m}$, so $m = 0.637/(9.81\times0.30) = 0.217\,\mathrm{kg}$ — about $200\,\mathrm g$.

*Sanity check*: desktop arms built from such servos are typically sold with payloads of a few hundred grams at a reach of about $0.3\,\mathrm m$, consistent with this estimate. The arm's own structure uses a third of the usable torque even though it weighs only $0.26\,\mathrm{kg}$.
:::
:::

## Stepper motors and why they are weak in arms {#sec-steppers}

A hybrid stepper motor ([[mechatronics/electric-actuators]]) has a rotor with typically $50$ teeth and two phases, giving $200$ full steps per revolution. Steppers are attractive for small arms because they are cheap, produce high torque at low speed for their size, and position open-loop by counting steps. Several low-cost arms, especially those derived from 3D-printer electronics, use them. Their weaknesses in a robot joint follow from how they make torque.

::: proposition Static torque–angle characteristic of a hybrid stepper {#prop-stepper}
With the phase currents held fixed (at a step or microstep position), a hybrid stepper with $N_r$ rotor teeth produces a restoring torque that is approximately sinusoidal in the deviation $\theta$ of the rotor from its equilibrium:
$$
T(\theta) = -T_h\sin(N_r\theta),
$$ {#eq-stepper-torque}
where $T_h$ is the holding torque. A steady load torque $T_L < T_h$ therefore displaces the rotor by the **load angle** $\theta_L = \arcsin(T_L/T_h)/N_r$, and the small-signal stiffness about equilibrium is $k = N_rT_h$.
:::

::: proof
The torque comes from the variation of the magnetic co-energy with rotor position. The rotor and stator teeth have the same pitch, $2\pi/N_r$ mechanical, so the co-energy, and hence the torque, is periodic in $\theta$ with that period; with the usual tooth shapes the fundamental harmonic dominates, giving $T = -T_h\sin(N_r\theta)$ (the minus sign because the torque pulls the rotor back to $\theta = 0$). In equilibrium with a load, $T_h\sin(N_r\theta_L) = T_L$, giving $\theta_L$. The stiffness is $-\mathrm dT/\mathrm d\theta$ at $\theta = 0$, which is $N_rT_h$.
:::

Three consequences matter for arms.

1. **The position error grows with load and is invisible to the controller.** A stepper at half its holding torque sits $\arcsin(0.5)/50 = 0.0105\,\mathrm{rad} = 0.6°$ — a third of a full step — away from where the step count says it is. Microstepping does not help: it moves the equilibrium, not the stiffness.
2. **Beyond $T_h$ the rotor slips.** If the load exceeds the available torque, during a collision or an over-ambitious acceleration, the rotor jumps to the next stable position four full steps away ($2\pi/N_r$), the step count no longer matches the position, and every later move is wrong until the arm is homed. Available torque falls steeply with speed, so slips happen mostly in fast moves.
3. **There is no torque control.** The driver sets the phase current, not the torque, so a stepper arm cannot be made compliant, cannot detect contact from current and cannot compensate gravity: it simply runs at full current all the time, holding or not, and gets hot.

**Closed-loop steppers**, with an encoder and a driver that adjusts the current and the commutation angle to the measured rotor position, remove the lost-step problem and the constant-current heating. They then behave as a high-pole-count brushless motor (a stepper *is* a 50-pole-pair synchronous motor) with a crude drive, and they remain heavier and less smooth than a brushless joint of the same torque. They are a sensible choice for low-cost arms where torque ripple and torque control do not matter.

::: quiz
A stepper-driven arm stops an unexpected $2\,\mathrm{mm}$ low after picking up a heavier part than usual, but its controller reports that the joint is exactly at the commanded step count. What is the most likely explanation?
- [ ] The step count is wrong because a step was lost
- [x] The higher gravity torque increased the load angle of the shoulder stepper
- [ ] The microstep resolution is too coarse
- [ ] The encoder is misaligned
::: solution
The controller is right about the step count; the rotor sits behind its electrical equilibrium by $\theta_L = \arcsin(T_L/T_h)/N_r$, and a larger $T_L$ increases it. At $0.6°$ of rotor angle through a $20{:}1$ reduction that is $0.03°$ at the joint, $0.5\,\mathrm{mm}$ at $1\,\mathrm m$ — and more with a lower ratio or a load closer to $T_h$. A lost step would be a jump of $7.2°$ of rotor angle, and an open-loop stepper has no encoder.
:::
:::

## Brushless joint motors {#sec-brushless}

Industrial and collaborative arms use **permanent-magnet synchronous motors** (PMSM; the terms brushless DC and brushless AC servo are used loosely for the same machines): magnets on the rotor, a three-phase winding on the stator where its heat can be conducted away, and electronic commutation from an encoder. In a joint they come in two forms. A **housed servo motor** with its own bearings, shaft and encoder bolts to a gearbox; it is the norm on large industrial arms. A **frameless** (kit) motor is just a stator ring and a rotor ring, built straight into the joint housing on the joint's own bearings; with a hollow rotor it leaves the centre free for cables, and it is the norm in compact collaborative joints. Frameless motors for joints have many poles (typically 8–20 pole pairs) and are short and of large diameter, because torque at a given current density grows roughly with the square of the air-gap diameter.

### Torque and voltage constants of a three-phase motor

For a single DC motor $K_t = K_e$ in SI units ([[mechatronics/electric-actuators]]). Three-phase data sheets complicate this because they mix peak and rms values and phase and line-to-line quantities.

::: proposition Torque and back-emf constants of a PMSM {#prop-kt-ke}
A PMSM with $p$ pole pairs and magnet flux linkage $\psi_m$ per phase (peak), driven with sinusoidal phase currents of amplitude $\hat\imath$ in phase with the back-emf (that is, $i_d = 0$), produces torque
$$
T = \tfrac32\,p\,\psi_m\,\hat\imath = \tfrac{3}{\sqrt2}\,p\,\psi_m\,I_{\text{rms}} .
$$ {#eq-pmsm-kt}
The phase back-emf has amplitude $p\psi_m\omega$, so the line-to-line back-emf constant is $K_{e,LL}^{\text{rms}} = \sqrt{3/2}\,p\psi_m$ in $\mathrm{V_{rms}\,s/rad}$. Hence
$$
K_t^{\text{rms}} = \sqrt3\,K_{e,LL}^{\text{rms}},\qquad K_t^{\text{pk}} = \tfrac{\sqrt3}{2}\,K_{e,LL}^{\text{pk}},
$$ {#eq-kt-ke}
where $K_t^{\text{rms}}$ is torque per rms phase ampere and $K_t^{\text{pk}}$ torque per peak phase ampere.
:::

::: proof
The phase back-emfs are $e_k = p\psi_m\omega\cos(\theta_e - 2\pi k/3)$, $k = 0, 1, 2$, and with $i_d = 0$ the currents are $i_k = \hat\imath\cos(\theta_e - 2\pi k/3)$. The electrical power converted is $\sum_k e_ki_k = p\psi_m\omega\hat\imath\sum_k\cos^2(\theta_e - 2\pi k/3) = \tfrac32p\psi_m\omega\hat\imath$, since the three $\cos^2$ terms sum to $3/2$ for every $\theta_e$. Equating to $T\omega$ (power balance, as in the DC motor) gives [[#eq-pmsm-kt]], with $\hat\imath = \sqrt2I_{\text{rms}}$. The line-to-line emf is the difference of two phase emfs $120°$ apart, of amplitude $\sqrt3$ times the phase amplitude: $\hat e_{LL} = \sqrt3p\psi_m\omega$, so $K_{e,LL}^{\text{pk}} = \sqrt3p\psi_m$ and $K_{e,LL}^{\text{rms}} = \sqrt{3/2}\,p\psi_m$. Dividing: $K_t^{\text{rms}}/K_{e,LL}^{\text{rms}} = (3/\sqrt2)/\sqrt{3/2} = \sqrt3$ and $K_t^{\text{pk}}/K_{e,LL}^{\text{pk}} = (3/2)/\sqrt3 = \sqrt3/2$.
:::

Note that the torque is constant in time — the three phase contributions sum to a constant — which is why a sinusoidally driven PMSM has no inherent commutation ripple. What ripple remains comes from **cogging** (the magnets' attraction to the stator teeth, present even with no current), from non-sinusoidal back-emf, and from errors in current measurement and encoder angle. Joint motors are designed for low cogging (skewed magnets or slots, fractional-slot windings), and residual ripple at the joint is reduced further by the gear ratio.

::: warning Check the convention of every motor constant
Two data sheets for similar motors may quote "$K_t = 0.11\,\mathrm{N\,m/A}$" and "$K_t = 0.078\,\mathrm{N\,m/A}$" for the same machine: the first per rms ampere, the second per peak ampere ($0.11/\sqrt2 = 0.078$). Back-emf constants are given per phase or line-to-line, peak or rms, in $\mathrm{V/(rad/s)}$ or $\mathrm{V/krpm}$. A drive configured with the wrong convention mis-scales its current limit by $\sqrt2$, its torque estimate by $\sqrt2$ or $\sqrt3$, and its field-weakening point accordingly. Write down the convention next to every constant, and check it with [[#eq-kt-ke]]: measure the line-to-line back-emf by spinning the motor, and the torque per ampere on a test bench, and see whether they agree.
:::

### Copper loss, the motor constant and the thermal limit

Holding the arm still converts no power, yet the current flowing through the winding dissipates heat. The figure of merit for that is the **motor constant**.

::: definition Motor constant {#def-km}
The **motor constant** $K_m$ is the torque produced per square root of copper loss:
$$
K_m = \frac{T}{\sqrt{P_{\text{Cu}}}},\qquad P_{\text{Cu}} = 3I_{\text{rms}}^2R_{ph} = \tfrac32I_{\text{rms}}^2R_{LL},
$$ {#eq-km}
in $\mathrm{N\,m/\sqrt W}$, so that $K_m = K_t^{\text{rms}}/\sqrt{3R_{ph}}$ with $R_{ph}$ the phase resistance and $R_{LL} = 2R_{ph}$ the line-to-line resistance of a star-connected winding. $K_m$ does not depend on the number of turns (rewinding a motor for a different voltage changes $K_t$ and $R$ together) and grows steeply with motor size, roughly with the motor's volume to the power $5/6$ for geometrically similar motors.
:::

The continuous torque rating is the torque at which the copper loss (plus iron and friction losses) heats the winding to its permitted temperature at a stated ambient and mounting. In steady state the winding sits above ambient by $\Delta T = P R_{th}$, where $R_{th}$ is the thermal resistance from winding to ambient in K/W, and it approaches that rise with a thermal time constant $\tau_{th}$ — seconds for the winding relative to the stator, minutes to tens of minutes for the whole motor and joint housing. Two temperature effects close a feedback loop: copper resistance rises by about $0.39\,\%$ per kelvin, increasing the loss, and the remanence of NdFeB magnets falls by about $0.1\,\%$ per kelvin, decreasing $K_t$ so that more current is needed for the same torque.

The **peak torque** is a different limit: the drive's current limit, magnetic saturation (torque stops rising in proportion to current, typically above two to four times the continuous current) and the current that would demagnetise the magnets. It can be held only for the time the winding takes to heat up — a second or a few seconds.

::: example Choosing a frameless motor for the shoulder {#ex-frameless}
The shoulder of the example arm needs $180\,\mathrm{N\,m}$ peak and $130\,\mathrm{N\,m}$ continuous at the joint output through a reducer of ratio $N = 100$ and efficiency $0.80$. A candidate frameless motor has $K_t = 0.11\,\mathrm{N\,m/A_{rms}}$, $K_m = 0.35\,\mathrm{N\,m/\sqrt W}$ and, in the joint housing, $R_{th} = 2.0\,\mathrm{K/W}$ from winding to a $40\,°\mathrm C$ ambient; $K_m$ is quoted at a winding temperature of $20\,°\mathrm C$. Find the motor torques, currents and copper losses, and the steady winding temperature under the continuous torque.
::: solution
*Motor torques*: $T_{m,\text{cont}} = 130/(100\times0.80) = 1.63\,\mathrm{N\,m}$, $T_{m,\text{pk}} = 180/80 = 2.25\,\mathrm{N\,m}$.

*Currents*: $I_{\text{cont}} = 1.63/0.11 = 14.8\,\mathrm{A_{rms}}$; $I_{\text{pk}} = 2.25/0.11 = 20.5\,\mathrm{A_{rms}}$ ($28.9\,\mathrm A$ peak per phase).

*Copper loss at $20\,°\mathrm C$*: $P = (T/K_m)^2 = (1.63/0.35)^2 = 21.6\,\mathrm W$ continuous, $(2.25/0.35)^2 = 41.3\,\mathrm W$ at peak.

*Winding temperature*: the first estimate is $40 + 2.0\times21.6 = 83\,°\mathrm C$. At $83\,°\mathrm C$ the resistance is $1 + 0.0039\times63 = 1.25$ times its $20\,°\mathrm C$ value, so the loss is $27\,\mathrm W$ and the temperature $94\,°\mathrm C$; iterating $T_w = 40 + 2.0\times21.6\,[1 + 0.00393(T_w - 20)]$ converges to $T_w = 96\,°\mathrm C$, $P = 28\,\mathrm W$. (Directly: $T_w = (40 + 43.1\times(1 - 0.0786))/(1 - 43.1\times0.00393) = 96\,°\mathrm C$.)

Whether $96\,°\mathrm C$ is acceptable depends on the insulation class and, more often in a joint, on the neighbours: a strain-wave reducer's grease, the encoder electronics and a housing people may touch. Joint designers commonly keep housings that people may touch well below $60\,°\mathrm C$ and windings well below the insulation limit. If the margin is too small, the options are a motor with a higher $K_m$ (larger, heavier), a better thermal path into the arm structure (lower $R_{th}$), or a lower continuous torque — for example, a brake during long waits ([[robot-arm-design/arm-specification]]).

*Sanity check*: $28\,\mathrm W$ of heat in a joint is about the power of a soldering iron in a fist-sized housing; it is plausible that this needs attention.
:::
:::

::: widget plot
title: Winding temperature under a continuous torque
f: 40 + 2*(T/0.35)^2*(1 - exp(-x/tau)); 100 + 0*x
x: 0, 3600
y: 20, 180
sliders: T=1.63:0:3:0.05; tau=600:60:1800:60
labels: T_w\ (°\mathrm C); \text{limit}
caption: Winding temperature (°C) of the motor of [[#ex-frameless]] against time in seconds, starting cold at 40 °C, for a constant motor torque $T$ (N·m), with thermal time constant $\tau$ (s); the resistance rise with temperature is neglected here, which underestimates the final temperature by about 13 K at the continuous torque. The flat line is an example design limit. Raise $T$ to the peak $2.25\,\mathrm{N\,m}$: the final temperature exceeds the limit, but it takes many minutes to get there, which is why short peaks are allowed. The final rise grows with $T^2$.
:::

## Field-oriented control {#sec-foc}

The motor makes torque in proportion to the component of the stator current that is at right angles (in electrical angle) to the magnet flux. **Field-oriented control** (FOC) measures the phase currents, expresses them in a frame that rotates with the rotor, and regulates the two components there with ordinary PI controllers. The transformations are linear and fast — a few microseconds on a motor-control microcontroller — and they turn a three-phase AC machine into something that behaves like a DC motor with two independent currents.

::: definition Clarke and Park transformations {#def-clarke-park}
For phase currents $i_a$, $i_b$, $i_c$ with $i_a + i_b + i_c = 0$, the (amplitude-invariant) **Clarke transformation** gives the components in a stationary orthogonal frame,
$$
i_\alpha = i_a,\qquad i_\beta = \frac{i_a + 2i_b}{\sqrt3},
$$ {#eq-clarke}
and the **Park transformation** rotates them into the frame aligned with the rotor's magnet axis ($d$, direct) and the axis $90°$ electrical ahead of it ($q$, quadrature):
$$
\begin{aligned}
i_d &= \phantom{-}i_\alpha\cos\theta_e + i_\beta\sin\theta_e,\\
i_q &= -i_\alpha\sin\theta_e + i_\beta\cos\theta_e .
\end{aligned}
$$ {#eq-park}
Here $\theta_e = p\,\theta_m - \theta_0$ is the **electrical angle**: the mechanical rotor angle from the encoder times the number of pole pairs, minus the offset $\theta_0$ between the encoder's zero and the magnet axis. Balanced sinusoidal currents of constant amplitude, rotating with the rotor, become constant $i_d$ and $i_q$.
:::

In the $dq$ frame the motor obeys
$$
\begin{aligned}
v_d &= R\,i_d + L_d\frac{\mathrm di_d}{\mathrm dt} - \omega_eL_q\,i_q,\\
v_q &= R\,i_q + L_q\frac{\mathrm di_q}{\mathrm dt} + \omega_eL_d\,i_d + \omega_e\psi_m,\\
T &= \tfrac32\,p\,\bigl[\psi_m\,i_q + (L_d - L_q)\,i_di_q\bigr],
\end{aligned}
$$ {#eq-dq-model}
with $\omega_e = p\omega$ and phase quantities $R$, $L_d$, $L_q$ (amplitude-invariant scaling). For the surface-magnet motors common in joints $L_d \approx L_q$, the reluctance term vanishes and $T = \tfrac32p\psi_mi_q$: torque is proportional to $i_q$ alone, and $i_d$ is held at zero to avoid wasting current. A negative $i_d$ opposes the magnet flux and is used for **field weakening**, which lowers the back-emf and lets the motor run faster than the bus voltage would otherwise allow, at the cost of extra current.

::: algorithm One cycle of field-oriented current control {#alg-foc}
At every PWM period (typically $10\text{–}40\,\mathrm{kHz}$ in joint drives, i.e. every $25\text{–}100\,\mathrm{\mu s}$):
1. Sample two phase currents (the third is $-i_a - i_b$) in the middle of the PWM period, when switching noise is lowest, and read the rotor angle from the encoder.
2. Compute $\theta_e = p\theta_m - \theta_0$, apply Clarke [[#eq-clarke]] and Park [[#eq-park]] to get $i_d$, $i_q$.
3. Compare with the references: $i_q^* = T^*/(\tfrac32p\psi_m)$ from the torque command of the velocity loop, and $i_d^* = 0$ (or negative in field weakening).
4. Run two PI controllers to get $v_d^*$, $v_q^*$, adding the decoupling feedforward $-\omega_eL_qi_q$ and $\omega_eL_di_d + \omega_e\psi_m$ from [[#eq-dq-model]] so that each PI sees only $R + Ls$.
5. Limit the voltage vector to what the bus can supply, $\sqrt{v_d^2 + v_q^2} \le V_{dc}/\sqrt3$, with anti-windup on the integrators.
6. Apply the inverse Park and Clarke transformations and compute the PWM duty cycles (space-vector modulation), compensating the drive's dead time.
:::

::: example From phase currents to torque {#ex-foc}
At an instant when the electrical angle is $\theta_e = 30°$, the drive measures $i_a = -5.0\,\mathrm A$ and $i_b = 10.0\,\mathrm A$. Find $i_d$, $i_q$, and the torque if $p\psi_m = 0.0519\,\mathrm{V\,s/rad}$ (the motor of [[#ex-frameless]]).
::: solution
$i_c = -i_a - i_b = -5.0\,\mathrm A$. Clarke: $i_\alpha = -5.0\,\mathrm A$, $i_\beta = (-5.0 + 20.0)/\sqrt3 = 8.660\,\mathrm A$. Park with $\cos30° = 0.8660$, $\sin30° = 0.5$:
$$
\begin{aligned}
i_d &= -5.0(0.8660) + 8.660(0.5) = -4.330 + 4.330 = 0,\\
i_q &= 5.0(0.5) + 8.660(0.8660) = 2.5 + 7.5 = 10.0\,\mathrm A.
\end{aligned}
$$
So the current vector is pure $q$-axis current of amplitude $10\,\mathrm A$ (peak), and $T = \tfrac32\times0.0519\times10.0 = 0.778\,\mathrm{N\,m}$.

*Check against the rms constant*: $10\,\mathrm A$ peak is $7.07\,\mathrm A_{\text{rms}}$, and $0.11\times7.07 = 0.778\,\mathrm{N\,m}$. ✓
:::
:::

::: widget plot
title: Phase currents from d and q currents
f: id*cos(x*pi/180) - iq*sin(x*pi/180); id*cos(x*pi/180 - 2*pi/3) - iq*sin(x*pi/180 - 2*pi/3); id*cos(x*pi/180 + 2*pi/3) - iq*sin(x*pi/180 + 2*pi/3)
x: 0, 720
y: -15, 15
sliders: iq=10:-15:15:0.5; id=0:-15:15:0.5
labels: i_a; i_b; i_c
vlines: 30
caption: The three phase currents (A) that a drive produces for constant $i_d$ and $i_q$, against the electrical angle $\theta_e$ in degrees (two electrical revolutions). At $\theta_e = 30°$ (vertical line) with $i_q = 10$, $i_d = 0$ you can read off the currents of [[#ex-foc]]: $-5$, $10$, $-5\,\mathrm A$. Change $i_d$: the sinusoids shift in phase and grow in amplitude $\sqrt{i_d^2 + i_q^2}$, while the torque (which depends only on $i_q$ in a surface-magnet motor) is unchanged — the extra current is pure loss unless it is needed for field weakening.
:::

The angle offset $\theta_0$ matters as much as the current measurement. If the drive's idea of the magnet axis is off by $\delta$, what it calls $i_q$ is really $i_q\cos\delta$ of torque-producing current, so torque per ampere falls by $1 - \cos\delta$ and a component $i_q\sin\delta$ goes into the $d$ axis. A $10°$ error costs only $1.5\,\%$ of torque but $17\,\%$ of the current goes into the wrong axis; at $90°$ the motor makes no torque at all, and with a wrong sign the velocity loop runs away. Drives therefore find $\theta_0$ at commissioning (by applying a current along a fixed axis and letting the rotor align with it) and store it, which is one reason joint encoders are absolute.

## Drives and bus voltage {#sec-drives}

The **drive** (servo amplifier, inverter) is a three-phase bridge of six power switches, current sensors, a microcontroller running [[#alg-foc]] and the loops above it, gate drivers, and protection (over-current, over-voltage, over-temperature, short-circuit). Two architectures dominate arms:

- **Low-voltage drives**, with a $24\text{–}60\,\mathrm V$ DC bus, usually $48\,\mathrm V$. Common in collaborative arms, where the drive sits inside each joint (an **integrated joint module**), the bus runs through the arm, and the extra-low voltage simplifies electrical safety. The switches are MOSFETs, and gallium-nitride transistors are increasingly used (as of 2026) because they switch faster with lower loss, allowing smaller drives.
- **High-voltage drives**, with a DC bus of about $300\,\mathrm V$ (from $230\,\mathrm V$ single-phase mains) or $560\text{–}700\,\mathrm V$ (from $400\text{–}480\,\mathrm V$ three-phase), with IGBT or silicon-carbide switches. Common in industrial arms, where the drives sit in the controller cabinet and the motor power runs through the arm's cables. The higher voltage lets the same motor reach higher speeds with less current in the cables.

The bus voltage limits speed because the drive must overcome the motor's back-emf. With space-vector modulation the largest phase-voltage amplitude available is $V_{dc}/\sqrt3$; in steady state with $i_d = 0$, the needed phase-voltage amplitude is the magnitude of $\bigl(R\hat\imath + \omega_e\psi_m,\ \omega_eL\hat\imath\bigr)$ from [[#eq-dq-model]] (the $q$ and $d$ components).

::: example Is a 48 V bus enough? {#ex-bus}
The motor of [[#ex-frameless]] has $p = 10$ pole pairs, phase resistance $R = 0.033\,\Omega$ and phase inductance $L = 0.10\,\mathrm{mH}$, and $p\psi_m = 0.0519\,\mathrm{V\,s/rad}$. The joint must reach $3.14\,\mathrm{rad/s}$ through $N = 100$ while delivering its peak torque ($\hat\imath = 28.9\,\mathrm A$). Check whether $48\,\mathrm V$ and $24\,\mathrm V$ buses are sufficient, allowing $95\,\%$ of the theoretical voltage for dead time and margin.
::: solution
Motor speed $\omega = 314\,\mathrm{rad/s}$ ($3000\,\mathrm{rev/min}$); electrical speed $\omega_e = 10\times314 = 3140\,\mathrm{rad/s}$.
Back-emf amplitude: $p\psi_m\omega = 0.0519\times314 = 16.3\,\mathrm V$. Resistive drop: $0.033\times28.9 = 0.95\,\mathrm V$. Inductive drop: $\omega_eL\hat\imath = 3140\times1.0\times10^{-4}\times28.9 = 9.09\,\mathrm V$, at right angles.
$$
\hat v = \sqrt{(16.3 + 0.95)^2 + 9.09^2} = 19.5\,\mathrm V .
$$
Available: $0.95\times48/\sqrt3 = 26.3\,\mathrm V$ on $48\,\mathrm V$ — enough, with $35\,\%$ margin. On $24\,\mathrm V$, $0.95\times24/\sqrt3 = 13.2\,\mathrm V$ — not enough; solving $\hat v(\omega) = 13.2\,\mathrm V$ shows that at peak torque the motor would reach only about $208\,\mathrm{rad/s}$, a joint speed of $2.1\,\mathrm{rad/s}$ ($119\,\mathrm{°/s}$) instead of $180\,\mathrm{°/s}$.

*Observation*: with 10 pole pairs at $3000\,\mathrm{rev/min}$ the inductive drop is more than half the back-emf. High-pole-count joint motors are voltage-limited by inductance at speed, which is why drives use field weakening, or why the winding is chosen with fewer turns (lower $K_t$, higher current) for a low-voltage bus.
:::
:::

When the arm decelerates or lowers a load, the motors act as generators and return energy to the bus. A low-voltage bus with a modest capacitor cannot absorb much: stopping the shoulder of the example arm from $3.14\,\mathrm{rad/s}$ releases $\tfrac12\times7.03\times3.14^2 = 35\,\mathrm J$ of kinetic energy (less losses), while a $2\,\mathrm{mF}$ bus capacitor rising from $48$ to $56\,\mathrm V$ stores only $0.83\,\mathrm J$. The energy must go to the other joints, back to the supply (if it can accept it) or into a **brake resistor** switched by a chopper when the bus voltage rises — a standard part of every arm's power design and a common source of over-voltage trips during commissioning.

## Encoders {#sec-encoders}

The encoder tells the drive the rotor angle for commutation, the velocity loop the speed, and the position loop the joint angle. [[mechatronics/sensors]] introduces incremental and absolute encoders; here we consider what a joint needs.

::: definition Incremental and absolute joint encoders {#def-encoders}
An **incremental** encoder outputs two square waves in quadrature (A and B), and often an index pulse once per revolution; counting all four edges of each cycle (×4 decoding) gives $4n$ counts per revolution for $n$ lines. It measures *changes* of angle, so the absolute position must be found after power-up by homing. An **absolute** encoder outputs a unique code for every position within one revolution (**single-turn**) or over many revolutions (**multi-turn**, counted by battery-backed electronics, by a gear train of single-turn encoders or by an energy-harvesting Wiegand sensor), usually over a serial interface (SSI, BiSS-C, EnDat and several vendor protocols). **Resolution** is the smallest change reported, $2\pi/2^b$ for a $b$-bit encoder; **accuracy** is the largest difference between reported and true angle over a revolution.
:::

Two sensing principles dominate joints:

- **Optical** encoders read a fine grating on a glass or metal disc or ring with a light source and photodetector array, interpolating the analogue sine and cosine signals between lines. They give the highest resolution and accuracy, but are sensitive to dirt and condensation and must be sealed. Motor-mounted optical encoders of industrial servo motors typically resolve $2^{20}$ to $2^{26}$ counts per revolution (as of 2026).
- **Magnetic** encoders sense a magnet. The cheapest is an **on-axis** design: a diametrically magnetised magnet on the end of the shaft above a Hall-sensor chip, giving typically 12–14 effective bits — excellent for commutation, inadequate for joint position. **Off-axis** designs read a multipole magnetised ring with magnetoresistive or Hall heads and reach 18–20 bits or more; they suit hollow shafts and tolerate dirt and oil. Inductive and capacitive encoders fill similar niches.

Resolution is not accuracy. The largest error of a ring encoder usually comes from mounting: if the ring is off-centre by $e$ on a radius $r$, the reading has a once-per-revolution error of amplitude $e/r$ radians. A $50\,\mathrm{\mu m}$ eccentricity on a $30\,\mathrm{mm}$ radius ring is $1.7\,\mathrm{mrad}$ ($5.7$ arcmin) — over a hundred times the step of a 19-bit encoder. Two read heads $180°$ apart, averaged, cancel the eccentricity error exactly (the error has opposite signs at the two heads), which is why precision joint encoders often use two heads; the remaining error is calibrated by the manufacturer or in the joint.

### One encoder or two {#sec-dual-encoder}

A geared joint can measure its angle on the motor side, on the output side, or both.

- A **motor-side encoder** sees the rotor directly: it is needed for commutation, and because the joint angle is $\theta_m/N$, its resolution at the joint is $N$ times finer. But it measures the joint angle only through the gearbox, so backlash, torsional wind-up under load and the gearbox's own kinematic error ([[robot-arm-design/gear-reducers]]) are invisible to it.
- An **output-side encoder** measures the joint angle after the gearbox, so these errors do not enter the measured position. It needs to be absolute (multi-turn is unnecessary because a joint turns less than a revolution or a few) and of high resolution, since there is no gear ratio to magnify it.

A **dual-encoder joint** has both. The drive commutates and closes the velocity loop on the motor encoder (fine, fast, collocated with the motor torque — see [[robot-arm-design/joint-control]]); the position loop uses the output encoder, or the motor encoder corrected by the slowly varying difference between the two. The difference $\theta_m/N - \theta_{\text{out}}$ is also the torsional deflection of the gearbox, and with the gearbox's stiffness it gives an estimate of the **joint torque** — a cheap substitute for a joint torque sensor, used for collision detection. The output encoder also lets the controller check the motor encoder (and the gearbox) for faults, which safety functions use.

::: example Tip resolution of three encoder arrangements {#ex-encoder}
For the example arm with the TCP $0.90\,\mathrm m$ from the shoulder axis and $N = 100$, find the tip movement corresponding to one count of (a) a 17-bit motor-side encoder, (b) a 19-bit output-side encoder, (c) a 14-bit on-axis magnetic encoder on the output.
::: solution
(a) Joint angle per count $2\pi/(2^{17}\times100) = 4.79\times10^{-7}\,\mathrm{rad}$; tip $0.90\times4.79\times10^{-7} = 0.43\,\mathrm{\mu m}$.
(b) $2\pi/2^{19} = 1.20\times10^{-5}\,\mathrm{rad}$; tip $10.8\,\mathrm{\mu m}$.
(c) $2\pi/2^{14} = 3.83\times10^{-4}\,\mathrm{rad}$; tip $345\,\mathrm{\mu m}$.

Interpretation: (a) is far finer than needed, but its *accuracy* at the joint is that of the gearbox — strain-wave reducers typically have transmission errors of the order of an arcminute ($290\,\mathrm{\mu rad}$, $0.26\,\mathrm{mm}$ at the tip). (b) matches the $\pm0.05\,\mathrm{mm}$ budget of [[robot-arm-design/arm-specification]] only if its accuracy is calibrated to a similar level. (c) is suitable only for commutation or as a coarse check. The design that meets the specification is dual: (a) for the velocity loop, (b) for position.
:::
:::

::: history
The reflected binary code that most absolute encoders use, in which successive values differ in only one bit so that a reading taken across a boundary is never wildly wrong, was patented by Frank Gray of Bell Labs in 1953 (filed 1947) for pulse-code communication, and was soon applied to shaft encoders. Field-oriented control was conceived around 1970 by Felix Blaschke at Siemens and, independently, by Karl Hasse at the Technical University of Darmstadt, but it needed the cheap, fast digital signal processors of the 1980s and 1990s to become standard. Its use in robot joints followed the change from hydraulic and brushed-DC drives to brushless AC servo motors in industrial robots during the 1980s. The integrated joint module — motor, reducer, encoders, brake and drive in one hollow housing — became the building block of collaborative arms in the 2000s and 2010s.
:::

## Where this leads {#sec-leads}

The motor makes torque at the motor shaft and the encoder measures the motor angle; between them and the link lies the reducer, which multiplies the torque, divides the speed, multiplies the motor inertia by $N^2$ and adds backlash, compliance and friction. [[robot-arm-design/gear-reducers]] takes up that part, and [[robot-arm-design/joint-control]] closes the current, velocity and position loops around the whole joint.

::: summary
- Hobby servos are complete position loops with a potentiometer; they are fine for desktop arms but have deadband, backlash and no torque control. Ratings in kg·cm are stall torques: $1\,\mathrm{kg\,cm} = 0.0981\,\mathrm{N\,m}$.
- Steppers hold position against a load with a load-angle error $\arcsin(T_L/T_h)/N_r$, lose steps above $T_h$, run at full current and offer no torque control; closed-loop steppers fix only some of this.
- Brushless PMSM joints (housed or frameless) dominate: $T = \tfrac32p\psi_m\hat\imath$, $K_t^{\text{rms}} = \sqrt3K_{e,LL}^{\text{rms}}$. Check every constant's convention.
- $K_m = T/\sqrt{P_{\text{Cu}}}$ sets the heat produced holding the arm. Continuous torque is a thermal limit ($\Delta T = PR_{th}$, resistance rises 0.39 %/K); peak torque is a current, saturation and demagnetisation limit.
- FOC: Clarke and Park transform the phase currents to $i_d$, $i_q$; PI loops with decoupling regulate them; $T \propto i_q$ in surface-magnet motors; the encoder offset $\theta_0$ must be right.
- The bus voltage limits speed: needed $\hat v = \lvert(R\hat\imath + \omega_e\psi_m,\ \omega_eL\hat\imath)\rvert \le V_{dc}/\sqrt3$. Regenerated energy needs somewhere to go.
- Encoders: incremental need homing, absolute do not; resolution $2\pi/2^b$ is not accuracy; eccentricity error is $e/r$, cancelled by two opposed heads. Dual encoders give fine commutation and velocity on the motor side and true joint angle (and a torque estimate) on the output side.
:::

## Exercises

::: exercise Converting a servo rating {level=1 check="2.4525"}
A hobby servo is rated at $25\,\mathrm{kg\,cm}$ stall torque. Express this in N·m (using $g = 9.81\,\mathrm{m/s^2}$). (Enter the torque in N·m.)
::: solution
$25\,\mathrm{kg\,cm} = 25 \times 9.81\,\mathrm N\times0.01\,\mathrm m = 2.4525\,\mathrm{N\,m}$. Remember it is a stall value; usable continuous torque is perhaps a third to a half of it.
:::
:::

::: exercise Load angle of a stepper {level=1 check="0.6"}
A hybrid stepper with $50$ rotor teeth and holding torque $2.0\,\mathrm{N\,m}$ holds a steady load of $1.0\,\mathrm{N\,m}$. By how much is its rotor displaced from its electrical equilibrium? (Enter the angle in degrees.)
::: solution
$\theta_L = \arcsin(1.0/2.0)/50 = (\pi/6)/50 = 0.01047\,\mathrm{rad} = 0.6°$, one third of a $1.8°$ full step.
:::
:::

::: exercise Copper loss from the motor constant {level=1 check="25"}
A joint motor with $K_m = 0.40\,\mathrm{N\,m/\sqrt W}$ holds a constant torque of $2.0\,\mathrm{N\,m}$. What is its copper loss? (Enter the power in W.)
::: solution
$P = (T/K_m)^2 = (2.0/0.40)^2 = 25\,\mathrm W$. Doubling the torque quadruples the loss — the reason gravity compensation by springs or counterweights is attractive in large arms.
:::
:::

::: exercise Torque constant from a back-emf measurement {level=2 check="0.6616"}
Spinning a PMSM at $1000\,\mathrm{rev/min}$ produces a line-to-line back-emf of $40\,\mathrm V$ rms. Find its torque constant per rms ampere. (Enter $K_t$ in N·m/A, to four decimal places.)
::: solution
$K_{e,LL}^{\text{rms}} = 40/104.72 = 0.3820\,\mathrm{V\,s/rad}$. By [[#eq-kt-ke]], $K_t^{\text{rms}} = \sqrt3\times0.3820 = 0.6616\,\mathrm{N\,m/A_{rms}}$. Per peak ampere it would be $0.6616/\sqrt2 = 0.4678\,\mathrm{N\,m/A}$.
:::
:::

::: exercise Park transformation {level=2 check="3.186"}
At $\theta_e = 45°$ a drive measures $i_a = 3.0\,\mathrm A$ and $i_b = 5.0\,\mathrm A$. Find $i_q$. (Enter $i_q$ in A, to three decimal places.)
::: solution
$i_\alpha = 3.0$, $i_\beta = (3.0 + 10.0)/\sqrt3 = 7.506\,\mathrm A$. $i_q = -3.0\sin45° + 7.506\cos45° = -2.121 + 5.307 = 3.186\,\mathrm A$, and $i_d = 3.0\cos45° + 7.506\sin45° = 7.429\,\mathrm A$. Such a large $i_d$ in a surface-magnet motor at rest would suggest a wrong encoder offset: most of the current is producing no torque.
:::
:::

::: exercise Tip resolution of a cheap encoder {level=2 check="326"}
An arm uses a 14-bit on-axis magnetic encoder on the output of each joint. What tip movement corresponds to one count of the base joint when the TCP is $0.85\,\mathrm m$ from its axis? (Enter the distance in µm, to the nearest µm.)
::: solution
$0.85\times2\pi/2^{14} = 0.85\times3.835\times10^{-4} = 3.26\times10^{-4}\,\mathrm m = 326\,\mathrm{\mu m}$. Even before accuracy is considered, such an arm cannot be repeatable to better than about a third of a millimetre unless it also uses a motor-side encoder.
:::
:::

::: exercise Eccentricity of an encoder ring {level=2 check="0.4"}
An off-axis encoder ring of radius $25\,\mathrm{mm}$ is mounted $10\,\mathrm{\mu m}$ off-centre and read by a single head. What is the amplitude of the once-per-revolution angular error? (Enter it in mrad.) What would a second head at $180°$ do?
::: solution
$e/r = 10\times10^{-6}/0.025 = 4.0\times10^{-4}\,\mathrm{rad} = 0.4\,\mathrm{mrad}$ ($1.4$ arcmin). The two heads see errors of opposite sign; their average cancels the first harmonic exactly, leaving only higher-order errors from the ring's own graduation and shape.
:::
:::

::: exercise Steady winding temperature with resistance rise {level=3 check="96.0"}
Show that if copper loss at $20\,°\mathrm C$ is $P_{20}$, the thermal resistance $R_{th}$, the ambient $T_a$ and the resistance coefficient $\alpha = 0.00393\,\mathrm{K^{-1}}$, the steady winding temperature is $T_w = \dfrac{T_a + P_{20}R_{th}(1 - 20\alpha)}{1 - \alpha P_{20}R_{th}}$, and state when no steady temperature exists. Evaluate it for $P_{20} = 21.56\,\mathrm W$, $R_{th} = 2.0\,\mathrm{K/W}$, $T_a = 40\,°\mathrm C$. (Enter $T_w$ in °C, to one decimal place.)
::: solution
In steady state $T_w = T_a + R_{th}P_{20}[1 + \alpha(T_w - 20)]$. Collect $T_w$: $T_w(1 - \alpha P_{20}R_{th}) = T_a + P_{20}R_{th}(1 - 20\alpha)$, giving the formula. If $\alpha P_{20}R_{th} \ge 1$ there is no positive solution: the loss grows faster with temperature than the cooling, and the winding runs away thermally (in practice until it burns or a protection trips). Here $P_{20}R_{th} = 43.12\,\mathrm K$, $\alpha P_{20}R_{th} = 0.1695$, numerator $40 + 43.12\times0.9214 = 79.73$, so $T_w = 79.73/0.8305 = 96.0\,°\mathrm C$. The magnet's loss of $K_t$ with temperature, neglected here, would raise the current and the temperature a little more.
:::
:::

::: exercise Where does the braking energy go? {level=3}
The shoulder of the example arm (inertia $7.03\,\mathrm{kg\,m^2}$ about the joint) stops from $3.14\,\mathrm{rad/s}$ in $0.3\,\mathrm s$ while also lowering the payload's centre of mass by $0.10\,\mathrm m$ ($5\,\mathrm{kg}$ payload, other masses lowered proportionally, total potential energy released $12\,\mathrm J$). The $48\,\mathrm V$ bus has $2\,\mathrm{mF}$ of capacitance and must stay below $56\,\mathrm V$; the other joints are idle and the supply cannot accept reverse power. Estimate the energy returned, show that the capacitor cannot hold it, and size a brake resistor (resistance and energy rating) that clamps the bus at $56\,\mathrm V$. State your assumptions about losses.
::: solution
Energy available: kinetic $\tfrac12\times7.03\times3.14^2 = 34.7\,\mathrm J$ plus potential $12\,\mathrm J$, about $47\,\mathrm J$. Losses in the reducer (efficiency perhaps $0.7$ when back-driven), copper and drive return maybe $60\,\%$ of it: about $28\,\mathrm J$ in $0.3\,\mathrm s$, an average of about $94\,\mathrm W$, with a peak perhaps twice that at the start of braking. The capacitor between $48$ and $56\,\mathrm V$ absorbs $\tfrac12C(56^2 - 48^2) = 0.83\,\mathrm J$, a thirtieth of what is needed. A brake resistor switched across the bus at $56\,\mathrm V$ must take the peak power: $R \le V^2/P = 56^2/200 = 15.7\,\mathrm\Omega$, say $10\,\mathrm\Omega$ ($314\,\mathrm W$ at $56\,\mathrm V$, comfortably above the peak). Its energy per stop is about $28\,\mathrm J$; at one stop every two seconds the average dissipation is about $14\,\mathrm W$, and its pulse energy rating must exceed $28\,\mathrm J$. Better designs share the energy with other joints that are accelerating at the same moment, or use a bidirectional supply.
:::
:::

::: exercise Choosing actuators for a low-cost teaching arm {level=3}
A company wants a six-axis teaching arm with $0.5\,\mathrm{kg}$ payload, $0.45\,\mathrm m$ reach, ±0.2 mm repeatability and a retail price that rules out frameless motors and strain-wave reducers on every joint. Compare hobby or serial-bus servos, closed-loop steppers with belt or planetary reduction, and small brushless motors with planetary or cycloidal reducers, for (a) the shoulder and (b) the wrist joints. Recommend a combination and say what the users will notice.
::: solution
A good answer computes the shoulder gravity torque (e.g. $0.5\,\mathrm{kg}$ at $0.45\,\mathrm m$ plus about $1.5\,\mathrm{kg}$ of arm at $0.2\,\mathrm m$ gives $9.81\times0.525 \approx 5\,\mathrm{N\,m}$, $8\text{–}10\,\mathrm{N\,m}$ peak), notes that this is beyond the largest hobby servos at useful duty and that ±0.2 mm at $0.45\,\mathrm m$ needs about $0.15\,\mathrm{mrad}$ (30 arcsec) per joint — beyond potentiometer servos. Closed-loop steppers with a belt or low-backlash planetary stage at the shoulder and elbow are a sound cost choice (high torque at low speed, encoder removes lost steps) but give no torque control, so collision detection must use a following-error threshold. Small brushless motors with FOC and a cycloidal or planetary stage cost more but give torque control, quiet motion and current-based collision detection — valuable in a classroom. For the wrist, serial-bus servos with position feedback are adequate at $0.5\,\mathrm{kg}$ if their backlash is acceptable at the short lever ($1°$ at $0.06\,\mathrm m$ is $1\,\mathrm{mm}$ — too much for ±0.2 mm, so a low-backlash stage or output encoder is needed). Users will notice stepper noise and vibration at low speed, a lack of hand-guiding unless brushless joints are used, and the need to home incremental-encoder joints at start-up unless absolute encoders are fitted.
:::
:::
