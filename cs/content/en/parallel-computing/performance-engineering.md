Here is the textbook triple loop for multiplying two $2048 \times 2048$ matrices of `double`s, timed on one core of this course's machine, next to the same loop with two of its lines swapped, next to a version reorganised into $64 \times 64$ blocks — first on one core, then on $32$:

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp -o mm mm.c
$ OMP_NUM_THREADS=1 ./mm 0; OMP_NUM_THREADS=1 ./mm 1; OMP_NUM_THREADS=1 ./mm 2; OMP_NUM_THREADS=32 ./mm 2
ijk     p= 1   21.922 s    0.78 Gflop/s  C[5][7]=12272
ikj     p= 1    4.104 s    4.19 Gflop/s  C[5][7]=12272
blocked p= 1    2.977 s    5.77 Gflop/s  C[5][7]=12272
blocked p=32    0.129 s  133.15 Gflop/s  C[5][7]=12272
```

(Observations on the $36$-core, two-socket Haswell machine used throughout the course, shared with other users, as of 2026.) All four compute the same $2 \times 2048^3 \approx 1.7 \times 10^{10}$ floating-point operations and the same answer. The fastest is $170$ times faster than the slowest, and only a factor of $23$ of that comes from parallelism. The rest comes from the memory hierarchy: the order in which a program touches memory decides how often it waits for it. And even the fastest version reaches only about $10\%$ of what the processor can do.

**Performance engineering** is the discipline of finding out where the time goes and moving it. Its tools are measurement — careful timing, profiling, scaling studies — and models that say what the hardware could do: the **roofline** of [[parallel-computing/performance-laws#def-roofline]], latency and throughput of instructions, the number of cache misses an algorithm must incur. This chapter brings together the hardware of [[parallel-computing/parallel-architectures]], the laws of [[parallel-computing/performance-laws]] and the memory system of [[parallel-computing/memory-consistency]] and applies them, with real measurements, to single-core speed (vectorisation, instruction-level parallelism, cache blocking), to memory bandwidth and NUMA, and to scaling across cores.

## Measuring

The first rule is to measure before changing anything, and the second is to measure correctly. A benchmark must do the real work (compilers delete computations whose results are never used, which is why every program in this chapter prints a checksum), must be long enough for the clock's resolution (the monotonic clock used by `omp_get_wtime` and `clock_gettime(CLOCK_MONOTONIC)` resolves nanoseconds, but each reading costs tens of nanoseconds), and must be repeated, because the time of a run is a random variable.

::: example The distribution of run times {#ex-timing}
The OpenMP program for $\pi$ of [[parallel-computing/shared-memory]] (midpoint rule with $10^9$ strips, `reduction(+ : sum)`) was run ten times with $32$ threads. Summarise the times.
::: solution
```console
$ for r in $(seq 10); do OMP_NUM_THREADS=32 ./pi_omp 1000000000; done
```

The ten times, in seconds, were $0.167, 0.187, 0.165, 0.163, 0.165, 0.167, 0.176, 0.166, 0.174, 0.215$. Their minimum is $0.163$ s, their median $0.167$ s, their mean $0.1745$ s and their standard deviation $0.016$ s. The distribution is skewed: most runs cluster near the minimum, and a few are much slower — here by up to $32\%$ — because another process (the machine's load average was about $6$) or the operating system took a core for a while, and with a static schedule every thread waits for the slowest one. Report the median (or the minimum, if the question is "how fast can this code go?") with the spread, not a single run; compare two versions by running them alternately, so that both see the same background; and treat differences of a few per cent between single runs as noise.
:::
:::

Several hardware effects deserve control. Clock frequency changes with temperature, load and instruction mix (Intel processors lower the clock when many cores run wide vector instructions); the first run of a program pays for page faults and cold caches, which is why the benchmarks below repeat their kernels and keep the best or the average of later runs; and threads that the operating system moves between cores lose their caches and, on a two-socket machine, may end up far from their memory. Setting `OMP_PROC_BIND=spread OMP_PLACES=cores` pins OpenMP threads to cores, spread across both sockets; the runs in this chapter use that setting except where stated.

### Profiling

A **profiler** reports where a program spends its time. A **sampling** profiler interrupts the program at regular intervals and records the instruction it was executing; Linux's `perf`, Intel VTune and AMD uProf also read the processor's **hardware performance counters** — cycles, instructions, cache misses, branch mispredictions — which turn "slow" into "slow because of last-level-cache misses". `perf` is not installed on this machine, but the GNU profiler `gprof` is: compiling with `-pg` adds a counting hook to every function and samples the program counter $100$ times a second.

::: example A flat profile {#ex-gprof}
Profile a program that fills two $1000 \times 1000$ matrices with random digits, multiplies them with the $ijk$ loop and sums the result.
::: solution
```c
#include <stdio.h>
#include <stdlib.h>

enum { N = 1000 };
static double A[N][N], B[N][N], C[N][N];

static void init(void) {
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) { A[i][j] = rand() % 10; B[i][j] = rand() % 10; }
}

static void multiply(void) {                     /* ijk order: strided access to B */
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) {
            double s = 0;
            for (int k = 0; k < N; k++) s += A[i][k] * B[k][j];
            C[i][j] = s;
        }
}

static double checksum(void) {
    double s = 0;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++) s += C[i][j];
    return s;
}

int main(void) {
    init();
    multiply();
    printf("checksum %.0f\n", checksum());
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fno-inline -pg -o prof prof.c && ./prof && gprof -b -p prof gmon.out
checksum 20269423464
Flat profile:

Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total           
 time   seconds   seconds    calls  ms/call  ms/call  name    
 97.89      0.93     0.93        1   930.00   930.00  multiply
  1.05      0.94     0.01        1    10.00    10.00  checksum
  1.05      0.95     0.01        1    10.00    10.00  init
```

(`-fno-inline` keeps the three functions separate so that the profile can name them.) Almost all of the time is in `multiply`. Amdahl's law ([[parallel-computing/performance-laws#thm-amdahl]]) says what that means: making `init` and `checksum` infinitely fast would gain at most $2\%$, and the whole effort should go into `multiply`. The resolution is coarse — one sample, $10$ ms, is all that `init` and `checksum` received — so a profile tells where to look rather than precise times.
:::
:::

## Making one core fast

A core of this machine can issue, each cycle, two fused multiply–add (FMA) instructions on $256$-bit vectors of four `double`s: $16$ floating-point operations per cycle ([[parallel-computing/parallel-architectures#def-peak]]). Reaching that needs three things: vector instructions, enough independent operations to keep the pipelines full, and data that arrives fast enough.

### Vectorisation

Compilers turn loops into SIMD code automatically when they can prove it is safe and think it profitable. GCC does so at `-O2` (since version 12, with a cheap cost model) and `-O3`; `-march=native` lets it use every instruction the machine has (AVX2 and FMA here; without it, GCC targets the 2003-era SSE2 baseline); and `-fopt-info-vec` reports which loops were vectorised.

::: example Vectorising a loop and a reduction {#ex-vectorise}
Time `saxpy` ($y_i \gets a x_i + y_i$) and the dot product $\sum_i x_i y_i$ on `float` arrays of $4096$ elements (they fit in the L1 and L2 caches, so memory is not the limit), repeating each $200{,}000$ times, with four sets of compiler flags.
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

enum { N = 4096, REPS = 200000 };                 /* 3 x 16 KiB arrays: fit in L1+L2 */

static double now(void) {
    struct timespec t; clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + 1e-9 * t.tv_nsec;
}

__attribute__((noipa))     /* keep the call: no inlining or hoisting */
static void saxpy(float *restrict y, const float *restrict x, float a, int n) {
    for (int i = 0; i < n; i++) y[i] = a * x[i] + y[i];
}

__attribute__((noipa))     /* keep the call: no inlining or hoisting */
static float dot(const float *x, const float *y, int n) {
    float s = 0;
    for (int i = 0; i < n; i++) s += x[i] * y[i];  /* a reduction: order matters */
    return s;
}

int main(void) {
    float *x = aligned_alloc(64, N * sizeof *x), *y = aligned_alloc(64, N * sizeof *y);
    for (int i = 0; i < N; i++) { x[i] = 1.0f / (i + 1); y[i] = 0.0f; }
    double t0 = now();
    for (int r = 0; r < REPS; r++) saxpy(y, x, 1e-6f, N);
    double t1 = now();
    float s = 0;
    for (int r = 0; r < REPS; r++) s += dot(x, y, N);
    double t2 = now();
    printf("saxpy %.2f Gflop/s   dot %.2f Gflop/s   (check %g)\n",
           2.0 * N * REPS / (t1 - t0) / 1e9, 2.0 * N * REPS / (t2 - t1) / 1e9, s);
    return 0;
}
```

```console
$ for f in "-O2 -fno-tree-vectorize" "-O2" "-O3 -march=native" "-O3 -march=native -ffast-math"; do
>   gcc -std=c17 -Wall -Wextra $f -o vec vec.c && printf "%-31s" "$f"; ./vec; done
-O2 -fno-tree-vectorize        saxpy 2.95 Gflop/s   dot 1.92 Gflop/s   (check 65636.6)
-O2                            saxpy 10.94 Gflop/s   dot 1.99 Gflop/s   (check 65636.6)
-O3 -march=native              saxpy 17.54 Gflop/s   dot 1.74 Gflop/s   (check 65636.6)
-O3 -march=native -ffast-math  saxpy 19.68 Gflop/s   dot 8.91 Gflop/s   (check 65636.6)
```

`saxpy` gains a factor of $3.7$ from $128$-bit SSE vectors (four `float`s) and $6$ from $256$-bit AVX vectors (eight). The `restrict` qualifiers promise that `x` and `y` do not overlap; without them the compiler must either check at run time or give up. The dot product does not improve at all until `-ffast-math`, although `-fopt-info-vec` claims success:

```console
$ gcc -std=c17 -O3 -march=native -fopt-info-vec-optimized -c vec.c
vec.c:15:23: optimized: loop vectorized using 32 byte vectors
vec.c:15:23: optimized: loop vectorized using 16 byte vectors
vec.c:21:23: optimized: loop vectorized using 32 byte vectors
vec.c:21:23: optimized: loop vectorized using 16 byte vectors
vec.c:27:23: optimized: loop vectorized using 32 byte vectors
```

The assembly (`gcc -S`) shows why: the loop on line $21$ computes eight products with one `vmulps`, then adds them to `s` one at a time with eight scalar `vaddss` instructions, each depending on the previous. Floating-point addition is not associative ([[parallel-computing/shared-memory#warn-fp]]), so C requires the additions in source order, and the compiler keeps it. `-ffast-math` allows reassociation; the compiler then keeps eight partial sums in one vector register and combines them at the end — a different, and here very slightly different, result ($65636.6$ in both cases at six digits).
:::
:::

Why do the dot products run at $1.9$ and $8.9$ Gflop/s, when `saxpy` reaches $19.7$? Not for lack of vector units, but because of a dependence chain.

::: proposition Throughput of dependence chains {#prop-chains}
Suppose a loop consists of $k$ independent chains of operations, each operation depending on the previous one in its chain, executed on $u$ pipelined functional units that each accept one operation per cycle and deliver its result $\ell$ cycles later. Then the loop completes at most $\min(k/\ell,\ u)$ operations per cycle.
:::

::: proof
At most $u$ operations can start per cycle, which gives the second bound. For the first: an operation can start only when the previous operation in its chain has finished, so each chain has at most one operation in flight at any time, and at most $k$ are in flight in total. Each spends $\ell$ cycles in flight. By Little's law ([[parallel-computing/gpu-programming#thm-little]]), throughput equals the average number in flight divided by the time each spends, so it is at most $k/\ell$.
:::

On Haswell, vector addition has latency $3$ cycles and FMA latency $5$ cycles, and there are two FMA units. The in-order dot product is a single chain of scalar additions: one addition, two flops counting its multiply, every $3$ cycles — at about $2.9$ GHz, $2 \times 2.9/3 \approx 1.9$ Gflop/s, as measured. With `-ffast-math` it is one chain of vector FMAs on eight lanes: $16$ flops every $5$ cycles, $9.3$ Gflop/s at $2.9$ GHz, against $8.9$ measured. To reach the peak of $2$ FMAs per cycle the loop needs $k \ge u\ell = 10$ independent chains — ten accumulators.

::: example Reaching the peak {#ex-peak-fma}
Measure the machine's floating-point peak with a kernel of ten independent vector FMA chains per thread.
::: solution
```c
#include <omp.h>
#include <stdio.h>

typedef double v4 __attribute__((vector_size(32)));   /* one AVX2 register: 4 doubles */
enum { ACC = 10, ITERS = 100000000 };                 /* 10 independent FMA chains */

int main(void) {
    double total = 0, t0 = omp_get_wtime();
    #pragma omp parallel reduction(+ : total)
    {
        v4 acc[ACC], m = {0.999999, 0.999999, 0.999999, 0.999999}, a = {1e-6, 1e-6, 1e-6, 1e-6};
        for (int k = 0; k < ACC; k++) acc[k] = (v4){k, k, k, k};
        for (long i = 0; i < ITERS; i++)
            for (int k = 0; k < ACC; k++) acc[k] = acc[k] * m + a;   /* compiles to vfmadd */
        for (int k = 0; k < ACC; k++) total += acc[k][0] + acc[k][1] + acc[k][2] + acc[k][3];
    }
    double t = omp_get_wtime() - t0;
    double flops = 2.0 * 4 * ACC * ITERS * omp_get_max_threads();
    printf("p=%2d  %.1f Gflop/s  (checksum %.3f)\n", omp_get_max_threads(), flops / t / 1e9, total);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp -o peak peak.c
$ objdump -d peak | grep -c vfmadd
0
$ OMP_NUM_THREADS=1 ./peak
p= 1  19.4 Gflop/s  (checksum 40.000)
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -ffp-contract=fast -fopenmp -o peak peak.c
$ objdump -d peak | grep -c vfmadd
9
$ export OMP_PROC_BIND=spread OMP_PLACES=cores
$ for p in 1 18 36; do OMP_NUM_THREADS=$p ./peak; done
p= 1  36.3 Gflop/s  (checksum 40.000)
p=18  678.8 Gflop/s  (checksum 720.000)
p=36  1110.6 Gflop/s  (checksum 1440.000)
```

The first build contains no FMA at all: in strict ISO C mode (`-std=c17`) GCC does not fuse a multiply and an add into one instruction, since the fused operation rounds once instead of twice and so gives a (slightly more accurate) different result. The kernel then runs at half speed. Allowing contraction with `-ffp-contract=fast` (or using `-std=gnu17`, or the `fma` function) produces `vfmadd` instructions — nine occurrences in the binary, the compiler having partly unrolled and rearranged the loop — and one core reaches $36.3$ Gflop/s, $16$ flops per cycle at about $2.3$ GHz. All $36$ cores give $1.11$ Tflop/s, $84\%$ of the $1.32$ Tflop/s computed from the base clock in [[parallel-computing/parallel-architectures#ex-peak]]. It is a number almost no real program approaches, but it is the ceiling of the roofline.
:::
:::

### Cache blocking

The memory hierarchy rewards locality ([[computer-systems/memory-hierarchy#def-locality]]): data used again soon should still be in cache, and data used next should be in the same cache line. To reason about matrix multiplication we use the simplest model of a cache.

::: definition The ideal-cache model {#def-ideal-cache}
A processor has a fully associative cache of $M$ words, organised in lines of $L$ words, with least-recently-used replacement, in front of an unbounded memory. A **miss** occurs when the processor accesses a word whose line is not in the cache; the line is then fetched, evicting the least recently used line if the cache is full. The cost of an algorithm in this model is its number of misses $Q$.
:::

::: theorem Cache misses of matrix multiplication {#thm-matmul-misses}
Multiply $N \times N$ row-major matrices, $C \gets C + AB$, with $N$ a multiple of $L$, in the ideal-cache model.

1. The **$ijk$** loop (inner loop over $k$, reading $B$ down a column) incurs at least $N^3$ misses if $N > M/L$.
2. The **$ikj$** loop (inner loop over $j$, reading rows of $B$ and $C$) incurs at most $2N^3/L + 2N^2 + N^2/L$ misses.
3. The **blocked** loop with $b \times b$ blocks, $b$ a multiple of $L$ dividing $N$ and $3b^2 \le M$, incurs at most $3N^3/(bL)$ misses; with $b \approx \sqrt{M/3}$ this is $O(N^3/(L\sqrt{M}))$.
:::

::: proof
(1) Fix $i$ and $j$. The inner loop reads $B_{0j}, B_{1j}, \dots, B_{N-1,j}$, which lie in $N$ different lines, since consecutive elements of a column are $N \ge L$ words apart. The next time line of $B_{kj}$ is needed is in the next iteration of $j$ (for $B_{k,j+1}$, in the same line), and between those two accesses the loop accesses the $N - 1$ other column lines. Since $N > M/L$, the number of lines that fit, LRU has evicted the line by then. So every access to $B$ misses: $N$ misses for each of the $N^2$ pairs $(i, j)$.

(2) Fix $i$ and $k$. The inner loop reads row $k$ of $B$ and reads and writes row $i$ of $C$, two runs of $N$ consecutive words, which occupy at most $N/L + 1$ lines each; so at most $2N/L + 2$ misses, whatever the cache held before, plus one access to $A_{ik}$, which over the whole computation reads $A$ in row-major order and misses at most $N^2/L$ times. Summing over the $N^2$ pairs $(i, k)$ gives the bound.

(3) The blocked loop performs $(N/b)^3$ block products $C_{IJ} \gets C_{IJ} + A_{IK}B_{KJ}$. One block product touches three $b \times b$ blocks, each consisting of $b$ row segments of $b$ consecutive words, which (as $L$ divides $b$ and $N$) are exactly $b/L$ lines each: $3b^2/L$ lines in all. These fit in the cache together ($3b^2 \le M$), so during the block product each is fetched at most once — at most $3b^2/L$ misses. Summing, $Q \le (N/b)^3 \cdot 3b^2/L = 3N^3/(bL)$.
:::

Hong and Kung proved in 1981 that every algorithm computing the $N^3$ products of the classical method must incur $\Omega(N^3/(L\sqrt{M}))$ misses, so blocking is optimal up to a constant. The **cache-oblivious** recursive algorithm — split each matrix into four quadrants and recurse — attains the same bound for every cache size simultaneously, without knowing $M$ (Frigo, Leiserson, Prokop and Ramachandran, 1999).

The opening measurement fits the theorem. With $N = 2048$, $L = 8$ `double`s per $64$-byte line and an L1 cache of $512$ lines, the $ijk$ loop misses in L1 on essentially every access to $B$; worse, consecutive accesses lie $16$ KiB apart, in different $4$ KiB pages, so the $2048$ pages of a column exceed the processor's translation buffer (TLB) too. The $ikj$ loop streams along rows, and is $5.3$ times faster. The blocked version, with $b = 64$ ($3 \times 64^2 \times 8 = 96$ KiB, which fits in the $256$ KiB L2 cache), is faster again, and since its blocks of $C$ are independent, it parallelises with one OpenMP directive:

```c
static void blocked(void) {                         /* ikj on BS x BS blocks, in parallel */
    #pragma omp parallel for collapse(2) schedule(static)
    for (int i0 = 0; i0 < N; i0 += BS)
        for (int j0 = 0; j0 < N; j0 += BS)
            for (int k0 = 0; k0 < N; k0 += BS)
                for (int i = i0; i < i0 + BS; i++)
                    for (int k = k0; k < k0 + BS; k++) {
                        double a = A[i][k];
                        for (int j = j0; j < j0 + BS; j++) C[i][j] += a * B[k][j];
                    }
}
```

(`collapse(2)` distributes the $32 \times 32 = 1024$ pairs $(i_0, j_0)$ among the threads; each pair owns a block of $C$, so there are no races. The full program `mm.c` adds the other two loops, initialisation with $A_{ij} = (i + j) \bmod 7$, $B_{ij} = ij \bmod 5$, timing with `omp_get_wtime`, and a selector argument.)

Even blocked, a core reaches only $5.8$ of its $36$ Gflop/s. The inner loop does one FMA per element of $C$ loaded and stored: one load of $B$, a load and a store of $C$ per two flops, which saturates the L1 cache's load and store ports long before the FMA units. Production libraries (OpenBLAS, BLIS, Intel MKL) add **register blocking**: a micro-kernel keeps, say, a $6 \times 16$ block of $C$ in twelve vector registers and updates it with an outer product of a column of $A$ and a row of $B$, so that each loaded value feeds several FMAs; they also copy blocks into contiguous buffers to avoid TLB misses. They reach $85$–$95\%$ of peak. The lesson for everyone else: call the library.

::: quiz
On this machine (two FMA units, FMA latency $5$ cycles), which statements are correct?
- [x] A dot product with a single accumulator cannot exceed one vector FMA every $5$ cycles, whatever the vector width.
- [x] Interchanging the $j$ and $k$ loops of matrix multiplication changes the number of cache misses but not the number of arithmetic operations.
- [ ] `-fopt-info-vec` reporting a loop as vectorised guarantees that it runs several times faster.
- [ ] Blocking matrix multiplication for the cache reduces the number of floating-point operations from $2N^3$ to $O(N^3/\sqrt{M})$.
::: solution
The first is [[#prop-chains]] with $k = 1$. The second: the loop orders perform the same multiply–adds, in different orders, but touch memory differently ([[#thm-matmul-misses]]). The third is false — our dot product was "vectorised" with scalar in-order additions and did not speed up. The fourth confuses operations with misses: blocking reduces cache misses, never the $2N^3$ operations.
:::
:::

## Memory bandwidth and NUMA

For kernels below the ridge of the roofline, the attainable speed is set by memory bandwidth. The standard measurement is the **STREAM** benchmark of John McCalpin (1995), whose "triad" kernel $a_i \gets b_i + s c_i$ does two flops per $24$ bytes moved.

::: example Bandwidth and first touch {#ex-triad}
Measure the triad bandwidth on arrays of $8 \times 10^7$ `double`s ($640$ MB each, far larger than the caches), for different numbers of threads, with the arrays initialised serially or in parallel.
::: solution
```c
#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

enum { N = 80000000 };                            /* 3 arrays x 640 MB */

int main(int argc, char *argv[]) {
    int parallel_init = argc > 1 && atoi(argv[1]);
    double *a = malloc(N * sizeof *a), *b = malloc(N * sizeof *b), *c = malloc(N * sizeof *c);
    #pragma omp parallel for schedule(static) if (parallel_init)
    for (long i = 0; i < N; i++) { a[i] = 0; b[i] = 1; c[i] = 2; }   /* first touch */
    double best = 1e30;
    for (int r = 0; r < 5; r++) {                 /* best of five runs */
        double t0 = omp_get_wtime();
        #pragma omp parallel for schedule(static)
        for (long i = 0; i < N; i++) a[i] = b[i] + 3.0 * c[i];
        double t = omp_get_wtime() - t0;
        if (t < best) best = t;
    }
    printf("p=%2d %s init: triad %.1f GB/s (counting 24 bytes per element), a[7] = %g\n",
           omp_get_max_threads(), parallel_init ? "parallel" : "serial  ",
           24.0 * N / best / 1e9, a[7]);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp -o triad triad.c
$ export OMP_PROC_BIND=spread OMP_PLACES=cores
$ for p in 1 2 4 8 16 32 36; do OMP_NUM_THREADS=$p ./triad 1; done
p= 1 parallel init: triad 8.8 GB/s (counting 24 bytes per element), a[7] = 7
p= 2 parallel init: triad 18.0 GB/s (counting 24 bytes per element), a[7] = 7
p= 4 parallel init: triad 36.5 GB/s (counting 24 bytes per element), a[7] = 7
p= 8 parallel init: triad 64.1 GB/s (counting 24 bytes per element), a[7] = 7
p=16 parallel init: triad 70.8 GB/s (counting 24 bytes per element), a[7] = 7
p=32 parallel init: triad 72.9 GB/s (counting 24 bytes per element), a[7] = 7
p=36 parallel init: triad 65.6 GB/s (counting 24 bytes per element), a[7] = 7
$ OMP_NUM_THREADS=36 ./triad 0
p=36 serial   init: triad 39.3 GB/s (counting 24 bytes per element), a[7] = 7
$ OMP_NUM_THREADS=36 numactl --interleave=all ./triad 0
p=36 serial   init: triad 65.4 GB/s (counting 24 bytes per element), a[7] = 7
$ OMP_NUM_THREADS=36 ./triad 1
p=36 parallel init: triad 73.3 GB/s (counting 24 bytes per element), a[7] = 7
```

One core moves $8.8$ GB/s: it is limited not by the memory but by how many cache misses it can have outstanding (about ten line-fill buffers per core; by Little's law, ten $64$-byte lines per $\sim 80$ ns of latency is $8$ GB/s). Bandwidth grows almost linearly to $8$ threads and saturates at about $70$–$73$ GB/s from $16$: beyond that, extra threads only queue at the memory controllers, and the $36$-thread runs vary by $10\%$ from run to run. The writes of `a` cost an extra read (write-allocate), so the memory actually moves $32$ bytes per element, about $97$ GB/s.

The two initialisations differ by a factor of almost two. Linux allocates a physical page on the NUMA node of the core that first writes it (**first-touch** placement). With serial initialisation every page lands on socket $0$'s memory: all $36$ threads then share one socket's memory controllers, and the $18$ threads on socket $1$ reach it across the inter-socket link. Interleaving pages round-robin across both nodes (`numactl --interleave=all`) recovers most of the loss; initialising in parallel, with the same static schedule as the compute loop, so that each thread's pages are local, is best.
:::
:::

::: warning Initialise data where it will be used
On a multi-socket machine the most common performance bug of a parallel program is not in its parallel loops but in its serial initialisation: by first touch, all the memory ends up on one socket. Initialise arrays with the same parallel loop and the same `schedule(static)` as the computation, pin threads (`OMP_PROC_BIND`, `OMP_PLACES`), and check placement with `numactl --hardware` and `numastat`. Similarly, `calloc` or `memset` before a parallel loop decides placement; `malloc` alone does not, since pages are not allocated until touched.
:::

### The roofline, measured

We now have both roofs for this machine: a compute roof of $\pi \approx 1110$ Gflop/s (measured, double precision, with FMA) and a bandwidth roof of $\beta \approx 97$ GB/s of memory traffic (the triad, counting write-allocate). The ridge lies at $\pi/\beta \approx 11$ flop/byte. Each kernel is placed at its arithmetic intensity, counting the bytes that must cross the memory interface:

- the triad: $2$ flops per $32$ bytes, $I = 1/16$; measured $73.3 \times 2/24 = 6.1$ Gflop/s;
- the Jacobi stencil of [[parallel-computing/message-passing#prop-decomposition]], $v_{ij} = \frac14(u_{i-1,j} + u_{i+1,j} + u_{i,j-1} + u_{i,j+1})$: four flops per point; if the three rows of $u$ in use stay in cache, each point reads one `double` of $u$ and writes one of $v$ (plus its write-allocate read), $24$ bytes, so $I = 1/6$; measured below at $3.75 \times 10^9$ updates per second, $15$ Gflop/s;
- blocked matrix multiplication, with whole-matrix intensity $2N^3/(3 \times 8N^2) = N/12 \approx 171$; measured $133$ Gflop/s.

::: widget plot
f: min(log2(P), x + log2(B))
x: -5, 10
y: 0, 12
sliders: P=1110:100:1400:10; B=97:20:150:1
labels: \log_2 \text{attainable Gflop/s}
points: -4,2.61; -2.58,3.91; 7.42,7.06
caption: The measured roofline of the 36-core machine, on logarithmic axes: the horizontal axis is $\log_2$ of the arithmetic intensity (flop per byte of memory traffic) and the vertical axis $\log_2$ of Gflop/s, for peak $\pi = P$ Gflop/s and bandwidth $\beta = B$ GB/s. The dots are the measured triad ($I = 1/16$, $6.1$ Gflop/s), Jacobi stencil ($I = 1/6$, $15$ Gflop/s) and blocked matrix multiplication ($I \approx 171$, $133$ Gflop/s). The two stencils sit on the bandwidth roof: no amount of vectorisation will speed them up, only less traffic. Matrix multiplication sits far below the compute roof — a factor of eight, the room that register blocking would fill. Set $P = 1325$, the theoretical peak, to see how little the ridge moves.
:::

The roofline tells us which optimisation could help. For the stencils, only reducing memory traffic: using `float` instead of `double`, or **temporal blocking**, which performs several iterations on a tile while it is in cache before moving on. For matrix multiplication, improving the arithmetic — registers, vector instructions, FMA — while its blocking already keeps the memory traffic low.

## Scaling

::: definition Strong and weak scaling {#def-scaling}
A **strong-scaling** study runs a fixed problem on $p = 1, 2, 4, \dots$ processors and reports the speed-up $S(p) = T(1)/T(p)$ and efficiency $E(p) = S(p)/p$; its ideal is $S(p) = p$, and Amdahl's law limits it. A **weak-scaling** study grows the problem in proportion to $p$, keeping the work per processor fixed, and reports the weak efficiency $E_w(p) = T(1, n_1)/T(p, n_p)$; its ideal is constant run time, $E_w = 1$, and Gustafson's law describes it ([[parallel-computing/performance-laws#thm-gustafson]]).
:::

::: example Scaling a memory-bound stencil {#ex-scaling}
Run $20$ Jacobi sweeps on an $n \times n$ grid with OpenMP (parallel first touch, `schedule(static)` over rows), strongly for $n = 8192$ and weakly with $n = 2048\sqrt{p}$, so that each thread always has $2048^2$ points.
::: solution
```c
#include <math.h>
#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

/* ITERS Jacobi sweeps on an n x n grid (boundary fixed), n from the command line. */
int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 4096;
    enum { ITERS = 20 };
    double *u = malloc(n * n * sizeof *u), *v = malloc(n * n * sizeof *v);
    #pragma omp parallel for schedule(static)          /* first touch in parallel */
    for (long i = 0; i < n; i++)
        for (long j = 0; j < n; j++) u[i * n + j] = v[i * n + j] = (i == 0) ? 1.0 : 0.0;
    double t0 = omp_get_wtime();
    for (int it = 0; it < ITERS; it++) {
        #pragma omp parallel for schedule(static)
        for (long i = 1; i < n - 1; i++)
            for (long j = 1; j < n - 1; j++)
                v[i * n + j] = 0.25 * (u[(i - 1) * n + j] + u[(i + 1) * n + j]
                                       + u[i * n + j - 1] + u[i * n + j + 1]);
        double *t = u; u = v; v = t;                     /* swap old and new */
    }
    double t = omp_get_wtime() - t0;
    printf("p=%2d n=%5ld  %.3f s  %.2f Gupdates/s  (u[n+1] = %.6f)\n", omp_get_max_threads(), n, t,
           (double)ITERS * (n - 2) * (n - 2) / t / 1e9, u[n + 1]);
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp -o jacobi jacobi.c -lm
$ export OMP_PROC_BIND=spread OMP_PLACES=cores
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./jacobi 8192; done
p= 1 n= 8192  3.394 s  0.40 Gupdates/s  (u[n+1] = 0.470366)
p= 2 n= 8192  1.942 s  0.69 Gupdates/s  (u[n+1] = 0.470366)
p= 4 n= 8192  0.870 s  1.54 Gupdates/s  (u[n+1] = 0.470366)
p= 8 n= 8192  0.434 s  3.09 Gupdates/s  (u[n+1] = 0.470366)
p=16 n= 8192  0.360 s  3.73 Gupdates/s  (u[n+1] = 0.470366)
p=32 n= 8192  0.404 s  3.32 Gupdates/s  (u[n+1] = 0.470366)
$ OMP_NUM_THREADS=1 ./jacobi 2048; OMP_NUM_THREADS=4 ./jacobi 4096
$ OMP_NUM_THREADS=16 ./jacobi 8192; OMP_NUM_THREADS=36 ./jacobi 12288
p= 1 n= 2048  0.183 s  0.46 Gupdates/s  (u[n+1] = 0.470366)
p= 4 n= 4096  0.191 s  1.76 Gupdates/s  (u[n+1] = 0.470366)
p=16 n= 8192  0.358 s  3.75 Gupdates/s  (u[n+1] = 0.470366)
p=36 n=12288  0.833 s  3.62 Gupdates/s  (u[n+1] = 0.470366)
```

(The checksum $u_{1,1}$ is the same for every $n$ and $p$, as it should be: after $20$ sweeps it depends only on the values within $20$ points of it.) Strong scaling: speed-ups $1.75, 3.90, 7.82, 9.43, 8.40$ at $p = 2, 4, 8, 16, 32$, efficiencies $0.87, 0.98, 0.98, 0.59, 0.26$. Weak scaling: efficiencies $0.96, 0.51, 0.22$ at $p = 4, 16, 36$.

Both studies stall at the same place, about $3.7 \times 10^9$ updates per second. At $24$ bytes per update that is $90$ GB/s — the bandwidth roof of [[#ex-triad]]. The stencil is memory-bound, and from $8$ threads on, the cores share a saturated memory system. Amdahl's law with any serial fraction would not fit these curves; the right model is $S(p) \approx \min(p, S_{\max})$ with $S_{\max} = \beta_{\text{machine}}/\beta_{\text{core}} \approx 9$, the ratio of the machine's bandwidth to one core's. Weak scaling does not rescue a program limited by a shared resource: when the work per thread is fixed, the demand on the shared memory still grows with $p$. (On a cluster, each node brings its own memory, and weak scaling of the same stencil is nearly perfect — the halo exchange of [[parallel-computing/message-passing#prop-decomposition]] is the only added cost.)
:::
:::

::: widget plot
f: min(x, s); x
x: 1, 36
y: 0, 36
sliders: s=9.4:1:36:0.1
labels: \text{bandwidth-limited } \min(p, S_{\max}); \text{linear}
points: 1,1; 2,1.75; 4,3.90; 8,7.82; 16,9.43; 32,8.40
caption: Strong scaling of the $8192 \times 8192$ Jacobi stencil (dots, measured) against the bandwidth model $S(p) = \min(p, S_{\max})$, where $S_{\max}$ (the slider $s$) is the ratio of the machine's memory bandwidth to that of one core. The measurements follow the line $S = p$ up to $8$ threads and then hit the ceiling; at $32$ threads they fall slightly below it, as contention adds latency. Compare the Amdahl curves of [[parallel-computing/performance-laws]], which bend gradually: a sharp corner like this one is the signature of a saturated shared resource, not of a serial fraction.
:::

The same analysis distinguishes the other common shapes of a scaling curve. A curve that bends gradually from the start suggests a serial fraction; one whose efficiency falls with the number of threads but recovers with a larger problem suggests overhead per thread (synchronisation, scheduling — [[parallel-computing/performance-laws#def-isoefficiency]]); one that becomes erratic suggests load imbalance, false sharing ([[parallel-computing/memory-consistency#def-false-sharing]]) or interference from other jobs; and a speed-up above $p$ — **superlinear** speed-up — usually means that the pieces of a divided problem started fitting in the processors' caches.

::: history
Gene Amdahl's 1967 argument and John Gustafson's 1988 reply framed the question of scaling ([[parallel-computing/performance-laws]]). The first profiler for Unix, `prof`, appeared in the early 1970s; `gprof`, with its call-graph profile, was described by Susan Graham, Peter Kessler and Marshall McKusick in 1982. Jia-Wei Hong and H. T. Kung proved the lower bound on the I/O of matrix multiplication in 1981, and blocked algorithms for dense linear algebra became the basis of LAPACK (1992), built on the level-3 BLAS (Dongarra, Du Croz, Duff and Hammarling, 1990). John McCalpin introduced the STREAM benchmark in 1995, when "the memory wall" (William Wulf and Sally McKee's phrase, 1995) was becoming the central problem of performance. Kazushige Goto's hand-tuned matrix kernels (around 2002–2008, described with Robert van de Geijn in 2008) showed how to organise blocking around TLBs and registers, and led to OpenBLAS and BLIS. Matteo Frigo, Charles Leiserson, Harald Prokop and Sridhar Ramachandran introduced cache-oblivious algorithms in 1999. Hardware performance counters became widely accessible through PAPI (from 1999) and Linux `perf` (2009). Samuel Williams, Andrew Waterman and David Patterson published the roofline model in 2009.
:::

## Where this leads

Every chapter of this course has a performance-engineering side: false sharing and NUMA in [[parallel-computing/memory-consistency]], occupancy and coalescing in [[parallel-computing/gpu-programming]], communication costs in [[parallel-computing/message-passing]]. The compiler transformations behind vectorisation and loop interchange — dependence analysis, loop tiling, unrolling — belong to [[compilers/dataflow-optimisation]]; floating-point reassociation is analysed in [[computer-systems/floating-point]]. And at the scale of data centres, where performance is measured as tail latency and throughput of services, these methods continue in [[distributed-systems]].

::: summary
- **Measure** properly: repeat runs, report medians and spreads ([[#ex-timing]]), keep results live with checksums, pin threads; **profile** before optimising ([[#ex-gprof]]).
- **Vectorisation** multiplies throughput ($2.95 \to 17.5$ Gflop/s for `saxpy`), but reductions need permission to reassociate (`-ffast-math` or `omp simd reduction`), and strict ISO C forbids FMA contraction ([[#ex-vectorise]], [[#ex-peak-fma]]).
- **Dependence chains** limit throughput to $\min(k/\ell, u)$ ([[#prop-chains]]); ten independent FMA chains reach the peak, $36$ Gflop/s per core and $1.11$ Tflop/s for $36$ cores.
- **Cache misses** of matrix multiplication: $N^3$ for $ijk$, about $2N^3/L$ for $ikj$, $3N^3/(bL)$ blocked ([[#thm-matmul-misses]]); measured $21.9$ s, $4.1$ s, $3.0$ s on one core, $0.13$ s blocked on $32$.
- **Memory bandwidth** saturates at about $73$ GB/s (triad) from $16$ threads; serial first touch halves it ([[#ex-triad]]).
- The measured **roofline** ($1110$ Gflop/s, $97$ GB/s) shows the stencils on the bandwidth roof and matrix multiplication well below the compute roof.
- **Strong and weak scaling** ([[#def-scaling]]) of a memory-bound stencil both stop at a speed-up of about $9$: a saturated shared resource, not a serial fraction ([[#ex-scaling]]).
:::

## Exercises

::: exercise The triad on the roofline {level=1 check="6.25"}
A machine sustains $75$ GB/s on the triad $a_i \gets b_i + s c_i$, counting $24$ bytes per element. How many Gflop/s does the triad achieve? (Enter the number.)
::: solution
Each element costs two flops (a multiply and an add) and $24$ counted bytes, so $75 \times 2/24 = 6.25$ Gflop/s. No compiler flag will change this: the kernel is on the bandwidth roof.
:::
:::

::: exercise The ridge point {level=1 check="15"}
With a compute peak of $1110$ Gflop/s and a bandwidth of $74$ GB/s, at which arithmetic intensity (flop/byte) does the roofline's ridge lie? (Enter the number.)
::: solution
$1110/74 = 15$ flop/byte. Kernels with fewer than $15$ flops per byte of memory traffic cannot reach peak on this machine, however well they are vectorised.
:::
:::

::: exercise Choosing a block size {level=1 check="104"}
What is the largest block size $b$ for which three $b \times b$ blocks of `double`s fit in a $256$ KiB L2 cache, $3 \cdot 8b^2 \le 262{,}144$? (Enter $b$.)
::: solution
$b^2 \le 262{,}144/24 \approx 10{,}922.7$, so $b \le 104.5$ and $b = 104$ ($3 \times 8 \times 104^2 = 259{,}584$ bytes; $105$ needs $264{,}600$). In practice one chooses a somewhat smaller block, a multiple of the line size and of the vector width — such as $64$ — because a real cache is not fully associative and also holds other data.
:::
:::

::: exercise Predicting the loop-order ratio {level=2 check="4.5"}
By [[#thm-matmul-misses]], for large $N$ and $L = 8$, the $ijk$ loop incurs about $N^3 + N^3/L$ misses ($B$ on every access, $A$ along rows) and the $ikj$ loop about $2N^3/L$. What is the ratio of the two? (Enter the ratio.) Compare it with the measured time ratio.
::: solution
$(1 + 1/8)N^3 / (2N^3/8) = 1.125/0.25 = 4.5$. The measured ratio is $21.922/4.104 = 5.3$. The model gets the order of magnitude right; the remaining factor comes from costs the ideal cache ignores — TLB misses for $ijk$, whose column accesses each fall in a new page, and the hardware prefetcher, which helps the sequential $ikj$ loop far more than the strided one.
:::
:::

::: exercise Strong-scaling speed-up {level=1 check="9.43"}
The Jacobi stencil with $n = 8192$ took $3.394$ s on one thread and $0.360$ s on $16$. What is the speed-up? (Enter it to two decimals.) What is the efficiency?
::: solution
$3.394/0.360 = 9.43$, efficiency $9.43/16 = 0.59$. Doubling to $32$ threads made the program slower ($0.404$ s): beyond saturation, extra threads add contention, not bandwidth.
:::
:::

::: exercise Weak-scaling efficiency {level=1 check="0.51"}
With $2048^2$ points per thread, the stencil took $0.183$ s on $1$ thread and $0.358$ s on $16$ threads ($n = 8192$). What is the weak-scaling efficiency at $p = 16$? (Enter it to two decimals.)
::: solution
$E_w = 0.183/0.358 = 0.51$. With ideal weak scaling the time would stay at $0.183$ s. That it nearly doubles shows that the per-thread work is not the only thing held constant: the demand on the shared memory system grew sixteenfold, and its bandwidth only ninefold.
:::
:::

::: exercise Acting on a profile {level=2 check="4.86"}
In [[#ex-gprof]], `multiply` took $97.89\%$ of the time. If changing its loop order makes it $5.3$ times faster and nothing else changes, what is the overall speed-up? (Enter it to two decimals.)
::: solution
By Amdahl's law with the unaffected fraction $f = 0.0211$: $S = 1/(0.0211 + 0.9789/5.3) = 1/(0.0211 + 0.1847) = 4.86$. The remaining $2\%$ costs little now, but after a further tenfold speed-up of `multiply` it would be a third of the run time; profiles must be repeated after every change.
:::
:::

::: exercise Enough accumulators {level=2 check="10"}
A processor has two pipelined FMA units with latency $5$ cycles. What is the smallest number of independent accumulators a dot-product loop needs to issue an FMA on both units every cycle? (Enter the number.) What if the latency is $4$ cycles, as on later Intel cores?
::: solution
By [[#prop-chains]], throughput is $\min(k/5, 2)$, which equals $2$ only for $k \ge 10$. With latency $4$, eight accumulators suffice. Each accumulator is one vector register, so a register file of $16$ vector registers, as on AVX2, leaves few for the operands — one reason compilers do not unroll reductions this far on their own.
:::
:::

::: exercise Diagnosing a NUMA problem {level=2}
A colleague's OpenMP program reads a large array initialised with `memset` and then processes it with `#pragma omp parallel for` on $36$ threads of this machine. It runs at half the expected bandwidth. Explain the likely cause, propose two fixes and say how to confirm the diagnosis.
::: solution
`memset` runs on one thread, so by first-touch placement every page of the array is allocated on that thread's NUMA node. The parallel loop then has all threads reading from one socket's memory, half of them across the inter-socket link: as in [[#ex-triad]], where serial initialisation gave $39$ GB/s against $73$. Fixes: (1) initialise the array in a parallel loop with the same `schedule(static)` as the processing loop (and pin threads with `OMP_PROC_BIND`), so each thread's pages are local to it; (2) run under `numactl --interleave=all`, which spreads pages round-robin over both nodes — less good than local placement ($65$ GB/s in our measurement) but requiring no code change. To confirm: `numastat -p <pid>` shows how much of the process's memory is on each node; running with `numactl --cpunodebind=0 --membind=0` on $18$ threads should give about the same bandwidth as the $36$-thread run, since both are limited by one socket's memory.
:::
:::

::: exercise Reassociation without fast-math {#ex-omp-simd level=3}
`-ffast-math` changes the semantics of the whole file (it also assumes there are no infinities or NaNs). Use OpenMP's `simd` directive to permit reassociation of the dot product alone, measure it, and explain the result with [[#prop-chains]].
::: solution
Add one line before the loop of `dot` and compile with `-fopenmp-simd`, which honours `simd` directives without creating threads:

```c
    #pragma omp simd reduction(+ : s)              /* permission to reassociate */
    for (int i = 0; i < n; i++) s += x[i] * y[i];
```

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp-simd -o vec_simd vec_simd.c && ./vec_simd
saxpy 17.90 Gflop/s   dot 14.61 Gflop/s   (check 65636.6)
```

The dot product now runs at $14.6$ Gflop/s, faster even than with `-ffast-math` ($8.9$). The assembly explains it: the loop body is `vmulps` followed by `vaddps` into a vector accumulator. Because `-std=c17` forbids contraction, there is no FMA, and the dependence chain is the vector addition, latency $3$ cycles: $8$ lanes $\times$ $2$ flops every $3$ cycles, $15.5$ Gflop/s at $2.9$ GHz. With `-ffast-math` the chain was an FMA of latency $5$ — fewer instructions, but a longer chain, so slower. Adding `-ffp-contract=fast` and several accumulators (or letting the library do it) would raise it further, until the two loads per FMA saturate the L1 ports.
:::
:::
