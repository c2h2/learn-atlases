An engine controller computes the fuel injection for each cylinder; if the result arrives after the injection window has passed, it is useless, however accurate. A drone's attitude loop must run every millisecond, a radio driver must answer a packet within a few hundred microseconds, and a user interface must redraw every $50\,\mathrm{ms}$ or so to feel responsive. A **real-time system** is one whose correctness depends not only on the values it computes but also on *when* it produces them. Most embedded systems are real-time systems, and most of them have several activities with different periods and deadlines competing for one processor.

The previous chapters handled timing one interrupt at a time. This chapter treats the whole program. It begins with the simple structures that most small systems use — a main loop with interrupts, and time-triggered cyclic schedules — then introduces the **real-time operating system** (RTOS), which lets the program be written as a set of independent **tasks** that a scheduler switches between by priority. Then comes the central question: given a set of periodic tasks with known execution times, will every one of them always meet its deadline? For fixed priorities the answer is given by the **rate-monotonic** utilisation bound of Liu and Layland and, exactly, by **response-time analysis**. The last part deals with what goes wrong when tasks share data: races, deadlock and **priority inversion**, and the semaphores, mutexes, queues and protocols that prevent them.

Scheduling also appears in general-purpose operating systems, with different goals (throughput and fairness rather than guaranteed deadlines); see [Processes and CPU scheduling](/learn/cs/lesson.php?c=operating-systems&l=processes-scheduling). Here every result is about the worst case.

## Real-time requirements

::: definition Periodic task model {#def-task-model}
A **periodic task** $\tau_i$ is released (becomes ready to run) every $T_i$ time units, its **period**; each release, or **job**, needs at most $C_i$ units of processor time, its **worst-case execution time** (WCET), and must complete within $D_i$ of its release, its **relative deadline** (often $D_i = T_i$). The **response time** of a job is the time from its release to its completion; the **worst-case response time** $R_i$ is the largest over all jobs. The task set is **schedulable** under a scheduling policy if $R_i \le D_i$ for every task. The **utilisation** of the task set is

$$
U = \sum_{i=1}^{n}\frac{C_i}{T_i}.
$$ {#eq-utilisation}
:::

A deadline is **hard** if missing it is a failure of the system (an airbag, a motor commutation, a braking command), **firm** if a late result is worthless but occasional misses are tolerable (a dropped video frame), and **soft** if lateness merely degrades the quality of service (a sluggish display). Hard real-time analysis must use the **worst-case** execution time, not the average, which is why the variable flash timing of [[embedded-systems/microcontrollers#ex-wait-states]] and the interrupt latencies of [[embedded-systems/timers-interrupts#prop-latency]] matter. WCETs are found by measurement under stress (with a margin) or by static analysis tools that model the processor.

Two other quantities matter in control and signal processing. The **release jitter** is the variation in the time at which a task actually starts relative to its nominal period; the **output jitter** is the variation in when it produces its result. A control loop whose sampling instants wander behaves like one with a noisy sampling clock, so control tasks are given high priority or their input and output are latched by hardware timers.

$U \le 1$ is obviously necessary: no scheduler can fit more than $100\,\%$ of the processor's time. The question is what more is needed.

## Program structures without an RTOS

### The superloop

The simplest real-time program is a **superloop**: `main` initialises the hardware and then loops for ever, calling each activity in turn, while interrupt handlers deal with urgent events and set flags or fill buffers for the loop. This **foreground/background** structure is used in a large fraction of all embedded products. Its timing is easy to analyse for the interrupts — they preempt the loop — and poor for everything in the loop: the response time of any loop activity is up to one full loop iteration, the sum of all the activities' execution times, so one slow function (a flash write, a display update) delays everything else.

### The cyclic executive

A more disciplined structure, standard in safety-critical systems, is the **time-triggered cyclic executive**. A timer interrupt starts a **minor cycle** at a fixed rate; in each minor cycle the scheduler runs a fixed, precomputed list of tasks to completion; the pattern repeats every **major cycle**, the least common multiple of the task periods. With periods of $10$, $20$ and $40\,\mathrm{ms}$, the minor cycle is $10\,\mathrm{ms}$ and the major cycle $40\,\mathrm{ms}$: the $10\,\mathrm{ms}$ task runs in every minor cycle, the $20\,\mathrm{ms}$ task in cycles $0$ and $2$, the $40\,\mathrm{ms}$ task in cycle $1$ (say), and the schedule is checked by confirming that each minor cycle's tasks fit within $10\,\mathrm{ms}$.

::: example Building a cyclic schedule {#ex-cyclic}
Three tasks have periods $T_A = 10$, $T_B = 20$, $T_C = 40\,\mathrm{ms}$ and execution times $C_A = 3$, $C_B = 4$, $C_C = 6\,\mathrm{ms}$. Construct a cyclic executive with a $10\,\mathrm{ms}$ minor cycle. What if $C_C$ grows to $8\,\mathrm{ms}$?
::: solution
The major cycle is $\operatorname{lcm}(10, 20, 40) = 40\,\mathrm{ms}$, four minor cycles. $A$ runs in every cycle, $B$ in two cycles twenty milliseconds apart, $C$ in one. Placing $B$ in cycles $0$ and $2$ and $C$ in cycle $1$:

| minor cycle | tasks | load (ms) |
|---|---|---|
| 0 | $A$, $B$ | $7$ |
| 1 | $A$, $C$ | $9$ |
| 2 | $A$, $B$ | $7$ |
| 3 | $A$ | $3$ |

Every cycle fits within $10\,\mathrm{ms}$; the utilisation is $0.3 + 0.2 + 0.15 = 0.65$. If $C_C = 8\,\mathrm{ms}$, cycle $1$ would need $11\,\mathrm{ms}$, so $C$ must be split by hand into two pieces, say $6\,\mathrm{ms}$ in cycle $1$ and $2\,\mathrm{ms}$ in cycle $3$ (loads $9$ and $5$), with its state carried between the pieces — the kind of restructuring that makes cyclic executives laborious to maintain.
:::
:::

The cyclic executive is completely predictable — every task runs at a known offset in every cycle, so jitter is minimal and testing covers all cases — and needs no locks, because tasks never preempt each other. Its weaknesses are rigidity (a new task or a changed period means reconstructing the table), awkward handling of long tasks (they must be split into pieces that fit into minor cycles) and of sporadic events, and the major cycle grows large when periods are not harmonic.

## Real-time operating systems

A **real-time operating system** (RTOS) such as FreeRTOS, Zephyr, ThreadX, RTEMS or VxWorks provides **preemptive priority scheduling**: the program is written as a set of tasks, each an ordinary C function with its own stack, usually an infinite loop that waits for something and then acts. The scheduler always runs the highest-priority task that is ready; when a higher-priority task becomes ready — its delay expires, or an interrupt handler gives it a semaphore — the running task is **preempted** immediately.

::: definition Task states {#def-task-states}
An RTOS task is in one of four states:

- **running** — executing on the processor (one task per core);
- **ready** — able to run, waiting only for the processor;
- **blocked** — waiting for an event: the expiry of a delay, a semaphore, a message in a queue, a notification; blocked tasks use no processor time;
- **suspended** — removed from scheduling until explicitly resumed.

The scheduler keeps the ready tasks in lists ordered by priority; a **context switch** saves the running task's registers on its stack, records its stack pointer in its **task control block** (TCB), and restores those of the next task.
:::

::: widget graph
nodes: Running@0,1; Ready@-1.6,0; Blocked@1.6,0; Suspended@0,-1.3
edges: Ready>Running; Running>Ready; Running>Blocked; Blocked>Ready; Running>Suspended; Ready>Suspended; Blocked>Suspended; Suspended>Ready
caption: The life of an RTOS task. A running task becomes ready when it is preempted, or blocked when it waits for an event; a blocked task becomes ready when the event occurs — never directly running, because the scheduler decides that. Only the scheduler moves a task from ready to running. Drag the states to rearrange the diagram.
:::

On Cortex-M, the hardware supports this directly: the core has two stack pointers (one for handlers and the kernel, one for tasks), the timer tick comes from SysTick, and the context switch is done in the lowest-priority exception, **PendSV**, so that it never delays an interrupt handler. The hardware already stacks eight registers on exception entry, and the PendSV handler saves the remaining eight (`R4`–`R11`) and switches stacks; a context switch takes a few hundred cycles, a few microseconds at most.

Here is the shape of an RTOS program, written with the FreeRTOS API (one of the most widely used kernels): a periodic control task, and a processing task fed by an interrupt handler through a queue.

```c
#include "FreeRTOS.h"
#include "task.h"
#include "queue.h"

static QueueHandle_t sample_q;

void ADC_IRQHandler(void)                         /* hardware interrupt */
{
    BaseType_t woken = pdFALSE;
    uint16_t s = read_adc_result();               /* clears the request  */
    xQueueSendFromISR(sample_q, &s, &woken);      /* never blocks        */
    portYIELD_FROM_ISR(woken);                    /* switch on exit if a */
}                                                 /* higher task woke    */

static void control_task(void *arg)
{
    TickType_t next = xTaskGetTickCount();
    for (;;) {
        vTaskDelayUntil(&next, pdMS_TO_TICKS(10)); /* exact 10 ms period */
        run_controller();
    }
}

static void filter_task(void *arg)
{
    uint16_t s;
    for (;;) {
        if (xQueueReceive(sample_q, &s, portMAX_DELAY) == pdPASS)
            filter_and_log(s);                     /* blocks until data  */
    }
}

int main(void)
{
    hardware_init();
    sample_q = xQueueCreate(32, sizeof(uint16_t));
    xTaskCreate(control_task, "ctrl", 256, NULL, 3, NULL);   /* stack in words */
    xTaskCreate(filter_task,  "filt", 256, NULL, 2, NULL);   /* higher number  */
    vTaskStartScheduler();                                   /* = higher prio  */
    for (;;) { }                                             /* not reached    */
}
```

`vTaskDelayUntil` wakes the task at fixed multiples of the period, measured from the previous wake-up time; a plain relative delay ("wait $10\,\mathrm{ms}$ from now") would add the task's own execution time to every period and the schedule would drift. The interrupt handler uses the `FromISR` variant of the queue call, which never blocks, and requests a context switch on exit if it has woken a task of higher priority than the one it interrupted — so the filter task can run within microseconds of the interrupt.

::: warning Interrupt priorities and the RTOS
An interrupt handler that calls RTOS functions must have a priority low enough that the kernel can mask it during its own critical sections; in FreeRTOS on Cortex-M this is the `configMAX_SYSCALL_INTERRUPT_PRIORITY` setting, and handlers with a *numerically lower* (more urgent) priority must not call any RTOS function. Calling a blocking function (one without `FromISR`) from a handler, or giving a handler too high a priority, corrupts the kernel's data structures, usually long after the event, in ways that are very hard to trace. Keep the most urgent handlers RTOS-free, and check this configuration first when an RTOS system crashes at random.
:::

::: quiz
A task must sample a sensor every $10\,\mathrm{ms}$. Its body takes $1$–$3\,\mathrm{ms}$ depending on the data. Which call keeps the sampling period at $10\,\mathrm{ms}$ on average?
- [ ] a relative delay of $10\,\mathrm{ms}$ at the end of each loop iteration
- [ ] a relative delay of $7\,\mathrm{ms}$, allowing for the worst case
- [x] a delay until an absolute time that is advanced by exactly $10\,\mathrm{ms}$ each iteration (`vTaskDelayUntil`)
- [ ] a busy-wait loop calibrated to $10\,\mathrm{ms}$
::: solution
A relative delay makes the period $10\,\mathrm{ms}$ plus the variable execution time, between $11$ and $13\,\mathrm{ms}$, and the error accumulates. Delaying until an absolute wake-up time advanced by the period gives wake-ups at exact multiples of $10\,\mathrm{ms}$ (within the tick resolution and preemption by higher-priority tasks), whatever the execution time. A busy-wait wastes the processor that lower-priority tasks need.
:::
:::

## Fixed-priority scheduling

Which priorities should the tasks have? For periodic tasks with deadlines equal to their periods, Liu and Layland showed in 1973 that a remarkably simple rule is optimal among fixed-priority assignments.

::: definition Rate-monotonic scheduling {#def-rms}
**Rate-monotonic scheduling** (RMS) assigns fixed priorities in order of period: the shorter a task's period, the higher its priority. When deadlines are shorter than periods, **deadline-monotonic** scheduling assigns priorities in order of relative deadline.
:::

Liu and Layland proved that if any fixed-priority assignment schedules a set of independent periodic tasks with $D_i = T_i$, then RMS does (and Leung and Whitehead proved the corresponding result for deadline-monotonic priorities when $D_i \le T_i$). The analysis rests on finding the worst case.

::: theorem Critical instant {#thm-critical-instant}
For independent periodic tasks under preemptive fixed-priority scheduling, the response time of a job of task $\tau_i$ is largest when it is released at the same instant as a job of every higher-priority task (a **critical instant**).
:::

::: proof
Only higher-priority tasks can delay a job of $\tau_i$ (lower-priority ones are preempted at once). Consider a job of $\tau_i$ released at time $0$, and suppose a higher-priority task $\tau_j$ has its nearest preceding release at $-\phi$ with $\phi > 0$. Moving that release to $0$ (and every later release of $\tau_j$ earlier by $\phi$ with it) can only move processor demand of $\tau_j$ into the window in which $\tau_i$ is waiting, never out of it: every release of $\tau_j$ that interfered before still lies in the window, and there may be an extra one at its end. So the interference with $\tau_i$, and its completion time, cannot decrease. Repeating for every higher-priority task shows that simultaneous release is the worst case.
:::

### The utilisation bound

::: theorem Liu–Layland utilisation bound {#thm-liu-layland}
A set of $n$ independent periodic tasks with $D_i = T_i$, scheduled preemptively by rate-monotonic priorities, meets all deadlines if

$$
U = \sum_{i=1}^{n}\frac{C_i}{T_i} \le n\left(2^{1/n} - 1\right).
$$ {#eq-liu-layland}

The bound is $1$ for $n = 1$, $0.828$ for $n = 2$, $0.780$ for $n = 3$, $0.757$ for $n = 4$, and decreases towards $\ln 2 = 0.693$ as $n \to \infty$. The condition is sufficient but not necessary.
:::

::: proof
We prove the case $n = 2$, which shows the method; the general case follows the same steps with more algebra (Liu and Layland 1973; Buttazzo's *Hard Real-Time Computing Systems*, chapter 4). The bound is the smallest utilisation of a task set that **fully utilises** the processor — one that is schedulable but becomes unschedulable if any $C_i$ is increased. Any task set with a lower utilisation is then schedulable.

Let $T_1 < T_2$, so $\tau_1$ has the higher priority, and consider a critical instant at time $0$ ([[#thm-critical-instant]]). Write $r = T_2/T_1$. Liu and Layland show that the minimum occurs for $1 < r \le 2$ (for larger $r$ one can replace $T_1$ by a multiple and lower the utilisation), so suppose this. In $[0, T_2)$, $\tau_1$ is released twice, at $0$ and $T_1$.

*Case 1: $C_1 \le T_2 - T_1$.* The second job of $\tau_1$ finishes before $T_2$, so $\tau_2$ gets all the time not used by the two jobs of $\tau_1$: the largest feasible $C_2 = T_2 - 2C_1$, and

$$
U = \frac{C_1}{T_1} + \frac{T_2 - 2C_1}{T_2} = 1 + C_1\left(\frac{1}{T_1} - \frac{2}{T_2}\right).
$$

Since $T_2 < 2T_1$, the bracket is negative and $U$ decreases with $C_1$; its minimum in this case is at $C_1 = T_2 - T_1$.

*Case 2: $C_1 \ge T_2 - T_1$.* The second job of $\tau_1$ runs past $T_2$, so $\tau_2$ must complete before $T_1$: $C_2 = T_1 - C_1$, and

$$
U = \frac{C_1}{T_1} + \frac{T_1 - C_1}{T_2} = \frac{T_1}{T_2} + C_1\left(\frac{1}{T_1} - \frac{1}{T_2}\right),
$$

which increases with $C_1$; its minimum is again at $C_1 = T_2 - T_1$.

At $C_1 = T_2 - T_1$ both expressions give, with $r = T_2/T_1$,

$$
U(r) = (r - 1) + \frac{2 - r}{r} = r + \frac{2}{r} - 2.
$$

Minimising over $r$: $U'(r) = 1 - 2/r^2 = 0$ at $r = \sqrt2$, where $U = \sqrt2 + \sqrt2 - 2 = 2(\sqrt2 - 1) = 0.828$, which is [[#eq-liu-layland]] for $n = 2$. For large $n$, $n(2^{1/n} - 1) = n(e^{(\ln 2)/n} - 1) \to \ln 2$.
:::

::: widget plot
f: x*(2^(1/x) - 1); ln(2); U
x: 1, 20
y: 0.6, 1.05
sliders: U=0.75:0.6:1:0.01
labels: n(2^{1/n}-1); \ln 2; \text{your } U
caption: The Liu–Layland bound against the number of tasks $n$ (read it at integer $n$), with its limit $\ln 2$ and a horizontal line at a task set's utilisation $U$. Where your line lies below the curve, the test guarantees schedulability; above it, the test is silent and response-time analysis must decide. Any set with $U \le 0.69$ passes for every $n$.
:::

::: warning The bound is sufficient, not necessary
A task set with $U$ above the Liu–Layland bound is not thereby unschedulable — it simply fails a conservative test. Many real task sets are schedulable at much higher utilisation; task sets whose periods are **harmonic** (each period divides the next) are schedulable under RMS right up to $U = 1$. Conversely, a set with $U \le 1$ can still miss deadlines under fixed priorities. When the bound fails, apply response-time analysis before redesigning anything.
:::

### Response-time analysis

The exact test computes each task's worst-case response time directly. At a critical instant, a job of $\tau_i$ released at $0$ completes at the first time $R$ at which the processor has done all the work requested in $[0, R)$ by $\tau_i$ and the higher-priority tasks. A higher-priority task $\tau_j$ is released $\lceil R/T_j\rceil$ times in $[0, R)$, each needing $C_j$.

::: theorem Response-time analysis {#thm-rta}
Under preemptive fixed-priority scheduling of independent tasks with $D_i \le T_i$, the worst-case response time of $\tau_i$ is the smallest positive solution of

$$
R_i = C_i + \sum_{j \in \text{hp}(i)} \left\lceil \frac{R_i}{T_j} \right\rceil C_j ,
$$ {#eq-rta}

where $\text{hp}(i)$ is the set of tasks with higher priority than $\tau_i$. It is found by the iteration $R_i^{(0)} = C_i$, $R_i^{(k+1)} = C_i + \sum_{j\in\text{hp}(i)} \lceil R_i^{(k)}/T_j\rceil C_j$, which is non-decreasing and either converges ($R_i^{(k+1)} = R_i^{(k)}$) or exceeds $D_i$, in which case the task is unschedulable.
:::

::: proof
By [[#thm-critical-instant]] the worst case is a simultaneous release at $0$. The demand of the tasks of priority $\ge i$ in $[0, t)$ is $W(t) = C_i + \sum_{j\in\text{hp}(i)}\lceil t/T_j\rceil C_j$. The processor never idles while this work is outstanding, so the job of $\tau_i$ completes at the first $t > 0$ with $W(t) \le t$, and since $W$ jumps only at releases and is constant between them, at that point $W(t) = t$: the smallest fixed point. $W$ is non-decreasing, so starting from $R^{(0)} = C_i \le R_i$ the iterates $R^{(k+1)} = W(R^{(k)})$ stay below the smallest fixed point and increase towards it; they take integer multiples of the $C_j$, so they reach it in finitely many steps, or pass $D_i$ first.
:::

::: widget plot
f: C3 + ceil(x/T1)*C1 + ceil(x/T2)*C2; x
x: 0, 20
y: 0, 20
sliders: C1=1:0.5:4:0.5; T1=4:2:10:1; C2=2:0.5:5:0.5; T2=6:3:15:1; C3=3:0.5:8:0.5
labels: W(t)\ \text{demand}; t
caption: Response-time analysis for the lowest-priority of three tasks, with times in ms. The staircase is the demand $W(t)$ of the task and the two higher-priority tasks released together at $t = 0$; the diagonal is the time available. The worst-case response time is the first point where the staircase meets the diagonal — $10\,\mathrm{ms}$ for the default set of [[#ex-rta]]. Increase $C_3$ until the first meeting point moves past the deadline $T_3 = 12$.
:::

::: example Beyond the utilisation bound {#ex-rta}
Three tasks have $(C_i, T_i)$ of $(1, 4)$, $(2, 6)$ and $(3, 12)$, in milliseconds, with $D_i = T_i$ and rate-monotonic priorities. Are they schedulable?
::: solution
$U = 1/4 + 2/6 + 3/12 = 0.833$, above the bound $0.780$ for $n = 3$: the Liu–Layland test is inconclusive. Response-time analysis by [[#eq-rta]]:

- $\tau_1$: $R_1 = 1 \le 4$.
- $\tau_2$: $R^{(0)} = 2$; $R^{(1)} = 2 + \lceil 2/4\rceil\cdot 1 = 3$; $R^{(2)} = 2 + \lceil 3/4\rceil\cdot 1 = 3$. So $R_2 = 3 \le 6$.
- $\tau_3$: $R^{(0)} = 3$; $R^{(1)} = 3 + \lceil 3/4\rceil + 2\lceil 3/6\rceil = 6$; $R^{(2)} = 3 + \lceil 6/4\rceil + 2\lceil 6/6\rceil = 7$; $R^{(3)} = 3 + 2 + 2\cdot 2 = 9$; $R^{(4)} = 3 + \lceil 9/4\rceil + 2\lceil 9/6\rceil = 3 + 3 + 4 = 10$; $R^{(5)} = 3 + \lceil 10/4\rceil + 2\lceil 10/6\rceil = 10$. So $R_3 = 10 \le 12$.

All deadlines are met: the set is schedulable, with $2\,\mathrm{ms}$ of slack for $\tau_3$.
:::
:::

::: example A set that RMS cannot schedule {#ex-rms-fail}
Two tasks have $(C, T) = (2, 5)$ and $(4, 7)$ ms, with $D = T$. Show that they are not schedulable with fixed priorities, although $U < 1$, and that earliest-deadline-first scheduling succeeds.
::: solution
$U = 0.4 + 0.571 = 0.971$. With RMS, $\tau_1$ (period $5$) has priority. For $\tau_2$: $R^{(0)} = 4$, $R^{(1)} = 4 + \lceil 4/5\rceil\cdot 2 = 6$, $R^{(2)} = 4 + \lceil 6/5\rceil\cdot 2 = 8 > 7$: $\tau_2$ misses its deadline. The other priority order is worse ($\tau_1$ would wait for $4\,\mathrm{ms}$ of $\tau_2$ and finish at $6 > 5$). So no fixed-priority assignment works.

Under **earliest-deadline-first** (EDF), the scheduler always runs the ready job with the nearest absolute deadline. At $t = 0$ both are released; $\tau_1$'s deadline ($5$) is nearer, so it runs in $[0, 2)$, then $\tau_2$ in $[2, 6)$ — at $t = 5$, $\tau_1$'s second job (deadline $10$) arrives but $\tau_2$'s deadline $7$ is nearer, so $\tau_2$ continues and finishes at $6 \le 7$. Then $\tau_1$ runs $[6, 8)$, finishing by $10$. Continuing over the hyperperiod $35\,\mathrm{ms}$ confirms that no deadline is missed, as the theorem below guarantees.
:::
:::

::: theorem EDF optimality {#thm-edf}
A set of independent periodic tasks with $D_i = T_i$ is schedulable by preemptive earliest-deadline-first scheduling if and only if $U \le 1$.
:::

::: proof
Necessity is clear. For sufficiency (sketch; see Liu and Layland 1973 or Buttazzo, chapter 4), suppose a deadline is first missed at time $t$, and let $t_0 < t$ be the last instant before $t$ at which the processor was idle or ran a job with deadline after $t$ (or $t_0 = 0$). In $[t_0, t)$ the processor was continuously busy with jobs released at or after $t_0$ with deadlines at or before $t$; their total demand is at most $\sum_i \lfloor (t - t_0)/T_i\rfloor C_i \le (t - t_0)U$. A miss means the demand exceeded the available time $t - t_0$, so $U > 1$.
:::

EDF thus uses the processor fully, where RMS can guarantee only $69$–$83\,\%$ by the utilisation test. Yet most RTOSes implement fixed priorities: they are simpler, cheaper to run, supported directly by interrupt controllers, and degrade predictably under overload — the lowest-priority tasks miss their deadlines first — whereas an overloaded EDF system can miss deadlines of arbitrary tasks in a cascade. Zephyr and some research kernels offer EDF as an option.

::: remark Overheads in the analysis
Response-time analysis is only as good as its inputs. In practice, each $C_i$ must include the context switches into and out of the task (two per job), the RTOS tick interrupt is a highest-priority periodic task of its own, and every interrupt handler is a task with a period equal to its minimum inter-arrival time. With these included, the analysis is routinely used to verify automotive and avionics software.
:::

## Sharing resources

Tasks that share data, a peripheral or a buffer must not access it at the same time. Disabling interrupts, as in [[embedded-systems/timers-interrupts#def-critical]], also works between tasks, but it delays every interrupt in the system; an RTOS offers finer tools.

::: definition Semaphores and mutexes {#def-semaphore}
A **counting semaphore** holds a non-negative count with two atomic operations: *take* (wait, $P$) decrements it, blocking the caller while it is zero, and *give* (signal, $V$) increments it, waking a blocked task if there is one. A **binary semaphore** has count $0$ or $1$ and is used mainly for **signalling** — an interrupt handler gives it, a task waiting for the event takes it. A **mutex** (mutual-exclusion lock) is a binary semaphore used to protect a shared resource: it has an **owner**, the task that took it, which alone may give it back, and it normally implements **priority inheritance**.
:::

A third tool is the **message queue**: a fixed-size FIFO of items, written by producers and read by consumers, with blocking when empty or full. Passing data in queues instead of sharing variables avoids most locking altogether — each piece of data has one owner at a time — and is the preferred structure in RTOS designs.

### Priority inversion

Blocking on a mutex can break the priority scheme. Suppose a high-priority task $H$ and a low-priority task $L$ share a mutex, and a medium-priority task $M$ uses neither. $L$ takes the mutex; $H$ becomes ready, preempts $L$, and blocks on the mutex. Now $M$ becomes ready: it has higher priority than $L$, so it preempts $L$ and runs — for as long as it likes. $H$, the most urgent task in the system, is waiting for $L$, which is waiting for $M$. This is **unbounded priority inversion**: the delay of $H$ depends on tasks that have nothing to do with the resource.

::: theorem Priority inheritance and priority ceiling {#thm-inheritance}
Under the **priority inheritance protocol**, a task holding a mutex temporarily inherits the priority of the highest-priority task blocked on it. Under the **priority ceiling protocol** (in its common "immediate" form), a task that takes a mutex is immediately raised to the mutex's **ceiling**, the highest priority of any task that uses it. Then:

1. with priority inheritance, a task can be blocked by each lower-priority task for at most the duration of one critical section, and no medium-priority task can prolong the blocking;
2. with the priority ceiling protocol, a task can be blocked at most once per job, for the duration of one critical section of a lower-priority task, and deadlock between tasks using the protocol is impossible.

The response-time equation then becomes $R_i = C_i + B_i + \sum_{j\in\text{hp}(i)}\lceil R_i/T_j\rceil C_j$, where $B_i$ is the worst-case **blocking time**.
:::

::: proof
(Sketch; full proofs in Sha, Rajkumar and Lehoczky, 1990.) Under inheritance, while $H$ waits for $L$, $L$ runs at $H$'s priority, so $M$ cannot preempt it; $L$ releases the mutex at the end of its critical section, after which $H$ runs. Each lower-priority task can block $H$ only if it was already inside a critical section on a shared mutex when $H$ arrived, so the blocking is at most one critical section per lower-priority task. Under the immediate ceiling protocol, a task entering a critical section runs at the ceiling, so no task that could want the same mutex can preempt it; when $H$ is released, at most one lower-priority task can be inside a critical section with ceiling $\ge$ priority of $H$ (any other would have been prevented from starting it), so $H$ waits at most for that one. Since no task can be preempted inside a critical section by any task that uses the same mutex, no cycle of waiting tasks — a deadlock — can form.
:::

::: example Blocking in a control system {#ex-blocking}
Four tasks are scheduled rate-monotonically, with $(C, T)$ of $(0.5, 2)$, $(2, 10)$, $(3, 20)$ and $(8, 50)$ ms. The lowest-priority task $\tau_4$ (a logger) shares a data structure with each of the others through a mutex with the priority ceiling protocol; its longest critical section is $1\,\mathrm{ms}$. Find the worst-case response times with and without the blocking.
::: solution
$U = 0.25 + 0.2 + 0.15 + 0.16 = 0.76$, just above the bound $0.757$ for four tasks.

Without blocking, by [[#eq-rta]]: $R_1 = 0.5$; $R_2$: $2 \to 2 + 0.5 = 2.5 \to 2 + 2(0.5) = 3 \to 3$, so $R_2 = 3$; $R_3$: $3 \to 3 + 2(0.5) + 1(2) = 6 \to 3 + 3(0.5) + 1(2) = 6.5 \to 7 \to 7$, so $R_3 = 7$; $R_4$: $8, 15, 19, 20, 20$, so $R_4 = 20$. All within their periods.

With blocking $B_1 = B_2 = B_3 = 1\,\mathrm{ms}$ (each may wait once for the logger's critical section) and $B_4 = 0$ (nothing has lower priority): $R_1 = 1.5$; $R_2$: $3, 4, 4$, so $R_2 = 4$; $R_3$: $4, 7, 8, 8$, so $R_3 = 8$; $R_4 = 20$, unchanged (it is the task that blocks the others, and its own interference is unchanged). Everything still meets its deadline. Without a protocol, a medium-priority task could have extended the blocking of $\tau_1$ indefinitely; with it, a $1\,\mathrm{ms}$ critical section costs each higher task at most $1\,\mathrm{ms}$.
:::
:::

### Deadlock

Two tasks that each take two mutexes in opposite orders can **deadlock**: $A$ holds the display mutex and waits for the SPI mutex; $B$ holds the SPI mutex and waits for the display mutex; neither can proceed. The standard defences are to impose a **global lock order** (every task takes mutexes in the same order), to hold at most one mutex at a time, to use the priority ceiling protocol, or to replace shared resources by a **server task** that owns the resource and receives requests through a queue. Taking a mutex with a timeout instead of waiting for ever turns a silent deadlock into a detectable error.

::: quiz
A high-priority task waits on a mutex held by a low-priority task, while a medium-priority task that does not use the mutex runs for $50\,\mathrm{ms}$. With priority inheritance enabled on the mutex, how long can the medium task delay the high-priority task?
- [ ] up to $50\,\mathrm{ms}$
- [x] not at all — the low-priority task inherits the high priority and the medium task cannot preempt it
- [ ] for one tick period
- [ ] until the medium task blocks
::: solution
While the high-priority task is blocked on the mutex, its owner runs at the high priority, above the medium task. The high-priority task waits only for the rest of the owner's critical section. Without inheritance, the medium task could delay it by its whole execution time — the Mars Pathfinder failure described below.
:::
:::

::: application Priority inversion on Mars
In July 1997, a few days after landing, the Mars Pathfinder lander began resetting itself repeatedly. Engineers at the Jet Propulsion Laboratory reproduced the fault on a replica: a low-priority meteorological-data task held a mutex protecting the lander's shared information bus while medium-priority communication tasks ran, so the high-priority bus-management task waited too long, and a watchdog detected the missed deadline and reset the system. The VxWorks mutex had a priority-inheritance option that had been left off. Because the lander's software could be modified in flight, the team uploaded a change that enabled priority inheritance, and the resets stopped — a widely retold case of real-time theory failing, and then succeeding, in practice.
:::

::: history
The first real-time computing systems — Whirlwind and the SAGE air-defence network in the 1950s, and the Apollo Guidance Computer in the 1960s — scheduled their work with hand-built executives; the Apollo executive's priority scheduling and restart logic let the Apollo 11 landing continue through the 1201 and 1202 overload alarms in 1969. C. L. Liu and James Layland's 1973 paper in the *Journal of the ACM* founded real-time scheduling theory with the rate-monotonic bound and the optimality of EDF. Exact response-time analysis was developed by Mathai Joseph and Paritosh Pandya (1986) and by Neil Audsley, Alan Burns, Ken Tindell and colleagues at York around 1990–1993, and Lui Sha, Ragunathan Rajkumar and John Lehoczky published the priority inheritance and priority ceiling protocols in 1990. Commercial kernels such as VxWorks (1987) and open-source ones such as FreeRTOS (2003) and Zephyr (launched under the Linux Foundation in 2016) brought these methods to everyday embedded products.
:::

## Where this leads

Real-time analysis connects the earlier chapters into a whole: interrupt handlers are the highest-priority tasks, their latencies come from [[embedded-systems/timers-interrupts]], and the drivers of [[embedded-systems/serial-communication]] feed tasks through queues — whose worst-case delays on a CAN bus follow from the same response-time equation with frames in place of jobs. [[embedded-systems/embedded-system-design]] turns to keeping such systems running for years: watchdogs that detect missed deadlines, low-power design that puts the processor to sleep whenever no task is ready, and testing that measures worst-case execution times. Sampling-rate and delay requirements for control loops come from [[control-systems/digital-control]]. Scheduling on multicore microcontrollers, and mixed-criticality systems in which tasks of different safety levels share a processor, are topics of current research and practice beyond this course.

::: summary
- A periodic task has period $T_i$, worst-case execution time $C_i$ and deadline $D_i$; utilisation is $U = \sum C_i/T_i$ ([[#def-task-model]]), and $U \le 1$ is necessary.
- Superloops are simple but give loop activities poor response times; cyclic executives are fully predictable but rigid; an RTOS schedules tasks ([[#def-task-states]]) preemptively by priority.
- Rate-monotonic priorities ([[#def-rms]]) are optimal among fixed priorities for $D = T$; the worst case is a critical instant ([[#thm-critical-instant]]).
- The Liu–Layland test $U \le n(2^{1/n}-1)$ ([[#thm-liu-layland]]) is sufficient; response-time analysis $R_i = C_i + B_i + \sum_{\text{hp}}\lceil R_i/T_j\rceil C_j$ ([[#thm-rta]]) is exact.
- EDF schedules any set with $U \le 1$ ([[#thm-edf]]), but fixed priorities are simpler and degrade more predictably.
- Use queues to pass data, semaphores to signal, mutexes with priority inheritance or ceilings to share resources ([[#def-semaphore]], [[#thm-inheritance]]), and a global lock order against deadlock.
- Include context switches, the tick and interrupt handlers in the analysis, and call only `FromISR`-style functions from handlers with RTOS-compatible priorities.
:::

## Exercises

::: exercise The bound for three tasks {level=1 check="3*(2^(1/3) - 1)"}
Evaluate the Liu–Layland bound for $n = 3$.
::: solution
$3(2^{1/3} - 1) = 3(1.2599 - 1) = 0.7798$.
:::
:::

::: exercise Utilisation {level=1 check="0.6"}
Tasks have $(C, T)$ of $(1, 5)$, $(2, 10)$ and $(4, 20)$ ms. What is the utilisation, and does the Liu–Layland test guarantee schedulability under RMS?
::: solution
$U = 0.2 + 0.2 + 0.2 = 0.6 \le 0.780$: yes. (The periods are also harmonic, so RMS would succeed up to $U = 1$.)
:::
:::

::: exercise A cyclic executive {level=1 check="50e-3"}
Tasks with periods of $5$, $10$ and $25\,\mathrm{ms}$ are to be run by a cyclic executive with a $5\,\mathrm{ms}$ minor cycle. What is the major cycle, in seconds? How many times does each task run in it?
::: solution
The major cycle is $\operatorname{lcm}(5, 10, 25) = 50\,\mathrm{ms}$. In it the $5\,\mathrm{ms}$ task runs $10$ times, the $10\,\mathrm{ms}$ task $5$ times and the $25\,\mathrm{ms}$ task twice.
:::
:::

::: exercise A response time {level=2 check="15e-3"}
Tasks with $(C, T)$ of $(3, 10)$, $(4, 15)$ and $(5, 30)$ ms are scheduled rate-monotonically. Find the worst-case response time of the lowest-priority task, in seconds.
::: solution
$U = 0.3 + 0.267 + 0.167 = 0.733 \le 0.780$, so the set is schedulable; RTA gives the response time. For $\tau_3$: $R^{(0)} = 5$; $R^{(1)} = 5 + 3\lceil 5/10\rceil + 4\lceil 5/15\rceil = 12$; $R^{(2)} = 5 + 3\lceil 12/10\rceil + 4\lceil 12/15\rceil = 5 + 6 + 4 = 15$; $R^{(3)} = 5 + 3\lceil 15/10\rceil + 4\lceil 15/15\rceil = 15$. So $R_3 = 15\,\mathrm{ms}$.
:::
:::

::: exercise Above the bound {level=2 check="16e-3"}
Tasks with $(C, T)$ of $(2, 4)$, $(3, 10)$ and $(2, 20)$ ms are scheduled rate-monotonically with $D = T$. Show that the Liu–Layland test fails, and find the response time of the lowest-priority task in seconds. Is the set schedulable?
::: solution
$U = 0.5 + 0.3 + 0.1 = 0.9 > 0.780$. RTA: $R_1 = 2$. $R_2$: $3, 5, 7, 7$, so $R_2 = 7 \le 10$. $R_3$: $2, 7, 9, 11, 14, 16, 16$ (for example $R^{(5)} = 2 + 2\lceil 14/4\rceil + 3\lceil 14/10\rceil = 2 + 8 + 6 = 16$, and $2 + 2\lceil 16/4\rceil + 3\lceil 16/10\rceil = 16$), so $R_3 = 16\,\mathrm{ms} \le 20$. The set is schedulable.
:::
:::

::: exercise Diagnosing priority inversion {level=2}
In a weather station, a high-priority radio task and a low-priority logging task both write to an SD card protected by a binary semaphore (not a mutex). A medium-priority display task redraws the screen for up to $80\,\mathrm{ms}$. Occasionally the radio misses its $20\,\mathrm{ms}$ deadline. Explain the mechanism and give two fixes.
::: solution
When the logger holds the semaphore and the radio blocks on it, the display task can preempt the logger and run for up to $80\,\mathrm{ms}$, so the radio waits for the display — unbounded priority inversion; a binary semaphore has no owner and so cannot implement priority inheritance. Fixes: (1) replace the semaphore by a mutex with priority inheritance (or the priority ceiling protocol), bounding the radio's blocking to the logger's critical section; (2) give the SD card to a server task that owns it, and let both the radio and the logger send write requests through a queue, so that no task ever blocks on the card while holding something else; also (3) shorten the logger's critical section (buffer the data and write in small pieces).
:::
:::

::: exercise A deadlock {level=2}
Task A executes `take(m1); take(m2); ...; give(m2); give(m1);` and task B executes `take(m2); take(m1); ...; give(m1); give(m2);`. Give an interleaving that deadlocks, and two different ways to prevent it.
::: solution
A takes `m1`; B preempts (or runs on another core) and takes `m2`; A tries `m2` and blocks; B tries `m1` and blocks. Each waits for the other for ever. Prevention: (1) a global order — both tasks take `m1` before `m2`; (2) the immediate priority ceiling protocol on both mutexes, under which B cannot start its critical section while A holds `m1` (whose ceiling is at least B's priority); or (3) combine the two resources under one mutex. A timeout on `take` would at least detect the deadlock.
:::
:::

::: exercise The largest execution time {level=3 check="5e-3"}
Tasks $(1, 4)$ and $(2, 6)$ ms are scheduled rate-monotonically together with a third task of period $12\,\mathrm{ms}$ and $D = T$. What is the largest execution time $C_3$, in seconds, for which the set remains schedulable? What is the utilisation then, and why does this not contradict [[#thm-liu-layland]]?
::: hint
Find the largest $C_3$ for which $W(12) = C_3 + \lceil 12/4\rceil\cdot 1 + \lceil 12/6\rceil\cdot 2 \le 12$, and check that no larger $C_3$ has an earlier fixed point.
:::
::: solution
$\tau_3$ is schedulable exactly when some $t \le 12$ satisfies $C_3 + \lceil t/4\rceil + 2\lceil t/6\rceil \le t$. The right candidates are the release times $4, 6, 8, 12$ (the demand is constant between releases): at $t = 4$, $C_3 + 1 + 2 \le 4$ needs $C_3 \le 1$; at $t = 6$, $C_3 + 2 + 2 \le 6$ needs $C_3 \le 2$; at $t = 8$, $C_3 + 2 + 4 \le 8$ needs $C_3 \le 2$; at $t = 12$, $C_3 + 3 + 4 \le 12$ needs $C_3 \le 5$. The largest is $C_3 = 5\,\mathrm{ms}$ (RTA for $C_3 = 5$: $5, 9, 12, 12$).

The utilisation is then $1/4 + 2/6 + 5/12 = 1$. There is no contradiction: the Liu–Layland bound is the *smallest* utilisation at which some task set fully utilises the processor; particular sets — here, periods $4$ and $6$ both divide $12$, so the demand in $[0, 12)$ exactly fits — can reach $100\,\%$.
:::
:::

::: exercise Including overheads {level=3}
For the task set of [[#ex-rta]], each context switch costs $0.05\,\mathrm{ms}$, and a $1\,\mathrm{kHz}$ RTOS tick interrupt costs $0.02\,\mathrm{ms}$ per tick. Include both in the analysis and find the new worst-case response times. Is the set still schedulable?
::: hint
Add two context switches to each $C_i$, and treat the tick as the highest-priority task with $T = 1\,\mathrm{ms}$.
:::
::: solution
Effective execution times: $C_1 = 1.1$, $C_2 = 2.1$, $C_3 = 3.1\,\mathrm{ms}$; tick task $(0.02, 1)$ at the highest priority. RTA: $R_1 = 1.1 + 0.02\lceil R_1/1\rceil$: $1.1 \to 1.14 \to 1.14$, so $R_1 = 1.14 \le 4$. $R_2 = 2.1 + 0.02\lceil R_2\rceil + 1.1\lceil R_2/4\rceil$: $2.1 \to 3.26 \to 3.28 \to 3.28$, so $R_2 = 3.28 \le 6$. $R_3 = 3.1 + 0.02\lceil R_3\rceil + 1.1\lceil R_3/4\rceil + 2.1\lceil R_3/6\rceil$: $3.1 \to 6.38 \to 9.64 \to 10.80 \to 10.82 \to 10.82$, so $R_3 = 10.82 \le 12$. Still schedulable, but the slack of $\tau_3$ has fallen from $2$ to about $1.2\,\mathrm{ms}$: overheads that look negligible ($2\,\%$ for the tick alone) eat a large part of the margin.
:::
:::

::: exercise Choosing a structure {level=3}
A small product reads a sensor every $1\,\mathrm{ms}$ ($C = 0.1\,\mathrm{ms}$), runs a filter every $10\,\mathrm{ms}$ ($1\,\mathrm{ms}$), updates a display every $100\,\mathrm{ms}$ ($30\,\mathrm{ms}$, the display driver is slow) and handles button presses at most every $50\,\mathrm{ms}$ ($0.2\,\mathrm{ms}$, response needed within $20\,\mathrm{ms}$). Evaluate (a) a superloop, (b) a cyclic executive with a $1\,\mathrm{ms}$ minor cycle, and (c) an RTOS with rate-monotonic priorities. Which would you choose?
::: solution
$U = 0.1 + 0.1 + 0.3 + 0.004 = 0.504$, low.

(a) Superloop: the display update takes $30\,\mathrm{ms}$ in one call, so the sensor (needing $1\,\mathrm{ms}$) would be missed unless it is read in a timer interrupt; button response could be $30\,\mathrm{ms}$ plus the rest of the loop, over $20\,\mathrm{ms}$. It works only if the sensor moves into an interrupt and the display update is split into small pieces called each iteration.

(b) Cyclic executive: the $30\,\mathrm{ms}$ display job does not fit into a $1\,\mathrm{ms}$ minor cycle ($0.1\,\mathrm{ms}$ of it is taken by the sensor); it would have to be split into about $40$ pieces of $\le 0.75\,\mathrm{ms}$ spread over the $100\,\mathrm{ms}$ major cycle — possible but laborious, and fragile when the display code changes.

(c) RTOS with RMS (sensor highest, then filter, then button with $T = 50$, then display): RTA for the button gives $R = 0.2 + 0.1\lceil R/1\rceil + 1\lceil R/10\rceil$: $0.2 \to 1.3 \to 1.4 \to 1.4$, well within $20\,\mathrm{ms}$; the display: $R = 30 + 0.1\lceil R\rceil + 1\lceil R/10\rceil + 0.2\lceil R/50\rceil$, iterating $30 \to 36.2 \to 37.9 \to 38.0 \to 38.0$, so $R = 38\,\mathrm{ms}$, within $100\,\mathrm{ms}$. All deadlines met with no restructuring of the display code. The RTOS is the natural choice here (at the cost of per-task stacks and kernel code); a superloop with the sensor in an interrupt and a sliced display update would be the minimal-resource alternative.
:::
:::
