[[statistical-mechanics/quantum-statistics]] 的两个分布只差一个符号。本章讲这个符号在占据数不小的时候做了什么。四个系统担起全部论证。热空腔里的光子是粒子数不守恒的玻色子；数它们得到普朗克辐射定律，进而由 $h$、$c$、$k_B$ 给出斯特藩-玻尔兹曼常数。晶体的振动是同类玻色子，德拜模型解释了为什么一切固体的热容在低温都按 $T^3$ 下降。金属中的电子是费米子，密度高到即使在绝对零度也把轨道填到几电子伏；同样的物理，密度再大一百万倍，撑住了白矮星。最后是玻色子原子气体，冷得足够低时，会把宏观比例的自身放进同一个轨道：玻色-爱因斯坦凝聚，1925 年预言，1995 年实现。

四个计算都是上一章搭好的形状。态密度 $D(\varepsilon)$ 乘以占据数 $\bar n(\varepsilon)$，积分后给出粒子数与能量。常数取 SI 的精确值 $h = 6.62607015\times10^{-34}\,\mathrm{J\,s}$、$c = 299792458\,\mathrm{m/s}$、$k_B = 1.380649\times10^{-23}\,\mathrm{J/K}$，以及 CODATA 2018 值 $m_e = 9.1093837015\times10^{-31}\,\mathrm{kg}$ 与 $1\,\mathrm{u} = 1.66053906660\times10^{-27}\,\mathrm{kg}$。

## 黑体辐射 {#blackbody}

壁温保持 $T$ 的闭合空腔里充满与壁处于平衡的电磁辐射。空腔上的小孔像一个完美吸收体那样辐射，它就是**黑体**。空腔的每个模式——波矢 $\mathbf k$、两个偏振之一——都是角频率 $\omega = ck$ 的谐振子；等价地，它是能量为 $\hbar\omega$ 的光子的一个轨道。光子被壁吸收又被发射，粒子数不守恒，而且正如 [[statistical-mechanics/quantum-statistics]] 所证，其化学势为零。每个模式的平均光子数为

$$
\bar n(\omega) = \frac{1}{e^{\hbar\omega/k_BT} - 1}.
$$

光子的态密度由 [[statistical-mechanics/quantum-statistics]] 给出，$D(\varepsilon) = V\varepsilon^2/(\pi^2\hbar^3c^3)$；按单位角频率计则为 $V\omega^2/(\pi^2c^3)$。

::: theorem 普朗克定律 {#thm-planck}
温度 $T$ 的黑体辐射，单位体积、单位角频率的能量为

$$
u(\omega) = \frac{\hbar}{\pi^2c^3}\,\frac{\omega^3}{e^{\hbar\omega/k_BT} - 1}.
$$ {#eq-planck}

按频率 $\nu = \omega/2\pi$ 与按波长 $\lambda = c/\nu$ 计，同一定律写作

$$
u_\nu(\nu) = \frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{h\nu/k_BT} - 1}, \qquad u_\lambda(\lambda) = \frac{8\pi hc}{\lambda^5}\,\frac{1}{e^{hc/\lambda k_BT} - 1}.
$$ {#eq-planck-lambda}
:::

::: proof
角频率落在 $[\omega, \omega + \dd\omega]$ 内的模式数为 $V\omega^2\,\dd\omega/(\pi^2c^3)$，每个平均装着 $\bar n(\omega)$ 个能量为 $\hbar\omega$ 的光子。除以 $V$，

$$
u(\omega)\,\dd\omega = \frac{\omega^2}{\pi^2c^3}\cdot\hbar\omega\cdot\frac{1}{e^{\hbar\omega/k_BT} - 1}\,\dd\omega,
$$

即 [[#eq-planck]]。其余形式：$u_\nu\,\dd\nu = u(\omega)\,\dd\omega$，其中 $\dd\omega = 2\pi\,\dd\nu$、$\hbar\omega^3 = (h/2\pi)(2\pi\nu)^3$，即得 $u_\nu = 8\pi h\nu^3/c^3\times\bar n$。类似地 $u_\lambda\,\lvert\dd\lambda\rvert = u_\nu\,\dd\nu$，其中 $\lvert\dd\nu/\dd\lambda\rvert = c/\lambda^2$。
:::

低频时 $\hbar\omega \ll k_BT$，分母为 $\hbar\omega/k_BT$，$u(\omega) \approx \omega^2k_BT/(\pi^2c^3)$：每个模式带着经典能量 $k_BT$，这就是**瑞利-金斯（Rayleigh–Jeans）定律**。对全频段积分它发散，即经典物理的"紫外灾难"。一旦 $\hbar\omega \gtrsim k_BT$，普朗克定律就把积分指数截断，因为高频模式像 [[statistical-mechanics/canonical]] 里氮分子的振动一样被冻结了。

::: proposition 维恩位移定律 {#prop-wien}
$u_\lambda$ 取最大的波长满足 $\lambda_{\max}T = b$，其中

$$
b = \frac{hc}{x_\lambda k_B} = 2.898\times10^{-3}\,\mathrm{m\,K}, \qquad x_\lambda = 4.965114\ldots,
$$

这里 $x_\lambda$ 是 $x = 5(1 - e^{-x})$ 的正根。$u_\nu$ 取最大的频率满足 $h\nu_{\max} = x_\nu k_BT$，其中 $x_\nu = 2.821439\ldots$ 是 $x = 3(1 - e^{-x})$ 的正根。
:::

::: proof
令 $x = hc/\lambda k_BT$，固定 $T$ 时 $u_\lambda \propto x^5/(e^x - 1)$。令 $5\ln x - \ln(e^x - 1)$ 的导数为零，得 $5/x = e^x/(e^x - 1)$，即 $x = 5(1 - e^{-x})$。函数 $5(1 - e^{-x}) - x$ 在 $x = 1$ 为正、$x = 6$ 为负，二分法得 $4.965114$。于是 $b = hc/(4.965114\,k_B) = 2.8978\times10^{-3}\,\mathrm{m\,K}$。频率形式把 $x^5$ 换成 $x^3$，其余相同。
:::

两个峰并不对应：$c/\nu_{\max} = 1.76\,\lambda_{\max}$，因为两个分布是关于不同变量的密度。"发射最强的颜色"不是辐射单独具有的性质。

::: lemma 一个玻色积分 {#lem-bose-integral}
$$
\int_0^\infty\frac{x^3}{e^x - 1}\,\dd x = \frac{\pi^4}{15}.
$$
:::

::: proof
对 $x > 0$，$1/(e^x - 1) = e^{-x}/(1 - e^{-x}) = \sum_{j=1}^\infty e^{-jx}$。各项皆正，所以可以逐项积分：

$$
\int_0^\infty x^3\sum_je^{-jx}\,\dd x = \sum_j\int_0^\infty x^3e^{-jx}\,\dd x = \sum_j\frac{3!}{j^4} = 6\,\zeta(4).
$$

$\zeta(4) = \sum_jj^{-4} = \pi^4/90$ 是经典结果（欧拉，1735）；它可由 $x^4$ 在 $[-\pi, \pi]$ 上的傅里叶级数得出，也可如 [[math-methods/fourier]] 那样由 $x^2$ 级数的帕塞瓦尔（Parseval）恒等式得出。所以积分为 $6\pi^4/90 = \pi^4/15$。
:::

::: theorem 斯特藩-玻尔兹曼定律 {#thm-stefan}
黑体辐射的能量密度为 $u = aT^4$，黑体单位面积发射的功率为 $\sigma T^4$，其中

$$
a = \frac{\pi^2k_B^4}{15\hbar^3c^3}, \qquad \sigma = \frac{ac}{4} = \frac{2\pi^5k_B^4}{15h^3c^2}.
$$ {#eq-stefan}
:::

::: proof
对 [[#eq-planck]] 积分，取 $x = \hbar\omega/k_BT$，于是 $\omega = k_BTx/\hbar$、$\dd\omega = (k_BT/\hbar)\,\dd x$：

$$
u = \int_0^\infty u(\omega)\,\dd\omega = \frac{\hbar}{\pi^2c^3}\left(\frac{k_BT}{\hbar}\right)^4\int_0^\infty\frac{x^3}{e^x - 1}\,\dd x = \frac{k_B^4T^4}{\pi^2\hbar^3c^3}\cdot\frac{\pi^4}{15},
$$

用到 [[#lem-bose-integral]]。这就是 $aT^4$。

对穿过面积 $A$ 的小孔的通量：光子速率都是 $c$，方向均匀分布于球面。在 $\dd t$ 时间内，与法线成 $\theta$ 角运动并穿过小孔的光子，处在体积为 $Ac\cos\theta\,\dd t$ 的斜柱体内。用立体角权重 $\sin\theta\,\dd\theta\,\dd\phi/(4\pi)$ 在外半球上对 $\cos\theta$ 取平均，得

$$
\frac{1}{4\pi}\int_0^{2\pi}\dd\phi\int_0^{\pi/2}\cos\theta\sin\theta\,\dd\theta = \frac{1}{4\pi}\cdot2\pi\cdot\frac12 = \frac14,
$$

所以能量通量为 $\tfrac14uc$，$\sigma = ac/4$。由 $\hbar = h/2\pi$，$\pi^2/(15\hbar^3)\cdot c/4 = \pi^2(2\pi)^3/(60h^3)\cdot c = 2\pi^5c/(15h^3)$，再除以 $c^3$ 即得第二式。
:::

::: example 由基本常数算斯特藩-玻尔兹曼常数 {#ex-sigma}
由 [[#eq-stefan]] 算出 $\sigma$，并据此求太阳光度：把光球层当作温度 $5772\,\mathrm{K}$、半径 $6.957\times10^8\,\mathrm{m}$ 的黑体。再求发射最强的波长。
::: solution
用 SI 精确常数，

$$
\sigma = \frac{2\pi^5(1.380649\times10^{-23})^4}{15\,(6.62607015\times10^{-34})^3\,(299792458)^2} = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}.
$$

分子为 $2\times306.02\times3.6334\times10^{-92} = 2.2238\times10^{-89}$，分母为 $15\times2.9091\times10^{-100}\times8.9876\times10^{16} = 3.9218\times10^{-82}$。二者之商与 CODATA 值 $5.670374419\times10^{-8}$ 逐位相符，本应如此：自 2019 年起 $h$、$c$、$k_B$ 都是精确值，$\sigma$ 因而也是精确值。辐射常数为 $a = 4\sigma/c = 7.5657\times10^{-16}\,\mathrm{J\,m^{-3}\,K^{-4}}$。

太阳光度为

$$
L = 4\pi R^2\sigma T^4 = 4\pi(6.957\times10^8)^2\times5.6704\times10^{-8}\times(5772)^4 = 3.828\times10^{26}\,\mathrm{W},
$$

正是国际天文学联合会（IAU）的名义太阳光度；实际上 $5772\,\mathrm{K}$ 就是由那个光度与半径*定义*出来的有效温度。$u_\lambda$ 的峰在 $\lambda_{\max} = 2.8978\times10^{-3}/5772 = 5.02\times10^{-7}\,\mathrm{m}$，落在绿光波段。
:::
:::

::: widget plot
f: 4.5391/(x^5*(exp(14387.77/(x*T))-1))
x: 0.1, 3
y: 0, 5.5
sliders: T=5772:2500:8000:10
caption: 按波长表示的普朗克定律 $u_\lambda$，波长以微米计，纵向缩放使太阳（$T = 5772\,\mathrm{K}$）的峰为 $1$。把 $T$ 拖到 $3000\,\mathrm{K}$——钨丝的温度：峰移到 $0.97\,\mu\mathrm{m}$、进入红外，峰高降到 $1/26$，所以输出大多是热而不是光。拖到 $8000\,\mathrm{K}$：峰移向蓝端并升高五倍。峰高按 $T^5$ 标度，曲线下面积按 $T^4$ 标度。
:::

::: example 宇宙微波背景 {#ex-cmb}
宇宙充满温度 $T = 2.72548\,\mathrm{K}$ 的黑体辐射。求其光子数密度与能量密度。
::: solution
光子数密度为 $\int D(\varepsilon)\bar n\,\dd\varepsilon/V$。令 $x = \varepsilon/k_BT$，

$$
n_\gamma = \frac{1}{\pi^2}\left(\frac{k_BT}{\hbar c}\right)^3\int_0^\infty\frac{x^2}{e^x - 1}\,\dd x = \frac{2\zeta(3)}{\pi^2}\left(\frac{k_BT}{\hbar c}\right)^3,
$$

因为与 [[#lem-bose-integral]] 同样地，$\int_0^\infty x^2/(e^x - 1)\,\dd x = 2!\,\zeta(3)$，其中 $\zeta(3) = 1.2020569$。这里 $k_BT/(\hbar c) = 3.7629\times10^{-23}/3.1615\times10^{-26}\,\mathrm{m^{-1}} = 1190.2\,\mathrm{m^{-1}}$，其立方为 $1.6862\times10^{9}\,\mathrm{m^{-3}}$。于是

$$
n_\gamma = \frac{2\times1.2020569}{\pi^2}\times1.6862\times10^9\,\mathrm{m^{-3}} = 4.107\times10^8\,\mathrm{m^{-3}} = 411\,\mathrm{cm^{-3}}.
$$

能量密度为 $aT^4 = 7.5657\times10^{-16}\times(2.72548)^4 = 4.17\times10^{-14}\,\mathrm{J/m^3}$，约 $0.26\,\mathrm{eV/cm^3}$。平均光子能量 $u/n_\gamma = 2.70\,k_BT$。宇宙中每个质子对应大约十亿个光子；论数目辐射占绝对优势，尽管就今天的能量而言并非如此。
:::
:::

## 声子与德拜模型 {#debye}

$N$ 个原子的晶体有 $3N$ 个振动简正模（来自 [[analytical-mechanics/small-oscillations]]），每个都是一个谐振子。[[statistical-mechanics/microcanonical]] 的爱因斯坦模型给所有模式同一个频率，其热容在低温按指数下降。实测热容按 $T^3$ 下降，慢得多。区别在于真实的模式有一个频率分布，低频的那些——长波声波——永不冻结。

这些模式的量子就是**声子**。与光子一样，它们是 $\mu = 0$ 的玻色子，因为粒子数不守恒。长波下一个模式是满足 $\omega = v_sk$ 的声波；三个偏振（一纵两横），这里为简单计取共同声速 $v_s$，按 [[statistical-mechanics/quantum-statistics]] 的计数取 $g = 3$，得角频率态密度 $3V\omega^2/(2\pi^2v_s^3)$。但模式数是有限的。

::: definition 德拜模型 {#def-debye}
$N$ 个原子晶体的**德拜模型**在 $\omega$ 低于截断 $\omega_D$ 时用态密度 $D(\omega) = 3V\omega^2/(2\pi^2v_s^3)$，高于它则取零，$\omega_D$ 的选取使模式总数为 $3N$。**德拜温度**为 $\Theta_D = \hbar\omega_D/k_B$。截断条件 $\int_0^{\omega_D}D\,\dd\omega = 3N$ 给出

$$
\omega_D^3 = 6\pi^2\,\frac{N}{V}\,v_s^3.
$$
:::

::: theorem 德拜热容 {#thm-debye}
德拜模型的热容为

$$
C_V = 9Nk_B\left(\frac{T}{\Theta_D}\right)^3\int_0^{\Theta_D/T}\frac{x^4e^x}{(e^x - 1)^2}\,\dd x.
$$ {#eq-debye}

$T \gg \Theta_D$ 时 $C_V \to 3Nk_B$（杜隆-珀蒂）。$T \ll \Theta_D$ 时

$$
C_V = \frac{12\pi^4}{5}\,Nk_B\left(\frac{T}{\Theta_D}\right)^3.
$$ {#eq-debye-t3}
:::

::: proof
频率为 $\omega$ 的每个模式是一个谐振子，由 [[statistical-mechanics/canonical]]，其平均热能为 $\hbar\omega/(e^{\beta\hbar\omega} - 1)$（零点能不依赖 $T$，从 $C_V$ 中掉出）。把 $D(\omega)$ 写成 $9N\omega^2/\omega_D^3$，即代入截断条件后的定义。于是

$$
U - U_0 = \int_0^{\omega_D}\frac{9N\omega^2}{\omega_D^3}\,\frac{\hbar\omega}{e^{\beta\hbar\omega} - 1}\,\dd\omega.
$$

由 [[statistical-mechanics/microcanonical]]，单个谐振子的热容是 $k_Bx^2e^x/(e^x - 1)^2$，其中 $x = \hbar\omega/k_BT$。所以

$$
C_V = \int_0^{\omega_D}\frac{9N\omega^2}{\omega_D^3}\,k_B\frac{x^2e^x}{(e^x - 1)^2}\,\dd\omega.
$$

换元为 $x$：$\omega = k_BTx/\hbar$、$\omega_D = k_B\Theta_D/\hbar$，于是 $\omega^2\,\dd\omega/\omega_D^3 = (T/\Theta_D)^3x^2\,\dd x$。即得 [[#eq-debye]]。

高温：上限 $\Theta_D/T$ 小，被积函数近似为 $x^2$，积分为 $\tfrac13(\Theta_D/T)^3$，故 $C_V \to 3Nk_B$。

低温：上限趋于无穷，积分趋于常数。分部积分，

$$
\int_0^\infty\frac{x^4e^x}{(e^x - 1)^2}\,\dd x = \left[-\frac{x^4}{e^x - 1}\right]_0^\infty + \int_0^\infty\frac{4x^3}{e^x - 1}\,\dd x = 4\cdot\frac{\pi^4}{15},
$$

用到 [[#lem-bose-integral]]。乘以 $9Nk_B(T/\Theta_D)^3$ 即得 [[#eq-debye-t3]]。
:::

$T^3$ 定律之于声子，正如斯特藩-玻尔兹曼 $T^4$ 之于光子：低温只有 $\hbar\omega \lesssim k_BT$ 的模式被激发，其数目按 $T^3$ 增长，每个装着 $\sim k_BT$ 的能量。截断与色散关系的细节在那里无关紧要，要紧的只有声速。高温则只有模式总数要紧。德拜模型在两个它自己精确的极限之间插值，而在两者之间，对简单固体是相当好的近似。

::: widget plot
f: 3*x^3*sum(((k-0.5)/(200*x))^4*exp((k-0.5)/(200*x))/(exp((k-0.5)/(200*x))-1)^2, k, 1, 200)/(200*x); (0.8/x)^2*exp(0.8/x)/(exp(0.8/x)-1)^2; 1
x: 0.02, 1.5
y: 0, 1.1
labels: 德拜; 爱因斯坦, Θ_E = 0.8 Θ_D; 杜隆-珀蒂
caption: 热容除以 $3Nk_B$，对 $T/\Theta_D$ 作图：德拜模型（用 200 点中点和算出）与一个 $\Theta_E = 0.8\,\Theta_D$、高温与之相符的爱因斯坦模型。$T \approx \Theta_D$ 以上两者都接近经典值。$T/\Theta_D \approx 0.1$ 以下爱因斯坦曲线指数崩塌，德拜曲线只按 $T^3$ 下降：$T/\Theta_D = 0.05$ 处它仍有 $0.0097$，是爱因斯坦值的三百多倍。
:::

::: example 十开尔文的铜 {#ex-copper-debye}
铜的 $\Theta_D = 343\,\mathrm{K}$。求 $10.0\,\mathrm{K}$ 下一摩尔的晶格热容，并与杜隆-珀蒂值比较。
::: solution
$T/\Theta_D = 10.0/343 = 0.02915$，$T^3$ 定律适用（图中完整曲线在 $0.05$ 以下已进入 $T^3$ 区）。取 $Nk_B = R$，

$$
C_V = \frac{12\pi^4}{5}R\left(\frac{10.0}{343}\right)^3 = 233.78\times8.3145\times2.478\times10^{-5}\,\mathrm{J/K} = 0.0482\,\mathrm{J/K}.
$$

经典值为 $3R = 24.94\,\mathrm{J/K}$，所以 $10\,\mathrm{K}$ 时晶格只保有经典热容的 $0.19\%$。这个温度下铜的导电电子（下面处理）贡献相当的量；$4\,\mathrm{K}$ 以下电子占主导。用真实色散关系的声子完整理论见 [[condensed-matter/lattice-vibrations]]。
:::
:::

## 简并费米气体 {#fermi}

现在看高密度的费米子。取 $N$ 个电子，自旋 $\tfrac12$、$g = 2$，放在体积 $V$ 中，无相互作用。自由电子模型就是这样处理金属的导电电子的，它对碱金属以及铜、银、金准得惊人。

$T = 0$ 时费米-狄拉克分布是一个台阶：$\mu$ 以下每个轨道都被占据，$\mu$ 以上全空。电子从最底下开始填轨道，每个空间轨道两个，直到 $N$ 个电子全部就位。

::: definition 费米能 {#def-fermi}
理想费米气体在 $T = 0$ 的化学势称为**费米能** $E_F$：最高被占据轨道的能量。**费米波矢**为 $k_F = \sqrt{2mE_F}/\hbar$，**费米温度**为 $T_F = E_F/k_B$，**费米速度**为 $v_F = \hbar k_F/m$。
:::

::: theorem 零温的自由电子气 {#thm-fermi-gas}
质量为 $m$、数密度为 $n = N/V$ 的自旋-$\tfrac12$ 费米子理想气体，在 $T = 0$ 有

$$
E_F = \frac{\hbar^2}{2m}\left(3\pi^2n\right)^{2/3}, \qquad U = \frac35NE_F, \qquad P = \frac25nE_F.
$$ {#eq-fermi}
:::

::: proof
由 [[statistical-mechanics/quantum-statistics]]，$\lvert\mathbf k\rvert < k$ 的轨道数（$g = 2$）为 $Vk^3/(3\pi^2)$。令它等于 $N$、$k = k_F$，得 $k_F^3 = 3\pi^2n$，于是 $E_F = \hbar^2k_F^2/2m$ 即所给公式。

态密度为 $D(\varepsilon) = \tfrac32N\varepsilon^{1/2}/E_F^{3/2}$：它正比于 $\varepsilon^{1/2}$，常数由 $\int_0^{E_F}D\,\dd\varepsilon = N$ 定出。于是

$$
U = \int_0^{E_F}\varepsilon D(\varepsilon)\,\dd\varepsilon = \frac{3N}{2E_F^{3/2}}\cdot\frac25E_F^{5/2} = \frac35NE_F.
$$

最后，由 [[statistical-mechanics/quantum-statistics]] 中证明的结论，任何非相对论理想气体都有 $PV = \tfrac23U$，所以 $P = \tfrac23\cdot\tfrac35nE_F = \tfrac25nE_F$。
:::

::: example 铜中的电子 {#ex-copper}
铜每个原子贡献一个导电电子，$n = 8.47\times10^{28}\,\mathrm{m^{-3}}$。求 $E_F$、$T_F$、$v_F$ 与简并压。
::: solution
先算 $3\pi^2n = 2.508\times10^{30}\,\mathrm{m^{-3}}$，故 $k_F = 1.359\times10^{10}\,\mathrm{m^{-1}}$。于是

$$
E_F = \frac{\hbar^2k_F^2}{2m_e} = \frac{(1.054572\times10^{-34})^2\times(1.359\times10^{10})^2}{2\times9.10938\times10^{-31}}\,\mathrm{J} = 1.1268\times10^{-18}\,\mathrm{J} = 7.03\,\mathrm{eV}.
$$

费米温度 $T_F = E_F/k_B = 8.16\times10^4\,\mathrm{K}$，费米速度 $v_F = \hbar k_F/m_e = 1.57\times10^6\,\mathrm{m/s}$，约为光速的 $0.5\%$，压强为

$$
P = \tfrac25nE_F = 0.4\times8.47\times10^{28}\times1.1268\times10^{-18}\,\mathrm{Pa} = 3.82\times10^{10}\,\mathrm{Pa},
$$

将近四十万个大气压。室温只有 $T_F$ 的 $0.4\%$，所以铜中的电子气在绝大多数场合下就是绝对零度的。这个惊人的压强被电子对离子晶格的吸引所平衡；金属抗压缩的原因就有一部分在这里。
:::
:::

::: warning 费米能不是热的
铜的费米面上的电子在绝对零度以 $1.6\times10^6\,\mathrm{m/s}$ 运动，平均动能为 $\tfrac35E_F = 4.2\,\mathrm{eV}$，是室温 $k_BT$ 的一百六十倍。这些都不是热能；它们是不相容原理逼出来的，无法作为热取走。像经典的德鲁德（Drude）模型那样把 $\tfrac32k_BT$ 等同于电子平均能量，得到的是错误的速率、错误的热容和错误的温度依赖。
:::

### 电子气的热容

在 $T \ll T_F$ 的温度，只有费米能附近几个 $k_BT$ 以内的电子能被激发，更深的电子够不着空轨道。比例为 $T/T_F$ 量级的电子各获得 $k_BT$ 量级的能量，所以 $U - U_0 \sim N(k_BT)^2/E_F$、$C \sim Nk_B\,T/T_F$。精确系数来自**索末菲展开**。

::: theorem 电子热容 {#thm-sommerfeld}
$T \ll T_F$ 的理想费米气体，

$$
C_V = \frac{\pi^2}{2}Nk_B\,\frac{T}{T_F} + O\bigl((T/T_F)^3\bigr).
$$ {#eq-sommerfeld}
:::

::: proof
我们勾勒标准论证；完整展开见 Kittel 与 Kroemer（第 7 章）与 Pathria 与 Beale（8.1 节）。对光滑函数 $H(\varepsilon)$，索末菲引理断言

$$
\int_0^\infty H(\varepsilon)\,\bar n_{\mathrm{FD}}(\varepsilon)\,\dd\varepsilon = \int_0^\mu H(\varepsilon)\,\dd\varepsilon + \frac{\pi^2}{6}(k_BT)^2H'(\mu) + O(T^4).
$$

它由分部积分得出，使导数 $-\partial\bar n/\partial\varepsilon$ 出现；该导数是一个以 $\mu$ 为中心、宽 $k_BT$、关于 $\mu$ 对称的峰，且 $\int_{-\infty}^\infty x^2\,\dfrac{e^x}{(e^x + 1)^2}\,\dd x = \pi^2/3$。把引理分别用于 $H = D$ 与 $H = \varepsilon D$。保持 $N$ 固定会使 $\mu$ 移动 $T^2$ 量级，这一移动在 $U$ 的这一阶恰好抵消，留下

$$
U = U_0 + \frac{\pi^2}{6}D(E_F)(k_BT)^2.
$$

求导得 $C_V = \tfrac{\pi^2}{3}D(E_F)k_B^2T$。由 [[#thm-fermi-gas]] 的证明，$D(E_F) = 3N/(2E_F)$，于是上式即 $\tfrac{\pi^2}{2}Nk_B\,k_BT/E_F$。
:::

$300\,\mathrm{K}$ 的铜，[[#eq-sommerfeld]] 给出 $C_V = (\pi^2/2)R\times300/81600 = 0.151\,\mathrm{J/(mol\cdot K)}$，而经典气体为 $\tfrac32R = 12.5\,\mathrm{J/(mol\cdot K)}$。铜的实测线性系数为 $\gamma = 0.695\,\mathrm{mJ/(mol\cdot K^2)}$，约为自由电子值 $0.503\,\mathrm{mJ/(mol\cdot K^2)}$ 的 $1.4$ 倍；差值归于能带结构与电子-声子相互作用。令 $\gamma T$ 等于晶格项 [[#eq-debye-t3]]（用实测 $\gamma$）表明，$3.8\,\mathrm{K}$ 以下电子贡献超过晶格。

::: quiz
$T \ll T_F$ 时，金属里哪些电子参与吸热？
- [ ] 全部平等参与，各获得约 $k_BT$。
- [x] 只有费米能附近几个 $k_BT$ 以内的那些。
- [ ] 只有带底附近的那些，那里电子最多。
- [ ] 都不参与，因为气体处在绝对零度。
::: solution
费米海深处的电子，其周围 $k_BT$ 内的轨道全部已被占据，不相容原理禁止它吸收热的能量。只有费米面附近的电子才够得着空轨道。带底的态密度其实最小，$D \propto \varepsilon^{1/2}$。结果是一个虽小但非零、对 $T$ 线性的热容。
:::
:::

### 白矮星

核燃料耗尽的恒星一直收缩，直到某种不是热压的东西抵抗引力。对大约一个太阳质量的恒星，答案是电子简并压。这样的恒星就是**白矮星**：一个太阳质量装进地球大小的体积。

::: example 天狼星 B {#ex-sirius}
天狼星 B 质量约 $1.02$ 个太阳质量（$M_\odot = 1.988\times10^{30}\,\mathrm{kg}$），半径约 $5.6\times10^6\,\mathrm{m}$。它主要由碳和氧组成，二者每个电子对应两个核子。估计它的平均密度、电子密度以及比值 $p_F/m_ec$。核心温度 $10^7\,\mathrm{K}$ 下电子气是简并的吗？
::: solution
平均密度为

$$
\rho = \frac{1.02\times1.988\times10^{30}}{\tfrac43\pi(5.6\times10^6)^3}\,\mathrm{kg/m^3} = 2.76\times10^9\,\mathrm{kg/m^3},
$$

每立方厘米近三吨。每个电子两个核子，$n_e = \rho/(2\,\mathrm u) = 8.30\times10^{35}\,\mathrm{m^{-3}}$，是铜中电子密度的千万倍。费米动量为 $p_F = \hbar(3\pi^2n_e)^{1/3}$，且

$$
\frac{p_F}{m_ec} = \frac{1.054572\times10^{-34}\times(2.458\times10^{37})^{1/3}}{9.10938\times10^{-31}\times2.99792\times10^8} = 1.12.
$$

费米动量超过 $m_ec$，电子是相对论性的，非相对论公式 [[#eq-fermi]] 会高估它们的能量：它给出 $E_F = 322\,\mathrm{keV}$，而费米面上正确的相对论动能是 $m_ec^2(\sqrt{1 + 1.12^2} - 1) = 257\,\mathrm{keV}$。相应的费米温度约 $3\times10^9\,\mathrm{K}$，是核心温度的三百倍。电子气高度简并，撑住这颗星的是它的压强而非温度。原子核重得多，组成经典气体或晶体，几乎不贡献压强。
:::
:::

令简并压与引力平衡就得到质量-半径关系。非相对论电子的简并能按 $N_e^{5/3}/R^2$ 标度，引力能按 $-GM^2/R$；对二者之和求极小得 $R \propto M^{-1/3}$，见下面的一道习题。质量更大的白矮星反而*更小*。质量增大，电子成为相对论性的，简并能从 $\propto 1/R^2$ 变为 $\propto 1/R$——与引力同一标度——超过临界质量后平衡半径不复存在。苏布拉马尼扬·钱德拉塞卡（Subrahmanyan Chandrasekhar）1931 年找到了这个极限；按每个电子两个核子算，约为 $1.4\,M_\odot$。更重的核会继续坍缩成中子星，同样的物理搬到中子上，见 [[gravitation/stars]]。

::: example 核密度下的中子 {#ex-neutron-star}
中子星粗略地说就是一个中子（$m_n = 1.67493\times10^{-27}\,\mathrm{kg}$，自旋 $\tfrac12$）的简并气体，密度约为核密度 $n = 0.16\,\mathrm{fm^{-3}} = 1.6\times10^{44}\,\mathrm{m^{-3}}$。求费米能与费米温度，并判断中子是否相对论性。
::: solution
$3\pi^2n = 4.737\times10^{45}\,\mathrm{m^{-3}}$，$k_F = 1.680\times10^{15}\,\mathrm{m^{-1}}$，约 $1.7\,\mathrm{fm^{-1}}$。于是

$$
E_F = \frac{\hbar^2k_F^2}{2m_n} = \frac{(1.054572\times10^{-34})^2(1.680\times10^{15})^2}{2\times1.67493\times10^{-27}}\,\mathrm{J} = 9.36\times10^{-12}\,\mathrm{J} = 58\,\mathrm{MeV},
$$

且 $T_F = E_F/k_B = 6.8\times10^{11}\,\mathrm{K}$。比值 $p_F/m_nc = \hbar k_F/m_nc = 0.35$，中子是轻微相对论性的，非相对论公式有九成的准头。几岁大的中子星核心温度或许 $10^9\,\mathrm{K}$，不到 $T_F$ 的 $1\%$：像金属里的电子一样，中子实际上处于绝对零度。给铜算出 $7\,\mathrm{eV}$ 的同一条公式在这里给出 $58\,\mathrm{MeV}$，相差 $8\times10^6$ 倍，因为密度大 $1.9\times10^{15}$ 倍而质量大 $1839$ 倍：$(1.9\times10^{15})^{2/3}/1839 = 8.3\times10^6$。这里略去的核力在这一密度上至关重要，中子星的最大质量正是由它决定的。
:::
:::

## 玻色-爱因斯坦凝聚 {#bec}

现在是粒子数守恒的玻色子：$N$ 个总自旋为整数的原子（如 $^{87}$Rb 或 $^4$He，$g = 1$）组成的气体。与 [[statistical-mechanics/quantum-statistics]] 中一样，化学势由

$$
N = \sum_k\frac{1}{e^{\beta(\varepsilon_k - \mu)} - 1}
$$

固定，且必须低于最低轨道能量，我们把后者取为 $\varepsilon = 0$。密度固定地降温，$\mu$ 上升趋零。用 $D(\varepsilon) \propto \varepsilon^{1/2}$ 把求和换成积分，由上一章的级数得

$$
N_{\mathrm{exc}} = \frac{V}{\lambda^3}\sum_{j=1}^\infty\frac{z^j}{j^{3/2}}, \qquad z = e^{\beta\mu}.
$$

级数在 $z = 1$ 处最大，为 $\zeta(\tfrac32) = 2.612375$。所以激发态轨道至多装 $2.612\,V/\lambda^3$ 个粒子，而这个上限随 $T$ 下降按 $T^{3/2}$ 缩小。多出来的粒子怎么办？

答案是积分丢了东西。它的权重 $D(\varepsilon) \propto \varepsilon^{1/2}$ 在 $\varepsilon = 0$ 处为零，所以给基态轨道的权重是零。只要基态轨道占据的粒子比例可以忽略，这无伤大雅；但它的占据数 $1/(e^{-\beta\mu} - 1) \approx k_BT/(-\mu)$ 随 $\mu \to 0^-$ 无界增长。激发态轨道饱和后，多出的粒子进入基态轨道，其占据数 $N_0$ 成为 $N$ 的有限比例。

::: theorem 玻色-爱因斯坦凝聚 {#thm-bec}
质量为 $m$、数密度为 $n$ 的理想玻色气体在满足 $n\lambda^3 = \zeta(\tfrac32)$ 的温度 $T_c$ 以下凝聚：

$$
T_c = \frac{2\pi\hbar^2}{mk_B}\left(\frac{n}{\zeta(3/2)}\right)^{2/3}, \qquad \zeta(\tfrac32) = 2.612375\ldots
$$ {#eq-tc}

$T < T_c$ 时化学势在 $k_BT/N$ 量级的精度内为零，基态轨道上的粒子比例为

$$
\frac{N_0}{N} = 1 - \left(\frac{T}{T_c}\right)^{3/2}.
$$ {#eq-condensate}
:::

::: proof
$T_c$ 以上，方程 $n\lambda^3 = \sum_jz^j/j^{3/2}$ 有解 $z < 1$，因为右边在 $[0, 1]$ 上从 $0$ 连续增至 $\zeta(\tfrac32)$，而 $n\lambda^3 < \zeta(\tfrac32)$；此时基态轨道占据 $z/(1 - z)$ 个粒子，为一量级 $1$ 的数，与 $N$ 相比可忽略。解 $n h^3/(2\pi mk_BT)^{3/2} = \zeta(\tfrac32)$ 得 $n\lambda^3 = \zeta(\tfrac32)$ 处的温度，改写 $h = 2\pi\hbar$ 即得 [[#eq-tc]]。

$T_c$ 以下，任何 $z \le 1$ 都无法让激发态轨道装下全部 $N$ 个粒子。基态轨道必须收下其余的 $N_0 = N - N_{\mathrm{exc}}$，这要求 $1/(z^{-1} - 1) = N_0$，故 $z = 1 - O(1/N_0)$，主导阶上 $\mu = -k_BT/N_0$，对宏观的 $N_0$ 可以忽略。取 $z = 1$，激发态轨道停在上限 $N_{\mathrm{exc}} = \zeta(\tfrac32)V/\lambda^3$。由于 $\lambda^{-3} \propto T^{3/2}$ 且 $N_{\mathrm{exc}} = N$ 于 $T_c$，

$$
N_{\mathrm{exc}} = N\left(\frac{T}{T_c}\right)^{3/2}, \qquad N_0 = N - N_{\mathrm{exc}} = N\left[1 - \left(\frac{T}{T_c}\right)^{3/2}\right].
$$

对激发态轨道使用积分在此是合法的：最低的那些激发态轨道虽然占据数很高，但在固定密度、$V \to \infty$ 时它们持有的 $N$ 的比例趋于零；只有基态轨道单独持有有限比例。
:::

凝聚是一种完全没有相互作用的相变，纯由统计驱动。它发生在动量空间而非位置空间：凝聚体是宏观数目的粒子占据同一个最低能量轨道，全部具有同一个波函数。$T_c$ 处热波长与粒子间距相当，$\lambda = (2.612/n)^{1/3} = 1.38\,n^{-1/3}$；波包相互重叠。

::: widget plot
f: if(x<1, 1-x^1.5, 0); if(x<1, x^1.5, 1)
x: 0, 2
y: 0, 1.05
labels: 凝聚体比例 N₀/N; 激发态比例
caption: 理想玻色气体中基态轨道与激发态轨道上的粒子比例，对 $T/T_c$ 作图。$T_c$ 以上，热力学极限下凝聚体比例为零。以下它从零连续增长，在 $T_c$ 处有拐折而无跳变。$T = T_c/2$ 时凝聚体装着 $65\%$ 的原子。囚禁气体中指数不同，因为谐振囚禁势的态密度按 $\varepsilon^2$ 增长，给出 $1 - (T/T_c)^3$。
:::

::: example 铷-87 {#ex-rubidium}
求质量 $86.909\,\mathrm{u}$、数密度 $1.0\times10^{20}\,\mathrm{m^{-3}}$（$10^{14}\,\mathrm{cm^{-3}}$）的 $^{87}$Rb 原子理想气体的凝聚温度——磁囚禁碱金属气体的典型峰值密度。什么密度给出 $T_c = 170\,\mathrm{nK}$？
::: solution
质量为 $m = 86.909180527\times1.66053907\times10^{-27} = 1.44316\times10^{-25}\,\mathrm{kg}$。代入 [[#eq-tc]]，

$$
\frac{2\pi\hbar^2}{mk_B} = \frac{2\pi\times(1.054572\times10^{-34})^2}{1.44316\times10^{-25}\times1.380649\times10^{-23}} = 3.5070\times10^{-20}\,\mathrm{K\,m^2},
$$

且 $(n/2.612375)^{2/3} = (3.8279\times10^{19})^{2/3} = 1.1358\times10^{13}\,\mathrm{m^{-2}}$。所以

$$
T_c = 3.5070\times10^{-20}\times1.1358\times10^{13}\,\mathrm{K} = 3.98\times10^{-7}\,\mathrm{K} \approx 400\,\mathrm{nK}.
$$

反解，$T_c = 170\,\mathrm{nK}$ 要求 $n = 2.612/\lambda^3$，其中 $170\,\mathrm{nK}$ 下 $\lambda = 0.454\,\mu\mathrm{m}$，得 $n = 2.8\times10^{19}\,\mathrm{m^{-3}}$。JILA 小组 1995 年看到凝聚体在 $170\,\mathrm{nK}$ 附近出现。这样的气体比空气稀一百万倍，要让 $n\lambda^3 \approx 1$，原子的热波长必须接近一微米：温度低于一微开尔文，靠激光冷却再叠加蒸发冷却达到。
:::
:::

::: quiz
一团均匀的理想玻色气体正处于凝聚温度。保持温度不变，把它压缩到一半体积。现在有多大比例的原子在凝聚体里？
- [ ] 一个也没有：凝聚需要降温，不需要压缩。
- [ ] 四分之一。
- [x] 二分之一。
- [ ] 全部。
::: solution
固定 $T$ 时，激发态轨道至多装 $\zeta(\tfrac32)V/\lambda^3$ 个原子，正比于 $V$。初始时这个上限恰为 $N$。$V$ 减半，上限也减半，于是只有 $N/2$ 个原子塞得进激发态轨道，另外 $N/2$ 个进入凝聚体。等价地，密度翻倍，$T_c \propto n^{2/3}$ 上升 $2^{2/3}$ 倍，[[#eq-condensate]] 给出 $1 - (2^{-2/3})^{3/2} = 1 - \tfrac12$。
:::
:::

::: application 超流氦
弗里茨·伦敦（Fritz London）1938 年提出，液态 $^4$He 在 $2.17\,\mathrm{K}$ 转变为超流体就是玻色-爱因斯坦凝聚。把 [[#eq-tc]] 用于液氦密度 $0.145\,\mathrm{g/cm^3}$、即 $n = 2.18\times10^{28}\,\mathrm{m^{-3}}$，得 $T_c = 3.13\,\mathrm{K}$：数量级正确——尽管这是原子强烈相互作用、理想气体模型根本无权适用的液体。中子散射显示，低温超流氦中的凝聚体比例只有约 $10\%$，因为相互作用把它耗竭了。费米子同位素 $^3$He 在 $2\,\mathrm{K}$ 附近没有任何转变；只有冷到约 $1$ 到 $2.5\,\mathrm{mK}$ 以下（视压强而定）、原子配成对（对表现为玻色子）时，它才变超流。
:::

::: history 普朗克、德拜、玻色、爱因斯坦与 1995 年的凝聚
马克斯·普朗克（Max Planck）1900 年 10 月 19 日向德国物理学会报告了他的辐射公式——当时只是一个拟合鲁本斯（Rubens）与库尔鲍姆（Kurlbaum）新近红外测量的内插——12 月 14 日又给出了使用能量子 $h\nu$ 的推导。约瑟夫·斯特藩（Josef Stefan）1879 年从实验得出 $T^4$ 定律，玻尔兹曼 1884 年从热力学导出它。彼得·德拜（Peter Debye）的热容理论发表于 1912 年。玻色的光子计数（1924）与爱因斯坦把它用于原子（1924–25）预言了凝聚，这一结果长期广受怀疑，直到伦敦 1938 年的提议。拉尔夫·福勒（Ralph Fowler）1926 年——费米论文发表后几个月——证明白矮星物质是简并费米气体；钱德拉塞卡的极限质量在 1931 年跟上；阿诺尔德·索末菲（Arnold Sommerfeld）的金属电子气理论在 1927–28 年。1995 年 6 月，博尔德 JILA 的埃里克·康奈尔（Eric Cornell）与卡尔·维曼（Carl Wieman）做出了 $^{87}$Rb 原子的凝聚体；1995 年 9 月，麻省理工学院沃尔夫冈·克特勒（Wolfgang Ketterle）的小组做出了原子数多得多的钠原子凝聚体。三人共享 2001 年诺贝尔物理学奖。
:::

## 后续内容 {#leads}

自由电子气是 [[condensed-matter/free-electrons]] 的起点，那章加上输运；[[condensed-matter/band-structure]] 再加上离子的周期势；费米-狄拉克分布随后给出 [[condensed-matter/semiconductors]] 的载流子密度。声子的完整理论连同真实色散关系见 [[condensed-matter/lattice-vibrations]]。恒星中的简并物质延伸到中子星，见 [[gravitation/stars]]；光子气体连同 $T \propto 1/a$（$a$ 为宇宙尺度因子）属于 [[gravitation/cosmology]]。玻色-爱因斯坦凝聚是最简单的相变实例；下一章 [[statistical-mechanics/phase-transitions]] 讲由相互作用引起的相变。

::: summary
- 光子 $\mu = 0$，态密度 $V\omega^2/\pi^2c^3$；由此得到普朗克定律 $u(\omega) = (\hbar/\pi^2c^3)\,\omega^3/(e^{\hbar\omega/k_BT} - 1)$，维恩峰在 $\lambda_{\max}T = 2.898\times10^{-3}\,\mathrm{m\,K}$。
- 对普朗克定律积分得 $u = aT^4$、辐射通量 $\sigma T^4$，$\sigma = 2\pi^5k_B^4/(15h^3c^2) = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}$，在 2019 年 SI 下是精确值。
- 德拜模型把晶体当作直到截断 $\Theta_D$ 的 $3N$ 个声子模式；高温 $C_V \to 3Nk_B$，低温 $C_V = (12\pi^4/5)Nk_B(T/\Theta_D)^3$。
- $T = 0$ 的理想费米气体把轨道填到 $E_F = (\hbar^2/2m)(3\pi^2n)^{2/3}$，$U = \tfrac35NE_F$、$P = \tfrac25nE_F$；铜的 $E_F = 7.0\,\mathrm{eV}$、$T_F = 8.2\times10^4\,\mathrm{K}$。
- 只有 $E_F$ 附近 $\sim k_BT$ 内的电子吸热，所以 $C_V = (\pi^2/2)Nk_BT/T_F$。
- 白矮星靠电子简并压撑住；其电子是相对论性的，超过约 $1.4\,M_\odot$ 就没有平衡存在。
- 理想玻色气体在 $T_c = (2\pi\hbar^2/mk_B)(n/2.612)^{2/3}$（此处 $n\lambda^3 = 2.612$）以下凝聚；凝聚体比例为 $1 - (T/T_c)^{3/2}$。$10^{20}\,\mathrm{m^{-3}}$ 的 $^{87}$Rb，$T_c \approx 400\,\mathrm{nK}$。
:::

## 习题 {#exercises}

::: exercise 灯泡灯丝 {level=1 check="966"}
$3000\,\mathrm{K}$ 的黑体按单位波长计发射最强处的波长是多少纳米？取三位有效数字。
::: solution
由 [[#prop-wien]]，$\lambda_{\max} = b/T = 2.8978\times10^{-3}/3000\,\mathrm{m} = 9.66\times10^{-7}\,\mathrm{m} = 966\,\mathrm{nm}$，在近红外。可见光落在曲线的短波长一侧，这就是白炽灯效率低的原因。
:::
:::

::: exercise 辐射功率 {level=1 check="5.67"}
$1000\,\mathrm{K}$ 黑体的 $1.00\,\mathrm{cm^2}$ 表面辐射多少瓦？取三位有效数字。
::: solution
由 [[#thm-stefan]]，功率为 $\sigma T^4A = 5.6704\times10^{-8}\times(1000)^4\times1.00\times10^{-4}\,\mathrm{W} = 5.67\,\mathrm{W}$。温度翻倍，功率变为十六倍。
:::
:::

::: exercise 钠的费米能 {level=1 check="3.24"}
钠每个原子一个导电电子，$n = 2.65\times10^{28}\,\mathrm{m^{-3}}$。求其自由电子费米能，以电子伏计，取三位有效数字。
::: solution
$3\pi^2n = 7.846\times10^{29}\,\mathrm{m^{-3}}$，$k_F = (7.846\times10^{29})^{1/3} = 9.223\times10^9\,\mathrm{m^{-1}}$，于是

$$
E_F = \frac{\hbar^2k_F^2}{2m_e} = \frac{(1.054572\times10^{-34})^2(9.223\times10^9)^2}{2\times9.10938\times10^{-31}}\,\mathrm{J} = 5.193\times10^{-19}\,\mathrm{J} = 3.24\,\mathrm{eV}.
$$

费米温度为 $3.76\times10^4\,\mathrm{K}$。由 $E_F \propto n^{2/3}$，它与铜之比应为 $(2.65/8.47)^{2/3} = 0.461$，与 $3.24/7.03$ 相符。
:::
:::

::: exercise 数背景光子 {level=2 check="411"}
用 $n_\gamma = (2\zeta(3)/\pi^2)(k_BT/\hbar c)^3$、$\zeta(3) = 1.2020569$，求 $T = 2.72548\,\mathrm{K}$ 时每立方厘米的宇宙背景光子数，取三位有效数字。
::: solution
由 [[#ex-cmb]]，$k_BT/\hbar c = 1190.2\,\mathrm{m^{-1}}$，其立方为 $1.6862\times10^9\,\mathrm{m^{-3}}$。乘以 $2\zeta(3)/\pi^2 = 0.24359$ 得 $4.107\times10^8\,\mathrm{m^{-3}}$，即 $411\,\mathrm{cm^{-3}}$。由 $n_\gamma \propto T^3$，宇宙温度减半，单位体积的光子数只剩八分之一。
:::
:::

::: exercise 低温热容 {level=2 check="0.0482"}
用德拜 $T^3$ 定律、$\Theta_D = 343\,\mathrm{K}$，求 $10.0\,\mathrm{K}$ 下一摩尔铜的晶格热容（单位 $\mathrm{J/K}$，三位有效数字），以及热容达到其十倍的温度。
::: solution
由 [[#eq-debye-t3]]，如 [[#ex-copper-debye]] 那样，

$$
C_V = \frac{12\pi^4}{5}\times8.314462618\times\left(\frac{10.0}{343}\right)^3\,\mathrm{J/K} = 1943.8\times2.4776\times10^{-5}\,\mathrm{J/K} = 0.0482\,\mathrm{J/K}.
$$

由 $C_V \propto T^3$，十倍的值需要 $T = 10.0\times10^{1/3} = 21.5\,\mathrm{K}$，那里 $T/\Theta_D = 0.063$；在该处对 [[#eq-debye]] 数值求值与 $T^3$ 定律只差 $0.04\%$，定律依然出色。
:::
:::

::: exercise 让钠凝聚 {level=2 check="1.51e-6"}
求钠-23 原子（$m = 22.98977\,\mathrm{u}$）在 $n = 1.00\times10^{20}\,\mathrm{m^{-3}}$ 下的理想气体凝聚温度，以开尔文计，取三位有效数字。
::: solution
质量为 $3.8175\times10^{-26}\,\mathrm{kg}$，$2\pi\hbar^2/(mk_B) = 1.3258\times10^{-19}\,\mathrm{K\,m^2}$。由 [[#ex-rubidium]]，$(n/2.612375)^{2/3} = 1.1358\times10^{13}\,\mathrm{m^{-2}}$，

$$
T_c = 1.3258\times10^{-19}\times1.1358\times10^{13}\,\mathrm{K} = 1.51\times10^{-6}\,\mathrm{K}.
$$

同样密度下 $T_c \propto 1/m$，所以钠的凝聚温度是铷的 $86.909/22.990 = 3.78$ 倍：$3.78\times398\,\mathrm{nK} = 1.51\,\mu\mathrm{K}$。
:::
:::

::: exercise 白矮星的半径 {level=3 check="7.25e6"}
把质量为 $M$ 的白矮星建模为半径 $R$ 的均匀球，内含 $N_e = M/(2\,\mathrm u)$ 个非相对论简并电子，动能 $\tfrac35N_eE_F$，引力能 $-\tfrac35GM^2/R$。证明总能量为 $E(R) = A/R^2 - B/R$，证明平衡半径为 $R = 2A/B \propto M^{-1/3}$，并对 $M = M_\odot = 1.98841\times10^{30}\,\mathrm{kg}$（取 $G = 6.67430\times10^{-11}\,\mathrm{N\,m^2/kg^2}$）以米为单位算出它，取三位有效数字。
::: hint
由 $V = \tfrac43\pi R^3$，$3\pi^2n_e = 9\pi N_e/(4R^3)$。平衡使 $E(R)$ 取极小。
:::
::: solution
电子密度 $n_e = 3N_e/(4\pi R^3)$，故 $3\pi^2n_e = 9\pi N_e/(4R^3)$，$E_F = (\hbar^2/2m_e)(9\pi N_e/4)^{2/3}R^{-2}$。总能量为

$$
E(R) = \frac{A}{R^2} - \frac{B}{R}, \qquad A = \frac35N_e\frac{\hbar^2}{2m_e}\left(\frac{9\pi N_e}{4}\right)^{2/3}, \qquad B = \frac35GM^2.
$$

于是 $E'(R) = -2A/R^3 + B/R^2$ 在 $R = 2A/B$ 处为零，且 $E''(2A/B) = 6A/R^4 - 2B/R^3 = (6A - 2BR)/R^4 = 2A/R^4 > 0$，是极小。由 $A \propto N_e^{5/3} \propto M^{5/3}$、$B \propto M^2$，得 $R \propto M^{-1/3}$。

数值上 $N_e = 1.98841\times10^{30}/(2\times1.66053907\times10^{-27}) = 5.9872\times10^{56}$，且

$$
A = 0.6\times5.9872\times10^{56}\times6.1043\times10^{-39}\times(4.2321\times10^{57})^{2/3}\,\mathrm{J\,m^2} = 5.737\times10^{56}\,\mathrm{J\,m^2},
$$

其中用了 $\hbar^2/2m_e = 6.1043\times10^{-39}\,\mathrm{J\,m^2}$ 与 $(4.2321\times10^{57})^{2/3} = 2.616\times10^{38}$。又有 $B = 0.6\times6.6743\times10^{-11}\times(1.98841\times10^{30})^2 = 1.5833\times10^{50}\,\mathrm{J\,m}$。故 $R = 2A/B = 7.25\times10^6\,\mathrm{m}$，比地球略大。观测到的一个太阳质量的白矮星要小一些，约 $5.6\times10^6\,\mathrm{m}$，因为真实的星中心更致密，且其电子部分相对论性，压强因此变软。
:::
:::

::: exercise 光子气体的膨胀 {level=3}
体积 $V$、温度 $T$ 的黑体辐射，用 $U = aVT^4$ 与 $P = \tfrac13aT^4$ 证明熵为 $S = \tfrac43aVT^3$。证明可逆绝热膨胀中 $VT^3$ 守恒，并导出宇宙背景的温度如何随宇宙线度标度。
::: hint
用热力学恒等式 $\dd U = T\,\dd S - P\,\dd V$，或 $S = (U + PV - \mu N)/T$、$\mu = 0$。
:::
::: solution
光子 $\mu = 0$，由 $\Phi = -PV = U - TS$ 得 $S = (U + PV)/T = (aVT^4 + \tfrac13aVT^4)/T = \tfrac43aVT^3$。

用恒等式校核：固定 $V$ 时 $(\partial S/\partial T)_V = C_V/T = 4aVT^2$，积分为 $\tfrac43aVT^3$ 且 $T = 0$ 时 $S = 0$，与热力学第三定律一致。固定 $T$ 时 $(\partial S/\partial V)_T = \tfrac43aT^3$，而麦克斯韦关系 $(\partial S/\partial V)_T = (\partial P/\partial T)_V = \tfrac43aT^3$ 与之相符。

可逆绝热过程 $S$ 守恒，故 $VT^3$ 守恒，即 $T \propto V^{-1/3}$。若宇宙一切长度都按尺度因子 $a(t)$ 成正比地增长，则 $V \propto a^3$、$T \propto 1/a$。背景辐射与物质退耦时温度约 $3000\,\mathrm{K}$，如今为 $2.725\,\mathrm{K}$，所以彼时以来宇宙膨胀了约 $1100$ 倍。每个光子的波长也被拉伸同样倍数，这正是光子语言的同一句话：黑体谱在均匀膨胀下保持黑体谱，$\lambda_{\max}T$ 不变。
:::
:::
