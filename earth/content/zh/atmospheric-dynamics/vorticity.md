花样滑冰运动员收拢手臂转得更快；浴缸涡在放水时收紧；中纬度气旋在拉伸一根气柱时加深。三者背后的恒等式不是比喻而是守恒律——**位涡**的守恒，无摩擦、绝热气团作为不可侵犯属性随身携带的唯一动力学量，像质量或熵一样。二十世纪动力气象学的历史在很大程度上是发现这个记账变量——任何地面图上都看不见——组织着从龙卷到准两年振荡一切系统的行为的故事，而天气预报在很大程度上就是预报位涡如何分布、如何移动的问题。

## 环流与其守恒

::: definition 环流与Kelvin定理 {#def-circulation}
沿闭合物质曲线$C$的**环流**是速度的线积分，
$$
\Gamma = \oint_C \mathbf{v}\cdot\mathrm{d}\mathbf{l},
$$
单位$\mathrm{m^{2}\,s^{-1}}$： 回路所包围流体的总自旋，按回路的几何加权。**Kelvin环流定理**（1869）说，无摩擦、正压流在保守体积力下，随流体的环流守恒，
$$
\frac{\mathrm{D}\Gamma}{\mathrm{D}t} = 0 .
$$
证明是两行计算：加速度为$-\rho^{-1}\nabla p - \nabla\Phi$，线积分的物质导数化为沿随流体移动回路的加速度积分，而任何梯度的闭合回路积分为零。两个推论框定了整个主题。流体不能凭空获得自旋：环流为零的气团除非有摩擦、正压项$\nabla\rho\times\nabla p$或非保守力作用，就保持无旋——这就是雷暴旋转必须被**生成**（由切变和压力）、机翼和山体尾流要释放涡量以满足定理的原因。而环流是一种**货币**：回路在近地面损失什么就必须在他处赚回什么，而这笔交换的记账——涡量收支——就是整课的算术。
:::

## 涡量：绝对与行星

::: definition 涡量与大气的绝对涡量 {#def-vorticity}
**涡量**$\boldsymbol{\zeta}_a = \nabla\times\mathbf{v}_a$是回路趋于消失时单位面积的环流——局地角速度的两倍。水平流的垂直分量为
$$
\zeta_a = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = \zeta + f, \qquad f = 2\Omega\sin\phi ,
$$
**相对涡量**$\zeta$（旋转实验室内测得的自旋）与**行星涡量**$f$（气团仅仅静坐于地球就从其旋转继承的涡量）之和。行星涡量的水平分量$\Omega\cos\phi$对穿等压线环流和龙卷的启动重要，但大尺度涡量方程由垂直分量支配。典型数字自行归类：天气尺度流的相对涡量$\sim 10^{-5}\ \mathrm{s^{-1}}$、$f$的一半；强中气旋内部达$0.1\ \mathrm{s^{-1}}$，大一万倍；而比值$\zeta/f$就是伪装的Rossby数，告诉你处在哪套近似区。
:::

::: example 简单流的涡量 {#ex-vort-simple}
求（a）速度$V = \Omega' r$的刚体式旋转；（b）纯切变$u = -\Gamma y$、$\Gamma = 1\times10^{-5}\ \mathrm{s^{-1}}$；（c）纯变形场$u = ax$、$v = -ay$的垂直涡量。
::: solution
（a）$\zeta = r^{-1}\,\partial(rV)/\partial r = 2\Omega'$——涡量是角速度的两倍，"半个涡量"才是旋转速率的那个因子。（b）$\zeta = \partial v/\partial x - \partial u/\partial y = 0 - (-\Gamma) = +1\times10^{-5}\ \mathrm{s^{-1}}$：**切变就是涡量**，这就是急流轴的涡量不过是风的断面切变的原因。（c）$\zeta = 0 - 0 = 0$：纯变形**完全不带涡量**，却比多数旋转更有效地锐化温度反差——旋转让流体转向，变形让流体应变，而涡量只度量前者。把两者分开是流场诊断的第一技能。
:::
:::

## 位涡

::: proposition Ertel位涡及其守恒 {#prop-pv}
绝热无摩擦流，把涡量方程与热力学方程和连续方程结合，标量
$$
P = \frac{1}{\rho}\,\boldsymbol{\zeta}_a\cdot\nabla\theta
$$
——**Ertel位涡**——随质守恒，$\mathrm{D}P/\mathrm{D}t = 0$。点积把绝对涡量投影到**层结**$\nabla\theta$上，物理内容是一场三方交易：气柱只能靠改变其**厚度**（拉伸与$\nabla\theta$同向的气柱会强化穿过它的涡管）或相对其穿过的面**倾斜**来改变自旋。在适合天气尺度运动的层结、近水平区，$P$塌缩为**浅水位涡**
$$
q = \frac{f + \zeta}{H}, \qquad \frac{\mathrm{D}q}{\mathrm{D}t} = 0 ,
$$
流体所占层单位厚度的绝对涡量——为大气写下的花样滑冰定律。业务单位是**位涡单位**，$1\ \mathrm{PVU} = 10^{-6}\ \mathrm{K\,m^{2}\,kg^{-1}\,s^{-1}}$；对流层顶由其位涡跃变定义——其下的空气带$0.5$–$1.5\ \mathrm{PVU}$、其上的$2$–$6\ \mathrm{PVU}$——所以对流层顶不是高度面而是**位涡的物质等值面**，气象部门发布的等熵面位涡图就是大气真实分层的地形图。
:::

::: example 拉伸的气柱必须旋转 {#ex-stretch}
$45\ \mathrm{^\circ N}$、$850$到$500\ \mathrm{hPa}$、厚$4.0\ \mathrm{km}$、相对涡量$+2\times10^{-5}\ \mathrm{s^{-1}}$的气柱流过抬升的地形、厚度增至$5.0\ \mathrm{km}$，绝热无摩擦。求新的相对涡量及其在半径$10\ \mathrm{km}$圆周上蕴含的切向风。
::: solution
$q = (f+\zeta)/H$守恒、$f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$不变，得
$$
\zeta_2 = (f+\zeta_1)\frac{H_2}{H_1} - f = 1.23\times10^{-4}\times\frac{5.0}{4.0} - 1.03\times10^{-4} = 2.6\times10^{-5}\ \mathrm{s^{-1}} .
$$
半径$10\ \mathrm{km}$圆周的环流为$\Gamma = \pi r^{2}\zeta$，所以$V = \zeta r/2 = 0.13\ \mathrm{m\,s^{-1}}$——微不足道的风，而这正是课程：天气尺度的拉伸产生的涡量通过平衡动力学对**气压场和垂直运动**要紧，而不是你能感觉到的风。对流上升气流的同样算术——厚度从$2$到$4\ \mathrm{km}$翻倍、$\zeta \gg f$——把相对涡量整个乘二，而对风暴湍流的世代迭代下去，雷暴微弱的环境自旋变成中气旋$0.1\ \mathrm{s^{-1}}$的机制就是它。
:::
:::

::: example Ekman抽运：摩擦是位涡源 {#ex-ekman-pv}
$45\ \mathrm{^\circ N}$的地面气旋有一个旋度为$|(\nabla\times\boldsymbol{\tau})_z| = 1\times10^{-7}\ \mathrm{N\,m^{-3}}$的表面应力，$\rho = 1\ \mathrm{kg\,m^{-3}}$。估计边界层顶的Ekman抽运速度，并说出它对气旋做了什么。
::: solution
$$
w_E = \frac{(\nabla\times\boldsymbol{\tau})_z}{\rho f} = \frac{10^{-7}}{1.03\times10^{-4}} \approx 10^{-3}\ \mathrm{m\,s^{-1}} = 1\ \mathrm{mm\,s^{-1}} .
$$
气旋式应力旋度从边界层**向上**抽；上升被强迫在摩擦从流入空气中移除行星涡量之处，而暖区层状云雨底下跑的就是这同一毫米每秒。摩擦因此不只是阻力：通过位涡它是让大气逃脱自身守恒律的**源和汇**——气旋究竟能转起转落的理由，以及登陆飓风被切断其海洋位涡收支后填塞的理由。
:::
:::

## Rossby波：大气自己的长波

::: proposition 正压Rossby波 {#prop-rossby}
在beta平面$f = f_0 + \beta y$上把无散涡量方程$\partial\zeta/\partial t + \mathbf{v}\cdot\nabla(f+\zeta) = 0$绕纬向流$U$线性化、保留一阶项、代入流函数波$\psi = \mathrm{Re}\{\hat\psi\,e^{i(kx+ly-\omega t)}\}$、$\zeta = \nabla^{2}\psi$：
$$
\omega = kU - \frac{\beta k}{k^{2}+l^{2}}, \qquad c_x \equiv \frac{\omega}{k} = U - \frac{\beta}{k^{2}+l^{2}} .
$$
每个**短于**行星尺度的扰动都相对基流以**beta漂移**$\beta/(k^{2}+l^{2})$向西传播：波自己的速度场平流它穿过的行星涡量，而无论振幅多小该效应都不消失。但**群速度**$\partial\omega/\partial k = U + \beta(k^{2}-l^{2})/(k^{2}+l^{2})^{2}$对纬向波相对流向东：波列的能量顺风向旅行而波峰向上游走，与从风区辐射的水波看到的同一分工。有了西风流$U$，波在$U = \beta/(k^{2}+l^{2})$处**静止**：北半球冬季观测到的准静止行星波恰恰是漂移被西风抵消的波，而这就是阻塞型能持续数周的原因。
:::

::: example Rossby波速度 {#ex-rossby-speed}
$45\ \mathrm{^\circ N}$（$\beta = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$），求波长$5000\ \mathrm{km}$的纯纬向Rossby波相对流的相速度，以及使其静止的纬向流。$3000\ \mathrm{km}$波的西漂是多少？
::: solution
$k = 2\pi/L = 1.26\times10^{-6}\ \mathrm{m^{-1}}$，
$$
c = -\frac{\beta}{k^{2}} = -\frac{1.6\times10^{-11}}{1.58\times10^{-12}} = -10.1\ \mathrm{m\,s^{-1}} ,
$$
所以$20\ \mathrm{m\,s^{-1}}$的西风带着波以$10\ \mathrm{m\,s^{-1}}$向东，$10\ \mathrm{m\,s^{-1}}$的流让它静止——长波只在强流中东传、在弱流中停滞。$L = 3000\ \mathrm{km}$时漂移为$-3.7\ \mathrm{m\,s^{-1}}$：较短的波西漂较慢，这就是涡度图上的短波看似随流向东骑、而长槽原地徘徊的原因。$\beta/k^{2}$定律一阶地解释了天气系统的移动速度——平均西风减去约每秒十米——以及孤立切断低压的向西爬行。
:::
:::

::: widget plot
f: -0.405*x*x; 20-0.405*x*x
x: 1, 10
y: -45, 25
labels: c\ (\text{m/s}),\ U=0; c\ (\text{m/s}),\ U=20
caption: Rossby波相速度$c = U - \beta/k^{2}$随纬向波长$x$（单位$1000\ \mathrm{km}$）的变化：抛物线$-0.405\,L^{2}\ \mathrm{m\,s^{-1}}$（$\beta = 1.6\times10^{-11}$）是流体参考系中的beta漂移；$20\ \mathrm{m\,s^{-1}}$的西风把曲线整体上移。在第二条曲线过零处读出**静止波长**，约$L \approx 7000\ \mathrm{km}$——波数5–6，观测准静止行星波的尺度。比它更长的波长**即使在西风内部也向西移动**——大阻塞脊的命运，它们因此持久。
:::

## 位涡观点：反演、不稳定与Rhines尺度

::: definition 位涡反演与地转湍流 {#def-pv-inversion}
因为平衡动力学是椭圆型的，位涡的分布加边界信息**决定**平衡的风场和质量场——**位涡反演**的纲领：给定内部面上的$q$和作为下边界条件的表面温度，解一个椭圆方程求流函数、恢复平衡的风、温度和垂直运动。地面低压读作高空正位涡异常的平衡响应；地面暖异常作负位涡；两个位涡异常的相互绕转是斜压波增长的机制。当流近二维——大水平尺度、强层结——位涡级串**反向**进行：不像三维湍流那样向更小的涡，而是向更大的涡，因为柱状涡量不能被拉伸进缺失的那一维。级串向上串行直到beta效应在**Rhines尺度**
$$
L_R = \sqrt{\frac{U}{\beta}},
$$
处把它拦住——Rossby波漂移与涡平流相当处：海洋中$U = 1\ \mathrm{cm\,s^{-1}}$时$25\ \mathrm{km}$、$1\ \mathrm{mm\,s^{-1}}$时$8\ \mathrm{km}$；大气$U \sim 10\ \mathrm{m\,s^{-1}}$时$2500\ \mathrm{km}$——急流自身的宽度。大气和海洋的大纬向急流不是被强迫直接强加的，而是被行星涡量拦住的逆级串的**湍流凝聚物**，这就是木星的带和地球的西风带看起来相像的原因。
:::

::: warning 涡量不是速度，位涡并非处处守恒，波峰不是能量
五个要解除的错误。**涡量不是速度**：浴缸的无旋涡在其核外处处涡量为零，而均匀切变有涡量、其流线却根本不弯——永远计算$\nabla\times\mathbf{v}$，永远别目测"旋"。**位涡守恒有前提**：在摩擦、非绝热加热或斜压力矩作用处它失效——也就是说恰好在天气被造出之处；艺术在于知道哪个项在给定问题中、在多长时标上打破守恒。**beta漂移不是总运动**：系统被平均流平流**并且**相对它向西漂；忘记任何一个贡献都会把从风暴路径到切断低压的一切报错。**相速度不是能量速度**：Rossby波的波峰相对流向西行进而能量向东传播——被岛屿或飞机强迫的波列把信号顺风向发出，不向上游。**还有位涡图不是涡度图**：位涡异常可以在几乎没有相对涡量时存在，因为一个厚度异常穿过同一根涡管，而对流层顶折叠边缘的尖锐位涡极大是**位涡面的折叠**——会平流、破碎、像传送带一样把平流层空气注入对流层的物质结构。
:::

::: history
**Kelvin勋爵**于1869年陈述环流定理，**Hermann von Helmholtz**同年发表涡旋定理；**Ludwig Prandtl**1904年的边界层提供了让记账完整的摩擦源项。**C.-G. Rossby**1939年关于科里奥利参数随纬度变化及以其命名的波的论文，是Rossby波大气观点的奠基文献。**H. Ertel**于1942年证明位涡守恒定理，**Jule Charney**和**A. Obukhov**在1948–49年各自独立导出准地转位涡方程，业务平衡动力学至今跑在这条方程上。现代的位涡世界观——反演、等熵位涡图、对流层顶折叠——由**M. Hoskins**、**T. McIntyre**和**R. Robertson**在其1985年关于等熵位涡图的使用与意义的论文中定型。逆级串是**R. Kraichnan**1967年对二维湍流的预言，beta拦截尺度是**R. Rhines**1975年的论证，而两者的观测基础来自1970年代的**MODE**和中纬度流速计试验，它们发现海洋的涡场恰好在理论预言的尺度上饱和。
:::

整个理论背后的科里奥利参数和beta效应在 [[atmospheric-dynamics/equations-of-motion]]，位涡反演恢复的平衡流在 [[atmospheric-dynamics/balanced-flow]]，位涡的摩擦源汇在 [[atmospheric-dynamics/boundary-layer]]，把平均可用位能转化为Rossby波的不稳定在 [[atmospheric-dynamics/general-circulation]]，波在风暴路径中的作用在 [[meteorology/fronts-cyclones]]，海洋涡与急流在 [[oceanography/wind-driven]] 和 [[oceanography/overturning]]，平流层位涡传送带在 [[atmospheric-chemistry/stratospheric-ozone]]。

::: quiz
一空气柱流入$f$更大的区域、厚度不变。它的响应是
- [ ] 气旋式转起。
- [x] 获得反气旋式相对涡量。
- [ ] 拉伸其厚度。
- [ ] 什么都不做——$f$不是真的涡量。
::: solution
$H$固定时$(f+\zeta)/H$守恒意味着$\zeta$必须随$f$上升而下降：气柱转为**反气旋式**。这就是行星上任何向极流都必须获得反气旋曲率的原因——墨西哥湾流从北美海岸分离、西边界流存在、大气向极电流在西侧反气旋式剪切进每个海洋环流的原因。
:::
:::

::: summary
- 无摩擦、正压、无非保守力时环流随流体守恒（Kelvin定理）；涡量是其面密度，大气的垂直涡量是相对自旋加行星$f$。
- Ertel位涡$\rho^{-1}\boldsymbol{\zeta}_a\cdot\nabla\theta$在绝热无摩擦流中随质守恒；浅水极限下它是单位层厚的绝对涡量。
- 气柱被拉伸时转起、向极移动时获得反气旋相对涡量——涡量思维的两骑士。
- 位涡在边界层和非绝热加热中被创造和消灭；这些源是大气改变其位涡的唯一途径，而对流层顶是位涡面不是高度面。
- Rossby波因$f$随纬度变化而存在：它们相对流以$\beta/(k^{2}+l^{2})$西漂、向东携能、在西风抵消漂移处静止——准静止行星波与阻塞的起源。
- 平衡动力学就是位涡反演；二维湍流把位涡向上串到Rhines尺度，大气与海洋的急流是级串留下的东西。
:::

## 练习

::: exercise 切变的涡量 {level=1 check="1"}
西风向北递减、每$1000\ \mathrm{km}$减$10\ \mathrm{m\,s^{-1}}$。以$10^{-5}\ \mathrm{s^{-1}}$为单位计算相对涡量。
::: solution
$\zeta = \partial v/\partial x - \partial u/\partial y = -(-10/10^{6}) = +1\times10^{-5}\ \mathrm{s^{-1}}$。中纬度$f$的一半：急流尺度的切变就是天气学意义的涡量，图上的涡度极大就是切变极大，没有更多玄机。
:::
:::

::: exercise Rossby漂移 {level=1 check="10"}
$45\ \mathrm{^\circ N}$（$\beta = 1.6\times10^{-11}\ \mathrm{m^{-1}\,s^{-1}}$）、波长$5000\ \mathrm{km}$的纬向Rossby波，求其西向相速度（$\mathrm{m\,s^{-1}}$，取绝对值）。
::: solution
$\beta/k^{2} = 1.6\times10^{-11}/(1.26\times10^{-6})^{2} = 10\ \mathrm{m\,s^{-1}}$。天气系统因此以平均西风**减去**约$10\ \mathrm{m\,s^{-1}}$移动——这个订正把新手对500 hPa槽的预报与分析员的分开。
:::
:::

::: exercise 拉伸 {level=1 check="2.6"}
算例中的气柱（$f = 1.03\times10^{-4}\ \mathrm{s^{-1}}$、$\zeta_1 = 2\times10^{-5}\ \mathrm{s^{-1}}$、$H: 4 \to 5\ \mathrm{km}$），以$10^{-5}\ \mathrm{s^{-1}}$为单位求最终相对涡量（一位小数）。
::: solution
$\zeta_2 = (f+\zeta_1)(H_2/H_1) - f = 1.23\times10^{-4}\times1.25 - 1.03\times10^{-4} = 2.6\times10^{-5}\ \mathrm{s^{-1}}$。拉伸百分之二十五换来相对涡量多百分之三十——地形和对流转起的放大因子，从背风槽到超级单体每个尺度皆然。
:::
:::

::: exercise 静止波 {level=2 check="7"}
$45\ \mathrm{^\circ N}$、$U = 20\ \mathrm{m\,s^{-1}}$，求Rossby波静止时的纬向波长（$1000\ \mathrm{km}$为单位，取整千km）。
::: solution
$\beta/k^{2} = U \Rightarrow k = \sqrt{\beta/U} = \sqrt{1.6\times10^{-11}/20} = 8.9\times10^{-7}\ \mathrm{m^{-1}}$，所以$L = 2\pi/k = 7000\ \mathrm{km}$。波数5–6：北半球冬季最强的观测准静止行星波恰好坐在这个波长上——beta效应理论对旧"仅地形"观点的持久的胜利。
:::
:::

::: exercise Ekman抽运 {level=2 check="1.6"}
$60\ \mathrm{^\circ N}$（$f = 1.26\times10^{-4}\ \mathrm{s^{-1}}$、$\rho = 1\ \mathrm{kg\,m^{-3}}$）应力旋度$2\times10^{-7}\ \mathrm{N\,m^{-3}}$，求Ekman抽运速度（$\mathrm{mm\,s^{-1}}$，一位小数）。
::: solution
$w = 2\times10^{-7}/1.26\times10^{-4} = 1.6\ \mathrm{mm\,s^{-1}}$。每秒毫米持续一天能抬升整层云：边界层摩擦通过这个公式，是暖区的造雨器和每个登陆飓风的刹车。
:::
:::

::: exercise 一层的位涡 {level=2 check="2.6"}
以$10^{-8}\ \mathrm{s^{-1}\,m^{-1}}$为单位计算浅水位涡$q = (f+\zeta)/H$，$f = 1.03\times10^{-4}$、$\zeta = 2.6\times10^{-5}\ \mathrm{s^{-1}}$、$H = 5000\ \mathrm{m}$（一位小数）。
::: solution
$q = 1.29\times10^{-4}/5000 = 2.6\times10^{-8}\ \mathrm{s^{-1}\,m^{-1}}$。浅水的$q$与Ertel的$P$单位不同但记账相同；通过层厚和静力稳定度在两者间换算，是把本课的层思维与业务的等熵位涡图连接起来的常规操作。
:::
:::

::: exercise 推导Rossby波 {level=3 check="3.7"}
把$\partial\zeta/\partial t + U\,\partial\zeta/\partial x + \beta v = 0$（$\zeta = \nabla^{2}\psi$、$v = \partial\psi/\partial x$）线性化，代入$\psi = \hat\psi\,e^{i(kx+ly-\omega t)}$，推导$c = U - \beta/(k^{2}+l^{2})$，并计算$L = 3000\ \mathrm{km}$纬向时相对流的漂移（$\mathrm{m\,s^{-1}}$，绝对值一位小数）。
::: solution
代入得$\zeta = -(k^{2}+l^{2})\psi \equiv -K^{2}\psi$、$v = ik\psi$，方程变成
$$
-i\omega(-K^{2}) + ikU(-K^{2}) + \beta\,ik = 0 \;\Longrightarrow\; \omega K^{2} = kUK^{2} - \beta k \;\Longrightarrow\; c = \frac{\omega}{k} = U - \frac{\beta}{K^{2}} .
$$
$l = 0$、$L = 3000\ \mathrm{km}$：$c - U = -1.6\times10^{-11}/(2.09\times10^{-6})^{2} = -3.7\ \mathrm{m\,s^{-1}}$。这四行是动力气象学里被复现最多的计算；每个学过本学科的学生都写过它们，而每份季节预报最终都在与它们的后果谈判。
:::
:::

::: exercise Rhines尺度 {level=3 check="25"}
以km求$45\ \mathrm{^\circ N}$、$U = 10^{-2}\ \mathrm{m\,s^{-1}}$（典型海洋中尺度涡速度）的Rhines尺度$L_R = \sqrt{U/\beta}$（取整）。
::: solution
$L_R = \sqrt{10^{-2}/1.6\times10^{-11}} = \sqrt{6.25\times10^{8}} = 25\ \mathrm{km}$。观测的第一斜压变形半径$10$–$30\ \mathrm{km}$和浮标与高度计测得的$50$–$100\ \mathrm{km}$涡尺度夹住这个值，而海洋各处量级上的吻合正是中尺度涡是被beta效应拦住的地转湍流的证据。大气$U \sim 10\ \mathrm{m\,s^{-1}}$时$L_R \approx 2500\ \mathrm{km}$——急流的宽度，这就是大气逆级串以急流而非单一行星涡收场的原因。
:::
:::
