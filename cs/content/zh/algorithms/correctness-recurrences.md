你写下了一个对表排序的函数，它通过了你试过的每一个测试。还剩两个问题。它对*每一个*表都能正确排序吗——包括你没有想到的那些：空表、含有重复值的表、一个已经反序排好的表？在一个元素个数为百万的表上它要花多长时间，而这种规模你不可能负担得起多试几次？测试只是在无穷多个输入之中抽样一小把；它能表明缺陷的存在，却不能表明缺陷的不存在。要一次性回答关于一切输入的这两个问题，我们需要的是论证，而不是实验。

本课程讨论算法的设计，以及伴随每一个算法的两个论证：**正确性证明**，表明算法在每个合法输入上都满足其规格说明；**代价分析**，表明它的运行时间（或内存）如何随输入规模增长。这第一章为两者提供工具。对迭代算法，正确性工具是**循环不变式**——一个每轮循环都保持为真的命题；对递归算法，则是**归纳法**。在代价方面，迭代算法导向求和，递归算法导向**递归式**——形如 $T(n) = 2T(n/2) + n$、把输入规模 $n$ 上的代价用更小输入上的代价描述出来的方程。我们用代入法、递归树和**主定理**求解递归式，后面每一章都会用到主定理。

我们假定读者已掌握 [[data-structures/asymptotic-analysis]] 中的渐近记号 $O$、$\Omega$、$\Theta$ 与 RAM 代价模型、[数学图谱：归纳法](/learn/maths/lesson.php?c=proofs&l=induction)中的归纳法，以及 [[programming-1]] 中的 Python。本课程的伪代码采用 CLRS 风格：除非另有说明，数组下标从 $1$ 开始，`←` 表示赋值，缩进表示结构；Python 版本的下标从 $0$ 开始。

## 规格说明与循环不变式

一个算法求解一个**问题**，而问题由它的输入允许是什么、以及每种输入要求的输出是什么来描述。

::: definition 计算问题与正确性 {#def-problem}
一个**计算问题**由一个合法**输入**的集合（它的*实例*）以及每个实例上一组可接受的**输出**给出。它常被写成一个**前置条件**（输入必须满足的性质）和一个**后置条件**（输入与输出之间的关系）的形式。若算法对每个实例都**终止**且其输出满足后置条件，则称算法对该问题是**正确的**。（只要终止就满足后置条件的程序称为*部分正确*；正确性 = 部分正确性 + 终止性。）
:::

**排序问题**：输入是取自一个全序集的 $n \ge 0$ 个关键字组成的序列 $\langle a_1, \dots, a_n\rangle$；输出是输入的一个排列 $\langle a'_1, \dots, a'_n\rangle$，满足 $a'_1 \le a'_2 \le \dots \le a'_n$。后置条件的两半都很重要：对任何输入都返回 $\langle 1, 2, 3\rangle$ 算是"排好序的"，但不是输入的排列。

### 插入排序

插入排序大多数人理一手牌时都在用：一张一张地拿牌，把每张牌插入到已握在手中的牌里它该在的位置。

::: algorithm 插入排序 {#alg-insertion}
```text
INSERTION-SORT(A[1..n])
1  for j ← 2 to n
2      key ← A[j]
3      i ← j − 1
4      while i ≥ 1 and A[i] > key        ▷ 把较大的元素右移
5          A[i + 1] ← A[i]
6          i ← i − 1
7      A[i + 1] ← key
```
:::

我们凭什么说它是对的？关键的想法是刻画*每轮*外层循环*开始时*什么是真的。

::: definition 循环不变式 {#def-invariant}
**循环不变式**是一个关于循环中各变量的命题，它满足三个条件：

1. **初始化：** 它在一开始（第一轮迭代之前）为真；
2. **保持：** 若它在某轮迭代之前为真，则在下一轮迭代之前它仍为真；
3. **终止：** 循环结束时，不变式连同循环终止的原因，蕴含我们想要的性质。
:::

前两个条件就是对迭代次数的归纳：它们表明不变式在每轮迭代之前、以及最后一轮之后都成立。第三个条件才是不变式体现价值的地方。循环还必须*能结束*；对 `for` 循环这是自动的，对 `while` 循环我们要给出一个**变体（variant）**，一个每轮迭代严格减小的非负整数（与 [[programming-1/control-flow]] 中的想法相同）。

::: theorem 插入排序是正确的 {#thm-insertion}
对每个输入数组 $A[1..n]$，[[#alg-insertion]] 终止，且结束时 $A$ 中存放的是其原始内容的一个有序排列。
:::

::: proof
**不变式。** 在下标为 $j$ 的 `for` 循环每轮迭代开始时，子数组 $A[1..j-1]$ 由原先在 $A[1..j-1]$ 中的元素组成且已排好序，而 $A[j..n]$ 未曾改动。

*初始化。* 第一轮之前 $j = 2$，而 $A[1..1]$ 就是最初的那个元素 $A[1]$，它是有序的。

*保持。* 设不变式在下标为 $j$ 的迭代开始时成立。第 2 行把 $x = A[j]$ 存入 `key`。`while` 循环把 $A[j-1], A[j-2], \dots$ 一个接一个右移，只要它们大于 $x$；循环结束时下标 $i$（$0 \le i \le j - 1$）满足 $i = 0$ 或 $A[i] \le x$，并且位置 $i+1..j-1$ 的每个原始元素都大于 $x$、如今都右移了一格。（`while` 循环能结束，是因为 $i$ 每轮减一，且循环最迟在 $i = 0$ 处停止：$i$ 就是一个变体。）第 7 行把 $x$ 放进位置 $i+1$。此时 $A[1..i]$ 未变且有序，且 $A[i] \le x$（若 $i \ge 1$）；位置 $i+1$ 存放 $x$；而 $A[i+2..j]$ 存放原来的 $A[i+1..j-1]$，仍然有序且全部 $> x$。于是 $A[1..j]$ 有序且恰好包含最初的 $A[1..j]$；$A[j+1..n]$ 未动。这就是 $j + 1$ 时的不变式。

*终止。* `for` 循环在 $j = n + 1$ 时结束。此时不变式说 $A[1..n]$ 以有序次序存放着原来的元素——这正是后置条件。（当 $n \le 1$ 时循环体从不执行，结论平凡成立。）
:::

注意问题的条件用在了哪里："$A[i] \le x$ 或 $i = 0$" 恰好是把 $x$ 放对位置所需要的；而元素只被移动，从不未经保存就被覆盖，这保证了排列那一半。还要注意不变式里提到了*没有*变动的部分（$A[j..n]$）；忘记未动部分的不变式，是保持性步骤证不出来的常见原因。

::: example 跟踪插入排序 {#ex-insertion-trace}
对 $\langle 5, 2, 4, 6, 1, 3\rangle$ 运行插入排序，给出外层循环每轮迭代之后的数组，并统计关键字比较次数（$A[i] > key$）。
::: solution
Python 版本下标从 0 开始，并统计比较次数：

```python
def insertion_sort(a):
    """Sort the list a in place; return the number of key comparisons."""
    comparisons = 0
    for j in range(1, len(a)):
        key = a[j]
        i = j - 1
        # 不变式：a[0..j-1] 存放原来的 a[0..j-1]，已有序
        while i >= 0:
            comparisons += 1
            if a[i] <= key:
                break
            a[i + 1] = a[i]          # 把较大的元素右移
            i -= 1
        a[i + 1] = key
        print(j, a)
    return comparisons

a = [5, 2, 4, 6, 1, 3]
print("comparisons:", insertion_sort(a))
```

```console
$ python3 ins.py
1 [2, 5, 4, 6, 1, 3]
2 [2, 4, 5, 6, 1, 3]
3 [2, 4, 5, 6, 1, 3]
4 [1, 2, 4, 5, 6, 3]
5 [1, 2, 3, 4, 5, 6]
comparisons: 12
```

在下标（从 0 计）为 $j$ 的那轮迭代之后，前 $j + 1$ 个元素是有序的，正如不变式所承诺的。各轮迭代的比较次数是 $1, 2, 1, 4, 4$：插入 $2$ 时只与 $5$ 比较过，一直冲到最左端之外；插入 $6$ 时因为 $5 \le 6$ 立刻停下；插入 $1$ 时越过了全部四个已排好序的元素。
:::
:::

### 计算代价

我们在 RAM 模型下度量运行时间：每条基本操作（算术、比较、赋值、数组访问）耗时常数，于是运行时间与基本步数成正比。对排序来说，统计**关键字比较次数**很方便，因为插入排序的其余每一步都可以记在某次比较或某轮外层迭代的账上。

插入 $A[j]$ 时，`while` 循环至多作 $j - 1$ 次比较（与它左边的元素各比一次），至少作一次。设它作了 $t_j$ 次。于是

$$
n - 1 \;\le\; C(n) = \sum_{j=2}^{n} t_j \;\le\; \sum_{j=2}^{n} (j-1) = \frac{n(n-1)}{2}.
$$

下界在已经有序的数组上达到（每次插入都立刻停下），上界在反序数组上达到（每次插入都跑到最前面，作 $j - 1$ 次比较）。所以插入排序在**最好情况**下耗时 $\Theta(n)$，在**最坏情况**下耗时 $\Theta(n^2)$。更精确地说，$t_j - 1$ 是 $A[j]$ 越过的元素个数，即比它大的、排在它前面的元素个数，于是 $C(n)$ 介于 $I$ 与 $I + n - 1$ 之间，其中 $I$ 是**逆序对**的个数——满足 $i < j$ 且 $a_i > a_j$ 的二元对。在我们的例子里有 $9$ 个逆序对、$12 = 9 + 3$ 次比较：三次插入（$4$、$6$ 和 $3$）停在一个较小元素前，而 $2$ 与 $1$ 的插入冲出了最左端。

::: definition 最坏、最好与平均情况运行时间 {#def-cases}
对在一个输入 $x$ 上代价为 $c(x)$ 的算法，**最坏情况运行时间**是 $T(n) = \max\{c(x) : \lvert x\rvert = n\}$，**最好情况运行时间**是对规模为 $n$ 的输入取最小值。给定每个规模上输入的一个概率分布，**平均情况运行时间**是规模 $n$ 的随机输入 $X$ 下 $\E[c(X)]$ 的期望值。
:::

除非另有说明，"运行时间"指最坏情况运行时间：它是对每个输入的保证，而对许多算法来说最坏情况经常出现。若 $n!$ 种互异关键字的排列等可能，则 $\binom n2$ 个二元对中的每一个都以概率 $1/2$ 逆序，于是逆序对的期望个数是 $n(n-1)/4$（由期望的线性性，[数学图谱：期望](/learn/maths/lesson.php?c=probability&l=expectation)）：插入排序的平均情况也是 $\Theta(n^2)$，约为最坏情况的一半。

::: quiz
下面哪一项是这个循环的循环不变式？该循环在非空表 `a` 中寻找最大元素，而所选的不变式要足以证明它返回 $\max(a)$。

```python
best = a[0]
for k in range(1, len(a)):
    if a[k] > best:
        best = a[k]
```

- [ ] `best` 是 `a` 的一个元素。
- [x] 在下标为 `k` 的这一轮迭代开始时，`best` 等于 `a[0..k-1]` 的最大值。
- [ ] 在下标为 `k` 的这一轮迭代开始时，`best >= a[k]`。
- [ ] `best` 从不减小。
::: solution
第二个命题初始成立（`k = 1`，`best = a[0]`），能保持（与 `a[k]` 比较之后，`best` 是 `a[0..k]` 的最大值），且在终止时（`k = len(a)`；若表只有一个元素则没有迭代）恰好给出整个表的最大值。第一个和第四个虽然为真，但太弱，得不出关于最大值的任何结论。第三个根本不为真：`a[k]` 可能超过 `best`，这正是那个 `if` 存在的原因。
:::
:::

## 递归算法与归纳法

递归算法的正确性用对输入规模的归纳来证明：假设对更小输入进行的递归调用返回正确答案，再证明算法把这些答案组合成正确答案。这正是如何编写递归函数的方式（[[programming-1/recursion]]）；证明让"相信递归"这一步变得严格。

::: algorithm 二分搜索 {#alg-binary-search}
```text
BINARY-SEARCH(A, lo, hi, x)       ▷ A[lo..hi] 已排序；x 在其内吗？
1  if lo > hi
2      return NIL                 ▷ 空区间
3  mid ← ⌊(lo + hi)/2⌋
4  if A[mid] = x
5      return mid
6  elseif A[mid] < x
7      return BINARY-SEARCH(A, mid + 1, hi, x)
8  else return BINARY-SEARCH(A, lo, mid − 1, x)
```
:::

::: proposition 二分搜索是正确的 {#prop-binary-search}
若 $A[lo..hi]$ 已排序，则 `BINARY-SEARCH(A, lo, hi, x)` 终止，且当 $x$ 出现在 $A[lo..hi]$ 中时返回满足 $A[k] = x$ 的下标 $k$，否则返回 NIL。
:::

::: proof
对区间长度 $m = hi - lo + 1$ 作强归纳（$m \le 0$ 表示空区间）。若 $m \le 0$，第 2 行返回 NIL，这是正确的，因为区间为空。设 $m \ge 1$ 并假设结论对所有更短的区间成立。于是 $lo \le mid \le hi$。若 $A[mid] = x$，答案 $mid$ 正确。若 $A[mid] < x$，则由 $A$ 有序，每个 $k \le mid$ 的 $A[k]$ 都 $\le A[mid] < x$，所以 $x$ 出现在 $A[lo..hi]$ 中当且仅当它出现在 $A[mid+1..hi]$ 中。那个区间已排序且长度为 $hi - mid < m$，于是由归纳假设，递归调用终止并给出正确答案，该答案被返回。$A[mid] > x$ 的情形对 $A[lo..mid-1]$ 对称，其长度为 $mid - lo < m$。
:::

二分搜索的代价只依赖于区间长度。每次调用做常数量 $c$ 的工作，外加至多一次对长度不超过 $\lfloor m/2\rfloor$ 的区间的调用（$m$ 为奇数时两半长度都是 $(m-1)/2$；$m$ 为偶数时两半长度为 $m/2 - 1$ 和 $m/2$）。所以最坏情况代价满足

$$
T(0) = c, \qquad T(m) \le T(\lfloor m/2\rfloor) + c \quad (m \ge 1).
$$

这是我们的第一个**递归式**，本章其余部分讲的就是求解这类方程。把它逐层展开：$T(m) \le T(\lfloor m/2^k \rfloor) + kc$，而一旦 $2^k > m$ 就有 $\lfloor m/2^k\rfloor = 0$，即 $k = \lfloor\log m\rfloor + 1$ 时。于是 $T(m) \le c(\lfloor\log m\rfloor + 2) = O(\log m)$。

## 递归式与代入法

::: definition 递归式 {#def-recurrence}
自然数上函数 $T$ 的一个**递归式**是把 $T(n)$ 用 $k < n$ 处的值 $T(k)$ 表示出来的方程或不等式，连同确定 $T$ 在较小 $n$ 处取值的**基本情形**。在算法分析中**求解**一个递归式，指找出一个封闭形式的函数 $g$，使得 $T(n) = \Theta(g(n))$（或 $O$、$\Omega$ 界）。
:::

两条约定让算法中的递归式便于处理。第一，基本情形几乎总是"$n \le n_0$ 时 $T(n) = \Theta(1)$"，因为任何算法在常数规模输入上都耗时常数时间；改变这个常数，在我们遇到的情形中只让 $T$ 差一个常数因子。第二，我们通常略去向下取整与向上取整：对归并排序写 $T(n) = 2T(n/2) + n$，而不写 $T(n) = T(\lceil n/2\rceil) + T(\lfloor n/2\rfloor) + n$；对本课程的递归式而言，这不改变渐近解（CLRS 第 4 版 §4.6 对主定理一族证明了这一点）。拿不准时，就用精确的递归式检验解，我们下面就这样做。

**代入法**有两个步骤：先猜解的形式，再用归纳法证明它，途中确定常数。猜想可以来自递归树（下一节）、来自相似的递归式，或来自计算若干取值。

::: example 一个代入法证明 {#ex-substitution}
设 $T(1) = 1$，且 $n \ge 2$ 时 $T(n) = 2T(\lfloor n/2\rfloor) + n$。证明对所有 $n \ge 2$ 有 $T(n) \le 2n\log n$，从而 $T(n) = O(n \log n)$。
::: solution
先算几个值，让猜想显得可信：

```python
from functools import cache
from math import log2

@cache
def T(n):
    """T(1) = 1, T(n) = 2 T(floor(n/2)) + n."""
    if n == 1:
        return 1
    return 2 * T(n // 2) + n

for n in [2**4, 2**10, 1000, 10**6]:
    print(n, T(n), round(T(n) / (n * log2(n)), 3))
```

```console
$ python3 rec.py
16 80 1.25
1024 11264 1.1
1000 9120 0.915
1000000 19191232 0.963
```

比值 $T(n)/(n \log n)$ 一直在 $1$ 附近，所以 $n\log n$ 是正确的量级。现在来证明，对 $n \ge 2$ 作强归纳。

*基本情形。* 对 $n$ 的归纳步骤要用到 $\lfloor n/2\rfloor$，而它本身必须 $\ge 2$ 假设才能适用，所以 $n \in \{2, 3\}$（此时 $\lfloor n/2\rfloor = 1$）是基本情形：$T(2) = 2T(1) + 2 = 4 \le 2\cdot 2 \log 2 = 4$，且 $T(3) = 2T(1) + 3 = 5 \le 2 \cdot 3\log 3 \approx 9.5$。

*归纳步骤。* 设 $n \ge 4$，于是 $m = \lfloor n/2\rfloor \ge 2$，并假设 $T(m) \le 2m\log m$。那么，利用 $m \le n/2$ 与 $\log(n/2) = \log n - 1$，

$$
T(n) = 2T(m) + n \le 4m\log m + n \le 4\cdot\frac n2 \log\frac n2 + n = 2n\log n - 2n + n \le 2n \log n.
$$
:::
:::

常数 $2$ 是为了让基本情形成立而选定的；对 $T(n) \le cn\log n$ 中任何 $c \ge 1$，归纳步骤都成立，因为该步骤需要 $-cn + n \le 0$。

::: warning 不要靠改动常数来证明 O
一个诱人的"证明"，声称同一个 $T$ 是 $O(n)$：假设 $T(m) \le cm$；于是 $T(n) \le 2c\lfloor n/2\rfloor + n \le cn + n = O(n)$。这是错的。归纳假设是*精确的*命题 $T(m) \le cm$，其中 $c$ 是固定的，而步骤必须用同一个 $c$ 证明同一个命题 $T(n) \le cn$；$cn + n$ 并不 $\le cn$。在归纳内部写"$= O(n)$"，掩盖了常数在递归的每一层都在增长这一事实——这里每折半一次就增长 $1$，$\log n$ 正是由此而来。在代入法证明中，绝不要在归纳假设里使用 $O$；要写出显式的常数。
:::

有时正确的猜想会因为可修复的原因而失败：界是对的，但假设太弱，撑不起归纳。对 $T(n) = 2T(\lfloor n/2\rfloor) + 1$，猜想 $T(n) \le cn$ 给出 $T(n) \le cn + 1$，这并不 $\le cn$；但更强的猜想 $T(n) \le cn - 1$ 给出 $T(n) \le 2(c\lfloor n/2\rfloor - 1) + 1 \le cn - 1$，归纳便通过了。**减去低阶项**能加强假设；这是标准的补救手段。

## 递归树

**递归树**把递归式的工作量画成一棵树：根是顶层调用，标注它在那里完成的非递归工作 $f(n)$；它的孩子是各个递归调用，都照同样方式标注。总代价是所有标注之和，而求和通常**逐层**进行最容易。

对 $T(n) = 2T(n/2) + n$（$n$ 是 $2$ 的幂），树的第 $j$ 层有 $2^j$ 个结点，每个对应规模 $n/2^j$ 的子问题，所以每层代价为 $2^j \cdot n/2^j = n$。$n$ 个叶之上共有 $\log n$ 层内部结点，每个叶代价 $T(1)$。总和是 $n\log n + nT(1) = \Theta(n\log n)$：各层代价全都相同，而层数只有对数量级。

下面的图画出了归并排序在八个元素上的递归树；用深度优先搜索逐步演示，可以看到递归调用发生的顺序。

::: widget graph
nodes: n8@4,3; a4@2,2; b4@6,2; a2@1,1; b2@3,1; c2@5,1; d2@7,1; l1@0.5,0; l2@1.5,0; l3@2.5,0; l4@3.5,0; l5@4.5,0; l6@5.5,0; l7@6.5,0; l8@7.5,0
edges: n8>a4; n8>b4; a4>a2; a4>b2; b4>c2; b4>d2; a2>l1; a2>l2; b2>l3; b2>l4; c2>l5; c2>l6; d2>l7; d2>l8
algorithm: dfs
start: n8
caption: $T(n) = 2T(n/2) + n$ 在 $n = 8$ 时的递归树。根代价 $8$，两个规模为 $4$ 的结点各代价 $4$，四个规模为 $2$ 的结点各代价 $2$，八个叶各代价 $T(1)$：每层代价都是 $8$，叶之上共有 $\log 8 = 3$ 层。逐步演示深度优先搜索：访问的顺序就是递归调用的顺序，而从根到当前结点的路径就是调用栈。
:::

### 不平衡的树

子问题大小不一时，正是递归树大显身手之处。考虑

$$
T(n) = T(n/3) + T(2n/3) + n.
$$

根代价 $n$；它的孩子代价 $n/3$ 和 $2n/3$，合计 $n$；它们的四个孩子代价 $n/9 + 2n/9 + 2n/9 + 4n/9 = n$；依此类推——每个*完整*的层代价都是 $n$。最短的根到叶路径沿 $n/3$ 分支，长 $\log_3 n$ 层；最长的沿 $2n/3$ 分支，长 $\log_{3/2} n$ 层。在深度 $\log_3 n$ 之下有些分支已经结束，所以各层代价*至多*为 $n$。于是

$$
n\log_3 n \;\le\; T(n) \;\le\; n\log_{3/2} n + (\text{叶的代价}).
$$

这里叶的个数并不显然（当 $T(1)$ 是规模约为 $1$ 的叶的代价时它是 $\Theta(n)$，但要把它说严格需要不少功夫），所以我们用递归树只求猜想 $T(n) = \Theta(n\log n)$，再用代入法确认：对更小的 $m$ 假设 $T(m) \le dm\log m$，

$$
T(n) \le d\frac n3\log\frac n3 + d\frac{2n}3\log\frac{2n}{3} + n = dn\log n - dn\Big(\log 3 - \frac23\Big) + n \le dn\log n
$$

只要 $d \ge 1/(\log 3 - 2/3) \approx 1.09$。下界 $T(n) \ge d'n\log n$ 用同样的方法证明。

### 三种形态

逐层求和常常是等比级数，而等比级数由最大的那一项主导。这就给出递归树的三种典型形态：

- **根主导**：各层代价沿树向下*几何地递减*。总和为 $\Theta(\text{根}) = \Theta(f(n))$。例：$T(n) = 3T(n/4) + n^2$，其第 $j$ 层代价 $(3/16)^j n^2$，所以 $T(n) = \Theta(n^2)$。
- **均衡**：每层代价大致相同；总和为（一层的代价）$\times$（层数）。例：$T(n) = 2T(n/2) + n$，总和 $\Theta(n\log n)$。
- **叶主导**：各层代价沿树向下*几何地递增*。总和为 $\Theta(\text{叶的个数})$。例：$T(n) = 4T(n/2) + n$，其第 $j$ 层代价 $2^j n$，叶有 $4^{\log n} = n^2$ 个，所以 $T(n) = \Theta(n^2)$。

::: example 一棵根主导的树 {#ex-tree}
用递归树解 $T(n) = 3T(n/4) + n^2$，其中 $n$ 是 $4$ 的幂且 $T(1) = 1$，并在 $n = 16$ 处检验答案。
::: solution
第 $j$ 层有 $3^j$ 个规模为 $n/4^j$ 的结点，每个代价 $(n/4^j)^2$，所以第 $j$ 层代价 $3^j n^2/16^j = (3/16)^jn^2$。内部层共 $L = \log_4 n$ 层，叶有 $3^L = n^{\log_4 3}$ 个，每个代价 $1$。于是
$$
T(n) = n^2\sum_{j=0}^{L-1}\Big(\frac{3}{16}\Big)^j + n^{\log_4 3} \le \frac{n^2}{1 - 3/16} + n^{\log_4 3} = \frac{16}{13}n^2 + n^{\log_4 3},
$$
而仅根一项就给出 $T(n) \ge n^2$，所以 $T(n) = \Theta(n^2)$：根完成了全部工作中的一个固定比例。在 $n = 16$ 处：$T(4) = 3T(1) + 16 = 19$，$T(16) = 3 \cdot 19 + 256 = 313$；公式给出 $n^2(1 + 3/16) + 3^2 = 256 + 48 + 9 = 313$，精确相等。
:::
:::

主定理把这三种形态变成一条规则。

## 主定理

把规模 $n$ 的问题划分成 $a$ 个规模 $n/b$ 的子问题、并在划分与合并上花费 $f(n)$ 的分治算法，其运行时间为

$$
T(n) = aT(n/b) + f(n).
$$ {#eq-master}

递归树深 $\log_b n$，叶有 $a^{\log_b n} = n^{\log_b a}$ 个。**分水岭函数** $n^{\log_b a}$——即叶的代价——正是 $f(n)$ 要拿来比较的对象。

::: theorem 主定理 {#thm-master}
设 $a \ge 1$ 与 $b > 1$ 为常数，设 $f(n)$ 是对所有充分大的 $n$ 非负的函数，且 $T(n)$ 在自然数上由 [[#eq-master]] 定义，其中 $n/b$ 可读作 $\lfloor n/b\rfloor$ 或 $\lceil n/b\rceil$，并对低于某个常数的 $n$ 有 $T(n) = \Theta(1)$。于是：

1. 若对某个常数 $\varepsilon > 0$ 有 $f(n) = O(n^{\log_b a - \varepsilon})$，则 $T(n) = \Theta(n^{\log_b a})$。
2. 若对某个常数 $k \ge 0$ 有 $f(n) = \Theta(n^{\log_b a}\log^k n)$，则 $T(n) = \Theta(n^{\log_b a}\log^{k+1} n)$。
3. 若对某个常数 $\varepsilon > 0$ 有 $f(n) = \Omega(n^{\log_b a + \varepsilon})$，且 $f$ 满足**正则性条件**：对某个常数 $c < 1$ 和所有充分大的 $n$ 有 $af(n/b) \le cf(n)$，则 $T(n) = \Theta(f(n))$。
:::

这是 CLRS（第 4 版 §4.5–4.6）证明的形式。我们在最能体现思想的情形下证明它：$n$ 是 $b$ 的精确幂，$T(1) = \Theta(1)$，且每种情形中对 $f$ 的界对每个自变量 $n/b^j \ge 1$ 成立（而不仅对大的成立）。完整的证明说明，取整与有限多个小自变量只改变常数因子。

::: lemma 逐层求和 {#lem-level-sum}
若 $n = b^L$ 且 $T(1) = \Theta(1)$，则
$$
T(n) = \Theta(n^{\log_b a}) + \sum_{j=0}^{L-1} a^j f(n/b^j).
$$ {#eq-level-sum}
:::

::: proof
递归树的第 $j$ 层（$0 \le j \le L - 1$）有 $a^j$ 个结点，每个规模 $n/b^j$、代价 $f(n/b^j)$；第 $L$ 层由 $a^L$ 个规模为 $1$ 的叶组成，每个代价 $T(1) = \Theta(1)$。由于 $a^L = a^{\log_b n} = n^{\log_b a}$（两边取 $\log_b$），叶的代价为 $\Theta(n^{\log_b a})$。形式地说，把 [[#eq-master]] 展开 $L$ 次得 $T(n) = a^L T(1) + \sum_{j<L} a^jf(n/b^j)$，对 $L$ 归纳可证。
:::

::: proof 主定理的证明（b 的精确幂）
记 $d = \log_b a$，于是 $a = b^d$ 且 $a^j/(b^j)^d = 1$。记 $S = \sum_{j=0}^{L-1}a^jf(n/b^j)$。

*情形 1。* 由 $f(m) \le Cm^{d - \varepsilon}$，
$$
S \le C\sum_{j=0}^{L-1} a^j\Big(\frac{n}{b^j}\Big)^{d-\varepsilon} = Cn^{d-\varepsilon}\sum_{j=0}^{L-1}(b^{\varepsilon})^j = Cn^{d-\varepsilon}\,\frac{b^{\varepsilon L} - 1}{b^\varepsilon - 1} \le \frac{C}{b^\varepsilon - 1}\,n^{d},
$$
因为 $b^{\varepsilon L} = n^\varepsilon$。于是 $S = O(n^d)$，再结合 [[#lem-level-sum]] 得 $T(n) = \Theta(n^d)$。

*情形 2。* 由 $c_1 m^d\log^k m \le f(m) \le c_2 m^d\log^k m$ 与 $\log(n/b^j) = (L - j)\log b$，
$$
S = \Theta\Big(\sum_{j=0}^{L-1} a^j\frac{n^d}{a^j}\big((L-j)\log b\big)^k\Big) = \Theta\Big(n^d \sum_{i=1}^{L} i^k\Big) = \Theta(n^d L^{k+1}) = \Theta(n^d\log^{k+1}n),
$$
这里用到 $\sum_{i=1}^L i^k = \Theta(L^{k+1})$（它介于 $(L/2)^{k}\cdot L/2$ 与 $L^{k}\cdot L$ 之间）以及 $L = \log_b n = \Theta(\log n)$。叶贡献 $\Theta(n^d)$，更小。

*情形 3。* 把正则性条件应用 $j$ 次得 $a^jf(n/b^j) \le c^jf(n)$，于是
$$
f(n) \le S \le f(n)\sum_{j=0}^{\infty}c^j = \frac{f(n)}{1 - c}.
$$
所以 $S = \Theta(f(n))$；又因为 $f(n) = \Omega(n^{d+\varepsilon})$ 支配叶的 $\Theta(n^d)$，故 $T(n) = \Theta(f(n))$。
:::

用文字说：情形 1 中树是叶主导的，情形 2 中是均衡的（$\log_b n$ 层中每层代价大致相同，至多差 $\log^k$ 因子），情形 3 中是根主导的。情形 1 与 3 中的 $\varepsilon$ 要求 $f$ 比 $n^{\log_b a}$ *多项式地*小或大；正是它让各层代价构成等比级数。

::: example 主定理的应用 {#ex-master}
求解：(a) $T(n) = 9T(n/3) + n$；(b) $T(n) = T(2n/3) + 1$；(c) $T(n) = 3T(n/4) + n\log n$；(d) $T(n) = 2T(n/2) + n\log n$；(e) $T(n) = 7T(n/2) + n^2$。
::: solution
(a) $a = 9$，$b = 3$，$n^{\log_3 9} = n^2$，而 $f(n) = n = O(n^{2-\varepsilon})$，取 $\varepsilon = 1$。情形 1：$T(n) = \Theta(n^2)$。

(b) $a = 1$，$b = 3/2$，$n^{\log_{3/2}1} = n^0 = 1$，而 $f(n) = 1 = \Theta(n^0\log^0 n)$。情形 2 取 $k = 0$：$T(n) = \Theta(\log n)$——按三分之二划分的二分搜索。

(c) $a = 3$，$b = 4$，$n^{\log_4 3} \approx n^{0.793}$，而 $f(n) = n\log n = \Omega(n^{0.793 + \varepsilon})$，取 $\varepsilon = 0.2$。正则性：$3f(n/4) = \frac34 n\log(n/4) \le \frac34 n\log n$，所以 $c = 3/4$ 可行。情形 3：$T(n) = \Theta(n\log n)$。

(d) $a = b = 2$，$n^{\log_2 2} = n$，而 $f(n) = n\log n = \Theta(n\log^1 n)$。情形 2 取 $k = 1$：$T(n) = \Theta(n\log^2 n)$。（注意情形 3 *不*适用：$n\log n$ 比 $n$ 大，但大不出多项式因子 $n^\varepsilon$。）

(e) $a = 7$，$b = 2$，$n^{\log_2 7} \approx n^{2.807}$，而 $f(n) = n^2 = O(n^{2.807 - \varepsilon})$。情形 1：$T(n) = \Theta(n^{\log_2 7})$。这就是斯特拉森（Strassen）矩阵乘法，它只作 $7$ 个递归的半规模乘积而不是 $8$ 个。
:::
:::

下面的图比较了三个递归式的解，它们都有 $a = 2$、$b = 2$ 而 $f$ 不同，并已归一化使它们在 $n = 1$ 处相等：把 $f$ 从 $1$ 变成 $n$ 再变成 $n^2$，递归式便依次穿过三种情形。

::: widget plot
f: 2*x - 1; x*log(x)/log(2) + x; 2*x^2 - x
x: 1, 64
y: 0, 1000
labels: T = 2T(n/2) + 1 \;\Rightarrow\; 2n - 1; T = 2T(n/2) + n \;\Rightarrow\; n\log n + n; T = 2T(n/2) + n^2 \;\Rightarrow\; 2n^2 - n
points: 8,15; 16,31; 8,32; 16,80; 8,120; 16,496
caption: $n$ 为 $2$ 的幂、$T(1) = 1$ 时三个递归式的精确解，它们有相同的划分（$a = b = 2$，分水岭 $n^{\log_2 2} = n$）。$f = 1$ 时叶主导（情形 1，$\Theta(n)$）；$f = n$ 时各层相等（情形 2，$\Theta(n\log n)$）；$f = n^2$ 时根主导（情形 3，$\Theta(n^2)$）。圆点是由递归式在 $n = 8$ 与 $16$ 处算出的值。悬停以在更大的 $n$ 处比较各条曲线。
:::

::: warning 主定理有缺口
三种情形并未覆盖一切 $f$。对 $T(n) = 2T(n/2) + n/\log n$，函数 $f(n) = n/\log n$ 比 $n^{\log_2 2} = n$ 小，但不是多项式地小，所以情形 1 不适用；情形 2（它需要 $k = -1$）与情形 3 也不适用。（答案是 $\Theta(n\log\log n)$，把递归树求和即得：第 $j$ 层代价 $n/(\log n - j)$，而 $\sum_{i=1}^{\log n} n/i = \Theta(n\log\log n)$。）子问题大小不等的递归式，如 $T(n/3) + T(2n/3) + n$，或带减法步骤的递归式，如 $T(n) = T(n-1) + n$，根本就不是 [[#eq-master]] 的形式。引用定理之前先核对条件；条件不满足时，去画递归树。
:::

对划分不等的递归式有一个推广。**Akra–Bazzi 定理**（1998，另有 Leighton 的改进）适用于 $x$ 超过某个阈值后形如 $T(x) = g(x) + \sum_{i=1}^k a_iT(b_ix + h_i(x))$ 的递归式，其中 $a_i > 0$ 与 $0 < b_i < 1$ 是常数，$g$ 非负并满足*多项式增长条件*（粗略地说：$x$ 变化常数倍时 $g$ 至多变化常数倍，每个多项式函数与多对数函数都如此），而扰动满足 $\lvert h_i(x)\rvert = O(x/\log^2 x)$。设 $p$ 是使 $\sum_i a_ib_i^p = 1$ 成立的唯一实数。则
$$
T(x) = \Theta\Big(x^p\Big(1 + \int_1^x \frac{g(u)}{u^{p+1}}\,du\Big)\Big).
$$
对 $T(n) = T(n/3) + T(2n/3) + n$ 得 $(1/3)^p + (2/3)^p = 1$，所以 $p = 1$，而 $\int_1^n u/u^2\,du = \ln n$，给出前面求得的 $\Theta(n\log n)$。除了主定理、递归树和代入法，你很少需要更多的工具。

::: quiz
主定理的情形 3 求解哪个递归式？

- [ ] $T(n) = 4T(n/2) + n^2$
- [ ] $T(n) = 2T(n/2) + n\log n$
- [x] $T(n) = 2T(n/2) + n^2$
- [ ] $T(n) = T(n - 1) + n$
::: solution
对 $2T(n/2) + n^2$，分水岭是 $n$，而 $f(n) = n^2 = \Omega(n^{1+1})$；正则性取 $c = 1/2$ 成立，因为 $2(n/2)^2 = n^2/2$；所以 $T(n) = \Theta(n^2)$。$4T(n/2) + n^2$ 的分水岭是 $n^2$，所以它是情形 2：$\Theta(n^2\log n)$。$2T(n/2) + n\log n$ 是情形 2 取 $k = 1$。$T(n-1) + n$ 不是主定理的形式；它求和得 $n(n+1)/2 = \Theta(n^2)$（设 $T(0) = 0$）。
:::
:::

### 减治法与变量替换

再介绍两个技巧，工具箱就齐了。

**线性递归式**，如 $T(n) = T(n-1) + f(n)$，展开后就是和：$T(n) = T(0) + \sum_{k=1}^n f(k)$。插入排序的最坏情况是 $T(n) = T(n-1) + (n-1)$，求和得 $n(n-1)/2$。带两个以上减法调用的递归式，如朴素 Fibonacci 的 $T(n) = T(n-1) + T(n-2) + 1$，解是指数级的，要用特征方程求解（[数学图谱：递推关系](/learn/maths/lesson.php?c=discrete&l=recurrences)）。

**变量替换**能把一些不寻常的递归式变成熟悉的。对 $T(n) = 2T(\sqrt n) + \log n$，令 $n = 2^m$、$S(m) = T(2^m)$。于是 $S(m) = 2S(m/2) + m$，所以 $S(m) = \Theta(m\log m)$，从而 $T(n) = \Theta(\log n \log\log n)$。

## 实践中的考量

证明和渐近界不能取代测试；它们是对测试的补充。开发期间可以在运行时用 `assert` 检查循环不变式，把证明的思想变成一个在失效的第一轮迭代就报错的测试。运行时间分析预测的是*增长*，而它隐藏的常数在真实机器上很重要：插入排序紧凑的内层循环在小数组上快过归并排序，这正是 Python 的 Timsort 之类的库排序对短程（截至 Python 3.12 为不超过 64 个元素）使用插入排序的原因。分别测量规模 $n$ 与 $2n$ 的时间并检查比值——$\Theta(n)$ 约为 $2$，$\Theta(n^2)$ 约为 $4$——是对分析的一个快速经验检验，前提是把它标为观察而非证明。

::: history
图灵（Turing）1949 年的报告《Checking a large routine》就已经用关于程序状态的断言来注解一段程序。弗洛伊德（Floyd）的 "Assigning meanings to programs"（1967）与霍尔（Hoare）的 "An axiomatic basis for computer programming"（1969）把这一想法变成了一套方法：给每个循环配一个不变式，用归纳法证明。高德纳（Knuth）的《计算机程序设计艺术》（The Art of Computer Programming，1968 年起）使算法的精确分析——精确计数操作，常用生成函数与递归式——成为一门学问；高德纳在 1976 年的一篇文章中让 $O$、$\Omega$ 与 $\Theta$ 记号在算法界得到普及。一般形式的主定理由 Jon Bentley、Dorothea Haken 与 James Saxe 于 1980 年给出（"A general method for solving divide-and-conquer recurrences"），并由 Cormen、Leiserson 与 Rivest 所著《算法导论》（Introduction to Algorithms）第一版（1990）命名并普及。Mohamad Akra 与 Louay Bazzi 于 1998 年发表了他们的推广。
:::

## 后续内容

本课程中的每个算法都带有这里演练过的那两个论证。[[algorithms/divide-and-conquer]] 把主定理用于归并排序、快速排序、卡拉茨巴（Karatsuba）乘法与最近点对；[[algorithms/sorting-selection]] 证明一个*下*界，表明没有比较排序能快于 $\Theta(n\log n)$；[[algorithms/graph-search]] 与 [[algorithms/shortest-paths]] 的图算法用在关于"迄今为止发现了什么"的不变式上证明正确性；[[algorithms/dynamic-programming]] 则把指数级的递归换成多项式规模的表。

::: summary
- 算法是**正确的**，如果它在每个合法输入上终止，且输出满足后置条件（[[#def-problem]]）。
- **循环不变式**用初始化与保持来证明（对迭代次数的归纳），并在终止时使用（[[#def-invariant]]）；递减的**变体**证明 `while` 循环会结束。插入排序的不变式是"前缀存放着原来的前缀，已排序"（[[#thm-insertion]]）。
- 递归算法用对输入规模的**强归纳法**证明正确（[[#prop-binary-search]]）。
- 除非另有说明，运行时间指**最坏情况**；插入排序最坏与平均情况是 $\Theta(n^2)$，最好情况是 $\Theta(n)$。
- **代入法**：先猜，再用显式常数证明——归纳内部绝不用 $O$；可用减去低阶项来加强假设。
- **递归树**逐层求和工作量；等比的逐层和分为根主导、均衡与叶主导三种。
- **主定理**把 $f(n)$ 与 $n^{\log_b a}$ 比较（[[#thm-master]]）；注意核验它多项式间隔与正则性条件。
:::

## 习题

::: exercise 统计比较次数 {level=1 check="15"}
插入排序（如 [[#ex-insertion-trace]] 中那样）在反序表 $\langle 6, 5, 4, 3, 2, 1\rangle$ 上作多少次关键字比较？（输入比较次数。）
::: solution
每个元素都比它前面的所有元素小，所以插入位置 $j$（从 1 计）上的元素时，它与前面全部 $j - 1$ 个元素各比较一次，然后移到最前面。总数是 $1 + 2 + 3 + 4 + 5 = 15 = 6 \cdot 5/2$，即最坏情况。$15$ 个二元对全都是逆序对。
:::
:::

::: exercise 求和的不变式 {level=1}
对一个长度为 $n$ 的表 $a$，陈述并证明一个循环不变式，说明下面的函数返回 $\sum_{k=0}^{n-1} a_k$。

```python
def total(a):
    s = 0
    for k in range(len(a)):
        s = s + a[k]
    return s
```
::: solution
*不变式：*在下标为 $k$ 的这一轮迭代开始时，$s = \sum_{i=0}^{k-1} a_i$。*初始化：*当 $k = 0$，$s = 0$，即空和。*保持：*若迭代前 $s = \sum_{i<k}a_i$，则迭代后 $s = \sum_{i<k}a_i + a_k = \sum_{i<k+1}a_i$，正是 $k + 1$ 时的不变式。*终止：*循环在下标为 $k = n - 1$ 的那轮迭代之后结束，此时"$k = n$"的不变式成立：$s = \sum_{i<n}a_i$。（$n = 0$ 时没有迭代，$s = 0$ 是正确的。）`for` 循环终止，因为它遍历的是一个有限区间。
:::
:::

::: exercise 三个主定理递归式 {level=1}
用主定理求解，并指出适用的情形：(a) $T(n) = 8T(n/2) + n^2$；(b) $T(n) = 2T(n/4) + \sqrt n$；(c) $T(n) = 2T(n/4) + n$。
::: solution
(a) $n^{\log_2 8} = n^3$，$f(n) = n^2 = O(n^{3-1})$：情形 1，$\Theta(n^3)$。(b) $n^{\log_4 2} = n^{1/2}$，$f(n) = \sqrt n = \Theta(n^{1/2}\log^0 n)$：情形 2，$\Theta(\sqrt n\log n)$。(c) 又是 $n^{1/2}$，$f(n) = n = \Omega(n^{1/2 + 1/2})$，且 $2f(n/4) = n/2 \le \frac12 f(n)$：情形 3，$\Theta(n)$。
:::
:::

::: exercise 逐层展开求精确解 {level=2 check="1023"}
设 $T(1) = 1$，且 $n$ 为 $2$ 的幂时 $T(n) = 2T(n/2) + 1$。精确求出 $T(n)$，用归纳法证明你的公式，并给出 $T(512)$。（输入 $T(512)$。）
::: solution
逐层展开：$T(n) = 2T(n/2) + 1 = 4T(n/4) + 2 + 1 = \dots = 2^kT(n/2^k) + (2^k - 1)$。取 $2^k = n$ 得 $T(n) = n + n - 1 = 2n - 1$。*对 $k$（$n = 2^k$）归纳证明：*$T(1) = 1 = 2 \cdot 1 - 1$；若 $T(n/2) = n - 1$，则 $T(n) = 2(n - 1) + 1 = 2n - 1$。所以 $T(512) = 1023$。（这正是含 $512$ 个叶的满二叉递归树的结点总数。）
:::
:::

::: exercise 主定理失效之处 {level=2}
说明主定理为什么不适用于 $T(n) = 4T(n/2) + n^2/\log n$，并用逐层求和 [[#eq-level-sum]] 求出 $T(n)$（$n$ 为 $2$ 的幂）的量级。
::: solution
分水岭是 $n^{\log_2 4} = n^2$，而 $f(n) = n^2/\log n$ 比它小，但小不出因子 $n^\varepsilon$（对每个 $\varepsilon > 0$，$\log n = o(n^\varepsilon)$，所以 $n^2/\log n$ 不是 $O(n^{2-\varepsilon})$）；情形 2 要求 $k \ge 0$。取 $n = 2^L$，第 $j$ 层代价 $4^j(n/2^j)^2/\log(n/2^j) = n^2/(L - j)$，所以 $S = n^2\sum_{i=1}^{L}1/i = n^2 H_L = \Theta(n^2\log L)$。叶代价 $\Theta(n^2)$。于是 $T(n) = \Theta(n^2\log\log n)$。
:::
:::

::: exercise 加强的归纳假设 {level=2}
设 $T(1) = 1$ 且 $T(n) = 2T(\lfloor n/2\rfloor) + 1$。证明对所有 $n \ge 1$ 有 $T(n) \le 2n - 1$，并解释为什么假设 $T(n) \le cn$ 撑不起归纳。
::: solution
*基本情形：*$T(1) = 1 = 2 - 1$。*步骤：*对 $n \ge 2$，$m = \lfloor n/2\rfloor \ge 1$ 且 $m < n$；假设 $T(m) \le 2m - 1$，则 $T(n) \le 2(2m - 1) + 1 = 4m - 1 \le 2n - 1$，因为 $2m \le n$。若只有 $T(m) \le cm$，步骤给出 $T(n) \le 2cm + 1 \le cn + 1$，超出了 $cn$；那个 "$+1$" 在逐层累积。在假设中减去 $1$ 就把它吸收了。
:::
:::

::: exercise 冒泡排序 {level=2}
冒泡排序中，第 $i = 1, 2, \dots, n-1$ 趟令 $j$ 从 $1$ 走到 $n - i$，若 $A[j] > A[j+1]$ 就交换 $A[j]$ 与 $A[j+1]$。给出外层循环的一个不变式，证明冒泡排序正确，并求它的比较次数。
::: solution
*不变式：*第 $i$ 趟之前，末尾 $i - 1$ 个位置 $A[n-i+2..n]$ 以有序次序存放着最大的 $i - 1$ 个元素，且 $A$ 是输入的排列。*初始化：*$i = 1$ 时后缀为空。*保持：*第 $i$ 趟扫描 $A[1..n-i+1]$；内层不变式"在位置 $j$ 的比较之前，$A[j]$ 是 $A[1..j]$ 的最大元"初始成立，且被"比较-交换"保持，所以这一趟结束后 $A[n-i+1]$ 是 $A[1..n-i+1]$ 的最大元，即全局第 $i$ 大的元素（更大的都已在后缀里）。它不大于其后的元素，所以长度为 $i$ 的后缀是有序的。交换保持排列性质。*终止：*第 $n - 1$ 趟之后，末尾 $n - 1$ 个位置按序存放着最大的 $n - 1$ 个元素，剩下的 $A[1]$ 是最小元，故 $A$ 有序。比较次数：在任何输入上都是 $\sum_{i=1}^{n-1}(n - i) = n(n-1)/2$。
:::
:::

::: exercise 变量替换 {level=3}
解 $T(n) = \sqrt n\,T(\sqrt n) + n$，其中 $n = 2^{2^k}$，$T(2) = 1$。
::: hint
除以 $n$。
:::
::: solution
令 $U(n) = T(n)/n$。把递归式除以 $n$ 得 $U(n) = U(\sqrt n) + 1$。每开一次平方根，$\log n$ 就减半，所以从 $n = 2^{2^k}$ 出发，$k$ 步后到达 $n = 2$：$U(n) = U(2) + k = \tfrac12 + \log\log n$。于是 $T(n) = n(\log\log n + \tfrac12) = \Theta(n\log\log n)$。用 $k = 1$ 检验：$T(4) = 2T(2) + 4 = 6$，而 $4(\log\log 4 + \frac12) = 4 \cdot 1.5 = 6$。
:::
:::

::: exercise 不等分划的递归树 {level=3}
设 $T(n) = T(n/4) + T(3n/4) + n$。用递归树猜 $T$ 的量级，再用代入法证明上界，并指出 Akra–Bazzi 指数 $p$。
::: solution
每个完整层的代价为 $n/4 + 3n/4 = n$ 乘以该层的总占比，而总占比为 $1$；深度介于 $\log_4 n$ 与 $\log_{4/3}n$ 之间，所以猜想是 $\Theta(n\log n)$。代入法：对 $m < n$ 假设 $T(m) \le dm\log m$。于是
$$
T(n) \le d\tfrac n4\log\tfrac n4 + d\tfrac{3n}4\log\tfrac{3n}{4} + n = dn\log n - dn\Big(\tfrac14\cdot 2 + \tfrac34\log\tfrac43\Big) + n.
$$
括号里的数是 $0.5 + 0.75 \cdot 0.415 \approx 0.811$，所以一旦 $d \ge 1/0.811 \approx 1.23$（并且 $d$ 大到足以覆盖基本情形），界就成立。对 Akra–Bazzi，$(1/4)^p + (3/4)^p = 1$ 给出 $p = 1$，且 $\int_1^n u/u^2\,du = \ln n$，所以 $T(n) = \Theta(n\log n)$。
:::
:::

::: exercise 实现并检验不变式 {level=2}
写一个 Python 函数 `is_sorted_prefix(a, j)`，在 `insertion_sort` 的循环内部用一个 `assert` 调用它，以在每轮迭代开始时检验 [[#thm-insertion]] 的不变式。在几百个随机表上运行它。这个断言检验了什么，又没有检验什么？
::: solution
```python
import random

def is_sorted_prefix(a, j):
    return all(a[i] <= a[i + 1] for i in range(j - 1))

def insertion_sort_checked(a):
    original = list(a)
    for j in range(1, len(a)):
        assert is_sorted_prefix(a, j) and sorted(a[:j]) == sorted(original[:j])
        key, i = a[j], j - 1
        while i >= 0 and a[i] > key:
            a[i + 1] = a[i]
            i -= 1
        a[i + 1] = key
    return a

for _ in range(500):
    xs = [random.randint(0, 9) for _ in range(random.randint(0, 12))]
    assert insertion_sort_checked(list(xs)) == sorted(xs)
print("ok")
```

```console
$ python3 checked.py
ok
```

断言在每轮迭代开始时、在所试的输入上检验不变式的两半（前缀是有序的，且它存放着与原前缀相同的值的多重集合）。它没有对没有试过的输入证明任何东西；[[#thm-insertion]] 中的证明做到了。这类断言有代价（这里每次检验 $\Theta(j\log j)$），用于开发和测试，不用于生产。
:::
:::
