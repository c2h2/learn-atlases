Here is the same C program run with $1, 2, 4, \dots, 32$ threads on one machine. In the first experiment each thread does arithmetic on numbers held in its registers; in the second each thread adds up its own slice of a 3.2 GB array of `double`s. The total work is fixed, and split evenly between the threads.

```console
$ nproc
36
$ for p in 1 2 4 8 16 32; do ./scale 0 $p 1600000000; done     # compute-bound
p= 1  1.644 s  (sum 1.6e+09)
p= 2  0.822 s  (sum 1.6e+09)
p= 4  0.419 s  (sum 1.6e+09)
p= 8  0.213 s  (sum 1.6e+09)
p=16  0.111 s  (sum 1.6e+09)
p=32  0.057 s  (sum 1.6e+09)
$ for p in 1 2 4 8 16 32; do ./scale 1 $p 400000000; done      # memory-bound
p= 1  0.538 s  (sum 4e+08)
p= 2  0.307 s  (sum 4e+08)
p= 4  0.152 s  (sum 4e+08)
p= 8  0.088 s  (sum 4e+08)
p=16  0.062 s  (sum 4e+08)
p=32  0.061 s  (sum 4e+08)
```

The arithmetic runs $1.644 / 0.057 \approx 29$ times faster on $32$ threads. The array sum improves almost perfectly up to $4$ threads and then stops: $16$ and $32$ threads take the same time, about $8.8$ times faster than one. The two programs execute the same number of loop iterations per thread; what differs is which part of the machine they use. Every thread has a core of its own, but all of them share the wires to memory, and the second program saturates them.

These are observations on one machine — a server with two 18-core Intel Xeon E5-2696 v3 processors (Haswell microarchitecture, 2014), GCC 15, Linux, shared with other users, as of 2026 — and your numbers will differ. The lesson they teach does not: **a parallel computer is a collection of resources, some replicated and some shared, and the speed of a parallel program is set by whichever shared resource it exhausts first.** This chapter surveys the resources. We start with why processors became parallel at all, classify parallel machines with Flynn's taxonomy, and then look at each level: multicore processors and their memory systems, SIMD vector units, GPUs, and clusters connected by networks whose topology we can analyse exactly. The rest of the course is about programming these machines; this chapter is about knowing what you are programming.

## Why every processor is parallel

From the 1970s to the early 2000s, single-thread performance doubled roughly every two years, and most programmers could wait for faster hardware instead of rewriting their code. Two trends drove this. **Moore's law** (Gordon Moore, 1965, revised in 1975) observed that the number of transistors on a chip doubled about every two years. **Dennard scaling** (Robert Dennard and colleagues, 1974) explained why that was not a power problem: if every linear dimension of a transistor shrinks by a factor $k$, and the voltage with it, then each transistor switches $k$ times faster while using $1/k^2$ of the power, so power per unit area stays constant.

The power a chip dissipates through switching is the **dynamic power**

$$
P_{\text{dyn}} = a\, C\, V^2 f,
$$ {#eq-power}

where $a$ is the fraction of transistors switching per cycle (the activity factor), $C$ the switched capacitance, $V$ the supply voltage and $f$ the clock frequency. Within a design, a higher frequency needs a roughly proportionally higher voltage to switch transistors fast enough, so $P_{\text{dyn}}$ grows roughly as $f^3$.

Around 2005 Dennard scaling ended. Below about $1$ V, voltage could no longer fall with each generation, because transistors leak current when they are supposed to be off, and leakage grows rapidly as the threshold voltage is lowered. With $V$ stuck, raising $f$ raised power and heat faster than a chip could be cooled. Intel cancelled its planned 4 GHz-plus successor to the Pentium 4 in 2004 and shipped dual-core processors in 2005; IBM's POWER4 had already put two cores on one chip in 2001. The transistors kept coming — Moore's law continued for another two decades, though slowing — but they went into *more* cores, wider vector units and bigger caches rather than faster clocks.

::: example Two slower cores against one fast one {#ex-two-cores}
Under the model $P \propto f^3$ (voltage proportional to frequency), compare one core at frequency $f$ with two identical cores each at $0.8f$. Assume the work can be split perfectly between the two.
::: solution
The single core has power $P_1 = c f^3$ and throughput $1$ (in units of work per unit time at frequency $f$). Each slower core uses $c(0.8f)^3 = 0.512\,cf^3$, so the pair uses $1.024\,P_1$ — about the same power. Their throughput is $2 \times 0.8 = 1.6$. For essentially the same power we get $60\%$ more work done, *if* the program can use two cores. That condition is the subject of this course. In reality voltage cannot fall in proportion to frequency all the way down, static (leakage) power does not fall at all, and the second core costs chip area; but the direction of the trade-off is why processor designers switched to multicore.
:::
:::

::: widget plot
f: 1; n*(1/n)^(1/3)
x: 0, 1
y: 0, 4
sliders: n=2:1:16:1
labels: \text{one core at full speed}; \text{throughput of } n \text{ cores at the same total power}
caption: Under the model $P \propto f^3$, $n$ cores sharing the power budget of one core can each run at $f/n^{1/3}$, for a total throughput of $n^{2/3}$ times one core (the horizontal axis is irrelevant here; both lines are constants). Move $n$ from $2$ to $16$: eight cores at half the frequency give four times the throughput. Notice that this gain exists only for programs that keep all $n$ cores busy — a sequential program runs $n^{1/3}$ times *slower* on the many-core chip.
:::

The consequence is sometimes called the end of the "free lunch" (Herb Sutter's phrase, 2005): software gets faster on new hardware only if it is parallel. Today a laptop has between $4$ and $16$ cores, each with a vector unit operating on $4$ to $16$ numbers at once; a phone has eight cores and a GPU; a large server has more than a hundred cores (all as of 2026). The fastest supercomputers combine tens of thousands of such nodes.

## Flynn's taxonomy

Michael Flynn (1966, extended 1972) classified computers by how many instruction streams and how many data streams they process at once. The classification is coarse, but its vocabulary is universal.

::: definition Flynn's taxonomy {#def-flynn}
An **instruction stream** is the sequence of instructions executed by one control unit; a **data stream** is the sequence of operands it operates on.

- **SISD** (single instruction, single data): a classical sequential processor.
- **SIMD** (single instruction, multiple data): one instruction stream drives many processing elements, each applying the same operation to its own data in lock-step. Vector processors, the vector instructions of modern CPUs (SSE, AVX, NEON, SVE) and — in a looser sense — GPUs.
- **MISD** (multiple instruction, single data): several instruction streams on one data stream. Rare; the usual examples are pipelines of different operations on one stream and redundant flight computers that check one another.
- **MIMD** (multiple instruction, multiple data): independent processors, each with its own instruction and data streams. Multicore processors, shared-memory multiprocessors and clusters.
:::

Two refinements of MIMD are used throughout the course. A program written for MIMD hardware is usually **SPMD** (single program, multiple data): every processor runs the same program, but on different data and possibly along different branches — which processor it is, its **rank** or thread number, decides its share of the work. Both of the opening experiments are SPMD. And GPUs are described by NVIDIA as **SIMT** (single instruction, multiple threads): the programmer writes a scalar program for one thread, as in SPMD, and the hardware groups threads into bundles of $32$ that execute in SIMD lock-step ([[parallel-computing/gpu-programming]]).

The more important distinction in practice is not Flynn's but how memory is organised.

::: definition Shared and distributed memory {#def-memory-org}
In a **shared-memory** machine all processors can load and store every location of one address space; they communicate by reading and writing memory. It is **UMA** (uniform memory access) if every processor reaches every location equally fast, and **NUMA** (non-uniform memory access) if memory is divided between nodes and a processor reaches its own node's memory faster than the others'.

In a **distributed-memory** machine each processor has a private address space; processors communicate only by sending messages over a network.
:::

The machine of the opening experiment is a two-node NUMA machine: each processor socket has its own memory controllers and memory, and the two sockets are joined by a point-to-point link (Intel's QPI on this generation). Threads on either socket can access all $161$ GiB of memory, but remote accesses cost more. Clusters are distributed-memory machines whose nodes are themselves shared-memory machines, so most large programs today are **hybrid**: threads within a node, messages between nodes.

::: example Reading the machine {#ex-lscpu}
Find the number of processors, cores, threads per core, cache sizes and NUMA nodes of the machine of the opening experiment.
::: solution
`nproc` reports the number of processors this process may run on; `lscpu` gives the structure (output shortened):

```console
$ lscpu
Model name:            Intel(R) Xeon(R) CPU E5-2696 v3 @ 2.30GHz
CPU(s):                72
On-line CPU(s) list:   0-35
Off-line CPU(s) list:  36-71
Thread(s) per core:    2
Core(s) per socket:    18
Socket(s):             2
L1d cache:             1.1 MiB (36 instances)
L2 cache:              9 MiB (36 instances)
L3 cache:              90 MiB (2 instances)
NUMA node(s):          2
NUMA node0 CPU(s):     0-17,36-53
NUMA node1 CPU(s):     18-35,54-71
```

There are $2$ sockets of $18$ cores. Each core supports two hardware threads (**simultaneous multithreading**, Intel's Hyper-Threading), which would give $72$ logical CPUs, but the second thread of every core has been switched off: CPUs $36$–$71$ are offline, and the online CPUs $0$–$17$ (node $0$) and $18$–$35$ (node $1$) are $36$ distinct physical cores. Each core has a private $32$ KiB L1 data cache and $256$ KiB L2 cache; the $18$ cores of a socket share a $45$ MiB L3 cache. On most machines SMT is enabled, and then `nproc` counts logical CPUs, twice the number of cores.
:::
:::

## Inside a multicore processor

A modern core is itself highly parallel, even when it runs one thread. It is **pipelined** (several instructions are in different stages at once), **superscalar** (it issues several instructions per cycle) and **out of order** (it executes instructions as soon as their operands are ready, not in program order). This **instruction-level parallelism** is extracted by the hardware from sequential code and is invisible to the programmer except through performance; how it works is computer architecture, taught in the [Electrical Engineering Atlas](/learn/ee/). This course is about the parallelism the programmer must express: **thread-level parallelism** across cores, and **data-level parallelism** within a core's vector unit.

Each core has private L1 and L2 caches; the cores of a chip share a last-level cache, the memory controllers and the link to other sockets ([[computer-systems/memory-hierarchy]] covers caches for one core). The caches hold *copies* of memory, so when two cores cache the same line and one writes it, the other copy must be updated or invalidated. Hardware does this automatically through a **cache-coherence protocol**, which makes caches invisible to correctness — but not to performance, since a line can bounce between cores thousands of times a second. [[parallel-computing/memory-consistency]] studies coherence, and the subtler question of the *order* in which one core's writes become visible to another.

**Simultaneous multithreading** (SMT) lets one core hold the state of two (sometimes four or eight) threads and issue instructions from all of them in the same cycle. It helps when one thread alone leaves the core's functional units idle — waiting for cache misses, for example — and helps little when a thread already keeps them busy. Two hardware threads on one core share its caches and functional units, so they are not two cores.

::: warning A logical CPU is not a core
`nproc`, `os.cpu_count()` and `omp_get_num_procs()` report *logical* CPUs. With SMT enabled this is usually twice the number of physical cores, and a compute-bound program typically gains between $0\%$ and $30\%$ from the second hardware thread, not $100\%$. Before measuring speed-up, find out what the number means on your machine (`lscpu`, as in [[#ex-lscpu]]), and report core counts and SMT settings with every measurement. On the machine of this course SMT is disabled, so its $36$ logical CPUs are $36$ cores.
:::

The opening experiment now makes sense. The compute-bound loop keeps each thread inside its own core, using only registers: the cores are replicated resources, so time falls almost as $1/p$. (It falls a little less: the processor lowers its turbo frequency as more cores become active to stay within its power budget — [[#eq-power]] again — and other users' jobs were running on the machine.) The memory-bound loop needs about $8$ bytes from memory per addition. One core alone streams about $3.2 \text{ GB} / 0.538 \text{ s} \approx 6$ GB/s, limited by how many cache misses it can have outstanding at once; $16$ cores together reach about $52$ GB/s and then the memory system is saturated. More threads only queue for the same wires. [[parallel-computing/performance-laws]] turns this observation into the **roofline model**, and [[parallel-computing/performance-engineering]] shows that on this machine the array's placement in memory matters too: the main thread initialised the whole array, so its pages were all allocated on one NUMA node.

## SIMD and vector units

A **vector instruction** applies one operation to a short vector of operands held in a wide register. The AVX2 instructions of the processor above use $256$-bit registers holding four `double`s or eight `float`s; a single `vfmadd231pd` instruction computes $c_i \gets c_i + a_i b_i$ for four values of $i$ at once — a **fused multiply–add**, counted as two floating-point operations per element. AVX-512 doubles the width; ARM's SVE lets the hardware choose a width between $128$ and $2048$ bits and programs adapt to it at run time.

::: definition Peak floating-point rate {#def-peak}
The **peak** floating-point rate of a processor is

$$
F_{\text{peak}} = (\text{cores}) \times (\text{clock rate}) \times (\text{vector instructions per cycle}) \times (\text{lanes per vector}) \times (\text{operations per lane}).
$$ {#eq-peak}

It is an upper bound that real programs approach only if they keep every vector unit busy with fused multiply–adds and never wait for memory.
:::

::: example The peak of a Haswell server {#ex-peak}
Each Haswell core can issue two AVX2 fused multiply–adds per cycle. Compute the peak double-precision rate of the $36$-core machine at its $2.3$ GHz base frequency, and compare it with the peak memory bandwidth of about $2 \times 68$ GB/s (four DDR4-2133 channels per socket).
::: solution
Per cycle a core performs $2 \times 4 \times 2 = 16$ double-precision operations ($2$ instructions, $4$ lanes, $2$ operations per fused multiply–add); in single precision, with $8$ lanes, $32$. Hence

$$
F_{\text{peak}} = 36 \times 2.3 \times 10^9 \times 16 \approx 1.32 \times 10^{12}\ \text{flop/s} = 1.32\ \text{Tflop/s}.
$$

Memory delivers at most about $136$ GB/s, or $17 \times 10^9$ `double`s per second. To run at peak, a program must therefore perform about $1325 / 17 \approx 78$ floating-point operations for every `double` it loads from memory — about $10$ per byte. Few programs do: adding up an array performs one per $8$ bytes. This ratio, the machine's **balance**, is the heart of the roofline model in [[parallel-computing/performance-laws]].
:::
:::

Vector units are used in two ways. Compilers **auto-vectorise** simple loops — `gcc -O3` turns `for (i…) c[i] = a[i] + b[i];` into vector instructions when it can prove that this is safe — and programmers use **intrinsics** (`_mm256_fmadd_pd`) or portable SIMD libraries when the compiler cannot. What stops vectorisation is a dependence between iterations, possible aliasing between arrays, branches, and data that is not stored contiguously; [[parallel-computing/performance-engineering]] measures each of these.

## GPUs

A **graphics processing unit** takes the trade-off of [[#ex-two-cores]] to its extreme. Instead of a few large out-of-order cores, a GPU has dozens of **streaming multiprocessors** (SMs, in NVIDIA's terminology; AMD's are *compute units*), each with many simple arithmetic lanes, a large register file and a small scratchpad memory. It has no branch prediction or out-of-order execution to speak of; instead it hides the latency of memory by keeping thousands of threads resident and switching between groups of them every cycle. A program for a GPU is a **kernel**, a function executed by a grid of thousands or millions of threads, each computing one small piece of the result.

The design pays off for programs with abundant regular data parallelism — dense linear algebra, image processing, simulations on grids, and the training and inference of neural networks — where GPUs deliver an order of magnitude more arithmetic and memory bandwidth per watt than CPUs. It pays poorly for programs with little parallelism, irregular branching or pointer chasing. A discrete GPU also has its own memory: data must be copied across the PCIe or NVLink bus before the kernel can use it, a cost that can swamp the speed-up for small problems. [[parallel-computing/gpu-programming]] studies the model in detail.

## Clusters and interconnection networks

Above a single node, parallel machines are **clusters**: nodes, each a shared-memory computer, connected by a network. The network may be commodity Ethernet or a specialised high-performance interconnect (InfiniBand, HPE Slingshot and others, as of 2026) with lower latency and support for remote memory access. Programs communicate by message passing, usually through MPI ([[parallel-computing/message-passing]]).

The *topology* of the network — which nodes or switches are wired to which — determines how far messages travel and how much traffic the network can carry. We model it as a graph with processors or switches as vertices and links as edges ([Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs)).

::: definition Topology metrics {#def-topology}
For an interconnection network modelled as a connected graph $G = (V, E)$ with $p = \lvert V \rvert$ nodes:

- the **degree** is the maximum number of links at a node — the number of ports a node or switch needs;
- the **diameter** is the maximum, over all pairs of nodes, of the length of a shortest path between them — the worst-case number of hops;
- the **bisection width** is the minimum number of edges whose removal splits $V$ into two halves of sizes $\lfloor p/2 \rfloor$ and $\lceil p/2 \rceil$ — a measure of how much traffic can cross the middle of the machine at once.
:::

The diameter bounds latency; the bisection width bounds throughput for communication patterns in which half the machine talks to the other half, such as sorting or a transpose. A network's **cost** is roughly its number of links. The classic topologies:

- **Ring** of $p$ nodes: degree $2$, diameter $\lfloor p/2 \rfloor$, bisection width $2$.
- **2D mesh** $k \times k$ ($p = k^2$): degree $4$, diameter $2(k - 1)$, bisection width $k$ (for even $k$).
- **2D torus** $k \times k$, a mesh with wrap-around links: degree $4$, diameter $2\lfloor k/2 \rfloor$, bisection width $2k$ (for even $k$).
- **Hypercube** of dimension $d$ ($p = 2^d$): nodes are $d$-bit strings, joined when they differ in exactly one bit; degree $d$, diameter $d$, bisection width $2^{d-1} = p/2$.
- **Tree** of switches with processors at the leaves: diameter $2\log p$, but bisection width $1$ — the root is a bottleneck. A **fat tree** (Charles Leiserson, 1985) gives links nearer the root proportionally more capacity, so that the bisection grows to $p/2$; folded-Clos networks built from identical switches implement it, and most data-centre and supercomputer networks are of this family.
- **Crossbar**: every processor connected to every memory or processor through a switch matrix; diameter $1$ and full bisection, but $p^2$ switches, so only for small $p$.

::: theorem Diameter and bisection width of the hypercube {#thm-hypercube}
The $d$-dimensional hypercube $Q_d$, with $p = 2^d$ nodes, has diameter $d$ and bisection width $2^{d-1}$.
:::

::: proof
*Diameter.* A step along an edge changes exactly one bit, so a path from $u$ to $v$ needs at least as many steps as the number of bits in which $u$ and $v$ differ, their **Hamming distance** $h(u, v)$; and $h(u, v)$ steps suffice, flipping the differing bits one at a time. So the distance is $h(u, v) \le d$, with equality for complementary strings.

*Bisection width, upper bound.* Let $S$ be the nodes whose first bit is $0$ and $T$ those whose first bit is $1$; each half has $2^{d-1}$ nodes. The edges between them are exactly the edges in dimension $1$, one per node of $S$: $2^{d-1}$ edges.

*Bisection width, lower bound.* Route a message from every node $s$ to every node $t \ne s$ along the **bit-fixing path**: correct the differing bits in order from bit $1$ to bit $d$. Consider a directed edge from $u$ to $u \oplus e_i$ (flipping bit $i$). The path from $s$ to $t$ uses it exactly when the path is at $u$ when it corrects bit $i$, which means $t_1 \dots t_{i-1} = u_1 \dots u_{i-1}$, $s_i \dots s_d = u_i \dots u_d$ and $t_i \ne u_i$. The free bits are $s_1 \dots s_{i-1}$ and $t_{i+1} \dots t_d$, so exactly $2^{i-1} \cdot 2^{d-i} = 2^{d-1}$ ordered pairs use each directed edge. Now take any bisection into halves $S$ and $T$ of $p/2$ nodes, cut by $c$ edges. Each of the $(p/2)^2$ ordered pairs $(s, t)$ with $s \in S$, $t \in T$ has a path that crosses from $S$ to $T$ along at least one of the $c$ cut edges directed from $S$ to $T$, and each such directed edge carries $2^{d-1} = p/2$ paths. Hence $c \cdot p/2 \ge (p/2)^2$, that is $c \ge p/2 = 2^{d-1}$.
:::

::: widget graph
nodes: 000@0,0; 001@1,0.6; 010@0,2; 011@1,2.6; 100@3,0; 101@4,0.6; 110@3,2; 111@4,2.6
edges: 000-001; 000-010; 000-100; 001-011; 001-101; 010-011; 010-110; 011-111; 100-101; 100-110; 101-111; 110-111
algorithm: bfs
start: 000
caption: The three-dimensional hypercube $Q_3$: nodes are 3-bit strings joined when they differ in one bit. Step through breadth-first search from $000$ and notice that the nodes are discovered in layers of Hamming distance $0, 1, 2, 3$ — with $1, 3, 3, 1$ nodes, the binomial coefficients — so the diameter is $3$ ([[#thm-hypercube]]). The four edges between the left square (first bit $0$) and the right square (first bit $1$) form a bisection of width $2^{3-1} = 4$; drag the nodes to convince yourself that no smaller set of edges splits the cube in half.
:::

::: example Comparing topologies for 64 nodes {#ex-topologies}
Compare a ring, an $8 \times 8$ torus and a $6$-dimensional hypercube on $p = 64$ nodes: links, degree, diameter and bisection width. Verify the diameters by breadth-first search.
::: solution
| topology | links | degree | diameter | bisection width |
|---|---|---|---|---|
| ring | $64$ | $2$ | $32$ | $2$ |
| $8 \times 8$ torus | $128$ | $4$ | $8$ | $16$ |
| hypercube $Q_6$ | $192$ | $6$ | $6$ | $32$ |

Links: a ring has $p$; a torus, $2p$ (each node has four links, each shared by two nodes); a hypercube, $dp/2 = 6 \cdot 64 / 2$. A small Python program computes the diameters:

```python
from collections import deque

def diameter(nodes, nbrs):
    def ecc(s):                          # eccentricity of s, by BFS
        dist, q = {s: 0}, deque([s])
        while q:
            u = q.popleft()
            for v in nbrs(u):
                if v not in dist:
                    dist[v] = dist[u] + 1
                    q.append(v)
        return max(dist.values())
    return max(ecc(s) for s in nodes)

p, k, d = 64, 8, 6
print(diameter(range(p), lambda u: [(u + 1) % p, (u - 1) % p]))
print(diameter([(i, j) for i in range(k) for j in range(k)],
               lambda u: [((u[0] + a) % k, (u[1] + b) % k)
                          for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1))]))
print(diameter(range(2 ** d), lambda u: [u ^ (1 << i) for i in range(d)]))
```

```console
$ python3 topo.py
32
8
6
```

The hypercube wins on diameter and bisection, at the price of a degree that grows with $\log p$; for $p = 2^{20}$ nodes each would need $20$ ports. The torus keeps the degree at $4$ for any size and maps naturally onto programs that simulate a physical grid, which is why several supercomputers (Cray's T3D and T3E, IBM's Blue Gene, Fujitsu's K computer and Fugaku) used 3D to 6D tori. Fat trees avoid the trade-off by putting the complexity in switches rather than in the nodes.
:::
:::

::: quiz
Which statements about the machines of this chapter are correct?
- [x] A cluster of multicore nodes is MIMD, and programs for it are usually SPMD.
- [ ] A dual-socket NUMA server is a distributed-memory machine, because each socket has its own memory.
- [x] The AVX2 instruction that adds four pairs of `double`s at once is an example of SIMD.
- [ ] A ring of $p$ nodes and a hypercube of $p$ nodes have the same bisection width, because both are connected.
::: solution
A cluster's nodes run independent instruction streams on their own data (MIMD), and the standard way to program them is to run one program on every node, distinguished by rank (SPMD). A NUMA server is still a *shared*-memory machine: every core can load and store every address, only at different speeds ([[#def-memory-org]]). A vector add is one instruction applied to several data elements: SIMD. A ring's bisection width is $2$ whatever its size, while a hypercube's is $p/2$ ([[#thm-hypercube]]).
:::
:::

::: history
The first parallel machines were vector and array processors. The ILLIAC IV, designed at the University of Illinois under Daniel Slotnick and operational at NASA Ames from the mid-1970s, had $64$ processing elements driven by one control unit — SIMD in Flynn's sense. Michael Flynn proposed his taxonomy in "Very high-speed computing systems" (*Proceedings of the IEEE*, 1966) and extended it in 1972. Seymour Cray's Cray-1 (1976) made vector processing the dominant supercomputer design for two decades. In the 1980s massively parallel machines appeared: Caltech's Cosmic Cube (Charles Seitz and Geoffrey Fox, 1983), a hypercube of $64$ microprocessors that pioneered message passing, and Danny Hillis's Connection Machine (1985), with $65{,}536$ one-bit processors. Thomas Sterling and Donald Becker's Beowulf cluster at NASA Goddard (1994) showed that commodity PCs on Ethernet could do the same work, and clusters have dominated the TOP500 list of supercomputers (started in 1993) ever since. Robert Dennard's scaling rules (1974) ended in the mid-2000s; IBM's POWER4 (2001) was the first commercial multicore processor, and dual-core desktop processors followed in 2005. NVIDIA's CUDA (announced in 2006, released in 2007) turned graphics processors into general-purpose parallel machines.
:::

## Where this leads

The next chapter, [[parallel-computing/performance-laws]], asks how much faster a parallel program can be: Amdahl's and Gustafson's laws, the work–span model, and the roofline model that makes this chapter's balance calculation precise. Then the course follows the hierarchy of this chapter. Shared-memory machines are programmed with threads and OpenMP ([[parallel-computing/shared-memory]]); their caches must be kept coherent and their memory accesses ordered ([[parallel-computing/memory-consistency]]); shared data structures need new designs ([[parallel-computing/concurrent-data-structures]]). [[parallel-computing/parallel-algorithms]] designs algorithms independent of any machine; [[parallel-computing/gpu-programming]] and [[parallel-computing/message-passing]] map them onto GPUs and clusters; and [[parallel-computing/performance-engineering]] puts everything together on real code. Distributed systems — many machines that fail independently, without a shared clock — are the subject of [[distributed-systems]].

::: summary
- Processors became parallel when **Dennard scaling** ended around 2005: dynamic power $aCV^2f$ grows roughly as $f^3$, so several slower cores give more throughput per watt than one fast one ([[#ex-two-cores]]) — but only to parallel programs.
- **Flynn's taxonomy** ([[#def-flynn]]) distinguishes SISD, SIMD, MISD and MIMD; most parallel programs are **SPMD**, and GPUs are **SIMT**. Memory organisation — **shared** (UMA or NUMA) or **distributed** ([[#def-memory-org]]) — matters more in practice.
- A multicore chip replicates cores and private caches but shares the last-level cache, the memory controllers and the memory bandwidth: compute-bound loops scaled $29$-fold on $32$ cores of our machine, a memory-bound one only $8.8$-fold.
- Vector units multiply the arithmetic rate: the **peak** is cores × clock × instructions × lanes × operations per lane ([[#eq-peak]]), $1.32$ Tflop/s for our $36$ Haswell cores against about $136$ GB/s of memory bandwidth.
- GPUs trade per-thread speed for massive numbers of simple lanes and threads, hiding latency by switching between them; they excel on regular data-parallel work.
- Interconnection networks are compared by degree, **diameter** and **bisection width** ([[#def-topology]]); the hypercube has diameter $\log p$ and bisection $p/2$ ([[#thm-hypercube]]), the ring $p/2$ and $2$, and fat trees achieve full bisection with fixed-degree switches.
- SMT threads are not cores: always find out what `nproc` is counting.
:::

## Exercises

::: exercise Peak rate of a laptop {level=1 check="384"}
A laptop processor has $8$ cores at $3$ GHz, each able to issue two $256$-bit fused multiply–adds per cycle. What is its peak double-precision rate in Gflop/s? (Enter the number of Gflop/s.)
::: solution
By [[#eq-peak]]: $8 \times 3 \times 10^9 \times 2 \times 4 \times 2 = 384 \times 10^9$ flop/s, that is $384$ Gflop/s. (In single precision, with $8$ lanes, it is $768$ Gflop/s.) Under sustained load the clock often falls below its nominal value, so this peak is optimistic.
:::
:::

::: exercise Hypercube diameter {level=1 check="10"}
A hypercube network has $1024$ nodes. What is its diameter? (Enter the number of hops.)
::: solution
$1024 = 2^{10}$, so it is $Q_{10}$ and its diameter is $10$ by [[#thm-hypercube]] — the distance between a node and its complement. Each node needs $10$ ports, and there are $10 \cdot 1024 / 2 = 5120$ links.
:::
:::

::: exercise Bisection width of a torus {level=1 check="16"}
What is the bisection width of an $8 \times 8$ two-dimensional torus? (Enter the number of links.) Explain why a cut through the middle crosses that many links.
::: solution
$16$. Cut the torus between columns $4$ and $5$: each of the $8$ rows is a ring of $8$ nodes, and a vertical cut crosses each row twice — once in the middle and once at the wrap-around link — giving $2 \times 8 = 16$ links. (A cut between rows is the same.) That no bisection uses fewer links needs an argument like the lower bound of [[#thm-hypercube]]; the result $2k$ for an even $k \times k$ torus is standard. A mesh without wrap-around links has bisection width $8$.
:::
:::

::: exercise Flynn's classes {level=1}
Classify each of the following in Flynn's taxonomy, and say whether its memory is shared or distributed: (a) a single core executing a scalar loop; (b) the same core executing an AVX2 loop; (c) a dual-socket server running an OpenMP program; (d) $100$ cluster nodes running an MPI program; (e) three flight computers computing the same control law and voting on the result.
::: solution
(a) SISD (ignoring instruction-level parallelism, which does not change the instruction stream). (b) SIMD: one instruction stream, each instruction operating on four or eight data elements. (c) MIMD with shared memory (NUMA): each core has its own instruction stream; all share one address space. (d) MIMD with distributed memory, programmed SPMD. (e) Usually cited as MISD-like redundancy, though strictly each computer has its own copy of the data stream; it shows how rarely MISD fits real machines.
:::
:::

::: exercise The power of slower cores {level=2 check="1.024"}
Under the model $P \propto f^3$ of [[#ex-two-cores]], what is the total power of two cores running at $80\%$ of the frequency of a single core, as a multiple of that single core's power? (Enter the multiple.) How many cores at $50\%$ frequency fit in the power budget of one full-speed core, and what is their total throughput?
::: solution
$2 \times 0.8^3 = 1.024$. At half frequency each core uses $0.5^3 = 1/8$ of the power, so $8$ cores fit in the budget, with throughput $8 \times 0.5 = 4$ times one core — the value $n^{2/3}$ at $n = 8$ in the figure. Real chips cannot lower voltage below a floor, so the cubic law flattens at low frequencies, and leakage power is paid per core regardless of frequency; the true gain is smaller.
:::
:::

::: exercise When bandwidth runs out {level=2 check="8"}
One core of a processor can stream data from memory at $6$ GB/s, and the memory system delivers at most $48$ GB/s to all cores together. What is the largest speed-up that a program which only streams through an array (as in the opening experiment) can obtain from any number of cores? (Enter the speed-up.) At how many cores is it reached?
::: solution
The time is the number of bytes divided by the bandwidth achieved, which is $\min(6p, 48)$ GB/s with $p$ cores. The speed-up over one core is $\min(6p, 48)/6 = \min(p, 8)$, at most $8$, reached at $p = 8$ cores. Beyond that, extra cores only wait. The opening experiment, with about $6$ GB/s per core and $52$ GB/s in total, behaved the same way (speed-up $8.8$). In [[parallel-computing/performance-laws]] this becomes the bandwidth roof of the roofline model.
:::
:::

::: exercise Explaining the compute-bound result {level=2}
In the opening compute-bound experiment, $32$ threads were $28.8$ times faster than one, not $32$. List at least three plausible causes, and describe an experiment that would distinguish two of them.
::: solution
(1) **Frequency**: Intel processors run a single active core at a higher turbo frequency (up to $3.8$ GHz here) than when all cores are active, because of the power budget; so the one-thread baseline ran at a higher clock. (2) **Interference**: other users' jobs were using some cores (the load average was about $7$), so some threads shared a core with another process. (3) **Thread creation and joining** take tens of microseconds per thread — small against $57$ ms, but not zero. (4) **Imperfect balance**: the program waits for the slowest thread; if one thread is delayed by an interrupt or a busy neighbour, everyone waits. To separate (1) from (2), repeat the measurement with the frequency fixed (with `cpupower frequency-set`, if you have the privilege) or read the actual frequency from `/proc/cpuinfo` during the run; and repeat it on an idle machine, or run each configuration several times and take the minimum, which filters out interference but not frequency effects.
:::
:::

::: exercise Edges of the hypercube {level=2}
Prove that $Q_d$ has $d\,2^{d-1}$ edges and is **bipartite** (its nodes can be coloured with two colours so that every edge joins different colours). Deduce that $Q_d$ has no cycle of odd length.
::: solution
Each of the $2^d$ nodes has exactly $d$ neighbours (flip one of $d$ bits), and each edge is counted from both ends, so there are $d\,2^d / 2 = d\,2^{d-1}$ edges. Colour a node by the parity of the number of $1$ bits it contains. Flipping one bit changes that number by one, so every edge joins an even node to an odd node: the graph is bipartite. Along any cycle the colours alternate, and the cycle returns to its starting colour, so it has an even number of edges.
:::
:::

::: exercise A ring inside a hypercube {level=3}
A program written for a ring of $p = 2^d$ processors (each talking to its two neighbours) is to run on a hypercube $Q_d$. Show how to assign ring positions $0, \dots, p - 1$ to hypercube nodes so that ring neighbours are hypercube neighbours (an embedding with **dilation** $1$). Prove that your construction works, and give the assignment for $d = 3$.
::: solution
Use the **binary reflected Gray code**: $G_1 = (0, 1)$, and $G_{d+1}$ is $G_d$ with a $0$ prefixed to every word, followed by $G_d$ *reversed* with a $1$ prefixed to every word. Assign ring position $i$ to the $i$-th word of $G_d$.

We prove by induction on $d$ that $G_d$ lists all $2^d$ words of $d$ bits, each once, and that consecutive words — including the last and the first — differ in exactly one bit. For $d = 1$, $0$ and $1$ differ in one bit. Suppose it holds for $G_d$. The words of $G_{d+1}$ are the $2^d$ words $0w$ and the $2^d$ words $1w$, all distinct. Consecutive words within either half differ in one bit because consecutive words of $G_d$ (or of $G_d$ reversed) do. At the junction, the last word of the first half is $0w_{\text{last}}$ and the first word of the second half is $1w_{\text{last}}$ (the reversal starts with the last word): they differ only in the first bit. At the wrap-around, the last word of $G_{d+1}$ is $1w_{\text{first}}$ and its first word is $0w_{\text{first}}$: again one bit.

For $d = 3$: $000, 001, 011, 010, 110, 111, 101, 100$. In code, the $i$-th word is `i ^ (i >> 1)`. The same idea embeds a $2^a \times 2^b$ torus in $Q_{a+b}$ by using a Gray code for each coordinate, which is why hypercube machines could run grid programs efficiently.
:::
:::

::: exercise Diameters by program {level=3}
Extend the program of [[#ex-topologies]] to a $k \times k$ mesh (no wrap-around) and to a complete binary tree of switches with $p$ processors at the leaves (count only the hops between leaves). Tabulate the diameter for $p = 16, 64, 256$, and check your table against the formulas $2(k - 1)$ and $2\log p$.
::: solution
For the mesh, the neighbours of $(i, j)$ are the up to four positions $(i \pm 1, j)$, $(i, j \pm 1)$ that lie inside the grid. For the tree, number the nodes as in a binary heap — node $v$ has children $2v$ and $2v + 1$ and parent $\lfloor v/2 \rfloor$, nodes $1, \dots, p - 1$ are switches and $p, \dots, 2p - 1$ are leaves — and take the maximum eccentricity over the leaves only:

```python
def mesh(k):
    nodes = [(i, j) for i in range(k) for j in range(k)]
    def nbrs(u):
        cand = [(u[0] + 1, u[1]), (u[0] - 1, u[1]), (u[0], u[1] + 1), (u[0], u[1] - 1)]
        return [v for v in cand if 0 <= v[0] < k and 0 <= v[1] < k]
    return nodes, nbrs

def tree(p):                                  # p leaves, heap numbering
    def nbrs(v):
        out = [v // 2] if v > 1 else []
        return out + ([2 * v, 2 * v + 1] if v < p else [])
    return range(p, 2 * p), nbrs              # eccentricities of leaves only

for k, p in ((4, 16), (8, 64), (16, 256)):
    print(p, diameter(*mesh(k)), diameter(*tree(p)))
```

Because `ecc` explores the whole graph from each starting node but `diameter` only starts from the nodes passed to it, passing the leaves measures the maximum leaf-to-leaf distance (the farthest node from a leaf is another leaf). The output is

```console
16 6 8
64 14 12
256 30 16
```

matching $2(k - 1) = 6, 14, 30$ and $2\log p = 8, 12, 16$. The tree's diameter grows only logarithmically, but its bisection width is $1$; the mesh's diameter grows as $\sqrt{p}$ but its bisection as $\sqrt{p}$ too.
:::
:::
