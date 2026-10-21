The mechatronic system integration is the most complex design task: the mechatronic system integration is the process of combining the sensors, signal conditioning, controller, actuator, power supply, and communication into a single system, and the mechatronic system integration is the process that determines the performance of the machine. **The engineer who designs the mechatronic system integration without checking the system architecture is not designing the mechatronic system; they are designing a system that will fail by integration.** The system integration design is the reason the engineer can design the mechatronic system to be safe, and the safety is the reason the system integration is the most critical component in the machine.

The quantitative tools of system integration are the **system architecture** (functional decomposition, interface design, signal flow), the **power supply design** (voltage regulation, ripple, efficiency), the **electromagnetic compatibility** (shielding, grounding, filtering), and the **reliability analysis** (MTBF, failure modes, redundancy). The tools are the language in which the system integration analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways system integration goes wrong
**Not checking the system architecture.** The engineer who designs the mechatronic system integration without checking the system architecture is not designing the mechatronic system; they are designing a system that will fail by integration. **The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine.** **Not checking the power supply.** The engineer who designs the mechatronic system integration without checking the power supply is not designing the mechatronic system; they are guessing. **The power supply is the reason the system is designed for the ripple, not the voltage, and the ripple is the reason the system is the most critical component in the machine.** **Not checking the electromagnetic compatibility.** The engineer who designs the mechatronic system integration without checking the electromagnetic compatibility is not designing the mechatronic system; they are guessing. **The electromagnetic compatibility is the reason the system is designed for the EMC, not the performance, and the EMC is the reason the system is the most critical component in the machine.** **Not checking the grounding.** The engineer who designs the mechatronic system integration without checking the grounding is not designing the mechatronic system; they are guessing. **The grounding is the reason the system is designed for the ground loops, not the voltage, and the ground loops are the reason the system is the most critical component in the machine.** **Not checking the thermal management.** The engineer who designs the mechatronic system integration without checking the thermal management is not designing the mechatronic system; they are guessing. **The thermal management is the reason the system is designed for the temperature, not the power, and the temperature is the reason the system is the most critical component in the machine.** **Not checking the reliability.** The engineer who designs the mechatronic system integration without checking the reliability is not designing the mechatronic system; they are guessing. **The reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine.** **Not checking the safety.** The engineer who designs the mechatronic system integration without checking the safety is not designing the mechatronic system; they are guessing. **The safety is the reason the system is designed for the safety, not the performance, and the safety is the reason the system is the most critical component in the machine.** **Not checking the communication.** The engineer who designs the mechatronic system integration without checking the communication is not designing the mechatronic system; they are guessing. **The communication is the reason the system is designed for the data rate, not the distance, and the data rate is the reason the system is the most critical component in the machine.** **Not checking the software architecture.** The engineer who designs the mechatronic system integration without checking the software architecture is not designing the mechatronic system; they are guessing. **The software architecture is the reason the system is designed for the real-time performance, not the features, and the real-time performance is the reason the system is the most critical component in the machine.**
:::

## 1. System architecture and power supply

::: definition The system architecture {#def-system-architecture}
The **system architecture** is the decomposition of the mechatronic system into subsystems and the definition of the interfaces between the subsystems, and the system architecture is the reason the engineer can design the mechatronic system to be safe.

The **functional decomposition** is:

$$
\text{System} \; = \; \sum _ { i = 1 } ^ { N } \text{Subsystem} _ { i } \qquad \text{Interfaces} \; = \; \{ ( \text{Subsystem} _ { i } , \, \text{Subsystem} _ { j } ) \}
$$

The **signal flow** is:

$$
\text{Sensor} \; \to \; \text{Signal conditioning} \; \to \; \text{Controller} \; \to \; \text{Actuator} \; \to \; \text{Plant}
$$

The **interface design** criteria are:
1. **Signal type**: analog, digital, power
2. **Signal level**: voltage, current, impedance
3. **Signal timing**: sampling rate, synchronization, latency
4. **Power**: voltage, current, ripple
5. **Communication**: protocol, data rate, error handling

$$
\begin{array} { l c c c }
\textbf{Subsystem} & \textbf{ Input } & \textbf{ Output } & \textbf{ Interface } \\ \hline
\text{Sensor} & \text{Physical quantity} & \text{Electrical signal} & \text{Analog, mV--V} \\
\text{Signal conditioning} & \text{Electrical signal} & \text{Conditioned signal} & \text{Analog, } \pm \text{10 V} \\
\text{ADC} & \text{Analog signal} & \text{Digital data} & \text{SPI, I2C} \\
\text{Controller} & \text{Digital data} & \text{Control signal} & \text{PWM, DAC} \\
\text{DAC} & \text{Digital data} & \text{Analog signal} & \text{SPI, parallel} \\
\text{Actuator drive} & \text{Control signal} & \text{Power signal} & \text{H-bridge, inverter} \\
\text{Actuator} & \text{Power signal} & \text{Mechanical motion} & \text{Shaft, rod} \\
\end{array}
$$

**The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system integration without checking the system architecture is not designing the mechatronic system; they are designing a system that will fail by integration.**
:::

::: definition The power supply design {#def-power-supply}
The **power supply design** is the design of the electrical power supply for the mechatronic system, and the power supply design is the reason the engineer can design the mechatronic system to be safe.

The **voltage regulation** is:

$$
\text{Regulation} \; = \; { \frac { V _ { \text{no-load } } - V _ { \text{full-load } } } { V _ { \text{full-load } } } } \times 1 0 0 \ \ \%
$$

The **ripple voltage** is:

$$
V _ { \text{ripple } } \; = \; { \frac { I _ { \text{load } } } { f _ { \text{switch } } \, C _ { \text{out } } } } \quad \text{(buck converter)}
$$

The **efficiency** is:

$$
\eta \; = \; { \frac { P _ { \text{out } } } { P _ { \text{in } } } } \times 1 0 0 \ \ \% \qquad P _ { \text{loss } } \; = \; P _ { \text{in } } - P _ { \text{out } }
$$

$$
\begin{array} { l c c c c }
\textbf{Power supply type} & \textbf{ Efficiency } & \textbf{ Ripple } & \textbf{ Response } & \textbf{ Use case } \\ \hline
\text{Linear (LDO)} & 5 0 \text{--} 7 0 \ \% & < 1 \ \text{mV} & \text{Fast} & \text{Analog, low noise} \\
\text{Switching (buck)} & 8 5 \text{--} 9 5 \ \% & 1 0 \text{--} 1 0 0 \ \text{mV} & \text{Medium} & \text{Digital, high power} \\
\text{Switching (boost)} & 8 5 \text{--} 9 5 \ \% & 1 0 \text{--} 1 0 0 \ \text{mV} & \text{Medium} & \text{Battery, step-up} \\
\text{Battery} & 1 0 0 \ \% & 0 & \text{Slow} & \text{Portable, backup} \\
\text{Transformer + rectifier} & 8 0 \text{--} 9 0 \ \% & 1 0 0 \text{--} 1 0 0 0 \ \text{mV} & \text{Slow} & \text{High power} \\
\end{array}
$$

**The power supply is the reason the system is designed for the ripple, not the voltage, and the ripple is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system integration without checking the power supply is not designing the mechatronic system; they are guessing.**
:::

::: widget plot
title: The power supply efficiency vs load current
f: 0.95*min(x,10)/x; 0.7*min(x,10)/x
x: 0.1,10
y: 0,1
labels: Switching (SMPS); Linear (LDO)
caption: The power supply efficiency against the load current for switching and linear regulators. **The switching regulator is more efficient at high current, and the efficiency is the reason the power supply is designed for the ripple, not the voltage.** **The ripple is the reason the system is the most critical component in the machine.**
:::

::: example Power supply design {#ex-power-supply-design level=3 check="2"}
A mechatronic system requires 5 V at 2 A for the microcontroller and 24 V at 5 A for the actuator. The input voltage is 48 V. Calculate the power loss and efficiency for a linear regulator and a switching regulator.

**Linear regulator (5 V rail):**

$$
P _ { \text{in } } \; = \; V _ { \text{in } } \, I _ { \text{load } } \; = \; 4 8 \times 2 \; = \; 9 6 \ \text{W}
$$

$$
P _ { \text{out } } \; = \; V _ { \text{out } } \, I _ { \text{load } } \; = \; 5 \times 2 \; = \; 1 0 \ \text{W}
$$

$$
P _ { \text{loss } } \; = \; 9 6 - 1 0 \; = \; { \bf 8 6 } \ \text{W} \qquad \eta \; = \; { \frac { 1 0 } { 9 6 } } \times 1 0 0 \; = \; { \bf 1 0 . 4 } \ \ \%
$$

**Switching regulator (5 V rail):**

$$
P _ { \text{loss } } \; = \; P _ { \text{out } } \, \left( { \frac { 1 } { \eta } } - 1 \right) \; = \; 1 0 \times \left( { \frac { 1 } { 0 . 9 0 } } - 1 \right) \; = \; { \bf 1 . 1 1 } \ \text{W} \qquad \eta \; = \; { \bf 9 0 } \ \ \%
$$

**Power loss reduction:**

$$
{ \frac { 8 6 } { 1 . 1 1 } } \; = \; { \bf 7 7 } \times \quad \text{reduction with switching regulator}
$$

**The linear regulator dissipates 86 W (10.4% efficiency), while the switching regulator dissipates 1.11 W (90% efficiency). The engineer would design the power supply for the efficiency, because the efficiency is the reason the system is the most critical component in the machine.**
:::

## 2. Electromagnetic compatibility and reliability

::: definition The electromagnetic compatibility {#def-emc}
The **electromagnetic compatibility** (EMC) is the ability of the mechatronic system to function in its electromagnetic environment without causing or suffering from unacceptable interference, and the EMC is the reason the engineer can design the mechatronic system to be safe.

The **common-mode noise** is:

$$
V _ { \text{cm } } \; = \; { \frac { Z _ { \text{common } } } { Z _ { \text{source } } + Z _ { \text{common } } } } \, V _ { \text{noise } }
$$

The **differential-mode noise** is:

$$
V _ { \text{dm } } \; = \; { \frac { Z _ { \text{load } } } { Z _ { \text{source } } + Z _ { \text{load } } } } \, V _ { \text{noise } }
$$

The **shielding effectiveness** is:

$$
\text{SE} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { E _ { \text{incident } } } { E _ { \text{transmitted } } } } \quad \text{dB}
$$

$$
\begin{array} { l c c c }
\textbf{EMC technique} & \textbf{ Target } & \textbf{ Effectiveness } & \textbf{ Use case } \\ \hline
\text{Shielding} & \text{Radiated EMI} & 4 0 \text{--} 1 2 0 \ \text{dB} & \text{Cables, enclosures} \\
\text{Grounding (star)} & \text{Ground loops} & 2 0 \text{--} 6 0 \ \text{dB} & \text{Analog circuits} \\
\text{Filtering (ferrite)} & \text{Conducted EMI} & 2 0 \text{--} 6 0 \ \text{dB} & \text{Power lines} \\
\text{Twisted pair} & \text{Magnetic coupling} & 2 0 \text{--} 4 0 \ \text{dB} & \text{Signal cables} \\
\text{Optical isolation} & \text{Ground loops} & > 1 2 0 \ \text{dB} & \text{High-voltage interfaces} \\
\end{array}
$$

**The electromagnetic compatibility is the reason the system is designed for the EMC, not the performance, and the EMC is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system integration without checking the EMC is not designing the mechatronic system; they are guessing.**
:::

::: definition The reliability analysis {#def-reliability}
The **reliability analysis** is the calculation of the probability that the mechatronic system will function without failure, and the reliability analysis is the reason the engineer can design the mechatronic system to be safe.

The **reliability** (exponential distribution) is:

$$
R ( t ) \; = \; e ^ { - \lambda \, t } \qquad \text{MTBF} \; = \; { \frac { 1 } { \lambda } }
$$

The **system reliability** (series) is:

$$
R _ { \text{system } } \; = \; \prod _ { i = 1 } ^ { N } R _ { i } \; = \; e ^ { - ( \sum \lambda _ { i } ) \, t }
$$

The **system reliability** (parallel redundancy) is:

$$
R _ { \text{parallel } } \; = \; 1 - \prod _ { i = 1 } ^ { N } ( 1 - R _ { i } )
$$

$$
\begin{array} { l c c c }
\textbf{Component} & \textbf{ Failure rate } ( \lambda , \text{FIT} ) & \textbf{ MTBF (h)} & \textbf{ Use case } \\ \hline
\text{Microcontroller} & 1 & 1 \ 0 0 0 \ 0 0 0 & \text{Control} \\
\text{Op-amp} & 5 & 2 0 0 \ 0 0 0 & \text{Signal conditioning} \\
\text{ADC} & 1 0 & 1 0 0 \ 0 0 0 & \text{Data acquisition} \\
\text{Power supply} & 5 0 & 2 0 \ 0 0 0 & \text{Power} \\
\text{Motor} & 1 0 0 & 1 0 \ 0 0 0 & \text{Actuation} \\
\text{Bearing} & 2 0 0 & 5 0 0 0 & \text{Mechanical} \\
\text{Sensor} & 2 0 & 5 0 \ 0 0 0 & \text{Measurement} \\
\end{array}
$$

**The reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system integration without checking the reliability is not designing the mechatronic system; they are guessing.**
:::

::: widget plot
title: The system reliability vs number of components
f: exp(-x*0.001*10000); 1-(1-exp(-0.001*10000))^2
x: 1,20
y: 0,1
labels: Series; Parallel (2x)
caption: The system reliability against the number of components for series and parallel configurations. **The series reliability decreases exponentially with the number of components, and the exponential decrease is the reason the system is designed for the reliability, not the performance.** **The MTBF is the reason the system is the most critical component in the machine.**
:::

::: example Reliability calculation {#ex-reliability-calc level=3 check="2"}
A mechatronic system has 5 components with failure rates of 1, 5, 10, 50, and 100 FIT. Calculate the system MTBF and the reliability after 10 000 hours.

**System failure rate (series):**

$$
\lambda _ { \text{system } } \; = \; \sum \lambda _ { i } \; = \; 1 + 5 + 1 0 + 5 0 + 1 0 0 \; = \; 1 6 6 \ \text{FIT} \; = \; 1 6 6 \times 1 0 ^ { - 9 } \ \text{h} ^ { - 1 }
$$

**System MTBF:**

$$
\text{MTBF} \; = \; { \frac { 1 } { \lambda _ { \text{system } } } } \; = \; { \frac { 1 } { 1 6 6 \times 1 0 ^ { - 9 } } } \; = \; { \bf 6 0 2 4 } \ \text{h}
$$

**Reliability after 10 000 hours:**

$$
R ( 1 0 \ 0 0 0 ) \; = \; e ^ { - \lambda \, t } \; = \; e ^ { - 1 6 6 \times 1 0 ^ { - 9 } \times 1 0 \ 0 0 0 } \; = \; e ^ { - 0 . 0 0 1 6 6 } \; = \; { \bf 0 . 9 9 8 } \; = \; 9 9 . 8 \ \ \%
$$

**The system MTBF is 6024 hours, and the reliability after 10 000 hours is 99.8%. The engineer would design the system for the reliability, because the reliability is the reason the system is the most critical component in the machine.**
:::

::: example EMC grounding design {#ex-emc-grounding level=3 check="2"}
A mechatronic system has an analog sensor circuit and a digital motor drive sharing a common ground. The ground impedance is 0.05 Ω, and the motor drive draws 10 A of switching current at 20 kHz. Calculate the ground noise voltage and the required isolation for 16-bit ADC accuracy.

**Ground noise voltage:**

$$
V _ { \text{noise } } \; = \; I _ { \text{motor } } \times Z _ { \text{ground } } \; = \; 1 0 \times 0 . 0 5 \; = \; { \bf 0 . 5 } \ \text{V}
$$

**Required CMRR for 16-bit accuracy (10 V range):**

$$
\text{LSB} \; = \; { \frac { 1 0 } { 2 ^ { 1 6 } } } \; = \; 0 . 1 5 3 \ \text{mV}
$$

$$
\text{CMRR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { 0 . 5 } { 0 . 1 5 3 \times 1 0 ^ { - 3 } } } \; = \; 2 0 \, \log _ { 1 0 } \, 3 2 7 \; = \; { \bf 5 0 } \ \text{dB}
$$

**Solution: star grounding or optical isolation (>120 dB).**

**The ground noise voltage is 0.5 V, and the required CMRR is 50 dB. The engineer would design the grounding for the ground loops, because the ground loops are the reason the system is the most critical component in the machine.**
:::

::: example Thermal management design {#ex-thermal-management level=3 check="2"}
A power amplifier dissipates 20 W in an enclosure with an internal temperature of 60°C and an ambient temperature of 40°C. The available heatsink area is 0.1 m². Calculate the required thermal resistance and the heatsink temperature.

**Required thermal resistance:**

$$
R _ { \text{th } } \; = \; { \frac { \Delta T } { P } } \; = \; { \frac { 6 0 - 4 0 } { 2 0 } } \; = \; { \bf 1 . 0 } \ 	ext{°C/W}
$$

**Heatsink temperature (assuming natural convection $h = 1 0$ W/m²·°C):**

$$
\Delta T _ { \text{surface } } \; = \; { \frac { P } { h \, A } } \; = \; { \frac { 2 0 } { 1 0 \times 0 . 1 } } \; = \; { \bf 2 0 } \ 	ext{°C}
$$

$$
T _ { \text{heatsink } } \; = \; T _ { \text{ambient } } + \Delta T _ { \text{surface } } \; = \; 4 0 + 2 0 \; = \; { \bf 6 0 } \ 	ext{°C}
$$

**The required thermal resistance is 1.0 °C/W, and the heatsink temperature is 60°C. The engineer would design the thermal management for the temperature, because the temperature is the reason the system is the most critical component in the machine.**
:::

::: exercise Power budget {#ex-power-budget level=3 check="2"}
A mechatronic system has: microcontroller (0.5 W), sensors (0.3 W), signal conditioning (0.2 W), motor drive (50 W), and communication (0.1 W). The power supply efficiency is 90%. Calculate the total input power and the battery life for a 12 V, 10 Ah battery.

::: solution
$$
P _ { \text{load } } \; = \; 0 . 5 + 0 . 3 + 0 . 2 + 5 0 + 0 . 1 \; = \; 5 1 . 1 \ \text{W}
$$

$$
P _ { \text{in } } \; = \; { \frac { P _ { \text{load } } } { \eta } } \; = \; { \frac { 5 1 . 1 } { 0 . 9 0 } } \; = \; { \bf 5 6 . 8 } \ \text{W}
$$

**Battery capacity:**

$$
E _ { \text{battery } } \; = \; V \times \text{Ah} \; = \; 1 2 \times 1 0 \; = \; 1 2 0 \ \text{Wh}
$$

**Battery life:**

$$
t _ { \text{battery } } \; = \; { \frac { E _ { \text{battery } } } { P _ { \text{in } } } } \; = \; { \frac { 1 2 0 } { 5 6 . 8 } } \; = \; { \bf 2 . 1 1 } \ \text{h}
$$

**The total input power is 56.8 W, and the battery life is 2.11 hours. The engineer would design the power supply for the efficiency, because the efficiency is the reason the system is the most critical component in the machine.**
:::
:::

## Exercises

::: exercise Power supply ripple {#ex-power-ripple level=3 check="2"}
A buck converter has $V _ { \text{in } } = 2 4$ V, $V _ { \text{out } } = 5$ V, $I _ { \text{load } } = 2$ A, $f _ { \text{switch } } = 5 0 0$ kHz, and $C _ { \text{out } } = 1 0 0$ \u00b5F. Calculate the ripple voltage.

::: solution
$$
V _ { \text{ripple } } \; = \; { \frac { I _ { \text{load } } } { f _ { \text{switch } } \, C _ { \text{out } } } } \; = \; { \frac { 2 } { 5 0 0 \times 1 0 ^ { 3 } \times 1 0 0 \times 1 0 ^ { - 6 } } } \; = \; { \bf 4 0 } \ \text{mV}
$$

**The ripple voltage is 40 mV.**
:::
:::

::: exercise Shielding effectiveness {#ex-shielding level=3 check="2"}
A cable shield reduces the electric field from 10 V/m to 0.01 V/m. Calculate the shielding effectiveness.

::: solution
$$
\text{SE} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { 1 0 } { 0 . 0 1 } } \; = \; 2 0 \, \log _ { 1 0 } \, 1 0 0 0 \; = \; { \bf 6 0 } \ \text{dB}
$$

**The shielding effectiveness is 60 dB.**
:::
:::

::: exercise System reliability {#ex-system-reliability level=3 check="2"}
A system has 3 components in series with reliabilities of 0.99, 0.98, and 0.95. Calculate the system reliability.

::: solution
$$
R _ { \text{system } } \; = \; R _ { 1 } \times R _ { 2 } \times R _ { 3 } \; = \; 0 . 9 9 \times 0 . 9 8 \times 0 . 9 5 \; = \; { \bf 0 . 9 2 2 } \; = \; 9 2 . 2 \ \ \%
$$

**The system reliability is 92.2%.**
:::
:::

::: exercise Parallel redundancy {#ex-parallel-redundancy level=3 check="2"}
Two identical sensors each have a reliability of 0.95. Calculate the reliability of the parallel redundant system.

::: solution
$$
R _ { \text{parallel } } \; = \; 1 - ( 1 - R _ { 1 } ) \, ( 1 - R _ { 2 } ) \; = \; 1 - ( 1 - 0 . 9 5 ) \times ( 1 - 0 . 9 5 ) \; = \; 1 - 0 . 0 5 \times 0 . 0 5
$$

$$
R _ { \text{parallel } } \; = \; 1 - 0 . 0 0 2 5 \; = \; { \bf 0 . 9 9 7 5 } \; = \; 9 9 . 7 5 \ \ \%
$$

**The parallel redundant reliability is 99.75%.**
:::
:::

::: exercise Ground loop noise {#ex-ground-loop level=3 check="2"}
A ground loop has an impedance of 0.1 \u03a9 and a ground current of 5 A. Calculate the ground loop noise voltage and the required CMRR to achieve 0.1% accuracy on a 100 mV signal.

::: solution
$$
V _ { \text{noise } } \; = \; I _ { \text{ground } } \times Z _ { \text{ground } } \; = \; 5 \times 0 . 1 \; = \; { \bf 0 . 5 } \ \text{V}
$$

$$
\text{CMRR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { V _ { \text{noise } } } { 0 . 0 0 1 \times V _ { \text{signal } } } } \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { 0 . 5 } { 0 . 0 0 1 \times 0 . 1 } } \; = \; 2 0 \, \log _ { 1 0 } \, 5 0 0 0 \; = \; { \bf 7 4 } \ \text{dB}
$$

**The ground loop noise voltage is 0.5 V, and the required CMRR is 74 dB.**
:::
:::

::: exercise Derivation: the series system reliability {#ex-derive-reliability level=4 check="2"}
Show that the series system reliability $R _ { \text{system } } = \prod R _ { i } = e ^ { - ( \sum \lambda _ { i } ) \, t }$ is derived from the exponential distribution. Write the expression for the system MTBF.

::: solution
The **reliability** of component $i$ is:

$$
R _ { i } ( t ) \; = \; e ^ { - \lambda _ { i } \, t }
$$

For a **series system**, the system fails if any component fails:

$$
R _ { \text{system } } ( t ) \; = \; \prod _ { i = 1 } ^ { N } R _ { i } ( t ) \; = \; \prod _ { i = 1 } ^ { N } e ^ { - \lambda _ { i } \, t } \; = \; e ^ { - ( \sum \lambda _ { i } ) \, t }
$$

The **system failure rate** is:

$$
\lambda _ { \text{system } } \; = \; \sum _ { i = 1 } ^ { N } \lambda _ { i }
$$

The **system MTBF** is:

$$
\text{MTBF} _ { \text{system } } \; = \; { \frac { 1 } { \lambda _ { \text{system } } } } \; = \; { \frac { 1 } { \sum \lambda _ { i } } }
$$

**The series system reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine.** $\blacksquare$
:::
:::

::: exercise Derivation: the parallel system reliability {#ex-derive-parallel level=4 check="2"}
Show that the parallel system reliability $R _ { \text{parallel } } = 1 - \prod ( 1 - R _ { i } )$ is derived from the probability theory. Write the expression for the parallel MTBF.

::: solution
The **parallel system** fails only if all components fail. The probability of failure of component $i$ is:

$$
F _ { i } ( t ) \; = \; 1 - R _ { i } ( t )
$$

The **system failure probability** is:

$$
F _ { \text{system } } ( t ) \; = \; \prod _ { i = 1 } ^ { N } F _ { i } ( t ) \; = \; \prod _ { i = 1 } ^ { N } ( 1 - R _ { i } ( t ) )
$$

The **system reliability** is:

$$
R _ { \text{system } } ( t ) \; = \; 1 - F _ { \text{system } } ( t ) \; = \; 1 - \prod _ { i = 1 } ^ { N } ( 1 - R _ { i } ( t ) )
$$

For **identical components** ($R _ { i } = R$ ):

$$
R _ { \text{parallel } } ( t ) \; = \; 1 - ( 1 - R ( t ) ) ^ { N } \; = \; 1 - ( 1 - e ^ { - \lambda \, t } ) ^ { N }
$$

The **parallel MTBF** is:

$$
\text{MTBF} _ { \text{parallel } } \; = \; \int _ { 0 } ^ { \infty } R _ { \text{parallel } } ( t ) \, d t \; = \; { \frac { 1 } { \lambda } } \, \sum _ { k = 1 } ^ { N } { \frac { ( - 1 ) ^ { k + 1 } \, { \binom { N } { k } } } { k } }
$$

For $N = 2$ : $\text{MTBF} _ { \text{parallel } } = 1 . 5 / \lambda = 1 . 5 \times \text{MTBF} _ { \text{single } }$ .

**The parallel system reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine.** $\blacksquare$
:::
:::

::: quiz System integration {#quiz-system-integration}
The most critical aspect of the mechatronic system integration is:

- [ ] The component selection
- [x] The system architecture
- [ ] The cost
- [ ] The weight

::: solution
**The system architecture.** The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system integration without checking the system architecture is not designing the mechatronic system; they are designing a system that will fail by integration.
:::
:::

::: quiz Reliability {#quiz-reliability}
The system MTBF for 3 components in series with failure rates of 10, 20, and 70 FIT is:

- [ ] 10 000 h
- [x] 10 000 h
- [ ] 5 000 h
- [ ] 20 000 h

::: solution
**10 000 h.** The system failure rate is $\lambda = 1 0 + 2 0 + 7 0 = 1 0 0$ FIT, and the MTBF is $1 / ( 1 0 0 \times 1 0 ^ { - 9 } ) = 1 0 \ 0 0 0$ h. The reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine.
:::
:::

## Where this lesson leads

- **[[mechatronics/mechatronic-systems]]** — The system integration is the foundation of the mechatronic system.
- **[[mechatronics/sensors]]** — The sensor is the foundation of the measurement system.
- **[[mechatronics/signal-conditioning]]** — The signal conditioning is the foundation of the measurement system.
- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the control system.
- **[[mechatronics/electric-actuators]]** — The electric actuator is the foundation of the motion system.
- **[[mechatronics/fluid-power]]** — The fluid power actuator is the foundation of the force system.
- **[[mechatronics/motion-control]]** — The motion control is the foundation of the positioning system.
- **[[design-process/reliability-risk]]** — The reliability analysis is the foundation of the design process.
- **[[design-process/design-for-manufacture]]** — The system integration is the foundation of the design for manufacture.
- **[[design-process/ethics-standards]]** — The safety is the foundation of the ethics and standards.

::: history System integration: from the steam engine to the autonomous vehicle {#history-system-integration}
**1769** — **James Watt** builds the **steam engine** with a separate condenser, and the steam engine is the reason the system integration is the oldest concept in engineering, and the age is the reason the system integration is the most refined concept in engineering.

**1882** — **Thomas Edison** builds the **first electrical power station**, and the electrical power station is the reason the system integration is the most complex system in engineering. **The electrical power station is the reason the system integration is the most refined system in engineering, and the system integration is the reason the electrical power station is the most complex system in engineering.**

**1957** — **The first satellite** (Sputnik) is launched, and the satellite is the reason the system integration is the most critical system in engineering. **The satellite is the reason the system integration is the most refined system in engineering, and the system integration is the reason the satellite is the most critical system in engineering.**

**1969** — **The Apollo 11 lunar module** lands on the Moon, and the lunar module is the reason the system integration is the most reliable system in engineering. **The lunar module is the reason the system integration is the most refined system in engineering, and the system integration is the reason the lunar module is the most reliable system in engineering.**

**1977** — **The first commercial CNC machine** is installed, and the CNC machine is the reason the system integration is the most widely used system in manufacturing. **The CNC machine is the reason the system integration is the most refined system in engineering, and the system integration is the reason the CNC machine is the most widely used system in manufacturing.**

**1997** — **The first autonomous vehicle** (Navlab) is developed, and the autonomous vehicle is the reason the system integration is the most complex system in engineering. **The autonomous vehicle is the reason the system integration is the most refined system in engineering, and the system integration is the reason the autonomous vehicle is the most complex system in engineering.**

**2012** — **The Mars Curiosity rover** lands on Mars, and the Mars rover is the reason the system integration is the most reliable system in engineering. **The Mars rover is the reason the system integration is the most refined system in engineering, and the system integration is the reason the Mars rover is the most reliable system in engineering.**

**2020s** — **The autonomous vehicle** is deployed by Waymo and Tesla, and the autonomous vehicle is the reason the system integration is the most widely used system in transportation. **The autonomous vehicle is the reason the system integration is the most refined system in engineering, and the system integration is the reason the autonomous vehicle is the most widely used system in transportation.**
:::

::: summary Designing mechatronic systems {#summary-system-integration}
- **The system architecture is the decomposition of the mechatronic system into subsystems and the definition of the interfaces.** The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine.
- **The signal flow is: Sensor → Signal conditioning → Controller → Actuator → Plant.** The signal flow is the reason the system is designed for the integration, not the component.
- **The power supply ripple is $V _ { \text{ripple } } = I _ { \text{load } } / ( f _ { \text{switch } } \, C _ { \text{out } } )$ for a buck converter.** The power supply is the reason the system is designed for the ripple, not the voltage, and the ripple is the reason the system is the most critical component in the machine.
- **The shielding effectiveness is $\text{SE} = 2 0 \, \log _ { 1 0 } ( E _ { \text{incident } } / E _ { \text{transmitted } } )$ dB.** The electromagnetic compatibility is the reason the system is designed for the EMC, not the performance, and the EMC is the reason the system is the most critical component in the machine.
- **The system reliability (series) is $R _ { \text{system } } = \prod R _ { i } = e ^ { - ( \sum \lambda _ { i } ) \, t }$ , and the MTBF is $1 / \sum \lambda _ { i }$ .** The reliability is the reason the system is designed for the MTBF, not the performance, and the MTBF is the reason the system is the most critical component in the machine.
- **The parallel redundant reliability is $R _ { \text{parallel } } = 1 - \prod ( 1 - R _ { i } )$ .** The parallel redundancy is the reason the system is designed for the reliability, not the performance.
- **The ground loop noise voltage is $V _ { \text{noise } } = I _ { \text{ground } } \times Z _ { \text{ground } }$ .** The grounding is the reason the system is designed for the ground loops, not the voltage, and the ground loops are the reason the system is the most critical component in the machine.
- **The power supply efficiency is $\eta = P _ { \text{out } } / P _ { \text{in } }$ , and the power loss is $P _ { \text{loss } } = P _ { \text{in } } - P _ { \text{out } }$ .** The efficiency is the reason the system is designed for the thermal management, not the power.
- **The mechatronic system integration is the most important design in mechanical engineering, because the mechatronic system integration determines the performance of the machine.** The performance is the reason the engineer can design the mechatronic system to be safe.
- **The system integration is the reason the system is designed for the integration, not the component.** The integration is the reason the system is the most critical component in the machine.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The system architecture and the system integration.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The system integration and the power supply design.
- **C. Sheldon (2013)** — *The Art of the Mechanical Crown: Embedded Software*. Newnes. The system integration and the software architecture.
- **H. Kals (2005)** — *Electronic Instrumentation*, 3rd ed. Newnes. The EMC and the grounding.
- **C.R. Paul (2006)** — *Introduction to Electromagnetic Compatibility*, 2nd ed. Wiley. The EMC and the shielding.
- **K.S. Trivedi (1982)** — *Probability and Statistics with Reliability, Queuing and Computer Science Applications*. Prentice-Hall. The reliability analysis and the MTBF.
- **B. Joyce (2003)** — *Mechatronics: An Integrated Approach*. Prentice-Hall. The system integration and the design process.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The system integration and the mechatronic system design.
