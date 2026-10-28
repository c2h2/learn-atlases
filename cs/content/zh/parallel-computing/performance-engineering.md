下面是把两个 $2048 \times 2048$ 的 `double` 矩阵相乘的教科书式三重循环，在本课程那台机器的一个核上计时；旁边是把其中两行交换次序后的同一循环，再旁边是把计算重新组织成 $64 \times 64$ 的块的版本——先在一个核上跑，再在 $32$ 个核上跑：

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp -o mm mm.c
$ OMP_NUM_THREADS=1 ./mm 0; OMP_NUM_THREADS=1 ./mm 1; OMP_NUM_THREADS=1 ./mm 2; OMP_NUM_THREADS=32 ./mm 2
ijk     p= 1   21.922 s    0.78 Gflop/s  C[5][7]=12272
ikj     p= 1    4.104 s    4.19 Gflop/s  C[5][7]=12272
blocked p= 1    2.977 s    5.77 Gflop/s  C[5][7]=12272
blocked p=32    0.129 s  133.15 Gflop/s  C[5][7]=12272
```

（在本课程自始至终使用的那台 $36$ 核、双插槽 Haswell 机器上的观测，与其他用户共享，2026 年。）四个版本做的都是同样的 $2 \times 2048^3 \approx 1.7 \times 10^{10}$ 次浮点运算，答案也相同。最快的比最慢的快 $170$ 倍，其中只有 $23$ 倍来自并行。其余来自存储层次：程序以什么顺序触碰内存，决定了它多久要等内存一次。而即使是最快的版本，也只达到处理器能力的约 $10\%$。

**性能工程**（performance engineering）就是弄清时间花到哪里、再把它挪走的学问。它的工具是度量——仔细计时、剖析、扩展性研究——以及说明硬件本可做到什么的各种模型：[[parallel-computing/performance-laws#def-roofline]] 的**屋顶线**、指令的时延与吞吐率、一个算法必然招致的缓存缺失次数。本章把 [[parallel-computing/parallel-architectures]] 的硬件、[[parallel-computing/performance-laws]] 的定律与 [[parallel-computing/memory-consistency]] 的存储系统合到一起，用真实测量把它们应用到单核速度（向量化、指令级并行、缓存分块）、内存带宽与 NUMA、以及跨核扩展上。

## 度量

第一条规则是先度量、再改动，第二条是正确地度量。基准程序必须真的干活（编译器会删掉结果从未被用到的计算，这就是本章每个程序都要打印校验和的原因），必须长到时钟分辨率足以分辨（`omp_get_wtime` 与 `clock_gettime(CLOCK_MONOTONIC)` 所用的单调时钟能分辨纳秒，但每读一次就花几十纳秒），还必须重复，因为一次运行的时间是一个随机变量。

::: example 运行时间的分布 {#ex-timing}
[[parallel-computing/shared-memory]] 那个计算 $\pi$ 的 OpenMP 程序（$10^9$ 个子区间的中点公式，`reduction(+ : sum)`）用 $32$ 个线程跑了十次。总结这些时间。
::: solution
```console
$ for r in $(seq 10); do OMP_NUM_THREADS=32 ./pi_omp 1000000000; done
```

十个时间（秒）为 $0.167, 0.187, 0.165, 0.163, 0.165, 0.167, 0.176, 0.166, 0.174, 0.215$。最小值 $0.163$ s，中位数 $0.167$ s，平均值 $0.1745$ s，标准差 $0.016$ s。分布是偏斜的：多数运行聚在最小值附近，少数则慢得多——这里最多慢 $32\%$——因为另一个进程（机器的平均负载约 $6$）或操作系统一度占走了一个核，而静态调度下每个线程都要等最慢的那个。报告时给出中位数（若问题是"这段代码最快能到多少"则给最小值）并附上散布范围，别只报一次运行；比较两个版本时要交替运行，让两者看到同样的背景；至于单次运行之间几个百分点的差别，要当作噪声。
:::
:::

有几种硬件效应值得控制。时钟频率随温度、负载与指令组合而变（许多核同时执行宽向量指令时，Intel 处理器会降频）；程序第一次运行要付出缺页与冷缓存的代价，所以下面的基准都重复其核函数，并保留其后各次运行的最好值或平均值；被操作系统在核之间搬来搬去的线程会丢掉自己的缓存行，在双插槽机器上还可能落到离自己内存很远的地方。设置 `OMP_PROC_BIND=spread OMP_PLACES=cores` 会把 OpenMP 线程绑到核上、分散到两个插槽；除特别说明外，本章的运行都用这一设置。

### 剖析

**剖析器**（profiler）报告程序的时间花在何处。**采样**剖析器定时打断程序，记录当时正在执行的指令；Linux 的 `perf`、Intel VTune 与 AMD uProf 还读取处理器的**硬件性能计数器**——周期数、指令数、缓存缺失、分支预测失败——把"慢"变成"慢在末级缓存缺失上"。本机没装 `perf`，但装了 GNU 的剖析器 `gprof`：用 `-pg` 编译会给每个函数加一个计数挂钩，并以每秒 $100$ 次的频率采样程序计数器。

::: example 平坦剖析表 {#ex-gprof}
给一个程序做剖析：它用随机数字填满两个 $1000 \times 1000$ 矩阵，用 $ijk$ 循环相乘，再把结果求和。
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

static void multiply(void) {                     /* ijk 顺序：对 B 跨步访问 */
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

（`-fno-inline` 让三个函数保持分离，剖析表才点得出它们的名字。）时间几乎全在 `multiply` 里。阿姆达尔定律（[[parallel-computing/performance-laws#thm-amdahl]]）说明了这意味着什么：把 `init` 与 `checksum` 做到无穷快，至多也只赚 $2\%$，全部力气都该花在 `multiply` 上。分辨率很粗——`init` 与 `checksum` 一共只收到一个样本，即 $10$ ms——所以剖析表告诉你该往哪里看，而不是精确的时间。
:::
:::

## 让单核跑得快

本机一个核每个周期能发射两条在 $256$ 位、含四个 `double` 的向量上执行的融合乘加（FMA）指令：每周期 $16$ 次浮点运算（[[parallel-computing/parallel-architectures#def-peak]]）。要跑到这个数需要三样东西：向量指令、多到足以让流水线吃饱的独立运算，以及来得足够快的数据。

### 向量化

编译器在能证明安全、又认为划算时，会自动把循环变成 SIMD 代码。GCC 在 `-O2`（自版本 12 起，配一个廉价的代价模型）与 `-O3` 下就会这么做；`-march=native` 允许它使用机器拥有的每条指令（这里是 AVX2 与 FMA；不加它，GCC 以 2003 年的 SSE2 基线为目标）；`-fopt-info-vec` 则报告哪些循环被向量化了。

::: example 向量化一个循环和一个归约 {#ex-vectorise}
用四组编译选项，对 `float` 数组（$4096$ 个元素，装得进 L1 与 L2 缓存，所以内存不是限制）计时 `saxpy`（$y_i \gets a x_i + y_i$）与点积 $\sum_i x_i y_i$，各重复 $200{,}000$ 次。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

enum { N = 4096, REPS = 200000 };                 /* 3 个 16 KiB 数组：装得进 L1+L2 */

static double now(void) {
    struct timespec t; clock_gettime(CLOCK_MONOTONIC, &t);
    return t.tv_sec + 1e-9 * t.tv_nsec;
}

__attribute__((noipa))     /* 保住这次调用：不许内联或外提 */
static void saxpy(float *restrict y, const float *restrict x, float a, int n) {
    for (int i = 0; i < n; i++) y[i] = a * x[i] + y[i];
}

__attribute__((noipa))     /* 保住这次调用：不许内联或外提 */
static float dot(const float *x, const float *y, int n) {
    float s = 0;
    for (int i = 0; i < n; i++) s += x[i] * y[i];  /* 一个归约：次序要紧 */
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

`saxpy` 从 $128$ 位 SSE 向量（四个 `float`）得到 $3.7$ 倍、从 $256$ 位 AVX 向量（八个）得到 $6$ 倍。`restrict` 限定符承诺 `x` 与 `y` 不重叠；没有它们，编译器要么在运行期检查，要么放弃。点积直到 `-ffast-math` 才有任何改善，尽管 `-fopt-info-vec` 声称得手：

```console
$ gcc -std=c17 -O3 -march=native -fopt-info-vec-optimized -c vec.c
vec.c:15:23: optimized: loop vectorized using 32 byte vectors
vec.c:15:23: optimized: loop vectorized using 16 byte vectors
vec.c:21:23: optimized: loop vectorized using 32 byte vectors
vec.c:21:23: optimized: loop vectorized using 16 byte vectors
vec.c:27:23: optimized: loop vectorized using 32 byte vectors
```

汇编（`gcc -S`）说明了原因：第 $21$ 行的循环用一条 `vmulps` 一次算出八个乘积，然后用八条标量 `vaddss` 把它们一条条加进 `s`，每条都依赖前一条。浮点加法不满足结合律（[[parallel-computing/shared-memory#warn-fp]]），所以 C 要求按源码次序做加法，编译器便遵照执行。`-ffast-math` 允许重结合；编译器于是让一个向量寄存器里保持八个部分和，最后再合并起来——结果不同，尽管这里只差了极小一点（六位数字下两种都是 $65636.6$）。
:::
:::

`saxpy` 能到 $19.7$，点积为什么只跑 $1.9$ 和 $8.9$ Gflop/s？不是缺向量单元，而是因为一条依赖链。

::: proposition 依赖链的吞吐率 {#prop-chains}
设一个循环由 $k$ 条彼此独立的运算链组成，每个运算依赖同一链中的前一个运算，执行在 $u$ 个流水线功能单元上，每个单元每周期接受一个运算、$\ell$ 个周期后给出结果。那么这个循环每周期至多完成 $\min(k/\ell,\ u)$ 个运算。
:::

::: proof
每周期至多能开始 $u$ 个运算，这给出第二个界。至于第一个：一个运算只有当它所在链中的前一个运算结束才能开始，所以每条链任一时刻至多有一个运算在途，总共至多 $k$ 个在途，而每个在途 $\ell$ 个周期。由利特尔定律（[[parallel-computing/gpu-programming#thm-little]]），吞吐率等于平均在途数除以每个停留的时间，所以至多 $k/\ell$。
:::

在 Haswell 上，向量加法时延 $3$ 个周期，FMA 时延 $5$ 个周期，FMA 单元有两个。顺序执行的点积是一条标量加法的单链：每 $3$ 个周期一次加法——把乘法算上就是每 $3$ 个周期两次浮点运算——在约 $2.9$ GHz 下即 $2 \times 2.9/3 \approx 1.9$ Gflop/s，与实测一致。加上 `-ffast-math` 后，它变成八条通道上一条向量 FMA 链：每 $5$ 个周期 $16$ 次浮点运算，$2.9$ GHz 下为 $9.3$ Gflop/s，对照实测的 $8.9$。要达到每周期 $2$ 次 FMA 的峰值，循环需要 $k \ge u\ell = 10$ 条独立链——十个累加器。

::: example 逼近峰值 {#ex-peak-fma}
用一个每线程十条独立向量 FMA 链的核函数，测量机器的浮点峰值。
::: solution
```c
#include <omp.h>
#include <stdio.h>

typedef double v4 __attribute__((vector_size(32)));   /* 一个 AVX2 寄存器：4 个 double */
enum { ACC = 10, ITERS = 100000000 };                 /* 10 条独立的 FMA 链 */

int main(void) {
    double total = 0, t0 = omp_get_wtime();
    #pragma omp parallel reduction(+ : total)
    {
        v4 acc[ACC], m = {0.999999, 0.999999, 0.999999, 0.999999}, a = {1e-6, 1e-6, 1e-6, 1e-6};
        for (int k = 0; k < ACC; k++) acc[k] = (v4){k, k, k, k};
        for (long i = 0; i < ITERS; i++)
            for (int k = 0; k < ACC; k++) acc[k] = acc[k] * m + a;   /* 编译成 vfmadd */
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

第一次构建里根本没有 FMA：在严格 ISO C 模式（`-std=c17`）下，GCC 不把一次乘法与一次加法融合成一条指令，因为融合运算只舍入一次而不是两次，会给出（略更精确的）不同结果。核函数于是只跑一半速度。用 `-ffp-contract=fast` 允许融合（或改用 `-std=gnu17`，或用 `fma` 函数）就产生了 `vfmadd` 指令——二进制里出现九次，编译器把循环部分展开并做了重排——一个核达到 $36.3$ Gflop/s，即约 $2.3$ GHz 下每周期 $16$ 次浮点运算。$36$ 个核合起来给 $1.11$ Tflop/s，是按基准时钟在 [[parallel-computing/parallel-architectures#ex-peak]] 算出的 $1.32$ Tflop/s 的 $84\%$。几乎没哪个真实程序能接近这个数，但它就是屋顶线的顶棚。
:::
:::

### 缓存分块

存储层次回报局部性（[[computer-systems/memory-hierarchy#def-locality]]）：很快还要再用的数据应当留在缓存里，下一个要用的数据应当在同一条缓存行里。要论证矩阵乘法，我们用一个最简单的缓存模型。

::: definition 理想缓存模型 {#def-ideal-cache}
处理器在一块无界内存前面有一个 $M$ 个字的全相联缓存，按每条 $L$ 个字组织成行，采用最近最少使用替换。处理器访问一个字而它所在的行不在缓存中时就发生一次**缺失**；随后取回该行，缓存已满则逐出最久未用的一行。在这个模型里，算法的代价就是它的缺失次数 $Q$。
:::

::: theorem 矩阵乘法的缓存缺失次数 {#thm-matmul-misses}
在理想缓存模型中做 $N \times N$ 行优先矩阵乘法 $C \gets C + AB$，$N$ 为 $L$ 的倍数。

1. **$ijk$** 循环（内层沿 $k$，沿列读 $B$）当 $N > M/L$ 时至少招致 $N^3$ 次缺失。
2. **$ikj$** 循环（内层沿 $j$，读 $B$ 与 $C$ 的行）至多招致 $2N^3/L + 2N^2 + N^2/L$ 次缺失。
3. 以 $b \times b$ 的块进行的**分块**循环，$b$ 为 $L$ 的倍数、整除 $N$ 且 $3b^2 \le M$，至多招致 $3N^3/(bL)$ 次缺失；取 $b \approx \sqrt{M/3}$ 时为 $O(N^3/(L\sqrt{M}))$。
:::

::: proof
(1) 固定 $i$ 与 $j$。内层循环读 $B_{0j}, B_{1j}, \dots, B_{N-1,j}$，它们落在 $N$ 条不同的行里，因为同一列相邻两个元素相距 $N \ge L$ 个字。$B_{kj}$ 所在的行下次被需要是在 $j$ 的下一次迭代（为 $B_{k,j+1}$，同一行内），而这两次访问之间循环要访问其余 $N - 1$ 条列上的行。由于 $N > M/L$ 是装得下的行数，到那时 LRU 早已把这行逐出。所以每次访问 $B$ 都缺失：对 $N^2$ 个数对 $(i, j)$ 各有 $N$ 次缺失。

(2) 固定 $i$ 与 $k$。内层循环读 $B$ 的第 $k$ 行、读写 $C$ 的第 $i$ 行——两段各 $N$ 个连续字，各占至多 $N/L + 1$ 条行；所以至多 $2N/L + 2$ 次缺失，无论此前缓存里装着什么；再加上对 $A_{ik}$ 的一次访问，就整个计算而言 $A$ 按行优先顺序读取，至多缺失 $N^2/L$ 次。对 $N^2$ 个数对 $(i, k)$ 求和即得此界。

(3) 分块循环做 $(N/b)^3$ 次块乘 $C_{IJ} \gets C_{IJ} + A_{IK}B_{KJ}$。一次块乘碰到三个 $b \times b$ 的块，每个块由 $b$ 段各含 $b$ 个连续字的行段组成，由于 $L$ 整除 $b$ 与 $N$，每段恰是 $b/L$ 条行：共 $3b^2/L$ 条行。它们能一起装进缓存（$3b^2 \le M$），所以一次块乘之中每条行至多被取回一次——至多 $3b^2/L$ 次缺失。求和得 $Q \le (N/b)^3 \cdot 3b^2/L = 3N^3/(bL)$。
:::

洪嘉伟（Hong）与孔祥重（Kung）在 1981 年证明，任何计算经典方法那 $N^3$ 个乘积的算法都必须付出 $\Omega(N^3/(L\sqrt{M}))$ 次缺失，所以分块在常数因子内已是最优。**高速缓存无关**（cache-oblivious）的递归算法——把每个矩阵分成四个象限递归下去——无需知道 $M$，就同时对一切缓存大小达到同一个界（弗里戈（Frigo）、莱瑟森（Leiserson）、普罗科普（Prokop）与拉马钱德兰（Ramachandran），1999）。

开头的测量正符合定理。取 $N = 2048$，每条 $64$ 字节的行装 $L = 8$ 个 `double`，L1 缓存有 $512$ 行，则 $ijk$ 循环对 $B$ 的几乎每次访问都在 L1 上缺失；更糟的是相邻两次访问相距 $16$ KiB，落在不同的 $4$ KiB 页里，所以一列的 $2048$ 个页也超出了处理器快表（TLB）的覆盖范围。$ikj$ 循环沿行顺序流动，快 $5.3$ 倍。取 $b = 64$ 的分块版本（$3 \times 64^2 \times 8 = 96$ KiB，装得进 $256$ KiB 的 L2 缓存）又更快，而且由于它各块 $C$ 彼此独立，一条 OpenMP 制导指令就并行化了：

```c
static void blocked(void) {                         /* 在 BS x BS 的块上做 ikj，并行 */
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

（`collapse(2)` 把 $32 \times 32 = 1024$ 个数对 $(i_0, j_0)$ 分给各线程；每个数对独占 $C$ 的一块，所以没有竞争。完整的程序 `mm.c` 另加另外两个循环、$A_{ij} = (i + j) \bmod 7$、$B_{ij} = ij \bmod 5$ 的初始化、用 `omp_get_wtime` 计时，以及一个选择用参数。）

即使分了块，一个核也只达到其 $36$ Gflop/s 中的 $5.8$。内层循环每载入并存储一个 $C$ 的元素只做一次 FMA：两次浮点运算对应一次 $B$ 的载入、一次 $C$ 的载入和一次存储，远在 FMA 单元用满之前就先让 L1 缓存的载入与存储端口饱和。生产级库（OpenBLAS、BLIS、Intel MKL）再加上**寄存器分块**：微核函数把比如 $C$ 的一个 $6 \times 16$ 块保持在十二个向量寄存器里，用 $A$ 的一列与 $B$ 的一行的外积更新它，使每个载入的值供养若干次 FMA；它们还把块拷贝进连续缓冲区以避开 TLB 缺失。这类库能达到峰值的 $85$–$95\%$。给其他人的教训是：调用库。

::: quiz
在这台机器上（两个 FMA 单元，FMA 时延 $5$ 个周期），哪些说法正确？
- [x] 单累加器的点积每 $5$ 个周期至多一条向量 FMA，无论向量多宽。
- [x] 交换矩阵乘法 $j$、$k$ 两个循环的次序会改变缓存缺失次数，但不改变算术运算次数。
- [ ] `-fopt-info-vec` 报告某循环已向量化，就保证它能快上几倍。
- [ ] 为缓存对矩阵乘法分块，会把浮点运算次数从 $2N^3$ 降到 $O(N^3/\sqrt{M})$。
::: solution
第一条是 $k = 1$ 时的 [[#prop-chains]]。第二条：各循环次序做的是同一批乘加、只是次序不同，但触碰内存的方式不同（[[#thm-matmul-misses]]）。第三条为假——我们的点积被"向量化"成了标量顺序加法，并没有变快。第四条把运算与缺失混为一谈：分块减少的是缓存缺失，绝不是那 $2N^3$ 次运算。
:::
:::

## 内存带宽与 NUMA

对落在屋顶线屋脊之下的核函数，可达速度由内存带宽决定。标准的度量是约翰·麦卡尔平（McCalpin）的 **STREAM** 基准（1995），它的"三元组"（triad）核函数 $a_i \gets b_i + s c_i$ 每搬运 $24$ 字节做两次浮点运算。

::: example 带宽与首次触碰 {#ex-triad}
在 $8 \times 10^7$ 个 `double` 的数组上（每个 $640$ MB，远大于缓存）测三元组的带宽，考察不同线程数，数组分别用串行或并行初始化。
::: solution
```c
#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

enum { N = 80000000 };                            /* 3 个数组 x 640 MB */

int main(int argc, char *argv[]) {
    int parallel_init = argc > 1 && atoi(argv[1]);
    double *a = malloc(N * sizeof *a), *b = malloc(N * sizeof *b), *c = malloc(N * sizeof *c);
    #pragma omp parallel for schedule(static) if (parallel_init)
    for (long i = 0; i < N; i++) { a[i] = 0; b[i] = 1; c[i] = 2; }   /* 首次触碰 */
    double best = 1e30;
    for (int r = 0; r < 5; r++) {                 /* 五次运行取最好 */
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

一个核搬运 $8.8$ GB/s：限制它的不是内存，而是它能同时挂起多少个未决的缓存缺失（每个核约十个缓存行填充缓冲；由利特尔定律，$\sim 80$ ns 的时延里挂十条 $64$ 字节的行就是 $8$ GB/s）。带宽几乎线性增长到 $8$ 个线程，从 $16$ 个起饱和在约 $70$–$73$ GB/s：再往后，多余的线程只是在内存控制器前排队，而 $36$ 线程的各次运行之间波动 $10\%$。对 `a` 的写还要多付一次读（写分配），所以内存实际搬运每个元素 $32$ 字节，约 $97$ GB/s。

两种初始化相差近一倍。Linux 把一个物理页分配在最先写它的核所在的 NUMA 节点上（**首次触碰**放置）。串行初始化时，每个页都落在插槽 $0$ 的内存上：于是全部 $36$ 个线程共用一个插槽的内存控制器，而插槽 $1$ 上的 $18$ 个线程要跨过插槽间互连去访问它。让页在两个节点之间轮转交错（`numactl --interleave=all`）能找回大部分损失；最好的办法是并行初始化，并用与计算循环相同的静态调度，使每个线程的页都归它自己就近使用。
:::
:::

::: warning 在数据将要被使用的地方初始化它
在多插槽机器上，并行程序最常见的性能错误不在它的并行循环里，而在它的串行初始化里：按首次触碰规则，全部内存都落到一个插槽上。要用与计算相同的并行循环、相同的 `schedule(static)` 来初始化数组，把线程绑核（`OMP_PROC_BIND`、`OMP_PLACES`），并用 `numactl --hardware` 与 `numastat` 检查放置。类似地，并行循环之前的 `calloc` 或 `memset` 会决定放置；单用 `malloc` 则不会，因为页在被触碰之前根本不被分配。
:::

### 实测屋顶线

现在我们有了这台机器的两个顶：计算顶 $\pi \approx 1110$ Gflop/s（实测，双精度，带 FMA）与带宽顶 $\beta \approx 97$ GB/s 的内存流量（三元组，计入写分配）。屋脊在 $\pi/\beta \approx 11$ flop/字节。按各自的算术强度把每个核函数放上图，字节数按必须越过内存接口的量计：

- 三元组：每 $32$ 字节 $2$ 次浮点运算，$I = 1/16$；实测 $73.3 \times 2/24 = 6.1$ Gflop/s；
- [[parallel-computing/message-passing#prop-decomposition]] 的雅可比差分模板（stencil）$v_{ij} = \frac14(u_{i-1,j} + u_{i+1,j} + u_{i,j-1} + u_{i,j+1})$：每个点四次浮点运算；若正在使用的 $u$ 的三行留在缓存里，则每个点读一个 `double` 的 $u$、写一个 `double` 的 $v$（外加写分配带来的一次读），共 $24$ 字节，所以 $I = 1/6$；下文测得 $3.75 \times 10^9$ 次更新每秒，即 $15$ Gflop/s；
- 分块矩阵乘法，整矩阵的强度为 $2N^3/(3 \times 8N^2) = N/12 \approx 171$；实测 $133$ Gflop/s。

::: widget plot
f: min(log2(P), x + log2(B))
x: -5, 10
y: 0, 12
sliders: P=1110:100:1400:10; B=97:20:150:1
labels: \log_2 \text{可达 Gflop/s}
points: -4,2.61; -2.58,3.91; 7.42,7.06
caption: 实测的 $36$ 核机器屋顶线，对数坐标：横轴是算术强度（每字节内存流量的浮点运算数）的 $\log_2$，纵轴是 Gflop/s 的 $\log_2$，峰值 $\pi = P$ Gflop/s、带宽 $\beta = B$ GB/s。圆点是实测的三元组（$I = 1/16$，$6.1$ Gflop/s）、雅可比模板（$I = 1/6$，$15$ Gflop/s）与分块矩阵乘法（$I \approx 171$，$133$ Gflop/s）。这两个模板都落在带宽顶上：无论怎样向量化都提速不了它们，只有减少访存流量才行。矩阵乘法则远在计算顶之下——差着八倍，正是寄存器分块要去填的空间。把 $P$ 设为理论峰值 $1325$，看看屋脊几乎不动。
:::

屋顶线告诉我们可以做哪种优化。对这两个模板，只有减少内存流量：用 `float` 代替 `double`，或做**时间分块**（temporal blocking），即趁一个子块还在缓存里就先对它做几次迭代再往下走。对矩阵乘法，则改进算术本身——寄存器、向量指令、FMA——它的分块已经让内存流量保持得很低了。

## 扩展性

::: definition 强扩展与弱扩展 {#def-scaling}
**强扩展**研究在 $p = 1, 2, 4, \dots$ 个处理器上跑同一个固定的问题，报告加速比 $S(p) = T(1)/T(p)$ 与效率 $E(p) = S(p)/p$；它的理想是 $S(p) = p$，受阿姆达尔定律限制。**弱扩展**研究让问题规模与 $p$ 成比例增长、保持每个处理器的工作量不变，报告弱扩展效率 $E_w(p) = T(1, n_1)/T(p, n_p)$；它的理想是运行时间不变、$E_w = 1$，由古斯塔夫森定律描述（[[parallel-computing/performance-laws#thm-gustafson]]）。
:::

::: example 一个访存受限模板的扩展性 {#ex-scaling}
用 OpenMP 在 $n \times n$ 网格上做 $20$ 次雅可比扫描（并行首次触碰、按行 `schedule(static)`），强扩展取 $n = 8192$；弱扩展取 $n = 2048\sqrt{p}$，使每个线程始终有 $2048^2$ 个点。
::: solution
```c
#include <math.h>
#include <omp.h>
#include <stdio.h>
#include <stdlib.h>

/* 在 n x n 网格（边界固定）上做 ITERS 次雅可比扫描，n 取自命令行。 */
int main(int argc, char *argv[]) {
    long n = argc > 1 ? atol(argv[1]) : 4096;
    enum { ITERS = 20 };
    double *u = malloc(n * n * sizeof *u), *v = malloc(n * n * sizeof *v);
    #pragma omp parallel for schedule(static)          /* 并行首次触碰 */
    for (long i = 0; i < n; i++)
        for (long j = 0; j < n; j++) u[i * n + j] = v[i * n + j] = (i == 0) ? 1.0 : 0.0;
    double t0 = omp_get_wtime();
    for (int it = 0; it < ITERS; it++) {
        #pragma omp parallel for schedule(static)
        for (long i = 1; i < n - 1; i++)
            for (long j = 1; j < n - 1; j++)
                v[i * n + j] = 0.25 * (u[(i - 1) * n + j] + u[(i + 1) * n + j]
                                       + u[i * n + j - 1] + u[i * n + j + 1]);
        double *t = u; u = v; v = t;                     /* 交换新旧 */
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

（校验和 $u_{1,1}$ 对一切 $n$ 与 $p$ 都相同，本来就该如此：$20$ 次扫描之后，它只取决于离它 $20$ 个点以内的值。）强扩展：$p = 2, 4, 8, 16, 32$ 处的加速比为 $1.75, 3.90, 7.82, 9.43, 8.40$，效率为 $0.87, 0.98, 0.98, 0.59, 0.26$。弱扩展：$p = 4, 16, 36$ 处的效率为 $0.96, 0.51, 0.22$。

两项研究都停在同一处，约 $3.7 \times 10^9$ 次更新每秒。按每次更新 $24$ 字节算是 $90$ GB/s——即 [[#ex-triad]] 的带宽顶。模板是访存受限的，从 $8$ 个线程起，各核共用一个已经饱和的存储系统。无论取什么串行比例，阿姆达尔定律都拟合不了这些曲线；正确的模型是 $S(p) \approx \min(p, S_{\max})$，其中 $S_{\max} = \beta_{\text{machine}}/\beta_{\text{core}} \approx 9$，是整机带宽与单个核带宽之比。弱扩展救不了被共享资源限制的程序：每线程工作量固定时，对共享内存的需求仍随 $p$ 一起增长。（在集群上，每个节点自带内存，同一模板的弱扩展就几乎完美——[[parallel-computing/message-passing#prop-decomposition]] 的晕层交换是唯一新增的开销。）
:::
:::

::: widget plot
f: min(x, s); x
x: 1, 36
y: 0, 36
sliders: s=9.4:1:36:0.1
labels: \text{带宽受限 } \min(p, S_{\max}); \text{线性}
points: 1,1; 2,1.75; 4,3.90; 8,7.82; 16,9.43; 32,8.40
caption: $8192 \times 8192$ 雅可比模板的强扩展（圆点，实测），对照带宽模型 $S(p) = \min(p, S_{\max})$，其中 $S_{\max}$（滑块 $s$）是整机内存带宽与单个核心带宽之比。测量值沿 $S = p$ 直线升到 $8$ 个线程，随后撞上顶；到 $32$ 个线程时略低于顶，因为争用增加了时延。对照 [[parallel-computing/performance-laws]] 里逐渐弯曲的阿姆达尔曲线：像这样陡峭的拐角是共享资源饱和的标志，而不是串行比例。
:::

同样的分析还能分辨扩展性曲线的其他常见形态。从一开始就逐渐弯曲的曲线提示存在串行比例；效率随线程数下降、但问题变大后又回升的提示每线程的开销（同步、调度——[[parallel-computing/performance-laws#def-isoefficiency]]）；变得上蹿下跳的提示负载不均衡、伪共享（[[parallel-computing/memory-consistency#def-false-sharing]]）或其他作业的干扰；而加速比超过 $p$——**超线性**加速——通常意味着划分后的各块问题开始装进处理器的缓存了。

::: history
吉恩·阿姆达尔（Gene Amdahl）1967 年的论证与约翰·古斯塔夫森（John Gustafson）1988 年的回应框定了扩展性问题（[[parallel-computing/performance-laws]]）。第一个 Unix 剖析器 `prof` 出现于 20 世纪 70 年代初；带调用图剖析的 `gprof` 由苏珊·格雷厄姆（Susan Graham）、彼得·凯斯勒（Peter Kessler）与马歇尔·麦库西克（Marshall McKusick）在 1982 年描述。洪嘉伟（Jia-Wei Hong）与孔祥重（H. T. Kung）在 1981 年证明了矩阵乘法访存量的下界，稠密线性代数的分块算法成为 LAPACK（1992）的基础——它构建在 level-3 BLAS（东加拉（Dongarra）、迪克罗兹（Du Croz）、达夫（Duff）与哈梅林（Hammarling），1990）之上。约翰·麦卡尔平（John McCalpin）在 1995 年引入 STREAM 基准，那时"内存墙"（威廉·伍尔芙（Wulf）与莎莉·麦基（McKee）的提法，1995）正成为性能的核心问题。后藤（Kazushige Goto）手工调优的矩阵核函数（约 2002–2008 年，2008 年与罗伯特·范德海金（van de Geijn）一起撰文描述）展示了如何围绕 TLB 与寄存器组织分块，催生了 OpenBLAS 与 BLIS。马泰奥·弗里戈（Matteo Frigo）、查尔斯·莱瑟森（Charles Leiserson）、哈拉尔德·普罗科普（Harald Prokop）与斯里德哈·拉马钱德兰（Sridhar Ramachandran）在 1999 年提出了高速缓存无关算法。硬件性能计数器经 PAPI（1999 年起）与 Linux `perf`（2009 年）变得广为可用。塞缪尔·威廉姆斯（Samuel Williams）、安德鲁·沃特曼（Andrew Waterman）与戴维·帕特森（David Patterson）在 2009 年发表了屋顶线模型。
:::

## 后续内容

本课程的每一章都有性能工程的一面：[[parallel-computing/memory-consistency]] 里的伪共享与 NUMA，[[parallel-computing/gpu-programming]] 里的占用率与合并访问，[[parallel-computing/message-passing]] 里的通信代价。向量化与循环交换背后的编译器变换——依赖分析、循环分块、循环展开——属于 [[compilers/dataflow-optimisation]]；浮点重结合在 [[computer-systems/floating-point]] 中分析。而在数据中心的尺度上，性能以服务的尾时延与吞吐量来度量，这些方法在 [[distributed-systems]] 中延续。

::: summary
- **度量**要正确：重复运行，报告中位数与散布范围（[[#ex-timing]]），用校验和保住计算结果，线程绑核；优化之前先**剖析**（[[#ex-gprof]]）。
- **向量化**成倍提高吞吐率（`saxpy` 从 $2.95$ 到 $17.5$ Gflop/s），但归约需要获准重结合（`-ffast-math` 或 `omp simd reduction`），而严格 ISO C 禁止 FMA 融合（[[#ex-vectorise]]、[[#ex-peak-fma]]）。
- **依赖链**把吞吐率限制在 $\min(k/\ell, u)$（[[#prop-chains]]）；十条独立的 FMA 链达到峰值：每核 $36$ Gflop/s，$36$ 核 $1.11$ Tflop/s。
- 矩阵乘法的**缓存缺失**：$ijk$ 为 $N^3$，$ikj$ 约 $2N^3/L$，分块为 $3N^3/(bL)$（[[#thm-matmul-misses]]）；实测单核 $21.9$ s、$4.1$ s、$3.0$ s，$32$ 核分块 $0.13$ s。
- **内存带宽**从 $16$ 线程起饱和在约 $73$ GB/s（三元组）；串行首次触碰把它砍半（[[#ex-triad]]）。
- 实测**屋顶线**（$1110$ Gflop/s，$97$ GB/s）显示两个模板落在带宽顶上，矩阵乘法则远在计算顶之下。
- 一个访存受限模板的**强扩展与弱扩展**（[[#def-scaling]]）都停在约 $9$ 倍加速比处：是饱和的共享资源，不是串行比例（[[#ex-scaling]]）。
:::

## 习题

::: exercise 屋顶线上的三元组 {level=1 check="6.25"}
一台机器在三元组 $a_i \gets b_i + s c_i$ 上持续达到 $75$ GB/s，按每元素 $24$ 字节计。三元组的 Gflop/s 是多少？（填入数目。）
::: solution
每个元素两次浮点运算（一次乘、一次加）、计入 $24$ 字节，所以 $75 \times 2/24 = 6.25$ Gflop/s。任何编译选项都改不了这一点：这个核函数就在带宽顶上。
:::
:::

::: exercise 屋脊点 {level=1 check="15"}
计算峰值为 $1110$ Gflop/s、带宽为 $74$ GB/s 时，屋顶线的屋脊在哪个算术强度（flop/字节）处？（填入数目。）
::: solution
$1110/74 = 15$ flop/字节。每字节内存流量不足 $15$ 次浮点运算的核函数，无论向量化得多好，在这台机器上都到不了峰值。
:::
:::

::: exercise 选择块大小 {level=1 check="104"}
要让三个 $b \times b$ 的 `double` 块装进 $256$ KiB 的 L2 缓存，$3 \cdot 8b^2 \le 262{,}144$，最大的块大小 $b$ 是多少？（填入 $b$。）
::: solution
$b^2 \le 262{,}144/24 \approx 10{,}922.7$，所以 $b \le 104.5$、$b = 104$（$3 \times 8 \times 104^2 = 259{,}584$ 字节；$105$ 要 $264{,}600$）。实践中会选小一些的块，取行大小与向量宽度的倍数——比如 $64$——因为真实缓存不是全相联的，还要装别的数据。
:::
:::

::: exercise 预测循环顺序之比 {level=2 check="4.5"}
由 [[#thm-matmul-misses]]，$N$ 很大、$L = 8$ 时，$ijk$ 循环招致约 $N^3 + N^3/L$ 次缺失（$B$ 每次访问都缺，$A$ 沿行），$ikj$ 循环约 $2N^3/L$ 次。两者之比是多少？（填入比值。）与实测的时间之比比较一下。
::: solution
$(1 + 1/8)N^3 / (2N^3/8) = 1.125/0.25 = 4.5$。实测比值为 $21.922/4.104 = 5.3$。模型把数量级搞对了；剩下那个因子来自理想缓存忽略的代价——$ijk$ 的 TLB 缺失，它的列访问每次落到一个新页上——以及硬件预取器，它对顺序流动的 $ikj$ 循环的帮助远大于对跨步循环的帮助。
:::
:::

::: exercise 强扩展加速比 {level=1 check="9.43"}
$n = 8192$ 的雅可比模板在 $1$ 个线程上花 $3.394$ s，在 $16$ 个线程上花 $0.360$ s。加速比是多少？（保留两位小数填入。）效率呢？
::: solution
$3.394/0.360 = 9.43$，效率 $9.43/16 = 0.59$。线程数翻倍到 $32$ 反而让程序变慢（$0.404$ s）：越过饱和点之后，多余的线程添的是争用，不是带宽。
:::
:::

::: exercise 弱扩展效率 {level=1 check="0.51"}
按每线程 $2048^2$ 个点，模板在 $1$ 个线程上花 $0.183$ s，在 $16$ 个线程（$n = 8192$）上花 $0.358$ s。$p = 16$ 时的弱扩展效率是多少？（保留两位小数填入。）
::: solution
$E_w = 0.183/0.358 = 0.51$。若弱扩展理想，时间应停在 $0.183$ s。它几乎翻倍说明每线程工作量并非唯一保持不变的量：对共享内存系统的需求增长了十六倍，而它的带宽只增长了九倍。
:::
:::

::: exercise 根据剖析行动 {level=2 check="4.86"}
在 [[#ex-gprof]] 中，`multiply` 占了 $97.89\%$ 的时间。若改变它的循环次序使它快 $5.3$ 倍、其余一切不变，整体加速比是多少？（保留两位小数填入。）
::: solution
由阿姆达尔定律，未受影响的比例 $f = 0.0211$：$S = 1/(0.0211 + 0.9789/5.3) = 1/(0.0211 + 0.1847) = 4.86$。剩下的 $2\%$ 现在花不了什么，但 `multiply` 再快十倍之后，它就会占到运行时间的三分之一；每次改动之后都必须重新剖析。
:::
:::

::: exercise 足够的累加器 {level=2 check="10"}
一个处理器有两个流水线 FMA 单元，时延 $5$ 个周期。点积循环至少要多少个独立累加器，才能每周期在两个单元上各发射一次 FMA？（填入数目。）若时延是后来 Intel 核心的 $4$ 个周期呢？
::: solution
由 [[#prop-chains]]，吞吐率为 $\min(k/5, 2)$，只有 $k \ge 10$ 时才等于 $2$。时延为 $4$ 时，八个累加器就够。每个累加器占一个向量寄存器，所以像 AVX2 那样只有 $16$ 个向量寄存器的寄存器堆，给操作数留下的就不多了——这也是编译器不自行把归约展开到这个程度的原因之一。
:::
:::

::: exercise 诊断 NUMA 问题 {level=2}
一位同事的 OpenMP 程序读取一个用 `memset` 初始化过的大数组，然后在本机的 $36$ 个线程上用 `#pragma omp parallel for` 处理它。它的带宽只有预期的一半。解释可能的原因，提出两种改法，并说明如何确认诊断。
::: solution
`memset` 在一个线程上运行，所以按首次触碰放置，数组的每个页都分配在那个线程的 NUMA 节点上。于是并行循环让所有线程都从一个插槽的内存里读，其中一半还要跨过插槽间互连：就像 [[#ex-triad]] 里那样，串行初始化给 $39$ GB/s，对照 $73$。改法：(1) 用与处理循环相同的 `schedule(static)` 在并行循环里初始化数组（并用 `OMP_PROC_BIND` 绑核），让每个线程的页都归它自己就近使用；(2) 在 `numactl --interleave=all` 下运行，让页在两个节点间轮转铺开——不如就近放置好（我们的测量里是 $65$ GB/s），但不用改代码。确认办法：`numastat -p <pid>` 显示进程内存各节点的分布；用 `numactl --cpunodebind=0 --membind=0` 在 $18$ 个线程上运行，带宽应与 $36$ 线程的运行差不多，因为两者都被一个插槽的内存限制着。
:::
:::

::: exercise 不用 fast-math 的重结合 {#ex-omp-simd level=3}
`-ffast-math` 改变整个文件的语义（它还假定不存在无穷大与 NaN）。用 OpenMP 的 `simd` 制导指令只允许点积重结合，测量它，并用 [[#prop-chains]] 解释结果。
::: solution
在 `dot` 的循环前加一行，并用 `-fopenmp-simd` 编译——它遵守 `simd` 制导指令但不创建线程：

```c
    #pragma omp simd reduction(+ : s)              /* 允许重结合 */
    for (int i = 0; i < n; i++) s += x[i] * y[i];
```

```console
$ gcc -std=c17 -Wall -Wextra -O3 -march=native -fopenmp-simd -o vec_simd vec_simd.c && ./vec_simd
saxpy 17.90 Gflop/s   dot 14.61 Gflop/s   (check 65636.6)
```

点积现在跑到 $14.6$ Gflop/s，甚至比 `-ffast-math` 时（$8.9$）还快。汇编解释了原因：循环体是一条 `vmulps` 后接一条把结果加进向量累加器的 `vaddps`。由于 `-std=c17` 禁止融合，没有 FMA，依赖链是那条向量加法，时延 $3$ 个周期：八条通道 $\times$ 每 $3$ 个周期 $2$ 次浮点运算，$2.9$ GHz 下为 $15.5$ Gflop/s。`-ffast-math` 时那条链是时延 $5$ 的 FMA——指令更少，但链更长，所以更慢。再加上 `-ffp-contract=fast` 与若干累加器（或让库去做）还能更高，直到每次 FMA 两次载入把 L1 端口饱和为止。
:::
:::
