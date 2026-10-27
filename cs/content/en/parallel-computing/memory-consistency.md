In the following OpenMP program each thread increments *its own* counter twenty million times. No two threads ever touch the same variable, so there is no sharing and no race. The command-line argument sets the distance between consecutive threads' counters: `1` puts them next to each other in an array of `long`s, `8` puts them $64$ bytes apart, and `0` — for comparison — makes all threads share a single counter.

```c
#include <omp.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>

enum { ITERS = 20000000 };                   /* increments per thread */

int main(int argc, char *argv[]) {
    int stride = argc > 1 ? atoi(argv[1]) : 1;   /* distance between counters, in longs */
    int p = omp_get_max_threads();
    atomic_long *c = aligned_alloc(64, sizeof(atomic_long) * (size_t)p * stride + 64);
    for (long i = 0; i < (long)p * stride; i++) atomic_init(&c[i], 0);
    double t0 = omp_get_wtime();
    #pragma omp parallel
    {
        atomic_long *mine = &c[omp_get_thread_num() * stride];   /* not shared! */
        for (long i = 0; i < ITERS; i++)
            atomic_fetch_add_explicit(mine, 1, memory_order_relaxed);
    }
    double t1 = omp_get_wtime();
    long total = 0;
    for (int t = 0; t < (stride ? p : 1); t++) total += atomic_load(&c[t * stride]);
    printf("p=%2d stride=%d  total %ld  %.3f s\n", p, stride, total, t1 - t0);
    free(c);
    return 0;
}
```

Since every thread does the same amount of work on its own core, the time should stay at that of one thread, whatever $p$. Observations on the $36$-core, two-socket machine of this course (as of 2026):

| threads $p$ | $1$ | $2$ | $4$ | $8$ | $16$ | $32$ |
|---|---|---|---|---|---|---|
| one shared counter (stride $0$) | $0.140$ s | $0.463$ s | $1.632$ s | $2.675$ s | $5.594$ s | $11.955$ s |
| adjacent counters (stride $1$) | $0.126$ s | $0.907$ s | $1.473$ s | $2.629$ s | $2.994$ s | $4.244$ s |
| counters $64$ bytes apart (stride $8$) | $0.129$ s | $0.142$ s | $0.142$ s | $0.152$ s | $0.156$ s | $0.211$ s |

With the counters $64$ bytes apart the program behaves as expected. With adjacent counters it is up to $20$ times slower — almost as slow as when all threads really do share one counter. The threads share no *variables*, but they share *cache lines*: a line is $64$ bytes, so eight adjacent `long` counters live in one line, and the hardware keeps that line consistent across the cores' private caches by passing it from core to core on every write.

This chapter explains the hardware that does this. **Cache coherence** protocols such as MESI keep the copies of a line in different caches consistent; we define coherence precisely, prove that the protocol maintains it, and count the traffic it costs — which explains **false sharing**, the effect above, and the cost of contended atomic operations. Coherence is about one memory location at a time. The order in which a core's writes to *different* locations become visible to other cores is a separate question, the **memory consistency model**, which [[programming-languages/concurrency-models]] introduced with sequential consistency, TSO and the data-race-free guarantee. Here we use those ideas to write correct synchronisation with C11 atomics: acquire and release, fences, and what each costs.

## Coherence

Each core of a multicore processor has private L1 and L2 caches ([[computer-systems/memory-hierarchy]]). If two cores have cached the same memory block and one of them writes it, the other's copy becomes stale. Without further mechanism, a core could read an old value indefinitely — a spin loop waiting for a flag would never see it change. Single-processor caches never have this problem, because there is only one copy that a program can read.

::: definition Cache coherence {#def-coherence}
A memory system is **coherent** if, for every memory location, the following invariants hold at all times:

1. **Single writer, multiple readers (SWMR)**: at any moment, either exactly one core may write the location (and only that core may read it), or any number of cores may read it but none may write.
2. **Data value**: the value of the location at the start of a read-only period is the value it had at the end of the most recent read–write period.

Equivalently, all writes to one location are **serialised** — seen by every core in the same order — and every read returns the value of the latest write in that order.
:::

Coherence makes caches invisible *for each location separately*: a program cannot tell, from the values it reads of one variable, that there are caches at all. Hardware enforces it with a **coherence protocol**: every cache controller tracks a state for each line it holds and exchanges messages with the other controllers when a core wants to read or write. There are two families. In **snooping** protocols, every cache observes ("snoops") every request on a shared bus or broadcast network, and the order of requests on the bus serialises them. In **directory** protocols, a directory at the memory side records which caches hold each line, and requests go to the directory, which forwards them only to the caches concerned. Snooping is simple and fast for a few cores; directories scale.

## The MESI protocol

The simplest invalidation protocol, **MSI**, gives each cached line one of three states: **M**odified (this cache has the only copy, and it is dirty — newer than memory), **S**hared (this cache has a clean, read-only copy; others may too), and **I**nvalid. A read of a line in state I issues a bus read and enters S; a write in S or I issues a request that **invalidates** every other copy, and enters M. MESI adds a fourth state, **E**xclusive, for a clean copy that no other cache holds: it can be written without telling anyone.

::: definition The MESI protocol {#def-mesi}
Each cache holds each line in one of four states:

| state | valid? | dirty? | other copies? | the core may |
|---|---|---|---|---|
| **M** (modified) | yes | yes | none | read and write |
| **E** (exclusive) | yes | no | none | read; write, moving silently to M |
| **S** (shared) | yes | no | possibly | read |
| **I** (invalid) | no | — | — | nothing |

Processor events and the bus transactions they cause, on a bus that executes one transaction at a time and is observed by all caches:

- **Read** in M, E or S: hit, no transaction. **Read** in I: issue **BusRd**. If another cache holds the line in M, it supplies the data (and writes it back to memory) — a **flush** — and every holder in M or E moves to S. The requester enters S if any other cache had a copy, and E otherwise.
- **Write** in M: hit. **Write** in E: hit, move to M with no transaction. **Write** in S: issue **BusUpgr** (an invalidation): all other copies go to I; the requester enters M. **Write** in I: issue **BusRdX** (read for ownership): a holder in M flushes, all other copies go to I, and the requester enters M.
- A cache may **evict** a line at any time, writing it back first if it is in M.
:::

::: widget graph
nodes: I@0,0; S@2,0; E@0,2; M@2,2
edges: I>S; I>E; I>M; S>M; E>M; E>S; M>S; S>I; E>I; M>I
algorithm: none
caption: The state transitions of one cache line in one cache under MESI. From I: a read miss leads to S (another cache has a copy) or E (none has); a write miss (BusRdX) leads to M. From S: a local write (BusUpgr) leads to M; a remote write or eviction leads to I. From E: a local write leads to M *silently*; a remote read leads to S. From M: a remote read leads to S (with a flush); a remote write or eviction leads to I. Drag the states apart and trace the history of a line that one core reads and writes and another then reads — I → E → M → S.
:::

::: theorem MESI maintains coherence {#thm-mesi}
Assume the bus is **atomic** — each transaction is completed, including all snooping caches' state changes, before the next begins — and that the protocol starts with every line invalid in every cache. Then after every transaction and every processor event, for each line, either exactly one cache holds it in M or E and all others in I, or no cache holds it in M or E. In particular the SWMR invariant holds, since only states M and E permit writes. Moreover every read returns the value of the most recent write to that location.
:::

::: proof
We prove the first statement by induction on the sequence of events affecting one line; the initial state, all I, satisfies it. Assume it holds before an event, and consider each case of [[#def-mesi]].

*Hits* (read in M, E, S; write in M) change no state. A *write in E* changes E to M in the cache that is the unique holder in E: still a unique holder in M or E, others still I. An *eviction* moves a line to I, which cannot create a second holder in M or E.

*Read in I (BusRd).* All holders in M or E move to S, and the requester enters E only if no other cache had a valid copy; then all others are I. Otherwise the requester enters S, and no cache is in M or E afterwards.

*Write in S or I (BusUpgr or BusRdX).* Every other cache moves to I, and the requester enters M. Afterwards exactly one cache holds the line in M and all others are in I.

Because the bus is atomic, no two of these cases interleave, so the invariant holds after every event.

For the data values: a value is written only by a core holding the line in M. Writes therefore happen in the serial order of the M-periods, each of which begins with a bus transaction that serialises it with all others. When a period of M ends — by a BusRd, a BusRdX or an eviction — the dirty data is flushed to the requester or to memory, so the next reader or writer obtains the latest value. A line in S or E was obtained either from memory, after the last M holder had written back, or from the flush itself; so a read in S, E or M returns the most recent write.
:::

Real buses are not atomic: modern processors split transactions and have many in flight, and must add transient states to handle races, such as two caches requesting the same line at once. Verifying such protocols is a serious engineering problem, and is done with model checkers that explore every interleaving. The invariant they verify is the one in the theorem.

::: example A MESI trace {#ex-mesi-trace}
Three cores access one line $X$: P0 reads, P0 writes, P1 reads, P2 reads, P2 writes, P0 reads, P0 writes. Give the state of the line in each cache after every access and count the bus transactions under MESI and under MSI.
::: solution
A small simulator applies the rules of [[#def-mesi]]:

```python
def simulate(trace, ncpu, use_e=True):
    """States of one cache line in ncpu caches under MESI (or MSI if use_e is False)."""
    st, bus = ["I"] * ncpu, 0
    for cpu, op in trace:
        others = [c for c in range(ncpu) if c != cpu and st[c] != "I"]
        s, msg = st[cpu], ""
        if op == "R" and s == "I":                       # read miss
            msg, bus = "BusRd", bus + 1
            if any(st[c] == "M" for c in others):
                msg += " (M copy flushed)"
            for c in others:
                st[c] = "S"                              # M and E holders drop to S
            st[cpu] = "S" if others or not use_e else "E"
        elif op == "W" and s in ("I", "S"):              # write without ownership
            msg, bus = ("BusRdX" if s == "I" else "BusUpgr"), bus + 1
            for c in others:
                st[c] = "I"                              # invalidate every other copy
            st[cpu] = "M"
        elif op == "W" and s == "E":
            st[cpu] = "M"                                # silent upgrade: no bus traffic
        # read hits in M, E, S and write hits in M need nothing
        print(f"P{cpu} {op}  {' '.join(st)}  {msg}")
    return bus

trace = [(0, "R"), (0, "W"), (1, "R"), (2, "R"), (2, "W"), (0, "R"), (0, "W")]
print("MESI: bus transactions =", simulate(trace, 3))
print("MSI:  bus transactions =", simulate(trace, 3, use_e=False))
```

```console
$ python3 mesi.py
P0 R  E I I  BusRd
P0 W  M I I  
P1 R  S S I  BusRd (M copy flushed)
P2 R  S S S  BusRd
P2 W  I I M  BusUpgr
P0 R  S I S  BusRd (M copy flushed)
P0 W  M I I  BusUpgr
MESI: bus transactions = 6
P0 R  S I I  BusRd
P0 W  M I I  BusUpgr
P1 R  S S I  BusRd (M copy flushed)
P2 R  S S S  BusRd
P2 W  I I M  BusUpgr
P0 R  S I S  BusRd (M copy flushed)
P0 W  M I I  BusUpgr
MSI:  bus transactions = 7
```

The only difference is the second access: under MESI, P0's first read finds no other copy and enters E, so its write is a silent upgrade; under MSI it must broadcast an invalidation that nobody needs. Reading and then writing data that no one else uses — by far the commonest pattern — costs one transaction instead of two. Notice also that every access after the first two that changes the *writer* costs a transaction: P2's write invalidates two copies, and P0's read must fetch the line back from P2. That is the traffic that slowed down the opening program.
:::
:::

Commercial processors use variants. Intel's processors use **MESIF**, whose F (forward) state designates one of several sharers to answer requests, and AMD's use **MOESI**, whose O (owned) state lets a dirty line be shared without writing it back to memory first. The principles — single writer, invalidation before writing — are the same.

### Directories and NUMA

A bus on which every cache sees every transaction does not scale beyond a few dozen cores: its bandwidth is shared, and every cache must look up every request. Large systems replace broadcast with a **directory**: for each memory line, its **home node** (the node whose memory holds it) keeps an entry recording the line's state and which caches hold copies. A read miss goes to the home, which either supplies the line or forwards the request to the one cache holding it in M; a write goes to the home, which sends invalidations only to the caches recorded as sharers and collects their acknowledgements. The protocol logic is the same as MESI, but messages are point-to-point.

::: proposition Storage cost of a full-map directory {#prop-directory}
A directory that keeps one presence bit per cache for every memory line, with $p$ caches and lines of $B$ bytes, needs $p$ bits per $8B$ bits of memory: a fraction $p/(8B)$ of memory. Its cost grows linearly with the number of caches.
:::

::: proof
Each line of $B$ bytes $= 8B$ bits of memory needs $p$ presence bits (plus a few state bits, which we neglect), so the ratio is $p/(8B)$. For $64$-byte lines and $p = 64$ caches that is $64/512 = 12.5\%$ of memory; for $p = 1024$, twice the memory itself.
:::

Real directories therefore compress: they keep a few pointers to sharers rather than a full bit vector, or track presence per group of caches, or cache directory entries only for lines that are actually cached. Within one chip, the cores' private caches are kept coherent by snooping filters or directories in the shared L3 cache; between sockets, by messages over the inter-socket link.

On a two-socket machine the cost of coherence depends on where the two cores are. The following program pins two threads to chosen CPUs and makes them pass a "ball" back and forth through one cache line: each waits until the line holds its own number, then writes the other's. Every hand-over moves the line from one core's cache to the other's.

::: example Coherence latency within and between sockets {#ex-pingpong}
Measure the time for one transfer of a cache line between two cores on the same socket and on different sockets.
::: solution
```c
#define _GNU_SOURCE
#include <pthread.h>
#include <sched.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

enum { ROUNDS = 1000000 };
static _Alignas(64) atomic_int ball;          /* the cache line that bounces */
static int cpu[2];

static void pin(int c) {
    cpu_set_t s; CPU_ZERO(&s); CPU_SET(c, &s);
    pthread_setaffinity_np(pthread_self(), sizeof s, &s);
}

static void *player(void *arg) {
    int me = (int)(long)arg;
    pin(cpu[me]);
    for (int r = 0; r < ROUNDS; r++) {
        while (atomic_load_explicit(&ball, memory_order_acquire) != me) ;  /* wait */
        atomic_store_explicit(&ball, 1 - me, memory_order_release);        /* hit back */
    }
    return NULL;
}

int main(int argc, char *argv[]) {
    if (argc < 3) return 1;
    cpu[0] = atoi(argv[1]); cpu[1] = atoi(argv[2]);
    pthread_t t[2];
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (long i = 0; i < 2; i++) pthread_create(&t[i], NULL, player, (void *)i);
    for (int i = 0; i < 2; i++) pthread_join(t[i], NULL);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    double ns = ((t1.tv_sec - t0.tv_sec) * 1e9 + (t1.tv_nsec - t0.tv_nsec)) / (2.0 * ROUNDS);
    printf("CPUs %2d and %2d: %.0f ns per one-way transfer\n", cpu[0], cpu[1], ns);
    return 0;
}
```

CPUs $0$–$17$ are on socket $0$ and $18$–$35$ on socket $1$ ([[parallel-computing/parallel-architectures#ex-lscpu]]). Two runs:

```console
$ for b in 3 10 20 30; do ./pingpong 2 $b; done
CPUs  2 and  3: 99 ns per one-way transfer
CPUs  2 and 10: 112 ns per one-way transfer
CPUs  2 and 20: 201 ns per one-way transfer
CPUs  2 and 30: 207 ns per one-way transfer
$ for b in 3 10 20 30; do ./pingpong 2 $b; done
CPUs  2 and  3: 127 ns per one-way transfer
CPUs  2 and 10: 111 ns per one-way transfer
CPUs  2 and 20: 255 ns per one-way transfer
CPUs  2 and 30: 207 ns per one-way transfer
```

Within a socket a transfer takes about $100$–$130$ ns; between sockets about $200$–$250$ ns (observations; the figures include the time to notice the change and write back, and vary from run to run). Either is hundreds of clock cycles — far more than the $1$ ns of an L1 hit — and that is the cost of every write to a line that another core has just used. Coherence keeps the values right, but communication through shared memory is not free; it is message passing done by hardware.
:::
:::

## False sharing

::: definition True and false sharing {#def-false-sharing}
Two accesses by different cores to the same cache line, at least one of them a write, **share** the line. The sharing is **true** if they access the same bytes, and **false** if they access disjoint bytes that happen to lie in the same line. Both cause coherence misses — misses on a line that was invalidated by another core's write — but false sharing is unnecessary: the program does not communicate, and the traffic disappears if the data is laid out differently.
:::

Coherence misses are a fourth kind of miss, alongside the compulsory, capacity and conflict misses of [[computer-systems/memory-hierarchy]]. In the opening program the adjacent counters falsely share lines: with stride $1$, eight threads' counters share one $64$-byte line; every atomic increment needs the line in state M; so on every increment the line is invalidated in the cache of the core that last wrote it and transferred, at the cost measured in [[#ex-pingpong]]. With $32$ threads the counters occupy four lines, eight threads per line, so stride $1$ is a little better than one shared counter, where all $32$ fight for a single line. Padding each counter to its own line removes the contention entirely.

::: widget plot
f: 0.13
x: 1, 32
y: 0, 12.5
labels: \text{no sharing: constant time}
points: 1,0.126; 2,0.907; 4,1.473; 8,2.629; 16,2.994; 32,4.244; 2,0.463; 4,1.632; 8,2.675; 16,5.594; 32,11.955
caption: Time in seconds for $p$ threads each to perform $2 \times 10^7$ atomic increments, from the opening table. With one counter per cache line, the time stays near the horizontal line at $0.13$ s (the padded measurements lie on it, up to $0.21$ s at $p = 32$). The dots show the two sharing layouts: adjacent counters (false sharing — the lower set at $p = 16$ and $32$) and one shared counter (true sharing — the upper set). Notice that false sharing costs as much as true sharing until the threads outnumber the counters in one line.
:::

The cure is to lay out per-thread data so that each thread's writable data occupies its own cache lines:

- **pad** per-thread structures to the line size: `struct { long n; char pad[56]; }` or, in C11, `_Alignas(64)` on the member;
- accumulate in **local variables** (registers) and write shared memory once at the end — the reduction pattern of [[parallel-computing/shared-memory#thm-reduction]];
- give each thread a **contiguous block** of an output array rather than an interleaved set of elements, so threads write different lines except at block boundaries;
- query the line size rather than assuming it: on Linux, `getconf LEVEL1_DCACHE_LINESIZE` ($64$ on our machine); C++17 provides `std::hardware_destructive_interference_size`.

::: example Counting falsely shared lines {#ex-count-sharing}
Eight threads write `out[i]` for $i = 0, \dots, n - 1$ with $n = 10^6$ `double`s, the array starting at a line boundary. Count the cache lines written by more than one thread under `schedule(static)` and `schedule(static, 1)`, and estimate the coherence cost of one sweep under `static, 1` if each transfer costs $100$ ns.
::: solution
A line holds $8$ `double`s, so there are $125{,}000$ lines. Under `static`, thread $t$ writes the block $[125{,}000\,t, 125{,}000\,(t + 1))$; since $125{,}000$ is a multiple of $8$, every block starts at a line boundary, and *no* line is shared. (If the block size were not a multiple of $8$, at most $7$ lines — one per boundary — would be.) Under `static, 1`, element $i$ goes to thread $i \bmod 8$, so the eight elements of every line belong to eight different threads: all $125{,}000$ lines are shared. If the threads proceed roughly in step, each line passes through all eight caches, up to $8 \times 125{,}000 = 10^6$ transfers per sweep, about $0.1$ s at $100$ ns each — against about $1$ ms for the arithmetic. Measuring this effect cleanly is harder than counting it: in our test of $2000$ sweeps over $2^{16}$ doubles with $16$ threads, `static, 1` took $0.47$ s and `static` $0.011$ s, but `static, 8` with line-aligned chunks — no false sharing at all — still took $0.13$ s, because chunks of a few iterations also cost scheduling overhead and prevent vectorisation (observations on our machine). Both effects point the same way: give each thread large contiguous blocks.
:::
:::

False sharing with ordinary (non-atomic) stores is often milder than in the opening program, because a core buffers its stores and can commit several of them to a line each time it obtains ownership. It is still common, and hard to find, because nothing in the source code shows it; tools that count coherence misses (`perf c2c` on Linux) locate it.

::: quiz
Which of the following are likely to suffer from false sharing on a machine with $64$-byte lines?
- [x] An OpenMP loop with `schedule(static, 1)` in which iteration $i$ writes `out[i]`, an array of `double`.
- [ ] An OpenMP loop with `schedule(static)` in which iteration $i$ writes `out[i]`, an array of `double`, with $10^6$ iterations.
- [x] An array `long hits[64]` in which thread $t$ repeatedly increments `hits[t]`.
- [ ] Sixteen threads that only read a shared lookup table of $1$ MiB.
::: solution
With `static, 1`, consecutive iterations go to different threads, so the eight `double`s of every line are written by eight different threads. With a block schedule, each thread writes a contiguous block, and lines are shared only at the boundaries between blocks — at most one line per pair of neighbours, out of $125{,}000$ lines. Per-thread counters in one array are the classic case. Reading never invalidates: all sixteen caches can hold the table in state S indefinitely.
:::
:::

## Memory consistency

Coherence orders the writes to *each* location. It says nothing about the order in which writes to *different* locations become visible. Consider the most common synchronisation pattern of all, **message passing** through a flag:

```c
data = 42;          /* producer (1) */          while (!ready) ;     /* consumer (3) */
ready = 1;          /*          (2) */          print(data);         /*          (4) */
```

The consumer must print $42$. That requires that if (3) sees the write (2), then (4) sees the write (1) — an ordering between two different locations, `ready` and `data`. Coherence does not provide it: a processor could make (2) visible before (1), or perform (4) before (3). Whether it may is decided by the **memory consistency model**, the contract between hardware (or a language) and the programmer about which values a load may return. [[programming-languages/concurrency-models]] defined **sequential consistency** (SC, [[programming-languages/concurrency-models#def-sc]]), under which every execution behaves like an interleaving, and showed that x86 processors implement the weaker **TSO**: each core has a FIFO store buffer, so a store can be overtaken by a later load from another location — which it observed with the store-buffering test. ARM, POWER and RISC-V are weaker still: they may reorder two stores, or two loads, to different locations, so even the message-passing pattern fails on them unless the program says what ordering it needs.

The compiler reorders too. It assumes the program is free of data races, and on that assumption it may move, merge or delete accesses to ordinary variables.

::: example A flag the compiler removes {#ex-hoist}
Compile the message-passing pattern with a plain `int` flag, and with a C11 atomic flag using release and acquire ordering.

```c
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>

static long data;                       /* ordinary variable: the message */
#ifdef PLAIN
static int ready;                       /* WRONG: plain flag, a data race */
#define PUBLISH() (ready = 1)
#define READY()   (ready)
#else
static atomic_int ready;
#define PUBLISH() atomic_store_explicit(&ready, 1, memory_order_release)
#define READY()   atomic_load_explicit(&ready, memory_order_acquire)
#endif

static void *producer(void *arg) {
    (void)arg;
    data = 42;                          /* (1) write the message */
    PUBLISH();                          /* (2) then raise the flag */
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, producer, NULL);
    while (!READY()) ;                  /* (3) wait for the flag */
    printf("data = %ld\n", data);       /* (4) read the message */
    pthread_join(t, NULL);
    return 0;
}
```
::: solution
```console
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -o mp mp.c && ./mp
data = 42
$ gcc -std=c17 -Wall -Wextra -O2 -pthread -DPLAIN -o mp_plain mp.c
$ timeout 5 ./mp_plain; echo "exit status $?"
exit status 124
$ objdump -d --no-show-raw-insn mp_plain | grep -E '<ready>|112f'
    10e9:	mov    0x2f29(%rip),%eax        # 4018 <ready>
    10f1:	je     112f <main+0x6f>
    112f:	jmp    112f <main+0x6f>
    1241:	movl   $0x1,0x2dcd(%rip)        # 4018 <ready>
```

The plain version hangs: `timeout` killed it after $5$ seconds (status $124$). The disassembly shows why. In `main`, the compiler loaded `ready` *once* (address `10e9`); if it was $0$, it jumps to an instruction that jumps to itself for ever. Since no code in `main`'s loop changes `ready`, and a concurrent change would be a data race — undefined behaviour — the compiler may assume the value never changes. The atomic version works: an atomic load must be performed each time. On x86 the release store compiles to an ordinary `movl $0x1, ready` placed after `movq $0x2a, data`, and the acquire load to an ordinary `mov`: TSO already keeps stores in order and loads in order, so release and acquire cost nothing in hardware there. On ARM they compile to the `stlr` and `ldar` instructions, which do enforce ordering.
:::
:::

The C11 and C++11 memory model ([[programming-languages/concurrency-models#thm-drf-sc]]) lets each atomic operation state the ordering it needs. The orderings that matter most are these.

::: definition Memory orders and happens-before {#def-memory-order}
In C11 each atomic operation takes a `memory_order`:

- `relaxed`: the operation is atomic and, for each location, all threads see its modifications in one order (coherence), but it orders nothing else.
- `release` (on a store): no read or write that precedes it in its thread may be reordered after it.
- `acquire` (on a load): no read or write that follows it in its thread may be reordered before it.
- `seq_cst` (the default): acquire and release, and in addition all `seq_cst` operations appear in a single total order consistent with each thread's program order.

A release store $W$ to an atomic variable **synchronises with** an acquire load $R$ of the same variable that reads the value written by $W$. **Happens-before** is the smallest transitive relation that contains program order within each thread and every synchronises-with pair. The model guarantees that if a write $w$ to a non-atomic location happens before a read $r$ of it, and no other write to it intervenes, then $r$ returns the value of $w$; and if two conflicting accesses are not ordered by happens-before, the program has a data race.
:::

::: theorem Release and acquire implement message passing {#thm-message-passing}
In [[#ex-hoist]] with the atomic flag, the consumer prints $42$ and the program has no data race.
:::

::: proof
The consumer's loop ends only when an acquire load (3) of `ready` returns $1$. The only write of $1$ to `ready` is the producer's release store (2), so (2) synchronises with that load. Within the producer, (1) precedes (2) in program order; within the consumer, (3) precedes (4). By transitivity, (1) happens before (4). The only write to `data` is (1), so (4) returns $42$. The accesses to `data` are (1) and (4), ordered by happens-before, so they do not race; all accesses to `ready` are atomic, which never race.
:::

Release–acquire is enough for message passing, locks and most synchronisation: acquiring a mutex is an acquire operation, releasing it a release, and that is all a critical section needs. It is *not* enough for the store-buffering pattern, where each thread writes one flag and then reads the other's — the pattern of Dekker's and Peterson's algorithms ([[operating-systems/threads-locks]]). A release store followed by an acquire load of a *different* location may still be reordered (the release only forbids moving earlier accesses after it; the acquire only forbids moving later accesses before it). Only `seq_cst` forbids it ([[#ex-sb-acqrel]]), and on x86 the compiler then emits an `xchg` or a fence that drains the store buffer, at a cost of tens of cycles.

::: warning Reasoning from the hardware is not enough
"x86 never reorders stores with stores, so my plain-variable flag is safe" is wrong for two reasons. The compiler is a second source of reordering and elimination, governed by the *language's* memory model, not the processor's — [[#ex-hoist]] hung on x86. And code that is correct on x86 may fail on ARM, where most phones, many laptops and a growing share of servers run (as of 2026). Write synchronisation with the language's atomics and the weakest ordering that your proof needs (`release`/`acquire` in most cases; `seq_cst` when in doubt), or better, use locks and well-tested concurrent libraries. `volatile` is not a substitute: it prevents the compiler from removing accesses, but provides no atomicity and no ordering with respect to ordinary variables.
:::

### What atomics cost

On the machine of this course, an uncontended relaxed `atomic_fetch_add` (a `lock xadd` instruction) took about $0.126\text{ s}/(2 \times 10^7) \approx 6$ ns in the opening experiment — about twenty times an ordinary increment in a register, because a locked instruction waits for the store buffer to drain and must hold the line in state M. Contended, the same instruction took about $5.594\text{ s}/(2 \times 10^7) \approx 280$ ns per increment per thread with $16$ threads sharing one counter, more than $40$ times as long, since every operation now waits for the line to arrive from another core. These two numbers set the rules of scalable shared-memory programming: atomic operations are cheap when the line stays in one cache and expensive when it moves, and a program scales only if its threads mostly write lines that no other thread is using. [[parallel-computing/concurrent-data-structures]] designs data structures with this in mind.

::: history
Snooping protocols appeared with the first bus-based multiprocessors. James Goodman's "write-once" protocol (1983) was among the first; Mark Papamarcos and Janak Patel's "Illinois protocol" (1984) introduced the exclusive clean state and is essentially MESI. Lucien Censier and Paul Feautrier proposed directory-based coherence in 1978, and the Stanford DASH multiprocessor (Daniel Lenoski, John Hennessy and others, 1992) showed that it scaled. Leslie Lamport defined sequential consistency in 1979. Sarita Adve and Mark Hill proved the data-race-free guarantee in 1990, and Adve and Kourosh Gharachorloo's tutorial "Shared memory consistency models" (1996) became the standard introduction. Peter Sewell, Susmit Sarkar and colleagues gave the first rigorous model of x86 multiprocessors, x86-TSO, in 2010, after vendors' prose specifications had proved ambiguous. Hans Boehm and Sarita Adve designed the C++11 memory model (2008), adopted by C11 and C++11 in 2011.
:::

## Where this leads

[[parallel-computing/concurrent-data-structures]] uses the atomic operations and orderings of this chapter to build stacks, queues and lists that many threads can use at once, with and without locks, and defines what it means for them to be correct. False sharing and coherence traffic reappear in [[parallel-computing/performance-engineering]], together with the NUMA placement of data in memory. GPUs, with thousands of threads, mostly avoid hardware coherence between their cores' private caches ([[parallel-computing/gpu-programming]]), and clusters have none at all: communication is explicit ([[parallel-computing/message-passing]]). The formal semantics of memory models, and the DRF-SC theorem, belong to [[programming-languages/concurrency-models]].

::: summary
- Private caches hold copies, so multicore processors need **cache coherence**: a single writer or many readers per location, and reads that return the latest write ([[#def-coherence]]).
- **MESI** ([[#def-mesi]]) keeps a state per line per cache; writes invalidate other copies. On an atomic bus it maintains the single-writer invariant ([[#thm-mesi]]); the E state saves a transaction for private data ([[#ex-mesi-trace]]). Large systems use **directories**, whose full-map storage grows with the number of caches ([[#prop-directory]]).
- Moving a line between cores cost $100$–$130$ ns within a socket and $200$–$250$ ns between sockets on our machine ([[#ex-pingpong]]).
- **False sharing** — threads writing different data in the same line ([[#def-false-sharing]]) — made per-thread atomic counters up to $20$ times slower; padding to $64$ bytes removed the effect.
- Coherence is per location; the **memory consistency model** orders accesses to different locations. Compilers reorder and eliminate accesses to non-atomic variables — a plain flag loop compiled into an infinite loop ([[#ex-hoist]]).
- C11 **release** stores and **acquire** loads create happens-before edges and implement message passing ([[#thm-message-passing]]); the store-buffering pattern needs `seq_cst`. Atomics are cheap when uncontended (about $6$ ns here) and expensive when the line moves.
:::

## Exercises

::: exercise Counting bus transactions {level=1 check="4"}
Under MESI, starting with the line invalid everywhere, two cores execute: P0 reads $X$, P1 reads $X$, P0 writes $X$, P0 writes $X$ again, P1 writes $X$. How many bus transactions occur? (Enter the number.) Give the states after each access.
::: solution
P0 R: BusRd, no other copy, P0 = E (states E, I). P1 R: BusRd, P0 drops to S (S, S). P0 W: BusUpgr, P1 invalidated (M, I). P0 W: hit (M, I). P1 W: P1 is in I, so BusRdX; P0 flushes and is invalidated (I, M). Total $4$ transactions.
:::
:::

::: exercise Directory overhead {level=1 check="0.25"}
A full-map directory keeps one presence bit per cache for every $64$-byte memory line. What fraction of memory does it occupy with $128$ caches, neglecting state bits? (Enter the fraction.)
::: solution
By [[#prop-directory]], $p/(8B) = 128/(8 \times 64) = 128/512 = 0.25$: a quarter of memory. This is why large machines use limited-pointer or coarse-vector directories, or keep directory entries only for lines currently cached (a "sparse directory").
:::
:::

::: exercise How many threads per line? {level=1 check="16"}
An array `int count[64]` (with $4$-byte `int`s) starts at a $64$-byte boundary, and thread $t$ increments `count[t]` for $t = 0, \dots, 63$. How many threads write each cache line? (Enter the number.) How would you declare the counters to avoid false sharing?
::: solution
A $64$-byte line holds $64/4 = 16$ `int`s, so $16$ threads write each of the $4$ lines. Declare a padded type, for example `struct { _Alignas(64) int n; } count[64];` — the alignment of the member forces each element to start a new line, so the structure occupies $64$ bytes — or keep each thread's count in a local variable and write it to the shared array once at the end.
:::
:::

::: exercise What the E state saves {level=2 check="1000"}
A thread reads and then writes each of $1000$ distinct lines that no other core has cached. How many more bus transactions does MSI need than MESI? (Enter the number.) What happens to the saving if another core has also read each line beforehand?
::: solution
Under MSI each line costs a BusRd (entering S) and then a BusUpgr (entering M): $2000$ transactions. Under MESI the read finds no other copy and enters E; the write upgrades silently: $1000$ transactions. MSI needs $1000$ more. If another core holds the line, the read enters S under MESI too, and the write must invalidate the other copy: both protocols need two transactions per line, and the saving disappears — E helps exactly for unshared data.
:::
:::

::: exercise Ordinary stores and false sharing {level=2}
With ordinary `volatile long` counters instead of atomics (each thread executing `(*mine)++` in a loop), the same experiment gave, for $16$ threads and $10^8$ increments in total, $0.024$ s with adjacent counters and $0.018$ s with padded ones — false sharing cost only $33\%$. Give a plausible explanation of why the effect is so much smaller than with `atomic_fetch_add`, in terms of the store buffer.
::: solution
A `volatile` increment is an ordinary load and store. The store goes into the core's store buffer and the core continues; the next iteration's load of the same address is satisfied from the store buffer itself (store-to-load forwarding), without needing the line. Buffered stores are written to the cache only when the core holds the line in M; each time the line arrives, the core can drain several buffered stores to it before losing it again. So each coherence transfer is amortised over several increments. A locked instruction such as `lock xadd` cannot be overlapped this way: it must own the line in M while it executes, and it drains the store buffer first, so each increment pays a full transfer whenever the line has moved. (The volatile version is of course useless for a counter shared between threads, since its increments are not atomic.)
:::
:::

::: exercise Release–acquire chains {level=2}
Thread A writes `x = 1` (ordinary) and then `atomic_store_explicit(&f, 1, memory_order_release)`. Thread B waits until `atomic_load_explicit(&f, memory_order_acquire) == 1`, then does `atomic_store_explicit(&g, 1, memory_order_release)`. Thread C waits until `atomic_load_explicit(&g, memory_order_acquire) == 1` and then reads `x`. Prove that C reads $1$. Would it still be guaranteed if B's store to `g` were `relaxed`?
::: solution
A's write of `x` precedes its release store to `f` in program order; that store synchronises with B's acquire load that reads $1$; B's load precedes its release store to `g`; that store synchronises with C's acquire load; and that load precedes C's read of `x`. Happens-before is transitive ([[#def-memory-order]]), so A's write of `x` happens before C's read, and C reads $1$ (there is no other write to `x`). If B's store were relaxed, it would not synchronise with C's load, and there would be no happens-before edge from B to C; A's write and C's read would then be unordered — a data race, with undefined behaviour in C. Release and acquire must both be present at every link of the chain.
:::
:::

::: exercise Store buffering with acquire and release {#ex-sb-acqrel level=3}
Thread $0$ executes `x = 1; r0 = y;` and thread $1$ executes `y = 1; r1 = x;`, all four accesses being atomic, with `x` and `y` initially $0$. Explain with [[#def-memory-order]] why `memory_order_release` for the stores and `memory_order_acquire` for the loads do not forbid $r_0 = r_1 = 0$, and why `seq_cst` does. Then test both on an x86 machine over a million rounds.
::: solution
*Release–acquire.* A release store orders only the accesses *before* it; an acquire load orders only the accesses *after* it. Nothing orders thread $0$'s store to `x` before its later load of `y`, so the hardware may perform the load first — exactly what an x86 store buffer does. Formally, $r_0 = 0$ means thread $0$'s load read the initial value, so it did not synchronise with thread $1$'s store; likewise for $r_1 = 0$; no happens-before edge connects the threads, and the model allows both loads to miss both stores.

*Sequential consistency.* All four `seq_cst` operations appear in one total order $S$ consistent with program order. Whichever store comes first in $S$ precedes, in $S$, both loads (each load follows its own thread's store); a `seq_cst` load returns the last store to its location preceding it in $S$, so at least one load sees $1$.

*Experiment.* A coordinator resets `x` and `y` in each round, releases both threads, waits for them and tallies $(r_0, r_1)$. On our machine (observations):

```console
$ ./sb_acqrel            # release stores, acquire loads
r0=0 r1=0: 473484
r0=0 r1=1: 69206
r0=1 r1=0: 457295
r0=1 r1=1: 15
$ ./sb_sc                # seq_cst throughout
r0=0 r1=0: 0
r0=0 r1=1: 130512
r0=1 r1=0: 820783
r0=1 r1=1: 48705
```

Release–acquire produced the "impossible under SC" outcome in almost half the rounds; `seq_cst`, for which GCC emits `xchg` for each store, never did. This is why Dekker-style mutual exclusion needs sequentially consistent atomics or a full fence.
:::
:::

::: exercise Why coherence needs serialisation {level=3}
Suppose a snooping protocol is changed so that two caches holding a line in S may *both* upgrade to M at the same time, each sending an invalidation that the other ignores because it is itself upgrading. Construct an execution in which two cores disagree for ever about the order of two writes to the same location, violating [[#def-coherence]]. Which step in the proof of [[#thm-mesi]] fails?
::: solution
Let $X = 0$ be in state S in caches 0 and 1. Core 0 writes $X = 1$ and core 1 writes $X = 2$ at the same moment; both upgrade to M, each ignoring the other's invalidation. Now each cache holds a dirty copy: core 0 reads $1$ and core 1 reads $2$, indefinitely, and if a third core reads $X$, its value depends on which cache answers. Core 0 sees the order "$2$ then $1$" (its own write last) and core 1 sees "$1$ then $2$": the writes are not serialised, and there are two writers at once, violating SWMR. In [[#thm-mesi]], the case "write in S" relied on the atomic bus: the two BusUpgr transactions would be ordered, and the second would find its own copy already invalidated by the first, turning it into a BusRdX that obtains the first writer's value. Real protocols resolve such races by ordering conflicting requests at a single point — the bus arbiter or the directory's home node — and adding transient states to handle requests that lose.
:::
:::
