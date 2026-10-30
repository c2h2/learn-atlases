1970年，基特峰的一台射电望远镜调到$115.271\ \mathrm{GHz}$，从猎户座星云收到一条强发射线。这是一氧化碳的$J = 1 \to 0$跃迁，没有几年，CO就成为示踪恒星形成于其中的冷分子气体的标准手段。这一识别并不需要来自猎户座的实验室样品：其频率已在地球上测到七位有效数字，而分子的转动频率如此特有，一条线就能认出它。同一精度也使转动光谱学成为我们拥有的、测定小分子形状最精确的方法。从CO的一条线可得千分之一皮米精度的键长；从多原子分子的几个同位素异构体可得每一个键长与键角；从谱线在电场中的位移可得偶极矩。

本章以[[quantum-chemistry/vibration-rotation]]中求解的刚性转子为基础，那里已对双原子分子推导出项值$F(J) = \tilde BJ(J+1)$、选律$\Delta J = \pm1$以及按$J$的玻尔兹曼分布（[[quantum-chemistry/vibration-rotation#def-rotor]]、[[quantum-chemistry/vibration-rotation#prop-rot-sel]]）。我们把它向四个方向推广：到多原子分子，按其转动惯量分类；到边转边伸长的真实分子；到给出偶极矩的强度与斯塔克效应；以及到转动拉曼光谱——在那里，对称性与核自旋决定哪些谱线根本存在。一般的观念——跃迁矩、布居、线宽——见[[spectroscopy/spectroscopy-principles]]。原子质量取自2020年原子质量评估；常数为CODATA 2018值；分子常数取自胡贝尔（Huber）与赫茨伯格（Herzberg）的*Constants of Diatomic Molecules*以及科隆分子光谱数据库（CDMS），按处引用。

## 转动惯量与转子的分类

绕质心旋转的刚性分子的动能为$\tfrac12\boldsymbol\omega^\mathsf{T}\mathbf I\boldsymbol\omega$，其中$\mathbf I$为惯量张量。每个刚体都有三条互相垂直的**主轴**，使$\mathbf I$在其中为对角；转动问题——从而光谱——由三个主转动惯量决定。

::: definition 主转动惯量与转子类型 {#def-rotor-types}
对质量为$m_i$的原子到质心轴的距离为$r_{i,\perp}$的分子，绕该轴的转动惯量为$I = \sum_i m_i r_{i,\perp}^2$。绕主轴$a$、$b$、$c$的**主转动惯量**按$I_a \le I_b \le I_c$标记，相应的**转动常数**为
$$
\tilde A = \frac{h}{8\pi^2 cI_a}, \qquad \tilde B = \frac{h}{8\pi^2 cI_b}, \qquad \tilde C = \frac{h}{8\pi^2 cI_c}
$$ {#eq-rotconst}
（单位为$\mathrm{cm^{-1}}$；去掉因子$c$即为频率，单位MHz）。分子可分为
- **线性转子**：$I_a = 0$，$I_b = I_c$（$\mathrm{HCl}$、$\mathrm{CO_2}$、$\mathrm{HC{\equiv}CH}$、$\mathrm{OCS}$）；
- **对称陀螺**：两个转动惯量相等。**长形**（雪茄状）若$I_a < I_b = I_c$（$\mathrm{CH_3Cl}$、$\mathrm{CH_3C{\equiv}CH}$）；**扁形**（圆盘状）若$I_a = I_b < I_c$（$\mathrm{BF_3}$、$\mathrm{C_6H_6}$、$\mathrm{NH_3}$）；
- **球形陀螺**：$I_a = I_b = I_c$（$\mathrm{CH_4}$、$\mathrm{SF_6}$、$\mathrm{SiH_4}$）；
- **不对称陀螺**：三者互异（$\mathrm{H_2O}$、$\mathrm{CH_2O}$，大多数分子）。

任何带$n \ge 3$重$C_n$轴的分子至少是对称陀螺；有多于一条这类轴的分子（立方点群$T_\mathrm d$、$O_\mathrm h$、$I_\mathrm h$）是球形陀螺。
:::

对称性判据省去了计算：$\mathrm{CH_3Cl}$（$C_{3v}$）必为对称陀螺，只有计算才告诉你它是长形还是扁形。对氨，三个轻氢原子远离三重轴而重的氮在轴上，故绕该轴的转动惯量是较大的一个，分子为扁形；对氯甲烷，位于轴上的重氯对$I_a$没有贡献，却对$I_b$贡献巨大，分子因而为长形。

::: example 二氧化碳的转动惯量 {#ex-co2-inertia}
二氧化碳是线性且具对称中心的分子，$r(\mathrm{C{=}O}) = 116.0\ \mathrm{pm}$。求$I$与$\tilde B$，并说明它的纯转动光谱是什么样子。
::: solution
碳原子位于质心，不有贡献。每个氧原子离轴$116.0\ \mathrm{pm}$：
$$
I = 2m_\mathrm{O}r^2 = 2(15.9949 \times 1.66054\times10^{-27}\ \mathrm{kg})(1.160\times10^{-10}\ \mathrm{m})^2 = 7.148\times10^{-46}\ \mathrm{kg\,m^2} ,
$$
且$\tilde B = h/8\pi^2 cI = 0.392\ \mathrm{cm^{-1}}$，与其红外带转动结构给出的实测值$\tilde B_0 = 0.3902\ \mathrm{cm^{-1}}$接近。但$\mathrm{CO_2}$**没有纯转动光谱**：它有对称中心，因而没有永久偶极矩，而微波吸收的宏观选律是非零的永久偶极。它的转动常数转而由振动–转动带（[[spectroscopy/vibrational-spectroscopy]]）或转动拉曼效应测得，后者的宏观选律不同（见本章后文）。
:::
:::

## 线性分子：谱线位置与离心畸变

对刚性线性转子，能级为$F(J) = \tilde BJ(J+1)$，每一能级$(2J+1)$重简并，$\Delta J = +1$的吸收给出位于$\tilde\nu = 2\tilde B(J+1)$的谱线——一组等间距、相邻间隔$2\tilde B$的谱线阶梯。实测光谱显示，间隔随$J$升高而极缓慢地*减小*。原因是物理的：旋转的分子被离心力拉开，键长伸长，转动惯量增大，转动能量落到刚性转子值以下。

::: proposition 双原子转子的离心畸变 {#prop-cd}
对谐振力常数为$k_\mathrm{f}$、平衡键长为$r_\mathrm{e}$的双原子分子，畸变的一阶项值为
$$
F(J) = \tilde BJ(J+1) - \tilde DJ^2(J+1)^2, \qquad \tilde D = \frac{4\tilde B^3}{\tilde\omega^2} ,
$$ {#eq-cd}
其中$\tilde\omega = (1/2\pi c)\sqrt{k_\mathrm{f}/\mu}$是谐振振动波数（Kratzer关系）。吸收线$J+1 \leftarrow J$位于
$$
\tilde\nu(J+1\leftarrow J) = 2\tilde B(J+1) - 4\tilde D(J+1)^3 .
$$ {#eq-cd-lines}
:::

::: proof 离心力与键力的平衡
把分子经典地处理为：约化质量$\mu$距轴$r$、以角动量$L$旋转，并由一根弹簧系住。其能量为$E = L^2/2\mu r^2 + \tfrac12 k_\mathrm{f}(r - r_\mathrm{e})^2$。在固定$L$下，键调整到使$E$最小：$\partial E/\partial r = -L^2/\mu r^3 + k_\mathrm{f}(r - r_\mathrm{e}) = 0$，即弹簧力与离心力平衡。对小的伸长$\delta = r - r_\mathrm{e}$，第一项中可取$r = r_\mathrm{e}$：$\delta = L^2/k_\mathrm{f}\mu r_\mathrm{e}^3$。展开$1/r^2 = (1/r_\mathrm{e}^2)(1 - 2\delta/r_\mathrm{e} + \cdots)$，
$$
E = \frac{L^2}{2\mu r_\mathrm{e}^2} - \frac{L^2\delta}{\mu r_\mathrm{e}^3} + \frac12 k_\mathrm{f}\delta^2 = \frac{L^2}{2\mu r_\mathrm{e}^2} - \frac{L^4}{2k_\mathrm{f}\mu^2r_\mathrm{e}^6} .
$$
量子化$L^2 = \hbar^2J(J+1)$（[[quantum-chemistry/vibration-rotation#prop-amom]]）并除以$hc$，得$F(J) = \tilde BJ(J+1) - \tilde DJ^2(J+1)^2$，其中$\tilde B = \hbar^2/2\mu r_\mathrm{e}^2hc$、$\tilde D = \hbar^4/2k_\mathrm{f}\mu^2r_\mathrm{e}^6hc$。代入$k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$并与$\tilde B^3 = \hbar^6/8\mu^3r_\mathrm{e}^6h^3c^3$比较，约简后即得$\tilde D = 4\tilde B^3/\tilde\omega^2$。谱线位置由$F(J+1) - F(J)$得出：刚性部分给出$2\tilde B(J+1)$，而$(J+1)^2(J+2)^2 - J^2(J+1)^2 = (J+1)^2\left[(J+2)^2 - J^2\right] = 4(J+1)^3$。
:::

$\tilde D$极小——典型双原子分子约为$\tilde B$的$10^{-6}$倍——但微波频率测得极其精确，以致总是少不了它，而Kratzer关系把它变成了从纯转动光谱估计振动频率的途径。多原子分子需要好几个畸变常数，而且真实分子还在另一方面不刚性：它们会振动，所以振动量子数$v$的能级上测得的$\tilde B_v$是$1/r^2$的平均，并随$v$略有变化，$\tilde B_v = \tilde B_\mathrm{e} - \alpha_\mathrm{e}(v + \tfrac12)$。

::: example 一氧化碳的微波光谱 {#ex-co-lines}
对基振动态的$^{12}\mathrm{C}^{16}\mathrm{O}$，$B_0 = 57\,635.968\ \mathrm{MHz}$、$D_0 = 0.1835\ \mathrm{MHz}$（CDMS）。(a) 预告前三条吸收线。(b) 求基态键长$r_0$。(c) 用$\tilde B_\mathrm{e} = 1.931\,28\ \mathrm{cm^{-1}}$与$\tilde\omega_\mathrm{e} = 2169.81\ \mathrm{cm^{-1}}$（胡贝尔与赫茨伯格）检验Kratzer关系。
::: solution
(a) 由[[#eq-cd-lines]]（以频率为单位），$\nu = 2B_0(J+1) - 4D_0(J+1)^3$：
$$
\nu(1\leftarrow0) = 115\,271.936 - 0.734 = 115\,271.20\ \mathrm{MHz},\quad
\nu(2\leftarrow1) = 230\,543.87 - 5.87 = 230\,538.00\ \mathrm{MHz},\quad
\nu(3\leftarrow2) = 345\,815.81 - 19.82 = 345\,795.99\ \mathrm{MHz} .
$$
这些值与实测谱线相符到$0.01\ \mathrm{MHz}$以内；若没有畸变项，第三条线将偏离$20\ \mathrm{MHz}$，是测量误差的两千倍。

(b) $\mu = (12.000 \times 15.9949)/27.9949\ \mathrm{u} = 6.85621\ \mathrm{u} = 1.13851\times10^{-26}\ \mathrm{kg}$。由$I = h/8\pi^2B_0$（$B_0$以Hz计）得$I = 1.456\,04\times10^{-46}\ \mathrm{kg\,m^2}$，$r_0 = \sqrt{I/\mu} = 113.09\ \mathrm{pm}$。这是基态平均键长（严格地说是$\langle r^{-2}\rangle^{-1/2}$）；由$\tilde B_\mathrm{e}$得到的平衡值$r_\mathrm{e} = 112.83\ \mathrm{pm}$更短，因为$v = 0$中的非谐振动更常访问较长的距离（[[quantum-chemistry/vibration-rotation#ex-co-bond]]）。

(c) $4\tilde B_\mathrm{e}^3/\tilde\omega_\mathrm{e}^2 = 4(1.931\,28)^3/(2169.81)^2 = 6.120\times10^{-6}\ \mathrm{cm^{-1}}$，即$6.120\times10^{-6} \times 29\,979.2\ \mathrm{MHz} = 0.1835\ \mathrm{MHz}$——与实测$D_0$四位相符。在此精度下，双原子分子就是一个连着谐振弹簧的转子。
:::
:::

### 同位素取代

玻恩–奥本海默近似使势能曲线——从而$r_\mathrm{e}$——对所有同位素异构体相同；改变的只有质量。因此到很好的近似$\tilde B \propto 1/\mu$，一个同位素异构体的一条实测谱线就预告了所有其他异构体的谱线。星际光谱中的$^{13}\mathrm{CO}$、$\mathrm{C^{18}O}$及其他同位素异构体就是这样识别的；反过来说，这正是同位素取代成为多原子分子结构之关键的原因：每次取代改变转动惯量的方式都取决于被取代原子所处的*位置*。

对含$N$个原子的线性多原子分子，有$N - 1$个键长，而每个同位素异构体只给出一个转动惯量，故需要$N - 1$个同位素异构体。实用的途径有两条。**$r_0$结构**把分子当作刚性的，用所有同位素异构体的基态转动惯量拟合键长。**取代（$r_\mathrm{s}$）结构**使用Kraitchman方程，直接从转动惯量的*改变量*确定每个被取代原子的位置；对线性分子，原子沿轴的坐标（从母体分子的质心量起）为
$$
\lvert z\rvert = \sqrt{\frac{\Delta I}{\mu_\mathrm{s}}}, \qquad \mu_\mathrm{s} = \frac{M\,\Delta m}{M + \Delta m},
$$ {#eq-kraitchman}
其中$M$是母体分子的质量，$\Delta m$是质量的改变量。由于振动平均对母体与取代分子的影响类似，误差部分抵消，$r_\mathrm{s}$结构通常比$r_0$结构更接近$r_\mathrm{e}$。

::: example 硫化羰的结构 {#ex-ocs}
$^{16}\mathrm{O}^{12}\mathrm{C}^{32}\mathrm{S}$与$^{16}\mathrm{O}^{12}\mathrm{C}^{34}\mathrm{S}$的基态转动常数为$B_0 = 6081.49$与$5932.83\ \mathrm{MHz}$（CDMS）。求(a) 两个转动惯量，(b) 由Kraitchman方程求硫原子到质心的距离，以及(c) $r_0$键长。
::: solution
(a) 用$\mathrm{u\,pm^2}$作单位很方便：$I = h/8\pi^2B = 5.0538\times10^{9}\ \mathrm{u\,pm^2\,MHz}/B$。于是$I(^{32}\mathrm{S}) = 831\,012$、$I(^{34}\mathrm{S}) = 851\,835\ \mathrm{u\,pm^2}$；硫更重，惯量更大。

(b) $M = 15.9949 + 12.0000 + 31.9721 = 59.9670\ \mathrm{u}$，$\Delta m = 1.9958\ \mathrm{u}$，故$\mu_\mathrm{s} = 59.9670 \times 1.9958/61.9628 = 1.9315\ \mathrm{u}$。代入$\Delta I = 20\,823\ \mathrm{u\,pm^2}$，[[#eq-kraitchman]]给出$\lvert z_\mathrm{S}\rvert = \sqrt{20\,823/1.9315}\ \mathrm{pm} = 103.8\ \mathrm{pm}$：硫原子位于距母体分子质心$103.8\ \mathrm{pm}$处。

(c) 把O放在$z = 0$，C放在$z = r_1 = r(\mathrm{CO})$，S放在$z = r_1 + r_2$。对每个同位素异构体，$I = \sum m_iz_i^2 - (\sum m_iz_i)^2/M$。两个方程，两个未知数；数值求解（从$r_1 = 116$、$r_2 = 156\ \mathrm{pm}$出发牛顿法几步即收敛）得
$$
r_0(\mathrm{C{=}O}) = 116.3\ \mathrm{pm}, \qquad r_0(\mathrm{C{=}S}) = 156.0\ \mathrm{pm} .
$$
由众多同位素异构体与振动–转动常数得到的平衡结构为$r_\mathrm{e}(\mathrm{CO}) \approx 115.4$、$r_\mathrm{e}(\mathrm{CS}) \approx 156.0\ \mathrm{pm}$。C=O值对振动平均更敏感，因为碳位于质心附近，$I$的微小误差在此转化为位置的大误差——这是所有质心附近原子的结构的通病，也是讲究的工作在给出数值的同时注明结构类型（$r_\mathrm{e}$、$r_0$、$r_\mathrm{s}$）的原因。
:::
:::

## 强度：哪些谱线最强

线性转子的选律是$\Delta J = \pm1$，宏观要求是具有永久偶极$\mu_0$。要预告整张谱，还需要每条线的强度。把跃迁矩与[[spectroscopy/spectroscopy-principles#prop-net]]的布居合并起来即得答案。

::: proposition 转动吸收线的强度 {#prop-rot-int}
对偶极矩为$\mu_0$的线性分子，温度为$T$的气体中谱线$J+1 \leftarrow J$的积分吸收系数正比于
$$
S_J \propto \tilde\nu_J\,\mu_0^2\,(J+1)\,\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}\left(1 - \mathrm{e}^{-hc\tilde\nu_J/k_\mathrm{B}T}\right), \qquad \tilde\nu_J = 2\tilde B(J+1) .
$$ {#eq-rot-int}
当$hc\tilde\nu_J \ll k_\mathrm{B}T$时它近似正比于$(J+1)^3\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}$，最强谱线的下能级为
$$
J_\mathrm{peak} \approx \sqrt{\frac{3k_\mathrm{B}T}{2hc\tilde B}} - 1 ,
$$ {#eq-jpeak}
高于布居最多的能级$J_\mathrm{pop} \approx \sqrt{k_\mathrm{B}T/2hc\tilde B} - \tfrac12$。
:::

::: proof
跃迁的积分吸收正比于$\tilde\nu_\mathrm{fi}\lvert\boldsymbol\mu_\mathrm{fi}\rvert^2$（[[spectroscopy/spectroscopy-principles#eq-osc-mu]]）乘以每个态的布居差（[[spectroscopy/spectroscopy-principles#prop-net]]）。对转子，从$J$的某一个$M$子能级出发、对$J+1$的各子能级求和的跃迁矩平方对所有$M$都相同，等于$\mu_0^2(J+1)/(2J+1)$（角动量代数的标准结果；$J = 0$时化为$\mu_0^2$，此时偶极的三个分量把$J = 0$连到$J = 1$的三个子能级，各为$\mu_0^2/3$）。$2J+1$个子能级的总布居为$N(2J+1)\mathrm{e}^{-hc\tilde BJ(J+1)/k_\mathrm{B}T}/q$。相乘后因子$2J+1$相消，即得[[#eq-rot-int]]，其中$1 - \mathrm{e}^{-x}$计入受激发射。$x$小时$1 - \mathrm{e}^{-x} \approx x \propto (J+1)$，又$\tilde\nu_J \propto J+1$，故近似地$S_J \propto (J+1)^3\mathrm{e}^{-\beta(J+1)^2}$，$\beta = hc\tilde B/k_\mathrm{B}T$（把$J(J+1)$换成$(J+1)^2$，这只改变常数因子）。令对$J+1$的导数为零：$3/(J+1) = 2\beta(J+1)$，故$(J+1)^2 = 3/2\beta$，即[[#eq-jpeak]]。布居极大由$\mathrm{d}[(2J+1)\mathrm{e}^{-\beta J(J+1)}]/\mathrm{d}J = 0$得$J = \sqrt{1/2\beta} - \tfrac12$（[[quantum-chemistry/vibration-rotation#ex-jstar]]）。
:::

::: widget plot
f: (300/t)^2*sum(3.84506*(j+1)^2*exp(-2.76607*j*(j+1)/t)*(1 - exp(-5.53214*(j+1)/t))/(1 + (x - 3.84506*(j+1))^2/g^2), j, 0, 60)
x: 0, 160
sliders: t=300:10:1000:10; g=0.6:0.2:4:0.1
labels: \text{吸收（相对强度）}
caption: 按式[[#eq-rot-int]]画出的$^{12}\mathrm{C}^{16}\mathrm{O}$（$\tilde B_0 = 1.9225\ \mathrm{cm^{-1}}$）纯转动吸收谱，横轴为以$\mathrm{cm^{-1}}$计的波数。滑块`t`为以开尔文计的温度，`g`为每条线的半宽（$\mathrm{cm^{-1}}$，为让谱线可见而大大夸张；真实多普勒宽度约为$10^{-5}\ \mathrm{cm^{-1}}$）。谱线等间距$2\tilde B$；$300\ \mathrm{K}$时最强的是$50\ \mathrm{cm^{-1}}$附近的$J = 13 \leftarrow 12$，而布居最多的能级是$J = 7$。把温度降到星际云典型的$10\ \mathrm{K}$，只剩最初几条线——这就是射电天文学家在$115$与$230\ \mathrm{GHz}$观测CO的原因。
:::

::: warning 最强谱线并非布居最多的能级
一个常见错误是把转动光谱的峰认作布居最多的$J$，并用公式$J_\mathrm{pop} = \sqrt{k_\mathrm{B}T/2hc\tilde B} - \tfrac12$。那个公式给出的是*布居*的峰，不是*吸收*的峰。吸收中还有两个因子随$J$增长：光子频率（$S \propto \tilde\nu$），以及两能级间的布居差——当$hc\tilde\nu \ll k_\mathrm{B}T$时它也正比于$\tilde\nu$。两者一起把最强谱线推到$J_\mathrm{peak} \approx \sqrt{3}\,J_\mathrm{pop}$。相比之下，在振动–转动带中，光子频率在整个带内几乎不变且$1 - \mathrm{e}^{-x} = 1$，所以最强谱线*确实*来自约$J_\mathrm{pop}$——[[quantum-chemistry/vibration-rotation]]处理的就是这种情形。套用任一公式之前，先弄清手里是哪类光谱。
:::

## 对称陀螺、球形陀螺与不对称陀螺

### 对称陀螺

对称陀螺需要两个量子数：总角动量的$J$，以及它沿独特轴（对称轴）分量的$K$（$K = 0, \pm1, \ldots, \pm J$）。长形陀螺的动能$J_a^2/2I_a + (J_b^2 + J_c^2)/2I_b$可写成$\mathbf J^2/2I_b + J_a^2(1/2I_a - 1/2I_b)$，两项都有确定的量子值。

::: proposition 对称陀螺的项值与光谱 {#prop-symtop}
刚性长形对称陀螺的项值为
$$
F(J, K) = \tilde BJ(J+1) + (\tilde A - \tilde B)K^2 ,
$$ {#eq-symtop}
扁形陀螺同理，只需把$\tilde A$换成$\tilde C$。$K \neq 0$的能级在$\pm K$之间双重简并（除$M$的$(2J+1)$重简并外）。由于永久偶极沿对称轴，选律为$\Delta J = \pm1$与$\Delta K = 0$，刚性转子谱线落在$\tilde\nu = 2\tilde B(J+1)$，与$K$和$\tilde A$无关。离心畸变（附加项$-\tilde D_JJ^2(J+1)^2 - \tilde D_{JK}J(J+1)K^2 - \tilde D_KK^4$）把每条线分裂为$J+1$个分量：
$$
\tilde\nu(J+1, K \leftarrow J, K) = 2\tilde B(J+1) - 4\tilde D_J(J+1)^3 - 2\tilde D_{JK}(J+1)K^2 .
$$ {#eq-symtop-lines}
:::

::: proof
$\hat{\mathbf J}^2$的本征值为$\hbar^2J(J+1)$、$\hat J_a$的本征值为$K\hbar$，能量$\hbar^2J(J+1)/2I_b + K^2\hbar^2(1/2I_a - 1/2I_b)$除以$hc$，按[[#eq-rotconst]]的定义即得[[#eq-symtop]]；能量依赖$K^2$，故有$\pm K$简并。偶极沿对称轴，它沿该轴的分量不随绕轴旋转而改变；它不能改变绕轴的角动量，故$\Delta K = 0$。跃迁矩的其余部分行为如同线性转子，给出$\Delta J = \pm1$。于是$\tilde\nu = F(J+1, K) - F(J, K) = 2\tilde B(J+1)$，$K^2$项相消。畸变项中，$J^2(J+1)^2$给出$4(J+1)^3$，同[[#prop-cd]]；$\left[(J+1)(J+2) - J(J+1)\right]K^2 = 2(J+1)K^2$；$K^4$相消。下能级中$\lvert K\rvert \le J$，故$K^2$取$J+1$个不同的值，给出$J+1$个分量。
:::

因此绕对称轴的转动常数$\tilde A$无法从纯转动光谱测得，因为偶极绕自身所在轴的旋转不使它移动；它由垂直带的振动–转动光谱或拉曼光谱给出。卤代甲烷、氨与磷化氢是经典例子；氨还额外多出反转分裂的复杂情形——氮穿过氢平面的隧穿——它产生了氨微波激射器的$24\ \mathrm{GHz}$反转线。

### 球形陀螺与不对称陀螺

球形陀螺有$F(J) = \tilde BJ(J+1)$，简并度$(2J+1)^2$，但由对称性它没有永久偶极矩，因此没有纯转动光谱。（甲烷的离心畸变给它一个微小的感应偶极，以及一条相应微弱、需长光程才能观测的光谱——一个有趣的事实，说明"禁戒"只是"极弱"。）不对称陀螺的能级没有闭合公式：每个$J$给出$2J+1$个能级，用长形与扁形极限的$K$值标记为$J_{K_aK_c}$，对每个$J$对角化一个小矩阵求得。它们的光谱看似无规，但完全可以由$\tilde A$、$\tilde B$、$\tilde C$与畸变常数预告；现代微波光谱学——用脉冲分子束与啁啾脉冲傅里叶变换仪器——已能例行测定含二十个以上原子分子的完整结构，甚至能在气相中分辨构象异构体乃至对映异构体。

::: quiz 哪些分子有纯转动光谱？
下列哪些分子显示纯转动（微波）吸收光谱？（选出所有符合的。）
- [x] $\mathrm{H_2O}$
- [ ] $\mathrm{CH_4}$（极弱的畸变诱导光谱除外）
- [x] $\mathrm{CH_3Cl}$
- [ ] $\mathrm{N_2}$
- [ ] $\mathrm{SF_6}$
- [x] $\mathrm{OCS}$
::: solution
宏观选律要求非零的永久电偶极矩。水（不对称陀螺，$C_{2v}$）、氯甲烷（长形对称陀螺，$C_{3v}$）与硫化羰（线性，$C_{\infty v}$）有极性。甲烷与六氟化硫是无偶极的球形陀螺，$\mathrm{N_2}$是同核分子。然而除极化率各向同性的球形陀螺外，六种分子都有转动拉曼光谱。
:::
:::

## 斯塔克效应与偶极矩

电场$\boldsymbol{\mathcal E}$通过$\hat H' = -\boldsymbol\mu\cdot\boldsymbol{\mathcal E} = -\mu_0\mathcal E\cos\theta$与分子偶极相互作用，其中$\theta$是分子轴与场的夹角。场打破自由空间的球对称，解除部分$M$简并。线性分子没有一阶斯塔克效应（$\cos\theta$在转子态中的期望值为零），位移对$\mathcal E$是二阶的，其大小依赖于$\mu_0^2$——这是测定气相分子偶极矩最精确的途径。

::: proposition 线性转子的二阶斯塔克效应 {#prop-stark}
在$\mathcal E$小到$\mu_0\mathcal E \ll hB$（$B$为以频率为单位的转动常数）的场中，线性分子的能级移动为
$$
\Delta E(J, M) = \frac{\mu_0^2\mathcal E^2}{2hB}\,\frac{J(J+1) - 3M^2}{J(J+1)(2J-1)(2J+3)} \quad (J \ge 1), \qquad \Delta E(0, 0) = -\frac{\mu_0^2\mathcal E^2}{6hB} .
$$ {#eq-stark}
$\lvert M\rvert$相同的能级保持简并。特别地$\Delta E(1, 0) = +\mu_0^2\mathcal E^2/10hB$、$\Delta E(1, \pm1) = -\mu_0^2\mathcal E^2/20hB$，因此$J = 1 \leftarrow 0$线分裂为一个（$M = 0 \leftarrow 0$，辐射沿场方向偏振时观测到）频率移动$+\tfrac{4}{15}\mu_0^2\mathcal E^2/h^2B$的分量，与另一个（$M = \pm1 \leftarrow 0$，垂直偏振）移动$+\tfrac{7}{60}\mu_0^2\mathcal E^2/h^2B$的分量。
:::

::: proof 基能级
我们证明$J = 0$的结果，它已显示出一般结果的结构。按二阶微扰论（[[quantum-chemistry/approximation-methods]]），$\Delta E_0 = \sum_{n\neq0}\lvert\langle n\vert\hat H'\vert 0\rangle\rvert^2/(E_0 - E_n)$。算符$\cos\theta$正比于球谐函数$Y_{1,0}$，故它只把$Y_{0,0}$连到$Y_{1,0}$：$\langle 1,0\vert\cos\theta\vert 0,0\rangle = 1/\sqrt3$。能隙为$E_0 - E_1 = -2hB$。于是
$$
\Delta E(0,0) = \frac{(\mu_0\mathcal E)^2/3}{-2hB} = -\frac{\mu_0^2\mathcal E^2}{6hB} .
$$
$J \ge 1$时，能级被$J+1$压低、被$J-1$抬高，矩阵元$\langle J\pm1, M\vert\cos\theta\vert J, M\rangle$来自角动量代数；合并两项即得[[#eq-stark]]的一般公式。取$J = 1$：$M = 0$给出$(2)/(2\cdot1\cdot5) = \tfrac15$，即$+\mu_0^2\mathcal E^2/10hB$；$M = \pm1$给出$(2 - 3)/10 = -\tfrac1{10}$，即$-\mu_0^2\mathcal E^2/20hB$。谱线位移是上、下能级位移之差除以$h$：以$\mu_0^2\mathcal E^2/h^2B$为单位，$(\tfrac1{10} + \tfrac16) = \tfrac4{15}$与$(-\tfrac1{20} + \tfrac16) = \tfrac7{60}$。
:::

::: example 硫化羰的偶极矩 {#ex-stark}
对OCS，$B_0 = 6081.49\ \mathrm{MHz}$，$J = 1 \leftarrow 0$线在$12\,162.98\ \mathrm{MHz}$处。在均匀场为$2.00\ \mathrm{kV\,cm^{-1}}$的斯塔克样品池中，$M = 0 \leftarrow 0$分量向上移动$22.74\ \mathrm{MHz}$。求偶极矩。
::: solution
由[[#prop-stark]]，$\Delta\nu = \tfrac{4}{15}\mu_0^2\mathcal E^2/h^2B$，故
$$
\mu_0 = \frac{h}{\mathcal E}\sqrt{\frac{15\,B\,\Delta\nu}{4}} = \frac{6.6261\times10^{-34}\ \mathrm{J\,s}}{2.00\times10^{5}\ \mathrm{V\,m^{-1}}}\sqrt{\frac{15 (6.08149\times10^{9}\ \mathrm{s^{-1}})(2.274\times10^{7}\ \mathrm{s^{-1}})}{4}} = 2.386\times10^{-30}\ \mathrm{C\,m} .
$$
除以$1\ \mathrm{D} = 3.33564\times10^{-30}\ \mathrm{C\,m}$得$\mu_0 = 0.715\ \mathrm{D}$（德拜），与公认值$0.7152\ \mathrm{D}$相符。检验微扰条件：$\mu_0\mathcal E/h = 2.386\times10^{-30} \times 2.00\times10^{5}/6.626\times10^{-34} = 720\ \mathrm{MHz}$，比$2B = 12\,163\ \mathrm{MHz}$低一个数量级，故二阶理论足够。由于OCS的偶极矩精确已知且光谱简单，它的斯塔克线被用来校准斯塔克样品池中的场。
:::
:::

::: widget plot
f: -21.315*(m/0.71519)^2*x^2/6; 21.315*(m/0.71519)^2*x^2/10; -21.315*(m/0.71519)^2*x^2/20
x: 0, 5
sliders: m=0.71519:0.1:2:0.01
labels: J=0,\ M=0; J=1,\ M=0; J=1,\ M=\pm1
caption: 由[[#eq-stark]]画出的$B = 6081.49\ \mathrm{MHz}$线性分子$J = 0$与$J = 1$能级的二阶斯塔克位移（MHz，从各能级的零场能量量起），横轴为以$\mathrm{kV\,cm^{-1}}$计的场强。滑块`m`为以德拜计的偶极矩（起点为OCS的值$0.715\ \mathrm{D}$）。$J = 0$能级总是被压低（它只能与上方的能级作用）；$J = 1$、$M = 0$被抬高而$M = \pm1$被压低，因此$J = 1 \leftarrow 0$线分裂为间隔按$\mu_0^2\mathcal E^2$增长的两个分量。偶极矩加倍，每个位移变为四倍。高场下（对较大的偶极矩，已超出图示范围）抛物线失效，因为$\mu_0\mathcal E$不再远小于$hB$。
:::

## 转动拉曼光谱与核自旋统计

没有偶极的分子并没有被转动光谱学抛弃。在拉曼散射（[[spectroscopy/vibrational-spectroscopy#def-raman]]）中，入射光感应出偶极$\boldsymbol\mu_\mathrm{ind} = \boldsymbol\alpha\boldsymbol{\mathcal E}$，若极化率$\boldsymbol\alpha$依赖于分子的取向，转动就会调制散射光。

::: proposition 转动拉曼选律与谱线位置 {#prop-rot-raman}
若分子的极化率**各向异性**（除球形陀螺外的一切分子），它就有转动拉曼光谱。对线性分子，具体选律为$\Delta J = 0, \pm2$。斯托克斯线（$\Delta J = +2$，**S支**）与反斯托克斯线（$\Delta J = -2$）位于
$$
\tilde\nu = \tilde\nu_0 \mp \left[F(J+2) - F(J)\right] = \tilde\nu_0 \mp \tilde B(4J + 6), \qquad J = 0, 1, 2, \ldots ,
$$ {#eq-raman-lines}
因此第一条线偏离激发线$6\tilde B$，相邻谱线间隔$4\tilde B$；$\Delta J = 0$贡献于不位移的瑞利线。
:::

::: proof 经典图像，然后是量子选律
设线性分子沿其轴的极化率为$\alpha_\parallel$、垂直方向为$\alpha_\perp$，它在包含场方向的平面内以角频率$\omega_\mathrm{rot}$旋转，分子轴与场的夹角为$\theta = \omega_\mathrm{rot}t$。沿场的极化率为$\alpha(t) = \alpha_\perp + \Delta\alpha\cos^2\theta = \alpha_\perp + \tfrac12\Delta\alpha + \tfrac12\Delta\alpha\cos 2\omega_\mathrm{rot}t$，其中$\Delta\alpha = \alpha_\parallel - \alpha_\perp$。乘以场$\mathcal E_0\cos\omega_0t$，产生以$\omega_0$与$\omega_0 \pm 2\omega_\mathrm{rot}$振荡的感应偶极——是转动频率的两倍，因为极化率椭球转半圈后回到同一取向。若$\Delta\alpha = 0$散射消失，这就是宏观选律。量子力学中，$\boldsymbol\alpha$的各向异性部分像$\cos^2\theta - \tfrac13$那样变换，后者正比于$Y_{2,0}$；矩阵元$\langle J'\vert Y_{2,0}\vert J\rangle$除非$\lvert J' - J\rvert \le 2$且$J' - J$为偶（宇称）否则为零，故$\Delta J = 0, \pm2$。最后$F(J+2) - F(J) = \tilde B\left[(J+2)(J+3) - J(J+1)\right] = \tilde B(4J + 6)$。
:::

对同核双原子分子，光谱中出现了值得注意的事：间隔的谱线强度不同，某些分子每隔一条线就缺失一条。原因是把泡利原理应用于原子核。

::: proposition 同核双原子分子的核自旋统计 {#prop-spin-stat}
处于$^1\Sigma_\mathrm{g}^+$电子态、核自旋为$I$的同核双原子分子，偶数与奇数$J$能级的核自旋统计权重之比为
$$
\frac{g(\text{奇数 } J)}{g(\text{偶数 } J)} = \frac{I+1}{I}\ \ \text{半整数 } I\ (\text{费米子}), \qquad \frac{g(\text{偶数 } J)}{g(\text{奇数 } J)} = \frac{I+1}{I}\ \ \text{整数 } I\ (\text{玻色子}) .
$$ {#eq-spin-stat}
$I = 0$时，一种宇称的能级完全不存在。因此$\mathrm{H_2}$（$I = \tfrac12$）奇数$J$与偶数$J$之比为$3 : 1$；$^{14}\mathrm{N_2}$（$I = 1$）偶数与奇数之比为$2 : 1$；$^{12}\mathrm{C}^{16}\mathrm{O_2}$（两个可交换的氧核$I = 0$）只有偶数$J$的能级。
:::

::: proof 对称与反对称自旋态的计数
交换两个全同核必须使总波函数对玻色子乘$+1$、对费米子乘$-1$。对$^1\Sigma_\mathrm{g}^+$态，电子部分与振动部分在交换下不变，转动部分$Y_{J,M}$乘$(-1)^J$（交换等价于使核间矢量反向）。两个自旋$I$给出$(2I+1)^2$个乘积态，其中$(2I+1)(I+1)$个对交换对称、$(2I+1)I$个反对称（$I = \tfrac12$时：三重态3个、单重态1个）。费米子的整体必须反对称，故奇数$J$（反对称转动）与对称自旋函数配对、偶数$J$与反对称自旋函数配对：$g(\text{奇})/g(\text{偶}) = (I+1)/I$。玻色子的整体必须对称，故偶数$J$与对称自旋函数配对：$g(\text{偶})/g(\text{奇}) = (I+1)/I$。若$I = 0$只有一个自旋函数，对称，玻色子只有偶数$J$。$\mathrm{O_2}$的基态是$^3\Sigma_\mathrm{g}^-$，其电子函数在交换下变号，所以在$^{16}\mathrm{O_2}$中存活的是*奇数*转动量子数的能级。
:::

$\mathrm{H_2}$的两种形态——**正氢**（核自旋平行，奇数$J$）与**仲氢**（反平行，偶数$J$）——没有催化剂时互相转化极慢，因为核自旋几乎不与任何东西耦合。它们表现得像两种不同的物质，热容与热导率都不同；让氢气在催化剂上于低温达平衡制得的仲氢，如今被用来把核磁共振信号增强几个数量级。

::: example 氮气的转动拉曼光谱 {#ex-n2-raman}
对$^{14}\mathrm{N_2}$，$\tilde B_0 = 1.989\,58\ \mathrm{cm^{-1}}$（胡贝尔与赫茨伯格）。预告相对激发线的前四条斯托克斯线的位置、室温下的强度图样，以及$532.0\ \mathrm{nm}$激光下S(0)的绝对波数。
::: solution
由[[#eq-raman-lines]]，斯托克斯位移为$\tilde B(4J + 6)$：S(0) $11.94$、S(1) $19.90$、S(2) $27.85$、S(3) $35.81\ \mathrm{cm^{-1}}$，间隔$4\tilde B = 7.96\ \mathrm{cm^{-1}}$。氮-14的$I = 1$，是玻色子，故由[[#eq-spin-stat]]偶数$J$能级权重为$6$、奇数$J$能级为$3$：S(0)、S(2)，……约为其邻居S(1)、S(3)，……的两倍强，叠加在平滑的玻尔兹曼包络之上。激光波数为$10^7/532.0 = 18\,797\ \mathrm{cm^{-1}}$，故S(0)出现在$18\,797 - 12 = 18\,785\ \mathrm{cm^{-1}}$（对应$532.3\ \mathrm{nm}$）：转动拉曼线挤在激光线近旁，需要极好的滤光片才能看到。这种$2 : 1$的交替由拉塞蒂于1929年观测到，它表明$^{14}\mathrm N$核是玻色子——若它像当时认为的那样由14个质子与7个电子组成，这便不可能——这是通向中子的线索之一。
:::
:::

::: widget plot
f: (300/t)*sum((1.5 + 0.5*cos(pi*j))*(j+1)*(j+2)/(2*j+3)*exp(-2.86257*j*(j+1)/t)/(1 + (x - 1.98958*(4*j+6))^2/0.09), j, 0, 40)
x: 0, 160
sliders: t=300:20:1000:10
labels: \text{斯托克斯强度（相对）}
caption: $^{14}\mathrm{N_2}$转动拉曼光谱的斯托克斯分支，横轴为以$\mathrm{cm^{-1}}$计的拉曼位移，滑块`t`为温度（K）。每条线S$(J)$按其核自旋统计权重（偶数$J$为$6$、奇数$J$为$3$，此处为$2 : 1$）、玻尔兹曼因子以及$\Delta J = +2$跃迁的普拉切克–特勒（Placzek–Teller）因子$(J+1)(J+2)/(2J+3)$加权。注意$6\tilde B$处的第一条线、$4\tilde B$的间隔与强度的交替；低温下只剩最初几条线，交替一目了然。
:::

## 后续内容

在这里测得的转动常数是振动带（[[spectroscopy/vibrational-spectroscopy]]）与电子带（[[spectroscopy/electronic-spectroscopy]]）转动结构的起点，其中$\tilde B$在两态之间的变化显示激发时几何结构如何变化。转动配分函数$q \approx k_\mathrm{B}T/\sigma hc\tilde B$——其对称数$\sigma$正是核自旋统计的经典映像——为[[statistical-thermodynamics]]的熵与平衡常数提供输入。微波光谱给出的精确气相结构，是[[computational-chemistry]]中评判计算几何的基准；而这些频率——收录于CDMS与JPL星表等数据库——正是在星际空间认出三百多种分子的手段。磁共振——[[spectroscopy/nmr-principles]]与[[spectroscopy/epr]]的主题——是另一种转动光谱学：取向于磁场中的角动量的，而非在空间翻滚的分子的。

::: history
分子的转动跃迁最早是间接看到的——在红外带的精细结构中，1910与1920年代。1929年，拉塞蒂（Franco Rasetti）拍摄了$\mathrm{N_2}$与$\mathrm{O_2}$的转动拉曼光谱；同年他与海特勒（Walter Heitler）、赫茨伯格（Gerhard Herzberg）一起分析氮的强度交替，得出$^{14}\mathrm N$核服从玻色统计的结论——这与核的质子–电子模型相矛盾，直到1932年查德威克发现中子才得以消除。正氢与仲氢曾由海森堡（Werner Heisenberg）与洪特（Friedrich Hund）预言；1927年丹尼森（David Dennison）把它们当作两种不互相转化的物种，解释了氢的反常热容；邦霍费尔（Karl Bonhoeffer）与哈特克（Paul Harteck）于1929年制得近乎纯净的仲氢。真正的微波光谱学始于1934年，密歇根大学的Claud Cleeton与Neil Williams探测到氨在$1.25\ \mathrm{cm}$波长附近的吸收（其反转光谱）；1945年后，借助为雷达发展起来的波导、速调管与检波器，它迅速成长；汤斯（Charles Townes）与肖洛（Arthur Schawlow）的*Microwave Spectroscopy*（1955年）总结了这一领域。1970年，威尔逊（Robert Wilson）、杰弗茨（Keith Jefferts）与彭齐亚斯（Arno Penzias）探测到猎户座星云中CO的$J = 1 \to 0$线，开创了分子云天文学。
:::

::: summary
- 分子按其主转动惯量分类为线性、对称（长形或扁形）、球形或不对称陀螺；$n \ge 3$重$C_n$轴给出对称陀螺，多条这样的轴给出球形陀螺。
- 纯转动吸收需要永久偶极；对线性与对称陀螺$\Delta J = \pm1$（以及$\Delta K = 0$），谱线落在$2\tilde B(J+1)$，故由间隔可得$\tilde B$——进而得到键长。
- 离心畸变使能级降低$\tilde DJ^2(J+1)^2$，双原子分子的$\tilde D = 4\tilde B^3/\tilde\omega^2$；它使谱线移动$-4\tilde D(J+1)^3$。
- 同位素取代改变惯量而不改变势；$N - 1$个同位素异构体可定出线性$N$原子分子的结构，Kraitchman方程直接确定被取代原子的位置。报告结构时务必注明是$r_\mathrm{e}$、$r_0$还是$r_\mathrm{s}$。
- 谱线强度按$\tilde\nu(J+1)\mathrm{e}^{-E_J/k_\mathrm{B}T}(1 - \mathrm{e}^{-hc\tilde\nu/k_\mathrm{B}T})$标度；最强微波谱线来自$J \approx \sqrt{3k_\mathrm{B}T/2hc\tilde B} - 1$，高于布居最多的能级。
- 二阶斯塔克效应使能级移动的量正比于$\mu_0^2\mathcal E^2/hB$，可给出精确的偶极矩。
- 转动拉曼光谱需要各向异性的极化率，遵循$\Delta J = 0, \pm2$：谱线位于距激发线$6\tilde B, 10\tilde B, \ldots$处；核自旋统计使同核双原子分子间隔的谱线强度不同，$I = 0$时每隔一条完全消失。
:::

## 习题

::: exercise HCl的转动常数 {level=1 check="10.59"}
$\mathrm{H^{35}Cl}$的平衡键长为$127.46\ \mathrm{pm}$。用$m(^1\mathrm H) = 1.007\,825\ \mathrm u$与$m(^{35}\mathrm{Cl}) = 34.968\,853\ \mathrm u$，计算$\tilde B_\mathrm{e}$。（以$\mathrm{cm^{-1}}$输入$\tilde B_\mathrm{e}$，四位有效数字。）
::: solution
$\mu = (1.007\,825 \times 34.968\,853)/35.976\,678\ \mathrm u = 0.979\,593\ \mathrm u = 1.626\,65\times10^{-27}\ \mathrm{kg}$；$I = \mu r^2 = 1.626\,65\times10^{-27} \times (1.2746\times10^{-10})^2 = 2.6427\times10^{-47}\ \mathrm{kg\,m^2}$。于是$\tilde B_\mathrm{e} = h/8\pi^2cI = 6.626\times10^{-34}/(8\pi^2 \times 2.9979\times10^{10}\ \mathrm{cm\,s^{-1}} \times 2.6427\times10^{-47}) = 10.59\ \mathrm{cm^{-1}}$（表列值$10.593\ \mathrm{cm^{-1}}$）。转动谱线间隔约$21\ \mathrm{cm^{-1}}$——在远红外而不是微波区，因为氢太轻。
:::
:::

::: exercise 一条离心畸变的谱线 {level=1 check="461040.8"}
用$^{12}\mathrm{C}^{16}\mathrm{O}$的$B_0 = 57\,635.968\ \mathrm{MHz}$与$D_0 = 0.1835\ \mathrm{MHz}$，预告$J = 4 \leftarrow 3$线的频率。（以MHz输入频率，一位小数。）
::: solution
取$J + 1 = 4$：$\nu = 2B_0 \times 4 - 4D_0 \times 4^3 = 461\,087.744 - 46.976 = 461\,040.8\ \mathrm{MHz}$。畸变修正的$47\ \mathrm{MHz}$按$(J+1)^3$增长，是测量精度的一万倍。
:::
:::

::: exercise 转子的分类 {level=1}
把下列分子分类为线性、对称（长形或扁形）、球形或不对称陀螺，并说明它们是否有纯转动吸收光谱：(a) $\mathrm{HCN}$，(b) $\mathrm{BF_3}$，(c) $\mathrm{CH_2Cl_2}$，(d) $\mathrm{SiH_4}$，(e) $\mathrm{CHCl_3}$，(f) $\mathrm{C_2H_2}$。
::: solution
(a) 线性，有极性：有。(b) 扁形对称陀螺（$D_{3h}$，$C_3$轴垂直于分子平面），无极性：无。(c) 不对称陀螺（$C_{2v}$），有极性：有。(d) 球形陀螺（$T_\mathrm d$），无极性：无。(e) 对称陀螺（$C_{3v}$）；三个重的氯原子远离$C_3$轴，故绕该轴的转动惯量最大，分子为扁形；有极性：有。(f) 线性且具对称中心（$D_{\infty h}$）：无偶极，无微波光谱，但有转动拉曼光谱（两个质子引起强度交替）。
:::
:::

::: exercise 同位素异构体的谱线 {level=2 check="110.19"}
$^{12}\mathrm{C}^{16}\mathrm{O}$的$J = 1 \leftarrow 0$线在$115.2712\ \mathrm{GHz}$处。设键长不变、$B \propto 1/\mu$，预告$^{13}\mathrm{C}^{16}\mathrm{O}$的谱线（$m(^{13}\mathrm C) = 13.003\,355\ \mathrm u$）。忽略离心畸变。（以GHz输入频率，五位有效数字。）
::: solution
$\mu(^{12}\mathrm{CO}) = 6.856\,21\ \mathrm u$，$\mu(^{13}\mathrm{CO}) = 13.003\,355 \times 15.994\,915/28.998\,270 = 7.172\,36\ \mathrm u$。比值为$0.955\,91$，故$\nu = 115.2712 \times 0.955\,91 = 110.19\ \mathrm{GHz}$。实测线在$110.2014\ \mathrm{GHz}$；$0.01\,\%$的偏差源于$B_0$是振动平均，而较重异构体的零点运动较小，故其$r_0$略短。因此精确的工作是对$B_\mathrm{e}$而非$B_0$做标度。
:::
:::

::: exercise 由斯塔克位移求偶极矩 {level=2 check="0.697"}
某线性分子$B_0 = 9000\ \mathrm{MHz}$。在$1.50\ \mathrm{kV\,cm^{-1}}$的场中，其$J = 1 \leftarrow 0$线的$M = 0 \leftarrow 0$分量移动了$+8.20\ \mathrm{MHz}$。(a) 求偶极矩。(b) $M = \pm1 \leftarrow 0$分量应出现在哪里？(c) 检验二阶微扰论是否足够。（以德拜输入$\mu_0$，三位有效数字。）
::: solution
(a) 由[[#prop-stark]]，$\mu_0 = (h/\mathcal E)\sqrt{15B\Delta\nu/4} = (6.6261\times10^{-34}/1.50\times10^{5})\sqrt{15(9.000\times10^{9})(8.20\times10^{6})/4}\ \mathrm{C\,m} = 2.324\times10^{-30}\ \mathrm{C\,m} = 0.697\ \mathrm{D}$。(b) 两个位移之比为$(7/60)/(4/15) = 7/16$，故垂直偏振分量移动$\tfrac{7}{16} \times 8.20 = 3.59\ \mathrm{MHz}$。同时测量两者并检验$7 : 16$比，可确认$M$的归属与场的均匀性。(c) $\mu_0\mathcal E/h = 526\ \mathrm{MHz}$，远小于$2B = 18\,000\ \mathrm{MHz}$，故微扰展开收敛很快。
:::
:::

::: exercise 正氢与仲氢 {level=2 check="0.974"}
对$\mathrm{H_2}$取$\tilde B = 59.32\ \mathrm{cm^{-1}}$并按刚性转子能级计算。求$77\ \mathrm K$（液氮）下正氢与仲氢分子平衡比，并给出其高温极限值。（以三位有效数字输入$77\ \mathrm K$的正:仲比。）
::: hint
正氢能级（奇数$J$）的核自旋权重为3，仲氢能级（偶数$J$）为1，此外还有$2J+1$。$77\ \mathrm K$时$k_\mathrm{B}T/hc = 53.5\ \mathrm{cm^{-1}}$；每类只需考虑最初两三个能级。
:::
::: solution
$k_\mathrm{B}T/hc = 0.695\,03 \times 77 = 53.52\ \mathrm{cm^{-1}}$。仲氢：$1 + 5\mathrm{e}^{-6\tilde B/53.52} + 9\mathrm{e}^{-20\tilde B/53.52} + \cdots = 1 + 5(1.293\times10^{-3}) + \cdots = 1.00647$。正氢：$3\left[3\mathrm{e}^{-2\tilde B/53.52} + 7\mathrm{e}^{-12\tilde B/53.52} + \cdots\right] = 3\left[3(0.10895) + 7(1.7\times10^{-6})\right] = 0.98061$。比值为$0.98061/1.00647 = 0.974$，故$77\ \mathrm K$的平衡氢约含$51\,\%$仲氢。高温下每类的许多能级都被占据，奇偶$J$上的玻尔兹曼求和变得相等，比值趋于自旋权重比$3 : 1$（"正常"氢，$25\,\%$仲氢）。由于转化缓慢，无催化剂冷却的氢保持其$3 : 1$比，其后缓慢的转化会放出热量——这是储存液氢的一个实际问题。
:::
:::

::: exercise HCl的Kratzer关系 {level=3 check="5.32"}
(a) 由离心力与恢复力的平衡，对双原子分子推导$\tilde D = 4\tilde B^3/\tilde\omega^2$。(b) 用$\tilde B_\mathrm{e} = 10.5934\ \mathrm{cm^{-1}}$与$\tilde\omega_\mathrm{e} = 2990.95\ \mathrm{cm^{-1}}$计算$\mathrm{H^{35}Cl}$的$\tilde D_\mathrm{e}$，并估计$J = 10 \leftarrow 9$线的畸变修正。（以$10^{-4}\ \mathrm{cm^{-1}}$为单位输入$\tilde D_\mathrm{e}$，三位有效数字。）
::: hint
仿照[[#prop-cd]]的证明：在固定$L$下最小化$L^2/2\mu r^2 + \tfrac12k_\mathrm{f}(r - r_\mathrm{e})^2$，然后用$k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$。
:::
::: solution
(a) 如[[#prop-cd]]的证明：伸长为$\delta = L^2/k_\mathrm{f}\mu r_\mathrm{e}^3$，能量降低$L^4/2k_\mathrm{f}\mu^2r_\mathrm{e}^6$；代入$L^2 = \hbar^2J(J+1)$，$\tilde D = \hbar^4/(2k_\mathrm{f}\mu^2r_\mathrm{e}^6hc)$。写出$\tilde B = \hbar^2/(2\mu r_\mathrm{e}^2hc)$与$k_\mathrm{f} = 4\pi^2c^2\tilde\omega^2\mu$，先得$\tilde D = \hbar^4/(8\pi^2c^3\tilde\omega^2\mu^3r_\mathrm{e}^6h)$，而$\tilde B^3/\tilde\omega^2 = \hbar^6/(8\mu^3r_\mathrm{e}^6h^3c^3\tilde\omega^2)$。两者之比中质量、$r_\mathrm{e}$、$c$与$\tilde\omega$相消：$\tilde D\big/(\tilde B^3/\tilde\omega^2) = h^2/(\pi^2\hbar^2) = 4$。

(b) $\tilde D_\mathrm{e} = 4(10.5934)^3/(2990.95)^2 = 4(1188.79)/(8.9458\times10^{6}) = 5.32\times10^{-4}\ \mathrm{cm^{-1}}$（实测$5.32\times10^{-4}\ \mathrm{cm^{-1}}$）。对$J = 10 \leftarrow 9$，修正为$-4\tilde D(J+1)^3 = -4(5.32\times10^{-4})(1000) = -2.13\ \mathrm{cm^{-1}}$，作用在$2 \times 10.59 \times 10 \approx 212\ \mathrm{cm^{-1}}$附近的谱线上——$1\,\%$的效应，之所以大，是因为HCl轻而其$\tilde B$大。
:::
:::

::: exercise 硫化羰的最强谱线 {level=3 check="38"}
(a) 证明当$hc\tilde\nu \ll k_\mathrm{B}T$时，线性分子的最强纯转动吸收线始于$J_\mathrm{peak} \approx \sqrt{3k_\mathrm{B}T/2hc\tilde B} - 1$。(b) 对OCS，$\tilde B_0 = 0.202\,86\ \mathrm{cm^{-1}}$。求$300\ \mathrm K$下的$J_\mathrm{peak}$、该线的频率以及布居最多的能级。（输入$J_\mathrm{peak}$，即最强谱线下态的$J$。）
::: solution
(a) 由[[#eq-rot-int]]，用$1 - \mathrm{e}^{-x} \approx x \propto J+1$与$\tilde\nu \propto J+1$，$S_J \propto (J+1)^3\mathrm{e}^{-\beta J(J+1)}$，$\beta = hc\tilde B/k_\mathrm{B}T$。把$J$当作连续量并在指数中近似$J(J+1) \approx (J+1)^2$，$\mathrm{d}\ln S/\mathrm{d}(J+1) = 3/(J+1) - 2\beta(J+1) = 0$，故$J+1 = \sqrt{3/2\beta}$。

(b) $300\ \mathrm K$下$k_\mathrm{B}T/hc = 208.51\ \mathrm{cm^{-1}}$，故$\sqrt{3 \times 208.51/(2 \times 0.202\,86)} = 39.27$，$J_\mathrm{peak} \approx 38.3$，即$J = 38$（对[[#eq-rot-int]]的精确计算确认$J = 38$）。$39 \leftarrow 38$线在$2B(J+1) = 2 \times 6081.49\ \mathrm{MHz} \times 39 = 474.4\ \mathrm{GHz}$，亚毫米波段。布居最多的能级为$\sqrt{208.51/(2\times0.202\,86)} - \tfrac12 = 22.2$，即$J = 22$。重分子的最强谱线位于谱线阶梯的高处，频率远高于其第一条线。
:::
:::

::: exercise 由拉曼光谱求氮气的键长 {level=3 check="110.0"}
$^{14}\mathrm{N_2}$的斯托克斯转动拉曼光谱显示偏离激发线$11.94$、$19.90$、$27.86$与$35.81\ \mathrm{cm^{-1}}$的谱线，强度按强、弱、强、弱交替。(a) 归属这些谱线并确定$\tilde B_0$。(b) 求$r_0$（$m(^{14}\mathrm N) = 14.003\,074\ \mathrm u$）。(c) 解释强度交替，并预告$^{15}\mathrm{N_2}$（$I = \tfrac12$）会有什么变化。（以pm输入$r_0$，四位有效数字。）
::: solution
(a) 间隔为$(35.81 - 11.94)/3 = 7.957\ \mathrm{cm^{-1}} = 4\tilde B$，而$11.94 = 6\tilde B$处的第一条线证实它是S(0)。故$\tilde B_0 = 1.989\ \mathrm{cm^{-1}}$（由间隔得$1.9892$；由S(0)得$1.990$）。

(b) $\mu = 7.001\,537\ \mathrm u = 1.162\,63\times10^{-26}\ \mathrm{kg}$；$\tilde B = 1.9892\ \mathrm{cm^{-1}}$时$I = h/8\pi^2c\tilde B = 1.4071\times10^{-46}\ \mathrm{kg\,m^2}$，$r_0 = \sqrt{I/\mu} = 110.0\ \mathrm{pm}$（平衡值为$109.77\ \mathrm{pm}$）。

(c) $^{14}\mathrm N$的$I = 1$，是玻色子，故偶数$J$能级权重为$6$、奇数$J$能级为$3$（[[#eq-spin-stat]]）；来自偶数$J$的S(0)、S(2)比S(1)、S(3)强一倍。对$^{15}\mathrm N_2$，$I = \tfrac12$，是费米子：奇数$J$能级权重为$3$、偶数$J$为$1$，于是交替反转（现在S(1)、S(3)强）并变成$3 : 1$。谱线位置也会移动，因为$\tilde B$按质量比$14.003/15.000$下降。
:::
:::
