RSA 的安全性建立在一个赌注上：把两个大素数相乘容易，而从它们的乘积中把它们找回则不然。目前已知的最好经典因数分解算法——广义数域筛法——分解 $N$ 所需时间约为 $\exp\bigl(c\,(\ln N)^{1/3}(\ln\ln N)^{2/3}\bigr)$——是次指数级的，但对今天使用的 2048 位模数来说毫无希望（[[cryptography/number-theory]]）。1994 年肖尔（Shor）证明，量子计算机可以在 $\log N$ 的多项式时间内分解 $N$，还能计算离散对数，从而把 RSA、Diffie–Hellman 与椭圆曲线密码一并攻破。迄今造出的任何量子计算机都离做到这一点所需的规模还差得远（见 [[quantum-computing/quantum-hardware]]），但这一算法一夜之间改变了整个领域：它首次表明，量子计算机能够解决一个真正重要、且被认为经典上困难的问题。

肖尔算法有三层，本章逐一建立。**量子傅里叶变换**（QFT）是 $\Z_{2^t}$ 上的傅里叶变换，只需 $O(t^2)$ 个门的线路即可算出。**相位估计**利用 QFT 与相位反冲，以 $t$ 位精度读出酉变换的特征值 $e^{2\pi i\varphi}$。**求阶**把相位估计用到模 $N$ 乘法上——其特征值编码了元素 $a$ 的阶 $r$——并用**连分数**恢复 $r$。最后，经典数论把因数分解归约到求阶。结尾我们在模拟器中运行整个算法，分解 $15$ 与 $21$。所需的数论——模运算、欧拉（Euler）定理、中国剩余定理、欧几里得算法——见 [[cryptography/number-theory]] 与[数学图谱：同余](/learn/maths/lesson.php?c=number-theory&l=congruences)；此处直接使用。

## 量子傅里叶变换

以下 $t$ 表示量子比特数，$M = 2^t$。我们把基状态 $\ket{x}$（$x\in\{0, \dots, M-1\}$）与二进制表示 $x = x_1x_2\cdots x_t$（$x_1$ 最高位，位于量子比特 $0$）视为同一，并把 $0.x_jx_{j+1}\cdots x_t$ 记作二进制小数 $x_j/2 + x_{j+1}/4 + \dots + x_t/2^{t-j+1}$。

::: definition 量子傅里叶变换 {#def-qft}
**$t$ 个量子比特上的量子傅里叶变换**是线性映射
$$
\mathrm{QFT}\ket x = \frac{1}{\sqrt M}\sum_{y=0}^{M-1}e^{2\pi i\,xy/M}\ket y, \qquad M = 2^t .
$$
在振幅上它就是离散傅里叶变换：$\sum_x\alpha_x\ket x\mapsto\sum_y\beta_y\ket y$，其中 $\beta_y = M^{-1/2}\sum_x e^{2\pi ixy/M}\alpha_x$。
:::

QFT 是酉的：$\ket x$ 与 $\ket{x'}$ 的像的内积是 $M^{-1}\sum_y e^{2\pi i(x - x')y/M}$，这是公比为 $\omega = e^{2\pi i(x-x')/M}$ 的几何级数，当 $x = x'$ 时为 $1$，否则为 $(1 - \omega^M)/(1 - \omega) = 0$。$t = 1$ 时它就是 $H$。它对算法的关键性质与 [[quantum-computing/first-algorithms]] 中相同：它把周期态变到集中在“周期的倒数”的倍数上的状态。

::: example 周期态的傅里叶变换 {#ex-qft-periodic}
求 $\tfrac12(\ket1 + \ket3 + \ket5 + \ket7)$ 在 $t = 3$ 个量子比特上的 QFT，该状态周期为 $2$、偏移为 $1$。
::: solution
$\ket y$ 的振幅为
$$
\frac{1}{2\sqrt8}\sum_{k=0}^{3}e^{2\pi i(1 + 2k)y/8} = \frac{e^{2\pi iy/8}}{2\sqrt8}\sum_{k=0}^{3}e^{2\pi iky/4}.
$$
几何级数的和当 $y\equiv 0 \pmod 4$ 时为 $4$，否则为 $0$。所以只有 $y = 0$ 与 $y = 4$ 存活，模长均为 $4/(2\sqrt8) = 1/\sqrt2$：结果是 $\tfrac{1}{\sqrt2}(\ket0 - \ket4)$，其中相位 $e^{2\pi i\cdot4/8} = -1$ 来自偏移。测量给出 $0$ 或 $4$，即 $M/\text{period} = 8/2$ 的倍数。偏移只影响相位，不影响结果分布——正是这一性质使 QFT 能够探测周期。
:::
:::

### QFT 的线路

定义涉及 $M^2 = 4^t$ 个矩阵元素，但基状态的 QFT 是乘积态，由此得到一个只需 $O(t^2)$ 个门的线路。

::: theorem QFT 的乘积形式 {#thm-qft-product}
对 $x = x_1x_2\cdots x_t$，
$$
\mathrm{QFT}\ket{x_1\cdots x_t} = \frac{1}{\sqrt{2^t}}\bigl(\ket0 + e^{2\pi i\,0.x_t}\ket1\bigr)\otimes\bigl(\ket0 + e^{2\pi i\,0.x_{t-1}x_t}\ket1\bigr)\otimes\cdots\otimes\bigl(\ket0 + e^{2\pi i\,0.x_1x_2\cdots x_t}\ket1\bigr).
$$ {#eq-qft-product}
:::

::: proof
写 $y = \sum_{l=1}^{t}y_l2^{t-l}$，于是 $y/M = \sum_l y_l2^{-l}$ 且 $e^{2\pi ixy/M} = \prod_{l=1}^t e^{2\pi i\,xy_l2^{-l}}$。对 $y$ 的求和按比特分解：
$$
\frac{1}{\sqrt M}\sum_y e^{2\pi ixy/M}\ket{y_1\cdots y_t} = \bigotimes_{l=1}^{t}\frac{1}{\sqrt2}\sum_{y_l\in\{0,1\}}e^{2\pi i\,xy_l2^{-l}}\ket{y_l} = \bigotimes_{l=1}^t\frac{\ket0 + e^{2\pi i\,x2^{-l}}\ket1}{\sqrt2}.
$$
最后，$x2^{-l} = (\text{整数}) + 0.x_{t-l+1}\cdots x_t$，因为比特 $x_1, \dots, x_{t-l}$ 只贡献整数，而 $e^{2\pi i\cdot\text{整数}} = 1$。$l = 1$ 时相位是 $0.x_t$，$l = t$ 时是 $0.x_1\cdots x_t$。
:::

现在把 [[#eq-qft-product]] 倒过来读。最后一个输出量子比特需要相位 $e^{2\pi i\,0.x_1x_2\cdots x_t}$：先对持有 $x_1$ 的量子比特施加 $H$，得到 $\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\,0.x_1}\ket1)$（因为 $e^{2\pi i\,0.x_1} = (-1)^{x_1}$）；再对 $k = 2, \dots, t$ 把相位门 $R_k = P(2\pi/2^k)$ 受控于持有 $x_k$ 的量子比特施加到它上，向二进制小数添加 $x_k/2^k$。然后对持有 $x_2$ 的量子比特同样处理，控制位为 $x_3, \dots, x_t$，依此类推。每个量子比特 $j$ 最终持有输出位置 $t - j + 1$ 对应的因子，所以最后反转量子比特的顺序——$\lfloor t/2\rfloor$ 个 SWAP 门——就把各因子排成 [[#eq-qft-product]] 的顺序。

```text
x1 ──H──R2──R3──R4─────────────────────────────×──────
        │   │   │                              │
x2 ─────●───┼───┼───H──R2──R3──────────────────┼──×───
            │   │      │   │                   │  │
x3 ─────────●───┼──────●───┼───H──R2───────────┼──×───
                │          │      │            │
x4 ─────────────●──────────●──────●───H────────×──────
```

::: theorem QFT 的门数 {#thm-qft-gates}
上面的线路用 $t$ 个哈达玛门、$t(t-1)/2$ 个受控相位门和 $\lfloor t/2\rfloor$ 个 SWAP 计算出 $t$ 个量子比特上的 QFT：除交换外共 $t(t+1)/2$ 个门，总计 $O(t^2)$ 个。
:::

::: proof
为证正确性，注意施加量子比特 $j$ 上的门时，作为其控制位的量子比特 $k > j$ 尚未被触动，仍处于基状态 $\ket{x_k}$，而控制位处于基状态的受控 $R_k$ 只是把量子比特 $j$ 的 $\ket1$ 分量乘以 $e^{2\pi i x_k/2^{k-j+1}}$。于是经过它的门之后，量子比特 $j$ 处于状态 $\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\,0.x_jx_{j+1}\cdots x_t}\ket1)$，之后的门再也不会作用于它（它们只以量子比特 $k > j' > j$ 为控制）。交换之后，各量子比特就处于 [[#eq-qft-product]] 的顺序；由线性性，该线路在所有状态上就是 QFT。计数：量子比特 $j$ 接受一个 $H$ 和 $t - j$ 个受控相位，所以总数为 $t + \sum_{j=1}^t(t - j) = t + t(t-1)/2 = t(t+1)/2$。
:::

实现部分给模拟器添加了 `qft.py`。它记录门列表，因此逆 QFT 就是同一列表反序并取相反相位；其自检对每个基状态把线路与 [[#def-qft]] 比较。

```python
from qsim import *

def qft(s, qubits, inverse=False):      # 对列出的量子比特做 QFT（最高位在前）
    t, sign, gates = len(qubits), (-1 if inverse else 1), []
    for j in range(t):
        gates.append(("H", qubits[j], None))
        for k in range(j + 1, t):       # 受控相位 2*pi/2^(k-j+1)，控制位 qubits[k]
            gates.append(("P", qubits[j], (qubits[k], 2 * math.pi / 2 ** (k - j + 1))))
    for j in range(t // 2):             # 用 SWAP 反转量子比特的顺序
        gates.append(("SWAP", qubits[j], qubits[t - 1 - j]))
    for name, q, extra in (reversed(gates) if inverse else gates):
        if name == "H": apply(s, H, q)
        elif name == "P": apply(s, P(sign * extra[1]), q, controls=(extra[0],))
        else:
            for c, tq in ((q, extra), (extra, q), (q, extra)): apply(s, X, tq, controls=(c,))
    return sum(1 for g in gates if g[0] != "SWAP"), sum(1 for g in gates if g[0] == "SWAP")

if __name__ == "__main__":              # 对全部输入与定义比对，t = 4
    t, worst = 4, 0.0
    for x in range(2 ** t):
        s = [0j] * 2 ** t; s[x] = 1
        counts = qft(s, list(range(t)))
        exact = [cmath.exp(2j * math.pi * x * y / 2 ** t) / 2 ** (t / 2) for y in range(2 ** t)]
        worst = max(worst, max(abs(a - b) for a, b in zip(s, exact)))
    print(f"t = {t}: {counts[0]} H/controlled-phase gates, {counts[1]} swaps; "
          f"max error {worst:.1e}")
```

```console
$ python3 qft.py
t = 4: 10 H/controlled-phase gates, 2 swaps; max error 3.8e-15
```

大 $k$ 的受控相位 $R_k$ 是角度极小（$2\pi/2^k$）的旋转。把 $k > m$（其中 $m = O(\log(t/\varepsilon))$）的全部丢弃，变换在算子范数下至多改变 $\varepsilon$（Coppersmith，1994），得到只需 $O(t\log t)$ 个门的**近似 QFT**；这在实践中很重要，因为微小旋转既难以从 $\{H, T\}$ 综合（[[quantum-computing/quantum-circuits#thm-sk]]），又会被噪声淹没。

::: warning QFT 并不比 FFT 更快地计算傅里叶变换
经典快速傅里叶变换对 $M$ 个数的向量需要 $\Theta(M\log M) = \Theta(t2^t)$ 次运算；QFT 只用 $O(t^2)$ 个门。但 QFT 的输出是一个振幅无法读取的量子态：测量返回一个 $y$，按概率 $\abs{\beta_y}^2$ 抽样得到，并毁掉其余部分。而且输入必须已经是量子态——把 $M$ 个任意数装入振幅一般至少需要 $M$ 量级的操作。QFT 只在算法内部有用——如肖尔算法——其中输入态由短线路产生，而输出只需抽样一次。
:::

## 相位估计

酉矩阵的每个特征值模为 $1$（[[quantum-computing/qubits#prop-unitary]]），所以可写成 $e^{2\pi i\varphi}$，$\varphi\in[0, 1)$ 为相位。相位估计要找的就是 $\varphi$。

::: algorithm 相位估计 {#alg-pe}
输入：受控-$U^{2^k}$（$k = 0, \dots, t-1$）的线路，以及第二个寄存器中的特征向量 $\ket u$，其中 $U\ket u = e^{2\pi i\varphi}\ket u$。
1. 制备 $\ket{0^t}\ket u$，并对 $t$ 个计数量子比特逐一施加 $H$。
2. 对 $j = 0, \dots, t-1$，把 $U^{2^{t-1-j}}$ 受控于计数量子比特 $j$ 施加到第二个寄存器。
3. 对计数寄存器施加逆 QFT，测量它，得到 $x$，输出 $\tilde\varphi = x/2^t$。
:::

第 2 步之后，由于计数量子比特 $j$ 在二进制值 $x$ 中的权重是 $2^{t-1-j}$，由相位反冲（[[quantum-computing/quantum-circuits]]）得
$$
\frac{1}{\sqrt M}\sum_{x=0}^{M-1}\ket x\otimes U^x\ket u = \Bigl(\frac{1}{\sqrt M}\sum_{x=0}^{M-1}e^{2\pi i\varphi x}\ket x\Bigr)\otimes\ket u .
$$ {#eq-pe-state}
若 $\varphi = x_0/M$（$x_0$ 为整数），由 [[#def-qft]] 这个计数态恰为 $\mathrm{QFT}\ket{x_0}$，逆 QFT 返回 $\ket{x_0}$：输出是精确的。一般情形：

::: theorem 相位估计的精度 {#thm-pe}
设 $\delta_x = \varphi - x/M$。[[#alg-pe]] 以概率
$$
p(x) = \Bigl\lvert\frac{1}{M}\sum_{k=0}^{M-1}e^{2\pi ik\delta_x}\Bigr\rvert^2 = \frac{\sin^2(\pi M\delta_x)}{M^2\sin^2(\pi\delta_x)} \quad(\delta_x\notin\Z),
$$
输出 $x$，且当 $\delta_x = 0$ 时 $p(x) = 1$。特别地，$\varphi$ 的最近 $t$ 位近似（满足 $\abs{\delta_x}\le 1/(2M)$ 的 $x$，按模 $1$ 计）至少以概率 $4/\pi^2 \approx 0.405$ 输出。
:::

::: proof
逆 QFT 把 $\sum_k e^{2\pi i\varphi k}\ket k/\sqrt M$ 变为在 $\ket x$ 处振幅为 $M^{-1}\sum_k e^{2\pi i\varphi k}e^{-2\pi ikx/M} = M^{-1}\sum_k e^{2\pi ik\delta_x}$ 的状态。当 $\delta_x\notin\Z$ 时这是公比 $e^{2\pi i\delta_x}\ne1$ 的几何级数，等于 $M^{-1}(1 - e^{2\pi iM\delta_x})/(1 - e^{2\pi i\delta_x})$；用 $\abs{1 - e^{i\theta}} = 2\abs{\sin(\theta/2)}$ 即得公式。至于下界，记 $u = M\abs{\delta_x}\le\tfrac12$（若 $u = 0$ 概率为 $1$）。分母用 $\abs{\sin\theta}\le\abs\theta$，分子用 $u\in[0, \tfrac12]$ 上的 $\sin(\pi u)\ge 2u$（正弦在该区间凹，且两端取等），
$$
p(x) \ge \frac{\sin^2(\pi u)}{M^2(\pi u/M)^2} = \frac{\sin^2(\pi u)}{\pi^2u^2} \ge \frac{4u^2}{\pi^2u^2} = \frac{4}{\pi^2}. \qquad
$$
:::

多添几个计数量子比特就能保证估计可靠：用 $t = s + \lceil\log_2(2 + 1/(2\epsilon))\rceil$ 个量子比特时，输出落在 $\varphi$ 的 $2^{-s}$ 以内的概率至少 $1 - \epsilon$（Nielsen–Chuang，§5.2.1）。下图显示了该分布。

::: widget plot
f: (sin(16*pi*(p - x/16)) / (16*sin(pi*(p - x/16))))^2
x: 0, 15.99
y: 0, 1
sliders: p=0.3:0:0.999:0.001
labels: p(x) \text{ 当 } t = 4
caption: 相位估计在 $t = 4$ 个计数量子比特下的输出分布，在整数 $x = 0, \dots, 15$ 处读取，随真实相位 $\varphi$（滑块 $p$）变化。当 $16\varphi$ 是整数时（试试 $p = 0.25$ 或 $0.3125$），全部概率集中在一个结果上。在两处正中间的 $p = 0.28125$，最近的两个结果各得约 $0.41$（随 $t$ 增大趋于 $4/\pi^2 \approx 0.405$）；那正是 [[#thm-pe]] 的最坏情形。
:::

::: example $T$ 门的相位估计 {#ex-pe-t}
对 $U = T$ 及其特征向量 $\ket1$ 施以 $t = 3$ 的 [[#alg-pe]]。输出是什么？
::: solution
$T\ket1 = e^{i\pi/4}\ket1 = e^{2\pi i\cdot(1/8)}\ket1$，故 $\varphi = 1/8 = 0.001_2$。由 [[#eq-pe-state]]，第 2 步后的计数寄存器是 $\tfrac{1}{\sqrt8}\sum_{x=0}^7 e^{2\pi ix/8}\ket x = \mathrm{QFT}\ket{1}$，所以逆 QFT 恰好给出 $\ket{001}$，输出为 $\tilde\varphi = 1/8$。第 2 步用到了受控-$T^4$（即受控-$Z$，作用在量子比特 $0$）、受控-$T^2$（即受控-$S$，量子比特 $1$）与受控-$T$（量子比特 $2$）。由反冲，它们把相位 $e^{2\pi i\cdot 4/8} = -1$、$e^{2\pi i\cdot2/8} = i$ 与 $e^{2\pi i/8}$ 加到三个计数量子比特的 $\ket1$ 分量上，这正是 $x = 001$ 时的 [[#eq-qft-product]]：$(\ket0 - \ket1)(\ket0 + i\ket1)(\ket0 + e^{i\pi/4}\ket1)/\sqrt8$。若改用 $U = T$、$t = 2$，相位 $1/8$ 恰在 $0$ 与 $1/4$ 正中间，这两个结果将各有概率 $\approx 0.43$。
:::
:::

## 求阶

::: definition 阶 {#def-order}
对满足 $\gcd(a, N) = 1$ 的整数 $N \ge 2$ 与 $a$，$a$ 模 $N$ 的**阶**是使 $a^r\equiv1\pmod N$ 成立的最小 $r \ge 1$。**求阶**问题：给定 $N$ 与 $a$，求 $r$。
:::

由欧拉定理，$r$ 整除 $\varphi(N) < N$。经典上没有已知的多项式时间求阶算法；对一般的 $N$，它与因数分解同样难。肖尔的想法是把 $r$ 当作周期来找：函数 $x\mapsto a^x\bmod N$ 是以 $r$ 为周期的周期函数。依照 Kitaev（1995），我们把它表述为相位估计。设 $L$ 为 $N$ 的位数（$2^{L-1}\le N < 2^L$），在 $L$ 个量子比特上定义酉变换
$$
U_a\ket y = \begin{cases}\ket{ay\bmod N} & 0\le y < N,\\ \ket y & N\le y < 2^L.\end{cases}
$$
它是基状态的置换，因为当 $\gcd(a, N) = 1$ 时，乘以 $a$ 是 $\Z_N$ 的双射。

::: lemma 模乘法的特征向量 {#lem-eigen}
对 $s = 0, 1, \dots, r - 1$ 令
$$
\ket{u_s} = \frac{1}{\sqrt r}\sum_{k=0}^{r-1}e^{-2\pi isk/r}\ket{a^k\bmod N}.
$$
则 $U_a\ket{u_s} = e^{2\pi is/r}\ket{u_s}$，且 $\frac{1}{\sqrt r}\sum_{s=0}^{r-1}\ket{u_s} = \ket1$。
:::

::: proof
值 $a^0, a^1, \dots, a^{r-1}\bmod N$ 两两不同（若 $a^j\equiv a^k$ 且 $0\le j<k<r$，则 $a^{k-j}\equiv1$ 且 $0<k-j<r$，与最小性矛盾），所以诸 $\ket{u_s}$ 是单位向量。施加 $U_a$ 把每个 $\ket{a^k}$ 移到 $\ket{a^{k+1}}$，其中 $a^r\equiv a^0$：
$$
U_a\ket{u_s} = \frac{1}{\sqrt r}\sum_{k=0}^{r-1}e^{-2\pi isk/r}\ket{a^{k+1}} = \frac{1}{\sqrt r}\sum_{k'=0}^{r-1}e^{-2\pi is(k'-1)/r}\ket{a^{k'}} = e^{2\pi is/r}\ket{u_s},
$$
这里重设指标 $k' = k + 1 \bmod r$（指数模 $r$ 不变）。至于和式，$\frac{1}{\sqrt r}\sum_s\ket{u_s} = \frac1r\sum_k\bigl(\sum_se^{-2\pi isk/r}\bigr)\ket{a^k}$，内层和式在 $k = 0$ 时为 $r$、在 $0 < k < r$ 时为 $0$。于是结果为 $\ket{a^0} = \ket1$。
:::

我们不知道 $r$，所以无法制备任何 $\ket{u_s}$。但也无须制备：$\ket1$ 是全部 $\ket{u_s}$ 的等权叠加，而相位估计是线性的。以 $U = U_a$、第二寄存器为 $\ket1$ 运行 [[#alg-pe]]，其输出分布与先等概率选取 $s\in\{0, \dots, r-1\}$、再估计 $\varphi = s/r$ 相同。受控幂 $U_a^{2^k}$ 就是乘以 $a^{2^k}\bmod N$，这些数由经典计算机用反复平方法预先算好；因此 $U_a$ 永远不必被施加 $2^k$ 次。

### 恢复 $r$：连分数

测量给出 $x$，其中 $x/M\approx s/r$。每个实数 $\xi$ 都有**连分数**展开 $\xi = [c_0; c_1, c_2, \dots] = c_0 + 1/(c_1 + 1/(c_2 + \cdots))$，它由反复取整数部分并对余数取倒数得到；$\xi$ 为有理数时它有限，且由欧几里得算法算出。截断它得到**渐近分数** $h_k/q_k = [c_0; c_1, \dots, c_k]$，它们在很强的意义上是 $\xi$ 的最佳有理逼近：

::: theorem 连分数的勒让德（Legendre）定理 {#thm-cf}
若 $s$ 与 $r \ge 1$ 是满足 $\gcd(s, r) = 1$ 的整数且
$$
\Bigl\lvert\frac sr - \xi\Bigr\rvert < \frac{1}{2r^2},
$$
则 $s/r$ 是 $\xi$ 的连分数的一个渐近分数。
:::

我们不加证明地使用这一定理（见 Hardy 与 Wright 的《数论导引》（*An Introduction to the Theory of Numbers*），定理 184）。取 $t = 2L$ 个计数量子比特时，$M = 2^{2L} > N^2 > r^2$，所以只要相位估计返回最近的那个 $x$（概率 $\ge 4/\pi^2$），就有 $\abs{x/M - s/r}\le 1/(2M) < 1/(2r^2)$。$x/M$ 的连分数共有 $O(L)$ 个渐近分数，其中必有既约形式的 $s/r$；又由于渐近分数的分母递增，我们可以逐个检验分母 $q < N$，看是否 $a^q\equiv1\pmod N$。若 $\gcd(s, r) = 1$，找到的分母就是 $r$ 本身。否则渐近分数是既约的 $s'/r'$，其中 $r'$ 是 $r$ 的真因子，检验会失败，因为 $r$ 是使 $a^r\equiv1$ 的最小指数；重复实验，或把两次运行合起来、取它们分母的最小公倍数，就能以高概率恢复 $r$。随机的 $s$ 与 $r$ 互素的概率为 $\varphi(r)/r = \Omega(1/\log\log r)$，而借助最小公倍数技巧，常数次运行就够。

::: example 手工计算连分数 {#ex-cf}
对 $N = 21$、$a = 2$、$M = 2^{10}$ 的相位估计返回 $x = 171$。把 $171/1024$ 展开为连分数，列出其渐近分数，并找出 [[#thm-cf]] 所保证的那一个。
::: solution
对 $(171, 1024)$ 做欧几里得算法：$1024 = 5\cdot171 + 169$，$171 = 1\cdot169 + 2$，$169 = 84\cdot2 + 1$，$2 = 2\cdot1$。于是
$$
\frac{171}{1024} = [0; 5, 1, 84, 2] = 0 + \cfrac{1}{5 + \cfrac{1}{1 + \cfrac{1}{84 + \cfrac12}}}.
$$
渐近分数为 $[0] = 0$、$[0; 5] = 1/5$、$[0; 5, 1] = 1/(5 + 1) = 1/6$、$[0; 5, 1, 84] = 85/509$，最后是 $171/1024$。阶为 $r = 6$，抽到的 $s = 1$：$\abs{1/6 - 171/1024} = \abs{1024 - 1026}/6144 \approx 3.3\times10^{-4}$，远低于 $1/(2\cdot 6^2) \approx 0.0139$，所以 [[#thm-cf]] 保证 $1/6$ 会出现——它确实出现了。按顺序检验分母，$2^5 = 32 \equiv 11 \not\equiv 1$，而 $2^6 = 64\equiv 1 \pmod{21}$，故 $r = 6$；更大的分母 $509$ 与 $1024$ 超过 $N$，从不尝试。同一计算作为第二次运行出现在 [[#ex-shor-sim]] 中。
:::
:::

::: theorem 求阶 {#thm-order}
对 $L$ 位模数 $N$ 的求阶，可在 $O(L)$ 个量子比特上由 $O(L^3)$ 个门的量子线路以常数成功概率解决，外加 $O(L^3)$ 的经典后处理。
:::

::: proof
（代价。）计数寄存器有 $t = 2L$ 个量子比特；对其施加 QFT 由 [[#thm-qft-gates]] 需 $O(L^2)$ 个门。主要代价是 $2L$ 次由预计算常数 $a^{2^k}\bmod N$ 作受控模乘。$L$ 位寄存器乘以常数（模 $N$）可由 $O(L)$ 次、每次 $O(L)$ 个门的模加可逆地构建（[[quantum-computing/quantum-circuits#thm-oracle]]），即 $O(L^2)$ 个门；连同工作空间的反算，使用 $O(L)$ 个辅助量子比特。总计：$2L\cdot O(L^2) = O(L^3)$ 个门。$O(L)$ 位有理数的连分数展开有 $O(L)$ 项，每次检验 $a^q\bmod N$ 需 $O(L^3)$ 次位运算，若逐步计算渐近分数则更少。正确性与成功概率如上文所论证，用到 [[#thm-pe]]、[[#lem-eigen]] 与 [[#thm-cf]]。
:::

更快的乘法算法可把门数降到 $O(L^2\log L\log\log L)$，代价是更大的常数；对真实机器要紧的是常数，这将在 [[quantum-computing/quantum-hardware]] 中研究。

::: quiz
对 $N = 21$、$a = 2$（阶 $r = 6$）、$t = 10$ 个计数量子比特的求阶返回 $x = 683$，于是 $x/1024 \approx 0.66699$，其渐近分数为 $0, 1, 2/3, 683/1024$。发生了什么？
- [ ] 这次运行失败了：$x$ 应当接近 $1/6$ 的倍数，而 $0.667$ 不是
- [x] 这次抽样抽到了 $s = 4$；由于 $\gcd(4, 6) = 2$，渐近分数 $2/3$ 只给出 $r$ 的一个因子
- [ ] $2$ 模 $21$ 的阶是 $3$
- [ ] 连分数只有当 $x/M$ 恰为 $s/r$ 时才管用
::: solution
$4/6 = 2/3 \approx 0.6667$ 与 $0.66699$ 的距离在 $1/(2\cdot 6^2)$ 之内，所以由 [[#thm-cf]] 它以渐近分数的形式出现——但是既约形式。分母 $3$ 通不过检验（$2^3 = 8 \not\equiv 1 \pmod{21}$），于是再跑一次；抽到与 $6$ 互素的 $s = 1$ 或 $5$ 的运行，或把 $3$ 与另一次运行得到的分母 $2$ 取最小公倍数，就得到 $r = 6$。下面的模拟中正发生了这样的事。
:::
:::

## 从求阶到因数分解

因数分解通过经典数论归约到求阶。先看简单情形：若 $N$ 为偶数，输出 $2$；若 $N = p^k$ 是素数幂，对 $k\le\log_2 N$ 计算整数 $k$ 次根即可找出。两者都是经典的多项式时间做法。

::: proposition $1$ 的非平凡平方根给出因子 {#prop-sqrt}
若 $u^2\equiv1\pmod N$ 但 $u\not\equiv\pm1\pmod N$，则 $\gcd(u - 1, N)$ 与 $\gcd(u + 1, N)$ 是 $N$ 的非平凡因子。
:::

::: proof
$N$ 整除 $u^2 - 1 = (u-1)(u+1)$，却两个因子都不整除（因 $u\not\equiv\pm1$）。若 $\gcd(u - 1, N) = 1$，则 $N$ 必整除 $u + 1$（对 $N$ 的素因子用欧几里得引理：整除 $N$ 的每个素数幂都整除该乘积，又与 $u - 1$ 无公因子，故整除 $u + 1$）；矛盾。若其为 $N$，则 $N$ 整除 $u - 1$；矛盾。所以 $1 < \gcd(u - 1, N) < N$，对 $u + 1$ 同理。
:::

::: theorem 因数分解归约到求阶 {#thm-reduction}
设 $N$ 为奇数、不是素数幂，并从 $\{2, \dots, N-1\}$ 中均匀选取 $a$。若 $\gcd(a, N) > 1$，就得到了一个因子。否则设 $r$ 为 $a$ 的阶；若 $r$ 为偶数且 $a^{r/2}\not\equiv -1\pmod N$，则 $u = a^{r/2}\bmod N$ 满足 [[#prop-sqrt]]，从而给出一个因子。对 $\Z_N^*$ 中均匀的 $a$，此事至少以概率 $1 - 2^{-(m-1)} \ge 1/2$ 发生，其中 $m \ge 2$ 是 $N$ 的不同素因子的个数。
:::

::: proof
第一点是直接验证：$u^2 = a^r\equiv1$；$u\not\equiv1$ 是因为 $r/2 < r$ 而 $r$ 极小；$u\not\equiv -1$ 由假设。概率界用到中国剩余定理：$\Z_N^*\cong\Z_{p_1^{e_1}}^*\times\dots\times\Z_{p_m^{e_m}}^*$，阶 $r$ 是各模 $p_i^{e_i}$ 的阶 $r_i$ 的最小公倍数，而尝试失败恰好发生在所有 $r_i$ 被同一个 $2$ 的幂整除之时（Nielsen–Chuang，定理 5.3，以及 [[cryptography/post-quantum]]）。由于每个 $\Z_{p_i^{e_i}}^*$ 都是偶数阶循环群，$2$ 在 $r_i$ 中的幂次取某个给定值的概率至多 $1/2$，且由中国剩余定理各 $i$ 独立，所以全部 $m$ 个相同的概率至多 $2^{-(m-1)}$。
:::

::: algorithm 肖尔因数分解算法 {#alg-shor}
输入：$L$ 位的奇合数 $N$，不是素数幂。
1. 从 $\{2, \dots, N - 1\}$ 中均匀选取 $a$。若 $d = \gcd(a, N) > 1$，输出 $d$。
2. 用 $t = 2L$ 个计数量子比特与连分数的量子求阶算法求 $a$ 模 $N$ 的阶 $r$（[[#thm-order]]）。
3. 若 $r$ 为奇数或 $a^{r/2}\equiv-1\pmod N$，回到第 1 步。否则输出 $\gcd(a^{r/2} - 1, N)$。
:::

由 [[#thm-order]] 与 [[#thm-reduction]]，期望重复次数为常数，总代价为 $O(L^3)$ 个量子门加上多项式的经典计算。下图显示量子计算机要探测的那个周期序列。

::: widget modular
n: 21
mode: powers
a: 2
caption: $a$ 模 $21$ 的幂。$a = 2$ 时，序列 $1, 2, 4, 8, 16, 11, 1, \dots$ 的周期为 $6$，即阶；$2^3 = 8$ 是除 $\pm1$ 以外 $1$ 的一个平方根，而 $\gcd(7, 21) = 7$、$\gcd(9, 21) = 3$ 就是所求的因子。试试 $a = 5$（阶 $6$，$5^3 \equiv 20 \equiv -1$：失败）与 $a = 4$（阶 $3$，奇数：也失败）。
:::

::: example 在模拟器中对 $15$ 与 $21$ 做因数分解 {#ex-shor-sim}
在态向量模拟器中对 $N = 15$（$a = 7$）与 $N = 21$（$a = 2$）运行肖尔算法，取 $t = 2L$ 个计数量子比特。
::: solution
线路对每次受控乘以 $a^{2^{t-1-j}}\bmod N$ 用 `permute` 实现：当计数量子比特 $j$ 为 $1$ 且工作寄存器持有 $y < N$ 时施加；计数寄存器用 `qft(…, inverse=True)`。它不逐量子比特坍缩状态，而是计算计数寄存器的分布并从中抽样，两者等价。$x/2^t$ 的连分数用 Python 的 `Fraction` 精确计算。

```python
from qsim import *
from qft import qft
from fractions import Fraction
from math import gcd

def order_finding_circuit(a, N, t, rng):
    n = N.bit_length()                       # 工作寄存器：n 个量子比特，存放 y < 2^n
    s = [0j] * 2 ** (t + n); s[1] = 1        # 计数寄存器 |0>^t，工作寄存器 |1>
    for q in range(t): apply(s, H, q)
    for j in range(t):                       # 计数量子比特 j 控制 U^(2^(t-1-j))
        m, c = pow(a, 2 ** (t - 1 - j), N), 1 << (t + n - 1 - j)
        def f(i, m=m, c=c):
            hi, y = i >> n, i & ((1 << n) - 1)
            if i & c and y < N: y = m * y % N    # 受控乘以 a^(2^k) mod N
            return (hi << n) | y
        permute(s, f)
    qft(s, list(range(t)), inverse=True)
    p = [sum(abs(s[(x << n) | y]) ** 2 for y in range(1 << n)) for x in range(1 << t)]
    return rng.choices(range(1 << t), weights=p)[0], p

def order_from_sample(x, t, a, N):           # 计算 x / 2^t 的连分数
    cf = []; fr = Fraction(x, 2 ** t)
    while True:
        cf.append(fr.numerator // fr.denominator); rest = fr - cf[-1]
        if rest == 0: break
        fr = 1 / rest
    for k in range(1, len(cf) + 1):          # 渐近分数 h_k / q_k
        c = Fraction(cf[k - 1])
        for term in reversed(cf[:k - 1]): c = term + 1 / c
        if c.denominator < N and pow(a, c.denominator, N) == 1:
            return cf, c.denominator
    return cf, None
```

```python
from shor import *

def factor(N, a, rng):
    t = 2 * N.bit_length()
    print(f"N = {N}, a = {a}: {t} counting qubits, {t + N.bit_length()} qubits in all")
    while True:
        x, p = order_finding_circuit(a, N, t, rng)
        cf, r = order_from_sample(x, t, a, N)
        print(f"  measured x = {x:4} (x/2^t = {x / 2 ** t:.4f}), "
              f"continued fraction {cf}, order found: {r}")
        if r and r % 2 == 0 and pow(a, r // 2, N) != N - 1:
            u = pow(a, r // 2, N)
            print(f"  a^(r/2) mod N = {u}: gcd({u - 1}, {N}) = {gcd(u - 1, N)}, "
                  f"gcd({u + 1}, {N}) = {gcd(u + 1, N)}")
            likely = [k for k in range(len(p)) if p[k] > 0.02]
            print("  outcomes with P > 0.02:", ", ".join(f"{k}: {p[k]:.3f}" for k in likely))
            return

rng = random.Random(1)
factor(15, 7, rng)
factor(21, 2, rng)
```

```console
$ python3 factor.py
N = 15, a = 7: 8 counting qubits, 12 qubits in all
  measured x =    0 (x/2^t = 0.0000), continued fraction [0], order found: None
  measured x =  192 (x/2^t = 0.7500), continued fraction [0, 1, 3], order found: 4
  a^(r/2) mod N = 4: gcd(3, 15) = 3, gcd(5, 15) = 5
  outcomes with P > 0.02: 0: 0.250, 64: 0.250, 128: 0.250, 192: 0.250
N = 21, a = 2: 10 counting qubits, 15 qubits in all
  measured x =  683 (x/2^t = 0.6670), continued fraction [0, 1, 2, 341], order found: None
  measured x =  171 (x/2^t = 0.1670), continued fraction [0, 5, 1, 84, 2], order found: 6
  a^(r/2) mod N = 8: gcd(7, 21) = 7, gcd(9, 21) = 3
  outcomes with P > 0.02: 0: 0.167, 170: 0.028, 171: 0.114, 341: 0.114, 342: 0.028, 512: 0.167, 682: 0.028, 683: 0.114, 853: 0.114, 854: 0.028
```

对 $N = 15$，$r = 4$ 整除 $M = 256$，所以相位估计是精确的：结果是 $x = 256s/4$（$s = 0, 1, 2, 3$），各以概率 $1/4$。第一次运行给出 $s = 0$，它不携带任何信息。第二次给出 $x/M = 3/4$，渐近分数 $0, 1, 3/4$；分母 $4$ 通过检验 $7^4 = 2401 \equiv 1 \pmod{15}$。于是 $7^2 = 49\equiv4$，而 $\gcd(3, 15) = 3$、$\gcd(5, 15) = 5$。

对 $N = 21$，$r = 6$ 不整除 $1024$，所以 $1024s/6 \approx 0, 170.7, 341.3, 512, 682.7, 853.3$ 处的峰散布到相邻整数上；$s = 1, 2, 4, 5$ 时最近的整数得概率 $0.114$、次近的得 $0.028$，而 $s = 0, 3$ 是精确的（$0.167 = 1/6$）。第一次运行抽到 $s = 4$，给出既约分数 $2/3$，正如测验中那样；第二次给出 $171/1024$，其渐近分数 $0, 1/5, 1/6, \dots$ 给出 $r = 6$。于是 $2^3 = 8$，而 $\gcd(7, 21) = 7$、$\gcd(9, 21) = 3$。模拟用了 $15$ 个量子比特与 $2^{15}$ 个振幅；同样的线路用于 2048 位模数将需要数千个纠错量子比特，对其作经典模拟则完全不可能。
:::
:::

::: warning “量子计算机已经分解了 15、21 这样的数”——但要说清楚
肖尔算法首次演示于 2001 年，用七量子比特液态 NMR 装置分解了 $N = 15$（Vandersypen 与合作者）；$N = 21$ 于 2012 年用光子量子比特分解（Martín-López 与合作者）。这些实验以及后来大多数实验用的是**编译**线路，借助了对答案（例如阶 $r$）的了解加以简化，因此它们演示的是量子控制而非因数分解。在量子硬件上分解大得多的数的声称用的是别的方法（退火或变分优化），其标度未知或很差，不构成对 RSA 的威胁。截至 2026 年，还没有任何量子计算机以能分解一个手工无法分解的数的方式运行过肖尔算法。
:::

### 离散对数与其他周期

同一方法可以计算**离散对数**：在 $q$ 阶循环群中给定 $g$ 与 $h = g^\ell$，函数 $f(x_1, x_2) = g^{x_1}h^{-x_2}$（定义在 $\Z_q\times\Z_q$ 上）在 $(\ell, 1)$ 生成的子群的陪集上取常值，二维 QFT 与相位估计便能揭示 $\ell$。由于该方法只需要高效地进行群运算，它对有限域乘法群和椭圆曲线群都适用，这正是肖尔算法能同时攻破 Diffie–Hellman、DSA、ECDSA 与 EdDSA 以及 RSA 的原因（[[cryptography/post-quantum]]）。这些都是 [[quantum-computing/first-algorithms]] 中**阿贝尔隐藏子群问题**的特例。

::: history
肖尔于 1994 年 11 月在 FOCS 上做了报告 "Algorithms for quantum computation: discrete logarithms and factoring"；期刊版 "Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer" 发表于 1997 年的 *SIAM Journal on Computing*。Don Coppersmith 在 1994 年的一份 IBM 报告中描述了近似 QFT。Alexei Kitaev 1995 年的预印本 "Quantum measurements and the abelian stabilizer problem" 提出了相位估计并解决了一般的阿贝尔稳定子问题；此处经由相位估计讲求阶的方式遵循 Cleve、Ekert、Macchiavello 与 Mosca（1998）。首个实验演示于 2001 年分解了 15（Vandersypen、Steffen、Breyta、Yannoni、Sherwood 与 Chuang，*Nature*）。肖尔 1998 年获内万林纳奖（Nevanlinna Prize），并共同获得 2023 年基础物理突破奖。
:::

## 后续内容

[[quantum-computing/quantum-complexity]] 把肖尔算法用作 $\mathsf{BQP}$ 大于 $\mathsf{BPP}$ 的主要证据，并解释为何它并不暗示量子计算机能解 $\mathsf{NP}$ 完全问题。[[quantum-computing/grover]] 给出另一个著名算法，其加速虽只有平方级，却适用于任何搜索问题。在密码学规模上运行肖尔算法需要带纠错的数百万物理量子比特，[[quantum-computing/quantum-hardware]] 中作了估计；密码学家的应对——基于格与哈希函数的新公钥密码方案——是 [[cryptography/post-quantum]] 的主题。相位估计本身是化学与材料量子算法的核心，那里 $U = e^{-iHt}$，$H$ 是物理哈密顿量，相位就是能级。

::: summary
- $t$ 个量子比特上的 **QFT** 是 $2^t$ 个振幅的离散傅里叶变换；其乘积形式（[[#thm-qft-product]]）给出一个由 $t(t+1)/2$ 个哈达玛门与受控相位门外加 $\lfloor t/2\rfloor$ 个 SWAP 组成的线路（[[#thm-qft-gates]]）。
- QFT 的输出无法读出；它只在只需要傅里叶谱一个样本的算法内部才有用。
- **相位估计**（[[#alg-pe]]）用受控 $U^{2^k}$ 与逆 QFT 把 $U$ 的特征相位 $\varphi$ 求出 $t$ 位；当 $2^t\varphi$ 为整数时它是精确的，否则以概率 $\ge 4/\pi^2$ 输出最近值（[[#thm-pe]]）。
- **求阶**：$y\mapsto ay\bmod N$ 的特征值是 $e^{2\pi is/r}$，而 $\ket1$ 是全部特征向量的均匀叠加（[[#lem-eigen]]）；用 $t = 2L$ 个量子比特时，**连分数**恢复 $s/r$（[[#thm-cf]]），总计 $O(L^3)$ 个门（[[#thm-order]]）。
- **因数分解**归约到求阶：偶阶 $r$ 且 $a^{r/2}\not\equiv-1$ 给出 $1$ 的非平凡平方根，从而由 gcd 给出一个因子（[[#prop-sqrt]]、[[#thm-reduction]]）。
- 模拟器分解了 $15$ 与 $21$；真实硬件上运行过的只是编译过的玩具版本，具有密码学意义的因数分解需要大规模纠错。
:::

## 习题

::: exercise 数 QFT 的门 {level=1 check="55"}
$t = 10$ 个量子比特的 QFT 线路用多少个哈达玛门与受控相位门（不含 SWAP）？（填一个数。）
::: solution
由 [[#thm-qft-gates]]，$t(t+1)/2 = 10\cdot11/2 = 55$：十个哈达玛门与 $45$ 个受控相位门，另有 $5$ 个 SWAP。只保留 $R_2, R_3, R_4$ 的近似 QFT 让量子比特 $j$ 至多有 $\min(t - j, 3)$ 个受控相位：$j = 1, \dots, 7$ 各 $3$ 个，接着 $2$、$1$、$0$ 个，所以共 $10 + 21 + 3 = 34$ 个门。
:::
:::

::: exercise 两量子比特的 QFT {level=1}
写出两量子比特 QFT 的 $4\times4$ 矩阵，并验证其列标准正交。
::: solution
记 $\omega = e^{2\pi i/4} = i$，第 $y$ 行第 $x$ 列的元素是 $\tfrac12 i^{xy}$：
$$
\mathrm{QFT}_4 = \frac12\begin{pmatrix}1 & 1 & 1 & 1\\ 1 & i & -1 & -i\\ 1 & -1 & 1 & -1\\ 1 & -i & -1 & i\end{pmatrix}.
$$
每列有四个模为 $1/2$ 的元素，故范数为 $1$；第 $x$ 与 $x'$ 列的内积是 $\tfrac14\sum_y i^{(x'-x)y}$，即某个 $\ne 1$ 的四次单位根的四次幂之和，等于 $0$。
:::
:::

::: exercise 一个阶 {level=1 check="6"}
求 $11$ 模 $21$ 的阶，并用它分解 $21$。（填阶。）
::: solution
$11^2 = 121 = 5\cdot21 + 16\equiv16$；$11^3\equiv16\cdot11 = 176 = 8\cdot21 + 8\equiv8$；$11^6\equiv 8^2 = 64\equiv1$；且 $11^1, 11^2 \not\equiv1$，而 $r$ 必须整除 $\varphi(21) = 12$，又 $11^4\equiv 8\cdot 11 = 88 \equiv 4$，所以 $r = 6$。于是 $u = 11^3\equiv8\not\equiv\pm1$，得 $\gcd(7, 21) = 7$ 与 $\gcd(9, 21) = 3$。
:::
:::

::: exercise 读一个测量结果 {level=2 check="6"}
对 $N = 21$、$a = 2$、$t = 10$ 的求阶返回 $x = 853$。计算 $853/1024$ 的连分数及其渐近分数，并求出阶。（填阶。）
::: solution
$853/1024 = 0 + 1/(1024/853)$；$1024/853 = 1 + 171/853$；$853/171 = 4 + 169/171$；$171/169 = 1 + 2/169$；$169/2 = 84 + 1/2$；$2 = 2$。所以 $853/1024 = [0; 1, 4, 1, 84, 2]$。渐近分数为 $0$、$1$、$4/5$、$5/6$、$\dots$ 分母 $5$ 通不过检验（$2^5 = 32\equiv 11$），$6$ 通过（$2^6 = 64\equiv1$），所以 $r = 6$；事实上 $5/6 \approx 0.8333$ 与 $853/1024 \approx 0.8330$ 相差 $3.3\times10^{-4} < 1/72$。
:::
:::

::: exercise 手工分解 35 {level=2 check="12"}
求 $2$ 模 $35$ 的阶，并用 [[#thm-reduction]] 分解 $35$。[[#alg-shor]] 会用多少个计数量子比特？（填阶。）
::: solution
$2$ 模 $35$ 的幂：$2, 4, 8, 16, 32, 29, 23, 11, 22, 9, 18, 1$，所以 $r = 12$。于是 $u = 2^6 \equiv 29\not\equiv\pm1$，且 $\gcd(28, 35) = 7$、$\gcd(30, 35) = 5$。由于 $35 < 64 = 2^6$，$L = 6$，$t = 2L = 12$ 个计数量子比特，外加 $6$ 个工作量子比特：共 $18$ 个量子比特。我们的模拟器几秒就能跑完；一次运行（`factor(35, 2, random.Random(5))`）测得 $x = 2389$，而 $2389/4096 \approx 0.5833 \approx 7/12$ 直接给出 $r = 12$。
:::
:::

::: exercise QFT 的酉性（由乘积形式） {level=2}
由 [[#eq-qft-product]] 证明 QFT 把计算基映为标准正交基，并证明逆 QFT 可由反序线路并把每个受控相位取反而得到。
::: solution
两个像 $\mathrm{QFT}\ket x$、$\mathrm{QFT}\ket{x'}$ 都是乘积态，所以它们的内积是 $\prod_{l}\tfrac12(1 + e^{2\pi i(x' - x)2^{-l}})$。若 $x\ne x'$，设 $2^{l_0 - 1}$ 是 $x$ 与 $x'$ 不同的最低 $2$ 的幂，即 $x' - x = 2^{l_0-1}\cdot\text{奇数}$；则 $l = l_0$ 的因子是 $\tfrac12(1 + e^{i\pi\cdot\text{奇数}}) = 0$。于是诸像标准正交，QFT 是酉的。门之积 $G_m\cdots G_1$ 的逆是 $G_1^\dagger\cdots G_m^\dagger$；$H$ 与 SWAP 是自身的逆，而受控 $P(\theta)$ 的逆是受控 $P(-\theta)$。这正是 `qft(…, inverse=True)` 所做的。
:::
:::

::: exercise 哪些基会失败？ {level=2 check="3/4"}
对 $N = 15$，列出所有 $a\in\Z_{15}^*$ 的阶，并判定对哪些 $a$ [[#alg-shor]] 的第 3 步成功。$\Z_{15}^*$ 中成功的比例是多少？（填一个分数。）
::: solution
$\Z_{15}^* = \{1, 2, 4, 7, 8, 11, 13, 14\}$，阶分别为 $1, 4, 2, 4, 4, 2, 4, 2$。失败的：$a = 1$（阶为奇数）与 $a = 14 \equiv -1$（阶 $2$ 且 $a^1\equiv-1$）。其余六个成功：例如 $a = 4$：$4^1 = 4$，$\gcd(3, 15) = 3$；$a = 11$：$\gcd(10, 15) = 5$；$a = 2, 7, 8, 13$：$a^2\equiv4$，给出 $3$ 与 $5$。所以 $6/8 = 3/4$，对 $m = 2$ 个素数满足 [[#thm-reduction]] 的界 $1 - 2^{-(m-1)} = 1/2$。
:::
:::

::: exercise 相位不精确时的相位估计 {level=2}
对特征 $\varphi = 1/3$ 的特征向量施加 $t = 3$ 的相位估计。计算每个结果的概率（保留三位小数），并把最可能的结果与 [[#thm-pe]] 比较。
::: solution
$p(x) = \abs{\tfrac18\sum_{k=0}^{7}e^{2\pi ik(1/3 - x/8)}}^2$。数值上：$p(0) = 0.016$，$p(1) = 0.032$，$p(2) = 0.175$，$p(3) = 0.688$，$p(4) = 0.047$，$p(5) = 0.019$，$p(6) = 0.013$，$p(7) = 0.012$。最近的 $3$ 位值是 $3/8 = 0.375$（距离 $0.042 < 1/16$），概率 $0.688 \ge 4/\pi^2\approx 0.405$；最近两个值 $2/8$ 与 $3/8$ 合计 $0.863$。
:::
:::

::: exercise 大误差几乎不会发生 {level=3}
设 $e \ge 2$ 为整数。证明相位估计输出距 $M\varphi$ 超过 $e$（沿圆周度量，即按模 $1$ 选取 $\abs{\delta_x}\le\tfrac12$）的 $x$ 的概率至多 $1/(2(e - 1))$。
::: solution
由 [[#thm-pe]]，$p(x) = \sin^2(\pi M\delta_x)/(M^2\sin^2(\pi\delta_x))$。把分子放大为 $1$，并对 $\abs{\delta}\le\tfrac12$ 用 $\abs{\sin(\pi\delta)}\ge 2\abs\delta$（正弦在 $[0, \pi/2]$ 上的凹性）：$p(x)\le 1/(4M^2\delta_x^2) = 1/(4d_x^2)$，其中 $d_x = M\abs{\delta_x}$ 是 $x$ 到 $M\varphi$ 的距离。在 $M\varphi$ 的每一侧，相继整数的距离每次增加 $1$，所以一侧上距离超过 $e$ 的各整数的距离满足 $d_0 > e$，$d_1 > e + 1$，$d_2 > e + 2$，……，于是
$$
\sum_{j\ge0}\frac{1}{4d_j^2} < \frac14\sum_{j\ge0}\frac{1}{(e + j)^2} \le \frac14\int_{e-1}^{\infty}\frac{dz}{z^2} = \frac{1}{4(e - 1)}.
$$
两侧相加得至多 $1/(2(e - 1))$。例如，要以失败概率 $\epsilon$ 落在距 $M\varphi$ 不超过 $e = 2^{k}$ 的范围内（即把 $\varphi$ 求到 $t - k$ 位），只需 $2^k\ge 1 + 1/(2\epsilon)$，这正是 [[#thm-pe]] 之后引用的额外 $\lceil\log_2(2 + 1/(2\epsilon))\rceil$ 个量子比特的由来。
:::
:::

::: exercise 直接求 $a^x$ 的周期 {level=3}
肖尔最初的分析先测量工作寄存器。证明：在求阶的受控乘法之后，测量工作寄存器得到 $a^{x_0}\bmod N$，会把计数寄存器留在 $\frac{1}{\sqrt K}\sum_{j=0}^{K-1}\ket{x_0 + jr}$，其中 $K\approx M/r$；并解释逆 QFT 随后如何给出 $M/r$ 的倍数附近的结果，如 $N = 21$ 的模拟所见。
::: solution
受控乘法之后的状态是 $M^{-1/2}\sum_x\ket x\ket{a^x\bmod N}$。值 $a^x$ 只依赖 $x\bmod r$，所以测量工作寄存器得到 $a^{x_0}$（$0\le x_0 < r$）后，留下的恰是 $x\equiv x_0\pmod r$ 的项，即 $x = x_0 + jr$（$0\le j < K$），其中 $K = \lceil(M - x_0)/r\rceil$，振幅相等。逆 QFT 在 $\ket y$ 处给出振幅 $\frac{1}{\sqrt{MK}}e^{-2\pi ix_0y/M}\sum_{j}e^{-2\pi ijry/M}$，这个几何和式在 $ry/M$ 接近某个整数 $s$、即 $y\approx sM/r$ 时很大（模长约 $K$），否则很小——与 [[#thm-pe]] 相同的 Fejér 核形状。当 $r$ 整除 $M$ 时（如 $N = 15$），$K = M/r$ 恰成立，且只出现 $M/r$ 的倍数，如 [[#ex-qft-periodic]]。由 [[quantum-computing/quantum-circuits#prop-deferred]]，先测工作寄存器或完全不测，计数寄存器的统计相同，所以两种分析一致。
:::
:::
