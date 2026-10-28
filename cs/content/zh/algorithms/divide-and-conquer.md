设想你必须按考生编号给一百万份试卷排序，而你手下有一百位帮手。你不会把整摞卷子交给一个人：你会把它分成一百摞，让每位帮手排好自己那一摞，再把排好的各摞合并起来。同一个想法用在一个人身上、改成递归也行：要排一摞，把它分成两半，各用同样的方法把两半排好，再把两个有序半摞归并。归并两个有序的摞很容易——反复取两摞顶端编号较小的那份——耗时与摞的大小成正比。得到的算法用 $\Theta(n\log n)$ 时间对 $n$ 个元素排序，比插入排序的 $\Theta(n^2)$ 快得不可同日而语：对一百万个元素，大约两千万步，而不是半万亿步。

这就是**分治法**：把问题*划分*成同类型的更小子问题，递归地*各个击破*（小到一定程度就直接求解），再把子问题的解*合并*成整个问题的解。正确性用归纳法证明（[[algorithms/correctness-recurrences#prop-binary-search]] 是第一个例子），运行时间是一个递归式，通常用主定理求解（[[algorithms/correctness-recurrences#thm-master]]）。本章展开四个经典的分治算法——归并排序、快速排序、卡拉茨巴（Karatsuba）整数快速乘法与最近点对——每个各说明一条教训：合并步骤的代价如何决定总代价；一次不走运的划分如何毁掉一个算法、随机性又如何把它救回；省下这一个递归调用如何改变指数；几何如何让合并步骤变得廉价。

## 归并排序

::: algorithm 归并 {#alg-merge}
给定两个有序表 $L$ 和 $R$，产出一个包含它们全部元素的有序表：

1. 置 $i \gets 0$、$j \gets 0$，令 $out$ 为空。
2. 当 $i < \lvert L\rvert$ 且 $j < \lvert R\rvert$：
   1. 若 $L[i] \le R[j]$，把 $L[i]$ 追加到 $out$ 末尾并置 $i \gets i + 1$；
   2. 否则把 $R[j]$ 追加到 $out$ 末尾并置 $j \gets j + 1$。
3. 追加剩余元素 $L[i..]$ 与 $R[j..]$（其中一个是空的），返回 $out$。
:::

::: lemma 归并正确且线性 {#lem-merge}
若 $L$ 和 $R$ 有序，[[#alg-merge]] 至多用 $\lvert L\rvert + \lvert R\rvert - 1$ 次比较、$\Theta(\lvert L\rvert + \lvert R\rvert)$ 时间，返回 $L + R$ 的一个有序排列。
:::

::: proof
*不变式：*第 2 步每轮迭代开始时，$out$ 有序，由 $L[0..i-1]$ 与 $R[0..j-1]$ 组成，且 $out$ 的每个元素都不大于 $L[i..]$ 及 $R[j..]$ 的每个元素。初始时 $out$ 为空，不变式成立。*保持：*设 $L[i] \le R[j]$（另一侧对称）。因 $L$ 有序，$k > i$ 时 $L[i] \le L[k]$；因 $R$ 有序，$k \ge j$ 时 $L[i] \le R[j] \le R[k]$。所以 $L[i]$ 是剩余元素中的最小元；由不变式它也不小于 $out$ 中的一切，于是把它追加到末尾仍保持 $out$ 有序，且第三条对新的 $i + 1$ 成立。*终止：*循环在一个表耗尽时结束；另一个表的剩余部分有序，且由不变式不小于 $out$ 中的一切，所以把它追加到末尾，得到的有序表恰好包含每个元素一次。

每次比较追加一个元素，而最后一个元素总是在没有比较的情况下被追加，所以比较至多 $\lvert L\rvert + \lvert R\rvert - 1$ 次；其余所有工作每个被追加的元素摊常数。
:::

::: algorithm 归并排序 {#alg-mergesort}
对长度为 $n$ 的表 $A$ 排序：若 $n \le 1$，返回 $A$。否则令 $m = \lfloor n/2\rfloor$，递归地对 $A[0..m-1]$ 和 $A[m..n-1]$ 排序，返回它们的归并（[[#alg-merge]]）。
:::

```python
def merge(left, right):
    """Merge two sorted lists into one sorted list."""
    out, i, j = [], 0, 0
    # 不变式：out 是 left + right 中最小的 len(out) 个元素，已排序
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:          # <= 使排序保持稳定性
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]    # 这两者中有一个为空

def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
```

```console
$ python3 merge.py
[3, 9, 10, 27, 38, 43, 82]
```

::: theorem 归并排序 {#thm-mergesort}
归并排序返回其输入的一个有序排列，且其最坏情况运行时间为 $\Theta(n\log n)$。
:::

::: proof
*正确性*，对 $n$ 作强归纳。长度为 $0$ 或 $1$ 的表是有序的。对 $n \ge 2$，两半的长度为 $\lfloor n/2\rfloor$ 与 $\lceil n/2\rceil$，都小于 $n$，由假设递归调用返回两半的有序排列，再由 [[#lem-merge]]，它们的归并是整个表的一个有序排列。

*代价。*划分（复制两半）与归并耗时 $\Theta(n)$，所以对某两个常数 $c_1, c_2 > 0$ 和 $n \ge 2$，
$$
T(\lfloor n/2\rfloor) + T(\lceil n/2\rceil) + c_1n \le T(n) \le T(\lfloor n/2\rfloor) + T(\lceil n/2\rceil) + c_2n.
$$
这就是 $a = 2$、$b = 2$、$f(n) = \Theta(n) = \Theta(n^{\log_2 2})$ 的主递归式：情形 2 取 $k = 0$ 给出 $T(n) = \Theta(n\log n)$，在每个规模为 $n$ 的输入上都如此——归并排序的最好与最坏情况同阶。
:::

::: example 跟踪归并排序 {#ex-mergesort}
对 $\langle 38, 27, 43, 3, 9, 82, 10\rangle$ 跟踪归并排序，按归并实际发生的顺序列出各次归并，并统计比较次数。
::: solution
表先分成 $\langle 38, 27, 43\rangle$ 和 $\langle 3, 9, 82, 10\rangle$；前者分成 $\langle 38\rangle$ 与 $\langle 27, 43\rangle$，后者分成 $\langle 3, 9\rangle$ 与 $\langle 82, 10\rangle$。各次归并，按递归执行的顺序：

| 归并 | 结果 | 比较次数 |
|---|---|---|
| $\langle 27\rangle + \langle 43\rangle$ | $\langle 27, 43\rangle$ | 1 |
| $\langle 38\rangle + \langle 27, 43\rangle$ | $\langle 27, 38, 43\rangle$ | 2 |
| $\langle 3\rangle + \langle 9\rangle$ | $\langle 3, 9\rangle$ | 1 |
| $\langle 82\rangle + \langle 10\rangle$ | $\langle 10, 82\rangle$ | 1 |
| $\langle 3, 9\rangle + \langle 10, 82\rangle$ | $\langle 3, 9, 10, 82\rangle$ | 2 |
| $\langle 27, 38, 43\rangle + \langle 3, 9, 10, 82\rangle$ | $\langle 3, 9, 10, 27, 38, 43, 82\rangle$ | 6 |

总计 $13$ 次比较。最后一次归并里，$3, 9, 10$ 取自右边（各与 $27$ 比较），随后 $27, 38, 43$ 取自左边（各与 $82$ 比较），最后 $82$ 不经比较直接追加。$n = 7$ 时的最坏情况是 $14$，见 [[#ex-mergesort-worst]]。
:::
:::

归并排序是**稳定的**：相等的关键字保持相对次序，因为 `merge` 遇到相等时从左边取。它的弱点是内存：归并需要一个输出缓冲区，所以数组版归并排序要用 $\Theta(n)$ 附加空间。它是链表排序的首选，也是外部排序（数据在磁盘上，逐趟归并）的首选，并且——作为 Timsort 的归并游程核心——也是 Python `sorted` 的核心。

## 快速排序

归并排序划分起来漫不经心、合并起来小心翼翼。**快速排序**反其道而行之：它围绕一个**主元**把数组*划分*开，使较小的都在它前面、较大的都在它后面；然后两部分递归地*原地*排序，再没有什么要合并的。

::: algorithm Lomuto 划分 {#alg-partition}
```text
PARTITION(A, lo, hi)          ▷ 主元是 A[hi]；返回它的最终位置
1  x ← A[hi]
2  i ← lo − 1
3  for j ← lo to hi − 1
4      if A[j] ≤ x
5          i ← i + 1
6          exchange A[i] with A[j]
7  exchange A[i + 1] with A[hi]
8  return i + 1
```
:::

::: lemma PARTITION {#lem-partition}
`PARTITION(A, lo, hi)` 把 $A[lo..hi]$ 变成一个排列，并返回下标 $q$，使得 $lo \le k < q$ 时 $A[k] \le A[q]$、$q < k \le hi$ 时 $A[k] > A[q]$，其中 $A[q]$ 是原来的 $A[hi]$。它恰好作 $hi - lo$ 次比较。
:::

::: proof
*不变式：*下标为 $j$ 的每轮迭代开始时，子数组分成四个区：$A[lo..i] \le x$；$A[i+1..j-1] > x$；$A[j..hi-1]$ 尚未检查；$A[hi] = x$。初始时 $i = lo - 1$、$j = lo$，前两个区为空。*保持：*若 $A[j] > x$，$j$ 加一就把"$> x$"区延长一格。若 $A[j] \le x$，则 $i$ 加一，并把 $A[i]$（"$> x$"区的第一个元素，若该区为空则是 $A[j]$ 自己）与 $A[j]$ 交换："$\le x$"区增长一个元素，"$> x$"区整体右移一格。*终止：*$j = hi$ 时每个元素都在前两个区之一中；第 7 行把主元放到两区之间。整个过程只作交换，所以结果是排列。第 4 行对从 $lo$ 到 $hi - 1$ 的每个 $j$ 各执行一次。
:::

::: example 手工执行划分 {#ex-partition}
划分 $\langle 2, 8, 7, 1, 3, 5, 6, 4\rangle$（主元 $4$），给出 $j$ 取每个值之后的 $i$ 与数组（下标从 $0$ 起）。
::: solution
| $j$ | $A[j]$ | 动作 | $i$ | 数组 |
|---|---|---|---|---|
| 0 | 2 | $\le 4$：$i \gets 0$，$A[0]$ 与自身交换 | 0 | 2 8 7 1 3 5 6 4 |
| 1 | 8 | $> 4$ | 0 | 2 8 7 1 3 5 6 4 |
| 2 | 7 | $> 4$ | 0 | 2 8 7 1 3 5 6 4 |
| 3 | 1 | $\le 4$：$i \gets 1$，交换 $A[1], A[3]$ | 1 | 2 1 7 8 3 5 6 4 |
| 4 | 3 | $\le 4$：$i \gets 2$，交换 $A[2], A[4]$ | 2 | 2 1 3 8 7 5 6 4 |
| 5 | 5 | $> 4$ | 2 | 2 1 3 8 7 5 6 4 |
| 6 | 6 | $> 4$ | 2 | 2 1 3 8 7 5 6 4 |

最后把主元换到位置 $i + 1 = 3$：$\langle 2, 1, 3, \mathbf{4}, 7, 5, 6, 8\rangle$，`PARTITION` 返回 $3$。下面的 Python 版本打印同样的结果。
:::
:::

```python
import random

def partition(a, lo, hi):
    """Lomuto partition of a[lo..hi] around the pivot a[hi]."""
    pivot, i = a[hi], lo - 1
    for j in range(lo, hi):
        # 不变式：a[lo..i] <= pivot < a[i+1..j-1]
        if a[j] <= pivot:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[hi] = a[hi], a[i + 1]
    return i + 1

def quicksort(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    if lo < hi:
        r = random.randint(lo, hi)          # 随机主元
        a[r], a[hi] = a[hi], a[r]
        p = partition(a, lo, hi)
        quicksort(a, lo, p - 1)
        quicksort(a, p + 1, hi)

a = [2, 8, 7, 1, 3, 5, 6, 4]
print(partition(a, 0, 7), a)
random.seed(1)
b = random.sample(range(1000), 20)
quicksort(b)
print(b == sorted(b))
```

```console
$ python3 quick.py
3 [2, 1, 3, 4, 7, 5, 6, 8]
True
```

快速排序的正确性同归并排序一样由强归纳得到：划分之后，主元已在其最终位置，它之前的一切 $\le$ 它、之后的一切 $>$ 它，所以把两部分排好（各自更短，由假设排得正确），整个就排好了。

### 好的划分与坏的划分

快速排序的代价取决于主元落在哪里。倘若主元总是最大元素——对*已经有序*的数组采用"主元 $= A[hi]$"这一确定性规则就会如此——那么一部分为空、另一部分有 $n - 1$ 个元素，于是

$$
T(n) = T(n - 1) + \Theta(n) \quad\Rightarrow\quad T(n) = \Theta(n^2).
$$

这就是最坏情况：对任意划分位置，$T(n) = \max_{0 \le q \le n-1}\big(T(q) + T(n - 1 - q)\big) + \Theta(n)$，代入 $T(m) \le cm^2$ 得 $T(n) \le c\max_q\big(q^2 + (n-1-q)^2\big) + dn \le c(n-1)^2 + dn \le cn^2$，只要 $c \ge d$（且 $n \ge 1$），因为 $q^2 + (n-1-q)^2$ 是 $q$ 的凸函数，在端点处取最大值。反之，若主元总是平分，$T(n) = 2T(n/2) + \Theta(n) = \Theta(n\log n)$。即便划分偏斜但*成比例*也无妨：若每次划分都至少在两侧各放十分之一的元素，则递归树深至多 $\log_{10/9}n$、每层至多代价 $cn$，所以 $T(n) = O(n\log n)$。

对付坏输入的办法是让主元*随机*：在子数组的元素中均匀选取，上面的代码就是这么做的。这样一来没有哪个输入是坏的，坏的只有坏运气，而坏运气几乎不会出现。

::: theorem 随机化快速排序的期望比较次数 {#thm-quicksort}
在 $n$ 个互异关键字的任意输入上，随机化快速排序的期望比较次数恰为
$$
\E[C_n] = \sum_{1 \le i < j \le n}\frac{2}{j - i + 1} = 2(n+1)H_n - 4n \;<\; 2n\ln n + 2n
$$
其中 $H_n = \sum_{k=1}^n 1/k$；因此其期望运行时间为 $O(n\log n)$。
:::

::: proof
把关键字按有序次序记作 $z_1 < z_2 < \dots < z_n$，令 $X_{ij}$ 在 $z_i$ 与 $z_j$ 曾被比较时取 $1$，否则取 $0$。每次比较都发生在主元与其子数组中另一个元素之间，而划分之后主元再不与任何东西比较，所以每一对至多比较一次，$C_n = \sum_{i<j}X_{ij}$。由期望的线性性，$\E[C_n] = \sum_{i<j}\Prob(z_i \text{ 与 } z_j \text{ 被比较})$。

考虑集合 $Z_{ij} = \{z_i, z_{i+1}, \dots, z_j\}$。只要还没有 $Z_{ij}$ 中的元素当过主元，整个 $Z_{ij}$ 就都在同一个子数组里（$Z_{ij}$ 之外的主元要么比 $Z_{ij}$ 全部元素都小，要么都大）。看第一次从 $Z_{ij}$ 中选出主元的时刻。若选中的是 $z_i$ 或 $z_j$，二者恰在那一时刻被比较。若选中的是某个 $i < k < j$ 的 $z_k$，则 $z_i$ 与 $z_j$ 分道扬镳，永不被比较。在那一时刻，主元在当前子数组上均匀分布，而该子数组包含整个 $Z_{ij}$，所以在"主元落在 $Z_{ij}$ 中"的条件下，它在 $Z_{ij}$ 的 $j - i + 1$ 个元素上均匀分布。于是 $\Prob(X_{ij} = 1) = 2/(j - i + 1)$。

把配对按 $k = j - i + 1$ 分组，$k = 2, \dots, n$ 中每个 $k$ 对应 $n - k + 1$ 对，
$$
\E[C_n] = \sum_{k=2}^{n}\frac{2(n-k+1)}{k} = 2(n+1)\sum_{k=2}^n\frac1k - 2(n-1) = 2(n+1)(H_n - 1) - 2(n-1) = 2(n+1)H_n - 4n.
$$
由 $H_n \le \ln n + 1$，它不超过 $2(n+1)(\ln n + 1) - 4n < 2n\ln n + 2\ln n + 2 - 2n$，后者小于 $2n\ln n + 2n$。运行时间与比较次数加上调用开销的 $O(n)$ 成正比，所以期望意义下是 $O(n\log n)$。
:::

这里 $2n\ln n \approx 1.39\,n\log n$：平均而言，随机化快速排序只比约 $n\log n$ 的信息论下限多做约 $39\%$ 的比较（见 [[algorithms/sorting-selection]]），而它的内层循环非常快。实验与公式相符：

```python
import random

def quicksort_count(a):
    """Randomised quicksort on distinct keys; return the comparisons made."""
    if len(a) <= 1:
        return 0
    pivot = random.choice(a)
    smaller = [x for x in a if x < pivot]
    larger = [x for x in a if x > pivot]
    # 其余 len(a) - 1 个元素各与主元比较一次
    return len(a) - 1 + quicksort_count(smaller) + quicksort_count(larger)

def expected(n):
    H = sum(1 / k for k in range(1, n + 1))
    return 2 * (n + 1) * H - 4 * n

random.seed(2026)
for n in [10, 100, 1000, 10000]:
    trials = 200
    avg = sum(quicksort_count(list(range(n))) for _ in range(trials)) / trials
    print(n, round(avg, 1), round(expected(n), 1))
```

```console
$ python3 qcount.py
10 24.6 24.4
100 644.4 647.9
1000 11054.2 10985.9
10000 156585.0 155771.7
```

$200$ 次运行的平均（第二列）与精确期望（第三列）相符，误差不到百分数零点几。注意这里的输入是*有序*表 `range(n)`，即确定性快速排序的最坏情况。

::: widget plot
f: 2*(x + 1)*(log(x) + 0.5772) - 4*x; x*log(x)/log(2); x^2/2
x: 2, 1000
y: 0, 25000
labels: \text{随机化快速排序，期望} \approx 2(n+1)(\ln n + \gamma) - 4n; n\log n; \text{最坏情况} \approx n^2/2
points: 100,644; 1000,11054
caption: 快速排序的比较次数。最下面的曲线是 $n\log n$，大致一切比较排序都至少需要这么多；中间的是随机化快速排序的期望比较次数（用到 $H_n \approx \ln n + \gamma$，$\gamma \approx 0.5772$），圆点是上面实测的平均值。陡峭的那条是最坏情况 $n(n-1)/2$，确定性"取末元素为主元"在有序输入上就会达到。注意 $n$ 才几百时，期望已远低于最坏情况。
:::

::: warning 期望时间不是最坏情况时间
"随机化快速排序运行于 $O(n\log n)$"是对*每个固定输入上、在算法自身随机选择的意义下*的**期望**的陈述。它不是对输入取平均，也不是最坏情况保证：以极小的概率，某次执行会作 $\Theta(n^2)$ 次比较。（大偏差极不可能；[[algorithms/randomised-algorithms]] 讲如何给这类概率设界。）固定主元规则的确定性快速排序有一个 $\Theta(n^2)$ 的最坏情况，且会被现实中的输入触发——有序或近乎有序的数据，或者大量相等关键字配上把所有相等关键字归到一侧的划分。库实现用随机主元或三数取中主元、处理重复关键字的三路划分，以及递归根数过深时改用堆排序的*内省排序*（introsort）来设防。
:::

::: quiz
对含 $n$ 个*相等*关键字的数组运行主元为 $A[hi]$、采用 Lomuto 划分的确定性快速排序。它作多少次比较？

- [ ] $\Theta(n)$，因为本来就没有东西需要移动
- [ ] $\Theta(n\log n)$，因为划分是均匀的
- [x] $\Theta(n^2)$，因为每次划分都把全部元素放到一侧
- [ ] 它不会终止
::: solution
每个元素都满足 $A[j] \le x$，所以 `PARTITION` 返回 $q = hi$：左半有 $n - 1$ 个元素，右半没有。递归式为 $C(n) = C(n-1) + (n - 1)$，故 $C(n) = n(n-1)/2$。这里随机化主元没有用，因为所有主元都相等；三路划分（分成 $<$、$=$、$>$）才有用。
:::
:::

## 大整数乘法

学校教的方法把两个 $n$ 位数相乘要做 $n^2$ 个逐位乘积。1960 年，柯尔莫哥洛夫（Kolmogorov）猜想 $\Theta(n^2)$ 次位运算是必要的。学生卡拉茨巴（Karatsuba）在听说这个猜想后一周内就找到了更快的方法。

把每个 $n$ 位数分成高、低两半，各 $m = \lfloor n/2\rfloor$ 位：$x = x_1 10^m + x_0$，$y = y_1 10^m + y_0$。于是

$$
xy = x_1y_1\,10^{2m} + (x_1y_0 + x_0y_1)\,10^m + x_0y_0.
$$ {#eq-split}

递归计算四个乘积 $x_1y_1, x_1y_0, x_0y_1, x_0y_0$ 得 $T(n) = 4T(n/2) + \Theta(n)$（加法与移位是线性的），由主定理这是 $\Theta(n^{\log_2 4}) = \Theta(n^2)$——毫无改进。卡拉茨巴的观察是：中间系数只需要*一个*额外乘积：

$$
x_1y_0 + x_0y_1 = (x_1 + x_0)(y_1 + y_0) - x_1y_1 - x_0y_0.
$$ {#eq-karatsuba}

::: algorithm 卡拉茨巴乘法 {#alg-karatsuba}
对两个至多 $n$ 位的非负整数 $x$ 与 $y$ 相乘：若 $n = 1$，直接相乘。否则按 [[#eq-split]] 划分，递归计算 $z_2 = x_1y_1$、$z_0 = x_0y_0$ 和 $z_1 = (x_1 + x_0)(y_1 + y_0) - z_2 - z_0$，返回 $z_2\,10^{2m} + z_1 10^m + z_0$。
:::

::: theorem 卡拉茨巴界 {#thm-karatsuba}
[[#alg-karatsuba]] 用 $\Theta(n^{\log_2 3}) = O(n^{1.585})$ 次位运算完成两个 $n$ 位整数相乘。
:::

::: proof
正确性就是 [[#eq-split]] 和 [[#eq-karatsuba]]，对 $n$ 归纳。每次调用作出三个递归乘法，乘数至多 $\lceil n/2\rceil + 1$ 位（和 $x_1 + x_0$ 可能多出一位），外加加、减、移位的 $\Theta(n)$ 工作。所以 $T(n) = 3T(n/2 + O(1)) + \Theta(n)$。那个 $+O(1)$ 不改变解（它被 CLRS §4.6 的取整论证吸收，或由代换 $S(n) = T(n + 2)$ 吸收），而主定理取 $a = 3$、$b = 2$、$f(n) = \Theta(n) = O(n^{\log_2 3 - \varepsilon})$ 落在情形 1：$T(n) = \Theta(n^{\log_2 3})$。
:::

::: example 手工执行卡拉茨巴乘法 {#ex-karatsuba}
用 [[#alg-karatsuba]] 计算 $1234 \times 5678$。
::: solution
这里 $n = 4$，$m = 2$：$x_1 = 12$，$x_0 = 34$，$y_1 = 56$，$y_0 = 78$。

- $z_2 = 12 \times 56 = 672$（递归地：$1\cdot5 = 5$，$2\cdot6 = 12$，$(1+2)(5+6) - 5 - 12 = 16$，所以 $500 + 160 + 12 = 672$）；
- $z_0 = 34 \times 78 = 2652$；
- $z_1 = (12 + 34)(56 + 78) - 672 - 2652 = 46 \times 134 - 3324 = 6164 - 3324 = 2840$。

于是 $xy = 672 \cdot 10^4 + 2840 \cdot 10^2 + 2652 = 6\,720\,000 + 284\,000 + 2\,652 = 7\,006\,652$。三个两位数乘法取代了四个。在 Python 里：

```python
def karatsuba(x, y):
    """Multiply non-negative integers with three half-size products."""
    if x < 10 or y < 10:
        return x * y                         # 一位数基本情形
    m = max(len(str(x)), len(str(y))) // 2
    p = 10 ** m
    x1, x0 = divmod(x, p)                    # x = x1*10^m + x0
    y1, y0 = divmod(y, p)
    z2 = karatsuba(x1, y1)
    z0 = karatsuba(x0, y0)
    z1 = karatsuba(x1 + x0, y1 + y0) - z2 - z0   # = x1*y0 + x0*y1
    return z2 * p * p + z1 * p + z0

print(karatsuba(1234, 5678), 1234 * 5678)
import random
random.seed(7)
x, y = random.getrandbits(2000), random.getrandbits(2000)
print(karatsuba(x, y) == x * y)
```

```console
$ python3 kara.py
7006652 7006652
True
```

（这个版本为了易读按十进制位划分；真正的实现按机器字划分，并在几十字以内的截止规模以下改用学校方法，因为那里它的开销更低。）
:::
:::

$n^2$ 与 $n^{1.585}$ 之间的差距很大：$n = 10^6$ 位时相差约 $300$ 倍。同一个招数——用加法换乘法——给出了斯特拉森（Strassen）矩阵乘法（1969），$T(n) = 7T(n/2) + \Theta(n^2) = \Theta(n^{\log_2 7}) \approx \Theta(n^{2.81})$。

::: widget plot
f: x^2; x^(log(3)/log(2))
x: 1, 100
labels: \text{学校方法 } n^2; \text{卡拉茨巴 } n^{\log_2 3}
caption: 两个 $n$ 位整数相乘的位数乘法次数：学校方法 $n^2$，卡拉茨巴 $3^{\log_2 n} = n^{\log_2 3}$（$n$ 为 $2$ 的幂、一位数为基本情形）。$n = 64$ 时两个数分别是 $4096$ 与 $729$。改变的只有叶的指数——从 $\log_2 4 = 2$ 到 $\log_2 3 \approx 1.585$——因为每一层都从四个递归调用里省下了一个。
:::

## 最近点对

给定平面上的 $n \ge 2$ 个点，求其中两点之间的最小距离。逐对比较要 $\Theta(n^2)$ 时间。分治能做得更好，而有趣的部分在合并步骤。

把点按 $x$ 坐标排序，用竖直线 $x = x_m$ 把它们分成左半 $L$ 和右半 $R$，分别含 $\lceil n/2\rceil$ 与 $\lfloor n/2\rfloor$ 个点。递归地求两半内部的最小距离 $d_L$ 与 $d_R$，令 $d = \min(d_L, d_R)$。全局最近点对要么在半内——此时距离就是 $d$——要么两点各居一半、距离小于 $d$。任何这样的点对都在满足 $\lvert x - x_m\rvert < d$ 的点的**窄带**里。窄带可能几乎含有点集的全部点，但一个装箱论证说明每个点只需与另外几个点比较。

::: lemma 窄带 {#lem-strip}
设 $S$ 是窄带中按 $y$ 坐标排好序的点。若 $p, q \in S$ 两点距离小于 $d$，则它们在 $S$ 中相隔不足 $8$ 个位置：在 $S$ 中 $p$ 之后至多 $7$ 个点之内就能碰到 $q$（含 $q$）。
:::

::: proof
设 $p$ 在 $S$ 中先于 $q$，于是 $0 \le q_y - p_y < d$。$S$ 中按序从 $p$ 到 $q$ 的每个点都落在矩形 $[x_m - d, x_m + d] \times [p_y, p_y + d]$ 内。把这个矩形分成 $8$ 个边长 $d/2$ 的小正方形：线的左边四个，右边四个（线上的点归它来自的那一半）。同一个小正方形里的两点距离至多 $(d/2)\sqrt2 < d$；而同一半内的两点距离至少 $d$。所以每个小正方形至多放一个点，矩形至多放 $8$ 个点，$p$ 也算在内。于是 $q$ 在 $S$ 中 $p$ 之后的 $7$ 个点之中。
:::

::: algorithm 最近点对 {#alg-closest}
先把点按 $x$ 预排（表 $P_x$）、按 $y$ 预排（表 $P_y$）。然后在 $(P_x, P_y)$ 上递归：

1. 若 $n \le 3$，逐对比较。
2. 否则在 $P_x$ 的中点 $x_m$ 处把它分成 $L$ 与 $R$，并扫描一趟把 $P_y$ 分成 $L_y$ 与 $R_y$（各自一半的点，保持 $y$ 序）。
3. 对两半递归；令 $d$ 为较小的结果。
4. 扫描 $P_y$ 构成满足 $\lvert x - x_m\rvert < d$ 的点按 $y$ 序排成的窄带 $S$；把 $S$ 的每个点与其后 $7$ 个点比较，返回找到的最小距离（或 $d$）。
:::

::: theorem 最近点对的 O(n log n) 算法 {#thm-closest}
[[#alg-closest]] 在 $O(n\log n)$ 时间内返回 $n$ 个互异点中两点之间的最小距离。
:::

::: proof
正确性对 $n$ 归纳：两半由假设解得正确，且由 [[#lem-strip]]，每个距离小于 $d$ 的跨半点对都在第 4 步被检查。预排耗 $O(n\log n)$。每次调用除递归外做 $O(n)$ 工作——划分 $P_y$、构造窄带、至多 $7\lvert S\rvert$ 次距离计算——所以由主定理 $T(n) = 2T(n/2) + O(n) = O(n\log n)$。
:::

若没有预排的 $P_y$，每次调用内部对窄带排序就得 $T(n) = 2T(n/2) + O(n\log n) = O(n\log^2n)$（情形 2 取 $k = 1$）——已经不错，但让表*贯穿*整个递归过程保持有序是一个反复出现的技巧。

```python
from math import dist, inf

def closest_pair(points):
    """Smallest distance between two of the points (at least two, distinct)."""
    px = sorted(points)                          # 按 x，再按 y
    py = sorted(points, key=lambda p: p[1])      # 按 y
    return _closest(px, py)

def _closest(px, py):
    n = len(px)
    if n <= 3:                                   # 小规模直接暴力
        return min(dist(p, q) for i, p in enumerate(px) for q in px[i + 1:])
    mid = n // 2
    xm = px[mid][0]
    left = set(px[:mid])
    ly = [p for p in py if p in left]            # 让每一半保持按 y 有序
    ry = [p for p in py if p not in left]
    d = min(_closest(px[:mid], ly), _closest(px[mid:], ry))
    strip = [p for p in py if abs(p[0] - xm) < d]
    for i, p in enumerate(strip):                # 只与后 7 个点比较
        for q in strip[i + 1:i + 8]:
            d = min(d, dist(p, q))
    return d

pts = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
print(round(closest_pair(pts), 4))
```

```console
$ python3 closest.py
1.4142
```

::: example 六个点的最近点对 {#ex-closest}
在上面程序列出的六个点上跟踪该算法。
::: solution
按 $x$ 排序：$(2,3), (3,4), (5,1), (12,10), (12,30), (40,50)$。在下标 $3$ 处划分，$x_m = 12$：$L = \{(2,3), (3,4), (5,1)\}$，$R = \{(12,10), (12,30), (40,50)\}$。两半各三个点，用暴力求解：在 $L$ 中，$d((2,3),(3,4)) = \sqrt2 \approx 1.414$，$d((2,3),(5,1)) = \sqrt{13}$，$d((3,4),(5,1)) = \sqrt{13}$，故 $d_L = \sqrt2$；在 $R$ 中 $d_R = 20$（在 $(12,10)$ 与 $(12,30)$ 之间）。于是 $d = \sqrt 2$。窄带 $\lvert x - 12\rvert < \sqrt2$ 只含 $(12,10)$ 和 $(12,30)$，距离 $20$；没有改进，答案是 $\sqrt2 \approx 1.4142$。
:::
:::

## 设计分治算法

四个算法共享一个模式，也教会我们关于这个模式的四条教训。

- **合并步骤决定代价。** 分成两半时，线性合并给出 $\Theta(n\log n)$，二次合并给出 $\Theta(n^2)$；主定理告诉你合并必须廉价到什么程度。最近点对之所以快，是因为几何让合并成了线性的。
- **均衡重要。** 划分成规模为 $n$ 的常数*分数*的若干块，深度是对数量级；每次只分掉常数个元素，深度就是线性量级。快速排序只有在划分成比例时才快，而随机性让这成为大概率事件。
- **子问题个数决定指数。** 对 $T(n) = aT(n/2) + \Theta(n)$，$a > 2$ 时解为 $\Theta(n^{\log_2 a})$；像卡拉茨巴和斯特拉森那样省下一个递归调用，就降低了指数。
- **小规模该用简单方法。** 递归有开销，所以实用实现会在一个截止规模处停下（排序大约 $16$ 到 $64$ 个元素），在那里改用插入排序或暴力。这改变的是常数，不是量级。

::: quiz
一个分治算法把规模 $n$ 的问题划分成 $5$ 个规模 $n/3$ 的子问题，合并上花费 $\Theta(n^2)$ 时间。它的运行时间是什么？

- [ ] $\Theta(n^{\log_3 5})$
- [x] $\Theta(n^2)$
- [ ] $\Theta(n^2\log n)$
- [ ] $\Theta(n^{5/3})$
::: solution
$n^{\log_3 5} \approx n^{1.465}$，而 $f(n) = n^2$ 多项式地更大。正则性：$5(n/3)^2 = \frac59 n^2$，所以 $c = 5/9 < 1$。情形 3 给出 $\Theta(n^2)$：根处的合并占主导。
:::
:::

::: history
冯·诺依曼（von Neumann）在 1945 年描述了归并排序，作为存储程序计算机 EDVAC 设计的一个检验程序；它是最早为存储程序计算机编写的程序之一。霍尔（Hoare）于 1959–60 年，在莫斯科做机器翻译工作期间以及在 Elliott Brothers 公司时发明了快速排序；1961 年以算法 63（PARTITION）与算法 64（QUICKSORT）发表于《ACM 通讯》（*Communications of the ACM*），并在《计算机期刊》（*The Computer Journal*，1962）的 "Quicksort" 一文中给出完整分析。上文使用的划分方案出自 Nico Lomuto，经 Jon Bentley 的《编程珠玑》（Programming Pearls，1986）普及。卡拉茨巴（Karatsuba）于 1960 年发现他的乘法算法，1962 年与 Yuri Ofman 联合发表。斯特拉森（Strassen）的 $O(n^{2.81})$ 矩阵乘法出现于 1969 年，$O(n\log n)$ 最近点对算法出现在 Michael Shamos 与 Dan Hoey 的 "Closest-point problems"（1975）中，那是计算几何的奠基论文之一。此后 David Harvey 与 Joris van der Hoeven 把整数乘法降到了 $O(n\log n)$ 次位运算（2021 年发表）——这是一个理论成果，其常数使它并不实用。
:::

## 后续内容

[[algorithms/sorting-selection]] 表明归并排序的 $\Theta(n\log n)$ 是任何比较排序都打不破的，并把快速排序的划分改造成线性时间选择。[[algorithms/randomised-algorithms]] 把 [[#thm-quicksort]] 的概率推理发展成一门一般方法。[[algorithms/dynamic-programming]] 处理子问题*重叠*的递归——在那里朴素分治会指数级地重复工作。快速傅里叶变换是快速多项式与整数乘法以及信号处理的基础，正是同一模式上的分治算法。

::: summary
- **分治法**：划分成同类型的子问题，递归求解，再合并。正确性用归纳法证明；代价递归式用主定理求解。
- **归并排序**以线性时间归并两个有序半部（[[#lem-merge]]），在任何情形下都以 $\Theta(n\log n)$ 排序（[[#thm-mergesort]]）；它稳定，但需要 $\Theta(n)$ 附加空间。
- **快速排序**围绕主元原地划分（[[#lem-partition]]）。最坏情况 $\Theta(n^2)$，但取随机主元时，在每个输入上的期望比较次数是 $2(n+1)H_n - 4n \approx 1.39\,n\log n$（[[#thm-quicksort]]）。
- **卡拉茨巴**以三个半规模乘积相乘 $n$ 位整数，代价 $\Theta(n^{\log_2 3})$（[[#thm-karatsuba]]）。
- **最近点对**能在 $O(n\log n)$ 内求解，因为窄带里每个点只需检查 $7$ 个邻点（[[#lem-strip]]）。
- 合并的代价、划分的均衡度与子问题的个数决定运行时间。
:::

## 习题

::: exercise 归并的比较次数 {level=1 check="7"}
[[#alg-merge]] 归并 $\langle 1, 4, 6, 9\rangle$ 与 $\langle 2, 3, 7, 8\rangle$ 时作多少次比较？（输入比较次数。）
::: solution
输出按如下方式逐步建成：$1$（$1$ 对 $2$）、$2$（$4$ 对 $2$）、$3$（$4$ 对 $3$）、$4$（$4$ 对 $7$）、$6$（$6$ 对 $7$）、$7$（$9$ 对 $7$）、$8$（$9$ 对 $8$）；随后右表耗尽，$9$ 不经比较直接追加。共 $7 = 4 + 4 - 1$ 次比较，达到最大值。
:::
:::

::: exercise 归并排序的最坏情况 {#ex-mergesort-worst level=2 check="17"}
设 $M(n)$ 为归并排序在 $n$ 个元素上所作比较次数的最大值，于是 $M(1) = 0$ 且 $M(n) = M(\lfloor n/2\rfloor) + M(\lceil n/2\rceil) + n - 1$。计算 $M(8)$，并验证 $n = 7$ 与 $n = 8$ 时 $M(n) = n\lceil\log n\rceil - 2^{\lceil\log n\rceil} + 1$。（输入 $M(8)$。）
::: solution
$M(2) = 0 + 0 + 1 = 1$，$M(4) = 1 + 1 + 3 = 5$，$M(8) = 5 + 5 + 7 = 17$。另外 $M(3) = M(1) + M(2) + 2 = 3$，$M(7) = M(3) + M(4) + 6 = 14$。公式给出 $8 \cdot 3 - 8 + 1 = 17$ 与 $7 \cdot 3 - 8 + 1 = 14$。当每次归并把两个输入完全交错时，最坏情况达到。
:::
:::

::: exercise 快速排序在有序输入上 {level=1}
证明主元为 $A[hi]$ 的确定性快速排序在有序数组 $\langle 1, 2, \dots, n\rangle$ 上恰作 $n(n-1)/2$ 次比较，而取*中间*位置 $A[\lfloor(lo + hi)/2\rfloor]$ 为主元时在其上作 $\Theta(n\log n)$ 次比较。
::: solution
主元 $A[hi] = n$ 时，每个元素都比它小，于是左半是 $\langle 1, \dots, n-1\rangle$——又是有序的——右半为空。对 $m$ 个元素划分作 $m - 1$ 次比较，故总数为 $\sum_{m=1}^n (m-1) = n(n-1)/2$。取有序子数组的中间元素为主元时，主元就是它的中位数，于是两部分的大小为 $\lfloor (m-1)/2\rfloor$ 与 $\lceil (m-1)/2\rceil$，且它们自身有序；递归式为 $C(m) = C(\lfloor(m-1)/2\rfloor) + C(\lceil(m-1)/2\rceil) + m - 1 = \Theta(m\log m)$，由主定理即得。（划分前先把中间元素换到 $A[hi]$，左半保持有序，于是论证可以照搬。）
:::
:::

::: exercise 小 n 的期望比较次数 {level=2 check="29/6"}
分别用 [[#thm-quicksort]] 和直接计算，求出随机化快速排序在 $4$ 个互异关键字上所作比较次数的精确期望。（以最简分数输入期望值。）
::: solution
由公式：$H_4 = 25/12$，故 $\E[C_4] = 2 \cdot 5 \cdot 25/12 - 16 = 125/6 - 96/6 = 29/6 \approx 4.83$。直接计算：第一次划分作 $3$ 次比较；主元的秩等概率（各 $1/4$）为 $1, 2, 3$ 或 $4$，留下规模为 $(0,3), (1,2), (2,1), (3,0)$ 的子问题。由 $\E[C_0] = \E[C_1] = 0$、$\E[C_2] = 1$、$\E[C_3] = 2 + \frac13(\E[C_2] + 0 + \E[C_2]) = 2 + \frac23 = \frac83$，得 $\E[C_4] = 3 + \frac14\big(\frac83 + 1 + 1 + \frac83\big) = 3 + \frac14 \cdot \frac{22}{3} = 3 + \frac{11}6 = \frac{29}6$。
:::
:::

::: exercise 三分卡拉茨巴 {level=2}
把每个数分成三段后，两个二次多项式的乘积可以用 $5$ 个乘法而非 $9$ 个算出（Toom–Cook）。所得递归算法的运行时间是多少，它比卡拉茨巴更好吗？
::: solution
$T(n) = 5T(n/3) + \Theta(n)$，由情形 1 是 $\Theta(n^{\log_3 5}) \approx \Theta(n^{1.465})$。因为 $\log_3 5 \approx 1.465 < \log_2 3 \approx 1.585$，它渐近更好，只是加法和额外的簿记（插值时除以小常数）让它的常数更大；库对介于卡拉茨巴适用范围之上的中等规模数使用它。
:::
:::

::: exercise 统计逆序对 {level=2}
$\langle a_0, \dots, a_{n-1}\rangle$ 的一个逆序对是满足 $a_i > a_j$ 的二元对 $i < j$。改造归并排序，用 $O(n\log n)$ 时间统计逆序对，并在 $\langle 5, 2, 4, 6, 1, 3\rangle$（它有 $9$ 个逆序对）上测试。
::: solution
每个逆序对要么整个落在某一半内，要么横跨划分线。横跨的逆序对在归并时统计：当右半的一个元素被输出时，它小于左半中所有仍在等待的元素，于是与它们每个都构成一个逆序对。

```python
def sort_count(a):
    """Return (sorted copy of a, number of inversions in a)."""
    if len(a) <= 1:
        return a, 0
    mid = len(a) // 2
    left, x = sort_count(a[:mid])
    right, y = sort_count(a[mid:])
    out, i, j, cross = [], 0, 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
            cross += len(left) - i       # right[j] 比左半剩余元素都小
    return out + left[i:] + right[j:], x + y + cross

print(sort_count([5, 2, 4, 6, 1, 3]))
```

```console
$ python3 inv.py
([1, 2, 3, 4, 5, 6], 9)
```

递归式与归并排序相同，所以时间是 $\Theta(n\log n)$。相等不算逆序，这就是相等元素从左边取的原因。
:::
:::

::: exercise 最大子数组 {level=3}
给定一个整数表（可能含负数），求一个非空连续子表的最大和。设计一个运行时间为 $O(n\log n)$ 的分治算法，证明它正确，然后说明如何通过让每次调用返回更多信息把合并步骤变成 $O(1)$，从而得到 $O(n)$。
::: solution
在中间划分。最优子表要么在左半，要么在右半，要么跨过中间。跨中的子表是左半的一个后缀接右半的一个前缀，其和取左半的最大后缀和（从中间向左扫一趟算出）加右半的最大前缀和（向右扫一趟）时最大。正确性：每个子表必属于三类之一，而每类的最优者都被找到（两类靠归纳，一类靠扫描）。合并耗 $O(n)$，所以 $T(n) = 2T(n/2) + O(n) = O(n\log n)$。

要得 $O(n)$，让每次调用就其区段返回四个数：总和 $t$、最大前缀和 $p$、最大后缀和 $s$ 与最优子表和 $b$。对由 $A$ 接 $B$ 构成的区段：$t = t_A + t_B$，$p = \max(p_A, t_A + p_B)$，$s = \max(s_B, t_B + s_A)$，$b = \max(b_A, b_B, s_A + p_B)$——每种情形的讨论都是穷尽的，如上。现在合并是 $O(1)$，由情形 1 得 $T(n) = 2T(n/2) + O(1) = O(n)$。（Kadane 的单趟算法也能以 $O(n)$ 求解。）
:::
:::

::: exercise 直线上的最近点对 {level=3}
(a) 在 [[#lem-strip]] 中，小正方形的边长为什么是 $d/2$ 而不是 $d$？(b) 对*直线*上（实数）的 $n$ 个点，证明最近点对在有序次序下相邻，从而给出一个 $O(n\log n)$ 算法。在 [[#alg-closest]] 的一维版本中，"窄带" $\lvert x - x_m\rvert < d$ 里至多能有多少个点？
::: solution
(a) 论证需要每个小正方形至多含每一半的一个点。边长为 $s$ 的正方形内两点距离至多 $s\sqrt2$，$s = d/2$ 时它小于 $d$，$s = d$ 时却不；边长 $d$ 的正方形可能容下同半内距离恰为 $d$（乃至 $d\sqrt2$）的两点，于是点的个数得不出任何上界。

(b) 设 $x_1 \le x_2 \le \dots \le x_n$ 是排序后的点。对 $i < j$，$x_j - x_i = \sum_{k=i}^{j-1}(x_{k+1} - x_k) \ge x_{i+1} - x_i$，所以某对相邻点的距离不比任何一对差。排序加对 $n - 1$ 个间隔扫一趟共 $O(n\log n)$。分治版本里，左半的点都 $\le x_m$ 且两两至少相距 $d$，所以其中至多一个落在 $(x_m - d, x_m]$ 里；同样，右半至多一个点落在 $[x_m, x_m + d)$ 里。窄带至多含 $2$ 个点——这就是 $8$ 个正方形的一维类比。
:::
:::

::: exercise 快速排序的递归深度 {level=3}
(a) 对一个均匀随机主元，它把 $n$ 个互异关键字划分得两侧都至少有 $n/4$ 个元素的概率是多少？用它解释为什么随机化快速排序的递归深度通常是 $O(\log n)$。(b) 证明：若每次调用只对*较小*部分递归、对较大改用循环处理，则无论主元如何选取，活动栈帧至多 $\lfloor\log n\rfloor + 1$ 个。
::: solution
(a) 主元两侧都至少有 $n/4$ 个元素，当且仅当它的秩落在中间一半内，概率约 $1/2$（主元的秩 $r$ 满足 $n/4 + 1 \le r \le 3n/4$——左侧 $r - 1$ 个元素，右侧 $n - r$ 个——$n$ 个秩中约 $n/2$ 个满足）。沿任一根到叶的路径，每个这样的"好"划分至多把规模乘上 $3/4$，所以经过 $\log_{4/3}n$ 个好划分后子问题规模就为 $1$；由于约一半的划分是好划分，典型运行中路径长约 $2\log_{4/3}n = O(\log n)$（把"高概率成立"说严格要用 Chernoff 界，见 [[algorithms/randomised-algorithms]]）。(b) 若每次调用只对较小部分递归，而对较大部分通过更新 $lo$ 或 $hi$ 转入循环处理，则每个栈帧对应的子数组至多为其父亲的一半，于是第 $k$ 个活动帧对应的子数组至多 $n/2^{k-1}$ 个元素；不足 $2$ 个元素的调用不再递归，所以活动栈帧至多 $\lfloor\log n\rfloor + 1$ 个，与主元如何选取无关。运行时间不变。
:::
:::
