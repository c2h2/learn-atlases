把一根钢杆拉伸到超过屈服点，就会发生一种性质上全新的现象。应力几乎不再上升，应变却继续增大到弹性值的十倍甚至一百倍；卸载后杆件不再回复原状，而是保留了永久变形。到目前为止的每一章都假定这种情况不会发生。然而它经常发生，而且很有用——在板料成形和锻造中，在高压管道的自紧中，在每一个延性零件的缺口根部，以及在超载超过弹性极限的钢框架建筑或起重机梁中：它们并不在初始屈服时倒塌，而是重新分配弯矩，直到形成由塑性铰组成的完整机构。按这一最终崩溃载荷并乘以适当的因数进行设计，就是钢结构**塑性设计**的基础。

本章在设计所需的层次上建立金属的塑性理论：判断一般三维应力状态何时引起屈服的**屈服准则**；说明随后塑性应变沿什么方向发展的**流动法则**；随塑性应变累积而改变屈服准则的**硬化**；弹塑性**弯曲与扭转**；以及梁和刚架的**极限分析**，它只需非常少的计算就能求出崩溃载荷。塑性的微观起源——位错的运动——是[[materials-science/dislocations-strengthening]]的主题；这里把材料视为连续体。

**约定。** 拉为正。$\sigma_Y$为拉伸屈服强度，$\tau_Y$为纯剪切屈服强度。主应力按$\sigma_1 \ge \sigma_2 \ge \sigma_3$排序。弯矩以下凸为正；在塑性铰处弯矩的大小为$M_p$。

## 理想化的材料行为

实际的应力-应变曲线有一段弹性直线、一个屈服点（低碳钢有时伴有应力下降）、一段屈服平台或逐渐上升的硬化曲线，最后发生颈缩。在结构计算中，用理想化模型来代替它。

::: definition 理想弹塑性材料 {#def-ideal}
- **理想弹塑性：** $\lvert\sigma\rvert < \sigma_Y$时$\sigma = E\varepsilon$；$\lvert\sigma\rvert = \sigma_Y$时材料在恒定应力下流动；卸载是弹性的，斜率为$E$。
- **刚塑性（理想刚塑性）：** 完全忽略弹性应变；低于$\sigma_Y$时无变形，达到$\sigma_Y$时无限制地流动。用于崩溃载荷和金属成形的估算，那里塑性应变远大于弹性应变。
- **线性硬化：** 屈服后应力以斜率$E_t$（切线模量）上升，$\sigma = \sigma_Y + E_t(\varepsilon - \sigma_Y/E)$。

在每种模型中，总应变都分为弹性部分和塑性部分，$\varepsilon = \varepsilon^e + \varepsilon^p$，且$\sigma = E\varepsilon^e$；卸载时只有$\varepsilon^e$得到恢复。
:::

低碳结构钢有很长的屈服平台（开始硬化之前的应变为屈服应变的10–20倍），在对结构有意义的范围内非常接近理想弹塑性。这就是建立在这一理想化之上的极限分析对钢框架如此有效的原因。

## 屈服准则

在拉伸试验中，屈服始于$\sigma = \sigma_Y$。那么承受弯扭组合的轴，或者$\sigma_r$、$\sigma_\theta$、$\sigma_z$均不为零的厚壁圆筒内孔又如何呢？我们需要一个规则$f(\boldsymbol\sigma) = 0$，即**屈服面**，把弹性状态（$f < 0$）与屈服（$f = 0$）分开。对各向同性材料，它只能依赖于主应力。关于金属的两个实验事实使它进一步简化：屈服**对静水压力不敏感**（布里奇曼（Bridgman）的高压实验表明，叠加量级与屈服应力相当的压力几乎不改变屈服），且拉伸和压缩屈服时的应力大小相同。所以$f$只依赖于[[solid-mechanics/stress-strain-3d]]中的应力**偏量**。

::: definition 特雷斯卡屈服准则与米泽斯屈服准则 {#def-criteria}
**特雷斯卡准则（最大切应力准则）：** 当最大切应力达到拉伸试验屈服时的值时发生屈服，
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_3}{2} = \frac{\sigma_Y}{2}.
$$
**米泽斯准则（最大畸变能准则，或$J_2$准则）：** 当应力偏量的第二不变量达到拉伸试验屈服时的值时发生屈服，
$$
\sigma_{\mathrm{vM}} = \sqrt{3J_2} = \sqrt{\tfrac12\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right]} = \sigma_Y .
$$
用分量表示，$\sigma_{\mathrm{vM}}^2 = \tfrac12\left[(\sigma_x - \sigma_y)^2 + (\sigma_y - \sigma_z)^2 + (\sigma_z - \sigma_x)^2\right] + 3(\tau_{xy}^2 + \tau_{yz}^2 + \tau_{zx}^2)$。
:::

::: proposition 米泽斯准则作为畸变能准则 {#prop-distortion}
对各向同性线弹性材料，单位体积应变能分为体积改变部分和畸变部分，
$$
U_0 = \frac{\sigma_m^2}{2K} + \frac{J_2}{2G}, \qquad \sigma_m = \tfrac13(\sigma_1 + \sigma_2 + \sigma_3),
$$
其中$K$为体积模量，$G$为切变模量。因此米泽斯准则等价于：当畸变能$J_2/2G$达到拉伸试验屈服时的值$\sigma_Y^2/6G$时开始屈服。
:::

::: proof
写出$\sigma_{ij} = \sigma_m\delta_{ij} + s_{ij}$，相应地$\varepsilon_{ij} = \tfrac13e\,\delta_{ij} + e_{ij}$，其中$e$为体积应变，$e_{ij}$为应变偏量。各向同性材料的胡克定律（[[solid-mechanics/linear-elasticity]]）分解为$\sigma_m = Ke$和$s_{ij} = 2Ge_{ij}$。能量密度为$U_0 = \tfrac12\sigma_{ij}\varepsilon_{ij}$；由于$s_{ii} = e_{ii} = 0$，交叉项为零，所以
$$
U_0 = \tfrac12\sigma_m e + \tfrac12s_{ij}e_{ij} = \frac{\sigma_m^2}{2K} + \frac{s_{ij}s_{ij}}{4G} = \frac{\sigma_m^2}{2K} + \frac{J_2}{2G},
$$
其中用到$J_2 = \tfrac12s_{ij}s_{ij}$。在拉伸试验屈服时，$\sigma_1 = \sigma_Y$，$\sigma_2 = \sigma_3 = 0$，$J_2 = \tfrac16[\sigma_Y^2 + 0 + \sigma_Y^2] = \sigma_Y^2/3$。令$J_2$等于$\sigma_Y^2/3$得$3J_2 = \sigma_Y^2$，即米泽斯准则。（等价地，它是关于八面体切应力$\tau_{\mathrm{oct}} = \sqrt{2J_2/3}$的准则。）
:::

两个准则按其构造在单向拉伸时一致，在**纯剪切**（$\sigma_1 = \tau$，$\sigma_2 = 0$，$\sigma_3 = -\tau$）时差别最大：特雷斯卡准则预测$\tau_Y = \sigma_Y/2 = 0.5\sigma_Y$，米泽斯准则预测$\tau_Y = \sigma_Y/\sqrt3 = 0.577\sigma_Y$，高15.5 %。对薄壁管进行的拉扭组合试验（泰勒（Taylor）与奎尼（Quinney），1931）和拉伸-内压组合试验（洛德（Lode），1926）的精细测量表明，大多数延性金属更接近米泽斯准则。特雷斯卡准则仍然很受欢迎，因为它是分段线性的、略偏保守，而且在主应力已知时便于手算。

### 屈服面的几何形状

在主应力空间中，两个准则都是轴线沿$\sigma_1 = \sigma_2 = \sigma_3$方向的柱体——在该方向上无限延伸，因为静水应力不引起屈服。用垂直于该直线的平面（**π平面**）截取，米泽斯准则是一个圆，特雷斯卡准则是内接于该圆的正六边形。在**平面应力**（$\sigma_3 = 0$）情况下，柱体被斜截：米泽斯准则成为椭圆$\sigma_1^2 - \sigma_1\sigma_2 + \sigma_2^2 = \sigma_Y^2$，特雷斯卡准则成为内接于该椭圆的六边形，其顶点在$(\pm\sigma_Y, 0)$、$(0, \pm\sigma_Y)$和$\pm(\sigma_Y, \sigma_Y)$。

::: widget plot
f: (x + sqrt(4 - 3x^2))/2; (x - sqrt(4 - 3x^2))/2; if(abs(x) <= 1, if(x < 0, 1 + x, 1), 0/0); if(abs(x) <= 1, if(x < 0, -1, x - 1), 0/0); -x
x: -1.4, 1.4
y: -1.4, 1.4
equal: true
labels: \text{米泽斯}; \text{米泽斯}; \text{特雷斯卡}; \text{特雷斯卡}; \text{纯剪切 } \sigma_2 = -\sigma_1
caption: $(\sigma_1/\sigma_Y, \sigma_2/\sigma_Y)$平面内的平面应力屈服轨迹；第三主应力为零。曲线内部材料处于弹性状态。两个准则在六边形的六个顶点处相切——单向拉伸或压缩以及等双向拉伸或压缩——而在纯剪切线上差别最大，那里特雷斯卡准则在$\sigma_1 = 0.5\sigma_Y$时屈服，米泽斯准则在$0.577\sigma_Y$时屈服。注意在等双向拉伸（球形压力容器）中，两者都预测在$\sigma_Y$时屈服，而不是更早：切应力所对应的是面外主应力$0$。
:::

::: example 拉扭组合下薄壁管的屈服 {#ex-tube-yield}
一根薄壁钢管（$\sigma_Y = 250\ \mathrm{MPa}$）承受轴向应力$\sigma = 150\ \mathrm{MPa}$和扭转切应力$\tau = 80\ \mathrm{MPa}$。按每个准则求对初始屈服的安全因数。若载荷按比例增大直至屈服，塑性切应变增量与轴向应变增量开始时的比值是多少（米泽斯准则与相关联流动法则，见下文）？
::: solution
主应力为$\sigma_{1,3} = \sigma/2 \pm\sqrt{(\sigma/2)^2 + \tau^2}$，$\sigma_2 = 0$，所以$\sigma_1 - \sigma_3 = \sqrt{\sigma^2 + 4\tau^2}$，由分量公式$\sigma_{\mathrm{vM}} = \sqrt{\sigma^2 + 3\tau^2}$：
$$
\text{特雷斯卡：} \sqrt{150^2 + 4\times80^2} = 219.3\ \mathrm{MPa},\ n = \frac{250}{219.3} = 1.14; \qquad
\text{米泽斯：} \sqrt{150^2 + 3\times80^2} = 204.2\ \mathrm{MPa},\ n = 1.22 .
$$
流动方向：普朗特-罗伊斯（Prandtl–Reuss）法则（见下面的命题）给出与偏量成比例的塑性应变增量，$d\varepsilon^p_x = d\lambda\,s_x = d\lambda\,\tfrac23\sigma$，$d\gamma^p_{xy} = 2\,d\varepsilon^p_{xy} = 2\,d\lambda\,\tau$，所以
$$
\frac{d\gamma^p}{d\varepsilon^p_x} = \frac{3\tau}{\sigma} = \frac{3\times80}{150} = 1.6 .
$$
合理性检查：纯剪切时特雷斯卡准则比米泽斯准则保守15.5 %；这里是拉伸与剪切的组合，差别为$219.3/204.2 = 1.074$，介于单向值（1.0）与纯剪切值（1.155）之间，理应如此。
:::
:::

## 塑性流动与硬化

屈服准则说明塑性流动**何时**开始；**流动法则**说明它**如何**进行。关于金属的两个实验事实指导这一选择：塑性变形（几乎）**不改变体积**，且塑性应变增量的主轴与应力主轴重合。

::: proposition 列维-米泽斯流动法则与普朗特-罗伊斯流动法则 {#prop-flow}
对米泽斯材料，塑性应变增量与应力偏量成比例：
$$
d\varepsilon^p_{ij} = d\lambda\,s_{ij}, \qquad d\lambda \ge 0,
$$
除非应力位于屈服面上并保持在其上，否则$d\lambda = 0$。等价地，$d\boldsymbol\varepsilon^p$**垂直于**屈服面，$d\varepsilon^p_{ij} = d\lambda\,\partial f/\partial\sigma_{ij}$，其中$f = J_2 - k^2$。总应变增量等于由胡克定律得到的弹性增量加上$d\varepsilon^p_{ij}$（普朗特-罗伊斯）；忽略弹性应变时为$d\varepsilon_{ij} = d\lambda\,s_{ij}$（列维-米泽斯（Lévy–Mises））。推论：(i) $d\varepsilon^p_{kk} = 0$（无塑性体积变化）；(ii) 单向拉伸时$d\varepsilon^p_2 = d\varepsilon^p_3 = -\tfrac12d\varepsilon^p_1$——塑性泊松比为$\tfrac12$。
:::

::: proof
流动法则是一个本构假设，其依据是实验和德鲁克（Drucker）稳定性公设，因此能够证明的是它的推论。正交性：$\partial J_2/\partial\sigma_{ij} = s_{ij}$（对$J_2 = \tfrac12s_{kl}s_{kl}$求导并利用$\partial s_{kl}/\partial\sigma_{ij} = \delta_{ik}\delta_{jl} - \tfrac13\delta_{kl}\delta_{ij}$，由于$s_{kk} = 0$，第二项消失）。(i) $d\varepsilon^p_{kk} = d\lambda\,s_{kk} = 0$。(ii) 单向拉伸时$s_1 = \tfrac23\sigma$，$s_2 = s_3 = -\tfrac13\sigma$，所以$d\varepsilon^p_2/d\varepsilon^p_1 = -\tfrac12$。$d\lambda$非负表达了这样一个事实：塑性功$\sigma_{ij}d\varepsilon^p_{ij} = d\lambda\,s_{ij}s_{ij} = 2J_2\,d\lambda$被耗散掉，永远不会恢复。
:::

在持续变形下，大多数金属会**硬化**：继续流动所需的应力升高。有两个简单模型描述屈服面如何变化：

- **各向同性硬化：** 屈服面均匀扩大；当前屈服应力取决于累积等效塑性应变$\bar\varepsilon^p = \int\sqrt{\tfrac23d\varepsilon^p_{ij}d\varepsilon^p_{ij}}$。它预测：预先拉伸到应力$\sigma_1 > \sigma_Y$的杆件，随后在压缩时于$-\sigma_1$屈服。
- **随动硬化：** 屈服面保持大小不变，在应力空间中平移。预先拉伸到$\sigma_1$的杆件在反向加载时于$\sigma_1 - 2\sigma_Y$屈服，即比原来的压缩屈服**更早**。这就是在实际金属中观察到的**包辛格效应**（Bauschinger effect），它对模拟循环加载、棘轮效应和低周疲劳至关重要。

实际金属表现为两者的组合，有限元程序对两者都提供支持。

::: warning 屈服准则要用完整的应力状态——且不要用于脆性材料
有两种常见错误。(1) 只用面内应力校核屈服：在平面应力中第三主应力为零，在特雷斯卡准则中必须把它包括进去（[[solid-mechanics/stress-strain-3d]]）；而在厚截面中，面外应力根本不为零——厚板中的缺口根部接近平面应变，其中$\sigma_3 = \nu(\sigma_1 + \sigma_2)$提高了屈服所需的应力。(2) 把特雷斯卡或米泽斯准则用于脆性材料（铸铁、陶瓷、玻璃、混凝土）或土：它们在最大主应力处破坏，或服从对压力敏感的准则（莫尔-库仑（Mohr–Coulomb）准则、德鲁克-普拉格（Drucker–Prager）准则），且其抗拉强度与抗压强度相差很大。米泽斯准则和特雷斯卡准则适用于延性金属以及屈服对静水压力不敏感的类似材料。
:::

## 弹塑性弯曲

理想弹塑性材料的矩形梁受逐渐增大的弯矩作用。平截面仍保持平面——这是运动学，与材料无关——所以应变沿截面高度线性分布，$\varepsilon = \kappa y$。梁处于弹性时，$\sigma = E\kappa y$。当最外层纤维在曲率$\kappa_Y$处达到$\varepsilon_Y = \sigma_Y/E$时，梁承受**屈服弯矩**$M_Y$。此后，外层纤维在恒定应力$\sigma_Y$下流动，而半高为$y_e = \varepsilon_Y/\kappa$的弹性核逐渐缩小。

::: proposition 矩形截面的弯矩-曲率关系 {#prop-mkappa}
对理想弹塑性材料的矩形截面$b\times h$，
$$
M_Y = \frac{\sigma_Ybh^2}{6}, \qquad M_p = \frac{\sigma_Ybh^2}{4} = 1.5\,M_Y,
$$
对超过初始屈服的曲率，
$$
\frac{M}{M_Y} = \frac32\left[1 - \frac13\left(\frac{\kappa_Y}{\kappa}\right)^2\right], \qquad \kappa \ge \kappa_Y .
$$
当$\kappa \to \infty$时，弯矩渐近地趋于**塑性弯矩**（极限弯矩）$M_p = \sigma_YZ_p$。比值$\alpha = M_p/M_Y = Z_p/Z_e$称为**截面形状系数**；矩形为$1.5$，实心圆为$16/3\pi = 1.70$，轧制工字形截面绕强轴弯曲时约为$1.10$–$1.20$。
:::

::: proof
弹性核为$\lvert y\rvert \le y_e$，其外为塑性区，
$$
M = 2b\left[\int_0^{y_e}\sigma_Y\frac{y}{y_e}\,y\,dy + \int_{y_e}^{h/2}\sigma_Y\,y\,dy\right] = 2b\sigma_Y\left[\frac{y_e^2}{3} + \frac{h^2}{8} - \frac{y_e^2}{2}\right] = \sigma_Yb\left[\frac{h^2}{4} - \frac{y_e^2}{3}\right].
$$
初始屈服时$y_e = h/2$，得$M_Y = \sigma_Ybh^2/6$；当$y_e \to 0$时，$M \to \sigma_Ybh^2/4 = M_p$。由于$y_e = \varepsilon_Y/\kappa$，$h/2 = \varepsilon_Y/\kappa_Y$，有$y_e = (h/2)(\kappa_Y/\kappa)$，代入得$M = \frac{\sigma_Ybh^2}{4}\left[1 - \frac13\left(\frac{\kappa_Y}{\kappa}\right)^2\right] = \frac32M_Y\left[1 - \frac13(\kappa_Y/\kappa)^2\right]$。一般地，全塑性应力分布在**等面积轴**一侧为$+\sigma_Y$，另一侧为$-\sigma_Y$（合力为零），所以$M_p = \sigma_Y(A_1\bar y_1 + A_2\bar y_2) = \sigma_YZ_p$，其中$Z_p$为塑性截面模量。
:::

::: widget plot
f: if(x <= 1, x, 1.5*(1 - 1/(3x^2))); if(x <= 1, x, a*(1 - (a - 1)/(a*x^2)))
x: 0, 6
y: 0, 1.8
sliders: a=1.15:1:1.7:0.01
labels: \text{矩形 } (\alpha = 1.5); \text{形状系数为 } \alpha \text{ 的近似截面}
hlines: 1; 1.5
caption: 理想弹塑性矩形梁（精确解）以及形状系数为$\alpha$（由滑块设定，1.15是工字梁的典型值）的截面的简单插值曲线：弯矩对曲率，两者均除以其初始屈服值。曲线在初始屈服点$(1, 1)$之前是直线，然后弯向塑性弯矩$\alpha M_Y$。曲率仅为$3\kappa_Y$时，矩形截面就已承受$M_p$的96 %：峰值弯矩附近的一小段梁就像一个在恒定弯矩下转动的铰——这就是极限分析中使用的**塑性铰**。
:::

### 残余应力

卸载是弹性的。若把矩形梁弯到$M_p$后释放，弹性卸载就从全塑性的$\pm\sigma_Y$分布中减去$\sigma = M_py/I$——一个在表面达到$\pm1.5\sigma_Y$的线性分布。梁中留下**残余应力**：表面为$\mp0.5\sigma_Y$（加载时受拉之处变为受压），紧邻中性轴两侧为$\pm\sigma_Y$，它们自相平衡，合力和合力矩均为零，同时梁保留一个永久曲率。板料弯曲中的回弹、喷丸强化的益处以及自紧管的强化，都是用这类残余应力来解释的。

### 弹塑性扭转

对半径为$c$、剪切屈服应力为$\tau_Y$的实心圆轴，同样的论证给出屈服扭矩$T_Y = \pi c^3\tau_Y/2$（由$r = c$处的$\tau = Tr/J$得出）和全塑性扭矩
$$
T_p = \int_0^c\tau_Y\,r\,2\pi r\,dr = \frac{2\pi c^3\tau_Y}{3} = \frac43T_Y .
$$
对薄壁管，$T_p/T_Y \to 1$：开始屈服时所有材料的应力已几乎相同，没有储备。形状系数衡量的是初始屈服时中性轴附近有多少材料处于闲置状态。

::: example 矩形杆的弯曲 {#ex-rect}
宽$20\ \mathrm{mm}$、高$60\ \mathrm{mm}$的钢杆（$\sigma_Y = 250\ \mathrm{MPa}$，$E = 200\ \mathrm{GPa}$）绕强轴弯曲。求$M_Y$、$M_p$、弹性核高度为$30\ \mathrm{mm}$时的弯矩，以及从$M_p$卸载后的表面残余应力。
::: solution
$$
M_Y = \frac{250\times20\times60^2}{6} = 3.00\times10^{6}\ \mathrm{N\,mm} = 3.00\ \mathrm{kN\,m}, \qquad M_p = \frac{250\times20\times60^2}{4} = 4.50\ \mathrm{kN\,m}.
$$
弹性核高$30\ \mathrm{mm}$时，$y_e = 15\ \mathrm{mm}$，$\kappa_Y/\kappa = y_e/(h/2) = 0.5$：
$$
M = \frac32\times3.00\times\left(1 - \frac{0.25}{3}\right) = 4.125\ \mathrm{kN\,m},
$$
对应的曲率为$\kappa = 2\kappa_Y = 2\times\frac{\sigma_Y/E}{h/2} = 2\times\frac{1.25\times10^{-3}}{30\ \mathrm{mm}} = 8.33\times10^{-5}\ \mathrm{mm^{-1}}$（曲率半径$12\ \mathrm{m}$）。

从$M_p$卸载：卸去的弹性表面应力为$M_p/Z_e = 4.50\times10^{6}/(20\times60^2/6) = 375\ \mathrm{MPa} = 1.5\sigma_Y$，所以原受拉一侧表面的残余应力为$250 - 375 = -125\ \mathrm{MPa}$。合理性检查：该残余应力的大小低于$\sigma_Y$，所以弹性卸载的假设成立（对无包辛格效应的材料，卸载的反向应力变化须达到$2\sigma_Y$才会反向屈服）。
:::
:::

## 极限分析

考虑一根理想弹塑性材料的超静定梁，载荷逐渐增大。当峰值弯矩达到$M_p$时，该处形成塑性铰——但结构并不崩溃，因为其他支座仍能承受额外载荷。弯矩向应力较低的截面重新分配，直到形成足够多的铰，使结构变成**机构**。此时的载荷就是**崩溃载荷（极限载荷）**。值得注意的是，不必追踪弹塑性加载历史，利用两个定理就可以求出它。

::: theorem 极限分析的界限定理 {#thm-bounds}
对刚（或弹）-理想塑性材料的结构，载荷按因子$\lambda$成比例增大：

**下限（静力）定理。** 若能找到一个弯矩分布，它与载荷$\lambda_s\mathbf{P}$平衡且处处大小不超过$M_p$，则$\lambda_s \le \lambda_c$：结构在该载荷下不会崩溃。

**上限（机动）定理。** 对任一假定的塑性铰机构，令载荷所做的功等于铰中耗散的能量，$\lambda_k\sum P_i\delta_i = \sum M_p\lvert\theta_j\rvert$，所得的载荷因子$\lambda_k$满足$\lambda_k \ge \lambda_c$。

**唯一性。** 若找到一个机构，其弯矩分布处于平衡且处处满足$\lvert M\rvert \le M_p$，则它的载荷因子就是崩溃载荷因子$\lambda_c$。
:::

::: proof
两个界限都由虚功原理（[[solid-mechanics/energy-methods]]）得出。对梁而言，它表述为：对任何与载荷$\mathbf{P}$平衡的弯矩场$M$和任何铰转角为$\theta_j$的协调位移场，$\sum P_i\delta_i = \sum M(x_j)\,\theta_j$（刚性段不做内功）。

设真实崩溃状态的载荷因子为$\lambda_c$，崩溃机构的位移为$\delta^c_i$、铰转角为$\theta^c_j$，弯矩为$M^c$，且在每个铰处$M^c\theta^c_j = M_p\lvert\theta^c_j\rvert$。

上限：对假定机构$(\delta_i, \theta_j)$，用真实崩溃弯矩应用虚功原理：$\lambda_c\sum P_i\delta_i = \sum M^c(x_j)\theta_j \le \sum M_p\lvert\theta_j\rvert = \lambda_k\sum P_i\delta_i$，因为处处$\lvert M^c\rvert \le M_p$。由于$\sum P_i\delta_i > 0$，$\lambda_c \le \lambda_k$。

下限：对安全弯矩场$M^s$（载荷$\lambda_s$）和真实崩溃机构应用虚功原理：$\lambda_s\sum P_i\delta^c_i = \sum M^s(x_j)\theta^c_j \le \sum M_p\lvert\theta^c_j\rvert = \lambda_c\sum P_i\delta^c_i$，所以$\lambda_s \le \lambda_c$。

唯一性：这样的机构既给出$\lambda \ge \lambda_c$（它是机构），又给出$\lambda \le \lambda_c$（它是安全的）。这些定理假定理想塑性、崩溃时位移很小（几何形状不变）、比例加载且无失稳；它们忽略了轴力和剪力对$M_p$的影响。
:::

::: algorithm 用机构法求崩溃载荷 {#alg-mechanism}
1. 确定可能的铰位置：有弯矩约束的支座、集中载荷作用点、杆件交汇的节点，以及分布载荷下剪力为零（弯矩最大）的点。
2. 列出独立机构（梁机构、侧移机构、节点机构）及其组合。
3. 对每个机构给一个小转角$\theta$，计算载荷作用点的位移和铰的转角，由功方程解出$\lambda$。
4. 取最小的$\lambda$作为候选崩溃载荷。
5. 进行静力校核：画出该机构的弯矩图，确认处处$\lvert M\rvert \le M_p$。若校核不通过，则存在$\lambda$更低的机构。
:::

::: example 跨中集中载荷下梁的崩溃载荷 {#ex-beams}
跨度为$L$、塑性弯矩为$M_p$的梁在跨中承受单个集中载荷$P$。求(a)两端简支和(b)两端完全固定时的崩溃载荷。对$L = 4\ \mathrm{m}$、$M_p = 60\ \mathrm{kN\,m}$计算，并把(b)与形成第一个铰时的载荷比较。
::: solution
(a) 简支：跨中一个铰就构成机构。设每半跨转动$\theta$：载荷移动$L\theta/2$，铰转动$2\theta$。功方程：$P\,L\theta/2 = M_p\,2\theta$，所以
$$
P_c = \frac{4M_p}{L} = \frac{4\times60}{4} = 60\ \mathrm{kN}.
$$
该结构是静定的，所以峰值弯矩$PL/4$一达到$M_p$就发生崩溃——结果相同。

(b) 两端固定：需要三个铰，分别在两个支座和跨中。每半跨转动$\theta$，支座铰各转动$\theta$，中间铰转动$2\theta$：
$$
P\frac{L\theta}{2} = M_p(\theta + 2\theta + \theta) = 4M_p\theta \quad\Rightarrow\quad P_c = \frac{8M_p}{L} = \frac{8\times60}{4} = 120\ \mathrm{kN}.
$$
静力校核：弯矩图是自由（简支）弯矩图——峰值$P_cL/4 = 2M_p$——向下平移固端弯矩$M_p$；两端为$-M_p$，跨中为$+M_p$，其间线性变化：从不超过$M_p$。✓ 所以精确地有$P_c = 8M_p/L$。

第一个铰：在弹性阶段，跨中受集中载荷的两端固定梁端部弯矩为$-PL/8$，跨中弯矩为$+PL/8$；两者相等，所以端部铰和跨中铰在$PL/8 = M_p$、即$P = 8M_p/L$时同时形成。在这一特殊情况下没有内力重分布储备；两端固定梁相对于弹性设计（止于$M_Y$）的塑性优势完全来自截面形状系数。比较(a)和(b)：固定两端使崩溃载荷加倍。
:::
:::

::: example 均布载荷下的一端固定一端铰支梁与两端固定梁 {#ex-udl}
求跨度为$L$、塑性弯矩为$M_p$的梁上均布载荷的崩溃集度$w_c$：(a)两端固定；(b)一端固定、另一端简支（一端固定一端铰支梁）。
::: solution
(a) 铰在两端和跨中。每半跨转动$\theta$；跨中挠度为$L\theta/2$，载荷的功为$w\times$（扫过的面积）$= w\cdot\tfrac12L\cdot\tfrac{L\theta}{2} = wL^2\theta/4$。内功为$4M_p\theta$，所以$w_c = 16M_p/L^2$。（静力校核同前：自由弯矩$wL^2/8 = 2M_p$平移$M_p$。✓）

(b) 铰在固定端以及距简支端未知距离$a$处。若靠近简支端的一段转动$\theta$，正弯矩铰处挠度为$a\theta$，另一段（长$L - a$）转动$\phi = a\theta/(L - a)$。功方程：
$$
w\cdot\frac{L\,a\theta}{2} = M_p\phi + M_p(\theta + \phi) = M_p\theta\left(1 + \frac{2a}{L - a}\right) \quad\Rightarrow\quad w = \frac{2M_p}{La}\cdot\frac{L + a}{L - a}.
$$
对每个$a$这都是上限；崩溃载荷是它的最小值。令$dw/da = 0$：$\frac{d}{da}\left[\frac{L + a}{a(L - a)}\right] = 0$给出$a^2 + 2La - L^2 = 0$，$a = (\sqrt2 - 1)L = 0.414L$，于是
$$
w_c = \frac{2\sqrt2}{(\sqrt2 - 1)(2 - \sqrt2)}\frac{M_p}{L^2} = (6 + 4\sqrt2)\frac{M_p}{L^2} = 11.66\frac{M_p}{L^2}.
$$
合理性检查：$11.66$介于简支值$8$与两端固定值$16$之间；猜测$a = L/2$给出$w = 12M_p/L^2$，只比真实值高3 %——上限对误差很宽容，这正是机构法实用的原因。
:::
:::

::: example 门式刚架的崩溃 {#ex-portal}
一个柱脚固定的门式刚架，柱高$4\ \mathrm{m}$，横梁跨度$6\ \mathrm{m}$，所有杆件的塑性弯矩相同，$M_p = 200\ \mathrm{kN\,m}$。左柱顶作用水平载荷$50\lambda\ \mathrm{kN}$，跨中作用竖直载荷$100\lambda\ \mathrm{kN}$。求崩溃载荷因子$\lambda_c$。
::: solution
可能的铰：两个柱脚（A、E）、两个梁柱节点（B、D）和跨中（C）。三个机构（转角$\theta$）：
- **梁机构**（铰B、C、D；转角$\theta$、$2\theta$、$\theta$）：$100\lambda\times3\theta = 4M_p\theta$，$\lambda = 800/300 = 2.67$。
- **侧移机构**（铰A、B、D、E；各为$\theta$）：$50\lambda\times4\theta = 4M_p\theta$，$\lambda = 800/200 = 4.00$。
- **组合机构** = 梁机构 + 侧移机构，B处的铰相互抵消（转角A $\theta$、C $2\theta$、D $2\theta$、E $\theta$）：$50\lambda\times4\theta + 100\lambda\times3\theta = 6M_p\theta$，$\lambda = 1200/500 = 2.40$。

组合机构给出最低值$\lambda = 2.40$（水平载荷$120\ \mathrm{kN}$，竖直载荷$240\ \mathrm{kN}$）。静力校核：令各铰处弯矩按机构的转向等于$\pm M_p$（$M_A = -200$，$M_C = +200$，$M_D = -200$，$M_E = +200\ \mathrm{kN\,m}$，以刚架内侧受拉为正），梁机构的平衡方程$-M_B + 2M_C - M_D = 100\lambda\times3 = 720$给出$M_B = -120\ \mathrm{kN\,m}$，侧移方程$-M_A + M_B - M_D + M_E = 50\lambda\times4 = 480$给出同样的$M_B = -120\ \mathrm{kN\,m}$。由于$\lvert M_B\rvert < M_p$，弯矩场是安全的，由唯一性定理$\lambda_c = 2.40$。
:::
:::

::: application 塑性设计及其局限
钢框架的塑性（极限状态）设计由英国剑桥大学约翰·贝克（John Baker）的研究组开创，并自1950年代起被纳入规范；它确定杆件尺寸，使设计（分项系数放大后的）载荷低于崩溃载荷。对超静定结构，它比弹性设计更能充分利用材料，因为弯矩重分布使每个控制截面都能达到$M_p$。它要求塑性铰确实能够转动：截面必须足够紧凑，在达到$M_p$之前不发生局部屈曲（欧洲规范3（Eurocode 3）的截面分类），杆件必须受到约束以防止弯扭屈曲，且材料必须是延性的。对重复或循环载荷，崩溃不是唯一的问题：若每个循环都产生更多塑性应变，结构可能发生**棘轮**（变形累积）或低周疲劳破坏。梅兰（Melan）的**安定**定理给出了这样的条件：在一些初始屈服之后，形成的残余应力使以后所有循环都保持弹性——若存在任何一个不随时间变化的自平衡残余应力场，它与循环中每个载荷的弹性应力相加后处处不违反屈服条件，则结构是安定的。压力容器规范采用安定极限——通常表示为一次加二次应力的弹性应力幅限制在$2\sigma_Y$以内——正是出于这一原因。
:::

## 全塑性厚壁圆筒

同样的思路也适用于连续体。受内压的厚壁圆筒（[[solid-mechanics/thick-cylinders-discs]]）在$p_Y = \tfrac{\sigma_Y}{2}(1 - a^2/b^2)$（特雷斯卡）时于内孔处初始屈服。随着压强升高，塑性区向外扩展，当它到达外表面时发生崩溃。

::: proposition 厚壁圆筒的崩溃压强 {#prop-cylinder}
对刚-或弹-理想塑性特雷斯卡材料的圆筒$a \le r \le b$（$\sigma_z$为中间主应力），使整个筒壁进入塑性的内压为
$$
p_c = \sigma_Y\ln\frac ba .
$$
:::

::: proof
在塑性区内，$\sigma_\theta > \sigma_z > \sigma_r$，特雷斯卡准则要求$\sigma_\theta - \sigma_r = \sigma_Y$。于是径向平衡方程$d\sigma_r/dr = (\sigma_\theta - \sigma_r)/r$给出$d\sigma_r/dr = \sigma_Y/r$，所以$\sigma_r = \sigma_Y\ln r + C$。当塑性区到达$r = b$时，条件$\sigma_r(b) = 0$给出$\sigma_r = \sigma_Y\ln(r/b)$，而$\sigma_r(a) = -p$给出$p_c = \sigma_Y\ln(b/a)$。与初始屈服压强不同，它随$b/a$的增大而无界地增长——按对数增长。
:::

对$b/a = 2$：$p_c = 0.693\sigma_Y$，而初始屈服为$0.375\sigma_Y$，储备系数为1.85。把管子加压到这一范围的中间某处再卸载，内孔处就留下环向残余压应力——这就是**自紧**。

::: history
亨利·特雷斯卡（Henri Tresca）自1864年起向法国科学院报告了金属在高压下流动的实验，由此得出最大切应力准则；圣维南（Barré de Saint-Venant，1870）和莫里斯·列维（Maurice Lévy，1871）写出了最早的塑性流动方程。畸变能准则由马克西米利安·胡贝尔（Maksymilian Huber）于1904年提出，理查德·冯·米泽斯（Richard von Mises）于1913年独立提出。加博尔·卡津齐（Gábor Kazinczy）1914年对两端固定钢梁的试验表明崩溃需要若干个塑性铰，这是极限分析的奠基性观察。洛德（W. Lode，1926）以及泰勒（G. I. Taylor）与奎尼（H. Quinney，1931）在薄壁管上进行了组合应力试验，区分了两个准则并支持了流动法则；路德维希·普朗特（Ludwig Prandtl，1924）和罗伊斯（A. Reuss，1930）在流动法则中加入了弹性应变。恩斯特·梅兰（Ernst Melan）于1938年证明了安定定理，德鲁克（D. C. Drucker）、普拉格（W. Prager）和格林伯格（H. J. Greenberg）于1952年给出了界限定理的一般证明。
:::

::: quiz
某材料服从米泽斯准则，纯剪切时在$\tau_Y$屈服。$\tau_Y/\sigma_Y$是多少？
- [ ] $0.5$
- [x] $1/\sqrt3 \approx 0.577$
- [ ] $1$
::: solution
纯剪切时主应力为$\tau, 0, -\tau$，所以$\sigma_{\mathrm{vM}} = \sqrt{\tfrac12(\tau^2 + \tau^2 + 4\tau^2)} = \sqrt3\tau$。屈服时$\sqrt3\tau_Y = \sigma_Y$。特雷斯卡准则给出$0.5$。
:::
:::

::: quiz
两端固定梁在跨中受集中载荷。弹性阶段端部弯矩为$PL/8$，跨中弯矩为$PL/8$。崩溃载荷是多少？
- [ ] $4M_p/L$
- [ ] $6M_p/L$
- [x] $8M_p/L$
- [ ] $16M_p/L$
::: solution
三个铰（两端和跨中），转角为$\theta$、$2\theta$、$\theta$；功方程$P(L/2)\theta = 4M_p\theta$，$P_c = 8M_p/L$。$4M_p/L$是简支梁的值；$16M_p/L^2$是两端固定梁在均布载荷下的值（单位长度上的力）。
:::
:::

::: summary
- 金属的屈服与静水应力无关，拉伸和压缩屈服相同；屈服准则依赖于应力偏量。
- 特雷斯卡：$\sigma_1 - \sigma_3 = \sigma_Y$。米泽斯：$\sqrt{3J_2} = \sigma_Y$，即畸变能准则。两者在纯剪切时差别最大（0.5对$0.577\sigma_Y$）。
- 流动法则：$d\varepsilon^p_{ij} = d\lambda\,s_{ij}$——垂直于屈服面，体积不变。硬化可以是各向同性的、随动的（包辛格效应）或两者兼有。
- 弯曲：$M_p = \sigma_YZ_p$；截面形状系数$Z_p/Z_e$对矩形为1.5，对工字形截面约为1.1–1.2。卸载后留下残余应力。实心轴扭转：$T_p = \tfrac43T_Y$。
- 极限分析：任何安全的平衡弯矩场给出下限，任何机构给出上限；两者同时满足时相等。
- 崩溃载荷（跨度$L$）：简支、跨中$P$：$4M_p/L$；两端固定、跨中$P$：$8M_p/L$；两端固定、均布载荷：$16M_p/L^2$；一端固定一端铰支、均布载荷：$11.66M_p/L^2$。
- 厚壁圆筒（特雷斯卡）：在$p_c = \sigma_Y\ln(b/a)$时全塑性；在$\tfrac{\sigma_Y}{2}(1 - a^2/b^2)$时初始屈服。
:::

## 习题

::: exercise 杆的塑性弯矩 {level=1 check="4.5"}
求宽$20\ \mathrm{mm}$、高$60\ \mathrm{mm}$、$\sigma_Y = 250\ \mathrm{MPa}$的矩形杆绕强轴弯曲时的塑性弯矩。（以kN m为单位输入$M_p$。）
::: solution
$M_p = \sigma_Ybh^2/4 = 250\times20\times3600/4 = 4.5\times10^{6}\ \mathrm{N\,mm} = 4.5\ \mathrm{kN\,m}$。
:::
:::

::: exercise 米泽斯应力 {level=1 check="100"}
轴表面某点的弯曲应力为$50\ \mathrm{MPa}$，扭转切应力为$50\ \mathrm{MPa}$。求米泽斯等效应力。（以MPa为单位输入。）
::: solution
$\sigma_{\mathrm{vM}} = \sqrt{\sigma^2 + 3\tau^2} = \sqrt{2500 + 7500} = 100\ \mathrm{MPa}$。（特雷斯卡等效应力：$\sqrt{\sigma^2 + 4\tau^2} = 111.8\ \mathrm{MPa}$。）
:::
:::

::: exercise 两端固定梁的崩溃 {level=1 check="120"}
两端固定的梁跨度$4\ \mathrm{m}$，塑性弯矩$60\ \mathrm{kN\,m}$，跨中承受单个集中载荷。求崩溃载荷。（以kN为单位输入。）
::: solution
$P_c = 8M_p/L = 8\times60/4 = 120\ \mathrm{kN}$（[[#ex-beams]]）。
:::
:::

::: exercise 工字形截面的塑性弯矩 {level=2 check="461"}
焊接工字形截面的翼缘为$200\times20\ \mathrm{mm}$，腹板为$360\times10\ \mathrm{mm}$（总高$400\ \mathrm{mm}$），钢材$\sigma_Y = 250\ \mathrm{MPa}$。求绕强轴的$M_p$和截面形状系数。（以kN m为单位输入$M_p$。）
::: solution
等面积轴就是对称轴。$Z_p = 2\left[200\times20\times190 + 10\times180\times90\right] = 2(760\,000 + 162\,000) = 1.844\times10^{6}\ \mathrm{mm^3}$，所以$M_p = 250\times1.844\times10^{6} = 4.61\times10^{8}\ \mathrm{N\,mm} = 461\ \mathrm{kN\,m}$。弹性：$I = (200\times400^3 - 190\times360^3)/12 = 3.279\times10^{8}\ \mathrm{mm^4}$，$Z_e = I/200 = 1.640\times10^{6}\ \mathrm{mm^3}$；形状系数$1.844/1.640 = 1.12$。
:::
:::

::: exercise 全塑性后的残余应力 {level=2 check="125"}
$\sigma_Y = 250\ \mathrm{MPa}$的钢制矩形梁被弯到全塑性弯矩，然后弹性卸载。求表面残余应力的大小。（以MPa为单位输入。）
::: solution
表面处的弹性卸载应力为$M_p/Z_e = 1.5\sigma_Y = 375\ \mathrm{MPa}$，所以残余应力为$\lvert\sigma_Y - 1.5\sigma_Y\rvert = 0.5\sigma_Y = 125\ \mathrm{MPa}$（在原受拉一侧为压应力）。中性轴附近的残余应力为$\sigma_Y = 250\ \mathrm{MPa}$，跨过中性轴改变符号。
:::
:::

::: exercise 轴的塑性扭矩 {level=2}
半径$20\ \mathrm{mm}$的实心钢轴，$\tau_Y = 150\ \mathrm{MPa}$。求$T_Y$和$T_p$，以及弹性核半径为$10\ \mathrm{mm}$时的扭矩。
::: solution
$T_Y = \pi c^3\tau_Y/2 = \pi\times8000\times150/2 = 1.885\ \mathrm{kN\,m}$；$T_p = 2\pi c^3\tau_Y/3 = 2.513\ \mathrm{kN\,m}$。弹性核半径$\rho = 10\ \mathrm{mm}$时：$T = \int_0^\rho\tau_Y\frac r\rho\,2\pi r^2\,dr + \int_\rho^c\tau_Y\,2\pi r^2\,dr = \frac{2\pi\tau_Y}{3}\left(c^3 - \frac{\rho^3}{4}\right) = \frac43T_Y\left[1 - \frac14\left(\frac\rho c\right)^3\right] = 2.513\times(1 - 0.03125) = 2.435\ \mathrm{kN\,m}$——已是$T_p$的97 %。
:::
:::

::: exercise 两跨梁的崩溃 {level=3}
一根等截面（$M_p$）连续梁有两个相等的跨度$L$，在三个支座处简支，每跨中点承受集中载荷$P$。(a) 用机构法求崩溃载荷。(b) 求中间支座处的弹性弯矩（用[[mechanics-of-materials/beam-deflection]]或能量法），进而求形成第一个铰时的载荷。(c) 崩溃载荷与第一个铰载荷之比是多少？
::: solution
(a) 一跨内的机构：铰在中间支座（转角$\theta$）和载荷下方（转角$2\theta$）；端支座不形成铰。功方程：$P(L\theta/2) = M_p(\theta + 2\theta)$，所以$P_c = 6M_p/L$。由对称性两跨同时崩溃。静力校核：支座弯矩$-M_p$，载荷下方的跨中弯矩$PL/4 - M_p/2 = 1.5M_p - 0.5M_p = M_p$。✓
(b) 在弹性阶段，跨中受集中载荷的两跨梁中间支座弯矩为$-3PL/16$，每个载荷下方的弯矩为$+5PL/32$。较大者为$3PL/16$，所以第一个铰在支座处形成，$P_1 = 16M_p/(3L) = 5.33M_p/L$。
(c) $P_c/P_1 = 6/5.33 = 1.125$：内力重分布在截面形状系数之外又增加了12.5 %（形状系数已经通过对第一个铰使用$M_p$计入）。
:::
:::

::: exercise 起重机梁用弹性设计还是塑性设计？ {level=3}
起重机轨道梁承受移动的轮压，每年通过数千次。一位同事提议采用塑性设计以节省钢材。讨论极限分析是否是合适的依据，考虑：载荷循环次数与安定、焊接细节处的疲劳、起重机的挠度限值、弯扭屈曲以及截面分类。你会坚持要求哪些校核？
::: solution
好的回答应认识到，在设计载荷一次作用下的崩溃只是一种极限状态。对于移动的重复载荷：(1) 梁必须**安定**——首次加载后，以后的每次通过都必须是弹性的，否则塑性应变会累积（增量崩溃）或交变（低周疲劳）；对移动载荷，安定载荷可能远低于崩溃载荷。(2) 焊缝处（加劲肋端部、轮压下的翼缘-腹板焊缝）的高周**疲劳**通常是起重机梁的控制准则，用弹性应力幅按设计规范疲劳部分的细节类别校核；塑性设计对此没有帮助，反而可能因提高应力幅而有害。(3) 起重机运行的**挠度**限值属于正常使用校核，按弹性进行。(4) 塑性铰要求紧凑（第1类）截面、侧向约束和足够的转动能力；轨道梁往往无侧向支撑的长度很长，在偏心轮压下容易发生弯扭屈曲。结论：疲劳和正常使用按弹性设计，校核极限承载力（对第1类截面可采用塑性截面抗力），若依赖塑性抗力还须校核安定；遵循适用的起重机支承结构标准，并由具备资质的工程师校核设计。
:::
:::
