计算一个数组的累计和——**前缀和** $y_i = x_0 + x_1 + \dots + x_i$——看上去像是最顺序的计算：每个累计和都是上一个加上一个元素。可是下面这个 OpenMP 函数能并行计算 $4 \times 10^8$ 个数的前缀和，而且答案与那条显而易见的循环完全一致：

```c
/* 三阶段就地计算 x[0..n) 的包含前缀和。 */
static void scan(long *x, long n) {
    int p = omp_get_max_threads();
    long *block = calloc(p + 1, sizeof *block);   /* block[t+1]：第 t 块之和 */
    #pragma omp parallel
    {
        int t = omp_get_thread_num();
        long lo = n * t / p, hi = n * (t + 1) / p, s = 0;
        for (long i = lo; i < hi; i++) s += x[i];      /* 1：各块求和 */
        block[t + 1] = s;
        #pragma omp barrier
        #pragma omp single
        for (int u = 1; u <= p; u++) block[u] += block[u - 1];  /* 2：扫描 p 个部分和 */
        s = block[t];                                   /*（上方有隐式屏障）*/
        for (long i = lo; i < hi; i++) x[i] = s += x[i];   /* 3：带偏移重扫 */
    }
    free(block);
}
```

```console
$ gcc -std=c17 -Wall -Wextra -O2 -fopenmp -o scan scan.c
$ ./scanseq                                    # 那条显而易见的顺序循环
sequential 0.447 s (1199999997)
$ for p in 1 2 4 8 16 32; do OMP_NUM_THREADS=$p ./scan; done
p= 1  0.948 s  correct
p= 2  0.628 s  correct
p= 4  0.255 s  correct
p= 8  0.152 s  correct
p=16  0.116 s  correct
p=32  0.112 s  correct
```

（本课程那台 $36$ 核机器上的观测，2026 年。）有两点值得注意。并行算法做的工作约是顺序算法的两倍——数组要读两遍——所以单线程时它慢一倍，$32$ 个线程时比单线程快 $8.5$ 倍、却只比顺序循环快 $4$ 倍。而且它在约 $16$ 个线程后就不再改善，因为和 [[parallel-computing/parallel-architectures]] 里的那个数组求和一样，它受存储器带宽限制。使它能并行的诀窍是结合律：前 $i$ 个元素之和可以按任何方式加括号（[[parallel-computing/shared-memory#thm-reduction]]）。

本章在 [[parallel-computing/performance-laws]] 的**工作量-跨度模型**中设计并行算法，目标是让工作量尽量贴近最佳顺序算法，同时把跨度——关键路径——做小，最好是多对数级。我们会遇到经典的 **PRAM** 模型，以及两个最重要的并行原语：**归约**与**扫描**（前缀和），并给出正确性证明与代价；扫描用于过滤、划分与排序；并行归并与归并排序；**排序网络**，用 **0-1 原理**证明巴彻（Batcher）双调排序器的正确性、并用穷举检验；还有并行广度优先搜索。这些算法来自经典教材——科尔曼（Cormen）、莱瑟森（Leiserson）、李维斯特（Rivest）与斯泰因（Stein）；贾贾（JáJá）；布莱洛赫（Blelloch）——也是 GPU 库与并行运行时使用的积木。

## 并行计算模型

工作量-跨度模型用计算 DAG 描述算法，与处理器数目无关。有一个精神相同的更老的模型，描述的是一台同步机器。

::: definition PRAM {#def-pram}
**并行随机访问机**（parallel random-access machine，PRAM）有 $p$ 个处理器，各有私有寄存器，共享一块无界内存。计算按同步的**步**推进：每步中每个处理器读一个存储单元、对寄存器做一步运算、写一个单元。PRAM 的差别在于如何处理同时访问同一单元：

- **EREW**（排他读，排他写）：同步内不得有两个处理器访问同一单元；
- **CREW**（并发读，排他写）：允许同时读，写必须排他；
- **CRCW**（并发读，并发写）：允许同时写，按规则裁决——*common* 共同（所有写者必须写同一个值）、*arbitrary* 任意（某个未指明的写者成功）或 *priority* 优先（编号最小的写者成功）。

PRAM 算法的代价是它的步数 $T$ 与它的**工作量**（执行的运算总数）；若它的工作量与最佳顺序算法至多差常数倍，则称它是**工作高效的**。
:::

PRAM 无视通信、同步与缓存，这是它作为真实机器模型的短处，却是它作为*并行性*模型的长处：一个算法若在 PRAM 上没有并行性，它在任何地方都没有。对我们而言这些模型可以互换。一个用 $W$ 工作量跑 $T$ 步的 PRAM 算法就是跨度为 $T$、工作量为 $W$ 的 DAG，由布伦特定理（[[parallel-computing/performance-laws#thm-brent]]），它在 $p$ 个处理器上用时 $O(W/p + T)$。反过来，一个 fork–join 算法可以在 PRAM 上逐层执行。下文我们用工作量 $W(n)$ 与跨度 $S(n)$ 分析算法，并称一个算法是高效的，如果 $W(n)$ 与顺序代价相当而 $S(n)$ 是多对数的——即 $W/S$ 的并行度几乎随 $n$ 线性增长。

并发写的规则对最快的算法很要紧。有 $n^2$ 个处理器并采用共同 CRCW 写时，$n$ 个数的最大值只要 $O(1)$ 步：处理器 $(i, j)$ 比较 $x_i$ 与 $x_j$，若 $x_i < x_j$ 就往 $i$ 的标志位里写"不是最大值"；所有写者写的值相同。而在 EREW PRAM 上，同一问题需要 $\Omega(\log n)$ 步。真实硬件只通过原子操作支持并发写，其有竞争的代价已在 [[parallel-computing/memory-consistency]] 测过。

## 归约

::: algorithm 树形归约 {#alg-reduce}
用结合算子 $\oplus$ 合并 $x_0, \dots, x_{n-1}$（设 $n$ 是 $2$ 的幂，否则用单位元补齐）：

- **for** $d = 1, 2, 4, \dots, n/2$：**for all** 是 $2d$ 的倍数的 $i$ **in parallel**：$x_i \gets x_i \oplus x_{i+d}$。
- 返回 $x_0$。

fork–join 形式：`reduce(a, lo, hi)` 在 $hi = lo + 1$ 时返回 $a_{lo}$；否则它派生（spawn）对两半的 `reduce` 再合并结果。
:::

::: proposition 归约的代价 {#prop-reduce}
树形归约在 $\log n$ 轮中执行 $n - 1$ 次 $\oplus$：工作量 $\Theta(n)$，跨度 $\Theta(\log n)$。若每个处理器先顺序归约自己 $n/p$ 个元素的一块，则它在 $p$ 个处理器上耗时 $O(n/p + \log p)$。
:::

::: proof
距离为 $d$ 的那轮执行 $n/(2d)$ 次运算，且 $\sum_{k=0}^{\log n - 1} n/2^{k+1} = n - 1$。各轮相互依赖，但一轮之内的运算彼此独立，所以跨度就是轮数 $\log n$。正确性：距离 $d$ 的那轮之后，每个是 $2d$ 倍数的下标 $i$ 处，$x_i$ 装着 $x_i \oplus \dots \oplus x_{i + 2d - 1}$（对轮数归纳，用结合律），所以最后一轮之后 $x_0$ 装着整个组合。$p$ 个处理器：每块 $n/p$ 步顺序运算，然后 $p$ 个部分和的树用 $\log p$ 轮。
:::

归约就是并行的 `fold`，OpenMP 的 `reduction` 子句、MPI 的 `MPI_Reduce` 与 GPU 归约的存在理由尽在于此。跨度 $\log n$ 对任何用二元算子合并 $n$ 个输入的算法都是最优的，因为 $n$ 个叶子的二叉树深度至少 $\log n$。

## 扫描

::: definition 扫描 {#def-scan}
对带单位元 $e$ 的结合算子 $\oplus$ 和序列 $x_0, \dots, x_{n-1}$，**包含扫描**（inclusive scan）是序列 $y_i = x_0 \oplus \dots \oplus x_i$，**不包含扫描**（exclusive scan，或称**预扫描** prescan）是 $z_0 = e$、$i \ge 1$ 时 $z_i = x_0 \oplus \dots \oplus x_{i-1}$。取 $\oplus = +$ 就是前缀和。
:::

顺序扫描做 $n - 1$ 次运算，跨度 $n - 1$。第一个并行算法很简单，但做的工作太多。

::: algorithm Hillis–Steele 扫描 {#alg-hillis-steele}
**for** $d = 1, 2, 4, \dots, < n$：**for all** $i \ge d$ **in parallel**：$x_i \gets x_{i-d} \oplus x_i$（一轮内所有读先于该轮的写，这需要一个缓冲区副本）。
:::

::: proposition Hillis–Steele 计算包含扫描 {#prop-hillis-steele}
距离为 $d$ 的那轮之后，$x_i = x^{(0)}_{\max(0, i - 2d + 1)} \oplus \dots \oplus x^{(0)}_i$，其中 $x^{(0)}$ 是输入。于是 $\lceil \log n \rceil$ 轮之后 $x_i$ 就是包含扫描；工作量 $\Theta(n \log n)$，跨度 $\Theta(\log n)$。
:::

::: proof
归纳。第一轮之前，每个 $x_i$ 是以 $i$ 结尾、长度为 $1$ 的窗口之和。假设距离 $d$ 那轮之前，每个 $x_i$ 是以 $i$ 结尾、长度为 $d$ 的窗口之和（在 $0$ 处截断）。对 $i \ge d$，新的 $x_i = x_{i - d} \oplus x_i$ 把以 $i - d$ 结尾的长度 $d$ 窗口与以 $i$ 结尾的长度 $d$ 窗口合并，两个窗口相邻；由结合律，结果是以 $i$ 结尾、长度 $2d$ 的窗口（在 $0$ 处截断）。$i < d$ 时，$x_i$ 已经覆盖 $x_0, \dots, x_i$，保持不变。$d \ge n/2$ 的那轮之后，窗口长度 $\ge n$，于是每个 $x_i$ 覆盖 $x_0, \dots, x_i$。距离 $d$ 的那轮做 $n - d$ 次运算，所以 $n$ 为 $2$ 的幂时工作量是 $\sum_d (n - d) = n\lceil \log n \rceil - (n - 1)$，即 $\Theta(n \log n)$。
:::

工作量里多出的 $\log n$ 因子，对"大 $n$ 少处理器"是致命的（布伦特界变成 $n \log n / p$，一旦 $\log n > p$ 就比顺序还慢）。盖伊·布莱洛赫（Guy Blelloch）的工作高效扫描（1989，承 Ladner 与 Fischer，1980 之后）先建一棵部分和的树，再把前缀顺树扫下来。

::: algorithm 布莱洛赫的工作高效扫描 {#alg-blelloch}
设 $n$ 是 $2$ 的幂，就地计算不包含扫描：

1. **上扫**（一场保留部分结果的归约）：**for** $d = 1, 2, \dots, n/2$：**for all** $i = 2d - 1, 4d - 1, \dots$ **in parallel**：$x_i \gets x_{i - d} \oplus x_i$。
2. 置 $x_{n-1} \gets e$。
3. **下扫**：**for** $d = n/2, n/4, \dots, 1$：**for all** $i = 2d - 1, 4d - 1, \dots$ **in parallel**：$t \gets x_{i-d}$；$x_{i-d} \gets x_i$；$x_i \gets t \oplus x_i$。
:::

把数组看成一棵以元素为叶子的完全二叉树。上扫之后，对每个 $d$，位置 $2dk + 2d - 1$ 装着以该处结尾的 $2d$ 个叶子的块之和，位置 $2dk + d - 1$ 装着该块左半之和。下扫把其子树*左侧*所有叶子之和送进每个节点：节点把自己的值交给左孩子（左孩子的左侧上下文相同），把自己的值加左孩子之和交给右孩子。

::: example 追踪布莱洛赫扫描 {#ex-blelloch}
计算 $3, 1, 7, 0, 4, 1, 6, 3$ 的不包含前缀和，列出每轮之后的数组。
::: solution
```python
def blelloch_scan(a):
    """Exclusive prefix sums of a (length a power of 2), as rounds of parallel steps."""
    x, n = list(a), len(a)
    d = 1
    while d < n:                                  # 上扫：在树中留下部分和
        for i in range(2 * d - 1, n, 2 * d):      # 一轮内的所有 i 并行执行
            x[i] += x[i - d]
        print("up   d=%d:" % d, x)
        d *= 2
    x[n - 1] = 0                                  # 根处的单位元
    d = n // 2
    while d >= 1:                                 # 下扫：把前缀压下去
        for i in range(2 * d - 1, n, 2 * d):
            x[i - d], x[i] = x[i], x[i] + x[i - d]   # 左孩子得父值；右孩子得父值加左子树和
        print("down d=%d:" % d, x)
        d //= 2
    return x

print(blelloch_scan([3, 1, 7, 0, 4, 1, 6, 3]))
```

```console
$ python3 blelloch.py
up   d=1: [3, 4, 7, 7, 4, 5, 6, 9]
up   d=2: [3, 4, 7, 11, 4, 5, 6, 14]
up   d=4: [3, 4, 7, 11, 4, 5, 6, 25]
down d=4: [3, 4, 7, 0, 4, 5, 6, 11]
down d=2: [3, 0, 7, 4, 4, 11, 6, 16]
down d=1: [0, 3, 4, 11, 11, 15, 16, 22]
[0, 3, 4, 11, 11, 15, 16, 22]
```

上扫之后，位置 $7$ 装着总和 $25$，位置 $3$ 装前半之和（$11$），位置 $5$ 装 $x_4, x_5$ 之和（$5$）。根处的左侧上下文是 $0$。$d = 4$ 那轮，左孩子（位置 $3$）得到根的上下文 $0$，右孩子（位置 $7$）得到 $0 + 11 = 11$，即第二半以左一切之和。最后一轮把每个叶子的不包含前缀送到叶子手中。同一文件里的一个循环用长度 $1$ 到 $64$ 的 $1200$ 个随机数组对照 `sum(v[:i])` 验证了该函数。每轮的迭代触及互不相交的位置，所以在 EREW PRAM 上可以无竞争地并行执行。
:::
:::

::: theorem 布莱洛赫扫描正确且工作高效 {#thm-blelloch}
[[#alg-blelloch]] 以 $2(n - 1)$ 次 $\oplus$ 在 $2\log n$ 轮内算出不包含扫描：工作量 $\Theta(n)$，跨度 $\Theta(\log n)$。
:::

::: proof
给叶子 $0, \dots, n - 1$ 之上的完全二叉树的节点编号：高 $h$ 的节点覆盖块 $B = [2^h k, 2^h(k + 1))$，存放在位置 $r(B) = 2^h(k+1) - 1$，即块的最后一个下标；它的左孩子覆盖 $B$ 的前半，存放在 $r(B) - 2^{h-1}$，右孩子就存放在 $r(B)$。

*上扫。* 对轮归纳：距离 $d = 2^{h-1}$ 的那轮之后，每个高 $h$ 块的 $r(B)$ 处装着 $\Sigma(B)$，即 $B$ 中输入元素的 $\oplus$ 组合；不是任何更高块之 $r(B')$ 的位置自上次写入后未动。（该轮计算 $x_{r(B)} \gets x_{r(B) - d} \oplus x_{r(B)}$，把两半之和合并。）

*下扫。* 设 $\lambda(B)$ 为 $B$ 以左所有输入元素的组合（$B$ 第一个叶子处的不包含前缀）。断言：处理高 $h$ 的下扫轮（距离 $2^{h-1}$ 的那轮，$h \ge 1$）之后——以及对 $h = \log n$，首轮之前也一样——每个高 $h - 1$ 的块 $B$ 都有 $x_{r(B)} = \lambda(B)$。初始（第 2 步）根块有 $x_{n-1} = e = \lambda(\text{root})$。对满足 $x_{r(B)} = \lambda(B)$ 的高 $h$ 块 $B$，其左孩子位置 $r(B) - d$ 还从上扫留着 $\Sigma(\text{left half})$，该轮把左孩子置为 $\lambda(B)$——正确，因为 $B$ 的左缘与其左半之间什么都没有——把右孩子置为 $\lambda(B) \oplus \Sigma(\text{left half})$，正是右半以左一切的组合。最后一轮之后，每个叶子 $i$ 装着 $\lambda(\{i\}) = x_0 \oplus \dots \oplus x_{i-1}$。

*代价。* 每一扫都做 $n/2 + n/4 + \dots + 1 = n - 1$ 次运算，共 $\log n$ 轮。
:::

$p$ 个处理器上，开头程序的分块版本还要更好：每个处理器顺序扫描自己一块，对 $p$ 个块和做一次扫描给出每块的偏移，各处理器再把自己的偏移加上——工作量 $2n + O(p)$、时间 $O(n/p + p)$，中段若用树形扫描则是 $O(n/p + \log p)$。开头的实验就是这个算法，中段顺序执行。

::: widget plot
f: x*log2(x)/p + log2(x); 2*x/p + 2*log2(x); x
x: 2, 4096
y: 0, 4096
sliders: p=8:1:64:1
labels: \text{Hillis–Steele } n\log n/p + \log n; \text{Blelloch } 2n/p + 2\log n; \text{顺序 } n
caption: $p$ 个处理器上对 $n$ 个元素做扫描的估计时间，按布伦特界 $W/p + S$：Hillis–Steele（工作量 $n\log n$）、Blelloch（工作量 $2n$）与顺序循环（工作量 $n$，跨度 $n$）。$p = 8$ 时，Hillis–Steele 只在 $\log n < 8$ 期间胜过顺序循环，此后一败涂地；Blelloch 对所有大 $n$ 都比顺序快约 $p/2$ 倍。把 $p$ 加到 $64$：多出的 $\log n$ 因子此时就不那么要紧了——这就是拥有数千条流水线的 GPU，有时对块内短扫描采用 Hillis–Steele 的原因。
:::

### 扫描的用处

扫描是 map 与 reduce 之后最有用的并行原语，因为它把许多看似顺序的循环变成并行循环。几个例子，每个都是工作量 $O(n)$、跨度 $O(\log n)$：

- **打包（Pack，过滤）**：要保留 $x$ 中满足谓词的元素，算出标志 $f_i \in \{0, 1\}$，取其不包含扫描 $z$，然后并行地把每个 $f_i = 1$ 的 $x_i$ 写到输出位置 $z_i$。扫描为每个被保留的元素分配它在输出中的下标。
- **划分（Split，分块）**：要把标志为 $0$ 的元素全部移到标志为 $1$ 的元素之前、各组内部保持原有次序，就把 $0$ 打包、把 $1$ 打包到它们之后。从最低位到最高位逐位划分，就是并行**基数排序**（[[#ex-split]]）。
- **分段扫描（segmented scan）**：用标志划定的每个段内独立扫描——对（标志, 值）二元组扫描，算子在段边界处复位，它仍然是结合的。它能并行化大小不规则的嵌套循环，例如稀疏矩阵-向量乘。
- **递推**：$x_i = a_i x_{i-1} + b_i$ 是仿射映射 $x \mapsto a x + b$ 之复合上的扫描——复合是结合的，与 [[parallel-computing/performance-laws#ex-lcg-jump]] 的生成器跳跃同源。**先行进位加法**是进位传播状态的扫描，这就是硬件加法器只要 $O(\log n)$ 级门延迟而非 $O(n)$ 的原因（[Electrical Engineering Atlas](/learn/ee/)）。

::: example 用扫描做划分 {#ex-split}
用不包含扫描按最低位划分键 $5, 2, 7, 4, 1, 6, 3, 0$，偶数键在前。
::: solution
标志 $f_i = $ 最低位：$1, 0, 1, 0, 1, 0, 1, 0$。对偶数键用 $g_i = 1 - f_i$：$0, 1, 0, 1, 0, 1, 0, 1$，其不包含扫描为 $0, 0, 1, 1, 2, 2, 3, 3$、总和 $4$。奇数键对 $f$ 的不包含扫描是 $0, 1, 1, 2, 2, 3, 3, 4$；它们放在 $4$ 个偶数键之后。于是键 $x_i$ 为偶时去位置 $\text{scan}(g)_i$，为奇时去 $4 + \text{scan}(f)_i$：

| $i$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ |
|---|---|---|---|---|---|---|---|---|
| $x_i$ | $5$ | $2$ | $7$ | $4$ | $1$ | $6$ | $3$ | $0$ |
| 目标位置 | $4$ | $0$ | $5$ | $1$ | $6$ | $2$ | $7$ | $3$ |

结果是 $2, 4, 6, 0, 5, 7, 1, 3$：先偶后奇，各组保持原有次序（这一划分是**稳定的**）。再对位 $1$、然后位 $2$ 各划分一次就排好了序——$3$ 位的键三趟，$b$ 位的键 $b$ 趟，每趟工作量 $O(n)$、跨度 $O(\log n)$。GPU 排序库用的正是这个，只是每趟处理若干位。
:::
:::

::: quiz
下列哪些能用一次带结合算子的扫描在跨度 $O(\log n)$ 内算出？
- [x] 每个 $i$ 的滑动最大值 $\max(x_0, \dots, x_i)$。
- [x] 一串括号中每个位置的嵌套深度。
- [x] 给定 $x_{-1}$，由 $x_i = 2x_{i-1} + c_i$ 算出所有 $x_i$。
- [ ] 给定 $x_{-1}$，由 $x_i = x_{i-1}^2 + c_i \pmod m$ 算出所有 $x_i$。
::: solution
$\max$ 是结合的。嵌套深度是 `(` 记 $+1$、`)` 记 $-1$ 的前缀和。线性递推是映射 $x \mapsto 2x + c_i$ 之复合上的扫描：两个仿射映射的复合仍是仿射映射，所以每个部分结果是一对常数的定长信息 $(a, b)$。二次递推也是映射的复合，但二次映射逐次复合次数增长，部分结果不是定长的，也没有已知的常数代价结合办法——这正是此类生成器顺序性的由来。
:::
:::

## 排序

### 并行归并排序

归并排序是天然的分治排序，它的两次递归调用可以并行。但 [[parallel-computing/shared-memory]] 已经量过：光这样不够——归并顺序做时，跨度满足 $S(n) = S(n/2) + \Theta(n) = \Theta(n)$，并行度只有 $\Theta(\log n)$。归并也必须并行。

::: algorithm 并行归并 {#alg-pmerge}
把有序数组 $A$ 与 $B$ 归并进 $C$（设 $\lvert A\rvert \ge \lvert B\rvert$，否则交换）：

1. $A$ 为空则返回。令 $m = \lfloor \lvert A\rvert / 2 \rfloor$、$x = A[m]$。
2. 用二分查找在 $B$ 中找到位置 $q$ 使 $B[0..q) < x \le B[q..)$。
3. 把 $x$ 放到 $C[m + q]$。
4. **并行地**归并：$A[0..m)$ 与 $B[0..q)$ 归并进 $C[0..m+q)$，$A[m+1..)$ 与 $B[q..)$ 归并进 $C[m+q+1..)$。
:::

::: example 逐次调用地看并行归并 {#ex-pmerge}
用 [[#alg-pmerge]] 归并 $A = (1, 4, 6, 9, 12)$ 与 $B = (2, 3, 10)$，列出每一次调用。
::: solution
每行是一次调用；深度是其递归层次，同深度的调用并行执行。"放置"给出值 $x$ 及其输出位置 $m + q$（相对本次调用输出范围起点的偏移）。

| 深度 | 较大数组 | 较小数组 | $x$ | $q$ | 放置位置 |
|---|---|---|---|---|---|
| $0$ | $(1, 4, 6, 9, 12)$ | $(2, 3, 10)$ | $6$ | $2$ | $C[4]$ |
| $1$ | $(1, 4)$ | $(2, 3)$ | $4$ | $2$ | $C[3]$ |
| $1$ | $(9, 12)$ | $(10)$ | $12$ | $1$ | $C[7]$ |
| $2$ | $(2, 3)$ | $(1)$ | $3$ | $1$ | $C[2]$ |
| $2$ | $(9)$ | $(10)$ | $9$ | $0$ | $C[5]$ |
| $3$ | $(2)$ | $(1)$ | $2$ | $1$ | $C[1]$ |
| $3$ | $(10)$ | $()$ | $10$ | $0$ | $C[6]$ |
| $4$ | $(1)$ | $()$ | $1$ | $0$ | $C[0]$ |

结果是 $C = (1, 2, 3, 4, 6, 9, 10, 12)$，一个 Python 实现（二分查找用 `bisect_left`）证实了这一点。第二个数组更长的调用会先交换两者：深度 $2$ 的左调用收到的是 $(1)$ 与 $(2, 3)$，深度 $4$ 的调用收到的是 $(\,)$ 与 $(1)$；长度相等时算第一个数组较大。$8$ 个元素共 $5$ 层，每次调用做一次二分查找：$O(\log n)$ 层、每层 $O(\log n)$ 工作量，就是 [[#thm-pmerge]] 的跨度 $O(\log^2 n)$。
:::
:::

::: theorem 并行归并与归并排序的代价 {#thm-pmerge}
共 $n$ 个元素的并行归并跨度为 $\Theta(\log^2 n)$、工作量为 $\Theta(n)$。用并行归并的归并排序工作量 $\Theta(n \log n)$、跨度 $\Theta(\log^3 n)$，并行度 $\Theta(n/\log^2 n)$。
:::

::: proof
*正确性。* $A[0..m)$ 与 $B[0..q)$ 的每个元素都不超过 $x$（前者因为 $A$ 有序，后者因为 $q$ 的取法），$A[m+1..)$ 与 $B[q..)$ 的每个元素都不小于 $x$；且恰有 $m + q$ 个元素排在 $x$ 之前。所以把 $x$ 放在 $m + q$、独立归并两对，由归纳得有序归并。

*跨度。* 因为 $\lvert A\rvert \ge \lvert B\rvert$，$\lvert A\rvert \ge n/2$。每次递归调用至多接到 $A$ 的一半加整个 $B$：至多 $\lvert A\rvert/2 + \lvert B\rvert = n - \lvert A\rvert/2 \le n - n/4 = 3n/4$ 个元素。二分查找花 $O(\log n)$，所以 $S(n) \le S(3n/4) + O(\log n)$，展开经过 $O(\log n)$ 层、每层 $O(\log n)$：$S(n) = O(\log^2 n)$。（最坏情形它是 $\Theta(\log^2 n)$。）

*工作量。* 工作量满足 $W(n) = W(\alpha n) + W((1 - \alpha)n) + O(\log n)$，其中 $1/4 \le \alpha \le 3/4$，外加每次调用放置一个元素。放置元素的调用至多 $n$ 次、每次 $O(\log n)$ 工作量，立得 $O(n \log n)$；更精细的界 $\Theta(n)$ 用代入 $W(n) \le cn - d\log n$ 得到（科尔曼等，§27.3）。

*归并排序。* 工作量 $W(n) = 2W(n/2) + \Theta(n) = \Theta(n \log n)$。跨度 $S(n) = S(n/2) + \Theta(\log^2 n)$，而 $\sum_{k=0}^{\log n} (\log n - k)^2 = \Theta(\log^3 n)$。
:::

理查德·科尔（Richard Cole，1988）给出的归并排序在 EREW PRAM 上跨度 $O(\log n)$、工作量 $O(n \log n)$——两头都最优，只是常数大到实用不了。多核上的实用并行排序用样本排序（sample sort）：从随机样本中选 $p - 1$ 个分割元素，把每个元素送进它所属的桶（就是一次划分，用扫描算出），再各桶独立排序。

### 排序网络

**比较器**在两条线 $i < j$ 上取两个键，把小者输出到线 $i$、大者输出到线 $j$。**比较器网络**是一列固定的比较器，分组成若干**轮**，每轮一条线至多用一次；其**深度**是轮数，**规模**是比较器个数。因为比较的序列与数据无关，排序网络特别适合 SIMD 单元、GPU 与硬件：每轮就是一次向量运算，没有分支。

怎么知道一个网络能排序？检验全部 $n!$ 种排列，出了很小的 $n$ 就没指望了。高德纳（Knuth）的 **0-1 原理**把问题化简到 $2^n$ 个二元输入。

::: lemma 比较器网络与单调函数交换 {#lem-monotone}
若 $f$ 是非降函数、比较器网络把输入 $a = (a_1, \dots, a_n)$ 映为 $b$，则它把 $f(a) = (f(a_1), \dots, f(a_n))$ 映为 $f(b)$。
:::

::: proof
对一个比较器：$f$ 非降，故 $\min(f(x), f(y)) = f(\min(x, y))$ 且 $\max(f(x), f(y)) = f(\max(x, y))$。网络是比较器的复合，对比较器个数归纳即得结论。
:::

::: theorem 0-1 原理 {#thm-zero-one}
若一个比较器网络对 $0$ 和 $1$ 组成的每个输入序列都能排序，则它对任意全序键集的每个输入序列都能排序。
:::

::: proof
设网络未能排好某个输入 $a$：输出 $b$ 中有位置 $i < j$ 使 $b_i > b_j$。定义 $f(x) = 1$ 当 $x \ge b_i$，否则 $f(x) = 0$；$f$ 非降。由 [[#lem-monotone]]，网络在 0-1 输入 $f(a)$ 上输出 $f(b)$，它在位置 $i$ 有 $f(b_i) = 1$、在位置 $j > i$ 有 $f(b_j) = 0$（因为 $b_j < b_i$）。于是网络未能排好 0-1 输入 $f(a)$，与假设矛盾。
:::

肯尼斯·巴彻（Kenneth Batcher）的**双调排序器**（1968）由一个简单的网络搭建。

::: definition 双调序列与半清理器 {#def-bitonic}
一个序列若先增后减，或是这种序列的循环旋转，则称它是**双调**的；一个 0-1 序列双调当且仅当它形如 $0^a 1^b 0^c$ 或 $1^a 0^b 1^c$。$n = 2m$ 条线上的**半清理器**（half-cleaner）在一轮内把线 $i$ 与线 $i + m$ 比较，$i = 0, \dots, m - 1$。
:::

::: lemma 半清理器使双调序列减半 {#lem-half-cleaner}
若半清理器的输入是双调 0-1 序列，则输出的两半都是双调的，下半的每个元素都不超过上半的每个元素，且至少一半是**干净的**（全 $0$ 或全 $1$）。
:::

::: proof
设输出为 $L_i = \min(s_i, s_{i+m})$、$H_i = \max(s_i, s_{i+m})$。先看形如 $s = 0^a 1^b 0^c$ 的情形，其 $1$ 占据一个长度 $b$ 的区间。

若 $b \le m$：位置 $i$ 与 $i + m$ 相距 $m$，不可能同落在长度 $b \le m$ 的区间里：$s_i, s_{i+m}$ 至多一个为 $1$。于是 $L$ 全 $0$——干净——且 $H_i = s_i \lor s_{i+m}$。映射 $i \mapsto i \bmod m$ 把长度不超过 $m$ 的 $1$ 区间折到模 $m$ 的循环区间上，所以 $H$ 是 $1$ 的循环区间：双调。$L$ 的每个元素（$0$）都不超过 $H$ 的每个元素。

若 $b > m$：$0$ 的个数 $a + c < m$，对补集（交换 $0$ 与 $1$、$\min$ 与 $\max$ 的角色）用同一论证，得 $H$ 全 $1$、$L$ 双调；两半之间依旧逐元素 $L \le H$。

形如 $1^a 0^b 1^c$ 是第一种形的补，取补交换 $L$ 与 $H$ 也交换两个值，所以结论同样成立。
:::

::: algorithm 双调排序（巴彻，1968） {#alg-bitonic}
设 $n = 2^k$：

- 长度 $n$ 双调序列的**双调归并**：做一次半清理器，然后（并行地）递归双调归并两半。深度 $\log n$。
- 任意长度 $n$ 序列的**双调排序**：（并行地）把前半升序双调排序、后半降序双调排序，使二者拼接成双调，再做双调归并。
:::

::: theorem 双调排序是排序网络 {#thm-bitonic}
对 $n = 2^k$ 个键的双调排序排好一切输入，深度 $\frac{1}{2}\log n\,(\log n + 1)$，比较器 $\frac{n}{4}\log n\,(\log n + 1)$ 个。
:::

::: proof
由 [[#thm-zero-one]] 只需考虑 0-1 输入。*归并器排好双调 0-1 序列*，对 $n$ 归纳：$n = 1$ 无事可做；$n \ge 2$ 时，由 [[#lem-half-cleaner]] 半清理器留下两个双调半部，下半逐元素不超过上半；递归归并器排好每一半；而一半是干净的、下半每个元素又不超过上半每个元素，拼接即有序。*排序器能排序*，归纳：两半按相反方向排好，于是一升一降两个 0-1 序列的拼接形如 $0^a 1^b 0^c$——双调——归并器排好它。（降序排序器就是把升序排序器的每个比较器反向。）

*深度。* 规模 $n$ 的归并器深度 $\log n$，所以排序器满足 $D(n) = D(n/2) + \log n$、$D(1) = 0$，得 $D(n) = \sum_{j=1}^{\log n} j = \frac{1}{2}\log n(\log n + 1)$。每轮有 $n/2$ 个比较器，所以规模是 $\frac{n}{2} D(n)$。
:::

::: example 穷举检验双调网络 {#ex-bitonic-check}
构造 $n = 2, 4, 8, 16$ 的双调排序网络，数出深度与规模，在全部 $2^n$ 个 0-1 输入和 $10^4$ 个随机实数输入上验证。然后从 $n = 8$ 的网络里拿掉一个比较器，让 0-1 原理找出它排错的输入。
::: solution
在标准的就地形式中，归并大小 $k$ 的块时、线 $i$ 与 $i \oplus j$（按位异或）之间的比较器，当 $i$ 的第 $k$ 位为 $0$ 时按升序排，否则按降序：

```python
from itertools import product
import random

def bitonic_network(n):
    """Comparators (i, j) with i < j, in rounds, that sort n = 2^k keys ascending."""
    rounds, k = [], 2
    while k <= n:                       # 归并大小为 k 的双调块
        j = k // 2
        while j >= 1:                   # 跨度为 j 的半清理器
            rnd = []
            for i in range(n):
                partner = i ^ j
                if partner > i:
                    up = (i & k) == 0       # 本块的方向
                    rnd.append((i, partner) if up else (partner, i))  # （小者去, 大者去）
            rounds.append(rnd)
            j //= 2
        k *= 2
    return rounds

def apply(rounds, a):
    a = list(a)
    for rnd in rounds:
        for lo, hi in rnd:              # 把较小的键放到位置 lo
            if a[lo] > a[hi]:
                a[lo], a[hi] = a[hi], a[lo]
    return a

for n in (2, 4, 8, 16):
    net = bitonic_network(n)
    size = sum(len(r) for r in net)
    ok01 = all(apply(net, v) == sorted(v) for v in product((0, 1), repeat=n))
    okrand = all(apply(net, v) == sorted(v)
                 for v in ([random.random() for _ in range(n)] for _ in range(10000)))
    print(f"n={n:2}  depth {len(net):2}  comparators {size:3}  all 0-1 inputs: {ok01}  random: {okrand}")

broken = bitonic_network(8)
broken[-1] = broken[-1][1:]             # 从最后一轮拿掉一个比较器
bad = [v for v in product((0, 1), repeat=8) if apply(broken, v) != sorted(v)]
print(len(bad), "of 256 0-1 inputs fail, e.g.", bad[0], "->", apply(broken, bad[0]))
```

```console
$ python3 bitonic.py
n= 2  depth  1  comparators   1  all 0-1 inputs: True  random: True
n= 4  depth  3  comparators   6  all 0-1 inputs: True  random: True
n= 8  depth  6  comparators  24  all 0-1 inputs: True  random: True
n=16  depth 10  comparators  80  all 0-1 inputs: True  random: True
4 of 256 0-1 inputs fail, e.g. (1, 1, 1, 1, 0, 1, 1, 1) -> [1, 0, 1, 1, 1, 1, 1, 1]
```

深度 $1, 3, 6, 10$、规模 $1, 6, 24, 80$，与 [[#thm-bitonic]] 吻合：$n = 16$ 时 $\frac{1}{2} \cdot 4 \cdot 5 = 10$、$\frac{16}{4} \cdot 4 \cdot 5 = 80$。由 0-1 原理，$n = 16$ 的那 $65{,}536$ 次二元测试*证明*了这个网络对一切输入都能排序，而 $10^4$ 次随机测试只是证据（排列有 $16! \approx 2 \times 10^{13}$ 种）。残缺的网络在 $256$ 个二元输入上只在 $4$ 个上失败，穷举检查一下就找到了，随机测试却可能漏掉。
:::
:::

双调排序做 $\Theta(n \log^2 n)$ 次比较，多于归并排序的 $\Theta(n \log n)$，但它规整，所以是 SIMD 寄存器与 GPU 线程块内小规模排序的心头好。**AKS 网络**（阿吉泰（Ajtai）、科姆洛什（Komlós）与塞梅雷迪（Szemerédi），1983）深度 $O(\log n)$，但常数大到只有理论价值。

## 图算法

图算法更难并行化，因为结构取决于数据。基本方法是**层同步广度优先搜索**：一次处理搜索的全部前沿。

::: algorithm 层同步 BFS {#alg-pbfs}
给定 $G = (V, E)$ 与源 $s$：置 $\text{dist}(s) = 0$、$F = \{s\}$。**While** $F \ne \emptyset$，对当前层 $\ell$：

1. **For all** $u \in F$ 与所有边 $(u, v)$ **in parallel**：若 $v$ 未访问，尝试认领它——若 $\text{parent}(v)$ 仍未设置就原子地置 $\text{parent}(v) \gets u$（一次 CAS，或一次任意 CRCW 写）。
2. 令 $F'$ 为本层认领到的顶点集合（用打包算出，靠扫描），把它们的距离置为 $\ell + 1$，并令 $F \gets F'$。
:::

每个顶点进入前沿一次、每条边至多检查两次，所以工作量 $O(n + m)$，与顺序 BFS 相同（[[algorithms]]）；每层为打包花 $O(\log n)$ 跨度，所以跨度 $O(D \log n)$，$D$ 是图的直径（层数）。直径小的图并行度高——社交网络与网页图的直径常常低于 $20$——而路管网这类长而瘦的图并行度低，要用别的方法（如最短路径的 $\Delta$-stepping）。比默（Beamer）、阿萨诺维奇（Asanović）与帕特森（Patterson）的**方向优化** BFS（2012）在前沿很大时改为让每个*未访问*顶点到前沿里找父亲，检查的边少得多。

::: widget graph
nodes: S@0,2; A@1,3; B@1,2; C@1,1; D@2,3.5; E@2,2.5; F@2,1.5; G@2,0.5; H@3,3; I@3,1
edges: S-A; S-B; S-C; A-D; A-E; B-E; B-F; C-F; C-G; D-H; E-H; F-I; G-I
algorithm: bfs
start: S
caption: 从 $S$ 出发的广度优先搜索，层同步算法一轮并行处理一层。逐步翻看并注意各层：$\{S\}$，然后 $\{A, B, C\}$，然后 $\{D, E, F, G\}$，然后 $\{H, I\}$——十个顶点四轮。第 $2$ 轮里，顶点 $E$ 从 $A$ 和 $B$ 都可达、$F$ 从 $B$ 和 $C$ 都可达：并行执行时，两边都会试图认领它，由一次原子 compare-and-swap 决定谁来当父亲。哪种选择都给出一棵正确的 BFS 树。
:::

其他经典并行图技术还包括：用**指针跳转**在 $O(\log n)$ 轮内算出森林中每个结点的深度或链表每个元素的秩（[[#ex-pointer-jumping]]）、用于求值表达式树的**树收缩**、以及用**标签传播**或希洛阿赫（Shiloach）与维什金（Vishkin）的挂钩-捷径算法（1982）求连通分量。

::: warning 多对数跨度不是故事的全部
一个跨度 $O(\log n)$ 但工作量 $\Theta(n \log n)$ 的算法，顺序算法只做 $\Theta(n)$，那么 $n$ 一大，在任何现实的处理器数上它都会输给顺序算法——Hillis–Steele 扫描是标准反例。反过来，开头的扫描跨度是 $\Theta(n/p + p)$，根本不是多对数的，却在多核上是最佳选择。评判并行算法，先看工作量（离最佳顺序算法在一个小常数以内吗？），再看并行度 $W/S$ 是否明显超过你手里的处理器数，最后看模型忽略了什么：存储流量（开头的扫描受带宽限制）、每轮的同步（真实机器上每一步 PRAM 就是一次屏障）与负载平衡。
:::

::: history
并行前缀计算在 20 世纪 60 年代为加法器电路而研究；理查德·拉德纳（Richard Ladner）与迈克尔·费希尔（Michael Fischer）的《Parallel prefix computation》（1980）给出了一般构造，彼得·科格（Peter Kogge）与哈罗德·斯通（Harold Stone）（1973）给出了解递推的版本。史蒂文·福琼（Steven Fortune）与詹姆斯·怀利（James Wyllie）于 1978 年定义了 PRAM，怀利的博士论文（1979）引入指针跳转。丹尼尔·希利斯（Daniel Hillis）与盖伊·斯蒂尔（Guy Steele）的《Data parallel algorithms》（1986）让扫描在 Connection Machine 上流行起来，盖伊·布莱洛赫（Guy Blelloch）的《Scans as primitive parallel operations》（1989）与《Vector Models for Data-Parallel Computing》（1990）把它变成编程原语。肯尼斯·巴彻（Kenneth Batcher）在 1968 年 AFIPS 春季联合计算机大会上描述了奇偶归并与双调排序网络；高德纳（Knuth）在《The Art of Computer Programming》第 3 卷（1973）中陈述了 0-1 原理。米克洛什·阿吉泰（Miklós Ajtai）、亚诺什·科姆洛什（János Komlós）与安德烈·塞梅雷迪（Endre Szemerédi）的 $O(\log n)$ 深度排序网络发表于 1983 年，理查德·科尔（Richard Cole）的最优并行归并排序发表于 1988 年。约瑟夫·贾贾（Joseph JáJá）的《An Introduction to Parallel Algorithms》（1992）是 PRAM 的标准教材。
:::

## 后续内容

[[parallel-computing/gpu-programming]] 在 GPU 上实现归约与扫描：数千线程几乎照字面地、齐步执行本章的各轮，排序网络在线程块内部排序。[[parallel-computing/message-passing]] 在集群的节点之间实现归约、广播与全交换，那里每轮就是一封消息，代价模型必须计入通信。[[parallel-computing/performance-engineering]] 回到拦住开头扫描的带宽极限。并行复杂性类——$\mathsf{NC}$（具有多对数跨度与多项式工作量的问题）以及被认为天生顺序的 $\mathsf{P}$ 完全问题——属于 [[complexity]]。

::: summary
- **PRAM**（[[#def-pram]]）与工作量-跨度模型在并行性分析上可以互换；追求**工作高效**（工作量与顺序相当）而跨度多对数的算法，并用布伦特定理得到 $p$ 处理器上的 $O(W/p + S)$。
- **归约**工作量 $n - 1$、跨度 $\log n$（[[#prop-reduce]]）。**扫描**：Hillis–Steele 跨度 $\log n$ 但工作量 $\Theta(n \log n)$（[[#prop-hillis-steele]]）；Blelloch 的上扫/下扫工作高效，$2\log n$ 轮、$2(n-1)$ 次运算（[[#thm-blelloch]]，[[#ex-blelloch]]）。多核上，分块的三阶段扫描对顺序循环加速 $4$ 倍，受存储器带宽限制。
- 扫描可以实现打包、划分、基数排序（[[#ex-split]]）、分段操作与线性递推。
- **并行归并**跨度 $\Theta(\log^2 n)$，使归并排序跨度 $\Theta(\log^3 n)$、并行度 $\Theta(n/\log^2 n)$（[[#thm-pmerge]]）。
- **0-1 原理**（[[#thm-zero-one]]）把验证排序网络化简为 $2^n$ 个二元输入；**双调排序**深度 $\frac12\log n(\log n+1)$、比较器 $\frac{n}{4}\log n(\log n+1)$ 个（[[#thm-bitonic]]），$n = 16$ 时已穷举验证（[[#ex-bitonic-check]]）。
- **层同步 BFS** 工作量 $O(n + m)$、跨度 $O(D \log n)$（[[#alg-pbfs]]）；在直径小的图上并行得好。
:::

## 习题

::: exercise Hillis–Steele 的工作量 {level=1 check="49"}
Hillis–Steele 扫描（[[#alg-hillis-steele]]）对 $n = 16$ 个元素做多少次 $\oplus$？（填入数目。）
::: solution
各轮 $d = 1, 2, 4, 8$，每轮 $n - d$ 次运算：$15 + 14 + 12 + 8 = 49$；对照顺序扫描的 $15$ 次与 Blelloch 的 $2 \times 15 = 30$ 次。公式 $n\log n - (n - 1) = 64 - 15 = 49$ 吻合。
:::
:::

::: exercise 布莱洛赫扫描的工作量 {level=1 check="30"}
布莱洛赫扫描对 $n = 16$ 个元素做多少次 $\oplus$？（填入数目。）多少轮？
::: solution
上扫做 $8 + 4 + 2 + 1 = 15$ 次运算，下扫同样 $15$ 次，共 $2(n - 1) = 30$ 次，用 $2\log n = 8$ 轮（把根置成 $e$ 的那一步不是 $\oplus$ 运算）。
:::
:::

::: exercise 双调排序器的规模 {level=1 check="240"}
$32$ 个键的双调排序器有多少个比较器？（填入数目。）深度呢？
::: solution
由 [[#thm-bitonic]]，深度 $\frac{1}{2}\cdot 5 \cdot 6 = 15$，规模 $\frac{32}{2} \times 15 = 240$。$32$ 个键的最小规模网络尚无人知；已知最好的约 $185$ 个比较器，但双调的规整结构才是它对硬件有吸引力的原因。
:::
:::

::: exercise 用扫描打包 {level=2}
用一次不包含扫描把 $x = (-2, 5, 0, 3, -1, 8, 4, -7)$ 的正元素保序打包进一个新数组。给出标志、扫描、每个被保留元素的目标位置与结果，并说明 $n$ 个元素的工作量与跨度。
::: solution
标志 $f = (0, 1, 0, 1, 0, 1, 1, 0)$；不包含扫描 $z = (0, 0, 1, 1, 2, 2, 3, 4)$，总和 $4$（输出长度，$z_7 + f_7$）。每个 $f_i = 1$ 的 $x_i$ 去位置 $z_i$：$5 \to 0$，$3 \to 1$，$8 \to 2$，$4 \to 3$。结果 $(5, 3, 8, 4)$。标志与写入都是 map（工作量 $n$，跨度 $1$）；扫描工作量 $O(n)$、跨度 $O(\log n)$；所以打包工作量 $O(n)$、跨度 $O(\log n)$，且因目标位置互异而无竞争。
:::
:::

::: exercise 扫描一个递推 {level=2 check="29"}
递推 $x_i = a_i x_{i-1} + b_i$ 可以用二元组 $(a, b)$（代表映射 $x \mapsto ax + b$）上的扫描计算。给出复合两个这样的映射（先 $(a_1, b_1)$、后 $(a_2, b_2)$）的结合算子，证明它结合，并用它从 $x_{-1} = 1$、$(a_i, b_i) = (2, 1), (3, 0), (1, 4), (2, 3)$（$i = 0, 1, 2, 3$）算出 $x_3$。（填入 $x_3$。）
::: solution
先施 $(a_1, b_1)$ 再施 $(a_2, b_2)$ 得 $x \mapsto a_2(a_1 x + b_1) + b_2 = (a_2 a_1)x + (a_2 b_1 + b_2)$，所以定义 $(a_1, b_1) \otimes (a_2, b_2) = (a_2 a_1,\ a_2 b_1 + b_2)$。它结合，因为它是函数复合、而函数复合结合：$((f \otimes g) \otimes h)$ 与 $(f \otimes (g \otimes h))$ 都表示"先施 $f$，再施 $g$，再施 $h$"。（代数验证：两边都等于 $(a_3a_2a_1,\ a_3a_2b_1 + a_3b_2 + b_3)$。）单位元是 $(1, 0)$。按序复合四个映射：$(2, 1) \otimes (3, 0) = (6, 3)$；$\otimes (1, 4) = (6, 7)$；$\otimes (2, 3) = (12, 17)$。所以 $x_3 = 12 \cdot 1 + 17 = 29$。

直接求值验证：$x_0 = 2 \cdot 1 + 1 = 3$，$x_1 = 3 \cdot 3 + 0 = 9$，$x_2 = 9 + 4 = 13$，$x_3 = 2 \cdot 13 + 3 = 29$。两种算法都得 $29$。
:::
:::

::: exercise 扫描的布伦特界 {level=2 check="2*(2^20 - 1)/64 + 40"}
用布伦特界 $W/p + S$ 和布莱洛赫扫描（[[#thm-blelloch]]），估计 $p = 64$ 个处理器上扫描 $n = 2^{20}$ 个元素所需的步数。（填入界。）与顺序的 $n - 1$ 步、与分块三阶段扫描比较。
::: solution
$W = 2(n - 1) = 2(2^{20} - 1)$、$S = 2\log n = 40$，所以界为 $2(2^{20} - 1)/64 + 40 \approx 32{,}808$ 步，对顺序的 $1{,}048{,}575$ 步加速约 $32$ 倍——是 $p$ 的一半，因为算法做双倍的工作。分块扫描的两个并行阶段做约 $2n/p$ 步，加上中段 $p$（或 $\log p$）：约 $32{,}768 + 64$，基本相同，同步轮数却少得多（两道屏障而不是 $40$），这就是它在多核上更受青睐的原因。
:::
:::

::: exercise 指针跳转 {#ex-pointer-jumping level=3}
$n$ 个结点的链表存于数组：`next[i]` 是结点 $i$ 的后继（最后一个结点指向自己）。**表排名**（list ranking）要求出每个结点距表尾的距离。怀利（Wyllie）的算法给最后一个结点置 `rank[i]` $= 0$、其余置 $1$，然后执行 $\lceil \log n \rceil$ 次，**for all** $i$ **in parallel**：`rank[i]` $\gets$ `rank[i]` $+$ `rank[next[i]]`；`next[i]` $\gets$ `next[next[i]]`（每轮都读旧值）。证明它算出了各秩，给出工作量与跨度，并在表 $3 \to 0 \to 4 \to 1 \to 2$ 上追踪。
::: solution
*不变式。* 第 $r$ 轮之后，`next[i]` 是 $i$ 之后 $2^r$ 步的结点（若剩余不足 $2^r$ 步，就是最后一个结点），`rank[i]` 是从 $i$ 到 `next[i]` 的链接数。初始（$r = 0$）`next[i]` 是下一个结点，`rank[i]` 是 $1$；最后一个结点指向自己，秩为 $0$。一轮里，新的 `next[i]` $=$ `next[next[i]]` 是往后 $2^r + 2^r = 2^{r+1}$ 步（在表尾封顶，因为最后一个结点指向自己），新的秩加上从 `next[i]` 到 `next[next[i]]` 的链接数，恰是 `rank[next[i]]`。$\lceil \log n \rceil$ 轮后 $2^r \ge n$，于是每个 `next[i]` 都是最后一个结点、`rank[i]` 就是到它的距离。每轮 $\Theta(n)$ 工作量、跨度 $O(1)$，所以工作量 $\Theta(n \log n)$、跨度 $\Theta(\log n)$——不是工作高效的；随机化与确定性的工作高效表排名算法（用稀疏支配集或独立集消除）做 $O(n)$ 工作量。

*追踪。* 按表次序的结点 $3, 0, 4, 1, 2$：结点 $0..4$ 的 `next` $= [4, 2, 2, 0, 1]$，`rank` $= [1, 1, 0, 1, 1]$。

| 轮 | `rank`（结点 $0..4$） | `next`（结点 $0..4$） |
|---|---|---|
| $0$ | $1, 1, 0, 1, 1$ | $4, 2, 2, 0, 1$ |
| $1$ | $2, 1, 0, 2, 2$ | $1, 2, 2, 4, 2$ |
| $2$ | $3, 1, 0, 4, 2$ | $2, 2, 2, 2, 2$ |
| $3$ | $3, 1, 0, 4, 2$ | $2, 2, 2, 2, 2$ |

结点 $3$ 距表尾 $4$ 个链接，结点 $0$ 是 $3$，结点 $4$ 是 $2$，结点 $1$ 是 $1$，结点 $2$ 是 $0$：正确。（执行 $\lceil \log 5 \rceil = 3$ 轮；最后一轮在这里没有改变任何东西。）
:::
:::

::: exercise 奇偶交换排序 {level=3}
$n$ 条线上的**奇偶交换排序**（odd–even transposition sort）交替两种轮：奇数轮比较线 $(0, 1), (2, 3), \dots$；偶数轮比较 $(1, 2), (3, 4), \dots$。用 0-1 原理证明 $n$ 轮排好任意输入。（提示：追踪最右边的 $1$。）
::: solution
由 [[#thm-zero-one]] 考察有 $k$ 个 $1$ 的 0-1 输入，$1$ 从右往左编号 $1, \dots, k$；第 $j$ 个 $1$ 应在位置 $n - j$。两个观察。(i) 若某个 $1$ 在某轮向右移动，从位置 $q$ 到 $q + 1$，那么下一轮比较的对子 $(q + 1, q + 2)$ 存在，因为相邻轮用的对子奇偶相反；所以它又与右邻比较。(ii) 一个 $1$ 从不向左越过另一个 $1$，所以 $1$ 的相对次序保持。

**断言：** 从第 $j + 1$ 轮起，第 $j$ 个 $1$ 每轮都右移，直到到达位置 $n - j$。$j = 1$ 时：最右 $1$ 的右边全是 $0$，它在第 $1$ 或第 $2$ 轮就与右邻比较，所以最迟第 $2$ 轮开始移动，由 (i) 此后每轮都动直到最后一个位置。$j > 1$ 时对 $j - 1$ 假设断言成立。第 $j$ 个 $1$ 在第 $j$ 或 $j + 1$ 轮与右邻比较（轮是交替的）；只有那个邻位恰是第 $(j-1)$ 个 $1$ 时它才不动。但从第 $j$ 轮起，第 $(j-1)$ 个 $1$ 每轮右移直到归位，所以第 $j$ 个 $1$ 一旦与右边的 $0$ 比较过，就再也不会直接跟在第 $(j-1)$ 个 $1$ 后面——除非第 $(j-1)$ 个 $1$ 已到达位置 $n - j + 1$，那正意味着第 $j$ 个 $1$ 已经归位。于是第 $j$ 个 $1$ 从（最迟）第 $j + 1$ 轮起每轮移动，直到到达 $n - j$。

它出发时位置 $\ge k - j$（它左边有 $k - j$ 个 $1$），所以至多要走 $n - j - (k - j) \le n - j$ 步，到第 $j + (n - j) = n$ 轮必然归位。$n$ 轮后每个 $1$ 都归位，输入已排好。对 $n \le 12$ 的全部 0-1 输入穷举验证了这一点。网络深度 $n$、约 $n^2/2$ 个比较器：低效，但它只需要相邻通信，所以是处理器线性阵列上的天然排序，也是 [[parallel-computing/message-passing]] 中并行排序的基础。
:::
:::
