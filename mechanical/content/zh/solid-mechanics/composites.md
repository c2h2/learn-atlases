碳纤维增强环氧树脂单层沿纤维方向的刚度与钢相当，横向的刚度则只相当于一种较硬的塑料；它的横向强度只有纵向强度的四十分之一；而它的重量只有钢的五分之一。用在载荷已知的地方——机翼蒙皮、风力机叶片的主梁、沿应力方向缠绕纤维的压力容器、赛车的单壳车身、自行车车架——它能造出单位重量刚度和强度无可匹敌的结构。用得不当，它造出的零件会在脱模时翘曲，受拉时扭转，在远低于预期载荷时内部开裂，或者在层间分离。

所有这些行为都源于一个事实：纤维复合材料是**各向异性**的，而设计者通过选择每一层的方向来选择这种各向异性。本章建立做到这一点所需的力学：由纤维和基体求单层的刚度；单层在其自身主轴和任意其他方向上的应力-应变关系；**经典层合板理论**——把各单层组合成层合板，预测其面内刚度、弯曲刚度以及两者之间的耦合；以及用于预测首层何时失效的**失效准则**。它推广了[[solid-mechanics/linear-elasticity]]中各向同性的胡克定律和[[solid-mechanics/plates]]中基尔霍夫（Kirchhoff）板的运动学假设；材料本身在[[materials-science/material-families]]中介绍。

**约定。** 单层（材料）主轴：1沿纤维方向，2在单层平面内垂直于纤维，3沿厚度方向。层合板坐标轴为$x, y$；铺层角$\theta$从$x$轴逆时针量到纤维方向。全文使用工程切应变$\gamma$。层合板用从一个表面起的铺层顺序描述：$[0/90]_s$表示$0, 90, 90, 0$（s = 对称）。

## 细观力学：由纤维和基体构成的单层

单向单层是由聚合物基体粘结在一起的一束平行纤维（直径约$5$–$20\ \mu\mathrm{m}$），纤维体积分数$V_f$通常为$0.5$–$0.65$，$V_m = 1 - V_f$。

::: proposition 混合律 {#prop-rom}
若纤维和基体都是线弹性的且粘结完好，则
(a) 沿纤维方向，两种组分应变相同（**等应变**，沃伊特（Voigt）模型），
$$
E_1 = E_fV_f + E_mV_m, \qquad \nu_{12} = \nu_fV_f + \nu_mV_m ;
$$
(b) 垂直于纤维方向，把纤维和基体近似看作承受相同应力的串联层（**等应力**，罗伊斯（Reuss）模型），
$$
\frac{1}{E_2} = \frac{V_f}{E_f} + \frac{V_m}{E_m}, \qquad \frac{1}{G_{12}} = \frac{V_f}{G_f} + \frac{V_m}{G_m}.
$$
:::

::: proof
(a) 在沿纤维方向的载荷$P$作用下，平截面保持为平面，所以纤维和基体具有相同的应变$\varepsilon_1$。力相加：$P = \sigma_fA_f + \sigma_mA_m = (E_fV_f + E_mV_m)\,\varepsilon_1A$，所以$E_1 = P/(A\varepsilon_1) = E_fV_f + E_mV_m$。横向收缩是各组分收缩按体积的加权平均，由此得$\nu_{12}$。(b) 在横向应力作用下，串联模型使每一相承受相同的应力$\sigma_2$；变形在单位长度中厚度为$V_f$和$V_m$的两部分上相加，$\varepsilon_2 = \sigma_2(V_f/E_f + V_m/E_m)$，这就是罗伊斯结果；切变模量的推导完全相同。
:::

纵向结果的精度在百分之几以内：它是刚度的**上限（沃伊特界）**，而且沿纤维方向的等应变假设几乎是精确的。横向结果是**下限（罗伊斯界）**，会低估$E_2$和$G_{12}$，因为圆形纤维之间的真实应力场并不是串联的。实际中，横向性能采用半经验公式（例如带有拟合增强参数的哈尔平-蔡（Halpin–Tsai）方程）或对实际单层的试验来确定。

::: example 玻璃纤维/环氧单层 {#ex-rom}
E玻璃纤维（$E_f = 72\ \mathrm{GPa}$，$\nu_f = 0.22$）在环氧树脂（$E_m = 3.5\ \mathrm{GPa}$，$\nu_m = 0.35$）中，$V_f = 0.6$。估算$E_1$、$E_2$和$\nu_{12}$。
::: solution
$$
E_1 = 72(0.6) + 3.5(0.4) = 44.6\ \mathrm{GPa}, \qquad \frac{1}{E_2} = \frac{0.6}{72} + \frac{0.4}{3.5} = 0.1226\ \mathrm{GPa^{-1}}\ \Rightarrow\ E_2 = 8.2\ \mathrm{GPa},
$$
$$
\nu_{12} = 0.22(0.6) + 0.35(0.4) = 0.27 .
$$
合理性检查：$E_1$由纤维主导（其中97 %来自纤维），$E_2$由基体主导：即使纤维占60 %，横向模量也只比树脂的模量大两倍多一点。取常用参数$\xi = 2$的哈尔平-蔡公式给出$E_2 \approx 14.9\ \mathrm{GPa}$；在这一纤维含量下，玻璃纤维/环氧实测的横向模量通常介于这两个估计值之间，这就是设计采用实测单层数据的原因。
:::
:::

## 正交各向异性单层

单向单层有三个相互垂直的对称面：它是**正交各向异性**的。在其自身主轴中，正应力不产生切应变，反之亦然。对处于平面应力状态（$\sigma_3 = \tau_{13} = \tau_{23} = 0$）的薄单层，用四个独立常数描述：$E_1$、$E_2$、$\nu_{12}$和$G_{12}$。

::: definition 单层柔度与折减刚度 {#def-Q}
在单层主轴中，正交各向异性单层的平面应力胡克定律为
$$
\begin{bmatrix}\varepsilon_1\\ \varepsilon_2\\ \gamma_{12}\end{bmatrix} =
\begin{bmatrix} 1/E_1 & -\nu_{21}/E_2 & 0\\ -\nu_{12}/E_1 & 1/E_2 & 0\\ 0 & 0 & 1/G_{12}\end{bmatrix}
\begin{bmatrix}\sigma_1\\ \sigma_2\\ \tau_{12}\end{bmatrix},
\qquad
\begin{bmatrix}\sigma_1\\ \sigma_2\\ \tau_{12}\end{bmatrix} = \mathbf{Q}\begin{bmatrix}\varepsilon_1\\ \varepsilon_2\\ \gamma_{12}\end{bmatrix},
$$
其中$\nu_{12}$是方向1上单位应变引起的方向2上的收缩。柔度矩阵是对称的，由此得到**互等关系**$\nu_{21}/E_2 = \nu_{12}/E_1$。其逆矩阵，即**折减刚度矩阵**，为
$$
Q_{11} = \frac{E_1}{1 - \nu_{12}\nu_{21}}, \quad Q_{22} = \frac{E_2}{1 - \nu_{12}\nu_{21}}, \quad Q_{12} = \frac{\nu_{12}E_2}{1 - \nu_{12}\nu_{21}}, \quad Q_{66} = G_{12}, \quad Q_{16} = Q_{26} = 0 .
$$
:::

柔度矩阵的对称性不是附加的假设：它源于应变能函数的存在，如[[solid-mechanics/energy-methods]]中所述（把贝蒂互等定理应用于单层）。它意味着对刚硬的纤维单层，$\nu_{21}$很小：沿横向拉伸几乎不会使刚硬的纤维缩短。

### 偏轴单层

在层合板中，各单层指向不同方向，所以每一层的本构关系都必须用层合板坐标表示。应力和应变按[[solid-mechanics/stress-strain-3d]]中的转轴公式变换，工程切应变要带因子$\tfrac12$。

::: theorem 转换刚度与偏轴模量 {#thm-qbar}
对铺层角为$\theta$的单层（$c = \cos\theta$，$s = \sin\theta$），层合板坐标中的应力与应变由$\boldsymbol\sigma_{xy} = \bar{\mathbf{Q}}\,\boldsymbol\varepsilon_{xy}$联系，其中
$$
\begin{aligned}
\bar Q_{11} &= Q_{11}c^4 + 2(Q_{12} + 2Q_{66})s^2c^2 + Q_{22}s^4,\\
\bar Q_{22} &= Q_{11}s^4 + 2(Q_{12} + 2Q_{66})s^2c^2 + Q_{22}c^4,\\
\bar Q_{12} &= (Q_{11} + Q_{22} - 4Q_{66})s^2c^2 + Q_{12}(s^4 + c^4),\\
\bar Q_{66} &= (Q_{11} + Q_{22} - 2Q_{12} - 2Q_{66})s^2c^2 + Q_{66}(s^4 + c^4),\\
\bar Q_{16} &= (Q_{11} - Q_{12} - 2Q_{66})sc^3 + (Q_{12} - Q_{22} + 2Q_{66})s^3c,\\
\bar Q_{26} &= (Q_{11} - Q_{12} - 2Q_{66})s^3c + (Q_{12} - Q_{22} + 2Q_{66})sc^3 .
\end{aligned}
$$
铺层角为$\theta$的单层在$x$方向的弹性模量为
$$
\frac{1}{E_x(\theta)} = \frac{c^4}{E_1} + \left(\frac{1}{G_{12}} - \frac{2\nu_{12}}{E_1}\right)s^2c^2 + \frac{s^4}{E_2}.
$$ {#eq-Ex}
:::

::: proof
对单层施加单向应力$\sigma_x$。由变换公式，单层主轴中的应力为$\sigma_1 = \sigma_xc^2$，$\sigma_2 = \sigma_xs^2$，$\tau_{12} = -\sigma_xsc$。单层主轴中的应变由柔度得到：$\varepsilon_1 = \sigma_x(c^2/E_1 - \nu_{12}s^2/E_1)$，$\varepsilon_2 = \sigma_x(s^2/E_2 - \nu_{12}c^2/E_1)$（利用$\nu_{21}/E_2 = \nu_{12}/E_1$），$\gamma_{12} = -\sigma_xsc/G_{12}$。再变换回去：$\varepsilon_x = \varepsilon_1c^2 + \varepsilon_2s^2 - \gamma_{12}sc$，即
$$
\varepsilon_x = \sigma_x\left[\frac{c^4}{E_1} - \frac{2\nu_{12}s^2c^2}{E_1} + \frac{s^4}{E_2} + \frac{s^2c^2}{G_{12}}\right],
$$
而$E_x = \sigma_x/\varepsilon_x$就是[[#eq-Ex]]。$\bar Q_{ij}$用同样的方法求得：写出$\boldsymbol\sigma_{xy} = \mathbf{T}^{-1}\boldsymbol\sigma_{12} = \mathbf{T}^{-1}\mathbf{Q}\boldsymbol\varepsilon_{12}$和$\boldsymbol\varepsilon_{12} = \mathbf{R}\mathbf{T}\mathbf{R}^{-1}\boldsymbol\varepsilon_{xy}$，其中$\mathbf{T}$为应力变换矩阵，$\mathbf{R} = \diag(1, 1, 2)$把张量切应变换算为工程切应变；展开乘积即得所列各式。
:::

$\bar Q_{16}$和$\bar Q_{26}$两项是新出现的：在偏轴单层中，正应力会产生**切应变**。沿$x$拉伸一个$30^\circ$单层，它除了伸长还会剪切——这就是**拉剪耦合**，它使偏轴拉伸试验难以进行，也是层合板设计力求抵消的。

::: widget plot
f: 1/(cos(x*pi/180)^4/E1 + (1/G - 2*0.28/E1)*sin(x*pi/180)^2*cos(x*pi/180)^2 + sin(x*pi/180)^4/E2)
x: 0, 90
y: 0, 200
sliders: E1=181:30:250:1; E2=10.3:3:20:0.1; G=7.17:2:30:0.1
labels: E_x(\theta)\ \text{（GPa）}
caption: 单向单层在与纤维成$\theta$角（度）方向加载时的弹性模量，由[[#eq-Ex]]计算，取$\nu_{12} = 0.28$。初始值是碳纤维/环氧的典型值。模量在最初的$15^\circ$内急剧下降：$10^\circ$的纤维偏斜就损失40 %的刚度。现在把数值设为切变模量较低的类玻璃纤维/环氧单层（$E_1 = 39$，$E_2 = 8.6$，$G = 3$）：曲线在约$46^\circ$以后降到$E_2$**以下**，在$60^\circ$附近有最小值$7.9\ \mathrm{GPa}$——当$1/G_{12}$足够大时，偏轴单层最软的方向不是垂直于纤维，而是某个中间角度，此时它主要靠基体的剪切变形。
:::

::: example 碳纤维/环氧单层的轴向与偏轴刚度 {#ex-ply}
一个碳纤维/环氧单层$E_1 = 181\ \mathrm{GPa}$，$E_2 = 10.3\ \mathrm{GPa}$，$\nu_{12} = 0.28$，$G_{12} = 7.17\ \mathrm{GPa}$（这是标准模量碳纤维/环氧的典型值，见蔡（Tsai）与哈恩（Hahn）的数据表）。求$\nu_{21}$、折减刚度$\mathbf{Q}$，以及单层与载荷成$15^\circ$和$45^\circ$时的模量$E_x$。
::: solution
$\nu_{21} = \nu_{12}E_2/E_1 = 0.28\times10.3/181 = 0.0159$；$1 - \nu_{12}\nu_{21} = 0.99554$。于是
$$
\mathbf{Q} = \begin{bmatrix} 181.8 & 2.90 & 0\\ 2.90 & 10.35 & 0\\ 0 & 0 & 7.17\end{bmatrix}\ \mathrm{GPa}.
$$
由[[#eq-Ex]]，$1/G_{12} - 2\nu_{12}/E_1 = 0.1395 - 0.0031 = 0.1364\ \mathrm{GPa^{-1}}$：
$15^\circ$时（$c^2 = 0.9330$，$s^2 = 0.0670$）：$1/E_x = 0.8705/181 + 0.1364\times0.0625 + 0.00449/10.3 = 0.01377$，$E_x = 72.6\ \mathrm{GPa}$；
$45^\circ$时：$1/E_x = 0.25/181 + 0.1364\times0.25 + 0.25/10.3 = 0.05975$，$E_x = 16.7\ \mathrm{GPa}$。

$15^\circ$的偏斜就损失60 %的轴向刚度，主要贡献来自剪切项——基体的剪切柔度$1/G_{12}$。合理性检查：$E_x(0) = E_1$和$E_x(90^\circ) = E_2$直接由[[#eq-Ex]]得出；而$Q_{11}$只比$E_1$大0.4 %，因为$\nu_{12}\nu_{21}$极小。
:::
:::

## 经典层合板理论

层合板是粘结在一起的一叠单层。经典层合板理论（CLT）把它当作[[solid-mechanics/plates]]意义下的薄板：基尔霍夫假设适用于整个叠层，所以尽管刚度在层与层之间跳变，应变沿厚度仍是线性变化的。

::: theorem ABD关系 {#thm-abd}
设层合板占据$-h/2 \le z \le h/2$，第$k$层位于$z_{k-1}$与$z_k$之间，转换刚度为$\bar{\mathbf{Q}}_k$。记中面应变为$\boldsymbol\varepsilon^0 = (\varepsilon^0_x, \varepsilon^0_y, \gamma^0_{xy})$，曲率为$\boldsymbol\kappa = (\kappa_x, \kappa_y, \kappa_{xy})$，从而$\boldsymbol\varepsilon(z) = \boldsymbol\varepsilon^0 + z\boldsymbol\kappa$，则单位宽度上的内力和内力矩为
$$
\begin{bmatrix}\mathbf{N}\\ \mathbf{M}\end{bmatrix} = \begin{bmatrix}\mathbf{A} & \mathbf{B}\\ \mathbf{B} & \mathbf{D}\end{bmatrix}\begin{bmatrix}\boldsymbol\varepsilon^0\\ \boldsymbol\kappa\end{bmatrix},
$$ {#eq-abd}
其中
$$
\mathbf{A} = \sum_k\bar{\mathbf{Q}}_k(z_k - z_{k-1}), \qquad \mathbf{B} = \frac12\sum_k\bar{\mathbf{Q}}_k(z_k^2 - z_{k-1}^2), \qquad \mathbf{D} = \frac13\sum_k\bar{\mathbf{Q}}_k(z_k^3 - z_{k-1}^3).
$$
$\mathbf{A}$是面内（拉伸）刚度，$\mathbf{D}$是弯曲刚度，$\mathbf{B}$是两者之间的**耦合**刚度。
:::

::: proof
内力为$\mathbf{N} = \int_{-h/2}^{h/2}\boldsymbol\sigma\,dz$，内力矩为$\mathbf{M} = \int_{-h/2}^{h/2}\boldsymbol\sigma\,z\,dz$。在第$k$层内，$\boldsymbol\sigma = \bar{\mathbf{Q}}_k(\boldsymbol\varepsilon^0 + z\boldsymbol\kappa)$，其中$\bar{\mathbf{Q}}_k$为常数，所以
$$
\mathbf{N} = \sum_k\bar{\mathbf{Q}}_k\left[\boldsymbol\varepsilon^0\!\int_{z_{k-1}}^{z_k}\!dz + \boldsymbol\kappa\!\int_{z_{k-1}}^{z_k}\!z\,dz\right], \qquad
\mathbf{M} = \sum_k\bar{\mathbf{Q}}_k\left[\boldsymbol\varepsilon^0\!\int_{z_{k-1}}^{z_k}\!z\,dz + \boldsymbol\kappa\!\int_{z_{k-1}}^{z_k}\!z^2\,dz\right],
$$
积分即得所述各和式。假设：粘结完好（层间无滑移），基尔霍夫运动学（无横向剪切变形，对薄层合板成立），各层处于平面应力状态，线弹性。对均匀各向同性板，$\mathbf{B} = \mathbf{0}$，$\mathbf{D} = \mathbf{Q}h^3/12$，即回到板的弯曲刚度$D$。
:::

$\mathbf{A}$、$\mathbf{B}$和$\mathbf{D}$的结构取决于铺层顺序，而这是设计者可以控制的：

- **对称**层合板（每一层关于中面有镜像层）有$\mathbf{B} = \mathbf{0}$：面内载荷不引起弯曲，反之亦然。由于镜像层的$z_k^2 - z_{k-1}^2$符号相反，它们对$\mathbf{B}$的贡献相互抵消。几乎所有实用层合板都是对称的，因为非对称层合板还会**在固化后冷却时翘曲**——热应变与机械应变一样会耦合成曲率。
- **均衡**层合板（每个$+\theta$层都有一个同厚度的$-\theta$层与之匹配）有$A_{16} = A_{26} = 0$：面内没有拉剪耦合。由于$\bar Q_{16}$和$\bar Q_{26}$是$\theta$的奇函数，它们在$\mathbf{A}$的求和中相互抵消。但在$\mathbf{D}$中，除非$\pm\theta$层对处于镜像位置，它们一般不会抵消，所以均衡对称层合板仍可能有弯扭耦合$D_{16}$、$D_{26}$。
- **准各向同性**层合板，例如$[0/\pm45/90]_s$或$[0/\pm60]_s$，其$\mathbf{A}$矩阵具有各向同性材料的形式：各个方向的面内刚度相等。

对称层合板在面内载荷下的等效工程常数由逆矩阵$\mathbf{a} = \mathbf{A}^{-1}$得到：$E_x = 1/(a_{11}h)$，$\nu_{xy} = -a_{12}/a_{11}$，$G_{xy} = 1/(a_{66}h)$。

::: algorithm 层合板分析 {#alg-clt}
1. 对每一层，由$E_1, E_2, \nu_{12}, G_{12}$计算$\mathbf{Q}$，并计算其铺层角下的$\bar{\mathbf{Q}}_k$。
2. 由铺层顺序和单层厚度求出从中面量起的层间界面坐标$z_k$。
3. 组装$\mathbf{A}$、$\mathbf{B}$、$\mathbf{D}$。
4. 在外加的$\mathbf{N}$、$\mathbf{M}$下求解[[#eq-abd]]，得到$\boldsymbol\varepsilon^0$和$\boldsymbol\kappa$。
5. 对每一层，计算其上、下表面处的应变$\boldsymbol\varepsilon^0 + z\boldsymbol\kappa$，变换到单层主轴，再用$\mathbf{Q}$求出单层应力$\sigma_1, \sigma_2, \tau_{12}$。
6. 对每一层应用失效准则（[[#def-failure]]）。
:::

::: example 正交铺层与角铺层层合板 {#ex-laminates}
用[[#ex-ply]]中的单层，单层厚度$0.125\ \mathrm{mm}$，求(a) $[0/90]_s$、(b) $[\pm45]_s$和(c)准各向同性$[0/\pm45/90]_s$的面内工程常数$E_x$、$\nu_{xy}$、$G_{xy}$。
::: solution
(a) $[0/90]_s$，$h = 0.5\ \mathrm{mm}$。两个$0^\circ$层和两个$90^\circ$层，所以$\mathbf{A}/h$是$\mathbf{Q}$与$\bar{\mathbf{Q}}(90^\circ)$（即交换$Q_{11}$和$Q_{22}$）的平均值：
$$
\frac{\mathbf{A}}{h} = \begin{bmatrix} 96.08 & 2.90 & 0\\ 2.90 & 96.08 & 0\\ 0 & 0 & 7.17\end{bmatrix}\ \mathrm{GPa},
$$
得$E_x = 96.0\ \mathrm{GPa}$，$\nu_{xy} = 0.030$，$G_{xy} = 7.17\ \mathrm{GPa}$。一半纤维沿$x$方向，所以$E_x$约为$E_1$的一半，但剪切刚度只有由基体主导的$G_{12}$。

(b) $[+45/-45/-45/+45]$：$\bar Q_{11}(45^\circ) = \tfrac14(Q_{11} + 2Q_{12} + 4Q_{66} + Q_{22}) = 56.66\ \mathrm{GPa}$，$\bar Q_{12} = 42.32$，$\bar Q_{66} = 46.59\ \mathrm{GPa}$；$\bar Q_{16}$项在$+45$与$-45$之间相互抵消。求逆：$E_x = 25.1\ \mathrm{GPa}$，$\nu_{xy} = 0.75$，$G_{xy} = 46.6\ \mathrm{GPa}$。剪切刚度是正交铺层的六倍半，因为$x$–$y$平面内的剪切就是沿$\pm45^\circ$方向——即沿纤维方向——的拉伸和压缩。这就是扭力盒蒙皮和传动轴采用$\pm45^\circ$铺层的原因。

(c) $[0/45/-45/90]_s$：$E_x = E_y = 69.7\ \mathrm{GPa}$，$\nu_{xy} = 0.296$，$G_{xy} = 26.9\ \mathrm{GPa}$，而且确实有$E_x/[2(1 + \nu_{xy})] = 26.9\ \mathrm{GPa}$，即各向同性关系。合理性检查：准各向同性碳纤维层合板的刚度与铝（$70\ \mathrm{GPa}$）相当，密度约为铝的57 %——除非各层能与载荷方向一致，碳纤维的实际减重优势比单层的$E_1$所暗示的要小。
:::
:::

::: warning 非对称和非均衡层合板会出人意料
双层$[0/90]$层合板有$\mathbf{B} \ne \mathbf{0}$：用上述单层、层厚$0.125\ \mathrm{mm}$，$B_{11} = -B_{22} = -1.34\ \mathrm{kN}$（力的单位：每mm上的$\mathrm{N\,mm}$）。沿$x$拉它，它会卷曲（$\kappa_x \ne 0$）；在$120\ ^\circ\mathrm{C}$固化，它脱模时就成了马鞍形。非均衡层合板（例如$[0/30]_s$）受拉时会剪切，因此拉伸试验时夹持受力不均，用它造的结构会扭转。这两种耦合偶尔会被有意利用（机翼和叶片的气动弹性剪裁），但若是无意中出现，就会造成变形、残余应力和误导性的试验结果。首先检查$\mathbf{B} = \mathbf{0}$和$A_{16} = A_{26} = 0$——并记住，如果制造中某一层铺错了角度或漏铺，**设计**中的对称和均衡就丧失了。
:::

## 单层与层合板的失效

单向单层有五个基本强度：沿纤维方向的拉伸强度$X_t$和压缩强度$X_c$，垂直于纤维方向的$Y_t$和$Y_c$，以及面内剪切强度$S$。它们相差悬殊：对典型的碳纤维/环氧，$X_t \approx 1500\ \mathrm{MPa}$，而$Y_t \approx 40\ \mathrm{MPa}$。失效准则把它们组合起来，用于预测单层主轴中任意复合应力状态$(\sigma_1, \sigma_2, \tau_{12})$下的失效。

::: definition 单层失效准则 {#def-failure}
**最大应力准则：** 当下列任何一项
$$
\sigma_1 = X_t\ (\text{或 } -X_c), \quad \sigma_2 = Y_t\ (\text{或 } -Y_c), \quad \lvert\tau_{12}\rvert = S
$$
达到时单层失效；起控制作用的那一项同时指明了失效模式（纤维、横向基体或剪切）。

**蔡-希尔（Tsai–Hill）准则：** 由希尔（Hill）各向异性屈服准则改造而来的相互作用准则，
$$
\left(\frac{\sigma_1}{X}\right)^2 - \frac{\sigma_1\sigma_2}{X^2} + \left(\frac{\sigma_2}{Y}\right)^2 + \left(\frac{\tau_{12}}{S}\right)^2 = 1,
$$
其中$X$和$Y$根据$\sigma_1$和$\sigma_2$的符号取拉伸强度或压缩强度。

**蔡-吴（Tsai–Wu）准则：** 一个二次张量多项式，其线性项区分拉伸和压缩，
$$
F_1\sigma_1 + F_2\sigma_2 + F_{11}\sigma_1^2 + F_{22}\sigma_2^2 + F_{66}\tau_{12}^2 + 2F_{12}\sigma_1\sigma_2 = 1,
$$
其中$F_1 = \frac{1}{X_t} - \frac{1}{X_c}$，$F_{11} = \frac{1}{X_tX_c}$，$F_2 = \frac{1}{Y_t} - \frac{1}{Y_c}$，$F_{22} = \frac{1}{Y_tY_c}$，$F_{66} = \frac{1}{S^2}$，相互作用项通常估计为$F_{12} = -\tfrac12\sqrt{F_{11}F_{22}}$。

这些都是**经验**准则，是用单向强度和剪切强度拟合的；它们在复合应力下的精度随材料和失效模式而异，国际比较研究（全球失效评估活动，World-Wide Failure Exercises）表明，没有哪一个在所有情况下都可靠。
:::

对与纤维成$\theta$角、受单向应力$\sigma_x$作用的单层，单层主轴中的应力为$\sigma_1 = \sigma_xc^2$，$\sigma_2 = \sigma_xs^2$，$\tau_{12} = -\sigma_xsc$。最大应力准则给出的**偏轴强度**为$X_t/c^2$、$Y_t/s^2$和$S/(sc)$中的最小者，而蔡-希尔准则给出
$$
\frac{1}{\sigma_x^2} = \frac{c^4}{X^2} + \left(\frac{1}{S^2} - \frac{1}{X^2}\right)s^2c^2 + \frac{s^4}{Y^2}.
$$

::: widget plot
f: min(1500/cos(x*pi/180)^2, min(40/sin(x*pi/180)^2, 68/(sin(x*pi/180)*cos(x*pi/180)))); 1/sqrt(cos(x*pi/180)^4/1500^2 + (1/68^2 - 1/1500^2)*sin(x*pi/180)^2*cos(x*pi/180)^2 + sin(x*pi/180)^4/40^2)
x: 0, 90
y: 0, 1600
labels: \text{最大应力}; \text{蔡-希尔}
caption: 单向碳纤维/环氧单层在与纤维成$\theta$角（度）方向加载时的拉伸强度（$X_t = 1500$，$Y_t = 40$，$S = 68\ \mathrm{MPa}$）。最大应力曲线在失效模式改变处有折角——最初几度为纤维断裂，然后是剪切，约$60^\circ$以后是横向拉伸——而蔡-希尔曲线是光滑的，在两种应力相互作用处更低。两者都表明了一个基本事实：在$15^\circ$以内强度就降到$X_t$的五分之一。实际单层的偏轴试验结果一般接近光滑曲线。
:::

::: example 正交铺层层合板的首层失效 {#ex-fpf}
[[#ex-laminates]]中的$[0/90]_s$层合板（$h = 0.5\ \mathrm{mm}$）承受单位宽度上的拉力$N_x$。取强度$X_t = 1500$、$Y_t = 40$、$S = 68\ \mathrm{MPa}$，用最大应力准则求首层失效时的载荷，并指出哪一层以何种方式失效。
::: solution
按[[#alg-clt]]：对$\mathbf{A}$求逆，每单位$N_x$（以$\mathrm{N/mm}$计）得$\varepsilon^0_x = 2.084\times10^{-5}$，$\varepsilon^0_y = -6.28\times10^{-7}$；没有曲率（$\mathbf{B} = 0$），也没有剪切。

$0^\circ$层：每$\mathrm{N/mm}$对应$\sigma_1 = Q_{11}\varepsilon_x + Q_{12}\varepsilon_y = 3.786\ \mathrm{MPa}$，$\sigma_2 = 0.054\ \mathrm{MPa}$。
$90^\circ$层（单层主轴1沿$y$）：每$\mathrm{N/mm}$对应$\sigma_1 = -0.054\ \mathrm{MPa}$，$\sigma_2 = Q_{12}\varepsilon_y + Q_{22}\varepsilon_x = 0.2137\ \mathrm{MPa}$。

最大应力准则：$90^\circ$层在$N_x = 40/0.2137 = 187\ \mathrm{N/mm}$时达到$\sigma_2 = Y_t = 40\ \mathrm{MPa}$；$0^\circ$层要到$1500/3.786 = 396\ \mathrm{N/mm}$才达到$X_t$。首层失效是**$90^\circ$层的横向基体开裂**，发生在$N_x = 187\ \mathrm{N/mm}$——层合板平均应力为$374\ \mathrm{MPa}$。（蔡-希尔准则给出同样的值$187\ \mathrm{N/mm}$，因为这些层中的$\sigma_1$极小。）

合理性检查与解释：开裂的$90^\circ$层不再承受横向载荷，但层合板并未破坏——$0^\circ$层本来就承担了几乎全部$N_x$（其应力是$90^\circ$层的18倍）。最终破坏接近$396\ \mathrm{N/mm}$。首层失效是否可以接受取决于用途：在燃油箱或压力容器中，基体裂纹就是泄漏通道，在疲劳中它们会扩展成分层；设计许用值通常使使用载荷低于首层失效载荷，而固化产生的热残余应力（此处忽略）还会使首层失效载荷进一步降低。
:::
:::

### 分层与自由边

经典层合板理论只预测面内应力。在层合板的自由边——孔边、开口边或试样边缘——各层在载荷下本会产生不同的侧向收缩（它们的$\nu_{xy}$不同），却被粘结迫使一起变形，于是在宽约一个层合板厚度的边界层内产生**层间应力**$\sigma_z$、$\tau_{xz}$、$\tau_{yz}$。它们可能超过树脂较弱的厚度方向强度，引发**分层**——层合板的典型失效形式，冲击也会造成分层，而表面上几乎看不到损伤。分层扩展用[[solid-mechanics/fracture-mechanics]]中的断裂力学分析——用双悬臂梁试验测得的能量释放率——并通过选择铺层顺序来减小自由边处的拉应力（例如把$\pm45^\circ$层放在外侧）。

::: application 用层合板进行设计
实际的复合材料设计遵循以本章为依据的经验规则：采用对称、均衡的层合板；在$0^\circ$、$\pm45^\circ$和$90^\circ$各方向上至少各铺约10 %的层，使任何载荷方向都不由基体主导；避免把太多相同的层叠在一起（同一角度的厚层块更容易开裂和分层）；把$\pm45^\circ$层放在表面以提高损伤容限和抗屈曲能力。许用值来自大量的试样和元件试验，这些试验考虑了环境（湿热条件会降低基体主导的强度）、冲击损伤和分散性；飞机和压力容器的复合材料结构凭借这些试验证据按适用的规章和规范取得审定。
:::

::: history
混合律背后的界限可以追溯到沃尔德马·沃伊特（Woldemar Voigt，1889），他在均匀应变下对刚度取平均，以及安德拉什·罗伊斯（András Reuss，1929），他在均匀应力下对柔度取平均。罗德尼·希尔（Rodney Hill）1948年提出的各向异性金属屈服准则，于1965年由阿齐（V. D. Azzi）和蔡（S. W. Tsai）改造用于纤维复合材料（蔡-希尔准则），蔡（S. W. Tsai）和吴（E. M. Wu）于1971年提出了他们的张量多项式准则。非对称层合板中拉伸与弯曲的耦合由赖斯纳（E. Reissner）和斯塔夫斯基（Y. Stavsky）于1961年分析，派普斯（R. B. Pipes）和帕加诺（N. J. Pagano）于1970年计算了自由边处的层间应力。由聚丙烯腈制成的高强度碳纤维是1960年代初由威廉·瓦特（William Watt）、莱斯利·菲利普斯（Leslie Phillips）和威廉·约翰逊（William Johnson）在范堡罗的皇家飞机研究院（Royal Aircraft Establishment）研制成功的，这使碳纤维复合材料得以实际用于结构。
:::

::: quiz
哪种层合板既没有面内载荷与弯曲之间的耦合，也没有拉剪耦合？
- [ ] $[0/90]$
- [ ] $[0/30]_s$
- [x] $[0/\pm45/90]_s$
- [ ] $[+45/-45]$
::: solution
$[0/\pm45/90]_s$是对称的（$\mathbf{B} = 0$）且均衡的（$A_{16} = A_{26} = 0$）。$[0/90]$和$[+45/-45]$是非对称的（$\mathbf{B} \ne 0$）；$[0/30]_s$对称但不均衡（$A_{16} \ne 0$）。
:::
:::

::: quiz
正交铺层层合板沿其$0^\circ$纤维方向受拉。哪些层首先失效，以何种方式？
- [ ] $0^\circ$层，纤维断裂。
- [x] $90^\circ$层，横向基体开裂。
- [ ] 两者同时，分层。
::: solution
$90^\circ$层承受的层合板应变垂直于其纤维，而其横向强度$Y_t$极低，所以它们首先开裂（[[#ex-fpf]]），载荷远低于$0^\circ$层的纤维断裂载荷。
:::
:::

::: summary
- 单向单层是正交各向异性的：四个面内常数$E_1$、$E_2$、$\nu_{12}$、$G_{12}$，且$\nu_{21}/E_2 = \nu_{12}/E_1$。
- 混合律：$E_1 = E_fV_f + E_mV_m$（准确）；$1/E_2 = V_f/E_f + V_m/E_m$（下限）。
- 偏轴单层：$\bar{\mathbf{Q}}(\theta)$含有拉剪耦合项$\bar Q_{16}$、$\bar Q_{26}$；$E_x(\theta)$随偏斜急剧下降，主要由基体剪切柔度决定。
- 经典层合板理论：$\mathbf{N} = \mathbf{A}\boldsymbol\varepsilon^0 + \mathbf{B}\boldsymbol\kappa$，$\mathbf{M} = \mathbf{B}\boldsymbol\varepsilon^0 + \mathbf{D}\boldsymbol\kappa$。对称$\Rightarrow \mathbf{B} = 0$；均衡$\Rightarrow A_{16} = A_{26} = 0$；准各向同性铺层的$\mathbf{A}$是各向同性的。
- 单层失效：最大应力准则（可识别失效模式），蔡-希尔准则和蔡-吴准则（相互作用型）。首层失效通常是纤维垂直于载荷的那些层的横向开裂；最终破坏由纤维主导。
- 自由边和冲击会引起层间应力和分层，用断裂力学分析。
:::

## 习题

::: exercise 纵向模量 {level=1 check="117"}
$E_f = 230\ \mathrm{GPa}$的碳纤维埋在$E_m = 4\ \mathrm{GPa}$的树脂中，$V_f = 0.5$。估算$E_1$。（以GPa为单位输入。）
::: solution
$E_1 = 230(0.5) + 4(0.5) = 117\ \mathrm{GPa}$。（纤维自身的横向模量远低于$230\ \mathrm{GPa}$，所以用$E_f = 230\ \mathrm{GPa}$代入罗伊斯公式会高估$E_2$。）
:::
:::

::: exercise 互等泊松比 {level=1 check="0.02"}
一个单层$E_1 = 150\ \mathrm{GPa}$，$E_2 = 10\ \mathrm{GPa}$，$\nu_{12} = 0.3$。求$\nu_{21}$。（输入数值。）
::: solution
$\nu_{21} = \nu_{12}E_2/E_1 = 0.3\times10/150 = 0.02$。$10\ \mathrm{MPa}$的横向应力（$\varepsilon_2 = 10^{-3}$）只引起$-2\times10^{-5}$的纤维方向应变。
:::
:::

::: exercise 基体主导应力下的蔡-希尔准则 {level=1 check="40"}
一个$Y_t = 40\ \mathrm{MPa}$、$S = 50\ \mathrm{MPa}$的单层承受$\sigma_2 = 24\ \mathrm{MPa}$、$\sigma_1 = 0$。按蔡-希尔准则，多大的切应力$\tau_{12}$会引起失效？（以MPa为单位输入。）
::: solution
由$(24/40)^2 + (\tau/50)^2 = 1$得$(\tau/50)^2 = 0.64$，$\tau = 40\ \mathrm{MPa}$。最大应力准则会允许$50\ \mathrm{MPa}$：相互作用降低了强度。
:::
:::

::: exercise 45°偏轴强度 {level=2 check="80"}
一个$X_t = 1500$、$Y_t = 40$、$S = 68\ \mathrm{MPa}$的单向单层在与纤维成$45^\circ$的方向上受单向拉伸。用最大应力准则求失效应力及失效模式。（以MPa为单位输入应力。）
::: solution
$45^\circ$时：$\sigma_1 = \sigma_2 = \sigma_x/2$，$\lvert\tau_{12}\rvert = \sigma_x/2$。各极限：$\sigma_x = 2X_t = 3000$，$2Y_t = 80$，$2S = 136\ \mathrm{MPa}$。最小者为$80\ \mathrm{MPa}$：横向拉伸。蔡-希尔准则给出$69\ \mathrm{MPa}$，因为横向应力与切应力相互作用。
:::
:::

::: exercise 正交铺层的A矩阵 {level=2}
对[[#ex-ply]]中的单层，层厚$0.2\ \mathrm{mm}$，计算$[0/90/0]$（三层，对称）的$\mathbf{A}$，并求层合板的$E_x$和$E_y$。它们为什么不同？
::: solution
$h = 0.6\ \mathrm{mm}$；两个$0^\circ$层（$0.4\ \mathrm{mm}$）和一个$90^\circ$层（$0.2\ \mathrm{mm}$）：$A_{11} = 181.81(0.4) + 10.35(0.2) = 74.79\ \mathrm{kN/mm}$，$A_{22} = 10.35(0.4) + 181.81(0.2) = 40.50\ \mathrm{kN/mm}$，$A_{12} = 2.897(0.6) = 1.74\ \mathrm{kN/mm}$，$A_{66} = 7.17(0.6) = 4.30\ \mathrm{kN/mm}$（利用GPa × mm = kN/mm）。于是$E_x = (A_{11} - A_{12}^2/A_{22})/h = (74.79 - 0.075)/0.6 = 124.5\ \mathrm{GPa}$，$E_y = (A_{22} - A_{12}^2/A_{11})/h = (40.50 - 0.040)/0.6 = 67.4\ \mathrm{GPa}$。三分之二的纤维沿$x$方向。
:::
:::

::: exercise 弯曲刚度取决于铺层顺序 {level=2}
用[[#ex-ply]]中的单层、层厚$0.125\ \mathrm{mm}$，比较$[0/90]_s$和$[90/0]_s$的$D_{11}$，并解释结果。两种层合板的$\mathbf{A}$相同吗？
::: solution
$z$坐标：$-0.25, -0.125, 0, 0.125, 0.25\ \mathrm{mm}$。外层的贡献为$\tfrac13\times2\times(0.25^3 - 0.125^3) = 9.115\times10^{-3}\ \mathrm{mm^3}$，内层为$\tfrac13\times2\times0.125^3 = 1.302\times10^{-3}\ \mathrm{mm^3}$。$[0/90]_s$：$D_{11} = 181.81(9.115\times10^{-3}) + 10.35(1.302\times10^{-3}) = 1.671\ \mathrm{kN\,mm}$（$= 1671\ \mathrm{N\,mm}$）。$[90/0]_s$：$D_{11} = 10.35(9.115\times10^{-3}) + 181.81(1.302\times10^{-3}) = 0.331\ \mathrm{kN\,mm}$，只有前者的五分之一。两者的$\mathbf{A}$矩阵完全相同——同样的单层，只是顺序不同——但弯曲刚度按每层到中面距离的平方加权，如同夹层板一样。对于绕$y$轴的弯曲，应把$0^\circ$层放在外侧。
:::
:::

::: exercise 推导偏轴剪切耦合 {level=3}
(a) 对铺层角为$\theta$、受单向$\sigma_x$作用的单层，证明层合板坐标中的切应变为$\gamma_{xy} = \sigma_x\,sc\left[\left(\frac{2}{E_1} + \frac{2\nu_{12}}{E_1} - \frac{1}{G_{12}}\right)c^2 - \left(\frac{2}{E_2} + \frac{2\nu_{12}}{E_1} - \frac{1}{G_{12}}\right)s^2\right]$。(b) 对[[#ex-ply]]中的单层，计算$\theta = 30^\circ$时的比值$\gamma_{xy}/\varepsilon_x$。(c) 解释为什么这种耦合使采用刚性夹头的偏轴拉伸试验给出误导性的模量。
::: solution
(a) 由[[#thm-qbar]]的证明，$\varepsilon_1 = \sigma_x(c^2 - \nu_{12}s^2)/E_1$，$\varepsilon_2 = \sigma_x(s^2/E_2 - \nu_{12}c^2/E_1)$，$\gamma_{12} = -\sigma_xsc/G_{12}$。层合板坐标中的切应变为$\gamma_{xy} = 2sc(\varepsilon_1 - \varepsilon_2) + (c^2 - s^2)\gamma_{12}$。代入并合并$c^2$和$s^2$项（利用$c^2 - s^2$和$c^2 + s^2 = 1$）即得所述表达式。
(b) $30^\circ$时：$c^2 = 0.75$，$s^2 = 0.25$，$sc = 0.4330$。以$\mathrm{GPa^{-1}}$计：$2/E_1 + 2\nu_{12}/E_1 - 1/G_{12} = 0.01105 + 0.00309 - 0.13947 = -0.12533$；$2/E_2 + 2\nu_{12}/E_1 - 1/G_{12} = 0.19417 + 0.00309 - 0.13947 = 0.05779$。所以$\gamma_{xy}/\sigma_x = 0.4330[-0.12533(0.75) - 0.05779(0.25)] = -0.04696\ \mathrm{GPa^{-1}}$，而$\varepsilon_x/\sigma_x = 1/E_x(30^\circ) = 1/28.78 = 0.03475\ \mathrm{GPa^{-1}}$。比值为$\gamma_{xy}/\varepsilon_x = -1.35$：单层的剪切变形比伸长还大。
(c) 刚性夹头阻止剪切，在夹头处引入剪力和弯矩；试样弯成S形，应力不均匀，表观模量偏高。采用长试样或斜加强片夹头可以减小这一影响。
:::
:::

::: exercise 为传动轴选择铺层 {level=3}
要用一根碳纤维/环氧管代替汽车的钢制传动轴。它必须传递扭矩（管壁中的切应力），且一阶弯曲固有频率必须高于最高运转转速，这要求较高的轴向模量。参考[[#ex-laminates]]的结果，提出一种铺层，用CLT估算其轴向模量和切变模量，并讨论其他设计问题：与金属端部接头的连接、薄壁在扭转下的屈曲、冲击损伤以及湿热环境。
::: solution
好的回答会认识到其中的矛盾：扭转需要$\pm45^\circ$层（高$G_{xy}$），临界转速需要$0^\circ$层（高$E_x$，因为固有频率与$\sqrt{E/\rho}$成比例）。采用$[\pm45/0_2/\pm45]$一类对称均衡的铺层，$0^\circ$层约占40–50 %，（用上述单层按CLT计算）可得约100 GPa的$E_x$和25–30 GPa的$G_{xy}$——对比钢的210 GPa和80 GPa，而密度只有钢的五分之一，所以$E/\rho$是钢的两到三倍，一根整体轴就可以代替带中间支承的两段式钢轴。其他问题：少量$90^\circ$（环向）层可抵抗薄壁的扭转屈曲和压溃；与钢制万向节叉的胶接或压装接头通常是最薄弱的部位，必须经过试验；接头处的热膨胀失配；低速冲击（石子）造成难以发现的分层；湿热处理会降低$\pm45^\circ$层所依赖的基体主导的剪切强度；以及反复扭转下的疲劳。设计要通过试样、部件和整车试验来验证。
:::
:::
