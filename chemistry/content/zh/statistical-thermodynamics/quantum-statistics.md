铜中每个原子约贡献一个自由电子，这些电子在金属中的穿行，正如气体原子在烧瓶中的穿行一样自由。因此经典电子气应当给铜的摩尔热容再添$\tfrac{3}{2}R$——比晶格振动还多半倍。测量却丝毫没有这种事：室温下电子贡献不足$\tfrac{3}{2}R$的$1\,\%$。而在低温下，一切晶体固体的热容都远远低于经典的$3R$——杜隆（Dulong）与珀蒂（Petit）定律的值——并随$T^{3}$消失。两个反常有同一个根源。当粒子数与热可及状态数相比不再是小数目时，前面各课的玻尔兹曼计数——它假定两个粒子从不会竞争同一个状态——就失效了，而取而代之的是什么，取决于粒子是不肯共享状态的费米子，还是喜欢挤进同一个状态的玻色子。

本课建立两种量子统计。我们从巨正则系综导出费米-狄拉克（Fermi-Dirac）与玻色-爱因斯坦（Bose-Einstein）分布，说明两者如何在[[statistical-thermodynamics/canonical-ensemble]]中辨认出的经典极限下回到玻尔兹曼分布，并把它们用于金属中的电子（费米能与电子热容）、光子（普朗克辐射定律）以及液氦原子（玻色-爱因斯坦凝聚）。最后，我们用爱因斯坦（Einstein）模型与德拜（Debye）模型处理晶体的振动——其量子本身也是玻色子——这两个模型解释了固体的低温热容，并支撑着[[thermodynamics/second-law]]中以量热为基础的热力学第三定律熵。

## 玻色子、费米子与占据数

量子力学按全同粒子体系波函数在交换任意两个粒子时的对称性，把全同粒子分为两类（[[quantum-chemistry/many-electron-atoms]]）。

::: definition 玻色子、费米子与占据数 {#def-bose-fermi}
交换时波函数*对称*的粒子是**玻色子**；它们取整数自旋（光子、声子、$^{4}\mathrm{He}$原子、$\mathrm{H_2}$与$\mathrm{D_2}$分子）。交换时波函数*反对称*的粒子是**费米子**；它们取半整数自旋（电子、质子、中子、$^{3}\mathrm{He}$原子）。对于单粒子状态$i$具有能量$\varepsilon_i$的独立粒子，整个体系的一个状态由**占据数**$n_i$——每个单粒子状态上的粒子数——完全指定。对玻色子，$n_i = 0, 1, 2, \ldots$；对费米子，泡利不相容原理把$n_i$限制为$0$或$1$。
:::

正则系综的难处在于约束$\sum_in_i = N$，它把一切占据数耦合在一起。巨正则系综消去了这个约束：当体系能与之交换粒子的库的化学势为$\mu$时，粒子数成为涨落量，每个单粒子状态都可以独立处理。

::: proposition 费米-狄拉克分布与玻色-爱因斯坦分布 {#prop-fd-be}
对处于温度$T$、化学势$\mu$下平衡的独立费米子或玻色子，能量为$\varepsilon$的单粒子状态的平均占据数为
$$
\langle n\rangle_\mathrm{FD} = \frac{1}{e^{(\varepsilon - \mu)/k_\mathrm{B}T} + 1}\quad(\text{费米子}),
\qquad
\langle n\rangle_\mathrm{BE} = \frac{1}{e^{(\varepsilon - \mu)/k_\mathrm{B}T} - 1}\quad(\text{玻色子}).
$$ {#eq-fd-be}
化学势由平均粒子数$N = \sum_i\langle n_i\rangle$固定。对玻色子，$\mu$必须低于最低单粒子能量，才能使每个$\langle n\rangle$为正。
:::

::: proof
巨正则系综中，能量为$E$、粒子数为$N$的体系状态的概率正比于$e^{-\beta(E - \mu N)}$（推导与[[statistical-thermodynamics/canonical-ensemble#prop-canonical]]平行，只是对系综的粒子数约束多了一个拉格朗日乘数$-\beta\mu$）。对独立粒子，$E - \mu N = \sum_in_i(\varepsilon_i - \mu)$，故权重因子化为彼此独立的因子，每个单粒子状态一个。对某一个能量为$\varepsilon$的状态，记$x = e^{-\beta(\varepsilon - \mu)}$。它的巨配分函数是$\xi = \sum_n x^{n}$，对容许的占据数求和：
$$
\xi_\mathrm{FD} = 1 + x, \qquad \xi_\mathrm{BE} = 1 + x + x^{2} + \cdots = \frac{1}{1 - x}\quad(x < 1).
$$
平均占据数为$\langle n\rangle = \sum_n nx^{n}/\xi = x\,\mathrm{d}\ln\xi/\mathrm{d}x$。对费米子，$\langle n\rangle = x/(1 + x) = 1/(x^{-1} + 1)$；对玻色子，$\langle n\rangle = x/(1 - x) = 1/(x^{-1} - 1)$。代入$x^{-1} = e^{\beta(\varepsilon - \mu)}$即得[[#eq-fd-be]]。玻色求和收敛要求$x < 1$，即每个状态都有$\varepsilon > \mu$。
:::

两个分布只差$1$的符号，但当$\varepsilon - \mu$很小时，这个符号关系极大。若对一切状态都有$e^{\beta(\varepsilon - \mu)} \gg 1$，两者都化为
$$
\langle n\rangle \approx e^{-\beta(\varepsilon - \mu)} ,
$$
这就是$e^{\beta\mu} = N/q$的玻尔兹曼分布。这就是**经典极限**：每个状态都只有稀疏的占据（$\langle n\rangle \ll 1$），第二个粒子*能否*加入的问题根本无从谈起。对理想气体，$q = V/\Lambda^{3}$（乘以内部因子），$\mu = k_\mathrm{B}T\ln(N\Lambda^{3}/V)$；经典条件$\langle n\rangle \ll 1$就是[[statistical-thermodynamics/canonical-ensemble#eq-classical]]的条件$N\Lambda^{3}/V \ll 1$。室温、$1\ \mathrm{bar}$下的氩，$\mu/k_\mathrm{B}T = \ln(1.0\times10^{-7}) = -16.1$，是一个很大的负化学势，量子修正为$10^{-7}$量级。

::: widget plot
f: 1/(exp(x) + 1); 1/(exp(x) - 1); exp(-x)
x: -3, 5
y: 0, 2.5
labels: \text{费米-狄拉克}; \text{玻色-爱因斯坦}; \text{玻尔兹曼}
caption: 单粒子状态的平均占据$\langle n\rangle$对$x = (\varepsilon - \mu)/k_\mathrm{B}T$作图，画出三种统计。$x \gtrsim 3$时三条曲线重合：状态占据稀疏，经典（玻尔兹曼）描述已足够精确。随$x$下降，费米-狄拉克占据饱和于1（不相容原理），玻尔兹曼占据无限制增长，玻色-爱因斯坦占据在$x \to 0^{+}$时发散——玻色子堆进化学势正上方的那些状态。（$x \le 0$处玻色-爱因斯坦曲线没有意义。）
:::

::: warning 量子统计不等同于量子化的能级 {#warn-quantum-stats}
本课程的每一课都用到过量子化的能级——转动的、振动的、平动的——但只有这一课用到量子*统计*。两者是独立的观念。用量子化能级的玻尔兹曼统计完全能够给出[[statistical-thermodynamics/thermodynamic-functions]]的振动热容；只有当粒子开始竞争状态，即$N\Lambda^{3}/V$不小，量子统计才成为必需。化学上有意义的例子是金属中的电子、液氦与超冷原子气体；普通气体与液体则不是，无论它们的分子多轻。反过来，也不要对*同一个分子内部*的电子套用费米-狄拉克统计：那里的泡利原理由[[quantum-chemistry/many-electron-atoms]]的反对称波函数处理，而不是由热分布处理。
:::

## 金属中的电子

钠、铜这类简单金属的价电子，在一级近似下表现为装在晶体大小的一只箱子里的自由费米子气，即**自由电子模型**。它们的数密度巨大——钠中为$2.65\times10^{28}\ \mathrm{m^{-3}}$，每原子一个——而质量微小，所以室温下$N\Lambda^{3}/V \approx 2\times10^{3}$。气体深入量子区。

::: example 简并与非简并电子气 {#ex-degeneracy}
比较$300\ \mathrm{K}$下钠的传导电子（$2.65\times10^{28}\ \mathrm{m^{-3}}$）与中等掺杂n型硅晶体的传导电子（$1.0\times10^{22}\ \mathrm{m^{-3}}$）的$N\Lambda^{3}/V$，并说明各需哪种统计。
::: solution
对$300\ \mathrm{K}$的电子，
$$
\Lambda_\mathrm{e} = \frac{h}{(2\pi m_\mathrm{e}k_\mathrm{B}T)^{1/2}} = \frac{6.626\times10^{-34}}{(2\pi\times9.109\times10^{-31}\times1.3807\times10^{-23}\times300)^{1/2}}\ \mathrm{m} = 4.30\times10^{-9}\ \mathrm{m},
$$
约为氩原子热波长的270倍，因为电子轻$73\,000$倍。于是$\Lambda_\mathrm{e}^{3} = 7.96\times10^{-26}\ \mathrm{m^{3}}$，
$$
\text{Na: } N\Lambda^{3}/V = 2.65\times10^{28}\times7.96\times10^{-26} = 2.1\times10^{3}, \qquad
\text{Si: } N\Lambda^{3}/V = 1.0\times10^{22}\times7.96\times10^{-26} = 8.0\times10^{-4}.
$$
金属的电子是**简并**的费米气，密度比玻尔兹曼统计所能容忍的大几千倍：非用费米-狄拉克统计不可。半导体的传导电子稀薄一百万倍，是**非简并**气体：玻尔兹曼统计精确成立，这就是半导体物理中载流子浓度可写成简单形式$n \propto e^{-(E_\mathrm{c} - \mu)/k_\mathrm{B}T}$的原因（[[materials-chemistry/electronic-structure-solids]]）。只有在重掺杂（"简并"）半导体中，超过约$10^{25}\ \mathrm{m^{-3}}$，才有必要改用费米-狄拉克形式。
:::
:::

$T = 0$时费米-狄拉克分布是一个台阶：$\varepsilon < \mu$时$\langle n\rangle = 1$，$\varepsilon > \mu$时为$0$。电子从最低状态填起，每个平动状态两个（自旋向上与向下），一直填到一个称为**费米能**$E_\mathrm{F} = \mu(T = 0)$的能量。

::: proposition 自由电子气的费米能 {#prop-fermi}
对体积$V$中$N$个质量为$m_\mathrm{e}$的自由电子，包括两种自旋取向在内的单粒子状态密度为
$$
g(\varepsilon) = 4\pi V\left(\frac{2m_\mathrm{e}}{h^{2}}\right)^{3/2}\varepsilon^{1/2},
$$ {#eq-dos}
费米能为
$$
E_\mathrm{F} = \frac{h^{2}}{8m_\mathrm{e}}\left(\frac{3N}{\pi V}\right)^{2/3} .
$$ {#eq-fermi}
$T = 0$时每个电子的平均能量为$\tfrac{3}{5}E_\mathrm{F}$；**费米温度**为$T_\mathrm{F} = E_\mathrm{F}/k_\mathrm{B}$。
:::

::: proof
边长为$L$的立方箱中粒子的平动状态具有能量$\varepsilon = (h^{2}/8m_\mathrm{e}L^{2})(n_x^{2} + n_y^{2} + n_z^{2})$，$n_x, n_y, n_z$为正整数。能量低于$\varepsilon$的状态数，是半径$R = (8m_\mathrm{e}L^{2}\varepsilon/h^{2})^{1/2}$的球在正卦限内的格点数，$R$大时为$\tfrac{1}{8}\cdot\tfrac{4}{3}\pi R^{3}$。计入自旋加倍，
$$
\mathcal{N}(\varepsilon) = 2\times\frac{\pi}{6}\left(\frac{8m_\mathrm{e}L^{2}\varepsilon}{h^{2}}\right)^{3/2} = \frac{\pi V}{3}\left(\frac{8m_\mathrm{e}\varepsilon}{h^{2}}\right)^{3/2} .
$$
它的导数，$g = \mathrm{d}\mathcal{N}/\mathrm{d}\varepsilon = \tfrac{\pi V}{2}(8m_\mathrm{e}/h^{2})^{3/2}\varepsilon^{1/2} = 4\pi V(2m_\mathrm{e}/h^{2})^{3/2}\varepsilon^{1/2}$，即[[#eq-dos]]。$T = 0$时直到$E_\mathrm{F}$的一切状态都被填满，故$\mathcal{N}(E_\mathrm{F}) = N$，重新排列即得[[#eq-fermi]]。平均能量为$\int_0^{E_\mathrm{F}}\varepsilon g\,\mathrm{d}\varepsilon/\int_0^{E_\mathrm{F}}g\,\mathrm{d}\varepsilon = (\tfrac{2}{5}E_\mathrm{F}^{5/2})/(\tfrac{2}{3}E_\mathrm{F}^{3/2}) = \tfrac{3}{5}E_\mathrm{F}$。
:::

::: example 钠与铜的费米能 {#ex-fermi}
计算钠（每立方米$2.65\times10^{28}$个传导电子）与铜（$8.47\times10^{28}\ \mathrm{m^{-3}}$）的$E_\mathrm{F}$与$T_\mathrm{F}$，以及铜中费米能处电子的速率。
::: solution
对钠，$3N/\pi V = 3\times2.65\times10^{28}/\pi = 2.531\times10^{28}\ \mathrm{m^{-3}}$，其$\tfrac{2}{3}$次幂为$8.62\times10^{18}\ \mathrm{m^{-2}}$。又$h^{2}/8m_\mathrm{e} = (6.626\times10^{-34})^{2}/(8\times9.109\times10^{-31}) = 6.025\times10^{-38}\ \mathrm{J\,m^{2}}$，
$$
E_\mathrm{F}(\mathrm{Na}) = 6.025\times10^{-38}\times8.62\times10^{18}\ \mathrm{J} = 5.19\times10^{-19}\ \mathrm{J} = 3.24\ \mathrm{eV}, \qquad T_\mathrm{F} = 3.76\times10^{4}\ \mathrm{K}.
$$
对铜，密度大$3.20$倍，故$E_\mathrm{F}$大$3.20^{2/3} = 2.17$倍：$E_\mathrm{F}(\mathrm{Cu}) = 7.03\ \mathrm{eV}$，$T_\mathrm{F} = 8.16\times10^{4}\ \mathrm{K}$。费米速率为$v_\mathrm{F} = (2E_\mathrm{F}/m_\mathrm{e})^{1/2} = 1.57\times10^{6}\ \mathrm{m\,s^{-1}}$，约为光速的$0.5\,\%$。即使在绝对零度，铜的传导电子也比$10^{6}\ \mathrm{K}$气体中的任何分子跑得快：决定其能量的是不相容原理，不是温度。室温不足$T_\mathrm{F}$的$0.4\,\%$，所以金属中的电子气就热学而言永远处于"冷"态。
:::
:::

### 电子热容

在$T \ll T_\mathrm{F}$的温度下，费米-狄拉克台阶在$E_\mathrm{F}$附近几个$k_\mathrm{B}T$的宽度内变得平缓。只有费米面附近约$k_\mathrm{B}T$范围内的电子能被热激发，因为更深的电子够不到空态。可激发电子的比例大致是$T/T_\mathrm{F}$，每个大致获得$k_\mathrm{B}T$，故热能为$Nk_\mathrm{B}T^{2}/T_\mathrm{F}$量级，热容为$Nk_\mathrm{B}T/T_\mathrm{F}$量级。精确的低温结果（索末菲（Sommerfeld）展开）是
$$
C_{V,\mathrm{m}}^\mathrm{el} = \frac{\pi^{2}}{2}R\,\frac{T}{T_\mathrm{F}} = \gamma T ,
$$ {#eq-cel}
以每摩尔电子计。对$300\ \mathrm{K}$的铜，这等于$(\pi^{2}/2)\times8.3145\times300/81\,600 = 0.15\ \mathrm{J\,K^{-1}\,mol^{-1}}$，是经典值$\tfrac{3}{2}R$的百分之一——本课开头之谜就此解开。

::: widget plot
f: 1/(exp((x - 1)/t) + 1); if(x < 1, 1, 0)
x: 0, 2
y: 0, 1.1
sliders: t=0.05:0.005:0.5:0.005
labels: T > 0; T = 0
caption: 电子状态的费米-狄拉克占据对$\varepsilon/E_\mathrm{F}$作图，约化温度$t = T/T_\mathrm{F}$（滑块），取$\mu \approx E_\mathrm{F}$（精度为$t^{2}$量级）。$t = 0.005$——约相当于$400\ \mathrm{K}$的铜——时，台阶只在$E_\mathrm{F}$附近宽约$k_\mathrm{B}T$的一条细带内被抹平；只有这些电子对加热有响应，这就是金属电子热容如此之小的原因。即使在$t = 0.05$——早该使金属沸腾的温度——分布仍然看得出是一个台阶。
:::

## 玻色子：光子与玻色-爱因斯坦凝聚

光子是不守恒粒子数的玻色子——腔壁随意吸收和发射它们——所以其化学势为零。取$\mu = 0$，玻色-爱因斯坦分布给出频率$\nu$的一个模式中的平均光子数$1/(e^{h\nu/k_\mathrm{B}T} - 1)$，再乘以光子模式密度（单位体积单位频率$8\pi\nu^{2}/c^{3}$，含两种偏振）并乘以$h\nu$，就得到**普朗克辐射定律**：
$$
\rho(\nu)\,\mathrm{d}\nu = \frac{8\pi h\nu^{3}}{c^{3}}\,\frac{\mathrm{d}\nu}{e^{h\nu/k_\mathrm{B}T} - 1} .
$$
正是这一定律1900年的推导开启了量子理论（[[quantum-chemistry/quantum-foundations]]）。以单位波长表示时，其峰位服从维恩（Wien）位移定律，$\lambda_\text{max}T = hc/4.965k_\mathrm{B} = 2.898\ \mathrm{mm\,K}$：$5772\ \mathrm{K}$的太阳光球峰在$502\ \mathrm{nm}$附近，$288\ \mathrm{K}$的地球峰在红外$10\ \mu\mathrm{m}$附近——正是$\mathrm{CO_2}$与$\mathrm{H_2O}$吸收的区域（[[environmental-chemistry/greenhouse-gases]]）。

对一切频率积分普朗克定律，得光子气的总能量密度$u = aT^{4}$，其中$a = 8\pi^{5}k_\mathrm{B}^{4}/15h^{3}c^{3}$；黑表面单位面积辐射的功率为$\sigma T^{4}$，其中**斯特藩-玻尔兹曼常数**$\sigma = ac/4 = 2\pi^{5}k_\mathrm{B}^{4}/15h^{3}c^{2} = 5.670\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$——一个完全由$k_\mathrm{B}$、$h$与$c$构成的常数，而在$k_\mathrm{B}$、$h$、$c$中任何一个被单独知道之前很久，它就已经被测出。

::: example 室温下的光子气 {#ex-photons}
利用$u = aT^{4}$与$n = 16\pi\zeta(3)(k_\mathrm{B}T/hc)^{3}$（$\zeta(3) = 1.202$），计算$300\ \mathrm{K}$下黑体光子的能量密度与数密度。把数密度与$1\ \mathrm{bar}$下空气分子的数密度比较，并以$k_\mathrm{B}T$为单位求光子的平均能量。
::: solution
$a = 4\sigma/c = 4\times5.670\times10^{-8}/2.998\times10^{8} = 7.566\times10^{-16}\ \mathrm{J\,m^{-3}\,K^{-4}}$，故$u = 7.566\times10^{-16}\times(300)^{4} = 6.13\times10^{-6}\ \mathrm{J\,m^{-3}}$。由$k_\mathrm{B}T/hc = 300/0.014\,388\ \mathrm{m^{-1}} = 2.085\times10^{4}\ \mathrm{m^{-1}}$，
$$
n = 16\pi\times1.202\times(2.085\times10^{4})^{3}\ \mathrm{m^{-3}} = 5.5\times10^{14}\ \mathrm{m^{-3}} .
$$
$1\ \mathrm{bar}$、$300\ \mathrm{K}$的空气有$p/k_\mathrm{B}T = 2.4\times10^{25}$个分子每立方米——多约$4\times10^{10}$倍。光子的平均能量为$u/n = 2.70\,k_\mathrm{B}T$。常温下光子气携带的热容可以忽略（只有在恒星里才要紧，那里$T^{4}$占上风），但它的*通量*，$\sigma T^{4} = 459\ \mathrm{W\,m^{-2}}$（$300\ \mathrm{K}$的黑表面），主宰着地球表面的能量平衡。
:::
:::

对粒子数*守恒*的玻色子——$^{4}\mathrm{He}$原子，或现代超冷气体实验中的铷与钠原子——低温下会发生一件奇事。化学势随$T$下降而向基态能量升起，在某个临界温度处到达基态；低于这一温度，激发态再也装不下全部粒子，多余的部分便积聚在最低的单一状态上：**玻色-爱因斯坦凝聚**。理想玻色气的临界温度为
$$
T_\mathrm{c} = \frac{h^{2}}{2\pi mk_\mathrm{B}}\left(\frac{N/V}{2.612}\right)^{2/3},
$$ {#eq-bec}
其中$2.612 = \zeta(\tfrac{3}{2})$；它就是使$N\Lambda^{3}/V = 2.612$的温度。

::: example 玻色-爱因斯坦凝聚与液氦 {#ex-bec}
液态$^{4}\mathrm{He}$在$2\ \mathrm{K}$附近的密度为$0.145\ \mathrm{g\,cm^{-3}}$。按此密度计算理想玻色气的$T_\mathrm{c}$，并与观测到的$2.17\ \mathrm{K}$（λ点）超流转变比较。
::: solution
$N/V = (145\ \mathrm{kg\,m^{-3}}/4.0026\times10^{-3}\ \mathrm{kg\,mol^{-1}})\times6.022\times10^{23}\ \mathrm{mol^{-1}} = 2.18\times10^{28}\ \mathrm{m^{-3}}$，且$m = 6.647\times10^{-27}\ \mathrm{kg}$。于是
$$
\frac{h^{2}}{2\pi mk_\mathrm{B}} = \frac{(6.626\times10^{-34})^{2}}{2\pi\times6.647\times10^{-27}\times1.3807\times10^{-23}} = 7.61\times10^{-19}\ \mathrm{K\,m^{2}},
$$
而$(2.18\times10^{28}/2.612)^{2/3} = 4.12\times10^{18}\ \mathrm{m^{-2}}$，故$T_\mathrm{c} = 3.13\ \mathrm{K}$。理想气体的估计与λ点相差在$50\,\%$以内，伦敦（Fritz London）（1938年）据此认为超流体就是被液体中强相互作用修正了的玻色-爱因斯坦凝聚。费米子同位素$^{3}\mathrm{He}$密度相近，在$2\ \mathrm{K}$附近没有任何转变；它只有在$3\ \mathrm{mK}$以下通过形成玻色配对才变超流。
:::
:::

## 固体的热容

$N$个原子组成的晶体有$3N$个振动模式。原子坐在格点上，按位置可以分辨，所以适用带量子化振动能级的玻尔兹曼统计——等价地，振动量子（**声子**）表现为$\mu = 0$的玻色子，与光子一模一样，而$\langle n\rangle = 1/(e^{h\nu/k_\mathrm{B}T} - 1)$就是一个模式的平均振动量子数。经典地，每个模式给$C_V$贡献$k_\mathrm{B}$，得$C_{V,\mathrm{m}} = 3R = 24.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$，即1819年的经验**杜隆-珀蒂定律**。量子力学地，模式在低温下冻结，问题在于$3N$个频率如何分布。

::: proposition 爱因斯坦热容与德拜热容 {#prop-einstein-debye}
(a) **爱因斯坦模型**：$3N$个模式有同一频率$\nu_\mathrm{E}$（爱因斯坦温度$\theta_\mathrm{E} = h\nu_\mathrm{E}/k_\mathrm{B}$）。于是
$$
C_{V,\mathrm{m}} = 3R\,\frac{(\theta_\mathrm{E}/T)^{2}e^{\theta_\mathrm{E}/T}}{(e^{\theta_\mathrm{E}/T} - 1)^{2}} ,
$$
高温下趋于$3R$，$T\to0$时按*指数*下降。

(b) **德拜模型**：模式是声波，频率密度$g(\nu) \propto \nu^{2}$，到截断频率$\nu_\mathrm{D}$为止，$\nu_\mathrm{D}$的选取使模式总数恰为$3N$（德拜温度$\theta_\mathrm{D} = h\nu_\mathrm{D}/k_\mathrm{B}$）。于是
$$
C_{V,\mathrm{m}} = 9R\left(\frac{T}{\theta_\mathrm{D}}\right)^{3}\int_0^{\theta_\mathrm{D}/T}\frac{x^{4}e^{x}}{(e^{x} - 1)^{2}}\,\mathrm{d}x ,
$$ {#eq-debye}
高温下趋于$3R$；当$T \ll \theta_\mathrm{D}$时趋于**德拜$T^{3}$定律**
$$
C_{V,\mathrm{m}} = \frac{12\pi^{4}}{5}R\left(\frac{T}{\theta_\mathrm{D}}\right)^{3} .
$$ {#eq-t3}
:::

::: proof
(a) 晶体是$3N$个独立、可分辨的谐振子：$Q = (q^\mathrm{V})^{3N}$（[[statistical-thermodynamics/canonical-ensemble#prop-Q-indep]]），故$C_V$是单个谐振子热容的$3N$倍，即[[statistical-thermodynamics/thermodynamic-functions#eq-einstein]]中的$3Nk_\mathrm{B}f_\mathrm{E}(\theta_\mathrm{E}/T)$。低温下$f_\mathrm{E} \approx (\theta_\mathrm{E}/T)^{2}e^{-\theta_\mathrm{E}/T}$。

(b) 频率为$\nu$的每个模式贡献$k_\mathrm{B}f_\mathrm{E}(h\nu/k_\mathrm{B}T)$。对箱中驻声波计数，办法与上面数电子状态完全相同（三种偏振，无自旋），得$g(\nu) = 9N\nu^{2}/\nu_\mathrm{D}^{3}$，归一化使$\int_0^{\nu_\mathrm{D}}g\,\mathrm{d}\nu = 3N$。于是
$$
C_V = k_\mathrm{B}\int_0^{\nu_\mathrm{D}}\frac{9N\nu^{2}}{\nu_\mathrm{D}^{3}}f_\mathrm{E}\!\left(\frac{h\nu}{k_\mathrm{B}T}\right)\mathrm{d}\nu ,
$$
作代换$x = h\nu/k_\mathrm{B}T$（于是$\nu^{2}\,\mathrm{d}\nu = (k_\mathrm{B}T/h)^{3}x^{2}\,\mathrm{d}x$）即得每摩尔的[[#eq-debye]]。高温下上限很小，$f_\mathrm{E}\approx1$，而$9(T/\theta_\mathrm{D})^{3}\int_0^{\theta_\mathrm{D}/T}x^{2}\,\mathrm{d}x = 3$。低温下上限趋于无穷，而$\int_0^\infty x^{4}e^{x}(e^{x}-1)^{-2}\,\mathrm{d}x = 4\pi^{4}/15$，得$9\times4\pi^{4}/15 = 12\pi^{4}/5$。
:::

爱因斯坦模型（1907年）是量子理论第一次应用于实物而非辐射，它解释了热容为何下降；但它的指数下降太快。德拜模型（1912年）认识到晶体总有长波长、低频的声学模式，它们在任何温度下都保持激发；频率低于$\nu$的这种模式数目按$\nu^{3}$增长，由此产生一切非磁性绝缘体都观测到的$T^{3}$定律。德拜温度是一个表征固体刚度的单一数值：铅为$88\ \mathrm{K}$，铜为$343\ \mathrm{K}$，钻石约$2200\ \mathrm{K}$。

::: widget plot
f: 3*(1/x)^2*exp(1/x)/(exp(1/x) - 1)^2; 9*x^3*sum((((j - 0.5)/(200*x))^4*exp((j - 0.5)/(200*x))/(exp((j - 0.5)/(200*x)) - 1)^2), j, 1, 200)/(200*x); 3
x: 0.02, 1.5
y: 0, 3.2
labels: \text{爱因斯坦 } C_{V,\mathrm{m}}/R; \text{德拜 } C_{V,\mathrm{m}}/R; \text{杜隆-珀蒂}
caption: 晶体的摩尔热容$C_{V,\mathrm{m}}/R$对约化温度$x = T/\theta$作图，爱因斯坦模型（$\theta = \theta_\mathrm{E}$）与德拜模型（$\theta = \theta_\mathrm{D}$，积分[[#eq-debye]]用中点法数值计算）。两曲线在$x \approx 1$以上都趋近杜隆-珀蒂值$3$。低温下德拜曲线按$x^{3}$下降，爱因斯坦曲线则按指数下降、远远落到其下方：$x = 0.1$时德拜值为$0.23$，爱因斯坦值为$0.014$。实验跟随德拜曲线。
:::

::: example 铜在 10 K 的晶格热容与电子热容 {#ex-copper}
铜的$\theta_\mathrm{D} = 343\ \mathrm{K}$，$T_\mathrm{F} = 8.16\times10^{4}\ \mathrm{K}$。计算$10.0\ \mathrm{K}$下其摩尔热容的晶格贡献与自由电子贡献，并求电子贡献超过晶格的温度。
::: solution
$T/\theta_\mathrm{D} = 0.0292$时，$T^{3}$定律[[#eq-t3]]适用：
$$
C^\mathrm{lat}_{V,\mathrm{m}} = \frac{12\pi^{4}}{5}\times8.3145\times(0.029\,15)^{3} = 1944\times2.477\times10^{-5}\ \mathrm{J\,K^{-1}\,mol^{-1}} = 0.0482\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
每原子一个传导电子，由[[#eq-cel]]得
$$
C^\mathrm{el}_{V,\mathrm{m}} = \frac{\pi^{2}}{2}\times8.3145\times\frac{10.0}{81\,600} = 5.03\times10^{-3}\ \mathrm{J\,K^{-1}\,mol^{-1}} ,
$$
约为晶格值的十分之一。写成$C = \gamma T + AT^{3}$，其中$\gamma = 5.03\times10^{-4}\ \mathrm{J\,K^{-2}\,mol^{-1}}$，$A = 4.82\times10^{-5}\ \mathrm{J\,K^{-4}\,mol^{-1}}$，两者相等处$T = (\gamma/A)^{1/2} = 3.2\ \mathrm{K}$；再往低温电子占优。把$C/T$对$T^{2}$作图是一条截距为$\gamma$、斜率为$A$的直线——表征金属的标准办法。铜的实测$\gamma$为$0.695\ \mathrm{mJ\,K^{-2}\,mol^{-1}}$，是自由电子值的$1.38$倍，这度量了周期势与电子-声子耦合对电子有效质量的增大。
:::
:::

::: quiz
在$20\ \mathrm{K}$下测量某个$\theta_\mathrm{D} = 200\ \mathrm{K}$的绝缘晶体的热容。若温度减半到$10\ \mathrm{K}$，热容按什么因子下降？
- [ ] 2，因为$C \propto T$。
- [x] 8，因为在$T \ll \theta_\mathrm{D}$下德拜$T^{3}$定律成立。
- [ ] 一千倍以上，因为振动按指数冻结。
- [ ] 不变：任何固体都有$C_V = 3R$。
::: solution
在$T/\theta_\mathrm{D} = 0.1$及以下，绝缘体的热容服从$C \propto T^{3}$（[[#prop-einstein-debye]](b)），故$T$减半使$C$除以$2^{3} = 8$。线性下降是*金属*中传导电子的特征；指数下降是爱因斯坦模型的预言，它之所以错，是因为真实晶体总有低频声学模式；而$3R$是高温（杜隆-珀蒂）极限。
:::
:::

::: history
玻色（Satyendra Nath Bose）1924年把一份把光子数作全同粒子来数的普朗克定律推导寄给爱因斯坦（Einstein）；爱因斯坦将其译成德文发表于《物理学杂志》（*Zeitschrift für Physik*），并于1924–1925年把该方法推广到实物粒子，预言了以两人共同命名的凝聚。费米（Enrico Fermi，1926年）与狄拉克（Paul Dirac，1926年）各自独立导出了服从不相容原理的粒子的统计；索末菲（Arnold Sommerfeld）1927–1928年用费米-狄拉克统计建立的金属自由电子理论，化解了经典德鲁德（Drude）模型的热容佯谬。关于固体，爱因斯坦1907年的论文"Die Plancksche Theorie der Strahlung und die Theorie der spezifischen Wärme"与德拜（Peter Debye）1912年的理论，解释了能斯特（Walther Nernst）柏林实验室测得的热容下降。稀薄原子气体的玻色-爱因斯坦凝聚于1995年先后由康奈尔（Eric Cornell）与维曼（Carl Wieman）在铷-87中、凯特尔（Wolfgang Ketterle）在钠中实现，三人共获2001年诺贝尔物理学奖。
:::

## 后续内容

费米-狄拉克统计是固体能带理论、半导体与金属电极电化学的基础：金属的费米能级是其电子的电化学势，电极极化时发生的正是费米能级的对齐（[[electrochemistry/electrode-kinetics]]、[[materials-chemistry/electronic-structure-solids]]）。玻色-爱因斯坦统计是黑体辐射、激光器与声子输运的基础。德拜$T^{3}$定律是把量热第三定律熵外推到最低测温以下的手段（[[thermodynamics/second-law]]），德拜温度还会在热膨胀与衍射强度的理论中重现（[[materials-chemistry/diffraction]]）。下一课我们回到经典统计，把它应用于反应垒顶那个特殊位形（[[statistical-thermodynamics/statistical-rate-theory]]）。

::: summary
- 全同粒子要么是玻色子（波函数对称，占据数任意），要么是费米子（反对称，$n_i = 0$或$1$）；对独立粒子，巨正则系综给出$\langle n\rangle = 1/(e^{(\varepsilon - \mu)/k_\mathrm{B}T} \pm 1)$，$+$为费米-狄拉克，$-$为玻色-爱因斯坦。
- 当$e^{(\varepsilon - \mu)/k_\mathrm{B}T} \gg 1$（等价地$N\Lambda^{3}/V \ll 1$）时两者都化为玻尔兹曼分布；普通气体与液体在这一意义上是经典的。
- 金属中的自由电子填充状态直到费米能$E_\mathrm{F} = (h^{2}/8m_\mathrm{e})(3N/\pi V)^{2/3}$：钠为$3.24\ \mathrm{eV}$，铜为$7.03\ \mathrm{eV}$，$T_\mathrm{F} \sim 10^{4}$–$10^{5}\ \mathrm{K}$。
- 只有$E_\mathrm{F}$附近约$k_\mathrm{B}T$内的电子被激发，故$C^\mathrm{el}_{V,\mathrm{m}} = (\pi^{2}/2)R(T/T_\mathrm{F})$，常温下约为经典值的$1\,\%$。
- 光子（$\mu = 0$）给出普朗克定律与维恩定律$\lambda_\text{max}T = 2.898\ \mathrm{mm\,K}$；粒子数守恒的玻色子在$T_\mathrm{c}$以下凝聚，该处$N\Lambda^{3}/V = 2.612$（液氦密度下为$3.1\ \mathrm{K}$，对照λ点的$2.17\ \mathrm{K}$）。
- 固体：爱因斯坦模型解释了热容自$3R$的下降但过于陡直；德拜模型在低温给出$C_{V,\mathrm{m}} = (12\pi^{4}/5)R(T/\theta_\mathrm{D})^{3}$；金属表现为$C = \gamma T + AT^{3}$。
:::

## 习题

::: exercise 钾的费米能 {level=1 check="2.12"}
钾每立方米有$1.40\times10^{28}$个传导电子。计算其费米能。（以eV为单位输入$E_\mathrm{F}$。）
::: solution
$E_\mathrm{F} = (h^{2}/8m_\mathrm{e})(3N/\pi V)^{2/3} = 6.025\times10^{-38}\times(1.337\times10^{28})^{2/3}\ \mathrm{J} = 6.025\times10^{-38}\times5.63\times10^{18}\ \mathrm{J} = 3.39\times10^{-19}\ \mathrm{J} = 2.12\ \mathrm{eV}$。电子密度越低，费米能越低：$E_\mathrm{F} \propto (N/V)^{2/3}$。
:::
:::

::: exercise 费米能级处的占据 {level=1 check="0.0474"}
位于化学势以上$3k_\mathrm{B}T$处的一个状态被电子占据的概率是多少？与玻尔兹曼值比较。（输入费米-狄拉克概率。）
::: solution
$\langle n\rangle_\mathrm{FD} = 1/(e^{3} + 1) = 1/21.09 = 0.0474$；玻尔兹曼值为$e^{-3} = 0.0498$，高$5\,\%$。$x = 3$处两种统计已经几乎一致；$x = 0$处（化学势本身）费米-狄拉克占据在任何温度下都恰好是$\tfrac{1}{2}$。
:::
:::

::: exercise 杜隆与珀蒂 {level=1 check="0.392"}
用杜隆-珀蒂定律估算铜（$M = 63.55\ \mathrm{g\,mol^{-1}}$）在室温下的比热容。（以$\mathrm{J\,K^{-1}\,g^{-1}}$为单位输入。）
::: solution
$C_{V,\mathrm{m}} \approx 3R = 24.94\ \mathrm{J\,K^{-1}\,mol^{-1}}$，故$c = 24.94/63.55 = 0.392\ \mathrm{J\,K^{-1}\,g^{-1}}$。实测$c_p$为$0.385\ \mathrm{J\,K^{-1}\,g^{-1}}$：$298\ \mathrm{K}$（$T/\theta_\mathrm{D} = 0.87$）的铜已接近经典极限，其$C_V$比$3R$低几个百分点，$C_p - C_V$约$0.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$。
:::
:::

::: exercise 爱因斯坦的钻石 {level=2 check="5.98"}
爱因斯坦用$\theta_\mathrm{E} = 1320\ \mathrm{K}$拟合了钻石的热容。计算$298.15\ \mathrm{K}$下钻石的爱因斯坦$C_{V,\mathrm{m}}$，并与实测值$6.11\ \mathrm{J\,K^{-1}\,mol^{-1}}$比较。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入$C_{V,\mathrm{m}}$。）
::: solution
$x = 1320/298.15 = 4.427$；$e^{x} = 83.7$；$f_\mathrm{E} = x^{2}e^{x}/(e^{x}-1)^{2} = 19.60\times83.7/(82.7)^{2} = 0.240$。故$C_{V,\mathrm{m}} = 3R\times0.240 = 5.98\ \mathrm{J\,K^{-1}\,mol^{-1}}$，与实验相差在$2\,\%$以内。钻石键刚原子轻，室温下只有其经典热容的四分之一——正是这一反常把爱因斯坦引向了这个模型。该拟合在低温失效，那里爱因斯坦曲线远远低于实测的$T^{3}$行为。
:::
:::

::: exercise $T^{3}$ 定律 {level=2 check="0.0148"}
氯化钠的德拜温度约为$320\ \mathrm{K}$。估算$5.00\ \mathrm{K}$下NaCl的摩尔热容，注意一摩尔NaCl含有两摩尔离子。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入$C_{V,\mathrm{m}}$。）
::: solution
每摩尔离子$C = (12\pi^{4}/5)R(T/\theta_\mathrm{D})^{3} = 1944\times(5/320)^{3} = 1944\times3.815\times10^{-6} = 7.42\times10^{-3}\ \mathrm{J\,K^{-1}}$；每摩尔NaCl（两摩尔离子）为$0.0148\ \mathrm{J\,K^{-1}\,mol^{-1}}$——约为其室温值的$1/3400$。忘掉每个化学式单元有两个离子、因而少乘因子2，是常见的疏漏：NaCl的杜隆-珀蒂极限是每摩尔化学式单元$6R$，不是$3R$。
:::
:::

::: exercise 维恩定律 {level=2 check="9.66"}
已知$\lambda_\text{max}T = 2.898\ \mathrm{mm\,K}$，求$300\ \mathrm{K}$黑体（按单位波长计）发射最强的波长。（以µm为单位输入$\lambda_\text{max}$。）
::: solution
$\lambda_\text{max} = 2.898\times10^{-3}\ \mathrm{m\,K}/300\ \mathrm{K} = 9.66\times10^{-6}\ \mathrm{m} = 9.66\ \mu\mathrm{m}$，在热红外区。热像仪与温室效应都在这个窗口工作；同一定律在$5772\ \mathrm{K}$下把太阳辐射峰定在$502\ \mathrm{nm}$。
:::
:::

::: exercise 经典极限下的费米-狄拉克分布 {level=3}
对质量为$m$、自旋$\tfrac{1}{2}$的费米子组成的理想气体，证明物态方程的第一量子修正为$pV/Nk_\mathrm{B}T = 1 + N\Lambda^{3}/(2^{7/2}V) + \cdots$，即费米统计产生一种有效的*排斥*。玻色子的符号是什么？为什么？
::: hint
巨正则系综中$pV = k_\mathrm{B}T\sum_i\ln\xi_i$。把$\ln(1 \pm x)$到小量$x = e^{-\beta(\varepsilon_i - \mu)}$的二阶展开，用$\sum_ie^{-s\beta\varepsilon_i} = gV/(s^{3/2}\Lambda^{3})$（$g = 2$个自旋状态）把求和化为积分，并用$N$消去$\mu$。
:::
::: solution
对费米子，$\ln\xi_i = \ln(1 + x_i) = x_i - \tfrac{1}{2}x_i^{2} + \cdots$，且$\langle n_i\rangle = x_i - x_i^{2} + \cdots$。记$z = e^{\beta\mu}$，并用$\sum_ie^{-s\beta\varepsilon_i} = gV/(s^{3/2}\Lambda^{3})$，
$$
\frac{pV}{k_\mathrm{B}T} = \frac{gV}{\Lambda^{3}}\left(z - \frac{z^{2}}{2^{5/2}}\right), \qquad N = \frac{gV}{\Lambda^{3}}\left(z - \frac{z^{2}}{2^{3/2}}\right).
$$
把第二式反解到一阶：$z = (N\Lambda^{3}/gV)(1 + 2^{-3/2}N\Lambda^{3}/gV)$。代入得
$$
\frac{pV}{Nk_\mathrm{B}T} = \frac{z - z^{2}/2^{5/2}}{z - z^{2}/2^{3/2}} \approx 1 + z\left(2^{-3/2} - 2^{-5/2}\right) = 1 + \frac{z}{2^{5/2}} = 1 + \frac{N\Lambda^{3}}{2^{5/2}gV} ,
$$
取$g = 2$即$1 + N\Lambda^{3}/(2^{7/2}V)$。压强超过经典值：不相容原理把费米子彼此撑开，就像一种排斥。对玻色子，$x^{2}$各项的符号全部反转，修正为$-N\Lambda^{3}/(2^{5/2}gV)$：玻色子相互聚集，是一种有效吸引，在更高简并度下以玻色-爱因斯坦凝聚告终。两种效应对普通气体都微乎其微（$N\Lambda^{3}/V \sim 10^{-7}$），但在$10\ \mathrm{K}$以下的氦中可以测出。
:::
:::

::: exercise 低温下的德拜熵 {level=3 check="0.0211"}
证明服从德拜$T^{3}$定律的固体在低温下有$S_\mathrm{m}(T) = \tfrac{1}{3}C_{V,\mathrm{m}}(T)$，并据此由[[#ex-copper]]求铜在$10\ \mathrm{K}$的熵，包括电子贡献。（以$\mathrm{J\,K^{-1}\,mol^{-1}}$为单位输入$S_\mathrm{m}$。）
::: solution
对$C = AT^{3}$，$S(T) = \int_0^{T}(C/T')\,\mathrm{d}T' = \int_0^{T}AT'^{2}\,\mathrm{d}T' = \tfrac{1}{3}AT^{3} = \tfrac{1}{3}C(T)$。电子项$C = \gamma T$给出$S = \int_0^{T}\gamma\,\mathrm{d}T' = \gamma T = C(T)$。于是$10\ \mathrm{K}$下的铜，
$$
S_\mathrm{m} = \tfrac{1}{3}\times0.0482 + 5.03\times10^{-3} = 0.0161 + 0.0050 = 0.0211\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
电子只占热容的十分之一，却携带了将近四分之一的熵，因为它们的$C/T$在$T\to0$时不消失。量热熵就是这样从最低测温外推到$0\ \mathrm{K}$的（"德拜外推"）：对绝缘体，未测到的那部分熵是最后一次测得热容的三分之一。
:::
:::
