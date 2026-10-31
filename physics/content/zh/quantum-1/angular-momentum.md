在经典力学中，力是有心力时角动量就守恒，而正是这一定律使开普勒问题可解（[[mechanics]]）。量子力学中同样如此：对只依赖到中心距离 $r$ 的势中的粒子，角动量与哈密顿量对易，它的本征值标记定态。所以在 [[quantum-1/hydrogen]] 中解氢原子之前，我们要先知道角动量能取哪些值，它的本征函数又长什么样。

答案在两个方面出人意料。第一，角动量的三个分量彼此不对易。你可以知道 $\mathbf L$ 的大小和一个分量——按惯例取 $L_z$——却不能同时知道两个分量，所以这个向量从不指向确定的方向。第二，允许的值是离散的：大小平方为 $\hbar^2l(l+1)$，$L_z$ 为 $m\hbar$，其中 $m$ 从 $-l$ 到 $l$ 以整数步长变化。这两个事实都可以只由对易关系、用一个像 [[quantum-1/harmonic-oscillator]] 中解谐振子那样的升降论证推出。这套代数还允许半整数的 $l$，而轨道运动产生不了它。自然用上了这个缺口：那就是自旋，[[quantum-1/spin]] 的主题。

本章导出对易关系，用代数求出谱，把球谐函数构造为轨道角动量的本征函数，把它们用于转动分子，最后简略讲述两个角动量如何相加。所用的形式工具来自 [[quantum-1/formalism]]：厄米算符、对易子，以及相互对易的可观测量共享本征矢这一事实。

## 角动量算符 {#operators}

经典地 $\mathbf L = \mathbf r\times\mathbf p$。在量子力学中我们把位置与动量换成算符，$\hat{\mathbf p} = -i\hbar\nabla$，于是

$$
\hat L_x = \hat y\hat p_z - \hat z\hat p_y, \qquad \hat L_y = \hat z\hat p_x - \hat x\hat p_z, \qquad \hat L_z = \hat x\hat p_y - \hat y\hat p_x.
$$ {#eq-L}

不存在次序的歧义：每个乘积都把一个坐标与另一方向的动量配对，而它们对易。三维中的基本对易子是 $[\hat x_i, \hat p_j] = i\hbar\delta_{ij}$、$[\hat x_i, \hat x_j] = 0$ 与 $[\hat p_i, \hat p_j] = 0$。每个 $\hat L_i$ 都是厄米的，因为它是可对易的厄米算符乘积之差。

::: theorem 角动量的对易关系 {#thm-commutators}
轨道角动量的分量满足

$$
[\hat L_x, \hat L_y] = i\hbar\hat L_z, \qquad [\hat L_y, \hat L_z] = i\hbar\hat L_x, \qquad [\hat L_z, \hat L_x] = i\hbar\hat L_y,
$$ {#eq-L-comm}

且每个分量都与 $\hat L^2 = \hat L_x^2 + \hat L_y^2 + \hat L_z^2$ 对易：

$$
[\hat L^2, \hat L_i] = 0, \qquad i = x, y, z.
$$ {#eq-L2-comm}
:::

::: proof
把 $[\hat L_x, \hat L_y] = [\hat y\hat p_z - \hat z\hat p_y,\ \hat z\hat p_x - \hat x\hat p_z]$ 展开成四个对易子。在 $[\hat y\hat p_z, \hat x\hat p_z]$ 中，左边的每个因子都与右边的每个因子对易，所以它为零；$[\hat z\hat p_y, \hat z\hat p_x]$ 亦然。剩下两个是

$$
[\hat y\hat p_z, \hat z\hat p_x] = \hat y[\hat p_z, \hat z]\hat p_x = -i\hbar\,\hat y\hat p_x, \qquad [\hat z\hat p_y, \hat x\hat p_z] = \hat x[\hat z, \hat p_z]\hat p_y = i\hbar\,\hat x\hat p_y.
$$

于是 $[\hat L_x, \hat L_y] = -i\hbar\hat y\hat p_x + i\hbar\hat x\hat p_y = i\hbar\hat L_z$。[[#eq-L-comm]] 中的另外两个关系由循环置换 $x\to y\to z\to x$ 得到，它把 [[#eq-L]] 中的各个定义相互变换。

对 [[#eq-L2-comm]] 取 $i = z$，其余由对称性得到。由于 $[\hat L_z, \hat L_z^2] = 0$，

$$
[\hat L^2, \hat L_z] = [\hat L_x^2, \hat L_z] + [\hat L_y^2, \hat L_z] = \hat L_x[\hat L_x, \hat L_z] + [\hat L_x, \hat L_z]\hat L_x + \hat L_y[\hat L_y, \hat L_z] + [\hat L_y, \hat L_z]\hat L_y.
$$

代入 $[\hat L_x, \hat L_z] = -i\hbar\hat L_y$ 与 $[\hat L_y, \hat L_z] = i\hbar\hat L_x$，上式为 $-i\hbar(\hat L_x\hat L_y + \hat L_y\hat L_x) + i\hbar(\hat L_y\hat L_x + \hat L_x\hat L_y) = 0$。
:::

关系 [[#eq-L-comm]] 可紧凑地写作 $[\hat L_i, \hat L_j] = i\hbar\,\varepsilon_{ijk}\hat L_k$，其中用了列维–奇维塔符号。它们是角动量的定义性质。任何三个服从这些关系的厄米算符 $\hat J_x$、$\hat J_y$、$\hat J_z$ 都称为一个角动量，无论它们是否来自 $\mathbf r\times\mathbf p$，下一节的一切只用到这些关系。它们也是无穷小转动的对易关系，而这正是哈密顿量转动对称时角动量守恒的更深层原因。

它们在物理上意味着什么？由 [[quantum-1/formalism#thm-compatible]]，两个可观测量只有对易时才有共同本征态。由于 $\hat L_x$ 与 $\hat L_y$ 不对易，不存在 $L_x$ 与 $L_y$ 都确定的态的一组基；由罗伯逊不等式

$$
\Delta L_x\,\Delta L_y \ge \frac\hbar2\abs{\langle L_z\rangle}.
$$

但 $\hat L^2$ 与每个分量都对易，所以我们可以选取 $L^2$ 确定且 $L_z$ 确定的态。这就是标准选择。物理上没有任何东西特别偏爱 $z$ 轴；它只是我们用来标记态的那根轴。

### 为什么角动量在中心势中守恒

广义埃伦费斯特定理（[[quantum-1/formalism#thm-ehrenfest-general]]）说，一个可观测量与哈密顿量对易时它守恒。对只依赖到原点距离的势 $V(r)$ 中的粒子，$\hat H = \hat p^2/2m + V(r)$，而 $\hat{\mathbf L}$ 的每个分量都与这两项对易。

::: example Lz 与中心哈密顿量对易 {#ex-central}
证明 $[\hat L_z, \hat x^2 + \hat y^2 + \hat z^2] = 0$ 且 $[\hat L_z, \hat p^2] = 0$。由此推出对 $\hat H = \hat p^2/2m + V(r)$ 有 $[\hat L_z, \hat H] = 0$。
::: solution
使用 $[\hat L_z, \hat x] = [\hat x\hat p_y - \hat y\hat p_x, \hat x] = -\hat y[\hat p_x, \hat x] = i\hbar\hat y$，类似地 $[\hat L_z, \hat y] = \hat x[\hat p_y, \hat y] = -i\hbar\hat x$ 以及 $[\hat L_z, \hat z] = 0$。于是由乘积法则

$$
[\hat L_z, \hat x^2 + \hat y^2] = \hat x(i\hbar\hat y) + (i\hbar\hat y)\hat x + \hat y(-i\hbar\hat x) + (-i\hbar\hat x)\hat y = 0,
$$

因为 $\hat x$ 与 $\hat y$ 对易；且 $[\hat L_z, \hat z^2] = 0$。对动量做同样的计算，用 $[\hat L_z, \hat p_x] = i\hbar\hat p_y$、$[\hat L_z, \hat p_y] = -i\hbar\hat p_x$ 与 $[\hat L_z, \hat p_z] = 0$，得 $[\hat L_z, \hat p^2] = 0$。

所以 $\hat L_z$ 与 $r^2$ 对易，从而与 $r^2$ 的任何函数对易，特别地与 $V(r)$ 对易（按幂级数展开即可，或注意到 $\hat L_z = -i\hbar\,\partial_\varphi$ 不碰 $r$）。因此 $[\hat L_z, \hat H] = 0$，且由对称性对 $\hat L_x$、$\hat L_y$ 与 $\hat L^2$ 同样成立。几何上，$\hat L_z$ 生成绕 $z$ 的转动；$r^2$ 与 $p^2$ 在转动下不变，所以与它对易。
:::
:::

这一结果是氢原子问题的出发点。由于 $\hat H$、$\hat L^2$ 与 $\hat L_z$ 彼此对易，由 [[quantum-1/formalism#thm-compatible]] 我们可以选取同时是 $\hat L^2$ 与 $\hat L_z$ 本征态的能量本征态，用 $l$ 与 $m$ 标记。又因为 $\hat H$ 也与 $\hat L_\pm$ 对易，$l$ 相同而 $m$ 不同的 $2l + 1$ 个态能量全部相同：转动对称性在每个中心势中都强制一个 $(2l+1)$ 重简并。氢原子若还有别的简并，必定来自他处。

::: quiz
一个粒子处于 $L_z = 2\hbar$ 确定的态。哪个陈述必定成立？
- [ ] $L_x$ 与 $L_y$ 都为零。
- [x] 期望值 $\langle L_x\rangle$ 与 $\langle L_y\rangle$ 为零，但 $\Delta L_x\,\Delta L_y \ge \hbar^2$。
- [ ] 该态也有确定的 $L_x$，因为 $\hat L^2$ 与二者都对易。
- [ ] $L^2 = 4\hbar^2$。
::: solution
在 $\hat L_z$ 的本征态中 $\langle L_x\rangle = \langle L_y\rangle = 0$（下文一道习题会由 $\hat L_x = [\hat L_y, \hat L_z]/i\hbar$ 证明这一点），但分量并不尖锐：罗伯逊关系给出 $\Delta L_x\Delta L_y \ge \frac\hbar2\cdot2\hbar = \hbar^2$。$\hat L^2$ 与 $\hat L_x$ 对易、与 $\hat L_z$ 也对易，这并不使 $\hat L_x$ 与 $\hat L_z$ 对易。而且我们将看到 $L^2 = \hbar^2l(l+1)$ 且 $l \ge 2$，故 $L^2 \ge 6\hbar^2$，不是 $4\hbar^2$。
:::
:::

## 由代数求谱 {#spectrum}

与谐振子一样，诀窍在于一对能在本征值之间上下迈步的算符。

::: definition 角动量的升降算符 {#def-Lpm}
对一个角动量 $\hat{\mathbf J}$（任意三个满足 [[#eq-L-comm]] 的厄米算符），**升算符**与**降算符**为

$$
\hat J_\pm = \hat J_x \pm i\hat J_y.
$$

它们互为伴随，$\hat J_\pm^\dagger = \hat J_\mp$，并满足

$$
[\hat J_z, \hat J_\pm] = \pm\hbar\hat J_\pm, \qquad [\hat J^2, \hat J_\pm] = 0, \qquad \hat J_\mp\hat J_\pm = \hat J^2 - \hat J_z^2 \mp \hbar\hat J_z.
$$ {#eq-Jpm}
:::

第一个关系就是 $[\hat J_z, \hat J_x] \pm i[\hat J_z, \hat J_y] = i\hbar\hat J_y \pm i(-i\hbar\hat J_x) = \pm\hbar(\hat J_x \pm i\hat J_y)$。第二个由 [[#eq-L2-comm]] 得到。第三个直接乘开：$(\hat J_x \mp i\hat J_y)(\hat J_x \pm i\hat J_y) = \hat J_x^2 + \hat J_y^2 \pm i[\hat J_x, \hat J_y] = \hat J^2 - \hat J_z^2 \mp\hbar\hat J_z$。

::: theorem 角动量的本征值 {#thm-spectrum}
设 $|j\,m\rangle$ 是 $\hat J^2$ 与 $\hat J_z$ 的一个归一化共同本征矢。则本征值具有形式

$$
\hat J^2|j\,m\rangle = \hbar^2j(j+1)|j\,m\rangle, \qquad \hat J_z|j\,m\rangle = m\hbar|j\,m\rangle,
$$ {#eq-jm}

其中 $j$ 为 $0, \frac12, 1, \frac32, 2, \ldots$ 之一；给定 $j$ 时，$m$ 取 $2j + 1$ 个值 $-j, -j+1, \ldots, j-1, j$。在标准的相位约定下，

$$
\hat J_\pm|j\,m\rangle = \hbar\sqrt{j(j+1) - m(m\pm1)}\;|j\,m\pm1\rangle.
$$ {#eq-ladder-coeff}
:::

::: proof
把 $\hat J^2$ 的本征值写作 $\hbar^2\lambda$，$\hat J_z$ 的本征值写作 $\hbar m$；我们要证明 $\lambda = j(j+1)$ 且 $j$ 如所述。

*升降。* 由 [[#eq-Jpm]]，$\hat J_z(\hat J_\pm|j\,m\rangle) = \hat J_\pm\hat J_z|j\,m\rangle \pm\hbar\hat J_\pm|j\,m\rangle = (m\pm1)\hbar\,\hat J_\pm|j\,m\rangle$，而 $\hat J^2$ 与 $\hat J_\pm$ 对易。所以 $\hat J_\pm|j\,m\rangle$ 或者为零，或者是一个本征矢，其 $\lambda$ 不变而 $m$ 升高或降低一格。

*界限。* 升降所得向量的范数，用 $\hat J_\pm^\dagger = \hat J_\mp$ 与 [[#eq-Jpm]]，为

$$
\norm{\hat J_\pm|j\,m\rangle}^2 = \langle j\,m|\hat J_\mp\hat J_\pm|j\,m\rangle = \hbar^2\bigl(\lambda - m^2 \mp m\bigr) = \hbar^2\bigl(\lambda - m(m\pm1)\bigr) \ge 0.
$$

于是对固定的 $\lambda$，$m$ 有界：至少有 $m^2 \le \lambda - \abs m$，特别有 $m^2 \le \lambda$。反复上升不可能无穷进行，所以存在最高值 $m = m_{\max}$ 使 $\hat J_+|j\,m_{\max}\rangle = 0$，于是 $\lambda - m_{\max}(m_{\max} + 1) = 0$。同样存在最低值 $m_{\min}$ 使 $\hat J_-|j\,m_{\min}\rangle = 0$，于是 $\lambda - m_{\min}(m_{\min} - 1) = 0$。

*求解。* 令 $\lambda$ 的两个表达式相等，$m_{\max}(m_{\max}+1) = m_{\min}(m_{\min}-1)$，它因式分解为 $(m_{\max} + m_{\min})(m_{\max} - m_{\min} + 1) = 0$。第二个因子为正，因为 $m_{\max} \ge m_{\min}$，所以 $m_{\min} = -m_{\max}$。记 $m_{\max} = j$，则 $\lambda = j(j+1)$，且 $m$ 从 $-j$ 跑到 $j$。由于最高值能由最低值经整数步到达，$2j$ 是一个非负整数：$j \in \{0, \frac12, 1, \frac32, \ldots\}$。

*系数。* 上面算出的范数是 $\hbar^2\bigl(j(j+1) - m(m\pm1)\bigr)$。选取 $|j\,m\pm1\rangle$ 的相位使系数为实且为正，即得 [[#eq-ladder-coeff]]。
:::

角动量的平方是 $\hbar^2j(j+1)$，不是 $\hbar^2j^2$。$L_z$ 的最大可能值 $j\hbar$ 小于大小 $\sqrt{j(j+1)}\,\hbar$，而这一差额正是 $L_x$ 与 $L_y$ 不可消除的展宽：在态 $|j\,j\rangle$ 中，$\langle L_x^2 + L_y^2\rangle = \hbar^2j(j+1) - \hbar^2j^2 = \hbar^2j$。这份差额无法去掉。

::: example j = 1 的矩阵 {#ex-j1}
对 $j = 1$，在基 $|1\,1\rangle$、$|1\,0\rangle$、$|1\,{-1}\rangle$ 下写出 $\hat J_z$、$\hat J_+$、$\hat J_-$ 与 $\hat J_x$ 的矩阵，并求 $\hat J_x$ 的本征值。
::: solution
$\hat J_z$ 是对角的，元素为 $\hbar$、$0$、$-\hbar$。由 [[#eq-ladder-coeff]]，$\hat J_+|1\,0\rangle = \hbar\sqrt{2 - 0}\,|1\,1\rangle = \sqrt2\hbar|1\,1\rangle$，$\hat J_+|1\,{-1}\rangle = \hbar\sqrt{2 - 0}\,|1\,0\rangle = \sqrt2\hbar|1\,0\rangle$，而 $\hat J_+|1\,1\rangle = 0$。于是

$$
\hat J_z = \hbar\begin{pmatrix}1 & 0 & 0\\ 0 & 0 & 0\\ 0 & 0 & -1\end{pmatrix}, \quad \hat J_+ = \sqrt2\hbar\begin{pmatrix}0 & 1 & 0\\ 0 & 0 & 1\\ 0 & 0 & 0\end{pmatrix}, \quad \hat J_- = \hat J_+^\dagger = \sqrt2\hbar\begin{pmatrix}0 & 0 & 0\\ 1 & 0 & 0\\ 0 & 1 & 0\end{pmatrix}.
$$

然后 $\hat J_x = \frac12(\hat J_+ + \hat J_-)$：

$$
\hat J_x = \frac{\hbar}{\sqrt2}\begin{pmatrix}0 & 1 & 0\\ 1 & 0 & 1\\ 0 & 1 & 0\end{pmatrix}.
$$

它的特征多项式（以 $\hbar$ 为单位）是 $-\mu^3 + \mu = -\mu(\mu - 1)(\mu + 1)$（非对角元素 $1/\sqrt2$ 贡献 $2\times\frac12\mu$）。所以 $\hat J_x$ 的本征值是 $\hbar$、$0$、$-\hbar$，与 $\hat J_z$ 的相同，正如转动对称性所要求的。对应 $+\hbar$ 的本征矢是 $\frac12(1, \sqrt2, 1)$：一个具有确定 $J_x = \hbar$ 的态是三个 $J_z$ 态的叠加，概率分别为 $\frac14$、$\frac12$、$\frac14$。
:::
:::

::: example 测量横向分量 {#ex-measure-lx}
一个 $l = 1$ 的粒子处于态 $|1\,1\rangle$。用 [[#ex-j1]] 中 $\hat L_x$ 的本征矢，求测量 $L_x$ 给出结果 $\hbar$、$0$、$-\hbar$ 的概率，并与 $\langle L_x^2\rangle$ 对照检验。
::: solution
[[#ex-j1]] 中矩阵 $\hat J_x$ 的归一化本征矢，在基 $|1\,1\rangle$、$|1\,0\rangle$、$|1\,{-1}\rangle$ 下为

$$
v_{+} = \tfrac12\bigl(1, \sqrt2, 1\bigr), \qquad v_0 = \tfrac{1}{\sqrt2}\bigl(1, 0, -1\bigr), \qquad v_- = \tfrac12\bigl(1, -\sqrt2, 1\bigr),
$$

对应本征值 $\hbar$、$0$、$-\hbar$。（检验 $v_0$：$\hat J_x v_0$ 的中间一行是 $\frac{\hbar}{\sqrt2}\cdot\frac{1}{\sqrt2}(1 - 1) = 0$，而外侧两行为零，因为中间分量为零。）态 $|1\,1\rangle$ 是列 $(1, 0, 0)$，所以概率就是第一个分量的平方：

$$
P(\hbar) = \frac14, \qquad P(0) = \frac12, \qquad P(-\hbar) = \frac14.
$$

平均值为 $\frac14\hbar - \frac14\hbar = 0$，在 $\hat L_z$ 的本征态中理应如此；平方的平均值为 $\frac14\hbar^2 + \frac14\hbar^2 = \frac12\hbar^2$，与一般公式 $\frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr) = \frac{\hbar^2}{2}(2 - 1)$ 吻合——该公式在习题中证明。一个具有最大可能 $L_z$ 的态，仍有一半的时候给出 $L_x = 0$。测量之后，态变为相应的 $v$，接着再测 $L_z$ 又是不确定的。
:::
:::

::: remark 空间量子化与塞曼效应
具有轨道角动量 $\hat{\mathbf L}$ 的电子带有磁矩 $\hat{\boldsymbol\mu} = -(e/2m_e)\hat{\mathbf L} = -\mu_B\hat{\mathbf L}/\hbar$，其中 $\mu_B = e\hbar/2m_e = 5.788\times10^{-5}\,\mathrm{eV/T}$ 是玻尔磁子。在磁场 $B\hat{\mathbf z}$ 中，能量 $-\hat{\boldsymbol\mu}\cdot\mathbf B = \mu_BB\hat L_z/\hbar$ 给能级添上 $m\mu_BB$，于是角动量为 $l$ 的一个能级分裂成 $2l + 1$ 个等间隔的子能级，每隔一特斯拉相距 $5.8\times10^{-5}\,\mathrm{eV}$。塞曼（Zeeman）1896 年观察到磁场中光谱线的展宽与分裂，而 $2l + 1$ 个子能级就是旧量子论为 $\mathbf L$ 的取向所假设的"空间量子化"。多数原子中的真实图样要复杂得多（"反常"塞曼效应），因为自旋以另一个比值对磁矩作出贡献；那一段故事在 [[quantum-1/spin]] 中讲述。
:::

## 轨道角动量与球谐函数 {#harmonics}

对轨道角动量我们可以多说一些，因为这些算符作用在波函数上。在球坐标 $(r, \theta, \varphi)$ 中，用链式法则计算（Griffiths 与 Schroeter §4.3，或 [[math-methods/vector-calculus]] 的习题）得

$$
\hat L_z = -i\hbar\pdv{}{\varphi}, \qquad \hat L^2 = -\hbar^2\left[\frac{1}{\sin\theta}\pdv{}{\theta}\left(\sin\theta\pdv{}{\theta}\right) + \frac{1}{\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}\right],
$$ {#eq-L-spherical}

且 $\hat L_\pm = \hbar e^{\pm i\varphi}\bigl(\pm\partial_\theta + i\cot\theta\,\partial_\varphi\bigr)$。它们都不含 $r$：角动量只作用于角度。$\hat L^2$ 中方括号里是拉普拉斯算符的角向部分，于是

$$
\nabla^2 = \frac{1}{r^2}\pdv{}{r}\left(r^2\pdv{}{r}\right) - \frac{\hat L^2}{\hbar^2r^2},
$$ {#eq-laplacian}

这一关系将把氢原子问题分成径向与角向两部分。

$\hat L_z$ 的本征函数是 $e^{im\varphi}$。这里进入一个代数一无所知的新条件。波函数必须是位置的单值函数，而 $\varphi$ 与 $\varphi + 2\pi$ 是同一点，所以 $e^{2\pi im} = 1$，**$m$ 必须是整数**。由于 $m$ 与 $l$ 相差整数，$l$ 也是整数。轨道角动量只允许 $l = 0, 1, 2, \ldots$；[[#thm-spectrum]] 中的半整数值必有别的来源。

::: definition 球谐函数 {#def-Ylm}
**球谐函数** $Y_l^m(\theta,\varphi)$，$l = 0, 1, 2, \ldots$，$m = -l, \ldots, l$，是归一化的共同本征函数

$$
\hat L^2Y_l^m = \hbar^2l(l+1)Y_l^m, \qquad \hat L_zY_l^m = m\hbar Y_l^m, \qquad \int_0^{2\pi}\!\!\int_0^\pi\bigl(Y_{l'}^{m'}\bigr)^*Y_l^m\sin\theta\,\dd\theta\,\dd\varphi = \delta_{ll'}\delta_{mm'},
$$

其相位按康登–肖特利约定由 [[#eq-ladder-coeff]] 固定。它们具有形式 $Y_l^m = N_{lm}P_l^m(\cos\theta)e^{im\varphi}$，其中 $P_l^m$ 是连带勒让德函数。
:::

我们可以用升降法构造它们。最高态满足 $\hat L_+Y_l^l = 0$。令 $Y_l^l = f(\theta)e^{il\varphi}$，算符 $\pm\partial_\theta + i\cot\theta\,\partial_\varphi$ 取上号给出 $f' - l\cot\theta\,f = 0$，其解为 $f = \sin^l\theta$。所以 $Y_l^l \propto \sin^l\theta\,e^{il\varphi}$，其余的由作用 $\hat L_-$ 得到。头几个——你应当记住——是

$$
\begin{aligned}
Y_0^0 &= \frac{1}{\sqrt{4\pi}}, \\
Y_1^0 &= \sqrt{\frac{3}{4\pi}}\cos\theta, \qquad Y_1^{\pm1} = \mp\sqrt{\frac{3}{8\pi}}\sin\theta\,e^{\pm i\varphi}, \\
Y_2^0 &= \sqrt{\frac{5}{16\pi}}\bigl(3\cos^2\theta - 1\bigr), \qquad Y_2^{\pm1} = \mp\sqrt{\frac{15}{8\pi}}\sin\theta\cos\theta\,e^{\pm i\varphi}, \qquad Y_2^{\pm2} = \sqrt{\frac{15}{32\pi}}\sin^2\theta\,e^{\pm2i\varphi}.
\end{aligned}
$$

用单位球上的直角坐标写，$rY_1^0 \propto z$，$rY_1^{\pm1} \propto \mp(x \pm iy)$。$l = 1$ 的球谐函数就是坐标本身，$l = 2$ 的球谐函数则是迹为零的二次组合。在宇称变换 $\mathbf r \to -\mathbf r$（即 $\theta \to \pi - \theta$，$\varphi \to \varphi + \pi$）下，它们各自添上因子 $(-1)^l$。在化学中，$Y_1^{\pm1}$ 的实组合就是 $p_x$ 与 $p_y$ 轨道，$Y_1^0$ 就是 $p_z$。

::: example 检验一个本征函数 {#ex-Y10}
验证 $Y_1^0 = \sqrt{3/4\pi}\,\cos\theta$ 是归一化的、是 $\hat L^2$ 的本征函数且本征值为 $2\hbar^2$，并验证 $\hat L_+Y_1^0 = \sqrt2\hbar\,Y_1^1$。
::: solution
归一化，取 $u = \cos\theta$，$\dd u = -\sin\theta\,\dd\theta$：

$$
\frac{3}{4\pi}\int_0^{2\pi}\dd\varphi\int_0^\pi\cos^2\theta\sin\theta\,\dd\theta = \frac{3}{4\pi}\cdot2\pi\cdot\int_{-1}^1u^2\,\dd u = \frac{3}{4\pi}\cdot2\pi\cdot\frac23 = 1.
$$

不含 $\varphi$，所以 [[#eq-L-spherical]] 中只有 $\theta$ 部分起作用：$\partial_\theta\cos\theta = -\sin\theta$，接着 $\sin\theta\cdot(-\sin\theta) = -\sin^2\theta$，再接着 $\frac{1}{\sin\theta}\partial_\theta(-\sin^2\theta) = -2\cos\theta$。于是 $\hat L^2\cos\theta = -\hbar^2(-2\cos\theta) = 2\hbar^2\cos\theta = \hbar^2\cdot1\cdot2\cos\theta$，正是 $l(l+1)\hbar^2$ 取 $l = 1$。

最后，$\hat L_+ = \hbar e^{i\varphi}(\partial_\theta + i\cot\theta\,\partial_\varphi)$ 作用在 $\sqrt{3/4\pi}\cos\theta$ 上给出 $\hbar e^{i\varphi}\sqrt{3/4\pi}(-\sin\theta) = -\sqrt2\hbar\cdot\sqrt{3/8\pi}\sin\theta\,e^{i\varphi} = \sqrt2\hbar\,Y_1^1$，其中 $Y_1^1$ 的负号已被吸收。系数 $\sqrt2\hbar$ 就是 [[#eq-ladder-coeff]] 取 $l = 1$、$m = 0$：$\hbar\sqrt{2 - 0}$。
:::
:::

::: widget plot
f: 1/(4*pi); 3*cos(x)^2/(4*pi); 5*(3*cos(x)^2 - 1)^2/(16*pi)
x: 0, pi
y: 0, 0.85
piticks: true
labels: l = 0; l = 1; l = 2（均 m = 0）
caption: 角向概率密度 $\abs{Y_l^0(\theta)}^2$ 随极角 $\theta$ 的变化，$\theta$ 从 $0$（$+z$ 方向）到 $\pi$。$l = 0$ 的密度是常数 $1/4\pi$：$s$ 态没有优势方向。$\abs{Y_1^0}^2$ 沿轴最大，在 $\theta = \pi/2$ 处为零，就是 $p_z$ 轨道的哑铃形。$\abs{Y_2^0}^2$ 在 $\cos^2\theta = 1/3$ 处有节点，即 $\theta = 54.7^\circ$ 与 $125.3^\circ$。数一数零点：$Y_l^0$ 有 $l$ 个节锥。
:::

::: widget plot
f: 5*(3*cos(x)^2 - 1)^2/(16*pi); 15*sin(x)^2*cos(x)^2/(8*pi); 15*sin(x)^4/(32*pi)
x: 0, pi
y: 0, 0.85
piticks: true
labels: m = 0; |m| = 1; |m| = 2（均 l = 2）
caption: $l = 2$ 的三个不同的角向密度。$l$ 固定而 $\abs m$ 增大时，密度从两极向赤道移动：$\abs{Y_2^{\pm2}}^2 \propto \sin^4\theta$ 集中在 $\theta = \pi/2$ 附近，那正是经典粒子在 $L_z$ 接近 $\abs{\mathbf L}$ 时轨道所在之处。这些密度都不依赖 $\varphi$，因为 $\abs{e^{im\varphi}} = 1$；每个密度都关于 $z$ 轴对称。
:::

::: warning 向量并不沿 z 方向
人们容易把 $m = l$ 的 $|l\,m\rangle$ 想象成"$\mathbf L$ 指向 $+z$"。它不可能如此。$\abs{\mathbf L} = \sqrt{l(l+1)}\,\hbar$ 总是大于 $l\hbar$，所以最大的 $L_z$ 与全长之间差着一个有限的角度。通常的**向量模型**把 $\mathbf L$ 画在绕 $z$ 轴的某个锥面上，锥的半顶角 $\theta$ 满足 $\cos\theta = m/\sqrt{l(l+1)}$，而 $L_x$ 与 $L_y$ 不确定。对 $l = 1$、$m = 1$，这一角度是 $45^\circ$。只有当 $l \to \infty$ 时锥面才合拢，具有确定向量的经典图像正是这样重新出现的。
:::

## 刚性转子 {#rotor}

最简单的应用是分子绕质心的转动。对约化质量 $\mu$、键长固定为 $r_0$ 的双原子分子，转动惯量为 $I = \mu r_0^2$，经典转动能为 $L^2/2I$。量子力学中

$$
\hat H = \frac{\hat L^2}{2I}, \qquad E_l = \frac{\hbar^2l(l+1)}{2I}, \qquad l = 0, 1, 2, \ldots,
$$ {#eq-rotor}

每个能级的简并度为 $2l + 1$（即 $m$ 的诸值），本征函数 $Y_l^m(\theta,\varphi)$ 描述分子轴的取向。光谱学家写作 $E_l = hBl(l+1)$，其中**转动常量** $B = \hbar/4\pi I$（以赫兹计）。极性分子在 $\Delta l = \pm1$ 的跃迁中吸收或发射光子（这一选择定则在 [[quantum-2/time-dependent]] 中推导），所以从 $l$ 到 $l + 1$ 的吸收谱线位于

$$
\nu = \frac{E_{l+1} - E_l}{h} = 2B(l + 1),
$$

相邻谱线间隔 $2B$，这一图样已在一切极性双原子气体的远红外与微波光谱中观察到。

::: example 一氧化碳 {#ex-co}
$^{12}\mathrm C^{16}\mathrm O$ 的最低一条转动谱线，$l = 0 \to 1$，在 $115.271\,\mathrm{GHz}$。求 $B$、转动惯量与键长。原子质量：$12.0000\,\mathrm u$ 与 $15.9949\,\mathrm u$。
::: solution
该谱线在 $2B$ 处，所以 $B = 57.636\,\mathrm{GHz}$。于是

$$
I = \frac{\hbar}{4\pi B} = \frac{1.054572\times10^{-34}}{4\pi(5.7636\times10^{10})} = 1.4561\times10^{-46}\,\mathrm{kg\,m^2}.
$$

约化质量为 $\mu = (12.0000)(15.9949)/27.9949\,\mathrm u = 6.85621\,\mathrm u = 1.13851\times10^{-26}\,\mathrm{kg}$，所以

$$
r_0 = \sqrt{\frac{I}{\mu}} = \sqrt{\frac{1.4561\times10^{-46}}{1.13851\times10^{-26}}} = 1.131\times10^{-10}\,\mathrm m = 113.1\,\mathrm{pm}.
$$

下一条谱线在 $230.54$、$345.81\,\mathrm{GHz}$，依此类推（实际略低，因为分子随转动加快而拉伸）。$115\,\mathrm{GHz}$ 这条线波长 $2.60\,\mathrm{mm}$，是射电天文学家用来描绘星系中冷分子气体的谱线。$l = 1$ 能级的能量对应 $hB\cdot2/k_B = 5.5\,\mathrm K$，所以在室温下有大量转动能级被占据，与 [[quantum-1/harmonic-oscillator#ex-hcl]] 中被冻结的振动形成鲜明对照。
:::
:::

### 哪些能级被占据？

在温度 $T$ 下，分子处于特定态 $|l\,m\rangle$ 的概率正比于 $e^{-E_l/k_BT}$，而能量为 $E_l$ 的这样的态有 $2l + 1$ 个。于是能级 $l$ 的占据数为

$$
P_l = \frac{(2l + 1)\,e^{-hBl(l+1)/k_BT}}{Z}, \qquad Z = \sum_{l=0}^\infty(2l + 1)\,e^{-hBl(l+1)/k_BT}.
$$

两种效应相互竞争。简并度随 $l$ 线性增长，玻尔兹曼因子则下降；乘积在它对 $l$ 的导数为零处达到峰值，即 $l_{\max} \approx \sqrt{k_BT/2hB} - \frac12$。对 $300\,\mathrm K$ 的 CO，$k_BT/hB = 108.5$，所以 $l_{\max} \approx 6.9$；把级数数值求和得最大占据数 $8.2\%$ 出现在 $l = 7$，而只有 $0.9\%$ 的分子处于基态 $l = 0$。当 $k_BT \gg hB$ 时，该和可用积分很好地近似，$Z \approx k_BT/hB$，这正是具有两个转动自由度的转子的经典结果，由此得到双原子气体摩尔热容量的转动贡献 $R$。这就是为什么在室温下转动自由度全额计入热容量，而振动由于 $\hbar\omega \gg k_BT$ 不计入。

::: remark l 的半经典大小
对大的 $l$，$l(l+1) = (l + \frac12)^2 - \frac14 \approx (l + \frac12)^2$，所以角动量的大小接近 $(l + \frac12)\hbar$。动量为 $p$、以碰撞参数 $b$ 掠过原点的经典粒子有 $L = pb$，于是量子数为 $l$ 的分波对应以距离 $b \approx (l + \frac12)\hbar/p = (l + \frac12)\lambda/2\pi$ 掠过的粒子。这一图像是 [[quantum-2/scattering]] 中分波散射理论的基础：低能下，当德布罗意波长远大于力的作用范围时，只有 $l = 0$ 重要。
:::

## 两个角动量的相加 {#addition}

原子中的电子既有轨道角动量 $\hat{\mathbf L}$ 又有自旋 $\hat{\mathbf S}$；两个电子则各有两个。当相互作用把它们耦合起来时，守恒量是总量 $\hat{\mathbf J} = \hat{\mathbf J}_1 + \hat{\mathbf J}_2$，我们需要它的本征态。因为 $\hat{\mathbf J}_1$ 与 $\hat{\mathbf J}_2$ 作用在不同的自由度上，它们的分量彼此对易，且可直接验证 $\hat{\mathbf J}$ 满足 [[#eq-L-comm]]。于是 [[#thm-spectrum]] 对它适用：总量的本征值为 $\hbar^2j(j+1)$ 与 $m\hbar$。

对固定 $j_1$ 与 $j_2$ 的 $(2j_1 + 1)(2j_2 + 1)$ 个态，有两个自然的基。**未耦合基** $|j_1\,m_1\rangle|j_2\,m_2\rangle$ 使 $\hat J_{1z}$ 与 $\hat J_{2z}$ 对角。**耦合基** $|j\,m\rangle$ 使 $\hat J^2$ 与 $\hat J_z$ 对角（连同 $\hat J_1^2$ 与 $\hat J_2^2$，它们与此处的一切都对易）。

::: theorem 角动量的相加 {#thm-addition}
对固定的 $j_1$ 与 $j_2$，总角动量量子数恰好各取一次下列值

$$
j = \abs{j_1 - j_2},\ \abs{j_1 - j_2} + 1,\ \ldots,\ j_1 + j_2
$$

且 $m = m_1 + m_2$。
:::

::: proof
由于 $\hat J_z = \hat J_{1z} + \hat J_{2z}$，每个未耦合态都是 $\hat J_z$ 的属于 $m = m_1 + m_2$ 的本征态。数一数具有给定 $m$ 的未耦合态；设 $j_1 \ge j_2$。值 $m = j_1 + j_2$ 出现一次（$m_1 = j_1$，$m_2 = j_2$）；$m = j_1 + j_2 - 1$ 出现两次；一般地，数目 $n(m)$ 随 $m$ 每减少一就增加一，直到 $m = j_1 - j_2$，此后保持常数 $2j_2 + 1$，直到 $m = -(j_1 - j_2)$，然后对称地减少。

每个总量为 $j$ 的多重态对每个满足 $\abs m \le j$ 的 $m$ 贡献一个态。因此 $m = j_1 + j_2$ 处的那个单态必定属于一个 $j = j_1 + j_2$ 的多重态，它在每个较低的 $m$ 处用掉一个态。在 $m = j_1 + j_2 - 1$ 处还剩一个态，它必须开启一个 $j = j_1 + j_2 - 1$ 的多重态。继续下去，$n(m)$ 每增加一处就开启一个新的多重态，即 $j = j_1 + j_2, j_1 + j_2 - 1, \ldots, j_1 - j_2$，而在那以下不再有新的开启。作为检验，$\sum_{j=j_1-j_2}^{j_1+j_2}(2j + 1) = (2j_1 + 1)(2j_2 + 1)$，所以所有态都清点无遗漏。
:::

哪个基"对"取决于哈密顿量。若两个角动量互不相互作用，未耦合态就是能量本征态，耦合基只是另一组基而已。若哈密顿量含有形如 $\hat{\mathbf J}_1\cdot\hat{\mathbf J}_2$ 的耦合——原子中的自旋–轨道相互作用 $\hat{\mathbf L}\cdot\hat{\mathbf S}$ 正是如此——那么耦合基就是使其对角的那一组基，因为

$$
\hat{\mathbf J}_1\cdot\hat{\mathbf J}_2 = \frac12\left(\hat J^2 - \hat J_1^2 - \hat J_2^2\right) \quad\text{本征值为}\quad \frac{\hbar^2}{2}\bigl(j(j+1) - j_1(j_1+1) - j_2(j_2+1)\bigr).
$$

属于不同 $j$ 的能级由此分裂，这一分裂就是原子光谱的精细结构。

联系两组基的系数 $\langle j_1\,m_1;\,j_2\,m_2|j\,m\rangle$ 就是**克莱布施–戈尔丹系数**。求法是：从最高态 $|j_1 + j_2,\ j_1 + j_2\rangle = |j_1\,j_1\rangle|j_2\,j_2\rangle$ 出发，作用 $\hat J_- = \hat J_{1-} + \hat J_{2-}$ 逐级下降，并利用正交性构造每个较低多重态的最高态。一切教材与粒子物理数据手册（Particle Data Group）中都列有它们的数表。

::: example 两个轨道角动量 {#ex-1x1}
两个粒子各有 $l = 1$。可能的总 $L$ 值有哪些，各属于多少个态，$|L = 2,\ M = 1\rangle$ 态在未耦合基中是什么？
::: solution
由 [[#thm-addition]]，$L = 0, 1, 2$，各有 $1 + 3 + 5 = 9 = 3\times3$ 个态。最高态是 $|2\,2\rangle = |1\,1\rangle|1\,1\rangle$。作用 $\hat L_- = \hat L_{1-} + \hat L_{2-}$。左边，[[#eq-ladder-coeff]] 取 $l = 2$、$m = 2$ 给出 $\hat L_-|2\,2\rangle = \hbar\sqrt{6 - 2}\,|2\,1\rangle = 2\hbar|2\,1\rangle$。右边，每个单粒子下降给出 $\hbar\sqrt{2 - 0}$：

$$
\hat L_-\bigl(|1\,1\rangle|1\,1\rangle\bigr) = \sqrt2\hbar\bigl(|1\,0\rangle|1\,1\rangle + |1\,1\rangle|1\,0\rangle\bigr).
$$

于是 $|2\,1\rangle = \frac{1}{\sqrt2}\bigl(|1\,0\rangle|1\,1\rangle + |1\,1\rangle|1\,0\rangle\bigr)$。同一个 $M = 1$ 的正交组合 $\frac{1}{\sqrt2}\bigl(|1\,1\rangle|1\,0\rangle - |1\,0\rangle|1\,1\rangle\bigr)$ 是 $L = 1$ 多重态的顶。$L = 2$ 的态在交换两个粒子时对称，$L = 1$ 的反对称，这一图样对 [[quantum-2/identical-particles]] 中的全同粒子很重要。
:::
:::

::: history 角动量的量子化
索末菲（Sommerfeld）1916 年把玻尔的模型推广到取向量子化的椭圆轨道，即"空间量子化"；施特恩（Stern）与格拉赫（Gerlach）1922 年用银原子检验了它。对易关系 [[#eq-L-comm]] 与谱 $\hbar^2j(j+1)$ 由玻恩（Born）、海森堡（Heisenberg）与约尔登（Jordan）在他们 1926 年的矩阵力学论文中导出。球谐函数要古老得多：拉普拉斯（Laplace）与勒让德（Legendre）在 1780 年代研究引力吸引问题时引入了它们。克莱布施（Clebsch）与戈尔丹（Gordan）在 1860 与 1870 年代的不变量理论中研究了以他们命名的系数，那远早于量子力学；维格纳（Wigner）关于群论与原子光谱的著作（1931）以及康登（Condon）与肖特利（Shortley）的《原子光谱理论》（*The Theory of Atomic Spectra*，1935）使它们成为物理学的标准工具。我们采用的相位约定就是康登与肖特利的。
:::

## 后续内容 {#leads}

在 [[quantum-1/hydrogen]] 中，拉普拉斯算符按 [[#eq-laplacian]] 分裂为一个径向部分与 $\hat L^2$，中心势中每个定态的角向部分都是一个 $Y_l^m$，而径向方程含有离心项 $\hbar^2l(l+1)/2mr^2$。在 [[quantum-1/spin]] 中，[[#thm-spectrum]] 的半整数值将被发现是由电子的一个内部角动量实现的，其 $j = \frac12$，算符是 $2\times2$ 矩阵。自旋与轨道角动量相加给出 [[quantum-2/atomic-structure]] 中的原子精细结构，化学图谱用同样的球谐函数构造原子轨道，见[氢原子](/learn/chemistry/lesson.php?c=quantum-chemistry&l=hydrogen-atom)。

::: summary
- $\hat{\mathbf L} = \hat{\mathbf r}\times\hat{\mathbf p}$ 的分量满足 $[\hat L_i, \hat L_j] = i\hbar\varepsilon_{ijk}\hat L_k$ 与 $[\hat L^2, \hat L_i] = 0$：能同时尖锐的只有 $L^2$ 与一个分量。
- 只由对易关系即得 $J^2 = \hbar^2j(j+1)$、$J_z = m\hbar$，其中 $2j \in \{0, 1, 2, \ldots\}$、$m = -j, \ldots, j$；$\hat J_\pm|j\,m\rangle = \hbar\sqrt{j(j+1) - m(m\pm1)}\,|j\,m\pm1\rangle$。
- 对轨道角动量 $\hat L_z = -i\hbar\,\partial_\varphi$，而单值性迫使 $m$ 与 $l$ 为整数。
- 本征函数是球谐函数 $Y_l^m(\theta,\varphi) \propto P_l^m(\cos\theta)e^{im\varphi}$，在球面上标准正交，宇称为 $(-1)^l$。
- $\nabla^2 = r^{-2}\partial_r(r^2\partial_r) - \hat L^2/\hbar^2r^2$ 使中心力问题可分离。
- 刚性转子有 $E_l = \hbar^2l(l+1)/2I$，简并度 $2l + 1$；CO 的 $115.271\,\mathrm{GHz}$ 谱线给出键长 $113.1\,\mathrm{pm}$。
- 两个角动量相加成 $j = \abs{j_1 - j_2}, \ldots, j_1 + j_2$，每个恰出现一次，且 $m = m_1 + m_2$。
:::

## 习题 {#exercises}

::: exercise 向量的长度 {level=1 check="sqrt(6)"}
给出 $l = 2$ 的态的轨道角动量大小（以 $\hbar$ 为单位），并列出 $L_z$ 的可能值。
::: solution
$\abs{\mathbf L} = \sqrt{l(l+1)}\,\hbar = \sqrt6\,\hbar = 2.449\,\hbar$。$L_z$ 的可能值为 $-2\hbar, -\hbar, 0, \hbar, 2\hbar$。
:::
:::

::: exercise 最窄的节锥 {level=1 check="30"}
对 $l = 3$、$m = 3$，求向量模型锥面的半顶角（度数），$\cos\theta = m/\sqrt{l(l+1)}$。
::: solution
$\cos\theta = 3/\sqrt{12} = \sqrt3/2$，所以 $\theta = 30^\circ$。$l = 1$、$m = 1$ 时它是 $45^\circ$；$l$ 增大时锥面变窄，却永不合拢。
:::
:::

::: exercise CO 的第二条谱线 {level=1 check="230.54"}
取 CO 的 $B = 57.636\,\mathrm{GHz}$，把分子当作刚性的，求 $l = 1 \to 2$ 转动谱线的频率（GHz）。
::: solution
$\nu = 2B(l + 1)$ 取 $l = 1$，所以 $\nu = 4B = 230.54\,\mathrm{GHz}$。实测谱线在 $230.538\,\mathrm{GHz}$；这小小的差额来自离心拉伸。
:::
:::

::: exercise 横向分量的展宽 {level=2 check="1/2"}
证明在态 $|l\,m\rangle$ 中 $\langle L_x^2\rangle = \frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr)$。对 $l = 1$、$m = 1$，以 $\hbar^2$ 为单位求值。
::: hint
由关于 $z$ 轴的对称性，$\langle L_x^2\rangle = \langle L_y^2\rangle$。
:::
::: solution
$\langle L_x^2\rangle + \langle L_y^2\rangle = \langle L^2 - L_z^2\rangle = \hbar^2\bigl(l(l+1) - m^2\bigr)$。要看出两项相等，写 $\hat L_x^2 - \hat L_y^2 = \frac12(\hat L_+^2 + \hat L_-^2)$，它使 $m$ 改变 $\pm2$，因此在 $|l\,m\rangle$ 中的期望值为零。于是每项各占和的一半。对 $l = 1$、$m = 1$：$\frac12(2 - 1) = \frac12$。
:::
:::

::: exercise 归一化 Y₁¹ {level=2}
证明对 $Y_1^1 = -\sqrt{3/8\pi}\sin\theta\,e^{i\varphi}$ 有 $\int\abs{Y_1^1}^2\,\dd\Omega = 1$，并证明 $Y_1^1$ 与 $Y_1^0$ 正交。
::: solution
$\abs{Y_1^1}^2 = (3/8\pi)\sin^2\theta$，且 $\int_0^\pi\sin^3\theta\,\dd\theta = \int_{-1}^1(1 - u^2)\,\dd u = \frac43$。所以积分为 $(3/8\pi)\cdot2\pi\cdot\frac43 = 1$。与 $Y_1^0$ 的正交只由 $\varphi$ 积分得出：$\int_0^{2\pi}e^{i\varphi}\,\dd\varphi = 0$。更一般地，$m$ 不同的球谐函数因因子 $e^{i(m - m')\varphi}$ 而正交；$m$ 相同而 $l$ 不同的则因它们是厄米 $\hat L^2$ 的属于不同本征值的本征函数而正交。
:::
:::

::: exercise 数多重态 {level=2 check="3"}
一个 $j_1 = \frac32$ 的粒子与一个 $j_2 = 1$ 的粒子耦合。总 $j$ 出现多少个不同的值？列出来，并检验态数。
::: solution
由 [[#thm-addition]]，$j = \frac12, \frac32, \frac52$：三个值。态数分别为 $2 + 4 + 6 = 12 = 4\times3$。
:::
:::

::: exercise Lz 本征态中的横向分量 {level=3}
证明在 $\hat L_z$ 的任一本身征态中 $\langle L_x\rangle = \langle L_y\rangle = 0$。然后证明态 $|l\,l\rangle$ 使不确定性关系 $\Delta L_x\,\Delta L_y \ge \frac\hbar2\abs{\langle L_z\rangle}$ 达到饱和。
::: solution
由 [[#eq-L-comm]]，$i\hbar\hat L_x = [\hat L_y, \hat L_z]$。若 $\hat L_z|\psi\rangle = m\hbar|\psi\rangle$，则

$$
i\hbar\langle L_x\rangle = \langle\psi|\hat L_y\hat L_z - \hat L_z\hat L_y|\psi\rangle = m\hbar\langle\psi|\hat L_y|\psi\rangle - m\hbar\langle\psi|\hat L_y|\psi\rangle = 0,
$$

其中第二项利用了 $\hat L_z$ 的厄米性使其向左作用。对 $i\hbar\hat L_y = [\hat L_z, \hat L_x]$ 做同样的论证得 $\langle L_y\rangle = 0$。

于是 $(\Delta L_x)^2 = \langle L_x^2\rangle$，由上一题它是 $\frac{\hbar^2}{2}\bigl(l(l+1) - m^2\bigr)$，$L_y$ 同理。对 $m = l$，$(\Delta L_x)^2 = (\Delta L_y)^2 = \frac{\hbar^2}{2}\,l$，所以 $\Delta L_x\,\Delta L_y = \frac{\hbar^2l}{2}$。下界为 $\frac\hbar2\abs{\langle L_z\rangle} = \frac\hbar2\cdot l\hbar$，与之相同。极值态 $|l\,{\pm l}\rangle$ 是横向分量的最小不确定度态，是角动量版的谐振子基态。
:::
:::

::: exercise 最高球谐函数上的 L² {level=3}
用 [[#eq-L-spherical]] 直接验证 $Y_l^l \propto \sin^l\theta\,e^{il\varphi}$ 满足 $\hat L^2Y_l^l = \hbar^2l(l+1)Y_l^l$。
::: solution
令 $f = \sin^l\theta$。则 $\partial_\theta f = l\sin^{l-1}\theta\cos\theta$，且

$$
\frac{1}{\sin\theta}\partial_\theta\bigl(\sin\theta\,\partial_\theta f\bigr) = \frac{1}{\sin\theta}\partial_\theta\bigl(l\sin^l\theta\cos\theta\bigr) = \frac{l}{\sin\theta}\bigl(l\sin^{l-1}\theta\cos^2\theta - \sin^{l+1}\theta\bigr) = l^2\sin^{l-2}\theta\cos^2\theta - l\sin^l\theta.
$$

$\varphi$ 部分贡献 $\frac{1}{\sin^2\theta}\partial_\varphi^2e^{il\varphi} = -\frac{l^2}{\sin^2\theta}e^{il\varphi}$，即 $-l^2\sin^{l-2}\theta$ 乘以 $e^{il\varphi}$。相加，并用 $\cos^2\theta = 1 - \sin^2\theta$：

$$
l^2\sin^{l-2}\theta(1 - \sin^2\theta) - l\sin^l\theta - l^2\sin^{l-2}\theta = -(l^2 + l)\sin^l\theta.
$$

所以 $\hat L^2Y_l^l = -\hbar^2\cdot\bigl(-l(l+1)\bigr)Y_l^l = \hbar^2l(l+1)Y_l^l$。
:::
:::
