两个物体沿它们的连线相互吸引，力的大小只依赖两者之间的距离。太阳与一颗行星、地球与月球、玻尔模型中的质子与电子、α粒子与金原子核：它们全都是这同一个问题。它有六个自由度，然而对任何心力定律，它都能靠手算完全解出。原因在于：它的对称性提供了足够多的守恒量，把问题化为一个一维运动，而能量守恒随后就把它积出来。

本章用 [[analytical-mechanics/lagrangian]] 的工具完成这一约化。平移不变性把质心分离出去。旋转不变性把运动禁锢在一个平面内并使角动量守恒，从而把角运动变成半径的已知函数。剩下的就是一个粒子在一维**有效势能**中运动。对于平方反比力，我们随后把开普勒（Kepler）三定律推导成定理而非观测，并且看清平方反比为什么特殊：在幂律之中，只有它和胡克定律使每条有界轨道都自我闭合。

[[mechanics/gravitation]] 中的引力事实视为已知，极坐标的运动学也是。势能记作 $U(r)$，于是物体 1 作用于物体 2 的力为 $\mathbf{F} = -U'(r)\,\hat{\mathbf{r}}$，其中 $\mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1$。全文取 $G = 6.67430\times 10^{-11}\,\mathrm{N\,m^2/kg^2}$，对地球取 $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$。

## 约化为单体问题 {#reduction}

设两物体质量为 $m_1$ 与 $m_2$，位置为 $\mathbf{r}_1$ 与 $\mathbf{r}_2$，通过势能 $U(\abs{\mathbf{r}_2 - \mathbf{r}_1})$ 相互作用，不受外力。引入质心与相对位置，

$$
\mathbf{R} = \frac{m_1\mathbf{r}_1 + m_2\mathbf{r}_2}{m_1 + m_2}, \qquad \mathbf{r} = \mathbf{r}_2 - \mathbf{r}_1.
$$

解出 $\mathbf{r}_1 = \mathbf{R} - (m_2/M)\mathbf{r}$、$\mathbf{r}_2 = \mathbf{R} + (m_1/M)\mathbf{r}$，其中 $M = m_1 + m_2$。

::: definition 约化质量 {#def-reduced-mass}
质量 $m_1$ 与 $m_2$ 的两个物体的**约化质量**是

$$
\mu = \frac{m_1 m_2}{m_1 + m_2}, \qquad\text{等价地}\qquad \frac{1}{\mu} = \frac{1}{m_1} + \frac{1}{m_2}.
$$
:::

约化质量比两个质量都小。当一个物体重得多时，$\mu$ 接近较轻的那个质量：氢原子的 $\mu$ 是电子质量的 $0.99946$ 倍。

::: proposition 二体拉格朗日量的分离 {#prop-separation}
用 $\mathbf{R}$ 与 $\mathbf{r}$ 表示，两物体的拉格朗日量为

$$
L = \tfrac12 M\dot{\mathbf{R}}^2 + \tfrac12\mu\dot{\mathbf{r}}^2 - U(r).
$$ {#eq-two-body}

质心作匀速运动，相对坐标则像一个质量为 $\mu$ 的粒子在固定势 $U(r)$ 中运动。
:::

::: proof
把 $\dot{\mathbf{r}}_1$ 与 $\dot{\mathbf{r}}_2$ 的表达式代入动能：

$$
\tfrac12 m_1\Bigl(\dot{\mathbf{R}} - \tfrac{m_2}{M}\dot{\mathbf{r}}\Bigr)^2 + \tfrac12 m_2\Bigl(\dot{\mathbf{R}} + \tfrac{m_1}{M}\dot{\mathbf{r}}\Bigr)^2
= \tfrac12 M\dot{\mathbf{R}}^2 + \bigl(-m_1m_2 + m_2m_1\bigr)\frac{\dot{\mathbf{R}}\cdot\dot{\mathbf{r}}}{M} + \tfrac12\frac{m_1m_2^2 + m_2m_1^2}{M^2}\dot{\mathbf{r}}^2.
$$

交叉项消失，最后一个系数是 $m_1m_2(m_1 + m_2)/M^2 = \mu$。势只依赖 $r = \abs{\mathbf{r}}$。坐标 $\mathbf{R}$ 是循环的，所以 $M\dot{\mathbf{R}}$ 守恒；而 $\mathbf{r}$ 的拉格朗日方程正是质量为 $\mu$、势能为 $U(r)$ 的粒子的方程。
:::

在质心系中 $\dot{\mathbf{R}} = 0$，两个物体绕质心沿相似轨道运动，各按比例 $m_2/M$ 与 $m_1/M$ 缩放，并且分居两侧。下文算出的"月球的轨道"是 $\mathbf{r}$ 的轨道，即月球相对地球的位置。

::: example 地月系统的质心 {#ex-barycentre}
地球与月球的质量分别为 $5.972\times 10^{24}\,\mathrm{kg}$ 与 $7.342\times 10^{22}\,\mathrm{kg}$，平均距离为 $3.844\times 10^{8}\,\mathrm{m}$。求以月球质量的分数量计的约化质量，以及质心到地心的距离。
::: solution
约化质量是

$$
\mu = \frac{(5.972\times 10^{24})(7.342\times 10^{22})}{5.972\times 10^{24} + 7.342\times 10^{22}} = 7.253\times 10^{22}\,\mathrm{kg},
$$

是月球质量的 $0.988$ 倍。把地球当作固定，会给相对运动的惯性带来 $1.2\%$ 的误差——对天文学来说太大，作为初步估计尚可。

质心在两球心的连线上，距地心 $r\,m_2/M$：

$$
\frac{(3.844\times 10^{8})(7.342\times 10^{22})}{6.045\times 10^{24}} = 4.67\times 10^{6}\,\mathrm{m}.
$$

约 $4670\,\mathrm{km}$，在地球内部——地球半径是 $6371\,\mathrm{km}$。地心每月绕这一点晃动一圈，这就是为什么在精密的太阳系计算中，地球的位置要修正几千千米。
:::
:::

## 角动量与有效势能 {#effective}

从现在起，我们研究质量 $\mu$ 的单粒子在势 $U(r)$ 中的运动，位置记作 $\mathbf{r}$。

角动量 $\boldsymbol{\ell} = \mathbf{r}\times\mu\dot{\mathbf{r}}$ 守恒：这可以由 [[analytical-mechanics/lagrangian#thm-noether]] 的转动情形得到，也可以直接得到，因为沿 $\mathbf{r}$ 方向的力使力矩 $\mathbf{r}\times\mathbf{F}$ 为零。$\mathbf{r}$ 与 $\dot{\mathbf{r}}$ 都与常向量 $\boldsymbol{\ell}$ 垂直，所以运动停留在过原点、垂直于 $\boldsymbol{\ell}$ 的平面内。（若 $\boldsymbol{\ell} = 0$，运动沿一条过原点的直线。）在该平面内用极坐标 $(r, \theta)$：

$$
L = \tfrac12\mu\bigl(\dot r^2 + r^2\dot\theta^2\bigr) - U(r).
$$ {#eq-polar-lagrangian}

角度 $\theta$ 是循环坐标，所以与它共轭的动量守恒：

$$
\ell = \pdv{L}{\dot\theta} = \mu r^2\dot\theta.
$$ {#eq-ell}

::: theorem 开普勒第二定律 {#thm-areas}
在任意心力之下，位矢扫过面积的速率恒定：

$$
\deriv{A}{t} = \frac{\ell}{2\mu}.
$$
:::

::: proof
在时间 $\dd t$ 内位矢转过 $\dd\theta$，一阶近似下扫过一个面积为 $\frac12 r\cdot r\,\dd\theta$ 的细窄三角形。于是 $\dd A/\dd t = \frac12 r^2\dot\theta = \ell/(2\mu)$，由 [[#eq-ell]] 它是常量。
:::

因此第二定律并非引力独有。它对每种心力都成立，而且对力的定律什么也没说；它就是角动量守恒的几何形式。

由 [[#eq-polar-lagrangian]] 得到的径向拉格朗日方程是 $\mu\ddot r - \mu r\dot\theta^2 + U'(r) = 0$。用 [[#eq-ell]] 消去 $\dot\theta$，

$$
\mu\ddot r = -U'(r) + \frac{\ell^2}{\mu r^3} = -\deriv{}{r}\left(U(r) + \frac{\ell^2}{2\mu r^2}\right).
$$ {#eq-radial}

::: definition 有效势能 {#def-effective}
质量 $\mu$、角动量 $\ell$ 的粒子在中心势 $U(r)$ 中的**有效势能**是

$$
U_{\mathrm{eff}}(r) = U(r) + \frac{\ell^2}{2\mu r^2}.
$$ {#eq-ueff}

径向运动服从 $\mu\ddot r = -U_{\mathrm{eff}}'(r)$，并守恒能量

$$
E = \tfrac12\mu\dot r^2 + U_{\mathrm{eff}}(r).
$$ {#eq-radial-energy}
:::

项 $\ell^2/(2\mu r^2)$ 是角运动的动能 $\frac12\mu r^2\dot\theta^2$ 固定 $\ell$ 后的改写。它充当一个排斥的**离心势垒**：除非 $U$ 在原点附近比 $-1/r^2$ 更具吸引力，它就把 $\ell \ne 0$ 的粒子挡在原点之外。

能量守恒 [[#eq-radial-energy]] 把径向问题变成 [[mechanics/work-energy]] 中遇到过的那类一维问题。粒子只能待在 $U_{\mathrm{eff}}(r) \le E$ 的地方。**折返点**，又称**拱点**，即 $U_{\mathrm{eff}} = E$、$\dot r = 0$ 之处，就是最近距与最远距。若允许区域是区间 $[r_{\min}, r_{\max}]$，轨道是有界的，在转向过程中半径在两端点之间来回振荡；若允许区域伸到无穷，轨道是无界的。**圆轨道**位于 $U_{\mathrm{eff}}$ 的极小或极大处。

::: widget plot
f: -1/x + l^2/(2*x^2); -1/x; l^2/(2*x^2)
x: 0.2, 6
y: -1.5, 1.5
sliders: l=1:0.3:1.5:0.01
labels: U_eff; U = -k/r; 离心势垒
caption: 引力的有效势能，取 $k = \mu = 1$ 的单位，故 $U_{\mathrm{eff}} = -1/r + l^2/(2r^2)$。极小点位于 $r = l^2$，即圆轨道半径，此处 $U_{\mathrm{eff}} = -1/(2l^2)$。在极小值与零之间取一个能量，画一条水平线，读出两个折返点：那便是一条有界椭圆。能量高于零时水平线只与曲线相交一次，那是一条无界的双曲线。增大 $l$，看势垒把势阱向外推、并使它变浅。
:::

::: quiz
势 $U = -k/r$ 中的粒子角动量 $\ell \neq 0$，能量 $E$ 满足 $-\mu k^2/(2\ell^2) < E < 0$。关于它的径向运动，下列哪种说法正确？
- [ ] 它坠入中心，因为力是吸引的且 $E < 0$。
- [x] 它在 $U_{\mathrm{eff}}(r) = E$ 的两个折返点之间振荡，同时 $\theta$ 不断增大。
- [ ] 它沿圆运动，因为 $E < 0$。
- [ ] 它逃向无穷，因为 $E$ 高于 $U_{\mathrm{eff}}$ 的极小值。
::: solution
允许区域是 $U_{\mathrm{eff}}(r) \le E$ 之处。当 $E$ 介于极小值 $-\mu k^2/(2\ell^2)$ 与零之间时，这是一个区间 $[r_{\min}, r_{\max}]$：内侧由离心势垒挡住，外侧因为 $r \to \infty$ 时 $U_{\mathrm{eff}} \to 0 > E$。半径在两个根之间振荡，而 $\dot\theta = \ell/(\mu r^2)$ 从不过零，所以轨道是一条椭圆。圆轨道要求 $E$ 恰在极小值；逃逸要求 $E \ge 0$；到达 $r = 0$ 要求 $\ell = 0$。
:::
:::

### 圆轨道何时稳定？

半径 $r_0$ 的圆轨道满足 $U_{\mathrm{eff}}'(r_0) = 0$。若 $U_{\mathrm{eff}}''(r_0) > 0$，它对小径向扰动是稳定的，此时半径绕 $r_0$ 振荡，角频率 $\omega_r = \sqrt{U_{\mathrm{eff}}''(r_0)/\mu}$。

::: proposition 幂律之下圆轨道的稳定性 {#prop-power-stable}
对大小为 $f(r) = cr^n$（$c > 0$）的吸引幂律力，圆轨道在任何半径都存在，且当且仅当 $n > -3$ 时稳定。
:::

证明见 [[#exr-stable-power]]。对引力，$n = -2$，每条圆轨道都稳定。对吸引的 $1/r^4$ 力，$n = -4$，圆轨道是 $U_{\mathrm{eff}}$ 的极大，轻轻一推就把粒子旋入或旋出。边界情形 $n = -3$ 是 $1/r^2$ 势，它与离心势垒有相同的径向依赖，两者旗鼓相当地竞争。

## 轨道方程 {#orbit}

要求轨道的形状而非 $r(t)$，就用角度取代时间。对平方反比律，有两个替换使方程线性化。

::: theorem 轨道方程 {#thm-binet}
设 $F(r)$ 是中心力的径向分量，$F = -U'(r)$，并令 $u = 1/r$。则当 $\ell \neq 0$ 时，轨道 $u(\theta)$ 满足

$$
\frac{\dd^2 u}{\dd\theta^2} + u = -\frac{\mu}{\ell^2u^2}\,F\!\left(\frac{1}{u}\right).
$$ {#eq-binet}
:::

::: proof
由 [[#eq-ell]]，$\dot\theta = \ell u^2/\mu$，所以沿轨道有 $\dd/\dd t = (\ell u^2/\mu)\,\dd/\dd\theta$。于是

$$
\dot r = \deriv{}{t}\left(\frac1u\right) = -\frac{1}{u^2}\frac{\ell u^2}{\mu}\deriv{u}{\theta} = -\frac{\ell}{\mu}\deriv{u}{\theta}, \qquad \ddot r = \frac{\ell u^2}{\mu}\deriv{}{\theta}\left(-\frac{\ell}{\mu}\deriv{u}{\theta}\right) = -\frac{\ell^2u^2}{\mu^2}\frac{\dd^2u}{\dd\theta^2}.
$$

代入径向方程 $\mu\ddot r - \ell^2/(\mu r^3) = F(r)$：

$$
-\frac{\ell^2u^2}{\mu}\frac{\dd^2u}{\dd\theta^2} - \frac{\ell^2u^3}{\mu} = F\!\left(\frac1u\right).
$$

两边除以 $-\ell^2u^2/\mu$。
:::

轨道方程也可以反着用：给出一条轨道，它告诉你对应的力。牛顿的原初论证正是这一类：从开普勒的椭圆反推出平方反比。

### 开普勒问题

取 $U(r) = -k/r$（$k > 0$），于是 $F = -k/r^2 = -ku^2$。对引力 $k = Gm_1m_2$。[[#eq-binet]] 的右端成为常数 $\mu k/\ell^2$：

$$
\frac{\dd^2u}{\dd\theta^2} + u = \frac{\mu k}{\ell^2}.
$$

这是关于 $\theta$ 的一个受恒定驱动的谐振子方程。它的通解是一个特解加齐次解，$u = \mu k/\ell^2 + C\cos(\theta - \theta_0)$。选取坐标轴使 $\theta_0 = 0$，并写 $C = e\mu k/\ell^2$（$e \ge 0$），得

$$
r(\theta) = \frac{p}{1 + e\cos\theta}, \qquad p = \frac{\ell^2}{\mu k}.
$$ {#eq-conic}

这是以原点为一个焦点的**圆锥曲线**的极坐标方程，**半通径**为 $p$，**偏心率**为 $e$。最近距离即**近心点**（$\theta = 0$ 处，$r_p = p/(1 + e)$），它定义了这条轴。

::: theorem 开普勒轨道 {#thm-kepler}
在势 $U = -k/r$（$k > 0$）中，每条 $\ell \neq 0$ 的轨道都是把一个焦点放在力心处的圆锥曲线 [[#eq-conic]]，其偏心率由能量固定：

$$
e = \sqrt{1 + \frac{2E\ell^2}{\mu k^2}}.
$$ {#eq-ecc}

$e = 0$ 时轨道是圆（$E = -\mu k^2/(2\ell^2)$，即 $U_{\mathrm{eff}}$ 的极小值）；$0 < e < 1$ 时是椭圆（$E < 0$）；$e = 1$ 时是抛物线（$E = 0$）；$e > 1$ 时是双曲线（$E > 0$）。椭圆的半长轴是

$$
a = \frac{p}{1 - e^2} = -\frac{k}{2E}.
$$ {#eq-semi-major}
:::

::: proof
形状 [[#eq-conic]] 已在上面导出。在近心点计算能量 [[#eq-radial-energy]]，该处 $\dot r = 0$、$1/r_p = (1 + e)/p$：

$$
E = \frac{\ell^2(1 + e)^2}{2\mu p^2} - \frac{k(1 + e)}{p} = \frac{k(1 + e)^2}{2p} - \frac{k(1 + e)}{p} = \frac{k(e^2 - 1)}{2p},
$$

用了 $\ell^2/\mu = kp$。解出 $e^2 = 1 + 2Ep/k = 1 + 2E\ell^2/(\mu k^2)$，即 [[#eq-ecc]]。分类由 $E$ 的符号得出。$e < 1$ 时近心距与远心距为 $p/(1 + e)$ 与 $p/(1 - e)$，所以长轴为

$$
2a = \frac{p}{1 + e} + \frac{p}{1 - e} = \frac{2p}{1 - e^2}, \qquad a = \frac{p}{1 - e^2} = \frac{p}{-2Ep/k} = -\frac{k}{2E}.
$$
:::

开普勒第一定律——行星沿椭圆运动，太阳在一个焦点上——就是 $E < 0$ 的情形。半长轴只依赖能量，不依赖角动量：能量相同的一切轨道都有相同的 $a$，无论是圆还是很扁的椭圆。

::: theorem 开普勒第三定律 {#thm-third-law}
势 $-k/r$ 中的椭圆轨道，其周期 $\tau$ 满足

$$
\tau^2 = \frac{4\pi^2\mu}{k}\,a^3.
$$ {#eq-third-law}

引力作用的两体情形 $k = Gm_1m_2$，这就是 $\tau^2 = 4\pi^2a^3/\bigl(G(m_1 + m_2)\bigr)$。
:::

::: proof
由 [[#thm-areas]]，一个周期扫过的面积是 $\tau\ell/(2\mu)$，它等于椭圆的面积 $\pi ab$，其中 $b = a\sqrt{1 - e^2}$ 是半短轴。故 $\tau = 2\pi\mu ab/\ell$。又由 [[#eq-semi-major]]，$b^2 = a^2(1 - e^2) = ap$，且 $\ell^2 = \mu kp$。平方得

$$
\tau^2 = \frac{4\pi^2\mu^2a^2\cdot ap}{\mu kp} = \frac{4\pi^2\mu}{k}a^3.
$$

取 $k = Gm_1m_2$，$\mu/k = 1/\bigl(G(m_1 + m_2)\bigr)$。
:::

开普勒陈述第三定律时，认为那个常数对每颗行星都相同。两体结果说明这个"常数"是 $4\pi^2/(G(M_\odot + m))$，它依赖于行星的质量，只是依赖得极少——对木星是千分之一量级的修正。

::: example 椭圆轨道上的人造卫星 {#ex-satellite}
一颗质量可忽略的人造卫星绕地球运行，近地点与远地点到地心的距离为 $7000\,\mathrm{km}$ 与 $12\,000\,\mathrm{km}$。求半长轴、偏心率、周期，以及近地点与远地点的速率。取 $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$。
::: solution
半长轴是两端距离的平均，偏心率由 $r_p = a(1 - e)$ 与 $r_a = a(1 + e)$ 得出：

$$
a = \frac{r_p + r_a}{2} = 9500\,\mathrm{km}, \qquad e = \frac{r_a - r_p}{r_a + r_p} = \frac{5000}{19\,000} = 0.263.
$$

卫星质量可忽略，$\mu/k = 1/(GM_\oplus)$，由 [[#eq-third-law]] 得

$$
\tau = 2\pi\sqrt{\frac{a^3}{GM_\oplus}} = 2\pi\sqrt{\frac{(9.500\times 10^{6})^3}{3.986\times 10^{14}}} = 9215\,\mathrm{s} = 153.6\,\mathrm{min}.
$$

至于速率，把单位质量的能量 $E = \frac12 v^2 - GM_\oplus/r$ 与由 [[#eq-semi-major]] 得到的 $E = -GM_\oplus/(2a)$ 合并，得**活力公式**（vis-viva）$v^2 = GM_\oplus(2/r - 1/a)$，于是

$$
v_p = \sqrt{3.986\times 10^{14}\left(\frac{2}{7.0\times 10^{6}} - \frac{1}{9.5\times 10^{6}}\right)} = 8481\,\mathrm{m/s}, \qquad v_a = 4947\,\mathrm{m/s}.
$$

用开普勒第二定律核对：在拱点速度垂直于位矢，故 $\ell/\mu = r_pv_p = r_av_a$。确实 $(7.0\times 10^6)(8481) = 5.937\times 10^{10}$，$(1.2\times 10^7)(4947) = 5.937\times 10^{10}\,\mathrm{m^2/s}$，且 $v_p/v_a = r_a/r_p = 12/7$。
:::
:::

::: widget orbit
GM: 1
r: 1
vt: 1.2
caption: 算例中的卫星，采用缩放单位：$GM = 1$，发射半径 $r = 1$ 即近地点，切向速度 $v_t = 1.2$。$r = 1$ 处圆轨道速度为 $1$，逃逸速度为 $\sqrt 2 \approx 1.414$，所以这是一条 $e = v_t^2 - 1 = 0.44$ 的椭圆。看卫星在近地点最快、在远地点最慢，在相等时间内扫过相等的面积。把 $v_t$ 抬过 $1.414$，椭圆打开成双曲线；降到 $1$ 以下，发射点就成为远地点。
:::

::: example 哈雷彗星 {#ex-halley}
哈雷彗星的近日点距离为 $0.586\,\mathrm{AU}$，轨道偏心率 $0.967$。求它的半长轴、远日点距离与周期。利用事实：地球（$a = 1\,\mathrm{AU}$）的周期为一年。
::: solution
由 $r_p = a(1 - e)$，

$$
a = \frac{0.586}{1 - 0.967} = \frac{0.586}{0.033} = 17.8\,\mathrm{AU}, \qquad r_a = a(1 + e) = 34.9\,\mathrm{AU},
$$

越过了约 $30\,\mathrm{AU}$ 处的海王星轨道。因为彗星质量可忽略，[[#eq-third-law]] 对彗星和对地球有同一个常数，所以在年与天文单位下 $\tau^2 = a^3$：

$$
\tau = (17.76)^{3/2}\,\mathrm{yr} = 74.8\,\mathrm{yr}.
$$

观测到的相邻两次过近日点的间隔在约 $74$ 到 $79$ 年之间变动，因为木星与土星在摄动这条轨道。答案对小量 $1 - e = 0.033$ 很敏感：$e$ 差 $0.001$，$a$ 就变 $3\%$，周期变 $4.5\%$。
:::
:::

### 时刻 $t$ 行星在哪里？

圆锥曲线 [[#eq-conic]] 给出轨道的形状，却不给时刻表。开普勒用一个辅助角也解掉了这个问题。对椭圆，按

$$
r = a(1 - e\cos\psi)
$$

定义**偏近点角** $\psi$，于是近心点处 $\psi = 0$，远心点处 $\psi = \pi$。几何上，$\psi$ 是从椭圆中心看、位于行星正上方外接圆上那一点的角。

::: proposition 开普勒方程 {#prop-kepler-eq}
设 $n = 2\pi/\tau = \sqrt{k/(\mu a^3)}$ 为**平均运动**，并取 $t = 0$ 在近心点。则偏近点角满足

$$
nt = \psi - e\sin\psi,
$$ {#eq-kepler-eq}

极角由 $\tan(\theta/2) = \sqrt{(1 + e)/(1 - e)}\,\tan(\psi/2)$ 还原。
:::

::: proof
把径向能量方程 [[#eq-radial-energy]] 乘以 $2r^2/\mu$，代入 $E = -k/(2a)$ 与 $\ell^2 = \mu kp = \mu ka(1 - e^2)$：

$$
r^2\dot r^2 = \frac{2}{\mu}\left(Er^2 + kr - \frac{\ell^2}{2\mu}\right) = \frac{k}{\mu a}\bigl[-r^2 + 2ar - a^2(1 - e^2)\bigr] = \frac{k}{\mu a}\bigl[a^2e^2 - (r - a)^2\bigr].
$$

由 $r - a = -ae\cos\psi$，方括号化为 $a^2e^2\sin^2\psi$，而左边是 $a^2(1 - e\cos\psi)^2\cdot a^2e^2\sin^2\psi\,\dot\psi^2$。约去后得 $(1 - e\cos\psi)^2\dot\psi^2 = k/(\mu a^3) = n^2$。取 $\psi$ 增大，$(1 - e\cos\psi)\,\dd\psi = n\,\dd t$，从近心点积分即得 [[#eq-kepler-eq]]。$\theta$ 与 $\psi$ 的关系由令 $a(1 - e\cos\psi)$ 等于 $p/(1 + e\cos\theta)$、用半角公式得出；下面的算例中会数值检验。
:::

开普勒方程是超越方程：给定 $t$，$\psi$ 没有公式解。牛顿法收敛极快，因为 $e < 1$ 时 $\psi \mapsto \psi - e\sin\psi$ 光滑且单调增。从 $\psi = nt$ 出发，迭代 $\psi \leftarrow \psi - (\psi - e\sin\psi - nt)/(1 - e\cos\psi)$。

::: example 卫星的计时 {#ex-timing}
对 [[#ex-satellite]] 的卫星，$e = 5/19$、$\tau = 9215\,\mathrm{s}$，求它过近地点后多久到达 $\theta = 90^\circ$，以及过近地点四分之一周期后它在哪里。
::: solution
$\theta = 90^\circ$ 时，$\tan(\psi/2) = \sqrt{(1 - e)/(1 + e)}\tan 45^\circ = \sqrt{14/24} = 0.7638$，故 $\psi = 1.3045\,\mathrm{rad}$（$74.74^\circ$）。核对：$a(1 - e\cos\psi) = 8842\,\mathrm{km}$，恰为 $p = a(1 - e^2)$，即 [[#eq-conic]] 中 $\theta = 90^\circ$ 处的半径。开普勒方程给出

$$
nt = 1.3045 - \tfrac{5}{19}\sin 1.3045 = 1.0506, \qquad t = \frac{1.0506}{2\pi}\,\tau = 0.1672\,\tau = 1541\,\mathrm{s}.
$$

卫星只用周期的 $16.7\%$ 就走完第一个四分之一圈，因为它在近地点附近最快。

过近地点四分之一周期处，$nt = \pi/2$。从 $\psi = \pi/2$ 出发的牛顿法给出 $1.83395$，再 $1.82548$，再 $1.825466$，此后数字不再变化。故 $\psi = 1.8255\,\mathrm{rad}$，半径为 $a(1 - e\cos\psi) = 10\,130\,\mathrm{km}$，半角公式给出 $\theta = 118.9^\circ$。走到远地点用时的一半，角度上已走完三分之二。
:::
:::

::: remark 拉普拉斯–龙格–楞次向量
开普勒问题除 $\boldsymbol{\ell}$ 外还有一个守恒向量：$\mathbf{A} = \mathbf{p}\times\boldsymbol{\ell} - \mu k\,\hat{\mathbf{r}}$，其中 $\mathbf{p} = \mu\dot{\mathbf{r}}$。它从焦点指向近心点，大小为 $\mu ke$；其守恒性在 [[#exr-lrl]] 中证明。开普勒椭圆不进动，正是因为有这个向量；它是在 [[quantum-1/hydrogen]] 中解释氢原子能级简并的隐藏对称性——那里 $E_n$ 只依赖 $n$ 而不依赖角动量。来自其他行星或广义相对论的微小扰动会让 $\mathbf{A}$ 缓慢旋转：那就是水星近日点的进动。
:::

## 闭合轨道与贝特朗定理 {#bertrand}

有界轨道在拱点之间沿 $r$ 振荡，同时 $\theta$ 增大。从一个近心点到下一个远心点转过的角度称为**拱点角** $\Delta\theta$。若经过若干整次径向振荡后，$\theta$ 恰好前进了整数圈，轨道就闭合；这要求 $\Delta\theta/\pi$ 是有理数。对开普勒问题，$\Delta\theta = \pi$ 恰好成立，每条有界轨道都闭合。

对近圆轨道，任何受力定律的拱点角都可以求出来。把吸引力写成 $F = -f(r)$（$f > 0$），设在 $r_0 = 1/u_0$ 处有一条圆轨道。把 $u = u_0 + \eta$ 代入 [[#eq-binet]]，对 $\eta$ 展开到一阶。计算在 [[#exr-apsidal]] 中完成，结果是

$$
\frac{\dd^2\eta}{\dd\theta^2} + \beta^2\eta = 0, \qquad \beta^2 = 3 + \frac{r_0f'(r_0)}{f(r_0)}.
$$ {#eq-beta}

于是 $\eta \propto \cos\beta\theta$，拱点角为 $\Delta\theta = \pi/\beta$。对幂律 $f = cr^n$，$\beta^2 = 3 + n$，与 [[#prop-power-stable]] 一致：振荡稳定恰好当 $\beta^2 > 0$。引力（$n = -2$）给出 $\beta = 1$、$\Delta\theta = \pi$。胡克定律（$n = 1$）给出 $\beta = 2$、$\Delta\theta = \pi/2$：轨道是以原点为**中心**（而非焦点）的椭圆。其余任何幂次对大多数 $n$ 都给出无理的 $\beta$，轨道是永不闭合的玫瑰线。

::: theorem 贝特朗（Bertrand）定理 {#thm-bertrand}
使每条有界轨道都闭合的中心势只有两个：$U = -k/r$ 与 $U = \frac12 kr^2$，其中 $k > 0$。
:::

::: proof {collapsed}
概要。若每条有界轨道都闭合，则近圆轨道在每个半径处都闭合，于是 [[#eq-beta]] 中的 $\beta$ 在每个 $r_0$ 处都是有理数。只取有理值的连续函数必为常数，故 $rf'/f = \beta^2 - 3$ 是常数，$f = cr^{\beta^2 - 3}$ 是幂律。贝特朗随后把轨道方程对径向振荡的振幅展开到三阶，证明除非 $\beta^2 = 1$ 或 $\beta^2 = 4$，拱点角依赖于振幅。一份严谨的现代证明见戈德斯坦（Goldstein）、普尔（Poole）与萨夫科（Safko）合著的《经典力学》（*Classical Mechanics*，第 3 版）附录 A。
:::

::: quiz
粒子在吸引的中心力 $f = cr^{-5/2}$ 中运动，轨道是一条稍受扰动的圆轨道。下列说法哪个正确？
- [ ] 轨道是固定的椭圆，因为每个吸引幂律都给出椭圆。
- [x] 轨道是玫瑰线，其近心点在相邻拱点之间前进超过半圈，而且它是稳定的。
- [ ] 圆轨道不稳定，因为 $n < -2$。
- [ ] 轨道恰好在两次径向振荡后闭合。
::: solution
这里 $n = -5/2$，故 $\beta^2 = 3 + n = 1/2$，$\beta = 1/\sqrt2$。因为 $\beta^2 > 0$，圆轨道稳定（$n > -3$）。拱点角为 $\pi/\beta = \sqrt2\,\pi \approx 255^\circ$，超过 $180^\circ$，所以相邻近心点在每个径向周期前进 $2\pi\sqrt 2 - 2\pi \approx 149^\circ$。因为 $\sqrt2$ 是无理数，轨道永不闭合。只有 $n = -2$ 与 $n = 1$ 给出闭合轨道。
:::
:::

## 散射 {#scattering}

一个粒子以速率 $v_\infty$ 从远处入射，**碰撞参数** $b$ 定义为力心到其入射渐近线的垂直距离，则 $E = \frac12\mu v_\infty^2$，$\ell = \mu v_\infty b$。它被偏转，沿另一条渐近线离开。入射方向与出射方向的夹角称为**散射角** $\Theta$。对排斥的平方反比力——例如 α粒子接近原子核——轨道是双曲线靠外的一支，散射角可以精确算出。

::: example 卢瑟福（Rutherford）散射 {#ex-rutherford}
质量 $\mu$、能量 $E$ 的粒子以碰撞参数 $b$ 入射到一个固定的排斥中心 $U = +k/r$（$k > 0$）。证明散射角满足

$$
\tan\frac{\Theta}{2} = \frac{k}{2Eb}.
$$ {#eq-rutherford-angle}

对 $5.00\,\mathrm{MeV}$ 的 α粒子与金原子核（$Z = 79$），利用 $e^2/(4\pi\eps_0) = 1.440\,\mathrm{MeV\,fm}$，求使 $\Theta = 90^\circ$ 的碰撞参数。
::: solution
对 $F = +k/r^2 = +ku^2$，轨道方程 [[#eq-binet]] 化为 $u'' + u = -\mu k/\ell^2$。在某处取正值的解是

$$
u = \frac{\mu k}{\ell^2}\bigl(e\cos\theta - 1\bigr), \qquad e > 1,
$$

其中轴经过最近距离点。能量关系照旧成为 $e^2 = 1 + 2E\ell^2/(\mu k^2)$，即把 $k \to -k$ 后同样的计算。粒子在 $u = 0$ 处位于无穷远，即 $\cos\theta_\infty = 1/e$，两条渐近线在 $\theta = \pm\theta_\infty$。运动方向从一条渐近线转到另一条，故 $\Theta = \pi - 2\theta_\infty$，于是

$$
\tan\frac{\Theta}{2} = \cot\theta_\infty = \frac{\cos\theta_\infty}{\sin\theta_\infty} = \frac{1/e}{\sqrt{1 - 1/e^2}} = \frac{1}{\sqrt{e^2 - 1}}.
$$

现在 $e^2 - 1 = 2E\ell^2/(\mu k^2) = 2E\mu^2v_\infty^2b^2/(\mu k^2) = (2Eb/k)^2$，用了 $\mu v_\infty^2 = 2E$。所以 $\tan(\Theta/2) = k/(2Eb)$。

对 α粒子（电荷 $2e$）与金核（电荷 $79e$），$k = 2\times 79\times 1.440\,\mathrm{MeV\,fm} = 227.5\,\mathrm{MeV\,fm}$。$\Theta = 90^\circ$ 时 $\tan 45^\circ = 1$，

$$
b = \frac{k}{2E} = \frac{227.5}{10.0} = 22.8\,\mathrm{fm}.
$$

金核的半径约 $7\,\mathrm{fm}$，所以即使直角偏转也完全发生在核外库仑定律成立的地方。（金核比 α粒子重五十倍，把它当作固定是 $2\%$ 的近似；严格说来，$E$ 与 $\Theta$ 指的是质心系。）
:::
:::

一束强度均匀的粒子流以一切碰撞参数轰击靶。碰撞参数在 $b$ 与 $b + \dd b$ 之间的粒子——面积为 $2\pi b\,\dd b$ 的圆环——被散射到 $\Theta$ 与 $\Theta + \dd\Theta$ 之间的角度，即立体角 $\dd\Omega = 2\pi\sin\Theta\,\dd\Theta$ 的带。两者之比是**微分散面**，

$$
\deriv{\sigma}{\Omega} = \frac{b}{\sin\Theta}\abs{\deriv{b}{\Theta}}.
$$

由 [[#eq-rutherford-angle]]，$b = (k/2E)\cot(\Theta/2)$，$\abs{\dd b/\dd\Theta} = (k/4E)\csc^2(\Theta/2)$。用 $\sin\Theta = 2\sin(\Theta/2)\cos(\Theta/2)$，

$$
\deriv{\sigma}{\Omega} = \frac{(k/2E)\cot(\Theta/2)\,(k/4E)\csc^2(\Theta/2)}{2\sin(\Theta/2)\cos(\Theta/2)} = \left(\frac{k}{4E}\right)^2\frac{1}{\sin^4(\Theta/2)}.
$$ {#eq-rutherford}

这就是**卢瑟福公式**。小角度处的急剧上升，以及大角度散射虽小却非零的比率，正是盖革（Geiger）与马斯登（Marsden）1909–1913 年测到的东西，也正是它们迫使人们得出原子的正电荷集中于一个微小原子核的结论。

::: warning 散射角不是最近距离处角度的两倍
在 [[#ex-rutherford]] 中，角 $\theta_\infty$ 是从双曲线的对称轴量到渐近线的，散射角是 $\Theta = \pi - 2\theta_\infty$ 而不是 $2\theta_\infty$。对心碰撞（$b = 0$）给出 $e = 1$、$\theta_\infty = 0$、$\Theta = \pi$：粒子原路弹回。远处掠过（$b \to \infty$）给出 $e \to \infty$、$\theta_\infty \to \pi/2$、$\Theta \to 0$。如果你的公式给出相反的极限，那就是把两个角弄混了。
:::

::: history 从开普勒到卢瑟福
约翰内斯·开普勒（Johannes Kepler）根据第谷·布拉赫（Tycho Brahe）对火星的观测，在《新天文学》（*Astronomia nova*，1609）中发表了前两条定律，第三条发表在《世界的和谐》（*Harmonices mundi*，1619）。艾萨克·牛顿（Isaac Newton）在《自然哲学的数学原理》（*Principia*，1687）中由平方反比律导出全部三条，其中还出现了二体问题的约化以及反问题——由轨道求力。现代用守恒向量的处理可追溯到雅各布·赫尔曼（Jakob Hermann）与约翰·伯努利（Johann Bernoulli）1710 年的工作，并由拉普拉斯（Laplace）推广；龙格–楞次之名来自卡尔·龙格（Carl Runge）1919 年的一部教科书与威廉·楞次（Wilhelm Lenz）1924 年在旧量子论中的使用。约瑟夫·贝特朗（Joseph Bertrand）1873 年在《法国科学院院刊》（*Comptes rendus*）上证明了他的定理。欧内斯特·卢瑟福（Ernest Rutherford）1911 年导出散射公式，以解释汉斯·盖革（Hans Geiger）与欧内斯特·马斯登（Ernest Marsden）观测到的大角度偏转。
:::

## 后续内容 {#leads}

[[analytical-mechanics/hamiltonian]] 在相空间中重访开普勒问题，在那里角动量与龙格–楞次向量经泊松（Poisson）括号成为对称性的生成元。[[analytical-mechanics/chaos]] 从庞加莱（Poincaré）的发现讲起：三体问题没有这样漂亮的解。在 [[gravitation/schwarzschild]] 中，有效势能因广义相对论多出一项 $-1/r^3$，使 $\beta$ 略小于 $1$，产生水星近日点每世纪 $43''$ 的进动。在 [[quantum-1/hydrogen]] 中，同样的分离——径向方程带着离心势垒 $\hbar^2\ell(\ell+1)/(2\mu r^2)$——是求解氢原子的第一步。

::: summary
- 二体问题分离为质心的自由运动，与相对坐标以约化质量 $\mu = m_1m_2/(m_1 + m_2)$ 的运动。
- 角动量守恒把运动禁锢在一个平面内，并给出 $\ell = \mu r^2\dot\theta$ 常量；对每种心力，相等时间扫过相等面积。
- 径向运动是在有效势能 $U_{\mathrm{eff}} = U + \ell^2/(2\mu r^2)$ 中的一维运动；折返点满足 $U_{\mathrm{eff}} = E$。
- 取 $u = 1/r$，轨道方程为 $u'' + u = -\mu F(1/u)/(\ell^2u^2)$。对 $U = -k/r$，它给出圆锥曲线 $r = p/(1 + e\cos\theta)$，其中 $p = \ell^2/(\mu k)$，$e = \sqrt{1 + 2E\ell^2/(\mu k^2)}$。
- 有界开普勒轨道有 $a = -k/(2E)$ 与 $\tau^2 = 4\pi^2\mu a^3/k$，对引力即 $4\pi^2 a^3/(G(m_1 + m_2))$。沿椭圆的时刻表是开普勒方程 $nt = \psi - e\sin\psi$。
- 近圆轨道的拱点角为 $\pi/\beta$，其中 $\beta^2 = 3 + rf'/f$；幂律只对 $n > -3$ 给出稳定的圆。贝特朗定理：只有 $-k/r$ 与 $\frac12 kr^2$ 使每条有界轨道闭合。
- 排斥库仑散射有 $\tan(\Theta/2) = k/(2Eb)$ 与卢瑟福散面 $(k/4E)^2/\sin^4(\Theta/2)$。
:::

## 习题 {#exercises}

::: exercise 氢原子的约化质量 {level=1 check="1836.15267/1837.15267"}
质子是电子质量的 $1836.15267$ 倍。求氢原子的约化质量（以电子质量的分数量计）。
::: solution
由 $m_p = 1836.15267\,m_e$，

$$
\frac{\mu}{m_e} = \frac{m_p}{m_e + m_p} = \frac{1836.15267}{1837.15267} = 0.999456.
$$

氢的一切能级都与 $\mu$ 成正比，所以相比质子无限重的情形，其数值小 $0.054\%$。对氘，质子被换成约重两倍的核，$\mu/m_e$ 升至约 $0.999728$，谱线随之移动约 $0.027\%$：正是这一移动让尤里（Urey）在 1932 年发现了氘。
:::
:::

::: exercise 对地静止轨道的半径 {level=1 check="42164"}
对地静止卫星在赤道平面内运行，周期等于一个恒星日，$86\,164\,\mathrm{s}$。用 $GM_\oplus = 3.986\times 10^{14}\,\mathrm{m^3/s^2}$ 求其圆轨道半径，以千米计。
::: solution
卫星质量可忽略，由 [[#eq-third-law]]，

$$
a = \left(\frac{GM_\oplus\tau^2}{4\pi^2}\right)^{1/3} = \left(\frac{(3.986\times 10^{14})(86\,164)^2}{4\pi^2}\right)^{1/3} = 4.2164\times 10^{7}\,\mathrm{m},
$$

即距地心 $42\,164\,\mathrm{km}$，赤道上方约 $35\,790\,\mathrm{km}$。必须匹配的是恒星日而非 $86\,400\,\mathrm{s}$ 的太阳日：恒星日才是相对恒星的自转周期。
:::
:::

::: exercise 月球轨道的偏心率 {level=1 check="42200/768800"}
月球到地球的距离在近地点约 $363\,300\,\mathrm{km}$ 与远地点约 $405\,500\,\mathrm{km}$ 之间变化。求其轨道偏心率。
::: solution
由 $r_p = a(1 - e)$ 与 $r_a = a(1 + e)$，

$$
e = \frac{r_a - r_p}{r_a + r_p} = \frac{405\,500 - 363\,300}{405\,500 + 363\,300} = \frac{42\,200}{768\,800} = 0.0549.
$$

轨道几乎是圆：半短轴 $a\sqrt{1 - e^2}$ 只比 $a$ 短 $0.15\%$，尽管距离变化了 $11\%$。一个略微椭圆的轨道，看上去就是一个圆心偏移的圆。
:::
:::

::: exercise 近地点速率 {level=2 check="sqrt(3.986e14*(2/7e6 - 1/9.5e6))"}
对 [[#ex-satellite]] 的卫星，由 [[#eq-semi-major]] 与能量守恒导出活力公式 $v^2 = GM_\oplus(2/r - 1/a)$，并以 $\mathrm{m/s}$ 计算近地点速率。近地点速率须增加多少，卫星才能逃逸？
::: solution
单位质量下 $E = \frac12 v^2 - GM_\oplus/r$ 守恒，且由 [[#eq-semi-major]]（取 $k/\mu = GM_\oplus$）等于 $-GM_\oplus/(2a)$。解出 $v^2$ 得 $v^2 = GM_\oplus(2/r - 1/a)$。在近地点，

$$
v_p = \sqrt{3.986\times 10^{14}\left(\frac{2}{7.0\times 10^6} - \frac{1}{9.5\times 10^6}\right)} = 8481\,\mathrm{m/s}.
$$

逃逸需要 $E \ge 0$，即 $a \to \infty$ 的极限，于是 $v_{\mathrm{esc}} = \sqrt{2GM_\oplus/r_p} = \sqrt{2(3.986\times 10^{14})/(7.0\times 10^6)} = 10\,672\,\mathrm{m/s}$。需要增加约 $2190\,\mathrm{m/s}$。在近地点点火是加速最省的地方，因为给定的 $\Delta v$ 带来的 $\frac12 v^2$ 变化，在 $v$ 最大处最大。
:::
:::

::: exercise 玫瑰线的拱点角 {level=2 check="pi*sqrt(2)" #exr-apsidal}
把轨道方程围绕圆轨道线性化，导出 [[#eq-beta]]。然后求吸引力 $f = cr^{-5/2}$ 下近圆轨道的拱点角，以弧度计。
::: hint
把轨道方程写成 $u'' = J(u) - u$，其中 $J(u) = \mu f(1/u)/(\ell^2u^2)$。圆轨道满足 $J(u_0) = u_0$；把 $J$ 在 $u_0$ 附近展开到一阶，并用圆轨道条件消去 $\mu/\ell^2$。
:::
::: solution
对吸引力有 $F = -f$，故 [[#eq-binet]] 写成 $u'' + u = J(u)$，其中 $J(u) = \mu f(1/u)/(\ell^2u^2)$。$u_0$ 处的圆轨道满足 $u_0 = J(u_0)$，于是 $\mu/\ell^2 = u_0^3/f(r_0)$，其中 $r_0 = 1/u_0$。令 $u = u_0 + \eta$；一阶近似下 $\eta'' + \eta = J'(u_0)\eta$，故 $\beta^2 = 1 - J'(u_0)$。求导得

$$
J'(u) = \frac{\mu}{\ell^2}\left[-\frac{f'(1/u)}{u^4} - \frac{2f(1/u)}{u^3}\right],
$$

在 $u_0$ 处用 $\mu/\ell^2 = u_0^3/f(r_0)$，

$$
J'(u_0) = \frac{u_0^3}{f(r_0)}\left[-f'(r_0)r_0^4 - 2f(r_0)r_0^3\right] = -\frac{r_0f'(r_0)}{f(r_0)} - 2.
$$

于是 $\beta^2 = 3 + r_0f'(r_0)/f(r_0)$，即 [[#eq-beta]]。对 $f = cr^{-5/2}$，$rf'/f = -5/2$，故 $\beta^2 = 1/2$，拱点角为 $\pi/\beta = \pi\sqrt2 = 4.44\,\mathrm{rad}$，即 $254.6^\circ$。
:::
:::

::: exercise 对心碰撞的最近距离 {level=2 check="45.5"}
$5.00\,\mathrm{MeV}$ 的 α粒子正对金原子核（$Z = 79$）射出，核视为固定。用 $e^2/(4\pi\eps_0) = 1.440\,\mathrm{MeV\,fm}$ 求最近距离，以飞米计。与 [[#ex-rutherford]] 中 $90^\circ$ 散射的碰撞参数比较。
::: solution
$b = 0$ 时没有角动量，动能在折返点全部变成势能：$E = k/d$，其中 $k = 2\times 79\times 1.440 = 227.5\,\mathrm{MeV\,fm}$。于是

$$
d = \frac{k}{E} = \frac{227.5}{5.00} = 45.5\,\mathrm{fm}.
$$

这恰好是 $90^\circ$ 散射碰撞参数 $22.8\,\mathrm{fm}$ 的两倍，因为 $k/E = 2\cdot k/(2E)$。两者都远大于核半径，所以 $5\,\mathrm{MeV}$ 的 α粒子根本碰不到金核——这就是卢瑟福的纯库仑公式能在一切角度上拟合盖革与马斯登数据的原因。
:::
:::

::: exercise 圆轨道的稳定性 {level=3 #exr-stable-power}
证明 [[#prop-power-stable]]：对大小为 $f(r) = cr^n$（$c > 0$）的吸引力，证明每个 $\ell \neq 0$ 恰有一条圆轨道，且它是 $U_{\mathrm{eff}}$ 的极小当且仅当 $n > -3$。再求径向振荡频率与轨道角频率之比。
::: solution
势满足 $U'(r) = f(r) = cr^n$。于是 $U_{\mathrm{eff}}'(r) = cr^n - \ell^2/(\mu r^3)$，在 $r^{n+3} = \ell^2/(\mu c)$ 时为零。若 $n \neq -3$，它恰有一个正根 $r_0$。（若 $n = -3$，只有当 $\ell^2 = \mu c$ 这唯一取值时才有圆轨道，而此时任何半径都是圆轨道。）二阶导数为

$$
U_{\mathrm{eff}}''(r_0) = ncr_0^{n-1} + \frac{3\ell^2}{\mu r_0^4} = ncr_0^{n-1} + 3cr_0^{n-1} = (n + 3)cr_0^{n-1},
$$

用了 $\ell^2/(\mu r_0^3) = cr_0^n$。由于 $c > 0$、$r_0 > 0$，它为正当且仅当 $n > -3$。

径向频率 $\omega_r^2 = U_{\mathrm{eff}}''(r_0)/\mu = (n + 3)cr_0^{n-1}/\mu$。圆轨道的轨道角速度满足 $\mu r_0\dot\theta^2 = cr_0^n$，故 $\dot\theta^2 = cr_0^{n-1}/\mu$。比值为 $\omega_r/\dot\theta = \sqrt{n + 3} = \beta$，与 [[#eq-beta]] 一致：完成一次径向振荡的时间里角度前进 $2\pi/\beta$，所以拱点角为 $\pi/\beta$。
:::
:::

::: exercise 拉普拉斯–龙格–楞次向量 {level=3 #exr-lrl}
势 $-k/r$ 中质量 $\mu$ 的粒子，$\mathbf{p} = \mu\dot{\mathbf{r}}$，$\boldsymbol{\ell} = \mathbf{r}\times\mathbf{p}$，证明 $\mathbf{A} = \mathbf{p}\times\boldsymbol{\ell} - \mu k\hat{\mathbf{r}}$ 守恒。把 $\mathbf{A}$ 与 $\mathbf{r}$ 作点积，重新导出轨道方程 [[#eq-conic]]，并证明 $\abs{\mathbf{A}} = \mu ke$。
::: hint
用 $\dot{\mathbf{p}} = -k\hat{\mathbf{r}}/r^2$、$\dot{\boldsymbol{\ell}} = 0$，以及恒等式 $\deriv{\hat{\mathbf{r}}}{t} = \frac{\dot{\mathbf{r}}}{r} - \frac{(\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r}}{r^3}$。
:::
::: solution
因为 $\boldsymbol{\ell}$ 守恒，

$$
\deriv{}{t}(\mathbf{p}\times\boldsymbol{\ell}) = \dot{\mathbf{p}}\times(\mathbf{r}\times\mu\dot{\mathbf{r}}) = -\frac{\mu k}{r^3}\,\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}) = -\frac{\mu k}{r^3}\bigl[(\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r} - r^2\dot{\mathbf{r}}\bigr],
$$

最后一步用了向量三重积公式。它等于 $\mu k\bigl[\dot{\mathbf{r}}/r - (\mathbf{r}\cdot\dot{\mathbf{r}})\mathbf{r}/r^3\bigr] = \mu k\,\dd\hat{\mathbf{r}}/\dd t$。故 $\dd\mathbf{A}/\dd t = 0$。

现在把 $\mathbf{A}$ 与 $\mathbf{r}$ 作点积，设 $\theta$ 为 $\mathbf{r}$ 与固定向量 $\mathbf{A}$ 的夹角：

$$
Ar\cos\theta = \mathbf{r}\cdot(\mathbf{p}\times\boldsymbol{\ell}) - \mu kr = (\mathbf{r}\times\mathbf{p})\cdot\boldsymbol{\ell} - \mu kr = \ell^2 - \mu kr.
$$

解出 $r$，

$$
r = \frac{\ell^2/(\mu k)}{1 + (A/\mu k)\cos\theta},
$$

这就是 [[#eq-conic]]，其中 $p = \ell^2/(\mu k)$，$e = A/(\mu k)$。故 $\abs{\mathbf{A}} = \mu ke$，且 $\mathbf{A}$ 指向近心点——那里 $\theta = 0$、$r$ 最小。轨道的形状就这样在完全没解微分方程的情况下被找到了，因为守恒向量携带着全部信息。
:::
:::

