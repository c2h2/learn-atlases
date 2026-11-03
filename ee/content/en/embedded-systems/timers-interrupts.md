A microcontroller program that controls something physical is mostly about *time*. A motor controller updates its PWM outputs $20\,000$ times a second; an audio player must deliver a sample every $22.7\,\mathrm{\mu s}$, not one more or less; a heart-rate monitor timestamps each beat to the millisecond; a button must be read without being fooled by its contacts bouncing. Software alone cannot keep time well — the duration of a loop depends on the compiler, the flash wait states and whatever interrupts happen to occur. Microcontrollers therefore contain **hardware timers**: counters clocked from a known frequency, which run independently of the program and can raise interrupts, capture the time of an external event, or switch an output pin at a precise instant.

The partner of the timer is the **interrupt**. [[computer-architecture/input-output]] described the mechanism: a device asserts a request, the processor finishes the current instruction, saves its state and runs a handler. This chapter is about using it on a microcontroller: how the Cortex-M interrupt controller prioritises and nests interrupts, how long a response takes in the worst case, how to write handlers that are short and correct, and how to share data between a handler and the main program without races. The third topic is **pulse-width modulation** (PWM), the timer function by which a digital pin controls the brightness of an LED, the speed of a motor or the output of a power converter.

The examples use the conventions of the common Cortex-M parts: up-counting timers with a prescaler register `PSC` and an auto-reload register `ARR`. Other families name these registers differently but work the same way; the formulas carry over unchanged.

## Hardware timers

::: definition Timer {#def-timer}
A **timer** (or timer/counter) is an $n$-bit counter register `CNT` clocked by a **tick** derived from a timer clock $f_\text{clk}$ through a programmable **prescaler**, $f_\text{tick} = f_\text{clk}/(\text{PSC}+1)$. In **up-counting** mode it counts $0, 1, \dots, \text{ARR}$ and then returns to $0$, an event called an **update** (or overflow), which can set a flag, raise an interrupt or trigger another peripheral. The **auto-reload** value ARR satisfies $0 \le \text{ARR} \le 2^n - 1$. Each timer also has **channels**, each with a register `CCR` used for **output compare** (do something when `CNT` equals `CCR`) or **input capture** (copy `CNT` into `CCR` when an edge occurs on a pin).
:::

The counter widths in common use are $16$ and $32$ bits; the Cortex-M **SysTick** timer, built into the core, is a $24$-bit down-counter intended for the periodic "tick" of an operating system.

::: proposition Timer period {#prop-timer-period}
A timer with prescaler PSC and auto-reload ARR, clocked at $f_\text{clk}$, produces update events with period and frequency

$$
T_\text{upd} = \frac{(\text{PSC}+1)(\text{ARR}+1)}{f_\text{clk}}, \qquad f_\text{upd} = \frac{f_\text{clk}}{(\text{PSC}+1)(\text{ARR}+1)}.
$$ {#eq-timer-period}

Its time resolution is one tick, $(\text{PSC}+1)/f_\text{clk}$, and the longest interval an $n$-bit counter can span without overflow is $2^n(\text{PSC}+1)/f_\text{clk}$.
:::

::: proof
The prescaler is itself a counter that divides by $\text{PSC}+1$: it emits one tick every $\text{PSC}+1$ timer-clock cycles. The main counter passes through the $\text{ARR}+1$ states $0, 1, \dots, \text{ARR}$ before the update, one per tick. A full cycle therefore takes $(\text{PSC}+1)(\text{ARR}+1)$ clock cycles of duration $1/f_\text{clk}$. With the largest $\text{ARR} = 2^n - 1$, the cycle has $2^n$ ticks.
:::

The "$+1$"s are the most common source of off-by-one errors in timer code: a prescaler value of $0$ divides by one, and an auto-reload of $999$ gives a period of $1000$ ticks.

::: algorithm Choosing PSC and ARR {#alg-psc-arr}
To obtain an update frequency $f$ from an $n$-bit timer clocked at $f_\text{clk}$:

1. Compute the total division $N = f_\text{clk}/f$. If it is not an integer, the frequency cannot be met exactly; round $N$ to the nearest integer and compute the error.
2. Choose the prescaler so that the counter fits: $\text{PSC}+1 \ge N/2^n$. Use the **smallest** such value when fine resolution (for PWM or capture) matters, or a value that makes $f_\text{tick}$ a round number (such as $1\,\mathrm{MHz}$) when readable tick counts matter.
3. Prefer a factorisation $N = (\text{PSC}+1)(\text{ARR}+1)$ with integer factors; if none exists with $\text{PSC}+1$ in range, accept $\text{ARR}+1 = \operatorname{round}(N/(\text{PSC}+1))$ and compute the error.
4. Remember that $f_\text{clk}$ is the **timer's** clock, which on many parts is the peripheral-bus clock (sometimes doubled when the bus prescaler is not $1$) — not the core clock.
:::

::: example A 1 kHz tick and a servo signal {#ex-timer-config}
A $16$-bit timer is clocked at $84\,\mathrm{MHz}$. (a) Configure it for a $1\,\mathrm{kHz}$ update interrupt. (b) Configure it for a hobby-servo signal: period $20\,\mathrm{ms}$ ($50\,\mathrm{Hz}$), pulse width adjustable from $1.0$ to $2.0\,\mathrm{ms}$ with at least $500$ steps.
::: solution
(a) $N = 84\times 10^6/1000 = 84\,000 > 65\,536$, so the prescaler must divide by at least $84\,000/65\,536 = 1.28$, i.e. by $2$. With $\text{PSC} = 1$: $\text{ARR}+1 = 42\,000$, $\text{ARR} = 41\,999$. An alternative with a readable tick is $\text{PSC} = 83$ ($f_\text{tick} = 1\,\mathrm{MHz}$, $1\,\mathrm{\mu s}$ per count) and $\text{ARR} = 999$. Both give exactly $1\,\mathrm{kHz}$ by [[#eq-timer-period]].

(b) $N = 84\times 10^6\times 0.020 = 1.68\times 10^6$, so $\text{PSC}+1 \ge 1.68\times 10^6/65\,536 = 25.6$. Choosing $\text{PSC} = 83$ gives a $1\,\mathrm{MHz}$ tick and $\text{ARR} = 19\,999$. A PWM channel then outputs a pulse of `CCR` microseconds: $\text{CCR} = 1000$ to $2000$, which is $1001$ distinct settings over the servo's range, comfortably more than $500$. (With $\text{PSC} = 25$, $f_\text{tick} = 3.23\,\mathrm{MHz}$, the resolution would be three times finer, but $N/26$ is not an integer: $\text{ARR}+1 = 64\,615$ gives $19.99995\,\mathrm{ms}$, an error that no servo would notice.)
:::
:::

::: example An audio sample clock {#ex-audio-rate}
A timer clocked at $72\,\mathrm{MHz}$ must trigger a DAC at the CD sample rate $44.1\,\mathrm{kHz}$. What is the closest achievable rate, and its error?
::: solution
$N = 72\times 10^6/44\,100 = 1632.65$, not an integer. With $\text{PSC} = 0$ the best choice is $\text{ARR}+1 = 1633$, giving $72\times 10^6/1633 = 44\,090.6\,\mathrm{Hz}$, an error of $-0.021\,\%$ ($-212\,\mathrm{ppm}$). Over a three-minute song the player would finish $38\,\mathrm{ms}$ late, inaudible; but if the samples arrive from a source running at exactly $44.1\,\mathrm{kHz}$ — a USB host, for instance — the buffer gains $9.4$ samples per second and eventually overflows. This is why audio systems use a clock that is an exact multiple of the sample rate ($11.2896\,\mathrm{MHz} = 256\times 44.1\,\mathrm{kHz}$), a fractional PLL, or an asynchronous sample-rate converter.
:::
:::

### Input capture and measuring time

In **input capture** mode, an edge on the channel's pin copies the counter into `CCR` and sets a flag, so the program learns the time of the edge to one tick, however late it gets round to reading it. Subtracting two captures gives a period or pulse width. Since the counter wraps, the subtraction must be done in modular arithmetic — and the hardware's unsigned arithmetic does exactly that, provided the interval is shorter than the counter's range.

::: theorem Elapsed time with a wrapping counter {#thm-wrap}
Let a counter count ticks modulo $2^n$, and let $a$ and $b$ be its values at two instants separated by $\Delta$ ticks, where $0 \le \Delta < 2^n$. Then

$$
\Delta = (b - a) \bmod 2^n,
$$ {#eq-wrap}

which in C is computed by the unsigned subtraction `(uint16_t)(b - a)` for $n = 16$, or `b - a` on `uint32_t` values for $n = 32$.
:::

::: proof
If the first value is the true count $A$ reduced modulo $2^n$, the second is $b = (A + \Delta) \bmod 2^n$, so $b - a \equiv \Delta \pmod{2^n}$. Since $0 \le \Delta < 2^n$, $\Delta$ is the unique representative of this residue class in $[0, 2^n)$, which is what $\bmod\, 2^n$ returns. C's unsigned arithmetic is defined to be modulo $2^w$ for a type of width $w$; for $w = n$ it gives the result directly, and for narrower counters held in wider types the cast to the counter's width (or a mask with $2^n - 1$) performs the reduction.
:::

For example a $16$-bit capture of $65\,000$ followed by one of $1500$ means $(1500 - 65\,000) \bmod 65\,536 = 2036$ ticks elapsed, across one wrap. If the interval can exceed $2^n$ ticks the result is silently wrong by a multiple of $2^n$; the software must then also count overflows, or use a slower tick or a wider counter.

::: widget modular
n: 16
mode: clock
a: 13
caption: A 4-bit counter as clock arithmetic modulo $16$. Starting at $a = 13$, add an interval $b$: for $b = 9$ the counter wraps through $0$ and ends at $6$, and $6 - 13 \equiv 9 \pmod{16}$ recovers the interval, as [[#thm-wrap]] says. Make $b$ larger than $15$ and the interval can no longer be recovered — the counter has lapped itself.
:::

::: example Measuring a frequency {#ex-capture}
A $16$-bit timer runs at $f_\text{tick} = 1\,\mathrm{MHz}$ and captures rising edges of a signal. (a) What is the resolution of a single-period measurement of a $1\,\mathrm{kHz}$ signal, and of a $50\,\mathrm{kHz}$ signal? (b) What is the lowest frequency that can be measured without counting overflows? (c) How can the $50\,\mathrm{kHz}$ measurement be improved?
::: solution
(a) The period of $1\,\mathrm{kHz}$ is $1000$ ticks; an uncertainty of $\pm 1$ tick is $\pm 0.1\,\%$. At $50\,\mathrm{kHz}$ the period is only $20$ ticks, and $\pm 1$ tick is $\pm 5\,\%$: the frequency is known only to lie between about $47.6$ and $52.6\,\mathrm{kHz}$.

(b) The interval must be below $2^{16} = 65\,536$ ticks, $65.5\,\mathrm{ms}$: the frequency must exceed $15.3\,\mathrm{Hz}$.

(c) Use a faster tick (at $84\,\mathrm{MHz}$ the period is $1680$ ticks, $\pm 0.06\,\%$), or measure the time of $k$ periods — for instance using the channel's input prescaler, which captures only every $8$th edge — and divide by $k$. Averaging over a longer time is the general principle: a frequency counter's resolution improves in proportion to its measurement time.
:::
:::

## Interrupts on a microcontroller

The trap mechanism of [[computer-architecture/input-output#alg-trap]] was described for RISC-V; Cortex-M microcontrollers implement the same idea with features that make interrupt handlers cheap enough to use for almost everything.

::: definition Nested vectored interrupt controller {#def-nvic}
The **NVIC** of a Cortex-M core receives up to several hundred interrupt request lines from the peripherals. Each interrupt has an **enable** bit, a **pending** bit and a programmable **priority** (lower number = more urgent; typically $3$ or $4$ bits are implemented, giving $8$ or $16$ levels). When an enabled interrupt becomes pending and its priority is higher than that of the code currently running, the core takes the exception:

1. it pushes eight registers — `R0`–`R3`, `R12`, `LR`, `PC` and `xPSR` — onto the stack (more if floating-point state must be saved);
2. it fetches the handler's address from the **vector table** entry for that interrupt;
3. it loads `LR` with a special **EXC_RETURN** value and starts the handler.

A handler returns with an ordinary function return; when the core sees EXC_RETURN loaded into the program counter, it pops the saved registers and resumes the interrupted code. A higher-priority interrupt can **preempt** a running handler (nesting); a pending interrupt of equal or lower priority waits.
:::

Because the hardware saves exactly the registers that the C calling convention lets a function overwrite, an interrupt handler is an ordinary C function with no special keywords:

```c
void TIM2_IRQHandler(void)        /* name must match the vector table */
{
    if (TIM2->SR & TIM_SR_UIF) {  /* update event?                     */
        TIM2->SR = ~TIM_SR_UIF;   /* clear the flag first (rc_w0 bit)  */
        ms_ticks++;               /* volatile uint32_t                 */
    }
}
```

(The register names are those of a typical vendor header; the flag here is cleared by writing $0$ to it and $1$ to the other bits, a convention to check in each reference manual.) The NVIC also shortens sequences of interrupts: **tail-chaining** runs a pending handler straight after the current one without restoring and re-saving the registers, and **late arrival** lets a higher-priority request that arrives during stacking use the stacking already in progress.

::: warning Clear the flag — early
The NVIC remembers that a peripheral *requested* an interrupt, but the request line stays asserted as long as the peripheral's flag is set. A handler that forgets to clear the flag returns and is immediately entered again, for ever: the main program stops. A subtler version: if the flag is cleared by the *last* write in the handler, the write may still be in the bus's write buffer when the handler returns, the request line is still high, and the handler runs a second, spurious time. Clear the flag at the start of the handler, or read the register back after clearing it so that the write is complete before returning.
:::

### Latency

::: proposition Worst-case interrupt latency {#prop-latency}
The time from an interrupt request to the first instruction of its handler is at most

$$
L_{\max} = t_\text{entry} + t_\text{mask,max} + \sum_{j \in \text{hp}} t_j ,
$$ {#eq-latency}

where $t_\text{entry}$ is the hardware response time (on Cortex-M3 and M4, $12$ clock cycles with zero-wait-state memory; $15$ on M0+ and $16$ on M0), $t_\text{mask,max}$ is the longest interval during which the software masks this interrupt (a critical section, or a handler of equal or higher priority already running), and the sum covers the execution times of higher-priority handlers that may arrive in the meantime (each counted as many times as it can occur in the interval).
:::

::: proof
After the request, the interrupt is taken as soon as (i) it is not masked and (ii) no code of higher or equal priority is running, and then the hardware needs $t_\text{entry}$ to stack and fetch the vector. The first condition can be delayed by at most the longest masked region; the second by the handlers of higher priority that are running or arrive before ours starts, and by at most one handler of equal priority that was already running (included in $t_\text{mask,max}$). Adding the delays bounds the total. Wait states, bus contention with DMA and the completion of a multi-cycle instruction (Cortex-M abandons and restarts most long instructions to keep latency low) add a few cycles.
:::

::: example A latency budget {#ex-latency}
A motor-control interrupt on a $100\,\mathrm{MHz}$ Cortex-M4 must start within $5\,\mathrm{\mu s}$ of its request. The longest critical section in the program, during which all interrupts are disabled, is $200$ cycles. One higher-priority interrupt exists: a $1\,\mathrm{\mu s}$ fault handler that can occur at most once in any $5\,\mathrm{\mu s}$ window. Is the requirement met? What if the critical section grows to $350$ cycles?
::: solution
By [[#eq-latency]], $L_{\max} = 12 + 200$ cycles $+ 1\,\mathrm{\mu s} = 2.12\,\mathrm{\mu s} + 1\,\mathrm{\mu s} = 3.12\,\mathrm{\mu s}$, within the $5\,\mathrm{\mu s}$ budget. With a $350$-cycle critical section, $L_{\max} = 3.62 + 1 = 4.62\,\mathrm{\mu s}$, still within budget but with little margin. A practical rule: keep interrupts disabled for at most a few microseconds, and never around a loop whose length depends on data.
:::
:::

### Interrupt load

A periodic interrupt at rate $f_\text{irq}$ whose handler takes $C$ cycles (including entry and exit) consumes a fraction

$$
U_\text{irq} = \frac{f_\text{irq}\, C}{f_\text{CPU}}
$$ {#eq-irq-load}

of the processor, exactly as in [[computer-architecture/input-output#prop-iocost]]. A $20\,\mathrm{kHz}$ control interrupt of $150$ cycles plus about $24$ cycles of entry and exit on a $72\,\mathrm{MHz}$ core costs $20\times 10^3\times 174/(72\times 10^6) = 4.8\,\%$. The same handler at $200\,\mathrm{kHz}$ would cost almost half the processor, and at a rate where $U_\text{irq} > 1$ the processor never returns to the main program. This is the reason for DMA and for peripherals that do more work by themselves.

## Writing correct handlers

The rules for interrupt handlers follow from two facts: a handler delays everything of lower priority while it runs, and it can run between any two instructions of the interrupted code.

1. **Keep handlers short.** Do the time-critical part (read the data register, clear the flag, capture the timestamp), and defer the rest to the main loop or a task by setting a flag or putting data in a queue.
2. **Never wait in a handler** — no busy-waiting for another peripheral, no `printf` to a slow UART, no blocking RTOS calls.
3. **Declare shared variables `volatile`** ([[embedded-systems/embedded-programming#def-volatile]]).
4. **Protect multi-step accesses to shared data** with a critical section or an atomic operation.

::: definition Critical section {#def-critical}
A **critical section** is a sequence of instructions that must execute without interference from other code that accesses the same data. On a single-core microcontroller the simplest implementation masks interrupts on entry and restores the previous mask on exit; on Cortex-M, the CMSIS functions `__get_PRIMASK()`, `__disable_irq()` and `__set_PRIMASK()` do this. Restoring the *previous* state, rather than unconditionally re-enabling, allows critical sections to nest safely.
:::

```c
static inline uint32_t irq_save(void)    { uint32_t m = __get_PRIMASK(); __disable_irq(); return m; }
static inline void irq_restore(uint32_t m) { __set_PRIMASK(m); }

volatile uint32_t rx_count;               /* incremented in the UART handler  */

void consume_one(void)
{
    uint32_t m = irq_save();
    rx_count--;                           /* load, subtract, store: protected  */
    irq_restore(m);
}
```

Masking all interrupts is a blunt tool, since it adds to the latency of every interrupt ([[#prop-latency]]). Cortex-M3 and later cores can instead raise the **BASEPRI** register to mask only interrupts below a chosen priority, leaving the most urgent ones untouched, and they have load-exclusive/store-exclusive instructions with which atomic increments and lock-free queues are built ([[embedded-systems/real-time-systems]]).

::: example Reading a 64-bit tick count {#ex-torn-read}
A timer interrupt increments a `volatile uint64_t ticks` every microsecond on a $32$-bit core. Show how the main program can read a torn value, and give a correct way to read it without disabling interrupts.
::: solution
A $64$-bit load is two $32$-bit loads. Suppose `ticks` $= 0x0000\,0000\,FFFF\,FFFF$; the program loads the low word (`0xFFFFFFFF`), the interrupt fires and increments `ticks` to $0x0000\,0001\,0000\,0000$, and the program loads the high word (`0x00000001`). It has read $0x0000\,0001\,FFFF\,FFFF$ — about $71.6$ minutes in the future.

Without masking interrupts, read the high word, then the low word, then the high word again, and retry if the two high words differ:

```c
uint64_t read_ticks(void)
{
    uint32_t hi, lo;
    do {
        hi = ticks_hi;          /* volatile uint32_t halves, updated by the ISR */
        lo = ticks_lo;
    } while (hi != ticks_hi);   /* the ISR changed the high word: try again    */
    return ((uint64_t)hi << 32) | lo;
}
```

On a single core the handler runs to completion between two of the main program's loads, so if a carry into the high word happens anywhere between the first and the third read, the two values of `hi` differ and the loop tries again; if no carry happens, `hi` and `lo` belong together. A simpler alternative, often better, is to keep a $32$-bit hardware timer free-running at $1\,\mathrm{MHz}$ and extend it to $64$ bits in software only when needed.
:::
:::

::: quiz
A handler for a received-byte interrupt reads the byte, then formats and sends a debug message over a second UART at $115\,200$ baud with a polling `printf`, then returns. What is the main problem?
- [ ] the handler should be declared with a special `interrupt` keyword
- [x] the handler busy-waits for about a millisecond while the debug message is sent, delaying all lower-priority interrupts and possibly losing further received bytes
- [ ] the received byte must be read last
- [ ] handlers cannot call functions
::: solution
At $115\,200$ baud a byte takes $87\,\mathrm{\mu s}$, so a $12$-character message takes about $1\,\mathrm{ms}$, during which the handler blocks everything of equal or lower priority — including its own next interrupt, so bytes arriving faster than that are lost. Handlers can call functions, and on Cortex-M are ordinary C functions; the fix is to put the byte in a buffer and print from the main loop.
:::
:::

### Debouncing with a timer

A mechanical switch bounces for a millisecond or more when it closes or opens. If the switch pin raises an interrupt on each edge, a single press can produce tens of interrupts. The robust approach is to **sample** the pin from a periodic timer interrupt (every $1$–$10\,\mathrm{ms}$) and accept a new state only after it has been seen in several consecutive samples:

```c
#define DEBOUNCE_SAMPLES 4u
static uint8_t  stable = 1, count = 0;     /* button idles high (pull-up) */
volatile bool   pressed_event;

void tick_5ms(void)                          /* called from a 5 ms timer interrupt */
{
    uint8_t raw = (GPIOA->IDR >> 3) & 1u;    /* button on pin 3 */
    if (raw == stable) { count = 0; return; }
    if (++count >= DEBOUNCE_SAMPLES) {       /* new state seen 4 times in a row */
        stable = raw;  count = 0;
        if (stable == 0) pressed_event = true;
    }
}
```

The response time is $4\times 5 = 20\,\mathrm{ms}$, imperceptible to a person, and bounces shorter than $15\,\mathrm{ms}$ are ignored. This is a small finite-state machine of the kind designed in [[digital-logic/finite-state-machines]], implemented in software.

## Pulse-width modulation

::: definition Pulse-width modulation {#def-pwm}
A **PWM** signal is a rectangular wave of fixed period $T = 1/f_\text{PWM}$ that is high for a time $t_\text{on}$ in each period. Its **duty cycle** is $D = t_\text{on}/T$, $0 \le D \le 1$. A timer generates **edge-aligned** PWM by setting the output at the update event and clearing it when `CNT` reaches `CCR`, giving $D = \text{CCR}/(\text{ARR}+1)$; in **centre-aligned** mode the counter counts up to ARR and back down, and the pulse is centred in the period, giving $D = \text{CCR}/\text{ARR}$ and $f_\text{PWM} = f_\text{tick}/(2\,\text{ARR})$.
:::

The average value of a PWM signal that switches between $0$ and $V$ is $DV$. When it drives a load that responds slowly compared with $T$ — the thermal mass of a heater, the inductance of a motor winding, the eye looking at an LED, or an $RC$ filter — the load responds essentially to the average. PWM thereby turns a digital pin into a variable "analog" output, without the power loss of a linear regulator: the switch is either fully on (small voltage across it) or fully off (no current through it). Power converters ([[power-electronics/dc-dc-converters]]) and motor drives are built on this principle.

::: widget plot
f: V*if(mod(x,1) < D, 1, 0); V*D
x: 0, 4
y: -0.2, 3.6
sliders: D=0.25:0:1:0.01; V=3.3:1.8:5:0.1
labels: v_\text{PWM}(t); \text{average } DV
caption: Four periods of a PWM signal (time in units of the period $T$) switching between $0$ and $V$ volts, with its average value $DV$. Slide the duty cycle $D$: the average moves linearly from $0$ to $V$. Any slowly responding load — a filter, a motor, a heater — sees essentially this average.
:::

### Resolution and frequency

::: proposition PWM resolution {#prop-pwm-resolution}
An edge-aligned PWM output from a timer with tick frequency $f_\text{tick}$ and frequency $f_\text{PWM}$ has $\text{ARR}+1 = f_\text{tick}/f_\text{PWM}$ steps of duty cycle, a resolution of

$$
b = \log_2\frac{f_\text{tick}}{f_\text{PWM}} \ \text{bits}
$$ {#eq-pwm-bits}

and a smallest step of $1/(\text{ARR}+1)$ of full scale. For fixed $f_\text{tick}$, doubling the PWM frequency costs one bit of resolution. (Centre-aligned PWM at the same $f_\text{PWM}$ has one bit less.)
:::

::: proof
By [[#eq-timer-period]] with $\text{PSC} = 0$ absorbed into $f_\text{tick}$, $f_\text{PWM} = f_\text{tick}/(\text{ARR}+1)$. `CCR` can take the integer values $0, 1, \dots, \text{ARR}+1$, which change $D$ in steps of $1/(\text{ARR}+1)$, so there are $\text{ARR}+1$ steps between $0$ and full scale and $\log_2(\text{ARR}+1)$ bits. In centre-aligned mode the counter takes $2\,\text{ARR}$ ticks per period, so at the same frequency ARR is halved.
:::

The highest resolution is obtained with the prescaler set to $1$ ($\text{PSC} = 0$), so that $f_\text{tick} = f_\text{clk}$. The choice of PWM frequency is a compromise: for a motor it should be above the audible range ($> 20\,\mathrm{kHz}$) and high enough for the winding inductance to smooth the current, but every switching transition dissipates energy in the drive transistors, so losses rise with frequency; for an LED it should be above about $200\,\mathrm{Hz}$ to avoid visible flicker (higher for cameras); for a heater, a fraction of a hertz is fine.

::: widget plot
f: log2(F*1e6/x); log2(F*1e6/(2*x))
x: 1000, 200000
y: 0, 18
sliders: F=72:16:480:8
labels: \text{edge-aligned}; \text{centre-aligned}
caption: PWM resolution in bits against PWM frequency (Hz) for a timer clocked at $F$ MHz with no prescaling. Every doubling of the frequency costs one bit. Read off the motor-drive case: at $20\,\mathrm{kHz}$ from $72\,\mathrm{MHz}$ an edge-aligned PWM has about $11.8$ bits. Raise $F$ to see why motor-control microcontrollers have fast timer clocks (some with high-resolution timers at effective rates of several GHz).
:::

::: example A motor PWM {#ex-pwm-motor}
A brushed DC motor is driven through a half bridge from a $16$-bit timer clocked at $72\,\mathrm{MHz}$. The PWM must be at $20\,\mathrm{kHz}$. (a) Find ARR and the resolution in edge-aligned mode. (b) Find ARR and the resolution in centre-aligned mode. (c) What `CCR` gives $D = 0.35$ in each case?
::: solution
(a) $\text{ARR}+1 = 72\times 10^6/(20\times 10^3) = 3600$, $\text{ARR} = 3599$; resolution $\log_2 3600 = 11.8$ bits, a step of $1/3600 = 0.028\,\%$.

(b) $2\,\text{ARR} = 3600$, $\text{ARR} = 1800$; $\log_2 1800 = 10.8$ bits, a step of $0.056\,\%$.

(c) Edge-aligned: $\text{CCR} = 0.35\times 3600 = 1260$. Centre-aligned: $\text{CCR} = 0.35\times 1800 = 630$.

Centre-aligned PWM is preferred in motor and power-converter control despite the lost bit: the switching edges of the different phases are spread through the period rather than all happening at the update event, which reduces current ripple and electromagnetic noise, and the middle of each pulse is a quiet instant at which to sample the phase currents with the ADC.
:::
:::

### PWM as a digital-to-analog converter

Filtering a PWM signal with a low-pass $RC$ filter produces a DC voltage $DV$ plus a residual ripple at $f_\text{PWM}$. This is a cheap substitute for a DAC when only a slowly varying voltage is needed, such as a reference level or a bias voltage.

::: proposition Ripple of an RC-filtered PWM signal {#prop-pwm-ripple}
A PWM signal of amplitude $V$, period $T$ and duty cycle $D$ applied to a first-order $RC$ low-pass filter with $\tau = RC \gg T$ produces, in steady state, an average output $DV$ and a peak-to-peak ripple

$$
\Delta v \approx \frac{V\,D(1-D)\,T}{\tau},
$$ {#eq-pwm-ripple}

which is largest at $D = \tfrac12$, where $\Delta v = VT/(4\tau)$.
:::

::: proof
Because $\tau \gg T$, the capacitor voltage stays close to its average $v_C \approx DV$ throughout the period. While the input is high, the capacitor charges with an approximately constant current $(V - DV)/R$ for a time $DT$, so its voltage rises by $\Delta v = (V - DV)\,DT/(RC) = V D(1-D)T/\tau$. While the input is low it discharges with current $DV/R$ for $(1-D)T$, falling by $DV(1-D)T/\tau$, the same amount, consistent with a steady state. Maximising $D(1-D)$ gives $D = \tfrac12$. (The exact steady-state ripple is $V(1 - e^{-DT/\tau})(1 - e^{-(1-D)T/\tau})/(1 - e^{-T/\tau})$, which reduces to [[#eq-pwm-ripple]] to first order in $T/\tau$.)
:::

::: example Designing a PWM DAC {#ex-pwm-dac}
A $3.3\,\mathrm{V}$ microcontroller generates a $20\,\mathrm{kHz}$ PWM signal with $8$-bit resolution to set an analog reference. Choose the time constant of a first-order $RC$ filter so that the ripple is below one LSB at every duty cycle, and find how long the output takes to settle after a full-scale step.
::: solution
One LSB is $3.3/256 = 12.9\,\mathrm{mV}$. The worst ripple is at $D = \tfrac12$: by [[#eq-pwm-ripple]] we need $VT/(4\tau) \le 12.9\,\mathrm{mV}$, so

$$
\tau \ge \frac{3.3 \times 50\times 10^{-6}}{4 \times 0.0129} = 3.2\,\mathrm{ms},
$$

for example $R = 10\,\mathrm{k\Omega}$ and $C = 330\,\mathrm{nF}$ ($\tau = 3.3\,\mathrm{ms}$). The exact formula gives $12.9\,\mathrm{mV}$ for $\tau = 3.2\,\mathrm{ms}$, confirming the approximation. To settle within half an LSB of a full-scale step takes $\tau\ln(2\times 256) = 6.2\tau \approx 20\,\mathrm{ms}$. That is the price of a single-pole filter: it can only be made smooth by making it slow. A second-order filter (two $RC$ sections, or the active filters of [[electronics-2/active-filters]]), a higher PWM frequency, or a real DAC are the ways out.
:::
:::

::: widget plot
f: V*x*(1-x)*T/tau; V/2^b
x: 0, 1
y: 0, 0.05
sliders: T=50:5:1000:5; tau=3200:100:20000:100; V=3.3:1.8:5:0.1; b=8:6:12:1
labels: \Delta v(D); 1\ \text{LSB}
caption: Peak-to-peak ripple (V) of an RC-filtered PWM signal against duty cycle $D$, for period $T$ μs and time constant $\tau$ μs, against one LSB of a $b$-bit converter. The ripple is worst at $D = \tfrac12$ and vanishes at $0$ and $1$. Halve $T$ (double the PWM frequency) and the ripple halves; raise $b$ to $10$ and see how much larger $\tau$ — and how much slower the response — must become.
:::

::: application Driving a half bridge
To drive a motor winding in both directions or a synchronous buck converter, PWM outputs control **half bridges**: two transistors in series across the supply, with the load at their junction. If both transistors conduct at once, even for a few tens of nanoseconds, they short the supply (**shoot-through**). Motor-control timers therefore generate **complementary** outputs with programmable **dead time**: after one transistor turns off, the other is turned on only after a delay of typically $0.1$–$2\,\mathrm{\mu s}$, long enough for the first to switch off completely. They also have **break inputs** that force all outputs to a safe state within nanoseconds when an over-current comparator trips — a protection that does not depend on software running at all. See [[power-electronics/inverters]] for the power-stage side.
:::

::: history
Interrupts date from the 1950s (the UNIVAC 1103 and the Lincoln Laboratory TX-2 among the early machines), and the first microprocessors had one or two interrupt lines with all prioritisation left to software or external chips such as Intel's 8259 programmable interrupt controller (1976). The 555 timer integrated circuit, designed by Hans Camenzind and introduced by Signetics in 1972, made timing and PWM generation a one-chip job for analog designers. Integrated timer peripherals with capture and compare channels became standard in microcontrollers through the 1980s, and the Arm Cortex-M3 (2004) brought an interrupt controller with hardware stacking, tail-chaining and programmable priorities into the core itself, so that handlers could be plain C functions with latencies of a dozen cycles.
:::

## Where this leads

Timers and interrupts are the foundation of everything that follows. [[embedded-systems/serial-communication]] uses interrupts and ring buffers to drive UARTs, SPI and I²C without losing data, and timers to generate baud rates and timeouts. [[embedded-systems/analog-interfaces]] triggers ADC conversions from timers so that samples are evenly spaced, and drives motors and LEDs with PWM. [[embedded-systems/real-time-systems]] generalises the interrupt-load and latency calculations of this chapter into schedulability analysis for sets of periodic tasks, and replaces masking-interrupt critical sections with semaphores and mutexes. Sampled-data control loops that run in timer interrupts are analysed in [[control-systems/digital-control]].

::: summary
- A timer counts ticks $f_\text{tick} = f_\text{clk}/(\text{PSC}+1)$ up to ARR; its update period is $(\text{PSC}+1)(\text{ARR}+1)/f_\text{clk}$ ([[#prop-timer-period]]). Mind the $+1$s and which clock the timer actually uses.
- Choose the prescaler as small as the counter width allows for resolution, or for a round tick rate for readability ([[#alg-psc-arr]]); compute the error when the division is not exact.
- Input capture timestamps edges in hardware; unsigned subtraction gives the elapsed ticks across wrap-around as long as the interval is less than $2^n$ ticks ([[#thm-wrap]]).
- The Cortex-M NVIC ([[#def-nvic]]) stacks registers in hardware, so handlers are C functions; priorities allow preemption, and the worst-case latency is entry time plus the longest masked region plus higher-priority handlers ([[#prop-latency]]).
- Handlers must be short, clear their flag early, never wait, and share data through `volatile` variables protected by critical sections ([[#def-critical]]) or atomic operations.
- PWM ([[#def-pwm]]) controls average power with duty cycle $D$; resolution is $\log_2(f_\text{tick}/f_\text{PWM})$ bits ([[#prop-pwm-resolution]]); an $RC$-filtered PWM signal has ripple $\approx VD(1-D)T/\tau$ ([[#prop-pwm-ripple]]).
:::

## Exercises

::: exercise A SysTick reload {level=1 check="167999"}
The $24$-bit SysTick timer counts down from its reload value to $0$ and then reloads, generating an interrupt every $\text{RELOAD}+1$ core clock cycles. What reload value gives a $1\,\mathrm{ms}$ tick on a $168\,\mathrm{MHz}$ core? Does it fit in $24$ bits?
::: solution
$\text{RELOAD} + 1 = 168\times 10^6\times 10^{-3} = 168\,000$, so $\text{RELOAD} = 167\,999$. The $24$-bit maximum is $2^{24} - 1 = 16\,777\,215$, so it fits; the longest SysTick period at this clock is $2^{24}/168\,\mathrm{MHz} = 99.9\,\mathrm{ms}$.
:::
:::

::: exercise Timer period {level=1 check="0.5"}
A timer clocked at $48\,\mathrm{MHz}$ has $\text{PSC} = 4799$ and $\text{ARR} = 4999$. What is its update period, in seconds?
::: solution
By [[#eq-timer-period]], $T = 4800\times 5000/(48\times 10^6) = 0.5\,\mathrm{s}$. The tick is $10\,\mathrm{kHz}$ ($100\,\mathrm{\mu s}$) and the counter takes $5000$ ticks per period.
:::
:::

::: exercise Interrupt load {level=1 check="0.0483"}
A $20\,\mathrm{kHz}$ interrupt handler takes $174$ cycles in total, including entry and exit, on a $72\,\mathrm{MHz}$ processor. What fraction of the processor does it use? (Give a fraction to three significant figures.)
::: solution
By [[#eq-irq-load]], $U = 20\,000\times 174/(72\times 10^6) = 0.0483$, just under $5\,\%$.
:::
:::

::: exercise Elapsed ticks {level=2 check="2036"}
A $16$-bit free-running timer is read as $65\,000$ at the start of an operation and $1500$ at the end. Fewer than $65\,536$ ticks have elapsed. How many ticks did the operation take? Write the C expression that computes it from two `uint16_t` variables `t0` and `t1`.
::: solution
By [[#thm-wrap]], $\Delta = (1500 - 65\,000) \bmod 65\,536 = 2036$ ticks. In C: `uint16_t dt = (uint16_t)(t1 - t0);` — the cast is essential, since `t1 - t0` is computed in `int` after promotion and equals $-63\,500$ before the conversion reduces it modulo $2^{16}$.
:::
:::

::: exercise Choosing a PWM frequency {level=2}
An LED dimmer must have at least $12$-bit resolution and a PWM frequency of at least $1\,\mathrm{kHz}$ (so that it does not flicker on camera). The timer clock is $16\,\mathrm{MHz}$ and the timer is $16$ bits wide. What is the highest PWM frequency that meets the resolution requirement, and does it satisfy both requirements? Give PSC and ARR.
::: solution
$12$ bits needs $\text{ARR}+1 \ge 4096$. With $\text{PSC} = 0$, $f_\text{PWM} = 16\times 10^6/4096 = 3906\,\mathrm{Hz}$, above $1\,\mathrm{kHz}$: both requirements are met with $\text{PSC} = 0$, $\text{ARR} = 4095$. (Any frequency between $1\,\mathrm{kHz}$ and $3.9\,\mathrm{kHz}$ would also work, with more resolution at the lower end: $\log_2(16\,000) = 14$ bits at $1\,\mathrm{kHz}$.)
:::
:::

::: exercise Frequency resolution {level=2}
A $32$-bit timer clocked at $80\,\mathrm{MHz}$ captures every rising edge of a signal near $10\,\mathrm{kHz}$. (a) What is the relative resolution of one period measurement? (b) If the software averages the time of $100$ consecutive periods (by subtracting captures $100$ edges apart), what is the resolution? (c) The $80\,\mathrm{MHz}$ clock comes from a $\pm 30\,\mathrm{ppm}$ crystal. Which effect limits the accuracy in (b)?
::: solution
(a) A period is $80\times 10^6/10^4 = 8000$ ticks: $\pm 1$ tick is $\pm 125\,\mathrm{ppm}$ ($0.0125\,\%$). (b) $100$ periods are $800\,000$ ticks, so $\pm 1$ tick is $\pm 1.25\,\mathrm{ppm}$. (c) Now the crystal's $\pm 30\,\mathrm{ppm}$ is the dominant error: resolution has overtaken accuracy, and further averaging is pointless without a better reference.
:::
:::

::: exercise A shared counter {level=2}
The main program executes `pending = pending - 1;` while a UART interrupt handler executes `pending = pending + 1;`, both on a `volatile uint32_t pending`. Show a sequence of instructions in which an increment is lost, and fix the code.
::: solution
Main: load `pending` (say $5$) into a register. Interrupt: handler loads $5$, adds $1$, stores $6$, returns. Main: subtracts $1$ from its stale $5$ and stores $4$. One increment and one decrement should have left $5$; the handler's update is lost. Fix: make the main program's read-modify-write a critical section — `uint32_t m = irq_save(); pending--; irq_restore(m);` — or use an atomic decrement (C11 `atomic_fetch_sub` on an `atomic_uint`, which on Cortex-M3 and later compiles to a load-exclusive/store-exclusive loop). The handler needs no protection on a single core, because the main program cannot interrupt it.
:::
:::

::: exercise Designing a timebase {level=3}
A data logger on a $32\,\mathrm{MHz}$ timer clock needs (i) a $250\,\mathrm{Hz}$ sampling interrupt with exact timing, and (ii) a $1\,\mathrm{\mu s}$-resolution timestamp that does not wrap for at least a day. Only $16$-bit timers are available, but two can be chained so that the update event of the first clocks the second. Propose a configuration, and verify the periods and wrap-around time.
::: hint
For (ii), make the first timer a $1\,\mathrm{MHz}$ counter of full $16$-bit range and let the second count its overflows.
:::
::: solution
(i) $N = 32\times 10^6/250 = 128\,000$, which needs $\text{PSC}+1 \ge 1.95$: $\text{PSC} = 1$, $\text{ARR} = 63\,999$ ($2\times 64\,000 = 128\,000$, exact). Alternatively $\text{PSC} = 31$ ($1\,\mathrm{MHz}$) and $\text{ARR} = 3999$.

(ii) Timer A: $\text{PSC} = 31$ ($1\,\mathrm{MHz}$), $\text{ARR} = 65\,535$; it wraps every $65.536\,\mathrm{ms}$. Timer B counts A's update events, also with $\text{ARR} = 65\,535$. The pair forms a $32$-bit counter of microseconds, wrapping after $2^{32}\,\mathrm{\mu s} = 4295\,\mathrm{s} = 71.6$ minutes — not a day. A day is $8.64\times 10^{10}\,\mathrm{\mu s}$, needing $\lceil\log_2(8.64\times 10^{10})\rceil = 37$ bits. So add a software extension: B's update interrupt (every $71.6$ minutes) increments a $32$-bit variable, giving a $64$-bit timestamp, read with the retry technique of [[#ex-torn-read]] (now with three parts, or with B's interrupt masked briefly). Reading the chained hardware pair itself has the same tearing problem: read B, A, B again and retry if B changed.
:::
:::

::: exercise Exact PWM ripple {level=3}
Derive the exact peak-to-peak ripple of a first-order $RC$ filter driven by a PWM signal of amplitude $V$, period $T$ and duty cycle $D$ in steady state, and show that it reduces to [[#eq-pwm-ripple]] when $T \ll \tau$. Evaluate both for $V = 3.3\,\mathrm{V}$, $T = 50\,\mathrm{\mu s}$, $D = 0.5$ and $\tau = 1\,\mathrm{ms}$.
::: hint
Let $v_L$ and $v_H$ be the capacitor voltages at the start and end of the high interval. Write the exponential charging and discharging, and impose periodicity.
:::
::: solution
During the high interval $v$ rises from $v_L$ towards $V$: $v_H = V + (v_L - V)a$ with $a = e^{-DT/\tau}$. During the low interval it decays towards $0$: $v_L = v_H b$ with $b = e^{-(1-D)T/\tau}$. Substituting, $v_H = V(1 - a) + v_H ab$, so $v_H = V(1-a)/(1-ab)$ and $v_L = V(1-a)b/(1-ab)$. The ripple is

$$
\Delta v = v_H - v_L = \frac{V(1-a)(1-b)}{1 - ab}, \qquad ab = e^{-T/\tau}.
$$

For $T \ll \tau$, $1 - a \approx DT/\tau$, $1 - b \approx (1-D)T/\tau$ and $1 - ab \approx T/\tau$, so $\Delta v \approx V D(1-D)T/\tau$, which is [[#eq-pwm-ripple]].

Numerically, $T/\tau = 0.05$: the approximation gives $3.3\times 0.25\times 0.05 = 41.25\,\mathrm{mV}$, and the exact formula, with $a = b = e^{-0.025} = 0.97531$, gives $3.3\times 0.02469^2/(1 - 0.95123) = 41.25\,\mathrm{mV}$ as well (they differ in the fifth significant figure: $41.248$ against $41.250\,\mathrm{mV}$). The first-order formula is excellent whenever $\tau$ is ten or more periods.
:::
:::

::: exercise Interrupt or polling for a switch {level=3}
A product has eight buttons on one GPIO port, each with a pull-up. Compare two designs: (a) an edge interrupt on each button pin, with debouncing done in the handler by ignoring edges for $20\,\mathrm{ms}$ after the first; (b) reading the whole port every $5\,\mathrm{ms}$ in a timer interrupt and debouncing all eight bits in parallel. Consider worst-case interrupt load, behaviour under electrical noise, and power consumption in a battery product that sleeps between button presses.
::: solution
(a) A bouncing button can generate tens of edges in a millisecond; each one interrupts the processor, so the worst-case interrupt load is unbounded by design — a noisy or broken switch (or interference coupling into the wiring) can flood the processor. Ignoring edges requires a timestamp per button. Its advantage is power: the processor can sleep until the first edge, and no periodic timer runs.

(b) The load is fixed and small: $200$ interrupts per second regardless of the switches, each a few dozen cycles. Noise shorter than the debounce window is filtered, and all buttons are handled by a few bitwise operations per sample (a "vertical counter"). But the timer must run continuously, waking the processor $200$ times a second, which costs power.

A common hybrid uses the edge interrupt only to wake the processor from sleep, then disables it and runs the periodic sampling of (b) until all buttons have been released for a while, then re-enables the edge interrupt and sleeps again. It bounds the interrupt load and keeps the sleep current low.
:::
:::
