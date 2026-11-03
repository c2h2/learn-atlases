Open any electronic product with a screen, a motor or a radio in it and you will find at least one processor. The processor in a washing machine and the one in a data-centre server differ by a factor of a million in speed and in transistor count, yet they work in the same way: they fetch an **instruction** from memory, decode it, perform a small operation on a few registers or a word of memory, and move on to the next instruction. The complete list of instructions a processor understands, together with the registers and memory they act on and the exact bit patterns that encode them, is its **instruction set architecture** (ISA).

The ISA is the contract between hardware and software. A compiler writer needs to know nothing about pipelines, caches or transistor sizes; it is enough to know what each instruction does. A hardware designer needs to know nothing about the programs that will run; it is enough to implement every instruction exactly as specified. Because of this contract, a program compiled in 2010 for a 64-bit Arm phone still runs on a 2026 phone whose implementation is completely different, and the same Linux kernel image boots on processors from several vendors. In this chapter we learn one ISA well — **RISC-V**, an open instruction set designed for teaching and industry alike — and use it to see how the constructs of a high-level language become instructions and how instructions become bits. The rest of the course then builds hardware that executes these bits.

This chapter takes the hardware designer's view of the instruction set: what the instructions must provide and why they are encoded as they are. The programmer's view of machine code, with x86-64 and the details of how a C compiler uses it, is in [Machine-level programs](/learn/cs/lesson.php?c=computer-systems&l=machine-code). Binary and two's complement numbers are assumed from [[digital-logic/number-systems]].

## The stored-program computer

The idea that made general-purpose computers possible is that **the program is data**. Instructions are stored as binary words in the same memory as the numbers they operate on. The processor keeps a special register, the **program counter** (PC), holding the address of the next instruction, and repeats one cycle for ever:

1. **Fetch** the instruction word at address PC.
2. **Decode** it: determine the operation and its operands.
3. **Execute** it: read registers, compute with the arithmetic logic unit (ALU), access memory if required, write the result.
4. **Update** the PC: normally to the following instruction, or to a branch target.

This is a finite-state machine of the kind studied in [[digital-logic/finite-state-machines]], with an enormous state (all registers and memory) and a next-state function defined instruction by instruction. The organisation — processor, single memory for instructions and data, input and output — is called the **von Neumann architecture**. A variant with separate instruction and data memories is called a **Harvard architecture**; most modern processors are von Neumann machines to the programmer but Harvard machines internally, with separate instruction and data caches ([[computer-architecture/memory-hierarchy]]).

::: definition Instruction set architecture {#def-isa}
The **instruction set architecture** of a processor is the part of its design visible to software: the set of instructions and their meaning, the registers and their widths, the memory model (address size, byte order, alignment rules), the encoding of every instruction as a bit pattern, and the behaviour on exceptions. An **implementation** or **microarchitecture** is a particular hardware design that executes the ISA, and the same ISA may have many implementations differing in speed, power and cost.
:::

The distinction between architecture and implementation was made explicit by IBM in 1964 for the System/360 family, whose models spanned a factor of about fifty in performance but all ran the same programs. Today the commercially dominant ISAs are **x86-64** (Intel and AMD, in personal computers and servers), **Arm** (AArch64 in phones, tablets, many laptops and a growing share of servers; 32-bit Arm in microcontrollers) and **RISC-V**, an open standard that anyone may implement without a licence fee, used in microcontrollers, accelerators and, increasingly as of 2026, application processors.

### Why RISC-V

RISC-V was designed at the University of California, Berkeley from 2010 as a clean, modular ISA. Its base integer instruction set, **RV32I** (32-bit registers and addresses), has only about forty instructions, small enough to implement completely in this course. Optional **extensions** add capabilities and are named by letters: **M** (integer multiply and divide), **A** (atomic memory operations), **F** and **D** (single- and double-precision floating point), **C** (compressed 16-bit encodings of common instructions) and **V** (vectors). A general-purpose 64-bit processor implements RV64 with at least the "G" bundle (IMAFD plus a few small extensions) and C. Everything in this chapter applies to RV64 as well, with 64-bit registers and a few extra instructions for 32-bit operations.

## Registers and arithmetic

Arithmetic in RISC-V never operates on memory directly: operands come from a small, fast **register file** inside the processor, and results go back into it. RV32I has 32 general-purpose registers `x0` to `x31`, each 32 bits wide, plus the PC. Register `x0` is special: it always reads as $0$, and writes to it are discarded. This single design decision lets many useful operations be expressed with other instructions instead of needing their own, as we shall see.

Why 32 registers? A register is named by a field in the instruction, and $5$ bits name $2^5 = 32$ registers. More registers would let compilers keep more variables out of memory, but each extra bit in each of the three register fields of an instruction costs encoding space, and a larger register file is slower to read. Thirty-two is a common compromise; x86-64 has 16 integer registers, AArch64 has 31.

Software agrees on how registers are used by a **calling convention**, part of the **application binary interface** (ABI). The ABI gives each register a second name that reminds the programmer of its role:

| register | ABI name | use | preserved across calls? |
|---|---|---|---|
| `x0` | `zero` | constant $0$ | — |
| `x1` | `ra` | return address | no |
| `x2` | `sp` | stack pointer | yes |
| `x3`, `x4` | `gp`, `tp` | global pointer, thread pointer | — |
| `x5`–`x7`, `x28`–`x31` | `t0`–`t6` | temporaries | no |
| `x8`, `x9`, `x18`–`x27` | `s0`–`s11` | saved registers (`s0` is also the frame pointer `fp`) | yes |
| `x10`–`x17` | `a0`–`a7` | function arguments; `a0`, `a1` also return values | no |

The hardware treats all registers except `x0` identically; the roles are a software convention, but every compiler and library must follow the same one so that their code can call each other.

### Arithmetic and logic instructions

The arithmetic instructions take three operands: a destination register and two sources. In assembly language the destination is written first:

```
add  rd, rs1, rs2     # rd = rs1 + rs2
sub  rd, rs1, rs2     # rd = rs1 - rs2
and  rd, rs1, rs2     # bitwise AND;  also or, xor
sll  rd, rs1, rs2     # shift left logical by rs2[4:0]; also srl, sra
slt  rd, rs1, rs2     # rd = 1 if rs1 < rs2 (signed), else 0; sltu: unsigned
```

Each has an **immediate** form in which the second operand is a constant held in the instruction itself: `addi`, `andi`, `ori`, `xori`, `slli`, `srli`, `srai`, `slti`, `sltiu`. There is no `subi`, because `addi` with a negative constant does the same job. The immediate is a 12-bit two's complement number, sign-extended to 32 bits before use ([[digital-logic/number-systems]]), so it lies between $-2048$ and $+2047$.

All arithmetic is modulo $2^{32}$: `add` and `sub` produce the low 32 bits of the true result and do not trap on overflow. The same adder serves for signed and unsigned numbers, because two's complement addition and unsigned addition give the same bit pattern; only the interpretation, and the comparison instructions `slt` versus `sltu`, differ. Software that must detect overflow does so with an extra comparison. The difference between logical and arithmetic right shift matters only for signed numbers: `srl` fills with zeros, `sra` copies the sign bit, so `sra` by $k$ divides a signed number by $2^k$ rounding towards $-\infty$.

::: widget modular
n: 16
mode: add
a: 9
caption: Addition in a 4-bit register is addition modulo 16. Row $a$, column $b$ gives the stored sum. Read it twice: as unsigned numbers $9 + 9 = 18$ wraps to $2$, and as two's complement numbers ($9 = 1001_2$ means $-7$) the same bits say $-7 + -7 = -14$, which overflows to $+2$. The hardware cannot tell the difference — only the program knows which interpretation it intended. A 32-bit RISC-V register behaves exactly like this with $n = 2^{32}$.
:::

### Pseudo-instructions

Because `x0` is always zero, many convenient operations are special cases of real instructions. The assembler accepts **pseudo-instructions** and translates them:

| pseudo-instruction | meaning | real instruction |
|---|---|---|
| `nop` | do nothing | `addi x0, x0, 0` |
| `mv rd, rs` | copy | `addi rd, rs, 0` |
| `li rd, c` (small $c$) | load constant | `addi rd, x0, c` |
| `neg rd, rs` | negate | `sub rd, x0, rs` |
| `not rd, rs` | bitwise complement | `xori rd, rs, -1` |
| `seqz rd, rs` | $rd = 1$ if $rs = 0$ | `sltiu rd, rs, 1` |
| `j label` | jump | `jal x0, label` |
| `ret` | return from procedure | `jalr x0, 0(x1)` |

The `seqz` trick deserves a second look: as an unsigned number, $rs < 1$ holds only for $rs = 0$.

### Large constants

A 12-bit immediate cannot hold a 32-bit constant. RISC-V builds one in two instructions. **`lui rd, imm20`** (load upper immediate) places a 20-bit constant in bits 31–12 of `rd` and zeros in bits 11–0; an `addi` then adds the low 12 bits. Because `addi` sign-extends its immediate, a low part with bit 11 set is effectively negative, and the upper part must be increased by one to compensate.

::: example Loading a 32-bit constant {#ex-lui}
Load the constant `0x12345FFF` into register `t0`.
::: solution
Split the constant: upper 20 bits `0x12345`, lower 12 bits `0xFFF`. The naive sequence `lui t0, 0x12345` followed by `addi t0, t0, 0xFFF` is wrong: as a 12-bit two's complement immediate, `0xFFF` is $-1$, so it would give `0x12345000` $- 1$ = `0x12344FFF`.

Instead write the low part as the signed number $-1$ and raise the upper part by one:

```
lui  t0, 0x12346      # t0 = 0x12346000
addi t0, t0, -1       # t0 = 0x12346000 - 1 = 0x12345FFF
```

In general, with $c$ the constant and $\ell$ its low 12 bits read as a signed number ($\ell = c \bmod 4096$, minus $4096$ if that is $2048$ or more), the upper immediate is $(c - \ell)/4096$ taken modulo $2^{20}$. The assembler pseudo-instruction `li t0, 0x12345FFF` performs this calculation automatically.
:::
:::

## Memory and addressing

Registers hold only a few dozen values; arrays, structures and the stack live in memory. RISC-V memory is an array of $2^{32}$ **bytes** (in RV32), each with its own address. A 32-bit **word** occupies four consecutive bytes, a **halfword** two.

Only two kinds of instruction touch memory, **loads** (memory to register) and **stores** (register to memory). This is why RISC-V is called a **load–store architecture**. All of them compute the address the same way, by adding a 12-bit signed displacement to a base register:

```
lw   rd, offset(rs1)    # rd = word at address rs1 + offset
lh   rd, offset(rs1)    # halfword, sign-extended;  lhu: zero-extended
lb   rd, offset(rs1)    # byte, sign-extended;      lbu: zero-extended
sw   rs2, offset(rs1)   # word at rs1 + offset = rs2;  also sh, sb
```

::: definition Byte order {#def-endian}
A multi-byte value stored at address $A$ occupies addresses $A, A+1, \dots$. In **little-endian** order the least significant byte is at the lowest address $A$; in **big-endian** order the most significant byte is at $A$. RISC-V, x86-64 and (in their usual configuration) Arm are little-endian; network protocols transmit integers in big-endian order.
:::

The word `0x12345678` stored at address `0x100` on a little-endian machine therefore occupies `0x100`: `78`, `0x101`: `56`, `0x102`: `34`, `0x103`: `12`. Byte order is invisible as long as a value is written and read with the same width; it becomes visible when a word is read byte by byte, or when data move between machines with different conventions.

A word access is **aligned** if its address is a multiple of $4$ (a halfword access if even). Aligned accesses never straddle two cache lines or two pages, which keeps the hardware simple. The RISC-V base ISA allows implementations to handle misaligned accesses slowly, in software, or to raise an exception; compilers align data so that the question rarely arises.

::: example Signed and unsigned bytes {#ex-bytes}
Memory at address `0x2000` holds the little-endian word `0x89ABCDEF`, and `a0` holds `0x2000`. What do `lw t0, 0(a0)`, `lb t1, 1(a0)`, `lbu t2, 1(a0)` and `lh t3, 2(a0)` put in their destination registers?
::: solution
The bytes at `0x2000` to `0x2003` are `EF`, `CD`, `AB`, `89`.

- `lw t0, 0(a0)` reads all four: `t0 = 0x89ABCDEF`.
- `lb t1, 1(a0)` reads byte `0xCD = 11001101`$_2$. Its top bit is $1$, so sign extension gives `t1 = 0xFFFFFFCD`, which is $-51$ as a signed number.
- `lbu t2, 1(a0)` reads the same byte and zero-extends it: `t2 = 0x000000CD` $= 205$.
- `lh t3, 2(a0)` reads the halfword at `0x2002`: low byte `AB`, high byte `89`, so the value is `0x89AB`, negative; sign extension gives `t3 = 0xFFFF89AB` $= -30293$.

The choice between `lb` and `lbu` is the compiler's way of honouring the C types `signed char` and `unsigned char`.
:::
:::

### Addressing modes

The ways an instruction can specify an operand are its **addressing modes**. RISC-V has deliberately few:

- **Register**: the operand is in a register (`add`).
- **Immediate**: the operand is a constant in the instruction (`addi`).
- **Base plus displacement**: the memory address is a register plus a constant (`lw`, `sw`).
- **PC-relative**: a branch or jump target is the address of the instruction plus a constant (`beq`, `jal`, and `auipc`, which adds an upper immediate to the PC).

Other ISAs offer more: x86-64 can compute `base + index × scale + displacement` in a single load and can use a memory operand directly in an `add`; older architectures had auto-increment and memory-indirect modes. Each complex mode saves an instruction in some programs but complicates the hardware — and, as the history of the 1980s showed, compilers often failed to use them. RISC-V provides the simple modes and relies on the compiler to combine them.

::: example Accessing an array element {#ex-array}
Compile the C statement `a[i] = a[i] + 10;`, where `a` is an array of 32-bit `int`s whose base address is in `a0` and `i` is in `a1`.
::: solution
The element `a[i]` is at byte address $\texttt{a0} + 4i$, since each `int` occupies four bytes. RISC-V has no scaled-index mode, so we compute the address explicitly:

```
slli t0, a1, 2        # t0 = 4*i   (shift left by 2 multiplies by 4)
add  t0, a0, t0       # t0 = &a[i]
lw   t1, 0(t0)        # t1 = a[i]
addi t1, t1, 10       # t1 = a[i] + 10
sw   t1, 0(t0)        # a[i] = t1
```

Five instructions. Forgetting the scaling by four, and adding `i` directly to the base address, is the most common mistake in hand-written assembly: it reads a word that straddles elements `a[i/4]` and its neighbour.
:::
:::

::: quiz
Register `s0` holds `0x00001000`. Which instruction loads the 32-bit word at address `0x00000FF8`?
- [ ] `lw t0, 8(s0)`
- [x] `lw t0, -8(s0)`
- [ ] `lw t0, -2(s0)`, because words are 4 bytes
- [ ] none; displacements cannot be negative
::: solution
The address is base plus a signed byte displacement: $\texttt{0x1000} - 8 = \texttt{0xFF8}$. Displacements are in bytes, not words, and are 12-bit signed numbers, so any offset from $-2048$ to $+2047$ is allowed.
:::
:::

## Control flow

Without a way to change the PC, a program could only execute its instructions once, in order. **Conditional branches** compare two registers and, if the condition holds, add a signed offset to the PC; otherwise execution continues with the next instruction at PC $+ 4$:

```
beq  rs1, rs2, label    # branch if rs1 == rs2;   bne: if !=
blt  rs1, rs2, label    # branch if rs1 <  rs2 signed;  bge: >= signed
bltu rs1, rs2, label    # unsigned versions;            bgeu
```

There is no "branch if greater than", because `bgt a, b` is `blt b, a` with the operands swapped; the assembler accepts `bgt`, `ble`, `beqz` and similar as pseudo-instructions. Unconditional transfers use **`jal rd, label`** (jump and link: `rd` = PC $+ 4$, then PC = label) and **`jalr rd, offset(rs1)`** (jump to the address in a register plus an offset, also saving PC $+ 4$ in `rd`). With `rd = x0` the saved address is discarded and the instruction is a plain jump.

High-level control structures map onto branches in a few standard patterns. An `if` statement branches *around* its body using the opposite condition; a loop places its test at the top or the bottom and branches back.

::: example Compiling a loop {#ex-loop}
Compile the function

```c
int sum(int *a, int n) {
    int s = 0;
    for (int i = 0; i < n; i++) s += a[i];
    return s;
}
```

with `a` in `a0`, `n` in `a1` and the result returned in `a0`. How many instructions does it execute for $n = 100$?
::: solution
Use `t0` for `i` and `a2` for `s`. The loop tests `i < n` at the top and exits when `i >= n`:

```
sum:   li   a2, 0           # s = 0
       li   t0, 0           # i = 0
loop:  bge  t0, a1, done    # exit when i >= n
       slli t1, t0, 2       # t1 = 4*i
       add  t1, a0, t1      # t1 = &a[i]
       lw   t2, 0(t1)       # t2 = a[i]
       add  a2, a2, t2      # s += a[i]
       addi t0, t0, 1       # i++
       j    loop
done:  mv   a0, a2          # return value
       ret
```

*Counting.* Each iteration executes the seven instructions from `bge` to `j`. For $n = 100$ there are $100$ iterations, then one final `bge` that exits, plus the two initialisations and the two instructions after `done`: $2 + 7\times 100 + 1 + 2 = 705$ instructions.

*A better version.* A compiler would notice that `i` is only used to form the address, and step a pointer instead, with the test at the bottom (valid when $n \ge 1$; a check for $n \le 0$ goes before the loop):

```
sum:   li   a2, 0
       slli t0, a1, 2
       add  t0, a0, t0      # t0 = &a[n], one past the end
loop:  lw   t2, 0(a0)
       add  a2, a2, t2
       addi a0, a0, 4       # next element
       bne  a0, t0, loop
       mv   a0, a2
       ret
```

Now each iteration has four instructions: $3 + 4\times 100 + 2 = 405$ instructions, $1.74$ times fewer. Instruction count is one of the three factors of execution time ([[computer-architecture/performance]]), and reducing it is the first job of an optimising compiler.
:::
:::

The structure of compiled code is clearest as a **control-flow graph**: nodes are **basic blocks**, straight-line sequences of instructions with one entry at the top and one exit at the bottom, and arrows are the possible transfers between them.

::: widget graph
nodes: entry@0,2; test@2,2; body@4,3; done@4,1
edges: entry>test; test>body; body>test; test>done
algorithm: dfs
start: entry
caption: The control-flow graph of the first version of `sum`. The block `test` holds the single `bge`; `body` holds the six instructions from `slli` to `j`. Step through a depth-first search from `entry`: the edge from `body` back to `test` reaches a block already on the search path — a back edge, which is how compilers recognise loops.
:::

### Branch offsets

Branch and jump targets are encoded **PC-relative**: the instruction holds the distance in bytes from its own address to the target. Code that uses only PC-relative branches works wherever it is loaded in memory (it is **position-independent**), and the offset is usually small even though the addresses themselves are large.

In the first version of `sum`, place `sum` at address $0$. Then `loop` (the `bge`) is at `0x08`, the `j` at `0x20` and `done` at `0x24`. The offset of `bge` is $\texttt{0x24} - \texttt{0x08} = 28$; the offset of `j loop` is $\texttt{0x08} - \texttt{0x20} = -24$.

## Instruction encoding

Every RV32I instruction is exactly 32 bits long, and all fit into six **formats** that place the fields in the same positions whenever possible. Bits 6–0 always hold the **opcode**, which selects the format and the instruction class; `funct3` (bits 14–12) and `funct7` (bits 31–25) refine the operation.

| format | bits 31–25 | 24–20 | 19–15 | 14–12 | 11–7 | 6–0 | used by |
|---|---|---|---|---|---|---|---|
| R | funct7 | rs2 | rs1 | funct3 | rd | opcode | register–register ALU |
| I | imm[11:5] | imm[4:0] | rs1 | funct3 | rd | opcode | ALU immediate, loads, `jalr` |
| S | imm[11:5] | rs2 | rs1 | funct3 | imm[4:0] | opcode | stores |
| B | imm[12\|10:5] | rs2 | rs1 | funct3 | imm[4:1\|11] | opcode | branches |
| U | imm[31:12] | | | | rd | opcode | `lui`, `auipc` |
| J | imm[20\|10:1\|11\|19:12] | | | | rd | opcode | `jal` |

In the I format the immediate occupies all of bits 31–20; in the U and J formats the immediate fills bits 31–12. The opcodes of RV32I are `0110011` (R-type ALU), `0010011` (I-type ALU), `0000011` (loads), `0100011` (stores), `1100011` (branches), `1101111` (`jal`), `1100111` (`jalr`), `0110111` (`lui`) and `0010111` (`auipc`).

Three regularities make the hardware simple:

- **Register specifiers never move.** `rs1` is always in bits 19–15, `rs2` in 24–20 and `rd` in 11–7, so the register file can be read *before* the instruction is decoded, in parallel with decoding.
- **The sign bit of every immediate is bit 31.** Sign extension can start immediately, whatever the format.
- **Immediates are scrambled to keep bits in place.** In S, B and J formats the immediate bits are split so that each bit appears in as few positions as possible across formats. This looks odd to a human but reduces the multiplexers in the immediate generator of [[computer-architecture/single-cycle-processor]].

::: example Encoding instructions {#ex-encode}
Encode `add x5, x6, x7` and `sub x5, x6, x7` in hexadecimal, and decode the word `0x00A50533`.
::: solution
*`add x5, x6, x7`* is R-type with funct7 $= 0000000$, rs2 $= 7 = 00111$, rs1 $= 6 = 00110$, funct3 $= 000$, rd $= 5 = 00101$, opcode $= 0110011$:

$$
\underbrace{0000000}_{\text{funct7}}\,\underbrace{00111}_{rs2}\,\underbrace{00110}_{rs1}\,\underbrace{000}_{f3}\,\underbrace{00101}_{rd}\,\underbrace{0110011}_{op}
$$

Grouping into hexadecimal digits from the left: $0000\,0000\,0111\,0011\,0000\,0010\,1011\,0011$ = `0x007302B3`.

*`sub`* differs only in funct7 $= 0100000$, which sets bit 30: `0x007302B3` + `0x40000000` = `0x407302B3`. Using one bit to choose between addition and subtraction is no accident: in the ALU that bit drives the "subtract" control input of [[digital-logic/combinational-building-blocks]].

*Decoding `0x00A50533`.* In binary: $0000000\,01010\,01010\,000\,01010\,0110011$. Opcode `0110011` is R-type; funct3 $= 000$ and funct7 $= 0$ give `add`; rd $=$ rs1 $=$ rs2 $= 01010_2 = 10$. The instruction is `add x10, x10, x10`, that is `add a0, a0, a0`, which doubles `a0`.
:::
:::

::: proposition Ranges of RV32I immediates {#prop-ranges}
The immediates of the RV32I formats have the following ranges:

1. I and S formats: a 12-bit signed integer, $-2048 \le \text{imm} \le 2047$.
2. B format: a 13-bit signed even integer, so branches reach $-4096 \le \text{offset} \le 4094$ bytes from the branch, about $\pm 1000$ instructions.
3. J format: a 21-bit signed even integer, so `jal` reaches $-2^{20} \le \text{offset} \le 2^{20} - 2$ bytes, about $\pm 1\,\mathrm{MiB}$.
4. U format: any multiple of $2^{12}$ as a 32-bit pattern.
:::

::: proof
A $k$-bit two's complement integer ranges from $-2^{k-1}$ to $2^{k-1} - 1$ ([[digital-logic/number-systems]]). The I and S formats store 12 bits, giving $-2048$ to $2047$. The B format stores bits 12 to 1 of the offset (12 stored bits) and takes bit 0 to be $0$: the offset is a 13-bit signed integer that is even, ranging from $-2^{12} = -4096$ to $2^{12} - 2 = 4094$. The J format stores bits 20 to 1 (20 stored bits) with bit 0 again zero: $-2^{20}$ to $2^{20} - 2$. The U format stores bits 31–12 and sets bits 11–0 to zero.

Why is bit 0 not stored? All 32-bit instructions are at addresses that are multiples of $4$, and with the C extension at multiples of $2$, so a target offset is always even. Not storing bit 0 doubles the range for free. (The designers chose "multiple of 2" rather than "multiple of 4" so that the same encodings work when 16-bit compressed instructions are present.)
:::

A function longer than about 4 KiB needs care: a compiler that finds a branch target out of range inverts the condition and branches over a `jal`, which reaches $\pm 1\,\mathrm{MiB}$. Targets further away use `auipc` and `jalr`, which together reach any 32-bit address.

::: warning Offsets are in bytes and relative to the branch itself
Branch offsets count bytes, not instructions, and are measured from the address of the branch instruction, not from the following instruction (as in some older ISAs such as MIPS, where the offset was in words relative to PC $+ 4$). A branch back over three instructions to the instruction before them has offset $-12$; a branch to itself has offset $0$. When you hand-encode branches, also remember that bit 0 of the offset is not stored.
:::

::: quiz
Why can RISC-V read the register file in parallel with decoding the instruction?
- [ ] because all instructions use three registers
- [x] because `rs1` and `rs2` are always in the same bit positions, whatever the format
- [ ] because the opcode is decoded by software
- [ ] because the register file is part of memory
::: solution
The hardware simply reads the registers named by bits 19–15 and 24–20 of every instruction. If the instruction turns out not to use them (an `lui`, say), the values are ignored. Fixed field positions remove the dependency of register access on decoding, which shortens the critical path of the processor.
:::
:::

## Procedures and the stack

A procedure (function) call needs four things: pass arguments, transfer control, return a result, and come back to the caller with its registers in a state it can rely on. RISC-V implements the transfer with two instructions — `jal ra, f` jumps to `f` and leaves the return address in `ra`; `ret` (`jalr x0, 0(ra)`) jumps back — and leaves the rest to the calling convention.

::: definition Calling convention {#def-callconv}
In the standard RISC-V calling convention:

1. The first eight integer arguments are passed in `a0`–`a7`, and the result is returned in `a0` (and `a1` for a 64-bit result in RV32). Further arguments go on the stack.
2. Registers `s0`–`s11` and `sp` are **callee-saved**: a procedure that changes them must restore their values before returning.
3. Registers `t0`–`t6`, `a0`–`a7` and `ra` are **caller-saved**: a procedure may overwrite them freely, so a caller that needs their values after a call must save them itself.
4. The **stack** grows downwards from high addresses; `sp` points to the last used word and is kept a multiple of $16$ bytes.
:::

A procedure's area of the stack is its **stack frame**. On entry, a procedure that needs to save registers decrements `sp` by the frame size and stores them; before returning it reloads them and restores `sp`. A **leaf** procedure, one that calls no other, can often use only temporaries and needs no frame at all.

::: example A procedure that calls another {#ex-proc}
Compile

```c
int sq(int x)            { return x * x; }
int dist2(int x, int y)  { return sq(x) + sq(y); }
```

using `mul` from the M extension.
::: solution
`sq` is a leaf and needs no stack frame:

```
sq:     mul  a0, a0, a0      # a0 = x*x
        ret
```

`dist2` must keep `y` and the first square alive across calls to `sq`, which may overwrite all `a` and `t` registers. It uses two callee-saved registers, `s0` and `s1`, and must therefore save their old values; it must also save `ra`, which the `jal` instructions overwrite. Three words need $12$ bytes, rounded up to a $16$-byte frame:

```
dist2:  addi sp, sp, -16     # allocate the frame
        sw   ra, 12(sp)
        sw   s0, 8(sp)
        sw   s1, 4(sp)
        mv   s0, a1          # y survives the call in s0
        jal  ra, sq          # a0 = x*x
        mv   s1, a0          # x*x survives in s1
        mv   a0, s0
        jal  ra, sq          # a0 = y*y
        add  a0, a0, s1      # x*x + y*y
        lw   s1, 4(sp)       # restore and return
        lw   s0, 8(sp)
        lw   ra, 12(sp)
        addi sp, sp, 16
        ret
```

If `dist2` had forgotten to save `ra`, its own `ret` would jump to the instruction after the second `jal`, inside `dist2` itself — an endless loop. If it had kept `y` in `t0` instead of `s0`, the result would depend on whether `sq` happened to use `t0`: a bug that appears only when `sq` is changed.
:::
:::

::: remark Saving registers costs memory traffic
Every saved register is a store on entry and a load on exit. The split into caller-saved and callee-saved registers lets the compiler choose: values that do not need to survive a call go in temporaries (no saving at all in a leaf procedure), and values that do go in saved registers (saved once per procedure, not once per call). Register allocation, the compiler's task of making these choices, is described in [Code generation and register allocation](/learn/cs/lesson.php?c=compilers&l=code-generation).
:::

## Designing an instruction set

Why does RISC-V look like this, and x86-64 so different? An ISA designer balances several goals: programs should be small (memory and instruction caches are limited), easy for compilers to generate, and fast and cheap to execute on a range of implementations, today and for decades to come.

Two philosophies have competed. **Complex instruction set computers** (CISC), typified by the DEC VAX and the Intel x86, offer powerful instructions — memory operands in arithmetic, string copy instructions, many addressing modes — with variable-length encodings (1 to 15 bytes in x86-64). They grew up when memory was expensive and much code was written by hand. **Reduced instruction set computers** (RISC), typified by MIPS, SPARC, Arm and RISC-V, offer simple instructions of fixed length, arithmetic only on registers, and few addressing modes. The RISC argument, made in the early 1980s, was quantitative: compilers used mostly the simple instructions anyway, and simple fixed-length instructions can be **pipelined** ([[computer-architecture/pipelining]]) so that a new one starts every clock cycle.

::: theorem The processor performance equation {#thm-perfeq}
The execution time of a program is

$$
T = \text{IC} \times \text{CPI} \times t_{\text{clk}} = \frac{\text{IC} \times \text{CPI}}{f_{\text{clk}}},
$$ {#eq-perf}

where IC is the number of instructions executed (the dynamic instruction count), CPI the average number of clock cycles per instruction, and $t_{\text{clk}} = 1/f_{\text{clk}}$ the clock period.
:::

::: proof
The time is the number of clock cycles times the clock period. Partition the executed instructions by the number of cycles each takes: if $n_k$ instructions take $c_k$ cycles, the total cycle count is $\sum_k n_k c_k = \text{IC}\cdot\bigl(\sum_k n_k c_k\bigr)/\text{IC} = \text{IC} \times \text{CPI}$, where CPI is by definition this weighted average. Multiplying by $t_{\text{clk}}$ gives [[#eq-perf]]. (With pipelining instructions overlap, and "cycles taken by an instruction" is understood as its contribution to the total cycle count; the equation still holds with CPI = total cycles / IC.)
:::

The ISA influences all three factors. CISC instructions do more each, lowering IC; RISC instructions are simpler, lowering CPI and allowing a shorter clock period. Since the mid-1990s the distinction has blurred inside the hardware: x86-64 processors translate their instructions into simple internal **micro-operations** and execute those on a RISC-like core, and RISC ISAs have acquired some complex instructions (vector operations, cryptography, fused multiply–add). The ISA still matters, for the cost of decoding and the quality of code, but less than the microarchitecture. [[computer-architecture/performance]] develops the equation fully.

::: example Comparing two instruction sequences {#ex-isacompare}
A hypothetical CISC instruction `addm [a0], t1` adds a register to a word in memory, replacing three RISC-V instructions (`lw`, `add`, `sw`). On a processor where the RISC-V instructions take $1$ cycle each and `addm` takes $4$ cycles, which sequence is faster for this operation at the same clock frequency? What if the clock of the CISC design must be $10\,\%$ slower?
::: solution
RISC-V: $3$ instructions $\times 1$ cycle $= 3$ cycles. CISC: $1$ instruction $\times 4$ cycles $= 4$ cycles. At the same clock the RISC sequence is faster by a factor $4/3 = 1.33$, despite executing three times as many instructions. With a $10\,\%$ slower CISC clock, the period is $1/0.9 = 1.11$ times longer, and the ratio grows to $4 \times 1.111/3 = 1.48$. The comparison depends entirely on CPI and clock rate, not on instruction count alone — the core of the RISC argument.
:::
:::

::: application Instruction sets in 2026
As of 2026, x86-64 dominates desktop computers and most servers; AArch64 runs essentially all smartphones, Apple's computers since 2020, and a growing share of cloud servers; and 32-bit Arm Cortex-M cores dominate microcontrollers. RISC-V has spread fastest in microcontrollers, storage and network controllers and custom accelerators, where its lack of licence fees and its freedom to add custom instructions are valuable, and the RVA23 profile (ratified in 2024) defines a common base, including the vector extension, for application processors running general-purpose operating systems. Code density matters in embedded systems: the RISC-V C extension encodes the commonest instructions in 16 bits and typically shrinks programs by a quarter or more.
:::

::: history
The stored-program principle was set out in John von Neumann's *First Draft of a Report on the EDVAC* (1945), drawing on the work of J. Presper Eckert and John Mauchly at the University of Pennsylvania; the first stored-program machines to run were the Manchester Baby (June 1948) and Cambridge's EDSAC (May 1949). The word *architecture* for the programmer-visible design was introduced by Gene Amdahl, Gerrit Blaauw and Frederick Brooks in their 1964 description of the IBM System/360. John Cocke's IBM 801 project of the late 1970s, David Patterson's Berkeley RISC (with Carlo Séquin) and John Hennessy's Stanford MIPS in the early 1980s established the RISC approach; Patterson and David Ditzel's paper "The Case for the Reduced Instruction Set Computer" appeared in 1980. RISC-V began in 2010 at Berkeley with Krste Asanović, Yunsup Lee, Andrew Waterman and Patterson, and its development passed to the RISC-V Foundation in 2015, now RISC-V International.
:::

## Where this leads

The next chapter, [[computer-architecture/computer-arithmetic]], builds the circuits that the arithmetic instructions need: fast adders, multipliers, dividers and floating-point units. [[computer-architecture/single-cycle-processor]] then turns the formats of this chapter into a datapath — register file, immediate generator, ALU and memories — and a control unit that decodes the opcode, and [[computer-architecture/pipelining]] overlaps instructions, where the regular encoding pays off. The calling convention and the stack reappear when interrupts must save state in [[computer-architecture/input-output]]. On the software side, the compiler's choice of instructions is the subject of [Code generation and register allocation](/learn/cs/lesson.php?c=compilers&l=code-generation), and embedded programs written close to the hardware are the subject of [[embedded-systems]].

::: summary
- The ISA ([[#def-isa]]) is the contract between software and hardware: instructions, registers, memory model and encodings. Many implementations can share one ISA.
- A stored-program computer fetches the instruction at the PC, decodes and executes it, and updates the PC — a large finite-state machine.
- RISC-V RV32I has 32 registers (`x0` always zero), three-operand arithmetic on registers, 12-bit sign-extended immediates, and `lui`/`addi` for 32-bit constants.
- It is a load–store architecture with byte addresses, little-endian byte order ([[#def-endian]]) and base-plus-displacement addressing; array indices must be scaled by the element size.
- Branches and jumps are PC-relative with byte offsets; branches reach $\pm 4\,\mathrm{KiB}$ and `jal` $\pm 1\,\mathrm{MiB}$ ([[#prop-ranges]]).
- All instructions are 32 bits in six formats with fixed register fields and the sign bit at bit 31, which simplifies decoding.
- The calling convention ([[#def-callconv]]) divides registers into caller- and callee-saved; non-leaf procedures save `ra` and any `s` registers in a stack frame.
- Execution time is IC × CPI × clock period ([[#thm-perfeq]]); ISA choices trade instruction count against CPI and clock rate.
:::

## Exercises

::: exercise The largest immediate {level=1 check="2047"}
What is the largest constant that `addi` can add to a register in a single instruction?
::: solution
The immediate is a 12-bit two's complement number, so its range is $-2^{11}$ to $2^{11} - 1$, that is $-2048$ to $2047$. The largest is $2047$.
:::
:::

::: exercise Reading a byte {level=1 check="240"}
The little-endian word `0xCAFEF00D` is stored at address `0x4000`, and `a0 = 0x4000`. What value (in decimal) does `lbu t0, 1(a0)` place in `t0`? What would `lb` give?
::: solution
The bytes at `0x4000`–`0x4003` are `0D`, `F0`, `FE`, `CA`. The byte at `0x4001` is `0xF0` $= 240$. `lbu` zero-extends it: $240$. `lb` sign-extends it (top bit $1$): `0xFFFFFFF0` $= -16$.
:::
:::

::: exercise Decoding an instruction {level=1}
Decode the word `0xFFC42283`.
::: solution
Binary: $111111111100\;01000\;010\;00101\;0000011$. Opcode `0000011` is a load; funct3 $= 010$ is `lw`. rd $= 00101 = 5$, rs1 $= 01000 = 8$. The immediate $111111111100_2$ is $-4$. The instruction is `lw x5, -4(x8)`, or `lw t0, -4(s0)`: load the word just below the frame pointer.
:::
:::

::: exercise A large constant {level=2}
Write a two-instruction sequence that loads `0xDEADBEEF` into `a0`.
::: hint
The low 12 bits are `0xEEF`, whose bit 11 is set.
:::
::: solution
The low 12 bits `0xEEF` $= 3823$ read as a signed 12-bit number are $3823 - 4096 = -273$. The upper part must therefore be $(\texttt{0xDEADBEEF} + 273)/4096$ = `0xDEADC`:

```
lui  a0, 0xDEADC      # a0 = 0xDEADC000
addi a0, a0, -273     # a0 = 0xDEADC000 - 0x111 = 0xDEADBEEF
```

Check: `0xDEADC000` $-$ `0x111` = `0xDEADBEEF`.
:::
:::

::: exercise Compiling a maximum {level=2}
Compile `int max(int a, int b) { return a > b ? a : b; }` with arguments in `a0`, `a1`. Use as few instructions as you can.
::: solution
If $a > b$ the result `a0` is already in place; otherwise copy `b`:

```
max:    blt  a1, a0, done    # if b < a, keep a
        mv   a0, a1          # else result = b
done:   ret
```

Three instructions. `blt a1, a0` expresses $a > b$ by swapping the operands; there is no `bgt` instruction (the assembler accepts `bgt a0, a1, done` and emits exactly this). For unsigned arguments, `bltu` would be needed.
:::
:::

::: exercise A branch offset {level=2 check="28"}
In the first version of `sum` in [[#ex-loop]], with `sum` at address $0$, what offset in bytes is encoded in the `bge` instruction?
::: solution
`bge` is the third instruction, at address $8$ (`0x08`). Counting on, `slli` is at `0x0C`, `add` `0x10`, `lw` `0x14`, `add` `0x18`, `addi` `0x1C`, `j` `0x20`, and `done` at `0x24` $= 36$. The offset is $36 - 8 = 28$ bytes. (The encoded B-type word for `bge t0, a1, done` is `0x00B2DE63`.)
:::
:::

::: exercise Counting instructions {level=2 check="4005"}
How many instructions does the second (pointer) version of `sum` in [[#ex-loop]] execute for $n = 1000$? Compare with the first version.
::: solution
Three instructions before the loop, four per iteration, two after: $3 + 4\times 1000 + 2 = 4005$. The first version executes $2 + 7\times 1000 + 1 + 2 = 7005$. The ratio $7005/4005 = 1.749$ approaches $7/4$ for large $n$, since the loop body dominates.
:::
:::

::: exercise String length {level=3}
Write a RISC-V procedure `strlen` that returns in `a0` the number of bytes before the first zero byte of the string whose address is passed in `a0`. Count the instructions executed for a string of length $L$.
::: hint
Step a pointer through the string with `lbu` and `addi`, and subtract the start address at the end.
:::
::: solution
```
strlen: mv   t0, a0          # t0 = p = s
loop:   lbu  t1, 0(t0)       # t1 = *p
        beqz t1, done        # stop at the terminating zero
        addi t0, t0, 1       # p++
        j    loop
done:   sub  a0, t0, a0      # length = p - s
        ret
```

The loop executes four instructions per non-zero byte, and two (`lbu`, `beqz`) for the terminating zero; with `mv`, `sub` and `ret` the total is $4L + 5$. Rotating the loop so that the test is at the bottom saves the `j`: 

```
strlen: mv   t0, a0
loop:   lbu  t1, 0(t0)
        addi t0, t0, 1
        bnez t1, loop
        sub  a0, t0, a0
        addi a0, a0, -1      # p ran one past the zero
        ret
```

which executes $3(L+1) + 4 = 3L + 7$ instructions — fewer for $L \ge 3$. It is a leaf procedure that uses only temporaries, so it needs no stack frame. `lbu` rather than `lb` matters only for clarity here, since we compare with zero; for characters above `0x7F`, `lb` would give negative values.
:::
:::

::: exercise A recursive procedure {level=3}
Compile `int fact(int n) { return n <= 1 ? 1 : n * fact(n - 1); }`. How many bytes of stack does `fact(10)` use at its deepest point?
::: hint
Each activation that makes a recursive call must save `ra` and `n`.
:::
::: solution
```
fact:   li   t0, 1
        bgt  a0, t0, recur   # n > 1 ?
        li   a0, 1           # base case: return 1
        ret
recur:  addi sp, sp, -16
        sw   ra, 12(sp)
        sw   a0, 8(sp)       # save n
        addi a0, a0, -1
        jal  ra, fact        # a0 = fact(n-1)
        lw   t0, 8(sp)       # t0 = n
        mul  a0, t0, a0      # n * fact(n-1)
        lw   ra, 12(sp)
        addi sp, sp, 16
        ret
```

Here `n` is saved in the frame rather than in an `s` register, which avoids having to save the `s` register too. The calls `fact(10)`, `fact(9)`, …, `fact(2)` each allocate a $16$-byte frame before calling; `fact(1)` is the base case and allocates none. At the deepest point there are $9$ frames: $9 \times 16 = 144$ bytes.
:::
:::

::: exercise Choosing the number of registers {level=3}
A designer considers a variant of RV32I with 64 registers. (a) How many bits do the R-format register fields then occupy, and how many bits remain for opcode and function fields in a 32-bit instruction? (b) How many bits would an I-format immediate keep if the opcode, funct3 and the two register fields stay as they are otherwise? (c) Give one benefit and two costs of the change.
::: solution
(a) Six bits per register field, $18$ bits for three, leaving $32 - 18 = 14$ bits for opcode and function fields, instead of $17$ (opcode $7$ + funct3 $3$ + funct7 $7$).

(b) The I format holds rd, rs1, funct3 and opcode: $6 + 6 + 3 + 7 = 22$ bits, leaving $10$ bits for the immediate (range $-512$ to $511$) instead of $12$. Branch, load and store offsets would shrink similarly.

(c) Benefit: compilers can keep more values in registers, so fewer loads and stores ("spills"), lowering IC and memory traffic. Costs: smaller immediates and fewer free opcodes (more instructions needed for constants and offsets; less room for future extensions), a larger and slower register file (longer read time can lengthen the clock period), and more state to save on every context switch and interrupt. Measurements on typical programs show diminishing returns beyond about 32 registers, which is why most RISC ISAs settled there.
:::
:::
