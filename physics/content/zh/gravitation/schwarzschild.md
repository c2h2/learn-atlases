水星的轨道是一个不太闭合的椭圆。行星每次回到近日点，最接近太阳的那一点都向前移动了一点。到 1859 年，勒威耶（Le Verrier）已经证明其他行星的引力可以解释这漂移的几乎全部，但不是全部：还剩下每世纪约 $43''$。半个世纪里，天文学家在水星轨道内寻找一颗未曾见过的行星来解释它。1915 年 11 月，爱因斯坦在他的新理论中计算了行星的运动，恰好找到了缺失的 $43''$。这是广义相对论的第一个新成功，它来自单个球对称质量周围的时空几何。

那个几何就是本章的主题。爱因斯坦的场方程发表两个月后，卡尔·史瓦西（Karl Schwarzschild）找到了球对称、不自转天体外部的精确解。这里我们像哈特尔（Hartle）那样把史瓦西度规当作已知，学会读出它。工具来自 [[gravitation/equivalence]]：自由粒子沿测地线——固有时取极值的世界线——运动，光沿类光测地线运动。从度规我们将得到精确的引力红移、轨道的守恒能量与角动量、一个带新吸引项的有效势、最内稳定圆轨道、水星的进动、星光偏折与雷达回波的延迟。

轨道计算的套路与 [[analytical-mechanics/central-forces]] 的牛顿中心力问题完全相同，那部分应当常备手边。常数如前：$GM_\odot = 1.327124\times 10^{20}\,\mathrm{m^3/s^2}$，$R_\odot = 6.957\times 10^{8}\,\mathrm{m}$，$1\,\mathrm{au} = 1.495979\times 10^{11}\,\mathrm{m}$。

## 史瓦西度规 {#metric}

::: definition 史瓦西度规 {#def-schwarzschild}
在质量为 $M$ 的球对称天体外部，在**史瓦西坐标** $(t, r, \theta, \phi)$ 下，线元为

$$
\dd s^2 = -\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\,\dd t^2 + \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\dd r^2 + r^2\bigl(\dd\theta^2 + \sin^2\theta\,\dd\phi^2\bigr),
$$ {#eq-schwarzschild}

其中**史瓦西半径**为

$$
r_s = \frac{2GM}{c^2}.
$$ {#eq-rs}
:::

太阳的 $r_s = 2.95\,\mathrm{km}$，地球的为 $8.87\,\mathrm{mm}$。两者都深深埋在各自天体的内部，而度规在那里并不适用：[[#eq-schwarzschild]] 只描述物质外部的真空。在太阳表面 $r_s/r = 4.2\times 10^{-6}$；在地球表面，$1.4\times 10^{-9}$。正是这些小数目使牛顿引力在太阳系中如此出色，而它们是 [[gravitation/equivalence]] 的 $\abs{\Phi}/c^2$ 的两倍。

读这个度规需要小心，因为坐标是标签，不是测量。

- **$t$** 是很远处的静态钟保持的时间，那里 $r_s/r \to 0$，度规成为球坐标下的闵可夫斯基度规。
- **$r$** 不是到球心的距离。它由角向部分定义：坐标 $r$ 处的球面积为 $4\pi r^2$，赤道面内的圆周长为 $2\pi r$。它有时被称为*面积半径*。
- 固定 $t$、$\theta$、$\phi$ 时，$r_1$ 与 $r_2$ 之间的固有径向距离为 $\int_{r_1}^{r_2}(1 - r_s/r)^{-1/2}\,\dd r$，比 $r_2 - r_1$ 大。空间是弯曲的：周长为 $2\pi r$ 的圆，其半径大于 $r$。
- 角 $\theta$ 与 $\phi$ 在每个球面上保持通常的意义。

远离质量处，$(1 - r_s/r) = 1 + 2\Phi/c^2$，其中 $\Phi = -GM/r$，所以时间–时间系数与 [[gravitation/equivalence#eq-weak-metric]] 的弱场度规匹配。径向系数 $(1 - r_s/r)^{-1} \approx 1 - 2\Phi/c^2$ 与它的径向空间部分匹配。角向部分看起来不同，只是因为弱场度规用了不同的径向坐标；重新标记后，两者在一阶一致。

::: example 一把径向尺 {#ex-ruler}
求固定 $t$ 下，球面 $r = 2r_s$ 与 $r = 3r_s$ 之间的固有径向距离，并与坐标差 $r_s$ 比较。再估计从太阳表面 $R_\odot$ 到 $2R_\odot$ 的固有距离比 $R_\odot$ 超出多少。
::: solution
固定 $t$、$\theta$、$\phi$ 时，线元为 $\dd s = (1 - r_s/r)^{-1/2}\,\dd r$。这个积分是初等的。用代换 $r = r_s\cosh^2\chi$ 可得

$$
\int\frac{\dd r}{\sqrt{1 - r_s/r}} = \int\sqrt{\frac{r}{r - r_s}}\,\dd r = \sqrt{r(r - r_s)} + r_s\ln\bigl(\sqrt r + \sqrt{r - r_s}\bigr) + C,
$$

求导即可验证。以 $r_s$ 为单位，$r = 3$ 处方括号的值为 $\sqrt6 + \ln(\sqrt3 + \sqrt2) = 2.449 + 1.146 = 3.596$，$r = 2$ 处为 $\sqrt2 + \ln(\sqrt2 + 1) = 1.414 + 0.881 = 2.296$。固有距离为

$$
(3.596 - 2.296)\,r_s = 1.300\,r_s,
$$

比坐标差多百分之三十。在黑洞附近，面积相差给定数值的两个球，比在平直空间中远得多。

对太阳，$r_s/r \ll 1$，所以展开：$(1 - r_s/r)^{-1/2} \approx 1 + r_s/(2r)$。超出坐标差的部分为

$$
\int_{R_\odot}^{2R_\odot}\frac{r_s}{2r}\,\dd r = \frac{r_s}{2}\ln 2 = \frac{2.953\,\mathrm{km}}{2}\times 0.693 = 1.02\,\mathrm{km},
$$

约为 $R_\odot$ 的 $7\times 10^{5}$ 分之一。虽然小，但正是这个空间弯曲使 [[#thm-deflection]] 的光偏折加倍。
:::
:::

::: theorem 伯克霍夫（Birkhoff）定理 {#thm-birkhoff}
爱因斯坦真空场方程的每一个球对称解，在一个适当的区域内，都是某个质量 $M$ 的史瓦西度规。特别地，它是静态的，即使内部物质正在坍缩、膨胀或脉动，只要它保持球对称。
:::

我们不证明伯克霍夫定理；它需要场方程，证明可参见 Carroll（2004）§5.2，或 Misner、Thorne 与 Wheeler（1973）§32.2。它是 [[mechanics/gravitation]] 中牛顿壳层定理的相对论对应：球对称分布之外，只有总质量要紧。一个推论是，球对称脉动的恒星不发射引力波。

### 静态钟与精确红移

静止在半径 $r$ 处的钟有 $\dd r = \dd\theta = \dd\phi = 0$，所以

$$
\dd\tau = \sqrt{1 - \frac{r_s}{r}}\;\dd t.
$$ {#eq-static-clock}

这就是弱场钟速率的精确版本。光从 $r_{\mathrm{em}}$ 处的静态发射者向外发往 $r_{\mathrm{rec}}$ 处的静态接收者，每个波峰花费相同的坐标时间，因为度规不依赖 $t$。相隔 $\Delta t$ 出发的波峰相隔 $\Delta t$ 到达，而两只钟测得的频率之比，是它们各自每 $\Delta t$ 内固有时之比的倒数：

$$
\frac{\nu_{\mathrm{rec}}}{\nu_{\mathrm{em}}} = \sqrt{\frac{1 - r_s/r_{\mathrm{em}}}{1 - r_s/r_{\mathrm{rec}}}}.
$$ {#eq-exact-redshift}

天文学家用 $z = \nu_{\mathrm{em}}/\nu_{\mathrm{rec}} - 1$ 表述红移，所以从半径 $R$ 处的表面发出、在远处接收的光有 $1 + z = (1 - r_s/R)^{-1/2}$。

::: example 中子星表面 {#ex-neutron-surface}
一颗中子星质量 $1.40\,M_\odot$、半径 $12.0\,\mathrm{km}$。求 $r_s/R$ 与其表面光在远处接收的红移 $z$。弱场公式错得多厉害？
::: solution
史瓦西半径为

$$
r_s = 1.40\times\frac{2GM_\odot}{c^2} = 1.40\times 2.953\,\mathrm{km} = 4.13\,\mathrm{km},
$$

所以 $r_s/R = 4.13/12.0 = 0.345$。这个不小；场是强的。由 [[#eq-exact-redshift]]，取 $r_{\mathrm{rec}} \to \infty$，

$$
1 + z = \frac{1}{\sqrt{1 - 0.345}} = 1.235, \qquad z = 0.235.
$$

弱场公式 $z \approx GM/(Rc^2) = r_s/(2R)$ 给出 $0.172$，低估了四分之一还多。表面发射的 $6.4\,\mathrm{keV}$ 谱线到达时将是 $6.4/1.235 = 5.2\,\mathrm{keV}$。测量这样的偏移是限制中子星半径的一种方法，[[gravitation/stars]] 会讨论。
:::
:::

::: quiz
一名宇航员悬停在一个不旋转的黑洞旁，用一根绳在史瓦西坐标 $r$ 为常数的地方围成一个圆，发现它的长度为 $2\pi r$。然后她用指向球心的尺，测量从这个圆到紧挨其外、长度为 $2\pi(r + \Delta r)$ 的第二个圆的距离。她测得什么？
- [ ] 恰好 $\Delta r$，因为 $r$ 就是半径。
- [x] 大于 $\Delta r$，因为 $g_{rr} = (1 - r_s/r)^{-1} > 1$。
- [ ] 小于 $\Delta r$，因为长度在引力场中收缩。
- [ ] 没有确定答案，因为长度依赖坐标。
::: solution
坐标 $r$ 由周长定义，所以两个圆被标记为 $r$ 与 $r + \Delta r$。二者的固有径向距离为 $\Delta r/\sqrt{1 - r_s/r}$，大于 $\Delta r$。用静止的尺量出的固有长度不依赖坐标，所以答案是确定的。质量外部的空间有这样的几何：圆相对自己的半径"太短"，像画在漏斗上的圆；[[#ex-ruler]] 算出了这个效应有多大。
:::
:::

## 守恒量与有效势 {#orbits}

牛顿力学中，中心场中的行星守恒能量与角动量，径向运动化为有效势中的一维运动。史瓦西几何中同样如此，理由也相同：度规不依赖 $t$，也不依赖 $\phi$。

由球对称性，轨道停留在一个平面内，我们把它取为赤道面 $\theta = \pi/2$。世界线为 $t(\tau)$、$r(\tau)$、$\phi(\tau)$，它使固有时

$$
\tau = \frac1c\int\sqrt{\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\dot t^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\dot r^2 - r^2\dot\phi^2}\;\dd\sigma
$$

取极值，加点表示对路径上某个参数 $\sigma$ 求导 $\dd/\dd\sigma$。

::: theorem 能量、角动量与径向运动 {#thm-radial}
史瓦西度规赤道面内的类时测地线上，量

$$
e = \Bigl(1 - \frac{r_s}{r}\Bigr)\deriv{t}{\tau}, \qquad \ell = r^2\deriv{\phi}{\tau}
$$ {#eq-constants}

守恒，且径向运动满足

$$
\frac12\Bigl(\deriv{r}{\tau}\Bigr)^2 + V_{\mathrm{eff}}(r) = \frac{c^2(e^2 - 1)}{2}, \qquad V_{\mathrm{eff}}(r) = -\frac{GM}{r} + \frac{\ell^2}{2r^2} - \frac{GM\ell^2}{c^2r^3}.
$$ {#eq-veff}
:::

::: proof
固有时积分的被积函数 $L(t, r, \phi, \dot t, \dot r, \dot\phi)$ 不依赖 $t$ 与 $\phi$。由 [[analytical-mechanics/lagrangian]] 的欧拉–拉格朗日方程，与这两个循环坐标共轭的动量守恒：

$$
\frac{\partial L}{\partial\dot t} = \frac{(1 - r_s/r)c^2\,\dot t}{L} = \text{常数}, \qquad \frac{\partial L}{\partial\dot\phi} = -\frac{r^2\dot\phi}{L} = \text{常数}.
$$

方程一旦导出，我们就能把参数选为固有时本身，$\sigma = \tau$。于是按 $\tau$ 的定义 $L = c$，两个陈述就成为 [[#eq-constants]] 中 $e$ 与 $\ell$ 的守恒。

径向方程不需要第三条欧拉–拉格朗日方程。$\sigma = \tau$ 时，四维速度满足 $\dd s^2/\dd\tau^2 = -c^2$，即 [[relativity/four-vectors]] 的归一化：

$$
-c^2 = -\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\Bigl(\deriv{t}{\tau}\Bigr)^2 + \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\Bigl(\deriv{r}{\tau}\Bigr)^2 + r^2\Bigl(\deriv{\phi}{\tau}\Bigr)^2.
$$

代入 $\dd t/\dd\tau = e/(1 - r_s/r)$ 与 $\dd\phi/\dd\tau = \ell/r^2$，再乘 $(1 - r_s/r)$：

$$
\Bigl(\deriv{r}{\tau}\Bigr)^2 = c^2e^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)\Bigl(c^2 + \frac{\ell^2}{r^2}\Bigr).
$$

展开乘积，用 $r_sc^2 = 2GM$，除以 $2$：

$$
\frac12\Bigl(\deriv{r}{\tau}\Bigr)^2 = \frac{c^2(e^2 - 1)}{2} + \frac{GM}{r} - \frac{\ell^2}{2r^2} + \frac{GM\ell^2}{c^2r^3},
$$

这就是 [[#eq-veff]]。
:::

常数 $e$ 是无穷远处静态观察者测得的、每单位静能的能量；从无穷远处由静止下落的粒子有 $e = 1$。远处慢速运动时，$c^2(e^2 - 1)/2 \approx c^2(e - 1)$ 是每单位质量的牛顿能量，动能加势能。常数 $\ell$ 是单位质量的角动量。$V_{\mathrm{eff}}$ 的前两项恰是 [[analytical-mechanics/central-forces]] 的牛顿有效势。第三项 $-GM\ell^2/(c^2r^3)$ 是新的。它是吸引的，$r$ 减小时它比离心势垒增长得更快，这意味着靠近质量时势垒可能被越过。

::: widget plot
f: -1/x + L^2/(2*x^2) - L^2/x^3; -1/x + L^2/(2*x^2)
x: 2, 40
y: -0.08, 0.06
sliders: L=4:3:5:0.01
labels: 史瓦西 V_eff / c²; 牛顿 V_eff / c²
caption: 每单位 $c^2$ 的有效势，对以 $GM/c^2$ 为单位的 $r$，角动量 $\ell = L\,GM/c$。$L = 4$ 时，史瓦西曲线在 $r = 12$ 处有极小（一个稳定圆轨道），在 $r = 4$ 处有极大（一个不稳定圆轨道）；牛顿曲线在小 $r$ 处永远上升。把 $L$ 滑低：极大与极小相互靠近，在 $L = \sqrt{12} = 3.46$ 时于 $r = 6$ 合并。低于它，就不存在任何稳定圆轨道，任何入射的粒子都将落向球心。
:::

### 圆轨道与最内稳定圆轨道

圆轨道位于 $\dd V_{\mathrm{eff}}/\dd r = 0$ 处。对 [[#eq-veff]] 求导，

$$
\deriv{V_{\mathrm{eff}}}{r} = \frac{GM}{r^2} - \frac{\ell^2}{r^3} + \frac{3GM\ell^2}{c^2r^4} = 0 \quad\Longrightarrow\quad \ell^2 = \frac{GMr}{1 - 3GM/(c^2r)}.
$$ {#eq-circular-l}

这要求 $r > 3GM/c^2$。在 $r = 3GM/c^2$ 处所需的角动量为无穷：这个半径即**光子球**，光本身在那里可以公转，[[gravitation/black-holes]] 将会说明。

::: theorem 最内稳定圆轨道 {#thm-isco}
史瓦西度规在 $r > 3GM/c^2$ 处的圆测地线稳定，当且仅当 $r > 6GM/c^2$。**最内稳定圆轨道**（ISCO）在

$$
r_{\mathrm{ISCO}} = \frac{6GM}{c^2} = 3r_s,
$$

那里的粒子有 $e = \sqrt{8/9}$。
:::

::: proof
圆轨道稳定，当它位于 $V_{\mathrm{eff}}$ 的极小处，即那里 $\dd^2V_{\mathrm{eff}}/\dd r^2 > 0$。再求导一次，

$$
r^4\,\frac{\dd^2V_{\mathrm{eff}}}{\dd r^2} = -2GMr + 3\ell^2 - \frac{12GM\ell^2}{c^2r}.
$$

写 $x = GM/(c^2r)$，则 [[#eq-circular-l]] 化为 $\ell^2 = GMr/(1 - 3x)$。代入，

$$
r^4\,\frac{\dd^2V_{\mathrm{eff}}}{\dd r^2} = -2GMr + \frac{GMr\,(3 - 12x)}{1 - 3x} = GMr\,\frac{(3 - 12x) - 2(1 - 3x)}{1 - 3x} = GMr\,\frac{1 - 6x}{1 - 3x}.
$$

$r > 3GM/c^2$ 时 $1 - 3x > 0$，所以符号就是 $1 - 6x$ 的符号，恰在 $r > 6GM/c^2$ 时为正。

能量方面，在 [[#thm-radial]] 证明的中间方程里令 $\dd r/\dd\tau = 0$：$e^2 = (1 - 2x)(1 + \ell^2/(c^2r^2))$。因为 $\ell^2/(c^2r^2) = x/(1 - 3x)$，这就是

$$
e^2 = (1 - 2x)\,\frac{1 - 2x}{1 - 3x} = \frac{(1 - 2x)^2}{1 - 3x}.
$$

在 $x = 1/6$ 处，$e^2 = (2/3)^2/(1/2) = 8/9$。
:::

气体经吸积盘螺旋落入黑洞时沿近似圆轨道运动，缓慢损失能量，直到抵达 ISCO，然后坠入。沿途辐射出的能量，是无穷远处的静能 $e = 1$ 与 ISCO 处能量之差，占静能的份额

$$
1 - \sqrt{8/9} = 0.057
$$

即 $5.7\%$，而氢聚变为氦只有 $0.7\%$。这就是黑洞上的吸积为宇宙中最亮的天体提供能量的原因。

轨道周期里藏着一个意外。远处钟测得的角速度为 $\Omega = \dd\phi/\dd t$，对圆轨道它精确满足

$$
\Omega^2 = \frac{GM}{r^3},
$$ {#eq-kepler}

即牛顿形式的开普勒第三定律，其中 $r$ 是面积半径。证明是习题之一，见 [[#exr-kepler]]。

::: example 十倍太阳质量黑洞的 ISCO {#ex-isco}
对 $M = 10\,M_\odot$ 的黑洞，求 ISCO 的半径（以千米计），以及那里从远处看的轨道频率 $\Omega/2\pi$。
::: solution
半径为

$$
r_{\mathrm{ISCO}} = \frac{6GM}{c^2} = 3\times 10\times 2.953\,\mathrm{km} = 88.6\,\mathrm{km}.
$$

由 [[#eq-kepler]]，$\Omega = \sqrt{GM/r^3}$。代入 $r = 6GM/c^2$，

$$
\frac{\Omega}{2\pi} = \frac{1}{2\pi}\sqrt{\frac{GM\,c^6}{216\,G^3M^3}} = \frac{c^3}{2\pi\,6^{3/2}\,GM} = \frac{(2.998\times 10^8)^3}{2\pi\times 14.70\times 1.327\times 10^{21}}\,\mathrm{Hz} = 220\,\mathrm{Hz}.
$$

盘内缘的物质每秒绕黑洞两百圈。双星的引力波以轨道频率的两倍发射，所以收缩到 ISCO 的双星在数百赫兹辐射，而这正是地基探测器最灵敏的频段，[[gravitation/gravitational-waves]] 会解释。
:::
:::

::: quiz
一个粒子在不旋转黑洞旁 $r = 5GM/c^2$ 的圆轨道上。它受到一次微小的向内推挤。会发生什么？
- [ ] 它在 $r = 5GM/c^2$ 附近振荡，因为每个圆轨道都是稳定的。
- [x] 它螺旋下落，掉进黑洞，因为 $6GM/c^2$ 以内的轨道不稳定。
- [ ] 什么也不发生：$5GM/c^2$ 处的圆轨道不可能存在，因为它在光子球之内。
- [ ] 它逃逸到无穷远。
::: solution
圆轨道对每个 $r > 3GM/c^2$ 都存在，所以 $5GM/c^2$ 处的是允许的；它在 $3GM/c^2$ 的光子球之外。但由 [[#thm-isco]]，它位于 $V_{\mathrm{eff}}$ 的极大而非极小。向内的推挤把粒子送上内侧的斜坡，没有任何东西能拦住它。（向外的推挤会把它送到外折返点再折回，穿过 $r = 5GM/c^2$ 又进来；它无法逃逸，因为它的 $e < 1$。）
:::
:::

## 水星进动 {#precession}

对行星，$GM/(c^2r) \sim 10^{-8}$，$V_{\mathrm{eff}}$ 中的新项是小扰动。它的效应是径向周期与角向周期不再相等，于是轨道不闭合。计算这个移动，最方便的做法像牛顿轨道方程那样描述轨道的形状 $r(\phi)$。

::: theorem 相对论轨道方程 {#thm-orbit-eq}
赤道面内的类时测地线，函数 $u(\phi) = 1/r$ 满足

$$
\frac{\dd^2u}{\dd\phi^2} + u = \frac{GM}{\ell^2} + \frac{3GM}{c^2}\,u^2.
$$ {#eq-orbit}
:::

::: proof
沿轨道 $\dd r/\dd\tau = (\dd r/\dd\phi)(\dd\phi/\dd\tau) = (\dd r/\dd\phi)\,\ell/r^2 = -\ell\,u'$，其中 $u' = \dd u/\dd\phi$。[[#thm-radial]] 证明中的径向方程化为

$$
\ell^2u'^2 = c^2e^2 - (1 - r_su)(c^2 + \ell^2u^2).
$$

对 $\phi$ 求导：

$$
2\ell^2u'u'' = r_su'(c^2 + \ell^2u^2) - (1 - r_su)\,2\ell^2uu' = u'\bigl(r_sc^2 - 2\ell^2u + 3r_s\ell^2u^2\bigr).
$$

在 $u' \neq 0$ 的区段，除以 $2\ell^2u'$：

$$
u'' = \frac{r_sc^2}{2\ell^2} - u + \frac{3r_s}{2}\,u^2 = \frac{GM}{\ell^2} - u + \frac{3GM}{c^2}\,u^2.
$$

由连续性，方程在 $u' = 0$ 的孤立折返点也成立。（$u' \equiv 0$ 的圆轨道同样满足它，[[#eq-circular-l]] 可为佐证。）
:::

去掉最后一项，[[#eq-orbit]] 就是 [[analytical-mechanics/central-forces]] 的牛顿轨道方程，解为 $u = (GM/\ell^2)(1 + \varepsilon\cos\phi)$：一个偏心率 $\varepsilon$ 的椭圆，经过 $\Delta\phi = 2\pi$ 后闭合。

::: theorem 近日点进动 {#thm-perihelion}
到 $GM/(c^2r)$ 的一阶，半长轴为 $a$、偏心率为 $\varepsilon$ 的束缚轨道是一个椭圆，其近日点沿运动方向每轨道进动

$$
\Delta\phi = \frac{6\pi GM}{c^2a(1 - \varepsilon^2)}
$$ {#eq-perihelion}
:::

::: proof
写 $u = u_0 + u_1$，其中 $u_0 = (GM/\ell^2)(1 + \varepsilon\cos\phi)$，$u_1$ 为小量。一阶下修正满足

$$
u_1'' + u_1 = \frac{3GM}{c^2}u_0^2 = \frac{3G^3M^3}{c^2\ell^4}\bigl(1 + 2\varepsilon\cos\phi + \varepsilon^2\cos^2\phi\bigr).
$$

常数项与 $\cos^2\phi = \tfrac12(1 + \cos2\phi)$ 项产生的，是不增长的小常数修正与小的 $\cos2\phi$ 修正；它们略微改变形状而不改变取向。$\cos\phi$ 项是共振的：它以固有频率驱动振子 $u_1'' + u_1$。方程 $y'' + y = 2A\cos\phi$ 有特解 $y = A\phi\sin\phi$，代入即见：$y'' = 2A\cos\phi - A\phi\sin\phi$。取 $A = 3G^3M^3\varepsilon/(c^2\ell^4)$，解的增长部分为

$$
u \approx \frac{GM}{\ell^2}\bigl(1 + \varepsilon\cos\phi + \varepsilon\,\delta\,\phi\sin\phi\bigr), \qquad \delta = \frac{3G^2M^2}{c^2\ell^2}.
$$

$\delta\phi \ll 1$ 时，$\cos\phi + \delta\phi\sin\phi \approx \cos\bigl((1 - \delta)\phi\bigr)$，由加法公式，$\cos(\delta\phi) \approx 1$、$\sin(\delta\phi) \approx \delta\phi$。于是

$$
u \approx \frac{GM}{\ell^2}\Bigl(1 + \varepsilon\cos\bigl((1 - \delta)\phi\bigr)\Bigr).
$$

近日点（$u$ 的极大）出现在 $(1 - \delta)\phi = 2\pi n$，即 $\phi = 2\pi n/(1 - \delta) \approx 2\pi n(1 + \delta)$ 处。每个轨道，近日点前进 $2\pi\delta = 6\pi G^2M^2/(c^2\ell^2)$。最后，到所需的阶，$\ell^2$ 取 [[analytical-mechanics/central-forces]] 的牛顿值 $GMa(1 - \varepsilon^2)$，便得 [[#eq-perihelion]]。$\phi\sin\phi$ 中的长期增长，是一个缓慢滑移的余弦被展开所造成的人为现象；真解保持有界。
:::

::: example 四十三角秒 {#ex-mercury}
水星 $a = 5.7909\times 10^{10}\,\mathrm{m}$、$\varepsilon = 0.20563$、轨道周期 $87.969$ 天。求它的相对论近日点进动，以每儒略世纪（$36\,525$ 天）角秒计。
::: solution
由 [[#eq-perihelion]]，

$$
\Delta\phi = \frac{6\pi\times 1.32712\times 10^{20}}{(2.99792\times 10^{8})^2\times 5.7909\times 10^{10}\times(1 - 0.20563^2)} = \frac{2.5013\times 10^{21}}{4.9845\times 10^{27}} = 5.018\times 10^{-7}\,\mathrm{rad}
$$

每轨道。一个世纪里水星完成 $36\,525/87.969 = 415.2$ 个轨道，所以进动为

$$
415.2\times 5.018\times 10^{-7}\,\mathrm{rad} = 2.084\times 10^{-4}\,\mathrm{rad} = 2.084\times 10^{-4}\times 206\,265'' = 43.0''.
$$

水星近日点相对恒星的观测进动约为每世纪 $574''$。其他行星，主要是金星、木星与地球，解释约 $531.6''$。经典分析中的残差为每世纪 $43.1 \pm 0.5''$，即广义相对论的 $43.0''$。（从地球上看，还有约每世纪 $5025''$ 大得多的视漂移，来自分点进动；那是参考系的性质，要先扣除。）
:::
:::

::: example 银心的恒星 S2 {#ex-s2}
恒星 S2 绕黑洞人马座 A*（Sagittarius A*）公转，其质量 $4.26\times 10^{6}\,M_\odot$，半长轴 $a = 1035\,\mathrm{au}$，偏心率 $\varepsilon = 0.885$，周期 $16.0$ 年。求它的史瓦西进动每轨道多少角分，以及近心点距离与 $r_s$ 之比。
::: solution
由 [[#eq-perihelion]]，取 $GM = 4.26\times 10^{6}\times 1.327\times 10^{20} = 5.654\times 10^{26}\,\mathrm{m^3/s^2}$、$a = 1035\times 1.496\times 10^{11} = 1.549\times 10^{14}\,\mathrm{m}$，

$$
\Delta\phi = \frac{6\pi\times 5.654\times 10^{26}}{8.988\times 10^{16}\times 1.549\times 10^{14}\times(1 - 0.885^2)} = \frac{1.066\times 10^{28}}{3.02\times 10^{30}} = 3.53\times 10^{-3}\,\mathrm{rad}
$$

每轨道，即 $3.53\times 10^{-3}\times(180/\pi)\times 60 = 12.1$ 角分。近心点在 $a(1 - \varepsilon) = 119\,\mathrm{au}$，约 $1400\,r_s$，所以一阶公式够用。大偏心率帮了忙：因子 $1/(1 - \varepsilon^2) = 4.6$。GRAVITY 合作组用甚大望远镜干涉阵跟踪 S2 通过 2018 年的近心点，2020 年报告的进动为该值的 $1.10 \pm 0.19$ 倍：在质量四百万倍于太阳的黑洞旁看到的史瓦西进动。
:::
:::

下图把效应放大了百万倍以便看见：它描绘 $r = 1/(1 + 0.5\cos(0.9\phi))$，一个方位每轨道转过 $2\pi\times 0.1/0.9 = 40^\circ$ 的椭圆。

::: widget parametric
fx: cos(t)/(1 + 0.5*cos(0.9*t))
fy: sin(t)/(1 + 0.5*cos(0.9*t))
t: 0, 18pi
caption: 一条偏心率 $0.5$、$\delta = 0.1$ 的进动轨道，沿 $\phi$ 描了九圈。注意最接近点：它每圈都沿运动方向前移，九圈之后轨道画出一朵玫瑰。对水星，$\delta$ 为 $8\times 10^{-8}$，这朵玫瑰要三百万年才闭合。
:::

::: warning 这个进动不是行星的进动
学生有时把相对论的 $43''$ 与水星观测到的整个进动（约每世纪 $574''$）相比，得出相对论只解释其中一小部分的结论。这个比较是错的。其他行星的牛顿摄动单独计算并扣除；广义相对论解释的是牛顿理论解释不了的残差。它的成功之处在于：不引入任何自由参数就预言了这个残差。
:::

::: remark 测量其他理论离爱因斯坦有多远
其他度规引力理论在**参数化后牛顿**（PPN）框架下与广义相对论比较。主导太阳系检验的两个参数是 $\gamma$（度量单位质量产生多少空间弯曲）与 $\beta$（度量 $g_{00}$ 的非线性程度）。用它们表示，光偏折是 [[#eq-deflection]] 的 $\tfrac12(1 + \gamma)$ 倍，夏皮罗（Shapiro）延迟是 [[#eq-shapiro]] 的 $\tfrac12(1 + \gamma)$ 倍，近日点进动是 [[#eq-perihelion]] 的 $\tfrac13(2 + 2\gamma - \beta)$ 倍。广义相对论有 $\gamma = \beta = 1$；被重新解释成平直空间的度规理论的牛顿引力，对应 $\gamma = 0$。卡西尼号的测量给出 $\abs{\gamma - 1} \lesssim 2\times 10^{-5}$，配合它，水星近日点把 $\beta$ 定到 $10^{4}$ 分之几。
:::

## 光：偏折与延迟 {#light}

光沿类光测地线，$\dd s^2 = 0$。沿类光测地线固有时不存在，所以用任何使欧拉–拉格朗日方程保持同形的参数 $\lambda$ 来参数化；常数 $e$ 与 $\ell$ 仍然存在，但只有它们的比有意义。把 [[#thm-orbit-eq]] 的步骤中归一化里的 $-c^2$ 换成 $0$ 重做一遍，项 $GM/\ell^2$ 消失，得到

$$
\frac{\dd^2u}{\dd\phi^2} + u = \frac{3GM}{c^2}\,u^2.
$$ {#eq-light-orbit}

没有右端，解 $u = \sin\phi/b$ 是一条以距离 $b$ 掠过球心的直线，$b$ 称为**碰撞参数**。

::: theorem 光的偏折 {#thm-deflection}
以碰撞参数 $b \gg GM/c^2$ 掠过质量 $M$ 的光线，偏折角为

$$
\delta = \frac{4GM}{c^2b}.
$$ {#eq-deflection}
:::

::: proof
写 $u = u_0 + u_1$，其中 $u_0 = \sin\phi/b$。一阶下，

$$
u_1'' + u_1 = \frac{3GM}{c^2b^2}\sin^2\phi = \frac{3GM}{2c^2b^2}(1 - \cos2\phi).
$$

一个特解是 $u_1 = A + B\cos2\phi$，其中 $A = 3GM/(2c^2b^2)$，而 $-4B + B = -3GM/(2c^2b^2)$，故 $B = GM/(2c^2b^2)$。合并得

$$
u = \frac{\sin\phi}{b} + \frac{GM}{c^2b^2}\Bigl(\frac32 + \frac12\cos2\phi\Bigr) = \frac{\sin\phi}{b} + \frac{GM}{c^2b^2}(1 + \cos^2\phi).
$$

光线在 $u = 0$ 处走向无穷。$\phi = 0$ 附近，令 $\phi = -\alpha$、$\alpha$ 为小量：$-\alpha/b + 2GM/(c^2b^2) = 0$，所以 $\alpha = 2GM/(c^2b)$。由对称性，另一端在 $\phi = \pi + \alpha$。一条不偏折的直线应从 $\phi = 0$ 延伸到 $\phi = \pi$；而这条线扫过了 $\pi + 2\alpha$。光线的方向转过了 $2\alpha = 4GM/(c^2b)$。
:::

对擦过太阳的光线，$b = R_\odot$：

$$
\delta = \frac{4\times 1.327\times 10^{20}}{(2.998\times 10^8)^2\times 6.957\times 10^8} = 8.49\times 10^{-6}\,\mathrm{rad} = 1.75''.
$$

这是 [[gravitation/equivalence]] 中仅用等效原理所得值的两倍。一半来自 $g_{00}$——等效原理只知道这些；另一半来自 $g_{rr}$ 中的空间弯曲。

1919 年，戴森（Dyson）与爱丁顿组织的日食远征队，从巴西的索布拉尔和西非外的普林西比岛拍摄了日食时太阳附近的恒星，并把它们的位置与几个月前夜间对同一天区的底片相对照。索布拉尔的天体照相底片给出 $1.98'' \pm 0.12''$，普林西比给出 $1.61'' \pm 0.30''$，均已外推到日面边缘。误差很大，分析其结果此后争论不断，但后来的日食、尤其是太阳附近类星体的射电干涉测量，把 [[#eq-deflection]] 确认到了 $10^4$ 分之一以内。被星系与星系团弯曲的光产生多重像与弧：**引力透镜**如今已是称量暗物质的标准工具。

::: application 引力透镜
位于我们与更遥远天体之间的星系或星系团起着透镜的作用。若源、透镜与观测者严格成一直线，光会沿与透镜成角 $\theta_E$ 的每一个方向到达我们——对每个这样的方向，偏折 [[#eq-deflection]] 恰好把它送向我们——于是我们看到一个**爱因斯坦环**。不完美对准把环打碎成弧或多重像。对距离 $D_L$ 处质量为 $M$ 的透镜、距离 $D_S$ 处的源、二者之间距离 $D_{LS}$，小角几何给出 $\theta_E = \sqrt{4GMD_{LS}/(c^2D_LD_S)}$。环的大小测量包括暗物质在内的总质量，而前景不可见天体对恒星的微引力透镜已经找到了其他恒星周围的行星。
:::

### 夏皮罗延迟

1964 年，夏皮罗（Irwin Shapiro）指出第四个检验。从地球向太阳另一侧的行星发出雷达脉冲并反射回来，所花的时间比在平直空间中长，一部分因为路径弯曲，主要是因为光穿过了钟走慢的区域。对以最近距离 $b$ 掠过、在半径 $r_E$ 的地球与半径 $r_P$ 的行星之间往返的光线（两者都远大于 $b$），在地球上测量的额外往返时间，到对数主导精度为

$$
\Delta t \approx \frac{4GM}{c^3}\ln\frac{4r_Er_P}{b^2}.
$$ {#eq-shapiro}

我们引用这个结果；它的推导沿近直的路径对 $\dd t = \dd r/\bigl(c(1 - r_s/r)\bigr)$ 积分，见 Hartle §10.2。太阳的系数为 $4GM_\odot/c^3 = 19.7\,\mu\mathrm{s}$。

::: example 火星冲日前的雷达回波 {#ex-shapiro-mars}
火星在 $r_P = 1.524\,\mathrm{au}$，地球在 $r_E = 1.000\,\mathrm{au}$。估计一条路径擦过太阳的雷达回波的夏皮罗延迟。
::: solution
取 $b = R_\odot = 6.957\times 10^{8}\,\mathrm{m}$，

$$
\frac{4r_Er_P}{b^2} = \frac{4\times 1.496\times 10^{11}\times 2.280\times 10^{11}}{(6.957\times 10^{8})^2} = 2.82\times 10^{5}, \qquad \ln(2.82\times 10^{5}) = 12.55.
$$

于是 $\Delta t \approx 19.7\,\mu\mathrm{s}\times 12.55 = 247\,\mu\mathrm{s}$，约四分之一毫秒，而整个往返约 $42$ 分钟。火星上的维京号着陆器在 1976–77 年把这个延迟测到了 $0.1\%$。2002 年，对正在飞往土星途中的卡西尼号的空间无线电链路测量了与之密切相关的频率变化，把广义相对论确认到约 $2\times 10^{-5}$。
:::
:::

::: history 史瓦西、爱丁顿与经典检验
爱因斯坦 1915 年 11 月 18 日在普鲁士科学院报告了近日点计算，比场方程的最终形式早一周。他算到所需的一阶，还没有精确解。卡尔·史瓦西当时在东线服役当炮兵军官，找到了精确解，并在 1915 年 12 月寄给爱因斯坦；爱因斯坦 1916 年 1 月向科学院报告了它，而史瓦西当年 5 月便因在前线染上的疾病去世。德罗斯特（Droste）在 1916 年独立找到了同一个解。如今以伯克霍夫（1923）命名的唯一性定理，其实早在 1921 年就由耶布森（Jebsen）找到了。

1919 年 5 月 29 日的日食远征结果，在 1919 年 11 月 6 日皇家学会与皇家天文学会的联席会议上公布，使爱因斯坦一夜之间名扬天下。夏皮罗 1964 年提出雷达时间延迟检验，并在随后的几年里用金星与水星的回波测出它。加上 [[gravitation/equivalence]] 的引力红移，这些就是广义相对论的经典检验。
:::

## 后续内容 {#leads}

史瓦西度规在 $r = r_s$ 处有一个明显的问题：$g_{00}$ 在那里为零而 $g_{rr}$ 发散。对太阳来说那个半径在恒星内部，问题不存在。[[gravitation/black-holes]] 问：当全部质量都在 $r_s$ 之内会怎样——视界、上面找到的 $3GM/c^2$ 处的光子球，以及从 ISCO 开始的坠入。[[#ex-isco]] 的 ISCO 频率在 [[gravitation/gravitational-waves]] 中作为双黑洞旋近终末再现，而那里的双脉冲星显示每一年 $4.2^\circ$ 的近星点进动，出自 [[#eq-perihelion]]。恒星内部，度规不再是史瓦西的，[[gravitation/stars]] 中的相对论流体静力平衡方程限制了中子星的质量。

::: summary
- 球对称质量外部，$\dd s^2 = -(1 - r_s/r)c^2\dd t^2 + (1 - r_s/r)^{-1}\dd r^2 + r^2\dd\Omega^2$，其中 $r_s = 2GM/c^2$：太阳为 $2.95\,\mathrm{km}$。由伯克霍夫定理，这是唯一的球对称真空解。
- $t$ 是远处钟的时间；$r$ 是面积半径，不是到球心的固有距离。静态钟的速率为 $\dd\tau/\dd t = \sqrt{1 - r_s/r}$，给出精确红移 $1 + z = (1 - r_s/R)^{-1/2}$。
- 测地线守恒 $e = (1 - r_s/r)\,\dd t/\dd\tau$ 与 $\ell = r^2\dd\phi/\dd\tau$；径向运动在 $V_{\mathrm{eff}} = -GM/r + \ell^2/2r^2 - GM\ell^2/(c^2r^3)$ 中。
- 新的吸引 $r^{-3}$ 项给出位于 $6GM/c^2$ 的最内稳定圆轨道，束缚能为静能的 $1 - \sqrt{8/9} = 5.7\%$；而 $3GM/c^2$ 的光子球以内根本不存在圆轨道。
- 束缚轨道每轨道进动 $6\pi GM/(c^2a(1 - \varepsilon^2))$：水星每世纪 $43.0''$。
- 以碰撞参数 $b$ 掠过 $M$ 的光偏折 $4GM/(c^2b)$，日面边缘处 $1.75''$，是等效原理值的两倍。
- 掠过太阳的雷达回波延迟约 $(4GM/c^3)\ln(4r_Er_P/b^2)$，火星约 $250\,\mu\mathrm{s}$。
:::

## 习题 {#exercises}

::: exercise 地球的史瓦西半径 {level=1 check="8.87"}
用 $GM_\oplus = 3.986004\times 10^{14}\,\mathrm{m^3/s^2}$，求地球的史瓦西半径，以毫米计。
::: solution
由 [[#eq-rs]]，

$$
r_s = \frac{2GM_\oplus}{c^2} = \frac{2\times 3.986004\times 10^{14}}{(2.99792458\times 10^{8})^2}\,\mathrm{m} = 8.87\times 10^{-3}\,\mathrm{m} = 8.87\,\mathrm{mm}.
$$

地球必须被压缩到弹珠大小，才能成为黑洞。
:::
:::

::: exercise 两个太阳半径外的星光 {level=1 check="0.876"}
求以 $b = 2R_\odot$ 掠过太阳的星光，其广义相对论性偏折，以角秒计。
::: solution
偏折 [[#eq-deflection]] 与 $b$ 成反比，所以 $b$ 加倍则偏折减半：

$$
\delta = \frac{1.751''}{2} = 0.876''.
$$

巧合的是，这恰等于等效原理值在日面边缘处的大小。
:::
:::

::: exercise ISCO 处的固有时 {level=1 check="0.707"}
对 $r = 6GM/c^2$ 圆轨道上的粒子，求 $\dd\tau/\dd t$，即它的钟相对远处静态钟的速率。
::: hint
用 $\dd t/\dd\tau = e/(1 - r_s/r)$，其中 $e$ 取 [[#thm-isco]] 的值。
:::
::: solution
在 ISCO 处，$r_s/r = 2GM/(c^2\cdot 6GM/c^2) = 1/3$，且 $e = \sqrt{8/9}$。于是

$$
\deriv{\tau}{t} = \frac{1 - r_s/r}{e} = \frac{2/3}{\sqrt{8/9}} = \frac{2/3}{0.9428} = 0.707.
$$

精确地说，这是 $1/\sqrt2$。等价地，对任何圆轨道 $\dd\tau/\dd t = \sqrt{1 - 3GM/(c^2r)}$，在 $r = 6GM/c^2$ 处给出 $\sqrt{1/2}$。轨道上的钟以远处钟的 $71\%$ 的速率运行。
:::
:::

::: exercise 地球的近日点进动 {level=2 check="3.84"}
地球 $a = 1.000\,\mathrm{au}$、$\varepsilon = 0.0167$、周期 $365.256$ 天。求它的相对论近日点进动，以每世纪角秒计。
::: solution
由 [[#eq-perihelion]]，

$$
\Delta\phi = \frac{6\pi\times 1.32712\times 10^{20}}{(2.99792\times 10^{8})^2\times 1.495979\times 10^{11}\times(1 - 0.0167^2)} = 1.860\times 10^{-7}\,\mathrm{rad}
$$

每轨道。$36\,525$ 天里恰有 $100.0$ 个轨道，所以进动为 $1.860\times 10^{-5}\,\mathrm{rad} = 3.84''$ 每世纪。它比水星的小，因为地球更靠外、每世纪完成的轨道更少：[[#eq-perihelion]] 每轨道按 $1/a$ 标度，而轨道数按 $a^{-3/2}$ 标度。
:::
:::

::: exercise 金星雷达回波 {level=2 check="233"}
金星的轨道半径为 $0.723\,\mathrm{au}$。用 [[#eq-shapiro]]，估计金星处于上合（在太阳正后方）时雷达回波的夏皮罗延迟，设信号擦过太阳，以微秒计。
::: solution
取 $r_E = 1.496\times 10^{11}\,\mathrm{m}$、$r_P = 0.723\times 1.496\times 10^{11} = 1.082\times 10^{11}\,\mathrm{m}$、$b = 6.957\times 10^{8}\,\mathrm{m}$，

$$
\frac{4r_Er_P}{b^2} = \frac{4\times 1.496\times 10^{11}\times 1.082\times 10^{11}}{4.840\times 10^{17}} = 1.338\times 10^{5}, \qquad \ln(1.338\times 10^{5}) = 11.80.
$$

于是 $\Delta t = 19.70\,\mu\mathrm{s}\times 11.80 = 233\,\mu\mathrm{s}$。这正是夏皮罗的小组在 1960 年代末用金星与水星的回波首次探测到的效应大小。
:::
:::

::: exercise 超大质量黑洞的 ISCO {level=2 check="5.11e-4"}
银河系中心的黑洞质量为 $4.30\times 10^{6}\,M_\odot$。求其 ISCO 处的轨道频率 $\Omega/2\pi$（以赫兹计），以及对应的周期（以分钟计）。
::: solution
由 [[#ex-isco]]，$\Omega/2\pi = c^3/(2\pi\,6^{3/2}\,GM)$，与 $M$ 成反比。$10\,M_\odot$ 时它是 $219.9\,\mathrm{Hz}$，所以

$$
\frac{\Omega}{2\pi} = 219.9\,\mathrm{Hz}\times\frac{10}{4.30\times 10^{6}} = 5.11\times 10^{-4}\,\mathrm{Hz}.
$$

直接重算：$GM = 4.30\times 10^{6}\times 1.32712\times 10^{20} = 5.707\times 10^{26}\,\mathrm{m^3/s^2}$，而 $c^3/(2\pi\times 14.697\times 5.707\times 10^{26}) = 5.11\times 10^{-4}\,\mathrm{Hz}$。周期为 $1/(5.11\times 10^{-4})\,\mathrm{s} = 1955\,\mathrm{s} = 32.6$ 分钟。人马座 A* 的耀发在几十分钟的时间尺度上显示出结构，与 ISCO 附近的发射相符。
:::
:::

::: exercise 木星弯曲的光 {level=2 check="16.3"}
木星 $GM_J = 1.26687\times 10^{17}\,\mathrm{m^3/s^2}$，赤道半径 $7.1492\times 10^{7}\,\mathrm{m}$。求擦过其边缘的光线的偏折，以毫角秒计。
::: solution
由 [[#eq-deflection]]，

$$
\delta = \frac{4GM_J}{c^2b} = \frac{4\times 1.26687\times 10^{17}}{8.98755\times 10^{16}\times 7.1492\times 10^{7}} = 7.887\times 10^{-8}\,\mathrm{rad}.
$$

一毫角秒是 $4.848\times 10^{-9}\,\mathrm{rad}$，所以 $\delta = 16.3\,\mathrm{mas}$。甚长基线射电干涉仪分辨的角度远比这小；2002 年一次近距离掩星期间测量了类星体无线电波被木星的偏折。
:::
:::

::: exercise 盘终止于 $10\,GM/c^2$ 释放的能量 {level=2 check="4.38"}
设吸积盘中的气体从远处沿圆轨道螺旋向内，但在 $r = 10GM/c^2$ 处而不是在 ISCO 处被移除。它已辐射出其静能的百分之几？
::: solution
圆轨道上每单位静能的能量为 $e = (1 - 2x)/\sqrt{1 - 3x}$，$x = GM/(c^2r)$，出自 [[#thm-isco]] 的证明。$x = 0.1$ 处，

$$
e = \frac{0.8}{\sqrt{0.7}} = \frac{0.8}{0.83666} = 0.95618.
$$

从远处静止的 $e = 1$ 出发，气体已辐射 $1 - e = 0.0438$，即其静能的 $4.38\%$。若继续到 ISCO，此值升为 $5.72\%$。牛顿估计——单位质量引力势能 $GM/(2r)$ 的一半——在这一半径处给 $x/2 = 5\%$，已经是很差的近似。
:::
:::

::: exercise 开普勒第三定律精确成立 {level=3 #exr-kepler}
证明 [[#eq-kepler]]：史瓦西度规在面积半径 $r$ 处的圆测地线，角速度 $\Omega = \dd\phi/\dd t$ 精确满足 $\Omega^2 = GM/r^3$。进而推出圆轨道上 $\dd\tau/\dd t = \sqrt{1 - 3GM/(c^2r)}$。
::: hint
$\Omega = (\dd\phi/\dd\tau)/(\dd t/\dd\tau)$。用 [[#eq-circular-l]] 以及 [[#thm-isco]] 证明中 $e^2$ 的表达式。
:::
::: solution
写 $x = GM/(c^2r)$，则 $r_s/r = 2x$。由 [[#eq-constants]]，

$$
\Omega = \frac{\dd\phi/\dd\tau}{\dd t/\dd\tau} = \frac{\ell/r^2}{e/(1 - 2x)} = \frac{\ell(1 - 2x)}{r^2e}.
$$

对圆轨道，[[#eq-circular-l]] 给出 $\ell^2 = GMr/(1 - 3x)$，[[#thm-isco]] 的证明给出 $e^2 = (1 - 2x)^2/(1 - 3x)$。因此

$$
\Omega^2 = \frac{\ell^2(1 - 2x)^2}{r^4e^2} = \frac{GMr}{1 - 3x}\cdot\frac{(1 - 2x)^2}{r^4}\cdot\frac{1 - 3x}{(1 - 2x)^2} = \frac{GM}{r^3}.
$$

$x$ 的每一因子都消掉了，所以结果精确成立，而不只是一阶成立。钟的速率方面，

$$
\deriv{\tau}{t} = \frac{1 - 2x}{e} = \frac{1 - 2x}{(1 - 2x)/\sqrt{1 - 3x}} = \sqrt{1 - 3x} = \sqrt{1 - \frac{3GM}{c^2r}}.
$$

$x \ll 1$ 时这是 $1 - \tfrac32 x$，即引力项 $-x$ 与速度项 $-v^2/(2c^2) = -\tfrac12 x$ 之和，见 [[gravitation/equivalence]] 中 GPS 的讨论。在光子球处 $x = 1/3$，它为零：那里的轨道钟必须以光速运动。
:::
:::

::: exercise 光子球 {level=3}
证明光只能在一个史瓦西质量旁 $r = 3GM/c^2$ 处沿圆轨道运动，并且这一轨道不稳定。然后证明：从无穷远入射的光子，若其碰撞参数小于 $b_c = 3\sqrt3\,GM/c^2$，就会被俘获。
::: hint
对光，归一化给出 $(\dd r/\dd\lambda)^2 = \ell^2\bigl(1/b^2 - W(r)\bigr)$，其中 $W(r) = (1 - r_s/r)/r^2$，$b = \ell/(ce)$ 是碰撞参数。求 $W$ 的极大。
:::
::: solution
对类光测地线，归一化是 $0$ 而不是 $-c^2$。用仿射参数 $\lambda$ 把 [[#thm-radial]] 的步骤重做一遍，

$$
\Bigl(\deriv{r}{\lambda}\Bigr)^2 = c^2e^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)\frac{\ell^2}{r^2} = \ell^2\Bigl(\frac{1}{b^2} - W(r)\Bigr), \qquad W(r) = \frac{1}{r^2}\Bigl(1 - \frac{r_s}{r}\Bigr),
$$

其中 $b = \ell/(ce)$。远处 $\dd r/\dd\lambda \to -ce$，而 $r^2\dd\phi/\dd\lambda = \ell$，比值 $\ell/(ce)$ 就是入射直线到球心的垂直距离，即碰撞参数。函数 $W$ 起着势垒的作用。圆轨道要求 $\dd r/\dd\lambda = 0$ 且 $\dd^2r/\dd\lambda^2 = 0$，即 $1/b^2 = W$ 且 $W' = 0$：

$$
W'(r) = -\frac{2}{r^3} + \frac{3r_s}{r^4} = 0 \quad\Longrightarrow\quad r = \frac{3r_s}{2} = \frac{3GM}{c^2}.
$$

这是 $r > r_s$ 上 $W$ 唯一的驻点，而且是极大，因为 $W$ 在 $r = r_s$ 处和 $r \to \infty$ 时都趋于 $0$，中间为正。位于有效势垒极大处的圆轨道不稳定：微小扰动会把光子送出或落进。

势垒的高度为 $W(3GM/c^2) = (1/3)\big/(9G^2M^2/c^4) = c^4/(27G^2M^2)$。入射光子处处有 $(\dd r/\dd\lambda)^2 > 0$，因而能不折返地抵达 $r_s$，恰好当 $1/b^2 > W_{\max}$，即

$$
b < b_c = \frac{1}{\sqrt{W_{\max}}} = \frac{3\sqrt3\,GM}{c^2} \approx 5.20\,\frac{GM}{c^2}.
$$

$b < b_c$ 的光子被俘获。于是从远处看，明亮背景前的黑洞投出一个半径 $b_c = 2.6\,r_s$（而不是 $r_s$）的阴影。事件视界望远镜拍到的正是那个阴影，[[gravitation/black-holes]] 会描述。
:::
:::
