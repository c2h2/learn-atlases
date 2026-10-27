Here are four OpenMP programs that compute $\pi$ as $\int_0^1 4/(1 + x^2)\,dx$ by the midpoint rule with $10^8$ strips. They differ only in how the threads add their terms into the shared variable `sum`:

```c
#pragma omp parallel for                     /* 1: WRONG, a data race on sum */
for (long i = 0; i < N; i++) { double x = (i + 0.5) * h; sum += 4.0 / (1.0 + x * x); }

#pragma omp parallel for                     /* 2: a critical section per term */
for (long i = 0; i < N; i++) {
    double x = (i + 0.5) * h, f = 4.0 / (1.0 + x * x);
    #pragma omp critical
    sum += f;
}

#pragma omp parallel for                     /* 3: an atomic addition per term */
for (long i = 0; i < N; i++) {
    double x = (i + 0.5) * h, f = 4.0 / (1.0 + x * x);
    #pragma omp atomic
    sum += f;
}

#pragma omp parallel for reduction(+ : sum)  /* 4: private partial sums */
for (long i = 0; i < N; i++) { double x = (i + 0.5) * h; sum += 4.0 / (1.0 + x * x); }
```

With $16$ threads, and then with one, on the $36$-core machine of this course (observations, as of 2026):

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fopenmp -o pi_race pi_race.c
$ OMP_NUM_THREADS=16 ./pi_race
race      pi = 0.2316248210  0.033 s
critical  pi = 3.1415926536  20.475 s
atomic    pi = 3.1415926536  4.862 s
reduction pi = 3.1415926536  0.032 s
$ OMP_NUM_THREADS=1 ./pi_race
race      pi = 3.1415926536  0.463 s
critical  pi = 3.1415926536  1.750 s
atomic    pi = 3.1415926536  1.211 s
reduction pi = 3.1415926536  0.457 s
```

The racy version is fast and wrong. The two versions that protect each addition are right and *slower* with sixteen threads than with one — the critical section by a factor of $44$ compared with the sequential loop. Only the reduction is both right and fast, $14$ times faster than one thread. Every line of the four loops is legal OpenMP; the difference lies entirely in how the threads share data.

This chapter teaches shared-memory programming: first with POSIX threads, which [[operating-systems/threads-locks]] introduced, and then with **OpenMP**, the standard way to parallelise C, C++ and Fortran programs on one machine. We cover the fork–join model, parallel loops and how their iterations are scheduled, reductions and why they need associativity, tasks for irregular and recursive parallelism, and the **work-stealing** schedulers that execute tasks efficiently. A final section shows why Python needs processes rather than threads for the same job. Locks, condition variables and the meaning of a data race are assumed from [[operating-systems/threads-locks]], [[operating-systems/synchronisation]] and [[programming-languages/concurrency-models]].

## From threads to OpenMP

The basic pattern of shared-memory parallelism is **fork–join**: a single thread forks a team of threads, each executes part of the work, and the team joins again before the program continues. With POSIX threads the programmer does everything by hand — divides the iteration space, passes each thread its part, collects the results:

::: example The midpoint rule with POSIX threads {#ex-pthreads}
Write the $\pi$ computation with `pthread_create` and `pthread_join`, giving each of $p$ threads a contiguous block of the $10^9$ strips, and compare one thread with sixteen.
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

enum { N = 1000000000, MAXT = 64 };
static int p;                                  /* number of threads */
static double partial[MAXT];                   /* one partial sum per thread */

static void *strip(void *arg) {
    long t = (long)arg, lo = N * t / p, hi = N * (t + 1) / p;
    double h = 1.0 / N, s = 0.0;               /* local accumulator in a register */
    for (long i = lo; i < hi; i++) {
        double x = (i + 0.5) * h;
        s += 4.0 / (1.0 + x * x);
    }
    partial[t] = s;                            /* written once, at the end */
    return NULL;
}

int main(int argc, char *argv[]) {
    p = argc > 1 ? atoi(argv[1]) : 4;
    if (p < 1 || p > MAXT) return 1;
    pthread_t tid[MAXT];
    for (long t = 0; t < p; t++) pthread_create(&tid[t], NULL, strip, (void *)t);
    double sum = 0.0;
    for (long t = 0; t < p; t++) {             /* join in order, then combine */
        pthread_join(tid[t], NULL);
        sum += partial[t];
    }
    printf("p=%2d  pi = %.15f\n", p, sum / N);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o pi_pthread pi_pthread.c
$ /usr/bin/time -f "%e s" ./pi_pthread 1
p= 1  pi = 3.141592653589971
4.40 s
$ /usr/bin/time -f "%e s" ./pi_pthread 16
p=16  pi = 3.141592653589832
0.32 s
```

A speed-up of $13.8$ on $16$ threads (an observation on our machine). The bounds `N * t / p` divide the strips into blocks whose sizes differ by at most one, even when $p$ does not divide $N$. Each thread accumulates into a local variable and writes its partial sum once; the main thread reads `partial[t]` only after joining thread $t$, and `pthread_join` guarantees that everything the thread wrote is visible afterwards, so there is no data race. Notice also that the two results differ in the last three digits — the additions happened in a different order ([[#warn-fp]]).
:::
:::

Most of this code is bookkeeping, the same in every program. **OpenMP** (*Open Multi-Processing*, first standardised in 1997) lets the compiler write it. The programmer annotates sequential code with **directives** — in C, `#pragma omp …` lines — and the compiler outlines the annotated region into a function, creates the threads (once, keeping them in a pool for later regions) and divides the work. Without `-fopenmp` the pragmas are ignored and the program is sequential, which makes OpenMP a good way to parallelise existing code incrementally.

::: definition The OpenMP execution model {#def-openmp}
An OpenMP program starts with one **initial thread**. A `parallel` construct forks a **team** of threads (by default one per logical CPU, or `OMP_NUM_THREADS`), each of which executes the region's code; the encountering thread becomes thread $0$ of the team. At the end of the region there is an implicit **barrier**: all threads wait until the whole team arrives, then only the initial thread continues. Inside a region:

- a **work-sharing** construct divides work among the team without creating threads: `for` divides the iterations of a loop, `sections` runs different blocks on different threads, and `single` runs a block on one thread; each ends with an implicit barrier unless `nowait` is given;
- **synchronisation** constructs order threads: `barrier`, `critical` (a mutex around a block), `atomic` (one indivisible update of a scalar), `taskwait`;
- **data-sharing clauses** say whether a variable is `shared` by the team, `private` (each thread has its own uninitialised copy), `firstprivate` (a private copy initialised from the original) or a `reduction` variable.

`omp_get_thread_num()` and `omp_get_num_threads()` give a thread's number and the team size.
:::

The default data-sharing rules cause most OpenMP bugs. Variables declared *outside* a parallel region are shared by default; variables declared *inside* it, and the index of a `parallel for` loop, are private. In loop 1 of the opening program, `sum` is declared outside, so it is shared, and `sum += …` is an unprotected read–modify–write of a shared variable by sixteen threads: a data race, which in C is undefined behaviour ([[programming-languages/concurrency-models#def-data-race]]). The result $0.23$ is not the lost updates of [[operating-systems/threads-locks]] in a milder form: the compiler, entitled to assume no race, kept `sum` in a register for the whole loop in each thread and stored it once at the end, so the final value is roughly the partial sum of whichever thread stored last. Writing `default(none)` on a construct forces you to declare the sharing of every variable, which turns this mistake into a compile-time error.

## Parallel loops and schedules

The `for` work-sharing construct requires a loop in **canonical form** — an integer or pointer index with a loop-invariant bound and increment — so that the number of iterations is known when the loop starts. The iterations must be independent: no iteration may write a location that another reads or writes, unless the access is synchronised. The compiler does not check this; asserting it is the programmer's responsibility.

How the iterations are divided among threads is the loop's **schedule**:

- `schedule(static)`: the iterations are divided into $p$ contiguous blocks of nearly equal size, one per thread (`static, c`: blocks of $c$ iterations dealt round robin). Decided in advance; no run-time cost.
- `schedule(dynamic, c)`: each thread, when idle, takes the next $c$ iterations from a shared counter ($c = 1$ by default). Adapts to uneven iterations, at the cost of one atomic operation per chunk.
- `schedule(guided, c)`: like dynamic, but each chunk is proportional to the number of remaining iterations divided by $p$, shrinking to $c$: few large chunks at first, small ones at the end.
- `schedule(runtime)`: read from the environment variable `OMP_SCHEDULE`, convenient for experiments.

Static schedules are best when iterations cost the same; dynamic ones when they do not. Dynamic scheduling is a case of **list scheduling** — each idle processor takes the next job from a list — whose performance Ronald Graham bounded in 1966.

::: theorem Graham's bound for list scheduling {#thm-graham}
Let independent jobs with running times $c_1, \dots, c_m$, total $W = \sum_i c_i$ and maximum $c_{\max}$, be executed on $p$ processors by any list schedule: whenever a processor is idle and jobs remain, it immediately starts the next one. Then the time until all jobs finish satisfies

$$
T \le \frac{W}{p} + \left(1 - \frac{1}{p}\right) c_{\max} \le 2\,T^*,
$$ {#eq-graham}

where $T^* \ge \max(W/p, c_{\max})$ is the optimal time.
:::

::: proof
Let job $j$ be one that finishes last, and let it start at time $s$, so $T = s + c_j$. Before time $s$ no processor was idle: job $j$ had not started, so jobs remained, and an idle processor would have started one. Hence during $[0, s)$ all $p$ processors were busy with jobs other than $j$, so $ps \le W - c_j$. Therefore

$$
T = s + c_j \le \frac{W - c_j}{p} + c_j = \frac{W}{p} + \left(1 - \frac{1}{p}\right)c_j \le \frac{W}{p} + \left(1 - \frac{1}{p}\right)c_{\max}.
$$

Any schedule needs at least $W/p$ (the processors must do all the work) and at least $c_{\max}$ (a job runs on one processor), so both terms are at most $T^*$ and $T < 2T^*$.
:::

Applied to `schedule(dynamic, c)`, a job is a chunk: dynamic scheduling is within $c_{\max}$, the cost of the most expensive chunk, of perfect balance — ignoring the cost of taking chunks, which is the catch.

::: example Scheduling a triangular loop {#ex-schedules}
In the loop below, iteration $i$ performs $i$ steps of the logistic map, so the cost grows linearly with $i$. Time it with one thread, and with $16$ threads under five schedules. Predict the static result.

```c
static double work(long i) {               /* cost proportional to i */
    double y = 0.5;
    for (long k = 0; k < i; k++) y = 3.9 * y * (1.0 - y);
    return y;
}
...
    #pragma omp parallel for schedule(runtime) reduction(+ : sum)
    for (long i = 0; i < N; i++) sum += work(i);      /* N = 40000 */
```
::: solution
```console
$ OMP_NUM_THREADS=1 ./sched
2.767 s  (sum 23687.045201)
$ for s in static static,1 dynamic dynamic,64 guided; do
>   printf "%-11s" $s; OMP_NUM_THREADS=16 OMP_SCHEDULE=$s ./sched; done
static     0.356 s  (sum 23687.045201)
static,1   0.187 s  (sum 23687.045201)
dynamic    0.182 s  (sum 23687.045201)
dynamic,64 0.186 s  (sum 23687.045201)
guided     0.183 s  (sum 23687.045201)
```

*Prediction for static.* Thread $15$ gets the last block, $i = 37{,}500, \dots, 39{,}999$, with total cost $2500 \times (37{,}500 + 39{,}999)/2 \approx 9.69 \times 10^7$ steps out of $N(N - 1)/2 \approx 8.00 \times 10^8$, that is $12.1\%$ of the work, where a fair share is $1/16 = 6.25\%$. Everyone waits for thread $15$, so we predict $0.121 \times 2.767 \approx 0.335$ s, close to the measured $0.356$ s. In general the last of $p$ blocks of a linearly growing loop holds a fraction $(2p - 1)/p^2$ of the work, so static scheduling is $2 - 1/p$ times slower than perfect balance (the figure below).

The other schedules all come within $6\%$ of the ideal $2.767/16 = 0.173$ s. `static,1` deals iterations round robin, so each thread gets a mix of cheap and expensive iterations — a static schedule that happens to suit this cost pattern. The dynamic and guided schedules adapt to any pattern, as [[#thm-graham]] promises.
:::
:::

::: widget plot
f: 2 - 1/x; 1
x: 1, 64
y: 0, 2.2
labels: \text{static, block: } T_p \text{ / ideal}; \text{perfect balance}
points: 16,2.06
caption: The cost of a block-static schedule on a loop whose iteration $i$ costs time proportional to $i$: the last thread's block holds a fraction $(2p-1)/p^2$ of the work, so the loop takes $2 - 1/p$ times as long as a perfectly balanced one. The dot is the measurement of [[#ex-schedules]] ($0.356$ s against an ideal $0.173$ s). Notice that the penalty approaches $2$ quickly — load imbalance does not go away with more threads, it gets worse.
:::

The price of dynamic scheduling shows when iterations are tiny. The $\pi$ loop, whose iterations take a few nanoseconds each, with $16$ threads:

```console
$ for s in static dynamic dynamic,1000 guided; do
>   printf "%-13s" $s; OMP_NUM_THREADS=16 OMP_SCHEDULE=$s ./tiny; done
static       0.033 s  (pi 3.1415926536)
dynamic      3.961 s  (pi 3.1415926536)
dynamic,1000 0.033 s  (pi 3.1415926536)
guided       0.034 s  (pi 3.1415926536)
```

With chunks of one iteration, every iteration costs an atomic increment of a counter shared by sixteen cores, and the cache line holding the counter moves between cores on every increment ([[parallel-computing/memory-consistency]]): the loop becomes $120$ times slower. Chunks of $1000$ amortise the cost completely. Choose chunks large enough that taking one costs much less than executing it, and small enough that $c_{\max}$ in [[#eq-graham]] is small compared with $W/p$.

::: quiz
In the loop `#pragma omp parallel for` followed by `for (i = 0; i < n; i++) { t = a[i] * 2; b[i] = t + c; }`, with `int t, c;` declared before the loop, which statements are true?
- [x] `t` is shared by default, so the loop has a data race; it should be declared inside the loop body or listed in `private(t)`.
- [x] `c` is only read, so sharing it is safe.
- [ ] `i` is shared by default, so the threads interfere in updating it.
- [ ] Adding `schedule(dynamic)` would remove the race on `t`.
::: solution
Variables declared before a parallel region are shared unless a clause says otherwise, so all threads write the same `t` and one thread can overwrite another's `t` between its assignment and its use. Declaring `int t` inside the loop body makes it private automatically. Concurrent reads of an unchanging shared variable such as `c` are not a race. The index of a `parallel for` loop is private by rule. A schedule changes which thread runs which iteration, not the sharing of variables.
:::
:::

## Reductions

A **reduction** combines many values into one with a binary operator: a sum, a product, a maximum, a logical "and". The `reduction(+ : sum)` clause gives each thread a private copy of `sum` initialised to the operator's identity ($0$ for $+$), lets each thread accumulate its iterations into its copy, and combines the copies into the original at the end of the loop. That is exactly the pthreads program of [[#ex-pthreads]], written by the compiler. When is this transformation correct?

::: theorem Reductions need associativity {#thm-reduction}
Let $\oplus$ be an associative operation on a set $M$ with identity element $e$ (so $(M, \oplus, e)$ is a **monoid**). Split the sequence $x_1, \dots, x_n$ into consecutive blocks $B_1, \dots, B_p$ (some possibly empty), and let $s_k$ be the $\oplus$-combination of the elements of $B_k$ in order ($e$ for an empty block). Then

$$
s_1 \oplus s_2 \oplus \dots \oplus s_p = x_1 \oplus x_2 \oplus \dots \oplus x_n,
$$

where the right-hand side is evaluated left to right, as a sequential loop would. If $\oplus$ is also commutative, the same holds when the elements are assigned to the $p$ partial results in any way and the partial results are combined in any order.
:::

::: proof
By associativity, any two bracketings of the same sequence of elements in the same order have the same value; this is the **generalised associative law**, proved by induction on the length $n$. For $n \le 2$ there is only one bracketing. For $n \ge 3$, every bracketing has the form $L \oplus R$, where $L$ brackets $x_1, \dots, x_k$ and $R$ brackets $x_{k+1}, \dots, x_n$ for some $k$. By the induction hypothesis $L$ equals the left-to-right combination $\ell_k$ of $x_1, \dots, x_k$ and $R$ equals $x_{k+1} \oplus r$, where $r$ is the left-to-right combination of the rest (if $k + 1 < n$; otherwise $R = x_n$). Then $L \oplus R = \ell_k \oplus (x_{k+1} \oplus r) = (\ell_k \oplus x_{k+1}) \oplus r = \ell_{k+1} \oplus r$, a bracketing with a longer left part; repeating, we reach the left-to-right combination. The block decomposition $s_1 \oplus \dots \oplus s_p$ is one bracketing (empty blocks contribute $e$, which changes nothing), so it equals the sequential result.

With commutativity as well, any rearrangement of the elements gives the same value, because a product of adjacent transpositions reaches any order and each transposition $a \oplus b = b \oplus a$ inside a bracketing preserves the value. So an arbitrary assignment of elements to partial results and an arbitrary order of combination give the same result.
:::

OpenMP does not specify the order in which the partial results are combined, nor (for most schedules) which iterations each thread gets, so a reduction operator must be associative and commutative. Sums, products, `min`, `max`, `&&`, `||`, bitwise operations and set union qualify; subtraction does not (OpenMP's `reduction(- : x)` actually adds), and neither does string concatenation, which is associative but not commutative. Arrays can be reduced element by element: `reduction(+ : hist[:256])` gives each thread a private histogram ([[#ex-histogram]]). User-defined reductions (`declare reduction`) extend the clause to other monoids. In [[parallel-computing/parallel-algorithms]] the same theorem justifies tree-shaped reductions and prefix sums.

::: warning Floating-point reductions are not reproducible {#warn-fp}
Floating-point addition is commutative but **not associative**: $(10^{20} + (-10^{20})) + 1 = 1$, but $10^{20} + ((-10^{20}) + 1) = 0$, because $-10^{20} + 1$ rounds to $-10^{20}$ ([[computer-systems/floating-point]]). So [[#thm-reduction]] does not apply, and a parallel floating-point sum depends on how the terms were grouped — on the number of threads and the schedule:

```console
$ for p in 1 2 4 8 16 32 36; do OMP_NUM_THREADS=$p ./pi_omp; done   # 10^9 strips
p= 1  pi = 3.141592653589971  4.343 s
p= 2  pi = 3.141592653589901  2.260 s
p= 4  pi = 3.141592653589821  1.289 s
p= 8  pi = 3.141592653589769  0.644 s
p=16  pi = 3.141592653589833  0.322 s
p=32  pi = 3.141592653589757  0.162 s
p=36  pi = 3.141592653589822  0.152 s
```

The true value is $3.14159265358979\ldots$; every result is wrong in the last few digits, and the parallel ones are not worse — summing in blocks is often *more* accurate than one long running sum, whose rounding errors accumulate. But they differ from one another, which breaks bit-for-bit regression tests and makes bugs hard to reproduce. If you need reproducible results, fix the number of threads and use a static schedule (the OpenMP standard then guarantees the same assignment of iterations, though not the combining order), or sum in a fixed tree, or use compensated or exact accumulation.
:::

## Tasks

Loops cover regular parallelism. Recursive algorithms — divide and conquer, tree traversals, graph searches — need **tasks**: units of work created dynamically and executed by whichever thread is free. OpenMP 3.0 (2008) added them.

::: definition OpenMP tasks {#def-task}
A `task` construct creates a **task**: the enclosed block together with its data environment (variables are `firstprivate` by default if not shared in the enclosing context). The task may be executed immediately or deferred and executed later by any thread of the team. `taskwait` suspends the current task until all the child tasks it has created so far have completed. A `task` with an `if(false)` clause is executed immediately by the creating thread. Tasks are usually created inside a `parallel` region by one thread (`single`), while the other threads of the team wait at the region's barrier and execute tasks as they become available.
:::

A `task` is a *spawn* and a `taskwait` a *sync* in the sense of the work–span model ([[parallel-computing/performance-laws#def-work-span]]), so we can analyse task programs exactly as in that chapter.

::: example Fibonacci with tasks and a cutoff {#ex-fib-tasks}
Implement the parallel Fibonacci function of [[parallel-computing/performance-laws#ex-fib]] with OpenMP tasks. Below a **cutoff** $n < c$, call a sequential version instead of creating tasks. Measure the effect of $c$.
::: solution
```c
static int cutoff;

static long fib_seq(int n) { return n < 2 ? n : fib_seq(n - 1) + fib_seq(n - 2); }

static long fib(int n) {
    if (n < cutoff) return fib_seq(n);       /* small problems: no tasks */
    long a, b;
    #pragma omp task shared(a)               /* child task computes fib(n-1) */
    a = fib(n - 1);
    b = fib(n - 2);                          /* this task computes fib(n-2) */
    #pragma omp taskwait                     /* join: wait for the child */
    return a + b;
}
...
    #pragma omp parallel
    #pragma omp single                       /* one thread starts the recursion */
    r = fib(n);
```

`a` must be `shared` in the task; otherwise the child would assign to its own private copy and the parent would read an uninitialised variable. Observations on our machine:

```console
$ OMP_NUM_THREADS=1 ./fib 35 2;  OMP_NUM_THREADS=32 ./fib 35 2
p= 1 cutoff= 2  fib(35) = 9227465  1.345 s
p=32 cutoff= 2  fib(35) = 9227465  36.405 s
$ OMP_NUM_THREADS=1 ./fib 45 100                     # never creates a task
p= 1 cutoff=100  fib(45) = 1134903170  2.491 s
$ for c in 20 25 30 35; do OMP_NUM_THREADS=32 ./fib 45 $c; done
p=32 cutoff=20  fib(45) = 1134903170  0.727 s
p=32 cutoff=25  fib(45) = 1134903170  0.189 s
p=32 cutoff=30  fib(45) = 1134903170  0.193 s
p=32 cutoff=35  fib(45) = 1134903170  0.175 s
```

Without a cutoff ($c = 2$), almost every call creates a task, and each task does a few nanoseconds of work but costs hundreds of nanoseconds to create, enqueue and dequeue. With $32$ threads it is *$27$ times slower* than with one: GCC's OpenMP runtime (libgomp) keeps the team's tasks in a shared queue protected by a lock, and $32$ threads fighting over it serialise completely. With $c = 25$ to $35$, the program creates between $232$ and $28{,}656$ tasks, each doing at least microseconds of work, and $32$ threads are about $13$ to $14$ times faster than the purely sequential $2.491$ s. The parallelism of the task DAG is still enormous ([[parallel-computing/performance-laws#ex-fib]]); what limits the speed-up now is the cost of the remaining task operations, the frequency drop with $32$ active cores, and other jobs on the machine.
:::
:::

::: widget graph
nodes: f5@3,4; f4@1.5,3; f3a@4.5,3; f3b@0.5,2; f2a@2.5,2; f2b@3.8,2; f1a@5.2,2; f2c@0,1; f1b@1,1; f1c@2,1; f0a@3,1; f1d@3.5,1; f0b@4.2,1; f1e@-0.5,0; f0c@0.5,0
edges: f5>f4; f5>f3a; f4>f3b; f4>f2a; f3a>f2b; f3a>f1a; f3b>f2c; f3b>f1b; f2a>f1c; f2a>f0a; f2b>f1d; f2b>f0b; f2c>f1e; f2c>f0c
algorithm: dfs
start: f5
caption: The call tree of $\mathrm{fib}(5)$ without a cutoff: each node is a call, and each call with $n \ge 2$ spawns its left child as a task and computes its right child itself. Step through depth-first search — the order in which *one* thread executes the calls — and notice that the tree has $15$ nodes but only $5$ levels: work grows like $\varphi^n$ and span like $n$. A cutoff $c$ replaces every subtree rooted at $n < c$ by one sequential call, removing almost all the nodes while keeping the levels that matter for parallelism.
:::

### Work stealing

How should a runtime execute tasks? A single shared queue, as in the experiment above, is simple but becomes a bottleneck. The dominant design gives each thread its own queue and moves work only when a thread runs out.

::: algorithm Work stealing {#alg-work-stealing}
Each of the $p$ worker threads owns a **deque** (double-ended queue) of ready tasks.

1. When a worker spawns a task, it pushes it onto the *bottom* of its own deque (in the work-first variant used by Cilk, it pushes the *continuation* of the current task and starts executing the child at once).
2. When a worker finishes its current task, it pops the next task from the *bottom* of its own deque — the most recently spawned, so execution order locally is that of the sequential program.
3. When a worker's deque is empty, it becomes a **thief**: it chooses another worker uniformly at random and tries to steal the task at the *top* of that worker's deque — the oldest one, which in a divide-and-conquer computation is typically the largest piece of work. It repeats until it succeeds or the computation ends.
:::

The owner and the thieves work at opposite ends, so they rarely conflict: the owner's push and pop need no lock in the common case, and only a steal, or a pop of the last task, needs an atomic compare-and-swap (the Chase–Lev deque, 2005, is the standard lock-free implementation; [[parallel-computing/concurrent-data-structures]] explains compare-and-swap). When every worker has work, there is no communication at all. Stealing the oldest task moves large pieces of work, so steals are rare.

::: theorem Work stealing is efficient (Blumofe and Leiserson, 1999) {#thm-work-stealing}
For a fully strict computation (every task's children join with it, as in fork–join programs) with work $T_1$ and span $T_\infty$, the randomised work-stealing scheduler on $p$ processors runs in expected time

$$
\E[T_p] = \frac{T_1}{p} + O(T_\infty),
$$

performs $O(p\,T_\infty)$ steal attempts in expectation, and uses at most $p$ times the stack space of the sequential execution.
:::

::: remark Why the theorem holds
We do not reproduce the proof, which is in Blumofe and Leiserson's paper and in Herlihy and Shavit's book; here is its structure. At each step every processor either works on a task or attempts a steal. Working steps total $T_1$, contributing $T_1/p$ to the time. The proof bounds the steal attempts: it assigns each ready task a potential that decreases geometrically with its depth in the DAG, shows that the task at the top of a deque holds a constant fraction of that deque's potential, and that any $p$ consecutive random steal attempts hit each deque's top with constant probability, removing a constant fraction of the total potential. Since the initial potential is exponential in $T_\infty$, $O(p\,T_\infty)$ steal attempts suffice in expectation, contributing $O(T_\infty)$ to the time. The result matches Brent's bound ([[parallel-computing/performance-laws#thm-brent]]) up to the constant in the $T_\infty$ term, with a fully decentralised scheduler.
:::

Work stealing is the scheduler of Cilk and OpenCilk, Intel's oneTBB, Java's `ForkJoinPool` (and hence parallel streams), .NET's task library, Rust's Rayon and Go's goroutine scheduler (all as of 2026). LLVM's OpenMP runtime uses per-thread task queues with stealing; libgomp, as we saw, uses a shared queue — one reason to set a cutoff whatever the runtime.

## Processes in Python

CPython, the standard Python implementation, has a **global interpreter lock** (GIL): only one thread at a time executes Python bytecode. Threads still help programs that wait for input and output — the lock is released while a thread waits — but they cannot speed up computation in Python code. The standard workaround is to use processes, each with its own interpreter and its own lock, communicating by pickling arguments and results through pipes.

::: example Counting primes with threads and with processes {#ex-python}
Count the primes below $2 \times 10^6$ by trial division, split into $64$ equal ranges, sequentially, with $8$ threads, and with $8$ and $32$ processes.
::: solution
```python
import time
from concurrent.futures import ThreadPoolExecutor
from multiprocessing import Pool

def count_primes(bounds):
    """Number of primes in [lo, hi), by trial division (deliberately CPU-heavy)."""
    lo, hi = bounds
    count = 0
    for n in range(max(lo, 2), hi):
        d = 2
        while d * d <= n and n % d:
            d += 1
        count += d * d > n
    return count

def chunks(n, k):                       # k equal-width pieces of [0, n)
    step = n // k
    return [(i * step, n if i == k - 1 else (i + 1) * step) for i in range(k)]

if __name__ == "__main__":
    N, K = 2_000_000, 64                # 64 chunks: more pieces than workers
    for name, make, p in (("serial", None, 1), ("threads", ThreadPoolExecutor, 8),
                          ("processes", Pool, 8), ("processes", Pool, 32)):
        t0 = time.perf_counter()
        if make is None:
            total = sum(map(count_primes, chunks(N, K)))
        else:
            with make(p) as ex:
                total = sum(ex.map(count_primes, chunks(N, K)))
        print(f"{name:9} p={p:2}  {total} primes  {time.perf_counter() - t0:.2f} s")
```

```console
$ python3 primes_mp.py
serial    p= 1  148933 primes  13.75 s
threads   p= 8  148933 primes  13.16 s
processes p= 8  148933 primes  2.31 s
processes p=32  148933 primes  0.70 s
```

(Python 3.14 with the GIL enabled, the default build; observations on our machine.) Eight threads are no faster than one: they take turns holding the GIL. Eight processes are $6.0$ times faster and $32$ processes $19.6$ times. The ranges are not equally expensive — trial division costs about $\sqrt{n}$ for a prime $n$ — so splitting into $64$ pieces rather than $p$, and letting `map` hand them out as workers become free, is list scheduling ([[#thm-graham]]). The `if __name__ == "__main__"` guard is required: on platforms that start workers by launching a fresh interpreter, each worker imports the main module, and without the guard it would start a pool of its own.
:::
:::

Processes cost more than threads: each needs its own interpreter, and every argument and result is copied. Parallelise in Python at a coarse grain — seconds of work per task — or move the inner loop into compiled code (NumPy and many native libraries release the GIL while they compute). Python 3.13 introduced an optional **free-threaded** build without the GIL (PEP 703, 2024), officially supported from 3.14 but not the default (as of 2026); in it, threads can run Python code in parallel, and every race of this chapter becomes possible in Python too.

::: history
Shared-memory multiprocessors were programmed in the 1980s with vendor-specific threads and compiler directives, each different. POSIX threads were standardised in 1995 (IEEE 1003.1c). The OpenMP Architecture Review Board, formed by hardware and compiler vendors, published OpenMP 1.0 for Fortran in 1997 and for C and C++ in 1998; tasks arrived in OpenMP 3.0 (2008), SIMD and accelerator directives in 4.0 (2013), and OpenMP 6.0 appeared in 2024. Ronald Graham's list-scheduling bound dates from 1966. Work stealing was used in Burton and Sleep's functional-language work (1981) and in Robert Halstead's Multilisp (1984); Robert Blumofe and Charles Leiserson proved its efficiency (FOCS 1994, *Journal of the ACM* 1999), and their Cilk language (MIT, 1995) made it practical, followed by Intel's Threading Building Blocks (2006), Java's fork/join framework (Doug Lea, 2000; in Java 7, 2011) and Cilk Plus. David Chase and Yossi Lev published their lock-free work-stealing deque in 2005. Python's `multiprocessing` module (PEP 371) entered the standard library in Python 2.6 (2008).
:::

## Where this leads

The reduction of [[#thm-reduction]] becomes the tree reduction and prefix sum of [[parallel-computing/parallel-algorithms]], which also designs parallel sorting and graph algorithms whose DAGs give work stealing plenty of parallelism. The slow `critical` and `atomic` loops, and the dynamic schedule with chunks of one, were slow for a reason this chapter did not explain: the cache line holding a shared variable must move between cores at every update. [[parallel-computing/memory-consistency]] explains cache coherence, false sharing and memory ordering, and [[parallel-computing/concurrent-data-structures]] builds shared data structures that scale. OpenMP's `simd` directive and the vector units it targets are in [[parallel-computing/performance-engineering]].

::: summary
- Shared-memory programs follow the **fork–join** pattern; POSIX threads make the programmer partition work and combine results by hand ([[#ex-pthreads]]), and **OpenMP** directives let the compiler do it ([[#def-openmp]]).
- Variables declared outside a parallel region are **shared** by default; unprotected updates of shared variables are data races with undefined behaviour — in our experiment, $\pi = 0.23$. Use `default(none)` to make sharing explicit.
- Loop **schedules**: `static` for uniform iterations, `dynamic`/`guided` for uneven ones. Dynamic scheduling is list scheduling, within $c_{\max}$ of perfect balance (**Graham's bound**, [[#thm-graham]]); a block-static schedule was $2.06$ times slower than ideal on a triangular loop ([[#ex-schedules]]), and chunks of one iteration made a fine-grained loop $120$ times slower.
- A **reduction** is correct for an associative and commutative operator with an identity ([[#thm-reduction]]); private partial sums beat `critical` and `atomic` updates by orders of magnitude. Floating-point reductions are not reproducible across thread counts.
- **Tasks** express recursive parallelism; a **cutoff** is essential — without one, fine-grained tasks made Fibonacci $27$ times slower on $32$ threads than on one ([[#ex-fib-tasks]]).
- **Work stealing** — per-thread deques, owners at the bottom, random thieves at the top — runs in expected time $T_1/p + O(T_\infty)$ ([[#thm-work-stealing]]).
- In CPython the GIL prevents threads from running Python code in parallel; use `multiprocessing` with coarse tasks ([[#ex-python]]).
:::

## Exercises

::: exercise Which iterations? {level=1 check="375"}
A loop of $1000$ iterations ($i = 0, \dots, 999$) runs under `schedule(static)` with $8$ threads, and the implementation divides the iterations into blocks of $\lceil 1000/8 \rceil$. Which is the first iteration executed by thread $3$ (threads are numbered from $0$)? (Enter $i$.) Under `schedule(static, 10)`, which thread executes iteration $i = 255$?
::: solution
Blocks of $125$: thread $0$ gets $0$–$124$, thread $1$ $125$–$249$, thread $2$ $250$–$374$, thread $3$ $375$–$499$. The answer is $375$. With `static, 10`, chunks of $10$ are dealt round robin: iteration $255$ is in chunk $\lfloor 255/10 \rfloor = 25$, which goes to thread $25 \bmod 8 = 1$.
:::
:::

::: exercise Counting tasks {level=1 check="4"}
The function `fib` of [[#ex-fib-tasks]] is called as `fib(10)` with `cutoff = 8`. How many tasks does it create? (Enter the number.)
::: solution
Every call with $n \ge 8$ creates exactly one task (for `fib(n-1)`); calls with $n < 8$ create none. The calls with $n \ge 8$ are: `fib(10)`; its children `fib(9)` and `fib(8)`; and `fib(9)`'s children `fib(8)` and `fib(7)` — of which only `fib(8)` counts. So the calls with $n \ge 8$ are `fib(10)`, `fib(9)`, `fib(8)`, `fib(8)`: $4$ tasks. In general the number of calls with argument at least $c$ grows like $\varphi^{n - c}$, so each increase of the cutoff by one divides the number of tasks by about $1.6$.
:::
:::

::: exercise Classify the variables {level=1}
In the following region, say for each of `a`, `n`, `i`, `t`, `best` and `tmp` whether it is shared or private, whether there is a data race, and how to fix any race.

```c
double a[N], best = -1e300, tmp;
int n = N;
#pragma omp parallel for
for (int i = 0; i < n; i++) {
    double t = f(a[i]);
    tmp = t * t;
    if (tmp > best) best = tmp;
}
```
::: solution
`a`, `n`, `best` and `tmp` are declared outside the region, so they are shared; `i` (the loop index) and `t` (declared inside) are private. `a` and `n` are only read: no race. `tmp` is written by all threads: a race — declare it inside the loop or add `private(tmp)`. `best` is read and written by all threads: a race, and the classic check-then-act bug (two threads can both see `tmp > best` and the smaller value can be written last). Fix it with `reduction(max : best)`, available for C since OpenMP 3.1, which gives each thread a private maximum initialised to the smallest representable value and combines them at the end.
:::
:::

::: exercise The static-schedule penalty {level=2 check="15/8"}
A loop's iteration $i$ costs time proportional to $i$, for $i = 0, \dots, N - 1$ with $N$ large. Under a block-static schedule with $p = 8$ threads, by what factor is the loop slower than with perfect load balance? (Enter the factor, ignoring terms of order $1/N$.)
::: solution
The last block covers $i \in [7N/8, N)$, of total cost about $\frac{1}{2}(N^2 - (7N/8)^2) = \frac{N^2}{2}\cdot\frac{15}{64}$. Perfect balance gives each thread $\frac{N^2}{2}\cdot\frac{1}{8}$. The ratio is $\frac{15/64}{1/8} = \frac{15}{8} = 1.875$, which is $2 - 1/p$ for $p = 8$, as in the figure of [[#ex-schedules]].
:::
:::

::: exercise Why the racy sum was 0.23 {level=2}
In the opening experiment, the racy loop printed $\pi \approx 0.2316$ with $16$ threads. Explain the value quantitatively, assuming each thread keeps its running sum in a register and stores it to `sum` only once at the end of its block. Which block's thread must have stored last?
::: solution
If each thread loads `sum` ($0$) at the start, accumulates its own block's terms in a register and stores the result at the end, then the final value is the partial sum of the thread that stored last, times $h$. Thread $t$'s block covers $x \in [t/16, (t+1)/16)$, and its contribution to the integral is $\int_{t/16}^{(t+1)/16} \frac{4}{1+x^2}\,dx = 4(\arctan\frac{t+1}{16} - \arctan\frac{t}{16})$. For $t = 15$ this is $4(\arctan 1 - \arctan 0.9375) = 4(0.785398 - 0.753151) \approx 0.1290$; for $t = 0$ it is $4\arctan 0.0625 \approx 0.2497$; for $t = 1$, $4(\arctan 0.125 - \arctan 0.0625) \approx 0.2477$. The observed $0.2316$ matches $t = 4$: $4(\arctan 0.3125 - \arctan 0.25) = 4(0.302885 - 0.244979) \approx 0.2316$. So thread $4$ stored last. Other runs give other values. The compiler is entitled to make this transformation precisely because a data race is undefined behaviour: it may assume no other thread touches `sum`.
:::
:::

::: exercise A parallel histogram {#ex-histogram level=2}
Write an OpenMP program that hashes the integers $0, \dots, 2 \times 10^8 - 1$ into $256$ buckets (use the top $8$ bits of $i \times \texttt{0x9E3779B97F4A7C15}$) and counts the integers in each bucket. Use an array reduction. Check the total and measure the speed-up on $16$ threads. Why would `#pragma omp atomic` on each increment be a poor alternative?
::: solution
```c
#include <omp.h>
#include <stdio.h>

enum { N = 200000000, B = 256 };

int main(void) {
    static long hist[B];
    double t0 = omp_get_wtime();
    #pragma omp parallel for reduction(+ : hist[:B])   /* private copy per thread */
    for (long i = 0; i < N; i++) {
        unsigned long h = (unsigned long)i * 0x9E3779B97F4A7C15UL;  /* a hash of i */
        hist[h >> 56]++;                                 /* top 8 bits: bucket */
    }
    long total = 0, mn = N, mx = 0;
    for (int b = 0; b < B; b++) {
        total += hist[b];
        if (hist[b] < mn) mn = hist[b];
        if (hist[b] > mx) mx = hist[b];
    }
    printf("p=%2d  total %ld  min %ld  max %ld  %.3f s\n",
           omp_get_max_threads(), total, mn, mx, omp_get_wtime() - t0);
    return 0;
}
```

```console
$ for p in 1 16; do OMP_NUM_THREADS=$p ./hist; done
p= 1  total 200000000  min 781248  max 781252  0.129 s
p=16  total 200000000  min 781248  max 781252  0.015 s
```

The total is right, the buckets are almost exactly equal ($2 \times 10^8 / 256 = 781{,}250$), and the speed-up is about $8.6$ (an observation; the loop is so short that thread start-up and the final combination of $16$ histograms matter). With `atomic` increments of one shared histogram, every increment would be an atomic read–modify–write on a cache line shared with other threads; with $256$ buckets of $8$ bytes in $32$ cache lines, cores would contend constantly, as with the `atomic` $\pi$ loop that was slower than one thread. Private histograms touch shared memory only once per bucket per thread.
:::
:::

::: exercise Parallel merge sort {level=3}
Parallelise merge sort with OpenMP tasks: sort the two halves in parallel, then merge them sequentially. Use insertion sort below $32$ elements and create tasks only for subarrays of at least $10^5$ elements (`task if(...)`). Sort $5 \times 10^7$ random integers with $1$ to $32$ threads. Compute the work and span of the algorithm, and explain the speed-up you observe.
::: solution
```c
enum { SMALL = 32, TASK_CUTOFF = 100000 };

static void merge(const int *a, long n1, long n2, int *tmp) {
    long i = 0, j = n1, k = 0;
    while (i < n1 && j < n1 + n2) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i < n1) tmp[k++] = a[i++];
    while (j < n1 + n2) tmp[k++] = a[j++];
}

static void msort(int *a, long n, int *tmp) {     /* sorts a[0..n) using tmp[0..n) */
    if (n < SMALL) {                               /* tiny: insertion sort */
        for (long i = 1; i < n; i++) {
            int v = a[i]; long j = i;
            while (j > 0 && a[j - 1] > v) { a[j] = a[j - 1]; j--; }
            a[j] = v;
        }
        return;
    }
    long h = n / 2;
    #pragma omp task if (n >= TASK_CUTOFF)         /* below the cutoff: run at once */
    msort(a, h, tmp);
    msort(a + h, n - h, tmp + h);
    #pragma omp taskwait
    merge(a, h, n - h, tmp);                       /* sequential merge: span Theta(n) */
    memcpy(a, tmp, n * sizeof *a);
}
```

The main program fills the array from a linear congruential generator, calls `msort` inside `parallel` and `single`, and checks that the result is sorted. Observations on our machine:

```console
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./msort; done
p= 1  n=50000000  sorted in 6.689 s
p= 2  n=50000000  sorted in 3.619 s
p= 4  n=50000000  sorted in 3.183 s
p= 8  n=50000000  sorted in 2.008 s
p=16  n=50000000  sorted in 1.596 s
p=32  n=50000000  sorted in 1.272 s
```

*Analysis.* The work is that of sequential merge sort, $T_1(n) = 2T_1(n/2) + \Theta(n) = \Theta(n \log n)$. The halves run in parallel but the merge does not, so $T_\infty(n) = T_\infty(n/2) + \Theta(n) = \Theta(n)$ — dominated by the final merge and copy of all $n$ elements. The parallelism is $\Theta(\log n)$. More concretely, if merging and copying $m$ elements costs $cm$, each of the $\log_2(n/32) \approx 20.6$ levels above the insertion sorts costs about $cn$ in total, so $T_1 \approx 20.6\,cn$, while the span is $c(n + n/2 + n/4 + \dots) \approx 2cn$: a parallelism of only about $10$. The measured speed-up of $5.3$ on $32$ threads is consistent with this: the last merge alone, of $5 \times 10^7$ elements, takes a few hundred milliseconds whatever $p$ is. Brent's theorem predicts a plateau once $p$ exceeds the parallelism. To do better, the merge itself must be parallel: [[parallel-computing/parallel-algorithms]] gives a parallel merge with span $O(\log^2 n)$, raising the parallelism to $\Theta(n/\log n)$.
:::
:::

::: exercise Guided scheduling {level=3}
Under `schedule(guided)` with $p$ threads, suppose each chunk has size $\lceil R/p \rceil$, where $R$ is the number of iterations remaining when the chunk is taken (and the minimum chunk size is $1$). Show that the number of chunks for a loop of $N$ iterations is at most about $p\ln(N/p) + p$, compared with $N/c$ for `dynamic, c`. Why does guided scheduling still balance well at the end of the loop?
::: solution
Each chunk removes at least $R/p$ iterations, so after a chunk the remaining count is at most $R(1 - 1/p)$. After $k$ chunks, $R_k \le N(1 - 1/p)^k \le N e^{-k/p}$, using $1 - x \le e^{-x}$. Once $R_k \le p$, every remaining chunk has size $1$ and there are at most $p$ of them. $R_k \le p$ as soon as $N e^{-k/p} \le p$, that is $k \ge p\ln(N/p)$. So the number of chunks is at most about $p\ln(N/p) + p$ — for $N = 10^6$ and $p = 16$, about $16 \times 11.0 + 16 \approx 193$, against $10^6$ for `dynamic, 1` — so the cost of taking chunks is negligible. At the end of the loop the chunks are small (size about $R/p$, falling to $1$), so by the argument of [[#thm-graham]] the last chunk to finish is short and the threads finish nearly together. Guided scheduling can still go wrong when the *early* iterations are the expensive ones: the first chunk, $N/p$ iterations, may then hold far more than $1/p$ of the work.
:::
:::
