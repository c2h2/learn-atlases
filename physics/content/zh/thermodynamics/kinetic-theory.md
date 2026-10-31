温度计和压强表并不知道气体是由分子构成的。[[thermodynamics/temperature]] 里的理想气体定律和 [[thermodynamics/first-law]] 里的内能，都把样品当作一个具有压强、体积和温度的单一对象来处理。分子动理论取另一种立场。气体是海量运动的分子，器壁上的压强是这些分子交付动量的平均速率，而温度是这些运动的平均动能的量度。两种立场在重叠之处必须一致，而一致恰恰定出了联系它们的那个常数。

本章对稀薄气体导出这种一致。我们从弹性碰撞得到 $P = \tfrac13 n_V m \langle v^2 \rangle$，把它与 $P = n_V k_B T$ 配对，读出 $\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T$。能量均分接着说明：当分子能够转动或振动时，这份能量如何分摊。麦克斯韦（Maxwell）分布说的是速率如何摊开——这与它们的方均值是多少是两个问题。控制逸出的碰壁通量依赖平均速率而不是方均根速率，这两种平均不可互换。

全文之中，$k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$ 是玻尔兹曼（Boltzmann）常数，$N_A = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$ 是阿伏加德罗常数，$R = N_A k_B = 8.314462618\,\mathrm{J/(mol\cdot K)}$。摩尔数记作 $n$，分子数 $N = n N_A$，数密度记作 $n_V = N/V$，以免与 $n$ 混淆。功若出现，沿用 [[thermodynamics/first-law]] 的热学符号：$\Delta U = Q + W$，$W$ 是对系统做的功。[[mechanics/work-energy]] 里的力学恒等式 $W_{\mathrm{net}} = \Delta K$ 是另一本账，说的是单个质点和合力做的功。不要把它的符号搬进热力学第一定律的题目。

## 模型

推导需要一个确定的力学图像。我们在做任何平均之前把它摆出来，因为下面每个公式在这些限制撤掉一条时都会失效。

::: definition 稀薄气体的分子动模型 {#def-model}
本章意义上的**稀薄气体**是体积 $V$ 的容器中 $N$ 个质量各为 $m$ 的分子的集合，且满足：

1. $N$ 很大，分子自身的体积相对 $V$ 可以忽略。
2. 碰撞之间分子间互不施力，所以气体的能量纯粹是动能。
3. 与器壁以及分子彼此的碰撞都是弹性的。
4. 平衡时没有哪个方向是特殊的：气体整体静止，三个转轴平权。

**数密度**为 $n_V = N/V$。
:::

第一条就是"稀薄"在这里的含义。常压下的空气很好地满足它，理想气体定律的精度可达千分之一；液体就不满足。第二条解释了理想气体的内能为何只依赖温度：没有一份势能能记得体积。这就是 [[thermodynamics/first-law]] 中焦耳自由膨胀结果的微观解读。第三条使速率不至于衰减；吸收动能的器壁会给气体降温，而我们描述的是平衡，不是泄漏。第四条排除了一阵风。若气体具有整体速度，下面的平均要在气体静止系中取。

列表里没有一条说每个分子速率相同。论证的早期版本有时这样假设，而压强公式碰巧经得起这个假设。穿过小孔的分子通量经不起。我们从一开始就保留一个分布，并把平均值明确写出。

::: definition 方均速率 {#def-mean-square}
若分子的速率为 $v_1,\ldots,v_N$，**方均速率**为

$$
\langle v^2 \rangle = \frac{1}{N}\sum_{i=1}^{N} v_i^2,
$$ {#eq-mean-square}

**方均根速率**为 $v_{\mathrm{rms}} = \sqrt{\langle v^2 \rangle}$。平方的平均不是平均的平方：除非每个速率相同，$\langle v^2 \rangle \neq \langle v \rangle^2$。
:::

同一个尖括号表示对分子取平均，或等价地，对大样品中单个分子的概率分布取平均。对分量，$\langle v_x^2 \rangle$ 是 $v_x^2$ 对全体分子的平均，包括那些正在离开某面器壁的分子。

::: intuition 是撞击，不是静态的推
模型中的分子沿直线穿过容器，直到撞上什么。器壁只在碰撞期间感到力。两次撞击之间力为零。稳定的压强，是撞击频繁到一冲一冲的力糊成恒力时，仪表记下的读数。下面的计算就是对这些一冲一冲取平均，不是新造一种力。
:::

## 压强：动量流

考虑器壁上一块面积为 $A$ 的小面元，固定在实验室里，其外法线沿 $x$ 轴正向。以 $v_x > 0$ 撞上它的分子弹性地反弹回去。器壁静止且比分子重得多，所以分子的动能不变，速度的法向分量反转：$v_x \to -v_x$。分子的 $x$ 动量因此改变 $-m v_x - m v_x = -2 m v_x$。由 [[mechanics/momentum]] 中的冲量定律，交给器壁的冲量为 $+2 m v_x$，朝外。

分子源源不断地到达。设 $n(v_x)\,\dd v_x$ 为 $x$ 速度介于 $v_x$ 与 $v_x + \dd v_x$ 之间的单位体积分子数，于是 $\int_{-\infty}^{\infty} n(v_x)\,\dd v_x = n_V$。在短时间 $\dd t$ 内，给定正 $v_x$ 的分子中撞上小面元的那些，是距离它 $v_x\,\dd t$ 以内的那些，也即位于体积 $A v_x\,\dd t$ 之内的那些。其数目为 $n(v_x)\,\dd v_x\, A v_x\,\dd t$。

::: theorem 稀薄气体的压强 {#thm-pressure}
对满足 [[#def-model]] 的气体，器壁上的压强为

$$
P = \tfrac13 n_V m \langle v^2 \rangle.
$$ {#eq-pressure}

等价地，$P = \tfrac13 \rho\, \langle v^2 \rangle$，其中 $\rho = n_V m$ 是质量密度。
:::

::: proof
时间 $\dd t$ 内交给小面元的动量，对一切 $v_x > 0$ 计数，为

$$
\dd p = \int_{v_x > 0} (2 m v_x)\, n(v_x)\, A v_x\,\dd t\,\dd v_x.
$$

小面元上的平均力为 $\dd p/\dd t$，压强是该力除以 $A$：

$$
P = \int_{v_x > 0} 2 m v_x^2\, n(v_x)\,\dd v_x.
$$

平衡时没有哪个方向是特殊的，这意味着 $n(v_x)$ 是偶函数：具有 $-v_x$ 的分子与具有 $v_x$ 的一样多。被积函数 $v_x^2 n(v_x)$ 因此也是偶函数，整个积分由正半轴承担一半，

$$
\int_{v_x > 0} v_x^2\, n(v_x)\,\dd v_x = \tfrac12 \int_{-\infty}^{\infty} v_x^2\, n(v_x)\,\dd v_x = \tfrac12 n_V \langle v_x^2 \rangle.
$$

压强积分里的因子 $2$ 与 $\tfrac12$ 相消，得

$$
P = n_V m \langle v_x^2 \rangle.
$$ {#eq-pressure-x}

这就是单方向的结果：通量乘动量转移 $2 m v_x$，再取平均。各向同性——[[#def-model]] 的第四款——使三个转轴平权。由 $v^2 = v_x^2 + v_y^2 + v_z^2$，

$$
\langle v^2 \rangle = \langle v_x^2 \rangle + \langle v_y^2 \rangle + \langle v_z^2 \rangle = 3\langle v_x^2 \rangle,
$$

所以 $\langle v_x^2 \rangle = \tfrac13 \langle v^2 \rangle$。代入 [[#eq-pressure-x]] 得 [[#eq-pressure]]。密度形式是同一方程配上 $\rho = n_V m$。

平衡时，分子间碰撞不改变结果。把某个分子撞离小面元的一次碰撞，平均来说都有另一次把某个分子撞向它的碰撞相抵。分布 $n(v_x)$ 描述的已经就是紧贴器壁的那团气体。
:::

因子 $\tfrac13$ 不是硬凑的。三分之一来自只用一根轴，而动量转移里的那个 $2$ 被"只有一半分子朝器壁运动"抵消。常见的疏漏有二：用 $m v_x$ 代替 $2 m v_x$，忘了反转使动量改变量为来值的两倍；或者只对撞上的分子平均 $v_x^2$，却忘了 $\langle v_x^2 \rangle$ 是对所有人定义的。

容器的形状自始至终没有进来。边长 $L$ 的正方体中，同一个关系可以从一次往返得到：分子每 $2L/v_x$ 撞上给定的一面一次，每次交付 $2 m v_x$，于是因子 $2$ 相消，平均力为 $m v_x^2/L$。除以面面积 $L^2$ 再次得到 [[#eq-pressure-x]]。正方体是方便，不是限制。

## 温度与动能

理想气体定律按分子而非摩尔写是 $P V = N k_B T$，即 $P = n_V k_B T$。它是关于热力学温度的实验陈述，温度已在 [[thermodynamics/temperature]] 中固定。分子动理论给出了同一个压强的第二个表达式。两者只能同时成立，条件是平均动能与 $T$ 拴在一起。

::: theorem 平动动能 {#thm-ke}
对服从 [[#eq-pressure]] 与理想气体定律 $P = n_V k_B T$ 的稀薄气体，

$$
\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T,
$$ {#eq-ke}

于是

$$
v_{\mathrm{rms}} = \sqrt{\frac{3 k_B T}{m}}.
$$ {#eq-vrms}

整个样品的平动动能为

$$
U_{\mathrm{trans}} = N\cdot\tfrac32 k_B T = \tfrac32 n R T.
$$ {#eq-utrans}
:::

::: proof
令 $P$ 的两个公式相等：

$$
\tfrac13 n_V m \langle v^2 \rangle = n_V k_B T.
$$

$n_V \neq 0$ 时这就是 $\tfrac13 m \langle v^2 \rangle = k_B T$，乘以 $\tfrac32$ 得 [[#eq-ke]]。方均根速率是 $\langle v^2 \rangle = 3 k_B T/m$ 的正平方根。把 $\tfrac12 m \langle v^2 \rangle$ 对 $N$ 个分子求和得 $U_{\mathrm{trans}} = \tfrac32 N k_B T$。恒等式 $N k_B = n R$ 把它化为摩尔形式。
:::

[[#eq-ke]] 是这个模型下热力学温度的动理学定义：$T$ 正比于每分子的平均平动动能，且同温度下各种分子的比例系数相同。同一房间里，一个氢分子和一个氮分子有相同的平均平动能，因而典型速率相差很大，因为质量不同。轻的分子快 $\sqrt{m_{\mathrm{heavy}}/m_{\mathrm{light}}}$ 倍。

若气体是单原子的且电子自由度被冻结，平动就是内能的全部。于是 $U = \tfrac32 n R T$，定容摩尔热容为 $C_{V,m} = \tfrac32 R$，且 $\gamma = C_{P,m}/C_{V,m} = \tfrac53$，其中用了 [[thermodynamics/first-law]] 的 $C_{P,m} - C_{V,m} = R$。对其他任何气体，[[#eq-utrans]] 只是平动份额。转动与振动添上更多项，下一节来数。

两种读法都合法，但不该混在同一句话里。本章从 [[thermodynamics/temperature]] 接过理想气体定律，靠比较把 [[#eq-ke]] 读出来。用 [[#eq-ke]] 定义 $T$、再推出 $P V = N k_B T$，是 [[statistical-mechanics/classical-gas]] 的路线。

用声速核对 $v_{\mathrm{rms}}$ 的量级。由 $P = \tfrac13 \rho \langle v^2 \rangle$ 与 [[oscillations/sound]] 中的 $v_{\mathrm{s}} = \sqrt{\gamma P/\rho}$，

$$
v_{\mathrm{s}}^2 = \gamma \frac{P}{\rho} = \gamma \frac{\langle v^2 \rangle}{3},
$$

所以 $v_{\mathrm{s}} = v_{\mathrm{rms}}\sqrt{\gamma/3}$。$\gamma = 7/5$ 时因子为 $\sqrt{1.4/3} \approx 0.683$：声音比背着它跑的无规则分子运动慢，但同一量级。氮气的数值在 [[#ex-n2-speeds]]。

## 能量均分

平动给出三个二次贡献 $\tfrac12 m v_x^2$、$\tfrac12 m v_y^2$、$\tfrac12 m v_z^2$，而 [[#eq-ke]] 说它们每一个平均为 $\tfrac12 k_B T$。这个模式是普遍的。它就是经典能量均分定理，也是热容以每摩尔 $\tfrac12 R$ 的整数倍出现的原因。

证明需要一个积分，速率分布归一化时还要再一次用到。我们单独记下。

::: lemma 高斯积分 {#lem-gauss}
对任意 $b > 0$，

$$
\int_{-\infty}^{\infty} e^{-b q^2}\,\dd q = \sqrt{\frac{\pi}{b}},
$$ {#eq-gauss}

以及

$$
\int_{-\infty}^{\infty} q^2 e^{-b q^2}\,\dd q = \tfrac12 \sqrt{\frac{\pi}{b^3}}.
$$ {#eq-gauss-q2}
:::

::: proof
写 $I(b) = \int_{-\infty}^{\infty} e^{-b x^2}\,\dd x$。于是

$$
I(b)^2 = \int_{-\infty}^{\infty}\int_{-\infty}^{\infty} e^{-b(x^2+y^2)}\,\dd x\,\dd y.
$$

在平面的极坐标下，$x^2 + y^2 = r^2$ 且 $\dd x\,\dd y = r\,\dd r\,\dd \theta$，$\theta$ 从 $0$ 跑到 $2\pi$、$r$ 从 $0$ 到 $\infty$。角度积分产生 $2\pi$，而 $\int_0^{\infty} e^{-b r^2} r\,\dd r = 1/(2b)$，所以 $I(b)^2 = 2\pi\cdot(1/(2b)) = \pi/b$。故 $I(b) = \sqrt{\pi/b}$，取正根。

两边对 $b$ 求导。$b > 0$ 时积分收敛得足够好，导数可以进到积分号内：

$$
\int_{-\infty}^{\infty} -q^2 e^{-b q^2}\,\dd q = \deriv{}{b}\left(\pi^{1/2} b^{-1/2}\right) = -\tfrac12 \sqrt{\frac{\pi}{b^3}}.
$$

丢掉负号即得 [[#eq-gauss-q2]]。
:::

::: theorem 单个二次项的能量均分 {#thm-equipartition}
设分子的能量含一项 $\varepsilon = a q^2$，$a > 0$，且 $q$ 是一条笛卡儿动量或位置坐标，取值于整个实轴。设温度为 $T$ 的平衡下 $q$ 的概率密度只是该项的玻尔兹曼权重，

$$
p(q) = \frac{e^{-a q^2/(k_B T)}}{\int_{-\infty}^{\infty} e^{-a q^2/(k_B T)}\,\dd q}.
$$

则该项中的平均能量为

$$
\langle a q^2 \rangle = \tfrac12 k_B T.
$$ {#eq-equipartition}
:::

::: proof
置 $b = a/(k_B T)$。分母是 [[#eq-gauss]]。平均值的分子是 $a$ 乘 [[#eq-gauss-q2]]，所以

$$
\langle q^2 \rangle = \frac{\tfrac12 \sqrt{\pi/b^3}}{\sqrt{\pi/b}} = \frac{1}{2b} = \frac{k_B T}{2a}.
$$

乘以 $a$ 得 $\tfrac12 k_B T$。常数 $a$ 消掉了：更硬的弹簧或更重的质量改变的是 $q$ 的分散程度，平均能量纹丝不动。
:::

玻尔兹曼权重在这一阶段是假设，不是碰壁的推论。它是经典统计力学的平衡分布，在 [[statistical-mechanics/canonical]] 中推导。定理所添加的是求值：一旦权重对能量呈指数形，每个二次项都贡献同样的 $\tfrac12 k_B T$，与平方项前的系数无关。

数一数分子中的二次项，记作 $f$，在这里称为自由度数。

平动永远贡献三个，从而每分子 $\tfrac32 k_B T$，与 [[#eq-ke]] 相符。单原子气体在通常温度下 $f = 3$。其摩尔内能与热容为

$$
U = \tfrac32 n R T, \qquad C_{V,m} = \tfrac32 R, \qquad C_{P,m} = \tfrac52 R, \qquad \gamma = \tfrac53.
$$

双原子分子除平动外还有转动。经典刚体会有三个转动二次项，$\tfrac12 I_1\omega_1^2$ 与另外两个配对项。对双原子分子，三个主转动惯量之一微小：核都在轴上，绕该轴的转动惯量只是电子的。相应的能级间隔太大，只要分子还完好，这个自由度就不被激发。可用的计数是两个转动项，不是三个。室温下这两个已充分激发而振动未激发，

$$
f = 5, \qquad U = \tfrac52 n R T, \qquad C_{V,m} = \tfrac52 R, \qquad \gamma = \tfrac75 = 1.40.
$$

双原子分子的振动，按沿键方向的一维谐振子处理，再贡献两个二次项：相对运动的动能与伸长的势能。两者都充分激发时 $f = 7$、$C_{V,m} = \tfrac72 R$、$\gamma = 9/7$。"充分激发"是经典的说法。量子力学在能级间隔相对 $k_B T$ 很大时把一个模式冻结。

对氮气，振动波数为 $2359\,\mathrm{cm^{-1}}$。对应的温度为 $\theta_{\mathrm{vib}} = hc\tilde\nu/k_B$。以 $h = 6.62607015\times 10^{-34}\,\mathrm{J\,s}$、$c = 2.99792458\times 10^{8}\,\mathrm{m/s}$、$\tilde\nu = 2359\times 100\,\mathrm{m^{-1}}$，

$$
\theta_{\mathrm{vib}} = 3394\,\mathrm{K}.
$$

$300\,\mathrm{K}$ 时玻尔兹曼因子 $e^{-\theta_{\mathrm{vib}}/T}$ 约为 $1.22\times 10^{-5}$。振动对房间里 $\mathrm{N_2}$ 热容的贡献几乎是零。$\mathrm{N_2}$ 的转动常数约为 $1.9987\,\mathrm{cm^{-1}}$，同样的换算给出 $\theta_{\mathrm{rot}} = 2.88\,\mathrm{K}$。室温远高于它，两个转动项拿足经典的份额。这就是为什么第一定律那章的绝热线在通常温度下对空气和氮气取 $\gamma = 1.40$，也是为什么这个值并不是一切温度下的自然定律。把双原子气体加热得足够热，$\gamma$ 便随振动开始工作而趋向 $9/7$。开启是渐变的，能量均分描述的是两个平台，不是平台之间的曲线。

| 气体，常温 | $f$ | $C_{V,m}$ | $\gamma$ |
|---|---|---|---|
| 单原子 | $3$ | $\tfrac32 R$ | $\tfrac53$ |
| 双原子，振动冻结 | $5$ | $\tfrac52 R$ | $\tfrac75$ |
| 双原子，振动全开 | $7$ | $\tfrac72 R$ | $\tfrac97$ |

表中是经典计数。温度落在两个平台之间时，它不能代替实测热容。

## 速率分布

能量均分定出了 $\langle v^2 \rangle$，却没有说分子里有多少是慢的。逸出、谱线的多普勒宽度、碰撞的频率，问的都是一个分布。麦克斯韦（Maxwell）在 1860 年给出了它。

速度分布来自平动能 $\tfrac12 m(v_x^2 + v_y^2 + v_z^2)$ 的玻尔兹曼权重，连同对每个分量各用一次的归一化 [[#eq-gauss]]。速度落在小盒子 $\dd v_x\,\dd v_y\,\dd v_z$ 内的概率是

$$
\left(\frac{m}{2\pi k_B T}\right)^{3/2} \exp\left(-\frac{m(v_x^2+v_y^2+v_z^2)}{2 k_B T}\right) \dd v_x\,\dd v_y\,\dd v_z.
$$

指数是玻尔兹曼因子。前置因子使三个高斯积分合一。这是关于速度矢量的分布。速率测量把方向扔掉了。速率介于 $v$ 与 $v + \dd v$ 之间的矢量填满半径 $v$、厚度 $\dd v$ 的球壳，而该球壳的面积为 $4\pi v^2$。乘以球壳的体积就得到速率的分布。

::: definition 麦克斯韦速率分布 {#def-maxwell}
温度为 $T$ 的平衡下，质量为 $m$ 的分子速率介于 $v$ 与 $v + \dd v$ 之间的概率为 $f(v)\,\dd v$，其中

$$
f(v) = 4\pi v^2 \left(\frac{m}{2\pi k_B T}\right)^{3/2} \exp\left(-\frac{m v^2}{2 k_B T}\right)
$$ {#eq-maxwell}

对 $v \geq 0$ 成立，$v < 0$ 时 $f(v) = 0$。因子 $4\pi v^2$ 是几何的球壳。指数是动能的玻尔兹曼因子。
:::

最概然速率是 $f$ 的最大，不是指数的最大。单看指数会在 $v = 0$ 处取峰，但球壳面积在那里消失，$f(0) = 0$。速度空间的原点没有体积，所以即使零是最便宜的能量，分子的速率也几乎从不是零。

::: proposition 三个特征速率 {#prop-speeds}
对分布 [[#eq-maxwell]]，最概然速率、平均速率与方均根速率分别为

$$
v_p = \sqrt{\frac{2 k_B T}{m}}, \qquad
\langle v \rangle = \sqrt{\frac{8 k_B T}{\pi m}}, \qquad
v_{\mathrm{rms}} = \sqrt{\frac{3 k_B T}{m}}.
$$ {#eq-three-speeds}

三者按 $v_p < \langle v \rangle < v_{\mathrm{rms}}$ 排列。
:::

::: proof
写 $\alpha = m/(2 k_B T)$，于是 $f(v) = 4\pi v^2 (\alpha/\pi)^{3/2} e^{-\alpha v^2}$，而 $v_p$ 仍待求。对 $v > 0$，

$$
\deriv{}{v}\ln f = \frac{2}{v} - 2\alpha v.
$$

导数在 $v^2 = 1/\alpha$ 即 $v = \sqrt{2 k_B T/m}$ 处消失。$v$ 更小时 $\ln f$ 的导数为正，更大时为负，所以驻点是极大。它就是 $v_p$。

平均速率为 $\langle v \rangle = \int_0^{\infty} v f(v)\,\dd v$。换元 $u = v^2$ 给出 $\int_0^{\infty} v^3 e^{-\alpha v^2}\,\dd v = 1/(2\alpha^2)$，于是

$$
\langle v \rangle = 4\pi \left(\frac{\alpha}{\pi}\right)^{3/2} \cdot \frac{1}{2\alpha^2} = \frac{2}{\sqrt{\pi\alpha}} = \sqrt{\frac{8 k_B T}{\pi m}},
$$

最后一步用了 $1/\alpha = 2 k_B T/m$。方均根速率已在 [[#eq-vrms]] 中由能量均分得到，并不需要这个分布；计算 $\int_0^{\infty} v^2 f(v)\,\dd v$ 返回同样的 $3 k_B T/m$。

排大小就比较平方，以 $k_B T/m$ 为单位它们是 $2$、$8/\pi$ 与 $3$。$8/\pi \approx 2.546$ 严格落在 $2$ 与 $3$ 之间，而三个速率都为正，所以 $v_p < \langle v \rangle < v_{\mathrm{rms}}$。比值是精确的：

$$
\frac{\langle v \rangle}{v_p} = \frac{2}{\sqrt{\pi}}, \qquad
\frac{v_{\mathrm{rms}}}{v_p} = \sqrt{\frac{3}{2}}, \qquad
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3\pi}{8}}.
$$
:::

分布关于峰不对称。一条尾巴伸向高速，那里指数衰减却从不断然截止。这条尾巴把平均拉到峰之上，而使 $v^2$ 加权的方均根被拉得更远。只要以 $v_p$ 为单位量速率，升温就不改变形状：这个尺度上每个麦克斯韦分布都是同一条曲线。改变 $T$ 或 $m$ 只改变 $v_p$ 落在每秒多少米上。

::: widget plot
f: x^2*exp(-x^2)
x: 0, 4
caption: 速率分布在最概然速率为 1 的单位制下的形状。这里没有可拖动的东西：在这个尺度上，形状不依赖温度与质量。峰在 $x = 1$，不在方均根处——方均根在 $1.22$ 附近。
:::

画出的函数是 $x^2 e^{-x^2}$，即 [[#eq-maxwell]] 去掉常数因子、取 $x = v/v_p$。它的最大在 $x = 1$，用的正是证明里同一个导数。平均位于 $2/\sqrt{\pi} \approx 1.128$，$v_{\mathrm{rms}}$ 位于 $\sqrt{3/2} \approx 1.225$。

::: quiz
对麦克斯韦分布的气体，哪句话是对的？
- [ ] 压强依赖平均速率的平方 $\langle v \rangle^2$
- [x] 压强依赖方均速率 $\langle v^2 \rangle$，且 $\langle v^2 \rangle$ 大于 $\langle v \rangle^2$
- [ ] 最概然速率是 $v_p$、$\langle v \rangle$、$v_{\mathrm{rms}}$ 中最大的
- [ ] 把分布换成单一速率 $v_{\mathrm{rms}}$，压强和逸出率都不变
::: solution
[[#eq-pressure]] 用的是 $\langle v^2 \rangle$。[[#prop-speeds]] 把 $v_p$ 排在大小顺序的底端而不是顶端，且比值 $\langle v^2 \rangle/\langle v \rangle^2 = 3\pi/8 > 1$。取 $v_{\mathrm{rms}}$ 的单一速率能重现 $\langle v^2 \rangle$ 因而重现压强，但逸出率依赖更小的 $\langle v \rangle$。末选项因此不成立；细节见 [[#prop-effusion]]。
:::
:::

## 逸出，以及单一速率错在哪里

压强关心动量，所以关心 $v_x^2$。打在器壁上的分子数关心它们到达的频繁程度，那是另一种平均。

::: proposition 逸出通量 {#prop-effusion}
平衡下，单位时间击中单位面积器壁的分子数为

$$
\Phi = \tfrac14 n_V \langle v \rangle = n_V \sqrt{\frac{k_B T}{2\pi m}}.
$$ {#eq-flux}

若在器壁上开一个小孔且外面是真空，$\Phi$ 就是单位时间单位面积逸出的分子数，前提是小孔足够小，使紧贴它的气体仍保持平衡。这种逃逸称为**逸出**。
:::

::: proof
把 [[#thm-pressure]] 证明里的计数重做一遍，累加的是分子而不是动量。单位时间穿过单位面积的分子数为

$$
\Phi = \int_{v_x > 0} v_x\, n(v_x)\,\dd v_x.
$$

对麦克斯韦分布，$v_x$ 的边缘密度是单个高斯 $n(v_x) = n_V \sqrt{\alpha/\pi}\, e^{-\alpha v_x^2}$，其中 $\alpha = m/(2 k_B T)$。于是

$$
\int_0^{\infty} v_x e^{-\alpha v_x^2}\,\dd v_x = \frac{1}{2\alpha},
$$

且 $\Phi = n_V \sqrt{\alpha/\pi}\cdot(1/(2\alpha)) = n_V/(2\sqrt{\pi\alpha})$。代入 $\alpha$ 得 $n_V\sqrt{k_B T/(2\pi m)}$。与 [[#eq-three-speeds]] 对照可见这恰为 $\tfrac14 n_V \langle v \rangle$。
:::

压强与温度固定时，$n_V = P/(k_B T)$ 对一切理想气体相同。通量便只经 $\langle v \rangle \propto 1/\sqrt{m}$ 依赖气体。轻气体比较重气体逸出得快，倍数是质量比的平方根。这就是格雷厄姆（Graham）逸出定律。大开阀门时它不是定律：那时气体作为流体流动，速率由压差决定，而不是由一个个分子的飞行决定。

每个分子都取单一速率 $v_{\mathrm{rms}}$、方向仍然随机的模型给出正确的压强，因为压强只要 $\langle v^2 \rangle$，而这个模型正是照它装配的。同一个模型给出的碰壁通量是 $n_V v_{\mathrm{rms}}/4$ 而不是 $n_V \langle v \rangle/4$。它把逸出率高估

$$
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3\pi}{8}} \approx 1.085.
$$

两个平均回答两个不同的问题，这正是下面那个警告的要点。平均自由程结构相同。有效直径为 $d$ 的分子呈现一个靶面积 $\pi d^2$。该用的速率是相对速率。麦克斯韦分布的平均相对速率是 $\sqrt{2}\,\langle v \rangle$，因为两个独立分子的相对速度的方差是单个分子速度的两倍，而平均速率按该方差的平方根缩放。碰撞之间走过的平均距离因而是

$$
\lambda = \frac{1}{\sqrt{2}\,\pi d^2 n_V}.
$$ {#eq-mfp}

$\sqrt{2}$ 是相对速率修正。略去它是常见的简化；它不是平衡结果。

::: warning 方均值、平均的平方，以及单一速率
$\langle v^2 \rangle$ 不是 $\langle v \rangle^2$。压强用的是方均值。麦克斯韦分布中两者之比是固定数 $3\pi/8$，不是 $1$。取 $v_{\mathrm{rms}}$ 的单一速率能重现压强，因为压强公式从来只要 $\langle v^2 \rangle$；它重现不了与 $\langle v \rangle$ 成正比的逸出率。不要把 $v_{\mathrm{rms}}$ 插进 [[#eq-flux]]。
:::

::: example 300 K 下氮分子的三个速率 {#ex-n2-speeds}
氮分子质量 $m = 4.65\times 10^{-26}\,\mathrm{kg}$。取 $T = 300\,\mathrm{K}$。求 $v_{\mathrm{rms}}$、$\langle v \rangle$ 和 $v_p$，并用 $\gamma = 1.40$ 把 $v_{\mathrm{rms}}$ 与同一气体中的声速比较。
::: solution
用 [[#eq-three-speeds]]，$k_B = 1.380649\times 10^{-23}\,\mathrm{J/K}$。先算

$$
\frac{3 k_B T}{m} = \frac{3\times 1.380649\times 10^{-23}\times 300}{4.65\times 10^{-26}} = 2.67222\times 10^{5}\,\mathrm{m^2/s^2},
$$

于是

$$
v_{\mathrm{rms}} = \sqrt{2.67222\times 10^{5}} = 516.9\,\mathrm{m/s}.
$$

另外两个速率由 [[#prop-speeds]] 的比值定死：

$$
\langle v \rangle = v_{\mathrm{rms}}\sqrt{\frac{8}{3\pi}} = 476.3\,\mathrm{m/s}, \qquad
v_p = v_{\mathrm{rms}}\sqrt{\frac{2}{3}} = 422.1\,\mathrm{m/s}.
$$

质量给了三位有效数字，速率修约后同样给三位：$517\,\mathrm{m/s}$、$476\,\mathrm{m/s}$、$422\,\mathrm{m/s}$。顺序正是上面证明过的那个，差距也不小：方均根速率比最概然速率高约 $22\%$。

声速由 $v_{\mathrm{s}} = v_{\mathrm{rms}}\sqrt{\gamma/3}$、$\gamma = 1.40$ 得到：

$$
v_{\mathrm{s}} = 516.9\times\sqrt{\frac{1.40}{3}} = 353\,\mathrm{m/s}.
$$

由所给分子质量推出的摩尔质量为 $M = m N_A = 0.0280\,\mathrm{kg/mol}$，$\sqrt{\gamma R T/M}$ 返回同一个 $353\,\mathrm{m/s}$。室温下每秒几百米的分子速率平平常常，并不稀奇。
:::
:::

::: example 平动能与转动能 {#ex-energy}
$2.00\,\mathrm{mol}$ 氮气保持在 $300\,\mathrm{K}$。求平动动能、按常温计数的转动能，以及总内能。再对同温下 $2.00\,\mathrm{mol}$ 氦气重算内能。
::: solution
平动不问是哪种气体。由 [[#eq-utrans]]，

$$
U_{\mathrm{trans}} = \tfrac32 n R T = \tfrac32 \times 2.00 \times 8.314462618 \times 300 = 7.483\times 10^{3}\,\mathrm{J}.
$$

此温度下的氮气有 $f = 5$：三个平动项加两个转动项。转动份额是两个 $\tfrac12 n R T$，即

$$
U_{\mathrm{rot}} = n R T = 2.00\times 8.314462618\times 300 = 4.989\times 10^{3}\,\mathrm{J}.
$$

总和为 $U = \tfrac52 n R T = 1.247\times 10^{4}\,\mathrm{J}$。氦是单原子的，转动不贡献，$U = U_{\mathrm{trans}} = 7.483\times 10^{3}\,\mathrm{J}$。两个样品平动能相同、温度相同；氮气在转动中多存了 $4.989\times 10^{3}\,\mathrm{J}$。两者都不计振动，理由见 [[#thm-equipartition]] 之下：对氮气，$\theta_{\mathrm{vib}}$ 达数千开尔文。
:::
:::

::: example 氮气的平均自由程 {#ex-mfp}
$T = 300\,\mathrm{K}$、$P = 1.01325\times 10^{5}\,\mathrm{Pa}$ 的氮气具有 [[#ex-n2-speeds]] 中的分子质量。取有效硬球直径 $d = 3.70\times 10^{-10}\,\mathrm{m}$。估算 $n_V$、平均自由程和两次碰撞之间的平均时间。
::: solution
数密度由 $P = n_V k_B T$ 得到，而不是由摩尔数数出来：

$$
n_V = \frac{P}{k_B T} = \frac{1.01325\times 10^{5}}{1.380649\times 10^{-23}\times 300} = 2.446\times 10^{25}\,\mathrm{m^{-3}}.
$$

分子到最近邻的平均距离量级为 $n_V^{-1/3} = 3.44\times 10^{-9}\,\mathrm{m}$，约九个直径。与自身尺度相比，分子之间相距很远，这正是 [[#def-model]] 第一款的含义。[[#eq-mfp]] 接着给出

$$
\lambda = \frac{1}{\sqrt{2}\,\pi d^2 n_V} = 6.72\times 10^{-8}\,\mathrm{m}.
$$

这个路程约一百八十个直径，约平均间距的二十倍。按分子自己的尺度，它在两次碰撞之间走了很远。[[#ex-n2-speeds]] 的平均速率为 $\langle v \rangle = 476\,\mathrm{m/s}$，所以两次碰撞之间的平均时间为

$$
\tau = \frac{\lambda}{\langle v \rangle} = \frac{6.72\times 10^{-8}}{476} = 1.41\times 10^{-10}\,\mathrm{s}.
$$

碰撞频率 $1/\tau$ 约为 $7.1\times 10^{9}\,\mathrm{s^{-1}}$。直径是模型的输入，不是理想气体定律的结果，所以 $\lambda$ 的精度不会超过那个输入。理想气体压强定不出 $d$。
:::
:::

::: example 氦与六氟化铀的逸出 {#ex-effusion}
同压同温下，氦比 [[#ex-n2-speeds]] 中的氮气逸出快多少倍？取 $m_{\mathrm{He}} = 6.65\times 10^{-27}\,\mathrm{kg}$、$m_{\mathrm{N_2}} = 4.65\times 10^{-26}\,\mathrm{kg}$。再比较 $\mathrm{UF_6}$ 两种同位素分子的单级逸出，其摩尔质量为 $349\,\mathrm{g/mol}$ 与 $352\,\mathrm{g/mol}$。
::: solution
定 $P$、$T$ 下，由 $n_V = P/(k_B T)$ 数密度相同。[[#eq-flux]] 于是说通量之比等于平均速率之比，即质量反比的平方根：

$$
\frac{\Phi_{\mathrm{He}}}{\Phi_{\mathrm{N_2}}} = \sqrt{\frac{m_{\mathrm{N_2}}}{m_{\mathrm{He}}}} = \sqrt{\frac{4.65\times 10^{-26}}{6.65\times 10^{-27}}} = \sqrt{6.99} = 2.64.
$$

氦离开小孔的速率约是氮气的 $2.64$ 倍。同一规律用于 $\mathrm{^{235}UF_6}$ 与 $\mathrm{^{238}UF_6}$，单级分离系数为

$$
\sqrt{\frac{352}{349}} = 1.0043.
$$

一级改变的丰度比不到半个百分点。实用级联需要许多级，是因为分子质量太接近，不是格雷厄姆定律失灵。定律说的是对着真空的针孔。湍流泄漏不会按 $\sqrt{m}$ 给分子分拣。
:::
:::

## 后续内容

[[thermodynamics/heat-engines]] 里的热机用 $U(T)$ 与 $P V = n R T$，两者如今都有了分子层面的解读，且不需要分布。[[thermodynamics/entropy]] 里的熵仍然不靠数微观状态来定义。[[#thm-equipartition]] 与 [[#def-maxwell]] 假设的玻尔兹曼因子在 [[statistical-mechanics]] 中推导。与 [[oscillations/sound]] 共用的因子 $\gamma$ 在那里，是因为声波过程是绝热的，不是因为分子动理论发明了 $\gamma$。

::: history 撞击、一段自由程、然后是分布
丹尼尔·伯努利（Daniel Bernoulli）在《流体动力学》（*Hydrodynamica*，1738）中已把气体的压强归于分子的撞击，并看到它随密度与速率的平方增长。这里采用的形式的论证要晚得多。鲁道夫·克劳修斯（Rudolf Clausius）在 1857 年把压强表述为动量转移，并引入了平均自由程，正是为了让"一个分子在两次碰撞之间走多远"成为可谈之事。他没有写速率分布。麦克斯韦（James Clerk Maxwell）在 1860 年给出了那个分布，把最概然速率、平均速率与方均根速率区分开来。能量均分出自同一圈思想；它对双原子气体热容的失灵，是纯粹经典的计数未必总对的最早征兆之一。
:::

::: summary
- 在稀薄气体模型中，器壁上的压强是动量流。每次弹性碰撞传递 $2 m v_x$，只有 $v_x > 0$ 贡献，各向同性把 $\langle v_x^2 \rangle$ 变成 $\langle v^2 \rangle/3$，得 $P = \tfrac13 n_V m \langle v^2 \rangle$。
- 与 $P = n_V k_B T$ 配对，同一公式给出 $\tfrac12 m \langle v^2 \rangle = \tfrac32 k_B T$ 与 $v_{\mathrm{rms}} = \sqrt{3 k_B T/m}$。平动能量依赖 $T$ 与分子数，不依赖分子质量。
- 能量中每个经典二次项平均为 $\tfrac12 k_B T$。单原子气体 $f = 3$；常温双原子气体 $f = 5$，因为两个转动被激发而振动被冻结。对 $\mathrm{N_2}$，$\theta_{\mathrm{vib}} \approx 3394\,\mathrm{K}$。
- 麦克斯韦速率分布是几何因子 $4\pi v^2$ 乘玻尔兹曼指数。它的峰、平均与方均根按 $v_p < \langle v \rangle < v_{\mathrm{rms}}$ 排列。
- 氮气在 $300\,\mathrm{K}$、$m = 4.65\times 10^{-26}\,\mathrm{kg}$ 下，三个速率三位有效数字为 $422$、$476$、$517\,\mathrm{m/s}$。声速为 $v_{\mathrm{rms}}\sqrt{\gamma/3}$，$\gamma = 1.40$ 时约 $353\,\mathrm{m/s}$。
- 逸出通量是 $\Phi = \tfrac14 n_V \langle v \rangle$，不是 $\tfrac14 n_V v_{\mathrm{rms}}$。定 $P$、$T$ 下速率按 $1/\sqrt{m}$ 缩放。
- $\langle v^2 \rangle \neq \langle v \rangle^2$。单一速率 $v_{\mathrm{rms}}$ 可以被调出正确的压强，却把通量弄错，因子为 $\sqrt{3\pi/8}$。
- 平衡麦克斯韦气体中的平均自由程为 $\lambda = 1/(\sqrt{2}\,\pi d^2 n_V)$。直径是额外的信息；理想气体定律定不出它。
:::

## 习题

::: exercise 温度加倍 {#exr-double-t level=1 check="sqrt(2)"}
一份理想气体样品中分子的方均根速率在热力学温度 $T$ 处测得。气体在体积不变下加热到热力学温度 $2T$。$v_{\mathrm{rms}}$ 增大为原来的几倍？
::: solution
[[#eq-vrms]] 说分子质量固定时 $v_{\mathrm{rms}} \propto \sqrt{T}$。$T$ 加倍，速率乘以 $\sqrt{2}$。体积不相干：方均根速率不依赖 $V$，也不依赖 $n_V$。平均速率与最概然速率按同一倍数缩放，因为它们每一个都是 $v_{\mathrm{rms}}$ 的固定倍数。
:::
:::

::: exercise 方均根对峰值 {#exr-ratio-speeds level=1 check="sqrt(3/2)"}
对麦克斯韦分布的气体，求精确比值 $v_{\mathrm{rms}}/v_p$。
::: solution
把 [[#eq-three-speeds]] 中的两个公式相除。因子 $\sqrt{k_B T/m}$ 相消：

$$
\frac{v_{\mathrm{rms}}}{v_p} = \sqrt{\frac{3 k_B T/m}{2 k_B T/m}} = \sqrt{\frac{3}{2}}.
$$

比值不依赖气体，也不依赖温度。数值上 $\sqrt{3/2} \approx 1.225$，这就是峰在 $1$ 时图中方均根刻度落在 $1.22$ 附近的原因。
:::
:::

::: exercise 常温空气的 γ {#exr-gamma level=1 check="7/5"}
常温空气按振动冻结的双原子理想气体处理。求 $\gamma = C_{P,m}/C_{V,m}$。
::: solution
[[#thm-equipartition]] 之下的计数给出 $f = 5$，所以 $C_{V,m} = \tfrac52 R$、$C_{P,m} = C_{V,m} + R = \tfrac72 R$。因此

$$
\gamma = \frac{7/2}{5/2} = \frac{7}{5}.
$$

氮气绝热线使用的 $1.40$ 就是这个分数，不是独立的实验常数。温度高到振动能贡献时，它就不再正确。
:::
:::

::: exercise 加热到方均根速率加倍 {#exr-temp-factor level=2 check="4"}
氮气样品在体积不变下加热，直到 $v_{\mathrm{rms}}$ 为初始值的两倍。热力学温度增大为原来的几倍？
::: solution
由 [[#eq-vrms]]，$T \propto v_{\mathrm{rms}}^2$。速率加倍，$T$ 乘以 $4$。若气体始于 $300\,\mathrm{K}$，须升到 $1200\,\mathrm{K}$。$f = 5$ 的双原子样品的内能按同样方式缩放，因为 $U \propto T$。定体积对压强重要——压强也变为四倍——对速率不重要。
:::
:::

::: exercise 氢与氧的逸出 {#exr-ho-effusion level=2 check="4"}
氢和氧在同压同温下穿过同一个小孔逸出。取 $M_{\mathrm{H_2}} = 2.00\,\mathrm{g/mol}$、$M_{\mathrm{O_2}} = 32.0\,\mathrm{g/mol}$。求 $\Phi_{\mathrm{H_2}}/\Phi_{\mathrm{O_2}}$。
::: solution
$P$、$T$ 相同意味着 $n_V$ 相同。[[#eq-flux]] 于是给出通量比等于质量比的平方根之倒数，也即摩尔质量比的平方根：

$$
\frac{\Phi_{\mathrm{H_2}}}{\Phi_{\mathrm{O_2}}} = \sqrt{\frac{M_{\mathrm{O_2}}}{M_{\mathrm{H_2}}}} = \sqrt{\frac{32.0}{2.00}} = \sqrt{16} = 4.
$$

氢的逸出速率是氧的四倍。小孔必须按 [[#prop-effusion]] 的意义足够小。大孔口气体作流体流动，这个比值不适用。
:::
:::

::: exercise 半摩尔的内能 {#exr-half-mole level=2 check="5/4*8.314462618*300"}
求 $0.500\,\mathrm{mol}$、$300\,\mathrm{K}$ 下振动冻结的双原子理想气体的内能，以焦耳计。取 $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$。
::: solution
这里 $f = 5$，所以 $U = \tfrac52 n R T$。以 $n = 0.500$，

$$
U = \tfrac52 \times 0.500 \times R \times 300 = \tfrac54 R \times 300 = \frac{5}{4}\times 8.314462618\times 300 = 3117.92\,\mathrm{J}.
$$

被校验的值是精确乘积 $\tfrac54\times 8.314462618\times 300$。同量的单原子样品只存这里的五分之三，因为 $f$ 将是 $3$ 而不是 $5$。
:::
:::

::: exercise 找出分布的峰值 {#exr-mode level=3}
从 [[#eq-maxwell]] 出发，证明 $f$ 在 $v_p = \sqrt{2 k_B T/m}$ 处取最大。说明为什么驻点是极大，以及为什么 $f(0) = 0$ 与玻尔兹曼因子偏好低能并不矛盾。
::: hint
对 $v > 0$ 用 $\ln f$ 运算。常数前置因子——包括 $(m/(2\pi k_B T))^{3/2}$——不影响最大点的位置。
:::
::: solution
$v > 0$ 时对数为

$$
\ln f(v) = \ln(4\pi) + 2\ln v + \tfrac32\ln\left(\frac{m}{2\pi k_B T}\right) - \frac{m v^2}{2 k_B T}.
$$

对 $v$ 求导。常数项消失，得

$$
\deriv{\ln f}{v} = \frac{2}{v} - \frac{m v}{k_B T}.
$$

令导数为零：$2/v = m v/(k_B T)$，故 $v^2 = 2 k_B T/m$，正根即 $v_p$。导数在 $0 < v < v_p$ 为正、$v > v_p$ 为负，所以 $\ln f$——从而 $f$——升到 $v_p$ 之后下降。驻点是极大。

玻尔兹曼因子 $\exp(-m v^2/(2 k_B T))$ 在 $v = 0$ 处最大。速率分布把它乘以球壳面积 $4\pi v^2$，后者在原点为零：速率为零的速度矢量只有一个，而任一 $v > 0$ 处有一整个球面的矢量。乘积在 $v = 0$ 处消失，并在球壳的增长与指数的衰减相抵处取峰。偏好低能与在 $v_p$ 处取峰，说的是两个不同的函数。
:::
:::

::: exercise 单一速率的高估 {#exr-single-speed level=3 check="sqrt(3*pi/8)"}
某个模型把麦克斯韦分布换成单一速率 $v_{\mathrm{rms}}$，方向仍各向同性，并在逸出公式里用这个速率顶替 $\langle v \rangle$。相对 [[#eq-flux]]，这个模型把 $\Phi$ 高估了多精确的倍数？
::: hint
高估倍数就是比值 $v_{\mathrm{rms}}/\langle v \rangle$。用 [[#eq-three-speeds]]，不要用氮气例题里的数值速率。
:::
::: solution
真实通量是 $\tfrac14 n_V \langle v \rangle$。单一速率模型取同样数密度、每个速率都等于 $v_{\mathrm{rms}}$，给出 $\tfrac14 n_V v_{\mathrm{rms}}$。模型通量与真实通量之比为

$$
\frac{v_{\mathrm{rms}}}{\langle v \rangle} = \sqrt{\frac{3 k_B T/m}{8 k_B T/(\pi m)}} = \sqrt{\frac{3\pi}{8}}.
$$

压强没有被高估。真实气体和模型有同样的 $\langle v^2 \rangle$，即 $v_{\mathrm{rms}}^2$，所以 [[#eq-pressure]] 返回同样的 $P$。这道题是 [[#prop-effusion]] 之后那个警告的定量形式：单一速率可以选得保住压强，却漏掉通量。数值上该因子约 $1.085$，高出 $8.5\%$，与温度和气体都无关。
:::
:::
