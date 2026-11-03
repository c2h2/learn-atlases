Open a washing machine, a cordless drill, a bicycle computer, a smoke alarm or a car key and you will find, somewhere on the circuit board, a small square chip with a few dozen pins. It is a complete computer: a processor, a few kilobytes to a few megabytes of program memory, some RAM, and a collection of hardware blocks that count time, convert voltages to numbers and shift bits in and out of wires. It runs one program, from the moment power is applied until the battery dies, and nobody ever sees it boot. This is a **microcontroller**, and most of the processors made each year are microcontrollers rather than the processors in phones and computers.

The processor inside is not new to us: [[computer-architecture/input-output]] showed how a processor talks to devices through memory-mapped registers, interrupts and DMA. What is new is the *integration*. A microcontroller puts the devices on the same die as the processor, fixes them at known addresses, and gives the programmer direct, unmediated control over them — there is usually no operating system between the program and the hardware. To use one well we must understand the chip as a whole: how its memories and peripherals are laid out in the address space, where its clock comes from and how it is multiplied up, what happens between power-on and the first instruction of `main`, and how its pins behave electrically.

This chapter covers exactly those things, ending with the simplest peripheral of all, the general-purpose input/output pin. The Mechanical Atlas treats microcontrollers from the point of view of a mechatronic system — [Microcontrollers and embedded software](/learn/mechanical/lesson.php?c=mechatronics&l=microcontrollers) — with an emphasis on control loops; here we go into the electrical and architectural detail an electrical engineer needs to choose a part, design the board around it and write its lowest-level software.

## What a microcontroller is

::: definition Microcontroller {#def-mcu}
A **microcontroller** (MCU) is a single integrated circuit containing a processor core, non-volatile program memory (usually flash), volatile data memory (SRAM), a clock and reset system, and a set of **peripherals** — general-purpose input/output, timers, analog-to-digital converters, serial interfaces and others — all connected by an on-chip bus and controlled through registers in the processor's address space. It needs only a power supply (and often a crystal) to run.
:::

The contrast is with a **microprocessor** (or applications processor), which has a much faster core with caches and a memory-management unit, but relies on external DRAM and usually external flash, and normally runs an operating system such as Linux. A single-board computer built around an applications processor boots in seconds, draws hundreds of milliwatts or more, and has millisecond-scale timing jitter from its operating system. A microcontroller starts executing a few hundred microseconds after power is applied, can sleep at a microwatt, and will toggle a pin within a few tens of nanoseconds of the instant its program decides to. These are the properties embedded control needs, and why microcontrollers dominate it.

### The blocks inside

A typical 32-bit microcontroller contains:

- a **processor core**, usually one of Arm's Cortex-M family (M0+, M3, M4, M7, M23, M33, M55, M85) or an implementation of the RISC-V RV32I base with extensions; 8-bit cores (AVR, PIC, 8051 derivatives) survive in the cheapest and simplest products;
- **flash memory** for program and constant data, from $16\,\mathrm{KiB}$ to several megabytes, programmable in-system;
- **SRAM** for variables, stack and heap, from $2\,\mathrm{KiB}$ to about a megabyte;
- a **bus matrix** that lets several masters (the core's instruction and data buses, DMA controllers) reach several slaves (flash, SRAM banks, peripheral bridges) at once, and **bridges** to slower peripheral buses;
- a **clock and reset controller** with internal oscillators, crystal oscillators, one or more phase-locked loops and the reset logic;
- an **interrupt controller** (the NVIC on Cortex-M, the CLIC or PLIC on RISC-V);
- the **peripherals**: GPIO ports, timers, ADCs and sometimes DACs and comparators, UART, SPI, I²C, CAN, USB and Ethernet controllers, DMA, a watchdog, a real-time clock, a CRC unit, cryptographic accelerators;
- **debug** hardware (Serial Wire Debug or JTAG) that lets an external probe halt the core, read memory and set breakpoints.

| part (as of 2026) | core | max clock | flash | SRAM | notes |
|---|---|---|---|---|---|
| Microchip ATmega328P | 8-bit AVR | $20\,\mathrm{MHz}$ | $32\,\mathrm{KiB}$ | $2\,\mathrm{KiB}$ | the original Arduino Uno chip |
| ST STM32F407 | Cortex-M4F | $168\,\mathrm{MHz}$ | up to $1\,\mathrm{MiB}$ | $192\,\mathrm{KiB}$ | a classic general-purpose part |
| Raspberry Pi RP2040 | 2 × Cortex-M0+ | $133\,\mathrm{MHz}$ | external QSPI | $264\,\mathrm{KiB}$ | programmable I/O state machines |
| Raspberry Pi RP2350 | 2 × Cortex-M33 or 2 × RISC-V | $150\,\mathrm{MHz}$ | external QSPI | $520\,\mathrm{KiB}$ | core type selectable at boot |

These figures are only representative: every family spans a range of memory sizes and pin counts, and the table dates quickly. The point is the range — four orders of magnitude in RAM between the smallest and the largest parts in common use — and the fact that even the largest is tiny compared with a phone. Memory is the resource an embedded programmer runs out of first.

::: remark Harvard inside, von Neumann outside
Cortex-M3 and larger cores have separate instruction and data buses (a **Harvard** organisation at the bus level), so an instruction fetch from flash and a data access to SRAM can happen in the same cycle. Yet the programmer sees a single address space in which code, data and peripherals all have addresses, and a pointer can point to any of them (a **von Neumann** model). The 8-bit AVR is Harvard all the way up: program memory has its own address space, and reading a constant table from flash needs special instructions.
:::

## The memory map

Everything the processor can reach — flash, SRAM, every peripheral register, the interrupt controller — has an address. The layout of these addresses is the chip's **memory map**, and it is the first thing to look up in a reference manual.

::: definition Memory map {#def-memory-map}
The **memory map** of a microcontroller assigns ranges of the processor's address space to memories and peripheral register blocks. Each peripheral occupies a **base address**; its registers are found at fixed **offsets** from that base. Reserved ranges decode to nothing, and an access to them causes a bus fault.
:::

The Cortex-M architecture fixes the coarse layout of its $4\,\mathrm{GiB}$ space, which is why code for one vendor's Cortex-M part looks familiar on another's:

| address range | region | typical contents |
|---|---|---|
| `0x00000000`–`0x1FFFFFFF` | Code | flash (often aliased from another address), boot ROM |
| `0x20000000`–`0x3FFFFFFF` | SRAM | on-chip RAM |
| `0x40000000`–`0x5FFFFFFF` | Peripheral | GPIO, timers, UARTs, ADCs … |
| `0x60000000`–`0x9FFFFFFF` | External RAM | external memory controller |
| `0xA0000000`–`0xDFFFFFFF` | External device | external memory-mapped devices |
| `0xE0000000`–`0xE00FFFFF` | Private peripheral bus | NVIC, SysTick timer, system control block, debug |

Within these regions each vendor places its own blocks. A reference manual will say, for instance, that a GPIO port is at `0x48000400` and that its output data register is at offset `0x14`; the processor writes that pin by storing to address `0x48000414`. The three kinds of register — control, status and data — and the reasons they must be uncached, strongly ordered and accessed through `volatile` pointers are exactly those of [[computer-architecture/input-output#def-devregs]]; on a microcontroller without a data cache the first condition holds automatically.

::: example Locating a register and a bit field {#ex-register-field}
A GPIO port has base address `0x48000000`. Its **mode register** (offset `0x00`) holds two bits per pin: pin $k$ uses bits $2k+1{:}2k$, with `00` input, `01` output, `10` alternate function and `11` analog. What address must be written, and which bits, to make pin 5 an output without changing the other pins?
::: solution
The register's address is `0x48000000 + 0x00 = 0x48000000`. Pin 5 uses bits $11{:}10$. The field mask is $3\ll 10 =$ `0xC00`, and the value `01` shifted into place is $1\ll 10 =$ `0x400`. The other pins must keep their settings, so the program must **read** the register, **clear** bits $11{:}10$ with the inverted mask, **set** the new value and **write** it back:

$$
\texttt{MODER} \leftarrow (\texttt{MODER}\ \&\ \sim\texttt{0xC00})\ |\ \texttt{0x400}.
$$

This read–modify–write sequence is the most common operation in all of embedded programming; [[embedded-systems/embedded-programming]] shows how to write it in C and why it is dangerous when an interrupt handler touches the same register.
:::
:::

### Bit-banding and atomic bit access

Because read–modify–write takes three instructions, an interrupt arriving in the middle can corrupt a register that the handler also modifies. Architectures offer several ways around this. Many GPIO blocks have separate **set** and **reset** registers: writing a $1$ to bit $k$ of the set register makes pin $k$ high, writing to the reset register makes it low, and $0$ bits have no effect, so a single store changes one pin atomically. The Cortex-M3 and M4 also offer **bit-banding**: each bit of the first megabyte of SRAM and of the peripheral region has its own word address in an **alias region**, and a word store to the alias writes just that bit, in one bus transaction.

::: proposition Bit-band alias address {#prop-bitband}
On a Cortex-M3 or M4, for a byte at address $A$ in the SRAM bit-band region (`0x20000000`–`0x200FFFFF`) and a bit number $b \in \{0,\dots,7\}$, the alias word is at

$$
\text{alias} = \texttt{0x22000000} + 32\,(A - \texttt{0x20000000}) + 4b.
$$ {#eq-bitband}

The peripheral bit-band region `0x40000000`–`0x400FFFFF` is aliased in the same way starting at `0x42000000`.
:::

::: proof
Every bit is given a whole 32-bit word (4 bytes) in the alias region, so the $8$ bits of one byte take $32$ bytes of alias space. The byte at offset $A - \texttt{0x20000000}$ from the start of the region therefore has its alias block at $32$ times that offset from the alias base, and bit $b$ is the $b$-th word, $4b$ bytes, into the block.
:::

For example, bit $5$ of the byte at `0x20000300` has alias address `0x22000000` $+ 32 \times$ `0x300` $+ 20$ $=$ `0x22006014`. Bit-banding was dropped from the newer Armv8-M cores (Cortex-M23, M33), which is one reason portable code now prefers the set/reset registers and the exclusive-access instructions instead.

### Flash speed and wait states

Flash memory is slow compared with the processor. A typical embedded flash array needs some $25$–$40\,\mathrm{ns}$ for a random read, while a $120\,\mathrm{MHz}$ core has a clock period of $8.3\,\mathrm{ns}$. If the flash cannot answer within one cycle, the flash controller inserts **wait states** — extra cycles during which the core waits for the data.

::: proposition Flash wait states {#prop-wait-states}
If a flash read takes $t_\text{acc}$ and the core clock is $f$, each access needs $\lceil f\,t_\text{acc}\rceil$ clock cycles, that is $W = \lceil f\,t_\text{acc}\rceil - 1$ wait states. Without buffering, sequential fetch from flash can supply at most $1/t_\text{acc}$ accesses per second, whatever the clock rate.
:::

::: proof
The core samples the data at a clock edge; the data must be valid by then, so the number of cycles $n$ in an access must satisfy $n/f \ge t_\text{acc}$, and the smallest integer is $n = \lceil f t_\text{acc}\rceil$. One of these cycles is the normal access cycle, the rest are waits. The access rate is $f/n \le f/(f t_\text{acc}) = 1/t_\text{acc}$.
:::

The reference manual gives a table of wait states against clock frequency and supply voltage (the flash is slower at low voltage), and the startup code must program the right value **before** raising the clock; doing it in the opposite order makes the core read garbage from flash and crash. To hide the wait states, flash controllers read a wide line — typically $64$ or $128$ bits, two to eight instructions — at once, **prefetch** the next line while the current one executes, and keep a small instruction cache for loops and branch targets. Code that must run fast and deterministically (an interrupt handler with a tight deadline) is sometimes copied into SRAM, which has no wait states.

::: widget plot
f: x/ceil(x*ta/1000); min(x, w*x/ceil(x*ta/1000))
x: 1, 200
y: 0, 210
sliders: ta=30:15:60:1; w=4:1:8:1
labels: \text{one word per access}; \text{w-word line, prefetched}
caption: Instruction-fetch rate from flash (millions of words per second) against core clock (MHz) for a flash access time of $t_a$ ns. With one word per access the rate saws up and down and never exceeds $1/t_a$ — at $30\,\mathrm{ns}$, about $33$ million per second, however fast the core. Fetching a $w$-word line per access multiplies the ceiling by $w$; increase $t_a$ (a lower supply voltage) and watch the steps get closer together.
:::

::: example Choosing the wait states {#ex-wait-states}
A microcontroller's flash has $t_\text{acc} = 30\,\mathrm{ns}$ and is read $128$ bits at a time; instructions are $16$ or $32$ bits. (a) How many wait states are needed at $120\,\mathrm{MHz}$? (b) Can straight-line code run at full speed? (c) What does a taken branch cost?
::: solution
(a) $f t_\text{acc} = 120\times 10^6 \times 30\times 10^{-9} = 3.6$, so an access needs $4$ cycles: $W = 3$ wait states.

(b) A $128$-bit line holds four $32$-bit or eight $16$-bit instructions, which take at least four cycles to execute at one instruction per cycle. The next line takes $4$ cycles to read, and with prefetch it is read while the current line executes, so sequential code runs without stalls — just.

(c) A taken branch to an address that is not in the prefetch buffer or cache must wait for a fresh line: $3$ cycles of stall on top of the normal pipeline refill. A loop body that fits in the instruction cache pays this only on the first iteration. This is why the *same* code can take a different number of cycles depending on its alignment and on what ran before it, a source of timing jitter that matters in hard real-time code.
:::
:::

## Clocks

A microcontroller's clock determines its speed, its power consumption (dynamic power is proportional to frequency, [[digital-ic/power-dissipation]]) and the accuracy of everything it times — baud rates, PWM frequencies, sampling intervals, the time of day. Most parts offer a choice of sources.

| source | frequency | accuracy | start-up | use |
|---|---|---|---|---|
| internal RC oscillator | $4$–$64\,\mathrm{MHz}$ | about $\pm 1\,\%$ at room temperature after factory trim, a few % over temperature | microseconds | default after reset, low cost |
| external quartz crystal | $4$–$50\,\mathrm{MHz}$ | $\pm 10$ to $\pm 50\,\mathrm{ppm}$ | about $1$–$10\,\mathrm{ms}$ | USB, CAN, accurate timing |
| $32.768\,\mathrm{kHz}$ watch crystal | $2^{15}\,\mathrm{Hz}$ | $\pm 20\,\mathrm{ppm}$ typical | up to a second or more | real-time clock, low-power timing |
| internal low-power RC | about $32\,\mathrm{kHz}$ | $\pm 5$ to $\pm 10\,\%$ or worse | fast | watchdog, wake-up timers |

The crystal oscillator is the Pierce circuit of [[electronics-2/oscillators]]: an inverting amplifier on the chip and a crystal with two load capacitors on the board. The $32.768\,\mathrm{kHz}$ frequency is $2^{15}$ cycles per second, so a $15$-stage binary divider produces exactly one pulse per second.

### Phase-locked loops

To run a core at $168\,\mathrm{MHz}$ from an $8\,\mathrm{MHz}$ crystal, the clock controller multiplies the frequency with a **phase-locked loop** (PLL): a voltage-controlled oscillator (VCO) whose output is divided down and compared in phase with the reference; the loop adjusts the VCO until the divided output is locked to the reference, so the VCO runs at an exact multiple of it.

::: proposition PLL output frequency {#prop-pll}
A PLL with input divider $M$, feedback multiplier $N$ and output divider $P$ produces

$$
f_\text{VCO} = f_\text{in}\,\frac{N}{M}, \qquad f_\text{out} = \frac{f_\text{VCO}}{P} = f_\text{in}\,\frac{N}{MP}.
$$ {#eq-pll}

In lock the output has the long-term accuracy of the reference: a crystal error of $x\,\mathrm{ppm}$ appears as the same $x\,\mathrm{ppm}$ in $f_\text{out}$.
:::

::: proof
In lock the phase detector sees two signals of equal frequency: the reference divided by $M$, $f_\text{in}/M$, and the VCO divided by $N$, $f_\text{VCO}/N$. Equating them gives $f_\text{VCO} = N f_\text{in}/M$, and the output divider gives the rest. Since $f_\text{out}$ is a fixed rational multiple of $f_\text{in}$, a fractional error in $f_\text{in}$ appears unchanged in $f_\text{out}$. (The short-term **jitter** of the output depends on the loop filter and the VCO noise, not only on the reference.)
:::

The dividers are not free: the phase detector input $f_\text{in}/M$ and the VCO frequency must each stay inside ranges given in the data sheet (for example $1$–$2\,\mathrm{MHz}$ and $100$–$432\,\mathrm{MHz}$), and some outputs must hit exact frequencies, such as the $48\,\mathrm{MHz}$ that a USB full-speed controller needs.

::: example A clock tree {#ex-clock-tree}
An $8\,\mathrm{MHz}$ crystal feeds a PLL whose phase-detector input must be between $1$ and $2\,\mathrm{MHz}$ and whose VCO must run between $100$ and $432\,\mathrm{MHz}$. The PLL has a main output divider $P \in \{2, 4, 6, 8\}$ for the core and a second divider $Q$ (any integer $2$–$15$) for the USB controller. Choose $M$, $N$, $P$ and $Q$ to get a $168\,\mathrm{MHz}$ core clock and exactly $48\,\mathrm{MHz}$ for USB.
::: solution
Take $M = 8$, so the phase detector runs at $1\,\mathrm{MHz}$, inside its range. The core needs $f_\text{VCO} = 168P\,\mathrm{MHz}$; with $P = 2$ this is $336\,\mathrm{MHz}$, inside the VCO range, so $N = 336$. The USB clock is $336/Q = 48$ when $Q = 7$, an integer in range. Hence $M = 8$, $N = 336$, $P = 2$, $Q = 7$:

$$
f_\text{core} = 8\,\mathrm{MHz}\times\frac{336}{8\times 2} = 168\,\mathrm{MHz}, \qquad f_\text{USB} = 8\,\mathrm{MHz}\times\frac{336}{8\times 7} = 48\,\mathrm{MHz}.
$$

The core clock is then divided again for the peripheral buses (for example by $4$ and $2$, giving $42$ and $84\,\mathrm{MHz}$), and those bus clocks — not the core clock — are what the timers and UARTs count. Getting this chain right is the first step in every timing calculation of [[embedded-systems/timers-interrupts]].
:::
:::

::: warning Accuracy is not resolution
A clock of $168\,\mathrm{MHz}$ resolves time to $6\,\mathrm{ns}$, but if it is derived from the internal RC oscillator it may be $1\,\%$ fast or slow — $14$ minutes a day. A $20\,\mathrm{ppm}$ crystal is wrong by $20\times 10^{-6}\times 86\,400 = 1.7$ seconds a day. Fine resolution says nothing about accuracy; check which oscillator a peripheral is ultimately counting before trusting it for a baud rate, a USB link or a clock that people will read.
:::

::: quiz
A microcontroller runs from its internal RC oscillator, specified at $16\,\mathrm{MHz} \pm 1\,\%$. Which task is most likely to fail?
- [ ] blinking an LED at $1\,\mathrm{Hz}$
- [ ] sampling a temperature sensor every $100\,\mathrm{ms}$
- [x] a USB full-speed device link, whose bit rate must be within $\pm 0.25\,\%$
- [ ] generating a $20\,\mathrm{kHz}$ PWM signal for a motor
::: solution
A $1\,\%$ error is invisible in an LED blink, a sensor interval or a motor PWM frequency. USB full speed tolerates only $\pm 0.25\,\%$ ($2500\,\mathrm{ppm}$), so it needs a crystal — or one of the "crystal-less" schemes in which the chip trims its RC oscillator continuously against the $1\,\mathrm{ms}$ start-of-frame packets sent by the host.
:::
:::

## Reset and start-up

Between the moment the supply rises and the first useful instruction, a lot has to go right. The supply must have reached a voltage at which the logic and flash work, the oscillator must be running, and the core must start from a known state.

::: definition Reset sources {#def-reset}
A microcontroller is held in **reset** — all registers forced to their documented reset values, the core stopped — while any reset source is active, and starts executing when the last one is released. Typical sources are:

1. **power-on reset** (POR), active until the supply has risen above a threshold;
2. **brown-out reset** (BOR), active whenever the supply falls below a (usually programmable) threshold during operation;
3. the external **reset pin** (often called `NRST`, active low), driven by a button, a supervisor chip or a debug probe;
4. the **watchdog** timer, when software fails to service it in time ([[embedded-systems/embedded-system-design]]);
5. a **software reset** requested by the program (on Cortex-M, by writing the `SYSRESETREQ` bit of the system control block).

A reset-cause register records which source caused the last reset, so that the program can tell a power-up from a watchdog recovery.
:::

The brown-out detector deserves emphasis. As a battery runs down, or when a motor stalls and pulls the supply down, the voltage can sag into a range where the core still runs but flash reads and SRAM writes become unreliable. Without a brown-out reset the program may execute corrupted instructions or write garbage to flash; with it, the chip stops cleanly and restarts only when the supply is good again.

On a Cortex-M, the core leaves reset by reading two words from the start of the **vector table**, normally at address `0x00000000`: the first is the initial value of the **main stack pointer**, the second the address of the **reset handler**. The core loads them and jumps; from then on everything is software. The reset handler — the startup code of [[embedded-systems/embedded-programming]] — configures the clocks and flash wait states, copies initialised data to SRAM, zeroes the rest, and calls `main`. Most chips also contain a boot ROM that runs first and, depending on a pin or option bits, either jumps to the user program in flash or starts a built-in bootloader that accepts a new program over a UART or USB.

The reset pin usually has an internal pull-up resistor of a few tens of kilohms, and a capacitor from the pin to ground on the board delays the release of reset after power-up and filters noise. The pin leaves reset when its voltage crosses the input's high threshold.

::: example A reset delay {#ex-reset-delay}
A reset pin has an internal pull-up of $40\,\mathrm{k\Omega}$ to $V_{DD} = 3.3\,\mathrm{V}$ and a $100\,\mathrm{nF}$ capacitor to ground. The pin is released from reset when it rises above $0.7V_{DD}$. Assuming the supply rises instantly, how long after power-up does the program start?
::: solution
The capacitor charges through the pull-up with time constant $\tau = RC = 40\times 10^3 \times 100\times 10^{-9} = 4\,\mathrm{ms}$ (the step response of [[circuits-1/first-order-circuits]]):

$$
v(t) = V_{DD}\left(1 - e^{-t/\tau}\right).
$$

Setting $v = 0.7V_{DD}$ gives $e^{-t/\tau} = 0.3$, so $t = \tau\ln(1/0.3) = 1.204\,\tau = 4.8\,\mathrm{ms}$. The internal pull-up is specified only loosely (often $30$–$50\,\mathrm{k\Omega}$), so the real delay varies by tens of percent; where a precise delay matters, a supervisor chip is used instead.
:::
:::

::: widget plot
f: V*(1 - exp(-x/(R*C/1000))); 0.7*V
x: 0, 30
y: 0, 3.6
sliders: R=40:20:100:5; C=100:10:1000:10; V=3.3:1.8:3.6:0.1
labels: v_\text{NRST}(t); 0.7\,V_{DD}
caption: Voltage on a reset pin (V) against time (ms) after power-up, for a pull-up of $R$ kΩ and a capacitor of $C$ nF. The program starts where the curve crosses the threshold $0.7V_{DD}$, at $t = RC\ln(1/0.3)$. Double $C$ and the delay doubles; change $V_{DD}$ and it does not change at all, because the threshold scales with the supply.
:::

## General-purpose input and output

A **GPIO** pin is a pad on the chip that software can use as a digital input or output. Every pin is connected internally to a small cell: an output driver (a CMOS inverter, [[digital-ic/cmos-inverter]]) that can be enabled or disabled, an input buffer with hysteresis, optional pull-up and pull-down resistors, protection diodes to both supply rails, and multiplexers that route the pin to a peripheral instead of to the GPIO registers.

::: definition GPIO modes {#def-gpio}
A GPIO pin can be configured as:

- a **digital input**, floating (high impedance), with a **pull-up** resistor to $V_{DD}$ or with a **pull-down** resistor to ground, so that an unconnected input has a defined level;
- a **push-pull output**, which drives the pin actively high (through the PMOS transistor) or low (through the NMOS transistor);
- an **open-drain output**, in which only the NMOS transistor is used: the pin is driven low or released, and an external or internal pull-up pulls it high when released;
- an **alternate function**, in which a peripheral (timer, UART, SPI …) controls the pin;
- an **analog** pin, with the digital input buffer disconnected so that it neither loads the signal nor wastes current, for use by an ADC, DAC or comparator.

Software reads the levels of the input pins from an **input data register**, writes the output levels into an **output data register**, and on many parts can set or clear individual outputs atomically through **set/reset** registers.
:::

### Electrical characteristics

The data sheet specifies a GPIO pin by a handful of numbers, which together decide what it can be connected to. For a CMOS microcontroller at $V_{DD} = 3.3\,\mathrm{V}$, typical values are:

| parameter | meaning | typical value |
|---|---|---|
| $V_{IL,\max}$ | highest voltage read as $0$ | $0.3V_{DD} = 0.99\,\mathrm{V}$ |
| $V_{IH,\min}$ | lowest voltage read as $1$ | $0.7V_{DD} = 2.31\,\mathrm{V}$ |
| $V_{hys}$ | Schmitt-trigger hysteresis | $0.1$–$0.2\,\mathrm{V}$ or more |
| $V_{OL,\max}$ | output low at the rated sink current | $0.4\,\mathrm{V}$ at $8\,\mathrm{mA}$ |
| $V_{OH,\min}$ | output high at the rated source current | $V_{DD} - 0.4\,\mathrm{V}$ at $8\,\mathrm{mA}$ |
| $R_{PU}, R_{PD}$ | internal pull resistors | $30$–$50\,\mathrm{k\Omega}$ |
| $I_{\text{pin},\max}$ | absolute maximum per pin | about $\pm 20$–$25\,\mathrm{mA}$ |
| $I_{VDD,\max}$ | total current through all supply pins | about $100$–$150\,\mathrm{mA}$ |

Between $V_{IL}$ and $V_{IH}$ the logic level is undefined; a slowly varying voltage in this range makes the input toggle randomly, and the **hysteresis** of the Schmitt trigger is what stops that: the input switches high at an upper threshold and back low at a lower one ([[electronics-2/oscillators]] uses the same circuit). The output driver is not an ideal voltage source but behaves roughly like one with a series resistance of a few tens of ohms, so the output voltage droops as current increases.

::: algorithm Sizing an LED resistor on a GPIO pin {#alg-led}
1. From the LED data sheet take the forward voltage $V_F$ at the desired current $I_F$ (modern LEDs are bright at $1$–$5\,\mathrm{mA}$).
2. From the MCU data sheet take the output high voltage $V_{OH}$ at that current (for a sourcing connection) or $V_{OL}$ (for a sinking connection, LED from $V_{DD}$ to the pin).
3. Choose $R = (V_{OH} - V_F)/I_F$, or $R = (V_{DD} - V_F - V_{OL})/I_F$ for sinking, and round **up** to a standard value.
4. Check that $I_F$ is within the pin limit, and that the sum over all pins is within the per-port and total supply limits. Above a few milliamperes per pin, or for many LEDs, use a transistor driver ([[embedded-systems/analog-interfaces]]).
:::

::: example An LED on a GPIO pin {#ex-led}
A red LED with $V_F = 2.0\,\mathrm{V}$ at $5\,\mathrm{mA}$ is driven from a $3.3\,\mathrm{V}$ microcontroller pin whose output high level is $3.1\,\mathrm{V}$ at $5\,\mathrm{mA}$. Choose the series resistor, and find the power it dissipates. How much current would flow if the resistor were left out?
::: solution
By [[#alg-led]], $R = (3.1 - 2.0)/0.005 = 220\,\Omega$, a standard E12 value. The resistor dissipates $I^2R = (0.005)^2\times 220 = 5.5\,\mathrm{mW}$, so any small resistor will do.

Without the resistor the current is limited only by the output transistor's resistance and the LED's own dynamic resistance — a few tens of ohms in total across the $1.3\,\mathrm{V}$ excess, so tens of milliamperes, beyond the pin's absolute maximum. The pin may survive for a while, but the output voltage collapses, the chip heats and the pin degrades. Always limit LED current with a resistor.
:::
:::

### Inputs, pull-ups and open drain

A push button between a pin and ground, with the internal pull-up enabled, reads $1$ when released and $0$ when pressed; the current while pressed is only $3.3\,\mathrm{V}/40\,\mathrm{k\Omega} = 83\,\mathrm{\mu A}$. Mechanical contacts **bounce** for a millisecond or more when they close, producing a burst of transitions; the timer-based debouncing of [[embedded-systems/timers-interrupts]] deals with that.

An **open-drain** output can only pull low. Connecting several open-drain outputs to one line with a single pull-up resistor makes a **wired-AND**: the line is high only if every output is released, and any one of them can pull it low. This is how a shared interrupt-request line or the I²C bus of [[embedded-systems/serial-communication]] works, and it also allows level shifting: an open-drain output of a $3.3\,\mathrm{V}$ chip with a pull-up to $5\,\mathrm{V}$ produces a $5\,\mathrm{V}$ signal — provided the pin is specified as **5-V tolerant**.

::: warning Mixed supply voltages
A $3.3\,\mathrm{V}$ output driving a $5\,\mathrm{V}$ CMOS input does not meet $V_{IH} = 0.7\times 5 = 3.5\,\mathrm{V}$; it may work on the bench and fail on a cold morning. In the other direction, a $5\,\mathrm{V}$ signal on a $3.3\,\mathrm{V}$ pin that is not 5-V tolerant forward-biases the pin's upper protection diode and drives current into the $3.3\,\mathrm{V}$ supply — this can power the chip through its I/O pin, damage it, or make it latch up. Use a level-shifter, a resistive divider (for slow signals) or a 5-V-tolerant pin, and check the data sheet's absolute maximum ratings before connecting any pin to anything that is powered separately.
:::

::: quiz
Eight push buttons share one interrupt-request line to a microcontroller, through a single pull-up resistor; each button module pulls the line low when it wants attention. How must the module outputs be configured?
- [ ] push-pull outputs, so that the line is driven firmly in both directions
- [x] open-drain outputs, forming a wired-AND with the pull-up
- [ ] analog pins
- [ ] inputs with pull-downs
::: solution
If two push-pull outputs disagree — one driving high, one low — they short-circuit the supply through their transistors. Open-drain outputs can only pull low; with one pull-up the line is high when all are released and low when any is active, so no conflict is possible. The microcontroller then reads each module to find out which one asked.
:::
:::

### Alternate functions and pin multiplexing

A $64$-pin microcontroller may have fifty I/O pins but well over a hundred peripheral signals: several UARTs, SPI and I²C ports, dozens of timer channels, ADC inputs. Each pin therefore has a multiplexer that selects among a few alternate functions, and choosing the **pin assignment** is a genuine design task: two peripherals the product needs may only be available on the same pin, or a timer channel needed for PWM may share a pin with the only free UART. Vendors supply configuration tools that check the assignment; it must be settled before the circuit board is laid out, because changing it afterwards means a new board.

::: application Pin budgets in a real product
A small brushless-motor controller needs six PWM outputs from one advanced timer (three half-bridges with complementary outputs), three ADC inputs for phase currents and one for the supply voltage, three Hall-sensor inputs on a timer in capture mode, a CAN interface (two pins), a UART for debugging, the two Serial Wire Debug pins, a reset pin and a crystal (two pins). That is already over twenty pins with tight constraints on which pin can do what. Designers commonly lay out such a board with the vendor's pin-planning tool open next to the schematic, and choose a package with spare pins for the changes that always come.
:::

::: history
The single-chip microcontroller grew out of the calculator industry of the early 1970s. At Texas Instruments, Gary Boone and Michael Cochran built a calculator chip with processor, program ROM and data RAM on one die around 1971, and TI marketed the general-purpose 4-bit TMS1000 from 1974; it went into toys, appliances and calculators in very large numbers. Intel followed with the 8048 (1976) and the 8051 (1980), whose architecture is still licensed and embedded in chips today. Flash-based, in-system-programmable 8-bit parts such as Microchip's PIC and Atmel's AVR (introduced in the late 1990s) made it possible to reprogram a product on the board. In 2004 Arm announced the Cortex-M3, the first of a family of 32-bit cores with a standard memory map and interrupt controller designed for microcontrollers, and by the 2010s 32-bit microcontrollers cost little more than 8-bit ones. Since the late 2010s, RISC-V cores have appeared in microcontrollers alongside Arm.
:::

## Choosing a microcontroller

With hundreds of families on the market, selection is a matter of eliminating candidates. The questions, roughly in order:

1. **Peripherals and pins.** Which interfaces, how many timer channels and ADC inputs, which package? This usually eliminates most candidates at once.
2. **Memory.** Program size plus a margin of at least $50\,\%$ for growth and field updates (a bootloader and two firmware images double the flash requirement); RAM for buffers, stacks and the RTOS.
3. **Performance.** Clock rate, core type, floating-point unit, DSP instructions, DMA — estimated from the most demanding loop ([[embedded-systems/real-time-systems]]).
4. **Power.** Run current per megahertz and, for battery products, sleep currents and wake-up times ([[embedded-systems/embedded-system-design]]).
5. **Ecosystem and supply.** Compilers, debuggers, libraries, documentation quality, long-term availability and price at volume.

The cheapest part that does the job is not always right: a family with larger pin-compatible members lets the design grow without a new board.

## Where this leads

The rest of the course works outward from the GPIO pin. [[embedded-systems/embedded-programming]] shows how C accesses the registers of this chapter, what the startup code does and how a program becomes a flash image. [[embedded-systems/timers-interrupts]] builds on the clock tree to generate precise timing, PWM and interrupts; [[embedded-systems/serial-communication]] uses alternate-function pins and open-drain lines for UART, SPI, I²C and CAN; [[embedded-systems/analog-interfaces]] uses the analog pin mode for sensors and the output drivers for actuators. Reset sources and brown-out detection return in [[embedded-systems/embedded-system-design]] as tools for building systems that recover from faults.

::: summary
- A microcontroller ([[#def-mcu]]) integrates a core, flash, SRAM, clocks, reset, interrupt controller and peripherals on one chip; memory, not speed, is usually the limiting resource.
- Every memory and register has an address in the memory map ([[#def-memory-map]]); peripherals are reached through base addresses and register offsets, and bit fields are changed by read–modify–write or atomically through set/reset registers or bit-band aliases ([[#prop-bitband]]).
- Flash needs $\lceil f t_\text{acc}\rceil - 1$ wait states ([[#prop-wait-states]]); wide lines, prefetch and caches hide them, and the wait states must be set before the clock is raised.
- Clocks come from RC oscillators (about $1\,\%$) or crystals (tens of ppm); a PLL gives $f_\text{out} = f_\text{in}N/(MP)$ with the accuracy of its reference ([[#prop-pll]]).
- Reset ([[#def-reset]]) comes from power-on, brown-out, the reset pin, the watchdog or software; a Cortex-M core starts by loading its stack pointer and reset vector from the vector table.
- GPIO pins ([[#def-gpio]]) are inputs (with optional pull resistors and hysteresis), push-pull or open-drain outputs, alternate functions or analog pins; respect $V_{IL}$, $V_{IH}$, the drive limits and the absolute maximum ratings, and limit LED currents with resistors ([[#alg-led]]).
:::

## Exercises

::: exercise A PLL setting {level=1 check="168e6"}
A $12\,\mathrm{MHz}$ crystal drives a PLL with $M = 6$, $N = 168$ and $P = 2$. What is the core clock frequency, in hertz? Is the phase detector input inside a range of $1$–$2\,\mathrm{MHz}$?
::: solution
By [[#eq-pll]], $f_\text{VCO} = 12\,\mathrm{MHz}\times 168/6 = 336\,\mathrm{MHz}$ and $f_\text{out} = 336/2 = 168\,\mathrm{MHz}$. The phase detector sees $12/6 = 2\,\mathrm{MHz}$, at the top of the allowed range.
:::
:::

::: exercise An LED resistor {level=1 check="250"}
A green LED needs $4\,\mathrm{mA}$ at $V_F = 2.1\,\mathrm{V}$. The microcontroller's output high voltage at $4\,\mathrm{mA}$ is $3.1\,\mathrm{V}$. What series resistance, in ohms, gives exactly $4\,\mathrm{mA}$? Which E12 value would you fit?
::: solution
$R = (3.1 - 2.1)/0.004 = 250\,\Omega$. The neighbouring E12 values are $220\,\Omega$ (current $1.0/220 = 4.5\,\mathrm{mA}$) and $270\,\Omega$ ($3.7\,\mathrm{mA}$). Either is acceptable; $270\,\Omega$ stays below the target current, which is the safer choice if $4\,\mathrm{mA}$ is a limit rather than a target.
:::
:::

::: exercise Clock drift {level=1 check="129.6"}
A data logger keeps time with a $32.768\,\mathrm{kHz}$ crystal accurate to $50\,\mathrm{ppm}$. In the worst case, by how many seconds can its clock be wrong after $30$ days?
::: solution
$50\times 10^{-6}\times 30\times 86\,400\,\mathrm{s} = 129.6\,\mathrm{s}$, a little over two minutes. Most of a watch crystal's error is a parabolic dependence on temperature, so a logger in a cold shed drifts more than one on a desk; real-time clocks offer a digital calibration register to trim it.
:::
:::

::: exercise Maximum clock for given wait states {level=2 check="75e6"}
A flash array has a read access time of $40\,\mathrm{ns}$. What is the highest core clock frequency, in hertz, at which it can be read with $2$ wait states?
::: solution
With $W = 2$ an access has $3$ cycles, and we need $3/f \ge 40\,\mathrm{ns}$, so $f \le 3/(40\times 10^{-9}) = 75\,\mathrm{MHz}$. Data sheets quote slightly lower limits because the access time grows at high temperature and low supply voltage.
:::
:::

::: exercise A bit-band address {level=2}
Using [[#eq-bitband]], find the alias address that controls bit $7$ of the byte at `0x20001004`. Write the C expression that sets this bit through the alias, assuming `0x20001004` is in the bit-band region.
::: solution
The offset is `0x1004`; $32\times$ `0x1004` $=$ `0x20080`, and $4\times 7 = 28 =$ `0x1C`. The alias is `0x22000000 + 0x20080 + 0x1C = 0x2202009C`. In C: `*(volatile uint32_t *)0x2202009Cu = 1u;` — a single word store that changes only that bit, with no read–modify–write.
:::
:::

::: exercise Reading a 5 V sensor {level=2}
A sensor with a $5\,\mathrm{V}$ push-pull digital output must be read by a $3.3\,\mathrm{V}$ microcontroller pin that is not 5-V tolerant, with $V_{IH} = 0.7V_{DD}$. (a) Design a resistive divider using standard values from $1$–$10\,\mathrm{k\Omega}$. (b) What is the high level, and does it meet $V_{IH}$ with margin? (c) Why is this solution unsuitable for a $10\,\mathrm{MHz}$ signal?
::: solution
(a) A divider with $1.8\,\mathrm{k\Omega}$ in series and $3.3\,\mathrm{k\Omega}$ to ground gives $5\times 3.3/(1.8 + 3.3) = 3.24\,\mathrm{V}$. (b) $3.24\,\mathrm{V}$ is above $V_{IH} = 2.31\,\mathrm{V}$ by almost a volt and below $V_{DD} = 3.3\,\mathrm{V}$, so the protection diode does not conduct. (c) The pin's input capacitance (say $5$–$10\,\mathrm{pF}$) and stray capacitance form a low-pass filter with the Thévenin resistance of the divider, $1.8\parallel 3.3 = 1.16\,\mathrm{k\Omega}$: $\tau \approx 1.16\,\mathrm{k\Omega}\times 10\,\mathrm{pF} = 12\,\mathrm{ns}$, comparable to the $50\,\mathrm{ns}$ half-period of a $10\,\mathrm{MHz}$ signal. Edges are smeared and the timing becomes unreliable. A buffer with a $5$-V-tolerant input powered from $3.3\,\mathrm{V}$, or a dedicated level-translator chip, is needed.
:::
:::

::: exercise A current budget {level=2}
A $3.3\,\mathrm{V}$ microcontroller has an absolute maximum of $25\,\mathrm{mA}$ per pin and $120\,\mathrm{mA}$ total through its supply pins. The core and peripherals draw $35\,\mathrm{mA}$. The designer wants to drive $16$ LEDs directly at $5\,\mathrm{mA}$ each. Is this within the limits? What if they are $10\,\mathrm{mA}$ LEDs?
::: solution
At $5\,\mathrm{mA}$: $16\times 5 = 80\,\mathrm{mA}$ plus $35\,\mathrm{mA}$ is $115\,\mathrm{mA}$ — within $120\,\mathrm{mA}$ but with almost no margin, and absolute maximum ratings are not operating conditions. Data sheets usually also limit the current per group of pins, which must be checked. At $10\,\mathrm{mA}$: $195\,\mathrm{mA}$, far over the limit. Use an LED driver chip or transistors, or multiplex the LEDs so that only a few are on at any instant.
:::
:::

::: exercise Choosing a reset capacitor {level=3 check="10e-3/(40e3*ln(1/0.3))"}
A reset pin has a $40\,\mathrm{k\Omega}$ pull-up and releases reset at $0.7V_{DD}$. What is the smallest capacitance, in farads, that keeps the chip in reset for at least $10\,\mathrm{ms}$ after an instantaneous power-up? If the pull-up can be anywhere between $30$ and $50\,\mathrm{k\Omega}$, which standard capacitor value guarantees the delay?
::: hint
Solve $V_{DD}(1 - e^{-t/RC}) = 0.7V_{DD}$ for $C$, and use the smallest resistance for the guarantee.
:::
::: solution
From [[#ex-reset-delay]], $t = RC\ln(1/0.3)$, so $C = t/(R\ln(1/0.3)) = 10^{-2}/(40\times 10^3\times 1.204) = 208\,\mathrm{nF}$. To guarantee the delay with the weakest-case resistance $30\,\mathrm{k\Omega}$ (which charges the capacitor fastest), $C \ge 10^{-2}/(30\times 10^3\times 1.204) = 277\,\mathrm{nF}$; the next E6 value is $330\,\mathrm{nF}$, giving between $11.9$ and $19.9\,\mathrm{ms}$ over the resistor's range. (Capacitor tolerance, typically $\pm 10\,\%$, would add to the spread, and a real supply ramps rather than steps, which lengthens the delay further.)
:::
:::

::: exercise Charlieplexing {level=3 check="20"}
With $n$ tri-state GPIO pins (each can drive high, drive low or be an input), LEDs can be connected between every ordered pair of pins: an LED from pin $a$ to pin $b$ lights when $a$ is high, $b$ is low and every other pin is an input. Show that $n$ pins can control $n(n-1)$ LEDs one at a time, and find how many LEDs five pins can control. Why can only one LED (or a few) be lit at a time, and how is a pattern displayed?
::: solution
An LED is identified by the ordered pair (anode pin, cathode pin) with $a \ne b$: $n$ choices for $a$ and $n - 1$ for $b$, so $n(n-1)$ LEDs — two LEDs in antiparallel for each of the $\binom{n}{2}$ unordered pairs. With $n = 5$, $5\times 4 = 20$ LEDs.

Driving $a$ high and $b$ low lights the $a\to b$ LED; LEDs between $a$ and a floating pin $c$ are in series with another LED from $c$ to $b$, which needs about $2V_F$, more than the supply provides, so they stay dark (this requires $2V_F > V_{DD}$, true for most LEDs at $3.3\,\mathrm{V}$). Lighting two arbitrary LEDs at once would generally light unintended ones too. A pattern is therefore displayed by **multiplexing**: lighting one LED (or one row) at a time in rapid succession, above about $100\,\mathrm{Hz}$ per LED so that the eye sees steady light; each LED's average brightness falls with the number of time slots, which the current setting must compensate within the pin limits.
:::
:::

::: exercise Wait states and real speed {level=3}
A Cortex-M4 at $168\,\mathrm{MHz}$ runs from flash with $t_\text{acc} = 30\,\mathrm{ns}$, using $128$-bit lines and a prefetch buffer, and a 1 KiB instruction cache. A benchmark loop of $40$ instructions runs at one instruction per cycle when it fits in the cache. (a) How many wait states are needed? (b) Estimate the slowdown of a large program in which, on average, one in eight instructions is a taken branch whose target misses the cache. (c) Why might copying a time-critical interrupt handler to SRAM be worthwhile?
::: solution
(a) $f t_\text{acc} = 168\times 10^6\times 30\times 10^{-9} = 5.04$, so $6$ cycles per access: $W = 5$ wait states.

(b) Each such branch stalls for roughly the $5$ wait cycles of a fresh line fetch (plus the normal branch refill, which the cache case pays too). One taken missing branch per $8$ instructions adds about $5/8 = 0.63$ cycles per instruction, so a CPI of about $1.6$ instead of $1$: roughly $40\,\%$ slower ($1/1.63 = 0.62$ of the cached speed). Real cores and caches differ, but the order of magnitude is right, and it is why vendors add flash accelerators and caches.

(c) In SRAM the handler executes without wait states and without depending on the state of the flash cache, so its execution time is both shorter and — more important for real-time work — repeatable, independent of what code ran before the interrupt.
:::
:::
