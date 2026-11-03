We now have the two halves of a computer on the table. [[computer-architecture/instruction-set-architecture]] specified what each instruction must do, bit by bit; [[computer-architecture/computer-arithmetic]] and the earlier course [[digital-logic]] supplied the parts — adders and ALUs, multiplexers, registers, memories. In this chapter we put the parts together into a working processor that executes a useful subset of RISC-V: register–register arithmetic, arithmetic with immediates, loads and stores, conditional branches and jumps. It is small enough to understand completely, and every faster processor in the rest of the course is a refinement of it.

The design follows the register-transfer method of [[digital-logic/registers-counters]]: a **datapath** of registers, memories and functional units that move and transform data, and a **control unit** that decides, for each instruction, which paths are used. In the simplest organisation, the **single-cycle processor**, every instruction is completed in exactly one clock cycle: at a rising clock edge the program counter loads the address of an instruction, during the cycle combinational logic fetches and executes it, and at the next edge the results are written into the register file, the data memory and the PC. Its cycles per instruction are exactly $1$; the price, as we shall see, is a long clock period, set by the slowest instruction.

## The building blocks

The processor is built from a handful of state elements and combinational blocks. Their interfaces fix how the datapath can be wired.

- The **program counter** is a 32-bit register, loaded on every rising edge of the clock (and reset to the address of the first instruction).
- The **instruction memory** has a 32-bit address input and a 32-bit data output, and reads combinationally: the instruction appears at its output after an access time $t_{\text{mem}}$. (In a real machine this is an instruction cache; [[computer-architecture/memory-hierarchy]] deals with the fact that it is not always fast.)
- The **register file** holds `x0`–`x31`.
- The **data memory** reads combinationally like the instruction memory and writes on the clock edge when its write enable is asserted.
- The **ALU** computes $A + B$, $A - B$, $A \mathbin{\&} B$, $A \mid B$ and set-less-than, chosen by a 3-bit control input, and outputs a **Zero** flag that is $1$ when the result is zero ([[digital-logic/combinational-building-blocks]]).
- The **immediate generator** (extend unit) assembles the sign-extended 32-bit immediate from the bits of the instruction according to its format.
- Two **adders** compute PC $+ 4$ and the branch target PC $+$ immediate, and **multiplexers** choose between alternative sources.

::: definition Register file {#def-regfile}
A **register file** is an array of $2^k$ registers of $w$ bits with $r$ **read ports** and $q$ **write ports**. Each read port takes a $k$-bit address and outputs the contents of that register combinationally, after a read time $t_{RF}$. Each write port takes an address, $w$ bits of data and a write enable, and writes on the rising clock edge if enabled. The RISC-V integer register file has $k = 5$, $w = 32$, two read ports (for `rs1` and `rs2`) and one write port (for `rd`), and register `x0` always reads as $0$ whatever is written to it.
:::

Note the timing convention, which the whole design relies on: **state elements are written only at clock edges, and everything between edges is combinational.** A register may be read and written in the same cycle; the read returns the old value, and the new value appears after the edge. That is exactly the behaviour an instruction such as `addi x5, x5, 1` needs.

::: definition Single-cycle processor {#def-singlecycle}
A **single-cycle processor** executes each instruction in one clock cycle. All of the instruction's work — fetch, decode, register read, ALU operation, memory access and the choice of the next PC — is done by combinational logic between two clock edges, and all of its effects on architectural state (the register file, the data memory and the PC) are written at the end of the cycle.
:::

## Building the datapath

The best way to design a datapath is one instruction class at a time, adding hardware only when a new instruction needs it. We begin with the most demanding instruction, the load.

### Fetching the instruction

Every instruction begins the same way. The PC drives the address input of the instruction memory, which returns the 32-bit instruction word `Instr`. In parallel, an adder computes `PCPlus4` $=$ PC $+ 4$, the address of the following instruction. For the moment, connect `PCPlus4` to the input of the PC register, so that the processor steps through consecutive instructions.

### Loads: `lw rd, imm(rs1)`

A load must read register `rs1`, add the sign-extended 12-bit immediate, read the data memory at that address and write the result to `rd`.

1. Bits 19–15 of `Instr` (the `rs1` field) drive the first read address of the register file, `A1`; the value of `rs1` appears on read-data port `RD1`.
2. Bits 31–20 (the I-type immediate) go to the immediate generator, which sign-extends them to the 32-bit `ImmExt`.
3. The ALU adds `RD1` and `ImmExt`: `ALUResult` is the memory address.
4. `ALUResult` drives the address of the data memory; the word read appears on its output `ReadData`.
5. `ReadData` is connected to the write-data input `WD3` of the register file, bits 11–7 of `Instr` (`rd`) to its write address `A3`, and the write enable `RegWrite` is asserted. At the next clock edge the loaded value is written into `rd`.

Because `rs1`, `rd` and the sign bit of the immediate are in the same positions in every format (see the encoding table in [[computer-architecture/instruction-set-architecture]]), these connections are plain wires from fixed bit fields — no decoding is needed before the register file is read.

### Stores: `sw rs2, imm(rs1)`

A store computes its address in the same way, but its immediate is split across bits 31–25 and 11–7 (S format), and it reads a second register, `rs2`, whose value is written to memory.

- The immediate generator gets a control input `ImmSrc` that selects which instruction bits form the immediate: I format for loads, S format for stores (and later B and J formats).
- Bits 24–20 (`rs2`) drive the second read address `A2`; `RD2` goes to the write-data input of the data memory.
- The data memory gets a write enable `MemWrite`, asserted for stores; at the clock edge it writes `RD2` at address `ALUResult`.
- `RegWrite` is $0$: a store changes no register.

### Register–register instructions: `add`, `sub`, `and`, `or`, `slt`

R-type instructions read `rs1` and `rs2`, combine them in the ALU and write the result to `rd`. Two new paths are needed:

- The ALU's second operand, `SrcB`, must come either from `RD2` (R-type) or from `ImmExt` (loads, stores, immediates). A multiplexer controlled by `ALUSrc` chooses.
- The value written to the register file must come either from `ReadData` (loads) or from `ALUResult` (arithmetic). A multiplexer controlled by `ResultSrc` chooses; its output is called `Result`.
- The ALU operation is chosen by `ALUControl`.

The I-type arithmetic instructions (`addi`, `andi`, `ori`, `slti`) need nothing new: they use the R-type path with `ALUSrc` selecting the immediate.

### Branches: `beq rs1, rs2, label`

A branch compares two registers and, if they are equal, loads the PC with the target PC $+$ offset.

- The ALU subtracts `RD2` from `RD1`; its Zero flag is $1$ exactly when the registers are equal.
- A second adder computes `PCTarget` $=$ PC $+$ `ImmExt`, with the immediate generator set to the B format (which already supplies the offset with bit 0 equal to $0$; no shift is needed because RISC-V offsets are in bytes).
- A multiplexer in front of the PC selects `PCPlus4` or `PCTarget` under control of `PCSrc`. For `beq`, `PCSrc` $=$ `Branch` $\cdot$ `Zero`, where `Branch` is a control signal asserted for branch instructions.

### Jumps: `jal rd, label`

`jal` writes PC $+ 4$ into `rd` and jumps to PC $+$ offset. The target adder is reused with the J-format immediate; the `ResultSrc` multiplexer gets a third input, `PCPlus4`; and `PCSrc` is forced to $1$ by a control signal `Jump`:

$$
\text{PCSrc} = \text{Branch}\cdot\text{Zero} + \text{Jump}.
$$ {#eq-pcsrc}

This completes the datapath. In summary, it contains the PC, the instruction memory, the register file, the immediate generator, the ALU with its `SrcB` multiplexer, the data memory, the three-input `Result` multiplexer, the two adders and the PC multiplexer.

::: widget graph
nodes: PC@0,2; IMem@1,2; RegFile@2,3; ImmGen@2,1; SrcBMux@3,2; ALU@4,3; DMem@5,3; ResultMux@6,2; PCPlus4@1,0; PCTarget@3,0; PCMux@6,0
edges: PC>IMem; PC>PCPlus4; PC>PCTarget; IMem>RegFile; IMem>ImmGen; RegFile>SrcBMux; ImmGen>SrcBMux; ImmGen>PCTarget; RegFile>ALU; SrcBMux>ALU; ALU>DMem; ALU>ResultMux; DMem>ResultMux; PCPlus4>ResultMux; ALU>PCMux; PCTarget>PCMux; PCPlus4>PCMux
algorithm: topo
caption: The single-cycle datapath as a directed graph of its combinational blocks, from the PC (whose output changes at the clock edge) to the inputs of the register file and the PC (written at the next edge). Run the topological sort: it gives an order in which the signals can settle. The critical path is the longest path through this graph, with each block weighted by its delay; for a load it runs PC → IMem → RegFile → ALU → DMem → ResultMux.
:::

::: quiz
Which datapath components does an `sw` instruction **not** use?
- [ ] the immediate generator
- [ ] the ALU
- [x] the `Result` multiplexer and the register-file write port
- [ ] the second register-file read port
::: solution
A store reads `rs1` (base) and `rs2` (data), adds the S-format immediate in the ALU, and writes the data memory. It writes no register, so `RegWrite` $= 0$ and whatever the `Result` multiplexer selects is ignored; its control `ResultSrc` is a don't-care.
:::
:::

## The control unit

The control unit is purely combinational in a single-cycle processor: it decodes the opcode (bits 6–0) and the function fields `funct3` (bits 14–12) and bit 30 (`funct7` bit 5) of the instruction into the control signals of the datapath. It is conventionally split into a **main decoder**, which looks at the opcode, and an **ALU decoder**, which combines a 2-bit summary `ALUOp` from the main decoder with the function fields.

::: definition Control signals {#def-control}
The single-cycle datapath is controlled by:

- `RegWrite`: write `Result` into register `rd` at the clock edge;
- `ImmSrc` (2 bits): immediate format $00$ = I, $01$ = S, $10$ = B, $11$ = J;
- `ALUSrc`: ALU operand B is $0$ = `RD2`, $1$ = `ImmExt`;
- `MemWrite`: write the data memory at the clock edge;
- `ResultSrc` (2 bits): `Result` is $00$ = `ALUResult`, $01$ = `ReadData`, $10$ = `PCPlus4`;
- `Branch`, `Jump`: combined into `PCSrc` by [[#eq-pcsrc]];
- `ALUOp` (2 bits): $00$ = add, $01$ = subtract, $10$ = determined by `funct3` and `funct7`;
- `ALUControl` (3 bits, from the ALU decoder): $000$ add, $001$ subtract, $010$ AND, $011$ OR, $101$ set-less-than.
:::

The main decoder is a truth table with one row per instruction class:

| instruction | opcode | RegWrite | ImmSrc | ALUSrc | MemWrite | ResultSrc | Branch | ALUOp | Jump |
|---|---|---|---|---|---|---|---|---|---|
| `lw` | `0000011` | 1 | 00 | 1 | 0 | 01 | 0 | 00 | 0 |
| `sw` | `0100011` | 0 | 01 | 1 | 1 | xx | 0 | 00 | 0 |
| R-type | `0110011` | 1 | xx | 0 | 0 | 00 | 0 | 10 | 0 |
| `beq` | `1100011` | 0 | 10 | 0 | 0 | xx | 1 | 01 | 0 |
| I-type ALU | `0010011` | 1 | 00 | 1 | 0 | 00 | 0 | 10 | 0 |
| `jal` | `1101111` | 1 | 11 | x | 0 | 10 | 0 | xx | 1 |

An `x` is a don't-care: the signal does not affect the instruction's result. Don't-cares are useful for minimising the decoder logic, but **write enables are never don't-cares** — a `MemWrite` left unspecified for `beq` could let a branch corrupt memory.

The ALU decoder produces `ALUControl`:

| ALUOp | funct3 | $\text{op}_5$, $\text{funct7}_5$ | instruction | ALUControl |
|---|---|---|---|---|
| 00 | x | x | `lw`, `sw` | 000 (add) |
| 01 | x | x | `beq` | 001 (subtract) |
| 10 | 000 | 00, 01, 10 | `add`, `addi` | 000 (add) |
| 10 | 000 | 11 | `sub` | 001 (subtract) |
| 10 | 010 | x | `slt`, `slti` | 101 (set less than) |
| 10 | 110 | x | `or`, `ori` | 011 (or) |
| 10 | 111 | x | `and`, `andi` | 010 (and) |

The subtle row is subtraction. `sub` is distinguished from `add` by bit 30 of the instruction (`funct7` bit 5). But in `addi`, bit 30 is part of the *immediate*, so an `addi` with a negative immediate has bit 30 set. The decoder must therefore subtract only when the instruction is R-type, which is told by bit 5 of the opcode ($\text{op}_5 = 1$ for `0110011`, $0$ for `0010011`).

::: example Tracing a load through the datapath {#ex-trace}
The PC is `0x1000`, the instruction there is `lw x7, 8(x10)`, register `x10` holds `0x2000` and the data memory holds `0x0000002A` at address `0x2008`. Give the values on the main datapath signals and the control signals during the cycle, and the state after the next clock edge.
::: solution
*Fetch.* The instruction memory returns the encoding of `lw x7, 8(x10)`: immediate $8$, rs1 $= 10$, funct3 $= 010$, rd $= 7$, opcode `0000011`, which is `Instr = 0x00852383` $= 000000001000\;01010\;010\;00111\;0000011_2$. `PCPlus4 = 0x1004`.

*Decode and register read.* `A1` $=$ bits 19–15 $= 01010_2 = 10$, so `RD1 = 0x2000`. `A2` $=$ bits 24–20 $= 01000_2 = 8$ — the low bits of the immediate, read from register `x8` and ignored. The main decoder sees opcode `0000011`: `RegWrite = 1`, `ImmSrc = 00`, `ALUSrc = 1`, `MemWrite = 0`, `ResultSrc = 01`, `Branch = 0`, `ALUOp = 00`, `Jump = 0`. The ALU decoder gives `ALUControl = 000` (add).

*Execute.* `ImmExt = 0x00000008`, `SrcB = ImmExt`, `ALUResult = 0x2000 + 8 = 0x2008`. The Zero flag is $0$, but `Branch = 0`, so `PCSrc = 0`.

*Memory.* `ReadData = 0x0000002A`.

*Write back.* `Result = ReadData = 0x2A`, `A3` $=$ bits 11–7 $= 7$.

*At the clock edge:* `x7` $\leftarrow$ `0x0000002A` (decimal $42$), PC $\leftarrow$ `0x1004`. The data memory is unchanged.
:::
:::

::: widget truthtable
formula: (Branch & Zero) | Jump
compare: (Branch | Jump) & (Zero | Jump)
caption: The PC-select logic of [[#eq-pcsrc]] and an equivalent product-of-sums form. Check the rows: the processor takes the target address on every `jal` (Jump = 1), and on a `beq` (Branch = 1) only when the ALU's Zero flag reports equal registers. The rows with Branch = Jump = 1 never occur, because no instruction asserts both.
:::

## Timing and performance

In a single-cycle processor the clock period must accommodate the slowest instruction, because every instruction gets exactly one cycle.

::: proposition Clock period of a single-cycle processor {#prop-period}
Let $t_{pcq}$ be the clock-to-Q delay of the PC register and of the other state elements, $t_{\text{setup}}$ the setup time of the destination state element, and, for each instruction class $c$, $t_c$ the delay of the longest combinational path that the instruction class uses from the PC to a state element it writes. Then the minimum clock period is

$$
T_c = \max_c\,\bigl(t_{pcq} + t_c + t_{\text{setup}}\bigr).
$$ {#eq-period}
:::

::: proof
At a rising edge the PC changes, after $t_{pcq}$. Every signal the instruction depends on is a combinational function of the new PC and of the state, so it is stable at most $t_{pcq} + t_c$ after the edge. Each state element written by the instruction must see its input stable for $t_{\text{setup}}$ before the next edge ([[digital-logic/latches-flip-flops]]). Since the same clock serves all instructions, the period must satisfy this for the slowest class.
:::

::: example The critical path {#ex-critical}
The components have the following delays: $t_{pcq} = 40\,\mathrm{ps}$; memory read $t_{\text{mem}} = 200\,\mathrm{ps}$; register-file read $t_{RF} = 100\,\mathrm{ps}$; immediate generator $t_{\text{ext}} = 35\,\mathrm{ps}$; multiplexer $t_{\text{mux}} = 30\,\mathrm{ps}$; ALU $t_{\text{ALU}} = 120\,\mathrm{ps}$; setup time of the register file and the data memory $t_{RF,\text{setup}} = 60\,\mathrm{ps}$; setup time of the PC $50\,\mathrm{ps}$. The control unit (about $25\,\mathrm{ps}$) and the adders work in parallel with slower paths. Find the path delay of `lw`, `sw`, R-type and `beq`, and the maximum clock frequency.
::: solution
*`lw`*. The PC changes ($40$); the instruction is read ($200$). The ALU needs `RD1` from the register file ($100$) and `SrcB` from the immediate generator through the `ALUSrc` multiplexer ($35 + 30 = 65$), so its inputs are ready $100\,\mathrm{ps}$ after the instruction. Then the ALU ($120$), the data memory read ($200$), the `Result` multiplexer ($30$) and the register-file setup ($60$):

$$
T_{lw} = 40 + 200 + 100 + 120 + 200 + 30 + 60 = 750\,\mathrm{ps}.
$$

*R-type*: no memory access, but `SrcB` comes from the register file through the multiplexer ($100 + 30 = 130$): $40 + 200 + 130 + 120 + 30 + 60 = 580\,\mathrm{ps}$.

*`sw`*: the address and data must be at the data memory a setup time before the edge: $40 + 200 + 100 + 120 + 60 = 520\,\mathrm{ps}$.

*`beq`*: the Zero flag must pass the PC multiplexer and meet the PC's setup time: $40 + 200 + 130 + 120 + 30 + 50 = 570\,\mathrm{ps}$ (neglecting the AND–OR gate of [[#eq-pcsrc]]).

The load is slowest: $T_c = 750\,\mathrm{ps}$, $f_{\max} = 1/750\,\mathrm{ps} = 1.33\,\mathrm{GHz}$. Its critical path passes through **both** memories, which is typical: memory access, not logic, sets the pace of a single-cycle machine.
:::
:::

::: quiz
In the processor of [[#ex-critical]], the ALU is replaced by one that is $40\,\mathrm{ps}$ faster. By how much does the clock period shrink?
- [ ] not at all, because the memories dominate
- [x] by $40\,\mathrm{ps}$, because the ALU lies on the critical (load) path
- [ ] by $80\,\mathrm{ps}$, because loads use the ALU twice
- [ ] by $160\,\mathrm{ps}$, because four instruction classes use the ALU
::: solution
Every instruction class's path contains the ALU exactly once, and the load path is still the longest after the change ($710\,\mathrm{ps}$, against $540$ for R-type). So the period falls from $750$ to $710\,\mathrm{ps}$. Speeding up a block helps only if it lies on the critical path, and only until another path becomes critical.
:::
:::

With CPI $= 1$, the execution time of a program of IC instructions is $\text{IC} \times T_c$; a billion instructions take $0.75\,\mathrm{s}$ at $750\,\mathrm{ps}$.

### The cost of a fixed cycle

The single-cycle design wastes time: an R-type instruction is ready after $580\,\mathrm{ps}$ but must wait the full $750$. Suppose a program executes $25\,\%$ loads, $10\,\%$ stores, $50\,\%$ R-type and I-type arithmetic and $15\,\%$ branches. If every instruction could take exactly its own time, the average would be

$$
0.25(750) + 0.10(520) + 0.50(580) + 0.15(570) = 615\,\mathrm{ps},
$$

and the processor would be $750/615 = 1.22$ times faster. A clock whose period changes from instruction to instruction is impractical, but the observation suggests two fixes: break each instruction into several shorter steps, each one clock cycle (the **multicycle** processor), or overlap the steps of successive instructions (the **pipelined** processor of [[computer-architecture/pipelining]]).

The deeper inefficiency is that most of the hardware is idle most of the time: while the data memory is being read, the instruction memory and the register file have nothing to do. The pipeline puts them to work on other instructions.

::: example A multicycle processor {#ex-multicycle}
A multicycle implementation of the same instruction set uses a single memory for instructions and data and one ALU (which also computes PC $+ 4$ and branch targets), with registers between the steps. Its clock period is set by the slowest step, a memory access with an address multiplexer in front: $t_{pcq} + t_{\text{mux}} + t_{\text{mem}} + t_{\text{setup}} = 40 + 30 + 200 + 50 = 320\,\mathrm{ps}$. Loads take $5$ cycles, stores and arithmetic $4$, branches $3$. For the instruction mix above, is it faster than the single-cycle processor?
::: solution
The average CPI is

$$
\text{CPI} = 0.25(5) + 0.10(4) + 0.50(4) + 0.15(3) = 1.25 + 0.40 + 2.00 + 0.45 = 4.10,
$$

so the average time per instruction is $4.10 \times 320\,\mathrm{ps} = 1312\,\mathrm{ps}$, which is $1.75$ times **slower** than the single-cycle processor's $750\,\mathrm{ps}$. Splitting the work into steps adds a register overhead ($t_{pcq} + t_{\text{setup}} = 90\,\mathrm{ps}$) to every step, and the steps are unbalanced: a register-file read ($100\,\mathrm{ps}$) gets a whole $320\,\mathrm{ps}$ cycle. The multicycle design saves hardware — one memory, one ALU, no separate adders — which mattered when memory was expensive and still matters for the smallest microcontrollers, but it is not the route to speed. Overlapping instructions is.
:::
:::

::: warning The clock period is not the sum of all delays
A common error is to add up the delay of every component in the datapath. The clock period is set by the **longest path** that an instruction actually uses, and components that work in parallel contribute only the slower of their delays: the immediate generator runs alongside the register-file read, the branch-target adder alongside the ALU, the control unit alongside the register file. Conversely, do not forget the clock-to-Q and setup times at the two ends of the path — in fast designs they are a large fraction of the cycle.
:::

## Extending the processor

Adding an instruction is a design exercise in three steps: decide which datapath paths it needs, add any missing hardware, and add a row to the decoders. Good ISA design shows itself here: in RISC-V most new instructions fit the existing datapath with little or no change.

::: example Adding `lui` {#ex-lui-design}
Extend the processor to execute `lui rd, imm` (U format, opcode `0110111`), which writes `imm` $\ll 12$ into `rd`.
::: solution
*Paths.* The instruction reads no register and needs no ALU operation: the value to be written is the immediate itself.

*Hardware.* Two changes:

1. The immediate generator gets a fifth format, U: `ImmExt = {Instr[31:12], 12'b0}`. `ImmSrc` grows to 3 bits, with $100$ for U (and the existing codes extended with a leading $0$).
2. The `Result` multiplexer gets a fourth input, `ImmExt`, selected by `ResultSrc = 11`.

(An alternative is to add an ALU operation "pass B" and route the immediate through the ALU with `ALUSrc = 1`. That avoids widening the `Result` multiplexer but lengthens the ALU's control decoding; either is acceptable.)

*Control row* for opcode `0110111`: `RegWrite = 1`, `ImmSrc = 100`, `ALUSrc = x`, `MemWrite = 0`, `ResultSrc = 11`, `Branch = 0`, `ALUOp = xx`, `Jump = 0`.

*Timing.* The new path is PC → instruction memory → immediate generator → `Result` multiplexer → register file: $40 + 200 + 35 + 30 + 60 = 365\,\mathrm{ps}$, far shorter than the load. The clock period does not change. The only cost on the critical path is that the `Result` multiplexer now has four inputs, which may add a few picoseconds to the load path.
:::
:::

::: remark Hard-wired and microprogrammed control
The control unit here is hard-wired: two small decoders built from gates. When instruction sets were large and irregular, control units were instead **microprogrammed** (an idea of Maurice Wilkes, 1951): each machine instruction was carried out by a short program of microinstructions stored in a control ROM, each of which set the datapath controls for one cycle. Microprogramming made complex instructions easy to add and to fix; its cost is the time to read the control store. Modern x86-64 processors decode common instructions in hard-wired logic and fall back to a microcode ROM only for rare, complex ones.
:::

::: application Small RISC-V cores
The single-cycle and multicycle designs are not just teaching tools. As of 2026, open-source RISC-V cores for FPGAs and tiny embedded controllers — the kind that manage power sequencing or a sensor inside a larger chip — are often non-pipelined or have only two or three stages, because area and power matter more than speed. A minimal RV32I core of this kind fits in about a thousand to a few thousand FPGA look-up tables ([[digital-logic/memories-programmable-logic]]), and writing one in Verilog ([[digital-logic/hardware-description]]) is a standard student project.
:::

::: history
The organisation of a processor into a datapath and a control unit goes back to von Neumann's 1945 *First Draft*, which separated the "central arithmetic" part from the "central control". The early stored-program machines were bit-serial and multicycle, since logic was expensive; EDSAC (1949) executed about 650 instructions per second. Maurice Wilkes introduced microprogramming in 1951, and the IBM System/360 of 1964 used it to give models of very different cost the same instruction set. The textbook single-cycle RISC datapath, with its main and ALU decoders, was popularised by David Patterson and John Hennessy's *Computer Organization and Design* (first edition 1994) and by David and Sarah Harris's *Digital Design and Computer Architecture* (2007), whose RISC-V editions use the subset of instructions treated here.
:::

## Where this leads

The single-cycle processor is the starting point of [[computer-architecture/pipelining]], which cuts its datapath into five stages with registers between them, so that five instructions are in progress at once and the clock period shrinks to roughly the delay of one memory access. Pipelining creates new problems — an instruction may need a result its predecessor has not yet written, and a branch is resolved only after the following instructions have been fetched — which the next chapter solves. The memories assumed here to answer in a fixed time are caches, and what happens when they miss is the subject of [[computer-architecture/memory-hierarchy]]. [[computer-architecture/performance]] puts the CPI and clock-period figures of this chapter into the general performance equation, and the design of the gates and flip-flops that set the delays is covered in [[digital-ic/sequential-circuits-clocking]].

::: summary
- A processor is a datapath (PC, instruction memory, register file, immediate generator, ALU, data memory, adders and multiplexers) steered by a control unit.
- In a single-cycle processor ([[#def-singlecycle]]) each instruction is executed by combinational logic in one cycle and its results are written at the next clock edge; CPI $= 1$.
- The datapath is designed instruction class by instruction class; RISC-V's fixed register fields let registers be read before decoding.
- The control unit is a main decoder on the opcode and an ALU decoder on `ALUOp`, `funct3` and bit 30 ([[#def-control]]); write enables must never be don't-cares.
- $\text{PCSrc} = \text{Branch}\cdot\text{Zero} + \text{Jump}$ selects the branch or jump target.
- The clock period is set by the slowest instruction ([[#prop-period]]), usually the load, whose path runs through both memories.
- A multicycle design reuses hardware but adds register overhead; overlapping instructions in a pipeline is the way to higher performance.
:::

## Exercises

::: exercise Control signals for `or` {level=1}
Give the values of all main-decoder outputs and of `ALUControl` for `or x5, x6, x7`.
::: solution
R-type: `RegWrite = 1`, `ImmSrc = xx`, `ALUSrc = 0`, `MemWrite = 0`, `ResultSrc = 00`, `Branch = 0`, `ALUOp = 10`, `Jump = 0`. With `funct3 = 110`, the ALU decoder outputs `ALUControl = 011` (OR).
:::
:::

::: exercise Clock frequency {level=1 check="1/(750e-12)"}
What is the maximum clock frequency, in hertz, of the processor of [[#ex-critical]]?
::: solution
$f = 1/T_c = 1/(750\times 10^{-12}\,\mathrm{s}) = 1.33\times 10^{9}\,\mathrm{Hz}$.
:::
:::

::: exercise Idle hardware {level=1}
For each of `add`, `sw` and `beq`, list the major datapath components whose outputs are not used.
::: solution
`add`: the data memory (read but ignored), the immediate generator and the branch-target adder. `sw`: the `Result` multiplexer, the register-file write port and the branch-target adder. `beq`: the data memory and the `Result` multiplexer; the ALU result itself is used only through its Zero flag. Every instruction leaves something idle — the opportunity that pipelining exploits.
:::
:::

::: exercise Tracing a branch {level=2}
The instruction `0xFE6288E3` is at address `0x0040`. Registers hold `x5 = 7` and `x6 = 7`. Decode the instruction and give `ImmExt`, `ALUResult`, `Zero`, `PCTarget`, `PCSrc` and the next PC.
::: hint
Opcode `1100011` is a branch. Reassemble the B-format immediate from bits 31, 7, 30–25 and 11–8.
:::
::: solution
Binary: $1\,111111\;00110\;00101\;000\;1000\,1\;1100011$. Opcode `1100011`, funct3 $000$: `beq`. rs1 $= 00101 = 5$, rs2 $= 00110 = 6$. Immediate: bit 12 $=$ Instr[31] $= 1$, bits 10–5 $=$ Instr[30:25] $= 111111$, bits 4–1 $=$ Instr[11:8] $= 1000$, bit 11 $=$ Instr[7] $= 1$, bit 0 $= 0$: $1\,1\,111111\,1000\,0_2$ as a 13-bit signed number is $-16$. So the instruction is `beq x5, x6, -16`.

`ImmExt = 0xFFFFFFF0`, `ALUResult = 7 - 7 = 0`, `Zero = 1`, `PCTarget = 0x40 - 16 = 0x30`, `PCSrc = Branch·Zero = 1`. The next PC is `0x0030`.
:::
:::

::: exercise A faster memory {level=2 check="650e-12"}
The memories of [[#ex-critical]] are replaced by faster ones with $t_{\text{mem}} = 150\,\mathrm{ps}$. What is the new clock period in seconds? Which instruction class is now critical?
::: solution
$T_{lw} = 40 + 150 + 100 + 120 + 150 + 30 + 60 = 650\,\mathrm{ps}$. R-type: $40 + 150 + 130 + 120 + 30 + 60 = 530\,\mathrm{ps}$; `beq` $520\,\mathrm{ps}$; `sw` $470\,\mathrm{ps}$. The load is still critical, at $650\,\mathrm{ps} = 6.5\times 10^{-10}\,\mathrm{s}$; the improvement of $100\,\mathrm{ps}$ is exactly the saving of $50\,\mathrm{ps}$ in each of the two memories on its path.
:::
:::

::: exercise Adding `bne` {level=2}
Extend the control so that the processor also executes `bne` (funct3 $= 001$, same opcode as `beq`). Change as little as possible.
::: solution
`bne` uses exactly the datapath of `beq`: subtract and test Zero, with the same B-format immediate and target adder. Only the condition is inverted. Since `beq` and `bne` differ in `funct3` bit 0, replace [[#eq-pcsrc]] by

$$
\text{PCSrc} = \text{Branch}\cdot(\text{Zero} \oplus \text{funct3}_0) + \text{Jump}.
$$

For `beq` ($\text{funct3}_0 = 0$) this is `Branch·Zero` as before; for `bne` it is `Branch·¬Zero`. The main decoder needs no new row, because both instructions share the opcode. The XOR gate adds a few picoseconds to the branch path, which is not critical.
:::
:::

::: exercise Program run time {level=2 check="0.75"}
A program executes $10^9$ instructions on the processor of [[#ex-critical]]. How long does it take, in seconds?
::: solution
CPI $= 1$, so $T = 10^9 \times 1 \times 750\times 10^{-12}\,\mathrm{s} = 0.75\,\mathrm{s}$. The instruction mix does not matter for a single-cycle processor — another way of saying that it wastes time on fast instructions.
:::
:::

::: exercise Adding `jalr` {level=3}
Extend the datapath and control to execute `jalr rd, imm(rs1)` (I format, opcode `1100111`), which writes PC $+ 4$ into `rd` and jumps to `rs1 + imm` (with bit 0 of the target cleared). Give the hardware changes, the control row and the effect on the clock period.
::: solution
*Paths.* The target is `rs1` plus the I-format immediate: exactly what the ALU computes for a load. The link value PC $+ 4$ is already available as a `Result` input.

*Hardware.* The PC multiplexer gets a third input, `ALUResult` with bit 0 forced to $0$, so `PCSrc` becomes a 2-bit signal: $00$ = `PCPlus4`, $01$ = `PCTarget`, $10$ = `ALUResult`. The main decoder gets an output `JumpReg` (say), and $\text{PCSrc} = (\text{JumpReg},\ \text{Branch}\cdot\text{Zero} + \text{Jump})$.

*Control row* for `1100111`: `RegWrite = 1`, `ImmSrc = 00` (I), `ALUSrc = 1`, `MemWrite = 0`, `ResultSrc = 10` (`PCPlus4`), `Branch = 0`, `ALUOp = 00` (add), `Jump = 0`, `JumpReg = 1`.

*Timing.* The new path is PC → instruction memory → register file → ALU → PC multiplexer → PC setup: $40 + 200 + 100 + 120 + 30 + 50 = 540\,\mathrm{ps}$ (plus a little for the wider multiplexer). It is shorter than the load path, so the clock period stays at $750\,\mathrm{ps}$, provided the three-input PC multiplexer does not make the branch path critical ($570 + $ a few ps $< 750$).
:::
:::

::: exercise Stuck-at faults {level=3}
A manufacturing defect makes one control signal stuck at a constant value. For each fault, say which instructions of the subset (`lw`, `sw`, R-type, I-type ALU, `beq`, `jal`) still work correctly: (a) `ALUSrc` stuck at $1$; (b) `RegWrite` stuck at $0$; (c) `ResultSrc` stuck at $00$; (d) `MemWrite` stuck at $1$.
::: hint
For each instruction, compare the stuck value with the value it needs; a don't-care is harmless.
:::
::: solution
(a) `ALUSrc` $= 1$ is correct for `lw`, `sw` and I-type ALU instructions and a don't-care for `jal`. R-type instructions would use the immediate field instead of `rs2`, and `beq` would compare `rs1` with the B-immediate — both fail.

(b) `RegWrite` $= 0$: only instructions that write no register work: `sw` and `beq`. Loads, arithmetic and `jal` all fail.

(c) `ResultSrc` $= 00$ (always `ALUResult`): R-type and I-type ALU instructions work, as do `sw` and `beq` (don't-care). `lw` writes the address instead of the data, and `jal` writes whatever the ALU produces instead of the return address: both fail.

(d) `MemWrite` $= 1$: every instruction writes `RD2` into memory at address `ALUResult`. Only `sw` works as intended; every other instruction corrupts memory as a side effect, even if its own result is right. This is the most damaging fault, and the reason write enables must be fully specified in the decoder.
:::
:::

::: exercise Balancing a multicycle design {level=3}
In the multicycle processor of [[#ex-multicycle]], suppose the memory is split so that the slowest step takes $t_{pcq} + t_{\text{mem}} + t_{\text{setup}} = 40 + 200 + 50 = 290\,\mathrm{ps}$, and the program has the same instruction mix. (a) What is the time per instruction? (b) How fast would the memory have to be for the multicycle processor to match the single-cycle one, assuming the memory step remains the slowest and the single-cycle period scales as in [[#ex-critical]]?
::: solution
(a) $\text{CPI} = 4.10$ as before, so $4.10\times 290 = 1189\,\mathrm{ps}$ — still $1.59$ times slower than $750\,\mathrm{ps}$.

(b) With memory time $m$, the single-cycle period is $T_1 = 350 + 2m$ ps (from $40 + m + 100 + 120 + m + 30 + 60$), and the multicycle time per instruction is $T_2 = 4.10(90 + m)$. Setting $T_2 = T_1$: $369 + 4.10m = 350 + 2m$, so $2.10m = -19$, which is impossible for $m > 0$. However fast the memory, the multicycle design never catches up for this mix: its CPI of $4.1$ multiplies the register overhead of $90\,\mathrm{ps}$, and once the memory is fast, the other steps — register read, ALU — become the slowest step anyway. Multicycle designs win only when instruction times are very unequal (for example with a slow multiplier or divider that would otherwise stretch every cycle).
:::
:::
