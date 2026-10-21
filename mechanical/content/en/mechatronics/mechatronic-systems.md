The mechatronic system is the most complex system: the mechatronic system is the robot, the CNC machine, the anti-lock brake, and the autonomous vehicle, and the mechatronic system is the system that determines the performance of the machine. **The engineer who designs the mechatronic system without understanding the system integration is not designing the system; they are designing a system that will fail by instability, not by component failure.** The mechatronic system design is the reason the engineer can predict the performance of the system, and the prediction is the reason the system is safe.

The quantitative tools of mechatronic system design are the **system architecture** (the decomposition of the system into subsystems), the **sensor selection** (the selection of the sensor for the measurement), the **actuator selection** (the selection of the actuator for the motion), and the **control system design** (the selection of the controller for the performance). The tools are the language in which the mechatronic system design is expressed, and the language is the reason the design is a calculation, not a guess.

::: warning Nine ways mechatronic system design goes wrong
**Not checking the system architecture.** The engineer who designs the mechatronic system without checking the system architecture is not designing the system; they are designing a system that will fail by integration. **The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine.** **Not checking the sensor bandwidth.** The engineer who selects the sensor without checking the bandwidth is not selecting the sensor; they are guessing. **The sensor bandwidth is the reason the sensor is designed for the frequency, not the amplitude, and the frequency is the reason the sensor is the most critical component in the control system.** **Not checking the actuator bandwidth.** The engineer who selects the actuator without checking the bandwidth is not selecting the actuator; they are guessing. **The actuator bandwidth is the reason the actuator is designed for the frequency, not the force, and the frequency is the reason the actuator is the most critical component in the control system.** **Not checking the control system stability.** The engineer who designs the control system without checking the stability is not designing the control system; they are guessing. **The control system stability is the reason the control system is designed for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine.** **Not checking the signal conditioning.** The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing. **The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the communication bandwidth.** The engineer who designs the communication system without checking the bandwidth is not designing the communication system; they are guessing. **The communication bandwidth is the reason the communication system is designed for the data rate, not the distance, and the data rate is the reason the communication system is the most critical component in the distributed system.** **Not checking the power supply.** The engineer who designs the power supply without checking the ripple is not designing the power supply; they are guessing. **The ripple is the reason the power supply is designed for the ripple, not the voltage, and the ripple is the reason the power supply is the most critical component in the electronic system.** **Not checking the electromagnetic compatibility.** The engineer who designs the system without checking the electromagnetic compatibility is not designing the system; they are designing a system that will fail by electromagnetic interference. **The electromagnetic compatibility is the reason the system is designed for the electromagnetic compatibility, not the performance, and the electromagnetic compatibility is the reason the system is the most critical component in the vehicle.** **Not checking the safety.** The engineer who designs the system without checking the safety is not designing the system; they are designing a system that will fail by hazard. **The safety is the reason the system is designed for the safety, not the performance, and the safety is the reason the system is the most critical component in the machine.**
:::

## 1. Mechatronic system architecture

::: definition The mechatronic system architecture {#def-architecture}
The **mechatronic system architecture** is the decomposition of the system into subsystems, and the mechatronic system architecture is the reason the engineer can design the system to be safe.

The **mechatronic system** consists of:
1. **Sensors**: the devices that measure the physical quantity (position, velocity, force, temperature, pressure)
2. **Signal conditioning**: the devices that amplify, filter, and convert the sensor signal
3. **Controller**: the device that calculates the control action from the sensor signal
4. **Actuator**: the device that converts the control signal into the physical action (force, motion, heat)
5. **Power supply**: the device that provides the electrical power to the system
6. **Communication**: the device that transfers the data between the subsystems

$$
\begin{array} { l c c c }
\textbf{Subsystem} & \textbf{Function} & \textbf{Key parameter} & \textbf{Use case} \\ \hline
\text{Sensor} & \text{Measure physical quantity} & \text{Bandwidth, accuracy} & \text{Position, velocity, force} \\
\text{Signal conditioning} & \text{Amplify, filter, convert} & \text{Gain, noise, bandwidth} & \text{Strain gauge, thermocouple} \\
\text{Controller} & \text{Calculate control action} & \text{Sampling rate, computation} & \text{PID, state-space, fuzzy} \\
\text{Actuator} & \text{Convert signal to action} & \text{Force, speed, bandwidth} & \text{Motor, hydraulic, pneumatic} \\
\text{Power supply} & \text{Provide electrical power} & \text{Voltage, current, ripple} & \text{Battery, SMPS, linear} \\
\text{Communication} & \text{Transfer data} & \text{Data rate, latency} & \text{CAN, Ethernet, SPI} \\
\end{array}
$$

**The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine. The engineer who designs the mechatronic system without checking the system architecture is not designing the system; they are designing a system that will fail by integration.**
:::

::: definition The sensor-actuator selection {#def-sensor-actuator}
The **sensor-actuator selection** is the selection of the sensor and the actuator for the application, and the sensor-actuator selection is the reason the engineer can design the system to be safe.

**Sensor selection criteria:**
1. **Measurand**: the physical quantity to be measured
2. **Range**: the minimum and maximum values of the measurand
3. **Accuracy**: the closeness of the measurement to the true value
4. **Resolution**: the smallest change in the measurand that can be detected
5. **Bandwidth**: the frequency range over which the sensor responds
6. **Linearity**: the closeness of the sensor output to a straight line
7. **Environment**: the temperature, humidity, vibration, and electromagnetic interference

**Actuator selection criteria:**
1. **Force/torque**: the force or torque required
2. **Speed**: the speed of the motion
3. **Accuracy**: the positioning accuracy
4. **Bandwidth**: the frequency response
5. **Efficiency**: the ratio of the output power to the input power
6. **Environment**: the temperature, humidity, vibration, and electromagnetic interference

$$
\begin{array} { l c c c }
\textbf{Sensor type} & \textbf{Measurand} & \textbf{Range} & \textbf{Accuracy} \\ \hline
\text{Potentiometer} & \text{Position} & 0 \text{--} 3 6 0 ^ { \circ } & 0 . 1 \ \% \\
\text{LVDT} & \text{Position} & \pm 5 0 0 \ \text{mm} & 0 . 2 5 \ \% \\
\text{Encoder} & \text{Position} & \text{Unlimited} & 0 . 0 1 \ \% \\
\text{Strain gauge} & \text{Force/strain} & \pm 1 0 \ 0 0 0 \ \mu \varepsilon & 0 . 1 \ \% \\
\text{Accelerometer} & \text{Acceleration} & \pm 1 0 0 \, g & 0 . 1 \ \% \\
\text{Thermocouple} & \text{Temperature} & - 2 0 0 \text{--} 1  7 0 0 \, ^ { \circ } \text{C} & 1 \ ^ { \circ } \text{C} \\
\text{RTD} & \text{Temperature} & - 2 0 0 \text{--} 8 5 0 \, ^ { \circ } \text{C} & 0 . 1 \ ^ { \circ } \text{C} \\
\text{Piezoelectric} & \text{Force/pressure} & 0 \text{--} 1 0 0 \ \text{MPa} & 1 \ \% \\
\end{array}
$$

**The sensor bandwidth is the reason the sensor is designed for the frequency, not the amplitude, and the frequency is the reason the sensor is the most critical component in the control system. The engineer who selects the sensor without checking the bandwidth is not selecting the sensor; they are guessing.**
:::

::: widget plot
title: The sensor accuracy vs range
f: 0.1/x; 0.25/x; 1/x
x: 1,100
y: 0,2
labels: Encoder; LVDT; Potentiometer
caption: The sensor accuracy against the range for different sensor types. **The encoder is the most accurate sensor, and the accuracy is the reason the encoder is the most widely used sensor in the control system.** **The accuracy is inversely proportional to the range, and the inverse proportionality is the reason the sensor is designed for the range, not the accuracy.**
:::

::: example Sensor selection for a CNC machine {#ex-sensor-selection level=3 check="2"}
A CNC machine requires a position sensor with a range of 0-1000 mm, an accuracy of ±0.01 mm, and a bandwidth of 1 kHz. Select the appropriate sensor.

**Required accuracy:**

$$
\text{Accuracy} \; = \; { \frac { 0 . 0 1 } { 1 0 0 0 } } \times 1 0 0 \; = \; 0 . 0 0 1 \; \ \%
$$

**Sensor comparison:**

$$
\begin{array} { l c c c }
\textbf{Sensor} & \textbf{Accuracy} & \textbf{Bandwidth} & \textbf{Suitable?} \\ \hline
\text{Potentiometer} & 0 . 1 \ \% & 1 0 0 \ \text{Hz} & \text{No (accuracy, bandwidth)} \\
\text{LVDT} & 0 . 2 5 \ \% & 5 0 0 \ \text{Hz} & \text{No (accuracy)} \\
\text{Linear encoder} & 0 . 0 0 1 \ \% & 1 0 \ \text{kHz} & \text{Yes} \\
\text{Linear scale} & 0 . 0 0 0 5 \ \% & 1 0 0 \ \text{kHz} & \text{Yes (over-spec)} \\
\end{array}
$$

**The linear encoder is the appropriate sensor, because the linear encoder meets the accuracy and bandwidth requirements. The engineer would select the linear encoder for the CNC machine, because the linear encoder is the reason the CNC machine is designed for the accuracy, not the range.**
:::

## 2. Control system design

::: definition The control system design {#def-control-design}
The **control system design** is the selection of the controller for the performance, and the control system design is the reason the engineer can design the system to be safe.

The **PID controller** is the most widely used controller:

$$
u ( t ) \; = \; K _ { p } \, e ( t ) + K _ { i } \, \int _ { 0 } ^ { t } \, e ( \tau ) \, d \tau + K _ { d } \, { \frac { d e ( t ) } { d t } }
$$

The **closed-loop transfer function** is:

$$
G _ { c l } ( s ) \; = \; { \frac { G _ { c } ( s ) \, G _ { p } ( s ) } { 1 + G _ { c } ( s ) \, G _ { p } ( s ) \, H ( s ) } }
$$

The **stability margins** are:
- **Gain margin**: the factor by which the gain can be increased before instability
- **Phase margin**: the amount of phase lag that can be added before instability

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{Transfer function} & \textbf{Use case} & \textbf{Tuning} \\ \hline
\text{P} & K _ { p } & \text{Simple systems} & \text{Ziegler-Nichols} \\
\text{PI} & K _ { p } + K _ { i } / s & \text{Zero steady-state error} & \text{Ziegler-Nichols} \\
\text{PID} & K _ { p } + K _ { i } / s + K _ { d } \, s & \text{General purpose} & \text{Ziegler-Nichols} \\
\text{Lead-lag} & ( 1 + a \, T \, s ) / ( 1 + T \, s ) & \text{Phase margin} & \text{Frequency response} \\
\text{State-space} & u = - K \, x & \text{MIMO systems} & \text{Pole placement} \\
\end{array}
$$

**The control system stability is the reason the control system is designed for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine. The engineer who designs the control system without checking the stability is not designing the control system; they are guessing.**
:::

::: definition The signal conditioning {#def-signal-conditioning}
The **signal conditioning** is the amplification, filtering, and conversion of the sensor signal, and the signal conditioning is the reason the engineer can design the measurement system to be safe.

**Amplification:**

$$
V _ { \text{out } } \; = \; G \, V _ { \text{in } } \qquad G \; = \; { \frac { R _ { f } } { R _ { \text{in } } } } \quad \text{(inverting op-amp)}
$$

**Filtering:**

$$
H ( s ) \; = \; { \frac { 1 } { 1 + s \, R \, C } } \qquad f _ { c } \; = \; { \frac { 1 } { 2 \, \pi \, R \, C } }
$$

**Analog-to-digital conversion:**

$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \qquad \text{SNR} \; = \; 6 . 0 2 \, n + 1 . 7 6 \ \text{dB}
$$

$$
\begin{array} { l c c c }
\textbf{Component} & \textbf{Function} & \textbf{Key parameter} & \textbf{Use case} \\ \hline
\text{Instrumentation amp} & \text{Amplify differential signal} & \text{CMRR, gain} & \text{Strain gauge} \\
\text{Low-pass filter} & \text{Remove high-frequency noise} & f _ { c } & \text{Anti-aliasing} \\
\text{ADC} & \text{Convert analog to digital} & \text{Resolution, sampling rate} & \text{Data acquisition} \\
\text{DAC} & \text{Convert digital to analog} & \text{Resolution, settling time} & \text{Actuator drive} \\
\text{Isolation amp} & \text{Isolate ground loops} & \text{Isolation voltage} & \text{High-voltage measurement} \\
\end{array}
$$

**The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing.**
:::

::: widget plot
title: The PID step response vs controller gain
f: 1-exp(-x)*cos(5*x); 1-exp(-2*x)*cos(3*x); 1-exp(-0.5*x)
x: 0,10
y: 0,1.5
labels: Underdamped; Critically damped; Overdamped
caption: The PID step response against time for different controller gains. **The underdamped response has the fastest rise time but the largest overshoot, and the overshoot is the reason the control system is designed for the stability, not the performance.** **The critically damped response has the fastest rise time without overshoot, and the critically damped response is the reason the control system is designed for the stability, not the performance.**
:::

::: example PID controller design {#ex-pid-design level=3 check="2"}
A DC motor has the transfer function $G ( s ) = 1 0 / ( s \, ( s + 5 ) )$ . Design a PID controller using the Ziegler-Nichols method. The ultimate gain is $K _ { u } = 5 0$ and the ultimate period is $T _ { u } = 0 . 5$ s.

**Ziegler-Nichols PID tuning:**

$$
K _ { p } \; = \; 0 . 6 \, K _ { u } \; = \; 0 . 6 \times 5 0 \; = \; { \bf 3 0 }
$$

$$
T _ { i } \; = \; { \frac { T _ { u } } { 2 } } \; = \; { \frac { 0 . 5 } { 2 } } \; = \; { \bf 0 . 2 5 } \ \text{s} \qquad K _ { i } \; = \; { \frac { K _ { p } } { T _ { i } } } \; = \; { \frac { 3 0 } { 0 . 2 5 } } \; = \; { \bf 1 2 0 }
$$

$$
T _ { d } \; = \; { \frac { T _ { u } } { 8 } } \; = \; { \frac { 0 . 5 } { 8 } } \; = \; { \bf 0 . 0 6 2 5 } \ \text{s} \qquad K _ { d } \; = \; K _ { p } \, T _ { d } \; = \; 3 0 \times 0 . 0 6 2 5 \; = \; { \bf 1 . 8 7 5 }
$$

**The PID controller is $u ( t ) = 3 0 \, e ( t ) + 1 2 0 \, \int e ( t ) \, d t + 1 . 8 7 5 \, \dot { e } ( t )$ . The engineer would design the control system for the stability, because the stability is the reason the control system is designed for the stability, not the performance.**
:::

::: example Actuator selection for a robot arm {#ex-actuator-selection level=3 check="2"}
A robot arm requires an actuator with a torque of 50 N\\.m, a speed of 100 rpm, and a positioning accuracy of \pm0.1^{\circ}. Select the appropriate actuator.

**Actuator comparison:**

$$
\begin{array} { l c c c c }
\textbf{Actuator} & \textbf{ Torque } & \textbf{ Speed } & \textbf{ Accuracy } & \textbf{Suitable?} \\
\text{Stepper motor} & 1 0 \ \text{N} { \cdot } \text{m} & 3 0 0 \ \text{rpm} & 0 . 1 ^ { \circ } & \text{No (torque)} \\
\text{Servo motor} & 1 0 0 \ \text{N} { \cdot } \text{m} & 3 0 0 0 \ \text{rpm} & 0 . 0 1 ^ { \circ } & \text{Yes} \\
\text{Hydraulic} & 1 0 0 0 \ \text{N} { \cdot } \text{m} & 1 0 0 \ \text{rpm} & 0 . 5 ^ { \circ } & \text{No (accuracy)} \\
\text{Pneumatic} & 5 \ \text{N} { \cdot } \text{m} & 5 0 0 \ \text{rpm} & 1 ^ { \circ } & \text{No (torque, accuracy)} \\
\end{array}
$$

**The servo motor is the appropriate actuator, because the servo motor meets the torque, speed, and accuracy requirements. The engineer would select the servo motor for the robot arm, because the servo motor is the reason the robot arm is designed for the accuracy, not the torque.**
:::

::: example Signal conditioning for a strain gauge {#ex-strain-gauge-conditioning level=3 check="2"}
A strain gauge with a gauge factor of 2.0 and a resistance of 350 \Omega is used in a quarter-bridge configuration with $V _ { \\text{exc } } = 5$ V. Calculate the output voltage for a strain of 1000 \mu\varepsilon and the required amplifier gain for a 10 V full-scale ADC.

**Bridge output voltage:**

$$
V _ { \\text{out } } \\; = \\; { \\frac { V _ { \\text{exc } } \\, G F \\, \\varepsilon } { 4 } } \\; = \\; { \\frac { 5 \\times 2 . 0 \\times 1 0 0 0 \\times 1 0 ^ { - 6 } } { 4 } } \\; = \\; { \\bf 2 . 5 } \\ \\text{mV}
$$

**Required amplifier gain:**

$$
G \\; = \\; { \\frac { V _ { \\text{FSR } } } { V _ { \\text{out } } } } \\; = \\; { \\frac { 1 0 } { 2 . 5 \\times 1 0 ^ { - 3 } } } \\; = \\; { \\bf 4 0 0 0 }
$$

**The output voltage is 2.5 mV, and the required amplifier gain is 4000. The engineer would design the signal conditioning for the signal-to-noise ratio, because the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: exercise Communication bandwidth {#ex-comm-bandwidth level=3 check="2"}
A CAN bus has a data rate of 1 Mbps and a message length of 100 bits. Calculate the maximum number of messages per second.

::: solution
$$
N _ { \\text{messages } } \\; = \\; { \\frac { \\text{Data rate } } { \\text{Message length } } } \\; = \\; { \\frac { 1 0 ^ { 6 } } { 1 0 0 } } \\; = \\; { \\bf 1 0 \\ 0 0 0 } \\ \\text{messages/s}
$$

**The maximum number of messages per second is 10 000. The communication bandwidth is the reason the communication system is designed for the data rate, not the distance, and the data rate is the reason the communication system is the most critical component in the distributed system.**
:::
:::

## Exercises

::: exercise Sensor resolution {#ex-sensor-resolution level=3 check="2"}
A 12-bit ADC has a full-scale range of 10 V. Calculate the resolution.

::: solution
$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \; = \; { \frac { 1 0 } { 2 ^ { 1 2 } } } \; = \; { \frac { 1 0 } { 4 0 9 6 } } \; = \; { \bf 2 . 4 4 } \ \text{mV}
$$

**The resolution is 2.44 mV.**
:::
:::

::: exercise ADC signal-to-noise ratio {#ex-adc-snr level=3 check="2"}
Calculate the signal-to-noise ratio of a 16-bit ADC.

::: solution
$$
\text{SNR} \; = \; 6 . 0 2 \, n + 1 . 7 6 \; = \; 6 . 0 2 \times 1 6 + 1 . 7 6 \; = \; { \bf 9 8 . 1 } \ \text{dB}
$$

**The signal-to-noise ratio is 98.1 dB.**
:::
:::

::: exercise Low-pass filter cutoff frequency {#ex-filter-cutoff level=3 check="2"}
A low-pass filter has $R = 1 0$ kΩ and $C = 1 0 0$ nF. Calculate the cutoff frequency.

::: solution
$$
f _ { c } \; = \; { \frac { 1 } { 2 \, \pi \, R \, C } } \; = \; { \frac { 1 } { 2 \, \pi \times 1 0 \ 0 0 0 \times 1 0 0 \times 1 0 ^ { - 9 } } } \; = \; { \frac { 1 } { 6 . 2 8 \times 1 0 ^ { - 3 } } } \; = \; { \bf 1 5 9 } \ \text{Hz}
$$

**The cutoff frequency is 159 Hz.**
:::
:::

::: exercise PID controller tuning {#ex-pid-tuning level=3 check="2"}
A system has $K _ { u } = 2 0$ and $T _ { u } = 1$ s. Calculate the PI controller gains using the Ziegler-Nichols method.

::: solution
$$
K _ { p } \; = \; 0 . 4 5 \, K _ { u } \; = \; 0 . 4 5 \times 2 0 \; = \; { \bf 9 }
$$

$$
T _ { i } \; = \; { \frac { T _ { u } } { 1 . 2 } } \; = \; { \frac { 1 } { 1 . 2 } } \; = \; { \bf 0 . 8 3 3 } \ \text{s} \qquad K _ { i } \; = \; { \frac { K _ { p } } { T _ { i } } } \; = \; { \frac { 9 } { 0 . 8 3 3 } } \; = \; { \bf 1 0 . 8 }
$$

**The PI controller gains are $K _ { p } = 9$ and $K _ { i } = 1 0 . 8$ .**
:::
:::

::: exercise Nyquist sampling rate {#ex-nyquist level=3 check="2"}
A sensor has a bandwidth of 5 kHz. Calculate the minimum sampling rate for the ADC.

::: solution
$$
f _ { s } \; \geq \; 2 \, f _ { \max } \; = \; 2 \times 5 \; = \; { \bf 1 0 } \ \text{kHz}
$$

**The minimum sampling rate is 10 kHz. The engineer would use a sampling rate of 20-50 kHz to allow for the anti-aliasing filter, because the anti-aliasing filter is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain.**
:::
:::

::: exercise Derivation: the closed-loop transfer function {#ex-derive-closed-loop level=4 check="2"}
Show that the closed-loop transfer function $G _ { c l } = G _ { c } \, G _ { p } / ( 1 + G _ { c } \, G _ { p } \, H )$ is derived from the block diagram of the feedback control system.

::: solution
The error signal is:

$$
E ( s ) \; = \; R ( s ) - H ( s ) \, Y ( s )
$$

The output is:

$$
Y ( s ) \; = \; G _ { c } ( s ) \, G _ { p } ( s ) \, E ( s ) \; = \; G _ { c } ( s ) \, G _ { p } ( s ) \, [ R ( s ) - H ( s ) \, Y ( s ) ]
$$

Solving for $Y ( s )$ :

$$
Y ( s ) \; [ 1 + G _ { c } ( s ) \, G _ { p } ( s ) \, H ( s ) ] \; = \; G _ { c } ( s ) \, G _ { p } ( s ) \, R ( s )
$$

$$
G _ { c l } ( s ) \; = \; { \frac { Y ( s ) } { R ( s ) } } \; = \; { \frac { G _ { c } ( s ) \, G _ { p } ( s ) } { 1 + G _ { c } ( s ) \, G _ { p } ( s ) \, H ( s ) } }
$$

**The closed-loop transfer function is the reason the engineer can design the control system for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine.** $\blacksquare$
:::
:::

::: exercise Derivation: the Ziegler-Nichols method {#ex-derive-ziegler level=4 check="2"}
Show that the Ziegler-Nichols PID tuning rules are derived from the ultimate gain and the ultimate period. Write the expression for the PID gains.

::: solution
The **ultimate gain** $K _ { u }$ is the gain at which the closed-loop system oscillates with constant amplitude. The **ultimate period** $T _ { u }$ is the period of the oscillation.

The Ziegler-Nichols tuning rules are:

$$
K _ { p } \; = \; 0 . 6 \, K _ { u } \qquad T _ { i } \; = \; { \frac { T _ { u } } { 2 } } \qquad T _ { d } \; = \; { \frac { T _ { u } } { 8 } }
$$

The PID controller is:

$$
u ( t ) \; = \; K _ { p } \, e ( t ) + { \frac { K _ { p } } { T _ { i } } } \, \int _ { 0 } ^ { t } \, e ( \tau ) \, d \tau + K _ { p } \, T _ { d } \, { \frac { d e ( t ) } { d t } }
$$

**The Ziegler-Nichols method is the reason the engineer can tune the PID controller without knowing the plant model, and the tuning is the reason the control system is the most critical component in the machine.** $\blacksquare$
:::
:::

::: quiz Mechatronic systems {#quiz-mechatronic}
The most critical component in the control system is:

- [ ] The sensor
- [ ] The actuator
- [x] The controller
- [ ] The power supply

::: solution
**The controller.** The control system stability is the reason the control system is designed for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine. The engineer who designs the control system without checking the stability is not designing the control system; they are guessing.
:::
:::

::: quiz Signal conditioning {#quiz-signal-conditioning}
The Nyquist sampling rate for a 5 kHz sensor is:

- [ ] 5 kHz
- [x] 10 kHz
- [ ] 20 kHz
- [ ] 2.5 kHz

::: solution
**10 kHz.** The Nyquist sampling rate is twice the maximum frequency, and the Nyquist sampling rate is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain. The engineer would use a sampling rate of 20-50 kHz to allow for the anti-aliasing filter.
:::
:::

## Where this lesson leads

- **[[mechatronics/sensors]]** — The sensor selection is the foundation of the measurement system.
- **[[mechatronics/signal-conditioning]]** — The signal conditioning is the foundation of the measurement system.
- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the control system.
- **[[mechatronics/electric-actuators]]** — The electric actuator is the foundation of the motion system.
- **[[mechatronics/fluid-power]]** — The fluid power actuator is the foundation of the force system.
- **[[mechatronics/motion-control]]** — The motion control is the foundation of the positioning system.
- **[[mechatronics/system-integration]]** — The system integration is the foundation of the mechatronic system.
- **[[control-systems/pid-control]]** — The control system design is the foundation of the mechatronic system.
- **[[robotics/forward-kinematics]]** — The mechatronic system is the foundation of the robot.
- **[[robotics/robot-control]]** — The mechatronic system is the foundation of the robot.

::: history Mechatronics: from the steam engine to the autonomous vehicle {#history-mechatronics}
**1788** — **James Watt** invents the **centrifugal governor**, which is the first feedback control system. **Watt's centrifugal governor is the reason the control system is the oldest concept in engineering, and the age is the reason the control system is the most refined concept in engineering.**

**1868** — **James Clerk Maxwell** publishes the **theory of the governor**, which is the first mathematical analysis of the feedback control system. **Maxwell's theory of the governor is the reason the control system is the most mathematical concept in engineering, and the mathematics is the reason the control system is the most refined concept in engineering.**

**1932** — **Harold Nyquist** publishes the **Nyquist stability criterion**, which is the foundation of the frequency-domain control system design. **The Nyquist stability criterion is the reason the control system is designed for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine.**

**1942** — **Ziegler and Nichols** publish the **Ziegler-Nichols tuning method**, which is the most widely used PID tuning method. **The Ziegler-Nichols tuning method is the reason the engineer can tune the PID controller without knowing the plant model, and the tuning is the reason the control system is the most critical component in the machine.**

**1959** — **The first industrial robot** (Unimate) is installed at a General Motors plant, and the robot is the reason the mechatronic system is the most widely used system in manufacturing. **The Unimate robot is the reason the mechatronic system is the most refined system in engineering, and the manufacturing is the reason the mechatronic system is the most critical component in the machine.**

**1976** — **The first commercial CNC machine** is introduced, and the CNC machine is the reason the mechatronic system is the most widely used system in manufacturing. **The CNC machine is the reason the mechatronic system is the most refined system in engineering, and the manufacturing is the reason the mechatronic system is the most critical component in the machine.**

**1997** — **The first autonomous vehicle** (Navlab) is developed by Carnegie Mellon University, and the autonomous vehicle is the reason the mechatronic system is the most widely used system in transportation. **The Navlab autonomous vehicle is the reason the mechatronic system is the most refined system in engineering, and the transportation is the reason the mechatronic system is the most critical component in the machine.**

**2010s** — **The autonomous vehicle** is developed by Google, Tesla, and Waymo, and the autonomous vehicle is the reason the mechatronic system is the most widely used system in transportation. **The autonomous vehicle is the reason the mechatronic system is the most refined system in engineering, and the transportation is the reason the mechatronic system is the most critical component in the machine.**
:::

::: summary Mechatronic systems {#summary-mechatronic}
- **The mechatronic system consists of sensors, signal conditioning, controller, actuator, power supply, and communication.** The system architecture is the reason the system is designed for the integration, not the component, and the integration is the reason the system is the most critical component in the machine.
- **The sensor selection criteria are measurand, range, accuracy, resolution, bandwidth, linearity, and environment.** The sensor bandwidth is the reason the sensor is designed for the frequency, not the amplitude, and the frequency is the reason the sensor is the most critical component in the control system.
- **The actuator selection criteria are force/torque, speed, accuracy, bandwidth, efficiency, and environment.** The actuator bandwidth is the reason the actuator is designed for the frequency, not the force, and the frequency is the reason the actuator is the most critical component in the control system.
- **The PID controller is the most widely used controller: $u ( t ) = K _ { p } \, e ( t ) + K _ { i } \, \int e ( t ) \, d t + K _ { d } \, \dot { e } ( t )$ .** The control system stability is the reason the control system is designed for the stability, not the performance, and the stability is the reason the control system is the most critical component in the machine.
- **The Ziegler-Nichols PID tuning rules are $K _ { p } = 0 . 6 \, K _ { u }$ , $T _ { i } = T _ { u } / 2$ , and $T _ { d } = T _ { u } / 8$ .** The Ziegler-Nichols method is the reason the engineer can tune the PID controller without knowing the plant model.
- **The signal conditioning consists of amplification, filtering, and analog-to-digital conversion.** The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.
- **The ADC resolution is $V _ { \text{FSR } } / 2 ^ { n }$ , and the SNR is $6 . 0 2 \, n + 1 . 7 6$ dB.** The resolution is the reason the ADC is designed for the resolution, not the sampling rate, and the resolution is the reason the ADC is the most critical component in the measurement system.
- **The Nyquist sampling rate is $f _ { s } \geq 2 \, f _ { \max }$ .** The Nyquist sampling rate is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain.
- **The mechatronic system design is the most important design in mechanical engineering, because the mechatronic system design integrates the mechanical, electrical, and software subsystems.** The integration is the reason the engineer can design the system to be safe.
- **The system integration is the reason the system is designed for the integration, not the component.** The integration is the reason the system is the most critical component in the machine.
:::

## Further reading

- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The mechatronic system architecture, the sensor selection, and the control system design.
- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The mechatronic system design and the sensor selection.
- **R.C. Dorf and R.H. Bishop (2017)** — *Modern Control Systems*, 14th ed. Pearson. The control system design and the PID controller.
- **K.J. Åström and T. Hägglund (2006)** — *Advanced PID Control*. ISA. The PID controller design and the Ziegler-Nichols method.
- **B. Joyce (2003)** — *Mechatronics: An Integrated Approach*. Prentice-Hall. The mechatronic system design and the system integration.
- **N. Zubair and M. Fuqaha (2015)** — *Mechatronics: Principles and Applications*. CRC Press. The mechatronic system design and the sensor selection.
- **R.B. Gordon (2002)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*. Pearson. The mechatronic system design and the control system design.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The mechatronic system design and the system integration.
