A prototype that works on the bench is perhaps a fifth of an embedded product. The rest is making it work for years, unattended, on a battery or a noisy supply, in heat, cold and vibration, in the hands of people who will do things nobody expected — and being able to find out what went wrong when, despite everything, it fails. A smart meter is expected to run for fifteen years without a battery change; a pacemaker must never stop; the controller in a car must recover from a voltage dip during engine cranking without anybody noticing; a sensor on a remote pipeline must be updatable over the air without ever being bricked.

This chapter is about the engineering that turns the techniques of the earlier chapters into such products. It treats three themes. **Low-power design**: where the energy goes in a microcontroller system, how sleep modes and duty cycling reduce it by orders of magnitude, and how to compute battery life. **Reliability**: brown-out detection, watchdog timers, fault handlers, defensive programming, integrity checks and safe firmware updates, and the quantitative language of failure rates. **Testing and debugging**: how to test firmware without hardware and with it, and the tools that let us see inside a running microcontroller without disturbing it too much. Throughout, the guiding principle is that failures will occur, so the design must detect them, contain them and recover.

## Energy and power

### Where the power goes

A CMOS microcontroller draws current for two reasons ([[digital-ic/power-dissipation]]). **Dynamic** power, $P = \alpha C V^2 f$, is spent charging and discharging capacitances at every clock edge; it is proportional to clock frequency and to the square of the supply voltage. **Static** power comes from leakage in the transistors, from analog blocks (oscillators, regulators, references, brown-out detectors) and from anything else that draws current while nothing switches. Data sheets summarise the result as a run current of so many microamperes per megahertz — as of 2026, roughly $20$–$200\,\mathrm{\mu A/MHz}$ for low-power Cortex-M parts — plus a list of sleep modes:

| mode | what is running | typical current | wake-up time |
|---|---|---|---|
| run | core, clocks, peripherals | $\sim 1$–$50\,\mathrm{mA}$ | — |
| sleep | core clock stopped, peripherals running | a fraction of run current | $\sim$ cycles |
| stop / deep sleep | most clocks stopped, SRAM and registers retained, RTC running | $1$–$10\,\mathrm{\mu A}$ | $\sim 5$–$50\,\mathrm{\mu s}$ |
| standby / shutdown | almost everything off; SRAM lost; wake by pin or RTC | $0.05$–$1\,\mathrm{\mu A}$ | like a reset, $\sim$ ms |

The ratio between run and the deepest sleep is five to six orders of magnitude, and the art of low-power design is to spend as little time as possible awake. Most battery-powered systems are **duty-cycled**: they sleep almost all the time, wake on a timer or an external event, do their work quickly, and go back to sleep. On Cortex-M the program enters sleep with the `WFI` (wait for interrupt) instruction, typically in the idle loop or the RTOS idle task, and the interrupt that wakes it is handled first.

Everything else on the board counts too: a voltage regulator's quiescent current, a resistive divider left connected ([[embedded-systems/analog-interfaces#ex-adc-volts]]), a pull-up resistor held low by a pressed button, an LED, a sensor that is never put to sleep, a floating input pin whose input buffer oscillates. In a well-designed sensor node the microcontroller's sleep current is often not the largest item.

::: proposition Average current and battery life {#prop-battery-life}
A system that repeats a cycle of period $T$, in which it spends time $t_k$ in state $k$ drawing current $I_k$ ($\sum t_k = T$), draws an average current

$$
\bar I = \frac{1}{T}\sum_k I_k t_k ,
$$ {#eq-avg-current}

and a battery of usable capacity $Q$ (in ampere-hours or coulombs) lasts $t_\text{life} = Q/\bar I$. For a system that sleeps at $I_s$ except for short bursts of charge $q_k$ at intervals $T$, $\bar I \approx I_s + \sum_k q_k/T$.
:::

::: proof
The charge drawn in one cycle is $\int_0^T i(t)\,dt = \sum_k I_k t_k$; dividing by $T$ gives the average current, and since the cycle repeats, the charge drawn in time $t$ is $\bar I t$ to within one cycle. The battery is exhausted when this equals $Q$. In the bursty case, write each burst's charge as $q_k = (I_k - I_s)t_k$; then $\sum_k I_k t_k = I_sT + \sum_k q_k$, which divided by $T$ gives the approximation (exact if the sleep current also flows during the bursts).
:::

The usable capacity is less than the nominal: capacity falls at high load currents and low temperatures, a coin cell's internal resistance makes its voltage collapse during a radio's current pulse, and batteries self-discharge (a lithium coin cell by about $1\,\%$ per year, an alkaline cell by a few percent, a lithium-ion cell by a few percent per month including its protection circuit). Designers commonly derate the nominal capacity by $20$–$30\,\%$.

::: example A coin-cell sensor node {#ex-sensor-node}
A temperature sensor node sleeps at $2\,\mathrm{\mu A}$. Every $60\,\mathrm{s}$ it wakes, measures and processes for $20\,\mathrm{ms}$ at $5\,\mathrm{mA}$, and transmits for $5\,\mathrm{ms}$ at $15\,\mathrm{mA}$. It runs from a CR2032 coin cell of nominal capacity $225\,\mathrm{mAh}$, derated to $180\,\mathrm{mAh}$. How long does the battery last? Which item would you attack first to make it last longer?
::: solution
By [[#eq-avg-current]], the bursts contribute $(5\,\mathrm{mA}\times 20\,\mathrm{ms} + 15\,\mathrm{mA}\times 5\,\mathrm{ms})/60\,\mathrm{s} = (100 + 75)\,\mathrm{\mu C}/60\,\mathrm{s} = 2.92\,\mathrm{\mu A}$, so

$$
\bar I = 2 + 2.92 = 4.92\,\mathrm{\mu A}, \qquad t_\text{life} = \frac{180\,\mathrm{mAh}}{4.92\,\mathrm{\mu A}} = 36\,600\,\mathrm{h} = 4.2\ \text{years}.
$$

The sleep current is $41\,\%$ of the total, the measurement burst $34\,\%$ and the radio $25\,\%$. Halving the measurement time (running faster, or letting the ADC's hardware oversampler work while the core sleeps) would gain about as much as halving the sleep current. Reporting every five minutes instead of every minute would cut the burst part fivefold, to $0.58\,\mathrm{\mu A}$, for a life of almost $8$ years — at which point the cell's self-discharge and shelf life become the limit.
:::
:::

::: widget plot
f: Q*0.8*1000/(Is + q/x)/8760
x: 1, 600
y: 0, 15
sliders: Q=225:100:2500:5; Is=2:0.1:20:0.1; q=175:10:2000:5
labels: \text{battery life (years)}
caption: Battery life (years) against the reporting interval (s) for a node with a battery of $Q$ mAh (derated to $80\,\%$), sleep current $I_s$ μA and a charge of $q$ μC per wake-up. At short intervals the bursts dominate and life grows in proportion to the interval; at long intervals it levels off at the limit set by the sleep current alone. Halve $I_s$ and watch only the right-hand end move; double $q$ and only the left-hand end moves.
:::

### Run fast or run slow?

Should a processor that has a fixed amount of work to do run it slowly at low current, or quickly at high current and then sleep? With a fixed supply voltage, the answer is usually **race to sleep**.

::: proposition Energy of a computation {#prop-race}
Suppose the run current at clock frequency $f$ is $I(f) = I_0 + kf$, where $I_0$ is the frequency-independent part (leakage, regulators, oscillators, analog blocks) and $k$ the dynamic current per hertz. A computation of $N$ cycles then draws a charge

$$
q(f) = I(f)\,\frac{N}{f} = \frac{I_0 N}{f} + kN ,
$$ {#eq-race}

which decreases with $f$: at a fixed supply voltage, the energy of a computation is smallest at the highest clock frequency, provided the system then enters a sleep mode whose current is below $I_0$.
:::

::: proof
The computation takes $N/f$ seconds at current $I_0 + kf$, so its charge is the product, which expands to [[#eq-race]]. The dynamic term $kN$ is independent of $f$ — each cycle costs the same charge whatever the clock rate — while the static term falls as $1/f$ because it accrues for less time. Over a fixed cycle the remaining time is spent in sleep at a lower current, so finishing sooner saves charge. (The argument changes when the supply voltage can be lowered at lower frequencies — dynamic voltage and frequency scaling — because $k \propto V^2$: then a slower clock at a lower voltage can win, as it does in phones and laptops. It also changes when flash wait states make extra cycles at high frequency, which raises $N$.)
:::

::: example Choosing a clock for a burst {#ex-race}
A task needs $10^6$ cycles. The microcontroller draws $I(f) = 1\,\mathrm{mA} + 100\,\mathrm{\mu A/MHz}\times f$ when running. Compare the charge at $8$, $16$ and $48\,\mathrm{MHz}$.
::: solution
$k = 100\,\mathrm{\mu A}/\mathrm{MHz} = 10^{-10}\,\mathrm{A\,s}$, so $kN = 100\,\mathrm{\mu C}$ at any frequency. The static term $I_0N/f$ is $125\,\mathrm{\mu C}$ at $8\,\mathrm{MHz}$ ($125\,\mathrm{ms}$ at $1.8\,\mathrm{mA}$ in total), $62.5\,\mathrm{\mu C}$ at $16\,\mathrm{MHz}$ and $20.8\,\mathrm{\mu C}$ at $48\,\mathrm{MHz}$. Totals: $225$, $162.5$ and $120.8\,\mathrm{\mu C}$. Running at $48\,\mathrm{MHz}$ for $20.8\,\mathrm{ms}$ at $5.8\,\mathrm{mA}$ uses about half the charge of running at $8\,\mathrm{MHz}$ for $125\,\mathrm{ms}$ at $1.8\,\mathrm{mA}$ — even though the current is three times as high. Peak current is a separate constraint: a coin cell may not tolerate $6\,\mathrm{mA}$ pulses without a large buffer capacitor.
:::
:::

### Power supplies

The regulator matters as much as the processor. A **linear regulator** (LDO) passes the load current from input to output, so its efficiency is at most $V_\text{out}/V_\text{in}$: $89\,\%$ from a $3.7\,\mathrm{V}$ lithium cell to $3.3\,\mathrm{V}$, but $27.5\,\%$ from $12\,\mathrm{V}$, where a $50\,\mathrm{mA}$ load makes the LDO dissipate $(12 - 3.3)\times 0.05 = 0.44\,\mathrm{W}$. A **switching regulator** ([[power-electronics/dc-dc-converters]]) reaches $85$–$95\,\%$ at its design load, but its efficiency at microampere loads depends on its quiescent current and its light-load mode, so for a node that sleeps at $2\,\mathrm{\mu A}$, an LDO with $0.5\,\mathrm{\mu A}$ quiescent current can beat a buck converter with $15\,\mathrm{\mu A}$. Many low-power microcontrollers contain both, and switch between them automatically.

::: warning The forgotten microamperes
A battery product that should last five years and lasts three months nearly always has one forgotten load: a debug UART's level shifter left powered, a GPIO configured as a floating input (its input stage draws current when the voltage sits mid-rail), a pull-up held low, an LED, an external flash chip that was never sent its power-down command, an unused oscillator left running, or a debugger connection that keeps the debug domain awake (and makes every measurement on the bench wrong). Measure the sleep current of the finished board with the debugger disconnected, with a meter or a current-profiling instrument that can resolve microamperes and capture milliampere bursts, and account for every microampere.
:::

## Reliability

### Failure rates

The reliability of hardware is described by its **failure rate** $\lambda$, the probability per unit time that a working component fails. During the useful life of electronic components (after early "infant mortality" failures have been screened out and before wear-out) $\lambda$ is roughly constant.

::: definition Failure rate, reliability and MTBF {#def-reliability}
With a constant failure rate $\lambda$, the **reliability** — the probability that a unit works throughout $[0, t]$ — is $R(t) = e^{-\lambda t}$, and the **mean time between failures** is $\text{MTBF} = 1/\lambda$. Failure rates are quoted in **FIT** (failures in time): $1\,\text{FIT}$ is one failure per $10^9$ device-hours.
:::

::: proposition Reliability of a series system {#prop-series}
If a system fails when any one of its components fails (a **series** system), and the components fail independently with rates $\lambda_1, \dots, \lambda_m$, then the system's failure rate is $\lambda = \sum_i \lambda_i$ and $R(t) = \prod_i R_i(t) = e^{-\lambda t}$. If instead the system works as long as **at least one** of two redundant units with reliability $R_1(t)$ works (a **parallel** system), then $R(t) = 1 - (1 - R_1(t))^2$.
:::

::: proof
Series: the system works throughout $[0, t]$ only if every component does; by independence the probability is the product $\prod e^{-\lambda_i t} = e^{-(\sum\lambda_i)t}$. Parallel: the system fails only if both units fail, which has probability $(1 - R_1)^2$ by independence; the complement is the reliability.
:::

The average lifetime of a series system is short even when every part is good, because the rates add; and **MTBF is not lifetime**: an MTBF of $800$ years does not mean that a unit lasts $800$ years, only that in a large fleet about one unit in $800$ fails per year of operation.

::: example Field failures of a controller {#ex-fit}
A controller board contains a microcontroller ($50\,\text{FIT}$), a regulator ($20$), a crystal ($10$), a connector ($25$) and $30$ passive components ($1\,\text{FIT}$ each). Find the board's failure rate, its MTBF, and the number of failures to expect in ten years in a fleet of $100\,000$ boards.
::: solution
By [[#prop-series]], $\lambda = 50 + 20 + 10 + 25 + 30 = 135\,\text{FIT} = 1.35\times 10^{-7}\,\mathrm{h^{-1}}$, and $\text{MTBF} = 1/\lambda = 7.4\times 10^6\,\mathrm{h}$, about $850$ years. Ten years is $87\,600\,\mathrm{h}$, so $R = e^{-1.35\times 10^{-7}\times 87\,600} = e^{-0.0118} = 0.988$: $1.2\,\%$ of the boards fail, about $1180$ of the fleet. Hardware failure rates like these are modest; in practice, field failures of embedded products are dominated by software faults, environmental stress (moisture, vibration, ESD on connectors) and design margins, which is where most of the reliability effort goes.
:::
:::

::: widget plot
f: exp(-L*1e-9*x*8760); 1 - (1 - exp(-L*1e-9*x*8760))^2
x: 0, 50
y: 0.8, 1
sliders: L=135:10:5000:5
labels: R(t)\ \text{single}; R(t)\ \text{redundant pair}
caption: Reliability against time (years) for a unit with a failure rate of $L$ FIT, and for two such units in parallel where either suffices. Redundancy helps most early in life, when single failures are rare and double failures rarer still; it is no substitute for removing the common causes — a shared power supply, the same software bug — that would make both units fail together. Raise $L$ to $5000$ to see a weak component.
:::

### Supervisors: brown-out detection and watchdogs

Two hardware supervisors catch the most common catastrophic faults. The **brown-out detector** ([[embedded-systems/microcontrollers#def-reset]]) holds the microcontroller in reset while the supply is too low for reliable operation. It must be enabled and its threshold chosen above the minimum voltage at which the flash, the clock and the external parts all work; and the firmware must be written so that a reset at any instant — in the middle of a flash write, for example — leaves the system recoverable.

::: definition Watchdog timer {#def-watchdog}
A **watchdog timer** is a hardware down-counter, clocked independently of the main clock (usually by a low-power RC oscillator), that resets the microcontroller if it reaches zero. Software must **refresh** ("kick", "feed") it periodically by writing a key to a register, which reloads the counter. An **independent watchdog** resets if the refresh is too late; a **window watchdog** also resets if the refresh comes too early, catching code that refreshes in a tight loop. Once started, a watchdog typically cannot be stopped by software.
:::

The watchdog only helps if it is refreshed in the right place. Refreshing it from a timer interrupt is useless: the interrupt keeps running even when the main program is stuck in an endless loop or a task is deadlocked. The refresh should happen only when the system has demonstrated that it is healthy — in an RTOS, typically from a low-priority monitor task that refreshes only after every essential task has reported, through a flag or counter, that it has completed a cycle since the last check.

::: algorithm Designing a watchdog timeout {#alg-watchdog}
1. Find the longest legitimate interval between refreshes, $t_\text{max}$, including the worst-case response times of the tasks that must report ([[embedded-systems/real-time-systems#thm-rta]]), flash erases and other long operations.
2. Find the range of the watchdog's oscillator frequency, $f_\text{min}$ to $f_\text{max}$, from the data sheet (RC oscillators can vary by $\pm 25\,\%$ or more over temperature and parts).
3. Choose prescaler $P$ and reload $N$ so that the **shortest** possible timeout, $PN/f_\text{max}$, exceeds $t_\text{max}$ with a margin.
4. Check that the **longest** possible timeout, $PN/f_\text{min}$, is acceptable: it is how long the system may be dead before it recovers, which must be compatible with the safety of what it controls.
5. For a window watchdog, also ensure that the earliest legitimate refresh comes after the window opens.
:::

::: example A watchdog timeout {#ex-watchdog}
A watchdog is clocked by a $32\,\mathrm{kHz}$ RC oscillator that may run anywhere between $24$ and $40\,\mathrm{kHz}$, through a prescaler of $32$. The longest legitimate interval between refreshes is $80\,\mathrm{ms}$, and a $100\,\mathrm{ms}$ minimum timeout is wanted for margin. Choose the reload value and find the longest time the system can hang before it is reset.
::: solution
The shortest timeout is at $f_\text{max}$: $32N/40\,000 \ge 0.1\,\mathrm{s}$ requires $N \ge 125$. With $N = 125$, the longest timeout is at $f_\text{min}$: $32\times 125/24\,000 = 167\,\mathrm{ms}$. So a hung system recovers within at most $167\,\mathrm{ms}$ plus the restart time. If the controlled process cannot tolerate that long without output, the outputs must also go to a safe state in hardware — for example, a motor driver whose enable input needs a continuous pulse train from the microcontroller.
:::
:::

### Faults, recovery and defensive firmware

A watchdog reset is a recovery, not a fix; the design should also detect faults earlier and leave evidence behind.

- **Fault handlers.** On Cortex-M, invalid memory accesses, undefined instructions, divide-by-zero (if enabled) and stack errors raise HardFault or the configurable MemManage, BusFault and UsageFault exceptions. A production fault handler should save the stacked registers (especially `PC` and `LR`), the fault status registers and a timestamp to a RAM area that survives reset (excluded from `.bss` zeroing) or to flash, then put the outputs in a safe state and reset. The next boot reads and reports the record together with the reset-cause register.
- **Safe states.** Every output should have a defined safe value — motor off, valve closed, heater off — that is reached on reset (by the pins' reset state and pull resistors, not by software that may never run) and on any detected fault.
- **Defensive checks.** Validate every input from outside (message lengths, sensor ranges, configuration values); check return codes; use `default` branches in state machines that drive the machine to a safe state ([[digital-logic/finite-state-machines]] makes the same point for hardware); keep critical variables in two copies (one complemented) and compare them; check stacks for overflow with canary values or the memory protection unit.
- **Integrity of code and data.** Store a **CRC** with the firmware image and with each configuration record, and verify it at boot and before use. A CRC-32 detects all single-bit errors, all burst errors of up to $32$ bits, and all but about $1$ in $2^{32}$ of random corruptions. Microcontrollers often have a CRC peripheral, and SRAM with ECC or parity on safety-oriented parts.
- **Safe firmware updates.** Never overwrite the only working image. A **bootloader** that cannot itself be overwritten checks the application image's CRC (and, for security, its cryptographic signature) before jumping to it; updates are written to a second slot (**A/B** scheme), and the bootloader switches to the new image only once it is complete and verified, falling back to the old one if the new image fails to confirm itself as healthy after boot.

::: quiz
Where should the watchdog be refreshed in an RTOS application with five tasks?
- [ ] in the SysTick interrupt, which is guaranteed to run every millisecond
- [ ] at the start of each task's loop
- [x] in a monitor task that refreshes only after every essential task has reported completing a cycle since the last refresh
- [ ] nowhere: watchdogs are only needed in systems without an RTOS
::: solution
The SysTick interrupt runs even when every task is deadlocked, so refreshing there detects almost nothing. Refreshing in each task would let one healthy task keep the system alive while another hangs. A monitor that checks a "heartbeat" from each essential task, and refreshes only if all have reported, turns the watchdog into a detector of any stuck task.
:::
:::

## Testing

Embedded software is hard to test because its inputs are physical, its timing matters, and the hardware may not exist yet when the software is being written. The answer is a pyramid of tests, from many cheap ones to a few expensive ones.

1. **Static analysis** checks the code without running it: compiler warnings at their strictest level, a coding standard such as MISRA C enforced by a checker, and analysers that find null-pointer dereferences, buffer overruns, uninitialised variables and integer overflows.
2. **Unit tests on the host.** Most firmware logic — protocols, filters, state machines, parsers, the ring buffer of [[embedded-systems/serial-communication#def-ring-buffer]] — does not depend on the hardware at all. If the code is structured so that hardware access goes through a thin driver interface, the logic can be compiled for a desktop computer and tested in milliseconds with a unit-test framework, using **test doubles** (fakes or mocks) in place of the drivers. Tests run on every change, in continuous integration.
3. **Tests on the target** run on real hardware, to check the drivers and timing: that the UART really sends at $115\,200$ baud, that the ADC values are right, that worst-case execution times are as assumed.
4. **Hardware-in-the-loop** (HIL) testing connects the complete controller to a real-time simulation of the system it controls — an engine, a power grid, a vehicle — so that the controller can be tested against faults and extreme conditions that would be dangerous or impossible to create with the real system.
5. **System and environmental tests** expose the finished product to temperature extremes, supply dips and interruptions, electrostatic discharge and electromagnetic interference ([[instrumentation/electromagnetic-compatibility]]), and long-duration soak tests.

**Coverage** measures how much of the code the tests exercise: statement coverage, branch coverage, and in avionics (DO-178C, level A) **modified condition/decision coverage**, which requires each condition in a decision to be shown to affect the outcome independently. In safety-related industries, standards such as IEC 61508 (general), ISO 26262 (automotive), IEC 62304 (medical) and DO-178C (avionics) prescribe the development process, analyses and tests according to the consequences of a failure.

## Debugging

### Debug probes and breakpoints

A **debug probe** connects to the microcontroller's Serial Wire Debug (SWD, two pins: SWDIO and SWCLK) or JTAG port and gives a debugger on the development computer access to the core's debug logic: it can halt the core, single-step, read and write memory and registers while the core runs, and set **hardware breakpoints** and **watchpoints**. The number is limited by comparators in the silicon — a Cortex-M3 or M4 has six instruction-address comparators and four data watchpoints, a Cortex-M0 or M0+ up to four and two — so they must be used sparingly; a watchpoint that halts the core when a particular variable is written is the fastest way to find out who is corrupting it.

Halting the core is not always possible: a motor controller stopped in the middle of a PWM cycle may destroy its power stage, and a communication link times out. Most timers can be configured to freeze when the core halts, but for real-time problems non-intrusive tools are needed.

### Observing without stopping

- **GPIO toggling.** Setting a spare pin at the start of an interrupt handler and clearing it at the end, then watching the pin on an oscilloscope or logic analyser, shows the handler's execution time, its jitter and its interaction with other events, at a cost of two store instructions. It is the simplest and most informative real-time debugging tool.
- **Cycle counters.** Cortex-M3 and larger cores have a $32$-bit cycle counter in the Data Watchpoint and Trace unit (`DWT_CYCCNT` at `0xE0001004`, enabled by setting the `TRCENA` bit of `DEMCR` and the `CYCCNTENA` bit of `DWT_CTRL`), which can be read at the start and end of a code section; the difference, by [[embedded-systems/timers-interrupts#thm-wrap]], is the elapsed cycles even across wrap-around.
- **Trace and logging.** Writing log messages to a UART is easy but slow and changes the timing. Faster channels write to a buffer in RAM that the debug probe reads in the background (several vendors' "real-time transfer" schemes), or use the instrumentation trace macrocell (ITM) through the single-wire output pin. Instruction trace (ETM), on larger cores with a trace port, records every executed branch and lets the debugger reconstruct the program's path after the fact.
- **Post-mortem records.** The fault records and reset-cause logs described above are often the only evidence from a failure in the field; designing them in from the start pays for itself the first time a product fails at a customer's site.

::: example Measuring an interrupt handler {#ex-measure-isr}
An ADC interrupt handler on a $72\,\mathrm{MHz}$ Cortex-M3 must finish within $10\,\mathrm{\mu s}$. Describe two ways to measure its worst-case execution time, and interpret a measurement in which the cycle counter shows a spread from $310$ to $1150$ cycles.
::: solution
(1) Toggle a GPIO pin at entry and exit and capture it on an oscilloscope with infinite persistence, or a logic analyser over a long run; the widest pulse seen is the measured worst case (plus the $12$-cycle entry latency before the first instruction). (2) Read `DWT_CYCCNT` at entry and exit, and keep the maximum difference in a variable that the debugger reads while the system runs:

```c
#define DWT_CYCCNT (*(volatile uint32_t *)0xE0001004u)
static volatile uint32_t isr_max;
void ADC_IRQHandler(void) {
    uint32_t t0 = DWT_CYCCNT;
    /* ... handler body ... */
    uint32_t dt = DWT_CYCCNT - t0;       /* unsigned: correct across wrap */
    if (dt > isr_max) isr_max = dt;
}
```

A spread of $310$ to $1150$ cycles is $4.3$ to $16.0\,\mathrm{\mu s}$: the worst case exceeds the $10\,\mathrm{\mu s}$ budget. Such spreads come from data-dependent paths in the handler, flash wait states and cache misses ([[embedded-systems/microcontrollers#ex-wait-states]]), preemption by higher-priority interrupts (included in the measurement), or a library call such as a floating-point routine on a core without an FPU. The measurement also shows only the worst case *observed*, so test under the conditions most likely to produce long paths, and add a margin.
:::
:::

::: application A field failure investigated
A fleet of networked thermostats starts rebooting every few days at some customer sites. The reset-cause register, logged at each boot and reported over the network, says "watchdog". The fault record is empty, so no exception occurred. The monitor task's heartbeat log shows that the communication task stops reporting a few seconds before each reset. A watchpoint is no use in the field, but adding a record of the communication task's state machine at each transition, kept in a non-initialised RAM area, shows on the next reset that the task was waiting for an I²C sensor that held SDA low — the stuck-bus case of [[embedded-systems/serial-communication]]. The fix is a bus-recovery routine and a timeout on every I²C transaction, delivered by an A/B firmware update. Every element of the design described in this chapter — the watchdog, the heartbeat monitor, the reset log, the persistent trace, the safe update — played a part.
:::

::: history
Two failures became standard lessons for embedded engineers. Between 1985 and 1987 the Therac-25 radiation therapy machine gave massive overdoses to six patients; investigations, notably by Nancy Leveson and Clark Turner (1993), found race conditions in its software, which had replaced the hardware interlocks of earlier models, and poor error messages that operators learned to ignore. On 4 June 1996 the first Ariane 5 rocket veered off course and was destroyed about $40$ seconds after launch: software reused from Ariane 4 converted a 64-bit floating-point value related to horizontal velocity into a 16-bit signed integer, the value was larger than on Ariane 4's trajectory and the conversion overflowed, and the resulting exception shut down both inertial reference units, which ran identical software. Both cases showed that redundancy, testing and reuse are only as good as the assumptions behind them, and they shaped the safety standards — IEC 61508 (first published in 1998), ISO 26262 (2011) — now applied to embedded systems.
:::

## Where this leads

This chapter closes the course, but each of its themes opens a field. Power design continues in [[power-electronics]] and [[digital-ic/power-dissipation]]; reliability engineering and functional safety are disciplines of their own, built on the probability of [Probability](/learn/maths/course.php?c=probability) and on standards such as IEC 61508; interference and robustness are treated in [[instrumentation/electromagnetic-compatibility]]. The controllers that embedded systems run are designed in [[control-systems]], their signal processing in [[dsp]], and their communication beyond the board in [[communication-systems]]. The Mechanical Atlas's [Designing mechatronic systems](/learn/mechanical/lesson.php?c=mechatronics&l=system-integration) shows the same design process from the side of the machine being controlled.

::: summary
- Microcontroller current is dynamic ($\propto f$, $V^2$) plus static; sleep modes reduce it by five to six orders of magnitude, so battery products are duty-cycled.
- Average current is $\bar I = \sum I_kt_k/T$ and battery life $Q/\bar I$ ([[#prop-battery-life]]); derate capacity, and account for every microampere on the board.
- At a fixed voltage a computation costs $I_0N/f + kN$, so racing to sleep at the highest clock usually saves energy ([[#prop-race]]); LDO efficiency is at most $V_\text{out}/V_\text{in}$.
- With constant failure rates, $R(t) = e^{-\lambda t}$, rates add in series systems ([[#def-reliability]], [[#prop-series]]); MTBF is not lifetime.
- Brown-out detectors and watchdogs ([[#def-watchdog]]) catch catastrophic faults; refresh the watchdog only after checking every essential task, and size its timeout for the oscillator's whole frequency range ([[#alg-watchdog]]).
- Design for recovery: fault records, safe output states, input validation, CRCs on code and data, and A/B firmware updates through a protected bootloader.
- Test in layers — static analysis, host unit tests with test doubles, target tests, hardware-in-the-loop, environmental tests — and debug with probes, watchpoints, GPIO toggling, cycle counters and trace.
:::

## Exercises

::: exercise An average current {level=1 check="21e-6"}
A device sleeps at $1\,\mathrm{\mu A}$ and once per second wakes for $10\,\mathrm{ms}$ at $2\,\mathrm{mA}$. What is its average current, in amperes?
::: solution
By [[#eq-avg-current]], $\bar I \approx 1\,\mathrm{\mu A} + 2\,\mathrm{mA}\times 10\,\mathrm{ms}/1\,\mathrm{s} = 1 + 20 = 21\,\mathrm{\mu A}$.
:::
:::

::: exercise Battery life {level=1 check="1000e-3*3600/50e-6"}
How long, in seconds, does a $1000\,\mathrm{mAh}$ battery last at an average current of $50\,\mathrm{\mu A}$, ignoring derating? Express it also in years.
::: solution
$Q = 1\,\mathrm{Ah} = 3600\,\mathrm{C}$, and $3600/(50\times 10^{-6}) = 7.2\times 10^7\,\mathrm{s} = 20\,000\,\mathrm{h} = 2.3$ years.
:::
:::

::: exercise FIT and MTBF {level=1 check="1e9/200*3600"}
A component has a failure rate of $200\,\text{FIT}$. What is its MTBF, in seconds? What fraction of a large population fails in the first year?
::: solution
$\text{MTBF} = 10^9/200 = 5\times 10^6\,\mathrm{h} = 1.8\times 10^{10}\,\mathrm{s}$. In one year ($8760\,\mathrm{h}$), $1 - e^{-200\times 10^{-9}\times 8760} = 0.00175$, about $0.18\,\%$.
:::
:::

::: exercise Sizing a watchdog {level=2 check="188"}
A watchdog's RC oscillator runs between $30$ and $60\,\mathrm{kHz}$, and its prescaler is $64$. What is the smallest integer reload value that guarantees a timeout of at least $200\,\mathrm{ms}$? What is then the longest possible timeout?
::: solution
By [[#alg-watchdog]], $64N/60\,000 \ge 0.2$ gives $N \ge 187.5$, so $N = 188$. The longest timeout is $64\times 188/30\,000 = 401\,\mathrm{ms}$ — the oscillator's two-to-one spread doubles the worst-case recovery time.
:::
:::

::: exercise A linear regulator {level=2}
A $3.3\,\mathrm{V}$ microcontroller board draws $50\,\mathrm{mA}$ and is powered from a $12\,\mathrm{V}$ vehicle supply through an LDO. Find the LDO's efficiency and dissipation. What is the temperature rise if its package has a thermal resistance of $150\,\mathrm{K/W}$? What would a $90\,\%$-efficient buck converter draw from the $12\,\mathrm{V}$ supply?
::: solution
Efficiency $\le 3.3/12 = 27.5\,\%$; dissipation $(12 - 3.3)\times 0.05 = 0.435\,\mathrm{W}$; temperature rise $0.435\times 150 = 65\,\mathrm{K}$ — at an ambient of $60\,^\circ\mathrm{C}$ inside a car this exceeds most LDOs' $125\,^\circ\mathrm{C}$ junction limit. A buck converter delivers $0.165\,\mathrm{W}$ at $90\,\%$ efficiency, drawing $0.183\,\mathrm{W}$, $15\,\mathrm{mA}$ from $12\,\mathrm{V}$, and dissipating only $18\,\mathrm{mW}$.
:::
:::

::: exercise Race to sleep {level=2}
For the microcontroller of [[#ex-race]], suppose the work must be done once per second and the sleep current is $5\,\mathrm{\mu A}$. Find the average current at $8\,\mathrm{MHz}$ and at $48\,\mathrm{MHz}$. Then suppose that at $48\,\mathrm{MHz}$ the flash needs wait states that increase the cycle count to $1.3\times 10^6$; is $48\,\mathrm{MHz}$ still better?
::: solution
At $8\,\mathrm{MHz}$: $225\,\mathrm{\mu C}$ per second plus sleep for the remaining $0.875\,\mathrm{s}$: $225 + 5\times 0.875 = 229.4\,\mathrm{\mu C}$ per second, so $\bar I = 229\,\mathrm{\mu A}$. At $48\,\mathrm{MHz}$: $120.8 + 5\times 0.979 = 125.7\,\mathrm{\mu C}$ per second, $\bar I = 126\,\mathrm{\mu A}$. With $N = 1.3\times 10^6$ at $48\,\mathrm{MHz}$: $q = 10^{-3}\times 1.3\times 10^6/(48\times 10^6) + 10^{-10}\times 1.3\times 10^6 = 27.1 + 130 = 157.1\,\mathrm{\mu C}$, plus sleep $\approx 4.9\,\mathrm{\mu C}$: $\bar I \approx 162\,\mathrm{\mu A}$. Still better than $8\,\mathrm{MHz}$, but the advantage has shrunk; the optimum depends on the details, and measuring is the final arbiter.
:::
:::

::: exercise Where to refresh {level=2}
A superloop calls `read_sensors()`, `control()`, `comms()` and `log()` and then refreshes the watchdog. `comms()` can legitimately take up to $50\,\mathrm{ms}$ when the network is slow, and the other functions together take $5\,\mathrm{ms}$. A colleague proposes refreshing the watchdog inside `comms()` as well, "so that a slow network doesn't trigger a reset". Discuss.
::: solution
Refreshing inside `comms()` means that a fault elsewhere — `control()` stuck in a loop, say — is still caught (the loop never reaches `comms()`), but a fault *inside* `comms()` that loops around the refresh call would never be caught; and if the refresh sits inside a retry loop, a permanently failing network keeps the system alive but non-functional. Better: size the timeout for the legitimate worst case ($55\,\mathrm{ms}$ plus margin, accounting for the oscillator spread) and keep a single refresh at the end of the loop, or restructure `comms()` as a non-blocking state machine that does a bounded amount of work per loop iteration, so that the loop time is short and predictable.
:::
:::

::: exercise A five-year design {level=3 check="21"}
The node of [[#ex-sensor-node]] must last five years on its $180\,\mathrm{mAh}$ (derated) coin cell. It keeps measuring every $60\,\mathrm{s}$ ($5\,\mathrm{mA}$ for $20\,\mathrm{ms}$), but now transmits only when the temperature has changed, each transmission costing $15\,\mathrm{mA}$ for $5\,\mathrm{ms}$. Sleep current is $2\,\mathrm{\mu A}$. What is the largest whole number of transmissions per hour that the budget allows on average?
::: hint
Compute the average current that the battery can supply for five years, subtract the sleep and measurement currents, and divide what is left by the charge per transmission.
:::
::: solution
Five years is $43\,800\,\mathrm{h}$, so the budget is $\bar I \le 180\,\mathrm{mAh}/43\,800\,\mathrm{h} = 4.11\,\mathrm{\mu A}$. Sleep and measurement use $2 + 5\,\mathrm{mA}\times 0.02\,\mathrm{s}/60\,\mathrm{s} = 2 + 1.67 = 3.67\,\mathrm{\mu A}$, leaving $0.44\,\mathrm{\mu A}$, i.e. $0.44\times 10^{-6}\times 3600 = 1.59\,\mathrm{mC}$ per hour. Each transmission costs $15\,\mathrm{mA}\times 5\,\mathrm{ms} = 75\,\mathrm{\mu C}$, so at most $1594/75 = 21.3$, i.e. $21$ transmissions per hour on average. The margin is thin; reducing the measurement cost (the largest item after sleep) would buy far more transmissions.
:::
:::

::: exercise Redundant sensors {level=3}
A safety function uses a temperature sensor with a failure rate of $1000\,\text{FIT}$. (a) What is its reliability over ten years? (b) With two sensors where either suffices, what is the reliability? (c) Why might the real improvement be smaller, and how can the design detect a failed sensor rather than merely tolerate it?
::: solution
(a) $\lambda t = 10^{-6}\times 87\,600 = 0.0876$, $R = e^{-0.0876} = 0.916$. (b) By [[#prop-series]], $R = 1 - (1 - 0.916)^2 = 1 - 0.0070 = 0.993$: the probability of losing the function falls from $8.4\,\%$ to $0.7\,\%$. (c) The calculation assumes independent failures. Sensors from the same batch, on the same supply, cable or connector, or read by the same software, share **common causes** that can fail both at once; designers separate supplies and routing and may use diverse sensor types. Moreover, "either suffices" requires knowing which one is right: with two sensors a disagreement can be detected but not resolved (so the system goes to a safe state), with three a two-out-of-three vote can identify and outvote a faulty one. Plausibility checks — rate-of-change limits, comparison with a model — detect many sensor failures with a single sensor.
:::
:::

::: exercise A robust update {level=3}
Design the flash layout and boot procedure for a microcontroller with $512\,\mathrm{KiB}$ of flash that must be updated over a slow radio link, where power may be lost at any moment, and where a faulty image must never leave the device unrecoverable. State what happens if power fails (a) during the download, (b) during the switch to the new image, and (c) if the new image crashes on its first boot.
::: solution
Layout: a $32\,\mathrm{KiB}$ bootloader, write-protected; two application slots A and B of $224\,\mathrm{KiB}$ each; and a small metadata area of two flash pages holding a record {active slot, pending slot, boot attempts, sequence number, CRC}, written alternately so that one valid copy always survives. Images carry a header with length, version, CRC-32 (and a signature for security).

Procedure: the running image (say in A) downloads the new image into B, verifies its CRC and signature, then writes a metadata record "pending = B, attempts = 0" and resets. The bootloader reads the newest valid metadata record; if a slot is pending it increments the attempt count (writing a new record) and boots it; the new image, once it has initialised and passed a self-test (including communicating with the server), writes "active = B, no pending". If the attempt count exceeds a limit, the bootloader marks B bad and boots A.

(a) Power loss during the download leaves B incomplete; the metadata still says "active = A", so A boots and the download resumes or restarts. (b) The switch is a single metadata write; if it is interrupted, that record's CRC fails and the bootloader uses the older valid record (still A) — the update is retried. (c) A crash on first boot triggers the watchdog; after the allowed number of attempts the bootloader reverts to A, which reports the failure. At no point is the only working image erased, and every decision depends on data that are checked before use.
:::
:::
