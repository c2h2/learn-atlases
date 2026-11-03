Every design decision in this course has been justified by a number: the carry-select adder is $2.5$ times faster than ripple carry, the pipeline completes an instruction every $290\,\mathrm{ps}$ instead of every $750$, the L2 cache cuts the average memory access time from $11$ cycles to $3.6$. Computer architecture is a quantitative discipline, and its arguments are only as good as the measurements and models behind them. A designer who adds a feature because it "should help" without estimating by how much will often spend chip area, power and design time on something that makes no difference — or makes things worse.

This chapter collects the tools for such estimates. We define performance precisely and relate it to the three factors of the **processor performance equation**, see how to break CPI into contributions from the pipeline and the memory system, and meet **Amdahl's law**, which limits what any single improvement can achieve. We then turn to measurement — benchmarks and how to summarise them honestly — and to the two constraints that have come to dominate design since the mid-2000s: **power**, and the balance between computation and **memory bandwidth** captured by the roofline model. The software-oriented laws of parallel speedup (Gustafson's law, work and span) are treated in [Speed-up and performance laws](/learn/cs/lesson.php?c=parallel-computing&l=performance-laws); here we take the hardware designer's view.

## Defining performance

What does it mean for one computer to be faster than another? A user at a laptop cares about **response time** (also called execution time or latency): how long a task takes from start to finish. The operator of a data centre cares about **throughput**: how many tasks are completed per unit time. The two are related but not the same; adding a second processor increases throughput but does not shorten any single task that cannot be split.

::: definition Performance and relative performance {#def-perf}
For a given task, the **performance** of a computer is the reciprocal of its execution time, $\text{Performance} = 1/T$. Computer X is **$n$ times faster** than computer Y if

$$
n = \frac{\text{Performance}_X}{\text{Performance}_Y} = \frac{T_Y}{T_X}.
$$

The **speedup** of an improved design over an original one is $S = T_{\text{original}}/T_{\text{improved}}$.
:::

Saying "X is $25\,\%$ faster than Y" therefore means $T_Y/T_X = 1.25$, which is *not* the same as "X takes $25\,\%$ less time" ($T_X = 0.75T_Y$, a ratio of $1.33$). Ambiguous percentages are a common source of confusion; ratios of execution times are not.

Execution time itself needs care. **Elapsed** (wall-clock) time includes everything — waiting for storage, the network, other programs. **CPU time** counts only the time the processor spent on the task, split into **user** time (in the program) and **system** time (in the operating system on its behalf). For processor design, CPU time is the relevant measure; for the user, elapsed time is what counts.

## The processor performance equation

For CPU time, [[computer-architecture/instruction-set-architecture#thm-perfeq]] gives the fundamental relation

$$
T = \text{IC}\times\text{CPI}\times t_{\text{clk}} = \frac{\text{IC}\times\text{CPI}}{f_{\text{clk}}} .
$$ {#eq-perf}

Each factor is influenced by different parts of the design:

| factor | determined mainly by |
|---|---|
| instruction count IC | the program, the compiler, the ISA |
| cycles per instruction CPI | the microarchitecture (pipeline, caches, predictors), the ISA, the compiler's scheduling |
| clock period $t_{\text{clk}}$ | the microarchitecture (logic per stage), the circuit design and the process technology |

The factors are not independent, and that is what makes design interesting. A deeper pipeline shortens $t_{\text{clk}}$ but raises CPI; a richer ISA lowers IC but may raise CPI or $t_{\text{clk}}$; an aggressive compiler optimisation may lower IC but introduce load-use stalls. Only the product matters.

When instructions fall into classes with different cycle counts, CPI is a weighted average.

::: proposition CPI from instruction classes {#prop-cpiclass}
If a program executes $\text{IC}_i$ instructions of class $i$, each taking $\text{CPI}_i$ cycles on average, then

$$
\text{CPI} = \sum_i \frac{\text{IC}_i}{\text{IC}}\,\text{CPI}_i = \sum_i F_i\,\text{CPI}_i ,
$$ {#eq-cpiclass}

where $F_i = \text{IC}_i/\text{IC}$ is the frequency of class $i$, and the total number of cycles is $\sum_i \text{IC}_i\,\text{CPI}_i$.
:::

::: proof
The total number of cycles is the sum over classes of the instruction count times the cycles per instruction, $\sum_i \text{IC}_i\,\text{CPI}_i$. Dividing by $\text{IC} = \sum_i \text{IC}_i$ gives the average.
:::

::: example Two compilers and a misleading metric {#ex-mips}
A processor at $3\,\mathrm{GHz}$ has three instruction classes taking $1$, $2$ and $4$ cycles. Two compilers produce code for the same program with these instruction counts (in billions):

| compiler | class A (1 cycle) | class B (2 cycles) | class C (4 cycles) |
|---|---|---|---|
| 1 | 4 | 2 | 1 |
| 2 | 9 | 1 | 1 |

Which code is faster? Which has the higher MIPS rating (millions of instructions per second)?
::: solution
*Compiler 1*: cycles $= 4\times 1 + 2\times 2 + 1\times 4 = 12\times 10^9$; IC $= 7\times 10^9$; CPI $= 12/7 = 1.71$; time $= 12\times 10^9/(3\times 10^9) = 4.0\,\mathrm{s}$.

*Compiler 2*: cycles $= 9 + 2 + 4 = 15\times 10^9$; IC $= 11\times 10^9$; CPI $= 15/11 = 1.36$; time $= 5.0\,\mathrm{s}$.

Compiler 1's code is $1.25$ times faster. But its MIPS rating is $7\times 10^9/(4.0 \times 10^6) = 1750$, while compiler 2's is $11\times 10^9/(5.0\times 10^6) = 2200$. Compiler 2 executes *more* instructions *more quickly* and finishes *later*. MIPS rewards executing many simple instructions, whether or not they are needed.
:::
:::

::: warning MIPS and FLOPS are not performance
The MIPS rate, $\text{IC}/(T\times 10^6) = f_{\text{clk}}/(\text{CPI}\times 10^6)$, ignores the instruction count, so it cannot compare computers with different ISAs, or even different compilers on one ISA, as [[#ex-mips]] shows. A peak MIPS or FLOPS figure (floating-point operations per second) from a data sheet is worse still: it is the rate the hardware could reach if every cycle issued the most favourable instructions, which real programs never do. The only reliable measure of performance is the execution time of real programs.
:::

### CPI stacks

[[#eq-cpiclass]] has a second, more useful form. Instead of classifying instructions, classify the *cycles*: those in which an instruction completes normally, and those lost to each kind of stall. The CPI is then a sum of a base value and penalty terms, each a product of an event frequency and a cost, as in [[computer-architecture/pipelining#eq-cpi-stalls]] and [[computer-architecture/memory-hierarchy#eq-cpi-mem]]. Drawn as a stacked bar, this is a **CPI stack**, the standard way in which processor designers and performance engineers see where time goes. Hardware **performance counters**, present in every modern processor, count cycles, instructions, cache misses and mispredictions, so the stack can be measured directly on real programs.

::: example A CPI stack {#ex-cpistack}
A four-wide out-of-order processor has a base CPI of $0.40$ when everything hits and every branch is predicted. Per instruction there are $0.18$ branches, of which $4\,\%$ are mispredicted at a cost of $16$ cycles; $0.02$ L1 data misses that hit in the L2 at $14$ cycles, of which out-of-order execution hides half; and $0.002$ misses to DRAM at $300$ cycles, of which two on average overlap (so each effectively costs $150$). Build the CPI stack and say which improvement would help most.
::: solution
- base: $0.40$
- branch mispredictions: $0.18\times 0.04\times 16 = 0.115$
- L2 hits: $0.02\times 14\times 0.5 = 0.14$
- DRAM misses: $0.002\times 300/2 = 0.30$

Total CPI $= 0.955$. The DRAM term is the largest, $31\,\%$ of all cycles, although only one instruction in five hundred causes one. Halving the misprediction rate would save $0.058$ ($6\,\%$); halving DRAM misses (a larger L3 or a better prefetcher) would save $0.15$ ($16\,\%$). The base CPI, which a wider pipeline would attack, is only $42\,\%$ of the total.
:::
:::

## Amdahl's law

An improvement that speeds up part of a task leaves the rest unchanged. The unchanged part soon dominates.

::: theorem Amdahl's law {#thm-amdahl}
Suppose a fraction $f$ of the execution time of a task is spent in a part that is made $s$ times faster, and the remaining fraction $1 - f$ is unaffected. Then the overall speedup is

$$
S = \frac{1}{(1 - f) + f/s} .
$$ {#eq-amdahl}

However large $s$ becomes, $S < 1/(1 - f)$.
:::

::: proof
Let the original time be $T$. The unaffected part takes $(1 - f)T$ before and after; the improved part takes $fT$ before and $fT/s$ after. The new time is $T' = (1 - f)T + fT/s$, and $S = T/T'$ gives [[#eq-amdahl]]. As $s\to\infty$, $T' \to (1 - f)T > 0$, so $S$ increases towards $1/(1 - f)$ but never reaches it.
:::

::: corollary Amdahl's law for parallel processors {#cor-amdahl-par}
If a fraction $f$ of a program can be spread perfectly over $p$ processors and the rest runs on one, the speedup on $p$ processors is $S(p) = 1/\bigl((1 - f) + f/p\bigr)$, which tends to $1/(1 - f)$ as $p \to \infty$.
:::

The lesson for designers is often summarised as **make the common case fast**: an improvement is worth as much as the fraction of time it affects. A second lesson is that speedups multiply but fractions shift: after one part of a program has been accelerated, the remaining parts are a larger fraction of the new time, so the next improvement must be judged against the new profile, not the old one.

::: example An enhanced floating-point unit {#ex-amdahl}
A program spends $70\,\%$ of its time in floating-point computation. Option 1 is a floating-point unit $3$ times faster. Option 2 speeds everything else up by a factor $1.5$. Which is better? What is the best possible speedup from improving floating point alone?
::: solution
Option 1: $f = 0.7$, $s = 3$: $S = 1/(0.3 + 0.7/3) = 1/(0.3 + 0.233) = 1.875$.

Option 2: $f = 0.3$, $s = 1.5$: $S = 1/(0.7 + 0.3/1.5) = 1/0.9 = 1.11$.

Option 1 is better by far, because it attacks the common case. Even an infinitely fast floating-point unit gives at most $1/0.3 = 3.33$.
:::
:::

::: widget plot
f: 1/((1 - a) + a/x); 1/(1 - a)
x: 1, 64
y: 0, 25
sliders: a=0.9:0:0.99:0.01
labels: S(s); \text{limit }1/(1-f)
caption: Amdahl's law: the overall speedup against the speedup $s$ of the improved part (or the number of processors $p$), for an improved fraction $f$ set by the slider $a$. With $f = 0.9$, $64$ processors give only $8.8$, and the limit is $10$. Push $f$ to $0.99$ and the curve climbs much further — the serial fraction, however small, is what limits a parallel machine.
:::

Amdahl's law assumes a fixed task. If, as is common for parallel machines, the task grows with the machine — a bigger simulation on a bigger computer — the serial fraction shrinks as the problem grows, and the achievable speedup is much larger; that is **Gustafson's law**, discussed in [Speed-up and performance laws](/learn/cs/lesson.php?c=parallel-computing&l=performance-laws).

::: quiz
A program runs in $100\,\mathrm{s}$, of which $80\,\mathrm{s}$ are spent in multiplications. How much faster must multiplication become for the whole program to run $5$ times faster?
- [ ] $5$ times
- [ ] $25$ times
- [ ] $80$ times
- [x] no speedup of multiplication is enough
::: solution
To run in $20\,\mathrm{s}$, the program would have to finish its $20\,\mathrm{s}$ of other work and its multiplications in $20\,\mathrm{s}$, leaving no time at all for the multiplications. By [[#thm-amdahl]] the speedup is below $1/(1 - 0.8) = 5$ for every finite $s$. (A speedup of $4$ is reachable: $20 + 80/s = 25$ gives $s = 16$.)
:::
:::

Amdahl's law assumes a fixed task. If, as is common for parallel machines, the task grows with the machine — a bigger simulation on a bigger computer — the serial fraction shrinks as the problem grows, and the achievable speedup is much larger; that is **Gustafson's law**, discussed in [Speed-up and performance laws](/learn/cs/lesson.php?c=parallel-computing&l=performance-laws).

::: quiz
A program runs in $100\,\mathrm{s}$, of which $80\,\mathrm{s}$ are spent in multiplications. How much faster must multiplication become for the program to run $4$ times faster?
- [ ] $4$ times
- [ ] $5$ times
- [ ] $16$ times
- [x] it is impossible
::: solution
To run in $25\,\mathrm{s}$, the multiplications would have to take $25 - 20 = 5\,\mathrm{s}$, a speedup of $16$. That *is* possible. Check the answer carefully: the other $20\,\mathrm{s}$ are untouched, so the time is $20 + 80/s$. Setting this to $25$ gives $s = 16$. So the correct answer is $16$ times — and a $5$-times speedup would be the impossible target: $20 + 80/s = 20$ would need $s = \infty$.
:::
:::

## Benchmarks

To compare computers, we run programs on them. The programs should be the ones the user will run; since that is rarely practical, the industry uses **benchmark suites** — collections of real programs chosen to represent a class of workloads, with rules for compiling, running and reporting.

- **SPEC CPU**, from the Standard Performance Evaluation Corporation, is the reference for processor and compiler performance: integer and floating-point suites of real applications (compilers, compression, chess, physics and weather simulations, among others), each run to measure speed (one copy) and throughput (many copies). The 2017 suite has been the standard for most of the past decade.
- **Embedded** benchmarks such as EEMBC's CoreMark measure microcontrollers and small cores with a compact, portable workload, reported per megahertz.
- **Domain** benchmarks measure particular workloads: MLPerf for machine-learning training and inference, TPC benchmarks for databases, SPECpower for energy efficiency, and the LINPACK benchmark that ranks the TOP500 supercomputers.

Small **synthetic** benchmarks (Dhrystone, Whetstone) and **kernels** (a loop or a small function) are easy to run but easy to optimise for specifically; they are useful for understanding a mechanism, not for judging a computer.

### Summarising results

A suite yields one execution time per program. To summarise them in one number, SPEC normalises each time to a reference machine, giving a **ratio** $r_i = T_{\text{ref},i}/T_i$ (bigger is faster), and reports the **geometric mean** of the ratios.

::: proposition The geometric mean is independent of the reference {#prop-geomean}
Let computers X and Y have execution times $T_{X,i}$ and $T_{Y,i}$ on programs $i = 1, \dots, n$, and let $G_X = \bigl(\prod_i T_{\text{ref},i}/T_{X,i}\bigr)^{1/n}$ be the geometric mean of X's ratios to a reference machine, similarly $G_Y$. Then

$$
\frac{G_X}{G_Y} = \Bigl(\prod_{i=1}^n \frac{T_{Y,i}}{T_{X,i}}\Bigr)^{1/n},
$$

which does not depend on the reference machine.
:::

::: proof
$$
\frac{G_X}{G_Y} = \Bigl(\prod_i \frac{T_{\text{ref},i}}{T_{X,i}}\Bigr)^{1/n}\Bigl(\prod_i \frac{T_{Y,i}}{T_{\text{ref},i}}\Bigr)^{1/n} = \Bigl(\prod_i \frac{T_{\text{ref},i}}{T_{X,i}}\cdot\frac{T_{Y,i}}{T_{\text{ref},i}}\Bigr)^{1/n} = \Bigl(\prod_i\frac{T_{Y,i}}{T_{X,i}}\Bigr)^{1/n}.
$$

The reference times cancel.
:::

The arithmetic mean of normalised ratios does not have this property: depending on which machine is chosen as the reference, it can rank X above Y or Y above X (see [[#exr-means]]). The geometric mean, on the other hand, is not proportional to total execution time, so it does not predict how long a particular mix of the programs will take; for that, a weighted arithmetic mean of *times*, with weights reflecting the real workload, is the right summary.

::: example A SPEC-style score {#ex-spec}
A computer achieves ratios $12.0$, $8.0$, $15.0$ and $6.0$ on four benchmarks. What is its score? If a compiler change doubles the ratio of the last benchmark only, what is the new score?
::: solution
$G = (12\times 8\times 15\times 6)^{1/4} = 8640^{1/4} = 9.64$. Doubling one of four ratios multiplies the geometric mean by $2^{1/4} = 1.189$: the new score is $11.46$. Every benchmark has the same leverage on the geometric mean, which is why a dramatic improvement on one program — sometimes a benchmark-specific "optimisation" — can move the score noticeably, and why SPEC's run rules forbid compiler flags targeted at individual benchmarks.
:::
:::

## Power and energy

Until the mid-2000s, each new process generation, every two to three years, made transistors smaller, about $40\,\%$ faster *and* lower in power, so that power density stayed constant while clock rates rose — **Dennard scaling**. Since then, supply voltages have stopped falling with feature size, because lower threshold voltages make leakage current grow exponentially, and power, not transistor count, limits what a chip can do.

::: theorem Dynamic power of CMOS logic {#thm-power}
A CMOS circuit with total switched capacitance $C$, supply voltage $V_{DD}$ and clock frequency $f$, in which a fraction $\alpha$ (the **activity factor**) of the capacitance is charged in each cycle, dissipates the dynamic power

$$
P_{\text{dyn}} = \alpha\,C\,V_{DD}^2\,f .
$$ {#eq-power}

The total power adds the static (leakage) power, $P = P_{\text{dyn}} + V_{DD}I_{\text{leak}}$.
:::

::: proof
Charging a capacitance $C$ from $0$ to $V_{DD}$ through the pull-up network draws a charge $CV_{DD}$ from the supply, which delivers energy $QV_{DD} = CV_{DD}^2$; half is stored on the capacitor and half dissipated in the pull-up transistors. Discharging through the pull-down network dissipates the stored half. So each full charge–discharge cycle dissipates $CV_{DD}^2$. If a fraction $\alpha$ of the capacitance completes such a cycle per clock period, the energy per second is $\alpha CV_{DD}^2 f$. The circuit-level details, including short-circuit current, are in [[digital-ic/power-dissipation]].
:::

Because the maximum clock frequency of CMOS logic rises roughly in proportion to $V_{DD}$ (over a limited range), lowering voltage and frequency together reduces dynamic power roughly with the **cube** of the frequency. This is the basis of **dynamic voltage and frequency scaling** (DVFS), used by every modern processor.

::: example Scaling voltage and frequency {#ex-dvfs}
A core dissipates $100\,\mathrm{W}$ (all dynamic) at $1.0\,\mathrm{V}$ and $4.0\,\mathrm{GHz}$. Its frequency can be lowered in proportion to the voltage. (a) What is its power at $0.85\,\mathrm{V}$? (b) How much energy does a task use, relative to the original? (c) What do two such cores at $0.85\,\mathrm{V}$ achieve, compared with one at $1.0\,\mathrm{V}$, on a perfectly parallel task?
::: solution
(a) $V$ and $f$ both scale by $0.85$: $P = 100\times 0.85^2\times 0.85 = 61.4\,\mathrm{W}$.

(b) The task takes $1/0.85 = 1.18$ times as long, so the energy is $61.4\times 1.18 = 72.3\,\%$ of the original: energy per operation scales with $V^2$, $0.85^2 = 0.7225$.

(c) Two cores give $2\times 0.85 = 1.7$ times the throughput for $2\times 61.4 = 123\,\mathrm{W}$, $23\,\%$ more power — or, scaling down a little further to stay within $100\,\mathrm{W}$, about $1.6$ times the throughput for the same power. This arithmetic, applied when Dennard scaling ended, is why processors went multicore ([[computer-architecture/parallel-architectures]]).
:::
:::

Energy, not power, is what a battery measures, and the right metric depends on the product. A phone needs low **energy per task**; a data centre needs high **performance per watt** (operations per joule); a laptop needs both and a power limit for cooling. Running a task fast and then sleeping ("race to idle") can use less energy than running it slowly, if leakage and the rest of the system's power dominate.

## Bandwidth, latency and the roofline

The processor performance equation describes a program's demand on the processor. Many programs are limited instead by memory: they cannot get operands fast enough to keep the arithmetic units busy. The **roofline model** captures this with a single program property.

::: definition Arithmetic intensity and the roofline {#def-roofline}
The **arithmetic intensity** $I$ of a program (or kernel) is the number of operations it performs per byte of data moved between the processor and memory. A computer with peak arithmetic performance $P_{\text{peak}}$ (operations per second) and memory bandwidth $B$ (bytes per second) can sustain at most

$$
P_{\text{att}}(I) = \min\bigl(P_{\text{peak}},\; B\,I\bigr).
$$ {#eq-roofline}

Kernels with $I < P_{\text{peak}}/B$ (the **ridge point**) are **memory-bound**; those with $I$ above it are **compute-bound**.
:::

::: example Where is the roof? {#ex-roofline}
A desktop processor reaches a peak of about $2000$ double-precision GFLOP/s using all its cores and vector units, and has $80\,\mathrm{GB/s}$ of DRAM bandwidth. (a) Find the ridge point. (b) The kernel `y[i] = a*x[i] + y[i]` on double-precision arrays much larger than the caches performs $2$ floating-point operations per element. What performance can it reach?
::: solution
(a) Ridge: $2000/80 = 25$ FLOP per byte.

(b) Per element the kernel reads `x[i]` and `y[i]` and writes `y[i]`: $24$ bytes for $2$ operations, $I = 1/12\,\mathrm{FLOP/B}$. By [[#eq-roofline]], $P_{\text{att}} = 80\times(1/12) = 6.7\,\mathrm{GFLOP/s}$ — a third of one percent of the peak. No improvement to the arithmetic units can help; only more bandwidth, or reorganising the computation to reuse data in the caches (raising $I$), can.
:::
:::

::: widget plot
f: min(Pk, B*x)
x: 0, 60
y: 0, 3000
sliders: Pk=2000:100:5000:100; B=80:20:1000:10
labels: P_{\text{att}}\ \text{(GFLOP/s)}
caption: The roofline: attainable performance against arithmetic intensity (FLOP per byte) for peak $P_k$ GFLOP/s and bandwidth $B$ GB/s. Below the ridge point $P_k/B$ performance is limited by bandwidth (the sloping roof); above it by the arithmetic units (the flat roof). Raise $B$ to $1000\,\mathrm{GB/s}$, as with high-bandwidth memory on a GPU, and the ridge moves far to the left: many more kernels become compute-bound.
:::

Bandwidth itself depends on latency through the number of requests that can be in flight at once.

::: theorem Little's law for memory {#thm-little}
If memory requests of $L$ bytes each have latency $t$ and on average $N$ requests are outstanding, the sustained bandwidth is

$$
B = \frac{N\,L}{t}.
$$ {#eq-little}
:::

::: proof
This is Little's law from queueing theory, $N = \lambda t$: the average number of requests in the system equals their arrival rate $\lambda$ times the average time each spends in it. In steady state the completion rate equals the arrival rate, $\lambda = N/t$ requests per second, each delivering $L$ bytes.
:::

A core that can track $16$ outstanding cache misses of $64$ bytes against a DRAM latency of $90\,\mathrm{ns}$ can therefore sustain at most $16\times 64/(90\times 10^{-9}) = 11.4\,\mathrm{GB/s}$, however fast the memory channels are. To use $80\,\mathrm{GB/s}$, about $80\times 10^9\times 90\times 10^{-9}/64 = 113$ misses must be in flight across the chip: one reason why several cores, and hardware prefetchers, are needed to saturate memory bandwidth.

::: application Performance engineering in practice
Profilers such as Linux `perf` and vendor tools read the hardware performance counters to produce CPI stacks and "top-down" breakdowns (front-end bound, bad speculation, back-end memory bound, back-end core bound, retiring) for real programs. As of 2026, such analyses typically show that server and database workloads spend most of their cycles waiting for memory, while dense linear algebra and neural-network kernels, with high arithmetic intensity, run close to the compute roof. Accelerators are justified by roofline arguments: a GPU with several terabytes per second of high-bandwidth memory and a matrix unit delivering petaflops of low-precision arithmetic moves both roofs up by an order of magnitude for the kernels that fit.
:::

::: history
Gene Amdahl presented his argument on the limits of parallel speedup at the AFIPS Spring Joint Computer Conference of 1967; John Gustafson's rebuttal for scaled problems appeared in 1988. The Standard Performance Evaluation Corporation was founded in 1988 by workstation vendors frustrated by misleading MIPS claims, and released its first CPU benchmark suite in 1989. Robert Dennard and colleagues published the scaling rules for MOSFETs in 1974; their breakdown around 2005 ended the era of rapidly rising clock rates. The roofline model was introduced by Samuel Williams, Andrew Waterman and David Patterson in 2009, and John Little proved the queueing result that bears his name in 1961.
:::

## Where this leads

The tools of this chapter are applied to parallel machines in [[computer-architecture/parallel-architectures]], where Amdahl's law limits multicore speedup, cache coherence adds a new CPI term, and the roofline explains why GPUs need high-bandwidth memory. The circuit-level origins of power dissipation and the techniques for reducing it — clock gating, power gating, multiple voltage domains — are treated in [[digital-ic/power-dissipation]]. On the software side, measuring and improving real programs is the subject of [Performance engineering](/learn/cs/lesson.php?c=parallel-computing&l=performance-engineering).

::: summary
- Performance is the reciprocal of execution time; "X is $n$ times faster than Y" means $T_Y/T_X = n$ ([[#def-perf]]).
- CPU time $= \text{IC}\times\text{CPI}\times t_{\text{clk}}$; each factor depends on different design levels, and only their product matters.
- CPI is a frequency-weighted average over instruction classes ([[#prop-cpiclass]]), or a base value plus stall terms — a CPI stack, measurable with performance counters.
- MIPS and peak FLOPS are not measures of performance; execution time of real programs is.
- Amdahl's law: improving a fraction $f$ by $s$ gives $S = 1/((1-f) + f/s) < 1/(1-f)$ ([[#thm-amdahl]]); make the common case fast.
- Benchmark ratios are summarised by the geometric mean, which is independent of the reference machine ([[#prop-geomean]]).
- Dynamic power is $\alpha CV^2f$ ([[#thm-power]]); scaling voltage and frequency together reduces power roughly with $f^3$ and energy per operation with $V^2$.
- The roofline $\min(P_{\text{peak}}, BI)$ separates memory-bound from compute-bound kernels ([[#def-roofline]]); bandwidth needs many outstanding requests, $B = NL/t$ ([[#thm-little]]).
:::

## Exercises

::: exercise How much faster? {level=1 check="1.6"}
A program takes $12\,\mathrm{s}$ on computer Y and $7.5\,\mathrm{s}$ on computer X. How many times faster is X?
::: solution
$T_Y/T_X = 12/7.5 = 1.6$. X is $1.6$ times faster (it takes $37.5\,\%$ less time).
:::
:::

::: exercise CPU time {level=1 check="2.5"}
A program executes $5\times 10^9$ instructions with an average CPI of $1.2$ on a $2.4\,\mathrm{GHz}$ processor. What is its CPU time in seconds?
::: solution
$T = 5\times 10^9\times 1.2/(2.4\times 10^9) = 2.5\,\mathrm{s}$.
:::
:::

::: exercise A simple Amdahl calculation {level=1 check="1/(0.6+0.1)"}
$40\,\%$ of a program's time is spent in a routine that is made $4$ times faster. What is the overall speedup?
::: solution
$S = 1/(0.6 + 0.4/4) = 1/0.7 = 1.43$.
:::
:::

::: exercise Choosing a design {level=2}
Design A has a clock of $3.0\,\mathrm{GHz}$ and CPI $1.5$ on a program; design B has $2.4\,\mathrm{GHz}$ and CPI $1.1$ but needs $10\,\%$ more instructions because of a simpler ISA. Which is faster, and by how much?
::: solution
Per instruction of A's program: $T_A \propto 1.5/3.0 = 0.500\,\mathrm{ns}$; $T_B \propto 1.1\times 1.1/2.4 = 0.504\,\mathrm{ns}$. A is faster, but only by $0.504/0.500 = 1.008$, under $1\,\%$ — within the error of any measurement. Power, area and cost would decide.
:::
:::

::: exercise Geometric mean {level=2 check="(4*9*1*16)^(1/4)"}
A computer's ratios on four benchmarks are $4$, $9$, $1$ and $16$. What is its geometric-mean score? Compare it with the arithmetic mean.
::: solution
$G = (4\times 9\times 1\times 16)^{1/4} = 576^{1/4} = 4.90$. The arithmetic mean is $30/4 = 7.5$, pulled up by the one large ratio. The geometric mean always lies at or below the arithmetic mean (the AM–GM inequality), with equality only when all ratios are equal.
:::
:::

::: exercise Power of a faster clock {level=2}
A processor dissipates $60\,\mathrm{W}$ of dynamic power at $0.9\,\mathrm{V}$ and $3.0\,\mathrm{GHz}$. To run at $3.6\,\mathrm{GHz}$ it needs $1.05\,\mathrm{V}$. What is its dynamic power at the higher clock, and what is the energy per task relative to before?
::: solution
$P = 60\times(1.05/0.9)^2\times(3.6/3.0) = 60\times 1.361\times 1.2 = 98.0\,\mathrm{W}$. The task takes $1/1.2$ of the time, so the energy is $98.0/(60\times 1.2) = 1.361$ times as much — the $V^2$ factor. A $20\,\%$ speedup costs $63\,\%$ more power and $36\,\%$ more energy.
:::
:::

::: exercise A roofline calculation {level=2 check="25e9"}
A kernel performs $1$ floating-point operation per $4$ bytes of memory traffic. On a machine with $1\,\mathrm{TFLOP/s}$ peak and $100\,\mathrm{GB/s}$ of bandwidth, what performance (in FLOP/s) can it attain?
::: solution
$I = 0.25\,\mathrm{FLOP/B}$, below the ridge point $10^{12}/10^{11} = 10\,\mathrm{FLOP/B}$, so the kernel is memory-bound: $P = 10^{11}\times 0.25 = 2.5\times 10^{10}\,\mathrm{FLOP/s}$, $2.5\,\%$ of the peak.
:::
:::

::: exercise Two enhancements {level=3}
A program spends $50\,\%$ of its time in floating point, $30\,\%$ in memory stalls and $20\,\%$ in other work. Enhancement F makes floating point $2$ times faster; enhancement M halves memory-stall time. (a) What does each give alone? (b) What do both give together? (c) After applying F, what fraction of the new time is memory stalls, and what does M give then?
::: solution
(a) F: $1/(0.5 + 0.5/2) = 1/0.75 = 1.33$. M: $1/(0.7 + 0.3/2) = 1/0.85 = 1.18$.

(b) Both: the new time is $0.25 + 0.15 + 0.20 = 0.60$, so $S = 1.67$. (This is not $1.33\times 1.18 = 1.57$, because the two parts are separate and their savings add.)

(c) After F the time is $0.75$, of which memory stalls are $0.30/0.75 = 40\,\%$. M then gives $1/(0.6 + 0.4/2) = 1/0.8 = 1.25$, and indeed $1.33\times 1.25 = 1.67$. The fraction affected by M has grown from $30\,\%$ to $40\,\%$ — after each improvement, re-profile.
:::
:::

::: exercise Means and references {#exr-means level=3}
Computer A runs program 1 in $10\,\mathrm{s}$ and program 2 in $40\,\mathrm{s}$; computer B takes $20\,\mathrm{s}$ and $20\,\mathrm{s}$. Compute the arithmetic mean of the normalised times (time divided by the reference machine's time) with A as the reference, then with B as the reference. Then compute the geometric means. What do you conclude?
::: solution
*A as reference*: A's normalised times are $1, 1$ (mean $1$); B's are $2, 0.5$ (mean $1.25$). B looks $25\,\%$ slower.

*B as reference*: B's are $1, 1$ (mean $1$); A's are $0.5, 2$ (mean $1.25$). Now A looks $25\,\%$ slower.

*Geometric means*: B relative to A, $\sqrt{2\times 0.5} = 1$; A relative to B, $\sqrt{0.5\times 2} = 1$. The two computers are equal, whichever reference is used ([[#prop-geomean]]). The arithmetic mean of normalised values is inconsistent; the geometric mean is consistent. (If the two programs are run equally often, the total times $50\,\mathrm{s}$ and $40\,\mathrm{s}$ say B is $1.25$ times faster for that workload — a third, workload-specific answer.)
:::
:::

::: exercise Enough misses in flight {level=3}
A memory system has a latency of $100\,\mathrm{ns}$ and transfers $64$-byte lines. (a) How many outstanding misses are needed to sustain $51.2\,\mathrm{GB/s}$, the bandwidth of one DDR5-6400 channel? (b) A core can track $20$ outstanding L1 misses. How many such cores are needed to saturate four channels, if each core's misses are independent?
::: solution
(a) By [[#eq-little]], $N = Bt/L = 51.2\times 10^9\times 100\times 10^{-9}/64 = 80$ outstanding misses.

(b) One core sustains $20\times 64/(100\times 10^{-9}) = 12.8\,\mathrm{GB/s}$. Four channels deliver $204.8\,\mathrm{GB/s}$, needing $204.8/12.8 = 16$ cores (or deeper miss tracking and prefetching per core). Bandwidth-hungry programs run on one core therefore see only a fraction of the memory system's peak.
:::
:::
