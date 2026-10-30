把一管乙醇放进强磁体，用$400\ \mathrm{MHz}$附近的射频辐射照射它，样品便以三组信号作答：$\mathrm{CH_3}$质子一组、$\mathrm{CH_2}$质子一组、$\mathrm{OH}$质子一组，各自的频率略有不同，而且前两组各自分裂成整齐的三重峰与四重峰。这个实验没有直接触及任何电子，却把电子的情形报告得纤毫毕现——每个原子核周围有多少电子密度、哪些核通过化学键相连、各基团旋转或交换的速率有多快。这就是**核磁共振**（NMR），结构化学中信息量最大的单一技术。本课要从头把它建立起来：磁场中的核自旋、信号为何如此微弱而脉冲与傅里叶变换如何把它挽救回来、化学位移、自旋-自旋耦合与多重峰的图样、弛豫，以及化学交换的效应。姊妹篇[[spectroscopy/nmr-structure]]随后用这些原理来解读真实谱图。

一般框架——能级、布居、选律与线宽——已在[[spectroscopy/spectroscopy-principles]]中建立。核磁共振从某个意义上说是它最简单的应用：一个二能级系统，其分裂大小由我们选择磁体来决定。从另一个意义上说它又最微妙，因为能隙太小，布居几乎相等，能级寿命长达数秒，而整个实验最好的描述不是光子被吸收，而是磁化矢量被倾倒、并作为进动被观察。

## 磁场中的核自旋

许多原子核带有内禀角动量——**核自旋**——并随之带有磁矩。自旋角动量的规律与[[quantum-chemistry/many-electron-atoms]]中电子的相同：其大小为$\hbar\sqrt{I(I+1)}$，而沿任一选定轴的分量取$2I+1$个值$m_I\hbar$，$m_I = -I, -I+1, \ldots, +I$。

::: definition 核自旋与磁矩 {#def-nuclear-spin}
具有**自旋量子数**$I$的原子核带有自旋角动量$\hat{\mathbf{I}}\hbar$和磁矩
$$
\hat{\boldsymbol{\mu}} = \gamma\hbar\,\hat{\mathbf{I}}, \qquad \mu_z = \gamma\hbar\,m_I ,
$$ {#eq-moment}
式中$\gamma$是**磁旋比**（magnetogyric，gyromagnetic ratio），为每种同位素各自的常数（$^{1}\mathrm{H}$与$^{13}\mathrm{C}$为正，$^{15}\mathrm{N}$与$^{29}\mathrm{Si}$为负）。自旋$I$由质子数与中子数决定：质量数与原子序数皆为偶数的核$I = 0$（$^{12}\mathrm{C}$、$^{16}\mathrm{O}$、$^{32}\mathrm{S}$），对核磁共振是沉默的；质量数为奇数给出半整数$I$（$^{1}\mathrm{H}$、$^{13}\mathrm{C}$、$^{15}\mathrm{N}$、$^{19}\mathrm{F}$、$^{31}\mathrm{P}$都是$I = \tfrac12$；$^{11}\mathrm{B}$为$\tfrac32$，$^{17}\mathrm{O}$为$\tfrac52$）；质量数为偶数而原子序数为奇数给出整数$I$（$^{2}\mathrm{H}$与$^{14}\mathrm{N}$为$I = 1$）。
:::

$I > \tfrac12$的核具有非球形的电荷分布——**电四极矩**——它与分子中的电场梯度耦合，并使核弛豫得极快，以致谱线很宽。这就是有机化学建立在自旋$\tfrac12$核之上的原因，也是与$\mathrm{N{-}H}$质子相邻的$^{14}\mathrm{N}$（$I = 1$，丰度$99.6\,\%$）常常把该质子的信号变宽而不是干净地分裂的原因。

本课所用的数值来自两个标准来源：质子的磁旋比$\gamma(^{1}\mathrm{H}) = 2.675\,221\,874\times10^{8}\ \mathrm{s^{-1}\,T^{-1}}$（CODATA 2018），其余磁旋比与天然丰度来自IUPAC关于核磁共振命名法的建议（Harris *et al.*, *Pure Appl. Chem.* 2001）：$\gamma(^{13}\mathrm{C}) = 6.728\times10^{7}$、$\gamma(^{19}\mathrm{F}) = 25.18\times10^{7}$、$\gamma(^{31}\mathrm{P}) = 10.84\times10^{7}$与$\gamma(^{15}\mathrm{N}) = -2.713\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$，天然丰度分别为$99.99\,\%$（$^{1}\mathrm{H}$）、$1.07\,\%$（$^{13}\mathrm{C}$）、$100\,\%$（$^{19}\mathrm{F}$、$^{31}\mathrm{P}$）与$0.37\,\%$（$^{15}\mathrm{N}$）。

::: proposition 塞曼能级与共振条件 {#prop-larmor}
在沿$z$的静磁场$B_0$中，自旋为$I$的原子核有$2I+1$个等间隔的**塞曼能级**
$$
E_{m_I} = -\mu_z B_0 = -\gamma\hbar B_0\,m_I .
$$ {#eq-zeeman}
磁偶极跃迁遵守$\Delta m_I = \pm 1$，因此每条允许的跃迁都有相同的能量$\Delta E = \gamma\hbar B_0$，在**拉莫尔频率**处被吸收
$$
\nu_0 = \frac{\gamma B_0}{2\pi}, \qquad \omega_0 = \gamma B_0 .
$$ {#eq-larmor}
对$\gamma > 0$的自旋-$\tfrac12$核，较低能级是$m_I = +\tfrac12$（称为$\alpha$，磁矩平行于磁场），较高能级是$m_I = -\tfrac12$（$\beta$）。
:::

::: proof
磁矩在磁场中的能量为$-\boldsymbol{\mu}\cdot\mathbf{B}$；取$\mathbf{B} = B_0\hat{\mathbf{z}}$，哈密顿量为$\hat H = -\gamma\hbar B_0\hat I_z$，其本征态即$\hat I_z$的本征态，本征值为$m_I$，即得[[#eq-zeeman]]。射频场通过算符$-\gamma\hbar B_1\hat I_x\cos\omega t$发生耦合；由于$\hat I_x = \tfrac12(\hat I_+ + \hat I_-)$，而升、降算符使$m_I$恰好改变一个单位，非零矩阵元只连接$m_I$与$m_I \pm 1$。相邻能级之差为$\gamma\hbar B_0$，故$h\nu = \gamma\hbar B_0$，即$\nu_0 = \gamma B_0/2\pi$。经典图像给出同一频率，即**拉莫尔进动**的速率：作用在带有角动量$\boldsymbol{\mu}/\gamma$的磁矩上的力矩$\boldsymbol{\mu}\times\mathbf{B}$使它绕$\mathbf{B}$扫出一个圆锥，角速度为$\omega_0 = \gamma B_0$——不用量子力学也得到同样的结果。
:::

谱仪以其质子的拉莫尔频率命名："$400\ \mathrm{MHz}$"仪器的$B_0 \approx 9.40\ \mathrm{T}$，"$600\ \mathrm{MHz}$"仪器为$14.1\ \mathrm{T}$。每种同位素在同一磁体中以各自的频率共振，与$\gamma$成正比，因此谱仪对每种核分别调谐，不同核的谱从不重叠。

::: example 拉莫尔频率与量子的大小 {#ex-larmor}
对$B_0 = 9.40\ \mathrm{T}$，求$^{1}\mathrm{H}$与$^{13}\mathrm{C}$的拉莫尔频率，以及质子跃迁的摩尔能量。
::: solution
由[[#eq-larmor]]，
$$
\nu_0(^{1}\mathrm{H}) = \frac{2.6752\times10^{8}\ \mathrm{s^{-1}\,T^{-1}} \times 9.40\ \mathrm{T}}{2\pi} = 4.002\times10^{8}\ \mathrm{Hz} = 400.2\ \mathrm{MHz},
$$
而$\nu_0(^{13}\mathrm{C}) = 6.728\times10^{7} \times 9.40/2\pi = 100.7\ \mathrm{MHz}$——约为质子值的四分之一，比值$\gamma_\mathrm{C}/\gamma_\mathrm{H} = 0.2515$。质子能量子为
$$
N_\mathrm{A}h\nu_0 = 6.022\times10^{23}\ \mathrm{mol^{-1}} \times 6.626\times10^{-34}\ \mathrm{J\,s} \times 4.00\times10^{8}\ \mathrm{s^{-1}} = 0.160\ \mathrm{J\,mol^{-1}} .
$$
这只有典型振动能量子的几百万分之一，比室温下的$RT$（$2.48\ \mathrm{kJ\,mol^{-1}}$）小$1.6\times10^{4}$倍。射频光子如此微弱，以致核磁共振是一门布居几乎相等的技术，下一个结果将给出精确的说明。
:::
:::

## 布居、灵敏度与矢量模型

::: proposition 玻尔兹曼布居差 {#prop-boltzmann}
$N$个自旋-$\tfrac12$核组成的处于温度$T$下热平衡的系综，当$h\nu_0 \ll k_\mathrm{B}T$时，
$$
\frac{N_\alpha - N_\beta}{N} = \tanh\frac{h\nu_0}{2k_\mathrm{B}T} \approx \frac{h\nu_0}{2k_\mathrm{B}T} = \frac{\gamma\hbar B_0}{2k_\mathrm{B}T} .
$$ {#eq-excess}
净吸收以及单位样品体积的平衡**宏观磁化强度**$M_0 = \tfrac12(N_\alpha - N_\beta)\gamma\hbar$都与这一微小的超额成正比。
:::

::: proof
由玻尔兹曼分布，$N_\beta/N_\alpha = \mathrm{e}^{-\Delta E/k_\mathrm{B}T}$，其中$\Delta E = h\nu_0$。令$x = \Delta E/2k_\mathrm{B}T$，则$N_\alpha \propto \mathrm{e}^{x}$而$N_\beta \propto \mathrm{e}^{-x}$，于是$(N_\alpha - N_\beta)/(N_\alpha + N_\beta) = (\mathrm{e}^{x} - \mathrm{e}^{-x})/(\mathrm{e}^{x} + \mathrm{e}^{-x}) = \tanh x \approx x$（$x \ll 1$时）。吸收（$\alpha \to \beta$）与受激发射（$\beta \to \alpha$）对每个自旋的概率相等，所以只有超额$N_\alpha - N_\beta$产生净吸收；$\alpha$中的每个自旋向$M_z$贡献$+\tfrac12\gamma\hbar$，$\beta$中的每个贡献$-\tfrac12\gamma\hbar$，由此得到$M_0$。
:::

在$400\ \mathrm{MHz}$与$298\ \mathrm{K}$下，$h\nu_0/2k_\mathrm{B}T = 3.22\times10^{-5}$：每一百万个质子中，"顺"场的比逆场的约多32个，其余的999 968个两两抵消彼此的信号。提高磁场能线性地改善灵敏度。降低温度亦然，这就是低温探头（冷却的是接收线圈与前置放大器，不是样品）使信噪比提高三到四倍的原因。

一种核的灵敏度对$\gamma$有三重依赖：布居超额正比于$\gamma$，每个超额自旋的磁矩正比于$\gamma$，而它在线圈中感应的电压正比于其进动频率，又正比于$\gamma$。由此得到IUPAC定义的**检测灵敏度**（receptivity），
$$
D \propto |\gamma|^{3}\,I(I+1)\,x_\mathrm{nat},
$$ {#eq-receptivity}
其中$x_\mathrm{nat}$是天然丰度。以$^{1}\mathrm{H}$为1，各核的检测灵敏度为$^{19}\mathrm{F}$的$0.834$、$^{31}\mathrm{P}$的$0.0665$、$^{13}\mathrm{C}$的$1.70\times10^{-4}$与$^{15}\mathrm{N}$的$3.84\times10^{-6}$——这些数值正好解释了化学家学习核磁共振的顺序：先是氢谱，然后是碳谱。

::: example 天然丰度的碳-13有多难？ {#ex-receptivity}
用[[#eq-receptivity]]验证$^{13}\mathrm{C}$相对$^{1}\mathrm{H}$的检测灵敏度，并估计：忽略一切增强效应，同一份样品的$^{13}\mathrm{C}$谱要达到与单次扫描的$^{1}\mathrm{H}$谱相同的信噪比，需要多扫描多少倍？
::: solution
两种核都是$I = \tfrac12$，故$I(I+1)$相消。于是
$$
\frac{D(^{13}\mathrm{C})}{D(^{1}\mathrm{H})} = \left(\frac{6.728}{26.752}\right)^{3} \times \frac{1.07}{99.99} = (0.2515)^{3} \times 0.0107 = 0.0159 \times 0.0107 = 1.70\times10^{-4} .
$$
信噪比只随扫描次数的平方根增长（见下文[[#prop-signal-averaging]]），因此要弥补$1/(1.70\times10^{-4})$的信号差距需要$(1/1.70\times10^{-4})^{2} = 3.5\times10^{7}$次扫描——按每秒一次扫描计要一年以上。常规$^{13}\mathrm{C}$谱之所以可行，全凭三个技巧：傅里叶变换采集使每次扫描都包含整个谱的信息、质子去耦（把每条碳的多重峰塌缩成一条线），以及被照射质子带来的核Overhauser增强（最高达$1 + \gamma_\mathrm{H}/2\gamma_\mathrm{C} = 2.99$倍），再加上比氢谱工作所需更大的样品量与更高的浓度。
:::
:::

### 矢量模型与旋转坐标系

由于布居超额极小且自旋之间没有强的相互作用，一份样品在极好的近似下就像一个服从经典运动方程$\mathrm{d}\mathbf{M}/\mathrm{d}t = \gamma\,\mathbf{M}\times\mathbf{B}$的宏观磁化矢量$\mathbf{M}$。平衡时$\mathbf{M} = M_0\hat{\mathbf{z}}$沿磁场方向，一切静止。要看到信号就必须把$\mathbf{M}$从$z$轴倾倒开；随后它绕$B_0$以$\nu_0$进动，其旋转的横向分量在绕样品缠绕的线圈中感生出振荡电压。

倾倒由频率接近$\nu_0$、垂直于$B_0$施加的短射频脉冲场$B_1$（典型为$10^{-4}$–$10^{-3}\ \mathrm{T}$）完成。运动在实验室系中看起来很复杂，但在一个绕$z$以射频转动的**旋转坐标系**中变得简单。在该系中，大磁场$B_0$被换成小残余场$B_0 - \omega_\mathrm{rf}/\gamma$，它在共振时为零；而$B_1$成为沿，比如，$x$的静场。因此磁化矢量只需绕$x$以**章动频率**$\gamma B_1$旋转，时长为$t_\mathrm{p}$的脉冲使它转过**翻转角**
$$
\theta = \gamma B_1 t_\mathrm{p} .
$$ {#eq-flip}
**90°脉冲**（$\theta = \pi/2$）把$\mathbf{M}$倒在$xy$平面上，给出最大的横向磁化，也就是最大的信号；**180°脉冲**（$\theta = \pi$）把它反演到$-z$，不给出信号但得到反转的布居——这是下文反转恢复与自旋回波实验的起点。用量子的语言，90°脉冲使$\alpha$与$\beta$的布居相等并在两者之间建立相干；180°脉冲交换两个布居。

::: example 90°脉冲的长度 {#ex-pulse}
$400\ \mathrm{MHz}$谱仪上一个质子的90°脉冲时长$10.0\ \mathrm{\mu s}$。求$B_1$的大小与章动频率，并把$B_1$与$B_0$比较。
::: solution
由[[#eq-flip]]取$\theta = \pi/2$，
$$
B_1 = \frac{\pi/2}{\gamma t_\mathrm{p}} = \frac{1.5708}{2.6752\times10^{8}\ \mathrm{s^{-1}\,T^{-1}} \times 1.00\times10^{-5}\ \mathrm{s}} = 5.87\times10^{-4}\ \mathrm{T}.
$$
转过90°需要四分之一个章动周期，故章动频率为$\gamma B_1/2\pi = 1/(4t_\mathrm{p}) = 25.0\ \mathrm{kHz}$。$B_1$约为$B_0 = 9.40\ \mathrm{T}$的$6\times10^{-5}$，然而共振时在旋转坐标系中唯独它决定运动——这就是共振的精髓。一个有用的推论：长度为$t_\mathrm{p}$的脉冲激励宽度约为$1/t_\mathrm{p} \approx 10^{5}\ \mathrm{Hz}$的一频带，把整个质子谱（在此磁场下$12\ \mathrm{ppm} \approx 4.8\ \mathrm{kHz}$）从容覆盖。一个短脉冲一次激励全部质子。
:::
:::

## 脉冲、FID与傅里叶变换

90°脉冲之后，样品中每个质子都以自己的频率进动，线圈记录它们全部振荡之和。由于横向磁化同时衰减（弛豫，见下文），记录到的信号是一组叠加的衰减余弦：**自由感应衰减**（FID）。谱——信号强度对频率——就是它的傅里叶变换。

::: widget plot
f: exp(-x/t)*cos(2*pi*v*x); exp(-x/t); -exp(-x/t)
x: 0, 2
y: -1.1, 1.1
sliders: t=0.4:0.05:2:0.05; v=8:1:20:1
labels: \text{FID}; \text{包络 } \mathrm{e}^{-t/T_2}; \text{包络}
caption: 单线自由感应衰减$\cos(2\pi\nu t)\,\mathrm{e}^{-t/T_2}$，横轴为以秒计的时间$t$。滑块`v`设定以赫兹计的偏移频率（谱仪减去参考频率后记录到的振荡），`t`设定以秒计的衰减时间$T_2$。衰减越快（`t`越小），谱线越宽，因为包络的傅里叶变换是半高全宽为$1/\pi T_2$的洛伦兹线（[[#prop-linewidth]]）；数每秒的振荡数即可恢复频率，傅里叶变换正是对每条线同时做这件事。
:::

傅里叶变换（FT）核磁共振取代了较旧的连续波方法——后者把磁场或频率缓慢扫过每一条共振。其收益是**多路传输**（multiplex，Fellgett）优势：几秒的FID包含谱中每一个频率的信息，而扫描几乎把全部时间花在空白的基线上。三个实用关系支配着采集：

- **谱宽**$SW$（记录的频率范围）由采样速率决定：采用正交检测时，每隔$\Delta t$采集的复数据点覆盖$SW = 1/\Delta t$。窗口之外的信号不会丢失，而是以错误的频率**折叠**（混叠）回窗口之内。
- **数字分辨率**为$1/t_\mathrm{acq}$，即采集时长的倒数。要分开两条相距$0.3\ \mathrm{Hz}$的谱线，至少要记录约$3\ \mathrm{s}$；在衰减完成之前截断的FID会在每条线的底部产生"sinc波纹"。
- 重复实验并把各次FID相加可以改善信噪比，但很慢。

::: proposition 信号累加 {#prop-signal-averaging}
若把$n$条FID相加，相干信号按$n$增长而随机噪声按$\sqrt{n}$增长，于是
$$
\frac{S}{N} \propto \sqrt{n} .
$$ {#eq-sn}
该式在逐次扫描的噪声互不相关、均值为零且样品在各次扫描之间保持不变时成立。
:::

::: proof
设每次扫描给出信号$s$加噪声$\varepsilon_i$，其均值为零、方差为$\sigma^{2}$，各次扫描之间相互独立。$n$次扫描之和的信号为$ns$，噪声方差为$\sum_i \sigma^{2} = n\sigma^{2}$（独立变量的方差相加），故噪声幅值为$\sigma\sqrt{n}$。比值为$ns/\sigma\sqrt{n} = \sqrt{n}\,(s/\sigma)$。这与[[analytical-chemistry/statistics-calibration]]中支配均值标准误的统计规律完全相同。
:::

平方根是苛刻的：信噪比翻倍要付出四倍时间，提高10倍要付出100倍。每次扫描的时间由弛豫决定，因为磁化必须在下一个脉冲之前大部分回到$z$方向——这就是为什么弛豫非但不是讨厌的细节，反而决定了每一个核磁共振实验的节奏。

::: example 规划一次采集 {#ex-acquisition}
一张质子谱在$400\ \mathrm{MHz}$下于$0$–$12\ \mathrm{ppm}$范围内采集，采集时间为$3.0\ \mathrm{s}$。(a) 需要多大的以赫兹计的谱宽、多少个复数据点？(b) 数字分辨率是多少？(c) 16次扫描后一个弱信号的$S/N = 5$。多少次扫描可得到$S/N = 20$？
::: solution
(a) $400\ \mathrm{MHz}$下的$12\ \mathrm{ppm}$是$12\times10^{-6} \times 4.00\times10^{8}\ \mathrm{Hz} = 4800\ \mathrm{Hz}$。正交检测下采样间隔为$1/SW = 208\ \mathrm{\mu s}$，故在$3.0\ \mathrm{s}$内采集$SW \times t_\mathrm{acq} = 4800 \times 3.0 = 14\,400$个复点。
(b) 数字分辨率$1/t_\mathrm{acq} = 1/3.0\ \mathrm{s} = 0.33\ \mathrm{Hz}$——对质子耦合足够好，因为耦合很少小于约$0.5\ \mathrm{Hz}$。
(c) $S/N$必须增长4倍，故由[[#eq-sn]]，$n$须增长$4^{2} = 16$倍：$16 \times 16 = 256$次扫描。按每次扫描约$5\ \mathrm{s}$计，这约是21分钟而不是80秒。
:::
:::

## 化学位移

如果分子中所有质子都在精确的$\gamma B_0/2\pi$处共振，核磁共振就不过是数氢原子数目的办法。事实并非如此，因为核感受到的场不是外磁场。外磁场驱动核外电子的环流，这些感应电流产生它们自己的小磁场，正比于$B_0$，并且对闭壳层分子来说主要与之相反。核被**屏蔽**：它感受到
$$
B_\mathrm{loc} = (1 - \sigma)\,B_0, \qquad \nu = \frac{\gamma B_0}{2\pi}(1 - \sigma),
$$ {#eq-shielding}
其中**屏蔽常数**$\sigma$是电子环境的属性，对质子约为$10^{-5}$量级，对碳约为$10^{-4}$量级。由于$\sigma$如此之小，而$B_0$不可能被知道到十亿分之一，绝对频率毫无用处；我们测量的是相对于同一样品中参考化合物的频率。

::: definition 化学位移 {#def-shift}
频率为$\nu$的共振的**化学位移**为
$$
\delta = \frac{\nu - \nu_\mathrm{ref}}{\nu_\mathrm{ref}} \times 10^{6} \ \ \text{（以ppm计）} \;\approx\; (\sigma_\mathrm{ref} - \sigma)\times10^{6},
$$ {#eq-shift}
其中$\nu_\mathrm{ref}$是参考物的频率。对$^{1}\mathrm{H}$、$^{13}\mathrm{C}$与$^{29}\mathrm{Si}$，参考物是四甲基硅烷（TMS，$\mathrm{Si(CH_3)_4}$，$\delta = 0$）；在水中则用水溶性的硅烷如DSS。$\delta$越大意味着屏蔽越小、共振频率越高，按惯例位于谱的*左*侧（"低场"，这个名字保留自扫场式仪器）。
:::

定义中除以谱仪频率，正是为了使$\delta$**与磁场无关**：$\nu - \nu_\mathrm{ref}$与$\nu_\mathrm{ref}$都正比于$B_0$。$\delta = 1.22$处的甲基在世界上任何一台仪器上都是$1.22$，而它与TMS之间以赫兹计的间隔在$60\ \mathrm{MHz}$下是$73\ \mathrm{Hz}$，在$400\ \mathrm{MHz}$下是$488\ \mathrm{Hz}$。TMS是好的参考物，因为它的十二个全同质子给出一条尖锐的线，它化学惰性、易挥发，而且比几乎所有有机质子都更受屏蔽（硅的电负性比碳小）。

::: example 赫兹与ppm {#ex-shift}
在一台质子参考频率为$400.000\ \mathrm{MHz}$的谱仪上，乙醇（在$\mathrm{CDCl_3}$中）的$\mathrm{CH_2}$四重峰中心位于TMS以上$1476\ \mathrm{Hz}$处。求其$\delta$，以及在$600.000\ \mathrm{MHz}$仪器上与TMS以赫兹计的间隔。
::: solution
由[[#eq-shift]]，
$$
\delta = \frac{1476\ \mathrm{Hz}}{400.000\times10^{6}\ \mathrm{Hz}} \times 10^{6} = 3.69\ \mathrm{ppm}.
$$
以ppm计的位移乘以以MHz计的谱仪频率即可换算回赫兹，所以在$600\ \mathrm{MHz}$下该线位于TMS以上$3.69 \times 600.000 = 2214\ \mathrm{Hz}$处。化学位移不变；谱图以赫兹计的展开随磁场增大，这正是购置更大磁体的主要理由。（数值$3.69$与SDBS数据库中乙醇的谱表一致；本课引用的位移值取自SDBS以及Pretsch、Bühlmann与Badertscher的表。）
:::
:::

### 屏蔽从何而来

屏蔽常数有几部分贡献，对每一部分的定性感觉正是预测位移的能力所在。

- **局域抗磁屏蔽。**外磁场驱动原子自身电子云的环流，在核处产生与$B_0$相反的场（朗伯（Lamb）项）。质子周围的电子密度越多，$\sigma$越大而$\delta$越小。电负性的邻居吸走密度并**去屏蔽**：$\mathrm{CH_3}$在烷烃中于$\delta$ 0.9附近共振，在羰基旁为2.1，在甲醇的$\mathrm{CH_3O}$中为3.4，在硝基甲烷中为4.3。
- **局域顺磁贡献。**在具有低激发态的原子中，场把激发态混入基态，感应出*加强*$B_0$的电流。它对氢可以忽略（附近只有s轨道），却主导碳、氮、氟与磷的位移——这就是为什么$^{13}\mathrm{C}$位移跨约$220\ \mathrm{ppm}$，并与低能的$n\to\pi^{*}$与$\pi\to\pi^{*}$激发相关（羰基碳在$\delta$ 200附近）。
- **邻近基团各向异性。**具有各向异性磁化率的邻近键或基团产生的场，在某些方向屏蔽、在另一些方向去屏蔽。羰基的$\pi$电子使醛质子去屏蔽（$\delta$ 9.5–10附近）；$\mathrm{C{\equiv}C}$键的圆柱形$\pi$云使其轴线上的炔质子受到屏蔽，因而后者只出现在约$\delta$ 1.9，而不是烯烃的5–6附近。
- **环电流。**在芳环中，磁场感应出离域$\pi$电子绕整个环的环流。它的环内及其上下方的场与$B_0$相反，却在环外——质子所在的边缘——加强$B_0$：苯的质子在$\delta$ 7.3共振而不是5.7附近。[18]轮烯把这一效应向两个方向都展示出来：外圈质子在$\delta$ 9.3附近，内圈质子在$-3$附近——这是[[organic-2/aromaticity]]中磁判据的经典范例。
- **氢键与交换。**连在氧与氮上的质子的位移随浓度、温度与溶剂而移动，因为氢键使其去屏蔽，而且质子在位点之间交换。

::: warning 高场、低场与"higher field" {#warn-upfield}
"低场"意味着更大的$\delta$、更小的屏蔽与*更高的频率*——不是更强的磁体。这些用语来自连续波仪器：那里频率固定、磁场扫描，去屏蔽的核在*更低*的外磁场下达到共振。在现代傅里叶变换仪器中磁场固定、什么都不扫，所以最稳妥的说法是"更高或更低的$\delta$"或"更高或更低的频率"。同样，"$400\ \mathrm{MHz}$的谱"说的是谱仪，不是其中碳或磷的共振频率（分别为$100.6$与$162.1\ \mathrm{MHz}$）。还有，切勿在不注明磁场的情况下用赫兹引用位移：以赫兹计的偏移随磁场而变，ppm不然。
:::

## 自旋-自旋耦合

再看乙醇：$\mathrm{CH_3}$的信号是三重峰而$\mathrm{CH_2}$的信号是四重峰，两者的线间隔同为$7.0\ \mathrm{Hz}$，在任何一台谱仪上都一样。分裂源自磁性核之间的**标量**耦合或**自旋-自旋**耦合（也称$J$耦合）：一个质子的自旋状态轻微极化成键电子，而该极化被另一个核感受到。这一相互作用是*通过化学键*而非通过空间传递的（通过空间的直接偶极耦合在各项同性的液体中因分子快速翻滚而平均为零），两个自旋在弱耦合极限下的能量为
$$
E_J = hJ\,m_{I,1}\,m_{I,2}
$$ {#eq-j}
其中$J$是以赫兹计的**耦合常数**。由于它是分子电子结构的属性而非磁场的属性，在任何$B_0$下$J$都相同：以赫兹计的位移差随磁场标度，耦合不然。

耦合常数按两核之间的键数标注：$\mathrm{sp^3}$碳的$^{1}J_\mathrm{CH} \approx 125\ \mathrm{Hz}$，$\mathrm{sp^2}$为$160\ \mathrm{Hz}$，$\mathrm{sp}$为$250\ \mathrm{Hz}$（约为s成分的$500\ \mathrm{Hz}$倍）；$\mathrm{sp^3}$碳上的同碳耦合（geminal）$^{2}J_\mathrm{HH}$典型为$-10$至$-15\ \mathrm{Hz}$；邻碳耦合（vicinal）$^{3}J_\mathrm{HH}$在自由旋转的乙基中约为$7\ \mathrm{Hz}$，并通过Karplus关系依赖于二面角，[[spectroscopy/nmr-structure]]将把它用起来；四个或更多键上的耦合通常低于$3\ \mathrm{Hz}$。$J$的符号对理论与某些高级实验有意义，但一级谱中只看到$|J|$。

::: proposition 一级多重峰：n + 1 规律 {#prop-multiplet}
设核A（或全同核组A）以相同的常数$J$与$n$个全同的自旋-$\tfrac12$核X耦合，且$|\nu_\mathrm{A} - \nu_\mathrm{X}| \gg |J|$。则A的共振分裂为间隔$J$、以$\nu_\mathrm{A}$为中心的$n + 1$条线，强度比为二项式系数$\binom{n}{k}$，$k = 0, 1, \ldots, n$（帕斯卡三角：$1{:}1$、$1{:}2{:}1$、$1{:}3{:}3{:}1$、$1{:}4{:}6{:}4{:}1$）。全同的A核之间的耦合不产生分裂。与$n$个自旋为$I$的全同核耦合时，A信号有$2nI + 1$条线。若A以不同的常数与几组不等价的核耦合，则各级分裂相继作用（耦合树）。
:::

::: proof
在弱耦合极限下，每个X核处于$\alpha$（$m = +\tfrac12$）或$\beta$（$m = -\tfrac12$），由[[#eq-j]]，它把A的跃迁移动$\pm\tfrac12 J$，各核之间互不影响。$n$个X自旋中若有$k$个处于$\beta$，则总量子数$M_\mathrm{X} = \tfrac12(n - 2k)$取$n + 1$个值、间隔为1，于是A线出现在$\nu_\mathrm{A} + J M_\mathrm{X}$：$n+1$条间隔$J$的线。由于X的布居几乎精确相等（[[#prop-boltzmann]]的超额约为$10^{-5}$），$2^{n}$种X自旋组态全都等概率，其中$k$个自旋处于$\beta$的组态数目是$\binom{n}{k}$——这就是各线的强度。对自旋$I$，$M_\mathrm{X}$从$-nI$到$+nI$以1为步长变化，给出$2nI + 1$个值。全同核互不分裂这一事实来自完整的量子处理：对位移与耦合都相同的一组核，耦合项与总自旋对易，该组内的跃迁发生在与$J$无关的单一频率上。
:::

::: example 乙醇的乙基 {#ex-ethyl}
干燥乙醇的$\mathrm{CDCl_3}$溶液中，$\mathrm{CH_3}$质子在$\delta$ 1.22、$\mathrm{CH_2}$质子在$\delta$ 3.69，$^{3}J = 7.0\ \mathrm{Hz}$。预告两个多重峰，并检验该谱在$60\ \mathrm{MHz}$与$400\ \mathrm{MHz}$下都是一级的。为什么$\mathrm{CH_2}$通常是简单的四重峰而不是二重峰的四重峰？
::: solution
$\mathrm{CH_3}$质子看到两个全同的$\mathrm{CH_2}$质子：$n = 2$，线间隔$7.0\ \mathrm{Hz}$的$1{:}2{:}1$三重峰。$\mathrm{CH_2}$质子看到三个$\mathrm{CH_3}$质子：$1{:}3{:}3{:}1$四重峰。积分比为$3{:}2$。位移差为$3.69 - 1.22 = 2.47\ \mathrm{ppm}$，即$60\ \mathrm{MHz}$下的$2.47 \times 60 = 148\ \mathrm{Hz}$与$400\ \mathrm{MHz}$下的$988\ \mathrm{Hz}$，故$\Delta\nu/J$为$21$与$141$：在两个磁场下都是一级的，只是在较低磁场下多重峰彼此间略有倾斜。$\mathrm{OH}$质子对$\mathrm{CH_2}$质子也有约$5\ \mathrm{Hz}$的$^{3}J$耦合，但在普通样品中，痕量的酸或水把羟基质子的分子间交换催化得比$J$快得多；$\mathrm{CH_2}$质子于是只看到$\mathrm{OH}$位置自旋状态的平均，耦合消失（见[[#prop-coalescence]]）。在极纯、极干的乙醇中，或在靠氢键减慢交换的DMSO-$d_6$中，$\mathrm{OH}$表现为三重峰，而$\mathrm{CH_2}$表现为四重峰的二重峰。
:::
:::

::: quiz 数线
2-溴丙烷$\mathrm{(CH_3)_2CHBr}$的次甲基$\mathrm{CH}$质子在一幅一级谱中显示几条线，其最外线与中心线的强度比是多少？
- [ ] 四重峰；$1{:}3$
- [ ] 四重峰的二重峰；$1{:}1$
- [x] 七重峰；$1{:}20$
- [ ] 二重峰的七重峰；$1{:}6$
::: solution
六个甲基质子是全同的（自由旋转，且两个甲基被镜面互相交换），故$n = 6$给出$n + 1 = 7$条线，二项式强度$1{:}6{:}15{:}20{:}15{:}6{:}1$；最外线只有中心线的$1/20$高，这就是有噪声的谱中七重峰的外线很容易被漏看的原因。甲基信号是二重峰（$n = 1$）。溴的同位素是四极核，弛豫极快，因而不分裂质子信号。
:::
:::

### 当 n + 1 规律失效：二级谱

该规律假定了$\Delta\nu \gg J$。当以赫兹计的位移差变得与$J$相当时，两个自旋的状态发生混合，谱成为**二级**。两个自旋-$\tfrac12$核的情形，用位移相近的核在字母表中也相邻的字母来命名：**AX**（$\Delta\nu/J \gtrsim 10$：两条干净的二重峰）、**AB**（$\Delta\nu/J$约为1：四条强度畸变的线），以及**A₂**（位移全同：一条单线，耦合不可见）。AB图样可以精确求解。令$D = \sqrt{\Delta\nu^{2} + J^{2}}$，四条线位于中心两侧$\pm\tfrac12(D + J)$与$\pm\tfrac12(D - J)$处，外对线的强度正比于$1 - J/D$，内对正比于$1 + J/D$。两条二重峰彼此"倾斜"——**屋顶效应**——而化学位移不再位于二重峰的中心，而在$\pm\tfrac12\Delta\nu$处，即强度加权的位置。

::: widget plot
f: (1-c/sqrt(d^2+c^2))*(0.25/((x-(sqrt(d^2+c^2)+c)/2)^2+0.25)+0.25/((x+(sqrt(d^2+c^2)+c)/2)^2+0.25))+(1+c/sqrt(d^2+c^2))*(0.25/((x-(sqrt(d^2+c^2)-c)/2)^2+0.25)+0.25/((x+(sqrt(d^2+c^2)-c)/2)^2+0.25))
x: -45, 45
y: 0, 4.2
sliders: d=40:0:80:1; c=8:1:20:0.5
labels: \text{AB谱}
caption: 两个耦合自旋-$\tfrac12$核的精确谱，频率以赫兹计、从图样中心量起，洛伦兹线半宽$0.5\ \mathrm{Hz}$，位移差$\Delta\nu$（`d`）与耦合常数$J$（`c`）由滑块设定。当$\Delta\nu/J \approx 10$时，看到的是两条几乎等高二重峰构成的AX谱。减小`d`，内线以外线为代价增长——屋顶效应——直到$\Delta\nu = 0$（A₂体系）时外线消失、内线并成一条线：全同核不显示分裂。每条二重峰内的线间隔始终精确等于$J$。
:::

::: example 两个磁场下的屋顶效应 {#ex-roof}
相邻碳上两个芳烃质子的位移差为$0.10\ \mathrm{ppm}$，$^{3}J = 8.0\ \mathrm{Hz}$。求$60\ \mathrm{MHz}$与$600\ \mathrm{MHz}$下的$\Delta\nu/J$以及内线与外线的强度比。
::: solution
$60\ \mathrm{MHz}$下，$\Delta\nu = 0.10 \times 60 = 6.0\ \mathrm{Hz}$，$\Delta\nu/J = 0.75$：强二级。于是$D = \sqrt{6.0^{2} + 8.0^{2}} = 10.0\ \mathrm{Hz}$，
$$
\frac{I_\mathrm{inner}}{I_\mathrm{outer}} = \frac{1 + J/D}{1 - J/D} = \frac{1.8}{0.2} = 9.0 .
$$
外线几乎看不见，图样看起来像一条略微分裂的单峰。$600\ \mathrm{MHz}$下，$\Delta\nu = 60\ \mathrm{Hz}$，$\Delta\nu/J = 7.5$，$D = 60.5\ \mathrm{Hz}$，比值为$1.132/0.868 = 1.30$：两条清楚分开的二重峰，屋顶效应轻微，接近一级。高场简化谱图，因为$\Delta\nu$随$B_0$增大而$J$不随之增大。
:::
:::

### 化学等价与磁等价

n + 1 规律数的是*全同*的邻居，所以"全同"到底意味着什么就至关重要。

::: definition 化学等价与磁等价 {#def-equivalence}
若分子中的核能被分子的某个对称操作、或在核磁共振时间尺度上快速的过程（如绕单键的旋转）互相交换，则它们是**化学等价**（等时）的；它们因而具有相同的化学位移。若一组化学等价核还额外满足其中每个核对组外的每一个核都有相同的耦合常数，则这组核**磁等价**。只有磁等价的核才像[[#prop-multiplet]]中"全同的$n$个核"那样行为，并且组内不显示分裂。
:::

经典的反例是1,1-二氟乙烯$\mathrm{H_2C{=}CF_2}$：两个质子由对称相关、因而是化学等价的，但每个质子对某个氟是*顺*式、对另一个是*反*式，二者耦合不同（$^{3}J_{cis} \ne {}^{3}J_{trans}$）。它们是磁不等价的，其谱是许多条线构成的AA′XX′图样而不是简单的三重峰。带两个不同取代基的*对*位二取代苯是常见的例子：乍看像"两个二重峰"的实际上是AA′BB′或AA′XX′多重峰。相比之下，$\mathrm{CH_3}$基的质子是磁等价的，因为快速旋转平均了它们与其他每一个核的耦合。一个相关的微妙之处——**非对映异位**质子，如手性中心旁两个$\mathrm{CH_2}$质子，任何对称操作都不能把它们交换，因而位移不同——连同实例在[[spectroscopy/nmr-structure]]中讨论。

## 弛豫

脉冲之后自旋不会停留在倾倒位置：磁化回到$z$方向的平衡值$M_0$，横向磁化则消逝。布洛赫（Bloch）用两个时间常数描述了这两个过程。

::: definition 纵向弛豫与横向弛豫 {#def-relaxation}
**纵向（自旋-晶格）弛豫**恢复布居差与$z$磁化，$\mathrm{d}M_z/\mathrm{d}t = -(M_z - M_0)/T_1$；它需要与环境（"晶格"）交换能量，由涨落的局域场驱动——主要是被分子翻滚调制的邻近核的偶极场——中具有$\nu_0$附近频率的分量。**横向（自旋-自旋）弛豫**摧毁进动自旋的相位相干，$\mathrm{d}M_{xy}/\mathrm{d}t = -M_{xy}/T_2$，不需要交换能量。总有$T_2 \le 2T_1$；小分子在非黏稠溶液中$T_1 \approx T_2$，质子典型为$0.5$–$10\ \mathrm{s}$，而大的、翻滚缓慢的分子与固体有$T_2 \ll T_1$。
:::

$T_1$决定扫描可以多频繁地重复：90°脉冲之后，等待$5T_1$恢复$99.3\,\%$的$M_0$。$T_2$决定线的宽度，因为衰减更快的信号包含更宽的频率范围。

::: proposition 线宽与 T₂ {#prop-linewidth}
FID $\mathrm{e}^{\mathrm{i}2\pi\nu_0 t}\,\mathrm{e}^{-t/T_2}$（$t \ge 0$）的傅里叶变换是一条**洛伦兹**吸收线
$$
A(\nu) \propto \frac{T_2}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}}, \qquad \Delta\nu_{1/2} = \frac{1}{\pi T_2},
$$ {#eq-linewidth}
其中$\Delta\nu_{1/2}$是半高全宽。实践中，观察到的宽度对应一个有效$T_2^{*} < T_2$，它计入了样品范围内不均匀磁场造成的频率散开。
:::

::: proof
积分：$\int_0^{\infty} \mathrm{e}^{-t/T_2}\,\mathrm{e}^{\mathrm{i}2\pi(\nu_0 - \nu)t}\,\mathrm{d}t = \dfrac{1}{1/T_2 - \mathrm{i}2\pi(\nu_0 - \nu)}$。分子分母同乘共轭复数，实部（吸收模式）为$\dfrac{1/T_2}{1/T_2^{2} + 4\pi^{2}(\nu - \nu_0)^{2}} = \dfrac{T_2}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}}$。其最大值$T_2$在$\nu = \nu_0$处；当$4\pi^{2}T_2^{2}(\nu - \nu_0)^{2} = 1$即$\nu - \nu_0 = \pm 1/2\pi T_2$时降为最大值的一半。全宽为此的两倍，$1/\pi T_2$。这一关系正是[[spectroscopy/spectroscopy-principles]]中的寿命加宽在核磁共振里的化身。
:::

### 测量 T₁ 与 T₂：反转恢复与自旋回波

**反转恢复**测量$T_1$。180°脉冲把磁化反演到$M_z = -M_0$；延迟$\tau$后，90°脉冲读出已经恢复了多大一部分。在$M_z(0) = -M_0$下求解布洛赫方程得
$$
M_z(\tau) = M_0\left(1 - 2\,\mathrm{e}^{-\tau/T_1}\right),
$$ {#eq-ir}
于是信号从反转开始，在$\tau_\mathrm{null} = T_1\ln 2$处过零，并增长回$+M_0$。对一系列$\tau$记录谱并拟合[[#eq-ir]]（或直接找零点），一次就给出每条可分辨线的$T_1$。

::: widget plot
f: 1-2*exp(-x/t); 1-exp(-x/t)
x: 0, 10
y: -1.05, 1.05
sliders: t=1.5:0.2:5:0.1
labels: \text{反转恢复 } M_z/M_0; \text{饱和恢复 } M_z/M_0
hlines: 0
caption: 纵向磁化$M_z/M_0$对延迟$\tau$（秒）的恢复，弛豫时间$T_1$（`t`，单位秒）由滑块设定。180°脉冲后（第一条曲线）$M_z$从$-M_0$上升，在$\tau = T_1\ln 2 = 0.693\,T_1$处过零；90°脉冲或饱和之后（第二条曲线）从零开始。两者都要约$5T_1$之后才达到平衡值的$99\,\%$，这就是扫描之间的弛豫延迟——而不是脉冲或采集——通常主导核磁共振实验耗时的原因——也是定量积分需要数个$T_1$延迟的原因。
:::

哈恩（Erwin Hahn）发现的**自旋回波**把真正的$T_2$与磁场不均匀分开。90°脉冲后，样品各部分的自旋以略不相同的速率进动并在$xy$平面上散开，故FID以$T_2^{*}$衰减。$t = \tau$时刻的180°脉冲把扇形翻面，使原先快的自旋现在落后于慢的；到$2\tau$它们重新全部重合，形成**回波**。静态不均匀造成的失相位被完美重聚焦，而真正随机的自旋-自旋过程造成的则不能，所以回波幅值按$\mathrm{e}^{-2\tau/T_2}$衰减。回波还重聚焦化学位移差而让同核耦合保持有效，这是许多多脉冲实验与磁共振成像背后的核心技巧。

::: example 由反转恢复零点求 T₁，并求线宽 {#ex-relax}
反转恢复实验中，一个小分子的甲基信号在$\tau = 0.40\ \mathrm{s}$处过零。(a) $T_1$是多少？(b) 要使该信号能定量积分，弛豫延迟应取多长？(c) 若$T_2 = T_1$，它的自然线宽是多少？
::: solution
(a) 由[[#eq-ir]]，$M_z = 0$当$\mathrm{e}^{-\tau/T_1} = \tfrac12$，故$T_1 = \tau_\mathrm{null}/\ln 2 = 0.40/0.6931 = 0.58\ \mathrm{s}$。
(b) 90°脉冲之间留出$5T_1 = 2.9\ \mathrm{s}$可恢复$1 - \mathrm{e}^{-5} = 99.3\,\%$的$M_0$；定量工作的延迟必须由要积分的信号中弛豫*最慢*者决定，常常是季碳或$T_1$达数秒的孤立质子。
(c) 由[[#eq-linewidth]]，$\Delta\nu_{1/2} = 1/(\pi \times 0.577\ \mathrm{s}) = 0.55\ \mathrm{Hz}$。实测宽度通常更大（常为$0.5$–$1\ \mathrm{Hz}$），因为有残余的磁场不均匀，即$T_2^{*} < T_2$；匀场这门艺术就是让$T_2^{*}$逼近$T_2$。
:::
:::

### 核Overhauser效应

弛豫还把自旋彼此耦合起来。若一组核S被连续照射而饱和，则与之通过偶极相互作用弛豫的邻近核I的布居受到扰动，I信号的强度随之改变：这就是**核Overhauser效应**（NOE）。对快速翻滚的小分子，最大分数增强为$\eta_\mathrm{max} = \gamma_\mathrm{S}/2\gamma_\mathrm{I}$，两个质子时为$+0.5$，照射质子的同时观测$^{13}\mathrm{C}$时为$+1.99$（即[[#ex-receptivity]]中用到的增益）。由于偶极相互作用按$r^{-6}$衰减，同核NOE只在相距约$5\ \mathrm{\AA}$以内的核之间可观测——是*通过空间*而非通过化学键——这使NOE差谱与二维NOESY成为相对立体化学与蛋白质结构的标准工具，[[spectroscopy/nmr-structure]]有所展示。

## 化学交换与核磁共振的时间尺度

一个在位移不同的两种环境之间跳来跳去的核——酰胺绕$\mathrm{C{-}N}$键旋转时的两个甲基、环翻转的环己烷的直立与平伏质子、在分子之间移动的乙醇$\mathrm{OH}$质子——其给出的谱取决于跳跃速率与频率之差的比。若交换慢（$k \ll \Delta\nu$）出现两条分开的线；若快（$k \gg \Delta\nu$），一条尖锐的线位于按布居加权的平均位移处；介于两者之间时，线变宽、相互移动并合并。"快"与"慢"以赫兹计的$\Delta\nu$为标尺来衡量：位移差为$10$–$10^{3}\ \mathrm{Hz}$时，核磁共振对速率常数约$1$–$10^{4}\ \mathrm{s^{-1}}$的过程敏感，这是其他任何技术都不能如此直接提供的、通往构象化学与流变（fluxional）化学的窗口。

::: proposition 两个等布居位点的合并 {#prop-coalescence}
在相距$\Delta\nu$（赫兹）的两个等布居位点之间交换，每个正向跳跃具有一级速率常数$k$，且自然线宽与$\Delta\nu$相比可以忽略，则当
$$
k_\mathrm{c} = \frac{\pi\,\Delta\nu}{\sqrt{2}} \approx 2.22\,\Delta\nu .
$$ {#eq-coalescence}
两条线合并为一条平顶线——**合并**（coalescence）。与合并温度$T_\mathrm{c}$下的艾林方程$k = (k_\mathrm{B}T/h)\,\mathrm{e}^{-\Delta G^{\ddagger}/RT}$联用，即得活化自由能$\Delta G^{\ddagger} = RT_\mathrm{c}\ln\!\left(k_\mathrm{B}T_\mathrm{c}/hk_\mathrm{c}\right)$。
:::

::: proof 由交换线形求轮廓
求解为交换修正的布洛赫方程（McConnell方程），对$\nu_\mathrm{c} \pm \tfrac12\Delta\nu$处两个等布居位点，令$\tau = 1/2k$、$u = \nu - \nu_\mathrm{c}$，得线形
$$
g(u) \propto \frac{\tau\,\Delta\nu^{2}}{u^{2} + 4\pi^{2}\tau^{2}\left(u^{2} - \tfrac14\Delta\nu^{2}\right)^{2}} .
$$
中心附近分母展开为$4\pi^{2}\tau^{2}\left(\tfrac14\Delta\nu^{2}\right)^{2} + u^{2}\left(1 - 2\pi^{2}\tau^{2}\Delta\nu^{2}\right) + O(u^{4})$。若$u^{2}$的系数为负，$g$在$u = 0$处有凹陷（两个峰）；为正则有极大（一个峰）。中心平坦的边界是$2\pi^{2}\tau^{2}\Delta\nu^{2} = 1$，即$\tau = 1/(\sqrt{2}\,\pi\Delta\nu)$，于是$k_\mathrm{c} = 1/2\tau = \pi\Delta\nu/\sqrt{2}$。艾林形式假定了透射系数为一，与[[kinetics/transition-state-theory]]中相同。
:::

::: example 酰胺的旋转势垒 {#ex-coalescence}
某$N,N$-二甲基酰胺的两个$\mathrm{N{-}CH_3}$信号在$300\ \mathrm{MHz}$下相距$0.10\ \mathrm{ppm}$，在$350\ \mathrm{K}$合并（此类酰胺的典型示例数值）。估算合并时的速率常数与绕$\mathrm{C{-}N}$键旋转的活化自由能。
::: solution
$\Delta\nu = 0.10 \times 300 = 30\ \mathrm{Hz}$，故由[[#eq-coalescence]]，$k_\mathrm{c} = \pi \times 30/\sqrt{2} = 66.6\ \mathrm{s^{-1}}$。于是
$$
\Delta G^{\ddagger} = RT_\mathrm{c}\ln\frac{k_\mathrm{B}T_\mathrm{c}}{hk_\mathrm{c}}
= 8.314 \times 350 \times \ln\frac{1.3806\times10^{-23} \times 350}{6.626\times10^{-34} \times 66.6}\ \mathrm{J\,mol^{-1}}
= 2910 \times \ln(1.095\times10^{11}) = 74.0\ \mathrm{kJ\,mol^{-1}} .
$$
如此高的势垒反映了酰胺$\mathrm{C{-}N}$键的部分双键性质（[[organic-2/carboxylic-derivatives]]中的共振）；简单单键旋转的势垒只有约$12\ \mathrm{kJ\,mol^{-1}}$，在任何可达温度下都远处于快交换极限。注意$\Delta G^{\ddagger}$只随$k_\mathrm{c}$对数变化，所以$\Delta\nu$即使有$20\,\%$的误差也只把势垒移动约$0.5\ \mathrm{kJ\,mol^{-1}}$；温度才是关键的测量。由于以赫兹计的$\Delta\nu$随磁场增大，同一酰胺在更高场的仪器上于*更高*的温度合并——"在核磁共振时间尺度上快"取决于谱仪。
:::
:::

::: remark 核磁共振磁体周围的安全 {#rem-safety}
超导核磁共振磁体永远处于开启状态。它的杂散磁场会使心脏起搏器及其他植入设备停摆或改变程控，因此携带这类设备的人必须留在标定的$0.5\ \mathrm{mT}$（5高斯）线之外；铁磁性物体——气瓶、工具、椅子——可能以致命的力量被吸进磁体，绝不可带近；磁条卡与机械手表会被损坏。磁体以液氮夹套内的液氦冷却：重新加注需要受过训练、需要低温手套与面罩保护；一旦发生**失超**（超导性的突然丧失），数百升氦气会沸腾汽化，可能排空小房间里的空气——因此核磁共振实验室要配氧气监测仪与通风。样品通常量少而温和，但$\mathrm{CDCl_3}$之类的氘代溶剂带有与其质子化形式相同的危害，须在通风橱中处理。与所有实验工作一样，仪器的使用需要培训、监督与风险评估。
:::

## 后续内容

化学家从一张常规谱图上读出的一切——位移、积分、多重性、耦合——都建立在本课之上；[[spectroscopy/nmr-structure]]把它变成测定结构的方法，包括由这里介绍的脉冲、延迟与相干构成的二维实验（COSY、HSQC、HMBC、NOESY）。同样的物理，把核换成电子，$\gamma$大约大658倍，用微波代替射频，就是[[spectroscopy/epr]]；其中的超精细耦合相当于这里的$J$耦合。傅里叶方法与信号累加在红外光谱（[[spectroscopy/vibrational-spectroscopy]]）中重现，而核磁共振、红外与质谱在实际中的结合是[[spectroscopy/structure-problems]]的主题。动态核磁共振与[[kinetics/transition-state-theory]]的势垒和速率常数相连；由NOE导出的距离支撑着[[biochemistry/amino-acids-proteins]]中的蛋白质结构；而自旋回波与弛豫时间反差加上用于空间编码的梯度场，正是医学磁共振成像的基础。

::: history
拉比（Isidor Rabi）1938年在分子束中观察到核磁共振（1944年诺贝尔物理学奖）。1946年两个小组独立地在宏观物质中探测到它：珀塞尔（Edward Purcell）、托里（Henry Torrey）与庞德（Robert Pound）在固体石蜡中，布洛赫（Felix Bloch）、汉森（William Hansen）与帕卡德（Martin Packard）在水中；布洛赫与珀塞尔分享了1952年诺贝尔物理学奖。布洛姆贝根（Nicolaas Bloembergen）、珀塞尔与庞德1948年的弛豫理论用分子运动解释了$T_1$与$T_2$。化学位移发现于1950年（Warren Proctor与Fu Chun Yu之于硝酸铵中的氮，W. C. Dickinson之于氟），哈恩（Erwin Hahn）1950年报道了自旋回波，1951年阿诺德（James Arnold）、达尔马蒂（S. S. Dharmatti）与帕卡德分辨出乙醇的三个质子信号——正是开启本课的那张谱。自旋-自旋耦合于1951年由古托夫斯基（Herbert Gutowsky）、麦考尔（David McCall）与斯利希特（Charles Slichter）以及哈恩与马克斯韦尔（Donald Maxwell）确认；Tiers于1958年提议以TMS为参考物。恩斯特（Richard Ernst）与安德森（Weston Anderson）1966年引入脉冲傅里叶变换核磁共振，这是一切现代仪器的基础；恩斯特为此及二维核磁共振获1991年诺贝尔化学奖，维特里希（Kurt Wüthrich）以核磁共振测定蛋白质结构分享2002年化学奖。劳特伯（Paul Lauterbur）1973年关于用梯度场成像的论文与曼斯菲尔德（Peter Mansfield）对快速成像的发展赢得2003年诺贝尔生理学或医学奖。
:::

::: summary
- $I \ne 0$的核带有磁矩$\mu_z = \gamma\hbar m_I$；在磁场$B_0$中其$2I+1$个塞曼能级间隔$\gamma\hbar B_0$，按$\Delta m_I = \pm1$在拉莫尔频率$\nu_0 = \gamma B_0/2\pi$处吸收（$9.40\ \mathrm{T}$下$^{1}\mathrm{H}$为$400\ \mathrm{MHz}$）。
- $400\ \mathrm{MHz}$下的布居超额只有$h\nu_0/2k_\mathrm{B}T \approx 3\times10^{-5}$；检测灵敏度按$|\gamma|^{3}I(I+1)$乘以丰度标度，$^{13}\mathrm{C}$只有$^{1}\mathrm{H}$的$1.70\times10^{-4}$。
- 脉冲以$\theta = \gamma B_1 t_\mathrm{p}$倾倒宏观磁化；90°脉冲后的FID经傅里叶变换成谱，数字分辨率为$1/t_\mathrm{acq}$，$S/N$随扫描次数按$\sqrt{n}$增长。
- 电子屏蔽原子核，$\nu = \gamma B_0(1-\sigma)/2\pi$；相对TMS的化学位移$\delta = (\nu - \nu_\mathrm{ref})/\nu_\mathrm{ref}\times10^{6}$与磁场无关，由电子密度、顺磁项、基团各向异性与环电流决定。
- 通过化学键的标量耦合$J$（以Hz计，与磁场无关）在$\Delta\nu \gg J$时把与$n$个全同自旋-$\tfrac12$核耦合的信号分裂为二项式强度的$n+1$条线；否则出现二级效应如AB屋顶，而且只有磁等价的核才算全同。
- $T_1$恢复$M_z$（反转恢复零点在$T_1\ln2$处）并限制重复速率；$T_2$摧毁横向相干并决定洛伦兹线宽$1/\pi T_2$；自旋回波消除不均匀失相位；NOE报告约$5\ \mathrm{\AA}$以内的空间邻近。
- 两个位点之间的交换慢时给出分开的线，快时给出平均线，在$k_\mathrm{c} = \pi\Delta\nu/\sqrt{2}$处合并，由艾林方程可得势垒。
:::

## 习题

::: exercise 碳-13的频率 {level=1 check="150.90"}
某谱仪的质子频率恰为$600.000\ \mathrm{MHz}$。同一磁体中$^{13}\mathrm{C}$在什么频率共振？取$\gamma(^{1}\mathrm{H}) = 26.752\times10^{7}$与$\gamma(^{13}\mathrm{C}) = 6.7283\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$。（以MHz输入频率。）
::: solution
两核感受同一$B_0$，故由[[#eq-larmor]]其频率之比等于磁旋比之比：$\nu(^{13}\mathrm{C}) = 600.000 \times 6.7283/26.752 = 150.90\ \mathrm{MHz}$。（屏蔽至多改变万分之几，即化学位移范围。）
:::
:::

::: exercise 由ppm到赫兹 {level=1 check="1500"}
一个单峰出现在$\delta$ 2.50，该谱在$600.0\ \mathrm{MHz}$下采集。它离TMS信号多少赫兹？（以Hz输入间隔。）
::: solution
由[[#eq-shift]]，$\nu - \nu_\mathrm{ref} = \delta \times 10^{-6} \times \nu_\mathrm{ref} = 2.50\times10^{-6} \times 600.0\times10^{6}\ \mathrm{Hz} = 1500\ \mathrm{Hz}$。在$300\ \mathrm{MHz}$仪器上同一信号离TMS $750\ \mathrm{Hz}$，但仍位于$\delta$ 2.50。
:::
:::

::: exercise 次甲基质子的多重数 {level=1 check="7"}
连在不带质子的碳上的异丙基$\mathrm{(CH_3)_2CH{-}}$的$\mathrm{CH}$质子，在一级谱中显示几条线？给出强度图样。（输入线数。）
::: solution
次甲基质子以相同的$^{3}J$与六个全同的甲基质子耦合，故由[[#prop-multiplet]]分裂为$6 + 1 = 7$条线——七重峰——强度为$\binom{6}{k} = 1{:}6{:}15{:}20{:}15{:}6{:}1$。甲基质子表现为6H的二重峰。
:::
:::

::: exercise 600 MHz 下的布居超额 {level=2 check="48.3"}
计算$600\ \mathrm{MHz}$谱仪上$298\ \mathrm{K}$时质子的分数布居超额$(N_\alpha - N_\beta)/N$。（以百万分率输入。）
::: solution
由[[#eq-excess]]，$(N_\alpha - N_\beta)/N \approx h\nu_0/2k_\mathrm{B}T = 6.62607\times10^{-34} \times 6.000\times10^{8}/(2 \times 1.380649\times10^{-23} \times 298) = 4.83\times10^{-5}$，即$48.3$ ppm。近似$\tanh x \approx x$在此精确到十亿分之一。即使在最高商品磁场（约$28\ \mathrm{T}$、$1.2\ \mathrm{GHz}$）下，超额仍低于$10^{-4}$。
:::
:::

::: exercise 由 T₂ 求线宽 {level=2 check="0.637"}
某质子的$T_2 = 0.50\ \mathrm{s}$。设磁场完全均匀，其线的半高全宽是多少？（以Hz输入宽度。）
::: solution
由[[#eq-linewidth]]，$\Delta\nu_{1/2} = 1/\pi T_2 = 1/(\pi \times 0.50\ \mathrm{s}) = 0.637\ \mathrm{Hz}$。要分辨这样窄的线，采集时间至少要约$1/0.637 \approx 1.6\ \mathrm{s}$，且样品范围内的磁场均匀性必须在$400\ \mathrm{MHz}$下优于约十亿分之$1.6$。
:::
:::

::: exercise 反转恢复的零点 {level=2 check="0.721"}
反转恢复实验中某信号在延迟$\tau = 0.50\ \mathrm{s}$时消失。它的$T_1$是多少？（以s输入$T_1$。）
::: solution
由[[#eq-ir]]，$1 - 2\mathrm{e}^{-\tau/T_1} = 0$给出$\tau = T_1\ln 2$，故$T_1 = 0.50/0.6931 = 0.721\ \mathrm{s}$。快速检验：$\tau = T_1$时信号应为$1 - 2/\mathrm{e} = +0.26$的$M_0$，已经为正，与零点在$0.69\,T_1$处相符。
:::
:::

::: exercise AB 体系的屋顶效应 {level=2 check="2.62"}
两个耦合质子的$\Delta\nu = 20.0\ \mathrm{Hz}$、$J = 10.0\ \mathrm{Hz}$。求四条AB线相对中心的位置，以及内线与外线的强度比。（输入强度比。）
::: hint
用$D = \sqrt{\Delta\nu^{2} + J^{2}}$；线位于$\pm\tfrac12(D \pm J)$，强度为$1 \mp J/D$。
:::
::: solution
$D = \sqrt{20.0^{2} + 10.0^{2}} = 22.36\ \mathrm{Hz}$。外线位于$\pm\tfrac12(D + J) = \pm 16.18\ \mathrm{Hz}$，内线位于$\pm\tfrac12(D - J) = \pm 6.18\ \mathrm{Hz}$；每条二重峰内的间隔为$16.18 - 6.18 = 10.0\ \mathrm{Hz} = J$，理应如此。强度比为$(1 + J/D)/(1 - J/D) = 1.447/0.553 = 2.62$。两条二重峰的中心位于$\pm 11.18\ \mathrm{Hz}$，而真正的位移在$\pm\tfrac12\Delta\nu = \pm 10.0\ \mathrm{Hz}$：在有屋顶的谱中从二重峰中心读位移，会把$\Delta\nu$高估$\sqrt{\Delta\nu^{2} + J^{2}} - \Delta\nu$。
:::
:::

::: exercise 稀样品需要的扫描数 {level=2 check="256"}
稀样品的质子谱在16次扫描后$S/N = 25$。要达到$S/N = 100$需要多少次扫描？其他条件不变。（输入扫描次数。）
::: solution
由[[#prop-signal-averaging]]，$S/N \propto \sqrt{n}$；提高4倍需要$n$提高十六倍，故$16 \times 16 = 256$次扫描。浓度加倍与扫描次数四倍等效，这就是样品制备常常是获得灵敏度最廉价途径的原因。
:::
:::

::: exercise 由合并求势垒 {level=3 check="67.7"}
在$400\ \mathrm{MHz}$仪器上，两个等布居、相距$0.15\ \mathrm{ppm}$的信号在$330\ \mathrm{K}$合并。估算交换过程的$\Delta G^{\ddagger}$。设$\Delta G^{\ddagger}$与温度无关，在$100\ \mathrm{MHz}$仪器上预计在什么温度合并？（以kJ mol⁻¹输入$\Delta G^{\ddagger}$。）
::: hint
先求以赫兹计的$\Delta\nu$；低场下$k_\mathrm{c}$小四倍，而艾林表达式对$T_\mathrm{c}$要迭代求解。
:::
::: solution
$\Delta\nu = 0.15 \times 400 = 60\ \mathrm{Hz}$，故$k_\mathrm{c} = \pi \times 60/\sqrt{2} = 133.3\ \mathrm{s^{-1}}$。由[[#prop-coalescence]]，
$$
\Delta G^{\ddagger} = 8.314 \times 330 \times \ln\frac{1.3806\times10^{-23} \times 330}{6.626\times10^{-34} \times 133.3}\ \mathrm{J\,mol^{-1}} = 2744 \times \ln(5.16\times10^{10}) = 67.7\ \mathrm{kJ\,mol^{-1}} .
$$
$100\ \mathrm{MHz}$下，$\Delta\nu = 15\ \mathrm{Hz}$、$k_\mathrm{c} = 33.3\ \mathrm{s^{-1}}$。需要$T$满足$RT\ln(k_\mathrm{B}T/hk_\mathrm{c}) = 67.7\ \mathrm{kJ\,mol^{-1}}$。试$T = 315\ \mathrm{K}$：$8.314 \times 315 \times \ln(1.97\times10^{11}) = 2619 \times 26.01 = 68.1\ \mathrm{kJ\,mol^{-1}}$，略高；$T = 313\ \mathrm{K}$给出$67.7\ \mathrm{kJ\,mol^{-1}}$。故合并发生在约$313\ \mathrm{K}$，比$400\ \mathrm{MHz}$时约低$17\ \mathrm{K}$：较小的频率间隔被较慢的交换就平均掉了。
:::
:::

::: exercise 推导洛伦兹线型及其宽度 {level=3}
(a) 证明$t \ge 0$时$s(t) = \mathrm{e}^{-t/T_2}\cos(2\pi\nu_0 t)$的吸收模式傅里叶变换在$\nu_0$附近是半高全宽$1/\pi T_2$的洛伦兹线。(b) 证明洛伦兹线下的面积与$T_2$无关，并解释为什么这意味着用积分而不是峰高度来度量核的数目。(c) 若磁场不均匀对每条线宽额外贡献$0.5\ \mathrm{Hz}$，$T_2 = 2.0\ \mathrm{s}$的一条线的观测宽度是多少？
::: solution
(a) 写$\cos(2\pi\nu_0 t) = \tfrac12(\mathrm{e}^{\mathrm{i}2\pi\nu_0 t} + \mathrm{e}^{-\mathrm{i}2\pi\nu_0 t})$。$\nu = +\nu_0$附近第二项在$-\nu_0$处贡献一条线，远在别处，可忽略。第一项如[[#prop-linewidth]]的证明所给，$\tfrac12\int_0^{\infty}\mathrm{e}^{-t/T_2}\mathrm{e}^{-\mathrm{i}2\pi(\nu - \nu_0)t}\,\mathrm{d}t = \tfrac12\,\dfrac{1}{1/T_2 + \mathrm{i}2\pi(\nu - \nu_0)}$，其实部为$\tfrac12 T_2/[1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}]$。它在$\nu_0$处最大，在$|\nu - \nu_0| = 1/2\pi T_2$处减半，故半高全宽为$1/\pi T_2$。
(b) 令$x = 2\pi T_2(\nu - \nu_0)$，$\int_{-\infty}^{\infty}\dfrac{T_2\,\mathrm{d}\nu}{1 + 4\pi^{2}T_2^{2}(\nu - \nu_0)^{2}} = \dfrac{1}{2\pi}\int_{-\infty}^{\infty}\dfrac{\mathrm{d}x}{1 + x^{2}} = \dfrac{1}{2\pi}\cdot\pi = \tfrac12$，与$T_2$无关。（等价地，谱的面积等于$t = 0$时的FID，而后者只由$M_0$决定。）宽线更矮但并不更小，所以只要扫描之间完全弛豫，面积——积分——就正比于核的数目而不论其弛豫如何；峰高则不然。
(c) 自然宽度为$1/(\pi \times 2.0) = 0.16\ \mathrm{Hz}$；加上不均匀的贡献约得$0.66\ \mathrm{Hz}$，对应$T_2^{*} = 1/(\pi \times 0.66) = 0.48\ \mathrm{s}$。在多数小分子谱中，决定线宽的是磁体而不是分子。
:::
:::

::: exercise 检测灵敏度比较 {level=3 check="391"}
用[[#eq-receptivity]]，取$\gamma(^{31}\mathrm{P}) = 10.839\times10^{7}$、$\gamma(^{13}\mathrm{C}) = 6.7283\times10^{7}\ \mathrm{s^{-1}\,T^{-1}}$与天然丰度$100\,\%$和$1.07\,\%$，$^{31}\mathrm{P}$比$^{13}\mathrm{C}$的检测灵敏度高出多少倍？由此解释为什么$^{31}\mathrm{P}$核磁共振对膦与磷酸盐是常规技术，并估计等量的P位点与C位点上，$^{13}\mathrm{C}$谱要达到相同的$S/N$需要多扫描几倍。（输入灵敏度比。）
::: solution
两者都是$I = \tfrac12$。比值为$(10.839/6.7283)^{3} \times (100/1.07) = (1.6110)^{3} \times 93.46 = 4.181 \times 93.46 = 391$。磷-31天然全丰度，磁旋比约为质子的$40\,\%$，所以膦配体或核苷酸的$^{31}\mathrm{P}$谱只需几秒到几分钟；其宽达数百ppm的位移范围与对质子、碳、金属的大耦合，使它成为配位化学与生物化学中磷环境的绝佳探针。要达到相同的$S/N$，$^{13}\mathrm{C}$实验在计入NOE等增强之前需要$391^{2} \approx 1.5\times10^{5}$倍的扫描——实践中NOE与去耦会缩小这一差距，但碳谱仍是最慢的常规实验。
:::
:::
