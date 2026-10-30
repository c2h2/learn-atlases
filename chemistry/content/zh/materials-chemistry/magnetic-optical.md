冰箱贴、硬盘的读出磁头、手机里使电源平滑的电容器、医院中的超声探头、红宝石的红、LED灯的正白、维米尔（Vermeer）画中群青的蓝，全都把自身的功能归功于固体中电子对场或光的响应方式。本章把三类功能材料放在一起讨论，因为同样的思想贯穿其中：局域的磁矩或电偶极子与相邻者*相互作用*，并在临界温度以下协同地有序化（铁磁体、反铁磁体、亚铁磁体、铁电体）；以及在能带之间或局域能级之间吸收与发射光的电子跃迁（颜料与荧光粉）。

孤立配合物的磁性——居里定律与仅自旋磁矩——是[[coordination-chemistry/magnetism]]的主题。这里我们让磁矩彼此对话。我们从外斯（Weiss）分子场导出居里-外斯定律，通过超交换解释反铁磁性，用奈尔（Néel）的模型解释尖晶石中的亚铁磁性，并认识磁畴、磁滞与永磁体。随后我们用朗道（Landau）理论处理铁电体，并以固体中颜色与发光的化学收尾：带隙颜料、配体场与电荷迁移颜色，以及现代照明中的镧系荧光粉。

## 协同磁性

::: definition 磁有序 {#def-magnetic-order}
在具有局域磁矩的固体中，相邻自旋之间的相互作用可以使它们的取向彼此相关。在临界温度以下磁矩有序化：
- **铁磁**有序：所有磁矩平行，在**居里温度**$T_\mathrm{C}$以下给出自发磁化强度$M_\mathrm{s}$（Fe、Co、Ni、$\mathrm{CrO_2}$、EuO）；
- **反铁磁**有序：两个相互穿插的子晶格上大小相等的磁矩指向相反，没有净磁化，有序化温度低于**奈尔温度**$T_\mathrm{N}$（MnO、NiO、$\mathrm{Cr_2O_3}$）；
- **亚铁磁**有序：反平行的子晶格磁矩*不相等*，在$T_\mathrm{C}$以下给出净的自发磁化（磁铁矿$\mathrm{Fe_3O_4}$、铁氧体与柘榴石）。

在有序化温度以上固体是顺磁的，其磁化率因相互作用而有所改变。
:::

承担这一相互作用的不是磁矩之间的磁偶极-偶极力——它太弱了——而是**交换作用**：它是泡利原理与电子-电子排斥的后果，使两个相邻电子的能量依赖于它们自旋的相对取向。海森堡（Werner Heisenberg）1928年证明它可以写成$-2J\,\mathbf{S}_i\cdot\mathbf{S}_j$，与[[coordination-chemistry/magnetism]]中双核配合物所用的形式相同：$J > 0$偏好自旋平行，$J < 0$偏好反平行。

::: proposition 由分子场导出居里-外斯定律 {#prop-curie-weiss}
设每个磁矩除外场$H$外还感受到一个与磁化强度成正比的内部**分子场**$\lambda M$，它代表与近邻交换作用的平均值。若磁矩本来服从居里定律$M = C H_\mathrm{eff}/T$，则在有序化温度以上
$$
\chi = \frac{M}{H} = \frac{C}{T - \theta}, \qquad \theta = \lambda C.
$$ {#eq-curie-weiss}
对$\lambda > 0$（铁磁相互作用），$\theta = T_\mathrm{C} > 0$，且$\chi$在$T_\mathrm{C}$处发散；在其以下，$S = \tfrac12$自旋的自发磁化满足$m = \tanh(mT_\mathrm{C}/T)$，其中$m = M/M_\mathrm{sat}$。对反铁磁相互作用$\theta < 0$，$\chi$保持有限。平均场近似忽略短程关联，因此高估有序化温度，并给出其附近错误的临界行为。
:::

::: proof
由$H_\mathrm{eff} = H + \lambda M$，居里定律给出$M = (C/T)(H + \lambda M)$。把含$M$的项归并：$M(1 - \lambda C/T) = CH/T$，所以$M = CH/(T - \lambda C)$，$\chi = C/(T - \theta)$，$\theta = \lambda C$。当$T < \theta$（$\lambda > 0$）时，$H = 0$也可以存在非零的$M$，由它自己的分子场维持。对磁矩为$\mu$的$S = \tfrac12$自旋，场$B_\mathrm{eff}$中的精确（而非线性化的）磁化为$M = M_\mathrm{sat}\tanh(\mu B_\mathrm{eff}/k_\mathrm{B}T)$（[[coordination-chemistry/magnetism]]中的二能级结果）。令$H = 0$、$B_\mathrm{eff} = \mu_0\lambda M$，并对单位体积$n$个磁矩用$C = \mu_0 n\mu^2/k_\mathrm{B}$、$M_\mathrm{sat} = n\mu$，自变量成为$\mu_0\lambda n\mu^2 m/k_\mathrm{B}T = \lambda Cm/T = mT_\mathrm{C}/T$，于是$m = \tanh(mT_\mathrm{C}/T)$。只有当$T < T_\mathrm{C}$时它才有非零解，此时$\tanh(mT_\mathrm{C}/T)$在$m = 0$处的斜率超过1。
:::

::: widget parametric
fx: 2*t/log((1 + t)/(1 - t))
fy: t
t: 0.001, 0.999
x: 0, 1.2
y: 0, 1.05
equal: false
caption: 平均场模型中$S = \tfrac12$的自发磁化强度$m = M/M_\mathrm{sat}$对约化温度$T/T_\mathrm{C}$的曲线，见[[#prop-curie-weiss]]。曲线以参数形式绘制：对每个$m$，满足$m = \tanh(mT_\mathrm{C}/T)$的温度是$T/T_\mathrm{C} = m/\operatorname{artanh}m = 2m/\ln[(1 + m)/(1 - m)]$。磁化强度在低温下接近饱和，先缓慢下降、继而陡降，并在$T_\mathrm{C}$处按$(T_\mathrm{C} - T)^{1/2}$趋于零。铁与镍的实测曲线除靠近$T_\mathrm{C}$外都很好地遵循这一形状；在$T_\mathrm{C}$附近它们下降得更陡（按$(T_\mathrm{C} - T)^{0.33}$到$(T_\mathrm{C} - T)^{0.37}$），因为那里的涨落很重要，而平均场忽略了涨落。
:::

::: example 分子场有多强？ {#ex-weiss}
铁的$T_\mathrm{C} = 1043\ \mathrm{K}$。由$\mu_\mathrm{B}B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}$，估算在$T_\mathrm{C}$下足以使一个玻尔磁子的磁矩对抗热运动而取向的有效场$B_\mathrm{mf}$，并与一个相邻磁矩的磁偶极场（$r = 2.5\ \text{Å}$处约为$\mu_0\mu_\mathrm{B}/4\pi r^3$）比较。
::: solution
$B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}/\mu_\mathrm{B} = 1.381\times10^{-23} \times 1043/9.274\times10^{-24} = 1.55\times10^3\ \mathrm{T}$。偶极场为$10^{-7} \times 9.274\times10^{-24}/(2.5\times10^{-10})^3 = 0.059\ \mathrm{T}$，约小$3\times10^4$倍。偶极之间的任何磁相互作用都不可能使铁在$1043\ \mathrm{K}$有序；这个“场”只是描述交换作用的一种方式，而交换是电子关联的静电效应。这正是外斯1907年的困惑，直到二十年后量子力学才解决了它。
:::
:::

### 反铁磁性与超交换

在离子型氧化物与卤化物中，磁性离子被阴离子隔开，它们的自旋经由阴离子的轨道相互作用，这一机理称为**超交换**。考察被一条直线上一个氧离子连接的两个$\mathrm{Ni^{2+}}$，如NiO。每个镍有一个未成对电子位于指向氧的$e_g$轨道，该轨道与同一个氧$2p$轨道重叠。氧的$p$轨道上有两个自旋相反的电子。氧上自朝上电子向其中一个镍的部分转移只有当该镍的$e_g$电子自旋朝下时才被允许（泡利原理），而自朝下电子向另一个镍转移只有当*它*的电子自旋朝上时才被允许。因此降低能量的共价混合偏向于两个金属上的自旋反平行。**古迪纳夫-金森顺次郎（Goodenough–Kanamori）规则**（1955–59年）把这类论证总结如下：半满轨道之间$180^\circ$的M–O–M键给出强的反铁磁耦合；$90^\circ$的键中两个金属使用相互正交的氧轨道，给出较弱、常常是铁磁的耦合。

$3d$金属的岩盐型一氧化物是经典的反铁磁体，沿磁化方向交替的铁磁性(111)层有序化：MnO（$T_\mathrm{N} = 118\ \mathrm{K}$）、FeO（$198\ \mathrm{K}$）、CoO（$291\ \mathrm{K}$）与NiO（$525\ \mathrm{K}$）。磁晶胞沿每个轴都是化学晶胞的两倍，所以中子衍射（[[materials-chemistry/diffraction]]）在$T_\mathrm{N}$以下显示额外的“磁性”反射：舒尔（Clifford Shull）与斯马特（J. Samuel Smart）1949年对MnO的中子研究是反铁磁有序的第一次直接观察。$T_\mathrm{N}$以上磁化率服从[[#eq-curie-weiss]]且$\theta$为负；对理想的两子晶格反铁磁体，平均场理论预言$\lvert\theta\rvert = T_\mathrm{N}$，但MnO中$\lvert\theta\rvert/T_\mathrm{N}$约为5，这是**阻挫**的迹象：在面心立方晶格上，不可能让所有近邻自旋同时两两反平行。

::: example 反铁磁体的居里-外斯分析 {#ex-mno}
一份MnO样品的摩尔磁化率（cgs制，已作抗磁修正）在$300\ \mathrm{K}$为$1/\chi_\mathrm{m} = 208.0\ \mathrm{mol\,cm^{-3}}$，在$600\ \mathrm{K}$为$276.6\ \mathrm{mol\,cm^{-3}}$（由本例的居里-外斯定律生成的数值）。求$C$、$\theta$与$\mu_\mathrm{eff}$，并与$T_\mathrm{N} = 118\ \mathrm{K}$比较。
::: solution
$1/\chi = (T - \theta)/C$对$T$是线性的，斜率为$1/C$。斜率$= (276.6 - 208.0)/300 = 0.2287\ \mathrm{mol\,cm^{-3}\,K^{-1}}$，所以$C = 4.37\ \mathrm{cm^3\,K\,mol^{-1}}$。对温度轴的截距：$T - \theta = 208.0 \times 4.37 = 909\ \mathrm{K}$在$T = 300\ \mathrm{K}$，所以$\theta = -610\ \mathrm{K}$（按取舍方式不同更精确地为$-609$到$-610$）。于是$\mu_\mathrm{eff} = 2.828\sqrt{C} = 2.828\sqrt{4.37} = 5.91\ \mu_\mathrm{B}$，即五个未成对电子的仅自旋值，与高自旋$\mathrm{Mn^{2+}}$相符。比值$\lvert\theta\rvert/T_\mathrm{N} = 610/118 = 5.2$标志着强阻挫。尽可能要在$\lvert\theta\rvert$之上很远的位置提取居里常数；这里数据点距零点不足$\lvert\theta\rvert，实际测量中短程有序可能已使直线弯曲。
:::
:::

### 尖晶石中的亚铁磁性

奈尔1948年解释了为什么磁铁矿与铁氧体虽然相互作用是反铁磁的，却具有强磁性。在尖晶石（[[materials-chemistry/crystal-structures]]）中，最强的超交换发生在四面体（A）位与八面体（B）位之间，经由约$125^\circ$的A–O–B键角。它使所有A磁矩与所有B磁矩反平行。因为B位的数目是A位的两倍，两个子晶格的磁化强度不能抵消。

::: example 磁铁矿的饱和磁矩 {#ex-magnetite}
(a) 用奈尔模型与反尖晶石分布$\mathrm{Fe^{3+}[Fe^{2+}Fe^{3+}]O_4}$预言每个化学式单位的饱和磁矩。(b) 把它换算成以$\mathrm{A\,m^{-1}}$计的饱和磁化强度（$a = 8.396\ \text{Å}$，$Z = 8$），并与低温实测值（约$5.0\times10^5\ \mathrm{A\,m^{-1}}$）比较。(c) 若为正尖晶石分布，会预言什么？
::: solution
(a) 高自旋$\mathrm{Fe^{3+}}$（$d^5$）贡献$5\ \mu_\mathrm{B}$，$\mathrm{Fe^{2+}}$（$d^6$）贡献$4\ \mu_\mathrm{B}$（仅自旋，$g = 2$，每离子$gS$）。A位：$5$（一个方向）；B位：$4 + 5 = 9$（另一方向）。净磁矩：$9 - 5 = 4\ \mu_\mathrm{B}$（每个化学式单位）；$\mathrm{Fe^{3+}}$的磁矩相互抵消，只剩$\mathrm{Fe^{2+}}$。实测值为$4.1\ \mu_\mathrm{B}$。(b) $M_\mathrm{s} = 8 \times 4 \times 9.274\times10^{-24}\ \mathrm{A\,m^2}/(8.396\times10^{-10}\ \mathrm{m})^3 = 2.968\times10^{-22}/5.919\times10^{-28} = 5.01\times10^5\ \mathrm{A\,m^{-1}}$，与实验一致。(c) 正尖晶石$\mathrm{Fe^{2+}[Fe^{3+}_2]O_4}$会给出$10 - 4 = 6\ \mu_\mathrm{B}$。实测磁矩因而是反型结构的独立证据，这一反型由配体场占位偏好所预言。
:::
:::

### 磁畴、磁滞与永磁体

一块铁通常并不被磁化，尽管它的每一个区域都是磁化到饱和的。它分成**磁畴**，每个畴沿一条易磁化轴磁化到饱和、但各畴取向不同，畴之间由**畴壁**隔开，磁化强度在壁内在几十纳米的范围内旋转。磁畴降低了均匀磁化的物体本应产生的外磁场能量。外加磁场通过移动畴壁使取向有利的畴长大，然后使其余的磁化强度转到场的方向。撤去场后畴壁并不都退回去，因为它们被缺陷与晶界钉扎，于是磁化强度沿一条**磁滞回线**变化，以剩磁$M_\mathrm{r}$与使$M$回到零所需的矫顽场$H_\mathrm{c}$表征。

**软**磁体的$H_\mathrm{c}$低于约$10^3\ \mathrm{A\,m^{-1}}$，用于变压器铁芯与电感器，那里回线必须以很小的每周期能量损耗反复遍历：硅钢、坡莫合金（Ni-Fe），以及$\mathrm{Mn}_{1-x}\mathrm{Zn}_x\mathrm{Fe_2O_4}$一类的铁氧体——后者是绝缘体，高频下没有涡流损耗。**硬**（永久）磁体需要大的$H_\mathrm{c}$，它来自强的**磁晶各向异性**——磁化偏离结晶轴的能量代价，追根溯源来自自旋-轨道耦合。六方铁氧体$\mathrm{BaFe_{12}O_{19}}$便宜，用于冰箱贴与扬声器。$\mathrm{SmCo_5}$（1960年代）与$\mathrm{Nd_2Fe_{14}B}$（1984年由佐川真人（Masato Sagawa）所在的住友公司团队与John Croat所在的通用汽车公司宣布）把铁或钴的大磁矩与$4f$离子的各向异性结合起来，钕磁体现在是电动汽车电机与风力发电机必不可少的材料。其品质因数是最大磁能积$(BH)_\mathrm{max}$，最好的Nd-Fe-B牌号超过$400\ \mathrm{kJ\,m^{-3}}$。

::: warning 亚铁磁体不是“弱铁磁体”，$T_\mathrm{C}$也不是熔点 {#warn-ferri}
两种混淆反复出现。(1) 因为亚铁磁体有净磁矩与磁滞，日常和工程语言中常称之为铁磁的。这一区别在化学上要紧：铁氧体的磁矩是子晶格磁矩之*差*，所以取代以非磁性离子反而可能*增大*它（从少数子晶格移走磁矩），掺锌的镍铁氧体即是；真正铁磁体中决不会发生这样的事。(2) 把磁体加热到$T_\mathrm{C}$以上会破坏自旋的长程有序，但磁矩本身与晶体结构仍在，材料变为顺磁。冷却时有序恢复，却取随机取向的磁畴，于是永磁体退磁了。
:::

## 介电与铁电材料

电场使任何绝缘体极化：电子云相对核的位移（电子极化）、离子之间的相对位移（离子极化），而在液体与某些固体中还有永久偶极子的取向。响应以相对介电常数$\varepsilon_\mathrm{r}$量度，$P = \varepsilon_0(\varepsilon_\mathrm{r} - 1)E$。大多数氧化物的$\varepsilon_\mathrm{r}$为5–30。少数材料的值达数千，因为其中某种离子位于极浅的势阱中、易于移动：这些就是**铁电体**及其近亲。

对称性决定哪些性质可能存在。32个晶体学点群中有11个具有对称中心。21个无对称中心的晶类中，20个是**压电**的（受应力而极化；石英、ZnO、AlN），其中10个是**极性**的，具有一条唯一轴，沿它可以存在自发极化；极性晶体是**热释电**的，其极化随温度改变。**铁电体**是一种极性晶体，其自发极化可以被外加电场翻转，给出$P$对$E$的磁滞回线，与铁磁体的回线类似。

钛酸钡是原型。它的容差因子$t = 1.06$（[[materials-chemistry/crystal-structures#ex-tolerance]]）意味着$\mathrm{Ti^{4+}}$离子对它的八面体来说太小。$120\,^\circ\mathrm{C}$以上它是立方的，Ti绕中心振动；以下它朝某个氧移动约$0.1\ \text{Å}$，结构变为四方、极性，继续冷却还有到正交与菱方相的转变。二阶姜-泰勒（伪姜-泰勒）效应给出化学解释：偏离中心的位移把空的Ti $3d$轨道与满的O $2p$轨道混合起来，使一条Ti–O键增强的程度大于使相对那条键减弱的程度。这就是铁电钙钛矿如此常见地含有$d^0$离子（$\mathrm{Ti^{4+}}$、$\mathrm{Nb^{5+}}$、$\mathrm{Zr^{4+}}$）或带立体化学活性孤对电子的离子（$\mathrm{Pb^{2+}}$、$\mathrm{Bi^{3+}}$）的原因。

::: proposition 铁电转变的朗道理论 {#prop-landau}
在连续（二级）转变附近，把吉布斯自由能密度按极化$P$写成幂级数；零场下对称性只允许偶次项：
$$
G(P) = G_0 + \tfrac12a(T - T_0)P^2 + \tfrac14bP^4 - EP, \qquad a, b > 0.
$$ {#eq-landau}
于是(i) 当$T < T_0$、$E = 0$时存在自发极化$P_\mathrm{s} = \pm\sqrt{a(T_0 - T)/b}$；(ii) 当$T > T_0$时介电率服从居里-外斯定律，$\chi = \partial P/\partial(\varepsilon_0E) = 1/[\varepsilon_0a(T - T_0)]$。$T_0$以下$\chi = 1/[2\varepsilon_0a(T_0 - T)]$。这一展开只对小的$P$、靠近$T_0$时成立；$\mathrm{BaTiO_3}$那样的二级以上（一级）转变需要$b < 0$与$P^6$项。
:::

::: proof
平衡要求$\partial G/\partial P = 0$：$a(T - T_0)P + bP^3 = E$。令$E = 0$，或者$P = 0$，或者$P^2 = a(T_0 - T)/b$，后者只在$T_0$以下为实数；那里$P = 0$处的二阶导数$a(T - T_0)$为负，所以$P = 0$是极大，两个极化态才是极小。对于磁化率那样的响应，把平衡条件对$E$求导：$[a(T - T_0) + 3bP^2]\,\partial P/\partial E = 1$。$T_0$以上零场中$P = 0$，$\partial P/\partial E = 1/[a(T - T_0)]$，得居里-外斯形式。$T_0$以下$3bP_\mathrm{s}^2 = 3a(T_0 - T)$，方括号成为$2a(T_0 - T)$：磁化率那样的响应量从两侧都发散，下方发散得快一倍。除以$\varepsilon_0$把$\partial P/\partial E$化成无量纲的$\chi$，$\varepsilon_\mathrm{r} = 1 + \chi$在$T_0$处达峰。
:::

::: widget plot
f: (t - 1)*x^2/2 + x^4/4
x: -1.8, 1.8
y: -0.6, 1
sliders: t=1.3:0.2:1.6:0.01
labels: G(P) - G_0\ (\text{约化单位})
caption: 约化单位下的朗道自由能[[#eq-landau]]（$a = b = 1$、$T_0 = 1$、$E = 0$）对极化$x$的曲线，约化温度$t = T/T_0$由滑条设定。$t > 1$时在$P = 0$处有一个极小（顺电）。$t$下降时该极小变得平坦，小场就能产生大极化：这就是介电常数峰。$t = 1$以下曲线发展成双势阱，极小位于$P = \pm\sqrt{1 - t}$，即铁电存储器中场在其间切换的两个极化态。
:::

铁电及相关陶瓷是制造量最大的功能材料之一。以$\mathrm{BaTiO_3}$为基础、介电常数达数千的多层陶瓷电容器，年产量以万亿计。锆钛酸铅（PZT）$\mathrm{Pb(Zr,Ti)O_3}$在其准同型相界（约$\mathrm{Zr : Ti} = 52 : 48$）附近，是超声换能器、声呐、致动器与喷墨打印头用压电材料的主流；因铅的毒性，基于$\mathrm{(K,Na)NbO_3}$与$\mathrm{(Bi,Na)TiO_3}$的无铅替代品正在开发中。**多铁材料**如$\mathrm{BiFeO_3}$，在同一相中兼有铁电与磁性有序。

::: quiz
下列哪些材料可以是压电的？
- [x] 石英，$\alpha$-$\mathrm{SiO_2}$（点群32）
- [ ] 岩盐，NaCl（点群$m\bar3m$）
- [x] 纤锌矿ZnO（点群$6mm$）
- [x] 四方$\mathrm{BaTiO_3}$（点群$4mm$）
- [ ] $120\,^\circ\mathrm{C}$以上的立方$\mathrm{BaTiO_3}$（点群$m\bar3m$）
::: solution
压电性要求不存在对称中心。$m\bar3m$具有对称中心，所以NaCl与立方$\mathrm{BaTiO_3}$不可能压电。石英（32）无对称中心但无极性：压电而非热释电。ZnO（$6mm$）与四方$\mathrm{BaTiO_3}$（$4mm$）是极性的，因而既压电又热释电；只有$\mathrm{BaTiO_3}$是铁电的，因为它的极化可以被场翻转，而翻转ZnO的极化必须断键。
:::
:::

## 固体的颜色与发光

固体吸收可见光谱（$1.7$–$3.1\ \mathrm{eV}$，$400$–$730\ \mathrm{nm}$）的一部分时便显出颜色；我们看到的是被吸收部分之余的补色。四种电子机理几乎解释了全部无机颜色。

1. **带隙吸收。**半导体吸收一切$h\nu > E_\mathrm{g}$的光子（[[materials-chemistry/electronic-structure-solids]]）。若$E_\mathrm{g} > 3.1\ \mathrm{eV}$，固体为白色或无色（ZnO、$\mathrm{TiO_2}$——最重要的白色颜料）；当$E_\mathrm{g}$落入可见区，吸收便从光谱紫端开始蚕食，依次给出黄色（$\mathrm{CdS}$，$2.4\ \mathrm{eV}$）、橙色（CdS-CdSe固溶体）、红色（HgS，朱砂，$2.0\ \mathrm{eV}$）与黑色（$E_\mathrm{g} < 1.7\ \mathrm{eV}$：Si、GaAs）。带隙颜料因而从不出蓝色或绿色。
2. 主体中过渡金属离子的**配体场（d-d）跃迁**：$\mathrm{Al_2O_3}$中的$\mathrm{Cr^{3+}}$（红宝石，红）与绿柱石中的$\mathrm{Cr^{3+}}$（祖母绿，绿），$\mathrm{CoAl_2O_4}$四面体位上的$\mathrm{Co^{2+}}$（钴蓝），$\mathrm{Cr_2O_3}$（绿）。同一种离子在不同主体中颜色不同，因为$\Delta_\mathrm{o}$取决于金属-氧距离与共价性（[[coordination-chemistry/spectra-of-complexes]]）。
3. **电荷迁移**：配体到金属（铬酸盐的黄色）、金属-金属间隔电荷迁移（普鲁士蓝的深蓝，$\mathrm{Fe^{II}}$-CN-$\mathrm{Fe^{III}}$；蓝宝石由$\mathrm{Fe^{2+}}$-$\mathrm{Ti^{4+}}$对产生的蓝），以及被俘获的分子物种中的跃迁，如群青中方钠石笼里的$\mathrm{S_3^-}$自由基阴离子——这种颜料过去由青金石研磨而得。
4. **缺陷中心**：[[materials-chemistry/defects]]中的F心，以及烟水晶与被辐照钻石的颜色。

::: example 带隙给出的颜色 {#ex-colour}
预言(a) ZnO（$E_\mathrm{g} = 3.37\ \mathrm{eV}$）、(b) CdS（$2.42\ \mathrm{eV}$）、(c) HgS（$2.0\ \mathrm{eV}$）与(d) GaP（$2.26\ \mathrm{eV}$，间接带隙）的颜色。
::: solution
吸收边在$\lambda = 1240/E_\mathrm{g}\ \mathrm{nm}$，比它短的一切都被吸收。(a) $368\ \mathrm{nm}$，在近紫外：不吸收任何可见光，细ZnO粉末是白色的（它是防晒品中吸收紫外的颜料）。(b) $512\ \mathrm{nm}$：吸收紫、蓝与部分蓝绿，剩下黄色到橙黄（镉黄）。(c) $620\ \mathrm{nm}$：除红光外全部被吸收：朱砂红。(d) $549\ \mathrm{nm}$：橙黄，但比CdS浅淡，因为间接带隙的吸收随光子能量上升得缓慢（[[materials-chemistry/electronic-structure-solids]]）。实际的吸收边并不完全锐利，所以颜色变柔和，而颗粒大小与散射会影响颜料的外观。镉与汞颜料有毒，其使用现已受到限制。
:::
:::

### 荧光粉与发光

**发光**是从与非热平衡的激发态辐射光。**荧光粉**是一种固体，通常是掺入**激活剂**离子的宽带隙主体，它吸收高能量光（或电子、或X射线）并以更长的波长发射。

::: definition 量子产率与斯托克斯位移 {#def-luminescence}
发光材料的**量子产率**$\Phi$是发射光子数与吸收光子数之比。**斯托克斯位移**是吸收（激发）峰与发射峰之间的能量差，由激发态几何在发光前的弛豫造成。即使$\Phi = 1$，吸收能量中仍有$1 - \lambda_\mathrm{exc}/\lambda_\mathrm{em}$的比例以热的形式损失（**斯托克斯损失**），因为每个发射光子携带的能量比吸收的少。
:::

两类激活剂占主导。**三价镧系离子**（$\mathrm{Eu^{3+}}$、$\mathrm{Tb^{3+}}$）经$4f$-$4f$跃迁发光，这些跃迁被满的$5s$、$5p$壳层从主体中屏蔽起来；发射是波长几乎与主体无关的锐线（$\mathrm{Eu^{3+}}$在约$611\ \mathrm{nm}$发红光，$\mathrm{Tb^{3+}}$在$545\ \mathrm{nm}$发绿光），寿命长（毫秒量级，因为跃迁是拉波特禁阻的），斯托克斯位移极小（[[coordination-chemistry/f-block]]）。**$4f$-$5d$发光体**（$\mathrm{Eu^{2+}}$、$\mathrm{Ce^{3+}}$）的跃迁是允许的，且$5d$轨道强烈感受晶体场，所以给出宽带的发射、其颜色可由主体调节：$\mathrm{BaMgAl_{10}O_{17}:Eu^{2+}}$发蓝光，$\mathrm{Y_3Al_5O_{12}:Ce^{3+}}$（YAG:Ce）吸收蓝光而发射宽的黄带。日亚化学（Nichia）公司1996年推出的涂YAG:Ce的蓝色InGaN LED给出白光，是绝大多数白光LED灯的基础；再加入红色氮化物荧光粉如$\mathrm{CaAlSiN_3:Eu^{2+}}$可改善显色性。荧光灯使用被$254\ \mathrm{nm}$汞线激发的$\mathrm{Eu^{3+}}$、$\mathrm{Tb^{3+}}$与$\mathrm{Eu^{2+}}$荧光粉；**激光器**如红宝石（1960年）与Nd:YAG（$1064\ \mathrm{nm}$）用的是同一掺杂绝缘体原理，加上粒子数反转。

当激发态能够不发光地失去能量时，发光就被猝灭：交给晶格振动（热猝灭，在高温下、以及发光能级与下一能级间隔小时更严重），或经相邻激活剂离子之间的能量传递，直到被某个缺陷吸收（**浓度猝灭**），这就是激活剂只掺入百分之几的原因。

::: example 白光LED的能量收支 {#ex-led}
一只白光LED使用$460\ \mathrm{nm}$的蓝色芯片与YAG:Ce，后者把部分蓝光转换为中心在$550\ \mathrm{nm}$的黄光，量子产率$0.95$。(a) 每个被转换的光子有多少比例的能量在荧光粉中损失为热？(b) 被荧光粉吸收的$100$个蓝光子，以吸收能量的分数计，有多少以黄光形式重新射出？
::: solution
(a) 光子能量正比于$1/\lambda$，所以被转换的光子保留$460/550 = 0.836$的能量：斯托克斯损失为$16.4\ \%$。(b) 射出$95$个黄光子，携带吸收能量的$0.95 \times 0.836 = 0.795$；约$20\ \%$变成荧光粉中的热。这部分热使荧光粉温度升高、热猝灭加剧，所以大功率LED需要猝灭温度高、热接触良好的荧光粉。
:::
:::

## 后续内容

本章的亚铁磁氧化物在[[materials-chemistry/nanomaterials]]中以纳米颗粒的面目重现，尺寸在那里改变它们的磁性（超顺磁性）与颜色（量子点、等离激元金）。[[materials-chemistry/energy-materials]]中的电极材料常是磁性而有颜色的过渡金属氧化物，其氧化态在循环中改变，而铜氧化物超导体是掺杂的反铁磁体。颜色背后的电子结构见[[materials-chemistry/electronic-structure-solids]]与[[coordination-chemistry/spectra-of-complexes]]；磁有序的物理（包括自旋波）见物理图谱（[凝聚态：磁性与超导](/learn/physics/lesson.php?c=condensed-matter&l=magnetism-superconductivity)）。

::: history
皮埃尔·居里（Pierre Curie）1895年证明铁磁性在临界温度以上消失，外斯（Pierre Weiss）1907年提出分子场与磁畴。海森堡1928年把分子场解释为量子力学的交换作用。奈尔1932–36年预言了反铁磁性，1948年解释了尖晶石铁氧体的亚铁磁性（1970年诺贝尔物理学奖）；舒尔与斯马特1949年由中子衍射观察到MnO中的反铁磁有序；安德森（Philip Anderson）1950年建立了超交换理论，古迪纳夫与金森顺次郎在1955–59年提出了他们的规则。雅克与皮埃尔·居里（Jacques and Pierre Curie）1880年发现压电性，瓦拉谢克（Joseph Valasek）1920–21年在酒石酸钾钠中发现铁电性，钛酸钡的铁电性则在二战期间由美国、苏联（武尔（Bentsion Vul））与日本的几个课题组发现。朗道的相变理论始于1937年。梅曼（Theodore Maiman）的红宝石激光器（1960年）、1960年代彩色电视所用的稀土荧光粉与Nd-Fe-B磁体（1984年），都出自掺杂固体的化学。
:::

::: summary
- 耦合相邻磁矩的是交换作用而不是偶极相互作用；平均场理论给出居里-外斯定律$\chi = C/(T - \theta)$，铁磁相互作用$\theta > 0$、反铁磁相互作用$\theta < 0$，且$T_\mathrm{C}$以下$m = \tanh(mT_\mathrm{C}/T)$。
- 在氧化物中，半满轨道之间经$180^\circ$ M-O-M连接的超交换给出反铁磁性（MnO、NiO），可由中子衍射探测；阻挫使$\lvert\theta\rvert \gg T_\mathrm{N}$。
- 亚铁磁体有反平行而不等的子晶格；反尖晶石$\mathrm{Fe_3O_4}$中$\mathrm{Fe^{3+}}$的磁矩相互抵消，每化学式单位留下$4\ \mu_\mathrm{B}$。
- 磁畴、畴壁钉扎与磁晶各向异性产生磁滞：软磁体用于铁芯，硬磁体（$\mathrm{BaFe_{12}O_{19}}$、$\mathrm{SmCo_5}$、$\mathrm{Nd_2Fe_{14}B}$）用于永久磁场。
- 无对称中心的晶体可以是压电的，极性的是热释电的，极化可翻转的是铁电的；朗道理论给出$P_\mathrm{s} \propto (T_0 - T)^{1/2}$与居里-外斯型的介电常数；$d^0$离子与孤对电子有利于铁电钙钛矿。
- 无机颜色来自带隙（随$E_\mathrm{g}$降低依次呈白、黄、红、黑）、d-d跃迁、电荷迁移与缺陷中心。
- 荧光粉是掺杂的主体：$\mathrm{Eu^{3+}}$与$\mathrm{Tb^{3+}}$给出锐利的$4f$-$4f$谱线，$\mathrm{Eu^{2+}}$与$\mathrm{Ce^{3+}}$给出可调的宽$4f$-$5d$带；效率受量子产率、斯托克斯损失与猝灭的限制。
:::

## 练习

::: exercise 一个铁氧体的磁矩 {level=1 check="2"}
镍铁氧体$\mathrm{NiFe_2O_4}$是反尖晶石，$\mathrm{Fe^{3+}[Ni^{2+}Fe^{3+}]O_4}$。预言它每个化学式单位的饱和磁矩（仅自旋）。（以$\mu_\mathrm{B}$输入磁矩。）
::: solution
A位：$\mathrm{Fe^{3+}}$，$5\ \mu_\mathrm{B}$。B位：$\mathrm{Ni^{2+}}$（$d^8$，两个未成对电子）$2\ \mu_\mathrm{B}$加$\mathrm{Fe^{3+}}$ $5\ \mu_\mathrm{B}$ $= 7$。净值$7 - 5 = 2\ \mu_\mathrm{B}$（实测约$2.2$，多出的部分来自镍的轨道贡献）。
:::
:::

::: exercise 一种白色颜料 {level=1 check="368"}
金红石型$\mathrm{TiO_2}$的$E_\mathrm{g} = 3.0\ \mathrm{eV}$，ZnO为$3.37\ \mathrm{eV}$。计算ZnO的吸收边波长，并解释二者为什么都是白色的。（以nm输入ZnO的波长，三位有效数字。）
::: solution
$\lambda = 1240/3.37 = 368\ \mathrm{nm}$。金红石为$413\ \mathrm{nm}$，在紫端边缘。二者在可见区都几乎不吸收，而其高折射率（金红石2.6–2.9）强烈散射光，所以细粉末看起来雪白。金红石轻微吸收紫光，色调略偏暖；带隙更大的锐钛矿则白中偏蓝。
:::
:::

::: exercise 有序化温度 {level=1}
将下列物质在室温下各归类为铁磁、反铁磁或亚铁磁，并说明加热到其有序化温度以上会发生什么：(a) NiO（$T_\mathrm{N} = 525\ \mathrm{K}$）；(b) $\mathrm{Fe_3O_4}$（$T_\mathrm{C} = 858\ \mathrm{K}$）；(c) 钆（$T_\mathrm{C} = 293\ \mathrm{K}$）；(d) $\mathrm{CrO_2}$（$T_\mathrm{C} = 386\ \mathrm{K}$）。
::: solution
(a) 反铁磁；$525\ \mathrm{K}$以上为顺磁，$\chi$在$T_\mathrm{N}$附近出现峰。(b) 亚铁磁；$858\ \mathrm{K}$以上为顺磁。(c) 钆在略低于室温处有序化，所以$298\ \mathrm{K}$时它几乎只是顺磁的；稍加冷却即为铁磁，这使它可用于室温附近的磁制冷。(d) 铁磁（一种曾用于磁记录带的半金属）；$386\ \mathrm{K}$以上为顺磁。各种情形下，磁矩都在有序化温度之上依然存在；失去的只是它们的长程排列。
:::
:::

::: exercise 由数据求居里-外斯 {level=2 check="-610"}
一份氧化锰(II)样品的$1/\chi_\mathrm{m}$（cgs制）在$300\ \mathrm{K}$为$208.0\ \mathrm{mol\,cm^{-3}}$，在$450\ \mathrm{K}$为$242.3\ \mathrm{mol\,cm^{-3}}$。求$\theta$。（以K输入$\theta$，三位有效数字。）
::: solution
斜率$= (242.3 - 208.0)/150 = 0.2287$，$C = 4.373\ \mathrm{cm^3\,K\,mol^{-1}}$。在$300\ \mathrm{K}$：$T - \theta = 208.0 \times 4.373 = 909.6$，所以$\theta = 300 - 909.6 = -610\ \mathrm{K}$。负号表明反铁磁相互作用，而$\mu_\mathrm{eff} = 2.828\sqrt{4.373} = 5.91\ \mu_\mathrm{B}$证实高自旋$\mathrm{Mn^{2+}}$。
:::
:::

::: exercise 镍的外斯场 {level=2 check="930"}
镍的$T_\mathrm{C} = 627\ \mathrm{K}$。由$\mu_\mathrm{B}B_\mathrm{mf} \approx k_\mathrm{B}T_\mathrm{C}$估算分子场。（以特斯拉输入$B_\mathrm{mf}$，两位有效数字。）
::: solution
$B_\mathrm{mf} = 1.381\times10^{-23} \times 627/9.274\times10^{-24} = 934\ \mathrm{T} \approx 930\ \mathrm{T}$，约是最强稳态实验室磁场的二十倍。与铁一样，它代表的是交换作用，而不是真实的磁场。
:::
:::

::: exercise 斯托克斯损失 {level=2 check="0.836"}
一种荧光粉在$460\ \mathrm{nm}$吸收、在$550\ \mathrm{nm}$发射，量子产率为1。吸收的能量有多大比例以光的形式发射出去？若换成在$460\ \mathrm{nm}$吸收、$630\ \mathrm{nm}$发射的红色荧光粉呢？（以三位有效数字输入第一种荧光粉的比例。）
::: solution
$460/550 = 0.836$；红色荧光粉为$460/630 = 0.730$。红色荧光粉在能量上先天效率较低，而眼睛对深红也不那么敏感，这就是LED照明中效率-显色性权衡由红色荧光粉的选择主导的原因。
:::
:::

::: exercise 朗指数 {level=3 check="0.5"}
(a) 由[[#prop-landau]]证明$P_\mathrm{s}^2$对$T_0 - T$是线性的。(b) 求$P_\mathrm{s}(T_0 - 50\ \mathrm{K})/P_\mathrm{s}(T_0 - 200\ \mathrm{K})$。(c) 证明逆磁化率在$T_0$下方与上方的斜率之比为$2 : 1$。（输入(b)的比值。）
::: solution
(a) $P_\mathrm{s}^2 = a(T_0 - T)/b$。(b) $P_\mathrm{s} \propto (T_0 - T)^{1/2}$，所以比值为$\sqrt{50/200} = 0.5$。(c) $T_0$以上：$1/\chi = \varepsilon_0a(T - T_0)$，斜率$\varepsilon_0a$。以下：$1/\chi = 2\varepsilon_0a(T_0 - T)$，斜率大小$2\varepsilon_0a$。二级铁电体的$1/\varepsilon_\mathrm{r}$对$T$的图显示出这一斜率比为2 : 1的V形；$\mathrm{BaTiO_3}$那样的一级转变则表现为跃变与热滞。
:::
:::

::: exercise 锌使铁氧体更磁 {level=3 check="6"}
在$\mathrm{Ni}_{1-x}\mathrm{Zn}_x\mathrm{Fe_2O_4}$中，$\mathrm{Zn^{2+}}$（$d^{10}$，非磁性）进入四面体位，把$\mathrm{Fe^{3+}}$挤到八面体位，而镍保持八面体配位。(a) 写出阳离子分布，导出每个化学式单位的奈尔磁矩随$x$的函数。(b) 求$x = 0.5$时的值。(c) 实测磁矩先升后降，且$\mathrm{ZnFe_2O_4}$是$T_\mathrm{N} \approx 10\ \mathrm{K}$的反铁磁体。解释之。（以$\mu_\mathrm{B}$输入$x = 0.5$时的磁矩。）
::: hint
分别统计A、B子晶格上的磁矩：A含$(1 - x)$个$\mathrm{Fe^{3+}}$；B含$(1 - x)$个$\mathrm{Ni^{2+}}$与$(1 + x)$个$\mathrm{Fe^{3+}}$。
:::
::: solution
(a) $\mathrm{Zn}_x\mathrm{Fe}_{1-x}[\mathrm{Ni}_{1-x}\mathrm{Fe}_{1+x}]\mathrm{O_4}$。A：$5(1 - x)$。B：$2(1 - x) + 5(1 + x) = 7 + 3x$。净：$7 + 3x - 5 + 5x = 2 + 8x$。(b) $x = 0.5$：$6\ \mu_\mathrm{B}$，为纯镍铁氧体磁矩的三倍。(c) 随着锌清空A子晶格上的磁性离子，维持奈尔排布的A-B耦合减弱，较弱的B-B反铁磁耦合开始使B磁矩偏离平行而倾斜，所以超过约$x = 0.4$–$0.5$后磁矩落到$2 + 8x$以下。$x = 1$时A磁矩荡然无存；B子晶格独自反铁磁有序化，且温度极低。居里温度也随$x$稳步下降，Mn-Zn与Ni-Zn铁氧体正是利用这一点来调节性能。
:::
:::

::: exercise 镍铁氧体的饱和磁化强度 {level=2 check="2.6"}
镍铁氧体的$a = 8.339\ \text{Å}$，$Z = 8$。用第一道题中的磁矩计算它在$0\ \mathrm{K}$的饱和磁化强度。（以$10^5\ \mathrm{A\,m^{-1}}$为单位输入$M_\mathrm{s}$，两位有效数字。）
::: solution
$M_\mathrm{s} = 8 \times 2 \times 9.274\times10^{-24}/(8.339\times10^{-10})^3 = 1.484\times10^{-22}/5.799\times10^{-28} = 2.56\times10^5\ \mathrm{A\,m^{-1}}$，舍入为$2.6\times10^5\ \mathrm{A\,m^{-1}}$，约为磁铁矿的一半，正如磁矩之比（2 : 4）与相近的晶胞体积所要求的。
:::
:::
