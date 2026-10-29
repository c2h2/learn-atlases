按 [[quantum-computing/quantum-circuits#ex-bell-matrix]] 的方法，用一个哈达玛门和一个 CNOT 制备两个量子比特，把其中一个交给 Alice，另一个交给 Bob。他们各自单独测量，看到的都是一个完全随机的比特。然而两人的比特总是相同——而且若两人先各施加一个哈达玛门再测量，他们的比特*仍然*总是相同，这是任何事先约定好的随机比特对在任何基的选择下都无法保证的。这一对处于这样一种状态：它不是 Alice 量子比特的某个状态与 Bob 量子比特的某个状态的张量组合——它是**纠缠的**。爱因斯坦（Einstein）称这种关联为“鬼魅般的超距作用”，并与 Podolsky、Rosen 在 1935 年据此断定量子力学必定是不完备的。此后的实验证实了量子力学的正确，而纠缠已经成为一种可以像带宽或内存那样被制备、存储、消耗和计数的资源。

本章发展多个量子比特的数学：乘积态与纠缠态、部分测量，以及**施密特分解**（Schmidt decomposition）。我们证明**不可克隆定理**与**无通信**（no-signalling）原则，两者一起说明纠缠不能做什么。然后展示它能做什么：**超密编码**用一个量子比特发送两个经典比特，**隐形传态**用两个经典比特发送一个量子比特，而在 **CHSH 博弈**中，拥有纠缠的玩家一方以概率 $\cos^2(\pi/8) \approx 0.854$ 获胜，而经典玩家至多 $3/4$。两个协议都用 [[quantum-computing/quantum-circuits]] 中的模拟器 `qsim.py` 检验。纠缠的物理，包括 EPR 论证与贝尔定理，另见[物理图谱：纠缠](/learn/physics/lesson.php?c=quantum-2&l=entanglement)。

## 乘积态与纠缠态

回顾 [[quantum-computing/quantum-circuits]]：两个量子比特有四维态空间 $\C^2\otimes\C^2 = \C^4$，基为 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$；独立的状态按张量积复合，$(a_0\ket0 + a_1\ket1)\otimes(b_0\ket0 + b_1\ket1) = \sum_{ij}a_ib_j\ket{ij}$。张量积是双线性的，$(\ket a + \ket{a'})\otimes\ket b = \ket a\otimes\ket b + \ket{a'}\otimes\ket b$，且内积相乘：$\bigl(\bra a\otimes\bra b\bigr)\bigl(\ket{a'}\otimes\ket{b'}\bigr) = \braket{a|a'}\braket{b|b'}$。

::: definition 乘积态与纠缠态 {#def-entangled}
若由两部分 $A$ 与 $B$ 组成的系统的状态 $\ket\psi$ 可写成 $\ket\psi = \ket a\otimes\ket b$，其中 $\ket a$、$\ket b$ 分别是 $A$ 与 $B$ 的状态，则称 $\ket\psi$ 为**乘积态**；否则称它为**纠缠的**。四个**贝尔态**（Bell）是
$$
\ket{\Phi^\pm} = \frac{\ket{00} \pm \ket{11}}{\sqrt2}, \qquad \ket{\Psi^\pm} = \frac{\ket{01} \pm \ket{10}}{\sqrt2}.
$$
:::

贝尔态标准正交，因此构成 $\C^4$ 的一组基，即**贝尔基**；由 [[quantum-computing/quantum-circuits#ex-bell-matrix]]，线路“先对第一个量子比特施加 $H$，再施加 CNOT”把 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$ 分别变为 $\ket{\Phi^+}, \ket{\Psi^+}, \ket{\Phi^-}, \ket{\Psi^-}$。它们是纠缠的——下一条定理给出判别法——而且在精确的意义上是最大纠缠的。一对共享的贝尔对称为一个 **ebit**。

### 对系统的一部分作测量

玻恩规则可以推广到只测量部分量子比特。若两量子比特状态 $\ket\psi = \sum_{ij}c_{ij}\ket{ij}$ 的量子比特 $0$ 在计算基下被测量，则结果 $i$ 出现的概率为
$$
p(i) = \sum_j \abs{c_{ij}}^2,
$$ {#eq-partial}
且状态变为 $\ket i\otimes\frac{1}{\sqrt{p(i)}}\sum_j c_{ij}\ket j$。这就是以 $\ket i\!\bra i\otimes I$ 为投影算子的投影测量（[[quantum-computing/qubits#def-postulates]]）；模拟器中的 `measure(s, q)` 对任意数目的量子比特中的任意一个实现了它。

::: example 测量贝尔对的一半 {#ex-half-bell}
Alice 对 $\ket{\Phi^+}$ 中她的那一半在计算基下测量。她会看到什么？之后 Bob 的状态是什么？若两人改为都在哈达玛基下测量呢？
::: solution
由 [[#eq-partial]]，$p(0) = \abs{1/\sqrt2}^2 = 1/2 = p(1)$，且状态变为 $\ket{00}$ 或 $\ket{11}$：Bob 的量子比特现在是 $\ket0$ 或 $\ket1$，与 Alice 的结果一致。对哈达玛基，改写状态。由 $\ket0 = (\ket+ + \ket-)/\sqrt2$ 与 $\ket1 = (\ket+ - \ket-)/\sqrt2$，
$$
\ket{\Phi^+} = \tfrac{1}{2\sqrt2}\bigl[(\ket+ + \ket-)(\ket+ + \ket-) + (\ket+ - \ket-)(\ket+ - \ket-)\bigr] = \frac{\ket{++} + \ket{--}}{\sqrt2}.
$$
于是在哈达玛基下，结果同样是均匀随机且总是相等。一对经典的相关随机比特——比如都以概率 $1/2$ 同时取 $0$ 或同时取 $1$，即计算基测量之后的状态——在哈达玛基下会给出*独立*的均匀比特。两组互补基下都有关联，这正是纠缠的特征。
:::
:::

### 施密特分解

每个两部分状态都有一个规范形，而它不过是奇值分解（[数学图谱：奇异值分解](/learn/maths/lesson.php?c=linear-algebra&l=svd)）换了外衣。

::: theorem 施密特分解 {#thm-schmidt}
设 $\ket\psi = \sum_{i=1}^{d_A}\sum_{j=1}^{d_B}c_{ij}\ket i\ket j$ 是 $\C^{d_A}\otimes\C^{d_B}$ 中的单位向量。存在 $\C^{d_A}$ 中的标准正交向量 $\ket{u_1}, \dots, \ket{u_r}$、$\C^{d_B}$ 中的标准正交向量 $\ket{v_1}, \dots, \ket{v_r}$，以及正数 $\lambda_1 \ge \dots \ge \lambda_r > 0$ 满足 $\sum_k\lambda_k^2 = 1$，使得
$$
\ket\psi = \sum_{k=1}^{r}\lambda_k\ket{u_k}\ket{v_k}.
$$ {#eq-schmidt}
系数矩阵 $C = (c_{ij})$ 的**施密特系数** $\lambda_k$ 是它的非零奇值，**施密特秩**为 $r = \rank C$。该状态是乘积态当且仅当 $r = 1$。
:::

::: proof
写出奇值分解 $C = U\Sigma V^\dagger$，其中 $U$ 与 $V$ 酉，$\Sigma$ 的对角线为奇值 $\lambda_1 \ge \dots \ge \lambda_r > 0$、其余元素为零，这里 $r = \rank C$。逐元素看 $c_{ij} = \sum_{k=1}^r U_{ik}\lambda_k\overline{V_{jk}}$，于是
$$
\ket\psi = \sum_k \lambda_k\Bigl(\sum_i U_{ik}\ket i\Bigr)\Bigl(\sum_j\overline{V_{jk}}\ket j\Bigr) = \sum_k\lambda_k\ket{u_k}\ket{v_k},
$$
其中 $\ket{u_k}$ 的分量是 $U$ 的第 $k$ 列，$\ket{v_k}$ 的分量是 $V$ 的第 $k$ 列取共轭。酉矩阵的列标准正交，而分量取共轭保持标准正交性。取范数，由标准正交性得 $1 = \braket{\psi|\psi} = \sum_k\lambda_k^2$（等价地，$\sum_{ij}\abs{c_{ij}}^2 = \tr(C^\dagger C) = \sum_k\lambda_k^2$）。

若 $r = 1$，则 $\ket\psi = \ket{u_1}\ket{v_1}$ 是乘积态。反过来，若 $\ket\psi = \ket a\ket b$，则 $c_{ij} = a_ib_j$，于是 $C = \mathbf a\,\mathbf b\T$ 是秩为一的非零矩阵。
:::

::: example 手工求施密特分解 {#ex-schmidt}
求 $\ket\chi = \tfrac12(\ket{00} + \ket{01} + \ket{10} - \ket{11})$ 的施密特分解，它是对 $\ket+\ket+$ 施加 CZ 门产生的状态。
::: solution
系数矩阵为 $C = \tfrac12\begin{pmatrix}1 & 1\\ 1 & -1\end{pmatrix} = \tfrac{1}{\sqrt2}H$。由于 $H$ 酉，$C^\dagger C = \tfrac12 I$，所以两个奇值都是 $1/\sqrt2$，施密特秩为 $2$：该状态是最大纠缠的。按第一个量子比特分组即得显式分解：
$$
\ket\chi = \tfrac{1}{\sqrt2}\Bigl(\ket0\otimes\tfrac{\ket0 + \ket1}{\sqrt2} + \ket1\otimes\tfrac{\ket0 - \ket1}{\sqrt2}\Bigr) = \tfrac{1}{\sqrt2}\bigl(\ket0\ket+ + \ket1\ket-\bigr),
$$
其中 $\ket{u_1}, \ket{u_2} = \ket0, \ket1$，$\ket{v_1}, \ket{v_2} = \ket+, \ket-$，都是标准正交对。对第二个量子比特施加 $H$ 就把它变成 $\ket{\Phi^+}$，证实它是一个改头换面的贝尔态。当施密特系数相等时，施密特基不唯一；例如对 $\ket{\Phi^+}$，任何实旋转基都可以（[[#ex-angle]]）。
:::
:::

::: corollary 两量子比特的判别法 {#cor-det}
两量子比特状态 $\alpha\ket{00} + \beta\ket{01} + \gamma\ket{10} + \delta\ket{11}$ 是纠缠的当且仅当 $\alpha\delta \ne \beta\gamma$。
:::

::: proof
这里 $C = \begin{pmatrix}\alpha & \beta\\ \gamma & \delta\end{pmatrix}$，它非零，因此秩为 $1$ 当且仅当 $\det C = \alpha\delta - \beta\gamma = 0$。应用 [[#thm-schmidt]]。
:::

对 $\ket{\Phi^+}$，$\alpha\delta = 1/2 \ne 0 = \beta\gamma$：纠缠，且 $C = I/\sqrt2$，两个施密特系数相等，都是 $1/\sqrt2$，是最均匀的分配。施密特系数在只作用于 $A$ 或只作用于 $B$ 的酉变换下不变（它们把 $C$ 换成 $U_ACU_B\T$，奇值相同），所以它们内在地度量纠缠；**纠缠熵** $-\sum_k\lambda_k^2\log\lambda_k^2$ 对贝尔态是 $1$ ebit，对乘积态是 $0$。

## 纠缠做不到的事

### 不可克隆

经典比特可以复制：CNOT 把 $\ket{b}\ket0 \mapsto \ket b\ket b$（$b \in \{0, 1\}$）。量子状态能被复制吗？

::: theorem 不可克隆定理 {#thm-no-cloning}
不存在作用在系统 $A\otimes B\otimes E$（输入、空白以及任意环境或辅助）上的酉变换 $U$、固定的空白状态 $\ket s$ 与环境状态 $\ket e$，使得对 $A$ 的两个状态 $\ket\psi, \ket\phi$，
$$
U\ket\psi\ket s\ket e = \ket\psi\ket\psi\ket{e_\psi}, \qquad U\ket\phi\ket s\ket e = \ket\phi\ket\phi\ket{e_\phi}
$$
对某两个单位向量 $\ket{e_\psi}, \ket{e_\phi}$ 成立，除非 $\ket\psi$ 与 $\ket\phi$ 正交或至多相差一个全局相位。特别地，没有器件能复制量子比特的每一个状态。
:::

::: proof
酉变换保持内积（[[quantum-computing/qubits#prop-unitary]]）。两个输入的内积是 $\braket{\psi|\phi}\braket{s|s}\braket{e|e} = \braket{\psi|\phi}$，两个输出的内积是 $\braket{\psi|\phi}^2\braket{e_\psi|e_\phi}$。所以 $\braket{\psi|\phi} = \braket{\psi|\phi}^2\braket{e_\psi|e_\phi}$。取绝对值，记 $x = \abs{\braket{\psi|\phi}} \in [0, 1]$，且由柯西-施瓦茨（Cauchy–Schwarz）不等式 $\abs{\braket{e_\psi|e_\phi}} \le 1$，得 $x \le x^2$。于是 $x = 0$（正交）或 $x = 1$，而由柯西-施瓦茨的取等条件，这意味着 $\ket\phi = e^{i\gamma}\ket\psi$。
:::

证明只用到了酉性，但还有一个从线性性出发的更简单的论证。若 $U\ket{b}\ket0 = \ket b\ket b$（$b = 0, 1$），则 $U\ket+\ket0 = \tfrac{1}{\sqrt2}(\ket{00} + \ket{11}) = \ket{\Phi^+}$，而不是 $\ket+\ket+ = \tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$。CNOT 把一个叠加态“复制”成一个纠缠态，那是完全不同的东西。不可克隆正是量子信息不能用复制来备份的原因——所以纠错必须另辟蹊径（[[quantum-computing/error-correction]]）——也是窃听者不能复制 BB84（[[quantum-computing/qubits]]）的量子比特的原因。

::: example CNOT 的“克隆”有多糟？ {#ex-cnot-clone}
以 $\ket0$ 为空白目标的 CNOT 完美复制 $\ket0$ 与 $\ket1$。把 $\ket+$ 喂给它。输出与想要的 $\ket+\ket+$ 有多接近？每个输出量子比特单独看是什么样子？
::: solution
输出是 $\ket{\Phi^+}$。它与 $\ket+\ket+ = \tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$ 的重叠为 $\tfrac{1}{\sqrt2}\cdot\tfrac12(1 + 1) = \tfrac{1}{\sqrt2}$，所以与一对完美拷贝的保真度为 $\abs{1/\sqrt2}^2 = 1/2$。每个输出量子比特单独在*每个*基下都给出均匀随机的结果——由 [[#ex-angle]]，$\ket{\Phi^+}$ 在每个实基下都一样——所以在 $X$ 基下测量其中任意一个，只有一半的时间给出 $+$，而原来的 $\ket+$ 必然给出 $+$。这副“拷贝”毁掉了原状态的 $X$ 基信息。Bužek 与 Hillery（1996）找到的最佳普适克隆器产生两份与输入保真度各为 $5/6$ 的拷贝；不可克隆只说明 $1$ 是不可能的。
:::
:::

::: warning 纠缠不能超光速传信
Alice 测量 $\ket{\Phi^+}$ 中她的那一半并得到 $0$ 时，Bob 的量子比特便“立刻”“变成”了 $\ket0$，无论他相距多远。但 Alice 无法选择她的结果，而 Bob 单独测量时，无论 Alice 做了什么，看到的都是均匀随机的比特。关联只有在比对两人的结果清单时才出现，而这需要一条普通信道。下一条命题把这点说精确，下文的隐形传态就是一个干净的例子：两个经典比特必不可少，在它们到达之前，Bob 的量子比特不携带任何关于被传送状态的信息。
:::

::: proposition 无通信 {#prop-no-signalling}
设 $\ket\psi$ 是 $A\otimes B$ 的状态。无论 Alice 对 $A$ 施加什么酉变换 $U$、随后又对 $A$ 作什么投影测量 $\{P_a\}$（她的结果对 Bob 保密），Bob 对 $B$ 作的任何投影测量 $\{Q_b\}$ 的各结果 $b$ 的概率，都与 Alice 什么也没做时相同。
:::

::: proof
Alice 的操作之后，$(a, b)$ 的联合概率是 $\norm{(P_a\otimes Q_b)(U\otimes I)\psi}^2 = \bra\psi\bigl(U^\dagger P_aU\otimes Q_b\bigr)\ket\psi$，这里用到 $P_a^\dagger P_a = P_a$ 与 $Q_b^\dagger Q_b = Q_b$。对 Alice 的结果求和，并用 $\sum_a P_a = I$ 与 $U^\dagger U = I$，Bob 的边缘概率为 $\bra\psi(I\otimes Q_b)\ket\psi$，不依赖 $U$ 或 $\{P_a\}$。
:::

## 超密编码

一个量子比特至多携带一个经典比特（Holevo，[[quantum-computing/qubits]]）。有了预先共享的一个 ebit，它能携带两个。

::: algorithm 超密编码 {#alg-superdense}
Alice 与 Bob 共享 $\ket{\Phi^+}$，Alice 持有量子比特 $0$，Bob 持有量子比特 $1$。要发送比特 $b_1b_2$：
1. Alice 对自己的量子比特先施加 $X^{b_2}$，再施加 $Z^{b_1}$，然后把它发送给 Bob。
2. Bob 此时持有两个量子比特，施加 CNOT（从量子比特 $0$ 到量子比特 $1$），再对量子比特 $0$ 施加 $H$，并测量两个量子比特；结果就是 $b_1b_2$。
:::

::: proposition 超密编码是正确的 {#prop-superdense}
[[#alg-superdense]] 中 Bob 的测量以概率 $1$ 返回 $b_1b_2$。
:::

::: proof
Alice 的操作把 $\ket{\Phi^+}$ 变为：$00$ 时仍是 $\ket{\Phi^+}$；$X\otimes I$ 对 $01$ 给出 $\tfrac{1}{\sqrt2}(\ket{10} + \ket{01}) = \ket{\Psi^+}$；$Z\otimes I$ 对 $10$ 给出 $\ket{\Phi^-}$；$ZX\otimes I$ 对 $11$ 给出 $\tfrac{1}{\sqrt2}(Z\ket{10} + Z\ket{01}) = \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}) = \ket{\Psi^-}$。Bob 的 CNOT 再接 $H$ 正是贝尔线路的逆变换，由 [[quantum-computing/quantum-circuits#ex-bell-matrix]]，它把 $\ket{\Phi^+}, \ket{\Psi^+}, \ket{\Phi^-}, \ket{\Psi^-}$ 分别变回 $\ket{00}, \ket{01}, \ket{10}, \ket{11}$。所以比特 $b_1b_2$ 最终成为 $\ket{b_1b_2}$。
:::

模拟器印证了这一点：

```python
from qsim import *

def superdense(b1, b2):
    s = zeros(2)
    apply(s, H, 0); apply(s, X, 1, controls=(0,))   # 共享贝尔对：Alice 0，Bob 1
    if b2: apply(s, X, 0)                            # Alice 编码两个比特，
    if b1: apply(s, Z, 0)                            #   只作用在她自己的量子比特上
    apply(s, X, 1, controls=(0,)); apply(s, H, 0)    # Bob：贝尔基测量
    return [round(p, 6) for p in probs(s)]

for b1 in (0, 1):
    for b2 in (0, 1):
        print(f"sent {b1}{b2}: P(00, 01, 10, 11) =", superdense(b1, b2))
```

```console
$ python3 superdense.py
sent 00: P(00, 01, 10, 11) = [1.0, 0.0, 0.0, 0.0]
sent 01: P(00, 01, 10, 11) = [0.0, 1.0, 0.0, 0.0]
sent 10: P(00, 01, 10, 11) = [0.0, 0.0, 1.0, 0.0]
sent 11: P(00, 01, 10, 11) = [0.0, 0.0, 0.0, 1.0]
```

这与 Holevo 界不矛盾：两个量子比特——Alice 发送的那一个，以及更早送达的贝尔对中 Bob 的那一半——携带了两个比特。ebit 买到的是：其中一个量子比特可以在消息存在*之前*就送出去。

## 隐形传态

反向的交换用一个 ebit 和两个经典比特传送一个未知量子比特。两种资源单独都不够：两个比特无法描述一个状态的连续参数，而由无通信（[[#prop-no-signalling]]），只有一个 ebit 什么也传不了。

::: algorithm 量子隐形传态 {#alg-teleport}
Alice 持有处于未知状态 $\ket\psi = \alpha\ket0 + \beta\ket1$ 的量子比特 $0$。Alice（量子比特 $1$）与 Bob（量子比特 $2$）共享 $\ket{\Phi^+}$。
1. Alice 施加从量子比特 $0$ 到量子比特 $1$ 的 CNOT，然后对量子比特 $0$ 施加 $H$。
2. Alice 测量量子比特 $0$ 和 $1$，得到比特 $m_0, m_1$，并把它们通过经典信道发给 Bob。
3. Bob 对量子比特 $2$ 先施加 $X^{m_1}$，再施加 $Z^{m_0}$，它此时就处于状态 $\ket\psi$。
:::

::: theorem 隐形传态是正确的 {#thm-teleport}
对每个 $\ket\psi$，[[#alg-teleport]] 的四个结果 $(m_0, m_1)$ 每个都以概率 $1/4$ 出现，且 Bob 修正之后量子比特 $2$ 恰好处于状态 $\ket\psi$。Alice 的量子比特留在 $\ket{m_0m_1}$，不携带任何关于 $\ket\psi$ 的信息。
:::

::: proof
初始状态为
$$
\ket\psi\ket{\Phi^+} = \tfrac{1}{\sqrt2}\bigl(\alpha\ket0(\ket{00} + \ket{11}) + \beta\ket1(\ket{00} + \ket{11})\bigr).
$$
CNOT 在 $\beta$ 各项中翻转量子比特 $1$：$\tfrac{1}{\sqrt2}\bigl(\alpha\ket0(\ket{00} + \ket{11}) + \beta\ket1(\ket{10} + \ket{01})\bigr)$。然后对量子比特 $0$ 施加 $H$，把 $\ket0$ 换成 $(\ket0 + \ket1)/\sqrt2$、把 $\ket1$ 换成 $(\ket0 - \ket1)/\sqrt2$：
$$
\tfrac12\bigl(\alpha(\ket0 + \ket1)(\ket{00} + \ket{11}) + \beta(\ket0 - \ket1)(\ket{10} + \ket{01})\bigr).
$$
按量子比特 $0$ 与 $1$ 的状态分组：
$$
\tfrac12\Bigl[\ket{00}(\alpha\ket0 + \beta\ket1) + \ket{01}(\alpha\ket1 + \beta\ket0) + \ket{10}(\alpha\ket0 - \beta\ket1) + \ket{11}(\alpha\ket1 - \beta\ket0)\Bigr].
$$ {#eq-teleport}
每个括号中的量子比特 $2$ 状态都是单位向量，所以由 [[#eq-partial]]，每个结果 $m_0m_1$ 的概率都是 $\abs{1/2}^2 = 1/4$，与 $\alpha, \beta$ 无关，并把量子比特 $2$ 留在状态 $X^{m_1}Z^{m_0}\ket\psi$：分别为 $\ket\psi$、$X\ket\psi$、$Z\ket\psi$、$XZ\ket\psi = \alpha\ket1 - \beta\ket0$。Bob 的修正 $Z^{m_0}X^{m_1}$ 正好把它撤销，因为 $X^2 = Z^2 = I$：$Z^{m_0}X^{m_1}X^{m_1}Z^{m_0}\ket\psi = \ket\psi$。
:::

在比特到达之前，Bob 的量子比特处于四个状态之一，各以概率 $1/4$；对它们取平均后它是最大混合态，无论 $\ket\psi$ 原来是什么（[[quantum-computing/error-correction]] 用密度矩阵把这点说精确）。原来的 $\ket\psi$ 在 Alice 一边被毁掉了，正如不可克隆定理所要求，而且没有任何东西超光速传播。还请注意，隐形传态从不*得知* $\alpha$ 或 $\beta$；它对未知状态也成立，甚至当量子比特 $0$ 自身与其他系统纠缠时也成立——那些系统于是转而与 Bob 的量子比特纠缠（**纠缠交换**，见习题）。

::: example 模拟器中的隐形传态 {#ex-teleport-sim}
对状态 $\ket\psi = 0.6\ket0 + 0.8ie^{0.3i}\ket1$ 模拟 [[#alg-teleport]]，中途使用真实的测量，并检查 Bob 的最终状态。
::: solution
量子比特 $0$ 是最左边的位，所以 $\ket{100}$ 的振幅是 $\beta$。用结果 $m_0, m_1$ 测量量子比特 $0$ 和 $1$ 之后，唯一的非零振幅位于指标 $4m_0 + 2m_1$ 与 $4m_0 + 2m_1 + 1$ 处，那里存放着 Bob 的量子比特。

```python
from qsim import *

def teleport(alpha, beta, rng):
    s = [0j] * 8; s[0b000], s[0b100] = alpha, beta   # 量子比特 0：|psi> = alpha|0> + beta|1>
    apply(s, H, 1); apply(s, X, 2, controls=(1,))    # 量子比特 1（Alice）、2（Bob）：贝尔对
    apply(s, X, 1, controls=(0,)); apply(s, H, 0)    # Alice：贝尔基测量……
    m0, m1 = measure(s, 0, rng), measure(s, 1, rng)  # ……对象是量子比特 0 和 1
    if m1: apply(s, X, 2)                            # Bob 的修正，利用收到的
    if m0: apply(s, Z, 2)                            #   两个经典比特
    base = (m0 << 2) | (m1 << 1)                     # Bob 的量子比特：振幅位于 base、base+1
    return (m0, m1), s[base], s[base | 1]

rng = random.Random(7)
alpha, beta = 0.6, 0.8j * cmath.exp(0.3j)           # 任意一个归一化状态
for trial in range(4):
    bits, a, b = teleport(alpha, beta, rng)
    fidelity = abs(alpha.conjugate() * a + beta.conjugate() * b) ** 2
    print(f"bits {bits}: Bob has ({a:.3f}) |0> + ({b:.3f}) |1>, fidelity {fidelity:.6f}")
```

```console
$ python3 teleport.py
bits (1, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (0, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (0, 1): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
bits (1, 0): Bob has (0.600+0.000j) |0> + (-0.236+0.764j) |1>, fidelity 1.000000
```

由于 $0.8ie^{0.3i} = 0.8e^{i(\pi/2 + 0.3)} \approx -0.236 + 0.764i$，对每个结果 Bob 都恰好持有 $\ket\psi$——甚至全局相位也相同——而**保真度** $\abs{\braket{\psi|\text{Bob}}}^2$ 精确到六位小数为 $1$。删去 `if m0: apply(s, Z, 2)` 这一行，只要 $m_0 = 1$，保真度就会跌到 $\abs{\abs\alpha^2 - \abs\beta^2}^2 = 0.0784$。
:::
:::

::: quiz
隐形传态中，设经典信道有噪声，Bob 正确收到 $m_0$ 但 $m_1$ 被翻转。Bob 最终得到什么？
- [ ] $\ket\psi$，因为比特只在全局相位的意义下要紧
- [x] $X\ket\psi$
- [ ] $Z\ket\psi$
- [ ] 一个与 $\ket\psi$ 无关的随机状态
::: solution
Bob 把 $Z^{m_0}X^{1 - m_1}$ 作用在 $X^{m_1}Z^{m_0}\ket\psi$ 上。由 $X^{1-m_1}X^{m_1} = X$，它是 $Z^{m_0}XZ^{m_0}\ket\psi = \pm X\ket\psi$，因为 $ZXZ = -X$。至多相差一个全局相位，Bob 得到 $X\ket\psi$——一个比特翻转错误，正是 [[quantum-computing/error-correction]] 所要纠正的那类错误。
:::
:::

## 非定域性：CHSH 博弈

Bell 对的关联难道只是极其高明的预先约定的随机性吗？贝尔（Bell）在 1964 年证明，任何这样的“定域隐变量”模型都无法复现量子力学的全部预言。最干净的形式是一个博弈，其不等式形式归于 Clauser、Horne、Shimony 与 Holt（1969）。

::: definition CHSH 博弈 {#def-chsh}
裁判把独立均匀的随机比特 $x$ 发给 Alice、$y$ 发给 Bob。两人不能通信，各自回答一个比特 $a$ 和 $b$。当 $a \oplus b = x\wedge y$ 时他们获胜：除非两个问题都是 $1$（此时答案必须不同），两人的答案必须一致。Alice 与 Bob 可以事先商定策略并共享任意资源。
:::

::: theorem CHSH 的经典值与量子值 {#thm-chsh}
(a) 任何经典策略——确定性函数 $a(x)$、$b(y)$，可以借助共享随机性选取——获胜概率至多 $3/4$。(b) 若 Alice 与 Bob 共享 $\ket{\Phi^+}$，Alice 在基 $\{\ket{\theta}, \ket{\theta^\perp}\}$ 下测量，其中 $\ket\theta = \cos\theta\ket0 + \sin\theta\ket1$，且 $\theta = 0$（$x = 0$ 时）或 $\pi/4$（$x = 1$ 时）；Bob 则分别取 $\theta = \pi/8$（$y = 0$ 时）或 $-\pi/8$（$y = 1$ 时），并把 $\ket\theta$ 报告为 $0$、$\ket{\theta^\perp}$ 报告为 $1$，则每对问题他们都以概率 $\cos^2(\pi/8) = \tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854$ 获胜。
:::

::: proof
(a) 一个确定性策略是四个比特 $a(0), a(1), b(0), b(1)$。若四对问题全部获胜，就需要 $a(0)\oplus b(0) = 0$、$a(0)\oplus b(1) = 0$、$a(1)\oplus b(0) = 0$ 且 $a(1)\oplus b(1) = 1$。把四个方程模 $2$ 相加，左边每个变量都出现两次，得到 $0 = 1$：不可能。所以四对问题至多赢三对，获胜概率至多 $3/4$（恒取 $a = b = 0$ 即可达到）。使用共享随机性 $r$ 的策略是确定性策略的混合：其获胜概率为 $\sum_r\Prob(r)\,w(r) \le \max_r w(r) \le 3/4$。

(b) 先证一个小引理：若双方分别在角度 $\alpha$ 与 $\beta$ 处测量 $\ket{\Phi^+}$，则 $\Prob(a = b) = \cos^2(\alpha - \beta)$。事实上，取实系数时，
$$
(\bra\alpha\otimes\bra\beta)\ket{\Phi^+} = \tfrac{1}{\sqrt2}(\cos\alpha\cos\beta + \sin\alpha\sin\beta) = \tfrac{1}{\sqrt2}\cos(\alpha - \beta),
$$
所以 $\Prob(0, 0) = \tfrac12\cos^2(\alpha - \beta)$。结果 $1$ 对应 $\ket{\theta^\perp} = \ket{\theta + \pi/2}$，于是 $\Prob(1, 1) = \tfrac12\cos^2\bigl((\alpha + \tfrac\pi2) - (\beta + \tfrac\pi2)\bigr)$，是同一个值，从而 $\Prob(a = b) = \cos^2(\alpha - \beta)$。现在对 $(x, y) = (0, 0), (0, 1), (1, 0)$，角度差为 $-\pi/8, \pi/8, \pi/8$，玩家需要同样的答案：概率 $\cos^2(\pi/8)$。对 $(1, 1)$，角度差为 $\pi/4 + \pi/8 = 3\pi/8$，需要不同的答案：概率 $1 - \cos^2(3\pi/8) = \sin^2(3\pi/8) = \cos^2(\pi/8)$。
:::

模拟器通过精确计算联合分布证实了这些数字。在基 $\ket\theta$ 下的测量这样完成：先用 $R_y(-2\theta)$ 旋转（由 [[quantum-computing/quantum-circuits#def-gates]]，它把振幅平面旋转 $-\theta$，把 $\ket\theta$ 变到 $\ket0$），再在计算基下测量。

```python
from qsim import *
import itertools

def Ry(t): return [[math.cos(t/2), -math.sin(t/2)], [math.sin(t/2), math.cos(t/2)]]
alice = [0, math.pi / 4]                 # 问题 x = 0, 1 的测量角
bob = [math.pi / 8, -math.pi / 8]        # 以及 y = 0, 1 的测量角

def win_probability(x, y):
    s = zeros(2); apply(s, H, 0); apply(s, X, 1, controls=(0,))   # |Phi+>
    apply(s, Ry(-2 * alice[x]), 0)       # 旋转，使 Z 测量恰好是在基
    apply(s, Ry(-2 * bob[y]), 1)         #   cos t|0> + sin t|1> 下测量……
    p = probs(s)                         # p[2a + b] = P(Alice 得 a，Bob 得 b)
    return sum(p[2*a + b] for a, b in itertools.product((0, 1), repeat=2)
               if a ^ b == x & y)

total = 0
for x, y in itertools.product((0, 1), repeat=2):
    w = win_probability(x, y); total += w / 4
    print(f"x={x} y={y}: P(win) = {w:.4f}")
print(f"quantum: {total:.4f}   cos^2(pi/8) = {math.cos(math.pi/8)**2:.4f}")

best = max(sum((a[x] ^ b[y]) == (x & y) for x in (0, 1) for y in (0, 1)) / 4
           for a in itertools.product((0, 1), repeat=2)
           for b in itertools.product((0, 1), repeat=2))
print("best deterministic classical strategy:", best)
```

```console
$ python3 chsh.py
x=0 y=0: P(win) = 0.8536
x=0 y=1: P(win) = 0.8536
x=1 y=0: P(win) = 0.8536
x=1 y=1: P(win) = 0.8536
quantum: 0.8536   cos^2(pi/8) = 0.8536
best deterministic classical strategy: 0.75
```

::: widget plot
f: cos(x)^2; sin(x)^2
x: -1.5708, 1.5708
y: 0, 1
labels: \Prob(a = b) = \cos^2(\alpha - \beta); \Prob(a \ne b)
vlines: -pi/8; pi/8; 3pi/8
hlines: 0.75
piticks: true
caption: 对以实角度 $\alpha$ 与 $\beta$ 测量的 $\ket{\Phi^+}$，两个结果一致的概率只依赖 $\alpha - \beta$（横轴）。最优 CHSH 策略在需要一致的地方用角度差 $\pm\pi/8$，在需要不一致的地方用 $3\pi/8$（竖线）；于是四对问题每一对都以概率 $0.854$ 获胜，超过经典的天花板 $0.75$（水平线）。
:::

没有量子策略能做得更好：**Tsirelson 界**（1980）表明 $\cos^2(\pi/8)$ 是遍及所有纠缠态与测量的最大值。于是 CHSH 博弈区分了三个世界——经典的 $3/4$、量子的 $0.854$，以及假想的“无通信盒子”能达到的值 $1$——而对经典界的违背已在实验中观测到。同时关闭定域性漏洞与探测漏洞的无漏洞贝尔测试由 Delft、Vienna 与 Boulder 的三个小组于 2015 年发表，2022 年诺贝尔物理学奖授予 Alain Aspect、John Clauser 与 Anton Zeilinger，以表彰他们关于纠缠光子的实验。在计算中，CHSH 型检测可以认证一台器件确实是量子的，并支撑着**设备无关**的随机数生成与密钥分发。

::: application 作为网络资源的纠缠
量子网络分发的是 ebit 而不是直接发送量子比特：光子在光纤中以约 $0.2$ dB/km 的速率丢失，而丢失的量子比特无法重发，因为它们无法被复制。**量子中继器**在短链路上制造贝尔对，用纠缠交换把它们接起来，然后用隐形传态搬移数据量子比特。2017 年，中国“墨子号”卫星在相距约 $1200$ km 的地面站之间分发纠缠光子，并把光子量子态从地面传送到轨道，距离最远约 $1400$ km。截至 2026 年，这样的链路还是实验，尚未成为基础设施。
:::

::: history
1935 年，爱因斯坦（Einstein）、Podolsky 与 Rosen 论证说，纠缠对的完美关联表明量子力学不完备；薛定谔（Schrödinger）同年回应，造了 *Verschränkung*（纠缠）一词，并称其为“量子力学最具特征之点”。John Bell 1964 年的定理表明任何定域隐变量理论都满足某些量子力学予以违背的不等式；John Clauser、Michael Horne、Abner Shimony 与 Richard Holt 在 1969 年把它化为可检验的形式；Alain Aspect 1981–82 年的实验用偏振纠缠光子证实了这种违背。不可克隆定理 1982 年由 William Wootters 与 Wojciech Zurek 发表，Dennis Dieks 独立得到了它。Charles Bennett 与 Stephen Wiesner 于 1992 年提出超密编码；1993 年 Bennett、Gilles Brassard、Claude Crépeau、Richard Jozsa、Asher Peres 与 Wootters 发表了 "Teleporting an unknown quantum state via dual classical and Einstein–Podolsky–Rosen channels"。光子偏振的隐形传态于 1997 年在 Innsbruck（Bouwmeester、Zeilinger 与合作者）与 Rome（Boschi、De Martini、Popescu 与合作者）被实验演示。
:::

## 后续内容

[[quantum-computing/first-algorithms]] 中的算法在输入寄存器与输出寄存器之间制造纠缠，然后让它发生干涉；例如 Simon 算法就靠测量输出寄存器、把输入留在两个值的叠加态上工作。隐形传态及其推广**门隐形传态**是容错计算的标配工具（[[quantum-computing/error-correction]]）：用纠缠的辅助量子比特施加门、测量征（syndrome）而不扰动编码后的数据；$X^{m_1}Z^{m_0}$ 这类泡利修正正是容错用量子计算机用软件跟踪的“泡利框架”。描述纠缠对一半的偏迹与密度矩阵也在其中发展。通过分发 ebit 把多个独立处理器连起来的硬件平台见 [[quantum-computing/quantum-hardware]]。

::: summary
- 两个系统的状态若不是张量积就是纠缠的；对两量子比特，$\alpha\ket{00} + \beta\ket{01} + \gamma\ket{10} + \delta\ket{11}$ 纠缠当且仅当 $\alpha\delta \ne \beta\gamma$（[[#cor-det]]）。
- 每个二部状态都有**施密特分解** $\sum_k\lambda_k\ket{u_k}\ket{v_k}$，由系数矩阵的 SVD 给出（[[#thm-schmidt]]）；四个**贝尔态**最大纠缠并构成一组基。
- **不可克隆**（[[#thm-no-cloning]]）：没有物理过程能复制两个非正交状态；对叠加态作 CNOT“复制”得到的反而是纠缠态。
- **无通信**（[[#prop-no-signalling]]）：局域操作不能改变远处测量点的统计，所以单凭纠缠不传递任何信息。
- **超密编码**：一个 ebit 加一个量子比特可发送两个比特。**隐形传态**：一个 ebit 加两个比特可发送一个未知量子比特，每种修正结果等概率（[[#thm-teleport]]）。
- **CHSH 博弈**经典至多以 $3/4$ 获胜，共享贝尔对则以 $\cos^2(\pi/8) \approx 0.854$ 获胜（[[#thm-chsh]]），由 Tsirelson 界这是最大值；实验证实了这一违背。
:::

## 习题

::: exercise 纠缠还是不纠缠？ {level=1}
下列状态哪些是纠缠的？(a) $\tfrac12(\ket{00} + \ket{01} + \ket{10} + \ket{11})$；(b) $\tfrac12(\ket{00} + \ket{01} + \ket{10} - \ket{11})$；(c) $\tfrac{1}{\sqrt2}(\ket{01} - \ket{11})$。
::: solution
用 [[#cor-det]]。(a) $\alpha\delta - \beta\gamma = \tfrac14 - \tfrac14 = 0$：乘积态，即 $\ket+\ket+$。(b) $-\tfrac14 - \tfrac14 = -\tfrac12 \ne 0$：纠缠（它是对 $\ket+\ket+$ 施加 CZ 的结果，等于 $\tfrac{1}{\sqrt2}(\ket0\ket+ + \ket1\ket-)$）。(c) $\alpha = \gamma = 0$，故 $0 - 0 = 0$：乘积态，$\ket-\ket1$。
:::
:::

::: exercise 一次部分测量 {level=1 check="2/3"}
状态 $\tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$ 的量子比特 $1$（右边那个）在计算基下测量。结果 $1$ 的概率是多少？（填一个分数。）
::: solution
量子比特 $1$ 上出现结果 $1$ 的项是 $\ket{01}$ 与 $\ket{11}$，所以概率为 $\tfrac13 + \tfrac13 = \tfrac23$。之后状态为 $\tfrac{1}{\sqrt2}(\ket0 + \ket1)\ket1 = \ket+\ket1$。
:::
:::

::: exercise 手工做超密编码 {level=1}
在 [[#alg-superdense]] 中，Alice 发送 $11$ 时产生哪个贝尔态？验证 Bob 的线路把它变成 $\ket{11}$。
::: solution
$Z X\otimes I$ 把 $\tfrac{1}{\sqrt2}(\ket{00} + \ket{11})$ 变为 $\tfrac{1}{\sqrt2}(Z\ket1\ket0 + Z\ket0\ket1) = \tfrac{1}{\sqrt2}(\ket{01} - \ket{10}) = \ket{\Psi^-}$。Bob 的 CNOT 给出 $\tfrac{1}{\sqrt2}(\ket{01} - \ket{11}) = \ket-\ket1$，再对量子比特 $0$ 施加 $H$ 得 $\ket1\ket1$。
:::
:::

::: exercise 隐形传态的资源 {level=1 check="200"}
传送 $100$ 个量子比特必须发送多少个经典比特？消耗多少个 ebit？（填经典比特的数目。）
::: solution
每个量子比特需要一个 ebit 和两个经典比特：$200$ 个比特与 $100$ 个 ebit。由超密编码与 Holevo 界可以证明每量子比特两个比特不可再省：否则把隐形传态与超密编码组合起来，就能在每发送一个量子比特时传递超过两个比特。
:::
:::

::: exercise 施密特系数 {level=2 check="(3+sqrt(5))/6"}
求 $\ket\psi = \tfrac{1}{\sqrt3}(\ket{00} + \ket{01} + \ket{11})$ 的施密特系数。较大的那个的平方 $\lambda_1^2$ 是多少？（填一个精确表达式。）
::: solution
系数矩阵为 $C = \tfrac{1}{\sqrt3}\begin{pmatrix}1 & 1\\ 0 & 1\end{pmatrix}$。奇值的平方是 $C^\dagger C = \tfrac13\begin{pmatrix}1 & 1\\ 1 & 2\end{pmatrix}$ 的特征值，其余特征多项式为 $\mu^2 - \mu + \tfrac19$（迹 $1$，行列式 $\tfrac19(2 - 1)$）。所以 $\mu = \tfrac12 \pm \tfrac12\sqrt{1 - 4/9} = \tfrac{3 \pm \sqrt5}{6}$。于是 $\lambda_1^2 = \tfrac{3 + \sqrt5}{6} \approx 0.873$，$\lambda_2^2 = \tfrac{3 - \sqrt5}{6} \approx 0.127$，二者相加为 $1$。该状态纠缠，但离最大纠缠很远：其纠缠熵约为 $0.55$ ebit。
:::
:::

::: exercise 角度引理的一般形式 {#ex-angle level=2}
证明：若双方分别在基 $\{\ket\alpha, \ket{\alpha^\perp}\}$ 与 $\{\ket\beta, \ket{\beta^\perp}\}$ 下测量 $\ket{\Phi^+}$，则无论角度如何，每人单独的结果都是均匀随机的。再证明对每个实 $\alpha$，$\ket{\Phi^+} = \tfrac{1}{\sqrt2}(\ket{\alpha}\ket{\alpha} + \ket{\alpha^\perp}\ket{\alpha^\perp})$。
::: solution
Alice 的边缘分布：$\Prob(a = 0) = \Prob(0,0) + \Prob(0,1) = \tfrac12\cos^2(\alpha - \beta) + \tfrac12\cos^2(\alpha - \beta - \tfrac\pi2) = \tfrac12(\cos^2 + \sin^2) = \tfrac12$，用到 [[#thm-chsh]] 证明中的引理；对 Bob 同理——正如无通信所要求的，它不可能依赖对方的角度。第二个断言：以 $\ket\alpha = c\ket0 + s\ket1$、$\ket{\alpha^\perp} = -s\ket0 + c\ket1$ 展开：$\ket\alpha\ket\alpha + \ket{\alpha^\perp}\ket{\alpha^\perp} = (c^2 + s^2)\ket{00} + (cs - sc)\ket{01} + (sc - cs)\ket{10} + (s^2 + c^2)\ket{11} = \ket{00} + \ket{11}$。所以 $\ket{\Phi^+}$ 在每个实旋转基下看起来都一样，把 [[#ex-half-bell]] 推广开来。（在复旋转下它并不不变：在 $Y$ 基下结果是反相关的。）
:::
:::

::: exercise 若能克隆就能通信 {level=2}
设 Bob 有一个器件能把任意量子比特状态 $\ket\phi$ 复制成 $\ket\phi^{\otimes k}$（$k$ 很大）。Alice 与 Bob 共享 $\ket{\Phi^+}$。说明 Alice 如何仅凭选择测量基就能立即给 Bob 发送一个比特，与 [[#prop-no-signalling]] 矛盾。
::: solution
要发送 $0$，Alice 在 $Z$ 基下测量；要发送 $1$，在 $X$ 基下测量。由 [[#ex-half-bell]]，Bob 的量子比特于是等概率处于 $\ket0, \ket1$ 之一，或 $\ket+, \ket-$ 之一。Bob 把它复制 $k$ 份，全部在 $Z$ 基下测量。若 Alice 用了 $Z$，$k$ 个结果全部一致。若她用了 $X$，它们是独立的公平硬币，全部一致的概率为 $2^{1-k}$。于是 Bob 以不高于 $2^{1-k}$ 的错误概率得知 Alice 的选择，且没有任何经典通信：这就是一个信号。既然无通信是量子力学的定理，克隆器不可能存在——这是 [[#thm-no-cloning]] 的第二个、物理性的证明。
:::
:::

::: exercise 纠缠交换 {level=3}
量子比特 $0, 1$ 与量子比特 $2, 3$ 各自从 $\ket{\Phi^+}$ 出发。对量子比特 $1$ 和 $2$ 作贝尔测量（CNOT $1\to2$、对 $1$ 施加 $H$、测量 $1$ 和 $2$），并对量子比特 $3$ 施加修正 $X^{m_2}$、再 $Z^{m_1}$。证明从未相互作用的量子比特 $0$ 与 $3$ 最终处于 $\ket{\Phi^+}$。用模拟器检验。
::: solution
隐形传态对输入状态是线性的，所以它对纠缠对的一半也成立：把量子比特 $1$ 当作输入，经由对 $(2, 3)$ 传送到量子比特 $3$。写出 $\ket{\Phi^+}_{01} = \tfrac{1}{\sqrt2}(\ket0_0\ket0_1 + \ket1_0\ket1_1)$，传送量子比特 $1$ 把每一项 $\ket j_0\ket j_1$ 变为 $\ket j_0\ket j_3$——两项的修正相同，因为由 [[#eq-teleport]]，结果概率与修正不依赖输入状态——于是结果为 $\tfrac{1}{\sqrt2}(\ket0_0\ket0_3 + \ket1_0\ket1_3)$。

```python
from qsim import *

rng = random.Random(3)
for trial in range(3):
    s = zeros(4)
    for a, b in ((0, 1), (2, 3)):                      # 贝尔对 (0,1) 与 (2,3)
        apply(s, H, a); apply(s, X, b, controls=(a,))
    apply(s, X, 2, controls=(1,)); apply(s, H, 1)      # 对 1 和 2 作贝尔测量
    m1, m2 = measure(s, 1, rng), measure(s, 2, rng)
    if m2: apply(s, X, 3)                              # 对量子比特 3 的修正
    if m1: apply(s, Z, 3)
    print(f"outcomes {m1}{m2}; state of all four qubits:"); show(s)
```

```console
$ python3 swapping.py
outcomes 10; state of all four qubits:
+0.7071 |0100>
+0.7071 |1101>
outcomes 10; state of all four qubits:
+0.7071 |0100>
+0.7071 |1101>
outcomes 01; state of all four qubits:
+0.7071 |0010>
+0.7071 |1011>
```

每次运行中，量子比特 $1$ 与 $2$ 存放测得的比特，量子比特 $0$ 与 $3$（第一位和最后一位）处于 $\tfrac{1}{\sqrt2}(\ket{0\cdot\cdot0} + \ket{1\cdot\cdot1})$：即状态 $\ket{\Phi^+}$。
:::
:::

::: exercise 由对称性看 CHSH 的经典值 {level=3}
(a) Alice 与 Bob 回答独立均匀随机比特时，获胜概率是多少？(b) 用“$\pm1$”形式证明经典界 $3/4$：记 $A_x = (-1)^{a(x)}$、$B_y = (-1)^{b(y)}$，证明 $S = A_0B_0 + A_0B_1 + A_1B_0 - A_1B_1 \in \{-2, 2\}$，并把 $S$ 的期望与获胜概率联系起来。(c) 量子策略达到什么 $\E[S]$ 值？
::: solution
(a) 此时 $a \oplus b$ 是与 $x \wedge y$ 无关的均匀比特，所以他们以概率 $1/2$ 获胜。(b) $S = A_0(B_0 + B_1) + A_1(B_0 - B_1)$。由于 $B_0, B_1 = \pm1$，$B_0 + B_1$ 与 $B_0 - B_1$ 之一为 $0$、另一个为 $\pm2$；所以 $S = \pm2$。项 $A_xB_y$ 当且仅当 $a \oplus b = 0$ 时为 $+1$，于是对 $(1,1)$ 翻转符号后，四个项中的每一个在对应问题对获胜时等于 $+1$、失败时等于 $-1$。对均匀 $(x, y)$ 取平均，$\tfrac14\E[S] = \Prob(\text{获胜}) - \Prob(\text{失败}) = 2\Prob(\text{获胜}) - 1$。由于每个确定性策略都有 $\abs S \le 2$，而对共享随机性取混合仍保持 $\abs{\E[S]} \le 2$——这就是 **CHSH 不等式**——我们得到 $2\Prob(\text{获胜}) - 1 \le 2/4$，即 $\Prob(\text{获胜}) \le 3/4$。(c) 量子地 $\Prob(\text{获胜}) = \cos^2(\pi/8)$，所以 $\E[S] = 4(2\cos^2(\pi/8) - 1) = 4\cos(\pi/4) = 2\sqrt2 \approx 2.83$，即 Tsirelson 界。
:::
:::
