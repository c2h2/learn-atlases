小分子化学家制得一个新化合物，记下熔点、NMR 谱和质谱就算完成了工作：一个结构、一个摩尔质量、一个熔点。而制备一种新聚酯的聚合物化学家面临的活儿要难得多。样品没有单一的摩尔质量，只有一个分布，而每一种测量方法报告的是不同的平均值。它的"熔点"可能是一个宽的范围，甚至可能不存在，取而代之的是一个取决于升温速率的玻璃化转变。它的 NMR 谱是数百万条在长度、端基、支化和序列上各不相同的链的平均。表征一个聚合物，就是为具体的问题选择能回答它们的方法：每克有多少条链（$\bar{M}_\mathrm{n}$）？按质量加权的平均链有多重（$\bar{M}_\mathrm{w}$）？分布有多宽、形状如何？溶液中的线团有多大？组成、立构规整度、端基是什么？结晶的占多少、转变都在哪里？

本章按聚合物实验室实际使用的顺序过一遍主要方法。**依数性方法**（膜渗透压法、蒸气压渗透法、端基分析）给出 $\bar{M}_\mathrm{n}$。**光散射**给出 $\bar{M}_\mathrm{w}$、回转半径与第二维里系数。**稀溶液黏度法**给出特性黏数，并经 Mark–Houwink 方程给出黏均摩尔质量。**尺寸排阻色谱**这一主力方法给出整个分布，配上普适校准或光散射检测还能给出绝对摩尔质量。**MALDI 质谱**能分辨短聚合物的单条链。**NMR 波谱**给出组成、立构规整度与端基。**热分析**（DSC 与 TGA）给出玻璃化转变、熔融、结晶度与热稳定性。每种方法都建立在[[polymer-chemistry/polymer-solutions]]的稀溶液理论或[[polymer-chemistry/polymer-structure]]的定义之上，要紧的是知道每种方法看到的是哪个平均值，以及为什么。

## 数均方法

### 端基分析

如果每条链都带有数目已知的、可滴定或 NMR 可测的端基，那么计数端基就是计数链。总质量除以链的物质的量按定义就是 $\bar{M}_\mathrm{n}$（[[polymer-chemistry/polymer-structure#ex-end-group]]算过一个例子）。在 $^1\mathrm{H}$ NMR 中，端基信号（引发剂片段，或聚酯的 $\mathrm{CH_2OH}$）与主链信号之比直接给出 $\bar{X}_\mathrm{n}$。此法可用于到 $\bar{M}_\mathrm{n}$ 约 $2\times10^{4}$，再高时端基信号太小，无法可靠地积分。如果端基与假定的不符——例如有副反应封掉了一些链端，或体系中存有环状分子——此法即告失效。

### 渗透压法

在**膜渗透压法**中，溶液与纯溶剂被一张半透膜隔开：溶剂可以穿过，聚合物链不能。溶剂流入溶液一侧，直到静水压超额压力 $\Pi$ 恰好平衡溶剂化学势的降低。由维里展开[[polymer-chemistry/polymer-solutions#eq-virial]]得
$$
\frac{\Pi}{c} = RT\left(\frac{1}{\bar{M}_\mathrm{n}} + A_2c + A_3c^2 + \dots\right),
$$ {#eq-osmometry}
所以 $\Pi/c$ 对 $c$ 的图截距为 $RT/\bar{M}_\mathrm{n}$、初始斜率为 $RTA_2$。

::: proposition 依数性方法给出数均摩尔质量 {#prop-colligative}
对多分散聚合物的稀溶液，极限渗透压为
$$
\lim_{c\to0}\frac{\Pi}{c} = \frac{RT}{\bar{M}_\mathrm{n}},
$$
与摩尔质量分布的形状无关。对每一种依数性（蒸气压下降、沸点升高、凝固点降低）同样成立。
:::

::: proof
在稀薄极限下每个溶质物种 $i$ 独立地贡献，形式即范特霍夫方程，$\Pi = RT\sum_i n_i/V$，$n_i$ 是体积 $V$ 中物种 $i$ 的物质的量。以质量浓度 $c_i = n_iM_i/V$ 与 $c = \sum_ic_i$ 表示，
$$
\frac{\Pi}{c} = RT\,\frac{\sum_i n_i}{\sum_i n_iM_i} = \frac{RT}{\bar{M}_\mathrm{n}},
$$
因为 $\sum n_iM_i/\sum n_i$ 正是 $\bar{M}_\mathrm{n}$ 的定义（[[polymer-chemistry/polymer-structure#eq-mn]]）。渗透压数的是溶质*粒子*，不管它们多重，所以大链与小链算得一样。$\blacksquare$
:::

聚合物溶液的渗透压很小。$\bar{M}_\mathrm{n} = 1.5\times10^{5}$ 的聚合物配成 $10\ \mathrm{g\,dm^{-3}}$ 的溶液，只产生约 $280\ \mathrm{Pa}$，约等于 3 cm 甲苯柱。$\bar{M}_\mathrm{n} \approx 10^{6}$ 以上时它小到无法测量。低于约 $2\times10^{4}$ 时，小链会漏过滤膜，测得的 $\bar{M}_\mathrm{n}$ 偏高。这一低摩尔质量区间可用**蒸气压渗透法**：它测量饱和蒸气中一滴溶液与一滴溶剂之间的微小温差，需要用已知摩尔质量的标准物质校准。

::: widget regression
points: 2, 1.883; 4, 2.086; 6, 2.329; 8, 2.558; 10, 2.757
x: 0, 12
y: 1.5, 3
caption: 甲苯中聚苯乙烯 $25\ ^\circ\mathrm{C}$ 的膜渗透压数据（带真实散点的示例数据）：$\Pi/c$ 以 $10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$ 为单位，浓度 $c$ 以 $\mathrm{mg\,cm^{-3}}$ 为单位。最小二乘直线截距 $1.657$、斜率 $0.111$。由截距得 $\bar{M}_\mathrm{n} = RT/\text{截距} = 1.50\times10^{5}\ \mathrm{g\,mol^{-1}}$，由斜率得 $A_2 = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$（[[#ex-osmometry]]）。拖动数据点就能看出：低浓度处一次糟糕的测量就能把截距挪动多少。向 $c = 0$ 的外推就是整个测量本身，这就是最低的几个浓度必须测得最仔细的原因。
:::

::: example 由渗透压求数均摩尔质量 {#ex-osmometry}
图中数据（$c$ 从 $2.0$ 到 $10.0\ \mathrm{mg\,cm^{-3}}$）给出线性拟合 $\Pi/c = 1.657\times10^{4} + 1.11\times10^{6}\,c$，其中 $\Pi/c$ 以 $\mathrm{Pa\,cm^3\,g^{-1}}$、$c$ 以 $\mathrm{g\,cm^{-3}}$ 计，温度 $298.15\ \mathrm{K}$。求 $\bar{M}_\mathrm{n}$ 与 $A_2$，并说明 $A_2$ 对溶剂告诉了你什么。
::: solution
使用一致的单位。$RT = 8.314\times298.15 = 2478.8\ \mathrm{J\,mol^{-1}}$，而 $1\ \mathrm{J} = 1\ \mathrm{Pa\,m^3} = 10^{6}\ \mathrm{Pa\,cm^3}$，所以 $RT = 2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}$。于是
$$
\bar{M}_\mathrm{n} = \frac{RT}{\text{截距}} = \frac{2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}}{1.657\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}} = 1.50\times10^{5}\ \mathrm{g\,mol^{-1}} .
$$
斜率为 $RTA_2$，所以
$$
A_2 = \frac{1.11\times10^{6}\ \mathrm{Pa\,cm^6\,g^{-2}}}{2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}} = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}} .
$$
$A_2 > 0$，所以甲苯是良溶剂（$\chi < \tfrac12$），与[[polymer-chemistry/polymer-solutions#ex-solubility]]的判断一致。在最高浓度处，维里项贡献 $(1.11\times10^{6})(0.010)/1.657\times10^{4} = 67\%$ 的截距。若忽略它、只用单一浓度下的 $\Pi/c$，$\bar{M}_\mathrm{n}$ 将被低估 40%。
:::
:::

## 光散射

溶液散射光是因为其折射率在涨落。聚合物链是折射率略有不同的区域，其浓度各处起伏。对远小于波长的粒子，一条链的每个链段同相散射，所以一条链的散射*振幅*正比于其质量，*强度*正比于其质量的平方。因此重链主导散射。这就是光散射测的是重均摩尔质量、又对灰尘和聚集体如此敏感的原因。散射角 $\theta$ 处的散射强度，除以入射强度、散射体积和距离后归一化，即得**瑞利比** $R_\theta$。

::: proposition Zimm 方程 {#prop-zimm}
对质量浓度为 $c$ 的稀聚合物溶液，散射角 $\theta$ 处的超额瑞利比在 $c$ 与 $q^2$ 的一级精度下满足
$$
\frac{Kc}{R_\theta} = \frac{1}{\bar{M}_\mathrm{w}}\left(1 + \frac{q^2\langle R_\mathrm{g}^2\rangle_\mathrm{z}}{3}\right) + 2A_2c,
\qquad
K = \frac{4\pi^2n_0^2(\mathrm{d}n/\mathrm{d}c)^2}{N_\mathrm{A}\lambda_0^4},
\qquad
q = \frac{4\pi n_0}{\lambda_0}\sin\frac{\theta}{2},
$$ {#eq-zimm}
其中 $n_0$ 是溶剂折射率，$\mathrm{d}n/\mathrm{d}c$ 是聚合物的折射率增量，$\lambda_0$ 是真空中波长，$q$ 是散射矢量的大小。所得摩尔质量是**重均**，回转半径则是一个 **z 均**。
:::

::: proof
单物种的结果取自涨落散射理论（Einstein，Debye）：在 $c \to 0$ 与 $\theta \to 0$ 的极限下，摩尔质量为 $M$ 的溶质给出 $R_0 = KcM$。这就是说质量为 $M$ 的链散射振幅 $\propto M$、强度 $\propto M^2$，而单位体积有 $cN_\mathrm{A}/M$ 条链，所以总强度 $\propto cM$。对浓度为 $c_i$ 的多物种混合物，不同链的散射非相干地叠加，于是
$$
R_0 = K\sum_ic_iM_i = Kc\,\frac{\sum_ic_iM_i}{\sum_ic_i} = Kc\bar{M}_\mathrm{w},
$$
因为质量浓度就是质量权重，$\sum w_iM_i/\sum w_i = \bar{M}_\mathrm{w}$。角度项的出现，是因为同一条链上相距约 $1/q$ 量级的两个链段散射时存在位相差。把链的形状因子对小 $q$ 展开得 $P(q) = 1 - q^2R_\mathrm{g}^2/3 + \dots$，再按各物种对强度的贡献 $c_iM_i$ 加权平均，得 $\sum c_iM_iR_{\mathrm{g},i}^2/\sum c_iM_i$，即 $R_\mathrm{g}^2$ 的 z 均（权重 $n_iM_i^2$）。最后，分子间相互作用抑制良溶剂中的浓度涨落，加上项 $2A_2c$，其中的 $A_2$ 与渗透压法中的同一个。把 $R_\theta = Kc\bar{M}_\mathrm{w}P(q)(1 - 2A_2c\bar{M}_\mathrm{w} + \dots)$ 求逆到一级即得[[#eq-zimm]]。$\blacksquare$
:::

在 **Zimm 图**中，在若干角度和浓度下测量 $Kc/R_\theta$，把数据外推到 $\theta = 0$（得 $1/\bar{M}_\mathrm{w} + 2A_2c$）并外推到 $c = 0$（得 $(1 + q^2R_\mathrm{g}^2/3)/\bar{M}_\mathrm{w}$）。两条线交于 $1/\bar{M}_\mathrm{w}$。角度线斜率与截距之比给出 $R_\mathrm{g}^2/3$。链的 $R_\mathrm{g}$ 至少要约 $10\ \mathrm{nm}$，可见光才分辨得出其尺寸；小角 X 射线散射与小角中子散射正是把这个下限往下推的。这方法是*绝对*的：不需要标准物质校准，只需要光学常数 $K$，所以 $\mathrm{d}n/\mathrm{d}c$ 必须准确已知，因为它以平方进入公式。

::: example 光散射测重均摩尔质量与线团尺寸 {#ex-zimm}
用 $632.8\ \mathrm{nm}$ 激光测量甲苯中的聚苯乙烯（$n_0 = 1.496$，$\mathrm{d}n/\mathrm{d}c = 0.110\ \mathrm{cm^3\,g^{-1}}$）。外推到零角度时，$c = 1.0\times10^{-3}$ 处 $Kc/R_0$ 为 $2.80\times10^{-6}$，$c = 2.0\times10^{-3}\ \mathrm{g\,cm^{-3}}$ 处为 $3.60\times10^{-6}\ \mathrm{mol\,g^{-1}}$。外推到零浓度时，$\theta = 90^\circ$ 处的 $Kc/R_\theta$ 为 $2.265\times10^{-6}\ \mathrm{mol\,g^{-1}}$。求 $K$、$\bar{M}_\mathrm{w}$、$A_2$ 与 $R_\mathrm{g}$。
::: solution
光学常数，取 $\lambda_0 = 6.328\times10^{-5}\ \mathrm{cm}$：
$$
K = \frac{4\pi^2(1.496)^2(0.110)^2}{(6.022\times10^{23})(6.328\times10^{-5})^4}\ \mathrm{mol\,cm^2\,g^{-2}} = 1.11\times10^{-7}\ \mathrm{mol\,cm^2\,g^{-2}} .
$$
$\theta = 0$ 的浓度线：斜率为 $(3.60 - 2.80)\times10^{-6}/1.0\times10^{-3} = 8.0\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}} = 2A_2$，所以 $A_2 = 4.0\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$。截距为 $2.80\times10^{-6} - 8.0\times10^{-7} = 2.00\times10^{-6}\ \mathrm{mol\,g^{-1}}$，于是 $\bar{M}_\mathrm{w} = 5.0\times10^{5}\ \mathrm{g\,mol^{-1}}$。

角度：$q = (4\pi\times1.496/632.8\ \mathrm{nm})\sin45^\circ = 0.0210\ \mathrm{nm^{-1}}$，所以 $q^2 = 4.41\times10^{-4}\ \mathrm{nm^{-2}}$。于是
$$
1 + \frac{q^2R_\mathrm{g}^2}{3} = \frac{2.265\times10^{-6}}{2.00\times10^{-6}} = 1.1325
\qquad\Longrightarrow\qquad
R_\mathrm{g}^2 = \frac{3(0.1325)}{4.41\times10^{-4}\ \mathrm{nm^{-2}}} = 901\ \mathrm{nm^2},\quad R_\mathrm{g} = 30\ \mathrm{nm} .
$$
作为比较，同样 $M$ 的链在 $\Theta$ 下将有 $R_\mathrm{g} \approx 0.0275\sqrt{5\times10^{5}} = 19\ \mathrm{nm}$。线团在甲苯中膨胀约 1.5 倍，与正的 $A_2$ 一致。实际工作中角度依赖要在许多个角度上测量，单角数值的好坏完全取决于它的截距。
:::
:::

## 稀溶液黏度法

估计摩尔质量最古老的方法至今仍是最便宜的。溶解的线团按其所占体积成比例地增大溶剂黏度，而这一体积随摩尔质量增长。毛细管黏度计（乌氏或奥氏）中的流经时间直接给出黏度比。

::: definition 黏度物理量与特性黏数 {#def-intrinsic-viscosity}
设同一温度下溶液黏度为 $\eta$、溶剂黏度为 $\eta_0$，$c$ 为质量浓度：

- **相对黏度**（黏度比）：$\eta_\mathrm{r} = \eta/\eta_0$；
- **增比黏度**：$\eta_\text{sp} = \eta_\mathrm{r} - 1$；
- **比浓黏度**（还原黏度，黏度数）：$\eta_\text{sp}/c$；
- **对数黏度**（对数黏度数）：$(\ln\eta_\mathrm{r})/c$；
- **特性黏数**（极限黏数）：
$$
[\eta] = \lim_{c\to0}\frac{\eta_\text{sp}}{c} = \lim_{c\to0}\frac{\ln\eta_\mathrm{r}}{c},
$$
单位为浓度的倒数（$\mathrm{cm^3\,g^{-1}}$ 或 $\mathrm{dL\,g^{-1}}$）。外推使用 **Huggins** 方程 $\eta_\text{sp}/c = [\eta] + k_\mathrm{H}[\eta]^2c$（良溶剂中 $k_\mathrm{H} \approx 0.3$–$0.4$，$\Theta$ 下约 $0.5$），并配合 **Kraemer** 方程 $(\ln\eta_\mathrm{r})/c = [\eta] + (k_\mathrm{H} - \tfrac12)[\eta]^2c$。两条直线必须外推到同一个截距。
:::

特性黏数是孤立线团单位质量的水力学体积。Flory 与 Fox 论证：流动溶剂中的线团表现得像一个不可渗透的球，其半径正比于线团尺寸，于是
$$
[\eta] = \Phi\,\frac{\langle R^2\rangle^{3/2}}{M},
$$ {#eq-flory-fox}
其中 $\Phi \approx 2.5\times10^{23}\ \mathrm{mol^{-1}}$ 几乎是普适常数（$[\eta]$ 以 $\mathrm{cm^3\,g^{-1}}$、$R$ 以 cm 计）。由于 $\langle R^2\rangle^{1/2} \propto M^{\nu}$，$[\eta] \propto M^{3\nu - 1}$。即 $\Theta$ 下为 $M^{1/2}$，良溶剂中约为 $M^{0.76}$。这一标度关系是一条经验定律的理论基础。

::: proposition Mark–Houwink 方程与黏均摩尔质量 {#prop-mark-houwink}
对给定聚合物、溶剂与温度，窄级分的特性黏数服从 **Mark–Houwink（–Sakurada）方程**
$$
[\eta] = KM^{a},
$$ {#eq-mark-houwink}
其中 θ 溶剂中 $a = 0.5$，良溶剂中柔性线团为 $0.6$–$0.8$，刚性棒最高可达约 $1.8$。对多分散样品，假设稀极限下不同链对 $\eta_\text{sp}$ 的贡献可加，则由[[#eq-mark-houwink]]反解所得的摩尔质量是**黏均**
$$
\bar{M}_\mathrm{v} = \left(\sum_iw_iM_i^{a}\right)^{1/a},
$$
当 $0 < a < 1$ 它介于 $\bar{M}_\mathrm{n}$ 与 $\bar{M}_\mathrm{w}$ 之间，$a = 1$ 时等于 $\bar{M}_\mathrm{w}$。
:::

::: proof
稀极限下每个物种独立地提高黏度，$\eta_\text{sp} = \sum_i[\eta]_ic_i$，所以 $[\eta] = \sum_i[\eta]_ic_i/c = \sum_iw_i[\eta]_i$，其中 $w_i = c_i/c$ 为质量分数。代入 $[\eta]_i = KM_i^a$ 得 $[\eta] = K\sum_iw_iM_i^a$。以 $[\eta] = K\bar{M}_\mathrm{v}^{\,a}$ 定义 $\bar{M}_\mathrm{v}$ 即得题述平均。它是摩尔质量按质量加权的 $a$ 次幂平均。幂平均随指数增大而增大，而质量加权的 $(-1)$ 次与 1 次幂平均正是 $\bar{M}_\mathrm{n}$ 与 $\bar{M}_\mathrm{w}$（[[polymer-chemistry/polymer-structure#def-averages]]），所以 $0 < a < 1$ 时 $\bar{M}_\mathrm{n} \le \bar{M}_\mathrm{v} \le \bar{M}_\mathrm{w}$。$\blacksquare$
:::

$K$ 与 $a$ 不是普适常数。它们对每一组聚合物–溶剂–温度，用经绝对方法表征过的级分测得一次，然后列入表格，例如《Polymer Handbook》。$Đ \approx 2$ 的聚合物，典型的 $\bar{M}_\mathrm{v}$ 比 $\bar{M}_\mathrm{w}$ 低 10–20%。

::: widget plot
f: n0 + kh*n0^2*x; n0 + (kh-0.5)*n0^2*x
x: 0, 0.5
y: 0.8, 1.6
sliders: n0=1.2:0.5:1.5:0.01; kh=0.35:0.2:0.6:0.01
labels: \eta_\text{sp}/c\ \text{(Huggins)}; \ln\eta_\mathrm{r}/c\ \text{(Kraemer)}
caption: 确定特性黏数的 Huggins 与 Kraemer 外推（坐标轴：$[\eta]$ 以 $\mathrm{dL\,g^{-1}}$、$c$ 以 $\mathrm{g\,dL^{-1}}$），滑块设定 $[\eta]$（滑块 $n0$）与 Huggins 常数 $k_\mathrm{H}$。比浓黏度随浓度上升，对数黏度随浓度下降，斜率分别为 $k_\mathrm{H}[\eta]^2$ 与 $(k_\mathrm{H} - \tfrac12)[\eta]^2$，两条线在纵轴上交于 $[\eta]$。实际操作中两条线各由四五个浓度下的测量点画出；若两截距不一致，即警示存在聚集、毛细管壁吸附，或浓度高到线性形式不再成立。$[\eta]$ 越大两条线发散越厉害，所以高聚物必须在更低的浓度下测量。
:::

::: example 由特性黏数求摩尔质量 {#ex-mark-houwink}
某聚苯乙烯样品在 $25\ ^\circ\mathrm{C}$ 的甲苯中 $[\eta] = 100\ \mathrm{cm^3\,g^{-1}}$。取 $K = 7.5\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$、$a = 0.75$（该体系近似的文献值）。求 $\bar{M}_\mathrm{v}$。若样品具有最可几分布且 $\bar{M}_\mathrm{w} = 3.5\times10^{5}$，这一结果合理吗？
::: solution
反解[[#eq-mark-houwink]]：
$$
\bar{M}_\mathrm{v} = \left(\frac{[\eta]}{K}\right)^{1/a} = \left(\frac{100}{7.5\times10^{-3}}\right)^{1/0.75} = (1.333\times10^{4})^{1.333} = 3.2\times10^{5}\ \mathrm{g\,mol^{-1}} .
$$
对质量分数为 $W(M) \propto M\,e^{-M/\bar{M}_\mathrm{n}}$ 的连续 Flory 分布，幂平均为 $\bar{M}_\mathrm{v} = \bar{M}_\mathrm{n}[\Gamma(2+a)]^{1/a}$。取 $a = 0.75$，$\Gamma(2.75) = 1.608$，于是 $\bar{M}_\mathrm{v} = 1.88\,\bar{M}_\mathrm{n} = 0.94\,\bar{M}_\mathrm{w}$。$\bar{M}_\mathrm{w} = 3.5\times10^{5}$ 时预言 $\bar{M}_\mathrm{v} \approx 3.3\times10^{5}$，与测量一致。黏度法——一根毛细管加一块秒表——以光散射一小部分的成本给出接近 $\bar{M}_\mathrm{w}$ 的摩尔质量，但只适用于 $K$ 与 $a$ 已知的聚合物。
:::
:::

## 尺寸排阻色谱

尺寸排阻色谱（SEC），又称凝胶渗透色谱（GPC），按尺寸分离链。稀溶液用泵压过填充多孔微球（交联聚苯乙烯或二氧化硅）的色谱柱，孔径范围覆盖线团的尺寸范围。小的线团能探入大部分孔体积，因而被滞留。大的线团进不了大多数孔，很早流出。比最大孔还大的线团全都被排阻，一起在**排阻极限**处流出——那对应微球之间的间隙体积。流出液的浓度用示差折光检测器跟踪（信号正比于质量浓度），常并联紫外、黏度计与多角度光散射检测器。

淋洗体积 $V_\mathrm{e}$ 取决于线团的*流体力学体积*，而不直接取决于其质量。用窄分布标准物质——通常是阴离子聚合聚苯乙烯（[[polymer-chemistry/controlled-polymerisation]]）——建立 $\log M$ 对 $V_\mathrm{e}$ 的**校准曲线**，在分离范围内它大致是线性的。色谱图的每个切分 $i$ 于是有质量 $w_i$（来自示差信号）和摩尔质量 $M_i$（来自校准），平均值按定义得出：
$$
\bar{M}_\mathrm{n} = \frac{\sum w_i}{\sum w_i/M_i},\qquad \bar{M}_\mathrm{w} = \frac{\sum w_iM_i}{\sum w_i} .
$$

::: algorithm 解析常规 SEC 色谱图 {#alg-sec}
1. 在完全相同的条件下跑同种聚合物（或聚苯乙烯）的窄分布标准物质，拟合 $\log M$ 对 $V_\mathrm{e}$（线性或低阶多项式）。
2. 跑样品。扣除基线，把示差信号按相等的淋洗体积切成切分。每个切分的高度 $h_i$ 正比于在该切分中流出的质量 $w_i$。
3. 由校准给每个切分指定 $M_i$。若标准物质是另一种聚合物，用普适校准（见下文）换算。
4. 计算 $\bar{M}_\mathrm{n} = \sum h_i/\sum(h_i/M_i)$、$\bar{M}_\mathrm{w} = \sum h_iM_i/\sum h_i$ 和 $Đ$。检查峰位于校准范围之内，且远离排阻极限与溶剂峰。
5. 报告流动相、温度、色谱柱组合、检测器与校准标准物质。"相对于聚苯乙烯标准物质"的摩尔质量除非聚合物*就是*聚苯乙烯，否则不是绝对摩尔质量。
:::

既然分离按流体力学体积进行，那么用聚苯乙烯做的校准对聚甲基丙烯酸甲酯就是错的，对支化聚合物更是大错——支化链比同质量的线型链更紧密。Benoit 与合作者 1967 年证明：按[[#eq-flory-fox]]正比于流体力学体积的乘积 $[\eta]M$，在同一体系中于同一 $V_\mathrm{e}$ 淋洗的所有聚合物都相同。这一**普适校准**把一种聚合物的校准变成另一种的。若聚合物 1 与 2 都服从 Mark–Houwink 定律并在同一淋洗体积流出，则 $K_1M_1^{1+a_1} = K_2M_2^{1+a_2}$，于是
$$
\log M_2 = \frac{1}{1+a_2}\log\frac{K_1}{K_2} + \frac{1+a_1}{1+a_2}\log M_1 .
$$ {#eq-universal}
配上在线黏度计，可直接测出每个切分的 $[\eta]$。配上在线多角度光散射，每个切分的 $M$ 被绝对测出，完全不需要校准。

::: example 普适校准与切分分析 {#ex-sec}
(a) $35\ ^\circ\mathrm{C}$ 的 THF 中，取聚苯乙烯 $K = 1.14\times10^{-2}\ \mathrm{cm^3\,g^{-1}}$、$a = 0.716$，PMMA $K = 9.44\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$、$a = 0.719$（代表性数值）。一条 PMMA 在 $M = 1.00\times10^{5}$ 的聚苯乙烯标准物质的淋洗体积处流出。它的摩尔质量是多少？(b) 一份经校准的 PMMA 色谱图给出下面的切分数据（质量分数 $w_i$ 已归一化为 1）。求 $\bar{M}_\mathrm{n}$、$\bar{M}_\mathrm{w}$ 与 $Đ$。

| $M_i/10^{4}\ \mathrm{g\,mol^{-1}}$ | $2$ | $4$ | $6$ | $8$ | $12$ | $20$ |
|---|---|---|---|---|---|---|
| $w_i$ | $0.10$ | $0.25$ | $0.30$ | $0.20$ | $0.10$ | $0.05$ |
::: solution
(a) 由[[#eq-universal]]：
$$
\log M_2 = \frac{1}{1.719}\log\frac{1.14\times10^{-2}}{9.44\times10^{-3}} + \frac{1.716}{1.719}\times5.000 = \frac{0.0819}{1.719} + 4.9913 = 5.0390,
$$
所以 $M_\text{PMMA} = 1.09\times10^{5}\ \mathrm{g\,mol^{-1}}$。THF 中的 PMMA 线团比同质量的聚苯乙烯线团稍紧密，所以在相同淋洗体积下它其实重 9%。若报成"$1.00\times10^{5}$（聚苯乙烯当量）"就会偏低 9%。

(b) $\sum w_i/M_i = (0.10/2 + 0.25/4 + 0.30/6 + 0.20/8 + 0.10/12 + 0.05/20)\times10^{-4} = 0.19833\times10^{-4}$，所以 $\bar{M}_\mathrm{n} = 5.04\times10^{4}\ \mathrm{g\,mol^{-1}}$。$\sum w_iM_i = (0.2 + 1.0 + 1.8 + 1.6 + 1.2 + 1.0)\times10^{4} = 6.80\times10^{4}$，所以 $\bar{M}_\mathrm{w} = 6.80\times10^{4}\ \mathrm{g\,mol^{-1}}$，$Đ = 1.35$。最高的那个切分质量只占 5%，却贡献 $\bar{M}_\mathrm{w}$ 的 15%。高分子量拖尾和先流出端的基线选取对 $\bar{M}_\mathrm{w}$ 比对 $\bar{M}_\mathrm{n}$ 影响更大，在低分子量端则相反。
:::
:::

::: warning "GPC 测的分子量"通常是相对数值 {#warn-sec}
许多发表的摩尔质量是用聚苯乙烯标准物质校准的 SEC 数值，引用时不加限定。对不是聚苯乙烯的聚合物，这些数值可能差几十个百分点；对支化、星形或棒状链更严重，因为它们单位质量的流体力学体积与线型聚苯乙烯不同。支化使聚合物显得更*轻*，因为紧密的线团淋洗得晚。刚性共轭聚合物显得*重得多*，因为伸展的链流出得早。还有些聚合物会吸附在色谱柱上（焓相互作用），使其延迟、显得更小。报告摩尔质量务必说明来源："THF 中相对 PS 标准物质"、"由普适校准"或"由 SEC–MALS"。数值要紧时请用绝对方法（光散射、渗透压法、端基分析，短链可用 MALDI）。
:::

## 质谱与波谱

**MALDI-TOF 质谱**（基质辅助激光解吸/电离，飞行时间）从紫外吸收基质中把完整的聚合物链汽化并电离，通常成 $\mathrm{Na^+}$ 或 $\mathrm{Ag^+}$ 加合离子。对 $Đ$ 低于约 1.2、质量至多几个 $10^{4}$ 的聚合物，它能分辨单个链长。相邻峰的间隔是重复单元的质量，峰的绝对位置给出**端基**。$m/z = nM_\text{rep} + M_\text{end} + M_\text{cation}$ 处的峰指明 $M_\text{end}$。聚乙二醇 $\mathrm{HO(C_2H_4O)_nH}$ 的钠化单同位素峰位于 $44.0262n + 18.0106 + 22.9898$，例如 $n = 44$ 时为 $1978.15$。不同的端基族系呈现为相互穿插的峰序列，所以要看活性聚合是否得到了设计的端基，MALDI 是最好的办法。它的弱点是质量歧视（长链电离与检测效率低，宽分布样品测出的 $\bar{M}$ 偏低）以及它给出的是离子的计数而非质量。

**NMR 波谱**回答化学问题。$^1\mathrm{H}$ NMR 由两种单元特征信号的积分给出共聚组成（[[polymer-chemistry/copolymerisation]]），由端基给出 $\bar{X}_\mathrm{n}$，还能给出残留单体。$^{13}\mathrm{C}$ NMR 能在五单元组水平分辨立构规整度（[[polymer-chemistry/polymer-structure#def-tacticity]]）、共聚单体序列以及支化的类型与频度（LDPE 的丁基支链）。**红外与拉曼光谱**以指纹区鉴别聚合物（回收塑料自动分选的基础），以环氧或异氰酸酯吸收带的消失跟踪固化反应，并以对构象敏感的谱带测定结晶度。

## 热分析

**差示扫描量热法（DSC）**把一个小样品（5–10 mg）与一个空参比池以恒定速率（通常 $10\ \mathrm{K\,min^{-1}}$）加热，记录维持两者同温所需的热流之差。会出现三类特征。

- **玻璃化转变**是热流上的一个*台阶*，因为热容在非晶相由玻璃态变为橡胶态或液态时增大。$T_\mathrm{g}$ 取台阶的中点。它取决于升降温速率，因为它是一个动力学转变（[[polymer-chemistry/polymer-properties]]）。
- **熔融**是吸热*峰*，往往很宽，因为厚度不同的微晶在不同温度下熔化。
- **结晶**是放热的。降温时给出一个峰；加热淬火样品时，可以在 $T_\mathrm{g}$ 之上以**冷结晶**出现。

::: definition 由 DSC 求结晶度 {#def-crystallinity}
半晶聚合物的**质量分数结晶度**由其熔融焓估算，
$$
X_\mathrm{c} = \frac{\Delta H_\mathrm{m} - \Delta H_\mathrm{cc}}{\Delta H_\mathrm{m}^\circ},
$$
其中 $\Delta H_\mathrm{m}$ 为实测的熔融吸热比焓，$\Delta H_\mathrm{cc}$ 为同一扫描中冷结晶放热的比焓（那是扫描过程中生成、样品里原本并不存在的结晶），$\Delta H_\mathrm{m}^\circ$ 为假想 100% 结晶样品的比熔融焓，由外推得到。聚乙烯约 $293\ \mathrm{J\,g^{-1}}$，PET 约 $140\ \mathrm{J\,g^{-1}}$，等规聚丙烯约 $207\ \mathrm{J\,g^{-1}}$（不同来源的数值有百分之几的差异）。
:::

**热重分析（TGA）**记录质量对温度的变化，气氛为氮气或空气。它给出分解起始温度、挥发物（水分、残留溶剂）含量、高温下剩余的无机填料或灰分，对能解聚的聚合物还给出单体的阶梯式损失。**动态力学分析（DMA）**是对 $T_\mathrm{g}$ 最灵敏的探针，归入[[polymer-chemistry/polymer-properties]]的力学性质。

::: example PET 瓶样品的结晶度 {#ex-dsc}
从 PET 瓶坯上剪下的样品以 $10\ \mathrm{K\,min^{-1}}$ 加热。DSC 曲线显示 $76\ ^\circ\mathrm{C}$ 处的玻璃化转变台阶、$130\ ^\circ\mathrm{C}$ 附近 $25\ \mathrm{J\,g^{-1}}$ 的冷结晶放热峰，以及 $250\ ^\circ\mathrm{C}$ 附近峰值、面积 $52\ \mathrm{J\,g^{-1}}$ 的熔融吸热峰。取 $\Delta H_\mathrm{m}^\circ = 140\ \mathrm{J\,g^{-1}}$，扫描之前样品的结晶度是多少？粗心的分析会报告什么？
::: solution
冷结晶放热说明晶体是在扫描*过程中*形成的：$T_\mathrm{g}$ 之上运动能力恢复的非晶链发生了重排。这些晶体随后与原有晶体一起在吸热峰中熔化。因此原来的结晶度为
$$
X_\mathrm{c} = \frac{52 - 25}{140} = 0.19,
$$
约 19%。忽略放热峰则得 $52/140 = 0.37$，是真实值的两倍。瓶坯是有意淬冷以保持非晶、透明的，随后在拉吹成瓶时应变诱导结晶才发展起来。初始结晶度低正是设计的结果。$76\ ^\circ\mathrm{C}$ 处的台阶接近非晶 PET 教科书上的 $T_\mathrm{g}$，证实起始材料基本是非晶的。
:::
:::

::: quiz
一份支化聚乙烯样品先用线性聚乙烯标准物质校准的常规 SEC 分析，再配在线多角度光散射检测器的 SEC 单独分析。两次 $\bar{M}_\mathrm{w}$ 结果如何比较？
- [ ] 两者一致，因为 SEC 按质量分离。
- [x] 常规校准给出较低的数值，因为支化链比同质量的线型链更紧密、淋洗得更晚。
- [ ] 常规校准给出较高的数值，因为支化增大流体力学体积。
- [ ] 光散射结果较低，因为光散射测的是 $\bar{M}_\mathrm{n}$。
::: solution
SEC 按流体力学体积分离，不按质量。质量相同时，支化分子的 $R_\mathrm{g}$ 与水力学半径都比线型分子小，因而在更大的淋洗体积处流出，而线型校准在那里指定了更小的 $M$。在线光散射检测器对每个切分绝对测出 $M$（[[#prop-zimm]]），给出真实的、更高的数值。两者之比，或同质量下 $[\eta]$ 之比（收缩因子 $g'$），是长链支化的标准度量。光散射给的是 $\bar{M}_\mathrm{w}$，不是 $\bar{M}_\mathrm{n}$。
:::
:::

::: history
van 't Hoff（Jacobus van 't Hoff）的渗透压定律（1887）加上维里修正后，成为大分子摩尔质量的第一个绝对方法。1920 年代对橡胶和纤维素的渗透压测量，是 Staudinger 大分子假说的证据之一。Staudinger（Hermann Staudinger）1930 年提出聚合物溶液的黏度正比于摩尔质量。幂律形式 $[\eta] = KM^a$ 出自 Mark（Herman Mark，1938）与 Houwink（Roelof Houwink，1940），Sakurada（Ichiro Sakurada）的工作与之独立。Debye（Peter Debye）二战期间在合成橡胶的研制中发展了用于聚合物摩尔质量的光散射（*Journal of Applied Physics* 15, 338, 1944），Zimm（Bruno Zimm）1948 年提出了双外推法。Dow 化学公司的 Moore（John C. Moore）1964 年报道了用交联聚苯乙烯凝胶的凝胶渗透色谱；Grubisic（Zbigniew Grubisic）、Rempp（Paul Rempp）与 Benoit（Henri Benoit）1967 年报道了普适校准。MALDI 由 Karas（Michael Karas）与 Hillenkamp（Franz Hillenkamp）于 1985–88 年提出；Tanaka（Koichi Tanaka）相关的蛋白质激光解吸工作（1988）为他赢得 2002 年诺贝尔化学奖的一席。今天通用的 DSC 是 1964 年 Perkin-Elmer 公司的 Watson（E. S. Watson）与 O'Neill（M. J. O'Neill）推出的商品化仪器。
:::

## 后续内容

这里测得的平均值与分布，检验着[[polymer-chemistry/step-growth]]、[[polymer-chemistry/radical-polymerisation]]与[[polymer-chemistry/controlled-polymerisation]]的动力学预言。Flory 缩聚物应给出 $Đ \approx 2$，活性聚合物 $Đ$ 应接近 1。DSC 测得的热转变与它给出的结晶度，在[[polymer-chemistry/polymer-properties]]中得到解释，那章还把动态力学分析与流变学加入工具箱。通用技术（色谱、NMR、IR、质谱与热分析）在[[analytical-chemistry]]与[[spectroscopy]]中讲解，校准曲线的统计处理在 Maths Atlas（[/learn/maths/](/learn/maths/)）中涉及。

::: summary
- 每种方法测一个特定的平均值。依数性方法与端基计数的是链（$\bar{M}_\mathrm{n}$），光散射按质量加权（$\bar{M}_\mathrm{w}$，$R_\mathrm{g}$ 为 z 均），黏度法给出介于两者之间的 $\bar{M}_\mathrm{v}$。
- 渗透压法：$\Pi/c = RT(1/\bar{M}_\mathrm{n} + A_2c + \dots)$。外推到 $c = 0$，斜率给出溶剂优劣。实用范围约 $2\times10^{4}$ 到 $10^{6}$。
- 光散射：$Kc/R_\theta = (1 + q^2R_\mathrm{g}^2/3)/\bar{M}_\mathrm{w} + 2A_2c$，用 Zimm 双外推。方法是绝对的，但需要准确的 $\mathrm{d}n/\mathrm{d}c$ 和洁净的溶液。
- 黏度法：$[\eta] = \lim\eta_\text{sp}/c$（Huggins 与 Kraemer 外推）与 $[\eta] = KM^a$（$\Theta$ 下 $a = 0.5$，良溶剂 0.6–0.8），经 Flory–Fox 的 $[\eta] = \Phi\langle R^2\rangle^{3/2}/M$ 与线团尺寸相联系。
- SEC 按流体力学体积分离。切分分析给出完整分布，但除非用普适校准（$[\eta]M$ 恒定）或在线光散射，结果都是相对标准物质的。
- MALDI 能分辨窄分布短聚合物的单链与端基。NMR 给出组成、立构规整度与端基。
- DSC 给出 $T_\mathrm{g}$（台阶）、$T_\mathrm{m}$（吸热峰）与结晶度 $X_\mathrm{c} = (\Delta H_\mathrm{m} - \Delta H_\mathrm{cc})/\Delta H_\mathrm{m}^\circ$。TGA 给出热稳定性、挥发分与填料含量。
:::

## 习题

::: exercise 聚乙烯的结晶度 {level=1 check="0.700"}
某聚乙烯样品显示 $205\ \mathrm{J\,g^{-1}}$ 的熔融吸热峰，没有冷结晶。取 $\Delta H_\mathrm{m}^\circ = 293\ \mathrm{J\,g^{-1}}$，它的质量分数结晶度是多少？（以小数输入 $X_\mathrm{c}$，保留三位有效数字。）
::: solution
$X_\mathrm{c} = 205/293 = 0.700$，约 70%，是高密度聚乙烯的典型值。带短支链的低密度聚乙烯可能给 $100$–$140\ \mathrm{J\,g^{-1}}$，即 35–50%。
:::
:::

::: exercise 由特性黏数求摩尔质量 {level=1 check="142000"}
$25\ ^\circ\mathrm{C}$ 甲苯中的聚苯乙烯 $[\eta] = 55\ \mathrm{cm^3\,g^{-1}}$。取 $K = 7.5\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$、$a = 0.75$，求 $\bar{M}_\mathrm{v}$。（以 $\mathrm{g\,mol^{-1}}$ 输入 $\bar{M}_\mathrm{v}$，保留三位有效数字。）
::: solution
$\bar{M}_\mathrm{v} = (55/7.5\times10^{-3})^{1/0.75} = (7333)^{1.333} = 1.42\times10^{5}\ \mathrm{g\,mol^{-1}}$。
:::
:::

::: exercise 渗透压有多大？ {level=1 check="248"}
估算 $298.15\ \mathrm{K}$ 下含 $5.0\ \mathrm{mg\,cm^{-3}}$ 聚合物的溶液的渗透压，该聚合物 $\bar{M}_\mathrm{n} = 5.0\times10^{4}\ \mathrm{g\,mol^{-1}}$，忽略维里项。（以 Pa 输入 $\Pi$，保留三位有效数字。）
::: solution
$c = 5.0\ \mathrm{mg\,cm^{-3}} = 5.0\ \mathrm{kg\,m^{-3}}$。$\Pi = cRT/\bar{M}_\mathrm{n} = (5.0\ \mathrm{kg\,m^{-3}})(2478.8\ \mathrm{J\,mol^{-1}})/(50\ \mathrm{kg\,mol^{-1}}) = 248\ \mathrm{Pa}$，约等于 3 cm 有机溶剂柱。可测，但对温度与膜的平衡必须十分小心。
:::
:::

::: exercise 由 Zimm 图求回转半径 {level=2 check="30"}
外推到零浓度时，Zimm 图角度线的斜率（对 $q^2$）除以截距等于 $300\ \mathrm{nm^2}$。$R_\mathrm{g}$ 是多少？（以 nm 输入 $R_\mathrm{g}$。）
::: solution
$c = 0$ 时 $Kc/R_\theta = (1/\bar{M}_\mathrm{w})(1 + q^2R_\mathrm{g}^2/3)$，所以斜率/截距 $= R_\mathrm{g}^2/3 = 300\ \mathrm{nm^2}$。于是 $R_\mathrm{g}^2 = 900\ \mathrm{nm^2}$，$R_\mathrm{g} = 30\ \mathrm{nm}$。这是一个 z 均。
:::
:::

::: exercise 普适校准 {level=2 check="218000"}
用[[#ex-sec]]的 Mark–Houwink 常数，求与 $M = 2.00\times10^{5}\ \mathrm{g\,mol^{-1}}$ 的聚苯乙烯标准物质在同一淋洗体积流出的 PMMA 的摩尔质量。（以 $\mathrm{g\,mol^{-1}}$ 输入 $M$，保留三位有效数字。）
::: solution
$\log M_2 = (1/1.719)\log(1.14\times10^{-2}/9.44\times10^{-3}) + (1.716/1.719)\log(2.00\times10^{5}) = 0.0476 + 0.99825\times5.30103 = 5.3394$，所以 $M_2 = 2.18\times10^{5}\ \mathrm{g\,mol^{-1}}$。修正又是约 9%。
:::
:::

::: exercise 由 SEC 切分数据求平均值 {level=2 check="1.35"}
用[[#ex-sec]](b) 的切分数据验证 $\bar{M}_\mathrm{n}$ 与 $\bar{M}_\mathrm{w}$，并给出分散度。然后像丢失在基线里那样去掉最高的切分（$2.0\times10^{5}$，$w = 0.05$），重新归一化并重算 $\bar{M}_\mathrm{w}$。（以三位有效数字输入原来的 $Đ$。）
::: solution
原始：$\bar{M}_\mathrm{n} = 1/(0.19833\times10^{-4}) = 5.04\times10^{4}$，$\bar{M}_\mathrm{w} = 6.80\times10^{4}$，所以 $Đ = 1.35$。去掉顶部切分后：质量分数之和为 $0.95$，$\sum w_iM_i = 5.80\times10^{4}$，所以 $\bar{M}_\mathrm{w} = 5.80/0.95\times10^{4} = 6.11\times10^{4}$，下降 10%。$\sum w_i/M_i = 0.19583\times10^{-4}$，所以 $\bar{M}_\mathrm{n} = 0.95/0.19583\times10^{-4} = 4.85\times10^{4}$，只下降 4%。高分子量端的基线误差打击 $\bar{M}_\mathrm{w}$ 最狠。
:::
:::

::: exercise 由特性黏数求线团尺寸 {level=3 check="19.9"}
$\Theta$ 下环己烷中的聚苯乙烯服从 $[\eta]_\Theta = 0.082\,M^{1/2}\ \mathrm{cm^3\,g^{-1}}$。对 $M = 5.0\times10^{5}\ \mathrm{g\,mol^{-1}}$，用 $\Phi = 2.5\times10^{23}\ \mathrm{mol^{-1}}$ 的 Flory–Fox 方程求 $\langle R^2\rangle_0^{1/2}$ 与 $R_\mathrm{g}$，并与光散射的 $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$ 比较。（以 nm 输入 $R_\mathrm{g}$，保留三位有效数字。）
::: solution
$[\eta] = 0.082\times707.1 = 58.0\ \mathrm{cm^3\,g^{-1}}$。由[[#eq-flory-fox]]，$\langle R^2\rangle^{3/2} = [\eta]M/\Phi = 58.0\times5.0\times10^{5}/2.5\times10^{23} = 1.16\times10^{-16}\ \mathrm{cm^3}$，所以 $\langle R^2\rangle^{1/2} = 4.88\times10^{-6}\ \mathrm{cm} = 48.8\ \mathrm{nm}$，$R_\mathrm{g} = 48.8/\sqrt6 = 19.9\ \mathrm{nm}$。光散射给出 $0.0275\times707.1 = 19.4\ \mathrm{nm}$。3% 的一致已好到 $\Phi$ 的不确定度所允许的程度。两次物理内涵完全不同的测量——流动与散射——看到的是同一个线团。
:::
:::

::: exercise 一次渗透压分析 {level=3 check="150000"}
用渗透压图中五个数据点（$c$ = 2、4、6、8、10 $\mathrm{mg\,cm^{-3}}$；$\Pi/c$ = 1.883、2.086、2.329、2.558、2.757，以 $10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$ 计），作最小二乘拟合，在 $298.15\ \mathrm{K}$ 下求 $\bar{M}_\mathrm{n}$ 与 $A_2$。再估计若截距的不确定度为 $\pm0.03\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$，$\bar{M}_\mathrm{n}$ 的不确定度有多大。（以 $\mathrm{g\,mol^{-1}}$ 输入 $\bar{M}_\mathrm{n}$，保留两位有效数字。）
::: hint
$\bar{x} = 6$，$\sum(x - \bar{x})^2 = 40$。计算 $\sum(x-\bar{x})(y-\bar{y})$。
:::
::: solution
$\bar{y} = 2.3226$。偏差 $x - \bar{x}$ 为 $-4, -2, 0, 2, 4$，所以 $\sum(x-\bar{x})(y-\bar{y}) = -4(1.883) - 2(2.086) + 2(2.558) + 4(2.757) = 4.44$，斜率为 $4.44/40 = 0.111$（每 $\mathrm{mg\,cm^{-3}}$）。截距为 $2.3226 - 0.111\times6 = 1.6566$。换算单位后截距为 $1.657\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$，斜率为 $0.111\times10^{4}$（每 $10^{-3}\ \mathrm{g\,cm^{-3}}$），即 $1.11\times10^{6}\ \mathrm{Pa\,cm^6\,g^{-2}}$。于是 $\bar{M}_\mathrm{n} = 2.4788\times10^{9}/1.657\times10^{4} = 1.5\times10^{5}\ \mathrm{g\,mol^{-1}}$，$A_2 = 1.11\times10^{6}/2.4788\times10^{9} = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$。截距 $1.66$ 的不确定度 $\pm0.03$ 即 $\pm1.8\%$，所以 $\bar{M}_\mathrm{n} = (1.50 \pm 0.03)\times10^{5}$。$\bar{M}_\mathrm{n}$ 的全部误差都来自外推，这就是诚实地只报两位有效数字的原因。
:::
:::
