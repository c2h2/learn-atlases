在毫摩尔浓度的二茂铁乙腈溶液中，把一个小型铂圆盘电极的电势从$0$扫到$+0.6\ \mathrm{V}$再扫回来，电流就描出一条鸭形回线：去扫时出现一个峰，因为二茂铁被氧化成二茂铁鎓；回扫时出现一个镜像峰，因为生成的二茂铁鎓又被还原。两个峰相距$59\ \mathrm{mV}$，峰高随扫描速率的平方根增长，两峰的中点就是该电对的形式电势。只需半分钟、一毫升溶液，循环伏安图就告诉了你氧化还原电势、电子数、扩散系数、电子转移很快以及产物稳定。换一种分子，形状随之改变——电子转移慢时两峰分开，产物分解时回峰消失——而每一种改变都有定量的解释。

每一种这样的解释都依赖两种原料：[[electrochemistry/electrode-kinetics]]的电极动力学，它把电流与*表面*浓度联系起来；以及**传质**，它把表面浓度与本体浓度联系起来。本章补上第二种原料并把两者合起来。我们先讲三种传质方式，以及支持电解质为什么能除掉其中一种；接着处理旋转圆盘与微电极上的稳态传质，那里的数学简单，电流-电势曲线有封闭形式；然后转向使用最广的电化学技术——线性扫描与循环伏安法。电势阶跃（科特雷尔）实验以及分析上的脉冲与溶出方法见[[analytical-chemistry/electroanalytical]]；我们直接引用其中的科特雷尔结果，不重述其推导。

## 三种传质方式

::: definition 扩散、电迁移与对流 {#def-transport-modes}
溶解物种$i$通过**扩散**（沿浓度梯度）、**电迁移**（带电物种在电场中运动）与**对流**（随溶液的整体流动搬运，或自然或强迫）到达电极。一维情形下，以$\mathrm{mol\,m^{-2}\,s^{-1}}$计的通量由**能斯特-普朗克方程**给出
$$
J_i(x) = -D_i\frac{\partial c_i}{\partial x} - \frac{z_iF}{RT}D_ic_i\frac{\partial\phi}{\partial x} + c_iv_x(x),
$$ {#eq-nernst-planck}
其中$D_i$是扩散系数，$\phi$是电势，$v_x$是垂直于电极方向的溶液速度。电迁移项使用能斯特-爱因斯坦关系（[[electrochemistry/conductivity#prop-mobility]]）中的迁移率$u_i = |z_i|FD_i/RT$。
:::

电迁移是麻烦的一项，因为电场取决于电流和溶液中的每一种离子。补救办法是加入大过量（通常$0.1$–$1\ \mathrm{mol\,dm^{-3}}$）的惰性**支持电解质**，如$\mathrm{KCl}$、$\mathrm{KNO_3}$，在有机溶剂中则用$\mathrm{NBu_4PF_6}$。通过溶液的电流就几乎全由支持离子承担：待测物所载的份额是它的迁移数，变得极小。支持电解质还降低溶液电阻，并把扩散双电层压缩到电极附近一纳米之内（[[electrochemistry/double-layer]]）。

::: example 支持电解质能在多大程度上抑制电迁移？ {#ex-migration}
用极限离子电导率（$\mathrm{mS\,m^2\,mol^{-1}}$）：$\mathrm{Cd^{2+}}$ $10.8$、$\mathrm{K^+}$ $7.35$、$\mathrm{Cl^-}$ $7.63$，估算(a)仅含$1.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{CdCl_2}$与(b)另加$0.10\ \mathrm{mol\,dm^{-3}}$ KCl时$\mathrm{Cd^{2+}}$的迁移数。
::: solution
每种离子所载的电流正比于$c_i\lambda_i$（$\lambda_i$以每摩尔离子计，$|z_i|$已在其中计入两次：$\lambda = z^2F^2D/RT$）。(a) $t(\mathrm{Cd^{2+}}) = (0.001\times10.8)/(0.001\times10.8 + 0.002\times7.63) = 0.0108/0.0261 = 0.41$。(b) 加入$0.10\ \mathrm{mol\,dm^{-3}}$ KCl使分母增加$0.10\times7.35 + 0.10\times7.63 = 1.498$：$t(\mathrm{Cd^{2+}}) = 0.0108/1.524 = 0.0071$。有支持电解质时，经本体溶液的电流中由镉离子所载的不足$1\,\%$，所以到达电极的镉实际上只靠扩散（和对流）到达。没有它，$41\,\%$的电流将是电迁移，测得的电流会相应更大，也更难解释。
:::
:::

电迁移被抑制、溶液又静止时，只剩下扩散，平面电极上由菲克第二定律$\partial c/\partial t = D\,\partial^2c/\partial x^2$支配。在把表面浓度驱至零的电势阶跃之后，它的解给出科特雷尔电流$i = nFAc\sqrt{D/\pi t}$（[[analytical-chemistry/electroanalytical#prop-cottrell]]），它按$t^{-1/2}$衰减，因为贫化区按$\sqrt{\pi Dt}$生长——$D = 1\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$时，一秒后约$56\ \mu\mathrm{m}$。因此静止溶液中的平面电极永远到不了稳态；要得到稳态，要么以可控的方式搅拌，要么把电极做小。

## 稳态传质：扩散层

一个有用的理想化是**扩散层**，出自能斯特（1904）：在搅拌的溶液中，距电极$\delta$以外浓度均匀，在这一层内传质靠扩散、浓度取线性分布。于是O到表面的通量为$D_\mathrm{O}(c_\mathrm{O}^* - c_\mathrm{O}(0))/\delta$，当$c_\mathrm{O}(0) = 0$时电流达到其最大值，即**极限电流**：
$$
|i_\mathrm{l}| = nFAm_\mathrm{O}c_\mathrm{O}^*, \qquad m_\mathrm{O} = \frac{D_\mathrm{O}}{\delta},
$$
其中$m$是**传质系数**（以$\mathrm{cm\,s^{-1}}$计，与$k^\circ$同单位——$k^\circ/m$的比较将决定一个波是否可逆）。对还原电流$i$（取大小），表面浓度可由通量得出：$c_\mathrm{O}(0)/c_\mathrm{O}^* = 1 - i/i_\mathrm{l}$；若R初始不存在，则$c_\mathrm{R}(0) = (m_\mathrm{O}/m_\mathrm{R})\,c_\mathrm{O}^*\,i/i_\mathrm{l}$。

::: proposition 稳态伏安波 {#prop-wave}
对$\mathrm{O} + n\mathrm{e^-} \rightleftharpoons \mathrm{R}$，本体中只有O，在系数为$m_\mathrm{O}$、$m_\mathrm{R}$的稳态传质下：

(1) 若电子转移**可逆**（表面服从能斯特方程），
$$
E = E_{1/2} + \frac{RT}{nF}\ln\frac{i_\mathrm{l} - i}{i}, \qquad E_{1/2} = E^{\circ\prime} + \frac{RT}{nF}\ln\frac{m_\mathrm{R}}{m_\mathrm{O}},
$$ {#eq-wave}
这是一条S形曲线，其半波电势与浓度无关且接近$E^{\circ\prime}$。
(2) 对服从巴特勒-福尔默动力学、$m_\mathrm{O} = m_\mathrm{R} = m$的单电子步骤，
$$
\frac{i}{i_\mathrm{l}} = \frac{1}{1 + \mathrm{e}^{\theta} + (m/k^\circ)\,\mathrm{e}^{\alpha\theta}}, \qquad \theta = f(E - E^{\circ\prime}) .
$$ {#eq-qr-wave}
:::

::: proof
(1) 表面服从能斯特方程意味着$E = E^{\circ\prime} + (RT/nF)\ln[c_\mathrm{O}(0)/c_\mathrm{R}(0)]$。代入上面的表面浓度，$c_\mathrm{O}(0)/c_\mathrm{R}(0) = (m_\mathrm{R}/m_\mathrm{O})(i_\mathrm{l} - i)/i$，拆开对数即得[[#eq-wave]]。$i = i_\mathrm{l}/2$时电流比的对数为零，$E = E_{1/2}$。

(2) 单位面积的净还原速率为$k_\mathrm{red}c_\mathrm{O}(0) - k_\mathrm{ox}c_\mathrm{R}(0)$，稳态下等于输运通量$i/nFA = mc_\mathrm{O}^*(i/i_\mathrm{l})$。记$x = i/i_\mathrm{l}$，则$c_\mathrm{O}(0) = c_\mathrm{O}^*(1 - x)$、$c_\mathrm{R}(0) = c_\mathrm{O}^*x$：
$$
mx = k_\mathrm{red}(1 - x) - k_\mathrm{ox}x \quad\Rightarrow\quad x = \frac{k_\mathrm{red}}{m + k_\mathrm{red} + k_\mathrm{ox}} = \frac{1}{1 + m/k_\mathrm{red} + k_\mathrm{ox}/k_\mathrm{red}} .
$$
由[[electrochemistry/electrode-kinetics#prop-rate-constants]]，$k_\mathrm{ox}/k_\mathrm{red} = \mathrm{e}^{\theta}$且$m/k_\mathrm{red} = (m/k^\circ)\mathrm{e}^{\alpha\theta}$，即得[[#eq-qr-wave]]。当$k^\circ \gg m$时，$E^{\circ\prime}$附近最后一项可忽略，就还原出可逆波（$n = 1$，$m_\mathrm{O} = m_\mathrm{R}$）。
:::

可逆波有固定的形状：$25\,^\circ\mathrm{C}$下$E_{1/4} - E_{3/4} = (RT/nF)\ln 9 = 56.5/n\ \mathrm{mV}$（托梅什判据），$E$对$\log[(i_\mathrm{l} - i)/i]$的图斜率为$59.2/n\ \mathrm{mV}$。比这更宽、且位于$E^{\circ\prime}$负侧的波意味着电子转移慢；在$k^\circ \ll m$的极限下，它的波足是一条塔菲尔线。

::: widget plot
f: 1/(1 + exp(38.92*x) + 10^(-lk)*exp(al*38.92*x)); 1/(1 + exp(38.92*x))
x: -0.8, 0.3
y: 0, 1.05
sliders: lk=0:-4:3:0.1; al=0.5:0.3:0.7:0.01
labels: \text{准可逆}; \text{可逆}
caption: 稳态还原波[[#eq-qr-wave]]：单电子电对在$25\,^\circ\mathrm{C}$下的归一化电流$i/i_\mathrm{l}$对以伏特计的$E - E^{\circ\prime}$（$x$轴）作图，其中$\mathrm{lk} = \log_{10}(k^\circ/m)$。$\mathrm{lk} = 2$或更大时，波与以$E^{\circ\prime}$为中心的可逆S形曲线重合。$\mathrm{lk} = 0$（$k^\circ = m$）时波已经移动并展宽；$\mathrm{lk} = -3$时它负偏数百毫伏，其形状由$\alpha$而非能斯特方程决定。由于$m$可以由实验改变（转速、电极半径），同一个电对可以从可逆移到不可逆——这正是测量快速速率常数的基本策略。
:::

### 旋转圆盘电极

在**旋转圆盘电极**（RDE）——平齐地嵌在绕自身轴旋转的绝缘圆柱体中的一块圆盘——上，扩散层成为一个精确的概念。旋转把溶液抽向圆盘并甩向外侧；西奥多·冯·卡门（Theodore von Kármán）1921年对流场的解被韦尼亚明·列维奇（Veniamin Levich）在1942年用来求解对流-扩散问题，结果表明扩散层在整个圆盘上厚度相同——一个“均匀可达”的表面。

::: proposition 列维奇方程与科捷奇-列维奇方程 {#prop-levich}
面积为$A$的旋转圆盘在运动黏度为$\nu$的溶液中以角速度$\omega$（以$\mathrm{rad\,s^{-1}}$计）旋转时，扩散层厚度为$\delta = 1.61\,D^{1/3}\omega^{-1/2}\nu^{1/6}$，极限电流为
$$
|i_\mathrm{l}| = 0.620\,nFAD^{2/3}\omega^{1/2}\nu^{-1/6}c^* .
$$ {#eq-levich}
若电子转移不很快，任意电势下的电流满足**科捷奇-列维奇方程**（Koutecký–Levich equation）
$$
\frac{1}{i} = \frac{1}{i_\mathrm{k}} + \frac{1}{i_\mathrm{l}} = \frac{1}{i_\mathrm{k}} + \frac{1}{B\,\omega^{1/2}}, \qquad B = 0.620\,nFAD^{2/3}\nu^{-1/6}c^*,
$$ {#eq-kl}
其中$i_\mathrm{k} = nFAk_\mathrm{f}(E)c^*$是动力学电流，即传质无限快时该电势下将流过的电流。
:::

::: proof
流体力学部分——冯·卡门的速度分布，以及盘附近对流-扩散方程的解，它们给出数值因子$1.61$与$0.620 = 1/1.61$——我们沿用列维奇的结果。承认$\delta$之后，能斯特扩散层模型给出$|i_\mathrm{l}| = nFAD c^*/\delta = nFAc^*D^{2/3}\omega^{1/2}\nu^{-1/6}/1.61$，即[[#eq-levich]]。

至于科捷奇-列维奇形式，考虑逆反应可忽略、正向速率常数为$k_\mathrm{f}$的不可逆还原。稳态下表面反应速率等于输运通量：
$$
\frac{i}{nFA} = k_\mathrm{f}c(0) = m\left(c^* - c(0)\right) .
$$
消去$c(0)$：由第二个等号$c(0) = mc^*/(m + k_\mathrm{f})$，于是$i/nFA = k_\mathrm{f}mc^*/(k_\mathrm{f} + m)$。取倒数，$nFAc^*/i = 1/k_\mathrm{f} + 1/m$，即$i_\mathrm{k} = nFAk_\mathrm{f}c^*$、$i_\mathrm{l} = nFAmc^*$时的$1/i = 1/i_\mathrm{k} + 1/i_\mathrm{l}$。动力学与传质就像串联的电阻。
:::

::: example 一个列维奇电流 {#ex-levich}
半径$2.50\ \mathrm{mm}$的铂RDE在含$2.0\ \mathrm{mmol\,dm^{-3}}$ $\mathrm{K_3Fe(CN)_6}$的$1\ \mathrm{mol\,dm^{-3}}$ KCl水溶液中（$D = 7.2\times10^{-6}\ \mathrm{cm^2\,s^{-1}}$，$\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$）以$1600\ \mathrm{rpm}$旋转。求单电子还原的扩散层厚度与极限电流。
::: solution
$A = \pi(0.250\ \mathrm{cm})^2 = 0.196\ \mathrm{cm^2}$；$\omega = 1600\times2\pi/60 = 167.6\ \mathrm{rad\,s^{-1}}$；$c^* = 2.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$。于是
$$
\delta = 1.61\times(7.2\times10^{-6})^{1/3}\times(167.6)^{-1/2}\times(0.010)^{1/6}\ \mathrm{cm} = 1.11\times10^{-3}\ \mathrm{cm} = 11\ \mu\mathrm{m},
$$
$$
|i_\mathrm{l}| = 0.620\times96\,485\times0.196\times(7.2\times10^{-6})^{2/3}\times(167.6)^{1/2}\times(0.010)^{-1/6}\times2.0\times10^{-6}\ \mathrm{A} = 2.44\times10^{-4}\ \mathrm{A},
$$
即$0.24\ \mathrm{mA}$。扩散层比静止扩散一秒后的薄五倍，而且永远保持这么薄，所以电流既稳定又大。转速加倍使电流增大$\sqrt{2}$倍；$i_\mathrm{l}$对$\omega^{1/2}$的图若为直线且过原点，就证明电流受传质控制。
:::
:::

::: example 由科捷奇-列维奇图求氧还原的动力学电流 {#ex-kl}
在固定电势下，面积$0.196\ \mathrm{cm^2}$的RDE在$\mathrm{O_2}$饱和的碱性溶液中（$c^* = 1.2\ \mathrm{mmol\,dm^{-3}}$，$D = 1.9\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$，$\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$）在$400$、$900$、$1600$、$2500\ \mathrm{rpm}$下分别给出$0.437$、$0.591$、$0.717$、$0.822\ \mathrm{mA}$的电流。求动力学电流、每个$\mathrm{O_2}$的电子数与速率常数。
::: solution
计算$\omega^{-1/2}$（$\omega$以$\mathrm{rad\,s^{-1}}$计：$41.9$、$94.2$、$167.6$、$261.8$）与$1/i$：

| $\omega^{-1/2}/\mathrm{s^{1/2}}$ | $0.1545$ | $0.1030$ | $0.0773$ | $0.0618$ |
|---|---|---|---|---|
| $(1/i)/\mathrm{mA^{-1}}$ | $2.290$ | $1.693$ | $1.395$ | $1.216$ |

最小二乘直线的斜率为$11.58\ \mathrm{mA^{-1}\,s^{-1/2}}$，截距为$0.500\ \mathrm{mA^{-1}}$（可以在下图中试一试）。截距给出$i_\mathrm{k} = 2.00\ \mathrm{mA}$。斜率是$1/B$，所以$B = 0.0864\ \mathrm{mA\,s^{1/2}}$，于是
$$
n = \frac{B}{0.620\,FAD^{2/3}\nu^{-1/6}c^*} = \frac{8.64\times10^{-5}}{0.620\times96\,485\times0.196\times(1.9\times10^{-5})^{2/3}\times(0.010)^{-1/6}\times1.2\times10^{-6}} = 4.0 .
$$
每个$\mathrm{O_2}$四个电子：催化剂把氧一路还原到水（或氢氧化物）而不是停在过氧化物（$n = 2$）——这是燃料电池阴极的关键问题（[[electrochemistry/fuel-cells-electrolysis]]）。速率常数为$k_\mathrm{f} = i_\mathrm{k}/nFAc^* = 2.00\times10^{-3}/(4\times96\,485\times0.196\times1.2\times10^{-6}) = 0.022\ \mathrm{cm\,s^{-1}}$。
:::
:::

::: widget regression
points: 0.1545,2.290; 0.1030,1.693; 0.0773,1.395; 0.0618,1.216
degree: 1
x: 0, 0.18
y: 0, 2.6
caption: [[#ex-kl]]的科捷奇-列维奇图：以$\mathrm{mA^{-1}}$计的$1/i$对以$\mathrm{s^{1/2}}$计的$\omega^{-1/2}$作图。截距是$1/i_\mathrm{k}$（转速无限大），斜率$1/B$中包含$n$与$D$。拖动数据点可以模仿有噪声的数据：由于截距是从最快转速之外外推出来的，高转速处的小误差会使它移动很多；动力学电流远大于极限电流时，无法用这种方法可靠地测得它。
:::

### 微电极

把电极缩小到几微米的半径$r_0$，扩散就变成径向的：分子从一个半球形的溶液区而不是一个柱体到达电极，贫化层一旦厚到几个半径就停止生长。半球形电极在阶跃到极限电势之后，球面扩散方程的解为
$$
i(t) = nFADc^*\left(\frac{1}{\sqrt{\pi Dt}} + \frac{1}{r_0}\right), \qquad A = 2\pi r_0^2 ,
$$
是一个科特雷尔项加一个常数；长时间后$i_\mathrm{ss} = 2\pi nFDc^*r_0$。对更实用的**微圆盘电极**（嵌入基底的半径$r_0$的圆盘），稳态电流为$i_\mathrm{ss} = 4nFDc^*r_0$（Saito，1968）。当$\sqrt{\pi Dt} \gg r_0$，即$t \gg r_0^2/\pi D$时达到稳态。

::: example 一个微圆盘电极 {#ex-microdisc}
半径$5.0\ \mu\mathrm{m}$的铂微圆盘电极氧化$1.0\ \mathrm{mmol\,dm^{-3}}$的某物种（$n = 1$，$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$）。求稳态电流和达到稳态的时间尺度。
::: solution
$$
i_\mathrm{ss} = 4nFDc^*r_0 = 4\times96\,485\times1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}\times1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}\times5.0\times10^{-4}\ \mathrm{cm} = 1.9\times10^{-9}\ \mathrm{A},
$$
约$2\ \mathrm{nA}$。特征时间是$r_0^2/\pi D = (5.0\times10^{-4})^2/(\pi\times1.0\times10^{-5})\ \mathrm{s} = 8\ \mathrm{ms}$，所以不到一秒电流就已稳定。小电流带来三个好处：欧姆降$iR_\mathrm{u}$极小，微电极因此能在高阻介质（电解质量很少的有机溶剂，甚至冻结的溶液）中工作；双电层电容极小，时间常数是微秒量级，可以进行极快的扫描；传质系数$m = 4D/\pi r_0 = 25\times10^{-3}\ \mathrm{cm\,s^{-1}}$很大，还能靠缩小圆盘进一步抬高——$1\ \mathrm{cm\,s^{-1}}$以上的速率常数就是这样测出来的。插入脑组织的微电极利用这些性质实时跟踪神经递质的释放。
:::
:::

::: widget plot
f: 96485*2*pi*r^2*1e-8*D*1e-5*1e-6*(1/sqrt(pi*D*1e-5*x) + 1/(r*1e-4))*1e9; 96485*2*pi*r*1e-4*D*1e-5*1e-6*1e9
x: 0.001, 1
y: 0, 15
sliders: r=5:1:25:0.5; D=1:0.5:2:0.1
labels: \text{半球 } i(t); \text{稳态}
caption: 半径$r$（以$\mu\mathrm{m}$计）的半球形微电极在电势阶跃后，以纳安计的电流对以秒计的时间作图，$c^* = 1\ \mathrm{mmol\,dm^{-3}}$、$n = 1$，$D$以$10^{-5}\ \mathrm{cm^2\,s^{-1}}$为单位。短时电流遵循平面科特雷尔衰减；贫化层一旦厚过电极，电流就稳定在稳态值$2\pi nFDc^*r$。增大$r$会推迟这一转变（按$r^2/D$标度）——毫米级电极需要几分钟，超过自然对流允许的时间。
:::

## 线性扫描与循环伏安法

在**线性扫描伏安法**中，电势从一无事可发生之处的值起随时间线性变化，还原情形为$E(t) = E_\mathrm{i} - vt$，**扫描速率**为$v$（通常$0.01$–$1\ \mathrm{V\,s^{-1}}$，在微电极上可达$10^{6}\ \mathrm{V\,s^{-1}}$）。在**循环伏安法**（CV）中，扫描在切换电势处反向，电势回到起点。考虑静止溶液中的可逆还原。当电势接近$E^{\circ\prime}$时，能斯特方程要求比值$c_\mathrm{O}(0)/c_\mathrm{R}(0)$不断下降，于是电流流过。电流正比于表面处的浓度梯度。起初$c_\mathrm{O}(0)$下降使梯度变陡；可一旦$c_\mathrm{O}(0)$接近零，贫化层便像在科特雷尔实验中那样继续生长，梯度——以及电流——转而下降。因此电流经过一个**峰**。反向时，在电极附近积累的R被重新氧化，给出一个符号相反的峰。

::: proposition 可逆电对的峰电流与峰间距 {#prop-randles}
静止溶液中初始只有O的可逆$n$电子还原在平面电极上，$25\,^\circ\mathrm{C}$时：
$$
i_\mathrm{p} = 0.4463\,nFAc^*\left(\frac{nFvD}{RT}\right)^{1/2} = (2.69\times10^{5})\,n^{3/2}AD^{1/2}v^{1/2}c^* ,
$$ {#eq-randles}
（**兰德尔-谢夫奇克（Randles–Ševčík）方程**，$A$以$\mathrm{cm^2}$、$D$以$\mathrm{cm^2\,s^{-1}}$、$v$以$\mathrm{V\,s^{-1}}$、$c^*$以$\mathrm{mol\,cm^{-3}}$计，$i_\mathrm{p}$以A计）。峰位于$E_\mathrm{p} = E_{1/2} - 1.109RT/nF$（在$E_{1/2}$负侧$28.5/n\ \mathrm{mV}$处），与$v$无关；循环伏安图中，阳极峰与阴极峰相距
$$
\Delta E_\mathrm{p} = E_\mathrm{p,a} - E_\mathrm{p,c} \approx \frac{2.22RT}{nF} = \frac{57}{n}\ \mathrm{mV}
$$ {#eq-dep}
且$i_\mathrm{p,a}/i_\mathrm{p,c} = 1$（电流以外推基线为零点测量），$D_\mathrm{O} \approx D_\mathrm{R}$时$E^{\circ\prime} \approx (E_\mathrm{p,a} + E_\mathrm{p,c})/2$。
:::

::: proof
数值常数来自在能斯特边界条件$c_\mathrm{O}(0,t)/c_\mathrm{R}(0,t) = \exp[nf(E_\mathrm{i} - vt - E^{\circ\prime})]$下求解菲克第二定律；其解是一个积分方程，兰德尔（1948）与谢夫奇克（1948）近似求解，尼科尔森与谢恩（1964）数值求解。不过[[#eq-randles]]的*形式*可由量纲分析得出。问题中唯一的时间尺度是扫过一个波所需的时间$\tau = RT/(nFv)$，即电势改变$RT/nF$的时间。峰处贫化层已生长了约$\tau$量级的时间，其厚度量级为$\sqrt{D\tau}$，电流的量级为$nFADc^*/\sqrt{D\tau} = nFAc^*\sqrt{D/\tau} = nFAc^*\sqrt{nFvD/RT}$。完整解给出无量纲因子$0.4463$。由于问题没有其他参数，无量纲电流是$nf(E - E_{1/2})$的普适函数；因此它的最大值位于$nf(E - E_{1/2})$的一个固定值处，这就是$E_\mathrm{p}$不依赖$v$的原因；反向峰由同一普适函数给出，于是得到固定的间距[[#eq-dep]]（其精确值略依赖于切换电势，切换点远在峰外时趋于$2.218RT/nF$）。
:::

$i_\mathrm{p} \propto v^{1/2}$这一正比关系可以把扩散的反应物与吸附在电极上的反应物区分开：后者在扫描扫过期间整个表面层被转化，$i_\mathrm{p} \propto v$（电流等于该层的电荷除以扫过一个波的时间）。电容背景同样正比于$v$（[[electrochemistry/double-layer#def-charging]]），所以高扫描速率下它相对扩散信号增大。

::: example 诊断循环伏安图 {#ex-cv}
$3.0\ \mathrm{mm}$圆盘电极（$A = 0.0707\ \mathrm{cm^2}$）上，$1.0\ \mathrm{mmol\,dm^{-3}}$某金属有机配合物的乙腈溶液在$0.10\ \mathrm{V\,s^{-1}}$下显示$E_\mathrm{p,c} = -1.245\ \mathrm{V}$、$E_\mathrm{p,a} = -1.185\ \mathrm{V}$（均对二茂铁）、$i_\mathrm{p,c} = 21.2\ \mu\mathrm{A}$、$i_\mathrm{p,a}/i_\mathrm{p,c} = 0.99$；$0.40\ \mathrm{V\,s^{-1}}$时的峰电流为$42.5\ \mu\mathrm{A}$，峰电势不动。请解读并求$D$。
::: solution
$\Delta E_\mathrm{p} = 60\ \mathrm{mV}$，接近$n = 1$时的$57\ \mathrm{mV}$（多出的小部分典型地来自未补偿电阻）；峰电势与$v$无关，电流比为1：可逆的单电子还原，产物稳定。$v$增大四倍，$i_\mathrm{p}$加倍（$42.5/21.2 = 2.00$）：扩散控制，不是吸附。形式电势为$E^{\circ\prime} \approx (-1.245 - 1.185)/2 = -1.215\ \mathrm{V}$（对二茂铁）。由[[#eq-randles]]取$n = 1$：
$$
D = \left(\frac{i_\mathrm{p}}{2.69\times10^{5}\,Av^{1/2}c^*}\right)^2 = \left(\frac{21.2\times10^{-6}}{2.69\times10^{5}\times0.0707\times\sqrt{0.10}\times1.0\times10^{-6}}\right)^2\ \mathrm{cm^2\,s^{-1}} = 1.24\times10^{-5}\ \mathrm{cm^2\,s^{-1}},
$$
这是这种尺寸的分子在乙腈中的典型数值；乙腈黏度低，扩散比在水中快。
:::
:::

### 慢电子转移与后续反应

若$k^\circ$与扫描所要求的转化速率相比不算大，表面浓度就落后于能斯特方程，两峰分得更开。尼科尔森（1965）证明，形状只依赖于一个无量纲参数
$$
\psi = \frac{k^\circ}{\sqrt{\pi Df_nv}}, \qquad f_n = \frac{nF}{RT}
$$
（$D_\mathrm{O} = D_\mathrm{R} = D$且$\alpha \approx 0.5$时）。$\psi \gtrsim 10$时体系表现为可逆（$n = 1$时$\Delta E_\mathrm{p} \approx 57$–$61\ \mathrm{mV}$）；$\psi = 1$时$\Delta E_\mathrm{p} \approx 84\ \mathrm{mV}$；$\psi = 0.5$时$105\ \mathrm{mV}$；$\psi = 0.1$时$212\ \mathrm{mV}$。测量$\Delta E_\mathrm{p}$随$v$的变化并从尼科尔森表中读出$\psi$，就得到$k^\circ$。完全不可逆时，峰电势每十分度扫描速率移动$-1.15RT/\alpha F$（$\alpha = 0.5$、$25\,^\circ\mathrm{C}$时为$-59\ \mathrm{mV}$），峰变宽，回峰甚至可能根本不出现在电势窗口内。

::: quiz
扫描速率$0.50\ \mathrm{V\,s^{-1}}$下，某单电子电对（$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$，$25\,^\circ\mathrm{C}$）显示$\Delta E_\mathrm{p} = 72\ \mathrm{mV}$，对应尼科尔森的$\psi = 2$。$k^\circ$是多少？
- [ ] $2.0\ \mathrm{cm\,s^{-1}}$
- [x] 约$0.05\ \mathrm{cm\,s^{-1}}$
- [ ] 约$0.025\ \mathrm{cm\,s^{-1}}$
- [ ] 无法由单一扫描速率求出
::: solution
$\sqrt{\pi Df_nv} = \sqrt{\pi\times1.0\times10^{-5}\times38.92\times0.50}\ \mathrm{cm\,s^{-1}} = 0.0247\ \mathrm{cm\,s^{-1}}$，所以$k^\circ = \psi\times0.0247 = 0.049\ \mathrm{cm\,s^{-1}}$。原理上一个扫描速率就够了，但用一串扫描速率、每一个都给出同一个$k^\circ$，才是检验峰间距来自动力学而非未补偿电阻的正确做法。
:::
:::

::: warning 未补偿电阻看起来像慢动力学 {#warn-ir}
恒电位仪控制的是工作电极与参比电极之间的电势，但参比电极尖端与工作电极之间的溶液电阻$R_\mathrm{u}$会给真实的界面电势加上$iR_\mathrm{u}$的误差。由于$i_\mathrm{p}$随$\sqrt{v}$增大，每个峰的欧姆位移也随之增大，两峰随扫描速率升高而分开——这恰是电子转移慢的特征。取$R_\mathrm{u} = 500\ \Omega$（毫米级电极在含$0.1\ \mathrm{mol\,dm^{-3}}$电解质的乙腈中的典型值）、$i_\mathrm{p} = 20\ \mu\mathrm{A}$，每个峰移动$10\ \mathrm{mV}$，$\Delta E_\mathrm{p}$增大$20\ \mathrm{mV}$——足以让一个快电对看起来像准可逆。应采用正反馈补偿、更小的电极或更低的浓度，并用已知快动力学的内标（如二茂铁）检验。未排除$iR_\mathrm{u}$之前，不要从$\Delta E_\mathrm{p}$推断动力学慢。
:::

与电子转移耦合的化学反应留下自己的印记，其按字母的分类——E代表电子转移，C代表均相化学步骤——是机理电化学的标准语言。**EC**机理中，产物R以速率常数$k$分解；$k\tau \gg 1$（分解快于时间$RT/Fv$）时回峰消失，正峰随$k/v$每十分度正移约$30\ \mathrm{mV}$，加快扫描直到回峰重现即可定出$k$。**ECE**机理中，化学步骤的产物在所加电势下本身有电化学活性，正峰电流因此增大到超过单电子的值。**催化（EC′）**机理中，R与底物反应重新生成O，峰变成S形催化波，其平台给出催化速率常数——这是评价$\mathrm{CO_2}$还原与析氢分子催化剂的首选方法。这些情形如今都用数字模拟分析：拟合完整的电流-电势-时间行为，而不是单个特征。

::: algorithm 解读循环伏安图 {#alg-cv}
1. 先记录只含电解质的背景CV和内标（如二茂铁）的CV，确定电势标度并检查$R_\mathrm{u}$。
2. 在若干扫描速率下测量$i_\mathrm{p}$。对$v^{1/2}$成过原点的直线：扩散物种；对$v$成直线：吸附物种。
3. 测量$\Delta E_\mathrm{p}$及其对$v$的依赖。约$57/n\ \mathrm{mV}$且不随$v$变：可逆；由$\Delta E_\mathrm{p}$取$n$（或在$D$已知时由$i_\mathrm{p}$取），由中点取$E^{\circ\prime}$。经$iR_\mathrm{u}$校正后随$v$增大：准可逆；由尼科尔森的$\psi$求$k^\circ$。
4. 测量$i_\mathrm{p,a}/i_\mathrm{p,c}$（从合适的基线量起）。小于1且在更快扫描下回升到1：有后续化学反应（EC）；由比值恢复时的扫描速率估计其速率。
5. 在若干扫描速率与浓度下模拟整条伏安图，确证所提出的机理。
:::

::: history 从滴汞电极到循环伏安法 {#hist-voltammetry}
瓦尔特·能斯特（Walther Nernst）1904年提出扩散层，弗雷德里克·科特雷尔（Frederick Cottrell）1903年求解了电势阶跃问题。雅罗斯拉夫·海洛夫斯基（Jaroslav Heyrovský）1922年发明的滴汞电极极谱法，以其不断更新、给出可重现电流的表面，把电流-电势曲线变成常规的分析工具，并使他在1959年获诺贝尔化学奖；迪翁尼兹·伊尔科维奇（Dionýz Ilkovič）1934年的方程给出了生长中汞滴的扩散电流。约翰·兰德尔（John Randles）与奥古斯丁·谢夫奇克（Augustin Ševčík）在1948年各自独立导出了线性扫描峰电流。韦尼亚明·列维奇（Veniamin Levich）1942年求解了旋转圆盘上的对流扩散问题，雅罗斯拉夫·科捷奇（Jaroslav Koutecký）与列维奇在1950年代加上了动力学。理查德·尼科尔森（Richard Nicholson）与欧文·谢恩（Irving Shain）1964年发表在*Analytical Chemistry*上的论文给出了可逆、不可逆与偶联化学情形下静止电极伏安法的理论，使循环伏安法成为研究氧化还原机理的标准方法；随后又有尼科尔森1965年给出的$k^\circ$工作曲线。微电极自1970年代后期起获得发展，主要贡献者有马丁·弗莱施曼（Martin Fleischmann）与马克·怀特曼（Mark Wightman）。
:::

## 后续内容

本章的工具贯穿课程其余部分。旋转圆盘与科捷奇-列维奇测量是检验氧还原与析氢催化剂的标准方法（[[electrochemistry/fuel-cells-electrolysis]]）；循环伏安法测定电池电解液的电势窗口与电极材料的嵌入电势，电解液与颗粒内部的扩散限制决定电池的倍率性能（[[electrochemistry/batteries]]）；带传质平台的极化曲线——氧扩散限制是经典的一例——决定充气水中腐蚀的速率（[[electrochemistry/corrosion]]）。在分析化学中，脉冲方法、溶出伏安法与安培传感器直接建立在这些思想之上（[[analytical-chemistry/electroanalytical]]）。同一套循环伏安语言也遍及分子化学：金属配合物的氧化还原电势（[[coordination-chemistry/coordination-compounds]]）与有机半导体的前沿轨道能量都从伏安图上读出。

::: summary
- 物种靠扩散、电迁移与对流到达电极（能斯特-普朗克方程）；过量支持电解质使待测物的迁移数变得极小，从而抑制电迁移。
- 扩散层模型中极限电流为$nFAmc^*$，$m = D/\delta$；可逆稳态波为$E = E_{1/2} + (RT/nF)\ln[(i_\mathrm{l} - i)/i]$，比值$k^\circ/m$决定一个波是否可逆。
- 旋转圆盘上，$\delta = 1.61D^{1/3}\omega^{-1/2}\nu^{1/6}$，$i_\mathrm{l} = 0.620nFAD^{2/3}\omega^{1/2}\nu^{-1/6}c^*$（列维奇方程）；$1/i = 1/i_\mathrm{k} + 1/i_\mathrm{l}$（科捷奇-列维奇方程）把动力学与传质分开，并给出$n$。
- 微电极在$r_0^2/D$量级的时间内达到稳态，圆盘的$i_\mathrm{ss} = 4nFDc^*r_0$，欧姆降与电容都很小。
- 循环伏安中可逆电对满足$i_\mathrm{p} = 0.4463nFAc^*(nFvD/RT)^{1/2} \propto v^{1/2}$，$\Delta E_\mathrm{p} \approx 57/n\ \mathrm{mV}$，$E^{\circ\prime}$在中点；吸附物种给出$i_\mathrm{p} \propto v$。
- 慢电子转移使$\Delta E_\mathrm{p}$随扫描速率变宽（尼科尔森的$\psi$给出$k^\circ$），但未补偿电阻也会如此；后续化学反应（EC、ECE、EC′）改变回峰与电流，由模拟分析。
:::

## 习题

::: exercise 兰德尔-谢夫奇克峰 {level=1 check="19.0"}
求可逆单电子还原的峰电流：$3.0\ \mathrm{mm}$圆盘电极（$A = 0.0707\ \mathrm{cm^2}$），$c^* = 1.0\ \mathrm{mmol\,dm^{-3}}$，$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$，$v = 0.10\ \mathrm{V\,s^{-1}}$，$25\,^\circ\mathrm{C}$。（$i_\mathrm{p}$以$\mu\mathrm{A}$填写。）
::: solution
$i_\mathrm{p} = 2.69\times10^{5}\times1\times0.0707\times(1.0\times10^{-5})^{1/2}\times(0.10)^{1/2}\times1.0\times10^{-6}\ \mathrm{A} = 2.69\times10^{5}\times0.0707\times3.162\times10^{-3}\times0.3162\times10^{-6} = 1.90\times10^{-5}\ \mathrm{A} = 19.0\ \mu\mathrm{A}$。
:::
:::

::: exercise 双电子电对的峰间距 {level=1 check="28.5"}
$25\,^\circ\mathrm{C}$下，设两个电子在同一电势转移，可逆双电子电对的峰间距应为多少？（$\Delta E_\mathrm{p}$以mV填写。）
::: solution
$\Delta E_\mathrm{p} = 2.218RT/nF = 2.218\times25.69/2\ \mathrm{mV} = 28.5\ \mathrm{mV}$。实际上双电子电对的间距常更大，因为两个电子分步在不同电势转移，伏安图反映的便是两个形式电势的间隔。
:::
:::

::: exercise 微圆盘的稳态电流 {level=1 check="7.72"}
求半径$10\ \mu\mathrm{m}$微圆盘上的稳态极限电流：单电子反应，物种浓度$2.0\ \mathrm{mmol\,dm^{-3}}$，$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$。（$i_\mathrm{ss}$以nA填写。）
::: solution
$i_\mathrm{ss} = 4nFDc^*r_0 = 4\times96\,485\times1.0\times10^{-5}\times2.0\times10^{-6}\times1.0\times10^{-3}\ \mathrm{A} = 7.72\times10^{-9}\ \mathrm{A} = 7.72\ \mathrm{nA}$，其中$r_0 = 1.0\times10^{-3}\ \mathrm{cm}$。电流正比于半径而非面积：半径减半，电流减半，而电流*密度*加倍。
:::
:::

::: exercise 由列维奇方程求扩散系数 {level=2 check="1.08"}
面积$0.196\ \mathrm{cm^2}$的RDE在$900\ \mathrm{rpm}$下，对水中$1.0\ \mathrm{mmol\,dm^{-3}}$某物种的单电子还原给出极限电流$0.120\ \mathrm{mA}$（$\nu = 0.010\ \mathrm{cm^2\,s^{-1}}$）。求$D$。（$D$以$10^{-5}\ \mathrm{cm^2\,s^{-1}}$填写。）
::: solution
$\omega = 900\times2\pi/60 = 94.25\ \mathrm{rad\,s^{-1}}$。由[[#eq-levich]]，
$$
D^{2/3} = \frac{i_\mathrm{l}}{0.620\,nFA\,\omega^{1/2}\nu^{-1/6}c^*} = \frac{1.20\times10^{-4}}{0.620\times96\,485\times0.196\times9.708\times2.154\times1.0\times10^{-6}} = 4.89\times10^{-4},
$$
所以$D = (4.89\times10^{-4})^{3/2} = 1.08\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$。由于$2/3$次幂，$D$对$i$的误差很敏感：电流误差$3\,\%$，$D$的误差就有$4.5\,\%$。
:::
:::

::: exercise 扫描速率依赖 {level=2 check="40"}
一扩散控制的可逆电对在$0.050\ \mathrm{V\,s^{-1}}$下$i_\mathrm{p} = 10\ \mu\mathrm{A}$，在$0.20\ \mathrm{V\,s^{-1}}$下$20\ \mu\mathrm{A}$。预测$0.80\ \mathrm{V\,s^{-1}}$下的$i_\mathrm{p}$，以及若该物种改为吸附、$0.050\ \mathrm{V\,s^{-1}}$下$i_\mathrm{p} = 10\ \mu\mathrm{A}$时$0.80\ \mathrm{V\,s^{-1}}$应有的值。（扩散控制的$i_\mathrm{p}$以$\mu\mathrm{A}$填写。）
::: solution
$i_\mathrm{p} \propto v^{1/2}$：$v$从$0.050$到$0.80\ \mathrm{V\,s^{-1}}$增大$16$倍，$i_\mathrm{p}$增大$4$倍：$40\ \mu\mathrm{A}$。所给数据已符合这一定律（$v$增$4$倍，$i_\mathrm{p}$增$2$倍）。吸附物种将随$v$标度：$160\ \mu\mathrm{A}$。$\log i_\mathrm{p}$对$\log v$的图中斜率$0.5$或$1$可一眼区分两种情形；介于其间的斜率表示混合行为。
:::
:::

::: exercise 托梅什判据 {level=2 check="56.5"}
由[[#eq-wave]]证明可逆稳态波满足$E_{1/4} - E_{3/4} = (RT/nF)\ln 9$，并求$n = 1$、$25\,^\circ\mathrm{C}$时的值。（以mV填写。）
::: solution
$i = i_\mathrm{l}/4$时$(i_\mathrm{l} - i)/i = 3$；$i = 3i_\mathrm{l}/4$时为$1/3$。于是$E_{1/4} - E_{3/4} = (RT/nF)[\ln3 - \ln(1/3)] = (RT/nF)\ln9 = 25.69\times2.197\ \mathrm{mV} = 56.5\ \mathrm{mV}$（$n = 1$）。测得$57\ \mathrm{mV}$表明可逆单电子波；$28\ \mathrm{mV}$表明可逆双电子波；明显大于$56.5/n$则表明动力学慢。
:::
:::

::: exercise 由峰间距求速率常数 {level=3 check="0.0350"}
某单电子电对$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$，经未补偿电阻校正后，在$1.00\ \mathrm{V\,s^{-1}}$、$25\,^\circ\mathrm{C}$下$\Delta E_\mathrm{p} = 84\ \mathrm{mV}$。取尼科尔森对此间距给出的$\psi = 1$，求$k^\circ$。扫描速率为多大时$\Delta E_\mathrm{p}$达到$212\ \mathrm{mV}$（$\psi = 0.1$）？（$k^\circ$以$\mathrm{cm\,s^{-1}}$填写。）
::: hint
$k^\circ$与$D$固定时，$\psi \propto v^{-1/2}$。
:::
::: solution
$k^\circ = \psi\sqrt{\pi Dfv} = 1\times\sqrt{\pi\times1.0\times10^{-5}\times38.92\times1.00}\ \mathrm{cm\,s^{-1}} = 0.0350\ \mathrm{cm\,s^{-1}}$。要使$\psi$减小十倍，$v$须增大一百倍，到$100\ \mathrm{V\,s^{-1}}$——只有在微电极上才可行，那里$iR_\mathrm{u}$与充电电流都还可控。比约$1\ \mathrm{cm\,s^{-1}}$更快的电对需要每秒数千伏的扫描，或电极极小的稳态方法。
:::
:::

::: exercise 科捷奇-列维奇分析 {level=3 check="2.0"}
对旋转圆盘上速率常数为$k_\mathrm{f}$的不可逆还原，推导科捷奇-列维奇方程。对[[#ex-kl]]的氧还原数据，假设另一催化剂给出相同的斜率但截距为$1.00\ \mathrm{mA^{-1}}$。它的$n$和动力学电流是多少？比第一个催化剂活性低多少倍？（填写该倍数。）
::: solution
稳态下反应速率等于输运通量：$i/nFA = k_\mathrm{f}c(0) = m(c^* - c(0))$；消去$c(0)$得$1/i = 1/(nFAk_\mathrm{f}c^*) + 1/(nFAmc^*)$，其中$m = D/\delta \propto \omega^{1/2}$。斜率相同意味着$B$相同，因而$n = 4$不变（$D$、$\nu$、$c^*$相同）。截距给出$i_\mathrm{k} = 1/1.00 = 1.00\ \mathrm{mA}$，为第一个催化剂$2.00\ \mathrm{mA}$的一半，所以在此电势下活性低$2.0$倍（其$k_\mathrm{f}$为$0.011\ \mathrm{cm\,s^{-1}}$）。在固定电势下比较$i_\mathrm{k}$并归一到电化学活性表面积，是燃料电池研究的惯例；在单一转速下比较原始电流会低估差距，因为传质限制压缩了它。
:::
:::

::: exercise 半球扩散 {level=3 check="12.1"}
证明半径$r_0$、维持在极限电势的半球形电极周围稳态浓度为$c(r) = c^*(1 - r_0/r)$，并由此得出$i_\mathrm{ss} = 2\pi nFDc^*r_0$。对$r_0 = 10\ \mu\mathrm{m}$、$n = 1$、$D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$、$c^* = 2.0\ \mathrm{mmol\,dm^{-3}}$求值。（$i_\mathrm{ss}$以nA填写。）
::: hint
球对称下稳态扩散方程为$\frac{1}{r^2}\frac{\mathrm{d}}{\mathrm{d}r}\left(r^2\frac{\mathrm{d}c}{\mathrm{d}r}\right) = 0$。
:::
::: solution
积分一次，$r^2\,\mathrm{d}c/\mathrm{d}r = $常数$= a$；再积分，$c = b - a/r$。条件$c(\infty) = c^*$与$c(r_0) = 0$给出$b = c^*$、$a = c^*r_0$，于是$c = c^*(1 - r_0/r)$。表面通量为$D(\mathrm{d}c/\mathrm{d}r)_{r_0} = Dc^*/r_0$，在半球面积$2\pi r_0^2$上电流为$i_\mathrm{ss} = nF\times2\pi r_0^2\times Dc^*/r_0 = 2\pi nFDc^*r_0$。数值上，$2\pi\times96\,485\times1.0\times10^{-5}\times2.0\times10^{-6}\times1.0\times10^{-3}\ \mathrm{A} = 1.21\times10^{-8}\ \mathrm{A} = 12.1\ \mathrm{nA}$。同样半径的嵌入圆盘给出它的$4/2\pi = 0.64$倍（$7.7\ \mathrm{nA}$，如前面的习题），因为绝缘平面挡住了部分溶液。浓度按$1/r$恢复——半径两倍处恢复到本体值的一半——这就是微电极只采样其周围极小体积的原因。
:::
:::
