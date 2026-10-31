两支手电照在同一块墙上，那块墙只是亮了两倍。让一束激光过两条窄缝，墙上却出现一排明暗相间的带子；在暗处，加进第二束光反而产生了*更少*的光。这就是**干涉**，它是光具有波动性的最直接证据。它还是物理学手头最精密的一把尺：干涉仪能测到波长的一个小数分之一的距离，引力波探测器更是测到质子直径的万分之一。

原理就是 [[oscillations/superposition]] 的叠加：两列波的电场相加，而探测器响应的是场的平方，所以和的强度不等于强度之和。交叉项能否存活，取决于两列波是否保持固定的相位关系，这就是**相干性**问题。本章先建立双光束公式，解释相干性，导出杨（Young）氏双缝图样，处理薄膜（肥皂膜与增透膜）、迈克耳孙（Michelson）干涉仪，最后到多光束的法布里–珀罗（Fabry–Pérot）干涉仪。全章要算的东西始终是参与干涉的各列波之间的**光程差**，概念来自 [[optics/geometric#def-index]]。

## 双光束干涉 {#two-beam}

光的探测器，无论眼睛、光电二极管还是相机像素，都跟不上 $5\times 10^{14}\,\mathrm{Hz}$ 振荡的场。它测的是单位面积的平均功率。

::: definition 辐照度 {#def-irradiance}
光的**辐照度**（或强度）是坡印廷向量大小对时间的平均。对折射率为 $n$ 的介质中场振幅为 $E_0$ 的平面波，

$$
I = \langle \lvert \mathbf{S} \rvert \rangle = \tfrac12 n c \varepsilon_0 E_0^2 .
$$

干涉计算只用比值，所以把常数吸收掉，写作 $I = \langle E^2 \rangle$。
:::

常数 $\tfrac12 c\varepsilon_0$ 在 [[magnetism/electromagnetic-waves]] 中已经导出。这里要紧的是辐照度对场是二次的。

::: theorem 双光束干涉 {#thm-two-beam}
两列角频率同为 $\omega$、线偏振方向相同的单色波到达某点，场为 $E_1 = E_{01}\cos(\omega t + \phi_1)$ 与 $E_2 = E_{02}\cos(\omega t + \phi_2)$。总辐照度为

$$
I = I_1 + I_2 + 2\sqrt{I_1 I_2}\,\cos\delta, \qquad \delta = \phi_2 - \phi_1,
$$ {#eq-two-beam}

其中 $I_j = \tfrac12 E_{0j}^2$ 是每列波单独的辐照度。
:::

::: proof
场相加：$E = E_1 + E_2$。平方后在一个周期上取平均：

$$
\langle E^2 \rangle = \langle E_1^2 \rangle + \langle E_2^2 \rangle + 2\langle E_1 E_2 \rangle .
$$

前两项就是 $I_1$ 与 $I_2$，因为 $\langle\cos^2\rangle = \tfrac12$。交叉项用 $\cos A \cos B = \tfrac12[\cos(A - B) + \cos(A + B)]$：

$$
E_1 E_2 = \tfrac12 E_{01}E_{02}\bigl[\cos(\phi_1 - \phi_2) + \cos(2\omega t + \phi_1 + \phi_2)\bigr].
$$

第二个余弦在一个周期上平均为零。第一个是常数，所以 $2\langle E_1E_2\rangle = E_{01}E_{02}\cos\delta = 2\sqrt{I_1I_2}\cos\delta$。
:::

项 $2\sqrt{I_1I_2}\cos\delta$ 是**干涉项**。它在 $-2\sqrt{I_1I_2}$ 与 $+2\sqrt{I_1I_2}$ 之间变化，所以

$$
I_{\max} = \bigl(\sqrt{I_1} + \sqrt{I_2}\bigr)^2, \qquad I_{\min} = \bigl(\sqrt{I_1} - \sqrt{I_2}\bigr)^2 .
$$

能量并没有被创造或消灭：在许多条条纹上平均，$\cos\delta$ 平均为零，$I = I_1 + I_2$。干涉只是把能量从暗纹重新分配到明纹。两束等强，$I_1 = I_2 = I_0$，得 $I = 2I_0(1 + \cos\delta) = 4I_0\cos^2(\delta/2)$，在 $0$ 与 $4I_0$ 之间摆动。

相位差通常来自光程差 $\Lambda$：多走光程 $\Lambda$ 的波落后 $\delta = 2\pi\Lambda/\lambda_0$，其中 $\lambda_0$ 是真空波长。相长干涉（$\delta = 2\pi m$）即 $\Lambda = m\lambda_0$，相消干涉即 $\Lambda = (m + \tfrac12)\lambda_0$，$m$ 为整数。反射还可能额外带来 $\pi$ 的相移，这部分要另行计入。

::: definition 条纹对比度 {#def-visibility}
干涉图样的**对比度**（或可见度）为

$$
\mathcal{V} = \frac{I_{\max} - I_{\min}}{I_{\max} + I_{\min}} .
$$

对两束完全相干的光，$\mathcal{V} = 2\sqrt{I_1I_2}/(I_1 + I_2)$。
:::

等幅相干光的对比度为 $1$，没有条纹时为 $0$。它对强弱不均的两束光出人意料地宽容：一束强度只有另一束的四分之一时，$\mathcal{V} = 2\sqrt{0.25}/1.25 = 0.80$，条纹仍然相当清楚。

## 相干性 {#coherence}

墙上的两支手电不产生干涉，因为 [[#thm-two-beam]] 假定的是相位差*固定*的两列波。真实的热光由大量原子发射，每个原子辐射一小段波列，相位随机。某点处光的相位在一个称为相干时间的尺度上随机游走。两个独立光源的 $\delta$ 每秒钟在一切可能值之间游走上万亿次，$\langle\cos\delta\rangle = 0$，强度便直接相加。

一切经典干涉实验的解决办法，是把一列波分成两列再让两部分重新会合。每次随机跳变同时出现在两部分中，只要两条路径的长度不是差得太多，其差就保持固定。

::: definition 相干时间与相干长度 {#def-coherence}
谱宽为 $\Delta\nu$（以频率计）的光，**相干时间** $\tau_c \approx 1/\Delta\nu$，是它的相位可以预见的时长。**相干长度**为

$$
\ell_c = c\,\tau_c \approx \frac{c}{\Delta\nu} \approx \frac{\lambda^2}{\Delta\lambda},
$$ {#eq-coherence-length}

其中 $\Delta\lambda$ 是对应的波长展宽。被分开的一束光的两部分，只有当光程差不超过约 $\ell_c$ 时才能以良好对比度干涉。
:::

最后一个形式用到 $\nu = c/\lambda$，故 $\lvert\Delta\nu\rvert = c\,\Delta\lambda/\lambda^2$。约等号是诚实的：精确的系数取决于谱线形状，而按可见度衰减来定义会差一个数量级为一的因子。

::: example 波列有多长？ {#ex-coherence}
估计下列光源的相干长度：(a) 白光，$400$–$700\,\mathrm{nm}$；(b) 多模氦氖激光，$\Delta\nu = 1.5\,\mathrm{GHz}$；(c) 稳频氦氖激光，$\Delta\nu = 1\,\mathrm{MHz}$。
::: solution
(a) 取 $\lambda \approx 550\,\mathrm{nm}$、$\Delta\lambda = 300\,\mathrm{nm}$：

$$
\ell_c \approx \frac{(550\,\mathrm{nm})^2}{300\,\mathrm{nm}} \approx 1.0\,\mu\mathrm{m}.
$$

白光条纹只在一两个波长的光程差内存在。这就是肥皂膜只在几百纳米厚的地方显示颜色的原因。

(b) $\ell_c \approx c/\Delta\nu = (3.00\times10^{8})/(1.5\times10^{9})\,\mathrm{m} = 0.20\,\mathrm{m}$。两臂相差几厘米的干涉仪轻松工作。

(c) $\ell_c \approx (3.00\times 10^8)/(1\times 10^6)\,\mathrm{m} = 300\,\mathrm{m}$。稳频激光非同寻常的相干性，正是大范围场景的全息摄影和长距离干涉测长得以实现的原因。
:::
:::

相干长度说的是**时间相干性**：某一点的波与它自己在 $\tau$ 之后是否相符。还有**空间相干性**：同一时刻并排两处的波是否有固定相位关系。从两点看一个角尺寸为 $\theta_s$ 的扩展光源，每一点收到的是光源各部分所发波的混合；相距超过约 $\lambda/\theta_s$ 的两点，相位不再相关。太阳张角 $0.53^\circ = 9.3\times10^{-3}\,\mathrm{rad}$，所以 $\lambda = 550\,\mathrm{nm}$ 的日光只在约 $60\,\mu\mathrm{m}$ 范围内具有空间相干性。杨因此先让日光通过一个小针孔：小针孔就是小光源，它的光在随后的双缝处是相干的。

## 杨氏双缝 {#young}

来自一个窄光源的光照亮相距 $d$ 的两条平行狭缝。每条缝都像一个新的光源，而由于两者由同一列波供给，它们是相干的。远处 $L \gg d$ 的屏幕上出现条纹。

::: theorem 双缝条纹 {#thm-young}
两条等强、相距 $d$、同相的相干线光源照亮距离 $L \gg d$ 的屏幕。沿与中垂线成 $\theta$ 的方向，路程差为 $d\sin\theta$，辐照度为

$$
I(\theta) = 4I_0\cos^2\!\left(\frac{\pi d\sin\theta}{\lambda}\right),
$$ {#eq-young}

其中 $I_0$ 是单缝单独存在时的辐照度。明纹出现在 $d\sin\theta = m\lambda$，暗纹在 $d\sin\theta = (m + \tfrac12)\lambda$。小角下屏幕上的明纹位于 $y_m = m\lambda L/d$，等间距

$$
\Delta y = \frac{\lambda L}{d}.
$$ {#eq-fringe-spacing}
:::

::: proof
设两缝在 $S_1$ 与 $S_2$，$P$ 是远处屏幕上沿方向 $\theta$ 的一点。因 $L \gg d$，光线 $S_1P$ 与 $S_2P$ 实际上平行，都与轴成角 $\theta$。从 $S_1$ 向 $S_2P$ 作垂线。$S_2P$ 多出的长度是那个直角三角形的短边：斜边 $d$，$S_1$ 处的角为 $\theta$，即 $\Lambda = d\sin\theta$。相位差为 $\delta = 2\pi d\sin\theta/\lambda$。两束等强时 [[#eq-two-beam]] 化为 $I = 2I_0(1 + \cos\delta) = 4I_0\cos^2(\delta/2)$，即 [[#eq-young]]。

极大在 $\delta/2 = m\pi$，即 $d\sin\theta = m\lambda$；零点在 $\delta/2 = (m+\tfrac12)\pi$。距离 $L$ 的屏幕上 $P$ 点高度 $y = L\tan\theta$。$\theta$ 小时 $\sin\theta \approx \tan\theta = y/L$，所以极大在 $y_m = m\lambda L/d$，相邻极大相距 $\lambda L/d$。
:::

条纹间距随波长和距离增大，随两缝分开而缩小。测出 $\Delta y$、$L$ 和 $d$ 就得到 $\lambda$：这是杨（Young）对光的波长的测量，也是人类的第一次。

::: example 激光条纹 {#ex-young}
氦氖激光束（$\lambda = 633\,\mathrm{nm}$）垂直入射到相距 $0.250\,\mathrm{mm}$ 的双缝。求 $1.20\,\mathrm{m}$ 外屏幕上的条纹间距，以及第五条明纹的角度。
::: solution
由 [[#eq-fringe-spacing]]，

$$
\Delta y = \frac{(633\times 10^{-9}\,\mathrm{m})(1.20\,\mathrm{m})}{0.250\times10^{-3}\,\mathrm{m}} = 3.04\times10^{-3}\,\mathrm{m} = 3.04\,\mathrm{mm}.
$$

第五条明纹满足 $\sin\theta = 5\lambda/d = 5 \times 633\times10^{-9}/(0.250\times10^{-3}) = 0.01266$，所以 $\theta = 0.725^\circ$。这个角很小，小角公式足够精确：$\tan\theta$ 与 $\sin\theta$ 之差不到万分之一。第五条明纹离中心 $15.2\,\mathrm{mm}$。
:::
:::

::: widget plot
f: (1 + V*cos(2000*pi*d*x/lam))/2
x: -8, 8
y: 0, 1.1
sliders: d=0.25:0.1:1:0.05; lam=633:400:700:1; V=1:0:1:0.05
caption: 双缝辐照度（按其最大值归一化），屏幕在 1 m 外；x 是屏上位置（毫米），d 是缝距（毫米），lam 是波长（纳米）。d = 0.25、lam = 633 时条纹间距 2.53 mm。把 d 加倍间距减半；把 lam 向紫色调低条纹变密。滑条 V 是可见度：调低它（部分相干的效果）会把暗纹填亮而条纹位置不动。
:::

::: warning 条纹公式只适用于小角
$y_m = m\lambda L/d$ 用了 $\sin\theta \approx \tan\theta$。精确条件是 $d\sin\theta = m\lambda$ 与 $y_m = L\tan\theta_m$。当 $d$ 只有几个波长时，$\sin\theta_m$ 不小，平坦屏幕上的条纹不再等间距；而 $\sin\theta = m\lambda/d > 1$ 对大的 $m$ 干脆无解：条纹只有有限多条，$\lvert m\rvert \le d/\lambda$。
:::

不用狭缝的双光源装置也能产生同样的条纹。**菲涅耳（Fresnel）双棱镜**用一块薄双棱镜把单一光源的光弯成两束重叠的光，仿佛来自两个虚光源。**洛埃镜**中，平面镜上方高 $h$ 处的光源与自己的像干涉——像位于 $-h$，充当第二光源，故 $d = 2h$。与杨氏双缝有一处不同：镜面上路程相等的那条条纹是暗的，不是明的。反射波在较密的玻璃表面反射时反了相，这是下一节要用到的 $\pi$ 相位突变的直接证据。

白光之下每种颜色各按自己的间距成图。中央处所有颜色 $\Lambda = 0$，中央条纹是白的；往外几条，颜色分开并被抹平，大约在 $\ell_c/\lambda \approx 2$ 条之后，与 [[#ex-coherence]] 一致。

::: quiz
杨氏实验的整套装置浸入水（$n = 1.33$）中。条纹间距如何变化？
- [ ] 增大 $1.33$ 倍
- [x] 缩小 $1.33$ 倍
- [ ] 不变，因为频率不变
- [ ] 条纹消失，因为水破坏了相干性
::: solution
起作用的路程差是光程 $n\,d\sin\theta$。明纹要求 $n d\sin\theta = m\lambda_0$，公式中的波长便是 $\lambda_0/n$，即水中的波长。间距 $\lambda L/d$ 缩小 $1.33$ 倍。频率确实不变；波长变了。
:::
:::

## 薄膜 {#thin-films}

肥皂泡或油膜的颜色，来自薄膜上下两个表面反射的光之间的干涉。需要两样东西：光程差，以及反射时的相位变化。

**反射相位变化**来自 [[optics/polarisation]] 的菲涅耳公式。正入射时，从折射率 $n_1$ 射向 $n_2$ 的光的反射振幅为 $r = (n_1 - n_2)/(n_1 + n_2)$。若 $n_2 > n_1$（从光疏射向光密介质的反射），$r < 0$：反射波反相，相位变化 $\pi$。若 $n_2 < n_1$ 则没有相位变化。系在更粗绳上的绳波反射时脉冲同样倒过来，分毫不差。

::: proposition 正入射的薄膜干涉 {#prop-film}
折射率 $n_f$、厚度 $t$ 的薄膜被真空波长 $\lambda_0$ 的光正入射照明。从上、下表面反射的两列波光程相差 $2n_f t$。若两次反射中恰有恰无一次发生 $\pi$ 相位变化，则反射最强当

$$
2n_f t = \left(m + \tfrac12\right)\lambda_0
$$ {#eq-film-one}

反射最弱当 $2n_ft = m\lambda_0$。若两次反射同有或同无该相位变化，两个条件互换。
:::

::: proof
下表面的反射波两次穿过薄膜，在折射率 $n_f$ 中走过几何路程 $2t$，所以额外光程为 $2n_f t$，额外相位为 $2\pi(2n_ft)/\lambda_0$。一个表面有 $\pi$ 相位变化而另一个没有，就在相位差上再加 $\pi$，把 $\Lambda = m\lambda_0$（无相移时为相长）变成相消，把 $\Lambda = (m + \tfrac12)\lambda_0$ 变成相长。两表面相同的相移在差中抵消。斜入射时同样的论证给出 $2n_ft\cos\theta_t$，$\theta_t$ 是膜内的角度。
:::

振幅也要紧。肥皂膜的两束反射振幅几乎相等，各约入射振幅的 $0.14$，所以相消近乎完全。膜内的多次反射贡献小得多，这里忽略；它们是法布里–珀罗一节的主题。

::: example 肥皂膜的颜色 {#ex-soap}
空气中一块竖直的肥皂膜（$n = 1.33$）某处厚 $500\,\mathrm{nm}$。正入射下哪些可见波长在此被强烈反射，哪些缺失？膜破之前顶部为何发黑？
::: solution
空气–肥皂的反射发生在光密介质上（相位变化 $\pi$）；背面的肥皂–空气反射没有。恰有一次相移，[[#eq-film-one]] 适用。此处 $2n_ft = 2 \times 1.33 \times 500\,\mathrm{nm} = 1330\,\mathrm{nm}$。

强反射，$\lambda_0 = 1330/(m + \tfrac12)\,\mathrm{nm}$：$m = 0, 1, 2, 3$ 给出 $2660$、$887$、$532$、$380\,\mathrm{nm}$。可见的只有 $532\,\mathrm{nm}$（绿）。

缺失波长，$\lambda_0 = 1330/m\,\mathrm{nm}$：$m = 1, 2, 3$ 给出 $1330$、$665$、$443\,\mathrm{nm}$。红光（$665\,\mathrm{nm}$）与蓝紫光（$443\,\mathrm{nm}$）被压掉。膜呈绿色。

排液使膜顶部变薄。当 $t \to 0$，路程差消失，但那唯一的一次 $\pi$ 相移仍在，于是每个波长都干涉相消。膜几乎不反射，看起来发黑。当膜薄到远小于 $\lambda_0/(4n_f) \approx 100\,\mathrm{nm}$ 就发生这种现象；真实的"黑膜"只有几十纳米或更薄。
:::
:::

### 劈尖

若膜厚在变化，每条条纹沿一条等厚线走，这是一幅以 $\lambda_0/(2n_f)$ 为单位的膜的等高线图。两块平板玻璃沿一条边相触、另一端垫一张薄片，就夹出一个小角 $\alpha$ 的空气劈。离接触线 $x$ 处缝隙厚 $t = \alpha x$。下板处的反射（空气到玻璃）有 $\pi$ 相移，上板处的反射（玻璃到空气）没有，所以暗纹位于 $2\alpha x = m\lambda_0$：一组平直、等间距的线，间距

$$
\Delta x = \frac{\lambda_0}{2\alpha}
$$ {#eq-wedge}

接触线上就是一条暗纹。光学加工就这样检验平面度：检验样板放在近于平的表面上显示直条纹，一个高 $\lambda_0/2$ 的凸起会使某条条纹弯出一个完整间距。

::: example 测头发丝 {#ex-wedge}
一根头发把两块玻璃板在离接触线 $10.0\,\mathrm{cm}$ 处撑开。钠光（$589\,\mathrm{nm}$）下从上方数，每厘米 $20$ 条暗纹。求劈角和头发直径。
::: solution
条纹间距 $\Delta x = 1.00\,\mathrm{cm}/20 = 0.500\,\mathrm{mm}$。由 [[#eq-wedge]]，

$$
\alpha = \frac{\lambda_0}{2\Delta x} = \frac{589\times10^{-9}}{2 \times 0.500\times10^{-3}} = 5.89\times10^{-4}\,\mathrm{rad}.
$$

$10.0\,\mathrm{cm}$ 处的缝隙就是头发直径：

$$
D = \alpha L = 5.89\times10^{-4} \times 0.100\,\mathrm{m} = 5.89\times10^{-5}\,\mathrm{m} = 58.9\,\mu\mathrm{m}.
$$

正是一根普通人头发的粗细，用到的只是一把尺子和一盏灯。整个劈上暗纹总数为 $2D/\lambda_0 + 1 = 201$ 条，算上接触线上那条；把它们数完是另一种测法。
:::
:::

### 增透膜

折射率 $n_s$ 的未镀膜玻璃表面，正入射时反射的比例为

$$
R = \left(\frac{n_s - 1}{n_s + 1}\right)^2
$$

$n_s = 1.52$ 时是 $4.3\%$。十个这样的面组成的相机镜头会损失三分之一的光，并让像上布满鬼影。对策是镀一层薄膜，使两束反射光相消。

::: proposition 四分之一波长膜 {#prop-ar}
折射率 $n_c$ 满足 $1 < n_c < n_s$、厚度 $t = \lambda_0/(4n_c)$ 的单层镀膜镀在折射率 $n_s$ 的玻璃上，把 $\lambda_0$ 处正入射的反射率降为

$$
R = \left(\frac{n_s - n_c^2}{n_s + n_c^2}\right)^2,
$$ {#eq-ar}

当 $n_c = \sqrt{n_s}$ 时它为零。
:::

::: proof
设 $r_1 = (1 - n_c)/(1 + n_c)$、$r_2 = (n_c - n_s)/(n_c + n_s)$ 为自上而下入射时膜层上、下界面的振幅反射系数。从下方到达上表面的光的反射系数为 $-r_1$，而光向下与向上穿过上表面的两个透射系数之积为 $1 - r_1^2$；这就是斯托克斯（Stokes）关系，由单次反射的时间反演可得。膜内每往返一次增加相位 $\delta = 4\pi n_c t/\lambda_0$，四分之一波长膜即 $\pi$。把直接反射波与全部多次反射波像下面法布里–珀罗那样求和，得一个几何级数：

$$
r = r_1 + (1 - r_1^2)\,r_2 e^{i\delta}\sum_{k\ge 0}\bigl(-r_1 r_2 e^{i\delta}\bigr)^k = r_1 + \frac{(1 - r_1^2)\,r_2 e^{i\delta}}{1 + r_1 r_2 e^{i\delta}} = \frac{r_1 + r_2 e^{i\delta}}{1 + r_1r_2e^{i\delta}}.
$$

取 $e^{i\delta} = -1$，$r = (r_1 - r_2)/(1 - r_1r_2)$。两个分数通分到 $(1 + n_c)(n_c + n_s)$：分子 $r_1 - r_2$ 化为 $2n_s - 2n_c^2$，分母 $1 - r_1r_2$ 化为 $2n_s + 2n_c^2$。于是 $r = (n_s - n_c^2)/(n_s + n_c^2)$，$R = r^2$ 即 [[#eq-ar]]。$n_c^2 = n_s$ 时为零。
:::

::: example 氟化镁镀膜 {#ex-ar}
氟化镁（$n = 1.38$）是经典的镀膜材料。求折射率 $1.52$ 的冕玻璃上对 $\lambda_0 = 550\,\mathrm{nm}$ 的膜厚，以及该波长处的反射率。
::: solution
厚度为

$$
t = \frac{\lambda_0}{4n_c} = \frac{550\,\mathrm{nm}}{4 \times 1.38} = 99.6\,\mathrm{nm}.
$$

由 [[#eq-ar]]，$n_c^2 = 1.9044$，

$$
R = \left(\frac{1.52 - 1.9044}{1.52 + 1.9044}\right)^2 = \left(\frac{-0.3844}{3.4244}\right)^2 = 0.0126 .
$$

反射率从 $4.3\%$ 降到 $1.3\%$，三倍以上。不为零是因为 $1.38$ 大于理想值 $\sqrt{1.52} = 1.23$，而没有耐久的固体折射率低到那个程度。其他波长处这层膜不恰好是四分之一波长，反射在红端和蓝端回升：残余的反射光呈紫色，这正是镀膜镜头的特征色调。现代镜头用多层膜堆把响应压平。
:::
:::

## 迈克耳孙干涉仪 {#michelson}

**迈克耳孙干涉仪**用半镀银镜（分束镜）把一束光分成互相垂直的两臂。每束光在臂端的镜子上反射回来，回到分束镜处两路重新会合，一起走向探测器。若两臂长度差 $\Delta d$，空气中光程差就是 $2\Delta d$：每束光都去了又回。

::: proposition 数条纹 {#prop-michelson}
波长 $\lambda$ 照明的迈克耳孙干涉仪，一块反射镜移动距离 $x$ 时，探测器上固定一点掠过的条纹数为

$$
N = \frac{2x}{\lambda}.
$$ {#eq-michelson}
:::

::: proof
镜子移动 $x$，该臂的往返路程变化 $2x$，相位差变化 $2\pi(2x)/\lambda$。[[#eq-two-beam]] 每变化 $2\pi$ 探测器回到同一强度，即一条条纹。条纹数为 $(4\pi x/\lambda)/(2\pi) = 2x/\lambda$。
:::

数条纹就是以半波长为单位量长度。$633\,\mathrm{nm}$ 的氦氖激光，一千条条纹意味着镜子移动 $316.5\,\mu\mathrm{m}$；电子学细分条纹可分辨一纳米。1960 到 1983 年间，米本身就是用氪谱线的波长定义的，用的正是这种干涉仪。

干涉仪还能测相干性。两臂等长时条纹可见度满格；拉长一臂，一旦 $2\Delta d$ 超过 $\ell_c$，可见度便衰减。可见度随光程差的衰减曲线是光谱的傅里叶变换，**傅里叶变换光谱仪**（见 [[math-methods/fourier]]）利用的正是这一事实。

::: example 钠双线 {#ex-sodium}
钠灯发出 $588.995\,\mathrm{nm}$ 与 $589.592\,\mathrm{nm}$ 两条强谱线。迈克耳孙干涉仪中移动一块镜子，条纹周期性地变暗又复现。求相邻两次最暗之间镜子的位移。
::: solution
每条谱线各成自己的图样，观察到的是两者之和。一条图样的明纹落在另一条的暗纹上时条纹变暗，即两个相位差 $4\pi x/\lambda_1$ 与 $4\pi x/\lambda_2$ 之差为 $\pi$ 的奇数倍。相邻两次最暗之间该差变化 $2\pi$：

$$
4\pi\,\Delta x\left(\frac{1}{\lambda_1} - \frac{1}{\lambda_2}\right) = 2\pi, \qquad \Delta x = \frac{\lambda_1\lambda_2}{2(\lambda_2 - \lambda_1)}.
$$

$\lambda_2 - \lambda_1 = 0.597\,\mathrm{nm}$，

$$
\Delta x = \frac{(588.995)(589.592)}{2 \times 0.597}\,\mathrm{nm} = 2.91\times10^{5}\,\mathrm{nm} = 0.291\,\mathrm{mm}.
$$

两次最暗之间掠过约 $2\Delta x/\lambda \approx 990$ 条条纹。这是空间中的拍，[[oscillations/sound]] 中拍的光学版本；测 $\Delta x$ 就得到谱线间隔，无需光谱仪。
:::
:::

::: application 干涉仪作为仪器
迈克耳孙（Michelson）与莫雷（Morley）1887 年用一台大型干涉仪寻找光相对地球穿过"以太"运动的速度变化；零结果成为 [[relativity]] 的基石之一。LIGO 探测器是臂长 $4\,\mathrm{km}$ 的迈克耳孙干涉仪，每臂中的光经法布里–珀罗腔来回折叠多次。2015 年 9 月它们探测到黑洞并合产生的引力波，应变约 $10^{-21}$，使每臂长度变化几千分之一质子直径。
:::

## 多光束干涉：法布里–珀罗干涉仪 {#fabry-perot}

双光束条纹按余弦变化，明纹偏宽。更锐利的条纹来自多束光。**法布里–珀罗干涉仪**（或标准具）是两块平行的高反射面，相距 $d$。进入的光来回反弹，每次反弹漏出一小部分。透射光束逐次相差一个往返相位

$$
\delta = \frac{4\pi n d\cos\theta}{\lambda_0},
$$

其中 $n$ 是两镜之间的折射率，$\theta$ 是镜内光线角度。

::: theorem 艾里（Airy）透过率函数 {#thm-airy}
反射率为 $R$ 的无损耗镜面（振幅反射 $r$，$r^2 = R$，透射率 $T = 1 - R$），透射辐照度为

$$
\frac{I_t}{I_0} = \frac{1}{1 + F\sin^2(\delta/2)}, \qquad F = \frac{4R}{(1 - R)^2}.
$$ {#eq-airy}

只要 $\delta = 2\pi m$，无论 $R$ 多高，透射率都是 $1$。
:::

::: proof
设入射振幅为 $E_0$。第一条透射光束进出腔体，振幅 $E_0\,tt'$，$t$、$t'$ 是两面镜的振幅透射系数，无损耗镜面下 $\lvert tt'\rvert = 1 - R = T$（$tt'$ 的常数相位在辐照度中消失）。其后每条光束在腔内多反射两次，多一个因子 $r^2 = R$ 和往返相位 $e^{i\delta}$（反射带来的任何相位可吸收进 $\delta$）。总透射复振幅是几何级数：

$$
E_t = E_0 T\left(1 + Re^{i\delta} + R^2 e^{2i\delta} + \cdots\right) = \frac{E_0 T}{1 - Re^{i\delta}},
$$

因 $R < 1$ 而收敛。辐照度正比于 $\lvert E_t\rvert^2$：

$$
\frac{I_t}{I_0} = \frac{T^2}{(1 - Re^{i\delta})(1 - Re^{-i\delta})} = \frac{T^2}{1 - 2R\cos\delta + R^2}.
$$

写 $\cos\delta = 1 - 2\sin^2(\delta/2)$：分母为 $(1 - R)^2 + 4R\sin^2(\delta/2)$。代入 $T = 1 - R$，分子分母同除以 $(1 - R)^2$，即 [[#eq-airy]]。
:::

引人注目的是共振时：两块各自反射 $95\%$ 的镜子组成的膜堆竟然全部透射。腔内多次反射的波不断积累，直到向前的泄漏恰好与输入平衡，而向后反射的波彼此抵消。

::: definition 精细度与自由光谱范围 {#def-finesse}
**自由光谱范围**是相邻透射峰之间的频率间隔，正入射时 $\Delta\nu_{\mathrm{FSR}} = c/(2nd)$。**精细度**是自由光谱范围与一个峰半高全宽之比，

$$
\mathcal{F} = \frac{\Delta\nu_{\mathrm{FSR}}}{\delta\nu} = \frac{\pi\sqrt{F}}{2} = \frac{\pi\sqrt{R}}{1 - R}.
$$ {#eq-finesse}
:::

$F$ 大时，精细度公式由 [[#eq-airy]] 得出：半高处在 $F\sin^2(\delta/2) = 1$，峰附近 $\sin(\delta/2) \approx (\delta - 2\pi m)/2$，所以 $\delta$ 的半宽为 $2/\sqrt{F}$，全宽 $4/\sqrt{F}$。峰在 $\delta$ 上相隔 $2\pi$，精细度即 $2\pi/(4/\sqrt{F}) = \pi\sqrt{F}/2$。

::: widget plot
f: 1/(1 + 4*R/(1 - R)^2*sin(x/2)^2)
x: -2pi, 4pi
y: 0, 1.1
piticks: true
sliders: R=0.5:0.05:0.98:0.01
caption: 艾里函数 [[#eq-airy]] 随往返相位 δ 的变化。R = 0.5 时峰很宽，不比双光束条纹好多少。把 R 提高到 0.95，看峰变锐而高度保持 1、位置保持 δ = 2πm；峰间透射率降到 (1 − R)²/(1 + R)²。精细度 πR^(1/2)/(1 − R) 是峰间距与峰宽之比：R = 0.5 时约 4.4，R = 0.95 时 61。
:::

::: example 法布里–珀罗标准具 {#ex-fp}
一台空气间隔标准具，镜面反射率 $0.95$，间距 $5.00\,\mathrm{mm}$。求系数 $F$、精细度、自由光谱范围和每个透射峰的宽度。$633\,\mathrm{nm}$ 处的分辨本领 $\lambda/\delta\lambda$ 是多少？
::: solution
由 [[#eq-airy]]，$F = 4(0.95)/(0.05)^2 = 3.80/0.0025 = 1520$。由 [[#eq-finesse]]，

$$
\mathcal{F} = \frac{\pi\sqrt{0.95}}{0.05} = 61.2 .
$$

自由光谱范围为

$$
\Delta\nu_{\mathrm{FSR}} = \frac{c}{2d} = \frac{2.998\times10^{8}}{2 \times 5.00\times10^{-3}}\,\mathrm{Hz} = 3.00\times10^{10}\,\mathrm{Hz} = 30.0\,\mathrm{GHz},
$$

每个峰的宽度 $\delta\nu = 30.0\,\mathrm{GHz}/61.2 = 490\,\mathrm{MHz}$。$633\,\mathrm{nm}$ 光的频率为 $c/\lambda = 4.74\times10^{14}\,\mathrm{Hz}$，所以

$$
\frac{\lambda}{\delta\lambda} = \frac{\nu}{\delta\nu} = \frac{4.74\times10^{14}}{4.90\times10^{8}} = 9.7\times10^{5}.
$$

相隔 $0.00065\,\mathrm{nm}$ 的两条谱线可以分开，光谱线的精细结构与超精细结构正是这样研究的。代价是自由光谱范围小：间隔超过 $30\,\mathrm{GHz}$（约 $0.04\,\mathrm{nm}$）的谱线会在不同级次上重叠，所以标准具要接在一台较粗的光谱仪之后使用。激光腔就是一个法布里–珀罗共振器，它的透射峰就是激光的纵模。
:::
:::

::: history 条纹与波动说
胡克（Hooke）与牛顿（Newton）都研究过透镜与平板之间薄空气隙产生的彩色圆环；牛顿仔细测量并在《光学》(*Opticks*, 1704) 中作了描述，用他那种光"微粒"的"易反射与易透射的状态"来解释。杨（Young）1801 到 1803 年间在英国皇家学会的讲演中用波的干涉解释了这些圆环和薄板的颜色，并在《自然哲学讲义》(*Course of Lectures on Natural Philosophy*, 1807) 中描述了双缝实验。杨的工作在英国反响冷落。让波动说真正获得公认的是菲涅耳（Fresnel）从 1815 年起对干涉与衍射的数学处理。

迈克耳孙（Michelson）1881 年在德国为以太漂移实验建造了他的干涉仪，1887 年与莫雷（Morley）在克利夫兰重复之；他因精密光学仪器获 1907 年诺贝尔奖。法布里（Fabry）与珀罗（Pérot）在 1897 到 1899 年的一系列论文中描述了他们的多光束干涉仪。
:::

## 后续内容 {#leads}

下一章 [[optics/diffraction]] 是无穷多个光源的干涉：孔径上每一点都是次级子波源，而本章的双缝图样在那里乘以每条缝自己的衍射图样再次出现。光栅是多缝极限，它的锐利级次与法布里–珀罗峰来自同一套数学。光经双折射晶体后两个偏振分量之间的干涉，是 [[optics/polarisation]] 中波片的基础。而单光子或单电子的双缝——仍然一个一个粒子地垒出条纹——是 [[quantum-1]] 的出发点。

::: summary
- 辐照度是场的二次型，两列相干波给出 $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\delta$；能量重新分布，并非创生。
- 相位差为 $2\pi\Lambda/\lambda_0$，$\Lambda$ 是光程差，另加从光密介质反射产生的 $\pi$ 相移。
- 独立光源不干涉；分束光的光程差小于相干长度 $\ell_c \approx \lambda^2/\Delta\lambda$（白光约 $1\,\mu\mathrm{m}$）时才能干涉。
- 杨氏双缝：明纹 $d\sin\theta = m\lambda$，小角下间距 $\lambda L/d$。
- 薄膜：光程差 $2n_ft$；一次相位反转时，$2n_ft = (m+\tfrac12)\lambda_0$ 处最亮。玻璃上的四分之一波长 MgF₂ 膜把反射率从 $4.3\%$ 压到 $1.3\%$。
- 迈克耳孙干涉仪中镜子移动 $x$ 数得 $N = 2x/\lambda$ 条条纹，并可测相干性与光谱。
- 法布里–珀罗透射 $1/(1 + F\sin^2(\delta/2))$，$F = 4R/(1-R)^2$；精细度 $\pi\sqrt{R}/(1-R)$，自由光谱范围 $c/(2nd)$。
:::

## 习题 {#exercises}

::: exercise 测量波长 {level=1 check="589"}
双缝实验中缝距 $0.500\,\mathrm{mm}$，屏幕距离 $2.00\,\mathrm{m}$，明纹间距 $2.356\,\mathrm{mm}$。求波长，以纳米计，保留三位有效数字。
::: solution
由 [[#eq-fringe-spacing]]，$\lambda = d\,\Delta y/L$：

$$
\lambda = \frac{(0.500\times10^{-3})(2.356\times10^{-3})}{2.00}\,\mathrm{m} = 5.89\times10^{-7}\,\mathrm{m} = 589\,\mathrm{nm},
$$

即黄色的钠光。
:::
:::

::: exercise 不等强度光束的可见度 {level=1 check="0.6"}
两束辐照度为 $9$ 和 $1$（任意单位）的相干光发生干涉。求条纹可见度。
::: solution
由 [[#def-visibility]]，$\mathcal{V} = 2\sqrt{9 \times 1}/(9 + 1) = 6/10 = 0.6$。等价地，$I_{\max} = (3 + 1)^2 = 16$、$I_{\min} = (3 - 1)^2 = 4$，故 $\mathcal{V} = 12/20 = 0.6$。
:::
:::

::: exercise 数条纹 {level=1 check="590"}
迈克耳孙干涉仪的一块镜子移动 $0.1475\,\mathrm{mm}$，恰好 $500$ 条条纹掠过探测器。求波长，以纳米计。
::: solution
由 [[#eq-michelson]]，$\lambda = 2x/N = 2 \times 0.1475\times10^{-3}/500\,\mathrm{m} = 5.90\times10^{-7}\,\mathrm{m} = 590\,\mathrm{nm}$。
:::
:::

::: exercise 油膜 {level=2 check="200"}
一层油（$n = 1.25$）浮在水（$n = 1.33$）上。求能在正入射下强烈反射真空波长 $500\,\mathrm{nm}$ 的光的最小膜厚，以纳米计，并检验该厚度下没有其他可见波长被强烈反射。
::: solution
空气到油、油到水两次反射都是射向光密介质，都有 $\pi$ 相移，相移相互抵消。强反射因此要求 $2n_ft = m\lambda_0$，$m \ge 1$。

$m = 1$：$t = \lambda_0/(2n_f) = 500/(2 \times 1.25) = 200\,\mathrm{nm}$。该厚度下 $2n_ft = 500\,\mathrm{nm}$，其余相长波长为 $500/m$：$250\,\mathrm{nm}$、$167\,\mathrm{nm}$，全是紫外。所以 $500\,\mathrm{nm}$ 是唯一被强烈反射的可见波长，答案为 $200\,\mathrm{nm}$。
:::
:::

::: exercise 牛顿环 {level=2 check="1.9"}
曲率半径 $R = 3.00\,\mathrm{m}$ 的平凸透镜放在平面玻璃板上，用波长 $600\,\mathrm{nm}$ 的光在反射光中观察。离接触点 $r$ 处的空气隙厚 $t \approx r^2/(2R)$。证明暗环位于 $r_m = \sqrt{m\lambda R}$，并求第二条暗环（不计中心斑）的半径，以毫米计，保留两位有效数字。
::: solution
空气隙底面的反射（空气到玻璃）有 $\pi$ 相移；隙顶面（玻璃到空气）没有。恰有一次相移，暗纹在 $2t = m\lambda$（空气隙 $n = 1$）。于是 $2 \cdot r^2/(2R) = m\lambda$，得 $r_m = \sqrt{m\lambda R}$。中心 $m = 0$ 是暗的，与观察相符。

近似 $t \approx r^2/(2R)$ 来自圆的矢高：$t = R - \sqrt{R^2 - r^2} \approx r^2/(2R)$，$r \ll R$。

第二条环 $m = 2$：

$$
r_2 = \sqrt{2 \times 600\times10^{-9} \times 3.00}\,\mathrm{m} = \sqrt{3.60\times10^{-6}}\,\mathrm{m} = 1.90\times10^{-3}\,\mathrm{m}.
$$

两位有效数字是 $1.9\,\mathrm{mm}$。
:::
:::

::: exercise 腔的精细度 {level=2 check="29.8"}
求反射率 $0.90$ 的无损耗镜面法布里–珀罗干涉仪的精细度，保留三位有效数字。
::: solution
由 [[#eq-finesse]]，

$$
\mathcal{F} = \frac{\pi\sqrt{0.90}}{1 - 0.90} = \frac{\pi \times 0.9487}{0.10} = 29.8 .
$$

每个峰约为峰间距的三十分之一。
:::
:::

::: exercise 白光条纹 {level=3}
双缝被在 $\lambda_0 - \tfrac12\Delta\lambda$ 到 $\lambda_0 + \tfrac12\Delta\lambda$ 内均匀分布的光照射，$\Delta\lambda \ll \lambda_0$。每个波长给出 [[#eq-young]] 的图样，诸图样相加。证明以 $\Lambda = d\sin\theta$ 记，总辐照度正比于

$$
1 + \frac{\sin(\pi\Lambda\Delta\lambda/\lambda_0^2)}{\pi\Lambda\Delta\lambda/\lambda_0^2}\cos\left(\frac{2\pi\Lambda}{\lambda_0}\right),
$$

并由此推出条纹第一次消失于 $\Lambda = \lambda_0^2/\Delta\lambda$，即 [[#eq-coherence-length]] 的相干长度。
::: hint
不要对 $\lambda$ 积分，改对波数 $k = 2\pi/\lambda$ 积分：$k$ 的展宽 $\Delta k \approx 2\pi\Delta\lambda/\lambda_0^2$。然后用 $\int \cos(k\Lambda)\,\dd k$。
:::
::: solution
把每个波长的贡献写成 $1 + \cos(k\Lambda)$，$k = 2\pi/\lambda$，每个单位 $k$ 权重相等（窄带内，对 $\lambda$ 均匀一阶上即对 $k$ 均匀）。频带为 $k_0 - \tfrac12\Delta k$ 到 $k_0 + \tfrac12\Delta k$，$k_0 = 2\pi/\lambda_0$，$\Delta k = 2\pi\Delta\lambda/\lambda_0^2$。对频带取平均：

$$
\frac{1}{\Delta k}\int_{k_0 - \Delta k/2}^{k_0 + \Delta k/2}\bigl(1 + \cos k\Lambda\bigr)\,\dd k = 1 + \frac{\sin\bigl((k_0 + \tfrac12\Delta k)\Lambda\bigr) - \sin\bigl((k_0 - \tfrac12\Delta k)\Lambda\bigr)}{\Lambda\,\Delta k}.
$$

正弦之差为 $2\cos(k_0\Lambda)\sin(\tfrac12\Delta k\Lambda)$，平均值为

$$
1 + \frac{\sin(\tfrac12\Delta k\,\Lambda)}{\tfrac12\Delta k\,\Lambda}\cos(k_0\Lambda).
$$

由 $\tfrac12\Delta k\Lambda = \pi\Lambda\Delta\lambda/\lambda_0^2$、$k_0\Lambda = 2\pi\Lambda/\lambda_0$，即得所要结果。条纹是因子 $\cos(2\pi\Lambda/\lambda_0)$，其可见度是包络 $\lvert\sin u/u\rvert$，$u = \pi\Lambda\Delta\lambda/\lambda_0^2$。包络在 $u = \pi$ 即 $\Lambda = \lambda_0^2/\Delta\lambda$ 处第一次为零。所以 [[#def-coherence]] 的相干长度 $\lambda^2/\Delta\lambda$，恰是平顶光谱的条纹恰好消失的光程差。
:::
:::

::: exercise 法布里–珀罗的反射 {level=3}
对 [[#thm-airy]] 的无损耗法布里–珀罗，由能量守恒证明反射比例 $I_r/I_0 = F\sin^2(\delta/2)/(1 + F\sin^2(\delta/2))$，并证明峰间的最小透射率为 $(1 - R)^2/(1 + R)^2$。对 $R = 0.95$ 求值。
::: solution
无吸收时能量守恒给出 $I_r + I_t = I_0$，所以

$$
\frac{I_r}{I_0} = 1 - \frac{1}{1 + F\sin^2(\delta/2)} = \frac{F\sin^2(\delta/2)}{1 + F\sin^2(\delta/2)}.
$$

[[#eq-airy]] 的透射率在 $\sin^2(\delta/2) = 1$ 处最小，得 $1/(1 + F)$。而

$$
1 + F = 1 + \frac{4R}{(1 - R)^2} = \frac{(1 - R)^2 + 4R}{(1 - R)^2} = \frac{(1 + R)^2}{(1 - R)^2},
$$

所以最小透射率为 $(1 - R)^2/(1 + R)^2$。$R = 0.95$ 时为 $(0.05)^2/(1.95)^2 = 0.0025/3.8025 = 6.6\times10^{-4}$。峰与谷的反差是 $1 + F = 1521$，这就是法布里–珀罗条纹近乎黑背景上一条条细亮线的原因。
:::
:::
