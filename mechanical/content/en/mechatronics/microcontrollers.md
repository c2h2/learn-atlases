The controller in almost every mechatronic product is a **microcontroller**: a complete small computer — processor, program memory, data memory and a collection of peripherals for timing, input and output — on a single chip costing from a few tens of cents to a few euros. It reads switches and converters, counts encoder pulses, computes control laws and drives transistors with pulse-width-modulated signals, all under the control of a program that must not only compute the right answers but compute them *on time*. A control loop that runs late is, in effect, a loop with extra delay, and delay is what destabilises feedback systems.

This chapter is written for the engineer who has to specify a controller and work with the person who programs it — or program it themselves. It covers the architecture of a microcontroller, how numbers are represented, digital input and output, timers and pulse-width modulation, interrupts, real-time scheduling, the implementation of a digital PID controller, and serial communication. The theory of sampled-data control is in [[control-systems/digital-control]]; here we deal with what happens inside the chip.

## Architecture {#sec-architecture}

::: definition Microcontroller {#def-mcu}
A **microcontroller** (MCU) integrates on one chip:
1. a **central processing unit** (CPU) that fetches and executes instructions, with a word length of 8, 16 or 32 bits and a clock of a few megahertz to several hundred megahertz;
2. non-volatile **program memory** (flash, typically $16\ \mathrm{kB}$ to a few MB), which keeps the program without power;
3. volatile **data memory** (SRAM, typically $2\ \mathrm{kB}$ to $1\ \mathrm{MB}$) for variables and the stack;
4. **peripherals**: general-purpose input/output pins (GPIO), timers/counters with capture, compare and PWM functions, analogue-to-digital (and sometimes digital-to-analogue) converters, encoder interfaces, serial interfaces (UART, SPI, I²C, CAN, USB, Ethernet), a watchdog timer and a direct-memory-access (DMA) controller that moves data between peripherals and memory without the CPU;
5. an **interrupt controller** that lets peripheral events suspend the running program and start a handler.
:::

A **microprocessor**, by contrast, is a CPU that needs external memory and peripherals; a desktop computer or a single-board Linux computer is built around one. Microcontrollers trade raw speed for integration, low power, deterministic timing and robustness, which is what embedded control needs. Most are **Harvard** machines internally, with separate buses for instructions and data so that both can be fetched in one cycle. Current 32-bit microcontrollers are dominated by cores based on ARM's Cortex-M family; 8-bit parts (AVR, PIC, 8051 derivatives) remain common in simple, cost-sensitive products, and RISC-V cores are increasingly used. Some cores include a hardware **floating-point unit** (FPU), which matters greatly for control code (see below).

The peripherals are controlled by **registers**: memory locations whose bits configure the hardware (set a pin as output, select a timer's clock) or reflect its state (a conversion is complete, a byte has arrived). The program writes and reads them like variables. Vendors supply libraries that wrap register access in functions, but understanding the registers is what allows one to read the data sheet and know what the hardware can do.

## Numbers in a microcontroller {#sec-numbers}

Integers are stored in binary words of $n$ bits. **Unsigned** integers cover $0$ to $2^n - 1$; **signed** integers in **two's complement** cover $-2^{n-1}$ to $2^{n-1} - 1$, the negative of $x$ being formed by inverting all bits and adding one. Arithmetic is modulo $2^n$: adding $1$ to the largest value wraps round to the smallest. This **overflow** is silent — there is no error — and is behind a large share of embedded-control bugs.

Real numbers can be represented in **floating point** (IEEE 754 single precision: 24-bit mantissa, about seven significant digits) or in **fixed point**.

::: definition Fixed-point (Q) format {#def-q-format}
In the **Q$m$.$f$** format, a signed integer word $n$ represents the real number $x = n/2^f$, where $f$ bits are fractional and $m$ bits (plus the sign) are integer. The widely used **Q15** format stores numbers in $[-1, 1)$ in a 16-bit word: $x = n/32\,768$, resolution $2^{-15} \approx 3.05\times10^{-5}$. Addition of two numbers in the same format is integer addition; the product of two Q15 numbers is a Q30 number in a 32-bit word, converted back to Q15 by an arithmetic right shift of 15 bits.
:::

Fixed point is fast on cores without an FPU, but the programmer must track the scaling of every variable and guard against overflow, usually with **saturating** arithmetic that clamps results to the representable range instead of wrapping. On cores with an FPU, single-precision floating point is now the usual choice for control laws; it removes most scaling errors, though it brings its own: adding a small increment to a large accumulator (an integrator after a long run, or time in seconds since power-up) loses the increment once the ratio exceeds about $10^7$.

::: example Fixed-point arithmetic and overflow {#ex-q15}
In Q15, compute (a) $0.5 \times 0.25$ and (b) $0.75 + 0.5$, showing the integers involved, and explain what saturation does in (b).
::: solution
(a) $0.5 \to 16\,384$, $0.25 \to 8192$. Integer product $16\,384 \times 8192 = 134\,217\,728$ (a Q30 value, which needs 32 bits). Shift right by 15: $134\,217\,728/32\,768 = 4096$, which represents $4096/32\,768 = 0.125$. Correct.

(b) $0.75 \to 24\,576$, $0.5 \to 16\,384$, sum $40\,960$, which exceeds the largest 16-bit signed value $32\,767$. In two's complement it wraps to $40\,960 - 65\,536 = -24\,576$, which represents $-0.75$: the sum of two positive numbers has become negative. A control output that does this slams an actuator from nearly full positive to large negative. Saturating addition returns $32\,767$ ($\approx 0.99997$) instead — wrong, but in the right direction and bounded.

Sanity check: the true result $1.25$ is outside the Q15 range $[-1, 1)$, so no Q15 answer can be correct; the design fix is to choose a format with integer bits for this variable (e.g. Q2.13), which a scaling analysis of the signal ranges would have shown.
:::
:::

Wraparound is not always an enemy. Hardware counters — encoder counters, free-running timers — wrap continuously, and the *difference* of two readings taken in unsigned modulo arithmetic is correct as long as fewer than $2^n$ counts occurred between them. If a 16-bit encoder counter reads $65\,530$ and then $4$, the motion is $(4 - 65\,530) \bmod 65\,536 = 10$ counts forward. Storing the difference in a signed 16-bit variable gives the direction too, provided fewer than $32\,768$ counts pass between readings.

## Digital input and output {#sec-gpio}

A GPIO pin configured as an **output** is driven to the supply voltage (logic 1, e.g. $3.3\ \mathrm{V}$) or to ground (logic 0) by a pair of transistors, and can source or sink a few milliamperes — enough for an LED or a transistor gate, never a motor, relay or solenoid ([[mechatronics/mechatronic-systems#prop-flyback]]). In **open-drain** mode only the low-side transistor is used, so that several outputs can share a line pulled up by a resistor (as in I²C). A pin configured as an **input** reads the voltage as 1 above a threshold (typically $0.7V_{DD}$) and as 0 below another ($0.3V_{DD}$); between them the reading is undefined, and an input left unconnected floats and reads at random, so inputs from switches use **pull-up** or **pull-down** resistors (often built in).

Mechanical switches **bounce**: the contacts close and reopen several times over a few milliseconds before settling. A program that counts edges counts each bounce. Debouncing is done in hardware with an RC filter and a Schmitt-trigger input, or in software by accepting a new state only after it has been stable for a few successive readings taken every millisecond or so.

Inputs from the machine (limit switches, proximity sensors at $24\ \mathrm{V}$ in industrial practice) are never connected directly: they pass through dividers, clamps or — preferably — **optocouplers**, which transmit the signal as light across an insulating barrier and so protect the microcontroller from the noisy and occasionally destructive voltages of the field wiring.

## Timers and pulse-width modulation {#sec-timers}

A **timer** is a counter incremented by a clock. Its clock is the peripheral clock $f_{\text{clk}}$ divided by a **prescaler** $P + 1$; the counter counts from $0$ up to a value $A$ held in the **auto-reload** register and then restarts at $0$, generating an **update event** (which can trigger an interrupt or an ADC conversion). A **compare** register $C$ makes an output pin change state when the counter passes $C$; a **capture** register records the counter value when an input pin changes, which is how pulse periods and widths are measured.

::: proposition Timer period and PWM {#prop-timer}
A timer with clock $f_{\text{clk}}$, prescaler setting $P$ and auto-reload value $A$ produces update events at the frequency
$$
f_{\text{upd}} = \frac{f_{\text{clk}}}{(P + 1)(A + 1)} .
$$ {#eq-timer}
In edge-aligned PWM mode, with the output high while the counter is below the compare value $C$, the output is a rectangular wave of frequency $f_{\text{upd}}$ and duty cycle $D = C/(A + 1)$, adjustable in $A + 1$ steps. Applied to a load through a switch from a supply $V_s$, it gives an average voltage
$$
\bar v = DV_s .
$$ {#eq-pwm-average}
:::

::: proof
The counter advances once every $(P + 1)$ clock cycles and passes through the $A + 1$ values $0, 1, \dots, A$ before restarting, so one period lasts $(P + 1)(A + 1)/f_{\text{clk}}$, which is [[#eq-timer]]. The output is high for the $C$ counter values $0, \dots, C - 1$ out of $A + 1$, hence $D = C/(A + 1)$, and $C$ can take the integer values $0$ to $A + 1$. The average of a waveform equal to $V_s$ for a time $DT$ and $0$ for $(1 - D)T$ is $\frac1T\int_0^T v\,\mathrm{d}t = \frac1T V_sDT = DV_s$.
:::

**PWM** is how a digital controller produces an "analogue" output with high efficiency. The switch is either fully on (small voltage across it) or fully off (no current), so it dissipates little power; the load — a motor winding, whose inductance smooths the current, or a heater, whose thermal mass smooths the temperature — responds to the average ([[mechatronics/electric-actuators]]). The design trade is between frequency and resolution: for a given clock, raising $f_{\text{PWM}}$ reduces the number of steps $A + 1$. Motor drives use $15$–$30\ \mathrm{kHz}$, above the audible range and fast compared with the winding's electrical time constant; heaters use a few hertz.

::: example Configuring a control-loop timer and a PWM output {#ex-timer}
A microcontroller's timers run from a $72\ \mathrm{MHz}$ clock. (a) Configure a timer to interrupt at exactly $1\ \mathrm{kHz}$ for a control loop. (b) Configure a PWM output at $20\ \mathrm{kHz}$ with the finest possible resolution, and give the resolution in steps and in bits. (c) What duty-cycle register value gives an average of $9.0\ \mathrm{V}$ from a $24\ \mathrm{V}$ supply?
::: solution
(a) $(P + 1)(A + 1) = 72\times10^{6}/1000 = 72\,000$. With a 16-bit auto-reload register ($A \le 65\,535$), choose $P = 71$ (timer clock $1\ \mathrm{MHz}$) and $A = 999$.

(b) Finest resolution means $P = 0$: $A + 1 = 72\times10^{6}/20\,000 = 3600$, so $A = 3599$; $3600$ duty steps, $\log_2 3600 = 11.8$ bits, a step of $1/3600 = 0.028\,\%$.

(c) $D = 9.0/24 = 0.375$, $C = 0.375 \times 3600 = 1350$.

Sanity check: the $1\ \mathrm{ms}$ loop period contains $20$ PWM periods, so the loop's output changes are smooth compared with the PWM, as they should be. Some timers offer centre-aligned PWM (counting up and down), which halves the frequency for the same $A$ but places the pulse centre at a fixed point in the period, convenient for sampling motor current mid-pulse.
:::
:::

::: widget plot
title: Pulse-width modulation
f: if(mod(x, 1) < D, 1, 0); D
x: 0, 4
y: -0.1, 1.2
sliders: D=0.375:0:1:0.025
labels: v/V_s; \bar v/V_s
caption: Four periods of an edge-aligned PWM output (normalised by the supply, against time in PWM periods) and its average $DV_s$. Move the duty cycle $D$: the average follows linearly from $0$ to $1$. An inductive or thermal load filters out the switching and responds to the average — but only if the PWM period is short compared with the load's time constant.
:::

## Interrupts and real-time operation {#sec-realtime}

A program can find out about an event by **polling** (checking a flag repeatedly in a loop) or by **interrupt**: the peripheral signals the interrupt controller, the CPU finishes its current instruction, saves its state, and runs an **interrupt service routine** (ISR), returning afterwards to where it was. The time from the event to the first instruction of the ISR is the **interrupt latency** — a dozen clock cycles on a Cortex-M core, i.e. well under a microsecond, if no higher-priority interrupt is running. Interrupts have priorities, and a higher-priority interrupt may pre-empt a lower one.

The standard structure of a small motion controller is therefore: a timer interrupt at the control rate (the highest-priority software task) reads the sensors, computes the control law and writes the outputs; lower-priority interrupts handle communication; and the main loop handles everything that is not time-critical (user interface, logging, diagnostics). Two rules keep it working. ISRs must be short — compute and leave — and variables shared between an ISR and the main loop must be declared `volatile` and accessed in a way that cannot be interrupted half-way (an atomic access or a brief critical section with interrupts disabled), or the main loop may read a value that is half old and half new.

::: definition Periodic tasks, utilisation and jitter {#def-utilisation}
A **periodic task** $i$ is released every $T_i$ seconds and needs at most $C_i$ seconds of processor time (its **worst-case execution time**) to complete, by the deadline $T_i$. The processor **utilisation** of a set of $n$ tasks is
$$
U = \sum_{i=1}^{n}\frac{C_i}{T_i} .
$$ {#eq-utilisation}
**Jitter** is the variation of the actual start (or output) time of a task from its ideal periodic schedule.
:::

::: proposition Necessary condition for schedulability {#prop-utilisation}
No scheduling policy on a single processor can meet all deadlines of a set of periodic tasks with $U > 1$.
:::

::: proof
Consider the interval $[0, L]$ with $L$ the least common multiple of the periods (assume rational periods). Task $i$ is released $L/T_i$ times in it and needs $C_i$ each time, a total demand of $\sum_i (L/T_i)C_i = LU$. Every job released in $[0, L]$ has its deadline at or before $L$, so all this work must be done within $[0, L]$, in which the processor can supply at most $L$ seconds of execution. If $U > 1$ the demand exceeds the supply and some deadline is missed.
:::

The converse is not true for every policy. Under **rate-monotonic** scheduling — fixed priorities, the shortest period getting the highest priority, which is what one obtains naturally by giving the fastest interrupt the highest priority — Liu and Layland (1973) proved that a set of $n$ independent periodic tasks with deadlines equal to their periods always meets its deadlines if
$$
U \le n\left(2^{1/n} - 1\right),
$$ {#eq-liu-layland}
a bound that is $1$ for one task, $0.828$ for two, $0.780$ for three, and tends to $\ln 2 = 0.693$ for many. Above the bound a task set may still be schedulable, which can be checked by computing each task's worst-case response time. In practice designers keep the utilisation well below the bound to leave margin for the inevitable underestimates of execution time.

::: example Checking a task set {#ex-rms}
A motor controller has three periodic tasks: current control every $0.1\ \mathrm{ms}$ taking up to $25\ \mathrm{\mu s}$; position and speed control every $1\ \mathrm{ms}$ taking up to $200\ \mathrm{\mu s}$; and communication every $10\ \mathrm{ms}$ taking up to $1\ \mathrm{ms}$. Is the set schedulable under rate-monotonic priorities by the Liu–Layland test?
::: solution
$U = 25/100 + 200/1000 + 1/10 = 0.25 + 0.20 + 0.10 = 0.55$. The bound for three tasks is $3(2^{1/3} - 1) = 0.780$. Since $0.55 \le 0.780$, all deadlines are met. The current loop runs at the highest priority, the position loop next, communication last.

Sanity check: the slowest task's worst case can be estimated directly. In $10\ \mathrm{ms}$ the two faster tasks consume $100 \times 25\ \mathrm{\mu s} + 10 \times 200\ \mathrm{\mu s} = 4.5\ \mathrm{ms}$, leaving $5.5\ \mathrm{ms}$ for the $1\ \mathrm{ms}$ communication task — ample. The position task, pre-empted by the current task, sees its $200\ \mathrm{\mu s}$ stretched by about a quarter to roughly $275\ \mathrm{\mu s}$, which appears as output jitter within its period: the reason fast loops write their outputs at a fixed time (for example at the next timer event) rather than whenever the computation happens to finish.
:::
:::

## Implementing a digital controller {#sec-digital-pid}

A continuous PID controller $u = K_pe + K_i\int e\,\mathrm{d}t + K_d\,\mathrm{d}e/\mathrm{d}t$ ([[control-systems/pid-control]]) is implemented at sample instants $t_k = kT$ by approximating the integral by a running sum and the derivative by a difference:
$$
I_k = I_{k-1} + K_iT\,e_k,\qquad u_k = K_pe_k + I_k - \frac{K_d}{T}\left(y_k - y_{k-1}\right).
$$ {#eq-discrete-pid}
Three details separate a working implementation from a textbook formula.

1. **Derivative on the measurement.** The derivative term acts on $-y$ rather than on $e = r - y$, so that a step in the reference does not produce a huge spike ("derivative kick"); and it is low-pass filtered, because differencing a quantised, noisy signal amplifies noise by about $1/T$.
2. **Anti-windup.** When the actuator saturates (the PWM is at $100\,\%$), the error persists and the integrator keeps growing; when the error finally reverses, the oversized integral holds the actuator saturated long after it should have released, producing a large overshoot. The simplest cure is to stop integrating (or clamp $I_k$) whenever the output is saturated in the direction that would increase saturation.
3. **Timing.** The sampling and output instants must be regular. A sampled loop behaves approximately like a continuous one with an added delay: the zero-order hold contributes about $T/2$, and the computation, if outputs are written at the next sampling instant, a further $T$. At the crossover frequency $\omega_c$ a delay $\tau_d$ removes $\omega_c\tau_d$ radians of phase margin.

::: example Two steps of a digital PI controller {#ex-pi-steps}
A PI speed controller has $K_p = 2.0\ \mathrm{V\,s/rad}$, $K_i = 10\ \mathrm{V/rad}$ and $T = 10\ \mathrm{ms}$, with $I_{-1} = 0$. The speed errors at the first two samples are $e_0 = 1.0$ and $e_1 = 0.8\ \mathrm{rad/s}$. Compute $u_0$ and $u_1$. Then estimate the phase lost at a crossover frequency of $40\ \mathrm{Hz}$ in a loop sampled at $1\ \mathrm{kHz}$ whose outputs are written one sample after the measurement.
::: solution
$K_iT = 0.10\ \mathrm{V\,s/rad}$. Step 0: $I_0 = 0 + 0.10 \times 1.0 = 0.10\ \mathrm{V}$, $u_0 = 2.0 \times 1.0 + 0.10 = 2.10\ \mathrm{V}$. Step 1: $I_1 = 0.10 + 0.10 \times 0.8 = 0.18\ \mathrm{V}$, $u_1 = 2.0 \times 0.8 + 0.18 = 1.78\ \mathrm{V}$.

Delay: hold $T/2$ plus one sample of computation, $1.5T = 1.5\ \mathrm{ms}$. Phase lost $= 360° \times f_c \times \tau_d = 360 \times 40 \times 0.0015 = 21.6°$, of which the hold accounts for $7.2°$ and the computation delay $14.4°$.

Sanity check: a typical phase margin is $45°$–$60°$; losing $22°$ is serious, which is why fast loops are sampled at many times the crossover frequency and why computing the output immediately after sampling (rather than a full period later) is worth the effort.
:::
:::

::: widget plot
title: Quantisation by an n-bit converter
f: floor(x*2^n + 0.5)/2^n; x
x: 0, 1
y: 0, 1.05
sliders: n=3:1:8:1
labels: \text{quantised}; \text{input}
caption: Ideal rounding of an input in $[0, 1)$ of full scale to $n$ bits. The staircase has $2^n$ steps, and its distance from the diagonal — the quantisation error — never exceeds half a step. Every digital controller sees its sensors through such a staircase (ADC or encoder) and drives its actuators through another (the PWM register), and a controller with integral action will hunt between two steps if the quantity it regulates lies between them.
:::

::: warning Floating-point time, integer overflow and blocking code
Three bugs recur in embedded control code. (1) Keeping time as a single-precision `float` in seconds: after about $4.6$ hours ($2^{14}\ \mathrm{s}$) the float's resolution exceeds $1\ \mathrm{ms}$, and a $1\ \mathrm{ms}$ time step added to it is rounded — derivative and integral terms computed from time differences go wrong. Count ticks in an unsigned integer and take differences instead. (2) Integer overflow in intermediate results: the product of two 16-bit values needs 32 bits, and a 32-bit microsecond counter wraps after about $71.6$ minutes; use wide enough types and modulo differences. (3) Blocking calls — waiting in a loop for a serial transmission or a delay function — inside an ISR or a control task; the loop's timing then depends on everything else the program does. Measure the real execution time and jitter (toggle a pin at the start and end of the task and look at it with an oscilloscope) rather than assuming them.
:::

## Communication {#sec-comms}

Microcontrollers talk to sensors, drives and each other over serial links:

- **UART** (asynchronous serial): start bit, $8$ data bits, stop bit — $10$ bit times per byte; at $115\,200\ \mathrm{bit/s}$ a byte takes $86.8\ \mathrm{\mu s}$. Point-to-point; RS-232 and RS-485 define the voltages and, for RS-485, a differential multi-drop bus used in industry (for example with the Modbus protocol).
- **SPI**: synchronous, a clock, data in, data out and a chip-select line per device; tens of megabits per second over short distances on a circuit board — the usual link to fast ADCs, encoders and drivers.
- **I²C**: two open-drain wires (clock and data) with addressed devices; $100\ \mathrm{kbit/s}$–$1\ \mathrm{Mbit/s}$; for slow on-board sensors and memories.
- **CAN** (controller area network): a differential two-wire bus with message priorities resolved bit by bit (the lowest identifier wins without destroying the other message), built-in error detection and automatic retransmission; up to $1\ \mathrm{Mbit/s}$ in its classic form (higher in CAN FD). It is the standard network of vehicles and many machines. A classic frame carrying $8$ data bytes is about $110$ bits long, so a $1\ \mathrm{Mbit/s}$ bus carries roughly $9000$ such frames per second.
- **Industrial Ethernet** variants (EtherCAT, PROFINET, Ethernet/IP) provide synchronised, deterministic communication between controllers and drives at cycle times down to tens of microseconds.

The choice is governed by distance, noise, the data rate and — for control — the **latency and determinism** of the link: a feedback loop closed over a network inherits the network's delay and its jitter.

::: quiz
A control task runs at $5\ \mathrm{kHz}$, and its interrupt service routine takes $60\ \mathrm{\mu s}$. What fraction of the processor does it use?
- [ ] $6\,\%$
- [ ] $12\,\%$
- [x] $30\,\%$
- [ ] $60\,\%$
::: solution
The period is $200\ \mathrm{\mu s}$, so $U = 60/200 = 0.30$. Doubling the loop rate would take $60\,\%$ — control rate and processor capacity are directly traded against each other, unless the code is made faster (an FPU, fixed-point arithmetic, DMA for data transfers).
:::
:::

::: history
The Intel 4004 of 1971, designed for a Busicom calculator by Federico Faggin, Ted Hoff, Stanley Mazor and Masatoshi Shima, put a 4-bit CPU on one chip but needed separate memory and I/O chips. At Texas Instruments, Gary Boone and Michael Cochran designed a single-chip computer with on-chip memory and I/O in 1971, and TI offered it commercially as the TMS1000 family in 1974, used in calculators, toys and appliances — usually counted as the first microcontroller. Intel's 8048 (1976) and 8051 (1980) followed; the 8051 architecture is still manufactured. In 1973 C. L. Liu and James Layland published the analysis of rate-monotonic scheduling that underlies real-time operating systems. ARM's Cortex-M3 core, introduced in 2004, began the shift of embedded control to 32-bit processors with fast, deterministic interrupt handling.
:::

::: summary
- A microcontroller combines CPU, flash, SRAM and peripherals (GPIO, timers, ADC, serial, DMA, interrupts) on one chip; peripherals are configured through registers.
- Integers wrap silently on overflow; fixed-point Q formats need scaling analysis and saturation; floats lose small increments added to large values. Counter differences in modulo arithmetic are correct.
- GPIO pins drive milliamperes only; inputs need pull-ups, debouncing and, from field wiring, isolation.
- Timer frequency $f_{\text{clk}}/[(P + 1)(A + 1)]$; PWM duty $C/(A + 1)$ with average $DV_s$; frequency and resolution trade against each other.
- Utilisation $U = \sum C_i/T_i \le 1$ is necessary; rate-monotonic priorities guarantee deadlines for $U \le n(2^{1/n} - 1)$.
- Digital PID: running-sum integral with anti-windup, filtered derivative on the measurement, regular timing; sampling and computation add a delay of about $1.5T$ that costs $\omega_c\tau_d$ of phase margin.
- Serial links (UART, SPI, I²C, CAN, industrial Ethernet) are chosen by distance, noise, rate, latency and determinism.
:::

## Exercises

::: exercise Timer reload value {level=1 check="1999"}
A timer is clocked at $48\ \mathrm{MHz}$ with prescaler setting $P = 47$. Find the auto-reload value $A$ for update events at $500\ \mathrm{Hz}$. (Enter $A$.)
::: solution
$(A + 1) = 48\times10^{6}/(48 \times 500) = 2000$, so $A = 1999$.
:::
:::

::: exercise PWM steps {level=1 check="4000"}
A timer clocked at $100\ \mathrm{MHz}$ without prescaling generates $25\ \mathrm{kHz}$ PWM. How many duty-cycle steps are available? (Enter the number of steps.)
::: solution
$A + 1 = 10^{8}/25\,000 = 4000$ steps, about $12$ bits, a step of $0.025\,\%$.
:::
:::

::: exercise Average PWM voltage {level=1 check="8.4"}
A $24\ \mathrm{V}$ supply is switched to a motor with duty cycle $0.35$. Find the average voltage. (Enter it in V.)
::: solution
$\bar v = DV_s = 0.35 \times 24 = 8.4\ \mathrm{V}$.
:::
:::

::: exercise A Q15 constant {level=1 check="-12288"}
Find the 16-bit integer that represents $-0.375$ in Q15. (Enter the integer.)
::: solution
$n = -0.375 \times 32\,768 = -12\,288$. In hexadecimal two's complement this is `0xD000`.
:::
:::

::: exercise Counter wraparound {level=2 check="836"}
A 16-bit unsigned encoder counter reads $65\,000$ at one sample and $300$ at the next; the axis is known to move forward slowly. How many counts did it move? (Enter the number of counts.)
::: solution
$(300 - 65\,000) \bmod 65\,536 = 300 + 65\,536 - 65\,000 = 836$ counts. Unsigned subtraction in 16-bit arithmetic gives this directly.
:::
:::

::: exercise Interrupt load {level=2 check="24"}
An ISR taking $12\ \mathrm{\mu s}$ runs at $20\ \mathrm{kHz}$. Find the processor load. (Enter it in %.)
::: solution
Period $50\ \mathrm{\mu s}$; $U = 12/50 = 0.24 = 24\,\%$.
:::
:::

::: exercise Utilisation of a task set {level=2 check="17/30"}
Three tasks have $(C_i, T_i) = (2, 10)$, $(3, 15)$ and $(5, 30)$ milliseconds. Find their utilisation and decide whether the Liu–Layland test guarantees rate-monotonic schedulability. (Enter $U$ as an exact fraction.)
::: solution
$U = 0.2 + 0.2 + 1/6 = 17/30 = 0.567 \le 0.780$: schedulable by the sufficient test.
:::
:::

::: exercise Phase lost to the zero-order hold {level=2 check="9"}
A loop sampled every $0.5\ \mathrm{ms}$ has its crossover at $100\ \mathrm{Hz}$. Using an effective delay of $T/2$ for the zero-order hold, find the phase lag it adds at crossover. (Enter it in degrees.)
::: solution
$360° \times 100 \times 0.25\times10^{-3} = 9°$. If the output is also written one full sample after the measurement, add $18°$.
:::
:::

::: exercise Firmware for a DC motor speed controller {level=3}
Outline the firmware of a microcontroller that controls the speed of a brushed DC motor from an incremental encoder, with a PWM H-bridge, a current-sense input for protection, a CAN interface receiving speed commands, and a status LED. Specify the timers and interrupts with their rates and priorities, the data shared between them and how it is protected, the speed-measurement method, the controller and its anti-windup, and the fault handling (lost commands, over-current, encoder failure).
::: solution
A good answer: (i) Hardware PWM timer at $20\ \mathrm{kHz}$, its update event triggering the current ADC conversion mid-pulse by DMA; an over-current comparator wired to the timer's hardware break input so that the bridge is disabled without software in the loop. (ii) A control timer interrupt at $1\ \mathrm{kHz}$ (highest software priority) that reads the encoder counter, computes speed by modulo difference (with period timing at low speed, [[mechatronics/sensors#prop-speed]]), runs a PI controller with clamping anti-windup and output limits, and writes the compare register. (iii) A CAN receive interrupt (lower priority) that copies the commanded speed into a shared variable, written atomically (a 32-bit aligned word on a 32-bit core) and timestamped. (iv) The main loop handles the LED, diagnostics and a command timeout: if no command arrives within, say, $100\ \mathrm{ms}$, ramp the speed to zero. (v) Encoder failure: if the PWM is high but no counts arrive for some time, fault and disable. (vi) A watchdog timer refreshed by the control task so that a hung program resets the controller into a safe, disabled state. (vii) Utilisation and worst-case timing measured with a spare pin and an oscilloscope.
:::
:::
