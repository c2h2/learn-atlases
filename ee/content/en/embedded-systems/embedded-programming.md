On a desktop computer, a program never touches the hardware. It asks the operating system to open a file or send a packet, and the operating system's drivers do the rest. On a microcontroller there is usually no operating system underneath: the program *is* the driver. To make an LED light, it stores a particular bit pattern at a particular address; to find out whether a byte has arrived, it reads another address and tests one bit; and before any of that can happen, a few dozen lines of startup code must have set up the stack, initialised the variables and configured the clock.

Almost all of this is written in **C**. C is old and unforgiving, but it does three things that embedded work needs: it lets a program form a pointer from an integer address and read or write through it, it maps its operations closely onto machine instructions so that the programmer can predict the code and its timing, and it needs almost no run-time support — no garbage collector, no interpreter, not even a heap unless one is asked for. C++ and, increasingly, Rust are used in the same way and for the same reasons; the hardware-facing concepts of this chapter are identical in all three.

This chapter is about C as it is used close to the hardware. We assume ordinary C (variables, functions, pointers, structures); see [Programming in C](/learn/cs/lesson.php?c=computer-systems&l=c-programming) if those need revision. We cover the integer types that make register code portable, the bit operations that manipulate fields in registers, the `volatile` qualifier and what it does and does not guarantee, how a program is laid out in flash and RAM and brought to life by its startup code, fixed-point arithmetic for processors without floating point, and the toolchain that turns source into a flash image. The examples are written in standard C11 against generic, invented register maps; a real part's reference manual gives the actual addresses, and none of the code here has been compiled for a particular chip.

## Integers of known width

In standard C, an `int` is at least $16$ bits — it is $16$ on an 8-bit AVR and $32$ on a Cortex-M — and a `long` is at least $32$. Code that assumes a size silently changes meaning when it is moved to another processor. Register code therefore uses the **fixed-width types** of `<stdint.h>`:

| type | width | range |
|---|---|---|
| `uint8_t`, `int8_t` | $8$ bits | $0$ to $255$; $-128$ to $127$ |
| `uint16_t`, `int16_t` | $16$ bits | $0$ to $65\,535$; $-32\,768$ to $32\,767$ |
| `uint32_t`, `int32_t` | $32$ bits | $0$ to $4\,294\,967\,295$; $-2^{31}$ to $2^{31}-1$ |
| `uint64_t`, `int64_t` | $64$ bits | $0$ to $2^{64}-1$; $-2^{63}$ to $2^{63}-1$ |

A $32$-bit peripheral register is a `uint32_t`; an 8-bit data byte received over a serial line is a `uint8_t`. Unsigned types are used for registers and bit patterns because their arithmetic is defined to wrap modulo $2^n$ and their shifts are fully defined, whereas overflow of a signed integer is **undefined behaviour** — the compiler may assume it never happens, and optimise accordingly.

### Integer promotion

The rule that catches every embedded programmer at least once is **integer promotion**: before any arithmetic, operands narrower than `int` are converted to `int` (or to `unsigned int` if `int` cannot hold all their values). Arithmetic on `uint8_t` and `uint16_t` values is therefore really arithmetic on `int`.

::: example A comparison that is always false {#ex-promotion}
What does this fragment print on a $32$-bit microcontroller, and why?

```c
uint8_t a = 0x0F;
if (~a == 0xF0) puts("equal"); else puts("different");
```
::: solution
`a` is promoted to `int` with value $15$, bit pattern `0x0000000F`. The complement `~a` is `0xFFFFFFF0`, which as an `int` is $-16$. The constant `0xF0` is the `int` $240$. They are different, so the program prints "different" — although an 8-bit register holding `~a` would contain `0xF0`. The fix is to convert back to the intended width before comparing: `(uint8_t)~a == 0xF0` is true.

The same rule explains why `uint16_t x = 0xFFFF; if (x + 1 == 0)` is false on a $32$-bit machine (the sum is the `int` $65\,536$) but true on a $16$-bit one (where `uint16_t` promotes to `unsigned int` and wraps to $0$). Whenever narrow types and `~`, `-`, `<<` or comparison meet, write the cast.
:::
:::

::: warning Shifting into the sign bit
On a $32$-bit target, `1 << 31` shifts a signed `int` $1$ into the sign bit, which is undefined behaviour in C; on a $16$-bit target even `1 << 15` is. Register masks must be built from unsigned constants: `1u << 31` or `UINT32_C(1) << 31`. Many otherwise careful drivers have a latent bug here that only shows when the code is ported or the optimiser becomes more aggressive.
:::

## Bit manipulation

A control register packs many settings into one word: single-bit flags (enable, interrupt enable, start), and multi-bit **fields** (a prescaler, a mode, a channel number). Programs change these with the bitwise operators `&` (AND), `|` (OR), `^` (XOR), `~` (NOT) and the shifts `<<`, `>>`, applied with a **mask** that has $1$s in the positions to be affected.

::: proposition Bit operations with a mask {#prop-bitops}
Let $x$ be a register value and $m$ a mask. Then, bit by bit,

1. $x \mathbin{|} m$ **sets** the bits of $m$ and leaves the others unchanged;
2. $x \mathbin{\&} \sim m$ **clears** the bits of $m$ and leaves the others unchanged;
3. $x \mathbin{\hat{}} m$ **toggles** the bits of $m$ and leaves the others unchanged;
4. $(x \mathbin{\&} m) \ne 0$ **tests** whether any bit of $m$ is set;
5. for a field of width $w$ at position $p$, with $M = (2^w - 1)\ll p$, the update

$$
x' = (x \mathbin{\&} \sim M) \mathbin{|} ((v \ll p) \mathbin{\&} M)
$$ {#eq-field}

writes the value $v$ ($0 \le v < 2^w$) into the field and leaves every other bit of $x$ unchanged; and $(x \mathbin{\&} M) \gg p$ reads it back.
:::

::: proof
Bitwise operators act on each bit position independently, so it suffices to check one position $k$ with $m_k \in \{0, 1\}$. For $m_k = 0$: $x_k \lor 0 = x_k$, $x_k \land 1 = x_k$ and $x_k \oplus 0 = x_k$, so the bit is unchanged by (1)–(3). For $m_k = 1$: $x_k \lor 1 = 1$, $x_k \land 0 = 0$ and $x_k \oplus 1 = \overline{x_k}$, which is setting, clearing and toggling. For (4), $x \mathbin{\&} m$ is non-zero exactly when some position has $x_k = m_k = 1$.

For (5), outside the field $M_k = 0$, so $x'_k = (x_k \land 1)\lor 0 = x_k$. Inside the field $M_k = 1$, the first term is $0$ and the second is bit $k$ of $v \ll p$, which is bit $k - p$ of $v$. Hence bits $p$ to $p + w - 1$ of $x'$ hold $v$. The final AND with $M$ discards any bits of $v$ beyond width $w$, so an out-of-range $v$ cannot spill into neighbouring fields. Reading back, $x' \mathbin{\&} M$ keeps only the field and $\gg p$ moves it to bit $0$.
:::

In C, with `x` a `uint32_t`:

```c
#define BIT(n)            (UINT32_C(1) << (n))
#define FIELD_MASK(w, p)  (((UINT32_C(1) << (w)) - 1u) << (p))   /* w < 32 */

x |=  BIT(3);                                    /* set bit 3     */
x &= ~BIT(3);                                    /* clear bit 3   */
x ^=  BIT(3);                                    /* toggle bit 3  */
if (x & BIT(3)) { /* ... */ }                    /* test bit 3    */
x = (x & ~FIELD_MASK(3, 4)) | ((v << 4) & FIELD_MASK(3, 4));   /* bits 6:4 = v */
```

The same field update can be written with one fewer operation as $x \oplus ((x \oplus (v\ll p)) \mathbin{\&} M)$: inside the mask the XORs cancel $x$ and leave $v$, outside it nothing changes. The figure checks the equivalence bit by bit.

::: widget truthtable
formula: (X & ~M) | (V & M)
compare: X xor ((X xor V) & M)
caption: One bit of a field update: $X$ is the old register bit, $V$ the new value's bit and $M$ the mask bit. The two formulas agree in all eight rows, so the XOR form is a valid replacement for clear-then-set. Change the second formula to `X | (V & M)` — the tempting version that forgets to clear — and see that it fails exactly when $X = 1$, $V = 0$, $M = 1$.
:::

::: example Configuring a timer control register {#ex-field-update}
A timer's control register holds an enable bit at bit $0$, a direction bit at bit $4$ ($1$ = count down), and a $3$-bit clock-division field at bits $10{:}8$. Its current value is `0x00000211`. Write the C statements that select clock division $5$ and counting up, without changing anything else, and give the resulting value.
::: solution
The field mask is `FIELD_MASK(3, 8)` $= 7 \ll 8 =$ `0x700`, and $5 \ll 8 =$ `0x500`. Counting up means clearing bit $4$, mask `0x10`.

```c
uint32_t r = TIM_CR;                       /* read once          */
r &= ~(FIELD_MASK(3, 8) | BIT(4));         /* clear field, DIR   */
r |=  (UINT32_C(5) << 8);                  /* division = 5       */
TIM_CR = r;                                /* write once         */
```

Starting from `0x211` (binary `0010 0001 0001`: division $2$, direction down, enabled): clearing gives `0x211 & ~0x710 = 0x001`, and setting gives `0x501`. The timer stays enabled, now dividing by $5$ and counting up. Reading the register once into a local variable and writing it once avoids several separate accesses to the hardware — which matters if writing an intermediate value would briefly put the peripheral into an unwanted state.
:::
:::

### Two useful identities

Two expressions appear constantly in drivers and schedulers. For an unsigned $x \ne 0$, `x & (x - 1)` is $x$ with its lowest set bit cleared, and `x & -x` (or `x & (~x + 1)`) isolates the lowest set bit. In particular $x$ is a power of two exactly when `x != 0 && (x & (x - 1)) == 0`. Ring buffers whose size is a power of two use this test to validate their size, and then replace the expensive modulo `i % N` by the cheap mask `i & (N - 1)` ([[embedded-systems/serial-communication]]).

## Talking to registers

A register is accessed by turning its address into a pointer and dereferencing it:

```c
#define GPIOA_ODR  (*(volatile uint32_t *)0x48000014u)

GPIOA_ODR |= BIT(5);      /* drive pin 5 high (read-modify-write) */
```

The cast says "at address `0x48000014` there is a `uint32_t`", and the `volatile` says that it is not ordinary memory. For a peripheral with many registers, a structure whose members are laid out at the register offsets is clearer, and lets one definition serve every instance of the peripheral:

```c
typedef struct {
    volatile uint32_t MODER;    /* 0x00 mode            */
    volatile uint32_t OTYPER;   /* 0x04 output type     */
    volatile uint32_t OSPEEDR;  /* 0x08 output speed    */
    volatile uint32_t PUPDR;    /* 0x0C pull-up/down    */
    volatile uint32_t IDR;      /* 0x10 input data      */
    volatile uint32_t ODR;      /* 0x14 output data     */
    volatile uint32_t BSRR;     /* 0x18 bit set/reset   */
} gpio_t;

#define GPIOA ((gpio_t *)0x48000000u)
#define GPIOB ((gpio_t *)0x48000400u)

GPIOB->BSRR = BIT(5);          /* pin 5 high, one atomic store          */
GPIOB->BSRR = BIT(5 + 16);     /* pin 5 low: upper half resets pins     */
```

Every member is a `uint32_t`, which has the natural $4$-byte alignment, so the compiler inserts no padding and the offsets are those written in the comments; a C11 static assertion such as `_Static_assert(offsetof(gpio_t, BSRR) == 0x18, "layout")` makes the compiler check it. Vendors distribute exactly such header files, generated from a machine-readable description of the chip (the CMSIS-SVD format for Cortex-M).

::: definition The volatile qualifier {#def-volatile}
An object declared **`volatile`** may change, or its accesses may have effects, in ways the compiler cannot see. For every access to a volatile object that the source program performs — in the order of the abstract machine — the compiled program performs exactly one access: the compiler may not remove, duplicate, merge or (with respect to other volatile accesses) reorder them, nor keep the value in a processor register between accesses.
:::

Three kinds of object need `volatile`: **memory-mapped registers**, whose contents change by themselves and whose accesses have side effects; **variables shared with an interrupt handler**, which the handler may change between any two instructions of the main program; and, in an RTOS without proper synchronisation primitives, variables shared between tasks.

::: example The flag that never changes {#ex-volatile}
A UART interrupt handler sets a global flag when a line of text has been received; the main program waits for it:

```c
bool line_ready = false;            /* set by uart_isr() */

void uart_isr(void) { /* ... */ line_ready = true; }

int main(void) {
    /* ... */
    while (!line_ready) { }         /* wait */
    process_line();
}
```

At `-O0` it works; at `-O2` the program hangs. Why, and what is the fix?
::: solution
The compiler analyses `main` alone. Nothing inside the loop can change `line_ready` (it does not know that `uart_isr` is called by hardware), so it loads the variable once, and if it is false, compiles the loop into an unconditional branch to itself. The handler then sets the variable in memory, but the loop never reads it again.

Declaring `volatile bool line_ready` forces a fresh load on every iteration, and the loop ends when the handler runs. The same reasoning applies to a status register polled in a loop and to a software delay loop such as `for (i = 0; i < 100000; i++) { }`, which an optimiser deletes entirely unless `i` is volatile (and which is a poor way to measure time anyway — use a timer).
:::
:::

::: warning What volatile does not do
`volatile` guarantees that accesses happen; it does not make them **atomic** and it does not create **ordering with non-volatile data** or between processor cores. `counter++` on a volatile `uint32_t` is still a load, an add and a store, and an interrupt between them can lose an update. A volatile 64-bit variable on a 32-bit core is read in two halves that may come from different moments. For data shared with interrupt handlers, you also need a critical section or an atomic operation ([[embedded-systems/timers-interrupts]]); for ordering with DMA buffers or between cores, memory barriers or C11 `<stdatomic.h>`.
:::

::: quiz
Which of these variables must be declared `volatile`?
- [ ] a local loop counter in a function that computes a checksum
- [ ] a constant lookup table stored in flash
- [x] a millisecond counter incremented by a timer interrupt and read by the main loop
- [ ] a static buffer used only by the main program
::: solution
Only the tick counter is modified outside the normal flow of the code that reads it. The loop counter and the buffer are touched only by the code that the compiler can see, and the table never changes, so `volatile` would merely make them slower. (The tick counter also needs care if it is wider than the processor's word, because a non-atomic read can see a torn value.)
:::
:::

## From source to a running program

### Memory sections

The compiler and linker sort a program's contents into **sections**, and the linker places each section in flash or RAM according to a **linker script** that describes the chip's memories.

::: definition Program sections {#def-sections}
- **`.text`**: machine code, placed in flash.
- **`.rodata`**: constants and string literals (`const` data), in flash.
- **`.data`**: global and static variables with non-zero initial values. They live in RAM at run time, but their initial values must survive power-off, so the linker stores a copy in flash: the section has a **load address** in flash and a **run address** in RAM.
- **`.bss`**: global and static variables that are zero-initialised (explicitly or by default). Only their size is recorded; they occupy RAM but no flash.
- the **stack**, in RAM, holding return addresses, saved registers and local variables, growing downwards on Cortex-M; and optionally a **heap** for `malloc`.

Flash usage is therefore $\text{.text} + \text{.rodata} + \text{.data}$, and static RAM usage $\text{.data} + \text{.bss} + \text{stack} + \text{heap}$.
:::

```
MEMORY {
  FLASH (rx)  : ORIGIN = 0x08000000, LENGTH = 256K
  RAM   (rwx) : ORIGIN = 0x20000000, LENGTH = 64K
}
SECTIONS {
  .isr_vector : { KEEP(*(.isr_vector)) } > FLASH
  .text       : { *(.text*) *(.rodata*) } > FLASH
  _sidata = LOADADDR(.data);
  .data       : { _sdata = .; *(.data*) _edata = .; } > RAM AT > FLASH
  .bss        : { _sbss = .;  *(.bss*) *(COMMON) _ebss = .; } > RAM
  _estack = ORIGIN(RAM) + LENGTH(RAM);
}
```

This GNU linker script fragment (simplified: real ones add alignment, C++ constructor tables and checks) shows the essential idea. `> RAM AT > FLASH` gives `.data` its two addresses, and the symbols `_sidata`, `_sdata`, `_edata`, `_sbss`, `_ebss` and `_estack` — names that are a common convention, not a standard — tell the startup code where things are.

### Startup code

::: algorithm Startup sequence of a bare-metal C program {#alg-startup}
After reset, on a Cortex-M:

1. The core loads the initial stack pointer from word $0$ of the vector table and the reset-handler address from word $1$, and jumps to the reset handler.
2. The reset handler copies the initial values of `.data` from their load address in flash to their run address in RAM.
3. It fills `.bss` with zeros.
4. It performs low-level initialisation that C code relies on: enabling the floating-point unit if one is used, and often setting flash wait states and the clock tree (in a `SystemInit` function), and calling C++ static constructors if any.
5. It calls `main`. In an embedded program `main` normally never returns; if it does, the handler loops for ever or resets.
:::

The reset handler itself is ordinary C, using the linker symbols as addresses:

```c
extern uint32_t _sidata, _sdata, _edata, _sbss, _ebss, _estack;
int main(void);

void Reset_Handler(void)
{
    uint32_t *src = &_sidata, *dst = &_sdata;
    while (dst < &_edata) *dst++ = *src++;      /* copy .data  */
    for (dst = &_sbss; dst < &_ebss; ) *dst++ = 0;  /* zero .bss */
    main();
    for (;;) { }                                 /* main returned */
}
```

The vector table is an array of addresses placed at the start of flash. With the GNU and Clang compilers the placement uses an attribute — a compiler extension, not standard C:

```c
void Default_Handler(void) { for (;;) { } }
void SysTick_Handler(void) __attribute__((weak, alias("Default_Handler")));

__attribute__((section(".isr_vector"), used))
void (* const vectors[])(void) = {
    (void (*)(void))&_estack,   /* 0: initial stack pointer */
    Reset_Handler,              /* 1: reset                 */
    /* 2..14: NMI, HardFault, ... other system exceptions   */
    /* 15: SysTick_Handler, then the device interrupts      */
};
```

Each handler is declared **weak** and aliased to a default handler, so an application overrides a handler simply by defining a function with that name. Casting the stack-pointer address to a function pointer is not strictly portable C, which is one reason vendors often write this table in assembly; it works with the toolchains that are actually used for Cortex-M.

::: remark Why the reset handler can be written in C
On Cortex-M the hardware loads the stack pointer before the first instruction, so C code can run immediately — it needs only a stack. On many other processors (older Arm cores, most RISC-V parts) the first instructions must be assembly that sets up the stack pointer (and, on RISC-V, the global pointer `gp`) before jumping to C.
:::

::: example A memory budget {#ex-memory-budget}
The `size` tool reports for a firmware image: `.text` (including vectors) $24\,576$ bytes, `.rodata` $3\,200$, `.data` $512$, `.bss` $6\,144$. The stack is reserved separately at $2\,048$ bytes, and there is no heap. The chip has $32\,\mathrm{KiB}$ of flash and $16\,\mathrm{KiB}$ of SRAM. What fraction of each is used, and is there room for a $4\,\mathrm{KiB}$ bootloader?
::: solution
Flash: $24\,576 + 3\,200 + 512 = 28\,288$ bytes of $32\,768$, that is $86\,\%$. RAM: $512 + 6\,144 + 2\,048 = 8\,704$ bytes of $16\,384$, $53\,\%$.

A $4\,\mathrm{KiB}$ bootloader needs $4\,096$ bytes of flash, leaving $32\,768 - 4\,096 = 28\,672$ bytes for the application — enough for $28\,288$, but with only $384$ bytes to spare and no room for future features. Flash is the problem here, not RAM. One would choose the $64\,\mathrm{KiB}$ member of the family, or look for large constant tables in `.rodata` that could be compressed or computed.
:::
:::

::: warning Stack overflow is silent
Nothing on a typical microcontroller checks the stack. If deep calls, large local arrays or nested interrupts push it beyond its reserved area, it overwrites `.bss` or `.data` variables silently, and the program fails later, somewhere else. Estimate the worst-case stack depth (compilers can report each function's frame size, for GCC with `-fstack-usage`), add the interrupt frames, leave a margin, and in testing fill the stack with a known pattern at startup and check later how much was overwritten. Cores with a memory-protection unit or stack-limit registers (Armv8-M) can trap overflow; use them.
:::

### The toolchain

The programs that turn C into a flash image form a **cross toolchain**: they run on a development computer but produce code for the target processor.

1. The **compiler** (for example `arm-none-eabi-gcc` or `clang --target=arm-none-eabi`) translates each `.c` file to an object file. Target options select the core (`-mcpu=cortex-m4 -mthumb`) and the floating-point unit and calling convention (`-mfpu=fpv4-sp-d16 -mfloat-abi=hard`).
2. The **linker** combines object files and libraries according to the linker script into an **ELF** file containing code, data, symbols and debugging information.
3. A converter (`objcopy`) extracts a raw **binary** or an **Intel HEX** image of the bytes that go into flash.
4. A **programmer** writes the image into flash through a debug probe on the Serial Wire Debug or JTAG pins, or through the chip's built-in bootloader over UART or USB.
5. A **debugger** (`gdb` connected to the probe through a server such as OpenOCD or a vendor tool) loads the ELF file's symbols, sets breakpoints, single-steps and inspects memory and registers on the running chip.

Optimisation is usually on (`-O2` or `-Os` for size) even during development, because the unoptimised code is often too slow or too large and because bugs such as missing `volatile` only appear when optimising. The debugger copes with optimised code, though variables may be "optimised out" and single-stepping jumps about.

## Fixed-point arithmetic

Many microcontrollers — Cortex-M0, M0+ and M3, most 8-bit parts — have no floating-point unit. Floating-point operations are then done by library routines that take tens to hundreds of cycles each. Signal-processing and control code on such parts uses **fixed-point** arithmetic: real numbers stored as integers with an implied scale factor. The mechatronics view is in [Microcontrollers and embedded software](/learn/mechanical/lesson.php?c=mechatronics&l=microcontrollers); here we give the rules precisely.

::: definition Q format {#def-qformat}
A signed **Q$m$.$n$** number is a two's-complement integer $k$ of $1 + m + n$ bits representing the real value $x = k/2^n$: $m$ integer bits, $n$ fractional bits and a sign bit. Its range is $-2^m \le x \le 2^m - 2^{-n}$ and its resolution is $2^{-n}$. The most common formats are **Q15** (Q0.15, a $16$-bit integer, range $[-1, 1)$) and **Q31** (Q0.31, $32$ bits).
:::

Converting a real value to Q$n$ is $k = \operatorname{round}(x\cdot 2^n)$, clamped to the range. Addition of two numbers in the same format is integer addition (it can overflow). Multiplication doubles the number of fractional bits: the product of two Q15 numbers is a Q30 number in $32$ bits, which is shifted right by $15$ to return to Q15.

::: proposition Fixed-point multiplication {#prop-qmul}
For Q15 operands $a = k_a/2^{15}$ and $b = k_b/2^{15}$, the integer product $p = k_a k_b$ fits in a signed $32$-bit integer and represents $ab = p/2^{30}$. The Q15 result with round-to-nearest is

$$
k_{ab} = \left\lfloor \frac{p + 2^{14}}{2^{15}} \right\rfloor ,
$$ {#eq-qmul}

which is in range except for the single case $k_a = k_b = -2^{15}$ ($(-1)\times(-1) = +1$), whose result $2^{15}$ must be **saturated** to $2^{15} - 1$.
:::

::: proof
$\abs{k_a}, \abs{k_b} \le 2^{15}$, so $\abs{p} \le 2^{30} < 2^{31}$: the product fits. Since $ab = p/2^{30}$, the Q15 integer is $ab\cdot 2^{15} = p/2^{15}$, and adding half of the divisor before taking the floor rounds to the nearest integer (an arithmetic right shift by $15$ is a floor division). The result is at most $2^{30}/2^{15} = 2^{15}$ in magnitude, and equals $+2^{15}$, one more than the largest Q15 value, only when $p = 2^{30}$, that is $k_a = k_b = -2^{15}$.
:::

```c
static inline int16_t q15_mul(int16_t a, int16_t b)
{
    int32_t p = (int32_t)a * b;               /* Q30 */
    p = (p + (1 << 14)) >> 15;               /* round, back to Q15 */
    if (p > INT16_MAX) p = INT16_MAX;        /* saturate (-1 * -1) */
    return (int16_t)p;
}
```

(Right-shifting a negative signed integer is implementation-defined in C; every compiler for Arm and RISC-V performs an arithmetic shift, and DSP-capable cores have saturating instructions that do the whole operation at once.)

::: example A Q15 product {#ex-q15}
Compute $0.75 \times (-0.5)$ in Q15, and $0.3 \times 0.6$ with rounding. What is the error of the second result?
::: solution
$0.75 \to k_a = 0.75\times 32\,768 = 24\,576$ and $-0.5 \to k_b = -16\,384$. The product is $p = -402\,653\,184$, and $(p + 16\,384) \gg 15 = -12\,288$ (the rounding term makes no difference here because the product is exact). $-12\,288/32\,768 = -0.375$, exactly right.

$0.3 \to \operatorname{round}(9830.4) = 9830$ and $0.6 \to \operatorname{round}(19\,660.8) = 19\,661$. Then $p = 193\,267\,630$ and $(p + 16\,384)\gg 15 = 5898$, representing $5898/32\,768 = 0.179\,993$. The true product is $0.18$, so the error is $-7.3\times 10^{-6}$, a quarter of the resolution $2^{-15} = 3.05\times 10^{-5}$: most of it comes from rounding the operands, not the product.
:::
:::

::: widget plot
f: round(x*2^n)/2^n; round(x*2^n)/2^n - x
x: -1, 1
y: -1, 1
sliders: n=3:1:8:1
labels: \text{Q}n\text{ value}; \text{quantisation error}
caption: A real value $x$ stored in a fixed-point format with $n$ fractional bits: the staircase is the stored value and the small sawtooth is the error, which never exceeds half a step, $2^{-(n+1)}$. Each extra fractional bit halves the step. With $n = 15$ (Q15) the steps are far too small to see; slide $n$ down to $3$ to see what an 8-bit microcontroller's fixed point looks like.
:::

### Scaled integers in practice

Fixed point need not use powers of two. Physical quantities are often kept as integers in a convenient unit: temperature in hundredths of a degree, voltage in millivolts, time in microseconds. The conversion constants are then folded into integer multiplications and divisions, ordered so that nothing overflows and as little precision as possible is lost — multiply first, then divide.

::: example Converting a sensor reading {#ex-sensor-scaling}
A digital temperature sensor returns a $12$-bit two's-complement value in two bytes, most significant byte first, left-justified in $16$ bits (the low $4$ bits are zero). One count is $0.0625\,^\circ\mathrm{C}$. Write a function that returns the temperature in hundredths of a degree as an `int32_t`, without floating point, and evaluate it for the bytes `0x19, 0x00` and `0xE7, 0x00`.
::: solution
```c
int32_t temp_centi(uint8_t msb, uint8_t lsb)
{
    uint16_t raw = (uint16_t)(((uint16_t)msb << 8) | lsb) >> 4;  /* 12 bits */
    int32_t  t   = raw;
    if (raw & 0x800u) t -= 0x1000;        /* sign-extend 12-bit value */
    return t * 625 / 100;                 /* 0.0625 degC = 6.25 centi-degC */
}
```

Assembling the bytes with shifts is independent of the processor's byte order, unlike casting a byte pointer to a `uint16_t *`. The sign extension subtracts $2^{12}$ when bit $11$ is set, a portable alternative to shifting the value into the top of an `int16_t` and back.

For `0x19, 0x00`: `0x1900` $\gg 4 =$ `0x190` $= 400$, positive, and $400\times 625/100 = 2500$, that is $25.00\,^\circ\mathrm{C}$. For `0xE7, 0x00`: `0xE70` $= 3696$ has bit $11$ set, so $t = 3696 - 4096 = -400$ and the result is $-2500$, $-25.00\,^\circ\mathrm{C}$. With $t$ at most $2047$ in magnitude, the product $t \times 625$ is at most about $1.3\times 10^6$, comfortably inside $32$ bits. (C integer division truncates towards zero, so a value of $-1$ count, $-6.25$ hundredths, gives $-6$; add a rounding term if that matters.)
:::
:::

## Byte order and data layout

Cortex-M and RISC-V microcontrollers are **little-endian**: the least significant byte of a multi-byte value is at the lowest address. Many protocols and sensors send the most significant byte first ("network order", big-endian). Converting between them by assembling values from bytes with shifts, as in [[#ex-sensor-scaling]], is portable and fast; reinterpreting a byte buffer through a pointer to a wider type depends on the processor's byte order, may violate alignment rules (an unaligned 32-bit load faults on Cortex-M0), and breaks C's aliasing rules. The same goes for C structures used to describe a message: the compiler may insert padding between members, and **bit-fields** (`unsigned mode : 3;`) are laid out in an implementation-defined order. They are fine for data that stays inside one program; for registers and wire formats, explicit masks and shifts are the safe choice.

::: application Hardware abstraction in vendor libraries
Silicon vendors supply hardware abstraction layers (HALs) and lower-level "LL" or register-definition headers, and Arm's CMSIS standard defines a common core interface (`NVIC_EnableIRQ`, `SysTick_Config`, the register structures generated from SVD files). In production code, teams commonly build their own thin driver layer on top of the register definitions: a few functions per peripheral, with an interface that suits the application and can be replaced by a fake for testing on a desktop computer ([[embedded-systems/embedded-system-design]]). Knowing how to read and write the registers directly is what makes it possible to debug these layers when they misbehave, and to write the time-critical parts without them.
:::

::: history
C was developed by Dennis Ritchie at Bell Laboratories between 1969 and 1973, alongside the Unix operating system, as a language close enough to the machine to write an operating system kernel. Brian Kernighan and Ritchie's book *The C Programming Language* (1978) defined it informally until the first standard, ANSI X3.159 (1989, adopted by ISO in 1990). C99 added `<stdint.h>`, `inline`, `//` comments and `bool`; C11 added `_Static_assert`, `<stdatomic.h>` and threads; the most recent revision is C23 (ISO/IEC 9899:2024). Because C's freedom makes errors easy, the Motor Industry Software Reliability Association published the MISRA C guidelines in 1998, a restricted subset of C for safety-related automotive software that is now used across embedded industries.
:::

## Where this leads

The register access patterns of this chapter are used in every later one. [[embedded-systems/timers-interrupts]] adds interrupt handlers — the functions in the vector table — and the critical sections that `volatile` alone cannot provide. [[embedded-systems/serial-communication]] writes complete drivers with ring buffers indexed by masks, and [[embedded-systems/analog-interfaces]] turns ADC codes into physical units with the scaled-integer methods above. Q-format arithmetic is the basis of the fixed-point filter structures of [[dsp/filter-structures]] and of digital controllers ([[control-systems/digital-control]]). Testing and debugging firmware, including running driver code on a desktop computer, is part of [[embedded-systems/embedded-system-design]].

::: summary
- Use `<stdint.h>` fixed-width types, unsigned types for registers and bit patterns, and unsigned constants for masks (`1u << 31`); remember that narrow operands are promoted to `int` before arithmetic ([[#ex-promotion]]).
- Set, clear, toggle and test bits with OR, AND-NOT, XOR and AND; update a field with $(x \mathbin{\&} \sim M) \mathbin{|} ((v\ll p)\mathbin{\&} M)$ ([[#prop-bitops]]).
- Access registers through `volatile` pointers or structures at fixed addresses; `volatile` ([[#def-volatile]]) forces every access to happen but does not make accesses atomic.
- A program's code and constants live in flash, `.data` is copied from flash to RAM and `.bss` zeroed by the startup code before `main` ([[#def-sections]], [[#alg-startup]]); the linker script and vector table tie it to the chip.
- Budget flash and RAM, including the stack, which overflows silently.
- Without an FPU use fixed point: Q15 products need a 32-bit intermediate, a rounding shift and saturation ([[#prop-qmul]]); scaled integers in convenient units are often simpler.
- Assemble multi-byte values with shifts, not pointer casts, so that code is independent of byte order and alignment.
:::

## Exercises

::: exercise Setting, clearing and toggling {level=1 check="211"}
A register holds `0x5A`. The program sets bit $0$, then clears bit $3$, then toggles bit $7$. What is the final value, as a decimal number?
::: solution
`0x5A` $=$ `0101 1010`. Setting bit $0$: `0101 1011` $=$ `0x5B`. Clearing bit $3$: `0101 0011` $=$ `0x53`. Toggling bit $7$: `1101 0011` $=$ `0xD3` $= 211$.
:::
:::

::: exercise Writing a field {level=1 check="65503"}
A $16$-bit register holds `0xFFFF`. Using [[#eq-field]], write the value $5$ into the $3$-bit field at bits $6{:}4$. Give the result in decimal.
::: solution
$M = 7\ll 4 =$ `0x0070`, $v\ll 4 =$ `0x0050`. $(\texttt{0xFFFF}\ \&\ \sim\texttt{0x0070}) = \texttt{0xFF8F}$, and OR with `0x0050` gives `0xFFDF` $= 65\,503$.
:::
:::

::: exercise Reading a size report {level=1}
A build reports `text = 28672`, `data = 512`, `bss = 7680` (the GNU `size` tool counts `.rodata` and the vector table in `text`, and here the stack is reserved inside `bss`). How much flash and how much RAM does the program use? What fraction of a part with $32\,\mathrm{KiB}$ flash and $16\,\mathrm{KiB}$ RAM is that?
::: solution
Flash holds text and the initial values of data: $28\,672 + 512 = 29\,184$ bytes, $89\,\%$ of $32\,768$. RAM holds data and bss: $512 + 7\,680 = 8\,192$ bytes, exactly $50\,\%$ of $16\,384$.
:::
:::

::: exercise A promotion puzzle {level=2}
On a $32$-bit microcontroller, `uint16_t a = 60000, b = 60000; uint32_t c = a * b;` gives a wrong or undefined result, although $3.6\times 10^9$ fits in a `uint32_t`. Explain, and correct the code.
::: solution
Both operands are promoted to `int` (32-bit signed), and $60\,000\times 60\,000 = 3.6\times 10^9 > 2^{31} - 1 = 2.147\times 10^9$: signed overflow, which is undefined behaviour. The conversion to `uint32_t` happens only after the multiplication. Write `uint32_t c = (uint32_t)a * b;` so that the multiplication is done in unsigned $32$-bit arithmetic, where $3.6\times 10^9$ fits. (On a $16$-bit machine `uint16_t` promotes to `unsigned int`, and the product would wrap modulo $2^{16}$ instead — a different wrong answer.)
:::
:::

::: exercise A Q15 product {level=2 check="5898"}
Using [[#eq-qmul]], compute the rounded Q15 integer for $0.3\times 0.6$ when the operands are first rounded to Q15. Give the integer.
::: solution
As in [[#ex-q15]]: $k_a = 9830$, $k_b = 19\,661$, $p = 193\,267\,630$. Then $(p + 16\,384)/32\,768 = 193\,284\,014/32\,768 = 5898.56$, whose floor is $5898$. The result represents $5898/32\,768 = 0.17999$.
:::
:::

::: exercise Little-endian decoding {level=2 check="305419896"}
Four bytes arrive in the order `0x78, 0x56, 0x34, 0x12`, least significant first. Write a portable C expression that assembles them into a `uint32_t` from an array `b[4]`, and give the value in decimal.
::: solution
`(uint32_t)b[0] | ((uint32_t)b[1] << 8) | ((uint32_t)b[2] << 16) | ((uint32_t)b[3] << 24)`, which is `0x12345678` $= 305\,419\,896$. The casts before shifting are needed: `b[3] << 24` would promote the byte to `int` and shift a $1$ into the sign bit for bytes of `0x80` or more.
:::
:::

::: exercise Why volatile? {level=2}
For each of the following, say whether `volatile` is needed and why: (a) a pointer to a UART data register; (b) a global array filled by the main program and read only by the main program; (c) a `bool` set by an interrupt handler and polled by the main loop; (d) a buffer written by a DMA controller and read by the main program after a completion interrupt.
::: solution
(a) Yes: the register changes by itself and its accesses have side effects. (b) No: the compiler sees every access. (c) Yes: otherwise the loop may read it only once ([[#ex-volatile]]). (d) The buffer's contents change outside the compiler's view, so either the buffer must be accessed as volatile or — better, because volatile accesses to a whole buffer are slow — the code must ensure that the compiler reloads it after the completion: a compiler barrier or an atomic flag with acquire ordering after the interrupt, plus cache maintenance if the core has a data cache ([[computer-architecture/input-output]]).
:::
:::

::: exercise The lowest set bit {level=3}
Prove that for an unsigned $n$-bit integer $x \ne 0$, `x & (x - 1)` equals $x$ with its lowest set bit cleared, and deduce a test for whether $x$ is a power of two. Use it to write a function that counts the set bits of a `uint32_t` in as many iterations as there are set bits.
::: hint
Write $x = y\,1\,0\cdots 0$ in binary, with $k$ trailing zeros.
:::
::: solution
Let the lowest set bit of $x$ be at position $k$, so $x = y\,1\,\underbrace{0\cdots0}_{k}$ for some higher bits $y$. Subtracting $1$ borrows through the $k$ zeros: $x - 1 = y\,0\,\underbrace{1\cdots1}_{k}$. ANDing, the $y$ bits are unchanged, bit $k$ becomes $1\land 0 = 0$ and the low $k$ bits are $0\land 1 = 0$: $x \mathbin{\&} (x-1) = y\,0\,0\cdots0$, which is $x$ with bit $k$ cleared. (No wrap-around occurs since $x \ge 1$.)

$x$ is a power of two exactly when it has a single set bit, i.e. when clearing the lowest set bit leaves zero: `x != 0 && (x & (x - 1)) == 0`.

```c
unsigned popcount32(uint32_t x)
{
    unsigned n = 0;
    while (x) { x &= x - 1u; n++; }   /* one iteration per set bit */
    return n;
}
```
:::
:::

::: exercise Sign extension {level=3}
A $10$-bit two's-complement value arrives in the low bits of a `uint16_t raw`. (a) Write a portable expression for its value as an `int16_t`, valid whatever the compiler's right-shift behaviour. (b) Show that the expression `(int16_t)((int)(raw ^ 0x200u) - 0x200)` also works, and explain why the cast to `int` matters.
::: solution
(a) `int16_t v = (raw & 0x200u) ? (int16_t)((int)raw - 0x400) : (int16_t)raw;` — subtracting $2^{10}$ when the sign bit (bit $9$) is set. Both operands of the subtraction are `int`, so the result is the negative number itself and the conversion to `int16_t` is exact. (Writing `raw - 0x400u` instead would make the subtraction unsigned: it would wrap to a large positive value, and converting that to `int16_t` is implementation-defined.)

(b) Let $s$ be bit $9$ and $r$ the low $9$ bits, so the value is $-512s + r$ and $\text{raw} = 512s + r$. XOR with `0x200` flips the sign bit: $512(1 - s) + r$. Subtracting $512$ gives $-512s + r$, the correct signed value, for both $s = 0$ and $s = 1$. The XOR involves the unsigned constant `0x200u`, so its result is `unsigned int`; the cast to `int` (exact, since the value is below $1024$) makes the subtraction signed, so the negative result is represented exactly and the conversion to `int16_t` is in range. No branch and no shift of a negative number is needed.
:::
:::

::: exercise A register structure {level=3}
A UART has registers `DR` (data, offset `0x00`), `SR` (status, `0x04`), `BRR` (baud rate, `0x08`) and `CR1`, `CR2`, `CR3` (control, `0x0C`, `0x10`, `0x14`), all $32$ bits, with a reserved gap so that `GTPR` is at `0x1C`. (a) Write a `typedef struct` for it and the static assertions that check the layout. (b) Write a function `uart_putc` that waits until bit $7$ of `SR` (transmit register empty) is set and then writes the byte. (c) What would go wrong if the members were not `volatile`?
::: solution
(a)
```c
typedef struct {
    volatile uint32_t DR;     /* 0x00 */
    volatile uint32_t SR;     /* 0x04 */
    volatile uint32_t BRR;    /* 0x08 */
    volatile uint32_t CR1;    /* 0x0C */
    volatile uint32_t CR2;    /* 0x10 */
    volatile uint32_t CR3;    /* 0x14 */
    uint32_t          reserved;   /* 0x18 */
    volatile uint32_t GTPR;   /* 0x1C */
} uart_t;
_Static_assert(offsetof(uart_t, CR3)  == 0x14, "CR3 offset");
_Static_assert(offsetof(uart_t, GTPR) == 0x1C, "GTPR offset");
```
(`offsetof` is in `<stddef.h>`.)

(b)
```c
void uart_putc(uart_t *u, uint8_t c)
{
    while ((u->SR & (UINT32_C(1) << 7)) == 0) { }   /* wait for TXE */
    u->DR = c;
}
```

(c) Without `volatile`, the compiler may read `SR` once and spin for ever on the stale value (or skip the loop), and it may merge or drop writes to `DR` — two calls writing two bytes could become one store of the second byte, since an ordinary memory location overwritten without being read makes the first store dead.
:::
:::
