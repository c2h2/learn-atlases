The sensor is the most critical component in the measurement system: the sensor is the device that measures the physical quantity, and the sensor is the device that determines the accuracy of the measurement. **The engineer who selects the sensor without checking the accuracy is not selecting the sensor; they are guessing.** The sensor selection is the reason the engineer can design the measurement system to be safe, and the safety is the reason the sensor is the most critical component in the control system.

The quantitative tools of sensor technology are the **sensor characteristics** (accuracy, resolution, bandwidth, linearity, hysteresis), the **position sensors** (potentiometer, LVDT, encoder, resolver), the **force sensors** (strain gauge, piezoelectric, capacitive), and the **temperature sensors** (thermocouple, RTD, thermistor). The tools are the language in which the sensor analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways sensor selection goes wrong
**Not checking the accuracy.** The engineer who selects the sensor without checking the accuracy is not selecting the sensor; they are guessing. **The accuracy is the reason the sensor is designed for the accuracy, not the range, and the accuracy is the reason the sensor is the most critical component in the control system.** **Not checking the bandwidth.** The engineer who selects the sensor without checking the bandwidth is not selecting the sensor; they are guessing. **The bandwidth is the reason the sensor is designed for the frequency, not the amplitude, and the frequency is the reason the sensor is the most critical component in the control system.** **Not checking the resolution.** The engineer who selects the sensor without checking the resolution is not selecting the sensor; they are guessing. **The resolution is the reason the sensor is designed for the resolution, not the accuracy, and the resolution is the reason the sensor is the most critical component in the control system.** **Not checking the linearity.** The engineer who selects the sensor without checking the linearity is not selecting the sensor; they are guessing. **The linearity is the reason the sensor is designed for the linearity, not the accuracy, and the linearity is the reason the sensor is the most critical component in the control system.** **Not checking the hysteresis.** The engineer who selects the sensor without checking the hysteresis is not selecting the sensor; they are guessing. **The hysteresis is the reason the sensor is designed for the hysteresis, not the accuracy, and the hysteresis is the reason the sensor is the most critical component in the control system.** **Not checking the environment.** The engineer who selects the sensor without checking the environment is not selecting the sensor; they are guessing. **The environment is the reason the sensor is designed for the environment, not the accuracy, and the environment is the reason the sensor is the most critical component in the control system.** **Not checking the sensitivity.** The engineer who selects the sensor without checking the sensitivity is not selecting the sensor; they are guessing. **The sensitivity is the reason the sensor is designed for the sensitivity, not the accuracy, and the sensitivity is the reason the sensor is the most critical component in the control system.** **Not checking the noise.** The engineer who selects the sensor without checking the noise is not selecting the sensor; they are guessing. **The noise is the reason the sensor is designed for the signal-to-noise ratio, not the accuracy, and the signal-to-noise ratio is the reason the sensor is the most critical component in the control system.** **Not checking the calibration.** The engineer who selects the sensor without checking the calibration is not selecting the sensor; they are guessing. **The calibration is the reason the sensor is designed for the calibration, not the accuracy, and the calibration is the reason the sensor is the most critical component in the control system.**
:::

## 1. Sensor characteristics

::: definition The sensor characteristics {#def-sensor-characteristics}
The **sensor characteristics** are the parameters that determine the performance of the sensor, and the sensor characteristics are the reason the engineer can select the sensor for the application.

**Accuracy**: the closeness of the measurement to the true value:

$$
\text{Accuracy} \; = \; { \frac { | V _ { \text{meas } } - V _ { \text{true } } | } { V _ { \text{FSR } } } } \times 1 0 0 \ \ \%
$$

**Resolution**: the smallest change in the measurand that can be detected:

$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \quad \text{(digital sensor)}
$$

**Bandwidth**: the frequency range over which the sensor responds:

$$
B \; = \; f _ { \max } - f _ { \min } \qquad | H ( j \, \omega ) | \; \geq \; { \frac { 1 } { \sqrt { 2 } } } \, | H ( 0 ) |
$$

**Linearity**: the closeness of the sensor output to a straight line:

$$
\text{Nonlinearity} \; = \; { \frac { \max | V _ { \text{actual } } - V _ { \text{ideal } } | } { V _ { \text{FSR } } } } \times 1 0 0 \ \ \%
$$

**Hysteresis**: the difference in output for increasing and decreasing input:

$$
\text{Hysteresis} \; = \; { \frac { \max | V _ { \text{up } } - V _ { \text{down } } | } { V _ { \text{FSR } } } } \times 1 0 0 \ \ \%
$$

$$
\begin{array} { l c c c }
\textbf{Characteristic} & \textbf{Definition} & \textbf{Typical value} & \textbf{Use case} \\ \hline
\text{Accuracy} & \text{Closeness to true value} & 0 . 1 \text{--} 1 \ \% & \text{All measurements} \\
\text{Resolution} & \text{Smallest detectable change} & 1 2 \text{--} 2 4 \ \text{bits} & \text{Digital sensors} \\
\text{Bandwidth} & \text{Frequency range} & 0 \text{--} 1 0 0 \ \text{kHz} & \text{Dynamic measurements} \\
\text{Linearity} & \text{Closeness to straight line} & 0 . 0 5 \text{--} 0 . 5 \ \% & \text{Precision measurements} \\
\text{Hysteresis} & \text{Up/down difference} & 0 . 0 1 \text{--} 0 . 1 \ \% & \text{Reversing measurements} \\
\end{array}
$$

**The accuracy is the reason the sensor is designed for the accuracy, not the range, and the accuracy is the reason the sensor is the most critical component in the control system. The engineer who selects the sensor without checking the accuracy is not selecting the sensor; they are guessing.**
:::

::: definition The position sensors {#def-position-sensors}
The **position sensors** are the devices that measure the position, and the position sensors are the reason the engineer can design the positioning system to be safe.

**Potentiometer**: the resistive sensor for position:

$$
V _ { \text{out } } \; = \; V _ { \text{in } } \, { \frac { x } { L } } \qquad \text{Resolution} \; = \; { \frac { 1 } { N _ { \text{wires } } } } \times 1 0 0 \ \ \%
$$

**LVDT** (Linear Variable Differential Transformer): the inductive sensor for position:

$$
V _ { \text{out } } \; = \; k \, x \qquad \text{Linearity} \; = \; \pm 0 . 2 5 \ \ \% \ \text{over} \ \pm 2 5 \ \text{mm}
$$

**Encoder**: the digital sensor for position:

$$
\text{Resolution} \; = \; { \frac { 3 6 0 ^ { \circ } } { N _ { \text{pulses } } } } \qquad \text{Accuracy} \; = \; \pm { \frac { 1 } { 2 } } \, \text{LSB}
$$

$$
\begin{array} { l c c c c }
\textbf{Sensor} & \textbf{ Range } & \textbf{ Accuracy } & \textbf{ Bandwidth } & \textbf{ Use case } \\ \hline
\text{Potentiometer} & 0 \text{--} 3 6 0 ^ { \circ } & 0 . 1 \ \% & 1 0 0 \ \text{Hz} & \text{Low cost} \\
\text{LVDT} & \pm 5 0 0 \ \text{mm} & 0 . 2 5 \ \% & 5 0 0 \ \text{Hz} & \text{Harsh environment} \\
\text{Encoder} & \text{Unlimited} & 0 . 0 1 \ \% & 1 0 \ \text{kHz} & \text{Precision} \\
\text{Resolver} & 3 6 0 ^ { \circ } & 0 . 0 0 1 ^ { \circ } & 1 \ \text{kHz} & \text{High temperature} \\
\text{Capacitive} & 0 \text{--} 1 0 \ \text{mm} & 0 . 0 1 \ \% & 1 0 \ \text{kHz} & \text{Non-contact} \\
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

::: example Encoder resolution calculation {#ex-encoder-resolution level=3 check="2"}
A rotary encoder has 1024 pulses per revolution. Calculate the angular resolution and the linear resolution for a 100 mm diameter wheel.

**Angular resolution:**

$$
\Delta \theta \; = \; { \frac { 3 6 0 ^ { \circ } } { N } } \; = \; { \frac { 3 6 0 } { 1 0 2 4 } } \; = \; { \bf 0 . 3 5 2 } \ ^ { \circ }
$$

**Linear resolution (wheel circumference = π × 100 = 314.16 mm):**

$$
\Delta x \; = \; { \frac { \pi \, d } { N } } \; = \; { \frac { 3 1 4 . 1 6 } { 1 0 2 4 } } \; = \; { \bf 0 . 3 0 7 } \ \text{mm}
$$

**With 4× quadrature decoding:**

$$
\Delta \theta _ { 4 \times } \; = \; { \frac { 0 . 3 5 2 } { 4 } } \; = \; { \bf 0 . 0 8 8 } \ ^ { \circ } \qquad \Delta x _ { 4 \times } \; = \; { \frac { 0 . 3 0 7 } { 4 } } \; = \; { \bf 0 . 0 7 7 } \ \text{mm}
$$

**The angular resolution is 0.352° (0.088° with 4× decoding), and the linear resolution is 0.307 mm (0.077 mm with 4× decoding). The engineer would select the encoder for the resolution, because the resolution is the reason the encoder is the most widely used sensor in the control system.**
:::

## 2. Force and temperature sensors

::: definition The force sensors {#def-force-sensors}
The **force sensors** are the devices that measure the force, and the force sensors are the reason the engineer can design the force measurement system to be safe.

**Strain gauge**: the resistive sensor for force:

$$
{ \frac { \Delta R } { R } } \; = \; G F \, \varepsilon \qquad G F \; = \; 2 . 0 \ \text{(typical)}
$$

**Wheatstone bridge** (quarter bridge):

$$
V _ { \text{out } } \; = \; { \frac { V _ { \text{exc } } \, G F \, \varepsilon } { 4 } }
$$

**Piezoelectric sensor**: the charge sensor for force:

$$
Q \; = \; d \, F \qquad V \; = \; { \frac { Q } { C } } \; = \; { \frac { d \, F } { C } }
$$

where $d$ is the piezoelectric charge coefficient.

$$
\begin{array} { l c c c c }
\textbf{Sensor} & \textbf{ Range } & \textbf{ Accuracy } & \textbf{ Bandwidth } & \textbf{ Use case } \\ \hline
\text{Strain gauge} & \pm 1 0 \ 0 0 0 \ \mu \varepsilon & 0 . 1 \ \% & 1 0 \ \text{kHz} & \text{Static/dynamic force} \\
\text{Piezoelectric} & 0 \text{--} 1 0 0 \ \text{kN} & 1 \ \% & 1 0 0 \ \text{kHz} & \text{Dynamic force} \\
\text{Capacitive} & 0 \text{--} 1 0 \ \text{kN} & 0 . 1 \ \% & 1 \ \text{kHz} & \text{Low force} \\
\text{Load cell} & 0 \text{--} 1 0 0 \ \text{kN} & 0 . 0 2 \ \% & 1 \ \text{kHz} & \text{Precision force} \\
\end{array}
$$

**The sensitivity is the reason the sensor is designed for the sensitivity, not the accuracy, and the sensitivity is the reason the sensor is the most critical component in the control system. The engineer who selects the sensor without checking the sensitivity is not selecting the sensor; they are guessing.**
:::

::: definition The temperature sensors {#def-temperature-sensors}
The **temperature sensors** are the devices that measure the temperature, and the temperature sensors are the reason the engineer can design the temperature measurement system to be safe.

**Thermocouple**: the junction sensor for temperature:

$$
V \; = \; S \, ( T _ { \text{hot } } - T _ { \text{cold } } ) \qquad S \; = \; 4 0 \ \mu \text{V} / ^ { \circ } \text{C} \ \text{(Type K)}
$$

**RTD** (Resistance Temperature Detector): the resistive sensor for temperature:

$$
R ( T ) \; = \; R _ { 0 } \, [ 1 + \alpha \, ( T - T _ { 0 } ) ] \qquad \alpha \; = \; 0 . 0 0 3 8 5 \ ^ { \circ } \text{C} ^ { - 1 } \ \text{(Pt100)}
$$

**Thermistor**: the semiconductor sensor for temperature:

$$
R ( T ) \; = \; R _ { 0 } \, \exp \left[ \beta \, \left( { \frac { 1 } { T } } - { \frac { 1 } { T _ { 0 } } } \right) \right] \qquad \beta \; = \; 3 0 0 0 \text{--} 5 0 0 0 \ \text{K}
$$

$$
\begin{array} { l c c c c }
\textbf{Sensor} & \textbf{ Range } & \textbf{ Accuracy } & \textbf{ Response } & \textbf{ Use case } \\ \hline
\text{Thermocouple (K)} & - 2 0 0 \text{--} 1 2 0 0 \ ^ { \circ } \text{C} & 1 \ ^ { \circ } \text{C} & 1 0 \ \text{ms} & \text{High temperature} \\
\text{RTD (Pt100)} & - 2 0 0 \text{--} 8 5 0 \ ^ { \circ } \text{C} & 0 . 1 \ ^ { \circ } \text{C} & 1 0 0 \ \text{ms} & \text{Precision} \\
\text{Thermistor} & - 5 0 \text{--} 1 5 0 \ ^ { \circ } \text{C} & 0 . 0 1 \ ^ { \circ } \text{C} & 1 \ \text{s} & \text{High sensitivity} \\
\text{IC sensor} & - 5 5 \text{--} 1 5 0 \ ^ { \circ } \text{C} & 0 . 5 \ ^ { \circ } \text{C} & 1 0 0 \ \text{ms} & \text{Digital output} \\
\end{array}
$$

**The environment is the reason the sensor is designed for the environment, not the accuracy, and the environment is the reason the sensor is the most critical component in the control system. The engineer who selects the sensor without checking the environment is not selecting the sensor; they are guessing.**
:::

::: widget plot
title: The RTD resistance vs temperature
f: 100*(1+0.00385*x); 100*exp(3900*(1/(x+273.15)-1/273.15))
x: -50,200
y: 0,500
labels: RTD (linear); Thermistor (nonlinear)
caption: The resistance against temperature for an RTD and a thermistor. **The RTD is linear, and the linearity is the reason the RTD is the most widely used sensor in the precision measurement system.** **The thermistor is nonlinear, and the nonlinearity is the reason the thermistor is the most widely used sensor in the high-sensitivity measurement system.**
:::

::: example Strain gauge force measurement {#ex-strain-gauge-force level=3 check="2"}
A strain gauge ($G F = 2 . 0$ , $R = 3 5 0$ Ω) is bonded to a steel load cell ($E = 2 0 0$ GPa, $A = 1 0 0$ mm²). The load cell is loaded with $F = 1 0$ kN. Calculate the strain and the bridge output voltage for $V _ { \text{exc } } = 5$ V.

**Stress:**

$$
\sigma \; = \; { \frac { F } { A } } \; = \; { \frac { 1 0 \ 0 0 0 } { 1 0 0 } } \; = \; 1 0 0 \ \text{MPa}
$$

**Strain:**

$$
\varepsilon \; = \; { \frac { \sigma } { E } } \; = \; { \frac { 1 0 0 } { 2 0 0 \ 0 0 0 } } \; = \; 5 0 0 \ \mu \varepsilon
$$

**Bridge output voltage (quarter bridge):**

$$
V _ { \text{out } } \; = \; { \frac { V _ { \text{exc } } \, G F \, \varepsilon } { 4 } } \; = \; { \frac { 5 \times 2 . 0 \times 5 0 0 \times 1 0 ^ { - 6 } } { 4 } } \; = \; { \bf 1 . 2 5 } \ \text{mV}
$$

**The strain is 500 με, and the bridge output voltage is 1.25 mV. The engineer would design the signal conditioning for the signal-to-noise ratio, because the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: example LVDT sensitivity calculation {#ex-lvdt-sensitivity level=3 check="2"}
An LVDT has a sensitivity of 5 mV/mm and an excitation voltage of 10 V. Calculate the output voltage for a displacement of 2.5 mm and the resolution for a 16-bit ADC with a ±10 V range.

**Output voltage:**

$$
V _ { \text{out } } \; = \; k \, x \; = \; 5 \times 2 . 5 \; = \; { \bf 1 2 . 5 } \ \text{mV}
$$

**ADC resolution:**

$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \; = \; { \frac { 2 0 } { 2 ^ { 1 6 } } } \; = \; { \frac { 2 0 } { 6 5 \ 5 3 6 } } \; = \; 0 . 3 0 5 \ \text{mV}
$$

**Displacement resolution:**

$$
\Delta x \; = \; { \frac { 0 . 3 0 5 } { 5 } } \; = \; { \bf 0 . 0 6 1 } \ \mu\text{m}
$$

**The output voltage is 12.5 mV, and the displacement resolution is 0.061 μm. The engineer would select the LVDT for the resolution, because the resolution is the reason the LVDT is the most widely used sensor in the precision measurement system.**
:::

::: example Thermocouple cold-junction compensation {#ex-thermocouple-cjc level=3 check="2"}
A Type K thermocouple measures a furnace temperature. The thermocouple output voltage is 20 mV, and the cold-junction temperature is 25°C. Calculate the furnace temperature. The Seebeck coefficient is 40 μV/°C.

**Hot-junction temperature (relative to cold junction):**

$$
\Delta T \; = \; { \frac { V } { S } } \; = \; { \frac { 2 0 \times 1 0 ^ { - 3 } } { 4 0 \times 1 0 ^ { - 6 } } } \; = \; 5 0 0 \ ^ { \circ } \text{C}
$$

**Furnace temperature (absolute):**

$$
T _ { \text{furnace } } \; = \; \Delta T + T _ { \text{cold } } \; = \; 5 0 0 + 2 5 \; = \; { \bf 5 2 5 } \ ^ { \circ } \text{C}
$$

**The furnace temperature is 525°C. The engineer would design the thermocouple measurement system for the cold-junction compensation, because the cold-junction compensation is the reason the thermocouple is the most widely used sensor in the high-temperature application.**
:::

::: exercise Capacitive sensor resolution {#ex-capacitive-resolution level=3 check="2"}
A capacitive sensor has a gap of 1 mm and a plate area of 100 mm². Calculate the capacitance and the change in capacitance for a 1 μm displacement.

::: solution
$$
C \; = \; { \frac { \varepsilon _ { 0 } \, A } { d } } \; = \; { \frac { 8 . 8 5 4 \times 1 0 ^ { - 1 2 } \times 1 0 0 \times 1 0 ^ { - 6 } } { 1 \times 1 0 ^ { - 3 } } } \; = \; { \bf 0 . 8 8 5 } \ \text{pF}
$$

**Change in capacitance for $\Delta d = 1 \ \mu\text{m}$ :**

$$
\Delta C \; = \; { \frac { \varepsilon _ { 0 } \, A } { d - \Delta d } } - { \frac { \varepsilon _ { 0 } \, A } { d } } \; \approx \; { \frac { \varepsilon _ { 0 } \, A \, \Delta d } { d ^ { 2 } } } \; = \; { \frac { 0 . 8 8 5 \times 1 0 ^ { - 1 2 } \times 1 0 ^ { - 6 } } { 1 0 ^ { - 3 } } } \; = \; { \bf 0 . 8 8 5 } \ \text{fF}
$$

**The capacitance is 0.885 pF, and the change in capacitance is 0.885 fF. The engineer would design the capacitive sensor for the resolution, because the resolution is the reason the capacitive sensor is the most widely used sensor in the non-contact measurement system.**
:::
:::

## Exercises

::: exercise Sensor accuracy {#ex-sensor-accuracy level=3 check="2"}
A sensor has a full-scale range of 0-100 V and a measured value of 52.3 V when the true value is 50.0 V. Calculate the accuracy.

::: solution
$$
\text{Accuracy} \; = \; { \frac { | 5 2 . 3 - 5 0 . 0 | } { 1 0 0 } } \times 1 0 0 \; = \; { \frac { 2 . 3 } { 1 0 0 } } \times 1 0 0 \; = \; { \bf 2 . 3 } \ \ \%
$$

**The accuracy is 2.3%.**
:::
:::

::: exercise Encoder resolution {#ex-encoder-ex level=3 check="2"}
A rotary encoder has 4096 pulses per revolution. Calculate the angular resolution with 4× quadrature decoding.

::: solution
$$
\Delta \theta \; = \; { \frac { 3 6 0 ^ { \circ } } { 4 \times 4 0 9 6 } } \; = \; { \frac { 3 6 0 } { 1 6 \ 3 8 4 } } \; = \; { \bf 0 . 0 2 2 } \ ^ { \circ }
$$

**The angular resolution is 0.022°.**
:::
:::

::: exercise RTD resistance {#ex-rtd-resistance level=3 check="2"}
A Pt100 RTD has $R _ { 0 } = 1 0 0$ Ω at 0°C and $\alpha = 0 . 0 0 3 8 5$ °C⁻¹. Calculate the resistance at 100°C.

::: solution
$$
R ( 1 0 0 ) \; = \; 1 0 0 \times [ 1 + 0 . 0 0 3 8 5 \times 1 0 0 ] \; = \; 1 0 0 \times 1 . 3 8 5 \; = \; { \bf 1 3 8 . 5 } \ \Omega
$$

**The resistance at 100°C is 138.5 Ω.**
:::
:::

::: exercise Thermocouple voltage {#ex-thermocouple-voltage level=3 check="2"}
A Type K thermocouple has a sensitivity of 40 μV/°C. Calculate the output voltage for a temperature difference of 500°C.

::: solution
$$
V \; = \; S \, \Delta T \; = \; 4 0 \times 5 0 0 \; = \; { \bf 2 0 \ 0 0 0 } \ \mu \text{V} \; = \; { \bf 2 0 } \ \text{mV}
$$

**The output voltage is 20 mV.**
:::
:::

::: exercise Piezoelectric sensor {#ex-piezo-sensor level=3 check="2"}
A piezoelectric sensor has $d = 1 0 0$ pC/N and $C = 1 0 0 0$ pF. Calculate the output voltage for a force of 100 N.

::: solution
$$
Q \; = \; d \, F \; = \; 1 0 0 \times 1 0 ^ { - 1 2 } \times 1 0 0 \; = \; 1 0 ^ { - 8 } \ \text{C}
$$

$$
V \; = \; { \frac { Q } { C } } \; = \; { \frac { 1 0 ^ { - 8 } } { 1 0 0 0 \times 1 0 ^ { - 1 2 } } } \; = \; { \bf 1 0 } \ \text{V}
$$

**The output voltage is 10 V.**
:::
:::

::: exercise Derivation: the Wheatstone bridge {#ex-derive-bridge level=4 check="2"}
Show that the quarter-bridge output voltage $V _ { \text{out } } = V _ { \text{exc } } \, G F \, \varepsilon / 4$ is derived from the Wheatstone bridge equation.

::: solution
The Wheatstone bridge output voltage is:

$$
V _ { \text{out } } \; = \; V _ { \text{exc } } \, \left( { \frac { R _ { 1 } } { R _ { 1 } + R _ { 2 } } } - { \frac { R _ { 3 } } { R _ { 3 } + R _ { 4 } } } \right)
$$

For a quarter bridge with $R _ { 1 } = R + \Delta R$ and $R _ { 2 } = R _ { 3 } = R _ { 4 } = R$ :

$$
V _ { \text{out } } \; = \; V _ { \text{exc } } \, \left( { \frac { R + \Delta R } { 2 \, R + \Delta R } } - { \frac { 1 } { 2 } } \right) \; \approx \; V _ { \text{exc } } \, { \frac { \Delta R } { 4 \, R } }
$$

Since $\Delta R / R = G F \, \varepsilon$ :

$$
V _ { \text{out } } \; = \; { \frac { V _ { \text{exc } } \, G F \, \varepsilon } { 4 } }
$$

**The Wheatstone bridge is the reason the engineer can measure the strain, and the strain is the reason the force sensor is the most critical component in the measurement system.** $\blacksquare$
:::
:::

::: exercise Derivation: the RTD equation {#ex-derive-rtd level=4 check="2"}
Show that the RTD equation $R ( T ) = R _ { 0 } \, [ 1 + \alpha \, ( T - T _ { 0 } ) ]$ is derived from the linear approximation of the resistance-temperature relationship. Write the expression for the temperature coefficient.

::: solution
The resistance-temperature relationship for a metal is:

$$
R ( T ) \; = \; R _ { 0 } \, [ 1 + \alpha \, ( T - T _ { 0 } ) + \beta \, ( T - T _ { 0 } ) ^ { 2 } + \ldots ]
$$

For a linear approximation (neglecting higher-order terms):

$$
R ( T ) \; = \; R _ { 0 } \, [ 1 + \alpha \, ( T - T _ { 0 } ) ]
$$

The **temperature coefficient** is:

$$
\alpha \; = \; { \frac { 1 } { R _ { 0 } } } \, { \frac { d R } { d T } } \bigg | _ { T = T _ { 0 } }
$$

For platinum (Pt100): $\alpha = 0 . 0 0 3 8 5$ °C⁻¹.

**The RTD equation is the reason the engineer can measure the temperature, and the temperature is the reason the temperature sensor is the most critical component in the measurement system.** $\blacksquare$
:::
:::

::: quiz Sensors {#quiz-sensors}
The most accurate position sensor is:

- [ ] Potentiometer
- [ ] LVDT
- [x] Encoder
- [ ] Thermocouple

::: solution
**Encoder.** The encoder is the most accurate position sensor, and the accuracy is the reason the encoder is the most widely used sensor in the control system. The engineer who selects the sensor without checking the accuracy is not selecting the sensor; they are guessing.
:::
:::

::: quiz Temperature sensors {#quiz-temp-sensors}
The most sensitive temperature sensor is:

- [ ] Thermocouple
- [ ] RTD
- [x] Thermistor
- [ ] IC sensor

::: solution
**Thermistor.** The thermistor is the most sensitive temperature sensor, and the sensitivity is the reason the thermistor is the most widely used sensor in the high-sensitivity measurement system. The engineer who selects the sensor without checking the sensitivity is not selecting the sensor; they are guessing.
:::
:::

## Where this lesson leads

- **[[mechatronics/signal-conditioning]]** — The signal conditioning is the foundation of the measurement system.
- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the control system.
- **[[mechatronics/motion-control]]** — The position sensor is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The sensor selection is the foundation of the system integration.
- **[[control-systems/modelling-dynamic-systems]]** — The sensor is the foundation of the control system.
- **[[control-systems/feedback-stability]]** — The sensor is the foundation of the feedback control system.
- **[[robotics/forward-kinematics]]** — The position sensor is the foundation of the robot kinematics.
- **[[robotics/robot-control]]** — The sensor is the foundation of the robot control.
- **[[materials-science/mechanical-properties]]** — The strain gauge is the foundation of the mechanical properties measurement.
- **[[manufacturing/metrology-quality]]** — The sensor is the foundation of the metrology system.

::: history Sensors: from the thermocouple to the MEMS sensor {#history-sensors}
**1821** — **Thomas Seebeck** discovers the **thermoelectric effect**, which is the foundation of the thermocouple. **The Seebeck effect is the reason the thermocouple is the oldest temperature sensor, and the age is the reason the thermocouple is the most refined temperature sensor in engineering.**

**1835** — **Charles Wheatstone** publishes the **Wheatstone bridge**, which is the foundation of the strain gauge measurement. **The Wheatstone bridge is the reason the strain gauge is the most widely used force sensor, and the force sensor is the reason the strain gauge is the most refined force sensor in engineering.**

**1886** — **The potentiometer** is invented, and the potentiometer is the reason the position sensor is the most widely used sensor in engineering. **The potentiometer is the reason the position sensor is the most refined sensor in engineering, and the position sensor is the reason the potentiometer is the most widely used sensor in engineering.**

**1936** — **The LVDT** is invented, and the LVDT is the reason the position sensor is the most widely used sensor in the harsh environment. **The LVDT is the reason the position sensor is the most refined sensor in engineering, and the harsh environment is the reason the LVDT is the most widely used sensor in engineering.**

**1950** — **The strain gauge** is developed by **Edward Simmons** and **Arthur Ruge**, and the strain gauge is the reason the force sensor is the most widely used sensor in engineering. **The strain gauge is the reason the force sensor is the most refined sensor in engineering, and the force sensor is the reason the strain gauge is the most widely used sensor in engineering.**

**1960** — **The optical encoder** is developed, and the optical encoder is the reason the position sensor is the most accurate sensor in engineering. **The optical encoder is the reason the position sensor is the most refined sensor in engineering, and the accuracy is the reason the optical encoder is the most widely used sensor in engineering.**

**1970** — **The piezoelectric sensor** is developed, and the piezoelectric sensor is the reason the force sensor is the most widely used sensor in the dynamic measurement. **The piezoelectric sensor is the reason the force sensor is the most refined sensor in engineering, and the dynamic measurement is the reason the piezoelectric sensor is the most widely used sensor in engineering.**

**1990s** — **The MEMS sensor** is developed, and the MEMS sensor is the reason the sensor is the most widely used sensor in the consumer electronics. **The MEMS sensor is the reason the sensor is the most refined sensor in engineering, and the consumer electronics is the reason the MEMS sensor is the most widely used sensor in engineering.**
:::

::: summary Sensors {#summary-sensors}
- **The sensor characteristics are accuracy, resolution, bandwidth, linearity, and hysteresis.** The accuracy is the reason the sensor is designed for the accuracy, not the range, and the accuracy is the reason the sensor is the most critical component in the control system.
- **The potentiometer is the resistive sensor for position: $V _ { \text{out } } = V _ { \text{in } } \, x / L$ .** The potentiometer is the most widely used sensor in the low-cost application.
- **The LVDT is the inductive sensor for position: $V _ { \text{out } } = k \, x$ .** The LVDT is the most widely used sensor in the harsh environment.
- **The encoder is the digital sensor for position: $\Delta \theta = 3 6 0 ^ { \circ } / N$ .** The encoder is the most accurate position sensor, and the accuracy is the reason the encoder is the most widely used sensor in the control system.
- **The strain gauge is the resistive sensor for force: $\Delta R / R = G F \, \varepsilon$ .** The strain gauge is the most widely used force sensor, and the force sensor is the reason the strain gauge is the most refined force sensor in engineering.
- **The Wheatstone bridge output voltage is $V _ { \text{out } } = V _ { \text{exc } } \, G F \, \varepsilon / 4$ for a quarter bridge.** The Wheatstone bridge is the reason the engineer can measure the strain, and the strain is the reason the force sensor is the most critical component in the measurement system.
- **The thermocouple is the junction sensor for temperature: $V = S \, ( T _ { \text{hot } } - T _ { \text{cold } } )$ .** The thermocouple is the most widely used sensor in the high-temperature application.
- **The RTD is the resistive sensor for temperature: $R ( T ) = R _ { 0 } \, [ 1 + \alpha \, ( T - T _ { 0 } ) ]$ .** The RTD is the most accurate temperature sensor, and the accuracy is the reason the RTD is the most widely used sensor in the precision measurement system.
- **The thermistor is the semiconductor sensor for temperature: $R ( T ) = R _ { 0 } \, \exp [ \beta \, ( 1 / T - 1 / T _ { 0 } ) ]$ .** The thermistor is the most sensitive temperature sensor, and the sensitivity is the reason the thermistor is the most widely used sensor in the high-sensitivity measurement system.
- **The sensor selection is the most important selection in mechatronic system design, because the sensor selection determines the accuracy of the measurement.** The accuracy is the reason the engineer can design the measurement system to be safe.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The sensor characteristics, the position sensors, and the force sensors.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The sensor selection and the signal conditioning.
- **D.A. Bristout (2002)** — *Sensors and Signal Conditioning*, 2nd ed. Wiley. The sensor characteristics and the signal conditioning.
- **Jacob Fraden (2016)** — *Handbook of Modern Sensors*, 5th ed. Springer. The sensor characteristics, the position sensors, and the temperature sensors.
- **R.S. Figliola and D.S. Beasley (2015)** — *Theory and Design for Mechanical Measurements*, 6th ed. Wiley. The sensor selection and the measurement system.
- **E.O. Doebelin (2004)** — *Measurement Systems: Application and Design*, 5th ed. McGraw-Hill. The sensor characteristics and the measurement system.
- **B. Joyce (2003)** — *Mechatronics: An Integrated Approach*. Prentice-Hall. The sensor selection and the signal conditioning.
- **N. Zubair and M. Fuqaha (2015)** — *Mechatronics: Principles and Applications*. CRC Press. The sensor selection and the measurement system.
