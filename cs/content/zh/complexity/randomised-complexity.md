给定两个写成大型表达式的多项式——比如说，同一个符号矩阵行列式的两个公式——它们是同一个多项式吗？把它们展开可能产生指数多项数。但把两者各在一个随机点上求值：若多项式不同，它们几乎必然给出不同的值；若相等，它们总是给出相同的值。没有人知道这个问题有任何确定性多项式时间算法，而随机化检验却简单、快速，出错的概率比宇宙射线翻转你计算机中一个比特的概率还小。

[[algorithms/randomised-algorithms]] 展示过许多这样的算法：弗里瓦尔德斯（Freivalds）检验、通用哈希、卡格（Karger）的最小割。本章追问随机性为*复杂性*增添了什么。我们定义概率图灵机以及类 $\mathsf{BPP}$、$\mathsf{RP}$、$\mathsf{coRP}$ 与 $\mathsf{ZPP}$；证明它们的出错概率可以被压到指数级之小（**放大**，用的是我们将证明的一个切尔诺夫界）；把它们相对于 $\mathsf{P}$、$\mathsf{NP}$ 与多项式层次安置到位——包括 $\mathsf{BPP}$ 有多项式规模的电路、且落在 $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ 中这两个定理——并综述随机性其实可以被去掉、即 $\mathsf{P} = \mathsf{BPP}$ 的证据。

## 概率图灵机

::: definition 概率图灵机 {#def-ptm}
**概率图灵机** $M$ 是一台非确定性图灵机，其中每个非确定性步恰有两个选择，各以概率 $1/2$ 被选取（"掷一次硬币"），且各步之间相互独立。一条作了 $k$ 次掷硬币的分支 $b$ 的概率是 $2^{-k}$，且
$$
\Prob[M \text{ 接受 } w] = \sum_{b \text{ 接受}} \Prob[b].
$$
若每条分支都在 $t(n)$ 步内停机，则称 $M$ 以时间 $t(n)$ 运行。
:::

等价地，$M$ 是一台确定性机器，除了输入 $w$ 之外还读入一个由独立均匀随机比特组成的串 $r \in \{0, 1\}^{t(n)}$，且 $\Prob[M \text{ 接受 } w] = \Prob_r[M(w, r) \text{ 接受}]$。哪个视角方便就用哪个。

::: definition 随机化复杂性类 {#def-bpp}
语言 $L$ 属于

- $\mathsf{BPP}$（有界误差概率多项式时间），若某台多项式时间概率机器 $M$ 满足：$w \in L$ 时 $\Prob[M \text{ 接受 } w] \ge 2/3$，$w \notin L$ 时 $\Prob[M \text{ 接受 } w] \le 1/3$；
- $\mathsf{RP}$（随机化多项式时间），若某台多项式时间 $M$ 满足：$w \in L$ 时 $\Prob[M \text{ 接受 } w] \ge 1/2$，$w \notin L$ 时 $\Prob[M \text{ 接受 } w] = 0$；
- $\mathsf{coRP}$，若 $\overline{L} \in \mathsf{RP}$；等价地，某台多项式时间 $M$ 以概率 $1$ 接受每个 $w \in L$，并以至少 $1/2$ 的概率拒绝每个 $w \notin L$；
- $\mathsf{ZPP}$（零误差概率多项式时间），若某台概率机器判定 $L$ 从不出错——每条停机的分支都给出正确答案——且它在每个输入上的**期望**运行时间是多项式的。
:::

$\mathsf{BPP}$ 算法是带双侧误差的**蒙特卡洛**算法，$\mathsf{RP}$ 与 $\mathsf{coRP}$ 算法是带单侧误差的蒙特卡洛算法，而 $\mathsf{ZPP}$ 算法是**拉斯维加斯**算法（[[algorithms/randomised-algorithms#def-lv-mc]]）。概率只相对于机器自己的硬币而言，对每个固定的输入而言：不假设输入按任何分布产生。常数 $2/3$、$1/2$ 是任意的，下一节将说明这一点。

::: proposition 简单包含 {#prop-randomised-inclusions}
$\mathsf{P} \subseteq \mathsf{RP} \subseteq \mathsf{NP}$，$\mathsf{P} \subseteq \mathsf{coRP} \subseteq \mathsf{coNP}$，$\mathsf{RP} \cup \mathsf{coRP} \subseteq \mathsf{BPP}$，$\mathsf{BPP}$ 在补运算下封闭，且 $\mathsf{BPP} \subseteq \mathsf{PSPACE}$。
:::

::: proof
确定性机器就是忽略自己硬币的概率机器，所以 $\mathsf{P} \subseteq \mathsf{RP}$、$\mathsf{P} \subseteq \mathsf{coRP}$。若 $M$ 是 $L$ 的一台 $\mathsf{RP}$ 机器，则 $w \in L$ 当且仅当某条分支接受（概率 $\ge 1/2$ 为正；概率 $0$ 意味着没有接受分支），于是把 $M$ 视作非确定性机器便判定了 $L$：$\mathsf{RP} \subseteq \mathsf{NP}$。对 $\mathsf{RP} \subseteq \mathsf{BPP}$：把 $\mathsf{RP}$ 机器跑两遍，任何一遍接受就接受：在 $L$ 内接受概率 $\ge 1 - 1/4 = 3/4$，在 $L$ 外为 $0$。把一台 $\mathsf{BPP}$ 机器的答案取反，就把 $\ge 2/3$ 的概率变成 $\le 1/3$，反之亦然。最后，一台多项式空间机器可以对长度 $t(n)$ 的一切随机串 $r$ 循环、重复使用空间，精确数出其中接受的个数。
:::

## 放大

### 单侧误差

::: theorem RP 的放大 {#thm-rp-amp}
若 $L \in \mathsf{RP}$，则对每个多项式 $q$，存在一台多项式时间概率机器，以至少 $1 - 2^{-q(n)}$ 的概率接受每个 $w \in L$，且从不接受 $w \notin L$。
:::

::: proof
用独立的硬币把 $\mathsf{RP}$ 机器跑 $q(n)$ 遍，当且仅当至少一遍接受时接受。若 $w \notin L$，没有一遍会接受。若 $w \in L$，每遍至多以 $1/2$ 的概率拒绝，于是 $q(n)$ 遍全部拒绝的概率至多 $2^{-q(n)}$。运行时间乘以 $q(n)$。
:::

若原始成功概率只有多项式的倒数 $1/p(n)$，同样的做法也行：$k\,p(n)$ 遍全部失败的概率至多 $(1 - 1/p(n))^{k p(n)} \le e^{-k}$。所以对从 $1/\mathrm{poly}(n)$ 到 $1 - 2^{-\mathrm{poly}(n)}$ 之间的任何成功概率，$\mathsf{RP}$ 都是同一个类。

### 双侧误差与切尔诺夫界

对双侧误差，我们重复运行并取**多数**答案。分析需要这样一个事实：正确运行的次数集中在其均值附近。

::: lemma 切尔诺夫界（下尾） {#lem-chernoff}
设 $X = X_1 + \cdots + X_m$，其中各 $X_i \in \{0, 1\}$ 相互独立，并令 $\mu = \E[X]$。则对 $0 < \delta < 1$，
$$
\Prob[X \le (1 - \delta)\mu] \le e^{-\delta^2\mu/2}.
$$ {#eq-chernoff}
:::

::: proof
令 $p_i = \Prob[X_i = 1]$，则 $\mu = \sum p_i$。对任意 $s > 0$，事件 $X \le (1 - \delta)\mu$ 就是事件 $e^{-sX} \ge e^{-s(1-\delta)\mu}$，所以由马尔可夫不等式（[[algorithms/randomised-algorithms#thm-markov]]）
$$
\Prob[X \le (1 - \delta)\mu] \le \frac{\E[e^{-sX}]}{e^{-s(1-\delta)\mu}} = e^{s(1-\delta)\mu}\prod_i \E[e^{-sX_i}],
$$
这里用到了独立性。又 $\E[e^{-sX_i}] = 1 - p_i(1 - e^{-s}) \le \exp(-p_i(1 - e^{-s}))$（因为 $1 + x \le e^x$），所以乘积至多为 $\exp(-\mu(1 - e^{-s}))$。取 $s = -\ln(1 - \delta)$，使 $e^{-s} = 1 - \delta$：
$$
\Prob[X \le (1 - \delta)\mu] \le \exp\bigl(-\mu\,(\delta + (1 - \delta)\ln(1 - \delta))\bigr).
$$
最后，对 $0 < \delta < 1$ 有 $(1 - \delta)\ln(1 - \delta) \ge -\delta + \delta^2/2$：两边在 $\delta = 0$ 处都为零，而左边的导数 $-\ln(1 - \delta) - 1$ 不小于右边的导数 $-1 + \delta$，因为 $-\ln(1 - \delta) \ge \delta$。于是指数部分至多为 $-\mu\delta^2/2$。
:::

::: theorem BPP 的放大 {#thm-bpp-amp}
设多项式时间概率机器 $M$ 在每个输入上都以至少 $1/2 + \varepsilon$ 的概率给出正确答案，其中 $0 < \varepsilon \le 1/2$。则把 $M$ 独立跑 $m$ 遍并取多数答案，出错概率至多 $e^{-\varepsilon^2 m/2}$。特别地，对每个多项式 $q$，每个 $L \in \mathsf{BPP}$ 都有一台误差不超过 $2^{-q(n)}$ 的多项式时间机器；且把 $\mathsf{BPP}$ 定义中的 $2/3$ 换成 $1/2 + 1/p(n)$（$p$ 为任意多项式），类不变。
:::

::: proof
令 $X_i = 1$ 表示第 $i$ 遍正确；各 $X_i$ 独立且 $\Prob[X_i = 1] \ge 1/2 + \varepsilon$。（若概率更大，误差只会更小，故可设等号成立：$\mu = (1/2 + \varepsilon)m$。）多数答案出错仅当 $X \le m/2 = (1 - \delta)\mu$，其中 $\delta = \varepsilon/(1/2 + \varepsilon)$。由 [[#lem-chernoff]]，概率至多
$$
\exp\Bigl(-\frac{\delta^2\mu}{2}\Bigr) = \exp\Bigl(-\frac{\varepsilon^2 m}{2(1/2 + \varepsilon)}\Bigr) = \exp\Bigl(-\frac{\varepsilon^2 m}{1 + 2\varepsilon}\Bigr) \le e^{-\varepsilon^2 m/2},
$$
因为 $1 + 2\varepsilon \le 2$。要误差不超过 $2^{-q(n)}$，取 $m = \lceil 2\ln 2 \cdot q(n)/\varepsilon^2\rceil$，只要 $1/\varepsilon$ 是多项式的就是多项式。取 $\varepsilon = 1/6$（$\mathsf{BPP}$ 的定义），界为 $e^{-m/48}$。
:::

::: example 多数表决收敛多快？ {#ex-majority}
某 $\mathsf{BPP}$ 算法恰以概率 $2/3$ 正确。对若干奇数 $m$ 精确算出 $m$ 遍多数表决的误差，并与界 $e^{-m/48}$ 比较。
::: solution
多数表决出错恰当正确的运行不超过 $\lfloor m/2\rfloor$ 次，这是一个二项分布的尾部。

```python
from fractions import Fraction
from math import comb, exp

def majority_error(m, p=Fraction(2, 3)):
    """m 次独立运行中至多 m/2 次正确的精确概率。"""
    return sum(comb(m, j) * p**j * (1 - p)**(m - j) for j in range(m // 2 + 1))

for m in (1, 3, 11, 51, 101, 201):
    err = majority_error(m)
    print(f"{m:4d} runs: exact error {float(err):.3e}   Chernoff bound {exp(-m / 48):.3e}")
```

```console
$ python3 majority.py
   1 runs: exact error 3.333e-01   Chernoff bound 9.794e-01
   3 runs: exact error 2.593e-01   Chernoff bound 9.394e-01
  11 runs: exact error 1.221e-01   Chernoff bound 7.952e-01
  51 runs: exact error 6.888e-03   Chernoff bound 3.456e-01
 101 runs: exact error 2.724e-04   Chernoff bound 1.219e-01
 201 runs: exact error 5.531e-07   Chernoff bound 1.518e-02
```

三遍的误差恰为 $\left(\tfrac13\right)^3 + 3 \cdot \tfrac23 \cdot \left(\tfrac13\right)^2 = \tfrac{7}{27} \approx 0.259$。真实误差比界下降得快得多——每多跑 $50$ 遍大约就除以 $25$ 到 $50$——而界在许多倍的常数因子上是松的。对复杂性重要的是两者都关于 $m$ *指数*衰减：跑上几百遍就能让误差可以忽略，时间上只付出常数因子的代价。
:::
:::

::: example 误差预算 $2^{-100}$ {#ex-budget}
[[#thm-bpp-amp]] 保证一个以概率 $2/3$ 正确的算法要跑多少遍，才够让多数表决的误差不超过 $2^{-100}$？实际又需要多少遍？
::: solution
取 $\varepsilon = 1/6$，证明给出的误差界是 $\exp(-\varepsilon^2 m/(1 + 2\varepsilon)) = e^{-m/48}$，而 $e^{-m/48} \le 2^{-100}$ 当且仅当 $m \ge 4800 \ln 2 \approx 3327.1$：$m = 3329$ 遍（把 $m$ 取成奇数）就够。较简单的那个界 $e^{-\varepsilon^2 m/2}$ 则会要求 $m \ge 7200\ln 2 \approx 4991$。像 [[#ex-majority]] 那样精确求和二项尾部可知，$m = 1121$ 遍已给出约 $7.1 \times 10^{-31} < 2^{-100} \approx 7.9 \times 10^{-31}$ 的误差，而 $1119$ 遍给出约 $8.0 \times 10^{-31}$，差一点点。无论哪种算法，代价都是一个常数因子——至多几千遍——与输入规模无关。
:::
:::

::: widget distribution
dist: binomial
params: n=51, p=0.6667
a: 0
b: 25
caption: 在一个以概率 $2/3$ 答对的算法的 $51$ 次独立运行中，答对的次数。多数表决出错恰当此数不超过 $25$——即阴影的尾部，约 $0.007$。均值为 $34$，标准差约 $3.4$，所以阈值 $25.5$ 位于均值下方约 $2.5$ 个标准差处。增大 $n$（保持 $a = 0$、$b$ 略小于 $n/2$）看尾部消失：分布像 $\sqrt{n}$ 那样收窄，而均值与 $n/2$ 的距离像 $n$ 那样增长。
:::

### 零误差

::: theorem ZPP = RP ∩ coRP {#thm-zpp}
$\mathsf{ZPP} = \mathsf{RP} \cap \mathsf{coRP}$。
:::

::: proof
*$\subseteq$。* 设 $M$ 以零误差判定 $L$，期望时间至多 $p(n)$。令 $M'$ 把 $M$ 跑 $2p(n)$ 步；由马尔可夫不等式，$M$ 到那时仍未停机的概率至多 $1/2$。对 $\mathsf{RP}$：若 $M$ 已停机就给出它的（正确）答案；否则拒绝。在 $w \notin L$ 上 $M'$ 从不接受；在 $w \in L$ 上它以至少 $1/2$ 的概率接受。对 $\mathsf{coRP}$：同样处理，只是当 $M$ 未停机时接受。

*$\supseteq$。* 设 $M_1$ 是 $L$ 的一台 $\mathsf{RP}$ 机器，$M_2$ 是 $\overline{L}$ 的一台 $\mathsf{RP}$ 机器。重复：在 $w$ 上跑 $M_1$ 与 $M_2$；若 $M_1$ 接受则接受；若 $M_2$ 接受则拒绝；否则重复。$M_1$ 只在 $w \in L$ 时接受，$M_2$ 只在 $w \notin L$ 时接受，所以答案总是正确的。每一轮中，对应真实答案的那台机器至少以概率 $1/2$ 接受，于是轮数服从均值至多 $2$ 的几何分布（[[algorithms/randomised-algorithms]]），期望时间是多项式的。
:::

## 这些类里有什么？

### 多项式恒等检验

驱动本章的例子是判定一个**算术电路**——一个由 $+$、$-$、$\times$ 门构成、以变元和整数常数为输入的有向无环图——是否计算零多项式的问题。把它展开成单项式可能耗时指数（$\prod_{i=1}^n (x_i + y_i)$ 有 $2^n$ 项）。在一点上求值却很快。关键事实是：非零多项式的根很少。

::: lemma 施瓦茨–齐佩尔引理 {#lem-schwartz-zippel}
设 $q(x_1, \dots, x_k)$ 是域 $\F$ 上一个总次数为 $d$ 的非零多项式，$S \subseteq \F$ 为有限集。若 $a_1, \dots, a_k$ 独立且均匀地取自 $S$，则 $\Prob[q(a_1, \dots, a_k) = 0] \le d/\lvert S\rvert$。
:::

::: proof
对 $k$ 归纳。$k = 1$ 时，次数为 $d$ 的非零多项式至多有 $d$ 个根（[[algorithms/randomised-algorithms#ex-schwartz-zippel]]）。对 $k > 1$，把 $q$ 写成以 $x_1$ 为变元、系数为其余变元的函数之多项式：$q = \sum_{i=0}^{j} x_1^i\, q_i(x_2, \dots, x_k)$，其中 $j$ 是使 $q_j \ne 0$ 的 $x_1$ 的最大幂。则 $q_j$ 的总次数至多为 $d - j$，由归纳假设 $\Prob[q_j(a_2, \dots, a_k) = 0] \le (d - j)/\lvert S\rvert$。若 $q_j(a_2, \dots, a_k) \ne 0$，则 $q(x_1, a_2, \dots, a_k)$ 是 $x_1$ 的次数为 $j$ 的非零多项式，它在随机点 $a_1$ 处为零的概率至多为 $j/\lvert S\rvert$。于是
$$
\Prob[q(a) = 0] \le \Prob[q_j(a_2, \dots) = 0] + \Prob[q(a) = 0 \mid q_j(a_2, \dots) \ne 0] \le \frac{d - j}{\lvert S\rvert} + \frac{j}{\lvert S\rvert} = \frac{d}{\lvert S\rvert}.
$$
:::

于是多项式恒等检验属于 $\mathsf{coRP}$：在一个随机点上求值（对整数电路，再对一个随机素数取模以保持数字短小）；若值非零则多项式必非零；若值为零就回答"恒等于零"，出错的概率至多 $d/\lvert S\rvert$。

::: example 检验一个代数恒等式 {#ex-pit}
通过在模素数 $p = 2^{61} - 1$ 下求值，检验恒等式 $(x + y)(y + z)(z + x) = (x + y + z)(xy + yz + zx) - xyz$，以及去掉 $-xyz$ 的错误版本。
::: solution
```python
import random

P = 2**61 - 1                                   # 素数；我们在模 P 下运算

def lhs(x, y, z):                               # (x + y)(y + z)(z + x)
    return (x + y) * (y + z) * (z + x) % P

def rhs_true(x, y, z):                          # (x+y+z)(xy+yz+zx) - xyz
    return ((x + y + z) * (x*y + y*z + z*x) - x*y*z) % P

def rhs_false(x, y, z):                         # 与 lhs 相差一项 xyz
    return ((x + y + z) * (x*y + y*z + z*x)) % P

def probably_equal(f, g, trials=20, rng=random.Random(1)):
    """coRP 检验：答"不同"永远正确；答"相同"的误差概率至多 (3/P)^trials。"""
    for _ in range(trials):
        point = [rng.randrange(P) for _ in range(3)]
        if f(*point) != g(*point):
            return False
    return True

print(probably_equal(lhs, rhs_true), probably_equal(lhs, rhs_false))
```

```console
$ python3 pit.py
True False
```

错误恒等式两边之差是 $xyz$，次数为 $3$，所以单个随机点漏检它的概率至多 $3/(2^{61} - 1) \approx 1.3 \times 10^{-18}$，$20$ 个独立点则至多 $(3/p)^{20}$。对真正的恒等式，每次求值都一致，也必须如此：检验决不会把相等的多项式判为不同。（把两边展开可确认该恒等式：两者都是 $x^2y + x^2z + y^2x + y^2z + z^2x + z^2y + 2xyz$。）
:::
:::

截至 2026 年，一般算术电路的多项式恒等检验还没有已知的确定性多项式时间算法，而卡巴内茨（Kabanets）与因帕利亚佐（Impagliazzo）（2004）证明：找到这样一个算法将蕴含新的电路下界——这暗示了去随机化为何困难。其他不知道属于 $\mathsf{P}$ 的 $\mathsf{RP}$ 或 $\mathsf{coRP}$ 成员也来自同一条引理，例如对塔特（Tutte）矩阵作随机代入以判定图是否有完美匹配（洛瓦兹（Lovász），1979）——这个问题*确实*属于 $\mathsf{P}$（埃德蒙兹（Edmonds）的算法），但它的随机化算法并行化得很好。

最著名的历史例子是**素性**。索洛韦–斯特拉森（Solovay–Strassen）检验（1977）与米勒–拉宾（Miller–Rabin）检验（1976/1980）把 $\mathit{COMPOSITES}$ 放入 $\mathsf{RP}$——合数每轮至少以概率 $1/2$（相应地 $3/4$）被识破，而素数永不被判为合数。$25$ 年间，$\mathit{PRIMES}$ 都是 $\mathsf{coRP}$ 中的招牌问题（并且，靠阿德曼与黄（Huang）的另一个算法，属于 $\mathsf{ZPP}$）却不知道属于 $\mathsf{P}$，直到阿格拉瓦尔（Agrawal）、卡亚尔（Kayal）与塞克萨纳（Saxena）在 2002 年把它去随机化。

::: quiz
一个判定问题的随机化算法总是在多项式时间内停机；当真实答案是"是"时它以概率 $0.9$ 说"是"，当答案是"否"时以概率 $0.6$ 说"否"。该问题已知属于哪些类？
- [x] $\mathsf{BPP}$
- [ ] $\mathsf{RP}$
- [ ] $\mathsf{ZPP}$
- [x] $\mathsf{PSPACE}$
::: solution
该算法在每个输入上都至少以概率 $0.6 = 1/2 + 0.1$ 正确，所以由 [[#thm-bpp-amp]] 问题属于 $\mathsf{BPP}$，从而属于 $\mathsf{PSPACE}$。它不是 $\mathsf{RP}$ 算法（它在"否"实例上出错），也不是 $\mathsf{ZPP}$ 算法（它可能出错）。该问题是否还属于 $\mathsf{RP}$ 取决于问题本身；此处没有任何信息能告诉我们。
:::
:::

## BPP 与其余诸类

$\mathsf{BPP}$ 坐落在哪里？它包含 $\mathsf{P}$，含于 $\mathsf{PSPACE}$。$\mathsf{BPP} \subseteq \mathsf{NP}$ 是否成立尚不可知（一台 $\mathsf{BPP}$ 机器的接受分支构不成任何东西的短证明，因为被拒绝的输入上也有接受分支），$\mathsf{NP} \subseteq \mathsf{BPP}$ 是否成立也未知（那将意味着 $\mathsf{NP}$ 完全问题在实践中可有效求解）。两个定理把它放在远低于 $\mathsf{PSPACE}$ 的位置。

### 电路与提示

::: definition P/poly {#def-ppoly}
若存在一台多项式时间图灵机 $M$、一个多项式 $p$ 和**提示串**（advice strings）$a_0, a_1, a_2, \dots$（$\lvert a_n\rvert \le p(n)$），使得对每个 $w$，$w \in L$ 当且仅当 $M$ 接受 $\langle w, a_{\lvert w\rvert}\rangle$，则称语言 $L$ 属于 $\mathsf{P/poly}$。等价地，$L$ 由一族多项式规模的布尔电路 $C_0, C_1, \dots$ 判定，$C_n$ 负责长度为 $n$ 的输入。
:::

提示只依赖于输入的长度，不依赖输入本身，也不必可计算——$\mathsf{P/poly}$ 包含不可判的一元语言，例如 $\{1^n : $ 第 $n$ 台图灵机在 $\varepsilon$ 上停机$\}$，每个长度只需一位提示。它是**非一致**计算的一个模型，而它之下的下界就是电路规模的下界。

::: theorem 阿德曼定理 {#thm-adleman}
$\mathsf{BPP} \subseteq \mathsf{P/poly}$。
:::

::: proof
设 $L \in \mathsf{BPP}$。由 [[#thm-bpp-amp]]，存在一台使用 $\ell(n)$ 个随机比特、在长度为 $n$ 的每个输入上出错概率小于 $2^{-n}$ 的多项式时间机器 $M(w, r)$。称随机串 $r \in \{0, 1\}^{\ell(n)}$ **对** $w$ **不利**，若 $M(w, r)$ 给出错误答案。对长度为 $n$ 的 $2^n$ 个输入 $w$ 中的每一个，至多 $2^{-n}$ 比例的串 $r$ 对它不利。由并联界，对*某个* $w$ 不利的 $r$ 的比例小于 $2^n \cdot 2^{-n} = 1$——所以至少存在一个串 $r_n$ 对长度为 $n$ 的一切输入都有利。取 $a_n = r_n$ 作为提示：$M(w, a_{\lvert w\rvert})$ 永远正确。
:::

这个证明表明一个好的随机串*存在*，而没有说如何找到它，这正是它给出非一致结果的原因。把它与**卡普–利普顿定理**（1980）——若 $\mathsf{NP} \subseteq \mathsf{P/poly}$ 则 $\mathsf{PH} = \Sigma_2^{\mathsf{p}}$——结合起来，便知 $\mathsf{NP} \subseteq \mathsf{BPP}$ 会使多项式层次坍缩到第二层（[[complexity/hierarchies#thm-ph-collapse]]），这被当作 $\mathsf{NP}$ 完全问题没有高效随机化算法的证据。

### BPP 在第二层

::: theorem 西普瑟–高什–劳特曼定理 {#thm-lautemann}
$\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$。
:::

::: proof
$\mathsf{BPP}$ 在补运算下封闭，而 $\Pi_2^{\mathsf{p}}$ 恰由 $\Sigma_2^{\mathsf{p}}$ 语言的补组成，所以只需证明 $\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}}$。设 $L \in \mathsf{BPP}$，并经放大设 $M(w, r)$（$r \in \{0, 1\}^m$，$m = m(n)$ 为多项式）的误差小于 $2^{-n}$；不妨设 $n$ 充分大使得 $m < 2^n$。令 $A_w = \{r : M(w, r) \text{ 接受}\} \subseteq \{0, 1\}^m$。则 $w \in L$ 时 $\lvert A_w\rvert > (1 - 2^{-n})2^m$，$w \notin L$ 时 $\lvert A_w\rvert < 2^{-n}2^m$。对串 $t \in \{0, 1\}^m$，记 $A_w \oplus t = \{r \oplus t : r \in A_w\}$（按位异或），这是个同样大的集合。我们断言：
$$
w \in L \iff \exists t_1, \dots, t_m \in \{0, 1\}^m\ \ \forall r \in \{0, 1\}^m\ \ \bigvee_{i=1}^{m} M(w, r \oplus t_i) \text{ 接受}.
$$ {#eq-lautemann}
内层析取有 $m$ 项，每项是 $M$ 的一次运行，所以可用多项式时间检验；被量词的串长度为多项式。于是断言把 $L$ 放入 $\Sigma_2^{\mathsf{p}}$。注意 $M(w, r \oplus t_i)$ 接受当且仅当 $r \in A_w \oplus t_i$，所以右边说的是 $m$ 个平移副本 $A_w \oplus t_i$ 覆盖整个 $\{0, 1\}^m$。

*若 $w \notin L$*，则对任何 $t_1, \dots, t_m$，这些副本合起来不足 $m \cdot 2^{-n}2^m < 2^m$ 个元素（因为 $m < 2^n$），于是某个 $r$ 未被覆盖：右边为假。

*若 $w \in L$*，把 $t_1, \dots, t_m$ 独立且均匀随机地选取。对固定的 $r$，串 $r \oplus t_i$ 是均匀的，故 $\Prob[r \notin A_w \oplus t_i] = \Prob[r \oplus t_i \notin A_w] < 2^{-n}$，由独立性 $\Prob[r \text{ 不被任何副本覆盖}] < 2^{-nm}$。对全部 $2^m$ 个串 $r$ 用并联界，某个 $r$ 未被覆盖的概率小于 $2^m \cdot 2^{-nm} \le 1$（$n \ge 1$ 时）。所以存在一组 $t_1, \dots, t_m$ 覆盖一切：右边为真。
:::

::: example 用平移覆盖 {#ex-shifts}
对 $m = 3$，找出平移使得 $A = \{000, 001, 011, 101, 110, 111\}$ 的平移覆盖 $\{0,1\}^3$，并说明 $\{010\}$ 的三个平移无法覆盖它。
::: solution
对 $A$ 两个平移就够：$A \oplus 000 = A$ 缺 $010$ 与 $100$，而 $A \oplus 001 = \{001, 000, 010, 100, 111, 110\}$ 两者都有。单元素集合的三个平移至多三个元素，少于 $\{0,1\}^3$ 的 $8$ 个串。穷举搜索与此一致：

```python
from itertools import product

def covers(A, shifts, m):
    """平移 A xor t（t 取遍 shifts）是否覆盖整个 {0,1}^m？"""
    return all(any((r ^ t) in A for t in shifts) for r in range(2 ** m))

def find_shifts(A, m, k):
    return next((ts for ts in product(range(2 ** m), repeat=k) if covers(A, ts, m)), None)

m = 3
big = {0b000, 0b001, 0b011, 0b101, 0b110, 0b111}      # 8 个串中的 6 个
small = {0b010}                                       # 8 个串中的 1 个
print(find_shifts(big, m, 2), find_shifts(small, m, 3))
```

```console
$ python3 shifts.py
(0, 1) None
```

在证明中，"大"的情形是 $w \in L$（几乎所有随机串都让 $M$ 接受），"小"的情形是 $w \notin L$；$m$ 个平移对密度大于 $1 - 2^{-n}$ 的集合就够用，而当 $m < 2^n$ 时对密度小于 $2^{-n}$ 的集合永远不够。
:::
:::

平移 $t_i$ 构成 $A_w$ 很大的一个短证书：小集合无法被少数几个平移覆盖，巨大集合却总能被覆盖。这是**概率方法**的一次典型运用——通过证明随机选取的对象以正概率可行来证明对象的存在。

::: widget venn
sets: 3
expr: A & B & C
labels: BPP; NP; coNP
caption: 截至 2026 年关于 $\mathsf{BPP}$、$\mathsf{NP}$ 与 $\mathsf{coNP}$ 所知的情形：三个集合都包含 $\mathsf{P}$（位于阴影公共区域内部），$\mathsf{RP} \subseteq \mathsf{BPP} \cap \mathsf{NP}$ 且 $\mathsf{coRP} \subseteq \mathsf{BPP} \cap \mathsf{coNP}$，而三者都落在 $\Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ 之中——$\mathsf{NP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$ 是平凡的，$\mathsf{BPP}$ 则靠西普瑟–高什–劳特曼定理。就已被证明的内容而言，图中每个区域都可能为空也可能非空。若猜想 $\mathsf{P} = \mathsf{BPP}$ 为真，则 $\mathsf{BPP}$ 圆中除 $\mathsf{P}$ 之外空无一物，而 $\mathsf{P}$ 位于阴影中心之内。
:::
## 去随机化

随机性对高效计算真的是必需的吗？多数复杂性理论家现在相信不是：

$$
\mathsf{P} \overset{?}{=} \mathsf{BPP}.
$$

理由在于**伪随机生成器**理论：它们是确定性函数，把 $O(\log n)$ 比特的短随机**种子**拉伸成一个长串，任何小规模电路都无法把它与真正随机的比特区分开。若这样的生成器存在，$\mathsf{BPP}$ 算法就可以去随机化：对*每个*种子都跑一遍——一共只有 $2^{O(\log n)} = \mathrm{poly}(n)$ 个——再取多数。惊人的发现是：这样的生成器可以由**难度**推出：尼桑（Nisan）与维格德森（Wigderson）（1994）从对电路平均情形困难的函数构造了它们，而因帕利亚佐（Impagliazzo）与维格德森（1997）证明了下面这条定理。

::: theorem 难度与随机性 {#thm-iw}
若 $\mathsf{E} = \mathsf{TIME}(2^{O(n)})$ 中某个语言在所有足够大的输入长度上都需要规模 $2^{\Omega(n)}$ 的布尔电路，则 $\mathsf{P} = \mathsf{BPP}$（因帕利亚佐与维格德森，1997）。
:::

我们不复证明此定理。它的假设是一个强而人们相信为真的电路下界——正是复杂性理论还证明不了的那一类陈述——而它的结论是：随机性是一种便利，而非额外的能力来源。反过来，卡巴内茨与因帕利亚佐（2004）证明：对多项式恒等检验去随机化本身就蕴含电路下界，所以"去随机化"与"下界"是同一个问题的两面。

具体的去随机化成果支持这一猜想：素性判定（AKS，2002），以及对数空间中的无向可达性（赖因戈尔德（Reingold），2005）——后者去掉了阿莱柳纳斯（Aleliunas）、卡普（Karp）、利普顿（Lipton）、洛瓦兹与拉科夫（Rackoff）（1979）随机游走算法中的随机性。截至 2026 年，$\mathsf{P} = \mathsf{BPP}$ 是未决问题，$\mathsf{BPP} \subseteq \mathsf{NP}$ 也是；甚至 $\mathsf{BPP} \ne \mathsf{NEXP}$ 都尚未可知：我们知道 $\mathsf{BPP} \subseteq \mathsf{PSPACE} \subseteq \mathsf{EXP} \subseteq \mathsf{NEXP}$，却不知道其中任何一个包含是严格的。

::: warning 随机化不等于不可靠——但随机性必须是真的
误差 $1/3$ 的 $\mathsf{BPP}$ 算法听起来不可用，但放大能以几百次重复的代价把误差压到 $2^{-100}$，远低于硬件故障率。这个保证是**对每个输入**成立的，随机性只来自算法自己的硬币；它不假设输入是随机的，所以选输入的作恶者无法击败它。作恶者*能*击败的是可预测的"随机性"：分析假设的是独立无偏的比特。库里的伪随机数生成器——线性同余生成器或 Mersenne Twister 之类——用于模拟没有问题，但能预测它们的攻击者可以挑选使算法失效的输入（哈希表遭遇哈希洪水攻击（[[data-structures/hash-tables]]）正是这个原理）；当输入可能来自作恶者时，需要的是密码学安全的生成器（[[cryptography]]）。
:::

随机性还改变了"证明"的含义。在**交互证明**中，一个随机化的多项式时间验证器与一个全能力的证明者交换消息，并必须以高概率接受真的断言、拒绝假的断言。拥有交互证明的语言类 $\mathsf{IP}$ 等于 $\mathsf{PSPACE}$（伦德（Lund）、福特诺（Fortnow）、卡洛夫（Karloff）与尼桑；沙米尔（Shamir），1992），远多于"一条消息"的证明所给的 $\mathsf{NP}$。[[complexity/approximation-pcp]] 描述了另一个这样的概念：只需读随机选出的常数个比特即可检验的证明。

::: history
约翰·吉尔（John Gill）在 "Computational complexity of probabilistic Turing machines"（*SIAM Journal on Computing*，1977）中定义了概率图灵机与类 $\mathsf{BPP}$、$\mathsf{RP}$、$\mathsf{ZPP}$、$\mathsf{PP}$。罗伯特·索洛韦（Robert Solovay）与沃尔克·斯特拉森（Volker Strassen）的素性检验发表于 1977 年，迈克尔·拉宾（Michael Rabin）对加里·米勒（Gary Miller）检验的改写发表于 1980 年。伦纳德·阿德曼（Leonard Adleman）于 1978 年证明了 $\mathsf{RP} \subseteq \mathsf{P/poly}$，查尔斯·贝内特（Charles Bennett）与吉尔于 1981 年指出该论证可推广到 $\mathsf{BPP}$。迈克尔·西普瑟（Michael Sipser）于 1983 年证明 $\mathsf{BPP}$ 落在多项式层次内，彼得·高什（Péter Gács）把它改进到第二层，克莱门斯·劳特曼（Clemens Lautemann）给出了本文采用的短证明（1983）。多项式恒等引理归功于理查德·德米洛（Richard DeMillo）与理查德·利普顿（Richard Lipton）（1978）、理查德·齐佩尔（Richard Zippel）（1979）与雅各布·施瓦茨（Jacob Schwartz）（1980）。诺姆·尼桑（Noam Nisan）与阿维·维格德森（Avi Wigderson）的 "Hardness vs randomness" 发表于 1994 年，拉塞尔·因帕利亚佐（Russell Impagliazzo）与维格德森的 "P = BPP if E requires exponential circuits" 发表于 1997 年；瓦伦丁·卡巴内茨（Valentine Kabanets）与因帕利亚佐的反向结果发表于 2004 年。
:::

## 后续内容

随机性在 [[cryptography]] 中不可或缺：秘密密钥必须不可预测，而安全性是针对概率化对手定义的；[[quantum-computing]] 类比 $\mathsf{BPP}$ 定义类 $\mathsf{BQP}$，只是以概率幅取代概率。在 [[complexity/approximation-pcp]] 中，只读证明中少数几个比特的随机化验证者通向 PCP 定理，随机取整则给出近似算法。

::: summary
- **概率图灵机**掷均匀硬币（[[#def-ptm]]）；$\mathsf{BPP}$ 允许 $\le 1/3$ 的双侧误差，$\mathsf{RP}$ 允许"是"输入上的单侧误差，$\mathsf{coRP}$ 允许"否"输入上的单侧误差，$\mathsf{ZPP}$ 在期望多项式时间内零误差（[[#def-bpp]]）。
- $\mathsf{P} \subseteq \mathsf{ZPP} = \mathsf{RP} \cap \mathsf{coRP}$（[[#thm-zpp]]），$\mathsf{RP} \subseteq \mathsf{NP} \cap \mathsf{BPP}$，而 $\mathsf{BPP} \subseteq \mathsf{PSPACE}$ 且在补运算下封闭（[[#prop-randomised-inclusions]]）。
- **放大**：$k$ 次运行把单侧误差压到 $2^{-k}$（[[#thm-rp-amp]]）；由切尔诺夫界（[[#lem-chernoff]]），以概率 $1/2 + \varepsilon$ 正确的算法跑 $m$ 次取多数，出错概率至多 $e^{-\varepsilon^2 m/2}$（[[#thm-bpp-amp]]）。
- **多项式恒等检验**由施瓦茨–齐佩尔引理属于 $\mathsf{coRP}$（[[#lem-schwartz-zippel]]），且不知道属于 $\mathsf{P}$。
- $\mathsf{BPP} \subseteq \mathsf{P/poly}$（阿德曼，[[#thm-adleman]]）且 $\mathsf{BPP} \subseteq \Sigma_2^{\mathsf{p}} \cap \Pi_2^{\mathsf{p}}$（西普瑟–高什–劳特曼，[[#thm-lautemann]]）。
- 人们猜想 $\mathsf{P} = \mathsf{BPP}$；它可由强电路下界推出（因帕利亚佐–维格德森，[[#thm-iw]]），截至 2026 年仍是未决问题。
:::

## 习题

::: exercise 重复一个单侧检验 {level=1 check="30"}
一个 $\mathsf{RP}$ 算法以至少 $1/2$ 的概率接受每个"是"实例。要令漏掉"是"实例的概率不超过 $10^{-9}$，需要多少次独立运行？（填写由界 $2^{-k}$ 保证的最小运行次数。）
::: solution
需要 $2^{-k} \le 10^{-9}$，即 $k \ge 9\log_2 10 \approx 29.9$，所以 $k = 30$ 次（$2^{-30} \approx 9.3 \times 10^{-10}$）。无论跑多少遍，"否"实例都不会被接受。
:::
:::

::: exercise 三取多数 {level=1 check="7/27"}
一个算法恰以概率 $2/3$ 正确，各次运行相互独立。三取多数出错的概率是多少？（填写分数。）
::: solution
多数出错当正确的运行是 $0$ 次或 $1$ 次：$(1/3)^3 + 3 \cdot (2/3)(1/3)^2 = 1/27 + 6/27 = 7/27 \approx 0.259$，小于单次运行的误差 $1/3$（见 [[#ex-majority]]）。
:::
:::

::: exercise 哪个类？ {level=1}
把每个算法归类为拉斯维加斯型或蒙特卡洛型（单侧或双侧误差），并说出它把问题放入的类：(a) 用随机化快速排序判定一个列表是否有重复元素；(b) 检验 $AB = C$ 的弗里瓦尔德斯检验（[[algorithms/randomised-algorithms#alg-freivalds]]）；(c) 判定合数的米勒–拉宾检验；(d) 一个抽样算法：抽 $1000$ 个随机赋值做检验，估计 $2^n$ 个赋值中满足公式的是否超过一半。
::: solution
(a) 拉斯维加斯型：答案总是正确，期望时间 $O(n\log n)$；$\mathsf{ZPP}$（事实上是 $\mathsf{P}$）。(b) 带单侧误差的蒙特卡洛型："$AB \ne C$" 永远正确；语言 $\{\langle A, B, C\rangle : AB = C\}$ 由该检验属于 $\mathsf{coRP}$（并由直接相乘属于 $\mathsf{P}$）。(c) 单侧："合数"永远正确；$\mathit{COMPOSITES} \in \mathsf{RP}$。(d) 双侧，但*不是* $\mathsf{BPP}$ 算法：若满足赋值的比例非常接近 $1/2$，固定次数的抽样无法以偏离 $1/2$ 有界的概率判断它在哪一侧。该问题（majority-SAT）是 $\mathsf{PP}$ 完全的；抽样器只能区分相差常数间隙的比例。
:::
:::

::: exercise 定义的稳健性 {level=2}
证明：把阈值 $2/3$ 与 $1/3$ 换成 $1 - 2^{-n}$ 与 $2^{-n}$，或换成 $1/2 + 1/n$ 与 $1/2 - 1/n$，类 $\mathsf{BPP}$ 不变。为什么不能取 $1/2 + 2^{-n}$ 与 $1/2 - 2^{-n}$？
::: solution
以 $1 - 2^{-n}$ 定义的类平凡地含于 $\mathsf{BPP}$，并由取 $q(n) = n$ 的 [[#thm-bpp-amp]] 包含 $\mathsf{BPP}$。以 $1/2 \pm 1/n$ 定义的类平凡地包含 $\mathsf{BPP}$；反过来，取 $\varepsilon = 1/n$，$m = O(n^2)$ 次运行给出误差 $\le 1/3$，仍是多项式时间。取 $\varepsilon = 2^{-n}$ 则需要 $m = \Omega(\varepsilon^{-2}) = \Omega(4^n)$ 次运行：指数级。由此得到的类——只要比 $1/2$ 有任何优势——是 $\mathsf{PP}$，它包含 $\mathsf{NP}$（其后第二道习题），且被认为比 $\mathsf{BPP}$ 大得多。
:::
:::

::: exercise 单次求值的误差 {level=2 check="3/100"}
两个五变元、总次数至多 $3$ 的多项式，通过在 $\{1, \dots, 100\}^5$ 中均匀选取的一点同时对两者求值来比较。若它们不同，[[#lem-schwartz-zippel]] 对"它们在该点取值相同"的概率给出多大上界？（填写分数。）
::: solution
其差是一个次数至多 $3$ 的非零多项式，它在随机点处为零的概率至多 $d/\lvert S\rvert = 3/100$。变元个数不出现在界中。十个独立点把它降到 $(3/100)^{10} \approx 5.9 \times 10^{-16}$。
:::
:::

::: exercise 由蒙特卡洛得到拉斯维加斯 {level=2}
某问题有多项式时间的随机化算法 $A$：它输出一个候选解，至少以概率 $1/n$ 正确；另有一个确定性多项式时间检验器，能判断候选解是否正确。把它变成拉斯维加斯型算法，并给出期望运行时间的界。
::: solution
重复：跑 $A$，检验其输出，正确就停止。每轮以概率 $p \ge 1/n$ 独立成功，所以轮数服从均值 $1/p \le n$ 的几何分布。若一轮花费 $T(n)$（算法加检验器），期望时间至多 $n\,T(n)$，是多项式的；且输出总是正确。这正是 [[#thm-zpp]] 的模式：检验器把单侧的"成功"变成零误差。
:::
:::

::: exercise NP 含于 PP {level=3}
$\mathsf{PP}$ 是满足下列条件的语言 $L$ 的类：存在多项式时间概率机器，使 $w \in L$ 当且仅当 $\Prob[\text{接受}] > 1/2$。证明 $\mathsf{NP} \subseteq \mathsf{PP}$ 且 $\mathsf{BPP} \subseteq \mathsf{PP}$。
::: solution
对 $\mathsf{NP}$，只需（因 $\mathsf{PP}$ 在 $\le_p$ 之下封闭：先算归约，再跑机器）把 $\mathit{SAT}$ 放入 $\mathsf{PP}$。在含 $n$ 个变元的公式 $\varphi$ 上：掷一次硬币；正面就接受；反面就均匀随机选一个赋值，仅当它满足 $\varphi$ 时接受。若 $\varphi$ 不可满足，$\Prob[\text{接受}] = 1/2$，并不 $> 1/2$。若 $\varphi$ 至少有一个满足赋值，$\Prob[\text{接受}] \ge 1/2 + \tfrac12 2^{-n} > 1/2$。故 $\mathit{SAT} \in \mathsf{PP}$。对 $\mathsf{BPP}$：一台 $\mathsf{BPP}$ 机器在 $L$ 内以概率 $\ge 2/3 > 1/2$ 接受，在 $L$ 外以 $\le 1/3 < 1/2$ 接受，所以它就是一台 $\mathsf{PP}$ 机器。
:::
:::

::: exercise 若 NP ⊆ BPP 则 NP = RP {level=3}
证明：若 $\mathit{SAT} \in \mathsf{BPP}$，则 $\mathit{SAT} \in \mathsf{RP}$，从而 $\mathsf{NP} = \mathsf{RP}$（库（Ko），1982）。
::: solution
设 $B$ 是 $\mathit{SAT}$ 的一个 $\mathsf{BPP}$ 算法，已放大到在规模不超过 $\lvert\varphi\rvert$ 的公式上误差至多 $1/(4(n+1))$。$\mathsf{RP}$ 算法在含变元 $x_1, \dots, x_n$ 的输入 $\varphi$ 上：运行 [[complexity/np#thm-self-reduction]] 的"由判定到搜索"程序，用 $B$ 代替判定器——至多 $n + 1$ 次调用——构造一个赋值；然后**确定性地检验**该赋值是否满足 $\varphi$，仅当满足时接受。若 $\varphi$ 不可满足，没有赋值满足它，算法从不接受。若 $\varphi$ 可满足，则全部 $n + 1$ 次调用都答对的概率至少 $1 - (n+1)/(4(n+1)) = 3/4$（并联界），此时程序找到一个满足赋值，算法便以至少 $3/4 \ge 1/2$ 的概率接受。故 $\mathit{SAT} \in \mathsf{RP}$。$\mathsf{RP}$ 在多项式时间归约之下封闭，所以 $\mathsf{NP} \subseteq \mathsf{RP}$；而 $\mathsf{RP} \subseteq \mathsf{NP}$ 恒成立（[[#prop-randomised-inclusions]]）。
:::
:::
