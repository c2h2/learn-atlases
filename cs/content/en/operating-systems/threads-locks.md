Here is a C program in which two threads each add one to a shared counter a million times:

```c
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

static volatile long counter = 0;          /* shared; volatile keeps each ++ in memory */

static void *work(void *arg) {
    long n = *(long *)arg;
    for (long i = 0; i < n; i++)
        counter++;                           /* load, add, store: not atomic */
    return NULL;
}

int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 1000000;
    pthread_t a, b;
    pthread_create(&a, NULL, work, &n);
    pthread_create(&b, NULL, work, &n);
    pthread_join(a, NULL);
    pthread_join(b, NULL);
    printf("expected %ld, got %ld\n", 2 * n, counter);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o race race.c
$ ./race; ./race; ./race
expected 2000000, got 1016775
expected 2000000, got 1022792
expected 2000000, got 1003549
$ ./race 1000
expected 2000, got 2000
```

Half the increments vanished, and the number lost is different on every run. With a thousand increments per thread the answer is right — each thread finishes before the other has properly started — which is exactly why such bugs survive testing. The output of this program is **nondeterministic**: your numbers will differ.

This chapter explains what went wrong and how to prevent it. We define threads and see why they are useful and cheap; analyse the **race condition** above precisely; state what a solution to the **critical-section problem** must guarantee; prove correct a purely software solution, Peterson's algorithm — and then watch it fail on a real x86 processor; and build **locks** from the atomic instructions that hardware provides, from a test-and-set spin lock through the fair ticket lock to the futex-based mutex that `pthread_mutex_lock` actually is. [[operating-systems/synchronisation]] continues with waiting for conditions, semaphores and deadlock.

Programs were compiled with GCC 15.2 as `gcc -std=c17 -Wall -Wextra -O2 -pthread` on the 36-core test machine. Every concurrent program in this chapter has nondeterministic timing, and those with bugs have nondeterministic results; the outputs shown are real runs.

## Threads

::: definition Thread {#def-thread}
A **thread** is a single sequential flow of control within a process. Each thread has its own program counter, registers and stack (and its own thread-local storage); all threads of a process share its address space — code, global variables, heap — and its open files, signal handlers and credentials. A process with one thread is the process of [[computer-systems/exceptions-processes#def-process]].
:::

Threads exist for two reasons. **Parallelism**: a computation divided between threads can run on several cores at once — a single process with $36$ threads can use the whole test machine. **Overlapping waiting**: a server can serve one client while another thread is blocked reading from the disk or the network, without contorting its code into a state machine. Processes could do both, but threads are cheaper and communicate simply by reading and writing shared memory.

The POSIX threads interface (`pthread_create`, `pthread_join`, `pthread_exit`) is used in the listing above. On Linux each thread is a separate kernel **task**, created by the `clone` system call with flags such as `CLONE_VM` (share the address space), `CLONE_FILES` and `CLONE_SIGHAND` — `fork` is essentially `clone` without them. This **one-to-one** model lets the kernel schedule threads on different cores and block one without blocking the others. **User-level** threads (green threads, coroutines, goroutines) are multiplexed by a runtime library onto fewer kernel threads; they switch faster, without system calls, but need care so that one blocking call does not stall them all.

::: example Threads are cheaper than processes {#ex-create}
Measure the cost of creating and joining a thread that does nothing, and of forking and reaping a child that exits immediately, in a process that has 100 MiB of memory in use.

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <time.h>
#include <unistd.h>

static void *nothing(void *arg) { return arg; }

static double now(void) {
    struct timespec t;
    clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + t.tv_nsec * 1e-9;
}

int main(void) {
    enum { N = 10000 };
    char *big = malloc(100 << 20);             /* 100 MiB that fork must map */
    for (long i = 0; i < (100 << 20); i += 4096) big[i] = 1;
    double t0 = now();
    for (int i = 0; i < N; i++) {
        pthread_t t;
        pthread_create(&t, NULL, nothing, NULL);
        pthread_join(t, NULL);
    }
    double t1 = now();
    for (int i = 0; i < N; i++) {
        pid_t p = fork();
        if (p == 0) _exit(0);
        waitpid(p, NULL, 0);
    }
    double t2 = now();
    printf("thread create+join: %5.1f us\n", (t1 - t0) / N * 1e6);
    printf("fork+wait:          %5.1f us\n", (t2 - t1) / N * 1e6);
    free(big);
    return 0;
}
```
::: solution
```console
$ ./create
thread create+join:  44.1 us
fork+wait:          3988.5 us
```
A thread costs about $44$ µs here, a fork about $4$ ms — ninety times more (an **observation**; both numbers vary with the machine and its load). The difference is the address space. The new thread shares it, so the kernel allocates only a task structure and the C library a stack. The fork must copy the page tables of the 100 MiB heap — $25{,}600$ page-table entries, each marked copy-on-write ([[operating-systems/page-replacement]]) — and then tear them down again when the child exits. A process that does nothing but `exec` immediately afterwards wastes that work, which is why `posix_spawn` and `vfork` exist.
:::
:::

## Race conditions

Why did the counter lose updates? The statement `counter++` compiles to three instructions. `objdump -d race` shows the loop body:

```text
mov    0x2d51(%rip),%rax        # load counter into a register
add    $0x1,%rax                # add one to the register
mov    %rax,0x2d42(%rip)        # store the register back to counter
```

::: example A lost update, step by step {#ex-lost-update}
The counter holds $41$. Show an execution of the three instructions by threads A and B after which it holds $42$, although both incremented it.
::: solution
Each thread has its own `%rax` (registers are per-thread), but `counter` is shared. If both threads load the same value before either stores, both store that value plus one, and one increment is lost:

| step | thread A | thread B | counter |
|---|---|---|---|
| 1 | load counter → `%rax` $= 41$ | | 41 |
| 2 | | load counter → `%rax` $= 41$ | 41 |
| 3 | add: `%rax` $= 42$ | | 41 |
| 4 | | add: `%rax` $= 42$ | 41 |
| 5 | store `%rax` → counter | | 42 |
| 6 | | store `%rax` → counter | 42 |

On one core this happens when a timer interrupt preempts A between its load and its store; on two cores it happens whenever the two threads' loops overlap, which is why the program above lost nearly half its increments.
:::
:::

::: definition Race condition and critical section {#def-race}
A **race condition** occurs when the result of a computation depends on the relative timing or interleaving of its threads. A **data race** is the specific case in which two threads access the same memory location concurrently, at least one access is a write, and nothing orders them; in C (since C11) and C++, a program with a data race on ordinary variables has **undefined behaviour**. A **critical section** is a piece of code that accesses shared data and must not be executed by more than one thread at a time.
:::

To reason about races we model each thread as a sequence of **atomic steps** (here, instructions) and an execution as an **interleaving**: a merge of the threads' sequences that preserves the order within each thread. The scheduler and the hardware can produce any interleaving, so a correct program must be correct for all of them.

::: proposition Counting interleavings {#prop-interleavings}
Two threads executing $a$ and $b$ atomic steps have $\binom{a+b}{a}$ interleavings. For two threads each executing the three steps load, add, store of `counter++` starting from $0$, exactly $2$ of the $\binom{6}{3} = 20$ interleavings leave the counter at $2$; the other $18$ leave it at $1$.
:::

::: proof
An interleaving is determined by choosing which $a$ of the $a + b$ positions belong to the first thread; the rest belong to the second, in its own order. For the counter: if each thread's load occurs before the other's store, both load $0$ and both store $1$. Otherwise one thread, say A, stores before B loads; since A's load and add precede its store, all three of A's steps precede B's load, and hence all of B's steps: the interleaving is A's three steps then B's three. That happens in exactly $2$ interleavings (A first or B first), and both give $2$. An enumeration in Python of all $20$ confirms the count.
:::

::: widget graph
nodes: 00@0,3; 10@1,3; 20@2,3; 30@3,3; 01@0,2; 11@1,2; 21@2,2; 31@3,2; 02@0,1; 12@1,1; 22@2,1; 32@3,1; 03@0,0; 13@1,0; 23@2,0; 33@3,0
edges: 00>10; 10>20; 20>30; 01>11; 11>21; 21>31; 02>12; 12>22; 22>32; 03>13; 13>23; 23>33; 00>01; 01>02; 02>03; 10>11; 11>12; 12>13; 20>21; 21>22; 22>23; 30>31; 31>32; 32>33
algorithm: bfs
start: 00
caption: Interleavings of two threads with three steps each, as paths in a grid: vertex $ij$ means thread A has executed $i$ steps and thread B $j$; a rightward edge is a step of A, a downward edge a step of B. Every path from $00$ to $33$ is an interleaving, and there are $\binom{6}{3} = 20$ of them. Step through breadth-first search and notice that all vertices with $i + j = k$ are reached together: they are the possible states after $k$ steps. Only the two paths along the edges of the grid — all of A then all of B, or the reverse — avoid the lost update.
:::

The number of interleavings grows exponentially: two threads of $50$ steps each have $\binom{100}{50} \approx 10^{29}$. Testing cannot cover them; correctness must be *argued*, by making sure that a critical section is never executed by two threads at once.

## The critical-section problem

::: definition Requirements for mutual exclusion {#def-cs-requirements}
A solution to the **critical-section problem** for $n$ threads, each of which repeatedly executes an *entry protocol*, its critical section, an *exit protocol* and other code, must satisfy:

1. **Mutual exclusion**: at most one thread is in its critical section at any time.
2. **Progress** (deadlock freedom): if no thread is in its critical section and some threads are trying to enter, one of them eventually enters; the decision cannot be postponed indefinitely, and threads outside the protocol do not take part in it.
3. **Bounded waiting** (starvation freedom): once a thread has started trying to enter, there is a bound on the number of times other threads may enter before it does.

We assume that each thread leaves its critical section in finite time, and that each thread executing the protocol keeps getting scheduled; we assume nothing about relative speeds.
:::

Two obvious attempts fail. *Strict alternation* — a shared variable `turn` and "wait until `turn` is mine; after the critical section, give the turn away" — guarantees mutual exclusion but violates progress: if the other thread never wants to enter again, I wait for ever for a turn it will never give back. *Raising flags* — each thread sets `flag[self] = 1` and then waits while `flag[other]` is set — also guarantees mutual exclusion, but if both threads set their flags before either checks, both wait for ever, violating progress. Gary Peterson's 1981 algorithm combines the two ideas.

::: algorithm Peterson's algorithm for two threads {#alg-peterson}
Shared variables: `flag[0] = flag[1] = 0`, and `turn`. Thread $i$ (with $j = 1 - i$):

```text
entry:  flag[i] ← 1           // I want to enter
        turn ← j              // but you may go first
        while flag[j] = 1 and turn = j: wait
        (critical section)
exit:   flag[i] ← 0
```
:::

::: theorem Peterson's algorithm is correct {#thm-peterson}
If every read and write of `flag` and `turn` is atomic and the operations of each thread take effect in program order (**sequential consistency**), Peterson's algorithm satisfies mutual exclusion, progress, and bounded waiting with bound $1$.
:::

::: proof
*Mutual exclusion.* Suppose both threads are in their critical sections. Each set its flag to $1$ before entering and has not reset it, so both flags are $1$. Consider the last write to `turn` before this moment; say thread $0$ wrote it last, setting `turn` $= 1$ (the other case is symmetric). Thread $0$ then passed its loop test, which it evaluated after its write of `turn`, so when it did so, either `flag[1]` $= 0$ or `turn` $= 0$. `turn` $= 0$ is impossible, since thread $0$'s write was the last one and wrote $1$. So `flag[1]` was $0$ at that test, meaning thread $1$ had not yet executed `flag[1] ← 1` — but then thread $1$ also executed `turn ← 0` afterwards, contradicting the choice of thread $0$'s write as the last. Hence they cannot both be inside.

*Progress.* Suppose thread $i$ waits for ever in its loop. Then from some point on `flag[j]` $= 1$ and `turn` $= j$ hold whenever it tests. `turn` can change only when a thread executes its entry protocol; if thread $j$ is outside the protocol, `flag[j]` $= 0$, so thread $j$ must be in the protocol. If thread $j$ is also waiting, it is waiting on `turn` $= i$, but `turn` cannot be both $i$ and $j$: one of them enters. If thread $j$ enters and leaves, it resets `flag[j]`, and if it tries again it sets `turn ← i`, which frees thread $i$.

*Bounded waiting.* While thread $i$ waits, thread $j$ can enter at most once more: when $j$ next tries to enter it sets `turn ← i`, and since $i$ is still waiting with `flag[i]` $= 1$, $j$ now waits until $i$ has been in.
:::

The proof assumed that each thread's operations happen in program order and are seen in that order by the other. Modern processors do not promise this.

::: example Peterson's algorithm fails on x86-64 {#ex-peterson-fail}
Implement Peterson's algorithm with plain loads and stores (C11 `memory_order_relaxed` atomics, which compile to ordinary `mov` instructions) protecting an ordinary counter, and run two threads of two million iterations each. Then use sequentially consistent atomics.

```c
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>

static atomic_int flag[2], turn;
#ifdef SEQ_CST                     /* sequentially consistent atomics: correct */
#define ST(x, v) atomic_store(&(x), (v))
#define LD(x)    atomic_load(&(x))
#else                              /* relaxed accesses: what plain loads and stores give */
#define ST(x, v) atomic_store_explicit(&(x), (v), memory_order_relaxed)
#define LD(x)    atomic_load_explicit(&(x), memory_order_relaxed)
#endif
static long counter;               /* ordinary variable, protected by the lock */
enum { N = 2000000 };

static void lock(int self) {
    int other = 1 - self;
    ST(flag[self], 1);             /* I want to enter */
    ST(turn, other);               /* but you go first */
    while (LD(flag[other]) && LD(turn) == other) ;
}
static void unlock(int self) { ST(flag[self], 0); }

static void *work(void *arg) {
    int self = *(int *)arg;
    for (int i = 0; i < N; i++) { lock(self); counter++; unlock(self); }
    return NULL;
}

int main(void) {
    pthread_t t[2];
    int id[2] = {0, 1};
    for (int i = 0; i < 2; i++) pthread_create(&t[i], NULL, work, &id[i]);
    for (int i = 0; i < 2; i++) pthread_join(t[i], NULL);
    printf("expected %d, got %ld\n", 2 * N, counter);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o peterson peterson.c
$ for i in 1 2 3 4 5 6; do ./peterson; done
expected 4000000, got 3999995
expected 4000000, got 3994767
expected 4000000, got 3999683
expected 4000000, got 3999989
expected 4000000, got 4000000
expected 4000000, got 3999996
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -DSEQ_CST -o peterson-sc peterson.c
$ ./peterson-sc
expected 4000000, got 4000000
```
The relaxed version loses a few increments in most runs (how many varies from run to run, and some runs lose none), so mutual exclusion is violated. The disassembly shows that the compiler kept the program order — `movl $0x1,(flag)`, then `mov %edx,(turn)`, then the loads — so the reordering is done by the processor. Each x86 core has a **store buffer**: a store is queued there and becomes visible to other cores later, while the core goes on to execute its subsequent loads. So thread $0$ can read `flag[1]` $= 0$ while its own `flag[0] ← 1` is still in its store buffer, and thread $1$ can do the same symmetrically; both enter. x86 allows exactly this reordering — a store followed by a load of a different address — and no other. With `memory_order_seq_cst` (the default for `atomic_store`) GCC emits `xchg` for the stores, which on x86 also drains the store buffer, and the algorithm is correct again; the sequentially consistent version never lost an increment in our runs.
:::
:::

::: warning `volatile` is not synchronisation
`volatile` tells the C compiler that every access to a variable must really be performed, in order with respect to other volatile accesses. It does not make `counter++` atomic (the opening program used `volatile` and lost half its updates), it does not stop the *processor* from reordering accesses ([[#ex-peterson-fail]]), and it does not order volatile accesses with respect to ordinary ones. In C11 and later, use `_Atomic` types and `<stdatomic.h>` for shared variables accessed without a lock, and use locks for everything else. Compile test builds with `-fsanitize=thread`, which reports data races it observes at run time.
:::

Peterson's algorithm also generalises poorly: $n$ threads need $\Theta(n)$ shared variables, and every software solution that uses only reads and writes needs at least $n$ of them (Burns and Lynch, 1993). Real systems use hardware help.

## Locks from atomic instructions

On a single processor, the kernel can make a sequence of instructions atomic by **disabling interrupts**: without interrupts there are no context switches. This is how early kernels protected their data, and kernels still briefly disable interrupts on the local core. It is useless for user programs (the instruction is privileged — [[operating-systems/os-structure#prop-protection]]) and insufficient on a multiprocessor, where another core is running regardless. Instead, processors provide **atomic read-modify-write instructions**, which read a memory location and write it in one indivisible step with respect to all cores:

| instruction | effect, as one atomic step | x86-64 | C11 |
|---|---|---|---|
| **test-and-set** | write 1, return the old value | `xchg` | `atomic_flag_test_and_set` |
| **fetch-and-add** | add $d$, return the old value | `lock xadd` | `atomic_fetch_add` |
| **compare-and-swap** | if the value equals `expected`, write `new`; report whether it did | `lock cmpxchg` | `atomic_compare_exchange_strong` |

ARM and RISC-V provide the same effect with a pair of instructions, **load-linked/store-conditional** (`ldxr`/`stxr`, `lr`/`sc`): the store succeeds only if no other core has written the location since the load.

::: definition Lock {#def-lock}
A **lock** (mutex) is an object with two operations: `acquire` (lock), which returns only when the calling thread holds the lock, and `release` (unlock), called by the holder, which makes it available. At most one thread holds a lock at a time. Protecting every access to shared data with the same lock — acquiring it before the critical section and releasing it after — makes the critical sections mutually exclusive.
:::

::: algorithm Test-and-set spin lock {#alg-tas}
The lock is one word, $0$ when free.

- acquire: **while** test-and-set(lock) $= 1$: do nothing (spin)
- release: lock $\gets 0$
:::

::: proposition The spin lock provides mutual exclusion and progress {#prop-tas}
If test-and-set is atomic, at most one thread holds the test-and-set lock at a time, and if the lock is free and some threads are trying, one of them acquires it. Bounded waiting is not guaranteed.
:::

::: proof
A thread holds the lock from the test-and-set that returned $0$ until its release. Suppose two threads held it at once; consider their two successful test-and-sets, which are atomic and so happen in some order. After the first, the word is $1$, and only a release sets it to $0$; there was none (both still hold it), so the second test-and-set returned $1$ — not a success. Contradiction. Progress: if the word is $0$ and threads are spinning, the next test-and-set executed by any of them returns $0$. But nothing determines *which* thread's test-and-set comes next, so a thread can lose every race for ever: there is no bound on waiting.
:::

Fairness can be restored by taking a number, as at a shop counter.

::: algorithm Ticket lock {#alg-ticket}
Two counters, `next` and `serving`, both $0$ initially.

- acquire: my $\gets$ fetch-and-add(next, 1); **while** serving $\ne$ my: spin
- release: serving $\gets$ serving $+ 1$
:::

The ticket lock grants the lock in the order of the fetch-and-adds: a thread waits only for the threads that took tickets before it — bounded waiting, with bound $n - 1$ for $n$ threads ([[#ex-ticket-proof]]).

Here are both locks, a `pthread_mutex_t`, and a lock-free `atomic_fetch_add`, each used to count to four million:

```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

static long counter;                                   /* protected by the chosen lock */
static atomic_long acounter;
static pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
static atomic_flag flag = ATOMIC_FLAG_INIT;             /* test-and-set spin lock */
static atomic_uint next_ticket, now_serving;            /* ticket lock */
static int kind;                                        /* 0 mutex 1 tas 2 ticket 3 atomic */
static long iters;

static void tas_lock(void)   { while (atomic_flag_test_and_set(&flag)) ; }
static void tas_unlock(void) { atomic_flag_clear(&flag); }
static void ticket_lock(void) {
    unsigned my = atomic_fetch_add(&next_ticket, 1);   /* take a number */
    while (atomic_load(&now_serving) != my) ;           /* wait to be called */
}
static void ticket_unlock(void) { atomic_fetch_add(&now_serving, 1); }

static void *work(void *arg) {
    (void)arg;
    for (long i = 0; i < iters; i++) {
        switch (kind) {
        case 0: pthread_mutex_lock(&m); counter++; pthread_mutex_unlock(&m); break;
        case 1: tas_lock(); counter++; tas_unlock(); break;
        case 2: ticket_lock(); counter++; ticket_unlock(); break;
        case 3: atomic_fetch_add(&acounter, 1); break;
        }
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    const char *names[] = {"mutex", "tas", "ticket", "atomic"};
    if (argc < 3) return 1;
    for (kind = 0; kind < 4 && strcmp(argv[1], names[kind]); kind++) ;
    int t = atoi(argv[2]);
    long total = argc > 3 ? atol(argv[3]) : 4000000;
    iters = total / t;                                   /* same total work */
    pthread_t th[64];
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (int i = 0; i < t; i++) pthread_create(&th[i], NULL, work, NULL);
    for (int i = 0; i < t; i++) pthread_join(th[i], NULL);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    double ns = ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / (iters * t);
    printf("%-6s %2d threads: total %ld, %5.1f ns per increment\n", names[kind], t,
           kind == 3 ? (long)acounter : counter, ns);
    return 0;
}
```

```console
$ for k in mutex tas ticket atomic; do for t in 1 2 8; do ./locks $k $t; done; done
mutex   1 threads: total 4000000,  21.6 ns per increment
mutex   2 threads: total 4000000,  90.4 ns per increment
mutex   8 threads: total 4000000,  92.9 ns per increment
tas     1 threads: total 4000000,  12.3 ns per increment
tas     2 threads: total 4000000, 106.1 ns per increment
tas     8 threads: total 4000000, 353.4 ns per increment
ticket  1 threads: total 4000000,  12.6 ns per increment
ticket  2 threads: total 4000000, 130.3 ns per increment
ticket  8 threads: total 4000000, 528.1 ns per increment
atomic  1 threads: total 4000000,   6.8 ns per increment
atomic  2 threads: total 4000000,  15.2 ns per increment
atomic  8 threads: total 4000000,  15.3 ns per increment
```

Every version is now correct: the total is always four million. The times (**observations**, and variable from run to run) teach three lessons. First, *more threads made every lock-protected version slower*, not faster: the work is entirely inside the critical section, so it is serialised, and on top of that the cache line holding the lock and the counter must move between cores on every acquisition. Second, the spin locks degrade as the number of spinners grows — each spinning test-and-set is a write that steals the cache line — and the fair ticket lock degrades most, because the lock must pass to *one particular* thread, which may not be the one whose core has the line. Third, a single atomic instruction does the job four to twenty times faster than any lock: when the critical section is a single update, use an atomic operation.

::: widget plot
f: 1/(s + (1 - s)/x)
x: 1, 36
y: 0, 36
sliders: s=0.1:0:1:0.01
labels: \text{speedup with fraction } s \text{ serialised}
points: 8,4.71
caption: Amdahl's law: if a fraction $s$ of a program's work runs inside critical sections protected by one lock (so it is serialised), $n$ threads can speed it up by at most $1/(s + (1-s)/n)$, and never by more than $1/s$. With $s = 0.1$, eight threads give at most $4.7$ times and $36$ threads $8$ times. The counting benchmark is the extreme $s = 1$: no speedup at all, and in practice a slowdown, since this model ignores the cost of moving the lock between cores. Slide $s$ towards $0$ to see why fine-grained locking matters on many-core machines.
:::

### Spinning or sleeping

A spin lock wastes the waiting thread's processor. That is acceptable when critical sections are short and every thread has its own core — the common case inside kernels. It is a disaster when there are more threads than cores. Then the thread holding the lock (or, for the ticket lock, the thread whose turn is next) may be preempted, and the waiting threads spin for whole time slices, achieving nothing:

```console
$ timeout 30 taskset -c 0-1 ./locks ticket 4 1000000; echo "status $?"
status 124
$ taskset -c 0-1 ./locks mutex 4 1000000
mutex   4 threads: total 1000000, 290.3 ns per increment
```

Four threads confined to two cores could not complete a million ticket-lock increments in $30$ seconds (`timeout` killed the program; status $124$), in two runs out of two. Each time the lock passed to a thread that was not running, the two running threads spun until a time slice — a few milliseconds — expired; at a few milliseconds per increment, a million increments would take an hour. The mutex finished in $0.3$ s.

The remedy is to **sleep** rather than spin: a thread that cannot acquire the lock asks the kernel to block it, and the releasing thread wakes it up. But a system call costs hundreds of nanoseconds ([[operating-systems/os-structure]]) — far more than an uncontended acquisition. Linux's answer is the **futex** ("fast user-space mutex", 2002): the lock is a word in user memory, manipulated with atomic instructions; the kernel is involved only when there is contention, through two operations — `FUTEX_WAIT(addr, val)` sleeps if `*addr` still equals `val` (checked atomically in the kernel, so a wake-up cannot be lost between the check and the sleep), and `FUTEX_WAKE(addr, n)` wakes up to $n$ sleepers.

::: example A futex-based mutex {#ex-futex}
Implement a mutex whose word is $0$ (unlocked), $1$ (locked, no waiters) or $2$ (locked, possibly with waiters), so that `lock` and `unlock` make no system call when there is no contention. Check it with four threads.
::: solution
```c
#define _GNU_SOURCE                        /* syscall() */
#include <linux/futex.h>
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>
#include <sys/syscall.h>
#include <unistd.h>

/* state: 0 unlocked, 1 locked, 2 locked and someone may be sleeping */
typedef struct { atomic_int state; } mutex;

static void futex(atomic_int *addr, int op, int val) {
    syscall(SYS_futex, addr, op, val, NULL, NULL, 0);
}

static void mutex_lock(mutex *m) {
    int c = 0;
    if (atomic_compare_exchange_strong(&m->state, &c, 1))
        return;                                    /* fast path: no system call */
    if (c != 2)
        c = atomic_exchange(&m->state, 2);         /* announce a waiter */
    while (c != 0) {
        futex(&m->state, FUTEX_WAIT_PRIVATE, 2);   /* sleep if state is still 2 */
        c = atomic_exchange(&m->state, 2);
    }
}

static void mutex_unlock(mutex *m) {
    if (atomic_exchange(&m->state, 0) == 2)        /* someone may be asleep */
        futex(&m->state, FUTEX_WAKE_PRIVATE, 1);   /* wake one */
}

static mutex mu;
static long counter;

static void *work(void *arg) {
    for (long i = 0; i < 1000000; i++) { mutex_lock(&mu); counter++; mutex_unlock(&mu); }
    return arg;
}

int main(void) {
    pthread_t t[4];
    for (int i = 0; i < 4; i++) pthread_create(&t[i], NULL, work, NULL);
    for (int i = 0; i < 4; i++) pthread_join(t[i], NULL);
    printf("counter = %ld\n", counter);
    return 0;
}
```
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o futexlock futexlock.c && ./futexlock
counter = 4000000
$ strace -f -c ./futexlock 2>&1 | grep futex
 99.76    0.220487          16     13777      5162 futex
```
The count is right, and `strace` shows only $13{,}777$ `futex` system calls for four million acquisitions (the number varies from run to run; $5162$ of them returned an error — `EAGAIN`, because the word had already changed when the kernel checked it, which is harmless). Why it is correct: acquisition succeeds only by changing the word from $0$ to something non-zero with an atomic operation — the compare-and-swap, or an exchange that returned $0$ — so two threads cannot both acquire it (the argument of [[#prop-tas]]). A thread that goes to sleep has first set the word to $2$, so the releasing thread's exchange sees $2$ and issues a wake-up; and `FUTEX_WAIT` sleeps only if the word is still $2$, so a release that happens between the exchange and the sleep makes the wait return immediately instead of sleeping for ever. This design is the one Ulrich Drepper's paper "Futexes are tricky" (2004) arrives at after showing why simpler ones fail. glibc's `pthread_mutex_lock` works on the same principle, spinning briefly in some configurations before sleeping.
:::
:::

Such **two-phase** locks — spin a little in case the holder releases soon, then sleep — are the norm in operating systems and language runtimes. Kernels also have to worry about a thread being interrupted while it holds a spin lock that the interrupt handler then tries to acquire (a deadlock on one core), which is why Linux's `spin_lock_irqsave` disables local interrupts for the duration.

::: quiz
A program protects a shared hash table with one `pthread_mutex_t`. Which statements are true?
- [x] Every function that reads or writes the table must acquire the mutex, including those that only read.
- [ ] Reads need no lock, because a read cannot corrupt the table.
- [x] If critical sections are long, adding threads beyond a few may give no speedup.
- [ ] Replacing the mutex by a spin lock is always faster.
::: solution
A reader without the lock can observe the table half-updated by a writer — a pointer set before the object it points to is initialised, for example — and in C it is a data race, which is undefined behaviour. (Reader–writer locks let several readers proceed together while excluding writers; see [[operating-systems/synchronisation]].) One lock serialises the critical sections, so by Amdahl's law the speedup is at most $1/s$. Spin locks are faster only when holders are never preempted and critical sections are short; with more threads than cores they can be catastrophically slower, as the ticket-lock measurement showed.
:::
:::

::: history
Edsger Dijkstra posed the mutual-exclusion problem for $n$ processes and solved it with reads and writes alone in a one-page 1965 paper in *Communications of the ACM*, crediting the first two-process solution to the Dutch mathematician Theodorus Dekker. Leslie Lamport's **bakery algorithm** (1974) solved it without assuming that reads and writes are atomic, by taking numbers like customers in a bakery — the ancestor of the ticket lock. Gary Peterson's two-variable algorithm appeared in *Information Processing Letters* in 1981. IBM's System/370 introduced compare-and-swap in the 1970s; Maurice Herlihy's 1991 paper "Wait-free synchronization" proved that compare-and-swap can implement any concurrent object without locks, while reads, writes and test-and-set cannot. John Mellor-Crummey and Michael Scott's 1991 queue-based (MCS) lock made spinning scale to many processors and is the basis of Linux's queued spin locks. POSIX standardised threads in 1995 (IEEE 1003.1c); Hubertus Franke, Rusty Russell and Matthew Kirkwood introduced futexes into Linux in 2002; C and C++ gained a memory model and atomics in 2011.
:::

## Where this leads

Locks give mutual exclusion; they do not let a thread *wait for a condition* — for a buffer to become non-empty, or for another thread to finish — without busy-waiting. [[operating-systems/synchronisation]] adds condition variables and semaphores, the classic producer–consumer and readers–writers problems, and deadlock, which multiple locks make possible. Memory models, lock-free data structures, scalable locks and transactional memory are developed in [[parallel-computing]]; proving concurrent programs correct, and model checking all their interleavings, belongs to [[software-engineering]] and [[programming-languages]]. Races are also a security problem — the double fetch of [[operating-systems/os-structure]] is one ([[security]]).

::: summary
- A **thread** is a flow of control sharing its process's address space ([[#def-thread]]); threads are much cheaper to create than processes ($44$ µs against $4$ ms measured in [[#ex-create]]) and communicate through memory.
- `counter++` is load, add, store; interleavings lose updates. Two such threads have $20$ interleavings, of which only $2$ are correct ([[#prop-interleavings]]). Results of racy programs are nondeterministic, so testing cannot establish correctness.
- A critical-section protocol needs **mutual exclusion**, **progress** and **bounded waiting** ([[#def-cs-requirements]]). **Peterson's algorithm** achieves all three under sequential consistency ([[#thm-peterson]]) — and fails on real x86 hardware because of store buffering unless fences are used ([[#ex-peterson-fail]]).
- `volatile` is not synchronisation; use C11 atomics or locks, and test with `-fsanitize=thread`.
- Locks are built from atomic **test-and-set**, **fetch-and-add** and **compare-and-swap**: the test-and-set spin lock gives mutual exclusion but not fairness ([[#prop-tas]]); the **ticket lock** is FIFO ([[#alg-ticket]]).
- Spinning is good only for short critical sections with no oversubscription (the ticket lock with four threads on two cores did not finish); **futex**-based mutexes take a fast path in user space and sleep in the kernel only under contention ([[#ex-futex]]). A single atomic instruction beats any lock for a single update.
:::

## Exercises

::: exercise Counting interleavings {level=1 check="252"}
Two threads execute $5$ atomic steps each. How many interleavings are there? (Enter the number.)
::: solution
By [[#prop-interleavings]], $\binom{10}{5} = 252$. With three threads of $5$ steps each there would be $\frac{15!}{5!\,5!\,5!} = 756{,}756$.
:::
:::

::: exercise The smallest result {level=1 check="2"}
Two threads each execute `counter++` (load, add, store) $n = 5$ times in a loop, starting from $0$, with no lock. Which is the smallest possible final value? (Enter it.) Describe an interleaving that achieves it.
::: solution
The answer is $2$, for any $n \ge 2$ (not $5$, as one might guess). An interleaving that achieves it: A loads $0$. B performs $n - 1 = 4$ complete increments (counter $= 4$). A adds and stores $1$, overwriting B's work. B loads $1$. A performs its remaining $4$ increments (counter $= 5$). B adds and stores $2$, overwriting A's. Final value $2$.

It cannot be less. Every store writes (a loaded value) $+ 1 \ge 1$. The final value is written by the last store, say by thread X in its last iteration; it is one more than the value X loaded in that iteration. That load read either the initial $0$ or the value of some earlier store. It cannot have read the initial $0$: X's own first-iteration store ($n \ge 2$) happened before it, and a load returns the most recent store to that location, never the initial value once a store has occurred. So it read a value $\ge 1$, and the final value is $\ge 2$. An exhaustive enumeration in Python of all $\binom{18}{9} = 48{,}620$ interleavings for $n = 3$ confirms that the final values range from $2$ to $6$.
:::
:::

::: exercise What is wrong with these protocols? {level=1}
For each entry protocol, say which requirement of [[#def-cs-requirements]] it violates, with an interleaving. (a) `while (lock) ; lock = 1;` with `lock = 0` to exit (plain loads and stores). (b) `flag[i] = 1; while (flag[j]) ;` with `flag[i] = 0` to exit. (c) `while (turn != i) ;` with `turn = j` to exit.
::: solution
(a) Mutual exclusion: both threads read `lock == 0` before either writes $1$; both enter. Testing and setting must be one atomic step — which is exactly what test-and-set provides. (b) Progress: thread $0$ sets `flag[0] = 1`, thread $1$ sets `flag[1] = 1`, and then both spin for ever, each waiting for the other's flag — a deadlock. (c) Progress: if thread $1$ never wants to enter again after thread $0$ has given it the turn, thread $0$ waits for ever, though the critical section is free. (Strict alternation does satisfy mutual exclusion and bounded waiting.)
:::
:::

::: exercise Amdahl's law for a lock {level=2 check="1/(0.1 + 0.9/8)"}
A program spends $10\%$ of its single-threaded running time in critical sections protected by one lock and $90\%$ in perfectly parallel work. What is the best possible speedup with $8$ threads on $8$ cores? (Enter the speedup.)
::: solution
The serialised part still takes $0.1$ of the original time; the parallel part takes $0.9/8$. Speedup $= 1/(0.1 + 0.9/8) = 1/0.2125 \approx 4.71$. With unlimited threads it approaches $1/0.1 = 10$. To do better, shrink the critical sections or split the lock into several (one per hash bucket, say).
:::
:::

::: exercise A lock from compare-and-swap {level=2}
Write `acquire` and `release` for a spin lock using C11 `atomic_compare_exchange_weak`, and prove that it provides mutual exclusion. Why must the `expected` variable be reset inside the loop?
::: solution
```c
#include <stdatomic.h>

typedef struct { atomic_int held; } spinlock;    /* 0 free, 1 held */

void acquire(spinlock *l) {
    int expected = 0;
    while (!atomic_compare_exchange_weak(&l->held, &expected, 1))
        expected = 0;              /* the failed CAS stored the current value (1) here */
}

void release(spinlock *l) { atomic_store(&l->held, 0); }
```
Mutual exclusion: a thread holds the lock from a successful compare-and-swap, which atomically changed the word from $0$ to $1$, until its release. Two successful compare-and-swaps without a release between them are impossible, since after the first the word is $1$ and the second would find $1 \ne 0$. When a compare-and-swap fails, C11 writes the value it found into `expected`; without the reset, the next attempt would compare against $1$ and "succeed" in replacing $1$ by $1$ while another thread holds the lock. The `_weak` form may fail spuriously (on load-linked/store-conditional machines), which is harmless inside a loop.
:::
:::

::: exercise The ticket lock is fair {#ex-ticket-proof level=2}
Prove that the ticket lock ([[#alg-ticket]]) provides mutual exclusion, and that a thread that has taken its ticket enters after at most $n - 1$ other entries, where $n$ is the number of threads. Assume the counters do not overflow.
::: solution
Fetch-and-add is atomic, so the tickets handed out are distinct: $0, 1, 2, \dots$ in the order of the fetch-and-adds. A thread holds the lock exactly when `serving` equals its ticket and it has not yet released; since `serving` holds one value at a time and tickets are distinct, at most one thread holds it: mutual exclusion. `serving` increases by one at each release, so the lock is granted to tickets in increasing order. A thread with ticket $t$ waits for the holders of tickets `serving`, …, $t - 1$, each of which belongs to a different thread that took its ticket earlier and has not yet released; there are at most $n - 1$ other threads, so at most $n - 1$ entries precede its own. (With 32-bit counters, overflow is harmless as long as fewer than $2^{32}$ threads wait at once, because the comparison is for equality modulo $2^{32}$.)
:::
:::

::: exercise Oversubscribed ticket locks {level=3 check="3000"}
In the ticket-lock experiment with four threads on two cores, suppose that every handover of the lock goes to a thread that is not running, and costs one time slice of $3$ ms while the running threads spin. Estimate, in seconds, how long a million increments would take. (Enter the number of seconds.) Why does the test-and-set lock not suffer as badly?
::: solution
$10^6 \times 3$ ms $= 3000$ s, about $50$ minutes — consistent with the program not finishing in $30$ s. The estimate is pessimistic (sometimes the next ticket belongs to a running thread), but the order of magnitude is right. The test-and-set lock grants the lock to *whichever* thread executes its test-and-set first after the release; only running threads execute instructions, so the lock always goes to a running thread, and preemption of waiters costs nothing. Fairness has a price: FIFO locks are fragile under preemption. This is why Linux uses ticket-like queued spin locks only in the kernel, with preemption disabled while they are held.
:::
:::

::: exercise Peterson with fences {level=3}
Without using sequentially consistent atomics for every access, repair the relaxed version of [[#ex-peterson-fail]] by inserting one `atomic_thread_fence(memory_order_seq_cst)` in `lock`. Where must it go, and why is one enough on x86? Run the repaired version.
::: solution
The only reordering x86 performs that breaks the algorithm is a store passing a later load: the stores to `flag[self]` and `turn` must become visible before the load of `flag[other]`. Put the fence between them:

```c
static void lock(int self) {
    int other = 1 - self;
    ST(flag[self], 1);
    ST(turn, other);
    atomic_thread_fence(memory_order_seq_cst);   /* full fence */
    while (LD(flag[other]) && LD(turn) == other) ;
}
```

GCC 15 compiles the fence to `lock orq $0x0,(%rsp)` — a locked instruction that changes nothing, used because it is faster than `mfence` and has the same effect: it makes the core wait until its store buffer has drained before executing later loads. The unlock store needs no fence on x86 (stores are not reordered with earlier loads or stores), though on weaker architectures such as ARM the fences required are different, and a release ordering on the unlock store and acquire ordering on the loads would also be needed to keep the counter update inside the critical section. With the fence, eight consecutive runs all printed `expected 4000000, got 4000000` (the unfenced version lost increments in two of four runs made at the same time). In practice, never write your own mutual-exclusion algorithm for production; use the platform's mutex.
:::
:::
