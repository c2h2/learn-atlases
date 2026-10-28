在下面的 OpenMP 程序中，每个线程把*自己的*计数器自增两千万次。任意两个线程从不接触同一个变量，所以既没有共享，也没有竞争。命令行参数设定相邻线程计数器之间的距离：`1` 把它们在 `long` 数组里紧挨着存放，`8` 让它们相隔 $64$ 字节，而 `0` ——作为对照——让所有线程共用一个计数器。

```c
#include <omp.h>
#include <stdatomic.h>
#include <stdio.h>
#include <stdlib.h>

enum { ITERS = 20000000 };                   /* 每个线程的自增次数 */

int main(int argc, char *argv[]) {
    int stride = argc > 1 ? atoi(argv[1]) : 1;   /* 计数器之间的距离，以 long 为单位 */
    int p = omp_get_max_threads();
    atomic_long *c = aligned_alloc(64, sizeof(atomic_long) * (size_t)p * stride + 64);
    for (long i = 0; i < (long)p * stride; i++) atomic_init(&c[i], 0);
    double t0 = omp_get_wtime();
    #pragma omp parallel
    {
        atomic_long *mine = &c[omp_get_thread_num() * stride];   /* 并不共享！ */
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

每个线程都在自己的核心上做同样多的工作，所以无论 $p$ 是多少，时间都应当保持在一个线程的水平。本课程那台 $36$ 核、双插槽机器上的观测（2026 年）：

| 线程数 $p$ | $1$ | $2$ | $4$ | $8$ | $16$ | $32$ |
|---|---|---|---|---|---|---|
| 共享一个计数器（步长 $0$） | $0.140$ s | $0.463$ s | $1.632$ s | $2.675$ s | $5.594$ s | $11.955$ s |
| 计数器相邻（步长 $1$） | $0.126$ s | $0.907$ s | $1.473$ s | $2.629$ s | $2.994$ s | $4.244$ s |
| 计数器相隔 $64$ 字节（步长 $8$） | $0.129$ s | $0.142$ s | $0.142$ s | $0.152$ s | $0.156$ s | $0.211$ s |

计数器相隔 $64$ 字节时，程序的表现符合预期。计数器相邻时却最多慢 $20$ 倍——几乎和所有线程真的共享一个计数器时一样慢。线程们不共享任何*变量*，却共享**缓存行**：一条缓存行有 $64$ 字节，于是八个相邻的 `long` 计数器住在同一行里，而硬件要让这一行在各个核心私有缓存之间保持一致，就得在每次写入时把这行在核心之间传来传去。

本章解释做这件事的硬件。**缓存一致性**（cache coherence）协议（如 MESI）使一行数据在不同缓存中的副本保持一致；我们精确定义一致性，证明协议维持一致性，并算出它付出的通信量——这就解释了**伪共享**（false sharing），即上面看到的现象，以及有竞争的原子操作的代价。一致性一次只管一个存储位置。一个核心对*不同*位置的写入按什么次序让别的核心看见，则是另一个问题——**内存一致性模型**，[[programming-languages/concurrency-models]] 以顺序一致性、TSO 与"无数据竞争"保证引入了它。这里我们用这些概念以 C11 原子类型写出正确的同步：获取与释放、栅栏，以及各自的代价。

## 缓存一致性

多核处理器的每个核心都有私有的 L1 与 L2 高速缓存（[[computer-systems/memory-hierarchy]]）。若两个核心缓存了同一个内存块而其中一个写它，另一个的副本就过期了。若没有进一步的机制，一个核心可能无限期地读到旧值——等待标志位的自旋循环永远看不到它变化。单处理器的缓存不会有这个问题，因为程序能读到的副本只有一份。

::: definition 缓存一致性 {#def-coherence}
一个内存系统是**一致的**，如果对每个存储位置，以下不变式始终成立：

1. **单写者，多读者（SWMR）**：任一时刻，或者恰好一个核心可以写该位置（且只有该核心能读它），或者任意多个核心可以读它而没有一个能写。
2. **数据值**：只读期开始时该位置的值，等于最近一次读-写期结束时它的值。

等价地说，对一个位置的所有写入都是**串行化**的——被每个核心以同一次序看到——并且每次读都返回该次序中最新一次写入的值。
:::

一致性使缓存*对每个位置分别而言*是不可见的：程序无法从它对某个变量读到的值推断出缓存的存在。硬件用一个**一致性协议**强制执行它：每个缓存控制器为自己持有的每一行记录一个状态，并在核心要读写时与其他控制器交换消息。协议有两族。**监听**（snooping）协议中，每个缓存都在共享总线或广播网络上观察（"监听"）每个请求，请求在总线上的次序把它们串行化。**目录**协议中，内存端的目录记录哪些缓存持有每一行，请求发给目录，由目录只转发给有关的缓存。监听在核心数少时简单而快；目录能够扩展。

## MESI 协议

最简单的失效协议 **MSI** 给每条被缓存的行三种状态之一：**M**odified 已修改（本缓存持有唯一的副本，且是脏的——比内存中的新）、**S**hared 共享（本缓存持有干净的只读副本，别的缓存可能也有）与 **I**nvalid 无效。对处于 I 状态的一行做一次读，发出一条总线读并进入 S；在 S 或 I 中写，则发出一个**使**所有其他副本**失效**（invalidate）的请求，并进入 M。MESI 增加第四种状态 **E**xclusive 独占，用于没有别的缓存持有的干净副本：写它可以不告诉任何人。

::: definition MESI 协议 {#def-mesi}
每个缓存把每一行保持在四种状态之一：

| 状态 | 有效？ | 脏？ | 其他副本？ | 核心可以 |
|---|---|---|---|---|
| **M**（已修改） | 是 | 是 | 无 | 读和写 |
| **E**（独占） | 是 | 否 | 无 | 读；写，悄悄转入 M |
| **S**（共享） | 是 | 否 | 可能有 | 读 |
| **I**（无效） | 否 | — | — | 什么都不行 |

处理器事件及其引起的总线事务，总线一次只执行一个事务、被所有缓存观察到：

- 在 M、E 或 S 中**读**：命中，没有事务。在 I 中**读**：发出 **BusRd**。若另一个缓存以 M 持有该行，它提供数据（并把它回写进内存）——一次**冲刷**（flush）——每个以 M 或 E 持有的缓存转入 S。请求者：若别的缓存有副本则进入 S，否则进入 E。
- 在 M 中**写**：命中。在 E 中**写**：命中，不经事务转入 M。在 S 中**写**：发出 **BusUpgr**（一次失效）：所有其他副本转入 I，请求者进入 M。在 I 中**写**：发出 **BusRdX**（为取得所有权而读）：M 的持有者冲刷，所有其他副本转入 I，请求者进入 M。
- 缓存可以随时**逐出**一行，若该行处于 M 则先回写。
:::

::: widget graph
nodes: I@0,0; S@2,0; E@0,2; M@2,2
edges: I>S; I>E; I>M; S>M; E>M; E>S; M>S; S>I; E>I; M>I
algorithm: none
caption: MESI 下一条缓存行在一个缓存中的状态转移。从 I 出发：读缺失导致 S（另一缓存有副本）或 E（没有）；写缺失（BusRdX）导致 M。从 S 出发：本地写（BusUpgr）导致 M；远端写或逐出导致 I。从 E 出发：本地写*悄悄地*导致 M；远端读导致 S。从 M 出发：远端读导致 S（伴随一次冲刷）；远端写或逐出导致 I。把各状态拖开，追踪这样一行的历史：一个核心先读它再写它，之后另一个核心再来读——I → E → M → S。
:::

::: theorem MESI 保持一致性 {#thm-mesi}
假设总线是**原子的**——每个事务（包括所有监听缓存的状态改变）都在下一个事务开始之前完成——并且协议从每行在每个缓存中都是无效的状态开始。那么在每个事务和每个处理器事件之后，对每一行，或者恰好一个缓存以 M 或 E 持有它而其余都在 I，或者没有缓存以 M 或 E 持有它。特别地，SWMR 不变式成立，因为只有 M 和 E 允许写。此外，每次读都返回对该位置最近一次写入的值。
:::

::: proof
对影响某一行的一连串事件归纳，证明第一句；初始状态全为 I，满足它。假设事件之前不变式成立，逐个考虑 [[#def-mesi]] 的各个情形。

**命中**（在 M、E、S 中读；在 M 中写）不改变任何状态。**在 E 中写**把唯一以 E 持有的那个缓存中的 E 改为 M：仍是以 M 或 E 唯一持有，其余仍是 I。**逐出**把一行变为 I，不可能造成第二个以 M 或 E 的持有者。

**在 I 中读（BusRd）。** 所有以 M 或 E 持有的缓存转入 S，而请求者只有在没有别的缓存持有有效副本时才进入 E，此时其余全是 I。否则请求者进入 S，之后没有缓存处于 M 或 E。

**在 S 或 I 中写（BusUpgr 或 BusRdX）。** 每个其他缓存转入 I，请求者进入 M。之后恰好一个缓存以 M 持有该行，其余都在 I。

因为总线是原子的，这些情形互不穿插，所以每个事件之后不变式都成立。

数据值：一个值只由以 M 持有该行的核心写入。因此写入按 M 期的串行次序发生，而每个 M 期都以一次总线事务开头、与所有其他事务串行化。当一段 M 结束——经由 BusRd、BusRdX 或逐出——脏数据被冲刷给请求者或内存，于是下一个读者或写者拿到最新值。处于 S 或 E 的一行，要么来自内存（在上一个 M 持有者回写之后），要么来自那次冲刷本身；所以在 S、E 或 M 中读都返回最新的写。
:::

真实的总线不是原子的：现代处理器把事务拆分、让许多事务同时在飞，并且必须增加过渡状态来处理竞争，例如两个缓存同时请求同一行。验证这样的协议是一个严重的工程问题，要用遍历一切穿插情形的模型检查器来做。它们验证的不变式正是定理中的那一条。

::: example 一条 MESI 轨迹 {#ex-mesi-trace}
三个核心访问同一行 $X$：P0 读、P0 写、P1 读、P2 读、P2 写、P0 读、P0 写。给出每次访问后该行在每个缓存中的状态，并数一数 MESI 与 MSI 下的总线事务数。
::: solution
一个小模拟器套用 [[#def-mesi]] 的规则：

```python
def simulate(trace, ncpu, use_e=True):
    """States of one cache line in ncpu caches under MESI (or MSI if use_e is False)."""
    st, bus = ["I"] * ncpu, 0
    for cpu, op in trace:
        others = [c for c in range(ncpu) if c != cpu and st[c] != "I"]
        s, msg = st[cpu], ""
        if op == "R" and s == "I":                       # 读缺失
            msg, bus = "BusRd", bus + 1
            if any(st[c] == "M" for c in others):
                msg += " (M copy flushed)"
            for c in others:
                st[c] = "S"                              # M 与 E 的持有者降为 S
            st[cpu] = "S" if others or not use_e else "E"
        elif op == "W" and s in ("I", "S"):              # 没有所有权的写
            msg, bus = ("BusRdX" if s == "I" else "BusUpgr"), bus + 1
            for c in others:
                st[c] = "I"                              # 使所有其他副本失效
            st[cpu] = "M"
        elif op == "W" and s == "E":
            st[cpu] = "M"                                # 悄悄升级：没有总线流量
        # 在 M、E、S 中的读命中与在 M 中的写命中什么也不用做
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

唯一的区别在第二次访问：MESI 下，P0 的首次读发现没有别的副本而进入 E，于是它的写是一次悄悄的升级；MSI 下它必须广播一个没人需要的失效。读了再写无人使用的数据——这是最常见的模式，远多于其他——在 MESI 下一次事务就够了而不是两次。还要注意：前两次访问之后，每次改变*写者*的访问都要花一次事务：P2 的写使两份副本失效，P0 的读必须把行从 P2 取回来。这就是开头那个程序变慢的流量。
:::
:::

商用处理器用的是变体。英特尔的处理器用 **MESIF**，其中 F（forward，转发）状态指定多个共享者之一负责应答请求；AMD 的用 **MOESI**，其 O（owned，有主）状态允许脏行在不先回写内存的情况下被共享。原则——单写者、写前失效——是一样的。

### 目录与 NUMA

每条总线上的每个缓存都能看见每个事务，这样的总线在几十核心之外就无法扩展：它的带宽是共享的，而且每个缓存都必须查看每个请求。大型系统用**目录**取代广播：对每条内存行，它的**归属节点**（内存中存放该行的节点）保留一个条目，记录该行的状态以及哪些缓存持有副本。读缺失发给归属节点，由它要么供给该行，要么把请求转发给唯一以 M 持有该行的缓存；写发给归属节点，由它只向记录为共享者的缓存发送失效并收集它们的应答。协议逻辑与 MESI 相同，只是消息是点对点发送的。

::: proposition 全映射目录的存储代价 {#prop-directory}
一个对每条内存行为每个缓存保留一个存在位的目录，若有 $p$ 个缓存、行大小 $B$ 字节，则每 $8B$ 位内存需要 $p$ 位：占内存的 $p/(8B)$。它的代价随缓存数线性增长。
:::

::: proof
每行 $B$ 字节 $= 8B$ 位内存需要 $p$ 个存在位（另有几个状态位，忽略不计），所以比值是 $p/(8B)$。行大小 $64$ 字节、$p = 64$ 个缓存时，这是内存的 $64/512 = 12.5\%$；$p = 1024$ 时，比内存本身还多出一倍。
:::

真实的目录因此做压缩：为共享者保留少量指针而不是完整的位向量，或按缓存分组跟踪存在性，或只为真正被缓存的行保留目录项。在同一块芯片内，各核心的私有缓存由共享 L3 缓存中的监听过滤器或目录保持一致；跨插槽之间，则经由插槽间链路上的消息。

在双插槽机器上，一致性的代价取决于两个核心位于何处。下面的程序把两个线程绑到指定的 CPU 上，让它们通过一条缓存行来回传"球"：每个核心等该行变成自己的编号，然后写入对方的编号。每一次交接都把行从一个核心的缓存搬到另一个核心的缓存。

::: example 插槽内与插槽间的一致性时延 {#ex-pingpong}
测量一条缓存行在同一个插槽的两个核心之间、以及在不同插槽的核心之间传一次所需的时间。
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
static _Alignas(64) atomic_int ball;          /* 来回弹跳的那条缓存行 */
static int cpu[2];

static void pin(int c) {
    cpu_set_t s; CPU_ZERO(&s); CPU_SET(c, &s);
    pthread_setaffinity_np(pthread_self(), sizeof s, &s);
}

static void *player(void *arg) {
    int me = (int)(long)arg;
    pin(cpu[me]);
    for (int r = 0; r < ROUNDS; r++) {
        while (atomic_load_explicit(&ball, memory_order_acquire) != me) ;  /* 等待 */
        atomic_store_explicit(&ball, 1 - me, memory_order_release);        /* 回击 */
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

CPU $0$–$17$ 在插槽 $0$，$18$–$35$ 在插槽 $1$（[[parallel-computing/parallel-architectures#ex-lscpu]]）。两次运行：

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

插槽内传一次约 $100$–$130$ ns；插槽间约 $200$–$250$ ns（观测值；数字包含察觉变化与回写的时间，且各次运行有波动）。无论哪个都是几百个时钟周期——远多于 L1 命中的 $1$ ns——而对一条刚刚被另一个核心用过的行的每次写，都要付出这个代价。一致性保证了数值正确，但通过共享内存通信并不便宜；它是由硬件完成的消息传递。
:::
:::

## 伪共享

::: definition 真共享与伪共享 {#def-false-sharing}
不同核心对同一条缓存行的两次访问，只要其中至少一次是写，就**共享**该行。若访问的是相同的字节，这种共享是**真**的；若访问的是恰好落在同一行里的不相交字节，则是**伪**的。两者都造成一致性缺失——行被另一个核心的写入失效后再次访问便缺失——但伪共享是不必要的：程序并没有通信，换一种数据布局，流量就消失了。
:::

一致性缺失是继强制缺失、容量缺失与冲突缺失（[[computer-systems/memory-hierarchy]]）之后的第四种缺失。在开头的程序里，相邻计数器伪共享缓存行：步长 $1$ 时，八个线程的计数器共享一条 $64$ 字节的行；每次原子自增都需要该行处于 M 状态；于是每次自增，行都要在最后一个写它的核心的缓存中被失效，并以 [[#ex-pingpong]] 测得的代价转移过来。$32$ 个线程时计数器占四条行、每行八个线程，所以步长 $1$ 比共享一个计数器（全部 $32$ 个线程争一条行）略好一些。把每个计数器填充到自己的行上，竞争就完全消失了。

::: widget plot
f: 0.13
x: 1, 32
y: 0, 12.5
labels: \text{无共享：时间恒定}
points: 1,0.126; 2,0.907; 4,1.473; 8,2.629; 16,2.994; 32,4.244; 2,0.463; 4,1.632; 8,2.675; 16,5.594; 32,11.955
caption: $p$ 个线程各执行 $2 \times 10^7$ 次原子自增的秒数，取自开头的表格。每行一个计数器时，时间贴近 $0.13$ s 这条水平线（填充后的测量值都落在它上面，$p = 32$ 时至 $0.21$ s）。圆点显示两种共享布局：相邻计数器（伪共享——$p = 16$ 与 $32$ 处较低的一组）和一个共享计数器（真共享——较高的一组）。注意在每行的计数器数还多不过线程数之前，伪共享的代价与真共享不相上下。
:::

解法是把每线程数据布局成：每个线程可写的数据占据自己的缓存行——

- 把每线程结构**填充**（pad）到行大小：`struct { long n; char pad[56]; }`，或在 C11 中对成员用 `_Alignas(64)`；
- 累加进**局部变量**（寄存器），最后才写一次共享内存——[[parallel-computing/shared-memory#thm-reduction]] 的归约模式；
- 给每个线程输出数组中**连续的一块**而不是交错的元素，于是线程们写的行除块边界外互不相同；
- 查询行大小而不要想当然：在 Linux 上 `getconf LEVEL1_DCACHE_LINESIZE`（我们的机器上是 $64$）；C++17 提供 `std::hardware_destructive_interference_size`。

::: example 数一数被伪共享的行 {#ex-count-sharing}
八个线程写 `out[i]`，$i = 0, \dots, n - 1$，$n = 10^6$ 个 `double`，数组起始于一行的边界。分别数出 `schedule(static)` 与 `schedule(static, 1)` 下被不止一个线程写过的缓存行数，并估算 `static, 1` 下扫过一遍的一致性代价，设每次转移 $100$ ns。
::: solution
一行装 $8$ 个 `double`，所以共有 $125{,}000$ 行。`static` 下线程 $t$ 写块 $[125{,}000\,t, 125{,}000\,(t + 1))$；因为 $125{,}000$ 是 $8$ 的倍数，每块都从行边界开始，于是*没有*一行被共享。（若块大小不是 $8$ 的倍数，至多 $7$ 行——每个边界一行——会被共享。）`static, 1` 下元素 $i$ 归线程 $i \bmod 8$，所以每行的八个元素属于八个不同的线程：全部 $125{,}000$ 行都被共享。若线程大致同步推进，每行经过全部八个缓存，扫一遍至多 $8 \times 125{,}000 = 10^6$ 次转移，按每次 $100$ ns 约 $0.1$ s——而算术本身只要约 $1$ ms。干净地测量这一效应比数出它更难：在我们的测试里，$16$ 个线程对 $2^{16}$ 个 `double` 扫 $2000$ 遍，`static, 1` 用了 $0.47$ s，`static` 用 $0.011$ s；而按行对齐分块的 `static, 8`——完全没有伪共享——仍要 $0.13$ s，因为几次迭代一块也有调度开销，还妨碍向量化（我们机器上的观测）。两种效应指向同一个结论：给每个线程一大块连续区域。
:::
:::

普通（非原子）存储造成的伪共享通常比开头的程序温和，因为核心会缓冲自己的存储，每次取得所有权时可以往一行提交好几条。但它依然常见且难找，因为源代码里没有任何地方显示它；能数一致性缺失的工具（Linux 上的 `perf c2c`）能把它定位出来。

::: quiz
在行大小 $64$ 字节的机器上，下列哪些可能发生伪共享？
- [x] `schedule(static, 1)` 的 OpenMP 循环，迭代 $i$ 写 `double` 数组 `out[i]`。
- [ ] `schedule(static)` 的 OpenMP 循环，迭代 $i$ 写 `double` 数组 `out[i]`，共 $10^6$ 次迭代。
- [x] 数组 `long hits[64]`，线程 $t$ 反复自增 `hits[t]`。
- [ ] 十六个线程只读一张 $1$ MiB 的共享查询表。
::: solution
`static, 1` 下相邻迭代归不同线程，所以每行的八个 `double` 被八个不同的线程写。按块调度时每个线程写连续一块，行只在块之间被共享——$125{,}000$ 行中每对相邻线程至多一行。一个数组里的每线程计数器是经典情形。读从不失效：十六个缓存可以无限期地把表保持在 S 状态。
:::
:::

## 内存一致性

一致性给*每个*位置的写入定序。它对*不同*位置的写入何时可见没有说任何话。考虑最常见的同步模式：通过标志位做**消息传递**：

```c
data = 42;          /* 生产者 (1) */            while (!ready) ;     /* 消费者 (3) */
ready = 1;          /*         (2) */           print(data);         /*         (4) */
```

消费者必须打印 $42$。这要求：若 (3) 看到了写 (2)，则 (4) 看到写 (1)——`ready` 与 `data` 两个不同位置之间的定序。一致性不提供它：处理器可能让 (2) 先于 (1) 可见，或在 (3) 之前执行 (4)。它能否这样做由**内存一致性模型**决定——硬件（或语言）与程序员之间关于一次载入可以返回什么值的约定。[[programming-languages/concurrency-models]] 定义了**顺序一致性**（SC，[[programming-languages/concurrency-models#def-sc]]），其下每次执行都像一个穿插；并说明 x86 处理器实现较弱的 **TSO**：每个核心有一个 FIFO 存储缓冲区，于是一次存储可能被稍后对另一位置的载入超越——它用存储缓冲测试观察到了这一点。ARM、POWER 与 RISC-V 还要弱：它们可能重排到不同位置的两次存储或两次载入，所以除非程序说明需要什么定序，连消息传递模式在它们上面都会失败。

编译器也会重排。它假设程序没有数据竞争，并据此移动、合并或删除对普通变量的访问。

::: example 被编译器删掉的标志位 {#ex-hoist}
分别用普通 `int` 标志位、以及用 C11 原子标志位配释放与获取定序，编译消息传递模式。

```c
#include <pthread.h>
#include <stdatomic.h>
#include <stdio.h>

static long data;                       /* 普通变量：消息 */
#ifdef PLAIN
static int ready;                       /* 错误：普通标志位，数据竞争 */
#define PUBLISH() (ready = 1)
#define READY()   (ready)
#else
static atomic_int ready;
#define PUBLISH() atomic_store_explicit(&ready, 1, memory_order_release)
#define READY()   atomic_load_explicit(&ready, memory_order_acquire)
#endif

static void *producer(void *arg) {
    (void)arg;
    data = 42;                          /* (1) 写入消息 */
    PUBLISH();                          /* (2) 然后升起标志 */
    return NULL;
}

int main(void) {
    pthread_t t;
    pthread_create(&t, NULL, producer, NULL);
    while (!READY()) ;                  /* (3) 等待标志 */
    printf("data = %ld\n", data);       /* (4) 读取消息 */
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

普通版挂死了：`timeout` 在 $5$ 秒后杀掉了它（状态 $124$）。反汇编给出原因。在 `main` 里，编译器只载入 `ready` *一次*（地址 `10e9`）；若它是 $0$，就跳到一条永远跳向自己的指令。既然 `main` 的循环里没有代码改变 `ready`，而并发的改变又是数据竞争——未定义行为——编译器就可以假设它的值永不变。原子版是对的：每次都必须执行原子载入。在 x86 上，释放存储编译成一条普通的 `movl $0x1, ready`，放在 `movq $0x2a, data` 之后；获取载入编译成一条普通的 `mov`：TSO 本来就把存储保持有序、载入保持有序，所以在 x86 上释放与获取在硬件上不花代价。在 ARM 上它们编译成 `stlr` 与 `ldar` 指令，它们确实强制定序。
:::
:::

C11 与 C++11 内存模型（[[programming-languages/concurrency-models#thm-drf-sc]]）让每个原子操作声明自己需要的定序。最重要的几种定序如下。

::: definition 内存定序与 happens-before {#def-memory-order}
在 C11 中，每个原子操作带一个 `memory_order`：

- `relaxed`（宽松）：该操作是原子的，并且对每个位置，所有线程按同一顺序看到它的各次修改（一致性），但它不安排其他任何东西的次序。
- `release`（用于存储）：在它之前、同线程内的读或写不得被移到它之后。
- `acquire`（用于载入）：在它之后、同线程内的读或写不得被移到它之前。
- `seq_cst`（默认）：兼具获取与释放，并且所有 `seq_cst` 操作出现在一个与每个线程的程序次序一致的全序中。

对原子变量的一次释放存储 $W$ 与读取了 $W$ 所写值的同一变量的获取载入 $R$ **同步**（synchronises with）。**happens-before**（先行发生）是包含每个线程内的程序次序与每一对"同步于"关系的最小传递关系。模型保证：若对某个非原子位置的写 $w$ happens-before 对它的读 $r$，且期间没有其他写介入，则 $r$ 返回 $w$ 的值；而若两个冲突的访问之间没有 happens-before 定序，程序就存在数据竞争。
:::

::: theorem 释放与获取实现消息传递 {#thm-message-passing}
在带原子标志位的 [[#ex-hoist]] 中，消费者打印 $42$，且程序没有数据竞争。
:::

::: proof
消费者的循环只有在 `ready` 的一次获取载入 (3) 返回 $1$ 时才结束。对 `ready` 写 $1$ 的只有生产者的释放存储 (2)，所以 (2) 与那次载入同步。在生产者内，(1) 在程序次序上先于 (2)；在消费者内，(3) 先于 (4)。由传递性，(1) happens-before (4)。对 `data` 的写只有 (1)，所以 (4) 返回 $42$。对 `data` 的访问是 (1) 与 (4)，已由 happens-before 定序，因此不竞争；对 `ready` 的所有访问都是原子的，而原子访问从不竞争。
:::

释放-获取对消息传递、锁和大多数同步已经够用：加一次互斥量是获取操作，解锁是释放操作，临界区需要的仅此而已。它对存储缓冲模式*不*够用——该模式下每个线程先写一个标志位再读对方的——那是 Dekker 算法与 Peterson 算法的模式（[[operating-systems/threads-locks]]）。一次释放存储后跟一次对*不同*位置的获取载入仍可能被重排（释放只禁止把先前的访问移到之后；获取只禁止把后续的访问移到之前）。只有 `seq_cst` 禁止这样做（[[#ex-sb-acqrel]]），在 x86 上编译器此时会发出 `xchg` 或排空存储缓冲区的栅栏，代价是几十个时钟周期。

::: warning 从硬件出发推理是不够的
"x86 从不把存储与存储重排，所以我用普通变量的标志位是安全的"——这话有两个错误。编译器是重排与消除的第二个来源，它受*语言*的内存模型支配，而不是处理器的——[[#ex-hoist]] 正是在 x86 上挂死的。而且在 x86 上正确的代码可能在 ARM 上失败，而手机几乎全部、许多笔记本电脑、以及越来越多（2026 年）的服务器都跑 ARM。写同步要用语言的原子类型和你的证明所需的最弱定序（大多数情形用 `release`/`acquire`；拿不准就用 `seq_cst`）；更好的办法是用锁和久经考验的并发库。`volatile` 不是替代品：它阻止编译器删掉访问，但既不保证原子性，也不提供与普通变量之间的定序。
:::

### 原子操作的代价

在本课程的机器上，开头实验中一个无竞争的宽松 `atomic_fetch_add`（一条 `lock xadd` 指令）耗时约 $0.126\text{ s}/(2 \times 10^7) \approx 6$ ns——约为寄存器里一次普通自增的二十倍，因为加锁指令要等存储缓冲区排空，还必须把行保持在 M 状态。有竞争时，同样这条指令在 $16$ 个线程共享一个计数器时，每次自增每线程约 $5.594\text{ s}/(2 \times 10^7) \approx 280$ ns，慢了 $40$ 多倍，因为现在每次操作都要等行从另一个核心到来。这两个数字定下可扩展共享内存编程的规则：行留在一个缓存里时原子操作便宜，行在移动时昂贵；一个程序只有当它的线程主要写别的线程不用的行时才能扩展。[[parallel-computing/concurrent-data-structures]] 就是照这个思路设计数据结构的。

::: history
监听协议随着最早的总线式多处理器出现。詹姆斯·古德曼（James Goodman）的"写一次"（write-once）协议（1983）是最早的之一；马克·帕帕马克奥斯（Mark Papamarcos）与贾纳克·帕特尔（Janak Patel）的"伊利诺伊协议"（1984）引入了独占干净状态，实质上就是 MESI。吕西安·桑西耶（Lucien Censier）与保罗·福特里耶（Paul Feautrier）于 1978 年提出目录式一致性，斯坦福 DASH 多处理器（丹尼尔·莱诺斯基（Daniel Lenoski）、约翰·亨尼西（John Hennessy）等，1992）证明了它能扩展。兰波特（Lamport）于 1979 年定义了顺序一致性。萨丽塔·阿德维（Sarita Adve）与马克·希尔（Mark Hill）于 1990 年证明了"无数据竞争"保证，阿德维与库罗什·加拉霍尔卢（Kourosh Gharachorloo）的综述《Shared memory consistency models》（1996）成为标准入门。彼得·休厄尔（Peter Sewell）、萨什米特·萨尔卡尔（Susmit Sarkar）及其合作者在厂商的文字规范被证明有二义性之后，于 2010 年给出了第一个严格的 x86 多处理器模型 x86-TSO。汉斯·伯姆（Hans Boehm）与萨丽塔·阿德维（Sarita Adve）设计了 C++11 内存模型（2008），被 C11 与 C++11 于 2011 年采纳。
:::

## 后续内容

[[parallel-computing/concurrent-data-structures]] 用本章的原子操作与定序构造许多线程可同时使用的栈、队列与链表，有锁无锁都有，并定义它们何谓正确。伪共享与一致性流量在 [[parallel-computing/performance-engineering]] 中再次出现，那里还有数据的 NUMA 放置。拥有数千线程的 GPU 大多避开了核心私有缓存之间的硬件一致性（[[parallel-computing/gpu-programming]]），而集群根本没有一致性：通信是显式的（[[parallel-computing/message-passing]]）。内存模型的形式语义与 DRF-SC 定理见 [[programming-languages/concurrency-models]]。

::: summary
- 私有缓存保存副本，所以多核处理器需要**缓存一致性**：每个位置单写者或多读者，读返回最新的写（[[#def-coherence]]）。
- **MESI**（[[#def-mesi]]）为每个缓存的每行保存一个状态；写使其他副本失效。在原子总线上它维持单写者不变式（[[#thm-mesi]]）；E 状态为私有数据省下一次事务（[[#ex-mesi-trace]]）。大型系统用**目录**，其全映射存储随缓存数增长（[[#prop-directory]]）。
- 在我们的机器上，把一行在两个核心之间移动，插槽内要 $100$–$130$ ns，插槽间要 $200$–$250$ ns（[[#ex-pingpong]]）。
- **伪共享**——线程在同一行里写不同的数据（[[#def-false-sharing]]）——使每线程原子计数器最多慢 $20$ 倍；填充到 $64$ 字节就消除了这一效应。
- 一致性逐位置而言；**内存一致性模型**给不同位置的访问定序。编译器对非原子变量会重排、消除访问——一个普通标志位的循环被编译成了死循环（[[#ex-hoist]]）。
- C11 的**释放**存储与**获取**载入建立 happens-before 边、实现消息传递（[[#thm-message-passing]]）；存储缓冲模式需要 `seq_cst`。原子操作无竞争时便宜（这里约 $6$ ns），行移动时昂贵。
:::

## 习题

::: exercise 数总线事务 {level=1 check="4"}
MESI 下从该行处处无效开始，两个核心执行：P0 读 $X$，P1 读 $X$，P0 写 $X$，P0 再写一次 $X$，P1 写 $X$。共发生几次总线事务？（填入数目。）给出每次访问后的状态。
::: solution
P0 读：BusRd，无其他副本，P0 $=$ E（状态 E, I）。P1 读：BusRd，P0 降为 S（S, S）。P0 写：BusUpgr，P1 被失效（M, I）。P0 写：命中（M, I）。P1 写：P1 在 I，所以 BusRdX；P0 冲刷并被失效（I, M）。共 $4$ 次事务。
:::
:::

::: exercise 目录开销 {level=1 check="0.25"}
一个全映射目录对每条 $64$ 字节的内存行为每个缓存保留一个存在位。$128$ 个缓存时它占内存的多大比例？（忽略状态位，填入比例。）
::: solution
由 [[#prop-directory]]，$p/(8B) = 128/(8 \times 64) = 128/512 = 0.25$：内存的四分之一。这就是大型机器使用限指针目录或粗粒度向量目录、或只为当前被缓存的行保留目录项（"稀疏目录"）的原因。
:::
:::

::: exercise 一行几个线程？ {level=1 check="16"}
数组 `int count[64]`（`int` 为 $4$ 字节）起于 $64$ 字节边界，线程 $t$ 对 $t = 0, \dots, 63$ 自增 `count[t]`。每个缓存行有几个线程在写？（填入数目。）怎样声明计数器以避免伪共享？
::: solution
一条 $64$ 字节的行装 $64/4 = 16$ 个 `int`，所以 $4$ 条行中的每一条有 $16$ 个线程在写。声明一个带填充的类型，例如 `struct { _Alignas(64) int n; } count[64];`——成员的强制对齐迫使每个元素另起一行，于是结构占 $64$ 字节——或者把每个线程的计数留在局部变量里，最后才写入共享数组一次。
:::
:::

::: exercise E 状态省下什么 {level=2 check="1000"}
一个线程读然后写 $1000$ 个互不相同、别的核心都没缓存过的行。MSI 比 MESI 多需要多少次总线事务？（填入数目。）若另一个核心事先也读过每一行，节省会怎样？
::: solution
MSI 下每行要一次 BusRd（进入 S）再一次 BusUpgr（进入 M）：$2000$ 次事务。MESI 下读发现没有别的副本而进入 E；写悄悄升级：$1000$ 次事务。MSI 多 $1000$ 次。若另一个核心持有该行，MESI 下读也进入 S，写必须使对方的副本失效：两个协议每行都要两次事务，节省消失——E 恰恰只对未共享的数据有用。
:::
:::

::: exercise 普通存储与伪共享 {level=2}
把原子类型换成普通的 `volatile long` 计数器（每个线程循环执行 `(*mine)++`），同样的实验在 $16$ 个线程共 $10^8$ 次自增下，相邻计数器用 $0.024$ s，填充过的用 $0.018$ s——伪共享只花了 $33\%$。用存储缓冲区给出一个可信的解释：为什么这个效应比 `atomic_fetch_add` 小得多。
::: solution
`volatile` 自增是一次普通的载入和存储。存储进入核心的存储缓冲区，核心继续往下跑；下一次迭代对同一地址的载入直接由存储缓冲区本身满足（存储到载入转发），不需要那行。缓冲的存储只有在核心以 M 持有该行时才写进缓存；每次行到达，核心都能往它倾泻好几条缓冲的存储，然后才再次失去它。于是每次一致性转移被摊到好几次自增上。`lock xadd` 这样的加锁指令没法这样重叠：它执行时必须以 M 拥有该行，而且先排空存储缓冲区，所以只要行移动过，每次自增都要付一整次转移。（这种 volatile 版对线程间共享的计数器当然毫无用处，因为它的自增不是原子的。）
:::
:::

::: exercise 释放-获取链 {level=2}
线程 A 写 `x = 1`（普通变量），然后 `atomic_store_explicit(&f, 1, memory_order_release)`。线程 B 等到 `atomic_load_explicit(&f, memory_order_acquire) == 1`，然后执行 `atomic_store_explicit(&g, 1, memory_order_release)`。线程 C 等到 `atomic_load_explicit(&g, memory_order_acquire) == 1` 然后读 `x`。证明 C 读到 $1$。若 B 对 `g` 的存储改成 `relaxed`，还保证吗？
::: solution
A 写 `x` 在程序次序上先于它对 `f` 的释放存储；该存储与 B 读到 $1$ 的那次获取载入同步；B 的载入先于它对 `g` 的释放存储；该存储与 C 的获取载入同步；那次载入先于 C 读 `x`。happens-before 是传递的（[[#def-memory-order]]），所以 A 写 `x` happens-before C 的读，C 读到 $1$（`x` 没有别的写）。若 B 的存储是宽松的，它就不与 C 的载入同步，B 到 C 就没有 happens-before 边；于是 A 的写与 C 的读无定序——数据竞争，在 C 中是未定义行为。链条的每一环都必须同时有释放和获取。
:::
:::

::: exercise 获取-释放下的存储缓冲 {#ex-sb-acqrel level=3}
线程 $0$ 执行 `x = 1; r0 = y;`，线程 $1$ 执行 `y = 1; r1 = x;`，四次访问都是原子的，`x` 与 `y` 初始为 $0$。用 [[#def-memory-order]] 解释为什么存储用 `memory_order_release`、载入用 `memory_order_acquire` 并不禁止 $r_0 = r_1 = 0$，而 `seq_cst` 禁止。然后在一台 x86 机器上各测一百万轮。
::: solution
*释放-获取。* 释放存储只安排它*之前*的访问；获取载入只安排它*之后*的访问。没有任何东西把线程 $0$ 对 `x` 的存储定序在它随后对 `y` 的载入之前，所以硬件可以先做载入——这正是 x86 存储缓冲区做的事。形式化地说，$r_0 = 0$ 表示线程 $0$ 的载入读到了初始值，即它没有与线程 $1$ 的存储同步；$r_1 = 0$ 同理；没有 happens-before 边连接两个线程，模型允许两次载入都错过两次存储。

*顺序一致性。* 四个 `seq_cst` 操作出现在一个与程序次序一致的全序 $S$ 中。$S$ 中先出现的存储，在 $S$ 中先于两次载入（每次载入都跟随自己线程的存储）；`seq_cst` 载入返回 $S$ 中位于它之前的对该位置的最后一个存储，所以至少有一个载入看到 $1$。

*实验。* 一个协调程序每轮重置 `x` 与 `y`，释放两个线程，等它们结束并统计 $(r_0, r_1)$。在我们的机器上（观测）：

```console
$ ./sb_acqrel            # 释放存储、获取载入
r0=0 r1=0: 473484
r0=0 r1=1: 69206
r0=1 r1=0: 457295
r0=1 r1=1: 15
$ ./sb_sc                # 全程 seq_cst
r0=0 r1=0: 0
r0=0 r1=1: 130512
r0=1 r1=0: 820783
r0=1 r1=1: 48705
```

释放-获取在近一半的轮次里产生了"在 SC 下不可能"的结果；`seq_cst`（GCC 为每个存储发一条 `xchg`）从未产生。这就是 Dekker 式互斥需要顺序一致原子操作或满栅栏的原因。
:::
:::

::: exercise 为什么一致性需要串行化 {level=3}
假设有这样一个监听协议：两个以 S 持有某行的缓存可以*同时*都升级为 M，各自发出一次失效，而对方因为自己正在升级而无视之。构造一个执行，使两个核心永远对同一位置两次写入的次序意见不合，违反 [[#def-coherence]]。[[#thm-mesi]] 证明中的哪一步失效了？
::: solution
设 $X = 0$ 以 S 状态在缓存 0 和 1 中。核心 0 写 $X = 1$、核心 1 同时写 $X = 2$；两者都升级为 M，各自无视对方的失效。现在每个缓存都持有一份脏副本：核心 0 读到 $1$、核心 1 读到 $2$，无限期如此；若第三个核心读 $X$，它的值取决于哪个缓存应答。核心 0 看到"$2$ 然后 $1$"（自己的写在最后），核心 1 看到"$1$ 然后 $2$"：两次写入没有串行化，而且同时有两个写者，违反 SWMR。[[#thm-mesi]] 的证明中，"在 S 中写"那一步依赖总线的原子性：两次 BusUpgr 会被定序，第二次会发现自己那份已被第一次失效，从而变成一次 BusRdX、取得第一个写者的值。真实协议靠在一个单点——总线仲裁器或目录的归属节点——给冲突请求定序，并为落败的请求增加过渡状态，来解决这类竞争。
:::
:::
