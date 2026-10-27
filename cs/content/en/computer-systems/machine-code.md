Here is a C function and the code GCC produces for it:

```c
long scale(long x, long y, long z) {
    return x + 4 * y + 12 * z;
}
```

```text
scale:
    leaq    (%rdi,%rsi,4), %rax     # rax = x + 4*y
    leaq    (%rdx,%rdx,2), %rdx     # rdx = z + 2*z = 3*z
    leaq    (%rax,%rdx,4), %rax     # rax = (x + 4*y) + 4*(3*z)
    ret                             # return rax
```

There is no multiplication instruction in sight, no variable names, and an instruction called "load effective address" that does not load anything. Yet this is what actually runs. The processor knows nothing of C: it fetches and executes a stream of **machine instructions**, each a few bytes that tell it to move data between registers and memory, compute, compare, or jump. Being able to read that stream lets you understand what the compiler did with your code, why one version of a loop is faster than another, what a crash report means, and how security bugs such as buffer overflows work and are stopped.

This chapter teaches you to read x86-64 assembly code. We cover the programmer-visible state of the machine (registers, memory and condition codes), the main instructions and operand forms, how conditionals, loops and `switch` are compiled into jumps, how procedure calls use the stack, and how arrays and structures are accessed. The goal is reading, not writing: the compiler writes assembly better than most people. How the processor implements these instructions in hardware — pipelines, the arithmetic unit, the control unit — is computer architecture, taught in the [Electrical Engineering Atlas](/learn/ee/).

**Conventions.** The architecture is x86-64 with the System V ABI used by Linux, macOS and the BSDs (Windows uses a different calling convention). Assembly is shown in **AT&T syntax**, the default of the GNU tools, in which the *destination is the last operand* (`movq %rsi, %rax` copies `%rsi` into `%rax`); Intel's manuals use Intel syntax, with the destination first and no `%` signs. Listings were produced with GCC 15.2 using `gcc -std=c17 -Og -S -fno-asynchronous-unwind-tables -fcf-protection=none` (the last two flags suppress debugging directives and the `endbr64` instructions Ubuntu's GCC adds for control-flow protection), with assembler directives removed and comments added by hand. `-Og` optimises without rearranging the code beyond recognition.

## The machine's view {#sec-state}

An **instruction set architecture** (ISA) is the contract between software and hardware: the state a program can see and the instructions that change it. x86-64 is the 64-bit extension, designed by AMD (published 1999–2000, first processors 2003), of Intel's x86 family that began with the 8086 in 1978. The programmer-visible state is:

- the **program counter**, called `%rip` (instruction pointer): the address of the next instruction;
- sixteen 64-bit **general-purpose registers**, very fast storage inside the processor;
- the **condition codes**: single-bit flags describing the result of the most recent arithmetic or comparison;
- sixteen (or more, with AVX-512) **vector registers** `%xmm0`–`%xmm15` (`%ymm`, `%zmm` when wider), which also hold floating-point values;
- **memory**: a byte-addressed array, the virtual address space of [[computer-systems/c-programming#sec-regions]].

Each general-purpose register can be used at four widths. The names are historical: the 16-bit 8086 had `ax`, `bx`, …, the 32-bit 80386 extended them to `eax`, …, and x86-64 added the `r` forms and eight new registers `%r8`–`%r15`.

| 64-bit | 32-bit | 16-bit | 8-bit | conventional use (System V ABI) |
|---|---|---|---|---|
| `%rax` | `%eax` | `%ax` | `%al` | return value |
| `%rbx` | `%ebx` | `%bx` | `%bl` | callee-saved |
| `%rcx` | `%ecx` | `%cx` | `%cl` | 4th argument |
| `%rdx` | `%edx` | `%dx` | `%dl` | 3rd argument |
| `%rsi` | `%esi` | `%si` | `%sil` | 2nd argument |
| `%rdi` | `%edi` | `%di` | `%dil` | 1st argument |
| `%rbp` | `%ebp` | `%bp` | `%bpl` | callee-saved (optionally frame pointer) |
| `%rsp` | `%esp` | `%sp` | `%spl` | stack pointer |
| `%r8` | `%r8d` | `%r8w` | `%r8b` | 5th argument |
| `%r9` | `%r9d` | `%r9w` | `%r9b` | 6th argument |
| `%r10`, `%r11` | `%r10d`, … | | | caller-saved temporaries |
| `%r12`–`%r15` | `%r12d`, … | | | callee-saved |

An important rule: an instruction that writes a 32-bit register **sets the upper 32 bits to zero**, whereas writing an 8- or 16-bit register leaves the other bits unchanged. That is why compilers write `movl $0, %eax` (5 bytes) to clear all of `%rax` rather than `movq $0, %rax` (7 bytes).

Instructions are encoded as 1 to 15 bytes. `objdump -d` disassembles an object file and shows both:

```console
$ gcc -std=c17 -Og -fno-asynchronous-unwind-tables -fcf-protection=none -c mc.c
$ objdump -d mc.o
...
0000000000000072 <swapl>:
  72:	48 8b 07             	mov    (%rdi),%rax
  75:	48 8b 16             	mov    (%rsi),%rdx
  78:	48 89 17             	mov    %rdx,(%rdi)
  7b:	48 89 06             	mov    %rax,(%rsi)
  7e:	c3                   	ret
```

The left column is the offset in the file, the middle the bytes, the right the instruction. (`objdump` omits the size suffix `q` when the registers make the size clear.)

## Operands and data movement

Most instructions take one or two operands. An operand is an **immediate** (a constant, written `$-12` or `$0x1f`), a **register** (`%rax`), or a **memory reference**.

::: definition Memory operand {#def-operand}
The general memory operand $D(R_b, R_i, s)$ refers to the bytes starting at the **effective address**

$$
D + R[R_b] + R[R_i] \cdot s ,
$$

where $D$ is a constant **displacement** (up to 32 bits, signed), $R_b$ a **base** register, $R_i$ an **index** register (any register except `%rsp`) and the **scale** $s \in \set{1, 2, 4, 8}$. Any of the parts may be omitted: `(%rax)` is the address in `%rax`, `8(%rax)` adds 8, `(%rax,%rcx,4)` adds four times `%rcx`, and `0x601040` alone is an absolute address. The form `D(%rip)` addresses memory relative to the current instruction, which is how position-independent code reaches its global variables ([[computer-systems/linking-loading]]).
:::

The scales $1, 2, 4, 8$ are exactly the sizes of the basic C types, so `(%rdi,%rsi,8)` is the address of `a[i]` when `%rdi` holds a `long *a` and `%rsi` holds `i`.

::: example Operand values {#ex-operands}
Suppose `%rax` holds `0x100`, `%rcx` holds `0x1`, `%rdx` holds `0x3`, and memory holds the 8-byte values `0xff` at `0x100`, `0xab` at `0x108`, `0x13` at `0x110` and `0x11` at `0x118`. What value does each operand denote: `%rax`, `0x108`, `$0x108`, `(%rax)`, `8(%rax)`, `13(%rax,%rdx)`, `0xfc(,%rcx,4)`, `(%rax,%rdx,8)`?
::: solution
| operand | kind | address computation | value |
|---|---|---|---|
| `%rax` | register | — | `0x100` |
| `0x108` | absolute memory | `0x108` | `0xab` |
| `$0x108` | immediate | — | `0x108` |
| `(%rax)` | memory | `0x100` | `0xff` |
| `8(%rax)` | memory | `0x100 + 8 = 0x108` | `0xab` |
| `13(%rax,%rdx)` | memory | `13 + 0x100 + 3 = 0x110` | `0x13` |
| `0xfc(,%rcx,4)` | memory | `0xfc + 1 * 4 = 0x100` | `0xff` |
| `(%rax,%rdx,8)` | memory | `0x100 + 3 * 8 = 0x118` | `0x11` |

Note the difference between `0x108` (the contents of memory at that address) and `$0x108` (the number itself), and that `13` is decimal ($= $ `0xd`).
:::
:::

### Moving data

The `mov` family copies a source operand to a destination. A suffix gives the size: `b` (byte), `w` (word, 2 bytes), `l` (long word, 4 bytes) and `q` (quad word, 8 bytes) — the "word" terminology dates from the 16-bit 8086. At most one operand may be in memory: to copy memory to memory, go through a register, exactly as `swapl` above does. Moving a smaller value into a larger register uses `movz` (zero extension: `movzbl` byte to long) or `movs` (sign extension: `movslq` long to quad), the two widening rules of [[computer-systems/bits-integers]]; `cltq` sign-extends `%eax` into `%rax`.

The function `swapl` is the pointer swap of [[computer-systems/c-programming]]:

```c
void swapl(long *xp, long *yp) {
    long t = *xp;
    *xp = *yp;
    *yp = t;
}
```

```text
swapl:                      # xp in %rdi, yp in %rsi
    movq    (%rdi), %rax    # t = *xp
    movq    (%rsi), %rdx    # tmp = *yp
    movq    %rdx, (%rdi)    # *xp = tmp
    movq    %rax, (%rsi)    # *yp = t
    ret
```

Pointers are simply addresses in registers, dereferencing is a memory operand, and the local variable `t` lives in a register — most local variables never touch memory.

### Arithmetic and `lea`

| instruction | effect | | instruction | effect |
|---|---|---|---|---|
| `leaq S, D` | $D \gets \&S$ | | `incq D` / `decq D` | $D \gets D \pm 1$ |
| `addq S, D` | $D \gets D + S$ | | `negq D` | $D \gets -D$ |
| `subq S, D` | $D \gets D - S$ | | `notq D` | $D \gets \lnot D$ |
| `imulq S, D` | $D \gets D \times S$ | | `salq k, D` | $D \gets D \ll k$ |
| `xorq S, D` | $D \gets D \oplus S$ | | `sarq k, D` | $D \gets D \gg_A k$ (arithmetic) |
| `andq S, D` | $D \gets D \mathbin{\&} S$ | | `shrq k, D` | $D \gets D \gg_L k$ (logical) |
| `orq S, D` | $D \gets D \mid S$ | | | |

Note the order in AT&T syntax: `subq %rsi, %rax` computes `%rax - %rsi`. The shift count is an immediate or the register `%cl`.

**`lea`** ("load effective address") computes the address of its memory operand and stores the *address* — no memory is accessed. Since an address has the form $D + b + i \cdot s$, `lea` is a cheap way to compute such expressions, which is exactly how `scale` computed $x + 4y + 12z$: `leaq (%rdi,%rsi,4)` is $x + 4y$, `leaq (%rdx,%rdx,2)` is $3z$, and `leaq (%rax,%rdx,4)` adds $4 \cdot 3z$. Multiplication by $12$ became two additions folded into address arithmetic.

Full 128-bit products and division use special forms: `imulq S` and `mulq S` multiply `%rax` by $S$ and put the 128-bit product in `%rdx:%rax`; `idivq S` divides the 128-bit `%rdx:%rax` by $S$, leaving the quotient in `%rax` and the remainder in `%rdx` (with `cqto` first, to sign-extend `%rax` into `%rdx`). Division is slow (tens of cycles), which is why compilers replace division by constants with multiplications and shifts.

## Control

Machine code has no `if`, `while` or `for`. It has **condition codes**, set as a side effect of arithmetic, and **jumps**, which change `%rip`.

::: definition Condition codes {#def-flags}
After an arithmetic or logical instruction computes a result $t$ of width $w$, the processor sets four single-bit flags (among others):

- **CF** (carry flag): the operation produced a carry out of (or, for subtraction, a borrow into) the most significant bit — unsigned overflow;
- **ZF** (zero flag): $t = 0$;
- **SF** (sign flag): the most significant bit of $t$ is $1$ — $t$ is negative as a two's-complement number;
- **OF** (overflow flag): two's-complement overflow occurred.

`cmpq S, D` sets the flags as `subq S, D` would, without storing the result; `testq S, D` sets them as `andq S, D` would (clearing CF and OF). `lea` does not change the flags.
:::

Instructions then read the flags. A **jump** `jX label` goes to `label` if condition `X` holds, and otherwise continues with the next instruction; `jmp label` always jumps. `setX D` writes $1$ or $0$ into a byte register, and `cmovX S, D` moves only if the condition holds. The conditions after `cmpq S, D` (which computes $D - S$) are:

| suffix | meaning after `cmp S, D` | flags |
|---|---|---|
| `e` / `z` | $D = S$ | ZF |
| `ne` / `nz` | $D \ne S$ | ¬ZF |
| `s` / `ns` | result negative / non-negative | SF / ¬SF |
| `l` | $D < S$, signed | SF ⊕ OF |
| `le` | $D \le S$, signed | (SF ⊕ OF) ∨ ZF |
| `g` | $D > S$, signed | ¬(SF ⊕ OF) ∧ ¬ZF |
| `ge` | $D \ge S$, signed | ¬(SF ⊕ OF) |
| `b` | $D < S$, unsigned ("below") | CF |
| `be` | $D \le S$, unsigned | CF ∨ ZF |
| `a` | $D > S$, unsigned ("above") | ¬CF ∧ ¬ZF |
| `ae` | $D \ge S$, unsigned | ¬CF |

The signed and unsigned comparisons differ — the compiler picks `jl` or `jb` according to the C types, which is how the `-1 < 0u` surprise of [[computer-systems/bits-integers]] reaches the machine. Why is "signed less than" SF ⊕ OF rather than just SF?

::: theorem Signed comparison from the flags {#thm-sf-of}
Let $a$ and $b$ be $w$-bit two's-complement integers and let `cmp` compute $t = a -^t_w b$, setting SF to the sign bit of $t$ and OF to $1$ exactly when the true difference $a - b$ lies outside $[-2^{w-1}, 2^{w-1})$. Then $a < b$ if and only if SF ⊕ OF $= 1$.
:::

::: proof
The true difference satisfies $-2^w < a - b < 2^w$, and as in [[computer-systems/bits-integers#thm-tadd]] the computed $t$ is the unique value in $[-2^{w-1}, 2^{w-1})$ congruent to $a - b$ modulo $2^w$. If OF $= 0$, then $t = a - b$ exactly, so $a < b \iff t < 0 \iff$ SF $= 1$, which is SF ⊕ OF $= 1$. If OF $= 1$ and $a - b \ge 2^{w-1}$ (so $a > b$), then $t = a - b - 2^w \in [-2^{w-1}, 0)$ is negative and SF $= 1$, so SF ⊕ OF $= 0$, correctly saying "not less". If OF $= 1$ and $a - b < -2^{w-1}$ (so $a < b$), then $t = a - b + 2^w \in (0, 2^{w-1})$ is positive and SF $= 0$, so SF ⊕ OF $= 1$, correctly saying "less".
:::

::: widget truthtable
formula: ~(s xor o)
compare: s <-> o
caption: With $s$ = SF and $o$ = OF, the condition for `jge` ("greater or equal, signed") is ¬(SF ⊕ OF), the negation of the condition for `jl` in [[#thm-sf-of]]. The table shows it is the same as SF = OF: jump when the sign flag tells the truth (no overflow and non-negative) or lies (overflow and negative). Try `(s xor o) | z` against the condition for `jle`.
:::

### Conditionals

The most direct translation of `if (test) then-part else else-part` evaluates the test, jumps over the then-part if it fails, and jumps over the else-part at the end of the then-part:

```c
long absdiff(long x, long y) {
    if (x < y)
        return y - x;
    else
        return x - y;
}
```

```text
absdiff:                    # x in %rdi, y in %rsi
    cmpq    %rsi, %rdi      # compare x with y (computes x - y)
    jge     .L3             # if x >= y goto else-part
    movq    %rsi, %rax      # then-part: rax = y
    subq    %rdi, %rax      #            rax = y - x
    ret
.L3:
    movq    %rdi, %rax      # else-part: rax = x
    subq    %rsi, %rax      #            rax = x - y
    ret
```

The compiler negated the test (`<` became `jge`), so that the then-part follows the comparison directly. At `-O1`, GCC instead computes *both* differences and selects one with a **conditional move**:

```text
absdiff:                    # gcc -O1
    movq    %rsi, %rdx
    subq    %rdi, %rdx      # rdx = y - x
    movq    %rdi, %rax
    subq    %rsi, %rax      # rax = x - y
    cmpq    %rsi, %rdi
    cmovl   %rdx, %rax      # if x < y then rax = rdx
    ret
```

Why do extra work? Modern processors are **pipelined**: they start executing instructions long before earlier ones finish, so at a conditional jump they must *guess* which way it will go (**branch prediction**) and discard the work if the guess was wrong. A mispredicted branch costs around 15–20 cycles on recent processors (an observation about current hardware, not a law), while `cmov` never mispredicts. For short, unpredictable conditionals the conditional move is faster; for long or predictable ones, or when one branch must not be evaluated (`p != NULL ? *p : 0` — dereferencing a null pointer is not allowed even if the result would be discarded), jumps are used.

::: quiz
For `long x, y`, a compiler generates `cmpq %rsi, %rdi` (with `x` in `%rdi`, `y` in `%rsi`) followed by `ja .L5`. What C type must `x` and `y` really have for this to be a correct translation of `if (x > y) goto L5;`?
- [ ] `long`
- [x] `unsigned long`
- [ ] Either; `ja` and `jg` are interchangeable
- [ ] `double`
::: solution
`ja` ("above") tests ¬CF ∧ ¬ZF, an *unsigned* comparison. For signed `long` the compiler must use `jg`. The two differ whenever the operands have different signs: with $x = -1$ and $y = 0$, `jg` does not jump but `ja` does, because $-1$ is $2^{64}-1$ unsigned. Doubles are compared with `ucomisd` on `%xmm` registers, not `cmpq`.
:::
:::

### Loops

A loop becomes a conditional backward jump. GCC at `-Og` compiles `for` and `while` loops by the **jump-to-middle** scheme:

::: algorithm Jump-to-middle translation of a while loop {#alg-jtm}
To translate `while (test) body`:

```text
        jmp test
loop:
        body
test:
        t ← test
        if t goto loop
done:
```

A `for (init; test; update) body` loop is first rewritten as `init; while (test) { body; update; }`.
:::

Here is the array sum of [[computer-systems/c-programming]]:

```c
long sum(const long *a, long n) {
    long s = 0;
    for (long i = 0; i < n; i++)
        s += a[i];
    return s;
}
```

```text
sum:                        # a in %rdi, n in %rsi
    movl    $0, %eax        # i = 0  (writing %eax clears all of %rax)
    movl    $0, %edx        # s = 0
    jmp     .L6             # jump to the test
.L7:
    addq    (%rdi,%rax,8), %rdx   # s += a[i]: address a + 8*i
    addq    $1, %rax              # i++
.L6:
    cmpq    %rsi, %rax      # compare i with n
    jl      .L7             # if i < n goto loop body
    movq    %rdx, %rax      # return s
    ret
```

Every iteration executes one conditional jump, at the bottom. At `-O1` GCC uses the alternative **guarded-do** form — test once before the loop, then a `do`–`while` — and also replaces the index by a pointer that advances 8 bytes per iteration and is compared with `a + n`; that is the **strength reduction** of an index computation into pointer arithmetic, done automatically. The **control-flow graph** of the `-Og` code has one block per straight-line run of instructions and an edge for each possible transfer of control:

::: widget graph
nodes: entry@0,2; test@2,2; body@2,0; exit@4,2
edges: entry>test; test>body; body>test; test>exit
algorithm: dfs
start: entry
caption: The control-flow graph of `sum` at `-Og`: the entry block jumps to the test, the test either enters the body or falls through to the exit, and the body falls through into the test. Step through a depth-first search from the entry. The edge from `body` back to `test` reaches a vertex that is still on the DFS stack — a **back edge** — and in a control-flow graph back edges are exactly what loops look like to a compiler. Optimisers find loops this way before moving invariant computations out of them.
:::

::: example Reverse engineering a loop {#ex-reverse}
GCC produced this code for a function `long mystery(long x, long y)`. Write equivalent C.

```text
mystery:
    movl    $0, %eax
    jmp     .L2
.L3:
    movq    %rdi, %rdx
    andl    $1, %edx
    addq    %rdx, %rax
    sarq    %rdi
.L2:
    cmpq    %rsi, %rdi
    jg      .L3
    ret
```
::: solution
`x` is in `%rdi`, `y` in `%rsi`, and the result in `%rax`, which starts at $0$; call it `r`. The `jmp .L2` to a test at the bottom is the jump-to-middle pattern of [[#alg-jtm]], so this is a `while` loop. The test `cmpq %rsi, %rdi; jg .L3` continues while `x > y` (signed). The body copies `x` to `%rdx`, masks it to its lowest bit (`andl $1, %edx`, which, being a 32-bit operation, also clears the upper half of `%rdx`), adds it to `r`, and shifts `x` right arithmetically by one (`sarq` with no count shifts by $1$). So:

```c
long mystery(long x, long y) {
    long r = 0;
    while (x > y) {
        r += x & 1;
        x >>= 1;
    }
    return r;
}
```

Compiling this C with the same flags reproduces the listing exactly. For $y = 0$ and $x > 0$ it counts the one bits of $x$.
:::
:::

**`switch`** statements with many dense cases are compiled to a **jump table**: an array of code addresses indexed by the case value, used by an indirect jump `jmp *.L4(,%rdi,8)`, so selecting the case takes constant time however many cases there are.

## Procedures

A procedure call must transfer control to the callee and back, pass arguments and a result, and give the callee space for its local variables, all without disturbing the caller. x86-64 does this with the **run-time stack**, a region of memory addressed through `%rsp` that grows towards *lower* addresses.

- `pushq S` decrements `%rsp` by 8 and stores $S$ at `(%rsp)`; `popq D` loads `(%rsp)` into $D$ and increments `%rsp` by 8.
- `call f` pushes the address of the next instruction (the **return address**) and jumps to `f`; `ret` pops an address and jumps to it.

::: definition System V calling convention (x86-64) {#def-abi}
The first six integer or pointer arguments are passed in `%rdi`, `%rsi`, `%rdx`, `%rcx`, `%r8` and `%r9`, in that order; further arguments are pushed on the stack. Floating-point arguments go in `%xmm0`–`%xmm7`. The result is returned in `%rax` (or `%xmm0`). Registers `%rbx`, `%rbp` and `%r12`–`%r15` are **callee-saved**: a function that uses them must restore their values before returning. All other registers are **caller-saved**: a callee may overwrite them, so a caller that needs their values after a call must save them itself. At the moment of a `call`, `%rsp` must be a multiple of 16.
:::

Each active call has a **stack frame**: the region of the stack between the caller's frame and `%rsp` holding its return address, any saved registers, local variables that cannot stay in registers (arrays, variables whose address is taken, spills), and outgoing arguments beyond the sixth. Many simple functions — all of those above — need no frame beyond the return address.

Recursion needs nothing special. Each call gets its own frame:

```c
long rfact(long n) {
    if (n <= 1)
        return 1;
    return n * rfact(n - 1);
}
```

```text
rfact:                      # n in %rdi
    cmpq    $1, %rdi
    jle     .L10            # if n <= 1 goto base case
    pushq   %rbx            # save caller's %rbx (callee-saved)
    movq    %rdi, %rbx      # keep n in %rbx across the call
    leaq    -1(%rdi), %rdi  # argument n - 1
    call    rfact           # rax = rfact(n - 1)
    imulq   %rbx, %rax      # rax = n * rfact(n - 1)
    popq    %rbx            # restore caller's %rbx
    ret
.L10:
    movl    $1, %eax        # base case: return 1
    ret
```

The value of `n` is needed after the recursive call, but `%rdi` is caller-saved and will be overwritten. So the function keeps `n` in the callee-saved `%rbx` — and since `%rbx` belongs to *its* caller, it pushes the old value first and pops it before returning. The convention lets every function be compiled separately and still cooperate.

::: example Tracing the stack {#ex-stack}
Trace `rfact(3)`, called from `main`, showing the stack after each `call` and `push`. Assume that at the `call` in `main`, `%rsp` is `0x7fffffffe000` and `%rbx` holds some value $B$.
::: solution
Addresses decrease downwards; each stack slot is 8 bytes.

| step | instruction | `%rsp` after | new stack slot | registers |
|---|---|---|---|---|
| 1 | `call rfact` in `main` | `…dff8` | return address into `main` | `%rdi` = 3 |
| 2 | `pushq %rbx` | `…dff0` | $B$ | `%rbx` = 3, `%rdi` = 2 |
| 3 | `call rfact` | `…dfe8` | return address into `rfact` (the `imulq`) | |
| 4 | `pushq %rbx` | `…dfe0` | $3$ | `%rbx` = 2, `%rdi` = 1 |
| 5 | `call rfact` | `…dfd8` | return address into `rfact` | |
| 6 | base case, `ret` | `…dfe0` | pops slot 5 | `%rax` = 1 |
| 7 | `imulq`, `popq %rbx`, `ret` | `…dff0` | pops slots 4 and 3 | `%rax` = 2, `%rbx` = 3 |
| 8 | `imulq`, `popq %rbx`, `ret` | `…e000` | pops slots 2 and 1 | `%rax` = 6, `%rbx` = $B$ |

At the deepest point the stack held five slots (40 bytes): each non-base call costs 16 bytes, return address plus saved `%rbx`. On return to `main`, `%rsp` and `%rbx` have their original values, as the convention requires, and the result $6$ is in `%rax`. With the default 8 MiB stack limit of Linux, unbounded recursion (a missing base case) exhausts the stack after roughly half a million such frames and the process is killed with a segmentation fault ([[computer-systems/exceptions-processes]]).
:::
:::

## Arrays, structures and the stack in memory

The address arithmetic of [[computer-systems/c-programming]] translates directly into operands. For `T a[n]`, element `a[i]` is at address $x_a + i \cdot \text{sizeof}(T)$. A two-dimensional array `T m[R][C]` is stored in **row-major order** — all of row $0$, then all of row $1$ — so

$$
\&m[i][j] = x_m + \text{sizeof}(T)\,(C \cdot i + j) .
$$ {#eq-rowmajor}

```c
long get(long m[][3], long i, long j) {
    return m[i][j];
}
```

```text
get:                              # m in %rdi, i in %rsi, j in %rdx
    leaq    (%rsi,%rsi,2), %rax   # rax = 3i
    leaq    (%rdi,%rax,8), %rax   # rax = m + 8*(3i) : start of row i
    movq    (%rax,%rdx,8), %rax   # load from row + 8j
    ret
```

The column count $3$ must be known at compile time (it appears as the `leaq` that multiplies by 3), which is why C requires all but the first dimension in an array parameter. Structure members are accessed at fixed offsets from the structure's address: for `struct pt { int tag; long x; long y; }`, `p->y` compiles to `movq 16(%rdi), %rax`, the offset computed by the alignment rules of [[computer-systems/c-programming#def-alignment]].

::: example Structures in machine code {#ex-struct}
For `struct item { char code; int qty; long price; short vals[3]; };`, GCC produces the following code. Work out the layout of the structure from the C rules, and match each operand to it.

```c
long total(const struct item *it) { return it->qty * it->price; }
short val(const struct item *it, long i) { return it->vals[i]; }
long nth_price(const struct item *items, long k) { return items[k].price; }
```

```text
total:
    movslq  4(%rdi), %rax         # sign-extend it->qty to 64 bits
    imulq   8(%rdi), %rax         # multiply by it->price
    ret
val:
    movzwl  16(%rdi,%rsi,2), %eax # load it->vals[i] (2 bytes)
    ret
nth_price:
    leaq    (%rsi,%rsi,2), %rax   # rax = 3k
    movq    8(%rdi,%rax,8), %rax  # load from items + 24k + 8
    ret
```
::: solution
By [[computer-systems/c-programming#def-alignment]]: `code` at offset $0$; `qty` (alignment 4) at $4$, after 3 bytes of padding; `price` (alignment 8) at $8$; `vals` (alignment 2, three elements) at $16$–$21$. The members end at $22$ and the structure's alignment is $8$, so its size is $24$. (`offsetof` and `sizeof` print `4 8 16 24`.)

`total` reads `qty` at `4(%rdi)` and, since the C expression multiplies an `int` by a `long`, first converts it to `long` with sign extension (`movslq`), then multiplies by the `long` at `8(%rdi)`. `val` addresses `vals[i]` as $16 + it + 2i$: the displacement is the member's offset and the scale is `sizeof(short)`. It loads with zero extension (`movzwl`); the ABI leaves the upper bits of a `short` return value unspecified, so a caller that needs an `int` sign-extends it itself. `nth_price` computes the address of `items[k].price` as $items + 24k + 8$: the element size $24$ becomes `leaq` by $3$ and scale $8$, and the member offset $8$ is the displacement. Every structure and array access reduces to a constant offset plus a scaled index.
:::
:::

### Local arrays and the stack protector

A function with a local array must give it memory in its frame. Here is a function that safely formats a name into a 16-byte buffer, compiled with `-fstack-protector-strong` (the Ubuntu default):

```c
#include <stdio.h>
#include <string.h>

/* Copies a name into a local buffer, safely. */
void greet(const char *name) {
    char buf[16];
    snprintf(buf, sizeof buf, "%s", name);
    puts(buf);
}
```

```text
greet:
    pushq   %rbx                  # (keeps %rsp 16-byte aligned at the calls)
    subq    $32, %rsp             # allocate 32 bytes of frame
    movq    %rdi, %rcx            # 4th argument of snprintf: name
    movq    %fs:40, %rax          # load the secret canary value
    movq    %rax, 24(%rsp)        # store it just above buf
    xorl    %eax, %eax            # wipe the canary from %rax (also: %al = 0 for a variadic call)
    leaq    .LC0(%rip), %rdx      # 3rd argument: format "%s"
    movl    $16, %esi             # 2nd argument: sizeof buf
    movq    %rsp, %rdi            # 1st argument: buf, at the bottom of the frame
    call    snprintf@PLT
    movq    %rsp, %rdi
    call    puts@PLT
    movq    24(%rsp), %rax        # reload the canary from the frame
    subq    %fs:40, %rax          # has it changed?
    jne     .L4                   # yes: the frame was overwritten
    addq    $32, %rsp             # deallocate the frame
    popq    %rbx
    ret
.L4:
    call    __stack_chk_fail@PLT  # abort the program
```

The buffer occupies `(%rsp)` to `15(%rsp)`. Above it, at `24(%rsp)`, the compiler has placed a **canary**: a random value chosen when the program starts and kept in thread-local storage (`%fs:40`). Further up lie the saved `%rbx` and the return address. A write that runs off the end of `buf` towards higher addresses must pass through the canary before it reaches the return address, and the check before `ret` notices the change and aborts the program instead of returning to a corrupted address. Here `snprintf` makes overflow impossible anyway; with `strcpy(buf, name)` and a long `name`, the canary would be what stands between a bug and a hijacked return. This is the mechanism behind the buffer-overflow defences of [[computer-systems/c-programming#sec-ub]]: the canary detects the overwrite, non-executable stacks and ASLR make a corrupted return address hard to use, and shadow stacks keep a protected copy of return addresses.

::: warning The canary is not a bounds check
A stack canary detects only *contiguous* overwrites that reach the return address, and only at the moment the function returns. It does not detect a write that skips over the canary (an out-of-bounds index such as `buf[40] = x`), overwrites of other local variables or of the heap, out-of-bounds *reads* that leak data, or damage that is used before the function returns. Mitigations make exploitation harder; only correct code — checked lengths and indices, or a memory-safe language — removes the bug.
:::

::: history
Maurice Wilkes's EDSAC (1949) introduced the idea of a library of subroutines called by a "jump with return"; David Wheeler's subroutine linkage, the "Wheeler jump", described in 1952, is the ancestor of `call` and `ret`. The stack as the place for procedure activation records came with Algol-60 implementations and with machines such as the Burroughs B5000 (1961). Intel's 8086 (1978) began the x86 line; the 80386 (1985) extended it to 32 bits (IA-32). In 1999–2000 AMD published the x86-64 extension, doubling the registers to sixteen and widening them to 64 bits, and shipped it in the Opteron in 2003; Intel adopted it in 2004. The System V ABI for x86-64, which fixes the calling convention, was drafted by Jan Hubička, Andreas Jaeger, Michael Matz and Mark Mitchell in 2000–2001, before any x86-64 hardware existed.
:::

## Where this leads

The machine code of this chapter is what the [[compilers]] course generates; register allocation, instruction selection and optimisations such as strength reduction are studied there. [[computer-systems/memory-hierarchy]] explains why the memory operands of this chapter take anywhere from one to hundreds of cycles, and [[computer-systems/linking-loading]] what happens to labels such as `snprintf@PLT` and `.LC0(%rip)`. The `%fs` segment register returns in [[parallel-computing]] as the anchor for thread-local storage. How the processor executes instructions — pipelining, branch prediction, out-of-order execution — is computer architecture, in the [Electrical Engineering Atlas](/learn/ee/).

::: summary
- x86-64 state: `%rip`, sixteen 64-bit registers (with 32-, 16- and 8-bit names; writing a 32-bit register zeroes the top half), condition codes, vector registers and byte-addressed memory. AT&T syntax puts the destination last.
- Memory operands $D(R_b, R_i, s)$ compute $D + R_b + s \cdot R_i$ with $s \in \set{1,2,4,8}$ ([[#def-operand]]); `lea` computes the address without accessing memory and doubles as cheap arithmetic.
- Arithmetic sets CF, ZF, SF and OF; `cmp`/`test` set them without storing a result; jumps, `set` and `cmov` read them. Signed less-than is SF ⊕ OF ([[#thm-sf-of]]), unsigned below is CF.
- `if` compiles to conditional jumps or conditional moves; loops to backward jumps (jump-to-middle or guarded-do, [[#alg-jtm]]); dense `switch` to jump tables.
- Calls use the stack: `call` pushes the return address, `ret` pops it. Arguments in `%rdi, %rsi, %rdx, %rcx, %r8, %r9`, result in `%rax`; `%rbx, %rbp, %r12–%r15` are callee-saved ([[#def-abi]]).
- Arrays are row-major and indexed by address arithmetic; structure members sit at fixed offsets.
- Local buffers live next to saved registers and the return address; stack canaries, W⊕X, ASLR and shadow stacks mitigate overflows, but only bounds-correct code eliminates them.
:::

## Exercises

::: exercise Operand arithmetic {level=1 check="284"}
With `%rdi` = `0x100` and `%rsi` = `0x3`, what effective address does `0x10(%rdi,%rsi,4)` compute? And what does `leaq 0x10(%rdi,%rsi,4), %rax` leave in `%rax`? (Enter the address as a decimal number.)
::: solution
By [[#def-operand]] the address is $0x10 + 0x100 + 3 \cdot 4 = 16 + 256 + 12 = 284$, which is `0x11c`. A `movq` with this operand would load the 8 bytes at address `0x11c`; `leaq` stores the address itself, so `%rax` becomes `0x11c` and memory is not touched.
:::
:::

::: exercise What does lea compute? {level=1 check="22"}
If `%rdx` holds $x$, what does `leaq 7(%rdx,%rdx,4), %rax` put in `%rax`? Evaluate for $x = 3$. (Enter the value.)
::: solution
The effective address is $7 + x + 4x = 5x + 7$, and `lea` stores it without accessing memory. For $x = 3$: $22$. A compiler uses this for C such as `5 * x + 7`.
:::
:::

::: exercise Which jumps are taken? {level=1}
After `cmpq %rsi, %rdi` with `%rdi` = $-1$ and `%rsi` = $1$ (both as 64-bit values), which of `je`, `jne`, `jl`, `jg`, `jb`, `ja` jump? Give the flag values.
::: solution
`cmp` computes $-1 - 1 = -2$. ZF $= 0$; SF $= 1$; there is no signed overflow, so OF $= 0$. As unsigned numbers the subtraction is $(2^{64} - 1) - 1$, which needs no borrow, so CF $= 0$. Hence `jne` jumps, `je` does not; `jl` (SF ⊕ OF $= 1$) jumps and `jg` does not, since $-1 < 1$; `jb` (CF) does not jump and `ja` (¬CF ∧ ¬ZF) does, since as unsigned $2^{64} - 1 > 1$.
:::
:::

::: exercise Array element address {level=2 check="1040"}
For `int m[5][7]` starting at address $1000$, at what address is `m[1][3]`? GCC compiles `int el(int m[5][7], long i, long j) { return m[i][j]; }` to `imulq $28, %rsi, %rsi; addq %rsi, %rdi; movl (%rdi,%rdx,4), %eax`. Explain the constant $28$. (Enter the address of `m[1][3]` as a decimal number.)
::: solution
By [[#eq-rowmajor]] with $\text{sizeof(int)} = 4$ and $C = 7$: $1000 + 4(7 \cdot 1 + 3) = 1000 + 40 = 1040$. The constant $28 = 4 \cdot 7$ is the size of one row in bytes: the code adds $28i$ to reach row $i$ and then indexes the row with scale $4$.
:::
:::

::: exercise From assembly to C {level=2}
GCC compiles a function `long pick(long a, long b)` to `cmpq %rdi, %rsi; movq %rdi, %rax; cmovge %rsi, %rax; ret`. What does it compute? Write it in C.
::: solution
`cmpq %rdi, %rsi` compares `b` with `a` (computing $b - a$). `%rax` is set to `a`, and replaced by `b` if $b \ge a$ (signed). So it returns the larger of the two, preferring `b` on ties: `long pick(long a, long b) { return a > b ? a : b; }`, which is the C that produced it.
:::
:::

::: exercise Stack depth {level=2 check="16"}
In the compiled `rfact` above, how many bytes of stack does each non-base-case activation use (count everything pushed by its `call` instruction and by the function itself)? (Enter the number of bytes.)
::: solution
The `call` that enters the activation pushes an 8-byte return address, and the function pushes `%rbx`: $16$ bytes. The base case uses only its 8-byte return address. So `rfact(n)` for $n \ge 1$ uses $16(n - 1) + 8$ bytes at its deepest point (for $n = 3$, $40$ bytes, as in [[#ex-stack]]).
:::
:::

::: exercise Jump-to-middle is correct {level=3}
Prove that the code of [[#alg-jtm]] executes `body` exactly as many times as `while (test) body`, and in the same states, assuming `test` has no side effects other than those of evaluating it once per check. Then show the guarded-do translation `if (!test) goto done; loop: body; if (test) goto loop; done:` is equivalent too.
::: solution
Define the semantics of `while (test) body` by its unrolling: evaluate `test`; if false, stop; otherwise execute `body` and repeat. The jump-to-middle code begins with `jmp test`, so it first evaluates `test`. If false, it falls through to `done`; if true, it jumps to `loop`, executes `body`, and falls through to `test` again. Thus both programs perform the same alternating sequence test, body, test, body, …, test (false) — by induction on the number $k$ of iterations: if the while loop performs $k$ iterations, the $(k+1)$-st evaluation of `test` is the first false one, and the jump-to-middle code performs exactly the same evaluations in the same order and stops at the same one. For guarded-do, the initial `if (!test) goto done` performs the first evaluation; afterwards each `body` is followed by an evaluation that decides whether to repeat — the same sequence again. Guarded-do repeats the test code in two places, which costs code size but lets the compiler optimise the loop, knowing the body runs at least once.
:::
:::

::: exercise Why a canary works {level=3}
In the `greet` frame above, list the frame's contents from `(%rsp)` upwards to the return address. Suppose a buggy version used `strcpy(buf, name)`. Explain which lengths of `name` the canary check detects, which it does not, and why the canary value must be secret and random.
::: solution
From low to high: `buf` at `0(%rsp)`–`15(%rsp)`, 8 unused bytes at `16`–`23`, the canary at `24`–`31`, the saved `%rbx` at `32`–`39`, and the return address at `40`–`47` (above it is the caller's frame). `strcpy` writes `strlen(name) + 1` bytes from `buf` upwards. Up to $16$ bytes (strings of length $\le 15$) are fine. Lengths $16$ to $23$ overwrite only the unused padding: a bug, but neither the canary nor anything live is touched, so nothing is detected. glibc makes the lowest-addressed byte of the canary zero, precisely so that a string copy cannot reproduce the whole canary; a string of length $24$ writes its terminating zero onto that zero byte, which leaves the canary intact and goes undetected too. From length $25$ on, a non-zero character lands on the canary's first byte (and longer strings overwrite more of it), and the check before `ret` aborts. A contiguous overwrite cannot reach the return address at offset 40 without passing the canary. The value must be random and secret: if an attacker knew it, they could write the same value back while overwriting the return address. The canary does not detect writes that skip it or that do their damage before the function returns, which is why it is one layer among several.
:::
:::
