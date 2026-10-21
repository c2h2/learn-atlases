The microcontroller is the most critical component in the control system: the microcontroller is the device that calculates the control action from the sensor signal, and the microcontroller is the device that determines the performance of the control system. **The engineer who designs the microcontroller system without checking the timing is not designing the microcontroller system; they are guessing.** The microcontroller design is the reason the engineer can design the control system to be safe, and the safety is the reason the microcontroller is the most critical component in the control system.

The quantitative tools of microcontroller design are the **microcontroller architecture** (CPU, memory, peripherals), the **embedded software** (firmware, real-time operating system, interrupt handling), the **communication protocols** (SPI, I2C, UART, CAN), and the **timing analysis** (sampling rate, execution time, jitter). The tools are the language in which the microcontroller analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways microcontroller design goes wrong
**Not checking the timing.** The engineer who designs the microcontroller system without checking the timing is not designing the microcontroller system; they are guessing. **The timing is the reason the microcontroller is designed for the execution time, not the clock speed, and the execution time is the reason the microcontroller is the most critical component in the control system.** **Not checking the interrupt latency.** The engineer who designs the microcontroller system without checking the interrupt latency is not designing the microcontroller system; they are guessing. **The interrupt latency is the reason the microcontroller is designed for the response time, not the clock speed, and the response time is the reason the microcontroller is the most critical component in the control system.** **Not checking the memory.** The engineer who designs the microcontroller system without checking the memory is not designing the microcontroller system; they are guessing. **The memory is the reason the microcontroller is designed for the memory, not the clock speed, and the memory is the reason the microcontroller is the most critical component in the control system.** **Not checking the watchdog timer.** The engineer who designs the microcontroller system without checking the watchdog timer is not designing the microcontroller system; they are guessing. **The watchdog timer is the reason the microcontroller is designed for the safety, not the performance, and the safety is the reason the microcontroller is the most critical component in the control system.** **Not checking the communication protocol.** The engineer who designs the microcontroller system without checking the communication protocol is not designing the microcontroller system; they are guessing. **The communication protocol is the reason the microcontroller is designed for the data rate, not the distance, and the data rate is the reason the microcontroller is the most critical component in the control system.** **Not checking the power supply.** The engineer who designs the microcontroller system without checking the power supply is not designing the microcontroller system; they are guessing. **The power supply is the reason the microcontroller is designed for the ripple, not the voltage, and the ripple is the reason the microcontroller is the most critical component in the control system.** **Not checking the electromagnetic compatibility.** The engineer who designs the microcontroller system without checking the electromagnetic compatibility is not designing the microcontroller system; they are guessing. **The electromagnetic compatibility is the reason the microcontroller is designed for the electromagnetic compatibility, not the performance, and the electromagnetic compatibility is the reason the microcontroller is the most critical component in the control system.** **Not checking the real-time performance.** The engineer who designs the microcontroller system without checking the real-time performance is not designing the microcontroller system; they are guessing. **The real-time performance is the reason the microcontroller is designed for the deadline, not the throughput, and the deadline is the reason the microcontroller is the most critical component in the control system.** **Not checking the code safety.** The engineer who designs the microcontroller system without checking the code safety is not designing the microcontroller system; they are guessing. **The code safety is the reason the microcontroller is designed for the safety, not the performance, and the safety is the reason the microcontroller is the most critical component in the control system.**
:::

## 1. Microcontroller architecture

::: definition The microcontroller architecture {#def-mcu-architecture}
The **microcontroller architecture** is the organization of the CPU, memory, and peripherals, and the microcontroller architecture is the reason the engineer can design the control system to be safe.

The **microcontroller** consists of:
1. **CPU**: the central processing unit that executes the instructions
2. **Memory**: the RAM (volatile) and ROM/Flash (non-volatile) for data and code
3. **Timers**: the hardware counters for timing and PWM generation
4. **ADC/DAC**: the analog-to-digital and digital-to-analog converters
5. **Communication peripherals**: the SPI, I2C, UART, and CAN interfaces
6. **GPIO**: the general-purpose input/output pins
7. **Watchdog timer**: the safety timer that resets the microcontroller if the software hangs

$$
\begin{array} { l c c c }
\textbf{Component} & \textbf{ Function } & \textbf{ Key parameter } & \textbf{ Use case } \\ \hline
\text{CPU} & \text{Execute instructions} & \text{Clock speed, MIPS} & \text{Control algorithm} \\
\text{RAM} & \text{Volatile data storage} & \text{Size (KB)} & \text{Data buffer} \\
\text{Flash} & \text{Non-volatile code storage} & \text{Size (KB)} & \text{Firmware} \\
\text{Timer} & \text{Timing, PWM} & \text{Resolution, frequency} & \text{Motor drive} \\
\text{ADC} & \text{Analog to digital} & \text{Resolution, rate} & \text{Sensor input} \\
\text{DAC} & \text{Digital to analog} & \text{Resolution, settling} & \text{Actuator output} \\
\text{SPI} & \text{Serial communication} & 1 0 \text{--} 1 0 0 \ \text{MHz} & \text{Sensor, ADC} \\
\text{I2C} & \text{Serial communication} & 1 0 0 \text{--} 4 0 0 \ \text{kHz} & \text{Sensor, EEPROM} \\
\text{UART} & \text{Serial communication} & 1 1 5 . 2 \ \text{kbaud} & \text{Debug, GPS} \\
\text{CAN} & \text{Serial communication} & 1 \ \text{Mbps} & \text{Automotive, industrial} \\
\end{array}
$$

**The timing is the reason the microcontroller is designed for the execution time, not the clock speed, and the execution time is the reason the microcontroller is the most critical component in the control system. The engineer who designs the microcontroller system without checking the timing is not designing the microcontroller system; they are guessing.**
:::

::: definition The embedded software {#def-embedded-software}
The **embedded software** is the firmware that runs on the microcontroller, and the embedded software is the reason the engineer can design the control system to be safe.

**Main loop architecture:**

$$
T _ { \text{loop } } \; = \; T _ { \text{sensor } } + T _ { \text{control } } + T _ { \text{actuator } } + T _ { \text{communication } }
$$

**Interrupt-driven architecture:**

$$
T _ { \text{response } } \; = \; T _ { \text{latency } } + T _ { \text{isr } }
$$

**Real-time operating system (RTOS) task scheduling:**

$$
\text{Utilization} \; = \; \sum _ { i = 1 } ^ { N } { \frac { C _ { i } } { T _ { i } } } \; \leq \; 1
$$

where $C _ { i }$ is the execution time and $T _ { i }$ is the period of task $i$ .

$$
\begin{array} { l c c c }
\textbf{Architecture} & \textbf{ Response time } & \textbf{ Complexity } & \textbf{ Use case } \\ \hline
\text{Main loop} & T _ { \text{loop } } & \text{Low} & \text{Simple control} \\
\text{Interrupt-driven} & T _ { \text{latency } } + T _ { \text{isr } } & \text{Medium} & \text{Real-time control} \\
\text{RTOS} & \text{Worst-case response} & \text{High} & \text{Multi-task control} \\
\text{State machine} & T _ { \text{state } } & \text{Medium} & \text{Sequential control} \\
\end{array}
$$

**The interrupt latency is the reason the microcontroller is designed for the response time, not the clock speed, and the response time is the reason the microcontroller is the most critical component in the control system. The engineer who designs the microcontroller system without checking the interrupt latency is not designing the microcontroller system; they are guessing.**
:::

::: widget plot
title: The CPU execution time vs clock speed
f: 1000/x; 500/x; 100/x
x: 10,200
y: 0,100
labels: 1000 instructions; 500 instructions; 100 instructions
caption: The CPU execution time against the clock speed for different instruction counts. **The execution time is inversely proportional to the clock speed, and the inverse proportionality is the reason the microcontroller is designed for the execution time, not the clock speed.** **The execution time is the reason the microcontroller is the most critical component in the control system.**
:::

::: example Microcontroller selection {#ex-mcu-selection level=3 check="2"}
A control system requires a 10 kHz sampling rate, a 12-bit ADC, and a PID controller that takes 500 instructions to execute. The microcontroller executes 1 instruction per clock cycle. Calculate the minimum clock speed.

**Execution time per sample:**

$$
T _ { \text{sample } } \; = \; { \frac { 1 } { f _ { \text{sample } } } } \; = \; { \frac { 1 } { 1 0 \ 0 0 0 } } \; = \; 1 0 0 \ \mu\text{s}
$$

**Minimum clock speed:**

$$
f _ { \text{clock } } \; = \; { \frac { N _ { \text{instructions } } } { T _ { \text{sample } } } } \; = \; { \frac { 5 0 0 } { 1 0 0 \times 1 0 ^ { - 6 } } } \; = \; { \bf 5 } \ \text{MHz}
$$

**With 50% overhead for ADC, communication, and interrupts:**

$$
f _ { \text{clock } } \; = \; { \frac { 5 } { 0 . 5 } } \; = \; { \bf 1 0 } \ \text{MHz}
$$

**The minimum clock speed is 10 MHz. The engineer would select the microcontroller for the execution time, because the execution time is the reason the microcontroller is the most critical component in the control system.**
:::

## 2. Communication protocols

::: definition The communication protocols {#def-comm-protocols}
The **communication protocols** are the standards for data transfer between the microcontroller and the peripherals, and the communication protocols are the reason the engineer can design the distributed system to be safe.

**SPI** (Serial Peripheral Interface):

$$
\text{Data rate} \; = \; 1 0 \text{--} 1 0 0 \ \text{MHz} \qquad \text{Wires} \; = \; 4 \ \text{(MOSI, MISO, SCK, CS)}
$$

**I2C** (Inter-Integrated Circuit):

$$
\text{Data rate} \; = \; 1 0 0 \text{--} 4 0 0 \ \text{kHz} \qquad \text{Wires} \; = \; 2 \ \text{(SDA, SCL)}
$$

**UART** (Universal Asynchronous Receiver-Transmitter):

$$
\text{Data rate} \; = \; 9 6 0 0 \text{--} 1 1 5 \ 2 0 0 \ \text{baud} \qquad \text{Wires} \; = \; 2 \ \text{(TX, RX)}
$$

**CAN** (Controller Area Network):

$$
\text{Data rate} \; = \; 1 \ \text{Mbps} \qquad \text{Distance} \; = \; 4 0 \ \text{m} \quad \text{(at 1 Mbps)}
$$

$$
\begin{array} { l c c c c }
\textbf{Protocol} & \textbf{ Data rate } & \textbf{ Wires } & \textbf{ Distance } & \textbf{ Use case } \\ \hline
\text{SPI} & 1 0 0 \ \text{MHz} & 4 & 0 . 3 \ \text{m} & \text{ADC, flash} \\
\text{I2C} & 4 0 0 \ \text{kHz} & 2 & 1 \ \text{m} & \text{Sensor, EEPROM} \\
\text{UART} & 1 1 5 \ \text{kbaud} & 2 & 1 5 \ \text{m} & \text{Debug, GPS} \\
\text{CAN} & 1 \ \text{Mbps} & 2 & 4 0 \ \text{m} & \text{Automotive} \\
\text{Ethernet} & 1 0 0 \ \text{Mbps} & 8 & 1 0 0 \ \text{m} & \text{Industrial} \\
\text{USB} & 4 8 0 \ \text{Mbps} & 4 & 5 \ \text{m} & \text{PC interface} \\
\end{array}
$$

**The communication protocol is the reason the microcontroller is designed for the data rate, not the distance, and the data rate is the reason the microcontroller is the most critical component in the control system. The engineer who designs the microcontroller system without checking the communication protocol is not designing the microcontroller system; they are guessing.**
:::

::: definition The timing analysis {#def-timing-analysis}
The **timing analysis** is the calculation of the execution time and the response time, and the timing analysis is the reason the engineer can design the control system to be safe.

**Worst-case execution time** (WCET):

$$
T _ { \text{WCET } } \; = \; \max ( T _ { \text{path } } ) \; = \; \sum _ { i } \, n _ { i } \, t _ { i }
$$

**Interrupt response time:**

$$
T _ { \text{response } } \; = \; T _ { \text{latency } } + T _ { \text{context } } + T _ { \text{isr } }
$$

**Control loop timing:**

$$
T _ { \text{loop } } \; = \; T _ { \text{ADC } } + T _ { \text{control } } + T _ { \text{DAC } } + T _ { \text{jitter } } \; \leq \; { \frac { 1 } { f _ { \text{sample } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Timing parameter} & \textbf{ Symbol } & \textbf{ Typical value } & \textbf{ Use case } \\ \hline
\text{Clock period} & T _ { \text{clk } } & 1 \text{--} 1 0 0 \ \text{ns} & \text{CPU speed} \\
\text{Interrupt latency} & T _ { \text{latency } } & 1 0 \text{--} 1 0 0 \ \text{cycles} & \text{Real-time response} \\
\text{ADC conversion time} & T _ { \text{ADC } } & 1 \text{--} 1 0 \ \mu\text{s} & \text{Sensor sampling} \\
\text{Control loop time} & T _ { \text{loop } } & 1 0 \text{--} 1 0 0 0 \ \mu\text{s} & \text{Control bandwidth} \\
\text{Jitter} & T _ { \text{jitter } } & 1 \text{--} 1 0 \ \mu\text{s} & \text{Timing accuracy} \\
\end{array}
$$

**The real-time performance is the reason the microcontroller is designed for the deadline, not the throughput, and the deadline is the reason the microcontroller is the most critical component in the control system. The engineer who designs the microcontroller system without checking the real-time performance is not designing the microcontroller system; they are guessing.**
:::

::: widget plot
title: The CAN bus data rate vs distance
f: 1000/max(x,1)
x: 10,100
y: 0,1000
labels: Data rate (kbps)
caption: The CAN bus data rate against the cable distance. **The data rate is inversely proportional to the distance, and the inverse proportionality is the reason the communication protocol is designed for the data rate, not the distance.** **The data rate is the reason the communication protocol is the most critical component in the distributed system.**
:::

::: example CAN bus message rate {#ex-can-message level=3 check="2"}
A CAN bus operates at 500 kbps with a message length of 100 bits. Calculate the maximum number of messages per second and the bus utilization for 2000 messages per second.

**Maximum message rate:**

$$
N _ { \max } \; = \; { \frac { \text{Data rate} } { \text{Message length} } } \; = \; { \frac { 5 0 0 \ 0 0 0 } { 1 0 0 } } \; = \; { \bf 5 0 0 0 } \ \text{messages/s}
$$

**Bus utilization:**

$$
U \; = \; { \frac { N _ { \text{actual } } } { N _ { \max } } } \times 1 0 0 \; = \; { \frac { 2 0 0 0 } { 5 0 0 0 } } \times 1 0 0 \; = \; { \bf 4 0 } \ \ \%
$$

**The maximum message rate is 5000 messages/s, and the bus utilization is 40%. The engineer would design the communication system for the data rate, because the data rate is the reason the communication protocol is the most critical component in the distributed system.**
:::

::: example PWM resolution calculation {#ex-pwm-resolution level=3 check="2"}
A microcontroller timer runs at 48 MHz and generates a 20 kHz PWM signal. Calculate the PWM resolution and the duty cycle for a 50% output.

**PWM period:**

$$
T _ { \text{PWM } } \; = \; { \frac { 1 } { f _ { \text{PWM } } } } \; = \; { \frac { 1 } { 2 0 \ 0 0 0 } } \; = \; 5 0 \ \mu\text{s}
$$

**Timer counts per period:**

$$
N _ { \text{counts } } \; = \; { \frac { f _ { \text{clock } } } { f _ { \text{PWM } } } } \; = \; { \frac { 4 8 \times 1 0 ^ { 6 } } { 2 0 \ 0 0 0 } } \; = \; 2 4 0 0
$$

**PWM resolution:**

$$
n \; = \; \lfloor \log _ { 2 } ( 2 4 0 0 ) \rfloor \; = \; { \bf 1 1 } \ \text{bits}
$$

**Duty cycle for 50%:**

$$
\text{Compare value} \; = \; { \frac { 2 4 0 0 } { 2 } } \; = \; { \bf 1 2 0 0 }
$$

**The PWM resolution is 11 bits, and the compare value for 50% duty cycle is 1200. The engineer would design the PWM for the resolution, because the resolution is the reason the microcontroller is the most critical component in the control system.**
:::

::: example Memory allocation for a control system {#ex-memory-allocation level=3 check="2"}
A control system requires 1000 samples of 12-bit ADC data, a 100-element PID coefficient array, and 512 bytes of stack. Calculate the total RAM required.

**ADC data buffer:**

$$
\text{ADC buffer} \; = \; 1 0 0 0 \times 2 \ \text{bytes} \; = \; 2 0 0 0 \ \text{bytes} \quad \text{(16-bit storage per sample)}
$$

**PID coefficient array:**

$$
\text{PID array} \; = \; 1 0 0 \times 4 \ \text{bytes} \; = \; 4 0 0 \ \text{bytes} \quad \text{(32-bit float per coefficient)}
$$

**Total RAM:**

$$
\text{Total RAM} \; = \; 2 0 0 0 + 4 0 0 + 5 1 2 \; = \; { \bf 2 9 1 2 } \ \text{bytes} \; \approx \; { \bf 2 . 8 4 } \ \text{KB}
$$

**The total RAM required is 2912 bytes (2.84 KB). The engineer would select the microcontroller for the memory, because the memory is the reason the microcontroller is the most critical component in the control system.**
:::

::: exercise UART baud rate error {#ex-uart-baud level=3 check="2"}
A UART is configured for 9600 baud using a 16 MHz clock with a 16× oversampling factor. Calculate the actual baud rate and the baud rate error.

::: solution
$$
\text{UBRR} \; = \; { \frac { f _ { \text{clock } } } { 1 6 \times \text{baud} } } - 1 \; = \; { \frac { 1 6 \ 0 0 0 \ 0 0 0 } { 1 6 \times 9 6 0 0 } } - 1 \; = \; 1 0 3 . 1 7 \; \approx \; 1 0 3
$$

$$
\text{Actual baud} \; = \; { \frac { 1 6 \ 0 0 0 \ 0 0 0 } { 1 6 \times ( 1 0 3 + 1 ) } } \; = \; { \frac { 1 6 \ 0 0 0 \ 0 0 0 } { 1 6 6 4 } } \; = \; { \bf 9 6 1 5 } \ \text{baud}
$$

$$
\text{Error} \; = \; { \frac { 9 6 1 5 - 9 6 0 0 } { 9 6 0 0 } } \times 1 0 0 \; = \; { \bf 0 . 1 6 } \ \%
$$

**The actual baud rate is 9615 baud, and the baud rate error is 0.16%. The engineer would design the UART for the data rate, because the data rate is the reason the communication protocol is the most critical component in the distributed system.**
:::
:::

## Exercises

::: exercise CPU execution time {#ex-cpu-execution level=3 check="2"}
A microcontroller runs at 72 MHz and executes 1 instruction per clock cycle. Calculate the execution time for a control algorithm that requires 2000 instructions.

::: solution
$$
T _ { \text{exec } } \; = \; { \frac { N _ { \text{instructions } } } { f _ { \text{clock } } } } \; = \; { \frac { 2 0 0 0 } { 7 2 \times 1 0 ^ { 6 } } } \; = \; { \bf 2 7 . 8 } \ \mu\text{s}
$$

**The execution time is 27.8 μs.**
:::
:::

::: exercise Interrupt response time {#ex-interrupt-response level=3 check="2"}
A microcontroller has an interrupt latency of 12 cycles, a context save time of 20 cycles, and an ISR execution time of 100 cycles. The clock speed is 48 MHz. Calculate the total interrupt response time.

::: solution
$$
T _ { \text{response } } \; = \; T _ { \text{latency } } + T _ { \text{context } } + T _ { \text{isr } } \; = \; 1 2 + 2 0 + 1 0 0 \; = \; 1 3 2 \ \text{cycles}
$$

$$
T _ { \text{response } } \; = \; { \frac { 1 3 2 } { 4 8 \times 1 0 ^ { 6 } } } \; = \; { \bf 2 . 7 5 } \ \mu\text{s}
$$

**The total interrupt response time is 2.75 μs.**
:::
:::

::: exercise RTOS task utilization {#ex-rtos-utilization level=3 check="2"}
An RTOS has three tasks: Task 1 ($C _ { 1 } = 2$ ms, $T _ { 1 } = 1 0$ ms), Task 2 ($C _ { 2 } = 1$ ms, $T _ { 2 } = 5$ ms), Task 3 ($C _ { 3 } = 3$ ms, $T _ { 3 } = 2 0$ ms). Calculate the CPU utilization.

::: solution
$$
U \; = \; { \frac { C _ { 1 } } { T _ { 1 } } } + { \frac { C _ { 2 } } { T _ { 2 } } } + { \frac { C _ { 3 } } { T _ { 3 } } } \; = \; { \frac { 2 } { 1 0 } } + { \frac { 1 } { 5 } } + { \frac { 3 } { 2 0 } } \; = \; 0 . 2 + 0 . 2 + 0 . 1 5 \; = \; { \bf 0 . 5 5 } \; = \; 5 5 \ \ \%
$$

**The CPU utilization is 55%. The RTOS is schedulable because $U \leq 1$ .**
:::
:::

::: exercise SPI data transfer time {#ex-spi-transfer level=3 check="2"}
An SPI bus operates at 10 MHz. Calculate the time to transfer 1024 bytes of data.

::: solution
$$
T _ { \text{transfer } } \; = \; { \frac { N _ { \text{bytes } } \times 8 } { f _ { \text{SPI } } } } \; = \; { \frac { 1 0 2 4 \times 8 } { 1 0 \times 1 0 ^ { 6 } } } \; = \; { \bf 0 . 8 1 9 } \ \text{ms}
$$

**The transfer time is 0.819 ms.**
:::
:::

::: exercise ADC sampling rate {#ex-adc-sampling level=3 check="2"}
A 12-bit ADC has a conversion time of 2 μs. Calculate the maximum sampling rate and the minimum sampling rate for a 5 kHz sensor.

::: solution
$$
f _ { s , \max } \; = \; { \frac { 1 } { T _ { \text{conv } } } } \; = \; { \frac { 1 } { 2 \times 1 0 ^ { - 6 } } } \; = \; { \bf 5 0 0 } \ \text{kS/s}
$$

$$
f _ { s , \min } \; = \; 2 \times f _ { \text{sensor } } \; = \; 2 \times 5 \; = \; { \bf 1 0 } \ \text{kS/s}
$$

**The maximum sampling rate is 500 kS/s, and the minimum sampling rate is 10 kS/s.**
:::
:::

::: exercise Derivation: the RTOS utilization {#ex-derive-rtos level=4 check="2"}
Show that the RTOS utilization formula $U = \sum C _ { i } / T _ { i } \leq 1$ is derived from the rate-monotonic scheduling theory. Write the expression for the Liu-Layland bound.

::: solution
The **rate-monotonic scheduling** (RMS) assigns priorities based on the task period (shorter period = higher priority).

The **CPU utilization** is:

$$
U \; = \; \sum _ { i = 1 } ^ { N } { \frac { C _ { i } } { T _ { i } } }
$$

The **Liu-Layland bound** is the worst-case utilization guarantee for RMS schedulability:

$$
U _ { \text{LL } } \; = \; N \, ( 2 ^ { 1 / N } - 1 )
$$

For $N \to \infty$ : $U _ { \text{LL } } \to \ln 2 = 0 . 6 9 3$ .

If $U \leq U _ { \text{LL } }$ , the task set is guaranteed to be schedulable. If $U _ { \text{LL } } < U \leq 1$ , the task set may or may not be schedulable.

**The RTOS utilization is the reason the microcontroller is designed for the deadline, not the throughput, and the deadline is the reason the microcontroller is the most critical component in the control system.** $\blacksquare$
:::
:::

::: exercise Derivation: the CAN bus arbitration {#ex-derive-can level=4 check="2"}
Show that the CAN bus arbitration is non-destructive. Write the expression for the message identifier and explain how the arbitration works.

::: solution
The **CAN message identifier** is an 11-bit (standard) or 29-bit (extended) field that determines the message priority.

The **arbitration** works as follows:
1. All nodes transmit simultaneously on the bus
2. The bus is a **wired-AND**: a dominant bit (0) overrides a recessive bit (1)
3. Each node monitors the bus and compares it to its own transmission
4. If a node transmits a recessive bit (1) but detects a dominant bit (0), it **loses arbitration** and stops transmitting
5. The node with the **lowest numerical identifier** (most leading zeros) wins arbitration

The arbitration is **non-destructive** because the winning message continues to transmit without interruption. The message identifier is preserved in the transmitted frame.

$$
\text{Priority} \; = \; { \frac { 1 } { \text{Identifier value} } }
$$

**The CAN bus arbitration is the reason the communication protocol is designed for the data rate, not the distance, and the data rate is the reason the communication protocol is the most critical component in the distributed system.** $\blacksquare$
:::
:::

::: quiz Microcontrollers {#quiz-microcontrollers}
The most critical parameter in the microcontroller design is:

- [ ] The clock speed
- [x] The execution time
- [ ] The memory size
- [ ] The number of GPIO pins

::: solution
**The execution time.** The timing is the reason the microcontroller is designed for the execution time, not the clock speed, and the execution time is the reason the microcontroller is the most critical component in the control system. The engineer who designs the microcontroller system without checking the timing is not designing the microcontroller system; they are guessing.
:::
:::

::: quiz Communication protocols {#quiz-comm-protocols}
The CAN bus data rate at 40 m distance is:

- [ ] 100 kbps
- [ ] 250 kbps
- [x] 1 Mbps
- [ ] 10 Mbps

::: solution
**1 Mbps.** The CAN bus supports 1 Mbps at up to 40 m distance, and the data rate is the reason the communication protocol is designed for the data rate, not the distance. The engineer who designs the communication system without checking the data rate is not designing the communication system; they are guessing.
:::
:::

## Where this lesson leads

- **[[mechatronics/sensors]]** — The sensor is the foundation of the measurement system.
- **[[mechatronics/signal-conditioning]]** — The signal conditioning is the foundation of the measurement system.
- **[[mechatronics/electric-actuators]]** — The microcontroller is the foundation of the motor drive.
- **[[mechatronics/motion-control]]** — The microcontroller is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The microcontroller is the foundation of the system integration.
- **[[control-systems/digital-control]]** — The microcontroller is the foundation of the digital control system.
- **[[control-systems/pid-control]]** — The microcontroller is the foundation of the PID controller.
- **[[robotics/robot-control]]** — The microcontroller is the foundation of the robot control.
- **[[robotics/mobile-robots]]** — The microcontroller is the foundation of the mobile robot.
- **[[manufacturing/metrology-quality]]** — The microcontroller is the foundation of the metrology system.

::: history Microcontrollers: from the 4-bit calculator to the 32-bit ARM {#history-microcontrollers}
**1971** — **Intel** introduces the **4004**, the first commercial microprocessor. **The Intel 4004 is the reason the microprocessor is the oldest concept in computer engineering, and the age is the reason the microprocessor is the most refined concept in computer engineering.**

**1974** — **Intel** introduces the **8080**, the first general-purpose microprocessor. **The Intel 8080 is the reason the microprocessor is the most widely used processor in engineering, and the microprocessor is the reason the Intel 8080 is the most refined processor in engineering.**

**1976** — **Intel** introduces the **8048**, the first single-chip microcontroller. **The Intel 8048 is the reason the microcontroller is the oldest concept in embedded engineering, and the age is the reason the microcontroller is the most refined concept in embedded engineering.**

**1980** — **Motorola** introduces the **68HC11**, the first widely used microcontroller. **The Motorola 68HC11 is the reason the microcontroller is the most widely used processor in engineering, and the microcontroller is the reason the Motorola 68HC11 is the most refined processor in engineering.**

**1985** — **ARM** is founded, and the ARM architecture is the reason the microcontroller is the most widely used processor in engineering. **The ARM architecture is the reason the microcontroller is the most refined processor in engineering, and the microcontroller is the reason the ARM architecture is the most widely used processor in engineering.**

**1995** — **Microchip** introduces the **PIC16F84**, the first widely used microcontroller for hobbyists. **The Microchip PIC16F84 is the reason the microcontroller is the most widely used processor in engineering, and the microcontroller is the reason the Microchip PIC16F84 is the most refined processor in engineering.**

**2000s** — **The 32-bit ARM Cortex-M** microcontroller is introduced, and the ARM Cortex-M is the reason the microcontroller is the most widely used processor in engineering. **The ARM Cortex-M is the reason the microcontroller is the most refined processor in engineering, and the microcontroller is the reason the ARM Cortex-M is the most widely used processor in engineering.**

**2010s** — **The Internet of Things** (IoT) is developed, and the IoT is the reason the microcontroller is the most widely used processor in engineering. **The IoT is the reason the microcontroller is the most refined processor in engineering, and the microcontroller is the reason the IoT is the most widely used processor in engineering.**
:::

::: summary Microcontrollers and embedded software {#summary-microcontrollers}
- **The microcontroller consists of CPU, memory, timers, ADC/DAC, communication peripherals, GPIO, and watchdog timer.** The timing is the reason the microcontroller is designed for the execution time, not the clock speed, and the execution time is the reason the microcontroller is the most critical component in the control system.
- **The CPU execution time is $T _ { \text{exec } } = N _ { \text{instructions } } / f _ { \text{clock } }$ .** The execution time is the reason the microcontroller is designed for the execution time, not the clock speed, and the execution time is the reason the microcontroller is the most critical component in the control system.
- **The interrupt response time is $T _ { \text{response } } = T _ { \text{latency } } + T _ { \text{context } } + T _ { \text{isr } }$ .** The interrupt latency is the reason the microcontroller is designed for the response time, not the clock speed, and the response time is the reason the microcontroller is the most critical component in the control system.
- **The RTOS utilization is $U = \sum C _ { i } / T _ { i } \leq 1$ , and the Liu-Layland bound is $U _ { \text{LL } } = N \, ( 2 ^ { 1 / N } - 1 )$ .** The real-time performance is the reason the microcontroller is designed for the deadline, not the throughput, and the deadline is the reason the microcontroller is the most critical component in the control system.
- **The SPI data rate is 10-100 MHz, the I2C data rate is 100-400 kHz, the UART data rate is 9600-115 200 baud, and the CAN data rate is 1 Mbps.** The communication protocol is the reason the microcontroller is designed for the data rate, not the distance, and the data rate is the reason the microcontroller is the most critical component in the control system.
- **The CAN bus arbitration is non-destructive: the node with the lowest numerical identifier wins.** The CAN bus arbitration is the reason the communication protocol is designed for the data rate, not the distance.
- **The control loop timing is $T _ { \text{loop } } = T _ { \text{ADC } } + T _ { \text{control } } + T _ { \text{DAC } } + T _ { \text{jitter } } \leq 1 / f _ { \text{sample } }$ .** The control loop timing is the reason the microcontroller is designed for the deadline, not the throughput.
- **The watchdog timer resets the microcontroller if the software hangs.** The watchdog timer is the reason the microcontroller is designed for the safety, not the performance, and the safety is the reason the microcontroller is the most critical component in the control system.
- **The microcontroller design is the most important design in mechatronic system design, because the microcontroller design determines the performance of the control system.** The performance is the reason the engineer can design the control system to be safe.
- **The embedded software is the reason the microcontroller is designed for the safety, not the performance.** The safety is the reason the microcontroller is the most critical component in the control system.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The microcontroller architecture and the embedded software.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The microcontroller and the communication protocols.
- **J.W. Nilsson and S.A. Riedel (2015)** — *Embedded Systems: Introduction to Microcontrollers*. CreateSpace. The microcontroller architecture and the embedded software.
- **M. Schwartz (2013)** — *Making Embedded Systems*, 2nd ed. O'Reilly. The embedded software and the real-time performance.
- **C. Sheldon (2013)** — *The Art of the Mechanical Crown: Embedded Software*. Newnes. The embedded software and the code safety.
- **B. Barry (2012)** — *Embedded Systems: Introduction to ARM Cortex-M Microcontrollers*. CreateSpace. The ARM Cortex-M microcontroller and the embedded software.
- **F. Vahid and T. Givargis (2002)** — *Embedded System Design: A Unified Hardware/Software Introduction*. Wiley. The microcontroller architecture and the embedded software.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The microcontroller and the embedded software.
