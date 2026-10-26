拉伸试验只给出少数几个数：屈服强度$S_y$、抗拉强度$S_{ut}$，或许还有抗压强度$S_{uc}$。而机器零件几乎从不像拉伸试样那样受载：曲轴表面同时承受弯曲和扭转，液压缸筒壁承受环向拉应力、轴向拉应力和径向压应力。失效理论就是两者之间的桥梁：它是一条规则，把一点处的完整应力状态化为一个数，以便与简单拉伸中测得的强度相比较。

没有一条规则适用于所有材料，因为材料的失效方式各不相同。延性（塑性）金属在设计意义上的失效就是屈服：轴发生永久弯曲，螺栓被拉长。屈服是晶面上的滑移，由切应力驱动，几乎不受静水压力影响，因此塑性材料的理论建立在切应力或畸变能之上。灰铸铁、陶瓷等脆性材料几乎不屈服就断裂，断裂起源于被拉应力张开的缺陷；其抗压强度可达抗拉强度的三四倍，相应的理论必须反映这种不对称。

本课讨论静载荷；波动载荷导致疲劳（[[machine-design/fatigue]]），疲劳分析以本课的结果为基础。应力分析本身——主应力、最大切应力、莫尔圆——假定读者已从[[mechanics-of-materials/stress-transformation]]中掌握。

约定：拉应力为正。三个主应力按$\sigma_1 \ge \sigma_2 \ge \sigma_3$排序。对平面应力，按照 Budynas 和 Nisbett（《Shigley 机械工程设计》（*Shigley's Mechanical Engineering Design*））的记法，两个面内主应力记为$\sigma_A$和$\sigma_B$，且$\sigma_A \ge \sigma_B$；第三个主应力为零，它可能是三者中最大的、最小的或居中的一个。安全因数记为$n$，米泽斯应力记为$\sigma'$。

## 强度、应力与安全因数

强度和应力是不同类型的量，尽管二者都以帕斯卡为单位。应力是受载零件在一点处的性质，由载荷和几何形状决定。强度是材料的性质，在试样上测得（$S_y$通常按 0.2 % 残余应变确定），并且具有统计性：手册中的数值是典型值或规定的最小值，实际棒料的强度落在其周围的某个分布之中。

::: definition 安全因数与设计因数 {#def-safety}
设$\sigma$为零件危险点处的应力（或由某一失效理论得到的等效应力），$S$为相应的强度。当应力与载荷成正比时，**安全因数**为
$$
n = \frac{S}{\sigma} = \frac{\text{引起失效的载荷}}{\text{施加的载荷}} .
$$ {#eq-n}
**设计因数**$n_d$是设计者（或规范）在接受设计之前所要求的$n$值。当$n \ge n_d$时设计可以接受；确定零件尺寸，就是选择其尺寸使$\sigma = S/n_d$。
:::

只有当应力与载荷呈线性关系时，[[#eq-n]]的两种形式才一致。接触应力随载荷的立方根增长，压杆在与其强度无关的载荷下屈曲；在这些情形中，安全因数必须按载荷来定义。

$n_d$应当取多大？它必须涵盖分析无法确切知道的一切：强度的分散性；载荷的不确定性，包括过载和误用；应力分析和失效理论中的近似；腐蚀或磨损造成的性能退化；以及失效的后果——割草机手柄开裂和起重机吊钩开裂不应采用同样的裕度。Juvinall 和 Marshek 给出了权衡这些因素的系统方法，Budynas 和 Nisbett 讨论了随机方法，即把强度分布和应力分布结合起来得到可靠度。在实践中最重要的依据是所适用的规范或标准，它凝聚了一个行业在该类产品上的经验。

::: remark 一个规范裕度的例子
例如，在 ASME《锅炉及压力容器规范》第 VIII 卷第 1 册中，大多数钢在室温下的基本许用应力取$S_{ut}/3.5$与$\tfrac23 S_y$中的较小者；抗拉强度上的裕度 3.5 是在 1999 年增补中取代原来的 4.0 的。这样的数值与规范自身的材料规格、计算公式、制造、检验和压力试验相配套，不能移用于其他产品。压力容器、起重设备及其他安全攸关的产品均按其规范的现行版本设计，并由有资质的工程师校核。本课讲授这些规范背后的原理，不能替代其中任何一部。
:::

::: definition 塑性行为与脆性行为 {#def-ductile}
在静强度设计中，若材料断裂时的真应变$\varepsilon_f$至少约为$0.05$，且具有可识别的屈服强度（通常拉伸与压缩时近似相同，$S_{yt} \approx S_{yc} = S_y$），则将其视为**塑性材料**。其设计强度为$S_y$，因为屈服本身就是失效。$\varepsilon_f < 0.05$的材料视为**脆性材料**：它没有可用的屈服强度，以拉伸和压缩时的强度极限$S_{ut}$和$S_{uc}$表征，$S_{uc}$常为$S_{ut}$的数倍。（5 % 的界限是 Budynas 和 Nisbett 采用的约定。）
:::

延性并不由材料牌号决定：低碳钢在低于其转变温度时、在尖锐裂纹处或在冲击下都可能发生脆性断裂（[[materials-science/failure]]）。应按服役条件进行分类。

## 静载荷下的应力集中

初等公式$\sigma = P/A$、$\sigma = Mc/I$和$\tau = Tr/J$假定截面变化缓慢。在孔、圆角、沟槽或键槽处，力线在不连续处周围聚集，局部应力升高到初等公式值以上。

::: definition 理论应力集中系数 {#def-kt}
在几何不连续处，**理论（几何）应力集中系数**为
$$
K_t = \frac{\sigma_{\max}}{\sigma_0}, \qquad K_{ts} = \frac{\tau_{\max}}{\tau_0},
$$ {#eq-kt}
其中$\sigma_{\max}$为不连续处的最大弹性应力，$\sigma_0$为按初等公式在指定截面上算得的**名义应力**——通常取通过不连续处的净截面。只要材料是线弹性的，$K_t$只取决于几何形状和载荷类型，与材料无关。
:::

两个精确的弹性力学解是各种图表的基准。宽板中的小圆孔在单向拉应力$\sigma_0$作用下，孔边两侧的应力为$\sigma_{\max} = 3\sigma_0$（基尔施（Kirsch）解）。垂直于载荷的半轴为$a$、平行于载荷的半轴为$b$的椭圆孔（英格利斯（Inglis）解）有
$$
K_t = 1 + \frac{2a}{b} ,
$$ {#eq-inglis}
圆孔时它给出$3$，椭圆压扁成裂纹时它无限增大——这正是应力集中让位于断裂力学之处。对于机械零件的几何形状——轴肩、沟槽、轴上的横向孔——设计者使用由光弹性试验和数值分析汇编的图表，标准汇编是《Peterson 应力集中系数》（*Peterson's Stress Concentration Factors*，Pilkey 和 Pilkey，第 3 版，2008 年），Budynas 和 Nisbett 的附录中也收录了一部分。查图时最重要的一条规则是：在与图表相同的截面上计算$\sigma_0$。

### 静强度设计中何时考虑$K_t$

$K_t$是弹性结果。当峰值应力达到强度时会发生什么，取决于材料。

在塑性材料中，缺口根部的小区域首先屈服。那里的应力不能再明显升高，于是增加的载荷由周围仍处于弹性的材料承担，屈服区不断扩大，直到整个净截面屈服。使零件失去功能的载荷——净截面的整体屈服——接近$S_y$乘以净截面面积，与$K_t$无关。因此在塑性材料的静载荷下**通常不计应力集中系数**：校核条件是在净截面上$\sigma_0 \le S_y/n_d$。

在脆性材料中不存在这种应力重分布：峰值应力一旦达到$S_{ut}$，裂纹就萌生并扩展，因此**要将$K_t$**乘到名义应力上：校核条件是$K_t\sigma_0 \le S_{ut}/n_d$。

这条规则在两个方向上都有例外，而且很重要：

- 灰铸铁是脆性的，但对缺口不敏感：其片状石墨本身就是内部应力集中源，比任何加工出的圆角都尖锐得多，因此 Budynas 和 Nisbett 建议静载荷下对灰铸铁不计$K_t$。
- 塑性材料在低温、高加载速率下或当缺口是裂纹时表现为脆性；此时由峰值应力（对裂纹而言，由[[solid-mechanics/fracture-mechanics]]中的应力强度因子）控制。
- 若零件的功能连局部屈服也不允许——如密封面、定位面——则要计入$K_t$。
- 在波动载荷下，局部屈服不能保护零件；疲劳一课中即使对塑性材料也采用系数$K_f$。

::: example 带孔板：塑性与脆性 {#ex-hole}
一根宽$60\ \mathrm{mm}$、厚$10\ \mathrm{mm}$的扁钢中部有一直径$12\ \mathrm{mm}$的横向孔，承受静轴向载荷$P = 60\ \mathrm{kN}$。对$d/w = 0.2$，有限宽中心孔板的图表给出以净截面应力为基准的$K_t = 2.5$。求以下两种情况的安全因数：(a) 扁钢为塑性钢，$S_y = 300\ \mathrm{MPa}$；(b) 扁钢为对缺口敏感的脆性材料，$S_{ut} = 400\ \mathrm{MPa}$。
::: solution
净截面面积$A_{\text{net}} = (w - d)t = (60 - 12)(10) = 480\ \mathrm{mm^2}$，故名义应力为
$$
\sigma_0 = \frac{P}{A_{\text{net}}} = \frac{60\,000\ \mathrm{N}}{480\ \mathrm{mm^2}} = 125\ \mathrm{MPa},
$$
孔边两侧的弹性峰值应力为$\sigma_{\max} = K_t\sigma_0 = 2.5 \times 125 = 312.5\ \mathrm{MPa}$。

(a) 塑性钢。峰值应力超过$S_y = 300\ \mathrm{MPa}$，所以孔边已局部屈服——但扁钢并未失效。局部屈服始于$P = S_yA_{\text{net}}/K_t = 300 \times 480/2.5 = 57.6\ \mathrm{kN}$；净截面直到$P = S_yA_{\text{net}} = 300 \times 480 = 144\ \mathrm{kN}$才完全屈服。防止整体屈服的静安全因数为
$$
n = \frac{S_y}{\sigma_0} = \frac{300}{125} = 2.4 .
$$

(b) 脆性材料。峰值应力达到$S_{ut}$时裂纹萌生：
$$
n = \frac{S_{ut}}{K_t\sigma_0} = \frac{400}{312.5} = 1.28 .
$$

合理性检查：毛截面应力$P/(wt) = 100\ \mathrm{MPa}$低于净截面应力，理应如此。尽管脆性材料强度更高，塑性扁钢的裕度却几乎是脆性扁钢的两倍。
:::
:::

::: warning 名义应力取错截面，以及重复计入$K_t$
从图表查得的$K_t$只有与其定义所用的名义应力配合才有意义。对净截面图表使用毛截面应力（或反之），误差可达两截面面积之比——在[[#ex-hole]]中为$20\ \%$，孔大时更多。另一个常见错误是乘了$K_t$之后又使用“缺口折减”后的强度，或者把$K_t$乘到已由有限元模型（已细分缺口）算出的应力上：有限元的峰值应力本身**就是**$K_t\sigma_0$。
:::

## 最大切应力理论

在低碳钢拉伸试验中，滑移带（吕德斯带）出现在与轴线约成$45^\circ$的方向上，即最大切应力所在的平面。这提示了最简单的假设：当最大切应力达到拉伸试样屈服时的值时，屈服开始。

::: proposition 最大切应力（特雷斯卡）准则 {#prop-tresca}
假设各向同性塑性材料在一点处的最大切应力达到拉伸试样屈服时的数值时开始屈服。则屈服条件为
$$
\sigma_1 - \sigma_3 = S_y ,
$$ {#eq-tresca}
安全因数为$n = S_y/(\sigma_1 - \sigma_3)$。该理论预测的剪切屈服强度为$S_{sy} = 0.5\,S_y$。在平面应力下，设$\sigma_A \ge \sigma_B$为面内主应力，则
$$
n = \begin{cases} S_y/\sigma_A, & \sigma_A \ge \sigma_B \ge 0, \\ S_y/(\sigma_A - \sigma_B), & \sigma_A \ge 0 \ge \sigma_B, \\ -S_y/\sigma_B, & 0 \ge \sigma_A \ge \sigma_B. \end{cases}
$$ {#eq-tresca-plane}
:::

::: proof
对主应力为$\sigma_1 \ge \sigma_2 \ge \sigma_3$的应力状态，三个莫尔圆的半径为$(\sigma_1 - \sigma_2)/2$、$(\sigma_2 - \sigma_3)/2$和$(\sigma_1 - \sigma_3)/2$，过该点任意平面上的最大切应力为最大圆的半径，$\tau_{\max} = (\sigma_1 - \sigma_3)/2$（[[mechanics-of-materials/stress-transformation]]）。拉伸试样屈服时主应力为$S_y, 0, 0$，故$\tau_{\max} = S_y/2$。令二者相等即得[[#eq-tresca]]。由于$\tau_{\max}$和$\sigma_1 - \sigma_3$都随载荷线性变化，安全因数就是比值$S_y/(\sigma_1 - \sigma_3)$。纯剪切$\tau$时主应力为$\tau, 0, -\tau$，故$\sigma_1 - \sigma_3 = 2\tau$，屈服发生在$\tau = S_y/2$。

平面应力下主应力为$\sigma_A$、$\sigma_B$和$0$。若两个面内应力均为正，则$\sigma_1 = \sigma_A$，$\sigma_3 = 0$；若二者异号，则$\sigma_1 = \sigma_A$，$\sigma_3 = \sigma_B$；若均为负，则$\sigma_1 = 0$，$\sigma_3 = \sigma_B$。代入$n = S_y/(\sigma_1 - \sigma_3)$即得[[#eq-tresca-plane]]的三种情形。所作假设为：各向同性；拉伸与压缩屈服强度相等；中间主应力和静水应力对屈服无影响。
:::

在$(\sigma_A, \sigma_B)$平面内，该准则是一个六边形，顶点为$(S_y, 0)$、$(S_y, S_y)$、$(0, S_y)$及其反号点：在第一、三象限为正方形，在第二、四象限为连接单向拉伸点与单向压缩点的直线。

::: example 薄壁储气罐 {#ex-vessel}
一个两端封闭的圆筒形压缩空气储气罐，平均半径$r = 300\ \mathrm{mm}$，工作表压$p = 1.5\ \mathrm{MPa}$。拟用$S_y = 250\ \mathrm{MPa}$的钢制造，本题取防止屈服的$n_d = 3$。按最大切应力理论求壁厚，并说明如果设计者改用**面内**最大切应力会怎样。
::: solution
薄壁应力（[[mechanics-of-materials/stress-transformation]]）：环向$\sigma_\theta = pr/t$，轴向$\sigma_z = pr/2t$；径向应力从内表面的$-p$变化到外表面的$0$，与其他应力相比很小，取$\sigma_r \approx 0$。于是主应力为$\sigma_1 = pr/t$、$\sigma_2 = pr/2t$、$\sigma_3 = 0$——两个面内应力均为正。

由[[#eq-tresca]]，$\sigma_1 - \sigma_3 = pr/t = S_y/n_d$：
$$
t = \frac{p\,r\,n_d}{S_y} = \frac{1.5 \times 300 \times 3}{250} = 5.4\ \mathrm{mm}.
$$
面内最大切应力为$(\sigma_\theta - \sigma_z)/2 = pr/4t$，只是真实最大值$pr/2t$的一半，后者作用在穿过壁厚、与表面成$45^\circ$的平面上。若令$pr/4t$等于$S_y/(2n_d)$，会得到$t = 2.7\ \mathrm{mm}$——安全因数只有$1.5$而不是$3$。

合理性检查：在第一象限，特雷斯卡准则只取决于较大的主应力，所以$t$只由环向应力决定。实际的储气罐按压力容器规范设计（在欧洲为 EN 13445，简单容器为 EN 286-1；其他地区常用 ASME VIII-1），其公式包含焊接接头系数和腐蚀裕量。
:::
:::

## 畸变能理论

最大切应力理论忽略了中间主应力。薄壁管在拉扭复合作用下的试验表明，中间主应力有一定影响：对大多数塑性金属，屈服点落在略位于特雷斯卡六边形之外的一条光滑曲线上。这条曲线可以由能量论证得出。弹性受载的固体储存应变能，一部分用于改变体积，一部分用于改变形状。静水应力只改变体积，而金属能承受极大的静水压力而不屈服（布里奇曼（Bridgman）的实验）。因此，畸变能理论提出：当仅由形状改变引起的畸变能达到拉伸试样屈服时的数值时，屈服开始。

::: proposition 体积改变能与畸变能 {#prop-energy}
对弹性模量为$E$、泊松比为$\nu$的各向同性线弹性材料，在主应力$\sigma_1, \sigma_2, \sigma_3$作用下，单位体积应变能分解为体积改变部分和畸变部分，$u = u_v + u_d$，其中$\sigma_{av} = (\sigma_1 + \sigma_2 + \sigma_3)/3$，且
$$
u_v = \frac{3(1 - 2\nu)}{2E}\,\sigma_{av}^2, \qquad u_d = \frac{1 + \nu}{3E}\left[\frac{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}{2}\right].
$$ {#eq-ud}
:::

::: proof
在主轴坐标下，应变能密度为$u = \tfrac12(\sigma_1\varepsilon_1 + \sigma_2\varepsilon_2 + \sigma_3\varepsilon_3)$，胡克定律给出$\varepsilon_1 = [\sigma_1 - \nu(\sigma_2 + \sigma_3)]/E$及其轮换式。把每个主应力写成平均应力加偏应力部分，$\sigma_i = \sigma_{av} + s_i$，其中$s_1 + s_2 + s_3 = 0$。代入胡克定律，
$$
\varepsilon_i = \frac{(1 - 2\nu)\sigma_{av}}{E} + \frac{s_i - \nu(s_j + s_k)}{E} = \frac{(1 - 2\nu)\sigma_{av}}{E} + \frac{(1 + \nu)s_i}{E},
$$
这里用到$s_j + s_k = -s_i$。所以应变也分解为各方向相等、改变体积的部分$\varepsilon_{av} = (1 - 2\nu)\sigma_{av}/E$，以及和为零、因而只改变形状的部分$e_i = (1 + \nu)s_i/E$。于是
$$
2u = \sum_i (\sigma_{av} + s_i)(\varepsilon_{av} + e_i) = 3\sigma_{av}\varepsilon_{av} + \varepsilon_{av}\sum_i s_i + \sigma_{av}\sum_i e_i + \sum_i s_ie_i .
$$
由于$\sum s_i = 0$且$\sum e_i = 0$，中间两项为零：平均应力在形状改变上不做功，偏应力在体积改变上也不做功。因此$u = u_v + u_d$，其中
$$
u_v = \tfrac32\sigma_{av}\varepsilon_{av} = \frac{3(1 - 2\nu)}{2E}\sigma_{av}^2, \qquad u_d = \frac12\sum_i s_ie_i = \frac{1 + \nu}{2E}\sum_i s_i^2 .
$$
最后，$\sum_i s_i^2 = \sum_i \sigma_i^2 - 3\sigma_{av}^2$，展开可知它等于$\tfrac13\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right]$：两边都等于$\tfrac23(\sigma_1^2 + \sigma_2^2 + \sigma_3^2 - \sigma_1\sigma_2 - \sigma_2\sigma_3 - \sigma_3\sigma_1)$。代入即得[[#eq-ud]]。所作假设为线弹性和各向同性，在此条件下这一分解是精确的。
:::

拉伸试样屈服时，[[#eq-ud]]中的方括号等于$S_y^2$，故$u_d = (1 + \nu)S_y^2/(3E)$。令一般状态的$u_d$等于此值，弹性常数相消，准则中只剩下应力。

::: definition 米泽斯应力 {#def-vm}
**米泽斯应力**（又称有效应力或等效应力）为
$$
\sigma' = \sqrt{\frac{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}{2}} ,
$$ {#eq-vm}
或用任意$xyz$坐标系中的应力分量表示为
$$
\sigma' = \sqrt{\tfrac12\left[(\sigma_x - \sigma_y)^2 + (\sigma_y - \sigma_z)^2 + (\sigma_z - \sigma_x)^2 + 6(\tau_{xy}^2 + \tau_{yz}^2 + \tau_{zx}^2)\right]} .
$$ {#eq-vm-xyz}
在平面应力下，它们化为
$$
\sigma' = \sqrt{\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2} = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} .
$$ {#eq-vm-plane}
**畸变能（米泽斯）准则**认为，当$\sigma' = S_y$时开始屈服；安全因数为$n = S_y/\sigma'$。
:::

[[#eq-vm-plane]]的两种形式相等，是因为$\sigma'$是应力张量的不变量（[[#ex-ratio]]直接验证了这一点）。$xyz$形式不需要主应力，这正是有限元程序能把$\sigma'$绘成单一云图的原因。由于$\sigma'$是应力的一次齐次函数，$n = S_y/\sigma'$既是应力上的因数，也是载荷上的因数。

### 八面体切应力

畸变能理论又称八面体切应力理论，原因如下。

::: proposition 八面体切应力 {#prop-oct}
在法线与三个主方向夹角相等的八个平面（八面体的各个面）上，正应力为$\sigma_{av}$，切应力为
$$
\tau_{\text{oct}} = \frac13\sqrt{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2} = \frac{\sqrt2}{3}\,\sigma' .
$$ {#eq-oct}
因此，“当$\tau_{\text{oct}}$达到拉伸试验中的数值时屈服”这一准则与米泽斯准则完全相同。
:::

::: proof
在主轴坐标下取单位法向量$\mathbf{n} = (1, 1, 1)/\sqrt3$（其余七个只是符号不同，结果相同）。该平面上的应力矢量为$\mathbf{t} = (\sigma_1, \sigma_2, \sigma_3)/\sqrt3$。其法向分量为$\sigma_n = \mathbf{t}\cdot\mathbf{n} = (\sigma_1 + \sigma_2 + \sigma_3)/3 = \sigma_{av}$，切向分量由$\tau^2 = \lvert\mathbf{t}\rvert^2 - \sigma_n^2$求得：
$$
\tau_{\text{oct}}^2 = \frac{\sigma_1^2 + \sigma_2^2 + \sigma_3^2}{3} - \sigma_{av}^2 = \frac13\sum_i s_i^2 = \frac19\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right],
$$
这里用到了[[#prop-energy]]证明中的恒等式。与[[#eq-vm]]比较，方括号等于$2\sigma'^2$，故$\tau_{\text{oct}} = \sqrt2\,\sigma'/3$。由于系数$\sqrt2/3$是常数，任何以拉伸试验标定的$\tau_{\text{oct}} = \text{常数}$形式的准则都就是$\sigma' = S_y$。
:::

### 剪切屈服

纯剪切$\tau$时主应力为$\tau, 0, -\tau$，由[[#eq-vm]]得$\sigma' = \sqrt{(\tau^2 + \tau^2 + 4\tau^2)/2} = \sqrt3\,\tau$。屈服发生在$\tau = S_y/\sqrt3$，所以畸变能理论预测的剪切屈服强度为
$$
S_{sy} = \frac{S_y}{\sqrt3} = 0.577\,S_y ,
$$ {#eq-ssy}
而最大切应力理论给出$0.5\,S_y$。塑性金属的复合应力试验结果一般更接近畸变能理论的预测，这是需要准确预测时优先采用畸变能理论的主要原因。

### 两种理论的比较

在$(\sigma_A, \sigma_B)$平面内，米泽斯准则$\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = S_y^2$是一个长轴沿$\sigma_A = \sigma_B$方向的椭圆，它通过特雷斯卡六边形的六个顶点，六边形位于其内部。差别最大处是纯剪切，两者预测的剪切强度相差$0.577/0.5 = 1.155$倍。对任意三维应力状态，$\sigma'$介于$(\sqrt3/2)(\sigma_1 - \sigma_3)$与$(\sigma_1 - \sigma_3)$之间（[[#ex-ratio]]），所以两种理论之差从不超过约 15 %，且特雷斯卡准则总是更保守。

::: widget parametric
fx: if(t <= 2*pi, cos(t) + sin(t)/sqrt(3), if(t <= 2*pi + 1, 1, if(t <= 2*pi + 2, 2*pi + 2 - t, if(t <= 2*pi + 3, -c*(t - 2*pi - 2), if(t <= 2*pi + 4, -c, if(t <= 2*pi + 5, -c + c*(t - 2*pi - 4), t - 2*pi - 5))))))
fy: if(t <= 2*pi, cos(t) - sin(t)/sqrt(3), if(t <= 2*pi + 1, 2*pi + 1 - t, if(t <= 2*pi + 2, -c*(t - 2*pi - 1), if(t <= 2*pi + 3, -c, if(t <= 2*pi + 4, -c + c*(t - 2*pi - 3), if(t <= 2*pi + 5, t - 2*pi - 4, 1))))))
t: 0, 2*pi + 6
x: -3.3, 1.6
y: -3.3, 1.6
sliders: c=1:1:3:0.05
trace: false
equal: true
caption: $(\sigma_A/S_t, \sigma_B/S_t)$平面内的失效轨迹，画成一条闭合路径：先是米泽斯椭圆（$S_t = S_c$时），然后从公共顶点$(1, 1)$出发，画出$c = S_c/S_t$时塑性库仑-莫尔准则的六边形。$c = 1$时六边形就是特雷斯卡六边形，内接于椭圆并与之相切于六点；二者之间的间隙在纯剪切对角线$\sigma_B = -\sigma_A$上最宽。增大$c$：第一象限的正方形不变（那里的失效只取决于拉伸），第三象限的正方形扩大到$-c$，第二、四象限的边向外摆动，因此纯剪切状态可以承受更大的应力——以$S_t$为单位的剪切强度$S_tS_c/(S_t + S_c)$从$c = 1$时的$0.5$升至$c = 3$时的$0.75$。
:::

::: example 承受弯曲和扭转的轴 {#ex-shaft}
一根直径$d = 40\ \mathrm{mm}$的实心钢轴承受弯矩$M = 1.0\ \mathrm{kN\,m}$和扭矩$T = 0.75\ \mathrm{kN\,m}$，二者均为稳定载荷。钢的$S_y = 400\ \mathrm{MPa}$。分别按最大切应力理论和畸变能理论，求危险表面点处防止屈服的安全因数。
::: solution
在截面的顶部或底部，弯曲应力最大，扭转切应力为其表面值：
$$
\sigma_x = \frac{32M}{\pi d^3} = \frac{32 \times 1.0\times10^{6}\ \mathrm{N\,mm}}{\pi \times 40^3\ \mathrm{mm^3}} = 159.2\ \mathrm{MPa}, \qquad \tau_{xy} = \frac{16T}{\pi d^3} = \frac{16 \times 0.75\times10^{6}}{\pi \times 40^3} = 59.7\ \mathrm{MPa}.
$$
主应力（$\sigma_y = 0$）：
$$
\sigma_{A,B} = \frac{\sigma_x}{2} \pm \sqrt{\left(\frac{\sigma_x}{2}\right)^2 + \tau_{xy}^2} = 79.6 \pm 99.5\ \mathrm{MPa}, \quad \sigma_A = 179.0\ \mathrm{MPa},\ \sigma_B = -19.9\ \mathrm{MPa}.
$$
二者异号，故由[[#eq-tresca-plane]]，$\sigma_1 - \sigma_3 = \sigma_A - \sigma_B = 198.9\ \mathrm{MPa}$，
$$
n_{\text{MSS}} = \frac{400}{198.9} = 2.01 .
$$
畸变能理论，用[[#eq-vm-plane]]的$xy$形式：
$$
\sigma' = \sqrt{\sigma_x^2 + 3\tau_{xy}^2} = \sqrt{159.2^2 + 3 \times 59.7^2} = 189.8\ \mathrm{MPa}, \qquad n_{\text{DE}} = \frac{400}{189.8} = 2.11 .
$$
合理性检查：比值$n_{\text{DE}}/n_{\text{MSS}} = 1.05$介于$1$与$1.155$之间，理应如此。写成轴的形式，$\sigma_1 - \sigma_3 = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 4T^2}$，$\sigma' = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 3T^2}$，它们就是[[machine-design/shafts]]中公式的静载部分。
:::
:::

::: quiz
一个塑性钢构件受载后面内主应力为$\sigma_A = 200\ \mathrm{MPa}$、$\sigma_B = 200\ \mathrm{MPa}$（等双向拉伸，$\sigma_3 = 0$）。下列哪种说法正确？
- [ ] 特雷斯卡准则预测的屈服载荷低于米泽斯准则，因为面内最大切应力为零。
- [x] 两种理论都给出$n = S_y/200\ \mathrm{MPa}$。
- [ ] 米泽斯准则给出$n = S_y/(200\sqrt3)$。
- [ ] 两种理论都不预测屈服，因为面内没有切应力。
::: solution
主应力为$200, 200, 0\ \mathrm{MPa}$。特雷斯卡：$\sigma_1 - \sigma_3 = 200\ \mathrm{MPa}$。米泽斯：$\sigma' = \sqrt{200^2 - 200 \times 200 + 200^2} = 200\ \mathrm{MPa}$。等双向拉伸是六边形与椭圆相切的顶点。面内切应力为零，但与表面成$45^\circ$的平面上的切应力为$100\ \mathrm{MPa}$——起控制作用的是面外的莫尔圆。
:::
:::

## 拉压强度不等：库仑-莫尔理论

前两种理论都假定拉伸与压缩强度相等。有些塑性材料——某些镁合金和铸造铝合金、许多聚合物——抗压强度更高，脆性材料更是如此。莫尔（Mohr）的思路是直接利用试验数据：每一个进行到失效的试验都画成其失效时的莫尔圆，这些圆的包络线就是失效边界。若某应力状态的最大莫尔圆（通过$\sigma_1$和$\sigma_3$）位于包络线之内，则该状态是安全的；$\sigma_2$不起作用。若只有一个拉伸试验和一个压缩试验，最简单的包络线是同时与两个圆相切的一对直线——这就是库仑-莫尔理论，它与库仑（Coulomb）关于土和砌体剪切破坏的准则具有相同的几何形式。

::: proposition 库仑-莫尔准则 {#prop-cm}
设单向拉伸在$S_t$时失效、单向压缩在$S_c$时失效（二者均为正数），并假定莫尔平面中的失效包络线是与拉伸圆和压缩圆相切的一对直线。则对最大莫尔圆跨过原点（$\sigma_1 \ge 0 \ge \sigma_3$）的应力状态——包括所有平面应力状态——主应力为$\sigma_1 \ge \sigma_2 \ge \sigma_3$时的失效条件为
$$
\frac{\sigma_1}{S_t} - \frac{\sigma_3}{S_c} = 1 ,
$$ {#eq-cm}
在平面应力下，当$\sigma_A \ge 0 \ge \sigma_B$时，安全因数由$\dfrac{\sigma_A}{S_t} - \dfrac{\sigma_B}{S_c} = \dfrac1n$求得；两个面内应力均为正时$n = S_t/\sigma_A$，均为负时$n = -S_c/\sigma_B$。剪切强度为
$$
S_{s} = \frac{S_tS_c}{S_t + S_c} .
$$ {#eq-cm-shear}
:::

::: proof
通过$\sigma_1$和$\sigma_3$的莫尔圆，圆心在$\sigma$轴上的$C = (\sigma_1 + \sigma_3)/2$处，半径为$R = (\sigma_1 - \sigma_3)/2$。圆心在轴上的圆与给定直线相切，当且仅当其半径等于圆心到直线的距离。对于位于直线同一侧的圆心，该距离是圆心位置$C$的线性函数，因此恰与上包络线（由对称性也与下包络线）相切的圆满足线性关系$R = aC + b$。

拉伸圆有$C = S_t/2$、$R = S_t/2$；压缩圆有$C = -S_c/2$、$R = S_c/2$。按构造二者都与包络线相切：
$$
\frac{S_t}{2} = a\frac{S_t}{2} + b, \qquad \frac{S_c}{2} = -a\frac{S_c}{2} + b .
$$
相减得$a = \dfrac{S_t - S_c}{S_t + S_c}$，于是$b = \dfrac{S_t}{2}(1 - a) = \dfrac{S_tS_c}{S_t + S_c}$。一般的圆在$R = aC + b$时失效：
$$
\frac{\sigma_1 - \sigma_3}{2} = a\,\frac{\sigma_1 + \sigma_3}{2} + b \;\Longleftrightarrow\; (1 - a)\sigma_1 - (1 + a)\sigma_3 = 2b .
$$
由$1 - a = 2S_c/(S_t + S_c)$和$1 + a = 2S_t/(S_t + S_c)$，两边乘以$(S_t + S_c)/2$得$S_c\sigma_1 - S_t\sigma_3 = S_tS_c$，即[[#eq-cm]]。把应力按$n$缩放即得安全因数形式。平面应力下有一个主应力为零，所以$\sigma_1 \ge 0 \ge \sigma_3$总成立：若$\sigma_A \ge \sigma_B \ge 0$，则$\sigma_1 = \sigma_A$、$\sigma_3 = 0$，[[#eq-cm]]给出$\sigma_A = S_t/n$；若$0 \ge \sigma_A \ge \sigma_B$，则$\sigma_1 = 0$、$\sigma_3 = \sigma_B$，给出$\sigma_B = -S_c/n$；其余情形$\sigma_1 = \sigma_A$、$\sigma_3 = \sigma_B$。（对三个主应力同号的三维状态，直线包络线将被外推到标定圆之外，设计实践中以$\sigma_1 = S_t$或$\sigma_3 = -S_c$为上限。）纯剪切$\tau$有$\sigma_1 = \tau$、$\sigma_3 = -\tau$，故$\tau(1/S_t + 1/S_c) = 1$，即[[#eq-cm-shear]]。所作假设为：各向同性；比例加载；两个标定圆之间的包络线为直线；$\sigma_2$无影响。
:::

当$S_t = S_c = S_y$时，该准则恰好退化为最大切应力理论，因此它是特雷斯卡准则对拉压强度不等情形的推广。对$S_{yt} \ne S_{yc}$的塑性材料，取$S_t = S_{yt}$、$S_c = S_{yc}$，称为塑性库仑-莫尔（DCM）理论；对脆性材料，采用强度极限，称为脆性库仑-莫尔（BCM）理论。

::: example 拉压屈服强度不等的零件 {#ex-dcm}
某塑性合金的$S_{yt} = 200\ \mathrm{MPa}$，$S_{yc} = 400\ \mathrm{MPa}$。零件危险点处$\sigma_x = 80\ \mathrm{MPa}$，$\sigma_y = 0$，$\tau_{xy} = 60\ \mathrm{MPa}$。按塑性库仑-莫尔理论求安全因数，并与采用拉伸屈服强度的特雷斯卡准则比较。
::: solution
主应力：
$$
\sigma_{A,B} = 40 \pm \sqrt{40^2 + 60^2} = 40 \pm 72.1\ \mathrm{MPa}, \qquad \sigma_A = 112.1\ \mathrm{MPa},\ \sigma_B = -32.1\ \mathrm{MPa}.
$$
二者异号，故由[[#prop-cm]]，
$$
\frac1n = \frac{\sigma_A}{S_{yt}} - \frac{\sigma_B}{S_{yc}} = \frac{112.1}{200} + \frac{32.1}{400} = 0.561 + 0.080 = 0.641, \qquad n = 1.56 .
$$
取$S_y = S_{yt} = 200\ \mathrm{MPa}$的特雷斯卡准则给出$n = 200/(112.1 + 32.1) = 1.39$，它忽略了额外的抗压强度，偏于保守。

合理性检查：当$S_{yc} \to \infty$时，$n$趋于$S_{yt}/\sigma_A = 1.78$，且永远不会超过它。
:::
:::

## 脆性材料

脆性材料的设计强度为$S_{ut}$和$S_{uc}$，常用的准则有三种。它们在$(\sigma_A, \sigma_B)$平面的第一、三象限一致，在第四象限不同——那里一个主应力为拉、另一个为压，正是扭转所在的象限。

**最大正应力理论**（常归于朗肯（Rankine））认为，当最大拉主应力达到$S_{ut}$或最大压主应力达到$-S_{uc}$时发生断裂：
$$
n = \min\left(\frac{S_{ut}}{\sigma_A},\ \frac{S_{uc}}{-\sigma_B}\right) \quad\text{（符号不符的项略去）}.
$$ {#eq-mns}
在第四象限，其轨迹是一个矩形，忽略了拉与压的相互作用；试验数据落在矩形之内，所以它在该象限偏于危险，不推荐用于设计。

**脆性库仑-莫尔理论**就是取$S_t = S_{ut}$、$S_c = S_{uc}$的[[#prop-cm]]：在第四象限，$\sigma_A/S_{ut} - \sigma_B/S_{uc} = 1/n$，是从$(S_{ut}, 0)$到$(0, -S_{uc})$的一条直线。它偏于保守。

**修正莫尔理论**是为拟合灰铸铁双向断裂数据而画出的经验边界，这些数据介于前两者之间。Budynas 和 Nisbett（《Shigley 机械工程设计》第 5 章）给出如下形式。设$\sigma_A \ge \sigma_B$为面内主应力，
$$
\begin{aligned}
&\sigma_A \ge \sigma_B \ge 0, \text{ 或 } \sigma_A \ge 0 \ge \sigma_B \text{ 且 } \lvert\sigma_B/\sigma_A\rvert \le 1: && n = \frac{S_{ut}}{\sigma_A}, \\
&\sigma_A \ge 0 \ge \sigma_B \text{ 且 } \lvert\sigma_B/\sigma_A\rvert > 1: && \frac1n = \frac{(S_{uc} - S_{ut})\,\sigma_A}{S_{uc}S_{ut}} - \frac{\sigma_B}{S_{uc}}, \\
&0 \ge \sigma_A \ge \sigma_B: && n = -\frac{S_{uc}}{\sigma_B}.
\end{aligned}
$$ {#eq-mm}
在第四象限，修正莫尔轨迹沿最大正应力线$\sigma_A = S_{ut}$向下延伸到纯剪切线$\sigma_B = -\sigma_A$上的点$(S_{ut}, -S_{ut})$，然后以直线连到$(0, -S_{uc})$。它是以铸铁标定的设计规则，并非某个物理模型的推论，不应外推到未经双向试验的脆性材料。

::: widget plot
f: if(x >= -Suc, Sut, 0/0); if(x >= -Suc, Sut*(1 + x/Suc), 0/0); if(x >= -Sut, Sut, if(x >= -Suc, Sut*(Suc + x)/(Suc - Sut), 0/0)); if(x >= -Sut, -x, 0/0)
x: -1300, 0
y: 0, 450
sliders: Sut=200:100:400:10; Suc=700:400:1200:10
labels: \text{最大正应力}; \text{脆性库仑-莫尔}; \text{修正莫尔}; \sigma_B = -\sigma_A
caption: 脆性材料的第四象限：拉主应力$\sigma_A$（纵轴，MPa）对压主应力$\sigma_B$（横轴，MPa）。位于所选曲线下方的状态是安全的；对比例加载，安全因数等于沿载荷线从原点到曲线的距离除以从原点到应力点的距离。先取$S_{ut} = 200$、$S_{uc} = 700\ \mathrm{MPa}$，这是灰铸铁的典型值。在纯剪切线（$\sigma_B = -\sigma_A$）上，修正莫尔轨迹与最大正应力轨迹在$\sigma_A = S_{ut}$处重合，而脆性库仑-莫尔只允许$S_{ut}S_{uc}/(S_{ut} + S_{uc}) = 156\ \mathrm{MPa}$。增大$S_{uc}$：库仑-莫尔线趋近最大正应力矩形。把它减小到接近$S_{ut}$：库仑-莫尔线变成特雷斯卡线，而修正莫尔轨迹仍停留在矩形上——这提醒我们，它是对铸铁的拟合，而不是一种理论。
:::

::: example 承受两种工况的灰铸铁支架 {#ex-castiron}
某灰铸铁零件的$S_{ut} = 200\ \mathrm{MPa}$，$S_{uc} = 700\ \mathrm{MPa}$。其危险点承受（工况 1）$\sigma_x = 20\ \mathrm{MPa}$、$\tau_{xy} = 50\ \mathrm{MPa}$，以及（工况 2）$\sigma_x = -120\ \mathrm{MPa}$、$\tau_{xy} = 50\ \mathrm{MPa}$，两种工况下均有$\sigma_y = 0$。该点位于$K_t = 1.6$的圆角处。分别按脆性库仑-莫尔、修正莫尔和最大正应力理论求各工况的安全因数。
::: solution
灰铸铁在静载荷下对缺口不敏感，故不计$K_t$。

工况 1：$\sigma_{A,B} = 10 \pm \sqrt{10^2 + 50^2} = 10 \pm 51.0$，故$\sigma_A = 61.0\ \mathrm{MPa}$，$\sigma_B = -41.0\ \mathrm{MPa}$，$\lvert\sigma_B/\sigma_A\rvert = 0.67 \le 1$。
$$
\text{BCM: } \frac1n = \frac{61.0}{200} + \frac{41.0}{700} = 0.305 + 0.059 = 0.364,\ n = 2.75; \qquad \text{MM 和 MNS: } n = \frac{200}{61.0} = 3.28 .
$$
工况 2：$\sigma_{A,B} = -60 \pm \sqrt{60^2 + 50^2} = -60 \pm 78.1$，故$\sigma_A = 18.1\ \mathrm{MPa}$，$\sigma_B = -138.1\ \mathrm{MPa}$，$\lvert\sigma_B/\sigma_A\rvert = 7.6 > 1$。
$$
\text{BCM: } \frac1n = \frac{18.1}{200} + \frac{138.1}{700} = 0.0905 + 0.1973 = 0.288,\ n = 3.47 ;
$$
$$
\text{MM: } \frac1n = \frac{(700 - 200)(18.1)}{700 \times 200} + \frac{138.1}{700} = 0.0647 + 0.1973 = 0.262,\ n = 3.82 ;
$$
$$
\text{MNS: } n = \min\left(\frac{200}{18.1}, \frac{700}{138.1}\right) = \min(11.0, 5.07) = 5.07 .
$$
合理性检查：两种工况下都有 BCM $\le$ MM $\le$ MNS，这是第四象限中应有的次序。在工况 2 中，最大正应力理论给出的裕度比拟合铸铁数据的修正莫尔理论大约$33\ \%$。
:::
:::

::: warning 不要对塑性零件用最大正应力理论，也不要对脆性零件用特雷斯卡准则
对纯扭转的塑性材料，最大正应力理论预测在$\tau = S_y$时失效，而实际上约在$0.58\,S_y$时就开始屈服：它把扭转强度高估了约 70 %。反之，把特雷斯卡准则中的$S_y$换成$S_{ut}$用于脆性材料，就白白丢掉了材料的抗压强度。应按失效机理——屈服还是断裂——选择理论；当服役条件使塑性零件变脆时，应改用断裂分析。
:::

## 理论的选择与应用

下面的步骤基本上就是 Budynas 和 Nisbett 推荐的方法。

::: algorithm 零件的静强度失效分析 {#alg-static}
1. 确定危险点（初等应力最大处、不连续处），按最大预期载荷计算该处的应力分量。
2. 按服役条件（温度、加载速率、有无裂纹）对材料分类：若$\varepsilon_f \ge 0.05$且有明确的屈服强度，则为塑性材料，否则为脆性材料（[[#def-ductile]]）。
3. 应力集中：对缺口敏感的脆性材料，将名义应力乘以$K_t$；对塑性材料（以及灰铸铁）使用名义应力，除非局部屈服本身不可接受。
4. 求主应力（对米泽斯准则，也可直接用$xyz$形式）。
5. 塑性材料：
   - 若$S_{yt} \approx S_{yc}$：要准确估计时用畸变能理论，要简单而保守的估计时用最大切应力理论；
   - 若$S_{yt} \ne S_{yc}$：用塑性库仑-莫尔理论。
6. 脆性材料：若材料是灰铸铁或已验证适用的类似材料，用修正莫尔理论，否则用脆性库仑-莫尔理论（保守）。
7. 计算每个危险点的$n$；最小值起控制作用，且不得小于适用规范或标准规定的$n_d$。确定尺寸时，令$n = n_d$求解准则，圆整到较大的标准尺寸，再重新校核。
:::

该步骤有两个局限。它假定材料是无裂纹的连续体：若零件可能含有类裂纹缺陷——焊接缺陷、锻造折叠、疲劳裂纹——其强度由断裂韧度和缺陷尺寸决定，分析应属于[[solid-mechanics/fracture-mechanics]]；厚截面的高强度钢和铝合金是常见情形。它也只适用于静载荷：任何变化的载荷——承受稳定弯矩的旋转轴，其表面每一点都经受对称循环——都必须进行疲劳校核（[[machine-design/fatigue]]），疲劳几乎总是运动零件的控制因素。

各类产品的规范在这些理论中各有取舍。例如，ASME 第 VIII 卷第 2 册的分析设计规则曾以最大切应力理论（“应力强度”，$\sigma_1 - \sigma_3$）为基础，直到为 2007 年版重写时才改用米泽斯等效应力。凡规范规定了准则的，就应采用规范的准则及其裕度。

::: history
库仑（Charles-Augustin Coulomb）于 1773 年向法国科学院提交了《极大极小规则在若干建筑静力学问题中的应用》（*Essai sur une application des règles de maximis et minimis à quelques problèmes de statique, relatifs à l'architecture*，1776 年发表）；其中关于砌体和土沿摩擦面剪切破坏的分析，是以他命名的直线准则的起源。特雷斯卡（Henri Tresca）1864 年向科学院提交的关于固体在高压下流动的论文（*Mémoire sur l'écoulement des corps solides soumis à de fortes pressions*）导出了最大切应力准则；格斯特（J. J. Guest）在复合载荷下对管子所做的试验于 1900 年以《复合应力下塑性材料的强度》（“On the strength of ductile materials under combined stress”）为题发表在《哲学杂志》（*Philosophical Magazine*）上，使之成为工程师处理塑性金属的标准规则，因此它常被称为特雷斯卡-格斯特准则。同年，莫尔（Otto Mohr）在《德国工程师协会会刊》（*Zeitschrift des Vereines deutscher Ingenieure*）上提出以失效时莫尔圆的包络线作为失效准则。胡贝尔（Maksymilian Tytus Huber）在 1904 年的一篇波兰文论文中提出了基于畸变能的准则；米泽斯（Richard von Mises）于 1913 年在《哥廷根通报》（*Göttinger Nachrichten*）上独立得到了相同的表达式，亨基（Heinrich Hencky）于 1924 年给出了它作为畸变应变能的解释。泰勒（G. I. Taylor）和奎尼（H. Quinney）对铜、铝和低碳钢薄壁管进行了拉扭复合试验，结果发表在《皇家学会哲学汇刊》（*Philosophical Transactions of the Royal Society*，1931 年）上，表明米泽斯准则比特雷斯卡准则更符合塑性金属。
:::

::: quiz
一块带中心孔（$K_t = 2.7$）的塑性钢板承受静拉伸载荷，净截面应力为$0.5\,S_y$。下列哪个结论正确？
- [ ] 钢板已失效，因为$K_t\sigma_0 = 1.35\,S_y > S_y$。
- [x] 孔边的小区域已屈服，但防止净截面整体屈服的安全因数为$2$。
- [ ] 安全因数为$1/1.35 = 0.74$。
- [ ] 应力集中对塑性材料永远无关紧要。
::: solution
孔边的局部屈服把应力重新分配到净截面的其余部分，净截面直到$\sigma_0 = S_y$时才完全屈服。所以静载荷下$n = S_y/\sigma_0 = 2$。最后一个选项是错的：在低温、疲劳载荷下，或当局部屈服妨碍零件功能时，同一个缺口就很重要。
:::
:::

::: summary
- 应力与载荷成正比时$n = S/\sigma$；设计因数$n_d$来自适用的规范，或来自对不确定性和失效后果的合理评估。
- 按服役条件对材料分类：塑性材料（$\varepsilon_f \ge 0.05$，按$S_y$设计）或脆性材料（$S_{ut}$、$S_{uc}$）。
- $K_t = \sigma_{\max}/\sigma_0$，$\sigma_0$取图表所用的截面。静载荷下对缺口敏感的脆性材料计入$K_t$，对塑性材料（局部屈服使载荷重分布）和灰铸铁不计。
- 最大切应力（特雷斯卡）：$n = S_y/(\sigma_1 - \sigma_3)$；平面应力下记住$\sigma = 0$也是一个主应力。$S_{sy} = 0.5\,S_y$。
- 畸变能（米泽斯）：$\sigma' = \sqrt{\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2} = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2}$，$n = S_y/\sigma'$；等价于八面体切应力达到临界值；$S_{sy} = 0.577\,S_y$。它与特雷斯卡准则之差至多 15.5 %。
- 库仑-莫尔：$\sigma_1/S_t - \sigma_3/S_c = 1/n$——特雷斯卡准则对拉压强度不等的推广，用于$S_{yt} \ne S_{yc}$的塑性材料，以及采用强度极限时的脆性材料。
- 脆性材料：最大正应力理论在拉压象限偏于危险；脆性库仑-莫尔偏于保守；修正莫尔拟合灰铸铁。
- 有裂纹时用断裂力学，载荷变化时进行疲劳分析。
:::

## 习题

::: exercise 米泽斯安全因数 {level=1 check="3"}
钢零件某点处$\sigma_x = 60\ \mathrm{MPa}$，$\sigma_y = -20\ \mathrm{MPa}$，$\tau_{xy} = 20\ \mathrm{MPa}$（平面应力）。钢的$S_y = 240\ \mathrm{MPa}$。按畸变能理论求安全因数。（输入$n$。）
::: solution
$$
\sigma' = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} = \sqrt{3600 + 1200 + 400 + 1200} = \sqrt{6400} = 80\ \mathrm{MPa},
$$
故$n = 240/80 = 3$。（特雷斯卡：$\sigma_{A,B} = 20 \pm 44.7\ \mathrm{MPa}$，$\sigma_A - \sigma_B = 89.4\ \mathrm{MPa}$，$n = 2.68$——一如既往地更低。）
:::
:::

::: exercise 扭杆的许用切应力 {level=1 check="60"}
一根受纯扭转的轴用$S_y = 300\ \mathrm{MPa}$的钢制造。设计因数为$2.5$，按最大切应力理论求最大许用切应力。（以 MPa 为单位输入。）
::: solution
特雷斯卡：$S_{sy} = 0.5\,S_y = 150\ \mathrm{MPa}$，故$\tau_{\text{all}} = 150/2.5 = 60\ \mathrm{MPa}$。畸变能理论允许$0.577 \times 300/2.5 = 69.3\ \mathrm{MPa}$。
:::
:::

::: exercise 脆性材料的缺口杆 {level=1 check="2"}
一根用缺口敏感的脆性材料（$S_{ut} = 300\ \mathrm{MPa}$）制成的杆上有一沟槽，$K_t = 2.0$，沟槽处的名义拉应力为$75\ \mathrm{MPa}$。求防止断裂的安全因数。（输入$n$。）
::: solution
对缺口敏感的脆性材料要计入$K_t$：$\sigma_{\max} = 2.0 \times 75 = 150\ \mathrm{MPa}$，$n = 300/150 = 2$。若杆为$S_y = 300\ \mathrm{MPa}$的塑性钢，静安全因数则为$300/75 = 4$。
:::
:::

::: exercise 塑性扁钢的净截面屈服 {level=2 check="2"}
一根宽$50\ \mathrm{mm}$、厚$8\ \mathrm{mm}$的塑性钢扁钢中部有一直径$10\ \mathrm{mm}$的孔，承受$40\ \mathrm{kN}$的静拉伸载荷。钢的$S_y = 250\ \mathrm{MPa}$，图表给出该孔的$K_t = 2.5$。求防止净截面屈服的静安全因数。（输入$n$。）
::: solution
$A_{\text{net}} = (50 - 10)(8) = 320\ \mathrm{mm^2}$；$\sigma_0 = 40\,000/320 = 125\ \mathrm{MPa}$。塑性材料在静载荷下不计$K_t$：$n = 250/125 = 2$。弹性峰值$312.5\ \mathrm{MPa}$超过$S_y$：孔边一个小区域屈服，对静载荷无害。
:::
:::

::: exercise 库仑-莫尔剪切强度 {level=2 check="144"}
某塑性材料的$S_{yt} = 240\ \mathrm{MPa}$，$S_{yc} = 360\ \mathrm{MPa}$。求塑性库仑-莫尔理论预测的剪切屈服强度。（以 MPa 为单位输入。）
::: solution
由[[#eq-cm-shear]]，$S_{sy} = S_{yt}S_{yc}/(S_{yt} + S_{yc}) = 240 \times 360/600 = 144\ \mathrm{MPa}$。校核：$144/240 + 144/360 = 0.6 + 0.4 = 1$。
:::
:::

::: exercise 压力容器的壁厚 {level=2 check="7.5"}
一个两端封闭的薄壁圆筒形容器，平均半径$500\ \mathrm{mm}$，内部表压$1.8\ \mathrm{MPa}$。取$S_y = 300\ \mathrm{MPa}$、$n_d = 2.5$，忽略径向应力，按最大切应力理论求所需壁厚。（以 mm 为单位输入。）
::: solution
主应力为$pr/t$、$pr/2t$、$0$；特雷斯卡：$\sigma_1 - \sigma_3 = pr/t = S_y/n_d$，故$t = 1.8 \times 500 \times 2.5/300 = 7.5\ \mathrm{mm}$。米泽斯：$\sigma' = \sqrt{\sigma_\theta^2 - \sigma_\theta\sigma_z + \sigma_z^2} = (\sqrt3/2)\,pr/t$，得$t = 6.50\ \mathrm{mm}$。
:::
:::

::: exercise 第四象限中的铸铁 {level=2 check="14/3"}
某灰铸铁的$S_{ut} = 200\ \mathrm{MPa}$，$S_{uc} = 700\ \mathrm{MPa}$。某点处$\sigma_A = 20\ \mathrm{MPa}$，$\sigma_B = -100\ \mathrm{MPa}$。按修正莫尔理论求安全因数。（输入$n$；可输入精确分数。）
::: solution
$\lvert\sigma_B/\sigma_A\rvert = 5 > 1$，故适用[[#eq-mm]]的第二行：
$$
\frac1n = \frac{(700 - 200)(20)}{700 \times 200} + \frac{100}{700} = \frac{1}{14} + \frac{2}{14} = \frac{3}{14}, \qquad n = \frac{14}{3} = 4.67 .
$$
脆性库仑-莫尔给出$1/n = 0.1 + 0.143 = 0.243$，$n = 4.12$；最大正应力理论给出$\min(10, 7) = 7$。
:::
:::

::: exercise 特雷斯卡与米泽斯之差从不超过 15.5 % {#ex-ratio level=3}
(a) 直接证明：当$\sigma_{A,B}$为面内主应力时，$\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = \sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2$。(b) 对一般状态$\sigma_1 \ge \sigma_2 \ge \sigma_3$，令$\sigma_2 = \sigma_3 + \lambda(\sigma_1 - \sigma_3)$，$0 \le \lambda \le 1$，证明$\sigma' = (\sigma_1 - \sigma_3)\sqrt{1 - \lambda + \lambda^2}$。(c) 由此推出$\tfrac{\sqrt3}{2}(\sigma_1 - \sigma_3) \le \sigma' \le \sigma_1 - \sigma_3$，并指出达到上下界的应力状态。
::: solution
(a) 令$C = (\sigma_x + \sigma_y)/2$，$R^2 = \bigl((\sigma_x - \sigma_y)/2\bigr)^2 + \tau_{xy}^2$，则$\sigma_{A,B} = C \pm R$。于是$\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = (\sigma_A + \sigma_B)^2 - 3\sigma_A\sigma_B = 4C^2 - 3(C^2 - R^2) = C^2 + 3R^2$。展开得$C^2 + 3R^2 = \tfrac14(\sigma_x + \sigma_y)^2 + \tfrac34(\sigma_x - \sigma_y)^2 + 3\tau_{xy}^2 = \sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2$。

(b) 令$D = \sigma_1 - \sigma_3$：$\sigma_1 - \sigma_2 = (1 - \lambda)D$，$\sigma_2 - \sigma_3 = \lambda D$，$\sigma_3 - \sigma_1 = -D$。由[[#eq-vm]]，$\sigma'^2 = \tfrac12 D^2\left[(1 - \lambda)^2 + \lambda^2 + 1\right] = D^2(1 - \lambda + \lambda^2)$。

(c) 在$[0, 1]$上，$1 - \lambda + \lambda^2$在$\lambda = \tfrac12$处取最小值$\tfrac34$，在$\lambda = 0$和$\lambda = 1$处取最大值$1$。所以$\sigma'/(\sigma_1 - \sigma_3)$介于$\sqrt3/2 = 0.866$与$1$之间。当$\sigma_2$恰在$\sigma_1$与$\sigma_3$正中——纯剪切叠加任意静水应力——时达到下界，此时特雷斯卡等效应力是米泽斯应力的$1/0.866 = 1.155$倍。当$\sigma_2$等于$\sigma_1$或$\sigma_3$时达到上界：单向应力和等双向应力（叠加任意静水应力），即六边形的顶点。
:::
:::

::: exercise 确定曲轴截面尺寸 {level=3}
一段短钢轴承受稳定弯矩$400\ \mathrm{N\,m}$和稳定扭矩$300\ \mathrm{N\,m}$。钢为塑性材料，$S_y = 420\ \mathrm{MPa}$，设计因数$n_d = 2.5$。(a) 分别按畸变能理论和最大切应力理论求最小直径。(b) 选定直径并求其安全因数。(c) 该截面紧邻一个$K_t = 1.7$的轴肩。讨论这是否改变静强度设计，以及在接受该轴之前还必须校核什么。
::: solution
(a) 表面处$\sigma_x = 32M/\pi d^3$，$\tau_{xy} = 16T/\pi d^3$，$\sigma' = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 3T^2}$。令$\sigma' = S_y/n_d$：
$$
d^3 = \frac{16\,n_d\sqrt{4M^2 + 3T^2}}{\pi S_y} = \frac{16 \times 2.5 \times \sqrt{4(400\times10^3)^2 + 3(300\times10^3)^2}}{\pi \times 420} = \frac{16 \times 2.5 \times 9.539\times10^{5}}{1319.5} = 2.892\times10^{4}\ \mathrm{mm^3},
$$
故$d = 30.7\ \mathrm{mm}$。特雷斯卡准则把$3T^2$换成$4T^2$，得$d = 31.2\ \mathrm{mm}$。

(b) 取$d = 32\ \mathrm{mm}$：$\sigma_x = 124.3\ \mathrm{MPa}$，$\tau_{xy} = 46.6\ \mathrm{MPa}$，$\sigma' = \sqrt{124.3^2 + 3 \times 46.6^2} = 148.3\ \mathrm{MPa}$，$n = 420/148.3 = 2.83$（特雷斯卡：$2.70$）。$30\ \mathrm{mm}$的轴给出$n = 2.33$，低于$n_d$。

(c) 静强度计算中，塑性钢不计轴肩的$K_t$。但如果轴是旋转的，稳定弯矩使表面每一点都经受对称循环弯曲，因此必须进行疲劳校核（[[machine-design/fatigue]]、[[machine-design/shafts]]），那时圆角的疲劳缺口系数很可能起控制作用，需要加大直径或圆角半径。还必须校核轴承和齿轮处的挠度和转角、临界转速、键槽，以及起动或过载时的峰值扭矩，$n_d$按适用的标准或企业规范选取。
:::
:::
