碰撞理论给了动力学那个指数因子：速率常数等于碰撞频率乘一个玻尔兹曼分数，而其余一切——取向、结构、反应物全部的分子个性——都被扫进一个无法解释的位阻因子 $P$，它对 $\mathrm{H_2 + C_2H_4}$ 低到 $10^{-11}$，对 $\mathrm{K + CH_3I}$ 这类反应却又*大于* 1（[[kinetics/collision-theory]]）。一个自由参数横跨十二个数量级的理论是记账工具，不是解释。取而代之的理论由亨利·艾林（Henry Eyring）与曼彻斯特的迈克尔·埃文斯（Michael Evans）、迈克尔·波兰尼（Michael Polanyi）在 1935 年几乎同时提出，它问的是一个不同的问题。它不去数碰撞再为结构求情，而是假设反应物与一种特殊构型——**活化络合物**——处于*平衡*，从而把化学平衡（[[general-chemistry-2/chemical-equilibrium]]）与吉布斯自由能（[[general-chemistry-2/entropy-free-energy]]）的全套装置借来，用可以*测量*的热力学量——活化焓与活化熵——预测速率常数。其结果即**艾林方程**，是现代物理有机、无机与酶动力学的工作语言；它定义的量 $\Delta^\ddagger H$ 与 $\Delta^\ddagger S$ 每年出现在数千篇论文中，而它解释的同位素效应则是化学家判断决速步中哪些键断裂的最可靠证据。

## 势能面与反应坐标

::: definition 势能面与反应坐标 {#def-pes}
在玻恩-奥本海默近似下，电子瞬时地适应原子核的位置，于是 $N$ 个原子的体系的能量是 $3N - 6$ 个内坐标（直线分子为 $3N-5$ 个）的函数 $V$：即**势能面**（PES）。稳定分子坐落在这张面的谷底；反应是从一个谷（反应物）到另一个谷（产物）的旅程。**反应坐标**是穿过鞍口连接两谷的最陡下降路径——**最小能量路径**——而沿它走过的距离就是参数化这段旅程的坐标 $s$。
:::

对三原子反应 $\mathrm{A + BC \rightarrow AB + C}$，这张面只有两维（伸缩 $r_\mathrm{AB}$ 与伸缩 $r_\mathrm{BC}$，键角固定），可以画成一幅地形图。反应物与产物是极小值；两者之间横着一道鞍口。支配下面一切内容的数学事实，就是这个鞍口是哪种类型的点。

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
tangent: 0, 0
caption: 一切过渡态的原型：鞍面 $V = x^{2} - y^{2}$。在原点处面沿两个方向都是平的（切平面水平），可原点既不是极小值也不是极大值——沿 $x$ 走能量下降，沿 $y$ 走能量上升。沿 $x$ 的反应谷与产物谷之间隔着鞍口的*最低*点，即原点：过渡态。等高线图显示了它的签名——每个极小值周围是嵌套的闭合等高线，而穿过鞍点的是双曲线。
:::

::: definition 过渡态与活化络合物 {#def-ts}
**过渡态**（TS）是体系处于最小能量路径垒顶的构型：数学上即 PES 的*一阶鞍点*——沿恰好一个方向（反应坐标）取极大、沿其余全部 $3N - 7$ 个方向取极小。**活化络合物**是过渡态邻域内构型的集合，即占据鞍口的物种；双十字符号 $^{\ddagger}$ 标记它：$\mathrm{A + B \rightleftharpoons [AB]^{\ddagger} \rightarrow P}$。严格地说，过渡态是唯一的鞍点几何构型，活化络合物是它周围的区域。实践中这一区别常被尊重，但更多时候被忽略。
:::

由于过渡态沿一个坐标取极大、沿其余坐标取极小，它的振动分析中有一个频率取*虚*值——沿 $s$ 的曲率为负——以及 $3N - 7$ 个普通频率。虚频率不是谜：它是"体系沿 $s$ 被位移后向两侧加速逃离"这一事实的数学表述。仅此一条就把过渡态与化学家能装进瓶子的所有物种区分开来。

::: proposition 鞍点与分割面的选取 {#prop-saddle}
速率常数度量的是反应体系穿过**分割面**（分隔反应物与产物的面）的通量。过渡态理论把该面放在鞍点处、垂直于反应坐标，因为那里沿 $s$ 的平均力为零：换在任何其他位置，已穿过面的体系都会被一个系统性力拉回反应物一侧再次穿过，而每一次这样的**再穿越**都使朴素通量高估真实速率。在鞍点处、面取垂直于 $s$，再穿越最少；而"零再穿越"的理想化正定义了下一节的透射系数 $\kappa \le 1$。
:::

鞍点的几何也决定了活化络合物的*形状*。对 $\mathrm{H + H_2}$，鞍点是对称的直线型 $\mathrm{H\cdots H\cdots H}$；对 $\mathrm{S_N2}$ 反应，是带部分键的三角双锥形 $\mathrm{Nu\cdots C\cdots LG}$；对狄尔斯-阿尔德反应，是正在成环的两条部分 $\mathrm{C\cdots C}$ 键，长约 $0.2\ \mathrm{nm}$，而非完整单键的 $0.154\ \mathrm{nm}$。过渡态几何如今由电子结构方法常规计算，而虚频率正是检验所算鞍点是否正确的凭据。

::: warning 过渡态不是中间体 {#warn-not-intermediate}
中间体是 PES 上的极小值：它有有限寿命、有一道逃逸所需的小而真实的势垒、有普通的振动频率——碳正离子、四面体加成中间体、酶-底物复合物都是。过渡态是鞍点：除了穿越鞍口所需的约 $10^{-13}\ \mathrm{s}$ 之外它*没有*寿命，不能被俘获、冷却或观测，且带一个虚频率。是两个中间体*之间*的山口，不是中间体本身。不严谨的写法把活化络合物称作"坐在垒顶、处于平衡中的即将反应的分子"——要记住艾林方程里的平衡是一个转瞬即逝区域的准平衡假设，不是可分离物种的平衡。数字上也有一个相关的陷阱：溶液中反应的活化熵若比 $-200\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 还负，几乎总是意味着标准态伪影、聚集步骤或机理改变——而不是真正"紧密"的过渡态。
:::

## 艾林方程

艾林的图像用"与活化络合物平衡，随后以一个普适的尝试频率越过山口"取代"具有足够能量的碰撞"。起作用的有两个假设：反应物与位于分割层内的活化络合物之间的**准平衡**，由平衡常数 $K^\ddagger$ 支配；以及络合物沿 $s$ 穿过该层的**自由运动**，不发生再穿越（一切再穿越都被扫进 $\kappa$）。

::: theorem 艾林方程 {#thm-eyring}
对基元步 $\mathrm{R} \rightarrow$ 产物，活化络合物为 $[\mathrm{R}]^{\ddagger}$、透射系数为 $\kappa$，则
$$
k = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger ,
$$
其中 $K^\ddagger$ 是反应物与活化络合物之间、去除了沿 $s$ 的运动之后的平衡常数，对选定的标准态而写。标准态必须与速率方程匹配：对**单分子**步（一级 $k$，单位 $\mathrm{s^{-1}}$）$K^\ddagger$ 本身无量纲；对溶液中的**双分子**步（二级 $k_2$），络合物比反应物多凝聚掉一个分子，故
$$
k_2 = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger\,(c^\circ)^{-1},
\qquad c^\circ = 1\ \mathrm{mol\,dm^{-3}},
$$
使 $k_2$ 以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 计；对气相双分子步，相应的因子是单位体积的 $k_\mathrm{B}T/p^\circ$，$p^\circ = 1\ \mathrm{bar}$。因子 $k_\mathrm{B}T/h$ 是普适频率：$\mathrm{298\ K}$ 下为 $6.2\times10^{12}\ \mathrm{s^{-1}}$。
:::

::: proof $k_\mathrm{B}T/h$ 的推导 {#proof-eyring}
把分割面放在 $s = 0$，考察紧靠其外的薄层 $0 \le s \le \delta$。由准平衡，络合物在该层内任意位置的浓度等于 $K^\ddagger[\mathrm{R}]$ 乘以络合物在长度 $\delta$ 上、态计数中包含沿 $s$ 动量的自由平动配分函数——即一维平动配分函数 $z_s = \delta\,(2\pi m k_\mathrm{B}T)^{1/2}/h$：
$$
[\mathrm{TS}]_\text{层} = K^\ddagger[\mathrm{R}]\,\frac{\delta\,(2\pi m k_\mathrm{B}T)^{1/2}}{h}.
$$
层内沿 $s$ 速率为 $v$ 的络合物在时间 $\delta/v$ 内穿过外缘；对*正向*速率按半麦克斯韦分布平均得 $\langle v \rangle_+ = (k_\mathrm{B}T/2\pi m)^{1/2}$。产物生成速率等于层内粒子数乘以这个尝试频率 $\langle v \rangle_+/\delta$：
$$
v = [\mathrm{TS}]_\text{层}\,\frac{\langle v \rangle_+}{\delta}
= K^\ddagger[\mathrm{R}]\,\frac{\delta\,(2\pi m k_\mathrm{B}T)^{1/2}}{h}\cdot\frac{1}{\delta}\left(\frac{k_\mathrm{B}T}{2\pi m}\right)^{1/2}.
$$
层厚 $\delta$ 消掉了——速率不可能依赖一个任意的几何选择——而两个平方根之积为 $(2\pi m k_\mathrm{B}T \cdot k_\mathrm{B}T/2\pi m)^{1/2} = k_\mathrm{B}T$，于是剩下
$$
v = \frac{k_\mathrm{B}T}{h}\,K^\ddagger[\mathrm{R}]
\qquad\Longrightarrow\qquad
k = \frac{v}{[\mathrm{R}]} = \kappa\,\frac{k_\mathrm{B}T}{h}\,K^\ddagger,
$$
其中 $\kappa \le 1$ 已被恢复，用来补偿理想分割面放行的那些再穿越。质量 $m$ 也消掉了：尝试频率对所有反应都相同，因为较重的络合物平动态更多（$z_s \propto m^{1/2}$）但运动更慢（$\langle v\rangle_+ \propto m^{-1/2}$），两种效应恰好抵消。
:::

把 $K^\ddagger = e^{-\Delta^\ddagger G^\circ/RT}$ 与 $\Delta^\ddagger G^\circ = \Delta^\ddagger H^\circ - T\Delta^\ddagger S^\circ$ 合并，就把该定理化为它的工作形式：对溶液中分子数为 $n$ 的一步，

$$
k_n = \kappa\,\frac{k_\mathrm{B}T}{h}\,(c^\circ)^{1-n}\,
e^{\Delta^\ddagger S^\circ/R}\,e^{-\Delta^\ddagger H^\circ/RT}.
$$ {#eq-thermo}

这就是本课每个数字汇入的方程：$\Delta^\ddagger H$ 扮演能垒的角色（是焓不是能——差别是每失去一个分子 $RT$，下面将推导），$\Delta^\ddagger S$ 扮演位阻因子的角色（熵是排布数的对数，$e^{\Delta^\ddagger S/\mathrm{R}}$ 取代了 $P$），而 $k_\mathrm{B}T/h$ 取代了碰撞频率。

::: proposition 艾林图 {#prop-eyring-plot}
对方程 [[#eq-thermo]] 取 $k/T$ 的对数，并设在所研究温区内 $\Delta^\ddagger H$ 与 $\Delta^\ddagger S$ 不依赖 $T$，
$$
\ln\frac{k}{T} = \ln\!\left(\kappa\frac{k_\mathrm{B}}{h}\right) + \frac{\Delta^\ddagger S^\circ}{R} + (1-n)\ln c^\circ - \frac{\Delta^\ddagger H^\circ}{R}\cdot\frac{1}{T}.
$$
$\ln(k/T)$ 对 $1/T$ 的图（**艾林图**）是一条斜率为 $-\Delta^\ddagger H^\circ/R$、截距为 $\ln(\kappa k_\mathrm{B}/h) + \Delta^\ddagger S^\circ/R$ 的直线（以 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ 作数值标准态时，$c^\circ$ 只贡献它的单位）。相对阿伦尼乌斯的 $\ln k$ 图多出的 $-\ln T$ 把数据中 $k_\mathrm{B}T/h$ 这个含 $T$ 的一次因子剥掉，于是斜率直接度量 $\Delta^\ddagger H$ 而不是 $E_\mathrm{a}$；两种图实际只差百分之几，但斜率的*解释*不同。
:::

::: widget plot
f: 23.76 + ds/8.314 - dh*x/8.314
x: 2, 4
y: -70, 30
sliders: dh=62:20:120:2; ds=-150:-250:50:10
labels: \text{艾林图：} \ln(k/T)
caption: 方程 [[#eq-thermo]] 在 $\kappa = 1$ 时的艾林图：$\ln\!\big(k/T\,\big)$（单分子步以 $\mathrm{s^{-1}K^{-1}}$ 计）对 $x = 1000/T$（单位 $\mathrm{K^{-1}}$），活化焓 `dh` 以 $\mathrm{kJ\,mol^{-1}}$、活化熵 `ds` 以 $\mathrm{J\,K^{-1}\,mol^{-1}}$ 由滑块设定；常数 $23.76$ 即 $\ln(k_\mathrm{B}/h)$。斜率为 $-\Delta^\ddagger H/R$：把 `dh` 从 20 滑到 $120\ \mathrm{kJ\,mol^{-1}}$，看直线如何转动——能垒控制*斜率*。滑动 `ds`，直线上下平移——熵控制*截距*，把速率乘以 $e^{\Delta^\ddagger S/R}$ 而不改变其温度依赖。
:::

::: example 由五个速率常数作艾林图 {#ex-eyring-plot}
某溶液反应在五个温度下测得二级速率常数：

| $T/\mathrm{K}$ | 280 | 290 | 300 | 310 | 320 |
|---|---|---|---|---|---|
| $k\ /\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ | $2.3\times10^{-7}$ | $6.0\times10^{-7}$ | $1.5\times10^{-6}$ | $3.4\times10^{-6}$ | $7.4\times10^{-6}$ |

提取 $\Delta^\ddagger H$ 与 $\Delta^\ddagger S$（取 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$，$\kappa = 1$）。
::: solution
对每一点算出 $\ln(k/T)$；例如 $T = 300\ \mathrm{K}$ 时，$\ln(1.5\times10^{-6}/300) = \ln(5.0\times10^{-9}) = -19.11$：

| $1000\ \mathrm{K}/T$ | 3.571 | 3.448 | 3.333 | 3.226 | 3.125 |
|---|---|---|---|---|---|
| $\ln(k/T)$ | $-20.92$ | $-20.00$ | $-19.11$ | $-18.33$ | $-17.58$ |

对五点作最小二乘直线，得斜率 $-7.48\times10^{3}\ \mathrm{K}$、截距 $5.81$。于是
$$
\Delta^\ddagger H = -\text{斜率}\times R = 7.48\times10^{3} \times 8.314 = 62.2\times10^{3}\ \mathrm{J\,mol^{-1}} = 62\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta^\ddagger S = (\text{截距} - \ln(k_\mathrm{B}/h))\,R = (5.81 - 23.76)\times 8.314 = -149\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
两个独立检验。由两端点的两点斜率 $(-17.58 + 20.92)/(3.125 - 3.571)\times10^{3} = -7.47\times10^{3}\ \mathrm{K}$，与拟合一致——各点是线性的，正如模型所要求。再代回 $300\ \mathrm{K}$：$k = (k_\mathrm{B}T/h)e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT} = 6.2\times10^{12}\times e^{-17.9}\times e^{-24.9} = 1.5\times10^{-6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，重现了表中数值。很大的负 $\Delta^\ddagger S$ 说明过渡态比分离的反应物有序得多——一个缔合的、双分子的、很可能是环状或生成离子对的步骤。
:::
:::

::: quiz
一位学生用 $k = (k_\mathrm{B}T/h)\,e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$，由 $\Delta^\ddagger H = 45\ \mathrm{kJ\,mol^{-1}}$ 与 $\Delta^\ddagger S = -80\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 在 $\mathrm{298\ K}$ 下计算双分子速率常数，报告 $k = 1.1\times10^{5}\ \mathrm{s^{-1}}$。哪里错了？
- [x] 缺了双分子艾林方程的 $(c^\circ)^{-1}$ 因子：对 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ 数值是对的，但答案必须是 $1.1\times10^{5}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，二级常数绝不可能以 $\mathrm{s^{-1}}$ 计。
- [ ] 没有错；二级常数按惯例以 $\mathrm{s^{-1}}$ 报告。
- [ ] $\Delta^\ddagger H$ 的指数里应当用 $E_\mathrm{a}$，这会改变数值。
- [ ] 因子 $k_\mathrm{B}T/h$ 只用于隧穿校正，不用于指前因子。
::: solution
数值 $1.1\times10^{5}$ 正是方程 [[#eq-thermo]] 在 $n = 2$、$c^\circ = 1\ \mathrm{mol\,dm^{-3}}$ 下给出的结果——但标准态因子数值为一*而量纲上不可或缺*：$(c^\circ)^{1-2} = (1\ \mathrm{mol\,dm^{-3}})^{-1}$ 提供了速率方程要求的 $\mathrm{dm^{3}\,mol^{-1}}$。丢掉它是使用艾林方程最常见的错误，而一次量纲检验就能立刻抓住它：以 $\mathrm{s^{-1}}$ 计的二级常数毫无意义。
:::
:::

::: warning 标准态，以及 $\Delta^\ddagger S$ 不是什么 {#warn-standard-state}
$\Delta^\ddagger S$ 是一个*相对*量：它依赖所选标准态，气相数据表用 $p^\circ = 1\ \mathrm{bar}$，溶液数据表用 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$，两者在 $\mathrm{298\ K}$ 下每失去一个分子相差 $R\ln(RTc^\circ/p^\circ) = 26.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$（即每摩尔创造 $24.8\ \mathrm{dm^{3}}$ 理想气体的熵）。不换算就绝不能把气相 $\Delta^\ddagger S$ 与溶液值相比。其次，$\Delta^\ddagger S$ 不是通俗意义的"无序度"：它数的是*速率方程能看见的那种排布*。三步反应看起来熵上灾难性地不利（$-200$ 到 $-300\ \mathrm{J\,K^{-1}\,mol^{-1}}$），因为失去了三个独立平动；单分子解离看起来有利，因为得到了一个。而溶液中低于约 $-200\ \mathrm{J\,K^{-1}\,mol^{-1}}$ 的值，应当先让你怀疑机理（聚集、决速步改变、标准态弄错），再去相信"过度有序的过渡态"这个故事。
:::

## $\Delta^\ddagger S$ 的含义：以水交换反应为检验

活化熵是过渡态区域与反应物之间的熵差，所以它的*符号*读出机理：**缔合**步（两个物种变成一个，或成环）付出 $-80$ 到 $-160\ \mathrm{J\,K^{-1}\,mol^{-1}}$；**解离**步（一个变两个，或断键而别无所求）得到 $+50$ 到 $+120\ \mathrm{J\,K^{-1}\,mol^{-1}}$；只在碰撞络合物内转移一个质子或电子的步骤则接近零。丁二烯与乙烯的狄尔斯-阿尔德反应把两个分子焊成一个环状过渡态，气相 $\Delta^\ddagger S \approx -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$——缔合的经典指纹；而 $\mathrm{S_N1}$ 电离的决速步是 $\mathrm{C{-}Cl}$ 断键、无进攻伙伴，尽管新生离子使溶剂电致收缩，其 $\Delta^\ddagger S$ 仍为*正*，达几十 $\mathrm{J\,K^{-1}\,mol^{-1}}$。

::: example $\mathrm{Fe^{2+}(aq)}$ 上的水交换：提取 $\Delta^\ddagger S$ {#ex-water-exchange}
六水合铁(II)离子的水交换 $\mathrm{[Fe(H_2O)_6]^{2+} + H_2O^* \rightarrow [Fe(H_2O)_5(H_2O^*)]^{2+} + H_2O}$ 在 $\mathrm{298.15\ K}$ 下 $k = 1.6\times10^{6}\ \mathrm{s^{-1}}$，$\Delta^\ddagger H = 43.7\ \mathrm{kJ\,mol^{-1}}$（由艾林图斜率得出；高压核磁共振的标准数据）。求 $\Delta^\ddagger S$ 并解释其符号。
::: solution
对 $n = 1$ 重排方程 [[#eq-thermo]]（进入的水是溶剂，其浓度折进 $k$）：
$$
\Delta^\ddagger S = R\left[\ln\frac{k}{k_\mathrm{B}T/h} + \frac{\Delta^\ddagger H}{RT}\right]
= 8.314\left[\ln\frac{1.6\times10^{6}}{6.21\times10^{12}} + \frac{43\,700}{8.314\times298.15}\right].
$$
两项分别为：$\ln(2.58\times10^{-7}) = -15.17$ 与 $43\,700/2478.8 = 17.63$。故
$$
\Delta^\ddagger S = 8.314 \times (17.63 - 15.17) = 8.314 \times 2.46 = +20\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
一个形式上加上配体的交换却有*正*的活化熵：过渡态*失去*了约束而非增加。一个水分子在新水分子完全到达之前就已经离去——解离型交换（$\mathrm{I_d}$）机理，断键在山口占主导。同电子构型的 $\mathrm{[Ti(H_2O)_6]^{3+}}$ 给出镜像：$\Delta^\ddagger S \approx -20\ \mathrm{J\,K^{-1}\,mol^{-1}}$，缔合型交换（$\mathrm{I_a}$）路径。这一对以及梅尔巴赫（Merbach）学派用高压核磁共振测得的成百上千个类似数据，正是 $\Delta^\ddagger S$（连同 $\Delta^\ddagger V$）成为金属中心取代反应机理仲裁者的原因。
:::
:::

## 与阿伦尼乌斯的关系：$E_\mathrm{a}$ 对 $\Delta^\ddagger H$

::: proposition $E_\mathrm{a} = \Delta^\ddagger H + RT$（单分子）、$+2RT$（气相双分子） {#prop-ea-dh}
对分子数为 $n$ 的气相基元步，阿伦尼乌斯活化能与活化焓的关系为
$$
E_\mathrm{a} = \Delta^\ddagger H + (2 - n)RT ,
$$
故单分子步 $E_\mathrm{a} = \Delta^\ddagger H + RT$，双分子步 $E_\mathrm{a} = \Delta^\ddagger H + 2RT$。溶液中 $pV$ 项可忽略（$\Delta^\ddagger H \approx \Delta^\ddagger U$），两种分子数下都有 $E_\mathrm{a} = \Delta^\ddagger H + RT$。$\mathrm{298\ K}$ 下 $RT = 2.48\ \mathrm{kJ\,mol^{-1}}$、$2RT = 5.0\ \mathrm{kJ\,mol^{-1}}$：这个区别虽小却不为零，而且是*系统性*的，不是随机误差。
:::

::: proof 由 $E_\mathrm{a}$ 的定义导出该关系 {#proof-ea-dh}
活化能定义为 $E_\mathrm{a} \equiv RT^{2}\,\mathrm{d}\ln k/\mathrm{d}T$。把艾林方程写成 $k = \kappa (k_\mathrm{B}T/h)\,K_\mathrm{c}^\ddagger$，其中 $K_\mathrm{c}^\ddagger$ 是以浓度为基准的平衡常数（单位已折入），取对数：$\ln k = \text{常数} + \ln T + \ln K_\mathrm{c}^\ddagger$。求导，并对浓度平衡常数用范特霍夫关系 $\mathrm{d}\ln K_\mathrm{c}^\ddagger/\mathrm{d}T = \Delta^\ddagger U/RT^{2}$（是热力学能而非焓，因为 $K_\mathrm{c}$ 定义在恒容下），
$$
E_\mathrm{a} = RT^{2}\left(\frac{1}{T} + \frac{\Delta^\ddagger U}{RT^{2}}\right) = RT + \Delta^\ddagger U .
$$
再换算成焓。对理想气体，$\Delta^\ddagger H = \Delta^\ddagger U + \Delta n^\ddagger RT$，单分子（一个分子生成一个络合物）$\Delta n^\ddagger = 0$，双分子（两个分子生成一个络合物）$\Delta n^\ddagger = -1$。代入 $\Delta^\ddagger U = \Delta^\ddagger H - \Delta n^\ddagger RT$：
$$
E_\mathrm{a} = \Delta^\ddagger H + (1 - \Delta n^\ddagger)RT
= \begin{cases} \Delta^\ddagger H + RT, & \text{单分子},\\ \Delta^\ddagger H + 2RT, & \text{气相双分子}. \end{cases}
$$
溶液中 $\Delta^\ddagger(pV) \approx 0$，故 $\Delta^\ddagger H \approx \Delta^\ddagger U$，无论分子数如何都有 $E_\mathrm{a} = \Delta^\ddagger H + RT$。物理图像：$E_\mathrm{a}$ 是 $\ln k$ 的斜率，度量的是*能量*垒加上每个活跃自由度 $RT$ 的热功；$\Delta^\ddagger H$ 还吸收了生成络合物的 $p\Delta V$，对气相缔合而言每消耗一对分子为 $-RT$。
:::

::: example 气相双分子反应的 $E_\mathrm{a}$、$\Delta^\ddagger H$ 与 $\Delta^\ddagger U$ {#ex-ea-gas}
某气相双分子反应在 $\mathrm{298.15\ K}$ 下 $E_\mathrm{a} = 10.0\ \mathrm{kJ\,mol^{-1}}$。求 $\Delta^\ddagger H$ 与 $\Delta^\ddagger U$，并问两种垒的约定在 $e^{-\Delta/RT}$ 中相差多少倍。
::: solution
由 $RT = 8.314 \times 298.15 = 2.479\ \mathrm{kJ\,mol^{-1}}$：
$$
\Delta^\ddagger H = E_\mathrm{a} - 2RT = 10.0 - 4.96 = 5.0\ \mathrm{kJ\,mol^{-1}},
\qquad
\Delta^\ddagger U = E_\mathrm{a} - RT = 10.0 - 2.48 = 7.5\ \mathrm{kJ\,mol^{-1}}.
$$
三个"垒"相差 $2.5$ 与 $5.0\ \mathrm{kJ\,mol^{-1}}$——由它们构造的任何玻尔兹曼因子分别差 $e^{1.0} = 2.7$ 倍与 $e^{2.0} = 7.4$ 倍。这就是论文里的"$\Delta^\ddagger H$"绝不加 $2RT$ 校正就绝不能贴进阿伦尼乌斯计算的原因：室温下这笔账值七倍。
:::
:::

## 隧穿效应与透射系数

::: definition 透射系数 {#def-kappa}
**透射系数** $\kappa$ 是到达分割面的活化络合物中完成反应而非折返反应物的比例。分割面放置完美的理想过渡态理论有 $\kappa = 1$；经典的再穿越使 $\kappa < 1$；而穿过势垒的量子隧穿使*有效* $\kappa$ 相对经典鞍点速率 $> 1$，因为络合物根本不必爬到垒顶。$\kappa$ 是过渡态理论诚实记下自己一切理想化之处。
:::

对一种模型势垒，隧穿几乎可以精确处理：把垒顶近似为*倒抛物线*，$V(s) = -\tfrac{1}{2}m|\omega^\ddagger|^{2}s^{2}$，其中虚频率 $\omega^\ddagger = 2\pi c\,|\tilde\nu^\ddagger|$ 度量垒的弯曲程度。倒谐振子的量子配分函数除以其经典极限给出抛物势垒的透射系数——维格纳（Wigner）1937 年隧穿分析的结果，处于从沃尔夫（Wolff，1912）经维格纳到克拉默斯（Kramers，1940）的越垒工作谱系之中：
$$
\kappa = \frac{u}{2\sin(u/2)}, \qquad u = \frac{h|\tilde\nu^\ddagger|}{k_\mathrm{B}T},
\qquad\text{高温极限为}\qquad
\kappa \approx 1 + \frac{u^{2}}{24}
$$
（对 $u < 2\pi$ 有效；超出后抛物模型失效，必须积分完整的 WKB 隧穿）。其信息是结构性的：$\kappa$ 随 $T$ 降低、随势垒变*窄*（$|\tilde\nu^\ddagger|$ 增大）而增大；而转移氢的 $\tilde\nu^\ddagger$ 为 $1000$–$2000\ \mathrm{cm^{-1}}$，重原子运动的只有 $100$–$300\ \mathrm{cm^{-1}}$，所以氢转移强烈隧穿，重原子转移基本不隧穿。隧穿主导的反应显示*弯曲的*、上凹的阿伦尼乌斯图，且对其能垒而言 $A$ 因子反常地小——$E_\mathrm{a}$ 与 $A$ 的经典解释一起失效。

::: example 抛物势垒的隧穿 {#ex-wigner}
某质子转移的虚频率 $|\tilde\nu^\ddagger| = 500\ \mathrm{cm^{-1}}$。在 $\mathrm{298.15\ K}$ 下分别用精确（抛物模型）与维格纳高温校正计算 $\kappa$。
::: solution
先算无量纲的垒弯曲度。用 $hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$，
$$
u = \frac{hc|\tilde\nu^\ddagger|}{k_\mathrm{B}T} = \frac{1.4388 \times 500}{298.15} = 2.413 .
$$
精确抛物势垒值：
$$
\kappa = \frac{u}{2\sin(u/2)} = \frac{2.413}{2\sin(1.207)} = \frac{2.413}{2 \times 0.9345} = 1.29 .
$$
维格纳校正：$\kappa \approx 1 + u^{2}/24 = 1 + 5.82/24 = 1.24$，与精确值相差 $4\,\%$ 以内——该展开对 $u \lesssim 2.5$ 是好的。在 $u = 2.41$ 处，势垒透过的通量比经典鞍点允许的多 $29\,\%$。对真实的氢转移，若 $|\tilde\nu^\ddagger| = 1500\ \mathrm{cm^{-1}}$、$\mathrm{250\ K}$，则 $u = 8.6$，抛物公式已越出自身适用域——诚实的表述是 $\kappa$ 为几且随 $T$ 下降而上升，这正是烯醇互变异构与 $\mathrm{OH + H_2}$ 反应等所测到的情形。
:::
:::

## 动力学同位素效应

::: definition 动力学同位素效应 {#def-kie}
**动力学同位素效应**（KIE）是把一个原子换成其同位素后速率常数的变化，惯例用氢对氘的 $k_\mathrm{H}/k_\mathrm{D}$。由于同位素的电子结构（到极高精度）相同、势能面相同，而质量不同、从而**零点能**（ZPE）不同，该效应直接探测该原子的键在过渡态中被拉伸或断裂到什么程度。**一级同位素效应**（室温 $k_\mathrm{H}/k_\mathrm{D} \approx 2$–$10$）标志 H/D 所连的键在决速过渡态中被生成或断裂；**二级同位素效应**（$1.1$–$1.5$）标志相邻的键在重新杂化。
:::

其起源是一行能量记账。$3000\ \mathrm{cm^{-1}}$ 的 $\mathrm{C{-}H}$ 伸缩与 $2100\ \mathrm{cm^{-1}}$ 的 $\mathrm{C{-}D}$ 伸缩，其零点能 $\tfrac{1}{2}h\nu$ 相差 $\tfrac{1}{2}hc(3000 - 2100)\ \mathrm{cm^{-1}}$；氘代分子相对其被零点能降低的基态*少*束缚那么多。若该键在过渡态中已*断裂*，伸缩对两种同位素都已消失、差异也随之消失——于是含氘反应必须多爬 $\tfrac{1}{2}hc\,\Delta\tilde\nu$ 的垒。

::: example $k_\mathrm{H}/k_\mathrm{D}$ 的半经典上限 {#ex-kie-zpe}
估计某反应在 $\mathrm{298.15\ K}$ 下的最大一级氘同位素效应，设 $\mathrm{C{-}H}$ 键在过渡态中完全断裂，取 $\tilde\nu(\mathrm{C{-}H}) = 3000\ \mathrm{cm^{-1}}$、$\tilde\nu(\mathrm{C{-}D}) = 2100\ \mathrm{cm^{-1}}$，并忽略其余振动模式及平动/转动配分函数中较小的差异。
::: solution
氘的额外垒高恰等于反应物零点能之差（过渡态贡献因伸缩消失而抵消）：
$$
\Delta\Delta E_\mathrm{a} = \tfrac{1}{2}hc\,\Delta\tilde\nu
= \tfrac{1}{2}\times 1.4388\ \mathrm{cm\,K} \times 900\ \mathrm{cm^{-1}} \times k_\mathrm{B}
= 647\ \mathrm{K}\times k_\mathrm{B},
$$
即 $647 \times 8.314 = 5.38\ \mathrm{kJ\,mol^{-1}}$。两种同位素共享同一 $k_\mathrm{B}T/h$ 指前因子，故
$$
\frac{k_\mathrm{H}}{k_\mathrm{D}} = e^{\Delta\Delta E_\mathrm{a}/RT} = e^{647/298.15} = e^{2.17} = 8.8 .
$$
把被忽略的因子补回（较轻同位素在转动与平动函数及弯曲模式中再多赢一点），半经典上限推到约 $10$——这就是为什么 $6$–$8$ 的 $k_\mathrm{H}/k_\mathrm{D}$ 被称为"接近最大"，为什么室温下远大于 $\sim 15$ 的值被当作隧穿的证据（粒子穿垒而过而非越垒而上，而隧穿更偏爱 H），以及为什么同位素效应*随温度升高而缩小*，如下图所示：同一模型在 $600\ \mathrm{K}$ 给出 $k_\mathrm{H}/k_\mathrm{D} = 2.9$。
:::
:::

::: widget plot
f: a*exp(d*1000/(8.314*x))
x: 250, 600
y: 0, 20
sliders: d=5.4:2:10:0.2; a=1:0.5:2:0.1
labels: \text{模型 } k_\mathrm{H}/k_\mathrm{D}
caption: 一级同位素效应的零点能模型 $k_\mathrm{H}/k_\mathrm{D} = a\,e^{\Delta\Delta E_\mathrm{a}/RT}$ 对温度的曲线，零点能差 `d` 以 $\mathrm{kJ\,mol^{-1}}$ 计（默认 $5.4$，即 $\mathrm{C{-}H}$ 与 $\mathrm{C{-}D}$ 伸缩之差），指前比 `a` 由滑块设定。反应越冷同位素效应越大——默认曲线在 $\mathrm{250\ K}$ 达到 $13$——随温度升高回落向（接近 1 的）统计极限。若实测同位素效应随降温增大的速度超过这条曲线，正是隧穿叠加到越垒速率之上的经典签名。
:::

两个精化补全工作图像。**二级同位素效应**：当反应中心*相邻*的 $\mathrm{C{-}D}$ 键在类 $\mathrm{S_N1}$ 过渡态中变弱（面外弯曲变软，有利于 H）时，每个氘出现 $k_\mathrm{H}/k_\mathrm{D} \approx 1.1$–$1.5$ 的 $\beta$-氘同位素效应；接近 $0.7$ 的 $\alpha$-氘同位素效应（*反*同位素效应）标志 $\mathrm{sp^3 \rightarrow sp^2}$ 的再杂化。**斯温-沙德（Swain–Schaad）**：氚把同样的零点能效应比氘再放大约 1.44 倍，故对*经典*一级同位素效应，指数
$$
\Lambda = \frac{\ln\!\left(k_\mathrm{H}/k_\mathrm{T} - 1\right)}{\ln\!\left(k_\mathrm{H}/k_\mathrm{D} - 1\right)} \approx 3.3
$$
（$\mathrm{298\ K}$）；实测 $\Lambda$ 远离 3.3 即指控隧穿。并预告平衡所起的作用：同样的零点能差也作用于*稳定*物种，给出**平衡同位素效应** $K_\mathrm{H}/K_\mathrm{D}$，它可以超过任何一级动力学同位素效应（室温下 O–H 与 O–D 的酸性相差约 $3$–$7$ 倍）；当过渡态之前的一步本身是对同位素敏感的前置平衡时，平衡同位素效应会骑在动力学同位素效应之上，读出机理之前必须把它扣除。

## 过渡态理论的失效之处

若分割面选得使没有任何轨迹再穿越，过渡态理论就是*精确*的——但那是定义，不是恩赐。现实中，以过大沿 $s$ 动量越过鞍点的轨迹会返回并再穿越（$\kappa < 1$）；溶液中的溶剂笼效应使飞秒时间尺度上再穿越成为常态，而**变分过渡态理论**通过选择*最小化*所算通量的面（沿 $s$）来修复放置误差，其估计总是优于鞍点本身。克拉默斯 1940 年的推广沿 $s$ 的运动方程中加入摩擦，预言速率在高溶剂粘度下的转折：在粘性极限下速率不再由能垒决定，而由出阱扩散决定。反应动力学——交叉分子束、飞秒化学——在如今由 *ab initio* 计算出的势能面上逐条轨迹地检验整个图像，详见 [[kinetics/reaction-dynamics]]。

::: history
艾林方程在 1935 年出现了两次：亨利·艾林（Eyring）的《化学反应中的活化络合物》（其中 $k_\mathrm{B}T/h$ 因子如本文所推导），以及曼彻斯特迈克尔·埃文斯（Evans）与迈克尔·波兰尼（Polanyi）独立给出的热力学表述——波兰尼学派当时正在描绘链反应各基元步的图像。埃文斯 1937 年去世，波兰尼则转向反应动力学——他的儿子约翰·波兰尼后来以红外化学发光创建了这一领域（1986 年诺贝尔化学奖）。尤金·维格纳（Wigner）1937 年处理了抛物势垒的隧穿（并因量子力学中的对称性获 1963 年诺贝尔奖）；亨德里克·克拉默斯（Kramers）1940 年加入了摩擦与扩散。该理论所解释的同位素效应由弗兰克·韦斯特海默（Westheimer）在 1961 年的综述中系统化；比较氢-氘与氢-氚同位素效应的斯温-沙德检验（1971）至今仍是隧穿的标准诊断，而韦斯特海默的经验法则——"同位素效应大于十，就去找隧穿"——历久弥新。
:::

## 后续内容

艾林方程是从动力学通往*分子化的热力学*的桥梁：每一对 $\Delta^\ddagger H, \Delta^\ddagger S$ 都是一个平衡常数分量的信息，说的是谁也将永远看不见的结构——读出这些数对是物理有机与生物无机机理论文的日常，金属中心取代反应的同类解读见 [[kinetics/homogeneous-catalysis]]。碰撞理论一章（[[kinetics/collision-theory]]）是这里一切内容的经典极限：它的位阻因子化装成 $e^{\Delta^\ddagger S/R}$，它的 $E_0 + \tfrac{1}{2}RT$ 变成 $\Delta^\ddagger H + RT$。你在 [[kinetics/rate-laws]] 与 [[kinetics/reaction-mechanisms]] 中导出过速率方程的那些机理，如今可以*逐步*检验：每个基元步带着自己的 $\Delta^\ddagger H$ 与 $\Delta^\ddagger S$。而本课栖身其上的那些势能面，将在 [[kinetics/reaction-dynamics]] 中一次碰撞一次碰撞地被测量——在那里，过渡态不是被推断，而是被操纵。

::: summary
- 过渡态是 PES 上的一阶鞍点——沿反应坐标取极大、沿其余一切方向取极小、带一个虚频率；它*不是*中间体，没有寿命。
- 过渡态理论假设反应物与活化络合物准平衡、并假设穿过鞍点分割面的自由通量，得 $k = \kappa(k_\mathrm{B}T/h)K^\ddagger$；普适频率 $k_\mathrm{B}T/h = 6.2\times10^{12}\ \mathrm{s^{-1}}$（$\mathrm{298\ K}$）取代碰撞频率。
- 标准态要紧：单分子步 $k = \kappa(k_\mathrm{B}T/h)K^\ddagger$，溶液中双分子步 $k_2 = \kappa(k_\mathrm{B}T/h)K^\ddagger(c^\circ)^{-1}$；热力学形式为 $k \propto e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$。
- 艾林图 $\ln(k/T)$ 对 $1/T$ 由斜率给 $\Delta^\ddagger H$、由截距给 $\Delta^\ddagger S$；$\Delta^\ddagger S$ 读出机理——缔合为负（狄尔斯-阿尔德，$\approx -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$），解离为正（$\mathrm{Fe^{2+}}$ 上的水交换，$+20$）。
- $E_\mathrm{a} = \Delta^\ddagger H + RT$（单分子，以及溶液中双分子）或 $\Delta^\ddagger H + 2RT$（气相双分子）：这笔账在室温值玻尔兹曼因子的七倍。
- 透射系数 $\kappa$ 吸收再穿越（$\kappa < 1$）与隧穿（$\kappa > 1$）；抛物势垒结果 $\kappa = u/2\sin(u/2)$，$u = h|\tilde\nu^\ddagger|/k_\mathrm{B}T$，说明为何氢转移隧穿而重原子转移不隧穿，以及隧穿为何使阿伦尼乌斯图弯曲。
- 一级同位素效应源于零点能之差：$\mathrm{C{-}H}$ 断裂时 $k_\mathrm{H}/k_\mathrm{D} \approx e^{\frac{1}{2}hc\Delta\tilde\nu/RT} \approx 7$–$10$（$\mathrm{298\ K}$），随温度升高而缩小；斯温-沙德检验与过大的同位素效应指控隧穿。
- 过渡态理论的理想化——无再穿越、鞍点分割面、经典过渡态——由变分过渡态理论与克拉默斯摩擦修复，并由反应动力学直接检验。
:::

## 练习

::: exercise 普适频率 {level=1 check="6.46"}
计算 $\mathrm{310\ K}$（体温）下的艾林尝试频率 $k_\mathrm{B}T/h$。（以 $10^{12}\ \mathrm{s^{-1}}$ 为单位输入。）
::: solution
$k_\mathrm{B}T/h = 1.381\times10^{-23} \times 310\,/\,6.626\times10^{-34} = 6.46\times10^{12}\ \mathrm{s^{-1}}$。每个活化络合物每秒尝试越垒这么多次，无论什么反应——运动原子的质量在态数与速率之间恰好消掉。
:::
:::

::: exercise 由活化自由能求速率 {level=1 check="0.06"}
某单分子重排在 $\mathrm{298.15\ K}$ 下 $\Delta^\ddagger G = 80.0\ \mathrm{kJ\,mol^{-1}}$，$\kappa = 1$。求 $k$。（以 $\mathrm{s^{-1}}$ 输入。）
::: solution
$k = (k_\mathrm{B}T/h)\,e^{-\Delta^\ddagger G/RT} = 6.21\times10^{12} \times e^{-80\,000/2478.8} = 6.21\times10^{12} \times 9.6\times10^{-15} = 0.060\ \mathrm{s^{-1}}$：半衰期约 $12\ \mathrm{s}$。注意 $80\ \mathrm{kJ\,mol^{-1}}$——只有 C–C 键的五分之一——如何换来实验室尺度上很快的反应：全是指数在起作用。
:::
:::

::: exercise 由 $\Delta^\ddagger H$ 求 $E_\mathrm{a}$ {level=1 check="92.5"}
某气相单分子反应在 $\mathrm{298.15\ K}$ 下 $\Delta^\ddagger H = 90.0\ \mathrm{kJ\,mol^{-1}}$。求 $E_\mathrm{a}$。（以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
$E_\mathrm{a} = \Delta^\ddagger H + RT = 90.0 + 2.48 = 92.5\ \mathrm{kJ\,mol^{-1}}$。单分子步 $\Delta n^\ddagger = 0$，故 $\Delta^\ddagger H = \Delta^\ddagger U$，多出的 $RT$ 是 [[#prop-ea-dh]] 处证明中的热功项。
:::
:::

::: exercise 两点法艾林图 {level=2 check="75"}
某一级反应在 $\mathrm{300\ K}$ 下 $k = 2.0\times10^{-3}\ \mathrm{s^{-1}}$，在 $\mathrm{320\ K}$ 下 $k = 1.40\times10^{-2}\ \mathrm{s^{-1}}$。提取 $\Delta^\ddagger H$（设 $\kappa = 1$，参数不依赖 $T$）。（以 $\mathrm{kJ\,mol^{-1}}$ 输入。）
::: solution
艾林斜率用的是 $\ln(k/T)$ 而非 $\ln k$：
$$
\text{斜率} = \frac{\ln(1.40\times10^{-2}/320) - \ln(2.0\times10^{-3}/300)}{1/320 - 1/300}
= \frac{-10.04 - (-11.92)}{-2.083\times10^{-4}} = -9.03\times10^{3}\ \mathrm{K},
$$
故 $\Delta^\ddagger H = 9.03\times10^{3} \times 8.314 = 75\ \mathrm{kJ\,mol^{-1}}$。若改用 $\ln k$（阿伦尼乌斯斜率）会得到 $E_\mathrm{a} = 77.5\ \mathrm{kJ\,mol^{-1}}$——又是那笔 $RT$ 的账。
:::
:::

::: exercise 高温下的同位素效应 {level=2 check="6.8"}
对决速过渡态完全断裂一个 $\mathrm{C{-}H}$ 键的反应，由 $\tilde\nu(\mathrm{C{-}H}) = 2900\ \mathrm{cm^{-1}}$ 与 $\tilde\nu(\mathrm{C{-}D}) = 2050\ \mathrm{cm^{-1}}$ 估计 $\mathrm{320\ K}$ 下的 $k_\mathrm{H}/k_\mathrm{D}$，忽略其余一切同位素差异。（输入该比值。）
::: solution
$\Delta\Delta E_\mathrm{a}/k_\mathrm{B} = \tfrac{1}{2}\times1.4388\times(2900-2050) = 611.5\ \mathrm{K}$，故 $k_\mathrm{H}/k_\mathrm{D} = e^{611.5/320} = e^{1.91} = 6.8$。同一反应在 $\mathrm{298\ K}$ 将显示 $7.7$——同位素效应总随温度升高而缩小；加热反而增大的同位素效应是别的东西的证据（机理改变，或某个前置平衡的平衡同位素效应）。
:::
:::

::: exercise 隧穿校正 {level=2 check="1.46"}
某氢负离子转移的虚频率 $|\tilde\nu^\ddagger| = 600\ \mathrm{cm^{-1}}$。计算 $\mathrm{298.15\ K}$ 下抛物势垒的透射系数。（输入 $\kappa$。）
::: solution
$u = 1.4388 \times 600/298.15 = 2.895$，故 $\kappa = u/(2\sin(u/2)) = 2.895/(2\sin 1.448) = 2.895/1.985 = 1.46$。维格纳近似 $1 + u^2/24 = 1.35$ 在此偏低 $8\,\%$——尚可容忍但在漂移；$u > 2$ 时应使用精确式。
:::
:::

::: exercise 导出气相双分子关系 {level=3}
从 $k_2 = \kappa (k_\mathrm{B}T/h) K_\mathrm{c}^\ddagger$ 出发，$K_\mathrm{c}^\ddagger$ 为 $\mathrm{A + B \rightleftharpoons TS}$ 的浓度基准平衡常数，仅用 $E_\mathrm{a} \equiv RT^2\,\mathrm{d}\ln k/\mathrm{d}T$、范特霍夫关系 $\mathrm{d}\ln K_\mathrm{c}^\ddagger/\mathrm{d}T = \Delta^\ddagger U/RT^2$ 与理想气体焓关系，导出理想气体双分子步的 $E_\mathrm{a} = \Delta^\ddagger H + 2RT$。因子 $2$ 究竟来自哪里？
::: solution
$\ln k_2 = \ln(\kappa k_\mathrm{B}/h) + \ln T + \ln K_\mathrm{c}^\ddagger$，故
$$
E_\mathrm{a} = RT^{2}\left(\frac{1}{T} + \frac{\Delta^\ddagger U}{RT^{2}}\right) = RT + \Delta^\ddagger U .
$$
对 $\mathrm{A + B \rightarrow TS}$，$\Delta n^\ddagger = -1$ 且 $\Delta^\ddagger H = \Delta^\ddagger U - RT$，即 $\Delta^\ddagger U = \Delta^\ddagger H + RT$。于是 $E_\mathrm{a} = \Delta^\ddagger H + 2RT$。因子 2 干净地分成两半：一个 $RT$ 来自 $k_\mathrm{B}T/h$ 中显含的 $T$（尝试频率随温度上升），一个 $RT$ 来自 $\Delta^\ddagger U - \Delta^\ddagger H = +RT$（由两个分子生成一个分子*释放* $RT$ 的 $pV$ 功，故热力学能垒高于焓垒）。若放弃 $\kappa$ = 常数的假设，还会出现第三项 $RT^2\,\mathrm{d}\ln\kappa/\mathrm{d}T$——隧穿就是这样伪装成反常大的 $E_\mathrm{a}$ 的。
:::
:::

::: exercise 预测双分子速率常数 {level=3 check="206"}
某溶液双分子反应在 $\mathrm{298.15\ K}$ 下 $\Delta^\ddagger H = 30.0\ \mathrm{kJ\,mol^{-1}}$、$\Delta^\ddagger S = -100\ \mathrm{J\,K^{-1}\,mol^{-1}}$（标准态 $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$，$\kappa = 1$）。计算 $k_2$。（以 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 输入。）然后：在同样 $\Delta^\ddagger H$ 下，要使反应达到扩散极限 $1\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，需要多大的 $\Delta^\ddagger S$？
::: solution
$k_2 = (k_\mathrm{B}T/h)(c^\circ)^{-1}e^{\Delta^\ddagger S/R}e^{-\Delta^\ddagger H/RT}$。三个因子：$6.21\times10^{12}\ \mathrm{s^{-1}}$；$e^{-100/8.314} = e^{-12.03} = 5.96\times10^{-6}$；$e^{-30\,000/2478.8} = e^{-12.10} = 5.55\times10^{-6}$。其积为
$$
k_2 = 6.21\times10^{12} \times 5.96\times10^{-6} \times 5.55\times10^{-6} = 2.1\times10^{2}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
要达到扩散极限，熵必须补上缺失的因子 $10^{10}/206 = 4.9\times10^{7}$，即 $\Delta\Delta S = R\ln(4.9\times10^{7}) = +147\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故 $\Delta^\ddagger S = -100 + 147 = +47\ \mathrm{J\,K^{-1}\,mol^{-1}}$。扩散控制的反应需要*正*的活化熵——两个分子相遇在山口并不受熵的惩罚，因为溶剂付了账——这也是相遇极限速率无论化学如何都聚集在 $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 附近的原因。
:::
:::
