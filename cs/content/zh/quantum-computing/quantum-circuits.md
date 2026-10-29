经典计算机并不直接实现任意布尔函数。它把少数几种小门接在一起——AND、OR、NOT，或者只有 NAND——而[布尔线路](/learn/ee/lesson.php?c=digital-logic&l=boolean-algebra)理论告诉我们就这已经足够：每个函数 $\{0,1\}^n \to \{0,1\}$ 都由某个 NAND 门线路计算。量子计算机也是如此。[[quantum-computing/qubits]] 的公理允许 $2^n$ 个振幅上的任意酉变换，但硬件只能施加少数几类操作，每次作用在一个或两个量子比特上，而一个算法就是这样一些**门**排成的序列——一条**线路**。本章的问题是：存在哪些门；如何阅读和模拟线路；经典计算如何嵌入量子计算；哪些小门集是**通用的**，能构造或逼近一切酉变换。

我们认识标准的单量子比特门并证明每个门都是布洛赫球的一次旋转；证明每个单量子比特酉矩阵都是三个旋转之积；引入受控操作与多量子比特线路；写出本课程余下部分使用的纯 Python 小型**态向量模拟器**；说明任何经典计算如何变成一个可逆的**预言机**（oracle）$U_f$；并陈述若干通用性定理（包括 Solovay–Kitaev 定理），以及说明大多数酉变换为什么仍然贵得无可救药的计数论证。

## 单量子比特门

**单量子比特门**是一个 $2 \times 2$ 酉矩阵。经常出场的几个都有名字。

::: definition 标准单量子比特门 {#def-gates}
[[quantum-computing/qubits]] 中的**泡利门** $X$、$Y$、$Z$（$X$ 又称 NOT，因为 $X\ket0 = \ket1$ 且 $X\ket1 = \ket0$）；**哈达玛门** $H$；**相位门**
$$
H = \frac{1}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix}, \qquad
P(\varphi) = \begin{pmatrix}1 & 0\\ 0 & e^{i\varphi}\end{pmatrix}, \qquad S = P(\pi/2), \qquad T = P(\pi/4);
$$
以及对实数角 $\theta$ 的**旋转门**
$$
R_x(\theta) = e^{-i\theta X/2} = \begin{pmatrix}\cos\frac\theta2 & -i\sin\frac\theta2\\ -i\sin\frac\theta2 & \cos\frac\theta2\end{pmatrix}, \quad
R_y(\theta) = \begin{pmatrix}\cos\frac\theta2 & -\sin\frac\theta2\\ \sin\frac\theta2 & \cos\frac\theta2\end{pmatrix}, \quad
R_z(\theta) = \begin{pmatrix}e^{-i\theta/2} & 0\\ 0 & e^{i\theta/2}\end{pmatrix}.
$$
更一般地，对单位向量 $\vec n \in \R^3$，$R_{\vec n}(\theta) = e^{-i\theta\,\vec n\cdot\vec\sigma/2} = \cos\frac\theta2\,I - i\sin\frac\theta2\,(n_xX + n_yY + n_zZ)$。
:::

指数公式由 $e^{A}$ 的幂级数和 $(\vec n\cdot\vec\sigma)^2 = I$（[[quantum-computing/qubits]] 的习题）立得：偶数次幂给出 $\cos\frac\theta2\,I$，奇数次幂给出 $-i\sin\frac\theta2\,\vec n\cdot\vec\sigma$。注意 $S^2 = Z$、$T^2 = S$，且 $P(\varphi) = e^{i\varphi/2}R_z(\varphi)$，所以相位门与 $z$ 旋转至多相差一个全局相位。哈达玛门交换 [[quantum-computing/qubits]] 中的两个基：$H\ket0 = \ket+$，$H\ket1 = \ket-$，又因 $H^2 = I$ 还有 $H\ket\pm = \ket{0}, \ket1$。用 $H$ 作共轭会交换 $X$ 与 $Z$：
$$
HXH = Z, \qquad HZH = X, \qquad HYH = -Y.
$$ {#eq-hxh}

"旋转"这个名字名副其实。

::: theorem 单量子比特门旋转布洛赫球 {#thm-rotation}
若某状态的布洛赫向量为 $\vec r$，则对它施加 $R_{\vec n}(\theta)$ 得到的状态，其布洛赫向量是 $\vec r$ 绕轴 $\vec n$ 旋转角 $\theta$ 的结果（沿 $\vec n$ 朝原点看去为逆时针）。
:::

::: proof
由 [[quantum-computing/qubits#prop-overlap]] 的证明，布洛赫向量为 $\vec r$ 的状态的投影算子是 $\ket\psi\!\bra\psi = \tfrac12(I + \vec r\cdot\vec\sigma)$，而 $U\ket\psi$ 的投影算子是 $U\ket\psi\!\bra\psi U^\dagger$。所以只需证明对一切 $\vec m$ 有 $R\,(\vec m\cdot\vec\sigma)\,R^\dagger = (\mathcal R\vec m)\cdot\vec\sigma$，其中 $R = R_{\vec n}(\theta)$，$\mathcal R$ 是 $\R^3$ 的一个旋转。记 $A = \vec n\cdot\vec\sigma$，$B = \vec m\cdot\vec\sigma$，$c = \cos\frac\theta2$，$s = \sin\frac\theta2$。由乘法规则 $XY = iZ$、$YZ = iX$、$ZX = iY$ 与 $P^2 = I$ 得恒等式
$$
(\vec a\cdot\vec\sigma)(\vec b\cdot\vec\sigma) = (\vec a\cdot\vec b)\,I + i(\vec a\times\vec b)\cdot\vec\sigma .
$$
于是 $BA - AB = -2i(\vec n\times\vec m)\cdot\vec\sigma$，且
$$
ABA = A\bigl((\vec n\cdot\vec m)I - i(\vec n\times\vec m)\cdot\vec\sigma\bigr) = (\vec n\cdot\vec m)A + \bigl(\vec n\times(\vec n\times\vec m)\bigr)\cdot\vec\sigma = \bigl(2(\vec n\cdot\vec m)\vec n - \vec m\bigr)\cdot\vec\sigma,
$$
其中用到 $\vec n\cdot(\vec n\times\vec m) = 0$ 与 $\vec n\times(\vec n\times\vec m) = (\vec n\cdot\vec m)\vec n - \vec m$。现在
$$
RBR^\dagger = (cI - isA)\,B\,(cI + isA) = c^2B + ics(BA - AB) + s^2ABA,
$$
再用 $c^2 - s^2 = \cos\theta$、$2cs = \sin\theta$、$2s^2 = 1 - \cos\theta$，它等于 $\bigl(\cos\theta\,\vec m + \sin\theta\,(\vec n\times\vec m) + (1 - \cos\theta)(\vec n\cdot\vec m)\,\vec n\bigr)\cdot\vec\sigma$。括号中的向量正是 $\vec m$ 绕 $\vec n$ 转 $\theta$ 的 Rodrigues 公式。
:::

于是 $Z = iR_z(\pi)$ 是绕 $z$ 的半周旋转，$X$ 是绕 $x$ 的半周旋转，$S$ 是绕 $z$ 的四分之一周旋转（把 $\ket+$ 转到 $\ket{+i}$），$T$ 是八分之一周旋转，而 $H = \tfrac{1}{\sqrt2}(X + Z) = iR_{\vec n}(\pi)$，其中 $\vec n = (1, 0, 1)/\sqrt2$，是绕 $x$ 与 $z$ 之间对角线的半周旋转，它交换这两条轴并把 $y$ 反向——恰如 [[#eq-hxh]]。这样定义的映射 $\mathrm{SU}(2) \to \mathrm{SO}(3)$ 是满射，所以球面的每个旋转都是一个门，每个门都是一个旋转（再乘一个相位）。

$H$ 的矩阵是实的，所以它同样作用在振幅的实平面 $(\alpha, \beta)$ 上。在那里它是关于倾角 $\pi/8$ 直线的**反射**，如图所示。

::: widget transform2d
matrix: 0.7071, 0.7071; 0.7071, -0.7071
eigen: true
vector: 1, 0
range: 1.5
caption: 哈达玛矩阵作用在实振幅向量 $(\alpha, \beta)$ 上。它的特征向量（特征值为 $+1$ 与 $-1$）位于倾角 $\pi/8$ 与 $5\pi/8$ 处；行列式为 $-1$，所以这是一次反射，作用两次得恒等。拖动向量试试：$(1,0) = \ket0$ 映到 $(0.707, 0.707) = \ket+$。把矩阵换成 $\cos t, -\sin t; \sin t, \cos t$（$t = \theta/2$ 取数）就看到 $R_y(\theta)$：振幅平面旋转 $\theta/2$——布洛赫球角的一半。
:::

::: theorem Z–Y 分解 {#thm-zyz}
对每个 $2\times2$ 酉矩阵 $U$，存在实数 $\alpha, \beta, \gamma, \delta$ 使得
$$
U = e^{i\alpha}\,R_z(\beta)\,R_y(\gamma)\,R_z(\delta).
$$
:::

::: proof
第一步，$2\times2$ 酉矩阵的形状。它的第一列 $(a, c)\T$ 是单位向量，第二列是与它正交的单位向量。在 $\C^2$ 中与 $(a, c)\T$ 正交的向量构成由 $(-\overline c, \overline a)\T$ 张成的直线，而后者本身是单位向量，所以第二列必为某个实 $\lambda$ 对应的 $e^{i\lambda}(-\overline c, \overline a)\T$：
$$
U = \begin{pmatrix} a & -e^{i\lambda}\overline c\\ c & e^{i\lambda}\overline a\end{pmatrix}, \qquad \abs a^2 + \abs c^2 = 1 .
$$
第二步，把乘积展开，
$$
R_z(\beta)R_y(\gamma)R_z(\delta) = \begin{pmatrix} e^{-i(\beta+\delta)/2}\cos\frac\gamma2 & -e^{-i(\beta-\delta)/2}\sin\frac\gamma2\\ e^{i(\beta-\delta)/2}\sin\frac\gamma2 & e^{i(\beta+\delta)/2}\cos\frac\gamma2\end{pmatrix}.
$$
取 $\gamma \in [0, \pi]$ 使 $\cos\frac\gamma2 = \abs a$、$\sin\frac\gamma2 = \abs c$，并写 $a = \abs a e^{i\kappa}$、$c = \abs c e^{i\mu}$（模为 $0$ 时 $\kappa$ 或 $\mu$ 任取）。令 $\alpha = \lambda/2$，解线性方程组 $-(\beta + \delta)/2 = \kappa - \alpha$、$(\beta - \delta)/2 = \mu - \alpha$ 得 $\beta, \delta$。于是 $e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$ 的第一列是 $(a, c)\T$。它的第二列是 $e^{i\alpha}(-e^{-i(\beta-\delta)/2}\sin\frac\gamma2,\ e^{i(\beta+\delta)/2}\cos\frac\gamma2)\T = e^{2i\alpha}(-\overline c, \overline a)\T = e^{i\lambda}(-\overline c, \overline a)\T$，正是所需。
:::

几何上，球面的任何旋转都是先绕 $z$ 转、再绕 $y$ 转、再绕 $z$ 转——力学中的欧拉角。把 $z$ 与 $y$ 换成任意两条正交轴，同样的论证照样成立。

::: example 分解哈达玛门 {#ex-h-decomp}
求 $H$ 的一个 Z–Y 分解并验证。
::: solution
$H$ 把布洛赫向量 $\hat z$ 映为 $\hat x$，把 $\hat x$ 映为 $\hat z$。先绕 $z$ 半周、再绕 $y$ 四分之一周做的正是同一件事：$R_z(\pi)$ 固定 $\hat z$ 并把 $\hat x \mapsto -\hat x$；随后 $R_y(\pi/2)$ 把 $\hat z \mapsto \hat x$、$-\hat x \mapsto \hat z$。把矩阵乘起来，
$$
R_y(\tfrac\pi2)R_z(\pi) = \frac{1}{\sqrt2}\begin{pmatrix}1 & -1\\ 1 & 1\end{pmatrix}\begin{pmatrix}-i & 0\\ 0 & i\end{pmatrix} = \frac{-i}{\sqrt2}\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix} = -iH,
$$
所以 $H = e^{i\pi/2}\,R_z(0)\,R_y(\pi/2)\,R_z(\pi)$：$\alpha = \pi/2$、$\beta = 0$、$\gamma = \pi/2$、$\delta = \pi$。全局相位 $e^{i\pi/2}$ 单独看不可观测，可一旦 $H$ 被另一个量子比特*控制*，它就重要了，我们马上就会看到。
:::
:::

## 多量子比特门与线路

### 张量积

由复合公理（[[quantum-computing/qubits#def-postulates]]），$n$ 个量子比特的态空间是 $\C^{2^n}$，基为 $\ket{x_0x_1\cdots x_{n-1}}$，$x_j \in \{0, 1\}$。我们从左开始给量子比特编号：量子比特 $0$ 是标签的最左一位，所以 $\ket{10}$ 表示量子比特 $0$ 是 $1$、量子比特 $1$ 是 $0$，且把标签读成二进制数就得到振幅的下标。（有些软件从右往左编号；与其他资料对照时要检查约定。）若量子比特 $0$ 独立地处于状态 $\ket a$、量子比特 $1$ 处于状态 $\ket b$，则联合状态是**张量积** $\ket a\otimes\ket b$，按坐标向量的**克罗内克积**（Kronecker）计算：
$$
\begin{pmatrix}a_0\\a_1\end{pmatrix}\otimes\begin{pmatrix}b_0\\b_1\end{pmatrix} = \begin{pmatrix}a_0b_0\\a_0b_1\\a_1b_0\\a_1b_1\end{pmatrix}, \qquad \text{例如 } \ket+\otimes\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{10}).
$$
$\ket a\otimes\ket b$ 简记为 $\ket a\ket b$ 或 $\ket{ab}$。只作用在量子比特 $0$ 上的门 $U$ 在两个量子比特上作用为 $U\otimes I$，其中 $(A\otimes B)(\ket a\otimes\ket b) = A\ket a\otimes B\ket b$；作为矩阵，$A\otimes B$ 是以 $a_{ij}B$ 为块的块矩阵。大多数两量子比特状态*不是*张量积——它们是**纠缠的**——那是 [[quantum-computing/entanglement]] 的主题。对线路来说，我们只需要这些事实：作用在一个量子比特上的门，以改变该量子比特所在位的方式（线性地）作用在每个基标签上；作用在不同量子比特上的门相互交换。

### 受控门

::: definition 受控操作 {#def-controlled}
在**控制**量子比特 $c$ 与**目标**量子比特 $t$ 上的**受控非门**（CNOT）把 $\ket{c}\ket{t} \mapsto \ket{c}\ket{t \oplus c}$，其中 $c, t \in \{0, 1\}$，$\oplus$ 是模 $2$ 加法。对单量子比特酉矩阵 $U$，**受控-$U$** 把 $\ket0\ket\psi \mapsto \ket0\ket\psi$、$\ket1\ket\psi \mapsto \ket1 U\ket\psi$。**Toffoli 门**（双受控非门）把 $\ket{a}\ket{b}\ket{t} \mapsto \ket a\ket b\ket{t \oplus ab}$。**SWAP 门**把 $\ket{a}\ket{b} \mapsto \ket b\ket a$。在基 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ 下（控制位在前），
$$
\mathrm{CNOT} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&0&1\\0&0&1&0\end{pmatrix}, \qquad
\mathrm{CZ} = \begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&-1\end{pmatrix}.
$$
:::

受控-$Z$ 对它的两个量子比特是对称的——它把 $\ket{11}$ 乘 $-1$，其余不变——所以没有特定的控制位。因为 $HXH = Z$，CNOT 就是两端在目标位上各加一个哈达玛门的 CZ。有一点微妙："控制"与"目标"并不是信息流的物理方向。在哈达玛基下，CNOT 的作用是交换了角色的 CNOT（[[#ex-reverse-cnot]]），而受控-$U$ 可以通过**相位反冲**（phase kickback）改变*控制*量子比特的状态：若 $U\ket\psi = e^{i\varphi}\ket\psi$，则受控-$U$ 把 $(\alpha\ket0 + \beta\ket1)\ket\psi$ 映为 $(\alpha\ket0 + e^{i\varphi}\beta\ket1)\ket\psi$，把特征值放到了控制位上。相位反冲是 [[quantum-computing/first-algorithms]] 与 [[quantum-computing/shor]] 中几乎每个算法的发动机；它也是全局相位在受控门内部要紧的原因——受控-$(e^{i\alpha}U)$ 与受控-$U$ 相差控制位上的门 $P(\alpha)$。

### 线路图

**量子线路**的画法是：每个量子比特一条水平线，时间从左到右，门画成方框；控制位是一个圆点连到它的目标位，$\oplus$ 标记 CNOT 的目标位。没有线路图部件时，我们用文本来画线路：

```text
q0: |0> ──H──●──      制备 (|00> + |11>)/√2
             │
q1: |0> ─────X──
```

从左往右读，$H$ 给出 $\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{10})$，CNOT 在第二项上翻转量子比特 $1$，得到**贝尔态**（Bell）$\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$。线路的矩阵是各门矩阵**按相反顺序**的乘积——第一个门在最右——因为矩阵从左往左作用在列向量上：这里是 $\mathrm{CNOT}\cdot(H\otimes I)$。同一列中作用在不相交量子比特上的门可以按任何顺序施加，而列数就是线路的**深度**：当作用在不同量子比特上的门并行执行时，它衡量运行时间。

::: example 贝尔线路的矩阵 {#ex-bell-matrix}
计算线路"量子比特 $0$ 上施加 $H$，然后 CNOT $0\to1$"的 $4\times4$ 矩阵以及四个基状态的像。
::: solution
在基 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ 下，$H\otimes I$ 是块矩阵 $\tfrac{1}{\sqrt2}\begin{pmatrix}I & I\\ I & -I\end{pmatrix}$，而 CNOT 把乘的对象的后两行交换。所以
$$
\mathrm{CNOT}\,(H\otimes I) = \frac{1}{\sqrt2}\begin{pmatrix}1&0&1&0\\0&1&0&1\\0&1&0&-1\\1&0&-1&0\end{pmatrix}.
$$
它的各列是基状态的像：
$$
\ket{00} \mapsto \tfrac{1}{\sqrt2}(\ket{00} + \ket{11}), \quad \ket{01} \mapsto \tfrac{1}{\sqrt2}(\ket{01} + \ket{10}), \quad \ket{10} \mapsto \tfrac{1}{\sqrt2}(\ket{00} - \ket{11}), \quad \ket{11} \mapsto \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}).
$$
这四个标准正交状态构成**贝尔基**。因此把线路倒过来运行（CNOT，然后 $H$，然后测量）就是在贝尔基下测量——[[quantum-computing/entanglement]] 中隐形传态与超密编码的关键一步。
:::
:::

::: definition 线路模型 {#def-circuit}
$n$ 个量子比特上的一条**量子线路**是一串门，每个门是作用在常数个量子比特（一个、两个或三个）上的酉变换。它从 $\ket{0}^{\otimes n}$（或从输入 $\ket x$）出发，按顺序施加各个门，最后在计算基下测量部分或全部量子比特。它的**规模**是门的个数，**深度**是可作用在不相交量子比特上的层的层数。用作工作区的额外量子比特称为**辅助量子比特**（ancilla）。
:::

在线路中途测量、后续门按测量结果作经典控制，常常很方便（隐形传态就这么用）。它们不增加任何能力：

::: proposition 延迟测量原理 {#prop-deferred}
线路中途的一次测量、随后按测量结果作经典控制的门，可以替换为相应的量子受控门，并把测量挪到末尾；一切测量结果的联合分布不变。
:::

::: proof
考察一次中途对量子比特 $q$ 的测量，其后跟着一个依赖结果 $b$ 的酉变换 $V_b$。把测量前的状态写成 $\ket0_q\ket{\psi_0} + \ket1_q\ket{\psi_1}$（不必归一化，第二个因子作用在其余全部量子比特上）。测量以概率 $\norm{\psi_b}^2$ 给出 $b$，之后其余部分为 $V_b\ket{\psi_b}/\norm{\psi_b}$。另一种做法是施加受控门 $\ket0\!\bra0\otimes V_0 + \ket1\!\bra1\otimes V_1$，得到 $\ket0\,V_0\ket{\psi_0} + \ket1\,V_1\ket{\psi_1}$；其后任何不碰 $q$ 的门分别作用在每个分支上，最后对 $q$ 的测量以概率 $\norm{V_b\psi_b}^2 = \norm{\psi_b}^2$ 给出 $b$，并在其余量子比特上留下同样的条件状态。对线路中各次测量作归纳，即知一切结果的联合分布相同。
:::

## 一个态向量模拟器

为了检查线路——以及本课程的每个算法——我们用一个小编程器，它把全部 $2^n$ 个振幅存在一个 `complex` 数的 Python 列表里。把单量子比特门 $U$ 施加到量子比特 $q$，就是把每个第 $q$ 位为 $0$ 的基下标 $i$ 与第 $q$ 位为 $1$ 的下标 $i \,|\, m$ 配成一对（$m$ 是量子比特 $q$ 的位掩码），并把两个振幅 $(a, b)$ 换成 $U(a, b)\T$。受控门只对那些控制位全为 $1$ 的下标做同样的事。

```python
# qsim.py，第 1 部分——只用标准库的微型态向量模拟器。
# 量子比特 0 是基标签 |q0 q1 ... q_{n-1}> 的最左（最高）位。
import cmath, math, random

def zeros(n):                      # n 个量子比特的状态 |00...0>
    s = [0j] * (1 << n); s[0] = 1; return s

def nqubits(s): return len(s).bit_length() - 1

def apply(s, U, q, controls=()):   # 对量子比特 q 施加 2x2 矩阵 U
    n = nqubits(s); m = 1 << (n - 1 - q)
    cmask = sum(1 << (n - 1 - c) for c in controls)
    for i in range(len(s)):
        if i & m == 0 and i & cmask == cmask:   # i 满足 q = 0 且所有控制位 = 1
            a, b = s[i], s[i | m]
            s[i], s[i | m] = U[0][0]*a + U[0][1]*b, U[1][0]*a + U[1][1]*b

def permute(s, f):                 # 基置换 |i> -> |f(i)>（一个可逆映射）
    t = [0j] * len(s)
    for i, a in enumerate(s): t[f(i)] += a
    s[:] = t

def probs(s): return [abs(a) ** 2 for a in s]
```

```python
# qsim.py，第 2 部分——测量、打印与标准门
def measure(s, q, rng=random):     # 测量量子比特 q，使 s 坍缩，返回该位
    n = nqubits(s); m = 1 << (n - 1 - q)
    p1 = sum(abs(a) ** 2 for i, a in enumerate(s) if i & m)
    bit = 1 if rng.random() < p1 else 0
    norm = math.sqrt(p1 if bit else 1 - p1)
    for i in range(len(s)):
        s[i] = s[i] / norm if bool(i & m) == bool(bit) else 0j
    return bit

def show(s, tol=1e-9):             # 以右矢形式打印非零振幅
    n = nqubits(s)
    for i, a in enumerate(s):
        if abs(a) > tol:
            z = f"{a.real:+.4f}" if abs(a.imag) < tol else f"({a.real:+.4f}{a.imag:+.4f}i)"
            print(f"{z} |{i:0{n}b}>")

r2 = 1 / math.sqrt(2)
H = [[r2, r2], [r2, -r2]]
X = [[0, 1], [1, 0]]
Y = [[0, -1j], [1j, 0]]
Z = [[1, 0], [0, -1]]
S = [[1, 0], [0, 1j]]
T = [[1, 0], [0, cmath.exp(1j * math.pi / 4)]]
def P(phi): return [[1, 0], [0, cmath.exp(1j * phi)]]
```

把两部分保存为一个文件 `qsim.py`。`permute` 函数施加基状态的置换，下面施加 $U_f$ 这类经典可逆函数、以及 [[quantum-computing/shor]] 中的模乘，都要靠它；`measure` 对一个量子比特实现玻恩规则与坍缩。

::: example 三条线路恒等式，用模拟验证 {#ex-identities}
用模拟器 (a) 制备贝尔态，(b) 验证三个交替的 CNOT 交换两个量子比特，(c) 计算两端都在两个量子比特上加哈达玛门共轭后的 CNOT 的矩阵。
::: solution
```python
from qsim import *

# 贝尔对：量子比特 0 上加 H，然后从量子比特 0 到量子比特 1 的 CNOT
s = zeros(2); apply(s, H, 0); apply(s, X, 1, controls=(0,)); show(s)

# 三个 CNOT 构成 SWAP：在 |10> 以及带相位的叠加态上检查
s = zeros(2); apply(s, X, 0)                          # |10>
for c, t in ((0, 1), (1, 0), (0, 1)): apply(s, X, t, controls=(c,))
print("SWAP|10> ="); show(s)

# 经哈达玛门共轭的 CNOT 是反向的 CNOT
def matrix(circuit, n):
    cols = []
    for j in range(1 << n):
        s = [0j] * (1 << n); s[j] = 1; circuit(s); cols.append(s)
    return [[round(cols[j][i].real, 6) for j in range(1 << n)] for i in range(1 << n)]
def reversed_cnot(s):
    for q in (0, 1): apply(s, H, q)
    apply(s, X, 1, controls=(0,))
    for q in (0, 1): apply(s, H, q)
for row in matrix(reversed_cnot, 2): print(row)
```

```console
$ python3 identities.py
+0.7071 |00>
+0.7071 |11>
SWAP|10> =
+1.0000 |01>
[1.0, 0.0, 0.0, 0.0]
[0.0, 0.0, 0.0, 1.0]
[0.0, 0.0, 1.0, 0.0]
[0.0, 1.0, 0.0, 0.0]
```

(a) 就是贝尔态。(b) 在基状态上，三个 CNOT 给出 $\ket{a, b} \mapsto \ket{a, a\oplus b} \mapsto \ket{b, a\oplus b} \mapsto \ket{b, a}$，用到 $a \oplus (a \oplus b) = b$；既然这对一组基成立，由线性性对一切状态都给出 SWAP。(c) 打印矩阵的第 $j$ 列是基状态 $j$ 的像：$\ket{01} \mapsto \ket{11}$、$\ket{11} \mapsto \ket{01}$，其余不动。这正是以量子比特 $1$ 为控制、量子比特 $0$ 为目标的 CNOT。恒等式 $(H\otimes H)\,\mathrm{CNOT}_{0\to1}\,(H\otimes H) = \mathrm{CNOT}_{1\to0}$ 在 [[#ex-reverse-cnot]] 中手算证明。
:::
:::

模拟器的代价正是量子计算的要点所在。$n$ 个量子比特的状态需要 $2^n$ 个复数——双精度每个 16 字节，$n = 30$ 时要 16 GiB，$n = 50$ 时要 16 PiB——而每个门都要碰一遍全部振幅。更聪明的经典方法（张量网络、Clifford 线路的稳定子模拟、如 [[quantum-computing/quantum-complexity]] 中的 Feynman 路径和）能处理远超此规模的特殊线路，但已知没有任何经典方法能在 $n$ 的多项式时间内模拟 $n$ 个量子比特、多项式深度的*一般*线路。

::: quiz
对 $\ket{00}$ 施加线路"量子比特 $0$ 上加 $H$，然后从量子比特 $0$ 到量子比特 $1$ 的 CNOT，再在量子比特 $0$ 上加 $H$"，测量两个量子比特得到 $00$ 的概率是多少？
- [ ] $0$
- [x] $1/4$
- [ ] $1/2$
- [ ] $1$
::: solution
前两个门之后状态为 $\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$。最后量子比特 $0$ 上的 $H$ 给出 $\tfrac12(\ket{00} + \ket{10} + \ket{01} - \ket{11})$：四个模为 $1/2$ 的振幅，所以每个结果（包括 $00$）的概率都是 $1/4$。若没有 CNOT，两个哈达玛门会相互抵消，$00$ 将必然出现；CNOT 把量子比特 $0$ "走了哪条路径"记录到了量子比特 $1$ 上，破坏了干涉——正像 [[quantum-computing/qubits#ex-interference]] 中的中间测量。
:::
:::

## 量子线路中的经典计算

量子线路是可逆的；AND 和 OR 不是——从 $a \wedge b = 0$ 无法恢复 $a$ 和 $b$。Bennett（1973）、Fredkin 与 Toffoli（1982）找到的补救办法是保留输入。Toffoli 门计算 $\ket{a, b, 0} \mapsto \ket{a, b, a\wedge b}$，配上 $X$（NOT）门和置为 $0$ 或 $1$ 的辅助量子比特就能计算 NAND，所以它对经典可逆计算是通用的；作为基状态的置换，它同时也是一个酉矩阵，因而是一个量子门。

::: definition 布尔函数的预言机 {#def-oracle}
对 $f\colon \{0,1\}^n \to \{0,1\}^m$，$n + m$ 个量子比特上的 **（比特）预言机** $U_f$ 是满足 $U_f\ket{x}\ket{y} = \ket{x}\ket{y \oplus f(x)}$ 的线性映射，其中 $x \in \{0,1\}^n$，$y \in \{0,1\}^m$，$\oplus$ 是按位异或。当 $m = 1$ 时，**相位预言机**为 $O_f\ket{x} = (-1)^{f(x)}\ket x$。
:::

$U_f$ 置换基（它是自己的逆，因为 $y \oplus f(x) \oplus f(x) = y$），所以它对每个 $f$ 都是酉的，即使 $f$ 本身不可逆。把目标量子比特置于状态 $\ket- = (\ket0 - \ket1)/\sqrt2$，相位预言机就由 $U_f$ 经相位反冲得到：$U_f\ket x\ket- = \ket x\,\tfrac{1}{\sqrt2}(\ket{f(x)} - \ket{1\oplus f(x)}) = (-1)^{f(x)}\ket x\ket-$，所以目标位处于 $\ket-$ 时，$U_f$ 在输入寄存器上的作用就是 $O_f$。

::: theorem 经典线路给出高效的预言机 {#thm-oracle}
若 $f\colon\{0,1\}^n\to\{0,1\}^m$ 由一个含 $s$ 个 AND、OR 与 NOT 门的经典线路计算（扇入至多 $2$），则 $U_f$ 可由一个 $O(s + m)$ 个 Toffoli、CNOT 与 $X$ 门组成的量子线路实现，使用 $O(s)$ 个辅助量子比特，它们起始和结束时都处于 $\ket0$。
:::

::: proof
给经典线路的每根导线配一个辅助量子比特，初始为 $\ket0$。按拓扑序处理各门，把每个门的输出写进其导线对应的辅助量子比特：$a$ 的 NOT 用从 $a$ 出发的 CNOT 再接 $X$；$a, b$ 的 AND 用一个写到新辅助量子比特上的 Toffoli；OR 用 $a \vee b = \neg(\neg a\wedge\neg b)$，即在 Toffoli 前后加 $X$ 门（之后再恢复输入）。经过这 $O(s)$ 个门，辅助量子比特上存放着全部中间值，记作 $g(x)$，输出导线上是 $f(x)$：我们得到了 $\ket x\ket{0}\ket y \mapsto \ket x\ket{g(x)}\ket y$。现在用 $m$ 个 CNOT 把 $m$ 根输出导线异或进寄存器 $\ket y$，得 $\ket x\ket{g(x)}\ket{y\oplus f(x)}$。最后把第一阶段倒着运行——用到的每个门都是自己的逆——由于第一阶段不依赖 $y$，这会把 $g(x)$ **反算**（uncompute）回 $\ket0$。净效果是在基状态上 $\ket x\ket0\ket y \mapsto \ket x\ket0\ket{y\oplus f(x)}$，从而由线性性对一切状态是 $U_f\otimes I$。
:::

反算这一步必不可少。若把"垃圾"$g(x)$ 留在原地，状态 $\sum_x \alpha_x\ket x\ket{g(x)}\ket{f(x)}$ 就与垃圾纠缠起来，不同的 $x$ 之间不再能干涉——垃圾的作用相当于"走了哪条路径"的记录，如上面的测验所示。于是任何多项式时间的经典算法都变成多项式规模的量子线路，量子计算机能做经典计算机能做的一切，只多出多项式的开销（在 [[quantum-computing/quantum-complexity]] 中精确化）。

::: example 用两量子比特门构造 Toffoli 门 {#ex-toffoli}
硬件通常只提供单量子比特门和两量子比特门。设 $V = \tfrac12\begin{pmatrix}1+i & 1-i\\ 1-i & 1+i\end{pmatrix}$，于是 $V^2 = X$。证明线路"从量子比特 $1$ 到 $2$ 的受控-$V$；CNOT $0\to1$；从 $1$ 到 $2$ 的受控-$V^\dagger$；CNOT $0\to1$；从 $0$ 到 $2$ 的受控-$V$"是一个 Toffoli 门。
::: solution
对控制位 $(a, b)$ 的每种取值，跟踪作用到目标位上的算子。第一个受控-$V$ 执行时量子比特 $1$ 上存着 $b$，受控-$V^\dagger$ 执行时存着 $b\oplus a$，之后又恢复为 $b$（两个 CNOT 相互抵消）。所以目标位收到 $V^{b}\,(V^\dagger)^{a\oplus b}\,V^{a}$（$V$ 的各次幂相互交换）。$(a,b) = (0,0)$：$I$。$(0,1)$：$V V^\dagger = I$。$(1,0)$：$V^\dagger V = I$。$(1,1)$：$V\cdot I\cdot V = V^2 = X$。这正是 Toffoli 门。模拟器也同意：

```python
from qsim import *

V  = [[(1 + 1j) / 2, (1 - 1j) / 2], [(1 - 1j) / 2, (1 + 1j) / 2]]   # V*V = X
Vd = [[(1 - 1j) / 2, (1 + 1j) / 2], [(1 + 1j) / 2, (1 - 1j) / 2]]   # V 的伴随

def toffoli_from_two_qubit_gates(s):        # 控制位 0 和 1，目标 2
    apply(s, V, 2, controls=(1,))
    apply(s, X, 1, controls=(0,))
    apply(s, Vd, 2, controls=(1,))
    apply(s, X, 1, controls=(0,))
    apply(s, V, 2, controls=(0,))

for j in range(8):
    s = [0j] * 8; s[j] = 1
    toffoli_from_two_qubit_gates(s)
    out = [i for i in range(8) if abs(s[i]) > 1e-9]
    print(f"|{j:03b}> -> |{out[0]:03b}>  amplitude {s[out[0]].real:+.3f}")
```

```console
$ python3 toffoli.py
|000> -> |000>  amplitude +1.000
|001> -> |001>  amplitude +1.000
|010> -> |010>  amplitude +1.000
|011> -> |011>  amplitude +1.000
|100> -> |100>  amplitude +1.000
|101> -> |101>  amplitude +1.000
|110> -> |111>  amplitude +1.000
|111> -> |110>  amplitude +1.000
```

每个基状态都以恰为 $1$ 的振幅到正确的基状态——没有杂散相位——所以该线路等于 Toffoli 矩阵。进一步分解成 CNOT 与 $H$、$T$、$T^\dagger$ 门，一个标准线路用到 $6$ 个 CNOT 和 $7$ 个 $T$ 或 $T^\dagger$ 门。
:::
:::

## 通用性

哪些小门集够用？有两个概念。若任意多个量子比特上的每个酉矩阵都是门集中门的有限乘积（作用在选定的量子比特上），则称该门集**精确通用**；由于有限集只生成可数个乘积，精确通用的门集必须是无限的——例如全部单量子比特门加上 CNOT。有限集至多能**近似通用**：它的乘积可以任意逼近每个酉矩阵。接近程度用**算子范数** $\norm{A} = \max_{\norm{\psi} = 1}\norm{A\psi}$ 度量；若 $\norm{U - V} \le \varepsilon$，则在 $U\ket\psi$ 和 $V\ket\psi$ 上做任何测量，结果概率之差不超过 $2\varepsilon$。

::: lemma 误差的累加至多是线性的 {#lem-errors}
若 $U_1, \dots, U_m$ 与 $V_1, \dots, V_m$ 是酉矩阵且 $\norm{U_j - V_j} \le \varepsilon_j$，则 $\norm{U_m\cdots U_1 - V_m\cdots V_1} \le \sum_j \varepsilon_j$。
:::

::: proof
对 $m$ 归纳；$m = 1$ 即假设。记 $U' = U_{m-1}\cdots U_1$、$V' = V_{m-1}\cdots V_1$。则
$$
U_mU' - V_mV' = U_m(U' - V') + (U_m - V_m)V',
$$
而酉矩阵的算子范数为 $1$，且 $\norm{AB} \le \norm A\norm B$，所以范数至多为 $\norm{U' - V'} + \norm{U_m - V_m} \le \sum_{j<m}\varepsilon_j + \varepsilon_m$。
:::

所以要把一个由 $m$ 个理想门组成的线路以总精度 $\varepsilon$ 运行，只要把每个门逼近到精度 $\varepsilon/m$ 就够了。通用性定理如下。

::: theorem CNOT 与单量子比特门的通用性 {#thm-universal}
(a) $d$ 维空间上的每个酉矩阵都是至多 $d(d-1)/2$ 个**二能级酉阵**（只在两个基向量上非平凡作用的酉矩阵）之积。(b) $n$ 个量子比特上的每个酉矩阵都是单量子比特门与 CNOT 之积（Barenco 等，1995）；按此构造 $O(n^2 4^n)$ 个门足够，按后来的构造 $O(4^n)$ 个足够。
:::

::: proof
(a) 设 $U$ 是 $d\times d$ 酉矩阵。取一个作用在基向量 $1, 2$ 上的二能级酉阵 $T_1$，把 $T_1U$ 的 $(2,1)$ 元置为 $0$：它在对 $(u_{11}, u_{21})$ 上的作用是 $\frac{1}{r}\begin{pmatrix}\overline{u_{11}} & \overline{u_{21}}\\ -u_{21} & u_{11}\end{pmatrix}$，其中 $r = \sqrt{\abs{u_{11}}^2 + \abs{u_{21}}^2}$（$r = 0$ 时取恒等）。对第 $3, \dots, d$ 行依次对第 $1$ 行重复此操作，$d - 1$ 步后第一列变成 $(e^{i\phi}, 0, \dots, 0)\T$；再对向量 $1, 2$ 施加一个二能级相位（或并入最后一步）就把它变成 $(1, 0, \dots, 0)\T$。由于乘积是酉的，其第一行这时也是 $(1, 0, \dots, 0)$，所以它具有 $1 \oplus U'$ 的形式，$U'$ 是 $d - 1$ 阶酉阵。递归：总共至多 $(d-1) + (d-2) + \dots + 1 = d(d-1)/2$ 个因子 $T_k$ 使 $T_K\cdots T_1U = I$，于是 $U = T_1^\dagger\cdots T_K^\dagger$，每个 $T_k^\dagger$ 都是二能级的。

(b) （概要。）$n$ 个量子比特基向量 $\ket s, \ket t$ 上的二能级酉阵，经由一串沿 $s$ 到 $t$ 的格雷码（Gray code）安排的 CNOT 与 $X$ 门共轭，化成在一个量子比特上的单量子比特酉变换、受其余所有量子比特处于固定图样的控制。多重受控的单量子比特门由 Toffoli 门、辅助量子比特和一个受控-$U$ 构成；Toffoli 门来自两量子比特门（[[#ex-toffoli]]）；而受控-$U$ 是控制位上的 $e^{i\alpha}$ 相位加上目标位上的 $A\,X\,B\,X\,C$，其中 $ABC = I$，$A, B, C$ 取自 [[#thm-zyz]]（[[#ex-abc]]）。统计门的个数即得此界。
:::

::: theorem 近似通用性与 Solovay–Kitaev 定理 {#thm-sk}
(a) 集合 $\{H, T, \mathrm{CNOT}\}$ 近似通用：$H$ 与 $T$ 生成的群在相差全局相位的单量子比特酉矩阵中稠密（Boykin 等，1999）。(b) **Solovay–Kitaev 定理。**设 $G$ 是一个有限的单量子比特门集，对求逆封闭，且生成 $\mathrm{SU}(2)$ 的一个稠密子群。则每个单量子比特酉矩阵都可由 $G$ 中 $O(\log^c(1/\varepsilon))$ 个门的乘积以算子范数精度 $\varepsilon$ 逼近，其中 $c$ 为某个常数（标准证明中约为 $3.97$），并且可用一个经典算法在时间 $O(\log^{c'}(1/\varepsilon))$ 内找到该乘积。于是，由 $m$ 个 CNOT 和任意单量子比特门组成的线路可以用 $G\cup\{\mathrm{CNOT}\}$ 中 $O(m\log^c(m/\varepsilon))$ 个门以精度 $\varepsilon$ 逼近。
:::

(b) 我们陈述而不证明（见 Dawson 与 Nielsen，2006，或 Nielsen–Chuang，附录 3）。(a) 的思路：$T$（相差一个相位）是绕 $z$ 转 $\pi/4$，$HTH$ 是绕 $x$ 转 $\pi/4$；二者之积是转角 $\theta$ 满足 $\cos(\theta/2) = \cos^2(\pi/8)$ 的旋转，而 $\theta$ 是 $\pi$ 的无理倍，所以它的幂在绕一个轴的旋转中稠密，两个这样的轴生成稠密集。后果是对复杂性理论而言，选哪个有限通用集并不重要：换门集只花一个对数多项式因子。对具体门集 $\{H, T\}$，有远比 Solovay–Kitaev 好的算法：一个 $z$ 旋转约用 $3\log_2(1/\varepsilon)$ 个 $T$ 门即可逼近（Ross 与 Selinger，2016），在一个加性常数之内已达最优。

::: widget plot
f: log10(3.3219*x)*3.97; log10(3*3.3219*x)
x: 1, 15
y: 0, 8
labels: \log_{10}\bigl((\log_2 1/\varepsilon)^{3.97}\bigr); \log_{10}(3\log_2 1/\varepsilon)
caption: 把一个单量子比特旋转逼近到精度 $\varepsilon = 10^{-x}$（横轴：$x$ 位小数）所需门数的增长，忽略常数因子，纵轴取对数：Solovay–Kitaev 界 $(\log 1/\varepsilon)^{3.97}$ 对比最优 $\{H, T\}$ 综合的 $3\log_2(1/\varepsilon)$。两者都是对数多项式——与 $1/\varepsilon$ 相比微不足道——但在 $10$ 位小数处，差别约是一百万个门对一百个门。
:::

通用性并没有让每个酉矩阵都变便宜。一个计数论证恰好说明相反。

::: proposition 大多数酉矩阵需要指数多个门 {#prop-counting}
固定一个只在至多两个量子比特上作用的有限门集 $G$。对足够小的 $\varepsilon > 0$，存在 $n$ 个量子比特的状态 $\ket\psi$，使得任何把 $\ket{0}^{\otimes n}$ 映到 $\ket\psi$ 的 $\varepsilon$ 邻域内、由 $G$ 中门组成的线路都有 $\Omega\bigl(2^n\log(1/\varepsilon)/\log n\bigr)$ 个门。
:::

::: proof
（概要。）一个含 $m$ 个门的线路由如下方式指定：对每个门，选 $G$ 中一个元素和至多两个量子比特：至多 $(\lvert G\rvert n^2)^m$ 条线路。每条线路产生一个状态，它周围半径 $\varepsilon$ 的球盖住 $\C^{2^n} = \R^{2^{n+1}}$ 的单位球面中至多约 $\varepsilon^{2^{n+1} - 1}$ 的比例（$D - 1 = 2^{n+1} - 1$ 维球面上半径 $\varepsilon$ 的球的表面按 $\varepsilon^{D-1}$ 伸缩）。要盖住整个球面就需要 $(\lvert G\rvert n^2)^m\,\varepsilon^{2^{n+1}-1} \gtrsim 1$，即 $m \gtrsim (2^{n+1} - 1)\log(1/\varepsilon)/\log(\lvert G\rvert n^2) = \Omega(2^n\log(1/\varepsilon)/\log n)$。
:::

所以高效的量子算法稀有而珍贵：它们只对具有多项式规模线路所能利用的结构——周期性、对称性、其他量子系统的物理——的问题存在。

::: warning "量子门同时作用在全部 $2^n$ 个振幅上，所以量子计算机有指数级并行性"
单个门确实要更新 $2^{n-1}$ 对振幅，这正是经典模拟昂贵的原因。但振幅不是输出。一次测量返回按最终分布抽样的 $n$ 个比特，并摧毁状态；Holevo 界（[[quantum-computing/qubits]]）限制了能学到的信息。量子算法只有靠干涉让有用的答案大概率出现才算快。[[#prop-counting]] 展示了反面：大多数酉矩阵无法高效实现，所以大多数"指数并行性"是不可用的。
:::

### 克利福德群

有一个门集值得单独命名。**克利福德**（Clifford）门 $H$、$S$ 与 CNOT 生成**克利福德群**，即在共轭下把泡利算子变为泡利算子的酉变换（[[#eq-hxh]] 中的 $H$ 就是如此）。克利福德线路能制造纠缠，并且是纠错的核心（[[quantum-computing/error-correction]]），但按 **Gottesman–Knill 定理**（1998），作用在 $\ket{0}^{\otimes n}$ 上、随后在计算基下测量的克利福德线路可以在多项式时间内经典模拟。加上任何一个非克利福德门（如 $T$），通用性就恢复了（[[#thm-sk]]）。在容错机器上，克利福德门相对便宜而 $T$ 门昂贵，所以线路的 **$T$ 计数**（$T$-count）是其代价的标准度量。

::: history
可逆计算的研究早于量子计算：Rolf Landauer 于 1961 年论证抹除信息有不可避免的热线代价；Charles Bennett 于 1973 年证明任何计算都可以通过保留历史、再将其反算而变为可逆；Tommaso Toffoli（1980）以及 Edward Fredkin 与 Toffoli（1982）提出了以他们命名的门。Richard Feynman 在 "Quantum mechanical computers"（1985）中描述了用于可逆计算的量子门与线路。David Deutsch 于 1989 年引入量子计算网络——即线路——Andrew Yao（1993）证明了它与量子图灵机等价。Adriano Barenco 与八位合作者于 1995 年确立了 CNOT 加单量子比特门的通用性。Robert Solovay（约 1995 年的未发表工作）与 Alexei Kitaev（1997）证明了如今以二人命名的定理；Christopher Dawson 与 Michael Nielsen 于 2006 年给出标准阐述。Daniel Gottesman 1998 年关于量子计算机 Heisenberg 表示的论文中包含 Gottesman–Knill 定理，该定理同时记名于 Emanuel Knill。
:::

## 后续内容

张量积与贝尔线路直接通向 [[quantum-computing/entanglement]] 中的纠缠、隐形传态与超密编码，我们将用模拟器检验这两个协议。预言机 $U_f$ 与相位反冲是 [[quantum-computing/first-algorithms]] 中查询算法的舞台。受控相位门配合哈达玛门构造出 [[quantum-computing/shor]] 中的量子傅里叶变换。通用性与 [[#lem-errors]] 使类 $\mathsf{BQP}$ 在 [[quantum-computing/quantum-complexity]] 中与门集的选取无关，而克利福德群作为稳定子码的骨架在 [[quantum-computing/error-correction]] 中重现。

::: summary
- 单量子比特门是 $2\times2$ 酉矩阵；至多相差一个全局相位，每个都是布洛赫球的旋转 $R_{\vec n}(\theta)$（[[#thm-rotation]]），且都可写成 $e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$（[[#thm-zyz]]）。
- 关键恒等式：$H\ket0 = \ket+$，$HXH = Z$，$S = T^2$，$Z = S^2$；三个 CNOT 构成 SWAP；哈达玛门使 CNOT 反向。
- 受控-$U$ 能通过**相位反冲**改变控制量子比特，这就是全局相位在受控门内部要紧的原因。
- 线路的矩阵是各门矩阵按相反顺序的乘积；中途测量可以推迟到最后（[[#prop-deferred]]）。
- 每个规模为 $s$ 的经典线路都给出规模为 $O(s)$ 的可逆预言机 $U_f\ket x\ket y = \ket x\ket{y\oplus f(x)}$，前提是把垃圾反算干净（[[#thm-oracle]]）。
- CNOT 加单量子比特门精确通用；$\{H, T, \mathrm{CNOT}\}$ 近似通用，且按 **Solovay–Kitaev**，更换门集只花一个对数多项式因子（[[#thm-sk]]）；门的误差至多线性累加（[[#lem-errors]]）。
- 尽管如此，几乎一切酉矩阵都需要指数多个门（[[#prop-counting]]）；高效量子算法是例外。
:::

## 习题

::: exercise 用哈达玛门作共轭 {level=1}
用矩阵乘法验证 $HZH = X$ 与 $HXH = Z$，并由 $Y = iXZ$ 推出 $HYH = -Y$。
::: solution
$HZ = \tfrac{1}{\sqrt2}\begin{pmatrix}1 & -1\\ 1 & 1\end{pmatrix}$，且 $HZH = \tfrac12\begin{pmatrix}1-1 & 1+1\\ 1+1 & 1-1\end{pmatrix} = X$。在 $HZH = X$ 两边乘 $H$（用 $H^2 = I$）得 $Z = HXH$。又 $Y = iXZ$（验证：$iXZ = i\begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix} = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$），所以 $HYH = i(HXH)(HZH) = iZX = -iXZ = -Y$，因为 $ZX = -XZ$。
:::
:::

::: exercise 相位门 {level=1 check="2"}
多少个 $T$ 门连用等于 $S$ 门？多少个等于 $Z$？（填得到 $S$ 的 $T$ 门个数。）
::: solution
$T^k = P(k\pi/4)$，所以 $T^2 = P(\pi/2) = S$，$T^4 = P(\pi) = Z$。答案是 $2$（$Z$ 对应 $4$；$T^8 = I$）。
:::
:::

::: exercise 换控制位的 CNOT {level=1}
在基 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ 下写出以量子比特 $1$ 为控制、量子比特 $0$ 为目标的 CNOT 的 $4\times4$ 矩阵。
::: solution
它固定 $\ket{00}$ 与 $\ket{10}$（控制位为 $0$），并交换 $\ket{01} \leftrightarrow \ket{11}$。以第 $j$ 列为第 $j$ 个基向量的像来写矩阵，$1$ 位于 $(0,0)$、$(3,1)$、$(2,2)$、$(1,3)$——正是 [[#ex-identities]](c) 中打印的矩阵。
:::
:::

::: exercise 内存墙 {level=1 check="16"}
一个态向量模拟器要存储 $40$ 个量子比特的状态（双精度复数，每个振幅 16 字节），需要多少 tebibyte（TiB，$2^{40}$ 字节）？（填 TiB 数。）
::: solution
$2^{40}$ 个振幅 $\times\ 16$ 字节 $= 16 \times 2^{40}$ 字节 $= 16$ TiB。每多一个量子比特翻一倍；超级计算机上最大的精确态向量模拟已达到四十几比特多一点。
:::
:::

::: exercise 手算 CNOT 的反向 {#ex-reverse-cnot level=2}
证明 $(H\otimes H)\,\mathrm{CNOT}_{0\to1}\,(H\otimes H) = \mathrm{CNOT}_{1\to0}$。（提示：把 CNOT 写成 $\ket0\!\bra0\otimes I + \ket1\!\bra1\otimes X$。）
::: solution
$\ket0\!\bra0 = \tfrac12(I + Z)$，$\ket1\!\bra1 = \tfrac12(I - Z)$，所以 $\mathrm{CNOT}_{0\to1} = \tfrac12(I\otimes I + Z\otimes I + I\otimes X - Z\otimes X)$。对每个张量因子用 $H$ 共轭并使用 [[#eq-hxh]]，得 $\tfrac12(I\otimes I + X\otimes I + I\otimes Z - X\otimes Z)$。重新组合，这就是 $I\otimes\tfrac12(I + Z) + X\otimes\tfrac12(I - Z) = I\otimes\ket0\!\bra0 + X\otimes\ket1\!\bra1$，即恰当量子比特 $1$ 为 $\ket1$ 时对量子比特 $0$ 施加 $X$：$\mathrm{CNOT}_{1\to0}$。
:::
:::

::: exercise 误差预算 {level=1 check="0.1"}
一条线路有 $1000$ 个门，每个门的实现误差不超过算子范数 $10^{-4}$。[[#lem-errors]] 对整条线路的算子范数误差给出什么上界？（填一个小数。）
::: solution
$1000 \times 10^{-4} = 0.1$。测量概率与理想概率之差随后可达 $2 \times 0.1 = 0.2$。实际的误差通常是随机的、部分抵消，但线性界是能保证的下限；更长的计算需要纠错（[[quantum-computing/error-correction]]）。
:::
:::

::: exercise 由 Z–Y 分解构造受控门 {#ex-abc level=2}
设 $U = e^{i\alpha}R_z(\beta)R_y(\gamma)R_z(\delta)$。令 $A = R_z(\beta)R_y(\gamma/2)$、$B = R_y(-\gamma/2)R_z(-(\delta+\beta)/2)$、$C = R_z((\delta - \beta)/2)$。证明 $ABC = I$ 且 $AXBXC = e^{-i\alpha}U$，并由此得到用 CNOT 与单量子比特门构造受控-$U$ 的线路。
::: solution
$ABC = R_z(\beta)R_y(\tfrac\gamma2)R_y(-\tfrac\gamma2)R_z(-\tfrac{\delta+\beta}{2})R_z(\tfrac{\delta-\beta}{2}) = R_z(\beta)R_z(-\beta) = I$。由于 $XR_y(\theta)X = R_y(-\theta)$、$XR_z(\theta)X = R_z(-\theta)$（用 $X$ 共轭是绕 $x$ 的半周旋转，会把 $y$ 和 $z$ 反向），有 $XBX = R_y(\tfrac\gamma2)R_z(\tfrac{\delta+\beta}{2})$。于是 $AXBXC = R_z(\beta)R_y(\tfrac\gamma2)R_y(\tfrac\gamma2)R_z(\tfrac{\delta+\beta}{2})R_z(\tfrac{\delta-\beta}{2}) = R_z(\beta)R_y(\gamma)R_z(\delta) = e^{-i\alpha}U$。线路：对目标位施加 $C$，CNOT，对目标位施加 $B$，CNOT，对目标位施加 $A$，再对控制位施加 $P(\alpha)$。控制位为 $0$ 时目标位收到 $ABC = I$；为 $1$ 时收到 $AXBXC = e^{-i\alpha}U$，而 $P(\alpha)$ 恰好在这一分支上补上缺少的 $e^{i\alpha}$。这就是两个 CNOT 加四个单量子比特门。
:::
:::

::: exercise 相位反冲 {level=2}
设 $U$ 是有特征向量 $\ket u$ 的单量子比特酉矩阵，$U\ket u = e^{2\pi i\varphi}\ket u$。证明线路"控制位加 $H$；受控-$U$；控制位加 $H$"作用在 $\ket0\ket u$ 上后，控制位测得 $0$ 的概率为 $\cos^2(\pi\varphi)$。这测量的是什么，精度如何？
::: solution
$H$：$\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket u$。带反冲的受控-$U$：$\tfrac{1}{\sqrt2}(\ket0 + e^{2\pi i\varphi}\ket1)\ket u$。$H$：$\tfrac12\bigl((1 + e^{2\pi i\varphi})\ket0 + (1 - e^{2\pi i\varphi})\ket1\bigr)\ket u$。所以 $\Prob(0) = \tfrac14\abs{1 + e^{2\pi i\varphi}}^2 = \tfrac14(2 + 2\cos 2\pi\varphi) = \cos^2(\pi\varphi)$。这个电路估计特征相位 $\varphi$，但只能通过一枚偏倚为 $\cos^2(\pi\varphi)$ 的硬币：重复 $k$ 次给出的 $\varphi$ 精度约为 $1/\sqrt k$。[[quantum-computing/shor]] 将说明用多个控制量子比特加量子傅里叶变换的相位估计如何以 $O(t)$ 个控制量子比特高概率得到 $\varphi$ 的 $t$ 比特。
:::
:::

::: exercise 有多少条线路？ {level=3}
把 [[#prop-counting]] 的计数论证只对单量子比特门展开：若 $G$ 有 $g$ 个门，长度不超过 $m$ 的不同乘积有多少个？要把布洛赫球逼近到精度 $\varepsilon$，$m$ 需满足什么下界？与 Solovay–Kitaev 上界比较。
::: solution
乘积至多 $g + g^2 + \dots + g^m \le g^{m+1}$ 个。每个乘积近似的是布洛赫球（一个二维球面）上某一点附近距离约 $\varepsilon$ 的点集，即 $4\pi$ 中面积为 $O(\varepsilon^2)$ 的球冠。要盖住球面需要 $g^{m+1}\cdot O(\varepsilon^2) \ge 4\pi$，所以 $m \ge 2\log(1/\varepsilon)/\log g - O(1) = \Omega(\log(1/\varepsilon))$。（若逼近的酉矩阵而非状态——三维群 $\mathrm{SU}(2)$——得到 $3\log(1/\varepsilon)/\log g$，这就是 Ross–Selinger 的 $3\log_2(1/\varepsilon)$ 中常数 $3$ 的来历。）Solovay–Kitaev 定理给出 $O(\log^{3.97}(1/\varepsilon))$，是对数多项式而非 $\log(1/\varepsilon)$ 的线性；对 $\{H, T\}$ 这类特殊门集，数论算法在常数因子内达到线性下界。
:::
:::

::: exercise 实现 ABC 构造 {level=3}
用 `qsim.py`，按 [[#ex-abc]] 与 [[#ex-h-decomp]] 的分解，用两个 CNOT 和单量子比特门实现受控-$H$，并在全部四个基状态上与 `apply(s, H, 1, controls=(0,))` 核对。
::: solution
由 [[#ex-h-decomp]]，$\alpha = \pi/2$、$\beta = 0$、$\gamma = \pi/2$、$\delta = \pi$，所以 $A = R_y(\pi/4)$、$B = R_y(-\pi/4)R_z(-\pi/2)$、$C = R_z(\pi/2)$。

```python
from qsim import *
def Ry(t): return [[math.cos(t/2), -math.sin(t/2)], [math.sin(t/2), math.cos(t/2)]]
def Rz(t): return [[cmath.exp(-1j*t/2), 0], [0, cmath.exp(1j*t/2)]]
def mul(A, B): return [[sum(A[i][k]*B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
A, B, C = Ry(math.pi/4), mul(Ry(-math.pi/4), Rz(-math.pi/2)), Rz(math.pi/2)
def controlled_h(s):                      # 控制量子比特 0，目标量子比特 1
    apply(s, C, 1); apply(s, X, 1, controls=(0,))
    apply(s, B, 1); apply(s, X, 1, controls=(0,))
    apply(s, A, 1); apply(s, P(math.pi/2), 0)
worst = 0
for j in range(4):
    s = [0j]*4; s[j] = 1; controlled_h(s)
    t = [0j]*4; t[j] = 1; apply(t, H, 1, controls=(0,))
    worst = max(worst, max(abs(a - b) for a, b in zip(s, t)))
print("largest amplitude difference:", f"{worst:.1e}")
```

```console
$ python3 controlled_h.py
largest amplitude difference: 1.8e-16
```

两条线路在每个基状态上都在舍入误差内一致，因而由线性性在处处一致。若省去最后的 $P(\pi/2)$，最大差异变为 $1.0$：$H$ 的"全局"相位在受控门内部并不全局。
:::
:::
