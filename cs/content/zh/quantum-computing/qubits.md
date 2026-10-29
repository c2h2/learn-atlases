拿一枚均匀的硬币抛一次：正面或反面，概率各为 $1/2$。再抛一次，仍然是正面或反面各占 $1/2$。随机叠加随机仍是随机。现在拿单个光子，让它通过一块半镀银镜。它会在两条输出路径之一中被探测到，每条路径的概率都是 $1/2$，于是这面镜子看起来和抛硬币没有两样。但是，如果不探测光子，而是把两条路径在第二面半镀银镜上重新合束，光子每次都从**同一个特定端口**出来。两次"抛硬币"产生了一个确定的结果。"光子走了哪条路径"上的任何概率分布都无法解释这一点：概率非负，不可能相互抵消。能够抵消的是**振幅**——其模的平方为概率的复数，与概率不同，它们可以相加得零。

本章就从这一观察出发建立量子计算的语言。我们用一个由两个复振幅构成的单位向量来描述**量子比特**（qubit），用狄拉克（Dirac）记号书写它，给出计算机科学家需要的量子力学公理（状态、酉演化、测量、复合系统），并把单个量子比特画成**布洛赫球**（Bloch sphere）上的一点。沿途我们会证明三个塑造后续一切内容的事实：全局相位不可观测；非正交的状态不可能被确切地区分；在不同基下的测量揭示不同的、互补的信息。唯一的预备知识是复数（[数学图谱：复数](/learn/maths/lesson.php?c=complex-analysis&l=complex-numbers)）与内积空间（[数学图谱：内积](/learn/maths/lesson.php?c=linear-algebra&l=inner-products)）；公理背后的物理在[物理图谱：量子力学的形式体系](/learn/physics/lesson.php?c=quantum-1&l=formalism)。

## 从概率比特到振幅

经典比特是 $0$ 或 $1$。一个**概率比特**——其取值只能按统计规律知道的比特——由向量 $(p_0, p_1)$ 描述，其中 $p_0, p_1 \ge 0$ 且 $p_0 + p_1 = 1$。对它的任何操作，无论确定的还是随机的，都是一个**随机矩阵**：元素非负、各列之和为 $1$ 的矩阵。无论该比特原来是什么，对它施加一次均匀抛硬币，就是
$$
C = \begin{pmatrix} 1/2 & 1/2 \\ 1/2 & 1/2 \end{pmatrix}, \qquad C\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}1/2\\1/2\end{pmatrix}, \qquad C^2 = C .
$$
抛两次和抛一次相同。$1$-范数 $p_0 + p_1$ 保持不变，除了看一看之外没有任何东西能减少不确定性。

量子力学用**振幅**向量 $(\alpha, \beta) \in \C^2$ 取代概率向量，并且固定的是 **2-范数**：$\abs{\alpha}^2 + \abs{\beta}^2 = 1$。看到 $0$ 的概率是 $\abs{\alpha}^2$，看到 $1$ 的概率是 $\abs{\beta}^2$。此时的运算是保持 2-范数的矩阵——**酉**矩阵。半镀银镜的量子对应是**哈达玛**（Hadamard）矩阵
$$
H = \frac{1}{\sqrt 2}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}, \qquad H\begin{pmatrix}1\\0\end{pmatrix} = \frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}, \qquad H^2 = I .
$$
施加一次给出振幅各为 $1/\sqrt2$，所以测量以 $1/2$ 的概率看到 $0$ 或 $1$——与抛硬币不可区分。再施加一次则回到 $(1, 0)$：$1$ 的振幅的两个贡献 $\tfrac{1}{\sqrt2}\cdot\tfrac{1}{\sqrt2}$ 与 $\tfrac{1}{\sqrt2}\cdot(-\tfrac{1}{\sqrt2})$ 相互抵消。这就是**干涉**，本课程中的每一个量子算法归根到底都是安排干涉的办法，使错误答案的振幅抵消、正确答案的振幅增强。

### 狄拉克记号

物理学家把 $\C^d$ 中的向量写作**右矢**（ket）$\ket{\psi}$。$\C^2$ 的标准基是**计算基**
$$
\ket 0 = \begin{pmatrix}1\\0\end{pmatrix}, \qquad \ket 1 = \begin{pmatrix}0\\1\end{pmatrix},
$$
于是 $\alpha\ket0 + \beta\ket1 = (\alpha, \beta)\T$。

::: definition 狄拉克记号 {#def-dirac}
对于列向量 $\ket\psi \in \C^d$，其**左矢**（bra）$\bra\psi$ 是它的共轭转置，一个行向量：$\bra\psi = \ket\psi^\dagger$。$\ket\phi$ 与 $\ket\psi$ 的**内积**是数
$$
\braket{\phi|\psi} = \bra\phi\,\ket\psi = \sum_{i} \overline{\phi_i}\,\psi_i ,
$$
它对 $\ket\psi$ 线性、对 $\ket\phi$ 共轭线性，并满足 $\braket{\psi|\phi} = \overline{\braket{\phi|\psi}}$。**范数**为 $\norm{\psi} = \sqrt{\braket{\psi|\psi}}$。**外积** $\ket\psi\!\bra\phi$ 是一个 $d \times d$ 矩阵，其作用为 $\ket\chi \mapsto \braket{\phi|\chi}\,\ket\psi$。对于矩阵 $A$，$A^\dagger = \overline{A}\T$ 是它的**伴随**（共轭转置），且 $\bra\phi A \ket\psi = \braket{\phi|A\psi}$。
:::

有两个外积值得牢记。若 $\ket\psi$ 是单位向量，则 $\ket\psi\!\bra\psi$ 是向 $\ket\psi$ 所在直线作正交投影的**投影算子**。而若 $\ket{e_1}, \dots, \ket{e_d}$ 是任意一组标准正交基，则向基向量作投影的投影算子之和等于恒等：
$$
\sum_{i=1}^{d} \ket{e_i}\!\bra{e_i} = I .
$$ {#eq-completeness}
把 [[#eq-completeness]] 作用在一个向量上就得到它在该基下的展开 $\ket\psi = \sum_i \braket{e_i|\psi}\ket{e_i}$，所以 $\ket\psi$ 在任何一组标准正交基下的系数都是内积。

$\C^2$ 的第二个基经常出现。**哈达玛基**或 $X$ 基是
$$
\ket{+} = \frac{\ket0 + \ket1}{\sqrt2}, \qquad \ket{-} = \frac{\ket0 - \ket1}{\sqrt2},
$$
即 $H\ket0$ 与 $H\ket1$。可直接验证 $\braket{+|+} = \tfrac12(1 + 1) = 1$ 且 $\braket{+|-} = \tfrac12(1 - 1) = 0$；反过来 $\ket0 = (\ket+ + \ket-)/\sqrt2$，$\ket1 = (\ket+ - \ket-)/\sqrt2$。

::: example 内积与归一化 {#ex-inner}
设 $\ket\psi = \frac{1}{\sqrt3}\ket0 + \frac{\sqrt2\, i}{\sqrt3}\ket1$，$\ket\phi = \ket{-}$。验证 $\ket\psi$ 是单位向量，计算 $\braket{\phi|\psi}$，并把 $\ket\psi$ 写在哈达玛基下。
::: solution
$\braket{\psi|\psi} = \abs{1/\sqrt3}^2 + \abs{\sqrt2 i/\sqrt3}^2 = 1/3 + 2/3 = 1$。$\ket-$ 的左矢是 $\tfrac{1}{\sqrt2}(1, -1)$（元素为实数，取共轭不起作用），且
$$
\braket{-|\psi} = \frac{1}{\sqrt2}\Bigl(\frac{1}{\sqrt3} - \frac{\sqrt2 i}{\sqrt3}\Bigr) = \frac{1 - \sqrt2 i}{\sqrt6}.
$$
类似地 $\braket{+|\psi} = (1 + \sqrt2 i)/\sqrt6$。由 [[#eq-completeness]]，$\ket\psi = \frac{1+\sqrt2 i}{\sqrt6}\ket+ + \frac{1-\sqrt2 i}{\sqrt6}\ket-$。验证一下：两者模的平方 $\abs{1 \pm \sqrt2 i}^2/6 = 3/6 = 1/2$，恰相加为 $1$。
:::
:::

## 量子计算的公理

量子力学是一个框架，如同概率论，具体的物理理论在其中书写。对计算我们只需要四条规则。我们对有限维系统陈述它们，而量子计算机用到的也只是有限维系统。

::: definition 量子力学公理（有限维） {#def-postulates}
1. **状态。** 孤立系统的状态是复内积空间 $\C^d$——其**态空间**——中的一个单位向量 $\ket\psi$。$d = 2$ 的系统是一个**量子比特**：其状态为 $\alpha\ket0 + \beta\ket1$，其中 $\abs\alpha^2 + \abs\beta^2 = 1$。
2. **演化。** 在两次测量之间，状态通过一个**酉**矩阵 $U$（满足 $U^\dagger U = I$）改变：$\ket\psi \mapsto U\ket\psi$。
3. **测量。** 在一组标准正交基 $\ket{e_1}, \dots, \ket{e_d}$ 下测量，给出结果 $i$ 的概率为
$$
p(i) = \abs{\braket{e_i|\psi}}^2 ,
$$
且紧接着的状态是 $\ket{e_i}$。更一般地，一个**投影测量**是一族满足 $\sum_k P_k = I$ 的正交投影算子 $P_1, \dots, P_m$；结果 $k$ 的概率为 $p(k) = \bra\psi P_k\ket\psi = \norm{P_k\psi}^2$，并把状态留为 $P_k\ket\psi / \norm{P_k\psi}$。
4. **复合。** 由各部分态空间 $\C^{d_1}$ 与 $\C^{d_2}$ 构成的系统，其态空间是张量积 $\C^{d_1} \otimes \C^{d_2} = \C^{d_1 d_2}$。特别地，$n$ 个量子比特的态空间是 $\C^{2^n}$，计算基为 $\ket{x}$，$x \in \{0,1\}^n$。
:::

第三条公理就是**玻恩规则**（Born rule）。在计算基下测量是通常的默认做法（"测量这个量子比特"），以概率 $\abs\alpha^2$ 给出 $0$、以概率 $\abs\beta^2$ 给出 $1$。该规则是相容的：概率之和为 $1$，因为由 [[#eq-completeness]] 有 $\sum_i \abs{\braket{e_i|\psi}}^2 = \bra\psi\bigl(\sum_i \ket{e_i}\!\bra{e_i}\bigr)\ket\psi = \braket{\psi|\psi} = 1$。第四条公理既是量子计算威力之源——$n$ 个量子比特需要 $2^n$ 个振幅——也是纠缠之源；它是 [[quantum-computing/entanglement]] 的主题。本章我们只讨论单个量子比特。

这些规则有两个没有经典对应的特征。测量是**破坏性的**：它把状态换成某个基向量，从一份拷贝中读不出振幅 $\alpha, \beta$。而演化是**可逆的**：酉矩阵有逆 $U^{-1} = U^\dagger$，所以两次测量之间不丢失任何信息。不可逆性只通过测量进入——也通过环境进入，环境实际上是在对一个系统作测量而不告诉我们，[[quantum-computing/error-correction]] 会解释这一点。

::: proposition 酉变换保持内积 {#prop-unitary}
对于复方阵 $U$，下面几条等价：(a) $U^\dagger U = I$；(b) 对一切 $\ket\phi, \ket\psi$ 有 $\braket{U\phi|U\psi} = \braket{\phi|\psi}$；(c) 对一切 $\ket\psi$ 有 $\norm{U\psi} = \norm{\psi}$。特别地，酉变换把标准正交基变为标准正交基，且酉矩阵的每个特征值 $\lambda$ 都满足 $\abs\lambda = 1$。
:::

::: proof
(a)⇒(b)：$\braket{U\phi|U\psi} = \bra\phi U^\dagger U\ket\psi = \braket{\phi|\psi}$。(b)⇒(c)：取 $\phi = \psi$。(c)⇒(a)：矩阵 $A = U^\dagger U - I$ 是 Hermitian 的，且对每个 $\ket\psi$ 满足 $\bra\psi A\ket\psi = \norm{U\psi}^2 - \norm{\psi}^2 = 0$。Hermitian 矩阵可在标准正交特征向量基下对角化且特征值为实数（[数学图谱：谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)）；把 $\ket\psi$ 依次取为每个特征向量即知每个特征值都是 $0$，故 $A = 0$。最后，若 $U\ket v = \lambda\ket v$ 且 $\ket v \ne 0$，则 $\norm{v} = \norm{Uv} = \abs\lambda\,\norm{v}$，所以 $\abs\lambda = 1$。
:::

::: example 两个哈达玛门对两次抛硬币 {#ex-interference}
从 $\ket0$ 出发。施加 $H$，测量，再施加 $H$，再测量。与施加两次 $H$ 只测量一次的情形比较。
::: solution
*含中间测量。* $H\ket0 = \ket+$，测量以概率 $1/2$ 各给出 $0$ 或 $1$，并把状态留为 $\ket0$ 或 $\ket1$。随后 $H\ket0 = \ket+$ 与 $H\ket1 = \ket-$ 都让最终结果 $0$ 和 $1$ 各以概率 $1/2$ 出现。总的来看：均匀分布，和两次抛硬币一模一样。

*不含中间测量。* $H(H\ket0) = H\ket+ = \tfrac{1}{\sqrt2}(H\ket0 + H\ket1) = \tfrac12(\ket0 + \ket1 + \ket0 - \ket1) = \ket0$。最终测量以概率 $1$ 给出 $0$。$\ket1$ 的振幅有两个贡献，$+\tfrac12$（经由 $\ket0$）与 $-\tfrac12$（经由 $\ket1$），它们相互抵消。中间测量固定了"走了哪条路径"，从而破坏了干涉。
:::
:::

::: warning 叠加不是隐藏的抛硬币
很容易想把 $\ket+ = (\ket0 + \ket1)/\sqrt2$ 读成"量子比特或是 $0$ 或是 $1$，只是我们不知道是哪个"。那描述的是另一种对象，一个五五开的**混合**，而 [[#ex-interference]] 中的中间测量产生的正是它。两者在计算基下给出相同的统计，但 $H$ 以确定性把 $\ket+$ 变成 $\ket0$，而对混合它留下的仍是均匀随机。同样误导人的说法是"量子比特同时是 $0$ 和 $1$，所以量子计算机并行尝试所有答案"：一次测量只返回一个结果，而量子算法的艺术恰恰在于用干涉把概率集中到有用的结果上。混合需用密度矩阵恰当描述，见 [[quantum-computing/error-correction]]。
:::

## 测量及其能揭示的信息

### 全局相位与相对相位

把状态乘以模为一的复数，$\ket\psi \mapsto e^{i\gamma}\ket\psi$，改变了向量但不改变物理。

::: proposition 全局相位不可观测 {#prop-global-phase}
对每个实数 $\gamma$、每个酉矩阵 $U$ 和每个投影测量 $\{P_k\}$，状态 $\ket\psi$ 与 $e^{i\gamma}\ket\psi$ 在 $U$ 之后给出相同的结果概率，且测量后的状态再次只相差因子 $e^{i\gamma}$。
:::

::: proof
由线性性，$U(e^{i\gamma}\ket\psi) = e^{i\gamma}U\ket\psi$。对测量来说，$\norm{P_k e^{i\gamma}U\psi}^2 = \abs{e^{i\gamma}}^2\norm{P_kU\psi}^2 = \norm{P_kU\psi}^2$，且归一化后的测后状态为 $e^{i\gamma}P_kU\ket\psi/\norm{P_kU\psi}$。每个实验都是一串酉变换与测量，对其长度作归纳即知没有实验能区分两者。
:::

所以物理的状态其实是**至多相差一个全局相位**的单位向量。然而**相对相位**是可观测的：$\ket+$ 与 $\ket- = \tfrac{1}{\sqrt2}(\ket0 + e^{i\pi}\ket1)$ 只在 $\ket1$ 振幅的相位上不同，在计算基下给出完全相同的统计，但在哈达玛基下的测量却能确切地区分它们。量子算法把信息储存在相对相位中，然后通过基变换——常常就是 $H$——把相位转化为可测量的振幅。

### 区分状态

测量提取的信息有限。给定一份未知状态，承诺它或者为 $\ket\psi$ 或者为 $\ket\phi$，我们能分辨是哪一个吗？

::: theorem 非正交状态不能被可靠地区分 {#thm-distinguish}
设 $\ket\psi, \ket\phi$ 是单位向量。存在一个投影测量 $\{P_k\}$ 和一个判定规则（从结果到 $\{\psi, \phi\}$ 的函数 $g$），对两个状态都以概率 $1$ 正确，当且仅当 $\braket{\phi|\psi} = 0$。
:::

::: proof
若 $\braket{\phi|\psi} = 0$，把 $\ket\psi, \ket\phi$ 扩充为一组标准正交基并在其下测量；结果 $\psi$ 在 $\ket\psi$ 上以概率 $1$ 出现，在 $\ket\phi$ 上绝不出现。

反过来，设测量与规则总是正确。令 $Q = \sum_{k : g(k) = \psi} P_k$，它是一个投影算子（两两正交的投影算子之和），$I - Q$ 是"猜 $\phi$"对应的投影算子。以概率 $1$ 正确意味着 $\bra\psi Q\ket\psi = 1$ 且 $\bra\phi Q\ket\phi = 0$。由于 $\norm{Q\psi}^2 = \bra\psi Q\ket\psi = 1 = \norm{\psi}^2$ 且 $\norm{Q\psi}^2 + \norm{(I-Q)\psi}^2 = \norm\psi^2$，得 $(I-Q)\ket\psi = 0$，即 $Q\ket\psi = \ket\psi$。同理 $\norm{Q\phi} = 0$，故 $Q\ket\phi = 0$。于是利用 $Q = Q^\dagger$，
$$
\braket{\phi|\psi} = \braket{\phi|Q\psi} = \braket{Q\phi|\psi} = 0. \qquad
$$
:::

该定理是量子状态不能被简单地读出并复制的原因，它与 [[quantum-computing/entanglement]] 的**不可克隆定理**密切相关：若非正交状态可以被复制，许多份拷贝就会让我们把它们区分开。它也是量子密钥分发（见下文的应用）的基础。当状态不正交时，在先验等概下最好的成功概率是 $\tfrac12 + \tfrac12\sqrt{1 - \abs{\braket{\phi|\psi}}^2}$（**Helstrom 界**，1976）；[[#ex-helstrom]] 为区分 $\ket0$ 与 $\ket+$ 找到了达到该界的测量。

::: example 测量造成扰动 {#ex-disturb}
一个量子比特制备在 $\ket0$。我们先在 $Z$ 基下测量，然后在 $X$ 基下测量，最后再次在 $Z$ 基下测量。最后一次测量给出 $1$ 的概率是多少？若去掉中间的测量呢？
::: solution
第一次 $Z$ 测量以概率 $1$ 给出 $0$ 并留下 $\ket0$。$X$ 测量以概率 $\abs{\braket{\pm|0}}^2 = 1/2$ 各给出 $+$ 或 $-$，并把状态留为 $\ket+$ 或 $\ket-$。无论哪种，最后一次 $Z$ 测量都以概率 $\abs{\braket{1|\pm}}^2 = 1/2$ 给出 $1$，所以答案是 $\tfrac12\cdot\tfrac12 + \tfrac12\cdot\tfrac12 = 1/2$。没有中间测量时状态保持 $\ket0$，概率为 $0$。测量 $X$ 抹掉了"量子比特是 $\ket0$"这一信息：$Z$ 基与 $X$ 基是**互补的**——对一个结果知道得越完整，对另一个就一无所知。这就是海森堡（Heisenberg）不确定性原理的量子比特版本，也正是 BB84（见下文）上的窃听者撞上的东西。
:::
:::

### 可观测量与期望值

物理学家常用一个 Hermitian 矩阵 $A = \sum_k a_k P_k$——一个**可观测量**——来描述测量，它的特征值 $a_k$ 标记结果，特征子空间是诸 $P_k$ 的值域。结果的**期望值**就是
$$
\langle A \rangle_\psi = \sum_k a_k\,\bra\psi P_k\ket\psi = \bra\psi A \ket\psi .
$$
三个**泡利矩阵**（Pauli）
$$
X = \begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}, \qquad Y = \begin{pmatrix} 0 & -i \\ i & 0\end{pmatrix}, \qquad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix}
$$
既 Hermitian 又酉，特征值为 $\pm1$。"测量 $Z$"就是在计算基下测量，$0$ 记作 $+1$、$1$ 记作 $-1$；"测量 $X$"是在基 $\ket\pm$ 下测量；"测量 $Y$"使用基 $\ket{\pm i} = (\ket0 \pm i\ket1)/\sqrt2$。对 $\ket\psi = \alpha\ket0 + \beta\ket1$，
$$
\langle Z\rangle = \abs\alpha^2 - \abs\beta^2, \qquad \langle X\rangle = 2\operatorname{Re}(\overline\alpha\beta), \qquad \langle Y \rangle = 2\operatorname{Im}(\overline\alpha\beta).
$$ {#eq-pauli-exp}
（例如 $\bra\psi X\ket\psi = \overline\alpha\beta + \overline\beta\alpha = 2\operatorname{Re}(\overline\alpha\beta)$。）对电子而言，这些是其自旋的三个分量，用 Stern–Gerlach 磁铁测量（[物理图谱：自旋](/learn/physics/lesson.php?c=quantum-1&l=spin)）；对计算机科学家而言，它们是可以对一个量子比特提出的三个互补的问题，每个都只能按统计规律回答。

下面的程序计算所选基下的测量概率，并模拟重复测量（"shots"，采样），这是每一台真实量子计算机报告结果的方式。它使用 Python 内置的 `complex` 类型；不需要任何库。

```python
import cmath, math, random

def bloch(alpha, beta):
    """量子比特 alpha|0> + beta|1> 的布洛赫球坐标 (x, y, z)。"""
    x = 2 * (alpha.conjugate() * beta).real
    y = 2 * (alpha.conjugate() * beta).imag
    z = abs(alpha) ** 2 - abs(beta) ** 2
    return round(x, 4), round(y, 4), round(z, 4)

def measure_basis(state, basis, shots, rng):
    """在标准正交基 basis 下对 state 测量 shots 次；统计各结果。"""
    p = [abs(sum(b.conjugate() * a for b, a in zip(v, state))) ** 2 for v in basis]
    counts = [0] * len(basis)
    for _ in range(shots):
        counts[0 if rng.random() < p[0] else 1] += 1
    return [round(q, 4) for q in p], counts

r2 = 1 / math.sqrt(2)
plus = [r2, r2]                                  # |+>
psi = [math.cos(math.pi / 8), cmath.exp(1j * math.pi / 2) * math.sin(math.pi / 8)]
Zb = [[1, 0], [0, 1]]                            # 计算基
Xb = [[r2, r2], [r2, -r2]]                       # |+>, |->
rng = random.Random(2026)
print("bloch(|+>)   =", bloch(complex(r2), complex(r2)))
print("bloch(psi)   =", bloch(complex(psi[0]), psi[1]))
print("|+> in Z:", measure_basis(plus, Zb, 1000, rng))
print("|+> in X:", measure_basis(plus, Xb, 1000, rng))
print("psi in Z:", measure_basis(psi, Zb, 1000, rng))
```

```console
$ python3 measure.py
bloch(|+>)   = (1.0, 0.0, 0.0)
bloch(psi)   = (0.0, 0.7071, 0.7071)
|+> in Z: ([0.5, 0.5], [495, 505])
|+> in X: ([1.0, 0.0], [1000, 0])
psi in Z: ([0.8536, 0.1464], [854, 146])
```

状态 $\ket+$ 在 $Z$ 基下给出抛硬币式的统计，在 $X$ 基下却给出确定的结果。计数围绕概率波动：$1000$ 次采样下，$p = 1/2$ 的计数的标准差是 $\sqrt{1000 \cdot \tfrac12\cdot\tfrac12} \approx 16$，所以要把一个振幅估计到小数点后 $k$ 位，需要把整个计算重复约 $10^{2k}$ 次。图中显示了这类计数的分布。

::: widget distribution
dist: binomial
params: n=100, p=0.8536
a: 80
b: 90
normal: true
caption: 对一个满足 $\Prob(0) = \cos^2(\pi/8) \approx 0.854$ 的状态采样 $100$ 次，其中结果为 $0$ 的次数。改变 $n$ 会看到散布按 $\sqrt n$ 增长，而相对散布按 $1/\sqrt n$ 缩小。你在量子计算机上读到的每一个概率，都是这样得到的估计。
:::

::: quiz
下面哪些单量子比特状态对至少一种测量给出*不同的*概率？（选出所有符合的。）
- [ ] $\ket1$ 和 $-\ket1$
- [x] $\ket+$ 和 $\ket-$
- [x] $\tfrac{1}{\sqrt2}(\ket0 + i\ket1)$ 和 $\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$
- [ ] $\tfrac{1}{\sqrt2}(i\ket0 + \ket1)$ 和 $\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$
::: solution
$-\ket1 = e^{i\pi}\ket1$ 只差一个全局相位，且 $\tfrac{1}{\sqrt2}(i\ket0 + \ket1) = i\cdot\tfrac{1}{\sqrt2}(\ket0 - i\ket1)$ 同理，所以由 [[#prop-global-phase]]，没有测量能区分它们。$\ket\pm$ 相差一个相对相位，可用 $X$ 测量分开；状态 $\ket{\pm i}$ 则可用 $Y$ 测量分开。
:::
:::

## 布洛赫球

量子比特的状态有两个复振幅、四个实数，受归一化约束（一个方程），并且只在全局相位的意义下有定义（又一个参数）。剩下两个实参数——对球面上的一点来说恰够。

::: theorem 布洛赫球表示 {#thm-bloch}
每个单量子比特状态都至多相差一个全局相位，等于
$$
\ket{\psi(\theta, \varphi)} = \cos\frac\theta2\,\ket0 + e^{i\varphi}\sin\frac\theta2\,\ket1
$$ {#eq-bloch}
其中 $\theta \in [0, \pi]$ 唯一，且当 $0 < \theta < \pi$ 时 $\varphi \in [0, 2\pi)$ 唯一。状态的**布洛赫向量**是单位向量 $\vec r = (\sin\theta\cos\varphi, \sin\theta\sin\varphi, \cos\theta) = (\langle X\rangle, \langle Y\rangle, \langle Z\rangle)$，且从状态（相差相位）到单位球上的点的映射是双射。
:::

::: proof
设 $\ket\psi = \alpha\ket0 + \beta\ket1$ 且 $\abs\alpha^2 + \abs\beta^2 = 1$。若 $\alpha \ne 0$，乘以全局相位 $\overline\alpha/\abs\alpha$，使 $\ket0$ 的振幅为实正数；若 $\alpha = 0$，状态相差一个相位就是 $\ket1$，即 [[#eq-bloch]] 取 $\theta = \pi$。现在 $\alpha = a > 0$ 且 $\abs\beta = \sqrt{1 - a^2}$，于是存在唯一的 $\theta \in [0, \pi)$ 使 $\cos(\theta/2) = a$、$\sin(\theta/2) = \abs\beta$（因为 $\theta/2 \in [0, \pi/2)$，而余弦在此区间到 $(0, 1]$ 是双射）。若 $\beta \ne 0$，写 $\beta = \abs\beta e^{i\varphi}$，$\varphi \in [0, 2\pi)$ 唯一；若 $\beta = 0$ 则 $\theta = 0$，$\varphi$ 无关紧要。$\theta$ 在两种情形之间也唯一，因为 $\theta$ 由 $\abs\alpha = \cos(\theta/2)$ 决定，与相位无关。

至于布洛赫向量，把 [[#eq-pauli-exp]] 用于 $\alpha = \cos\frac\theta2$、$\beta = e^{i\varphi}\sin\frac\theta2$：$\langle Z\rangle = \cos^2\frac\theta2 - \sin^2\frac\theta2 = \cos\theta$，且 $\overline\alpha\beta = e^{i\varphi}\cos\frac\theta2\sin\frac\theta2 = \tfrac12 e^{i\varphi}\sin\theta$，所以 $\langle X\rangle = \sin\theta\cos\varphi$、$\langle Y\rangle = \sin\theta\sin\varphi$。这正是以极角 $\theta$、方位角 $\varphi$ 表示的球坐标；$\theta \in [0, \pi]$、$\varphi$ 如上取值时，球坐标恰好用一次覆盖球面上每一点（两极处 $\varphi$ 任意），这就给出了双射。
:::

北极是 $\ket0$，南极是 $\ket1$，赤道上放着等幅叠加 $\tfrac{1}{\sqrt2}(\ket0 + e^{i\varphi}\ket1)$：$\ket+$ 在 $+x$ 轴上，$\ket{+i}$ 在 $+y$ 上，$\ket-$ 在 $-x$ 上，$\ket{-i}$ 在 $-y$ 上。注意半角：$\ket0$ 与 $\ket1$ 作为向量正交，在球面上却是对跖的，相距 $180°$。这是普遍现象。

::: proposition 由布洛赫向量求重叠 {#prop-overlap}
若 $\ket\psi, \ket\phi$ 的布洛赫向量为 $\vec r, \vec s$，则 $\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \vec r\cdot\vec s)$。特别地，两个状态正交当且仅当它们的布洛赫向量对跖；在基 $\{\ket\phi, \ket{\phi^\perp}\}$ 下测量 $\ket\psi$，以概率 $\cos^2(\Theta/2)$ 给出结果 $\phi$，其中 $\Theta$ 是 $\vec r$ 与 $\vec s$ 的夹角。
:::

::: proof
对布洛赫向量为 $\vec s$ 的单位向量 $\ket\phi$，投影算子是
$$
\ket\phi\!\bra\phi = \tfrac12\bigl(I + s_x X + s_y Y + s_z Z\bigr).
$$
验证如下：写 $\ket\phi = (a, b)\T$；则 $\ket\phi\!\bra\phi = \begin{pmatrix}\abs a^2 & a\overline b\\ \overline a b & \abs b^2\end{pmatrix}$，而右端为 $\tfrac12\begin{pmatrix}1 + s_z & s_x - is_y\\ s_x + is_y & 1 - s_z\end{pmatrix}$；由 [[#eq-pauli-exp]]，$s_z = \abs a^2 - \abs b^2$ 且 $s_x + is_y = 2\overline a b$，又因 $\abs a^2 + \abs b^2 = 1$，各元素相等。于是
$$
\abs{\braket{\phi|\psi}}^2 = \bra\psi\,\ket\phi\!\bra\phi\,\ket\psi = \tfrac12\bigl(1 + s_x\langle X\rangle_\psi + s_y\langle Y\rangle_\psi + s_z\langle Z\rangle_\psi\bigr) = \tfrac12(1 + \vec s\cdot\vec r).
$$
当 $\vec r\cdot\vec s = -1$、即 $\vec s = -\vec r$ 时它恰为 $0$；取 $\vec r\cdot\vec s = \cos\Theta$ 时它等于 $\tfrac12(1 + \cos\Theta) = \cos^2(\Theta/2)$。
:::

::: example 测量一个倾斜状态 {#ex-tilted}
一个量子比特的布洛赫向量处于极角 $\theta = \pi/4$、方位角 $\varphi = \pi/2$（上面程序中的状态 `psi`）。求它的振幅、布洛赫向量，以及 $Z$、$X$、$Y$ 测量各结果的概率。
::: solution
由 [[#eq-bloch]]，$\ket\psi = \cos\frac\pi8\ket0 + i\sin\frac\pi8\ket1 \approx 0.924\ket0 + 0.383i\ket1$。其布洛赫向量为 $(\sin\frac\pi4\cos\frac\pi2, \sin\frac\pi4\sin\frac\pi2, \cos\frac\pi4) = (0, \tfrac{1}{\sqrt2}, \tfrac{1}{\sqrt2})$，与程序打印的一致。由 [[#prop-overlap]]，沿单位向量为 $\vec s$ 的轴测得 $+1$ 的概率是 $\tfrac12(1 + \vec r\cdot\vec s)$：

| 测量 | $\vec r \cdot \vec s$ | $\Prob(+1)$ | $\Prob(-1)$ |
|---|---|---|---|
| $Z$ | $1/\sqrt2$ | $\tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854$ | $\approx 0.146$ |
| $X$ | $0$ | $1/2$ | $1/2$ |
| $Y$ | $1/\sqrt2$ | $\approx 0.854$ | $\approx 0.146$ |

$Z$ 一行与模拟计数 $854$ 和 $146$ 相符。没有任何单次测量能揭示 $\vec r$；三个测量一起才能决定它，这就是**态层析**（state tomography）的思想（[[#ex-tomography]]）。
:::
:::

酉变换在布洛赫球上的作用是旋转——$X$ 是绕 $x$ 轴转 $\pi$，$Z$ 是绕 $z$ 轴转 $\pi$，$H$ 是绕轴 $(x + z)/\sqrt2$ 转 $\pi$，交换 $\ket0 \leftrightarrow \ket+$——这一事实在 [[quantum-computing/quantum-circuits]] 中证明并使用。下图供你探索 [[#prop-overlap]] 的测量概率。

::: widget plot
f: cos(x/2)^2; (1 + sin(x)*cos(p))/2; (1 + sin(x)*sin(p))/2
x: 0, pi
y: 0, 1
sliders: p=0:0:6.2832:0.01
labels: \Prob(0) = \cos^2(\theta/2); \Prob(+) ; \Prob(+i)
piticks: true
caption: 状态 $\cos\frac\theta2\ket0 + e^{i\varphi}\sin\frac\theta2\ket1$ 的结果概率作为极角 $\theta$（横轴）的函数，方位角 $\varphi$ 由滑块 $p$ 设定。$Z$ 统计完全不依赖 $\varphi$；相对相位只在 $X$ 与 $Y$ 测量中显现。在 $\theta = \pi/2$（赤道）处试试 $p = 0$、$\pi/2$、$\pi$。
:::

::: warning 布洛赫球并不储存连续统那么多信息
球面上一点要用无穷多比特来指定，但一个量子比特不能用来传递多过一个经典比特的信息。**Holevo 定理**（1973）断言：若 $n$ 个量子比特被制备成依赖某个经典消息的状态，然后以任何方式测量，则消息与结果之间的互信息至多为 $n$ 比特。角度 $\theta, \varphi$ 只是一个概率分布的参数，只能被估计，$k$ 份拷贝能达到的精度约为 $1/\sqrt{k}$。（借助共享纠缠，每个量子比特可以传两个经典比特——[[quantum-computing/entanglement]] 中的超密编码——把纠缠的量子比特计入后与 Holevo 界一致。）另外，布洛赫球只描述一个量子比特；没有可比拟地简单的 $n$ 个量子比特的图像。
:::

::: application 量子密钥分发
[[#thm-distinguish]] 有一个密码学应用。在 **BB84** 协议（Bennett 与 Brassard，1984）中，Alice 向 Bob 发送随机比特，每个比特以随机选择的 $Z$ 基（$\ket0, \ket1$）或 $X$ 基（$\ket+, \ket-$）编码。Bob 对每个比特随机选基测量；之后双方在公开但认证的信道上公布所用的基（不公布比特），留下基一致的位。不知道基的窃听者面对的是非正交状态 $\ket0, \ket+, \ket1, \ket-$；任何获取信息的测量都会扰动状态，而比较保留比特中随机抽取的样本，就会以约 $25\%$ 的误码率暴露完全的截获-重发攻击。安全性建立在物理而非计算困难性之上，但实际系统需要认证的公开信道、可信设备与专用链路；它是对 [[cryptography/post-quantum]] 后量子密码的补充，而非替代。
:::

## 形式体系的由来

公理在这里不是被推导出来的；它们概括了一个世纪的实验。二维态空间在物理上对应电子的自旋、光子的偏振、原子或离子的两个能级、或超导线路的两个最低状态——即 [[quantum-computing/quantum-hardware]] 的平台。使这样的系统成为*计算用*量子比特的，是我们能制备 $\ket0$、精确施加一组酉变换、并在计算基下测量。其余都是数学，而数学是 $\C$ 上的线性代数。

线性性的两个推论值得现在就强调，因为它们反复出现。第一，只要知道一个酉变换在基上做什么就够了：$U(\alpha\ket0 + \beta\ket1) = \alpha U\ket0 + \beta U\ket1$，所以验证一条线路时，我们在基状态上、以及足以固定相对相位的足够多叠加态上检查它。第二，量子力学**不是**一个关于带附加规则的隐藏经典状态的概率理论：[[#ex-interference]] 已经展示了单一比特的任何随机模型用同样的运算都无法复现的现象，而 [[quantum-computing/entanglement]] 中的 CHSH 博弈更是彻底排除了一大类隐变量解释。

::: history
本章的规则在 1925–1932 年间成形：海森堡（Heisenberg）的矩阵力学（1925）、薛定谔（Schrödinger）的波动方程（1926）、玻恩（Born）对波函数的概率解释（1926，1954 年诺贝尔奖），以及冯·诺依曼（von Neumann）的《量子力学的数学基础》（1932），该书把理论置于 Hilbert 空间之中并引入了投影测量。狄拉克（Dirac）于 1939 年引入了 bra–ket 记号。Stern–Gerlach 实验（1922）首次展示了二值的量子自由度，后来被认作电子自旋。**量子比特**（qubit）一词由 Benjamin Schumacher 在其 1995 年关于量子编码的论文中造出，并归功于与 William Wootters 的一次谈话。Alexander Holevo 于 1973 年证明了他的界，Charles Bennett 与 Gilles Brassard 于 1984 年提出了 BB84。量子系统可用于计算的思想来自 Richard Feynman 1982 年的演讲 "Simulating physics with computers" 与 David Deutsch 1985 年的量子图灵机，将在后面的章节讨论。
:::

## 后续内容

[[quantum-computing/quantum-circuits]] 从小型的**门**构造酉变换并引入线路模型，附一个简短的 Python 态向量模拟器，供本课程余下部分使用。[[quantum-computing/entanglement]] 讨论复合公理：多量子比特状态、纠缠、不可克隆定理与隐形传态。旋转基下的测量、作为信息的相位与干涉，是 [[quantum-computing/first-algorithms]]、[[quantum-computing/shor]] 与 [[quantum-computing/grover]] 中算法的工作部件。我们在关于叠加的警告里只瞥了一眼的混合态，将在 [[quantum-computing/error-correction]] 中用密度矩阵描述。二能级系统的物理见[物理图谱：自旋](/learn/physics/lesson.php?c=quantum-1&l=spin)。

::: summary
- 量子比特是单位向量 $\alpha\ket0 + \beta\ket1 \in \C^2$；测量它以概率 $\abs\alpha^2$ 给出 $0$、以概率 $\abs\beta^2$ 给出 $1$，并留下相应的基状态。
- 振幅与概率不同，可以抵消：量子算法利用的正是这种**干涉**（[[#ex-interference]]）。
- 两次测量之间的演化是酉的，因而可逆且保持内积（[[#prop-unitary]]）；$n$ 个量子比特有 $2^n$ 个振幅。
- 任意标准正交基下的测量都服从玻恩规则 $p(i) = \abs{\braket{e_i|\psi}}^2$；全局相位不可观测，相对相位可以（[[#prop-global-phase]]）。
- 非正交状态不能被确切地区分（[[#thm-distinguish]]）；这是不可克隆与量子密钥分发的基础。
- 至多相差一个相位，单量子比特的状态是**布洛赫球**上的点（[[#thm-bloch]]）；正交状态对跖，且 $\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \vec r\cdot\vec s)$。
- 尽管状态构成连续统，一个量子比特至多携带一个经典比特（Holevo）；振幅只能靠大量采样做统计估计。
:::

## 习题

::: exercise 一个测量概率 {level=1 check="2/3"}
一个量子比特处于 [[#ex-inner]] 中的状态 $\frac{1}{\sqrt3}\ket0 + \frac{\sqrt2 i}{\sqrt3}\ket1$。在计算基下测量给出 $1$ 的概率是多少？（填一个分数。）
::: solution
$\abs{\sqrt2 i/\sqrt3}^2 = 2/3$。因子 $i$ 模为 $1$，不影响概率；若在其他基下测量它就有作用了。
:::
:::

::: exercise 归一化 {level=1 check="3/5"}
向量 $3\ket0 + 4i\ket1$ 不是单位向量。把它归一化，使 $\ket0$ 的振幅为实正数。那个振幅是多少？（填一个分数。）
::: solution
其范数为 $\sqrt{\abs3^2 + \abs{4i}^2} = \sqrt{9 + 16} = 5$，所以状态是 $\tfrac35\ket0 + \tfrac{4i}{5}\ket1$；$\ket0$ 的振幅是 $3/5$，结果概率为 $9/25$ 与 $16/25$。
:::
:::

::: exercise 布洛赫坐标 {level=1}
求 $\ket{+i} = \tfrac{1}{\sqrt2}(\ket0 + i\ket1)$、$\ket{-}$ 与 $\tfrac{\sqrt3}{2}\ket0 + \tfrac12\ket1$ 的布洛赫向量。$\ket0, \ket1, \ket\pm, \ket{\pm i}$ 之间哪些对是正交的？
::: solution
由 [[#eq-pauli-exp]]：对 $\ket{+i}$，$\alpha = \beta/i = 1/\sqrt2$ 且 $\overline\alpha\beta = i/2$，故 $\vec r = (0, 1, 0)$。对 $\ket-$，$\overline\alpha\beta = -1/2$，故 $\vec r = (-1, 0, 0)$。对第三个状态，$\langle Z\rangle = 3/4 - 1/4 = 1/2$ 且 $\overline\alpha\beta = \sqrt3/4$，故 $\vec r = (\sqrt3/2, 0, 1/2)$：极角 $\theta = \pi/3$，因为 $\cos(\pi/6) = \sqrt3/2$ 恰好印证。由 [[#prop-overlap]]，正交对就是彼此对跖的那些：$\{\ket0, \ket1\}$、$\{\ket+, \ket-\}$、$\{\ket{+i}, \ket{-i}\}$。其余每一对的重叠都是 $1/2$。
:::
:::

::: exercise Hadamard 基中的倾斜状态 {level=2 check="(2+sqrt(2))/4"}
状态 $\cos\frac\pi8\ket0 + \sin\frac\pi8\ket1$ 在基 $\ket+, \ket-$ 下测量。结果 $+$ 的概率是多少？（填一个精确表达式。）
::: solution
$\braket{+|\psi} = \tfrac{1}{\sqrt2}(\cos\frac\pi8 + \sin\frac\pi8)$，所以 $\Prob(+) = \tfrac12(\cos\frac\pi8 + \sin\frac\pi8)^2 = \tfrac12(1 + 2\sin\frac\pi8\cos\frac\pi8) = \tfrac12(1 + \sin\frac\pi4) = \tfrac12 + \tfrac{\sqrt2}{4} = \tfrac{2 + \sqrt2}{4} \approx 0.854$。另一种算法：由 [[#prop-overlap]]，布洛赫向量位于 $xz$ 平面、$\theta = \pi/4$ 处，与 $x$ 轴夹角 $\pi/4$，所以 $\Prob(+) = \cos^2(\pi/8)$，同一个数。
:::
:::

::: exercise 正交的布洛赫向量 {level=2 check="1/2"}
两个量子比特状态的布洛赫向量相互垂直。在包含另一个状态的基下测量这一个，得到那个状态的概率是多少？（填一个分数。）
::: solution
由 [[#prop-overlap]]，$\abs{\braket{\phi|\psi}}^2 = \tfrac12(1 + \cos 90°) = 1/2$。例如在基 $\ket\pm$ 下测量 $\ket0$，或在基 $\ket{\pm i}$ 下测量 $\ket+$。布洛赫球上相互垂直的向量对应**相互无偏**的基：知道一个基中的结果，对另一个基一无所知。
:::
:::

::: exercise 特征值与泡利矩阵 {level=2}
(a) 证明 $X$、$Y$、$Z$ 是 Hermitian 且酉的，平方为 $I$，并且两两**反交换**（$XY = -YX$ 等），且 $XY = iZ$、$YZ = iX$、$ZX = iY$。(b) 由此推出每个矩阵的特征值为 $\pm1$，并求 $Y$ 的特征向量。(c) 证明对任意单位向量 $\vec n$，$\vec n\cdot\vec\sigma = n_xX + n_yY + n_zZ$ 的平方也是 $I$。
::: solution
(a) 每个矩阵都等于自己的共轭转置（对 $Y$：$\overline{Y}\T = \begin{pmatrix}0 & -i\\ i & 0\end{pmatrix}$）。直接相乘得 $X^2 = Y^2 = Z^2 = I$；Hermitian 且平方为 $I$ 意味着 $P^\dagger P = P^2 = I$，所以每个都是酉的。$XY = \begin{pmatrix}0&1\\1&0\end{pmatrix}\begin{pmatrix}0&-i\\i&0\end{pmatrix} = \begin{pmatrix}i&0\\0&-i\end{pmatrix} = iZ$，而 $YX = \begin{pmatrix}-i&0\\0&i\end{pmatrix} = -iZ$，所以它们反交换；另外两个乘积类似。(b) 若 $P\ket v = \lambda\ket v$，则 $\ket v = P^2\ket v = \lambda^2\ket v$，所以 $\lambda = \pm1$；由于迹为 $0$，两个值都会出现。$Y\ket{\pm i} = \tfrac{1}{\sqrt2}(-i\cdot(\pm i)\ket0 + i\ket1) = \pm\ket{\pm i}$，所以特征向量是 $\ket{\pm i} = (\ket0 \pm i\ket1)/\sqrt2$。(c) $(\vec n\cdot\vec\sigma)^2 = \sum_j n_j^2 P_j^2 + \sum_{j<k} n_jn_k(P_jP_k + P_kP_j) = (n_x^2 + n_y^2 + n_z^2)I + 0 = I$。所以"沿 $\vec n$ 测量自旋"的结果为 $\pm1$，特征向量位于布洛赫球上的点 $\pm\vec n$。
:::
:::

::: exercise 测量布洛赫向量 {#ex-tomography level=2}
写一个 Python 函数：给定一个单量子比特状态，模拟 $X$、$Y$、$Z$ 测量各 $k$ 次采样，估计布洛赫向量。对 $\theta = 2\pi/3$、$\varphi = \pi/4$ 的状态分别用 $k = 100$ 和 $k = 10\,000$ 运行，并与精确向量比较。误差如何变化？
::: solution
沿每个轴，$+1$ 结果的概率为 $p = \tfrac12(1 + r_{\text{axis}})$（[[#prop-overlap]]），所以 $r_{\text{axis}} = 2p - 1$ 由 $2k_+/k - 1$ 估计。

```python
import cmath, math, random

def prob_first(state, v):              # 结果 v 的概率
    return abs(v[0].conjugate() * state[0] + v[1].conjugate() * state[1]) ** 2

def estimate_bloch(state, shots, rng):
    r2 = 1 / math.sqrt(2)
    bases = {"x": [r2, r2], "y": [r2, 1j * r2], "z": [1, 0]}   # |+>, |+i>, |0>
    est = []
    for axis, v in bases.items():
        p = prob_first(state, [complex(a) for a in v])
        k = sum(rng.random() < p for _ in range(shots))       # 模拟的采样
        est.append(round(2 * k / shots - 1, 3))                # r_axis = P(+) - P(-)
    return est

theta, phi = 2 * math.pi / 3, math.pi / 4
state = [math.cos(theta / 2), cmath.exp(1j * phi) * math.sin(theta / 2)]
exact = [math.sin(theta) * math.cos(phi), math.sin(theta) * math.sin(phi), math.cos(theta)]
print("exact    ", [round(c, 3) for c in exact])
rng = random.Random(1)
for shots in (100, 10000):
    print(f"{shots:>6} shots", estimate_bloch(state, shots, rng))
```

```console
$ python3 tomography.py
exact     [0.612, 0.612, -0.5]
   100 shots [0.6, 0.68, -0.44]
 10000 shots [0.606, 0.614, -0.498]
```

每个估计的标准差为 $2\sqrt{p(1-p)/k} \le 1/\sqrt k$：$k = 100$ 时约 $0.1$，$k = 10\,000$ 时约 $0.01$，与观察一致。把误差减半要付出四倍的拷贝。
:::
:::

::: exercise 区分 $\ket0$ 与 $\ket+$ {#ex-helstrom level=3 check="1/2+sqrt(2)/4"}
以概率 $1/2$ 各给你 $\ket0$ 或 $\ket+$，你只能在任意一组标准正交基下测量一次。求一个基，使对它的最佳判定规则以概率 $\tfrac12 + \tfrac12\sqrt{1 - \abs{\braket{0|+}}^2}$ 成功，并算出该概率。（填一个精确表达式。）
::: solution
$\ket0$ 与 $\ket+$ 的布洛赫向量是 $+z$ 与 $+x$，夹角 $90°$。沿与两个布洛赫向量之差平行的轴 $\vec m$ 测量：取布洛赫向量为 $\pm\vec m$ 的基，其中 $\vec m = (\hat z - \hat x)/\sqrt2 = (-1, 0, 1)/\sqrt2$，即与 $+z$ 成 $45°$、背向 $+x$ 的一侧。结果 $+\vec m$ 时猜"$\ket0$"，结果 $-\vec m$ 时猜"$\ket+$"。由 [[#prop-overlap]]，
$$
\Prob(\text{correct}) = \tfrac12\cdot\tfrac12(1 + \hat z\cdot\vec m) + \tfrac12\cdot\tfrac12(1 - \hat x\cdot\vec m) = \tfrac14\Bigl(1 + \tfrac{1}{\sqrt2}\Bigr) + \tfrac14\Bigl(1 + \tfrac{1}{\sqrt2}\Bigr) = \tfrac12 + \tfrac{\sqrt2}{4} \approx 0.854.
$$
由于 $\abs{\braket{0|+}}^2 = 1/2$，Helstrom 表达式为 $\tfrac12 + \tfrac12\sqrt{1/2} = \tfrac12 + \tfrac{\sqrt2}{4}$，同一个数。（一般地，对布洛赫向量 $\vec r, \vec s$ 与测量轴 $\vec m$，成功概率是 $\tfrac12 + \tfrac14\,\vec m\cdot(\vec r - \vec s)$，当 $\vec m$ 平行于 $\vec r - \vec s$ 时最大，得 $\tfrac12 + \tfrac14\norm{\vec r - \vec s}$；而由 [[#prop-overlap]]，$\norm{\vec r - \vec s}^2 = 2 - 2\vec r\cdot\vec s = 4(1 - \abs{\braket{\phi|\psi}}^2)$，这就恢复了基测量的 Helstrom 公式。）在计算基下，最佳规则只能以概率 $3/4$ 成功。
:::
:::

::: exercise 既是随机又是酉的矩阵 {level=3}
证明：一个元素非负、各列之和为 $1$ 的实 $d\times d$ 矩阵（随机矩阵）是酉的，当且仅当它是置换矩阵。解释这个结果：概率比特与量子比特有哪些公共的操作？
::: solution
置换矩阵显然两者皆是。反过来，设 $M$ 既随机又酉，取其一列的元素 $x_1, \dots, x_d \in [0, 1]$。随机性给出 $\sum_i x_i = 1$，酉性（列的 2-范数为 $1$）给出 $\sum_i x_i^2 = 1$。由 $0 \le x_i \le 1$ 有 $x_i^2 \le x_i$，等号成立当且仅当 $x_i \in \{0, 1\}$；于是 $\sum_i (x_i - x_i^2) = 0$ 迫使每个 $x_i \in \{0, 1\}$，且恰有一个等于 $1$。每一列都是标准基向量，而酉矩阵的列标准正交，所以它们互不相同：$M$ 是置换矩阵。因此两个模型共有的操作只有可逆的确定操作，即基状态的置换。除此之外——一边的抛硬币、另一边的干涉——都是各自模型特有的；[[quantum-computing/quantum-circuits]] 将表明置换（可逆经典线路）可以嵌入量子计算，这就是量子计算机能运行一切经典算法的原因。
:::
:::

::: exercise $Z$ 的期望 {level=1 check="1/2"}
状态 $\cos\frac\pi6\ket0 + e^{i\pi/5}\sin\frac\pi6\ket1$ 的 $\langle Z\rangle$ 是多少？（填一个分数。）
::: solution
由 [[#thm-bloch]]，$\theta = \pi/3$ 且 $\langle Z\rangle = \cos\theta = 1/2$；等价地 $\cos^2\frac\pi6 - \sin^2\frac\pi6 = \frac34 - \frac14 = \frac12$。相位 $e^{i\pi/5}$ 只影响 $\langle X\rangle$ 与 $\langle Y\rangle$。
:::
:::
