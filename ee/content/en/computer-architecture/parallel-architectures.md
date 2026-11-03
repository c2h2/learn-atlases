The pipelined processor of [[computer-architecture/pipelining]] completes at best one instruction per clock cycle. For two decades, from the mid-1980s to the mid-2000s, processors became faster mainly by raising the clock rate and by squeezing more work out of each cycle from a single instruction stream. Then power, as [[computer-architecture/performance]] showed, stopped the clock from rising much further. Performance has since come almost entirely from **parallelism**: doing many things at once, at every level of the machine.

Parallelism comes in three forms, and modern chips exploit all three. **Instruction-level parallelism** (ILP) finds independent instructions within one program and executes them simultaneously, without the programmer noticing: superscalar issue, out-of-order execution and speculation. **Thread-level parallelism** (TLP) runs several instruction streams at once, on several cores or on one core that interleaves them: this needs parallel software and a shared memory that stays consistent across cores, which is the problem of cache coherence. **Data-level parallelism** (DLP) applies one operation to many data elements at once, in vector units, SIMD extensions and graphics processors. This chapter explains the hardware behind each, its limits, and how to choose between them.

Writing parallel programs — threads, OpenMP, MPI, CUDA — is the subject of the CS course [Parallel computing](/learn/cs/lesson.php?c=parallel-computing&l=parallel-architectures), and memory consistency models are treated in depth in [Cache coherence and memory consistency](/learn/cs/lesson.php?c=parallel-computing&l=memory-consistency). Here we concentrate on how the hardware works and what it costs.

::: definition Flynn's taxonomy {#def-flynn}
Michael Flynn classified computers by the number of concurrent instruction streams and data streams. **SISD** (single instruction, single data) is the uniprocessor. **SIMD** (single instruction, multiple data) applies each instruction to many data elements: vector processors, SIMD extensions and, with qualifications, GPUs. **MISD** (multiple instruction, single data) has no important examples. **MIMD** (multiple instruction, multiple data) is the multiprocessor: several independent cores, each with its own program counter.
:::

## Instruction-level parallelism

A **superscalar** processor fetches, decodes and issues several instructions per cycle — two in a small core, eight or more in the widest cores as of 2026 — into several functional units. Its ideal CPI is the reciprocal of the issue width, and its performance is often expressed as **instructions per cycle** (IPC $= 1/\text{CPI}$). Whether it achieves that ideal depends on how many independent instructions the program offers at each moment.

### Dependences

Two instructions can execute in parallel only if neither depends on the other.

::: definition Data dependences {#def-dependences}
Let instruction $i$ precede instruction $j$ in program order.

- $j$ has a **true dependence** (read after write, RAW) on $i$ if $j$ reads a register or memory location that $i$ writes.
- $j$ has an **anti-dependence** (write after read, WAR) on $i$ if $j$ writes a location that $i$ reads.
- $j$ has an **output dependence** (write after write, WAW) on $i$ if both write the same location.

Anti- and output dependences are **name dependences**: no value flows between the instructions; they merely reuse the same name.
:::

True dependences are fundamental: the value must be computed before it is used. Name dependences are artefacts of having only 32 architectural registers, and they can be removed by giving each new value its own storage.

::: proposition The dataflow limit {#prop-dataflow}
Represent a sequence of $N$ instructions by its **dependence graph**: a node per instruction, weighted with its latency, and an edge for each true dependence. On a machine that issues at most $W$ instructions per cycle, the execution time of the sequence is at least

$$
T \ge \max\Bigl(L_{\text{crit}},\ \frac{N}{W}\Bigr),
$$

where $L_{\text{crit}}$ is the total latency of the longest path in the graph.
:::

::: proof
Along a path of true dependences, each instruction cannot start before its predecessor's result is available, so the instructions on the longest path take at least $L_{\text{crit}}$ in total, whatever the resources. And issuing $N$ instructions at most $W$ per cycle takes at least $N/W$ cycles. Both bounds hold at once.
:::

Name dependences do not appear in the graph: a processor that removes them by renaming is limited only by the true dependences and its resources.

### Register renaming and out-of-order execution

An **out-of-order** processor removes name dependences by **register renaming**: it has a larger set of **physical registers** (a few hundred in a large core) and a **rename table** that maps each architectural register to the physical register holding its latest value. Each instruction that writes a register is given a fresh physical register; later readers of that architectural register are directed to it. After renaming, only true dependences remain.

Renamed instructions wait in an **issue queue** (or reservation stations) until their source operands are ready, and then issue to a functional unit regardless of program order — the scheme of Tomasulo's algorithm. Results are broadcast to waiting instructions as they complete. To keep exceptions precise and to recover from mispredicted branches, instructions also enter a **reorder buffer** (ROB) in program order and **commit** (retire) from its head in program order: only at commit does an instruction's result become architectural state, and the physical register previously mapped to its destination is freed. An instruction after a mispredicted branch, or after one that raised an exception, is simply discarded from the ROB before it commits.

::: example Renaming a sequence {#ex-rename}
List the dependences in this sequence, rename it, and say which instructions can run in parallel.

```
1  lw   x5, 0(x10)
2  add  x6, x5, x7
3  sw   x6, 0(x11)
4  sub  x7, x12, x13
5  mul  x6, x12, x7
```
::: solution
*True dependences*: 2 on 1 (`x5`), 3 on 2 (`x6`), 5 on 4 (`x7`).
*Anti-dependences*: 4 on 2 (2 reads `x7`, 4 writes it), 5 on 3 (3 reads `x6`, 5 writes it).
*Output dependence*: 5 on 2 (both write `x6`).

Rename every destination to a new physical register, starting from `p40`, with sources read from the current mapping (`x7`, `x10`–`x13` initially in `p7`, `p10`–`p13`):

```
1  lw   p40, 0(p10)        # x5 -> p40
2  add  p41, p40, p7       # x6 -> p41
3  sw   p41, 0(p11)
4  sub  p42, p12, p13      # x7 -> p42
5  mul  p43, p12, p42      # x6 -> p43
```

Now 4 and 5 depend only on each other; they can execute while the load in 1 is still waiting for the cache — the main benefit of out-of-order execution. At commit, the mapping of `x6` becomes `p43`, and `p41` is freed when instruction 5 commits. With latencies of $4$ cycles for the load, $3$ for the multiply and $1$ for the others, the longest true-dependence path is 1–2–3 with $4 + 1 + 1 = 6$ cycles; by [[#prop-dataflow]] no machine can do better than $6$ cycles, and a 2-wide out-of-order core achieves about that. An in-order core would have to wait for the load before starting the `add`, and the `sub` and `mul` behind it.
:::
:::

::: widget graph
nodes: lw@0,2; add@2,2; sw@4,2; sub@0,0; mul@2,0
edges: lw>add:4; add>sw:1; sub>mul:1
algorithm: topo
caption: The dependence graph of the renamed sequence in [[#ex-rename]], each edge weighted with the latency of its source instruction. Only true dependences remain after renaming, so the graph splits into two independent chains. A topological order gives a legal execution order; the longest weighted path, `lw` → `add` → `sw`, is the dataflow limit of [[#prop-dataflow]].
:::

### Speculation and its limits

Out-of-order execution needs a large window of instructions to choose from, which means fetching far past branches that have not been resolved. Modern cores **speculate**: they predict branches ([[computer-architecture/pipelining]]), fetch and execute along the predicted path, and roll back on a misprediction. The window is several hundred instructions in large cores as of 2026 (reorder buffers of $500$ or more entries), so that a core can keep working through tens of independent instructions while a cache miss to DRAM is outstanding.

The returns diminish. Typical programs have limited ILP — realistic studies find a few instructions per cycle even with huge windows — and every extra issue slot costs more than linearly in power and area, because the renaming, issue and bypass logic compare every instruction with every other. Speculation also has a security cost: the **Spectre** and **Meltdown** attacks, disclosed in 2018, showed that speculatively executed instructions, although rolled back architecturally, leave traces in the caches that an attacker can measure.

**Multithreading** uses the idle resources of a wide core differently: the core holds the state (PC and registers) of two or more threads, and **simultaneous multithreading** (SMT, Intel's "Hyper-Threading") issues instructions from all of them in the same cycle. When one thread stalls on a miss, the others keep the functional units busy. Two-way SMT typically adds $20$–$30\,\%$ of throughput for a few percent of area.

::: quiz
Which dependence can register renaming remove?
- [ ] `add x5, x6, x7` followed by `sub x8, x5, x9`
- [x] `add x5, x6, x7` followed by `sub x6, x8, x9`
- [ ] `lw x5, 0(x6)` followed by `add x7, x5, x5`
- [ ] none; dependences are a property of the program
::: solution
The second pair is an anti-dependence: the `sub` overwrites `x6`, which the `add` reads, but no value flows between them. Giving the `sub` a new physical register lets it execute first. The other pairs are true dependences: the value must be computed before it is used.
:::
:::

## Multicore processors and shared memory

Since about 2005, the main use of growing transistor budgets has been to put several complete cores on one chip. Each core has its own L1 (and usually L2) caches; they share a last-level cache, the memory controllers and I/O, connected by an on-chip network (a ring, a mesh, or a crossbar). From the software's point of view the cores share one physical memory: a **shared-memory multiprocessor**. If all cores see the same access time to all memory, it is **uniform memory access** (UMA); in multi-socket servers and large chips the latency depends on which memory controller is involved, and the machine is **non-uniform** (NUMA).

Amdahl's law ([[computer-architecture/performance#thm-amdahl]]) applies directly: with a parallel fraction $f$, $p$ cores give at most $1/((1 - f) + f/p)$. Real programs do worse, because cores must communicate, and communication costs grow with the number of cores.

::: proposition Optimum number of cores under a communication cost {#prop-cores}
Suppose that, relative to the single-core time, the time on $p$ cores is $(1 - f) + f/p + c(p - 1)$, where the last term models communication and synchronisation overhead growing linearly with the number of cores. The speedup is maximised at $p^\ast = \sqrt{f/c}$.
:::

::: proof
The speedup is the reciprocal of $t(p) = (1 - f) + f/p + c(p - 1)$. Its derivative $t'(p) = -f/p^2 + c$ vanishes at $p^2 = f/c$, and $t''(p) = 2f/p^3 > 0$, so $t$ has a minimum and the speedup a maximum there. Beyond $p^\ast$, adding cores makes the program slower.
:::

::: widget plot
f: 1/((1 - a) + a/x + c*(x - 1)); 1/((1 - a) + a/x)
x: 1, 128
y: 0, 25
sliders: a=0.95:0.5:0.999:0.001; c=0.001:0:0.01:0.0005
labels: \text{with overhead}; \text{Amdahl}
caption: Speedup on $p$ cores for a parallel fraction $a$ with and without a communication overhead $c(p-1)$. With $a = 0.95$ and $c = 0.001$ the speedup peaks at about $9$ near $p = 31$, close to $\sqrt{a/c}$, and falls beyond it. Set $c$ to zero to recover Amdahl's law; reduce $c$ (cheaper coherence, better locality) and the peak moves to many more cores.
:::

### Cache coherence

Private caches create a problem that a uniprocessor never has: two cores may hold copies of the same memory block, and if one writes its copy the other's becomes stale.

::: definition Cache coherence {#def-coherence}
A memory system is **coherent** if, for every memory location, (1) a read by a core returns the value of the most recent write to that location in a single order of all writes to it on which all cores agree, and (2) every write eventually becomes visible to all cores. Equivalently, at any time a block may have either a single writer or any number of readers (the **single-writer, multiple-reader** invariant), and each read sees the value of the last write.
:::

Coherence protocols enforce this by tracking a **state** for every cached block. The simplest invalidation protocol has three states:

- **M** (modified): this cache has the only copy, and it is dirty; the core may read and write it.
- **S** (shared): this cache has a clean copy; others may too; the core may read but not write.
- **I** (invalid): no valid copy.

In a **snooping** implementation all caches observe a shared bus or broadcast network. A read miss issues a **BusRd**; a write to a block not held in M issues a **BusRdX** (read for exclusive ownership; **BusUpgr** if the block is already present in S). Every other cache watches these requests: on a BusRd for a block it holds in M, it supplies the data (and writes it back) and drops to S; on a BusRdX or BusUpgr it invalidates its copy.

::: example An MSI trace {#ex-msi}
Two cores, P0 and P1, have private write-back caches kept coherent by the MSI protocol. Block X is initially only in memory. Trace the states and bus transactions for: P0 reads X; P1 reads X; P0 writes X; P1 reads X; P1 writes X.
::: solution
| step | event | bus transaction | P0 state | P1 state | data from |
|---|---|---|---|---|---|
| 1 | P0 reads X | BusRd | S | I | memory |
| 2 | P1 reads X | BusRd | S | S | memory |
| 3 | P0 writes X | BusUpgr | M | I (invalidated) | — |
| 4 | P1 reads X | BusRd | S (supplies data, writes back) | S | P0's cache |
| 5 | P1 writes X | BusUpgr | I (invalidated) | M | — |

Five bus transactions for five accesses: each core's access to data the other has just written is a **coherence miss**, a fourth "C" to add to the compulsory, capacity and conflict misses of [[computer-architecture/memory-hierarchy]]. The common extension **MESI** adds an **E** (exclusive, clean) state, entered on a read miss when no other cache has the block; a later write then moves silently from E to M with no bus transaction, which saves traffic for private data. **MOESI** adds an **O** (owned) state that lets a dirty block be shared without writing it back first.
:::
:::

Snooping requires every cache to see every request, which does not scale beyond a few dozen cores. Larger systems use **directory** protocols: a directory, distributed with the last-level cache or the memory, records for each block which caches hold it, and sends invalidations only to those. The protocol states are the same; the messages travel point to point over the on-chip network.

::: warning False sharing
Coherence works on whole cache lines, not on variables. If two cores repeatedly write *different* variables that happen to lie in the same $64$-byte line, every write invalidates the other core's copy, and the line bounces between the caches as if the data were shared. Two counters in adjacent words, each incremented $10^8$ times by its own core, can take tens of times longer than the same counters placed in separate lines, because each increment becomes a coherence miss of tens of nanoseconds instead of an L1 hit of about one. The cure is to pad or align per-core data to cache-line boundaries.
:::

### Memory consistency

Coherence concerns a single location. A parallel program also depends on the order in which writes to *different* locations become visible: one core writes data and then sets a flag; another waits for the flag and then reads the data. The rules for this are the **memory consistency model** of the ISA. The strictest, **sequential consistency**, requires the result of any execution to be as if all cores' operations were interleaved in a single order respecting each program's order. It forbids many hardware optimisations, such as letting a load bypass an earlier store held in a store buffer. RISC-V defines a weaker model, **RVWMO** (weak memory ordering), and provides **`fence`** instructions and atomic instructions with acquire and release semantics (the A extension: `lr`/`sc` and `amoadd`, `amoswap` and others) with which programs impose order where they need it. x86-64 has a stronger model, total store order (TSO), close to sequential consistency except for store buffering.

## Data-level parallelism

Many workloads — image and signal processing, scientific simulation, machine learning — apply the same operations to large arrays. For them, issuing one instruction per data element wastes energy on fetching, decoding and scheduling instructions. **SIMD** hardware issues one instruction for many elements.

### Vector architectures and SIMD extensions

A **vector processor** has vector registers holding many elements and vector instructions that operate on whole registers: `vadd v1, v2, v3` adds two vectors element by element. The elements are processed by several parallel **lanes**, each with its own functional units and a slice of the vector register file, and dependent vector instructions are **chained** so that an addition can start on the first elements while the multiplication producing them is still working on later ones. The Cray-1 of 1976 established the style.

**SIMD extensions** to general-purpose ISAs — x86 SSE, AVX and AVX-512 (128-, 256- and 512-bit registers), Arm NEON (128 bits) — are short-vector versions with a fixed register width fixed in the instruction encoding, so that code must be rewritten for each new width. The **scalable** vector extensions, Arm SVE and the RISC-V **V** extension, do not fix the width in the ISA: an implementation may have vector registers of $128$ bits or of $4096$, and the same binary runs on both. In RISC-V, the instruction `vsetvli` asks for a vector length and is told how many elements the hardware will process in this pass; a loop **strip-mines** an array of any length in passes of that size.

::: example A vector loop and its timing {#ex-vector}
The loop `y[i] = a*x[i] + y[i]` for $n = 1000$ doubles is written for RISC-V V:

```
# a0 = n, a1 = &x[0], a2 = &y[0], fa0 = a
loop:  vsetvli t0, a0, e64, m8, ta, ma   # t0 = elements this pass (<= VLMAX)
       vle64.v   v0, (a1)                # load x
       vle64.v   v8, (a2)                # load y
       vfmacc.vf v8, fa0, v0             # y += a*x
       vse64.v   v8, (a2)                # store y
       slli      t1, t0, 3               # bytes this pass
       add       a1, a1, t1
       add       a2, a2, t1
       sub       a0, a0, t0
       bnez      a0, loop
```

The hardware has $4$ lanes, a maximum vector length $\text{VLMAX} = 64$ elements (registers of $512$ bits grouped by eight, `m8`), and one memory pipeline, so each pass takes three **chimes** — load $x$; load $y$ chained with the FMA; store $y$ — each lasting $\text{vl}/4$ cycles, plus a start-up overhead of $12$ cycles per pass. Estimate the run time and compare with a scalar core that sustains $2$ instructions per cycle.
::: solution
$1000 = 15\times 64 + 40$: fifteen full passes and one of $40$ elements.

Full pass: $3\times 64/4 + 12 = 48 + 12 = 60$ cycles. Last pass: $3\times 40/4 + 12 = 30 + 12 = 42$ cycles. Total $15\times 60 + 42 = 942$ cycles, about $1.06$ elements per cycle.

A scalar loop needs about six instructions per element (two loads, an FMA, a store, a pointer increment and a branch, with some unrolling): $6000$ instructions at $2$ per cycle, $3000$ cycles. The vector version is $3.2$ times faster, and it executes only $16\times 10 = 160$ instructions instead of $6000$ — a large saving in fetch and decode energy. Its limit is the single memory pipeline: the kernel is memory-bound, exactly as the roofline of [[computer-architecture/performance#def-roofline]] predicts.
:::
:::

::: widget plot
f: ceil(x/V)*s + 3*x/L; 3*x
x: 1, 600
y: 0, 2000
sliders: V=64:8:256:8; s=12:0:40:1; L=4:1:16:1
labels: \text{vector}; \text{scalar}
caption: Cycles for the vector loop of [[#ex-vector]] against the array length $n$, for maximum vector length $V$, start-up $s$ cycles per pass and $L$ lanes, compared with the scalar loop of the example at $3$ cycles per element. The steps occur where a new strip-mining pass begins. Short vectors pay the start-up cost on few elements; long ones approach $3/L$ cycles per element. Add lanes and see that the start-up overhead becomes the dominant cost.
:::

### Graphics processing units

A **GPU** takes data-level parallelism to its extreme. It consists of many **streaming multiprocessors** (SMs, or compute units), each with many simple arithmetic lanes, a large register file and a scratchpad **shared memory**. A program, the **kernel**, is written for a single thread operating on one data element; it is launched over a grid of thousands or millions of threads. The hardware groups threads into **warps** of $32$ (NVIDIA; AMD's wavefronts have $32$ or $64$) that execute in lock step, one instruction for all threads of the warp — an organisation called **SIMT** (single instruction, multiple threads).

GPUs hide memory latency not with large caches and out-of-order execution but with **massive multithreading**: each SM holds the state of dozens of warps, and every cycle its schedulers pick warps whose operands are ready. While one warp waits hundreds of cycles for memory, others compute. By Little's law ([[computer-architecture/performance#thm-little]]), to hide a latency of $t$ cycles when each warp can issue $k$ independent instructions before it must wait, a scheduler needs about $t/k$ ready warps.

Two rules dominate GPU performance:

- **Memory coalescing**: when the $32$ threads of a warp access consecutive addresses, the hardware combines them into a few wide memory transactions. Scattered accesses each need their own transaction and waste bandwidth.
- **Branch divergence**: when threads of a warp take different paths through an `if`, the warp executes both paths one after the other, with the threads not on the current path masked off. A warp whose threads split evenly between two paths of equal length runs at half speed.

::: example Latency hiding and divergence on a GPU {#ex-gpu}
(a) In a kernel, each warp issues one global-memory load followed by $20$ independent arithmetic instructions before it needs the loaded value. The memory latency is $400$ cycles and each scheduler issues one instruction per cycle. How many warps per scheduler are needed to keep it busy? (b) A kernel contains `if (cond) A(); else B();` where `A` and `B` each take $100$ cycles. What is the time per warp if all threads agree, and if half the threads take each branch?
::: solution
(a) Each warp provides $21$ cycles of work (the load plus $20$ instructions) and then waits up to $400$ cycles. To cover the wait, about $400/20 = 20$ other warps must be ready, so about $20$–$21$ warps per scheduler. If the SM cannot hold that many (each warp needs registers, and a large kernel needs many), the scheduler idles — the GPU notion of **occupancy**.

(b) If all $32$ threads agree, the warp runs one path: $100$ cycles. If they split, it runs `A` with half the threads masked, then `B` with the other half: $200$ cycles, half the throughput. Divergence costs nothing between *different* warps, so programmers arrange data so that threads with the same branch outcome fall in the same warp.
:::
:::

### Domain-specific accelerators

For workloads that dominate a large market, it pays to go further and build hardware for one class of computation. The **systolic array** of Google's Tensor Processing Unit (deployed from 2015) is a grid of multiply–accumulate cells through which matrix operands flow in a regular rhythm, so that each operand fetched from memory is used many times; matrix units in GPUs (NVIDIA's tensor cores) and in CPUs (Intel AMX, Arm SME) apply the same idea. They raise the arithmetic intensity, moving the kernel to the right on the roofline, and use low-precision formats ([[computer-architecture/computer-arithmetic]]) to put many more multipliers on the chip.

::: application Parallel hardware in 2026
As of 2026, a laptop processor typically has $8$ to $16$ cores of two kinds — large out-of-order "performance" cores and smaller "efficiency" cores — sharing a last-level cache, together with an integrated GPU and a neural-network accelerator on the same die. Server processors have up to roughly $200$–$300$ cores per socket. Data-centre GPUs have over a hundred streaming multiprocessors, HBM3E memory with about $8\,\mathrm{TB/s}$ of bandwidth, and matrix units delivering petaflops of low-precision arithmetic; they are connected to one another by dedicated links of a terabyte per second or more, so that thousands of them can train one neural network. The trade-offs of this chapter — latency against throughput, generality against efficiency — determine which unit each workload runs on.
:::

::: quiz
A computation applies the same arithmetic to $10^8$ independent array elements, with simple control flow and contiguous memory access. Which hardware will usually run it most efficiently?
- [ ] a single wide out-of-order core
- [ ] a multicore processor using one thread per element
- [x] a GPU or a wide vector unit
- [ ] it does not matter, because Amdahl's law limits all of them equally
::: solution
This is ideal data-level parallelism: one instruction stream, many elements, coalesced accesses and no divergence. A GPU or vector unit amortises instruction fetch and scheduling over many elements and hides latency with parallelism. A wide out-of-order core spends most of its energy on finding ILP that a vector instruction expresses directly; one thread per element on a multicore would drown in thread-management overhead.
:::
:::

## Choosing an architecture

The forms of parallelism suit different workloads:

| workload | best suited to | why |
|---|---|---|
| irregular control flow, pointer chasing, little parallelism (compilers, interpreters, most application logic) | a few fast out-of-order cores | ILP and speculation extract what parallelism there is; latency matters |
| many independent tasks or requests (web servers, databases) | many cores, SMT | thread-level parallelism; throughput matters |
| regular operations on large arrays (signal processing, simulation, graphics) | vector/SIMD units, GPUs | data-level parallelism amortises control |
| dense matrix arithmetic at low precision (neural networks) | matrix units, systolic arrays | very high arithmetic intensity |

The heterogeneous chips of today combine them, and the hardest part of using them well is moving data to the right unit at the right time.

::: history
Michael Flynn proposed his classification in 1966. The CDC 6600 (1964) and the IBM System/360 Model 91 (1967), with Robert Tomasulo's algorithm, pioneered dynamic scheduling; superscalar microprocessors arrived around 1990 (IBM's RS/6000 and Intel's i960CA in 1989–90), and the Intel Pentium Pro of 1995 brought out-of-order execution to personal computers. The ILLIAC IV (operational in the mid-1970s) was an early SIMD array, and Seymour Cray's Cray-1 (1976) defined the vector supercomputer. Lucien Censier and Paul Feautrier described directory-based coherence in 1978, and James Goodman's write-once protocol of 1983 started the line of snooping protocols leading to MESI. IBM's POWER4 (2001) was the first commercial processor with two cores on one die, and Intel introduced SMT with Hyper-Threading in 2002. NVIDIA's CUDA (2007) turned graphics processors into general-purpose parallel computers.
:::

## Where this leads

Programming the machines of this chapter — threads and locks, OpenMP, message passing and GPU kernels — is the subject of [Parallel computing](/learn/cs/lesson.php?c=parallel-computing&l=shared-memory) and [GPU programming](/learn/cs/lesson.php?c=parallel-computing&l=gpu-programming), and the operating system's management of threads in [Threads and locks](/learn/cs/lesson.php?c=operating-systems&l=threads-locks). On the hardware side, the circuits that make many-core chips possible, and the power limits that make them necessary, are in [[digital-ic]]; and embedded systems ([[embedded-systems]]) increasingly combine small multicore processors with DSP and neural-network accelerators of the kinds described here.

::: summary
- Parallelism comes as ILP, TLP and DLP; Flynn's taxonomy ([[#def-flynn]]) separates SIMD from MIMD.
- True dependences limit ILP; name dependences ([[#def-dependences]]) are removed by register renaming. Execution time is bounded by the critical path and the issue width ([[#prop-dataflow]]).
- Out-of-order cores rename, issue when operands are ready, and commit in order through a reorder buffer; speculation past predicted branches fills large windows. SMT shares a core among threads.
- Multicore speedup is limited by Amdahl's law and by communication, which gives an optimum core count ([[#prop-cores]]).
- Coherence ([[#def-coherence]]) keeps private caches consistent with protocols such as MSI and MESI, by snooping or directories; false sharing turns private data into coherence traffic; consistency models and fences order accesses to different locations.
- Vector and SIMD units apply one instruction to many elements; scalable ISAs (RISC-V V, Arm SVE) strip-mine loops independent of the hardware width.
- GPUs run thousands of threads in warps, hide latency by multithreading, and need coalesced accesses and little divergence; matrix units and systolic arrays serve dense low-precision arithmetic.
:::

## Exercises

::: exercise Issue width {level=1 check="0.25"}
A 4-wide superscalar processor issues four instructions in every cycle on a particular loop. What is its CPI on that loop?
::: solution
IPC $= 4$, so CPI $= 1/4 = 0.25$.
:::
:::

::: exercise Classifying dependences {level=1}
Classify every dependence in `mul x5, x6, x7`; `add x6, x5, x8`; `sub x5, x9, x10`.
::: solution
`add` on `mul`: true (RAW on `x5`). `add` on `mul`: anti (WAR on `x6`: `mul` reads it, `add` writes it). `sub` on `mul`: output (WAW on `x5`). `sub` on `add`: anti (WAR on `x5`: `add` reads it, `sub` writes it). Only the first is a true dependence; renaming removes the rest.
:::
:::

::: exercise Amdahl on many cores {level=1 check="1/(0.1+0.9/16)"}
A program is $90\,\%$ parallel. What is its speedup on $16$ cores under Amdahl's law?
::: solution
$S = 1/(0.1 + 0.9/16) = 1/0.15625 = 6.4$.
:::
:::

::: exercise A MESI trace {level=2}
Repeat [[#ex-msi]] with the MESI protocol. Which transaction disappears, and in which state does P0 start?
::: solution
Step 1: P0's read miss finds no other copy, so P0 enters **E**. Step 2: P1's BusRd is observed by P0, which drops to S; P1 enters S. Step 3: P0 writes; it is in S, so a BusUpgr is still needed (P1 invalidates), P0 goes to M. Steps 4 and 5 are as before. In this particular sequence no transaction disappears, because P1 read the block before P0 wrote it. MESI saves the upgrade only when a core reads and then writes a block no one else has read in between — for example, if steps 1 and 3 had been adjacent, the write would have moved E → M silently.
:::
:::

::: exercise The best number of cores {level=2 check="sqrt(0.98/0.0005)"}
A program has parallel fraction $f = 0.98$ and the communication overhead of [[#prop-cores]] with $c = 0.0005$. What number of cores maximises its speedup?
::: solution
$p^\ast = \sqrt{f/c} = \sqrt{0.98/0.0005} = \sqrt{1960} = 44.3$. At $p = 44$, $t = 0.02 + 0.98/44 + 0.0005\times 43 = 0.02 + 0.0223 + 0.0215 = 0.0638$, a speedup of $15.7$ — far below the Amdahl limit of $50$.
:::
:::

::: exercise Strip-mining {level=2}
For the vector loop of [[#ex-vector]] with $n = 200$, how many passes are needed, and how many cycles do they take? What is the efficiency, in elements per cycle, compared with the asymptotic value?
::: solution
$200 = 3\times 64 + 8$: four passes. Full passes $60$ cycles each, the last $3\times 8/4 + 12 = 18$: total $198$ cycles, $1.01$ elements per cycle. Asymptotically a full pass delivers $64/60 = 1.07$ elements per cycle, and with no start-up at all the limit is $4/3 = 1.33$. Short vectors lose more to start-up: for $n = 8$, one pass of $18$ cycles gives $0.44$ elements per cycle.
:::
:::

::: exercise Coalescing {level=2}
A warp of $32$ threads loads 4-byte floats. The memory system serves requests in aligned $128$-byte segments. How many segments are fetched if thread $t$ loads (a) element $t$, (b) element $2t$, (c) element $32t$? What fraction of the fetched bytes is used in each case?
::: solution
(a) Addresses $0$–$127$ bytes: one segment, $100\,\%$ used. (b) Addresses $0, 8, \dots, 248$: two segments, $128$ of $256$ bytes used, $50\,\%$. (c) Addresses $0, 128, 256, \dots$: $32$ segments, each used for $4$ bytes: $128$ of $4096$ bytes, $3.1\,\%$. Strided access patterns waste bandwidth in proportion to the stride, which is why GPU programmers lay out arrays of structures as structures of arrays.
:::
:::

::: exercise False sharing estimate {level=3}
Two cores each increment their own counter $10^8$ times. With the counters in separate cache lines, each increment takes $1\,\mathrm{ns}$. With both counters in the same line, assume each increment requires a coherence transfer of the line taking $40\,\mathrm{ns}$, and that the two cores alternate perfectly. Estimate both run times. How would you fix the problem in C?
::: solution
Separate lines: each core runs $10^8\times 1\,\mathrm{ns} = 0.1\,\mathrm{s}$, in parallel: $0.1\,\mathrm{s}$.

Same line: every increment needs the line in M state, which the other core has just taken, so every increment costs about $40\,\mathrm{ns}$. If the transfers cannot overlap (the line can be in only one cache in M at a time), the $2\times 10^8$ increments are serialised: $2\times 10^8 \times 40\,\mathrm{ns} = 8\,\mathrm{s}$, eighty times slower than separate lines and slower than a single core doing both counts ($0.2\,\mathrm{s}$).

Fix: give each counter its own line, for example `struct { long count; char pad[56]; } c[2];`, or `alignas(64)` in C11, or accumulate in a local variable and write the shared counter once at the end.
:::
:::

::: exercise Renaming capacity {level=3}
An out-of-order core has $32$ architectural integer registers and $224$ physical integer registers. (a) What is the maximum number of in-flight (renamed but not committed) instructions that write an integer register? (b) If $70\,\%$ of instructions write an integer register, what reorder-buffer size is balanced with this register file? (c) By Little's law, how many instructions per cycle can the core sustain while a $300$-cycle DRAM miss is outstanding at the head of the ROB, if the ROB fills up?
::: solution
(a) Each architectural register needs one committed physical register, so $224 - 32 = 192$ physical registers are available for in-flight results: at most $192$ such instructions.

(b) $192/0.7 = 274$: a ROB of about $270$–$280$ entries would run out of registers and entries at about the same time.

(c) Once a load at the head of the ROB misses, nothing commits for $300$ cycles, and the core can only fill the remaining entries: at most about $274$ instructions in $300$ cycles, an IPC below $0.92$ during the miss however wide the core. Hence the drive towards ever larger windows — and towards prefetching, which starts the miss earlier.
:::
:::

::: exercise Choosing hardware {level=3}
For each workload, choose between a 16-core out-of-order CPU and a GPU, and justify the choice quantitatively where you can: (a) compiling a large C++ project of $10\,000$ independent files; (b) multiplying two $8192\times 8192$ matrices in binary16; (c) evaluating a decision tree with deep, data-dependent branching for $10^6$ inputs; (d) a sequential simulation step in which each step depends on the previous one and takes $1\,\mathrm{\mu s}$ of scalar work.
::: solution
(a) CPU. Each compilation is irregular, branchy, pointer-chasing code that runs well only on out-of-order cores; there are thousands of independent tasks, so all $16$ cores (and SMT) are kept busy — thread-level parallelism.

(b) GPU. Matrix multiplication of size $n$ performs $2n^3 \approx 1.1\times 10^{12}$ operations on $3n^2\times 2\,\mathrm{B} \approx 400\,\mathrm{MB}$ of data: an arithmetic intensity in the thousands of operations per byte if blocked well, so it runs at the compute roof, and a GPU's matrix units have one to two orders of magnitude more low-precision throughput than a CPU.

(c) Usually CPU. Data-dependent branching diverges within warps (each level of the tree may split a warp), and memory accesses follow pointers, defeating coalescing; $10^6$ independent inputs give enough thread-level parallelism for $16$ cores. (Trees can be restructured into branch-free, GPU-friendly forms, which changes the answer.)

(d) A single fast CPU core. There is no parallelism across steps (Amdahl's serial fraction is $1$), and $1\,\mathrm{\mu s}$ of work per step is comparable to the overhead of launching a GPU kernel, so a GPU would be slower.
:::
:::
