下面是四个 OpenMP 程序，它们用 $10^8$ 个子区间的中点公式把 $\pi$ 计算为 $\int_0^1 4/(1 + x^2)\,dx$。它们只在各线程如何把自己的项加进共享变量 `sum` 这一点上有所不同：

```c
#pragma omp parallel for                     /* 1：错误，对 sum 存在数据竞争 */
for (long i = 0; i < N; i++) { double x = (i + 0.5) * h; sum += 4.0 / (1.0 + x * x); }

#pragma omp parallel for                     /* 2：每一项进一次临界区 */
for (long i = 0; i < N; i++) {
    double x = (i + 0.5) * h, f = 4.0 / (1.0 + x * x);
    #pragma omp critical
    sum += f;
}

#pragma omp parallel for                     /* 3：每一项做一次原子加 */
for (long i = 0; i < N; i++) {
    double x = (i + 0.5) * h, f = 4.0 / (1.0 + x * x);
    #pragma omp atomic
    sum += f;
}

#pragma omp parallel for reduction(+ : sum)  /* 4：私有部分和 */
for (long i = 0; i < N; i++) { double x = (i + 0.5) * h; sum += 4.0 / (1.0 + x * x); }
```

在本课程那台 $36$ 核机器上先用 $16$ 个线程、再用一个线程运行（观测值，2026 年）：

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

有竞争的那版很快，但算错了。保护每一次加法的两版是对的，十六个线程跑起来却比一个线程*更慢*——临界区版与顺序循环相比慢了 $44$ 倍。只有归约版既对又快，比单线程快 $14$ 倍。四个循环的每一行都是合法的 OpenMP；差别完全在于线程如何共享数据。

本章讲授共享内存编程：先用 [[operating-systems/threads-locks]] 介绍过的 POSIX 线程，然后用 **OpenMP**——在一台机器上并行化 C、C++ 与 Fortran 程序的标准做法。内容包括 fork–join 模型、并行循环及其迭代的调度、归约及它对结合性的要求、用于不规则与递归并行的任务，以及高效执行任务的**工作窃取**（work stealing）调度器。最后一节说明 Python 为什么干同样的活需要进程而不是线程。锁、条件变量与数据竞争的含义以 [[operating-systems/threads-locks]]、[[operating-systems/synchronisation]] 与 [[programming-languages/concurrency-models]] 为前提。

## 从线程到 OpenMP

共享内存并行的基本模式是 **fork–join**：单个线程派生（fork）出一个线程团队，每个线程执行一部分工作，团队再会合（join），程序才继续往下走。用 POSIX 线程时，一切都要程序员亲自动手——划分迭代空间、把各自的那份交给每个线程、收集结果：

::: example 用 POSIX 线程实现中点公式 {#ex-pthreads}
用 `pthread_create` 与 `pthread_join` 写出这个 $\pi$ 计算：把 $10^9$ 个子区间按连续块分给 $p$ 个线程，比较一个线程与十六个线程。
::: solution
```c
#define _POSIX_C_SOURCE 200809L
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

enum { N = 1000000000, MAXT = 64 };
static int p;                                  /* 线程数 */
static double partial[MAXT];                   /* 每线程一个部分和 */

static void *strip(void *arg) {
    long t = (long)arg, lo = N * t / p, hi = N * (t + 1) / p;
    double h = 1.0 / N, s = 0.0;               /* 寄存器中的本地累加器 */
    for (long i = lo; i < hi; i++) {
        double x = (i + 0.5) * h;
        s += 4.0 / (1.0 + x * x);
    }
    partial[t] = s;                            /* 最后写一次 */
    return NULL;
}

int main(int argc, char *argv[]) {
    p = argc > 1 ? atoi(argv[1]) : 4;
    if (p < 1 || p > MAXT) return 1;
    pthread_t tid[MAXT];
    for (long t = 0; t < p; t++) pthread_create(&tid[t], NULL, strip, (void *)t);
    double sum = 0.0;
    for (long t = 0; t < p; t++) {             /* 按序汇合，再合并 */
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

$16$ 个线程上加速 $13.8$ 倍（我们机器上的观测）。边界 `N * t / p` 把子区间分成大小至多相差 $1$ 的块，即使 $p$ 不整除 $N$ 也一样。每个线程累加进一个局部变量，只写一次自己的部分和；主线程只在汇合线程 $t$ 之后才读 `partial[t]`，而 `pthread_join` 保证该线程写入的一切此后都可见，所以不存在数据竞争。另请注意两个结果的末三位不同——加法发生的次序不同（[[#warn-fp]]）。
:::
:::

这段代码的大部分是记账，在每个程序里都一样。**OpenMP**（*Open Multi-Processing*，1997 年首次标准化）让编译器来写这些。程序员用**制导指令**（directive）给顺序代码加注解——在 C 里就是 `#pragma omp …` 行——编译器把被注解的区域提取成一个函数、创建线程（只创建一次，把它们留在池里供后面的区域使用）并划分工作。不加 `-fopenmp` 时，pragma 被忽略、程序是顺序的，这使 OpenMP 成为渐进式并行化既有代码的好办法。

::: definition OpenMP 执行模型 {#def-openmp}
OpenMP 程序从一个**初始线程**开始。一个 `parallel` 构造派生一个线程**团队**（默认每个逻辑 CPU 一个线程，或由 `OMP_NUM_THREADS` 指定），每个线程都执行该区域的代码；遭遇该构造的线程成为团队中的线程 $0$。区域末尾有一个隐式**屏障**：所有线程等到全队到齐，然后只有初始线程继续。在区域内部：

- **工作共享**构造把工作在团队内划分而不创建线程：`for` 划分循环的迭代，`sections` 让不同线程执行不同的块，`single` 让一个线程执行某个块；除非给出 `nowait`，每个构造都以隐式屏障结束；
- **同步**构造安排线程的次序：`barrier`、`critical`（给一个块套上互斥锁）、`atomic`（对象量的一次不可分割更新）、`taskwait`；
- **数据共享子句**说明一个变量是团队 `shared`（共享）、`private`（私有，每线程各有一份未初始化的副本）、`firstprivate`（用原变量的值初始化的私有副本）还是 `reduction` 变量（归约变量）。

`omp_get_thread_num()` 与 `omp_get_num_threads()` 给出一条线程的编号和团队大小。
:::

默认的数据共享规则引起了大多数 OpenMP 错误。在并行区域*外*声明的变量默认共享；在区域*内*声明的变量以及 `parallel for` 循环的下标是私有的。开头程序的循环 1 里，`sum` 声明在外面，所以是共享的，`sum += …` 就是十六个线程对共享变量不加保护的读-改-写：一次数据竞争，在 C 里属于未定义行为（[[programming-languages/concurrency-models#def-data-race]]）。结果 $0.23$ 并不是 [[operating-systems/threads-locks]] 那种丢失更新的温和版本：编译器有权假设不存在竞争，于是在每个线程里整个循环期间把 `sum` 留在寄存器中、结束时写回一次，最终值便大致是最后写回的那个线程的部分和。在一个构造上写 `default(none)` 会迫使你对每个变量声明其共享属性，从而把这个错误变成编译期错误。

## 并行循环与调度

`for` 工作共享构造要求循环处于**标准形式**——整数或指针下标，其界限与增量对循环不变——以便循环开始时迭代次数已知。迭代必须相互独立：任何迭代都不得写另一迭代读取或写入的位置，除非访问已同步。编译器不检查这一点；断言它成立是程序员的责任。

迭代如何分给各线程，是循环的**调度**（schedule）：

- `schedule(static)`：迭代被分成 $p$ 个大小几乎相等的连续块，每线程一块（`static, c`：以 $c$ 次迭代为一块轮流分发）。事先决定；没有运行期开销。
- `schedule(dynamic, c)`：每个线程空闲时从共享计数器取接下来 $c$ 次迭代（默认 $c = 1$）。适应代价不均的迭代，代价是每块一次原子操作。
- `schedule(guided, c)`：与 dynamic 类似，但每块大小与"剩余迭代数除以 $p$"成正比、一路缩小到 $c$：先是少而大的块，末了是小块。
- `schedule(runtime)`：从环境变量 `OMP_SCHEDULE` 读取，便于做实验。

迭代代价相同时静态调度最好；不同时动态调度最好。动态调度是**表调度**（list scheduling）的一个实例——哪个处理器空闲就从表里取下一件作业——其性能界由罗纳德·格雷厄姆（Ronald Graham）于 1966 年给出。

::: theorem 表调度的格雷厄姆界 {#thm-graham}
设运行时间为 $c_1, \dots, c_m$、总和 $W = \sum_i c_i$、最大者 $c_{\max}$ 的相互独立的作业在 $p$ 个处理器上按任一表调度执行：只要某处理器空闲而仍有作业，它就立即开始下一件。则全部作业完成前的时间满足

$$
T \le \frac{W}{p} + \left(1 - \frac{1}{p}\right) c_{\max} \le 2\,T^*,
$$ {#eq-graham}

其中 $T^* \ge \max(W/p, c_{\max})$ 是最优时间。
:::

::: proof
设 $j$ 是一件最后完成的作业，它在时刻 $s$ 开始，于是 $T = s + c_j$。在时刻 $s$ 之前没有处理器空闲：作业 $j$ 还没开始，所以还有作业剩余，而空闲的处理器本会开始一件。因此在 $[0, s)$ 内全部 $p$ 个处理器都在忙于 $j$ 以外的作业，故 $ps \le W - c_j$。于是

$$
T = s + c_j \le \frac{W - c_j}{p} + c_j = \frac{W}{p} + \left(1 - \frac{1}{p}\right)c_j \le \frac{W}{p} + \left(1 - \frac{1}{p}\right)c_{\max}.
$$

任何调度都至少需要 $W/p$（处理器必须完成全部工作）和至少 $c_{\max}$（一件作业要在一个处理器上跑完），所以两项都不超过 $T^*$，且 $T < 2T^*$。
:::

用于 `schedule(dynamic, c)` 时，"作业"就是一个块：动态调度距完美均衡不超过 $c_{\max}$，即最贵一块的代价——前提是忽略取块的代价，而那正是症结所在。

::: example 调度一个三角循环 {#ex-schedules}
下面的循环里，迭代 $i$ 对逻辑斯谛映射执行 $i$ 步，代价随 $i$ 线性增长。用一个线程计时，再用 $16$ 个线程在五种调度下计时。预测 static 的结果。

```c
static double work(long i) {               /* 代价与 i 成正比 */
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

**对 static 的预测。** 线程 $15$ 拿到最后一块 $i = 37{,}500, \dots, 39{,}999$，总代价 $2500 \times (37{,}500 + 39{,}999)/2 \approx 9.69 \times 10^7$ 步，占总数 $N(N - 1)/2 \approx 8.00 \times 10^8$ 步的 $12.1\%$，而公平份额是 $1/16 = 6.25\%$。所有人都在等线程 $15$，于是我们预测 $0.121 \times 2.767 \approx 0.335$ s，与实测的 $0.356$ s 很接近。一般而言，对代价线性增长的循环，$p$ 块中最后一块占总工作量的 $(2p - 1)/p^2$，所以按块 static 调度比完美均衡慢 $2 - 1/p$ 倍（见下图）。

其余调度都落在理想值 $2.767/16 = 0.173$ s 的 $6\%$ 以内。`static,1` 轮流分发迭代，每个线程得到廉价与昂贵迭代的混合——一种恰好适应这种代价模式的静态调度。dynamic 与 guided 调度适应任何模式，正如 [[#thm-graham]] 所保证的。
:::
:::

::: widget plot
f: 2 - 1/x; 1
x: 1, 64
y: 0, 2.2
labels: \text{按块的 static：} T_p \text{ / 理想值}; \text{完美均衡}
points: 16,2.06
caption: 迭代 $i$ 的耗时与 $i$ 成正比的循环上，按块 static 调度的代价：最后一个线程的块占总工作量的 $(2p-1)/p^2$，于是循环耗时是完美均衡时的 $2 - 1/p$ 倍。圆点是 [[#ex-schedules]] 的实测（$0.356$ s 对比理想的 $0.173$ s）。注意惩罚逼近 $2$ 有多快——负载不均不会随线程增多而消失，反而恶化。
:::

动态调度的代价在迭代极小时显现出来。$\pi$ 循环的每次迭代只要几纳秒，用 $16$ 个线程：

```console
$ for s in static dynamic dynamic,1000 guided; do
>   printf "%-13s" $s; OMP_NUM_THREADS=16 OMP_SCHEDULE=$s ./tiny; done
static       0.033 s  (pi 3.1415926536)
dynamic      3.961 s  (pi 3.1415926536)
dynamic,1000 0.033 s  (pi 3.1415926536)
guided       0.034 s  (pi 3.1415926536)
```

块大小为 $1$ 次迭代时，每次迭代都要对一个十六个核心共享的计数器做一次原子自增，而存放计数器的缓存行每次自增都在核心之间迁移（[[parallel-computing/memory-consistency]]）：循环慢到 $120$ 倍。$1000$ 次迭代一块把代价完全摊平了。选块要大到取块的代价远低于执行它的代价，又小到使 [[#eq-graham]] 中的 $c_{\max}$ 相比 $W/p$ 微不足道。

::: quiz
在 `#pragma omp parallel for` 后接 `for (i = 0; i < n; i++) { t = a[i] * 2; b[i] = t + c; }` 的循环中，`int t, c;` 声明在循环之前，哪些说法正确？
- [x] `t` 默认共享，所以循环存在数据竞争；它应当声明在循环体内，或列进 `private(t)`。
- [x] `c` 只被读取，共享它是安全的。
- [ ] `i` 默认共享，所以线程会在更新它时互相干扰。
- [ ] 加上 `schedule(dynamic)` 就能消除 `t` 上的竞争。
::: solution
在并行区域之前声明的变量，除非有子句另行规定，否则共享，所以所有线程写的是同一个 `t`，一个线程可能在另一个线程赋值与使用之间改写它的 `t`。把 `int t` 声明在循环体内就自动成为私有。对不改变的共享变量（如 `c`）的并发读不是竞争。`parallel for` 循环的下标按规则是私有的。调度改变的是哪个线程跑哪次迭代，不改变变量的共享属性。
:::
:::

## 归约

**归约**（reduction）用一个二元算子把许多值合并为一个：和、积、最大值、逻辑"与"。`reduction(+ : sum)` 子句给每个线程一份初始化为算子单位元（对 $+$ 是 $0$）的 `sum` 私有副本，让每个线程把它的迭代累加进自己的副本，循环结束时再把各副本合并回原变量。这正是编译器写出来的 [[#ex-pthreads]] 的 pthreads 程序。这个变换什么时候是正确的？

::: theorem 归约需要结合律 {#thm-reduction}
设 $\oplus$ 是集合 $M$ 上带单位元 $e$ 的结合运算（即 $(M, \oplus, e)$ 是一个**幺半群**）。把序列 $x_1, \dots, x_n$ 划分成连续块 $B_1, \dots, B_p$（某些块可能为空），设 $s_k$ 是 $B_k$ 中元素按序的 $\oplus$ 组合（空块取 $e$）。则

$$
s_1 \oplus s_2 \oplus \dots \oplus s_p = x_1 \oplus x_2 \oplus \dots \oplus x_n,
$$

其中右端像顺序循环那样从左到右求值。若 $\oplus$ 还是可交换的，那么把元素任意分配给 $p$ 个部分结果、再按任意次序合并部分结果，结论同样成立。
:::

::: proof
由结合律，同一元素序列、同一顺序的任何两种加括号方式取值相同；这就是**广义结合律**，对长度 $n$ 归纳可证。$n \le 2$ 时只有一种加括号方式。$n \ge 3$ 时，每种加括号方式都形如 $L \oplus R$，其中 $L$ 对某个 $k$ 的 $x_1, \dots, x_k$ 加括号、$R$ 对 $x_{k+1}, \dots, x_n$ 加括号。由归纳假设，$L$ 等于 $x_1, \dots, x_k$ 的从左到右组合 $\ell_k$，而 $R$ 等于 $x_{k+1} \oplus r$，其中 $r$ 是其余元素的从左到右组合（当 $k + 1 < n$；否则 $R = x_n$）。于是 $L \oplus R = \ell_k \oplus (x_{k+1} \oplus r) = (\ell_k \oplus x_{k+1}) \oplus r = \ell_{k+1} \oplus r$，这是左部更长的加括号方式；反复进行，就到达从左到右的组合。按块分解 $s_1 \oplus \dots \oplus s_p$ 是一种加括号方式（空块贡献 $e$，不改变任何东西），所以它等于顺序结果。

再加上交换律，元素的任何重排都给出同样的值，因为相邻对换的乘积可以到达任何次序，而加括号方式内的每次对换 $a \oplus b = b \oplus a$ 都保持值不变。所以把元素任意分配给部分结果、再按任意次序组合，结果都相同。
:::

OpenMP 不规定部分结果按什么次序合并，也不规定（多数调度下）每个线程分到哪些迭代，所以归约算子必须既结合又可交换。和、积、`min`、`max`、`&&`、`||`、位运算与集合并都合格；减法不合格（OpenMP 的 `reduction(- : x)` 实际上做的是加法），字符串拼接也不合格——它结合但不可交换。数组可以逐元素归约：`reduction(+ : hist[:256])` 给每个线程一份私有直方图（[[#ex-histogram]]）。用户定义的归约（`declare reduction`）把该子句扩展到别的幺半群。在 [[parallel-computing/parallel-algorithms]] 中，同一个定理为树形归约和前缀和提供依据。

::: warning 浮点归约不可复现 {#warn-fp}
浮点加法可交换但**不结合**：$(10^{20} + (-10^{20})) + 1 = 1$，而 $10^{20} + ((-10^{20}) + 1) = 0$，因为 $-10^{20} + 1$ 舍入为 $-10^{20}$（[[computer-systems/floating-point]]）。于是 [[#thm-reduction]] 并不适用，并行的浮点求和取决于各项如何分组——取决于线程数和调度：

```console
$ for p in 1 2 4 8 16 32 36; do OMP_NUM_THREADS=$p ./pi_omp; done   # 10^9 个子区间
p= 1  pi = 3.141592653589971  4.343 s
p= 2  pi = 3.141592653589901  2.260 s
p= 4  pi = 3.141592653589821  1.289 s
p= 8  pi = 3.141592653589769  0.644 s
p=16  pi = 3.141592653589833  0.322 s
p=32  pi = 3.141592653589757  0.162 s
p=36  pi = 3.141592653589822  0.152 s
```

真值是 $3.14159265358979\ldots$；每个结果的末几位都不对，而并行版并不更差——分块求和往往比一条长长的顺序累加*更准*，后者的舍入误差会积累。但它们彼此不同，这会破坏逐位比对的回归测试，还让缺陷难以复现。若需要可复现的结果，就固定线程数并使用静态调度（OpenMP 标准随之保证迭代分配相同，但不保证合并次序），或按固定的树求和，或采用补偿累加或精确累加。
:::

## 任务

循环覆盖的是规则并行。递归算法——分治、树遍历、图搜索——需要**任务**（task）：动态创建、由空闲线程执行的单位工作。OpenMP 3.0（2008）加入了任务。

::: definition OpenMP 任务 {#def-task}
一个 `task` 构造创建一个**任务**：被 encompass 的块连同它的数据环境（变量若在外层上下文中不是 `shared`，默认就是 `firstprivate`）。任务可以立即执行，也可以推迟、由团队中任何线程稍后执行。`taskwait` 挂起当前任务，直到它迄今创建的所有子任务全部完成。带 `if(false)` 子句的 `task` 由创建它的线程立即执行。任务通常由一个线程（`single`）在 `parallel` 区域内创建，团队的其他线程则在区域的屏障处等待，并随任务的出现而执行任务。
:::

就工作量-跨度模型（[[parallel-computing/performance-laws#def-work-span]]）而言，一个 `task` 是一次*派生*（spawn），一个 `taskwait` 是一次*同步*（sync），所以我们可以完全像那一章一样分析任务程序。

::: example 带截断阈值的任务版斐波那契 {#ex-fib-tasks}
用 OpenMP 任务实现 [[parallel-computing/performance-laws#ex-fib]] 的并行斐波那契函数。在**截断阈值** $n < c$ 以下不调用任务，改调一个顺序版本。实测 $c$ 的影响。
::: solution
```c
static int cutoff;

static long fib_seq(int n) { return n < 2 ? n : fib_seq(n - 1) + fib_seq(n - 2); }

static long fib(int n) {
    if (n < cutoff) return fib_seq(n);       /* 小规模：不创建任务 */
    long a, b;
    #pragma omp task shared(a)               /* 子任务计算 fib(n-1) */
    a = fib(n - 1);
    b = fib(n - 2);                          /* 本任务计算 fib(n-2) */
    #pragma omp taskwait                     /* 汇合：等待子任务 */
    return a + b;
}
...
    #pragma omp parallel
    #pragma omp single                       /* 由一个线程启动递归 */
    r = fib(n);
```

`a` 在任务中必须声明为 `shared`；否则子任务会把值写进自己的私有副本，父任务读到的就是未初始化的变量。我们机器上的观测：

```console
$ OMP_NUM_THREADS=1 ./fib 35 2;  OMP_NUM_THREADS=32 ./fib 35 2
p= 1 cutoff= 2  fib(35) = 9227465  1.345 s
p=32 cutoff= 2  fib(35) = 9227465  36.405 s
$ OMP_NUM_THREADS=1 ./fib 45 100                     # 从不创建任务
p= 1 cutoff=100  fib(45) = 1134903170  2.491 s
$ for c in 20 25 30 35; do OMP_NUM_THREADS=32 ./fib 45 $c; done
p=32 cutoff=20  fib(45) = 1134903170  0.727 s
p=32 cutoff=25  fib(45) = 1134903170  0.189 s
p=32 cutoff=30  fib(45) = 1134903170  0.193 s
p=32 cutoff=35  fib(45) = 1134903170  0.175 s
```

不设截断阈值（$c = 2$）时，几乎每次调用都创建一个任务，每个任务只干几纳秒的活，创建、入队、出队却要几百纳秒。$32$ 个线程反而比单线程*慢 $27$ 倍*：GCC 的 OpenMP 运行时（libgomp）把团队的任务放在一把锁保护的共享队列里，$32$ 个线程争抢它便彻底串行化了。$c$ 取 $25$ 到 $35$ 时，程序创建 $232$ 到 $28{,}656$ 个任务，每个至少做几微秒的活，$32$ 个线程比纯顺序的 $2.491$ s 快约 $13$ 到 $14$ 倍。任务 DAG 的并行度依然巨大（[[parallel-computing/performance-laws#ex-fib]]）；如今限制加速比的，是剩余任务操作的代价、$32$ 核活跃时的降频，以及机器上的其他作业。
:::
:::

::: widget graph
nodes: f5@3,4; f4@1.5,3; f3a@4.5,3; f3b@0.5,2; f2a@2.5,2; f2b@3.8,2; f1a@5.2,2; f2c@0,1; f1b@1,1; f1c@2,1; f0a@3,1; f1d@3.5,1; f0b@4.2,1; f1e@-0.5,0; f0c@0.5,0
edges: f5>f4; f5>f3a; f4>f3b; f4>f2a; f3a>f2b; f3a>f1a; f3b>f2c; f3b>f1b; f2a>f1c; f2a>f0a; f2b>f1d; f2b>f0b; f2c>f1e; f2c>f0c
algorithm: dfs
start: f5
caption: 不设截断阈值时 $\mathrm{fib}(5)$ 的调用树：每个节点是一次调用，每个 $n \ge 2$ 的调用把左孩子作为任务派生出去、右孩子自己算。逐步执行深度优先搜索——那正是*一个*线程执行这些调用的顺序。注意树有 $15$ 个节点却只有 $5$ 层：工作量按 $\varphi^n$ 增长，跨度按 $n$ 增长。截断阈值 $c$ 把每个以 $n < c$ 为根的子树换成一次顺序调用，几乎删掉全部节点，同时保留对并行要紧的那些层。
:::

### 工作窃取

运行时应当如何执行任务？一个共享队列（如上面的实验）虽简单，却会成为瓶颈。主流设计是每个线程拥有自己的队列，只在某个线程无活可干时才搬运工作。

::: algorithm 工作窃取 {#alg-work-stealing}
$p$ 个工作线程中的每一个都拥有一个存放就绪任务的**双端队列**（deque）。

1. 工作线程派生一个任务时，把它压入自己队列的*底端*（在 Cilk 使用的 work-first 变体中，压入的是当前任务的*续延*，而子任务立即开始执行）。
2. 工作线程做完当前任务时，从自己队列的*底端*弹出下一个任务——最近派生的那个，所以局部执行次序与顺序程序相同。
3. 一个工作线程的队列空了，它就成为**窃取者**：均匀随机地挑另一个工作线程，试图窃取那个线程队列*顶端*的任务——最老的那个，而在分治计算中它通常也是最大的一块工作。反复尝试，直到成功或计算结束。
:::

拥有者与窃取者在相反的两端操作，很少发生冲突：通常情况下拥有者的压入弹出根本不用锁，只有窃取、或弹出最后一个任务时，才需要一次原子的 compare-and-swap（蔡斯-莱夫双端队列，2005，是标准的无锁实现；compare-and-swap 见 [[parallel-computing/concurrent-data-structures]]）。所有工作线程都有活干时，完全没有通信。窃取最老的任务搬动的是大块工作，所以窃取很少发生。

::: theorem 工作窃取是高效的（布卢莫夫与莱瑟森，1999） {#thm-work-stealing}
对完全严格的计算（每个任务的子任务都与它会合，如 fork–join 程序），设工作量 $T_1$、跨度 $T_\infty$，$p$ 个处理器上随机化的工作窃取调度器的期望运行时间为

$$
\E[T_p] = \frac{T_1}{p} + O(T_\infty),
$$

期望执行 $O(p\,T_\infty)$ 次窃取尝试，且使用的栈空间至多为顺序执行的 $p$ 倍。
:::

::: remark 定理由为何成立
这里不复现证明——它写在布卢莫夫与莱瑟森的论文以及赫尔利（Herlihy）与沙维特（Shavit）的书中；这里给出证明的结构。每一步，每个处理器要么做一个任务、要么尝试一次窃取。工作步总共 $T_1$ 个，给时间贡献 $T_1/p$。证明界住了窃取尝试的次数：给每个就绪任务赋一个势，它随任务在 DAG 中的深度按几何级数下降；再证明一个队列顶端的任务携带该队列总势的一个常数比例，而任意 $p$ 次连续的随机窃取尝试会以常数概率命中各队列的顶端，消去总势的一个常数比例。由于初始势对 $T_\infty$ 呈指数，期望 $O(p\,T_\infty)$ 次窃取尝试就够了，给时间贡献 $O(T_\infty)$。这一结果与布伦特界（[[parallel-computing/performance-laws#thm-brent]]）至多在 $T_\infty$ 项的常数因子上有别，而且用的是完全去中心化的调度器。
:::

工作窃取是 Cilk 与 OpenCilk、Intel 的 oneTBB、Java 的 `ForkJoinPool`（因而还有并行流）、.NET 的任务库、Rust 的 Rayon 以及 Go 的 goroutine 调度器采用的调度方式（均为 2026 年的情形）。LLVM 的 OpenMP 运行时用每线程任务队列加窃取；libgomp 如我们所见用的是共享队列——无论用什么运行时都应设置截断阈值，这是原因之一。

## Python 中的进程

标准 Python 实现 CPython 有一把**全局解释器锁**（GIL）：同一时刻只有一个线程执行 Python 字节码。线程对在等待输入输出的程序仍有帮助——线程等待时锁是放开的——却不能加速 Python 代码里的计算。标准的变通办法是使用进程：每个进程有自己的解释器和自己的锁，通过管道把参数与结果 pickle 序列化来通信。

::: example 分别用线程与进程统计素数 {#ex-python}
用试除法统计 $2 \times 10^6$ 以内的素数个数，划分成 $64$ 个等长区间，分别用顺序、$8$ 线程、$8$ 进程与 $32$ 进程实现。
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

def chunks(n, k):                       # 把 [0, n) 等宽分成 k 段
    step = n // k
    return [(i * step, n if i == k - 1 else (i + 1) * step) for i in range(k)]

if __name__ == "__main__":
    N, K = 2_000_000, 64                # 64 段：段数多于工作进程数
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

（启用 GIL 的 Python 3.14，默认构建；我们机器上的观测。）八个线程不比一个快：它们轮流攥着 GIL。八个进程快 $6.0$ 倍，三十二个进程快 $19.6$ 倍。各区间代价并不相等——对素数 $n$ 做试除法约花 $\sqrt{n}$ 的时间——所以分成 $64$ 段而不是 $p$ 段、让 `map` 随工作进程空闲而逐段分发，正是表调度（[[#thm-graham]]）。`if __name__ == "__main__"` 保护是必需的：在靠启动全新解释器来创建工作进程的平台上，每个工作进程都会导入主模块，没有保护的话它自己又会开一个进程池。
:::
:::

进程比线程更贵：每个都需要自己的解释器，每个参数和结果都要拷贝。在 Python 里并行要么取粗粒度——每个任务几秒的工作量——要么把内层循环移进编译代码（NumPy 和许多原生库在计算时会释放 GIL）。Python 3.13 引入了可选的、无 GIL 的**自由线程**（free-threaded）构建（PEP 703，2024），自 3.14 起获得官方支持但并非默认（2026 年）；在其中线程可以真正并行地执行 Python 代码，本章的每一种竞争在 Python 里也都变得可能。

::: history
20 世纪 80 年代，共享内存多处理器用各家厂商自带的线程库和编译制导编程，彼此互不相同。POSIX 线程于 1995 年标准化（IEEE 1003.1c）。由硬件与编译器厂商组成的 OpenMP 架构评审委员会于 1997 年发布 Fortran 的 OpenMP 1.0，1998 年发布 C 与 C++ 版；任务随 OpenMP 3.0（2008）到来，SIMD 与加速器制导随 4.0（2013）到来，OpenMP 6.0 于 2024 年发布。罗纳德·格雷厄姆（Ronald Graham）的表调度界可追溯到 1966 年。工作窃取曾用于伯顿（Burton）与斯利普（Sleep）关于函数式语言的工作（1981）以及罗伯特·霍尔斯特德（Robert Halstead）的 Multilisp（1984）；罗伯特·布卢莫夫（Robert Blumofe）与查尔斯·莱瑟森（Charles Leiserson）证明了它的高效性（FOCS 1994，*Journal of the ACM* 1999），他们的 Cilk 语言（MIT，1995）使其走向实用，随后有 Intel 的 Threading Building Blocks（2006）、Java 的 fork/join 框架（Doug Lea，2000；2011 年进入 Java 7）与 Cilk Plus。戴维·蔡斯（David Chase）与约西·莱夫（Yossi Lev）于 2005 年发表了他们的无锁工作窃取双端队列。Python 的 `multiprocessing` 模块（PEP 371）随 Python 2.6（2008）进入标准库。
:::

## 后续内容

[[#thm-reduction]] 的归约将变成 [[parallel-computing/parallel-algorithms]] 中的树形归约与前缀和，那章还设计并行排序与图算法，其 DAG 给工作窃取留足并行度。开头慢得离奇的 `critical`、`atomic` 循环，以及块大小为 $1$ 的动态调度，它们慢的原因本章没有解释：存放共享变量的缓存行每次更新都必须在核心之间迁移。[[parallel-computing/memory-consistency]] 解释缓存一致性、伪共享与内存序，[[parallel-computing/concurrent-data-structures]] 则构造可扩展的共享数据结构。OpenMP 的 `simd` 制导及其指向的向量单元见 [[parallel-computing/performance-engineering]]。

::: summary
- 共享内存程序遵循 **fork–join** 模式；POSIX 线程要程序员亲手划分工作、合并结果（[[#ex-pthreads]]），**OpenMP** 制导让编译器代劳（[[#def-openmp]]）。
- 在并行区域外声明的变量默认**共享**；对共享变量不加保护的更新是数据竞争，属未定义行为——在我们的实验里 $\pi = 0.23$。用 `default(none)` 强制明示共享属性。
- 循环**调度**：迭代均匀用 `static`，不均匀用 `dynamic`/`guided`。动态调度就是表调度，距完美均衡不超过 $c_{\max}$（**格雷厄姆界**，[[#thm-graham]]）；按块 static 调度在三角循环上比理想慢 $2.06$ 倍（[[#ex-schedules]]），而块大小取 $1$ 使细粒度循环慢了 $120$ 倍。
- 对带单位元的可交换结合算子，**归约**是正确的（[[#thm-reduction]]）；私有部分和比 `critical`、`atomic` 更新快几个数量级。浮点归约在不同线程数下不可复现。
- **任务**表达递归并行；**截断阈值**必不可少——没有它，细粒度任务使斐波那契在 $32$ 个线程上比单线程慢 $27$ 倍（[[#ex-fib-tasks]]）。
- **工作窃取**——每线程一个双端队列，拥有者在底端，随机窃取者在顶端——期望运行时间 $T_1/p + O(T_\infty)$（[[#thm-work-stealing]]）。
- 在 CPython 里 GIL 使线程无法并行执行 Python 代码；用 `multiprocessing` 配粗粒度任务（[[#ex-python]]）。
:::

## 习题

::: exercise 哪些迭代归谁？ {level=1 check="375"}
一个 $1000$ 次迭代的循环（$i = 0, \dots, 999$）在 `schedule(static)` 下用 $8$ 个线程运行，实现把迭代分成 $\lceil 1000/8 \rceil$ 大小的块。线程 $3$（线程从 $0$ 开始编号）最先执行的是哪个迭代？（填入 $i$。）在 `schedule(static, 10)` 下，哪个线程执行迭代 $i = 255$？
::: solution
块大小 $125$：线程 $0$ 得 $0$–$124$，线程 $1$ 得 $125$–$249$，线程 $2$ 得 $250$–$374$，线程 $3$ 得 $375$–$499$。答案是 $375$。`static, 10` 下，$10$ 次一块轮流分发：迭代 $255$ 在第 $\lfloor 255/10 \rfloor = 25$ 块里，这一组分给线程 $25 \bmod 8 = 1$。
:::
:::

::: exercise 数任务 {level=1 check="4"}
[[#ex-fib-tasks]] 的 `fib` 以 `cutoff = 8` 被 `fib(10)` 调用。它创建多少个任务？（填入数目。）
::: solution
每个 $n \ge 8$ 的调用恰创建一个任务（为 `fib(n-1)`）；$n < 8$ 的调用不创建。满足 $n \ge 8$ 的调用有：`fib(10)`；它的两个孩子 `fib(9)` 和 `fib(8)`；以及 `fib(9)` 的孩子 `fib(8)` 和 `fib(7)`——其中只有 `fib(8)` 计入。所以 $n \ge 8$ 的调用是 `fib(10)`、`fib(9)`、`fib(8)`、`fib(8)`：共 $4$ 个任务。一般而言，参数不小于 $c$ 的调用数按 $\varphi^{n - c}$ 增长，所以截断阈值每加 $1$，任务数大约除以 $1.6$。
:::
:::

::: exercise 给变量分类 {level=1}
在下面的区域中，对 `a`、`n`、`i`、`t`、`best` 和 `tmp` 逐个判断是共享还是私有、是否存在数据竞争，并说明如何修复竞争。

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
`a`、`n`、`best` 和 `tmp` 声明在区域外，所以是共享的；`i`（循环下标）和 `t`（在内部声明）是私有的。`a` 与 `n` 只被读：无竞争。`tmp` 被所有线程写：竞争——把它声明在循环内或加上 `private(tmp)`。`best` 被所有线程读又写：竞争，还是那个经典的先检查后行动（check-then-act）错误（两个线程可能都看到 `tmp > best`，而较小的值可能最后被写入）。用 `reduction(max : best)` 修复，它自 OpenMP 3.1 起可用于 C：给每个线程一个私有最大值（初始化为可表示的最小值），结束时再合并。
:::
:::

::: exercise 静态调度的代价 {level=2 check="15/8"}
某循环迭代 $i$ 的耗时与 $i$ 成正比，$i = 0, \dots, N - 1$ 且 $N$ 很大。在 $p = 8$ 个线程的按块静态调度下，循环比完美负载均衡慢多少倍？（填入倍数，忽略 $1/N$ 量级的项。）
::: solution
最后一块覆盖 $i \in [7N/8, N)$，总代价约 $\frac{1}{2}(N^2 - (7N/8)^2) = \frac{N^2}{2}\cdot\frac{15}{64}$。完美均衡下每个线程得 $\frac{N^2}{2}\cdot\frac{1}{8}$。比值为 $\frac{15/64}{1/8} = \frac{15}{8} = 1.875$，即 $p = 8$ 时的 $2 - 1/p$，与 [[#ex-schedules]] 的图一致。
:::
:::

::: exercise 有竞争的和为什么是 0.23 {level=2}
在开头实验中，有竞争的循环用 $16$ 个线程打出 $\pi \approx 0.2316$。假设每个线程把运行和留在寄存器里、只在块结束时向 `sum` 写回一次，定量解释这个值。必须是哪个线程最后写的？
::: solution
若每个线程开始时载入 `sum`（$0$），在寄存器中累加自己块的项、结束时写回，则最终值就是最后写回的那个线程的部分和（再乘 $h$）。线程 $t$ 的块覆盖 $x \in [t/16, (t+1)/16)$，它对积分的贡献是 $\int_{t/16}^{(t+1)/16} \frac{4}{1+x^2}\,dx = 4(\arctan\frac{t+1}{16} - \arctan\frac{t}{16})$。$t = 15$ 时为 $4(\arctan 1 - \arctan 0.9375) = 4(0.785398 - 0.753151) \approx 0.1290$；$t = 0$ 时为 $4\arctan 0.0625 \approx 0.2497$；$t = 1$ 时为 $4(\arctan 0.125 - \arctan 0.0625) \approx 0.2477$。实测的 $0.2316$ 与 $t = 4$ 吻合：$4(\arctan 0.3125 - \arctan 0.25) = 4(0.302885 - 0.244979) \approx 0.2316$。所以最后写回的是线程 $4$。其他运行会给出别的值。编译器正是有资格做这个变换的，因为数据竞争是未定义行为：它可以假设没有别的线程碰 `sum`。
:::
:::

::: exercise 并行直方图 {#ex-histogram level=2}
写一个 OpenMP 程序，把整数 $0, \dots, 2 \times 10^8 - 1$ 哈希到 $256$ 个桶里（用 $i \times \texttt{0x9E3779B97F4A7C15}$ 的最高 $8$ 位），统计每个桶中的整数个数。使用数组归约。校验总数，并在 $16$ 个线程上测加速比。为什么对每次自增加 `#pragma omp atomic` 是个糟糕的替代方案？
::: solution
```c
#include <omp.h>
#include <stdio.h>

enum { N = 200000000, B = 256 };

int main(void) {
    static long hist[B];
    double t0 = omp_get_wtime();
    #pragma omp parallel for reduction(+ : hist[:B])   /* 每线程一份私有副本 */
    for (long i = 0; i < N; i++) {
        unsigned long h = (unsigned long)i * 0x9E3779B97F4A7C15UL;  /* i 的一个哈希 */
        hist[h >> 56]++;                                 /* 最高 8 位：桶号 */
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

总数是对的，各桶几乎恰好相等（$2 \times 10^8 / 256 = 781{,}250$），加速比约 $8.6$（一次观测；循环很短，线程启动和最后合并 $16$ 份直方图的开销并非可以忽略）。若对一张共享直方图做 `atomic` 自增，每次自增都是对与其他线程共享的缓存行做原子读-改-写；$256$ 个 $8$ 字节的桶只占 $32$ 条缓存行，核心们会不停地争抢——就像那个比单线程还慢的 `atomic` $\pi$ 循环。私有直方图只在每线程每桶最后触碰一次共享内存。
:::
:::

::: exercise 并行归并排序 {level=3}
用 OpenMP 任务并行化归并排序：两半并行排序，然后顺序归并。$32$ 个元素以下用插入排序，且只为至少 $10^5$ 个元素的子数组创建任务（`task if(...)`）。用 $1$ 到 $32$ 个线程对 $5 \times 10^7$ 个随机整数排序。计算该算法的工作量与跨度，并解释你观察到的加速比。
::: solution
```c
enum { SMALL = 32, TASK_CUTOFF = 100000 };

static void merge(const int *a, long n1, long n2, int *tmp) {
    long i = 0, j = n1, k = 0;
    while (i < n1 && j < n1 + n2) tmp[k++] = a[i] <= a[j] ? a[i++] : a[j++];
    while (i < n1) tmp[k++] = a[i++];
    while (j < n1 + n2) tmp[k++] = a[j++];
}

static void msort(int *a, long n, int *tmp) {     /* 用 tmp[0..n) 对 a[0..n) 排序 */
    if (n < SMALL) {                               /* 超小规模：插入排序 */
        for (long i = 1; i < n; i++) {
            int v = a[i]; long j = i;
            while (j > 0 && a[j - 1] > v) { a[j] = a[j - 1]; j--; }
            a[j] = v;
        }
        return;
    }
    long h = n / 2;
    #pragma omp task if (n >= TASK_CUTOFF)         /* 阈值以下：立即执行 */
    msort(a, h, tmp);
    msort(a + h, n - h, tmp + h);
    #pragma omp taskwait
    merge(a, h, n - h, tmp);                       /* 顺序归并：跨度 Theta(n) */
    memcpy(a, tmp, n * sizeof *a);
}
```

主程序用线性同余发生器填数组，在 `parallel` 与 `single` 内调用 `msort`，并检查结果已排好序。我们机器上的观测：

```console
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./msort; done
p= 1  n=50000000  sorted in 6.689 s
p= 2  n=50000000  sorted in 3.619 s
p= 4  n=50000000  sorted in 3.183 s
p= 8  n=50000000  sorted in 2.008 s
p=16  n=50000000  sorted in 1.596 s
p=32  n=50000000  sorted in 1.272 s
```

**分析。** 工作量就是顺序归并排序的工作量，$T_1(n) = 2T_1(n/2) + \Theta(n) = \Theta(n \log n)$。两半并行排序，归并却不并行，所以 $T_\infty(n) = T_\infty(n/2) + \Theta(n) = \Theta(n)$——由最后一次对全部 $n$ 个元素的归并与拷贝主导。并行度为 $\Theta(\log n)$。更具体地，若归并并拷贝 $m$ 个元素花费 $cm$，则插入排序之上共 $\log_2(n/32) \approx 20.6$ 层中每层总共约花费 $cn$，故 $T_1 \approx 20.6\,cn$；而跨度为 $c(n + n/2 + n/4 + \dots) \approx 2cn$：并行度只有约 $10$。实测 $32$ 个线程上加速 $5.3$ 倍与此相合：仅最后一次 $5 \times 10^7$ 个元素的归并，无论 $p$ 是多少就要几百毫秒。布伦特定理预言 $p$ 一旦超过并行度，加速比便进入平台期。要更好，归并本身必须并行：[[parallel-computing/parallel-algorithms]] 给出跨度为 $O(\log^2 n)$ 的并行归并，把并行度提升到 $\Theta(n/\log n)$。
:::
:::

::: exercise 引导调度 {level=3}
在 $p$ 个线程的 `schedule(guided)` 下，设每块大小为 $\lceil R/p \rceil$，其中 $R$ 是取块时的剩余迭代数（最小块大小为 $1$）。证明 $N$ 次迭代的循环的总块数不超过约 $p\ln(N/p) + p$，并与 `dynamic, c` 的 $N/c$ 比较。为什么引导调度在循环临近结束时仍均衡得很好？
::: solution
每块至少消去 $R/p$ 次迭代，所以取走一块后剩余至多为 $R(1 - 1/p)$。$k$ 块之后，$R_k \le N(1 - 1/p)^k \le N e^{-k/p}$（用到 $1 - x \le e^{-x}$）。一旦 $R_k \le p$，其余每块大小都是 $1$，至多 $p$ 块。$N e^{-k/p} \le p$、即 $k \ge p\ln(N/p)$ 时就有 $R_k \le p$。所以块数至多约 $p\ln(N/p) + p$——$N = 10^6$、$p = 16$ 时约 $16 \times 11.0 + 16 \approx 193$，而 `dynamic, 1` 是 $10^6$——取块的开销可以忽略。循环临近结束时块很小（大小约 $R/p$，一路降到 $1$），所以按 [[#thm-graham]] 的论证，最后完成的块很短，各线程几乎同时收尾。不过当*早期*迭代恰恰昂贵时，引导调度仍会出乱子：第一块 $N/p$ 次迭代那时可能承载远超 $1/p$ 的工作量。
:::
:::
