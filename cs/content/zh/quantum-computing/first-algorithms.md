假设以黑箱形式给出函数 $f\colon\{0,1\}^n\to\{0,1\}$，并承诺它要么是**常函数**（在每个输入上取相同的值），要么是**平衡函数**（恰好在一半的输入上取 $1$）。它是哪一种？确定性经典算法可能必须查看超过一半的输入——$2^{n-1} + 1$ 个——才能确信。而允许在输入的叠加态上查询 $f$ 的量子算法，只需**一次**查询就确切地给出回答。这就是 1992 年的 Deutsch–Jozsa 算法，是第一个比任何确定性经典算法快指数级的量子算法的例子。它解决的问题是人为的，随机化的经典算法也几乎同样好；但它的思想——在叠加态上查询，让答案通过哈达玛变换相互干涉，然后测量——是本课程每个算法的模板。

本章建立**查询模型**——这些加速在其中是被证明的而非被猜想的——以及每个早期算法都使用的两件工具：**相位反冲**与**哈达玛变换**。然后我们依次完成三个强度递增的算法。Deutsch–Jozsa 把量子查询复杂度与确定性经典查询复杂度分开；**Bernstein–Vazirani** 用一次查询而非 $n$ 次查询学到一个隐藏的 $n$ 比特串；**Simon 算法**用 $O(n)$ 次查询找到一个隐藏的"异或周期"，而任何经典算法、哪怕是随机化的，都需要 $\Omega(2^{n/2})$ 次。Simon 算法是 肖尔（Shor）的因数分解算法（[[quantum-computing/shor]]）的直接灵感来源。每个算法都用 [[quantum-computing/quantum-circuits]] 的模拟器 `qsim.py` 检验。

## 查询模型

在**查询模型**中，输入是一个函数 $f$，算法只能通过求值来访问它，代价是求值的次数，称为**查询**；其余一切计算都是免费的。量子算法通过 [[quantum-computing/quantum-circuits#def-oracle]] 的预言机 $U_f\ket x\ket y = \ket x\ket{y\oplus f(x)}$ 来查询，且可以把它作用在叠加态上。这个模型是一种简化，但简化得诚实：若 $f$ 由经典线路给出，$U_f$ 就是一个规模大致相同的线路（[[quantum-computing/quantum-circuits#thm-oracle]]），因此只要算法的其余部分是高效的，查询上的节省就转化为时间上的节省。它最大的优点在于下界在其中能够被*证明*，而对于通常的时间复杂度，我们甚至无法把 $\mathsf{P}$ 与 $\mathsf{PSPACE}$ 分开。

::: definition 查询复杂度 {#def-query}
对于输入是一个函数 $f$（来自某个有承诺的函数族）的问题，**确定性查询复杂度** $D$ 是永远正确的确定性算法在最坏情形（关于 $f$）下所需查询数的最小值。**随机化**（有界错误）查询复杂度 $R$ 对每个 $f$ 都至少以 $2/3$ 的概率正确的随机化算法同样定义；**量子**查询复杂度 $Q$ 对至少以 $2/3$ 的概率正确的量子算法（在任意酉变换之间穿插 $U_f$ 的施加的线路）定义；$Q_E$ 表示以概率 $1$ 正确的精确量子算法。
:::

总有 $Q \le R \le D$。两个引理承担了本章的大部分工作。

::: lemma 相位反冲 {#lem-kickback}
对 $f\colon\{0,1\}^n\to\{0,1\}$ 与 $\ket- = (\ket0 - \ket1)/\sqrt2$，
$$
U_f\ket x\ket- = (-1)^{f(x)}\ket x\ket- .
$$
因此对任何输入状态 $\sum_x\alpha_x\ket x$，把目标位置于 $\ket-$ 后查询一次，得到 $\bigl(\sum_x(-1)^{f(x)}\alpha_x\ket x\bigr)\ket-$：它在输入寄存器上施加了**相位预言机** $O_f$。
:::

::: proof
$U_f\ket x\ket0 = \ket x\ket{f(x)}$ 且 $U_f\ket x\ket1 = \ket x\ket{1\oplus f(x)}$，所以 $U_f\ket x\ket- = \ket x\,\tfrac{1}{\sqrt2}\bigl(\ket{f(x)} - \ket{1\oplus f(x)}\bigr)$。若 $f(x) = 0$，这就是 $\ket x\ket-$；若 $f(x) = 1$，它是 $\ket x\,\tfrac{1}{\sqrt2}(\ket1 - \ket0) = -\ket x\ket-$。一般情形由线性性得出。
:::

对 $x, y \in \{0,1\}^n$，记 $x\cdot y = x_1y_1\oplus\dots\oplus x_ny_n$，即模 $2$ 的内积。

::: lemma 哈达玛变换 {#lem-hadamard}
对每个 $x\in\{0,1\}^n$，
$$
H^{\otimes n}\ket x = \frac{1}{\sqrt{2^n}}\sum_{y\in\{0,1\}^n}(-1)^{x\cdot y}\ket y .
$$ {#eq-hadamard}
此外，$\sum_{x\in\{0,1\}^n}(-1)^{x\cdot y}$ 当 $y = 0^n$ 时等于 $2^n$，否则等于 $0$。
:::

::: proof
单个量子比特时，$H\ket{x_j} = \tfrac{1}{\sqrt2}(\ket0 + (-1)^{x_j}\ket1) = \tfrac{1}{\sqrt2}\sum_{y_j\in\{0,1\}}(-1)^{x_jy_j}\ket{y_j}$。对 $j = 1, \dots, n$ 取张量积并展开，
$$
H^{\otimes n}\ket x = \bigotimes_{j=1}^n\frac{1}{\sqrt2}\sum_{y_j}(-1)^{x_jy_j}\ket{y_j} = \frac{1}{\sqrt{2^n}}\sum_y(-1)^{x_1y_1 + \dots + x_ny_n}\ket y,
$$
且 $(-1)^{x_1y_1 + \dots + x_ny_n} = (-1)^{x\cdot y}$。第二个结论：$y = 0^n$ 时每一项都是 $1$。否则取使 $y_j = 1$ 的 $j$；翻转 $x$ 的第 $j$ 位是 $\{0,1\}^n$ 的一个双射，它使 $x\cdot y$ 改变 $1$，于是把各项两两配成相互抵消的对。
:::

特别地 $H^{\otimes n}\ket{0^n} = 2^{-n/2}\sum_x\ket x$ 是均匀叠加，且因为 $H^{\otimes n}$ 是自身的逆，$H^{\otimes n}$ 把 $2^{-n/2}\sum_x(-1)^{x\cdot s}\ket x$ 变回 $\ket s$。

## Deutsch 与 Deutsch–Jozsa

$n = 1$ 的情形是 **Deutsch 问题**：给定 $f\colon\{0,1\}\to\{0,1\}$，判定 $f(0) = f(1)$ 是否成立。经典上这需要两个函数值，即两次查询。

::: example Deutsch 算法 {#ex-deutsch}
从 $\ket0\ket1$ 出发，施加 $H\otimes H$，查询 $U_f$ 一次，对第一个量子比特施加 $H$ 并测量它。证明：$f(0) = f(1)$ 时结果为 $0$，否则为 $1$。
::: solution
$H\otimes H$ 之后状态为 $\ket+\ket-$。由 [[#lem-kickback]]，查询给出 $\tfrac{1}{\sqrt2}\bigl((-1)^{f(0)}\ket0 + (-1)^{f(1)}\ket1\bigr)\ket-$。提出全局相位 $(-1)^{f(0)}$：第一个量子比特是 $\tfrac{1}{\sqrt2}(\ket0 + (-1)^{f(0)\oplus f(1)}\ket1)$，$f(0) = f(1)$ 时它是 $\ket+$，否则是 $\ket-$。最后的 $H$ 把它们分别映为 $\ket0$ 与 $\ket1$。一次查询就算出了 $f(0)\oplus f(1)$，即 $f$ 的一个*全局*性质，却没有学到任何一个函数值：测量结果关于 $f(0)$ 本身什么也没有说。这种交换——关于函数值之间关系的一个比特，关于函数值本身零个比特——是典型的。
:::
:::

$n$ 比特时，承诺问题如引言所述。

::: algorithm Deutsch–Jozsa 算法 {#alg-dj}
输入：$f\colon\{0,1\}^n\to\{0,1\}$ 的预言机 $U_f$，承诺为常函数或平衡函数。
1. 制备 $\ket{0^n}\ket1$，施加 $H^{\otimes(n+1)}$。
2. 施加 $U_f$ 一次。
3. 对前 $n$ 个量子比特施加 $H^{\otimes n}$ 并测量它们。
4. 若结果为 $0^n$ 则输出"常数"，否则输出"平衡"。
:::

::: theorem Deutsch–Jozsa 的正确性 {#thm-dj}
[[#alg-dj]] 使用一次查询且永远正确。测量之前输入寄存器中 $\ket{0^n}$ 的振幅是 $2^{-n}\sum_x(-1)^{f(x)}$，$f$ 为常函数时它是 $\pm1$，$f$ 为平衡函数时它是 $0$。
:::

::: proof
第 1 步后状态为 $2^{-n/2}\sum_x\ket x\otimes\ket-$，第 2 步后由 [[#lem-kickback]] 为 $2^{-n/2}\sum_x(-1)^{f(x)}\ket x\otimes\ket-$。由 [[#lem-hadamard]]，第 3 步产生
$$
\frac{1}{2^n}\sum_y\Bigl(\sum_x(-1)^{f(x) + x\cdot y}\Bigr)\ket y\otimes\ket- .
$$
$y = 0^n$ 的系数是 $2^{-n}\sum_x(-1)^{f(x)}$。若 $f$ 是以 $c$ 为值的常函数，它是 $(-1)^c$，模为 $1$，故结果必为 $0^n$。若 $f$ 平衡，则 $2^{n-1}$ 项为 $+1$、$2^{n-1}$ 项为 $-1$，系数为 $0$，结果绝不会是 $0^n$。
:::

下面的模拟器用 `permute` 实现 $U_f$：目标位作为最后一个量子比特，基下标 $i$ 编码 $x = i \gg 1$ 与 $y = i \mathbin{\&} 1$，当 $f(x) = 1$ 时 $U_f$ 翻转最后一位。

```python
from qsim import *

def query(s, f, n):                 # U_f |x>|y> = |x>|y xor f(x)>，目标位 = 最后一个量子比特
    permute(s, lambda i: i ^ f(i >> 1))

def deutsch_jozsa(f, n):
    s = zeros(n + 1)
    apply(s, X, n)                                  # 目标位 |1>
    for q in range(n + 1): apply(s, H, q)           # 输入 |+>^n，目标位 |->
    query(s, f, n)                                  # 一次查询：相位 (-1)^f(x)
    for q in range(n): apply(s, H, q)
    p0 = sum(probs(s)[0:2])                         # P(输入寄存器 = 0...0)
    return round(p0, 6)

n = 3
tests = {"constant 0": lambda x: 0, "constant 1": lambda x: 1,
         "parity x0^x1^x2": lambda x: bin(x).count("1") % 2,
         "first bit x0": lambda x: x >> 2,
         "balanced table": lambda x: [1, 1, 1, 0, 1, 0, 0, 0][x],
         "NOT balanced": lambda x: int(x == 5)}           # 破坏承诺
for name, f in tests.items():
    ones = sum(f(x) for x in range(2 ** n))
    print(f"{name:16} (f=1 on {ones} of 8 inputs): P(all zeros) = {deutsch_jozsa(f, n)}")
```

```console
$ python3 deutsch_jozsa.py
constant 0       (f=1 on 0 of 8 inputs): P(all zeros) = 1.0
constant 1       (f=1 on 8 of 8 inputs): P(all zeros) = 1.0
parity x0^x1^x2  (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
first bit x0     (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
balanced table   (f=1 on 4 of 8 inputs): P(all zeros) = 0.0
NOT balanced     (f=1 on 1 of 8 inputs): P(all zeros) = 0.5625
```

最后一行展示了跳出承诺之外会发生什么：$f = 1$ 在 $2^n$ 个输入中的 $k$ 个上成立时，振幅为 $(2^n - 2k)/2^n$，这里是 $6/8$，概率为 $(6/8)^2 = 0.5625$。算法于是对这个既非常数也不平衡的函数反而更常回答"常数"。承诺是这些问题不可或缺的一部分。

::: theorem Deutsch–Jozsa 的经典查询复杂度 {#thm-dj-classical}
Deutsch–Jozsa 问题的每个确定性经典算法在最坏情形下至少作 $2^{n-1} + 1$ 次查询。另一方面，查询 $k$ 个均匀随机输入、在所有答案一致时回答"常数"的随机化算法，出错概率至多为 $2^{1-k}$。
:::

::: proof
*下界。*考虑一个对所有查询都回答 $0$ 的对手。若算法在 $q \le 2^{n-1}$ 个不同查询之后停止，则常函数 $0$ 与一个平衡函数——在被查询的输入上（外加另外 $2^{n-1} - q$ 个未查询的输入上）取 $0$，在其余 $2^{n-1}$ 个输入上取 $1$——都与它所见的一切相容，而算法对两者给出同样的回答，于是对其中之一是错的。因此它需要 $2^{n-1} + 1$ 次查询，而 $2^{n-1} + 1$ 次也足够。

*随机上界。*常函数永远给出一致的回答，所以算法对它永不出错。对平衡的 $f$，每次随机查询独立地以 $1/2$ 的概率返回 $0$ 或 $1$，$k$ 个回答全部一致的概率为 $2\cdot 2^{-k} = 2^{1-k}$。
:::

::: warning Deutsch–Jozsa 相对随机化算法并不是指数加速
[[#thm-dj]] 与 [[#thm-dj-classical]] 的指数差距是相对**确定性精确**经典算法而言的。允许较小的误差时，经典算法只需要常数次查询：$k = 2$ 给出误差 $1/2$，$k = 11$ 给出小于 $0.001$ 的误差。所以 Deutsch–Jozsa 展示了 $Q_E \ll D$，而不是 $Q \ll R$。第一个相对有界错误随机化算法的指数分离，来自 Bernstein 与 Vazirani 的下一个问题的*递归*版本（超多项式）以及 Simon 算法（指数）。读到"量子加速"的说法时，请问一句：和哪个经典模型比？在哪些输入上？
:::

## Bernstein–Vazirani

现在设 $f(x) = s\cdot x$，其中 $s\in\{0,1\}^n$ 是隐藏串。经典上，在单位向量 $e_j$ 上查询 $f(e_j)$ 每次揭示一个比特 $s_j$，没有经典算法能做得更好，因为每次查询只返回一个比特，而秘密共有 $2^n$ 种可能。

::: theorem Bernstein–Vazirani {#thm-bv}
把 [[#alg-dj]] 的线路用于 $f(x) = s\cdot x$，一次查询后以概率 $1$ 输出 $s$。每个作 $q$ 次查询的经典算法（确定的或随机化的）对均匀随机的 $s$ 至多以 $2^{q-n}$ 的概率输出正确的 $s$；所以要确知需要 $n$ 次查询，要有一半的成功概率则至少需要 $n - 1$ 次。
:::

::: proof
*量子。*由 [[#lem-kickback]]，查询产生 $2^{-n/2}\sum_x(-1)^{s\cdot x}\ket x\ket-$，由 [[#eq-hadamard]] 这正是 $H^{\otimes n}\ket s\otimes\ket-$。由于 $H^{\otimes n}$ 是自身的逆，第 3 步留下 $\ket s\ket-$，测量给出 $s$。

*经典。*固定一个作 $q$ 次查询的确定性算法。它的行为是一棵深度为 $q$ 的二叉决策树（每次查询有两个可能的回答并决定下一次查询），至多 $2^q$ 个叶子各带一个输出。每个秘密 $s$ 到达一个叶子，算法只有在该叶子的输出恰为 $s$ 时对 $s$ 正确；一个叶子只有一个输出，所以至多对 $2^q$ 个秘密正确，占秘密总数 $2^{q-n}$ 的比例。随机化算法是确定性算法上的一个概率分布，所以它对均匀随机 $s$ 的成功概率是若干不超过 $2^{q-n}$ 的数的平均。
:::

::: example 手工计算两比特的 Bernstein–Vazirani {#ex-bv-hand}
对 $n = 2$、$s = 10$（即 $f(x_1x_2) = x_1$）追踪 Bernstein–Vazirani 线路，写出每一步之后的输入寄存器。
::: solution
第一次哈达玛变换后，输入寄存器为 $\tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$，目标位为 $\ket-$。查询把每一项乘以 $(-1)^{f(x)} = (-1)^{x_1}$：
$$
\tfrac12(\ket{00} + \ket{01} - \ket{10} - \ket{11}) = \tfrac{1}{\sqrt2}(\ket0 - \ket1)\otimes\tfrac{1}{\sqrt2}(\ket0 + \ket1) = \ket-\ket+ .
$$
最后的 $H\otimes H$ 把 $\ket-\ket+$ 映为 $\ket1\ket0$，测量给出 $10 = s$。一般地，相位图样 $(-1)^{s\cdot x}$ 是一个乘积状态 $\bigotimes_j H\ket{s_j}$——每个量子比特独立地按 $s_j$ 处于 $\ket+$ 或 $\ket-$——所以 Bernstein–Vazirani 根本不在输入寄存器中制造纠缠。它的威力来自一次查询把 $s$ 的全部 $n$ 个比特同时写入相对相位。
:::
:::

```python
from qsim import *

def bernstein_vazirani(f, n):
    s = zeros(n + 1); apply(s, X, n)
    for q in range(n + 1): apply(s, H, q)
    permute(s, lambda i: i ^ f(i >> 1))            # 对 U_f 查询一次
    for q in range(n): apply(s, H, q)
    p = probs(s)
    best = max(range(len(p)), key=p.__getitem__)
    return format(best >> 1, f"0{n}b"), round(p[best] + p[best ^ 1], 6)

secret = 0b101101
n = 6
dot = lambda x: bin(x & secret).count("1") % 2      # f(x) = s . x 模 2
s_hat, p = bernstein_vazirani(dot, n)
print(f"recovered s = {s_hat} with probability {p}")
```

```console
$ python3 bernstein_vazirani.py
recovered s = 101101 with probability 1.0
```

这里的差距只是 $1$ 比 $n$——多项式的。它的重要性在于结构：哈达玛变换把一个散布在全部 $2^n$ 个输入上的*相位图样* $(-1)^{s\cdot x}$ 变成一个*单独的基状态*。把问题与自身递归复合，Bernstein 与 Vazirani（1993，期刊版 1997）得到了第一个量子计算机以多项式时间解决、而有界错误经典计算机需要 $n^{\Omega(\log n)}$ 次查询的预言机问题（[[quantum-computing/quantum-complexity]]）。

::: quiz
在 Bernstein–Vazirani 线路中，预言机被错误地实现成了 $f(x) = s\cdot x \oplus 1$ 而非 $s\cdot x$。线路输出什么？
- [x] $s$，概率为 $1$
- [ ] $s$ 的按位取反
- [ ] 均匀随机的串
- [ ] $0^n$
::: solution
相位变为 $(-1)^{s\cdot x\oplus1} = -(-1)^{s\cdot x}$，即整个状态的全局符号，不可观测（[[quantum-computing/qubits#prop-global-phase]]）。输出仍然是 $s$。一般地，给 $f$ 加上一个常数从不改变这些算法的输出分布。
:::
:::

## Simon 算法

Simon 问题把串藏在函数的*碰撞*里，而不是藏在函数值里。

::: definition Simon 问题 {#def-simon}
给定 $f\colon\{0,1\}^n\to\{0,1\}^n$ 的预言机，承诺存在非零的 $s\in\{0,1\}^n$，使得对所有 $x \ne x'$，
$$
f(x) = f(x') \iff x' = x\oplus s ,
$$
求 $s$。也就是说，$f$ 是二对一的，每个值的两个原像都相差隐藏的**异或周期** $s$。
:::

图中展示了 $n = 3$、$s = 110$ 时的这样一个函数：输入成对出现，$\{x, x\oplus 110\}$ 有公共的函数值，而函数值本身完全不透露 $s$。

::: widget mapping
domain: 000; 001; 010; 011; 100; 101; 110; 111
codomain: a; b; c; d; e; f; g; h
map: 000>c; 110>c; 001>g; 111>g; 010>a; 100>a; 011>e; 101>e
editable: false
caption: 三比特上的一个 Simon 函数，隐藏周期 $s = 110$：每个输出值恰有两个原像 $x$ 与 $x\oplus110$。经典算法只有在碰巧查询了某一对的两个成员时才获得关于 $s$ 的信息，这需要约 $2^{n/2}$ 次查询；Simon 算法则采样满足 $y\cdot s = 0$ 的串 $y$——这里是 $y\in\{000, 001, 110, 111\}$。
:::

::: algorithm Simon 算法 {#alg-simon}
1. 重复下面的量子子程序，直到输出 $y^{(1)}, y^{(2)}, \dots$ 张成一个 $n - 1$ 维空间（用 $\F_2$ 上的高斯消元检查）：
   1. 制备 $\ket{0^n}\ket{0^n}$，对第一个寄存器施加 $H^{\otimes n}$。
   2. 施加 $U_f$，得到 $2^{-n/2}\sum_x\ket x\ket{f(x)}$。
   3. （可选）测量第二个寄存器。
   4. 对第一个寄存器施加 $H^{\otimes n}$，测量它，记录结果 $y$。
2. 在 $\F_2$ 上解线性方程组 $y^{(i)}\cdot s = 0$，求其唯一的非零解 $s$。
:::

::: lemma Simon 子程序的一次运行 {#lem-simon}
子程序的每次运行都在满足 $y\cdot s = 0$ 的 $2^{n-1}$ 个串中均匀随机地输出一个 $y$，且各次运行相互独立。
:::

::: proof
第 3 步测量第二个寄存器，得到某个值 $f(x_0)$，并由 [[quantum-computing/entanglement#eq-partial]] 把第一个寄存器留在 $\tfrac{1}{\sqrt2}(\ket{x_0} + \ket{x_0\oplus s})$，其中 $x_0$ 均匀随机。（若跳过第 3 步，由 [[quantum-computing/quantum-circuits#prop-deferred]]，或由不可传信——第二个寄存器之后不再被触碰——第一个寄存器的结果分布相同。）由 [[#lem-hadamard]]，$H^{\otimes n}$ 给出
$$
\frac{1}{\sqrt{2^{n+1}}}\sum_y\Bigl((-1)^{x_0\cdot y} + (-1)^{(x_0\oplus s)\cdot y}\Bigr)\ket y = \frac{1}{\sqrt{2^{n+1}}}\sum_y(-1)^{x_0\cdot y}\bigl(1 + (-1)^{s\cdot y}\bigr)\ket y ,
$$
用到 $(x_0\oplus s)\cdot y = x_0\cdot y\oplus s\cdot y$。当 $s\cdot y = 1$ 时 $\ket y$ 的振幅为 $0$；当 $s\cdot y = 0$ 时其模为 $2/\sqrt{2^{n+1}} = 2^{-(n-1)/2}$，所以与 $s$ 正交的 $2^{n-1}$ 个串每个的概率都是 $2^{-(n-1)}$，与 $x_0$ 是什么无关。每次运行都从头开始，所以相互独立。
:::

::: theorem Simon 算法使用 O(n) 次查询 {#thm-simon}
与 $s$ 正交的向量构成 $\F_2^n$ 的一个 $n - 1$ 维子空间 $s^\perp$，与整个 $s^\perp$ 正交的非零向量只有 $s$。因此 [[#alg-simon]] 输出正确的 $s$，所需查询数的期望小于 $n + 0.61$；且任意 $n - 1$ 次运行就已经以概率 $\prod_{k=1}^{n-1}(1 - 2^{-k}) > 0.288$ 成功。经典的后处理需要 $O(n^3)$ 次比特运算。
:::

::: proof
$s^\perp$ 是非零线性映射 $y\mapsto s\cdot y$ 的核，所以维数为 $n - 1$；与整个 $s^\perp$ 正交的向量构成 $n - (n-1) = 1$ 维空间，其中包含 $s$，故为 $\{0, s\}$。因此一旦样本张成 $s^\perp$，方程组 $y^{(i)}\cdot z = 0$ 的解恰为 $z \in \{0, s\}$。

由 [[#lem-simon]]，样本是 $s^\perp \cong \F_2^{n-1}$ 中独立均匀的元素。若目前的样本张成维数 $k < n - 1$ 的子空间（含 $2^k$ 个元素），下一个样本落在其外的概率为 $1 - 2^{k-(n-1)}$，所以把维数从 $k$ 提高到 $k + 1$ 所需样本数的期望是 $1/(1 - 2^{k-n+1})$。对 $k = 0, \dots, n-2$ 求和并令 $j = n - 1 - k$，期望总数为
$$
\sum_{j=1}^{n-1}\frac{1}{1 - 2^{-j}} = (n - 1) + \sum_{j=1}^{n-1}\frac{1}{2^j - 1} < (n - 1) + 1.607 .
$$
类似地，$n - 1$ 个样本相互独立的概率为 $\prod_{k=0}^{n-2}(1 - 2^{k-n+1}) = \prod_{j=1}^{n-1}(1 - 2^{-j})$，这个递减的乘积收敛于 $0.2887\ldots$。对 $n - 1$ 个 $n$ 比特向量作高斯消元需要 $O(n^3)$ 次比特运算。
:::

::: theorem Simon 问题的经典下界 {#thm-simon-classical}
任何以至少 $2/3$ 的概率找到 $s$ 的经典随机化算法都必须作 $\Omega(2^{n/2})$ 次查询。
:::

::: proof
（概要。）在 $2^n - 1$ 个非零串中均匀选取 $s$，再在周期为 $s$ 的 Simon 函数中均匀选取 $f$。考虑任何按 $x_1, x_2, \dots$ 查询的算法，并设前 $i$ 个不同查询之间尚未出现碰撞 $f(x_i) = f(x_j)$。那么算法所知道的全部就是 $s \notin \{x_j\oplus x_k : j < k \le i\}$，且回答互不相同；由对称性，$s$ 在其余至少 $2^n - 1 - \binom{i}{2}$ 个候选者上均匀分布。下一次查询 $x_{i+1}$ 产生碰撞，只有当 $s = x_{i+1}\oplus x_j$ 对某个 $j \le i$ 成立，该事件的概率至多为 $i/(2^n - 1 - \binom i2)$。所以 $q$ 次查询内出现任何碰撞的概率至多为 $\sum_{i<q} i/(2^n - q^2) \le q^2/(2^n - q^2)$。没有碰撞时，输出就是在至少 $2^n - 1 - q^2$ 个候选者中猜一个。当 $q \le 2^{n/2}/2$ 时，总成功概率至多为 $\tfrac{1/4}{3/4} + \tfrac{1}{2^n - 2^n/4 - 1}$，约为 $1/3$，低于 $2/3$。故 $q = \Omega(2^{n/2})$。固定随机化算法的随机性就归约到这一确定性情形，Yao 原理补足整个论证。与之匹配的经典算法查询随机输入直到出现碰撞，由生日界用 $O(2^{n/2})$ 次查询。
:::

::: example 手工运行 Simon 算法 {#ex-simon-hand}
对图中的函数（$n = 3$，$s = 110$），设子程序的两次运行返回 $y^{(1)} = 001$ 与 $y^{(2)} = 111$。求 $s$。
::: solution
方程 $y\cdot s = 0$ 即 $s_3 = 0$（来自 $001$，写 $s = s_1s_2s_3$）与 $s_1\oplus s_2\oplus s_3 = 0$（来自 $111$）。两个向量线性无关，所以它们张成 $s^\perp$，其维数为 $2$。代入 $s_3 = 0$ 得 $s_1 = s_2$，于是解为 $000$ 与 $110$；非零的那个是 $s = 110$。若第二次运行返回 $000$ 或又返回 $001$，就什么也没增加，需要再跑一次；由 [[#lem-simon]]，每次运行以概率 $1/4$ 返回四个串 $000, 001, 110, 111$ 之一。
:::
:::

::: example 在模拟器中运行 Simon 算法 {#ex-simon-sim}
对 $n = 4$、隐藏周期 $s = 1011$ 运行 [[#alg-simon]]，函数值随机改名以免泄露 $s$，并记录所需的查询数。
::: solution
寄存器共 $8$ 个量子比特（$256$ 个振幅）；输入 $x$ 是下标的高 $4$ 位。高斯消元维护一个以最高位为键的基；一个样本是"新的"，指它不在目前张成的空间里。

```python
from qsim import *

def simon_sample(f, n, rng):        # 量子线路跑一次：返回满足 y.s = 0 的 y
    s = zeros(2 * n)
    for q in range(n): apply(s, H, q)
    permute(s, lambda i: i ^ f(i >> n))              # |x>|z> -> |x>|z xor f(x)>
    for q in range(n): apply(s, H, q)
    for q in range(2 * n): measure(s, q, rng)        # 测量全部量子比特
    return max(range(len(s)), key=lambda i: abs(s[i])) >> n

def add_to_basis(basis, y):          # GF(2) 上的高斯消元，以最高位为键
    for b in sorted(basis, reverse=True):
        y = min(y, y ^ basis[b])
    if y: basis[y.bit_length() - 1] = y
    return bool(y)

def solve(basis, n):     # 与所有行正交的非零 s（暴力枚举；小 n 足够快）
    for cand in range(1, 2 ** n):
        if all(bin(cand & r).count("1") % 2 == 0 for r in basis.values()):
            return cand

n, secret = 4, 0b1011
labels = random.Random(0).sample(range(2 ** n), 2 ** n)  # 隐藏 f 的结构
f = lambda x: labels[min(x, x ^ secret)]                 # f(x) = f(x xor s)，二对一
rng = random.Random(42)
for trial in range(3):
    basis, queries = {}, 0
    while len(basis) < n - 1:
        y = simon_sample(f, n, rng); queries += 1
        new = add_to_basis(basis, y)
        print(f"  y = {y:04b}  (y.s = {bin(y & secret).count('1') % 2})" + ("  new" if new else ""))
    print(f"trial {trial}: s = {solve(basis, n):04b} after {queries} queries")
```

```console
$ python3 simon.py
  y = 0111  (y.s = 0)  new
  y = 1110  (y.s = 0)  new
  y = 1001  (y.s = 0)
  y = 0111  (y.s = 0)
  y = 0011  (y.s = 0)  new
trial 0: s = 1011 after 5 queries
  y = 0111  (y.s = 0)  new
  y = 0111  (y.s = 0)
  y = 1010  (y.s = 0)  new
  y = 0011  (y.s = 0)  new
trial 1: s = 1011 after 4 queries
  y = 0100  (y.s = 0)  new
  y = 0100  (y.s = 0)
  y = 1110  (y.s = 0)  new
  y = 0000  (y.s = 0)
  y = 1010  (y.s = 0)
  y = 0100  (y.s = 0)
  y = 0000  (y.s = 0)
  y = 0011  (y.s = 0)  new
trial 2: s = 1011 after 8 queries
```

每个样本都满足 $y\cdot s = 0$，正如 [[#lem-simon]] 所预言。有些样本被浪费了——$1001 = 0111\oplus1110$ 已经在张成的空间里，而 $0000$ 永远没用——三次试验分别用了 $5$、$4$、$8$ 次查询，对比期望值 $\sum_{j=1}^{3}1/(1 - 2^{-j}) = 2 + 4/3 + 8/7 \approx 4.5$。（`solve` 函数为了简短枚举了全部 $2^n$ 个候选者；$n$ 大时应把阶梯形回代，用时 $O(n^2)$。）经典算法在这里需要 $2^{n/2} = 4$ 次查询的量级，所以 $n = 4$ 时优势看不出来；$n = 100$ 时则约为 $100$ 次查询对约 $2^{50}$ 次。
:::
:::

图显示了样本多快张成 $s^\perp$。

::: widget plot
f: max(0, prod(1 - 2^(k - x), k, 0, n - 2))
x: 1, 30
y: 0, 1
sliders: n=10:2:24:1
labels: \Prob(x \text{ 个样本张成 } s^\perp)
caption: 从 $s^\perp$（维数 $n - 1$）中独立均匀取 $x$ 个样本能将其张成的概率，即 $\prod_{k=0}^{n-2}(1 - 2^{k-x})$，在整数 $x \ge n - 1$ 处读取。$x = n - 1$ 时约为 $0.29$，再过几个样本就升到接近 $1$，对一切 $n$ 都如此：Simon 算法需要 $n + O(1)$ 次查询，而经典算法约需 $2^{n/2}$ 次。
:::

## 干涉为何有帮助

三个算法都有同样的形状：哈达玛变换、一次查询、哈达玛变换、测量。第一层把振幅均匀铺在所有输入上，于是查询把 $f$ 的整张表写进相位（对 Simon 算法，是写进一个纠缠的寄存器）。第二层是群 $\F_2^n$ 上的一次**傅里叶变换**——该群的特征标恰是函数 $x\mapsto(-1)^{x\cdot y}$——它把振幅集中到描述 $f$ 的*全局*结构的 $y$ 上：它是常函数与否、它是哪个线性函数、它关于哪个子群是周期的。错误答案被压低，因为它们的贡献 $(-1)^{f(x) + x\cdot y}$ 在对 $x$ 求和时相互抵消，恰如第二个哈达玛门在 [[quantum-computing/qubits#ex-interference]] 中抵消了 $\ket1$。

这就是**傅里叶采样**，而且它可以推广。Simon 问题是**隐藏子群问题**的一个实例：给定群 $G$ 上在未知子群 $K$ 的每个陪集上取常值、不同陪集上取值互异的 $f$，求 $K$（这里 $G = \F_2^n$，$K = \{0, s\}$）。把 $\F_2^n$ 换成循环群 $\Z_N$、把哈达玛变换换成 $\Z_N$ 上的量子傅里叶变换，就得到 肖尔（Shor）的求阶算法，其中 $f(x) = a^x \bmod N$ 的周期等于 $a$ 的阶。隐藏子群问题对一切有限交换群（abelian）都能高效求解；但对某些非交换群——对称群（那将给出图同构问题）与二面体群（与格问题相关）——尚不知道高效的量子算法。

::: history
David Deutsch 1985 年的论文 "Quantum theory, the Church–Turing principle and the universal quantum computer" 定义了量子图灵机，并给出了第一个量子算法——Deutsch 问题的一个成功概率为 $1/2$ 的版本；一次查询即确定成功的版本出现在 Cleve、Ekert、Macchiavello 与 Mosca 1998 年的论文中。Deutsch 与 Richard Jozsa 于 1992 年发表了 $n$ 比特的问题。Ethan Bernstein 与 Umesh Vazirani 的 "Quantum complexity theory"（STOC 1993；SIAM Journal on Computing 1997）奠定了量子复杂性理论，定义了 $\mathsf{BQP}$，并给出递归傅里叶采样作为相对 $\mathsf{BPP}$ 的第一个超多项式预言机分离。Daniel Simon 的 "On the power of quantum computation"（FOCS 1994；SIAM Journal on Computing 1997）给出了相对有界错误经典算法的指数分离。Simon 的论文起初曾被一个会议拒稿；肖尔（Shor）此前看过它，数月内就把其中的思想从 $\F_2^n$ 推广到 $\Z_N$，得到了因数分解算法。
:::

## 后续内容

[[quantum-computing/shor]] 把哈达玛变换换成 $\Z_{2^t}$ 上的量子傅里叶变换，并利用受控模乘的相位反冲来估计特征值，把 Simon 算法的求周期思想变成多项式时间的因数分解算法。[[quantum-computing/grover]] 展示相位预言机 $O_f$ 的一种不同用法——反复反射——适用于毫无结构的问题，并证明那里的加速只是二次的。[[quantum-computing/quantum-complexity]] 把这些预言机分离安置到经典复杂性类之间，既说明它们证明了什么（相对预言机 $\mathsf{BQP}$ 不同于 $\mathsf{BPP}$），也说明它们没有证明什么（关于无预言机的 $\mathsf{P}$ 与 $\mathsf{BQP}$ 的任何东西）。

::: summary
- 在**查询模型**中，输入是一个黑箱函数，代价是查询次数；量子查询把 $U_f$ 作用在叠加态上，且下界能够被证明。
- **相位反冲**（[[#lem-kickback]]）把目标位置于 $\ket-$ 的 $U_f$ 变成相位预言机 $\ket x\mapsto(-1)^{f(x)}\ket x$；**哈达玛变换**（[[#lem-hadamard]]）把 $\ket x$ 映为 $2^{-n/2}\sum_y(-1)^{x\cdot y}\ket y$。
- **Deutsch–Jozsa** 用一次查询、以确定性判定常函数还是平衡函数（[[#thm-dj]]）；确定性经典算法需要 $2^{n-1} + 1$ 次，但随机化算法对小误差只需 $O(1)$ 次（[[#thm-dj-classical]]）。
- **Bernstein–Vazirani** 由 $f(x) = s\cdot x$ 用一次查询找出 $s$，经典则需 $n$ 次（[[#thm-bv]]）。
- **Simon 算法**均匀采样 $y\perp s$（[[#lem-simon]]），以期望 $n + O(1)$ 次查询找出异或周期（[[#thm-simon]]）；一切经典算法都需要 $\Omega(2^{n/2})$ 次（[[#thm-simon-classical]]）——一个指数分离。
- 三者都是**傅里叶采样**：在 $\F_2^n$ 上作傅里叶变换，让错误答案相消干涉。在 $\Z_N$ 上，同一思想给出 肖尔（Shor）算法。
:::

## 习题

::: exercise NOT 函数的 Deutsch 算法 {level=1}
对 $f(x) = 1\oplus x$ 追踪 Deutsch 算法（[[#ex-deutsch]]），写出每一步之后的状态。
::: solution
$\ket0\ket1 \to \ket+\ket-$。查询：$\tfrac{1}{\sqrt2}((-1)^{1}\ket0 + (-1)^{0}\ket1)\ket- = -\tfrac{1}{\sqrt2}(\ket0 - \ket1)\ket- = -\ket-\ket-$。第一个量子比特施加 $H$：$-\ket1\ket-$。测量给出 $1$：$f(0)\ne f(1)$，正确。全局符号 $-1$ 不可观测。
:::
:::

::: exercise 破坏承诺 {level=1 check="9/16"}
在 $n = 3$ 的 Deutsch–Jozsa 算法中，$f$ 恰在一个输入上为 $1$、其余输入为 $0$。测得 $000$ 的概率是多少？（填一个分数。）
::: solution
由 [[#thm-dj]]，$\ket{000}$ 的振幅是 $2^{-3}\sum_x(-1)^{f(x)} = (7 - 1)/8 = 3/4$，所以概率是 $9/16 = 0.5625$，与模拟打印的一致。
:::
:::

::: exercise 确定性查询 {level=1 check="513"}
解 $n = 10$ 的 Deutsch–Jozsa 问题，最优的确定性经典算法在最坏情形下需要多少次查询？（填一个数。）
::: solution
由 [[#thm-dj-classical]]，$2^{n-1} + 1 = 2^9 + 1 = 513$。若前 $512$ 个回答全部相同，函数仍可能既非常数也不平衡；第 $513$ 次查询定见分晓。
:::
:::

::: exercise 随机化查询 {level=1 check="21"}
[[#thm-dj-classical]] 的随机化算法查询 $k$ 个随机输入。保证出错概率至多 $2^{-20}$ 的最小的 $k$ 是多少？（填一个数。）
::: solution
需要 $2^{1-k} \le 2^{-20}$，即 $k \ge 21$。二十一次经典查询达到的错误率，远低于当前任何量子硬件运行一次查询的量子算法所能达到的水平。
:::
:::

::: exercise 等待一组基 {level=2 check="10/3"}
在 $n = 3$ 的 Simon 算法中，每次运行在 $4$ 元空间 $s^\perp$（包含 $000$）中均匀随机返回一个元素。直到样本张成 $s^\perp$，运行的期望次数是多少？（填一个分数。）
::: solution
需要维数 $2$。第一个有用的样本可以是任何非零向量：每次运行的概率为 $3/4$，期望 $4/3$ 次运行。然后需要一个在张成空间 $\{0, v\}$ 之外的向量：概率 $2/4$，期望 $2$ 次运行。总计 $4/3 + 2 = 10/3$，与 [[#thm-simon]] 的公式 $\sum_{j=1}^{2}1/(1 - 2^{-j}) = 2 + 4/3$ 相符。
:::
:::

::: exercise 仿射函数的 Bernstein–Vazirani {level=2}
证明若 $f(x) = s\cdot x\oplus b$，$b$ 是未知比特，Bernstein–Vazirani 线路仍然以确定性输出 $s$。总共多少次查询足以同时学到 $s$ 和 $b$？经典算法需要多少次？
::: solution
相位 $(-1)^{s\cdot x\oplus b} = (-1)^b(-1)^{s\cdot x}$ 与 $b = 0$ 的情形只差一个全局符号，所以输出仍是确定性的 $s$（如测验所示）。然后再用一次经典查询，$f(0^n) = b$，就得到 $b$；总共两次查询便能学会这个仿射函数，经典算法则需要 $n + 1$ 次（把 [[#thm-bv]] 的决策树论证用于 $2^{n+1}$ 个可能的函数可知，$n + 1$ 个值 $f(0), f(e_1), \dots, f(e_n)$ 既必要又充分）。
:::
:::

::: exercise 哈达玛引理的第二部分 {level=2}
用 [[#lem-hadamard]] 直接计算 $\bra{x'}H^{\otimes n}H^{\otimes n}\ket x$，证明 $H^{\otimes n}$ 是酉的；并证明 $H^{\otimes n}$ 把子空间 $V\subseteq\F_2^n$ 上的均匀叠加映为 $V^\perp$ 上的均匀叠加。
::: solution
因为 $H^{\otimes n}$ 是实对称的，$\bra{x'}H^{\otimes n}H^{\otimes n}\ket x = \sum_y\bra{x'}H^{\otimes n}\ket y\bra yH^{\otimes n}\ket x = 2^{-n}\sum_y(-1)^{(x\oplus x')\cdot y}$，由引理的第二部分，$x = x'$ 时为 $1$、否则为 $0$：$H^{\otimes n}H^{\otimes n} = I$。对维数为 $k$ 的子空间 $V$，$H^{\otimes n}\,2^{-k/2}\sum_{v\in V}\ket v = 2^{-(n+k)/2}\sum_y\bigl(\sum_{v\in V}(-1)^{v\cdot y}\bigr)\ket y$。内层和是特征标在群 $V$ 上的和：若对一切 $v\in V$ 有 $v\cdot y = 0$（即 $y\in V^\perp$）它等于 $\lvert V\rvert = 2^k$，否则等于 $0$（同样的配对论证限制在 $V$ 上）。于是结果是 $2^{(k-n)/2}\sum_{y\in V^\perp}\ket y$，在 $V^\perp$ 上均匀，后者含 $2^{n-k}$ 个元素。
:::
:::

::: exercise 隐藏子空间 {level=3}
推广 Simon 问题：$f\colon\F_2^n\to\{0,1\}^m$ 在未知 $k$ 维子空间 $K$ 的陪集 $x + K$ 上取常值，在不同陪集上取值不同。证明 Simon 子程序返回 $K^\perp$ 中的均匀随机元素，且 $O(n)$ 次查询能确定 $K$。
::: solution
查询并测量第二个寄存器之后，第一个寄存器处于 $2^{-k/2}\sum_{v\in K}\ket{x_0\oplus v}$，其中 $x_0$ 是随机的陪集代表元。施加 $H^{\otimes n}$，如上一题，得到 $2^{-(n+k)/2}\sum_y(-1)^{x_0\cdot y}\sum_{v\in K}(-1)^{v\cdot y}\ket y = 2^{(k-n)/2}\sum_{y\in K^\perp}(-1)^{x_0\cdot y}\ket y$：在 $K^\perp$ 上均匀，其维数为 $n - k$。如同 [[#thm-simon]]，期望 $n - k + O(1)$ 次运行就给出 $K^\perp$ 的一组基，而 $K = (K^\perp)^\perp$ 是所得线性方程组的解空间，由高斯消元算出。这就是 $\F_2^n$ 上的交换（abelian）隐藏子群问题。
:::
:::

::: exercise 随机化 Bernstein–Vazirani 的下界 {level=3}
证明对 Bernstein–Vazirani，每个对一切 $s$ 都至少以 $1/2$ 的概率成功的经典随机化算法必须作至少 $n - 1$ 次查询，并解释为什么量子算法用一次查询学不到关于 $f$ 的多于 $n$ 比特的信息。
::: solution
若一个算法对每个 $s$ 都至少以 $1/2$ 的概率成功，那么它对均匀随机的 $s$ 的平均成功率也至少为 $1/2$。由 [[#thm-bv]]，$q$ 次查询的平均成功概率至多为 $2^{q-n}$，故 $2^{q-n} \ge 1/2$，即 $q \ge n - 1$。关于第二部分：量子算法最后测量的是 $n$ 个量子比特（目标位处于 $\ket-$，什么也不携带），由 Holevo 界（[[quantum-computing/qubits]]），一个 $n$ 量子比特的状态至多给出 $n$ 比特信息。一次查询揭示了 $s$ 的全部 $n$ 个比特——已是最大可能——因为问题被安排成输出的每一个比特都有用；对一般的 $f$，一次查询不可能揭示它的 $2^n$ 比特真值表。
:::
:::
