The single-cycle processor of [[computer-architecture/single-cycle-processor]] does one thing at a time. While a load is reading the data memory, the instruction memory, the register file and the ALU all sit idle, waiting for the next clock edge. A car factory does not build one car at a time from start to finish; it puts cars on an assembly line, and while one has its wheels fitted the next has its doors attached and a third is being painted. Each car still takes as long to build as before, but a finished car leaves the line every few minutes.

**Pipelining** applies the same idea to instructions. We cut the datapath into stages separated by registers, and start a new instruction every clock cycle, so that at any moment several instructions are in progress, each in a different stage. The time to execute one instruction does not fall — it rises a little — but the rate at which instructions complete approaches one per short clock cycle. Every processor faster than a small microcontroller is pipelined; the most aggressive have pipelines of fifteen to twenty stages.

Pipelining is simple in principle and subtle in practice, because instructions depend on each other. An instruction may need a register value that its predecessor has computed but not yet written; a branch decides where the program goes next only after the following instructions have already been fetched. These **hazards** are the subject of most of this chapter: how to detect them, how to avoid stalling by **forwarding** results, and how to guess the outcome of branches with **branch prediction**.

## The idea of pipelining

Consider any combinational logic with total delay $T$ that is used once per operation, with a register at its output. Unpipelined, it completes one operation every $T + t_o$, where $t_o = t_{pcq} + t_{\text{setup}}$ is the register overhead. Now cut the logic into $k$ stages of delay $T/k$ each, with a register after every stage. A new operation can enter every $T/k + t_o$, while each operation takes $k(T/k + t_o) = T + kt_o$ to pass through.

::: definition Latency and throughput {#def-latency}
The **latency** of a pipeline is the time from the start of an operation to its completion. Its **throughput** is the number of operations completed per unit time in the steady state. A pipeline with $k$ balanced stages and clock period $T_c = T/k + t_o$ has latency $kT_c$ and throughput $1/T_c$.
:::

::: theorem Speedup of a pipeline {#thm-speedup}
Let $n$ independent operations pass through a $k$-stage pipeline with balanced stages, total logic delay $T$ and register overhead $t_o$ per stage. Relative to the unpipelined circuit (one operation per $T + t_o$), the speedup is

$$
S(n, k) = \frac{n(T + t_o)}{(k + n - 1)(T/k + t_o)} \;\xrightarrow[n\to\infty]{}\; \frac{T + t_o}{T/k + t_o} .
$$ {#eq-speedup}

The limit is less than $k$, and it is bounded by $(T + t_o)/t_o$ however many stages are used.
:::

::: proof
Unpipelined, $n$ operations take $n(T + t_o)$. Pipelined, the first operation leaves after $k$ cycles; after that, one operation leaves every cycle, so the last of the $n$ leaves after $k + (n - 1)$ cycles of length $T/k + t_o$. Dividing gives the first expression; as $n\to\infty$, $n/(k + n - 1) \to 1$. Since $t_o > 0$, $(T + t_o)/(T/k + t_o) < (T + kt_o)/(T/k + t_o) = k$; and as $k\to\infty$ the denominator falls to $t_o$, giving the bound.
:::

Two effects therefore keep the speedup below $k$: the register overhead, paid once per stage, and **imbalance** — in a real datapath the stages are not equal, and the clock must suit the slowest stage. The hazards of later sections add a third.

::: widget plot
f: (T + t)/(T/x + t); x
x: 1, 30
y: 0, 30
sliders: T=700:100:3000:50; t=90:10:300:10
labels: \text{speedup }S(k); \text{ideal }k
caption: The steady-state speedup of a $k$-stage pipeline ([[#eq-speedup]]) against $k$, for total logic delay $T$ and register overhead $t$ (both in ps), compared with the ideal line $S = k$. With $T = 700$ and $t = 90$, five stages give $3.4$, ten give $4.9$, and no number of stages can exceed $(T+t)/t \approx 8.8$. Shrink the overhead and see how much deeper a pipeline must be to approach the ideal.
:::

## The five-stage RISC-V pipeline

The single-cycle datapath divides naturally into five steps, which become the five stages of the classic RISC pipeline:

1. **IF** (instruction fetch): read the instruction memory at the PC; compute PC $+ 4$.
2. **ID** (instruction decode): decode the instruction, read the register file, generate the immediate.
3. **EX** (execute): perform the ALU operation, or compute the memory address, or compare for a branch and compute its target.
4. **MEM** (memory): read or write the data memory.
5. **WB** (write back): write the result into the register file.

Between consecutive stages sit **pipeline registers**, named after the stages they separate: IF/ID, ID/EX, EX/MEM and MEM/WB. Each holds everything that later stages will need about the instruction it carries: the operands, the immediate, the PC (for branches) and, crucially, the **destination register number** `rd` and the **control signals** for the remaining stages. The control unit still decodes each instruction once, in ID, but its outputs travel down the pipeline with the instruction: EX controls are used and dropped in EX, MEM controls in MEM, and `RegWrite`, `ResultSrc` and `rd` reach WB three cycles later.

::: warning The destination register must travel with the instruction
A classic error in a first pipelined design is to wire the write address of the register file directly from the `rd` field of the instruction in IF/ID, as in the single-cycle processor. By the time a load reaches WB, IF/ID holds an instruction three places younger, and the loaded value would be written into *that* instruction's `rd`. Every piece of information that a later stage needs must be carried through the pipeline registers.
:::

### Pipeline timing

Using the component delays of [[computer-architecture/single-cycle-processor#ex-critical]], the stages need: IF, the instruction memory, $200\,\mathrm{ps}$; ID, the register-file read, $100\,\mathrm{ps}$ (decoding and immediate generation in parallel); EX, a forwarding multiplexer, the `ALUSrc` multiplexer and the ALU, $30 + 30 + 120 = 180\,\mathrm{ps}$; MEM, the data memory, $200\,\mathrm{ps}$; WB, the result multiplexer and the register-file setup, $30 + 60 = 90\,\mathrm{ps}$. With a pipeline-register overhead of $t_{pcq} + t_{\text{setup}} = 40 + 50 = 90\,\mathrm{ps}$, the clock period is set by the memory stages:

$$
T_c = 200 + 90 = 290\,\mathrm{ps}, \qquad f = 3.45\,\mathrm{GHz}.
$$

The ideal speedup over the $750\,\mathrm{ps}$ single-cycle processor is $750/290 = 2.59$ — well short of $5$, because the stages are unbalanced (ID needs only $100\,\mathrm{ps}$ of a $290\,\mathrm{ps}$ cycle) and the overhead is large. The latency of a load rises from $750$ to $5\times 290 = 1450\,\mathrm{ps}$, but that does not matter: what matters is how often an instruction completes.

### Pipeline diagrams

The behaviour of a pipeline is shown in a **pipeline diagram**, with one row per instruction and one column per clock cycle. Without hazards, five independent instructions flow like this:

| instruction | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|---|---|---|---|
| `lw x5, 0(x10)` | IF | ID | EX | MEM | WB | | | | |
| `addi x6, x11, 4` | | IF | ID | EX | MEM | WB | | | |
| `sw x12, 8(x10)` | | | IF | ID | EX | MEM | WB | | |
| `or x13, x14, x15` | | | | IF | ID | EX | MEM | WB | |
| `slt x16, x17, x18` | | | | | IF | ID | EX | MEM | WB |

Read a column to see what the hardware is doing in one cycle: in cycle 5, the instruction memory is fetching the `slt`, the register file is being read for the `or`, the ALU is computing the address of the `sw`, the `addi` is passing through the (idle) data-memory stage, and the `lw` is writing its result. Every component is busy. After the pipeline has filled (four cycles), one instruction completes per cycle: CPI $= 1$ in the steady state.

One component is used by two stages: the register file is read in ID and written in WB. To allow both in one cycle, and to let a register written in WB be read by an instruction in ID in the same cycle, the register file **writes in the first half of the cycle and reads in the second half** (equivalently, it forwards the write data internally).

## Hazards

A **hazard** is a situation in which the next instruction cannot execute in the following clock cycle without producing a wrong result.

::: definition Pipeline hazards {#def-hazards}
- A **structural hazard** occurs when two instructions need the same hardware resource in the same cycle.
- A **data hazard** occurs when an instruction needs a value that an earlier instruction, still in the pipeline, has not yet written. The usual kind is **read after write** (RAW): instruction $j$ reads a register that an earlier instruction $i$ writes.
- A **control hazard** occurs when the address of the next instruction is not yet known, because an earlier branch or jump has not been resolved.
:::

The five-stage RISC-V pipeline avoids structural hazards by design: separate instruction and data memories (in practice, separate L1 caches), a register file with two read ports and a write port used in different half-cycles, and separate adders for PC $+ 4$ and the branch target. The RISC-V ISA helps, too: every instruction uses each stage at most once and in the same order. In a pipeline that writes registers only in WB and reads them only in ID, the other two kinds of data hazard — **write after read** and **write after write** — cannot happen; they appear in the out-of-order processors of [[computer-architecture/parallel-architectures]].

### Data hazards and forwarding

Consider this sequence:

```
add  x5, x6, x7       # writes x5 in WB (cycle 5)
sub  x8, x5, x9       # reads x5 in ID (cycle 3) - too early
and  x10, x11, x5     # reads x5 in ID (cycle 4) - too early
or   x12, x5, x13     # reads x5 in ID (cycle 5) - OK, written in the first half
```

The `add` computes $x_6 + x_7$ in its EX stage, cycle 3, but writes `x5` only in cycle 5. The `sub` and `and` would read the old value of `x5`. One cure is to **stall**: hold the dependent instruction in ID until the value has been written, inserting **bubbles** (empty slots that do nothing) into the pipeline. That costs two cycles here. A far better cure observes that the value *exists* — in the EX/MEM pipeline register at the end of cycle 3 — long before it is written to the register file.

::: definition Forwarding {#def-forwarding}
**Forwarding** (or **bypassing**) sends a result from a pipeline register directly to the input of the ALU of a later instruction, without waiting for it to be written into the register file. In the five-stage pipeline, multiplexers in front of both ALU operands select between the value read from the register file in ID, the ALU result in EX/MEM (from the instruction one ahead) and the result in MEM/WB (from the instruction two ahead).
:::

The **forwarding unit** compares the source registers of the instruction in EX with the destination registers of the two instructions ahead of it. For ALU operand A (and identically for operand B with `rs2E`):

$$
\text{ForwardAE} =
\begin{cases}
10 & \text{if } \text{RegWriteM} \wedge rd_M \ne 0 \wedge rd_M = rs1_E \quad\text{(forward from MEM)}\\
01 & \text{else if } \text{RegWriteW} \wedge rd_W \ne 0 \wedge rd_W = rs1_E \quad\text{(forward from WB)}\\
00 & \text{otherwise (use the register file value).}
\end{cases}
$$ {#eq-forward}

The subscripts name the stage in which the instruction now is: $rs1_E$ is the source register of the instruction in EX, $rd_M$ the destination of the instruction in MEM. Three details matter. The test $rd \ne 0$ stops a write to `x0` (which is discarded) from being forwarded. The MEM case has priority, because if both later instructions write the same register, the more recent value is the right one. And the `RegWrite` test stops instructions that write no register — stores and branches, whose `rd` field holds immediate bits — from forwarding garbage.

::: example Forwarding in action {#ex-forward}
For the sequence `add x5, x6, x7`; `sub x8, x5, x9`; `and x10, x11, x5`; `or x12, x5, x13`, state which forwarding path each dependent instruction uses, and in which cycle.
::: solution
Number the cycles from the `add`'s IF as cycle 1. The `add` is in EX in cycle 3, MEM in 4, WB in 5.

- `sub` is in EX in cycle 4. Its `rs1 = x5` equals `rd` of the `add`, which is now in MEM with `RegWrite = 1`: ForwardAE $= 10$, the value comes from EX/MEM.
- `and` is in EX in cycle 5, when the `add` is in WB. Its `rs2 = x5` matches $rd_W$: ForwardBE $= 01$, from MEM/WB. (Its `rs1 = x11` matches nothing: ForwardAE $= 00$.)
- `or` is in ID in cycle 5 while the `add` writes `x5` in the first half of that cycle; the register file returns the new value, and no forwarding is needed when the `or` reaches EX in cycle 6.

All four instructions complete one per cycle, with no stalls.
:::
:::

### The load-use hazard

Forwarding cannot solve every data hazard. A load produces its value at the end of MEM, but an instruction immediately after it needs the value at the start of its EX — in the *same* cycle.

::: proposition Stalls in the five-stage pipeline {#prop-loaduse}
In the five-stage pipeline with forwarding from EX/MEM and MEM/WB to the ALU inputs, and a register file that writes before it reads, the only data hazard that requires a stall is an instruction that uses (in EX) the result of a load immediately preceding it. One stall cycle suffices.
:::

::: proof
Let instruction $i$ write register $r$ and a later instruction $j$, $d$ positions after $i$, read $r$. Instruction $j$ needs the value at the start of its EX stage, which is in cycle $\text{EX}_i + d$.

*If $i$ is an ALU instruction*, its result is in EX/MEM at the start of cycle $\text{EX}_i + 1$, in MEM/WB at the start of cycle $\text{EX}_i + 2$ and in the register file during cycle $\text{EX}_i + 2$ (written in the first half of WB). For $d = 1$ forwarding from EX/MEM serves; for $d = 2$ forwarding from MEM/WB; for $d \ge 3$, instruction $j$ read the register in ID no earlier than cycle $\text{EX}_i + 2$, after the write. No stall.

*If $i$ is a load*, the value comes out of the data memory at the end of cycle $\text{EX}_i + 1$ and is in MEM/WB at the start of cycle $\text{EX}_i + 2$. For $d \ge 2$ the same paths as before serve. For $d = 1$, instruction $j$ needs the value at the start of cycle $\text{EX}_i + 1$, before it exists. Delaying $j$ by one cycle makes its EX start at $\text{EX}_i + 2$, when the MEM/WB path can supply it. So exactly one stall is needed, and only in this case.
:::

The **hazard detection unit** sits in ID. When the instruction in EX is a load (`ResultSrcE = 01`) whose destination matches a source of the instruction in ID,

$$
\text{lwStall} = \text{ResultSrcE}_0 \wedge \bigl(rd_E = rs1_D \,\vee\, rd_E = rs2_D\bigr),
$$ {#eq-lwstall}

it **stalls** the two front stages — the PC and the IF/ID register keep their contents for one cycle — and **flushes** the ID/EX register, turning the instruction that would enter EX into a bubble (all control signals zero, so it writes nothing). In the next cycle the load is in MEM, and the dependent instruction enters EX with the loaded value forwarded from MEM/WB.

Compilers reduce load-use stalls by **instruction scheduling**: placing an independent instruction between a load and its use.

::: example Scheduling to avoid stalls {#ex-schedule}
Compile `x = a + b; y = a + c;`, where `a`, `b`, `c`, `x`, `y` are words at offsets $0$, $4$, $8$, $12$, $16$ from `s0`. Count the cycles needed by the obvious code and by a reordered version on the five-stage pipeline with forwarding.
::: solution
The obvious code:

```
lw   t0, 0(s0)      # a
lw   t1, 4(s0)      # b
add  t2, t0, t1     # uses t1 loaded just before: 1 stall
sw   t2, 12(s0)     # x  (t2 forwarded from EX/MEM: no stall)
lw   t3, 8(s0)      # c
add  t4, t0, t3     # uses t3 loaded just before: 1 stall
sw   t4, 16(s0)     # y
```

Seven instructions take $7 + 4 = 11$ cycles to fill and drain the pipeline, plus $2$ stalls: $13$ cycles.

Reordered, with the third load moved up:

```
lw   t0, 0(s0)
lw   t1, 4(s0)
lw   t3, 8(s0)
add  t2, t0, t1     # t1 loaded two instructions earlier: forwarded from MEM/WB
sw   t2, 12(s0)
add  t4, t0, t3     # t3 loaded three earlier: read from the register file
sw   t4, 16(s0)
```

No load is followed immediately by its use: $11$ cycles, an improvement of $13/11 = 1.18$. The reordering is legal because the moved load does not depend on, and is not depended on by, the instructions it passes — the compiler must check this, including that the stores do not write the location being loaded.
:::
:::

::: quiz
Which of these pairs causes a stall in the five-stage pipeline with full forwarding?
- [ ] `add x5, x6, x7` followed by `sub x8, x5, x5`
- [x] `lw x5, 0(x6)` followed by `add x7, x5, x8`
- [ ] `lw x5, 0(x6)` followed by `add x7, x8, x9` and then `sub x10, x5, x7`
- [ ] `add x0, x6, x7` followed by `sub x8, x0, x9`
::: solution
Only the load immediately followed by a use of its result needs a stall ([[#prop-loaduse]]). In the third case one independent instruction separates the load from its use, so the value is forwarded from MEM/WB in time. In the last case, `x0` is never forwarded, and the `sub` correctly reads $0$.
:::
:::

## Control hazards

The PC of the instruction after a branch is not known until the branch has compared its operands. In our pipeline that happens in EX, where the ALU computes Zero and the target adder computes `PCTarget`. By the time a taken branch is known to be taken, at the end of its EX stage, the two instructions after it have already been fetched and decoded — the wrong ones.

The simplest policy is to **predict not taken**: keep fetching sequentially, and if the branch turns out to be taken, **flush** the two wrong instructions from IF/ID and ID/EX (turning them into bubbles) and fetch from the target. A taken branch then costs two cycles, a **branch penalty** of $2$; a not-taken branch costs nothing. `jal` is handled the same way, since its target is also computed in EX. The flush signals are simply

$$
\text{FlushD} = \text{FlushE} = \text{PCSrcE},
$$

with `FlushE` also asserted by `lwStall` ([[#eq-lwstall]]).

The effect on performance follows from counting stall cycles per instruction:

$$
\text{CPI} = 1 + \sum_{\text{hazard types}} (\text{frequency per instruction}) \times (\text{penalty in cycles}).
$$ {#eq-cpi-stalls}

::: example The cost of hazards {#ex-cpi}
A program on the five-stage pipeline executes $25\,\%$ loads, $15\,\%$ conditional branches and $2\,\%$ jumps. $40\,\%$ of the loads are followed immediately by a use of the loaded value; $60\,\%$ of the branches are taken. (a) What is the CPI with predict-not-taken? (b) What is it if a branch predictor guesses correctly $90\,\%$ of the time and, when it is correct, the fetch proceeds without penalty from the right address (also for jumps)? (c) Compare the execution time with the single-cycle processor.
::: solution
(a) Load-use stalls: $0.25\times 0.40\times 1 = 0.10$ cycles per instruction. Taken branches: $0.15\times 0.60 \times 2 = 0.18$. Jumps: $0.02\times 2 = 0.04$. By [[#eq-cpi-stalls]], $\text{CPI} = 1 + 0.10 + 0.18 + 0.04 = 1.32$.

(b) Now the branch penalty is paid only on a misprediction: $0.15 \times 0.10\times 2 = 0.03$; jumps are predicted correctly. $\text{CPI} = 1 + 0.10 + 0.03 = 1.13$.

(c) The time per instruction is $\text{CPI}\times T_c$: with prediction, $1.13\times 290 = 328\,\mathrm{ps}$, against $750\,\mathrm{ps}$ for the single-cycle processor — a speedup of $2.29$. Without prediction, $1.32\times 290 = 383\,\mathrm{ps}$, a speedup of $1.96$. Hazards have eaten a fair part of the ideal $2.59$, and branches more than loads in case (a).
:::
:::

### Reducing the branch penalty

Three techniques reduce the cost of branches.

- **Earlier resolution.** Moving the comparison and the target adder into ID reduces the penalty to one cycle. But the branch now needs its operands in ID, a stage earlier, which creates new data hazards: a branch that depends on the immediately preceding ALU instruction must stall one cycle, and one that depends on a load must stall two. Whether the trade pays depends on the instruction mix.
- **Delayed branches.** Early RISC ISAs (MIPS, SPARC) defined the instruction after a branch to execute *always*, filling the slot with useful work when the compiler could. This bakes one particular pipeline into the ISA, and it stops helping when the pipeline gets deeper; RISC-V deliberately has no delay slots.
- **Branch prediction.** Guess the outcome and the target early, in IF, and fetch from the predicted path; check the guess when the branch is resolved and flush only if it was wrong. All modern processors do this.

### Branch prediction

A **static** predictor makes the same guess every time a given branch executes. The rule "backward taken, forward not taken" (BTFN) works well for loops: a branch back to the top of a loop is usually taken, while a forward branch around an `if` body is taken roughly half the time. A **dynamic** predictor learns from the branch's history at run time.

::: definition Two-bit saturating counter {#def-twobit}
A **two-bit predictor** keeps, for each branch (in practice, for each entry of a table indexed by low bits of the branch's address), a counter $c \in \{0, 1, 2, 3\}$. It predicts *taken* if $c \ge 2$ and *not taken* if $c \le 1$. When the branch resolves, $c$ is incremented if it was taken and decremented if not, saturating at $0$ and $3$. The states are called strongly not taken ($0$), weakly not taken ($1$), weakly taken ($2$) and strongly taken ($3$).
:::

The point of the second bit is **hysteresis**: a single surprising outcome moves the counter from "strongly" to "weakly" but does not change the prediction. A **one-bit** predictor, which simply predicts that the branch will do what it did last time, mispredicts twice at every exit of a loop — once at the exit, and again at the first iteration of the next execution of the loop.

::: example Predicting a loop branch {#ex-loopbranch}
An inner loop runs $10$ iterations each time it is entered, and it is entered many times. Its closing branch is therefore taken $9$ times and then not taken once, repeatedly. What fraction of its executions do a one-bit and a two-bit predictor mispredict?
::: solution
*One bit.* At the loop exit the branch is not taken but predicted taken: one misprediction, and the bit becomes "not taken". At the first iteration of the next entry the branch is taken but predicted not taken: a second misprediction. The remaining $8$ iterations are predicted correctly. That is $2$ mispredictions in $10$, a $20\,\%$ rate.

*Two bits.* In the steady state the counter is at $3$ during the iterations. The exit is mispredicted, and the counter drops to $2$ — still predicting taken. On the next entry the first iteration is predicted taken correctly and the counter returns to $3$. Only $1$ misprediction in $10$: $10\,\%$. (A simulation of the counter over $100$ entries gives exactly these rates.)
:::
:::

::: quiz
With predict-not-taken and branches resolved in EX, which instructions are flushed when a `beq` turns out to be taken?
- [ ] none, because the branch target is computed in parallel
- [ ] only the instruction immediately after the branch
- [x] the two instructions fetched after the branch, now in IF and ID
- [ ] all instructions in the pipeline, including the ones before the branch
::: solution
When the branch is in EX, the next two sequential instructions are in ID and IF. They are on the wrong path and are turned into bubbles (FlushD, FlushE). Instructions older than the branch, in MEM and WB, are correct and must complete.
:::
:::

For a branch that is taken independently at random with probability $p$, the counter is a Markov chain: it moves up with probability $p$ and down with probability $1 - p$.

::: widget markov
matrix: 0.1,0.9,0,0; 0.1,0,0.9,0; 0,0.1,0,0.9; 0,0,0.1,0.9
states: SN; WN; WT; ST
steps: 40
start: 0
caption: A two-bit predictor driven by a branch that is taken with probability $p = 0.9$, independently each time. Starting from strongly not taken, run the walk: the counter climbs to ST within a few steps and stays near it. The stationary distribution puts $0.988$ of the probability on WT and ST, so the predictor almost always predicts taken and mispredicts about $11\,\%$ of the time — close to the best possible $10\,\%$, and much better than the $18\,\%$ of a one-bit predictor.
:::

A two-bit counter tells *whether* to branch, but the fetch stage also needs *where* to, before the branch has even been decoded. A **branch target buffer** (BTB) is a small cache, indexed by the PC, that stores for each recently executed branch or jump its target address. In IF, the PC looks up the BTB and the direction predictor at the same time; on a predicted-taken hit, the next fetch comes from the stored target. **Return address stacks** predict the targets of `ret` instructions by pushing PC $+ 4$ on every call.

Modern predictors combine many such ideas. **Correlating** (two-level) predictors index their counters by the recent outcomes of *all* branches (the global history) as well as by the branch address, which catches patterns like "if the previous `if` was taken, this one is not". The best predictors in production as of 2026, descendants of the TAGE design (which looks up several tables indexed by histories of geometrically increasing length), mispredict only a few branches per thousand instructions on typical integer programs.

::: warning Prediction accuracy is not the same as performance
A predictor that is "95 % accurate" sounds excellent. But in a pipeline with a $15$-cycle misprediction penalty, $20\,\%$ branches and $95\,\%$ accuracy add $0.20\times 0.05\times 15 = 0.15$ cycles to every instruction, which matters a great deal if the processor could otherwise complete four instructions per cycle (CPI $= 0.25$). Penalties grow with pipeline depth, so the deeper and wider the processor, the more a fraction of a percent of accuracy is worth. Note too that some patterns defeat simple predictors completely: a branch that alternates taken, not taken, … can drive a two-bit counter that starts in a weak state to mispredict every time.
:::

## Exceptions and multicycle operations

Two further complications deserve a mention. An **exception** — an illegal instruction, a page fault on a load, an interrupt from a device — must stop the program at a precise point: every instruction before the faulting one completes, and none after it has any effect. A pipeline implements **precise exceptions** by recording the exception with the instruction as it travels, acting on it only when the instruction reaches a fixed stage (say MEM or WB), and then flushing all younger instructions and saving the faulting instruction's PC (in RISC-V, in the `mepc` or `sepc` register) before fetching from the handler. [[computer-architecture/input-output]] discusses what the handler does.

Instructions such as multiplication, division and floating-point operations take several cycles in EX. They are executed in separate, pipelined functional units of their own latency, and the hazard detection logic must stall any instruction that needs their result before it is ready. Because a long operation can now finish *after* a later short one, write-after-write hazards and out-of-order completion appear, and with them the techniques of [[computer-architecture/parallel-architectures]].

## How deep should a pipeline be?

More stages mean a shorter clock period, but every hazard penalty, measured in cycles, grows with the depth: a branch resolved in stage $10$ instead of stage $3$ flushes ten instructions instead of two. A simple model captures the trade-off.

::: proposition Optimum pipeline depth {#prop-depth}
Let the time per instruction of a $k$-stage pipeline be

$$
t(k) = \Bigl(\frac{T}{k} + t_o\Bigr)\bigl(1 + \gamma k\bigr),
$$ {#eq-depth}

where the first factor is the clock period and the second the CPI, whose hazard stall cycles grow in proportion to the depth with a constant $\gamma$ (stall cycles per instruction per stage). Then $t(k)$ is minimised at

$$
k^\ast = \sqrt{\frac{T}{\gamma\, t_o}} .
$$
:::

::: proof
Expanding, $t(k) = T/k + \gamma T + t_o + \gamma t_o k$. The derivative is $t'(k) = -T/k^2 + \gamma t_o$, which vanishes at $k^2 = T/(\gamma t_o)$; the second derivative $2T/k^3$ is positive, so this is the minimum.
:::

The model is crude — it ignores the fact that stages cannot be balanced perfectly, that power grows with the number of pipeline registers, and that branch prediction makes $\gamma$ small — but its message is right: the best depth is larger when the logic is long and the overhead small, and smaller when hazards are frequent.

::: example Choosing a depth {#ex-depth}
For total logic delay $T = 700\,\mathrm{ps}$, register overhead $t_o = 90\,\mathrm{ps}$ and $\gamma = 0.05$, find the optimum depth and compare it with $5$ and $20$ stages.
::: solution
$k^\ast = \sqrt{700/(0.05\times 90)} = \sqrt{155.6} = 12.5$. From [[#eq-depth]]:

- $k = 5$: $(140 + 90)(1.25) = 287.5\,\mathrm{ps}$;
- $k = 12$: $(58.3 + 90)(1.6) = 237.3\,\mathrm{ps}$;
- $k = 20$: $(35 + 90)(2.0) = 250.0\,\mathrm{ps}$.

The minimum is shallow: anything from about $10$ to $15$ stages is within about $1\,\%$ of the best, and even $20$ stages loses only $5\,\%$. The curve is much steeper on the shallow side, which is why the pipelines of high-performance processors have grown well beyond five stages.
:::
:::

::: widget plot
f: (T/x + t)*(1 + g*x)
x: 1, 40
y: 0, 800
sliders: T=700:200:3000:50; t=90:10:200:10; g=0.05:0.01:0.3:0.01
labels: t(k)\ \text{in ps}
caption: Time per instruction against the number of stages $k$ in the model of [[#prop-depth]]. Increase $\gamma$ (more frequent or costlier hazards, as with a poor branch predictor) and the optimum moves to shallower pipelines; reduce the register overhead $t$ and it moves deeper.
:::

::: application Real pipelines
The MIPS R2000 of 1985 had the classic five stages. Intel's Pentium 4 pushed depth to an extreme — 20 stages in 2000 and 31 in the 2004 "Prescott" version — to reach high clock rates, but its branch penalties and power consumption led Intel back to shorter pipelines in the Core microarchitecture of 2006. As of 2026, high-performance cores from Intel, AMD, Apple and Arm have pipelines of roughly $10$ to $20$ stages with misprediction penalties of about $10$ to $20$ cycles, while small embedded cores such as the Arm Cortex-M0+ use two or three stages. The large branch-prediction structures of a modern core, with many kilobytes of state, exist precisely because the penalty is so large.
:::

::: history
Overlapping the execution of instructions began with the IBM 7030 "Stretch" (delivered 1961), whose instruction lookahead fetched and decoded ahead of execution, and with the Manchester and Ferranti Atlas computer (1962). The CDC 6600 (1964), designed by Seymour Cray and James Thornton, issued instructions to ten independent functional units. The clean five-stage pipeline became standard with the RISC processors of the 1980s, Berkeley's RISC-I (1982) and the commercial MIPS R2000 (1985). James E. Smith's 1981 study of branch prediction strategies introduced the two-bit saturating counter; Tse-Yu Yeh and Yale Patt's two-level adaptive predictors (1991) and André Seznec and Pierre Michaud's TAGE predictor (2006) set the course of modern prediction.
:::

## Where this leads

The pipeline assumed that every memory access takes one cycle. In reality the memory is hundreds of times slower than the processor, and the caches that hide this are the subject of [[computer-architecture/memory-hierarchy]]; a cache miss stalls the pipeline for many cycles, adding a new term to [[#eq-cpi-stalls]]. [[computer-architecture/performance]] develops the CPI accounting used here into a general method. The natural next step after a pipeline that completes one instruction per cycle is a processor that completes several: superscalar issue, out-of-order execution with register renaming, and speculative execution past predicted branches, in [[computer-architecture/parallel-architectures]]. The circuit-level timing of pipeline registers and clock distribution is covered in [[digital-ic/sequential-circuits-clocking]].

::: summary
- A $k$-stage pipeline raises throughput towards one instruction per cycle; its speedup is limited by register overhead, stage imbalance and hazards ([[#thm-speedup]]).
- The classic RISC-V pipeline has stages IF, ID, EX, MEM, WB, with pipeline registers that carry operands, `rd` and control signals down with each instruction.
- Structural hazards are avoided by separate instruction and data memories and a register file that writes before it reads.
- Data hazards are resolved by forwarding from EX/MEM and MEM/WB ([[#eq-forward]]); only a load followed immediately by a use needs a one-cycle stall ([[#prop-loaduse]]), and compilers schedule instructions to avoid it.
- Control hazards cost the number of wrongly fetched instructions; with branches resolved in EX, a taken branch costs two cycles under predict-not-taken.
- Dynamic prediction with two-bit counters ([[#def-twobit]]), branch target buffers and history-based predictors make most branches free; CPI $= 1 + \sum$ frequency × penalty ([[#eq-cpi-stalls]]).
- Deeper pipelines shorten the clock but lengthen penalties; the optimum depth grows like $\sqrt{T/(\gamma t_o)}$ ([[#prop-depth]]).
:::

## Exercises

::: exercise Run time of a long program {level=1 check="(1e9+4)*290e-12"}
How long, in seconds, does the five-stage pipeline with $T_c = 290\,\mathrm{ps}$ take to execute $10^9$ instructions with no hazards?
::: solution
The first instruction finishes after $5$ cycles and one more finishes every cycle after that: $(5 + 10^9 - 1)$ cycles $= (10^9 + 4)\times 290\,\mathrm{ps} = 0.290\,\mathrm{s}$. The fill time of four cycles is negligible.
:::
:::

::: exercise Ideal speedup {level=1 check="500/104"}
A five-stage pipeline with perfectly balanced stages and no register overhead executes $100$ independent instructions. What is its speedup over the unpipelined circuit?
::: solution
With $t_o = 0$, [[#eq-speedup]] gives $S = nk/(k + n - 1) = 100\times 5/104 = 4.81$. The shortfall from $5$ is the fill time; it disappears as $n\to\infty$.
:::
:::

::: exercise Finding hazards {level=1}
List all data dependences in the following code and say which of them require a stall in the five-stage pipeline with forwarding.

```
lw   x5, 0(x10)
add  x6, x5, x11
sub  x7, x6, x5
sw   x7, 4(x10)
```
::: solution
`add` depends on `x5` from `lw` (distance 1: a load-use hazard, **1 stall**). `sub` depends on `x6` from `add` (distance 1, forwarded from EX/MEM) and on `x5` from `lw` (distance 2, after the stall effectively 3: forwarded or read from the register file). `sw` depends on `x7` from `sub` (distance 1, forwarded from EX/MEM to the store-data path) and on `x10`, which nothing writes. Total: one stall cycle.
:::
:::

::: exercise Forwarding control {level=2}
Instructions `addi x5, x0, 1`, `addi x5, x5, 2`, `add x6, x5, x5` execute in sequence. When the `add` is in EX, what are ForwardAE and ForwardBE, and what value does it compute?
::: solution
When the `add` is in EX, the second `addi` (writing `x5 = 3`) is in MEM and the first (`x5 = 1`) is in WB. Both match `rs1 = rs2 = x5`, and [[#eq-forward]] gives priority to MEM: ForwardAE $=$ ForwardBE $= 10$. The `add` computes $3 + 3 = 6$. Had the priority been reversed, it would have used the stale value $1$ and computed $2$.
:::
:::

::: exercise Scheduling a loop {level=2}
The loop body below executes on the five-stage pipeline with forwarding and predict-not-taken (branch penalty 2). How many cycles does one iteration take, including the taken branch? Reorder the instructions to reduce it.

```
loop: lw   t0, 0(a0)
      add  t0, t0, t1
      sw   t0, 0(a0)
      addi a0, a0, 4
      bne  a0, a2, loop
```
::: solution
Five instructions, one load-use stall (`lw` → `add`) and two cycles of branch penalty: $5 + 1 + 2 = 8$ cycles per iteration in the steady state.

Move the `addi` between the load and its use, and adjust the store offset, since `a0` has already advanced:

```
loop: lw   t0, 0(a0)
      addi a0, a0, 4
      add  t0, t0, t1
      sw   t0, -4(a0)
      bne  a0, a2, loop
```

No stall remains: $5 + 2 = 7$ cycles. (The branch penalty remains; a predictor would remove it, giving $5$ cycles.)
:::
:::

::: exercise Patterns and predictors {level=2 check="0.25"}
A branch follows the repeating pattern taken, taken, taken, not taken. What fraction of its executions does a two-bit predictor mispredict in the steady state? Compare a one-bit predictor.
::: solution
*Two bits.* Starting from state $3$: T (predicted T, stays $3$), T, T, N (predicted T: miss, goes to $2$), then T (predicted T, back to $3$), … One miss in four: $0.25$.

*One bit.* The N is mispredicted (last outcome T), and so is the following T (last outcome N): two misses in four, $0.5$.
:::
:::

::: exercise Branch resolution in ID {level=2}
For the program of [[#ex-cpi]] with predict-not-taken, the branch comparison is moved into ID, reducing the branch and jump penalty to $1$ cycle. However, $30\,\%$ of branches use a register written by the immediately preceding ALU instruction (requiring $1$ stall) and $5\,\%$ use a value loaded by the immediately preceding load (requiring $2$ stalls). These branches are in addition to the load-use cases already counted, and the stalls apply to all branches, taken or not. What is the new CPI? Is the change worthwhile if the clock period is unaffected?
::: solution
Load-use stalls as before: $0.10$. Taken branches: $0.15\times 0.60\times 1 = 0.09$. Jumps: $0.02\times 1 = 0.02$. Branch-operand stalls: $0.15\times(0.30\times 1 + 0.05\times 2) = 0.15 \times 0.40 = 0.06$. So $\text{CPI} = 1 + 0.10 + 0.09 + 0.02 + 0.06 = 1.27$, against $1.32$ with resolution in EX. The change saves about $4\,\%$ — worthwhile only if the comparator in ID does not lengthen the clock period, which in practice it often does, because ID must now read the registers, pass the forwarding multiplexers and compare within one cycle.
:::
:::

::: exercise Load followed by store {level=3}
In the pipeline of this chapter, forwarding goes only to the ALU inputs in EX. (a) Show that `lw x5, 0(x10)` followed immediately by `sw x5, 0(x11)` needs a stall. (b) Design an extra forwarding path that removes it, and state its control condition.
::: hint
In which stage does the store actually need its data, as opposed to its address?
:::
::: solution
(a) The store's data `rs2` passes through the ALU-B forwarding multiplexer in EX on its way to EX/MEM. When the `sw` is in EX, the `lw` is in MEM and its value does not exist until the end of that cycle; by [[#eq-lwstall]] (which tests `rs2` too) the hazard unit stalls one cycle.

(b) The store needs its data only in MEM, when it writes memory. Add a multiplexer in front of the data memory's write-data input that can select the value in MEM/WB. When the `sw` is in MEM, the `lw` is in WB with its loaded value. Condition: $\text{MemWriteM} \wedge \text{RegWriteW} \wedge rd_W \neq 0 \wedge rd_W = rs2_M$, which requires carrying `rs2` into EX/MEM. The hazard unit must then exempt this case: stall only if the dependent instruction uses the loaded register as `rs1`, or as `rs2` of a non-store. The cost is one multiplexer on the path into the data memory, which may lengthen the MEM stage slightly.
:::
:::

::: exercise The two-bit predictor on random branches {level=3}
A branch is taken with probability $p$, independently each time, and $q = 1 - p$. (a) Show that the stationary distribution of the two-bit counter is $\pi_c \propto r^c$, $c = 0, \dots, 3$, with $r = p/q$. (b) Show that the misprediction rate is $pq/(p^2 + q^2)$, and compare it with a one-bit predictor ($2pq$) and the best possible predictor ($\min(p, q)$) for $p = 0.9$.
::: hint
The counter is a birth–death chain: balance the probability flow between neighbouring states.
:::
::: solution
(a) Between states $c$ and $c + 1$ the chain moves up with probability $p$ and down with probability $q$. In the stationary state the flows balance: $\pi_c p = \pi_{c+1}q$, so $\pi_{c+1} = r\pi_c$ and $\pi_c \propto r^c$.

(b) The predictor errs when it predicts not taken ($c \le 1$) and the branch is taken, or predicts taken and it is not:

$$
m = \frac{(1 + r)p + (r^2 + r^3)q}{1 + r + r^2 + r^3} = \frac{(1 + r)(p + r^2 q)}{(1+r)(1 + r^2)} = \frac{p + p^2/q}{1 + p^2/q^2} = \frac{pq^2 + p^2q}{q^2 + p^2} = \frac{pq}{p^2 + q^2}.
$$

For $p = 0.9$: $m = 0.09/0.82 = 0.110$; a one-bit predictor gives $2\times 0.9\times 0.1 = 0.18$, and the best possible is $0.10$. For $p = 0.5$ all three give $0.5$: random branches cannot be predicted.
:::
:::

::: exercise Pipeline depth in practice {level=3}
A designer can build the processor with $8$ stages at a clock period of $160\,\mathrm{ps}$ or with $14$ stages at $110\,\mathrm{ps}$. Branches are $18\,\%$ of instructions, the predictor mispredicts $4\,\%$ of them, and the misprediction penalty is $6$ cycles in the shallow design and $12$ in the deep one. Load-use and other stalls add $0.10$ cycles per instruction in the shallow design and $0.25$ in the deep one. Which is faster, and by how much?
::: solution
Shallow: $\text{CPI} = 1 + 0.18\times 0.04\times 6 + 0.10 = 1 + 0.0432 + 0.10 = 1.1432$; time per instruction $1.1432\times 160 = 182.9\,\mathrm{ps}$.

Deep: $\text{CPI} = 1 + 0.18\times 0.04\times 12 + 0.25 = 1 + 0.0864 + 0.25 = 1.3364$; time $1.3364\times 110 = 147.0\,\mathrm{ps}$.

The deep design is faster by $182.9/147.0 = 1.24$. Its CPI is $17\,\%$ worse, but its clock is $45\,\%$ faster. With a predictor twice as bad ($8\,\%$), the figures become $1.1864 \times 160 = 189.8$ and $1.4228\times 110 = 156.5\,\mathrm{ps}$: the deep design still wins, but power, which grows with clock rate and the number of pipeline registers, might decide otherwise.
:::
:::
