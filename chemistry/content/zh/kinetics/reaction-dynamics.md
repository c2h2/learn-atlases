到目前为止，本图谱的一切都在对大量分子做统计：$k$ 是每秒十亿亿次碰撞叠加出来的结果，而 [[kinetics/rate-laws]] 展示了如何从这一平均值反推机理。随后，碰撞理论与过渡态理论试图*解释*这个平均值——这里是一个阈值能量，那里是一个活化自由能——但它们说的仍是热力学与统计的语言。本课程这最后一章要问的是**一次碰撞**里发生了什么：一个 $\mathrm{F}$ 原子与一个 $\mathrm{H_2}$ 分子的一次相遇，一个 $\mathrm{K}$ 原子与一个 $\mathrm{CH_3I}$ 的一次擦肩。产物朝哪个方向飞出去？$\mathrm{F + H_2}$ 释放的 $137\ \mathrm{kJ\,mol^{-1}}$ 如何在 HF 的振动、转动与平动之间分配？体系在过渡态理论置于势垒顶端的鞍点附近停留了多少飞秒？而当同样的化学被搬进一杯水，问题就反了过来：对 $\mathrm{H^+ + OH^-}$ 而言势垒几乎不存在，限制速率的不是爬坡，而是穿过溶剂*赶到*山脚。分子反应动力学把本课程的两半——气相分子与溶液——最终焊接在一起，一条轨迹一次相遇地焊接。

## 势能面：基元反应的舞台

::: definition 基元反应的势能面 {#def-pes-dyn}
在**玻恩-奥本海默近似**下，电子几乎瞬时地适应核的位置，因此反应体系的每一个电子态都由核几何定义自己的能量函数 $V$——每个电子态对应一张**势能面**（PES）。对 $N$ 个原子，这张面有 $3N - 6$ 个维度（线性分子为 $3N - 5$）；基元反应是面上连接反应物谷与产物谷的一条轨迹，而连接两谷的鞍点*就是* [[kinetics/transition-state-theory]] 中的过渡态。改变电子态的反应——光化学、猝灭、化学发光——会从一张面跳到另一张面，那是 [[kinetics/photochemistry]] 的领地；本课的一切都是绝热的单面化学。
:::

原型是 $\mathrm{H + H_2 \rightarrow H_2 + H}$：三个质子三个电子，对共线接近只需两个坐标——正在形成的距离 $r_\mathrm{AB}$ 与正在断裂的距离 $r_\mathrm{BC}$。**LEPS 面**（London–Eyring–Polanyi–Sato，1941）由已知的 $\mathrm{H_2}$ 与 $\mathrm{H_2^+}$ 势能曲线半经验地构造 $V(r_\mathrm{AB}, r_\mathrm{BC})$：反应物坐在 $r_\mathrm{BC} = 0.074\ \mathrm{nm}$ 处平坦的长谷里，产物坐在镜像的谷里，两谷之间是两面距离都拉伸到约 $0.093\ \mathrm{nm}$ 的对称线形 $\mathrm{H\cdots H\cdots H}$——鞍点，过渡态，比反应物底高约 $40\ \mathrm{kJ\,mol^{-1}}$（计入零点能后约 $20\ \mathrm{kJ\,mol^{-1}}$）。**反应路径**——从鞍点沿最陡下降落入两谷的路线——并不直穿对称的拐角：它会*拐弯*，经典轨迹则抄近角，经过比鞍点更像产物的几何构型。本课气相一半的一切，都是在这类面上研究轨迹，而这些面如今已能以光谱精度从头算出。

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
caption: 每个基元步共有的拓扑：原点处的一阶鞍点——沿一个方向是极小，沿另一个方向是极大。把 $x$ 与 $y$ 取作 $\mathrm{H + H_2}$ 的两个核间距，沿 $x$ 方向离开原点的两条谷就是反应物与产物通道，原点就是对称的 $\mathrm{H\cdots H\cdots H}$ 过渡态。旋转曲面、拖动视角：反应路径翻过山口，下方的等值线图显示穿过鞍点的双曲线，标明它是*那个*瓶颈——这就是过渡态理论的几何内容。
:::

## 经典轨迹与反应截面

在面上，一次经典碰撞是一条**轨迹**：给定相对速率 $g$、接近几何与内部状态，牛顿方程把原子核载过曲面。在平均之后仍然存留的几何量只有一个——**碰撞参数** $b$，即入射原子与分子中心之间的垂直偏移，$b = 0$ 为正碰。对每个碰撞能 $E$ 与每个 $b$，都存在一个反应概率 $P(E, b)$；可测量的对象是**反应截面**

$$
\sigma(E) = \int_0^\infty P(E, b)\, 2\pi b\, \mathrm{d}b,
$$

即分子在能量 $E$ 呈现的有效靶面积：把 $\sigma$ 乘以靶的数密度，就得到入射粒子在单位路程内反应的概率。

::: definition 反应截面 {#def-xsec}
气相基元反应的**反应截面** $\sigma(E)$ 定义为 $\sigma(E) = \int_0^\infty P(E,b)\,2\pi b\,\mathrm{d}b$，其中 $P(E,b) \in [0,1]$ 是碰撞能为 $E$、碰撞参数为 $b$ 的经典轨迹的反应概率。它的单位是面积（典型值 $10^{-20}$–$10^{-18}\ \mathrm{m^2}$，即 $0.01$–$1\ \mathrm{nm^2}$），而温度 $T$ 下的双分子速率常数是相对速率麦克斯韦分布上的热平均 $k(T) = N_\mathrm{A}\,\langle \sigma v \rangle$。
:::

::: proposition 中心连线模型 {#prop-loc}
把反应物当作直径为 $d$ 的硬球，其相互作用除一个阈值外均为排斥：当且仅当接触时*沿中心连线*的相对动能分量达到 $E_0$，碰撞才反应。由于碰撞参数为 $b$ 的轨迹的中心连线能量为 $E_\mathrm{lc} = E\left(1 - b^{2}/d^{2}\right)$，反应要求 $b \le b_\text{max} = d\left(1 - E_0/E\right)^{1/2}$，于是

$$
\sigma(E) = \pi d^{2}\left(1 - \frac{E_0}{E}\right) = \sigma_0\,\frac{E - E_0}{E} \qquad (E \ge E_0),
$$

阈值以下 $\sigma = 0$：截面在 $E = E_0$ 处从零升起，并在 $E \rightarrow \infty$ 时趋于硬球面积 $\sigma_0 = \pi d^2$。
:::

::: proof 中心连线截面的几何 {#proof-loc}
直径为 $d$ 的两个硬球在球心相距 $d$ 时接触。若入射原子的渐近路径与靶心相距 $b$，简单几何给出接触时中心连线与接近方向夹角 $\chi$ 满足 $\sin\chi = b/d$，于是沿中心连线的速度分量为 $g\cos\chi$，中心连线能量为

$$
E_\mathrm{lc} = \tfrac{1}{2}\mu g^{2}\cos^{2}\chi = E\cos^{2}\chi = E\left(1 - \frac{b^{2}}{d^{2}}\right),
$$

因为 $\cos^2\chi = 1 - \sin^2\chi = 1 - b^2/d^2$。模型的假设是只有 $E_\mathrm{lc}$ 能越过势垒：碰撞反应当且仅当 $E_\mathrm{lc} \ge E_0$，即 $E(1 - b^2/d^2) \ge E_0$，即 $b^2 \le d^2(1 - E_0/E)$。所有低于 $b_\text{max} = d(1 - E_0/E)^{1/2}$ 的 $b$ 以概率一反应，其上一律错过，故 $P(E,b)$ 是阶跃函数，且

$$
\sigma(E) = \int_0^{b_\text{max}} 2\pi b\,\mathrm{d}b = \pi b_\text{max}^{2} = \pi d^{2}\left(1 - \frac{E_0}{E}\right). \qquad \blacksquare
$$

注意两个极限：$E = E_0$ 时只有完全正碰反应（除 $b = 0$ 外 $\sigma = 0$）；$E \gg E_0$ 时阈值被遗忘，$\sigma \rightarrow \pi d^2$。
:::

::: example 中心连线的反应截面 {#ex-loc}
对 $d = 0.40\ \mathrm{nm}$、$E_0 = 25\ \mathrm{kJ\,mol^{-1}}$ 的反应，计算 $E = 2E_0$ 与 $E = 4E_0$ 处的 $\sigma$，以及比值 $\sigma(4E_0)/\sigma(2E_0)$。
::: solution
硬球面积 $\sigma_0 = \pi d^2 = \pi (0.40\ \mathrm{nm})^2 = 0.503\ \mathrm{nm^2}$。在 $E = 2E_0$：
$$
\sigma = \sigma_0\left(1 - \frac{E_0}{2E_0}\right) = 0.503 \times 0.500 = 0.251\ \mathrm{nm^2}.
$$
在 $E = 4E_0$：$\sigma = 0.503 \times (1 - 0.250) = 0.377\ \mathrm{nm^2}$。比值为 $0.377/0.251 = 1.50 = \frac{3/4}{1/2}$，恰好如此——能量在比值中消去，比值只取决于你在阈值上方多远。即便在四倍阈值处，靶仍只呈现其硬球面积的四分之三：最外圈的碰撞太擦边，无法反应。
:::
:::

::: proposition 由截面求热速率常数 {#prop-thermal-k}
可测速率常数是截面对相对碰撞能麦克斯韦-玻尔兹曼分布的平均，
$$
k(T) = N_\mathrm{A}\,\langle \sigma v \rangle = N_\mathrm{A}\int_0^\infty \sigma(E)\, v\, f(E)\, \mathrm{d}E, \qquad v = \sqrt{2E/\mu},
$$
其中 $f(E) = 2\pi E^{1/2}(\pi k_\mathrm{B}T)^{-3/2} e^{-E/k_\mathrm{B}T}$ 为平动能分布。对中心连线 $\sigma$，积分可精确求解，因为 $\sigma(E)\,v \propto (1 - E_0/E)\,E = E - E_0$ 对 $E$ 是线性的：
$$
k(T) = N_\mathrm{A}\,\pi d^{2}\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/RT}.
$$
前因子恰是 [[kinetics/collision-theory]] 的碰撞理论速率常数——截面为 $\pi d^2$ 的反应无法超越的**上限**——而指数项是中心连线能量高于 $E_0$ 的碰撞的玻尔兹曼分数。
:::

::: proof 中心连线的热平均 {#proof-thermal-k}
把 $\sigma(E) = \sigma_0(1 - E_0/E)$ 与 $v = (2E/\mu)^{1/2}$ 代入平均值。乘积 $(1 - E_0/E)\sqrt{E}\cdot\sqrt{E} = E - E_0$ 把被积函数塌缩成单个指数矩：
$$
\langle \sigma v \rangle = \sigma_0\left(\frac{2}{\mu}\right)^{1/2}\frac{2\pi}{(\pi k_\mathrm{B}T)^{3/2}} \int_{E_0}^{\infty} (E - E_0)\, e^{-E/k_\mathrm{B}T}\, \mathrm{d}E.
$$
令 $u = E - E_0$，积分化为 $e^{-E_0/k_\mathrm{B}T}\int_0^\infty u\, e^{-u/k_\mathrm{B}T}\,\mathrm{d}u = (k_\mathrm{B}T)^{2} e^{-E_0/k_\mathrm{B}T}$。把 $k_\mathrm{B}T$ 与 $\pi$ 的幂次归并，
$$
\langle \sigma v \rangle = \sigma_0\left(\frac{2}{\mu}\right)^{1/2}\frac{2\,(k_\mathrm{B}T)^{1/2}}{\pi^{1/2}}\, e^{-E_0/k_\mathrm{B}T} = \sigma_0\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/k_\mathrm{B}T},
$$
乘以 $N_\mathrm{A}$ 即得前面的命题。平均速率 $\langle v\rangle = (8k_\mathrm{B}T/\pi\mu)^{1/2}$ 原封不动地重现了硬球碰撞理论：阈值只花掉一个因子 $e^{-E_0/RT}$，别无其他，因为中心连线规则使*有效*截面对 $E - E_0$ 是线性的。
:::

::: example 由中心连线模型求热速率常数 {#ex-thermal-k}
用中心连线模型估算 $\mathrm{300\ K}$ 下 $\mathrm{H + H_2}$ 的速率常数，取 $d = 0.35\ \mathrm{nm}$、$E_0 = 20\ \mathrm{kJ\,mol^{-1}}$，并与碰撞理论上限比较。
::: solution
约化质量 $\mu = \tfrac{1}{2}m(\mathrm{H_2}) = 1.008\ \mathrm{u} = 1.674\times10^{-27}\ \mathrm{kg}$，故平均相对速率为
$$
\langle v \rangle = \left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} = \left(\frac{8 \times 1.381\times10^{-23} \times 300}{\pi \times 1.674\times10^{-27}}\right)^{1/2} = 2.51\times10^{3}\ \mathrm{m\,s^{-1}}.
$$
上限为 $k_\text{coll} = N_\mathrm{A}\pi d^2\langle v\rangle = 6.022\times10^{23} \times 3.85\times10^{-19}\ \mathrm{m^2} \times 2.51\times10^{3}\ \mathrm{m\,s^{-1}} = 5.8\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（$\mathrm{m^3 \rightarrow dm^3}$ 换算因子 $10^3$）。阈值因子为 $e^{-E_0/RT} = e^{-20\,000/(8.314\times300)} = e^{-8.02} = 3.3\times10^{-4}$，故
$$
k = 5.8\times10^{11} \times 3.3\times10^{-4} = 1.9\times10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
一个数里藏着两课。上限高得离谱——气相碰撞是一次*暴力*的机会——而区区 $20\ \mathrm{kJ\,mol^{-1}}$ 的阈值就把它砍掉三千倍。真实的 $\mathrm{H + H_2}$ 还要慢，因为 $P(E,b)$ 不是阶跃函数：取向、振动、以及能量无法流入反应坐标，都把概率从模型认定必反应的碰撞中抽走。
:::
:::

::: widget plot
f: max(0, 1 - e0/x); 1
x: 0.2, 6
y: 0, 1.15
sliders: e0=1:0.5:3:0.1
labels: \text{中心连线模型 } \sigma/\sigma_0; \text{硬球上限}
caption: 中心连线截面 $\sigma/\sigma_0 = 1 - E_0/E$（滑块 `e0` 以图的能量刻度为单位设定 $E_0$）对碰撞能 $E$（同一单位）的曲线，并与硬球上限 $\sigma/\sigma_0 = 1$ 对比。截面在阈值以下严格为零，陡峭升起，然后缓慢爬向天花板——$E = 4E_0$ 时仍只有 $0.75$。真实反应（束实验的数据点）很少服从阶跃：隧穿使阈值变圆，远程吸引可把 $\sigma$ 抬到硬球线*之上*。
:::

::: warning 中心连线模型是一种形状，不是事实 {#warn-loc}
模型的每个成分都在有用的方向上是错的。真实的 $P(E,b)$ 是光滑函数而非阶跃：$E_\mathrm{lc}$ 略低于 $E_0$ 的轨迹有时也反应（隧穿、振动辅助），正碰有时却不反应（能量陷在错误的模式里）。阈值 $E_0$ 不是鞍点高度：零点能与反应路径的抄角都会移动它。而且 $\sigma$ 可以*超过* $\pi d^2$——远程力会把分子拐进靶内——这正是下面的鱼叉反应如何逃脱曾经似乎要求取 $P > 1$ 的碰撞理论上限的。动力学工作者的用法是：把它当作让"阈值"与"取向"获得几何的最简单曲面，当作阿伦尼乌斯指数可以*是运动学*而非热力学的推导。
:::

## 直接反应：提取、鱼叉与回弹

::: definition 直接反应与络合物反应 {#def-direct-complex}
**直接反应**在数 $10^{-13}\ \mathrm{s}$（两伙伴彼此掠过所需的时间）的一次相遇中完成，产物在接近的记忆丢失之前就飞散开。**络合物反应**则被势能面上的谷（范德华或插入极小）俘获许多个振动周期，$\ge 10^{-12}\ \mathrm{s}$；络合物旋转、把能量重新分配到所有模式，再统计性地解离，其角分布因此丢失入通道的记忆而变得（近似）前后对称。两种机理可直接从散射图案读出。
:::

直接反应有三种典型几何。**提取**：入射原子在大 $b$ 处掠过多原子分子，从外缘攫走一个原子，双方几乎继续前行——产物在小角度散射。**回弹**：正碰撞上排斥的过渡态，产物被弹回后方。**鱼叉**：在交叉距离 $R_\mathrm{c}$ 处电子从金属跳到卤代物，生成的 $\mathrm{M^+ X^-}$ 离子对被库仑定律拽拢——截面不再由接触决定，而由离子吸引的射程决定。

::: example $\mathrm{K + CH_3I}$ 的鱼叉截面 {#ex-harpoon}
当离子对的库仑稳定化能 $e^{2}/4\pi\varepsilon_0 R$ 足以偿付代价 $\Delta E = \mathrm{IP}(\mathrm{K}) - \mathrm{EA}(\mathrm{CH_3I}) = 4.34 - 1.90 = 2.44\ \mathrm{eV}$ 时，钾就把价电子交给 $\mathrm{CH_3I}$。取 $e^{2}/4\pi\varepsilon_0 = 1.440\ \mathrm{eV\,nm}$，求鱼叉半径 $R_\mathrm{c}$ 与截面 $\sigma \approx \pi R_\mathrm{c}^{2}$，并与硬球估计 $\pi d^2$（$d = 0.35\ \mathrm{nm}$）比较。
::: solution
电子在离子曲线与共价曲线交叉处跳跃：
$$
R_\mathrm{c} = \frac{e^{2}/4\pi\varepsilon_0}{\Delta E} = \frac{1.440\ \mathrm{eV\,nm}}{2.44\ \mathrm{eV}} = 0.590\ \mathrm{nm},
\qquad
\sigma \approx \pi R_\mathrm{c}^{2} = \pi \times (0.590)^{2} = 1.09\ \mathrm{nm^{2}}.
$$
硬球靶为 $\pi (0.35\ \mathrm{nm})^2 = 0.38\ \mathrm{nm^2}$，故鱼叉截面大 $1.09/0.38 = 2.8$ 倍。这就是 [[kinetics/collision-theory]] 开篇之谜的解答：碱金属反应似乎有*大于*一的位阻因子，因为其真正的靶——电子跳跃半径——比分子接触半径大。随后库仑拉力把 $\mathrm{CH_3I^-}$ 加速推入 $\mathrm{CH_3I \rightarrow CH_3 + I^-}$，离子对的转动使产物转动过热。
:::
:::

::: history
本节工具建于 1950 至 1990 年间。赫施巴赫（Herschbach）在哈佛的交叉束装置用机械旋转与紫外电离测量产物角分布；李远哲（Yuan T. Lee）在伯克利的束装置加上了速度选择，他们与对这些工作中提取、回弹与络合物寿命的解释共同获得 1986 年诺贝尔化学奖，同年的另一半属于波拉尼（John C. Polanyi）——他的红外化学发光法直接从新生 $\mathrm{HF}$ 的发射读出其振动布居，揭示放热抽取反应把能量灌进产物振动。本课的样板 LEPS 面源自伦敦（London，1937）的工作，由埃林（Eyring）、波拉尼与其学生佐藤（Sato，1941）扩展——第一个化学反应的定量势能面。下面泽维尔（Zewail）的飞秒化学获 1999 年诺贝尔化学奖。
:::

## 交叉分子束：一次一个碰撞

交叉束实验是一台碰撞显微镜。两束超声分子束——反应物以百分之几掺杂在 Ar 或 He 中，经小孔喷出，羽流中的碰撞冻结转动与振动并使平动准直——在真空室中以已知角度交叉。位于角度 $\theta$ 的探测器（经速度选择斩波后的四极质谱仪，或现代*速度映射成像*中的脉冲电离激光把产物速度投影到位置灵敏探测器上）按速度与角度计数产物。由于束是超声的，碰撞能可由束速与交叉角*连续调谐*。

原始图案在实验室系测量，但物理住在**质心系（CM 系）**里：该系随粒子对以 $\mathbf{v}_\text{cm} = (m_\mathrm{A}\mathbf{v}_\mathrm{A} + m_\mathrm{B}\mathbf{v}_\mathrm{B})/(m_\mathrm{A} + m_\mathrm{B})$ 平动。在质心系中，产物沿一个速度球背对背飞出，球上速度由能量守恒定死，球上的角分布 $T(\theta_\text{CM})$ 就是反应的肖像。解读是直接的：**前向散射**（$\theta_\text{CM} \approx 0°$）说明大 $b$ 的提取；**后向散射**说明撞上排斥的共线过渡态后的回弹；**关于 $90°$ 对称且侧向有峰**的分布说明络合物活得足够久，忘了自己从哪个方向来。

::: example 质心系中的碰撞能 {#ex-beam-kin}
某交叉束实验以 $1000\ \mathrm{m\,s^{-1}}$ 的 $\mathrm{F}$ 与 $2000\ \mathrm{m\,s^{-1}}$ 的 $\mathrm{H_2}$ 在 $90°$ 交叉角下碰撞。计算相对速率 $g$、碰撞能 $E_\text{coll} = \tfrac{1}{2}\mu g^{2}$（以 $\mathrm{eV}$ 与 $\mathrm{kJ\,mol^{-1}}$ 计），并与 $\mathrm{F + H_2}$ 约 $4\ \mathrm{kJ\,mol^{-1}}$ 的势垒比较。
::: solution
$m(\mathrm{F}) = 18.998\ \mathrm{u}$、$m(\mathrm{H_2}) = 2.016\ \mathrm{u}$，约化质量 $\mu = (18.998 \times 2.016/21.014)\ \mathrm{u} = 1.823\ \mathrm{u} = 3.026\times10^{-27}\ \mathrm{kg}$。对垂直入射的束，
$$
g = \sqrt{v_\mathrm{F}^{2} + v_{\mathrm{H_2}}^{2}} = \sqrt{(1000)^{2} + (2000)^{2}}\ \mathrm{m\,s^{-1}} = 2236\ \mathrm{m\,s^{-1}},
$$
$$
E_\text{coll} = \tfrac{1}{2}\mu g^{2} = \tfrac{1}{2} \times 3.026\times10^{-27} \times 5.00\times10^{6} = 7.57\times10^{-21}\ \mathrm{J} = \frac{7.57\times10^{-21}}{1.602\times10^{-19}}\ \mathrm{eV} = 0.047\ \mathrm{eV},
$$
即每摩尔碰撞 $7.57\times10^{-21} \times 6.022\times10^{23} = 4.6\ \mathrm{kJ\,mol^{-1}}$——恰在势垒之上，正是反应自身释放的 $137\ \mathrm{kJ\,mol^{-1}}$ 的*释放*方式主宰结局的能区。质心本身在实验室系中以 $v_\text{cm} = 924\ \mathrm{m\,s^{-1}}$ 漂移，这就是为什么实验室系 $90°$ 的探测角不是质心系 $90°$ 的散射角：运动学变换是每篇束实验论文做的第一件事。
:::
:::

::: quiz
某交叉束研究 $\mathrm{K + CH_3I \rightarrow KI + CH_3}$，发现 $\mathrm{CH_3}$ 产物强烈集中在 $\theta_\text{CM} \approx 0°$（前向），几乎没有后向信号。角分布说明了什么？
- [x] 直接提取（鱼叉）机理：$\mathrm{K}$ 在大碰撞参数处从外缘攫取 $\mathrm{I}$，产物几乎保持原方向运动。
- [ ] 寿命很长、断裂前旋转许多圈的络合物。
- [ ] 撞上共线排斥过渡态后的回弹机理。
- [ ] 反应无能垒且各向同性。
::: solution
前向散射是提取的标志：鱼叉电子跳跃与库仑俘获在 $b \approx R_\mathrm{c}$ 处从 $\mathrm{CH_3I}$ 的*远侧*摘下碘，于是 $\mathrm{KI}$ 继续前飞，$\mathrm{CH_3}$ 也向前反冲。长寿命络合物会给出关于 $90°$ 近对称的分布（记忆丢失），撞上排斥墙则后向散射。各向同性会把前后抹平——与观测相反。
:::
:::

## 能量释放：极拉尼规则

::: definition 能量释放与产物态分布 {#def-disposal}
**能量释放**指基元反应的放出的能量在产物内部与平动自由度之间的分配方式。其可观测量是产物态分布——对振动量子数的 $P(v')$ 与对转动量子数的 $P(J')$——以及送入振动的可用能份额 $\langle f_V \rangle = E_\text{vib}/E_\text{avail}$。这些分布绝不是统计的：$\mathrm{F + H_2}$ 把其 $137\ \mathrm{kJ\,mol^{-1}}$ 的大部分放进 HF 的几个振动量子（粒子数反转——化学激光的基础），而 $\mathrm{K + CH_3I}$ 则让转动过载。
:::

::: proposition 极拉尼规则 {#prop-polanyi}
对势垒位于反应路径 $s^\ddagger$ 处的放热抽取反应 $\mathrm{A + BC \rightarrow AB + C}$（BEP 行为：放热反应势垒早，吸热反应势垒晚）：
- **早势垒**（类反应物过渡态，如 $\mathrm{F + H_2}$）：*相对平动*最有效地驱动反应，因为到达过渡态时 BC 尚未拉伸，振动能无从出力；
- **晚势垒**（类产物过渡态，如吸热抽取与插入反应）：*类产物伸缩*——反应物振动——比平动有效数倍，因为势垒位于 BC 键已然断裂之处，沿该键的运动直接翻越山口。
理由是 LEPS/BEP 几何：势垒沿路径的位置决定轨迹是*沿*接近坐标撞上它（平动耦合）还是*沿*断裂键撞上它（振动耦合）。这些规则是经验的——对势能面的系统化解读，不是定理——其镜像支配能量释放：早势垒的放热反应把能量*灌进*产物振动，因为路径沿 AB 伸缩方向下冲产物谷。
:::

经典的一对实验正处在这条规则的两边。$\mathrm{F + H_2}$（早势垒，$E_\mathrm{a} \approx 4\ \mathrm{kJ\,mol^{-1}}$）被冷碰撞驱动，发射 $\mathrm{HF}(v' = 3)$——波拉尼的化学发光显示 $\langle f_V \rangle \approx 0.6$：平动赢了*入口*的赌注，振动赢了*出口*。晚势垒处角色互换：试剂的振动激发比同量平动能高得多地促进反应——模式特异化学因此才成为可能。BEP 相关（同一反应族内活化能对反应焓线性）把早晚势垒放到同一条直线上，1940 年代的 LEPS 面早已显示原因：面的斜角图按放热量把路径弯向产物谷。

## 飞秒化学：时间中的过渡态

::: history
泽维尔（Ahmed Zewail）小组于 1987 年以解离 $\mathrm{ICN \rightarrow I + CN}$ 的泵浦-探测研究开创了**飞秒化学**：100 fs 的紫外泵浦脉冲把波包从基态弗兰克-康登区发射到排斥面上，延迟的探测脉冲以随延迟变化的激光诱导荧光追踪出射的 $\mathrm{CN}$。产物信号在几百飞秒内上升，反应物信号同时衰减——第一部断键的实时电影，获 1999 年诺贝尔化学奖的工作。
:::

泵浦-探测飞秒化学是束实验（能量域）在时间域的表亲：它不按终态给产物分拣，而是用频闪观测越过鞍点区域的演化体系。延迟曲线真正显示的是**波包**——一片几何构型的量子弥散——在面上滑过鞍点所在区域。

::: warning 飞秒化学看的是波包，不是过渡态 {#warn-femto}
"泽维尔拍下了过渡态"这一流行说法把两半都说错了。过渡态是一个*点*——PES 上的一阶鞍点，体系至多用 $10^{-13}\ \mathrm{s}$ 穿越、自身没有寿命（见 [[kinetics/transition-state-theory]]）。飞秒化学测量的是*反应物衰减*与*产物上升*信号，至多是波包在势垒两侧飞秒级*斜坡*上的运动；再短的脉冲也看不见鞍点本身，因为短到那个程度（$\Delta\nu \sim c/\Delta t$）的脉冲，其带宽比分辨过渡态区域所需的振动结构宽得多。诚实的总结是：飞秒化学以空前的保真度观察过渡态*周围*的动力学——并证实了过渡态理论的图像：山口被一次性、飞快地穿越，中间没有平衡化。
:::

## 溶液中的反应：扩散极限

在液体里，反应物不是弹道式飞向彼此，而是扩散穿过溶剂。对快反应，瓶颈从势能面移到了流体力学。

::: definition 扩散控制反应 {#def-diffusion}
当 A 与 B 的每次相遇都导致反应、观测速率完全由扩散送达这对分子的速度决定时，反应就是**扩散控制**的。$\mathrm{298\ K}$ 水中经典的例子是 $\mathrm{H^+ + OH^- \rightarrow H_2O}$（$k \approx 1.4\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，本身还受质子跳跃增强）与许多自由基复合；它们的活化能（$\sim 10$–$20\ \mathrm{kJ\,mol^{-1}}$）是*黏性流动*的活化能，不是断键的。
:::

::: proposition 斯莫卢霍夫斯基扩散控制速率 {#prop-smoluchowski}
把 B 固定在半径 $R$（反应距离：接触）的球心，A 以相对扩散系数 $D = D_\mathrm{A} + D_\mathrm{B}$ 扩散，体相浓度 $c_\mathrm{b}$，完全吸收 $c(R) = 0$。球对称的稳态扩散方程 $\nabla^{2}c = 0$ 给出 $c(r) = c_\mathrm{b}(1 - R/r)$、恒定向内通量 $J = 4\pi D R\, c_\mathrm{b}$，以及每对粒子的速率常数
$$
k_D = 4\pi D R \quad\Longrightarrow\quad k_D = 4\pi N_\mathrm{A}\,(D_\mathrm{A} + D_\mathrm{B})\,R ,
$$
末式在 $D$ 以 $\mathrm{m^{2}\,s^{-1}}$、$R$ 以 $\mathrm{m}$ 计时的单位为 $\mathrm{m^{3}\,mol^{-1}\,s^{-1}}$。对 $\mathrm{298\ K}$ 水中的小溶质，$k_D \approx 7\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。
:::

::: proof 向球形吸收源的稳态扩散 {#proof-smoluch}
稳态下吸收源周围的浓度场服从无源的菲克定律：$\partial c/\partial t = D\,\nabla^2 c = 0$，球对称把拉普拉斯算符约化为 $\nabla^{2}c = r^{-2}\,\partial(r^{2}\,\partial c/\partial r)/\partial r = 0$。积分一次得 $r^{2}\,\partial c/\partial r = \text{const} \equiv A$；再积分得 $c(r) = -A/r + B$。边界条件定死两个常数：$r \rightarrow \infty$ 时 $c \rightarrow c_\mathrm{b}$ 给出 $B = c_\mathrm{b}$；反应距离处完全吸收 $c(R) = 0$ 给出 $A = R\,c_\mathrm{b}$，于是
$$
c(r) = c_\mathrm{b}\left(1 - \frac{R}{r}\right).
$$
浓度向外升高，故通量向内；其大小穿过*任一*半径 $r$ 的球面，即菲克定律在球面上的积分，
$$
J = 4\pi r^{2} D\, \frac{\mathrm{d}c}{\mathrm{d}r} = 4\pi r^{2} D \times \frac{c_\mathrm{b} R}{r^{2}} = 4\pi D R\, c_\mathrm{b},
$$
与 $r$ 无关——必须如此，因为每个越过任一球面的分子最终都被吸收（稳态，无积累）。单位体积的速率为 $J$ 乘以 B 的个数再除以 B 的浓度，即以 A 的浓度计每分子 B 的 $J$，故每分子的速率常数 $k_D = J/c_\mathrm{b} = 4\pi D R$；乘以 $N_\mathrm{A}$ 并写 $D = D_\mathrm{A} + D_\mathrm{B}$（双方都在扩散）即得摩尔结果。整个稳态轮廓是每个 B 分子周围由体相扩散维持的 $1/r$ 贫化壳层。
:::

::: example 水中的扩散控制速率常数 {#ex-kd}
用（下面的）斯托克斯-爱因斯坦关系 $D = k_\mathrm{B}T/6\pi\eta r$，计算 $\mathrm{298.15\ K}$ 水中半径 $r = 0.20\ \mathrm{nm}$ 的小溶质的 $D$（$\eta = 0.89\ \mathrm{mPa\,s}$），以及两个此类物种在接触距离 $R = 0.40\ \mathrm{nm}$ 反应时的 $k_D$。
::: solution
$$
D = \frac{k_\mathrm{B}T}{6\pi\eta r} = \frac{1.381\times10^{-23} \times 298.15}{6\pi \times 8.9\times10^{-4} \times 2.0\times10^{-10}} = 1.23\times10^{-9}\ \mathrm{m^{2}\,s^{-1}},
$$
故 $D_\mathrm{A} + D_\mathrm{B} = 2.45\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$，
$$
k_D = 4\pi N_\mathrm{A}(D_\mathrm{A} + D_\mathrm{B})R = 4\pi \times 6.022\times10^{23} \times 2.45\times10^{-9} \times 4.0\times10^{-10} = 7.4\times10^{6}\ \mathrm{m^{3}\,mol^{-1}\,s^{-1}},
$$
即 $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。这就是那个著名的数字：室温的水中，扩散能以约 $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 的量送达相遇对，所以溶液中 $k$ 接近 $10^{10}$ 的反应不算快——它是*每次相遇*都快的快，其化学对动力学不可见。注意合理的位数：$\eta$ 只有两位有效数字，故写 $7.4$ 而非 $7.429$。
:::
:::

::: proposition 柯林斯-金克尔图像：串联的活化与扩散 {#prop-collins-kimball}
相遇对 $(\mathrm{A\,B})$ 以扩散速率 $k_D$ 形成，可以 $k_{-d}$ 的速率重新分开，或以 $k_\text{act}$（[[kinetics/transition-state-theory]] 的过渡态理论速率常数，本征的爬坡）反应。稳态给出
$$
k = \frac{k_D\,k_\text{act}}{k_D + k_\text{act}}
\qquad\Longleftrightarrow\qquad
\frac{1}{k} = \frac{1}{k_D} + \frac{1}{k_\text{act}} ,
$$
观测速率常数永远*小于两个极限之任一个*：势垒主导时（$k_\text{act} \ll k_D$）$k \rightarrow k_\text{act}$，扩散主导时 $k \rightarrow k_D$。串联的两步相加其电阻——这是 [[kinetics/reaction-mechanisms]] 中连串步骤的欧姆定律结构应用于相遇对。
:::

::: example 由活化与扩散求观测速率 {#ex-ck}
某溶液反应的本征活化速率常数 $k_\text{act} = 2.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，扩散控制的相遇供给 $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。求 $k$ 及相遇对的反应分数。
::: solution
$$
k = \frac{k_D\,k_\text{act}}{k_D + k_\text{act}} = \frac{7.4\times10^{9} \times 2.0\times10^{9}}{(7.4 + 2.0)\times10^{9}} = \frac{14.8}{9.4}\times10^{9} = 1.6\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
相遇对的反应分数为 $k/k_D = 1.57/7.4 = 0.21$：五分之四的相遇对未反应就分开了。观测 $k$ 比 $k_D$ 低 $21\,\%$、比 $k_\text{act}$ 低 $79\,\%$——哪个单独极限都描述不了它，这正是柯林斯与金克尔（1949）写出倒数之和的原因：扩散与活化*串联*，慢的那个说了算。
:::
:::

::: widget plot
f: kd*x/(kd + x)
x: 0, 30
y: 0, 12
sliders: kd=7.4:2:20:0.2
labels: \text{观测 } k
caption: 柯林斯-金克尔观测速率常数 $k = k_D k_\text{act}/(k_D + k_\text{act})$ 对本征活化速率常数 $k_\text{act}$ 的曲线（均以 $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 为单位），扩散供给 $k_D$ 由滑块设定。$k_\text{act}$ 小时曲线就是直线 $k = k_\text{act}$（活化控制）；$k_\text{act}$ 大时饱和于 $k = k_D$（扩散控制）——平台之上的化学对速率方程不可见。把 $k_D$ 调低（更冷、更黏的溶剂），看平台下降：那时设定速率的是溶剂而非势垒。
:::

::: proposition 离子的德拜相遇因子 {#prop-debye}
若 A 与 B 带电荷数 $z_\mathrm{A}, z_\mathrm{B}$，把它们从无穷远搬到相遇距离 $R$ 的功为
$$
w = \frac{z_\mathrm{A} z_\mathrm{B}\, e^{2}}{4\pi\varepsilon_0\, \varepsilon\, r\, k_\mathrm{B}T}
$$
（以 $k_\mathrm{B}T$ 为单位；分母中的 $r$ 即 $R$），于是相遇对的平衡常数带着玻尔兹曼因子 $e^{-w}$：同号电荷被压制，异号电荷被增强。完整的稳态斯莫卢霍夫斯基-德拜处理把 $e^{-w}$ 换成 $w/(e^{w} - 1)$，强排斥时它趋于 $e^{-w}$，$w \rightarrow 0$ 时趋于 $1$。
:::

::: example 水中两个阳离子的功因子 {#ex-debye}
计算 $\mathrm{298.15\ K}$ 下 $+1/+1$ 对在水中（$\varepsilon = 78.5$）取相遇距离 $R = 0.7\ \mathrm{nm}$ 的 $w$ 与相遇因子 $e^{-w}$；再给出 $+1/-1$ 对的因子。
::: solution
$$
w = \frac{e^{2}}{4\pi\varepsilon_0\,\varepsilon R k_\mathrm{B}T} = \frac{(1.602\times10^{-19})^{2}}{4\pi \times 8.854\times10^{-12} \times 78.5 \times 7.0\times10^{-10} \times 1.381\times10^{-23} \times 298.15} = 1.02,
$$
故同号电荷相遇的速率只有中性分子的 $e^{-1.02} = 0.36$——被溶剂屏蔽的库仑排斥压制近三倍。对 $+1/-1$ 对，$w = -1.02$，因子为 $e^{+1.02} = 2.8$：吸引使相遇供给几乎增至三倍。完整的斯莫卢霍夫斯基-德拜因子 $w/(e^{w}-1) = 0.58$ 与 $1.59$ 讲的是同一个故事但坡度更缓，因为离子在相遇*过程中*就在相互滑开或滑拢。这就是离子强度与溶剂介电常数强烈移动离子速率常数的原因。
:::
:::

**溶剂笼。**液体不是布满障碍的空空间：每个反应物周围每分子体积围着约 $10^{2}$ 个溶剂分子，一次"相遇"是在溶剂笼里共享了几皮秒的一对。光解让笼现形：闪光光解 $\mathrm{I_2}$（或酮），对位自由基对 $\mathrm{I\cdot\,\cdot I}$ 并非每个都能逃脱——很大一部分在体相扩散把它们分开*之前*就在笼内复合，于是自由原子的一次量子产率 $\Phi$ 在黏性溶剂中比在水中低，而复合的闪光信号在纳秒级的逃逸时间上衰减。笼也是溶液速率偏离斯莫卢霍夫斯基的原因：相遇对会反复重越 $R$ 球面——这正是柯林斯-金克尔 $k_{-d}$ 分支所吸收的重越。

::: proposition 斯托克斯-爱因斯坦与扩散控制的 $T/\eta$ 律 {#prop-stokes-einstein}
半径 $r$ 的球形溶质在黏度 $\eta$ 的连续介质溶剂中受到斯托克斯阻力 $6\pi\eta r v$，迁移率与扩散之间的爱因斯坦关系 $D = k_\mathrm{B}T/f$ 给出**斯托克斯-爱因斯坦**扩散系数
$$
D = \frac{k_\mathrm{B}T}{6\pi\eta r}.
$$
对两个半径同为 $r$、在接触处反应的溶质（$D_\mathrm{A} = D_\mathrm{B} = D$，$R = 2r$），半径在斯莫卢霍夫斯基结果中恰好相消：
$$
k_D = 4\pi N_\mathrm{A}\,(2D)\,(2r) = 16\pi N_\mathrm{A} r\,\frac{k_\mathrm{B}T}{6\pi\eta r} = \frac{8\,N_\mathrm{A} k_\mathrm{B} T}{3\,\eta},
$$
故 $k_{D,2}/k_{D,1} = (T_2/T_1)(\eta_1/\eta_2)$：扩散控制的温度依赖里写着溶剂的黏度，其表观活化能只有 $RT$ 加上黏性流动的活化能。
:::

::: example 两个温度下的扩散控制 {#ex-visc}
对斯莫卢霍夫斯基例题中的水反应（$r = 0.20\ \mathrm{nm}$，$R = 0.40\ \mathrm{nm}$），已知 $\mathrm{298.15\ K}$（$\eta = 0.89\ \mathrm{mPa\,s}$）下 $k_D = 7.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$，计算 $\mathrm{323.15\ K}$（$\eta = 0.547\ \mathrm{mPa\,s}$）下的 $k_D$。
::: solution
因 $k_D \propto T/\eta$，
$$
k_D(323.15) = 7.4\times10^{9} \times \frac{323.15}{298.15} \times \frac{0.89}{0.547} = 7.4\times10^{9} \times 1.084 \times 1.627 = 1.3\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
升温 $25\ \mathrm{K}$ 使扩散控制速率增大 $1.76$ 倍——表观活化能 $-\!R\,\mathrm{d}\ln(T/\eta)/\mathrm{d}(1/T) \approx 19\ \mathrm{kJ\,mol^{-1}}$，由溶剂变稀主导，与任何势垒无关。诊断法就是黏度本身：若在温度或溶剂序列中 $k\eta/T$ 恒定，反应就是扩散控制的，无论阿伦尼乌斯图怎么说。
:::
:::

::: warning 扩散控制伪装成低活化能 {#warn-diffusion}
一个真实势垒 $E_\text{act} = 40\ \mathrm{kJ\,mol^{-1}}$ 但 $k_\text{act} = 7.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 的反应在水中（$k_D = 7.4\times10^{9}$）观测到 $k = 6.7\times10^{9}$，对柯林斯-金克尔倒数式求导得 $E_\text{obs} = (k/k_D)E_D + (k/k_\text{act})E_\text{act} = 0.91\times19 + 0.096\times40 \approx 21\ \mathrm{kJ\,mol^{-1}}$：阿伦尼乌斯图报告的是*扩散*的势垒，只有真实值的一半，而活化熵看起来正值而无害。溶液中一半"小活化能"的报道都是这种假象。检验很便宜：改变黏度（扩散控制的 $k$ 跟随 $\eta^{-1}$）；在大温度范围变温（两个极限分离时出现弯曲）；并记住——水中速率常数落在 $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 十倍以内的反应，多半只告诉你瓶颈*不是*势垒。
:::

::: history
斯莫卢霍夫斯基（Smoluchowski）在 1917 年导出了扩散限制的聚沉与反应速率，把爱因斯坦 1905 年的布朗运动理论用于化学——$4\pi D R$ 通量出自他手。离子的相遇对修正来自德拜（Debye）的电解质理论；活化与扩散的串联组合则是柯林斯（Collins）与金克尔（Kimball）1949 年的论文。溶剂笼由弗兰克（Franck）与拉比诺维奇（Rabinowitsch）于 1934 年提出，并由闪光光解析出——诺里什（Norrish）与波特（Porter）的方法（1967 年诺贝尔化学奖），上面引用的笼内复合动力学也出自该方法。
:::

## 后续内容

这是课程的终点，值得退后一步总览。1850 年维耳米（Wilhelmy）在糖液转化时称量溶液，写下了第一个速率方程；两个世纪的努力之后，本章已把同样的化学追到单次碰撞与飞秒：[[kinetics/rate-laws]] 的速率方程是 [[#def-xsec]] 中 $\sigma(E)$ 的平均；[[kinetics/collision-theory]] 的上限就是硬球 $\pi d^2$；[[kinetics/transition-state-theory]] 的鞍点就是轨迹抄近的那个山口；[[kinetics/chain-reactions]] 的链是抽取与加成的一次次接续，其能量释放规则决定接下来是火焰还是爆炸；[[kinetics/homogeneous-catalysis]] 的催化剂与 [[kinetics/surface-kinetics]] 的表面都是势能面工程师，压低地形的一角而抬高另一角；[[kinetics/photochemistry]] 的激发态则是彻底离开势能面的反应。在本课程之外，同样的面主宰有机金属合成与工业催化中的选择性，同样的扩散极限主宰自由基在大气与海洋中的寿命和臭氧化学——环境与催化课程接过的正是这些工具。从维耳米的糖到 $0.047\ \mathrm{eV}$ 的一次碰撞：分子还是那个分子，最终的问题也还是那个——*它究竟是怎么发生的？*

::: summary
- 势能面是中心对象：每个电子态一张面（玻恩-奥本海默），反应物与产物谷在一阶鞍点相连——即过渡态理论的过渡态——反应路径绕其拐弯（$\mathrm{H + H_2}$ 的 LEPS 面）。
- 碰撞是带碰撞参数 $b$ 的轨迹；反应截面 $\sigma(E) = \int P(E,b)\,2\pi b\,\mathrm{d}b$，而 $k(T) = N_\mathrm{A}\langle\sigma v\rangle$ 把碰撞理论还原为硬球上限。
- 中心连线模型：$\sigma = \pi d^2(1 - E_0/E)$，$k = N_\mathrm{A}\pi d^2(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-E_0/RT}$——阿伦尼乌斯指数即纯粹运动学；真实的 $P(E,b)$ 光滑，且 $\sigma$ 可超过 $\pi d^2$（鱼叉）。
- 直接反应（提取前飞、回弹后飞、鱼叉于 $R_\mathrm{c} = e^2/4\pi\varepsilon_0\Delta E$）各向异性散射；长寿命络合物因忘记入通道而对称散射。
- 交叉分子束与速度映射成像在选定 $E_\text{coll} = \tfrac{1}{2}\mu g^2$ 下给出 $T(\theta_\text{CM})$ 与产物速度；能量释放遵循极拉尼规则——早势垒：平动驱动、振动充满；晚势垒：振动驱动。
- 飞秒化学频闪观测鞍点周围的波包；过渡态本身仍是面上的一点，不是被拍下的物种。
- 溶液中斯莫卢霍夫斯基给出 $k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R \approx 7\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$（水）；柯林斯-金克尔把 $k_D$ 与 $k_\text{act}$ 串联（$1/k = 1/k_D + 1/k_\text{act}$）；离子带德拜因子 $e^{-w}$，$w = z_\mathrm{A}z_\mathrm{B}e^2/4\pi\varepsilon_0\varepsilon R k_\mathrm{B}T$。
- $k_D \propto T/\eta$（斯托克斯-爱因斯坦）：扩散控制伪造低活化能，黏度检验揭穿它。
:::

## 练习

::: exercise 质心系中的碰撞能 {level=1 check="0.0166"}
对 $\mathrm{H + D_2}$，约化质量为 $0.80\ \mathrm{u}$。相对速率 $g = 2000\ \mathrm{m\,s^{-1}}$ 时的碰撞能 $E_\text{coll} = \tfrac{1}{2}\mu g^2$ 是多少？（以 $\mathrm{eV}$ 输入。）
::: solution
$E_\text{coll} = \tfrac{1}{2} \times 0.80 \times 1.6605\times10^{-27} \times (2000)^2 = 2.66\times10^{-21}\ \mathrm{J} = 2.66\times10^{-21}/1.602\times10^{-19} = 0.0166\ \mathrm{eV}$（$1.6\ \mathrm{kJ\,mol^{-1}}$）。束碰撞是冷的：抽取反应的有趣化学都发生在零点几电子伏以内。
:::
:::

::: exercise 中心连线截面 {level=1 check="0.335"}
对 $d = 0.40\ \mathrm{nm}$ 的中心连线反应，$E = 3E_0$ 时的 $\sigma$ 是多少？（以 $\mathrm{nm^2}$ 输入。）
::: solution
$\sigma = \pi d^2(1 - E_0/3E_0) = \pi \times 0.16 \times \tfrac{2}{3} = 0.335\ \mathrm{nm^2}$，为硬球面积 $\sigma_0 = 0.503\ \mathrm{nm^2}$ 的三分之二。即便在三倍 $E_0$ 处，阈值仍要价靶面积的三分之一。
:::
:::

::: exercise 斯托克斯-爱因斯坦扩散系数 {level=1 check="1.23"}
计算 $\mathrm{298.15\ K}$ 水中半径 $0.20\ \mathrm{nm}$ 溶质的扩散系数（$\eta = 0.89\ \mathrm{mPa\,s}$）。（以 $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ 为单位输入。）
::: solution
$D = k_\mathrm{B}T/6\pi\eta r = 1.381\times10^{-23} \times 298.15\,/\,(6\pi \times 8.9\times10^{-4} \times 2.0\times10^{-10}) = 1.23\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$。水中扩散系数都聚集在 $10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ 附近——这就是 $k_D$ 聚集在 $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 附近的原因。
:::
:::

::: exercise 由给定扩散系数求斯莫卢霍夫斯基速率 {level=2 check="11.4"}
两种物种 $D_\mathrm{A} + D_\mathrm{B} = 3.0\times10^{-9}\ \mathrm{m^{2}\,s^{-1}}$，在 $R = 0.50\ \mathrm{nm}$ 处每次相遇都反应。计算 $k_D$。（以 $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 为单位输入。）
::: solution
$k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R = 4\pi \times 6.022\times10^{23} \times 3.0\times10^{-9} \times 5.0\times10^{-10} = 1.14\times10^{7}\ \mathrm{m^{3}\,mol^{-1}\,s^{-1}} = 11.4\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。更大的 $D$ 与更大的俘获半径把它推过水基准值 $7.4\times10^{9}$。
:::
:::

::: exercise 柯林斯-金克尔观测速率 {level=2 check="1.9"}
某水相反应 $k_D = 7.4\times10^{9}$、$k_\text{act} = 2.6\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$。观测 $k$ 是多少？（以 $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ 为单位输入。）
::: solution
$k = k_D k_\text{act}/(k_D + k_\text{act}) = 7.4\times2.6/(7.4+2.6) = 19.24/10.0 = 1.9$（单位 $10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$）。用串联结构验算：$1/k = 1/7.4 + 1/2.6 = 0.52$（同一单位），$k = 1.9$。反应处于混合控制：$k$ 是 $k_\text{act}$ 的 $73\,\%$、$k_D$ 的 $26\,\%$。
:::
:::

::: exercise 德拜相遇因子 {level=2 check="2.77"}
$\mathrm{298.15\ K}$ 水中一对异号电荷（$z_\mathrm{A}z_\mathrm{B} = -1$），$R = 0.7\ \mathrm{nm}$、$\varepsilon = 78.5$，功因子 $w = -1.02$。相遇因子 $e^{-w}$ 是多少？（输入该因子。）
::: solution
$e^{-w} = e^{+1.02} = 2.77$：穿过水介电常数的库仑吸引使相遇供给比中性分子几乎增至三倍。同号等量则给 $e^{-1.02} = 0.36$。溶剂屏蔽因子 $w \propto z_\mathrm{A}z_\mathrm{B}/\varepsilon$，这就是离子速率对介电常数与离子强度敏感的原因。
:::
:::

::: exercise 推导斯莫卢霍夫斯基结果 {level=3}
从球对称的菲克第二定律出发，推导完全吸收球的 $c(r) = c_\mathrm{b}(1 - R/r)$ 与 $J = 4\pi D R c_\mathrm{b}$，并由此得 $k_D = 4\pi N_\mathrm{A}(D_\mathrm{A}+D_\mathrm{B})R$。为什么通量与你在哪个半径上积分无关？部分吸收面（$c(R) > 0$）会对 $k$ 做什么？
::: solution
$\nabla^2 c = r^{-2}(r^2 c')' = 0 \Rightarrow r^2 c' = A \Rightarrow c = -A/r + B$。由 $c(\infty) = c_\mathrm{b}$ 得 $B = c_\mathrm{b}$；由 $c(R) = 0$ 得 $A = Rc_\mathrm{b}$。于是 $J = -4\pi r^2 D c'(r) = 4\pi D A = 4\pi D R c_\mathrm{b}$。通量与 $r$ 无关，是因为稳态下 $R$ 与 $r$ 之间无积累——每个越过任一球面的分子都被吸收；正是这个守恒使 $k_D$ 成为*速率常数*。若在 $R$ 处带一级反应概率 $\kappa$ 的部分吸收面给出 $1/k = 1/k_D + V_R/(N_\mathrm{A}\kappa)$ 型串联结构：扩散与活化再次串联，这就是连续介质语言的柯林斯-金克尔结果。
:::
:::

::: exercise 由 $\sigma(E)$ 到 $k(T)$：中心连线积分 {level=3}
由 $\sigma(E) = \pi d^2(1-E_0/E)$ 与平动能分布 $f(E) = 2\pi E^{1/2}(\pi k_\mathrm{B}T)^{-3/2}e^{-E/k_\mathrm{B}T}$，利用 $\int_{E_0}^{\infty}(E-E_0)e^{-E/k_\mathrm{B}T}\mathrm{d}E = (k_\mathrm{B}T)^2 e^{-E_0/k_\mathrm{B}T}$，推导 $k(T) = N_\mathrm{A}\pi d^2(8k_\mathrm{B}T/\pi\mu)^{1/2}e^{-E_0/RT}$。然后计算 $\mathrm{300\ K}$、$E_0 = 20\ \mathrm{kJ\,mol^{-1}}$ 时的 $k/k_\text{coll}$ 并解释。
::: solution
由 $v = (2E/\mu)^{1/2}$，阈值因子与速率的乘积之所以化简，是因为 $(1 - E_0/E)\sqrt{E}\cdot\sqrt{E} = E - E_0$：$\sigma(E)\,v(E) = \pi d^2(2/\mu)^{1/2}(1 - E_0/E)\,E = \pi d^2(2/\mu)^{1/2}(E - E_0)$。故
$$
\langle\sigma v\rangle = \pi d^2\left(\frac{2}{\mu}\right)^{1/2}\frac{2\pi}{(\pi k_\mathrm{B}T)^{3/2}} (k_\mathrm{B}T)^2 e^{-E_0/k_\mathrm{B}T} = \pi d^2\left(\frac{8k_\mathrm{B}T}{\pi\mu}\right)^{1/2} e^{-E_0/k_\mathrm{B}T}.
$$
与碰撞上限之比为 $k/k_\text{coll} = e^{-E_0/RT} = e^{-20\,000/(8.314\times300)} = e^{-8.02} = 3.3\times10^{-4}$：$\mathrm{300\ K}$ 下约每三千次碰撞才有一次携带足够的中心连线能量，而这个理想化 $k$ 的全部温度依赖就是那个玻尔兹曼分数。真实反应偏离是因为 $P(E,b)$ 光滑——但本题正是"阿伦尼乌斯指数是中心连线的运动学"的证明。
:::
:::
