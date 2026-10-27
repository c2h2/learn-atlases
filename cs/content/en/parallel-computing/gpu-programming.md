The machine of this course has, besides its $36$ CPU cores, an NVIDIA Tesla P4: a small data-centre GPU of the Pascal generation (2016), with $20$ streaming multiprocessors of $128$ arithmetic lanes each and $8$ GB of its own memory. Here are two programs that multiply $2048 \times 2048$ matrices of `float`s on it. The first is the textbook triple loop, with each GPU thread computing one entry of the product; the second is the same computation reorganised so that groups of threads cooperate through a small on-chip memory.

```console
$ ./matmul
naive:   56.22 ms   305.6 Gflop/s
tiled:   22.14 ms   776.1 Gflop/s
mismatches 0, C[5][7] = 41853 (CPU 41853)
```

(Observations on this machine, as of 2026.) Both versions perform the same $2n^3 \approx 1.7 \times 10^{10}$ floating-point operations, and produce identical results; the second is $2.5$ times faster because it reads global memory $16$ times less often. A GPU is very good at arithmetic and moderately good at moving data, and almost every GPU optimisation is a way of moving less data, or moving it in the pattern the hardware prefers.

This chapter explains the GPU execution model and how to program it, using CUDA, NVIDIA's C++ extension, as the concrete language; AMD's HIP, the cross-vendor OpenCL and SYCL, and the GPU back-ends of OpenMP and of array libraries follow the same model with different spelling. We cover kernels and the hierarchy of grids, blocks, warps and threads; the memory hierarchy; **coalescing**, **divergence** and **occupancy**, the three properties that decide performance; shared-memory **tiling**, with a proof of how much traffic it saves; parallel reduction on the GPU; and the cost of moving data between the CPU and the GPU. Every CUDA program in the chapter was compiled and run on the P4; the timings are observations on that card.

::: note Compiling the examples
The programs are CUDA C++ files (`.cu`). The usual compiler is NVIDIA's `nvcc`; on this machine the installed `nvcc` 12.5 does not accept GCC 15 as its host compiler, so the examples were compiled with Clang, which compiles CUDA directly: `clang++ -std=c++17 -O2 --cuda-path=/usr/local/cuda-12.5 --cuda-gpu-arch=sm_61 prog.cu -L/usr/local/cuda-12.5/lib64 -lcudart` (plus an include directory holding an empty `curand_mtgp32_kernel.h`, a cuRAND header that Clang's CUDA wrapper expects and this minimal toolkit lacks). With a matching toolkit, `nvcc -arch=sm_61 prog.cu` does the same. `sm_61` is the P4's compute capability; use your own GPU's.
:::

## The execution model

A GPU is a throughput machine. [[parallel-computing/parallel-architectures]] described the trade-off: instead of a few large cores that make one thread fast with caches, branch prediction and out-of-order execution, a GPU has many simple lanes, and hides the latency of memory not by avoiding it but by always having other work to switch to.

::: definition CUDA's thread hierarchy {#def-cuda-hierarchy}
A CUDA program runs on the **host** (the CPU) and launches **kernels** on the **device** (the GPU). A kernel is a function marked `__global__`, executed by every thread of a **grid**:

- the grid consists of **blocks** (thread blocks), identified by `blockIdx` (up to three dimensions), all of the same size `blockDim` (at most $1024$ threads);
- each block consists of **threads**, identified within the block by `threadIdx`;
- each block runs entirely on one **streaming multiprocessor** (SM); its threads can synchronise with a barrier, `__syncthreads()`, and share a fast on-chip **shared memory**; threads of different blocks cannot synchronise within a kernel and may run in any order, at the same time or one after another;
- the SM executes each block's threads in groups of $32$ consecutive threads called **warps**, which issue one instruction at a time for all their active threads, in SIMD fashion (NVIDIA calls this **SIMT**, single instruction, multiple threads).

A launch `kernel<<<blocks, threads>>>(args)` creates the grid and returns immediately; kernel execution is asynchronous with respect to the host.
:::

The independence of blocks is what lets the same program run on a GPU with $2$ SMs or $132$: the hardware distributes blocks over SMs as they become free, like a dynamic loop schedule ([[parallel-computing/shared-memory#thm-graham]]). Within an SM, several blocks may be **resident** at once, and the SM's warp schedulers choose, every cycle, a warp whose next instruction has its operands ready. A warp waiting for memory simply is not chosen. With enough resident warps, some warp is always ready and the arithmetic units stay busy.

::: example A first kernel {#ex-vadd}
Add two vectors of $10^6$ `float`s on the GPU.

```c
#include <cstdio>
#include <vector>

__global__ void vadd(const float *a, const float *b, float *c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;   /* this thread's element */
    if (i < n) c[i] = a[i] + b[i];                   /* the last block may overhang */
}

int main() {
    int n = 1000000;
    size_t bytes = n * sizeof(float);
    std::vector<float> a(n), b(n), c(n);
    for (int i = 0; i < n; i++) { a[i] = i; b[i] = 2 * i; }
    float *da, *db, *dc;                             /* device (GPU) memory */
    cudaMalloc(&da, bytes); cudaMalloc(&db, bytes); cudaMalloc(&dc, bytes);
    cudaMemcpy(da, a.data(), bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(db, b.data(), bytes, cudaMemcpyHostToDevice);
    int threads = 256, blocks = (n + threads - 1) / threads;
    vadd<<<blocks, threads>>>(da, db, dc, n);        /* launch: asynchronous */
    cudaMemcpy(c.data(), dc, bytes, cudaMemcpyDeviceToHost);   /* waits for the kernel */
    printf("%d blocks of %d threads; c[999999] = %.0f; %s\n", blocks, threads,
           c[n - 1], cudaGetErrorString(cudaGetLastError()));
    cudaFree(da); cudaFree(db); cudaFree(dc);
    return 0;
}
```
::: solution
```console
$ ./vadd
3907 blocks of 256 threads; c[999999] = 2999997; no error
```

The kernel body is the body of the sequential loop, with the loop index replaced by the thread's global index $i = \text{blockIdx.x} \times \text{blockDim.x} + \text{threadIdx.x}$. The grid has $\lceil 10^6/256 \rceil = 3907$ blocks; the last block has $3907 \times 256 - 10^6 = 192$ threads beyond the end of the array, so the guard `i < n` is essential — without it they would write out of bounds, an error CUDA does not report by default. The host and device have separate memories, so the program allocates device arrays and copies the inputs there and the result back. Errors from a kernel launch are reported asynchronously; checking `cudaGetLastError()` (or the return value of the next synchronising call) after launches is good practice.
:::
:::

The model has a cost model to match. Every thread of a warp executes the same instruction, so the warp is the unit of execution; global memory is accessed in units of $32$-byte **sectors**, so the pattern of the warp's $32$ addresses is the unit of memory traffic; and an SM has a fixed budget of registers, shared memory and resident threads, divided among the blocks it holds. The next three sections take these in turn.

## The memory hierarchy

::: definition CUDA memory spaces {#def-cuda-memory}
- **Registers**: private to a thread; the fastest storage. Each SM has a fixed register file ($65{,}536$ 32-bit registers on the P4) shared among its resident threads.
- **Shared memory**: on-chip, private to a block, shared by its threads, with latency of a few tens of cycles; declared with `__shared__`. Up to $48$ KiB per block by default; $96$ KiB per SM on the P4.
- **Global memory**: the device's DRAM ($8$ GB of GDDR5 on the P4, with a theoretical bandwidth of about $192$ GB/s), visible to all threads and to the host through copies; latency of several hundred cycles. It is cached in a shared L2 cache ($2$ MiB on the P4) and, for some accesses, per-SM L1 caches.
- **Local memory**: per-thread storage that does not fit in registers ("spills"), physically in global memory.
- **Constant memory**: a small read-only region cached for broadcast to all threads of a warp.
:::

Two features of this hierarchy differ from a CPU's. Shared memory is a **scratchpad**: the program, not the hardware, decides what to keep there, which makes it predictable and fast. And the hierarchy is not coherent in the way a CPU's is ([[parallel-computing/memory-consistency]]): the per-SM L1 caches are not kept coherent with each other for ordinary writes, so threads in different blocks may communicate through global memory only across kernel launches, or with atomic operations and memory fences.

### Coalescing

When the $32$ threads of a warp execute a load or store, the hardware combines their addresses into as few memory transactions as possible: one per distinct $32$-byte sector touched. If consecutive threads access consecutive $4$-byte words, the warp's $128$ bytes occupy $4$ sectors — every byte transferred is used. This is a **coalesced** access.

::: proposition Sectors touched by a strided warp access {#prop-coalescing}
If lane $k$ of a warp ($k = 0, \dots, 31$) accesses the $4$-byte word at index $sk$ of a $32$-byte-aligned array, for a stride $s \ge 1$, the access touches $\min(4s, 32)$ sectors, and the fraction of transferred bytes that are used is $\max(1/s, 1/8)$.
:::

::: proof
A sector holds $8$ words, and word $w$ lies in sector $\lfloor w/8 \rfloor$. If $s \le 8$, consecutive accessed words $sk$ and $s(k+1)$ are at most $8$ apart, so their sectors differ by at most one: the accessed words touch every sector from $0$ to $\lfloor 31s/8 \rfloor$ and no other. Since $4s - 1 \le 31s/8 < 4s$ exactly when $s \le 8$, that is $\lfloor 31s/8 \rfloor + 1 = 4s$ sectors. If $s \ge 8$, consecutive accessed words are at least $8$ apart, so no two share a sector: $32$ sectors. The useful bytes are $128$, out of $32$ bytes per sector: $128/(32 \cdot 4s) = 1/s$ for $s \le 8$ and $128/1024 = 1/8$ for $s \ge 8$.
:::

::: example Measuring the cost of strided access {#ex-stride}
Copy $2^{26}$ `float`s with a kernel in which consecutive threads access words $s$ apart, for $s = 1, 2, 4, \dots, 32$ and $33$, and compare the effective bandwidth with the sector counts of [[#prop-coalescing]].

```c
/* Each thread copies one float; consecutive threads are 'stride' floats apart. */
__global__ void copy(const float *in, float *out, int stride, int n) {
    long i = ((long)blockIdx.x * blockDim.x + threadIdx.x) * stride % n;
    out[i] = in[i];
}
```
::: solution
The index wraps around modulo $n$, so every thread still copies one `float` (for even strides some elements are copied twice and others not at all, which does not matter here). The host program launches `copy<<<n / 256, 256>>>` once to warm up and once timed with CUDA events, for each stride, and reports useful bytes ($2 \times 4n$) per second:

```console
$ ./stride
stride  1:    3.56 ms   150.7 GB/s useful
stride  2:   10.91 ms    49.2 GB/s useful
stride  4:   21.96 ms    24.4 GB/s useful
stride  8:   43.08 ms    12.5 GB/s useful
stride 16:   47.46 ms    11.3 GB/s useful
stride 32:   70.43 ms     7.6 GB/s useful
stride 33:   76.15 ms     7.1 GB/s useful
```

A few lines of Python count sectors per warp:

```python
def sectors(stride, offset=0, size=4, warp=32, sector=32):
    """Distinct 32-byte sectors touched when lane k reads element offset + k*stride."""
    return len({((offset + k * stride) * size) // sector for k in range(warp)})
for s in (1, 2, 4, 8, 16, 32):
    n = sectors(s)
    print(f"stride {s:2}: {n:2} sectors, {32 * n:4} bytes moved for 128 useful ({128 / (32 * n):.0%})")
print("stride  1, misaligned by one float:", sectors(1, offset=1), "sectors")
```

```console
stride  1:  4 sectors,  128 bytes moved for 128 useful (100%)
stride  2:  8 sectors,  256 bytes moved for 128 useful (50%)
stride  4: 16 sectors,  512 bytes moved for 128 useful (25%)
stride  8: 32 sectors, 1024 bytes moved for 128 useful (12%)
stride 16: 32 sectors, 1024 bytes moved for 128 useful (12%)
stride 32: 32 sectors, 1024 bytes moved for 128 useful (12%)
stride  1, misaligned by one float: 5 sectors
```

The coalesced copy reaches $151$ GB/s, about $78\%$ of the theoretical $192$ GB/s. Each doubling of the stride up to $8$ doubles the sectors and roughly halves the useful bandwidth, as the proposition predicts; beyond $8$ the sector count is constant, yet performance keeps falling, because DRAM itself works in larger units (the hardware fetches whole $64$- or $128$-byte chunks for efficiency, and widely scattered accesses also defeat the DRAM's row buffers). A misaligned but contiguous access costs only one extra sector. The rule: *make consecutive threads access consecutive addresses*. For arrays of structures, that often means storing them as structures of arrays.
:::
:::

::: widget plot
f: 150.7/min(x, 8)
x: 1, 33
y: 0, 160
labels: \text{model: } 150.7/\min(s, 8) \text{ GB/s}
points: 1,150.7; 2,49.2; 4,24.4; 8,12.5; 16,11.3; 32,7.6; 33,7.1
caption: Useful bandwidth of the strided copy on the Tesla P4 against the stride $s$ (dots, from [[#ex-stride]]), and the sector-count model of [[#prop-coalescing]] scaled to the coalesced rate. Notice that the measurements fall *faster* than the model at $s = 2$ and keep falling after $s = 8$, where the model is flat: sectors are not the only unit that matters, and DRAM pays for scattered access too. The lesson survives the details — every non-unit stride wastes most of the bandwidth.
:::

### Shared memory and bank conflicts

Shared memory is divided into $32$ **banks**, each serving one $4$-byte word per cycle; word address $a$ lives in bank $a \bmod 32$. If the threads of a warp access $32$ different banks, or all access the same word (a broadcast), the access takes one cycle; if $k$ threads access different words in the same bank, the access is serialised into $k$ cycles — a **$k$-way bank conflict**. Column access to a $32 \times 32$ array of `float`s is the classic conflict: all $32$ words of a column lie in one bank. Padding the array to $32 \times 33$ moves each row one bank along and removes the conflict ([[#ex-transpose]]).

## Divergence and occupancy

A warp executes one instruction at a time. If the threads of a warp take different branches of an `if`, the warp executes *both* branches in turn, with the threads not on the current path masked off.

::: proposition The cost of divergence {#prop-divergence}
If, in a warp, at least one thread takes each side of a two-way branch whose sides cost $a$ and $b$ instruction issues, the warp spends $a + b$ issues on the branch; if all threads take the same side, it spends $a$ or $b$. Divergence costs nothing between different warps.
:::

The proof is the execution model itself: the warp has one program counter for its active threads (since the Volta generation, 2017, each thread has its own program counter for the sake of forward progress, but divergent paths are still executed one after the other). Divergence is a problem when the condition varies *within* warps; a condition such as `if (threadIdx.x / 32 == 0)` that is uniform per warp is free. Reductions are the standard example.

::: algorithm Block reduction in shared memory {#alg-gpu-reduce}
Each block of $B$ threads (a power of two) loads $2B$ inputs, adding pairs as it loads, into a shared array `s[0..B)`, then halves the number of active threads in each round:

```c
template <bool SEQUENTIAL>
__global__ void block_sum(const float *in, float *out) {
    __shared__ float s[B];
    unsigned t = threadIdx.x, i = blockIdx.x * 2 * B + t;
    s[t] = in[i] + in[i + B];                        /* first addition while loading */
    __syncthreads();
    for (unsigned d = 1; d < B; d *= 2) {
        if (SEQUENTIAL) {                            /* active threads 0..B/(2d)-1 */
            unsigned h = B / (2 * d);
            if (t < h) s[t] += s[t + h];
        } else if (t % (2 * d) == 0) {               /* interleaved: every (2d)-th thread */
            s[t] += s[t + d];
        }
        __syncthreads();                             /* all of a round before the next */
    }
    if (t == 0) out[blockIdx.x] = s[0];
}
```

The block's partial sums are combined by a second kernel launch, by the host, or by one atomic addition per block.
:::

Both variants are the tree reduction of [[parallel-computing/parallel-algorithms#alg-reduce]] with $\log B$ rounds; the barrier makes each round see the previous round's writes. They differ in *which* threads are active. In the interleaved version, the active threads in round $d$ are the multiples of $2d$, scattered over every warp; in the sequential version they are threads $0, \dots, B/(2d) - 1$, packed into as few warps as possible.

::: example Counting active warps in a reduction {#ex-reduce-warps}
For $B = 256$ threads ($8$ warps), count, summed over the $8$ rounds, the number of warps that contain at least one active thread — the warps that must issue the round's instructions — for both variants. Then run both kernels on $2^{26}$ ones.
::: solution
Interleaved: for $d = 1, 2, 4, 8, 16$ every warp contains a multiple of $2d$, so all $8$ warps issue; for $d = 32$ the active threads $0, 64, 128, 192$ lie in warps $0, 2, 4, 6$; for $d = 64$ in warps $0$ and $4$; for $d = 128$ in warp $0$. Total $5 \times 8 + 4 + 2 + 1 = 47$ warp-rounds. Sequential: $128, 64, 32, 16, 8, 4, 2, 1$ active threads occupy $4, 2, 1, 1, 1, 1, 1, 1$ warps: total $12$. The interleaved version also has bank conflicts: in round $d$, active lanes access words $2d$ apart.

On the P4 (observations; the host program sums the per-block results and checks the total):

```console
$ ./reduce
interleaved: sum 67108864  1.885 ms  142.4 GB/s
sequential:  sum 67108864  1.879 ms  142.9 GB/s
```

No difference! The kernel reads each input once and does one addition per element, so it is limited by global-memory bandwidth — $143$ GB/s, close to the $151$ GB/s of the coalesced copy — and the four-fold reduction in warp instructions during the tree phase is hidden behind memory traffic. This is the roofline of [[parallel-computing/performance-laws#def-roofline]] at work: optimising the arithmetic of a memory-bound kernel buys nothing. Divergence matters in kernels that are compute-bound, and the published sequence of reduction optimisations (Mark Harris, 2007) gave large gains on the GPUs of that time, whose memory systems were less forgiving.
:::
:::

### Occupancy and latency hiding

How many warps does an SM need to hide memory latency? John Little's law from queueing theory answers it.

::: theorem Little's law {#thm-little}
In a stable system in which items arrive at average rate $\lambda$ and each spends an average time $W$ inside, the average number of items inside is $L = \lambda W$.
:::

::: proof
We give the argument for a finite observation period $[0, \tau]$ in which the system starts and ends empty. Let $N(t)$ be the number of items inside at time $t$, and let item $j$ spend time $W_j$ inside. The area under $N(t)$ counts, for every instant, the items present; so $\int_0^\tau N(t)\,dt = \sum_j W_j$, both being the total item-time spent inside. Dividing by $\tau$: the time-average number inside, $L$, equals $(n/\tau) \cdot (\sum_j W_j / n)$, where $n$ is the number of items, so $L = \lambda W$ with $\lambda = n/\tau$ and $W$ the average time per item. The general statement follows by letting $\tau \to \infty$ when the limits exist.
:::

Applied to memory: to sustain a bandwidth of $\beta$ bytes per second when each access takes latency $\ell$, there must be $\beta\ell$ bytes in flight at all times. For the P4, $192$ GB/s and (say) $500$ ns of latency give $96$ KB in flight, or $4.8$ KB per SM — $1200$ outstanding $4$-byte loads per SM, which, if each thread has one load outstanding, requires $1200$ resident threads per SM out of a maximum of $2048$. The same reasoning applies to arithmetic pipelines with a latency of a few cycles. A GPU therefore needs **parallel slackness** ([[parallel-computing/performance-laws#thm-brent]]) on a scale unknown on CPUs: hundreds of thousands of threads for a large GPU.

::: definition Occupancy {#def-occupancy}
The **occupancy** of a kernel is the ratio of the number of warps resident on an SM to the maximum the SM supports ($64$ warps, or $2048$ threads, on the P4). It is limited by whichever per-SM resource runs out first: the register file, shared memory, the maximum number of resident blocks ($32$ on the P4) or the maximum number of threads.
:::

::: example The occupancy of the tiled kernel {#ex-occupancy}
The tiled matrix-multiplication kernel of the opening uses $256$ threads per block, $31$ registers per thread and $2048$ bytes of shared memory per block (two $16 \times 16$ tiles of `float`s). What is its occupancy on the P4? What if it needed $40$ registers per thread?
::: solution
Registers: $31$ per thread are allocated as $32$ (allocation is in units), so a block needs $32 \times 256 = 8192$ of the $65{,}536$ registers: $8$ blocks. Shared memory: $98{,}304 / 2048 = 48$ blocks. Threads: $2048/256 = 8$ blocks. Block limit: $32$. The minimum is $8$ blocks $= 2048$ threads $= 64$ warps: **$100\%$ occupancy**, which `cudaOccupancyMaxActiveBlocksPerMultiprocessor` confirmed (it reported $8$ blocks per SM). With $40$ registers per thread a block would need $10{,}240$ registers, and only $\lfloor 65{,}536 / 10{,}240 \rfloor = 6$ blocks would fit: $1536$ threads, $75\%$ occupancy. High occupancy is a means, not an end: a kernel with more independent work per thread (several loads in flight, several accumulators) can hide latency at lower occupancy, as Volkov showed in 2010.
:::
:::

::: quiz
A kernel processes an array of structures `struct P { float x, y, z, w; } p[n]`, with thread $i$ reading `p[i].x` only. Which statements are correct?
- [x] Each warp's load touches $16$ sectors, of which only a quarter of the bytes are used.
- [ ] The access is coalesced, because consecutive threads access consecutive structures.
- [x] Storing the data as four separate arrays `x[n], y[n], z[n], w[n]` makes the load fully coalesced.
- [ ] Using more threads per block would make the access coalesced.
::: solution
`p[i].x` is at word $4i$: a stride of $4$ words, so by [[#prop-coalescing]] $16$ sectors and $25\%$ efficiency. Consecutive *structures* are not consecutive *words*. A structure of arrays puts the $x$ values contiguously, stride $1$. The block size does not change the addresses a warp generates.
:::
:::

## Tiling with shared memory

The naive matrix-multiplication kernel computes $C_{ij} = \sum_k A_{ik} B_{kj}$ with one thread per entry:

```c
__global__ void naive(const float *A, const float *B, float *C, int n) {
    int row = blockIdx.y * T + threadIdx.y, col = blockIdx.x * T + threadIdx.x;
    float sum = 0;
    for (int k = 0; k < n; k++) sum += A[row * n + k] * B[k * n + col];
    C[row * n + col] = sum;
}
```

Its accesses to `B` are coalesced (consecutive threads read consecutive `col`), and its accesses to `A` are broadcasts (a whole warp reads the same element), so it is not badly written. But each thread reads a whole row of $A$ and a whole column of $B$ — $2n$ values for $2n$ floating-point operations, an arithmetic intensity of $1/4$ flop per byte — and the entries are read again and again by different threads. Caches catch some of this reuse; tiling makes it explicit.

::: algorithm Tiled matrix multiplication {#alg-tiled}
Partition $C$ into $T \times T$ tiles and assign each tile to a block of $T \times T$ threads. For $k_0 = 0, T, 2T, \dots$:

1. Each thread loads one element of the $T \times T$ tile of $A$ in rows of its tile and columns $k_0, \dots, k_0 + T - 1$, and one element of the corresponding tile of $B$, into shared arrays `As` and `Bs`.
2. `__syncthreads()`: the tiles are complete.
3. Each thread accumulates $\sum_{k=0}^{T-1} \texttt{As}[t_y][k] \cdot \texttt{Bs}[k][t_x]$.
4. `__syncthreads()`: nobody overwrites the tiles while others still read them.

```c
__global__ void tiled(const float *A, const float *B, float *C, int n) {
    __shared__ float As[T][T], Bs[T][T];
    int ty = threadIdx.y, tx = threadIdx.x;
    int row = blockIdx.y * T + ty, col = blockIdx.x * T + tx;
    float sum = 0;
    for (int k0 = 0; k0 < n; k0 += T) {              /* one pair of tiles per phase */
        As[ty][tx] = A[row * n + k0 + tx];           /* each thread loads one element */
        Bs[ty][tx] = B[(k0 + ty) * n + col];         /*   of each tile                 */
        __syncthreads();                             /* tiles complete */
        for (int k = 0; k < T; k++) sum += As[ty][k] * Bs[k][tx];
        __syncthreads();                             /* done with the tiles */
    }
    C[row * n + col] = sum;
}
```
:::

::: theorem Tiling divides global-memory traffic by the tile width {#thm-tiling}
For $n \times n$ matrices with $T$ dividing $n$, the naive kernel issues $2n^3$ global loads and the tiled kernel $2n^3/T$, while both perform $2n^3$ floating-point operations. Hence tiling multiplies the arithmetic intensity with respect to global memory by $T$.
:::

::: proof
Naive: each of the $n^2$ threads executes $n$ iterations, each loading one element of $A$ and one of $B$: $2n \cdot n^2 = 2n^3$ loads. Tiled: each thread executes $n/T$ phases, each loading one element of $A$ and one of $B$: $2(n/T) \cdot n^2 = 2n^3/T$ loads. The arithmetic is unchanged: each thread still performs $n$ multiply–adds. The data in shared memory is reused $T$ times: each element of `As` is read by the $T$ threads of its row of the block, and each element of `Bs` by the $T$ threads of its column.
:::

With $T = 16$ the traffic falls sixteen-fold, which in the opening experiment made the kernel $2.5$ times faster — not sixteen, because the naive kernel already got much of its reuse from the L1 and L2 caches, and because the tiled kernel is now limited by other things: shared-memory bandwidth (each multiply–add reads two shared-memory words), the two barriers per phase, and instruction overhead. Production libraries (cuBLAS, CUTLASS) go further: each thread computes a small tile of $C$ in registers (register blocking), loads are vectorised and double-buffered so that the next tiles arrive while the current ones are used, and recent GPUs add **tensor cores** — units that multiply small matrices in one instruction. The idea is the same at every level: move a block of data closer to the arithmetic once, and use it many times. [[parallel-computing/performance-engineering]] applies it to CPU caches.

## Host, device and the cost of moving data

A discrete GPU is attached through a bus. Data must be copied to device memory before a kernel can use it (or be accessed remotely, slowly, through **unified memory**, which migrates pages on demand), and every kernel launch costs a few microseconds.

::: example Transfers and launches on the P4 {#ex-transfer}
Measure host-to-device copies of $4$ bytes to $64$ MiB from pinned host memory, and the time to launch an empty kernel and wait for it. Fit the copy times to $t(m) = \alpha + m/\beta$.
::: solution
```c
for (size_t bytes = 4; bytes <= max; bytes *= 64) {
    cudaMemcpy(d, h, bytes, cudaMemcpyHostToDevice);      /* warm-up */
    cudaEventRecord(t0);
    for (int r = 0; r < 10; r++) cudaMemcpy(d, h, bytes, cudaMemcpyHostToDevice);
    cudaEventRecord(t1);
    cudaEventSynchronize(t1);
    ...                                                   /* print the time per copy */
}
```

```console
$ ./xfer
         4 bytes host->device:       6.2 us    0.00 GB/s
       256 bytes host->device:       6.4 us    0.04 GB/s
     16384 bytes host->device:      12.4 us    1.32 GB/s
   1048576 bytes host->device:      93.9 us   11.17 GB/s
  67108864 bytes host->device:    5493.7 us   12.22 GB/s
empty kernel launch + synchronise: 5.9 us
```

(`h` was allocated with `cudaMallocHost`, which pins the pages so that the GPU can copy them by DMA; ordinary `malloc` memory is staged through a pinned buffer and is slower.) Small copies cost about $\alpha \approx 6$ µs whatever their size; large ones approach $\beta \approx 12.2$ GB/s, consistent with a PCIe 3.0 ×16 link, whose theoretical rate is about $15.8$ GB/s per direction. That is $12$ times less than the GPU's own memory bandwidth, and $4$ times less than the CPU's ($52$ GB/s, [[parallel-computing/parallel-architectures]]). Launch and synchronisation also cost about $6$ µs, the time in which the GPU could have executed some $40$ million floating-point operations.
:::
:::

::: widget plot
f: 2^x/(a*1000 + 2^x/b)
x: 2, 28
y: 0, 14
sliders: a=6:1:20:0.5; b=12.2:4:32:0.2
labels: \text{effective bandwidth (GB/s)}
points: 2,0; 8,0.04; 14,1.32; 20,11.17; 26,12.22
caption: Effective host-to-device bandwidth $m/(\alpha + m/\beta)$ against $\log_2$ of the transfer size $m$ in bytes, with latency $\alpha$ (µs, slider $a$) and asymptotic bandwidth $\beta$ (GB/s, slider $b$); the dots are the measurements of [[#ex-transfer]]. Half the asymptotic bandwidth is reached at $m = \alpha\beta \approx 73$ KB. Raise $b$ to $32$ (roughly PCIe 5.0 ×16, as of 2026): large transfers speed up, but small ones do not, since they are dominated by $\alpha$. The same latency–bandwidth model governs network messages in [[parallel-computing/message-passing]].
:::

The consequences for program design are direct. Offloading a computation pays only if the time saved on the GPU exceeds the transfer time — so a single vector addition of data that lives on the host is always faster on the CPU (it reads $12$ bytes per element, which the CPU can stream faster than PCIe can carry them). Keep data on the GPU across many kernels; batch small kernels into larger ones, or fuse them; and overlap transfers with computation using **streams**: queues of operations that execute in order within a stream and concurrently across streams, so that the transfer of one chunk proceeds while the previous chunk is processed.

::: warning A GPU is not a faster CPU
Moving code to a GPU makes it faster only if the code has massive, regular data parallelism *and* enough arithmetic per byte transferred. A program with $1000$-way parallelism leaves a large GPU mostly idle (it needs hundreds of thousands of threads, [[#thm-little]]); a program dominated by branching that differs from thread to thread runs at a fraction of the peak ([[#prop-divergence]]); a program whose data lives on the host and is used once is limited by the bus ([[#ex-transfer]]). Comparisons that report "$100\times$ speed-ups" usually compare an optimised GPU code with an unoptimised, single-threaded CPU code; against a vectorised, multithreaded CPU version, the typical advantage for well-suited problems is a small multiple of the ratio of memory bandwidths or peak rates. Measure against a good CPU baseline, and include transfer time.
:::

::: history
Graphics processors became programmable around 2001, and researchers soon expressed general computations as rendering passes over textures ("GPGPU"); Ian Buck and colleagues' Brook language (2004) treated the GPU as a stream processor. NVIDIA's G80 architecture (the GeForce 8800, November 2006) unified the GPU's shader units into general-purpose multiprocessors, and CUDA, released in 2007, exposed them to C programs. The Khronos Group published the cross-vendor OpenCL 1.0 specification in December 2008. John Nickolls, Ian Buck, Michael Garland and Kevin Skadron's "Scalable parallel programming with CUDA" (2008) described the model, and David Kirk and Wen-mei Hwu's *Programming Massively Parallel Processors* (2010; fourth edition with Izzat El Hajj, 2022) became the standard textbook. Mark Harris's "Optimizing parallel reduction in CUDA" (2007) and Vasily Volkov's "Better performance at lower occupancy" (2010) are classics of GPU performance tuning. Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton trained the AlexNet image classifier on two GPUs in 2012, and the success of deep learning on GPUs led NVIDIA to add tensor cores in its Volta generation (2017).
:::

## Where this leads

The algorithms of [[parallel-computing/parallel-algorithms]] — reduction, scan, radix sort with splits, bitonic sorting in shared memory, level-synchronous BFS — are the core of GPU libraries such as CUB and Thrust. Systems with several GPUs, in one node or across a cluster, communicate with collective operations ([[parallel-computing/message-passing]]), whose cost model has exactly the $\alpha + m/\beta$ form measured here. [[parallel-computing/performance-engineering]] uses the roofline model and the same tiling ideas on CPUs. Training and running neural networks, the dominant use of GPUs today, belongs to the [LLM Atlas](/learn/llm/); the circuits of GPUs belong to computer architecture in the [Electrical Engineering Atlas](/learn/ee/).

::: summary
- A CUDA kernel runs on a **grid** of **blocks** of **threads** ([[#def-cuda-hierarchy]]); blocks run independently on streaming multiprocessors, and each block's threads execute in **warps** of $32$ that issue one instruction at a time (SIMT).
- Memory spaces ([[#def-cuda-memory]]): registers, shared memory (a per-block scratchpad with $32$ banks), and global memory accessed in $32$-byte sectors.
- **Coalescing**: a warp's access touches $\min(4s, 32)$ sectors for stride $s$ ([[#prop-coalescing]]); on the P4, a stride of $2$ cut useful bandwidth from $151$ to $49$ GB/s ([[#ex-stride]]).
- **Divergence** serialises the two sides of a branch within a warp ([[#prop-divergence]]); a sequential-addressing reduction issues $12$ warp-rounds instead of $47$, but both reductions ran at $143$ GB/s because they are memory-bound ([[#ex-reduce-warps]]).
- **Little's law** ([[#thm-little]]) says how much work must be in flight to hide latency; **occupancy** is limited by registers, shared memory and thread limits ([[#ex-occupancy]]).
- **Tiling** in shared memory divides global loads by the tile width $T$ ([[#thm-tiling]]); it made matrix multiplication $2.5$ times faster on the P4 ($776$ against $306$ Gflop/s).
- Host–device copies cost $\alpha + m/\beta$ with $\alpha \approx 6$ µs and $\beta \approx 12$ GB/s here ([[#ex-transfer]]): keep data on the device, batch work and overlap transfers with streams.
:::

## Exercises

::: exercise A thread's global index {level=1 check="773"}
A one-dimensional kernel is launched with $256$ threads per block. What is the global index `blockIdx.x * blockDim.x + threadIdx.x` of thread $5$ of block $3$? (Enter the index.) In which warp of its block is it?
::: solution
$3 \times 256 + 5 = 773$. Warps consist of consecutive threads of a block, so thread $5$ is in warp $\lfloor 5/32 \rfloor = 0$ of block $3$.
:::
:::

::: exercise Sectors for doubles {level=1 check="8"}
A warp's $32$ threads read $32$ consecutive `double`s ($8$ bytes each) starting at a $32$-byte boundary. How many $32$-byte sectors are touched? (Enter the number.)
::: solution
$32 \times 8 = 256$ bytes, which is $256/32 = 8$ sectors, all fully used. Coalesced access to $8$-byte data moves twice as many bytes per warp as to $4$-byte data, and is just as efficient.
:::
:::

::: exercise How many blocks? {level=1 check="3907"}
How many blocks of $256$ threads are needed to give one thread to each of $10^6$ elements? (Enter the number.) How many threads have no element?
::: solution
$\lceil 10^6/256 \rceil = 3907$ blocks, with $3907 \times 256 = 1{,}000{,}192$ threads, of which $192$ have no element and must be excluded by the bounds check, as in [[#ex-vadd]].
:::
:::

::: exercise Occupancy limited by registers {level=2 check="0.5"}
An SM has $65{,}536$ registers and supports at most $2048$ resident threads. A kernel uses $64$ registers per thread and blocks of $256$ threads, and little shared memory. What is its occupancy? (Enter it as a fraction.)
::: solution
A block needs $64 \times 256 = 16{,}384$ registers, so $65{,}536 / 16{,}384 = 4$ blocks fit: $1024$ threads, an occupancy of $1024/2048 = 0.5$. Reducing register use to $32$ per thread (for instance with `__launch_bounds__` or by simplifying the kernel) would allow $8$ blocks and full occupancy — at the risk of spilling registers to slow local memory.
:::
:::

::: exercise Bytes in flight {level=2 check="96000"}
A GPU's memory delivers $192$ GB/s with an average latency of $500$ ns. By Little's law, how many bytes must be in flight to sustain the full bandwidth? (Enter the number of bytes.) If each of the $20$ SMs supports $2048$ threads and each thread has one $4$-byte load outstanding, can the bandwidth be reached?
::: solution
$L = \lambda W = 192 \times 10^9 \text{ B/s} \times 500 \times 10^{-9} \text{ s} = 96{,}000$ bytes. With one $4$-byte load per thread, that needs $24{,}000$ threads in flight, $1200$ per SM, which fits within $2048$ — but only with at least $59\%$ occupancy and every thread waiting on a load at all times. Kernels at low occupancy reach full bandwidth by giving each thread several independent loads (unrolling, vector loads of `float4`).
:::
:::

::: exercise Active warps in a larger reduction {level=2 check="20"}
For the sequential-addressing reduction ([[#alg-gpu-reduce]]) with $B = 512$ threads per block, how many warp-rounds — summed over the $9$ rounds, the number of warps containing at least one active thread — are needed? (Enter the number.)
::: solution
In the rounds the active threads number $256, 128, 64, 32, 16, 8, 4, 2, 1$, occupying $8, 4, 2, 1, 1, 1, 1, 1, 1$ warps: $20$ warp-rounds. In the last five rounds a single warp is active, which is why optimised reductions finish the last $32$ elements with warp-level **shuffle** instructions (`__shfl_down_sync`), which exchange registers within a warp without shared memory or barriers.
:::
:::

::: exercise To offload or not {level=2}
A CPU adds two arrays of $10^8$ `float`s in $40$ ms (it is memory-bound). The GPU of [[#ex-transfer]] does it in $8$ ms once the data is on the device. The inputs are on the host and the result is needed there. Is offloading worthwhile? What changes if the same arrays are then used by $50$ further GPU kernels?
::: solution
The copies move $2 \times 4 \times 10^8 = 800$ MB to the device and $400$ MB back: $1.2 \times 10^9 / 12.2 \times 10^9 \approx 98$ ms, plus $8$ ms of kernel time — about $106$ ms against $40$ ms on the CPU. Not worthwhile. If the inputs stay on the device for $50$ further kernels, the transfer is paid once and amortised: $98 + 51 \times 8 \approx 506$ ms against $51 \times 40 = 2040$ ms on the CPU, a speed-up of about $4$. And with streams, part of the transfer can overlap the first kernels. The general rule: the data must be used enough times on the device to repay its journey.
:::
:::

::: exercise Transpose without bank conflicts {#ex-transpose level=3}
A block of $32 \times 32$ threads transposes a $32 \times 32$ tile through shared memory: thread $(t_y, t_x)$ writes `tile[ty][tx]` from a coalesced global read, synchronises, and then reads `tile[tx][ty]` for a coalesced global write. Show that with `float tile[32][32]` the read has a $32$-way bank conflict, and that declaring `float tile[32][33]` removes it.
::: solution
Word `tile[r][c]` of a $32 \times W$ array is at word address $Wr + c$, in bank $(Wr + c) \bmod 32$. A warp consists of the $32$ threads with the same $t_y$ and $t_x = 0, \dots, 31$. In the read, they access `tile[tx][ty]`, at addresses $W t_x + t_y$. With $W = 32$, the bank is $(32 t_x + t_y) \bmod 32 = t_y$ for every lane: all $32$ lanes hit the same bank at $32$ different addresses — a $32$-way conflict, so the read takes $32$ cycles instead of one. With $W = 33$, the bank is $(33 t_x + t_y) \bmod 32 = (t_x + t_y) \bmod 32$, which takes $32$ distinct values as $t_x$ runs over $0, \dots, 31$: no conflict. The writes `tile[ty][tx]` are conflict-free in both cases (bank $t_x$ or $(t_y + t_x) \bmod 32$, distinct across the warp). The padding wastes $32$ words of shared memory per tile, about $3\%$.
:::
:::

::: exercise The best tile width {level=3}
For the tiled kernel of [[#alg-tiled]] with square blocks of $T \times T$ threads, at most $1024$ threads per block and $48$ KiB of shared memory per block, what is the largest usable $T$? By [[#thm-tiling]], how much more global traffic does $T = 16$ cause than that largest $T$? Why might $T = 16$ still be faster in practice?
::: solution
Threads: $T^2 \le 1024$, so $T \le 32$. Shared memory: two tiles of $T^2$ `float`s need $8T^2$ bytes $\le 49{,}152$, so $T \le 78$. The binding limit is $T = 32$. Traffic is $2n^3/T$ loads, so $T = 16$ causes twice the global loads of $T = 32$. But $T = 32$ means blocks of $1024$ threads, so at most $2$ blocks per SM on the P4, and every `__syncthreads()` makes $32$ warps wait for the slowest; with $T = 16$, $8$ blocks of $256$ threads per SM let one block compute while another waits at its barrier. Each phase of $T = 32$ also does twice the work between barriers, which helps. Which wins depends on the GPU and must be measured; production kernels decouple the tile size from the block size by having each thread compute several outputs.
:::
:::
