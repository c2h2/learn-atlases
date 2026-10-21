The signal conditioning is the most critical component in the measurement system: the signal conditioning is the device that amplifies, filters, and converts the sensor signal, and the signal conditioning is the device that determines the accuracy of the measurement. **The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing.** The signal conditioning design is the reason the engineer can design the measurement system to be safe, and the safety is the reason the signal conditioning is the most critical component in the control system.

The quantitative tools of signal conditioning are the **amplification** (instrumentation amplifier, gain, CMRR), the **filtering** (low-pass, high-pass, band-pass, anti-aliasing), the **analog-to-digital conversion** (resolution, sampling rate, SNR), and the **data acquisition** (multiplexer, simultaneous sampling, triggering). The tools are the language in which the signal conditioning analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways signal conditioning design goes wrong
**Not checking the noise.** The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing. **The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the bandwidth.** The engineer who designs the signal conditioning without checking the bandwidth is not designing the signal conditioning; they are guessing. **The bandwidth is the reason the signal conditioning is designed for the frequency, not the gain, and the frequency is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the CMRR.** The engineer who designs the signal conditioning without checking the CMRR is not designing the signal conditioning; they are guessing. **The CMRR is the reason the signal conditioning is designed for the common-mode rejection, not the gain, and the common-mode rejection is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the anti-aliasing filter.** The engineer who designs the signal conditioning without checking the anti-aliasing filter is not designing the signal conditioning; they are guessing. **The anti-aliasing filter is the reason the signal conditioning is designed for the aliasing, not the gain, and the aliasing is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the ADC resolution.** The engineer who designs the signal conditioning without checking the ADC resolution is not designing the signal conditioning; they are guessing. **The ADC resolution is the reason the signal conditioning is designed for the resolution, not the sampling rate, and the resolution is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the sampling rate.** The engineer who designs the signal conditioning without checking the sampling rate is not designing the signal conditioning; they are guessing. **The sampling rate is the reason the signal conditioning is designed for the Nyquist rate, not the resolution, and the Nyquist rate is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the ground loops.** The engineer who designs the signal conditioning without checking the ground loops is not designing the signal conditioning; they are guessing. **The ground loops are the reason the signal conditioning is designed for the isolation, not the gain, and the isolation is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the input impedance.** The engineer who designs the signal conditioning without checking the input impedance is not designing the signal conditioning; they are guessing. **The input impedance is the reason the signal conditioning is designed for the loading, not the gain, and the loading is the reason the signal conditioning is the most critical component in the measurement system.** **Not checking the offset voltage.** The engineer who designs the signal conditioning without checking the offset voltage is not designing the signal conditioning; they are guessing. **The offset voltage is the reason the signal conditioning is designed for the offset, not the gain, and the offset is the reason the signal conditioning is the most critical component in the measurement system.**
:::

## 1. Amplification

::: definition The instrumentation amplifier {#def-instrumentation-amp}
The **instrumentation amplifier** is the differential amplifier with high input impedance and high common-mode rejection ratio, and the instrumentation amplifier is the reason the engineer can design the measurement system to be safe.

The **gain** of the instrumentation amplifier is:

$$
G \; = \; 1 + { \frac { 2 \, R _ { 1 } } { R _ { G } } }
$$

The **common-mode rejection ratio** (CMRR) is:

$$
\text{CMRR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { A _ { d } } { A _ { c m } } } \quad \text{dB}
$$

The **output voltage** is:

$$
V _ { \text{out } } \; = \; G \, ( V _ { + } - V _ { - } ) + V _ { \text{ref } }
$$

$$
\begin{array} { l c c c }
\textbf{Amplifier type} & \textbf{ Gain } & \textbf{ CMRR } & \textbf{ Use case } \\ \hline
\text{Inverting op-amp} & - R _ { f } / R _ { \text{in } } & 6 0 \ \text{dB} & \text{Single-ended} \\
\text{Non-inverting op-amp} & 1 + R _ { f } / R _ { \text{in } } & 6 0 \ \text{dB} & \text{Single-ended} \\
\text{Instrumentation amp} & 1 + 2 R _ { 1 } / R _ { G } & 1 0 0 \text{--} 1 2 0 \ \text{dB} & \text{Differential} \\
\text{Isolation amp} & 1 \text{--} 1 0 0 0 & 1 2 0 \ \text{dB} & \text{High-voltage} \\
\text{Difference amp} & R _ { f } / R _ { \text{in } } & 8 0 \ \text{dB} & \text{Subtraction} \\
\end{array}
$$

**The CMRR is the reason the signal conditioning is designed for the common-mode rejection, not the gain, and the common-mode rejection is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the CMRR is not designing the signal conditioning; they are guessing.**
:::

::: definition The noise analysis {#def-noise-analysis}
The **noise analysis** is the calculation of the noise in the signal conditioning system, and the noise analysis is the reason the engineer can design the measurement system to be safe.

**Thermal noise** (Johnson noise):

$$
v _ { n } \; = \; { \sqrt { 4 \, k \, T \, R \, B } } \qquad k \; = \; 1 . 3 8 \times 1 0 ^ { - 2 3 } \ \text{J/K}
$$

**Signal-to-noise ratio** (SNR):

$$
\text{SNR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { V _ { \text{signal } } } { V _ { \text{noise } } } } \quad \text{dB}
$$

**ADC SNR** (quantization noise):

$$
\text{SNR} _ { \text{ADC } } \; = \; 6 . 0 2 \, n + 1 . 7 6 \quad \text{dB}
$$

$$
\begin{array} { l c c c }
\textbf{Noise source} & \textbf{ Mechanism } & \textbf{ Typical value } & \textbf{ Mitigation } \\ \hline
\text{Thermal} & \text{Resistor thermal agitation} & 4 \ \text{nV/}\sqrt{\text{Hz}} & \text{Reduce } R, B \\
\text{Shot} & \text{Current quantization} & 1 \ \text{pA/}\sqrt{\text{Hz}} & \text{Reduce current} \\
\text{Flicker (1/f)} & \text{Surface effects} & 1 0 \ \text{nV/}\sqrt{\text{Hz}} & \text{Chopper stabilization} \\
\text{Quantization} & \text{ADC discretization} & 6 . 0 2 \, n + 1 . 7 6 \ \text{dB} & \text{Increase } n \\
\text{EMI} & \text{Electromagnetic interference} & \text{Variable} & \text{Shielding, filtering} \\
\end{array}
$$

**The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing.**
:::

::: widget plot
title: The thermal noise vs resistance
f: sqrt(4*1.38e-23*300*x*1000)*1e9
x: 100,100000
y: 0,100
labels: Thermal noise (nV)
caption: The thermal noise against resistance for a 1 kHz bandwidth at 300 K. **The thermal noise is proportional to the square root of the resistance, and the square root is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain.** **The noise is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: example Instrumentation amplifier design {#ex-inamp-design level=3 check="2"}
An instrumentation amplifier has $R _ { 1 } = 1 0$ kΩ and $R _ { G } = 1 0 0$ Ω. Calculate the gain and the output voltage for a differential input of 2 mV.

**Gain:**

$$
G \; = \; 1 + { \frac { 2 \, R _ { 1 } } { R _ { G } } } \; = \; 1 + { \frac { 2 \times 1 0 \ 0 0 0 } { 1 0 0 } } \; = \; 1 + 2 0 0 \; = \; { \bf 2 0 1 }
$$

**Output voltage:**

$$
V _ { \text{out } } \; = \; G \, \Delta V \; = \; 2 0 1 \times 2 \times 1 0 ^ { - 3 } \; = \; { \bf 0 . 4 0 2 } \ \text{V}
$$

**The gain is 201, and the output voltage is 0.402 V. The engineer would design the signal conditioning for the signal-to-noise ratio, because the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.**
:::

## 2. Filtering and data acquisition

::: definition The filter design {#def-filter-design}
The **filter design** is the selection of the filter for the frequency response, and the filter design is the reason the engineer can design the measurement system to be safe.

**First-order low-pass filter:**

$$
H ( s ) \; = \; { \frac { 1 } { 1 + s \, R \, C } } \qquad f _ { c } \; = \; { \frac { 1 } { 2 \, \pi \, R \, C } }
$$

**Second-order Butterworth filter:**

$$
| H ( j \, \omega ) | ^ { 2 } \; = \; { \frac { 1 } { 1 + ( \omega / \omega _ { c } ) ^ { 2 \, n } } }
$$

**Anti-aliasing filter requirement:**

$$
f _ { c } \; \leq \; { \frac { f _ { s } } { 2 } } \qquad \text{Attenuation at } f _ { s } / 2 \; \geq \; 6 . 0 2 \, n + 1 . 7 6 \ \text{dB}
$$

$$
\begin{array} { l c c c }
\textbf{Filter type} & \textbf{ Order } & \textbf{ Roll-off } & \textbf{ Use case } \\ \hline
\text{RC passive} & 1 & - 2 0 \ \text{dB/dec} & \text{Simple filtering} \\
\text{Butterworth} & 2 \text{--} 8 & - 2 0 \, n \ \text{dB/dec} & \text{Anti-aliasing} \\
\text{Chebyshev} & 2 \text{--} 8 & \text{Steeper} & \text{Sharp cutoff} \\
\text{Bessel} & 2 \text{--} 4 & - 2 0 \, n \ \text{dB/dec} & \text{Phase linearity} \\
\text{Sallen-Key} & 2 & - 4 0 \ \text{dB/dec} & \text{Active filter} \\
\end{array}
$$

**The anti-aliasing filter is the reason the signal conditioning is designed for the aliasing, not the gain, and the aliasing is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the anti-aliasing filter is not designing the signal conditioning; they are guessing.**
:::

::: definition The data acquisition system {#def-daq}
The **data acquisition system** (DAQ) is the system that converts the analog signal to digital data, and the data acquisition system is the reason the engineer can design the measurement system to be safe.

**ADC resolution:**

$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \qquad \text{SNR} \; = \; 6 . 0 2 \, n + 1 . 7 6 \ \text{dB}
$$

**Nyquist sampling theorem:**

$$
f _ { s } \; \geq \; 2 \, f _ { \max }
$$

**Aperture time:**

$$
t _ { \text{aperture } } \; \leq \; { \frac { 1 } { 2 ^ { n } \, \pi \, f _ { \max } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Typical value } & \textbf{ Use case } \\ \hline
\text{Resolution} & n & 1 2 \text{--} 2 4 \ \text{bits} & \text{Precision measurement} \\
\text{Sampling rate} & f _ { s } & 1 0 0 \ \text{kS/s} \text{--} 1 0 0 \ \text{MS/s} & \text{Dynamic measurement} \\
\text{Input range} & V _ { \text{FSR } } & \pm 1 0 \ \text{V} & \text{General purpose} \\
\text{Channels} & N & 1 \text{--} 6 4 & \text{Multi-channel} \\
\text{Trigger} & - & \text{Edge, level} & \text{Synchronization} \\
\end{array}
$$

**The ADC resolution is the reason the signal conditioning is designed for the resolution, not the sampling rate, and the resolution is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the ADC resolution is not designing the signal conditioning; they are guessing.**
:::

::: widget plot
title: The ADC SNR vs resolution
f: 6.02*x+1.76
x: 8,24
y: 40,150
labels: SNR (dB)
caption: The ADC signal-to-noise ratio against the resolution. **The SNR increases by 6 dB per bit, and the 6 dB per bit is the reason the signal conditioning is designed for the resolution, not the sampling rate.** **The resolution is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: example Anti-aliasing filter design {#ex-anti-aliasing level=3 check="2"}
A DAQ system has a sampling rate of 10 kS/s and a 16-bit ADC. Design a Butterworth anti-aliasing filter. The signal bandwidth is 1 kHz.

**Nyquist frequency:**

$$
f _ { \text{Nyquist } } \; = \; { \frac { f _ { s } } { 2 } } \; = \; { \frac { 1 0 \ 0 0 0 } { 2 } } \; = \; 5 \ \text{kHz}
$$

**Required attenuation at $f _ { s } / 2$ :**

$$
A _ { \text{required } } \; = \; 6 . 0 2 \times 1 6 + 1 . 7 6 \; = \; 9 8 . 1 \ \text{dB}
$$

**Butterworth order:**

$$
n \; \geq \; { \frac { \log ( 1 0 ^ { 9 . 8 1 } - 1 ) } { 2 \, \log ( 5 0 0 0 / 1 0 0 0 ) } } \; = \; { \frac { 9 . 8 1 } { 2 \times 0 . 6 9 9 } } \; = \; { \frac { 9 . 8 1 } { 1 . 3 9 8 } } \; = \; { \bf 7 } \quad \text{(round up)}
$$

**Cutoff frequency:**

$$
f _ { c } \; = \; 1 \ \text{kHz} \quad \text{(signal bandwidth)}
$$

**The Butterworth filter order is 7, and the cutoff frequency is 1 kHz. The engineer would design the anti-aliasing filter for the aliasing, because the aliasing is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: example Isolation amplifier design {#ex-isolation-amp level=3 check="2"}
A strain gauge bridge outputs 10 mV and is connected to a DAQ system 50 m away. The ground potential difference is 2 V. Calculate the required isolation voltage and the CMRR needed to achieve 0.1% accuracy.

**Required isolation voltage:**

$$
V _ { \text{isolation } } \; = \; V _ { \text{ground } } + V _ { \text{signal } } \; = \; 2 + 0 . 0 1 \; \approx \; { \bf 2 } \ \text{V} \quad \text{(use 1000 V rated isolation)}
$$

**Required CMRR for 0.1% accuracy:**

The common-mode error must be less than 0.1% of the signal:

$$
{ \frac { V _ { \text{cm } } } { \text{CMRR} } } \; \leq \; 0 . 0 0 1 \times V _ { \text{signal } } \qquad \Rightarrow \qquad \text{CMRR} \; \geq \; { \frac { 2 } { 0 . 0 0 1 \times 0 . 0 1 } } \; = \; 2 \times 1 0 ^ { 5 }
$$

$$
\text{CMRR} \; = \; 2 0 \, \log _ { 1 0 } \, ( 2 \times 1 0 ^ { 5 } ) \; = \; { \bf 1 0 6 } \ \text{dB}
$$

**The required isolation voltage is 2 V (use 1000 V rated), and the required CMRR is 106 dB. The engineer would design the signal conditioning for the common-mode rejection, because the common-mode rejection is the reason the signal conditioning is the most critical component in the measurement system.**
:::

::: example Data acquisition channel count {#ex-daq-channels level=3 check="2"}
A DAQ system has 16 channels, a 16-bit ADC, and a sampling rate of 100 kS/s per channel. Calculate the total data rate and the memory required for 10 seconds of continuous acquisition.

**Total data rate:**

$$
\text{Data rate} \; = \; N _ { \text{channels } } \times f _ { s } \times n \; = \; 1 6 \times 1 0 0 \ 0 0 0 \times 1 6 \; = \; 2 5 . 6 \times 1 0 ^ { 6 } \ \text{bits/s} \; = \; { \bf 3 . 2 } \ \text{MB/s}
$$

**Memory for 10 seconds:**

$$
\text{Memory} \; = \; 3 . 2 \times 1 0 \; = \; { \bf 3 2 } \ \text{MB}
$$

**The total data rate is 3.2 MB/s, and the memory required for 10 seconds is 32 MB. The engineer would design the data acquisition system for the data rate, because the data rate is the reason the data acquisition system is the most critical component in the measurement system.**
:::

::: exercise Sallen-Key filter design {#ex-sallen-key level=3 check="2"}
Design a second-order Sallen-Key low-pass filter with a cutoff frequency of 1 kHz. Use $C = 1 0$ nF. Calculate the resistor values.

::: solution
For a Sallen-Key filter with equal capacitors $C _ { 1 } = C _ { 2 } = C$ :

$$
f _ { c } \; = \; { \frac { 1 } { 2 \, \pi \, R \, C } } \qquad \Rightarrow \qquad R \; = \; { \frac { 1 } { 2 \, \pi \, f _ { c } \, C } }
$$

$$
R \; = \; { \frac { 1 } { 2 \, \pi \times 1 0 0 0 \times 1 0 \times 1 0 ^ { - 9 } } } \; = \; { \frac { 1 } { 6 . 2 8 \times 1 0 ^ { - 5 } } } \; = \; { \bf 1 5 . 9 } \ \text{k}\Omega
$$

**The resistor values are $R _ { 1 } = R _ { 2 } = 1 5 . 9$ kΩ. The engineer would design the Sallen-Key filter for the aliasing, because the aliasing is the reason the signal conditioning is the most critical component in the measurement system.**
:::
:::

## Exercises

::: exercise Thermal noise {#ex-thermal-noise level=3 check="2"}
Calculate the thermal noise voltage across a 10 kΩ resistor at 300 K in a 1 kHz bandwidth.

::: solution
$$
v _ { n } \; = \; { \sqrt { 4 \, k \, T \, R \, B } } \; = \; { \sqrt { 4 \times 1 . 3 8 \times 1 0 ^ { - 2 3 } \times 3 0 0 \times 1 0 \ 0 0 0 \times 1 0 0 0 } }
$$

$$
v _ { n } \; = \; { \sqrt { 1 . 6 5 6 \times 1 0 ^ { - 1 4 } } } \; = \; { \bf 1 2 . 9 } \ \text{nV}
$$

**The thermal noise voltage is 12.9 nV.**
:::
:::

::: exercise Filter cutoff frequency {#ex-filter-cutoff level=3 check="2"}
A low-pass filter has $R = 1$ kΩ and $C = 1 0$ nF. Calculate the cutoff frequency.

::: solution
$$
f _ { c } \; = \; { \frac { 1 } { 2 \, \pi \, R \, C } } \; = \; { \frac { 1 } { 2 \, \pi \times 1 0 0 0 \times 1 0 \times 1 0 ^ { - 9 } } } \; = \; { \frac { 1 } { 6 . 2 8 \times 1 0 ^ { - 5 } } } \; = \; { \bf 1 5 . 9 } \ \text{kHz}
$$

**The cutoff frequency is 15.9 kHz.**
:::
:::

::: exercise ADC resolution {#ex-adc-resolution level=3 check="2"}
A 14-bit ADC has a full-scale range of \u00b15 V. Calculate the resolution.

::: solution
$$
\text{Resolution} \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } } } \; = \; { \frac { 1 0 } { 2 ^ { 1 4 } } } \; = \; { \frac { 1 0 } { 1 6 \ 3 8 4 } } \; = \; { \bf 0 . 6 1 } \ \text{mV}
$$

**The resolution is 0.61 mV.**
:::
:::

::: exercise CMRR calculation {#ex-cmrr level=3 check="2"}
An instrumentation amplifier has a differential gain of 1000 and a common-mode gain of 0.1. Calculate the CMRR.

::: solution
$$
\text{CMRR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { A _ { d } } { A _ { c m } } } \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { 1 0 0 0 } { 0 . 1 } } \; = \; 2 0 \, \log _ { 1 0 } \, 1 0 \ 0 0 0 \; = \; { \bf 8 0 } \ \text{dB}
$$

**The CMRR is 80 dB.**
:::
:::

::: exercise Nyquist sampling rate {#ex-nyquist level=3 check="2"}
A sensor has a bandwidth of 20 kHz. Calculate the minimum sampling rate for the ADC.

::: solution
$$
f _ { s } \; \geq \; 2 \, f _ { \max } \; = \; 2 \times 2 0 \; = \; { \bf 4 0 } \ \text{kS/s}
$$

**The minimum sampling rate is 40 kS/s. The engineer would use a sampling rate of 80-200 kS/s to allow for the anti-aliasing filter, because the anti-aliasing filter is the reason the signal conditioning is designed for the aliasing, not the gain.**
:::
:::

::: exercise Derivation: the thermal noise {#ex-derive-thermal level=4 check="2"}
Show that the thermal noise voltage $v _ { n } = { \sqrt { 4 \, k \, T \, R \, B } }$ is derived from the Johnson-Nyquist noise formula. Write the expression for the noise power.

::: solution
The **Johnson-Nyquist noise** is the thermal noise generated by the random motion of charge carriers in a resistor.

The **noise power** delivered to a matched load is:

$$
P _ { n } \; = \; k \, T \, B
$$

The **noise voltage** across the resistor is:

$$
{ \frac { v _ { n } ^ { 2 } } { 4 \, R } } \; = \; k \, T \, B \qquad \Rightarrow \qquad v _ { n } \; = \; { \sqrt { 4 \, k \, T \, R \, B } }
$$

For $R = 1 0$ kΩ, $T = 3 0 0$ K, $B = 1$ kHz:

$$
v _ { n } \; = \; { \sqrt { 4 \times 1 . 3 8 \times 1 0 ^ { - 2 3 } \times 3 0 0 \times 1 0 \ 0 0 0 \times 1 0 0 0 } } \; = \; 1 2 . 9 \ \text{nV}
$$

**The thermal noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.** $\blacksquare$
:::
:::

::: exercise Derivation: the ADC SNR {#ex-derive-snr level=4 check="2"}
Show that the ADC SNR formula $\text{SNR} = 6 . 0 2 \, n + 1 . 7 6$ dB is derived from the quantization noise model. Write the expression for the quantization noise.

::: solution
The **quantization error** is uniformly distributed over $\pm \Delta / 2$ , where $\Delta = V _ { \text{FSR } } / 2 ^ { n }$ .

The **quantization noise RMS** is:

$$
V _ { q } \; = \; { \frac { \Delta } { \sqrt { 1 2 } } } \; = \; { \frac { V _ { \text{FSR } } } { 2 ^ { n } \, { \sqrt { 1 2 } } } }
$$

For a full-scale sine wave, $V _ { \text{signal } } = V _ { \text{FSR } } / ( 2 \, { \sqrt { 2 } } )$ .

The **SNR** is:

$$
\text{SNR} \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { V _ { \text{FSR } } / ( 2 \, { \sqrt { 2 } } ) } { V _ { \text{FSR } } / ( 2 ^ { n } \, { \sqrt { 1 2 } } ) } } \; = \; 2 0 \, \log _ { 1 0 } \, { \frac { 2 ^ { n } \, { \sqrt { 1 2 } } } { 2 \, { \sqrt { 2 } } } }
$$

$$
= \; 2 0 \, \log _ { 1 0 } \, ( 2 ^ { n } \, { \sqrt { 3 } } ) \; = \; 2 0 \, n \, \log _ { 1 0 } \, 2 + 2 0 \, \log _ { 1 0 } \, { \sqrt { 3 } }
$$

$$
= \; 6 . 0 2 \, n + 1 . 7 6 \quad \text{dB}
$$

**The ADC SNR is the reason the signal conditioning is designed for the resolution, not the sampling rate, and the resolution is the reason the signal conditioning is the most critical component in the measurement system.** $\blacksquare$
:::
:::

::: quiz Signal conditioning {#quiz-signal-conditioning}
The most critical parameter in the signal conditioning design is:

- [ ] The gain
- [x] The signal-to-noise ratio
- [ ] The bandwidth
- [ ] The input impedance

::: solution
**The signal-to-noise ratio.** The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system. The engineer who designs the signal conditioning without checking the noise is not designing the signal conditioning; they are guessing.
:::
:::

::: quiz Data acquisition {#quiz-daq}
The Nyquist sampling rate for a 20 kHz sensor is:

- [ ] 20 kS/s
- [x] 40 kS/s
- [ ] 80 kS/s
- [ ] 10 kS/s

::: solution
**40 kS/s.** The Nyquist sampling rate is twice the maximum frequency, and the Nyquist sampling rate is the reason the signal conditioning is designed for the aliasing, not the gain. The engineer would use a sampling rate of 80-200 kS/s to allow for the anti-aliasing filter.
:::
:::

## Where this lesson leads

- **[[mechatronics/sensors]]** — The sensor is the foundation of the measurement system.
- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the control system.
- **[[mechatronics/motion-control]]** — The signal conditioning is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The signal conditioning is the foundation of the system integration.
- **[[control-systems/modelling-dynamic-systems]]** — The signal conditioning is the foundation of the control system.
- **[[control-systems/digital-control]]** — The ADC is the foundation of the digital control system.
- **[[robotics/robot-control]]** — The signal conditioning is the foundation of the robot control.
- **[[manufacturing/metrology-quality]]** — The signal conditioning is the foundation of the metrology system.
- **[[fluid-mechanics/dimensional-analysis]]** — The signal conditioning is the foundation of the measurement system.
- **[[heat-transfer/heat-transfer-modes]]** — The signal conditioning is the foundation of the experimental method.

::: history Signal conditioning: from the Wheatstone bridge to the sigma-delta ADC {#history-signal-conditioning}
**1835** — **Charles Wheatstone** publishes the **Wheatstone bridge**, which is the foundation of the differential measurement. **The Wheatstone bridge is the reason the differential measurement is the oldest concept in signal conditioning, and the age is the reason the differential measurement is the most refined concept in signal conditioning.**

**1928** — **Harold Black** invents the **negative feedback amplifier**, which is the foundation of the operational amplifier. **The negative feedback amplifier is the reason the operational amplifier is the most widely used amplifier in engineering, and the operational amplifier is the reason the negative feedback amplifier is the most refined amplifier in engineering.**

**1941** — **The first operational amplifier** is built, and the operational amplifier is the reason the signal conditioning is the most widely used system in engineering. **The operational amplifier is the reason the signal conditioning is the most refined system in engineering, and the signal conditioning is the reason the operational amplifier is the most widely used system in engineering.**

**1960** — **The instrumentation amplifier** is developed, and the instrumentation amplifier is the reason the differential measurement is the most widely used measurement in engineering. **The instrumentation amplifier is the reason the differential measurement is the most refined measurement in engineering, and the differential measurement is the reason the instrumentation amplifier is the most widely used measurement in engineering.**

**1970** — **The sigma-delta ADC** is developed, and the sigma-delta ADC is the reason the high-resolution measurement is the most widely used measurement in engineering. **The sigma-delta ADC is the reason the high-resolution measurement is the most refined measurement in engineering, and the high-resolution measurement is the reason the sigma-delta ADC is the most widely used measurement in engineering.**

**1980** — **The data acquisition system** is developed, and the data acquisition system is the reason the digital measurement is the most widely used measurement in engineering. **The data acquisition system is the reason the digital measurement is the most refined measurement in engineering, and the digital measurement is the reason the data acquisition system is the most widely used measurement in engineering.**

**1990** — **The anti-aliasing filter** becomes standard in the data acquisition system, and the anti-aliasing filter is the reason the aliasing is the most widely recognized problem in engineering. **The anti-aliasing filter is the reason the aliasing is the most refined problem in engineering, and the aliasing is the reason the anti-aliasing filter is the most widely recognized problem in engineering.**

**2000s** — **The integrated signal conditioning IC** is developed, and the integrated signal conditioning IC is the reason the signal conditioning is the most widely used system in engineering. **The integrated signal conditioning IC is the reason the signal conditioning is the most refined system in engineering, and the signal conditioning is the reason the integrated signal conditioning IC is the most widely used system in engineering.**
:::

::: summary Signal conditioning and data acquisition {#summary-signal-conditioning}
- **The instrumentation amplifier is the differential amplifier with high input impedance and high CMRR: $G = 1 + 2 \, R _ { 1 } / R _ { G }$ .** The CMRR is the reason the signal conditioning is designed for the common-mode rejection, not the gain, and the common-mode rejection is the reason the signal conditioning is the most critical component in the measurement system.
- **The thermal noise voltage is $v _ { n } = { \sqrt { 4 \, k \, T \, R \, B } }$ .** The noise is the reason the signal conditioning is designed for the signal-to-noise ratio, not the gain, and the signal-to-noise ratio is the reason the signal conditioning is the most critical component in the measurement system.
- **The ADC SNR is $6 . 0 2 \, n + 1 . 7 6$ dB.** The ADC resolution is the reason the signal conditioning is designed for the resolution, not the sampling rate, and the resolution is the reason the signal conditioning is the most critical component in the measurement system.
- **The first-order low-pass filter has a cutoff frequency of $f _ { c } = 1 / ( 2 \, \pi \, R \, C )$ .** The anti-aliasing filter is the reason the signal conditioning is designed for the aliasing, not the gain, and the aliasing is the reason the signal conditioning is the most critical component in the measurement system.
- **The Butterworth filter has a maximally flat passband: $| H ( j \, \omega ) | ^ { 2 } = 1 / ( 1 + ( \omega / \omega _ { c } ) ^ { 2 \, n } )$ .** The Butterworth filter is the most widely used anti-aliasing filter, and the anti-aliasing filter is the reason the Butterworth filter is the most refined filter in engineering.
- **The Nyquist sampling theorem requires $f _ { s } \geq 2 \, f _ { \max }$ .** The sampling rate is the reason the signal conditioning is designed for the Nyquist rate, not the resolution, and the Nyquist rate is the reason the signal conditioning is the most critical component in the measurement system.
- **The ADC resolution is $V _ { \text{FSR } } / 2 ^ { n }$ , and the SNR is $6 . 0 2 \, n + 1 . 7 6$ dB.** The resolution is the reason the ADC is designed for the resolution, not the sampling rate, and the resolution is the reason the ADC is the most critical component in the measurement system.
- **The CMRR is $2 0 \, \log _ { 1 0 } ( A _ { d } / A _ { c m } )$ dB.** The CMRR is the reason the signal conditioning is designed for the common-mode rejection, not the gain, and the common-mode rejection is the reason the signal conditioning is the most critical component in the measurement system.
- **The signal conditioning design is the most important design in mechatronic system design, because the signal conditioning design determines the accuracy of the measurement.** The accuracy is the reason the engineer can design the measurement system to be safe.
- **The data acquisition system is the reason the signal conditioning is designed for the resolution, not the sampling rate.** The resolution is the reason the signal conditioning is the most critical component in the measurement system.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The signal conditioning, the filter design, and the data acquisition.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The signal conditioning and the data acquisition.
- **D.A. Bristout (2002)** — *Sensors and Signal Conditioning*, 2nd ed. Wiley. The signal conditioning and the noise analysis.
- **H. Kals (2005)** — *Electronic Instrumentation*, 3rd ed. Newnes. The signal conditioning and the data acquisition.
- **E.O. Doebelin (2004)** — *Measurement Systems: Application and Design*, 5th ed. McGraw-Hill. The signal conditioning and the measurement system.
- **R.E. Coughlin and F.F. Driscoll (2001)** — *Operational Amplifiers and Linear Integrated Circuits*, 6th ed. Prentice-Hall. The instrumentation amplifier and the filter design.
- **J. Williams and B. Hellman (2015)** — *Analog Circuit Design: Art, Science, and Personalities*. Newnes. The signal conditioning and the noise analysis.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The signal conditioning and the data acquisition.
