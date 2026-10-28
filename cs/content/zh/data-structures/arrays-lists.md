一个音乐播放器维护着一张播放列表。你可以直接跳到第 300 首歌；你在末尾添加歌曲；也时不时地在中间插入一首或删掉一首。程序应当如何存放这张表？答案有根本不同的两种，而本课程中几乎每一个数据结构都由其中一种构造，或同时由两种构造：要么把元素**并排**存放在一整块连续内存中，于是任何元素都可以由它的位置做算术找到；要么把每个元素连同指向下一个元素的引用存放在**任意**地方，于是增删元素只需改动一两个引用。

本章同时研究这两种。我们将看到为什么连续数组给出常数时间的索引、却付出昂贵的插入代价；**动态数组**——Python 的 `list`、Java 的 `ArrayList`、C++ 的 `std::vector`——如何通过倍增来增长，并且仍然*在任意操作序列上取平均*以常数时间追加，由此引出我们第一次**摊还分析**；以及**单链表与双向链表**如何用索引换取廉价的插入与删除。最后我们在真实硬件上比较两者——在那里，存储器高速缓存会改变整个图景。

## 连续数组

::: definition 数组 {#def-array}
长度为 $n$ 的**数组**把元素 $a[0], a[1], \dots, a[n-1]$ 存放在一整块连续内存中，每个元素都占 $w$ 字节。若这块内存的起始地址为 $b$，则 $a[i]$ 占据从下面地址开始的 $w$ 个字节：

$$
\operatorname{addr}(a[i]) = b + i\cdot w.
$$ {#eq-address}
:::

因为 [[#eq-address]] 只是一次乘法加一次加法，在 RAM 模型（[[data-structures/asymptotic-analysis#def-ram]]）下，无论 $i$ 是什么，读写 $a[i]$ 都花费 $O(1)$。这正是数组的定义性优势。C 语言把这步算术直接暴露出来：`a[i]` *就是* `*(a + i)`，即 `a` 之后第 $i$ 个元素的地址里的内容。

```c
#include <stdio.h>
#include <stdint.h>

int main(void) {
    int32_t a[5] = {10, 20, 30, 40, 50};
    double d[3] = {1.5, 2.5, 3.5};
    for (int i = 0; i < 5; i++)          /* a[i] 相对 a[0] 的字节偏移 */
        printf("a[%d] = %d at offset %td\n", i, a[i],
               (char *)&a[i] - (char *)&a[0]);
    for (int i = 0; i < 3; i++)
        printf("d[%d] = %.1f at offset %td\n", i, d[i],
               (char *)&d[i] - (char *)&d[0]);
    printf("*(a + 3) = %d\n", *(a + 3)); /* a[i] 定义为 *(a + i) */
    return 0;
}
```

```console
$ gcc -std=c17 -Wall -Wextra address.c -o address && ./address
a[0] = 10 at offset 0
a[1] = 20 at offset 4
a[2] = 30 at offset 8
a[3] = 40 at offset 12
a[4] = 50 at offset 16
d[0] = 1.5 at offset 0
d[1] = 2.5 at offset 8
d[2] = 3.5 at offset 16
*(a + 3) = 40
```

偏移量对 32 位整数按 $w = 4$ 字节递增，对 double 按 $w = 8$ 字节递增，与 [[#eq-address]] 所说完全一致。（我们打印的是偏移而非真实地址，因为地址每次运行都在变。）Python 列表（[[programming-1/sequences]]）也是数组，只不过存的是*引用*：每个槽位放着一个 8 字节的指针，指向存放在别处的对象，这就是为什么一个列表可以同时装下一个整数、一个字符串和另一个列表。

弱点是同一枚硬币的另一面。既然位置由算术固定，那么要在位置 $i$ 插入一个元素，就必须把 $i$ 及其后的每个元素都向右移一格。

::: proposition 数组的插入代价 {#prop-array-insert}
在一个已存放 $n$ 个元素（且尚有余量）的数组的位置 $i$ 插入一个元素，要移动 $n - i$ 个元素；删除位置 $i$ 的元素要移动 $n - i - 1$ 个。最坏情况（$i = 0$）下两者都是 $\Theta(n)$；在末尾（分别为 $i = n$ 与 $i = n-1$）则是 $O(1)$。
:::

::: proof
插入之后，原先位于 $i, \dots, n-1$ 的元素由 [[#eq-address]] 必须移到 $i+1, \dots, n$；这 $n - i$ 个元素每个都被复制一次（从右端往左进行，以免覆盖），其余元素都不动。删除是对称的：位置 $i+1, \dots, n-1$ 向左移一格。
:::

::: example 从表头开始构造数组 {#ex-front}
从一个容量足够的空数组开始，每次在位置 $0$ 插入一个元素，共插入 $n$ 个。总共移动多少个元素？如果改为每次都插在末尾呢？
::: solution
数组已存放 $k$ 个元素时，在位置 $0$ 插入要把全部 $k$ 个移动（[[#prop-array-insert]] 取 $i = 0$）。这 $n$ 次插入发生在规模 $k = 0, 1, \dots, n-1$ 时，所以总数为

$$
0 + 1 + \dots + (n-1) = \frac{n(n-1)}{2} = \Theta(n^2).
$$

$n = 1000$ 时是 $499\,500$ 次移动。插在末尾则一个都不移动：总共 $n$ 次写入，$\Theta(n)$。若最终需要逆序存放，更省的做法是把元素全部追加到末尾、最后把数组整体翻转一次（$\lfloor n/2\rfloor$ 次交换），而不是逐个往表头插入。
:::
:::

若插入位置在 $0, \dots, n$ 上均匀随机，期望移动次数为 $\frac{1}{n+1}\sum_{i=0}^{n}(n-i) = n/2$：仍是线性的。数组善于读取、善于改动末端，而不善于改动中间。

## 动态数组

普通数组的长度在创建时就固定了。可程序很少事先知道要存放多少个元素。**动态数组**把固定规模藏了起来：它把元素存放在一个数组（它的**存储块**）里，块的**容量** $C \ge n$；当一次追加发现块已满，它就分配一个更大的块，把元素复制过去，再释放旧块。

全部问题在于*大多少*。每次只多空出一格，则第 $k$ 次追加要复制 $k - 1$ 个元素，$n$ 次追加总共 $0 + 1 + \dots + (n-1) = \Theta(n^2)$。每次固定多扩出 $c$ 格，也只把系数改善 $c$ 倍：总数仍是约 $n^2/(2c)$。正确的做法是按常数*倍数*增长。

::: algorithm 倍增式动态数组追加 {#alg-append}
数组规模为 $n$，容量为 $C$（初始 $C = 1$，$n = 0$），存储块为 $B[0..C-1]$。

1. 若 $n = C$：
   1. 分配容量为 $2C$ 的新块 $B'$。
   2. 把 $B[0..n-1]$ 复制进 $B'[0..n-1]$；释放 $B$；置 $B \gets B'$、$C \gets 2C$。
2. $B[n] \gets x$；$n \gets n + 1$。
:::

一个直接实现，附带一个记录扩容引起复制次数的计数器（用 Python 列表代替原始定长存储块）：

```python
class DynamicArray:
    """A growable array on top of fixed-size blocks, doubling when full."""
    def __init__(self):
        self.capacity = 1
        self.n = 0
        self.block = [None] * self.capacity   # 代替一块定长内存
        self.copies = 0                       # 扩容引起的元素复制次数

    def append(self, x):
        if self.n == self.capacity:           # 满了：搬进大一倍的块
            new = [None] * (2 * self.capacity)
            for i in range(self.n):
                new[i] = self.block[i]
                self.copies += 1
            self.block, self.capacity = new, 2 * self.capacity
        self.block[self.n] = x
        self.n += 1

    def __getitem__(self, i):
        if not 0 <= i < self.n:
            raise IndexError(i)
        return self.block[i]
```

::: example 倍增追加的跟踪 {#ex-doubling-trace}
向一个空的 `DynamicArray` 追加 $1, 2, \dots, 17$。每次追加之后，容量是多少？到此时为止的复制总数是多少？
::: solution
扩容发生在某次追加发现 $n = C$ 之前，即追加第 $2, 3, 5, 9, 17$ 个元素之前（此时 $n = 1, 2, 4, 8, 16$）；扩容复制 $n$ 个元素并把 $C$ 翻倍。

| 追加第 $k$ 个 | 1 | 2 | 3 | 4 | 5 | 6–8 | 9 | 10–16 | 17 |
|---|---|---|---|---|---|---|---|---|---|
| 其后容量 | 1 | 2 | 4 | 4 | 8 | 8 | 16 | 16 | 32 |
| 累计复制 | 0 | 1 | 3 | 3 | 7 | 7 | 15 | 15 | 31 |

对上面的类，每次追加后打印 `k, d.capacity, d.copies`，得到的正是这些值。第 17 次追加单独就要花 $16$ 次复制，但 17 次追加之后的总数也只有 $31 < 2\cdot 17$。昂贵的追加是稀少的，而且随着数组变长它们变得更加稀少，恰好稀少到足以让总数保持线性。
:::
:::

这个跟踪提示：虽然单次追加可能花费 $\Theta(n)$，$n$ 次追加组成的*序列*却只花费 $O(n)$。这类陈述有一个名字。

::: definition 摊还代价 {#def-amortised}
设某数据结构支持若干操作，$c_i$ 是一个序列中第 $i$ 次操作的实际代价。若配给各次操作的数值 $\hat c_i$ 满足：对从初始（空）结构出发的每个操作序列、以及它的每个前缀，都有

$$
\sum_{i=1}^{k} c_i \;\le\; \sum_{i=1}^{k} \hat c_i ,
$$

则称 $\hat c_i$ 是合法的**摊还代价**。此时若每个 $\hat c_i = O(1)$，我们就说该操作花费“摊还 $O(1)$ 时间”。
:::

摊还代价是关于*总和*的最坏情况保证：不涉及任何概率，且对一切序列——包括对手构造的序列——都成立。它不承诺的是每个单独的操作很快——单次追加仍可能花 $\Theta(n)$ 时间，这在一次长停顿都不可接受的实时系统里是要紧的。

::: theorem 倍增式追加的摊还时间为 O(1) {#thm-doubling}
从容量为 $1$ 的空动态数组出发，任意 $n$ 次追加执行的元素复制总数少于 $2n$，因此总代价（复制加写入）小于 $3n$。于是每次追加的摊还代价为 $3$，并且 $n \ge 1$ 时数组占用的槽位数从不超过 $2n$。
:::

::: proof
**聚合法。**扩容发生在规模到达 $1, 2, 4, \dots, 2^k$ 之时，其中 $2^k$ 是小于 $n$ 的 $2$ 的最大幂（正是那次会把规模推向 $2^k + 1$ 的追加触发了该次扩容）。规模为 $2^j$ 时的扩容复制 $2^j$ 个元素，故复制总数为

$$
1 + 2 + 4 + \dots + 2^k = 2^{k+1} - 1 < 2\cdot 2^k < 2n.
$$

加上 $n$ 次新元素的写入，总数小于 $3n$。同一论证适用于序列的每个前缀，所以取 $\hat c_i = 3$ 是合法的。最后，容量为 $1$ 或 $2^{k+1}$ 且 $2^k < n$，故至多 $2n$（$n \ge 1$）。

**会计法**（第二种证明，它解释*为什么*）。对每次追加记 $3$ 个单位的费用：一个单位支付该元素的写入，另两个单位作为信用额存记在那个元素上。考虑一次从容量 $C$ 扩到 $2C$ 的扩容，$C \ge 2$。自上次扩容（扩到容量 $C$）以来，位于位置 $C/2, \dots, C-1$ 的 $C/2$ 个元素都是新追加的，每个留下 $2$ 个信用额：共 $C$ 个信用额，恰好够付复制全部 $C$ 个元素。第一次扩容（$C = 1$）复制一个元素，由第一次追加留下的两个信用额支付。信用额永不为负，所以记下的费用总能付清实际代价。
:::

同一论证对任何增长倍数 $\alpha > 1$ 都成立：复制次数构成一个等比数列，其最大项小于 $n$，故总数小于 $n(1 + 1/\alpha + 1/\alpha^2 + \dots) = n\alpha/(\alpha - 1)$（忽略容量的取整）。$\alpha$ 越小，浪费的内存越少但复制越多：$\alpha = 2$ 给出少于 $2n$ 次复制和至多 $50\%$ 的空闲空间；$\alpha = 1.5$ 给出少于 $3n$ 次复制和至多三分之一的空闲空间。

::: widget plot
f: x + 2^(floor(log2(x - 1)) + 1) - 1; 3*x; x + c*floor((x - 1)/c)*(floor((x - 1)/c) + 1)/2
labels: \text{倍增}; 3n; \text{每次增加 } c \text{ 格}
sliders: c=1:1:40
x: 2, 200
y: 0, 1500
caption: $n$ 次追加的总代价（写入加复制），倍增从容量 $1$ 起步，每次增加 $c$ 格则从容量 $c$ 起步。倍增曲线在每个 $2$ 的幂处跳升，但始终位于 [[#thm-doubling]] 的那条直线 $3n$ 之下。把 $c$ 调大：按常数增长确实推迟了曲线爆发，但它仍是抛物线，约 $n^2/(2c)$。
:::

### 缩减容量

若元素还能从末尾删除，我们可能想把内存归还出去。那条诱人的规则“数组半空时容量减半”是个陷阱。设数组已满，$n = C$：一次追加把容量倍增至 $2C$ 并复制 $C$ 个元素；接着一次删除把规模带回 $C$，恰为 $2C$ 之半，于是数组减半并再复制 $C$ 个元素；此时它又是满的，下一次追加将再次倍增。追加与删除交替进行，会使*每次*操作都复制约 $n$ 个元素。标准的解决办法是在两个阈值之间留出空档：满时倍增，缩到**四分之一**满时才减半。无论哪一种扩容或缩容之后，数组都恰好半满，因此下一次扩容或缩容之前至少发生 $C/4$ 次廉价操作，它们足以付账。于是从末尾弹出也是摊还 $O(1)$ 时间（见 [[#exr-shrink]]）。

### Python 的 list

Python 的 `list` 是一个引用的动态数组。CPython 并不倍增：截至 3.14 版，一次追加发现块满时，把块扩到约 $n + n/8 + 6$ 个槽位，再取整到 $4$ 的倍数——增长倍数约 $1.125$，用多一些的复制换取少一些的空间浪费。用 `sys.getsizeof` 可以观察这个过程，它报告列表对象的大小，其中包括存放 8 字节指针的那一块：

```python
import sys
a = []
last = sys.getsizeof(a)
print(f"len  0: {last} bytes")
for i in range(1, 65):
    a.append(i)
    size = sys.getsizeof(a)
    if size != last:                   # 列表恰好在此刻扩大了存储块
        print(f"len {len(a):2d}: {size} bytes")
        last = size
```

```console
$ python3 growth.py
len  0: 56 bytes
len  1: 88 bytes
len  5: 120 bytes
len  9: 184 bytes
len 17: 248 bytes
len 25: 312 bytes
len 33: 376 bytes
len 41: 472 bytes
len 53: 568 bytes
```

减去 56 字节的头部再除以 $8$，得到容量 $4, 8, 16, 24, 32, 40, 52, 64$。这是实现细节，它在不同版本之间变过，以后还可能再变；语言在实践中真正保证的，是摊还 $O(1)$ 的追加。

::: warning Python 的 list 不是链表
这个名字误导了许多初学者。`a.append(x)`、`a.pop()`、`a[i]` 很快，但 `a.insert(0, x)`、`a.pop(0)`、`del a[0]` 会移动所有元素，花费 $\Theta(n)$（[[#prop-array-insert]]）。用 `insert(0, x)` 构造列表的循环是二次的。作者机器上的一次运行（2026 年；这是观测，你的数字会不同）：

```console
n =  25000  append 0.0024 s   insert(0) 0.0961 s
n =  50000  append 0.0045 s   insert(0) 0.4959 s
n = 100000  append 0.0086 s   insert(0) 2.4992 s
```

$n$ 加倍时，`append` 的时间加倍，`insert(0)` 的时间变为四倍或更多。要在两端同时增删，请用 `collections.deque`（[[data-structures/stacks-queues]]）。
:::

::: quiz
一个满时倍增的动态数组当前规模 $n = 1024$、容量 $1024$。哪个陈述正确？
- [ ] 下一次追加花费 $O(1)$，因为追加是摊还 $O(1)$ 的。
- [x] 下一次追加复制 1024 个元素，但紧随其后的 1023 次追加什么都不复制。
- [ ] 从现在起每次追加都会复制整个数组。
- [ ] 摊还分析假定追加按随机顺序发生。
::: solution
数组已满，所以下一次追加会扩容到容量 $2048$ 并复制全部 $1024$ 个元素：摊还 $O(1)$ 并不意味着每个操作都便宜。此后规模为 $1025$，第 $1026$ 到 $2048$ 次追加都装得下而无需复制。摊还界对一切序列成立，其中没有任何随机性。
:::
:::

## 链表

**链表**放弃了连续性。每个元素住在自己的小记录——一个**结点**——里，结点同时还存放指向下一个结点的引用。

::: definition 单链表 {#def-linked-list}
**结点**是含两个字段的记录：`value` 与 `next`，其中 `next` 是指向另一个结点的引用，或为空引用（Python 中的 `None`，C 中的 `NULL`）。一个**单链表**由一个指向其首结点的引用 `head` 给出；从 `head` 出发沿 `next` 引用顺次访问便按序遍历各结点，最终到达某个 `next` 为空的结点。空链表的 `head` 为空。
:::

::: widget graph
nodes: head@0,0; 10@1,0; 20@2,0; 25@3,0; 30@4,0; None@5,0
edges: head>10; 10>20; 20>25; 25>30; 30>None
caption: 在下面这个程序里执行 `insert_after(find(20), 25)` 之后的单链表。每条箭头是一个 `next` 引用；结点可以住在内存中的任何地方。插入 25 只创建了一个结点、改动了一条箭头（20 → 30 变成 20 → 25），与链表的长度无关。拖动结点试试：链表是由箭头定义的，不是由位置定义的。
:::

```python
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next          # 后继结点，表尾处为 None

class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, x):      # O(1)：新结点指向旧的 head
        self.head = Node(x, self.head)

    def find(self, x):            # O(n)：沿链查找，直到 x 或表尾
        p = self.head
        while p is not None and p.value != x:
            p = p.next
        return p

    def insert_after(self, p, x): # 一旦持有结点 p 的引用，代价为 O(1)
        p.next = Node(x, p.next)

    def remove_front(self):       # O(1)
        x = self.head.value
        self.head = self.head.next
        return x

    def __iter__(self):
        p = self.head
        while p is not None:
            yield p.value
            p = p.next

L = LinkedList()
for x in [30, 20, 10]:
    L.push_front(x)
print(list(L))
L.insert_after(L.find(20), 25)
print(list(L))
print(L.remove_front(), list(L))
```

```console
$ python3 linked.py
[10, 20, 30]
[10, 20, 25, 30]
10 [20, 25, 30]
```

这里的代价恰是数组的镜像。没有地址算术，所以要到达第 $i$ 个结点就得沿链走 $i$ 步：$\Theta(i)$ 时间，按值查找最坏情况是 $\Theta(n)$。但一旦我们持有某个结点的引用，在它之后插入或删除它的后继都只改动常数个引用，无论链表多长。而且链表从不需要扩容；每个结点都在需要时才分配。

::: example 原地反转链表 {#ex-reverse}
写一个循环，通过改动 `next` 引用原地反转一个单链表，附加空间 $O(1)$，并对 $1 \to 2 \to 3$ 跟踪执行过程。
::: solution
沿链表往前走，把每个箭头掉个头。保持 `prev`（已经反转的部分）与 `cur`（剩下的部分）：

```python
def reverse(L):
    prev, cur = None, L.head
    while cur is not None:
        nxt = cur.next      # 记下表的剩余部分
        cur.next = prev     # 把这个结点的箭头掉头
        prev, cur = cur, nxt
    L.head = prev
```

| 步骤 | `prev`（已反转部分） | `cur`（剩余部分） |
|---|---|---|
| 开始 | （空） | $1 \to 2 \to 3$ |
| 1 | $1$ | $2 \to 3$ |
| 2 | $2 \to 1$ | $3$ |
| 3 | $3 \to 2 \to 1$ | （空） |

循环不变式是：*`prev` 是已访问结点逆序排成的链表，`cur` 是尚未访问的结点排成的链表*。开始时没有访问过任何结点，它成立；每次迭代把 `cur` 头部的一个结点移到 `prev` 的头部。`cur` 为空时，`prev` 就是整个表的逆序。每个结点恰好访问一次：$\Theta(n)$ 时间，$O(1)$ 附加空间。在覆盖 `cur.next` 之前先把表剩余部分存进 `nxt` 是至关重要的——否则链表的后面部分就丢失了。
:::
:::

::: example 单链表按值删除 {#ex-delete-value}
为 `LinkedList` 写出 `remove(self, x)`，删除第一个值为 `x` 的结点（若存在），并对表 $10 \to 20 \to 25 \to 30$、$x = 25$ 跟踪执行过程。
::: solution
要把一个结点摘链，必须改动它*前驱*的 `next`，所以我们带着两个引用往前走，`prev` 落后 `p` 一步。头结点没有前驱，是特殊情况。

```python
def remove(self, x):
    prev, p = None, self.head
    while p is not None and p.value != x:
        prev, p = p, p.next
    if p is None:
        return False            # 表中没有 x
    if prev is None:
        self.head = p.next      # 删除首结点
    else:
        prev.next = p.next      # 绕过 p
    return True
```

| 步骤 | `prev` | `p` | 测试 `p.value != 25` |
|---|---|---|---|
| 开始 | `None` | 结点 10 | 真，前进 |
| 1 | 结点 10 | 结点 20 | 真，前进 |
| 2 | 结点 20 | 结点 25 | 假，停止 |

此时 `prev` 是结点 20，`prev.next = p.next` 让 20 指向 30，链表成为 $10 \to 20 \to 30$。结点 25 不再可达；Python 的垃圾回收器将回收它（在 C 里我们要 `free` 它）。查找位于位置 $k$ 的值花费 $\Theta(k)$；摘链本身是 $O(1)$。对头结点的特殊处理，恰恰就是哨兵能消除的东西，我们马上就看到。
:::
:::

### 双向链表与哨兵

单链表只持有待删结点自身的引用时无法把它删掉：必须改动*前驱*的 `next`，而寻找前驱要从表头走一趟。**双向链表**在每个结点同时存放 `next` 与 `prev` 引用，代价是每个结点多一个引用。这样，仅凭指向结点自身的引用就能在 $O(1)$ 时间内把它摘链，链表也可以双向遍历。

链表的代码因特殊情况太多而出名：向空表插入、删除首结点或尾结点。**哨兵**——一个不带值、永远在场的哑结点——能把它们全部消除。在带哨兵 `nil` 的**循环双向链表**中，`nil.next` 是首结点，`nil.prev` 是尾结点；空表就是 `nil` 在两个方向上都指向自己。于是每个真实结点都有真实的前驱与后继，一段代码就能处理所有位置。

```python
class DNode:
    def __init__(self, value=None):
        self.value = value
        self.prev = self.next = self   # 孤身一个结点自成一圈

class DList:
    """Circular doubly linked list with a sentinel: no special cases at the ends."""
    def __init__(self):
        self.nil = DNode()             # 哨兵；nil.next 是首结点，nil.prev 是尾结点

    def insert_after(self, p, x):      # O(1)
        q = DNode(x)
        q.prev, q.next = p, p.next
        p.next.prev = q
        p.next = q
        return q

    def push_back(self, x):
        return self.insert_after(self.nil.prev, x)

    def remove(self, q):               # O(1)：只凭 q 本身把它摘链
        q.prev.next = q.next
        q.next.prev = q.prev
        return q.value

    def __iter__(self):
        p = self.nil.next
        while p is not self.nil:
            yield p.value
            p = p.next

D = DList()
nodes = [D.push_back(c) for c in "abcde"]
D.remove(nodes[2])                     # 不用查找就删除 "c"
D.remove(nodes[0])                     # 删除首结点也毫无二致
D.insert_after(D.nil, "z")             # 在表头插入
print(list(D))
```

```console
$ python3 dlist.py
['z', 'b', 'd', 'e']
```

能按引用 $O(1)$ 删除的双向链表，出现在别的东西知道元素位置、而元素又必须被廉价挪动的任何地方：**LRU 缓存**把表项按使用先后存进一个双向链表，再配一张哈希表（[[data-structures/hash-tables]]），把每个键映到它的结点，于是一个刚被使用的表项能在 $O(1)$ 时间内摘下并移到最前面。

::: quiz
在双向链表中，你持有指向中间某个结点 `q` 的引用。哪个操作**不能**在 $O(1)$ 时间完成？
- [ ] 删除 `q`。
- [ ] 在 `q` 的紧前方插入一个新结点。
- [x] 求出 `q` 在链表中的位置（下标）。
- [ ] 把 `q` 移到链表最前面。
::: solution
删除 `q`、在它旁边插入、把它挪动（先删除，再插到哨兵之后）各只改动常数个引用。但结点不知道自己的下标；要算下标就得从表头走一遍数过去，最坏 $\Theta(n)$。
:::
:::

## 数组与链表的比较

| 操作 | 数组 / 动态数组 | 单链表 | 双向链表 |
|---|---|---|---|
| 访问第 $i$ 个元素 | $O(1)$ | $\Theta(i)$ | $\Theta(\min(i, n-i))$ |
| 按值查找 | $\Theta(n)$（有序时 $O(\log n)$） | $\Theta(n)$ | $\Theta(n)$ |
| 表头插入 / 删除 | $\Theta(n)$ | $O(1)$ | $O(1)$ |
| 表尾插入 / 删除 | 摊还 $O(1)$ | 有尾引用时插入 $O(1)$；删除 $\Theta(n)$ | $O(1)$ |
| 在已知结点旁插入 / 删除 | $\Theta(n)$ | 其后 $O(1)$ | 其前或其后 $O(1)$ |
| 附加空间 | 至多 $\Theta(n)$ 的空闲容量 | 每个元素一个引用 | 每个元素两个引用 |

（双向链表的访问界假定我们知道 $n$ 且可以从任一端出发遍历。）二分查找需要对中间元素 $O(1)$ 的访问，在链表上是不可能做快的：即便表已有序，走到中间也要 $n/2$ 步。

::: application 引用局部性
RAM 模型对每次内存访问收取同样的费用，真实的处理器却不是这样。截至 2026 年，从主存读一次约需 $100$ ns，从一级高速缓存读一次约需 $1$ ns。内存按（通常）$64$ 字节的**缓存行**成批进入高速缓存，所以读完一个 8 字节元素数组的 `a[i]` 之后，其后七个元素多半已经在缓存里，而硬件**预取器**能识别顺序访问的模式并提前取数。沿着链表结点跳转则跳到互不相关的地址上，每一跳都可能缺失。其后果——一个被基准测试反复证实的观测——是扫描数组常常比扫描同样长的链表快许多倍，尽管两者都是 $\Theta(n)$；而对适中的 $n$，靠移动元素在数组中间插入，可能比沿链表走到插入位置还快。渐近分析告诉你哪些代价会增长；决定许多实际胜负的，是依赖内存布局的常数。高速缓存将在 [[computer-systems]] 中研究。
:::

::: history
数组与存储程序计算机同龄：通过计算地址来索引在 20 世纪 40 年代后期就被内置于指令系统，FORTRAN（1957）让下标变量 `A(I)` 成为程序员的日常工具。链表由艾伦·纽厄尔（Allen Newell）、克里夫·肖（Cliff Shaw）与赫伯特·西蒙（Herbert Simon）在 1956 年为他们的逻辑理论家（Logic Theorist）程序编写的信息处理语言（IPL）中引入，约翰·麦卡锡（John McCarthy）的 LISP（1958 年设计，1960 年发表）把链表作为其核心数据结构。高德纳（Knuth）的《计算机程序设计艺术》（*The Art of Computer Programming*，第 1 卷，1968）系统地梳理了链式分配、哨兵与双向链表。摊还分析由罗伯特·塔尔扬（Robert Tarjan）在“Amortized computational complexity”（*SIAM Journal on Algebraic and Discrete Methods*，1985）中命名并形式化，它建立在他与 Daniel Sleator 关于自调整数据结构的工作之上。
:::

## 后续内容

数组与链式结点是本课程其余部分的原材料。[[data-structures/stacks-queues]] 在两者之上构造栈、队列与双端队列；[[data-structures/hash-tables]] 使用一个桶数组，每个桶常常是一条链表，并用 [[#thm-doubling]] 的倍增论证来重置其大小；树（[[data-structures/trees]]）把链式结点推广到多个孩子，堆（[[data-structures/heaps]]）则用下标算术把一棵树装进一个数组。图的表示（[[data-structures/graph-representations]]）在“列表的数组”与二维数组之间做出选择。摊还方法将在 [[algorithms]] 中重现，例如在并查集的分析中。

::: summary
- 数组连续存放元素；$a[i]$ 位于地址 $b + iw$，所以访问是 $O(1)$，但在位置 $i$ 插入或删除要移动 $n - i$ 个元素（[[#prop-array-insert]]）。
- 动态数组按常数**倍数**增长；倍增时 $n$ 次追加的总代价小于 $3n$（[[#thm-doubling]]），所以追加是**摊还** $O(1)$ 的。按常量增长会让 $n$ 次追加花费 $\Theta(n^2)$。
- 摊还代价（[[#def-amortised]]）对每个操作序列的总和给出上界；它不涉及概率，但个别操作仍可能很慢。
- 只在四分之一满时才减半缩容，扩容与缩容便不可能交替发生。
- 单链表（[[#def-linked-list]]）在表头或已知结点之后插入、删除花费 $O(1)$，但访问第 $i$ 个元素要 $\Theta(i)$。
- 带哨兵的双向链表能按引用 $O(1)$ 删除任何结点，两端没有特殊情况。
- Python 的 `list` 是动态数组：`append`/`pop()` 很快，`insert(0, x)`/`pop(0)` 是 $\Theta(n)$。在真实硬件上，数组享有链表所缺乏的缓存局部性。
:::

## 习题

::: exercise 地址算术 {level=1 check="4148"}
一个 32 位整数数组从地址 $4096$（十进制）开始。`a[13]` 从哪个地址开始？（填入十进制地址。）
::: solution
由 [[#eq-address]] 取 $w = 4$：$4096 + 13 \cdot 4 = 4096 + 52 = 4148$。
:::
:::

::: exercise 倍增的复制次数 {level=1 check="63"}
从容量为 $1$、满时倍增的空动态数组开始，40 次追加总共造成多少次元素复制？（填入数字。）
::: solution
扩容发生在规模 $1, 2, 4, 8, 16, 32$（每个小于 $40$ 的 2 的幂）时，共复制 $1 + 2 + 4 + 8 + 16 + 32 = 63$ 个元素。最终容量为 $64$。正如 [[#thm-doubling]] 所保证的，$63 < 2 \cdot 40$。
:::
:::

::: exercise 链表的操作 {level=1}
使用上面的 `LinkedList` 类，写出方法 `length(self)` 和方法 `get(self, i)`（返回下标 $i$ 处的值，若不存在则抛出 `IndexError`）。它们的代价是多少？为什么真实实现可能愿意额外维护一个 `size` 字段？
::: solution
```python
def length(self):
    count, p = 0, self.head
    while p is not None:
        count, p = count + 1, p.next
    return count

def get(self, i):
    p = self.head
    for _ in range(i):
        if p is None:
            break
        p = p.next
    if i < 0 or p is None:
        raise IndexError(i)
    return p.value
```

`length` 是 $\Theta(n)$，`get(i)` 是 $\Theta(\min(i, n))$。维护一个 `size` 字段，每次插入与删除都以 $O(1)$ 的附加代价更新它，`length` 就变成 $O(1)$，`get` 也能立刻拒绝非法下标。
:::
:::

::: exercise 按常数增长 {level=2 check="49500"}
一个动态数组初始容量为 $10$，每次满时多扩出 $10$ 个槽位。1000 次追加共复制多少个元素？（填入数字。）
::: solution
扩容发生在某次追加发现规模恰等于容量时，即在规模 $10, 20, \dots, 990$ 时；第 $1000$ 个元素的追加装进容量 $1000$，无需扩容。各次扩容共复制

$$
10 + 20 + \dots + 990 = 10\,(1 + 2 + \dots + 99) = 10 \cdot 4950 = 49\,500
$$

个元素——按 $n = 1000$、$c = 10$ 约为 $n^2/(2c)$。若从容量 $1$ 倍增，只需 $1 + 2 + \dots + 512 = 1023$ 次复制。
:::
:::

::: exercise 交替操作 {level=2}
一个动态数组满时倍增、*半空时减半*。从规模 $n = C = 2^k$ 出发，描述序列 追加、删除、追加、删除、…… 之下发生的事，并计算 $m$ 次这样的操作的总代价。然后解释规则“四分之一满时减半”为何能避开这个问题。
::: solution
追加发现数组已满，倍增至 $2^{k+1}$ 并复制 $2^k$ 个元素，规模成为 $2^k + 1$；删除把规模带回 $2^k$，恰为 $2^{k+1}$ 的一半，于是数组减半并再复制 $2^k$ 个元素。数组又是满的，循环往复：每次操作花费 $\Theta(n)$，$m$ 次操作花费 $\Theta(mn)$。

采用“四分之一满时减半”后，一次倍增之后数组半满，要删掉至少 $C/4$ 个元素（$C$ 为新容量）才谈得上减半；一次减半之后数组又半满，要追加 $C'/2$ 个元素才会再次倍增。每次扩容或缩容的代价与当时的容量成正比，而其之前恰恰发生了与同一容量成正比的廉价操作次数，足以付账。
:::
:::

::: exercise 缩容也是摊还 O(1) {#exr-shrink level=3}
证明：采用“满时倍增、四分之一满时减半”（容量绝不缩到 $1$ 以下）的策略，对初始为空的数组进行的任意 $m$ 次追加与弹出共花费 $O(m)$。使用势 $\Phi = \lvert 2n - C\rvert$，其中 $n$ 是规模、$C$ 是容量。
::: hint
证明每次操作的摊还代价 $c_i + \Phi_i - \Phi_{i-1}$ 至多为一个常数：利用扩容或缩容之后立有 $\Phi = 0$，以及 $\Phi \ge 0$ 恒成立。
:::
::: solution
我们使用**势能法**：若 $\Phi \ge 0$ 恒成立且 $\Phi_0 = \lvert 0 - 1\rvert = 1$，则 $\sum c_i = \sum (c_i + \Phi_i - \Phi_{i-1}) - \Phi_m + \Phi_0 \le \sum \hat c_i + 1$，其中 $\hat c_i = c_i + \Delta\Phi$。于是只需证明每个 $\hat c_i \le 3$。

**不扩容的追加。**代价 $1$；$n$ 增加 $1$，$2n - C$ 增加 $2$，$\lvert 2n - C\rvert$ 至多变化 $2$：$\hat c \le 3$。

**扩容的追加**（事前 $n = C$）。代价 $n + 1$（复制 $n$ 个、写入一个）。事前 $\Phi = \lvert 2n - n\rvert = n$；事后规模 $n + 1$、容量 $2n$，$\Phi = \lvert 2n + 2 - 2n\rvert = 2$。于是 $\hat c = n + 1 + 2 - n = 3$。

**不缩容的弹出。**代价 $1$；$\Phi$ 至多变化 $2$：$\hat c \le 3$。

**缩容的弹出。**这次弹出把规模降到 $n = C/4$，随后数组减半到容量 $C/2$，复制 $n$ 个元素：代价 $1 + n$。弹出前规模为 $n + 1$，$\Phi = \lvert 2n + 2 - 4n\rvert = 2n - 2$（$n \ge 1$）。弹出后 $\Phi = \lvert 2n - 2n\rvert = 0$。于是 $\hat c = 1 + n + 0 - (2n - 2) = 3 - n \le 3$。

因此每次操作的摊还代价至多为 $3$，$m$ 次操作至多花费 $3m + 1 = O(m)$。
:::
:::

::: exercise 链表的中间结点 {level=2}
给出一个算法，在一趟遍历中、不知道链表长度、只用 $O(1)$ 附加空间的条件下，找出单链表的中间结点，并证明它的正确性。
::: solution
用两个引用：`slow` 每步走一个结点，`fast` 每步走两个。

```python
def middle(L):
    slow = fast = L.head
    while fast is not None and fast.next is not None:
        slow, fast = slow.next, fast.next.next
    return slow
```

不变式：$t$ 次迭代后，`slow` 在结点 $t$，`fast` 在结点 $2t$（从 $0$ 数起）。循环在结点 $2t$ 或结点 $2t + 1$ 不存在的第一个 $t$ 处停止，即 $2t \ge n - 1$；于是 $t = \lceil (n-1)/2 \rceil = \lfloor n/2 \rfloor$，`slow` 位于结点 $\lfloor n/2\rfloor$——$n$ 为奇数时是中间结点，$n$ 为偶数时是正中间两个结点中的右边一个。空表返回 `None`。这一趟花费 $\Theta(n)$ 时间、$O(1)$ 空间。
:::
:::

::: exercise 增长倍数与空间浪费 {level=3}
一个动态数组满时把容量乘上倍数 $\alpha > 1$（忽略取整）。(a) 证明 $n$ 次追加复制的元素少于 $n\alpha/(\alpha - 1)$ 个。(b) 证明紧接一次扩容之后，至多有容量的 $1 - 1/\alpha$ 是空闲的。(c) 一些实现偏好 $\alpha < \phi = (1 + \sqrt5)/2 \approx 1.618$，这样配一个简单的内存分配器，已释放的块最终就能被合并、供后来的块复用。解释这个想法：$\alpha = 2$ 时，为什么历史上释放的全部空间永远装不下下一个块？
::: solution
(a) 历次扩容复制 $s_1 < s_2 < \dots < s_r$ 个元素，满足 $s_{j+1} = \alpha s_j$ 且 $s_r < n$。于是 $s_{r-j} = s_r/\alpha^j$，总数为 $s_r(1 + 1/\alpha + \dots + 1/\alpha^{r-1}) < n \cdot \frac{1}{1 - 1/\alpha} = n\frac{\alpha}{\alpha-1}$。

(b) 从容量 $C$ 扩容之后立有规模 $C + 1$、容量 $\alpha C$，空闲比例为 $(\alpha C - C - 1)/(\alpha C) < 1 - 1/\alpha$；而在下一次扩容之前，数组会被逐渐填满。

(c) $\alpha = 2$、容量依次为 $1, 2, 4, \dots, 2^k$ 时，此前释放的全部分区块大小合计 $1 + 2 + \dots + 2^{k-1} = 2^k - 1$，而下一个请求的块大小为 $2^{k+1}$（复制期间，当前 $2^k$ 大小的块还占着）。由于 $2^k - 1 < 2^{k+1}$，释放的空间——哪怕彼此全都相邻——也永远不够。增长倍数低于 $\phi$ 时，历次块大小之和最终会超过下一个请求，因为 $\phi$ 是方程 $x^2 = x + 1$ 的根：一个比斐波那契数列增长更慢的数列，从某项起每一项终会小于它前面所有项之和。这是关于分配器的启发式论证，不是保证；真实的分配器要复杂得多。
:::
:::
