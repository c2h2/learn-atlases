The following OpenMP program has two phases. First it fills an array of twenty million numbers from a pseudo-random generator in which each value is computed from the previous one, so this phase cannot be split between threads. Then it applies forty steps of the logistic map to every element independently and adds up the results — a phase that splits perfectly.

```c
#include <omp.h>
#include <stdio.h>

enum { N = 20000000 };
static double x[N];

int main(void) {
    double t0 = omp_get_wtime();
    unsigned long s = 1;                     /* serial phase: a linear congruential */
    for (long i = 0; i < N; i++) {           /* generator, each value from the last */
        s = s * 6364136223846793005UL + 1442695040888963407UL;
        x[i] = (double)(s >> 11) / 9007199254740992.0;   /* in [0, 1) */
    }
    double t1 = omp_get_wtime();
    double sum = 0;                          /* parallel phase: independent work */
    #pragma omp parallel for reduction(+ : sum)
    for (long i = 0; i < N; i++) {
        double y = x[i];
        for (int k = 0; k < 40; k++) y = y * (1.0 - y) * 3.9;   /* logistic map */
        sum += y;
    }
    double t2 = omp_get_wtime();
    printf("p=%2d  serial %.3f s  parallel %.3f s  total %.3f s  (sum %.6f)\n",
           omp_get_max_threads(), t1 - t0, t2 - t1, t2 - t0, sum / N);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fopenmp -o amdahl amdahl.c
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./amdahl; done
p= 1  serial 0.131 s  parallel 1.164 s  total 1.295 s  (sum 0.592473)
p= 2  serial 0.118 s  parallel 0.593 s  total 0.710 s  (sum 0.592473)
p= 4  serial 0.122 s  parallel 0.305 s  total 0.427 s  (sum 0.592473)
p= 8  serial 0.120 s  parallel 0.152 s  total 0.271 s  (sum 0.592473)
p=16  serial 0.122 s  parallel 0.082 s  total 0.204 s  (sum 0.592473)
p=32  serial 0.123 s  parallel 0.067 s  total 0.190 s  (sum 0.592473)
```

(These are observations on the $36$-core machine of [[parallel-computing/parallel-architectures]], shared with other users, as of 2026; your times will differ.) The parallel phase shrinks as we add threads, but the serial phase stays at about $0.12$ s, and by $16$ threads it is more than half of the total. Thirty-two threads make the program only $1.295/0.190 \approx 6.8$ times faster. Was that predictable? Could a better program reach $32$? How many processors is it worth buying for this job?

This chapter gives the quantitative tools to answer such questions. We define speed-up and efficiency, prove **Amdahl's law** and **Gustafson's law** and see why they do not contradict each other, and learn to estimate a program's serial fraction from measurements. Then we replace the crude split into "serial" and "parallel" parts by a precise model of a parallel computation as a graph of tasks — the **work–span model** — and prove **Brent's theorem**, which says how fast any such computation can be scheduled on $p$ processors. Finally the **roofline model** bounds performance from the other side, by the memory bandwidth that [[parallel-computing/parallel-architectures]] found to be the bottleneck of so many programs.

## Speed-up and efficiency

::: definition Speed-up and efficiency {#def-speedup}
Let $T_1$ be the running time of a program on one processor and $T_p$ its running time on $p$ processors. The **speed-up** and **efficiency** are

$$
S(p) = \frac{T_1}{T_p}, \qquad E(p) = \frac{S(p)}{p} = \frac{T_1}{p\,T_p}.
$$ {#eq-speedup}

If $T_1$ is the time of the parallel program run on one processor, $S$ is the **relative** speed-up; if it is the time of the best sequential program for the problem, $S$ is the **absolute** speed-up. A speed-up of $p$ (efficiency $1$) is **linear**; a speed-up above $p$ is **superlinear**.
:::

Relative speed-up is easier to measure but can flatter: a parallel algorithm that does twice the work of the best sequential one may show perfect relative speed-up and still be only $p/2$ times faster than the program you would otherwise have run. Report absolute speed-up when you can, and say which one you report.

Superlinear speed-up seems impossible — $p$ processors doing a job more than $p$ times faster — and in the work–span model it is (see [[#thm-laws]]). In practice it happens when splitting the data makes each processor's share fit in its cache: $p$ processors bring $p$ times as much cache, so the parallel program does fewer slow memory accesses in total. It is a cache effect, not extra computing power, and it disappears when the sequential program is blocked for the cache too ([[parallel-computing/performance-engineering]]).

Two ways of measuring scalability answer different questions:

- **Strong scaling**: fix the problem size, increase $p$, and plot $T_p$ or $S(p)$. It answers "how much faster can I solve *this* problem?"
- **Weak scaling**: grow the problem with $p$, keeping the work per processor constant, and plot $T_p$ (ideally constant) or the scaled speed-up. It answers "how much bigger a problem can I solve in the same time?"

## Amdahl's law

Gene Amdahl, arguing in 1967 for fast single processors against the parallel machines then being proposed, observed that the sequential part of a program limits what any number of processors can achieve.

::: theorem Amdahl's law {#thm-amdahl}
Suppose that a fraction $f$ of a program's running time on one processor, $0 \le f \le 1$, must be executed sequentially, and that the remaining fraction $1 - f$ can be divided perfectly among any number of processors. Then on $p$ processors

$$
S(p) = \frac{1}{f + \dfrac{1 - f}{p}}, \qquad\text{and}\qquad S(p) < \frac{1}{f} \text{ for all } p \text{ if } f > 0.
$$ {#eq-amdahl}
:::

::: proof
On one processor the sequential part takes $fT_1$ and the parallel part $(1 - f)T_1$. On $p$ processors the sequential part still takes $fT_1$, and the parallel part, divided perfectly, takes $(1 - f)T_1/p$. Hence $T_p = fT_1 + (1 - f)T_1/p$ and $S(p) = T_1/T_p = 1/(f + (1 - f)/p)$. Since $(1 - f)/p > 0$ whenever $f < 1$, the denominator exceeds $f$, so $S(p) < 1/f$; if $f = 1$, $S(p) = 1 = 1/f$ is never exceeded. As $p \to \infty$, $S(p) \to 1/f$.
:::

::: example Applying Amdahl's law to the opening program {#ex-amdahl}
In the opening run the serial phase took $0.131$ s of $1.295$ s. Predict the speed-up on $2, 4, \dots, 32$ threads and compare with the measurements. What is the limit for any number of threads?
::: solution
The serial fraction is $f = 0.131/1.295 \approx 0.101$. [[#eq-amdahl]] gives the predictions; the measured speed-ups are $T_1/T_p$ from the table, and efficiency is $S/p$:

| $p$ | $1$ | $2$ | $4$ | $8$ | $16$ | $32$ |
|---|---|---|---|---|---|---|
| Amdahl $S(p)$ | $1.00$ | $1.82$ | $3.07$ | $4.69$ | $6.36$ | $7.75$ |
| measured $S(p)$ | $1.00$ | $1.82$ | $3.03$ | $4.78$ | $6.35$ | $6.82$ |
| measured $E(p)$ | $1.00$ | $0.91$ | $0.76$ | $0.60$ | $0.40$ | $0.21$ |

Up to $16$ threads the law predicts the measurements to within $3\%$. At $32$ the program falls short, for reasons Amdahl's model leaves out: the parallel phase itself took $0.067$ s rather than $1.164/32 = 0.036$ s, because of the cost of starting and synchronising $32$ threads, competition for memory, a lower turbo frequency and other users' jobs. The limit is $1/f \approx 9.9$: no number of processors can make this program ten times faster. To do better, parallelise the generator — for instance, give each thread its own generator, or jump ahead in the sequence, which a linear congruential generator allows ([[#ex-lcg-jump]]).
:::
:::

::: widget plot
f: 1/(s + (1 - s)/x); x
x: 1, 64
y: 0, 40
sliders: s=0.1:0:0.5:0.005
labels: \text{Amdahl } S(p); \text{linear speed-up}
points: 1,1; 2,1.82; 4,3.03; 8,4.78; 16,6.35; 32,6.82
caption: Amdahl's law $S(p) = 1/(f + (1 - f)/p)$ with serial fraction $f$ (the slider $s$), against linear speed-up. The dots are the measurements of [[#ex-amdahl]], for which $f \approx 0.1$. Drag $s$ down to $0.01$: even then $64$ processors give less than $40$, and the curve flattens towards $1/f = 100$. Drag it to $0$ to see linear speed-up — the only case in which adding processors keeps paying off in proportion.
:::

Amdahl's law is pessimistic in a precise way: it holds the *problem* fixed. A $1\%$ serial fraction caps speed-up at $100$, which made massively parallel machines look pointless in 1967. Yet machines with millions of cores now run real applications efficiently. The resolution came twenty years later.

## Gustafson's law

In 1988 John Gustafson, at Sandia National Laboratories, reported speed-ups of over $1000$ on a $1024$-processor hypercube for three scientific applications whose serial fractions, by Amdahl's measure, should have capped them far lower. His explanation: users do not run the same problem on a bigger machine; they run a bigger problem in the same time. The serial part — reading input, setting up — typically stays about the same, while the parallel part grows with the machine.

::: theorem Gustafson's law {#thm-gustafson}
Suppose a program runs for time $T_p$ on $p$ processors, of which a fraction $s$ is spent in sequential code and $1 - s$ in code that keeps all $p$ processors busy with independent work. Then the same work would take one processor $T_1 = sT_p + p(1 - s)T_p$, and the **scaled speed-up** is

$$
S(p) = \frac{T_1}{T_p} = s + p(1 - s) = p - s(p - 1).
$$ {#eq-gustafson}
:::

::: proof
The sequential part takes $sT_p$ on any number of processors. The parallel part occupies $p$ processors for $(1 - s)T_p$, so it contains $p(1 - s)T_p$ processor-seconds of work, which one processor would execute in $p(1 - s)T_p$. Adding gives $T_1$, and dividing by $T_p$ gives [[#eq-gustafson]].
:::

The two laws are the same algebra with different things held fixed. Amdahl fixes the problem and measures the serial fraction $f$ on *one* processor; Gustafson fixes the running time and measures the serial fraction $s$ on *$p$* processors. For a fixed problem the two fractions are related by $f = s/(s + p(1 - s))$, and substituting this into Amdahl's formula gives Gustafson's. Neither law is "right": strong scaling is governed by Amdahl, weak scaling by Gustafson. A climate scientist with a bigger machine refines the grid; a bank with a fixed overnight batch job wants it to finish sooner.

::: example A weather model on a bigger machine {#ex-gustafson}
A simulation on $1024$ processors spends $2\%$ of its running time in sequential setup and output. What is its scaled speed-up? If the same problem were run on one processor, what serial fraction would Amdahl's law see, and what speed-up would it predict for $1024$ processors?
::: solution
By [[#eq-gustafson]], $S = 1024 - 0.02 \times 1023 = 1003.5$. For Amdahl's view, normalise $T_{1024} = 1$: the sequential part takes $0.02$ and the parallel part $0.98$, which on one processor is $0.98 \times 1024 = 1003.52$. So $T_1 = 1003.54$ and $f = 0.02/1003.54 \approx 2.0 \times 10^{-5}$. Amdahl's law with this $f$ gives $1/(f + (1 - f)/1024) \approx 1003.5$ — the same number, as it must be. The large problem has a tiny serial *fraction* because its serial part did not grow with it. On the original small problem, whose serial fraction was larger, Amdahl's limit would have been much lower.
:::
:::

::: widget plot
f: x - s*(x - 1); 1/(s + (1 - s)/x)
x: 1, 64
y: 0, 64
sliders: s=0.1:0:0.5:0.01
labels: \text{Gustafson (scaled) } S(p); \text{Amdahl } S(p)
caption: Gustafson's scaled speed-up $p - s(p - 1)$ and Amdahl's fixed-size speed-up $1/(f + (1-f)/p)$ for the same value of the serial fraction (the slider sets both $s$ and $f$, though they are measured on different runs). Gustafson's line grows without bound, with slope $1 - s$; Amdahl's curve saturates at $1/f$. Notice how far apart they are at $p = 64$ even for $s = 0.05$: the question asked — fixed problem or fixed time — matters more than the machine.
:::

### Measuring the serial fraction

Real programs rarely announce their serial fraction, and overheads that grow with $p$ (communication, synchronisation, imbalance) act like extra serial work. Alan Karp and Horace Flatt (1990) proposed inverting Amdahl's law: solve [[#eq-amdahl]] for $f$ given a measured speed-up.

::: definition Karp–Flatt metric {#def-karp-flatt}
The **experimentally determined serial fraction** for a measured speed-up $S$ on $p > 1$ processors is

$$
e = \frac{1/S - 1/p}{1 - 1/p}.
$$ {#eq-karp-flatt}

If $e$ stays constant as $p$ grows, the limit on speed-up is serial code; if $e$ grows with $p$, it is parallel overhead.
:::

For the opening program, the measured speed-ups give $e = 0.097, 0.106, 0.096, 0.101$ for $p = 2, 4, 8, 16$ — constant and equal to the measured serial fraction — and $e = 0.119$ for $p = 32$, the first sign of overhead.

## The work–span model

Amdahl's model divides a program into a perfectly serial part and a perfectly parallel part. Real parallel programs are subtler: a parallel merge sort is parallel at every level, but each level must wait for the one below. The work–span model captures this structure exactly. It is the model of task-parallel languages such as Cilk, of OpenMP tasks and of Intel's Threading Building Blocks, and of the analysis of parallel algorithms in Cormen–Leiserson–Rivest–Stein.

::: definition Computation DAG, work and span {#def-work-span}
A parallel computation is modelled by a **computation DAG** (directed acyclic graph) $G$ whose vertices are unit-time **tasks** (strands of sequential instructions) and whose edges $u \to v$ mean that $v$ cannot start until $u$ has finished. Then:

- the **work** $T_1$ is the number of vertices: the time to execute the computation on one processor;
- the **span** $T_\infty$ (also *depth* or *critical-path length*) is the number of vertices on a longest path: the time on unboundedly many processors;
- the **parallelism** is the ratio $T_1 / T_\infty$.

$T_p$ denotes the time on $p$ processors under a given schedule, which assigns each task to a processor and a time step, at most one task per processor per step, respecting the edges.
:::

Tasks of unequal length can be modelled by chains of unit tasks. The DAG is a property of the *algorithm* and its input, independent of any machine; the schedule is where the machine enters. Spawning a task and waiting for it (a **fork** and a **join**) create the DAG's edges: a spawned task has an edge from the spawning point, and the join has edges from both branches.

::: theorem The work and span laws {#thm-laws}
For every computation DAG and every schedule on $p$ processors,

$$
T_p \ge \frac{T_1}{p} \quad\text{(work law)}, \qquad T_p \ge T_\infty \quad\text{(span law)}.
$$

Consequently $S(p) \le p$ and $S(p) \le T_1/T_\infty$: speed-up is at most the number of processors and at most the parallelism.
:::

::: proof
Each step executes at most $p$ tasks, and all $T_1$ tasks must be executed, so at least $T_1/p$ steps are needed. The tasks of a longest path must run one after another, since each depends on the previous one, so at least $T_\infty$ steps are needed. Dividing $T_1$ by each bound gives the bounds on $S(p) = T_1/T_p$.
:::

::: example Work and span of a small DAG {#ex-dag}
The DAG below has nine unit tasks: $A$ precedes $B$, $C$, $D$; $B$ and $C$ precede $E$; $D$ precedes $F$ and $G$; $E$, $F$, $G$ precede $H$; $H$ precedes $I$. Find $T_1$, $T_\infty$ and the parallelism, and find the best schedules on $2$ and $3$ processors.
::: solution
$T_1 = 9$. The longest paths have $5$ vertices — for example $A, B, E, H, I$ or $A, D, F, H, I$ — so $T_\infty = 5$ and the parallelism is $9/5 = 1.8$. By [[#thm-laws]] no number of processors gives a speed-up above $1.8$.

On $p = 3$ processors: step $1$: $A$; step $2$: $B, C, D$; step $3$: $E, F, G$; step $4$: $H$; step $5$: $I$. That is $T_3 = 5 = T_\infty$, optimal.

On $p = 2$ the lower bound of [[#thm-laws]] is $\max(9/2, 5) = 5$, but $5$ steps are impossible. To finish in $5$, $I$ must run at step $5$, $H$ at step $4$, so $E$, $F$, $G$ by step $3$, hence $B$, $C$ (for $E$) and $D$ (for $F$, $G$) all at step $2$ — three tasks in one step on two processors. A schedule of $6$ steps exists: $A$; $B, C$; $D, E$; $F, G$; $H$; $I$. So $T_2 = 6$: the work and span laws are lower bounds, not always achievable.
:::
:::

::: widget graph
nodes: A@0,2; B@1,3; C@1,2; D@1,1; E@2,2.5; F@2,1.5; G@2,0.5; H@3,1.5; I@4,1.5
edges: A>B; A>C; A>D; B>E; C>E; D>F; D>G; E>H; F>H; G>H; H>I
algorithm: topo
caption: The computation DAG of [[#ex-dag]]. Step through the topological sort: each step removes a task whose predecessors have all finished, exactly as a scheduler does. At any moment the tasks with no remaining predecessors are the *ready* tasks; a greedy scheduler on $p$ processors runs $\min(p, \text{ready})$ of them per step. Notice that after $A$ three tasks are ready at once, but after $E$, $F$, $G$ only one ($H$) — the narrow points of the DAG are what limit its parallelism to $1.8$.
:::

### Greedy scheduling and Brent's theorem

Finding an optimal schedule is hard: for unit tasks with precedence constraints, deciding whether $p$ processors can finish within a given number of steps is NP-complete when $p$ is part of the input (Jeffrey Ullman, 1975; see [[complexity]]). Remarkably, a very simple strategy is never worse than twice optimal.

::: definition Greedy schedule {#def-greedy}
A schedule is **greedy** if at every step it executes as many ready tasks as possible: all of them if there are at most $p$, otherwise any $p$ of them. A step is **complete** if it executes $p$ tasks and **incomplete** otherwise.
:::

::: theorem Brent's theorem (greedy scheduling bound) {#thm-brent}
Every greedy schedule of a computation DAG with work $T_1$ and span $T_\infty$ on $p$ processors takes

$$
T_p \le \frac{T_1}{p} + T_\infty
$$ {#eq-brent}

steps. Consequently $T_p$ is at most twice the optimal $p$-processor time.
:::

::: proof
Count complete and incomplete steps separately.

*Complete steps.* Each executes $p$ tasks, and there are only $T_1$ tasks, so there are at most $T_1/p$ complete steps.

*Incomplete steps.* Let $G_k$ be the sub-DAG of tasks not yet executed before step $k$, and let $L_k$ be the number of vertices on a longest path of $G_k$; initially $L_1 = T_\infty$, and $L$ never increases, since $G_{k+1} \subseteq G_k$. A task is ready at step $k$ exactly when it has no predecessor in $G_k$. In an incomplete step the greedy schedule executes *every* ready task. Suppose that after such a step $G_{k+1}$ still contained a path with $L_k$ vertices. It is also a path of $G_k$, and a longest one, so its first vertex $v$ has no predecessor in $G_k$ — otherwise the path could be extended backwards — and $v$ was ready at step $k$. Then $v$ was executed at step $k$, contradicting $v \in G_{k+1}$. Hence $L_{k+1} \le L_k - 1$ after every incomplete step, and since $L$ starts at $T_\infty$ and cannot fall below $0$, there are at most $T_\infty$ incomplete steps.

Adding, $T_p \le T_1/p + T_\infty$. For the factor of two: any schedule, optimal or not, satisfies $T_p^* \ge \max(T_1/p, T_\infty)$ by [[#thm-laws]], and $T_1/p + T_\infty \le 2 \max(T_1/p, T_\infty) \le 2T_p^*$.
:::

Richard Brent (1974) proved the closely related bound for **level-by-level** schedules: group the tasks into levels by their depth (level $i$ holds the $w_i$ tasks whose longest path from a source has $i$ vertices), and execute each level in $\lceil w_i / p \rceil$ steps. Since $\sum_i w_i = T_1$ and there are $T_\infty$ levels,

$$
T_p \le \sum_{i=1}^{T_\infty} \left\lceil \frac{w_i}{p} \right\rceil \le \sum_{i=1}^{T_\infty} \left( \frac{w_i}{p} + 1 \right) = \frac{T_1}{p} + T_\infty.
$$

The level-by-level form is how Brent's theorem is usually applied to PRAM algorithms ([[parallel-computing/parallel-algorithms]]): design an algorithm with many processors and small depth, then simulate it on fewer processors at the cost of the $T_1/p$ term. The greedy form, due in essence to Ronald Graham's analysis of list scheduling (1966, 1969), is what dynamic task schedulers achieve.

[[#thm-brent]] has a clear practical meaning. If the parallelism $T_1/T_\infty$ is much larger than $p$ — say ten times — then the $T_\infty$ term is small compared with $T_1/p$, and $T_p \approx T_1/p$: **linear speed-up**. So the programmer's job is to expose parallelism well beyond the number of processors (this is called **parallel slackness**), and the scheduler's job is to be greedy, or nearly so, cheaply. The work-stealing schedulers of Cilk, TBB, Java's fork/join pool and Rust's Rayon achieve $T_1/p + O(T_\infty)$ in expectation without any central queue ([[parallel-computing/shared-memory]]).

::: example Testing Brent's bound by simulation {#ex-greedy-sim}
Generate $2000$ random DAGs of up to $60$ unit tasks, schedule each greedily on $p = 1, 2, 3, 4, 8$ processors, and check both [[#thm-laws]] and [[#thm-brent]].
::: solution
Number the tasks $0, \dots, n - 1$ and only add edges $u \to v$ with $u < v$; then the numbering is a topological order and the graph is acyclic.

```python
import random

def greedy(succ, n, p):
    """Unit-time tasks 0..n-1 with edges u -> v in succ; greedy p-processor schedule."""
    indeg = [0] * n
    for u in range(n):
        for v in succ[u]:
            indeg[v] += 1
    ready = [u for u in range(n) if indeg[u] == 0]
    steps = 0
    while ready:
        run, ready = ready[:p], ready[p:]     # run any p ready tasks (or all, if fewer)
        steps += 1
        for u in run:
            for v in succ[u]:
                indeg[v] -= 1
                if indeg[v] == 0:
                    ready.append(v)
    return steps

def span(succ, n):                            # longest path, counted in vertices
    depth = [1] * n                           # vertices are numbered in topological order
    for u in range(n):
        for v in succ[u]:
            depth[v] = max(depth[v], depth[u] + 1)
    return max(depth)

rng = random.Random(1)
worst = 0
for trial in range(2000):
    n = rng.randint(1, 60)
    succ = [[v for v in range(u + 1, n) if rng.random() < 0.08] for u in range(n)]
    T1, Tinf = n, span(succ, n)
    for p in (1, 2, 3, 4, 8):
        Tp = greedy(succ, n, p)
        assert max(T1 / p, Tinf) <= Tp <= T1 / p + Tinf
        worst = max(worst, Tp / max(T1 / p, Tinf))
print("all bounds hold; worst ratio to the lower bound:", round(worst, 3))
```

```console
$ python3 greedy.py
all bounds hold; worst ratio to the lower bound: 1.6
```

Tasks that become ready during a step are appended to the list and can run only at the next step, as the model requires. No assertion failed, and the greedy schedule was never more than $1.6$ times the lower bound $\max(T_1/p, T_\infty)$ on these DAGs, within the factor $2$ that the theorem guarantees. A simulation is evidence, not proof; the proof is [[#thm-brent]].
:::
:::

::: example Parallel recursive Fibonacci {#ex-fib}
The textbook example of task parallelism computes the Fibonacci numbers by spawning the two recursive calls: `fib(n) = spawn fib(n-1); fib(n-2); sync; add`. Find the work and span, and the parallelism for $n = 30$.
::: solution
Counting each call's own constant work as $\Theta(1)$, the work satisfies $T_1(n) = T_1(n - 1) + T_1(n - 2) + \Theta(1)$, the recurrence of the Fibonacci numbers themselves, so $T_1(n) = \Theta(\varphi^n)$ with $\varphi = (1 + \sqrt{5})/2$. The two calls run in parallel, so the span is the longer of the two plus a constant: $T_\infty(n) = \max(T_\infty(n - 1), T_\infty(n - 2)) + \Theta(1) = T_\infty(n - 1) + \Theta(1) = \Theta(n)$. The parallelism is $\Theta(\varphi^n / n)$, enormous: with unit costs per call, $T_1(30) = 2\,\mathrm{fib}(31) - 1 = 2{,}692{,}537$ calls and $T_\infty(30) = 30$ levels, a parallelism of about $90{,}000$. Brent's theorem then promises linear speed-up on any realistic machine. But each task does almost nothing, so in practice the cost of spawning dominates; real programs stop spawning below a **cutoff** size and recurse sequentially, which [[parallel-computing/shared-memory]] measures.
:::
:::

### Overhead and isoefficiency

The work–span model counts only useful operations. Real parallel programs also spend time communicating, synchronising and waiting, and this overhead usually grows with $p$. Grama, Gupta and Kumar (1993) made this precise.

::: definition Overhead and isoefficiency {#def-isoefficiency}
The **total overhead** of a parallel program is $T_o = p\,T_p - T_1$, the processor time spent on anything other than the sequential algorithm's work. Its efficiency is then

$$
E = \frac{T_1}{p\,T_p} = \frac{1}{1 + T_o/T_1}.
$$ {#eq-efficiency}

Efficiency stays constant as $p$ grows if and only if $T_1$ grows in proportion to $T_o$. The **isoefficiency function** of a parallel system is the rate at which the problem size must grow with $p$ to keep $E$ fixed; the slower it grows, the more scalable the system.
:::

For example, adding $n$ numbers on $p$ processors by summing $n/p$ locally and combining the partial sums in a tree of $\log p$ rounds, each costing one addition and one message (cost $c$), takes $T_p \approx n/p + c\log p$, so $T_o \approx c\,p\log p$. Keeping $E$ fixed requires $n = \Theta(p \log p)$: doubling the processors needs a little more than double the data. An algorithm with $T_o = \Theta(p^2)$ would need the data to grow quadratically — it scales far worse.

::: quiz
A program has work $T_1 = 10^9$ operations and span $T_\infty = 10^6$. Which statements are guaranteed?
- [x] No schedule on any number of processors finishes in fewer than $10^6$ steps.
- [x] A greedy schedule on $100$ processors finishes within $1.1 \times 10^7$ steps, so its speed-up is at least about $91$.
- [ ] A greedy schedule on $10^4$ processors achieves speed-up $10^4$.
- [ ] The speed-up on $2000$ processors can be $2000$ if the scheduler is clever enough.
::: solution
The span law gives $T_p \ge 10^6$ on any machine. Brent's theorem gives $T_{100} \le 10^9/100 + 10^6 = 1.1 \times 10^7$, a speed-up of at least $10^9/(1.1 \times 10^7) \approx 91$. On $10^4$ processors it gives $T_p \le 10^5 + 10^6$, speed-up at least about $909$; and the span law caps any speed-up at the parallelism $T_1/T_\infty = 1000$, so neither $10^4$ nor $2000$ is achievable by any scheduler.
:::
:::

## The roofline model

The work–span model treats every operation as costing one unit of time. On real machines, as [[parallel-computing/parallel-architectures]] showed, many programs are limited not by how fast processors compute but by how fast memory delivers data. Samuel Williams, Andrew Waterman and David Patterson (2009) captured both limits in one picture.

::: definition Arithmetic intensity and the roofline {#def-roofline}
The **arithmetic intensity** $I$ of a computation is the number of floating-point operations it performs per byte moved between the processor and memory (DRAM, unless another level is specified). For a machine with peak floating-point rate $\pi$ (flop/s) and peak memory bandwidth $\beta$ (bytes/s), the **roofline** bound on the attainable performance is

$$
P(I) = \min(\pi,\ I \beta).
$$ {#eq-roofline}

The **ridge point** $I^* = \pi/\beta$ separates **memory-bound** computations ($I < I^*$) from **compute-bound** ones ($I > I^*$).
:::

::: proposition The roofline is an upper bound {#prop-roofline}
A computation that performs $W$ floating-point operations and moves $Q$ bytes to and from memory, on a machine whose processors execute at most $\pi$ flop/s and whose memory transfers at most $\beta$ bytes/s, takes time $T \ge \max(W/\pi,\ Q/\beta)$, and therefore achieves at most $W/T \le \min(\pi, I\beta)$ with $I = W/Q$.
:::

::: proof
The arithmetic alone needs at least $W/\pi$ seconds and the data transfers alone need at least $Q/\beta$ seconds, whether or not they overlap, so $T$ is at least the larger of the two. Then $W/T \le W/(W/\pi) = \pi$ and $W/T \le W/(Q/\beta) = (W/Q)\beta = I\beta$.
:::

On a log–log plot $P(I)$ looks like a roof: a sloping line $I\beta$ (the bandwidth roof) meeting a flat line $\pi$ (the compute roof) at the ridge. Plotting a kernel's measured performance at its arithmetic intensity shows at once which roof limits it and how far below the roof it is — and therefore whether to optimise memory traffic or arithmetic. Additional ceilings (without vectorisation, without fused multiply–add, from the L2 or L3 cache instead of DRAM) refine the picture; [[parallel-computing/performance-engineering]] measures them.

::: example Three kernels on the 36-core machine {#ex-roofline}
Take $\pi = 1325$ Gflop/s (the double-precision peak computed in [[parallel-computing/parallel-architectures#ex-peak]]) and $\beta = 52$ GB/s (the bandwidth measured in that chapter's opening experiment). Locate the ridge point, and bound the performance of (a) the dot product $\sum_i x_i y_i$, (b) the "triad" $a_i \gets b_i + s c_i$, and (c) multiplication of two $n \times n$ matrices with $n = 2000$, assuming each matrix is read or written from memory exactly once.
::: solution
The ridge is at $I^* = 1325/52 \approx 25$ flop/byte.

(a) Each term costs two operations (a multiply and an add) and $16$ bytes (two `double`s): $I = 1/8$. Then $P \le 52/8 = 6.5$ Gflop/s — under $0.5\%$ of peak. Memory-bound.

(b) Two operations per element; it reads $b_i$ and $c_i$ and writes $a_i$, $24$ bytes, plus another $8$ because a write-allocate cache first reads the line of $a$ it is about to overwrite ([[computer-systems/memory-hierarchy]]): $I = 2/32 = 1/16$, $P \le 3.25$ Gflop/s. Memory-bound.

(c) $W = 2n^3 = 1.6 \times 10^{10}$ operations; $Q = 3 \times 8n^2 = 9.6 \times 10^7$ bytes; $I = n/12 \approx 167$. Since $I > I^*$, $P \le \pi = 1325$ Gflop/s. Compute-bound — but only if the algorithm really achieves this reuse, which requires **blocking** for the caches; a naïve triple loop reads $B$ from memory over and over, and its effective intensity is far lower ([[parallel-computing/performance-engineering]]).
:::
:::

::: widget plot
f: min(log2(P), x + log2(B))
x: -5, 10
y: 0, 12
sliders: P=1325:50:2000:25; B=52:10:200:2
labels: \log_2 \text{attainable Gflop/s}
points: -3,2.70; -4,1.70; 7.38,10.37
caption: The roofline $\min(\pi, I\beta)$ on logarithmic axes: the horizontal axis is $\log_2$ of the arithmetic intensity $I$ (flop/byte) and the vertical axis $\log_2$ of the attainable rate in Gflop/s, for peak $\pi = P$ Gflop/s and bandwidth $\beta = B$ GB/s. The dots are the bounds of [[#ex-roofline]]: dot product ($I = 1/8$), triad ($1/16$), and blocked matrix multiplication ($I \approx 167$). Raise $B$ to $136$ (the theoretical bandwidth of the machine) and watch the ridge move left from $\log_2 25 \approx 4.7$: more bandwidth turns more kernels compute-bound. Note that the two memory-bound kernels sit on the slope however much $P$ grows.
:::

::: warning Speed-up is not performance
A program with perfect speed-up can still be slow, and a program with poor speed-up can be fast. The easiest way to get linear speed-up is to start from an inefficient sequential program: if every thread wastes time on the same overhead, the waste parallelises beautifully. Always compare against a good sequential baseline (absolute speed-up, [[#def-speedup]]), and report absolute performance — time, or flop/s against the roofline — alongside speed-up. Conversely, a memory-bound kernel that stops scaling at $8$ cores may already be running at the bandwidth roof, where no amount of parallel cleverness helps; only reducing memory traffic does.
:::

::: history
Gene Amdahl's argument appeared in "Validity of the single processor approach to achieving large scale computing capabilities", a four-page paper in the AFIPS Spring Joint Computer Conference proceedings of 1967; the formula usually attributed to him is a reconstruction, since the paper contains no equation. John Gustafson's "Reevaluating Amdahl's law" (*Communications of the ACM*, 1988) reported scaled speed-ups of over $1000$ on a $1024$-processor nCUBE hypercube at Sandia National Laboratories, winning the first Gordon Bell Prize; Edwin Barsis is credited with the scaled-speed-up formula. Ronald Graham analysed list scheduling, the greedy strategy, in 1966 and 1969, and Richard Brent proved his bound on simulating a parallel evaluation with fewer processors in "The parallel evaluation of general arithmetic expressions" (*Journal of the ACM*, 1974). The work–span vocabulary was popularised by the Cilk project at MIT (Robert Blumofe, Charles Leiserson and others, from 1995), whose work-stealing scheduler provably achieves $T_1/p + O(T_\infty)$ expected time (Blumofe and Leiserson, 1999). Alan Karp and Horace Flatt published their metric in 1990, and Ananth Grama, Anshul Gupta and Vipin Kumar the isoefficiency function in 1993. Samuel Williams, Andrew Waterman and David Patterson introduced the roofline model in *Communications of the ACM* in 2009.
:::

## Where this leads

The laws of this chapter are used in every later one. [[parallel-computing/shared-memory]] writes OpenMP and task-parallel programs and measures how close they come to Brent's bound, and explains the work-stealing schedulers that achieve it. [[parallel-computing/parallel-algorithms]] designs algorithms for sums, prefix sums, sorting and graphs with small span and optimal work, so that their parallelism is large. [[parallel-computing/message-passing]] adds communication costs to the model with the α–β model, and [[parallel-computing/performance-engineering]] measures real rooflines and uses them to decide what to optimise.

::: summary
- **Speed-up** $T_1/T_p$ and **efficiency** $S/p$ ([[#def-speedup]]); report absolute speed-up against the best sequential program, and distinguish **strong scaling** (fixed problem) from **weak scaling** (fixed work per processor).
- **Amdahl's law**: a serial fraction $f$ caps speed-up at $1/f$ ([[#thm-amdahl]]); it predicted our measured speed-ups to within $3\%$ up to $16$ threads ([[#ex-amdahl]]). **Gustafson's law**: if the problem grows with the machine, scaled speed-up is $p - s(p-1)$ ([[#thm-gustafson]]). They differ only in what is held fixed.
- The **Karp–Flatt metric** recovers a serial fraction from measurements; if it grows with $p$, overhead rather than serial code limits scaling ([[#def-karp-flatt]]).
- In the **work–span model** ([[#def-work-span]]), $T_p \ge \max(T_1/p, T_\infty)$ for every schedule ([[#thm-laws]]), and every greedy schedule achieves $T_p \le T_1/p + T_\infty$ (**Brent's theorem**, [[#thm-brent]]), within a factor $2$ of optimal. Linear speed-up follows when the parallelism $T_1/T_\infty$ greatly exceeds $p$.
- Overhead $T_o = pT_p - T_1$ determines efficiency; the **isoefficiency** function says how fast the problem must grow to keep efficiency constant ([[#def-isoefficiency]]).
- The **roofline** $\min(\pi, I\beta)$ bounds performance by peak arithmetic and memory bandwidth ([[#prop-roofline]]); kernels with arithmetic intensity below the ridge $\pi/\beta$ are memory-bound — on our machine, below about $25$ flop/byte.
:::


## Exercises

::: exercise Amdahl's limit {level=1 check="20"}
A program spends $5\%$ of its sequential running time in code that cannot be parallelised. What is the largest speed-up it can achieve on any number of processors? (Enter the speed-up.) What does it achieve on $36$ processors?
::: solution
By [[#thm-amdahl]] the limit is $1/f = 1/0.05 = 20$. On $36$ processors, $S = 1/(0.05 + 0.95/36) = 1/0.07639 \approx 13.1$, an efficiency of only $36\%$.
:::
:::

::: exercise Gustafson's scaled speed-up {level=1 check="62.488"}
A program running on $64$ processors spends $2.4\%$ of its running time in sequential code and the rest keeping all processors busy. What is its scaled speed-up? (Enter the number.)
::: solution
By [[#eq-gustafson]], $S = s + p(1 - s) = 0.024 + 64 \times 0.976 = 0.024 + 62.464 = 62.488$, an efficiency of $97.6\%$. The same program run on a problem small enough for one processor to finish in the same time would show a far lower speed-up.
:::
:::

::: exercise The Karp–Flatt metric {level=1 check="1/28"}
A program achieves a speed-up of $6.4$ on $8$ processors. Compute its experimentally determined serial fraction $e$. (Enter $e$ as a fraction or decimal.) If the speed-up on $16$ processors is $9.0$, has the serial fraction stayed the same?
::: solution
By [[#eq-karp-flatt]], $e = (1/6.4 - 1/8)/(1 - 1/8) = (0.15625 - 0.125)/0.875 = 0.03125/0.875 = 1/28 \approx 0.0357$. On $16$ processors, $e = (1/9 - 1/16)/(15/16) = 0.04861/0.9375 \approx 0.0519$. The metric has grown, so the loss of efficiency is not explained by a fixed serial part: some overhead grows with $p$ (communication, synchronisation, load imbalance).
:::
:::

::: exercise Work law or span law? {level=1 check="3"}
A computation DAG has work $T_1 = 12$ and span $T_\infty = 4$. What is the smallest number of processors $p$ for which the span law's lower bound is at least the work law's? (Enter $p$.) What upper bound does Brent's theorem give for $T_3$?
::: solution
The work law gives $T_p \ge 12/p$ and the span law $T_p \ge 4$; $4 \ge 12/p$ exactly when $p \ge 3$, so $p = 3$. Brent's theorem gives $T_3 \le 12/3 + 4 = 8$, so a greedy schedule on three processors takes between $4$ and $8$ steps. Adding processors beyond $3$ cannot bring the lower bound below $4$, since the parallelism is $T_1/T_\infty = 3$.
:::
:::

::: exercise How serial can a program be? {level=2 check="1/175"}
You want a speed-up of $30$ on $36$ processors. What is the largest serial fraction $f$ that Amdahl's law allows? (Enter $f$.)
::: solution
Solve $1/(f + (1 - f)/36) = 30$: $f + (1 - f)/36 = 1/30$. Multiplying by $36$: $36f + 1 - f = 1.2$, so $35f = 0.2$ and $f = 0.2/35 = 1/175 \approx 0.0057$. Less than $0.6\%$ of the sequential running time may be serial — which is why scaling to many processors needs every phase of a program parallelised, including input, output and initialisation.
:::
:::

::: exercise Parallelism of a tree sum {level=2 check="(2^20 - 1)/20"}
The sum of $n = 2^{20}$ numbers is computed by a balanced binary tree of additions: $n/2$ additions of pairs of inputs, then $n/4$ additions of pairs of those results, and so on. Count each addition as a unit task. What is the parallelism $T_1/T_\infty$? (Enter it.) Using Brent's theorem, how many processors can be used with an efficiency guaranteed to be at least $1/2$?
::: solution
There are $n/2 + n/4 + \dots + 1 = n - 1$ additions, so $T_1 = 2^{20} - 1$; the tree has $\log n = 20$ levels, each depending on the one before, so $T_\infty = 20$. The parallelism is $(2^{20} - 1)/20 \approx 52{,}429$. By [[#thm-brent]], $T_p \le T_1/p + T_\infty$, so the efficiency $T_1/(pT_p) \ge T_1/(T_1 + pT_\infty)$, which is at least $1/2$ when $pT_\infty \le T_1$, that is $p \le T_1/T_\infty \approx 52{,}429$. Efficiency $1/2$ is guaranteed for up to the parallelism itself; for efficiency $0.9$ one needs $p \le T_1/(9T_\infty)$, about $5800$.
:::
:::

::: exercise Sparse matrix–vector product on the roofline {level=2 check="25/6"}
A machine has peak $\pi = 200$ Gflop/s and memory bandwidth $\beta = 25$ GB/s. A sparse matrix–vector product in compressed sparse row form performs, for each nonzero, one multiply and one add, and reads an $8$-byte value and a $4$-byte column index; ignore all other traffic. What is the roofline bound in Gflop/s? (Enter it.) Is the kernel compute-bound or memory-bound?
::: solution
$I = 2/12 = 1/6$ flop/byte, far below the ridge $\pi/\beta = 8$. By [[#eq-roofline]], $P \le \min(200, 25/6) = 25/6 \approx 4.17$ Gflop/s: memory-bound, at about $2\%$ of peak. The traffic we ignored (the input vector, row pointers, the output) only lowers $I$ further. To speed it up, reduce the bytes per nonzero — $32$-bit values, compressed indices, blocking several nonzeros per index — not the arithmetic.
:::
:::

::: exercise Amdahl and Gustafson are one law {level=3}
A program runs on $p$ processors for time $T_p$, a fraction $s$ of it sequential and the rest perfectly parallel. Let $f$ be the serial fraction of the *same* work executed on one processor. Prove that $f = s/(s + p(1 - s))$, and that substituting this $f$ into Amdahl's formula [[#eq-amdahl]] gives Gustafson's formula [[#eq-gustafson]].
::: solution
Normalise $T_p = 1$. The sequential part takes $s$ on both machines; the parallel part represents $p(1 - s)$ processor-time units, which one processor takes $p(1 - s)$ to execute. So $T_1 = s + p(1 - s)$, and the sequential fraction of $T_1$ is $f = s/(s + p(1 - s))$. Then $1 - f = p(1 - s)/(s + p(1 - s))$ and

$$
f + \frac{1 - f}{p} = \frac{s + (1 - s)}{s + p(1 - s)} = \frac{1}{s + p(1 - s)},
$$

so Amdahl's $S(p) = 1/(f + (1 - f)/p) = s + p(1 - s)$, which is Gustafson's formula. The two laws compute the same ratio $T_1/T_p$; they disagree only when one of $f$ and $s$ is wrongly assumed to stay constant as $p$ changes. Under weak scaling $s$ stays roughly constant and $f$ falls with $p$; under strong scaling $f$ is constant and $s$ rises.
:::
:::

::: exercise Parallelising the generator {#ex-lcg-jump level=3}
The serial phase of the opening program computes $s_{i+1} = (a s_i + c) \bmod 2^{64}$. Show that $s_{i+k} = (A_k s_i + C_k) \bmod 2^{64}$ with $A_k = a^k$ and $C_k = c(a^{k-1} + \dots + a + 1)$, and that $(A_k, C_k)$ can be computed in $O(\log k)$ multiplications. Use this to parallelise the generator with OpenMP so that every thread fills its own block of the array with exactly the values the sequential loop would produce. Measure it.
::: solution
By induction on $k$: $s_{i+1} = a s_i + c$ gives $k = 1$, and if $s_{i+k} = a^k s_i + c\sum_{j<k} a^j$ then $s_{i+k+1} = a^{k+1} s_i + c\sum_{j<k} a^{j+1} + c = a^{k+1}s_i + c\sum_{j<k+1} a^j$. All arithmetic is in the ring $\Z/2^{64}\Z$, where C's unsigned arithmetic works automatically. The map $\phi(s) = as + c$ composed with itself is $\phi^2(s) = a^2 s + c(a + 1)$, so the pair $(a, c)$ for $2^j$ steps can be squared into the pair for $2^{j+1}$ steps; combining the pairs for the binary digits of $k$, as in fast exponentiation, gives $(A_k, C_k)$ in $O(\log k)$ steps. (The maps all commute, being powers of $\phi$, so the order of combination does not matter.)

```c
/* State after k steps from s: s_k = a^k s + c (a^(k-1) + ... + 1), all mod 2^64.
   Repeated squaring composes the map s -> a s + c with itself in O(log k) steps. */
static unsigned long jump(unsigned long s, unsigned long k) {
    unsigned long a = A, c = C, ra = 1, rc = 0;   /* (ra, rc): the map applied so far */
    while (k) {
        if (k & 1) { ra = ra * a; rc = rc * a + c; }   /* append the map (a, c) */
        c = c * (a + 1); a = a * a;                    /* (a, c) composed with itself */
        k >>= 1;
    }
    return ra * s + rc;
}
...
    #pragma omp parallel
    {
        int t = omp_get_thread_num(), p = omp_get_num_threads();
        long lo = N * (long)t / p, hi = N * (long)(t + 1) / p;
        unsigned long s = jump(1, lo);           /* the state before element lo */
        for (long i = lo; i < hi; i++) {
            s = s * A + C;
            x[i] = (double)(s >> 11) / 9007199254740992.0;
        }
    }
```

Here `A` and `C` are the constants of the opening program. On the machine of this chapter (an observation, as of 2026):

```console
$ for p in 1 4 16 32; do OMP_NUM_THREADS=$p ./lcgjump; done
p= 1  generate 0.123 s  (mean 0.500001, x[N-1] = 0.47941415399107057)
p= 4  generate 0.033 s  (mean 0.500001, x[N-1] = 0.47941415399107057)
p=16  generate 0.011 s  (mean 0.500001, x[N-1] = 0.47941415399107057)
p=32  generate 0.013 s  (mean 0.500001, x[N-1] = 0.47941415399107057)
```

The last element agrees with the sequential program's, so the values are identical. The generator now scales until it is limited by writing $160$ MB to memory; with both phases parallel, Amdahl's limit of $9.9$ for the whole program is gone. The same jump-ahead idea is how parallel random-number libraries give each thread an independent, reproducible stream.
:::
:::

::: exercise Greedy can be nearly twice optimal {level=3}
Show that the factor $2$ in [[#thm-brent]] cannot be improved much: for every $p \ge 2$ and every $L$ divisible by $p$, construct a DAG and a greedy schedule on $p$ processors that takes $(2 - 1/p)L$ steps, while an optimal schedule takes $L$ steps.
::: solution
Take a chain of $L$ unit tasks $c_1 \to c_2 \to \dots \to c_L$ together with $(p - 1)L$ independent unit tasks. Then $T_1 = pL$ and $T_\infty = L$.

*Optimal schedule:* at each step $i = 1, \dots, L$, run $c_i$ and $p - 1$ of the independent tasks. This takes $L$ steps, which equals both lower bounds $T_1/p$ and $T_\infty$.

*Bad greedy schedule:* while at least $p$ independent tasks remain, run $p$ of them and leave $c_1$ waiting — this is greedy, since $p$ tasks run in every such step. The $(p - 1)L$ independent tasks take $(p - 1)L/p$ steps (an integer because $p$ divides $L$). Then only the chain remains, and it needs $L$ more steps, one task each (these steps are incomplete, but greedy: only one task is ready). Total: $(p - 1)L/p + L = (2 - 1/p)L$ steps, a ratio of $2 - 1/p$ to the optimum. Brent's bound $T_1/p + T_\infty = 2L$ is thus within $L/p$ of the worst greedy behaviour. Practical schedulers reduce the risk by preferring tasks on long paths (critical-path scheduling) when the DAG is known in advance, which it rarely is.
:::
:::
