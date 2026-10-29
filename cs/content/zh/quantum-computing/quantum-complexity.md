肖尔（Shor）算法能在多项式时间内完成因数分解；格罗弗（Grover）算法的搜索只快一个平方根倍，而且对无结构的搜索没有任何量子算法能做得更好。那么，量子计算机在 [[complexity]] 的诸复杂性类之中处于什么位置？它们能解 $\mathsf{NP}$ 完全问题吗？经典计算机能以至多多项式倍的减慢模拟量子计算机，以致整个学科不过是一个只差常数因子的故事吗？还有，2019 年起那些声称实现"量子优越性"的实验到底证明了什么？本章把这些问题回答到已知所及的范围——而与 $\mathsf{P}$ 对 $\mathsf{NP}$ 问题一样，没有未经证明的假设我们知道的并不多，但也足以纠正最常见的误解。

我们仿照 $\mathsf{BPP}$（[[complexity/randomised-complexity]]）定义 $\mathsf{BQP}$——由多项式规模、有界错误的量子线路可解的问题类——并证明该定义是稳健的。我们证明 $\mathsf{BPP}\subseteq\mathsf{BQP}\subseteq\mathsf{PSPACE}$，第二个包含用**路径和**模拟证明，我们还把它实现了出来；并概述更精细的 $\mathsf{BQP}\subseteq\mathsf{PP}$。随后我们回顾已知属于 $\mathsf{BQP}$ 的问题、把它与 $\mathsf{BPP}$ 以及与 $\mathsf{NP}$ 分开的预言机结果、类 $\mathsf{QMA}$，以及采样实验中**量子优势**的复杂性理论论据，还有对这些实验发起挑战的经典模拟。

## 类 BQP

与 [[complexity/randomised-complexity]] 一样，我们使用判定问题（语言 $L\subseteq\{0,1\}^*$）与由高效经典过程生成的线路。

::: definition BQP {#def-bqp}
若存在一个经典确定性算法，给定 $1^n$ 后在关于 $n$ 的多项式时间内输出一个作用在 $p(n)$ 个量子比特上的量子线路 $C_n$ 的描述——该线路由固定门集 $\{H, T, \mathrm{CNOT}\}$ 中的门构成——使得对每个长度为 $n$ 的输入 $w$，在 $\ket{w}\ket{0^{p(n)-n}}$ 上运行 $C_n$ 并测量第一个量子比特，得到
$$
\Prob[1]\ge\tfrac23 \text{ 若 } w\in L, \qquad \Prob[1]\le\tfrac13 \text{ 若 } w\notin L ,
$$
则称语言 $L$ 属于 $\mathsf{BQP}$（有界错误量子多项式时间）。
:::

这个线路族是**一致的**（uniform）：一个多项式时间的经典程序描述所有线路，因此其中藏不住任何难以计算的信息（若允许非一致族，则可以判定不可判定的语言）。若干变体给出同一个类，这正是 $\mathsf{BQP}$ 被接受为高效量子计算模型的原因。

::: theorem BQP 的稳健性 {#thm-bqp-robust}
作如下替换，$\mathsf{BQP}$ 不变：(a) 把 $2/3$ 与 $1/3$ 换成 $1 - 2^{-q(n)}$ 与 $2^{-q(n)}$，或换成 $\tfrac12 \pm 1/q(n)$，其中 $q$ 为任意多项式；(b) 把门集换成任意有限的近似通用门集，其门的元素可有效计算；(c) 允许在线路中途测量、后续门由测量结果作经典控制；(d) 用量子图灵机（Bernstein–Vazirani，1993）代替线路（Yao，1993）。
:::

::: proof
(a) 把线路的 $m$ 份拷贝并排作用在新的辅助量子比特上，可逆地把它们输出比特的多数值算进一个新量子比特（[[quantum-computing/quantum-circuits#thm-oracle]]），再测量它。这 $m$ 个输出比特相互独立，每个正确的概率至少 $\tfrac12 + \varepsilon$，由 [[complexity/randomised-complexity]] 的切尔诺夫界，多数值出错概率至多 $e^{-\varepsilon^2 m/2}$；取 $m = O(q(n)/\varepsilon^2)$ 份即得错误 $2^{-q(n)}$，只要 $1/\varepsilon$ 是多项式的，$m$ 也就是多项式的。(b) 由 Solovay–Kitaev 定理（[[quantum-computing/quantum-circuits#thm-sk]]），由新门集的 $s$ 个门组成的线路可逐门以 $\varepsilon/s$ 的精度用 $\{H, T, \mathrm{CNOT}\}$ 中 $O(\log^c(s/\varepsilon))$ 个门逼近，而误差至多线性累加（[[quantum-computing/quantum-circuits#lem-errors]]），于是输出概率至多改变 $2\varepsilon$；取 $\varepsilon = 1/12$ 再用 (a) 放大。反过来，由通用性，新门集能逼近 $\{H, T, \mathrm{CNOT}\}$。(c) 即延迟测量原理（[[quantum-computing/quantum-circuits#prop-deferred]]）。(d) 即 Yao 定理，我们不证。
:::

::: proposition P ⊆ BPP ⊆ BQP {#prop-bpp-bqp}
$\mathsf{BPP}$ 中的每个语言都属于 $\mathsf{BQP}$。
:::

::: proof
一个 $\mathsf{BPP}$ 算法是输入 $w$ 与 $m$ 个随机比特串 $r$ 上的确定性多项式时间计算 $A(w, r)$，它可以写成多项式规模的一致经典线路族。由 [[quantum-computing/quantum-circuits#thm-oracle]]，它变成一个由 Toffoli、CNOT 与 $X$ 门组成的可逆线路 $\ket w\ket r\ket0\mapsto\ket w\ket r\ket{A(w, r)}$。把 $\ket r$ 制备为 $H^{\otimes m}\ket{0^m}$，即均匀叠加态，再测量输出量子比特。由部分测量规则（[[quantum-computing/entanglement#eq-partial]]），输出 $1$ 的概率是 $\sum_r 2^{-m}[A(w, r) = 1]$，恰为该随机化算法的接受概率。Toffoli 门可精确编译成 $\{H, T, \mathrm{CNOT}\}$，其中 $T^\dagger = T^7$（[[quantum-computing/quantum-circuits#ex-toffoli]]）。
:::

::: example 随机化算法作为量子线路 {#ex-coins}
一个随机化检验抛两枚均匀硬币 $r_1, r_2$，当两枚都是正面时接受。按 [[#prop-bpp-bqp]] 的方式把它写成量子线路，并验证它以概率 $1/4$ 接受。若硬币从不被测量，情况有什么变化？
::: solution
用三个处于 $\ket{000}$ 的量子比特。对量子比特 $0$ 与 $1$（硬币）施加 $H$，再以 $0, 1$ 为控制、$2$ 为目标施加一个 Toffoli 门（可逆的 AND），然后测量量子比特 $2$。状态为 $\tfrac12(\ket{000} + \ket{010} + \ket{100} + \ket{111})$，量子比特 $2$ 为 $1$ 的概率是 $\abs{1/2}^2 = 1/4$。硬币量子比特从不被测量，但这不改变任何结果：由延迟测量（[[quantum-computing/quantum-circuits#prop-deferred]]），输出统计与先测量硬币完全相同。使这成为一个*经典*计算的，是硬币始终只被用作控制——哈达玛门之后没有任何门让不同硬币取值的振幅相互干涉。量子算法的差别恰恰在于施加这样的门。
:::
:::

因数分解是一个搜索问题，但它有一个属于 $\mathsf{BQP}$ 的判定版本："$N$ 是否有不超过 $k$ 的素因子？"肖尔（Shor）算法重复运行后可以高概率给出完整的素因数分解（每个找到的因子都可检验素性并可继续分解），把因子与 $k$ 比较就回答了这个问题。同一问题也属于 $\mathsf{NP}\cap\mathsf{coNP}$：凭证就是素因数分解本身，由于素性测试在 $\mathsf{P}$ 中，它可在多项式时间内检验。这是人们**不**相信因数分解是 $\mathsf{NP}$ 完全的原因之一：若是，则 $\mathsf{NP} = \mathsf{coNP}$。

## 上界：用经典计算机模拟量子线路

对 $p$ 个量子比特上的线路作态向量模拟需要 $2^p$ 的内存。Feynman 的洞见在于：据我们所知，指数级的*时间*不可避免，但指数级的*内存*并非不可避免。

::: theorem BQP ⊆ PSPACE {#thm-bqp-pspace}
$\mathsf{BQP}$ 中的每个语言都可由一个使用多项式空间（及指数时间）的确定性经典算法判定。
:::

::: proof
设 $C = g_m\cdots g_1$ 是作用在 $p$ 个量子比特上、输入为 $\ket{x_0}$（输入串补零）的线路。在相邻的门之间插入完备性关系（[[quantum-computing/qubits#eq-completeness]]），得
$$
\bra yC\ket{x_0} = \sum_{x_1, \dots, x_{m-1}\in\{0,1\}^p}\bra y g_m\ket{x_{m-1}}\bra{x_{m-1}}g_{m-1}\ket{x_{m-2}}\cdots\bra{x_1}g_1\ket{x_0}.
$$ {#eq-path-sum}
每个序列 $x_0, x_1, \dots, x_{m-1}, y$ 是一条**路径**，贡献 $m$ 个矩阵元素之积。作用在至多两个量子比特上的门满足：除非 $x_k$ 与 $x_{k-1}$ 在那些量子比特之外处处相等，否则 $\bra{x_k}g_k\ket{x_{k-1}} = 0$，于是我们可以递归地计算振幅：$\mathrm{amp}_k(z) = \bra z g_k\cdots g_1\ket{x_0} = \sum_{z'}\bra zg_k\ket{z'}\,\mathrm{amp}_{k-1}(z')$，其中 $z'$ 只在至多 $4$ 个与 $z$ 仅差在 $g_k$ 所用量子比特上的串上取值。递归深度为 $m$，每一层只需为 $z$ 存 $O(p)$ 比特再加一个部分和。对 $H$、$T$、CNOT 这些门，每个振幅都是 $2^{-h/2}\sum_j c_j\omega^j$ 的形式，其中 $\omega = e^{i\pi/4}$，$c_j$ 为整数，可用多项式多个比特精确存储。于是 $\bra yC\ket{x_0}$ 可在空间 $O(m(p + \text{poly}))$ = 多项式内算出。接受概率为 $\sum_{y : y_1 = 1}\abs{\bra yC\ket{x_0}}^2$，是 $2^{p-1}$ 项之和，逐一遍历计算并复用空间；与 $1/2$ 比较即判定 $L$。
:::

这个证明就是一个程序，而且很短。它按上述递归计算一个振幅，并与态向量核对。

```python
from qsim import *

def amplitude(circuit, n, y, k=None):
    """按路径求和计算 <y| g_k ... g_1 |0^n>：多项式空间，指数时间。"""
    if k is None: k = len(circuit)
    if k == 0: return 1 if y == 0 else 0           # 输入态 |0...0>
    U, q, controls = circuit[k - 1]
    m = 1 << (n - 1 - q)
    if any(not (y >> (n - 1 - c)) & 1 for c in controls):
        return amplitude(circuit, n, y, k - 1)    # 控制位不满足：门作用如 I
    b = (y >> (n - 1 - q)) & 1                     # 目标量子比特的输出位
    total = 0
    for a in (0, 1):                               # 两个可能的输入位
        if U[b][a] != 0:
            total += U[b][a] * amplitude(circuit, n, (y & ~m) | (a * m), k - 1)
    return total

n = 3
circuit = [(H, 0, ()), (H, 1, ()), (T, 1, ()), (X, 2, (0,)), (H, 2, ()),
           (X, 0, (1,)), (T, 2, ()), (H, 0, ()), (X, 1, (2,)), (H, 1, ())]
s = zeros(n)
for U, q, c in circuit: apply(s, U, q, controls=c)
fmt = lambda z: f"{round(z.real, 4) + 0:+.4f}{round(z.imag, 4) + 0:+.4f}i"
for y in range(2 ** n):
    print(f"|{y:03b}>: path sum {fmt(amplitude(circuit, n, y))}   state vector {fmt(s[y])}")
```

```console
$ python3 path_sum.py
|000>: path sum +0.6036+0.2500i   state vector +0.6036+0.2500i
|001>: path sum +0.0000+0.0000i   state vector +0.0000+0.0000i
|010>: path sum +0.1036-0.2500i   state vector +0.1036-0.2500i
|011>: path sum +0.0000+0.0000i   state vector +0.0000+0.0000i
|100>: path sum +0.0000+0.0000i   state vector +0.0000+0.0000i
|101>: path sum +0.2500-0.1036i   state vector +0.2500-0.1036i
|110>: path sum +0.0000+0.0000i   state vector +0.0000+0.0000i
|111>: path sum -0.2500-0.6036i   state vector -0.2500-0.6036i
```

两种方法一致。对角门（$T$）与置换门（CNOT 以及 $X$）不分支，所以对含 $h$ 个哈达玛门的线路，路径数为 $2^h$——这里每个振幅至多 $2^5 = 32$ 条，与量子比特数无关。态向量法要花 $2^p$ 的内存和约 $m2^p$ 的时间；路径和法的内存为 $O(mp)$，时间为 $O(m2^h)$。实用模拟器在两者之间插值（张量网络收缩是其精巧版本），而内存与时间的取舍正是围绕 2019 年优越性实验的争论的核心。

::: example 两种模拟各有多贵？ {#ex-sim-cost}
一个线路作用在 $p = 50$ 个量子比特上、有 $m = 1000$ 个门，其中 $h = 200$ 个是哈达玛门。估算态向量法与路径和法计算一个振幅所需的内存与算术运算次数。
::: solution
**态向量法：** $2^{50}\approx 1.1\times10^{15}$ 个振幅，每个 $16$ 字节，内存 $16$ PiB，运算约 $m\cdot 2^{p} \approx 10^{18}$ 次——内存在 2026 年超出任何计算机，时间可行。**路径和法：** 深度 $1000$、串长 $50$ 比特的递归所需内存仅几 KB，项数约 $2^{200}\approx 1.6\times10^{60}$——内存微不足道，时间绝无可能。两者都不实用，但一种混合方法可以：把线路切成若干块，保存各块的态向量，并对跨过切割处的路径求和。已知的一切一般方法，其代价都关于线路的某个参数（量子比特数、非克利福德门数、或跨切割的纠缠量）呈指数。
:::
:::

路径和还给出一个更精细的上界。若一个多项式时间的概率型机器以严格大于 $1/2$ 的概率接受 $L$ 中的串、以不超过 $1/2$ 的概率接受其余的串，则称该语言属于 $\mathsf{PP}$——这是无界错误，一种强大得多的机器，它包含 $\mathsf{NP}$ 与 $\mathsf{BPP}$，并满足 $\mathsf{PP}\subseteq\mathsf{PSPACE}$。

::: theorem BQP ⊆ PP {#thm-bqp-pp}
（Adleman、DeMarrais 与 Huang，1997。）$\mathsf{BQP}$ 中的每个语言都属于 $\mathsf{PP}$。
:::

::: proof
（概要。）使用门集 $\{H, \mathrm{Toffoli}\}$，它对 $\mathsf{BQP}$ 是通用的（Shi，2003；此时所有振幅都是实数）。在 [[#eq-path-sum]] 中每条路径的权重都是 $\pm2^{-h/2}$，其中 $h$ 是哈达玛门的个数，符号 $(-1)^{\sigma(P)}$ 可由路径 $P$ 在多项式时间内算出（每个哈达玛门在把 $\ket1$ 映到 $\ket1$ 时贡献一个 $-1$）。于是
$$
\Prob[\text{接受}] = \sum_{y: y_1 = 1}\Bigl(2^{-h/2}\sum_{P\colon x_0\to y}(-1)^{\sigma(P)}\Bigr)^2 = 2^{-h}\sum_{y: y_1 = 1}\ \sum_{P, P'\colon x_0\to y}(-1)^{\sigma(P) + \sigma(P')} = \frac{A - B}{2^h},
$$
其中 $A$ 与 $B$ 分别计数总符号为偶与为奇的三元组 $(y, P, P')$。一个非确定型多项式时间机器可以猜测这样的三元组，而"接受路径数减拒绝路径数"这样的函数恰好构成类 $\mathsf{GapP}$。判定 $A - B > 2^h/2$——当 $w\in L$ 时成立（概率 $\ge 2/3$），当 $w\notin L$ 时不成立（概率 $\le 1/3$）——是一个关于 $\mathsf{GapP}$ 函数的阈值问题，由 $\mathsf{GapP}$ 的封闭性质（Fenner、Fortnow 与 Kurtz，1994）可知它属于 $\mathsf{PP}$。
:::

::: example Deutsch–Jozsa 的路径和 {#ex-dj-paths}
把 Deutsch–Jozsa 算法（[[quantum-computing/first-algorithms#alg-dj]]）末尾 $\ket{0^n}$ 的振幅写成路径和，并解释为什么精确计算它在经典上一般是困难的，尽管判定该承诺问题并不困难。
::: solution
线路是在输入寄存器上的 $H^{\otimes n}O_fH^{\otimes n}$。从 $\ket{0^n}$ 到 $\ket{0^n}$ 的路径在第一层哈达玛门之后经过一个中间基状态 $\ket x$（预言机是对角门，不分支）。路径权重为 $\bra{0^n}H^{\otimes n}\ket x(-1)^{f(x)}\bra xH^{\otimes n}\ket{0^n} = 2^{-n}(-1)^{f(x)}$，对 $2^n$ 条路径求和得 $2^{-n}\sum_x(-1)^{f(x)} = 2^{-n}(A - B)$，其中 $A$ 与 $B$ 分别计数 $f$ 取 $0$ 与取 $1$ 的输入个数——恰如 [[#thm-bqp-pp]] 中的一个 $\mathsf{GapP}$ 量。对线路给定的函数精确计算 $A - B$ 是 $\#\mathsf{P}$ 难的。但量子算法并不计算这个振幅；它是从一个分布中*采样*，振幅的平方即概率，而在承诺之下该概率非 $0$ 即 $1$。对 $f$ 作经典随机采样同样能轻松判定承诺问题（[[quantum-computing/first-algorithms#thm-dj-classical]]）。量子加速出现于从量子分布中采样在经典上困难之时，这正是下文关于采样一节的主线。
:::
:::

因此，以目前所知，
$$
\mathsf{P}\subseteq\mathsf{BPP}\subseteq\mathsf{BQP}\subseteq\mathsf{PP}\subseteq\mathsf{P}^{\#\mathsf{P}}\subseteq\mathsf{PSPACE}\subseteq\mathsf{EXP}.
$$
除了 $\mathsf P\ne\mathsf{EXP}$（由时间层次定理，[[complexity/hierarchies]]）之外，这些包含关系没有任何一个被证明是严格的。特别地，证明 $\mathsf{BPP}\ne\mathsf{BQP}$ 将证明 $\mathsf{P}\ne\mathsf{PSPACE}$，这是一个著名的悬案。**所以一切"量子计算机比经典计算机更强"的信念都是有条件的**：取决于因数分解的困难性，取决于预言机结果，或取决于诸如多项式层次不坍缩一类的猜想。

::: quiz
下列哪些命题是已知为真的（无条件成立）？（多选。）
- [x] $\mathsf{BQP}\subseteq\mathsf{PSPACE}$
- [ ] $\mathsf{NP}\subseteq\mathsf{BQP}$
- [ ] $\mathsf{BPP}\ne\mathsf{BQP}$
- [x] 因数分解（作为判定问题）属于 $\mathsf{BQP}\cap\mathsf{NP}\cap\mathsf{coNP}$
::: solution
$\mathsf{BQP}\subseteq\mathsf{PSPACE}$ 即 [[#thm-bqp-pspace]]；因数分解属于 $\mathsf{BQP}$ 由肖尔（Shor）算法，属于 $\mathsf{NP}\cap\mathsf{coNP}$ 因为素因数分解是两种答案的凭证。$\mathsf{NP}\subseteq\mathsf{BQP}$ 是否成立尚属未知，人们相信其为假；$\mathsf{BPP}\ne\mathsf{BQP}$ 同样未知，且它将蕴含 $\mathsf{P}\ne\mathsf{PSPACE}$。
:::
:::

## 哪些属于 BQP？

有多项式时间量子算法而没有已知多项式时间经典算法的问题，可以归入几个家族。

- **交换群上的隐藏子群问题**：因数分解与离散对数（肖尔（Shor），1994），包括椭圆曲线上的，以及数论问题如求解佩尔方程与计算数域的类群（Hallgren，2002 及其后）。
- **量子系统的模拟**：把局域哈密顿量 $H$ 的时间演化 $e^{-iHt}\ket\psi$ 估算到多项式精度（Lloyd，1996），再结合相位估计，可估算能有效制备的状态的能量。这是 Feynman 最初的动机，也是化学家和物理学家最期待首先落地的应用。它的判定版本是 $\mathsf{BQP}$ 完全的：每个 $\mathsf{BQP}$ 问题都可归约到它。
- **近似某些 #P 难的量**，例如在单位根处计算纽结的琼斯（Jones）多项式（Aharonov、Jones 与 Landau，2006），精确到加性精度，同样是 $\mathsf{BQP}$ 完全的。
- **特殊设定下的线性代数问题**（Harrow、Hassidim 与 Lloyd 的 HHL 算法，2009，处理稀疏、良态的线性方程组，其输出是一个量子态而非一串数）。若干基于这类方法的机器学习指数加速提案随后被**去量子化**（dequantised）——被同样对输入作采样的经典算法追平——始于 Ewin Tang 2018 年针对推荐系统的经典算法。

下图比较了经典因数分解（用数域筛法）与肖尔（Shor）算法的代价，以运算次数计。

::: widget plot
f: 1.923*(x*ln(2))^(1/3)*ln(x*ln(2))^(2/3)/ln(10); log10(x^3)
x: 64, 4096
y: 0, 50
labels: \log_{10}(\text{NFS 运算次数}); \log_{10}(L^3)
vlines: 2048
caption: 一般数域筛法启发式运行时间 $\exp\bigl(1.923(\ln N)^{1/3}(\ln\ln N)^{2/3}\bigr)$ 以 $10$ 为底的对数，与肖尔（Shor）算法的 $L^3$ 对比，横轴为 $N$ 的比特长 $L$（忽略常数因子）。在 $L = 2048$ 处，筛法约需 $10^{35}$ 次运算，而肖尔算法约需 $10^{10}$ 个门——这一差距以超多项式速度增长。量子一侧的计数假设使用纠错量子比特；[[quantum-computing/quantum-hardware]] 解释了它的代价。
:::

### NP 与 BQP

对任何 $\mathsf{NP}$ 完全问题都没有已知的高效量子算法，而且有充分的理由怀疑存在这样的算法。格罗弗（Grover）算法给穷举搜索一个平方根加速，而 BBBV 定理（[[quantum-computing/grover#thm-bbbv]]）表明任何把问题当作黑箱的算法都无法更好。肖尔（Shor）算法所利用的结构——交换群中的一个隐藏周期——在 $\mathsf{NP}$ 完全问题中没有已知的对应物。

::: warning "量子计算机同时尝试所有解，所以它们能解 NP 完全问题"
这是关于量子计算最常见的误解。量子计算机能制备全部 $2^n$ 个候选解的叠加态，一步在所有候选解上运行检验器，但这样测量只会给出一个均匀随机的候选解——不比对随机猜更好。要做得更好，就必须让干涉把振幅集中到解上，而对无结构搜索，能达到的最好集中也需要 $\Omega(2^{n/2})$ 步（[[quantum-computing/grover#thm-bbbv]]）。多数复杂性理论家猜想 $\mathsf{NP}\not\subseteq\mathsf{BQP}$；同样的判断也适用于量子退火机与变分启发式，迄今没有在 $\mathsf{NP}$ 难优化问题上表现出指数加速。
:::

## 预言机分离

相对于预言机的无条件分离是存在的。**相对化**的类 $\mathsf{C}^O$ 允许其机器查询预言机 $O$（对量子机器，预言机以 $U_O$ 的形式作用在叠加态上）。预言机结果并不能解决未相对化的问题——存在使 $\mathsf P = \mathsf{NP}$ 的预言机，也存在使二者不同的预言机（Baker、Gill 与 Solovay，1975）——但它们表明哪些证明技术不可能奏效，而且它们刻画了 [[quantum-computing/first-algorithms]] 中查询算法的威力。

::: theorem 涉及 BQP 的预言机分离 {#thm-oracles}
(a) 存在预言机 $O$ 使 $\mathsf{BQP}^O\not\subseteq\mathsf{BPP}^O$（Bernstein 与 Vazirani，1993，给出超多项式的查询差距；Simon，1994，给出指数的）。(b) 相对于一个随机预言机，以概率 $1$ 有 $\mathsf{NP}^O\not\subseteq\mathsf{BQP}^O$（Bennett、Bernstein、Brassard 与 Vazirani，1997）。(c) 存在一个预言机，使得 $\mathsf{BQP}^O$ 不包含在多项式层次 $\mathsf{PH}^O$ 中（Raz 与 Tal，2018）。
:::

::: proof
（(a) 与 (b) 的概要。）(a) 对每个 $n$，随机选取一个 $n$ 比特上的 Simon 函数 $f_n$，其周期为 $s_n$（或一个一对一函数），并令 $L = \{1^n : f_n \text{ 是二对一的}\}$。Simon 算法（[[quantum-computing/first-algorithms#alg-simon]]）用 $O(n)$ 次查询判定 $L$——给定候选 $s$ 后，再作两次查询 $f(0)$、$f(s)$ 即可检验——而经典机器要找一次碰撞需要 $\Omega(2^{n/2})$ 次查询（[[quantum-computing/first-algorithms#thm-simon-classical]]）；对所有多项式时间机器作对角化，就把这个查询差距转化为一个满足 $L\in\mathsf{BQP}^O\setminus\mathsf{BPP}^O$ 的预言机。(b) 令 $L = \{1^n : \text{存在 } x\in\{0,1\}^n \text{ 使 } O(x) = 1\}$，显然属于 $\mathsf{NP}^O$。对一个每种长度大约只有一个被标记串的随机预言机，判定 $L$ 就是无结构搜索，由 [[quantum-computing/grover#thm-bbbv]]，作 $2^{o(n/2)}$ 次查询的机器不可能以高出 $1/2$ 有界的概率成功；仍由对角化完成论证。
:::

第 (c) 部分是最强的：它意味着存在一个问题——Raz 与 Tal 用的是 "forrelation" 的一个变体，问一个布尔函数是否与另一个函数的傅里叶变换相关——量子计算机一次查询就能解，而任何常数深度、指数规模的电路族都不能，这种电路相对于预言机恰好刻画多项式层次。它回答了 Bernstein 与 Vazirani 在 1993 年提出的问题。

## 量子 Merlin–Arthur

$\mathsf{NP}$ 的量子类比是 $\mathsf{QMA}$：若一个多项式时间的量子验证器在给定多项式规模的**量子**凭证状态时，对 $w\in L$ 存在某个凭证使其以至少 $2/3$ 的概率接受，对 $w\notin L$ 任何凭证都使它以至多 $1/3$ 的概率接受，则称该语言属于 $\mathsf{QMA}$。Kitaev（1999）证明了**局域哈密顿量问题**——把每个项只作用在少数几个量子比特上之和的最低能量估算到多项式倒数精度——是 $\mathsf{QMA}$ 完全的。这就是量子的 Cook–Levin 定理，它暗示寻找量子系统的基态——从而化学与材料科学的许多问题——即使对量子计算机而言在最坏情形下也是困难的；量子化学算法依赖于好的初始状态。

## 量子优势实验

对大数作因数分解需要尚不存在的纠错机器。一台约 $50$–$100$ 个量子比特、带噪声的机器是否已经能做出任何经典计算机做不出的事？提案都是**采样问题**：从指定的随机线路的测量结果分布中输出一个样本。其复杂性论证是间接的，但在其精确形式上是严格的。

::: theorem 精确采样的困难性（非正式） {#thm-sampling}
若一个经典多项式时间的随机化算法能*精确地*从每个多项式规模量子线路的输出分布中采样——或从受限的线路族采样，如交换（IQP）线路（Bremner、Jozsa 与 Shepherd，2011），或带单光子的线性光学网络，即**玻色子采样**（Aaronson 与 Arkhipov，2011）——那么多项式层次将坍缩到第三层。
:::

我们陈述而不证明。该论证表明这类线路的精确输出概率是 $\#\mathsf{P}$ 难计算的，而一个经典采样器却能借 Stockmeyer 近似计数在 $\mathsf{BPP}^{\mathsf{NP}}$ 中近似它们；于是 $\mathsf{P}^{\#\mathsf{P}}\subseteq\mathsf{BPP}^{\mathsf{NP}}$，由 Toda 定理这使 $\mathsf{PH}$ 坍缩。真实器件带噪声，只能近似采样，所以关于实验的论断还依赖于关于近似采样困难性的进一步、更没把握的猜想，以及诸如**线性交叉熵**保真度一类的基准——它把观察到的样本与在较小实例上经典算出的理想概率作比较。

::: application 优越性之争，2019–2025
2019 年 10 月，一个 Google 团队报告其 $53$ 量子比特的 Sycamore 处理器在约 $200$ 秒内完成了 $20$ 层随机线路的采样，并估计 Summit 超级计算机完成同样任务需要 $10\,000$ 年。几天之内，IBM 的研究者争辩说，利用 Summit 的磁盘存储作模拟约需 $2.5$ 天。2022 年，Feng Pan、Keyang Chen 与 Pan Zhang 用张量网络方法在 $512$ 块 GPU 上以约 $15$ 小时复现了保真度相当的样本，后续工作进一步压低了经典代价。类似的主张也出现在高斯玻色子采样（USTC 的"九章"光子实验，2020 年起）与超导随机线路采样（USTC"祖冲之"，2021 年）上，也同样受到利用噪声与光子损耗的改进经典算法的挑战。2024 年 12 月，Google 报告其 $105$ 量子比特的 Willow 芯片在不到五分钟内在一个随机线路采样基准上得到结果，据估计当今一流的超级计算机需要约 $10^{25}$ 年。至今的模式是：每个主张在提出时都令人信服，经典一侧作出回应，边界随之移动。随机线路采样没有已知的实际用途；它的作用是检验量子器件是否做出了经典上困难的事，多数研究者承认对足够大、噪声足够低的实例它们现在确实做到了——但要提醒，"经典上困难"是猜想，不是定理。
:::

::: example 重复运行得到可靠答案 {#ex-amplify}
一个 $\mathsf{BQP}$ 线路以恰好 $2/3$ 的概率正确。用 [[complexity/randomised-complexity]] 的放大界 $e^{-\varepsilon^2m/(1+2\varepsilon)}$ 并取 $\varepsilon = 1/6$，需要多少份拷贝才能使错误至多 $10^{-6}$？线路大多少倍？
::: solution
$\varepsilon = 1/6$ 时 $\varepsilon^2/(1 + 2\varepsilon) = (1/36)/(4/3) = 1/48$，所以需要 $e^{-m/48}\le10^{-6}$，即 $m\ge 48\ln(10^6)\approx 663.2$：$m = 664$ 份（实际上取奇数 $665$ 可避免平局）。放大后的线路量子比特数与门数是原来的 $664$ 倍，外加一个规模为 $O(m\log m)$ 的可逆多数线路。切尔诺夫界在这里相当宽松：精确的二项计算表明 $193$ 份就够了。在硬件上更实际的做法是把同一条线路运行 $m$ 次、经典地取多数——由延迟测量，这与前面完全等价，只是把宽度换成 $m$ 倍的时间。
:::
:::

::: widget distribution
dist: binomial
params: n=101, p=0.6667
a: 0
b: 50
caption: 正确率 $2/3$ 的 $\mathsf{BQP}$ 线路独立运行 $n$ 次中正确答案的个数。当这个数不超过 $n/2$ 时多数表决失败（图中阴影，$n = 101$ 时）：概率约 $2.7\times10^{-4}$。增大 $n$，观察阴影尾部指数消失——这就是 [[#def-bqp]] 中常数 $2/3$ 无关紧要的原因。
:::

::: history
Richard Feynman 1982 年的演讲 "Simulating physics with computers"（发表于 *International Journal of Theoretical Physics*）论证经典计算机模拟量子系统效率低下，并提出量子计算机；Yuri Manin 在 1980 年提出过类似建议。David Deutsch 于 1985 年定义了通用量子图灵机。Ethan Bernstein 与 Umesh Vazirani 于 1993 年创立量子复杂性理论（期刊版 1997），定义了 $\mathsf{BQP}$，证明 $\mathsf{BQP}\subseteq\mathsf{P}^{\#\mathsf P}$ 并给出第一个预言机分离；Andrew Yao 同年证明线路与量子图灵机等价。Leonard Adleman、Jonathan DeMarrais 与 Ming-Deh Huang 于 1997 年证明 $\mathsf{BQP}\subseteq\mathsf{PP}$；Lance Fortnow 与 John Rogers 于 1999 年证明 $\mathsf{BQP}$ 对 $\mathsf{PP}$ 是低的。Alexei Kitaev 于 1999 年定义 $\mathsf{QMA}$ 并证明局域哈密顿量问题对它完全。Scott Aaronson 与 Alex Arkhipov 于 2011 年提出玻色子采样；John Preskill 于 2012 年造出 "quantum supremacy"（量子优越性）一词；Ran Raz 与 Avishay Tal 于 2018 年证明了 $\mathsf{BQP}$ 相对 $\mathsf{PH}$ 的预言机分离。
:::

## 后续内容

复杂性图景告诉我们对硬件应抱什么期望：只有对结构化的问题（因数分解、离散对数、量子系统模拟）才有指数优势，格罗弗（Grover）一类的算法有多项式优势，而采样任务上的优势演示，其经典困难性只是猜想。[[quantum-computing/error-correction]] 表明噪声不改变这个类：阈值定理意味着，只要噪声低于某个常数阈值，带噪声线路就能实现 $\mathsf{BQP}$，开销仅为对数多项式倍。[[quantum-computing/quantum-hardware]] 讨论截至 2026 年各机器达到的水平。这里使用的经典复杂性类以及 $\mathsf{PP}$、$\#\mathsf P$ 与多项式层次背后的技术见 [[complexity]]；Aaronson 的 *Quantum Computing Since Democritus* 是漫步这片风景的有趣导览。

::: summary
- $\mathsf{BQP}$ 是可由一致的多项式规模量子线路以至多 $1/3$ 的错误判定的语言类（[[#def-bqp]]）；它对错误界、门集与中途测量都稳健（[[#thm-bqp-robust]]）。
- $\mathsf{BPP}\subseteq\mathsf{BQP}$（[[#prop-bpp-bqp]]）：可逆线路加哈达玛门抛硬币即可模拟随机化计算。
- 由 Feynman 路径和 $\mathsf{BQP}\subseteq\mathsf{PSPACE}$（[[#thm-bqp-pspace]]），且 $\mathsf{BQP}\subseteq\mathsf{PP}$（[[#thm-bqp-pp]]）；所以证明 $\mathsf{BPP}\ne\mathsf{BQP}$ 就会证明 $\mathsf P\ne\mathsf{PSPACE}$。
- 已知的指数加速都属于结构化问题：交换隐藏子群（因数分解、离散对数）、量子模拟、某些纽结不变量。没有已知的 $\mathsf{NP}$ 完全问题的高效量子算法，黑箱方法只给平方根加速。
- 预言机把 $\mathsf{BQP}$ 与 $\mathsf{BPP}$ 分开（Simon），也与 $\mathsf{PH}$ 分开（Raz–Tal），随机预言机把 $\mathsf{NP}$ 与 $\mathsf{BQP}$ 分开（BBBV）（[[#thm-oracles]]）。
- $\mathsf{QMA}$ 是 $\mathsf{NP}$ 的量子类比，局域哈密顿量问题对它完全。
- 采样实验建立在关于近似采样的猜想之上（[[#thm-sampling]]）；2019 年以来的优势主张都遭到更好的经典模拟的迎击，边界仍在移动。
:::

## 习题

::: exercise 放大 BQP 线路 {level=1 check="664"}
用 [[#ex-amplify]] 的界，一个成功概率为 $2/3$ 的线路需要多少份拷贝，才能把多数表决的错误降到至多 $10^{-6}$？（填入该界给出的最小数目。）
::: solution
$m\ge 48\ln(10^6) = 663.15\ldots$，所以 $m = 664$，同 [[#ex-amplify]]。若成功概率改为 $0.9$（$\varepsilon = 0.4$，$\varepsilon^2/(1 + 2\varepsilon) = 0.16/1.8 \approx 0.0889$），同一个界只需约 $156$ 份。
:::
:::

::: exercise 数路径 {level=1 check="32"}
在路径和程序中，这个含十个门（其中五个哈达玛门）的线路，每个振幅至多有多少条路径（非零乘积）贡献？（填一个数。）
::: solution
只有哈达玛门分支（它的每一行有两个非零元素），而 $T$、$X$ 与 CNOT 每行只有一个非零元素。所以每个振幅至多有 $2^5 = 32$ 条路径贡献，与量子比特数无关。含 $h$ 个哈达玛门的线路，每个振幅耗时 $O(m2^h)$。
:::
:::

::: exercise 对补封闭 {level=1}
证明 $\mathsf{BQP}$ 对补运算封闭，并且对并和交也封闭。
::: solution
补：在输出量子比特上加一个 $X$ 门即可：概率 $\ge2/3$ 与 $\le1/3$ 互换。并与交：先把两个线路都放大到错误至多 $1/12$（[[#thm-bqp-robust]](a)），在分开的寄存器上运行，再把它们输出比特的 OR（相应地 AND）可逆地算进一个新量子比特。由联合界，结果出错的概率至多 $1/12 + 1/12 = 1/6 < 1/3$。
:::
:::

::: exercise 哪些已知属于 BQP？ {level=1}
对每个问题，说明它是否已知属于 $\mathsf{BQP}$，以及它是否被认为不属于 $\mathsf{BPP}$：(a) 素性检验；(b) 椭圆曲线群上的离散对数；(c) 图的 $3$-可着色性；(d) 把局域哈密顿量的基态能量估算到多项式倒数精度；(e) 模拟局域哈密顿量多项式时间的演化。
::: solution
(a) 属于 $\mathsf P$（AKS，2002），因而属于 $\mathsf{BQP}$；不是量子加速。(b) 由肖尔（Shor）算法属于 $\mathsf{BQP}$；被认为不属于 $\mathsf{BPP}$——椭圆曲线密码就建立在这上面。(c) $\mathsf{NP}$ 完全：未知是否属于 $\mathsf{BQP}$，人们相信不属于。(d) $\mathsf{QMA}$ 完全（Kitaev）：最坏情形下不被认为属于 $\mathsf{BQP}$。(e) 属于 $\mathsf{BQP}$（Lloyd）且 $\mathsf{BQP}$ 完全，所以除非 $\mathsf{BPP} = \mathsf{BQP}$，它不属于 $\mathsf{BPP}$。
:::
:::

::: exercise 因数分解在 NP ∩ coNP 中 {level=2}
设 $\mathrm{FACTOR} = \{(N, k) : N \text{ 有一个素因子 } p\le k\}$。证明 $\mathrm{FACTOR}\in\mathsf{NP}\cap\mathsf{coNP}$ 且 $\mathrm{FACTOR}\in\mathsf{BQP}$，并证明若 $\mathrm{FACTOR}$ 是 $\mathsf{NP}$ 完全的，则 $\mathsf{NP} = \mathsf{coNP}$。
::: solution
**凭证。** "是"的凭证：一个不超过 $k$ 且整除 $N$ 的素数 $p$（素性可多项式时间检验）。"否"的凭证：完整的素因数分解 $N = p_1^{e_1}\cdots p_m^{e_m}$，每个 $p_i > k$ 且为素数，乘回去即可检验；因为计入重数后素因子至多有 $\log_2N$ 个，凭证长度为多项式。所以 $\mathrm{FACTOR}\in\mathsf{NP}\cap\mathsf{coNP}$。**量子。** 肖尔（Shor）算法以常数概率找到一个因子；对因子递归（辅以素性检验），多项式多次运行后即可高概率得到完整分解，再把最小素因子与 $k$ 比较即以有界错误判定该问题。**完全性。** 若 $\mathrm{FACTOR}$ 是 $\mathsf{NP}$ 完全的，则每个 $L\in\mathsf{NP}$ 都归约到它，而 $\mathsf{coNP}$ 对多项式时间归约封闭，于是 $L\in\mathsf{coNP}$；从而 $\mathsf{NP}\subseteq\mathsf{coNP}$，由对称性 $\mathsf{NP} = \mathsf{coNP}$。
:::
:::

::: exercise 内存对时间 {level=2}
一种模拟策略把前 $p/2$ 个量子比特的状态保存为向量，对其余量子比特作路径求和。非正式地解释：为什么两半之间只用 $c$ 个两量子比特门相连的线路可以用内存 $O(2^{p/2})$、时间 $O(4^c\cdot m2^{p/2})$ 模拟，以及为什么这使得浅线路或弱连接线路容易模拟。
::: solution
任何两量子比特门都可写成至多 $4$ 个单量子比特算子张量积之和 $G = \sum_{j=1}^{4}A_j\otimes B_j$（算子的 Schmidt 分解，正如把 [[quantum-computing/entanglement#thm-schmidt]] 用到 $4\times4$ 矩阵构成的 $16$ 维空间上）。把跨越切割的每个门都换成这样的和，线路就变成 $4^c$ 个线路之和，其中两半不再相互作用。每一项是两个独立的半线路之积，各用规模 $2^{p/2}$ 的态向量以时间 $O(m2^{p/2})$ 模拟，振幅相乘。对 $4^c$ 项求和即得答案。对 $c$ 很小的线路（跨越切割的门少，如一条线上的浅线路或低深度随机线路），这远比完整的 $2^p$ 态向量便宜。更好的切割与张量网络收缩阶可把这想法推广；2019 年的采样实验最终就是这样模拟出来的。
:::
:::

::: exercise BQP 对自身是低的 {level=3}
证明 $\mathsf{BQP}^{\mathsf{BQP}} = \mathsf{BQP}$：一个可以查询 $\mathsf{BQP}$ 预言机（还可在叠加态上查询）的 $\mathsf{BQP}$ 机器并不比没有预言机的更强。
::: solution
设外层线路对语言 $L'\in\mathsf{BQP}$ 作 $q$ 次查询。把每次查询替换成 $L'$ 的线路 $C'$，并放大到错误 $\varepsilon = 1/(100q^2)$（[[#thm-bqp-robust]]）：用 $C'$ 把答案算进一个辅助量子比特，CNOT 拷贝到查询的目标寄存器上，再运行 $C'^{-1}$ 把辅助区反算掉。在基输入 $\ket z$ 上，$C'$ 的输出为 $\sqrt{1-\varepsilon'}\ket{L'(z)}\ket{g_z} + \sqrt{\varepsilon'}\ket{\neg L'(z)}\ket{b_z}$，其中 $\varepsilon'\le\varepsilon$，于是"计算—拷贝—反算"序列与理想预言机 $\ket z\ket y\mapsto\ket z\ket{y\oplus L'(z)}$ 在每个基状态上的范数差至多 $O(\sqrt\varepsilon)$。两个映射都不改变 $\ket z$，所以它们的差是分块对角的，每个 $z$ 对应一块，每块作用在 $2$ 维目标寄存器与辅助区上；因此算子范数差就是最大的那块范数，仍是 $O(\sqrt\varepsilon)$。由 [[quantum-computing/quantum-circuits#lem-errors]]，$q$ 次查询后的总误差为 $O(q\sqrt\varepsilon) = O(1/10)$，足够小，使得外层线路的输出概率改变不超过 $1/6$；再放大外层线路即恢复 $2/3$ 间隔。结果是一个多项式规模的量子线路。（反算必不可少：若把垃圾 $\ket{g_z}$ 留在原地与查询纠缠，就会破坏外层算法赖以工作的干涉。）
:::
:::

::: exercise 一个 GapP 公式 {level=3}
对 $h$ 个哈达玛门、作用在 $\ket{0^p}$ 上的由 $H$ 与 Toffoli 组成的线路 $C$，证明 $\bra yC\ket{0^p} = 2^{-h/2}(A_y - B_y)$，其中 $A_y$ 与 $B_y$ 分别计数含偶数个与奇数个"$\ket1\mapsto\ket1$"哈达玛跃迁的路径。用单量子比特上的 $C = H$ 与 $C = HH$ 验证。
::: solution
展开 [[#eq-path-sum]]：每个 Toffoli 在每列恰有一个非零元素 $1$（它置换基状态），而每个哈达玛门的元素为 $\bra bH\ket a = 2^{-1/2}(-1)^{ab}$。因此一条路径由 $h$ 个哈达玛门处选定的输出 $b$ 决定，其权重为 $2^{-h/2}(-1)^{\#\{\text{哈达玛门处 } a = b = 1\}}$。按该计数的奇偶性把路径分组，即得 $2^{-h/2}(A_y - B_y)$。对 $C = H$ 作用在 $\ket0$：到每个 $y$ 各一条路径，$a = 0$，所以 $A_0 = A_1 = 1$，$B = 0$：振幅 $2^{-1/2}$，正确。对 $C = HH$：路径为 $0\to b_1\to b_2$。到 $y = 0$：经由 $b_1 = 0$（无 $1\to1$）与 $b_1 = 1$（也无 $1\to1$，因为 $b_2 = 0$）：$A_0 = 2$，振幅 $2^{-1}\cdot2 = 1$。到 $y = 1$：经由 $b_1 = 0$（偶）与 $b_1 = 1$（第二个哈达玛门把 $1\to1$：奇），所以 $A_1 - B_1 = 1 - 1 = 0$。故 $HH\ket0 = \ket0$——[[quantum-computing/qubits#ex-interference]] 中的干涉，如今化为相消的计数。
:::
:::
