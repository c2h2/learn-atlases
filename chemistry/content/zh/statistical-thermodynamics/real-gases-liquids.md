在$0\ ^\circ\mathrm{C}$、$1\ \mathrm{bar}$下，1 mol氩气所占的体积比理想气体定律的预言小$21.5\ \mathrm{cm^{3}}$；而在$500\ ^\circ\mathrm{C}$下它所占的体积略*大*。前面各课的理想气体——分子之间从不彼此感知——既不能解释这两个事实，更不能解释液体的存在。真实分子在电子云重叠时强烈排斥，在较远距离上微弱吸引（[[bonding-structure/intermolecular-forces]]），而这些力——每摩尔至多几千焦——正是使气体液化、决定沸点、并使水成为今天这样的液体的原因。[[statistical-thermodynamics/canonical-ensemble]]中的正则系综正是为这种情形而建立的：它只需要整个系统的能量，相互作用也包括在内。

本课说明分子间力如何通过**位形积分**进入配分函数，并由此导出物态方程的位力展开，其中给出把第二维里系数$B(T)$与对势联系起来的精确公式。对硬球、方势阱和伦纳德-琼斯势求值后，该公式解释了$B$在波义耳温度处变号的原因，并赋予范德瓦尔斯常数以分子意义。对于展开失效的液体，我们引入**径向分布函数**$g(r)$——X射线与中子衍射所测量的量——并展示能量与压强如何由它得出。

## 位形积分

考虑$N$个全同分子，其总势能$\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)$只依赖于它们中心的位矢（如氩这类球状分子，或其取向依赖性被我们忽略的分子）。系统的能量于是是中心的动能加上$\mathcal{V}$再加上分子的内能。由于$\mathcal{V}$把各位矢耦合在一起，$Q$不再能分解为分子配分函数之积——但在经典极限下，对平动而言几乎可以。

::: proposition 相互作用的经典流体的配分函数 {#prop-config}
对$N$个全同、无结构（或内部彼此独立）的分子，势能$\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)$，其质心运动按经典处理，
$$
Q = \frac{(q^\mathrm{int})^{N}}{N!\,\Lambda^{3N}}\,Z_N, \qquad
Z_N = \int\!\!\cdots\!\!\int e^{-\beta\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)}\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N ,
$$ {#eq-config}
其中$Z_N$称为**位形积分**，每个$\boldsymbol r_i$遍历体积$V$。若$\mathcal{V} = 0$，则$Z_N = V^{N}$，$Q$化为理想气体的结果$q^{N}/N!$。
:::

::: proof
在经典极限下，对系统整体平动状态求和变成对位矢与动量的积分，相空间中每$h^{3N}$体积对应一个状态，再除以全同性的$1/N!$：
$$
Q^\mathrm{trans+config} = \frac{1}{N!\,h^{3N}}\int e^{-\beta\left[\sum_i p_i^{2}/2m + \mathcal{V}\right]}\,\mathrm{d}\boldsymbol p_1\cdots\mathrm{d}\boldsymbol p_N\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N .
$$
指数之和分解为只依赖动量的动能部分与只依赖位矢的$e^{-\beta\mathcal{V}}$。$3N$个动量积分中的每一个都是$\int e^{-\beta p^{2}/2m}\,\mathrm{d}p = (2\pi mk_\mathrm{B}T)^{1/2} = h/\Lambda$，所以动量部分给出$(h/\Lambda)^{3N}$，与$h^{3N}$相消，留下$\Lambda^{-3N}$；位矢部分就是$Z_N$。内部运动假定不受相互作用影响，贡献$(q^\mathrm{int})^{N}$。对$\mathcal{V} = 0$，每个位矢积分给出$V$，于是$Z_N = V^{N}$且$Q = (q^\mathrm{int}V/\Lambda^{3})^{N}/N!$。
:::

分子间力的一切效应现在都包含在$Z_N$中，而除了平凡的$V^{N}$之外，只有$Z_N$依赖于体积。由于$p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$，
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Z_N}{\partial V}\right)_{T,N} .
$$ {#eq-p-config}
动能不受力的影响——在经典流体中它永远是$\tfrac{3}{2}Nk_\mathrm{B}T$，无论液体还是气体——而位形能量为$\langle\mathcal{V}\rangle = -\partial\ln Z_N/\partial\beta$。

我们将假设$\mathcal{V}$是**对势**之和，$\mathcal{V} = \sum_{i<j}u(r_{ij})$，其中$r_{ij} = |\boldsymbol r_i - \boldsymbol r_j|$——对简单流体这是准确的。（三体作用对液氩内聚能的贡献占约几个百分点，对极性液体则更多。）

::: definition 对势与梅耶函数 {#def-mayer}
以下三种模型对势将被贯穿使用：

- **硬球**，直径$\sigma$：$r < \sigma$时$u(r) = \infty$，$r \ge \sigma$时为$0$；
- **方势阱**：$r < \sigma$时$u = \infty$，$\sigma \le r < \lambda\sigma$时$u = -\varepsilon$，$r \ge \lambda\sigma$时$u = 0$；
- **伦纳德-琼斯**（12,6）势：$u(r) = 4\varepsilon\left[(\sigma/r)^{12} - (\sigma/r)^{6}\right]$，在$r_\text{min} = 2^{1/6}\sigma$处有深度为$\varepsilon$的势阱，且$u(\sigma) = 0$。

**梅耶（Mayer）函数**为$f(r) = e^{-\beta u(r)} - 1$。在排斥禁止重叠之处它为$-1$，在势能为吸引之处它为正，并在大距离处趋于零。
:::

伦纳德-琼斯势的$r^{-6}$项有物理依据——伦敦（London）色散能（[[bonding-structure/intermolecular-forces]]）——而$r^{-12}$排斥只是闭壳层重叠的指数排斥在数学上方便的替代。对氩，用气相数据拟合得$\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$、$\sigma = 340.5\ \mathrm{pm}$（亥姆斯费尔德（Hirschfelder）、柯蒂斯（Curtiss）与伯德（Bird）的经典参数）。

::: widget plot
f: 4*(x^(-12) - x^(-6)); exp(-4*(x^(-12) - x^(-6))/t) - 1
x: 0.8, 3
y: -1.5, 3
sliders: t=2.28:0.3:10:0.01
hlines: 0
labels: u(r)/\varepsilon; \text{梅耶函数 } f(r)
caption: 伦纳德-琼斯势$u/\varepsilon$与梅耶函数$f = e^{-u/k_\mathrm{B}T} - 1$随$r/\sigma$的变化，约化温度$T^{*} = k_\mathrm{B}T/\varepsilon$由滑块`t`调节。起始值$T^{*} = 2.28$对应$273\ \mathrm{K}$的氩。在核内，$f = -1$（禁止重叠）；在$r = 1.12\sigma$处极小附近，$f$为正，并随$T^{*}$下降而陡升，达到$e^{1/T^{*}} - 1$。第二维里系数是$f$曲线下方带权面积取负，故低温（吸引占优）给出$B < 0$，高温（核心占优）给出$B > 0$。
:::

## 位力展开

在低密度下，分子主要以成对方式相遇，所以理想气体行为的首要修正来自二体碰撞。**位力展开**按摩尔浓度$1/V_\mathrm{m}$的幂次组织各项修正：
$$
\frac{pV_\mathrm{m}}{RT} = 1 + \frac{B(T)}{V_\mathrm{m}} + \frac{C(T)}{V_\mathrm{m}^{2}} + \cdots ,
$$
如[[general-chemistry-1/gases]]中所述。统计力学用分子间势精确给出各位力系数。

::: proposition 第二维里系数 {#prop-b2}
对通过对势$u(r)$相互作用的分子，
$$
B(T) = -2\pi N_\mathrm{A}\int_0^\infty\left(e^{-u(r)/k_\mathrm{B}T} - 1\right)r^{2}\,\mathrm{d}r = -2\pi N_\mathrm{A}\int_0^\infty f(r)\,r^{2}\,\mathrm{d}r .
$$ {#eq-b2}
:::

::: proof
把$e^{-\beta\mathcal{V}} = \prod_{i<j}e^{-\beta u_{ij}} = \prod_{i<j}(1 + f_{ij})$写出并展开：$1 + \sum_{i<j}f_{ij} + \sum\sum f_{ij}f_{kl} + \cdots$。低密度下只保留单个$f$的项。$\tfrac{1}{2}N(N-1) \approx \tfrac{1}{2}N^{2}$对中的每一对贡献相同的积分：对除$i$、$j$外的所有分子积分给出$V^{N-2}$；然后取$i$的位置与间距$\boldsymbol r = \boldsymbol r_j - \boldsymbol r_i$为变量，$\int\!\!\int f(r_{ij})\,\mathrm{d}\boldsymbol r_i\,\mathrm{d}\boldsymbol r_j = V\int f(r)\,4\pi r^{2}\,\mathrm{d}r \equiv VI$，其中$I$收敛，因为$f$在大$r$处迅速消失。于是
$$
Z_N \approx V^{N} + \tfrac{1}{2}N^{2}V^{N-1}I = V^{N}\left(1 + \frac{N^{2}I}{2V}\right) .
$$
括号对宏观的$N$并不接近1（因为$N^{2}/V$随系统增大），但正确归并各项的更细致处理（梅耶的集团展开）表明结果可以指数化：$Z_N \approx V^{N}\exp(N^{2}I/2V)$，于是$\ln Z_N = N\ln V + N^{2}I/2V$。再由[[#eq-p-config]]，
$$
p = k_\mathrm{B}T\left(\frac{N}{V} - \frac{N^{2}I}{2V^{2}}\right), \qquad
\frac{pV}{Nk_\mathrm{B}T} = 1 - \frac{NI}{2V} .
$$
与$pV_\mathrm{m}/RT = 1 + B/V_\mathrm{m}$比较，并用$N/V = N_\mathrm{A}/V_\mathrm{m}$，得$B = -\tfrac{1}{2}N_\mathrm{A}I = -2\pi N_\mathrm{A}\int_0^\infty f\,r^{2}\,\mathrm{d}r$。
:::

式[[#eq-b2]]对任何球对称对势都是精确的：在一段温度范围内测出$B(T)$，就等于检验任何假定的$u(r)$。它的物理内容从梅耶函数一目了然。排斥核心处$f = -1$，对$B$作*正*贡献——排除体积，它抬高压强。吸引势阱处$f > 0$，作*负*贡献——分子在彼此附近徘徊，从而压低压强。低温下势阱占优（其权重$e^{\varepsilon/k_\mathrm{B}T} - 1$很大），高温下核心占优。

::: example 氩的硬球第二维里系数 {#ex-hs}
计算直径$\sigma = 340.5\ \mathrm{pm}$的硬球的$B$，并与$273\ \mathrm{K}$下实测的$B(\mathrm{Ar}) \approx -21.5\ \mathrm{cm^{3}\,mol^{-1}}$比较。
::: solution
对硬球，$r < \sigma$时$f = -1$，之外为$0$，故
$$
B = -2\pi N_\mathrm{A}\int_0^{\sigma}(-1)r^{2}\,\mathrm{d}r = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3} .
$$
数值上，
$$
B = \tfrac{2}{3}\pi\times6.022\times10^{23}\ \mathrm{mol^{-1}}\times(3.405\times10^{-8}\ \mathrm{cm})^{3} = 49.8\ \mathrm{cm^{3}\,mol^{-1}} .
$$
这是分子自身体积$N_\mathrm{A}\cdot\tfrac{4}{3}\pi(\sigma/2)^{3} = 12.4\ \mathrm{cm^{3}\,mol^{-1}}$的四倍：两个直径为$\sigma$的球相遇时，每个球都把对方的*中心*排除在半径为$\sigma$的球之外，而每分子$\tfrac{1}{2}\cdot\tfrac{4}{3}\pi\sigma^{3}$是分子体积的四倍。对$273\ \mathrm{K}$的氩，这个正值也错得离谱，因为那里的$B$为负：在此温度下吸引势阱比核心更要紧。硬球只在$T^{*} \gtrsim 20$，或对以堆积为主导的稠密液体的*结构*，才是好模型。
:::
:::

### 方势阱、波义耳温度与范德瓦尔斯

对方势阱，$r < \sigma$时$f = -1$，$\sigma \le r < \lambda\sigma$时$f = e^{\beta\varepsilon} - 1$，之外为$0$。式[[#eq-b2]]给出
$$
B(T) = b_0\left[1 - (\lambda^{3} - 1)\left(e^{\varepsilon/k_\mathrm{B}T} - 1\right)\right], \qquad b_0 = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3} .
$$ {#eq-b-sw}
$B$在低温下为大负值，随$T$上升，在**波义耳温度**$T_\mathrm{B}$处变号——该处气体在密度的一阶修正上服从理想气体定律——并在高温下从下方趋于硬球值$b_0$。令$B = 0$得$k_\mathrm{B}T_\mathrm{B}/\varepsilon = 1/\ln[\lambda^{3}/(\lambda^{3} - 1)]$；对$\lambda = 1.5$，$T_\mathrm{B} = 2.85\,\varepsilon/k_\mathrm{B}$。

::: proposition 由对势确定范德瓦尔斯常数 {#prop-vdw}
在足够高的温度下，直径$\sigma$的排斥核心之外$|u(r)| \ll k_\mathrm{B}T$，
$$
B(T) \approx b - \frac{a}{RT}, \qquad b = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3}, \qquad a = -2\pi N_\mathrm{A}^{2}\int_\sigma^\infty u(r)\,r^{2}\,\mathrm{d}r ,
$$
这正是范德瓦尔斯方程的第二维里系数。常数$b$是每摩尔排除体积，$a$度量积分后的吸引强度。
:::

::: proof
在$\sigma$处把[[#eq-b2]]中的积分分成两段。核内把核心当作硬球处理：$f = -1$，给出$b$。核外$|\beta u| \ll 1$，故$f = e^{-\beta u} - 1 \approx -\beta u$，给出$-2\pi N_\mathrm{A}\int_\sigma^\infty(-\beta u)r^{2}\,\mathrm{d}r = (2\pi N_\mathrm{A}/k_\mathrm{B}T)\int_\sigma^\infty ur^{2}\,\mathrm{d}r = -a/RT$，其中的$a$如前述（注意$N_\mathrm{A}/k_\mathrm{B} = N_\mathrm{A}^{2}/R$）。对范德瓦尔斯方程$p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^{2}$，把$1/(V_\mathrm{m} - b)$展开为$V_\mathrm{m}^{-1}(1 + b/V_\mathrm{m} + \cdots)$得$pV_\mathrm{m}/RT = 1 + (b - a/RT)/V_\mathrm{m} + \cdots$，故其第二维里系数为$b - a/RT$。由于吸引势在$\sigma$之外$u < 0$，故$a > 0$。
:::

因此范德瓦尔斯方程作为精确统计结果的高温、低密度近似自然浮现，其两个常数得到辨认：$b$是分子体积的四倍，$a$是吸引势的积分。它的波义耳温度$T_\mathrm{B} = a/Rb$偏高（对氩，用表列的$a = 1.355\ \mathrm{dm^{6}\,bar\,mol^{-2}}$与$b = 0.0320\ \mathrm{dm^{3}\,mol^{-1}}$得$509\ \mathrm{K}$），因为$f \approx -\beta u$低估了势阱的权重。

::: example 由伦纳德-琼斯势估计氩的范德瓦尔斯常数 {#ex-vdw-lj}
对氩的伦纳德-琼斯势（$\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$，$\sigma = 340.5\ \mathrm{pm}$）使用[[#prop-vdw]]，取$\sigma$为核心直径，估计范德瓦尔斯常数$a$与$b$。与表列值$a = 1.355\ \mathrm{dm^{6}\,bar\,mol^{-2}}$、$b = 0.0320\ \mathrm{dm^{3}\,mol^{-1}}$（由临界点拟合得到）比较。
::: solution
排除体积为$b = 2\pi N_\mathrm{A}\sigma^{3}/3 = 49.8\ \mathrm{cm^{3}\,mol^{-1}} = 0.0498\ \mathrm{dm^{3}\,mol^{-1}}$（[[#ex-hs]]）。对$a$，伦纳德-琼斯势在$\sigma$之外的积分为
$$
\int_\sigma^\infty 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]r^{2}\,\mathrm{d}r = 4\varepsilon\sigma^{3}\left[\frac{1}{9} - \frac{1}{3}\right] = -\frac{8}{9}\varepsilon\sigma^{3},
$$
故$a = \tfrac{16\pi}{9}N_\mathrm{A}^{2}\varepsilon\sigma^{3}$。数值上，取$\varepsilon = 119.8\times1.380\,65\times10^{-23}\ \mathrm{J} = 1.654\times10^{-21}\ \mathrm{J}$，
$$
a = \frac{16\pi}{9}\times(6.022\times10^{23})^{2}\times1.654\times10^{-21}\times(3.405\times10^{-10})^{3}\ \mathrm{J\,m^{3}\,mol^{-2}} = 0.132\ \mathrm{Pa\,m^{6}\,mol^{-2}} = 1.32\ \mathrm{dm^{6}\,bar\,mol^{-2}} .
$$
吸引常数与表列值相差仅$2\,\%$——范德瓦尔斯的$a$确实是色散吸引的积分。排除体积偏大$55\,\%$，因为真实的核心是软的，也因为表列的$b$被强行去拟合临界点处的稠密流体——而在那里范德瓦尔斯方程是个糟糕的近似。由此得到的波义耳温度$a/Rb = 319\ \mathrm{K}$偏低；精确的伦纳德-琼斯值是$409\ \mathrm{K}$。
:::
:::

::: widget plot
f: 1 - (l^3 - 1)*(exp(1/x) - 1); -3*sum((exp(-4*(((j - 0.5)*0.005)^(-12) - ((j - 0.5)*0.005)^(-6))/x) - 1)*((j - 0.5)*0.005)^2, j, 1, 2000)*0.005 - 4/(1000*x); 1
x: 0.6, 12
y: -4, 1.5
sliders: l=1.5:1.1:2:0.01
hlines: 0
labels: \text{方势阱 } B/b_0; \text{伦纳德-琼斯 } B/b_0; \text{硬球}
caption: 约化第二维里系数$B/b_0$（其中$b_0 = 2\pi N_\mathrm{A}\sigma^{3}/3$）对约化温度$T^{*} = k_\mathrm{B}T/\varepsilon$的曲线：作用范围为$\lambda$（滑块`l`）的方势阱，来自[[#eq-b-sw]]；以及由[[#eq-b2]]数值求值的伦纳德-琼斯势。两者在低$T^{*}$下都为负，在波义耳温度处过零（伦纳德-琼斯的$T^{*}_\mathrm{B} = 3.42$，即氩的$409\ \mathrm{K}$，实测$411\ \mathrm{K}$），并在硬球值下方趋于平缓。伦纳德-琼斯曲线在$T^{*} \approx 25$附近经过一个很浅的极大（在图外），因为它的排斥壁是软的：在极高温下分子会穿透它，有效直径随之缩小。
:::

::: example 由伦纳德-琼斯势计算氩的第二维里系数 {#ex-lj}
取$\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$与$\sigma = 340.5\ \mathrm{pm}$，[[#eq-b2]]的数值积分在$T^{*} = 273.15/119.8 = 2.280$处给出$B/b_0 = -0.4316$。求$273.15\ \mathrm{K}$、$1\ \mathrm{bar}$下氩的$B$与压缩因子$Z = pV_\mathrm{m}/RT$，以及相对于理想气体的摩尔体积亏损。
::: solution
$B = -0.4316\times49.79\ \mathrm{cm^{3}\,mol^{-1}} = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$，与实验符合极佳——这不足为奇，因为参数正是对这类数据拟合的；但同样的两个参数随后在整个$100$到$1000\ \mathrm{K}$范围内重现了$B$，还能相当好地再现象的输运性质与固体的性质。

低压下把位力展开写成对压强的展开很方便，$Z = 1 + Bp/RT + \cdots$。由$RT/p = 8.3145\times273.15/10^{5}\ \mathrm{m^{3}\,mol^{-1}} = 22\,711\ \mathrm{cm^{3}\,mol^{-1}}$，
$$
Z = 1 + \frac{-21.5}{22\,711} = 0.999\,05 .
$$
摩尔体积为$V_\mathrm{m} = ZRT/p \approx RT/p + B$，故亏损为$|B| = 21.5\ \mathrm{cm^{3}\,mol^{-1}}$，在低压下与压强无关：这正是课首给出的那个数字。$0.1\,\%$的偏差看似微不足道，却很容易测量，而且是通向分子间力的最直接的实验窗口。
:::
:::

### 由对势看焦耳-汤姆孙效应

气体经节流（林德液化机与一切蒸气压缩式制冷机的原理）膨胀时之所以冷却，完全是因为分子间力：理想气体的焦耳-汤姆孙系数严格为零。位力展开把这一联系定量化。

::: proposition 低压下的焦耳-汤姆孙系数 {#prop-jt}
对服从$V_\mathrm{m} = RT/p + B(T)$的气体，低压极限下的焦耳-汤姆孙系数为
$$
\mu_\mathrm{JT} = \left(\frac{\partial T}{\partial p}\right)_H = \frac{1}{C_{p,\mathrm{m}}}\left(T\frac{\mathrm{d}B}{\mathrm{d}T} - B\right) .
$$ {#eq-jt}
气体在**转化温度**以下膨胀时冷却（$\mu_\mathrm{JT} > 0$），该处$T\,\mathrm{d}B/\mathrm{d}T = B$；在其上则变热。
:::

::: proof
热力学恒等式$\mu_\mathrm{JT}C_{p,\mathrm{m}} = T(\partial V_\mathrm{m}/\partial T)_p - V_\mathrm{m}$（[[thermodynamics/free-energy]]）用于$V_\mathrm{m} = RT/p + B(T)$，给出$T(R/p + \mathrm{d}B/\mathrm{d}T) - RT/p - B = T\,\mathrm{d}B/\mathrm{d}T - B$；理想气体部分精确相消。波义耳温度以下$B < 0$且$\mathrm{d}B/\mathrm{d}T > 0$，两项皆正；其以上$B > 0$，两项相互竞争，直到温度足够高时$B$获胜。
:::

::: example 节流氩气 {#ex-jt}
由伦纳德-琼斯曲线，氩在$273.15\ \mathrm{K}$时有$B = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$、$\mathrm{d}B/\mathrm{d}T = 0.250\ \mathrm{cm^{3}\,mol^{-1}\,K^{-1}}$；$C_{p,\mathrm{m}} = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$。估计$\mu_\mathrm{JT}$，并假设$\mu_\mathrm{JT}$恒定，估计氩从$50$节流到$1\ \mathrm{bar}$时的降温。
::: solution
$T\,\mathrm{d}B/\mathrm{d}T - B = 273.15\times0.250 + 21.5 = 68.3 + 21.5 = 89.8\ \mathrm{cm^{3}\,mol^{-1}} = 8.98\times10^{-5}\ \mathrm{m^{3}\,mol^{-1}}$。于是
$$
\mu_\mathrm{JT} = \frac{8.98\times10^{-5}\ \mathrm{m^{3}\,mol^{-1}}}{20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}} = 4.32\times10^{-6}\ \mathrm{K\,Pa^{-1}} = 0.43\ \mathrm{K\,bar^{-1}} .
$$
$49\ \mathrm{bar}$的压降使气体冷却约$21\ \mathrm{K}$（实际略少，因为$\mu_\mathrm{JT}$在较高压强下变小）。效应的四分之三来自$T\,\mathrm{d}B/\mathrm{d}T$，即来自吸引贡献的温度依赖：膨胀时分子彼此远离，以动能为代价爬出彼此的势阱。对伦纳德-琼斯势，转化条件$T\,\mathrm{d}B/\mathrm{d}T = B$在$T^{*} = 6.43$处满足，即氩的约$770\ \mathrm{K}$；氢与氦的势阱极浅，转化温度分别约为$200\ \mathrm{K}$与$40\ \mathrm{K}$，这就是为什么它们在室温下节流时反而变热，必须先预冷，才能用焦耳-汤姆孙效应液化。
:::
:::

::: warning 位力展开是低密度展开 {#warn-virial}
[[#eq-b2]]对$B$是精确的，但把位力级数只截断到$B$，仅在$|B|/V_\mathrm{m} \ll 1$时才准确，对室温附近的简单气体大致是$10$–$20\ \mathrm{bar}$以下。在液体密度下$V_\mathrm{m}$与$b$相当，级数收敛很慢或根本不收敛；位力展开无法描述冷凝（相变是任何有限级数都无法再现的奇点）。不要只用$B$估计液体的密度，也不要用范德瓦尔斯常数预测液体结构。还请注意单位：以$\mathrm{cm^{3}\,mol^{-1}}$为单位的$B$，在与SI单位的$RT/p$组合之前必须换算成$\mathrm{m^{3}\,mol^{-1}}$（$\times10^{-6}$）。
:::

::: quiz
某气体在室温下的第二维里系数为负。哪句话是正确的？
- [ ] 它的分子比理想气体的分子小。
- [x] 在室温下，分子间势的吸引部分在梅耶函数的积分中压过排斥核心，因此低压下该气体比理想气体更容易压缩。
- [ ] 它的分子在任何距离上都相互排斥。
- [ ] 它一定处于其波义耳温度以上。
::: solution
当$f$的正的部分（吸引势阱，权重$e^{\varepsilon/k_\mathrm{B}T} - 1$）压过负的部分（核心，$f = -1$）时，$B = -2\pi N_\mathrm{A}\int f\,r^{2}\,\mathrm{d}r$为负。此时$Z < 1$且$V_\mathrm{m} < RT/p$：吸引使气体更容易压缩。该气体处于波义耳温度*以下*，$B$正是在那里变号；纯排斥的分子（硬球）永远有$B > 0$。"分子更小"是把$B$与$b$混为一谈：核心的尺寸永远是正贡献。
:::
:::

## 液体与径向分布函数

在液体中，每个分子同时与十几个近邻相互作用，任何按密度的展开都行不通。于是我们用液体的*结构*来描述它：分子数密度如何随与其中任一分子的距离而变化。

::: definition 径向分布函数 {#def-gr}
对数密度为$\rho = N/V$的流体，**径向分布函数**$g(r)$定义为：给定分子周围、半径$r$、厚度$\mathrm{d}r$的薄球壳内，分子中心落入的平均数目为
$$
\mathrm{d}N(r) = \rho\,g(r)\,4\pi r^{2}\,\mathrm{d}r .
$$
于是$g(r)$就是距离$r$处的局域密度相对体密度的比值。在任何流体中，排斥核内$g(r) \to 0$，大$r$处$g(r)\to1$。**配位数**是第一壳层内的近邻数目，$n_1 = 4\pi\rho\int_0^{r_1}g(r)r^{2}\,\mathrm{d}r$，其中$r_1$是$g$的第一个极小。
:::

在稀薄气体中，在距离$r$处找到第二个分子的概率就是它们相互作用的玻尔兹曼因子：$g(r) = e^{-u(r)/k_\mathrm{B}T}$。在液体中，$g(r)$有一个尖锐的第一峰（最邻近壳层），随后是衰减的振荡（第二、第三壳层），在几个分子直径内消失——短程有序而无长程有序，与晶体形成对照，晶体的$g(r)$是一列无限延伸的尖峰。$g(r)$由X射线或中子衍射测得（它是结构因子的傅里叶变换，[[materials-chemistry/diffraction]]），并由分子动力学或蒙特卡洛模拟算出（[[computational-chemistry/molecular-dynamics]]）。

::: proposition 由$g(r)$求能量与压强 {#prop-gr}
对势能按对可加$u(r)$、径向分布函数为$g(r)$的流体，
$$
U = \tfrac{3}{2}Nk_\mathrm{B}T + U^\mathrm{int} + \frac{N\rho}{2}\int_0^\infty u(r)\,g(r)\,4\pi r^{2}\,\mathrm{d}r ,
\qquad
\frac{p}{\rho k_\mathrm{B}T} = 1 - \frac{2\pi\rho}{3k_\mathrm{B}T}\int_0^\infty r\,\frac{\mathrm{d}u}{\mathrm{d}r}\,g(r)\,r^{2}\,\mathrm{d}r ,
$$ {#eq-energy-pressure}
即**能量方程**与**压强（位力）方程**。
:::

::: proof
*能量*。动能与内部的贡献就是独立分子的相应项。位形能量为$\langle\sum_{i<j}u(r_{ij})\rangle$。任一分子周围，$r$与$r + \mathrm{d}r$之间的平均近邻数为$\rho g(r)4\pi r^{2}\,\mathrm{d}r$，每个贡献$u(r)$；对全部$N$个分子求和时每一对被计了两次，故有因子$\tfrac{1}{2}N$。*压强*。克劳修斯（Clausius）位力定理给出$pV = Nk_\mathrm{B}T + \tfrac{1}{3}\langle\sum_i\boldsymbol r_i\cdot\boldsymbol F_i\rangle$，其中$\boldsymbol F_i$是作用在分子$i$上的分子间力。对对力，$\sum_i\boldsymbol r_i\cdot\boldsymbol F_i = -\sum_{i<j}r_{ij}\,u'(r_{ij})$，用同样的对计数作平均给出$-\tfrac{1}{2}N\rho\int r\,u'(r)\,g(r)4\pi r^{2}\,\mathrm{d}r$。除以$3Nk_\mathrm{B}T\cdot V/N$即得所述形式。在稀薄极限下，取$g = e^{-\beta u}$并分部积分，压强方程重现[[#eq-b2]]。
:::

由$g(r)$还可得到另外两个量。**平均力势**$w(r) = -k_\mathrm{B}T\ln g(r)$是相距$r$的两个分子的有效自由能相互作用——已对其他所有分子的位置作了平均；稀薄气体中它化为$u(r)$，液体中则包含溶剂的中介——溶液化学中的溶剂分隔离子对与疏水接触都是$w(r)$的极小。而水的结构，其第一壳层配位数约为$4.5$（液氩约为12），正是其氢键网络的印记（[[biochemistry/water-noncovalent]]）。

::: example 液氩的配位数 {#ex-coordination}
氩液体在其正常沸点附近的密度为$1.395\ \mathrm{g\,cm^{-3}}$。对其实测$g(r)$的一个粗略模型取：$r < 0.34\ \mathrm{nm}$时$g = 0$；第一壳层$0.34 < r < 0.47\ \mathrm{nm}$内$g = 2.0$为常数；其余忽略。估计配位数。在$150\ \mathrm{K}$的稀薄氩气中，于伦纳德-琼斯势阱底部会测得$g$为何值？
::: solution
数密度为$\rho = (1.395\times10^{3}\ \mathrm{kg\,m^{-3}}/0.039\,948\ \mathrm{kg\,mol^{-1}})\times6.022\times10^{23}\ \mathrm{mol^{-1}} = 2.103\times10^{28}\ \mathrm{m^{-3}}$。壳层内$g$取常数，
$$
n_1 = 4\pi\rho\,g\int_{0.34\ \mathrm{nm}}^{0.47\ \mathrm{nm}}r^{2}\,\mathrm{d}r = \frac{4\pi}{3}\rho\,g\left(r_1^{3} - \sigma^{3}\right) = \frac{4\pi}{3}\times2.103\times10^{28}\times2.0\times\left(1.038 - 0.393\right)\times10^{-28} = 11.4 .
$$
模型值接近密堆积固体的12个近邻：液氩在局域上几乎密堆积，只比固体稀$12\,\%$左右，长程有序则已被摧毁。在$150\ \mathrm{K}$的稀薄气体中，$g(r_\text{min}) = e^{\varepsilon/k_\mathrm{B}T} = e^{119.8/150} = 2.22$：即使没有近邻把它们挤在一起，吸引仍使在两阱底发现两个原子的概率增加一倍有余。
:::
:::

::: application 工程中的物态方程
位力系数与径向分布函数并非只有学术意义。用于天然气、制冷剂与二氧化碳（碳捕集与封存）的精确物态方程，例如天然气混合物的GERG-2008标准，建立在有理论依据的形式之上，其低密度极限再现实测或算得的$B(T)$与$C(T)$；小分子的第二维里系数现在可以从第一性原理的分子间势算得比实验测得还准，并被用来校准气体温度计（[[laboratory-methods/measurement-uncertainty]]）。
:::

::: history
卡末林-昂内斯（Heike Kamerlingh Onnes）于1901年引入位力展开，作为其莱顿气体等温线测量的经验表示式。第二维里系数的统计公式由乌尔塞尔（Heinrich Ursell，1927年）导出，并由梅耶（Joseph Mayer）的集团展开（1937年）推广到任意级数（他与戈佩特·梅耶（Maria Goeppert Mayer）合著的《统计力学》（*Statistical Mechanics*）于1940年出版）。伦纳德-琼斯（John Lennard-Jones）于1924年提出了以其名字命名的势，并用它拟合氩及其他气体的第二维里系数；伦敦（Fritz London）1930年关于色散力的量子力学理论为$r^{-6}$吸引提供了依据。液体的径向分布函数由泽尔尼克（Frits Zernike）与普林斯（Jan Prins）于1927年首次从X射线散射得到；柯克伍德（John Gamble Kirkwood）1930年代的积分方程，以及奥尔德（Berni Alder）与沃恩赖特（Thomas Wainwright）对硬球和伦纳德-琼斯流体的首批计算机模拟（分子动力学，1957年）、拉赫曼（Aneesur Rahman）对液氩的模拟（1964年），使液态变得可以定量计算。
:::

## 后续内容

位形积分是液体、溶液与聚合物的统计力学的核心对象。对它的模拟求值——用蒙特卡洛采样构型，或用分子动力学跟踪构型——是[[computational-chemistry/molecular-dynamics]]的主题，而构型之间的自由能差（结合、溶剂化）就是位形积分之比（[[computational-chemistry/free-energy-sampling]]）。平均力势支撑着电解质的德拜-休克尔（Debye-Hückel）理论（[[thermodynamics/ions-in-solution]]）与胶体、聚合物在溶液中的有效相互作用（[[polymer-chemistry/polymer-solutions]]）。对实际气体，第二维里系数给出逸度，$\ln(f/p) \approx Bp/RT$，用以在高压下修正[[statistical-thermodynamics/equilibrium-from-molecules]]中的平衡常数。

::: summary
- 对相互作用的分子，$Q = (q^\mathrm{int})^{N}Z_N/(N!\,\Lambda^{3N})$；分子间力的一切效应都在位形积分$Z_N = \int e^{-\beta\mathcal{V}}\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N$中，且$p = k_\mathrm{B}T(\partial\ln Z_N/\partial V)_T$。
- 第二维里系数精确地为$B(T) = -2\pi N_\mathrm{A}\int_0^\infty(e^{-u/k_\mathrm{B}T} - 1)r^{2}\,\mathrm{d}r$：排斥核心作正贡献（排除体积），吸引势阱作负贡献。
- 硬球：$B = 2\pi N_\mathrm{A}\sigma^{3}/3$，为分子体积的四倍；方势阱与伦纳德-琼斯势在低温下给出$B < 0$，在波义耳温度处$B = 0$（伦纳德-琼斯的$T^{*}_\mathrm{B} = 3.42$），其上$B > 0$。
- 高温下$B \approx b - a/RT$：范德瓦尔斯的$b$是排除体积，$a$是积分后的吸引。
- 伦纳德-琼斯氩（$\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$，$\sigma = 340.5\ \mathrm{pm}$）给出$B(273\ \mathrm{K}) = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$，与实验相符。
- 液体由径向分布函数$g(r)$描述：能量与压强由以$g$为权的$u$与$u'$的积分给出；$w(r) = -k_\mathrm{B}T\ln g(r)$是平均力势。
:::

## 习题

::: exercise 氮的排除体积 {level=1 check="63.9"}
把$\mathrm{N_2}$当作直径$370\ \mathrm{pm}$的硬球，计算它的第二维里系数。（以$\mathrm{cm^{3}\,mol^{-1}}$为单位输入$B$。）
::: solution
$B = \tfrac{2}{3}\pi N_\mathrm{A}\sigma^{3} = \tfrac{2}{3}\pi\times6.022\times10^{23}\times(3.70\times10^{-8}\ \mathrm{cm})^{3} = 63.9\ \mathrm{cm^{3}\,mol^{-1}}$。实测的氮的$B$永远达不到这个值：它在约$327\ \mathrm{K}$（波义耳温度）以下为负，即使到$1000\ \mathrm{K}$也远低于$b_0$，部分原因是吸引势阱仍然要紧，部分原因是真实分子的软排斥使其有效直径随温度升高而缩小。
:::
:::

::: exercise 由$B$求压缩因子 {level=1 check="0.9935"}
$300\ \mathrm{K}$下$\mathrm{CH_4}$的第二维里系数为$-42\ \mathrm{cm^{3}\,mol^{-1}}$。估计其在$3.85\ \mathrm{bar}$下的压缩因子$Z$。（输入$Z$。）
::: solution
$RT/p = 8.3145\times300/3.85\times10^{5}\ \mathrm{m^{3}\,mol^{-1}} = 6.479\times10^{-3}\ \mathrm{m^{3}\,mol^{-1}} = 6479\ \mathrm{cm^{3}\,mol^{-1}}$，故$Z \approx 1 + Bp/RT = 1 - 42/6479 = 0.9935$。几个bar下的甲烷比理想气体密$0.65\,\%$。
:::
:::

::: exercise 方势阱的波义耳温度 {level=1 check="2.85"}
由[[#eq-b-sw]]导出方势阱气体的波义耳温度，并对$\lambda = 1.5$求$k_\mathrm{B}T_\mathrm{B}/\varepsilon$。（输入$k_\mathrm{B}T_\mathrm{B}/\varepsilon$。）
::: solution
$B = 0$要求$(\lambda^{3} - 1)(e^{\varepsilon/k_\mathrm{B}T_\mathrm{B}} - 1) = 1$，故$e^{\varepsilon/k_\mathrm{B}T_\mathrm{B}} = \lambda^{3}/(\lambda^{3} - 1)$，$k_\mathrm{B}T_\mathrm{B}/\varepsilon = 1/\ln[\lambda^{3}/(\lambda^{3}-1)]$。对$\lambda = 1.5$，$\lambda^{3} = 3.375$，$\ln(3.375/2.375) = 0.3514$，故$k_\mathrm{B}T_\mathrm{B}/\varepsilon = 2.85$。势阱越宽（$\lambda$越大），波义耳温度越高，因为可以用来压过核心的吸引体积更多。
:::
:::

::: exercise 氩的方势阱$B$ {level=2 check="-21.6"}
氩的一个方势阱拟合给出$\sigma = 307\ \mathrm{pm}$，$\lambda = 1.70$，$\varepsilon/k_\mathrm{B} = 93.3\ \mathrm{K}$。计算$273.15\ \mathrm{K}$下的$B$。（以$\mathrm{cm^{3}\,mol^{-1}}$为单位输入$B$。）
::: solution
$b_0 = \tfrac{2}{3}\pi N_\mathrm{A}\sigma^{3} = \tfrac{2}{3}\pi\times6.022\times10^{23}\times(3.07\times10^{-8})^{3} = 36.5\ \mathrm{cm^{3}\,mol^{-1}}$。$\lambda^{3} - 1 = 3.913$；$e^{93.3/273.15} - 1 = e^{0.3416} - 1 = 0.4072$。于是$B = 36.49\times(1 - 3.913\times0.4072) = 36.49\times(-0.5934) = -21.6\ \mathrm{cm^{3}\,mol^{-1}}$，接近[[#ex-lj]]的伦纳德-琼斯值与实验值。只有三个参数的方势阱，拟合得与两个参数的伦纳德-琼斯势一样好——这提醒我们，仅凭与$B(T)$符合并不能决定$u(r)$的形状。
:::
:::

::: exercise 由势求范德瓦尔斯$a$ {level=2}
对方势阱势，用[[#prop-vdw]]证明$a = \tfrac{2}{3}\pi N_\mathrm{A}^{2}\sigma^{3}\varepsilon(\lambda^{3} - 1)$，并验证它与[[#eq-b-sw]]的高温展开相符。
::: solution
在$\sigma$之外，$\sigma \le r < \lambda\sigma$时$u = -\varepsilon$，再远为$0$，故$a = -2\pi N_\mathrm{A}^{2}\int_\sigma^{\lambda\sigma}(-\varepsilon)r^{2}\,\mathrm{d}r = 2\pi N_\mathrm{A}^{2}\varepsilon(\lambda^{3} - 1)\sigma^{3}/3$。由[[#eq-b-sw]]，当$\varepsilon \ll k_\mathrm{B}T$时$e^{\varepsilon/k_\mathrm{B}T} - 1 \approx \varepsilon/k_\mathrm{B}T$，故$B \approx b_0 - b_0(\lambda^{3} - 1)\varepsilon/k_\mathrm{B}T = b_0 - a/RT$，其中$a = b_0(\lambda^{3}-1)\varepsilon N_\mathrm{A} = \tfrac{2}{3}\pi N_\mathrm{A}^{2}\sigma^{3}\varepsilon(\lambda^{3} - 1)$，因为$RT/k_\mathrm{B}T = N_\mathrm{A}$。两种途径一致。
:::
:::

::: exercise 稀薄气体的位形能量 {level=2 check="-6.8"}
稀薄气体中$g(r) = e^{-u/k_\mathrm{B}T}$。由能量方程证明每摩尔位形能量为$U^\mathrm{conf}_\mathrm{m} = -RT^{2}(\mathrm{d}B/\mathrm{d}T)/V_\mathrm{m}$，并估计$273.15\ \mathrm{K}$、$1\ \mathrm{bar}$下氩的该值，设此温度下$\mathrm{d}B/\mathrm{d}T = 0.250\ \mathrm{cm^{3}\,mol^{-1}\,K^{-1}}$（由伦纳德-琼斯曲线得出）。（以$\mathrm{J\,mol^{-1}}$为单位输入$U^\mathrm{conf}_\mathrm{m}$。）
::: hint
$\mathrm{d}B/\mathrm{d}T = -2\pi N_\mathrm{A}\int\mathrm{d}f/\mathrm{d}T\,r^{2}\,\mathrm{d}r$，其中$\mathrm{d}f/\mathrm{d}T = (u/k_\mathrm{B}T^{2})e^{-u/k_\mathrm{B}T}$。
:::
::: solution
由[[#eq-energy-pressure]]，对1 mol，$U^\mathrm{conf}_\mathrm{m} = \tfrac{1}{2}N_\mathrm{A}\rho\int u\,e^{-\beta u}4\pi r^{2}\,\mathrm{d}r$，其中$\rho = N_\mathrm{A}/V_\mathrm{m}$。利用提示，$\int u\,e^{-\beta u}r^{2}\,\mathrm{d}r = -(k_\mathrm{B}T^{2}/2\pi N_\mathrm{A})\,\mathrm{d}B/\mathrm{d}T$。于是
$$
U^\mathrm{conf}_\mathrm{m} = \tfrac{1}{2}\frac{N_\mathrm{A}^{2}}{V_\mathrm{m}}\cdot4\pi\cdot\left(-\frac{k_\mathrm{B}T^{2}}{2\pi N_\mathrm{A}}\frac{\mathrm{d}B}{\mathrm{d}T}\right) = -\frac{RT^{2}}{V_\mathrm{m}}\frac{\mathrm{d}B}{\mathrm{d}T} .
$$
对氩，$V_\mathrm{m} \approx RT/p = 2.271\times10^{-2}\ \mathrm{m^{3}\,mol^{-1}}$，故$U^\mathrm{conf}_\mathrm{m} = -8.3145\times273.15^{2}\times0.250\times10^{-6}/2.271\times10^{-2} = -6.8\ \mathrm{J\,mol^{-1}}$。与$\tfrac{3}{2}RT = 3.4\ \mathrm{kJ\,mol^{-1}}$相比微乎其微，但它正是焦耳-汤姆孙效应所测量的量。
:::
:::

::: exercise 液体密度下的硬球 {level=3}
硬球的前两个位力系数为$B = b_0$与$C = \tfrac{5}{8}b_0^{2}$。卡纳汉-斯塔林（Carnahan-Starling）方程$Z = (1 + \eta + \eta^{2} - \eta^{3})/(1 - \eta)^{3}$，其中堆积分数$\eta = \pi\rho\sigma^{3}/6$，对硬球流体是很准确的近似。(a) 证明它对$\eta$的展开重现$B$与$C$。(b) 在$\eta = 0.45$（液体的典型值）下，分别由卡纳汉-斯塔林方程与截断到$C$的位力级数计算$Z$，并加以评论。
::: solution
(a) 展开，$(1 - \eta)^{-3} = 1 + 3\eta + 6\eta^{2} + 10\eta^{3} + \cdots$，故$Z = (1 + \eta + \eta^{2} - \eta^{3})(1 + 3\eta + 6\eta^{2} + \cdots) = 1 + 4\eta + 10\eta^{2} + \cdots$。由于$b_0/V_\mathrm{m} = \tfrac{2}{3}\pi\sigma^{3}\rho = 4\eta$，位力级数为$Z = 1 + b_0/V_\mathrm{m} + \tfrac{5}{8}b_0^{2}/V_\mathrm{m}^{2} = 1 + 4\eta + 10\eta^{2}$：系数一致。

(b) 在$\eta = 0.45$：卡纳汉-斯塔林给出$Z = (1 + 0.45 + 0.2025 - 0.0911)/(0.55)^{3} = 1.5614/0.16638 = 9.38$。截断的位力级数给出$1 + 1.8 + 2.025 = 4.83$。在液体密度下，硬球的压强几乎是理想气体值的十倍，而两项级数只捕捉到其中约一半；更高阶的系数（$D$、$E$，……皆正且递增）全都不可缺。这就是上面那条警示的定量内容：稠密流体需要不同的方法，而硬球方程（如卡纳汉-斯塔林）作为真实液体的参考（微扰理论）之所以成功，正因它代表了这一途径。
:::
:::

::: exercise 由压强方程求$B$ {level=3}
证明在稀薄极限下，即$g(r) = e^{-\beta u(r)}$时，压强方程[[#eq-energy-pressure]]给出$pV_\mathrm{m}/RT = 1 + B/V_\mathrm{m}$，其中$B$由[[#eq-b2]]给出。
::: hint
注意$u'(r)e^{-\beta u} = -k_\mathrm{B}T\,\mathrm{d}(e^{-\beta u} - 1)/\mathrm{d}r$，然后分部积分。
:::
::: solution
取$g = e^{-\beta u}$，压强方程中的积分为$\int_0^\infty r^{3}u'e^{-\beta u}\,\mathrm{d}r = -k_\mathrm{B}T\int_0^\infty r^{3}\,\frac{\mathrm{d}f}{\mathrm{d}r}\,\mathrm{d}r$，其中$f = e^{-\beta u} - 1$。分部积分，$\int_0^\infty r^{3}f'\,\mathrm{d}r = [r^{3}f]_0^\infty - 3\int_0^\infty r^{2}f\,\mathrm{d}r = -3\int_0^\infty r^{2}f\,\mathrm{d}r$，因为$r^{3}f$在两端都趋于$0$（在$0$端因为$f = -1$；在$\infty$端因为$f \sim r^{-6}$）。于是该积分等于$3k_\mathrm{B}T\int r^{2}f\,\mathrm{d}r$，从而
$$
\frac{p}{\rho k_\mathrm{B}T} = 1 - \frac{2\pi\rho}{3k_\mathrm{B}T}\cdot3k_\mathrm{B}T\int_0^\infty r^{2}f\,\mathrm{d}r = 1 - 2\pi\rho\int_0^\infty fr^{2}\,\mathrm{d}r .
$$
取$\rho = N_\mathrm{A}/V_\mathrm{m}$，这就是$1 + B/V_\mathrm{m}$，其中$B = -2\pi N_\mathrm{A}\int fr^{2}\,\mathrm{d}r$，此即所求。
:::
:::
