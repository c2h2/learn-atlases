编译器遇到名字 `total_price`，必须立刻查明这个名字被声明成了什么。web 服务器收到一个会话令牌，必须找到它所属的会话。拼写检查器要判断 "recieve" 是不是一个单词。这些都是在大规模集合中按**键**查找，而且海量重复。有序数组配合二分查找能在 $O(\log n)$ 时间内回答（[[data-structures/asymptotic-analysis#thm-binary-search]]），但更新缓慢；链表容易更新，但查找需要 $\Theta(n)$。我们能同时胜过这两者吗？

如果键是小整数，比如 $0$ 到 $999$，我们尽可用一个 $1000$ 个槽位的数组，把键为 $k$ 的元素存进槽位 $k$：查找、插入、删除全是 $O(1)$ 时间。**哈希**（hashing，散列）把这个想法推广到任何类型的键——字符串、元组、大整数——办法是为每个键算出一个小的整数，即它的**哈希值**，并用它作为数组下标。不同的键可能算出同一个下标，所以功夫在于把函数选得好，并且处理好随之而来的**冲突**。这两件事做好时，每个操作*平均*只需 $O(1)$ 时间——我们必须把"平均"说清楚，因为关于哈希表最常见的误解恰恰藏在这个词里。

## 字典问题

::: definition 映射（字典） {#def-map}
**映射**（map，又称**字典**或**关联数组**）存放一个键互不相同的 (键, 值) 对集合。它的操作是 `put(k, v)`（把 $v$ 与 $k$ 绑定，替换任何已有的值）、`get(k)`（返回与 $k$ 绑定的值，不存在则报错）、`delete(k)` 与 `contains(k)`。**集合**是只有键没有值的特例。
:::

Python 的 `dict` 与 `set`（[[programming-1/dictionaries-sets]]）、Java 的 `HashMap` 与 `HashSet`、C++ 的 `std::unordered_map`，都是实现这些抽象数据类型的哈希表。下面用 $U$ 表示所有可能的键构成的**全集**，$n$ 表示已存放的键数，$m$ 表示表中槽位的个数。

**直接寻址表**是一个数组 $T[0..\lvert U\rvert - 1]$，键 $k$ 住在 $T[k]$。当 $U$ 小时它非常理想，但当 $U$ 是全体字符串、或全体 64 位整数时就毫无用处：尽管实际存放的键不过几千个，数组却会大到天文数字。哈希只保持一个与 $n$ 成比例、而非与 $\lvert U\rvert$ 成比例的规模 $m$ 的数组。

## 哈希函数

::: definition 哈希函数与冲突 {#def-hash}
对一张有 $m$ 个槽位的表，**哈希函数**是一个函数 $h\colon U \to \set{0, 1, \dots, m-1}$。称键 $k$ **哈希到**槽位 $h(k)$，$h(k)$ 称为它的**哈希值**。两个不同的键 $k \ne k'$，若 $h(k) = h(k')$，则称它们**冲突**。
:::

只要 $\lvert U\rvert > m$，由抽屉原理，冲突就不可避免：必有某个槽位至少接收全集中的 $\lvert U \rvert / m$ 个键。好的哈希函数让冲突在*实际出现的键*上变得罕见。我们希望 $h$ 满足

- **确定性**——同一个键永远哈希到同一个槽位，否则我们永远找不到它；
- **快**——定长键用 $O(1)$ 时间，字符串用 $O(\text{长度})$；
- **分散**——实践中出现的键，包括 `x1`、`x2`、`x3` 这样彼此相似的键，应当落到看起来相互独立、均匀分布的槽位上。

### 整数：除留余数法与乘法取整法

**除留余数法**取 $h(k) = k \bmod m$。它很快，但对 $m$ 的选取很敏感。若 $m = 2^p$，则 $k \bmod m$ 不过是 $k$ 的低 $p$ 位，于是只在高位上不同的键——例如对齐到 $16$ 的倍数的内存地址——全部相互冲突。常见的选择是离 $2$ 的幂较远的素数 $m$。

**乘法取整法**固定 $m = 2^p$（便于成倍扩大表）和一个常数 $0 < A < 1$，取 $h(k) = \lfloor m \cdot (kA \bmod 1)\rfloor$：即 $kA$ 的小数部分的前 $p$ 个二进制位。在 $w$ 位字上，一次乘法和一次移位即可算出：取 $s = \lfloor A\cdot 2^w\rfloor$，计算 $k\cdot s$ 模 $2^w$，保留高 $p$ 位。高德纳（Knuth）建议 $A \approx (\sqrt5 - 1)/2 \approx 0.618$。$k$ 的每一个位都会影响乘积的高位，除留余数法的低位问题于是消失。

### 字符串：多项式哈希

字符串 $s = c_0 c_1 \dots c_{\ell-1}$ 可以这样变成一个数：把各字符编码看作某个基数 $B$ 下的数字：

$$
h(s) = \bigl(c_0 B^{\ell - 1} + c_1 B^{\ell - 2} + \dots + c_{\ell-1}\bigr) \bmod m,
$$ {#eq-poly-hash}

用霍纳法则计算，每一步之后都模 $m$ 约简，数因而保持很小：

```python
def string_hash(s, base=31, m=101):
    h = 0
    for ch in s:
        h = (h * base + ord(ch)) % m    # 霍纳法则，边算边约简
    return h

for w in ["cat", "act", "tac", "dog"]:
    print(w, string_hash(w))
```

```console
$ python3 strhash.py
cat 90
act 48
tac 48
dog 58
```

哈希值依赖于字符的*次序*——`cat` 与 `act` 不同——不像那个诱人但糟糕透顶的"字符编码之和"，它会把所有字母重排（anagram）送进同一个槽位。尽管如此，`act` 与 `tac` 在这里仍然冲突：槽位只有 $101$ 个时，寥寥几个键之间出现冲突是意料中事，下一节就来算这件事。

::: example 手算多项式哈希 {#ex-poly-hash}
取基数 $31$、$m = 101$，计算 `string_hash("cat")`。字符编码为 `c` $= 99$，`a` $= 97$，`t` $= 116$。
::: solution
霍纳法则，每步之后模 $101$ 约简：

| 步 | 计算 | $h$ |
|---|---|---|
| 开始 | | $0$ |
| `c` | $(0\cdot 31 + 99) \bmod 101$ | $99$ |
| `a` | $(99 \cdot 31 + 97) \bmod 101 = 3166 \bmod 101$ | $35$ |
| `t` | $(35 \cdot 31 + 116) \bmod 101 = 1201 \bmod 101$ | $90$ |

所以 $h(\texttt{cat}) = 90$，与程序打印的一致。每步约简与先算出 $99\cdot31^2 + 97\cdot 31 + 116 = 98\,262$ 再一次性约简（$98\,262 = 972 \cdot 101 + 90$）给出相同结果，因为 $(a \bmod m)\cdot B + c \equiv aB + c \pmod m$——参见[数学图谱：模运算](/learn/maths/lesson.php?c=number-theory&l=congruences)。
:::
:::

### Python 的 `hash`

Python 把两件事分开。内建函数 `hash(x)` 把一个对象映射为一个 64 位整数；表再把它约简为一个槽位。对整数，在 64 位实现上 `hash(n)` 是 $n$ 模素数 $2^{61} - 1$ 的余数（有个古怪之处：`hash(-1)` 是 $-2$，因为在 CPython 的 C 代码里 $-1$ 表示出错）。对字符串与字节串，自 Python 3.4 起 `hash` 使用带密钥的函数 SipHash，其密钥在启动时随机选取，所以 `hash("cat")` 在一次次的 Python 运行之间都不相同（除非用环境变量 `PYTHONHASHSEED` 把它固定下来）。原因是安全，见 [[#sec-worst-case]]。默认只有不可变对象是可哈希的：`list` 不能做字典的键，因为插入之后再改动它，它的哈希就会改变，从而被搁浅在错误的槽位里。

## 冲突不可避免：生日问题

最多能插入多少个键，才等到第一次冲突？我们把情形理想化：假设每个键的哈希值相互独立，且在 $m$ 个槽位上均匀分布。

::: proposition 生日界 {#prop-birthday}
若 $n$ 个键相互独立、均匀地哈希进 $m$ 个槽位，则冲突对的期望个数为 $\binom{n}{2}/m = n(n-1)/(2m)$，并且一个冲突都没有的概率为

$$
\prod_{i=0}^{n-1}\Bigl(1 - \frac{i}{m}\Bigr) \;\le\; e^{-n(n-1)/(2m)}.
$$
:::

::: proof
对每一对键 $i < j$，令 $X_{ij}$ 在二者冲突时取 $1$，否则取 $0$。无论键 $i$ 落在哪个槽位，键 $j$ 落进同一个槽位的概率都是 $1/m$，所以 $\E[X_{ij}] = 1/m$。由期望的线性性（这不要求诸 $X_{ij}$ 相互独立），冲突对的期望个数为 $\sum_{i<j}\E[X_{ij}] = \binom n2 / m$。

要完全没有冲突，键 $i+1$ 必须避开已被占用的 $i$ 个槽位，这与之前发生的事独立，概率为 $1 - i/m$；连乘即得乘积。由于对一切实数 $x$ 有 $1 - x \le e^{-x}$，该乘积不超过 $\exp(-\sum_{i<n} i/m) = e^{-n(n-1)/(2m)}$。
:::

取 $m = 365$ 个"槽位"、$n = 23$ 个人，则生日相同的期望对数为 $23\cdot22/730 \approx 0.69$，而生日全不相同的概率是 $0.493$：这 $23$ 人中恰有两人同一天生日的可能性更大。就哈希而言，一旦 $n$ 达到 $\sqrt m$ 量级，冲突就变得可能——槽位有一百万个时，只需要大约一千个键。所以处理冲突不是例外情形，而是每一张哈希表的常态。（概率背景：[数学图谱：期望](/learn/maths/lesson.php?c=probability&l=expectation)。）

## 链地址法

处理冲突最简单的方法，是让每个槽位挂一个存放所有哈希到它的键的链表。

::: definition 链地址法哈希表 {#def-chaining}
**链地址法哈希表**是一个由**桶**组成的数组 $T[0..m-1]$，每个桶是一个 (键, 值) 对的链表（常用单链表）。键 $k$ 存放在桶 $T[h(k)]$ 中。`get(k)` 与 `delete(k)` 在桶 $T[h(k)]$ 中查找 $k$；`put(k, v)` 若在其中找到 $k$ 就替换其值，否则把 $(k, v)$ 加入该桶。**装填因子**为 $\alpha = n/m$，即每个桶的平均键数。
:::

::: example 向链地址表中插入 {#ex-chaining}
把键 $50, 700, 76, 85, 92, 73, 101$ 依次插入一张 $m = 7$、$h(k) = k \bmod 7$ 的链地址法表，每个桶尾接。哪些桶被用上了？对每个键的成功查找要做多少次键比较？
::: solution
哈希值为 $50 \bmod 7 = 1$，$700 \bmod 7 = 0$，$76 \bmod 7 = 6$，$85 \bmod 7 = 1$，$92 \bmod 7 = 1$，$73 \bmod 7 = 3$，$101 \bmod 7 = 3$。表为

| 桶 | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| 链 | 700 | 50 → 85 → 92 | | 73 → 101 | | | 76 |

查找一个键时，要与它所在链中它前面的每个键各比较一次，再与它自己比较一次：$50, 700, 73, 76$ 需要 $1$ 次比较，$85$ 与 $101$ 需要 $2$ 次，$92$ 需要 $3$ 次。平均为 $(1+1+1+2+3+1+2)/7 = 11/7 \approx 1.57$。装填因子为 $\alpha = 7/7 = 1$；若哈希值是随机的，[[#thm-chaining]] 的公式预测 $1 + \alpha/2 - \alpha/(2n) = 1 + 0.5 - 1/14 \approx 1.43$——这些键并不随机，有三个落进了同一个桶。对例如 $8$（桶 1）的不成功查找要做 $3$ 次比较。
:::
:::

下面是一个完整的链地址法映射，用 Python 列表做桶，装填因子超过 $1$ 时扩大表：

```python
class ChainedHashMap:
    """Map with separate chaining; doubles the table when the load factor exceeds 1."""
    def __init__(self, m=8):
        self.table = [[] for _ in range(m)]   # 每个桶：一个 (key, value) 列表
        self.n = 0

    def _bucket(self, key):
        return self.table[hash(key) % len(self.table)]

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        raise KeyError(key)

    def put(self, key, value):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)       # 替换已有的键
                return
        bucket.append((key, value))
        self.n += 1
        if self.n > len(self.table):           # 装填因子超过 1：扩容
            self._resize(2 * len(self.table))

    def delete(self, key):
        bucket = self._bucket(key)
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket[i] = bucket[-1]         # 桶内顺序无关紧要
                bucket.pop()
                self.n -= 1
                return
        raise KeyError(key)

    def _resize(self, m):
        old = self.table
        self.table = [[] for _ in range(m)]
        for bucket in old:                     # 重新散列：位置依赖于 m
            for k, v in bucket:
                self._bucket(k).append((k, v))
```

```python
d = ChainedHashMap()
for i, word in enumerate("the quick brown fox jumps over the lazy dog".split()):
    d.put(word, i)
print(d.n, len(d.table), d.get("the"), d.get("dog"))
d.delete("fox")
print(d.n, sum(len(b) for b in d.table))
```

```console
$ python3 chained.py
8 8 6 8
7 7
```

第二次 `put("the", 6)` 替换了第一次的值，所以不同的键有 $8$ 个；装填因子恰好达到 $1$ 而没有超过，于是没有触发扩容。（每个单词落进哪个桶每次运行都不同，因为 Python 会随机化字符串哈希；打印结果不依赖于此。）

### 链地址法的代价

`get(k)` 的代价是计算 $h(k)$ 的 $O(1)$ 加上桶 $h(k)$ 中被检查的键数。最坏情况下 $n$ 个键全部哈希到同一个桶，一次查找要 $\Theta(n)$——不比链表好。要说出更好的结论，需要对键如何分散作出假设。

::: definition 简单一致哈希 {#def-suha}
**简单一致哈希假设**：每个键等可能地哈希到 $m$ 个槽位中的任意一个，且与其他键哈希到哪里无关。
:::

这是关于键与哈希函数两者的陈述，没有任何固定的哈希函数能对所有输入满足它：无论 $h$ 是什么，全集中总存在 $n$ 个键共享一个槽位。它是"典型"输入的一个模型。在此假设下，某个特定桶的长度是 $n$ 个相互独立、概率各为 $1/m$ 的指示随机变量之和——服从均值为 $\alpha$ 的二项分布；$m$ 大时接近均值为 $\alpha$ 的泊松分布。

::: widget distribution
dist: poisson
params: lambda=1
a: 0
b: 2
caption: 简单一致哈希下，给定桶中的键数近似服从均值 $\lambda = \alpha$ 的泊松分布。装填因子为 $1$ 时，约 $37\%$ 的桶是空的，$37\%$ 恰好放一个键，只有 $8\%$ 放了三个以上；阴影部分是"一个桶至多放两个键"的概率。改变 $\lambda$，观察链如何随着表的填满而变长。
:::

一次快速模拟可以印证。它把 $100\,000$ 个键随机投进 $100\,000$ 个桶，把每种长度的桶所占的比例与泊松概率 $e^{-1}/k!$ 相比较：

```python
import random
from collections import Counter
from math import exp, factorial

random.seed(1)
m = n = 100_000                       # 装填因子 1
lengths = Counter()
counts = [0] * m
for _ in range(n):
    counts[random.randrange(m)] += 1  # 每个键随机选一个桶
for c in counts:
    lengths[c] += 1
for k in range(7):                    # 观测比例 vs Poisson(1)
    print(k, f"{lengths[k] / m:.4f}", f"{exp(-1) / factorial(k):.4f}")
print("longest chain:", max(counts))
```

```console
$ python3 chains.py
0 0.3668 0.3679
1 0.3695 0.3679
2 0.1837 0.1839
3 0.0612 0.0613
4 0.0154 0.0153
5 0.0030 0.0031
6 0.0005 0.0005
longest chain: 7
```

频率与理论值吻合到小数点后约三位。最长的链 $7$ 远大于平均值 $1$：*最大*链长的期望按 $\ln n/\ln\ln n$ 增长，这提醒我们"每个操作期望 $O(1)$"并不等于"每条链都短"。

::: theorem 链地址法的期望代价 {#thm-chaining}
简单一致哈希下，装填因子为 $\alpha = n/m$ 的链地址法表满足：

1. 不成功查找平均检查 $\alpha$ 个键，期望时间为 $\Theta(1 + \alpha)$；
2. 对 $n$ 个已存键中均匀选取的一个键做成功查找，且每个新键都尾接到所在链的末尾，则平均检查 $1 + \dfrac{\alpha}{2} - \dfrac{\alpha}{2n}$ 个键，同样是 $\Theta(1 + \alpha)$。

特别地，只要 $m$ 与 $n$ 保持成比例，使 $\alpha = O(1)$，每个操作就只需期望 $O(1)$ 时间。
:::

::: proof
(1) 对 $k$ 的不成功查找要检查桶 $h(k)$ 中的每个键。对每个已存键 $x$，$x$ 在该桶中的概率是 $1/m$，所以由线性性，被检查键数的期望为 $n/m = \alpha$。加上计算 $h(k)$ 的 $O(1)$，得 $\Theta(1 + \alpha)$。

(2) 把已存键按插入顺序编号为 $x_1, \dots, x_n$。查找 $x_i$ 时，检查的正是 $x_i$ 自己和它所在链中在它之前的键，也就是满足 $j < i$ 且 $h(x_j) = h(x_i)$ 的那些键 $x_j$。每个这样的 $j$ 以概率 $1/m$ 有贡献，所以被检查键数的期望为 $1 + (i-1)/m$。对 $i$ 取平均，

$$
\frac1n \sum_{i=1}^{n}\Bigl(1 + \frac{i-1}{m}\Bigr) = 1 + \frac{1}{nm}\cdot\frac{n(n-1)}{2} = 1 + \frac{n-1}{2m} = 1 + \frac{\alpha}{2} - \frac{\alpha}{2n}. \qquad\blacksquare
$$
:::

### 扩容

定理要求 $\alpha = O(1)$，所以表必须随 $n$ 增长。当 $\alpha$ 超过某个阈值（链地址法常取 $1$）时，分配一张两倍大的表并**重新散列**：把每个键重新插入，因为 $h(k) = \operatorname{hash}(k) \bmod m$ 随 $m$ 改变。一次重新散列花 $\Theta(n)$，但由 [[data-structures/arrays-lists#thm-doubling]] 的倍增论证，$n$ 次插入的全部重新散列代价为 $O(n)$，所以插入仍是 $O(1)$——只不过现在是*期望摊还*的：期望是对哈希取的，摊还是对操作序列取的。

## 通用哈希

简单一致哈希是关于输入的假设。一个知道 $h$ 的敌手可以故意选出相互冲突的键来破坏它。卡特（Carter）与韦格曼（Wegman）的答案，是把随机性从输入移到算法：建表之时，从一个合适的函数族中随机选取哈希函数本身。

::: definition 通用哈希函数族 {#def-universal}
哈希函数 $U \to \set{0, \dots, m-1}$ 的族 $\mathcal H$ 称为**通用的**，如果对任意一对不同的键 $x \ne y$，

$$
\Prob_{h \in \mathcal H}\bigl[h(x) = h(y)\bigr] \le \frac1m,
$$

其中 $h$ 从 $\mathcal H$ 中均匀随机选取。
:::

这里的概率只相对于 $h$ 的选取；键可以任意，甚至由敌手挑选——只要敌手挑选时不知道抽到的是哪个 $h$。

::: theorem 通用哈希下的链地址法 {#thm-universal}
设 $h$ 取自一个通用族，链地址法表存放任意固定的 $n$ 个键。则对任何键 $k$，桶 $h(k)$ 中除 $k$ 外已存键的期望个数，在 $k$ 未被存放时不超过 $\alpha$，在 $k$ 被存放时不超过 $(n-1)/m < \alpha$。因此，对每一组键，每次查找都只需期望 $O(1 + \alpha)$ 时间。
:::

::: proof
对每个已存键 $x \ne k$，令 $Y_x$ 在 $h(x) = h(k)$ 时取 $1$，否则取 $0$。由通用性，$\E[Y_x] \le 1/m$。$k$ 的桶中其他键的个数为 $\sum_{x \ne k} Y_x$，其期望不超过 $1/m$ 乘以项数：$k$ 未被存放时为 $n/m$，被存放时为 $(n-1)/m$。
:::

通用族存在，而且其中的函数求值便宜。对 $\set{0, \dots, p - 1}$ 中的整数键，$p$ 为素数且 $p \ge m$，族

$$
h_{a,b}(k) = \bigl((ak + b) \bmod p\bigr) \bmod m, \qquad a \in \set{1, \dots, p-1},\; b \in \set{0, \dots, p-1}
$$ {#eq-carter-wegman}

是通用的（卡特与韦格曼，1979；证明可见 Cormen、Leiserson、Rivest 与 Stein，§11.3）。建表时随机选取 $a$ 与 $b$，每个操作不增加任何代价。例如取 $p = 17$，$m = 6$，$a = 3$，$b = 4$：$h(8) = ((24 + 4) \bmod 17) \bmod 6 = 11 \bmod 6 = 5$。

::: example 通用族下的两个键 {#ex-universal}
在 [[#eq-carter-wegman]] 中取 $p = 5$、$m = 2$，于是共有 $4 \times 5 = 20$ 个函数 $h_{a,b}$。对键 $x = 1$ 与 $y = 3$，数一数 $20$ 个函数中有多少使它们冲突，并与界 $1/m$ 比较。
::: solution
先算 $u = (a + b) \bmod 5$ 与 $v = (3a + b) \bmod 5$；两键冲突当且仅当 $u \bmod 2 = v \bmod 2$。由于 $a \ne 0$ 且 $3 - 1 = 2$ 模 $5$ 可逆，有 $u \ne v$；并且当 $(a, b)$ 取遍 $20$ 种选择时，$(u, v)$ 恰好各取一遍模 $5$ 剩余类的所有 $20$ 个*不同*剩余组成的有序对。（给定 $u \ne v$，解 $2a \equiv v - u$ 与 $b \equiv u - a$。）于是问题化为数 $\set{0,1,2,3,4}$ 中奇偶相同的有序对 $u \ne v$：偶剩余 $\set{0, 2, 4}$ 给出 $3 \cdot 2 = 6$ 对，奇剩余 $\set{1, 3}$ 给出 $2\cdot 1 = 2$ 对，共 $8$ 对。冲突概率为 $8/20 = 0.4 \le 1/m = 0.5$，符合通用性的要求。

同样的论证适用于一般情形：映射 $(a, b) \mapsto (u, v)$ 是到"不同剩余组成的有序对"集合的双射，而在 $v \ne u$ 的 $p - 1$ 个取值中，满足 $v \equiv u \pmod m$ 的至多 $\lceil p/m\rceil - 1 \le (p-1)/m$ 个。这就是通用性证明的轮廓。
:::
:::

::: quiz
一张 $m = 1000$ 个桶的链地址法表存放 $n = 3000$ 个键，使用从通用族中抽出的哈希函数。哪条陈述是有保证的？
- [ ] 每个桶恰好放 $3$ 个键。
- [ ] 没有桶放超过 $3$ 个键。
- [x] 对每个键 $k$，$k$ 的桶中其他键的期望个数不超过约 $3$。
- [ ] 查找至多做 $4$ 次比较。
::: solution
通用性约束的是对 $h$ 的随机选取的*期望*，对每个固定的键而言（[[#thm-universal]]）：平均而言，至多 $(n-1)/m \approx 3$ 个其他键与 $k$ 同桶。它对"所有桶同时如何"什么也没说，某些不走运的 $h$ 会产生很长的链；它只是让这些情况不太可能出现。
:::
:::

## 开放定址法

**开放定址法**把所有键都存在数组本身里，一个槽位一个键，不挂链表。当槽位 $h(k)$ 已被占用，就按固定的次序尝试其他槽位——$k$ 的**探测序列**——直到找到 $k$ 或找到一个空槽。

::: definition 开放定址法与探测序列 {#def-open}
在**开放定址法**中，每个键 $k$ 有一个探测序列 $h(k, 0), h(k, 1), \dots, h(k, m-1)$，它是 $\set{0, \dots, m-1}$ 的一个排列。插入把 $k$ 放入其序列中的第一个空槽；查找沿序列进行，直到找到 $k$（成功）或找到空槽（失败）。常见取法，其中 $h_1, h_2$ 是普通哈希函数：

- **线性探测**：$h(k, i) = (h_1(k) + i) \bmod m$；
- **平方探测**：$h(k, i) = (h_1(k) + c_1 i + c_2 i^2) \bmod m$；
- **双重哈希**：$h(k, i) = (h_1(k) + i\,h_2(k)) \bmod m$，其中 $h_2(k)$ 恒不为 $0$ 且与 $m$ 互素（例如 $m$ 为素数，或 $m$ 为 $2$ 的幂而 $h_2(k)$ 为奇数）。

此时装填因子 $\alpha = n/m$ 不超过 $1$。
:::

::: example 线性探测 {#ex-linear-probing}
用线性探测与 $h_1(k) = k \bmod 7$，把 $50, 700, 76, 85, 92, 73, 101$（按此顺序）插入一张规模 $m = 7$ 的表。每次插入要探测多少次？
::: solution
| 键 | $h_1(k)$ | 探测过的槽位 | 落位 | 探测次数 |
|---|---|---|---|---|
| 50 | 1 | 1 | 1 | 1 |
| 700 | 0 | 0 | 0 | 1 |
| 76 | 6 | 6 | 6 | 1 |
| 85 | 1 | 1, 2 | 2 | 2 |
| 92 | 1 | 1, 2, 3 | 3 | 3 |
| 73 | 3 | 3, 4 | 4 | 2 |
| 101 | 3 | 3, 4, 5 | 5 | 3 |

最终的表是 `[700, 50, 85, 92, 73, 101, 76]`，完全装满。对一个键的成功查找会重演它插入时的探测，所以平均为 $13/7 \approx 1.86$，比 [[#ex-chaining]] 中链地址法在同一组键上的 $11/7$ 更差。注意 $73$ 遭遇了什么：它的起始槽位 $3$ 被 $92$ 占了——一个哈希值*不同*的键——因为从槽位 $1$ 开始的连段已经蔓延到了那里。这就是**一次聚簇**：已占用的连段会不断生长，连段越长，下一个键越容易落进它、使它变得更长。
:::
:::

**删除**需要小心。直接把槽位置空，会断掉任何探测序列经过该槽位的键的查找：查找会在新出的空洞前停下，错误地报告不存在。通常的补救是在被删之处放一个**墓碑**标记，查找越过它继续，插入则可以复用它的槽位。墓碑计入查找的装填，所以删除频繁的表要定期重建。（线性探测另有特殊的替代办法：把连段中靠后的键逐个往前挪，填上空洞。）

### 开放定址法的代价

简单一致哈希之于开放定址法的对应物，是**一致哈希假设**：每个键的探测序列等可能是槽位的全部 $m!$ 个排列中的任何一个，不同键之间相互独立。双重哈希对它有不错的近似；线性探测的序列只有 $m$ 个循环平移，差得很远。

::: theorem 一致哈希下的期望探测次数 {#thm-open}
一致哈希假设下，装填因子 $\alpha = n/m < 1$ 的开放定址表满足：

1. 不成功查找的期望探测次数不超过 $\dfrac{1}{1 - \alpha}$；
2. 对均匀选取的一个已存键做成功查找，期望探测次数不超过 $\dfrac{1}{\alpha}\ln\dfrac{1}{1-\alpha}$。
:::

::: proof
(1) 设 $X$ 为探测次数。$X$ 取正整数值，故 $\E[X] = \sum_{i \ge 1}\Prob[X \ge i]$。不成功查找至少探测 $i$ 次，当且仅当被探测的前 $i - 1$ 个槽位全部已被占用。第一次探测撞上已占槽位的概率为 $n/m$；在此条件下，第二次探测等可能地落在*其他*槽位之一，该槽位被占的概率为 $(n-1)/(m-1)$；依此类推。由于对 $0 \le j < n \le m$ 有 $(n-j)/(m-j) \le n/m$，

$$
\Prob[X \ge i] = \frac{n}{m}\cdot\frac{n-1}{m-1}\cdots\frac{n-i+2}{m-i+2} \le \alpha^{i-1},
\qquad
\E[X] \le \sum_{i\ge1}\alpha^{i-1} = \frac{1}{1-\alpha}.
$$

(2) 对一个键的成功查找，走的正是当初插入该键的探测序列。插入第 $(i+1)$ 个键时，表中有 $i$ 个键，于是由 (1)，那次插入——一次不成功查找加一次写入——的期望探测次数不超过 $1/(1 - i/m) = m/(m-i)$。对 $n$ 个键取平均，

$$
\frac1n\sum_{i=0}^{n-1}\frac{m}{m-i} = \frac{1}{\alpha}\sum_{j=m-n+1}^{m}\frac1j \le \frac1\alpha\int_{m-n}^{m}\frac{dx}{x} = \frac1\alpha\ln\frac{m}{m-n} = \frac1\alpha\ln\frac{1}{1-\alpha},
$$

其中和式由积分控制，因为 $1/x$ 递减。
:::

$\alpha = 1/2$ 时，两个界分别是 $2$ 和 $1.39$ 次探测；$\alpha = 0.9$ 时是 $10$ 和 $2.56$。表越满，不成功查找受害越重。线性探测因聚簇而更糟：高德纳（Knuth）的分析（1963；后收入《计算机程序设计艺术》第 3 卷 §6.4），在哈希值 $h_1(k)$ 独立且均匀随机的假设下，对大规模表给出近似

$$
\frac12\Bigl(1 + \frac{1}{(1-\alpha)^2}\Bigr) \text{ 次探测（不成功）}, \qquad \frac12\Bigl(1 + \frac{1}{1-\alpha}\Bigr) \text{ 次探测（成功）}
$$ {#eq-knuth-linear}

我们对此只陈述，不证明。

::: widget plot
f: 1/(1 - x); (1 + 1/(1 - x)^2)/2; 1 + x
labels: \text{开放定址（一致哈希）}; \text{线性探测}; \text{链地址法}
x: 0, 0.95
y: 0, 25
caption: 不成功查找的期望探测次数（链地址法即键比较次数）随装填因子 $\alpha$ 的变化。链地址法退化平缓（算上哈希计算为 $1+\alpha$）；开放定址法在 $\alpha \to 1$ 时急剧爆炸，线性探测最快失控。这正是开放定址表远未装满就扩容的原因——例如 Python 的 `dict` 在三分之二满时扩容。
:::

一个线性探测的模拟（这是观察，哈希值取理想化的随机数，$m = 1000$，每个装填因子做 $20$ 次试验）与 [[#eq-knuth-linear]] 相当吻合：

```python
import random

def linear_probing_experiment(m, alpha, trials=20):
    """Average probes for successful and unsuccessful search with linear probing."""
    succ = unsucc = 0.0
    for _ in range(trials):
        table = [None] * m
        home = {}                                  # key -> 它的哈希值
        for key in range(int(alpha * m)):
            h = home[key] = random.randrange(m)    # 理想化的随机哈希值
            while table[h] is not None:
                h = (h + 1) % m                    # 探测下一个槽位
            table[h] = key
        # 成功查找：从起始槽到该键所在槽的探测次数
        succ += sum((table.index(k) - h) % m + 1 for k, h in home.items()) / len(home)
        # 不成功查找：从每个可能的起始槽到第一个空槽
        total = 0
        for h in range(m):
            probes = 1
            while table[(h + probes - 1) % m] is not None:
                probes += 1
            total += probes
        unsucc += total / m
    return succ / trials, unsucc / trials

random.seed(2026)
for alpha in [0.5, 0.75, 0.9]:
    s, u = linear_probing_experiment(1000, alpha)
    print(f"alpha {alpha}: successful {s:.2f} (formula {(1 + 1/(1 - alpha)) / 2:.2f}), "
          f"unsuccessful {u:.2f} (formula {(1 + 1/(1 - alpha)**2) / 2:.2f})")
```

```console
$ python3 probing.py
alpha 0.5: successful 1.49 (formula 1.50), unsuccessful 2.54 (formula 2.50)
alpha 0.75: successful 2.47 (formula 2.50), unsuccessful 8.42 (formula 8.50)
alpha 0.9: successful 5.22 (formula 5.50), unsuccessful 46.77 (formula 50.50)
```

那还为什么要用线性探测？因为它的探测访问连续的槽位，而它们落在同一条缓存行里；在真实硬件上，缓存内多探测几次，比一次落空的探测便宜（见 [[data-structures/arrays-lists]] 中关于局部性的讨论）。配上好的哈希函数并把 $\alpha$ 保持在约 $0.7$ 以下，线性探测是实践中最快的哈希表之一。它的理论也比名声更好：Pagh、Pagh 与 Ružić（2007）证明，使用 5-wise 独立哈希族的线性探测，对任何固定的 $\alpha < 1$，每个操作的期望代价都是 $O(1)$。

## 哈希表并不总是 O(1) {#sec-worst-case}

::: warning "哈希表是 O(1)"需要三个限定条件
哈希表的一切 $O(1)$ 断言都是**期望的**、建立在某个**假设**之上的，并且在表会扩容时是**摊还的**。

1. *是期望，不是最坏情况。* 任何固定的哈希函数，都存在一组键全部相互冲突，此时链地址法每次查找要 $\Theta(n)$，开放定址法也好不到哪去。$O(1)$ 是对随机哈希值取的平均（[[#thm-chaining]]、[[#thm-open]]），或对哈希函数的随机选取取的平均（[[#thm-universal]]）。
2. *假设关于键或函数。* 简单一致哈希是典型输入的模型；糟糕的哈希函数（字符求和、取对齐地址的低位）在普通数据上就会严重破坏它。
3. *扩容时是摊还的。* 一次触发重新散列的插入，自身就要花 $\Theta(n)$。

对一个键做哈希还要花费与其长度成正比的实践：查找一个长度为 $\ell$ 的字符串，哈希要 $\Theta(\ell)$；键比较一次至多花 $\Theta(\ell)$。
:::

第一点对安全至关重要。攻击者若能预测 web 服务器请求解析器所用的哈希函数，就能发送成千上万个两两冲突的参数名，把每次插入变成对一条长链的扫描，让服务器为 $n$ 个参数做 $\Theta(n^2)$ 的工作。斯科特·克罗斯比（Scott Crosby）与丹·沃利奇（Dan Wallach）在 2003 年描述了这类**算法复杂度攻击**，2011 年又在多个 web 平台上演示了它。防御正是 [[#thm-universal]] 的思想：让哈希函数不可预测——启动时从一个设计良好的族中随机选取。这就是 Python 随机化字符串哈希的原因（自 Python 3.3 起默认如此，自 3.4 起使用 SipHash），也是 `hash("cat")` 每次运行都不同的原因。许多库还通过限制接受来自不可信输入的键的个数来控制损害；Java 的 `HashMap`（自 Java 8 起）把过长的链转换成平衡树，把最坏情况限定为每个操作 $O(\log n)$。

### Python 的 dict

在 CPython 3.14 中，`dict` 是一张规模取 $2$ 的幂的开放定址表。它不做线性探测：探测序列由递推 $j \gets (5j + 1 + \mathit{perturb}) \bmod 2^p$ 生成，其中 $\mathit{perturb}$ 初始为完整的哈希值，每步右移 $5$ 位，于是哈希的所有位最终都会影响序列。表在三分之二满时扩容。自 Python 3.6 起，表项存放在一个独立的、按插入顺序排列的紧凑数组里，哈希表本身只存放指向它的下标；这既省内存，也使得迭代沿插入顺序进行——语言自 Python 3.7 起保证这一点。这些是可能改变的细节；有保证的是平均 $O(1)$ 的操作与迭代顺序。

::: quiz
一张装填因子为 $0.9$ 的线性探测开放定址表，按高德纳的公式，一次不成功查找大约平均探测多少次？
- [ ] $2$
- [ ] $10$
- [x] $50$
- [ ] $100$
::: solution
$\tfrac12(1 + 1/(1 - 0.9)^2) = \tfrac12(1 + 100) = 50.5$。一致哈希至多需要 $1/(1-0.9) = 10$ 次探测；两者的差距正是一次聚簇的代价。$\alpha = 0.5$ 时线性探测只需 $2.5$。
:::
:::

::: history
哈希诞生于 1950 年代初的 IBM。汉斯·彼得·卢恩（Hans Peter Luhn）在 1953 年 1 月的一份内部备忘录中提出用计算出的地址把元素放入"桶"，溢出用链处理；吉恩·阿姆达尔（Gene Amdahl）、伊莱恩·麦克劳（Elaine McGraw）与阿瑟·塞缪尔（Arthur Samuel）在 1954 年为 IBM 701 编写汇编程序时使用了线性探测的开放定址法。阿诺德·杜米（Arnold Dumey）在 1956 年给出第一个公开发表的描述（除以素数）；W. 韦斯利·彼得森（W. Wesley Peterson）的 "Addressing for random-access storage"（*IBM Journal of Research and Development*，1957）分析了开放定址法。高德纳（Knuth）1963 年对线性探测的分析后来收入《计算机程序设计艺术》第 3 卷（1973），是他最早的算法分析之一。J. 劳伦斯·卡特（J. Lawrence Carter）与马克·韦格曼（Mark Wegman）在 "Universal classes of hash functions"（*Journal of Computer and System Sciences*，1979）中引入了通用哈希。斯科特·克罗斯比与丹·沃利奇的 "Denial of service via algorithmic complexity attacks"（USENIX Security，2003）说明了这种随机性在实践中为何必不可少；让-菲利普·奥马森（Jean-Philippe Aumasson）与丹尼尔·J. 伯恩斯坦（Daniel J. Bernstein）（2012）设计的带密钥哈希 SipHash，成为 Python、Rust 等语言的默认字符串哈希。
:::

## 后续内容

哈希表是集合、映射、缓存、[[compilers]] 中的符号表、[[databases]] 中的哈希连接与索引、以及无处不在的去重背后的大梁。当键还必须按*序*保持——找最小的键、$k$ 之后的下一个键、或某个区间内的所有键——哈希就无能为力了，因为它刻意把相似的键打散；二叉搜索树（[[data-structures/binary-search-trees]]）及其平衡版本（[[data-structures/balanced-trees]]）以 $O(\log n)$ 时间支持有序操作。当顶点带有任意名字时，图算法用哈希表表示邻接关系（[[data-structures/graph-representations]]）。建立在哈希之上的随机算法——布隆过滤器、count-min 草图、完美哈希、布谷鸟哈希——属于 [[algorithms]]；而抵御蓄意攻击的、另一个层面上的哈希函数——密码学哈希函数——在 [[cryptography]] 中研究。

::: summary
- 哈希表用哈希函数 $h\colon U\to\set{0,\dots,m-1}$ 把键映射到数组的槽位（[[#def-hash]]）；冲突不可避免，且由生日界（[[#prop-birthday]]），$n \approx \sqrt m$ 时就会出现。
- 好的哈希函数确定、快捷，并使现实的键分散；字符串用多项式哈希（[[#eq-poly-hash]]），绝不用字符编码求和。
- **链地址法**（[[#def-chaining]]）每个槽位挂一条链；简单一致哈希下，查找的期望代价为 $\Theta(1 + \alpha)$（[[#thm-chaining]]）。
- **通用哈希**（[[#def-universal]]）随机选取 $h$，对*任何*一组键都给出同样的期望界（[[#thm-universal]]）。
- **开放定址法**（[[#def-open]]）在数组内部探测；一致哈希下不成功查找至多 $1/(1-\alpha)$ 次探测（[[#thm-open]]）；线性探测受聚簇之累但局部性好。删除需要墓碑。
- 用扩容与重新散列控制 $\alpha$；插入于是为期望摊还 $O(1)$。
- 哈希表的 "$O(1)$" 是期望的、依赖假设的、摊还的；最坏情况是 $\Theta(n)$，哈希函数不随机化时攻击者可以加以利用。
:::

## 习题

::: exercise 除留余数法的冲突 {level=1 check="2"}
取 $h(k) = k \bmod 10$，把键 $12, 44, 13, 88, 23, 94, 11, 39, 20, 16, 5$ 插入一张 $10$ 个桶的链地址法表。最长的一条链有多长？（输入链长。）
::: solution
末位数依次是 $2, 4, 3, 8, 3, 4, 1, 9, 0, 6, 5$。桶 $3$ 分到 $13, 23$，桶 $4$ 分到 $44, 94$；其余每个桶至多分到一个键（桶 $7$ 一个也没有）。所以最长链长为 $2$。$10$ 个桶放 $11$ 个键，由抽屉原理至少一次冲突是必然的。
:::
:::

::: exercise 生日估计 {level=1 check="435/10000"}
$30$ 个键均匀、独立地哈希进 $m = 10\,000$ 个槽位。冲突对的期望个数是多少？（输入精确值。）
::: solution
由 [[#prop-birthday]]，它是 $\binom{30}{2}/m = 435/10\,000 = 0.0435$。
:::
:::

::: exercise 带删除的线性探测 {level=1}
在 [[#ex-linear-probing]] 的最终表中，键 $85$（位于槽位 $2$）被简单地置空槽位删除。哪些查找从此会错误地报告失败？墓碑如何避免这一点？
::: solution
若某个键的探测序列在到达该键自己的槽位之前经过槽位 $2$，它的查找就会错误地失败。键 $73$ 与 $101$ 起始于槽位 $3$，其查找从槽位 $3$ 出发，从不访问槽位 $2$：仍然成功。键 $92$ 起始于槽位 $1$，存放在槽位 $3$：它的查找先探测槽位 $1$（放着 $50$），再探测槽位 $2$，发现是空的，于是报告"找不到"——错了。在槽位 $2$ 留下墓碑，等于告诉查找"继续走"，于是它进到槽位 $3$，找到 $92$。
:::
:::

::: exercise 成功查找的平均比较次数 {level=2 check="11/7"}
把 [[#ex-chaining]] 中每个键的成功查找比较次数逐一列出，验证成功查找的平均比较次数。（输入精确的平均值。）
::: solution
各链：桶 0：$700$；桶 1：$50, 85, 92$；桶 3：$73, 101$；桶 6：$76$。比较次数：$700{:}\,1$，$50{:}\,1$，$85{:}\,2$，$92{:}\,3$，$73{:}\,1$，$101{:}\,2$，$76{:}\,1$。$7$ 个键合计 $11$：$11/7$。
:::
:::

::: exercise 选择散列表的大小 {level=2}
一个程序用线性探测存放至多 $10^6$ 个键，要求按 [[#eq-knuth-linear]] 不成功查找平均不超过 $3$ 次探测。允许的装填因子最大是多少？表需要多少个槽位？与一致哈希（[[#thm-open]]）的要求比较。
::: solution
解 $\tfrac12(1 + 1/(1-\alpha)^2) \le 3$：$1/(1-\alpha)^2 \le 5$，所以 $1 - \alpha \ge 1/\sqrt5 \approx 0.447$，$\alpha \le 0.553$。表需要 $m \ge 10^6/0.553 \approx 1.81\times10^6$ 个槽位。一致哈希下，$1/(1-\alpha) \le 3$ 给出 $\alpha \le 2/3$、$m \ge 1.5\times 10^6$。
:::
:::

::: exercise 一个糟糕的字符串哈希函数 {level=2}
一位程序员用字符编码之和模 $m = 1024$ 给字符串做哈希。键全是小写字母 `a`–`z` 组成的 $8$ 字母字符串。证明至多能用上 $201$ 个不同的槽位，并解释为什么这比 [[#eq-poly-hash]] 差得多。
::: solution
编码为 $97$ 到 $122$，所以 $8$ 个编码之和介于 $8 \cdot 97 = 776$ 与 $8\cdot 122 = 976$ 之间：只有 $976 - 776 + 1 = 201$ 种可能的取值，全部小于 $1024$。所以 $1024$ 个槽位中至多 $201$ 个会被用上；而且这些和集中在中段（$876$）附近，于是少数几个槽位得到大部分键；此外所有字母重排都冲突。多项式哈希的取值还依赖于字符的位置，约简之前的范围大得惊人，模 $m$ 约简后均匀散布到所有槽位。
:::
:::

::: exercise 手算通用哈希 {level=2 check="1"}
对族 [[#eq-carter-wegman]]，取 $p = 13$、$m = 4$、$a = 5$、$b = 7$，计算 $h(10)$。（输入槽位。）
::: solution
$5\cdot 10 + 7 = 57$，$57 \bmod 13 = 57 - 52 = 5$；再 $5 \bmod 4 = 1$。所以 $h(10) = 1$。
:::
:::

::: exercise 空桶数的期望 {level=3}
简单一致哈希下，把 $n$ 个键放入 $m$ 个桶。(a) 求空桶个数的期望，以及 $n = m \to \infty$ 时其比例的极限。(b) 证明同一桶中的一对键的期望个数为 $\binom n2/m$，并推出 $\E\bigl[\sum_j \ell_j^2\bigr] = n + n(n-1)/m$，其中 $\ell_j$ 是桶 $j$ 的长度。(c) 说明为什么当每个已存键被查找的次数相同时，$\sum_j \ell_j^2 / n$ 才是成功查找平均代价的正确度量。
::: solution
(a) 桶 $j$ 为空当且仅当没有键落入它，概率 $(1 - 1/m)^n$；由线性性，空桶个数的期望为 $m(1 - 1/m)^n$。$n = m$ 时，比例 $(1 - 1/m)^m \to e^{-1} \approx 0.368$，与模拟一致。

(b) 同一桶中的键对数为 $\sum_{x<y}[h(x) = h(y)]$，由线性性其期望为 $\binom n2 \cdot\frac1m$。又 $\sum_j \binom{\ell_j}{2}$ 数的是同样的对，且 $\ell_j^2 = 2\binom{\ell_j}{2} + \ell_j$，故 $\E[\sum_j\ell_j^2] = 2\binom n2/m + n = n + n(n-1)/m$。

(c) 若每个键被查找的次数相同，且长度为 $\ell$ 的桶中一次查找平均做约 $(\ell+1)/2$ 次比较，则按键取平均的代价为 $\frac1n\sum_j \ell_j\cdot\frac{\ell_j + 1}{2} = \frac{1}{2n}\sum_j\ell_j^2 + \frac12$：长度为 $\ell$ 的桶被其中的 $\ell$ 个键各查找一次、每次约 $\ell/2$ 的代价，所以长链按平方计入。代入 (b) 得 $1 + (n-1)/(2m)$，即 [[#thm-chaining]] 的公式。
:::
:::

::: exercise 线性探测的实现 {level=3}
写一个类 `LinearProbingSet`，支持 `add`、`contains` 与 `remove`，使用线性探测、墓碑，并在已用槽位（键加墓碑）超过容量的一半时把容量加倍。用 $10\,000$ 次随机操作对照 Python 的 `set` 测试它。
::: solution
```python
import random

EMPTY, TOMB = object(), object()            # 两个独一无二的标记

class LinearProbingSet:
    def __init__(self, m=8):
        self.t = [EMPTY] * m
        self.n = self.used = 0               # 键数；键加墓碑数

    def _find(self, x):                      # x 所在的槽位，或第一个空闲槽位
        m, j, free = len(self.t), hash(x) % len(self.t), None
        while self.t[j] is not EMPTY:
            if self.t[j] is TOMB:
                free = j if free is None else free
            elif self.t[j] == x:
                return j, True
            j = (j + 1) % m
        return (j if free is None else free), False

    def contains(self, x):
        return self._find(x)[1]

    def add(self, x):
        j, found = self._find(x)
        if found:
            return
        if self.t[j] is EMPTY:
            self.used += 1
        self.t[j] = x
        self.n += 1
        if 2 * self.used > len(self.t):
            self._rebuild(2 * len(self.t))

    def remove(self, x):
        j, found = self._find(x)
        if found:
            self.t[j] = TOMB                 # 保持探测链不断
            self.n -= 1

    def _rebuild(self, m):                   # 同时清除墓碑
        keys = [k for k in self.t if k is not EMPTY and k is not TOMB]
        self.t, self.n, self.used = [EMPTY] * m, 0, 0
        for k in keys:
            self.add(k)

random.seed(7)
s, ref = LinearProbingSet(), set()
for _ in range(10_000):
    x, op = random.randrange(500), random.random()
    if op < 0.5:
        s.add(x); ref.add(x)
    elif op < 0.8:
        s.remove(x); ref.discard(x)
    assert s.contains(x) == (x in ref)
print("ok", s.n, len(ref), len(s.t))
```

```console
$ python3 lpset.py
ok 316 316 1024
```

表永远不会装满，因为一旦键加墓碑超过容量的一半就重建，所以 `_find` 总是终止。墓碑会被 `add` 复用，但只有重建才真正清除它们；生产级的实现还会在墓碑占多数时按原容量重建一次。
:::
:::
