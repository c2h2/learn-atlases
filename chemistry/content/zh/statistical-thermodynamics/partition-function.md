[[statistical-thermodynamics/boltzmann-distribution]]中的玻尔兹曼分布以一个归一化求和$q = \sum_i e^{-\beta\varepsilon_i}$收尾，看上去不过是一笔账。它的意义远不止于此。理想气体的一切热力学性质——能量、热容、熵、压力、化学势以及其反应的平衡常数——都可由$q$及其对温度与体积的导数算出。知道配分函数就知道热力学；而要计算它，只需要能级——光谱学测得、量子力学预言的那些能级。

本课将一块块搭建分子配分函数。我们首先学会把它读作热可及状态数，然后证明它因子化为平动、转动、振动与电子激发的贡献，并用[[quantum-chemistry/model-systems]]与[[quantum-chemistry/vibration-rotation]]中的模型体系逐一求值。沿途我们会遇到特征温度——有了它，一眼就能看出某种运动是被"冻结"、部分激发还是经典的；还有修正转动求和的对称数，以及使氢以两种不同气体存在的核自旋统计。学完本课，你就能从几个光谱常数出发算出诸如"室温、$1\ \mathrm{bar}$下的一个氮分子约有$3\times10^{8}$个热可及状态"这样的数字——并知道它的含义。

## 配分函数度量什么

::: definition 分子配分函数 {#def-q}
对状态$i$具有能量$\varepsilon_i$（从基态量起）、或能级$j$具有能量$\varepsilon_j$与简并度$g_j$的分子，温度$T$下的**分子配分函数**为
$$
q = \sum_{\text{状态 } i} e^{-\beta\varepsilon_i} = \sum_{\text{能级 } j} g_j\,e^{-\beta\varepsilon_j}, \qquad \beta = \frac{1}{k_\mathrm{B}T} .
$$ {#eq-q}
它是一个无量纲的纯数，依赖于温度，并且——通过能级——依赖于体积与分子常数。
:::

配分函数是**热可及状态数**的一个指示。能量$\varepsilon_i \ll k_\mathrm{B}T$的状态对求和几乎恰好贡献1；能量$\varepsilon_i \gg k_\mathrm{B}T$的状态几乎不贡献。因此$q$以一种平滑的权重，数出基态之上几个$k_\mathrm{B}T$之内的状态。两个极限把这一点说清楚了：
$$
\lim_{T\to0} q = g_0, \qquad \lim_{T\to\infty} q = \text{状态总数}.
$$
绝对零度下只有基能级可及（若它非简并，则$q = 1$）；温度无穷时每个状态都同等可及，$q$把它们全部数上——对大多数真实分子而言是无穷多个。

两个能精确求解的例子展示这一想法如何运作。

::: proposition 二能级体系与等间距能阶的配分函数 {#prop-ladder}
(a) 对只有两个非简并状态、能量分别为$0$与$\varepsilon$的分子，
$$
q = 1 + e^{-\beta\varepsilon} ,
$$
它从$T = 0$时的1升到$T\to\infty$时的2。

(b) 对$0, \varepsilon, 2\varepsilon, \ldots$的无穷等间距非简并能阶，
$$
q = \frac{1}{1 - e^{-\beta\varepsilon}} ,
$$ {#eq-ladder}
它从$T = 0$时的1起无限增长，当$k_\mathrm{B}T \gg \varepsilon$时趋于$k_\mathrm{B}T/\varepsilon$。
:::

::: proof
(a)就是定义本身，只取两项。对(b)，$q = \sum_{v=0}^{\infty}x^{v}$，其中$x = e^{-\beta\varepsilon} < 1$，这是一个几何级数，和为$1/(1-x)$。当$\beta\varepsilon \ll 1$时，$1 - e^{-\beta\varepsilon} \approx \beta\varepsilon$，故$q \approx 1/\beta\varepsilon = k_\mathrm{B}T/\varepsilon$：可及的级数等于热能除以级距，正与"可及状态数"的图像一致。
:::

在继续之前，先给出一条关于能量零点的警告是合适的，因为它引起的混淆没完没了。

::: warning 配分函数依赖于能量零点的选取 {#warn-zero}
若每个能量都平移一个常数，$\varepsilon_i \to \varepsilon_i + \varepsilon_0$，配分函数就乘以$e^{-\beta\varepsilon_0}$。布居（比值）不受影响，但$q$的*数值*受影响，由它算出的热力学能等量也受影响。本课程把每个分子的每一项能量都从该分子的**最低状态**量起，于是每个$q \ge 1$且$T\to0$时$q\to g_0$。对谐振动，这意味着从零点能级而非势阱底部量起；采用另一约定的表会多出一个因子$e^{-\beta hc\tilde\nu/2}$。到讨论平衡常数时（[[statistical-thermodynamics/equilibrium-from-molecules]]），不同分子零点各不相同这一事实通过反应能$\Delta_\mathrm{r}E_0$明确恢复；忘掉这一约定或这一修正中的任何一个，答案都会错好几个数量级。
:::

## 按运动形式因子化

分子的能量在极好的近似下是若干独立贡献之和：其质心的动能、转动能量、振动能量与电子激发能量。这种可分性从来不是精确的（转动会拉长化学键；振动会改变转动惯量），但耦合项很小，忽略它们是这门学科的标准近似。

::: proposition 配分函数的因子化 {#prop-factor}
若每个状态的能量都是若干独立贡献之和，
$$
\varepsilon_{i} = \varepsilon^\mathrm{T}_{a} + \varepsilon^\mathrm{R}_{b} + \varepsilon^\mathrm{V}_{c} + \varepsilon^\mathrm{E}_{d},
$$
其中每个指标独立于其他指标、在各自的状态集合上取值，则配分函数是一个乘积，
$$
q = q^\mathrm{T}\,q^\mathrm{R}\,q^\mathrm{V}\,q^\mathrm{E} .
$$ {#eq-factor}
同一运动形式内部同样成立：简正模相互独立的多原子分子有$q^\mathrm{V} = \prod_k q^\mathrm{V}_k$。
:::

::: proof
对独立指标的一切组合求和：
$$
q = \sum_{a,b,c,d} e^{-\beta(\varepsilon^\mathrm{T}_a + \varepsilon^\mathrm{R}_b + \varepsilon^\mathrm{V}_c + \varepsilon^\mathrm{E}_d)}
= \sum_{a}e^{-\beta\varepsilon^\mathrm{T}_a}\sum_{b}e^{-\beta\varepsilon^\mathrm{R}_b}\sum_{c}e^{-\beta\varepsilon^\mathrm{V}_c}\sum_{d}e^{-\beta\varepsilon^\mathrm{E}_d},
$$
因为和的指数是指数之积，而若干个各依赖不同指标的因子之积的多重求和等于各单一求和之积。这一步要求每个指标的容许取值不依赖于其他指标——这正是"独立"的含义。
:::

因子化把一个算不动的求和变成四个好算的求和。配分函数的对数——它们在热力学中正是以对数形式登场的——变成了和：$\ln q = \ln q^\mathrm{T} + \ln q^\mathrm{R} + \ln q^\mathrm{V} + \ln q^\mathrm{E}$，于是能量、熵与热容都是平动、转动、振动与电子各项贡献之和（[[statistical-thermodynamics/thermodynamic-functions]]）。

## 平动

质量为$m$的分子在边长为$L$的立方箱中的平动能级，就是三维势箱中的粒子的能级：$\varepsilon = (n_x^{2} + n_y^{2} + n_z^{2})h^{2}/8mL^{2}$，$n_x, n_y, n_z = 1, 2, \ldots$（[[quantum-chemistry/model-systems]]）。沿三个轴的运动相互独立，故由[[#prop-factor]]，$q^\mathrm{T} = q_xq_yq_z$。

::: proposition 平动配分函数 {#prop-qt}
对体积$V$的容器中、温度$T$下、质量为$m$的分子，
$$
q^\mathrm{T} = \frac{V}{\Lambda^{3}}, \qquad \Lambda = \frac{h}{(2\pi mk_\mathrm{B}T)^{1/2}} ,
$$ {#eq-qt}
其中$\Lambda$是**热波长**。只要$\Lambda \ll L$，这一结果就成立，而实验室大小的任何容器中的每个分子都满足这个条件。
:::

::: proof
对一维情形，能量从最低能级$n = 1$量起（差别完全微不足道），$\varepsilon_n = (n^{2} - 1)\varepsilon$，其中$\varepsilon = h^{2}/8mL^{2}$。于是
$$
q_x = \sum_{n=1}^{\infty}e^{-(n^{2}-1)\beta\varepsilon} \approx \int_{0}^{\infty}e^{-n^{2}\beta\varepsilon}\,\mathrm{d}n = \frac{1}{2}\left(\frac{\pi}{\beta\varepsilon}\right)^{1/2} .
$$
把求和换成积分是合理的，因为$\beta\varepsilon$小得惊人——室温下$1\ \mathrm{cm}$箱中的一个氩原子，$\beta\varepsilon \approx 2\times10^{-18}$——所以相邻$n$的项变化到无法察觉，把下限从1移到0只使求和改变约$10^{9}$分之一。代入$\varepsilon$：
$$
q_x = \frac{1}{2}\left(\frac{8\pi mL^{2}}{\beta h^{2}}\right)^{1/2} = \left(\frac{2\pi m k_\mathrm{B}T}{h^{2}}\right)^{1/2}L = \frac{L}{\Lambda} .
$$
三个相同的因子相乘得$q^\mathrm{T} = L^{3}/\Lambda^{3} = V/\Lambda^{3}$。结果只依赖于体积而不依赖于箱子的形状，更细致的处理证实了这一点。
:::

热波长除一个量级为一的因子外，就是具有典型热动量$(mk_\mathrm{B}T)^{1/2}$的分子的德布罗意波长。因此平动配分函数数的是容器里装得下多少个边长为$\Lambda$的小立方体——多少个"量子胞"。因为$\Lambda$极小，这个数目大得惊人。

::: example 氩的平动配分函数 {#ex-argon}
计算$298.15\ \mathrm{K}$下氩原子（$M = 39.948\ \mathrm{g\,mol^{-1}}$）的$\Lambda$与$q^\mathrm{T}$，体积取$1\ \mathrm{bar}$下理想气体的摩尔体积$V_\mathrm{m} = RT/p^\circ$。
::: solution
质量为$m = 39.948\times1.660\,54\times10^{-27}\ \mathrm{kg} = 6.6335\times10^{-26}\ \mathrm{kg}$。于是
$$
\Lambda = \frac{6.626\,07\times10^{-34}\ \mathrm{J\,s}}{\left(2\pi\times6.6335\times10^{-26}\ \mathrm{kg}\times1.380\,65\times10^{-23}\ \mathrm{J\,K^{-1}}\times298.15\ \mathrm{K}\right)^{1/2}} = 1.600\times10^{-11}\ \mathrm{m} = 16.0\ \mathrm{pm}.
$$
摩尔体积为$V_\mathrm{m} = 8.3145\times298.15/10^{5} = 2.4790\times10^{-2}\ \mathrm{m^{3}}$，故
$$
q^\mathrm{T} = \frac{V_\mathrm{m}}{\Lambda^{3}} = \frac{2.4790\times10^{-2}\ \mathrm{m^{3}}}{(1.600\times10^{-11}\ \mathrm{m})^{3}} = 6.06\times10^{30} .
$$
每个原子约有$6\times10^{30}$个可及平动状态——比该体积内的原子数（$N_\mathrm{A} = 6.0\times10^{23}$）多约$10^{7}$倍。正是这个比值$q^\mathrm{T}/N \gg 1$使气体成为"经典的"：两个原子想要同一个状态的概率可以忽略；这一条件我们将在[[statistical-thermodynamics/canonical-ensemble]]与[[statistical-thermodynamics/quantum-statistics]]中仔细考察。
:::
:::

## 转动

线性刚性转子的能级为$\varepsilon_J = hcBJ(J+1)$，简并度$2J+1$，$J = 0, 1, 2, \ldots$，其中$B$是以波数为单位的转动常数（[[quantum-chemistry/vibration-rotation]]）。自然的温度尺度是**转动温度**
$$
\theta_\mathrm{R} = \frac{hcB}{k_\mathrm{B}} ,
$$
而配分函数$q^\mathrm{R} = \sum_J(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}$只依赖$T/\theta_\mathrm{R}$。多数分子的$\theta_\mathrm{R}$只有几开尔文（$\mathrm{N_2}$为$2.87\ \mathrm{K}$，$\mathrm{HCl}$为$15.2\ \mathrm{K}$），所以常温下许多能级都有布居，求和可以换成积分。氢以$\theta_\mathrm{R} \approx 85\ \mathrm{K}$成为例外。

::: proposition 转动配分函数 {#prop-qr}
在$T \gg \theta_\mathrm{R}$的温度下，线性分子有
$$
q^\mathrm{R} = \frac{k_\mathrm{B}T}{\sigma hcB} = \frac{T}{\sigma\theta_\mathrm{R}} ,
$$ {#eq-qr}
其中**对称数**$\sigma$对异核分子（$\mathrm{HCl}$、$\mathrm{CO}$、$\mathrm{N_2O}$）为1，对同核或中心对称的分子（$\mathrm{N_2}$、$\mathrm{O_2}$、$\mathrm{CO_2}$、$\mathrm{HC{\equiv}CH}$）为2。第一项修正是$q^\mathrm{R} = (T/\theta_\mathrm{R} + \tfrac{1}{3} + \cdots)/\sigma$。转动常数为$A$、$B$、$C$的非线性分子在同一极限下有
$$
q^\mathrm{R} = \frac{1}{\sigma}\left(\frac{k_\mathrm{B}T}{hc}\right)^{3/2}\left(\frac{\pi}{ABC}\right)^{1/2} ,
$$ {#eq-qr-nl}
其中$\sigma$是经真旋转可达的不可分辨取向数（点群转动子群的阶）：$\mathrm{H_2O}$为2，$\mathrm{NH_3}$为3，$\mathrm{CH_4}$为12，$\mathrm{C_6H_6}$也是12。
:::

::: proof
对线性异核情形，令$x = J(J+1)$，则$\mathrm{d}x = (2J+1)\,\mathrm{d}J$，并把求和换成积分（当$\theta_\mathrm{R}/T \ll 1$时这样做是合法的，因为此时相邻项相差很小）：
$$
q^\mathrm{R} \approx \int_{0}^{\infty}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}\,\mathrm{d}J = \int_{0}^{\infty}e^{-\theta_\mathrm{R}x/T}\,\mathrm{d}x = \frac{T}{\theta_\mathrm{R}} .
$$
估计求和与其积分之差的欧拉-麦克劳林公式补上$\tfrac{1}{3} + \theta_\mathrm{R}/15T + \cdots$。对同核分子，对任一核自旋态，泡利原理（施于原子核，见下文）只允许一半转动能级；高温下这把求和减半，给出因子$1/\sigma$，$\sigma = 2$。经典地说，$\sigma$修正的是把仅差交换全同核的取向当作不同取向的重复计数。非线性公式来自对具有三个转动惯量的经典转动能量作同样的积分；这里只陈述结果，不作较长的推导（见麦克劳里（McQuarrie）《统计力学》（*Statistical Mechanics*）第8章）。
:::

::: widget plot
f: sum((2*j + 1)*exp(-j*(j + 1)/x), j, 0, 40); x + 1/3; x
x: 0.05, 5
y: 0, 6
labels: \text{精确求和}; T/\theta_\mathrm{R} + 1/3; T/\theta_\mathrm{R}
caption: 异核线性转子的转动配分函数对$x = T/\theta_\mathrm{R}$作图：对$J$的精确求和（第一条曲线）、[[#prop-qr]]中带一阶修正的高温公式，以及裸公式$T/\theta_\mathrm{R}$。$x$低时精确求和趋于1（只有$J = 0$有布居），两个近似则完全失效；$x = 2$时修正公式的精度已达$0.2\,\%$。室温下HCl的$x$为20，$\mathrm{N_2}$或CO约为100，远在图右缘之外。
:::

::: example HCl、N₂ 与 H₂O 的转动配分函数 {#ex-rot}
用$B(\mathrm{HCl}) = 10.59\ \mathrm{cm^{-1}}$、$B(\mathrm{N_2}) = 1.998\ \mathrm{cm^{-1}}$，以及对$\mathrm{H_2O}$的$A = 27.88$、$B = 14.51$、$C = 9.28\ \mathrm{cm^{-1}}$，计算$298.15\ \mathrm{K}$下的$q^\mathrm{R}$。对HCl，把高温公式与精确求和作比较。
::: solution
$298.15\ \mathrm{K}$下，$k_\mathrm{B}T/hc = T/c_2 = 298.15/1.438\,78 = 207.22\ \mathrm{cm^{-1}}$。

**HCl**（$\sigma = 1$）：$q^\mathrm{R} = 207.22/10.59 = 19.57$；加上$\tfrac{1}{3}$修正得$19.90$。逐项求和$(2J+1)e^{-hcBJ(J+1)/k_\mathrm{B}T}$（30项已足够）得$19.90$。即便在这里，裸公式仍低$1.7\,\%$，因为$\theta_\mathrm{R} = 15.2\ \mathrm{K}$并不可忽略。

**N₂**（$\sigma = 2$）：$q^\mathrm{R} = 207.22/(2\times1.998) = 51.9$。

**H₂O**（$\sigma = 2$；$C_{2v}$有两个真旋转，$E$与$C_2$）：
$$
q^\mathrm{R} = \frac{1}{2}(207.22)^{3/2}\left(\frac{\pi}{27.88\times14.51\times9.28}\right)^{1/2} = \frac{1}{2}\times2983\times0.02893 = 43.1 .
$$
每个分子在室温下有几十个可及转动状态——比它的$10^{30}$个平动状态少得多，但已足以让转动完全经典，这正是转动对热容贡献出完整能量均分值的原因（[[statistical-thermodynamics/thermodynamic-functions]]）。
:::
:::

### 核自旋与两种氢

对称数里面藏着一些漂亮的物理。$\mathrm{H_2}$的两个质子是全同费米子，交换它们时总波函数必须变号。交换两个核使转动波函数乘以$(-1)^{J}$；核自旋函数要么对称（三个**正氢（ortho）**状态，总自旋$I = 1$），要么反对称（一个**仲氢（para）**状态，$I = 0$）。要保持整体反对称，正氢必须取奇$J$，仲氢必须取偶$J$。核自旋-转动配分函数因此是
$$
q^\mathrm{R,ns} = \underbrace{\sum_{J\ \text{偶}}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}}_{\text{仲氢}} \;+\; 3\underbrace{\sum_{J\ \text{奇}}(2J+1)e^{-\theta_\mathrm{R}J(J+1)/T}}_{\text{正氢}} .
$$
高温下两个求和各占完整转动求和的一半，故$q^\mathrm{R,ns} \to 4\times\tfrac{1}{2}(T/\theta_\mathrm{R})$ =（核自旋简并度$2^{2}$）×$T/\sigma\theta_\mathrm{R}$，$\sigma = 2$：这就是对称数的来历。正氢与仲氢之比趋于$3 : 1$。

::: widget plot
f: 3*sum((4*j + 3)*exp(-th*(2*j + 1)*(2*j + 2)/x), j, 0, 25)/sum((4*j + 1)*exp(-th*(2*j)*(2*j + 1)/x), j, 0, 25); 3
x: 10, 400
y: 0, 3.5
sliders: th=85.3:20:100:0.1
labels: \text{平衡态正氢与仲氢之比}; 3
caption: 平衡态正氢与仲氢之比对温度$T$（单位K）作图，取自上面两个求和，$\mathrm{H_2}$取$\theta_\mathrm{R} = 85.3\ \mathrm{K}$（滑块`th`）。此比要到约$250\ \mathrm{K}$以上才接近3；在$77\ \mathrm{K}$（液氮）它接近1，而在$20\ \mathrm{K}$（液氢）平衡氢几乎纯为仲氢。对$\mathrm{D_2}$可把`th`设为$43.0\ \mathrm{K}$——但注意氘核是$I = 1$的玻色子，所以对$\mathrm{D_2}$二者角色互换（六个取偶$J$的正氢状态，三个取奇$J$的仲氢状态），此式不能原样照搬。
:::

::: example 液氮温度下的正氢与仲氢 {#ex-orthopara}
取$\mathrm{H_2}$的$\theta_\mathrm{R} = 85.3\ \mathrm{K}$，估算$77\ \mathrm{K}$下仲氢的平衡分数，每个求和保留前三项。普通氢气在洁净容器中冷到$77\ \mathrm{K}$，为什么达不到这一组成？
::: solution
$\theta_\mathrm{R}/T = 85.3/77 = 1.108$，仲氢求和为
$$
1 + 5e^{-6\times1.108} + 9e^{-20\times1.108} = 1 + 5\times1.30\times10^{-3} + 9\times2.4\times10^{-10} = 1.0065,
$$
正氢求和（乘以3）为
$$
3\left(3e^{-2\times1.108} + 7e^{-12\times1.108} + 11e^{-30\times1.108}\right) = 3\left(0.3269 + 1.2\times10^{-5} + \cdots\right) = 0.981 .
$$
仲氢分数为$1.0065/(1.0065 + 0.981) = 0.506$，约一半（完整求和给出三位数字相同的结果）。但正氢-仲氢转化需要翻转一个核自旋，无论碰撞还是辐射都干不好这件事：不加催化剂，氢气会把室温下$3 : 1$的组成保持数天乃至数周。顺磁性催化剂（水合氧化铁(III)、活性炭）可以建立平衡。这一区别在工业上至关重要：液氢贮存之前必须转化为仲氢，因为缓慢的正氢→仲氢转化放出的热（$\approx 1.06\ \mathrm{kJ\,mol^{-1}}$，超过其$0.90\ \mathrm{kJ\,mol^{-1}}$的蒸发焓）足以把它全部煮沸汽化。
:::
:::

## 振动

波数为$\tilde\nu$的谐振动具有能级$hc\tilde\nu(v + \tfrac{1}{2})$，$v = 0, 1, 2, \ldots$，全部非简并。从零点能级量起，它们恰好构成[[#prop-ladder]](b)中的那个等间距能阶。我们定义**振动温度**$\theta_\mathrm{V} = hc\tilde\nu/k_\mathrm{B}$。

::: proposition 振动配分函数 {#prop-qv}
波数为$\tilde\nu$、能量从零点能级量起的谐振子有
$$
q^\mathrm{V} = \frac{1}{1 - e^{-hc\tilde\nu/k_\mathrm{B}T}} = \frac{1}{1 - e^{-\theta_\mathrm{V}/T}} ,
$$ {#eq-qv}
当$T \ll \theta_\mathrm{V}$时趋于1，当$T \gg \theta_\mathrm{V}$时趋于$T/\theta_\mathrm{V}$。简正模波数为$\tilde\nu_k$的多原子分子（每个简并模按其简并度重复列出）有$q^\mathrm{V} = \prod_k (1 - e^{-\theta_{\mathrm{V},k}/T})^{-1}$。
:::

::: proof
这就是[[#eq-ladder]]取$\varepsilon = hc\tilde\nu$；极限见[[#prop-ladder]]。对多原子分子，简正模在谐振近似下相互独立，由[[#prop-factor]]得到乘积。
:::

振动温度很高：$\mathrm{N_2}$为$3393\ \mathrm{K}$，HCl为$4303\ \mathrm{K}$，$\mathrm{Cl_2}$为$805\ \mathrm{K}$，$\mathrm{I_2}$为$309\ \mathrm{K}$。所以室温下多数伸缩振动的$q^\mathrm{V}$都非常接近1（只有基态可及），但对重双原子分子以及多原子分子的低频弯曲与扭转模式则明显更大。真实振动是非谐的；对$q^\mathrm{V}$的修正在室温下通常低于$1\,\%$，但在高温下增大，而那对燃烧化学是要紧的。

::: example 二氧化碳的振动配分函数 {#ex-co2}
$\mathrm{CO_2}$的简正模为对称伸缩（$1388.2\ \mathrm{cm^{-1}}$）、二重简并的弯曲（$667.4\ \mathrm{cm^{-1}}$）与反对称伸缩（$2349.2\ \mathrm{cm^{-1}}$）。计算$298.15\ \mathrm{K}$与$1000\ \mathrm{K}$下的$q^\mathrm{V}$，并指出哪个模式占主导。
::: solution
线性三原子分子有$3N - 5 = 4$个振动模式，所以[[#prop-qv]]的乘积中弯曲模要计两次。$298.15\ \mathrm{K}$下，四个因子$1/(1 - e^{-c_2\tilde\nu/T})$为
$$
1.0012\ (\text{对称伸缩}),\quad 1.0416\ (\text{弯曲}),\quad 1.0416\ (\text{弯曲}),\quad 1.000\,012\ (\text{反对称伸缩}),
$$
故$q^\mathrm{V} = 1.0012\times1.0416^{2}\times1.000\,012 = 1.086$。$1000\ \mathrm{K}$下它们为$1.157$、$1.620$、$1.620$与$1.035$，得$q^\mathrm{V} = 3.14$。两个温度下都是低频弯曲模占主导：它的简并度使其效应加倍，而其振动温度（$960\ \mathrm{K}$）不到对称伸缩的一半。多数多原子分子都是如此——室温下，低于约$600\ \mathrm{cm^{-1}}$的弯曲、扭转与骨架形变几乎承担了全部振动配分函数；对柔性分子，内旋转（乙烷的甲基扭转、环戊烷的环褶皱）必须作为受阻转子而非谐振子处理，因为其能级间距太近、非谐性太强，[[#eq-qv]]不再适用。
:::
:::

::: widget plot
f: 1/(1 - exp(-1/x)); x; x + 1/2
x: 0.05, 3
y: 0, 4
labels: q^\mathrm{V}; T/\theta_\mathrm{V}; T/\theta_\mathrm{V} + 1/2
caption: 振动配分函数[[#eq-qv]]对$x = T/\theta_\mathrm{V}$作图，与经典极限$T/\theta_\mathrm{V}$及改进形式$T/\theta_\mathrm{V} + \tfrac{1}{2}$相比较。$x \approx 0.2$以下振子冻结在基态，$q^\mathrm{V} \approx 1$；$x \approx 1$以上曲线与经典直线平行。室温对$\mathrm{N_2}$相当于$x = 0.09$，对$\mathrm{I_2}$相当于$x = 0.97$。
:::

## 电子状态

电子激发能通常是几个电子伏——几万开尔文——所以常温下只有电子基能级有布居，$q^\mathrm{E} = g_0$，即基能级的简并度。闭壳层分子$g_0 = 1$；基谱项为$^{3}\Sigma_\mathrm{g}^{-}$的$\mathrm{O_2}$，$g_0 = 3$；处于谱项$^{2S+1}L_J$的原子，$g = 2J + 1$（所以碘与氯原子的$^{2}\mathrm{P}_{3/2}$基能级$g = 4$，氢原子的$^{2}\mathrm{S}_{1/2}$基能级$g = 2$）。例外是具有低位激发能级的分子与原子——通常来自自旋-轨道分裂——此时$q^\mathrm{E}$必须显式求和。

::: example NO 的电子配分函数 {#ex-no}
一氧化氮的基能级为$^{2}\Pi_{1/2}$，其上方仅$121.1\ \mathrm{cm^{-1}}$处有一个$^{2}\Pi_{3/2}$能级；两者都是二重简并，其余电子状态都高得多。计算$100\ \mathrm{K}$与$298.15\ \mathrm{K}$下的$q^\mathrm{E}$以及处于上能级的分子分数。
::: solution
$q^\mathrm{E} = 2 + 2e^{-c_2\tilde\nu/T}$，其中$c_2\tilde\nu = 1.438\,78\times121.1 = 174.2\ \mathrm{K}$。

$100\ \mathrm{K}$：$e^{-1.742} = 0.1752$，故$q^\mathrm{E} = 2 + 0.350 = 2.35$，上能级分数为$0.350/2.350 = 0.149$。

$298.15\ \mathrm{K}$：$e^{-0.5844} = 0.5574$，故$q^\mathrm{E} = 2 + 1.115 = 3.11$，上能级分数为$1.115/3.115 = 0.358$。

$T\to\infty$时数值趋于4，分数趋于$\tfrac{1}{2}$。由于上能级布居在$100$到$300\ \mathrm{K}$之间变化显著，NO在此区间有一个反常的电子热容贡献——一个肖特基峰，我们将在[[statistical-thermodynamics/thermodynamic-functions]]中计算它。
:::
:::

::: quiz
下列分子中，哪个在$298\ \mathrm{K}$有*最大*的振动配分函数（都当作谐振双原子分子处理）？
- [ ] $\mathrm{H_2}$, $\tilde\nu = 4401\ \mathrm{cm^{-1}}$
- [ ] $\mathrm{N_2}$, $\tilde\nu = 2359\ \mathrm{cm^{-1}}$
- [ ] $\mathrm{Cl_2}$, $\tilde\nu = 560\ \mathrm{cm^{-1}}$
- [x] $\mathrm{I_2}$, $\tilde\nu = 214.5\ \mathrm{cm^{-1}}$
::: solution
$q^\mathrm{V} = 1/(1 - e^{-\theta_\mathrm{V}/T})$随$\theta_\mathrm{V} = hc\tilde\nu/k_\mathrm{B}$单调减小，所以波数最低者最大：$q^\mathrm{V}(\mathrm{I_2}) = 1.55$，而$\mathrm{Cl_2}$为$1.07$，$\mathrm{N_2}$为$1.000\,01$。重原子与弱键给出低振动波数（$\tilde\nu \propto (k_\mathrm{f}/\mu)^{1/2}$），因而有许多热可及的振动状态。
:::
:::

## 整个分子

::: example 一个氮分子有多少个状态？ {#ex-n2}
计算$298.15\ \mathrm{K}$下$\mathrm{N_2}$（$M = 28.014\ \mathrm{g\,mol^{-1}}$，$B = 1.998\ \mathrm{cm^{-1}}$，$\tilde\nu = 2358.6\ \mathrm{cm^{-1}}$，基谱项$^{1}\Sigma_\mathrm{g}^{+}$）的总分子配分函数，体积取$1\ \mathrm{bar}$下理想气体每个分子分得的体积$V = k_\mathrm{B}T/p^\circ$。
::: solution
**平动。**$m = 28.014\times1.660\,54\times10^{-27} = 4.6518\times10^{-26}\ \mathrm{kg}$，故$\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2} = 1.910\times10^{-11}\ \mathrm{m}$。取$V = k_\mathrm{B}T/p^\circ = 4.116\times10^{-26}\ \mathrm{m^{3}}$，
$$
q^\mathrm{T} = \frac{4.116\times10^{-26}}{(1.910\times10^{-11})^{3}} = 5.91\times10^{6} .
$$
**转动。**$q^\mathrm{R} = 207.22/(2\times1.998) = 51.9$（见[[#ex-rot]]）。

**振动。**$\theta_\mathrm{V} = 1.438\,78\times2358.6 = 3393\ \mathrm{K}$，故$q^\mathrm{V} = 1/(1 - e^{-11.38}) = 1.000\,011$。

**电子。**基谱项非简并，第一激发态在$6\ \mathrm{eV}$以上：$q^\mathrm{E} = 1$。

由[[#eq-factor]]，
$$
q = 5.91\times10^{6}\times51.9\times1.000\,011\times1 = 3.06\times10^{8} .
$$
在约$3\times10^{8}$个可及状态中，平动几乎提供了全部；转动把它们乘以约50；振动与电子激发在室温下毫无贡献。这一层级关系——平动 ≫ 转动 ≫ 振动 ≥ 电子——对几乎每个小分子都成立，并组织着本课程其余部分里的每一个计算。（这里的$q^\mathrm{T}$是每个分子在其分得体积中的值；用于平衡常数的摩尔量$q^\circ_\mathrm{m}/N_\mathrm{A}$恰好就是这个数，我们很快就会看到。）
:::
:::

::: application 这些数字从何而来
本课用到的光谱常数（$B$、$\tilde\nu$、谱项能量）正是胡伯（Huber）与赫尔茨伯格（Herzberg）《双原子分子的常数》（*Constants of Diatomic Molecules*，1979）所汇编、并经NIST化学WebBook转载的那一类；多原子分子的数值来自转动与振动光谱（[[spectroscopy/rotational-spectroscopy]]、[[spectroscopy/vibrational-spectroscopy]]），或越来越多地来自量子化学计算（[[computational-chemistry/potential-energy-surfaces]]）。JANAF一类热化学表正是由这些配分函数算出的，其中包含非谐与离心修正；对小分子气体而言，它们比任何直接量热测量都更准确。
:::

::: history
德语名称*Zustandssumme*（"对状态求和"）是至今仍用于配分函数的符号$Z$的来源；英文名称"partition function"（配分函数）则始于达尔文（Charles Galton Darwin）与福勒（Ralph Fowler），他们1922年的论文处理能量在分子各状态间的"分配"（partition），其方法成为福勒《统计力学》（*Statistical Mechanics*，1929）一书的根基。平动求和实际上早在1912年就由萨库尔（Otto Sackur）与特特罗德（Hugo Tetrode）算出，他们在那一年得到了单原子气体的绝对熵（[[statistical-thermodynamics/canonical-ensemble]]）。核自旋的作用由海森堡（Werner Heisenberg）与洪特（Friedrich Hund）在1927年揭示，他们解释了同核分子带光谱中的交替强度；丹尼森（David Dennison）在同一年证明，氢在低温下反常的热容只有假定正氢与仲氢在测量的时间尺度上不互相转化才能得到解释。博恩费瑟（Karl Friedrich Bonhoeffer）与哈特克（Paul Harteck）1929年在低温活性炭上用催化转化制得近乎纯的仲氢，证实了这一预言。
:::

## 后续内容

四个因子在手，热力学函数便可计算：下一课（[[statistical-thermodynamics/thermodynamic-functions]]）由$\partial\ln q/\partial\beta$求热力学能与热容，发现每种运动模式贡献一个与温度有关的、特征性的份额——当该模式处于经典区时，这个份额就是能量均分值。平动因子$V/\Lambda^{3}$及其与$N$的比较，决定了分子何时可以作为独立的经典粒子处理（[[statistical-thermodynamics/canonical-ensemble]]），何时必须用量子统计取代玻尔兹曼计数（[[statistical-thermodynamics/quantum-statistics]]）。产物与反应物配分函数之比成为平衡常数（[[statistical-thermodynamics/equilibrium-from-molecules]]），而对过渡态而言成为速率常数（[[statistical-thermodynamics/statistical-rate-theory]]）。

::: summary
- 分子配分函数$q = \sum_j g_je^{-\varepsilon_j/k_\mathrm{B}T}$指示热可及状态数；$T\to0$时趋于$g_0$，随温度升高而增长。
- 能量从最低状态量起；平移能量零点会把$q$乘以$e^{-\beta\varepsilon_0}$，在平衡计算中必须计入。
- 各模式独立时$q = q^\mathrm{T}q^\mathrm{R}q^\mathrm{V}q^\mathrm{E}$，于是$\ln q$与一切热力学函数都是各项贡献之和。
- 平动：$q^\mathrm{T} = V/\Lambda^{3}$，热波长$\Lambda = h/(2\pi mk_\mathrm{B}T)^{1/2}$（$298\ \mathrm{K}$的Ar为$16\ \mathrm{pm}$）；每个摩尔体积的$q^\mathrm{T}$约为$10^{30}$量级。
- 转动：线性分子在$T \gg \theta_\mathrm{R} = hcB/k_\mathrm{B}$时$q^\mathrm{R} = T/\sigma\theta_\mathrm{R}$；对称数$\sigma$来自核自旋统计，后者还产生正氢与仲氢。
- 振动：从零点能级量起$q^\mathrm{V} = 1/(1 - e^{-\theta_\mathrm{V}/T})$；室温下多数伸缩振动被冻结（$q^\mathrm{V} \approx 1$），重的与柔性模式则不然。
- 电子：通常$q^\mathrm{E} = g_0$，但有低位能级者（NO、卤素原子）必须显式求和。
:::

## 习题

::: exercise 氢的热波长 {level=1 check="71.0"}
计算$300\ \mathrm{K}$下$\mathrm{H_2}$分子（$M = 2.016\ \mathrm{g\,mol^{-1}}$）的热波长。（以pm为单位输入$\Lambda$。）
::: solution
$m = 2.016\times1.660\,54\times10^{-27} = 3.3477\times10^{-27}\ \mathrm{kg}$；$(2\pi mk_\mathrm{B}T)^{1/2} = (2\pi\times3.3477\times10^{-27}\times1.380\,65\times10^{-23}\times300)^{1/2} = 9.334\times10^{-24}\ \mathrm{kg\,m\,s^{-1}}$，故$\Lambda = 6.626\times10^{-34}/9.334\times10^{-24} = 7.10\times10^{-11}\ \mathrm{m} = 71.0\ \mathrm{pm}$。分子越轻，热波长越长：$\Lambda \propto m^{-1/2}T^{-1/2}$。
:::
:::

::: exercise CO 的转动配分函数 {level=1 check="107"}
用高温公式计算$^{12}\mathrm{C}^{16}\mathrm{O}$（$B = 1.931\ \mathrm{cm^{-1}}$）在$298.15\ \mathrm{K}$的$q^\mathrm{R}$。（输入$q^\mathrm{R}$。）
::: solution
$q^\mathrm{R} = k_\mathrm{B}T/\sigma hcB = 207.22/(1\times1.931) = 107$。CO是异核分子（$\sigma = 1$），所以它可及的转动状态数约是$\mathrm{N_2}$的两倍——后者的$B$几乎相同，但$\sigma = 2$。
:::
:::

::: exercise 对称数 {level=1 check="12"}
给出$\mathrm{CO_2}$、$\mathrm{NH_3}$、$\mathrm{CH_4}$与$\mathrm{SF_6}$的转动对称数，并各自从点群出发加以论证。（输入$\mathrm{CH_4}$的对称数。）
::: solution
$\sigma$是点群中真旋转（含恒等操作）的个数（[[quantum-chemistry/molecular-symmetry]]）。$\mathrm{CO_2}$（$D_{\infty h}$）：$\sigma = 2$，一切中心对称线性分子皆如此。$\mathrm{NH_3}$（$C_{3v}$）：$E$、$2C_3$，故$\sigma = 3$。$\mathrm{CH_4}$（$T_d$）：转动子群$T$含$E$、$8C_3$、$3C_2$，故$\sigma = 12$。$\mathrm{SF_6}$（$O_h$）：子群$O$含$E$、$8C_3$、$6C_4$、$3C_2$、$6C_2'$，故$\sigma = 24$。
:::
:::

::: exercise Cl₂ 在 500 K 的振动配分函数 {level=2 check="1.25"}
计算$500\ \mathrm{K}$下$\mathrm{Cl_2}$（$\tilde\nu = 559.7\ \mathrm{cm^{-1}}$）从零点能级量起的$q^\mathrm{V}$，并求处于$v = 0$的分子分数。（输入$q^\mathrm{V}$。）
::: solution
$\theta_\mathrm{V} = 1.438\,78\times559.7 = 805.3\ \mathrm{K}$，故$e^{-\theta_\mathrm{V}/T} = e^{-1.6106} = 0.1998$，$q^\mathrm{V} = 1/(1 - 0.1998) = 1.25$。处于$v = 0$的分数为$1/q^\mathrm{V} = 0.800$：$500\ \mathrm{K}$下每五个氯分子就有一个处于振动激发态。
:::
:::

::: exercise 较高温度下的电子配分函数 {level=2 check="3.41"}
用[[#ex-no]]的数据，计算$500\ \mathrm{K}$下NO的电子配分函数。（输入$q^\mathrm{E}$。）
::: solution
$q^\mathrm{E} = 2 + 2e^{-174.2/500} = 2 + 2e^{-0.3485} = 2 + 2\times0.7057 = 3.41$。上能级分数为$1.411/3.411 = 0.414$，正在趋近高温极限$\tfrac{1}{2}$。
:::
:::

::: exercise 甲烷的转动配分函数 {level=2 check="36.7"}
甲烷是球形转子，$A = B = C = 5.241\ \mathrm{cm^{-1}}$。计算$298.15\ \mathrm{K}$下的$q^\mathrm{R}$。（输入$q^\mathrm{R}$。）
::: solution
由[[#eq-qr-nl]]并取$\sigma = 12$，
$$
q^\mathrm{R} = \frac{1}{12}\left(\frac{207.22}{5.241}\right)^{3/2}\pi^{1/2} = \frac{1}{12}\times(39.54)^{3/2}\times1.7725 = \frac{1}{12}\times248.6\times1.7725 = 36.7 .
$$
若不使用对称数，转动状态数将被高估12倍，熵中将出现$R\ln 12 = 20.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$的误差。
:::
:::

::: exercise $q^\mathrm{R}$ 的高温展开 {level=3 check="6.905"}
欧拉-麦克劳林公式断言：对在无穷远处连同其各阶导数一起消失的光滑函数，$\sum_{n=0}^{\infty}f(n) = \int_0^\infty f(x)\,\mathrm{d}x + \tfrac{1}{2}f(0) - \tfrac{1}{12}f'(0) + \tfrac{1}{720}f'''(0) - \cdots$。把它用于$f(J) = (2J+1)e^{-aJ(J+1)}$，其中$a = \theta_\mathrm{R}/T$，证明$q^\mathrm{R} = 1/a + \tfrac{1}{3} + a/15 + \cdots$。然后对HCl（$\theta_\mathrm{R} = 15.24\ \mathrm{K}$）在$100\ \mathrm{K}$计算这一展开。（输入$q^\mathrm{R}$，保留四位有效数字。）
::: hint
为求$J = 0$处的各阶导数，把$f(J)$按$J$的幂展开：$f(J) = (1 + 2J)(1 - aJ - aJ^{2} + \tfrac{1}{2}a^{2}J^{2} + \cdots)$。
:::
::: solution
积分是$1/a$（见[[#prop-qr]]）。$f(0) = 1$。展开得$f(J) = 1 + (2 - a)J + (\tfrac{1}{2}a^{2} - 3a)J^{2} + (\ldots)J^{3}$，故$f'(0) = 2 - a$；$J^{3}$的系数是$-2a + 2a^{2} - \tfrac{1}{6}a^{3}$（来自$2J\times(-aJ^{2} + \tfrac{1}{2}a^{2}J^{2})$，加上指数展开的$J^{3}$项$a^{2}J^{3} - \tfrac{1}{6}a^{3}J^{3}$），于是$f'''(0) = 6(-2a + O(a^{2}))$。故
$$
q^\mathrm{R} = \frac{1}{a} + \frac{1}{2} - \frac{2 - a}{12} + \frac{6(-2a)}{720} + O(a^{2}) = \frac{1}{a} + \frac{1}{3} + \frac{a}{12} - \frac{a}{60} = \frac{1}{a} + \frac{1}{3} + \frac{a}{15} + \cdots .
$$
对$100\ \mathrm{K}$的HCl，$a = 15.24/100 = 0.1524$：$q^\mathrm{R} = 6.5617 + 0.3333 + 0.0102 = 6.905$。直接对级数求和得$6.9055$——尽管只有七八个能级有布居，三项展开的精度已达$10^{4}$分之一。
:::
:::

::: exercise 50 K 下的仲氢 {level=3 check="0.77"}
用$\theta_\mathrm{R} = 85.3\ \mathrm{K}$与$\mathrm{H_2}$的核自旋统计，计算$50\ \mathrm{K}$下仲氢的平衡分数。解释为什么从室温快速冷却的氢样品，其中摩尔热容与平衡氢的不同。（输入仲氢分数。）
::: solution
$\theta_\mathrm{R}/T = 1.706$：仲氢求和$= 1 + 5e^{-6\times1.706} + 9e^{-20\times1.706} = 1 + 5\times3.58\times10^{-5} + \cdots = 1.000\,18$；正氢求和$= 3(3e^{-2\times1.706} + 7e^{-12\times1.706} + \cdots) = 3(3\times0.03296 + 9\times10^{-9}) = 0.2966$。仲氢分数为$1.000\,18/(1.000\,18 + 0.2966) = 0.771$。快速冷却的样品保持其高温下$3 : 1$的正氢:仲氢比，因为没有催化剂时正氢-仲氢转化很慢；它表现为两种气体非平衡的*混合物*，四分之三为正氢（只含奇$J$），四分之一为仲氢（只含偶$J$），各自有自己的转动热容。相比之下，平衡氢随温度改变在两者之间转化，从而附加一个很大的转化贡献。丹尼森1927年对实测热容的解释，恰恰需要这种"冻结"的混合物。
:::
:::
