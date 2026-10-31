2004 年 12 月 26 日，苏门答腊近海的一次地震把一条海床抬高了数米。在开阔的印度洋上，由此产生的波浪不足一米高，从船底通过而未被察觉，但它以喷气客机的速度横跨大洋，约两小时后到达 $1600\,\mathrm{km}$ 外的斯里兰卡。相比之下，扔进池塘的石子激起的涟漪以每秒几十厘米的速度缓缓爬开，它形成的圆环从内向外生长：新的小波在中心出现，在前缘消亡。两者都是水面上的表面波；它们服从本章将要导出的同一条色散关系，彼此之别只在波长。

流体支持两类小振幅波。**声音**是压缩波，由流体抵抗体积改变的能力传递；它是 [[continuum/elasticity]] 中的 P 波进入没有剪切刚度介质的情形。**表面波**生存于水与空气的界面，由重力、以及在短波长下由表面张力传递。两者都来自把 [[continuum/ideal-flow]] 的理想流动方程在静止态附近线性化，两者都要用到 [[oscillations/travelling-waves]] 与 [[oscillations/sound]] 的波方程和色散观念。表面波引入了波峰速度与波群速度之间的关键区别，其意义远不止于流体。

## 声音 {#sound}

考虑静止的均匀流体，密度 $\rho_0$、压强 $p_0$，对它施加微小扰动：$\rho = \rho_0 + \rho'$、$p = p_0 + p'$，并带有小速度 $\mathbf v$。在一个声波波长内重力可忽略，黏性亦然（我们稍后校核这一点）。扰动快得使热来不及在压缩区与稀疏区之间流动，所以每个流体质点**绝热**地改变状态，$p$ 是熵恒定时 $\rho$ 的函数。

::: theorem 声学波方程 {#thm-acoustic}
到扰动的一阶，过剩压强、过剩密度与速度势都满足波方程

$$
\pdv{^2p'}{t^2} = c^2\nabla^2p', \qquad c^2 = \Bigl(\pdv{p}{\rho}\Bigr)_s = \frac{K_s}{\rho_0},
$$ {#eq-acoustic}

其中 $K_s = \rho(\partial p/\partial\rho)_s$ 是绝热体积模量。流动是无旋的，沿方向 $\mathbf n$ 传播的平面波中速度为 $\mathbf v = (p'/\rho_0c)\,\mathbf n$。
:::

::: proof
连续性方程 $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$ 只保留一阶项，得

$$
\pdv{\rho'}{t} + \rho_0\nabla\cdot\mathbf v = 0 .
$$

欧拉方程 $\rho(\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v) = -\nabla p$ 线性化为

$$
\rho_0\pdv{\mathbf v}{t} = -\nabla p' ,
$$

因为 $(\mathbf v\cdot\nabla)\mathbf v$ 与 $\rho'\partial_t\mathbf v$ 是二阶的。绝热物态方程给出 $p' = c^2\rho'$，其中 $c^2 = (\partial p/\partial\rho)_s$ 在 $\rho_0$ 处取值。对第一式取 $\partial_t$、对第二式取散度，再相减：

$$
\pdv{^2\rho'}{t^2} = \nabla^2p' = c^2\nabla^2\rho' .
$$

乘以 $c^2$ 即得 $p'$ 满足的 [[#eq-acoustic]]。线性化欧拉方程取旋度得 $\partial_t(\nabla\times\mathbf v) = 0$，所以射入静止流体的声波不携带涡量，且 $\mathbf v = \nabla\phi$、$p' = -\rho_0\partial_t\phi$，它满足同一波方程。对平面波 $p' = F(\mathbf n\cdot\mathbf x - ct)$，线性化欧拉方程给出 $\rho_0\partial_t\mathbf v = -F'\mathbf n$，于是 $\mathbf v = (F/\rho_0c)\mathbf n$。
:::

比值 $p'/v = \rho_0c$ 是介质的**特征声阻抗**。空气为 $413\,\mathrm{Pa\,s/m}$，水为 $1.48\times10^6\,\mathrm{Pa\,s/m}$，比值 $3600$：这就是空气中的声音几乎全被水面反射、超声扫描必须使用耦合凝胶的原因。

### 气体和水中的声速

理想气体经历绝热变化时 $p\propto\rho^\gamma$，$\gamma = C_p/C_V$（[[thermodynamics/first-law]]），于是 $(\partial p/\partial\rho)_s = \gamma p/\rho$，

$$
c = \sqrt{\frac{\gamma p}{\rho}} = \sqrt{\frac{\gamma RT}{M}} ,
$$ {#eq-cgas}

$M$ 为摩尔质量。声速依赖温度，而温度一定时不依赖压强。$20\,^\circ\mathrm C$ 的干空气，取 $\gamma = 1.400$、$M = 0.02897\,\mathrm{kg/mol}$，

$$
c = \sqrt{\frac{1.400\times8.314\times293.15}{0.02897}} = 343\,\mathrm{m/s}.
$$

实测值为 $343.2\,\mathrm{m/s}$。牛顿（Newton）在《自然哲学的数学原理》（*Principia*，1687）中假设压缩是等温的，$p\propto\rho$，得 $\sqrt{RT/M} = 290\,\mathrm{m/s}$，低了 $15\,\%$；他把分歧归因于空气微粒和水汽的尺寸。拉普拉斯（Laplace）1816 年指出压缩是绝热的，修正因子为 $\sqrt\gamma$。绝热假设正确这件事本身就是关于尺度的陈述：在时间 $1/\omega$ 内热只扩散 $\sqrt{D_T/\omega}$ 的距离，$1\,\mathrm{kHz}$ 时的空气约为 $0.06\,\mathrm{mm}$（热扩散率 $D_T = 2.2\times10^{-5}\,\mathrm{m^2/s}$），与压缩区、稀疏区相隔的 $34\,\mathrm{cm}$ 波长相比微不足道。

液体则必须由实测体积模量计算 $c = \sqrt{K_s/\rho}$。$20\,^\circ\mathrm C$ 的水 $K_s \approx 2.2\,\mathrm{GPa}$，于是

$$
c = \sqrt{\frac{2.2\times10^9}{998}} = 1.48\,\mathrm{km/s},
$$

与实测的 $1482\,\mathrm{m/s}$ 一致。海水略硬些也重些，传声约 $1500\,\mathrm{m/s}$。水的绝热体积模量约为常压空气（$\gamma p_0 = 1.42\times10^5\,\mathrm{Pa}$）的 $15\,000$ 倍，密度则大 $830$ 倍，故速度比为 $\sqrt{15\,000/830} = 4.3$，与实测相符。

::: example 声波有多强？ {#ex-loud}
$1.00\,\mathrm{kHz}$ 的纯音在空气中的压强幅值为 $1.00\,\mathrm{Pa}$（声压级 $94\,\mathrm{dB}$，响得像近旁的割草机）。求空气的速度与位移幅值，并校核线性理论适用。
::: solution
由 [[#thm-acoustic]]，$v = p'/\rho_0c = 1.00/(1.20\times343) = 2.43\times10^{-3}\,\mathrm{m/s}$。简谐运动的位移幅值为 $v/\omega = 2.43\times10^{-3}/(2\pi\times1000) = 3.9\times10^{-7}\,\mathrm m$，即三分之一微米。线性化中略去的项比保留的项小 $v/c = 7\times10^{-6}$ 倍，且 $p'/p_0 = 10^{-5}$。即使非常响的声音也是极微小的扰动。非线性效应——波面变陡成为激波——只在压强幅值达千帕量级时才重要，比如喷气发动机或爆炸近旁。
:::
:::

::: example 雷声与温度 {#ex-thunder}
(a) 求 $-20\,^\circ\mathrm C$ 与 $30\,^\circ\mathrm C$ 时空气中的声速。(b) $20\,^\circ\mathrm C$ 的一天看见闪电后 $6.0\,\mathrm s$ 听到雷声，闪电在多远之处？
::: solution
(a) 由 [[#eq-cgas]]，$c \propto\sqrt T$。$253.15\,\mathrm K$ 时 $c = \sqrt{1.400\times8.314\times253.15/0.02897} = 319\,\mathrm{m/s}$；$303.15\,\mathrm K$ 时，$349\,\mathrm{m/s}$。$50\,\mathrm K$ 的温差使速度改变 $9\,\%$。压强不出现：温度相同时，山顶与海平面声速相同。

(b) 光几乎是瞬时到达，所以距离为 $343\times6.0 = 2.1\,\mathrm{km}$：即熟悉的“每千米三秒”法则。因为空气通常越高越冷，声波射线向上弯折（$c$ 随高度减小，射线转向速度较小的一侧，见 [[optics]]），即使闪电在更远处仍看得见，雷声也很少能在约 $15\,\mathrm{km}$ 外听到。有逆温层的夜晚射线反而向下弯，远处的声音传得异常地好。
:::
:::

::: quiz
一只密封的空气球从海平面被带到山顶，山上压强低 $30\,\%$，温度不变。球内空气的声速发生什么变化？
- [ ] 按 $30\,\%$ 下降，因为 $c^2 = \gamma p/\rho$。
- [ ] 上升，因为气体更稀薄。
- [x] 不变，因为 $p/\rho$ 只依赖温度。
- [ ] 按 $\sqrt{0.3}$ 下降。
::: solution
理想气体 $p/\rho = RT/M$，恒温下降低压强，密度按同一比例下降，$c = \sqrt{\gamma RT/M}$ 保持不变。第一个选项忘了 $\rho$ 也在变。决定气体声速的只有温度（以及通过 $\gamma$ 与 $M$ 起作用的成分）。
:::
:::

::: warning 声速公式中的体积模量是绝热的那一个
对液体，等温与绝热体积模量相差因子 $\gamma$，而室温下水的 $\gamma$ 只有 $1.01$，混淆通常无妨。对气体，$290$ 与 $343\,\mathrm{m/s}$ 的全部差别正在这里。用 $c^2 = p/\rho$——等温值，或是记错的公式——就是牛顿的错误。用气体的压强与密度代入 $c^2 = \gamma p/\rho$ 是对的，而结果只依赖温度。
:::

::: remark 衰减
黏性与热传导阻尼声音。平面波的幅值按 $e^{-\alpha x}$ 衰减，$\alpha = \frac{\omega^2}{2\rho c^3}\bigl[\frac43\eta + \zeta + \kappa_T(\frac1{c_V} - \frac1{c_p})\bigr]$，其中 $\kappa_T$ 是热导率，$c_V$、$c_p$ 是比热（黏性部分由斯托克斯（Stokes）1845 年算出；基尔霍夫（Kirchhoff）1868 年加上传导项）。$\omega^2$ 依赖是高频先衰减殆尽、远处的雷只余隆隆而不脆裂、蝙蝠以超声只能近距捕食的原因。海水中溶解盐的分子弛豫会增加吸收，但低频声仍能在深海声道中传播数千千米。
:::

## 表面重力波 {#gravity-waves}

现在取空气之下深度均匀为 $h$ 的水，未扰自由表面在 $z = 0$，底部在 $z = -h$。声速在这里无关紧要：运动是慢的，水是不可压缩的。波把表面抬升到 $z = \eta(x, t)$，水随之运动。流动由静止开始，由开尔文定理（[[continuum/ideal-flow]]）它是无旋的，$\mathbf v = \nabla\phi$，不可压缩性给出水中 $\nabla^2\phi = 0$。

边界条件才是问题的难点。底部：水不可穿过，$z = -h$ 处 $\partial\phi/\partial z = 0$。自由表面有两条条件，因为表面的位置也是未知量：

- **运动学条件**：表面随水运动，它的竖直速度等于该处流体的竖直速度，$\partial_t\eta + v_x\partial_x\eta = \partial_z\phi$；
- **动力学条件**：表面下紧邻的压强等于大气压（表面张力稍后加入），[[continuum/ideal-flow]] 的非定常伯努利方程给出该处 $\partial_t\phi + \frac12\abs{\nabla\phi}^2 + g\eta = 0$，其中的时间任意函数已用来吸收 $p_{\mathrm{atm}}/\rho$。

振幅 $a$ 远小于波长时线性化：丢掉乘积项 $v_x\partial_x\eta$ 与 $\abs{\nabla\phi}^2$，并把条件施加在 $z = 0$ 而不是 $z = \eta$ 上，两者的差是二阶小量。

::: theorem 重力波的色散关系 {#thm-dispersion}
深度均匀为 $h$ 的水上存在线性波 $\eta = a\cos(kx - \omega t)$，当且仅当

$$
\omega^2 = gk\tanh(kh) .
$$ {#eq-dispersion}

速度势为

$$
\phi = \frac{a\omega}{k}\,\frac{\cosh k(z + h)}{\sinh kh}\,\sin(kx - \omega t) .
$$ {#eq-phi-wave}
:::

::: proof
设 $\phi = f(z)\sin(kx - \omega t)$。拉普拉斯方程给出 $f'' - k^2f = 0$，故 $f$ 是 $\cosh k(z + h)$ 与 $\sinh k(z + h)$ 的组合。底部条件 $f'(-h) = 0$ 消去 $\sinh$，于是 $f = A\cosh k(z + h)$。

$z = 0$ 处线性化的运动学条件 $\partial_t\eta = \partial_z\phi$ 化为

$$
a\omega\sin(kx - \omega t) = Ak\sinh(kh)\,\sin(kx - \omega t),
$$

所以 $A = a\omega/k\sinh kh$，即 [[#eq-phi-wave]]。$z = 0$ 处线性化的动力学条件 $\partial_t\phi + g\eta = 0$ 化为

$$
-\omega A\cosh(kh)\cos(kx - \omega t) + ga\cos(kx - \omega t) = 0 .
$$

代入 $A$：$-\omega^2a\cosh kh/(k\sinh kh) + ga = 0$，也就是 $\omega^2 = gk\tanh kh$。反之，只要 [[#eq-dispersion]] 成立，[[#eq-phi-wave]] 就满足拉普拉斯方程与全部三条边界条件。
:::

于是波速依赖波长：水波是**色散**的。相速度 $c = \omega/k$ 为

$$
c = \sqrt{\frac{g}{k}\tanh kh} .
$$ {#eq-phase-speed}

### 深水与浅水

$\tanh kh$ 在 $kh \gg 1$ 时趋于 $1$，在 $kh \ll 1$ 时趋于 $kh$，这两个极限就是海洋波浪的两副面孔。

::: corollary 深水与浅水极限 {#cor-limits}
在**深水**，$h \gg \lambda$（实际上 $h > \lambda/2$，此时 $\tanh kh > 0.996$），

$$
\omega^2 = gk, \qquad c = \sqrt{\frac{g}{k}} = \frac{gT}{2\pi}, \qquad \lambda = \frac{gT^2}{2\pi},
$$

水深无关紧要。在**浅水**，$h \ll \lambda$（实际上 $h < \lambda/20$），

$$
c = \sqrt{gh},
$$ {#eq-shallow}

与波长无关：浅水波是非色散的。
:::

::: proof
$kh \to\infty$ 时，[[#eq-dispersion]] 中 $\tanh kh \to 1$。结合 $k = 2\pi/\lambda$ 与 $\omega = 2\pi/T$，得 $c = \omega/k = g/\omega = gT/2\pi$，$\lambda = cT = gT^2/2\pi$。$h = \lambda/2$ 时 $kh = \pi$，$\tanh\pi = 0.9963$。$kh \to 0$ 时 $\tanh kh = kh - (kh)^3/3 + \dots$，故 $\omega^2 \approx gk^2h$，$c = \sqrt{gh}$；$h = \lambda/20$ 时 $kh = 0.314$，$\sqrt{\tanh(kh)/kh} = 0.984$，误差在 $2\,\%$ 以内。
:::

深水中质点沿圆运动，圆半径按 $ae^{kz}$ 随深度衰减（[[#exr-orbits]]）：下潜半个波长，运动只剩表面的 $e^{-\pi} = 4\,\%$，这就是潜艇在不太深的深度感觉不到风暴的原因。浅水中轨道压扁成椭圆，水平运动从顶到底几乎均匀。

::: example 涌浪与海啸 {#ex-tsunami}
(a) 海洋涌浪周期 $10.0\,\mathrm s$。求深水中它的波长与速度。(b) 一次海啸周期 $20$ 分钟，经过深 $4000\,\mathrm m$ 的海洋。证明它是浅水波，并求其速度。横穿 $10\,000\,\mathrm{km}$ 需要多久？
::: solution
(a) 由 [[#cor-limits]]，$\lambda = gT^2/2\pi = 9.80\times100/2\pi = 156\,\mathrm m$，$c = gT/2\pi = 15.6\,\mathrm{m/s}$。海洋深达数千米，故 $h \gg \lambda/2$，深水公式在线性理论的精度内是精确的。

(b) 先假设浅水，事后再校核。由 [[#eq-shallow]]，

$$
c = \sqrt{9.80\times4000} = 198\,\mathrm{m/s} = 713\,\mathrm{km/h}.
$$

波长为 $cT = 198\times1200 = 2.4\times10^{5}\,\mathrm m = 240\,\mathrm{km}$，是水深的六十倍，故 $h < \lambda/20$，假设合理。横穿 $10\,000\,\mathrm{km}$ 需要 $10^7/198 = 5.05\times10^{4}\,\mathrm s = 14.0\,\mathrm h$，1960 年智利海啸到达夏威夷大约就用了这么久，太平洋警报中心因此能提前数小时报警。当波到达水深 $10\,\mathrm m$ 的海岸时减速到 $\sqrt{gh} = 9.9\,\mathrm{m/s}$；能量通量守恒并以接近此速的速度携带，于是单位面积的能量——正比于 $a^2$——上升，幅值按 $h^{-1/4}$（格林定律）增大，增大 $(4000/10)^{1/4} = 4.5$ 倍。进一步的变浅、海湾的聚焦与爬高造成其余的破坏。
:::
:::

::: widget plot
f: sqrt(tanh(x)/x); 0.5*sqrt(tanh(x)/x)*(1 + 2*x/sinh(2*x))
x: 0.02, 8
y: 0, 1.05
labels: 相速度 / sqrt(gh); 群速度 / sqrt(gh)
caption: [[#eq-dispersion]] 给出的重力波相速度 $c$ 与群速度 $c_g$，以浅水速度 $\sqrt{gh}$ 为单位，横轴为 $kh = 2\pi h/\lambda$。$kh$ 小时（长波、浅水）两条曲线都从 $1$ 出发：所有波一起以 $\sqrt{gh}$ 行进。$kh$ 增大时二者分离。到 $kh = \pi$（水深为半波长）相速度已走上深水律 $1/\sqrt{kh}$，群速度则几乎恰好定在它的一半——可在 $kh = 4$ 处读出这两个值。纯重力波的群速度从不超过相速度。
:::

::: remark 假潮与潮汐
浅水波在封闭盆地中来回反射，形成称为**假潮**的驻波。长 $L$、深 $h$、两端封闭的盆地，其基模的表面运动节点在中央，波长为 $2L$，故周期为

$$
T = \frac{2L}{\sqrt{gh}}
$$

（梅里安（Merian）1828 年得到的公式）。日内瓦湖 $L \approx 70\,\mathrm{km}$、平均深度约 $150\,\mathrm m$，算出约一小时；福雷尔（Forel）十九世纪末在那里首次对假潮作系统研究，测得 $73$ 分钟，差异来自湖形的不规则。海洋潮汐也是浅水波：其波长与大洋盆地的尺度相当，是深度的数千倍。一端通海的海湾在 $T = 4L/\sqrt{gh}$ 共振，当它接近 $12.4$ 小时的月球潮周期时潮差被放大，芬迪湾与缅因湾即如此，潮差超过 $15\,\mathrm m$。
:::
## 毛细波 {#capillary}

在短尺度上，水-气界面的表面张力 $\sigma$ 增加一份恢复力。具有曲率 $\partial_x^2\eta$ 的曲面两侧压强跳跃为 $-\sigma\,\partial_x^2\eta$（杨-拉普拉斯定律：波峰之下表面向上凸，其下的水压强较高）。动力学边界条件化为 $\partial_t\phi + g\eta - (\sigma/\rho)\partial_x^2\eta = 0$，把 [[#thm-dispersion]] 的证明以 $g + \sigma k^2/\rho$ 代替 $g$ 再走一遍，得

$$
\omega^2 = \Bigl(gk + \frac{\sigma k^3}{\rho}\Bigr)\tanh kh .
$$ {#eq-capillary}

深水中 $c^2 = g/k + \sigma k/\rho$。长波长重力主导，短波长表面张力主导；分界在 $k = \sqrt{\rho g/\sigma}$，即**毛细长度**的倒数。$20\,^\circ\mathrm C$ 的洁净水 $\sigma = 0.0728\,\mathrm{N/m}$，毛细长度为 $\sqrt{\sigma/\rho g} = 2.7\,\mathrm{mm}$。

::: proposition 最小相速度 {#prop-cmin}
深水中，毛细-重力波的相速度有一个最小值

$$
c_{\min} = \Bigl(\frac{4g\sigma}{\rho}\Bigr)^{1/4} \quad\text{在}\quad k_m = \sqrt{\frac{\rho g}{\sigma}}, \qquad \lambda_m = 2\pi\sqrt{\frac{\sigma}{\rho g}} .
$$

在此波长处群速度等于相速度。
:::

::: proof
$c^2(k) = g/k + \sigma k/\rho$ 是 $k$ 的一个减函数与一个增函数之和。其导数 $-g/k^2 + \sigma/\rho$ 在 $k_m^2 = \rho g/\sigma$ 处为零，二阶导数 $2g/k^3 > 0$，故这是最小值，且 $c^2_{\min} = g/k_m + \sigma k_m/\rho = 2\sqrt{g\sigma/\rho}$。至于群速度，$c_g = \dd\omega/\dd k = \dd(kc)/\dd k = c + k\,\dd c/\dd k$，而最小值处 $\dd c/\dd k = 0$。
:::

对水，$\lambda_m = 2\pi\times2.73\,\mathrm{mm} = 1.71\,\mathrm{cm}$，$c_{\min} = (4\times9.80\times0.0728/998)^{1/4} = 0.231\,\mathrm{m/s}$。深水洁净水面上没有波能慢于 $23\,\mathrm{cm/s}$。一根以低于此速插入溪流的棍子发不出波；超过此速，棍子向上游抛出一圈圈短毛细波纹，向下游抛出长重力波。短于约 $4\,\mathrm{mm}$ 的波纹是真正的毛细波，它们会被黏性在几厘米内阻尼掉。

::: widget plot
f: sqrt(9.8*x/(2*pi*100) + 2*pi*s*100/(998*x))
x: 0.2, 10
y: 0, 0.6
sliders: s=0.0728:0.02:0.08:0.001
caption: 深水中毛细-重力波的相速度，单位 m/s，横轴为波长，单位厘米，表面张力 $\sigma = s$（单位 N/m）。洁净水（$0.0728$）的最小值为 $0.231\,\mathrm{m/s}$，在 $1.71\,\mathrm{cm}$ 处。最小值左边表面张力主导，波纹越短越快；右边重力主导，波长越长越快。把 $s$ 拖向 $0.025$——肥皂水的大致数值：最小值移向更短的波长与更慢的速度，因为 $\lambda_m \propto \sqrt\sigma$、$c_{\min} \propto \sigma^{1/4}$。海面上的油会阻尼毛细波纹，这就是水手“往汹涌的水面倒油”的古法。
:::

::: example 风吹起的涟漪 {#ex-ripples}
一阵风在深水池塘上分别激起波长 $5.00\,\mathrm{cm}$ 与 $5.00\,\mathrm{mm}$ 的涟漪。用 [[#eq-capillary]] 取 $\sigma = 0.0728\,\mathrm{N/m}$，分别求它们的相速度与群速度。
::: solution
深水中 $\omega^2 = gk + \sigma k^3/\rho$。求导，$2\omega\,\dd\omega/\dd k = g + 3\sigma k^2/\rho$，故

$$
c = \frac{\omega}{k}, \qquad c_g = \frac{g + 3\sigma k^2/\rho}{2\omega} .
$$

$\lambda = 5.00\,\mathrm{cm}$：$k = 125.7\,\mathrm{m^{-1}}$，$\omega^2 = 9.80\times125.7 + 0.0728\times125.7^3/998 = 1231.5 + 144.8 = 1376$，$\omega = 37.1\,\mathrm{s^{-1}}$。于是 $c = 0.295\,\mathrm{m/s}$，$c_g = (9.80 + 3.46)/74.2 = 0.179\,\mathrm{m/s}$。重力主导，$c_g/c = 0.61$，略高于纯重力的 $\frac12$；若无表面张力，相速度将是 $0.279\,\mathrm{m/s}$。

$\lambda = 5.00\,\mathrm{mm}$：$k = 1257\,\mathrm{m^{-1}}$，$\omega^2 = 12\,315 + 144\,800 = 1.571\times10^{5}$，$\omega = 396\,\mathrm{s^{-1}}$。于是 $c = 0.315\,\mathrm{m/s}$，$c_g = (9.80 + 346)/793 = 0.448\,\mathrm{m/s}$，故 $c_g/c = 1.42$，趋近纯毛细的 $\frac32$。两种涟漪都比 $c_{\min}$ 快，但它们的波群表现相反：长涟漪的波峰在波群中向前奔逸，短涟漪的则向后退。
:::
:::

## 群速度 {#group}

单一频率的正弦波充满全空间，携带不了任何信号。真实的波以波群到来，而在色散介质中波群与其波峰的运行速度不同。

::: theorem 群速度 {#thm-group}
叠加波数为 $k \pm \Delta k$、频率为 $\omega(k \pm \Delta k)$ 的两个等幅波。结果是载波以相速度 $\omega/k$ 行进，并被一个包络调制；到 $\Delta k$ 的一阶，包络以**群速度**

$$
c_g = \deriv{\omega}{k} .
$$ {#eq-group}

传播。波包的能量以 $c_g$ 行进。
:::

::: proof
记 $\omega_\pm = \omega(k \pm \Delta k) = \omega \pm \omega'(k)\Delta k + O(\Delta k^2)$，

$$
\cos(k_+x - \omega_+t) + \cos(k_-x - \omega_-t) = 2\cos(\Delta k\,x - \Delta\omega\,t)\cos(kx - \bar\omega t),
$$

由和差化积，其中 $\Delta\omega = \frac12(\omega_+ - \omega_-) = \omega'(k)\Delta k + O(\Delta k^3)$，$\bar\omega = \frac12(\omega_+ + \omega_-) = \omega + O(\Delta k^2)$。第二个因子是载波，波峰以 $\bar\omega/k \to \omega/k$ 移动。第一个因子是包络，节点以 $\Delta\omega/\Delta k \to \omega'(k)$ 移动。关于能量的结论，对一般波包可用驻相法或直接计算波的能量通量证明：重力波的平均能量通量除以平均能量密度等于 $\dd\omega/\dd k$（莱特希尔（Lighthill）《流体中的波》（*Waves in Fluids*），§3.6）。
:::

深水重力波 $\omega = \sqrt{gk}$，$c_g = \frac12\sqrt{g/k} = \frac12c$：波群以波峰速度之半前进。从船后看一组波：波峰在群尾出现，在群中向前奔逸，到群首消失。毛细波 $\omega \propto k^{3/2}$，$c_g = \frac32c$：波峰在前端出现并向后退去。这就是池塘里的石子——短波纹的环比它自己的波峰向外长得更快。浅水中 $c_g = c$。一般深度下，对 [[#eq-dispersion]] 求导，

$$
c_g = \frac{c}{2}\Bigl(1 + \frac{2kh}{\sinh2kh}\Bigr),
$$

在两个极限之间插值，本章第一张图即展示这一点。

::: widget plot
f: cos(x - t) + cos(1.2*x - 1.0954*t)
x: 0, 120
y: -2.2, 2.2
sliders: t=0:0:150:0.5
caption: 两列深水波，波数为 $1$ 与 $1.2$，频率服从 $\omega = \sqrt k$（$g = 1$ 的单位制）。慢慢拖动时间 $t$ 并跟踪一个波峰：它以每单位时间约 $1$ 个单位移动，即相速度。再跟踪包络收缩为零的位置，$t = 0$ 时在 $x = 15.7$ 附近：它只以 $\Delta\omega/\Delta k = 0.477$ 移动，接近相速度之半，正如 [[#thm-group]] 对深水所预言。波峰越过波群，在抵达每个节点时熄灭。
:::

### 能量通量与格林定律

波列的能量以 $c_g$ 携带，这使得涌向岸边的波浪的增长成为一行计算，至少浅水如此。

::: proposition 浅水中的能量通量 {#prop-flux}
深度 $h$ 上的浅水波 $\eta = a\cos(kx - \omega t)$，单位表面积的平均能量为 $E = \frac12\rho ga^2$，平均能量通量（单位波峰宽度的功率）为 $F = E\sqrt{gh} = Ec_g$。若水深缓慢变化、没有能量反射，则幅值按 $a\propto h^{-1/4}$ 变化。
:::

::: proof
浅水中表面下的压强是静水压的，故各处过剩压强 $p' = \rho g\eta$，水平速度沿深度均匀。速度 $c = \sqrt{gh}$ 的行波由质量守恒给出 $hu = c\eta$，所以 $u = \eta\sqrt{g/h}$。过剩压强在竖直截面上做功的速率、单位宽度为

$$
\int_{-h}^0p'u\,\dd z = h\,\rho g\eta\cdot\eta\sqrt{\frac gh} = \rho g\sqrt{gh}\,\eta^2 ,
$$

平均为 $\frac12\rho ga^2\sqrt{gh}$。单位面积的平均能量是平均势能 $\frac14\rho ga^2$ 的两倍（动能与势能平均相等，见 [[#exr-orbits]]），即 $\frac12\rho ga^2$。所以 $F = E\sqrt{gh}$。波峰平直的波进入缓慢变浅的水域时，单位宽度的通量不变，故 $a^2\sqrt h$ 不变，$a\propto h^{-1/4}$。
:::

这就是**格林定律**，格林（Green）1838 年对截面缓慢变化的运河中的波发现（那里宽度也进入，给出 $a\propto b^{-1/2}h^{-1/4}$）。它就是 [[#ex-tsunami]] 的海啸用过的 $4.5$ 倍因子。深水中同一原理——通量 $= Ec_g$——以 $c_g = \frac12c$ 成立。

::: example 风暴的特征 {#ex-swell}
$3000\,\mathrm{km}$ 外的一场风暴同时激起一切周期的涌浪。深水中，周期 $15.0\,\mathrm s$ 与 $10.0\,\mathrm s$ 的波各需多久到达？
::: solution
波能量以群速度 $c_g = \frac12c = gT/4\pi$ 传播。$T = 15.0\,\mathrm s$ 时 $c_g = 9.80\times15.0/4\pi = 11.7\,\mathrm{m/s}$，行程 $3.00\times10^6/11.7 = 2.56\times10^5\,\mathrm s = 71\,\mathrm h$。$T = 10.0\,\mathrm s$ 时 $c_g = 7.80\,\mathrm{m/s}$，行程 $107\,\mathrm h$。长周期涌浪先到，比短波早一天半；某处海滩的涌浪周期会在几天内不断减小。把到达频率对时间作图得一条直线，其斜率给出风暴的距离：蒙克（Munk）与其合作者 1963 年正是用这一办法把抵达加利福尼亚的涌浪回溯到南极附近南大洋中的风暴——远在 $10\,000\,\mathrm{km}$ 之外。若改用相速度，每个到达时间都会短一半，而且错误。
:::
:::

::: quiz
一艘船以恒定速度横穿深水。它的尾波形成一个半顶角约 $19.5^\circ$ 的 V 形，鸭子与超级油轮的角度相同。深水的哪个性质是原因？
- [ ] 它们的速度与波长无关。
- [x] 它们的群速度是相速度的一半。
- [ ] 它们的速度是 $\sqrt{gh}$。
- [ ] 表面张力。
::: solution
要与船保持相对静止的波，沿其传播方向 $\theta$ 的相速度必须是 $U\cos\theta$。但其能量以该速度的一半移动，而更早时刻发出的所有波的包络落在半顶角 $\arcsin\frac13 = 19.47^\circ$ 的锥内，与 $U$ 无关。开尔文（Kelvin）1887 年导出了这一结果。浅水中 $c_g = c$，角度依赖速度，且一旦 $U > \sqrt{gh}$ 整个图样彻底改变。
:::
:::

::: application 变浅与折射
浅水中 $c = \sqrt{gh}$，波峰下处于较深水处的部分走得较快。因此斜冲海滩的波峰会转而几乎与岸平行，正如光进入玻璃时向法线弯折；把光速换成 $c$，斯涅尔（Snell）定律仍然成立。海底海脊上方波峰汇聚、波浪长大，这就是一些冲浪海滩的浪既大又稳的原因。当水浅到波峰下的质点速度接近波峰速度时，波面变陡并破碎，大致在波高达到 $0.8h$ 时。同一组线性方程（$c$ 缓慢变化）支配着海啸传播模型与海港防波堤的设计。
:::

::: history 从牛顿到开尔文
牛顿（Newton, Isaac）在《自然哲学的数学原理》（*Principia*，1687）中给出了第一个声速理论，得到的是等温值；拉普拉斯（Laplace, Pierre-Simon）1816 年指出压缩是绝热的，修正了这一结果。水波理论始于拉普拉斯（1776）与拉格朗日（Lagrange, Joseph-Louis）（1781），后者得到了浅水速度 $\sqrt{gh}$；柯西（Cauchy, Augustin-Louis）因初始扰动产生的波获巴黎科学院 1816 年奖，同年代泊松（Poisson, Siméon Denis）在一篇论文中也解决了这一问题。艾里（Airy, George Biddell）在他 1841 年的百科论文《潮波论》（*Tides and Waves*）中给出了色散关系 $\omega^2 = gk\tanh kh$。斯托克斯（Stokes, George Gabriel）1847 年处理了有限振幅波，又在 1876 年解释了为什么波群以其波峰速度之半行进；雷诺（Reynolds, Osborne）1877 年把群速度与能量输运联系起来；汤姆孙（Thomson, William，即后来的开尔文勋爵）1871 与 1887 年算出了船波图样与毛细波的最小速度。
:::

## 后续内容 {#leads}

流体中的声音是 [[condensed-matter]] 中纵向声子的长波极限；振幅很大时波面变陡成为激波，这是可压缩气体动力学的主题（机械工程图谱的[可压缩流动](/learn/mechanical/lesson.php?c=fluid-mechanics&l=compressible-flow)一课）。群速度在波包的量子力学中重现：德布罗意（de Broglie）波的群速度 $\dd E/\dd p$ 就是粒子的速度（[[quantum-1]]）；在 [[optics]] 中，脉冲在色散玻璃中以群速度行进。本章的波都是线性的；有限振幅下，色散与非线性的平衡产生孤立波——罗素（Russell）1834 年在联合运河上首先观察到它，它服从科特韦格-德弗里斯（Korteweg–de Vries）方程，是可积系统的奠基例子之一——分析力学中 [[analytical-mechanics/chaos|混沌系统]] 的有序对应物。数值波浪模型是 [[computation]] 的问题之一。

::: summary
- 把连续性方程与欧拉方程在静止态附近线性化，得到 $c^2 = (\partial p/\partial\rho)_s = K_s/\rho$ 的波方程；声音是无旋的，且 $v = p'/\rho c$。
- 理想气体中 $c = \sqrt{\gamma RT/M}$，$20\,^\circ\mathrm C$ 的空气里为 $343\,\mathrm{m/s}$；牛顿的等温值低了 $\sqrt\gamma$ 倍。水中 $c \approx 1480\,\mathrm{m/s}$。
- 深度 $h$ 的水面上的线性波满足 $\omega^2 = gk\tanh kh$，由拉普拉斯方程加自由表面的运动学与动力学条件导出。
- 深水：$c = \sqrt{g/k} = gT/2\pi$，$c_g = c/2$，运动按 $e^{kz}$ 衰减。浅水：$c = c_g = \sqrt{gh}$，$4\,\mathrm{km}$ 深海上的海啸约 $200\,\mathrm{m/s}$。
- 表面张力给 $\omega^2$ 加上 $\sigma k^3/\rho$；洁净水面上相速度的最小值 $0.23\,\mathrm{m/s}$ 在 $\lambda = 1.7\,\mathrm{cm}$ 处。
- 波群与能量以 $c_g = \dd\omega/\dd k$ 传播，而非以相速度；涌浪的色散使它成为远方风暴的时钟。
:::

## 习题

::: exercise 氦中的声速 {level=1 check="sqrt(5/3*8.314*293.15/0.004003)"}
求 $20\,^\circ\mathrm C$ 氦气（$\gamma = 5/3$，$M = 4.003\,\mathrm{g/mol}$）中的声速，单位 m/s。
::: solution
由 [[#eq-cgas]]，$c = \sqrt{(5/3)\times8.314\times293.15/0.004003} = \sqrt{1.015\times10^6} = 1007\,\mathrm{m/s}$，几乎是空气中声速的三倍。声道的共振频率随 $c$ 缩放，这就是氦气会抬高共振峰音高（音色）——尽管声带本身的振动频率不变——的原因。
:::
:::

::: exercise 海啸的跨洋时间 {level=1 check="sqrt(9.8*4000)"}
求深 $4000\,\mathrm m$ 大洋上的浅水波速度，单位 m/s，以及行进 $1600\,\mathrm{km}$——如 2004 年从苏门答腊到斯里兰卡——所需的时间。
::: solution
$c = \sqrt{gh} = \sqrt{9.80\times4000} = 198\,\mathrm{m/s}$，$1.6\times10^6/198 = 8.1\times10^3\,\mathrm s = 2.2\,\mathrm h$。实测到达约在地震后两小时，因为路径中较浅的大陆架部分更慢。
:::
:::

::: exercise 8 秒波的波长 {level=1 check="9.8*64/(2*pi)"}
周期 $8.00\,\mathrm s$ 的波在深水中传播。求其波长（米）以及相速度与群速度。
::: solution
由 [[#cor-limits]]，$\lambda = gT^2/2\pi = 9.80\times64.0/2\pi = 99.8\,\mathrm m$，$c = gT/2\pi = 12.5\,\mathrm{m/s}$，$c_g = 6.24\,\mathrm{m/s}$。凡水深超过约 $50\,\mathrm m$，深水公式即适用。
:::
:::

::: exercise 由压缩率求声速 {level=2 check="1/sqrt(998*4.6e-10)"}
$20\,^\circ\mathrm C$ 水的绝热压缩率 $\kappa_s = -\frac1V(\partial V/\partial p)_s = 4.6\times10^{-10}\,\mathrm{Pa^{-1}}$，密度 $998\,\mathrm{kg/m^3}$。求声速，单位 m/s。
::: solution
压缩率是体积模量的倒数，故 $c = \sqrt{K_s/\rho} = 1/\sqrt{\rho\kappa_s} = 1/\sqrt{998\times4.6\times10^{-10}} = 1476\,\mathrm{m/s}$，与实测的 $1482\,\mathrm{m/s}$ 相差在 $0.5\,\%$ 以内——差距来自 $\kappa_s$ 的两位有效数字。
:::
:::

::: exercise 涌浪的到来 {level=2 check="3e6/(9.8*15/(4*pi))/3600"}
对 [[#ex-swell]] 中的风暴，计算 $15.0\,\mathrm s$ 涌浪的行程（小时），以及它与 $10.0\,\mathrm s$ 涌浪到达的时间间隔。
::: solution
$T = 15.0\,\mathrm s$ 时 $c_g = gT/4\pi = 11.70\,\mathrm{m/s}$，故行程 $3.00\times10^6/11.70 = 2.564\times10^5\,\mathrm s = 71.2\,\mathrm h$。$T = 10.0\,\mathrm s$ 时 $c_g = 7.80\,\mathrm{m/s}$，行程 $106.9\,\mathrm h$。间隔 $35.6\,\mathrm h$。因为 $t = 4\pi d/gT$，到达频率 $1/T = gt/4\pi d$ 随时间线性增长，斜率为 $g/4\pi d$；测出这斜率便得到距离 $d$。
:::
:::

::: exercise 最慢的波纹 {level=2 check="(4*9.8*0.0728/998)^(1/4)"}
用 [[#prop-cmin]]，取 $\sigma = 0.0728\,\mathrm{N/m}$、$\rho = 998\,\mathrm{kg/m^3}$，求深水洁净水面上波的最小相速度（m/s）与相应波长。
::: solution
$c_{\min} = (4g\sigma/\rho)^{1/4} = (4\times9.80\times0.0728/998)^{1/4} = (2.86\times10^{-3})^{1/4} = 0.231\,\mathrm{m/s}$。波长为 $\lambda_m = 2\pi\sqrt{\sigma/\rho g} = 2\pi\times2.73\times10^{-3} = 1.71\,\mathrm{cm}$。比 $0.23\,\mathrm{m/s}$ 慢地在池塘上滑行的昆虫不辐射波，因而感觉不到波浪阻力；水黾大多走得更快，靠蹬踏自己激起的波纹与涡旋前进。
:::
:::

::: exercise 中等水深的波 {level=2 check="92.32"}
周期 $10.0\,\mathrm s$ 的波进入深 $10.0\,\mathrm m$ 的水。数值求解 [[#eq-dispersion]] 得波长（米），并与深水、浅水两个近似比较。
::: hint
迭代 $k \leftarrow \omega^2/(g\tanh kh)$，从浅水值 $k = \omega/\sqrt{gh}$ 出发。
:::
::: solution
$\omega = 2\pi/10.0 = 0.6283\,\mathrm{s^{-1}}$。从 $k_0 = \omega/\sqrt{gh} = 0.0635\,\mathrm{m^{-1}}$ 出发，迭代 $k \leftarrow \omega^2/(g\tanh kh)$ 收敛到 $k = 0.06806\,\mathrm{m^{-1}}$，故 $\lambda = 2\pi/k = 92.3\,\mathrm m$，$c = 9.23\,\mathrm{m/s}$。此时 $kh = 0.68$：两个极限都不适用。浅水公式给出 $\lambda = \sqrt{gh}\,T = 99.0\,\mathrm m$，偏长 $7\,\%$；深水公式给出 $156\,\mathrm m$，错得离谱。群速度为 $\frac{c}{2}(1 + 2kh/\sinh2kh) = 8.06\,\mathrm{m/s}$，是 $c$ 的 $87\,\%$。
:::
:::

::: exercise 海港假潮 {level=2 check="2*2000/sqrt(9.8*5)"}
一个长 $2.00\,\mathrm{km}$、深 $5.00\,\mathrm m$ 的矩形海港盆地两端封闭。求其基模假潮的周期（秒），并校核浅水近似适用。
::: solution
基模波长 $2L = 4.00\,\mathrm{km}$，浅水速度 $\sqrt{9.80\times5.00} = 7.00\,\mathrm{m/s}$。故 $T = 2L/\sqrt{gh} = 4000/7.00 = 571\,\mathrm s$，约 $9.5$ 分钟。比值 $h/\lambda = 5/4000$ 远低于 $\frac1{20}$，浅水公式极佳。停泊在这种港口里的船，会被周期恰好匹配的涌浪群或大气压跃变激起纵摇——这是港口设计中公认的危险。
:::
:::

::: exercise 深水中的质点轨道 {level=3 #exr-orbits}
深水中势 [[#eq-phi-wave]] 化为 $\phi = (a\omega/k)e^{kz}\sin(kx - \omega t)$。(a) 证明到 $a$ 的一阶，平均位置在 $(x_0, z_0)$ 的流体质点沿半径 $ae^{kz_0}$ 的圆运动，波沿 $+x$ 传播时为顺时针。(b) 证明单位表面积的平均动能 $\frac12\rho\int_{-\infty}^0\overline{v^2}\,\dd z$ 等于 $\frac14\rho ga^2$，而它也是单位面积的平均势能 $\frac12\rho g\overline{\eta^2}$。
::: solution
(a) 速度为 $v_x = \partial_x\phi = a\omega e^{kz}\cos(kx - \omega t)$，$v_z = \partial_z\phi = a\omega e^{kz}\sin(kx - \omega t)$。到一阶，在平均位置处取值并对时间积分：

$$
x - x_0 = -ae^{kz_0}\sin(kx_0 - \omega t), \qquad z - z_0 = ae^{kz_0}\cos(kx_0 - \omega t) .
$$

于是 $(x - x_0)^2 + (z - z_0)^2 = a^2e^{2kz_0}$：半径 $ae^{kz_0}$ 的圆。在波峰处（$kx_0 - \omega t = 0$）质点位于轨道顶端并向前运动（$v_x > 0$）；四分之一个周期后它位于最前处并向下运动。顶端向前、前侧向下：以 $x$ 向右、$z$ 向上看是顺时针。

(b) $v^2 = a^2\omega^2e^{2kz}$ 在此阶下精确成立，故

$$
\frac12\rho\int_{-\infty}^0a^2\omega^2e^{2kz}\,\dd z = \frac12\rho a^2\omega^2\cdot\frac{1}{2k} = \frac{\rho a^2\omega^2}{4k} = \frac14\rho ga^2 ,
$$

用了 $\omega^2 = gk$。相对平坦表面的单位面积势能为 $\int_0^\eta\rho gz\,\dd z = \frac12\rho g\eta^2$，平均为 $\frac12\rho g\cdot\frac12a^2 = \frac14\rho ga^2$。动能与势能平均相等，总平均能量为每单位面积 $\frac12\rho ga^2$——对波幅 $1\,\mathrm m$ 这种温和的涌浪约 $5\,\mathrm{kJ/m^2}$。
:::
:::

::: exercise 有限水深的群速度 {level=3}
由 [[#eq-dispersion]] 证明 $c_g = \frac{c}{2}\bigl(1 + \frac{2kh}{\sinh2kh}\bigr)$，并由此推出任意深度重力波都满足 $\frac12c \le c_g \le c$，两个极限在深水与浅水达到。
::: solution
写 $\omega^2 = gk\tanh kh$ 并对 $k$ 求导：

$$
2\omega\deriv{\omega}{k} = g\tanh kh + gkh\,\mathrm{sech}^2kh .
$$

除以 $2\omega$ 并用 $g\tanh kh = \omega^2/k$：

$$
c_g = \frac{\omega}{2k} + \frac{gkh}{2\omega\cosh^2kh} = \frac{c}{2}\Bigl(1 + \frac{gk^2h}{\omega^2\cosh^2kh}\Bigr) = \frac c2\Bigl(1 + \frac{kh}{\tanh kh\cosh^2kh}\Bigr) .
$$

因为 $\tanh kh\cosh^2kh = \sinh kh\cosh kh = \frac12\sinh2kh$，这就是题述公式。令 $u = 2kh > 0$。函数 $u/\sinh u$ 从 $1$（$u \to 0$）严格减小到 $0$（$u \to\infty$），因为 $\sinh u > u$ 且 $\dd(u/\sinh u)/\dd u = (\sinh u - u\cosh u)/\sinh^2u < 0$（由于 $\tanh u < u$）。于是 $1 < 1 + u/\sinh u < 2$，故对每个有限的非零水深 $\frac12c < c_g < c$，浅水中 $c_g \to c$，深水中 $c_g \to\frac12c$。
:::
:::
