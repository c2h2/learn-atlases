急诊科并不按到院的先后接诊：最危急的病人先诊治，新来的胸痛病人插到所有踝关节扭伤的病人前面。操作系统挑选优先级最高的可运行进程；网络路由器可能把语音分组排在批量下载之前；仿真程序处理时间戳最早的事件；迪杰斯特拉（Dijkstra）最短路径算法反复确定距离最近的未确定顶点。它们都需要这样一种收集器：能从其中反复**删除优先级最高的元素**，而新元素还不断到来。这种收集器就是**优先队列**。

有序数组能立刻回答“最紧急的是谁？”，却让每次插入花费 $\Theta(n)$；无序数组插入很快，但要找最紧急者就得扫遍全部。**二叉堆**达成的折中让*两种*操作都是 $O(\log n)$，而且结构简单到可以用一个不含任何引用的普通数组存放。本章仔细建立堆：堆性质、两种修复操作上浮与下沉、一个出乎意料的事实——由 $n$ 个元素建堆只花线性时间——以及**堆排序**，一个在最坏情况下有 $O(n\log n)$ 保证的原地排序算法。最后介绍库中的优先队列及其应用。

## 优先队列

::: definition 优先队列 {#def-pq}
**（最小）优先队列**保存取自一个全序集的带有**键**（优先级）的元素，并支持：

- `insert(x)`：加入元素 $x$；
- `find_min()`：返回键最小的元素；
- `extract_min()`：删除并返回键最小的元素；

此外常提供 `decrease_key(x, k)`（降低队列中已有元素的键）、`size()`，以及把 $n$ 个元素一次性建成队列。**最大优先队列**是把其中“最小”换为“最大”。
:::

这个 ADT 对不是最小元的元素之间的次序没有任何规定，而这份自由正是堆所利用的。比较几种显然的实现：

| 实现 | `insert` | `find_min` | `extract_min` |
|---|---|---|---|
| 无序动态数组 | $O(1)$ 摊还 | $\Theta(n)$ | $\Theta(n)$ |
| 有序数组（最小元在末尾） | $\Theta(n)$ | $O(1)$ | $O(1)$ |
| 平衡搜索树 | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| 二叉堆 | $O(\log n)$ | $O(1)$ | $O(\log n)$ |

平衡树（[[data-structures/balanced-trees]]）本已达到 $O(\log n)$，但它维护的是优先队列从不使用的完整次序。堆只维护到足以找到最小元的程度，因此更简单、更小、也更快。

## 二叉堆

::: definition 二叉堆 {#def-heap}
**二叉最小堆**是一棵完全二叉树（[[data-structures/trees]]），其中每个结点的键都不大于其孩子的键——**堆性质**。它按层序存放在数组 $a[0..n-1]$ 中：根是 $a[0]$，$a[i]$ 的孩子是 $a[2i+1]$ 与 $a[2i+2]$，其父结点是 $a[\lfloor (i-1)/2\rfloor]$。用数组的语言，堆性质写作

$$
a[\lfloor (i-1)/2 \rfloor] \le a[i] \qquad \text{对所有 } 1 \le i < n.
$$ {#eq-heap}

**最大堆**则反转不等号。
:::

沿到根的路径归纳可知，每个结点的键都不大于其子树中的任何键；特别地，最小元就在根 $a[0]$，于是 `find_min` 是 $O(1)$。但兄弟、堂兄弟和不同分支之间根本没有任何次序：堆远非有序。由于树是完全的，数组没有空隙，[[data-structures/trees#ex-implicit]] 的下标算术适用；并且由 [[data-structures/trees#thm-height-size]]，它的高度是 $\lfloor\log_2 n\rfloor$，已经是最小可能。

例如，`[1, 3, 2, 5, 9, 8]` 是一个最小堆：$1 \le 3, 2$；$3 \le 5, 9$；$2 \le 8$。画成树形：

```text
          1
        /   \
       3     2
      / \   /
     5   9 8
```

### 插入：上浮

要插入 $x$，就把它放在唯一能保持树完全的位置：第一个空位 $a[n]$，即最后一层末尾的一个新叶。堆性质此时只可能在 $x$ 与其父结点之间被破坏。若 $x$ 小于其父结点，就交换二者；对 $x$ 的新父结点重复此步，直到 $x$ 不再更小，或已成为根。

::: algorithm 上浮 {#alg-sift-up}
**输入：** 数组 $a[0..i]$，除 $a[i]$ 与其祖先之间可能有违外，处处满足 [[#eq-heap]]。

当 $i > 0$ 且 $a[i] < a[p]$（其中 $p = \lfloor (i-1)/2\rfloor$）：交换 $a[i]$ 与 $a[p]$，并令 $i \gets p$。
:::

### 取出最小元：下沉

最小元在根，但删去根会在顶部留下一个洞。因此改为把*最后*一片叶 $a[n-1]$ 移到根（数组缩短一格，仍保持完全），并向下修复：若移入的键大于它的某个孩子，就与**较小**的孩子交换——这是唯一能使新父结点不大于两个孩子的选择——并从那个孩子继续。

::: algorithm 下沉 {#alg-sift-down}
**输入：** 数组 $a[0..n-1]$，其中 $i$ 的两个孩子的子树都是堆。

重复：令 $c$ 为 $i$ 的孩子中键较小的那个（$2i+1$，若 $2i+2$ 存在且更小则取 $2i+2$）；若 $i$ 没有孩子，或 $a[i] \le a[c]$，停止；否则交换 $a[i]$ 与 $a[c]$，并令 $i \gets c$。
:::

::: theorem 堆的操作 {#thm-heap-ops}
上浮与下沉都恢复堆性质。于是 $n$ 个元素的二叉堆上的 `insert` 与 `extract_min` 耗时 $O(\log n)$，至多交换 $\lfloor\log_2 n\rfloor$ 次，而下沉至多做 $2\lfloor\log_2 n\rfloor$ 次键比较。
:::

::: proof
**上浮。** 不变式：[[#eq-heap]] 对每一对父子都成立，至多位置 $i$ 与其父 $p$ 构成的那对例外；并且，若 $i$ 有父结点，则 $a[p]$ 不大于 $i$ 的孩子们。初始时 $i$ 是新叶，第二个条件空真。设 $a[i] < a[p]$ 且交换。旧的 $a[p]$ 移到位置 $i$；由不变式的第二部分它不大于 $i$ 的孩子，所以那些对没有问题。键 $x$ 移到位置 $p$；它小于旧的 $a[p]$，而旧的 $a[p]$ 不大于 $p$ 的另一个孩子，所以 $p$ 之下的对没有问题。若 $p$ 有父 $q$，则 $a[q] \le$ 旧的 $a[p]$（那一对不是违反的一对），而旧的 $a[p] \le$ $p$ 的另一个孩子，于是 $a[q]$ 不大于 $p$ 的任何一个孩子：不变式在 $i \gets p$ 下成立。循环停止时，或者 $i = 0$，或者 $a[i] \ge a[p]$，不再有任何违反。

**下沉。** 不变式：[[#eq-heap]] 处处成立，至多位置 $i$ 与其孩子之间例外。若 $a[i]$ 大于较小的孩子 $a[c]$，交换二者：此时 $a[c]$（旧的孩子）在 $i$ 处，由 $c$ 的选法它不大于另一个孩子，也不小于 $i$ 的父结点（它本来在 $i$ 的子树中，那里的一切键都不小于父结点，因为移入的键 $a[i]$ 是唯一的外来者）。唯一可能违反的对下移到 $c$ 与它的孩子之间。循环在叶处停止，或在 $a[i] \le$ 两个孩子时停止。

**代价。** 每次迭代在高 $\lfloor\log_2 n\rfloor$ 的树中上或下移一层，每层一次比较（上浮）或两次（下沉）。
:::

整个数据结构只有几行 Python：

```python
class MinHeap:
    """Binary min-heap in a Python list: children of i are 2i+1 and 2i+2."""
    def __init__(self, items=()):
        self.a = list(items)
        for i in range(len(self.a) // 2 - 1, -1, -1):   # 建堆：自底向上
            self._sift_down(i)

    def push(self, x):
        self.a.append(x)                  # 最后一层末尾的新叶
        self._sift_up(len(self.a) - 1)

    def pop(self):                        # 删除并返回最小元
        a = self.a
        a[0], a[-1] = a[-1], a[0]         # 把最后的叶移到根
        smallest = a.pop()
        if a:
            self._sift_down(0)
        return smallest

    def _sift_up(self, i):
        a = self.a
        while i > 0 and a[i] < a[(i - 1) // 2]:
            parent = (i - 1) // 2
            a[i], a[parent] = a[parent], a[i]
            i = parent

    def _sift_down(self, i):
        a, n = self.a, len(self.a)
        while True:
            child = 2 * i + 1
            if child >= n:
                return                    # i 是叶
            if child + 1 < n and a[child + 1] < a[child]:
                child += 1                # 两个孩子中较小的
            if a[i] <= a[child]:
                return                    # 此处堆序已成立
            a[i], a[child] = a[child], a[i]
            i = child
```

（构造函数中的循环就是下面 [[#alg-build-heap]] 的线性时间建堆。）

::: example 插入与取出 {#ex-heap-trace}
按次序把 $5, 3, 8, 1, 9, 2$ 压入一个空的 `MinHeap`，写出每次压入后的数组，然后把六个元素全部弹出。
::: solution
```python
h = MinHeap()
for x in [5, 3, 8, 1, 9, 2]:
    h.push(x)
    print("push", x, h.a)
print([h.pop() for _ in range(6)])
```

```console
$ python3 heap.py
push 5 [5]
push 3 [3, 5]
push 8 [3, 5, 8]
push 1 [1, 3, 8, 5]
push 9 [1, 3, 8, 5, 9]
push 2 [1, 3, 2, 5, 9, 8]
[1, 2, 3, 5, 8, 9]
```

压入 $3$：它落在下标 $1$、$5$ 之下，被一路交换上到根。压入 $1$：它落在下标 $3$，其父（下标 $1$）放着 $5$——交换，得 `[3, 1, 8, 5]`——其父现在是根 $3$——再交换：`[1, 3, 8, 5]`，上移两层。压入 $2$：下标 $5$，父下标 $2$ 放着 $8$——交换；父现在是根，$1 < 2$——停止。

第一次 pop 把最后的叶 $8$ 移到根：`[8, 3, 2, 5, 9]`。根的孩子是 $3$ 和 $2$；较小的是 $2$，交换：`[2, 3, 8, 5, 9]`；$8$ 现在在下标 $2$，已是叶，本次 pop 返回 $1$。继续下去，各次 pop 按递增次序返回键——堆排序的第一个预告。
:::
:::

::: quiz
下列哪些数组是最小堆？（选出所有符合的。）
- [x] `[1, 2, 3, 4, 5, 6]`
- [x] `[1, 5, 2, 6, 7, 3]`
- [ ] `[2, 1, 3]`
- [ ] `[1, 3, 2, 4, 5, 1]`
::: solution
对每个 $i \ge 1$ 检查 $a[\lfloor (i-1)/2 \rfloor] \le a[i]$。有序数组总是堆。`[1, 5, 2, 6, 7, 3]`：$1 \le 5, 2$；$5 \le 6, 7$；$2 \le 3$——是堆，尽管远非有序。`[2, 1, 3]` 在根处失败（$2 > 1$）。`[1, 3, 2, 4, 5, 1]` 中，最后一个元素 $1$（下标 $5$）的父在下标 $2$，放着 $2 > 1$。
:::
:::

## 线性时间内建堆

一次给定 $n$ 个元素时，可以逐个压入：$n$ 次插入各花 $O(\log n)$，共 $O(n\log n)$。但有更好的办法。把元素以任意次序放进数组。叶——位置 $\lfloor n/2\rfloor$ 到 $n - 1$——已经是一元素堆。现在把每个内部结点下沉，*从最后一个一直做到根*：到达结点 $i$ 时，它两个孩子的子树都已是堆，恰是 [[#alg-sift-down]] 的前提条件。

::: algorithm 建堆（Floyd） {#alg-build-heap}
对 $i = \lfloor n/2\rfloor - 1, \lfloor n/2\rfloor - 2, \dots, 0$：下沉位置 $i$。
:::

正确性由不变式“*位置 $j > i$ 的每个位置都是一个堆的根*”得出：开始时它成立，因为位置 $j \ge \lfloor n/2\rfloor$ 是叶；每次下沉又使它保持。结束时位置 $0$ 是一个堆的根。

出人意料的是代价。大多数结点靠近底部，而下沉在那里很便宜：一半结点是叶，不花代价；四分之一高度为 $1$，至多花一次交换；只有根可能花 $\log_2 n$。

::: theorem 建堆耗时线性 {#thm-build-heap}
[[#alg-build-heap]] 在 $n$ 个元素的数组上至多做 $2n$ 次键比较、至多交换 $n$ 次。于是堆可以在 $\Theta(n)$ 时间内建成。
:::

::: proof
下沉一个（树中）高度为 $h$ 的结点至多迭代 $h$ 次，每次至多 $2$ 次比较、$1$ 次交换。所以交换总数至多是所有结点高度之和 $S = \sum_v \mathrm{height}(v)$，比较数至多 $2S$。

按高度分层来数 $S$。结点 $v$ 的高度 $\ge h$，当且仅当它有一个在它下方 $h$ 层的后代；在按层序存放的完全树中，这对结点 $i$ 成立，当且仅当它这一族中最左的那个后代——下标 $2^h(i+1) - 1$——存在：$2^h(i+1) - 1 \le n - 1$，即 $i + 1 \le n/2^h$。所以恰有 $\lfloor n/2^h\rfloor$ 个结点高度 $\ge h$。高度为 $k$ 的结点在每个 $h = 1, \dots, k$ 处各被数一次，于是

$$
S = \sum_{h \ge 1} \#\set{v : \mathrm{height}(v) \ge h} = \sum_{h\ge1}\Bigl\lfloor\frac{n}{2^h}\Bigr\rfloor < \sum_{h \ge 1}\frac{n}{2^h} = n.
$$

因此 $S < n$，交换少于 $n$ 次、比较少于 $2n$ 次。下界 $\Omega(n)$ 成立，因为每个元素都必须被查看。
:::

这个界在实践中是紧的：用一个自带计数功能的键类型来数比较次数，输入取递减序列（最小堆的最坏情形，因为每个新元素都是目前最小的）：

```python
class Counter:
    """A number that counts how often it is compared."""
    count = 0
    def __init__(self, v): self.v = v
    def __lt__(self, other):
        Counter.count += 1
        return self.v < other.v
    def __le__(self, other):
        Counter.count += 1
        return self.v <= other.v

for n in [1000, 10_000, 100_000]:
    xs = [Counter(v) for v in range(n, 0, -1)]   # 递减：逐个压入的最坏情形
    Counter.count = 0
    MinHeap(xs)                              # 自底向上建堆
    bottom_up = Counter.count
    Counter.count = 0
    h = MinHeap()
    for x in xs:                             # n 次单独的压入
        h.push(x)
    print(f"n = {n:6d}: build-heap {bottom_up / n:.2f} n, repeated push {Counter.count / n:.2f} n")
```

```console
$ python3 buildheap.py
n =   1000: build-heap 1.98 n, repeated push 7.99 n
n =  10000: build-heap 2.00 n, repeated push 11.36 n
n = 100000: build-heap 2.00 n, repeated push 14.69 n
```

自底向上建堆停留在 $2n$ 次比较（略低于 [[#thm-build-heap]] 的界，保留两位小数把它藏住了）；反复压入则按 $n\log_2 n$ 增长——每个新元素都要一路走到根。（在*随机*输入上，反复压入平均也是线性的，因为随机新元素很少上升超过一两层；差别在最坏情况。）

::: example 建堆 {#ex-build-heap}
对 `[9, 4, 7, 1, 8, 2, 6, 3, 5]` 施行 [[#alg-build-heap]]，写出每次下沉后的数组。
::: solution
这里 $n = 9$，所以依次下沉 $i = 3, 2, 1, 0$。

| $i$（键） | 动作 | 之后的数组 |
|---|---|---|
| 开始 | | `[9, 4, 7, 1, 8, 2, 6, 3, 5]` |
| 3 (1) | 孩子 $3, 5$：$1$ 更小，停止 | `[9, 4, 7, 1, 8, 2, 6, 3, 5]` |
| 2 (7) | 孩子 $2, 6$：与 $2$ 交换；已是叶 | `[9, 4, 2, 1, 8, 7, 6, 3, 5]` |
| 1 (4) | 孩子 $1, 8$：与 $1$ 交换；在下标 3，孩子 $3, 5$：与 $3$ 交换 | `[9, 1, 2, 3, 8, 7, 6, 4, 5]` |
| 0 (9) | 与 $1$（下标 1）交换；再与 $3$（下标 3）交换；再与 $4$（下标 7）交换 | `[1, 3, 2, 4, 8, 7, 6, 9, 5]` |

`MinHeap([9, 4, 7, 1, 8, 2, 6, 3, 5]).a` 返回 `[1, 3, 2, 4, 8, 7, 6, 9, 5]`。总共 $6$ 次交换，低于界 $S = \lfloor 9/2\rfloor + \lfloor 9/4\rfloor + \lfloor 9/8\rfloor = 4 + 2 + 1 = 7$。
:::
:::

::: widget plot
f: 2*x; x*log2(x); 2*x*log2(x)
labels: 2n\ \text{(建堆)}; n\log_2 n\ \text{(逐个插入)}; 2n\log_2 n\ \text{(堆排序)}
x: 1, 1000
y: 0, 20000
caption: 最坏情况比较次数。自底向上建堆至多花 $2n$（[[#thm-build-heap]]），而逐个插入元素约需 $n\log_2 n$；堆排序的第二阶段——$n$ 次取出——至多花 $2n\log_2 n$。前两条曲线之间的差距，正是从结点集中的底部向*下*沉、而不是向*上*浮到顶部所换来的回报。
:::

## 堆排序

堆几乎免费给出一个排序算法：建一个堆，然后做 $n$ 次最小元取出。另用一张输出表需要 $\Theta(n)$ 额外空间，但一个巧妙的技巧能做到**原地**排序。改用*最大*堆。建好之后，最大元素在 $a[0]$；把它与最后一个元素 $a[n-1]$ 交换——那里正是它的最终有序位置——堆缩小一，再把新的根下沉。堆占据数组一个逐渐缩短的前缀，已排好的元素占据一个逐渐增长的后缀。

::: algorithm 堆排序 {#alg-heapsort}
1. 用 [[#alg-build-heap]] 在 $a[0..n-1]$ 上建成最大堆（使用下沉的最大堆版本）。
2. 对 $\mathit{end} = n-1, n-2, \dots, 1$：交换 $a[0]$ 与 $a[\mathit{end}]$；在堆 $a[0..\mathit{end}-1]$ 内下沉位置 $0$。
:::

```python
def sift_down(a, i, n):
    """Restore max-heap order in a[0:n] below position i."""
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if child + 1 < n and a[child + 1] > a[child]:
            child += 1                        # 较大的孩子
        if a[i] >= a[child]:
            return
        a[i], a[child] = a[child], a[i]
        i = child

def heapsort(a):
    n = len(a)
    for i in range(n // 2 - 1, -1, -1):       # 阶段 1：建最大堆
        sift_down(a, i, n)
    print("heap  ", a)
    for end in range(n - 1, 0, -1):           # 阶段 2：把最大元移到末尾
        a[0], a[end] = a[end], a[0]
        sift_down(a, 0, end)                  # 堆现在是 a[0:end]
        print(f"end={end}", a[:end], "|", a[end:])

data = [6, 2, 9, 4, 1, 7]
heapsort(data)
print(data)
```

::: example 追踪堆排序 {#ex-heapsort}
对 `[6, 2, 9, 4, 1, 7]` 运行堆排序，写出每一步之后的堆与已排序后缀。
::: solution
```console
$ python3 heapsort.py
heap   [9, 4, 7, 2, 1, 6]
end=5 [7, 4, 6, 2, 1] | [9]
end=4 [6, 4, 1, 2] | [7, 9]
end=3 [4, 2, 1] | [6, 7, 9]
end=2 [2, 1] | [4, 6, 7, 9]
end=1 [1] | [2, 4, 6, 7, 9]
[1, 2, 4, 6, 7, 9]
```

建最大堆时依次下沉下标 $2$（$9$ 本就不小于它的孩子 $7$）、下标 $1$（$2$ 与较大的孩子 $4$ 交换）和下标 $0$（$6$ 与 $9$ 交换，再与 $7$ 交换），得 `[9, 4, 7, 2, 1, 6]`。阶段 2 的第一步把 $9$ 与最后一个元素 $6$ 交换，$9$ 就此就位；$6$ 从根下沉（与 $7$ 交换），得堆 `[7, 4, 6, 2, 1]`。循环不变式是：*$a[0..\mathit{end}]$ 是由最小的 $\mathit{end}+1$ 个元素组成的最大堆，$a[\mathit{end}+1..n-1]$ 按有序存放着最大的元素。*
:::
:::

::: theorem 堆排序 {#thm-heapsort}
堆排序原地（额外空间 $O(1)$）排序 $n$ 个元素，最坏情况用 $O(n\log n)$ 次比较——至多 $2n + 2n\lfloor\log_2 n\rfloor$。
:::

::: proof
正确性由 [[#ex-heapsort]] 中陈述的循环不变式得出：初始（第一次交换之前，$\mathit{end} = n - 1$）整个数组是一个最大堆，后缀为空。堆 $a[0..\mathit{end}]$ 的根是这 $\mathit{end} + 1$ 个最小元素中最大的；把它换到位置 $\mathit{end}$，就恰好放在已排好的更大元素之前，而下沉恢复 $a[0..\mathit{end}-1]$ 上的堆（根的孩子们都是堆的根，故 [[#alg-sift-down]] 适用）。当 $\mathit{end} = 0$ 时，剩下的那一个元素就是最小元。

代价：阶段 1 至多做 $2n$ 次比较（[[#thm-build-heap]]）；阶段 2 的 $n - 1$ 次下沉各在一个不足 $n$ 个元素的堆上进行，至多做 $2\lfloor\log_2 n\rfloor$ 次比较（[[#thm-heap-ops]]）。除数组外只用了寥寥几个下标变量。
:::

堆排序不需要额外数组，就追平了归并排序 $O(n\log n)$ 的最坏情况，并压过快速排序 $\Theta(n^2)$ 的最坏情况。实践中它通常比这两者都慢，因为它的访存跳跃穿越整个数组（高速缓存局部性差），而且它**不稳定**：相等的键可能改变相对次序。因此库排序把它用作保险绳——**内省排序**（introsort，许多 C++ 标准库采用）先跑快速排序，递归过深时改用堆排序。基于比较的排序在 [[algorithms]] 中完整处理，包括证明 $\Omega(n\log n)$ 次比较是必需的。

::: warning 堆不是有序数组
只有根保证是最小元。第二小的元素是根两个孩子中的一个，但最大元可以是任何一片叶，查找一个任意的键要 $\Theta(n)$ 时间——堆没有搜索树性质可用来指引查找。打印堆的数组并不按次序打印元素（如上面的 `[1, 3, 2, 5, 9, 8]`），遍历 Python 的 `heapq` 列表得到的也是内部次序而非有序列。需要有序或快速查找时，请反复 pop，或使用搜索树。
:::

## 实践中的优先队列

### Python 的 heapq

Python 的 `heapq` 模块在普通 `list` 上实现二叉最小堆，提供的是一组函数而不是一个类：`heappush(h, x)`、`heappop(h)`、`heapify(h)`（Floyd 的线性时间建堆）、`heapreplace`、`nsmallest`、`nlargest` 与 `merge`。没有最大堆接口；常用的技巧是存放取负后的键。元素直接被比较，所以要给不能（或不该）比较的对象赋优先级，就压入元组 `(priority, tie_breaker, item)`，其中递增计数器充当 tie_breaker，使优先级相同的元素保持到来次序，并且绝不让 Python 去比较元素本身：

```python
import heapq
from itertools import count

tasks = []                                  # 一个 (priority, tie, task) 的最小堆
tie = count()                               # 按到来次序打破平局
for priority, task in [(2, "write report"), (1, "fix bug"), (3, "lunch"), (1, "reply")]:
    heapq.heappush(tasks, (priority, next(tie), task))
while tasks:
    priority, _, task = heapq.heappop(tasks)
    print(priority, task)

scores = [72, 95, 61, 88, 99, 47, 83]
print(heapq.nlargest(3, scores))            # k 大小的堆，O(n log k)
print(list(heapq.merge([1, 4, 9], [2, 3, 10], [5])))   # 对有序输入做 k 路归并
```

```console
$ python3 tasks.py
1 fix bug
1 reply
2 write report
3 lunch
[99, 95, 88]
[1, 2, 3, 4, 5, 9, 10]
```

`nlargest(k, …)` 维护所见最大的 $k$ 个元素的最小堆，每来一个更大的元素就替换其根：时间 $O(n\log k)$、空间 $O(k)$，当 $k \ll n$ 时远胜过排序。`merge` 维护 $k$ 路输入各自当前首元素的一个堆，以 $O(N\log k)$ 产出 $N$ 个输出元素——外排序的心脏，磁盘上的有序归并段就是这样合并的。

### 降低键值与迪杰斯特拉算法

有些算法需要把队列中已有元素的键*调低*。在二叉堆里，这就是从该元素的位置上浮——$O(\log n)$——前提是我们知道元素在哪里，这需要一张从元素到下标的辅助表，并在每次交换时更新。迪杰斯特拉最短路径算法是经典用户：它把未确定的顶点按暂定距离放进优先队列，取出最近的，再降低它的邻点的键。

::: widget graph
nodes: A; B; C; D; E
edges: A-B:4; A-C:1; C-B:2; B-D:1; C-D:5; D-E:3
algorithm: dijkstra
start: A
caption: 从 $A$ 出发的迪杰斯特拉算法。逐步执行，观察接下来确定哪个顶点：总是暂定距离最小的未确定顶点——恰是对以距离为键的优先队列做一次 `extract_min`。确定 C 时，B 的距离从 4 降到 3：一次 `decrease_key`。用二叉堆时，$n$ 次取出与至多 $m$ 次降键共花 $O((n + m)\log n)$。
:::

由于 `heapq` 没有 decrease-key，Python 代码通常改用**懒惰删除**：压入一个新表项 `(new_distance, vertex)`，弹出时跳过距离已过时的表项。堆中此时可能有多达 $m$ 个表项，但 $\log m \le 2\log n$，界 $O((n + m)\log n)$ 不变。

::: example 懒惰删除的迪杰斯特拉算法 {#ex-lazy-dijkstra}
用 `heapq` 与懒惰删除实现迪杰斯特拉算法，在上面图例中的图上运行，打印每个被确定的顶点与每个被跳过的表项。
::: solution
```python
import heapq

graph = {"A": {"B": 4, "C": 1}, "B": {"A": 4, "C": 2, "D": 1},
         "C": {"A": 1, "B": 2, "D": 5}, "D": {"B": 1, "C": 5, "E": 3},
         "E": {"D": 3}}

def dijkstra(graph, source):
    dist = {source: 0}
    heap = [(0, source)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            print(f"  skip stale entry ({d}, {u})")
            continue                          # 懒惰删除：u 后来被改进了
        print(f"settle {u} at distance {d}")
        for v, w in graph[u].items():
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w
                heapq.heappush(heap, (d + w, v))   # 代替 decrease_key
    return dist

print(dijkstra(graph, "A"))
```

```console
$ python3 dijkstra.py
settle A at distance 0
settle C at distance 1
settle B at distance 3
  skip stale entry (4, B)
settle D at distance 4
  skip stale entry (6, D)
settle E at distance 7
{'A': 0, 'B': 3, 'C': 1, 'D': 4, 'E': 7}
```

确定 $A$ 时压入 $(4, B)$ 与 $(1, C)$。确定 $C$ 时发现了到 $B$ 的更短路线（$1 + 2 = 3 < 4$），于是压入 $(3, B)$，*并不*删除 $(4, B)$，同时还压入 $(6, D)$。堆中此时留着过时的表项 $(4, B)$，它稍后被弹出并因 $4 > \mathit{dist}[B] = 3$ 而被跳过。类似地，$(6, D)$ 被确定 $B$ 时压入的 $(4, D)$ 取代。每个顶点恰好被确定一次，且就在其正确的距离处；堆中活表项与过时表项合至多 $m$ 个，每次操作花 $O(\log m) = O(\log n)$。
:::
:::

迪杰斯特拉算法及其分析在 [[algorithms]]；它所依托的图表示在 [[data-structures/graph-representations]]。

### 超越二叉堆

**$d$叉堆**让每个结点有 $d$ 个孩子（$i$ 的孩子在 $di + 1, \dots, di + d$）：高度是 $\log_d n$，于是插入与降键更便宜，而 extract-min 每层要比较 $d$ 个孩子、变得更贵——降键频繁时这是划算的交易，而且对高速缓存更友好。**二项堆**与**配对堆**能快速合并两个堆。**斐波那契堆**（弗雷德曼（Fredman）与塔扬（Tarjan））的降键摊还 $O(1)$ 时间、取出最小元摊还 $O(\log n)$，把迪杰斯特拉算法在理论上改进到 $O(m + n\log n)$，不过其常数因子使二叉堆或配对堆在多数实际场合更快。

::: quiz
一个最大堆存放在长度 $n = 31$ 的数组中（高度 $4$ 的完美树）。最小元素可以在哪里？
- [ ] 只能在下标 $30$，即最后一个位置
- [x] 可以在任何一片叶，下标 $15$ 到 $30$
- [ ] 可以在 $1$ 到 $30$ 的任何下标
- [ ] 只能在最左下的叶，下标 $15$
::: solution
最大堆中每个内部结点都不小于其孩子，所以内部结点只有在其子树中所有键都与它相等时才能放着最小元；键互异时，最小元必是一片叶。哪片叶都可能——堆性质对叶之间的次序没有任何说法。$31$ 个结点的完全树中，叶是下标 $\lfloor 31/2\rfloor = 15$ 到 $30$，所以在最大堆中找最小元要 $\Theta(n)$ 时间。
:::
:::

::: history
二叉堆与堆排序由威廉姆斯（J. W. J. Williams）以 "Algorithm 232: Heapsort" 发表于 1964 年的 *Communications of the ACM*；同一年弗洛伊德（Robert Floyd）发表了 "Algorithm 245: Treesort 3"，提出了 [[#alg-build-heap]] 的自底向上线性时间构造。用“堆”一词称呼这个结构出自威廉姆斯的论文（它与动态分配内存的那个“堆区”毫无关系）。马瑟（David Musser）的内省排序（1997）使堆排序成为实用库排序的最坏情况保障。弗雷德曼（Michael Fredman）与塔扬（Robert Tarjan）于 1984 年提出斐波那契堆（期刊版 1987），配对堆随后于 1986 年出现（Fredman、Sedgewick、Sleator 与 Tarjan）。
:::

## 后续内容

堆驱动着 [[algorithms]] 中的贪心与图算法：迪杰斯特拉最短路、普里姆最小生成树、哈夫曼编码（反复合并出现频率最低的两个符号）、事件驱动仿真与 $k$ 路归并。操作系统用优先队列调度进程与定时器（[[operating-systems]]），网络设备用它调度分组（[[networks]]）。这里介绍的完全树的数组表示是一个普遍主题的一个实例：隐式结构用灵活性换紧凑与速度。最后一章 [[data-structures/graph-representations]] 转向这些图算法所依托的结构。

::: summary
- **优先队列**（[[#def-pq]]）支持插入与取出最小元；二叉堆给两者 $O(\log n)$，找最小元 $O(1)$。
- **二叉堆**（[[#def-heap]]）是带堆性质的完全二叉树，存放在数组中，$i$ 的孩子在 $2i+1$、$2i+2$；高度为 $\lfloor\log_2 n\rfloor$。
- 插入添加一片叶并**上浮**；取出最小元把最后的叶移到根，再向较小的孩子**下沉**（[[#thm-heap-ops]]）。
- **建堆**把内部结点自底向上依次下沉，比较至多 $2n$ 次（[[#thm-build-heap]]），因为结点高度之和小于 $n$。
- **堆排序**（[[#alg-heapsort]]）原地排序，最坏情况 $O(n\log n)$，但不稳定且局部性差（[[#thm-heapsort]]）。
- 堆不是有序的：查找是 $\Theta(n)$。Python 的 `heapq` 是建立在列表上的最小堆；用 `(priority, counter, item)` 元组和懒惰删除代替 decrease-key。
:::

## 习题

::: exercise 下标算术 {level=1 check="20"}
在以按下标 $0$ 开始的数组中存放的堆里，下标 $4$ 的结点的左孩子的右孩子在下标几？（填入下标。）
::: solution
$4$ 的左孩子是 $2\cdot4+1 = 9$，$9$ 的右孩子是 $2\cdot 9 + 2 = 20$。往回验证：$20$ 的父是 $\lfloor 19/2\rfloor = 9$，$9$ 的父是 $\lfloor 8/2\rfloor = 4$，正如应该的那样。
:::
:::

::: exercise 向堆压入 {level=1}
把 $4$ 压入最小堆 `[1, 3, 2, 5, 9, 8]`。写出交换与所得数组。
::: solution
$4$ 放在下标 $6$，其父是下标 $\lfloor 5/2\rfloor = 2$，放着 $2$。由于 $4 \ge 2$，不需要交换：`[1, 3, 2, 5, 9, 8, 4]`。（若压入的是 $0$，则会先与 $2$ 交换、再与 $1$ 交换，最后停在根。）
:::
:::

::: exercise 高度之和 {level=1 check="26"}
对 $n = 30$ 计算 $S = \sum_{h \ge 1}\lfloor n/2^h\rfloor$，即堆的结点高度之和。（填入数目。）
::: solution
$\lfloor 30/2\rfloor + \lfloor 30/4\rfloor + \lfloor 30/8\rfloor + \lfloor 30/16\rfloor = 15 + 7 + 3 + 1 = 26$。由 [[#thm-build-heap]]，建一个 $30$ 元素的堆至多交换 $26$ 次、比较 $52$ 次。
:::
:::

::: exercise 追踪 pop {level=2}
从 [[#ex-build-heap]] 中建成的堆 `[1, 3, 2, 4, 8, 7, 6, 9, 5]` 弹出最小元，写出每次交换。
::: solution
把最后一个元素 $5$ 移到根：`[5, 3, 2, 4, 8, 7, 6, 9]`。根的孩子：$3$ 和 $2$；较小的是 $2$（下标 $2$）；$5 > 2$，交换：`[2, 3, 5, 4, 8, 7, 6, 9]`。下标 $2$ 的孩子：$7$ 和 $6$；较小者 $6$；$5 < 6$，停止。本次 pop 返回 $1$，堆为 `[2, 3, 5, 4, 8, 7, 6, 9]`。
:::
:::

::: exercise 第 $k$ 小 {level=2}
给出一个用堆在 $O(n + k\log n)$ 时间内找出 $n$ 个元素中第 $k$ 小的算法，再给出一个用 $O(n\log k)$ 时间、仅 $O(k)$ 额外空间的算法。$k = \sqrt n$ 时哪个更好？
::: solution
(1) 用 $O(n)$ 把全部 $n$ 个元素建成最小堆（[[#thm-build-heap]]），pop $k$ 次，$O(k\log n)$；最后一次 pop 出的元素即第 $k$ 小。

(2) 扫描元素，维护所见最小的 $k$ 个元素的*最大*堆：前 $k$ 个压入；此后每个元素，若小于堆的最大元，就用它替换最大元并下沉（$O(\log k)$）。结束时堆的最大元就是第 $k$ 小。时间 $O(n\log k)$，空间 $O(k)$。

$k = \sqrt n$ 时，(1) 花 $O(n + \sqrt n\log n) = O(n)$，(2) 花 $O(n\log\sqrt n) = O(n\log n)$；(1) 更快，但需要修改或复制整个输入，(2) 可以在数据流上进行。（不用堆的线性时间选择见 [[algorithms]]。）
:::
:::

::: exercise 堆排序不稳定 {level=2}
给一个小输入，说明堆排序（[[#alg-heapsort]]）不稳定。使用只按第一个分量比较的配对，例如 `(1, 'a'), (1, 'b')`。
::: solution
对 `[(1, 'a'), (1, 'b')]` 按第一个分量排序。建堆：根 $(1, a)$ 不小于它的孩子 $(1, b)$，什么都不动。阶段 2 交换 $a[0]$ 与 $a[1]$，得 `[(1, 'b'), (1, 'a')]`：两个相等的键交换了相对次序。稳定的排序（归并排序、插入排序、Python 的 `sorted`）绝不会这样。
:::
:::

::: exercise 带位置表的降低键值 {level=3}
扩展 `MinHeap`，存放 `(key, item)` 对并配合一张把每个元素映到其下标的字典 `pos`，使 `decrease_key(item, new_key)` 在 $O(\log n)$ 内完成。哪些方法必须更新 `pos`，它们应维持什么不变式？实现它，并在小例子上测试。
::: solution
不变式：对堆中每个元素 $x$，`self.a[self.pos[x]]` 就是存放 $x$ 的那个对。每个移动元素的操作——`_sift_up` 与 `_sift_down` 中的交换、`pop` 中根与最后叶的交换、`push` 中的 `append`——都必须更新 `pos`；`pop` 还要删除被移出的元素。

```python
class IndexedMinHeap:
    def __init__(self):
        self.a, self.pos = [], {}            # a 存放 [key, item] 对

    def _swap(self, i, j):
        a = self.a
        a[i], a[j] = a[j], a[i]
        self.pos[a[i][1]], self.pos[a[j][1]] = i, j

    def _up(self, i):
        while i > 0 and self.a[i][0] < self.a[(i - 1) // 2][0]:
            self._swap(i, (i - 1) // 2)
            i = (i - 1) // 2

    def _down(self, i):
        n = len(self.a)
        while 2 * i + 1 < n:
            c = 2 * i + 1
            if c + 1 < n and self.a[c + 1][0] < self.a[c][0]:
                c += 1
            if self.a[i][0] <= self.a[c][0]:
                return
            self._swap(i, c)
            i = c

    def push(self, item, key):
        self.a.append([key, item])
        self.pos[item] = len(self.a) - 1
        self._up(len(self.a) - 1)

    def pop(self):
        self._swap(0, len(self.a) - 1)
        key, item = self.a.pop()
        del self.pos[item]
        if self.a:
            self._down(0)
        return item, key

    def decrease_key(self, item, key):
        i = self.pos[item]
        assert key <= self.a[i][0], "keys may only decrease"
        self.a[i][0] = key
        self._up(i)                          # 更小的键只可能向上移动

h = IndexedMinHeap()
for item, key in [("A", 0), ("B", 4), ("C", 1), ("D", 7)]:
    h.push(item, key)
print(h.pop())                               # ('A', 0)
h.decrease_key("D", 2)
print([h.pop() for _ in range(3)])           # C, D, B
```

```console
$ python3 indexed.py
('A', 0)
[('C', 1), ('D', 2), ('B', 4)]
```

每次交换只做 $O(1)$ 的字典工作，所以各操作都仍是 $O(\log n)$。
:::
:::

::: exercise 逐个插入建堆的下界 {level=3}
证明：把键 $n, n-1, \dots, 1$ 逐个插入一个最初为空的二叉最小堆，会做 $\sum_{i=1}^{n-1}\lfloor\log_2(i+1)\rfloor = \Theta(n\log n)$ 次交换，因此 [[#thm-build-heap]] 的线性界确实依赖于自底向上建堆。
::: solution
插入键 $n - i$ 时（$i = 1, \dots, n-1$），堆中有 $i$ 个键，全部大于它。新叶在下标 $i$，深度为 $\lfloor\log_2(i+1)\rfloor$；它小于每个祖先，于是上浮把它一路换到根：$\lfloor\log_2(i+1)\rfloor$ 次交换。总数为 $\sum_{i=1}^{n-1}\lfloor\log_2(i+1)\rfloor$。至少一半的项（$i \ge n/2$ 的那些）不小于 $\lfloor\log_2(n/2)\rfloor \ge \log_2 n - 2$，所以和不小于 $\tfrac n2(\log_2 n - 2) = \Omega(n\log n)$；而每一项至多 $\log_2 n$，故它为 $O(n\log n)$。上面的测量（$n = 10^5$ 时约 $14.7n$ 次比较）显示出同样的增长。
:::
:::
