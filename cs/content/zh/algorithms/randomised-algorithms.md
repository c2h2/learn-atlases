有人递给你三个 $1000 \times 1000$ 的矩阵 $A$、$B$、$C$，声称 $AB = C$。直接把乘积算出来验证约需十亿次乘法。下面这个检验只需约三百万次：随机取一个分量为 $0$ 或 $1$ 的向量 $r$，检查是否 $A(Br) = Cr$。若 $AB = C$，检验必然通过。若 $AB \ne C$，它至少有 $1/2$ 的概率识破——独立重复二十次，被骗的概率就不到百万分之一。没有人知道有任何确定性方法能接近这么快。

会掷硬币的算法称为**随机化算法**。随机性买来简单与快速——随机化快速排序（[[algorithms/divide-and-conquer#thm-quicksort]]）比任何有 $O(n\log n)$ 保证的确定性快速排序都简单，快速选择（[[algorithms/sorting-selection#thm-quickselect]]）在实践中也比中位数的中位数更简单更快。它还能克制作恶者：对一个选择尚未做出的算法，输入无法预先变得不利。代价是我们必须对概率进行推理，并说清楚什么是随机的——是算法自己的抛硬币，绝不是输入。本章介绍两类随机化算法、分析它们所用的概率工具，以及三个经典例子：验证矩阵乘积、**通用哈希**，以及 Karger 的随机化**最小割**。概率本身——样本空间、数学期望、独立性——见[数学图谱：概率](/learn/maths/lesson.php?c=probability&l=probability-spaces)。

## 拉斯维加斯型与蒙特卡洛型

::: definition Las Vegas 型与 Monte Carlo 型算法 {#def-lv-mc}
随机化算法会做随机选择，它在固定输入 $x$ 上的行为是一个随机变量。若

- 它总是返回正确答案，而运行时间 $T(x)$ 是随机的，则称为 **Las Vegas（拉斯维加斯）型**；我们约束**期望运行时间** $\max_{\lvert x\rvert = n}\E[T(x)]$；
- 它的运行时间有界，而答案以某个概率可能是错的，则称为 **Monte Carlo（蒙特卡洛）型**；我们约束**出错概率** $\max_{\lvert x\rvert = n}\Prob[\text{在 } x \text{ 上答错}]$。

对是/否问题，若一个蒙特卡洛型算法只可能对一类输入出错（比如说，真相为“否”时它可能说“是”，但从不出相反的错误），就称它具有**单侧误差**。
:::

随机化快速排序与快速选择是拉斯维加斯型的：它们总是正确排序或选择，只有时间有波动。矩阵检验是带单侧误差的蒙特卡洛型算法：“否”的答案附有证据、永远正确。

两类算法可以互相转化。期望时间 $\E[T] \le t(n)$ 的拉斯维加斯型算法运行 $2t(n)$ 步后停下、任意作答，就变成蒙特卡洛型：由马尔可夫（Markov）不等式（[[#thm-markov]]），它未能算完的概率至多 $1/2$。答案可以*快速核查*的蒙特卡洛型算法则变成拉斯维加斯型：重复执行直到核查通过。

### 误差放大

蒙特卡洛型算法的错误率随重复次数指数缩小。若单侧误差算法每次运行出错的概率至多 $p < 1$，且各次使用独立的随机选择，那么 $k$ 次全错的概率至多 $p^k$——于是只要有任何一次答“否”，我们就答“否”。$p = 1/2$ 时，$k = 20$ 次把误差压到 $10^{-6}$ 以下，$k = 64$ 次压到 $10^{-19}$ 以下，远比硬件故障罕见。双侧误差也能放大：多数表决，配合下面的切尔诺夫界。

## 概率工具

绝大多数分析只用到寥寥几条事实。

**期望的线性性。** 对任意随机变量 $\E[X + Y] = \E[X] + \E[Y]$，*无论独不独立*。配上**指示随机变量** $I_A$（事件 $A$ 发生时取 $1$、否则取 $0$，$\E[I_A] = \Prob[A]$），它就把计数变成概率求和：发生了的事件的期望个数等于各概率之和。[[algorithms/divide-and-conquer#thm-quicksort]] 的证明正是如此。

::: example 数一数最大值的更新次数 {#ex-records}
一个程序以随机次序扫描 $n$ 个互异关键字，每当见到比此前所有关键字都大的关键字就更新 best（[[algorithms/correctness-recurrences]] 中测验里的那个循环）。它平均更新多少次？当一次更新很昂贵——写磁盘，或者在“雇佣问题”中面试录用一名新候选人——这个数字就重要了。
::: solution
令 $I_k$ 指示“第 $k$ 个扫到的关键字比它前面 $k - 1$ 个都大”。均匀随机的次序中，前 $k$ 个关键字各有同等可能成为其中最大者，故 $\E[I_k] = 1/k$。由线性性，更新的期望次数为 $\sum_{k=1}^n 1/k = H_n \approx \ln n$——尽管这些指示变量看不出相互独立，线性性并不在乎。做个实验：

```python
import random

def records(a):
    """How many times does the running maximum change while scanning a?"""
    best, count = float('-inf'), 0
    for x in a:
        if x > best:
            best, count = x, count + 1
    return count

random.seed(7)
n, trials = 1000, 2000
avg = sum(records(random.sample(range(n), n)) for _ in range(trials)) / trials
print(round(avg, 2), round(sum(1 / k for k in range(1, n + 1)), 2))
```

```console
$ python3 records.py
7.48 7.49
```

$n = 1000$ 时，$2000$ 个随机次序上的平均值为 $7.48$，对比 $H_{1000} \approx 7.49$。在*有序*输入上有 $n$ 次更新；先把输入洗牌——让次序由算法自己做主变随机——就把平均情形界变成对每个输入都成立的期望界。
:::
:::

**联合界。** $\Prob[A_1 \cup \dots \cup A_k] \le \sum_i\Prob[A_i]$，同样不需要独立性。

::: theorem 马尔可夫不等式 {#thm-markov}
若 $X \ge 0$ 是随机变量且 $a > 0$，则 $\Prob[X \ge a] \le \E[X]/a$。
:::

::: proof
令 $I$ 为事件 $X \ge a$ 的指示变量。则恒有 $aI \le X$（$I = 1$ 时 $X \ge a$；$I = 0$ 时 $X \ge 0$）。两边取期望，$a\Prob[X \ge a] \le \E[X]$。
:::

**独立试验。** 若每次尝试独立地以概率 $p$ 成功，则首次成功所需的尝试次数服从**几何分布**：$\Prob[N = k] = (1-p)^{k-1}p$，期望 $\E[N] = 1/p$，且 $\Prob[N > k] = (1-p)^k \le e^{-pk}$（用到 $1 - x \le e^{-x}$）。

::: widget distribution
dist: geometric
params: p=0.25
a: 1
b: 4
caption: 在成功概率各为 $p$ 的独立试验中，首次成功所需的试验次数。其均值为 $1/p$，尾概率 $\Prob[N > k] = (1-p)^k$ 几何衰减：$p = 1/4$ 时，图中阴影的“$4$ 次之内成功”概率为 $1 - (3/4)^4 \approx 0.68$。拖动 $p$ 的滑块观察均值 $1/p$；一个每轮以概率 $p$ 成功的拉斯维加斯型算法平均需要 $1/p$ 轮，而需要很多轮的情形极为罕见。
:::

**切尔诺夫界（Chernoff bounds）。** 许多独立指示变量之和尖锐地集中在均值附近。一个方便的形式：若 $X = X_1 + \dots + X_k$，各 $X_i \in \{0, 1\}$ 独立且 $\mu = \E[X]$，则对 $0 < \delta \le 1$，
$$
\Prob[X \ge (1 + \delta)\mu] \le e^{-\delta^2\mu/3}, \qquad \Prob[X \le (1 - \delta)\mu] \le e^{-\delta^2\mu/2}.
$$
我们不加证明地使用它们（相关的见[数学图谱：极限定理](/learn/maths/lesson.php?c=probability&l=limit-theorems)中的大数定律）。例如，以概率 $2/3$ 正确、独立运行 $k$ 次的双侧蒙特卡洛型算法，多数表决出错意味着正确的次数至多 $k/2$，而 $\mu = 2k/3$；取 $\delta = 1/4$，$(1 - \delta)\mu = k/2$，于是误差不超过 $e^{-k/48}$。

## 验证矩阵乘积

::: algorithm Freivalds 检验 {#alg-freivalds}
给定 $n \times n$ 矩阵 $A$、$B$、$C$：均匀随机取 $r \in \{0, 1\}^n$；用三次矩阵–向量乘法算出 $x = A(Br)$ 与 $y = Cr$；若 $x = y$ 答"$AB = C$"，否则答"$AB \ne C$"。重复 $k$ 次，仅当每次都给"$AB = C$"时才答"$AB = C$"。
:::

::: theorem Freivalds 检验 {#thm-freivalds}
若 $AB = C$，检验恒答"$AB = C$"。若 $AB \ne C$，单次运行答"$AB = C$"的概率至多 $1/2$，于是 $k$ 次运行一同出错的概率至多 $2^{-k}$。每次运行耗时 $\Theta(n^2)$。
:::

::: proof
若 $AB = C$，则对一切 $r$ 有 $A(Br) = (AB)r = Cr$。设 $D = AB - C \ne 0$；须证 $\Prob[Dr = 0] \le 1/2$。取一个非零元素 $d_{ij} \ne 0$。$Dr$ 的第 $i$ 个分量为
$$
(Dr)_i = d_{ij}r_j + \sum_{l\ne j}d_{il}r_l = d_{ij}r_j + y,
$$
其中 $y$ 只依赖 $l \ne j$ 的那些分量 $r_l$。把那些分量任意固定（这就是**延迟决策原理**：最后才揭晓 $r_j$）。要使 $(Dr)_i = 0$ 必须 $d_{ij}r_j = -y$，而 $d_{ij} \ne 0$，所以两个取值 $r_j \in \{0, 1\}$ 中至多一个满足。于是以任何其他分量的取值为条件，$\Prob[(Dr)_i = 0] \le 1/2$，从而无条件地 $\Prob[Dr = 0] \le \Prob[(Dr)_i = 0] \le 1/2$。独立运行的概率相乘。每次矩阵–向量乘法耗时 $\Theta(n^2)$。
:::

```python
import random

def matmul(A, B):
    return [[sum(a * b for a, b in zip(row, col)) for col in zip(*B)] for row in A]

def matvec(A, x):
    return [sum(a * b for a, b in zip(row, x)) for row in A]

def freivalds(A, B, C, trials=20):
    """Monte Carlo test of AB = C: False is always right; True errs w.p. <= 2^-trials."""
    n = len(A)
    for _ in range(trials):
        r = [random.randint(0, 1) for _ in range(n)]
        if matvec(A, matvec(B, r)) != matvec(C, r):   # 每次试验 O(n^2)
            return False                              # 证据：AB != C
    return True

random.seed(42)
n = 60
A = [[random.randint(-9, 9) for _ in range(n)] for _ in range(n)]
B = [[random.randint(-9, 9) for _ in range(n)] for _ in range(n)]
C = matmul(A, B)
print(freivalds(A, B, C))
C[17][42] += 1                                        # 改错一个元素
print(freivalds(A, B, C))
```

```console
$ python3 freivalds.py
True
False
```

::: example 单次运行多久会被骗 {#ex-freivalds}
在上面程序中把单个元素 $C_{17,42}$ 改错之后，检验的一次运行被骗的确切概率是多少？
::: solution
此时 $D = AB - C$ 恰有一个非零元素 $d_{17,42} = -1$。于是 $Dr = 0$ 当且仅当 $r_{42} = 0$，概率恰为 $1/2$：[[#thm-freivalds]] 的界在这里是紧的。二十次运行全部被骗的概率是 $2^{-20} \approx 9.5 \times 10^{-7}$。错误更多时检验通常表现更好：$D$ 的第 $i$ 行若有多个非零元素，$(Dr)_i = 0$ 就需要好几个随机比特碰巧凑在一起。
:::
:::

同一个思想——在随机点上求值、看结果是否为零——可以检验一个多项式是否恒为零。**Schwartz–Zippel 引理**说：任意多个变元的、总次数为 $d$ 的非零多项式，在 $S^k$ 中均匀取的点上取零值的概率至多 $d/\lvert S\rvert$（[[#ex-schwartz-zippel]]）。对这个**多项式恒等性检验**问题，没有人知道确定性的多项式时间算法。

::: quiz
一个蒙特卡洛型算法回答一个是/否问题：真答案为“是”时它以至少 $0.1$ 的概率说“是”，真答案为“否”时它恒说“否”。若只要有任何一次运行说“是”我们就答“是”，独立运行多少次能使出错概率不超过 $10^{-6}$？

- [ ] $7$
- [ ] $60$
- [x] $132$
- [ ] $10^6$
::: solution
出错只会发生在“是”输入上，即所有运行都说“否”，其概率至多 $0.9^k$。需要 $0.9^k \le 10^{-6}$，即 $k \ge 6\ln 10/(-\ln 0.9) = 13.8155/0.10536 \approx 131.1$，故 $k = 132$。即便单侧检验很弱，稍加重复也变得可靠。
:::
:::

## 通用哈希

链地址法的哈希表把 $n$ 个键存入 $m$ 个桶：键 $k$ 放进桶 $h(k)$ 的链表（[[data-structures/hash-tables]]）。其操作耗时与某条链的长度成正比，而常说的一句“$O(1)$ 期望时间”，常常靠假设键是随机的来“论证”。但键不是随机的：它们是标识符、地址、单词——而对*任何*固定哈希函数 $h$，都存在一个全部落入同一个桶的键集合（由鸽笼原理，某个桶至少分到宇宙 $U$ 的 $\lvert U\rvert/m$ 个键）。一个作恶者——或者一份不走运的数据集——就能把哈希表退化成链表。

补救办法是在建表时从一个函数族中**随机**选取哈希函数。这样就没有哪个固定键集是坏的，因为作恶者不知道最终用的是哪个函数。

::: definition 通用函数族 {#def-universal}
从宇宙 $U$ 到 $\{0, 1, \dots, m-1\}$ 的函数族 $\mathcal H$ 称为**通用**的，如果对 $U$ 中一切互异的键 $k \ne l$，
$$
\Prob_{h \in \mathcal H}[h(k) = h(l)] \le \frac1m,
$$
其中 $h$ 从 $\mathcal H$ 中均匀选取。也就是说，任何两个固定键发生碰撞的概率不超过真正随机的函数下的概率。
:::

::: theorem 平均而言链很短 {#thm-universal-chain}
设 $h$ 从某个通用族中选取，把 $n$ 个键的集合 $K$ 存入链地址法哈希表。对任意键 $k$，落入 $k$ 的桶中且不同于 $k$ 的 $K$ 中键的期望个数至多 $n/m$。于是查找任意键——在表中或不在——的期望时间为 $O(1 + \alpha)$，其中装填因子 $\alpha = n/m$。
:::

::: proof
对每个 $l \in K$、$l \ne k$，令 $I_l$ 指示 $h(l) = h(k)$；由通用性 $\E[I_l] \le 1/m$。$k$ 的桶中其他键的个数为 $\sum_{l} I_l$，由线性性其期望当 $k \in K$ 时至多 $(n - 1)/m$，当 $k \notin K$ 时至多 $n/m$。查找先算 $h(k)$、再扫描链表，代价为 $O(1)$ 加上链长。
:::

::: quiz
某个哈希表对整数键使用固定函数 $h(k) = k \bmod 1024$。哪一句话是正确的？

- [ ] 对任何键集，查找都是 $O(1)$ 期望时间，因为 $h$ 把键均匀散布
- [x] 有些键集会让每次查找都花 $\Theta(n)$ 时间；通用哈希消除的是对键集的依赖
- [ ] 它是通用的，因为每个桶从 $\{0, \dots, 1023\}$ 分到同样多的键
- [ ] 桶数取 $2$ 的幂 $1024$，就不可能碰撞
::: solution
对任何固定的 $h$，全部模 $1024$ 同余的一个键集——比如 $1024$ 的倍数，内存对齐地址上很常见——会落进同一个桶。把*宇宙*均匀散布不是通用性；通用性说的是一个随机函数族，且要对每一对键成立。$h$ 取自通用族时，对每个键集，期望链长都是 $O(1 + \alpha)$（[[#thm-universal-chain]]）。
:::
:::

注意这里什么是随机的：*$h$ 的选择*。键可以任意，甚至可以由作恶者挑选——只要作恶者看不到 $h$。通用族存在，而且容易计算。

::: theorem Carter–Wegman 函数族 {#thm-carter-wegman}
设 $p$ 为素数且一切键都在 $\{0, 1, \dots, p-1\}$ 中，$m < p$。对 $1 \le a \le p - 1$ 与 $0 \le b \le p - 1$，令
$$
h_{a,b}(k) = \big((ak + b) \bmod p\big) \bmod m.
$$
则 $\mathcal H_{p,m} = \{h_{a,b}\}$ 是一个含 $p(p-1)$ 个函数的通用族。
:::

::: proof
固定键 $k \ne l$，记 $r = (ak + b) \bmod p$、$s = (al + b) \bmod p$。第一，$r \ne s$：两者之差是 $a(k - l) \bmod p$，是两个不被素数 $p$ 整除之数的乘积，故模 $p$ 非零。第二，映射 $(a, b) \mapsto (r, s)$ 是从 $a \ne 0$ 的 $p(p-1)$ 个数对到 $r \ne s$ 的 $p(p-1)$ 个数对的双射：给定 $(r, s)$，方程组有唯一解 $a = (r - s)(k - l)^{-1} \bmod p$（非零）与 $b = (r - ak) \bmod p$，因为 $k - l$ 在模 $p$ 下可逆（[数学图谱：模算术](/learn/maths/lesson.php?c=number-theory&l=congruences)）。于是 $(a, b)$ 均匀时，$(r, s)$ 均匀分布在模 $p$ 的互异剩余对上。

两键碰撞当且仅当 $r \equiv s \pmod m$。固定 $r$，$\{0, \dots, p-1\}$ 中满足 $s \ne r$ 且 $s \equiv r \pmod m$ 的 $s$ 至多有 $\lceil p/m\rceil - 1 \le (p + m - 1)/m - 1 = (p - 1)/m$ 个。所以
$$
\Prob[h_{a,b}(k) = h_{a,b}(l)] \le \frac{(p-1)/m}{p - 1} = \frac1m.
$$
:::

```python
import random

P = 2**31 - 1                                 # 比所有键都大的素数

def random_hash(m):
    """Draw h(k) = ((a k + b) mod P) mod m from the Carter-Wegman family."""
    a, b = random.randrange(1, P), random.randrange(0, P)
    return lambda k: ((a * k + b) % P) % m

random.seed(1)
m = 100
keys = [i * m for i in range(1000)]           # 全部模 m 同余于 0
fixed = [k % m for k in keys]                 # 朴素哈希 k mod m
print("k mod m: largest bucket", max(fixed.count(v) for v in set(fixed)))
h = random_hash(m)
loads = [0] * m
for k in keys:
    loads[h(k)] += 1
print("universal: largest bucket", max(loads), "average", sum(loads) / m)
```

```console
$ python3 uhash.py
k mod m: largest bucket 1000
universal: largest bucket 12 average 10.0
```

::: example 击败坏键集 {#ex-universal}
解释上面的输出：为什么 k mod m 把 $1000$ 个键全放进一个桶？[[#thm-universal-chain]] 对通用函数预言了什么？
::: solution
键 $0, 100, 200, \dots$ 全是 $m = 100$ 的倍数，k % m 对它们恒为 $0$：一条长 $1000$ 的链，每次查找都花 $\Theta(n)$。这样的模式在实际数据中很常见（按 $2$ 的幂对齐的地址、带固定后缀的标识符）。随机取 $h_{a,b}$ 时，与某个键同桶的其他键的期望个数至多 $999/100 \approx 10$；实际也的确平均负载为 $10$、最满的桶装 $12$ 个键。换一个种子就换一个 $h$、换一组负载，但期望的界对每个键集——包括这个恶意键集——都成立。
:::
:::

::: warning 随机化哈希需要保密的随机性
“哈希表用 $O(1)$ 期望时间”这句对通用哈希成立，前提是 $h$ 的随机选择对挑选键的人保密。若攻击者能探知或猜中 $h$——因为它写死在源代码里，或者种子可以被预测——他就能送一堆互相碰撞的键，把用哈希表存请求参数的服务器拖到近乎瘫痪（**哈希洪水攻击**，2011 年公开披露、打击众多 Web 框架的拒绝服务攻击）。防御办法是用带密钥的哈希函数、每个进程取一个保密的随机种子：从 Python 3.4 起，str 与 bytes 的哈希使用启动时随机取密钥的 SipHash（除非 PYTHONHASHSEED 将其固定）。另需注意，“期望 $O(1)$”约束的是对 $h$ 的*平均*，不是最坏情形：单次操作仍可能很慢。
:::

更强的族给出更强的保证。**$k$-独立**族使任意 $k$ 个互异键的哈希值相互独立且均匀；用 $2$-独立就能约束链长的方差，用 $O(\log n)$-独立则可以高概率保证最长链为 $O(\log n/\log\log n)$。**完美哈希**（Fredman、Komlós 与 Szemerédi，1984）用两层通用哈希存储静态集合，$O(n)$ 空间内达到 $O(1)$ *最坏情形*查找。

## Karger 最小割

连通无向多重图 $G$（允许平行边）的一个**割**是把顶点划分成两个非空集合；其**大小**是穿过的边数。**全局最小割**问题要求大小最小的割——破坏网络所需切断的最少数目的链接。可以从一个固定的 $s$ 向每个其他顶点 $t$ 跑最大流算法（[[algorithms/network-flow]]），但 Karger 的算法要简单得多。

**收缩**边 $\{u, v\}$ 指把 $u$ 与 $v$ 合并成一个顶点：保留 $u$ 或 $v$ 连向其他顶点的一切边（可能产生平行边），删去 $u$ 与 $v$ 之间会变成自环的边。每次收缩使顶点数减少一。收缩后图的一个割对应 $G$ 的一个等大的割（每个合并后的顶点代表原来一批顶点的集合），所以收缩绝不会凭空造出更小的割。

::: algorithm Karger 收缩算法 {#alg-karger}
只要多重图还有两个以上顶点，就从所有剩余的边中均匀随机选一条并收缩。剩下两个顶点时，返回它们所代表的两个原顶点集合之间的割。
:::

::: theorem Karger 的成功概率 {#thm-karger}
设 $C$ 是 $n \ge 2$ 个顶点的连通多重图的一个指定的最小割。收缩算法返回 $C$ 的概率至少为
$$
\frac{2}{n(n-1)} = \binom n2^{-1}.
$$
:::

::: proof
令 $c = \lvert C\rvert$ 为最小割的大小。每个顶点的度数至少为 $c$——否则该顶点的关联边就构成更小的割——于是 $k$ 个顶点的多重图至少有 $kc/2$ 条边。算法返回 $C$ 当且仅当它从不收缩 $C$ 的边：收缩 $C$ 的边会把两侧各一个顶点并到一起，而收缩其他边使 $C$ 的两侧始终分开，到最后剩下的两个顶点就恰是这两侧。

令 $E_i$ 表示“第 $i$ 次收缩避开了 $C$”这一事件。在第 $i$ 次收缩之前，给定 $E_1, \dots, E_{i-1}$，图中有 $k = n - i + 1$ 个顶点，$C$ 仍是它的一个大小为 $c$ 的割——而且仍是最小割，因为收缩不产生新的割——所以图至少有 $kc/2$ 条边，且
$$
\Prob[E_i \mid E_1 \cap \dots \cap E_{i-1}] \ge 1 - \frac{c}{kc/2} = 1 - \frac{2}{k} = \frac{k-2}{k}.
$$
对 $n - 2$ 次收缩连乘，$k = n, n-1, \dots, 3$，
$$
\Prob[\text{返回 } C] \ge \prod_{k=3}^{n}\frac{k - 2}{k} = \frac{1 \cdot 2 \cdot 3 \cdots (n-2)}{3 \cdot 4 \cdots n} = \frac{2}{n(n-1)}.
$$
:::

成功概率 $1/\binom n2$ 看似无药可救，但误差放大救回了它：独立运行 $N = \binom n2\ln n$ 次，保留找到的最小割。所有运行全部错过 $C$ 的概率至多
$$
\Big(1 - \binom n2^{-1}\Big)^{\binom n2\ln n} \le e^{-\ln n} = \frac1n.
$$
每次运行可以像 Kruskal 算法那样实现：把边随机排序，用并查集按此顺序收缩（[[algorithms/greedy-algorithms#lem-rank]]），跳过同一连通分量内部的边，直到只剩两个分量，耗时 $O(m\,\alpha(n))$。（收缩一条均匀随机的剩余边，等价于取随机排列中下一条不是自环的边。）总计 $O(n^2 m\log n\,\alpha(n))$——多项式而且简单；Karger 与 Stein 的递归精化（1996）把它降到 $O(n^2\log^3 n)$。

```python
import random
from itertools import combinations

def find(parent, x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]        # 路径减半
        x = parent[x]
    return x

def contract(n, edges):
    """One run of Karger's algorithm on vertices 0..n-1; returns a cut size."""
    parent, components = list(range(n)), n
    order = edges[:]
    random.shuffle(order)                    # 按随机顺序收缩边
    for u, v in order:
        if components == 2:
            break
        ru, rv = find(parent, u), find(parent, v)
        if ru != rv:                         # 跳过已成为自环的边
            parent[ru] = rv
            components -= 1
    return sum(1 for u, v in edges if find(parent, u) != find(parent, v))

# 两个 5-团由两条边相连：最小割的大小为 2
edges = list(combinations(range(5), 2)) + list(combinations(range(5, 10), 2))
edges += [(0, 5), (1, 6)]
random.seed(2026)
runs = 10000
cuts = [contract(10, edges) for _ in range(runs)]
print(min(cuts), cuts.count(2) / runs, round(1 / 45, 4))
```

```console
$ python3 karger.py
2 0.2648 0.0222
```

::: example Karger 跑在两个团上 {#ex-karger}
解读上面的输出，并只用 [[#thm-karger]] 的保证算一算：要以 $99\%$ 的概率找到最小割，需要多少次运行。
::: solution
该图有 $n = 10$ 个顶点、$22$ 条边；最小割分开两个团，大小为 $2$（其他任何割都至少切断 $4$ 条团内的边）。$10\,000$ 次运行中 $26.5\%$ 返回了最小割——远好于保证值 $1/\binom{10}{2} = 1/45 \approx 2.2\%$，因为那个界假设的是最坏情形：每个顶点度数都恰为 $c$，而这里大多数边在团内部、不可能是割边。只用保证值来算，$N$ 次运行全部失败的概率至多 $(44/45)^N$；当 $N \ge \ln 100/(-\ln(44/45)) \approx 4.605/0.02247 \approx 205$ 时它不超过 $0.01$，即约需 $205$ 次运行。
:::
:::

::: widget plot
f: (1 - 1/45)^x; exp(-x/45); (1 - 0.2648)^x
x: 0, 250
y: 0, 1
labels: \text{保证下界 } (1 - 1/45)^N; e^{-N/45}; \text{实测 } (1 - 0.265)^N
points: 205,0.00998
caption: Karger 算法的 $N$ 次独立运行全部错过十个顶点实例的最小割的概率。保证值 $(1 - 1/\binom{n}{2})^N \le e^{-N/\binom n2}$（实线）在 $N = 205$ 处降到 $1\%$ 以下（圆点）；若按实测的单次成功率，失败概率在二三十次运行后便销声匿迹。误差放大把一个虽弱但为正的的成功概率变成近乎必然。
:::

::: corollary 最小割的个数 {#cor-min-cuts}
$n$ 个顶点的连通图至多有 $\binom n2$ 个互异的最小割。
:::

::: proof
“算法返回 $C$”这些事件——对不同最小割 $C$ ——两两不相容（一次运行只返回一个割），且由 [[#thm-karger]] 每个概率至少 $1/\binom n2$。这些概率之和不超过 $1$，故最小割至多 $\binom n2$ 个。界是紧的：$n$ 个顶点的圈恰有 $\binom n2$ 个最小割（任删圈的 $n$ 条边中的两条）。
:::

一个概率论证证明了确定性事实——这是**概率方法**的一个实例。

::: history
在计算中使用随机采样可追溯到 Los Alamos 的蒙特卡洛方法——Stanisław Ulam、冯·诺依曼（von Neumann）与 Nicholas Metropolis 创立（Metropolis 与 Ulam 1949 年的论文中命名）。随机化*算法*于 1970 年代兴起：Solovay 与 Strassen（1977）以及 Rabin（1980，建立在 Miller 1976 年判别法之上）给出了快速的随机化素性检验，成为实用公钥密码的基础；Rūsiņš Freivalds 于 1977 年发表了矩阵验证检验；Rabin 1976 年的报告 "Probabilistic algorithms" 则提出了这一纲领。Carter 与 Wegman 于 1977 年引入通用哈希（期刊版 1979）。Schwartz（1980）与 Zippel（1979）证明了多项式恒等引理。David Karger 的收缩算法发表于 1993 年，他与 Stein 合作的递归版本发表于 1996 年。随机性对高效计算是否曾经*必要*仍是悬而未决：猜想 $\mathsf{P} = \mathsf{BPP}$ 断言它不必要；而素性判定——昔日的招牌随机化算法——已由 Agrawal、Kayal 与 Saxena 于 2002 年证明属于 $\mathsf{P}$。
:::

## 后续内容

随机化算法在实践中无处不在：各语言运行时的哈希、排序库里的随机主元、密码学中的素性检验（[[cryptography]]）、大数据的随机采样与草图（sketching）技术，以及近似算法中的随机取整。[[complexity]] 研究它们定义的复杂性类——$\mathsf{RP}$、$\mathsf{ZPP}$、$\mathsf{BPP}$——以及“随机性可以被消除”（去随机化）的证据。概率分析同样是确定性算法平均情形行为的基础——例如随机输入上的快速排序——也是靠掷硬币打破对称性的分布式协议设计的基础（[[distributed-systems]]）。

::: summary
- **拉斯维加斯型**算法永远正确、运行时间随机；**蒙特卡洛型**算法时间有界、出错概率很小（[[#def-lv-mc]]）。随机性在算法里，绝不在输入里。
- 工具：期望的线性性配指示变量、联合界、**马尔可夫不等式**（[[#thm-markov]]）、几何等待时间、切尔诺夫界。独立重复把单侧误差 $p$ 压到 $p^k$。
- **Freivalds 检验**每次运行以 $O(n^2)$ 时间验证 $AB = C$，单侧误差至多 $1/2$（[[#thm-freivalds]]）。
- **通用哈希**：从碰撞概率 $\le 1/m$ 的函数族中随机选 $h$，对每个键集期望链长 $\le 1 + \alpha$（[[#thm-universal-chain]]）；$((ak + b) \bmod p) \bmod m$ 是通用的（[[#thm-carter-wegman]]）。$h$ 的选择必须保密。
- **Karger 算法**以概率 $\ge 1/\binom n2$ 找到指定的最小割（[[#thm-karger]]）；$\binom n2\ln n$ 次重复的失败概率 $\le 1/n$。由此最小割至多 $\binom n2$ 个（[[#cor-min-cuts]]）。
:::

## 习题

::: exercise 期望轮数 {level=1 check="8"}
一个拉斯维加斯型算法反复执行一轮：代价 $O(n)$，以 $1/8$ 的独立概率成功，直到成功为止。轮数的期望是多少？（输入该数。）
::: solution
轮数服从 $p = 1/8$ 的几何分布，期望为 $1/p = 8$。期望运行时间为 $O(8n) = O(n)$，而所需轮数超过 $k$ 的概率是 $(7/8)^k$。
:::
:::

::: exercise 马尔可夫不等式 {level=1 check="1/4"}
随机化快速排序的比较次数期望小于 $2n\ln n$。用马尔可夫不等式约束它至少作 $8n\ln n$ 次比较的概率。（输入该上界。）
::: solution
令 $X$ 为比较次数，$\Prob[X \ge 8n\ln n] \le \E[X]/(8n\ln n) < 2n\ln n/(8n\ln n) = 1/4$。马尔可夫界很弱——$n$ 大时真实概率微乎其微——但它除了非负性与均值之外什么都不需要。
:::
:::

::: exercise 随机哈希中的碰撞 {level=2 check="4950/1000"}
$100$ 个键用通用族中随机选取的函数哈希到 $m = 1000$ 个桶。约束发生碰撞的键对的期望个数。（输入该上界。）
::: solution
共有 $\binom{100}{2} = 4950$ 对键，每对碰撞的概率至多 $1/1000$；由期望的线性性，碰撞键对的期望个数至多 $4950/1000 = 4.95$。这并不意味着碰撞少见：由生日悖论，$100$ 个键用真正随机的函数哈希到 $1000$ 个桶、全在不同桶的概率为 $\prod_{i=1}^{99}(1 - i/1000) \approx 0.006$，所以几乎必有碰撞。通用哈希承诺的是平均碰撞少，不是一个都没有。
:::
:::

::: exercise 这是通用族吗？ {level=2}
对 $\{0, \dots, m-1\}$ 中的键，族 $\{h_a(k) = ak \bmod m : 0 \le a < m\}$ 是通用的吗？$m$ 是素数时呢？$m$ 是 $2$ 的幂时呢？
::: solution
$m$ 为素数且 $k \ne l$ 时，$h_a(k) = h_a(l)$ 当且仅当 $a(k - l) \equiv 0 \pmod m$ 当且仅当 $a = 0$（因 $k - l \not\equiv 0$ 可逆），概率 $1/m$：通用。$m = 2^r$ 时不通用：取 $k = 0$、$l = 2^{r-1}$；$a$ 为偶数时 $a l \bmod m$ 恒为 $0$，故它们以概率 $1/2 > 1/m$ 碰撞（$r \ge 2$）。
:::
:::

::: exercise 一元 Schwartz–Zippel {#ex-schwartz-zippel level=2}
证明 Schwartz–Zippel 引理的一元情形：域上次数为 $d$ 的非零多项式 $q(x)$，在域元素有限集 $S$ 中均匀取的 $x$ 处取零值的概率至多 $d/\lvert S\rvert$。用它检验两个以线性因子乘积给出的多项式 $\prod_i(x - a_i)$ 与 $\prod_i(x - b_i)$ 是否相等，误差不超过 $1/100$。
::: solution
域上次数为 $d$ 的非零多项式至多有 $d$ 个根（每个根 $r$ 都可由带余除法剥出因子 $x - r$，使次数下降）。所以 $S$ 中至多 $d$ 个元素是根，$\Prob[q(x) = 0] \le d/\lvert S\rvert$。检验时，差 $q = \prod(x - a_i) - \prod(x - b_i)$ 的次数至多 $d = n$（因子个数）；从 $S = \{0, 1, \dots, 100n - 1\}$ 中取 $x$（用精确整数或一个大素数的模运算），各用 $O(n)$ 次算术求两个乘积的值，值相等就判相等。若两多项式不同，检验被骗的概率至多 $n/(100n) = 1/100$；而展开乘积要化 $\Theta(n^2)$。
:::
:::

::: exercise Karger 跑在圈上 {level=2 check="1/6"}
在 $4$ 个顶点的圈上，Karger 算法的一次运行返回*指定的*一个最小割的确切概率是多少？与界 $1/\binom42$ 比较。（输入该概率。）
::: solution
圈有 $4$ 条边，其最小割是边对（$c = 2$）：删去圈的任何两条边，它分成两条路径。指定的最小割 $C$ 在第一次收缩中存活，要求收缩 $C$ 之外两条边中的一条，概率 $2/4$。收缩 $4$-圈的一条边剩下一个三角形，恰由 $C$ 的两条边与 $C$ 外剩余的那条边组成；第二次、也是最后一次收缩必须选中那条边，概率 $1/3$。于是 $C$ 被返回的概率为 $\frac12 \cdot \frac13 = \frac16$——恰等于界 $1/\binom42$。圈共有 $\binom42 = 6$ 个最小割而每次运行必返回其一，故每个恰以概率 $1/6$ 被返回。
:::
:::

::: exercise 集彩券问题 {level=3}
用真正随机的函数把键哈希到 $n$ 个桶，期望要插入多少个键才能使每个桶都非空？证明答案是 $nH_n \approx n\ln n$。
::: solution
把过程分为阶段：阶段 $i$（$i = 1, \dots, n$）持续到恰有 $i - 1$ 个桶非空。阶段 $i$ 中，每个新键以概率 $p_i = (n - i + 1)/n$ 落入空桶，且与过去独立，故阶段长度是均值为 $n/(n - i + 1)$ 的几何变量。由期望的线性性，总数为 $\sum_{i=1}^n n/(n - i + 1) = n\sum_{j=1}^n 1/j = nH_n$，而 $H_n = \ln n + O(1)$。所以 $n$ 个键放进 $n$ 个桶时，许多桶仍是空的——期望约 $n/e$ 个，因为每个桶都空着的概率为 $(1 - 1/n)^n \approx 1/e$。
:::
:::

::: exercise 从蒙特卡洛到拉斯维加斯 {level=3}
设求解搜索问题的蒙特卡洛型算法 $\mathcal A$ 运行 $T(n)$ 时间，以至少 $p > 0$ 的概率返回正确解（否则返回错误解），且解可在 $V(n)$ 时间内验证。构造一个拉斯维加斯型算法并约束其期望运行时间。再证明反向转化不需要验证器：期望时间 $t(n)$ 的拉斯维加斯型算法给出时间 $2kt(n)$、失败概率至多 $2^{-k}$ 的蒙特卡洛型算法。
::: solution
*拉斯维加斯型：*反复执行：跑 $\mathcal A$，验证其输出，正确就停止。每轮代价 $T(n) + V(n)$，独立地以至少 $p$ 的成功概率结束，故轮数被均值 $1/p$ 的几何变量控制，期望时间至多 $(T(n) + V(n))/p$；答案永远正确。*蒙特卡洛型：*把拉斯维加斯型算法最多跑 $2t(n)$ 步；由马尔可夫不等式，它未算完的概率至多 $t(n)/(2t(n)) = 1/2$。换用新随机性做 $k$ 次，返回最先得到的答案（必正确）；$k$ 次尝试全部超时的概率至多 $2^{-k}$，总时间 $2kt(n)$。（可以重开，因为每次尝试的运行时间期望都至多 $t(n)$，无论此前发生过什么。）
:::
:::
