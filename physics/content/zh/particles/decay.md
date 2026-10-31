1896 年，亨利·贝可勒尔（Henri Becquerel）把铀盐放在用黑纸包好的照相底片上，发现底片感了光。几年之内就清楚了：辐射来自原子本身，无法用加热、加压或化学方法关掉，而且至少分成三种，按穿透力由弱到强命名为 α、β 与 γ。每一种后来都被证明是不同的物理过程。**α 粒子**是穿过库仑势垒隧穿而出的 ${}^4\mathrm{He}$ 核；**β 粒子**是弱相互作用与中微子一起创生出的电子或正电子；**γ 射线**是核从激发态落到低能态时放出的光子。

三者有一件事是共同的：给定核在何时衰变是随机的，单位时间内的概率与核已经存在的时长无关。仅此一条就给出指数衰变定律以及建立在它之上的一切，从放射性碳测年到铀系的平衡。三种过程之间的差别则解释了实测寿命的巨大跨度：仅 α 放射源就横跨 $10^{-7}\,\mathrm{s}$ 到 $10^{17}\,\mathrm{s}$。

本章用到 [[particles/nuclear-structure]] 的核质量与稳定谷、[[quantum-1/piecewise-potentials]] 的势垒隧穿，以及 [[quantum-2/time-dependent]] 的费米黄金定则。原子质量取自 AME2020，半衰期取自 NNDC/NUBASE 评估；粒子性质取自粒子数据组（Particle Data Group）的《Review of Particle Physics》（2024）。我们使用 $1\,\mathrm{u} = 931.494\,\mathrm{MeV}/c^2$、$m_e c^2 = 0.511\,\mathrm{MeV}$ 与 $\hbar c = 197.327\,\mathrm{MeV\,fm}$。

## 衰变定律 {#law}

取一份由 $N$ 个全同不稳定核组成的样品。实验表明、量子力学也解释了：每个核在接下来的小间隔 $\dd t$ 内衰变的概率为固定的 $\lambda\,\dd t$，与它已经存在了多久无关，也与邻居无关。核不会变老。

::: definition 衰变常量、活度 {#def-activity}
核素的**衰变常量**（decay constant）$\lambda$ 是给定核在单位时间内衰变的概率。样品的**活度**（activity）是单位时间内衰变的期望数，$\mathcal{A} = \lambda N$。活度的 SI 单位是**贝可勒尔**（becquerel），$1\,\mathrm{Bq} = 1\,\mathrm{s}^{-1}$；旧单位是**居里**（curie），$1\,\mathrm{Ci} = 3.7\times10^{10}\,\mathrm{Bq}$，大约是一克镭-226 的活度。
:::

::: theorem 指数衰变定律 {#thm-decay-law}
若 $t = 0$ 时刻存在的 $N_0$ 个核各自以恒定的单位时间概率 $\lambda$ 独立衰变，则 $t$ 时刻剩余核数的期望为

$$
N(t) = N_0 e^{-\lambda t},
$$ {#eq-decay}

活度为 $\mathcal{A}(t) = \lambda N_0 e^{-\lambda t}$。**半衰期**——$N$ 减半所需的时间——是 $t_{1/2} = \ln 2/\lambda$；**平均寿命**——一个核存活时间的平均值——是 $\tau = 1/\lambda$。
:::

::: proof
时间 $\dd t$ 内衰变数的期望为 $\lambda N\,\dd t$，所以 $\dd N = -\lambda N\,\dd t$。分离变量，$\dd N/N = -\lambda\,\dd t$，从 $0$ 积到 $t$ 得 $\ln(N/N_0) = -\lambda t$，即 [[#eq-decay]]。令 $N = N_0/2$ 得 $\lambda t_{1/2} = \ln 2$。

至于平均寿命，单个核存活到 $t$ 的概率为 $P(t) = e^{-\lambda t}$，所以其衰变时刻的概率密度为 $-\dd P/\dd t = \lambda e^{-\lambda t}$。平均衰变时间为

$$
\tau = \int_0^\infty t\,\lambda e^{-\lambda t}\,\dd t = \Bigl[-t e^{-\lambda t}\Bigr]_0^\infty + \int_0^\infty e^{-\lambda t}\,\dd t = 0 + \frac{1}{\lambda},
$$

其中用了分部积分。
:::

这一定律是统计性的。对单个核，它只预言一个概率；对 $N$ 个核的样品，短计数间隔内的衰变数围绕其均值 $\mu$ 涨落，服从泊松分布，标准差为 $\sqrt{\mu}$。计数 $10\,000$ 的不确定度为 $1\%$，计数 $100$ 的不确定度为 $10\%$。

$\lambda$ 的恒定性才是物理内容所在。它说的是：衰变是一个准定态的跃迁，其概率以恒定速率漏掉——这正是下面费米黄金定则与隧穿计算所给出的结果。这也意味着 $\lambda$ 是核素自身的性质，基本上与外界无关。例外很小：电子俘获依赖核处的电子密度，所以 ${}^7\mathrm{Be}$ 的半衰期在不同化合物之间有百分之几的分数之差的变化；而完全电离的核根本无法靠俘获衰变。

::: warning 半衰期不是任何东西的一半
过一个半衰期剩一半；过两个半衰期剩四分之一，而不是零。平均寿命 $\tau = t_{1/2}/\ln 2 = 1.443\,t_{1/2}$ 比半衰期长。在指数里混用 $\tau$ 与 $t_{1/2}$ 是本章最常见的数值错误：$N = N_0 e^{-t/\tau} = N_0\,2^{-t/t_{1/2}}$，而 $N_0 e^{-t/t_{1/2}}$ 是错的。
:::

::: example 镭的活度 {#ex-radium}
求 $1.000\,\mathrm{g}$ ${}^{226}\mathrm{Ra}$ 的活度。其半衰期为 $1600\,\mathrm{yr}$，摩尔质量为 $226.03\,\mathrm{g/mol}$。
::: solution
核数为

$$
N = \frac{1.000}{226.03}\times 6.022\times10^{23} = 2.664\times10^{21}.
$$

以 $1\,\mathrm{yr} = 3.156\times10^7\,\mathrm{s}$ 计，衰变常量为

$$
\lambda = \frac{\ln 2}{1600 \times 3.156\times10^7\,\mathrm{s}} = 1.373\times10^{-11}\,\mathrm{s}^{-1}.
$$

于是 $\mathcal{A} = \lambda N = 3.66\times10^{10}\,\mathrm{Bq} = 0.99\,\mathrm{Ci}$。居里于 1910 年定义为一克镭的活度；按现代的半衰期，那比后来采用的整数值 $3.7\times10^{10}\,\mathrm{Bq}$ 小 $1\%$。
:::
:::

::: example 放射性碳测年 {#ex-carbon}
宇宙线使大气碳中的比值 ${}^{14}\mathrm{C}/{}^{12}\mathrm{C}$ 维持在 $1.2\times10^{-12}$ 附近，活着的生物共享这一比值。生物死后不再有新的 ${}^{14}\mathrm{C}$ 进入。取 $t_{1/2} = 5700\,\mathrm{yr}$，求活体物质每克碳的活度，以及每克活度为其四分之一的样品的年代。
::: solution
一克碳含 $6.022\times10^{23}/12.011 = 5.014\times10^{22}$ 个原子，其中 $1.2\times10^{-12}$ 是 ${}^{14}\mathrm{C}$，所以 $N = 6.02\times10^{10}$。衰变常量为 $\ln 2/(5700 \times 3.156\times10^7\,\mathrm{s}) = 3.85\times10^{-12}\,\mathrm{s}^{-1}$，于是

$$
\mathcal{A} = 3.85\times10^{-12} \times 6.02\times10^{10} = 0.23\,\mathrm{Bq},
$$

即每克每分钟约 14 次衰变。活度降到初值的四分之一意味着过了两个半衰期，所以年代为 $2 \times 5700 = 11\,400\,\mathrm{yr}$。一般地，$t = (t_{1/2}/\ln 2)\ln(\mathcal{A}_0/\mathcal{A})$。实际的放射性碳年代要用校准曲线修正，因为大气比值随时间有过起伏。
:::
:::

当一个核素可以经由多种方式衰变时，每个**分支** $i$ 有自己的衰变常量 $\lambda_i$，总和为 $\lambda = \sum_i \lambda_i$。分支 $i$ 的**分支比**（branching ratio）为 $\lambda_i/\lambda$。核素只有一个半衰期，$\ln 2/\lambda$，无论你观测哪个分支：各分支争夺的是同一批核。

## 衰变链 {#chains}

衰变的子核常常本身也有放射性。铀-238 开启一条十四次衰变的链，终于稳定的 ${}^{206}\mathrm{Pb}$。最简单的链有两个成员：母核 $1$ 以衰变常量 $\lambda_1$ 喂养子核 $2$，后者以 $\lambda_2$ 衰变。

::: theorem 两成员链（Bateman） {#thm-bateman}
若 $t = 0$ 时有 $N_1(0)$ 个母核、没有子核，且 $\lambda_1 \neq \lambda_2$，则

$$
N_1(t) = N_1(0) e^{-\lambda_1 t}, \qquad N_2(t) = N_1(0)\,\frac{\lambda_1}{\lambda_2 - \lambda_1}\bigl(e^{-\lambda_1 t} - e^{-\lambda_2 t}\bigr).
$$ {#eq-bateman}
:::

::: proof
母核服从 [[#eq-decay]]。子核以速率 $\lambda_1 N_1$ 被喂养、以速率 $\lambda_2 N_2$ 衰变：

$$
\deriv{N_2}{t} + \lambda_2 N_2 = \lambda_1 N_1(0) e^{-\lambda_1 t}.
$$

乘以积分因子 $e^{\lambda_2 t}$。左边化为 $\deriv{}{t}\bigl(N_2 e^{\lambda_2 t}\bigr)$，于是

$$
N_2 e^{\lambda_2 t} = \lambda_1 N_1(0)\int_0^t e^{(\lambda_2 - \lambda_1)t'}\,\dd t' = \frac{\lambda_1 N_1(0)}{\lambda_2 - \lambda_1}\bigl(e^{(\lambda_2-\lambda_1)t} - 1\bigr),
$$

其中用了 $N_2(0) = 0$。再乘以 $e^{-\lambda_2 t}$ 就得 [[#eq-bateman]]。
:::

巴特曼（Bateman）在 1910 年解出了 $n$ 个成员的一般链条：第 $n$ 个成员是 $n$ 个指数之和，链中每个衰变常量对应一个。两成员公式的两个极限值得记住。

**瞬态平衡**，$\lambda_2 > \lambda_1$（子核寿命更短）。过几个子核半衰期后，$e^{-\lambda_2 t}$ 项已经消失，$N_2/N_1 \to \lambda_1/(\lambda_2 - \lambda_1)$。活度比此后恒定，$\mathcal{A}_2/\mathcal{A}_1 = \lambda_2/(\lambda_2 - \lambda_1) > 1$，子核以母核的半衰期衰变。

**长期平衡**，$\lambda_2 \gg \lambda_1$。此时 $\mathcal{A}_2 \to \mathcal{A}_1$：子核衰变得与生成它一样快。在首成员比其余所有成员都长寿得多的链中，每个成员达到同样的活度，原子数之比等于半衰期之比，$N_i/N_1 = t_{1/2,i}/t_{1/2,1}$。未受扰动的铀矿石处于长期平衡；居里夫妇正是因此才能从上吨的沥青铀矿中提出可测量的镭。

若反过来 $\lambda_2 < \lambda_1$，则没有平衡：母核先消失，留下子核按自己的半衰期衰变。

::: widget plot
f: exp(-0.693 x/a); (1/b)/(1/b - 1/a) (exp(-0.693 x/a) - exp(-0.693 x/b))
x: 0, 200
y: 0, 1.2
sliders: a=66:10:150:1; b=6:1:9:0.5
labels: 母核活度; 子核活度
caption: 两成员链的活度（以母核初始活度的分数计）对时间（小时）作图；$a$ 是母核半衰期、$b$ 是子核半衰期，单位均为小时。图打开时接近医用发生器 ${}^{99}\mathrm{Mo} \to {}^{99\mathrm{m}}\mathrm{Tc}$（$66\,\mathrm{h}$ 与 $6\,\mathrm{h}$）。子核活度上升，在 $t \approx 23\,\mathrm{h}$ 附近越过母核，然后以略高于母核的姿态与之平行：这就是瞬态平衡。把 $a$ 往 $150\,\mathrm{h}$ 调，看比值逼近 1，即长期平衡的极限。交点总是子核的极大值处。
:::

::: example 锝发生器 {#ex-tc}
某医院发生器装有 ${}^{99}\mathrm{Mo}$（$t_{1/2} = 65.94\,\mathrm{h}$），它衰变为 ${}^{99\mathrm{m}}\mathrm{Tc}$（$t_{1/2} = 6.007\,\mathrm{h}$），后者是诊断影像中使用最广的核素。从纯钼出发，锝的活度何时最大？瞬态平衡下的活度比是多少？（忽略 ${}^{99}\mathrm{Mo}$ 中绕过亚稳态的那 $12\%$ 衰变。）
::: solution
子核数在 $\dd N_2/\dd t = 0$ 时取极大。对 [[#eq-bateman]] 求导，这发生在 $\lambda_1 e^{-\lambda_1 t} = \lambda_2 e^{-\lambda_2 t}$ 时，即

$$
t_\mathrm{max} = \frac{\ln(\lambda_2/\lambda_1)}{\lambda_2 - \lambda_1}.
$$

两个衰变常量为 $\lambda_1 = \ln 2/65.94 = 0.010512\,\mathrm{h}^{-1}$、$\lambda_2 = \ln 2/6.007 = 0.11539\,\mathrm{h}^{-1}$，于是

$$
t_\mathrm{max} = \frac{\ln(10.977)}{0.10488\,\mathrm{h}^{-1}} = \frac{2.396}{0.10488}\,\mathrm{h} = 22.8\,\mathrm{h}.
$$

这就是此类发生器约每天"淋洗"（milk）一次的原因。瞬态平衡下，

$$
\frac{\mathcal{A}_2}{\mathcal{A}_1} = \frac{\lambda_2}{\lambda_2 - \lambda_1} = \frac{0.11539}{0.10488} = 1.100.
$$

子核活度比母核高 $10\%$。这不违反任何东西：某一时刻存在的子核原子，是在不久之前由更大的母核群体生成的。
:::
:::

## α 衰变 {#alpha}

α 衰变是放出 ${}^4\mathrm{He}$ 核，

$$
{}^{A}_{Z}\mathrm{X} \to {}^{A-4}_{Z-2}\mathrm{Y} + \alpha .
$$

它之所以发生，是因为在重核中，质量公式的库仑项已使母核比子核加一个 α 粒子更重，而 α 粒子束缚得如此之紧（$B = 28.3\,\mathrm{MeV}$），以至于它是最便宜的碎片。

::: definition Q 值 {#def-q}
衰变的 **Q 值**（Q-value）是释放的静能：初始静能减去末态静能。对 α 衰变，用原子质量表示为

$$
Q_\alpha = \bigl[m(\mathrm{X}) - m(\mathrm{Y}) - m({}^4\mathrm{He})\bigr]c^2 .
$$

衰变可能发生的必要条件是 $Q > 0$。释放的能量表现为产物的动能。
:::

电子恰好平衡：左边 $Z$ 个，右边 $(Z-2) + 2$ 个。由于子核与 α 粒子以等值反向的动量 $p$ 飞离，且各自 $K = p^2/2m$，

$$
K_\alpha = \frac{m_Y}{m_Y + m_\alpha}\,Q \approx \frac{A-4}{A}\,Q ,
$$ {#eq-kalpha}

所以 α 粒子带走约 $98\%$ 的能量，具有单一而尖锐的能量。谱线出现几条，意味着衰变到了子核的几个能级上。

### 穿过库仑势垒的隧穿

这就是 1928 年由伽莫夫（Gamow）以及独立地由格尼（Gurney）与康登（Condon）解决的疑难。${}^{238}\mathrm{U}$ 放出的 α 粒子动能 $4.2\,\mathrm{MeV}$。可一个 α 粒子贴着钍子核（$R \approx 9.3\,\mathrm{fm}$）时的库仑势能是 $2 \times 90 \times 1.44/9.3 = 28\,\mathrm{MeV}$。按经典物理，α 粒子既进不去也出不来。按量子力学，它隧穿。

把 α 粒子建模为核内一个约化质量 $\mu$、能量 $Q$ 的粒子，被势垒 $V(r) = zZ'e^2/(4\pi\varepsilon_0 r)$（$r > R$）关在里面，其中 $z = 2$，$Z' = Z - 2$ 是子核的电荷。势垒止于经典转折点 $b$，即 $V(b) = Q$ 处：

$$
b = \frac{zZ'e^2}{4\pi\varepsilon_0 Q} = \frac{zZ'\,\alpha\hbar c}{Q}.
$$

::: theorem 伽莫夫因子 {#thm-gamow}
在 WKB 近似下，能量为 $Q$、从内部入射到势垒的 α 粒子的透射概率为 $T \approx e^{-2G}$，其中

$$
2G = \frac{2}{\hbar}\int_R^b \sqrt{2\mu\bigl(V(r) - Q\bigr)}\,\dd r = \frac{2\sqrt{2\mu c^2 Q}}{\hbar c}\,b\left[\arccos\sqrt{x} - \sqrt{x(1-x)}\right], \qquad x = \frac{R}{b}.
$$ {#eq-gamow}

对厚势垒，$x \ll 1$，上式化为

$$
2G \approx 2\pi zZ'\alpha\sqrt{\frac{\mu c^2}{2Q}} - 4\sqrt{\frac{2 zZ'\alpha\,\mu c^2 R}{\hbar c}} .
$$ {#eq-gamow-thick}
:::

::: proof
第一个等号是 [[quantum-1/piecewise-potentials]] 中势垒的 WKB 透射因子：势垒下波函数按 $\exp\bigl(-\int\kappa\,\dd r\bigr)$ 衰减，其中 $\hbar\kappa = \sqrt{2\mu(V - Q)}$，透射概率是振幅比的平方。代入 $V = Qb/r$，

$$
\sqrt{2\mu(V - Q)} = \sqrt{2\mu Q}\,\sqrt{\frac{b}{r} - 1}.
$$

换元 $r = b\cos^2\theta$，则 $\dd r = -2b\cos\theta\sin\theta\,\dd\theta$，$\sqrt{b/r - 1} = \tan\theta$。下限 $r = b$ 对应 $\theta = 0$，上限 $r = R$ 对应 $\theta_0 = \arccos\sqrt{x}$。于是

$$
\int_R^b \sqrt{\frac{b}{r} - 1}\,\dd r = \int_0^{\theta_0} 2b\sin^2\theta\,\dd\theta = b\bigl(\theta_0 - \sin\theta_0\cos\theta_0\bigr) = b\left[\arccos\sqrt{x} - \sqrt{x}\sqrt{1-x}\right],
$$

其中用了 $\cos\theta_0 = \sqrt{x}$、$\sin\theta_0 = \sqrt{1-x}$。乘以 $2\sqrt{2\mu Q}/\hbar$ 即得 [[#eq-gamow]]。

小 $x$ 时，$\arccos\sqrt{x} = \pi/2 - \sqrt{x} + O(x^{3/2})$，$\sqrt{x(1-x)} = \sqrt{x} + O(x^{3/2})$，所以方括号为 $\pi/2 - 2\sqrt{x}$。第一项给出 $\pi b\sqrt{2\mu Q}/\hbar$，代入 $b = zZ'\alpha\hbar c/Q$ 得 $2\pi zZ'\alpha\sqrt{\mu c^2/2Q}$。第二项给出 $4\sqrt{xb^2\cdot 2\mu Q}/\hbar = 4\sqrt{2\mu Q R b}/\hbar$，再由 $Qb = zZ'\alpha\hbar c$ 化为 [[#eq-gamow-thick]] 的第二项。
:::

衰变速率是透射概率乘以 α 粒子从内部撞击势垒的频率。若它以速度 $v_\mathrm{in}$ 穿过直径 $2R$，则入射频率（assault frequency）为 $f \approx v_\mathrm{in}/2R$，

$$
\lambda \approx f\,e^{-2G}.
$$ {#eq-alpha-rate}

这里用了粗糙的经典频率，并略去了核内本来就存在一个 α 粒子的概率（**预形成**（preformation）因子），所以这只是个量级估计。但核与核之间的几乎全部变化都在 $e^{-2G}$ 里，而 [[#eq-gamow-thick]] 的首项正比于 $Z'/\sqrt{Q}$。取对数，

$$
\log_{10} t_{1/2} \approx a\,\frac{Z'}{\sqrt{Q}} + b ,
$$ {#eq-geiger-nuttall}

$a$、$b$ 在一大片核上近乎常数。这就是**盖革–努塔尔（Geiger–Nuttall）定律**：1911 年盖革与努塔尔（Nuttall）把它作为衰变常量的对数与 α 粒子射程的对数之间的线性关系从实验中找到，十七年后伽莫夫给出了解释。

::: example 铀-238 对照钋-212 {#ex-gamow}
${}^{238}\mathrm{U}$ 衰变为 ${}^{234}\mathrm{Th}$，$Q = 4.270\,\mathrm{MeV}$；${}^{212}\mathrm{Po}$ 衰变为 ${}^{208}\mathrm{Pb}$，$Q = 8.954\,\mathrm{MeV}$。用 [[#eq-gamow]] 与 [[#eq-alpha-rate]] 估算两者的半衰期，取 $R = 1.2(A_Y^{1/3} + 4^{1/3})\,\mathrm{fm}$，内部速度对应动能 $Q + 35\,\mathrm{MeV}$。
::: solution
对铀，$R = 1.2(234^{1/3} + 4^{1/3}) = 1.2(6.162 + 1.587) = 9.30\,\mathrm{fm}$，$b = 2 \times 90 \times 1.440/4.270 = 60.7\,\mathrm{fm}$，所以 $x = 0.153$。$\alpha$ 与 ${}^{234}\mathrm{Th}$ 的约化质量 $\mu c^2 = 3665\,\mathrm{MeV}$，于是 $2\sqrt{2\mu c^2 Q}/\hbar c = 2\sqrt{2 \times 3665 \times 4.270}/197.33 = 1.793\,\mathrm{fm}^{-1}$。方括号为 $\arccos\sqrt{0.1532} - \sqrt{0.1532 \times 0.8468} = 1.1686 - 0.3602 = 0.8084$。于是

$$
2G = 1.793 \times 60.7 \times 0.8084 = 88.0, \qquad e^{-2G} = 6\times10^{-39}.
$$

内部，$v_\mathrm{in}/c = \sqrt{2 \times 39.3/3727} = 0.145$，所以 $f = 0.145 \times 3.00\times10^{23}\,\mathrm{fm/s}/(2 \times 9.30\,\mathrm{fm}) = 2.3\times10^{21}\,\mathrm{s}^{-1}$。于是 $\lambda = 1.4\times10^{-17}\,\mathrm{s}^{-1}$，$t_{1/2} = \ln 2/\lambda = 4.9\times10^{16}\,\mathrm{s} = 1.5\times10^9\,\mathrm{yr}$。实测值为 $4.47\times10^9\,\mathrm{yr}$。

对钋，$R = 9.01\,\mathrm{fm}$，$b = 2 \times 82 \times 1.440/8.954 = 26.4\,\mathrm{fm}$，$x = 0.342$，方括号 $0.472$；$\mu c^2 = 3657\,\mathrm{MeV}$ 时 $2\sqrt{2\mu c^2 Q}/\hbar c = 2.594\,\mathrm{fm}^{-1}$。于是 $2G = 2.594 \times 26.4 \times 0.472 = 32.3$，$e^{-2G} = 9.5\times10^{-15}$。取 $f \approx 2.6\times10^{21}\,\mathrm{s}^{-1}$，得 $t_{1/2} = 3\times10^{-8}\,\mathrm{s}$，实测为 $2.9\times10^{-7}\,\mathrm{s}$。

$Q$ 加倍使半衰期变了约 $10^{24}$ 倍，而这个简单模型在两端都算到十倍以内。控制 α 寿命的是势垒的指数敏感性，而不是核的细节。
:::
:::

::: widget plot
f: log10(0.693/2.4e21) + 0.4343 (2 sqrt(7330 x)/197.33) (2.88 Z/x) (acos(sqrt(9.2 x/(2.88 Z))) - sqrt((9.2 x/(2.88 Z)) (1 - 9.2 x/(2.88 Z))))
x: 4, 9.5
y: -8, 20
sliders: Z=90:80:92:1
labels: 半衰期（秒）的 log10
caption: 伽莫夫对 $\log_{10}(t_{1/2}/\mathrm{s})$ 随 $Q$（MeV）的估计，子核电荷为 $Z$（滑块），半径 $9.2\,\mathrm{fm}$、约化质量 $3665\,\mathrm{MeV}/c^2$、入射频率 $2.4\times10^{21}\,\mathrm{s}^{-1}$。从 $Q = 4$ 到 $9\,\mathrm{MeV}$，半衰期下降约 25 个数量级。在 $Z = 90$ 处沿曲线读 $Q = 4.27$（铀-238，实测 $\log_{10} t_{1/2} = 17.1$）。再把 $Z$ 改几个单位，看曲线的移动远小于 $Q$ 改变 $1\,\mathrm{MeV}$ 带来的移动：半衰期由 $Z/\sqrt{Q}$ 控制。
:::

::: quiz
两个 α 放射源子核电荷相同。一个 $Q = 5\,\mathrm{MeV}$，另一个 $Q = 6\,\mathrm{MeV}$。哪个陈述最能描述它们的半衰期？
- [ ] 几乎相等，因为势垒高度相同。
- [ ] 第二个短约 $(6/5)^5 \approx 2.5$ 倍。
- [x] 第二个短好几个数量级。
- [ ] 第二个更长，因为更快的 α 粒子花在尝试逃逸上的时间更短。
::: solution
指数 $2G$ 粗略正比于 $Z'/\sqrt{Q}$，而且很大，约 50 到 90。$Q$ 变 $20\%$ 使 $1/\sqrt{Q}$ 变约 $9\%$，这使 $2G$ 变五到八个单位，$e^{-2G}$ 变 $10^2$ 到 $10^4$ 倍甚至更多。$Q^5$ 这样的幂律属于 β 衰变而非 α 衰变。α 粒子更快，有效势垒就更薄更低，它逃逸得更容易，而不是更难。
:::
:::

## β 衰变与中微子 {#beta}

β 衰变把一个中子变成质子或把一个质子变成中子，$A$ 保持不变。核偏离稳定谷底部时，就是靠它向谷底移动。它有三种形式：

$$
\begin{aligned}
\beta^-:&\quad n \to p + e^- + \bar\nu_e, & {}^{A}_{Z}\mathrm{X} &\to {}^{A}_{Z+1}\mathrm{Y} + e^- + \bar\nu_e, \\
\beta^+:&\quad p \to n + e^+ + \nu_e, & {}^{A}_{Z}\mathrm{X} &\to {}^{A}_{Z-1}\mathrm{Y} + e^+ + \nu_e, \\
\text{EC}:&\quad p + e^- \to n + \nu_e, & {}^{A}_{Z}\mathrm{X} + e^- &\to {}^{A}_{Z-1}\mathrm{Y} + \nu_e .
\end{aligned}
$$

自由中子以 $\beta^-$ 衰变，平均寿命 $878.4\,\mathrm{s}$（PDG 2024）；自由质子则完全不能衰变，因为它比中子轻。核内核子结合能改变这一收支，于是富质子核中发生 $\beta^+$ 与电子俘获（EC）。

::: proposition 用原子质量表示的 β 衰变 Q 值 {#prop-beta-q}
用原子质量 $m$ 并略去电子结合能，

$$
Q_{\beta^-} = \bigl[m(\mathrm{X}) - m(\mathrm{Y})\bigr]c^2, \qquad Q_{\mathrm{EC}} = \bigl[m(\mathrm{X}) - m(\mathrm{Y})\bigr]c^2, \qquad Q_{\beta^+} = \bigl[m(\mathrm{X}) - m(\mathrm{Y}) - 2m_e\bigr]c^2 .
$$
:::

::: proof
用 $M$ 记核质量，于是 $m(\mathrm{X}) = M(\mathrm{X}) + Z m_e$，并在这个精度下取中微子质量为零。对 $\beta^-$，$Q = [M(\mathrm{X}) - M(\mathrm{Y}) - m_e]c^2 = [m(\mathrm{X}) - Zm_e - m(\mathrm{Y}) + (Z+1)m_e - m_e]c^2 = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$。对 $\beta^+$，$Q = [M(\mathrm{X}) - M(\mathrm{Y}) - m_e]c^2$，其中 $M(\mathrm{Y}) = m(\mathrm{Y}) - (Z-1)m_e$，得 $[m(\mathrm{X}) - m(\mathrm{Y}) - 2m_e]c^2$。对电子俘获，原子电子在左边：$Q = [M(\mathrm{X}) + m_e - M(\mathrm{Y})]c^2 = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$。
:::

所以只要子原子更轻，电子俘获就可能发生；而 $\beta^+$ 还须额外付出 $1.022\,\mathrm{MeV}$。$0 < Q_\mathrm{EC} < 1.022\,\mathrm{MeV}$ 的核只能靠俘获衰变。

::: example 铜-64 的三路衰变 {#ex-cu64}
${}^{64}\mathrm{Ni}$、${}^{64}\mathrm{Cu}$ 与 ${}^{64}\mathrm{Zn}$ 的原子质量为 $63.927967$、$63.929764$ 与 $63.929142\,\mathrm{u}$。证明 ${}^{64}\mathrm{Cu}$ 能以 $\beta^-$、$\beta^+$ 与电子俘获衰变，并求各个 Q 值。
::: solution
${}^{64}\mathrm{Cu}$（$Z = 29$）位于 ${}^{64}\mathrm{Ni}$（$Z = 28$）与 ${}^{64}\mathrm{Zn}$（$Z = 30$）之间。由 [[#prop-beta-q]]，

$$
\begin{aligned}
Q_{\beta^-}(\mathrm{Cu}\to\mathrm{Zn}) &= (63.929764 - 63.929142)(931.494) = 0.580\,\mathrm{MeV}, \\
Q_\mathrm{EC}(\mathrm{Cu}\to\mathrm{Ni}) &= (63.929764 - 63.927967)(931.494) = 1.674\,\mathrm{MeV}, \\
Q_{\beta^+}(\mathrm{Cu}\to\mathrm{Ni}) &= 1.674 - 1.022 = 0.652\,\mathrm{MeV}.
\end{aligned}
$$

三个全为正，所以三个分支都发生；实测分支比约为 $39\%$ $\beta^-$、$18\%$ $\beta^+$、$44\%$ EC。这就是 [[particles/nuclear-structure]] 的偶 $A$ 图景：${}^{64}\mathrm{Cu}$ 是奇–奇的，坐在两条质量抛物线中较高的那条上，高于两个偶–偶邻居，而那两个邻居都是稳定的。
:::
:::

### 连续谱与中微子

α 谱线是尖锐的，β 谱则不然：电子以从零一直到等于 $Q$ 的端点的一切动能出射。1914 年查德威克展示了这一点；1927 年埃利斯（Ellis）与伍斯特（Wooster）用量热器定案。他们把 ${}^{210}\mathrm{Bi}$ 的全部衰变能量吸收在量热器中，测得每次衰变平均约 $0.34\,\mathrm{MeV}$——是电子谱的平均值，而不是它 $1.16\,\mathrm{MeV}$ 的端点。能量看来不守恒了。角动量似乎也失效了：对 $n \to p + e^-$，三个自旋 $\tfrac12$ 的粒子不可能一边是半整数总量子数、另一边是整数总角动量。

1930 年 12 月 4 日的一封信里，泡利（Pauli）提出一个孤注一掷的补救办法：与电子一起放出一个第三种电中性、极轻、自旋 $\tfrac12$ 的粒子，它带走失踪的能量并逃过探测。费米（Fermi）给它取名为中微子（neutrino），并在 1934 年以它为基石建立了 β 衰变理论，仿照的是原子发射光子。反中微子由考恩（Cowan）与莱因斯（Reines）于 1956 年直接探测到，用的正是 Savannah River 反应堆旁一大罐液体闪烁体中的逆 β 反应 $\bar\nu_e + p \to n + e^+$。截面约 $10^{-47}\,\mathrm{m}^2$，这就是为什么需要反应堆每秒每平方米 $10^{17}$ 个反中微子的通量才探测得到。

### 费米理论与谱的形状

费米黄金定则（[[quantum-2/time-dependent]]）给出跃迁进连续末态的速率：

$$
\lambda = \frac{2\pi}{\hbar}\,\lvert M_{fi}\rvert^2\,\rho(E_f).
$$

费米假设强度为 $G_F$ 的点相互作用。对**允许**衰变，电子与中微子在核处产生且不带走轨道角动量，于是 $M_{fi}$ 与能量如何分配无关。谱的形状完全由末态密度决定。

::: theorem 允许 β 谱 {#thm-spectrum}
略去核反冲、中微子质量以及电子与子核的库仑相互作用。则动能在 $T$ 与 $T + \dd T$ 之间出射的电子数为

$$
N(T)\,\dd T \propto p\,E\,(Q - T)^2\,\dd T ,
$$ {#eq-spectrum}

其中 $E = T + m_e c^2$ 与 $pc = \sqrt{T^2 + 2T m_e c^2}$ 是电子的总能量与动量。
:::

::: proof
体积 $V$ 的箱中，$\dd^3 p$ 内的动量态数为 $V\,\dd^3 p/(2\pi\hbar)^3$。核吸收所需的任何动量而几乎不吸收能量，所以电子与中微子的动量彼此独立；角向积分之后，电子动量在 $[p, p + \dd p]$、中微子动量在 $[q, q + \dd q]$ 内的末态数正比于 $p^2\,\dd p\,q^2\,\dd q$。能量守恒固定中微子能量，$qc = Q - T$，所以固定 $T$ 时，单位能量上的中微子态密度正比于 $q^2\,\dd q/\dd E_\nu \propto (Q - T)^2$。于是 $N(p)\,\dd p \propto p^2 (Q - T)^2\,\dd p$。最后由 $E^2 = p^2c^2 + m_e^2c^4$ 得 $E\,\dd E = c^2 p\,\dd p$，且 $\dd T = \dd E$，所以 $p^2\,\dd p = pE\,\dd T/c^2$，即 [[#eq-spectrum]]。
:::

谱在两端都为零：$T = 0$ 处因为电子没有相空间，$T = Q$ 处因为中微子没有相空间。子核的库仑吸引把电子拉回、把正电子推开，这通过乘在 [[#eq-spectrum]] 上的**费米函数**（Fermi function）$F(Z', E)$ 计入：$\beta^-$ 谱在低能被增强，$\beta^+$ 谱被压低。

改写一下，[[#eq-spectrum]] 说的是 $\sqrt{N(T)/(pEF)}$ 是 $T$ 的直线，在 $T = Q$ 处与横轴相交。这张**库里图**（Kurie plot）是对理论的检验；中微子质量若非零，会使最后几个电子伏处发生弯曲。KATRIN 实验研究氚（tritium）衰变（$Q = 18.59\,\mathrm{keV}$）的端点，2024 年报告了有效电子反中微子质量的上限 $m_\nu < 0.45\,\mathrm{eV}/c^2$（90% 置信度）。

::: widget plot
f: sqrt(x^2 + 1.022 x) (x + 0.511) (Q - x)^2 heaviside(Q - x)
x: 0, 3
sliders: Q=1:0.2:3:0.05
labels: 不含费米函数的 N(T)
caption: 允许谱 [[#eq-spectrum]]（未归一化）对电子动能 $T$（MeV）作图，端点 $Q$ 由滑块给出（单位 MeV）。曲线打开在 $Q = 1\,\mathrm{MeV}$。它从零升起，在约 $Q$ 的三分之一处达到峰，然后在端点处落回零。把 $Q$ 从 $0.2$ 拖到 $3\,\mathrm{MeV}$，看面积增长得多么快：大 $Q$ 时大约像 $Q^5$——这就是萨金特定律，也是 β 寿命如此强烈地依赖可用能量的原因。
:::

对 $T$ 积分谱就得到速率。$Q \gg m_e c^2$ 时 $p \approx E/c \approx T/c$，且 $\int_0^Q T^2(Q - T)^2\,\dd T = Q^5/30$，所以 $\lambda \propto G_F^2\lvert M\rvert^2 Q^5$：**萨金特定律**（Sargent's rule），1933 年由伯纳德·萨金特（Bernard Sargent）从实验中观察到。核与核之间比较时，除掉能量依赖的办法是引用 **$ft$ 值**，即半衰期乘以相空间积分因子 $f(Z', Q)$；最快的（"超允许"）衰变 $\log_{10} ft$ 约为 3 到 4，"禁戒度"每升一级就增加几个单位。

选择定则由轻子带走的角动量决定。允许衰变中轻子不带走轨道角动量，所以核的宇称不变。若它们的自耦合成 $S = 0$（**费米**跃迁），$\Delta J = 0$。若耦合成 $S = 1$（**伽莫夫–泰勒**（Gamow–Teller）跃迁），$\Delta J = 0, \pm 1$，但 $0 \to 0$ 除外。中子衰变 $\tfrac12^+ \to \tfrac12^+$ 是两者的混合。要求轻子带走轨道角动量 $\ell$ 的衰变是**禁戒**的，速率大致每级慢 $(pR/\hbar)^{2\ell}$ 倍；其宇称改变为 $(-1)^\ell$。弱相互作用还破坏宇称——1957 年的吴健雄实验——那是 [[particles/symmetries]] 的故事。

## γ 衰变 {#gamma}

α 或 β 衰变之后，子核常常留在激发态。它靠放出 keV 到几 MeV 的光子落到低能态，这是原子光谱线的核类比，但有一个重要差别：核相对光子波长太小了，只有最低的几个多极有分量，而每升高一度多极阶数，速率便急剧下降。

光子能量等于能级间隔减去微小的反冲。动量守恒给核大小 $E_\gamma/c$ 的动量与动能

$$
E_R = \frac{E_\gamma^2}{2Mc^2},
$$

对 ${}^{60}\mathrm{Ni}$ 的 $1.333\,\mathrm{MeV}$ γ 射线约为 $16\,\mathrm{eV}$。对光谱学来说这可以忽略，但它远大于能级的自然宽度，这就是 γ 射线的共振吸收通常做不成的原因，也是穆斯堡尔（Mössbauer）1958 年在晶体中的无反冲吸收称得上发现的原因。

::: definition 多极辐射及其选择定则 {#def-multipole}
$J_i \to J_f$ 跃迁放出的光子带走整数角动量 $L \geq 1$，且 $\lvert J_i - J_f\rvert \le L \le J_i + J_f$。若宇称改变 $(-1)^L$ 则称为**电** $EL$ 跃迁，若宇称改变 $(-1)^{L+1}$ 则称为**磁** $ML$ 跃迁。于是 $E1$ 改变宇称，$M1$ 与 $E2$ 不改变，$M2$ 与 $E3$ 改变。$0 \to 0$ 跃迁不能放出单个光子。
:::

通常是允许的最低多极占主导。韦斯科普夫（Weisskopf）的单粒子估计（1951），按克拉尼的表，对以 MeV 计的光子能量 $E$ 给出：

| 多极 | $\lambda$（$\mathrm{s}^{-1}$） |
|---|---|
| $E1$ | $1.0\times10^{14} A^{2/3} E^3$ |
| $M1$ | $5.6\times10^{13} E^3$ |
| $E2$ | $7.3\times10^{7} A^{4/3} E^5$ |
| $M2$ | $5.6\times10^{7} A^{2/3} E^5$ |
| $E3$ | $34\, A^2 E^7$ |

$1\,\mathrm{MeV}$、中等质量核中，$L$ 每增加一单位就要付出约 $10^5$ 倍的因子。只能靠低能、高多极衰变的能级因此可以活上几秒、几小时甚至几年：这就是**同质异能素**（isomer）。[[#ex-tc]] 的亚稳态 ${}^{99\mathrm{m}}\mathrm{Tc}$（$t_{1/2} = 6\,\mathrm{h}$）就是一个；它在医学上有用，正是因为它只放出一个 $140.5\,\mathrm{keV}$ 的光子——便于成像——此外别无要紧的东西。

核也可以把激发能直接交给一个原子电子，电子以 $E - B_e$ 的能量被逐出，$B_e$ 是它的原子结合能。这种**内转换**（internal conversion）与 γ 发射竞争，在重核、低能量、高多极的情形占上风；对一个 $0^+ \to 0^+$ 跃迁，它是一步完成的唯一途径（除非能量超过 $2m_ec^2$，那时可以放出一对电子–正电子）。

::: example 钴-60 {#ex-co60}
${}^{60}\mathrm{Co}$（$5^+$，$t_{1/2} = 5.27\,\mathrm{yr}$）几乎全部 β 衰变到 ${}^{60}\mathrm{Ni}$ 位于 $2.506\,\mathrm{MeV}$ 的 $4^+$ 态，后者向位于 $1.333\,\mathrm{MeV}$ 的 $2^+$ 态放出 $1.173\,\mathrm{MeV}$ 的光子，$2^+$ 态再向 $0^+$ 基态放出 $1.333\,\mathrm{MeV}$ 的光子。原子质量为 $59.933816\,\mathrm{u}$（Co）与 $59.930786\,\mathrm{u}$（Ni）。求 β 端点能量，对 β 衰变与两个 γ 跃迁分类，并估计 $2^+$ 能级的寿命。
::: solution
由 [[#prop-beta-q]]，到基态的 $Q_{\beta^-} = (59.933816 - 59.930786)(931.494) = 2.823\,\mathrm{MeV}$。衰变到达 $2.506\,\mathrm{MeV}$ 的能级，所以端点为 $2.823 - 2.506 = 0.317\,\mathrm{MeV}$，与实测一致。

β 跃迁 $5^+ \to 4^+$ 的 $\Delta J = 1$ 且宇称不变：允许的伽莫夫–泰勒跃迁。直接衰变到 $2^+$ 或 $0^+$ 态需要 $\Delta J = 3$ 或 $5$，强烈禁戒，这就是高能级被布居的原因。

两个 γ 跃迁 $4^+ \to 2^+$ 与 $2^+ \to 0^+$ 都需要 $L \ge 2$ 且宇称不变：它们是 $E2$。取 $A = 60$、$E = 1.333\,\mathrm{MeV}$，韦斯科普夫估计为

$$
\lambda(E2) = 7.3\times10^7 \times 60^{4/3} \times 1.333^5\,\mathrm{s}^{-1} = 7.3\times10^7 \times 235 \times 4.21 = 7.2\times10^{10}\,\mathrm{s}^{-1},
$$

平均寿命约 $1.4\times10^{-11}\,\mathrm{s}$。该能级实测平均寿命约 $1\,\mathrm{ps}$，短了十倍不止：可变形核的集体态之间的 $E2$ 跃迁比单粒子估计增强，这是 [[particles/nuclear-structure]] 提到的集体运动的迹象。两个光子在相差几皮秒内先后放出，这就是 ${}^{60}\mathrm{Co}$ 作为具有两条谱线的标准刻度源的原因。
:::
:::

::: quiz
一个 $2^-$ 激发态经单个光子衰变到 $0^+$ 基态。阶次最低的允许多极是哪个？
- [ ] $E1$
- [ ] $M1$
- [x] $M2$
- [ ] $E2$
::: solution
光子必须带走 $L \ge \lvert 2 - 0\rvert = 2$ 且 $L \le 2$，所以 $L = 2$ 恰好。宇称改变，从 $-$ 到 $+$。$L = 2$ 时，电跃迁的宇称改变为 $(-1)^2 = +1$，即完全不改变，所以 $E2$ 被排除；磁跃迁改变为 $(-1)^3 = -1$。该跃迁是 $M2$。$E1$ 与 $M1$ 带不走两个单位的角动量。
:::
:::

::: history 放射性是如何被理解的
亨利·贝可勒尔于 1896 年 2—3 月发现了铀的辐射。居里夫妇（Marie and Pierre Curie）1898 年从沥青铀矿中分离出钋与镭，玛丽·居里造了"放射性"这个词。欧内斯特·卢瑟福 1899 年区分了 α 射线与 β 射线，保罗·维拉尔（Paul Villard）1900 年发现了 γ 射线。1902—03 年卢瑟福与弗雷德里克·索迪（Frederick Soddy）证明放射性是一种元素向另一种元素的嬗变，服从指数律；1908—09 年卢瑟福与托马斯·罗伊兹（Thomas Royds）把 α 粒子收集在真空管中观测氦光谱，证明 α 粒子就是氦核。伽莫夫、格尼与康登 1928 年把 α 衰变解释为隧穿，泡利 1930 年提出中微子，费米 1934 年发表 β 衰变理论；同年，伊莱娜·居里（Irène Curie）与弗雷德里克·约里奥（Frédéric Joliot）造出第一批人造放射性同位素，其中包括第一个正电子放射源。考恩与莱因斯 1956 年探测到反应堆反中微子。
:::

## 后续内容 {#leads}

[[particles/reactions]] 中的反应用的是同一套 Q 值记账，只不过多了一个入射粒子；把 α 粒子关在里面的库仑势垒，也正是使太阳中的聚变慢下来的那道势垒。β 衰变背后的弱相互作用带着它的点耦合 $G_F$，到 [[particles/standard-model]] 中被揭示为重 $W$ 玻色子的交换；它破坏宇称的事在 [[particles/symmetries]]。测量这些辐射的探测器在 [[particles/accelerators]]。衰变在化学、测年与医学中的应用见化学图谱的课程[核化学](/learn/chemistry/lesson.php?c=general-chemistry-2&l=nuclear-chemistry)。

::: summary
- 每个核以恒定的单位时间概率 $\lambda$ 衰变，所以 $N = N_0 e^{-\lambda t}$，$t_{1/2} = \ln 2/\lambda$，$\tau = 1/\lambda$，活度 $\mathcal{A} = \lambda N$，以贝可勒尔计。
- 在衰变链中，子核满足 $\dot N_2 = \lambda_1 N_1 - \lambda_2 N_2$。长寿命母核给出长期平衡，$\mathcal{A}_2 = \mathcal{A}_1$；寿命较短但不可忽略的母核给出瞬态平衡，$\mathcal{A}_2/\mathcal{A}_1 = \lambda_2/(\lambda_2 - \lambda_1)$。
- α 衰变是穿过库仑势垒的隧穿。伽莫夫因子 $e^{-2G}$——$2G$ 粗略正比于 $Z'/\sqrt{Q}$——解释了盖革–努塔尔定律以及横跨 20 多个数量级的寿命。
- 用原子质量表示，$Q_{\beta^-} = Q_\mathrm{EC} = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$，而 $Q_{\beta^+}$ 小 $2m_ec^2$。
- 连续的 β 谱要求有中微子（泡利 1930 年、费米 1934 年、1956 年探测到）。相空间给出 $N(T) \propto pE(Q - T)^2$，速率大约按 $Q^5$ 增长。
- 允许的 β 衰变宇称不变；费米跃迁 $\Delta J = 0$，伽莫夫–泰勒跃迁 $\Delta J = 0, \pm1$（$0 \to 0$ 除外）。
- γ 跃迁带走 $L \ge 1$；$EL$ 使宇称改变 $(-1)^L$，$ML$ 改变 $(-1)^{L+1}$。$L$ 每多一个单位速率就慢得厉害，于是产生同质异能素；内转换与之竞争。
:::

## 习题 {#exercises}

::: exercise 由两次计数定半衰期 {level=1 check="8"}
一样品的活度在 $24.0\,\mathrm{h}$ 内从 $800\,\mathrm{Bq}$ 降到 $100\,\mathrm{Bq}$。求它的半衰期，以小时计。
::: solution
活度降了 $8 = 2^3$ 倍，所以 $24.0\,\mathrm{h}$ 里过了三个半衰期，$t_{1/2} = 8.0\,\mathrm{h}$。形式上，$\lambda = \ln(800/100)/24.0\,\mathrm{h} = 0.0866\,\mathrm{h}^{-1}$，$t_{1/2} = \ln 2/\lambda = 8.00\,\mathrm{h}$。
:::
:::

::: exercise 一微克钴-60 的活度 {level=1 check="4.19e7"}
求 $1.00\,\mu\mathrm{g}$ 的 ${}^{60}\mathrm{Co}$ 的活度，以贝可勒尔计（$t_{1/2} = 5.271\,\mathrm{yr}$，摩尔质量 $59.93\,\mathrm{g/mol}$，$1\,\mathrm{yr} = 3.156\times10^7\,\mathrm{s}$）。
::: solution
$N = (1.00\times10^{-6}/59.93) \times 6.022\times10^{23} = 1.005\times10^{16}$。$\lambda = \ln 2/(5.271 \times 3.156\times10^7\,\mathrm{s}) = 4.167\times10^{-9}\,\mathrm{s}^{-1}$。于是 $\mathcal{A} = 4.19\times10^7\,\mathrm{Bq}$，约 $1.1\,\mathrm{mCi}$。一微克，肉眼看不见，却是一支强实验室源。
:::
:::

::: exercise 镭的 α 粒子能量 {level=1 check="4.78"}
${}^{226}\mathrm{Ra}$、${}^{222}\mathrm{Rn}$ 与 ${}^{4}\mathrm{He}$ 的原子质量为 $226.025410$、$222.017578$ 与 $4.002603\,\mathrm{u}$。求 $Q_\alpha$，再求衰变到氡基态时 α 粒子的动能，以 MeV 计。
::: solution
$Q = (226.025410 - 222.017578 - 4.002603)(931.494) = 0.005229 \times 931.494 = 4.871\,\mathrm{MeV}$。由 [[#eq-kalpha]]，$K_\alpha = Q \times 222.02/(222.02 + 4.00) = 4.871 \times 0.9823 = 4.78\,\mathrm{MeV}$。氡以其余的 $0.086\,\mathrm{MeV}$ 反冲；这样的反冲足以把子体原子从固体表面撞下来。
:::
:::

::: exercise 一只木碗 {level=2 check="4200"}
一只古代木碗的碳，其每克 ${}^{14}\mathrm{C}$ 活度是活木的 $0.600$ 倍。取 $t_{1/2} = 5700\,\mathrm{yr}$、大气比值恒定，这只碗有多少年历史（以年计，保留两位有效数字）？
::: solution
$t = (t_{1/2}/\ln 2)\ln(\mathcal{A}_0/\mathcal{A}) = (5700/0.6931)\ln(1/0.600) = 8224 \times 0.5108 = 4201\,\mathrm{yr}$，约 $4200\,\mathrm{yr}$。测得的比值每有 $1\%$ 误差，年代就移动约 $80\,\mathrm{yr}$，这就是放射性碳实验室要长时间计数的原因。
:::
:::

::: exercise 铀矿石中的镭 {level=2 check="0.34"}
${}^{226}\mathrm{Ra}$（$t_{1/2} = 1600\,\mathrm{yr}$）是 ${}^{238}\mathrm{U}$ 衰变系（$t_{1/2} = 4.468\times10^9\,\mathrm{yr}$）的成员。在古老而未受扰动的矿石中，每一吨（$10^6\,\mathrm{g}$）${}^{238}\mathrm{U}$ 伴生多少克镭？
::: solution
矿石处于长期平衡，所以每个成员活度相同，$\lambda_\mathrm{Ra}N_\mathrm{Ra} = \lambda_\mathrm{U}N_\mathrm{U}$，且 $N_\mathrm{Ra}/N_\mathrm{U} = t_{1/2,\mathrm{Ra}}/t_{1/2,\mathrm{U}} = 1600/4.468\times10^9 = 3.581\times10^{-7}$。用摩尔质量把原子数换算成质量，

$$
m_\mathrm{Ra} = 10^6\,\mathrm{g} \times 3.581\times10^{-7} \times \frac{226.03}{238.05} = 0.34\,\mathrm{g}.
$$

每吨三分之一克：居里夫妇处理了好几吨沥青铀矿渣，才得到十分之一克的氯化镭。
:::
:::

::: exercise 钠-22 的正电子端点能量 {level=2 check="1.821"}
${}^{22}\mathrm{Na}$（原子质量 $21.994437\,\mathrm{u}$）衰变为 ${}^{22}\mathrm{Ne}$（$21.991385\,\mathrm{u}$），主要到位于 $1.275\,\mathrm{MeV}$ 的激发态。求到基态的 $Q_\mathrm{EC}$ 与 $Q_{\beta^+}$（以 MeV 计），以及到激发态分支的正电子端点能量。
::: solution
$Q_\mathrm{EC} = (21.994437 - 21.991385)(931.494) = 0.003052 \times 931.494 = 2.843\,\mathrm{MeV}$。由 [[#prop-beta-q]]，到基态 $Q_{\beta^+} = 2.843 - 1.022 = 1.821\,\mathrm{MeV}$。到激发态的端点为 $1.821 - 1.275 = 0.546\,\mathrm{MeV}$，正是主正电子分支测得的值。校验要求的答案是基态的 $Q_{\beta^+} = 1.821\,\mathrm{MeV}$。
:::
:::

::: exercise 部分半衰期 {level=2 check="33.0"}
${}^{64}\mathrm{Cu}$ 的 $t_{1/2} = 12.70\,\mathrm{h}$，其衰变的 $38.5\%$ 走 $\beta^-$。若 $\beta^-$ 是唯一分支，它的半衰期会是多少，以小时计？
::: solution
$\beta^-$ 的部分衰变常量为 $\lambda_{\beta^-} = 0.385\lambda$，所以部分半衰期为 $t_{1/2}/0.385 = 12.70/0.385 = 33.0\,\mathrm{h}$。它并不是你只看电子就能观察到的半衰期：那些电子按完整的 $12.70\,\mathrm{h}$ 消失，因为所有分支抽干的是同一批核。
:::
:::

::: exercise 无反冲 γ 射线 {level=2 check="1.96e-3"}
${}^{57}\mathrm{Fe}$ 的第一激发态以 $14.413\,\mathrm{keV}$ 的光子衰变；原子质量为 $56.935\,\mathrm{u}$。求自由铁核的反冲能量，以 eV 计，并与该能级的自然宽度 $\Gamma = \hbar/\tau$ 比较，其平均寿命为 $141\,\mathrm{ns}$。
::: solution
$E_R = E_\gamma^2/2Mc^2 = (0.014413\,\mathrm{MeV})^2/(2 \times 56.935 \times 931.494\,\mathrm{MeV}) = 1.96\times10^{-9}\,\mathrm{MeV} = 1.96\times10^{-3}\,\mathrm{eV}$。宽度为 $\Gamma = 6.582\times10^{-16}\,\mathrm{eV\,s}/1.41\times10^{-7}\,\mathrm{s} = 4.7\times10^{-9}\,\mathrm{eV}$。反冲使谱线移动约 $4\times10^5$ 个宽度，所以自由核无法再吸收它；在晶体中整个晶格一起反冲，移动便消失了（穆斯堡尔效应）。
:::
:::

::: exercise 子核的极大 {level=3}
对 [[#thm-bateman]] 中 $\lambda_1 \neq \lambda_2$ 的两成员链，证明 $N_2$ 恰有一个极大，位置在 $t_\mathrm{max} = \ln(\lambda_2/\lambda_1)/(\lambda_2 - \lambda_1)$，并且在那一刻母核与子核的活度相等。再证明交换 $\lambda_1$ 与 $\lambda_2$ 时 $t_\mathrm{max}$ 不变。
::: hint
不要对解求导，直接对子核的方程求导：$\dd N_2/\dd t = 0$ 关于 $\lambda_1 N_1$ 与 $\lambda_2 N_2$ 说了什么？
:::
::: solution
由速率方程，$\dd N_2/\dd t = \lambda_1 N_1 - \lambda_2 N_2 = \mathcal{A}_1 - \mathcal{A}_2$。所以 $N_2$ 的任何驻点处两个活度相等，第二个结论得证。

由 [[#eq-bateman]]，$\dd N_2/\dd t = N_1(0)\lambda_1(\lambda_2 e^{-\lambda_2 t} - \lambda_1 e^{-\lambda_1 t})/(\lambda_2 - \lambda_1)$。它为零恰好当 $e^{(\lambda_2 - \lambda_1)t} = \lambda_2/\lambda_1$，该方程恰有一个解 $t_\mathrm{max} = \ln(\lambda_2/\lambda_1)/(\lambda_2 - \lambda_1)$，并且无论哪个 $\lambda$ 更大它都是正的，因为分子与分母同号。$N_2$ 从 $0$ 出发，$t > 0$ 时为正，$t \to \infty$ 时趋于 $0$，所以这唯一的驻点就是极大。

交换 $\lambda_1 \leftrightarrow \lambda_2$ 使 $\ln(\lambda_2/\lambda_1)$ 与 $\lambda_2 - \lambda_1$ 同时变号，所以 $t_\mathrm{max}$ 不变。长寿命母核喂养短寿命子核，与短寿命母核喂养长寿命子核，在同一时刻达峰，尽管峰值高低悬殊。
:::
:::

::: exercise 萨金特定律 {level=3}
(a) 在 $Q \gg m_e c^2$ 极限下，由 [[#eq-spectrum]]（不含费米函数）证明总衰变速率正比于 $Q^5$。(b) 证明同一极限下电子平均动能为 $Q/2$，并解释埃利斯与伍斯特对 ${}^{210}\mathrm{Bi}$ 测得的平均值为何远小于端点的一半。
::: hint
$T \gg m_ec^2$ 时 $p \approx T/c$、$E \approx T$。用 $\int_0^1 u^m(1-u)^n\,\dd u = m!\,n!/(m+n+1)!$。
:::
::: solution
(a) $pE \approx T^2/c$，所以速率正比于 $\int_0^Q T^2(Q - T)^2\,\dd T$。代换 $T = Qu$ 得 $Q^5\int_0^1 u^2(1-u)^2\,\dd u = Q^5 \cdot 2!\,2!/5! = Q^5/30$。其余因子都与 $Q$ 无关，故 $\lambda \propto Q^5$。

(b) 平均值为 $\langle T\rangle = \int T^3(Q-T)^2\,\dd T/\int T^2(Q-T)^2\,\dd T = Q\,(3!\,2!/6!)/(2!\,2!/5!) = Q\,(1/60)/(1/30) = Q/2$，利用了分母中 $u^2(1-u)^2$ 在 $u \leftrightarrow 1 - u$ 下的对称性。对 ${}^{210}\mathrm{Bi}$，$Q = 1.16\,\mathrm{MeV}$ 只有 $m_ec^2$ 的两倍左右，近似失效。精确因子 $pEc = \sqrt{T^2 + 2Tm_ec^2}\,(T + m_ec^2)$ 超过 $T^2$ 的比值随 $T \to 0$ 无界增长，所以它给谱的低能部分以比 $T^2$ 近似更大的权重。还有两个效应同向推波助澜：$Z' = 84$ 的费米函数强烈增强慢电子，而该衰变是一级禁戒的，谱形也偏向低能。合力把平均值压到实测的 $0.34\,\mathrm{MeV}$，约为 $0.29Q$。
:::
:::
