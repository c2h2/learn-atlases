Open a modern electric car, a drone, a hard-disk drive, a 3D printer or a heat-pump compressor and you will rarely find the classical machines of the previous chapters in their textbook form. Instead you find **permanent-magnet** motors with no brushes, fed by an inverter that switches their windings according to the rotor position; **stepper motors** that move in precise increments without any position sensor; and, increasingly, **switched-reluctance** machines with no magnets and no rotor windings at all. None of these could work without power electronics, and their rise since the 1980s has been driven by cheap transistors and microcontrollers, and by the neodymium–iron–boron magnet.

This chapter applies the theory already developed to these machines. A permanent-magnet synchronous motor is the synchronous machine of [[electric-machines/synchronous-machines]] with its field winding replaced by magnets ([[electric-machines/magnetic-circuits]]); we derive its torque in the rotor reference frame, including reluctance torque, and see how field weakening extends its speed range. The **brushless DC motor** is the same machine operated with simple six-step switching, behaving at its terminals like the DC motor of [[electric-machines/dc-machines]]. **Stepper** and **switched-reluctance** motors exploit reluctance torque, computed with the co-energy method of [[electric-machines/energy-conversion]]. We end with a comparison to guide the choice of machine for an application.

## Permanent-magnet synchronous machines

A **permanent-magnet synchronous machine** (PMSM) has a stator with a distributed three-phase winding, exactly as in an induction or synchronous machine, and a rotor carrying magnets that produce a constant flux. In a **surface-mounted** PM (SPM) machine the magnets are glued to the rotor surface and retained by a sleeve; because the magnet's recoil permeability is close to $1$, the effective air gap is the same in all directions and the machine is non-salient. In an **interior** PM (IPM) machine the magnets are buried in slots inside the rotor iron, which protects them mechanically and creates saliency: the inductance is smaller along the magnet axis (the $d$ axis, where the flux has to cross the magnets) than across it (the $q$ axis), so $L_q > L_d$, the reverse of a wound-field salient-pole machine.

The magnet flux linking each stator phase is $\lambda_m\cos\theta_e$, where $\theta_e$ is the rotor's electrical angle and $\lambda_m$ the peak magnet flux linkage per phase. At electrical speed $\omega_e = (P/2)\omega_m$ it induces a back emf of peak $\omega_e\lambda_m$ per phase, the counterpart of $E_f$ in a wound-field machine, but with no way of changing it.

### The rotor reference frame

The cleanest description uses currents expressed in a frame that rotates with the rotor. Transform the three phase currents into a **direct-axis** current $i_d$, aligned with the magnet flux, and a **quadrature-axis** current $i_q$, $90^\circ$ electrical ahead of it. For balanced sinusoidal currents of peak $I$ whose space vector makes the angle $\beta$ with the $d$ axis, these are simply the constant values $i_d = I\cos\beta$ and $i_q = I\sin\beta$: the $dq$ transformation of Park, normalised so that $i_d$ and $i_q$ have the same peak as the phase currents.

::: definition Flux linkages in the dq frame {#def-dq}
In the rotor frame a PMSM has flux linkages

$$
\lambda_d = L_di_d + \lambda_m,\qquad \lambda_q = L_qi_q,
$$ {#eq-dq-flux}

and, in steady state at electrical speed $\omega_e$ and neglecting resistance, the voltage components

$$
v_d = -\omega_eL_qi_q,\qquad v_q = \omega_e(L_di_d + \lambda_m),
$$ {#eq-dq-voltage}

whose resultant $V = \sqrt{v_d^2 + v_q^2}$ is the peak phase voltage. $L_d$ and $L_q$ are the synchronous inductances (magnetising plus leakage) on the two axes; $L_d = L_q$ for an SPM machine.
:::

::: theorem Torque of a PMSM {#thm-pmsm-torque}
The electromagnetic torque of a PMSM with $P$ poles is

$$
T = \frac32\,\frac P2\left[\lambda_mi_q + (L_d - L_q)\,i_di_q\right].
$$ {#eq-pmsm-torque}

The first term is the **magnet torque**; the second is **reluctance torque**, which in an IPM machine ($L_q > L_d$) is positive when $i_d < 0$. For an SPM machine $T = \tfrac32\tfrac P2\lambda_mi_q$, and the torque per ampere is greatest with $i_d = 0$.
:::

::: proof
In steady state the voltage components are constant, and the instantaneous three-phase power equals $\tfrac32(v_di_d + v_qi_q)$ (the factor $\tfrac32$ arises because peak-valued $dq$ quantities are used: three phases each carrying $\tfrac12$ of peak voltage times peak current on average). Substituting [[#eq-dq-voltage]],

$$
p = \tfrac32\omega_e\bigl[-L_qi_qi_d + (L_di_d + \lambda_m)i_q\bigr] = \tfrac32\omega_e\bigl[\lambda_mi_q + (L_d - L_q)i_di_q\bigr].
$$

With resistance neglected and the currents constant, there is no change of stored energy, so this is the mechanical power $T\omega_m$. With $\omega_e = (P/2)\omega_m$, dividing by $\omega_m$ gives [[#eq-pmsm-torque]]. For $L_d = L_q$ the torque depends only on $i_q$, so for a given current magnitude $I = \sqrt{i_d^2 + i_q^2}$ it is greatest when all of it is in $i_q$.
:::

With $i_d = 0$ an SPM motor is a DC motor in disguise: the magnet supplies a constant field and $i_q$ acts as the armature current, at right angles to it, exactly as the commutator arranges in a DC machine. The inverter, guided by a rotor-position sensor (an encoder or resolver), plays the part of the commutator. This is **field-oriented control** at its simplest.

### The speed limit and field weakening

The inverter can apply at most a certain voltage: with space-vector modulation from a DC link $V_{\text{dc}}$, the peak phase voltage is $V_{\max} = V_{\text{dc}}/\sqrt3$. With $i_d = 0$, [[#eq-dq-voltage]] gives $V^2 = \omega_e^2[\lambda_m^2 + (L_qi_q)^2]$, which grows with speed. The speed at which rated current just reaches the voltage limit is the **base speed**. Above it, the motor can still run faster if a **negative** $i_d$ is injected: it reduces $\lambda_d = \lambda_m + L_di_d$, partly cancelling the magnet flux. This is field weakening, achieved not by reducing a field current but by opposing the magnet with stator current. Since $i_d$ uses part of the current limit, less is available for $i_q$ and the torque falls.

::: example An SPM traction motor {#ex-spm}
An eight-pole SPM motor has $L_d = L_q = 0.3\,\mathrm{mH}$, negligible resistance, a current limit of $100\,\mathrm A$ peak per phase, and is fed from a $400\,\mathrm V$ DC link ($V_{\max} = 230.9\,\mathrm V$ peak phase). (a) Choose $\lambda_m$ so that the base speed is $4000\,\mathrm{r/min}$ with $i_d = 0$. (b) With $\lambda_m = 0.134\,\mathrm{Wb}$, find the rated torque and power. (c) Find the torque available at $5000\,\mathrm{r/min}$ with field weakening, and the absolute speed limit.
::: solution
(a) At $4000\,\mathrm{r/min}$, $\omega_e = 4\times4000\times2\pi/60 = 1675.5\,\mathrm{rad/s}$ and $\omega_eLI = 1675.5\times0.3\times10^{-3}\times100 = 50.3\,\mathrm V$. The voltage limit requires $(\omega_e\lambda_m)^2 + 50.3^2 = 230.9^2$, so $\lambda_m = \sqrt{230.9^2 - 50.3^2}/1675.5 = 0.1345\,\mathrm{Wb}$. We take $0.134\,\mathrm{Wb}$.

(b) $T = \tfrac32\times4\times0.134\times100 = 80.4\,\mathrm{N\,m}$, and at $4000\,\mathrm{r/min}$ ($418.9\,\mathrm{rad/s}$) the power is $33.7\,\mathrm{kW}$.

(c) At $5000\,\mathrm{r/min}$, $\omega_e = 2094\,\mathrm{rad/s}$. With $I = 100\,\mathrm A$ and the voltage at its limit, the two conditions $(\lambda_m + Li_d)^2 + (Li_q)^2 = (V_{\max}/\omega_e)^2$ and $i_d^2 + i_q^2 = I^2$ give, on subtracting,

$$
i_d = \frac{(V_{\max}/\omega_e)^2 - \lambda_m^2 - L^2I^2}{2\lambda_mL} = \frac{0.01216 - 0.01796 - 0.0009}{8.04\times10^{-5}} = -83.3\,\mathrm A,
$$

so $i_q = \sqrt{100^2 - 83.3^2} = 55.3\,\mathrm A$ and $T = 6\times0.134\times55.3 = 44.5\,\mathrm{N\,m}$ ($23.3\,\mathrm{kW}$). The limit is reached when all the current is in the $d$ axis, $i_d = -100\,\mathrm A$: then $\omega_e(\lambda_m - LI) = V_{\max}$ and $\omega_e = 230.9/0.104 = 2221\,\mathrm{rad/s}$, i.e. $5300\,\mathrm{r/min}$. An SPM machine with $\lambda_m/L = 447\,\mathrm A$ (the **characteristic current**) far above its rated current has only a small field-weakening range; designs for a wide constant-power range make $L$ larger (as in IPM machines) so that $\lambda_m/L$ approaches the rated current.
:::
:::

::: widget plot
f: 1.5*4*lam*sqrt(I^2 - (min(0, ((230.94/(x*pi/7.5))^2 - lam^2 - (0.0003*I)^2)/(2*lam*0.0003)))^2)
x: 100, 9000
y: 0, 250
sliders: lam=0.134:0.06:0.2:0.002; I=100:50:250:5
caption: Maximum torque (N·m) against speed (r/min) of the eight-pole SPM motor of the example ($L = 0.3\,\mathrm{mH}$, $V_{\max} = 230.9\,\mathrm V$), for magnet flux linkage $\lambda_m$ (Wb) and current limit $I$ (A peak). Below base speed the torque is limited by current alone; above it, field weakening ($i_d < 0$) trades torque for speed until the curve ends where $i_d = -I$. Raise $I$ towards the characteristic current $\lambda_m/L$ and the curve stretches to much higher speeds. Reduce $\lambda_m$: base speed rises but low-speed torque falls.
:::

::: warning Uncontrolled generation
Above base speed the back emf $\omega_e\lambda_m$ exceeds the inverter's voltage, and the motor is held in check only by the field-weakening current. If the inverter trips at high speed, the magnets keep generating, and the back emf, rectified by the inverter's freewheeling diodes, can drive large currents into the DC link and overvoltage it: **uncontrolled generator** operation. Drives for high-speed PM machines limit the maximum speed, or add protection, so that the peak line back emf never dangerously exceeds the DC-link rating. A wound-field or induction machine has no such problem, because its excitation disappears when the supply does.
:::

## Brushless DC motors

The **brushless DC** (BLDC) motor is a PM machine whose magnets and concentrated windings are arranged to give a **trapezoidal** back emf, flat over $120^\circ$ electrical in each half-cycle. It is driven by **six-step** (block) commutation: at any instant exactly two of the three phases conduct, carrying the DC-link current $I$ in opposite directions, and every $60^\circ$ electrical, signalled by three Hall-effect sensors, the inverter switches the current to the next pair. The two conducting phases are always those whose back emfs are on their flat tops, of magnitude $E = k_e\omega_m$ each, with opposite signs.

::: theorem Equivalent DC motor {#thm-bldc}
With ideal six-step commutation and a trapezoidal back emf of flat-top value $k_e\omega_m$ per phase, a star-connected BLDC motor with phase resistance $R$ behaves at its DC terminals as a DC motor with

$$
V_{\text{dc}} = 2k_e\omega_m + 2RI,\qquad T = 2k_eI,
$$ {#eq-bldc}

that is, with back-emf and torque constant $k = 2k_e$ and armature resistance $2R$. Its torque is constant apart from ripple at the commutation instants.
:::

::: proof
Two phase windings are in series across the supply, so KVL gives $V_{\text{dc}} = E_a - E_b + 2RI$ with $E_a = k_e\omega_m$ and $E_b = -k_e\omega_m$ on their flat tops; inductive voltages vanish while the current is constant between commutations. The electrical power converted is $(E_a - E_b)I = 2k_e\omega_mI$, and dividing by $\omega_m$ gives $T = 2k_eI$. Within each $60^\circ$ interval the two conducting phases are both on their flat tops, so the converted power and torque are constant; at each switching instant the current takes time to transfer between phases through their inductance, causing a brief torque dip.
:::

::: example A BLDC motor for a drone {#ex-bldc}
A BLDC motor has a flat-top back-emf constant $k_e = 0.05\,\mathrm{V\,s/rad}$ per phase and a phase resistance of $0.1\,\Omega$, and runs from a $48\,\mathrm V$ supply. Find the no-load speed, and the speed, torque, output and efficiency at a DC current of $20\,\mathrm A$ (neglect switching and iron losses).
::: solution
The equivalent DC motor has $k = 0.1\,\mathrm{V\,s/rad}$ and $R_{\text{eq}} = 0.2\,\Omega$. No load: $\omega_0 = 48/0.1 = 480\,\mathrm{rad/s} = 4584\,\mathrm{r/min}$. At $20\,\mathrm A$: back emf $48 - 20\times0.2 = 44\,\mathrm V$, $\omega_m = 440\,\mathrm{rad/s} = 4202\,\mathrm{r/min}$, $T = 0.1\times20 = 2.0\,\mathrm{N\,m}$, output $2.0\times440 = 880\,\mathrm W$, input $960\,\mathrm W$, efficiency $91.7\,\%$. Speed control is by PWM of the DC-link voltage, exactly as for a brushed DC motor, but with no brushes to wear or spark.
:::
:::

BLDC motors are simple to control and need only coarse position sensing, which is why they dominate fans, pumps, drones and power tools. Sinusoidally wound PMSMs with field-oriented control give smoother torque and better efficiency at the cost of a fine position sensor (or a sensorless estimator), and are preferred for servos and traction. Many low-cost drives estimate the commutation instants from the back emf of the unenergised phase and need no sensors at all.

## Stepper motors

A **stepper motor** turns by a fixed angle for each pulse applied to its driver. Because the rotor locks to discrete positions defined by its geometry, it can be positioned **open loop**, by counting pulses, as long as it is not overloaded. Steppers drive printers, 3D printers, CNC machines, camera lenses and valves.

There are three types. A **variable-reluctance** (VR) stepper has a soft-iron toothed rotor and a toothed stator; energising a phase pulls the nearest rotor teeth into alignment with its teeth by reluctance torque. A **permanent-magnet** stepper has a magnetised rotor, and a **hybrid** stepper combines both: an axially magnetised rotor with two toothed caps offset by half a tooth pitch. The common two-phase hybrid has $50$ rotor teeth and takes $200$ steps per revolution.

::: definition Step angle {#def-step-angle}
For a hybrid or permanent-magnet stepper with $m$ phases and $N_r$ rotor teeth (pole pairs), each full step moves the rotor by

$$
\theta_{\text{step}} = \frac{360^\circ}{2mN_r},
$$

and for a variable-reluctance stepper with $N_s$ stator and $N_r$ rotor teeth, $\theta_{\text{step}} = 360^\circ\abs{N_s - N_r}/(N_sN_r)$. Exciting two adjacent phases together (**half-stepping**) halves the step angle; controlling the ratio of phase currents in fine increments (**microstepping**) subdivides it further.
:::

::: theorem Static torque of a stepper phase {#thm-stepper-torque}
If the inductance of an energised phase varies with rotor angle $\theta$ as $L(\theta) = L_0 + L_1\cos N_r\theta$ (VR case), or its mutual flux linkage with the magnet as $\lambda_m\cos N_r\theta$ (PM and hybrid case), the static torque with constant phase current $I$ is

$$
T(\theta) = -T_h\sin N_r\theta,
$$ {#eq-stepper-torque}

with **holding torque** $T_h = \tfrac12N_rL_1I^2$ (VR) or $T_h = N_r\lambda_mI$ (PM, hybrid). The equilibrium $\theta = 0$ is stable; under a load torque $T_L < T_h$ the rotor settles at the angular error $\theta_e = (1/N_r)\arcsin(T_L/T_h)$.
:::

::: proof
For the VR case the co-energy is $W' = \tfrac12L(\theta)I^2$, so by [[electric-machines/energy-conversion#thm-force-coenergy]] $T = \tfrac12I^2\,\mathrm dL/\mathrm d\theta = -\tfrac12N_rL_1I^2\sin N_r\theta$. For the PM case the co-energy contains the mutual term $I\lambda_m\cos N_r\theta$ (plus terms that do not depend on $\theta$ to first order), so $T = -N_r\lambda_mI\sin N_r\theta$. Near $\theta = 0$, $T\approx-T_hN_r\theta$, a restoring torque, so the equilibrium is stable. With a load torque $T_L$ opposing, equilibrium needs $T_h\sin N_r\theta = T_L$ (the rotor lags until the magnetic torque balances the load), giving $\theta_e$.
:::

::: widget plot
f: -Th*sin(50*x*pi/180); -Th*sin(50*x*pi/180 - pi/2); -Th*(sin(50*x*pi/180) + sin(50*x*pi/180 - pi/2))/sqrt(2); TL
x: -7.2, 7.2
y: -1, 1
sliders: Th=0.5:0.1:0.8:0.01; TL=0.2:0:0.6:0.01
labels: \text{phase A}; \text{phase B}; \text{A and B, scaled}; T_L
caption: Static torque (N·m) against rotor angle (mechanical degrees) of a two-phase hybrid stepper with $50$ rotor teeth, with holding torque $T_h$. Phase A alone holds the rotor at $0^\circ$ and phase B alone at $1.8^\circ$ (one full step); both together, with the currents scaled by $1/\sqrt2$, hold it half way, at $0.9^\circ$. The horizontal line is a load torque $T_L$ that the motor must supply: the rotor settles where a falling part of a torque curve meets the line, displaced backwards from its no-load position. Raise $T_L$ above $T_h$ and no stable equilibrium remains: the motor loses steps.
:::

::: example A hybrid stepper on a lead screw {#ex-stepper}
A $200$-step hybrid stepper ($N_r = 50$, two phases) has a holding torque of $0.5\,\mathrm{N\,m}$ and drives a lead screw. (a) Check the step angle. (b) At $1200$ full steps per second, what is its speed? (c) With a static load torque of $0.2\,\mathrm{N\,m}$, what is the position error? (d) With $16\times$ microstepping, what is the resolution?
::: solution
(a) $\theta_{\text{step}} = 360^\circ/(2\times2\times50) = 1.8^\circ$.

(b) $1200\times1.8^\circ = 2160^\circ/\mathrm s = 6\,\mathrm{rev/s} = 360\,\mathrm{r/min}$.

(c) $\theta_e = (1/50)\arcsin(0.2/0.5) = (1/50)(23.6^\circ) = 0.47^\circ$, about a quarter of a step. The error does not accumulate: it vanishes when the load is removed.

(d) $1.8^\circ/16 = 0.1125^\circ$, $3200$ microsteps per revolution, although the positional accuracy under load is still limited by the stiffness found in (c), which microstepping does not improve.
:::
:::

At speed the stepper is limited by its **pull-out torque curve**: the winding inductance prevents the current from reaching its full value within each short step interval, so the available torque falls with step rate. Drives therefore use a supply voltage many times the rated winding voltage, with **chopper** current control, to force the current up quickly. If the load torque or acceleration exceeds the available torque, the motor misses steps and the open-loop position is lost, the main weakness of steppers.

## Switched-reluctance machines

A **switched-reluctance machine** (SRM) is a large variable-reluctance stepper run continuously. Both stator and rotor are **doubly salient**: the stator has concentrated coils on its poles, connected in phases, and the rotor is a stack of toothed laminations with no windings or magnets. A common design is the four-phase $8/6$ machine (eight stator poles, six rotor poles). Each phase is energised as a pair of rotor poles approaches alignment with it, when its inductance is rising, and switched off before alignment, so that by [[electric-machines/energy-conversion#eq-force-linear]] it produces positive torque $T = \tfrac12i^2\,\mathrm dL/\mathrm d\theta$. The torque does not depend on the direction of the current, so the converter can be **unipolar**, typically an asymmetric half-bridge per phase.

The energy converted in one **stroke** (one phase's conduction from unaligned to aligned) is the area enclosed by the trajectory in the $\lambda$–$i$ plane. For an idealised linear machine with a flat-topped current $I$ held while the inductance rises from $L_u$ (unaligned) to $L_a$ (aligned), the co-energy rises by $W = \tfrac12I^2(L_a - L_u)$ at constant current, and that is the mechanical work per stroke. With $m$ phases and $N_r$ rotor poles there are $mN_r$ strokes per revolution, so the **average torque** is

$$
T_{\text{avg}} = \frac{mN_r}{2\pi}W = \frac{mN_r}{4\pi}I^2(L_a - L_u).
$$ {#eq-srm-torque}

::: example Average torque of an 8/6 SRM {#ex-srm}
A four-phase $8/6$ SRM has an aligned inductance of $20\,\mathrm{mH}$ and an unaligned inductance of $3\,\mathrm{mH}$ per phase, assumed independent of current. Each phase carries a flat-topped current of $10\,\mathrm A$ while its inductance rises. Find the step angle, the number of strokes per revolution and the average torque. Why does a real SRM with saturating iron do better than this linear estimate per ampere?
::: solution
The step (stroke) angle is $360^\circ\times(8 - 6)/(8\times6) = 15^\circ$, giving $4\times6 = 24$ strokes per revolution. Each stroke converts $W = \tfrac12\times10^2\times(0.020 - 0.003) = 0.85\,\mathrm J$, so

$$
T_{\text{avg}} = \frac{24\times0.85}{2\pi} = 3.25\,\mathrm{N\,m}.
$$

In the linear model the energy supplied to the phase includes the energy stored at alignment, $\tfrac12L_aI^2 = 1.0\,\mathrm J$, which must be returned to the supply at turn-off; the ratio of converted to supplied energy is poor and the converter must be large. With saturating iron, the aligned $\lambda$–$i$ curve bends over, the stored energy at turn-off is much less than the co-energy gained, and the loop encloses a larger fraction of the rectangle $\lambda I$. Practical SRMs are therefore designed to run deep into saturation, like the saturating electromagnet of [[electric-machines/energy-conversion]].
:::
:::

SRMs are rugged, cheap, tolerant of high temperatures and free of magnets, and a phase fault does not stop the others. Their drawbacks are high torque ripple and acoustic noise, caused by the pulsed radial forces on the stator poles, and the need for a position sensor and a dedicated converter. They are used in vacuum cleaners, some appliances, mining vehicles and aerospace starter-generators, and are being developed for traction because they avoid rare-earth magnets.

::: quiz
Which of these machines can produce torque with **unidirectional** phase currents?
- [ ] A surface-mounted PMSM
- [ ] A BLDC motor
- [x] A switched-reluctance motor
- [ ] A hybrid stepper motor
::: solution
SRM torque is $\tfrac12i^2\,\mathrm dL/\mathrm d\theta$, which depends on $i^2$, so the sign of the current does not matter and the phase current is switched on and off but never reversed. The PM machines (PMSM, BLDC, hybrid stepper) produce torque by the interaction of current with magnet flux, $\propto\lambda_mi$, so their currents must reverse each electrical half-cycle.
:::
:::

## Choosing a machine

| machine | strengths | weaknesses | typical uses |
|---|---|---|---|
| Cage induction | rugged, cheap, no magnets, runs direct-on-line, safe if the drive fails | lower efficiency and power factor at part load, rotor losses | pumps, fans, compressors, conveyors, many EV and rail drives |
| Wound-field synchronous | adjustable excitation and power factor, very high ratings | brushes or brushless exciter, needs starting means | generators, large constant-speed drives |
| Brushed DC | simplest control, cheap small motors | brush wear, sparking, limited speed | toys, automotive auxiliaries, legacy drives |
| SPM / PMSM | highest efficiency and torque density, smooth torque | magnet cost, demagnetisation risk, limited field weakening (SPM) | servos, robots, compressors, wind turbines |
| IPM | wide constant-power range, reluctance torque | more complex control | electric and hybrid vehicle traction |
| BLDC | simple six-step control, efficient | torque ripple | fans, drones, power tools, drives in appliances |
| Stepper | open-loop positioning, high holding torque | missed steps, resonance, low efficiency | printers, CNC, actuators |
| Switched reluctance | no magnets, rugged, high temperature | noise, torque ripple, special converter | appliances, mining, aerospace, emerging traction |

The choice usually starts from the duty: required torque and speed range, whether constant speed is acceptable, the cost of losses over the life of the machine, the environment (temperature, contamination, hazardous areas), and whether a drive is available or affordable. For the sizing step, the rotor volume follows from the torque and the air-gap shear stress ([[electric-machines/rotating-magnetic-fields#eq-shear]]); PM machines reach the highest shear stresses for a given cooling.

::: application Traction motors
The motors of electric vehicles show the trade-offs of this chapter. Many manufacturers use IPM machines for their efficiency and wide constant-power speed range; others use induction motors, which need no rare-earth magnets and freewheel without drag or uncontrolled generation; some use wound-rotor synchronous machines, which avoid magnets but keep adjustable excitation. Motors spin at $15\,000$ to $20\,000\,\mathrm{r/min}$ to reduce their size (torque, and hence rotor volume, falls in proportion to speed for a given power), driving the wheels through a single-ratio reduction gear.
:::

::: history
Thomas Davenport's and Moritz Jacobi's motors of the 1830s were in effect switched-reluctance and PM machines switched by mechanical contacts. Variable-reluctance steppers were used by the British Royal Navy in the 1920s to drive remote indicators, and hybrid steppers were developed in the 1950s and 1960s. Electronic commutation of a DC motor was demonstrated by T. G. Wilson and P. H. Trickey in 1962. The switched-reluctance drive in its modern form, with transistor switching and position feedback, was developed by Peter Lawrenson and colleagues at the University of Leeds in the 1970s. The NdFeB magnet, announced independently by Masato Sagawa at Sumitomo and by John Croat at General Motors in 1983, gave PM machines their present dominance in high-performance drives.
:::

## Where this leads

Every machine in this chapter needs an inverter, a position sensor or estimator, and a control algorithm. Their design is the business of [[power-electronics]], which covers the inverter topologies, PWM and space-vector modulation, and the current loops behind field-oriented control, and of [[control-systems]], which provides the speed and position loops. The $dq$ model introduced here also underlies the dynamic analysis of all synchronous and induction machines in graduate courses and in [[power-systems]], where PM wind generators and inverter-based resources are changing the dynamics of the grid. Across the course, the same ideas recur: a magnetic circuit sets the flux, energy and co-energy give the force, and two fields at an angle produce torque.

::: summary
- A PMSM is a synchronous machine with magnets in place of the field winding; in the rotor frame, $T = \tfrac32\tfrac P2[\lambda_mi_q + (L_d - L_q)i_di_q]$, with reluctance torque in IPM machines ($L_q > L_d$, $i_d < 0$).
- An SPM motor with $i_d = 0$ behaves like a DC motor; above base speed, negative $i_d$ weakens the field, and the speed range depends on the characteristic current $\lambda_m/L$ relative to the current limit.
- A BLDC motor with trapezoidal emf and six-step commutation is a DC motor with $k = 2k_e$ and resistance $2R$.
- Steppers move $360^\circ/(2mN_r)$ per step (hybrid), holding with $T = -T_h\sin N_r\theta$; they position open loop but lose steps if overloaded.
- Switched-reluctance machines produce $T = \tfrac12i^2\,\mathrm dL/\mathrm d\theta$ with unipolar currents; average torque is $mN_r/(2\pi)$ times the energy converted per stroke, and saturation improves their energy ratio.
- The choice of machine balances efficiency, torque density, speed range, cost, magnet use, robustness and the drive.
:::

## Exercises

::: exercise Step angle {level=1 check="360/(2*3*16)"}
A three-phase permanent-magnet stepper has $16$ rotor pole pairs. Find its full-step angle in degrees.
::: solution
$\theta_{\text{step}} = 360^\circ/(2\times3\times16) = 3.75^\circ$, $96$ steps per revolution.
:::
:::

::: exercise BLDC torque {level=1 check="2*0.03*15"}
A BLDC motor has a flat-top back-emf constant of $0.03\,\mathrm{V\,s/rad}$ per phase. Find its torque, in N·m, at a DC-link current of $15\,\mathrm A$.
::: solution
$T = 2k_eI = 2\times0.03\times15 = 0.9\,\mathrm{N\,m}$.
:::
:::

::: exercise PMSM torque {level=1 check="1.5*3*0.08*40"}
A six-pole SPM motor has $\lambda_m = 0.08\,\mathrm{Wb}$ and is driven with $i_d = 0$, $i_q = 40\,\mathrm A$. Find its torque in N·m.
::: solution
$T = \tfrac32\times3\times0.08\times40 = 14.4\,\mathrm{N\,m}$.
:::
:::

::: exercise Back emf at speed {level=2 check="4*6000*2*pi/60*0.134*sqrt(3)/sqrt(2)"}
For the motor of [[#ex-spm]] ($\lambda_m = 0.134\,\mathrm{Wb}$, eight poles), find the rms **line** back emf at $6000\,\mathrm{r/min}$, in volts, and compare its peak with the $400\,\mathrm V$ DC link.
::: solution
$\omega_e = 4\times628.3 = 2513\,\mathrm{rad/s}$; peak phase emf $2513\times0.134 = 336.8\,\mathrm V$; rms line emf $336.8\times\sqrt3/\sqrt2 = 412.5\,\mathrm V$, whose peak, $583\,\mathrm V$, exceeds the DC link by almost $50\,\%$. Above about $4100\,\mathrm{r/min}$ the motor would generate into the DC link if control were lost ([[#ex-spm]] cannot even reach $6000\,\mathrm{r/min}$ under control).
:::
:::

::: exercise Stepper speed and slew {level=2 check="500*60/400"}
A hybrid stepper with $0.9^\circ$ steps is driven at $500$ steps per second. Find its speed in r/min.
::: solution
$400$ steps per revolution, so $500/400 = 1.25\,\mathrm{rev/s} = 75\,\mathrm{r/min}$.
:::
:::

::: exercise Reluctance torque in an IPM motor {level=2}
An eight-pole IPM motor has $\lambda_m = 0.08\,\mathrm{Wb}$, $L_d = 0.2\,\mathrm{mH}$ and $L_q = 0.5\,\mathrm{mH}$. With a current of $200\,\mathrm A$ peak, compare the torque with $i_d = 0$ and with the current vector at $\beta = 110^\circ$ from the $d$ axis.
::: solution
$i_d = 0$: $T = \tfrac32\times4\times0.08\times200 = 96\,\mathrm{N\,m}$. At $\beta = 110^\circ$: $i_d = 200\cos110^\circ = -68.4\,\mathrm A$, $i_q = 200\sin110^\circ = 187.9\,\mathrm A$. Magnet torque $6\times0.08\times187.9 = 90.2\,\mathrm{N\,m}$; reluctance torque $6\times(0.2 - 0.5)\times10^{-3}\times(-68.4)\times187.9 = 23.1\,\mathrm{N\,m}$; total $113.3\,\mathrm{N\,m}$, $18\,\%$ more for the same current. The best angle (maximum torque per ampere) is found by maximising $T(\beta)$; here it lies near $\beta = 117^\circ$, giving about $115\,\mathrm{N\,m}$.
:::
:::

::: exercise Switched-reluctance design {level=3}
A three-phase $6/4$ SRM is to give an average torque of $5\,\mathrm{N\,m}$ with a flat-top current of $15\,\mathrm A$. (a) Find the stroke angle and the number of strokes per revolution. (b) What inductance swing $L_a - L_u$ is required in the linear model? (c) If the unaligned inductance is $4\,\mathrm{mH}$, what is the ratio of the energy converted per stroke to the energy stored at alignment, and what does it imply for the converter?
::: solution
(a) Stroke angle $360^\circ\times(6 - 4)/(6\times4) = 30^\circ$; $3\times4 = 12$ strokes per revolution.

(b) $W = 2\pi T/(mN_r) = 2\pi\times5/12 = 2.618\,\mathrm J$; $L_a - L_u = 2W/I^2 = 5.236/225 = 23.3\,\mathrm{mH}$.

(c) $L_a = 27.3\,\mathrm{mH}$; energy stored at alignment $\tfrac12\times0.0273\times225 = 3.07\,\mathrm J$. The ratio $2.618/3.07 = 0.85$: for every joule converted, more than a joule must be sent to the phase and returned to the supply at turn-off. The converter's switches and DC-link capacitor must handle this circulating energy, which is why practical SRMs rely on saturation to raise the ratio.
:::
:::

::: exercise Base speed and field-weakening range {level=3}
For an SPM motor with negligible resistance, show that (a) the base speed with $i_d = 0$ and current $I$ is $\omega_b = V_{\max}/\sqrt{\lambda_m^2 + (LI)^2}$; (b) the maximum speed at current $I$ is $\omega_{\max} = V_{\max}/(\lambda_m - LI)$ if $LI < \lambda_m$; (c) the motor has, in principle, an unlimited speed range at full current only if $LI = \lambda_m$. Evaluate $\omega_{\max}/\omega_b$ for [[#ex-spm]] and for the same motor with $L$ raised to $1.0\,\mathrm{mH}$ (adjusting nothing else).
::: hint
At the maximum speed all the current is in the $d$ axis, $i_d = -I$, $i_q = 0$.
:::
::: solution
(a) With $i_d = 0$, $V^2 = \omega_e^2(\lambda_m^2 + L^2I^2)$; setting $V = V_{\max}$ gives $\omega_b$.

(b) With $i_d = -I$, $v_q = \omega_e(\lambda_m - LI)$, $v_d = 0$, so $V_{\max} = \omega_{\max}(\lambda_m - LI)$. No other current distribution allows a higher speed, because it gives a larger $\abs{\lambda_d}$ or a nonzero $\lambda_q$.

(c) If $LI = \lambda_m$, the stator current can cancel the magnet flux completely and $\omega_{\max}\to\infty$ (in practice, until losses and mechanics intervene); if $LI > \lambda_m$ the same holds with less than full current in the $d$ axis.

For [[#ex-spm]]: $\omega_b = 230.9/\sqrt{0.134^2 + 0.03^2} = 1681\,\mathrm{rad/s}$ and $\omega_{\max} = 230.9/0.104 = 2220\,\mathrm{rad/s}$: a ratio of $1.32$. With $L = 1.0\,\mathrm{mH}$: $\omega_b = 230.9/\sqrt{0.134^2 + 0.1^2} = 1381\,\mathrm{rad/s}$ and $\omega_{\max} = 230.9/0.034 = 6791\,\mathrm{rad/s}$, a ratio of $4.9$. The higher inductance lowers the base speed somewhat but widens the constant-power range enormously, which is why traction motors are designed with $\lambda_m/L$ close to the rated current, usually by burying the magnets (IPM).
:::
:::
