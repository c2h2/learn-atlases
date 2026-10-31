几乎任何势阱的底部附近，势能都是一个抛物线。把一个光滑的 $V(x)$ 在极小值点 $x_0$ 附近展开：常数项平移所有能量，线性项因 $V'(x_0) = 0$ 而消失，二阶以内剩下的就是 $\frac12V''(x_0)(x - x_0)^2$。这就是谐振子在物理学的哪里都在场的原因：分子或晶体中振动的原子、电磁场的模式、任何体系围绕平衡的小振动。经典力学里它是 [[oscillations/simple-harmonic]] 的主题；量子力学里，它是继 [[quantum-1/piecewise-potentials]] 方势阱之后第二个精确可解的束缚态问题，而且有一种优雅得多的解法。

量子谐振子的哈密顿量为

$$
\hat H = \frac{\hat p^2}{2m} + \frac12m\omega^2\hat x^2,
$$ {#eq-ho-hamiltonian}

其中 $\omega = \sqrt{k/m}$ 是经典角频率。我们将用两种方法求出它的谱。第一用**升降算符**，一种纯代数方法，这一形式归功于狄拉克（Dirac），它不解任何二阶微分方程就给出能量 $E_n = (n + \frac12)\hbar\omega$ 和全部本征函数。然后由**幂级数法**，它说明厄米（Hermite）多项式从何而来，以及量子化如何恰好从可归一化性中产生。接着计算期望值，比较量子与经典谐振子，并把结果应用于分子的振动。

先注意结论，再去推导。[[quantum-1/origins]] 中普朗克的振子能量为 $nh\nu = n\hbar\omega$。量子力学给出同样的等间距 $\hbar\omega$——这就是普朗克黑体定律得以幸存的原因——外加一个普朗克没有的**零点能** $\frac12\hbar\omega$。

## 为什么谐振子无处不在 {#why}

进入代数之前，值得看看抛物线近似在真实情形中有多好，以及一个经典谐振子的量子数有多大。在 $x_0$ 处有极小值的光滑势 $V(x)$ 有泰勒展开

$$
V(x) = V(x_0) + \frac12V''(x_0)(x - x_0)^2 + \frac16V'''(x_0)(x - x_0)^3 + \cdots
$$

所以只要三次及更高次项在粒子实际探索的区域上很小，它就表现得像一个满足 $m\omega^2 = V''(x_0)$ 的谐振子。在量子力学里，这一区域不是由你挑选的振幅决定的，而是由波函数的宽度决定的；对低能级，宽度约为**振子长度** $\sqrt{\hbar/m\omega}$ 的量级。因此，只要势能在远大于 $\sqrt{\hbar/m\omega}$ 的距离上才改变曲率，谐振子近似对最低的态就是好的；而随着 $n$ 增大、波函数摊开，近似会变差。

::: example 化学键有多像谐振子？{#ex-morse}
双原子分子键的一个常用模型是莫尔斯（Morse）势 $V(r) = D\bigl(1 - e^{-\beta(r - r_e)}\bigr)^2$，其中 $D$ 是势阱深度，$r_e$ 是平衡间距。用 $D$ 和 $\beta$ 表示力常量。对 HCl，$D = 4.62\,\mathrm{eV}$，力常量为 $481\,\mathrm{N/m}$（来自下面的 [[#ex-hcl]]）；求 $\beta$，并若振动能级以 $\hbar\omega = 0.358\,\mathrm{eV}$ 等间隔排列，估计势阱大约容纳多少振动能级。
::: solution
令 $y = r - r_e$。则 $1 - e^{-\beta y} = \beta y - \frac12\beta^2y^2 + \cdots$，于是

$$
V = D\left(\beta y - \tfrac12\beta^2y^2 + \cdots\right)^2 = D\beta^2y^2 - D\beta^3y^3 + \cdots
$$

力常量为 $k = V''(r_e) = 2D\beta^2$。代入 $D = 4.62\times1.602\times10^{-19}\,\mathrm J = 7.40\times10^{-19}\,\mathrm J$ 解出 $\beta$：

$$
\beta = \sqrt{\frac{k}{2D}} = \sqrt{\frac{481}{2(7.40\times10^{-19})}} = 1.80\times10^{10}\,\mathrm{m^{-1}},
$$

所以势能在 $1/\beta = 0.055\,\mathrm{nm}$ 的尺度上改变性态，是 HCl 振子长度（$0.011\,\mathrm{nm}$）的五倍。最低的几级几乎严格谐振。三次项 $-D\beta^3y^3$ 在拉伸一侧软化势阱，所以能级随 $n$ 升高而挤向一起。用深度除以间距得 $D/\hbar\omega = 4.62/0.358 \approx 13$；而精确的莫尔斯谱（有封闭形式）实际上容纳的能级约为这个数的两倍，因为间距在解离极限处收缩到零。无论如何，谐振子对最低几级描述得很好，对势阱顶部则不然。
:::
:::

相反的问题是，为什么没人看见一个摆的量子化。取质量 $0.100\,\mathrm{kg}$、弹簧 $\omega = 10.0\,\mathrm{s^{-1}}$、振幅 $1.00\,\mathrm{cm}$ 的振子。它的能量为 $\frac12m\omega^2A^2 = 5.0\times10^{-4}\,\mathrm J$，而 $\hbar\omega = 1.05\times10^{-33}\,\mathrm J$。量子数为 $n \approx E/\hbar\omega = 4.7\times10^{29}$，每增加一个量子，能量改变 $10^{29}$ 分之一。振子长度 $\sqrt{\hbar/m\omega} = 1.0\times10^{-17}\,\mathrm m$ 只有质子半径的百分之一。量子化确实在那里，但任何弹簧实验都分辨不出它；这就是对应原理的数字版本。

## 升降算符 {#ladder}

哈密顿量是两个平方项之和 $\frac{1}{2m}\bigl(\hat p^2 + (m\omega\hat x)^2\bigr)$。对数来说，$u^2 + v^2 = (v - iu)(v + iu)$。对算符来说，因式分解差一个对易子而出错，而这个对易子恰恰是方法成功之处。

::: definition 对易子与升降算符 {#def-ladder}
两个算符的**对易子**为 $[\hat A, \hat B] = \hat A\hat B - \hat B\hat A$。对谐振子，定义**降算符**与**升算符**

$$
\hat a = \frac{1}{\sqrt{2\hbar m\omega}}\bigl(m\omega\hat x + i\hat p\bigr), \qquad \hat a^\dagger = \frac{1}{\sqrt{2\hbar m\omega}}\bigl(m\omega\hat x - i\hat p\bigr),
$$ {#eq-ladder}

以及**粒子数算符** $\hat N = \hat a^\dagger\hat a$。
:::

基本对易子是 $[\hat x, \hat p] = i\hbar$。要看出这一点，把两种次序作用在一个试验函数 $f$ 上：$\hat x\hat pf = -i\hbar xf'$，而 $\hat p\hat xf = -i\hbar(xf)' = -i\hbar(f + xf')$，两者之差是 $i\hbar f$。这一**正则对易关系**在 [[quantum-1/formalism]] 中将被精确化的意义下，就是量子运动学的一切。

::: lemma 升降算符的代数 {#lem-ladder}
[[#eq-ladder]] 中的算符满足

$$
[\hat a, \hat a^\dagger] = 1, \qquad \hat H = \hbar\omega\left(\hat a^\dagger\hat a + \frac12\right) = \hbar\omega\left(\hat N + \frac12\right),
$$ {#eq-h-ladder}

$$
[\hat N, \hat a] = -\hat a, \qquad [\hat N, \hat a^\dagger] = \hat a^\dagger.
$$ {#eq-n-comm}

此外 $\hat a^\dagger$ 是 $\hat a$ 的**伴随**：对一切可归一化的 $f$、$g$，$\int f^*(\hat ag)\,\dd x = \int(\hat a^\dagger f)^*g\,\dd x$。
:::

::: proof
把乘积展开，保持 $\hat x$ 与 $\hat p$ 的顺序：

$$
\hat a\hat a^\dagger = \frac{1}{2\hbar m\omega}\Bigl(m^2\omega^2\hat x^2 + \hat p^2 - im\omega\hat x\hat p + im\omega\hat p\hat x\Bigr) = \frac{1}{2\hbar m\omega}\Bigl(\hat p^2 + m^2\omega^2\hat x^2\Bigr) - \frac{i}{2\hbar}[\hat x, \hat p].
$$

代入 $[\hat x, \hat p] = i\hbar$，最后一项为 $+\frac12$，所以 $\hat a\hat a^\dagger = \hat H/\hbar\omega + \frac12$。把交叉项符号反过来做同样的计算，得 $\hat a^\dagger\hat a = \hat H/\hbar\omega - \frac12$。两式相减得 $[\hat a, \hat a^\dagger] = 1$；第二个等式即 [[#eq-h-ladder]]。对 [[#eq-n-comm]]，用 $[\hat A\hat B, \hat C] = \hat A[\hat B, \hat C] + [\hat A, \hat C]\hat B$：

$$
[\hat a^\dagger\hat a, \hat a] = \hat a^\dagger[\hat a, \hat a] + [\hat a^\dagger, \hat a]\hat a = 0 - \hat a, \qquad [\hat a^\dagger\hat a, \hat a^\dagger] = \hat a^\dagger[\hat a, \hat a^\dagger] = \hat a^\dagger.
$$

至于伴随：因 $x$ 为实，$\int f^*xg\,\dd x = \int(xf)^*g\,\dd x$；而 $\int f^*(-i\hbar g')\,\dd x = \int(-i\hbar f')^*g\,\dd x$ 来自一次分部积分（边界项对可归一化函数为零），所以 $(i\hat p)$ 的伴随是 $-i\hat p$。于是 $m\omega\hat x + i\hat p$ 的伴随是 $m\omega\hat x - i\hat p$。
:::

::: theorem 谐振子的谱 {#thm-ho-spectrum}
[[#eq-ho-hamiltonian]] 的能量本征值为

$$
E_n = \left(n + \frac12\right)\hbar\omega, \qquad n = 0, 1, 2, \ldots
$$ {#eq-ho-energy}

基态是归一化的高斯函数

$$
\psi_0(x) = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4}e^{-m\omega x^2/2\hbar},
$$ {#eq-ground}

归一化的激发态为 $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$，且

$$
\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}, \qquad \hat a\psi_n = \sqrt n\,\psi_{n-1}.
$$ {#eq-ladder-action}
:::

::: proof
*升降。* 设 $\hat H\psi = E\psi$。由 [[#eq-n-comm]]，$\hat H\hat a = \hat a\hat H - \hbar\omega\hat a$，于是

$$
\hat H(\hat a\psi) = \hat a\hat H\psi - \hbar\omega\hat a\psi = (E - \hbar\omega)(\hat a\psi),
$$

同理 $\hat H(\hat a^\dagger\psi) = (E + \hbar\omega)(\hat a^\dagger\psi)$。所以 $\hat a\psi$ 要么为零，要么是一个能量降低 $\hbar\omega$ 的本征函数；$\hat a^\dagger\psi$ 则是一个能量升高 $\hbar\omega$ 的本征函数。

*最底一级。* 对任何可归一化的 $\psi$，由伴随性质，

$$
\int\psi^*\hat H\psi\,\dd x = \hbar\omega\int\abs{\hat a\psi}^2\,\dd x + \frac{\hbar\omega}{2}\int\abs\psi^2\,\dd x \ge \frac{\hbar\omega}{2}\int\abs\psi^2\,\dd x.
$$

所以每个能量都至少为 $\frac12\hbar\omega$。反复下降每次减去 $\hbar\omega$，终究会低于这一下限，因此对某个本征函数序列必须终止：存在 $\psi_0 \ne 0$ 使得 $\hat a\psi_0 = 0$。于是 $\hat H\psi_0 = \hbar\omega(\hat a^\dagger\hat a + \frac12)\psi_0 = \frac12\hbar\omega\,\psi_0$。

*基态。* 写开来看，$\hat a\psi_0 = 0$ 是一阶方程

$$
m\omega x\psi_0 + \hbar\deriv{\psi_0}{x} = 0, \qquad\text{故}\qquad \psi_0 = Ae^{-m\omega x^2/2\hbar}.
$$

除归一化外这是唯一解，所以最底一级是唯一的。用 $\int e^{-m\omega x^2/\hbar}\,\dd x = \sqrt{\pi\hbar/m\omega}$ 归一化即得 [[#eq-ground]]。

*所有各级。* 反复作用 $\hat a^\dagger$ 给出能量为 $(n + \frac12)\hbar\omega$ 的本征函数；它们没有一个为零，因为 $\int\abs{\hat a^\dagger\psi}^2 = \int\psi^*\hat a\hat a^\dagger\psi = \int\psi^*(\hat N + 1)\psi > 0$。没有别的本征值：任何本征函数下降到足够多次，必然到达一个被 $\hat a$ 湮灭的函数，那就是 $\psi_0$；所以它的能量是 $\frac12\hbar\omega$ 加上 $\hbar\omega$ 的整数倍。

*归一化。* 若 $\psi_n$ 已归一化，则 $\hat N\psi_n = n\psi_n$ 且 $\int\abs{\hat a^\dagger\psi_n}^2 = \int\psi_n^*(\hat N + 1)\psi_n = n + 1$，于是 $\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}$，其中 $\psi_{n+1}$ 归一化（相位取为实正）。同理 $\int\abs{\hat a\psi_n}^2 = n$ 给出 $\hat a\psi_n = \sqrt n\,\psi_{n-1}$。迭代第一个关系得 $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$。
:::

证明从头到尾没有解过二阶微分方程，只用了 $[\hat x, \hat p] = i\hbar$ 和 $\hat H$ 的形式。同样的代数描述一切哈密顿量为谐振子之和的体系：电磁场的模式，其中 $\hat a^\dagger$ 产生一个光子；晶格的振动，其中它产生一个声子。在这些场合 $\hat a$ 与 $\hat a^\dagger$ 被称为湮灭算符与产生算符，$n$ 计数量子个数。

::: warning 零点能不是可选项
人们很想像普朗克那样写 $E_n = n\hbar\omega$，或者说基态就是"粒子静止在阱底"。这不对。一个定在 $x = 0$ 处且 $p = 0$ 的粒子将有 $\Delta x = \Delta p = 0$，为不确定性原理所不许。基态是一种折中：$\Delta x\,\Delta p = \hbar/2$ 恰好成立（[[#ex-moments]]），而能量 $\frac12\hbar\omega$ 是这一折中的最低值。零点运动是可测量的：它使分子振动能级发生依赖于同位素质量的移动；它使液氦在大气压下直到绝对零度仍保持液态；光子带走的是能量差而不是能量本身，原因也在这里。
:::

## 波函数与厄米多项式 {#hermite}

以振子长度 $\sqrt{\hbar/m\omega}$（即 $\psi_0$ 衰减的尺度）为单位来度量长度很方便。令

$$
\xi = \sqrt{\frac{m\omega}{\hbar}}\,x, \qquad\text{于是}\qquad \hat a^\dagger = \frac{1}{\sqrt2}\left(\xi - \deriv{}{\xi}\right), \quad \hat a = \frac{1}{\sqrt2}\left(\xi + \deriv{}{\xi}\right).
$$

则 $\psi_0 \propto e^{-\xi^2/2}$，而每作用一次 $\hat a^\dagger$，就把高斯函数前面的多项式乘以 $2\xi$ 再求导：$\bigl(\xi - \dd/\dd\xi\bigr)\bigl(h(\xi)e^{-\xi^2/2}\bigr) = \bigl(2\xi h - h'\bigr)e^{-\xi^2/2}$。从 $h = 1$ 出发依次得到 $2\xi$、$4\xi^2 - 2$、$8\xi^3 - 12\xi$、$16\xi^4 - 48\xi^2 + 12$（每一步差一个被归一化吸收的因子 $\sqrt2$）。这些就是**厄米多项式** $H_n(\xi)$。

::: definition 厄米多项式与谐振子本征函数 {#def-hermite}
**厄米多项式**由 $H_0 = 1$ 与 $H_{n+1}(\xi) = 2\xi H_n(\xi) - H_n'(\xi)$ 定义；等价地由 $H_{n+1} = 2\xi H_n - 2nH_{n-1}$ 定义。归一化的谐振子本征函数为

$$
\psi_n(x) = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4}\frac{1}{\sqrt{2^nn!}}\,H_n(\xi)\,e^{-\xi^2/2}, \qquad \xi = \sqrt{\frac{m\omega}{\hbar}}\,x.
$$ {#eq-psi-n}
:::

头几个是 $H_0 = 1$、$H_1 = 2\xi$、$H_2 = 4\xi^2 - 2$、$H_3 = 8\xi^3 - 12\xi$、$H_4 = 16\xi^4 - 48\xi^2 + 12$。$H_n$ 的次数为 $n$，有 $n$ 个实零点，奇偶性与 $n$ 相同；于是 $\psi_n$ 在 $n$ 为偶数时为偶宇称、$n$ 为奇数时为奇宇称，这正是 [[quantum-1/piecewise-potentials#thm-nondegenerate]] 对偶函数势所要求的。

::: widget plot
f: x^2/2; 0.5 + exp(-x^2)/sqrt(pi); 1.5 + 2*x^2*exp(-x^2)/sqrt(pi); 2.5 + (2*x^2 - 1)^2*exp(-x^2)/(2*sqrt(pi)); 3.5 + (2*x^3 - 3*x)^2*exp(-x^2)/(3*sqrt(pi))
x: -4, 4
y: 0, 4.5
labels: V; n = 0; n = 1; n = 2; n = 3
caption: 势能 $\frac12\xi^2$ 与 $n = 0$ 到 $3$ 的密度 $\abs{\psi_n}^2$，每条密度画在各自能量 $n + \frac12$ 的水平线上（单位 $\hbar = m = \omega = 1$）。每条密度都漫出抛物线之外，进入经典禁区。数一数节点，再看能级是等间隔的——方势阱就不是这样。
:::

### 幂级数法

升降法找到了本征函数，却没有说明为什么别的能量不行。解析方法可以。用 $\xi$ 和 $K = 2E/\hbar\omega$ 表示，不含时方程化为

$$
\deriv{^2\psi}{\xi^2} = (\xi^2 - K)\psi.
$$

$\abs\xi$ 很大时 $K$ 可以忽略，$e^{\pm\xi^2/2}$ 按主导阶求解。写成 $\psi = h(\xi)e^{-\xi^2/2}$，剥去衰减行为；则 $h$ 满足**厄米方程**

$$
h'' - 2\xi h' + (K - 1)h = 0.
$$ {#eq-hermite-ode}

试用幂级数 $h = \sum_j a_j\xi^j$（[数学图谱：级数解法](/learn/maths/lesson.php?c=ode&l=series-solutions)）。代入并整理 $\xi^j$ 的系数，

$$
(j + 1)(j + 2)a_{j+2} - 2ja_j + (K - 1)a_j = 0, \qquad a_{j+2} = \frac{2j + 1 - K}{(j+1)(j+2)}\,a_j.
$$ {#eq-recursion}

递推把偶系数与偶系数、奇系数与奇系数联系在一起，所以有两个独立级数，分别始于 $a_0$ 与 $a_1$。$j$ 很大时 $a_{j+2}/a_j \approx 2/j$。这正是 $e^{\xi^2} = \sum\xi^{2k}/k!$ 展开式的比值——它的系数满足 $c_{k+1}/c_k = 1/(k+1)$，即 $j = 2k$ 时的 $2/j$。所以若不截断，$h$ 就按 $e^{\xi^2}$ 增长，$\psi = he^{-\xi^2/2}$ 就按 $e^{\xi^2/2}$ 增长，不可归一化。级数必须终止。它恰在 $j = n$ 处终止，当且仅当 $K = 2n + 1$，即

$$
E = \frac{K}{2}\hbar\omega = \left(n + \frac12\right)\hbar\omega,
$$

而另一个级数（$n$ 为偶时为奇级数，$n$ 为奇时为偶级数）必须不存在。这又是 [[#eq-ho-energy]]；而截断得到的多项式经适当归一化后正是 $H_n$。量子化是要求波函数可归一化的结果，与有限深势阱完全一样。

::: example 用两种方法构造 ψ₂ {#ex-psi2}
把 $\hat a^\dagger$ 作用于 $\psi_1$ 求 $\psi_2$，并与递推 [[#eq-recursion]] 的结果核对。
::: solution
用 $\xi$ 单位，取 $\psi_0 = \pi^{-1/4}e^{-\xi^2/2}$（按 $\xi$ 归一化），先得

$$
\psi_1 = \hat a^\dagger\psi_0 = \frac{1}{\sqrt2}\left(\xi - \deriv{}{\xi}\right)\pi^{-1/4}e^{-\xi^2/2} = \frac{1}{\sqrt2}\pi^{-1/4}(\xi + \xi)e^{-\xi^2/2} = \sqrt2\,\pi^{-1/4}\,\xi\,e^{-\xi^2/2}.
$$

再由 [[#eq-ladder-action]]，$\psi_2 = \hat a^\dagger\psi_1/\sqrt2$：

$$
\psi_2 = \frac{1}{\sqrt2}\cdot\frac{1}{\sqrt2}\sqrt2\,\pi^{-1/4}\left(\xi - \deriv{}{\xi}\right)\bigl(\xi e^{-\xi^2/2}\bigr) = \frac{\pi^{-1/4}}{\sqrt2}\bigl(\xi^2 - 1 + \xi^2\bigr)e^{-\xi^2/2} = \frac{\pi^{-1/4}}{\sqrt2}(2\xi^2 - 1)e^{-\xi^2/2}.
$$

这与 [[#eq-psi-n]] 一致：$H_2/\sqrt{2^2\cdot2!} = (4\xi^2 - 2)/\sqrt8 = (2\xi^2 - 1)/\sqrt2$。在递推中取 $K = 5$（$n = 2$）、$a_0 = 1$：$a_2 = (0 + 1 - 5)/2 = -2$，且 $a_4 = (4 + 1 - 5)/12\cdot a_2 = 0$，所以 $h = 1 - 2\xi^2 \propto 2\xi^2 - 1$。节点位置 $\xi = \pm1/\sqrt2$ 就是图中 $\abs{\psi_2}^2$ 归零之处。
:::
:::

## 期望值与经典极限 {#expectation}

升降算符让期望值几乎唾手可得。反解 [[#eq-ladder]]：

$$
\hat x = \sqrt{\frac{\hbar}{2m\omega}}\bigl(\hat a + \hat a^\dagger\bigr), \qquad \hat p = i\sqrt{\frac{\hbar m\omega}{2}}\bigl(\hat a^\dagger - \hat a\bigr).
$$ {#eq-x-p-ladder}

由于 $\hat a$ 与 $\hat a^\dagger$ 把 $n$ 改变 $1$，而 $m \ne n$ 的 $\psi_m$、$\psi_n$ 正交（能量不同的本征函数；见 [[quantum-1/schrodinger-equation]] 的习题），任何 $\hat a$ 与 $\hat a^\dagger$ 数目不等的算符乘积在 $\psi_n$ 中的期望值都为零。

::: example 谐振子的矩 {#ex-moments}
求态 $\psi_n$ 中的 $\langle x\rangle$、$\langle x^2\rangle$、$\langle p\rangle$、$\langle p^2\rangle$、$\Delta x\,\Delta p$、$\langle T\rangle$ 与 $\langle V\rangle$。
::: solution
$\langle x\rangle$ 与 $\langle p\rangle$ 各只含单个 $\hat a$ 或 $\hat a^\dagger$，所以都为零。对 $x^2$，

$$
\hat x^2 = \frac{\hbar}{2m\omega}\bigl(\hat a^2 + \hat a\hat a^\dagger + \hat a^\dagger\hat a + \hat a^{\dagger2}\bigr).
$$

$\hat a^2$ 与 $\hat a^{\dagger2}$ 把 $n$ 改变 $2$，贡献消失。由 $\hat a^\dagger\hat a\psi_n = n\psi_n$ 与 $\hat a\hat a^\dagger\psi_n = (n + 1)\psi_n$，

$$
\langle x^2\rangle = \frac{\hbar}{2m\omega}(2n + 1) = \left(n + \frac12\right)\frac{\hbar}{m\omega}.
$$

类似地 $\hat p^2 = -\frac{\hbar m\omega}{2}\bigl(\hat a^{\dagger2} - \hat a^\dagger\hat a - \hat a\hat a^\dagger + \hat a^2\bigr)$，所以 $\langle p^2\rangle = (n + \frac12)\hbar m\omega$。于是

$$
\Delta x\,\Delta p = \sqrt{\langle x^2\rangle\langle p^2\rangle} = \left(n + \frac12\right)\hbar,
$$

基态为 $\hbar/2$，是允许的最小值。最后 $\langle T\rangle = \langle p^2\rangle/2m = \frac12(n + \frac12)\hbar\omega$，$\langle V\rangle = \frac12m\omega^2\langle x^2\rangle = \frac12(n + \frac12)\hbar\omega$：能量均分在动能与势能之间，与经典谐振子的时间平均一样。这就是平方势的量子**位力定理**。
:::
:::

能量为 $E$ 的经典振子在转向点 $\pm A$ 之间摆动，$\frac12m\omega^2A^2 = E$；它在转向点附近动得慢，停留时间最长。它的概率密度为 $\rho_{\mathrm{cl}}(x) = 1/\bigl(\pi\sqrt{A^2 - x^2}\bigr)$。量子基态恰好相反：在中心处取峰值，并延伸到转向点之外。$n$ 增大时，$\abs{\psi_n}^2$ 长出 $n$ 个节点并快速振荡，其局部平均趋于 $\rho_{\mathrm{cl}}$。

::: widget plot
f: (fact(n)*sum((-1)^k*(2*x)^(n - 2*k)/(fact(k)*fact(n - 2*k)), k, 0, floor(n/2)))^2*exp(-x^2)/(2^n*fact(n)*sqrt(pi)); 1/(pi*sqrt(max(2*n + 1 - x^2, 0.0001)))
x: -7, 7
y: 0, 0.6
labels: 量子; 经典
sliders: n=10:0:30:1
caption: 量子密度 $\abs{\psi_n}^2$（$\xi$ 单位）与能量相同的经典振子的密度，经典转向点在 $\xi = \pm\sqrt{2n+1}$。从 $n = 0$ 开始——两者毫不相像——逐步升到 $n = 30$。量子密度绕经典曲线越振越快，在转向点附近达到峰值，并向外渗漏一点。这就是看得见的对应原理。
:::

::: example 隧穿进经典禁区 {#ex-outside}
求处于谐振子基态的粒子出现在经典转向点之外的概率。
::: solution
对 $E_0 = \frac12\hbar\omega$，转向点满足 $\frac12m\omega^2A^2 = \frac12\hbar\omega$，即 $A = \sqrt{\hbar/m\omega}$，亦即 $\xi = \pm1$。密度为 $\pi^{-1/2}e^{-\xi^2}$，于是

$$
P = 2\int_1^\infty\frac{e^{-\xi^2}}{\sqrt\pi}\,\dd\xi = 1 - \erf(1) = 0.157.
$$

差不多有六分之一的时间，粒子处在同样能量的经典粒子永远到不了的地方。什么也没有被违反：在禁区里势能超过 $E$，但粒子并没有在一个确定位置上带着确定的动能；一旦把它定域在那里，那次测量就必须提供能量。
:::
:::

::: example HCl 分子的振动 {#ex-hcl}
$\mathrm{H}^{35}\mathrm{Cl}$ 的红外吸收在其基频振动带处出现，波数 $\tilde\nu = 2886\,\mathrm{cm^{-1}}$。把化学键当作谐振子，求以 eV 计的 $\hbar\omega$、零点能、力常量以及振子长度 $\sqrt{\hbar/\mu\omega}$。原子质量：$m_{\mathrm H} = 1.00783\,\mathrm u$、$m_{\mathrm{Cl}} = 34.96885\,\mathrm u$，其中 $1\,\mathrm u = 1.66054\times10^{-27}\,\mathrm{kg}$。
::: solution
双原子分子沿自身轴线振动，如同一个质量为约化质量 $\mu = m_{\mathrm H}m_{\mathrm{Cl}}/(m_{\mathrm H} + m_{\mathrm{Cl}}) = 0.97959\,\mathrm u = 1.62666\times10^{-27}\,\mathrm{kg}$ 的单粒子。$0\to1$ 跃迁吸收的光子能量为 $\hbar\omega$，其波数为 $\tilde\nu = 1/\lambda$，所以

$$
\hbar\omega = hc\tilde\nu = (1239.84\,\mathrm{eV\,nm})(2886\times10^{-7}\,\mathrm{nm^{-1}}) = 0.3578\,\mathrm{eV}.
$$

零点能为 $\frac12\hbar\omega = 0.179\,\mathrm{eV}$。角频率为 $\omega = 2\pi c\tilde\nu = 2\pi(2.99792\times10^{10}\,\mathrm{cm/s})(2886\,\mathrm{cm^{-1}}) = 5.436\times10^{14}\,\mathrm{s^{-1}}$，力常量为

$$
k = \mu\omega^2 = (1.62666\times10^{-27})(5.436\times10^{14})^2 = 481\,\mathrm{N/m}.
$$

振子长度为 $\sqrt{\hbar/\mu\omega} = \sqrt{(1.05457\times10^{-34})/\bigl((1.62666\times10^{-27})(5.436\times10^{14})\bigr)} = 1.09\times10^{-11}\,\mathrm{m} = 10.9\,\mathrm{pm}$，不到 $127\,\mathrm{pm}$ 键长的十分之一。零点振动只占键长的一小部分，所以谐振子近似对低能级很好。室温下 $k_BT = 0.0259\,\mathrm{eV}$ 比 $\hbar\omega$ 小十四倍，因此几乎每个分子都在振动基态。实际上，高 $n$ 处能级缓慢汇聚，因为远离平衡时键的势能不是抛物线，分子终将解离。
:::
:::

::: quiz
一个粒子处于谐振子的态 $\Psi(x,0) = (\psi_0 + \psi_1)/\sqrt2$。关于 $\langle x\rangle(t)$，哪种说法正确？
- [ ] 它对所有 $t$ 都为零，因为每个 $\psi_n$ 都有 $\langle x\rangle = 0$。
- [x] 它以经典频率 $\omega$ 振荡。
- [ ] 它以频率 $\omega/2$ 振荡，因为 $E_0 = \frac12\hbar\omega$。
- [ ] 它以频率 $3\omega/2$ 振荡。
::: solution
$\psi_0$ 与 $\psi_1$ 之间的交叉项以玻尔频率 $(E_1 - E_0)/\hbar = \omega$ 振荡，且 $\int\psi_0x\psi_1\,\dd x = \sqrt{\hbar/2m\omega} \ne 0$。写开来 $\langle x\rangle = \sqrt{\hbar/2m\omega}\cos\omega t$。事实上，谐振子任何态的 $\langle x\rangle$ 都以恰好 $\omega$ 振荡，因为由埃伦费斯特定理，线性回复力下 $\langle x\rangle$ 服从经典运动方程。零点能在运动中完全不可见：出现的只有能量差。
:::
:::

### 矩阵元与选择定则

因为 $\hat x$ 是 $\hat a$ 与 $\hat a^\dagger$ 的组合，它在谐振子态之间的矩阵元几乎全为零。由 [[#eq-x-p-ladder]] 与 [[#eq-ladder-action]]，

$$
\int\psi_m^*\,x\,\psi_n\,\dd x = \sqrt{\frac{\hbar}{2m\omega}}\left(\sqrt n\,\delta_{m,n-1} + \sqrt{n+1}\,\delta_{m,n+1}\right).
$$

分子通过电偶极矩与场的耦合吸收红外光，而在谐振子近似下偶极矩随键的拉伸 $x$ 线性变化。$\psi_n$ 与 $\psi_m$ 之间的跃迁概率正比于这个矩阵元的平方（[[quantum-2/time-dependent]]），所以只有 $\Delta n = \pm1$ 的跃迁发生。所有这些跃迁的光子能量都是同一个 $\hbar\omega$。因此一个严格谐振的分子，无论气体多热，都只显示一条吸收线；真实光谱中在 $2\hbar\omega$ 与 $3\hbar\omega$ 附近出现的弱泛频，度量的是非简谐性与偶极矩的非线性。因子 $\sqrt{n+1}$ 还说明从 $n$ 到 $n + 1$ 的吸收随 $n$ 增大；放到电磁场里，这就成了受激辐射，即激光的原理。

::: example 电场中的带电谐振子 {#ex-shifted}
电荷 $q$ 处于谐振子势中，并置于沿 $x$ 的均匀电场 $\mathcal E$ 里，于是 $V = \frac12m\omega^2x^2 - q\mathcal Ex$。精确求出能级与本征函数。
::: solution
配方：

$$
\frac12m\omega^2x^2 - q\mathcal Ex = \frac12m\omega^2\left(x - x_0\right)^2 - \frac{q^2\mathcal E^2}{2m\omega^2}, \qquad x_0 = \frac{q\mathcal E}{m\omega^2}.
$$

这是同一个谐振子，只是中心移到 $x_0$、整体降低一个常量。平移坐标不改变动能算符，因为 $\dd/\dd x = \dd/\dd(x - x_0)$，所以本征函数为 $\psi_n(x - x_0)$，能量为

$$
E_n = \left(n + \frac12\right)\hbar\omega - \frac{q^2\mathcal E^2}{2m\omega^2}.
$$

所有能级下移同样多，所以跃迁频率完全不变。这一平移正是感应偶极的经典能量：场把电荷移动 $x_0$，给出偶极矩 $qx_0 = (q^2/m\omega^2)\mathcal E$，即极化率 $\alpha = q^2/m\omega^2$，能量为 $-\frac12\alpha\mathcal E^2$。这个精确可解的情形是 [[quantum-2/stationary-perturbation]] 中检验微扰论的标准题目，其二阶能量移动恰好重现 $-q^2\mathcal E^2/2m\omega^2$。
:::
:::

### 时间演化与热平衡

测验里的结论可以推广。把任意初始态展开为 $\Psi(x,0) = \sum_nc_n\psi_n$。由 [[quantum-1/schrodinger-equation#thm-stationary]]，$\Psi(x,t) = \sum_nc_n\psi_ne^{-i(n + 1/2)\omega t}$。除了一个没有可观测效应的公共因子 $e^{-i\omega t/2}$，每个指数都是 $\omega$ 的整数倍。所以波函数经过一个经典周期 $2\pi/\omega$ 就回到自身（至多差一个整体相位），*无论*初始态是什么：量子谐振子是严格周期性的，周期就是经典周期。这门课里没有第二个体系有这一性质；方势阱中能量按 $n^2$ 增长，一般态要经过长得多的时间 $4ma^2/\pi\hbar$ 才回归。

埃伦费斯特定理对平均值讲同一件事。力 $-m\omega^2x$ 是线性的，所以 $\langle -m\omega^2x\rangle = -m\omega^2\langle x\rangle$，$\langle x\rangle$ 精确服从经典方程 $\ddot{\langle x\rangle} = -\omega^2\langle x\rangle$。一个从平移过的基态高斯出发的波包保持形状，像经典粒子一样来回摆动。这样的**相干态**是经典振荡最接近的量子对应，激光发出的光就是用它描述的。

最后回到普朗克。温度 $T$ 的热平衡下，能级 $n$ 的概率正比于 $e^{-E_n/k_BT}$。与 [[quantum-1/origins#thm-planck]] 相同的几何级数给出平均能量

$$
\langle E\rangle = \frac12\hbar\omega + \frac{\hbar\omega}{e^{\hbar\omega/k_BT} - 1}.
$$

第二项就是普朗克的结果，第一项是零点能，在 $T = 0$ 时也存在。因为它与温度无关，它对热容量没有贡献，对黑体谱也没有贡献——这就是普朗克当初不带它也能过关的原因。对 $300\,\mathrm K$ 的 HCl，$\hbar\omega/k_BT = 13.8$，于是 $n = 1$ 与 $n = 0$ 的占据数之比为 $e^{-13.8} = 9.8\times10^{-7}$：振动在室温下被冻结，转动则不然。$1000\,\mathrm K$ 时该比值升到 $0.016$。振动自由度正是这样被冻结的——这就是双原子气体热容量为 $\frac52R$ 而非经典值 $\frac72R$ 的解释（[[thermodynamics/kinetic-theory]]）。

::: remark 厄米多项式的约定
[[#def-hermite]] 中的多项式是"物理学家"的厄米多项式：首项系数为 $2^n$，带权 $e^{-\xi^2}$ 正交。统计学家用"概率论者"的多项式 $\mathrm{He}_n$：首项系数为 $1$，带权 $e^{-\xi^2/2}$，两者关系为 $H_n(\xi) = 2^{n/2}\mathrm{He}_n(\sqrt2\,\xi)$。从表中抄公式之前，先查清表用的是哪种约定。另一个要留心的约定是 $\hat a$ 中 $\hat p$ 的符号：有些书把 $-i\hat p$ 放进降算符，与我们的只差相位。
:::

::: application 无处不在的谐振子
分子的振动光谱（如 [[#ex-hcl]]）与固体的热容量（爱因斯坦 1907 年的模型把每个原子当作三个谐振子，$\langle E\rangle$ 取普朗克公式的值，再加零点能）都是直接应用。空腔中电磁场的每个模式都是一个谐振子，其量子即光子；而这些模式的零点能产生两块导体板之间的卡西米尔（Casimir）力，1997 年的测量精度达几个百分点。泡利阱中的离子与光力学中的机械薄膜被冷却到谐振子基态，再用 $\hat a$ 与 $\hat a^\dagger$ 一个量子一个量子地操控。化学图谱在[振动与转动](/learn/chemistry/lesson.php?c=quantum-chemistry&l=vibration-rotation)一文中展开分子方面的应用。
:::

::: history 新力学中的谐振子
谐振子是量子新力学中第一个被解出的体系。海森堡（Heisenberg）1925 年 7 月的论文（写于他在黑尔戈兰岛小住之后）计算了非谐振子的能量，发现了零点项 $\frac12\hbar\omega$。玻恩（Born）与约尔当（Jordan），随后玻恩、海森堡与约尔当同年晚些时候的"三人论文"，把它改写成矩阵形式并写下 $pq - qp = \hbar/i$。薛定谔（Schrödinger）在他 1926 年的第二篇论文中用自己的方程解出了谐振子，用的是厄米 1864 年研究过的多项式。狄拉克的《量子力学原理》（*The Principles of Quantum Mechanics*，1930）以本质上现代的形式给出算符方法。零点能的证据早在 1924 年就已出现：马利肯（Mulliken）发现一氧化硼带光谱的同位素位移只有用半整数的振动量子数才能拟合。
:::

## 后续内容 {#leads}

升降法是为 [[quantum-1/angular-momentum]] 准备的雏形，那里的算符 $\hat L_\pm$ 沿 $\hat L_z$ 的本征值上下攀爬，而一个正性论证使升降梯在两端终止。在 [[quantum-2]] 中，谐振子是微扰论（非简谐修正）、相干态（振荡而不扩散的高斯态）与电磁场量子化的出发点。[[quantum-1/origins]] 中失效的能量均分论证，对谐振子可以通过对 $(n + \frac12)\hbar\omega$ 取玻尔兹曼平均来补救，这在 [[statistical-mechanics]] 中完成。

::: summary
- 任何极小值附近势能都是谐振子的，$V \approx \frac12m\omega^2x^2$，所以谐振子描述各种小振动。
- 取 $\hat a = (m\omega\hat x + i\hat p)/\sqrt{2\hbar m\omega}$ 与 $[\hat x, \hat p] = i\hbar$，有 $[\hat a, \hat a^\dagger] = 1$ 且 $\hat H = \hbar\omega(\hat a^\dagger\hat a + \frac12)$。
- 谱为 $E_n = (n + \frac12)\hbar\omega$：等间隔，零点能 $\frac12\hbar\omega$；$\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}$，$\hat a\psi_n = \sqrt n\,\psi_{n-1}$。
- 基态是宽 $\sqrt{\hbar/m\omega}$ 的高斯函数，$\Delta x\,\Delta p = \hbar/2$；$\psi_n \propto H_n(\xi)e^{-\xi^2/2}$，有 $n$ 个节点，宇称为 $(-1)^n$。
- 幂级数法中，可归一化性强迫级数截断，从而给出 $E = (n + \frac12)\hbar\omega$。
- $\langle x^2\rangle = (n + \frac12)\hbar/m\omega$，$\langle T\rangle = \langle V\rangle = \frac12E_n$；基态粒子出现在经典转向点之外的概率为 $1 - \erf(1) = 0.157$。
- $n$ 大时密度平均为经典的 $1/(\pi\sqrt{A^2 - x^2})$。
:::

## 习题 {#exercises}

::: exercise HCl 的零点能 {level=1 check="0.179"}
对 HCl 取 $\hbar\omega = 0.3578\,\mathrm{eV}$，求振动零点能（以 eV 计），以及 $n = 2$ 能级高于基态的能量。
::: solution
$E_0 = \frac12\hbar\omega = 0.179\,\mathrm{eV}$。在谐振子近似下，$n = 2$ 能级位于基态以上 $2\hbar\omega = 0.716\,\mathrm{eV}$ 处。
:::
:::

::: exercise 方均位移 {level=1 check="7/2"}
求态 $\psi_3$ 中的 $\langle x^2\rangle$，以 $\hbar/m\omega$ 为单位。
::: solution
由 [[#ex-moments]]，$\langle x^2\rangle = (n + \frac12)\hbar/m\omega$，所以 $n = 3$ 时为 $\frac72\,\hbar/m\omega$。
:::
:::

::: exercise 红外光子 {level=1 check="3.465"}
HCl（$\tilde\nu = 2886\,\mathrm{cm^{-1}}$）的 $0 \to 1$ 振动跃迁所吸收光子的波长是多少微米？给出四位有效数字。
::: solution
$\lambda = 1/\tilde\nu = 1/(2886\,\mathrm{cm^{-1}}) = 3.465\times10^{-4}\,\mathrm{cm} = 3.465\,\mu\mathrm m$，位于中红外。由于谐振子模型中能级等间隔，$1 \to 2$ 跃迁应有相同波长；实际测到的小差异度量的正是非简谐性。
:::
:::

::: exercise 四阶矩 {level=2 check="3/4"}
用升降算符求基态的 $\langle x^4\rangle$，以 $(\hbar/m\omega)^2$ 为单位。
::: hint
写 $\hat x^4 = (\hbar/2m\omega)^2(\hat a + \hat a^\dagger)^4$，数出能把 $\psi_0$ 变回自身的排列。
:::
::: solution
展开 $(\hat a + \hat a^\dagger)^4$ 得到由 $\hat a$ 与 $\hat a^\dagger$ 构成的十六个字。作用在 $\psi_0$ 上（最右的先作用）时，一个字对 $\int\psi_0^*(\cdot)\psi_0$ 有贡献，仅当它含有两个 $\hat a$、两个 $\hat a^\dagger$，且从不低于 $n = 0$。存活的字从右往左读是 $\hat a\hat a\hat a^\dagger\hat a^\dagger$（路径 $0\to1\to2\to1\to0$）与 $\hat a\hat a^\dagger\hat a\hat a^\dagger$（路径 $0\to1\to0\to1\to0$）。前者给出 $\sqrt1\sqrt2\sqrt2\sqrt1 = 2$，后者给出 $1\cdot1 = 1$。于是 $\langle(\hat a + \hat a^\dagger)^4\rangle_0 = 3$，

$$
\langle x^4\rangle = 3\left(\frac{\hbar}{2m\omega}\right)^2 = \frac34\left(\frac{\hbar}{m\omega}\right)^2.
$$

检验：方差为 $\sigma^2 = \hbar/2m\omega$ 的高斯函数，四阶矩为 $3\sigma^4$，结果相同。
:::
:::

::: exercise 转向点之外的概率 {level=2 check="1 - erf(1)"}
给出处于谐振子基态的粒子出现在 $V(x) > E_0$ 区域的精确概率。
::: solution
如 [[#ex-outside]]，转向点在 $\xi = \pm1$，且 $P = 2\pi^{-1/2}\int_1^\infty e^{-\xi^2}\,\dd\xi = \operatorname{erfc}(1) = 1 - \erf(1) = 0.1573$。
:::
:::

::: exercise 二能级叠加态 {level=2 check="1/sqrt(2)"}
$t = 0$ 时谐振子处于 $(\psi_0 + \psi_1)/\sqrt2$。求 $\langle x\rangle(t)$，并给出其振幅，以 $\sqrt{\hbar/m\omega}$ 为单位。
::: solution
$\Psi(x,t) = \bigl(\psi_0e^{-i\omega t/2} + \psi_1e^{-3i\omega t/2}\bigr)/\sqrt2$。由 $\hat x = \sqrt{\hbar/2m\omega}(\hat a + \hat a^\dagger)$，这两个态之间唯一的非零矩阵元是 $\int\psi_0x\psi_1 = \int\psi_1x\psi_0 = \sqrt{\hbar/2m\omega}$。于是

$$
\langle x\rangle = \frac12\sqrt{\frac{\hbar}{2m\omega}}\left(e^{-i\omega t} + e^{i\omega t}\right) = \sqrt{\frac{\hbar}{2m\omega}}\cos\omega t.
$$

振幅为 $\sqrt{\hbar/m\omega}$ 的 $1/\sqrt2$，约 $0.707$ 个振子长度；频率恰好是经典的 $\omega$。
:::
:::

::: exercise 同位素位移 {level=3 check="2070"}
氯化氘 $\mathrm{D}^{35}\mathrm{Cl}$ 与 $\mathrm{H}^{35}\mathrm{Cl}$ 有相同的化学键（相同的力常量），因为电子不在乎核的质量。取 $m_{\mathrm D} = 2.01410\,\mathrm u$，由 HCl 的值 $2886\,\mathrm{cm^{-1}}$ 预言它的振动波数（以 $\mathrm{cm^{-1}}$ 计），及其相对 HCl 的零点能。
::: solution
$\omega = \sqrt{k/\mu}$，而 $k$ 相同，所以 $\tilde\nu_{\mathrm{DCl}} = \tilde\nu_{\mathrm{HCl}}\sqrt{\mu_{\mathrm{HCl}}/\mu_{\mathrm{DCl}}}$。约化质量为 $\mu_{\mathrm{HCl}} = 0.97959\,\mathrm u$、$\mu_{\mathrm{DCl}} = (2.01410)(34.96885)/(36.98295) = 1.90441\,\mathrm u$。于是

$$
\tilde\nu_{\mathrm{DCl}} = 2886\sqrt{\frac{0.97959}{1.90441}} = 2886\times0.71721 = 2070\,\mathrm{cm^{-1}}.
$$

实测值约为 $2091\,\mathrm{cm^{-1}}$；差异来自非简谐性，它对两种分子的影响不同。零点能按相同比值 $0.717$ 降低，所以 DCl 比 HCl 在势阱中深 $0.0506\,\mathrm{eV}$。这类零点能之差使涉及氘的反应变慢，即动力学同位素效应。
:::
:::

::: exercise 升降算符幂的对易子 {level=3}
用归纳法证明 $[\hat a, (\hat a^\dagger)^n] = n(\hat a^\dagger)^{n-1}$ 对 $n \ge 1$ 成立。用它——不用 [[#thm-ho-spectrum]] 的归一化论证——证明：当 $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$ 时，$\hat a\psi_n = \sqrt n\,\psi_{n-1}$。
::: solution
$n = 1$ 时命题即 $[\hat a, \hat a^\dagger] = 1$，由 [[#lem-ladder]] 为真。设它对 $n$ 成立。则

$$
[\hat a, (\hat a^\dagger)^{n+1}] = [\hat a, (\hat a^\dagger)^n]\hat a^\dagger + (\hat a^\dagger)^n[\hat a, \hat a^\dagger] = n(\hat a^\dagger)^{n-1}\hat a^\dagger + (\hat a^\dagger)^n = (n + 1)(\hat a^\dagger)^n,
$$

这里用了 $[\hat A\hat B, \hat C]$ 型的展开 $[\hat C, \hat A\hat B] = [\hat C, \hat A]\hat B + \hat A[\hat C, \hat B]$。归纳完成。

现在把它作用于 $\psi_0$，并用 $\hat a\psi_0 = 0$：

$$
\hat a(\hat a^\dagger)^n\psi_0 = (\hat a^\dagger)^n\hat a\psi_0 + n(\hat a^\dagger)^{n-1}\psi_0 = n(\hat a^\dagger)^{n-1}\psi_0.
$$

除以 $\sqrt{n!}$，并写 $(\hat a^\dagger)^{n-1}\psi_0 = \sqrt{(n-1)!}\,\psi_{n-1}$，

$$
\hat a\psi_n = \frac{n\sqrt{(n-1)!}}{\sqrt{n!}}\,\psi_{n-1} = \sqrt n\,\psi_{n-1}.
$$
:::
:::
