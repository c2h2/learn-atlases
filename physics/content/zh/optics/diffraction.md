两根手指几乎并拢举在明亮的窗前，透过缝隙看过去：几道淡淡的暗线平行于缝隙，而几何光学预言的只是一条明亮的窄缝。让激光过一条窄单缝，远处墙上的光斑一点也不窄：是一条宽的中央亮带，两侧衬着较弱的亮带，而且缝越窄它反而*越宽*。波绕过障碍物、穿过孔径后继续散开的这种现象就是**衍射**。几何光学之所以只是近似，原因在它；任何望远镜、显微镜或相机能分辨多细的细节，最终上限也由它定。

衍射与干涉并非两种不同的现象。[[optics/interference]] 中我们叠加两列波；这里叠加的是连续无穷多列——孔径上每一点各贡献一列。工具还是那些：光程差、相位，以及把总场的幅值平方得到的辐照度。本章陈述惠更斯（Huygens）–菲涅耳（Fresnel）原理，导出单缝的夫琅禾费（Fraunhofer）图样，把它推广到多缝与衍射光栅，处理圆孔与瑞利（Rayleigh）判据，对菲涅耳衍射作定性描述，最后落到与傅里叶（Fourier）分析的联系上——这层联系使衍射成为线性系统理论的一个分支。

## 惠更斯–菲涅耳原理 {#huygens}

惠更斯在 1690 年提出：波前上每一点都发出次级子波，稍后时刻的波前就是这些子波的包络。这个作图能解释反射和折射，但对强度不置一词，也说不清波为什么不同时向后传播。菲涅耳 1818 年的补充，是让这些子波彼此*干涉*。

::: definition 惠更斯–菲涅耳原理 {#def-huygens}
孔径后一点 $P$ 处的场，是孔径上每个面元 $\dd A$ 发出的球面子波的叠加，每个子波的振幅正比于该面元上的入射场，相位由它到 $P$ 的光程决定：

$$
E(P) \propto \iint_{\text{孔径}} E_{\text{inc}}\,\frac{e^{ikr}}{r}\,\dd A ,
$$ {#eq-huygens}

其中 $r$ 是 $\dd A$ 到 $P$ 的距离，$k = 2\pi/\lambda$。
:::

基尔霍夫（Kirchhoff）1882 年从波动方程导出一个更精确的版本，多出一个倾角因子，把向后传播的波压掉。对多数光学问题里重要的小角度，倾角因子接近 $1$，[[#eq-huygens]] 就够用。

两个区域的划分，看相位 $kr$ 在孔径上如何变化。若屏幕足够远（或孔径足够小），从孔径各点到 $P$ 的路程随孔径内位置*线性*变化，图样是**夫琅禾费**（远场）衍射。若路程的二次变化也要紧，就是**菲涅耳**（近场）衍射。

::: definition 菲涅耳数 {#def-fresnel-number}
半宽 $a$ 的孔径在距离 $L$ 处以波长 $\lambda$ 的光观察，**菲涅耳数**为

$$
N_F = \frac{a^2}{L\lambda}.
$$

$N_F \ll 1$ 时夫琅禾费衍射适用；$N_F$ 为 $1$ 或更大时是菲涅耳衍射；几何光学是 $N_F \gg 1$ 的极限。
:::

孔径上的二次相位是 $ka^2/(2L) = \pi N_F$，这就是 $N_F$ 成为控制参数的原因。宽 $0.100\,\mathrm{mm}$（$a = 0.050\,\mathrm{mm}$）的缝配红色激光，$a^2/\lambda \approx 4\,\mathrm{mm}$，一两米外的屏幕妥妥地处于夫琅禾费区。会聚透镜把夫琅禾费图样从无穷远搬到它的焦平面上，因为它把每个方向 $\theta$ 映成一个点——实际观察多半这样做。

## 单缝的夫琅禾费衍射 {#single-slit}

::: theorem 单缝衍射 {#thm-slit}
宽 $a$ 的长缝被波长 $\lambda$ 的平面波正入射照明。夫琅禾费区中，方向 $\theta$ 上的辐照度为

$$
I(\theta) = I_0\left(\frac{\sin\beta}{\beta}\right)^2, \qquad \beta = \frac{\pi a\sin\theta}{\lambda},
$$ {#eq-slit}

其中 $I_0$ 是 $\theta = 0$ 处的辐照度。零点在

$$
a\sin\theta = m\lambda, \qquad m = \pm1, \pm2, \dots
$$ {#eq-slit-zeros}

$m = 0$ 不是零点而是中央明纹。
:::

::: proof
让 $x$ 在缝上从 $-a/2$ 取到 $a/2$。夫琅禾费区中，$x$ 处的面元到远处方向 $\theta$ 的路程，比中心到该处的路程短 $x\sin\theta$，是 $x$ 的线性函数；[[#eq-huygens]] 中的 $1/r$ 因子在这一精度下对所有面元相同。平面波在缝上相位处处相同。于是总场（差一个常数）为

$$
E(\theta) \propto \int_{-a/2}^{a/2} e^{-ikx\sin\theta}\,\dd x = \frac{e^{-ika\sin\theta/2} - e^{ika\sin\theta/2}}{-ik\sin\theta} = \frac{2\sin\bigl(\tfrac12 ka\sin\theta\bigr)}{k\sin\theta}.
$$

取 $\beta = \tfrac12 ka\sin\theta = \pi a\sin\theta/\lambda$，这就是 $a\,\sin\beta/\beta$。$\theta = 0$ 时积分就是 $a$。辐照度正比于场的平方，所以 $I(\theta)/I_0 = (\sin\beta/\beta)^2$。

零点即 $\sin\beta$ 除 $\beta = 0$ 以外的零点——$\beta = 0$ 处 $\sin\beta/\beta \to 1$。于是 $\beta = m\pi$，$m \neq 0$，即 $a\sin\theta = m\lambda$。
:::

零点条件有直接的物理读法。第一个零点 $a\sin\theta = \lambda$ 处，把缝分成上、下两半。上半的每个面元都在下半有一个相距 $a/2$ 的搭档，二者路程差 $\tfrac12 a\sin\theta = \lambda/2$。搭档成对抵消，整个缝于是整体抵消。$a\sin\theta = 2\lambda$ 时把缝分成四份再两两配对抵消，依此类推。

::: warning 单缝零点与双缝明纹长得像
单缝条件 $a\sin\theta = m\lambda$ 给出的是*暗*纹，而 [[optics/interference]] 的双缝条件 $d\sin\theta = m\lambda$ 给出的是*明*纹。两个公式形式相同、含义相反。单缝里 $a$ 是一个孔径的宽度，条件定位的是它内部的相消；双缝里 $d$ 是两个孔径的间距，条件定位的是它们之间的相长。
:::

中央明纹位于两个第一零点 $\sin\theta = \pm\lambda/a$ 之间，角全宽约 $2\lambda/a$。大部分光都在它里面。次极大在中间位置 $\beta = \pm\tfrac32\pi, \pm\tfrac52\pi, \dots$ 附近但并非恰好在那：令 $\sin\beta/\beta$ 的导数为零得 $\tan\beta = \beta$，其第一个正根是 $\beta = 4.4934 = 1.4303\pi$，该处 $I/I_0 = 0.0472$。第二个次极大 $I/I_0 = 0.0165$。整个图样压倒性地就是宽 $2\lambda/a$ 的中央亮带。

这个宽度是全部的要点。被限制在宽度 $a$ 内的束，会散开约 $\lambda/a$ 的角度：孔径越窄，散开越宽。它是位置与波数不确定性关系的光学形式，在 [[quantum-1]] 中再次出现。

::: example 激光与单缝 {#ex-slit}
波长 $633\,\mathrm{nm}$ 的光通过宽 $0.100\,\mathrm{mm}$ 的单缝，照到 $2.00\,\mathrm{m}$ 外的屏幕。求屏幕上中央明纹的宽度和第一个次极大的位置。检验夫琅禾费近似是否适用。
::: solution
第一零点在 $\sin\theta = \pm\lambda/a = \pm 633\times10^{-9}/(1.00\times10^{-4}) = \pm 6.33\times10^{-3}$。角度很小，屏幕上位于 $y = \pm L\lambda/a = \pm 2.00 \times 6.33\times10^{-3}\,\mathrm{m} = \pm 12.7\,\mathrm{mm}$。中央明纹宽 $25.3\,\mathrm{mm}$，约为缝宽的 250 倍。

第一个次极大在 $\beta = 1.430\pi$，即 $a\sin\theta = 1.430\lambda$，所以 $y = 1.430 \times 12.66\,\mathrm{mm} = 18.1\,\mathrm{mm}$（离中心），辐照度为中央的 $4.7\%$。

区域检验：半宽 $a = 0.050\,\mathrm{mm}$，$N_F = a^2/(L\lambda) = (5.0\times10^{-5})^2/(2.00 \times 633\times10^{-9}) = 2.0\times10^{-3} \ll 1$。夫琅禾费适用。
:::
:::

::: widget plot
f: sinc(500*pi*a*x/lam)^2
x: -40, 40
y: 0, 1.1
sliders: a=0.1:0.02:0.4:0.01; lam=633:400:700:1
caption: 单缝辐照度 [[#eq-slit]]，屏幕在 2 m 外；x 是位置（毫米），a 是缝宽（毫米），lam 是波长（纳米），于是 β = 500πa x/lam。a = 0.1、lam = 633 时第一零点在 ±12.7 mm。把缝变窄图样变宽；把缝变宽图样向缝的几何阴影收缩。无论怎么调，旁瓣始终不到峰值的 5%。
:::

### 巴比涅原理

宽 $a$ 的不透明细条与宽 $a$ 的缝互补：两者合起来就是一块无障碍的屏。开屏后的场等于两个互补屏后的场之和，$E_{\text{缝}} + E_{\text{条}} = E_{\text{开}}$。夫琅禾费区中，开束集中在前进方向，所以轴外处处 $E_{\text{条}} = -E_{\text{缝}}$，两个辐照度图样完全相同。这就是**巴比涅（Babinet）原理**。它意味着一根细丝或一根头发产生 [[#eq-slit]] 的单缝图样，零点在 $a\sin\theta = m\lambda$。

::: example 用激光测头发 {#ex-babinet}
一根头发挡在 $633\,\mathrm{nm}$ 激光束中。$2.00\,\mathrm{m}$ 外的墙上，亮中心两侧的暗纹相距 $21.1\,\mathrm{mm}$。求头发直径。
::: solution
由巴比涅原理，零点在 $a\sin\theta = m\lambda$，小角下墙上间距 $L\lambda/a$。于是

$$
a = \frac{L\lambda}{\Delta y} = \frac{2.00 \times 633\times10^{-9}}{21.1\times10^{-3}}\,\mathrm{m} = 6.00\times10^{-5}\,\mathrm{m} = 60.0\,\mu\mathrm{m},
$$

与 [[optics/interference#ex-wedge]] 中用空气劈测得的头发接近。工业测径仪正是用这套办法连续监测拉丝的直径。
:::
:::

## 多缝与衍射光栅 {#grating}

现在设 $N$ 条宽 $a$ 的相同狭缝等间距 $d$ 排列。每条缝按 [[#thm-slit]] 衍射；缝与缝之间再相互干涉。

::: theorem $N$ 缝衍射 {#thm-nslit}
宽 $a$、间距 $d$ 的 $N$ 条缝正入射照明，夫琅禾费辐照度为

$$
I(\theta) = I_0\left(\frac{\sin\beta}{\beta}\right)^2\left(\frac{\sin N\alpha}{N\sin\alpha}\right)^2, \qquad \beta = \frac{\pi a\sin\theta}{\lambda}, \quad \alpha = \frac{\pi d\sin\theta}{\lambda},
$$ {#eq-nslit}

其中 $I_0$ 是 $\theta = 0$ 处的辐照度。主极大位于**光栅方程**

$$
d\sin\theta = m\lambda, \qquad m = 0, \pm1, \pm2, \dots
$$ {#eq-grating}
:::

::: proof
第 $j$ 条缝（$j = 0, 1, \dots, N-1$）是第一缝平移 $jd$。它在方向 $\theta$ 的贡献是单缝场 $a\sin\beta/\beta$ 乘以相位因子 $e^{-i j\cdot 2\alpha}$，因为其路程短了 $jd\sin\theta$，而 $k d\sin\theta = 2\alpha$。总场为

$$
E \propto a\frac{\sin\beta}{\beta}\sum_{j=0}^{N-1} e^{-2ij\alpha} = a\frac{\sin\beta}{\beta}\cdot\frac{1 - e^{-2iN\alpha}}{1 - e^{-2i\alpha}} .
$$

分子提出 $e^{-iN\alpha}$，分母提出 $e^{-i\alpha}$：

$$
\frac{1 - e^{-2iN\alpha}}{1 - e^{-2i\alpha}} = e^{-i(N-1)\alpha}\,\frac{\sin N\alpha}{\sin\alpha}.
$$

相位因子在模的平方中消失。$\theta = 0$ 时比值 $\sin N\alpha/\sin\alpha \to N$，按中心值归一化即得 [[#eq-nslit]]。

$\sin\alpha = 0$ 即 $\alpha = m\pi$ 处，比值 $\sin N\alpha/(N\sin\alpha)$ 的模为 $1$，取其最大可能值；这些就是主极大，位于 $d\sin\theta = m\lambda$。
:::

图样是一个乘积。**干涉因子** $(\sin N\alpha/N\sin\alpha)^2$ 在光栅方程处放置尖锐的主极大，相邻主极大之间有 $N - 1$ 个零点和 $N - 2$ 个微弱的次极大。单缝的**衍射包络** $(\sin\beta/\beta)^2$ 调制它们的高度。$N = 2$ 时干涉因子是 $\cos^2\alpha$，正是 [[optics/interference#thm-young]] 的杨氏图样，如今加上了有限缝宽强加的包络。

若主极大恰好落在包络的零点上，它就消失：**缺级**。这发生在 $d\sin\theta = m\lambda$ 与 $a\sin\theta = m'\lambda$ 同时成立时，即 $m/m' = d/a$。$d = 3a$ 时，$\pm3, \pm6, \dots$ 级缺失。

::: widget plot
f: (sinc(N*pi*x)/sinc(pi*x))^2*sinc(pi*x/3)^2; sinc(pi*x/3)^2
x: -4.5, 4.5
y: 0, 1.1
sliders: N=2:1:12:1
labels: N 条缝; 单缝包络
caption: $N$ 缝图样 [[#eq-nslit]] 随 d sin θ/λ 的变化，缝宽 a = d/3。无论 N 是多少，主极大始终坐在整数处；增大 N 使主极大变窄，相邻主极大间出现 N − 1 个零点。虚线包络是单缝因子；x = ±3 处的第三级落在包络零点上而缺失。N = 2 时看到的是包络下杨氏的 cos² 条纹。
:::

### 光栅作为光谱仪

**衍射光栅**是在板上刻出数千条等距刻线的器件，可透射或反射使用。由 [[#eq-grating]]，每个 $m \neq 0$ 级中不同波长以不同角度出射，而 $m = 0$ 级对一切颜色都不偏折。由 $\lvert\sin\theta\rvert \le 1$，只存在 $\lvert m\rvert \le d/\lambda$ 的级次。固定 $m$ 对光栅方程求导得**角色散**

$$
\deriv{\theta}{\lambda} = \frac{m}{d\cos\theta},
$$

它随级次和刻线密度 $1/d$ 增大。光有色散还不决定两条邻近谱线能否分开；每条线的宽度也要紧。

::: theorem 光栅的分辨本领 {#thm-resolving}
$N$ 条被照明的刻线、在 $m$ 级工作的光栅，按瑞利判据能分辨波长 $\lambda$ 与 $\lambda + \Delta\lambda$，当

$$
\frac{\lambda}{\Delta\lambda} \le mN .
$$ {#eq-resolving}
:::

::: proof
两条等明暗的谱线，当一条的主极大落在另一条的第一零点时，视为恰可分辨（**瑞利判据**）。$m$ 级主极大在 $\alpha = m\pi$。它旁边的第一个零点在 $N\alpha = Nm\pi + \pi$，即 $\alpha = m\pi + \pi/N$。由 $\alpha = \pi d\sin\theta/\lambda$，$\lambda$ 的 $m$ 级主极大旁的零点位于

$$
d\sin\theta = m\lambda + \frac{\lambda}{N}.
$$

$\lambda + \Delta\lambda$ 的 $m$ 级主极大在 $d\sin\theta = m(\lambda + \Delta\lambda)$。两者重合当 $m\Delta\lambda = \lambda/N$，所以可分辨的最小 $\Delta\lambda$ 是 $\lambda/(mN)$，即 [[#eq-resolving]]。
:::

分辨本领只依赖级次和刻线总数，与刻线间距无关。大光栅配高级次就是一台精分光谱仪。与 [[optics/interference#thm-airy]] 的法布里–珀罗对比颇有启发：那边 $N$ 的对应物是精细度，$m$ 的对应物是级次 $2d/\lambda$——后者是天文数字；这就是标准具分辨本领远高于光栅的原因。

::: example 分开钠 D 双线 {#ex-grating}
每毫米 $600$ 条刻线、宽 $25.0\,\mathrm{mm}$ 的透射光栅被钠光（$588.995\,\mathrm{nm}$ 与 $589.592\,\mathrm{nm}$）正入射照明。求 $588.995\,\mathrm{nm}$ 谱线的一级角、两条线在一二级中的角距离、存在的最高级次，以及需要的和可用的分辨本领。
::: solution
刻线间距 $d = 1/600\,\mathrm{mm} = 1.667\,\mu\mathrm{m}$。一级下

$$
\sin\theta_1 = \frac{\lambda}{d} = 588.995\times10^{-9} \times 6.00\times10^{5} = 0.3534, \qquad \theta_1 = 20.70^\circ .
$$

另一条线 $\sin\theta = 0.35376$、$\theta = 20.717^\circ$，一级中两线相距 $0.022^\circ$。二级中 $\sin\theta_2 = 0.7068$、$\theta_2 = 44.97^\circ$，角距离 $0.058^\circ$，因色散中的 $1/\cos\theta$ 因子，大于两倍以上。

最高级次满足 $m \le d/\lambda = 2.83$，所以 $m = 2$ 是最后一级。

需要的分辨本领为

$$
\frac{\lambda}{\Delta\lambda} = \frac{589.29}{0.597} = 987,
$$

用了平均波长。光栅有 $N = 25.0 \times 600 = 15\,000$ 条刻线，一级下提供 $mN = 15\,000$，是所需的十五倍。一块只有 $1.7\,\mathrm{mm}$ 宽、$1000$ 条刻线的光栅，一级下就能勉强分开双线。
:::
:::

::: quiz
白光照射光栅。一级光谱中哪种颜色衍射角最大？
- [ ] 紫色，像玻璃棱镜那样
- [x] 红色
- [ ] 一级中各色衍射相同；只有零级把它们分开
- [ ] 取决于刻线间距
::: solution
由 [[#eq-grating]]，$\sin\theta = m\lambda/d$，波长越长角度越大：红光偏折最多。玻璃棱镜正相反，因为它的偏向来自折射率，而紫光的折射率更大。零级对所有颜色都不偏折，所以是白的。
:::
:::

## 圆孔与分辨极限 {#circular}

透镜、面镜和瞳孔都是圆的。直径 $D$ 的圆孔的夫琅禾费图样，是一个亮中央圆斑围着一圈圈淡环——**艾里（Airy）图样**。计算与单缝是同一个积分，只是积分区域从带换成圆盘；结果出现贝塞尔（Bessel）函数。

::: theorem 艾里图样 {#thm-airy-disc}
直径 $D$ 的圆孔被平面波正入射照明，夫琅禾费辐照度为

$$
I(\theta) = I_0\left(\frac{2J_1(u)}{u}\right)^2, \qquad u = \frac{\pi D\sin\theta}{\lambda},
$$

其中 $J_1$ 是一阶第一类贝塞尔函数。第一个零点——中央**艾里斑**的边缘——在

$$
\sin\theta_1 = 1.22\,\frac{\lambda}{D}.
$$ {#eq-airy-disc}
:::

::: proof
（要点。）在孔径上用极坐标 $(\rho, \phi)$。到方向 $\theta$ 的路程差是 $\rho\cos\phi\sin\theta$，于是

$$
E(\theta) \propto \int_0^{D/2}\!\!\int_0^{2\pi} e^{-ik\rho\sin\theta\cos\phi}\,\rho\,\dd\phi\,\dd\rho .
$$

由 $J_0$ 的积分表示，角度积分是 $2\pi J_0(k\rho\sin\theta)$。径向积分再用 $\int_0^x sJ_0(s)\,\dd s = xJ_1(x)$，得 $E \propto (\pi D^2/4)\cdot 2J_1(u)/u$，$u = \tfrac12 kD\sin\theta$。由 $u \to 0$ 时 $2J_1(u)/u \to 1$，平方并归一化即得所述形式。$u = 0$ 之后 $J_1$ 的第一个零点是 $u = 3.8317$，而 $3.8317/\pi = 1.2197$，即 [[#eq-airy-disc]]。详细推导见 Hecht §10.2.5 或 Born 与 Wolf §8.5.2。
:::

因子 $1.22$ 取代了单缝的 $1$，因为同宽度下圆在中部以外比正方形更窄：圆盘外缘的贡献更小，圆盘于是表现得像一个略小的孔径。艾里斑包含 $84\%$ 的光，第一亮环的辐照度只有中央的约 $1.7\%$。

::: definition 瑞利判据 {#def-rayleigh}
两个等明暗的非相干点光源**恰可分辨**，当且仅当一个的艾里斑中心落在另一个的第一暗环上。直径 $D$ 的圆孔，可分辨的最小角度为

$$
\theta_{\min} = 1.22\,\frac{\lambda}{D}
$$ {#eq-rayleigh}

（弧度制，用了 $\sin\theta \approx \theta$）。
:::

在该间隔下，合成图样两个峰之间有约 $26\%$ 的下凹，眼睛足以看出是两个。判据是约定而非定律：信噪比好、图像处理得当，可以做得稍好一些。但它把尺度抓对了。透镜品质再提高也打不破它；只有更大的孔径或更短的波长才行。

::: example 哈勃空间望远镜的分辨率 {#ex-hubble}
哈勃空间望远镜主镜直径 $2.4\,\mathrm{m}$。求 $550\,\mathrm{nm}$ 处衍射极限的角分辨率，以弧度和角秒计，以及它在 $3.84\times10^{8}\,\mathrm{m}$ 外的月面上能分辨的最小特征。与瞳孔 $3.0\,\mathrm{mm}$ 的人眼比较。
::: solution
由 [[#eq-rayleigh]]，

$$
\theta_{\min} = 1.22 \times \frac{550\times10^{-9}}{2.4} = 2.80\times10^{-7}\,\mathrm{rad}.
$$

一角秒是 $\pi/(180 \times 3600) = 4.848\times10^{-6}\,\mathrm{rad}$，所以这是 $0.058''$。这个角在月面上张开

$$
(2.80\times10^{-7})(3.84\times10^{8}\,\mathrm{m}) = 107\,\mathrm{m}.
$$

哈勃看不见几米宽的阿波罗登月舱。大气层之上它确实达到这个极限；地面望远镜若无自适应光学，无论口径多大都被大气湍流限制在约 $0.5''$ 到 $1''$。

人眼 $\theta_{\min} = 1.22 \times 550\times10^{-9}/(3.0\times10^{-3}) = 2.24\times10^{-4}\,\mathrm{rad}$，约 $0.77$ 角分。相距 $1.5\,\mathrm{m}$ 的两盏汽车前灯，若眼睛的感光细胞和光学品质配得上它的瞳孔，最远在 $1.5/(2.24\times10^{-4}) = 6.7\,\mathrm{km}$ 处仍可分辨；实际上人眼分辨力约一角分，接近这个极限。
:::
:::

::: application 相机与显微镜中的衍射
焦距 $f$、孔径 $D$ 的透镜把一个物点成一个半径 $1.22\lambda f/D = 1.22\lambda N$ 的艾里斑，$N = f/D$ 是光圈数。$f/8$、绿光下半径 $5.4\,\mu\mathrm{m}$，与当代相机传感器的像素间距相当；再收光圈，像只会更软不会更锐。显微镜中同样的物理——恩斯特·阿贝（Ernst Abbe）1873 年算出的——把可分辨的最小间距限制在约 $0.61\lambda/\mathrm{NA}$，$\mathrm{NA} = n\sin\theta$ 是物镜的数值孔径：可见光下油浸物镜约 $0.2\,\mu\mathrm{m}$。电子显微镜和获 2014 年化学诺贝尔奖承认的"超分辨"荧光方法，以不同方式绕开了这个极限。
:::

## 菲涅耳衍射 {#fresnel}

靠近孔径处 $N_F \gtrsim 1$，路程差的二次部分变得要紧，图样与远场完全不同。菲涅耳用一个几何作图分析它，即便不做完整计算也值得了解。

取平面波阵后方距离 $L$ 的一点 $P$。把波面划分为环形**菲涅耳波带**，带边缘到 $P$ 的距离为 $L + \lambda/2$、$L + \lambda$、$L + 3\lambda/2, \dots$。第 $n$ 带的外半径

$$
r_n \approx \sqrt{n\lambda L}
$$

（$r_n \ll L$），而每个波带面积都是 $\pi\lambda L$。相邻波带的子波到达时差半个周期，所以各带贡献正负交替、大小近乎相等、又因倾角因子随 $n$ 缓慢减小的振幅。整个无遮挡波面的贡献，算下来恰是第一带单独贡献的一半。

由此得到几个惊人的推论。恰好露出一个波带的圆孔，在 $P$ 处给出无遮挡波四倍的辐照度（振幅两倍）。恰好露出两个波带的孔，轴上几乎全黑。**波带片**遮住隔一个的波带，行为如同一块焦距 $r_1^2/\lambda$ 的透镜；波带片能聚焦 X 射线——X 射线没有玻璃透镜可用。不透明圆盘之后，轴上的情形是：盘外的各波带之和仍等于第一个未被遮挡波带的一半——阴影中心有一个亮点。

那个亮点曾是泊松（Poisson）对菲涅耳 1818 年提交的论文提出的质疑。评奖委员西莫内·德尼·泊松（Siméon Denis Poisson）从菲涅耳理论推出盘影中心应出现一个亮点，并认为这荒唐透顶。弗朗索瓦·阿拉果（François Arago）做了实验，亮斑就在那里。它如今叫**阿拉果斑**或泊松斑；这一发现的功绩超过任何其他单项结果，为波动说赢得了公认。

直边和狭缝的菲涅耳衍射由菲涅耳积分描述，其图形表示是柯努（Cornu）螺线（Hecht, §10.3）。直边的阴影不是锐利的：辐照度在影内平滑上升，在亮区振荡，第一条亮纹比无遮挡光强 $37\%$。这就是开篇里你指缝间那些淡淡的暗线。

::: example 小孔的菲涅耳波带 {#ex-zones}
直径 $1.41\,\mathrm{mm}$ 的小孔被波长 $500\,\mathrm{nm}$ 的平面波照明。轴上多远处小孔恰好露出一个菲涅耳波带？那里的辐照度与无屏时相比如何？多远处恰好露出两个波带？
::: solution
半径 $r = 0.705\,\mathrm{mm}$。恰好露出一个波带在 $r^2 = \lambda L$ 处：

$$
L_1 = \frac{r^2}{\lambda} = \frac{(7.05\times10^{-4})^2}{5.00\times10^{-7}}\,\mathrm{m} = 0.994\,\mathrm{m}.
$$

那里振幅是第一带的振幅——无遮挡振幅的两倍——所以辐照度是完全没有屏时的四倍：小孔能让轴上比敞开的波还亮。恰好露出两个波带在 $r^2 = 2\lambda L$ 处，即 $L_2 = L_1/2 = 0.497\,\mathrm{m}$，那里两个波带几乎抵消，中心是暗的。把屏幕沿轴移动，小孔图样中心便明暗交替——这是几何光学做不到的。$L_1$ 处的菲涅耳数恰为 $1$，与此正是两个区域的过渡相一致。
:::
:::

## 衍射与傅里叶变换 {#fourier}

再看一遍单缝积分。把孔径写成函数 $A(x)$：缝内为 $1$，缝外为 $0$；并写 $q = k\sin\theta$。则

$$
E(q) \propto \int_{-\infty}^{\infty} A(x)\,e^{-iqx}\,\dd x ,
$$ {#eq-fourier}

这正是孔径函数在空间频率 $q$ 处的傅里叶变换。这是一条普遍规则：**夫琅禾费场是孔径透过率函数的傅里叶变换**。二维情形就是二维变换。[[math-methods/fourier]] 一章提供了工具，本章若干结果随之化为一行的推论。

- **宽度与展宽。**宽 $a$ 的函数，其变换在 $q$ 上的宽度约 $2\pi/a$，角展宽因此约 $\lambda/a$。这是傅里叶分析的不确定性原理。
- **卷积定理。**$N$ 条缝是一条单缝与一排 $N$ 个 δ 函数的卷积。卷积的变换是变换的乘积，所以 [[#eq-nslit]] 就是单缝图样乘以干涉因子。
- **线性与平移。**平移孔径只给变换乘一个相位，辐照度不变，所以光栅的图样与它摆在光束中何处无关。

会聚透镜在物理上就执行这个变换：其后焦面中的场是前焦面中场的傅里叶变换。阿贝（Abbe）的成像理论（1873）把显微镜看作两次相继的变换；用掩模挡住第一次变换的部分——**空间滤波**——能以可预料的方式改变图像。费里茨·泽尔尼克（Frits Zernike）的相衬显微镜（1953 年诺贝尔奖）就是空间滤波，从照片中去除印刷网点规则花纹也是。X 射线晶体学是同一个思想换了角色：晶体的衍射图样是其电子密度的傅里叶变换，解结构就是做逆变换。

::: history 从格里马第到瑞利
格里马第（Grimaldi）在 1665 年——他去世后两年——出版的书中描述了阴影边缘的彩色条纹，并造了 *diffraction*（衍射）这个词。惠更斯（Huygens）在《论光》(*Traité de la lumière*, 1690) 中给出了他的子波作图。菲涅耳（Fresnel）提交法国科学院的衍射论文在 1819 年获奖——此前阿拉果（Arago）观察到了泊松作为质疑所预言的那个亮斑。

夫琅禾费（Fraunhofer）——慕尼黑的一位光学工匠——先用细丝、后来用刻划玻璃做出第一批衍射光栅，并用它们测量太阳光谱暗线的波长；首批报告发表于 1821 年。艾里（Airy）1835 年计算了圆孔的衍射图样。瑞利勋爵（约翰·威廉·斯特拉特，John William Strutt）1879 年给出光学仪器分辨本领的判据，罗兰（Rowland）1880 年代的刻划机造出使精密光谱学成为常规手段的光栅。
:::

## 后续内容 {#leads}

衍射是 [[optics/geometric]] 的几何光学忽略掉的波动属性，它划定了任何成像系统看不见的尺度下限。同一套数学支配一切波：穿过门口的声波、过港口的江河水波、穿过晶体的电子与中子。晶体中原子的周期性排列产生的 X 射线衍射是一个三维光栅，在 [[condensed-matter]] 中展开。单缝的展宽 $\lambda/a$ 是 [[quantum-1]] 不确定性原理的经典面貌，而傅里叶联系使衍射成为进入光学的信号处理观点的天然入口。最后一章 [[optics/polarisation]] 将离开这里用的标量振幅，转向场的向量本性。

::: summary
- 惠更斯–菲涅耳原理：波面上每一点发出子波，子波相互干涉。菲涅耳数 $a^2/(L\lambda) \ll 1$ 时夫琅禾费（远场）衍射适用。
- 宽 $a$ 的单缝给出 $I = I_0(\sin\beta/\beta)^2$，$\beta = \pi a\sin\theta/\lambda$，零点 $a\sin\theta = m\lambda$，$m \neq 0$。中央明纹角全宽约 $2\lambda/a$；第一旁瓣为峰值的 $4.7\%$。
- $N$ 条缝给出单缝包络乘以 $(\sin N\alpha/N\sin\alpha)^2$；主极大服从光栅方程 $d\sin\theta = m\lambda$，落在包络零点上的级次缺失。
- 光栅分辨本领 $\lambda/\Delta\lambda = mN$，由级次与刻线数决定。
- 圆孔给出艾里图样，第一零点 $\sin\theta = 1.22\lambda/D$。瑞利极限 $\theta_{\min} = 1.22\lambda/D$：哈勃 $550\,\mathrm{nm}$ 下 $0.058''$，人眼约 $0.8'$。
- 半径 $\sqrt{n\lambda L}$ 的菲涅耳波带解释了近场效应：盘影中心的亮斑、波带片、阴影边缘的振荡。
- 夫琅禾费场是孔径函数的傅里叶变换；透镜在其焦面上执行这一变换。
:::

## 习题 {#exercises}

::: exercise 缝的宽度 {level=1 check="0.12"}
波长 $600\,\mathrm{nm}$ 的光通过单缝。$1.50\,\mathrm{m}$ 外的屏幕上，中心两侧的第一暗纹相距 $15.0\,\mathrm{mm}$。求缝宽，以毫米计。
::: solution
第一零点在 $y = \pm L\lambda/a$，其间距 $2L\lambda/a = 15.0\,\mathrm{mm}$。于是

$$
a = \frac{2L\lambda}{15.0\times10^{-3}} = \frac{2 \times 1.50 \times 600\times10^{-9}}{15.0\times10^{-3}}\,\mathrm{m} = 1.20\times10^{-4}\,\mathrm{m} = 0.120\,\mathrm{mm}.
$$

小角近似成立：$\sin\theta = \lambda/a = 5\times10^{-3}$。
:::
:::

::: exercise 光栅角 {level=1 check="30"}
波长 $500\,\mathrm{nm}$ 的绿光正入射到每毫米 $1000$ 条刻线的光栅。求一级衍射角，以度计，并问二级是否存在。
::: solution
间距 $d = 1/1000\,\mathrm{mm} = 1.00\,\mu\mathrm{m}$。由 [[#eq-grating]]，

$$
\sin\theta_1 = \frac{\lambda}{d} = \frac{0.500\,\mu\mathrm{m}}{1.00\,\mu\mathrm{m}} = 0.500, \qquad \theta_1 = 30.0^\circ .
$$

二级需要 $\sin\theta_2 = 2\lambda/d = 1.00$，即沿光栅表面掠出射，没有可用的二级。细光栅用级次数换大色散。
:::
:::

::: exercise 分辨双星 {level=1 check="0.14"}
按瑞利判据，求口径 $1.00\,\mathrm{m}$ 的望远镜在 $550\,\mathrm{nm}$ 处能分辨的最小角距离，以角秒计，保留两位有效数字。
::: solution
由 [[#eq-rayleigh]]，$\theta_{\min} = 1.22 \times 550\times10^{-9}/1.00 = 6.71\times10^{-7}\,\mathrm{rad}$。除以每角秒 $4.848\times10^{-6}\,\mathrm{rad}$ 得 $0.138''$，两位有效数字即 $0.14''$。在地面上，不用自适应光学的湍流会把它糊到约 $1''$。
:::
:::

::: exercise 所需刻线数 {level=2 check="276"}
汞灯的黄色双线在 $577.0\,\mathrm{nm}$ 与 $579.1\,\mathrm{nm}$。求一级下分辨它们所需的最少被照明刻线数。
::: solution
用平均波长，所需分辨本领为

$$
\frac{\lambda}{\Delta\lambda} = \frac{578.05}{2.1} = 275.3 .
$$

由 [[#eq-resolving]] 取 $m = 1$，需要 $N \ge 275.3$，至少 $276$ 条。几毫米宽的任意光栅都远超此数。二级下半数 $138$ 条即可。
:::
:::

::: exercise 缺级 {level=2 check="4"}
双缝的缝宽 $a = 0.050\,\mathrm{mm}$，缝距 $d = 0.200\,\mathrm{mm}$。图样中缺失的最低明干涉级（$m = 0$ 以外）是几？
::: solution
主极大 $d\sin\theta = m\lambda$ 缺失，当它与单缝零点 $a\sin\theta = m'\lambda$（$m' \neq 0$）重合。两式相除，$m/m' = d/a = 4$。缺失的最低级是 $m = 4$（对应 $m' = 1$），随后是 $8, 12, \dots$。中央衍射明纹内因此有 $m = 0, \pm1, \pm2, \pm3$ 各级：共七条明纹。
:::
:::

::: exercise 夜间的两盏灯 {level=2 check="10.4"}
夜间相距 $1.00\,\mathrm{m}$ 的两盏灯，由瞳孔放大到 $7.0\,\mathrm{mm}$ 的观察者观看。取 $\lambda = 550\,\mathrm{nm}$ 和瑞利判据，求眼睛恰能分辨它们的最远距离，以千米计，保留三位有效数字。
::: solution

极限角为

$$
\theta_{\min} = 1.22 \times \frac{550\times10^{-9}}{7.0\times10^{-3}} = 9.59\times10^{-5}\,\mathrm{rad}.
$$

相距 $s = 1.00\,\mathrm{m}$ 的两盏灯在距离 $R$ 处张角 $s/R$，只要 $s/R \ge \theta_{\min}$ 就可分辨：

$$
R_{\max} = \frac{1.00}{9.59\times10^{-5}}\,\mathrm{m} = 1.04\times10^{4}\,\mathrm{m} = 10.4\,\mathrm{km}.
$$

真实眼睛更差，因为放大后的瞳孔光学并不衍射极限受限，视网膜上感光细胞的间距也要紧；这只是瞳孔单独给出的极限。
:::
:::

::: exercise 单缝的次极大 {level=3}
证明单缝图样 [[#eq-slit]] 的次极大出现在 $\tan\beta = \beta$ 的非零根处，且第 $m$ 个根位于 $m\pi$ 与 $(m + \tfrac12)\pi$ 之间。证明次极大处的辐照度为 $I_0\cos^2\beta$，从而它小于 $I_0/(m\pi)^2$。
::: hint
对 $\sin\beta/\beta$ 求导。在根处 $\sin\beta = \beta\cos\beta$。
:::
::: solution
设 $g(\beta) = \sin\beta/\beta$。则 $g'(\beta) = (\beta\cos\beta - \sin\beta)/\beta^2$，在 $\sin\beta = \beta\cos\beta$ 处为零。$\cos\beta \neq 0$ 处即 $\tan\beta = \beta$。（$\cos\beta = 0$ 处 $\sin\beta = \pm1 \neq 0$，那些点不是根。）辐照度 $g^2$ 的极值在 $g'$ 的零点与 $g$ 的零点处取得；后者是 $\beta = m\pi$ 处的极小，所以次极大就在 $\tan\beta = \beta$ 的非零根处。

在区间 $(m\pi, m\pi + \tfrac12\pi)$（$m \ge 1$）内，函数 $h(\beta) = \tan\beta - \beta$ 连续，$h(m\pi) = -m\pi < 0$，且当 $\beta$ 从下方趋于 $(m + \tfrac12)\pi$ 时 $h \to +\infty$。由介值定理区间内有根。根唯一，因为该处 $h'(\beta) = \tan^2\beta > 0$。

在根处 $\sin\beta/\beta = \cos\beta$，所以 $I = I_0\cos^2\beta$。又 $\sin^2\beta = \beta^2\cos^2\beta$，故 $1 = \cos^2\beta(1 + \beta^2)$，$I = I_0/(1 + \beta^2)$。由 $\beta > m\pi$，$I < I_0/(1 + m^2\pi^2) < I_0/(m\pi)^2$。$m = 1$ 时根为 $\beta = 4.4934$，$I/I_0 = 1/(1 + 4.4934^2) = 0.0472$，与正文所引一致。
:::
:::

::: exercise 由光栅宽度求分辨本领 {level=3}
在 $m$ 级、角度 $\theta$ 使用的光栅，证明 $mN = W\sin\theta/\lambda$，其中 $W = Nd$ 是被照明宽度，并由此推出宽度 $W$ 的任何光栅在正入射下分辨本领不超过 $W/\lambda$。对宽 $25.0\,\mathrm{mm}$、$589\,\mathrm{nm}$ 的光栅求这个极限值。
::: solution
由 [[#eq-grating]]，$m = d\sin\theta/\lambda$。乘以 $N$ 并用 $W = Nd$，得 $mN = Nd\sin\theta/\lambda = W\sin\theta/\lambda$。由 $\sin\theta \le 1$，分辨本领 [[#eq-resolving]] 至多 $W/\lambda$，与刻线间距无关。$W = 25.0\,\mathrm{mm}$、$\lambda = 589\,\mathrm{nm}$ 时，$W/\lambda = 2.50\times10^{-2}/5.89\times10^{-7} = 4.24\times10^{4}$。其物理含义是：$W\sin\theta$ 是光栅两缘之间的最大路程差：一台光谱仪能区分两个频率，只有当它处理的光横跨两频率之拍的许多个周期——与支配法布里–珀罗和迈克耳孙的是同一个原理。
:::
:::
