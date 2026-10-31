到这里为止，我们解的都是一个个问题：一个波函数，一个势，一个微分方程，若干积分。一路上有一个模式反复出现：能量本征函数彼此正交，任何态都可以按它们展开，系数的模平方表现得像概率，$\hat x$ 与 $\hat p$ 这样的算符彼此不对易，而乘积 $\Delta x\,\Delta p$ 从不低于 $\hbar/2$。本章解释其中的原因。原因在于：量子态是复内积空间中的向量，可观测量是该空间上的厄米算符，而理论的预言就是线性代数的陈述。

收获是巨大的。一旦这一结构就位，同样的规则既能处理直线上的粒子，也能处理电子的自旋——它并没有通常意义上的波函数——还能处理多粒子体系。不确定性原理成为关于任意一对可观测量的定理，证明只有两行。其后的角动量、氢原子与自旋各章，都是这里建立起来的结构的应用。

你需要复数向量空间的线性代数：内积、标准正交基、本征值与厄米矩阵，数学图谱的[内积](/learn/maths/lesson.php?c=linear-algebra&l=inner-products)与[谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)两文讲了这些。我们对有限维陈述结果并给出证明，并说明波函数所处的无限维空间里有什么改变。无限维情形的完整数学处理见参考文献（Shankar 第 1 章是一个温和的起点；冯·诺依曼的著作是原始文献）。

## 态是向量 {#states}

实轴上平方可积函数的全体构成一个向量空间：两个平方可积函数之和是平方可积的，它们的复倍数也是。它带有自然的内积。

::: definition 希尔伯特空间与内积 {#def-hilbert}
空间 $L^2(\R)$ 由满足 $\int_{-\infty}^\infty\abs f^2\,\dd x < \infty$ 的复值函数 $f$ 构成。两个这样的函数的**内积**为

$$
\langle f|g\rangle = \int_{-\infty}^\infty f(x)^*g(x)\,\dd x,
$$ {#eq-inner}

**范数**为 $\norm f = \sqrt{\langle f|f\rangle}$。内积对第二个变元线性、对第一个变元共轭线性，满足 $\langle g|f\rangle = \langle f|g\rangle^*$，且除非 $f = 0$ 外 $\langle f|f\rangle > 0$。这类完备的内积空间称为**希尔伯特空间**。量子体系的态是希尔伯特空间中范数为 $1$ 的向量 $|\psi\rangle$，只能确定到只差一个整体相位。
:::

我们把向量写作**右矢** $|\psi\rangle$，把线性映射 $|\phi\rangle \mapsto \langle\psi|\phi\rangle$ 写作**左矢** $\langle\psi|$。左矢配上右矢给出一个数——"括号"（bracket）。这是狄拉克（Dirac）的记号。它不花任何代价，却替你记住内积的哪一边被共轭。波函数 $\psi(x)$ 于是就是 $|\psi\rangle$ 沿位置的分量，确切意义见下文；右矢本身更抽象，可以按别的基展开。

严格地说，"$L^2$" 由这样的函数等价类组成：彼此只在长度为零的集合上不同；它还含有不可微的函数。这对本课程的一切计算都无关紧要，你尽可把态想成光滑、速降的函数，它们在 $L^2$ 中稠密。$L^2$ 的完备性——即柯西列收敛——正是使傅里叶级数这类无穷展开有意义的东西。

::: lemma 柯西-施瓦茨不等式 {#lem-schwarz}
内积空间中任何向量 $f$、$g$ 满足 $\abs{\langle f|g\rangle}^2 \le \langle f|f\rangle\langle g|g\rangle$，等号成立当且仅当 $f$ 与 $g$ 线性相关。
:::

::: proof
若 $g = 0$ 两端都为零。否则令 $\lambda = \langle g|f\rangle/\langle g|g\rangle$ 并考察 $h = f - \lambda g$，即 $f$ 中与 $g$ 正交的那部分。则 $\langle g|h\rangle = \langle g|f\rangle - \lambda\langle g|g\rangle = 0$，于是

$$
0 \le \langle h|h\rangle = \langle f|f\rangle - \lambda\langle f|g\rangle = \langle f|f\rangle - \frac{\abs{\langle g|f\rangle}^2}{\langle g|g\rangle},
$$

这里用了 $\langle h|h\rangle = \langle f|h\rangle$（因为 $\langle g|h\rangle = 0$）以及 $\langle f|g\rangle\langle g|f\rangle = \abs{\langle g|f\rangle}^2$。乘以 $\langle g|g\rangle > 0$ 即得不等式。等号恰在 $h = 0$ 时成立，即 $f = \lambda g$。
:::

在 $L^2$ 中，这一不等式保证只要 $f$、$g$ 可归一化，$\langle f|g\rangle$ 就有限。它还将用来证明不确定性原理。

### 基与展开

向量组 $\{|e_n\rangle\}$ 若满足 $\langle e_m|e_n\rangle = \delta_{mn}$ 则称**标准正交**；若每个向量都可写成 $|\psi\rangle = \sum_nc_n|e_n\rangle$，则称它是**基**（完备）。与 $\langle e_m|$ 作内积就把系数挑了出来：

$$
c_n = \langle e_n|\psi\rangle, \qquad |\psi\rangle = \sum_n|e_n\rangle\langle e_n|\psi\rangle, \qquad \sum_n|e_n\rangle\langle e_n| = \hat 1.
$$ {#eq-completeness}

最后一个等式——**完备性关系**，又叫"单位算符的分解"——是量子力学中最常用的恒等式。在任意处插入它，就是按那个基展开。对归一化态，$\langle\psi|\psi\rangle = \sum_n\abs{c_n}^2 = 1$，这就是帕塞瓦尔（Parseval）恒等式，也正是 $\abs{c_n}^2$ 能充当概率的原因。无限深势阱的本征函数就是这样一个基，其中 $c_n = \langle\psi_n|\psi\rangle = \int\psi_n^*\psi\,\dd x$；我们在 [[quantum-1/schrodinger-equation#ex-expand]] 中已经用过了这一事实，只是没有用这套记号。

## 可观测量是厄米算符 {#hermitian}

线性算符 $\hat A$ 把右矢映到右矢，$|\psi\rangle \mapsto \hat A|\psi\rangle$。被测量的量必须是实的，所以我们希望算符的期望值 $\langle\psi|\hat A|\psi\rangle$ 永远是实的。

::: definition 伴随与厄米算符 {#def-hermitian}
算符 $\hat A$ 的**伴随** $\hat A^\dagger$ 由 $\langle f|\hat A^\dagger g\rangle = \langle\hat Af|g\rangle$ 对一切 $f$、$g$ 定义。若 $\hat A^\dagger = \hat A$，则算符称为**厄米**的，即

$$
\langle f|\hat Ag\rangle = \langle\hat Af|g\rangle \quad\text{对一切 } f, g.
$$

在有限维标准正交基下，$\hat A^\dagger$ 的矩阵是 $\hat A$ 的矩阵的共轭转置，而厄米算符的矩阵是厄米矩阵，$A_{mn} = A_{nm}^*$。
:::

位置是厄米的，因为 $x$ 是实的：$\int f^*xg\,\dd x = \int(xf)^*g\,\dd x$。动量由分部积分是厄米的：

$$
\langle f|\hat pg\rangle = \int f^*\left(-i\hbar g'\right)\dd x = \bigl[-i\hbar f^*g\bigr]_{-\infty}^\infty + \int\left(i\hbar f'^*\right)g\,\dd x = \int\left(-i\hbar f'\right)^*g\,\dd x = \langle\hat pf|g\rangle.
$$

因子 $-i$ 必不可少：$\dd/\dd x$ 本身是**反厄米**的，$(\dd/\dd x)^\dagger = -\dd/\dd x$，乘以 $i$ 才把它变成厄米的。厄米算符之和以及它们的实倍数是厄米的，所以取实 $V$ 时哈密顿量 $\hat p^2/2m + V(\hat x)$ 是厄米的。厄米算符的乘积 $\hat A\hat B$ 的伴随是 $\hat B\hat A$，因此只有当二者对易时它才是厄米的；$\hat x\hat p$ 不是厄米的，但 $\frac12(\hat x\hat p + \hat p\hat x)$ 是。

::: theorem 厄米算符的本征值与本征矢 {#thm-hermitian}
设 $\hat A$ 厄米。则
1. 每个期望值 $\langle\psi|\hat A|\psi\rangle$ 都是实的；
2. $\hat A$ 的每个本征值都是实的；
3. 属于不同本征值的本征矢彼此正交。

此外，在有限维空间中，$\hat A$ 的本征矢可以选为构成一组标准正交基（谱定理）。
:::

::: proof
(1) $\langle\psi|\hat A\psi\rangle = \langle\hat A\psi|\psi\rangle = \langle\psi|\hat A\psi\rangle^*$，所以它等于自己的共轭。

(2) 若 $\hat A|a\rangle = a|a\rangle$ 且 $|a\rangle \ne 0$，则 $a\langle a|a\rangle = \langle a|\hat Aa\rangle$ 由 (1) 是实的，而 $\langle a|a\rangle > 0$ 也是实的，所以 $a$ 是实的。

(3) 若 $\hat A|a\rangle = a|a\rangle$ 且 $\hat A|b\rangle = b|b\rangle$，则

$$
b\langle a|b\rangle = \langle a|\hat Ab\rangle = \langle\hat Aa|b\rangle = a^*\langle a|b\rangle = a\langle a|b\rangle,
$$

这里用了 (2)。于是 $(b - a)\langle a|b\rangle = 0$，而 $a \ne b$ 迫使 $\langle a|b\rangle = 0$。

至于有限维 $d$ 中的谱定理：特征多项式有一个根 $a_1$，带有单位本征矢 $|e_1\rangle$。$|e_1\rangle$ 的正交补 $W$ 被 $\hat A$ 映入自身，因为 $w \in W$ 蕴含 $\langle e_1|\hat Aw\rangle = \langle\hat Ae_1|w\rangle = a_1\langle e_1|w\rangle = 0$。限制在 $W$ 上，$\hat A$ 在一个 $d - 1$ 维空间上仍是厄米的。归纳法给出 $W$ 的一组标准正交本征基，再加上 $|e_1\rangle$ 就得到全空间的一组。
:::

无限维中谱定理需要更多小心。有些厄米算符——如方势阱与谐振子的哈密顿量——具有**离散谱**：可归一化的本征矢构成一组基，如同有限维。另一些——如整条直线上的 $\hat x$ 与 $\hat p$——根本没有可归一化的本征矢：它们的谱是**连续**的。许多——如氢原子的哈密顿量——二者兼具。工作规则——由冯·诺依曼（von Neumann）关于自伴算符的谱定理严格化——是：只要把对连续本征值的求和换成积分、把克罗内克 δ 换成狄拉克 δ，观测量的本征矢就是完备的。

### 连续谱：位置与动量

动量的本征值方程是 $-i\hbar f' = pf$，对每个实 $p$ 由 $f_p(x) = e^{ipx/\hbar}/\sqrt{2\pi\hbar}$ 求解。这些平面波不在 $L^2$ 中，但它们按 δ 函数意义标准正交，

$$
\langle f_{p'}|f_p\rangle = \frac{1}{2\pi\hbar}\int_{-\infty}^\infty e^{i(p - p')x/\hbar}\,\dd x = \delta(p - p'),
$$

且完备：每个 $\psi \in L^2$ 都可写成 $\psi(x) = \int\Phi(p)f_p(x)\,\dd p$，其中

$$
\Phi(p) = \langle f_p|\psi\rangle = \frac{1}{\sqrt{2\pi\hbar}}\int_{-\infty}^\infty e^{-ipx/\hbar}\psi(x)\,\dd x.
$$ {#eq-momentum-space}

这就是 [[quantum-1/schrodinger-equation#free]] 中的傅里叶变换，取 $p = \hbar k$，而 $\Phi(p)$ 是**动量空间波函数**。类似地，$\hat x$ 的属于本征值 $x_0$ 的本征函数是 $\delta(x - x_0)$，而 $|\psi\rangle$ 沿它们的"分量"是 $\langle x_0|\psi\rangle = \psi(x_0)$。这正是"波函数是态的位置表象"的精确意义，而 $\Phi$ 是它的动量表象。二者谁也不比谁更基本。

::: example 束缚态的动量分布 {#ex-momentum}
δ 函数势阱的束缚态为 $\psi(x) = \sqrt\kappa\,e^{-\kappa\abs x}$（[[quantum-1/piecewise-potentials#delta]]）。求它的动量空间波函数，验证它已归一化，求动量测量给出 $\abs p < \hbar\kappa$ 的概率，并在两种表象下分别计算 $\langle p^2\rangle$ 加以比较。
::: solution
把积分 [[#eq-momentum-space]] 在 $x = 0$ 处分成两段，并记 $p_0 = \hbar\kappa$：

$$
\Phi(p) = \sqrt{\frac{\kappa}{2\pi\hbar}}\left(\int_0^\infty e^{-(\kappa + ip/\hbar)x}\,\dd x + \int_{-\infty}^0e^{(\kappa - ip/\hbar)x}\,\dd x\right) = \sqrt{\frac{\kappa}{2\pi\hbar}}\left(\frac{1}{\kappa + ip/\hbar} + \frac{1}{\kappa - ip/\hbar}\right).
$$

括号是 $2\kappa/(\kappa^2 + p^2/\hbar^2)$，所以

$$
\Phi(p) = \sqrt{\frac{2}{\pi}}\,\frac{p_0^{3/2}}{p^2 + p_0^2}, \qquad \abs{\Phi(p)}^2 = \frac2\pi\,\frac{p_0^3}{(p^2 + p_0^2)^2}.
$$

它是实的且为偶的，因为 $\psi$ 是实的且为偶的。由 $\int_{-\infty}^\infty\dd p/(p^2 + p_0^2)^2 = \pi/2p_0^3$，总概率为 $1$，正是普拉塞瓦尔定理保证的。在 $-p_0 < p < p_0$ 上，原函数 $\frac{1}{2p_0^2}\bigl(p/(p^2 + p_0^2) + p_0^{-1}\arctan(p/p_0)\bigr)$ 给出

$$
P(\abs p < p_0) = \frac2\pi p_0^3\cdot\frac{1}{2p_0^3}\left(1 + \frac\pi2\right) = \frac12 + \frac1\pi = 0.818.
$$

在动量空间中求 $\langle p^2\rangle$：$\int p^2\abs\Phi^2\,\dd p = \frac2\pi p_0^3\int\frac{p^2\,\dd p}{(p^2 + p_0^2)^2} = \frac2\pi p_0^3\cdot\frac{\pi}{2p_0} = p_0^2$。在位置空间中，$\langle p^2\rangle = \hbar^2\int\abs{\psi'}^2\,\dd x = \hbar^2\kappa^2\int\abs\psi^2\,\dd x = \hbar^2\kappa^2$，二者相同。动量密度只按 $1/p^4$ 衰减，这是 $\psi$ 在原点处有尖角的结果；光滑波函数的动量密度按比任何幂次都快的速度衰减。一种表象中的尖锐特征意味着另一种表象中的长尾。
:::
:::

## 测量公设 {#postulates}

我们现在可以紧凑地陈述量子力学的诸规则。不同的书排列顺序不同；内容是标准的。

::: axiom 量子力学的公设 {#ax-postulates}
1. **态。** 孤立体系的态是希尔伯特空间中模为 $1$ 的向量 $|\psi\rangle$，相差一个整体相位。
2. **可观测量。** 每个可测量的量由一个本征矢完备的厄米算符 $\hat A$ 表示。
3. **结果与概率（玻恩规则）。** 对 $A$ 的测量给出 $\hat A$ 的某个本征值 $a_n$。若 $\{|a_n\rangle\}$ 是一组标准正交本征基，结果 $a_n$ 的概率为 $\abs{\langle a_n|\psi\rangle}^2$（若 $a_n$ 简并，则对本征子空间的一组标准正交基求和）。对连续谱，$\abs{\langle a|\psi\rangle}^2\,\dd a$ 是结果落在 $a$ 与 $a + \dd a$ 之间的概率。
4. **坍缩。** 一次给出 $a_n$ 的测量之后的一瞬，态是 $|\psi\rangle$ 到 $a_n$ 的本征子空间上的投影，再加以归一化。
5. **演化。** 在两次测量之间，态按薛定谔方程 $i\hbar\,\dd|\psi\rangle/\dd t = \hat H|\psi\rangle$ 演化。
:::

公设 3 取 $\hat A = \hat x$，就是 [[quantum-1/schrodinger-equation#def-wavefunction]] 的玻恩规则：本征矢是 $\delta(x - x_0)$，而 $\abs{\langle x_0|\psi\rangle}^2 = \abs{\psi(x_0)}^2$。取 $\hat A = \hat p$，它说 $\abs{\Phi(p)}^2$ 是动量的概率密度。取 $\hat A = \hat H$，它说 $\abs{c_n}^2$ 是能量 $E_n$ 的概率。每种情形下，分布的平均值都是

$$
\sum_na_n\abs{\langle a_n|\psi\rangle}^2 = \sum_n\langle\psi|a_n\rangle a_n\langle a_n|\psi\rangle = \langle\psi|\hat A\Bigl(\sum_n|a_n\rangle\langle a_n|\Bigr)|\psi\rangle = \langle\psi|\hat A|\psi\rangle,
$$

这里用了 $\hat A|a_n\rangle = a_n|a_n\rangle$ 与完备性。所以前几章的期望值 $\langle\psi|\hat A|\psi\rangle$ 恰好就是测量结果的平均值，而不确定度 $\Delta A$ 是它们的标准差。一个态对 $A$ 有确定值——$\Delta A = 0$——当且仅当它是 $\hat A$ 的本征矢（见习题）。

公设 4 使重复测量自洽：测量 $A$ 得到 $a_n$，立即再测，就以概率 $1$ 得到 $a_n$。它也是理论中最受争议的部分。本课程没有任何内容依赖于你如何诠释它，只依赖于规则本身。

::: example 一个三态体系 {#ex-three-state}
可观测量 $\hat A$ 有标准正交本征矢 $|1\rangle$、$|2\rangle$、$|3\rangle$，本征值为 $a_1 = 1$、$a_2 = 2$、$a_3 = 3$（在某单位下）。体系被制备在态 $|\psi\rangle = N\bigl(|1\rangle + 2i|2\rangle - 2|3\rangle\bigr)$。求 $N$、各结果的概率、$\langle A\rangle$ 与 $\Delta A$，以及一次给出 $a_2$ 的测量之后的态。
::: solution
归一化：$\langle\psi|\psi\rangle = \abs N^2\bigl(1 + \abs{2i}^2 + \abs{-2}^2\bigr) = 9\abs N^2$，所以 $N = 1/3$（除相位外）。概率就是各分量的模平方：

$$
P(1) = \frac19, \qquad P(2) = \frac49, \qquad P(3) = \frac49,
$$

其和为 $1$。相位 $i$ 与 $-1$ 对它们没有影响。平均值与平方的平均值为

$$
\langle A\rangle = \frac{1 + 8 + 12}{9} = \frac{21}{9} = \frac73, \qquad \langle A^2\rangle = \frac{1 + 16 + 36}{9} = \frac{53}{9},
$$

所以 $(\Delta A)^2 = 53/9 - 49/9 = 4/9$，$\Delta A = 2/3$。给出 $a_2$ 的测量之后，态坍缩到 $|2\rangle$（相位 $i$ 是整体的，可以去掉），再测一次 $A$ 以概率 $1$ 给出 $2$。$|\psi\rangle$ 中的相对相位，要到测量一个不共享这组本征基的其他可观测量时才会起作用。
:::
:::

## 对易子与相容的可观测量 {#commutators}

两个可观测量可以"一起"被测量——意思是存在对二者都有确定值的态——只在它们的对易子满足某个条件时。

::: theorem 相容的可观测量 {#thm-compatible}
设 $\hat A$ 与 $\hat B$ 是本征矢构成完备集的厄米算符。它们有一组公共的标准正交本征基当且仅当 $[\hat A, \hat B] = 0$。
:::

::: proof
若有一组公共本征基 $\{|n\rangle\}$，$\hat A|n\rangle = a_n|n\rangle$ 且 $\hat B|n\rangle = b_n|n\rangle$，则对每个基向量 $\hat A\hat B|n\rangle = a_nb_n|n\rangle = \hat B\hat A|n\rangle$，由线性即得 $\hat A\hat B = \hat B\hat A$。

反之，设 $[\hat A, \hat B] = 0$，并设 $|a\rangle$ 是 $\hat A$ 的属于本征值 $a$ 的本征矢。则 $\hat A(\hat B|a\rangle) = \hat B\hat A|a\rangle = a(\hat B|a\rangle)$，所以 $\hat B$ 把 $\hat A$ 的本征子空间 $E_a$ 映入自身。若 $E_a$ 是一维的，$\hat B|a\rangle$ 是 $|a\rangle$ 的倍数，所以 $|a\rangle$ 已经是 $\hat B$ 的本征矢。若 $E_a$ 简并，$\hat B$ 限制在 $E_a$ 上是该子空间（在我们需要的场合是有限维的）上的一个厄米算符，由谱定理它有 $E_a$ 的一组标准正交本征基。这些向量同时是两者的本征矢。在 $\hat A$ 的每个本征子空间里都这样做——这些子空间由 [[#thm-hermitian]] 两两正交——就得到公共的标准正交本征基。
:::

简并情形才是重要的。若只有 $\hat A$ 的本征值简并，$\hat A$ 的本征值就不能唯一标记态，于是我们添加相互对易的可观测量，直到联立本征值能唯一标记为止。这样一组算符称为**对易可观测量完备集**。对氢原子，它将取 $\hat H$、$\hat L^2$ 与 $\hat L_z$（加上自旋），而标记 $n$、$l$、$m$ 就是它们的联立本征值。

最重要的对易子是**正则对易关系**，[[quantum-1/harmonic-oscillator]] 中已经用过：

$$
[\hat x, \hat p] = i\hbar.
$$ {#eq-ccr}

它在任何有限维空间里都不能成立，因为矩阵对易子的迹为零，而 $i\hbar\hat 1$ 的迹不为零。位置与动量需要无限维。$\hat x$ 与 $\hat p$ 的函数的对易子，可由 [[#eq-ccr]] 与乘积法则 $[\hat A, \hat B\hat C] = [\hat A, \hat B]\hat C + \hat B[\hat A, \hat C]$ 推出。

::: example 一些对易子 {#ex-commutators}
证明 $[\hat x, \hat p^2] = 2i\hbar\hat p$、$[\hat x^2, \hat p] = 2i\hbar\hat x$，以及对 $\hat H = \hat p^2/2m + V(\hat x)$ 有 $[\hat H, \hat x] = -i\hbar\hat p/m$。更一般地证明 $[\hat p, f(\hat x)] = -i\hbar f'(\hat x)$。
::: solution
由乘积法则，$[\hat x, \hat p^2] = [\hat x, \hat p]\hat p + \hat p[\hat x, \hat p] = 2i\hbar\hat p$。类似地 $[\hat x^2, \hat p] = \hat x[\hat x, \hat p] + [\hat x, \hat p]\hat x = 2i\hbar\hat x$。对哈密顿量，$V(\hat x)$ 与 $\hat x$ 对易，所以

$$
[\hat H, \hat x] = \frac{1}{2m}[\hat p^2, \hat x] = -\frac{1}{2m}[\hat x, \hat p^2] = -\frac{i\hbar}{m}\hat p.
$$

对一般函数，把对易子作用在试验函数 $g$ 上：$[\hat p, f]g = -i\hbar(fg)' + i\hbar fg' = -i\hbar f'g$。于是 $[\hat p, f(\hat x)] = -i\hbar f'(\hat x)$，它重新给出 $[\hat p, \hat x^2] = -2i\hbar\hat x$。含 $\hat p$ 的对易子的作用就像对 $x$ 求导再乘 $-i\hbar$，而含 $\hat x$ 的对易子就像对 $p$ 求导再乘 $i\hbar$。
:::
:::

::: quiz
算符 $\hat A$ 与 $\hat B$ 对易。哪个陈述成立？
- [ ] $\hat A$ 的每个本征矢都是 $\hat B$ 的本征矢。
- [x] 存在一组基，其中每个态对 $A$ 与 $B$ 都有确定值。
- [ ] 在一切态中 $\Delta A\,\Delta B = 0$。
- [ ] $A$ 与 $B$ 有相同的本征值。
::: solution
[[#thm-compatible]] 保证一组公共本征基。它并没有说 $\hat A$ 的每个本征矢都是 $\hat B$ 的本征矢：若 $\hat A$ 有简并本征值，$B$ 值不同的态的组合仍是 $\hat A$ 的本征矢，却不是 $\hat B$ 的。（取与一切算符对易的 $\hat A = \hat 1$。）而在一般的叠加态里，$\Delta A$ 与 $\Delta B$ 都可以非零；对易去掉的是乘积的下限，并不迫使乘积为零。
:::
:::

## 不确定性原理 {#uncertainty}

::: theorem 罗伯逊不确定性关系 {#thm-robertson}
对任意厄米算符 $\hat A$、$\hat B$ 以及它们定义域中的任一归一化态 $|\psi\rangle$，

$$
\Delta A\,\Delta B \ge \frac12\abs{\langle[\hat A, \hat B]\rangle}.
$$ {#eq-robertson}

特别地，对位置与动量，

$$
\Delta x\,\Delta p \ge \frac{\hbar}{2}.
$$ {#eq-heisenberg}
:::

::: proof
令 $\hat A_0 = \hat A - \langle A\rangle$、$\hat B_0 = \hat B - \langle B\rangle$。它们是厄米的（减去的是单位算符的实倍数），与 $\hat A$、$\hat B$ 有相同的对易子，且 $(\Delta A)^2 = \langle\psi|\hat A_0^2|\psi\rangle = \langle f|f\rangle$，其中 $|f\rangle = \hat A_0|\psi\rangle$。类似地 $(\Delta B)^2 = \langle g|g\rangle$，其中 $|g\rangle = \hat B_0|\psi\rangle$。由 [[#lem-schwarz]]，

$$
(\Delta A)^2(\Delta B)^2 = \langle f|f\rangle\langle g|g\rangle \ge \abs{\langle f|g\rangle}^2 \ge \bigl(\operatorname{Im}\langle f|g\rangle\bigr)^2 = \left(\frac{\langle f|g\rangle - \langle g|f\rangle}{2i}\right)^2.
$$

现在由厄米性，$\langle f|g\rangle = \langle\hat A_0\psi|\hat B_0\psi\rangle = \langle\psi|\hat A_0\hat B_0|\psi\rangle$，同理 $\langle g|f\rangle = \langle\psi|\hat B_0\hat A_0|\psi\rangle$。二者之差是 $\langle[\hat A_0, \hat B_0]\rangle = \langle[\hat A, \hat B]\rangle$。因此

$$
(\Delta A)^2(\Delta B)^2 \ge \left(\frac{1}{2i}\langle[\hat A, \hat B]\rangle\right)^2.
$$

两个厄米算符的对易子是反厄米的，所以 $\langle[\hat A, \hat B]\rangle$ 是纯虚的，右端的括号是实的；开方即得 [[#eq-robertson]]。代入 $[\hat x, \hat p] = i\hbar$，右端为 $\frac12\abs{i\hbar} = \hbar/2$。
:::

注意这一定理说的是什么。$\Delta A$ 与 $\Delta B$ 是测量结果的展宽：在 $|\psi\rangle$ 的大量复制上测 $A$，在同一状态的另一批*大量*复制上测 $B$。定理说：没有哪种制备能让两个展宽都很小。这个形式并不是关于先测一个、再测另一个所造成的扰动的陈述，尽管海森堡最初正是这样启发它的。

界何时达到？等号要求施瓦茨不等式中 $|g\rangle = \lambda|f\rangle$，而丢掉实部的做法要求 $\operatorname{Re}\langle f|g\rangle = 0$，这使 $\lambda$ 为纯虚。对位置与动量，$\hat p_0\psi = ic\,\hat x_0\psi$（$c$ 为实）是一阶微分方程，其可归一化解是高斯函数，习题中将会看到。谐振子的基态是其中之一，这就是它达到 $\Delta x\,\Delta p = \hbar/2$ 的原因。

::: example 势阱中的不确定度 {#ex-well-uncertainty}
对宽度 $a$ 的无限深势阱的态 $\psi_n$，求 $\Delta x\,\Delta p$，并检验 [[#eq-heisenberg]]。
::: solution
由 $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$，对称性给出 $\langle x\rangle = a/2$，一个标准积分（分部积分两次）给出

$$
\langle x^2\rangle = \frac2a\int_0^ax^2\sin^2\frac{n\pi x}{a}\,\dd x = a^2\left(\frac13 - \frac{1}{2n^2\pi^2}\right),
$$

于是 $(\Delta x)^2 = a^2\bigl(\frac{1}{12} - \frac{1}{2n^2\pi^2}\bigr)$。该态是实的，所以 $\langle p\rangle = 0$，且 $\langle p^2\rangle = 2mE_n = n^2\pi^2\hbar^2/a^2$。因此

$$
\Delta x\,\Delta p = n\pi\hbar\sqrt{\frac{1}{12} - \frac{1}{2n^2\pi^2}} = \frac\hbar2\sqrt{\frac{n^2\pi^2}{3} - 2}.
$$

$n = 1$ 时为 $0.568\,\hbar$，略高于最小值 $0.5\,\hbar$；正弦函数接近高斯，但不完全是。$n = 2$ 时为 $1.670\,\hbar$，$n$ 大时随 $n$ 线性增长。更高的态有更大的动量 $\pm n\pi\hbar/a$，而位置上的展宽趋于均匀分布的经典值 $a/\sqrt{12}$。
:::
:::

::: widget plot
f: 0.5*sqrt(max(x^2*pi^2/3 - 2, 0)); x + 0.5; 0.5
x: 0, 6
y: 0, 7
labels: 方势阱; 谐振子; 下限 ħ/2
caption: 以 $\hbar$ 为单位的乘积 $\Delta x\,\Delta p$ 随量子数 $n$ 的变化（只有整数点才是态：势阱为 $n = 1, 2, \ldots$，谐振子为 $n = 0, 1, \ldots$）。方势阱 $\frac12\sqrt{n^2\pi^2/3 - 2}$ 在 $n = 1$ 处从 $0.568$ 起步；谐振子 $n + \frac12$ 在 $n = 0$ 处恰好落在界 $\frac12$ 上。两者 $n$ 大时都线性增长，斜率分别为 $\pi/\sqrt{12} = 0.91$ 与 $1$。
:::

### 期望值如何随时间变化

对易子还支配动力学。

::: theorem 广义埃伦费斯特定理 {#thm-ehrenfest-general}
对可能显含时间的可观测量 $\hat Q$ 与按薛定谔方程演化的态，

$$
\deriv{}{t}\langle Q\rangle = \frac{i}{\hbar}\langle[\hat H, \hat Q]\rangle + \left\langle\pdv{\hat Q}{t}\right\rangle.
$$ {#eq-ehrenfest-general}
:::

::: proof
由乘积法则对 $\langle\psi|\hat Q\psi\rangle$ 求导，并使用 $\partial_t|\psi\rangle = -(i/\hbar)\hat H|\psi\rangle$：

$$
\deriv{}{t}\langle\psi|\hat Q\psi\rangle = \left\langle-\frac i\hbar\hat H\psi\middle|\hat Q\psi\right\rangle + \left\langle\psi\middle|\pdv{\hat Q}{t}\psi\right\rangle + \left\langle\psi\middle|\hat Q\left(-\frac i\hbar\hat H\psi\right)\right\rangle.
$$

第一项是 $\frac i\hbar\langle\hat H\psi|\hat Q\psi\rangle = \frac i\hbar\langle\psi|\hat H\hat Q\psi\rangle$（第一变元上的共轭线性把 $-i$ 变成 $+i$，然后再用 $\hat H$ 的厄米性）。第三项是 $-\frac i\hbar\langle\psi|\hat Q\hat H\psi\rangle$。二者合起来给出 $\frac i\hbar\langle[\hat H, \hat Q]\rangle$。
:::

取 $\hat Q = \hat x$，由 [[#ex-commutators]] 得 $\frac i\hbar\langle-i\hbar\hat p/m\rangle = \langle p\rangle/m$；取 $\hat Q = \hat p$ 得 $-\langle V'\rangle$：[[quantum-1/schrodinger-equation#thm-ehrenfest]] 的埃伦费斯特定理是特例。更重要的是，一个不显含时间、且与 $\hat H$ 对易的可观测量，在*每个*态中的期望值都是常量，其概率分布也是常量。这就是**守恒量**的量子意义。中心势中的角动量将是第一个非平凡的例子。

把 [[#eq-ehrenfest-general]] 与取 $\hat B = \hat H$ 的 [[#thm-robertson]] 结合，得 $\Delta Q\,\Delta E \ge \frac\hbar2\abs{\dd\langle Q\rangle/\dd t}$。定义 $\Delta t = \Delta Q/\abs{\dd\langle Q\rangle/\dd t}$，即 $\langle Q\rangle$ 改变一个标准差所需的时间，这就是曼德尔施塔姆（Mandelstam）与塔姆（Tamm）（1945）的**能量-时间不确定性关系** $\Delta t\,\Delta E \ge \hbar/2$。这里时间不是算符；$\Delta t$ 是态与所选 $Q$ 的属性。能量尖锐的态在一切方面变化得都慢，定态必须如此。

### 幺正演化

对与时间无关的哈密顿量，薛定谔方程有形式解 $|\psi(t)\rangle = \hat U(t)|\psi(0)\rangle$，其中

$$
\hat U(t) = e^{-i\hat Ht/\hbar} = \sum_n e^{-iE_nt/\hbar}|n\rangle\langle n|,
$$

第二个形式是在能量本征基 $|n\rangle$ 中写的，这正是算符指数的定义与计算方法。作用于 $|\psi(0)\rangle = \sum_nc_n|n\rangle$ 就复原了展开式 [[quantum-1/schrodinger-equation#eq-general]]。算符 $\hat U$ 是**幺正的**，$\hat U^\dagger\hat U = \hat 1$，因为每个 $e^{-iE_nt/\hbar}$ 的模都是 $1$。幺正算符保持内积，$\langle\hat U\phi|\hat U\psi\rangle = \langle\phi|\psi\rangle$：概率守恒，正交的态保持正交，这推广了 [[quantum-1/schrodinger-equation#thm-continuity]] 的连续性方程与该章的重叠积分习题。幺正性正是哈密顿量必须厄米的原因；非厄米的 $\hat H$ 会给出增长或衰减的概率。

描述同一物理还有另一种等价的方式。与其让态演化、算符固定（**薛定谔绘景**），不如把态固定在 $|\psi(0)\rangle$，让算符按 $\hat A_H(t) = \hat U^\dagger\hat A\hat U$ 演化（**海森堡绘景**）。两种绘景的期望值相同，因为 $\langle\psi(t)|\hat A|\psi(t)\rangle = \langle\psi(0)|\hat U^\dagger\hat A\hat U|\psi(0)\rangle$。求导给出海森堡方程 $\dd\hat A_H/\dd t = (i/\hbar)[\hat H, \hat A_H]$，即 [[#eq-ehrenfest-general]] 的算符形式；对谐振子它给出 $\hat x_H(t) = \hat x\cos\omega t + (\hat p/m\omega)\sin\omega t$，就是把数换成算符的经典解。

::: warning 不确定性原理没有说什么
三种读法常见而错误。(1)"粒子有确定的位置与动量，只是我们无法知道它们。"定理说的是一个态中测量结果的展宽，而贝尔（Bell）一类的实验排除了最自然的隐值图像。(2)"每次测量的误差至少为 $\hbar/2$。"单次位置测量可以精确到仪器允许的任何程度；受约束的是它留下的态的动量展宽。(3)"$\Delta E\,\Delta t \ge \hbar/2$ 与 $\Delta x\,\Delta p \ge \hbar/2$ 是同一类陈述。"没有时间算符，能量-时间关系需要另行定义 $\Delta t$，如上。
:::

::: widget plot
f: exp(-x^2/(2*s^2))/(s*sqrt(2*pi)); 2*s*exp(-2*s^2*x^2)/sqrt(2*pi)
x: -5, 5
y: 0, 1.6
labels: 位置密度; 动量密度
sliders: s=1:0.25:3:0.05
caption: 一个 $\Delta x = s$ 的高斯态（取 $\hbar = 1$ 的单位）：它的位置密度 $\abs{\psi(x)}^2$ 与动量密度 $\abs{\Phi(p)}^2$，画在同一根轴上，后者有 $\Delta p = 1/2s$。挤压 $s$，动量密度就摊开；放宽它，动量密度就变尖。两个宽度的乘积保持恰为 $\frac12$。
:::

::: history 希尔伯特空间与不确定性关系
海森堡（Heisenberg）论不确定性关系的论文——带着 γ 射线显微镜的思想实验——发表于 1927 年的《物理学杂志》（*Zeitschrift für Physik*）。对标准差的确切不等式 $\Delta x\,\Delta p \ge \hbar/2$ 由肯纳德（Kennard）于同年证明，罗伯逊（Robertson）于 1929 年为任意可观测量证明了普遍形式 [[#eq-robertson]]。薛定谔（Schrödinger）在 1930 年通过保留我们证明中丢掉的实部将它加强。用希尔伯特空间表述的框架归功于冯·诺依曼（von Neumann），他的《量子力学的数学基础》（*Mathematische Grundlagen der Quantenmechanik*，1932）把无界自伴算符的谱理论放在了严格的基础上。狄拉克的《量子力学原理》（*The Principles of Quantum Mechanics*，1930）给出了物理学家使用的抽象表述，而左矢右矢记号出现在他 1939 年的一篇短文中。
:::

## 后续内容 {#leads}

[[quantum-1/angular-momentum]] 把这副机器用到 $\hat L_x$、$\hat L_y$、$\hat L_z$ 上，它们彼此不对易，所以同时尖锐的只能是 $\hat L^2$ 与一个分量。[[quantum-1/spin]] 在二维希尔伯特空间中工作，那里每个算符都是一个 $2\times2$ 矩阵，而公设可以在施特恩–格拉赫实验中直接检验。[[quantum-2]] 对含时微扰、全同粒子与纠缠使用同一套框架，其中复合体系的希尔伯特空间是一个张量积。

::: summary
- 态是希尔伯特空间中模为 $1$ 的向量 $|\psi\rangle$；对波函数，内积为 $\langle f|g\rangle = \int f^*g\,\dd x$；对任何标准正交基，$\sum_n|e_n\rangle\langle e_n| = \hat 1$。
- 可观测量是厄米算符：它们的期望值与本征值是实的，本征值不同的本征矢正交。
- 对 $A$ 的一次测量给出本征值 $a_n$，概率为 $\abs{\langle a_n|\psi\rangle}^2$，并把体系留在相应的本征态；平均值为 $\langle\psi|\hat A|\psi\rangle$。
- 位置与动量有连续谱；$\psi(x) = \langle x|\psi\rangle$ 与 $\Phi(p) = \langle p|\psi\rangle$ 互为傅里叶变换。
- 对易的可观测量有公共本征基；$[\hat x, \hat p] = i\hbar$。
- 罗伯逊：$\Delta A\,\Delta B \ge \frac12\abs{\langle[\hat A, \hat B]\rangle}$，故 $\Delta x\,\Delta p \ge \hbar/2$，等号只对高斯函数成立。
- $\dd\langle Q\rangle/\dd t = (i/\hbar)\langle[\hat H, \hat Q]\rangle + \langle\partial_t\hat Q\rangle$；与 $\hat H$ 对易的可观测量守恒。
:::

## 习题 {#exercises}

::: exercise 由分量求概率 {level=1 check="4/9"}
在 [[#ex-three-state]] 中，测量 $A$ 给出大于 $2.5$ 的结果的概率是多少？
::: solution
只有 $a_3 = 3$ 超过 $2.5$，概率为 $\abs{-2/3}^2 = 4/9$。
:::
:::

::: exercise 厄米吗？ {level=1}
下列 $L^2(\R)$ 上的算符哪些是厄米的：(a) $\dd/\dd x$；(b) $i\,\dd/\dd x$；(c) $\dd^2/\dd x^2$；(d) $\hat x\hat p$？
::: solution
(a) 分部积分给出 $\langle f|g'\rangle = -\langle f'|g\rangle$，所以 $(\dd/\dd x)^\dagger = -\dd/\dd x$：反厄米，不厄米。(b) $(i\,\dd/\dd x)^\dagger = (\dd/\dd x)^\dagger(i)^* = (-\dd/\dd x)(-i) = i\,\dd/\dd x$：厄米。它就是 $-\hat p/\hbar$。(c) $\dd^2/\dd x^2 = -\hat p^2/\hbar^2$ 是厄米的（分部积分两次）。(d) $(\hat x\hat p)^\dagger = \hat p\hat x = \hat x\hat p - i\hbar \ne \hat x\hat p$：不厄米。
:::
:::

::: exercise 叠加态的能量 {level=1 check="5/2"}
无限深势阱中的粒子处于态 $(\psi_1 + \psi_2)/\sqrt2$。以 $E_1$ 为单位求 $\langle H\rangle$，并求能量测量给出 $E_2$ 的概率。
::: solution
概率为 $\abs{1/\sqrt2}^2 = \frac12$，对应 $E_1$ 与 $E_2 = 4E_1$ 各占一半，所以 $\langle H\rangle = \frac12E_1 + \frac12(4E_1) = \frac52E_1$，且 $P(E_2) = \frac12$。任何一次测量都不会给出 $\frac52E_1$ 本身。
:::
:::

::: exercise 势阱的第二态 {level=2 check="0.5*sqrt(4*pi^2/3 - 2)"}
以 $\hbar$ 为单位，给出无限深势阱第一激发态的 $\Delta x\,\Delta p$。
::: solution
由 [[#ex-well-uncertainty]] 取 $n = 2$：$\frac12\sqrt{4\pi^2/3 - 2} = 1.670$。
:::
:::

::: exercise 尖锐值 {level=2}
证明归一化态 $|\psi\rangle$ 中 $\Delta A = 0$ 当且仅当 $|\psi\rangle$ 是 $\hat A$ 的本征矢。
::: solution
若 $\hat A|\psi\rangle = a|\psi\rangle$，则 $\langle A\rangle = a$ 且 $\langle A^2\rangle = a^2$，所以 $\Delta A = 0$。反之，由厄米性，$(\Delta A)^2 = \langle\psi|\hat A_0^2|\psi\rangle = \norm{\hat A_0\psi}^2$，其中 $\hat A_0 = \hat A - \langle A\rangle$。若它为零，则 $\hat A_0|\psi\rangle = 0$，即 $\hat A|\psi\rangle = \langle A\rangle|\psi\rangle$。
:::
:::

::: exercise 罗伯逊关系的二态检验 {level=2 check="1"}
在具有标准正交基 $|1\rangle$、$|2\rangle$ 的二维空间中，设 $\hat A$ 的矩阵为 $\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$，$\hat B$ 的矩阵为 $\begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$。在态 $|\psi\rangle = (|1\rangle + i|2\rangle)/\sqrt2$ 中，计算 $\Delta A$、$\Delta B$ 与 $\frac12\abs{\langle[\hat A, \hat B]\rangle}$，并给出 $\Delta A\,\Delta B$。
::: solution
在该基下 $\psi = \frac{1}{\sqrt2}(1, i)$。于是 $\hat A\psi = \frac{1}{\sqrt2}(i, 1)$，所以 $\langle A\rangle = \frac12(1\cdot i + (-i)\cdot1) = 0$，而 $\hat A^2 = \hat 1$ 给出 $\langle A^2\rangle = 1$，故 $\Delta A = 1$。类似地，由 $\hat B\psi = \frac{1}{\sqrt2}(1, -i)$ 得 $\langle B\rangle = \frac12(1 - 1) = 0$ 且 $\hat B^2 = \hat 1$，所以 $\Delta B = 1$。对易子为

$$
[\hat A, \hat B] = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix} - \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix} = \begin{pmatrix}0 & -2\\ 2 & 0\end{pmatrix},
$$

且 $\langle[\hat A, \hat B]\rangle = \frac12\bigl(1\cdot(-2i) + (-i)\cdot 2\bigr) = -2i$。于是 $\frac12\abs{\langle[\hat A, \hat B]\rangle} = 1 = \Delta A\,\Delta B$：这个态使界达到饱和。这些矩阵就是 [[quantum-1/spin]] 中的泡利矩阵 $\sigma_x$ 与 $\sigma_z$，而 $|\psi\rangle$ 是 $\sigma_y$ 的本征态。
:::
:::

::: exercise 最小不确定度态是高斯函数 {level=3}
证明可归一化的 $\psi$ 要达到 $\Delta x\,\Delta p = \hbar/2$，必须有 $\psi(x) = A\exp\bigl(-c(x - \langle x\rangle)^2/2\hbar + i\langle p\rangle x/\hbar\bigr)$，其中 $c > 0$ 为某实数。
::: hint
按 [[#thm-robertson]] 证明中的等号条件进行。
:::
::: solution
等号要求施瓦茨不等式取等，所以存在 $\lambda$ 使 $|g\rangle = \lambda|f\rangle$，还要求 $\operatorname{Re}\langle f|g\rangle = 0$。由 $\langle f|g\rangle = \lambda\langle f|f\rangle$ 与 $\langle f|f\rangle > 0$，第二个条件说 $\lambda = ic$ 是纯虚的。（若 $\langle f|f\rangle = 0$，则 $\Delta x = 0$，这对可归一化函数不可能。）记 $x_0 = \langle x\rangle$、$p_0 = \langle p\rangle$，条件 $\hat p_0\psi = ic\,\hat x_0\psi$ 写作

$$
-i\hbar\psi' - p_0\psi = ic(x - x_0)\psi, \qquad \frac{\psi'}{\psi} = \frac{ip_0}{\hbar} - \frac{c}{\hbar}(x - x_0).
$$

积分得 $\psi = A\exp\bigl(ip_0x/\hbar - c(x - x_0)^2/2\hbar\bigr)$。可归一化要求 $c > 0$。每个这样的高斯函数确实都达到界，因为 $\Delta x^2 = \hbar/2c$ 且 $\Delta p^2 = c\hbar/2$。
:::
:::

::: exercise 位力定理 {level=3}
在定态中对 $\hat Q = \hat x\hat p$ 应用 [[#thm-ehrenfest-general]]，证明 $2\langle T\rangle = \langle x\,V'(x)\rangle$。由此推出谐振子 $\langle T\rangle = \langle V\rangle$，以及势 $V \propto -1/\abs x$ 的 $2\langle T\rangle = -\langle V\rangle$。
::: solution
定态中每个期望值都是常量，所以 $\langle[\hat H, \hat x\hat p]\rangle = 0$。用乘积法则计算对易子：

$$
[\hat H, \hat x\hat p] = [\hat H, \hat x]\hat p + \hat x[\hat H, \hat p] = -\frac{i\hbar}{m}\hat p^2 + \hat x\,(i\hbar V'(\hat x)),
$$

其中 $[\hat H, \hat x]$ 用了 [[#ex-commutators]]，而 $[\hat H, \hat p] = [V, \hat p] = i\hbar V'$。令期望值为零得 $\langle p^2\rangle/m = \langle xV'\rangle$，即 $2\langle T\rangle = \langle xV'\rangle$。

对 $V = \frac12m\omega^2x^2$，$xV' = m\omega^2x^2 = 2V$，所以 $\langle T\rangle = \langle V\rangle$，与用升降算符得到的结果一致。对 $V = -k/\abs x$，$xV' = k/\abs x = -V$，所以 $2\langle T\rangle = -\langle V\rangle$ 且 $E = \langle T\rangle + \langle V\rangle = -\langle T\rangle$。同样的关系对三维库仑势也成立，并解释了为什么玻尔的动能是总能量的负值。
:::
:::
