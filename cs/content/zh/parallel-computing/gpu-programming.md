本课程所用的机器除了 $36$ 个 CPU 核心之外，还有一块 NVIDIA Tesla P4：这是帕斯卡（Pascal）代（2016 年）的一款小型数据中心 GPU，有 $20$ 个流多处理器（SM），每个带 $128$ 条算术通道，自带 $8$ GB 显存。下面是在它上面相乘两个 $2048 \times 2048$ 的 `float` 矩阵的两个程序。第一个是教科书式的三重循环，每个 GPU 线程计算乘积矩阵的一个元素；第二个把同一个计算重新组织起来，让成组的线程通过一小块片上存储器协作完成。

```console
$ ./matmul
naive:   56.22 ms   305.6 Gflop/s
tiled:   22.14 ms   776.1 Gflop/s
mismatches 0, C[5][7] = 41853 (CPU 41853)
```

（本机上的观测，2026 年。）两个版本执行同样多的 $2n^3 \approx 1.7 \times 10^{10}$ 次浮点运算，结果完全相同；第二个快 $2.5$ 倍，因为它读全局内存的次数少 $16$ 倍。GPU 极擅算术、搬运数据的能力中等，而几乎每一种 GPU 优化，要么是少搬数据，要么是按硬件偏好的方式搬运数据。

本章讲解 GPU 的执行模型与编程方法，以 NVIDIA 的 C++ 扩展 CUDA 为具体语言；AMD 的 HIP、跨厂商的 OpenCL 与 SYCL，以及 OpenMP 和数组库的 GPU 后端遵循同一个模型，只是写法不同。我们要讲核函数以及网格、线程块、线程束、线程的层次结构；存储器层次结构；决定性能快慢的三条性质——**访存合并**、**发散**与**占用率**；用共享内存做的**分块**（tiling），并证明它能省下多少访存流量；GPU 上的并行归约；以及在 CPU 与 GPU 之间搬运数据的代价。本章每个 CUDA 程序都在 P4 上编译并运行过；给出的时间都是在那块卡上的观测。

::: note 编译示例
这些程序是 CUDA C++ 文件（`.cu`）。通常的编译器是 NVIDIA 的 `nvcc`；本机安装的 `nvcc` 12.5 不接受 GCC 15 作为其宿主编译器，所以示例是用 Clang 编译的，Clang 可以直接编译 CUDA：`clang++ -std=c++17 -O2 --cuda-path=/usr/local/cuda-12.5 --cuda-gpu-arch=sm_61 prog.cu -L/usr/local/cuda-12.5/lib64 -lcudart`（外加一个包含目录，里面放一个空的 `curand_mtgp32_kernel.h`——这是 Clang 的 CUDA 包装器期望、而本精简工具包缺少的一个 cuRAND 头文件）。若配好了匹配的工具包，`nvcc -arch=sm_61 prog.cu` 的效果相同。`sm_61` 是 P4 的计算能力编号；请用你自己 GPU 的编号。
:::

## 执行模型

GPU 是一台吞吐量机器。[[parallel-computing/parallel-architectures]] 讲过这一权衡：GPU 没有几个靠高速缓存、分支预测与乱序执行把单个线程做快的大型核心，而是有许多简单通道；它隐藏访存时延的办法不是回避等待，而是总有别的活可以切换过去。

::: definition CUDA 的线程层次 {#def-cuda-hierarchy}
CUDA 程序在**主机**（CPU）上运行，并在**设备**（GPU）上启动**核函数**。核函数是标有 `__global__` 的函数，由**网格**中的每个线程执行：

- 网格由若干**线程块**（块）组成，用 `blockIdx` 标识（至多三个维度），所有块大小相同，都是 `blockDim`（至多 $1024$ 个线程）；
- 每个块由**线程**组成，在块内用 `threadIdx` 标识；
- 每个块完整地运行在一个**流多处理器**（SM）上；块内线程可以用屏障 `__syncthreads()` 同步，并共享一块快速的片上**共享内存**；不同块的线程在核函数内无法同步，且可以按任意顺序运行——同时，也可先后；
- SM 把每个块的线程按每 $32$ 个连续线程一组地执行，每组称为一个**线程束**（warp）；线程束一次为其全部活跃线程发射同一条指令，以 SIMD 方式进行（NVIDIA 称之为 **SIMT**，single instruction, multiple threads，单指令多线程）。

一次启动 `kernel<<<blocks, threads>>>(args)` 创建网格后立即返回；核函数的执行相对于主机是异步的。
:::

块的相互独立，正是同一个程序既能跑在 $2$ 个 SM 的 GPU 上、也能跑在 $132$ 个 SM 的 GPU 上的原因：硬件随 SM 空闲就把块分派上去，如同循环的动态调度（[[parallel-computing/shared-memory#thm-graham]]）。一个 SM 内可同时**常驻**多个块，SM 的线程束调度器每个周期都从"下一条指令的操作数已就绪"的线程束中挑一个执行；等待存储器的线程束就轮不到。常驻线程束够多时，总有线程束就绪，算术单元便一直有活可干。

::: example 第一个核函数 {#ex-vadd}
在 GPU 上把两个 $10^6$ 个 `float` 的向量相加。

```c
#include <cstdio>
#include <vector>

__global__ void vadd(const float *a, const float *b, float *c, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;   /* 本线程负责的元素 */
    if (i < n) c[i] = a[i] + b[i];                   /* 最后一个块可能越界 */
}

int main() {
    int n = 1000000;
    size_t bytes = n * sizeof(float);
    std::vector<float> a(n), b(n), c(n);
    for (int i = 0; i < n; i++) { a[i] = i; b[i] = 2 * i; }
    float *da, *db, *dc;                             /* 设备（GPU）存储器 */
    cudaMalloc(&da, bytes); cudaMalloc(&db, bytes); cudaMalloc(&dc, bytes);
    cudaMemcpy(da, a.data(), bytes, cudaMemcpyHostToDevice);
    cudaMemcpy(db, b.data(), bytes, cudaMemcpyHostToDevice);
    int threads = 256, blocks = (n + threads - 1) / threads;
    vadd<<<blocks, threads>>>(da, db, dc, n);        /* 启动：异步 */
    cudaMemcpy(c.data(), dc, bytes, cudaMemcpyDeviceToHost);   /* 等待核函数完成 */
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

核函数体就是顺序循环的循环体，只是把循环下标换成了线程的全局下标 $i = \text{blockIdx.x} \times \text{blockDim.x} + \text{threadIdx.x}$。网格有 $\lceil 10^6/256 \rceil = 3907$ 个块；最后一个块有 $3907 \times 256 - 10^6 = 192$ 个线程越过了数组末尾，所以 `i < n` 这道保护必不可少——没有它们就会越界写，而 CUDA 默认不报告这种错误。主机与设备各有独立的存储器，所以程序要分配设备数组、把输入复制过去、再把结果复制回来。核函数启动的错误是异步报告的；在启动之后检查 `cudaGetLastError()`（或下一个同步调用的返回值）是良好习惯。
:::
:::

与这一模型配套的还有一个代价模型。线程束的每个线程执行同一条指令，所以线程束是执行的单位；全局内存以 $32$ 字节的**扇区**为单位访问，所以线程束那 $32$ 个地址的分布样式就是访存流量的单位；每个 SM 的寄存器、共享内存与常驻线程都有固定配额，在它所容纳的块之间分配。下面三节依次讨论这三点。

## 存储器层次结构

::: definition CUDA 的存储空间 {#def-cuda-memory}
- **寄存器**：线程私有；最快的存储。每个 SM 有一个大小固定的寄存器堆（P4 上是 $65{,}536$ 个 $32$ 位寄存器），在其常驻线程之间分摊。
- **共享内存**：片上，块私有、块内线程共享，时延为几十个周期；用 `__shared__` 声明。默认每块至多 $48$ KiB；P4 上每个 SM $96$ KiB。
- **全局内存**：设备的 DRAM（P4 上是 $8$ GB GDDR5，理论带宽约 $192$ GB/s），对所有线程可见，主机经由复制访问它；时延达几百个周期。它以共享的 L2 高速缓存（P4 上 $2$ MiB）缓存，某些访问还经由每个 SM 的 L1 高速缓存。
- **局部内存**：放不进寄存器的线程私有数据（"溢出"的内容），物理上位于全局内存中。
- **常量内存**：一小块只读区域，经过缓存以便向一个线程束的全部线程广播。
:::

这一层次结构有两个特点与 CPU 的不同。共享内存是一块**暂存存储器**（scratchpad）：由程序而非硬件决定把什么放在那里，因此既可预测又快速。而且这一层次不像 CPU 的那样保持一致性（[[parallel-computing/memory-consistency]]）：对于普通写入，各 SM 的 L1 高速缓存之间并不互相保持一致，所以不同块的线程要想通过全局内存通信，只能跨越核函数启动的边界进行，或者使用原子操作与内存栅栏。

### 访存合并

当一个线程束的 $32$ 个线程执行一次载入或存储时，硬件把它们的地址合并成尽可能少的存储器事务：每个被触及的不同 $32$ 字节扇区一个事务。若相邻线程访问相邻的 $4$ 字节字，这个线程束的 $128$ 字节只占 $4$ 个扇区——搬来的每个字节都有用。这就是**合并**访问。

::: proposition 带跨步的线程束访问触及的扇区 {#prop-coalescing}
设线程束的第 $k$ 号通道（$k = 0, \dots, 31$）访问一个按 $32$ 字节对齐的数组中下标为 $sk$ 的 $4$ 字节字，跨步 $s \ge 1$，则这次访问触及 $\min(4s, 32)$ 个扇区，且搬来的字节中真正有用的比例是 $\max(1/s, 1/8)$。
:::

::: proof
一个扇区装 $8$ 个字，字 $w$ 位于扇区 $\lfloor w/8 \rfloor$。若 $s \le 8$，相邻被访问字 $sk$ 与 $s(k+1)$ 至多相距 $8$，其扇区号至多差 $1$：被访问的字触及从 $0$ 到 $\lfloor 31s/8 \rfloor$ 的每个扇区，别无其他。又因 $4s - 1 \le 31s/8 < 4s$ 当且仅当 $s \le 8$，扇区数为 $\lfloor 31s/8 \rfloor + 1 = 4s$ 个。若 $s \ge 8$，相邻被访问字至少相距 $8$，没有两个字同属一个扇区：$32$ 个扇区。有用的字节是 $128$ 个，而搬运量为每扇区 $32$ 字节：$s \le 8$ 时是 $128/(32 \cdot 4s) = 1/s$，$s \ge 8$ 时是 $128/1024 = 1/8$。
:::

::: example 测量跨步访问的代价 {#ex-stride}
用一个核函数复制 $2^{26}$ 个 `float`，其中相邻线程访问相距 $s$ 个字的位置，取 $s = 1, 2, 4, \dots, 32$ 以及 $33$，并把有效带宽与 [[#prop-coalescing]] 的扇区数对照。

```c
/* 每个线程复制一个 float；相邻线程相距 'stride' 个 float。 */
__global__ void copy(const float *in, float *out, int stride, int n) {
    long i = ((long)blockIdx.x * blockDim.x + threadIdx.x) * stride % n;
    out[i] = in[i];
}
```
::: solution
下标按模 $n$ 回绕，所以每个线程仍然恰好复制一个 `float`（偶数跨步时某些元素被复制两遍、某些一遍也没有，这里无关紧要）。宿主程序对每个跨步先启动一次 `copy<<<n / 256, 256>>>` 预热，再用 CUDA 事件计时跑一次，报告每秒的有效字节数（$2 \times 4n$）：

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

几行 Python 数出每个线程束触及的扇区数：

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

合并访问的复制达到 $151$ GB/s，约为理论值 $192$ GB/s 的 $78\%$。跨步每翻一倍（直到 $8$）扇区数就翻倍、有效带宽大致减半，与命题的预测一致；超过 $8$ 之后扇区数已不变，性能却还在下降，因为 DRAM 本身以更大的单位工作（硬件为了效率按整个 $64$ 或 $128$ 字节取数，而且过于分散的访问还会使 DRAM 的行缓冲失效）。未对齐但连续的访问只多花一个扇区。规则是：*让相邻线程访问相邻地址*。对"结构数组"式的数据，这通常意味着改存成"数组结构"。
:::
:::

::: widget plot
f: 150.7/min(x, 8)
x: 1, 33
y: 0, 160
labels: \text{模型: } 150.7/\min(s, 8) \text{ GB/s}
points: 1,150.7; 2,49.2; 4,24.4; 8,12.5; 16,11.3; 32,7.6; 33,7.1
caption: Tesla P4 上跨步复制的有效带宽随跨步 $s$ 的变化（点，来自 [[#ex-stride]]），以及 [[#prop-coalescing]] 的扇区数模型按合并访问速率缩放后的曲线。注意 $s = 2$ 处实测值比模型*降得更快*，$s = 8$ 之后模型已经持平、实测值却还在下降：扇区并非唯一要紧的单位，DRAM 也为分散访问付出代价。结论不受细节影响——只要跨步不是 $1$，绝大部分带宽就被浪费了。
:::

### 共享内存与存储体冲突

共享内存分为 $32$ 个**存储体**（bank），每个每周期服务一个 $4$ 字节的字；字地址 $a$ 位于存储体 $a \bmod 32$。若一个线程束的线程访问 $32$ 个不同的存储体，或都访问同一个字（广播），这次访问只要一个周期；若 $k$ 个线程访问同一存储体中的不同字，访问就串行化成 $k$ 个周期——称为 **$k$ 路存储体冲突**。对 $32 \times 32$ 的 `float` 数组按列访问是经典的冲突：一列的 $32$ 个字全在同一个存储体里。把数组补齐到 $32 \times 33$，每行就错开一个存储体，冲突随之消失（[[#ex-transpose]]）。

## 发散与占用率

线程束一次只执行一条指令。若一个线程束的线程走 `if` 的不同分支，线程束就把*两个*分支先后都执行一遍，不在当前路径上的线程被屏蔽掉。

::: proposition 发散的代价 {#prop-divergence}
设二分支的两侧分别要花 $a$ 与 $b$ 次指令发射，若线程束中每一侧都至少有一个线程走，则该分支花去 $a + b$ 次发射；若所有线程走同一侧，则只花 $a$ 或 $b$ 次。不同线程束之间的发散没有代价。
:::

证明就是执行模型本身：线程束为其活跃线程只维护一个程序计数器（Volta 代（2017 年）起每个线程有自己的程序计数器以保证向前进展，但发散的路径仍是一条接一条地执行）。条件在同一个线程束*内部*不同才有发散问题；像 `if (threadIdx.x / 32 == 0)` 这种整个线程束一致的条件没有代价。归约是标准例子。

::: algorithm 共享内存中的块归约 {#alg-gpu-reduce}
每个 $B$ 线程的块（$B$ 是 $2$ 的幂）载入 $2B$ 个输入，载入时即两两相加，存入共享数组 `s[0..B)`，然后每轮把活跃线程数减半：

```c
template <bool SEQUENTIAL>
__global__ void block_sum(const float *in, float *out) {
    __shared__ float s[B];
    unsigned t = threadIdx.x, i = blockIdx.x * 2 * B + t;
    s[t] = in[i] + in[i + B];                        /* 载入时先做第一次加法 */
    __syncthreads();
    for (unsigned d = 1; d < B; d *= 2) {
        if (SEQUENTIAL) {                            /* 活跃线程 0..B/(2d)-1 */
            unsigned h = B / (2 * d);
            if (t < h) s[t] += s[t + h];
        } else if (t % (2 * d) == 0) {               /* 交错式：每隔 2d 个线程取一个 */
            s[t] += s[t + d];
        }
        __syncthreads();                             /* 一轮全部完成后才进下一轮 */
    }
    if (t == 0) out[blockIdx.x] = s[0];
}
```

各块的部分和可由第二次核函数启动、由主机、或由每块一次原子加法合并。
:::

两个变体都是 [[parallel-computing/parallel-algorithms#alg-reduce]] 的树形归约，共 $\log B$ 轮；屏障保证每轮都能看到上一轮的写入。区别在于*哪些*线程活跃。交错版本中，第 $d$ 轮的活跃线程是 $2d$ 的倍数，散落在每个线程束里；顺序版本中，活跃线程是 $0, \dots, B/(2d) - 1$，尽量挤进最少的线程束。

::: example 数一数归约中活跃的线程束 {#ex-reduce-warps}
取 $B = 256$ 个线程（$8$ 个线程束），对两个变体分别统计：在 $8$ 轮中，每轮至少含一个活跃线程——即必须为本轮指令发射——的线程束数目之和。然后把两个核函数都在 $2^{26}$ 个 $1$ 上跑一遍。
::: solution
交错式：$d = 1, 2, 4, 8, 16$ 时每个线程束都含 $2d$ 的倍数，$8$ 个线程束都要发射；$d = 32$ 时活跃线程 $0, 64, 128, 192$ 位于线程束 $0, 2, 4, 6$；$d = 64$ 时在线程束 $0$ 与 $4$；$d = 128$ 时在线程束 $0$。共 $5 \times 8 + 4 + 2 + 1 = 47$ 个"线程束·轮"。顺序式：$128, 64, 32, 16, 8, 4, 2, 1$ 个活跃线程占据 $4, 2, 1, 1, 1, 1, 1, 1$ 个线程束：共 $12$ 个。交错式还有存储体冲突：第 $d$ 轮活跃通道访问相距 $2d$ 的字。

在 P4 上（观测值；宿主程序把各块结果相加并校验总和）：

```console
$ ./reduce
interleaved: sum 67108864  1.885 ms  142.4 GB/s
sequential:  sum 67108864  1.879 ms  142.9 GB/s
```

没有区别！核函数每个输入只读一次、每个元素只做一次加法，受限于全局内存带宽——$143$ GB/s，接近合并访问复制的 $151$ GB/s——树形阶段那四倍的指令削减被存储器流量掩盖了。这正是 [[parallel-computing/performance-laws#def-roofline]] 的屋顶线在起作用：访存受限的核函数，优化算术毫无收益。计算受限的核函数才轮到发散登场；发表的归约优化改进（哈里斯（Harris），2007）在当时的 GPU 上带来了巨大提升，那时的存储系统可没有这么宽容。
:::
:::

### 占用率与时延隐藏

要隐藏访存时延，一个 SM 需要多少线程束？排队论中的利特尔（Little）定律给出了答案。

::: theorem 利特尔定律 {#thm-little}
在一个稳定的系统中，若个体以平均速率 $\lambda$ 到达、每个平均停留时间 $W$，则系统内个体的平均数目为 $L = \lambda W$。
:::

::: proof
我们只对系统首尾均空的有限观察区间 $[0, \tau]$ 给出论证。设 $N(t)$ 为 $t$ 时刻系统内的个体数，个体 $j$ 在系统内停留 $W_j$。$N(t)$ 之下的面积对每个瞬间数出在场的个体，所以 $\int_0^\tau N(t)\,dt = \sum_j W_j$——两者都是在内的"个体 × 时间"总量。除以 $\tau$：时间平均在场数 $L$ 等于 $(n/\tau) \cdot (\sum_j W_j / n)$，其中 $n$ 是个体总数，于是 $L = \lambda W$，其中 $\lambda = n/\tau$，$W$ 为每个个体的平均停留时间。令 $\tau \to \infty$（极限存在时）即得一般情形。
:::

用到存储器上：要在每次访问时延为 $\ell$ 的情况下维持每秒 $\beta$ 字节的带宽，就必须随时有 $\beta\ell$ 字节的请求在飞。对 P4，$192$ GB/s 与（设）$500$ ns 的时延给出 $96$ KB 在飞，每个 SM $4.8$ KB——即每个 SM $1200$ 个未完成的 $4$ 字节载入；若每个线程恰有一个未完成的载入，就要每个 SM 常驻 $1200$ 个线程，而每 SM 至多 $2048$ 个。同样的推理适用于时延几个周期的算术流水线。因此 GPU 需要 CPU 上闻所未闻规模的**并行富余**（[[parallel-computing/performance-laws#thm-brent]]）：大型 GPU 要几十万个线程。

::: definition 占用率 {#def-occupancy}
核函数的**占用率**是 SM 上常驻线程束数与 SM 支持的最大值（P4 上 $64$ 个线程束，即 $2048$ 个线程）之比。它受最先耗尽的每 SM 资源限制：寄存器堆、共享内存、常驻块的最大数目（P4 上 $32$ 个）或线程的最大数目。
:::

::: example 分块核函数的占用率 {#ex-occupancy}
开头那个分块矩阵乘法核函数每块 $256$ 个线程、每线程 $31$ 个寄存器、每块 $2048$ 字节共享内存（两个 $16 \times 16$ 的 `float` 子块）。它在 P4 上的占用率是多少？若每线程要 $40$ 个寄存器呢？
::: solution
寄存器：每线程 $31$ 个按 $32$ 个分配（分配按粒度进行），所以一块要 $32 \times 256 = 8192$ 个寄存器，共 $65{,}536$ 个可用：$8$ 块。共享内存：$98{,}304 / 2048 = 48$ 块。线程：$2048/256 = 8$ 块。块数上限：$32$。取最小者 $8$ 块 $= 2048$ 个线程 $= 64$ 个线程束：**$100\%$ 占用率**，`cudaOccupancyMaxActiveBlocksPerMultiprocessor` 证实了这一点（它报告每 SM $8$ 块）。若每线程 $40$ 个寄存器，一块要 $10{,}240$ 个寄存器，只装得下 $\lfloor 65{,}536 / 10{,}240 \rfloor = 6$ 块：$1536$ 个线程，$75\%$ 占用率。高占用率是手段而非目的：每个线程独立工作更多（多个在飞的载入、多个累加器）的核函数，在较低占用率下也能隐藏时延，沃尔科夫（Volkov）在 2010 年已就此作出演示。
:::
:::

::: quiz
一个核函数处理结构数组 `struct P { float x, y, z, w; } p[n]`，线程 $i$ 只读 `p[i].x`。哪些说法正确？
- [x] 每个线程束的载入触及 $16$ 个扇区，其中只有四分之一的字节有用。
- [ ] 该访问是合并的，因为相邻线程访问相邻的结构。
- [x] 把数据存成四个独立数组 `x[n], y[n], z[n], w[n]`，载入就完全合并。
- [ ] 每块使用更多线程就能使访问合并。
::: solution
`p[i].x` 位于字 $4i$：跨步为 $4$ 个字，由 [[#prop-coalescing]] 得 $16$ 个扇区、效率 $25\%$。相邻的*结构*不等于相邻的*字*。数组结构把 $x$ 值连续存放，跨步 $1$。块的大小不改变线程束产生的地址。
:::
:::

## 用共享内存做分块

朴素的矩阵乘法核函数为每个元素配一个线程，计算 $C_{ij} = \sum_k A_{ik} B_{kj}$：

```c
__global__ void naive(const float *A, const float *B, float *C, int n) {
    int row = blockIdx.y * T + threadIdx.y, col = blockIdx.x * T + threadIdx.x;
    float sum = 0;
    for (int k = 0; k < n; k++) sum += A[row * n + k] * B[k * n + col];
    C[row * n + col] = sum;
}
```

它对 `B` 的访问是合并的（相邻线程读相邻的 `col`），对 `A` 的访问是广播（整个线程束读同一个元素），所以写得并不差。但每个线程要读 `A` 的整整一行和 `B` 的整整一列——为了 $2n$ 次浮点运算读 $2n$ 个值，算术强度只有每字节 $1/4$ flop——而且这些元素被不同线程一读再读。高速缓存能接住一部分重用；分块则把重用明确地做出来。

::: algorithm 分块矩阵乘法 {#alg-tiled}
把 $C$ 划分成 $T \times T$ 的子块（tile），每个子块交给一个 $T \times T$ 线程的块。对 $k_0 = 0, T, 2T, \dots$：

1. 每个线程从 $A$ 中"本块所在行、列 $k_0, \dots, k_0 + T - 1$"的 $T \times T$ 子块载入一个元素，从 $B$ 的对应子块载入一个元素，分别放入共享数组 `As` 与 `Bs`。
2. `__syncthreads()`：子块齐了。
3. 每个线程累加 $\sum_{k=0}^{T-1} \texttt{As}[t_y][k] \cdot \texttt{Bs}[k][t_x]$。
4. `__syncthreads()`：不让任何人在别人还在读子块时改写它。

```c
__global__ void tiled(const float *A, const float *B, float *C, int n) {
    __shared__ float As[T][T], Bs[T][T];
    int ty = threadIdx.y, tx = threadIdx.x;
    int row = blockIdx.y * T + ty, col = blockIdx.x * T + tx;
    float sum = 0;
    for (int k0 = 0; k0 < n; k0 += T) {              /* 每阶段处理一对子块 */
        As[ty][tx] = A[row * n + k0 + tx];           /* 每个线程载入一个      */
        Bs[ty][tx] = B[(k0 + ty) * n + col];         /*   子块中的元素        */
        __syncthreads();                             /* 子块已齐 */
        for (int k = 0; k < T; k++) sum += As[ty][k] * Bs[k][tx];
        __syncthreads();                             /* 用完子块 */
    }
    C[row * n + col] = sum;
}
```
:::

::: theorem 分块把全局内存流量除以子块宽度 {#thm-tiling}
设 $T$ 整除 $n$，对 $n \times n$ 矩阵，朴素核函数发出 $2n^3$ 次全局载入，分块核函数发出 $2n^3/T$ 次，两者都做 $2n^3$ 次浮点运算。于是分块把相对全局内存的算术强度提高到 $T$ 倍。
:::

::: proof
朴素：$n^2$ 个线程每个执行 $n$ 轮迭代，每轮载入 $A$、$B$ 各一个元素：$2n \cdot n^2 = 2n^3$ 次载入。分块：每个线程执行 $n/T$ 个阶段，每阶段载入 $A$、$B$ 各一个元素：$2(n/T) \cdot n^2 = 2n^3/T$ 次载入。算术没有变化：每个线程仍做 $n$ 次乘加。共享内存中的数据被重用了 $T$ 次：`As` 的每个元素被本块中同一行的 $T$ 个线程读，`Bs` 的每个元素被同一列的 $T$ 个线程读。
:::

取 $T = 16$，流量降为十六分之一，开头的实验里核函数因此快了 $2.5$ 倍——不是十六倍，因为朴素核函数的多数重用已由 L1、L2 高速缓存提供，而分块核函数这时又被别的东西限制：共享内存带宽（每次乘加读两个共享内存字）、每阶段两道屏障、指令开销。实用库（cuBLAS、CUTLASS）走得更远：每个线程在寄存器里计算 $C$ 的一个小子块（寄存器分块），载入向量化并做双缓冲，使下一批子块在当前子块还在用时就已到达；近几代 GPU 还加入了**张量核心**——一条指令乘一个小矩阵的部件。思路在每个层次都一样：把一批数据搬到离算术更近的地方一次，然后反复使用。[[parallel-computing/performance-engineering]] 把这招用到 CPU 高速缓存上。

## 主机、设备与搬运数据的代价

独立 GPU 挂在总线上。数据必须先复制到设备存储器核函数才能使用（或通过**统一内存**远程、缓慢地访问，它按需迁移页），而且每次核函数启动都要花几微秒。

::: example P4 上的传输与启动 {#ex-transfer}
从锁页主机内存度量 $4$ 字节到 $64$ MiB 的主机到设备复制，以及启动一个空核函数并等待它完成的时间。把复制时间拟合到 $t(m) = \alpha + m/\beta$。
::: solution
```c
for (size_t bytes = 4; bytes <= max; bytes *= 64) {
    cudaMemcpy(d, h, bytes, cudaMemcpyHostToDevice);      /* 预热 */
    cudaEventRecord(t0);
    for (int r = 0; r < 10; r++) cudaMemcpy(d, h, bytes, cudaMemcpyHostToDevice);
    cudaEventRecord(t1);
    cudaEventSynchronize(t1);
    ...                                                   /* 打印每次复制的时间 */
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

（`h` 用 `cudaMallocHost` 分配，它把页锁定，GPU 才能用 DMA 直接复制它们；普通 `malloc` 的内存要经一块锁页缓冲区中转，更慢。）小复制无论大小都要约 $\alpha \approx 6$ µs；大复制接近 $\beta \approx 12.2$ GB/s，与 PCIe 3.0 ×16 链路相符，其理论速率每方向约 $15.8$ GB/s。这比 GPU 自身内存带宽低 $12$ 倍，比 CPU 的（$52$ GB/s，[[parallel-computing/parallel-architectures]]）低 $4$ 倍。启动与同步也要花约 $6$ µs——这段时间 GPU 本可执行约 $4000$ 万次浮点运算。
:::
:::

::: widget plot
f: 2^x/(a*1000 + 2^x/b)
x: 2, 28
y: 0, 14
sliders: a=6:1:20:0.5; b=12.2:4:32:0.2
labels: \text{有效带宽 (GB/s)}
points: 2,0; 8,0.04; 14,1.32; 20,11.17; 26,12.22
caption: 主机到设备的有效带宽 $m/(\alpha + m/\beta)$ 随传输长度 $m$（字节）的 $\log_2$ 变化，时延 $\alpha$（µs，滑块 $a$）、渐近带宽 $\beta$（GB/s，滑块 $b$）；点是 [[#ex-transfer]] 的测量。在 $m = \alpha\beta \approx 73$ KB 处达到渐近带宽的一半。把 $b$ 调到 $32$（大致相当于 2026 年的 PCIe 5.0 ×16）：大传输变快，小传输几乎不变，因为它们由 $\alpha$ 主导。同样的时延–带宽模型支配着 [[parallel-computing/message-passing]] 中的网络消息。
:::

对程序设计的推论很直接。只有省下的 GPU 时间超过传输时间，卸载计算才划算——所以数据本来就在主机上、只做一次的向量加法，在 CPU 上永远更快（它每元素读 $12$ 字节，CPU 流式读这些字节比 PCIe 搬运它们还快）。要让数据在多个核函数之间留在 GPU 上；把小核函数攒成大核函数，或把它们融合；并用**流**让传输与计算重叠：流是操作的队列，同一队列内按序执行、不同队列并发执行，于是一块数据在传输时，上一块已在处理。

::: warning GPU 不是更快的 CPU
把代码搬到 GPU 上，只有当代码拥有海量、规则的数据并行，*并且*每字节传输量摊得上足够多的算术运算时，才会变快。只有 $1000$ 路并行的程序会让大型 GPU 大半闲着（它需要几十万个线程，[[#thm-little]]）；以线程间各不相同的分支为主的程序只能跑到峰值的一小部分（[[#prop-divergence]]）；数据在主机上、只用一次的程序被总线卡住（[[#ex-transfer]]）。宣称"加速 $100\times$"的比较，多半是拿优化过的 GPU 代码对比没优化、单线程的 CPU 代码；与向量化、多线程的 CPU 版本相比，适合的问题通常只领先存储带宽之比或峰值之比的一个小倍数。要以像样的 CPU 基线来测，并把传输时间算进去。
:::

::: history
图形处理器在 2001 年前后变得可编程，研究者很快把通用计算表述为在纹理上进行的渲染遍（"GPGPU"）；伊恩·巴克（Buck）等人的 Brook 语言（2004）把 GPU 当作流处理机。NVIDIA 的 G80 架构（GeForce 8800，2006 年 11 月）把 GPU 的着色器单元统一成通用多处理器，2007 年发布的 CUDA 把它们开放给 C 程序。Khronos Group 于 2008 年 12 月发布了跨厂商的 OpenCL 1.0 规范。约翰·尼科尔斯（Nickolls）、伊恩·巴克（Buck）、迈克尔·加兰（Garland）与凯文·斯卡德龙（Skadron）的《Scalable parallel programming with CUDA》（2008）阐述了这一模型；戴维·柯克（Kirk）与 Wen-mei Hwu 的《Programming Massively Parallel Processors》（2010；与 Izzat El Hajj 合作的第四版，2022）成为标准教材。马克·哈里斯（Harris）的《Optimizing parallel reduction in CUDA》（2007）与瓦西里·沃尔科夫（Volkov）的《Better performance at lower occupancy》（2010）是 GPU 性能调优的经典。亚历克斯·克里热夫斯基（Krizhevsky）、伊利亚·萨茨克维尔（Sutskever）与杰弗里·辛顿（Hinton）在 2012 年用两块 GPU 训练出图像分类器 AlexNet，深度学习在 GPU 上的成功促使 NVIDIA 在 Volta 代（2017）加入张量核心。
:::

## 后续内容

[[parallel-computing/parallel-algorithms]] 的算法——归约、扫描、基于划分的基数排序、共享内存中的双调排序、层同步广度优先搜索——正是 CUB、Thrust 这类 GPU 库的核心。多块 GPU 的系统（单节点内或跨集群）靠集合操作通信（[[parallel-computing/message-passing]]），其代价模型正是这里量出的 $\alpha + m/\beta$ 形式。[[parallel-computing/performance-engineering]] 在 CPU 上应用屋顶线模型与同样的分块思想。训练与运行神经网络——如今 GPU 最主要的用途——属于 [LLM 图谱](/learn/llm/)；GPU 的电路属于[电气工程图谱](/learn/ee/)中的计算机架构。

::: summary
- CUDA 核函数跑在由**线程块**与**线程**构成的**网格**上（[[#def-cuda-hierarchy]]）；块在流多处理器上相互独立地运行，每个块的线程以 $32$ 个一组、一次发射一条指令的**线程束**执行（SIMT）。
- 存储空间（[[#def-cuda-memory]]）：寄存器、共享内存（每块私有、分 $32$ 个存储体的暂存器）、按 $32$ 字节扇区访问的全局内存。
- **访存合并**：线程束跨步 $s$ 的访问触及 $\min(4s, 32)$ 个扇区（[[#prop-coalescing]]）；在 P4 上，跨步 $2$ 使有效带宽从 $151$ GB/s 掉到 $49$ GB/s（[[#ex-stride]]）。
- **发散**把线程束内分支的两侧串行化（[[#prop-divergence]]）；顺序寻址的归约只需 $12$ 个"线程束·轮"而不是 $47$ 个，但两种归约都跑在 $143$ GB/s，因为它们访存受限（[[#ex-reduce-warps]]）。
- **利特尔定律**（[[#thm-little]]）说出为隐藏时延必须有多少工作在飞；**占用率**受寄存器、共享内存与线程上限的限制（[[#ex-occupancy]]）。
- 共享内存**分块**把全局载入次数除以子块宽度 $T$（[[#thm-tiling]]）；它使矩阵乘法在 P4 上快 $2.5$ 倍（$776$ 对 $306$ Gflop/s）。
- 主机–设备复制的代价是 $\alpha + m/\beta$，本机 $\alpha \approx 6$ µs、$\beta \approx 12$ GB/s（[[#ex-transfer]]）：把数据留在设备上、合并工作、用流让传输与计算重叠。
:::

## 习题

::: exercise 线程的全局下标 {level=1 check="773"}
一维核函数以每块 $256$ 个线程启动。块 $3$ 的第 $5$ 号线程的全局下标 `blockIdx.x * blockDim.x + threadIdx.x` 是多少？（填入下标。）它在块内的哪个线程束？
::: solution
$3 \times 256 + 5 = 773$。线程束由块内连续的线程组成，所以第 $5$ 号线程在块 $3$ 的线程束 $\lfloor 5/32 \rfloor = 0$ 里。
:::
:::

::: exercise `double` 的扇区数 {level=1 check="8"}
一个线程束的 $32$ 个线程从 $32$ 字节边界开始读 $32$ 个连续的 `double`（每个 $8$ 字节）。触及多少个 $32$ 字节扇区？（填入数目。）
::: solution
$32 \times 8 = 256$ 字节，即 $256/32 = 8$ 个扇区，全部充分利用。对 $8$ 字节数据的合并访问，每个线程束搬的字节数是对 $4$ 字节数据的两倍，效率毫不逊色。
:::
:::

::: exercise 需要多少个块？ {level=1 check="3907"}
要让 $10^6$ 个元素各有一个线程负责，需要多少个 $256$ 线程的块？（填入数目。）有多少线程无元素可算？
::: solution
$\lceil 10^6/256 \rceil = 3907$ 个块，共 $3907 \times 256 = 1{,}000{,}192$ 个线程，其中 $192$ 个没有元素，必须像 [[#ex-vadd]] 那样用边界检查排除。
:::
:::

::: exercise 寄存器限制的占用率 {level=2 check="0.5"}
一个 SM 有 $65{,}536$ 个寄存器，至多常驻 $2048$ 个线程。某核函数每线程用 $64$ 个寄存器、每块 $256$ 个线程，共享内存用得很少。它的占用率是多少？（用分数填入。）
::: solution
一块要 $64 \times 256 = 16{,}384$ 个寄存器，所以装得下 $65{,}536 / 16{,}384 = 4$ 块：$1024$ 个线程，占用率 $1024/2048 = 0.5$。把寄存器降到每线程 $32$ 个（例如用 `__launch_bounds__`，或简化核函数）就能放下 $8$ 块、达到满占用率——但要冒寄存器溢出到缓慢局部内存的风险。
:::
:::

::: exercise 在飞的字节数 {level=2 check="96000"}
某 GPU 的存储器提供 $192$ GB/s 带宽，平均时延 $500$ ns。由利特尔定律，要维持满带宽必须有多少字节在飞？（填入字节数。）若 $20$ 个 SM 每个支持 $2048$ 个线程、每个线程有一个未完成的 $4$ 字节载入，能达到这个带宽吗？
::: solution
$L = \lambda W = 192 \times 10^9 \text{ B/s} \times 500 \times 10^{-9} \text{ s} = 96{,}000$ 字节。每线程一个 $4$ 字节载入，需要 $24{,}000$ 个线程在飞、每个 SM $1200$ 个，不超过 $2048$——但前提是占用率至少 $59\%$ 且每个线程每时每刻都在等一个载入。低占用率的核函数要达到满带宽，得让每个线程持有多个相互独立的载入（循环展开、`float4` 向量载入）。
:::
:::

::: exercise 更大归约中活跃的线程束 {level=2 check="20"}
对 $B = 512$ 线程每块的顺序寻址归约（[[#alg-gpu-reduce]]），在 $9$ 轮中，每轮至少含一个活跃线程的线程束数目之和——即多少个"线程束·轮"？（填入数目。）
::: solution
各轮活跃线程数为 $256, 128, 64, 32, 16, 8, 4, 2, 1$，占据 $8, 4, 2, 1, 1, 1, 1, 1, 1$ 个线程束：$20$ 个"线程束·轮"。最后五轮只有一个线程束活跃，这正是优化过的归约用线程束级**重排**（shuffle）指令（`__shfl_down_sync`）收尾最后 $32$ 个元素的原因——它在线程束内部交换寄存器，不需要共享内存或屏障。
:::
:::

::: exercise 卸载还是不卸载 {level=2}
CPU 用 $40$ ms 把两个 $10^8$ 个 `float` 的数组相加（访存受限）。[[#ex-transfer]] 的 GPU 在数据已上设备后用 $8$ ms 完成。输入在主机上，结果也要留在主机上。卸载划算吗？若同一批数组随后还要被 $50$ 个别的 GPU 核函数使用，情况有何变化？
::: solution
复制要把 $2 \times 4 \times 10^8 = 800$ MB 搬上设备、$400$ MB 搬回来：$1.2 \times 10^9 / 12.2 \times 10^9 \approx 98$ ms，加上 $8$ ms 核函数时间——约 $106$ ms，而 CPU 只要 $40$ ms。不划算。若输入为随后 $50$ 个核函数留在设备上，传输只付一次、可以摊薄：$98 + 51 \times 8 \approx 506$ ms，而 CPU 要 $51 \times 40 = 2040$ ms，加速约 $4$ 倍。而且用流还能让一部分传输与头几个核函数重叠。一般规律：数据在设备上被使用的次数，必须多到对得起它这一趟搬运。
:::
:::

::: exercise 无存储体冲突的转置 {#ex-transpose level=3}
一个 $32 \times 32$ 线程的块借助共享内存转置一个 $32 \times 32$ 子块：线程 $(t_y, t_x)$ 经合并的全局读后写 `tile[ty][tx]`，同步，然后读 `tile[tx][ty]` 以进行合并的全局写。证明用 `float tile[32][32]` 时这个读有 $32$ 路存储体冲突，而声明成 `float tile[32][33]` 就没有了。
::: solution
$32 \times W$ 数组的字 `tile[r][c]` 位于字地址 $Wr + c$，属于存储体 $(Wr + c) \bmod 32$。一个线程束由 $t_y$ 相同、$t_x = 0, \dots, 31$ 的 $32$ 个线程组成。读 `tile[tx][ty]` 时，各通道访问地址 $W t_x + t_y$。$W = 32$ 时，存储体是 $(32 t_x + t_y) \bmod 32 = t_y$，对每个通道都一样：$32$ 个通道以 $32$ 个不同地址命中同一个存储体——$32$ 路冲突，于是这个读要 $32$ 个周期而不是 $1$ 个。$W = 33$ 时，存储体是 $(33 t_x + t_y) \bmod 32 = (t_x + t_y) \bmod 32$，当 $t_x$ 取遍 $0, \dots, 31$ 时得到 $32$ 个互不相同的值：没有冲突。写 `tile[ty][tx]` 两种情形都无冲突（存储体为 $t_x$ 或 $(t_y + t_x) \bmod 32$，整个线程束内互异）。补齐每个子块多占 $32$ 个字的共享内存，约 $3\%$。
:::
:::

::: exercise 最佳子块宽度 {level=3}
对 [[#alg-tiled]] 的分块核函数，块是 $T \times T$ 的正方形，每块至多 $1024$ 个线程、至多 $48$ KiB 共享内存，能用的最大 $T$ 是多少？由 [[#thm-tiling]]，$T = 16$ 比那个最大的 $T$ 多引起多少全局流量？为什么实际上 $T = 16$ 可能反而更快？
::: solution
线程：$T^2 \le 1024$，故 $T \le 32$。共享内存：两个 $T^2$ 个 `float` 的子块要 $8T^2$ 字节 $\le 49{,}152$，故 $T \le 78$。起约束作用的是 $T = 32$。流量是 $2n^3/T$ 次载入，所以 $T = 16$ 的全局载入是 $T = 32$ 的两倍。但 $T = 32$ 意味着每块 $1024$ 个线程，P4 上每个 SM 至多 $2$ 块，而且每道 `__syncthreads()` 都让 $32$ 个线程束等最慢的一个；$T = 16$ 时每个 SM 有 $8$ 个 $256$ 线程的块，一块可以在另一块屏障等待时计算。$T = 32$ 每阶段在两道屏障之间做的也多一倍，这有利。谁胜谁负取决于 GPU，必须实测；实用核函数让每个线程算多个输出，从而把子块大小与块大小解耦。
:::
:::
