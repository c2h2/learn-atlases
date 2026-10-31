哈特里-福克理论能正确给出分子$99\ \%$以上的能量，却依然在化学问题上栽跟头。它完全不能结合$\mathrm{F_2}$，把势垒抬高几十千焦每摩尔，对两个氩原子则根本不给出任何吸引。缺失的那块拼图是**电子相关**：实际上每个电子的运动都瞬时依赖于其他电子所在的位置，而单个斯莱特行列式中，自旋相反的电子在平均场中各自独立运动。本课发展重新引入相关性的三大类方法——组态相互作用、米-普（Møller–Plesset）微扰理论与耦合簇理论——以及在其间做出选择所需的概念：大小一致性、费用与精度的层级，以及动态相关与静态相关之分。三类方法全部建立在[[computational-chemistry/hartree-fock]]的哈特里-福克行列式及其虚轨道之上，因此[[computational-chemistry/basis-sets]]中关于基组的种种考虑在这里完全适用。

## 相关能

::: definition 相关能 {#def-correlation-energy}
某**态的相关能**（勒维丁（Löwdin）的定义）为
$$
E_\mathrm{corr} = E_\mathrm{exact} - E_\mathrm{HF},
$$
其中$E_\mathrm{exact}$为精确的非相对论玻恩-奥本海默能量，$E_\mathrm{HF}$为哈特里-福克极限（完备基组）。由变分原理，$E_\mathrm{corr} < 0$。在有限基组中，人们也说*该基组下的*相关能$E_\mathrm{FCI} - E_\mathrm{HF}$，其中FCI为基组内的精确解（下文定义）。
:::

氦的相关能为$-2.90372 - (-2.86168) = -0.04204\ \mathrm{E_h} = -1.14\ \mathrm{eV}$；平衡几何下的$\mathrm{H_2}$为$-0.0408\ \mathrm{E_h}$；水约为$-0.37\ \mathrm{E_h}$，即每对电子约$-0.04\ \mathrm{E_h}$、约$100\ \mathrm{kJ\,mol^{-1}}$。要紧的是它的*变化*。断键时，一对配对的电子彼此分离，其相关能随之丧失；这就是哈特里-福克结合偏弱的原因。两分子靠近时，电子云的关联涨落产生色散吸引，而哈特里-福克完全没有这种吸引。

物理上区分两类相关，尽管二者逐渐过渡、彼此交叠：

- **动态相关**：电子的近程互相回避，即每个电子周围的**库仑空穴**，平均场挖不出这样的空穴。它分散在众多激发组态的大量微小贡献之中，需要包含高角动量函数的大基组（[[computational-chemistry/basis-sets]]中的电子间尖点）。
- **静态相关**（非动态相关，或称强相关）：当两个或多个组态几乎简并时，单个行列式即使作为定性描述也告失效——拉长的键、双自由基、许多过渡金属化合物、臭氧的$\pi$体系。它由少数几个大贡献承载。

## 组态相互作用

在$K$个空间函数的基组中做哈特里-福克计算，得到$2K$个自旋轨道：$N$个占据，$2K - N$个虚。把占据自旋轨道替换为虚自旋轨道，就产生**激发行列式**：单激发$\Phi_i^{a}$、双激发$\Phi_{ij}^{ab}$、三激发，如此等等。这些行列式合起来构成该轨道空间中$N$电子波函数的完备基。

::: definition 组态相互作用 {#def-ci}
**组态相互作用**（configuration interaction, CI）波函数是参考行列式与激发行列式的线性组合，
$$
\Psi_\mathrm{CI} = c_0\Phi_0 + \sum_{ia}c_i^{a}\Phi_i^{a} + \sum_{i<j,\,a<b}c_{ij}^{ab}\Phi_{ij}^{ab} + \sum_{i<j<k,\,a<b<c}c_{ijk}^{abc}\Phi_{ijk}^{abc} + \cdots,
$$
系数由线性变分法确定：即行列式空间中哈密顿矩阵$H_{IJ} = \langle\Phi_I|\hat H|\Phi_J\rangle$的最低本征值。计入*全部*行列式得到**完全组态相互作用**（full CI, FCI），即给定基组内的精确解；在双激发处截断得**CISD**（不含单激发则为CID）。
:::

CI是线性变分法（[[quantum-chemistry/approximation-methods]]），因此一切截断CI的能量都是FCI能量的上界，而完备基组中的FCI是精确的。于是FCI是评判近似方法的基准——但它几乎从来算不起。$K$个空间轨道中$N$个电子、$M_S = 0$的行列式数为$\binom{K}{N/2}^{2}$：

| 体系 | $K$、$N$ | FCI行列式数 |
|---|---|---|
| $\mathrm{H_2}$，极小基组 | $2$、$2$ | $4$ |
| $6$电子$6$轨道的CAS | $6$、$6$ | $400$ |
| 水，cc-pVDZ，冻结$1s$内层 | $23$、$8$ | $7.8\times10^{7}$ |
| 水，cc-pVDZ，全部电子 | $24$、$10$ | $1.8\times10^{9}$ |
| 苯，cc-pVDZ | $114$、$42$ | $1.9\times10^{45}$ |

并非所有矩阵元都非零。斯莱特-康登规则（[[computational-chemistry/hartree-fock#prop-det-energy]]的推广）表明，$\hat H$只在相差至多两个自旋轨道的行列式之间给出耦合，因为它至多含两电子算符。布里渊定理（[[computational-chemistry/hartree-fock#thm-brillouin]]）进一步说明单激发不与哈特里-福克参考直接耦合。因此对$\Phi_0$的首要修正来自双激发：它们描述成对电子同时离开各自轨道以互相回避。

::: example 极小基组$\mathrm{H_2}$的完全组态相互作用 {#ex-h2-fci}
STO-3G基组、$R = 1.4\ a_0$处的$\mathrm{H_2}$，轨道为$\sigma_g$（占据）与$\sigma_u$（虚）。由对称性，单重态$\Sigma_g^{+}$的行列式只有$\Phi_0 = \lvert\sigma_g\bar\sigma_g\rvert$与双激发$\Phi_2 = \lvert\sigma_u\bar\sigma_u\rvert$。矩阵元为$\langle\Phi_0|\hat H|\Phi_0\rangle = E_\mathrm{HF,el} = -1.8310\ \mathrm{E_h}$，$\langle\Phi_2|\hat H|\Phi_2\rangle = -1.8310 + 2\Delta$，其中$2\Delta = 1.5773\ \mathrm{E_h}$，且$\langle\Phi_0|\hat H|\Phi_2\rangle = K_{gu} = (gu|ug) = 0.1813\ \mathrm{E_h}$。求FCI能量与波函数。
::: solution
以$E_\mathrm{HF}$为起点，$2 \times 2$久期问题为$\begin{pmatrix}0 & K \\ K & 2\Delta\end{pmatrix}$，其下根为
$$
E_\mathrm{corr} = \Delta - \sqrt{\Delta^{2} + K^{2}} = 0.78864 - \sqrt{0.62196 + 0.03285} = -0.02056\ \mathrm{E_h}.
$$
FCI总能量为$-1.1167 - 0.0206 = -1.1373\ \mathrm{E_h}$。本征矢为$\Psi = 0.9936\,\Phi_0 - 0.1127\,\Phi_2$：参考仍然占主导（权重$98.7\ \%$），而$\sigma_u^{2}$的少量掺入使两电子分居键两端的几率比哈特里-福克波函数更大——左右相关。$\mathrm{H_2}$的精确相关能为$-0.0408\ \mathrm{E_h}$；极小基组只捕获其一半，因为两个轨道无法表现库仑空穴。
:::
:::

::: widget plot
f: x - sqrt(x^2 + K^2); -K^2/(2*x)
x: 0.02, 1.5
y: -0.6, 0.02
sliders: K=0.18:0.02:0.4:0.005
labels: \text{精确 } \Delta - \sqrt{\Delta^2 + K^2}; \text{二阶 } -K^2/2\Delta
vlines: 0.789
caption: 与单个双激发行列式以耦合$K$相耦合的参考的相关能（单位$\mathrm{E_h}$）对半能隙$\Delta$作图；竖线标出STO-3G基组中$1.4\ a_0$处的$\mathrm{H_2}$。$\Delta$大时（组态分隔良好，动态相关），二阶微扰理论与精确结果一致。当$\Delta \to 0$——键拉长到$\sigma_g$与$\sigma_u$简并——精确值趋于有限值$-K$，而微扰估计却发散：静态相关令微扰理论失效。
:::

### 大小一致性

截断CI有一个严重缺陷，用两个互不作用的分子最容易看清。

::: definition 大小一致性与大小广延性 {#def-size-consistency}
若方法对无限分离的两个子体系A与B给出$E(\mathrm{A\cdots B}) = E(\mathrm{A}) + E(\mathrm{B})$，则称其具有**大小一致性**（size consistency）。若其能量对均匀体系（如$n$个相同且互不作用的分子构成的链）随粒子数正确（线性）标度，则称具有**大小广延性**（size extensivity）。哈特里-福克（配以适当的参考）、MP$n$、耦合簇与完全组态相互作用具有大小广延性；截断CI（CISD及其同类）没有。
:::

::: example CID不满足大小一致性 {#ex-cid-size}
两个STO-3G的$\mathrm{H_2}$分子无限远离。每一个都是[[#ex-h2-fci]]中的$2 \times 2$问题。比较$2E_\mathrm{corr}(\mathrm{H_2})$与这一对分子的CID相关能。
::: solution
这一对分子的CID包含参考、分子A上的双激发与分子B上的双激发（每个对角能量为$2\Delta$、与参考的耦合为$K$，彼此之间没有耦合）。两分子上的*同时*双激发是复合体系的四激发，被排除在外。$3 \times 3$矩阵$\begin{pmatrix}0 & K & K \\ K & 2\Delta & 0 \\ K & 0 & 2\Delta\end{pmatrix}$的最低本征值为
$$
E_\mathrm{CID} = \Delta - \sqrt{\Delta^{2} + 2K^{2}} = 0.78864 - \sqrt{0.62196 + 0.06571} = -0.04061\ \mathrm{E_h},
$$
而$2E_\mathrm{corr}(\mathrm{H_2}) = -0.04112\ \mathrm{E_h}$。仅仅两个分子，CID就错了$0.51\ \mathrm{mE_h}$（$1.3\ \mathrm{kJ\,mol^{-1}}$），且误差随体系增大：$n$个分子时$E_\mathrm{CID} = \Delta - \sqrt{\Delta^{2} + nK^{2}}$只按$\sqrt{n}$增长，而非按$n$。对大体系，CISD恢复的相关能比例趋于零。缺失的四激发——两个独立双激发的乘积——正是耦合簇理论所要恢复的东西。
:::
:::

常用的经验补丁是**戴维森校正**（Davidson correction），$\Delta E_\mathrm{Q} \approx (1 - c_0^{2})E_\mathrm{corr}^\mathrm{CISD}$，用CISD波函数中参考的权重来估计四激发的效应。这是经验法则而非推导，但它能消除多参考CI大小一致性误差的大部分。

## 米-普（Møller–Plesset）微扰理论

当参考良好时，微扰理论（[[quantum-chemistry/approximation-methods]]）是CI的自然替代。关键的技巧，归功于米（Møller）与普莱塞特（Plesset）（1934），在于零级哈密顿量的选取。

::: proposition 米-普分割 {#prop-mp-partition}
取$\hat H^{(0)} = \sum_i\hat f(i)$，即福克算符之和，并令$\hat V = \hat H - \hat H^{(0)}$（**涨落势**：真实电子-电子排斥减去其哈特里-福克平均）。则由正则HF轨道构成的任一行列式都是$\hat H^{(0)}$的本征函数，本征值等于其占据轨道能量之和，且
$$
E^{(0)} + E^{(1)} = E_\mathrm{HF} .
$$
因此哈特里-福克能量的第一个修正出现在二阶。
:::

::: proof
由$\hat f\chi_p = \varepsilon_p\chi_p$以及行列式是反对称化乘积这一事实，$\sum_i\hat f(i)$作用于任何由正则轨道构成的行列式，给出$\sum_{p\,\in\,\text{占据}}\varepsilon_p$乘以该行列式。对参考，$E^{(0)} = \sum_i\varepsilon_i$。一阶能量为$E^{(1)} = \langle\Phi_0|\hat V|\Phi_0\rangle = \langle\Phi_0|\hat H|\Phi_0\rangle - \sum_i\varepsilon_i = E_\mathrm{HF} - \sum_i\varepsilon_i$，其中用到[[computational-chemistry/hartree-fock#prop-hf-equations]]。两者之和为$E_\mathrm{HF}$。
:::

::: proposition MP2能量 {#prop-mp2}
二阶米-普关联能为
$$
E^{(2)}_\mathrm{MP2} = \sum_{i<j}\sum_{a<b}\frac{\left\lvert\langle ij\|ab\rangle\right\rvert^{2}}{\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b},
$$
其中$\langle ij\|ab\rangle = \langle ij|ab\rangle - \langle ij|ba\rangle$为自旋轨道的反对称化双电子积分（物理学家记号，$\langle ij|ab\rangle = (ia|jb)$）。对采用空间轨道的闭壳层分子，
$$
E^{(2)}_\mathrm{MP2} = \sum_{ij}^{\mathrm{occ}}\sum_{ab}^{\mathrm{virt}}\frac{(ia|jb)\left[2(ia|jb) - (ib|ja)\right]}{\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b} .
$$
每一项皆为负，故$E^{(2)} < 0$。
:::

::: proof
二阶瑞利-薛定谔微扰理论给出$E^{(2)} = \sum_{I \neq 0}\lvert\langle\Phi_I|\hat V|\Phi_0\rangle\rvert^{2}/(E_0^{(0)} - E_I^{(0)})$。因为$\hat H^{(0)}$在行列式基下是对角的，对$I \neq 0$有$\langle\Phi_I|\hat V|\Phi_0\rangle = \langle\Phi_I|\hat H|\Phi_0\rangle$。单激发由布里渊定理为零；三激发及以上由斯莱特-康登规则为零。对双激发$\Phi_{ij}^{ab}$，矩阵元为$\langle ab\|ij\rangle$，分母为$E_0^{(0)} - E_{ij}^{ab(0)} = \varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b$。对闭壳层按自旋情形求和即得空间轨道形式。每个分母为负（占据轨道能量低于虚轨道），每个分子非负。
:::

::: example 极小基组$\mathrm{H_2}$的MP2 {#ex-h2-mp2}
已知$\varepsilon_g = -0.5782\ \mathrm{E_h}$、$\varepsilon_u = +0.6703\ \mathrm{E_h}$、$(gu|gu) = K_{gu} = 0.1813\ \mathrm{E_h}$，计算$E^{(2)}$并与FCI相关能比较。
::: solution
只有一个占据与一个虚空间轨道，闭壳层公式只剩单项$i = j = g$、$a = b = u$：
$$
E^{(2)} = \frac{K_{gu}\left(2K_{gu} - K_{gu}\right)}{2\varepsilon_g - 2\varepsilon_u} = \frac{K_{gu}^{2}}{2(\varepsilon_g - \varepsilon_u)} = \frac{(0.18126)^{2}}{2(-1.24847)} = -0.01316\ \mathrm{E_h}.
$$
在此基组中MP2恢复了FCI相关能（$-0.02056\ \mathrm{E_h}$）的$64\ \%$。之所以低估，是因为其分母$2(\varepsilon_u - \varepsilon_g) = 2.497\ \mathrm{E_h}$是*轨道*能量之差，大于[[#ex-h2-fci]]中真实的激发能$2\Delta = 1.577\ \mathrm{E_h}$；在更大的基组中，MP2通常恢复动态相关能的$90$–$95\ \%$，有时还略有过头。
:::
:::

MP2是最廉价的关联方法：在$K^{5}$量级的积分变换到分子轨道基之后，对$o$个占据与$v$个虚轨道，求和约需$o^{2}v^{2}$次运算。配上密度拟合（"RI"近似），对上百个原子的分子做MP2已是常规。它具有大小广延性，能捕获色散（尽管对$\pi$堆积体系常高估），给出的几何也不错。更高阶（MP3、MP4）更贵，且级数不保证收敛；对许多分子，级数振荡或发散，所以提高MP阶数并非通往精度的系统途径。自旋分量缩放MP2（SCS-MP2）用经验因子（$1.2$与$1/3$）分别缩放反平行自旋与平行自旋部分，不增加费用就能改善反应能。

::: warning 微扰理论不是变分的，并在近简并处失效 {#warn-mp2}
MP2能量*不是*上界：没有任何东西阻止$E_\mathrm{HF} + E^{(2)}$掉到精确能量之下。当占据-虚轨道之间的间隙变小——键拉长时正是如此——[[#prop-mp2]]中的分母随之缩小，修正急剧膨胀。STO-3G的$\mathrm{H_2}$在$R = 10\ a_0$处，RHF给出$-0.5960\ \mathrm{E_h}$，$E^{(2)} = -0.5682\ \mathrm{E_h}$，于是MP2预言$-1.1642\ \mathrm{E_h}$——远*低于*两个分离氢原子的精确值$-0.9332\ \mathrm{E_h}$。信任微扰理论之前，务必先检查参考是否胜任；诊断量如CCSD或CASSCF波函数中参考的权重、或很小的HOMO–LUMO间隙，都是警告信号。
:::

## 耦合簇理论

耦合簇（coupled-cluster, CC）理论把波函数写成一个*指数*，从而解决了CI的大小一致性问题。

::: definition 耦合簇波函数 {#def-cc}
**耦合簇**波函数为
$$
\Psi_\mathrm{CC} = e^{\hat T}\Phi_0, \qquad \hat T = \hat T_1 + \hat T_2 + \hat T_3 + \cdots,
$$
其中$\hat T_1\Phi_0 = \sum_{ia}t_i^{a}\Phi_i^{a}$与$\hat T_2\Phi_0 = \sum_{i<j,\,a<b}t_{ij}^{ab}\Phi_{ij}^{ab}$以**振幅**$t$分别生成单激发与双激发。截断为$\hat T = \hat T_1 + \hat T_2$得**CCSD**。振幅不是由变分求得，而是把薛定谔方程$e^{-\hat T}\hat He^{\hat T}\Phi_0 = E\Phi_0$向激发行列式投影得到；能量为$E_\mathrm{CC} = \langle\Phi_0|e^{-\hat T}\hat He^{\hat T}|\Phi_0\rangle$。
:::

把指数展开，$e^{\hat T_2} = 1 + \hat T_2 + \tfrac{1}{2}\hat T_2^{2} + \cdots$，可见即便CCD也包含四、六及更高激发——但只是双激发的*乘积*，不含新参数。这些"非链接"乘积正是[[#ex-cid-size]]中独立电子对所需要的。对两个互不作用的体系，$\hat T = \hat T_\mathrm{A} + \hat T_\mathrm{B}$且$e^{\hat T} = e^{\hat T_\mathrm{A}}e^{\hat T_\mathrm{B}}$，于是波函数因子化、能量可加：耦合簇理论在任何截断级别都具有大小广延性。由于投影方程不是变分的，CC能量不是严格的上界，但实际上只要参考可靠，它们很少远低于FCI。

对两电子体系，CCSD与FCI完全相同（不存在双激发以上的激发），因此极小基组$\mathrm{H_2}$的CCSD精确重现[[#ex-h2-fci]]。

CCSD恢复了大部分动态相关，但不含三激发，而三激发对反应能的贡献达若干$\mathrm{kJ\,mol^{-1}}$。完全的CCSDT每次迭代费用$o^{3}v^{5}$，几乎算不起。**CCSD(T)**方法（Raghavachari、Trucks、Pople与Head-Gordon，1989）用微扰理论给出三激发的非迭代估计，以收敛的CCSD振幅为输入，一次性费用按$o^{3}v^{4}$标度。配以大基组与CBS外推（[[computational-chemistry/basis-sets#prop-cbs]]），它通常能把单参考小分子的实验原子化能、反应能与势垒高度重现在约$4\ \mathrm{kJ\,mol^{-1}}$之内（"化学精度"），因而赢得了量子化学"金标准"的称号。

| 方法 | 形式标度 | 变分？ | 大小广延？ | 典型用途 |
|---|---|---|---|---|
| HF | $K^{4}$ | 是 | 是 | 参考 |
| MP2 | $K^{5}$ | 否 | 是 | 几何、色散、大分子 |
| CISD | $K^{6}$ | 是 | 否 | 少用，小体系 |
| CCSD | $K^{6}$ | 否 | 是 | 动态相关 |
| CCSD(T) | $K^{7}$ | 否 | 是 | 基准能量 |
| FCI | 指数 | 是 | 是 | 微小体系基准 |

::: example $K^{7}$标度意味着什么？ {#ex-scaling}
某分子的CCSD(T)单点能计算耗时$10$小时。试估计：对大小为其两倍、基组类型相同的分子需要多久；以及在一台快$100$倍的计算机上，同样$10$小时能处理多大的分子。
::: solution
尺寸加倍使$K$加倍，耗时变为$2^{7} = 128$倍：约$1280$小时，即$53$天。在快$100$倍的计算机上，可处理的尺寸也只增大$100^{1/7} = 1.93$倍——不到一倍。正是这残酷的标度，促使人们发展DLPNO-CCSD(T)一类局域相关方法——利用动态相关的短程性实现接近线性的标度——才使几百个原子的分子也能做耦合簇计算，代价是必须控制的阈值。
:::
:::

::: widget plot
f: n*log10(x/10); 5*log10(x/10); 4*log10(x/10)
x: 10, 200
y: -1, 10
sliders: n=7:3:8:1
labels: \log_{10}(t/t_0)\ \text{对应 } K^n; K^5\ (\mathrm{MP2}); K^4\ (\mathrm{HF})
caption: 计算费用的增长：$\log_{10}(t/t_0)$对基函数数$K$作图，以$K = 10$的计算为基准。纵轴每格代表时间$10$倍。$n = 7$（CCSD(T)）时，从$K = 10$到$K = 200$费用增加$10^{9}$倍；$n = 4$（哈特里-福克）只增加$1.6\times10^{5}$倍。调节$n$以比较CCSD（$6$）与CCSDT（$8$）。
:::

::: quiz
单参考CCSD(T)对下列问题最不可靠的是哪一个？
- [ ] 甲烷的原子化能。
- [ ] $\mathrm{H + H_2} \rightarrow \mathrm{H_2 + H}$在过渡态附近的势垒。
- [x] $\mathrm{N_2}$在平衡键长三倍处的势能曲线。
- [ ] 水二聚体的结合能。
::: solution
大距离下，$\mathrm{N_2}$三键的六个电子接近简并（静态相关），RHF参考在定性上是错的，微扰的三激发修正甚至会使曲线非物理地翻转下坠。甲烷、水二聚体以及近对称的$\mathrm{H_3}$过渡态都能被单个行列式很好地描述（$\mathrm{H_3}$势垒是CCSD(T)处理成功的著名范例）。
:::
:::

## 静态相关与多参考方法

当若干组态接近简并时，波函数必须从一开始就把它们全部包含进来。H$_2$分子在解离处正是如此：$R \to \infty$时，$\sigma_g$与$\sigma_u$变得简并，精确波函数趋于
$$
\Psi \to \frac{1}{\sqrt{2}}\left(\lvert\sigma_g\bar\sigma_g\rvert - \lvert\sigma_u\bar\sigma_u\rvert\right),
$$
两个行列式的等权混合，它消去了RHF行列式中的离子项（[[computational-chemistry/hartree-fock]]），只留下共价的海特勒-伦敦函数。单个行列式——或在其上建立的微扰级数——都达不到这一点。

标准工具是**完全活性空间自洽场**（complete active space self-consistent field, CASSCF）方法：选取一个$m$个轨道容纳$n$个电子的*活性空间*——CAS($n$,$m$)——使其包含近简并的轨道（对一个键，就是它的成键与反键轨道），在其中做完全组态相互作用，并同时优化轨道。CASSCF捕获静态相关，键的解离也正确。它不捕获动态相关，后者随后由多参考微扰理论（CASPT2、NEVPT2）或多参考CI补入。活性空间的选取是该方法之"艺术"：既须包含全部强关联轨道，又不能超过约$18$电子$18$轨道（常规FCI求解器的极限），因为行列式数按组合数增长。密度矩阵重整化群（DMRG）与选择组态相互作用（selected-CI）方法能把可达的活性空间扩展得更大。

::: example 拉长的$\mathrm{H_2}$中的静态相关 {#ex-stretched-h2}
STO-3G的$\mathrm{H_2}$在$R = 6.0\ a_0$处，RHF给出$-0.6451\ \mathrm{E_h}$，$2 \times 2$的FCI给出$-0.9334\ \mathrm{E_h}$，MP2给出$E^{(2)} = -0.2530\ \mathrm{E_h}$。比较三者，并说明CASSCF(2,2)为何在此是精确的。
::: solution
此基组下的"相关能"现在达$-0.9334 - (-0.6451) = -0.2883\ \mathrm{E_h}$，是平衡处的十四倍；这几乎全是静态相关。MP2给出$-0.6451 - 0.2530 = -0.8981\ \mathrm{E_h}$，仍偏高$35\ \mathrm{mE_h}$（$92\ \mathrm{kJ\,mol^{-1}}$），$R$再大就会过头并发散（[[#warn-mp2]]）。此距离上的FCI波函数已接近上面写出的$50{:}50$混合。CAS(2,2)恰好包含$\sigma_g$、$\sigma_u$两个轨道与两个电子——在极小基组下这就是整个问题——所以与FCI重合。在更大的基组中，CASSCF(2,2)能给出解离曲线的正确形状，但会缺失动态相关，后者由CASPT2补上。
:::
:::

## 方法的选择

对平衡几何附近的闭壳层分子，实用小结如下：

1. **几何与频率**：带色散校正的DFT（[[computational-chemistry/density-functional-theory]]），或配三ζ基组的MP2。
2. **反应能与构象能**：在DFT几何上做CCSD(T)单点，配CBS外推或F12方法；更大体系用DLPNO-CCSD(T)。
3. **弱相互作用**：以CCSD(T)/CBS为基准；日常工作用带色散校正的DFT或SCS-MP2。
4. **断键、双自由基、多组态特征明显的激发态、许多过渡金属问题**：CASSCF后再做CASPT2或NEVPT2，或MRCI；先检查单参考诊断量。

层级HF $\to$ MP2 $\to$ CCSD $\to$ CCSD(T) $\to$ CCSDT $\to \cdots \to$ FCI，配上基组层级cc-pVDZ $\to$ cc-pVTZ $\to \cdots$，构成一张向精确答案系统收敛的二维图。这种系统性可改进性，正是与泛函没有保证收敛之阶梯的密度泛函理论相比，波函数方法的最大优点。

## 后续内容

密度泛函理论（[[computational-chemistry/density-functional-theory]]）取道另一条通往相关的路：不展开波函数，而把交换关联能建模为密度的泛函，费用只有一次哈特里-福克计算。双重杂化泛函从其关联能中借用了一部分[[#prop-mp2]]的MP2表达式。CCSD(T)能量是拟合力场（[[computational-chemistry/molecular-mechanics]]）与机器学习势的参考数据，其精确势垒又为过渡态理论提供输入（[[kinetics/transition-state-theory]]）。

::: history
休勒拉斯（Egil Hylleraas）1929年证明，在氦的波函数中引入$r_{12}$便能补回轨道乘积错失的能量；维格纳（Eugene Wigner，1934）为电子气引入了相关能一词；勒维丁（Per-Olov Löwdin）在1959年的综述中给出了现代定义。米（Christian Møller）与普莱塞特（Milton Plesset）1934年发表了他们的微扰分割，但一直少有人用，直到1970年代波普（John Pople）、巴特利特（Rodney Bartlett）与合作者使MP2与MP4变得实用。组态相互作用是1960与1970年代占主导的关联方法。耦合簇理论来自核物理——科斯特（Fritz Coester）与屈默尔（Hermann Kümmel）1958–60年的工作——奇热克（Jiří Čížek）于1966年将其引入化学，并经帕尔杜斯（Josef Paldus）发展；珀维斯（George Purvis）与巴特利特1982年实现了CCSD，拉加瓦查里（Krishnan Raghavachari）、特拉克斯（Gary Trucks）、波普与黑德-戈登（Martin Head-Gordon）于1989年提出CCSD(T)。鲁斯（Björn Roos）与合作者于1980年提出CASSCF，1990年提出CASPT2。
:::

::: summary
- 相关能$E_\mathrm{exact} - E_\mathrm{HF}$约为每对电子$-0.04\ \mathrm{E_h}$；其变化支配键能、势垒与色散。
- CI把波函数按激发行列式展开，是变分的；完全CI在基组内精确，但行列式数按组合数增长。由于布里渊定理，双激发占主导。
- 截断CI不具大小一致性：两个分离STO-3G $\mathrm{H_2}$分子的CID少了$0.51\ \mathrm{mE_h}$，而大体系中恢复的比例趋于零。
- 米-普理论取$\hat H^{(0)} = \sum\hat f$；$E_\mathrm{MP2} = \sum\lvert\langle ij\|ab\rangle\rvert^{2}/(\varepsilon_i + \varepsilon_j - \varepsilon_a - \varepsilon_b)$廉价（$K^{5}$）且大小广延，但非变分，且在间隙变小时发散。
- 耦合簇理论$\Psi = e^{\hat T}\Phi_0$在任何截断下都具有大小广延性；CCSD(T)以大基组在$K^{7}$费用下达到单参考分子约$4\ \mathrm{kJ\,mol^{-1}}$的精度。
- 静态相关（近简并、断键）需要CASSCF一类多参考方法，动态相关再由CASPT2或NEVPT2补入。
- 波函数方法在方法与基组两方面都构成可系统改进的层级。
:::

## 习题

::: exercise 氦的相关能 {level=1 check="-1.144"}
氦的精确非相对论能量为$-2.90372\ \mathrm{E_h}$，哈特里-福克极限为$-2.86168\ \mathrm{E_h}$。以电子伏给出相关能。（以$\mathrm{eV}$为单位、保留四位有效数字输入。）
::: solution
$E_\mathrm{corr} = -2.90372 + 2.86168 = -0.04204\ \mathrm{E_h} = -0.04204 \times 27.2114\ \mathrm{eV} = -1.144\ \mathrm{eV}$。
:::
:::

::: exercise 一个活性空间 {level=1 check="400"}
CAS(6,6)活性空间（六个电子在六个空间轨道中）有多少个$M_S = 0$的行列式？（输入数目。）
::: solution
六个$\alpha$电子在六个轨道中：$\binom{6}{3} = 20$种；$\beta$同理。总数$20^{2} = 400$。CAS(14,14)有$\binom{14}{7}^{2} = 3432^{2} \approx 1.18\times10^{7}$个，CAS(18,18)约$2.4\times10^{9}$个——这是常规求解器的实用极限。
:::
:::

::: exercise 标度 {level=1 check="1280"}
同一分子上，MP2计算耗时$5$分钟，CCSD(T)计算耗时$10$小时。假定形式标度（$K^{5}$与$K^{7}$），对大小为其两倍的分子，CCSD(T)计算需要多少小时？（以小时为单位输入时间。）
::: solution
$10\ \mathrm{h} \times 2^{7} = 1280\ \mathrm{h}$。MP2计算则耗时$5 \times 2^{5} = 160$分钟。尺寸每加倍，两法的差距就拉大$2^{2} = 4$倍。
:::
:::

::: exercise 双组态问题 {level=2 check="-0.0206"}
闭壳层参考与一个能量高$2\Delta = 1.5773\ \mathrm{E_h}$的双激发行列式以矩阵元$K = 0.1813\ \mathrm{E_h}$相耦合。由$2 \times 2$久期问题求相关能。（以$\mathrm{E_h}$为单位、保留三位有效数字输入。）
::: solution
$E_\mathrm{corr} = \Delta - \sqrt{\Delta^{2} + K^{2}} = 0.78865 - \sqrt{0.62197 + 0.03287} = 0.78865 - 0.80922 = -0.0206\ \mathrm{E_h}$（[[#ex-h2-fci]]）。
:::
:::

::: exercise 由轨道能量算MP2 {level=2 check="-0.0132"}
极小基组$\mathrm{H_2}$中，$\varepsilon_g = -0.5782$、$\varepsilon_u = 0.6703$、$K_{gu} = 0.1813\ \mathrm{E_h}$。计算$E^{(2)} = K_{gu}^{2}/2(\varepsilon_g - \varepsilon_u)$。（以$\mathrm{E_h}$为单位、保留三位有效数字输入。）
::: solution
$E^{(2)} = 0.03287/(2 \times -1.2485) = -0.0132\ \mathrm{E_h}$，约为此基组中FCI值的$64\ \%$。
:::
:::

::: exercise 大小一致性误差 {level=2 check="1.34"}
用[[#ex-cid-size]]，以$\mathrm{kJ\,mol^{-1}}$表示两个分离STO-3G $\mathrm{H_2}$分子的CID大小一致性误差$E_\mathrm{CID}(\text{对}) - 2E_\mathrm{FCI}(\mathrm{H_2})$，其中$E_\mathrm{CID} = -0.040614$、$2E_\mathrm{FCI} = -0.041123\ \mathrm{E_h}$（相关部分）。（输入误差。）
::: solution
$-0.040614 + 0.041123 = 0.000510\ \mathrm{E_h} \times 2625.5\ \mathrm{kJ\,mol^{-1}} = 1.34\ \mathrm{kJ\,mol^{-1}}$。为正：CID使这一对分子比分离的两个分子*更不稳定*，这是无限远处的两分子之间一种非物理的"相互作用"。
:::
:::

::: exercise 解离处的MP2 {level=3 check="-1.164"}
STO-3G的$\mathrm{H_2}$在$R = 10.0\ a_0$处，RHF能量为$-0.5960\ \mathrm{E_h}$，轨道能量差$\varepsilon_u - \varepsilon_g = 0.1001\ \mathrm{E_h}$，$K_{gu} = 0.3373\ \mathrm{E_h}$。计算MP2总能量，与精确极限$-0.9332\ \mathrm{E_h}$比较，并解释这一结果。（以$\mathrm{E_h}$为单位、保留三位小数输入$E_\mathrm{MP2}$。）
::: solution
$E^{(2)} = -(0.3373)^{2}/(2 \times 0.1001) = -0.1138/0.2002 = -0.5683\ \mathrm{E_h}$，故$E_\mathrm{MP2} = -0.5960 - 0.5683 = -1.164\ \mathrm{E_h}$，比此基组中两个氢原子的精确能量*低*$0.231\ \mathrm{E_h}$。$R \to \infty$时间隙$\varepsilon_u - \varepsilon_g$趋于零而$K_{gu}$趋于常数，所以$E^{(2)}$发散。变分的FCI结果$\Delta - \sqrt{\Delta^{2} + K^{2}}$则平滑地趋于$-K$——本课件中的widget同时显示了这两种行为。
:::
:::

::: exercise 戴维森校正 {level=3 check="-0.0244"}
某分子的CISD计算给出相关能$-0.2500\ \mathrm{E_h}$，参考系数$c_0 = 0.950$。用戴维森公式估计四激发校正，并解释为何分子越大校正越大。（以$\mathrm{E_h}$为单位输入$\Delta E_\mathrm{Q}$。）
::: solution
$\Delta E_\mathrm{Q} = (1 - c_0^{2})E_\mathrm{corr}^\mathrm{CISD} = (1 - 0.9025)(-0.2500) = -0.0244\ \mathrm{E_h}$（$-64\ \mathrm{kJ\,mol^{-1}}$）。对电子对更多的大分子，参考权重$c_0^{2}$变小（在多个独立电子对的极限下趋于零），校正随之增大，正对应CISD不断增大的大小一致性误差。这一公式可以在[[#ex-cid-size]]的独立电子对模型下得到某种论证——其中缺失的非链接四激发的权重量级为$(1 - c_0^{2})$——但它终究是经验估计。
:::
:::

::: exercise 耦合簇的因子化 {level=3}
两个互不作用的体系A与B，$\hat H = \hat H_\mathrm{A} + \hat H_\mathrm{B}$，参考$\Phi_0 = \Phi_\mathrm{A}\Phi_\mathrm{B}$。证明取$\hat T_2 = \hat T_\mathrm{A} + \hat T_\mathrm{B}$时，CCD波函数$e^{\hat T_2}\Phi_0$因子化为$(e^{\hat T_\mathrm{A}}\Phi_\mathrm{A})(e^{\hat T_\mathrm{B}}\Phi_\mathrm{B})$，且能量可加。$e^{\hat T_2}$中是哪一项提供了CID所缺少的同时双激发？
::: solution
$\hat T_\mathrm{A}$与$\hat T_\mathrm{B}$作用于不同的轨道集合且互相对易，所以$e^{\hat T_\mathrm{A} + \hat T_\mathrm{B}} = e^{\hat T_\mathrm{A}}e^{\hat T_\mathrm{B}}$，波函数为乘积。于是$e^{-\hat T}\hat He^{\hat T} = e^{-\hat T_\mathrm{A}}\hat H_\mathrm{A}e^{\hat T_\mathrm{A}} + e^{-\hat T_\mathrm{B}}\hat H_\mathrm{B}e^{\hat T_\mathrm{B}}$，振幅方程与能量表达式都分离，得$E = E_\mathrm{A} + E_\mathrm{B}$，其中每个$E_\mathrm{X}$都是隔离体系的CCD能量。同时双激发来自$\tfrac{1}{2}\hat T_2^{2} = \tfrac{1}{2}(\hat T_\mathrm{A}^{2} + 2\hat T_\mathrm{A}\hat T_\mathrm{B} + \hat T_\mathrm{B}^{2})$中的交叉项$\hat T_\mathrm{A}\hat T_\mathrm{B}$：一个非链接的四激发，振幅为$t_\mathrm{A}t_\mathrm{B}$，由双激发振幅决定，而非新参数。
:::
:::
