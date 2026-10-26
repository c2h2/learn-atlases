Electric motors are the muscles of mechatronics. They turn the printer carriage, the robot joint, the camera lens, the car window and the machine-tool spindle, and they are attractive for the same reasons everywhere: electric power is easy to distribute and switch, motors are efficient and clean, and their torque is proportional to a current that power electronics can control in microseconds. The design questions are always the same too. How much torque, at what speed? What does the motor look like to the controller — what is its transfer function? How should it be geared to its load? Which kind of motor, and which drive?

This chapter answers them for the three families used in mechatronic systems: the **brushed DC motor**, whose simple model is the reference for all the others; the **stepper motor**, positioned open-loop by counting steps; and the **brushless (permanent-magnet synchronous) motor**, which dominates servo drives, drones and electric vehicles. It covers the H-bridge drives that feed them, gearing and inertia matching, and sizing a motor for a duty cycle. Electric machines are studied in depth in electrical engineering; here the motor is treated as a component with a model and a data sheet.

## The brushed DC motor {#sec-dc-motor}

A brushed DC motor has a stationary field — permanent magnets in the small motors of mechatronics — and a rotating **armature** winding fed through a mechanical **commutator** and carbon or precious-metal **brushes**. The commutator reverses the current in each armature coil as it passes from under one magnetic pole to the next, so that the force on the conductors always turns the rotor the same way. Two physical laws govern it: a conductor carrying current $i$ in a magnetic field experiences a force ($F = Bli$ per conductor), and a conductor moving through a field has a voltage induced in it ($e = Blv$). Summed over all conductors, these give the two motor equations.

::: definition DC motor constants {#def-motor-constants}
For a permanent-magnet DC motor with armature current $i$ and shaft speed $\omega$:
- the electromagnetic torque is $T = K_t\,i$, with **torque constant** $K_t$ in $\mathrm{N\,m/A}$;
- the **back-emf** induced in the armature is $e = K_e\,\omega$, with **back-emf (speed) constant** $K_e$ in $\mathrm{V\,s/rad}$.

The armature circuit has resistance $R$ (winding and brushes) and inductance $L$. The rotor has moment of inertia $J_m$ about its axis.
:::

::: proposition Equality of the torque and back-emf constants {#prop-kt-ke}
In consistent SI units, $K_t = K_e$; the common value is written $K$. Data sheets often quote the back-emf constant in $\mathrm{V}$ per $1000\ \mathrm{rev/min}$, which must be converted ($1\ \mathrm{V/krpm} = 9.549\times10^{-3}\ \mathrm{V\,s/rad}$).
:::

::: proof
The electrical power absorbed by the back-emf, $ei$, is the power converted from electrical to mechanical form; it must equal the mechanical power developed by the electromagnetic torque, $T\omega$, because the conversion itself stores and dissipates nothing (losses occur in $R$, in friction and in the iron, all accounted for separately). Hence $K_e\omega\,i = K_t i\,\omega$ for all $i$ and $\omega$, so $K_e = K_t$. The conversion factor: $1000\ \mathrm{rev/min} = 1000 \times 2\pi/60 = 104.72\ \mathrm{rad/s}$, so $1\ \mathrm{V/krpm} = 1/104.72\ \mathrm{V\,s/rad}$.
:::

### Steady state: the torque–speed line

::: proposition Steady-state characteristic {#prop-torque-speed}
At constant applied voltage $V$ and in steady state (constant current, so $L\,\mathrm{d}i/\mathrm{d}t = 0$), the speed of a DC motor delivering torque $T$ is
$$
\omega = \frac{V}{K} - \frac{R}{K^2}\,T .
$$ {#eq-torque-speed}
The **no-load speed** is $\omega_0 = V/K$ and the **stall torque** $T_s = KV/R$ (with stall current $V/R$). The mechanical output power $P = T\omega$ is greatest at $T = T_s/2$, $\omega = \omega_0/2$, where $P_{\max} = T_s\omega_0/4$, and if friction is neglected the efficiency is $\eta = \omega/\omega_0 = 1 - T/T_s$.
:::

::: proof
KVL around the armature: $V = Ri + L\,\mathrm{d}i/\mathrm{d}t + K\omega$. In steady state $V = Ri + K\omega$, and with $i = T/K$ this gives $\omega = (V - RT/K)/K$, i.e. [[#eq-torque-speed]]. Setting $T = 0$ gives $\omega_0$; setting $\omega = 0$ gives $T_s$. Writing $\omega = \omega_0(1 - T/T_s)$, the power $P = T\omega_0(1 - T/T_s)$ is a parabola in $T$ with maximum where $\mathrm{d}P/\mathrm{d}T = \omega_0(1 - 2T/T_s) = 0$, i.e. $T = T_s/2$, giving $P_{\max} = \omega_0T_s/4$. The input power is $Vi = VT/K$, so $\eta = T\omega/(VT/K) = K\omega/V = \omega/\omega_0$.
:::

The torque–speed characteristic is a straight line, shifted parallel by the voltage: the voltage sets the speed, the load sets the current. The **motor constant** $K_m = K/\sqrt R$ (torque per square root of copper loss, $T/\sqrt{i^2R}$) is the best single figure of merit for comparing motors of similar size. Note the efficiency result: at maximum power the motor is only $50\,\%$ efficient (half the input is lost in the winding) and it runs hot; continuous operation is at much lower torques, where efficiency is high. Real motors also have friction and iron losses, so the efficiency falls to zero at no load as well as at stall, peaking near $10$–$20\,\%$ of stall torque.

::: example Characterising a small DC motor {#ex-dc-motor}
A permanent-magnet DC motor has $K = 0.050\ \mathrm{N\,m/A}$ and $R = 2.0\ \mathrm{\Omega}$, and is supplied at $24\ \mathrm{V}$. Find (a) the no-load speed, stall current and stall torque, (b) the maximum output power, (c) the speed, current and efficiency when it drives a load of $0.20\ \mathrm{N\,m}$, neglecting friction.
::: solution
(a) $\omega_0 = V/K = 24/0.050 = 480\ \mathrm{rad/s}$ ($4580\ \mathrm{rev/min}$). Stall current $V/R = 12\ \mathrm{A}$, stall torque $KV/R = 0.050 \times 12 = 0.60\ \mathrm{N\,m}$.

(b) $P_{\max} = T_s\omega_0/4 = 0.60 \times 480/4 = 72\ \mathrm{W}$, at $0.30\ \mathrm{N\,m}$ and $240\ \mathrm{rad/s}$.

(c) $\omega = 480 - (2.0/0.0025) \times 0.20 = 480 - 160 = 320\ \mathrm{rad/s}$; $i = 0.20/0.050 = 4.0\ \mathrm{A}$. Input $24 \times 4.0 = 96\ \mathrm{W}$, output $0.20 \times 320 = 64\ \mathrm{W}$, efficiency $67\,\%$ ($= 320/480$); the remaining $32\ \mathrm{W} = i^2R$ heats the winding.

Sanity check: power balance $96 = 64 + 32$. The stall current of $12\ \mathrm{A}$ is a transient condition — dissipating $288\ \mathrm{W}$ in a $72\ \mathrm{W}$ motor would overheat it in seconds — so drives limit the current, and the data sheet's continuous torque rating (set by winding temperature) is far below the stall torque.
:::
:::

::: widget plot
title: DC motor torque–speed characteristic
f: V/0.05 - 800*x; 4*x*(V/0.05 - 800*x)
x: 0, 0.6
y: 0, 500
sliders: V=24:6:24:1
labels: \omega\ \text{(rad/s)}; 4P\ \text{(W)}
caption: Speed (rad/s) and four times the output power (W) against load torque (N·m) for the motor of the example ($K = 0.05\ \mathrm{N\,m/A}$, $R = 2\ \mathrm{\Omega}$) at supply voltage $V$ (volts, on the slider). Lowering the voltage shifts the speed line down in parallel, without changing its slope $R/K^2 = 800\ \mathrm{rad\,s^{-1}/(N\,m)}$; the power parabola peaks at half the stall torque, $KV/(2R)$, whichever voltage is chosen.
:::

### Dynamics

::: proposition DC motor transfer function {#prop-motor-tf}
A DC motor with armature resistance $R$ and inductance $L$, driving a total inertia $J$ (rotor plus reflected load) with viscous friction $b$, has the transfer function from voltage to speed
$$
\frac{\Omega(s)}{V(s)} = \frac{K}{(Ls + R)(Js + b) + K^2} .
$$ {#eq-motor-tf}
When $L$ and $b$ are negligible this is $\dfrac{1/K}{\tau_m s + 1}$ with the **mechanical time constant** $\tau_m = JR/K^2$, and the transfer function to angle is $\dfrac{1/K}{s(\tau_m s + 1)}$. The **electrical time constant** is $\tau_e = L/R$; the first-order approximation holds when $\tau_e \ll \tau_m$.
:::

::: proof
Electrical equation: $V = Ri + L\,\mathrm{d}i/\mathrm{d}t + K\omega$, transformed: $V = (Ls + R)I + K\Omega$. Mechanical equation (free-body diagram of the rotor: motor torque $Ki$, friction torque $-b\omega$, no load torque): $J\,\mathrm{d}\omega/\mathrm{d}t = Ki - b\omega$, i.e. $(Js + b)\Omega = KI$. Eliminating $I = (Js + b)\Omega/K$: $V = [(Ls + R)(Js + b)/K + K]\Omega$, which rearranges to [[#eq-motor-tf]]. With $L = b = 0$: $\Omega/V = K/(RJs + K^2) = (1/K)/(\tau_ms + 1)$. Angle is the integral of speed, which adds the factor $1/s$.
:::

The back-emf acts like viscous damping: in the mechanical equation with $i = (V - K\omega)/R$, the torque contains a term $-(K^2/R)\omega$. This **electrical damping** is why a DC motor driven by a voltage source has a well-damped speed response, and why shorting the terminals of a spinning motor brakes it. It is also the origin of the plant $b/[s(s + a)]$ used in [[mechatronics/mechatronic-systems#prop-p-servo]], with $a = 1/\tau_m$.

If instead the motor is driven by a **current-controlled amplifier** — a fast inner current loop, standard in servo drives — the back-emf no longer matters to the outer loops (the amplifier compensates it), torque follows the command almost instantly, and the motor appears to the position controller as a pure inertia, $\Theta(s)/I(s) = K/(Js^2)$. This is the model used in [[mechatronics/motion-control]].

## Gearing and inertia matching {#sec-gearing}

Motors are most efficient and compact at high speed and low torque; loads usually need the reverse. A **gearhead**, belt or screw of ratio $N$ (motor speed $= N \times$ load speed) multiplies torque by $N$ (less losses) and divides speed by $N$. It also changes the inertia the motor sees: the load inertia $J_L$ moving at $\omega/N$ has kinetic energy $\tfrac12J_L(\omega/N)^2$, so it appears at the motor shaft as the **reflected inertia** $J_L/N^2$. For a screw of lead $p$ moving a mass $m$, the equivalent inertia at the screw is $m(p/2\pi)^2$.

::: proposition Optimum gear ratio for acceleration {#prop-inertia-match}
A motor of inertia $J_m$ producing torque $T_m$ drives a pure inertia $J_L$ through an ideal gear of ratio $N$. The load's angular acceleration,
$$
\alpha_L = \frac{NT_m}{N^2J_m + J_L},
$$ {#eq-load-accel}
is greatest when $N = \sqrt{J_L/J_m}$, i.e. when the reflected load inertia equals the motor inertia; then $\alpha_{L,\max} = T_m/(2\sqrt{J_mJ_L})$.
:::

::: proof
Referred to the motor shaft, the total inertia is $J_m + J_L/N^2$ and the motor acceleration is $\alpha_m = T_m/(J_m + J_L/N^2)$; the load accelerates at $\alpha_L = \alpha_m/N = T_m/(NJ_m + J_L/N) = NT_m/(N^2J_m + J_L)$. Differentiating with respect to $N$: $\mathrm{d}\alpha_L/\mathrm{d}N = T_m(J_L - N^2J_m)/(N^2J_m + J_L)^2$, which vanishes at $N^2 = J_L/J_m$ and changes sign from positive to negative there, so it is a maximum. Substituting, $\alpha_L = \sqrt{J_L/J_m}\,T_m/(2J_L) = T_m/(2\sqrt{J_mJ_L})$.
:::

Inertia matching is a guide, not a rule. It maximises acceleration for a given torque, but at the optimum half the motor's torque is spent accelerating its own rotor. In practice servo designers accept load-to-motor inertia ratios (reflected) up to about $5$–$10$ for good control — larger ratios make the loop sensitive to the compliance of couplings and belts — and choose $N$ also to keep the motor below its maximum speed and to make the continuous torque requirement fit the motor's rating.

::: example Choosing a gear ratio {#ex-gear}
A motor with rotor inertia $J_m = 1.0\times10^{-5}\ \mathrm{kg\,m^2}$ and peak torque $0.40\ \mathrm{N\,m}$ is to accelerate a turntable of inertia $J_L = 4.0\times10^{-3}\ \mathrm{kg\,m^2}$. Find the gear ratio that maximises the turntable's acceleration and the acceleration achieved; compare with $N = 10$ and $N = 40$.
::: solution
$N_{\text{opt}} = \sqrt{4.0\times10^{-3}/1.0\times10^{-5}} = \sqrt{400} = 20$. Then $\alpha_L = 20 \times 0.40/(400 \times 10^{-5} + 4.0\times10^{-3}) = 8.0/8.0\times10^{-3} = 1000\ \mathrm{rad/s^2}$. With $N = 10$: $4.0/(1.0\times10^{-3} + 4.0\times10^{-3}) = 800\ \mathrm{rad/s^2}$; with $N = 40$: $16/(1.6\times10^{-2} + 4.0\times10^{-3}) = 800\ \mathrm{rad/s^2}$.

Sanity check: the optimum is flat — a factor of two either side costs only $20\,\%$ — so the ratio can be chosen for other reasons (top speed: at $N = 20$ a motor limited to $500\ \mathrm{rad/s}$ gives a turntable speed of $25\ \mathrm{rad/s}$; at $N = 10$, $50\ \mathrm{rad/s}$). The symmetric values at $N = 10$ and $40$ follow from [[#eq-load-accel]]: $\alpha_L$ is unchanged when $N$ is replaced by $N_{\text{opt}}^2/N$.
:::
:::

::: widget plot
title: Load acceleration against gear ratio
f: 2*sqrt(r)*x/(x^2 + r)
x: 0, 60
y: 0, 1.1
sliders: r=400:25:2500:25
labels: \alpha_L/\alpha_{L,\max}
caption: Load acceleration, normalised by its maximum, against gear ratio $N$, for a load-to-motor inertia ratio $J_L/J_m = r$ on the slider. The peak lies at $N = \sqrt r$ and is broad: the acceleration stays above $80\,\%$ of the maximum between $N = \sqrt r/2$ and $2\sqrt r$. Gear ratios are therefore usually chosen for speed range, torque rating and backlash, with inertia matching as a check rather than a target.
:::

## Drives: the H-bridge and PWM {#sec-hbridge}

A DC motor needs a voltage of either sign (to drive in both directions) that the controller can vary. The **H-bridge** — four transistor switches arranged as the letter H with the motor across the middle — provides it. Closing the top-left and bottom-right switches applies $+V_s$ to the motor; closing top-right and bottom-left applies $-V_s$; closing both bottom (or both top) switches short-circuits the motor for braking. The two switches on the same side must never be on together (that short-circuits the supply, **shoot-through**), so the gate driver inserts a short **dead time** at each transition, during which the motor current flows through the diodes across the switches (in MOSFETs, their intrinsic body diodes). Because current can flow in either direction through every switch and diode, the bridge can drive and brake in both directions — **four-quadrant** operation — and when braking, the motor acts as a generator and returns energy to the supply, which must be able to absorb it.

The switches are operated by PWM ([[mechatronics/microcontrollers#prop-timer]]). In **sign–magnitude** (unipolar) operation one side is held in a fixed state for the chosen direction and the other side is switched with duty cycle $D$, giving an average motor voltage $DV_s$; in **locked-antiphase** (bipolar) operation the diagonals alternate and the average is $(2D - 1)V_s$, zero at $D = 0.5$. Since the motor's electrical time constant $L/R$ is much longer than the PWM period, the current is nearly constant, with a small triangular ripple.

::: proposition Current ripple in a PWM-driven motor {#prop-ripple}
For sign–magnitude PWM at frequency $f$ with duty cycle $D$ from supply $V_s$, if the PWM period is short compared with $L/R$ and the motor runs at a steady speed, the peak-to-peak current ripple is approximately
$$
\Delta I = \frac{V_s\,D(1 - D)}{Lf},
$$ {#eq-ripple}
largest at $D = 0.5$, where $\Delta I_{\max} = V_s/(4Lf)$.
:::

::: proof
Over one period the back-emf $E$ and the resistive drop are nearly constant. During the on-time $DT$ the motor sees $V_s - E - Ri$, during the off-time (current freewheeling through the low-side switches) $-E - Ri$. In steady state the current returns to its starting value each period, so the average inductor voltage is zero: $D(V_s - E - R\bar i) + (1 - D)(-E - R\bar i) = 0$, i.e. $E + R\bar i = DV_s$. The rise during the on-time is then $\Delta I = (V_s - DV_s)DT/L = V_sD(1 - D)/(Lf)$, neglecting the small change of $Ri$ during the period. The product $D(1 - D)$ is greatest, $\tfrac14$, at $D = \tfrac12$.
:::

The ripple adds to the copper losses ($i_{\text{rms}}^2R$) and to the magnetic losses, and produces torque ripple and audible noise if $f$ is in the audible range. It is reduced by raising $f$ — at the cost of switching losses in the transistors — or by adding series inductance. Low-inductance motors (coreless, "ironless" DC motors, with $L$ of tens of microhenries) need high PWM frequencies for this reason.

::: example Choosing a PWM frequency {#ex-pwm-ripple}
A DC motor with $L = 1.0\ \mathrm{mH}$ and $R = 2.0\ \mathrm{\Omega}$ is driven from $24\ \mathrm{V}$ with sign–magnitude PWM at $20\ \mathrm{kHz}$. Find the worst-case current ripple and compare it with the current at the rated load of $4\ \mathrm{A}$. Would $2\ \mathrm{kHz}$ be acceptable?
::: solution
$\Delta I_{\max} = 24/(4 \times 1.0\times10^{-3} \times 20\,000) = 0.30\ \mathrm{A}$ peak-to-peak, $7.5\,\%$ of $4\ \mathrm{A}$. The approximation holds: $T = 50\ \mathrm{\mu s} \ll L/R = 500\ \mathrm{\mu s}$.

At $2\ \mathrm{kHz}$ the formula gives $3.0\ \mathrm{A}$, but then $T = 500\ \mathrm{\mu s} = L/R$ and the linear-ramp approximation fails (the ripple is somewhat smaller). In any case the ripple is comparable to the load current, the torque pulsates audibly at $2\ \mathrm{kHz}$, and the extra rms current raises the copper losses. $20\ \mathrm{kHz}$ is the better choice.

Sanity check: the ripple of a triangular wave adds $\Delta I^2/12$ to the mean-square current: $0.0075\ \mathrm{A^2}$ at $20\ \mathrm{kHz}$, negligible beside $16\ \mathrm{A^2}$; at $2\ \mathrm{kHz}$ about $0.75\ \mathrm{A^2}$, a $5\,\%$ increase in copper loss.
:::
:::

## Stepper motors {#sec-stepper}

A **stepper motor** moves in fixed angular increments when its phase windings are energised in sequence. The common **hybrid** stepper has a toothed, axially magnetised rotor and a stator with two phase windings; its standard step angle is $1.8°$ ($200$ full steps per revolution). Energising phase A, then B, then $-$A, then $-$B advances the rotor one step each time, and the step rate sets the speed. Because the position is known by counting steps, a stepper can position **open-loop**, without an encoder — the reason it is used in 3D printers, small CNC machines, valves, instruments and printers.

Modern drivers regulate the phase currents by **chopping** (current-mode PWM) and apply sine–cosine current pairs, which divides each full step into **microsteps** ($1/16$ or finer). Microstepping makes the motion smoother and quieter; it does not make it proportionally more accurate, since the torque available to hold an intermediate position is small and the rotor's position deviates with load.

Three limitations follow from the physics. (1) **Torque falls with speed**: each phase has inductance, and as the step rate rises the driver has less time to establish the current against the winding's back-emf and inductance, so the **pull-out torque** curve drops steeply above a few hundred revolutions per minute; higher supply voltages extend the useful speed range. (2) **Lost steps**: if the load torque exceeds the available torque (at a jam, or when accelerating too hard), the rotor slips by one or more steps — the controller does not know, and every subsequent position is wrong until the machine re-homes. (3) **Resonance**: the rotor in its magnetic detent behaves as a lightly damped spring–mass system, and at certain step rates (often $100$–$200$ full steps per second) the motion becomes rough or the motor stalls; microstepping and mechanical damping reduce this. Steppers also draw full current at standstill and run hot. Where these limits matter, a closed-loop stepper (with an encoder) or a servo motor is used.

::: example Resolution and step rate of a stepper axis {#ex-stepper}
A $1.8°$ stepper with a driver set to $1/16$ microstepping drives a lead screw with $8\ \mathrm{mm}$ lead. Find the travel per microstep and the step-pulse frequency at $50\ \mathrm{mm/s}$.
::: solution
Microsteps per revolution $200 \times 16 = 3200$; travel per microstep $8\ \mathrm{mm}/3200 = 2.5\ \mathrm{\mu m}$. At $50\ \mathrm{mm/s}$ the screw turns at $50/8 = 6.25\ \mathrm{rev/s}$ ($375\ \mathrm{rev/min}$), requiring $6.25 \times 3200 = 20\,000$ step pulses per second.

Sanity check: $375\ \mathrm{rev/min}$ is in the range where a typical small hybrid stepper still has a useful fraction of its holding torque; at five times this speed it might have little left. The $2.5\ \mathrm{\mu m}$ resolution is nominal: the positional accuracy of a microstep under load may be no better than a few per cent of a full step ($40\ \mathrm{\mu m}$ of travel here).
:::
:::

## Brushless motors {#sec-brushless}

The commutator and brushes are the weak point of the DC motor: they wear, spark, limit the speed and put the heat-producing winding on the rotor, where it is hard to cool. A **brushless** motor turns the machine inside out: permanent magnets on the rotor, windings (usually three phases) on the stator, and the commutation done electronically by a **three-phase inverter** (three half-bridges) that switches the phase currents according to the rotor position.

Two variants are distinguished by their back-emf waveform and the way they are driven. The **brushless DC motor** (BLDC) has a trapezoidal back-emf and is driven by **six-step** (block) commutation: at each instant two phases carry current, and the pattern is switched every $60°$ electrical according to three Hall sensors ([[mechatronics/sensors]]). It is simple and cheap (fans, pumps, drones, power tools) but has some torque ripple at the switching instants. The **permanent-magnet synchronous motor** (PMSM, often called an AC servo motor) has a sinusoidal back-emf and is driven by sinusoidal currents synchronised to an encoder or resolver. Its standard control is **field-oriented control** (FOC, vector control): the three measured phase currents are transformed (by the Clarke and Park transformations) into a frame rotating with the rotor, where they appear as two DC quantities — $i_q$, producing torque, and $i_d$, along the magnet flux — each regulated by a PI controller. With $i_d = 0$ the torque is
$$
T = \tfrac32\,p\,\psi_m\,i_q,
$$ {#eq-pmsm-torque}
where $p$ is the number of pole pairs and $\psi_m$ the magnet flux linkage: proportional to one current, exactly as in a DC motor. FOC is what makes a brushless servo behave, to the outer loops, like an ideal DC motor with a fast current loop, with smooth torque down to zero speed.

| type | position feedback | strengths | weaknesses | typical uses |
|---|---|---|---|---|
| brushed DC | optional (encoder for servo use) | simple drive, cheap, linear model | brush wear, sparking, speed limit, rotor heating | toys, automotive auxiliaries, low-cost servos |
| stepper (hybrid) | none (open loop) or encoder | open-loop positioning, holding torque, simple control | torque falls with speed, lost steps, resonance, heat at standstill | 3D printers, small CNC, instruments |
| BLDC (six-step) | Hall sensors or sensorless | efficient, long life, high speed | torque ripple, more complex drive | fans, pumps, drones, tools |
| PMSM with FOC | encoder or resolver | smooth torque, high dynamics, efficient | complex drive, cost | servo axes, robots, electric vehicles |

::: warning Peak torque, continuous torque and the thermal limit
A motor's catalogue lists a **peak torque** (limited by the drive's current limit and by demagnetisation of the magnets) and a **continuous torque** (limited by winding temperature). Sizing a motor from the peak torque of the move alone is a common mistake: the winding heats with the *mean square* of the current over the whole cycle, so the check is the rms torque ([[#exr-rms]]) against the continuous rating, at the actual ambient temperature and mounting. The opposite mistake — sizing for the rms torque and forgetting to check that the peak demand, and the speed at which it occurs, lie under the motor-and-drive torque–speed curve — leaves an axis that cannot follow its trajectory. Both checks are needed, plus a margin, typically $20$–$50\,\%$.
:::

::: quiz
A DC motor's supply voltage is halved while its load torque stays the same. What happens in steady state?
- [x] The current is unchanged and the speed falls by more than half
- [ ] The current halves and the speed halves
- [ ] The current doubles and the speed is unchanged
- [ ] The speed halves exactly and the current is unchanged
::: solution
The current is set by the load, $i = T/K$, so it is unchanged. The speed is $\omega = V/K - RT/K^2$: the first term halves while the second (the speed drop due to load) stays the same, so the speed falls by more than half. In [[#ex-dc-motor]], at $0.2\ \mathrm{N\,m}$, halving the voltage from $24$ to $12\ \mathrm{V}$ reduces the speed from $320$ to $80\ \mathrm{rad/s}$.
:::
:::

::: history
Michael Faraday demonstrated continuous electromagnetic rotation — a wire carrying current circling a magnet in a cup of mercury — in 1821. Practical DC motors followed in the 1830s, among them that of the Vermont blacksmith Thomas Davenport, who received a US patent for an electric motor in 1837; but they found little use until the dynamo made electric power cheap in the 1870s and 1880s. Electronic commutation became practical with power transistors in the 1960s, and field-oriented control was developed around 1970 at Siemens and the Technical University of Darmstadt by Felix Blaschke and Karl Hasse. The neodymium–iron–boron magnet, announced in 1984 by Masato Sagawa and colleagues at Sumitomo Special Metals and, independently, by General Motors, gave brushless motors the high energy density that drones, robots and electric vehicles depend on.
:::

::: summary
- DC motor: $T = Ki$, $e = K\omega$ with the same $K$ in SI units (power balance). Steady state $\omega = V/K - (R/K^2)T$; stall torque $KV/R$, no-load speed $V/K$, maximum power $T_s\omega_0/4$ at $50\,\%$ efficiency.
- Dynamics: $\Omega/V = K/[(Ls + R)(Js + b) + K^2] \approx (1/K)/(\tau_ms + 1)$ with $\tau_m = JR/K^2$; back-emf acts as damping. Under current control the motor is a pure inertia, $K/(Js^2)$.
- Reflected inertia $J_L/N^2$; acceleration is greatest at $N = \sqrt{J_L/J_m}$, a broad optimum.
- H-bridges give four-quadrant operation; PWM sets the average voltage; ripple $V_sD(1 - D)/(Lf)$, worst at $D = 0.5$.
- Steppers position open-loop by counting steps but lose torque with speed, can lose steps and resonate.
- Brushless motors: electronic commutation; six-step with Hall sensors, or FOC with $T = \tfrac32p\psi_mi_q$.
- Size motors for both the rms torque (thermal) and the peak torque–speed demand.
:::

## Exercises

::: exercise Converting a back-emf constant {level=1 check="0.1"}
A data sheet gives a back-emf constant of $10.472\ \mathrm{V}$ per $1000\ \mathrm{rev/min}$. Find the torque constant in SI units, using $1000\ \mathrm{rev/min} = 104.72\ \mathrm{rad/s}$. (Enter $K$ in N·m/A.)
::: solution
$K = 10.472/104.72 = 0.100\ \mathrm{V\,s/rad}$, and by [[#prop-kt-ke]] the torque constant is the same number, $0.100\ \mathrm{N\,m/A}$. Forgetting the conversion and using $10.472$ directly would overstate the torque per ampere a hundredfold.
:::
:::

::: exercise Stall torque {level=1 check="0.375"}
A motor with $K = 0.025\ \mathrm{N\,m/A}$ and $R = 0.80\ \mathrm{\Omega}$ is supplied at $12\ \mathrm{V}$. Find its stall torque. (Enter it in N·m.)
::: solution
Stall current $12/0.80 = 15\ \mathrm{A}$; $T_s = 0.025 \times 15 = 0.375\ \mathrm{N\,m}$.
:::
:::

::: exercise Mechanical time constant {level=1 check="16"}
A motor with $K = 0.050\ \mathrm{N\,m/A}$ and $R = 2.0\ \mathrm{\Omega}$ drives a total inertia of $2.0\times10^{-5}\ \mathrm{kg\,m^2}$. Find the mechanical time constant. (Enter $\tau_m$ in ms.)
::: solution
$\tau_m = JR/K^2 = 2.0\times10^{-5} \times 2.0/0.0025 = 0.016\ \mathrm{s} = 16\ \mathrm{ms}$.
:::
:::

::: exercise Stepper travel per step {level=1 check="10"}
A $1.8°$ stepper in full-step mode drives a screw with $2\ \mathrm{mm}$ lead. Find the travel per step. (Enter it in μm.)
::: solution
$2\ \mathrm{mm}/200 = 0.010\ \mathrm{mm} = 10\ \mathrm{\mu m}$.
:::
:::

::: exercise Ripple at a different frequency {level=2 check="0.3"}
A motor with $L = 0.50\ \mathrm{mH}$ is driven from $48\ \mathrm{V}$ with sign–magnitude PWM at $80\ \mathrm{kHz}$. Find the worst-case peak-to-peak current ripple. (Enter it in A.)
::: solution
$\Delta I_{\max} = V_s/(4Lf) = 48/(4 \times 5.0\times10^{-4} \times 8.0\times10^{4}) = 48/160 = 0.30\ \mathrm{A}$.
:::
:::

::: exercise Operating point {level=2 check="160"}
The motor of the stall-torque exercise above ($K = 0.025\ \mathrm{N\,m/A}$, $R = 0.80\ \mathrm{\Omega}$, $12\ \mathrm{V}$) drives a load of $0.25\ \mathrm{N\,m}$. Find its speed, neglecting friction. (Enter $\omega$ in rad/s.)
::: solution
No-load speed $12/0.025 = 480\ \mathrm{rad/s}$; slope $R/K^2 = 0.80/6.25\times10^{-4} = 1280\ \mathrm{rad\,s^{-1}/(N\,m)}$. Hence $\omega = 480 - 1280 \times 0.25 = 160\ \mathrm{rad/s}$. The current is $0.25/0.025 = 10\ \mathrm{A}$ and the efficiency $160/480 = 33\,\%$: the motor is working at two-thirds of its stall torque, far beyond any sensible continuous rating.
:::
:::

::: exercise RMS torque {#exr-rms level=2 check="0.4"}
A servo axis repeats a cycle in which the motor delivers $0.60\ \mathrm{N\,m}$ for $1.0\ \mathrm{s}$ (acceleration), $0.20\ \mathrm{N\,m}$ for $1.0\ \mathrm{s}$ (constant speed against friction) and $0$ for $0.5\ \mathrm{s}$ (dwell). Find the rms torque that must be compared with the continuous rating. (Enter it in N·m.)
::: solution
$T_{\text{rms}} = \sqrt{(0.36 \times 1.0 + 0.04 \times 1.0 + 0)/2.5} = \sqrt{0.16} = 0.40\ \mathrm{N\,m}$. Copper loss is proportional to $i^2 \propto T^2$, so the rms torque gives the same average heating as the cycle. The mean torque, $0.32\ \mathrm{N\,m}$, would underestimate it.
:::
:::

::: exercise Load acceleration through a gearhead {level=2 check="1250"}
A motor with $J_m = 2.0\times10^{-5}\ \mathrm{kg\,m^2}$ and torque $0.50\ \mathrm{N\,m}$ drives a load of $J_L = 2.0\times10^{-3}\ \mathrm{kg\,m^2}$ through an ideal gearhead of ratio $N = 10$. Find the load's angular acceleration. (Enter $\alpha_L$ in rad/s².)
::: solution
$\alpha_L = NT_m/(N^2J_m + J_L) = 10 \times 0.50/(100 \times 2.0\times10^{-5} + 2.0\times10^{-3}) = 5.0/(4.0\times10^{-3}) = 1250\ \mathrm{rad/s^2}$. Here $N = \sqrt{J_L/J_m} = 10$ is the optimum ratio, and the result equals $T_m/(2\sqrt{J_mJ_L}) = 0.50/(2 \times 2.0\times10^{-4}) = 1250\ \mathrm{rad/s^2}$.
:::
:::

::: exercise Selecting a motor for a robot joint {level=3}
A robot joint must rotate an arm (inertia $0.50\ \mathrm{kg\,m^2}$ about the joint, gravity torque up to $20\ \mathrm{N\,m}$) through $90°$ in $0.5\ \mathrm{s}$ with a triangular velocity profile, then hold. Choose between a brushed DC motor, a stepper and a PMSM with FOC; select a gear ratio and estimate the peak and rms motor torques and the peak motor speed for your choice, stating your assumptions.
::: solution
A good answer: triangular profile over $\theta = \pi/2$ in $t = 0.5\ \mathrm{s}$ gives peak joint speed $2\theta/t = 6.28\ \mathrm{rad/s}$ and acceleration $4\theta/t^2 = 25.1\ \mathrm{rad/s^2}$. Joint torque peak $0.50 \times 25.1 + 20 = 32.6\ \mathrm{N\,m}$ (acceleration against gravity), holding $20\ \mathrm{N\,m}$ continuously. A PMSM with FOC (smooth torque, holding without overheating at moderate current, encoder feedback) through a harmonic or planetary gear of ratio about $100$: motor peak speed $628\ \mathrm{rad/s}$ ($6000\ \mathrm{rev/min}$), peak torque $0.33\ \mathrm{N\,m}$ plus the motor's own inertia torque and gear losses (efficiency perhaps $70$–$80\,\%$, so about $0.45\ \mathrm{N\,m}$), continuous about $0.25$–$0.3\ \mathrm{N\,m}$ if the arm holds for most of the cycle. Check the reflected inertia ratio $0.5/100^2 = 5\times10^{-5}\ \mathrm{kg\,m^2}$ against the motor's rotor inertia (a ratio within $1$–$10$ is good). A brake is needed to hold the arm when power is off. A stepper could do it open-loop only with large margins, and lost steps under the gravity load are a safety issue; a brushed motor would work but wears.
:::
:::
