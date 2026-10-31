到 1900 年，经典物理已经能用同一小组规律解释一颗行星、一台蒸汽机与一束无线电波。它却无法解释一块炽热煤炭的颜色。此后四分之一世纪里又出现了四项失效：光从金属中打出的电子的能量、X 射线被电子散射后波长的改变、氢光谱中尖锐的谱线，以及电子被晶体的衍射。每一项失效都由一条当时看来任意的规则补救，而每条规则都涉及同一个新常量——普朗克常量 $h$。

本章按顺序讲述这五项证据，并用真实的数字把每个计算完整做一遍。这里的每条规则都不是最终理论。普朗克量子化的振子、爱因斯坦的光量子、玻尔的轨道和德布罗意的波都是垫脚石，[[quantum-1/schrodinger-equation]] 的薛定谔方程将取代它们。它们仍值得好好学，原因有二。它们告诉你任何量子理论都必须复现哪些实验；而它们使用的数量级论证（比较 $h\nu$ 与 $k_B T$，比较德布罗意波长与装置的尺度）正是物理工作者判断量子效应到底要不要紧的方法。

我们通篇采用 CODATA 2018 数值。自 2019 年起，其中几个数值由 SI 单位的定义直接取为精确值：

$$
h = 6.62607015\times10^{-34}\,\mathrm{J\,s},\quad e = 1.602176634\times10^{-19}\,\mathrm{C},\quad k_B = 1.380649\times10^{-23}\,\mathrm{J/K},\quad c = 2.99792458\times10^{8}\,\mathrm{m/s}.
$$

我们还需要 $\hbar = h/2\pi = 1.054571817\times10^{-34}\,\mathrm{J\,s}$、电子质量 $m_e = 9.1093837015\times10^{-31}\,\mathrm{kg}$、质子质量 $m_p = 1.67262192369\times10^{-27}\,\mathrm{kg}$ 以及 $\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$。一个能省去大量算术的组合是 $hc = 1239.84\,\mathrm{eV\,nm}$：波长以纳米计为 $\lambda$ 的光子，能量为 $1239.84/\lambda$ 电子伏特。

## 黑体辐射 {#blackbody}

任何处于温度 $T$ 的物体都在发射电磁辐射。火中的铁钳受热时先发出暗红、继而橙色、几乎变白的光，而颜色几乎只取决于温度，与铁钳由什么做成无关。这个问题最干净的版本是一个壁面维持在温度 $T$ 的闭合空腔。壁面不断吸收再发射，直到腔内辐射与壁面之间达到热平衡。壁上开一个小孔，可以在不扰动平衡的情况下取出一个辐射样本；而这个小孔吸收落在其上的一切，这辐射因此被称为**黑体辐射**。

::: definition 谱能量密度 {#def-spectral}
温度 $T$ 下处于平衡的辐射，其**谱能量密度** $u(\nu, T)$ 定义如下：$u(\nu,T)\,\dd\nu$ 是频率介于 $\nu$ 与 $\nu + \dd\nu$ 之间的模式所携带的电磁能量（按单位体积计）。总能量密度为 $u(T) = \int_0^\infty u(\nu,T)\,\dd\nu$。基尔霍夫（Kirchhoff）在 1860 年证明，$u(\nu,T)$ 是一个普适函数，与空腔的材料和形状无关。
:::

### 模式计数

经典计算有两个组成部分：空腔在每个频率支持多少个驻波模式，以及每个模式携带多少能量。取一个边长为 $L$、壁面为导体的立方体。驻波的电场有 $\sin(k_x x)\sin(k_y y)\sin(k_z z)$ 形的分量（其余分量是余弦），边界条件要求

$$
k_x = \frac{\pi n_x}{L},\quad k_y = \frac{\pi n_y}{L},\quad k_z = \frac{\pi n_z}{L},\qquad n_x, n_y, n_z = 1, 2, 3, \ldots
$$

每个允许的波矢都是 $k$ 空间正挂限内间距为 $\pi/L$ 的立方格点中的一个点，每个模式带有两个独立的偏振。频率为 $\nu = ck/2\pi$，其中 $k = \abs{\mathbf k}$。当 $K$ 很大时，满足 $k$ 小于某个值 $K$ 的格点数就是球体积的八分之一除以每个点占的体积 $(\pi/L)^3$：

$$
N(K) = 2\times\frac{1}{8}\cdot\frac{4\pi K^3/3}{(\pi/L)^3} = \frac{K^3 L^3}{3\pi^2}.
$$

代入 $K = 2\pi\nu/c$ 与 $V = L^3$ 得 $N = 8\pi V\nu^3/(3c^3)$，于是单位体积单位频率的模式数为

$$
g(\nu) = \frac{1}{V}\deriv{N}{\nu} = \frac{8\pi\nu^2}{c^3}.
$$ {#eq-modes}

只要波长远小于空腔的尺度，结果就与空腔的形状无关，而这正是基尔霍夫普适性所要求的。

### 经典答案及其失败

在经典统计力学中，场的每个模式都是一个谐振子，能量均分定理（[[thermodynamics/kinetic-theory]]）给每个谐振子 $k_B T$ 的平均能量：电能（势型）贡献 $\frac12 k_B T$，磁能（动型）贡献 $\frac12 k_B T$。乘以模式密度 [[#eq-modes]] 就得到**瑞利-金斯（Rayleigh–Jeans）定律**

$$
u_{\mathrm{RJ}}(\nu, T) = \frac{8\pi\nu^2}{c^3}\,k_B T.
$$ {#eq-rj}

低频时这与实验相符。高频时它无界增长，总能量 $\int_0^\infty u\,\dd\nu$ 发散。一个处于平衡的空腔将含有无穷大的能量，而且几乎全部在紫外及更远的位置。埃伦费斯特（Ehrenfest）后来把这称为**紫外灾难**。相比之下，实测谱线先上升、到达峰值、再指数下降。

### 普朗克假设

普朗克（Planck）在 1900 年 12 月迈出的一步，是假设频率为 $\nu$ 的振子只能取能量 $E_n = n h\nu$，$n = 0, 1, 2, \ldots$，其中 $h$ 是一个新常量。他把这呈现为一种形式上的手法；爱因斯坦（Einstein）与埃伦费斯特后来才让人们看清它有多激进。

::: theorem 普朗克定律 {#thm-planck}
若温度 $T$ 下处于平衡、频率为 $\nu$ 的振子只能取能量 $nh\nu$，$n = 0, 1, 2, \ldots$，且各能级的玻尔兹曼概率正比于 $e^{-nh\nu/k_B T}$，则其平均能量为

$$
\langle E\rangle = \frac{h\nu}{e^{h\nu/k_B T} - 1},
$$ {#eq-mean-energy}

黑体辐射的谱能量密度为

$$
u(\nu, T) = \frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{h\nu/k_B T}-1}.
$$ {#eq-planck}
:::

::: proof
记 $\beta = 1/k_B T$，$\varepsilon = h\nu$。配分函数是一个几何级数，因 $e^{-\beta\varepsilon} < 1$ 而收敛：

$$
Z = \sum_{n=0}^\infty e^{-n\beta\varepsilon} = \frac{1}{1 - e^{-\beta\varepsilon}}.
$$

平均能量为 $\langle E\rangle = \sum_n E_n e^{-\beta E_n}/Z = -\partial(\ln Z)/\partial\beta$。由 $\ln Z = -\ln(1 - e^{-\beta\varepsilon})$，

$$
\langle E\rangle = \frac{\varepsilon\, e^{-\beta\varepsilon}}{1 - e^{-\beta\varepsilon}} = \frac{\varepsilon}{e^{\beta\varepsilon} - 1},
$$

这正是 [[#eq-mean-energy]]。在经典计算中把 $k_B T$ 逐模式换成这个平均能量，再乘以 [[#eq-modes]]，就得到 [[#eq-planck]]。
:::

两个极限说明了发生了什么。当 $h\nu \ll k_B T$ 时，以 $x = h\nu/k_BT$ 展开 $e^{x} - 1 \approx x$：平均能量为 $k_B T$，瑞利-金斯定律得以恢复。当 $h\nu \gg k_B T$ 时，平均能量为 $h\nu\, e^{-h\nu/k_BT}$，指数小。一个模式，若其最小可能激发能 $h\nu$ 远大于典型热能 $k_B T$，它就几乎不会被激发。全部补救就在于此：高频模式被冻结了。

::: widget plot
f: x^3/(exp(x) - 1); x^2
x: 0.01, 12
y: 0, 2
labels: 普朗克; 瑞利-金斯
caption: 两条曲线都是在 $x = h\nu/k_B T$ 为单位下的能量密度；普朗克的是 $x^3/(e^x-1)$，瑞利-金斯的是 $x^2$。$x \ll 1$ 时两者吻合。注意普朗克曲线在哪里达到峰值——在 $x \approx 2.82$ 附近——以及 $x \approx 10$ 之后它衰减得多快，而经典抛物线早已冲出图顶。改变温度只是水平方向伸缩坐标轴，这就是维恩（Wien）位移定律。
:::

::: example 经典定律错得多厉害？{#ex-rj-fail}
对 (a) 太阳温度 $5772\,\mathrm{K}$ 下波长 $500\,\mathrm{nm}$ 的绿光；(b) 同样波长的光在室温 $300\,\mathrm{K}$ 下；(c) $2.725\,\mathrm{K}$ 宇宙背景辐射中波长 $1.00\,\mathrm{mm}$ 的微波，计算 $x = h\nu/k_BT$、比值 $u_{\mathrm{RJ}}/u_{\mathrm{Planck}}$ 以及每个模式的平均量子数 $\bar n = \langle E\rangle/h\nu = 1/(e^x - 1)$。
::: solution
[[#eq-rj]] 与 [[#eq-planck]] 之比是 $k_BT/\langle E\rangle = (e^x - 1)/x$，且 $x = hc/\lambda k_BT$。

(a) $x = (6.62607\times10^{-34})(2.99792\times10^8)/\bigl((5.00\times10^{-7})(1.380649\times10^{-23})(5772)\bigr) = 4.985$。于是 $(e^x-1)/x = 145.3/4.985 = 29.1$：在太阳光谱的峰值处，经典定律高估约 $29$ 倍。平均占据数为 $\bar n = 1/145.3 = 0.0069$；任何时刻大多数模式里一个光子也没有。

(b) $300\,\mathrm{K}$ 时，$x = 95.9$，$e^{x} \approx 4.5\times10^{41}$，故 $\bar n \approx 2.2\times10^{-42}$。室温空腔中的可见光模式实际上全空，这就是身边的物体不发光的原因。瑞利-金斯定律却会给每个模式配上 $k_BT$。

(c) $x = hc/(10^{-3}\,\mathrm{m}\cdot k_B\cdot 2.725\,\mathrm{K}) = 5.28$，于是比值为 $(e^{5.28}-1)/5.28 = 195.4/5.28 = 37.0$，$\bar n = 0.0051$。毫米级波长位于背景辐射峰值的短波一侧；按单位波长计，峰值在 $2.8977\times10^{-3}/2.725 = 1.06\,\mathrm{mm}$ 处。

每种情形下，失效程度都由单个数 $x$ 控制。只有 $x \ll 1$ 时，经典物理才是一个好近似。
:::
:::

### 斯特藩-玻尔兹曼与维恩

两条更早的经验定律直接从 [[#eq-planck]] 掉出来。求总能量密度时令 $x = h\nu/k_BT$，于是 $\nu = k_BTx/h$，$\dd\nu = (k_BT/h)\,\dd x$：

$$
u(T) = \frac{8\pi h}{c^3}\left(\frac{k_BT}{h}\right)^4\int_0^\infty \frac{x^3}{e^x - 1}\,\dd x = \frac{8\pi^5 k_B^4}{15 h^3 c^3}\,T^4,
$$

其中用到了标准积分 $\int_0^\infty x^3/(e^x-1)\,\dd x = \pi^4/15$。黑表面单位面积辐射的功率是能量密度的 $c/4$ 倍（因子 $1/4$ 是 $c\cos\theta$ 对离开表面各方向的平均），于是得到**斯特藩-玻尔兹曼（Stefan–Boltzmann）定律** $j = \sigma T^4$，其中

$$
\sigma = \frac{2\pi^5 k_B^4}{15 h^3 c^2} = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}.
$$

斯特藩（Stefan）1879 年从测量得出 $T^4$ 定律，玻尔兹曼（Boltzmann）1884 年从热力学导出它；只有普朗克的公式给出了这个常量。

论峰值，按单位频率还是按单位波长来画是有区别的。按单位波长，$u_\lambda = u_\nu\,\abs{\dd\nu/\dd\lambda} = u_\nu c/\lambda^2$，所以

$$
u_\lambda(\lambda, T) = \frac{8\pi hc}{\lambda^5}\,\frac{1}{e^{hc/\lambda k_B T} - 1}.
$$

令 $\dd u_\lambda/\dd\lambda = 0$，取 $x = hc/\lambda k_BT$，得 $x = 5(1 - e^{-x})$，其非零根（从 $x = 5$ 起迭代 $x \mapsto 5(1-e^{-x})$ 求得）为 $x = 4.965114$。于是得到**维恩位移定律**

$$
\lambda_{\max} T = \frac{hc}{4.965114\,k_B} = 2.897772\times10^{-3}\,\mathrm{m\,K}.
$$ {#eq-wien}

::: example 太阳与你 {#ex-sun}
太阳的表面有效温度为 $5772\,\mathrm{K}$。求其按单位波长的谱达到峰值的波长，以及其表面每平方米辐射的功率。再求 $310\,\mathrm{K}$ 的人体的峰值波长。
::: solution
由 [[#eq-wien]]，

$$
\lambda_{\max} = \frac{2.897772\times10^{-3}\,\mathrm{m\,K}}{5772\,\mathrm{K}} = 5.020\times10^{-7}\,\mathrm{m} = 502\,\mathrm{nm},
$$

这是蓝绿色光，接近可见光带的中段。表面能流为

$$
j = \sigma T^4 = (5.670374\times10^{-8})(5772)^4 = 6.29\times10^{7}\,\mathrm{W/m^2}.
$$

对人体，$\lambda_{\max} = 2.897772\times10^{-3}/310 = 9.35\times10^{-6}\,\mathrm{m} = 9.35\,\mu\mathrm{m}$，位于热红外区。这正是热像仪使用的波段。温度之比约 $18.6$，即峰值波长之比；其四次方约 $1.2\times10^5$，即能流之比。
:::
:::

::: warning 峰值取决于变量
$u_\nu$ 的峰值不在 $\nu = c/\lambda_{\max}$ 处。求 $u_\nu$ 的最大值给出 $x = 3(1 - e^{-x})$，于是 $x = 2.821$，$\nu_{\max} = 2.821\,k_BT/h$。对太阳这是 $3.39\times10^{14}\,\mathrm{Hz}$，$c/\nu_{\max} = 883\,\mathrm{nm}$，在近红外区，而不是 $502\,\mathrm{nm}$。两个答案都不错。按单位频率的密度与按单位波长的密度是不同的函数，因为雅可比因子 $c/\lambda^2$ 不是常量。说"太阳光谱的峰值在绿光"，只是关于某一特定变量选择的一个陈述。
:::

## 光电效应 {#photoelectric}

光照在真空中的洁净金属表面上会打出电子。勒纳德（Lenard）1902 年的测量确立了光的波动理论无法解释的三个事实。

1. 被打出电子的最大动能取决于光的频率，而不取决于光的强度。更亮的光打出更多的电子，而不是更快的电子。
2. 低于某个取决于金属的截止频率时，无论光多强都没有电子被打出。
3. 发射立即开始，测不出任何可测的延迟，即使光极其微弱。经典波把能量摊到整个受照面积上；估算一个原子吸收到足够能量所需的时间，在微弱光下会得到几分钟甚至几小时。

爱因斯坦 1905 年的论文提出，光本身就由量子组成。

::: definition 光子 {#def-photon}
频率为 $\nu$、波长为 $\lambda = c/\nu$ 的电磁辐射以不可再分的单位——**光子**——与物质交换能量和动量，每个光子携带

$$
E = h\nu = \hbar\omega, \qquad p = \frac{E}{c} = \frac{h}{\lambda} = \hbar k.
$$ {#eq-photon}

动量关系来自零质量粒子的相对论性能量-动量关系 $E^2 = p^2c^2 + m^2c^4$（[[relativity/velocity-energy]]）。
:::

金属内的一个电子吸收一个光子。把电子从表面移出所需的最小能量称为金属的**功函数** $W$，约为几个电子伏特。能量最高的电子以

$$
K_{\max} = h\nu - W.
$$ {#eq-einstein}

离开。三个事实全部成立。$K_{\max}$ 通过 $h\nu$ 依赖于 $\nu$；强度是每秒入射的光子数，它决定电子的数目。截止频率为 $\nu_0 = W/h$。单个光子一次性交出全部能量。测量 $K_{\max}$ 时，使收集极相对发射极为负，并增大反向电压直到电流停止。该**遏止电压** $V_0$ 满足 $eV_0 = K_{\max}$，于是

$$
V_0 = \frac{h}{e}\,\nu - \frac{W}{e}.
$$

$V_0$ 对 $\nu$ 的图像是一条斜率为 $h/e$ 的直线，对一切金属都相同。密立根（Millikan）本想驳斥这一预言，却在 1916 年证实了它，得到的 $h$ 与现代值相差约半个百分点以内。

::: example 紫光下的钠 {#ex-sodium}
钠的功函数 $W = 2.28\,\mathrm{eV}$。波长 $400\,\mathrm{nm}$ 的光照在钠上。求光子能量、光电子的最大动能与速率、遏止电压以及截止波长。
::: solution
由 $hc = 1239.84\,\mathrm{eV\,nm}$，

$$
E = \frac{hc}{\lambda} = \frac{1239.84}{400}\,\mathrm{eV} = 3.10\,\mathrm{eV}.
$$

由 [[#eq-einstein]]，$K_{\max} = 3.10 - 2.28 = 0.82\,\mathrm{eV}$，故遏止电压为 $V_0 = 0.82\,\mathrm{V}$。以焦耳计 $K_{\max} = 0.82\times1.602\times10^{-19} = 1.31\times10^{-19}\,\mathrm{J}$，这远小于 $m_ec^2 = 511\,\mathrm{keV}$，非相对论公式完全够用：

$$
v = \sqrt{\frac{2K_{\max}}{m_e}} = \sqrt{\frac{2(1.31\times10^{-19})}{9.109\times10^{-31}}} = 5.4\times10^{5}\,\mathrm{m/s}.
$$

截止波长就是光子能量等于 $W$ 的那个波长：

$$
\lambda_0 = \frac{hc}{W} = \frac{1239.84}{2.28}\,\mathrm{nm} = 544\,\mathrm{nm}.
$$

波长 $530\,\mathrm{nm}$ 的绿光仍能打出电子；而钠灯 $589\,\mathrm{nm}$ 的黄光，无论多强，都打不出钠的电子。
:::
:::

::: widget plot
f: max(4.1357*x - W, 0)
x: 0, 2
y: 0, 4
sliders: W=2.28:1:5:0.01
caption: 功函数为 $W$（滑块，单位 eV）的金属，其最大动能 $K_{\max}$（单位 eV）随频率（单位 $10^{15}\,\mathrm{Hz}$）的变化。斜率 $h = 4.1357\times10^{-15}\,\mathrm{eV\,s}$ 对一切金属都相同，只有截止点在移动。取 $W = 2.28$（钠），可读出截止点在 $0.55\times10^{15}\,\mathrm{Hz}$ 附近，正对应算例中的 $544\,\mathrm{nm}$。
:::

::: quiz
光电实验中，光的强度加倍而频率保持在截止频率之上不变。会发生什么？
- [ ] 遏止电压加倍。
- [ ] 电子的最大动能增大 $\sqrt2$ 倍。
- [x] 光电流大约加倍，遏止电压不变。
- [ ] 什么都不变，因为光子能量不变。
::: solution
频率不变时强度加倍，每秒入射的光子数加倍，于是每秒打出的电子数约为原来的两倍，而每个光子仍携带 $h\nu$。最大动能 $h\nu - W$ 不变，从而 $V_0$ 不变。最后一个选项忘了电流取决于光子的数目。
:::
:::

## 康普顿散射 {#compton}

若光子携带动量 $h/\lambda$，那么从自由电子上反弹的光子就应当把一部分能量交给反冲电子，自己以更长的波长离开。康普顿（Compton）1923 年测量的正是这一现象：用钼的 X 射线照射石墨产生散射。

::: theorem 康普顿公式 {#thm-compton}
波长为 $\lambda$ 的光子与一个初始静止的自由电子散射，沿与原方向成 $\theta$ 角的方向离开。散射后的波长为

$$
\lambda' = \lambda + \frac{h}{m_e c}\,(1 - \cos\theta).
$$ {#eq-compton}

常量 $\lambda_C = h/m_ec = 2.426310\times10^{-12}\,\mathrm{m}$ 是电子的**康普顿波长**。
:::

::: proof
使用相对论的能量与动量守恒。设光子散射前的动量为 $\mathbf p$、散射后的动量为 $\mathbf p'$，其大小分别为 $p = h/\lambda$ 与 $p' = h/\lambda'$；电子散射后的动量为 $\mathbf P$。动量守恒给出 $\mathbf P = \mathbf p - \mathbf p'$，于是

$$
P^2 = p^2 + p'^2 - 2pp'\cos\theta.
$$

能量守恒，电子的能量为 $\sqrt{P^2c^2 + m_e^2c^4}$，给出

$$
pc + m_ec^2 = p'c + \sqrt{P^2c^2 + m_e^2c^4}.
$$

把 $p'c$ 移到左边并平方：

$$
(p - p')^2c^2 + 2(p - p')m_ec^3 + m_e^2c^4 = P^2c^2 + m_e^2c^4.
$$

代入 $P^2$，消去 $m_e^2c^4$ 与 $(p^2 + p'^2)c^2$，剩下

$$
-2pp' + 2(p - p')m_ec = -2pp'\cos\theta, \qquad\text{故}\qquad \frac{1}{p'} - \frac{1}{p} = \frac{1 - \cos\theta}{m_ec}.
$$

乘以 $h$ 并用 $\lambda = h/p$，就得到 [[#eq-compton]]。
:::

平移量不依赖入射波长，只依赖角度。它从前向的零变到背散的 $2\lambda_C = 4.85\,\mathrm{pm}$。对可见光，$\lambda \approx 500\,\mathrm{nm}$，几皮米的平移只是约 $10^{-5}$ 的相对变化，这就是该效应在可见光波段不可见的原因。对 $\lambda\approx 0.07\,\mathrm{nm}$ 的 X 射线，这有百分之几。康普顿还看到一条不平移的谱线，来自光子与紧束缚内层电子的散射：那时整个原子反冲，$m_e$ 实际上被一个大数千倍的质量取代。

::: example 90° 散射的钼 X 射线 {#ex-compton}
钼的 $K_\alpha$ X 射线波长 $\lambda = 71.1\,\mathrm{pm}$。求 $90^\circ$ 散射辐射的波长与反冲电子的动能。对 $180^\circ$ 背散重复计算。
::: solution
$90^\circ$ 时 $1 - \cos\theta = 1$，故 $\lambda' = 71.1 + 2.426 = 73.53\,\mathrm{pm}$。电子的动能就是光子损失的能量：

$$
K = hc\left(\frac{1}{\lambda} - \frac{1}{\lambda'}\right) = 1239.84\,\mathrm{eV\,nm}\left(\frac{1}{0.0711} - \frac{1}{0.07353}\right)\mathrm{nm^{-1}} = 575\,\mathrm{eV}.
$$

$180^\circ$ 时 $1-\cos\theta = 2$，故 $\lambda' = 71.1 + 4.853 = 75.95\,\mathrm{pm}$，且

$$
K = 1239.84\left(\frac{1}{0.0711} - \frac{1}{0.07595}\right)\,\mathrm{eV} = 1.11\,\mathrm{keV}.
$$

入射光子携带 $1239.84/0.0711 = 17.4\,\mathrm{keV}$，所以即使正碰，电子也只拿走其中约 $6\%$。由于 $1.11\,\mathrm{keV} \ll 511\,\mathrm{keV}$，反冲电子是非相对论性的；光子却不是——这就是证明中光子一侧必须用相对论运动学的原因。
:::
:::

## 玻尔原子 {#bohr}

灼热的氢气只在一些尖锐的波长上发光。1885 年巴耳末（Balmer）发现四条可见谱线满足 $\lambda = B\,n^2/(n^2 - 4)$，$n = 3, 4, 5, 6$；里德伯（Rydberg）随后写出一般规律

$$
\frac{1}{\lambda} = R\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \qquad n_2 > n_1,
$$ {#eq-rydberg}

其中经验常量 $R \approx 1.097\times10^{7}\,\mathrm{m^{-1}}$。与此同时，卢瑟福（Rutherford）1911 年的散射实验表明，原子的正电荷集中在一个极小的核里。绕核运行的经典电子在加速，而加速的电荷会辐射（[[magnetism/electromagnetic-waves]]）。拉莫尔（Larmor）公式给出的氢电子螺旋坠入时间约为 $1.6\times10^{-11}\,\mathrm{s}$，且发射辐射的频率会随螺旋过程连续扫过。稳定的原子和尖锐的谱线，经典物理一条也预言不了。

玻尔（Bohr）1913 年的论文接受了原子核，然后干脆立法规定原子的稳定性。

::: definition 玻尔假设 {#def-bohr}
1. 电子在库仑力作用下绕核做圆周运动，服从牛顿定律，但只有角动量为 $\hbar$ 整数倍的轨道是允许的：$L = m_e v r = n\hbar$，$n = 1, 2, 3, \ldots$
2. 在允许的轨道上电子不辐射。
3. 电子从能量为 $E_i$ 的轨道跃迁到能量更低的轨道 $E_f$ 时，发射一个频率为 $\nu = (E_i - E_f)/h$ 的光子。
:::

$L$ 的量子化并非玻尔最初的条件形式，但它最简洁。其余一切都是经典力学。对电荷为 $Ze$ 的核（除习题外我们取 $Z = 1$），圆轨道的牛顿第二定律为

$$
\frac{m_e v^2}{r} = \frac{Ze^2}{4\pi\varepsilon_0 r^2}.
$$

用量子化条件消去 $v = n\hbar/m_e r$：$m_e(n\hbar/m_er)^2/r = Ze^2/4\pi\varepsilon_0 r^2$，于是

$$
r_n = \frac{n^2}{Z}\,a_0, \qquad a_0 = \frac{4\pi\varepsilon_0\hbar^2}{m_e e^2} = 5.29177\times10^{-11}\,\mathrm{m}.
$$ {#eq-bohr-radius}

能量是动能加势能。向心力方程给出 $m_ev^2 = Ze^2/4\pi\varepsilon_0 r$，所以动能是势能的负一半（平方反比力的位力定理），且

$$
E_n = \frac12 m_e v^2 - \frac{Ze^2}{4\pi\varepsilon_0 r_n} = -\frac{Ze^2}{8\pi\varepsilon_0 r_n} = -\frac{Z^2}{n^2}\,\frac{m_e e^4}{8\varepsilon_0^2 h^2}.
$$ {#eq-bohr-energy}

常量 $m_e e^4/8\varepsilon_0^2h^2 = 13.6057\,\mathrm{eV}$ 是**里德伯能量**。氢的基态能量 $E_1 = -13.6\,\mathrm{eV}$，因此电离它需要 $13.6\,\mathrm{eV}$，与实验相符。第一轨道上的速率为 $v_1 = \alpha c$，其中 $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$ 是**精细结构常数**，故 $v_1 = 2.19\times10^6\,\mathrm{m/s}$，相对论修正的相对大小为 $\alpha^2 \approx 5\times10^{-5}$。

从 $n_2$ 跃迁到 $n_1$ 时发射的光子满足 $h c/\lambda = E_{n_2} - E_{n_1}$，这正是 [[#eq-rydberg]]，其中

$$
R_\infty = \frac{m_e e^4}{8\varepsilon_0^2 h^3 c} = 1.0973732\times10^{7}\,\mathrm{m^{-1}}.
$$

下标 $\infty$ 标记着一个假设：核被当作无穷重。实际上电子和质子绕共同质心运动，二体问题化为一个质量为**约化质量** $\mu = m_em_p/(m_e+m_p)$ 的单体问题，于是氢的里德伯常量为 $R_H = R_\infty/(1 + m_e/m_p) = 1.096776\times10^7\,\mathrm{m^{-1}}$。玻尔用 $m_e$、$e$ 与 $h$——它们来自完全不同的实验——算出了这个经验常量，并且对到了数据的精度。正是这一符合使人们开始认真对待这个模型。

::: example 巴耳末系的红线 {#ex-balmer}
计算氢 $n = 3 \to 2$ 谱线的波长、光子能量，以及 $n = 2$ 轨道上电子的半径与速率。
::: solution
用约化质量的常量，

$$
\frac{1}{\lambda} = R_H\left(\frac14 - \frac19\right) = \frac{5}{36}(1.096776\times10^7)\,\mathrm{m^{-1}} = 1.52330\times10^6\,\mathrm{m^{-1}},
$$

故 $\lambda = 656.47\,\mathrm{nm}$。这是真空波长。表中通常给出空气中的波长 $656.28\,\mathrm{nm}$，比真空值小一个空气折射率 $1.00028$。若用 $R_\infty$ 将得到 $656.11\,\mathrm{nm}$；约化质量带来的 $0.36\,\mathrm{nm}$ 修正很容易测出，1932 年尤里（Urey）正是利用相应的位移发现了氘。光子能量为 $1239.84/656.47 = 1.889\,\mathrm{eV}$，等于 $13.6057\,(5/36)/(1+m_e/m_p)\,\mathrm{eV}$。

$n = 2$ 时，[[#eq-bohr-radius]] 给出 $r_2 = 4a_0 = 0.212\,\mathrm{nm}$，$v_2 = \alpha c/2 = 1.09\times10^6\,\mathrm{m/s}$。
:::
:::

原子能级分立性的独立证据来自弗兰克（Franck）与赫兹（Hertz）1914 年的实验。电子穿过汞蒸气时，只以 $4.9\,\mathrm{eV}$ 为一份一份地向汞原子损失能量，随后蒸气辐射出 $hc/4.9\,\mathrm{eV} = 253\,\mathrm{nm}$ 的紫外光，正是一条已知汞谱线的波长。

::: remark 玻尔模型错在哪里
玻尔模型对氢以及 $\mathrm{He}^+$ 这类单电子离子给出正确的能量，其他一概不行。它预言基态的角动量为 $\hbar$；真实的基态轨道角动量为零（[[quantum-1/hydrogen]]）。它无法计算谱线的相对强度，对氦完全失败，对假设 2 也讲不出任何理由。它算对的数字是库仑问题的巧合：量子的能量碰巧等于半经典的能量。
:::

## 物质波 {#de-broglie}

德布罗意（de Broglie）1924 年的博士论文把爱因斯坦的论证倒了过来。如果光波在某些实验中表现得像 $E = h\nu$、$p = h/\lambda$ 的粒子，那么实物粒子在某些实验中或许就表现为满足同样关系的波。

::: definition 德布罗意波长 {#def-de-broglie}
动量为 $p$ 的粒子伴随一个波，其波长与频率为

$$
\lambda = \frac{h}{p}, \qquad \nu = \frac{E}{h}.
$$ {#eq-de-broglie}

等价地 $p = \hbar k$ 且 $E = \hbar\omega$，其中 $k = 2\pi/\lambda$，$\omega = 2\pi\nu$。对质量为 $m$、动能为 $K$ 的非相对论性粒子，$p = \sqrt{2mK}$。
:::

这一想法解释了玻尔那条任意的条件。半径为 $r$ 的圆轨道上的波，只有当整个数目的波长恰好绕一周时才能自我加强：$2\pi r = n\lambda = nh/p$。这就是 $pr = n\hbar$，即 $L = n\hbar$。允许的轨道正是电子波形成驻波的轨道。这一图像仍然不对——真正的波函数并不局限在圆上——但它直指核心思想：束缚态是驻波，量子化来自边界条件。

::: example 电子、中子与棒球 {#ex-wavelengths}
计算 (a) 从静止经 $54\,\mathrm{V}$ 加速的电子；(b) $T = 300\,\mathrm{K}$ 下动能为 $k_BT$ 的中子；(c) 以 $40\,\mathrm{m/s}$ 飞行的 $0.145\,\mathrm{kg}$ 棒球的德布罗意波长。
::: solution
(a) 动能为 $54\,\mathrm{eV} = 8.65\times10^{-18}\,\mathrm{J}$，故

$$
p = \sqrt{2m_eK} = \sqrt{2(9.109\times10^{-31})(8.652\times10^{-18})} = 3.970\times10^{-24}\,\mathrm{kg\,m/s},
$$

且 $\lambda = h/p = 1.67\times10^{-10}\,\mathrm{m} = 0.167\,\mathrm{nm}$。这与晶体中原子间距相当，因此晶体对这样的电子就是一块衍射光栅。这正是戴维森（Davisson）与革末（Germer）1927 年使用的能量：从镍晶体反射的电子——其表面原子行间距 $d = 0.215\,\mathrm{nm}$——在 $50^\circ$ 处出现强极大。光栅条件 $d\sin\phi = \lambda$ 预言 $\sin\phi = 0.167/0.215$，即 $\phi = 50.9^\circ$。

(b) $k_BT = 4.14\times10^{-21}\,\mathrm{J} = 0.0259\,\mathrm{eV}$，取 $m_n = 1.675\times10^{-27}\,\mathrm{kg}$，得 $\lambda = h/\sqrt{2m_n k_BT} = 1.78\times10^{-10}\,\mathrm{m}$。反应堆产生的热中子也会被晶体衍射，这使中子散射成为 [[condensed-matter]] 的标准工具。

(c) $p = 0.145\times40 = 5.80\,\mathrm{kg\,m/s}$，$\lambda = 6.626\times10^{-34}/5.80 = 1.14\times10^{-34}\,\mathrm{m}$，比质子小约 $10^{19}$ 倍。没有任何孔缝能使它衍射，棒球表现出经典行为。
:::
:::

由 (a) 可得到电子的一个常用公式：经 $V$ 伏电压加速的电子有 $\lambda = 1.226\,\mathrm{nm}/\sqrt{V/\mathrm{volt}}$，在 $eV \ll 511\,\mathrm{keV}$ 时成立。

电子的波动性不是束流独有的性质。1989 年，日立公司的外林彰（Akira Tonomura）小组让电子通过电子双棱镜，速率之低使得同一时刻装置中只有一个电子。每个电子都作为探测器上一个确定位置的点到达。几千个电子之后，点迹叠出了干涉图样。无论那个波是什么，它都是每个单电子的波；它决定的是点可能落在哪里，而不是某一个具体的点会落在哪里。这个陈述由玻恩（Born）在 1926 年精确化，正是下一章的起点。

::: intuition 量子效应何时重要
一个快捷的判据是把德布罗意波长与相关长度尺度比较。若 $\lambda$ 远小于问题中的一切长度，经典力学就够用，棒球即如此。若 $\lambda$ 与粒子被束缚区域的尺度相当，量子化就必不可少，原子中的电子即如此（几个 eV 时 $\lambda \sim 0.3\,\mathrm{nm}$，$a_0 = 0.053\,\mathrm{nm}$）。热学类比就是治好黑体问题的 $h\nu$ 与 $k_BT$ 之比较。
:::

::: history 从普朗克到德布罗意
普朗克于 1900 年 10 月 19 日向德国物理学会报告了他的辐射定律——当时只是一种内插——12 月 14 日又给出了使用能量子 $h\nu$ 的推导。爱因斯坦的光量子论文 1905 年发表于《物理学年鉴》（*Annalen der Physik*）；他 1921 年获诺贝尔奖是因为光电效应定律而非相对论。密立根的精密检验发表于 1916 年。玻尔的模型以三篇论文的形式发表于 1913 年的《哲学杂志》（*Philosophical Magazine*），弗兰克与赫兹于 1914 年报告了他们的电子碰撞实验。康普顿的 X 射线散射论文 1923 年发表于《物理评论》（*Physical Review*）。德布罗意 1924 年 11 月在巴黎通过博士论文答辩。贝尔实验室的戴维森与革末，以及阿伯丁的汤姆孙（G. P. Thomson），于 1927 年各自独立地观察到电子衍射。这位汤姆孙是 J. J. 汤姆孙之子，后者于 1897 年发现了作为粒子的电子。
:::

## 后续内容 {#leads}

本章的每条规则都是严格量子力学的特例。[[quantum-1/schrodinger-equation]] 的薛定谔方程把德布罗意关系构建成一个波动方程。普朗克的能量阶梯 $nh\nu$ 加上零点能 $\frac12 h\nu$ 之后，以 [[quantum-1/harmonic-oscillator]] 的能谱重现。玻尔的能量从 [[quantum-1/hydrogen]] 的氢原子中得出，且带有正确的角动量。光子统计与完整的普朗克定律属于 [[statistical-mechanics]]。化学图谱在[量子化学基础](/learn/chemistry/lesson.php?c=quantum-chemistry&l=quantum-foundations)一文中从化学家的角度处理同一段历史。

::: summary
- 经典能量均分给出瑞利-金斯定律 $u = 8\pi\nu^2k_BT/c^3$ 与无限的总能量。普朗克量子化的振子平均能量为 $h\nu/(e^{h\nu/k_BT}-1)$，把 $h\nu \gg k_BT$ 的模式冻结，给出实测谱。
- 普朗克定律蕴含斯特藩-玻尔兹曼定律 $j = \sigma T^4$，$\sigma = 5.670\times10^{-8}\,\mathrm{W\,m^{-2}K^{-4}}$，以及维恩定律 $\lambda_{\max}T = 2.898\times10^{-3}\,\mathrm{m\,K}$。
- 光子携带 $E = h\nu$ 与 $p = h/\lambda$。光电效应中 $K_{\max} = h\nu - W$，与强度无关。
- 康普顿散射 $\lambda' - \lambda = (h/m_ec)(1 - \cos\theta)$ 来自光子与电子的相对论性能量与动量守恒。
- 玻尔条件 $L = n\hbar$ 给出 $r_n = n^2a_0$，其中 $a_0 = 52.9\,\mathrm{pm}$，且 $E_n = -13.6\,\mathrm{eV}/n^2$；约化质量给出 $R_H = 1.09678\times10^7\,\mathrm{m^{-1}}$，以及真空波长 $656.47\,\mathrm{nm}$ 的 $H_\alpha$ 线。
- 物质有波长 $\lambda = h/p$。电子衍射证实了它，单电子干涉表明这个波属于每个粒子。
- 当 $h\nu \gtrsim k_BT$，或 $\lambda$ 与系统的尺度相当时，量子效应不可忽略。
:::

## 习题 {#exercises}

::: exercise 绿色光子的能量 {level=1 check="2.48"}
求波长 $500\,\mathrm{nm}$ 的光子的能量，以电子伏特计。
::: solution
由 $hc = 1239.84\,\mathrm{eV\,nm}$，$E = 1239.84/500 = 2.4797\,\mathrm{eV}$，三位有效数字为 $2.48\,\mathrm{eV}$。以焦耳计为 $2.48\times1.602\times10^{-19} = 3.97\times10^{-19}\,\mathrm{J}$。因此 $1\,\mathrm{mW}$ 的绿色激光器每秒发出约 $2.5\times10^{15}$ 个光子。
:::
:::

::: exercise 灯丝 {level=1 check="966"}
一根钨丝在 $3000\,\mathrm{K}$ 下工作。把它当作黑体，其按单位波长的谱在什么波长达到峰值（以纳米计）？
::: solution
由维恩定律 [[#eq-wien]]，$\lambda_{\max} = 2.897772\times10^{-3}/3000 = 9.659\times10^{-7}\,\mathrm{m} = 966\,\mathrm{nm}$。这在近红外区，这就是白炽灯只把一小部分功率转化为可见光的原因。
:::
:::

::: exercise 电子显微镜的束流 {level=1 check="0.100"}
求从静止经 $150\,\mathrm{V}$ 加速的电子的德布罗意波长，以纳米计。
::: solution
动能 $K = 150\,\mathrm{eV} = 2.403\times10^{-17}\,\mathrm{J}$，

$$
\lambda = \frac{h}{\sqrt{2m_eK}} = \frac{6.62607\times10^{-34}}{\sqrt{2(9.10938\times10^{-31})(2.403\times10^{-17})}} = 1.001\times10^{-10}\,\mathrm{m},
$$

故 $\lambda = 0.100\,\mathrm{nm}$。用快捷公式 $1.226/\sqrt{150} = 0.1001\,\mathrm{nm}$ 结果一致。
:::
:::

::: exercise 测量普朗克常量 {level=2 check="6.61"}
某光电实验中，波长 $300\,\mathrm{nm}$ 的光对应的遏止电压为 $1.83\,\mathrm{V}$，波长 $400\,\mathrm{nm}$ 的光对应 $0.80\,\mathrm{V}$。求 $h$（以 $10^{-34}\,\mathrm{J\,s}$ 为单位）以及金属的功函数。
::: solution
把两个爱因斯坦方程 $eV_0 = h\nu - W$ 相减，功函数消掉：

$$
h = \frac{e(V_1 - V_2)}{\nu_1 - \nu_2}.
$$

频率为 $\nu_1 = c/300\,\mathrm{nm} = 9.993\times10^{14}\,\mathrm{Hz}$，$\nu_2 = c/400\,\mathrm{nm} = 7.495\times10^{14}\,\mathrm{Hz}$，故 $\nu_1-\nu_2 = 2.498\times10^{14}\,\mathrm{Hz}$，

$$
h = \frac{(1.602\times10^{-19})(1.03)}{2.498\times10^{14}} = 6.61\times10^{-34}\,\mathrm{J\,s}.
$$

于是 $W = h\nu_1 - eV_1$。以电子伏特计，$h\nu_1 = (6.61\times10^{-34})(9.993\times10^{14})/(1.602\times10^{-19}) = 4.12\,\mathrm{eV}$，故 $W = 4.12 - 1.83 = 2.29\,\mathrm{eV}$。$V_2$ 只有两位有效数字，这把 $h$ 的精度限制在约 $1\%$。
:::
:::

::: exercise 硬背散 {level=2 check="0.341"}
一个能量等于电子静能 $m_ec^2 = 0.511\,\mathrm{MeV}$ 的光子被静止的自由电子背散射（$\theta = 180^\circ$）。求反冲电子的动能，以 MeV 计。
::: hint
把康普顿公式写成能量的形式：$1/E' - 1/E = (1-\cos\theta)/m_ec^2$。
:::
::: solution
由 $\lambda = hc/E$，[[#eq-compton]] 乘以 $1/hc$ 得 $1/E' = 1/E + (1-\cos\theta)/m_ec^2$。取 $E = m_ec^2$、$1-\cos\theta = 2$，

$$
\frac{1}{E'} = \frac{1}{m_ec^2} + \frac{2}{m_ec^2} = \frac{3}{m_ec^2}, \qquad E' = \frac{m_ec^2}{3}.
$$

电子拿走其余的部分：$K = E - E' = \frac23 m_ec^2 = \frac23(0.511) = 0.341\,\mathrm{MeV}$。这电子是相对论性的，其动能是其静能的三分之二。
:::
:::

::: exercise 太阳的光度 {level=2 check="3.83e26"}
太阳半径 $6.957\times10^{8}\,\mathrm{m}$，有效温度 $5772\,\mathrm{K}$。把它当作黑体，求其总辐射功率，以瓦特计。
::: solution
光度等于表面积乘以能流：

$$
L = 4\pi R^2\sigma T^4 = 4\pi(6.957\times10^8)^2(5.670374\times10^{-8})(5772)^4 = 3.83\times10^{26}\,\mathrm{W}.
$$

这与实测的太阳光度 $3.828\times10^{26}\,\mathrm{W}$ 相符，并非偶然：有效温度正是由这一关系定义的。
:::
:::

::: exercise 电离 Li²⁺ {level=2 check="122.45"}
离子 $\mathrm{Li}^{2+}$ 只有一个电子，被电荷 $3e$ 的核束缚。忽略核的运动，求其电离能，以电子伏特计。
::: solution
由 [[#eq-bohr-energy]]，基态能量 $E_1 = -Z^2(13.6057\,\mathrm{eV})$，$Z = 3$，故电离能为 $9\times13.6057 = 122.45\,\mathrm{eV}$。第一轨道半径为 $a_0/3 = 17.6\,\mathrm{pm}$：核电荷越大，电子被拉得越近、束缚得越紧，束缚能增大 $Z^2$ 倍。
:::
:::

::: exercise 电子偶素 {level=3 check="-6.80"}
电子偶素是电子与正电子（质量与电子相同）的束缚态。对两个绕共同质心运动的粒子重做玻尔的推导，求电子偶素的基态能量，以电子伏特计。
::: hint
用约化质量 $\mu$ 代替 $m_e$，每个公式都保持原来的形式。
:::
::: solution
两个相距 $r$ 的粒子绕质心做圆周运动时，相对运动服从一个质量为约化质量 $\mu = m_1m_2/(m_1+m_2)$、距离为 $r$ 的单体的牛顿定律，绕质心的总角动量为 $\mu v r$，其中 $v$ 是相对速率。玻尔条件成为 $\mu vr = n\hbar$，推导的每一步在 $m_e \to \mu$ 之下原样成立。于是 $E_n = -(\mu/m_e)(13.6057\,\mathrm{eV})/n^2$。对电子偶素 $\mu = m_e/2$，故

$$
E_1 = -\frac{13.6057}{2}\,\mathrm{eV} = -6.80\,\mathrm{eV},
$$

而"玻尔半径"加倍为 $2a_0$。电子偶素的所有谱线的波长都是对应氢谱线的两倍。
:::
:::

::: exercise 玻尔的对应原理 {level=3}
对玻尔模型中的氢，证明 $n \to n - 1$ 跃迁发射的光子频率在 $n \to \infty$ 时趋于电子的经典轨道频率 $v_n/2\pi r_n$。计算 $n = 100$ 时两者的比值。
::: hint
用里德伯能量 $E_R = 13.6\,\mathrm{eV}$ 表示两者：$v_n = \alpha c/n$，$r_n = n^2a_0$，$E_R = \hbar\alpha c/2a_0$。
:::
::: solution
轨道频率为

$$
f_n = \frac{v_n}{2\pi r_n} = \frac{\alpha c/n}{2\pi n^2a_0} = \frac{\alpha c}{2\pi a_0}\,\frac{1}{n^3}.
$$

由里德伯能量 $E_R = \frac12 m_e(\alpha c)^2$ 与 $a_0 = \hbar/(m_e\alpha c)$ 得 $E_R = \hbar\alpha c/2a_0$，故 $\alpha c/a_0 = 2E_R/\hbar$，$f_n = 2E_R/(hn^3)$。

$n \to n-1$ 的光子频率为

$$
\nu = \frac{E_R}{h}\left(\frac{1}{(n-1)^2} - \frac{1}{n^2}\right) = \frac{E_R}{h}\,\frac{2n - 1}{n^2(n-1)^2}.
$$

比值为

$$
\frac{\nu}{f_n} = \frac{(2n-1)n^3}{2n^2(n-1)^2} = \frac{n(2n - 1)}{2(n-1)^2} = \frac{1 - 1/2n}{(1 - 1/n)^2} \to 1 \quad (n \to \infty).
$$

$n = 100$ 时比值为 $100\cdot199/(2\cdot99^2) = 1.0152$。大量子数下，量子跃迁以经典轨道频率辐射，正如玻尔所要求的。展开后比值为 $1 + 3/(2n) + O(1/n^2)$，所以一致程度只按 $1/n$ 改善。
:::
:::
