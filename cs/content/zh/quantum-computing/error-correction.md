每一个物理量子比特都是漏的。杂散的电磁场会使它转动，不完美的脉冲会把它转过头或转不到位，而它的环境——声子、二能级缺陷、测量装置本身——会慢慢"学到"它的状态，并在学习的过程中破坏它的叠加。在 2026 年最好的硬件上，一个两量子比特门大约每几百到几千次操作失败一次。对 $2048$ 比特的数运行肖尔（Shor）算法需要数十亿个门。若没有某种在错误发生时即时纠正的方法，量子计算机永远不可能运行它。

经典计算机用冗余保护信息——存三份，取多数表决。长久以来，人们以为量子信息无法这样保护：复制被不可克隆定理（[[quantum-computing/entanglement#thm-no-cloning]]）禁止；去看量子比特做检验会破坏叠加；而错误是连续的——可以转任意小的角度——不是离散的比特翻转。1995 年，肖尔（Shor）证明这三个障碍都能克服；两年之内，**阈值定理**证明只要噪声低于某个常数阈值，用带噪声的部件就能实现任意长的量子计算。本章解释这是如何做到的。我们先需要一套描述噪声的语言：**密度矩阵**与**量子信道**。然后构造三量子比特的比特翻转码与相位翻转码、肖尔（Shor）的九量子比特码，以及描述几乎一切在用的码（包括表面码）的**稳定子形式体系**；并陈述阈值定理。每个码都用 `qsim.py` 模拟（[[quantum-computing/quantum-circuits]]）。

## 密度矩阵

态向量描述的是我们完全了解的系统。若一个量子比特以概率 $p_i$ 处于状态 $\ket{\psi_i}$——因为制备设备不可靠，或因为这个量子比特与我们看不到的东西纠缠——就没有单个向量能描述一切测量的统计。一个矩阵可以。

::: definition 密度矩阵 {#def-density}
**系综** $\{(p_i, \ket{\psi_i})\}$（和为 $1$ 的概率 $p_i$，单位向量 $\ket{\psi_i}$）的**密度矩阵**为
$$
\rho = \sum_i p_i\ket{\psi_i}\!\bra{\psi_i}.
$$
一个矩阵是某个系综的密度矩阵，当且仅当它是 Hermitian 的、半正定的（对一切 $\ket v$ 有 $\bra v\rho\ket v\ge0$）且迹为 $1$。若 $\rho = \ket\psi\!\bra\psi$ 对应单个向量，则称状态为**纯**的，这等价于 $\tr\rho^2 = 1$；否则它是**混合**的，$\tr\rho^2 < 1$。
:::

[[quantum-computing/qubits#def-postulates]] 的全部公理都可以照搬。投影测量 $\{P_k\}$ 以概率 $\tr(P_k\rho)$ 给出结果 $k$——即对系综中各 $\bra{\psi_i}P_k\ket{\psi_i}$ 取平均——并把状态留为 $P_k\rho P_k/\tr(P_k\rho)$；酉变换把 $\rho\mapsto U\rho U^\dagger$；可观测量 $A$ 的期望为 $\tr(A\rho)$。密度矩阵相同的两个系综对每个实验给出完全相同的统计，所以密度矩阵*就是*状态。对单个量子比特，[[quantum-computing/qubits#prop-overlap]] 的投影算子公式推广为
$$
\rho = \tfrac12\bigl(I + r_xX + r_yY + r_zZ\bigr), \qquad \abs{\vec r}\le 1, \qquad \tr\rho^2 = \tfrac12(1 + \abs{\vec r}^2),
$$ {#eq-bloch-ball}
其中 $r_j = \tr(\rho\sigma_j)$：混合态填满布洛赫球的内部，即**布洛赫球体**，纯态在球面上，**极大混合态** $I/2$ 在球心。

这解决了 [[quantum-computing/qubits]] 中那个警告：叠加态 $\ket+$ 的 $\rho = \tfrac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$（布洛赫向量 $\hat x$），$\ket0$ 与 $\ket1$ 的五五开混合的 $\rho = \tfrac12 I$（球心）。两者的对角元——计算基下的概率——相同；非对角元，称为**相干项**，才是二者的区别所在。

### 子系统

纠缠是混合性的另一个来源。若 $AB$ 处于状态 $\rho_{AB}$，只测 $A$ 的统计由**约化密度矩阵** $\rho_A = \tr_B\rho_{AB}$ 给出，其中**偏迹**（partial trace）是满足 $\tr_B(\ket a\!\bra{a'}\otimes\ket b\!\bra{b'}) = \ket a\!\bra{a'}\,\braket{b'|b}$ 的线性映射。（它由这一性质唯一确定：对 $A$ 上每个可观测量 $M$ 都有 $\tr(\rho_A M) = \tr(\rho_{AB}(M\otimes I))$。）

::: example 贝尔对的一半 {#ex-reduced}
计算 $\ket{\Phi^+}$ 的任一量子比特的约化状态，以及乘积态 $\ket+\ket0$ 中量子比特 $0$ 的约化状态。
::: solution
$\ket{\Phi^+}\!\bra{\Phi^+} = \tfrac12(\ket{00}\!\bra{00} + \ket{00}\!\bra{11} + \ket{11}\!\bra{00} + \ket{11}\!\bra{11})$。对量子比特 $1$ 求偏迹，交叉项因 $\braket{1|0} = 0$ 而消失，剩下 $\tfrac12(\ket0\!\bra0 + \ket1\!\bra1) = I/2$：极大混合，布洛赫向量为 $0$。贝尔对的两半各自都是最随机的，这就是隐形传态中经典比特到达之前 Bob 的量子比特不带任何信息的原因（[[quantum-computing/entanglement#thm-teleport]]）。对 $\ket+\ket0$，$\rho = \ket+\!\bra+\otimes\ket0\!\bra0$，偏迹给出 $\ket+\!\bra+$：纯态。一般地，$AB$ 的纯态是乘积态当且仅当 $\rho_A$ 是纯的，且 $\rho_A$ 的特征值就是施密特（Schmidt）系数的平方（[[quantum-computing/entanglement#thm-schmidt]]）。同样的计算见[物理图谱：纠缠](/learn/physics/lesson.php?c=quantum-2&l=entanglement)。
:::
:::

## 噪声作为量子信道

一个带噪声的过程——偶尔误动作的门、与环境耦合的量子比特——把密度矩阵线性地映为密度矩阵。这种映射的一般形式是**量子信道**。

::: definition 量子信道（Kraus 形式） {#def-channel}
$d$ 维系统上的**量子信道**是如下映射
$$
\mathcal E(\rho) = \sum_k E_k\rho E_k^\dagger, \qquad \sum_k E_k^\dagger E_k = I,
$$
其中 $E_k$ 是某个 $d\times d$ 的 **Kraus 算子**。每个信道都可以这样得到：让系统与一个从固定状态出发的环境作酉相互作用，然后把环境求偏迹掉；反过来也成立（Stinespring 与 Kraus）。
:::

完备性条件保证 $\tr\mathcal E(\rho) = \tr\rho$。把 $E_k\rho E_k^\dagger$ 读作"事件 $k$ 发生了，概率为 $\tr(E_k\rho E_k^\dagger)$"。标准的单量子比特信道：

| 信道 | Kraus 算子 | 对布洛赫向量 $(r_x, r_y, r_z)$ 的作用 |
|---|---|---|
| 比特翻转，概率 $p$ | $\sqrt{1-p}\,I$、$\sqrt p\,X$ | $(r_x,\ (1-2p)r_y,\ (1-2p)r_z)$ |
| 相位翻转（退相位） | $\sqrt{1-p}\,I$、$\sqrt p\,Z$ | $((1-2p)r_x,\ (1-2p)r_y,\ r_z)$ |
| 去极化 | $\sqrt{1-p}\,I$、$\sqrt{p/3}\,X$、$\sqrt{p/3}\,Y$、$\sqrt{p/3}\,Z$ | $(1 - \tfrac43p)\,\vec r$ |
| 振幅阻尼，率 $\gamma$ | $\begin{pmatrix}1&0\\0&\sqrt{1-\gamma}\end{pmatrix}$、$\begin{pmatrix}0&\sqrt\gamma\\0&0\end{pmatrix}$ | $(\sqrt{1-\gamma}\,r_x,\ \sqrt{1-\gamma}\,r_y,\ \gamma + (1-\gamma)r_z)$ |

::: proposition 泡利信道压缩布洛赫球 {#prop-pauli-channel}
用泡利矩阵 $P\in\{X, Y, Z\}$ 作共轭，会翻转布洛赫的两个分量——除 $P$ 自己的那个之外全部翻转。因此比特翻转、相位翻转与去极化信道对布洛赫向量的作用如表中所示。
:::

::: proof
由反交换关系（[[quantum-computing/qubits]] 泡利矩阵的习题），$XXX = X$ 而 $XYX = -Y$、$XZX = -Z$，对 $Y$ 与 $Z$ 类似。所以 $X\rho X = \tfrac12(I + r_xX - r_yY - r_zZ)$。比特翻转信道给出 $(1-p)\rho + pX\rho X = \tfrac12(I + r_xX + (1-2p)r_yY + (1-2p)r_zZ)$；退相位把 $Z$ 代入同理。对去极化信道，每个分量 $r_j$ 被三个泡利矩阵中的一个保持、被另外两个翻转，于是变成 $(1-p)r_j + \tfrac p3(r_j - r_j - r_j) = (1 - \tfrac{4p}{3})r_j$。
:::

振幅阻尼刻画能量流失——激发态原子辐射光子、超导量子比特从 $\ket1$ 弛豫回 $\ket0$——它把所有状态都拉向 $\ket0$，即北极。退相位刻画随机的相位冲击：粒子数不变，但相干项被消灭。随时间反复发生就得到硬件的两项标准品质指标：**弛豫时间** $T_1$，满足 $\Prob(\ket1\text{ 未弛豫}) = e^{-t/T_1}$；**退相位时间** $T_2$，相干项按 $e^{-t/T_2}$ 衰减；只有振幅阻尼时 $T_2 = 2T_1$，额外的退相位使 $T_2$ 更短。

::: widget plot
f: exp(-x/a); exp(-x/b); 1 - 2*exp(-x/a)
x: 0, 400
y: -1, 1
sliders: a=100:10:500:10; b=80:10:500:10
labels: \Prob(\ket1 \text{ 未弛豫}) = e^{-t/T_1}; r_x(t) = e^{-t/T_2}; r_z(t)
caption: 量子比特随时间 $t$（微秒）的退相干，$T_1 = a$、$T_2 = b$（滑块；物理上 $T_2 \le 2T_1$）。制备在 $\ket1$ 的量子比特向 $\ket0$ 弛豫，其 $z$ 分量从 $-1$ 升到 $+1$；制备在 $\ket+$ 的量子比特失去 $x$ 分量。设门时约 $50$ ns、$T_1, T_2$ 在 $100$ µs 量级——2020 年代中期超导量子比特的典型量级——一个相干时间内塞得下几千个门，远不够大算法所需。
:::

::: example 让叠加态退相位 {#ex-dephase}
一个处于 $\ket+$ 的量子比特通过 $p = 0.1$ 的相位翻转信道，然后在 $X$ 基下测量。得到结果 $+$ 的概率是多少？状态的纯度是多少？
::: solution
由 [[#prop-pauli-channel]]，布洛赫向量 $(1, 0, 0)$ 变成 $(0.8, 0, 0)$，所以由 [[#eq-bloch-ball]]，$\rho = \tfrac12(I + 0.8X)$。结果 $+$ 的概率为 $\tr(\ket+\!\bra+\rho) = \tfrac12(1 + 0.8) = 0.9$——等价地说，量子比特以概率 $0.1$ 被 $Z$ 击中（把 $\ket+$ 变成 $\ket-$）。纯度为 $\tr\rho^2 = \tfrac12(1 + 0.64) = 0.82 < 1$。而计算基下的测量仍以概率各 $1/2$ 给出 $0$ 与 $1$：退相位在 $Z$ 基下是不可见的，这正是经典错误模型（只有比特翻转）会漏掉一半问题的原因。
:::
:::

## 三量子比特码

### 比特翻转码

首先假设唯一的错误是比特翻转 $X$，独立地以概率 $p$ 作用在每个量子比特上。把一个逻辑量子比特编码进三个物理量子比特：
$$
\alpha\ket0 + \beta\ket1\ \mapsto\ \alpha\ket{000} + \beta\ket{111},
$$
用两个从数据量子比特出发、靶向两个处于 $\ket0$ 的新量子比特的 CNOT 即可。这不是复制：结果不是 $(\alpha\ket0 + \beta\ket1)^{\otimes3}$，而是一个纠缠态，位于由**逻辑基** $\ket{0_L} = \ket{000}$ 与 $\ket{1_L} = \ket{111}$ 张成的二维**码空间**中。

量子比特 $j$ 上的翻转把状态移入一个正交子空间：$X_1$ 给出 $\alpha\ket{100} + \beta\ket{011}$，等等。要弄清是哪一位，绝不能测量量子比特——那会坍缩叠加——只能测量**宇称** $Z_1Z_2$ 与 $Z_2Z_3$（可观测量 $Z\otimes Z\otimes I$ 与 $I\otimes Z\otimes Z$，当两位相同时本征值为 $+1$）。码空间中的每个状态、以及从它经单次翻转到达的每个状态，都是这两者的本征态，所以测量它们能在不打扰编码振幅的前提下暴露**伴随式**（syndrome）。

| 错误 | 状态 | $Z_1Z_2$ | $Z_2Z_3$ | 纠正 |
|---|---|---|---|---|
| 无 | $\alpha\ket{000} + \beta\ket{111}$ | $+1$ | $+1$ | 无 |
| $X_1$ | $\alpha\ket{100} + \beta\ket{011}$ | $-1$ | $+1$ | $X_1$ |
| $X_2$ | $\alpha\ket{010} + \beta\ket{101}$ | $-1$ | $-1$ | $X_2$ |
| $X_3$ | $\alpha\ket{001} + \beta\ket{110}$ | $+1$ | $-1$ | $X_3$ |

在线路里，每个宇称由两个从数据量子比特到 $\ket0$ 辅助量子比特的 CNOT 测出，然后测量该辅助量子比特：它最终处于 $\ket{b_1\oplus b_2}$，只依赖于宇称，不依赖于编码振幅。

::: theorem 比特翻转码 {#thm-bitflip}
只要三个量子比特中至多一个发生比特翻转，带伴随式测量与纠正的三量子比特码就能精确恢复编码状态。若每个量子比特独立翻转的概率为 $p$，则逻辑状态以概率 $3p^2 - 2p^3$ 被破坏，只要 $p < 1/2$ 它就小于 $p$。
:::

::: proof
由表格，每次单次翻转以及无翻转都给出互异的伴随式，纠正把状态映回 $\alpha\ket{000} + \beta\ket{111}$；伴随式测量本身不改变状态，因为它是两个宇称的本征态。若两个或三个量子比特翻转，伴随式与"互补"的单次翻转相同（例如 $X_1X_2$ 给出 $X_3$ 的伴随式），于是"纠正"产生 $\alpha\ket{111} + \beta\ket{000}$，即一次逻辑比特翻转。两个以上翻转的概率是 $\binom32p^2(1-p) + p^3 = 3p^2 - 2p^3$。最后，当 $0 < p < 1/2$ 时 $p - (3p^2 - 2p^3) = p(1 - p)(1 - 2p) > 0$。
:::

下面的模拟给模拟器加上一个模块 `stab.py`，用于测量泡利可观测量 $P$（形如 `ZZI` 的"单词"）：本征值 $\pm1$ 的投影算子是 $(I\pm P)/2$，所以结果 $+1$ 的概率为 $\norm{(I + P)\psi/2}^2$，状态相应地被投影。

```python
# stab.py - 建立在 qsim 之上的泡利算子与稳定子测量
from qsim import *
PAULI = {"I": [[1, 0], [0, 1]], "X": X, "Y": Y, "Z": Z}

def apply_pauli(s, word):                  # word 形如 "ZZI"：每个量子比特一个字母
    for q, p in enumerate(word):
        if p != "I": apply(s, PAULI[p], q)

def measure_pauli(s, word, rng):           # 测量可观测量 P = word（本征值 +-1）
    t = s[:]; apply_pauli(t, word)         # t = P s
    plus = [(a + b) / 2 for a, b in zip(s, t)]          # (I + P)/2 s
    p_plus = sum(abs(a) ** 2 for a in plus)
    outcome = +1 if rng.random() < p_plus else -1
    proj = plus if outcome == +1 else [(a - b) / 2 for a, b in zip(s, t)]
    norm = math.sqrt(p_plus if outcome == +1 else 1 - p_plus)
    s[:] = [a / norm for a in proj]
    return outcome

def fidelity(s, t): return abs(sum(a.conjugate() * b for a, b in zip(s, t))) ** 2
```

```python
from stab import *

def encode(alpha, beta):                   # alpha|000> + beta|111>
    s = [0j] * 8; s[0], s[7] = alpha, beta; return s

SYNDROME = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}   # 该翻转哪个量子比特

def trial(p, rng, alpha=0.6, beta=0.8j):
    s = encode(alpha, beta)
    for q in range(3):                     # 以概率 p 独立比特翻转
        if rng.random() < p: apply(s, X, q)
    syn = (measure_pauli(s, "ZZI", rng), measure_pauli(s, "IZZ", rng))
    if SYNDROME[syn] is not None: apply(s, X, SYNDROME[syn])
    return fidelity(s, encode(alpha, beta)) > 0.5      # 逻辑状态恢复了吗？

rng = random.Random(2026)
for p in (0.01, 0.05, 0.1, 0.2, 0.5):
    shots = 20000
    fail = sum(not trial(p, rng) for _ in range(shots)) / shots
    print(f"p = {p:4}: logical failure {fail:.4f}   3p^2 - 2p^3 = {3*p*p - 2*p**3:.4f}")
```

```console
$ python3 bitflip.py
p = 0.01: logical failure 0.0005   3p^2 - 2p^3 = 0.0003
p = 0.05: logical failure 0.0072   3p^2 - 2p^3 = 0.0073
p =  0.1: logical failure 0.0293   3p^2 - 2p^3 = 0.0280
p =  0.2: logical failure 0.1055   3p^2 - 2p^3 = 0.1040
p =  0.5: logical failure 0.5039   3p^2 - 2p^3 = 0.5000
```

蒙特卡洛估计与 [[#thm-bitflip]] 在抽样误差内一致（$p = 0.01$ 时 $20\,000$ 次试验预期约 $6$ 次失败，实际看到 $10$ 次）。纠正后的保真度恰好是 $1$ 或恰好是 $0$——这个码把任意错误模式变成"什么都没有"或一次逻辑 $X$，非此即彼。

### 相位翻转码

相位翻转 $Z$ 没有经典类比，但在哈达玛基下它*就是*比特翻转：$Z\ket\pm = \ket\mp$。所以编码 $\alpha\ket0 + \beta\ket1\mapsto\alpha\ket{+++} + \beta\ket{---}$（比特翻转编码器之后对全部三个量子比特施加 $H$），测量宇称 $X_1X_2$ 与 $X_2X_3$，并在指示的量子比特上用 $Z$ 纠正。这个**相位翻转码**以同样的失败概率 $3p^2 - 2p^3$ 纠正任何单次 $Z$ 错误——但面对比特翻转它无能为力，它把比特翻转看作逻辑相位错误，恰如比特翻转码面对相位翻转无能为力（[[#ex-wrong-code]]）。

::: widget plot
f: x; 3*x^2 - 2*x^3; 3*(3*x^2 - 2*x^3)^2 - 2*(3*x^2 - 2*x^3)^3
x: 0, 0.6
y: 0, 0.6
labels: \text{未编码 } p; \text{一级编码：} 3p^2 - 2p^3; \text{两级（码之码）}
caption: 比特翻转码的逻辑错误概率，对以概率 $p$ 独立翻转的噪声。$p = 1/2$ 以下编码有用，且 $p$ 小时改善惊人：$p = 0.01$ 时逻辑错误率为 $3\times10^{-4}$。把三个量子比特再各自编一次同样的码（**级联**（concatenation）两级，九个量子比特）得到第三条曲线，$p = 0.01$ 时约 $2.7\times10^{-7}$。交点 $p = 1/2$ 是这个玩具模型的**阈值**。
:::

## 肖尔的九量子比特码

把两个码合起来就能同时防范两种错误。肖尔（Shor）码先对相位翻转编码，再把三个量子比特各自对比特翻转编码：
$$
\ket{0_L} = \frac{(\ket{000} + \ket{111})^{\otimes3}}{2\sqrt2}, \qquad \ket{1_L} = \frac{(\ket{000} - \ket{111})^{\otimes3}}{2\sqrt2}.
$$ {#eq-shor-code}
三个一组的一块内的一次比特翻转，用该块的两个宇称 $Z_iZ_j$ 诊断，如比特翻转码。一个块内任何量子比特上的相位翻转改变该块的符号，$\ket{000}\pm\ket{111}\to\ket{000}\mp\ket{111}$，用相邻块符号的比较来诊断，也就是测量 $X_1X_2X_3X_4X_5X_6$ 与 $X_4X_5X_6X_7X_8X_9$；纠正只需在块内任一量子比特上施加 $Z$。$Y = iXZ$ 错误会同时触发两类诊断。所以这个码能纠正任何单个量子比特上的 $X$、$Y$ 与 $Z$。出奇的是，这就足以纠正*每一个*单量子比特错误。

::: theorem 错误的离散化 {#thm-discretise}
若一个带有伴随式测量与纠正程序的码能纠正量子比特 $j$ 上的错误 $I$、$X_j$、$Y_j$、$Z_j$（各自映到互异的伴随式，或映到纠正能将其抵消的伴随式），则它能纠正任何只作用在量子比特 $j$ 上的错误：任何酉算子，乃至任何 Kraus 算子作用在量子比特 $j$ 上的信道。
:::

::: proof
四个矩阵 $I, X, Y, Z$ 构成 $2\times2$ 复矩阵空间的一组基，所以量子比特 $j$ 上的任何算子都可写成 $E = e_0I + e_1X_j + e_2Y_j + e_3Z_j$。作用在编码态 $\ket{\psi_L}$ 上，它给出叠加 $e_0\ket{\psi_L} + e_1X_j\ket{\psi_L} + e_2Y_j\ket{\psi_L} + e_3Z_j\ket{\psi_L}$。这四项位于属于不同伴随式的伴随式可观测量的本征空间中（或者，若两个错误共享一个伴随式，同一个纠正对二者都管用）。测量伴随式是向这些本征空间的投影测量，于是把叠加**坍缩**到其中一项——比如说 $X_j\ket{\psi_L}$，差一个归一化——而该伴随式对应的纠正恢复 $\ket{\psi_L}$。无论结果如何，最终状态都是 $\ket{\psi_L}$。对 Kraus 算子作用在量子比特 $j$ 上的信道，把上述论证用于每个 $\ket{\psi_L}$-分支 $E_k\ket{\psi_L}$：每个分支都恢复为 $\ket{\psi_L}$，所以输出为 $\sum_k p_k\ket{\psi_L}\!\bra{\psi_L} = \ket{\psi_L}\!\bra{\psi_L}$。
:::

这就是量子纠错概念上的核心：伴随式测量把连续的错误变成离散的，而且它只暴露*哪个*错误发生了，绝不泄露编码的振幅。下面的模拟对肖尔（Shor）码的一个随机量子比特施加一个随机的单量子比特酉算子并加以纠正。

::: example 肖尔码纠正任意错误 {#ex-shor-code}
把 $0.6\ket0 + 0.8e^{0.7i}\ket1$ 编进肖尔（Shor）码，对一个随机量子比特施加随机单量子比特酉算子，测量八个伴随式可观测量，纠正，并与理想编码态比较。
::: solution
八个可观测量是块内的六个宇称 $Z_iZ_{i+1}$ 与两个六量子比特的 $X$ 检验。比特翻转逐块纠正；$X$ 检验定位符号错误的块，用该块第一个量子比特上的 $Z$ 纠正。

```python
from stab import *

def shor_encode(alpha, beta):              # |0_L> = (|000>+|111>)^3 / 2^(3/2)，|1_L> 带负号
    s = zeros(9); s[0], s[256] = alpha, beta    # 量子比特 0 上 alpha|0> + beta|1>
    apply(s, X, 3, controls=(0,)); apply(s, X, 6, controls=(0,))
    for b in (0, 3, 6):
        apply(s, H, b); apply(s, X, b + 1, controls=(b,)); apply(s, X, b + 2, controls=(b,))
    return s

Z_CHECKS = ["ZZIIIIIII", "IZZIIIIII", "IIIZZIIII", "IIIIZZIII", "IIIIIIZZI", "IIIIIIIZZ"]
X_CHECKS = ["XXXXXXIII", "IIIXXXXXX"]
FLIP = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}

def correct(s, rng):
    syn = [measure_pauli(s, w, rng) for w in Z_CHECKS + X_CHECKS]
    for block in range(3):                 # 比特翻转：每块内部取多数
        q = FLIP[(syn[2 * block], syn[2 * block + 1])]
        if q is not None: apply(s, X, 3 * block + q)
    q = FLIP[(syn[6], syn[7])]             # 相位翻转：哪个块符号错了
    if q is not None: apply(s, Z, 3 * q)
    return syn

def random_unitary(rng):                   # 随机的单量子比特门，e^{ia} Rz Ry Rz
    a, b, c, d = (rng.uniform(0, 2 * math.pi) for _ in range(4))
    Rz = lambda t: [[cmath.exp(-1j * t / 2), 0], [0, cmath.exp(1j * t / 2)]]
    Ry = [[math.cos(c / 2), -math.sin(c / 2)], [math.sin(c / 2), math.cos(c / 2)]]
    m = lambda A, B: [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
    return [[cmath.exp(1j * a) * x for x in row] for row in m(m(Rz(b), Ry), Rz(d))]

rng = random.Random(9)
alpha, beta = 0.6, 0.8 * cmath.exp(0.7j)
ideal = shor_encode(alpha, beta)
for trial in range(5):
    s = ideal[:]; q = rng.randrange(9); apply(s, random_unitary(rng), q)
    before = fidelity(s, ideal)
    syn = correct(s, rng)
    print(f"error on qubit {q}: fidelity before {before:.3f}, syndrome "
          f"{''.join('+' if x > 0 else '-' for x in syn)}, after {fidelity(s, ideal):.6f}")
```

```console
$ python3 shor9.py
error on qubit 7: fidelity before 0.674, syndrome ++++--++, after 1.000000
error on qubit 7: fidelity before 0.005, syndrome +++++++-, after 1.000000
error on qubit 3: fidelity before 0.041, syndrome ++-+++--, after 1.000000
error on qubit 6: fidelity before 0.463, syndrome +++++++-, after 1.000000
error on qubit 2: fidelity before 0.002, syndrome ++++++-+, after 1.000000
```

每次试验中错误都降低了保真度——最后一次降到 $0.002$——而伴随式测量与纠正之后，保真度精确到六位小数是 $1$。伴随式显示出离散化正在起作用：第一次试验坍缩到量子比特 $7$ 上的比特翻转（第 $3$ 块的两个宇称读出 $-, -$），第二次坍缩到第 $3$ 块内的一次相位翻转（最后一个 $X$ 检验读 $-$），第三次坍缩到量子比特 $3$ 上的 $Y$ 错误（比特翻转与相位翻转两种伴随式同时出现）。同一个量子比特上的同一个酉算子，在不同次运行中可以坍缩成不同的泡利错误；每一种都被纠正。
:::
:::

## 稳定子形式体系

上面的宇称检验全是泡利矩阵的乘积，而码空间是它们的公共 $+1$ 本征空间。Daniel Gottesman 把这变成了定义。

::: definition 稳定子码 {#def-stabiliser}
$n$ 个量子比特上的**泡利群** $\mathcal P_n$ 由形如 $P_1\otimes\dots\otimes P_n$（$P_j\in\{I, X, Y, Z\}$）再乘以相位 $\pm1, \pm i$ 的张量积组成；任意两个元素或交换或反交换。**稳定子群**是不含 $-I$ 的交换子群 $\mathcal S\subseteq\mathcal P_n$，由 $n - k$ 个独立元素 $g_1, \dots, g_{n-k}$ 生成。其**码空间**为
$$
\mathcal C(\mathcal S) = \set{\ket\psi : g\ket\psi = \ket\psi \text{ 对一切 } g\in\mathcal S}.
$$
一个 $[[n, k, d]]$ **稳定子码**把 $k$ 个逻辑量子比特编进 $n$ 个物理量子比特；其**距离** $d$ 是与 $\mathcal S$ 的每个元素交换、但自身（相差相位）不属于 $\mathcal S$ 的泡利算子的最小重量（非单位因子的个数）——即一个非平凡**逻辑算子**的最小重量。
:::

比特翻转码是 $\mathcal S = \langle ZZI, IZZ\rangle$，一个 $[[3, 1, 1]]$ 码（它的逻辑 $Z$，即 $ZII$，重量为 $1$，这就是它不能纠正相位翻转的原因）。肖尔（Shor）码以例中测量的八个生成元定义，是 $[[9, 1, 3]]$。

::: theorem 稳定子码的基本事实 {#thm-stabiliser}
(a) $[[n, k, d]]$ 稳定子码的码空间维数为 $2^k$。(b) 与生成元 $g_i$ 反交换的泡利错误 $E$ 在任何码状态上都会翻转测量 $g_i$ 的结果，而**伴随式**——满足 $Eg_i = s_ig_iE$ 的符号串 $s_i = \pm1$——只依赖于 $E$，不依赖于编码状态。(c) 距离为 $d$ 的码能检出每个重量小于 $d$ 的泡利错误，纠正每个重量不超过 $t = \lfloor(d-1)/2\rfloor$ 的泡利错误（从而，由推广到 $t$ 个量子比特的 [[#thm-discretise]]，纠正作用在至多 $t$ 个量子比特上的任何错误）。
:::

::: proof
(a) $g_i$ 的 $+1$ 本征空间的投影算子是 $(I + g_i)/2$，且生成元相互交换，所以 $\mathcal C$ 上的投影算子是 $\Pi = \prod_{i=1}^{n-k}\frac{I + g_i}{2} = \frac{1}{2^{n-k}}\sum_{g\in\mathcal S}g$（由独立性，展开乘积时 $2^{n-k}$ 个群元素各出现一次）。除 $\pm I$ 外每个泡利算子的迹为 $0$，而 $-I\notin\mathcal S$，所以 $\dim\mathcal C = \tr\Pi = 2^{-(n-k)}\tr I = 2^{-(n-k)}2^n = 2^k$。

(b) 对 $\ket\psi\in\mathcal C$，$g_iE\ket\psi = s_iEg_i\ket\psi = s_iE\ket\psi$，所以 $E\ket\psi$ 是 $g_i$ 的属于本征值 $s_i$ 的本征向量，与 $\ket\psi$ 无关。

(c) 若 $E$ 重量 $< d$ 且与每个生成元交换，则由距离的定义 $E$ 相差一个相位属于 $\mathcal S$，于是它在码空间上平凡作用（只是一个相位）：无害。否则它与某个生成元反交换，给出非平凡伴随式：被检出。至于纠正，设 $E_1, E_2$ 重量都 $\le t$ 且伴随式相同。则 $E_2^\dagger E_1$ 与每个生成元交换且重量 $\le 2t < d$，所以相差一个相位属于 $\mathcal S$：对每个码状态有 $E_1\ket\psi = cE_2\ket\psi$。于是施加 $E_2^\dagger$——该伴随式选定的纠正——也恰好（至多差一个全局相位）抵消了 $E_1$。
:::

(c) 部分是一般 **Knill–Laflamme 条件**（1997）的特例：投影算子为 $\Pi$ 的码能纠正错误集 $\{E_a\}$，当且仅当存在数 $c_{ab}$ 使 $\Pi E_a^\dagger E_b\Pi = c_{ab}\Pi$——错误不得区分码状态。重要的稳定子码包括：

- **Steane 码** $[[7, 1, 3]]$（1996），由经典 $[7, 4]$ 汉明码构造：三个 $X$ 型与三个 $Z$ 型生成元，各对应汉明校验矩阵的一行。它的逻辑 $H$、$S$ 与 CNOT 是**横截的**（transversal）——逐量子比特施加，所以单个故障的门不会在一个块内传播错误；
- **五量子比特码** $[[5, 1, 3]]$（Laflamme、Miquel、Paz 与 Zurek；Bennett、DiVincenzo、Smolin 与 Wootters；1996），纠正任意单量子比特错误的最小码；
- **表面码**（Kitaev 1997；Bravyi 与 Kitaev 1998；Dennis、Kitaev、Landahl 与 Preskill 2002），量子比特放在 $d\times d$ 网格上，四量子比特的 $X$ 型与 $Z$ 型检验作用在相邻量子比特上。它用 $d^2$ 个数据量子比特与 $d^2 - 1$ 个测量量子比特，以距离 $d$ 编码一个逻辑量子比特，只需要平面芯片上的最近邻相互作用，且能容忍接近 $1\%$ 的物理错误率。它是超导硬件的头号候选。

::: warning 一个码不是万灵药
只有当纠错循环本身引入的错误少于它消除的错误时，编码才有用。伴随式测量要用额外的门与辅助量子比特，每个都可能失效，而一个故障的 CNOT 可能把一个错误复制到两个数据量子比特上——这是距离 $3$ 的码纠正不了的。所以真正的成果是阈值定理，而不是码的存在：它要求**容错**（fault-tolerant）线路，即精心设计成一次故障在每个码块内至多造成一个错误，并要求物理错误率低于阈值。高于阈值时，增加量子比特反而使事情*更糟*——[[#thm-bitflip]] 对 $p > 1/2$ 已经说明了这一点。
:::

::: quiz
对比特翻转码 $\mathcal S = \langle ZZI, IZZ\rangle$，下列哪些错误给出伴随式 $(Z_1Z_2, Z_2Z_3) = (-1, -1)$？（多选。）
- [x] $X_2$
- [x] $X_1X_3$
- [ ] $Z_2$
- [x] $Y_2$
::: solution
一个错误会翻转与它反交换的每个生成元的符号。$X_2$ 与 $Z_1Z_2$、$Z_2Z_3$ 都反交换；$Y_2$ 也是（它在量子比特 $2$ 上含一个 $X$）；$X_1X_3$ 与 $Z_1Z_2$（经由 $X_1$）以及 $Z_2Z_3$（经由 $X_3$）反交换。$Z_2$ 与两者都交换，不被检出——它是重量 $1$ 的逻辑算子，这正是该码对一般错误距离为 $1$ 的原因。码对 $X_1X_3$ 的"纠正"是施加 $X_2$，产生逻辑错误 $XXX$。
:::
:::

## 容错与阈值定理

设每个物理操作——门、制备、测量、闲置一步——都以概率 $p$ 独立失效。把每个量子比特换成一个距离 $3$ 码的块，把每个操作换成一个容错**小工具**（gadget）：它在编码块上实现该操作，随后做纠错。若小工具的设计保证任何单个故障都能被纠正，那么一次编码操作只有当其中至少发生两次故障时才失败。若小工具含 $A$ 个故障位置，该概率至多为 $\binom A2p^2 \le cp^2$，常数 $c$ 取决于码与小工具的设计。现在**级联**：把码的每个物理量子比特再编码一次，如此下去。第 $k$ 级操作失败的概率为
$$
p^{(k)}\le c\bigl(p^{(k-1)}\bigr)^2 = \frac{(cp)^{2^k}}{c},
$$ {#eq-concatenation}
由归纳即得。若 $p < p_{\mathrm{th}} = 1/c$，逻辑错误率随 $k$ **二重指数**下降，而每个逻辑操作的规模只随 $k$ 指数增长，每级至多乘一个因子 $A$。

::: theorem 阈值定理 {#thm-threshold}
（Aharonov 与 Ben-Or；Kitaev；Knill、Laflamme 与 Zurek；1996–97。）存在常数 $p_{\mathrm{th}} > 0$，使得任何含 $m$ 个门的量子电路都可以由一个 $O\bigl(m\,\mathrm{polylog}(m/\varepsilon)\bigr)$ 个带噪声门组成的电路模拟，输出分布的误差至多 $\varepsilon$，条件是：每个部件以至多 $p < p_{\mathrm{th}}$ 的概率独立失效（或噪声相关性充分弱），计算全程随时可以制备新的辅助量子比特，且门可以并行作用。
:::

::: proof
（概要，来自 [[#eq-concatenation]]。）我们需要 $m$ 个逻辑操作中的每一个失败概率至多 $\varepsilon/m$；由联合界，整个计算随之至多以概率 $\varepsilon$ 失败。取使 $(cp)^{2^k}/c\le\varepsilon/m$ 成立的最小 $k$，即 $2^k\ge\log(cm/\varepsilon)/\log(1/(cp))$。每级至多把规模乘 $A$，所以开销为 $A^k = (2^k)^{\log_2 A} = O\bigl(\log^{\log_2A}(m/\varepsilon)\bigr)$，是对数多项式的。被省略的困难部分是为通用门集——包括一个非克利福德门如 $T$——构造容错小工具，并证明故障不会在块内与块间不受控地传播。
:::

常数取决于噪声模型与方案：早期证明给出的阈值在 $10^{-6}$ 到 $10^{-4}$ 之间；对表面码在现实的线路级噪声下的数值估计约为 $1\%$，即 $10^{-2}$ 量级。在表面码中，每个纠错循环的逻辑错误率大致按 $p_L\approx A\,(p/p_{\mathrm{th}})^{(d+1)/2}$ 变化，所以距离每增加 $2$，逻辑错误率除以因子 $\Lambda\approx p_{\mathrm{th}}/p$。在真实硬件上测出 $\Lambda > 1$——**阈值以下**区——正是 [[quantum-computing/quantum-hardware]] 中的实验。

::: example 级联要多深？ {#ex-concat}
设 $c = 10^4$（阈值 $10^{-4}$），物理错误率 $p = 10^{-5}$。多少级级联能使逻辑错误率不超过 $10^{-15}$？若每级用 $7$ 量子比特的 Steane 码，每个逻辑量子比特需要多少物理量子比特？
::: solution
由 [[#eq-concatenation]]，$p^{(k)} = (cp)^{2^k}/c = 0.1^{2^k}\cdot10^{-4}$。需要 $0.1^{2^k}\le10^{-11}$，即 $2^k\ge11$，所以 $k = 4$（得 $10^{-16}\cdot10^{-4} = 10^{-20}$；$k = 3$ 只给 $10^{-8}\cdot10^{-4} = 10^{-12}$）。每级把数据量子比特数乘 $7$：每个逻辑量子比特 $7^4 = 2401$ 个物理量子比特，还未算伴随式提取用的辅助量子比特（通常再翻两三倍）。二重指数的改善使不大的级数就够用——而规模的指数增长正是远低于阈值的物理错误率如此宝贵的原因。
:::
:::

还有两点关乎真实机器。第一，没有哪个码拥有横截门的通用集（**Eastin–Knill 定理**，2009），所以至少有一个门——通常是 $T$——必须用别的方式实现，最常用的是**魔术态蒸馏**（magic-state distillation，Bravyi 与 Kitaev，2005）：消耗大量态 $T\ket+$ 的带噪拷贝，产出一份好的拷贝；这是容错算法代价的很大一部分。第二，译码——从伴随式推断最可能的错误——必须由经典计算机实时完成，对超导量子比特约每微秒一次，靠的是快速算法，例如在伴随式变化构成的图上做最小权重完美匹配。

::: history
Peter Shor 的 "Scheme for reducing decoherence in quantum computer memory"（*Physical Review A*，1995）给出了九量子比特码；Andrew Steane 的七量子比特码与一般的 Calderbank–Shor–Steane（CSS）构造在 1996 年相继出现。Emanuel Knill 与 Raymond Laflamme 于 1997 年陈述了量子纠错的条件，Daniel Gottesman 1997 年的加州理工博士论文发展了稳定子形式体系。Shor 于 1996 年描述了容错计算，阈值定理由 Dorit Aharonov 与 Michael Ben-Or、Alexei Kitaev、以及 Knill、Laflamme 与 Wojciech Zurek 于 1996–97 年各自独立证明。Kitaev 于 1997 年引入环面码，由此发展出表面码；Eric Dennis、Kitaev、Andrew Landahl 与 John Preskill 于 2002 年把它作为量子存储器作了分析，Robert Raussendorf 与 Jim Harrington 于 2007 年估计阈值接近 $1\%$。
:::

## 后续内容

[[quantum-computing/quantum-hardware]] 描述物理平台、它们截至 2026 年的错误率与相干时间，以及已开始让逻辑量子比特在阈值以下运行的实验。那里引用的肖尔（Shor）算法资源估计——RSA-2048 约需百万物理量子比特——正出自这里概述的这一类表面码构造。[[quantum-computing/quantum-circuits]] 的克利福德群恰好就是置换泡利算子的酉变换群，这就是稳定子码、克利福德门与 Gottesman–Knill 定理天然属于一起、而非克利福德门 $T$ 昂贵的原因。经典编码理论——汉明码、距离、伴随式——是一切的基础模板；量子码加上了第二种错误：相位。

::: summary
- 密度矩阵 $\rho = \sum_ip_i\ket{\psi_i}\!\bra{\psi_i}$ 描述混合态与子系统；量子比特的状态是**布洛赫球体**中的点（[[#eq-bloch-ball]]），贝尔对的一半是极大混合态（[[#ex-reduced]]）。
- 噪声是**量子信道** $\rho\mapsto\sum_kE_k\rho E_k^\dagger$；比特翻转、退相位与去极化信道压缩布洛赫球（[[#prop-pauli-channel]]）；$T_1$ 与 $T_2$ 度量弛豫与退相位。
- **比特翻转码** $\alpha\ket{000} + \beta\ket{111}$ 测量宇称而非量子比特，失败概率 $3p^2 - 2p^3$（[[#thm-bitflip]]）；相位翻转码在哈达玛基下如法炮制。
- **肖尔码** $[[9, 1, 3]]$ 纠正任何量子比特上的 $X$、$Y$、$Z$，从而纠正任何单量子比特错误：伴随式测量把错误**离散化**（[[#thm-discretise]]）。
- **稳定子码**是可交换泡利算子的公共 $+1$ 本征空间；$[[n, k, d]]$ 码维数 $2^k$，能纠正 $\lfloor(d-1)/2\rfloor$ 个错误（[[#thm-stabiliser]]）。Steane 码、五量子比特码与表面码是主要例子。
- **阈值定理**（[[#thm-threshold]]）：物理错误率低于常数阈值时，级联码或表面码以对数多项式开销使逻辑错误任意小；表面码阈值约为 $1\%$。
:::

## 习题

::: exercise 纯度 {level=1 check="0.82"}
一个量子比特的布洛赫向量为 $(0.8, 0, 0)$。$\tr\rho^2$ 是多少？（填一个小数。）
::: solution
由 [[#eq-bloch-ball]]，$\tr\rho^2 = \tfrac12(1 + 0.64) = 0.82$，同 [[#ex-dephase]]。纯态满足 $\tr\rho^2 = 1$，极大混合态为 $\tfrac12$。
:::
:::

::: exercise 一个逻辑错误率 {level=1 check="3*0.01^2-2*0.01^3"}
比特翻转码的三个量子比特各以概率 $0.01$ 独立翻转。纠错失败的概率是多少？（填入精确表达式或小数。）
::: solution
由 [[#thm-bitflip]]，$3p^2 - 2p^3 = 3\times10^{-4} - 2\times10^{-6} = 2.98\times10^{-4}$，比 $p = 0.01$ 改善了 $33$ 倍。
:::
:::

::: exercise 读伴随式 {level=1}
在比特翻转码中，宇称测得 $Z_1Z_2 = +1$，$Z_2Z_3 = -1$。施加哪个纠正？若真实错误是 $X_1X_2$ 会发生什么？
::: solution
伴随式 $(+1, -1)$ 指向量子比特 $3$，于是施加 $X_3$。若真实错误是 $X_1X_2$，则状态本是 $\alpha\ket{110} + \beta\ket{001}$——伴随式相同——施加 $X_3$ 得 $\alpha\ket{111} + \beta\ket{000}$：一次逻辑 $X$，一次未被检出的失败。这就是 [[#thm-bitflip]] 中 $3p^2(1 - p)$ 那一项。
:::
:::

::: exercise 去极化信道 {level=1 check="0.6"}
布洛赫向量为 $\vec r$ 的量子比特通过 $p = 0.3$ 的去极化信道。其布洛赫向量的长度被乘上哪个因子？（填一个小数。）
::: solution
由 [[#prop-pauli-channel]]，因子为 $1 - \tfrac43p = 1 - 0.4 = 0.6$。当 $p = 3/4$ 时因子为 $0$：每个状态都变成 $I/2$，信道的输出与其输入无关。
:::
:::

::: exercise 一个约化状态 {level=2}
求 $\tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$ 中量子比特 $0$ 的约化密度矩阵、它的布洛赫向量与特征值，并把特征值与 [[quantum-computing/entanglement]] 中求得的施密特（Schmidt）系数比较。
::: solution
按量子比特 $0$ 的状态分组：$\tfrac{1}{\sqrt3}\bigl(\ket0(\ket0 + \ket1) + \ket1\ket1\bigr)$。把量子比特 $1$ 的（未归一化的）$\ket{a_0} = \tfrac{1}{\sqrt3}(\ket0 + \ket1)$ 与 $\ket{a_1} = \tfrac{1}{\sqrt3}\ket1$ 代入，$\rho_0 = \sum_{i,j}\braket{a_j|a_i}\ket i\!\bra j = \tfrac13\begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}$。布洛赫向量为 $(r_x, r_y, r_z) = (2/3, 0, 1/3)$，长 $\sqrt5/3 \approx 0.745$。特征值为 $\tfrac12(1\pm\sqrt5/3) = (3\pm\sqrt5)/6\approx 0.873, 0.127$——恰为 [[quantum-computing/entanglement]] 中施密特系数习题里的施密特系数的平方。
:::
:::

::: exercise 用错的码 {#ex-wrong-code level=2 check="0.244"}
用相位翻转码去抗每个量子比特 $p = 0.1$ 的**比特翻转**噪声。证明：只要有奇数个量子比特翻转它就失败，计算失败概率，并与不编码比较。用模拟验证。（把失败概率填到三位小数。）
::: solution
$X\ket\pm = \pm\ket\pm$，所以量子比特 $j$ 上的比特翻转把 $\alpha\ket{+++} + \beta\ket{---}$ 映为 $\alpha\ket{+++} - \beta\ket{---}$：一次逻辑 $Z$。伴随式 $X_1X_2$、$X_2X_3$ 不受影响（$X$ 与 $X$ 交换），什么也没被纠正，而逻辑状态恰在有奇数次翻转时出错：概率 $\tfrac12(1 - (1 - 2p)^3) = \tfrac12(1 - 0.512) = 0.244$，远差于不编码的 $0.1$。

```python
from stab import *

def encode(alpha, beta):                   # alpha|+++> + beta|--->
    s = [0j] * 8; s[0], s[7] = alpha, beta
    for q in range(3): apply(s, H, q)
    return s

SYNDROME = {(+1, +1): None, (-1, +1): 0, (-1, -1): 1, (+1, -1): 2}

def trial(p, rng, noise, alpha=0.6, beta=0.8j):
    s = encode(alpha, beta)
    for q in range(3):
        if rng.random() < p: apply(s, noise, q)     # 独立错误
    syn = (measure_pauli(s, "XXI", rng), measure_pauli(s, "IXX", rng))
    if SYNDROME[syn] is not None: apply(s, Z, SYNDROME[syn])
    return fidelity(s, encode(alpha, beta)) > 0.5

rng = random.Random(7)
p, shots = 0.1, 20000
for name, noise in (("Z (phase flips)", Z), ("X (bit flips)", X)):
    fail = sum(not trial(p, rng, noise) for _ in range(shots)) / shots
    print(f"phase-flip code, {name:16} p = {p}: logical failure {fail:.4f}")
```

```console
$ python3 phaseflip.py
phase-flip code, Z (phase flips)  p = 0.1: logical failure 0.0281
phase-flip code, X (bit flips)    p = 0.1: logical failure 0.2465
```

对它设计来对付的错误，码的失败概率约 $3p^2 - 2p^3 = 0.028$；对另一种错误则约 $0.244$。有用的码必须两种错误都能处理，肖尔（Shor）码就做到了。
:::
:::

::: exercise 表面码的量子比特数 {level=2 check="97"}
距离 $d$ 的表面码用 $d^2$ 个数据量子比特与 $d^2 - 1$ 个测量量子比特。距离 $7$ 的逻辑量子比特需要多少物理量子比特？若 $\Lambda = 2$ 且距离 $3$ 的每循环逻辑错误为 $3\times10^{-3}$，估算距离 $7$ 的错误率。（填量子比特数。）
::: solution
$2d^2 - 1 = 2\cdot49 - 1 = 97$ 个量子比特。每步 $d\to d + 2$ 把逻辑错误除以 $\Lambda$，所以从 $d = 3$ 到 $d = 7$（两步），错误率降为 $3\times10^{-3}/4 = 7.5\times10^{-4}$（每循环）。要在 $\Lambda = 2$ 下达到 $10^{-12}$，从 $d = 3$ 起约需 $\log_2(3\times10^{9})\approx 31.5$ 步——距离约 $67$，每个逻辑量子比特近 $10\,000$ 个物理量子比特——这就是提高 $\Lambda$（压低 $p$）如此宝贵的原因。
:::
:::

::: exercise 级联的级数 {level=2 check="4"}
仿照 [[#ex-concat]] 取 $c = 10^4$、$p = 10^{-5}$，使逻辑错误不超过 $10^{-15}$ 的最少级联级数是多少？（填一个数。）
::: solution
$k = 4$，如 [[#ex-concat]] 中所算：$0.1^{2^k}\cdot10^{-4}\le10^{-15}$ 要求 $2^k\ge 11$。
:::
:::

::: exercise 量子汉明界 {level=3 check="5"}
非退化的 $[[n, 1, 3]]$ 码必须给 $I$ 与 $X_j, Y_j, Z_j$（$j = 1, \dots, n$）这些错误中每一个不同的伴随式，且每个伴随式类都必须含二维码空间的一份拷贝。证明 $2(1 + 3n)\le2^n$，并求允许的最小 $n$。（填入该 $n$。）
::: solution
$1 + 3n$ 个错误把码空间映到 $1 + 3n$ 个两两正交的二维子空间（正交是因为伴随式不同），全部在 $\C^{2^n}$ 之内；所以 $2(1 + 3n)\le 2^n$。$n = 4$：$26 > 16$；$n = 5$：$32\le32$，取等。所以 $n\ge5$，五量子比特码恰好达到该界——它是一个**完全码**（perfect code），每个伴随式都被用上。退化码（不同错误在码空间上作用相同）可以绕过这一论证，但对 $k = 1$、$d = 3$，没有更小的码存在。
:::
:::

::: exercise 比特翻转码的稳定子 {level=3}
(a) 证明 $ZZI$ 与 $IZZ$ 交换，且它们的公共 $+1$ 本征空间由 $\ket{000}$ 与 $\ket{111}$ 张成——这正是 [[#thm-stabiliser]](a) 对 $n = 3$、$k = 1$ 的预言。(b) 求逻辑算子 $\bar X$ 与 $\bar Z$——与稳定子交换、但在码空间上像对编码量子比特施加 $X$ 与 $Z$ 那样作用的泡利算子——并验证码的距离为 $1$。(c) 相位翻转码的稳定子是什么？它的逻辑算子呢？
::: solution
(a) $ZZI\cdot IZZ = ZIZ = IZZ\cdot ZZI$（在量子比特 $2$ 上，无论如何 $Z\cdot Z = I$）。基状态 $\ket{b_1b_2b_3}$ 是 $Z_1Z_2$ 的属于本征值 $(-1)^{b_1\oplus b_2}$ 的本征向量，所以公共 $+1$ 本征空间由满足 $b_1 = b_2 = b_3$ 的基状态张成：$\ket{000}$ 与 $\ket{111}$，维数 $2 = 2^1$。(b) $\bar X = XXX$ 把 $\ket{000}\leftrightarrow\ket{111}$，且与两个生成元交换（与每个 $Z$ 反交换，共两次）。$\bar Z = ZII$（或 $IZI$、$IIZ$、$ZZZ$）给出 $\ket{000}\mapsto\ket{000}$、$\ket{111}\mapsto-\ket{111}$，且与生成元交换。由于 $\bar Z$ 重量为 $1$ 且不属于 $\mathcal S$，距离为 $1$：单个 $Z$ 错误就是不可检出的逻辑错误。(c) 用 $H^{\otimes3}$ 共轭：$\mathcal S = \langle XXI, IXX\rangle$，$\bar X = ZZZ$，$\bar Z = XII$，对 $X$ 错误距离 $1$——这正是 [[#ex-wrong-code]] 的内容。
:::
:::
