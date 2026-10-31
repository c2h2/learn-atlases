1909 年，汉斯·盖革（Hans Geiger）与欧内斯特·马斯登（Ernest Marsden）用 α 粒子轰击金箔，发现约八千个入射粒子中就有一个被反弹回超过直角的方向。卢瑟福（Rutherford）两年后给出的解释——一个微小而质量集中的核——来自单个公式，它给出散射粒子数随角度的依赖。我们对物质在小尺度上结构的了解几乎全部来自同一种做法：送入一束粒子，数出每个角度上出来的粒子，再反推受力。原子核的大小、质子的电荷分布、质子内部的夸克、希格斯玻色子：全都是散射结果。

束缚态问题问的是能量。散射问题里能量由入射束固定，我们问的是角分布，即**微分截面**。本章给出它的定义，把它与定态波函数的渐近形式联系起来，并发展计算它的两种标准方法。**玻恩近似**把势当作微扰，在高能处最好用；它精确给出卢瑟福公式。**分波展开**把波按角动量分量分解，每个分量用一个数——**相移**——描述，在低能处最好用，那里只有少数几个分量重要。途中我们还将证明**光学定理**，它把总截面与前向振幅联系起来。

需要的工具是 [[quantum-1/schrodinger-equation]] 的自由粒子解、[[quantum-1/piecewise-potentials]] 的穿透问题（一维散射）、[[quantum-1/angular-momentum]] 的角动量，以及一种推导要用的、来自 [[quantum-2/time-dependent]] 的费米黄金定则。

## 截面 {#cross-sections}

一束粒子在远大于靶的横截面上均匀分布，沿 $z$ 轴逼近。**入射通量** $\Phi$ 是单位时间穿过垂直于束流方向单位面积的粒子数。放在远处、对 $(\theta, \varphi)$ 方向张一小块立体角 $\dd\Omega$ 的探测器，单位时间计数 $\dd N/\dd t$ 个粒子。

::: definition 微分截面与总截面 {#def-cross-section}
**微分截面**定义为

$$
\deriv{\sigma}{\Omega}(\theta, \varphi) = \frac{1}{\Phi}\,\frac{\dd N/\dd t}{\dd\Omega},
$$

即单位时间散射到单位立体角内的粒子数，再除以入射通量。它的量纲是面积。**总截面**为 $\sigma = \int(\dd\sigma/\dd\Omega)\,\dd\Omega$。
:::

截面是一个有效靶面积：$\sigma$ 就是入射束中被移除并被送往别处的那部分面积。核物理与粒子物理学家用**靶恩**（barn）计量它，$1\,\mathrm b = 10^{-28}\,\mathrm{m^2} = 100\,\mathrm{fm^2}$，大致是重核的几何截面。

经典力学中，**碰撞参数**为 $b$ 的粒子（不受偏转时它本会错过的靶心距离）以确定角度 $\theta(b)$ 出射。对中心力，$b$ 到 $b + \dd b$ 之间圆环内、面积 $b\,\dd b\,\dd\varphi$ 的粒子进入立体角 $\sin\theta\,\dd\theta\,\dd\varphi$，于是

$$
\deriv{\sigma}{\Omega} = \frac{b}{\sin\theta}\left\lvert\deriv{b}{\theta}\right\rvert.
$$ {#eq-classical}

::: example 经典硬球散射 {#ex-classical-sphere}
一个点粒子与半径 $a$ 的硬球发生弹性碰撞。求经典的微分截面与总截面。
::: solution
碰撞参数 $b < a$ 的粒子打在球面上，打击点处半径与束轴的夹角 $\alpha$ 满足 $b = a\sin\alpha$。反射使速度的法向分量反向，所以偏转角 $\theta = \pi - 2\alpha$，且 $b = a\sin(\frac\pi2 - \frac\theta2) = a\cos\frac\theta2$。于是 $\lvert\dd b/\dd\theta\rvert = \frac a2\sin\frac\theta2$，由 [[#eq-classical]] 得

$$
\deriv{\sigma}{\Omega} = \frac{a\cos(\theta/2)}{2\sin(\theta/2)\cos(\theta/2)}\cdot\frac a2\sin\frac\theta2 = \frac{a^2}{4}.
$$

散射各向同性，且 $\sigma = 4\pi\cdot a^2/4 = \pi a^2$，正是几何截面，符合预期：瞄准半径 $a$ 圆盘而来的每个粒子都被散射，其余的都不。
:::
:::

## 散射振幅 {#amplitude}

量子力学里没有轨道，但有定态图像。动量为 $\hbar k\hat{\mathbf z}$、能量为 $E = \hbar^2k^2/2m$ 的一束粒子是一个平面波 $e^{ikz}$，我们求不含时薛定谔方程

$$
\left(\nabla^2 + k^2\right)\psi = \frac{2m}{\hbar^2}V(\mathbf r)\,\psi
$$ {#eq-schrodinger}

对一个有限程势的解，它在远离靶处由入射平面波加上出射球面波组成：

$$
\psi(\mathbf r) \simeq e^{ikz} + f(\theta, \varphi)\,\frac{e^{ikr}}{r}, \qquad r \to \infty.
$$ {#eq-asymptotic}

函数 $f$ 就是**散射振幅**。它的量纲是长度。

::: theorem 由振幅得截面 {#thm-amplitude}
对形如 [[#eq-asymptotic]] 的定态，$\displaystyle\deriv{\sigma}{\Omega} = \lvert f(\theta, \varphi)\rvert^2$。
:::

::: proof
概率流为 $\mathbf j = (\hbar/m)\operatorname{Im}(\psi^*\nabla\psi)$。对入射波 $e^{ikz}$ 它是 $(\hbar k/m)\hat{\mathbf z}$，所以入射通量为 $\Phi = \hbar k/m$，即单位时间单位面积的粒子数（对单位振幅的波）。对散射波 $fe^{ikr}/r$，梯度（gradient）的径向分量是 $f\,(ik - 1/r)e^{ikr}/r$，到 $1/r$ 的领头阶径向流为 $(\hbar k/m)\lvert f\rvert^2/r^2$。梯度的角向分量比它小因子 $1/kr$。于是单位时间穿过远处探测器面积 $r^2\,\dd\Omega$ 的粒子数为 $(\hbar k/m)\lvert f\rvert^2\,\dd\Omega$。除以 $\Phi\,\dd\Omega$ 得 $\lvert f\rvert^2$。

有两点需要说明。任何真实实验中入射束都是有限宽度的波包，探测器在波包之外、偏离前向放置，所以那里入射流与散射流不发生干涉；在动量良好的极限下，定态分析与波包给出同样的答案。恰恰在前向方向上两者会干涉，而那个干涉正是下面光学定理的内容。
:::

## 玻恩近似 {#born}

要求 $f$，我们把 [[#eq-schrodinger]] 化成积分方程。关键是算符 $\nabla^2 + k^2$ 的格林函数。

::: lemma 出射格林函数 {#lem-green}
函数 $G(\mathbf r) = -\dfrac{e^{ikr}}{4\pi r}$ 满足 $\left(\nabla^2 + k^2\right)G = \delta^3(\mathbf r)$。
:::

::: proof
对 $r > 0$，对球对称的 $g$ 用径向拉普拉斯算符 $\nabla^2g = \frac1r\frac{\dd^2}{\dd r^2}(rg)$，得 $\nabla^2(e^{ikr}/r) = \frac1r\frac{\dd^2}{\dd r^2}e^{ikr} = -k^2e^{ikr}/r$，所以除原点外 $(\nabla^2 + k^2)G = 0$。原点附近 $G \approx -1/4\pi r$，而由静电学 $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$（[[math-methods/integral-theorems]]）。$G$ 的其余各项在原点附近为 $1$ 与 $r$ 的量级，不产生 δ 函数。所以 $(\nabla^2 + k^2)G = \delta^3(\mathbf r)$。
:::

记 $U = 2mV/\hbar^2$，积分方程

$$
\psi(\mathbf r) = e^{ikz} + \int G(\mathbf r - \mathbf r')\,U(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'
$$ {#eq-lippmann}

与 [[#eq-schrodinger]] 等价：作用 $\nabla^2 + k^2$，它湮灭 $e^{ikz}$ 并把 $G$ 变成 δ 函数。$G$ 中选取出射的 $e^{+ikr}$，就把边界条件 [[#eq-asymptotic]] 内建了进来。在远离靶处，势的程内一切 $r'$ 都满足 $r \gg r'$，$\lvert\mathbf r - \mathbf r'\rvert \approx r - \hat{\mathbf r}\cdot\mathbf r'$，并取 $\mathbf k' = k\hat{\mathbf r}$（指向探测器的出射波矢），

$$
\psi(\mathbf r) \simeq e^{ikz} - \frac{e^{ikr}}{4\pi r}\int e^{-i\mathbf k'\cdot\mathbf r'}\,U(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'.
$$

与 [[#eq-asymptotic]] 比较得到振幅的精确公式，其中仍含有未知的 $\psi$：

$$
f(\theta, \varphi) = -\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf k'\cdot\mathbf r'}\,V(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'.
$$

若势很弱，$\psi$ 在势内与入射波相差无几。把 $\psi(\mathbf r')$ 换成 $e^{i\mathbf k\cdot\mathbf r'}$（$\mathbf k = k\hat{\mathbf z}$）就是一阶玻恩近似。

::: theorem 一阶玻恩近似 {#thm-born}
到 $V$ 的一阶，

$$
f_{\mathrm B}(\theta, \varphi) = -\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf q\cdot\mathbf r}\,V(\mathbf r)\,\dd^3r, \qquad \mathbf q = \mathbf k' - \mathbf k,\quad q = 2k\sin\frac\theta2.
$$ {#eq-born}

对中心势它化为

$$
f_{\mathrm B}(\theta) = -\frac{2m}{\hbar^2q}\int_0^\infty r\,V(r)\sin(qr)\,\dd r.
$$ {#eq-born-central}
:::

::: proof
第一个公式就是刚才的替换。动量转移 $\hbar\mathbf q$ 的大小由两腰为 $k$、$k$、夹角为 $\theta$ 的等腰三角形给出：$q = 2k\sin(\theta/2)$。对中心 $V$，让 $\mathbf q$ 沿积分的极轴，于是 $\mathbf q\cdot\mathbf r = qr\cos\theta'$。角向积分为

$$
\int_0^{2\pi}\!\!\int_0^\pi e^{-iqr\cos\theta'}\sin\theta'\,\dd\theta'\,\dd\varphi' = 2\pi\int_{-1}^{1}e^{-iqru}\,\dd u = \frac{4\pi\sin(qr)}{qr},
$$

乘以 $V(r)r^2$ 再对 $r$ 积分即得 [[#eq-born-central]]。
:::

玻恩振幅是**势的傅里叶变换**在动量转移处的取值。小角度探测 $V$ 的长程特征；大动量转移探测短距离。要分辨线度 $d$ 的结构需要 $q \gtrsim 1/d$，这正是研究越来越小的结构需要越来越高能的原因。

同样的结果可由费米黄金定则得到。把体系放进体积 $L^3$ 的大箱子里，平面波为 $L^{-3/2}e^{i\mathbf k\cdot\mathbf r}$，$\langle\mathbf k'\vert\hat V\vert\mathbf k\rangle = \tilde V(\mathbf q)/L^3$，$\tilde V$ 是 [[#eq-born]] 中的傅里叶变换。动量落在 $\dd\Omega$ 内、单位能量间隔的平面波态数为 $\rho = mkL^3\,\dd\Omega/(2\pi)^3\hbar^2$，而箱中一个粒子的入射通量为 $\hbar k/mL^3$。黄金定则的速率除以通量得 $(2\pi/\hbar)(\lvert\tilde V\rvert^2/L^6)\rho\cdot mL^3/\hbar k = (m/2\pi\hbar^2)^2\lvert\tilde V(\mathbf q)\rvert^2\,\dd\Omega$，即 $\lvert f_{\mathrm B}\rvert^2\,\dd\Omega$。玻恩散射就是一阶含时微扰论。

::: example 汤川势与卢瑟福公式 {#ex-yukawa}
求汤川势 $V(r) = \beta e^{-\mu r}/r$ 的玻恩截面，并取 $\mu \to 0$、$\beta = zZe^2/4\pi\varepsilon_0$ 的极限，得到电荷 $ze$ 的粒子被电荷 $Ze$ 的核的库仑散射。
::: solution
由 [[#eq-born-central]]，

$$
f_{\mathrm B} = -\frac{2m\beta}{\hbar^2q}\int_0^\infty e^{-\mu r}\sin(qr)\,\dd r = -\frac{2m\beta}{\hbar^2q}\cdot\frac{q}{\mu^2 + q^2} = -\frac{2m\beta}{\hbar^2(\mu^2 + q^2)},
$$

其中用了 $\int_0^\infty e^{-\mu r}\sin qr\,\dd r = \operatorname{Im}\int_0^\infty e^{-(\mu - iq)r}\,\dd r = \operatorname{Im}\frac{1}{\mu - iq} = \frac{q}{\mu^2 + q^2}$。于是

$$
\deriv{\sigma}{\Omega} = \left(\frac{2m\beta}{\hbar^2(\mu^2 + q^2)}\right)^2.
$$

汤川势描述由有质量粒子传递的力（汤川的 π 介子），也描述屏蔽库仑势。现在令 $\mu \to 0$。由 $q^2 = 4k^2\sin^2(\theta/2)$ 与 $E = \hbar^2k^2/2m$，

$$
\deriv{\sigma}{\Omega} = \frac{4m^2\beta^2}{\hbar^4\cdot16k^4\sin^4(\theta/2)} = \left(\frac{\beta}{4E}\right)^2\frac{1}{\sin^4(\theta/2)}.
$$
:::
:::

::: theorem 卢瑟福截面 {#thm-rutherford}
电荷 $ze$、动能 $E$ 的非相对论粒子被固定电荷 $Ze$ 散射，有

$$
\deriv{\sigma}{\Omega} = \left(\frac{zZe^2}{16\pi\varepsilon_0E}\right)^2\frac{1}{\sin^4(\theta/2)}.
$$ {#eq-rutherford}
:::

::: proof
这就是 [[#ex-yukawa]] 中 $\mu \to 0$ 的极限，其中 $\beta/4E = zZe^2/(16\pi\varepsilon_0E)$。取这个极限要小心，因为库仑势程长无穷，渐近形式 [[#eq-asymptotic]] 会被一个对数相位修正。库仑问题的精确解（Sakurai & Napolitano 第 6 章）的振幅与玻恩振幅只差一个相位，所以 $\lvert f\rvert^2$ 与 [[#eq-rutherford]] 是精确的。卢瑟福用经典轨道经由 [[#eq-classical]] 得到了同一个公式。
:::

公式里不含 $\hbar$。三种不同的计算——经典力学、一阶量子微扰论、精确量子解——结果一致，这是库仑势特有的巧合，也是卢瑟福的幸运。

::: example 金箔上的 α 粒子 {#ex-gold}
对 $5.00\,\mathrm{MeV}$ 的 α 粒子被金（$Z = 79$）在 $\theta = 90^\circ$ 散射，计算 [[#eq-rutherford]]。取 $e^2/4\pi\varepsilon_0 = 1.440\,\mathrm{MeV\,fm}$，忽略核的反冲。
::: solution
方括号里的长度为

$$
\frac{zZe^2}{16\pi\varepsilon_0E} = \frac{2\times79\times1.440\,\mathrm{MeV\,fm}}{4\times5.00\,\mathrm{MeV}} = 11.38\,\mathrm{fm}.
$$

$90^\circ$ 时 $\sin^4 45^\circ = \frac14$，所以

$$
\deriv{\sigma}{\Omega} = \frac{(11.38\,\mathrm{fm})^2}{0.25} = 518\,\mathrm{fm^2/sr} = 5.18\,\mathrm{b/sr}.
$$

对心碰撞中最接近的距离为 $zZe^2/4\pi\varepsilon_0E = 45.5\,\mathrm{fm}$，远在金核（半径约 $7\,\mathrm{fm}$）之外，所以核表现得像点电荷，正如卢瑟福所假设的。只有当能量高到 α 粒子能触及核时，[[#eq-rutherford]] 才出现偏离——原子核半径最初就是这样测出来的。
:::
:::

::: widget plot
f: m^4/(m^2 + 4*k^2*sin(x/2)^2)^2
x: 0.05, pi
sliders: m=0.5:0.02:2:0.02; k=1:0.2:5:0.1
piticks: true
caption: 汤川势的玻恩截面（前向归一化为 $1$）对散射角 $\theta$ 作图，滑块为逆射程 $\mu$（滑块 $m$）与波数 $k$。把 $m$ 调小：曲线坍缩成前向尖峰，趋于卢瑟福的 $1/\sin^4(\theta/2)$。再在固定 $m$ 下增大 $k$：散射集中到 $\mu/k$ 量级的角度内。程为 $1/\mu$ 的势只能把波长短于这个程的粒子大角度偏转。
:::

::: warning 玻恩近似何时适用？
这一近似在势内把 $\psi$ 换成 $e^{ikz}$，所以需要那里的散射波相对 $1$ 很小。对深度 $V_0$、程 $a$ 的势，这给出两个区域。低能 $ka \lesssim 1$ 时，条件是 $\lvert V_0\rvert \ll \hbar^2/ma^2$：势必须弱到束缚不住一个束缚态。高能 $ka \gg 1$ 时，条件是 $\lvert V_0\rvert \ll \hbar^2k/ma = 2E/ka$，只要能量足够高它就总能满足。常见的错误是对慢中子与核使用玻恩振幅——那里的势深到足以束缚氘核；此时玻恩结果可能连符号都是错的。
:::

::: quiz
玻恩近似下，势 $\lambda V(\mathbf r)$ 的散射振幅如何依赖 $\lambda$？若 $V$ 变号会发生什么？
- [ ] 与 $\lambda$ 无关；截面变号。
- [x] 正比于 $\lambda$；$V \to -V$ 时截面不变。
- [ ] 正比于 $\lambda^2$；吸引势与排斥势给出不同的截面。
- [ ] 正比于 $1/\lambda$。
::: solution
$f_{\mathrm B}$ 对 $V$ 线性，所以 $\dd\sigma/\dd\Omega = \lvert f_{\mathrm B}\rvert^2$ 是二次的，分不出吸引与排斥。α 粒子与质子被核的散射、电子被核的散射，在一阶都一样。二阶玻恩近似——振幅中 $V^2$ 量级——能区分它们。
:::
:::

## 分波法 {#partial-waves}

对中心势，哈密顿量与 $\hat{\mathbf L}$ 对易，散射可以逐个角动量地分析。散射关于束轴对称，所以只出现 $m = 0$，角向函数是勒让德多项式 $P_l(\cos\theta)$。径向函数 $u_l = rR_l$ 满足 [[quantum-1/hydrogen]] 的径向方程，能量 $E = \hbar^2k^2/2m$。在势的程外它是自由解，大 $r$ 处为 $\sin(kr - l\pi/2)$ 与 $\cos(kr - l\pi/2)$ 的组合。所以无论势在里面做了什么，

$$
u_l(r) \simeq A_l\sin\left(kr - \frac{l\pi}{2} + \delta_l\right), \qquad r \to \infty,
$$

其中 $\delta_l$ 是某个实的**相移**。没有势时 $\delta_l = 0$。从远处看，势对第 $l$ 个分波的全部作用，就是把驻波的相位移动一下。

::: theorem 分波展开 {#thm-partial}
对有限程中心势，散射振幅与总截面为

$$
f(\theta) = \frac1k\sum_{l=0}^{\infty}(2l+1)\,e^{i\delta_l}\sin\delta_l\,P_l(\cos\theta),
$$ {#eq-partial}

$$
\sigma = \frac{4\pi}{k^2}\sum_{l=0}^{\infty}(2l+1)\sin^2\delta_l.
$$ {#eq-sigma-partial}
:::

::: proof
平面波有展开式 $e^{ikz} = \sum_l(2l+1)i^lj_l(kr)P_l(\cos\theta)$（瑞利公式），球贝塞尔函数在大 $r$ 处行为为 $j_l(kr) \simeq \sin(kr - l\pi/2)/kr$。把同样轴对称的完整解用相同形式写出，只是径向函数带上相移：

$$
\psi \simeq \sum_l(2l+1)i^lA_l\,\frac{\sin(kr - l\pi/2 + \delta_l)}{kr}\,P_l(\cos\theta).
$$

把每个正弦按指数展开，$\sin x = (e^{ix} - e^{-ix})/2i$。[[#eq-asymptotic]] 的散射部分是纯出射的，所以 $\psi$ 与 $e^{ikz}$ 中的入射波 $e^{-ikr}$ 必须逐项（按 $l$）相同。$\psi$ 中入射系数带着 $A_le^{-i\delta_l}$，平面波里是 $1$，所以 $A_l = e^{i\delta_l}$。于是差 $\psi - e^{ikz}$ 为

$$
\sum_l(2l+1)i^l\frac{e^{i(kr - l\pi/2)}}{2ikr}\left(e^{2i\delta_l} - 1\right)P_l(\cos\theta) = \frac{e^{ikr}}{r}\sum_l(2l+1)\frac{e^{2i\delta_l} - 1}{2ik}P_l(\cos\theta),
$$

因为 $i^le^{-il\pi/2} = 1$。又 $(e^{2i\delta} - 1)/2i = e^{i\delta}\sin\delta$，这就是 [[#eq-partial]]。总截面对 $\lvert f\rvert^2$ 用正交关系 $\int P_l(\cos\theta)P_{l'}(\cos\theta)\,\dd\Omega = 4\pi\delta_{ll'}/(2l+1)$ 积分；交叉项消失，每个 $l$ 贡献 $(4\pi/k^2)(2l+1)\sin^2\delta_l$。
:::

每个分波对总截面的贡献至多为 $4\pi(2l+1)/k^2$，在 $\delta_l = \pi/2$ 时取到：**共振**。这一**幺正性界限**表达概率守恒：一个分波散射的通量不能超过它带进来的通量。

哪些分波重要？经典地，动量 $\hbar k$、碰撞参数 $b$ 的粒子角动量为 $\hbar kb$，所以若势的程为 $a$，只有 $l \lesssim ka$ 受影响。低能 $ka \ll 1$ 时只有 $l = 0$（**s 波**散射）有贡献，截面各向同性，势的全部效应浓缩为一个数 $\delta_0$。

::: theorem 光学定理 {#thm-optical}
对中心势的弹性散射，

$$
\sigma = \frac{4\pi}{k}\operatorname{Im}f(0).
$$ {#eq-optical}
:::

::: proof
在 [[#eq-partial]] 中令 $\theta = 0$。由 $P_l(1) = 1$ 及 $\operatorname{Im}(e^{i\delta_l}\sin\delta_l) = \sin^2\delta_l$，

$$
\operatorname{Im}f(0) = \frac1k\sum_l(2l+1)\sin^2\delta_l = \frac{k}{4\pi}\sigma
$$

由 [[#eq-sigma-partial]]。
:::

这一定理远比这个证明普遍：它对任何势成立；把 $\sigma$ 取为弹性加非弹性的总和后，对任何散射过程都成立。它的含义是通量守恒。被散射出束的粒子在靶后留下阴影，而阴影由入射波与前向散射波的相消干涉产生。被移走的量必须等于被散射的量，而干涉项正比于 $\operatorname{Im}f(0)$。

::: quiz
慢中子（$ka \approx 0.01$）被半径 $a$的核散射。哪个陈述正确？
- [ ] 角分布像卢瑟福散射那样在前向有峰。
- [x] 角分布在质心系中各向同性，整个截面完全由单个相移 $\delta_0$ 决定。
- [ ] 许多分波有贡献，直到 $l \approx 1/ka = 100$。
- [ ] 截面必须小于几何面积 $\pi a^2$。
::: solution
只有 $l \lesssim ka$ 的分波受影响，而这里 $ka \ll 1$，所以只有 $l = 0$ 要紧。由 $P_0 = 1$，振幅与角度无关。s 波截面只受 $4\pi/k^2$ 限制，$ka$ 很小时它远大于 $\pi a^2$；靠近零能共振时它可以逼近这一上限。
:::
:::

::: example 低能硬球散射 {#ex-hard-sphere}
求半径 $a$ 的硬球的 s 波相移与低能截面，并与经典的 $\pi a^2$ 比较。
::: solution
球外 $l = 0$ 的径向方程是 $u'' = -k^2u$，波函数必须在 $r = a$ 处为零。所以 $u_0 = A\sin(k(r - a))$，与 $\sin(kr + \delta_0)$ 比较得 $\delta_0 = -ka$。负相移是排斥的典型特征：波被向外推。由 [[#eq-sigma-partial]]，s 波截面为

$$
\sigma_0 = \frac{4\pi}{k^2}\sin^2(ka) \to 4\pi a^2 \quad (ka \to 0).
$$

低能时所有更高阶分波都可忽略：可以证明 $\delta_l \propto (ka)^{2l+1}$。所以量子截面为 $4\pi a^2$，*四倍*于经典值。它是球的总表面积。波长比球大得多的波绕着球衍射，向四面八方散射。高能 $ka \gg 1$ 时，量子截面趋于 $2\pi a^2$ 而非 $\pi a^2$：其中一半是阴影——前向一个角宽度为 $1/ka$ 的衍射峰，从入射束中再移走 $\pi a^2$，恰好符合光学定理的要求。
:::
:::

::: widget plot
f: 4*sin(x)^2/x^2; 1
x: 0.02, 6
labels: s 波量子截面; 经典
caption: s 波硬球截面 $\sigma_0 = (4\pi/k^2)\sin^2(ka)$，以几何面积 $\pi a^2$ 为单位，对 $ka$ 作图，并画出经典值 $1$ 作比较。$ka \to 0$ 时曲线趋于 $4$：经典截面的四倍。超过 $ka \approx 1$，仅 s 波就不再是全部故事；必须加上直到 $l \approx ka$ 的分波，其和缓慢爬向 $2$——经典面积加衍射阴影。$ka = \pi, 2\pi$ 处的零点，是 s 波相移经过 $\pi$ 的整数倍、完全不散射之处。
:::

::: example 弱方势阱的两种算法 {#ex-weak-well}
对 $r < a$ 时 $V = -V_0$、之外为零、$V_0$ 很小的势，用玻恩近似计算低能截面，并与分波法的结果比较。
::: solution
低能时 $qa \ll 1$，[[#eq-born-central]] 中 $\sin(qr) \approx qr$：

$$
f_{\mathrm B} \approx -\frac{2m}{\hbar^2}\int_0^a r^2(-V_0)\,\dd r = \frac{2mV_0a^3}{3\hbar^2}, \qquad \sigma = 4\pi\left(\frac{2mV_0a^3}{3\hbar^2}\right)^2.
$$

分波法：阱内 $u_0 = \sin(Kr)$，$K^2 = k^2 + 2mV_0/\hbar^2$；阱外 $u_0 = A\sin(kr + \delta_0)$。在 $r = a$ 处匹配 $u'/u$ 得 $k\cot(ka + \delta_0) = K\cot(Ka)$。令 $k \to 0$、$V_0$ 很小，记 $\kappa^2 = 2mV_0/\hbar^2$，$\kappa a \ll 1$。则 $K \approx \kappa$，$K\cot Ka \approx \frac1a(1 - \kappa^2a^2/3)$，而 $ka + \delta_0$ 很小时左边是 $k/(ka + \delta_0)$。令两边相等，

$$
\frac{k}{ka + \delta_0} = \frac1a\left(1 - \frac{\kappa^2a^2}{3}\right), \qquad \delta_0 \approx ka\cdot\frac{\kappa^2a^2}{3} = \frac{2mV_0a^3}{3\hbar^2}\,k.
$$

于是 $\sigma = 4\pi\delta_0^2/k^2 = 4\pi(2mV_0a^3/3\hbar^2)^2$，正是玻恩结果。相移为正（吸引把波往里拉），两种方法在都适用的地方——低能的弱势——一致。
:::
:::

::: application 全同粒子的散射
两个全同粒子散射时，位于质心系角度 $\theta$ 的探测器无法分辨它接收的是散射了 $\theta$ 的入射粒子，还是散射了 $\pi - \theta$ 的靶粒子。振幅必须像 [[quantum-2/identical-particles]] 那样对称化。对自旋为 $0$ 的玻色子，如两个 α 粒子，$\dd\sigma/\dd\Omega = \lvert f(\theta) + f(\pi - \theta)\rvert^2$；对处于单态的自旋-$\frac12$ 费米子，空间振幅对称，三重态则反对称。经典物理中不存在的这一干涉项由内维尔·莫特（Nevill Mott）于 1930 年预言，不久在 α–氦与电子–电子散射中被观测到（[[#exr-mott]]）。
:::

::: history 从卢瑟福到玻恩
欧内斯特·卢瑟福（Ernest Rutherford）1911 年的论文用经典轨道导出 $1/\sin^4(\theta/2)$ 定律，并指出盖革与马斯登的大角度数据要求一个核；盖革与马斯登 1913 年详细证实了角与能量的依赖关系。1926 年马克斯·玻恩（Max Born）在薛定谔新的波动力学中处理碰撞，得到以他命名的一阶近似，并在同一篇论文中提出 $\lvert\psi\rvert^2$ 是概率密度。汉斯·法克桑（Hans Faxén）与约翰·霍尔茨马克（Johan Holtsmark）1927 年引入分波与相移方法，并用它解释了拉姆绍尔–汤森德（Ramsauer–Townsend）效应——1921 年观察到的稀有气体原子对慢电子近乎透明的现象。内维尔·莫特（Nevill Mott）1930 年算出了全同粒子的散射。光学定理由尤金·费恩贝格（Eugene Feenberg）在 1932 年使用，并由尼尔斯·玻尔、鲁道夫·佩尔斯（Rudolf Peierls）与乔治·普拉切克（George Placzek）1939 年的工作得名。伯纳德·利普曼（Bernard Lippmann）与朱利安·施温格（Julian Schwinger）1950 年把 [[#eq-lippmann]] 表述为算符形式，成为散射理论的标准起点。
:::

## 后续内容 {#leads}

散射是 [[particles/reactions]] 与 [[particles/accelerators]] 的主要实验方法。配上形状因子，玻恩近似就变成对电荷分布的测量：动量转移 $q \sim 1\,\mathrm{fm^{-1}}$ 的电子被核散射，在 1950 年代表明核密度大致均匀、半径 $R \approx 1.2A^{1/3}\,\mathrm{fm}$（[[particles/nuclear-structure]]）。[[condensed-matter/crystals]] 中晶体对 X 射线与中子的衍射就是周期势的玻恩近似：只有当 $\mathbf q$ 是倒格矢时振幅才大。在 [[quantum-2/entanglement]] 中我们抛开动力学，转向讨论两个（也许刚刚彼此散射过的）粒子的态对它们每个分别断言了什么、没有断言什么。

::: summary
- 微分截面是单位入射通量、单位立体角内的散射率。对定态 $e^{ikz} + fe^{ikr}/r$，$\dd\sigma/\dd\Omega = \lvert f\rvert^2$。
- 薛定谔方程等价于以 $-e^{ikr}/4\pi r$ 为格林函数的积分方程。其第一次迭代就是玻恩近似：$f_{\mathrm B} = -(m/2\pi\hbar^2)\tilde V(\mathbf q)$，即 $V$ 的傅里叶变换取在 $q = 2k\sin(\theta/2)$ 处。
- 汤川势给出 $f_{\mathrm B} = -2m\beta/\hbar^2(\mu^2 + q^2)$；其库仑极限是卢瑟福的 $(zZe^2/16\pi\varepsilon_0E)^2/\sin^4(\theta/2)$，后者碰巧是精确的。$5\,\mathrm{MeV}$ 的 α 粒子打金，$90^\circ$ 处为 $5.18\,\mathrm{b/sr}$。
- 玻恩近似在低能需要弱势，在高能变得可靠。
- 中心势下 $f = (1/k)\sum(2l+1)e^{i\delta_l}\sin\delta_l P_l(\cos\theta)$，$\sigma = (4\pi/k^2)\sum(2l+1)\sin^2\delta_l$。只有 $l \lesssim ka$ 有贡献；低能时只剩 s 波。
- 光学定理：$\sigma = (4\pi/k)\operatorname{Im}f(0)$，是通量守恒的表述。
- 硬球的量子截面低能为 $4\pi a^2$，高能为 $2\pi a^2$，而经典值为 $\pi a^2$。
:::

## 习题 {#exercises}

::: exercise 动量转移 {level=1 check="1"}
求 $\theta = 60^\circ$ 散射的 $q/k$。
::: solution
$q = 2k\sin(\theta/2) = 2k\sin30^\circ = k$，所以 $q/k = 1$。动量转移从前向的 $0$ 变化到后向的 $2\hbar k$。
:::
:::

::: exercise 前向与侧向 {level=1 check="(sin(pi/4)/sin(pi/36))^4"}
卢瑟福截面在 $10^\circ$ 处是 $90^\circ$ 处的多少倍？
::: solution
由 [[#eq-rutherford]]，比值为 $\sin^4(45^\circ)/\sin^4(5^\circ) = (0.7071/0.08716)^4 = 4.33\times10^{3}$。正是这种陡峭使盖革与马斯登的计数在小角与大角之间横跨五个数量级。
:::
:::

::: exercise 慢粒子撞硬球 {level=1 check="4*pi"}
一个极低能的中子被半径 $a$ 的硬球散射。给出 $\sigma/a^2$。
::: solution
由 [[#ex-hard-sphere]]，$ka \to 0$ 时 $\sigma \to 4\pi a^2$，所以 $\sigma/a^2 = 4\pi \approx 12.6$。经典答案会是 $\pi$。
:::
:::

::: exercise 卢瑟福公式的数值 {level=2 check="5.18"}
从头重做 [[#ex-gold]]：对 $5.00\,\mathrm{MeV}$ 的 α 粒子打金，求 $90^\circ$ 处的 $\dd\sigma/\dd\Omega$（以 $\mathrm{b/sr}$ 计）；再求每秒 $10^{6}$ 个 α 粒子轰击每 $\mathrm{cm^2}$ 含 $5.9\times10^{18}$ 个金原子的箔时，立体角 $1.00\times10^{-3}\,\mathrm{sr}$ 的探测器计数率。
::: solution
与例题相同，$\dd\sigma/\dd\Omega = (11.38\,\mathrm{fm})^2/0.25 = 518\,\mathrm{fm^2/sr} = 5.18\,\mathrm{b/sr}$。每单位面积含 $n_A$ 个核的薄箔，把其面积的 $n_A\,\dd\sigma$ 当作靶呈现给束流，所以计数率为

$$
\dot N = \dot N_{\mathrm{inc}}\,n_A\,\deriv{\sigma}{\Omega}\,\Delta\Omega = 10^{6}\,\mathrm{s^{-1}}\times5.9\times10^{18}\,\mathrm{cm^{-2}}\times5.18\times10^{-24}\,\mathrm{cm^2/sr}\times10^{-3}\,\mathrm{sr} = 0.031\,\mathrm{s^{-1}},
$$

其中用了 $1\,\mathrm b = 10^{-24}\,\mathrm{cm^2}$。大约每分钟两个计数：盖革与马斯登用肉眼数闪光的耐心，由此可见。
:::
:::

::: exercise 高斯势 {level=2}
求 $V(r) = V_0e^{-r^2/a^2}$ 的玻恩振幅，并证明微分截面按 $q$ 的高斯函数衰减。
::: hint
在直角坐标中算 [[#eq-born]] 的积分，$\mathbf q$ 沿 $z$。
:::
::: solution
积分分解因式：$\int e^{-iq z}e^{-(x^2 + y^2 + z^2)/a^2}\,\dd^3r = (\sqrt\pi a)^2\cdot\sqrt\pi ae^{-q^2a^2/4} = \pi^{3/2}a^3e^{-q^2a^2/4}$。所以

$$
f_{\mathrm B} = -\frac{mV_0}{2\pi\hbar^2}\pi^{3/2}a^3e^{-q^2a^2/4} = -\frac{\sqrt\pi\,mV_0a^3}{2\hbar^2}e^{-q^2a^2/4}, \qquad \deriv{\sigma}{\Omega} = \frac{\pi m^2V_0^2a^6}{4\hbar^4}e^{-q^2a^2/2}.
$$

由 $q^2 = 4k^2\sin^2(\theta/2)$，截面按 $e^{-2k^2a^2\sin^2(\theta/2)}$ 衰减：高能时散射被限制在 $\theta \lesssim 1/ka$ 内。
:::
:::

::: exercise 汤川势的总截面 {level=2}
把 [[#ex-yukawa]] 的玻恩截面对角度积分求总截面，并讨论其库仑极限。
::: solution
由 $\dd\Omega = 2\pi\sin\theta\,\dd\theta$ 与 $q^2 = 2k^2(1 - \cos\theta)$，$\dd(q^2) = 2k^2\sin\theta\,\dd\theta$，所以 $\dd\Omega = (\pi/k^2)\,\dd(q^2)$，$q^2$ 从 $0$ 到 $4k^2$：

$$
\sigma = \frac{\pi}{k^2}\left(\frac{2m\beta}{\hbar^2}\right)^2\int_0^{4k^2}\frac{\dd s}{(\mu^2 + s)^2} = \frac{\pi}{k^2}\left(\frac{2m\beta}{\hbar^2}\right)^2\left[\frac1{\mu^2} - \frac{1}{\mu^2 + 4k^2}\right] = \left(\frac{2m\beta}{\hbar^2}\right)^2\frac{4\pi}{\mu^2(\mu^2 + 4k^2)}.
$$

$\mu \to 0$ 时它按 $1/\mu^2$ 发散：未屏蔽的库仑场无论把多远的粒子都至少偏转某个小角度，总截面无穷。真实原子在原子尺度上屏蔽核，此时 $1/\mu$ 大致就是这个尺度。
:::
:::

::: exercise 零能共振 {level=3 check="pi^2/8"}
对深度 $V_0$、半径 $a$ 的吸引方势阱，定义 $\kappa_0 = \sqrt{2mV_0}/\hbar$。证明 s 波**散射长度** $a_s = -\lim_{k\to0}\delta_0/k$ 为 $a_s = a - \tan(\kappa_0a)/\kappa_0$，于是 $\sigma \to 4\pi a_s^2$。求 $a_s$ 变为无穷的最小深度，并以无量纲数 $mV_0a^2/\hbar^2$ 给出。
::: hint
用 [[#ex-weak-well]] 的匹配条件 $k\cot(ka + \delta_0) = K\cot(Ka)$，令 $k \to 0$ 时 $K \to \kappa_0$。
:::
::: solution
$k \to 0$ 时 $\delta_0 \to -ka_s$，所以 $ka + \delta_0 \to k(a - a_s)$，$k\cot(k(a - a_s)) \to 1/(a - a_s)$。匹配得

$$
\frac{1}{a - a_s} = \kappa_0\cot(\kappa_0a), \qquad a_s = a - \frac{\tan(\kappa_0a)}{\kappa_0}.
$$

于是 $\sigma = 4\pi\delta_0^2/k^2 \to 4\pi a_s^2$。散射长度在 $\tan(\kappa_0a) = \infty$ 时发散，第一次在 $\kappa_0a = \pi/2$，即 $2mV_0a^2/\hbar^2 = \pi^2/4$，亦即

$$
\frac{mV_0a^2}{\hbar^2} = \frac{\pi^2}{8}.
$$

这正是势阱第一次出现束缚态的深度（[[quantum-1/piecewise-potentials]] 中三维球方势阱带条件 $u(0) = 0$）。在它附近低能截面大得惊人。中子–质子单态体系就接近这种情形：$a_s \approx -23.7\,\mathrm{fm}$，而程只有约 $2\,\mathrm{fm}$。
:::
:::

::: exercise 玻恩近似与光学定理 {level=3}
证明对实的势，一阶玻恩振幅在前向是实的，因而 $\operatorname{Im}f_{\mathrm B}(0) = 0$，而 $\sigma_{\mathrm B} > 0$。解释这与 [[#thm-optical]] 为何不矛盾。
::: solution
$\theta = 0$ 时 $\mathbf q = 0$，[[#eq-born]] 给出 $f_{\mathrm B}(0) = -(m/2\pi\hbar^2)\int V\,\dd^3r$，对实 $V$ 是实的。但 $\sigma_{\mathrm B} = \int\lvert f_{\mathrm B}\rvert^2\,\dd\Omega$ 为正。光学定理把 $V$ 量级的量 $\operatorname{Im}f(0)$ 与 $V^2$ 量级的量 $\sigma$ 联系起来。所以只有当 $\operatorname{Im}f(0)$ 从 $V^2$ 阶开始时，它才逐阶成立：$V^2$ 阶由二阶玻恩项补足。一阶玻恩近似在它有效的那个阶上与定理相容，只在它并不声称要计算的 $V^2$ 阶上违背定理。从 [[#eq-partial]] 也能看出这一点：相移很小时 $e^{i\delta}\sin\delta = \delta + i\delta^2 + \cdots$，实部是一阶，虚部是二阶。
:::
:::

::: exercise α 粒子被氦散射 {#exr-mott level=3 check="2"}
α 粒子（$^4\mathrm{He}$ 核，自旋 $0$）在低能下被氦核散射，此时相互作用纯粹是库仑的。在质心系中，$\theta = 90^\circ$ 的截面与同电荷同质量的可区分粒子所预期的值相差多少倍？
::: solution
对可区分粒子，$\theta$ 处的探测器既计数散射了 $\theta$ 的入射粒子，也计数散射了 $\pi - \theta$ 的靶粒子，所以预期计数率对应 $\lvert f(\theta)\rvert^2 + \lvert f(\pi - \theta)\rvert^2$。对全同玻色子振幅相加：$\lvert f(\theta) + f(\pi - \theta)\rvert^2$。$\theta = 90^\circ$ 时 $f(\theta) = f(\pi - \theta)$，所以玻色子结果是 $\lvert2f\rvert^2 = 4\lvert f\rvert^2$，可区分粒子结果是 $2\lvert f\rvert^2$。比值为 $2$。偏离 $90^\circ$ 时干涉项振荡，因为精确的库仑振幅带着依赖角度的相位；1930 年查德威克（Chadwick）观测到了这些振荡，作为 α 粒子服从玻色统计的检验。
:::
:::
