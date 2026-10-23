到 1900 年，经典物理看起来像一座竣工的大厦。牛顿方程描述了从炮弹到行星的一切运动，麦克斯韦方程统一了电、磁与光，玻尔兹曼（Boltzmann）的统计力学把热与分子运动联系起来——然而这座大厦的地基上有三道裂缝，任何修补都合不拢。一个加热的空腔会发出按经典理论应当发散到无穷的光谱；金属只有当光的频率超过某个阈值才打出电子，与光束多强无关；氢气在放电管中受激发后发出的不是连续谱，而是一组锋利如刀的谱线，其波长服从一个经典理论连陈述都做不到、更不用说推导的关系。量子力学正是从这三次失败中生长出来的替代品，而本课打下它的地基：波函数及其玻恩（Born）解释、作为本征值问题的薛定谔方程、算符与可观测量、使测量产生后果的对易关系，以及作为实用工具而非口号的不确定性原理。

我们走的路线刻意地既是历史的又是逻辑的。我们先看经典物理错了什么，因为新理论的结构正是被那些失败规定的；然后引入波函数以及把它变成预测的规则；最后落在两个观念上——不对易的算符与傅里叶极限——它们使量子力学*不同于*一种经典波动理论，而不只是新数学。本课程后面的每一课都跑在这套机器上：[[quantum-chemistry/model-systems]] 对势箱与环把它精确求解，[[quantum-chemistry/hydrogen-atom]] 对氢原子求解，而当它不再可解时轮到 [[quantum-chemistry/approximation-methods]]；[[spectroscopy/spectroscopy-principles]] 则把它的本征值读作光谱。

## 经典物理的三次失败

::: definition 黑体辐射与普朗克分布 {#def-planck}
**黑体**是处于热平衡的理想吸收体与发射体；加热空腔内的辐射是教科书式的例子。它的谱能量密度作为频率 $\nu$ 的函数在温度 $T$ 下测量，普朗克（Planck）在 1900 年发现，只要频率为 $\nu$ 的腔壁微观振子只能以能量包 $E = nh\nu$ 交换能量，每条曲线就都被
$$
\rho(\nu, T) = \frac{8\pi h\nu^{3}}{c^{3}}\,\frac{1}{e^{h\nu/k_\mathrm{B}T} - 1}
$$ {#eq-planck}
拟合。唯一的新常数就是 $h = 6.626\times10^{-34}\ \mathrm{J\,s}$，普朗克常数；经典世界是 $h\nu \ll k_\mathrm{B}T$ 的极限，那里能量包的离散性看不见。
:::

经典理论预言的高频行为恰好相反，而这个预言值得推导，因为它恰好显示量子力学从哪里进场。

::: proposition 瑞利-金斯定律与紫外灾难 {#prop-uv}
对空腔内的电磁模式计数，并给每个模式分配经典的热能 $k_\mathrm{B}T$，得到**瑞利-金斯（Rayleigh–Jeans）定律**
$$
\rho(\nu, T) = \frac{8\pi\nu^{2}k_\mathrm{B}T}{c^{3}},
$$
它在低频与 [[#eq-planck]] 一致，但在高频按 $\nu^{2}$ 无界增长，于是总能量密度 $\int_{0}^{\infty}\rho\,\mathrm{d}\nu$ 为无穷——即**紫外灾难**。
:::

::: proof 模式计数与能量均分 {#proof-uv}
体积 $V$ 的长方体空腔容纳波长恰好装得进盒子的驻电磁波；对三个整数族容许的波矢计数并计入两种偏振，得到单位体积单位频率 $8\pi\nu^{2}/c^{3}$ 个模式。经典统计力学（[[statistical-thermodynamics/boltzmann-distribution]]）给每个二次自由度分配平均能量 $k_\mathrm{B}T/2$，而每个模式有两个（电场与磁场），所以无论频率如何每个模式都携带 $k_\mathrm{B}T$。模式数乘以能量即得瑞利-金斯定律。把它积分，$\int_{0}^{\infty}\nu^{2}\,\mathrm{d}\nu = \infty$：任何热的物体都应当在紫外辐射出无穷功率。普朗克的补救是让振子能量离散化，这用 $h\nu/(e^{h\nu/k_\mathrm{B}T} - 1)$ 取代模式能量分子中的因子 $k_\mathrm{B}T$：满足 $h\nu \gg k_\mathrm{B}T$ 的模式被玻尔兹曼因子冻结，积分收敛，灾难消失。总量于是化为 $\sigma T^{4}$（斯特藩-玻尔兹曼），峰位服从维恩位移定律 $\lambda_\text{max}T = 2.898\times10^{-3}\ \mathrm{m\,K}$：$5800\ \mathrm{K}$ 的太阳表面峰在 $500\ \mathrm{nm}$，在可见光区；而 $298\ \mathrm{K}$ 的室温物体峰在 $9.7\ \mu\mathrm{m}$，在红外区。
:::

::: widget plot
f: x^3/(exp(480*x/T)-1); T*x^2/480; x^3*exp(-480*x/T)
x: 0.5, 40
y: 0, 700
sliders: T=5800:3000:8000:100
labels: \text{普朗克}; \text{瑞利-金斯}; \text{维恩}
caption: 正文的三个黑体公式，以 $\rho$ 对频率 $x$（单位 $10^{13}\ \mathrm{Hz}$）作图，温度 `T`（单位开尔文）由滑块设定（常数 $480$ 是单位 $x$ 对应的 $h\nu/k_\mathrm{B}T$）。普朗克曲线上升、到峰（维恩定律）再下降；瑞利-金斯曲线在低频与之吻合，随后冲出图的顶端——一眼看尽紫外灾难。维恩曲线是较早的经验拟合，它在普朗克与瑞利-金斯一致的低频区失败。
:::

第二次失败更加尖锐，因为它涉及单个量子而非平均值。

::: example 铯上的光电效应 {#ex-photoelectric}
铯金属的功函数 $\Phi = 2.14\ \mathrm{eV}$。波长 $400\ \mathrm{nm}$、功率 $1.0\ \mathrm{mW}$ 的光照在洁净的铯表面。求打出电子的最大动能、遏止电压、截止波长与光子通量。（用 $hc = 1239.84\ \mathrm{eV\,nm}$。）
::: solution
爱因斯坦（Einstein）1905 年对该效应的解读是：光以能量为 $E = h\nu = hc/\lambda$ 的量子到来，每个量子被单个电子整体吸收：
$$
E_\text{photon} = \frac{1239.84\ \mathrm{eV\,nm}}{400\ \mathrm{nm}} = 3.10\ \mathrm{eV},
\qquad
K_\text{max} = E_\text{photon} - \Phi = 3.10 - 2.14 = 0.96\ \mathrm{eV}.
$$
遏止电压因此是 $0.96\ \mathrm{V}$；$K_\text{max} = 0$ 处的截止波长为
$$
\lambda_0 = \frac{hc}{\Phi} = \frac{1239.84}{2.14} = 579\ \mathrm{nm}.
$$
光子通量是功率除以光子能量：$1.0\times10^{-3}\ \mathrm{J\,s^{-1}}$ 除以 $3.10\times1.602\times10^{-19}\ \mathrm{J} = 2.0\times10^{16}\ \mathrm{s^{-1}}$。经典预言在这里有三处失败：按经典理论，只要光束足够亮，任何颜色都该打出电子（实际上 $600\ \mathrm{nm}$ 的光无论多强都打不出）；电子能量应随光强增大（实际随频率增大）；极弱光下应有电子积累能量的等待时间（电子在 $\sim10^{-9}\ \mathrm{s}$ 内出现，因为量子是整体到来的）。
:::
:::

第三次失败是氢的线状光谱，[[general-chemistry-1/quantum-atom]] 已作处理，值得作为一个悬而未决的挑战重述。

::: proposition 里德伯公式与氢的项值 {#prop-rydberg}
氢原子的全部谱线由经验**里德伯（Rydberg）公式**给出
$$
\frac{1}{\tilde{\lambda}} = R_\mathrm{H}\left(\frac{1}{n_1^{2}} - \frac{1}{n_2^{2}}\right),
\qquad n_2 > n_1 = 1, 2, 3, \dots
$$ {#eq-rydberg}
其中 $R_\mathrm{H} = 1.0968\times10^{7}\ \mathrm{m^{-1}}$。等价地，原子具有**项值** $T_n = hcR_\mathrm{H}/n^{2}$，一条谱线就是两个项之差；能量尺度 $hcR_\mathrm{H} = 13.6\ \mathrm{eV}$ 是氢原子的电离能。经典电动力学预言轨道电子连续辐射并在约 $10^{-11}\ \mathrm{s}$ 内螺旋坠入核内，所以原子的稳定性和线状光谱都没有经典解释。
:::

::: example 巴耳末系的第一条线 {#ex-rydberg}
计算跃迁 $n_2 = 3 \rightarrow n_1 = 2$（红线 $\mathrm{H}\alpha$）以及系限 $n_2 = \infty \rightarrow n_1 = 1$（莱曼系限）的波长与光子能量。
::: solution
由 [[#eq-rydberg]]，
$$
\frac{1}{\lambda} = 1.0968\times10^{7}\left(\frac{1}{4} - \frac{1}{9}\right)\mathrm{m^{-1}}
= 1.0968\times10^{7}\times0.13889 = 1.523\times10^{6}\ \mathrm{m^{-1}},
$$
故 $\lambda = 656.5\ \mathrm{nm}$，在红光区——光子能量为 $13.6\times(1/4 - 1/9) = 1.89\ \mathrm{eV}$。莱曼系限给出 $1/\lambda = R_\mathrm{H}$，$\lambda = 91.18\ \mathrm{nm}$，在真空紫外区，光子能量 $13.6\ \mathrm{eV}$：恰是把原子从 $n = 1$ 电离所需的能量。宇宙中最丰富元素的全部光谱就是一个数加两个整数——任何新力学都必须重现的事实，而 [[quantum-chemistry/hydrogen-atom]] 将展示薛定谔方程如何做到。
:::
:::

## 物质波

跨越裂缝的第一座桥是路易·德布罗意（de Broglie）的建议：光的波粒二象性在物质中有一个镜像。

::: definition 德布罗意波长 {#def-debroglie}
动量为 $p$ 的自由粒子携带一个波长与波数为
$$
\lambda = \frac{h}{p}, \qquad \tilde\nu = \frac{1}{\lambda} = \frac{p}{h}
$$
的**物质波**。对从静止经电势 $V$ 加速的电子，$p = (2m_\mathrm{e}eV)^{1/2}$ 且 $\lambda = 1.226\,(V/\mathrm{V})^{-1/2}\ \mathrm{nm}$。这一假说在 1927 年被证实：戴维森（Davisson）与革末（Germer）把 $54\ \mathrm{V}$ 的电子衍射于镍晶体，得到的角度正对应 $\lambda = 0.167\ \mathrm{nm}$，与晶面间距 $0.215\ \mathrm{nm}$ 同量级；如今电子衍射已是常规手段，正如 [[general-chemistry-1/quantum-atom]] 所要求的那样。
:::

::: example 电子与尘埃粒子的波长 {#ex-debroglie}
求（a）$54\ \mathrm{eV}$ 电子、(b) 经 $100\ \mathrm{V}$ 加速的电子、(c) 直径 $1\ \mu\mathrm{m}$、密度 $1000\ \mathrm{kg\,m^{-3}}$、以 $1\ \mathrm{mm\,s^{-1}}$ 飘动的球形尘埃粒子的德布罗意波长。
::: solution
(a) 由 $E = 54\ \mathrm{eV} = 8.65\times10^{-18}\ \mathrm{J}$，
$$
\lambda = \frac{h}{\sqrt{2m_\mathrm{e}E}}
= \frac{6.626\times10^{-34}}{\left(2\times9.109\times10^{-31}\times8.65\times10^{-18}\right)^{1/2}}
= 1.67\times10^{-10}\ \mathrm{m} = 0.167\ \mathrm{nm},
$$
这是适合衍射的波长，戴维森与革末因此看到了他们的圆环。(b) $\lambda = 1.226/\sqrt{100}\ \mathrm{nm} = 0.123\ \mathrm{nm}$——与原子间距同一尺度，这就是电子衍射与电子显微镜能看见原子的原因。(c) 尘埃粒子质量 $m = \frac{4}{3}\pi(0.5\times10^{-6})^{3}\times1000 = 5.2\times10^{-16}\ \mathrm{kg}$，故
$$
\lambda = \frac{6.626\times10^{-34}}{5.2\times10^{-16}\times10^{-3}} = 1.3\times10^{-15}\ \mathrm{m}.
$$
这比原子小 $10^{5}$ 倍：不存在小到足以使它衍射的狭缝，粒子表现得完全经典。物质波是普遍的；它的*可观测性*不是。
:::
:::

::: warning 波长小不等于没有波 {#warn-macro}
上例的尘埃粒子并没有因为波长小到无法测量就不再量子：它的质心仍然有波函数。实践中摧毁干涉的是*退相干*——粒子不断散射阳光与空气分子，而每个被散射的光子都带走一条"走的是哪条路"的信息，在条纹形成之前就把它们洗掉。当你后文读到某个分子"表现为波"时，这个说法总是关于一个与环境隔离到足以保存相位的实验；而当化学教科书说量子效应对大分子"可以忽略"时，它通常说的是退相干或 $\lambda$ 太小，而不是理论失效。
:::

## 波函数与玻恩解释

物质波需要一套数学，而第一次尝试——薛定谔最初把他的 $\psi$ 读作抹开的电荷密度——是错的。正确的读法属于玻恩。

::: definition 波函数与玻恩解释 {#def-born}
沿 $x$ 运动的粒子的状态是一个（一般为复的）**波函数** $\psi(x, t)$，而 $|\psi(x,t)|^{2}$ 是**概率密度**：位置测量在 $x$ 与 $x + \mathrm{d}x$ 之间找到粒子的概率是 $|\psi|^{2}\,\mathrm{d}x$。波函数本身不被观测；它是振幅，其模平方给出概率，其*相位*支配干涉。波函数必须单值、连续、有限，并归一化为
$$
\int_{-\infty}^{\infty}|\psi(x,t)|^{2}\,\mathrm{d}x = 1 .
$$
:::

::: proposition 期望值 {#prop-expectation}
对全同制备的体系反复测量某一可观测量 $A$ 的平均值——**期望值**——为
$$
\langle A \rangle = \int \psi^{*}\,\hat{A}\,\psi\,\mathrm{d}x ,
$$ {#eq-expect}
其中 $\hat{A}$ 是 $A$ 的算符（下一节）；对位置它化为 $\langle x \rangle = \int x|\psi|^{2}\,\mathrm{d}x$。测量的散布为 $\Delta A = \left(\langle A^{2}\rangle - \langle A\rangle^{2}\right)^{1/2}$，且 $\Delta A = 0$ 当且仅当 $\psi$ 是 $\hat{A}$ 的本征函数。
:::

::: example 归一化线段上的粒子 {#ex-normalise}
一个粒子被束缚在线段 $0 \le x \le L$ 上，波函数 $\psi(x) = Nx(L - x)$，线段外 $\psi = 0$。对 $L = 100\ \mathrm{pm}$ 求 $N$ 及最可几位置。
::: solution
归一化要求
$$
1 = N^{2}\int_{0}^{L}x^{2}(L-x)^{2}\,\mathrm{d}x
= N^{2}\int_{0}^{L}\left(L^{2}x^{2} - 2Lx^{3} + x^{4}\right)\mathrm{d}x
= N^{2}\left(\frac{L^{5}}{3} - \frac{L^{5}}{2} + \frac{L^{5}}{5}\right) = \frac{N^{2}L^{5}}{30},
$$
故 $N = (30/L^{5})^{1/2} = (30)^{1/2}/L^{5/2}$。取 $L = 1.00\times10^{-10}\ \mathrm{m}$，
$$
N = \frac{5.477}{\left(10^{-10}\right)^{5/2}} = 5.48\times10^{15}\ \mathrm{m^{-3/2}} .
$$
概率密度 $|\psi|^{2}$ 在 $x(L-x)$ 最大处最大，即 $x = L/2 = 50\ \mathrm{pm}$——粒子最可能在段中被找到，而在两端（$\psi = 0$ 处）完全找不到。注意 $N$ 携带单位 $\mathrm{m^{-3/2}}$，因为在一维中 $|\psi|^{2}$ 是*每单位长度*的概率。
:::
:::

::: widget plot
f: exp(-x^2/(2*s^2)); exp(-2*s^2*x^2)
x: -4, 4
y: 0, 1.15
sliders: s=0.5:0.2:1.5:0.05
labels: \text{位置密度 } |\psi(x)|^2; \text{动量密度 } |\phi(p)|^2
caption: 一个高斯波包及其动量空间的伙伴，位置宽度 `s` 由滑块设定（两个密度都归一化到高度一；动量以 $\hbar/s_0$ 为单位）。把波包在位置上收窄会*加宽*它在动量上的分布：两个宽度的乘积是常数，$\sigma_x\sigma_p = \hbar/2$，即下面不确定性定理允许的最小值。一个动量完全确定的粒子在位置上将是一条水平线——弥散在全空间，哪里也找不到。
:::

::: quiz
某粒子归一化的波函数为 $\psi = \tfrac{1}{\sqrt{2}}\left(\psi_\mathrm{A} + i\,\psi_\mathrm{B}\right)$，其中 $\psi_\mathrm{A}$ 与 $\psi_\mathrm{B}$ 是定域在相互远离的 A、B 两区域、彼此正交的归一化状态。一次位置测量在 B 中找到粒子的概率是
- [x] $\tfrac{1}{2}$，因为概率是系数的模平方而 $|i|^{2} = 1$；相位因子 $i$ 影响干涉，不影响这个概率。
- [ ] 零，因为 $\psi_\mathrm{B}$ 的系数是虚数，而概率必须是实数。
- [ ] 一，因为虚数单位意味着 B 分量占主导。
- [ ] $\tfrac{1}{4}$，因为 $|\psi|^{2}$ 对两个区域取平均。
::: solution
把概率写出来，$\left|\tfrac{1}{\sqrt{2}}\right|^{2}\!\!\int_{B}|i\,\psi_\mathrm{B}|^{2}\mathrm{d}x = \tfrac{1}{2}\times1 = \tfrac{1}{2}$。复振幅是干涉的代价：$\psi_\mathrm{A}$ 与 $\psi_\mathrm{B}$ 之间的相对相位会改变一次*干涉*实验（两区域后来的重叠）的结果，却使这个位置概率保持 $\tfrac{1}{2}$ 不变。
:::
:::

## 算符、可观测量与本征值

波函数与实验室之间的词典是用算符写的。

::: definition 算符、本征函数、本征值 {#def-operator}
**算符** $\hat{A}$ 是把一个函数变成另一个函数的规则：$\hat{A}f = g$。满足
$$
\hat{A}f = a f
$$
的非零 $f$ 称为 $\hat{A}$ 的**本征函数**，$a$ 称为**本征值**。量子力学的测量假设说：可观测量 $A$ 能给出的值只有其算符 $\hat{A}$ 的本征值；测量之后体系处于相应的本征函数；而*不是*本征函数的波函数按概率给出各本征值，其平均即 [[#eq-expect]]。
:::

::: proposition 位置、动量与能量的算符 {#prop-operators}
在一维中，初等力学的可观测量由下式表示
$$
\hat{x} = x, \qquad
\hat{p}_x = -i\hbar\frac{\mathrm{d}}{\mathrm{d}x}, \qquad
\hat{H} = -\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}}{\mathrm{d}x^{2}} + V(x),
$$ {#eq-operators}
其中 $\hbar = h/2\pi$，而 $\hat{H}$——**哈密顿量**——表示总能量。这些算符并非都对易：
$$
\left[\hat{x}, \hat{p}_x\right] \equiv \hat{x}\hat{p}_x - \hat{p}_x\hat{x} = i\hbar,
$$
即**正则对易关系**；而 $\left[\hat{x}, \hat{x}\right] = \left[\hat{p}_x, \hat{p}_x\right] = 0$，且任何算符与自身及自身的函数都对易。
:::

::: proof 正则对易关系 {#proof-commutator}
让对易子作用在任意可微的试验函数 $f(x)$ 上，因为两个算符相等仅当它们对每个函数做同样的事：
$$
\left[\hat{x}, \hat{p}_x\right]f
= x\left(-i\hbar\frac{\mathrm{d}f}{\mathrm{d}x}\right)
- \left(-i\hbar\frac{\mathrm{d}}{\mathrm{d}x}(xf)\right)
= -i\hbar x f' + i\hbar\left(f + xf'\right)
= i\hbar f .
$$
$xf'$ 项相消，对每个 $f$ 剩下 $i\hbar f$——所以作为算符 $\left[\hat{x},\hat{p}_x\right] = i\hbar$。物理就在不可相消之处：先测位置再测动量*不是*与先测动量再测位置相同的操作，而这个单独的 $i\hbar$ 正是下面不确定性定理的源头。
:::

::: example 哪些函数是动量的本征函数？ {#ex-eigen}
用 $\hat{p}_x = -i\hbar\,\mathrm{d}/\mathrm{d}x$ 检验 $\psi_1 = e^{ikx}$ 与 $\psi_2 = \cos kx$，并加解释。
::: solution
$$
\hat{p}_x\,\psi_1 = -i\hbar(ik)e^{ikx} = \hbar k\,\psi_1 :
$$
$\psi_1$ 是本征函数，本征值 $p = \hbar k$——处于 $\psi_1$ 的粒子动量恰为 $\hbar k$（$\Delta p = 0$）；同样地，它的 $|\psi_1|^{2} = 1$ 是均匀的：动量完全确定的粒子完全离域。但
$$
\hat{p}_x\,\psi_2 = -i\hbar(-k\sin kx) = i\hbar k\sin kx \neq \text{常数}\times\cos kx,
$$
所以 $\cos kx$ *不是*动量本征函数。把它改写成 $\cos kx = \tfrac{1}{2}(e^{ikx} + e^{-ikx})$ 就明白原因：它是动量 $+\hbar k$ 与 $-\hbar k$ 的等量混合，所以对 $\psi_2$ 作动量测量，一半时间给出 $+\hbar k$，一半时间给出 $-\hbar k$，平均为零而 $\Delta p = \hbar k$。驻波——束缚态正是驻波——没有确定的动量。
:::
:::

::: warning 算符不是数 {#warn-operators}
有三个错误反复出现。其一，把 $\hat{A}\psi = a\psi$ 当作已解出"那个"值 $a$：一个算符通常有*许多*本征函数与本征值，只有对本征函数作测量才是可预言的。其二，忘记算符的乘积讲顺序：$\hat{x}\hat{p}_x \ne \hat{p}_x\hat{x}$，所以把 $xp$ 这类经典公式翻译成算符需要作出选择（量子对象通常取对称化的 $\tfrac{1}{2}(\hat{x}\hat{p} + \hat{p}\hat{x})$）。其三，指望本征值天然为实数：它们确实是实数，但仅因为可观测量的算符是*厄米的*——$\int\phi^{*}\hat{A}\psi = \int(\hat{A}\phi)^{*}\psi$——每当你发明一个算符，这个性质都值得检验。
:::

## 薛定谔方程

::: definition 定态薛定谔方程 {#def-tise}
对势 $V(x)$ 中质量为 $m$ 的粒子，具有确定能量的态——除一个相位外不随时间改变的态——是哈密顿量 [[#eq-operators]] 的本征函数：
$$
\hat{H}\psi = E\psi
\qquad\Longleftrightarrow\qquad
-\frac{\hbar^{2}}{2m}\frac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} + V(x)\psi = E\psi .
$$ {#eq-tise}
这就是**定态薛定谔方程**。它是一个公设——不能被推导，只能以其推论自证——但可以*合理化*：要求 $\psi = e^{ikx}$ 在 $V = 0$ 时是 $\hat{H}$ 的本征函数并读出 $E = \hbar^{2}k^{2}/2m$，不过是把 $p = \hbar k$（德布罗意）代入 $E = p^{2}/2m$ 而已。
:::

这个方程最深刻的性质是算术性的而非分析性的：它是一个*边值*问题。无限长直线上的微分方程在几乎任何 $E$ 下都有解；而解必须保持有限并满足边界条件（在箱壁处为零、在无穷远处衰减）的微分方程只在孤立的 $E$ 处有解。量子化不是额外拧上去的公设——它是边界条件对波所做的事，恰如吉他弦只容许某些频率。[[quantum-chemistry/model-systems]] 将见到它最纯粹的形式。

::: example 写出薛定谔方程，并检验一个解 {#ex-tise}
对（a）质子场中的电子，$V(r) = -e^{2}/(4\pi\varepsilon_0 r)$，(b) 振动模型 $V(x) = \tfrac{1}{2}k_\mathrm{f}x^{2}$，写出定态薛定谔方程。然后验证 $\psi = e^{ikx}$ 满足自由粒子方程（$V = 0$）并求 $E$。
::: solution
(a) 为简单起见用一个坐标（完整的原子在 [[quantum-chemistry/hydrogen-atom]] 中于三维求解）：
$$
-\frac{\hbar^{2}}{2m_\mathrm{e}}\frac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} - \frac{e^{2}}{4\pi\varepsilon_0 x}\psi = E\psi .
$$
(b) $-\dfrac{\hbar^{2}}{2m}\dfrac{\mathrm{d}^{2}\psi}{\mathrm{d}x^{2}} + \tfrac{1}{2}k_\mathrm{f}x^{2}\psi = E\psi$，在 [[quantum-chemistry/vibration-rotation]] 中求解。(c) 把 $\psi = e^{ikx}$ 代入 $V = 0$ 的方程：二阶导数是 $(ik)^{2}e^{ikx} = -k^{2}e^{ikx}$，于是左边为 $\dfrac{\hbar^{2}k^{2}}{2m}e^{ikx} = E\psi$——恒等式，$E = \hbar^{2}k^{2}/2m$，即预期的自由粒子能量。这里没有出现量子化，也不该出现：自由粒子不受束缚，其谱是连续的。束缚才是换来分立能级的代价。
:::
:::

## 不确定性原理

::: theorem 广义不确定性原理 {#thm-uncertainty}
对任意两个可观测量 $\hat{A}$ 与 $\hat{B}$ 及任意态 $\psi$，
$$
\Delta A\,\Delta B \ \ge\ \frac{1}{2}\left|\left\langle\left[\hat{A}, \hat{B}\right]\right\rangle\right| ,
$$
其中 $\Delta A$ 是对全同制备体系测量 $A$ 的散布。取 $\hat{A} = \hat{x}$、$\hat{B} = \hat{p}_x$ 并用正则对易关系，得**海森堡（Heisenberg）关系**
$$
\Delta x\,\Delta p_x \ \ge\ \frac{\hbar}{2} .
$$
它约束的是*态*，不是仪器的巧妙程度：没有任何制备，无论多么精巧，能使两个散布同时更小。
:::

::: proof 从对易子到散布 {#proof-uncertainty}
写 $\hat{F} = \hat{A} - \langle A\rangle$、$\hat{G} = \hat{B} - \langle B\rangle$，则 $\Delta A^{2} = \langle\psi|\hat{F}^{2}|\psi\rangle$，$G$ 同理。对任意两个平方可积函数，柯西-施瓦茨不等式给出 $\langle F^{2}\rangle\langle G^{2}\rangle \ge \left|\langle FG\rangle\right|^{2}$（把 $\int|f + \lambda g|^{2} \ge 0$ 用于 $f = \hat{F}\psi$、$g = \hat{G}\psi$ 并对 $\lambda$ 取极小）。把 $\langle FG\rangle$ 拆成关于 $F \leftrightarrow G$ 对称与反对称的两部分：
$$
\langle FG\rangle = \tfrac{1}{2}\langle FG + GF\rangle + \tfrac{1}{2}\langle [F, G]\rangle ,
$$
并注意 $[F, G] = [A, B]$，因为平移一个数不改变对易子。第一项（对厄米算符）为实，第二项为纯虚，故 $\left|\langle FG\rangle\right|^{2} \ge \tfrac{1}{4}\left|\langle[A, B]\rangle\right|^{2}$，开方即得定理。对 $\hat{x}, \hat{p}_x$，对易子是数 $i\hbar$，其期望为 $i\hbar$，于是 $\Delta x\,\Delta p_x \ge \hbar/2$。
:::

::: example 把电子束缚在 $100\ \mathrm{pm}$ 内 {#ex-uncertainty}
一个电子被定域在 $\Delta x = 100\ \mathrm{pm}$（一个原子半径）内。估算其速率散布的下限与相应的动能，并与化学键能比较。
::: solution
定理给出
$$
\Delta p_x \ \ge\ \frac{\hbar}{2\Delta x}
= \frac{1.055\times10^{-34}}{2\times1.00\times10^{-10}}
= 5.3\times10^{-25}\ \mathrm{kg\,m\,s^{-1}},
$$
故 $\Delta v_x = \Delta p_x/m_\mathrm{e} = 5.8\times10^{5}\ \mathrm{m\,s^{-1}}$，约为光速的 $0.2\%$。把 $p \sim \Delta p$ 取作动量的尺度，
$$
K \sim \frac{(\Delta p)^{2}}{2m_\mathrm{e}}
= \frac{\left(5.3\times10^{-25}\right)^{2}}{2\times9.109\times10^{-31}}
= 1.5\times10^{-19}\ \mathrm{J} = 0.95\ \mathrm{eV}.
$$
$\Delta p$ 中二倍因子的约定会把这个数移动四倍，但结论是稳健的：把电子挤到原子大小要花费几电子伏的动能——与化学键（$1$–$10\ \mathrm{eV}$）同一货币。分子之所以稳定，*正因为*束缚成键电子的花费由势能偿还，而没有任何经典论证这样说。
:::
:::

::: example 电子为什么不住在核里 {#ex-nucleus}
核的半径只有几飞米。若把一个电子束缚在 $\Delta x = 5\ \mathrm{fm}$ 内，它的动能会是多少？这对 1932 年以前"核内含电子"的想法说明什么？
::: solution
此时 $\Delta p \ge \hbar/(2\Delta x) = 1.055\times10^{-34}/(1.0\times10^{-14}) = 1.1\times10^{-20}\ \mathrm{kg\,m\,s^{-1}}$。这个动量大到电子必然是相对论性的（$p \gg m_\mathrm{e}c = 2.7\times10^{-22}\ \mathrm{kg\,m\,s^{-1}}$），故用 $E \approx pc$：
$$
E \approx pc = 1.1\times10^{-20}\times2.998\times10^{8}
= 3.2\times10^{-12}\ \mathrm{J} = 20\ \mathrm{MeV}.
$$
核的贝塔电子以约 $1\ \mathrm{MeV}$ 的能量发射，小二十倍；而核子平均的结合能只有 $\sim8\ \mathrm{MeV}$：电子藏不进核里，因为把它束缚在那里花费的能量比核拥有的还多。问题的解决是中子（查德威克（Chadwick），1932）——核由质子与中子构成，贝塔电子是在发射的*瞬间被创生*的。这里的不确定性原理不是哲学，而是一台质谱仪。
:::
:::

## 波包与群速度

粒子*是*定域的，所以它的波函数必须是一个**波包**：许多德布罗意波的叠加，其相位在一点附近相加、在别处相消。

::: proposition 波包与傅里叶极限 {#prop-wavepacket}
由以 $k_0$ 为中心、散布为 $\Delta k$ 的波数组成的波包，其位置宽度 $\Delta x$ 受
$$
\Delta x\,\Delta k \ \ge\ \frac{1}{2}
$$
约束，这是傅里叶分析的一个定理，对高斯取等号。乘以 $\hbar$ 并用 $p = \hbar k$ 就恢复 $\Delta x\,\Delta p \ge \hbar/2$：不确定性原理就是穿上物理外衣的傅里叶极限。此外波包中心以**群速度** $v_\mathrm{g} = \mathrm{d}\omega/\mathrm{d}k$ 行进，而由 $E = \hbar\omega$ 与 $E = p^{2}/2m$ 得 $v_\mathrm{g} = \hbar k/m = p/m$——经典的粒子速率。波函数的相位以*相*速度 $E/p = v/2$ 行进；携带粒子的是群。
:::

::: widget fourier
wave: pulse
terms: 7
spectrum: true
caption: 一个定域的波包是许多波的叠加。周期脉冲的傅里叶级数部分和展示了其机制：项数少时"粒子"被抹进旁瓣，要把尖峰变锐就须加入短波成分——谱面板列出了一个波包所要求的波数。这就是窄的 $\Delta x$ 为什么迫使宽的 $\Delta k$，也是被束缚粒子的动能为什么随箱子缩小而增大——[[quantum-chemistry/model-systems]] 将对势箱给出定量结果。
:::

::: history
量子分三步到来。普朗克（Planck）1900 年 12 月用能量包 $h\nu$ 拟合黑体辐射，称他的常数是"一个纯粹形式上的假设"。爱因斯坦（Einstein）1905 年为使光电效应成立而把这些包变成实在——光*就是*量子——并因此（而非因相对论）获 1921 年诺贝尔奖。玻尔（Bohr）1913 年把一条量子条件嫁接到行星原子上，导出了氢的谱线，但机制仍不透明。德布罗意（de Broglie）1924 年提出物质波，戴维森（Davisson）与革末（Germer）1927 年衍射了电子；就在同两年里，海森堡（Heisenberg）用可观测的跃迁频率建立力学，薛定谔（Schrödinger）写出波动方程并求解了氢原子，玻恩（Born）把 $\psi$ 读作概率——他获 1954 年诺贝尔奖，而薛定谔与狄拉克（Dirac）分享 1933 年奖，获奖理由是"原子理论的新生产形式"。海森堡的不确定性论文发表于 1927 年；这里使用的广义对易形式出自罗伯逊（Robertson，1929），而狄拉克的《量子力学原理》（1930）把整个主题重写为不可对易可观测量的代数，本课的算符正是它的预演。
:::

## 后续内容

机器已经装配完毕；课程的其余部分都是应用。[[quantum-chemistry/model-systems]] 对势箱与环求解 [[#eq-tise]]，量子化、隧穿与共轭分子的势箱模型在那里以闭合形式出现。[[quantum-chemistry/vibration-rotation]] 加上振子与转子，它们的光谱是化学的指纹；[[quantum-chemistry/hydrogen-atom]] 则进攻本课开端的氢原子。当分离变量失效时，[[quantum-chemistry/approximation-methods]] 沿着普朗克妥协的精神继续：猜得好（变分），或围绕可解之物展开（微扰）。测量假设与 [[#prop-operators]] 的算符是 [[computational-chemistry/hartree-fock]] 的全部装备，而期望值公式 [[#eq-expect]] 是每一个算得的性质——偶极矩、电荷密度、跃迁能——最终从波函数上读出来的方式。

::: summary
- 经典物理以三种方式失败——紫外灾难、光电阈值、氢的线状光谱——每次失败迫使接受一条量子公设：能量以 $h\nu$ 的包交换、光即量子、具有分立能量的定态。
- 物质具有波长 $\lambda = h/p$；它对原子尺度的电子可观测（$54\ \mathrm{eV}$ 时 $0.1\ \mathrm{nm}$），对尘埃粒子则小到无望（$10^{-15}\ \mathrm{m}$），这就是日常世界看起来经典的原因。
- 波函数 $\psi$ 是概率振幅：$|\psi|^{2}$ 是概率密度（玻恩），归一化为一；期望值由 $\langle A\rangle = \int\psi^{*}\hat{A}\psi\,\mathrm{d}x$ 得出。
- 可观测量是厄米算符；可测量的值只是其本征值；而 $\hat{p}_x = -i\hbar\,\mathrm{d}/\mathrm{d}x$ 不与 $\hat{x}$ 对易——$\left[\hat{x},\hat{p}_x\right] = i\hbar$。
- 薛定谔方程 $\hat{H}\psi = E\psi$ 是本征值方程，其边界条件产生量子化；自由粒子不量子化，被束缚的才量子化。
- 不确定性原理 $\Delta x\,\Delta p \ge \hbar/2$ 由对易子导出，是波包的傅里叶性质，并给出数量级动能：原子中的电子约 $1\ \mathrm{eV}$，束缚在核里的电子约 $20\ \mathrm{MeV}$。
- 波包中心以群速度 $v_\mathrm{g} = \mathrm{d}\omega/\mathrm{d}k = p/m$ 运动，所以在两种描述都经典的场合，波与粒子一致。
:::

## 练习

::: exercise 电子波长 {level=1 check="1.23"}
求动能为 $1.00\ \mathrm{eV}$ 的电子的德布罗意波长。（以 $\mathrm{nm}$ 输入。）
::: solution
$\lambda = h/\sqrt{2m_\mathrm{e}E} = 6.626\times10^{-34}/\sqrt{2\times9.109\times10^{-31}\times1.602\times10^{-19}} = 1.23\times10^{-9}\ \mathrm{m} = 1.23\ \mathrm{nm}$——十个原子直径，这就是极慢的电子对表面与光栅衍射很强的原因。
:::
:::

::: exercise 光子能量 {level=1 check="1.89"}
$\mathrm{H}\alpha$ 线（$\lambda = 656.3\ \mathrm{nm}$）的光子能量是多少？（以 $\mathrm{eV}$ 输入。）
::: solution
$E = hc/\lambda = 1239.84/656.3 = 1.89\ \mathrm{eV}$。这正是 [[#prop-rydberg]] 的项差 $13.6\times(1/4 - 1/9)\ \mathrm{eV}$：光子能量与项值是同一笔账的两种货币。
:::
:::

::: exercise 光电阈值 {level=1 check="579"}
铯的功函数为 $2.14\ \mathrm{eV}$。波长多短以下的光无法从铯打出电子？（以 $\mathrm{nm}$ 输入。）
::: solution
$\lambda_0 = hc/\Phi = 1239.84/2.14 = 579\ \mathrm{nm}$——橙黄光。铯用于光电管，正因为其阈值落在可见光区；多数金属 $\Phi \sim 4$–$5\ \mathrm{eV}$，阈值在紫外。
:::
:::

::: exercise 电子速率 {level=2 check="4.36"}
求戴维森-革末实验所用 $54\ \mathrm{eV}$ 电子的速率。（以 $10^{6}\ \mathrm{m\,s^{-1}}$ 为单位输入。）
::: solution
$v = \sqrt{2E/m_\mathrm{e}} = \sqrt{2\times8.65\times10^{-18}/9.109\times10^{-31}} = 4.36\times10^{6}\ \mathrm{m\,s^{-1}}$，约为光速的 $1.5\%$——非相对论，初等公式安全。注意 $v$ 只由 $E$ 决定；$\lambda$ 由 $p$ 决定；两者合起来就是电子显微镜要看更小的东西需要提高加速电压、而不是换更亮的灯丝的原因。
:::
:::

::: exercise 归一化与概率 {level=2}
对线段例题的波函数 $\psi = Nx(L-x)$，计算粒子在线段左三分之一 $0 \le x \le L/3$ 内被找到的概率。
::: solution
由 $N^{2} = 30/L^{5}$，
$$
P = \frac{30}{L^{5}}\int_{0}^{L/3}x^{2}(L-x)^{2}\,\mathrm{d}x
= \frac{30}{L^{5}}\left[\frac{L^{2}x^{3}}{3} - \frac{Lx^{4}}{2} + \frac{x^{5}}{5}\right]_{0}^{L/3}
= 30\left(\frac{1}{81} - \frac{1}{162} + \frac{1}{1215}\right) = 0.259 .
$$
三分之一的长度里有四分之一的概率：密度在中心处最高，所以靠边的三分之一相对均匀分布是欠占据的。永远要检验 $0 \le P \le 1$ 与答案的对称性——这里右三分之一必须同样给出 $0.259$，中间三分之一给出 $0.482$。
:::
:::

::: exercise 束缚的代价 {level=2 check="5.8"}
共轭分子中的一个电子被定域在 $\Delta x = 10\ \mathrm{pm}$。估算其速率散布的下限。（以 $10^{6}\ \mathrm{m\,s^{-1}}$ 为单位输入。）
::: solution
$\Delta v \ge \hbar/(2m_\mathrm{e}\Delta x) = 1.055\times10^{-34}/(2\times9.109\times10^{-31}\times1.0\times10^{-11}) = 5.8\times10^{6}\ \mathrm{m\,s^{-1}}$。比原子情形紧十倍的束缚给出十倍的速率散布与一百倍的动能（$\sim95\ \mathrm{eV}$）：把电子挤进小空间是昂贵的，分子只有在势能退款时才会付这笔钱。
:::
:::

::: exercise 对易子代数 {level=3}
让 $\left[\hat{x}, \hat{p}_x^{2}\right]$ 与 $\left[\hat{x}^{2}, \hat{p}_x\right]$ 作用在试验函数上以计算这两个对易子。然后用 $[\hat{A},\hat{B}\hat{C}] = [\hat{A},\hat{B}]\hat{C} + \hat{B}[\hat{A},\hat{C}]$ 重新导出两者，并求 $\hat{H} = \hat{p}^{2}/2m + V(\hat{x})$ 的 $\left[\hat{H}, \hat{x}\right]$。
::: solution
作用在 $f(x)$ 上：$\hat{x}\hat{p}^{2}f = -\hbar^{2}x f''$，而 $\hat{p}^{2}\hat{x}f = -\hbar^{2}(xf)'' = -\hbar^{2}(xf'' + 2f')$；两者之差为 $2\hbar^{2}f' = 2i\hbar\hat{p}f$，故 $\left[\hat{x},\hat{p}^{2}\right] = 2i\hbar\hat{p}$。同理 $\left[\hat{x}^{2},\hat{p}\right] = 2i\hbar\hat{x}$。乘积法则可复现两者：$[\hat{x},\hat{p}^{2}] = [\hat{x},\hat{p}]\hat{p} + \hat{p}[\hat{x},\hat{p}] = 2i\hbar\hat{p}$。对哈密顿量，$V(\hat{x})$ 与 $\hat{x}$ 对易，故 $\left[\hat{H},\hat{x}\right] = \left[\hat{p}^{2},\hat{x}\right]/2m = -2i\hbar\hat{p}/2m = -i\hbar\hat{p}/m$。物理内容：$[\hat{H},\hat{x}] \ne 0$ 意味着位置不守恒——它的期望值在运动，$\mathrm{d}\langle x\rangle/\mathrm{d}t = \langle\hat{p}\rangle/m$，这就是埃伦费斯特（Ehrenfest）定理，牛顿第一定律在量子力学内部的遗存。
:::
:::

::: exercise 灾难，推导 {level=3}
由模式计数与能量均分推导瑞利-金斯定律，并明确证明经典能量密度发散。然后用 $\int_{0}^{\infty}\dfrac{x^{3}}{e^{x}-1}\,\mathrm{d}x = \pi^{4}/15$ 计算 $T = 5800\ \mathrm{K}$ 的*量子*总能量密度，与斯特藩-玻尔兹曼值 $u = 4\sigma T^{4}/c$ 比较。
::: solution
单位体积单位频率的模式数：$8\pi\nu^{2}/c^{3}$（盒中驻波，两种偏振）。能量均分给每个模式 $k_\mathrm{B}T$，故 $\rho(\nu)\,\mathrm{d}\nu = 8\pi\nu^{2}k_\mathrm{B}T\,\mathrm{d}\nu/c^{3}$，而 $\int_{0}^{\infty}\nu^{2}\,\mathrm{d}\nu \to \infty$：在*任何*温度下总量都是无穷——灾难。量子力学地，令 $x = h\nu/k_\mathrm{B}T$，
$$
u = \frac{8\pi(k_\mathrm{B}T)^{4}}{h^{3}c^{3}}\int_{0}^{\infty}\frac{x^{3}}{e^{x}-1}\,\mathrm{d}x
= \frac{8\pi^{5}k_\mathrm{B}^{4}}{15h^{3}c^{3}}T^{4},
$$
有限且正比于 $T^{4}$——斯特藩-玻尔兹曼浮现出来，$\sigma$ 只由 $h$、$c$、$k_\mathrm{B}$ 构成。在 $5800\ \mathrm{K}$：$u = 4\times5.67\times10^{-8}\times5800^{4}/2.998\times10^{8} = 7.9\times10^{8}\ \mathrm{J\,m^{-3}}$，一个有限的数，而经典理论在这里只给出无穷。把 $h$ 放在正确位置上的一个因子，就把无意义变成了温度计。
:::
:::

::: exercise 由不确定性原理求基态 {level=3}
把氢原子建模为把电子束缚在半径 $r$ 的球内，于是 $p \sim \hbar/r$，写出总能量
$$
E(r) = \frac{\hbar^{2}}{2m_\mathrm{e}r^{2}} - \frac{e^{2}}{4\pi\varepsilon_0 r}.
$$
对 $r$ 求极小，证明极小点恰在玻尔半径 $a_0 = 4\pi\varepsilon_0\hbar^{2}/m_\mathrm{e}e^{2}$ 处且 $E = -13.6\ \mathrm{eV}$，并用一句话解释原子为什么不塌缩到 $r = 0$、也不飞散开去。
::: solution
$\mathrm{d}E/\mathrm{d}r = -\hbar^{2}/m_\mathrm{e}r^{3} + e^{2}/4\pi\varepsilon_0 r^{2} = 0$ 给出 $r^{\ast} = 4\pi\varepsilon_0\hbar^{2}/m_\mathrm{e}e^{2} = a_0 = 52.9\ \mathrm{pm}$。代回，利用 $e^{2}/4\pi\varepsilon_0 = \hbar^{2}/m_\mathrm{e}a_0$：
$$
E(a_0) = \frac{\hbar^{2}}{2m_\mathrm{e}a_0^{2}} - \frac{\hbar^{2}}{m_\mathrm{e}a_0^{2}} = -\frac{\hbar^{2}}{2m_\mathrm{e}a_0^{2}} = -13.6\ \mathrm{eV},
$$
即氢原子基态能量的精确值（[[quantum-chemistry/approximation-methods]] 的变分定理保证任何猜测都打不过真实极小，而这里猜测恰是真相）。塌缩被阻止，是因为把电子定域到 $a_0$ 以下会抬高 $\Delta p \sim \hbar/r$，动能项 $\propto 1/r^{2}$ 跑赢势能 $\propto 1/r$；飞散被阻止，是因为势能阱在动能项衰减之前把电子拉回。原子是不确定性原理与库仑定律之间的休战——而这个不必解任何微分方程的估算，已经包含了每个分子最简单情形的大小与结合能。
:::
:::
