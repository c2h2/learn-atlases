On the test machine for this course, `ps` lists about five thousand threads while the processor has 36 cores. At any instant at most 36 of them run; the rest are waiting — most for input, a disk, a timer or a lock, and a few simply for their turn. Every few milliseconds, and every time a running thread blocks, the kernel must answer one question: *which runnable thread should run next on this core?* The answer decides whether a text editor responds to a key press in a millisecond or a second, whether a long computation finishes tonight or tomorrow, and whether a misbehaving program can starve the rest.

This chapter studies that question. We first look at the process from the kernel's side — the data structure that represents it, the states it moves through, and the **context switch** that moves the processor from one process to another, whose cost we measure. Then we define what a good schedule is and study the classic policies: first-come first-served, shortest job first and its preemptive form, round robin, the multilevel feedback queue, proportional share, and the fair schedulers of Linux. Along the way we prove that shortest job first is optimal for average turnaround time and see why that optimality is of limited use in practice.

[[computer-systems/exceptions-processes]] introduced processes from the programmer's side ([[computer-systems/exceptions-processes#def-process]]) together with `fork`, `execve` and `waitpid`; [[operating-systems/os-structure]] showed that the timer interrupt is what lets the kernel take the processor back. We build on both. Throughout this chapter "process" can be read as "thread": Linux schedules threads (each thread of a process is a separate schedulable task), and the policies are the same. Threads themselves are the subject of [[operating-systems/threads-locks]].

## The process from the kernel's side

For every process, the kernel keeps a record of everything it needs to stop the process and later resume it as if nothing had happened.

::: definition Process control block {#def-pcb}
A **process control block** (PCB) is the kernel's record of a process. It contains at least: the process identifier (PID) and its parent; the **state** of the process; the saved **register context** (program counter, stack pointer, general-purpose registers, flags) while the process is not running; the description of its **address space** (a pointer to its page tables and memory regions); its open-file table; credentials (user and group IDs); scheduling information (priority, accumulated CPU time, the queue it is on); and accounting and signal state. In Linux the PCB is `struct task_struct`, one per thread, several kilobytes in size.
:::

A process moves between a small number of states.

::: definition Process states {#def-states}
- **Ready** (runnable): the process could run and is waiting for a processor.
- **Running**: it is executing on a processor.
- **Blocked** (waiting, sleeping): it cannot run until some event occurs — I/O completes, a timer expires, a lock is released, a child exits.
- **New** and **terminated** (zombie): being created, or finished but not yet reaped by its parent ([[computer-systems/exceptions-processes]]).

The transitions are: *dispatch* (ready → running), *preemption* or *yield* (running → ready), *block* (running → blocked, by a system call that must wait), *wake-up* (blocked → ready, when the event occurs, usually in an interrupt handler), and *exit* (running → terminated).
:::

::: widget graph
nodes: new@0,1; ready@1.5,1; running@3,1; blocked@2.25,0; zombie@4.5,1
edges: new>ready; ready>running; running>ready; running>blocked; blocked>ready; running>zombie
algorithm: dfs
start: new
caption: The process state diagram of [[#def-states]]. Step through the depth-first search from `new` and notice two things. First, the only way into `running` is from `ready`: a blocked process that is woken does not run at once, it becomes ready and waits to be chosen. Second, the `running → ready` arrow is the scheduler's lever — a **preemptive** scheduler uses the timer interrupt to force it; a **non-preemptive** one waits for the process to block or yield.
:::

Linux's `ps` shows these states as single letters: `R` (running or ready — Linux does not distinguish them in the state field), `S` (sleeping, interruptible by signals), `D` (uninterruptible sleep, usually waiting for disk I/O), `T` (stopped) and `Z` (zombie). The kernel keeps ready tasks in a **run queue** per core and blocked ones on **wait queues**, one per event they might wait for.

### The context switch

::: definition Context switch {#def-context-switch}
A **context switch** is the kernel's transfer of a processor from one process (or thread) to another. It happens inside the kernel, in the context of the old process: (1) the old process's user registers have already been saved on its kernel stack when it entered the kernel (by system call, fault or interrupt); (2) the scheduler chooses the next process; (3) the kernel saves the old process's *kernel* stack pointer and callee-saved registers in its PCB and loads those of the new one — so that execution continues on the new process's kernel stack, at the point where *it* last called the scheduler; (4) if the new process has a different address space, the kernel loads its page-table root (`%cr3` on x86-64); (5) the new process returns from the kernel to user mode, restoring its user registers.
:::

Step (3) is the clever part. Every process that is not running is, from the kernel's point of view, suspended inside the scheduler function, on its own kernel stack. Switching is just switching stacks: the call to the low-level switch routine (`switch_to` in Linux) is made by one process and returns in another. The direct cost is small — saving and restoring a few dozen registers. The indirect costs are larger: the new process finds the caches and the TLB full of the old process's data ([[computer-systems/memory-hierarchy]]), and on processors without process-context identifiers (PCIDs) the TLB must be flushed when `%cr3` changes ([[operating-systems/address-spaces-paging]]).

::: example Measuring a context switch {#ex-pingpong}
Two processes, pinned to the same core, pass a byte back and forth through two pipes 200,000 times. Each round trip forces two context switches (each process blocks in `read` until the other writes). Estimate the cost of a switch.

```c
#define _GNU_SOURCE                    /* sched_setaffinity, CPU_SET */
#include <sched.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <time.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    int cpu_b = argc > 1 ? atoi(argv[1]) : 0;   /* child's CPU; parent on CPU 0 */
    enum { N = 200000 };
    int ab[2], ba[2];
    char c = 'x';
    if (pipe(ab) || pipe(ba)) return 1;
    cpu_set_t s;
    CPU_ZERO(&s); CPU_SET(0, &s);
    sched_setaffinity(0, sizeof s, &s);
    if (fork() == 0) {                          /* child: echo every byte back */
        CPU_ZERO(&s); CPU_SET(cpu_b, &s);
        sched_setaffinity(0, sizeof s, &s);
        for (int i = 0; i < N; i++)
            if (read(ab[0], &c, 1) != 1 || write(ba[1], &c, 1) != 1) _exit(1);
        _exit(0);
    }
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (int i = 0; i < N; i++)
        if (write(ab[1], &c, 1) != 1 || read(ba[0], &c, 1) != 1) return 1;
    clock_gettime(CLOCK_MONOTONIC, &t1);
    wait(NULL);
    double ns = ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / N;
    printf("round trip %.0f ns (child on CPU %d)\n", ns, cpu_b);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -o pingpong pingpong.c
$ ./pingpong 0
round trip 6176 ns (child on CPU 0)
$ ./pingpong 1
round trip 7651 ns (child on CPU 1)
```
With both processes on CPU 0, each round trip consists of four system calls (two `write`s and two `read`s) and two context switches. `/usr/bin/time -v` confirms about $200{,}000$ voluntary switches for the parent alone. If the four system calls, with the pipe bookkeeping, cost about $0.5$ µs each — the figure measured in [[operating-systems/os-structure]] for a trivial call — then the two switches cost about $6.2 - 2 = 4.2$ µs, roughly $2$ µs each on this machine (an **observation**; it includes waking the other process and the scheduler's decision, and on newer hardware without the Meltdown workaround it is typically a few hundred nanoseconds to a microsecond). With the processes on different cores there is no switch on the critical path but each wake-up must send an inter-processor interrupt to a core that may be idle and asleep, which here is slower still. Either way, a switch costs thousands of instructions' worth of time, so a scheduler that switched every microsecond would spend all its time switching.
:::
:::

## What makes a schedule good

To compare policies we need a model and some measures. A **job** (or **burst**) is a stretch of computation that a process wants to perform before it next blocks; it has an **arrival time** $a_j$ at which it becomes ready and a **length** (service time) $b_j$. A schedule determines when each job runs; job $j$ **first runs** at $s_j$ and **completes** at $c_j$.

::: definition Scheduling metrics {#def-metrics}
For a job $j$:

- **turnaround time** $T_j = c_j - a_j$, the time from arrival to completion;
- **waiting time** $W_j = T_j - b_j$, the time spent ready but not running;
- **response time** $R_j = s_j - a_j$, the time until it first runs.

For a set of jobs, a scheduler is judged by averages of these, by **throughput** (jobs completed per unit time), by **CPU utilisation** (the fraction of time the processor is busy), by **fairness** (whether each job gets its share), and by worst cases (no job should **starve**, waiting for ever).
:::

The goals conflict. Batch computations care about turnaround and throughput; interactive programs care about response time; a shared server cares about fairness. Every policy below is a position on these trade-offs. Unless stated otherwise we assume one processor, that a context switch is free, and that time is measured in abstract units (think milliseconds).

We use one set of four jobs as a running example:

| job | arrival $a$ | length $b$ |
|---|---|---|
| A | 0 | 6 |
| B | 1 | 3 |
| C | 2 | 8 |
| D | 4 | 2 |

The total work is $19$, so every policy that never idles finishes the last job at time $19$. The numbers in this chapter were computed with a short Python simulator (the last exercise asks you to write one) and checked by hand.

## First come, first served, and shortest job first

The simplest policy runs jobs in order of arrival, each to completion.

::: algorithm First-come first-served (FCFS) {#alg-fcfs}
Keep the ready jobs in a FIFO queue. When the processor is free, remove the job at the head and run it until it completes (or blocks). A newly ready job joins the tail.
:::

On the running example FCFS runs A on $[0, 6)$, B on $[6, 9)$, C on $[9, 17)$ and D on $[17, 19)$. The turnaround times are $6, 8, 15, 15$, average $11$; the waiting times $0, 5, 7, 13$, average $6.25$. Little D, needing only $2$ units, waits $13$ behind the long C.

That is the **convoy effect**: short jobs queued behind a long one, like cars behind a lorry. Its effect can be dramatic. Three jobs arriving together with lengths $20$, $2$ and $2$ have average turnaround $(20 + 22 + 24)/3 = 22$ in that order and $(2 + 4 + 24)/3 = 10$ shortest first. The obvious remedy is to run short jobs first.

::: algorithm Shortest job first (SJF) {#alg-sjf}
When the processor is free, run to completion the ready job with the smallest length $b_j$ (breaking ties by arrival time).
:::

On the running example: at time $0$ only A is ready, so it runs to $6$. At $6$ the ready jobs are B ($3$), C ($8$), D ($2$): D runs on $[6, 8)$, B on $[8, 11)$, C on $[11, 19)$. Turnaround times $6, 10, 17, 4$, average $9.25$.

::: theorem SJF minimises average waiting time {#thm-sjf}
Suppose $n$ jobs all arrive at time $0$ with lengths $b_1, \dots, b_n$, and a schedule runs each job to completion without idling. Among all such schedules, running the jobs in non-decreasing order of length minimises the average waiting time, and hence also the average turnaround time.
:::

::: proof
A non-preemptive schedule without idle time is an ordering $j_1, j_2, \dots, j_n$ of the jobs. Job $j_k$ waits for all jobs before it, so its waiting time is $W_{j_k} = \sum_{i<k} b_{j_i}$, and the total waiting time is

$$
\sum_{k=1}^n W_{j_k} = \sum_{k=1}^{n} (n - k)\, b_{j_k},
$$

since the job in position $k$ delays each of the $n - k$ jobs after it. Suppose some ordering has two adjacent jobs in positions $k$ and $k+1$ with $b_{j_k} > b_{j_{k+1}}$. Exchanging them changes only these two terms: before the exchange they contribute $(n-k) b_{j_k} + (n-k-1) b_{j_{k+1}}$; afterwards, $(n-k) b_{j_{k+1}} + (n-k-1) b_{j_k}$. The difference (before minus after) is $b_{j_k} - b_{j_{k+1}} > 0$, so the exchange strictly reduces the total. Hence an ordering that is not sorted by length can be improved, so an optimal ordering (one exists, since there are finitely many) must be sorted; all sorted orderings have the same total, because exchanging equal lengths changes nothing. Turnaround $T_j = W_j + b_j$, and $\sum_j b_j$ is the same for every schedule, so the same ordering minimises average turnaround.
:::

When jobs arrive at different times, non-preemptive SJF is no longer optimal: in the running example, C and D are stuck behind A because A started before they arrived. Allowing **preemption** fixes that.

::: algorithm Shortest remaining time first (SRTF, also STCF) {#alg-srtf}
Whenever a job arrives or completes, run the ready job with the least *remaining* work, preempting the running job if necessary.
:::

On the running example: A runs on $[0, 1)$; at $1$ B arrives with $3 < 5$ remaining for A, so B runs on $[1, 4)$; at $4$ D arrives with $2$, the least, and runs on $[4, 6)$; then A finishes its $5$ remaining units on $[6, 11)$, and C runs on $[11, 19)$.

| policy | schedule | turnaround A, B, C, D | average turnaround | average response |
|---|---|---|---|---|
| FCFS | A 0–6, B 6–9, C 9–17, D 17–19 | 6, 8, 15, 15 | 11 | 6.25 |
| SJF | A 0–6, D 6–8, B 8–11, C 11–19 | 6, 10, 17, 4 | 9.25 | 4.5 |
| SRTF | A 0–1, B 1–4, D 4–6, A 6–11, C 11–19 | 11, 3, 17, 2 | 8.25 | 2.25 |

SRTF is optimal for average turnaround time on a single processor even with arbitrary arrival times (a result of Linus Schrage, 1968, proved by a more careful exchange argument on units of work). So why does no real system use it?

::: warning Optimal, given information nobody has
SJF and SRTF need the *length of each job in advance*. An operating system does not know how long a process will compute before it next blocks; it can only guess from the past, for example with an exponential average $\tau_{n+1} = \alpha t_n + (1-\alpha)\tau_n$ of measured bursts $t_n$. Guesses fail exactly when it matters (a program changes phase), and a program that is rewarded for short bursts can lie by blocking briefly on purpose. SRTF can also **starve** long jobs: if short jobs keep arriving, a long one never runs. The optimality theorems are still valuable — they tell us that favouring short jobs is right, and give a yardstick — but real schedulers must *learn* which jobs are short, which is what the multilevel feedback queue does.
:::

::: quiz
Three jobs arrive at time $0$ with lengths $5$, $1$ and $3$. Which statements are true?
- [x] SJF runs them in the order 1, 3, 5 and gives average turnaround $(1 + 4 + 9)/3 = 14/3$.
- [ ] FCFS in the given order also gives average turnaround $14/3$.
- [x] No non-preemptive schedule has a smaller average waiting time than SJF here.
- [ ] SRTF gives a smaller average turnaround than SJF here.
::: solution
SJF: completions at $1$, $4$, $9$, average $14/3 \approx 4.67$. FCFS in the order $5, 1, 3$: completions $5$, $6$, $9$, average $20/3$. [[#thm-sjf]] says SJF is optimal when all jobs arrive together. SRTF only differs from SJF when a job arrives while another is running; here all arrive at $0$, so SRTF makes the same schedule and the same average.
:::
:::

## Round robin and response time

FCFS, SJF and SRTF were designed for batch jobs, and their response time is poor: a job may wait a long time before running at all. Interactive systems instead give every ready job a turn.

::: algorithm Round robin (RR) with quantum $q$ {#alg-rr}
Keep the ready jobs in a FIFO queue. Run the job at the head for at most $q$ time units (the **quantum** or **time slice**), enforced by a timer interrupt. If it has not finished or blocked by then, preempt it and put it at the tail of the queue. (Convention used here: a job that arrives at the same moment as a preemption joins the queue *before* the preempted job.)
:::

::: example Round robin on the running example {#ex-rr}
Trace round robin with $q = 2$ on the four jobs A–D and compute the turnaround and response times.
::: solution
A runs $[0, 2)$; meanwhile B arrived at $1$ and C at $2$, so the queue is B, C, A. B runs $[2, 4)$; D arrives at $4$; queue C, A, D, B. Then C $[4, 6)$, A $[6, 8)$, D $[8, 10)$ (done), B $[10, 11)$ (done), C $[11, 13)$, A $[13, 15)$ (done), and C $[15, 19)$. Turnaround times $15, 10, 17, 6$, average $12$; response times $0, 1, 2, 4$, average $1.75$.
:::
:::

| policy | average turnaround | average response |
|---|---|---|
| RR, $q = 1$ | 11.75 | 0.75 |
| RR, $q = 2$ | 12 | 1.75 |
| RR, $q = 4$ | 11.75 | 3.75 |
| SRTF | 8.25 | 2.25 |

Round robin has the best response times and among the worst turnaround times: by sharing the processor it delays *everyone's* completion. With four equal jobs of length $10$ arriving together, FCFS completes them at $10, 20, 30, 40$ (average $25$), while RR with $q = 1$ completes them at $37, 38, 39, 40$ (average $38.5$) — every job finishes almost as late as the last.

::: proposition Response time under round robin {#prop-rr-response}
Suppose $n$ jobs are ready, none blocks, and each context switch costs $s$. Under round robin with quantum $q$, a job waits at most $(n - 1)(q + s)$ between consecutive turns, and the fraction of processor time spent on useful work is at least $q/(q + s)$ while all jobs still need at least a full quantum.
:::

::: proof
Between two turns of a job, each of the other $n - 1$ jobs runs at most once, for at most $q$, and each turn is preceded by one switch costing $s$; hence the bound. While every job needs at least $q$ more, each turn runs a full quantum $q$ and costs one switch $s$, so useful work is $q$ out of every $q + s$.
:::

This is the quantum trade-off. With $s = 2$ µs (as measured in [[#ex-pingpong]]) and $q = 10$ ms, overhead is $0.02\%$ — negligible — but with $100$ ready jobs, a job may wait a second for its turn. A quantum of $10$ µs would give fast turns but waste $17\%$ of the processor on switching, not counting the cache misses each switch causes. Real systems use quanta of roughly 1–100 ms, and — more importantly — rarely have many jobs that are all ready, because interactive processes mostly sleep.

::: widget plot
f: 1 - p^x
x: 1, 20
y: 0, 1
sliders: p=0.8:0.1:0.99:0.01
labels: \text{CPU utilisation } 1 - p^n
points: 4,0.5904; 11,0.9141
caption: Why multiprogramming exists. If each of $n$ processes spends a fraction $p$ of its time blocked on I/O, and the processes block independently, the processor is idle only when all $n$ are blocked at once, with probability $p^n$, so utilisation is $1 - p^n$. With $p = 0.8$, one process keeps the processor busy only $20\%$ of the time, four keep it $59\%$ busy and eleven over $91\%$. Increase $p$ towards $1$ (I/O-bound workloads) to see how many processes are needed — and remember that independence is an idealisation.
:::

## The multilevel feedback queue

We want both: short turnaround for short jobs (as SJF), good response for interactive jobs (as RR), and no starvation — without knowing job lengths. Fernando Corbató's answer, in CTSS in 1962, was to *learn* from behaviour: a job that uses its whole quantum is probably long; a job that blocks quickly is probably interactive.

::: algorithm Multilevel feedback queue (MLFQ) {#alg-mlfq}
Keep $k$ ready queues $Q_0, \dots, Q_{k-1}$, $Q_0$ having the highest priority; queue $Q_i$ has a quantum $q_i$, usually increasing with $i$.

1. If a job is ready in a higher-priority queue than the running job's, it runs first (preempting if necessary).
2. Jobs in the same queue run in round robin.
3. A new job enters $Q_0$.
4. Each job has an **allotment** of CPU time at its level (here: one quantum). Once it has used the allotment — *whether in one turn or several, across any number of blocking calls* — it moves down one queue.
5. Every $S$ time units, move all jobs to $Q_0$ (**priority boost**).
:::

Rule 4 makes MLFQ approximate SRTF: a short job finishes while still in a high queue; a long job sinks to the bottom, where it runs with long quanta (good for its caches) whenever no shorter job is waiting. Interactive jobs that run briefly and block stay near the top and get quick response. Rule 5 prevents starvation — a long job at the bottom is promoted periodically even if short jobs keep arriving — and lets a job that changes from computing to interacting climb back.

::: example Tracing a multilevel feedback queue {#ex-mlfq}
Three queues with quanta $q_0 = 1$, $q_1 = 2$, $q_2 = 4$, no boost. Job A (length $12$) arrives at $0$, B (length $2$) at $3$, C (length $1$) at $5$. Trace MLFQ and compare the turnaround times with FCFS.
::: solution
| time | runs | queue level | event |
|---|---|---|---|
| 0 | A | 0 | A uses its quantum of 1 and drops to $Q_1$ |
| 1–2 | A | 1 | A uses its 2 units and drops to $Q_2$ |
| 3 | B | 0 | B arrives in $Q_0$, outranks A; uses 1 unit, drops to $Q_1$ |
| 4 | B | 1 | B runs its last unit, completes at 5 |
| 5 | C | 0 | C arrives, runs 1 unit, completes at 6 |
| 6–14 | A | 2 | A runs its remaining 9 units in quanta of 4, 4, 1; completes at 15 |

Turnaround: A $15$, B $5 - 3 = 2$, C $6 - 5 = 1$, average $6$. FCFS would run A on $[0, 12)$, B on $[12, 14)$, C on $[14, 15)$: turnaround $12$, $11$, $10$, average $11$. MLFQ, without knowing lengths, gave each short job exactly the turnaround SRTF would, at a cost of $3$ units to A.
:::
:::

Without the careful accounting of rule 4, MLFQ can be gamed: a program that issues a trivial I/O request just before its quantum expires would stay in $Q_0$ for ever while computing $99\%$ of the time. With allotments counted across turns, it sinks like any other long job. Choosing the number of queues, the quanta, the allotments and $S$ is an art — "voodoo constants", in Arpaci-Dusseau's phrase. Variants of MLFQ were the schedulers of BSD Unix, Solaris and Windows NT, which still uses 32 priority levels with dynamic boosts for threads that complete I/O or own the foreground window.

## Proportional share and the Linux schedulers

A different goal is **fairness**: each job should receive a fixed share of the processor, say in proportion to a **weight** set by the administrator. **Lottery scheduling** (Waldspurger and Weihl, 1994) gives each job tickets in proportion to its weight and, at each quantum, draws a random ticket; over time each job's share approaches its proportion. **Stride scheduling** does the same deterministically: each job has a *pass* value that advances by $1/\text{weight}$ every time it runs, and the job with the smallest pass runs next. Linux's schedulers are refinements of stride scheduling.

::: definition Weighted fair share {#def-fair-share}
In a **weighted fair-share** scheduler each runnable task $i$ has a weight $w_i > 0$. Over any interval in which the set $R$ of runnable tasks is fixed, task $i$ should receive the fraction

$$
\frac{w_i}{\sum_{j \in R} w_j}
$$ {#eq-share}

of the processor. Each task's **virtual runtime** is its received CPU time divided by its weight (scaled so that a task of the default weight has virtual time equal to real time); a fair scheduler keeps the virtual runtimes of runnable tasks close together.
:::

The **Completely Fair Scheduler** (CFS), Linux's default from 2007 (kernel 2.6.23) until 2023, implemented this directly: it kept runnable tasks in a red–black tree ordered by virtual runtime and always ran the leftmost — the one that had received the least weighted time. A task that slept and woke was placed near the current minimum, so sleeping did not bank unlimited credit. The weight comes from the task's **nice** value, from $-20$ (highest priority) to $19$: nice $0$ has weight $1024$, and each step multiplies the weight by about $1.25$ (nice $1$ is $820$, nice $5$ is $335$, nice $10$ is $110$, nice $-5$ is $3121$), so that one nice level changes a task's share by about $10\%$ relative to a competitor.

::: example Two spinning processes with different nice values {#ex-nice}
Two CPU-bound programs are pinned to the same core for three seconds, one at nice $0$ and one at nice $5$. What shares do they receive? Compare with a measurement.

```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <time.h>

/* Spin for 3 s of wall-clock time; report CPU time received. */
int main(int argc, char *argv[]) {
    struct timespec w0, w, c;
    clock_gettime(CLOCK_MONOTONIC, &w0);
    do clock_gettime(CLOCK_MONOTONIC, &w);
    while (w.tv_sec - w0.tv_sec < 3);
    clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &c);
    printf("%s: %.2f s of CPU in 3 s\n", argc > 1 ? argv[1] : "?", c.tv_sec + c.tv_nsec * 1e-9);
    return 0;
}
```
::: solution
By [[#eq-share]], the nice-0 task should receive $1024/(1024 + 335) \approx 0.753$ of the core and the nice-5 task $0.247$, a ratio of about $3$ to $1$.

```console
$ gcc -std=c17 -Wall -Wextra -O2 -o spin spin.c
$ taskset -c 33 ./spin nice0 & taskset -c 33 nice -n 5 ./spin nice5 & wait
nice0: 2.25 s of CPU in 3 s
nice5: 0.74 s of CPU in 3 s
```
The shares are $2.25/2.99 = 0.752$ and $0.248$ — within a fraction of a percent of the prediction. (The output order and the exact times vary between runs, and on a busy core other tasks take part of the time: on another core in another run the pair received $1.86$ and $0.61$ s of $3$, the same ratio.) `taskset -c 33` pins a program to core 33, so that the two really compete; without it the scheduler would simply put them on different idle cores, and each would get a whole core regardless of nice.
:::
:::

In Linux 6.6 (October 2023) CFS's selection rule was replaced by **EEVDF**, *earliest eligible virtual deadline first*, an algorithm published by Ion Stoica and Hussein Abdel-Wahab in 1995. Fairness is measured by each task's **lag**: the service it should have received under ideal weighted sharing minus the service it has received. A task is **eligible** if its lag is non-negative (it is owed time). Each task also has a requested **slice** $r$; its **virtual deadline** is its eligible time plus $r/w$. EEVDF runs the eligible task with the earliest virtual deadline. The fair shares are those of [[#eq-share]], as with CFS, but latency now has its own knob: a task with a short slice gets an early deadline and runs sooner, though for shorter turns, without receiving a larger share. As of 2026, EEVDF is the scheduler of Linux's normal (`SCHED_OTHER`) class, with a default base slice of $0.75$ ms scaled up with the logarithm of the number of CPUs (to $3$ ms on machines with eight or more), and since Linux 6.12 (2024) a task may request its own slice with `sched_setattr`. Linux 6.12 also added `sched_ext`, which lets a scheduling policy be loaded as an eBPF program.

Linux also has **real-time** classes: `SCHED_FIFO` and `SCHED_RR` tasks with fixed priorities $1$–$99$ always run before any normal task (the `chrt` command sets them; by default real-time tasks are throttled to $95\%$ of each second so a runaway one cannot lock up the machine — `/proc/sys/kernel/sched_rt_runtime_us` is $950000$ out of a $1000000$ µs period on the test machine), and `SCHED_DEADLINE` schedules tasks by earliest deadline first with admission control.

### Several processors

With many cores, a scheduler must also decide *where* a task runs. A single shared run queue is simple and balances load perfectly, but every scheduling decision locks it, and tasks move between cores and lose their cached data. Linux therefore keeps a run queue per core and **load-balances** periodically and when a core goes idle, preferring to keep a task on the core (or at least the cache and memory node) where it ran before — **cache affinity**. A program can restrict itself to chosen cores with `sched_setaffinity` (as [[#ex-pingpong]] did) or `taskset`. Scheduling cooperating threads of a parallel program at the same time on different cores, **gang scheduling**, is a concern of [[parallel-computing]].

::: history
Early batch systems ran jobs first come, first served. Corbató, Merwin-Daggett and Daley's 1962 paper on CTSS described a multilevel scheduling scheme in which jobs that used their full quantum moved to lower-priority queues with longer quanta — the first multilevel feedback queue, for which Corbató received the 1990 Turing Award, together with his work on time-sharing and Multics. Linus Schrage proved in 1968 that shortest remaining processing time minimises mean completion time on one processor. Leonard Kleinrock's queueing analyses of time-sharing in the 1960s quantified round robin's trade-offs. Carl Waldspurger and William Weihl introduced lottery scheduling in 1994 and stride scheduling in 1995; Stoica and Abdel-Wahab published EEVDF in 1995. Ingo Molnár wrote Linux's O(1) scheduler (2002) and then CFS (2007), inspired by Con Kolivas's fair-scheduling experiments; Peter Zijlstra led the move to EEVDF, merged in Linux 6.6 in 2023.
:::

## Where this leads

The process abstraction has two halves: this chapter virtualised the processor, and [[operating-systems/address-spaces-paging]] virtualises memory. When several threads share an address space, scheduling decisions can interrupt them at any instruction, which is the source of the race conditions of [[operating-systems/threads-locks]]; priority scheduling interacts with locks to cause *priority inversion*, discussed in [[operating-systems/synchronisation]]. Disk-request scheduling, which faces the same trade-off between throughput and fairness, is in [[operating-systems/storage-io]]; scheduling virtual processors on physical ones is in [[operating-systems/virtualisation]]. Queueing theory, which predicts average waiting times from arrival and service distributions, builds on the probability in [Maths Atlas](/learn/maths/); scheduling across machines is part of [[distributed-systems]].

::: summary
- The kernel represents each process (in Linux, each thread) by a **PCB** ([[#def-pcb]]) and moves it between ready, running and blocked ([[#def-states]]); a **context switch** saves the old context and resumes the new one by switching kernel stacks and address spaces ([[#def-context-switch]]), costing microseconds directly and more in cache and TLB misses ([[#ex-pingpong]]).
- Schedules are judged by turnaround, waiting and response time, throughput, utilisation and fairness ([[#def-metrics]]); the goals conflict.
- **FCFS** suffers the convoy effect. **SJF** is optimal for average waiting time when jobs arrive together, by an exchange argument ([[#thm-sjf]]); **SRTF** is optimal with arrivals. Both need job lengths, which the OS does not know, and both can starve long jobs.
- **Round robin** gives good response time and poor turnaround; the quantum trades switching overhead $s/(q+s)$ against waiting $(n-1)(q+s)$ ([[#prop-rr-response]]).
- The **MLFQ** learns job lengths from behaviour: demote jobs that use their allotment, keep interactive jobs high, boost periodically against starvation ([[#alg-mlfq]]).
- **Proportional-share** schedulers give task $i$ the share $w_i/\sum w_j$ ([[#eq-share]]). Linux used CFS (virtual runtime, 2007–2023) and as of 2026 uses EEVDF (lag and virtual deadlines, since 6.6); nice levels change weights by a factor of about $1.25$.
:::

## Exercises

::: exercise FCFS by hand {level=1 check="8.25"}
Jobs P, Q, R, S arrive at times $0, 1, 2, 3$ with lengths $5, 2, 6, 1$. Draw the FCFS schedule and compute the average turnaround time. (Enter the average turnaround.)
::: solution
FCFS runs P on $[0, 5)$, Q on $[5, 7)$, R on $[7, 13)$, S on $[13, 14)$. Turnaround times: P $5 - 0 = 5$, Q $7 - 1 = 6$, R $13 - 2 = 11$, S $14 - 3 = 11$. Average $33/4 = 8.25$. S, needing a single unit, waits $10$.
:::
:::

::: exercise SRTF on the same jobs {level=1 check="5.75"}
For the jobs of the previous exercise, draw the SRTF schedule and compute the average turnaround time. (Enter the average turnaround.)
::: solution
At $0$ only P is ready: it runs. At $1$ Q arrives with $2 < 4$ remaining for P: Q runs on $[1, 3)$ and completes. At $2$ R arrived with $6$; at $3$ S arrives with $1$, the least: S runs on $[3, 4)$. Then P (remaining $4$) runs on $[4, 8)$, and R on $[8, 14)$. Turnaround: P $8$, Q $2$, R $12$, S $1$; average $23/4 = 5.75$. (Non-preemptive SJF gives $6.75$, FCFS $8.25$.)
:::
:::

::: exercise Nice levels {level=1 check="1024/1134"}
Two CPU-bound tasks share a core under a weighted fair scheduler, one at nice $0$ (weight $1024$) and one at nice $10$ (weight $110$). What fraction of the core does the nice-0 task receive? (Enter the fraction.)
::: solution
By [[#eq-share]], $1024/(1024 + 110) = 1024/1134 \approx 0.903$. The nice-10 task gets about $9.7\%$. Ten nice levels multiply the weight ratio by about $1.25^{10} \approx 9.3$.
:::
:::

::: exercise Round robin hurts turnaround {level=2 check="38.5"}
Four jobs of length $10$ arrive together. Compute the average turnaround time under round robin with quantum $1$ (and free context switches), and compare it with FCFS. Then derive a formula for $n$ jobs of length $L$ with quantum $1$. (Enter the average for the four jobs under round robin.)
::: solution
The jobs run in turn A, B, C, D, A, B, …; each needs $10$ turns. After $9$ full rounds ($36$ units) each has $1$ unit left, so they complete at $37, 38, 39, 40$: average $38.5$. FCFS completes them at $10, 20, 30, 40$: average $25$. In general, with $n$ jobs of length $L$, round robin completes job $k$ at $n(L-1) + k$, so the average is $n(L - 1) + (n+1)/2$, against $L(n+1)/2$ for FCFS. For $L$ large, RR's average is about $nL$ — almost twice FCFS's $nL/2$. Sharing equally makes everyone finish late; RR's merit is response time, not turnaround.
:::
:::

::: exercise How much multiprogramming {level=2 check="11"}
Processes spend $80\%$ of their time waiting for I/O, independently. Using utilisation $1 - p^n$, what is the smallest number $n$ of processes that keeps the processor at least $90\%$ busy? (Enter $n$.)
::: solution
We need $0.8^n \le 0.1$, so $n \ge \ln 0.1 / \ln 0.8 = 2.3026/0.2231 \approx 10.32$, hence $n = 11$: $1 - 0.8^{10} = 0.893$ and $1 - 0.8^{11} = 0.914$. The model assumes independent blocking; processes that wait for the same disk block together, and real utilisation is lower.
:::
:::

::: exercise Estimating the switch cost {level=2 check="2.05"}
A ping-pong test like [[#ex-pingpong]] measures $6.1$ µs per round trip on one core. Each round trip makes four system calls, each costing about $0.5$ µs apart from any switch. Estimate the cost of one context switch. (Enter microseconds.)
::: solution
The round trip contains four system calls ($2$ µs) and two context switches. So $2x = 6.1 - 2$, and $x = 2.05$ µs. This is a rough estimate: the "system-call cost" of a pipe `read` that blocks is not the same as that of `getppid`, and the measured time also includes the wake-up of the other process. Tools such as `perf bench sched pipe` perform exactly this measurement.
:::
:::

::: exercise Gaming the scheduler {level=3}
Consider an MLFQ in which, instead of rule 4 as stated, a job is demoted only if it uses an entire quantum *in one turn*, and its count is reset when it blocks. Describe a CPU-bound program that obtains almost all of the processor while other CPU-bound programs are present, and explain precisely how rule 4 as stated defeats it. Can the attack also defeat a CFS-style fair scheduler?
::: solution
The program computes for $q_0 - \epsilon$ — just under the top quantum — and then makes a trivial blocking call (say, a 1-byte read from a pipe that is always ready, or `nanosleep` of a microsecond). It never uses a whole quantum in one turn, so it is never demoted; it stays in $Q_0$, which always runs before the other CPU-bound jobs, which have sunk to lower queues. Each time it becomes ready again it preempts them. It gets a fraction close to $1$ of the processor. Under rule 4 as stated, the scheduler counts the CPU time the job uses at its level *across* turns; after a total of $q_0$ (in however many pieces) it is demoted, then demoted again after $q_1$ at the next level, and so on, exactly like an honest CPU-bound job. A fair-share scheduler is not fooled either, because it does not classify jobs at all: it charges each task for the CPU time it actually used (its virtual runtime grows by that time over its weight) and always prefers the task that has had least, so blocking briefly earns nothing beyond the bounded credit a waking task is given.
:::
:::

::: exercise Smith's rule {level=3}
Jobs arrive at time $0$ with lengths $b_j$ and importance weights $u_j > 0$. Prove that, among non-preemptive schedules without idle time, the weighted sum of completion times $\sum_j u_j c_j$ is minimised by running the jobs in non-decreasing order of $b_j/u_j$ (Smith's rule, 1956). Deduce [[#thm-sjf]] as a special case.
::: solution
A schedule is an order of the jobs. Take two adjacent jobs, $x$ in position $k$ and $y$ in position $k + 1$, and let $t$ be the completion time of the job before them ($t = 0$ if $k = 1$). Before exchanging them, they contribute $u_x(t + b_x) + u_y(t + b_x + b_y)$; after the exchange, $u_y(t + b_y) + u_x(t + b_y + b_x)$. No other completion time changes, because the two jobs together still occupy $[t, t + b_x + b_y)$. The difference (before minus after) is

$$
u_y b_x - u_x b_y = u_x u_y\left(\frac{b_x}{u_x} - \frac{b_y}{u_y}\right),
$$

which is positive exactly when $b_x/u_x > b_y/u_y$. So any order containing an adjacent pair out of order by the ratio $b/u$ can be strictly improved; an optimal order exists (there are finitely many) and therefore has no such pair, so it is sorted by $b_j/u_j$; and orders that differ only among equal ratios have the same sum, since exchanging such a pair changes nothing. With all $u_j = 1$, the order is by length and $\sum_j c_j = \sum_j (W_j + b_j)$, so minimising total completion time is minimising total waiting time: [[#thm-sjf]].
:::
:::

::: exercise A scheduling simulator {level=3}
Write a Python function `rr(jobs, q)` that takes a dictionary `{name: (arrival, length)}` and a quantum, simulates round robin with integer time and the arrival convention of [[#alg-rr]], and returns the completion times. Check it against the trace of the running example with $q = 2$.
::: solution
```python
from collections import deque

def rr(jobs, q):
    remaining = {j: b for j, (a, b) in jobs.items()}
    pending = sorted(jobs, key=lambda j: jobs[j][0])   # not yet arrived
    ready, done, t = deque(), {}, 0
    def admit(now):                                     # move arrivals into the queue
        while pending and jobs[pending[0]][0] <= now:
            ready.append(pending.pop(0))
    admit(t)
    while len(done) < len(jobs):
        if not ready:                                   # idle until next arrival
            t = jobs[pending[0]][0]; admit(t); continue
        j = ready.popleft()
        run = min(q, remaining[j])
        t += run; remaining[j] -= run
        admit(t)                                        # arrivals join before j
        if remaining[j] == 0:
            done[j] = t
        else:
            ready.append(j)
    return done

print(rr({'A': (0, 6), 'B': (1, 3), 'C': (2, 8), 'D': (4, 2)}, 2))
```
```console
$ python3 rr.py
{'D': 10, 'B': 11, 'A': 15, 'C': 19}
```
These are the completion times of the trace in the text (turnaround $15, 10, 17, 6$). Because `admit(t)` runs before the preempted job is re-queued, a job arriving exactly at a preemption goes first, as the convention requires.
:::
:::
