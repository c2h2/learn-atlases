常温下的一整块纯硅晶体是不良导体，导电能力比铜大约差一千亿倍。每千万个硅原子掺入一个磷原子，其电导率便升高数十万倍；把磷换成硼，它照样导电，只不过靠正电荷载流子。把一块硼掺杂区与一块磷掺杂区接在一起，结果就只朝一个方向导电。每一台计算机、每一部手机、每一块太阳能电池板与每一只发光二极管都依赖这一连串事实，而这一切都可以由 [[condensed-matter/band-structure]] 加上 [[condensed-matter/free-electrons]] 的统计推出。

**半导体**是能隙很小的绝缘体：一条填满的价带与一条空着的导带之间隔着大约一个电子伏，因而常温下有若干电子被热激发越过能隙。这几个电子连同它们留下的空穴稀薄到服从经典的玻尔兹曼统计，其数目则可以用掺杂控制好几个数量级。本章计算 $300\,\mathrm K$ 下纯硅的载流子密度，证明支配掺杂材料的质量作用定律，并建立起 p–n 结：它的内建电势、耗尽层与二极管方程。最后以一段器件巡览收束本章。

全章取 $T = 300\,\mathrm K$，于是 $k_BT = 25.85\,\mathrm{meV}$，并像每一位器件工程师那样以 $\mathrm{cm^{-3}}$ 报告载流子密度；$1\,\mathrm{cm^{-3}} = 10^6\,\mathrm{m^{-3}}$。

## 电子与空穴 {#carriers}

价带顶在能量 $E_v$，导带底在 $E_c$；**能隙**为 $E_g = E_c - E_v$。绝对零度下价带全满、导带全空，由 [[condensed-matter/band-structure]] 的计数，晶体是绝缘体。有限温度下，被激发到导带的电子可以运动，它留下的空穴也可以，空穴表现得像电荷为 $+e$ 的载流子。

| 材料 | $300\,\mathrm K$ 下的 $E_g$（eV） | 能隙类型 |
|---|---|---|
| 锗 | $0.66$ | 间接 |
| 硅 | $1.12$ | 间接 |
| 砷化镓 | $1.42$ | 直接 |
| 氮化镓 | $3.4$ | 直接 |
| 金刚石 | $5.5$ | 间接 |

若导带底与价带顶出现在同一个 $\mathbf k$，能隙是**直接**的；否则是**间接**的。这一区别对光至关重要。光子的晶体动量与布里渊区的尺度相比几乎为零，所以在能带图上它只能竖直地把电子抬起。在直接能隙材料中，导带底的电子可以直接落进价带顶的空穴并发射一个光子；在间接能隙材料中，必须由声子补足 $\mathbf k$ 上的差值，这种过程慢一千倍。这就是发光二极管与激光器用砷化镓、氮化镓制造，而不用硅制造的原因。

带边附近能带是抛物形的，有效质量按 [[condensed-matter/band-structure#def-effective-mass]] 中的定义：

$$
E(\mathbf k) \approx E_c + \frac{\hbar^2k^2}{2m_e^*} \quad(\text{导带}), \qquad E(\mathbf k) \approx E_v - \frac{\hbar^2k^2}{2m_h^*} \quad(\text{价带}),
$$ {#eq-parabolic}

其中 $\mathbf k$ 从极值量起。**态密度有效质量** $m_e^*$ 与 $m_h^*$ 把真实能带的各向异性与若干等价极小值归并成单个数字。对常温的硅，我们采用 $m_e^* = 1.08\,m$、$m_h^* = 0.81\,m$，即 Kittel 以及 Sze 与 Ng 书中列出的数值。

## 载流子统计 {#statistics}

每个态的占据数是费米–狄拉克函数 $f(E) = 1/(e^{(E-\mu)/k_BT} + 1)$，而空穴是一个未占据的态，占据数为 $1 - f(E)$。半导体中化学势 $\mu$（常称费米能级）位于能隙之内，离两侧带边都有好几个 $k_BT$。这就使统计变得简单。

::: definition 非简并半导体 {#def-nondegenerate}
若 $E_c - \mu \gg k_BT$ 且 $\mu - E_v \gg k_BT$，半导体是**非简并**的。此时对导带中的态有 $f(E)\approx e^{-(E-\mu)/k_BT}$，对价带中的态有 $1 - f(E)\approx e^{-(\mu-E)/k_BT}$：电子与空穴都服从玻尔兹曼统计。
:::

::: theorem 载流子密度 {#thm-carriers}
在带边为抛物线形 [[#eq-parabolic]] 的非简并半导体中，导带电子与空穴的密度为

$$
n = N_c\,e^{-(E_c - \mu)/k_BT}, \qquad p = N_v\,e^{-(\mu - E_v)/k_BT},
$$ {#eq-np}

其中**有效态密度**为

$$
N_c = 2\Bigl(\frac{2\pi m_e^*k_BT}{h^2}\Bigr)^{3/2}, \qquad N_v = 2\Bigl(\frac{2\pi m_h^*k_BT}{h^2}\Bigr)^{3/2}.
$$ {#eq-nc}
:::

::: proof
导带带边附近就是质量 $m_e^*$ 的自由电子气，能量从 $E_c$ 量起。由 [[condensed-matter/free-electrons]] 的自由电子态密度，对 $E > E_c$，单位体积单位能量的态数为 $g_c(E) = \frac{1}{2\pi^2}\bigl(\frac{2m_e^*}{\hbar^2}\bigr)^{3/2}\sqrt{E - E_c}$。于是

$$
n = \int_{E_c}^\infty g_c(E)\,e^{-(E - \mu)/k_BT}\,\dd E = \frac{1}{2\pi^2}\Bigl(\frac{2m_e^*}{\hbar^2}\Bigr)^{3/2}e^{-(E_c - \mu)/k_BT}\int_0^\infty\sqrt\varepsilon\,e^{-\varepsilon/k_BT}\,\dd\varepsilon,
$$

其中 $\varepsilon = E - E_c$。上限可以取到无穷，因为远在能带结束之前，玻尔兹曼因子就已把被积函数压成零。最后一个积分是 $(k_BT)^{3/2}\Gamma(3/2) = (k_BT)^{3/2}\sqrt\pi/2$。把常数收拢，

$$
\frac{1}{2\pi^2}\Bigl(\frac{2m_e^*k_BT}{\hbar^2}\Bigr)^{3/2}\frac{\sqrt\pi}{2} = 2\Bigl(\frac{m_e^*k_BT}{2\pi\hbar^2}\Bigr)^{3/2} = 2\Bigl(\frac{2\pi m_e^*k_BT}{h^2}\Bigr)^{3/2},
$$

即 $N_c$。对空穴的计算完全相同：把质量换成 $m_h^*$，能量从 $E_v$ 向下量起，占据数用 $1 - f$。
:::

这个结果的含义一目了然：导带的行为仿佛它全部的态都集中在单一能量 $E_c$ 上，密度为 $N_c$，按玻尔兹曼因子被占据。而 $N_c$ 是热德布罗意波长倒立方的两倍——大约每个自旋每热波长立方一个态。

::: corollary 质量作用定律 {#cor-mass-action}
处于平衡的非简并半导体中，

$$
np = N_cN_v\,e^{-E_g/k_BT} \equiv n_i^2,
$$ {#eq-mass-action}

与 $\mu$ 无关，从而与掺杂无关。在纯（**本征**）晶体中 $n = p = n_i$，且

$$
n_i = \sqrt{N_cN_v}\,e^{-E_g/2k_BT}.
$$ {#eq-ni}
:::

::: proof
把 [[#eq-np]] 的两式相乘：指数相加得 $-(E_c - \mu + \mu - E_v)/k_BT = -E_g/k_BT$，$\mu$ 相消。纯晶体中每个导带电子都来自价带，故 $n = p$，二者都等于 $\sqrt{np} = n_i$。
:::

这个名字来自化学。电子–空穴对在场反应"束缚电子 $\rightleftharpoons$ 电子 + 空穴"中生灭，而 $np = n_i^2$ 就是它的平衡常数。施主提供的电子把反应推回去、压低 $p$，恰如加入共同离子会降低某种盐的溶解度。

::: example 硅的本征载流子密度 {#ex-ni-si}
用 $m_e^* = 1.08\,m$、$m_h^* = 0.81\,m$、$E_g = 1.12\,\mathrm{eV}$，计算 $300\,\mathrm K$ 下硅的 $N_c$、$N_v$ 与 $n_i$。
::: solution
先求自由电子质量的有效态密度：

$$
2\Bigl(\frac{2\pi mk_BT}{h^2}\Bigr)^{3/2} = 2\Bigl(\frac{2\pi(9.1094\times10^{-31})(4.1419\times10^{-21})}{(6.62607\times10^{-34})^2}\Bigr)^{3/2}\,\mathrm{m^{-3}} = 2.509\times10^{25}\,\mathrm{m^{-3}} = 2.509\times10^{19}\,\mathrm{cm^{-3}}.
$$

按 $(m^*/m)^{3/2}$ 缩放：$N_c = 2.509\times10^{19}\times1.08^{3/2} = 2.82\times10^{19}\,\mathrm{cm^{-3}}$，$N_v = 2.509\times10^{19}\times0.81^{3/2} = 1.83\times10^{19}\,\mathrm{cm^{-3}}$。它们的几何平均是 $2.27\times10^{19}\,\mathrm{cm^{-3}}$。玻尔兹曼因子是

$$
e^{-E_g/2k_BT} = e^{-1.12/(2\times0.025852)} = e^{-21.66} = 3.91\times10^{-10},
$$

于是

$$
n_i = (2.27\times10^{19})(3.91\times10^{-10})\,\mathrm{cm^{-3}} = 8.9\times10^{9}\,\mathrm{cm^{-3}}.
$$

精密测量给出 $300\,\mathrm K$ 下 $n_i \approx 1.0\times10^{10}\,\mathrm{cm^{-3}}$，器件工作与本章其余部分采用的就是这个取整值。$10\%$ 的出入是一堂关于灵敏度的课：只把 $E_g$ 改变 $0.02\,\mathrm{eV}$——不到一个 $k_BT$——$n_i$ 就改变 $50\%$，而在这样的精度上，能隙与有效质量随温度的变化不容忽略。硅每 $\mathrm{cm^3}$ 有 $5.0\times10^{22}$ 个原子，因此每 $10^{13}$ 个价电子中才有一个处在导带。
:::
:::

本征晶体的化学势在哪里？在 [[#eq-np]] 中令 $n = p$ 并取对数，

$$
\mu_i = \frac{E_c + E_v}{2} + \frac34k_BT\ln\frac{m_h^*}{m_e^*},
$$ {#eq-mui}

对硅它位于能隙中点以下 $5.6\,\mathrm{meV}$ 处：离正中很近，非简并得绰绰有余。

::: widget plot
f: log10(2.27e19*(x/300)^1.5*exp(-G/(2*8.617333e-5*x)))
x: 200, 700
y: 0, 18
sliders: G=1.12:0.6:1.6:0.01
caption: 本征载流子密度 $n_i$（以 $\mathrm{cm^{-3}}$ 为单位）的常用对数对热力学温度的图像，横轴以开尔文为单位，由 [[#eq-ni]] 以硅的有效质量与不依赖温度的能隙 $G$（以 eV 为单位）算出。取 $G = 1.12$ 可在 $300\,\mathrm K$ 读出约 $10^{10}$，并注意温度每升高 $50\,\mathrm K$ 它就上升十倍有余。把 $G$ 降到 $0.66$——锗的能隙——常温下的 $n_i$ 便跳增三个数量级：这就是锗器件在硅不以为意的温度下失效的原因。把 $G$ 升到 $1.42$，如砷化镓，本征载流子几乎消失。
:::

::: warning 减半的能隙
本征密度中含的是 $e^{-E_g/2k_BT}$，不是 $e^{-E_g/k_BT}$。每次热激发产生两个载流子，而 $n_i$ 是乘积 $np$ 的平方根，$np$ 含完整的能隙。若对硅用 $E_g$ 代替 $E_g/2$，得 $n_i\sim10^{0}\,\mathrm{cm^{-3}}$，每立方厘米一个电子，错了十个数量级。一个相关的错误是指望 $n_i$ 按 $T$ 的幂标度：$\sqrt{N_cN_v}$ 中的 $T^{3/2}$ 与指数相比可以忽略，这就是 $\ln n_i$ 对 $1/T$ 的图像几乎是一条直线、斜率为 $-E_g/2k_B$ 的原因。
:::

## 掺杂 {#doping}

把一个硅原子换成第 15 族的磷。它的五个价电子中有四个填满与四个硅近邻之间的键；第五个多余，只靠库仑引力束缚在 $\mathrm P^+$ 离子上，而这引力被硅的介电常数屏蔽。**施主**向导带交出一个电子；**受主**来自第 13 族，如硼，从价带拿走一个电子、留下一个空穴。施主多于受主的晶体是 **n 型**的，多数载流子是电子；受主多于施主的是 **p 型**的。

::: proposition 类氢施主 {#prop-hydrogenic}
把多余的电子建模成一个质量 $m^*$ 的粒子，束缚在相对介电常数为 $\varepsilon_r$ 的介质中的一个电荷 $+e$ 上。其束缚能与轨道半径就是氢原子对应量的重新标度：

$$
E_d = \frac{m^*/m}{\varepsilon_r^2}\times13.6\,\mathrm{eV}, \qquad a_d = \frac{\varepsilon_r}{m^*/m}\times0.529\,\text{Å}.
$$ {#eq-donor}
:::

::: proof
氢原子能级为 $E_1 = me^4/(2(4\pi\varepsilon_0)^2\hbar^2) = 13.6\,\mathrm{eV}$，玻尔半径为 $a_0 = 4\pi\varepsilon_0\hbar^2/(me^2) = 0.529\,\text{Å}$，见 [[quantum-1/hydrogen]]。施主问题是同一个薛定谔方程，把 $m\to m^*$、$\varepsilon_0\to\varepsilon_r\varepsilon_0$ 即可。代入后 $E_1$ 乘以 $(m^*/m)/\varepsilon_r^2$，$a_0$ 乘以 $\varepsilon_r/(m^*/m)$。若算出的 $a_d$ 远大于晶格常数，模型便自洽：电子把晶体看作质量为 $m^*$、介电常数为 $\varepsilon_r$ 的连续介质。
:::

::: example 硅中的磷施主 {#ex-donor-si}
取 $\varepsilon_r = 11.7$ 与电导有效质量 $m^* = 0.26\,m$，估算硅中施主电子的束缚能与轨道半径。
::: solution
由 [[#eq-donor]]，

$$
E_d = \frac{0.26}{11.7^2}\times13.606\,\mathrm{eV} = 1.899\times10^{-3}\times13.606\,\mathrm{eV} = 25.8\,\mathrm{meV}, \qquad a_d = \frac{11.7}{0.26}\times0.529\,\text{Å} = 24\,\text{Å}.
$$

轨道横跨约四个晶格常数（$a = 5.43\,\text{Å}$），圈内约有三千个硅原子，所以把宿主当作连续介质是合理的。实测电离能为磷 $45\,\mathrm{meV}$、砷 $49\,\mathrm{meV}$：模型量级正确，却没有抓住实化学——连续图像在那里失效。关键事实依然成立：束缚能与 $k_BT = 25.85\,\mathrm{meV}$ 相当，所以常温下几乎所有施主都已电离，每个贡献一个导带电子。
:::
:::

### 多数载流子与少数载流子

掺杂晶体中的载流子密度由两个条件决定：一是 [[#eq-mass-action]] 的质量作用定律，二是电荷中性。若 $N_D$ 个施主与 $N_A$ 个受主全部电离，正电荷是空穴与电离施主，负电荷是电子与电离受主：

$$
n + N_A = p + N_D.
$$ {#eq-neutral}

::: proposition 掺杂晶体中的载流子密度 {#prop-doped}
令 $N = N_D - N_A$。杂质全部电离的非简并半导体中，

$$
n = \frac N2 + \sqrt{\frac{N^2}{4} + n_i^2}, \qquad p = \frac{n_i^2}{n}.
$$ {#eq-doped}

若 $N\gg n_i$，则 $n\approx N$ 且 $p\approx n_i^2/N$。
:::

::: proof
把 $p = n_i^2/n$ 代入 [[#eq-neutral]] 并乘以 $n$：$n^2 - Nn - n_i^2 = 0$。正根即 [[#eq-doped]]。当 $N\gg n_i$ 时 $\sqrt{N^2/4 + n_i^2}\approx N/2 + n_i^2/N$，故 $n\approx N + n_i^2/N\approx N$。
:::

::: example 磷掺杂硅 {#ex-n-type}
硅掺杂 $N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$ 个磷原子。求 $n$、$p$、$\mu$ 位于 $E_c$ 下方何处，以及电阻率，取这一掺杂下的电子迁移率为 $1200\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$。
::: solution
由于 $N_D\gg n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$，由 [[#prop-doped]] 得 $n = 1.0\times10^{16}\,\mathrm{cm^{-3}}$，且

$$
p = \frac{n_i^2}{n} = \frac{(1.0\times10^{10})^2}{1.0\times10^{16}}\,\mathrm{cm^{-3}} = 1.0\times10^{4}\,\mathrm{cm^{-3}}.
$$

施主把 $n$ 提高了百万倍，又把 $p$ 压低了同样的倍数。化学势由 [[#eq-np]] 得出：

$$
E_c - \mu = k_BT\ln\frac{N_c}{n} = 0.025852\,\mathrm{eV}\times\ln\frac{2.82\times10^{19}}{1.0\times10^{16}} = 0.205\,\mathrm{eV},
$$

在带边之下八个 $k_BT$，材料仍是非简并的。电导由电子承担，$\sigma = ne\mu_n$，其中**迁移率** $\mu_n = e\tau/m^*$ 是单位场强下的漂移速度：

$$
\rho = \frac{1}{ne\mu_n} = \frac{1}{(1.0\times10^{16})(1.602\times10^{-19})(1200)}\,\Omega\,\mathrm{cm} = 0.52\,\Omega\,\mathrm{cm}.
$$

本征硅 $n = p = n_i$，迁移率约为 $1400$ 与 $450\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$，其 $\rho = 1/\bigl(n_ie(\mu_n + \mu_p)\bigr) = 3.4\times10^{5}\,\Omega\,\mathrm{cm}$。每五百万个原子一个杂质，就把电阻率改变了近一百万倍。
:::
:::

杂质主导的区段并不永久持续。极低温下 $k_BT\ll E_d$，电子落回施主（**冻结**），电导崩塌。高温下 $n_i$ 增长并超过 $N_D$，晶体重新变为本征的，其载流子密度不再由掺杂决定。对硅中 $N_D = 10^{16}\,\mathrm{cm^{-3}}$，这发生在 $700\,\mathrm K$ 附近，所以硅器件的规格只允许工作到约 $150$–$200\,^\circ\mathrm C$；也正是因此，碳化硅、氮化镓等宽禁带材料被用于高热、大功率电子学。

::: quiz
一硅样品掺有 $10^{17}\,\mathrm{cm^{-3}}$ 硼受主。常温下电子密度是多少？
- [ ] $10^{17}\,\mathrm{cm^{-3}}$
- [ ] $10^{10}\,\mathrm{cm^{-3}}$，本征值，因为硼不添加电子。
- [x] 约 $10^{3}\,\mathrm{cm^{-3}}$
- [ ] 零
::: solution
空穴是多数载流子，$p\approx N_A = 10^{17}\,\mathrm{cm^{-3}}$。由质量作用定律，$n = n_i^2/p = 10^{20}/10^{17} = 10^3\,\mathrm{cm^{-3}}$。电子密度被压到本征值以下：加入空穴会推动复合，直到 $np$ 回到 $n_i^2$。它不是零，而那寥寥几个少数载流子电子正是 p–n 结所依赖的东西。
:::
:::

### 漂移与扩散

半导体中的载流子因两种原因运动。电场使它们**漂移**，电子速度为 $-\mu_nE$，空穴速度为 $+\mu_pE$，其中迁移率 $\mu_n = e\tau_n/m_e^*$ 与 $\mu_p = e\tau_p/m_h^*$ 就是 [[condensed-matter/free-electrons]] 的德鲁德结果换上有效质量。密度梯度使它们**扩散**，像任何稀薄气体一样，按菲克（Fick）定律给出粒子流 $-D\,\nabla n$。电子电流密度是两者之和，

$$
j_n = ne\mu_nE + eD_n\deriv{n}{x},
$$ {#eq-drift-diffusion}

其中第二项的符号反映负电荷：沿 $-x$ 方向扩散——顺着正的密度梯度——的电子携带沿 $+x$ 方向的电流。金属中扩散电流可以忽略，因为密度一有变化就会招致巨大的电场。半导体中载流子密度在微米尺度上相差百万倍，扩散与漂移同等重要。

两个系数并不独立。在有势 $\phi(x)$ 的区域中达到平衡时电流为零，而玻尔兹曼分布要求 $n\propto e^{e\phi/k_BT}$，故 $\dd n/\dd x = (e/k_BT)\,n\,\dd\phi/\dd x = -(e/k_BT)\,nE$。在 [[#eq-drift-diffusion]] 中令 $j_n = 0$ 即得**爱因斯坦关系**

$$
D_n = \frac{k_BT}{e}\,\mu_n,
$$ {#eq-einstein-rel}

空穴同理。电子迁移率 $1400\,\mathrm{cm^2\,V^{-1}\,s^{-1}}$ 意味着常温下扩散系数 $36\,\mathrm{cm^2/s}$。同一个关系由爱因斯坦 1905 年对布朗粒子导出，它把载流子的无规行走同它们对力的响应联系起来；只要载流子非简并就成立。p–n 结正是漂移与扩散互相角力、打成平手的地方。

## p–n 结 {#pn}

取一个晶体，某个平面的一侧是 p 型、另一侧是 n 型，中间突变。达到平衡之前，n 侧电子众多、p 侧空穴众多，于是电子向 p 侧扩散、空穴向 n 侧扩散，并在那里复合。每个离开 n 侧的电子都露出一个固定的正施主离子；每个离开 p 侧的空穴都露出一个固定的负受主离子。结的周围建立起一层空间电荷，n 侧为正、p 侧为负，它的电场阻碍进一步的扩散。当该电场驱动的漂移恰好平衡扩散时，达到平衡。

平衡的简洁表述是：化学势——电子的电化学势——处处相同。远离结的两处都是均匀掺杂晶体，其 $\mu$ 相对各自的带边由 [[#eq-np]] 固定。两个 $\mu$ 要相等，能带本身必须移动：n 侧带边处电子的能量比 p 侧低 $eV_{bi}$，其中 $V_{bi}$ 是结两侧的静电势差。

::: theorem 内建电势 {#thm-vbi}
对 p 侧有 $N_A$ 个受主、n 侧有 $N_D$ 个施主的突变结，两者皆完全电离且非简并，n 侧相对 p 侧的电势为

$$
V_{bi} = \frac{k_BT}{e}\ln\frac{N_AN_D}{n_i^2}.
$$ {#eq-vbi}
:::

::: proof
n 侧远离结处 $n = N_D$，由 [[#eq-np]] 有 $E_c^{(n)} - \mu = k_BT\ln(N_c/N_D)$。p 侧 $p = N_A$，故 $\mu - E_v^{(p)} = k_BT\ln(N_v/N_A)$，结合 $E_c^{(p)} = E_v^{(p)} + E_g$ 得 $E_c^{(p)} - \mu = E_g - k_BT\ln(N_v/N_A)$。化学势相同，所以导带底的台阶为

$$
E_c^{(p)} - E_c^{(n)} = E_g - k_BT\ln\frac{N_v}{N_A} - k_BT\ln\frac{N_c}{N_D} = k_BT\Bigl[\frac{E_g}{k_BT} - \ln\frac{N_cN_v}{N_AN_D}\Bigr].
$$

由 [[#eq-mass-action]]，$E_g/k_BT = \ln(N_cN_v/n_i^2)$，故方括号即 $\ln(N_AN_D/n_i^2)$。电子的势能是静电势的 $-e$ 倍，所以 n 侧带边低 $eV_{bi}$，即得 [[#eq-vbi]]。
:::

### 耗尽近似

在过渡区中，载流子密度随势能指数下降，所以在其中大部分范围内它们与固定的离子电荷相比可以忽略。**耗尽近似**把这一点理想化：以 $x = 0$ 处的结为中心、$-x_p < x < x_n$ 的区域完全不含自由载流子，p 侧的电荷密度为 $-eN_A$，n 侧为 $+eN_D$，此区域之外材料呈中性。

::: theorem 耗尽层宽度 {#thm-depletion}
在耗尽近似下，外加电压为 $V$（p 侧接正时为正，即**正偏**），耗尽区的总宽度为

$$
W = x_n + x_p = \sqrt{\frac{2\varepsilon_s(V_{bi} - V)}{e}\Bigl(\frac1{N_A} + \frac1{N_D}\Bigr)},
$$ {#eq-width}

满足 $N_Ax_p = N_Dx_n$，其中 $\varepsilon_s$ 是半导体的介电常数。最大电场在结处，为 $E_\mathrm{max} = eN_Dx_n/\varepsilon_s$。
:::

::: proof
一维高斯定律 $\dd E/\dd x = \rho/\varepsilon_s$，中性区中 $E = 0$。p 侧 $\rho = -eN_A$，$E$ 从 $x = -x_p$ 处的 $0$ 线性降到 $x = 0$ 处的 $-eN_Ax_p/\varepsilon_s$。n 侧 $\rho = +eN_D$，$E$ 从 $x = 0$ 处的 $-eN_Dx_n/\varepsilon_s$ 线性升回 $x = x_n$ 处的 $0$。$E$ 在 $x = 0$ 处连续要求 $N_Ax_p = N_Dx_n$：层内总电荷为零。电势差是 $E$ 的积分取负——三角形的面积：

$$
V_{bi} - V = \frac12E_\mathrm{max}W = \frac{e}{2\varepsilon_s}\bigl(N_Ax_p^2 + N_Dx_n^2\bigr).
$$

代入 $x_n = WN_A/(N_A + N_D)$ 与 $x_p = WN_D/(N_A + N_D)$，方括号为 $W^2N_AN_D/(N_A + N_D)$，故 $V_{bi} - V = (eW^2/2\varepsilon_s)\,N_AN_D/(N_A+N_D)$，解出 $W$ 即得 [[#eq-width]]。外加电压全落在耗尽层上，因为电阻就在那里：中性区是良导体，正偏把势垒从 $V_{bi}$ 降为 $V_{bi} - V$。
:::

::: example 一个硅结 {#ex-junction}
硅结 $N_A = 1.0\times10^{17}\,\mathrm{cm^{-3}}$、$N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$。取 $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$、$\varepsilon_s = 11.7\varepsilon_0$，求零偏下的 $V_{bi}$、耗尽层宽度及其分配，以及峰值电场。
::: solution
由 [[#eq-vbi]]，

$$
V_{bi} = 0.025852\,\mathrm V\times\ln\frac{(10^{17})(10^{16})}{(10^{10})^2} = 0.025852\times\ln10^{13}\,\mathrm V = 0.025852\times29.934\,\mathrm V = 0.774\,\mathrm V.
$$

它小于能隙 $1.12\,\mathrm V$，本该如此。换算成 SI：$N_A = 10^{23}\,\mathrm{m^{-3}}$、$N_D = 10^{22}\,\mathrm{m^{-3}}$、$\varepsilon_s = 1.0359\times10^{-10}\,\mathrm{F/m}$。于是

$$
W = \sqrt{\frac{2(1.0359\times10^{-10})(0.774)}{1.602\times10^{-19}}\,(10^{-23} + 10^{-22})}\,\mathrm m = 3.32\times10^{-7}\,\mathrm m = 0.332\,\mu\mathrm m.
$$

由 $N_Ax_p = N_Dx_n$，耗尽层主要落在轻掺杂一侧：$x_n = W N_A/(N_A + N_D) = 0.302\,\mu\mathrm m$，$x_p = 0.030\,\mu\mathrm m$。峰值电场为

$$
E_\mathrm{max} = \frac{eN_Dx_n}{\varepsilon_s} = \frac{(1.602\times10^{-19})(10^{22})(3.016\times10^{-7})}{1.0359\times10^{-10}}\,\mathrm{V/m} = 4.7\times10^6\,\mathrm{V/m}.
$$

零偏之下，每厘米四十七千伏，压过三分之一个微米。$5\,\mathrm V$ 反偏把耗尽层展宽到 $0.91\,\mu\mathrm m$，电场升至 $1.3\times10^7\,\mathrm{V/m}$；接近 $3\times10^7\,\mathrm{V/m}$ 时硅因雪崩倍增而击穿。
:::
:::

::: quiz
在 [[#ex-junction]] 的结中，p 侧的掺杂浓度是 n 侧的十倍，哪些说法正确？
- [x] 耗尽层大部分位于 n 侧。
- [ ] 总电荷为零，所以耗尽层被平分。
- [x] n 侧正电荷总量等于 p 侧负电荷总量。
- [ ] 正偏使耗尽层变宽。
::: solution
整个层的中性 $N_Ax_p = N_Dx_n$ 意味着等量异号电荷，所以轻掺杂一侧需要更大的体积来容纳同样的电荷，因而承担大部分宽度：这里 $x_n = 10x_p$。由 [[#eq-width]]，正偏减小 $V_{bi} - V$，因而使层变窄；反偏使其变宽。
:::
:::

### 二极管方程

施加正偏电压 $V$。势垒降到 $e(V_{bi} - V)$，扩散与漂移的平衡被打破、偏向扩散：电子被注入 p 侧，空穴被注入 n 侧，它们在那里是少数载流子，一路扩散直到复合。反偏时势垒升高，只有两侧微小的少数载流子密度漂移过结。这种不对称就是整流器。

::: theorem 肖克利二极管方程 {#thm-diode}
对理想结——载流子穿过耗尽区不复合，注入的少数载流子密度远小于多数载流子密度——电流为

$$
I = I_s\bigl(e^{eV/k_BT} - 1\bigr),
$$ {#eq-diode}

其中**饱和电流** $I_s$ 与 $n_i^2$ 成正比、与 $V$ 无关。
:::

::: proof
证明分两步；第二步只是概略，完整处理见 Sze 与 Ng 第 2 章。*结定律。* 载流子密度在穿过耗尽区时与当地的势保持准平衡：$n$ 按 $e^{e\phi/k_BT}$ 变化。平衡时电子密度跨层由 $N_D$ 变到 $n_{p0} = n_i^2/N_A$，比值为 $e^{eV_{bi}/k_BT}$，与 [[#eq-vbi]] 相符。外加 $V$ 时势垒为 $V_{bi} - V$，于是耗尽层 p 侧边缘的电子密度变为

$$
n_p(-x_p) = n_{p0}\,e^{eV/k_BT}.
$$

*少数载流子的扩散。* 在中性 p 区，多余电子密度 $\delta n = n_p - n_{p0}$ 以扩散系数 $D_n$ 扩散、以寿命 $\tau_n$ 复合，满足 $D_n\,\delta n'' = \delta n/\tau_n$，其沿远离结方向衰减的解为 $\delta n\propto e^{-\abs{x}/L_n}$，扩散长度 $L_n = \sqrt{D_n\tau_n}$。边缘处的扩散电流密度为 $eD_n\,\delta n(-x_p)/L_n = (eD_nn_{p0}/L_n)(e^{eV/k_BT} - 1)$。加上注入 n 侧的同类空穴电流，再乘以结面积 $A$，

$$
I_s = eA\,n_i^2\Bigl(\frac{D_n}{L_nN_A} + \frac{D_p}{L_pN_D}\Bigr),
$$

它与 $n_i^2$ 成正比，不依赖 $V$。
:::

反偏、$V$ 为大的负值时，电流饱和于 $-I_s$：扩散到耗尽层边缘的少数载流子被扫过结去，而这样的载流子极少。正偏下电压每升 $25.85\,\mathrm{mV}$ 电流升 $e$ 倍，每 $59.5\,\mathrm{mV}$ 升十倍。由于 $I_s\propto n_i^2\propto e^{-E_g/k_BT}$，它对能隙大的材料极其微小，并随温度迅速增长，这就是硅二极管在固定电流下的正向电压每开尔文下降约 $2\,\mathrm{mV}$ 的原因——每一块电子温度计芯片都用得上这个事实。

::: widget plot
f: 10^(s + 3)*(exp(x/0.025852) - 1)
x: -0.3, 0.8
y: -2, 20
sliders: s=-12:-15:-9:0.1
caption: 理想二极管伏安特性 [[#eq-diode]] 在 $300\,\mathrm K$ 下的图像，电流以 mA 为单位，电压以伏为单位，饱和电流 $I_s = 10^{s}\,\mathrm A$。取 $s = -12$——小型硅二极管的典型值——约 $0.5\,\mathrm V$ 之前几乎无电流，随后电流陡然上升：熟悉的"导通电压"不过是指数曲线在毫安尺度上变得可见之处。把 $s$ 降三，相当于能隙更大的材料，拐点右移 $3\times59.5\,\mathrm{mV}$。反偏一侧电流为 $-I_s$，在此尺度上看不见。
:::

::: example 硅二极管的正向电流 {#ex-diode}
$300\,\mathrm K$ 的硅二极管 $I_s = 1.0\times10^{-12}\,\mathrm A$。求正偏 $0.50$、$0.60$、$0.70\,\mathrm V$ 以及反偏 $5.0\,\mathrm V$ 下的电流。
::: solution
由 $eV/k_BT = V/(0.025852\,\mathrm V)$，[[#eq-diode]] 给出

$$
I(0.50) = 10^{-12}(e^{19.34} - 1)\,\mathrm A = 0.25\,\mathrm{mA}, \quad I(0.60) = 10^{-12}e^{23.21}\,\mathrm A = 12\,\mathrm{mA}, \quad I(0.70) = 10^{-12}e^{27.08}\,\mathrm A = 0.57\,\mathrm A.
$$

每多加 $0.1\,\mathrm V$，电流乘 $e^{3.87} = 48$。反偏时 $e^{-193}$ 完全可以忽略，$I = -1.0\times10^{-12}\,\mathrm A$。$0.6\,\mathrm V$ 正向电流与 $5\,\mathrm V$ 反向电流之比是一百亿。真实二极管在两端都偏离理想定律：小正偏下耗尽区中的复合、大电流下中性区的电阻、反偏下耗尽区中的产生——但指数律是每一个二极管的内核。
:::
:::

## 器件 {#devices}

几条器件原理直接从结推出。

- **发光二极管与激光器。** 正偏下，注入直接带隙材料的结中的电子与空穴复合，发射能量接近 $E_g$ 的光子。砷化镓在近红外 $873\,\mathrm{nm}$ 发光；如今照亮大多数建筑的蓝光与白光发光二极管用的是氮铟镓，赤崎勇（Isamu Akasaki）、天野浩（Hiroshi Amano）与中村修二（Shuji Nakamura）因研制它获得 2014 年诺贝尔奖。
- **光电二极管与太阳能电池。** 反着用：在耗尽层内或其近旁被吸收的光子产生电子–空穴对，内建电场把它们分开，形成电流。单个结在阳光下由细致平衡给出的极限——肖克利（Shockley）与奎塞尔（Queisser），1961——把效率上限压到约 $33\%$；实验室里最好的硅电池达到约 $27\%$，而截至 2026 年，晶体硅占到所产太阳能组件的绝大多数。
- **晶体管。** 双极晶体管是两个结背靠背——n–p–n——中间一层很薄：流入基极的小电流控制从发射极到集电极的大电流。场效应晶体管，尤其是金属–氧化物–半导体场效应晶体管（MOSFET），则用栅极上的电压——以薄氧化层与硅绝缘——在两个 n 型区之间创建或移除一条薄导电沟道。MOSFET 是数字逻辑的开关。截至 2026 年，最先进的芯片包含数百亿只这样的开关，而前沿制造工艺已从前十年的鳍形晶体管转向"全环栅"设计——栅极包裹一叠薄硅片。

::: application 测量掺杂分布
反偏下耗尽层是宽为 $W$ 的平行板电容器，单位面积电容 $C/A = \varepsilon_s/W$。由于 $W^2\propto V_{bi} - V$，单侧结的 $1/C^2$ 对 $V$ 作图是一条直线，其斜率给出轻掺杂侧的掺杂浓度，截距给出 $V_{bi}$（见 [[#exr-cv]]）。这种**电容–电压剖析**是每一个半导体实验室的标准测量。同样依赖电压的电容使反偏二极管成为可调电容——变容二极管——用于调谐收音机。
:::

::: history 整流器、结与晶体管
费迪南德·布劳恩（Ferdinand Braun）1874 年在金属–硫化物接触处观察到整流，晶体检波器是最早的无线电接收器。理论要等能带论：艾伦·威尔逊（Alan Wilson）1931 年的论文把半导体解释为带小能隙与杂质能级的绝缘体。贝尔实验室的拉塞尔·奥尔（Russell Ohl）1940 年在一根硅棒中发现了 p–n 结，注意到纯化程度不同的区域交界处存在光电压。1947 年 12 月，约翰·巴丁（John Bardeen）与沃尔特·布拉顿（Walter Brattain）在贝尔实验室演示了点接触晶体管；威廉·肖克利（William Shockley）在 1948 与 1949 年发明结型晶体管，并导出了 [[#thm-diode]] 的二极管方程；三人分享了 1956 年诺贝尔奖。穆罕默德·阿塔拉（Mohamed Atalla）与姜大元（Dawon Kahng）1959 年做出第一只可工作的 MOSFET；杰克·基尔比（Jack Kilby，1958）与罗伯特·诺伊斯（Robert Noyce，1959）各自独立发明了集成电路。
:::

## 后续内容 {#leads}

这里的思想贯穿应用物理与电气工程。不同半导体之间的异质结把电子限制在几纳米厚的层中，其量子化能级就是 [[quantum-1/schrodinger-equation]] 的箱中粒子态；低温强场下这样的二维电子气展示量子霍尔效应。强场输运、热载流子、隧穿二极管与 MOSFET 物理在 Sze 与 Ng 的书中展开。半导体材料的化学——从硅提纯到钙钛矿太阳能吸收层——见化学图谱（[固体电子结构](/learn/chemistry/lesson.php?c=materials-chemistry&l=electronic-structure-solids)与[能源材料](/learn/chemistry/lesson.php?c=materials-chemistry&l=energy-materials)）。下一章 [[condensed-matter/magnetism-superconductivity]] 离开独立电子图像，走向电子的集体态。

::: summary
- 半导体有一条填满的价带与一条空着的导带，中间隔着量级为 $1\,\mathrm{eV}$ 的能隙；价带中的空穴充当正电荷载流子。
- 非简并载流子服从玻尔兹曼统计：$n = N_ce^{-(E_c-\mu)/k_BT}$，$p = N_ve^{-(\mu-E_v)/k_BT}$，其中 $N_c, N_v\sim10^{19}\,\mathrm{cm^{-3}}$。
- 质量作用定律 $np = n_i^2 = N_cN_ve^{-E_g/k_BT}$ 无论掺杂如何都成立；硅在 $300\,\mathrm K$ 下 $n_i\approx1.0\times10^{10}\,\mathrm{cm^{-3}}$。
- 施主与受主是常温下电离的浅类氢杂质；多数载流子密度等于净掺杂浓度，少数载流子密度是 $n_i^2$ 除以其。
- p–n 结有内建电势 $V_{bi} = (k_BT/e)\ln(N_AN_D/n_i^2)$ 与宽 $\sqrt{2\varepsilon_s(V_{bi}-V)(1/N_A+1/N_D)/e}$ 的耗尽层——不到一微米。
- 理想二极管服从 $I = I_s(e^{eV/k_BT} - 1)$：正偏每 $59.5\,\mathrm{mV}$ 电流升十倍，反偏有微小的、正比于 $n_i^2$ 的饱和电流。
:::

## 习题 {#exercises}

::: exercise 少数电子 {level=1 check="1e5"}
硅掺硼 $N_A = 1.0\times10^{15}\,\mathrm{cm^{-3}}$。取 $n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$，求 $300\,\mathrm K$ 下的电子密度，以 $\mathrm{cm^{-3}}$ 为单位。
::: solution
空穴是多数载流子，$p = N_A = 1.0\times10^{15}\,\mathrm{cm^{-3}}$，因为 $N_A\gg n_i$。由 [[#eq-mass-action]]，$n = n_i^2/p = 10^{20}/10^{15} = 1.0\times10^{5}\,\mathrm{cm^{-3}}$。
:::
:::

::: exercise 砷化镓发光二极管的颜色 {level=1 check="873"}
砷化镓 $E_g = 1.42\,\mathrm{eV}$。求能量为 $E_g$ 的光子波长，以纳米为单位。
::: solution
$\lambda = hc/E_g = (6.62607\times10^{-34})(2.99792\times10^8)/(1.42\times1.60218\times10^{-19})\,\mathrm m = 8.73\times10^{-7}\,\mathrm m = 873\,\mathrm{nm}$，在近红外波段。一个好用的规则 $\lambda\,[\mathrm{nm}] = 1239.8/E\,[\mathrm{eV}]$ 给出同样结果。可见光发射需要约 $1.8\,\mathrm{eV}$ 以上的能隙，这就是红光发光二极管用 $\mathrm{AlGaInP}$ 一类合金、蓝光发光二极管用 $\mathrm{InGaN}$ 的原因。
:::
:::

::: exercise 锗中的施主 {level=1 check="6.38"}
锗中 $\varepsilon_r = 16.0$，电导有效质量为 $0.12\,m$。估算类氢施主的束缚能，以 meV 为单位。
::: solution
由 [[#eq-donor]]，$E_d = (0.12/16.0^2)\times13.606\,\mathrm{eV} = 4.6875\times10^{-4}\times13.606\,\mathrm{eV} = 6.38\,\mathrm{meV}$。轨道半径为 $(16.0/0.12)\times0.529\,\text{Å} = 71\,\text{Å}$，超过十二个晶格常数，所以连续模型在这里比在硅中更好；锗中实测施主束缚能约为 $10$–$13\,\mathrm{meV}$。
:::
:::

::: exercise 对称结 {level=2 check="0.714"}
求硅结 $N_A = N_D = 1.0\times10^{16}\,\mathrm{cm^{-3}}$ 在 $300\,\mathrm K$、$n_i = 1.0\times10^{10}\,\mathrm{cm^{-3}}$ 下的内建电势，以伏为单位。
::: solution
由 [[#eq-vbi]]，$V_{bi} = 0.025852\,\mathrm V\times\ln(10^{32}/10^{20}) = 0.025852\times\ln10^{12}\,\mathrm V = 0.025852\times27.631\,\mathrm V = 0.714\,\mathrm V$。掺杂乘积每十倍增加 $59.5\,\mathrm{mV}$；内建电势绝不能超过大约 $E_g/e$，因为更重的掺杂会使材料简并。
:::
:::

::: exercise 加热硅 {level=2 check="27.8"}
设 $E_g = 1.12\,\mathrm{eV}$ 不依赖温度，硅的 $n_i$ 从 $300\,\mathrm K$ 到 $350\,\mathrm K$ 增加多少倍？
::: solution
由 [[#eq-ni]]，$n_i\propto T^{3/2}e^{-E_g/2k_BT}$。幂因子给出 $(350/300)^{3/2} = 1.260$。指数因子给出 $\exp\bigl[\frac{E_g}{2k_B}\bigl(\frac1{300} - \frac1{350}\bigr)\bigr]$；由 $E_g/2k_B = 6498\,\mathrm K$ 与 $\frac1{300} - \frac1{350} = 4.762\times10^{-4}\,\mathrm{K^{-1}}$，指数为 $3.094$，因子为 $22.07$。乘积为 $27.8$。温度上升 $17\%$ 使 $n_i$ 增大近三十倍，使正比于 $n_i^2$ 的二极管饱和电流增大近八百倍。
:::
:::

::: exercise 正向电压 {level=2 check="0.536"}
二极管 $I_s = 1.0\times10^{-12}\,\mathrm A$ 要在 $300\,\mathrm K$ 下通过 $1.0\,\mathrm{mA}$。需要多大的正向电压，以伏为单位？
::: solution
反解 [[#eq-diode]]：$V = (k_BT/e)\ln(1 + I/I_s) = 0.025852\times\ln(1 + 10^9)\,\mathrm V = 0.025852\times20.723\,\mathrm V = 0.536\,\mathrm V$。那个"一"无关紧要。十倍电流只需多 $59.5\,\mathrm{mV}$，所以无论电流多大，硅二极管的正向电压都被笼统地引作 $0.6$–$0.7\,\mathrm V$。
:::
:::

::: exercise 反偏 {level=2 check="0.906"}
对 [[#ex-junction]] 的结，求反偏 $5.0\,\mathrm V$ 下的耗尽层宽度，以微米为单位。
::: solution
在 [[#eq-width]] 中把 $V_{bi}$ 换成 $V_{bi} - V = 0.774 + 5.0 = 5.774\,\mathrm V$。由 $W\propto\sqrt{V_{bi} - V}$，$W = 0.332\,\mu\mathrm m\times\sqrt{5.774/0.774} = 0.332\times2.731\,\mu\mathrm m = 0.906\,\mu\mathrm m$。峰值电场按同样比例上升，达 $1.27\times10^7\,\mathrm{V/m}$。
:::
:::

::: exercise 电容–电压剖析 {#exr-cv level=3}
对 $N_A\gg N_D$ 的单侧结，证明耗尽层单位面积电容满足 $1/(C/A)^2 = 2(V_{bi} - V)/(e\varepsilon_sN_D)$，并说明如何从 $1/C^2$ 对 $V$ 的图像读出 $N_D$ 与 $V_{bi}$。
::: solution
当 $N_A\gg N_D$ 时 [[#eq-width]] 化为 $W^2 = 2\varepsilon_s(V_{bi} - V)/(eN_D)$，且 $W$ 几乎全部落在 n 侧。小变化 $\dd V$ 使层两侧单位面积的电荷变化 $\dd Q = eN_D\,\dd W$，所以微分电容为 $C/A = \dd Q/\dd V$。由 $W\,\dd W = -\varepsilon_s\,\dd V/(eN_D)$，$\abs{\dd Q/\dd V} = eN_D\varepsilon_s/(eN_DW) = \varepsilon_s/W$，即平行板结果。于是

$$
\frac{1}{(C/A)^2} = \frac{W^2}{\varepsilon_s^2} = \frac{2(V_{bi} - V)}{e\varepsilon_sN_D}.
$$

这对 $V$ 是线性的，斜率为 $-2/(e\varepsilon_sN_D)$，所以 $N_D$ 由斜率得出，直线在 $V = V_{bi}$ 处穿过 $1/C^2 = 0$。若掺杂随深度变化，局部斜率给出深度 $W = \varepsilon_sA/C$ 处的 $N_D$，这就是测量掺杂分布的方法。
:::
:::

::: exercise 本征费米能级 {level=3 check="-5.58"}
由 [[#eq-np]] 导出 [[#eq-mui]]，并求硅在 $300\,\mathrm K$ 下的 $\mu_i - (E_c + E_v)/2$，以 meV 为单位。
::: solution
令 $n = p$：$N_ce^{-(E_c - \mu)/k_BT} = N_ve^{-(\mu - E_v)/k_BT}$。取对数，$\ln N_c - (E_c - \mu)/k_BT = \ln N_v - (\mu - E_v)/k_BT$，故 $2\mu = E_c + E_v + k_BT\ln(N_v/N_c)$。由 $N_v/N_c = (m_h^*/m_e^*)^{3/2}$，

$$
\mu_i = \frac{E_c + E_v}{2} + \frac34k_BT\ln\frac{m_h^*}{m_e^*}.
$$

对硅，$\frac34(25.852\,\mathrm{meV})\ln(0.81/1.08) = 19.389\times(-0.28768)\,\mathrm{meV} = -5.58\,\mathrm{meV}$。能级稍偏向载流子较轻的能带，这里是价带，因为态数较少的能带必须被更接近才能容纳同样多的载流子。
:::
:::

::: exercise 黄金比例 {level=3 check="(1+sqrt(5))/2"}
一硅样品的施主密度恰等于 $n_i$，且不含受主。求 $n/n_i$。
::: solution
由 [[#prop-doped]]，取 $N = n_i$，

$$
n = \frac{n_i}{2} + \sqrt{\frac{n_i^2}{4} + n_i^2} = n_i\,\frac{1 + \sqrt5}{2},
$$

所以 $n/n_i = (1 + \sqrt5)/2 = 1.618$，黄金比例，且 $p/n_i = 2/(1 + \sqrt5) = 0.618$。检验电中性：$n - p = 1.618n_i - 0.618n_i = n_i = N_D$。检验质量作用：$np = n_i^2$，因为 $\phi\cdot(1/\phi) = 1$。[[#prop-doped]] 的两个极限在这里都不适用，这就是掺杂与 $n_i$ 可比时需要完整二次方程的原因——接近纯净的材料或高温下正是如此。
:::
:::
