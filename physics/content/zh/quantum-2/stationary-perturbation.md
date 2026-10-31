[[quantum-1/hydrogen]] 中的氢原子是能精确求解的，它的能级只依赖主量子数 $n$。用一架好的光谱仪去看巴耳末线 $\mathrm H_\alpha$，你会看到它不是一条线而是好几条，彼此相差几吉赫。把原子放进磁场，谱线进一步分裂；放进电场，它们又按另一种方式分裂。这些现象都不在库仑哈密顿量里。它们来自一些很小的附加项：相对论性动能、电子自旋与其轨道运动的相互作用、外加场。每个附加项与库仑势放在一起都难以精确求解，而每一项都很小。

本章把"小"变成一套系统的方法。我们把哈密顿量写成可解部分加一个修正，把能量和态按修正的幂展开，再读出前几项。这个方法称为**定态**（或**不含时**）**微扰论**，因为修正不依赖时间；依赖时间的微扰在 [[quantum-2/time-dependent]] 中处理。我们推导一阶与二阶公式，说明简并能级为什么要单独处理，然后把两者分别用于氢的精细结构以及塞曼效应与斯塔克效应。最后一节是变分法：没有小参数时，它给出基态能量的上界；它的第一个胜利是氦的基态，误差不超过百分之二。

语言沿用 [[quantum-1/formalism]]：右矢、厄米算符、标准正交本征基。精细结构一节要用到 [[quantum-1/angular-momentum]] 的角动量相加与 [[quantum-1/spin]] 的自旋。同样的思想以化学家的侧重出现在化学图谱的[近似方法](/learn/chemistry/lesson.php?c=quantum-chemistry&l=approximation-methods)一课中。

## 展开式的建立 {#setup}

假设我们已完全解出一个**未微扰**问题，

$$
\hat H^{0}\lvert n^{0}\rangle = E_n^{0}\lvert n^{0}\rangle, \qquad \langle m^{0}\vert n^{0}\rangle = \delta_{mn},
$$ {#eq-unperturbed}

现在要求 $\hat H = \hat H^{0} + \hat H'$ 的本征值，其中 $\hat H'$ 在某种意义上是小的。为了追踪级数，我们插入一个记账参数 $\lambda$，研究 $\hat H(\lambda) = \hat H^{0} + \lambda\hat H'$；最后再令 $\lambda = 1$。答案里 $\lambda$ 的每次幂就标记一个 $\hat H'$ 的幂次。

::: definition 微扰级数 {#def-series}
设 $\hat H(\lambda) = \hat H^{0} + \lambda\hat H'$，其中 $\hat H^{0}$ 与 $\hat H'$ 都是厄米的。归缩到 $\lambda = 0$ 时成为 $E_n^{0}$ 与 $\lvert n^{0}\rangle$ 的本征值 $E_n(\lambda)$ 与本征矢 $\lvert n(\lambda)\rangle$ 的**微扰级数**是形式幂级数

$$
E_n = E_n^{0} + \lambda E_n^{1} + \lambda^2E_n^{2} + \cdots, \qquad \lvert n\rangle = \lvert n^{0}\rangle + \lambda\lvert n^{1}\rangle + \lambda^2\lvert n^{2}\rangle + \cdots.
$$ {#eq-series}

$E_n^{k}$ 称为**第 $k$ 级能量修正**，$\lvert n^{k}\rangle$ 是态的第 $k$ 级修正。我们用约定 $\langle n^{0}\vert n\rangle = 1$ 固定 $\lvert n\rangle$ 的归一化与相位，它意味着对一切 $k \ge 1$ 有 $\langle n^{0}\vert n^{k}\rangle = 0$。
:::

约定 $\langle n^{0}\vert n\rangle = 1$ 不花任何代价：它使 $\lvert n\rangle$ 有一个 $1 + O(\lambda^2)$ 的归一化因子，最后再补回来即可。它省去大量代数，因为这样一来态的各阶修正都与未微扰态正交，可以只按其他未微扰态展开。

"小"究竟是什么意思？我们会看到，展开参数是 $\hat H'$ 在两个未微扰态之间的矩阵元与这两个态的能量差之比，

$$
\left\lvert\frac{\langle m^{0}\vert\hat H'\vert n^{0}\rangle}{E_n^{0} - E_m^{0}}\right\rvert \ll 1.
$$

微扰要跟能级间距相比是弱的，而不是跟能量本身相比。这就是间距为零的简并需要特殊处理的原因。

::: remark 级数收敛吗？
常常不收敛。对非谐振子 $\hat H = \hat p^2/2m + \frac12 m\omega^2\hat x^2 + \lambda\hat x^4$，按 $\lambda$ 的级数收敛半径为零：对任何 $\lambda < 0$，势在下方无界，无论 $\lambda$ 多小，问题的性质都变了。这个级数仍是**渐近**的：当 $\lambda \to 0$ 时，它的头几项对精确答案的逼近越来越好。实践中算一两级，再拿独立的结果来检验。
:::

## 非简并微扰论 {#nondegenerate}

把 [[#eq-series]] 代入 $\hat H\lvert n\rangle = E_n\lvert n\rangle$ 并按 $\lambda$ 收集各次幂。$\lambda^0$、$\lambda^1$ 与 $\lambda^2$ 各给出

$$
\begin{aligned}
\lambda^0:&\quad \hat H^{0}\lvert n^{0}\rangle = E_n^{0}\lvert n^{0}\rangle, \\
\lambda^1:&\quad \hat H^{0}\lvert n^{1}\rangle + \hat H'\lvert n^{0}\rangle = E_n^{0}\lvert n^{1}\rangle + E_n^{1}\lvert n^{0}\rangle, \\
\lambda^2:&\quad \hat H^{0}\lvert n^{2}\rangle + \hat H'\lvert n^{1}\rangle = E_n^{0}\lvert n^{2}\rangle + E_n^{1}\lvert n^{1}\rangle + E_n^{2}\lvert n^{0}\rangle.
\end{aligned}
$$ {#eq-orders}

零阶方程就是未微扰问题。其余一切只要与未微扰态作内积就能得出。

::: theorem 非简并微扰论 {#thm-nondegenerate}
设 $E_n^{0}$ 是 $\hat H^{0}$ 的非简并本征值，并记 $H'_{mn} = \langle m^{0}\vert\hat H'\vert n^{0}\rangle$。则

$$
E_n^{1} = H'_{nn} = \langle n^{0}\vert\hat H'\vert n^{0}\rangle,
$$ {#eq-first}

$$
\lvert n^{1}\rangle = \sum_{m\ne n}\frac{H'_{mn}}{E_n^{0} - E_m^{0}}\,\lvert m^{0}\rangle,
$$ {#eq-state1}

$$
E_n^{2} = \sum_{m\ne n}\frac{\lvert H'_{mn}\rvert^2}{E_n^{0} - E_m^{0}}.
$$ {#eq-second}
:::

::: proof
用 $\langle n^{0}\rvert$ 对 [[#eq-orders]] 中的一阶方程作内积。因为 $\hat H^{0}$ 厄米，$\langle n^{0}\vert\hat H^{0}\vert n^{1}\rangle = E_n^{0}\langle n^{0}\vert n^{1}\rangle$，与右端的相应项相消。剩下 $\langle n^{0}\vert\hat H'\vert n^{0}\rangle = E_n^{1}\langle n^{0}\vert n^{0}\rangle = E_n^{1}$，这就是 [[#eq-first]]。

再用 $\langle m^{0}\rvert$（$m \ne n$）对同一方程作内积。正交性杀掉了 $E_n^{1}$ 项，而 $\langle m^{0}\vert\hat H^{0} = E_m^{0}\langle m^{0}\rvert$ 给出

$$
E_m^{0}\langle m^{0}\vert n^{1}\rangle + H'_{mn} = E_n^{0}\langle m^{0}\vert n^{1}\rangle, \qquad \langle m^{0}\vert n^{1}\rangle = \frac{H'_{mn}}{E_n^{0} - E_m^{0}}.
$$

除法合法，因为 $E_n^{0}$ 非简并，对每个 $m \ne n$ 都有 $E_m^{0} \ne E_n^{0}$。未微扰态构成一组基，而按 [[#def-series]] 的约定，沿 $\lvert n^{0}\rangle$ 的分量为零，所以把 $\lvert n^{1}\rangle = \sum_m\lvert m^{0}\rangle\langle m^{0}\vert n^{1}\rangle$ 展开就得到 [[#eq-state1]]。

最后用 $\langle n^{0}\rvert$ 对二阶方程作内积。含 $\lvert n^{2}\rangle$ 的项如前相消，$\langle n^{0}\vert n^{1}\rangle = 0$ 去掉了 $E_n^{1}$ 项，于是

$$
E_n^{2} = \langle n^{0}\vert\hat H'\vert n^{1}\rangle = \sum_{m\ne n}\frac{H'_{nm}H'_{mn}}{E_n^{0} - E_m^{0}}.
$$

因为 $\hat H'$ 厄米，$H'_{nm} = (H'_{mn})^*$，分子就是 $\lvert H'_{mn}\rvert^2$。这就是 [[#eq-second]]。
:::

一阶移动就是微扰在未微扰态中的期望值。这正是你凭猜测能得到的：到一阶为止态来不及调整，能量只改变附加势的平均值。二阶移动则是让态通过混入其他态来调整自己而获得的能量。

::: corollary 基态在二级被压低 {#cor-ground}
若 $\lvert 0^{0}\rangle$ 是非简并基态，则 $E_0^{2} \le 0$，等号仅当 $\hat H'$ 不把 $\lvert 0^{0}\rangle$ 连向任何其他态时成立。
:::

::: proof
对基态，[[#eq-second]] 中每个分母 $E_0^{0} - E_m^{0}$ 都是负的，而每个分子 $\lvert H'_{m0}\rvert^2$ 都是非负的。
:::

更一般地说，二级使能级**相互排斥**：一个能级被它上面的能级压低、被它下面的能级抬高，其中距离最近的邻级作用最强。

::: example 均匀场中的带电谐振子 {#ex-charged-oscillator}
电荷 $q$、质量 $m$ 的粒子处于谐振子势 $\frac12 m\omega^2x^2$ 中，再放进沿 $x$ 的均匀电场 $\mathcal E$，于是 $\hat H' = -q\mathcal E\hat x$。求每个能级到二阶的能量移动，并与精确答案比较。
::: solution
由 [[quantum-1/harmonic-oscillator]]，$\hat x = \sqrt{\hbar/2m\omega}\,(\hat a + \hat a^\dagger)$，所以 $\hat x$ 在谐振子态之间非零的矩阵元只有

$$
\langle n-1\vert\hat x\vert n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\sqrt n, \qquad \langle n+1\vert\hat x\vert n\rangle = \sqrt{\frac{\hbar}{2m\omega}}\sqrt{n+1}.
$$

一阶：$E_n^{1} = -q\mathcal E\langle n\vert\hat x\vert n\rangle = 0$，因为每个谐振子态都有确定宇称而 $x$ 是奇的。

二阶：[[#eq-second]] 中只有 $m = n\pm 1$ 有贡献，分母为 $E_n^{0} - E_{n-1}^{0} = \hbar\omega$ 与 $E_n^{0} - E_{n+1}^{0} = -\hbar\omega$：

$$
E_n^{2} = q^2\mathcal E^2\frac{\hbar}{2m\omega}\left[\frac{n}{\hbar\omega} - \frac{n+1}{\hbar\omega}\right] = -\frac{q^2\mathcal E^2}{2m\omega^2}.
$$

每个能级的移动都相同。精确地做，配平方：

$$
\frac12 m\omega^2x^2 - q\mathcal Ex = \frac12 m\omega^2\left(x - \frac{q\mathcal E}{m\omega^2}\right)^2 - \frac{q^2\mathcal E^2}{2m\omega^2}.
$$

电场把振心移动，并把每个能级降低 $q^2\mathcal E^2/2m\omega^2$。这里二阶就是精确值，所有更高阶修正都为零。态的修正 [[#eq-state1]] 把 $\lvert n\pm1\rangle$ 混进 $\lvert n\rangle$，一阶来看就是平移后的波函数：小的位移 $d$ 把 $\psi(x)$ 变为 $\psi(x - d) \approx \psi(x) - d\,\psi'(x)$，而 $\psi'$ 正是邻近本征函数的组合。
:::
:::

下一个例子的精确答案是已知的，且不是微扰的多项式，于是我们可以看着级数去逼近它。

::: example 更硬的弹簧 {#ex-stiffer}
谐振子的力常量从 $k = m\omega^2$ 变为 $(1 + \varepsilon)k$，于是 $\hat H' = \frac12\varepsilon m\omega^2\hat x^2$。求第 $n$ 能级的一阶移动，并与精确能量比较。
::: solution
用 $\hat x^2 = (\hbar/2m\omega)(\hat a + \hat a^\dagger)^2 = (\hbar/2m\omega)(\hat a^2 + \hat a^{\dagger 2} + 2\hat a^\dagger\hat a + 1)$。对角元为 $\langle n\vert\hat x^2\vert n\rangle = (\hbar/2m\omega)(2n+1)$，所以由 [[#eq-first]]

$$
E_n^{1} = \frac12\varepsilon m\omega^2\cdot\frac{\hbar}{2m\omega}(2n+1) = \frac{\varepsilon}{2}\left(n + \frac12\right)\hbar\omega.
$$

精确地，新的角频率为 $\omega\sqrt{1+\varepsilon}$，所以 $E_n = (n+\frac12)\hbar\omega\sqrt{1+\varepsilon}$。二项式级数 $\sqrt{1+\varepsilon} = 1 + \varepsilon/2 - \varepsilon^2/8 + \cdots$ 重现了一阶项。[[#exr-stiffer2]] 用 [[#eq-second]] 得出 $-\varepsilon^2/8$ 项。二项式级数只在 $\lvert\varepsilon\rvert < 1$ 收敛：$\varepsilon = -1$ 时弹簧消失，根本不存在束缚态。
:::
:::

::: widget plot
f: sqrt(1+x); 1+x/2; 1+x/2-x^2/8
x: -0.95, 2
labels: 精确; 一阶; 二阶
caption: 任一谐振子能级的能量除以其未微扰值，作为力常量的相对改变 $\varepsilon$（横轴）的函数。在 $\varepsilon = 0$ 附近三条曲线无法区分。注意一阶直线处处位于精确曲线之上，这正是 [[#cor-ground]] 与变分原理对基态所要求的；二阶抛物线很好地跟着精确曲线直到 $\varepsilon \approx 0.5$，随后就转向偏离。在 $\varepsilon = -1$ 附近精确曲线陡降到零，任何低阶多项式都跟不上它。
:::

::: warning 未微扰的分母，未微扰的态
[[#eq-first]]–[[#eq-second]] 右端的每个量都是未微扰的：态 $\lvert m^{0}\rangle$，分母里的能量 $E_m^{0}$。常见的错误是往分母里塞进一阶修正后的能量来"改进"公式。那会不一致地混淆级数，得不到二阶能量。另一个错误是忘记求和跑遍完备集：当 $\hat H^{0}$ 有连续谱时要包括连续谱态。对电场中的氢，基态二阶移动大约有五分之一来自连续谱。
:::

## 简并微扰论 {#degenerate}

若 $E_n^{0}$ 简并，[[#eq-state1]] 的分母对同一能级里的其他态为零，上面的推导失效。麻烦不只是技术性的。在简并子空间内，任何标准正交基都是 $\hat H^{0}$ 的本征态基，而微扰会挑出特定的组合。只有这些组合在 $\lambda$ 从零增大时连续地变成 $\hat H$ 的本征态；它们称为**好态**。第一件工作就是把它们找出来。

::: theorem 简并微扰论，一阶 {#thm-degenerate}
设 $E^{0}$ 是 $\hat H^{0}$ 的本征值，其本征空间为 $g$ 维，由标准正交态 $\lvert\psi_1^{0}\rangle, \dots, \lvert\psi_g^{0}\rangle$ 张成，并设 $W$ 是 $g\times g$ 厄米矩阵

$$
W_{ij} = \langle\psi_i^{0}\vert\hat H'\vert\psi_j^{0}\rangle.
$$

从 $E^{0}$ 分裂出的 $g$ 个微扰能级的一阶修正 $E^{1}$ 就是 $W$ 的本征值，零阶（好）态是 $\sum_j c_j\lvert\psi_j^{0}\rangle$，其中 $(c_1, \dots, c_g)$ 是 $W$ 的相应本征向量。
:::

::: proof
设某个微扰本征态在 $\lambda \to 0$ 时趋于本征空间中的某态 $\lvert\chi^{0}\rangle = \sum_j c_j\lvert\psi_j^{0}\rangle$。它必须位于本征空间内，因为在 $\lambda = 0$ 它是 $\hat H^{0}$ 的属于本征值 $E^{0}$ 的本征态。写 $\lvert\chi\rangle = \lvert\chi^{0}\rangle + \lambda\lvert\chi^{1}\rangle + \cdots$ 与 $E = E^{0} + \lambda E^{1} + \cdots$。一阶方程与 [[#eq-orders]] 中形式相同：

$$
(\hat H^{0} - E^{0})\lvert\chi^{1}\rangle = (E^{1} - \hat H')\lvert\chi^{0}\rangle.
$$

用 $\langle\psi_i^{0}\rvert$ 作内积。左端为零，因为 $\langle\psi_i^{0}\rvert(\hat H^{0} - E^{0}) = 0$。右端给出

$$
0 = E^{1}c_i - \sum_j W_{ij}c_j, \qquad i = 1, \dots, g.
$$

于是 $Wc = E^{1}c$：向量 $c$ 是 $W$ 的本征向量，$E^{1}$ 是它的本征值。反过来，$W$ 的每个本征向量在这一阶都给出相容的解。$W$ 厄米，所以它有 $g$ 个实本征值（计入重数）和一组标准正交本征向量。
:::

若 $W$ 的本征值各不相同，一阶就完全**解除**了简并。若有些本征值重合，相应的组合尚未确定，必须算到二阶或找对称性论证。当基的选取已使 $W$ 对角时计算最简单。对称性通常会告诉你怎样选。

::: lemma 由对称性挑出好态 {#lem-good}
设 $\hat A$ 是与 $\hat H^{0}$ 和 $\hat H'$ 都对易的厄米算符。若简并本征空间的基态 $\lvert\psi_i^{0}\rangle$ 是 $\hat A$ 的本征态，本征值为 $a_i$，则只要 $a_i \ne a_j$ 就有 $W_{ij} = 0$。特别地，若 $a_i$ 两两不同，$W$ 已对角，$\lvert\psi_i^{0}\rangle$ 就是好态，且 $E^{1}_i = \langle\psi_i^{0}\vert\hat H'\vert\psi_i^{0}\rangle$。
:::

::: proof
由 $[\hat A, \hat H'] = 0$，

$$
0 = \langle\psi_i^{0}\vert[\hat A, \hat H']\vert\psi_j^{0}\rangle = (a_i - a_j)\langle\psi_i^{0}\vert\hat H'\vert\psi_j^{0}\rangle = (a_i - a_j)W_{ij},
$$

其中用了 $\hat A$ 的厄米性把作用移到左边。若 $a_i \ne a_j$，则 $W_{ij} = 0$。
:::

处理氢原子时我们就用这个引理。第 $n$ 能级的简并度为 $2n^2$（计入自旋），我们选取使微扰对角的量子数：对绕 $z$ 转动对称的微扰取 $m$，对与 $\hat{\mathbf J}$ 对易的微扰取 $j$ 与 $m_j$。

::: example 氢的线性斯塔克效应 {#ex-stark}
氢原子放在沿 $z$ 的均匀电场 $\mathcal E$ 中。电子电荷为 $-e$，所以在电势 $\phi = -\mathcal Ez$ 中它的势能为 $\hat H' = e\mathcal E\hat z$。忽略自旋与精细结构，求 $n = 2$ 能级的一阶分裂，并对 $\mathcal E = 1.00\times10^{7}\,\mathrm{V/m}$ 算出数值。
::: solution
基态非简并且宇称为偶，所以 $E_1^{1} = e\mathcal E\langle 100\vert z\vert100\rangle = 0$：基态没有线性斯塔克效应。

$n = 2$ 能级有四个态 $\lvert 200\rangle, \lvert 211\rangle, \lvert 210\rangle, \lvert 21,-1\rangle$（记号为 $\lvert nlm\rangle$）。两条选择定则把 $4\times4$ 矩阵 $W$ 削减。第一，$\hat z$ 与 $\hat L_z$ 对易，由 [[#lem-good]]，$m$ 不同的态不相连。第二，$z$ 在宇称下是奇的，而态 $\lvert nlm\rangle$ 的宇称为 $(-1)^l$，所以对角元为零，$l$ 相同的两态之间的矩阵元也为零。唯一非零的元是 $\langle200\vert\hat H'\vert210\rangle$ 及其共轭。

取 $R_{20} = (2a^3)^{-1/2}(1 - r/2a)e^{-r/2a}$，$R_{21} = (24a^3)^{-1/2}(r/a)e^{-r/2a}$，$Y_0^0 = (4\pi)^{-1/2}$ 与 $Y_1^0 = (3/4\pi)^{1/2}\cos\theta$，其中 $a$ 是玻尔半径，

$$
\langle200\vert z\vert210\rangle = \int_0^\infty R_{20}R_{21}\,r^3\,\dd r\int Y_0^{0}\cos\theta\,Y_1^{0}\,\dd\Omega.
$$

角向积分为 $\frac{\sqrt3}{4\pi}\int\cos^2\theta\,\dd\Omega = \frac{\sqrt3}{4\pi}\cdot\frac{4\pi}{3} = \frac{1}{\sqrt3}$。取 $\rho = r/a$，径向积分为

$$
\frac{a}{\sqrt{48}}\int_0^\infty\left(1 - \frac{\rho}{2}\right)\rho^4e^{-\rho}\,\dd\rho = \frac{a}{\sqrt{48}}\left(4! - \frac{5!}{2}\right) = \frac{a(24 - 60)}{\sqrt{48}} = -\frac{36a}{\sqrt{48}}.
$$

乘积为 $-36a/\sqrt{144} = -3a$。在 $\lvert200\rangle, \lvert210\rangle$ 张成的子空间中，

$$
W = \begin{pmatrix} 0 & -3e\mathcal Ea \\ -3e\mathcal Ea & 0\end{pmatrix},
$$

本征值为 $\pm3e\mathcal Ea$，好态为 $(\lvert200\rangle \mp \lvert210\rangle)/\sqrt2$。态 $\lvert21,\pm1\rangle$ 不移动。于是 $n = 2$ 能级劈成三条：$+3e\mathcal Ea$，$0$（两条），$-3e\mathcal Ea$。数值上，

$$
3e\mathcal Ea = 3\times(5.29\times10^{-11}\,\mathrm m)\times(1.00\times10^{7}\,\mathrm{V/m})\times e = 1.59\times10^{-3}\,\mathrm{eV}.
$$

好态不是宇称本征态。每个都有大小为 $3ea$、沿场或逆场的固有电偶极矩。只有简并能级才可以有这种矩：非简并态有确定宇称，其中奇算符的期望值为零。
:::
:::

分裂对场是线性的，因为简并的 $2s$ 与 $2p$ 态可以零能量代价地混合。在任何非氢的真实原子里，同一 $n$ 的 $s$ 与 $p$ 能级不简并，一阶移动为零，斯塔克效应对 $\mathcal E$ 是二次的，来自 [[#eq-second]]。即使在氢中，这一结果也要求 $3e\mathcal Ea$ 远大于下一节精细结构的分裂 $\sim 5\times10^{-5}\,\mathrm{eV}$；上面的电场以三十倍的裕度满足该条件。

::: quiz
微扰 $\hat H'$ 在宇称下为偶。关于氢的 $n = 2$ 能级（忽略自旋），哪个陈述正确？
- [ ] 它像线性斯塔克效应那样把 $2s$ 与 $2p_0$ 劈成 $\pm$ 一个共同的值。
- [x] 它不能把 $2s$ 连向任何 $2p$ 态，所以 $2s$ 与 $2p$ 可以分开处理。
- [ ] 它给 $2s$ 的一阶移动必定为零。
- [ ] 它给基态的二阶移动必定为零。
::: solution
偶算符在宇称相反的两态之间的矩阵元为零，而 $2s$（偶）与 $2p$（奇）宇称相反，所以 $W$ 是分块对角的。没有任何东西迫使对角元 $\langle 200\vert\hat H'\vert200\rangle$ 为零：偶算符可以有非零期望值。除非 $\hat H'$ 不把基态连向任何态，基态的二阶移动为负，见 [[#cor-ground]]。
:::
:::

## 氢的精细结构 {#fine-structure}

[[quantum-1/hydrogen]] 的库仑哈密顿量漏掉了两个同等大小的效应，其相对量级都是 $\alpha^2$，其中 $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$ 是**精细结构常数**。把玻尔能量记作 $E_n = -13.6\,\mathrm{eV}/n^2$，我们将用到氢本征态中的三个期望值，它们要么在氢原子一章算过，要么可由费曼–赫尔曼（Feynman–Hellmann）定理求出（[[#exr-fh]] 推导出其中一个）：

$$
\left\langle\frac1r\right\rangle = \frac{1}{n^2a}, \qquad \left\langle\frac{1}{r^2}\right\rangle = \frac{1}{(l+\frac12)n^3a^2}, \qquad \left\langle\frac{1}{r^3}\right\rangle = \frac{1}{l(l+\frac12)(l+1)n^3a^3}\quad (l \ge 1).
$$ {#eq-radial-averages}

### 相对论修正

把相对论性动能 $\sqrt{p^2c^2 + m^2c^4} - mc^2$ 按 $p/mc$ 展开得

$$
T = \frac{p^2}{2m} - \frac{p^4}{8m^3c^2} + \cdots, \qquad \hat H'_{\mathrm r} = -\frac{\hat p^4}{8m^3c^2}.
$$

第 $n$ 能级简并，但 $\hat H'_{\mathrm r}$ 转动不变：它与 $\hat L^2$ 和 $\hat L_z$（以及自旋）对易，所以由 [[#lem-good]]，态 $\lvert nlm\rangle$ 是好态，可以直接用 [[#eq-first]]。写 $\hat p^2 = 2m(\hat H^{0} - V)$，则

$$
E_{\mathrm r}^{1} = -\frac{1}{8m^3c^2}\langle\hat p^2\hat p^2\rangle = -\frac{1}{2mc^2}\left\langle(E_n - V)^2\right\rangle = -\frac{1}{2mc^2}\left[E_n^2 - 2E_n\langle V\rangle + \langle V^2\rangle\right],
$$

其中用了 $\hat p^2$ 的厄米性把一个因子作用到左边。取 $V = -e^2/4\pi\varepsilon_0r$，用平均值 [[#eq-radial-averages]] 与 $E_n = -e^2/(8\pi\varepsilon_0an^2)$，几行代数给出

$$
E_{\mathrm r}^{1} = -\frac{E_n^2}{2mc^2}\left[\frac{4n}{l + \frac12} - 3\right].
$$ {#eq-rel}

修正是负的（相对论性动能比 $p^2/2m$ 增长得慢），对小 $l$ 最大：这些轨道最接近核，运动最快。

### 自旋–轨道耦合

在电子的静止系中质子绕它转动，产生磁场 $\mathbf B \propto \mathbf L$。电子的磁矩 $-(g_s\mu_B/\hbar)\mathbf S$（$g_s \approx 2$）在该场中的能量为 $-\boldsymbol\mu\cdot\mathbf B$。正确变换回实验室系会引入一个运动学因子 $\frac12$，即**托马斯（Thomas）进动**，结果是

$$
\hat H'_{\mathrm{so}} = \frac{e^2}{8\pi\varepsilon_0}\frac{1}{m^2c^2r^3}\,\hat{\mathbf S}\cdot\hat{\mathbf L}.
$$

同一项（因子 $\frac12$ 在内）从狄拉克方程中自然而然地出来，不必换参考系。现在 $\hat{\mathbf S}\cdot\hat{\mathbf L}$ 不与 $\hat L_z$ 或 $\hat S_z$ 对易，所以态 $\lvert nlm_lm_s\rangle$ *不是*好态。它与 $\hat L^2$、$\hat S^2$、$\hat J^2$ 与 $\hat J_z$ 对易，其中 $\hat{\mathbf J} = \hat{\mathbf L} + \hat{\mathbf S}$，因为

$$
\hat{\mathbf S}\cdot\hat{\mathbf L} = \frac12\left(\hat J^2 - \hat L^2 - \hat S^2\right).
$$

所以好态是 [[quantum-1/angular-momentum]] 的耦合态 $\lvert n\,l\,j\,m_j\rangle$，$j = l\pm\frac12$。在其中 $\hat{\mathbf S}\cdot\hat{\mathbf L}$ 取值 $\frac{\hbar^2}2[j(j+1) - l(l+1) - \frac34]$，再用 [[#eq-radial-averages]] 的 $\langle r^{-3}\rangle$，

$$
E_{\mathrm{so}}^{1} = \frac{E_n^2}{mc^2}\cdot\frac{n\left[j(j+1) - l(l+1) - \frac34\right]}{l(l+\frac12)(l+1)} \qquad (l \ge 1).
$$

相对论修正在耦合基下也是对角的，因为它对每个 $l$、不论各 $m$ 如何都是对角的，所以两个修正可以逐能级相加。

::: theorem 氢的精细结构 {#thm-fine}
对 $\hat H'_{\mathrm r} + \hat H'_{\mathrm{so}}$（连同 $l = 0$ 的达尔文项）取一阶，氢的量子数为 $n, j$ 的能级能量为

$$
E_{nj} = E_n + \frac{E_n^2}{2mc^2}\left(3 - \frac{4n}{j + \frac12}\right) = -\frac{13.6\,\mathrm{eV}}{n^2}\left[1 + \frac{\alpha^2}{n^2}\left(\frac{n}{j + \frac12} - \frac34\right)\right].
$$ {#eq-fine}

它依赖 $j$ 而不依赖 $l$：例如 $2s_{1/2}$ 与 $2p_{1/2}$ 保持简并。
:::

::: proof
对 $l \ge 1$，在自旋–轨道公式中代入 $j = l + \frac12$。此时 $j(j+1) - l(l+1) - \frac34 = l$，且 $E_{\mathrm{so}}^{1} = (E_n^2/mc^2)\,n/((l+\frac12)(l+1))$。与 [[#eq-rel]] 相加，并把一切用 $j + \frac12 = l + 1$ 写出，

$$
\frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+\frac12} + \frac{2n}{(l+\frac12)(l+1)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n(l+1) - 2n}{(l+\frac12)(l+1)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+1}\right].
$$

对 $j = l - \frac12$，方括号为 $j(j+1) - l(l+1) - \frac34 = -(l+1)$，所以 $E_{\mathrm{so}}^{1} = -(E_n^2/mc^2)\,n/(l(l+\frac12))$，于是

$$
\frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l+\frac12} - \frac{2n}{l(l+\frac12)}\right] = \frac{E_n^2}{2mc^2}\left[3 - \frac{4n}{l}\right],
$$

其中 $j + \frac12 = l$。两种情形都给出 [[#eq-fine]]。$l = 0$ 时没有自旋–轨道项，但狄拉克方程给出一个额外的接触项**达尔文（Darwin）项**，它的期望值只对 $s$ 态非零，等于 $2nE_n^2/mc^2$；把它加到取 $l = 0$ 的 [[#eq-rel]] 上得 $\frac{E_n^2}{2mc^2}(3 - 8n)$，正是 [[#eq-fine]] 取 $j = \frac12$。第二个形式由 $E_n^2/(2mc^2) = \frac{13.6\,\mathrm{eV}}{n^2}\cdot\frac{\alpha^2}{4n^2}$ 得出，因为 $13.6\,\mathrm{eV} = \frac12\alpha^2mc^2$。
:::

精确求解狄拉克方程得到的公式，展开到 $\alpha^2$ 阶就是 [[#eq-fine]]；微扰论没有解相对论波方程就重现了领先的相对论物理。

::: example $n = 2$ 能级的精细结构 {#ex-fine-n2}
计算 $2s_{1/2}$、$2p_{1/2}$ 与 $2p_{3/2}$ 的精细结构移动，以及 $2p_{3/2}$ 与 $2p_{1/2}$ 之间分裂的能量值与频率值。取 $E_2 = -3.4014\,\mathrm{eV}$，$mc^2 = 0.51100\,\mathrm{MeV}$。
::: solution

公因子为

$$
\frac{E_2^2}{2mc^2} = \frac{(3.4014\,\mathrm{eV})^2}{2\times0.51100\times10^{6}\,\mathrm{eV}} = 1.1321\times10^{-5}\,\mathrm{eV}.
$$

$j = \frac12$ 时 [[#eq-fine]] 的方括号为 $3 - 8/1 = -5$，所以 $2s_{1/2}$ 与 $2p_{1/2}$ 都下移 $5.660\times10^{-5}\,\mathrm{eV}$。$j = \frac32$ 时方括号为 $3 - 8/2 = -1$，$2p_{3/2}$ 下移 $1.132\times10^{-5}\,\mathrm{eV}$。分裂为

$$
\Delta E = 4\times1.1321\times10^{-5}\,\mathrm{eV} = 4.528\times10^{-5}\,\mathrm{eV}, \qquad \nu = \frac{\Delta E}{h} = \frac{4.528\times10^{-5}\times1.6022\times10^{-19}\,\mathrm J}{6.6261\times10^{-34}\,\mathrm{J\,s}} = 10.95\,\mathrm{GHz}.
$$

实测值为 $10.97\,\mathrm{GHz}$，微小的差异来自约化质量与量子电动力学。整个 $n = 2$ 能级移动约为其结合能的 $10^{-5}$，这正是量级 $\alpha^2 \approx 5.3\times10^{-5}$ 所预言的。
:::
:::

::: remark 兰姆位移
1947 年，威利斯·兰姆（Willis Lamb）与罗伯特·雷瑟福德（Robert Retherford）发现 $2s_{1/2}$ 位于 $2p_{1/2}$ *之上*约 $1.06\,\mathrm{GHz}$，与 [[#thm-fine]] 关于 $l$ 无关的结论矛盾。这一移动来自电子与量子化电磁场的相互作用（真空涨落），解释它是量子电动力学的第一个胜利。它约为精细结构分裂的十分之一。更小的还有质子磁矩引起的**超精细**结构，它把基态劈开 $1.42\,\mathrm{GHz}$，就是射电天文学中的 21 厘米线。
:::

### 塞曼效应

在磁场 $\mathbf B = B\hat{\mathbf z}$ 中，轨道与自旋磁矩附加微扰

$$
\hat H'_{\mathrm Z} = \frac{\mu_B}{\hbar}\left(\hat L_z + 2\hat S_z\right)B, \qquad \mu_B = \frac{e\hbar}{2m} = 5.788\times10^{-5}\,\mathrm{eV/T},
$$

取 $g_s = 2$。怎么做取决于 $\mu_BB$ 与精细结构分裂相比的大小。

**弱场**（$\mu_BB$ 远小于精细结构）。精细结构定下好态 $\lvert nljm_j\rangle$，我们需要 $\hat L_z + 2\hat S_z = \hat J_z + \hat S_z$ 在每个多重态中的期望值。**投影定理**（它是维格纳–埃卡特定理（Wigner–Eckart）的特例，见 Sakurai & Napolitano §3.11）说：在固定 $j$ 的多重态内，任意矢量算符 $\hat{\mathbf V}$ 的矩阵元与 $\hat{\mathbf J}$ 的成正比：$\langle\hat{\mathbf V}\rangle = \langle\hat{\mathbf V}\cdot\hat{\mathbf J}\rangle\langle\hat{\mathbf J}\rangle/\hbar^2j(j+1)$。把它用于 $\hat{\mathbf S}$，配合 $\hat{\mathbf S}\cdot\hat{\mathbf J} = \frac12(\hat J^2 + \hat S^2 - \hat L^2)$，得

$$
E_{\mathrm Z}^{1} = g_J\,\mu_B B\,m_j, \qquad g_J = 1 + \frac{j(j+1) - l(l+1) + \frac34}{2j(j+1)}.
$$ {#eq-lande}

$g_J$ 称为**朗德（Landé）$g$ 因子**。每个精细结构能级分裂成 $2j+1$ 个等间隔的支能级。

**强场**（$\mu_BB$ 远大于精细结构），即**帕申–巴克**（Paschen–Back）区。这时 $\hat H'_{\mathrm Z}$ 占主导，它在 $\lvert nlm_lm_s\rangle$ 下对角：$E = E_n + \mu_BB(m_l + 2m_s)$，精细结构只是叠在其上的较小修正。

::: intuition 为什么 g_J 既不是 1 也不是 2
自旋与轨道磁矩的旋磁比不同，所以总磁矩不平行于 $\mathbf J$。自旋–轨道耦合使 $\mathbf L$ 与 $\mathbf S$ 绕 $\mathbf J$ 快速进动；弱外场只看到时间平均的磁矩，即它沿 $\mathbf J$ 的投影。该投影中自旋所占的权重使 $g_J$ 落在 $1$（纯轨道）与 $2$（纯自旋）之间：$s_{1/2}$ 为 $2$，$p_{1/2}$ 为 $\frac23$，$p_{3/2}$ 为 $\frac43$。
:::

::: example 一特斯拉场中的基态 {#ex-zeeman}
求氢的基态在 $B = 1.00\,\mathrm T$ 中的塞曼分裂，并判断 $1\,\mathrm T$ 对 $n = 2$ 能级算弱场还是强场。
::: solution
基态是 $1s_{1/2}$：$l = 0$，$j = \frac12$。由 [[#eq-lande]] 得 $g_J = 1 + (\frac34 + \frac34)/(2\cdot\frac34) = 2$，而 $m_j = \pm\frac12$，所以

$$
E_{\mathrm Z}^{1} = \pm\mu_BB = \pm5.79\times10^{-5}\,\mathrm{eV},
$$

分裂为 $1.16\times10^{-4}\,\mathrm{eV}$，即 $28.0\,\mathrm{GHz}$。对 $n = 2$，精细结构分裂由 [[#ex-fine-n2]] 为 $4.53\times10^{-5}\,\mathrm{eV}$，与 $\mu_BB = 5.79\times10^{-5}\,\mathrm{eV}$ 相当。一特斯拉对 $n = 2$ 既不算弱场也不算强场：那是中间区，需要把 $\hat H'_{\mathrm{so}} + \hat H'_{\mathrm r} + \hat H'_{\mathrm Z}$ 一起在八维的 $n = 2$ 子空间中对角化。远低于 $0.1\,\mathrm T$ 的场是弱场，几个特斯拉的场开始算强场。
:::
:::

## 变分法 {#variational}

微扰论需要一个与 $\hat H$ 接近且可解的 $\hat H^{0}$。常常没有这样的 $\hat H^{0}$。变分法只要求一个猜测。

::: theorem 变分原理 {#thm-variational}
设 $\hat H$ 的基态能量为 $E_{\mathrm{gs}}$。对 $\hat H$ 定义域内每个可归一化态 $\lvert\psi\rangle \ne 0$，

$$
\langle H\rangle_\psi = \frac{\langle\psi\vert\hat H\vert\psi\rangle}{\langle\psi\vert\psi\rangle} \ge E_{\mathrm{gs}},
$$ {#eq-variational}

等号成立当且仅当 $\lvert\psi\rangle$ 是基态。
:::

::: proof
把 $\lvert\psi\rangle = \sum_k c_k\lvert k\rangle$ 按 $\hat H$ 的标准正交本征态展开，$\hat H\lvert k\rangle = E_k\lvert k\rangle$，其中 $E_k \ge E_{\mathrm{gs}}$（若 $\hat H$ 还有连续谱，求和还包括积分，论证不变）。则

$$
\langle\psi\vert\hat H\vert\psi\rangle - E_{\mathrm{gs}}\langle\psi\vert\psi\rangle = \sum_k\lvert c_k\rvert^2(E_k - E_{\mathrm{gs}}) \ge 0,
$$

因为每一项都非负。取等要求只要 $E_k > E_{\mathrm{gs}}$ 就有 $c_k = 0$，即 $\lvert\psi\rangle$ 位于基态本征空间内。
:::

实践中选取一族依赖参数 $\beta$ 的试探态 $\lvert\psi(\beta)\rangle$，算出 $\langle H\rangle(\beta)$，再求最小。最小值就是这一族态能给出的最好上界。态上量级为 $\epsilon$ 的误差只造成能量上量级为 $\epsilon^2$ 的误差（[[#exr-quadratic]]），所以平庸的波函数也能给出好的能量。

::: example 氢的高斯试探态 {#ex-gauss}
用试探波函数 $\psi = e^{-br^2}$，$b > 0$，给氢的基态能量一个上界。
::: solution
代数上用原子单位：$\hbar = m = e^2/4\pi\varepsilon_0 = 1$，长度以玻尔半径计，能量以哈特里（hartree）计（$1\,E_{\mathrm h} = 27.211\,\mathrm{eV}$）。需要用的积分都是高斯型：

$$
\langle\psi\vert\psi\rangle = 4\pi\int_0^\infty r^2e^{-2br^2}\,\dd r = \left(\frac{\pi}{2b}\right)^{3/2}.
$$

动能用 $\langle T\rangle = \frac12\int\lvert\nabla\psi\rvert^2\,\dd^3r/\langle\psi\vert\psi\rangle$，其中 $\lvert\nabla\psi\rvert^2 = 4b^2r^2e^{-2br^2}$：

$$
\langle T\rangle = \frac{2b^2\cdot4\pi\int_0^\infty r^4e^{-2br^2}\,\dd r}{(\pi/2b)^{3/2}} = \frac{3b}{2}.
$$

势能用 $\int_0^\infty re^{-2br^2}\,\dd r = 1/4b$，得

$$
\langle V\rangle = -\frac{4\pi/4b}{(\pi/2b)^{3/2}} = -2\sqrt{\frac{2b}{\pi}}.
$$

最小化 $\langle H\rangle(b) = \frac32b - 2\sqrt{2b/\pi}$：令导数 $\frac32 - \sqrt{2/\pi b}$ 为零得 $b = 8/9\pi$，于是

$$
\langle H\rangle_{\min} = \frac32\cdot\frac{8}{9\pi} - 2\sqrt{\frac{16}{9\pi^2}} = \frac{4}{3\pi} - \frac{8}{3\pi} = -\frac{4}{3\pi}\,E_{\mathrm h} = -\frac{8}{3\pi}\times13.606\,\mathrm{eV} = -11.55\,\mathrm{eV}.
$$

上界高于真实的 $-13.61\,\mathrm{eV}$，高出百分之十五，这正是它必须做到的。高斯函数在核处（没有尖点）和大 $r$ 处（衰减太快）形状都不对。尽管如此，量子化学仍用高斯函数的和来构作波函数，因为它的积分好算。
:::
:::

### 氦的基态

氦有两个电子和一个电荷 $Z = 2$ 的核。忽略核的运动，

$$
\hat H = -\frac{\hbar^2}{2m}\left(\nabla_1^2 + \nabla_2^2\right) - \frac{Ze^2}{4\pi\varepsilon_0}\left(\frac{1}{r_1} + \frac{1}{r_2}\right) + \frac{e^2}{4\pi\varepsilon_0}\frac{1}{\lvert\mathbf r_1 - \mathbf r_2\rvert}.
$$

实验的基态能量为 $-79.005\,\mathrm{eV}$，它是两级电离能 $24.587\,\mathrm{eV}$ 与 $54.418\,\mathrm{eV}$ 之和取负。若没有排斥，每个电子都将处于电荷数为 $Z$ 的类氢 $1s$ 轨道，能量为 $-Z^2\times13.6\,\mathrm{eV}$，给出 $-8\times13.6 = -108.8\,\mathrm{eV}$：低得太多。把排斥按一阶处理，要在乘积态中加上 $\langle1/r_{12}\rangle$，这是一个六维积分，其值为（Griffiths & Schroeter §8.2；Bransden & Joachain 第 7 章）

$$
\left\langle\frac{e^2}{4\pi\varepsilon_0r_{12}}\right\rangle = \frac58\,Z\,E_{\mathrm h}
$$ {#eq-repulsion}

即两个电子处于核电荷 $Z$ 的 $1s$ 轨道。对 $Z = 2$ 它是 $\frac54E_{\mathrm h} = 34.0\,\mathrm{eV}$，一阶微扰论给出 $-108.8 + 34.0 = -74.8\,\mathrm{eV}$。这是一个上界，因为它是在归一化态中 $\hat H$ 的期望值，但差了 $4.2\,\mathrm{eV}$。排斥与能级间距相比并不小，而且一阶态忽略了每个电子部分遮挡核、使另一个电子看到的核电荷被屏蔽这一事实。

::: example 氦的变分估计 {#ex-helium}
取试探态为两个带可调电荷 $Z_e$ 的类氢 $1s$ 轨道之积，$\psi = (Z_e^3/\pi a^3)\,e^{-Z_e(r_1 + r_2)/a}$。求最优的 $Z_e$ 与相应的上界。
::: solution
再用哈特里。技巧是把真实哈密顿量写成以 $\psi$ 为精确本征态的一部分加上余项：

$$
\hat H = \left[-\tfrac12\nabla_1^2 - \frac{Z_e}{r_1} - \tfrac12\nabla_2^2 - \frac{Z_e}{r_2}\right] + (Z_e - Z)\left(\frac{1}{r_1} + \frac{1}{r_2}\right) + \frac{1}{r_{12}}.
$$

方括号以 $\psi$ 为本征态，本征值为 $2\times(-\frac12Z_e^2) = -Z_e^2$。在电荷为 $Z_e$ 的类氢 $1s$ 轨道中，$\langle1/r\rangle = Z_e$（由 [[#eq-radial-averages]] 取 $n = 1$ 并把 $a \to a/Z_e$），再把 [[#eq-repulsion]] 中的 $Z \to Z_e$ 得 $\langle1/r_{12}\rangle = \frac58Z_e$。于是

$$
\langle H\rangle(Z_e) = -Z_e^2 + 2(Z_e - Z)Z_e + \frac58Z_e = Z_e^2 - 2ZZ_e + \frac58Z_e.
$$

导数 $2Z_e - 2Z + \frac58$ 在

$$
Z_e = Z - \frac{5}{16} = \frac{27}{16} = 1.6875
$$

处为零，最小值为 $-Z_e^2 = -(27/16)^2E_{\mathrm h} = -2.8477\,E_{\mathrm h}$。换成电子伏特，

$$
\langle H\rangle_{\min} = -2.8477\times27.211\,\mathrm{eV} = -77.49\,\mathrm{eV} \approx -77.5\,\mathrm{eV}.
$$

实验值为 $-79.0\,\mathrm{eV}$，所以单参数上界与实验相差在 $1.5\,\mathrm{eV}$ 以内，即 $1.9\%$。最优的 $Z_e < 2$ 有直接的物理读法：每个电子看到的核电荷被另一个电子部分**屏蔽**了 $\frac{5}{16}$ 个电子电荷。
:::
:::

::: widget plot
f: x^2 - 2*Z*x + (5/8)*x
x: 0.5, 5
sliders: Z=2:1:5:1
caption: 变分能量 $\langle H\rangle(Z_e) = Z_e^2 - 2ZZ_e + \frac58Z_e$（以哈特里计）对横轴上的试探电荷 $Z_e$ 作图。从 $Z = 2$（氦）开始：最小值在 $Z_e = 1.6875$，值为 $-2.848$，略高于精确的 $-2.903$。把滑块移到 $Z = 3$（$\mathrm{Li}^+$）及更高：最小值总在 $Z - \frac{5}{16}$，所以屏蔽对每个两电子离子都是同样几个电子电荷，且相对 $Z$ 越来越不重要。
:::

许勒拉斯（Hylleraas）在 1929 年把电子间距 $r_{12}$ 加进试探函数，只用少数几个参数就达到了约 $0.01\,\mathrm{eV}$ 的精度。现代的变分计算与实验符合到 $10^{9}$ 分之一以内，如此量级的差异是在检验量子电动力学。氦原子在 [[quantum-2/atomic-structure]] 中还要再处理，那里 [[quantum-2/identical-particles]] 的泡利原理决定两个电子可以占据哪些态。

::: warning 上界只属于基态
变分原理给基态定界。它给激发态定界，只有当试探函数精确正交于每一个更低的态时才成立，而这通常靠对称性安排：例如取 $l = 1$ 的试探函数给最低的 $l = 1$ 能级定界。对一个没有正交化过的试探函数，$\langle H\rangle$ 很低并不能说明第一激发态的任何事情。好的变分能量也不保证波函数对其他观测量给出好的结果：$\langle H\rangle$ 的误差是态误差的二阶，而比如说 $\langle r^2\rangle$ 的误差是一阶。
:::

::: quiz
对氦，一阶微扰论给出 $-74.8\,\mathrm{eV}$，屏蔽变分计算给出 $-77.5\,\mathrm{eV}$，实验给出 $-79.0\,\mathrm{eV}$。哪个陈述正确？
- [ ] 一阶微扰论给出的能量可以在真实基态能量之上或之下，所以 $-74.8$ 可能是低估。
- [x] $-74.8$ 与 $-77.5\,\mathrm{eV}$ 都是 $\hat H$ 在归一化态中的期望值，所以两者都是上界，较低的那个是更好的估计。
- [ ] 取 $Z_e = 2$ 可以改进变分结果。
- [ ] 两参数的试探函数可以给出 $-80\,\mathrm{eV}$。
::: solution
一阶能量 $E^{0} + \langle\hat H'\rangle$ 就是 $\langle\psi^{0}\vert\hat H\vert\psi^{0}\rangle$，是完整哈密顿量的期望值，所以 [[#thm-variational]] 用真实能量给它设了下限。变分族包含 $Z_e = 2$（即一阶计算），而族上的最小值更低。任何试探函数，无论多少参数，都不会低于真实基态能量。
:::
:::

::: history 从瑞利到许勒拉斯
瑞利勋爵（Lord Rayleigh）在《声学理论》（*The Theory of Sound*，1877）中，针对密度略不均匀的弦，发展了把振动频率按系统的微小改变作幂展开的方法。薛定谔（Schrödinger）在 1926 年关于把量子化视为本征值问题的第三篇论文中把它移植到自己的波方程上，包括简并情形，并应用于氢的斯塔克效应；这个方法称为**瑞利–薛定谔微扰论**。线性斯塔克效应由约翰内斯·斯塔克（Johannes Stark）于 1913 年观测到，塞曼效应由彼得·塞曼（Pieter Zeeman）于 1896 年发现。索末菲（Sommerfeld）1916 年的相对论性玻尔模型碰巧给出了正确的精细结构公式；狄拉克 1928 年的方程以正确的理由给出了它，而兰姆与雷瑟福德 1947 年的测量指出了它在何处失效。瓦尔特·里兹（Walther Ritz）在 1908–1909 年把瑞利的能量论证变成实用方法，所以变分计算也叫瑞利–里兹方法。格奥尔格·克尔纳（Georg Kellner，1927）找到屏蔽电荷 $27/16$，随后埃吉尔·许勒拉斯（Egil Hylleraas，1929）把它用于氦；许勒拉斯达到的精度使物理学家相信量子力学对多电子原子是有效的。
:::

## 后续内容 {#leads}

[[quantum-2/time-dependent]] 把方法推广到忽开忽关或振荡的微扰，原子吸收与发射光正是这样；其核心结果费米黄金定则包含同样的矩阵元 $H'_{mn}$。[[quantum-2/identical-particles]] 用一阶简并微扰论解释氦的三重态为何低于单态。[[quantum-2/atomic-structure]] 把氦计算中的屏蔽思想与泡利原理结合，建立元素周期表，并用这里的精细结构结果解释较重原子的谱项符号与自旋–轨道分裂。在 [[condensed-matter/band-structure]] 中，布里渊区边界处的简并微扰论打开近自由电子模型的带隙。

::: summary
- 写 $\hat H = \hat H^{0} + \lambda\hat H'$ 并按 $\lambda$ 展开。非简并能级：$E_n^{1} = \langle n^{0}\vert\hat H'\vert n^{0}\rangle$，$E_n^{2} = \sum_{m\ne n}\lvert H'_{mn}\rvert^2/(E_n^{0} - E_m^{0})$，其中始终用未微扰的态与能量。
- 展开参数是矩阵元除以能量差。二级把基态压低，并使能级相互排斥。
- 在简并能级中，把 $\hat H'$ 的矩阵在简并子空间内对角化。与 $\hat H^{0}$ 和 $\hat H'$ 都对易、且在该子空间内本征值两两不同的算符，标记了好态。
- 氢的精细结构（相对论、自旋–轨道与达尔文项）给出 $E_{nj} = E_n[1 + (\alpha^2/n^2)(n/(j+\frac12) - \frac34)]$：量级为 $\alpha^2 E_n$，只依赖 $j$。$2p_{3/2}$–$2p_{1/2}$ 分裂为 $4.53\times10^{-5}\,\mathrm{eV}$，$10.9\,\mathrm{GHz}$。
- 弱场塞曼移动为 $g_J\mu_BBm_j$，$g_J$ 是朗德因子；强场中移动为 $\mu_BB(m_l + 2m_s)$。
- 氢的 $n = 2$ 能级有线性的斯塔克效应，$0, \pm3e\mathcal Ea$，因为 $2s$ 与 $2p$ 简并；非简并态只有二次效应。
- 变分原理 $\langle H\rangle_\psi \ge E_{\mathrm{gs}}$ 把任何试探态变成上界。屏蔽电荷试探态对氦给出 $-77.5\,\mathrm{eV}$，实验值为 $-79.0\,\mathrm{eV}$。
:::

## 习题 {#exercises}

::: exercise 势阱中的一级台阶 {level=1 check="0.1"}
$0 < x < L$ 上的无限深势阱受到微扰 $\hat H' = V_0$（$0 < x < L/2$），其余区域为零，$V_0 = 0.200\,\mathrm{eV}$。求每个能级的一阶移动（以 eV 计）。
::: solution
未微扰态为 $\psi_n = \sqrt{2/L}\,\sin(n\pi x/L)$，非简并。由 [[#eq-first]]，

$$
E_n^{1} = V_0\frac{2}{L}\int_0^{L/2}\sin^2\frac{n\pi x}{L}\,\dd x = V_0\frac{2}{L}\left[\frac x2 - \frac{L}{4n\pi}\sin\frac{2n\pi x}{L}\right]_0^{L/2} = V_0\frac{2}{L}\cdot\frac L4 = \frac{V_0}{2},
$$

因为 $\sin(n\pi) = 0$。每个能级都上升 $V_0/2 = 0.100\,\mathrm{eV}$。每个概率密度 $\lvert\psi_n\rvert^2$ 都关于阱中心对称，所以粒子有一半时间待在抬高的半阱里。
:::
:::

::: exercise 基态的精细结构 {level=1 check="-181.1"}
用 [[#eq-fine]] 求氢 $1s_{1/2}$ 能级的精细结构移动（以微电子伏计）。里德伯能量取 $13.6057\,\mathrm{eV}$，$mc^2 = 0.510999\,\mathrm{MeV}$。
::: solution
取 $n = 1$，$j = \frac12$，方括号 $3 - 4n/(j+\frac12)$ 为 $3 - 4 = -1$，所以

$$
\Delta E = -\frac{E_1^2}{2mc^2} = -\frac{(13.6057)^2}{2\times0.510999\times10^{6}}\,\mathrm{eV} = -1.811\times10^{-4}\,\mathrm{eV} = -181.1\,\mu\mathrm{eV}.
$$

等价地说就是 $-13.6057\,\mathrm{eV}\times\alpha^2/4$，其中 $\alpha^2 = 5.325\times10^{-5}$。
:::
:::

::: exercise 一个朗德因子 {level=1 check="4/3"}
计算氢 $2p_{3/2}$ 能级的 $g_J$，并说出弱场中它有几个塞曼支能级。
::: solution
$l = 1$，$j = \frac32$：$j(j+1) = \frac{15}{4}$，$l(l+1) = 2$，代入 [[#eq-lande]] 得

$$
g_J = 1 + \frac{\frac{15}{4} - 2 + \frac34}{2\cdot\frac{15}{4}} = 1 + \frac{\frac{5}{2}}{\frac{15}{2}} = \frac43.
$$

支能级有 $2j + 1 = 4$ 个，$m_j = \pm\frac12, \pm\frac32$，移动为 $\frac43\mu_BBm_j$。
:::
:::

::: exercise 更硬弹簧的二级修正 {#exr-stiffer2 level=2 check="-1/8"}
对 [[#ex-stiffer]] 的微扰 $\hat H' = \frac12\varepsilon m\omega^2\hat x^2$，由 [[#eq-second]] 计算 $E_n^{2}$，并给出 $E_n^{2} = c\,\varepsilon^2(n+\frac12)\hbar\omega$ 中的系数 $c$。
::: hint
$\hat x^2$ 的非对角元只把 $\lvert n\rangle$ 连到 $\lvert n\pm2\rangle$。
:::
::: solution
由 $\hat x^2 = (\hbar/2m\omega)(\hat a^2 + \hat a^{\dagger2} + 2\hat a^\dagger\hat a + 1)$，非对角元为

$$
\langle n+2\vert\hat x^2\vert n\rangle = \frac{\hbar}{2m\omega}\sqrt{(n+1)(n+2)}, \qquad \langle n-2\vert\hat x^2\vert n\rangle = \frac{\hbar}{2m\omega}\sqrt{n(n-1)}.
$$

乘以 $\frac12\varepsilon m\omega^2$ 得 $H'_{n\pm2,n} = \frac{\varepsilon\hbar\omega}{4}\sqrt{\cdots}$。分母为 $\mp2\hbar\omega$，所以

$$
E_n^{2} = \frac{\varepsilon^2\hbar^2\omega^2}{16}\left[\frac{n(n-1)}{2\hbar\omega} - \frac{(n+1)(n+2)}{2\hbar\omega}\right] = \frac{\varepsilon^2\hbar\omega}{32}(-4n - 2) = -\frac{\varepsilon^2}{8}\left(n + \frac12\right)\hbar\omega.
$$

于是 $c = -\frac18$，正是 $\sqrt{1+\varepsilon} = 1 + \frac{\varepsilon}{2} - \frac{\varepsilon^2}{8} + \cdots$ 的第二个修正项。
:::
:::

::: exercise 实验室电场中的斯塔克分裂 {level=2 check="0.635"}
处于 $n = 2$ 能级的氢原子放进电场 $\mathcal E = 2.00\times10^{6}\,\mathrm{V/m}$。用 [[#ex-stark]] 求最高与最低斯塔克成分之间的能量差（以 meV 计）。取 $a = 5.29177\times10^{-11}\,\mathrm m$。
::: solution
成分位于 $+3e\mathcal Ea$，$0$，$0$，$-3e\mathcal Ea$，所以最外侧间隔为 $6e\mathcal Ea$：

$$
6\times(5.29177\times10^{-11}\,\mathrm m)\times(2.00\times10^{6}\,\mathrm{V/m})\times e = 6.350\times10^{-4}\,\mathrm{eV} = 0.635\,\mathrm{meV}.
$$

这是精细结构分裂 $0.0453\,\mathrm{meV}$ 的十四倍，所以忽略精细结构是合理的。
:::
:::

::: exercise 两个耦合的简并态 {level=2}
二能级体系有 $\hat H^{0} = E_0\mathbb 1$（完全简并）与 $\hat H' = \begin{pmatrix}\delta & V\\ V & -\delta\end{pmatrix}$，$\delta, V$ 为实数。求精确能量，并证明简并一阶微扰论精确给出它们。再设 $\hat H^{0} = \operatorname{diag}(E_0 + \Delta, E_0 - \Delta)$，$\lvert\Delta\rvert \gg \lvert V\rvert$ 且 $\delta = 0$，证明非简并二阶微扰论重现精确结果的展开。
::: solution
第一种情形 $\hat H = E_0\mathbb 1 + \hat H'$，$\hat H'$ 的本征值是 $\lambda^2 - \delta^2 - V^2 = 0$ 的根，所以 $E = E_0\pm\sqrt{\delta^2 + V^2}$。简并微扰论说一阶移动就是 $W = \hat H'$ 本身的本征值（整个空间就是简并子空间），那是同一个计算。因为 $\hat H'$ 与 $\hat H^{0} \propto \mathbb 1$ 对易，更高阶都消失。

第二种情形精确能量为 $E_0\pm\sqrt{\Delta^2 + V^2}$。$\lvert\Delta\rvert \gg \lvert V\rvert$ 时，$\sqrt{\Delta^2 + V^2} = \lvert\Delta\rvert\sqrt{1 + V^2/\Delta^2} \approx \lvert\Delta\rvert + V^2/2\lvert\Delta\rvert$。取 $\Delta > 0$。微扰论：$\hat H'$ 的对角元为零，所以 $E^{1} = 0$。对上级，$E^{2} = V^2/((E_0+\Delta) - (E_0 - \Delta)) = V^2/2\Delta$；对下级，$-V^2/2\Delta$。与展开吻合：两能级相互排斥，各移动 $V^2/2\Delta$。$\Delta \to 0$ 时二阶结果发散，而精确结果趋于 $\pm V$，这就是简并态必须用对角化处理的原因。
:::
:::

::: exercise 氢与谐振子的高斯试探态 {level=2 check="-11.55"}
(a) 证明把高斯函数 $\psi = e^{-bx^2}$ 作为谐振子 $\hat H = \hat p^2/2m + \frac12m\omega^2x^2$ 的试探函数，在最优点恰好给出 $\frac12\hbar\omega$。(b) 写出 [[#ex-gauss]] 中求得的氢的高斯上界的最小值（以 eV 计，四位有效数字）。
::: solution
(a) 对 $\psi = e^{-bx^2}$，$\langle x^2\rangle = 1/4b$，$\langle p^2\rangle = \hbar^2b$（都是标准高斯积分），所以 $\langle H\rangle = \hbar^2b/2m + m\omega^2/8b$。令导数 $\hbar^2/2m - m\omega^2/8b^2$ 为零得 $b = m\omega/2\hbar$，$\langle H\rangle = \hbar\omega/4 + \hbar\omega/4 = \frac12\hbar\omega$。上界被取满，因为这一族包含精确基态。

(b) 由 [[#ex-gauss]]，$\langle H\rangle_{\min} = -\frac{8}{3\pi}\times13.6057\,\mathrm{eV} = -0.84883\times13.6057\,\mathrm{eV} = -11.55\,\mathrm{eV}$。
:::
:::

::: exercise 二维情形中的简并能级 {level=3 check="32/(9*pi^2)"}
粒子处于二维无限深方势阱 $0 < x, y < L$，未微扰态 $\psi_{n_xn_y} = (2/L)\sin(n_x\pi x/L)\sin(n_y\pi y/L)$。微扰为 $\hat H' = V_0$（$0 < x < L/2$ 且 $0 < y < L/2$），其余为零。求二重简并能级 $(1,2), (2,1)$ 的一阶分裂（以 $V_0$ 的倍数表示）。
::: hint
每个矩阵元都分解为 $(0, L/2)$ 上的 $x$ 积分乘 $y$ 积分。你需要 $\int_0^{\pi/2}\sin u\,\sin2u\,\dd u = \frac23$。
:::
::: solution
记 $I_{nn'} = \frac2L\int_0^{L/2}\sin\frac{n\pi x}{L}\sin\frac{n'\pi x}{L}\,\dd x$。对角积分为 $I_{11} = I_{22} = \frac12$（如第一题）。非对角的取 $u = \pi x/L$：

$$
I_{12} = \frac2\pi\int_0^{\pi/2}\sin u\,\sin2u\,\dd u = \frac2\pi\int_0^{\pi/2}2\sin^2u\cos u\,\dd u = \frac2\pi\cdot\frac23 = \frac{4}{3\pi}.
$$

于是 $W_{aa} = W_{bb} = V_0I_{11}I_{22} = V_0/4$，且

$$
W_{ab} = \langle12\vert\hat H'\vert21\rangle = V_0I_{12}I_{21} = V_0\left(\frac{4}{3\pi}\right)^2 = \frac{16V_0}{9\pi^2}.
$$

$W$ 的本征值为 $V_0\bigl(\frac14\pm\frac{16}{9\pi^2}\bigr)$，所以分裂为 $\frac{32}{9\pi^2}V_0 = 0.360\,V_0$。好态是 $(\psi_{12}\pm\psi_{21})/\sqrt2$：微扰尊重 $x \leftrightarrow y$ 对称性，好态就是它的本征态，正像 [[#lem-good]] 预言的那样。
:::
:::

::: exercise 一阶是上界 {level=3}
证明对任意 $\hat H = \hat H^{0} + \hat H'$，基态能量的一阶估计 $E_0^{0} + E_0^{1}$ 不小于精确基态能量。用 [[#ex-charged-oscillator]] 和氦检验这一陈述。
::: solution
设 $\lvert0^{0}\rangle$ 是 $\hat H^{0}$ 的归一化基态。则

$$
\langle0^{0}\vert\hat H\vert0^{0}\rangle = \langle0^{0}\vert\hat H^{0}\vert0^{0}\rangle + \langle0^{0}\vert\hat H'\vert0^{0}\rangle = E_0^{0} + E_0^{1},
$$

用了 [[#eq-first]]（若能级简并，取 $\lvert0^{0}\rangle$ 为一阶能量最低的好态；恒等式不变）。由 [[#thm-variational]] 这至少是 $E_{\mathrm{gs}}$。对带电谐振子，$E_0^{0} + E_0^{1} = \frac12\hbar\omega$，高于精确的 $\frac12\hbar\omega - q^2\mathcal E^2/2m\omega^2$。对氦，$-74.8\,\mathrm{eV}$ 高于 $-79.0\,\mathrm{eV}$。二阶没有类似结论：$E_0^{0} + E_0^{1} + E_0^{2}$ 可以低于真实能量。
:::
:::

::: exercise 能量的误差是二阶的 {#exr-quadratic level=3}
设 $\lvert\psi\rangle = \lvert0\rangle + \epsilon\lvert\phi\rangle$，其中 $\lvert0\rangle$ 是 $\hat H$ 的归一化基态，$\lvert\phi\rangle$ 归一化且与它正交。证明 $\langle H\rangle_\psi - E_0 = O(\epsilon^2)$，并给出系数。
::: solution
$\langle\psi\vert\psi\rangle = 1 + \lvert\epsilon\rvert^2$。分子中 $\langle0\vert\hat H\vert\phi\rangle = E_0\langle0\vert\phi\rangle = 0$，交叉项消失，于是

$$
\langle H\rangle_\psi = \frac{E_0 + \lvert\epsilon\rvert^2\langle\phi\vert\hat H\vert\phi\rangle}{1 + \lvert\epsilon\rvert^2}, \qquad \langle H\rangle_\psi - E_0 = \frac{\lvert\epsilon\rvert^2\bigl(\langle\phi\vert\hat H\vert\phi\rangle - E_0\bigr)}{1 + \lvert\epsilon\rvert^2}.
$$

误差为 $\lvert\epsilon\rvert^2(\langle H\rangle_\phi - E_0) + O(\epsilon^4)$，非负且是混入幅度的二次方。
:::
:::

::: exercise 费曼–赫尔曼定理 {#exr-fh level=3}
证明：若 $\hat H(\lambda)\lvert n(\lambda)\rangle = E_n(\lambda)\lvert n(\lambda)\rangle$，本征态归一化且可微，则 $\deriv{E_n}{\lambda} = \langle n\vert\partial\hat H/\partial\lambda\vert n\rangle$。然后对氢取 $\lambda = e^2$ 用它导出 $\langle1/r\rangle = 1/n^2a$，其中 $E_n = -me^4/(2(4\pi\varepsilon_0)^2\hbar^2n^2)$。
::: solution
对 $E_n = \langle n\vert\hat H\vert n\rangle$ 求导：

$$
\deriv{E_n}{\lambda} = \langle\partial_\lambda n\vert\hat H\vert n\rangle + \langle n\vert\partial_\lambda\hat H\vert n\rangle + \langle n\vert\hat H\vert\partial_\lambda n\rangle = E_n\,\partial_\lambda\langle n\vert n\rangle + \langle n\vert\partial_\lambda\hat H\vert n\rangle,
$$

而对一切 $\lambda$ 有 $\langle n\vert n\rangle = 1$，所以第一项为零。这就是该定理，它正是 [[#eq-first]] 的微分形式。

对氢，$\hat H = \hat p^2/2m - \lambda/(4\pi\varepsilon_0r)$，$\lambda = e^2$，所以 $\partial\hat H/\partial\lambda = -1/(4\pi\varepsilon_0r)$。由 $E_n \propto -\lambda^2$，$\deriv{E_n}{\lambda} = 2E_n/\lambda$。于是

$$
-\frac{1}{4\pi\varepsilon_0}\left\langle\frac1r\right\rangle = \frac{2E_n}{e^2} = -\frac{me^2}{(4\pi\varepsilon_0)^2\hbar^2n^2}, \qquad \left\langle\frac1r\right\rangle = \frac{me^2}{4\pi\varepsilon_0\hbar^2n^2} = \frac{1}{n^2a},
$$

其中 $a = 4\pi\varepsilon_0\hbar^2/me^2$。这也是库仑势的位力定理 $\langle V\rangle = 2E_n$。
:::
:::
