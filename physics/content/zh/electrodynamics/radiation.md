静止电荷的库仑场按 $1/r^2$ 衰减；作匀速运动的电荷带着它的场一起走。二者都不把能量送往无穷远：坡印廷矢量穿过大球面的通量按 $1/r^4\times r^2\to0$ 衰减。可一旦让电荷振动起来，它的场就有一部分挣脱出去。那一部分只按 $1/r$ 衰减，所以它穿过任何半径球面的坡印廷通量都相同，能量被永久地带走了。这就是**辐射**，一切无线电发射机、每一盏灯、每一支 X 射线管乃至太阳本身，都是靠它把能量穿越空间送出去的。

本章从麦克斯韦方程组求出辐射场。出发点是洛伦兹规范下势的那两条波动方程 [[electrodynamics/maxwell-equations#eq-wave-pot]]。它们的解是**推迟势**：即 [[electrodynamics/electrostatics]] 中的库仑积分，只是每个源都在一个较早的时刻取值——以 $c$ 行进的信号必定正是从那个时刻离开它的。把它用于点电荷，就得到**李纳–维谢尔势**与任意运动电荷的场。其中的 $1/r$ 部分给出加速电荷辐射功率的**拉莫尔公式** $P = q^2a^2/(6\pi\varepsilon_0c^3)$，由此又引出振荡电偶极子的辐射、天线的辐射电阻，以及空气分子对阳光的散射——正是它使天空呈蓝色。

格林函数的思路见 [[math-methods/green-functions]]；坡印廷矢量与洛伦兹规范见 [[electrodynamics/maxwell-equations]]。全章使用 $\mu_0/4\pi = 1/(4\pi\varepsilon_0c^2)$，并记 $Z_0 = \mu_0c = 376.73\,\Omega$。

## 推迟势 {#retarded}

在洛伦兹规范下，$V, A_x, A_y, A_z$ 的每一个都满足波动方程 $\Box\phi = -s$（$\Box$ 为达朗贝尔算符），其源 $s$ 已知。对静态源这就是泊松方程，解为 $\frac{1}{4\pi}\int s/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$。含时解只有一处改变。

::: theorem 推迟势 {#thm-retarded}
设 $\rho$ 与 $\mathbf J$ 是满足连续性方程的局域化源。定义**推迟时间** $t_r = t - \lvert\mathbf r-\mathbf r'\rvert/c$。则

$$
V(\mathbf r, t) = \frac{1}{4\pi\varepsilon_0}\int\frac{\rho(\mathbf r', t_r)}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau', \qquad \mathbf A(\mathbf r, t) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r', t_r)}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau'
$$ {#eq-retarded}

满足 $\Box V = -\rho/\varepsilon_0$ 与 $\Box\mathbf A = -\mu_0\mathbf J$，并满足洛伦兹条件。
:::

::: proof
只需证明**推迟格林函数**

$$
G(\mathbf R, \tau) = \frac{\delta(\tau - R/c)}{4\pi R}, \qquad R = \lvert\mathbf R\rvert,
$$

满足 $\Box G = -\delta^3(\mathbf R)\delta(\tau)$，其中 $\mathbf R = \mathbf r - \mathbf r'$，$\tau = t - t'$。于是 $\Box\phi = -s$ 的解为 $\phi = \int G\,s(\mathbf r', t')\,\dd\tau'\,\dd t'$，而 $t'$ 对 $\delta(t - t' - R/c)$ 的积分把 $t'$ 定为 $t_r$，即得 [[#eq-retarded]]。

在 $R = 0$ 之外，考虑任何形如 $u = f(\tau - R/c)/R$ 的函数。对球对称函数，$\nabla^2u = R^{-1}\partial_R^2(Ru)$，而 $Ru = f(\tau - R/c)$ 满足 $\partial_R^2(Ru) = c^{-2}f''$。于是 $\nabla^2u = c^{-2}\partial_\tau^2u$：只要 $R > 0$ 就有 $\Box u = 0$。这正是向外的球面波。在 $R = 0$ 近旁，因子 $1/R$ 是奇异的，空间导数压过时间导数：把 $\Box G$ 对小球 $\lvert\mathbf R\rvert<\epsilon$ 与 $\tau$ 积分，时间导数项为 $\int\partial_\tau^2G\,\dd\tau = 0$（它是在 $\lvert\tau\rvert$ 很大处消失的函数的全导数），而 $\int\dd\tau\,G = 1/(4\pi R)$，其拉普拉斯为 $-\delta^3(\mathbf R)$，与静电学中一样。故 $\Box G = -\delta^3(\mathbf R)\delta(\tau)$。（若要借助对时间的傅里叶变换仔细处理，见 Jackson §6.4。）当 $\partial_t\rho + \nabla\cdot\mathbf J = 0$ 时势满足洛伦兹条件，这一点留待习题证明。
:::

因果的选择是一个物理输入。**超前**格林函数含 $\delta(\tau + R/c)$，同样满足方程，但它会让场依赖于源的将来；我们把它舍弃。推迟势并不是简单地在静态势里插入一个延时：对 [[#eq-retarded]] 求导会因 $t_r$ 依赖于 $\mathbf r$ 而产生额外的项，而正是这些项在辐射。（由此得到的场公式称为**杰缅科（Jefimenko）方程**；一般形式我们用不上。）

## 李纳–维谢尔势 {#lienard-wiechert}

对轨迹为 $\mathbf w(t)$ 的点电荷 $q$，$\rho(\mathbf r', t') = q\,\delta^3(\mathbf r' - \mathbf w(t'))$。推迟时间现在由一个隐式条件定义：在 $t_r$ 时刻离开电荷的光信号于 $t$ 时刻到达 $\mathbf r$：

$$
\lvert\mathbf r - \mathbf w(t_r)\rvert = c(t - t_r).
$$ {#eq-tr}

对低于光速运动的电荷，解恰有一个：$t_r$ 变化时左端的变化率至多为 $v < c$，右端的变化率为 $c$。记 $\boldsymbol{\mathcal R} = \mathbf r - \mathbf w(t_r)$、$\mathcal R = \lvert\boldsymbol{\mathcal R}\rvert$、$\hat{\mathbf n} = \boldsymbol{\mathcal R}/\mathcal R$、$\boldsymbol\beta = \mathbf v(t_r)/c$。

::: theorem 李纳–维谢尔势 {#thm-lw}
点电荷的推迟势为

$$
V(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\,\frac{1}{\mathcal R\,(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)}, \qquad \mathbf A(\mathbf r, t) = \frac{\mathbf v}{c^2}V(\mathbf r, t),
$$ {#eq-lw}

右端一切量都在推迟时刻取值。
:::

::: proof
把 [[#eq-retarded]] 中的延时写成对额外一次时间积分里的 δ 函数：

$$
V(\mathbf r, t) = \frac{1}{4\pi\varepsilon_0}\iint\frac{\rho(\mathbf r', t')}{\lvert\mathbf r-\mathbf r'\rvert}\,\delta\!\left(t' - t + \frac{\lvert\mathbf r-\mathbf r'\rvert}{c}\right)\dd\tau'\,\dd t' = \frac{q}{4\pi\varepsilon_0}\int\frac{\delta\bigl(g(t')\bigr)}{\lvert\mathbf r-\mathbf w(t')\rvert}\,\dd t',
$$

对 $\delta^3(\mathbf r' - \mathbf w(t'))$ 做完 $\dd\tau'$ 积分之后，其中 $g(t') = t' - t + \lvert\mathbf r - \mathbf w(t')\rvert/c$。函数 $g$ 只在 $t' = t_r$ 处为零，且

$$
g'(t') = 1 + \frac{1}{c}\frac{\dd}{\dd t'}\lvert\mathbf r - \mathbf w(t')\rvert = 1 - \frac{(\mathbf r - \mathbf w)\cdot\mathbf v}{c\,\lvert\mathbf r - \mathbf w\rvert} = 1 - \hat{\mathbf n}\cdot\boldsymbol\beta ,
$$

它是正的。用规则 $\int\delta(g(t'))F(t')\,\dd t' = F(t_r)/\lvert g'(t_r)\rvert$ 就得到标量势。矢量势是同样的计算，只需把源取为 $\mathbf J = q\mathbf v\,\delta^3(\mathbf r' - \mathbf w(t'))$、系数取 $\mu_0/4\pi$ 而非 $1/4\pi\varepsilon_0$，于是多出因子 $\mu_0\varepsilon_0\mathbf v = \mathbf v/c^2$。
:::

因子 $1/(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)$ 不是伪装起来的相对论修正，而是推迟带来的几何效应。朝着观察者而来的电荷，在一段给定的接收时间内被“看到”的轨迹更长，势因而被增强。同一个因子也使它发出的辐射受到多普勒压缩。

::: example 匀速运动电荷的势 {#ex-uniform}
电荷 $q$ 以恒定速度 $\mathbf v$ 运动。用由它*当前*位置指向场点的矢量 $\mathbf R_p$ 以及 $\mathbf R_p$ 与 $\mathbf v$ 的夹角 $\psi$，把 $t$ 时刻的标量势表示出来。
::: solution
电荷从发射时刻起以速度 $\mathbf v$ 运动了 $t - t_r = \mathcal R/c$，才到达当前位置，所以

$$
\mathbf R_p = \boldsymbol{\mathcal R} - \mathbf v(t - t_r) = \mathcal R(\hat{\mathbf n} - \boldsymbol\beta).
$$

于是 $R_p^2 = \mathcal R^2(1 - 2\hat{\mathbf n}\cdot\boldsymbol\beta + \beta^2)$，又因 $\mathbf R_p\times\boldsymbol\beta = \mathcal R\,\hat{\mathbf n}\times\boldsymbol\beta$，有 $R_p^2\beta^2\sin^2\psi = \mathcal R^2\bigl(\beta^2 - (\hat{\mathbf n}\cdot\boldsymbol\beta)^2\bigr)$。两式相减，

$$
R_p^2\bigl(1 - \beta^2\sin^2\psi\bigr) = \mathcal R^2\bigl(1 - 2\hat{\mathbf n}\cdot\boldsymbol\beta + (\hat{\mathbf n}\cdot\boldsymbol\beta)^2\bigr) = \mathcal R^2(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)^2 .
$$

于是 [[#eq-lw]] 化为

$$
V(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\frac{1}{R_p\sqrt{1 - \beta^2\sin^2\psi}} .
$$

推迟量全都消失了：势以电荷*现在*所在的位置为中心，而不是它过去所在的位置。在电荷的前方与后方（$\psi = 0, \pi$），它就是距离 $R_p$ 处的库仑势；在直角方向上大 $\gamma = 1/\sqrt{1 - \beta^2}$ 倍。这一结果由奥利弗·赫维赛德（Oliver Heaviside）于 1888 年得到。它的场——快速电荷被压扁的“薄饼”——将在 [[electrodynamics/relativistic-fields]] 中由洛伦兹加速（boost）导出。
:::
:::

对 [[#eq-lw]] 求导很费工，因为 $t_r$ 通过 [[#eq-tr]] 依赖于 $\mathbf r$ 与 $t$；计算见 Griffiths §10.3.2。记 $\mathbf u = c\hat{\mathbf n} - \mathbf v$，$\mathbf a$ 为 $t_r$ 时刻的加速度，结果为

$$
\mathbf E(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\frac{\mathcal R}{(\boldsymbol{\mathcal R}\cdot\mathbf u)^3}\Bigl[(c^2 - v^2)\mathbf u + \boldsymbol{\mathcal R}\times(\mathbf u\times\mathbf a)\Bigr], \qquad \mathbf B = \frac1c\hat{\mathbf n}\times\mathbf E .
$$ {#eq-lw-fields}

第一项称为**速度场**，按 $1/\mathcal R^2$ 衰减且不含 $\mathbf a$；对匀速运动，它就是 [[electrodynamics/relativistic-fields]] 中由洛伦兹加速求出的运动电荷的场。第二项称为**加速场**，按 $1/\mathcal R$ 衰减且垂直于 $\hat{\mathbf n}$。它就是辐射。对瞬时静止的电荷，$\mathbf u = c\hat{\mathbf n}$，$\boldsymbol{\mathcal R}\cdot\mathbf u = c\mathcal R$，于是

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0}\left[\frac{\hat{\mathbf n}}{\mathcal R^2} + \frac{\hat{\mathbf n}\times(\hat{\mathbf n}\times\mathbf a)}{c^2\mathcal R}\right].
$$ {#eq-rad-field}

::: intuition 场线上的折痕
J. J. 汤姆孙的图像让 [[#eq-rad-field]] 一目了然。一个静止的电荷在极短时间 $\Delta t$ 内突然获得一个小速度。在以它为中心、半径 $ct$ 的球外，消息尚未传到，场线还是静止电荷的场线；在半径 $c(t - \Delta t)$ 的球内，它们是运动电荷的场线。中间那层薄壳里场线必须衔接，而衔接段几乎沿切向。它的切向分量相对径向分量的比值随壳半径成正比增长，于是切向场按 $1/r$ 而不是 $1/r^2$ 衰减。这一横向脉冲以 $c$ 向外行进，就是辐射，其强度正比于加速度与 $\sin\theta$。
:::

## 拉莫尔公式 {#larmor}

::: theorem 拉莫尔公式 {#thm-larmor}
点电荷 $q$ 以速率 $v\ll c$ 运动、加速度为 $\mathbf a$，它单位立体角辐射的功率为

$$
\deriv{P}{\Omega} = \frac{\mu_0q^2a^2}{16\pi^2c}\sin^2\theta ,
$$ {#eq-larmor-angular}

其中 $\theta$ 是 $\mathbf a$ 与观测方向的夹角；总功率为

$$
P = \frac{q^2a^2}{6\pi\varepsilon_0c^3} = \frac{\mu_0q^2a^2}{6\pi c}.
$$ {#eq-larmor}
:::

::: proof
当 $\mathcal R$ 很大时，能流中只剩 [[#eq-rad-field]] 的加速项，因为速度项对 $\mathbf S$ 的贡献是 $1/\mathcal R^3$ 及更快衰减的阶。由 $\hat{\mathbf n}\times(\hat{\mathbf n}\times\mathbf a) = (\hat{\mathbf n}\cdot\mathbf a)\hat{\mathbf n} - \mathbf a$，辐射场的大小为

$$
E_{\mathrm{rad}} = \frac{q}{4\pi\varepsilon_0c^2}\frac{a\sin\theta}{\mathcal R} = \frac{\mu_0q}{4\pi}\frac{a\sin\theta}{\mathcal R},
$$

它垂直于 $\hat{\mathbf n}$；$\mathbf B = c^{-1}\hat{\mathbf n}\times\mathbf E$ 垂直于二者，且 $B = E/c$。于是

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{E_{\mathrm{rad}}^2}{\mu_0c}\hat{\mathbf n} = \frac{\mu_0q^2a^2}{16\pi^2c}\frac{\sin^2\theta}{\mathcal R^2}\hat{\mathbf n}.
$$

穿过面积 $\mathcal R^2\dd\Omega$ 的功率即 [[#eq-larmor-angular]]。对全方向积分，$\int\sin^2\theta\,\dd\Omega = 2\pi\int_0^\pi\sin^3\theta\,\dd\theta = 2\pi\cdot\frac43 = \frac{8\pi}{3}$，所以 $P = \frac{\mu_0q^2a^2}{16\pi^2c}\cdot\frac{8\pi}{3} = \frac{\mu_0q^2a^2}{6\pi c}$。由 $\mu_0 = 1/(\varepsilon_0c^2)$，此即 [[#eq-larmor]]。由于 $v\ll c$，推迟位置与当前位置的差异可忽略，$\theta$ 可以从电荷的当前位置量起。
:::

辐射在垂直于加速度的方向最强、沿加速度方向为零，呈面包圈形方向图，并且它在 $\mathbf a$ 与 $\hat{\mathbf n}$ 所确定的平面内线偏振。相对论速度下，李纳在 1898 年证明总功率成为

$$
P = \frac{q^2\gamma^6}{6\pi\varepsilon_0c^3}\left(a^2 - \frac{\lvert\mathbf v\times\mathbf a\rvert^2}{c^2}\right),
$$ {#eq-lienard}

对圆周运动（$\mathbf a\perp\mathbf v$）它化为 $\gamma^4q^2a^2/(6\pi\varepsilon_0c^3)$，对直线加速化为 $\gamma^6q^2a^2/(6\pi\varepsilon_0c^3)$。$\gamma$ 的这些陡峭幂次正是电子同步加速器损失能量如此之多的原因，这一点在 [[particles/accelerators]] 中展开。角分布也随之改变：辐射被甩向前方，集中于速度方向附近的锥内。

::: widget plot
f: (sin(x)^2/(1 - b*cos(x))^5)/((1 - ((sqrt(1 + 15*b^2) - 1)/(3*b))^2)/(1 - b*(sqrt(1 + 15*b^2) - 1)/(3*b))^5)
x: 0, 3.1416
y: 0, 1.05
sliders: b=0.5:0.05:0.99:0.01
labels: dP/dΩ，按峰值归一化
caption: 沿速度方向加速的电荷，其辐射的角分布 $\sin^2\theta/(1 - \beta\cos\theta)^5$ 按峰值归一化，横轴为与速度的夹角 $\theta$（弧度）。$\beta$ 小时峰在 $\pi/2$ 附近，即拉莫尔的 $\sin^2\theta$。把 $\beta$ 推向 $0.99$，峰滑向 $\theta = 0$：$\beta = 0.9$ 时在 $13.4^\circ = 0.234\,\mathrm{rad}$，正是下面一道习题的结果。沿速度本身辐射依然严格为零，但大部分辐射如今落在轴线附近一个窄锥里。
:::

::: example 经典原子坍缩 {#ex-collapse}
在氢原子的一个经典模型中，电子在半径为玻尔半径 $a_0 = 5.29\times10^{-11}\,\mathrm{m}$ 的圆轨道上绕质子运动。求它辐射的功率，并估计它螺旋落入核内需时多久。
::: solution
库仑力提供向心加速度，$a = e^2/(4\pi\varepsilon_0m_er^2)$。用经典电子半径 $r_e = e^2/(4\pi\varepsilon_0m_ec^2) = 2.818\times10^{-15}\,\mathrm{m}$ 比较方便，于是 $a = r_ec^2/r^2$。在 $r = a_0$ 处，$a = 9.04\times10^{22}\,\mathrm{m/s^2}$，且

$$
P = \frac{e^2a^2}{6\pi\varepsilon_0c^3} = \frac{(1.602\times10^{-19})^2(9.04\times10^{22})^2}{6\pi(8.854\times10^{-12})(2.998\times10^{8})^3} = 4.67\times10^{-8}\,\mathrm{W}.
$$

这相当于 $2.9\times10^{11}\,\mathrm{eV/s}$，而结合能只有 $13.6\,\mathrm{eV}$。至于衰减时间，轨道能量为 $E = -e^2/(8\pi\varepsilon_0r)$，而速度保持非相对论性，所以

$$
\deriv{E}{t} = \frac{e^2}{8\pi\varepsilon_0r^2}\deriv{r}{t} = -\frac{e^2}{6\pi\varepsilon_0c^3}\frac{r_e^2c^4}{r^4}\quad\Longrightarrow\quad r^2\deriv{r}{t} = -\frac43r_e^2c .
$$

从 $r = a_0$ 积分到 $r = 0$，

$$
t = \frac{a_0^3}{4r_e^2c} = \frac{(5.29\times10^{-11})^3}{4(2.818\times10^{-15})^2(2.998\times10^{8})} = 1.56\times10^{-11}\,\mathrm{s}.
$$

经典物理预言一切原子都会在十六皮秒内坍缩，沿途发出连续谱。然而原子是稳定的，发出的是尖锐的谱线。这一失效是催生 [[quantum-1]] 量子论的决定性理由之一：在量子论中，基态之下再没有更低的态可供辐射跃迁。
:::
:::

::: example 电子在磁场中螺旋衰减 {#ex-cyclotron}
一个非相对论电子在均匀磁场 $B = 1.00\,\mathrm{T}$ 中做圆周运动。证明它的动能因辐射而指数衰减，并求时间常数。
::: solution
电子以角频率 $\omega_c = eB/m_e$ 运动，因而加速度为 $a = \omega_cv$，由 [[#eq-larmor]]

$$
\deriv{K}{t} = -\frac{e^2\omega_c^2v^2}{6\pi\varepsilon_0c^3} = -\frac{e^4B^2}{3\pi\varepsilon_0m_e^3c^3}\,K, \qquad K = \tfrac12m_ev^2 .
$$

故 $K = K_0e^{-t/\tau}$，其中

$$
\tau = \frac{3\pi\varepsilon_0m_e^3c^3}{e^4B^2} = \frac{3\pi(8.854\times10^{-12})(9.109\times10^{-31})^3(2.998\times10^{8})^3}{(1.602\times10^{-19})^4(1.00)^2} = 2.58\,\mathrm{s}.
$$

这段时间里电子绕了约 $\omega_c\tau = 4.5\times10^{11}$ 圈（回旋频率为 $28.0\,\mathrm{GHz}$）。这种缓慢的衰减很有用处：在彭宁阱中，单个电子靠辐射一路落回其运动的基态；Project 8 实验的“回旋辐射发射谱学”通过探测单个电子微弱的 $28\,\mathrm{GHz}$ 信号来测量电子能量。
:::
:::

::: quiz
一个电荷沿竖直 $z$ 轴上下振荡。在给定的大距离处，辐射强度在哪里最大？哪里为零？
- [x] 在过电荷的水平面内最大；正上方与正下方为零。
- [ ] 在正上方与正下方最大；水平面内为零。
- [ ] 各个方向相同。
- [ ] 在与竖直方向成 $45^\circ$ 处最大。
::: solution
由 [[#eq-larmor-angular]]，强度正比于 $\sin^2\theta$，$\theta$ 从加速度（竖直方向）量起。它在 $\theta = 90^\circ$ 处最大，在 $\theta = 0$ 与 $\pi$ 处为零。这就是竖直的广播发射塔把信号水平送给听众、而不朝正上方发射的原因。
:::
:::

::: remark 辐射反作用
辐射的电荷损失能量，所以必有某个力反作用于它。对周期性或有界运动，令力 $\mathbf F_{\mathrm{rad}}$ 的平均功等于负的拉莫尔功率，即得**阿布拉罕–洛伦兹（Abraham–Lorentz）力** $\mathbf F_{\mathrm{rad}} = m_e\tau_0\dot{\mathbf a}$，对电子 $\tau_0 = e^2/(6\pi\varepsilon_0m_ec^3) = 6.27\times10^{-24}\,\mathrm{s}$。只要运动在 $\tau_0$ 尺度上变化缓慢，它就只是微小修正——实际上总是如此。若把它按字面接受，会出现病态的“失控”（runaway）解，这标志着经典的点粒子电动力学在 $c\tau_0\approx r_e$ 的尺度上并不完备（Jackson 第 16 章；Griffiths §11.2）。
:::

## 电偶极辐射 {#dipole}

一个由非相对论电荷组成、尺度 $d$ 远小于辐射波长 $\lambda$ 的体系，从远处看仿佛所有电荷都在一处：各推迟时间只差约 $d/c$，是周期的一个小分数。辐射场 [[#eq-rad-field]] 于是直接相加，且 $\sum_iq_i\mathbf a_i = \ddot{\mathbf p}$，即电偶极矩的二阶导数。辐射场与功率就是把拉莫尔公式中的 $q\mathbf a$ 换成 $\ddot{\mathbf p}(t_r)$：

$$
\mathbf E_{\mathrm{rad}} = \frac{\mu_0}{4\pi r}\,\hat{\mathbf r}\times\bigl(\hat{\mathbf r}\times\ddot{\mathbf p}(t - r/c)\bigr), \qquad P = \frac{\mu_0\,\lvert\ddot{\mathbf p}\rvert^2}{6\pi c}.
$$ {#eq-dipole-general}

::: proposition 振荡电偶极子 {#prop-dipole}
对 $\mathbf p(t) = p_0\cos\omega t\,\hat{\mathbf z}$，在辐射区 $r\gg\lambda\gg d$ 内，

$$
\mathbf E = -\frac{\mu_0p_0\omega^2}{4\pi}\frac{\sin\theta}{r}\cos\bigl[\omega(t - r/c)\bigr]\hat{\boldsymbol\theta}, \qquad \mathbf B = \frac{1}{c}\hat{\mathbf r}\times\mathbf E,
$$

时间平均强度为

$$
\langle\mathbf S\rangle = \frac{\mu_0p_0^2\omega^4}{32\pi^2c}\frac{\sin^2\theta}{r^2}\hat{\mathbf r},
$$ {#eq-dipole-intensity}

时间平均总功率为

$$
\langle P\rangle = \frac{\mu_0p_0^2\omega^4}{12\pi c}.
$$ {#eq-dipole-power}
:::

::: proof
这里 $\ddot{\mathbf p} = -\omega^2p_0\cos\omega t\,\hat{\mathbf z}$，而 $\hat{\mathbf r}\times(\hat{\mathbf r}\times\hat{\mathbf z}) = (\hat{\mathbf r}\cdot\hat{\mathbf z})\hat{\mathbf r} - \hat{\mathbf z} = \cos\theta\,\hat{\mathbf r} - \hat{\mathbf z} = \sin\theta\,\hat{\boldsymbol\theta}$，用到 $\hat{\mathbf z} = \cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta}$。代入 [[#eq-dipole-general]] 得 $\mathbf E$。强度为沿 $\hat{\mathbf r}$ 的 $E^2/(\mu_0c)$，由 $\langle\cos^2\rangle = \frac12$ 得 [[#eq-dipole-intensity]]。总功率可由 [[#eq-dipole-general]] 配合 $\langle\lvert\ddot{\mathbf p}\rvert^2\rangle = \frac12\omega^4p_0^2$ 得到，也可将 [[#eq-dipole-intensity]] 用 $\int\sin^2\theta\,\dd\Omega = 8\pi/3$ 积分得到。
:::

因子 $\omega^4$ 支配着其后的一切。把振幅固定的偶极子的频率加倍，其辐射功率变为十六倍。

当源的电偶极矩为零，或因对称性而被禁戒时，更高级的项便取而代之。振荡的**磁偶极子** $m_0\cos\omega t$ 辐射 $\langle P\rangle = \mu_0m_0^2\omega^4/(12\pi c^3)$，角分布同样是 $\sin^2\theta$，只是 $\mathbf E$ 与 $\mathbf B$ 互换角色。对尺寸为 $d$、电流为 $I$ 的回路，$m\sim Id^2$，而尺寸可比的天线的电偶极矩为 $p\sim Id/\omega$，于是磁与电的功率之比量级为 $(\omega d/c)^2 = (kd)^2\ll1$：磁偶极与电四极辐射比电偶极辐射弱源尺寸与波长之比的平方倍。

::: remark 近区与辐射区
上面的命题只描述辐射区。在偶极子附近 $d\ll r\ll\lambda$ 处，推迟效应可以忽略，场就是 [[electrodynamics/electrostatics#eq-dipole-field]] 的准静态偶极场，随 $\mathbf p(t)$ 同步振荡并按 $1/r^3$ 衰减；它的能量每个周期来回流动而不逃逸。两种区域在 $r\sim\lambda/2\pi$ 处衔接，那里完整解的 $1/r^3$、$1/r^2$ 与 $1/r$ 三项量级相当。RFID 标签或无线手机充电器工作在近区，靠准静态场耦合；无线电链路则工作在辐射区。
:::

::: widget parametric
fx: sin(t)^3
fy: sin(t)^2*cos(t)
t: 0, 2pi
caption: 偶极辐射方向图 $\sin^2\theta$ 的极坐标图：给定方向上原点到曲线的距离正比于该方向单位立体角辐射的功率，偶极子沿竖直轴。跟着动点走一圈：曲线在上下两端（$\theta = 0, \pi$）穿过原点，那里什么都不辐射，在两侧最宽。三维的方向图就是把这幅图绕竖直轴旋转而得——一个没有洞的面包圈。注意瓣有多宽：在 $\theta = 45^\circ$ 处就已达到峰值强度的一半。
:::

## 天线与辐射电阻 {#antenna}

天线是一根导体，驱动电流在其中使电荷加速。最简单的模型是**赫兹偶极子**：一段长 $l\ll\lambda$ 的短导线，载均匀电流 $I(t) = I_0\cos\omega t$，电荷 $\pm q(t)$ 堆积在两端的电容板上。于是 $\dd q/\dd t = I$，偶极矩为 $p = ql$，$\dot p = Il$，故 $p_0\omega = I_0l$。由 [[#eq-dipole-power]]，

$$
\langle P\rangle = \frac{\mu_0I_0^2l^2\omega^2}{12\pi c}.
$$

从馈源看过去，这些功率离开电路的方式，与电阻中耗散的功率完全一样：$\langle P\rangle = \frac12I_0^2R$。

::: definition 辐射电阻 {#def-rrad}
天线的**辐射电阻**是这样定义的电阻 $R_{\mathrm{rad}}$：在馈电端通过相同幅度的电流时，它耗散的功率恰等于辐射功率：$\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}}$。对赫兹偶极子，

$$
R_{\mathrm{rad}} = \frac{\mu_0\omega^2l^2}{6\pi c} = \frac{2\pi}{3}Z_0\left(\frac{l}{\lambda}\right)^2\approx789\,\Omega\left(\frac{l}{\lambda}\right)^2 .
$$ {#eq-rrad}
:::

中心馈电的真实短偶极子，其电流向两端线性减小到零，平均电流只有馈电电流的一半，辐射电阻是 [[#eq-rrad]] 的四分之一，约 $197(l/\lambda)^2\,\Omega$。无论如何，短天线都是糟糕的辐射体：辐射电阻与导线的欧姆电阻相比微乎其微，输入功率的大部分只把导线加热。

::: example 汽车收音机天线 {#ex-car}
一根 $1.00\,\mathrm{m}$ 长的天线用于 $1.00\,\mathrm{MHz}$ 的中波段。按赫兹偶极子求它的辐射电阻。若其欧姆电阻为 $0.50\,\Omega$，用它发射时，馈入功率的多大份额会被辐射出去？
::: solution
波长 $\lambda = c/f = 300\,\mathrm{m}$，故 $l/\lambda = 3.33\times10^{-3}$，由 [[#eq-rrad]]，

$$
R_{\mathrm{rad}} = 789\,\Omega\times(3.33\times10^{-3})^2 = 8.77\times10^{-3}\,\Omega .
$$

若取真实短天线的三角形电流分布，数值还要小约四倍，为 $2.2\,\mathrm{m\Omega}$。辐射份额为 $R_{\mathrm{rad}}/(R_{\mathrm{rad}} + R_{\mathrm{ohm}}) = 0.00877/0.509 = 1.7\%$（理想化值），真实天线还要更低。作为接收天线它依然有用，因为接收机需要的是远高于噪声的信号，而不是效率。这些频段的广播发射台使用四分之一波长高的铁塔，约 $75\,\mathrm{m}$。
:::
:::

::: example 广播发射机 {#ex-broadcast}
一台 $50.0\,\mathrm{kW}$ 的中波发射机用一短竖直天线辐射，方向图为偶极子的 $\sin^2\theta$。忽略地面的影响，求 $10.0\,\mathrm{km}$ 外地面上的强度与电场幅度。
::: solution
由 [[#eq-dipole-intensity]]，强度正比于 $\sin^2\theta$，它对全方向的平均为 $\frac{1}{4\pi}\cdot\frac{8\pi}{3} = \frac23$。因此水平面内的强度是各向同性值的 $\frac32$ 倍：

$$
\langle S\rangle = \frac32\cdot\frac{P}{4\pi r^2} = \frac{1.5(5.00\times10^{4})}{4\pi(1.00\times10^{4})^2} = 5.97\times10^{-5}\,\mathrm{W/m^2}.
$$

幅度由 $\langle S\rangle = \frac12c\varepsilon_0E_0^2$ 得出：$E_0 = \sqrt{2(5.97\times10^{-5})/((2.998\times10^{8})(8.854\times10^{-12}))} = 0.212\,\mathrm{V/m}$，方均根场为 $0.150\,\mathrm{V/m}$。一台带 $1\,\mathrm{m}$ 天线的接收机能拾取不到一伏的电压，对收音机绰绰有余。因子 $\frac32$ 是短偶极子的**方向性**；半波偶极子的为 $1.64$。
:::
:::

::: quiz
一支短天线以相同的电流幅度、两倍的频率驱动。它的辐射功率变为多少倍？
- [ ] 不变。
- [x] 增大四倍。
- [ ] 增大十六倍。
- [ ] 减半。
::: solution
电流幅度 $I_0$ 固定时，偶极矩幅度为 $p_0 = I_0l/\omega$，故 $p_0^2\omega^4 = I_0^2l^2\omega^2$，功率按 $\omega^2$ 增长，即 $4$ 倍。等价地说，$R_{\mathrm{rad}}\propto(l/\lambda)^2$ 变为四倍。十六倍适用于偶极矩幅度固定的情形，例如光驱动下的原子。
:::
:::

天线不短时，电流不再均匀，必须带上相位把它的不同部分的推迟贡献加起来。对总长 $\lambda/2$、中心馈电的**半波偶极子**，导线上的电流为 $I_0\cos kz$，远场为

$$
E = \frac{Z_0I_0}{2\pi r}\,\frac{\cos\bigl(\frac\pi2\cos\theta\bigr)}{\sin\theta},
$$

其方向图比 $\sin\theta$ 稍向赤道方向集中。把强度在球面上积分，得辐射电阻 $\frac{Z_0}{4\pi}\int_0^{2\pi}\frac{1 - \cos u}{u}\,\dd u = 73.1\,\Omega$（Jackson §9.4）。这一数值接近标准电缆的 $50$ 与 $75\,\Omega$ 阻抗，这是半波偶极子成为无线电工程标准天线的理由之一。

## 散射与蓝天 {#scattering}

一列波打在原子或分子上会驱动其中的电子，电子再辐射。这辐射从入射光束中拿走能量并送往其他方向：这就是**散射**。像 [[electrodynamics/waves-in-media]] 中那样，把束缚电子建模为固有频率 $\omega_0$ 的振子，并忽略阻尼。场 $E_0\cos\omega t$ 把它驱动到 $x = -\frac{eE_0}{m_e(\omega_0^2 - \omega^2)}\cos\omega t$，即振幅 $p_0 = \frac{e^2E_0}{m_e(\omega_0^2-\omega^2)}$ 的偶极子。

::: proposition 束缚电子的散射截面 {#prop-scatter}
时间平均散射功率与入射强度之比为

$$
\sigma(\omega) = \sigma_T\frac{\omega^4}{(\omega_0^2 - \omega^2)^2}, \qquad \sigma_T = \frac{8\pi}{3}r_e^2 = 6.652\times10^{-29}\,\mathrm{m^2},
$$ {#eq-scatter}

其中 $r_e = e^2/(4\pi\varepsilon_0m_ec^2)$。对自由电子（$\omega_0 = 0$），这就是与频率无关的**汤姆孙截面** $\sigma_T$。远在共振之下（$\omega\ll\omega_0$），它就是**瑞利**定律 $\sigma\approx\sigma_T(\omega/\omega_0)^4$。
:::

::: proof
由 [[#eq-dipole-power]]，散射功率为 $\frac{\mu_0\omega^4}{12\pi c}\frac{e^4E_0^2}{m_e^2(\omega_0^2-\omega^2)^2}$。入射强度为 $\frac12c\varepsilon_0E_0^2$。相除，并用 $\mu_0 = 1/(\varepsilon_0c^2)$，

$$
\sigma = \frac{e^4}{6\pi\varepsilon_0^2m_e^2c^4}\frac{\omega^4}{(\omega_0^2-\omega^2)^2} = \frac{8\pi}{3}\left(\frac{e^2}{4\pi\varepsilon_0m_ec^2}\right)^2\frac{\omega^4}{(\omega_0^2-\omega^2)^2}.
$$

数值上，$r_e = 2.818\times10^{-15}\,\mathrm{m}$，且 $\frac{8\pi}{3}r_e^2 = 6.652\times10^{-29}\,\mathrm{m^2}$。
:::

::: widget plot
f: x^4/((1 - x^2)^2 + (g*x)^2); 1
x: 0, 3
y: 0, 4
sliders: g=0.3:0.05:1:0.01
labels: σ/σ_T; 汤姆孙极限
caption: 束缚电子的散射截面（以 $\sigma_T$ 为单位）对 $\omega/\omega_0$ 的曲线，加了阻尼 $g = \gamma/\omega_0$ 使共振保持有限。最左端曲线按 $\omega^4$ 上升：瑞利散射——可见光遇到的空气分子，其共振在紫外。在 $\omega = \omega_0$ 处达到峰值，高度约 $1/g^2$，这就是共振荧光。高频端它落到水平线上：电子不再感到束缚，像自由电子一样散射 X 射线。减小 $g$，看峰变得尖锐。
:::

$\mathrm{N_2}$ 与 $\mathrm{O_2}$ 的电子共振位于远紫外、靠近 $100\,\mathrm{nm}$ 处，所以可见光处于瑞利区。波长 $450\,\mathrm{nm}$ 的蓝光比 $700\,\mathrm{nm}$ 的红光被散射得多

$$
\left(\frac{700}{450}\right)^4 = 5.86 .
$$

倍。背对太阳看去，我们看到的是散射光，富含蓝色：天空是蓝的。地平线附近看太阳，光穿过一条长长的空气路径，我们看到蓝光被散射掉之后剩下的部分：落日是红的。天空不是紫的——尽管紫光被散射得更多——因为阳光中紫光比蓝光少，而眼睛对紫光的灵敏度又低得多。被散射 $90^\circ$ 的光强烈偏振，因为非偏振阳光所驱动的偶极子沿垂直于入射光束的方向振荡，而这些振荡中只有垂直于视线方向的分量才会朝观察者辐射。

::: application 偏振的天空
对各向同性分子的单次散射，在与太阳成散射角 $\Theta$ 的方向上看到的天空光偏振度为 $\sin^2\Theta/(1 + \cos^2\Theta)$：朝太阳或背向太阳看为零，$\Theta = 90^\circ$ 时为完全偏振。真实晴空最好也不过约 $75\%$，因为有些光被散射了不止一次，地面也有反射，而 $\mathrm{N_2}$ 与 $\mathrm{O_2}$ 略为各向异性。摄影师用偏振滤镜利用这一现象——滤镜在与太阳成直角的方向上把天空压得最暗；蜜蜂则靠偏振分布导航，即使太阳藏在云后也能定出它的方位。
:::

::: warning 瑞利散射不等于“小粒子散射蓝光”
瑞利定律需要两个条件：散射体远小于波长，以致每一个都表现得像一个偶极子；并且彼此独立，以致强度可以相加。分子的均匀晶体几乎不向侧面散射什么，因为相邻分子发出的波相消干涉；空气中发生散射的是每个小体积内分子数目的*随机涨落*，而散射强度之所以正比于平均分子数，只是因为空气是理想气体。云滴远大于波长，对各颜色的散射几乎相同，所以云是白的。
:::

::: history 辐射，1867–1900
路德维格·洛伦兹（Ludvig Lorenz，1867）在他关于光的电磁理论中引入了推迟势；伯恩哈德·黎曼（Bernhard Riemann）早在 1858 年就提出过推迟的标量势，1867 年作为遗著发表。海因里希·赫兹（Heinrich Hertz）1887–88 年在卡尔斯鲁厄用火花隙偶极子产生并探测到电磁波，并于 1889 年计算了振荡偶极子的场，即本讲的“赫兹偶极子”。约翰·廷德尔（John Tyndall）在 1860 年代研究了精细悬浮液散射的蓝光；瑞利勋爵（Lord Rayleigh）1871 年解释了 $\lambda^{-4}$ 定律，并在 1899 年把它与分子散射联系起来。约瑟夫·拉莫尔（Joseph Larmor）1897 年得到加速电荷辐射的功率。阿尔弗雷德-马里·李纳（Alfred-Marie Liénard，1898）与埃米尔·维谢尔（Emil Wiechert，1900）各自独立地导出了任意运动点电荷的势，李纳还给出了相对论正确形式的总功率。J. J. 汤姆孙 1906 年导出了自由电子的散射截面，并用它从 X 射线散射估计原子中的电子数。古列尔莫·马可尼（Guglielmo Marconi）1901 年 12 月的跨大西洋信号把赫兹的波变成了技术。
:::

## 后续内容 {#leads}

匀速运动电荷的李纳–维谢尔场，将在 [[electrodynamics/relativistic-fields]] 中由洛伦兹加速更简单地重新导出，在那里拉莫尔公式成为洛伦兹不变量。[[#eq-lienard]] 中的 $\gamma^4$ 与 $\gamma^6$ 因子限制了电子环形对撞机的能量，也使同步辐射光源成为可能（[[particles/accelerators]]）。在量子力学中偶极公式重新出现——$p_0$ 换成矩阵元——成为激发态原子自发辐射的速率，而 [[#ex-collapse]] 中的经典坍缩被稳定的定态取代（[[quantum-2]]）。汤姆孙散射决定了恒星内部与早期宇宙的不透明度，早期宇宙的最后散射面今天作为宇宙微波背景被我们观测到。

::: summary
- 在洛伦兹规范下势是推迟积分：每个源元都像静态时那样贡献，只是取值于 $t_r = t - \lvert\mathbf r-\mathbf r'\rvert/c$。
- 点电荷有李纳–维谢尔势 $V = q/[4\pi\varepsilon_0\mathcal R(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)]$ 与 $\mathbf A = \mathbf vV/c^2$；它的场分成速度部分 $\propto1/\mathcal R^2$ 与加速部分 $\propto1/\mathcal R$。
- 只有 $1/\mathcal R$ 部分辐射。$v\ll c$ 时它给出拉莫尔公式 $P = q^2a^2/(6\pi\varepsilon_0c^3)$，角分布为绕 $\mathbf a$ 的 $\sin^2\theta$；相对论下功率按 $\gamma^4$ 或 $\gamma^6$ 增长。
- 小振荡偶极子 $p_0\cos\omega t$ 按 $\sin^2\theta$ 方向图辐射 $\langle P\rangle = \mu_0p_0^2\omega^4/(12\pi c)$；关键在 $\omega^4$。
- 天线的辐射电阻由 $\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}}$ 定义：短均匀偶极子约 $789(l/\lambda)^2\,\Omega$，半波偶极子 $73\,\Omega$。
- 束缚电子的散射截面为 $\sigma = \sigma_T\omega^4/(\omega_0^2-\omega^2)^2$；共振以下是使天空变蓝的 $\lambda^{-4}$ 瑞利定律，共振以上则是汤姆孙截面 $6.65\times10^{-29}\,\mathrm{m^2}$。
- 按经典辐射理论，原子会在约 $10^{-11}\,\mathrm{s}$ 内坍缩，这是通向量子力学的失败之一。
:::

## 习题 {#exercises}

::: exercise 电子的拉莫尔功率 {level=1 check="5.71"}
某时刻电子的速度很小而加速度为 $1.00\times10^{18}\,\mathrm{m/s^2}$。求它辐射的功率，以 $10^{-18}\,\mathrm{W}$ 为单位。
::: solution
由 [[#eq-larmor]]，$P = \frac{e^2a^2}{6\pi\varepsilon_0c^3} = \frac{(1.602\times10^{-19})^2(1.00\times10^{18})^2}{6\pi(8.854\times10^{-12})(2.998\times10^{8})^3} = 5.71\times10^{-18}\,\mathrm{W}$。单个电子即使加速度很大也辐射无几；[[#ex-collapse]] 中的经典原子辐射之所以强，是因为它的加速度大 $10^{5}$ 倍，而功率按 $a^2$ 变化。
:::
:::

::: exercise 一支短天线 {level=1 check="8.77"}
求一支长 $1.00\,\mathrm{m}$ 的赫兹偶极子在 $1.00\,\mathrm{MHz}$ 下的辐射电阻（以 $\mathrm{m\Omega}$ 为单位），以及在 $10.0\,\mathrm{MHz}$ 下它增大多少倍。
::: solution
由 [[#ex-car]]，$R_{\mathrm{rad}} = 789\,\Omega\times(1.00/300)^2 = 8.77\,\mathrm{m\Omega}$。由于 $R_{\mathrm{rad}}\propto(l/\lambda)^2\propto f^2$，在 $10.0\,\mathrm{MHz}$ 下它大 $100$ 倍，为 $0.877\,\Omega$；那里的天线仍然很短（$\lambda = 30\,\mathrm{m}$），公式依然适用。
:::
:::

::: exercise 蓝光与红光 {level=1 check="5.86"}
波长 $450\,\mathrm{nm}$ 的光被空气分子散射的强度是 $700\,\mathrm{nm}$ 的光的多少倍？为什么可以在 [[#eq-scatter]] 中把 $\omega$ 相对 $\omega_0$ 忽略？
::: solution
瑞利极限下 $\sigma\propto\omega^4\propto\lambda^{-4}$，比值为 $(700/450)^4 = 5.86$。氮与氧的共振在 $100\,\mathrm{nm}$ 附近，所以蓝光处 $(\omega/\omega_0)^2\approx(100/450)^2 = 0.05$；修正因子 $(1 - \omega^2/\omega_0^2)^{-2}$ 对蓝光约为 $1.1$，对红光约为 $1.04$，只是对 $5.86$ 的一点小修正。
:::
:::

::: exercise 氢原子的经典寿命 {level=2 check="1.56"}
导出 [[#ex-collapse]] 的坍缩时间 $t = a_0^3/(4r_e^2c)$，并以 $10^{-11}\,\mathrm{s}$ 为单位求值。验证直到 $r$ 只剩 $a_0$ 的一个小分数之前，电子一直保持非相对论性。
::: solution
推导见 [[#ex-collapse]]：$r^2\dot r = -\frac43r_e^2c$，故 $\frac13a_0^3 = \frac43r_e^2c\,t$，$t = a_0^3/(4r_e^2c) = 1.56\times10^{-11}\,\mathrm{s}$。圆轨道下 $v^2 = e^2/(4\pi\varepsilon_0m_er) = r_ec^2/r$，所以 $v/c = \sqrt{r_e/r}$。在 $r = a_0$ 处，$v/c = \sqrt{2.818\times10^{-15}/5.29\times10^{-11}} = 7.3\times10^{-3}$，正是精细结构常数。直到 $r = 100r_e = 2.8\times10^{-13}\,\mathrm{m}$，速度才达到 $0.1c$，而由于 $t\propto r^3$，那时螺旋过程的几乎全部时间已经走完。
:::
:::

::: exercise 半波偶极子发射机 {level=2 check="36.5"}
半波偶极子（$R_{\mathrm{rad}} = 73.1\,\Omega$）通以幅度 $1.00\,\mathrm{A}$ 的电流。求辐射功率（以瓦计），以及赤道面内 $1.00\,\mathrm{km}$ 处电场的幅度。
::: solution
$\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}} = \frac12(1.00)^2(73.1) = 36.5\,\mathrm{W}$。赤道面内 $\theta = 90^\circ$，方向图因子为 $1$，所以 $E = Z_0I_0/(2\pi r) = 376.7/(2\pi\times1000) = 0.0600\,\mathrm{V/m}$。作为比较，赫兹偶极子在侧射方向的强度是其全方向平均的 $1.5$ 倍（$90^\circ$ 处的因子 $\sin^2\theta$ 除以其平均值 $\frac23$），半波偶极子的相应值为 $1.64$；辐射功率相同时，半波偶极子侧射方向的场强强 $\sqrt{1.64/1.5} = 1.05$ 倍。
:::
:::

::: exercise 对撞机中每圈损失的能量 {level=2 check="2.85"}
能量 $100\,\mathrm{GeV}$ 的电子在弯曲半径 $\rho = 3.10\,\mathrm{km}$ 的圆上运动。在 [[#eq-lienard]] 中取 $\mathbf a\perp\mathbf v$、$v\approx c$，证明每圈辐射的能量为 $U_0 = e^2\gamma^4/(3\varepsilon_0\rho)$，并以 GeV 求值。
::: solution
圆周运动下 $a = v^2/\rho\approx c^2/\rho$，[[#eq-lienard]] 中取 $\lvert\mathbf v\times\mathbf a\rvert = va$ 给出 $P = \frac{e^2\gamma^6a^2}{6\pi\varepsilon_0c^3}(1 - \beta^2) = \frac{e^2\gamma^4a^2}{6\pi\varepsilon_0c^3} = \frac{e^2\gamma^4c}{6\pi\varepsilon_0\rho^2}$。一圈耗时 $2\pi\rho/c$，故 $U_0 = \frac{e^2\gamma^4}{3\varepsilon_0\rho}$。由 $\gamma = E/(m_ec^2) = 100\,\mathrm{GeV}/0.511\,\mathrm{MeV} = 1.957\times10^{5}$，

$$
U_0 = \frac{(1.602\times10^{-19})^2(1.957\times10^{5})^4}{3(8.854\times10^{-12})(3100)} = 4.57\times10^{-10}\,\mathrm{J} = 2.85\,\mathrm{GeV}.
$$

每转一圈，都要由射频腔补回束流能量的近 $3\%$。同样能量的质子，$\gamma$ 小 $m_p/m_e = 1836$ 倍，损失少 $1836^4\approx10^{13}$ 倍——这就是能量最高的环形对撞机加速质子的原因。
:::
:::

::: exercise 爱丁顿光度 {level=2 check="1.26"}
恒星的光通过汤姆孙散射推压其电离外层的自由电子，电子又靠静电力把质子一起拖着走。证明对完全电离的氢，辐射压与引力平衡时的光度为 $L_{\mathrm{Edd}} = 4\pi GMm_pc/\sigma_T$，并对一个太阳质量（$M = 1.989\times10^{30}\,\mathrm{kg}$，$G = 6.674\times10^{-11}\,\mathrm{N\,m^2/kg^2}$）以 $10^{31}\,\mathrm{W}$ 为单位求值。
::: solution
在距离 $r$ 处能流为 $L/(4\pi r^2)$，动量流为 $L/(4\pi r^2c)$。电子以 $\sigma_T$ 乘动量流的速率从光束中获得动量（汤姆孙散射前后对称，所以平均而言散射光不带走向前的动量），于是每个电子受到向外的力 $\sigma_TL/(4\pi r^2c)$。引力主要作用在质子上，$GMm_p/r^2$。两者都按 $1/r^2$ 衰减，平衡时

$$
L_{\mathrm{Edd}} = \frac{4\pi GMm_pc}{\sigma_T} = \frac{4\pi(6.674\times10^{-11})(1.989\times10^{30})(1.673\times10^{-27})(2.998\times10^{8})}{6.652\times10^{-29}} = 1.26\times10^{31}\,\mathrm{W},
$$

约为太阳光度的 $33\,000$ 倍。单位质量光度远大于此的恒星会吹散自己的外层；观测表明，正在吸积的黑洞与中子星的光度至多大致达到这一极限。
:::
:::

::: exercise 空气有多透明？ {level=2 check="0.0967"}
空气分子在 $550\,\mathrm{nm}$ 的瑞利截面约 $4.5\times10^{-31}\,\mathrm{m^2}$。利用海平面压强 $1.013\times10^{5}\,\mathrm{Pa}$、平均分子质量 $28.97\,\mathrm{u}$ 与 $g = 9.80\,\mathrm{m/s^2}$，求每方米地面上方的分子数，以及 $550\,\mathrm{nm}$ 竖直入射光的光学厚度 $\tau$。再估计 $450\,\mathrm{nm}$ 处的 $\tau$。
::: solution
空气柱的重量平衡压强，所以柱密度为 $N = p/(mg) = 1.013\times10^{5}/((28.97\times1.661\times10^{-27})(9.80)) = 2.15\times10^{29}\,\mathrm{m^{-2}}$。光学厚度为 $\tau = N\sigma = (2.15\times10^{29})(4.5\times10^{-31}) = 0.0967$，即约 $9\%$ 的绿色阳光被散射出竖直光束（透过率 $e^{-0.0967} = 0.908$）。$450\,\mathrm{nm}$ 处 $\tau$ 大 $(550/450)^4 = 2.23$ 倍，得 $0.216$。日落时穿过的空气路径大约长四十倍，蓝光的 $\tau$ 量级为 $9$，直射路径上几乎留不下蓝光：落日是红的。
:::
:::

::: exercise 推迟势满足洛伦兹条件 {level=3}
证明：只要 $\partial_t\rho + \nabla\cdot\mathbf J = 0$，推迟势 [[#eq-retarded]] 就满足 $\nabla\cdot\mathbf A + c^{-2}\partial_tV = 0$。
::: hint
记 $R = \lvert\mathbf r-\mathbf r'\rvert$。被积函数中，$\mathbf J(\mathbf r', t - R/c)$ 只通过 $R$ 依赖 $\mathbf r$，而对 $\mathbf r'$ 既有显式依赖又通过 $R$ 依赖。比较 $\nabla\cdot[\mathbf J/R]$ 与 $\nabla'\cdot[\mathbf J/R]$，并利用 $\nabla'R = -\nabla R$。
:::
::: solution
记 $\dot{\mathbf J} = \partial\mathbf J/\partial t$ 取在 $(\mathbf r', t_r)$ 处，$(\nabla'\cdot\mathbf J)$ 表示对第一个变量在固定时刻取的散度。由于 $\nabla t_r = -\nabla R/c$ 且 $\nabla' t_r = -\nabla'R/c = \nabla R/c$，

$$
\nabla\cdot\mathbf J(\mathbf r', t_r) = -\frac1c\dot{\mathbf J}\cdot\nabla R, \qquad \nabla'\cdot\mathbf J(\mathbf r', t_r) = (\nabla'\cdot\mathbf J) + \frac1c\dot{\mathbf J}\cdot\nabla R = -\dot\rho + \frac1c\dot{\mathbf J}\cdot\nabla R ,
$$

最后一步用了连续性方程。两式相加，$\nabla\cdot\mathbf J(\mathbf r', t_r) = -\nabla'\cdot\mathbf J(\mathbf r', t_r) - \dot\rho(\mathbf r', t_r)$。又有 $\nabla(1/R) = -\nabla'(1/R)$。于是

$$
\nabla\cdot\frac{\mathbf J}{R} = \mathbf J\cdot\nabla\frac1R + \frac1R\nabla\cdot\mathbf J = -\mathbf J\cdot\nabla'\frac1R - \frac1R\nabla'\cdot\mathbf J - \frac{\dot\rho}{R} = -\nabla'\cdot\frac{\mathbf J}{R} - \frac{\dot\rho}{R}.
$$

对 $\mathbf r'$ 积分。全散度项化为一个面积分，把曲面取在局域化源之外，其值即为零。所以

$$
\nabla\cdot\mathbf A = -\frac{\mu_0}{4\pi}\int\frac{\dot\rho(\mathbf r', t_r)}{R}\,\dd\tau' = -\mu_0\varepsilon_0\frac{\partial}{\partial t}\left[\frac{1}{4\pi\varepsilon_0}\int\frac{\rho(\mathbf r', t_r)}{R}\,\dd\tau'\right] = -\frac{1}{c^2}\frac{\partial V}{\partial t},
$$

因为在固定 $\mathbf r$ 与 $\mathbf r'$ 处，$\partial_t$ 作用在 $\rho(\mathbf r', t - R/c)$ 上就是 $\dot\rho$。这正是洛伦兹条件。
:::
:::

::: exercise 车头灯效应 {level=3 check="13.4"}
沿速度方向加速的电荷，单位立体角辐射的功率正比于 $\sin^2\theta/(1 - \beta\cos\theta)^5$，$\theta$ 从速度方向量起。求辐射最强的角度，并对 $\beta = 0.900$ 以度为单位求值。
::: solution
令 $x = \cos\theta$，$f(x) = (1 - x^2)(1 - \beta x)^{-5}$。则

$$
f'(x) = -2x(1-\beta x)^{-5} + 5\beta(1-x^2)(1-\beta x)^{-6} = \frac{-2x(1 - \beta x) + 5\beta(1 - x^2)}{(1-\beta x)^6}.
$$

令分子为零，$3\beta x^2 + 2x - 5\beta = 0$，故 $x = \frac{-2 + \sqrt{4 + 60\beta^2}}{6\beta} = \frac{\sqrt{1 + 15\beta^2} - 1}{3\beta}$，取满足 $\lvert x\rvert\le1$ 的根。$\beta = 0.900$ 时，$\sqrt{1 + 12.15} = 3.6263$，故 $x = 2.6263/2.700 = 0.9727$，$\theta_{\max} = 13.4^\circ$。$\beta\to0$ 时 $x\to0$，极大在 $90^\circ$，即拉莫尔方向图；$\beta\to1$ 时 $\theta_{\max}\approx1/(2\gamma)$，辐射被甩向前方一个窄锥。同步加速器中的超高能电子把光沿与轨道相切、半角约 $1/\gamma$ 的锥发出。
:::
:::
