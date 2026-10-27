前面几章把航天器当作一个质点。但望远镜必须以几分之一角秒的精度指向目标，通信天线必须指向地球，太阳电池阵必须指向太阳，火箭发动机必须沿计划变轨的方向。航天器的指向——其**姿态**——由刚体的转动动力学支配，并具有一些在日常机器中见不到的特点：没有地面可以借力，所以角动量的每一次改变都必须来自外力矩，或者储存在飞行器内部；环境力矩很小，却持续作用多年；而一个缓慢损失能量的自旋体会自己翻过身来。本章推导航天器的欧拉方程，分析无力矩运动和自旋的稳定性，推导重力梯度力矩及其所能实现的被动稳定，并介绍用反作用飞轮、磁力矩器和比例-微分控制律进行的主动控制。

刚体运动学和惯性张量在[[dynamics/three-dimensional-dynamics]]中建立；轨道背景见[[orbital-mechanics/two-body-problem]]。

## 欧拉方程 {#sec-euler}

在航天器上固连一个原点位于其质心的坐标系。对质心的角动量为$\mathbf{H} = \mathbf{I}\boldsymbol{\omega}$，其中$\boldsymbol{\omega}$是航天器的角速度，$\mathbf{I}$是其惯性张量——一个对称正定矩阵，对刚体而言在本体坐标系中为常数。其特征向量是**主轴**，在主轴坐标系中$\mathbf{I} = \operatorname{diag}(I_1, I_2, I_3)$（[对称矩阵的谱定理](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)）。

::: theorem 欧拉方程 {#thm-euler}
在本体主轴坐标系中，受对质心的外力矩$\mathbf{M}$作用的刚体满足
$$
\begin{aligned}
I_1\dot\omega_1 - (I_2 - I_3)\,\omega_2\omega_3 &= M_1,\\
I_2\dot\omega_2 - (I_3 - I_1)\,\omega_3\omega_1 &= M_2,\\
I_3\dot\omega_3 - (I_1 - I_2)\,\omega_1\omega_2 &= M_3.
\end{aligned}
$$ {#eq-euler}
:::

::: proof
转动的牛顿第二定律$\dot{\mathbf{H}} = \mathbf{M}$在惯性系中求导时成立。对于在以$\boldsymbol{\omega}$转动的坐标系中表示的任何矢量，输运定理给出$\dot{\mathbf{H}}_\text{惯性} = \dot{\mathbf{H}}_\text{本体} + \boldsymbol{\omega}\times\mathbf{H}$。在本体坐标系中$\mathbf{I}$为常数，所以$\dot{\mathbf{H}}_\text{本体} = \mathbf{I}\dot{\boldsymbol{\omega}}$，于是
$$
\mathbf{I}\dot{\boldsymbol{\omega}} + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega}) = \mathbf{M}.
$$
当$\mathbf{I}$为对角阵时，$\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}$的第一个分量为$\omega_2(I_3\omega_3) - \omega_3(I_2\omega_2) = -(I_2 - I_3)\omega_2\omega_3$，其余分量由轮换得出。所用假设：刚体（$\mathbf{I}$为常数），以质心为参考点（使质心沿轨道的运动不出现在方程中）。
:::

如果航天器装有相对于本体的总角动量为$\mathbf{h}_w$的旋转飞轮，总角动量为$\mathbf{H} = \mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w$，同样的论证给出
$$
\mathbf{I}\dot{\boldsymbol{\omega}} + \dot{\mathbf{h}}_w + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w) = \mathbf{M}.
$$ {#eq-euler-wheels}
使飞轮加速（$\dot{\mathbf{h}}_w$）会对本体施加一个大小相等、方向相反的力矩：这就是反作用飞轮的工作原理。

当$\mathbf{M} = \mathbf{0}$时，对刚体有两个守恒量：角动量的大小$H^2 = I_1^2\omega_1^2 + I_2^2\omega_2^2 + I_3^2\omega_3^2$（实际上整个矢量$\mathbf{H}$在惯性空间中固定不变），以及转动动能$2T = I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2$。$\boldsymbol{\omega}$在本体坐标系中的运动被限制在这两个椭球的交线上——这就是潘索（Poinsot）的几何图景。

## 轴对称航天器的无力矩运动 {#sec-torque-free}

许多航天器近似为轴对称：$I_1 = I_2 = I_t$（横向），$I_3 = I_s$（自旋轴）。绕其对称轴自旋的航天器受到扰动——来自与运载火箭的分离或推力器的安装偏差——会获得小的横向角速度，其运动变成**章动**（锥形运动）。

::: proposition 轴对称体的无力矩运动 {#prop-nutation}
对$I_1 = I_2 = I_t$、$I_3 = I_s$且$\mathbf{M} = \mathbf{0}$：
1. 自旋角速度$\omega_3 = \omega_s$为常数，横向角速度$(\omega_1, \omega_2)$在本体坐标系中以如下速率转动：
$$
\lambda = \frac{I_s - I_t}{I_t}\,\omega_s;
$$ {#eq-body-nutation}
2. 在惯性空间中，对称轴以恒定的**章动角**$\theta$绕固定矢量$\mathbf{H}$作锥形运动，$\tan\theta = I_t\omega_t/(I_s\omega_s)$，其中$\omega_t$为（恒定的）横向角速度，惯性**进动角速度**为
$$
\omega_p = \frac{H}{I_t}.
$$ {#eq-precession}
:::

::: proof
1. [[#eq-euler]]的第三式给出$I_s\dot\omega_3 = 0$。前两式变为$\dot\omega_1 = -\lambda\omega_2$，$\dot\omega_2 = \lambda\omega_1$，$\lambda$如上所述，其解是$(\omega_1, \omega_2)$以速率$\lambda$转动，大小$\omega_t$恒定。
2. $\mathbf{H} = I_t(\omega_1\hat{\mathbf{e}}_1 + \omega_2\hat{\mathbf{e}}_2) + I_s\omega_s\hat{\mathbf{e}}_3$，所以$\mathbf{H}$与$\hat{\mathbf{e}}_3$之间的夹角满足$\tan\theta = I_t\omega_t/(I_s\omega_s)$，为常数。把$\mathbf{H}$写成$I_t\boldsymbol{\omega} + (I_s - I_t)\omega_s\hat{\mathbf{e}}_3$，得$\boldsymbol{\omega} = \mathbf{H}/I_t - [(I_s - I_t)\omega_s/I_t]\,\hat{\mathbf{e}}_3$。对称轴的运动为$\dot{\hat{\mathbf{e}}}_3 = \boldsymbol{\omega}\times\hat{\mathbf{e}}_3 = (\mathbf{H}/I_t)\times\hat{\mathbf{e}}_3$：绕固定的$\mathbf{H}$以速率$H/I_t$转动。
:::

对于**扁形**体（$I_s > I_t$，圆盘），$\lambda$与$\omega_s$同号；对于**长形**体（$I_s < I_t$，铅笔），则异号。一旦考虑能量耗散，这一区别就变得具有决定性。

::: example 自旋稳定航天器 {#ex-spinner}
一个鼓形航天器的$I_s = 500\ \mathrm{kg\,m^2}$，$I_t = 300\ \mathrm{kg\,m^2}$，以$6\ \mathrm{rpm}$自旋。分离后它具有横向角速度$\omega_t = 0.05\ \mathrm{rad/s}$。求章动角、本体坐标系中的章动角速度和惯性进动角速度。
::: solution
$\omega_s = 6 \times 2\pi/60 = 0.6283\ \mathrm{rad/s}$，$I_s\omega_s = 314.16$，$I_t\omega_t = 15.0\ \mathrm{N\,m\,s}$。

章动角$\theta = \arctan(15.0/314.16) = 2.73^\circ$。$H = \sqrt{314.16^2 + 15.0^2} = 314.5\ \mathrm{N\,m\,s}$。

本体角速度$\lambda = (500 - 300)/300 \times 0.6283 = 0.419\ \mathrm{rad/s}$（周期$15.0\ \mathrm{s}$）；航天器上的加速度计会以这一频率感受到摆动。

进动角速度$\omega_p = 314.5/300 = 1.048\ \mathrm{rad/s}$（周期$5.99\ \mathrm{s}$）：自旋轴每六秒绕$\mathbf{H}$描出一个半锥角为$2.73^\circ$的圆锥。

**校核：**对小的$\theta$，$\omega_p \approx I_s\omega_s/I_t$，而且确实$\omega_p - \omega_s = 0.419 = \lambda$——本体相对于锥形运动恰好以本体坐标系章动角速度转动，这是运动学所要求的。为了消除锥形运动，自旋体装有**章动阻尼器**（黏性环或摆）——它只因为本体是扁形的才起作用，下一节将说明这一点。
:::
:::

## 自旋的稳定性 {#sec-stability}

::: proposition 绕主轴的自旋 {#prop-spin-stability}
对于以速率$\Omega$绕某一主轴自由自旋的刚体：
1. 绕最大或最小转动惯量轴的自旋是稳定的——小扰动作振荡；
2. 绕中间轴的自旋是不稳定的——小扰动按$e^{\sigma t}$增长，对于$I_1 < I_2 < I_3$、绕轴2的自旋，
$$
\sigma = \Omega\sqrt{\frac{(I_2 - I_1)(I_3 - I_2)}{I_1I_3}}.
$$ {#eq-intermediate}
3. 如果物体内部耗散能量（挠曲、燃料晃动、阻尼器）而$\mathbf{H}$保持不变，那么唯一保持稳定的自旋是绕**最大**转动惯量轴的自旋。
:::

::: proof
1–2. 设物体绕轴1自旋，$\omega_1 = \Omega + \delta_1$，$\omega_2$、$\omega_3$很小。在一阶近似下，[[#eq-euler]]给出$\dot\delta_1 = 0$以及
$$
\dot\omega_2 = \frac{I_3 - I_1}{I_2}\,\Omega\,\omega_3, \qquad \dot\omega_3 = \frac{I_1 - I_2}{I_3}\,\Omega\,\omega_2
\quad\Rightarrow\quad
\ddot\omega_2 = \frac{(I_3 - I_1)(I_1 - I_2)}{I_2I_3}\,\Omega^2\,\omega_2.
$$
当$I_1$是三者中最大或最小的时，系数为负——振荡；当$I_1$介于另外两者之间时，系数为正——指数增长。对绕轴2的自旋重新标号即得[[#eq-intermediate]]。
3. 在$\mathbf{H}$固定时，绕主轴$k$转动的物体的动能为$T = H^2/(2I_k)$，并且对任何运动$T \ge H^2/(2I_\text{max})$，仅当绕最大惯量轴自旋时取等号。耗散使$T$降低而$H$守恒，因此无论从哪个轴开始，运动都会漂向最小能量状态——绕最大惯量轴的自旋。（严格说来，这是一种能量汇论证，并不是对每种阻尼器设计的证明，但它已被分析和飞行经验所证实。）
:::

把一本书或一部手机绕其中间轴旋转着抛向空中，就能看到中间轴不稳定性：它大约每转一圈就翻转一次。这常被称为贾尼别科夫效应（Dzhanibekov effect），以在轨道上拍摄到一个旋转的蝶形螺母出现同样现象的航天员命名。

::: example 中间轴翻转 {#ex-flip}
一个$I_1 = 100$、$I_2 = 200$、$I_3 = 300\ \mathrm{kg\,m^2}$的物体以$\Omega = 1.0\ \mathrm{rad/s}$绕轴2自旋，绕另外两轴有$0.01\ \mathrm{rad/s}$的小角速度。求扰动的增长率，估算物体何时翻转；并与绕轴1和轴3的自旋比较。
::: solution
轴2：$\sigma = 1.0\sqrt{(100)(100)/(100 \times 300)} = 0.577\ \mathrm{s^{-1}}$。扰动从$0.01$增长到$1$的量级（与自旋相当）大约需要$\ln(100)/0.577 = 8\ \mathrm{s}$；对完整的非线性[[#eq-euler]]作数值积分表明，$\omega_2$在$t = 10.9\ \mathrm{s}$时首次改变符号，此后物体周期性地来回翻转。

轴3（最大惯量轴）：振荡频率$\Omega\sqrt{(I_3 - I_1)(I_3 - I_2)/(I_1I_2)} = 1.0\ \mathrm{rad/s}$，有界。轴1（最小惯量轴）：$\Omega\sqrt{(I_2 - I_1)(I_3 - I_1)/(I_2I_3)} = 0.577\ \mathrm{rad/s}$，对刚体有界——但由[[#prop-spin-stability]]第3部分，对耗散能量的真实物体则不然。

**校核：**线性估计（增长一百倍需$8\ \mathrm{s}$）与非线性翻转时间（$10.9\ \mathrm{s}$）在数量级上一致，理应如此——线性化预测的是增长，而不是完整的翻转。
:::
:::

::: warning 对刚体稳定不等于对航天器稳定 {#warn-minor-axis}
绕最小惯量轴的自旋能通过刚体检验，却在实践中失败。每一个真实的航天器都耗散能量——推进剂晃动，天线和伸杆挠曲，结构有阻尼——而能量耗散会把绕最小惯量轴的自旋变成翻滚，最终变成绕最大惯量轴的平旋，时间尺度由阻尼决定（数小时到数周）。因此被动自旋体的设计规则是：绕*最大*转动惯量轴自旋，最好有至少5–10%的裕度；并且要记住，随着推进剂消耗和附件展开，惯性特性会发生变化。**双自旋**航天器有一个旋转的转子和一个消旋平台，如果把阻尼放在消旋部分上，就可以放宽这一规则；20世纪70年代许多高而细长的长形通信卫星就是这样稳定的。
:::

## 重力梯度力矩 {#sec-gravity-gradient}

航天器上离地球较近的部分受到的引力略大于较远的部分。由此产生的力矩倾向于使航天器的长轴与当地铅垂线对齐——这就是月球总以同一面朝向地球的原因。

::: proposition 重力梯度力矩 {#prop-gg}
惯性张量（对质心）为$\mathbf{I}$、距球形地球中心$R$的航天器所受的力矩为
$$
\mathbf{M}_{gg} = \frac{3\mu}{R^3}\,\hat{\mathbf{c}}\times(\mathbf{I}\hat{\mathbf{c}}),
$$ {#eq-gg}
其中$\hat{\mathbf{c}}$是沿当地铅垂线的单位矢量（正负均可），精确到航天器尺寸与$R$之比的二阶。在圆轨道上$3\mu/R^3 = 3n^2$。
:::

::: proof
距质心$\boldsymbol{\rho}$处的质量微元$\mathrm{d}m$距地心$\mathbf{R} + \boldsymbol{\rho}$，受力$-\mu(\mathbf{R} + \boldsymbol{\rho})/\lvert\mathbf{R} + \boldsymbol{\rho}\rvert^3\,\mathrm{d}m$。对$\rho \ll R$展开，
$$
\frac{\mathbf{R} + \boldsymbol{\rho}}{\lvert\mathbf{R} + \boldsymbol{\rho}\rvert^3} \approx \frac{\mathbf{R} + \boldsymbol{\rho}}{R^3}\left(1 - \frac{3\,\mathbf{R}\cdot\boldsymbol{\rho}}{R^2}\right).
$$
对质心的力矩为$\mathbf{M} = \int\boldsymbol{\rho}\times(\text{力})$。仅含$\mathbf{R}$的项给出$-(\mu/R^3)\left(\int\boldsymbol{\rho}\,\mathrm{d}m\right)\times\mathbf{R} = \mathbf{0}$，因为原点在质心；含$\boldsymbol{\rho}$的项给出$\boldsymbol{\rho}\times\boldsymbol{\rho} = \mathbf{0}$。剩下的二阶项为
$$
\mathbf{M} = \frac{3\mu}{R^5}\int(\mathbf{R}\cdot\boldsymbol{\rho})\,\boldsymbol{\rho}\times\mathbf{R}\,\mathrm{d}m = \frac{3\mu}{R^3}\int(\hat{\mathbf{c}}\cdot\boldsymbol{\rho})\,\boldsymbol{\rho}\times\hat{\mathbf{c}}\,\mathrm{d}m.
$$
由于$\mathbf{I}\hat{\mathbf{c}} = \int\left[\rho^2\hat{\mathbf{c}} - \boldsymbol{\rho}(\boldsymbol{\rho}\cdot\hat{\mathbf{c}})\right]\mathrm{d}m$，有$\hat{\mathbf{c}}\times\mathbf{I}\hat{\mathbf{c}} = \int(\boldsymbol{\rho}\cdot\hat{\mathbf{c}})\,\boldsymbol{\rho}\times\hat{\mathbf{c}}\,\mathrm{d}m$，这就是[[#eq-gg]]。当$\hat{\mathbf{c}}$是主轴（$\mathbf{I}\hat{\mathbf{c}}\parallel\hat{\mathbf{c}}$）时力矩为零：平衡位置是某一主轴沿铅垂方向。
:::

考虑圆轨道上航天器的**俯仰**运动：本体轴1名义上沿当地铅垂线，轴2沿迹，轴3沿轨道法向，绕轴3转过俯仰角$\theta$。于是在本体坐标系中$\hat{\mathbf{c}} = (\cos\theta, -\sin\theta, 0)$，[[#eq-gg]]给出$M_3 = -\tfrac32 n^2(I_2 - I_1)\sin 2\theta$。轨道参考坐标系绕同一轴以恒定速率$n$转动，所以惯性角加速度就是$\ddot\theta$，于是
$$
I_3\ddot\theta + \tfrac32 n^2(I_2 - I_1)\sin 2\theta = 0, \qquad
\omega_\text{俯仰} = n\sqrt{\frac{3(I_2 - I_1)}{I_3}} \ \ \text{（小 }\theta\text{）}.
$$ {#eq-pitch}
当$I_2 > I_1$时俯仰是稳定的：*较小*转动惯量的轴沿铅垂方向。一根末端带质量块、向上或向下伸出的长伸杆恰好做到这一点。（对相互耦合的滚转和偏航进行完整分析，还要加上条件$I_3 > I_2 > I_1$——经典的**拉格朗日区域**——才能得到最简单的稳定构型。）

::: widget phaseplane
f: y
g: -1.5*k*sin(2*x)
x: -4, 4
y: -2.5, 2.5
sliders: k=0.95:0:1:0.05
caption: 相平面中的重力梯度俯仰运动[[#eq-pitch]]：俯仰角$\theta$（rad，横轴）对以轨道角速度为单位的俯仰角速度$\mathrm{d}\theta/\mathrm{d}(nt)$（纵轴），惯量比$k = (I_2 - I_1)/I_3$由滑块设定。围绕$\theta = 0$和$\pm\pi$的闭合曲线是天平动——航天器绕铅垂线摇摆，其长轴的任一端朝下；$\pm\pi/2$处的鞍点（长轴水平）是不稳定的。分界线以外的轨迹是翻滚。取$k = 0.95$（细长伸杆），小幅天平动频率为轨道角速度的$\sqrt{3k} = 1.69$倍。大于分界线高度$\sqrt{3k}\,n$——在低轨道上约每秒$0.1^\circ$——的扰动会使航天器翻滚，这就是重力梯度卫星需要阻尼器和缓慢展开的原因。
:::

::: example 重力梯度伸杆 {#ex-gg-boom}
一颗位于$700\ \mathrm{km}$圆轨道上的小卫星展开一根末端带质量块的竖直伸杆，使$I_1 = 20\ \mathrm{kg\,m^2}$（铅垂），$I_2 = I_3 = 400\ \mathrm{kg\,m^2}$。求其俯仰天平动周期以及它可能受到的最大重力梯度力矩。
::: solution
$n = \sqrt{398\,600/7078^3} = 1.0602\times10^{-3}\ \mathrm{rad/s}$（轨道周期$98.8\ \mathrm{min}$）。$\omega_\text{俯仰} = n\sqrt{3 \times 380/400} = 1.688\,n = 1.790\times10^{-3}\ \mathrm{rad/s}$；周期$58.5\ \mathrm{min}$。

最大力矩：$\tfrac32n^2(I_2 - I_1)\lvert\sin 2\theta\rvert \le 1.5 \times (1.0602\times10^{-3})^2 \times 380 = 6.4\times10^{-4}\ \mathrm{N\,m}$，在$\theta = 45^\circ$处。

**校核：**[[#eq-pitch]]中的天平动是无阻尼的，所以受扰的卫星会无休止地摇摆；真实的重力梯度卫星加装阻尼器（磁滞棒或阻尼伸杆）。这些力矩很小——相当于一枚小硬币的重量作用在几厘米长的杠杆上——但持续作用，这就是它们重要的原因。
:::
:::

## 主动姿态控制 {#sec-control}

**反作用飞轮**是驱动飞轮的电动机。对飞轮施加指令力矩$-\mathbf{u}$，就对本体施加$+\mathbf{u}$（[[#eq-euler-wheels]]），所以三个或更多飞轮无需推进剂就能实现完整的三轴控制。它们与本体交换动量，但不能清除动量。因此，长期的外力矩（来自平均值不为零的气动、辐射或重力梯度效应）会在飞轮中累积，直到飞轮接近其最高转速——**饱和**——这时必须用外力矩来**卸载**（“动量卸载”）：用推力器，或在低轨道上用**磁力矩器**，即其磁偶极矩$\mathbf{m}$在地磁场$\mathbf{B}$中产生$\mathbf{m}\times\mathbf{B}$的线圈。**控制力矩陀螺**——转速恒定、转轴装在框架上的飞轮——为敏捷或大型航天器提供更大的力矩（国际空间站就使用它们）。

::: proposition 力矩受限的静止到静止机动 {#prop-slew}
绕固定轴的转动惯量为$I$、控制力矩受限为$\lvert u\rvert \le T$的刚体，从静止到静止转过角度$\Theta$的最短时间做法是：前一半时间施加$+T$，后一半施加$-T$（**砰-砰**控制）。机动时间和需要储存的峰值角动量为
$$
t_\text{机动} = 2\sqrt{\frac{I\Theta}{T}}, \qquad h_\text{峰值} = \sqrt{IT\Theta}.
$$ {#eq-slew}
:::

::: proof
以恒定角加速度$\alpha = T/I$作用时间$t/2$，物体转过$\tfrac12\alpha(t/2)^2$并达到角速度$\alpha t/2$；对称的减速阶段转过同样的角度。所以$\Theta = \alpha t^2/4$，得$t = 2\sqrt{I\Theta/T}$。峰值角速度为$\alpha t/2 = \sqrt{T\Theta/I}$，本体的峰值动量——与飞轮必须吸收的动量大小相等、方向相反——是它的$I$倍。砰-砰控制是时间最优的，这由庞特里亚金极大值原理得出，或由如下观察得出：任何其他容许的力矩历程在加速阶段的每一时刻达到的速度都更低。假设：单轴转动（无陀螺耦合，对缓慢机动成立），刚体，力矩可瞬时获得。
:::

对于指向和小修正，标准的控制律是对姿态误差$\theta$的**比例-微分**（PD）反馈：
$$
u = -K_p\theta - K_d\dot\theta \quad\Rightarrow\quad I\ddot\theta + K_d\dot\theta + K_p\theta = 0,
$$ {#eq-pd}
这是一个固有频率为$\omega_n = \sqrt{K_p/I}$、阻尼比为$\zeta = K_d/(2\sqrt{K_pI})$的阻尼振子；增益取为$K_p = I\omega_n^2$，$K_d = 2\zeta\omega_nI$，2 %调节时间约为$4/(\zeta\omega_n)$。实践中，姿态误差由星敏感器、太阳敏感器和陀螺测量，对三轴控制则用四元数或小角度矢量而非单个角度来表示。

::: example 空间望远镜的姿态机动 {#ex-slew}
一个航天器绕机动轴的$I = 1000\ \mathrm{kg\,m^2}$，其反作用飞轮能提供$0.2\ \mathrm{N\,m}$。(a) 一次$30^\circ$的静止到静止机动需要多长时间？飞轮必须储存多少动量？(b) 设计一个$\omega_n = 0.1\ \mathrm{rad/s}$、$\zeta = 0.7$的 PD 控制器。求增益和调节时间，以及对$10^\circ$初始误差它所需要的力矩。
::: solution
(a) $\Theta = 0.5236\ \mathrm{rad}$。$t = 2\sqrt{1000 \times 0.5236/0.2} = 2 \times 51.2 = 102\ \mathrm{s}$；$h_\text{峰值} = \sqrt{1000 \times 0.2 \times 0.5236} = 10.2\ \mathrm{N\,m\,s}$。于是转动惯量为$0.05\ \mathrm{kg\,m^2}$的飞轮必须在已储存的动量之外再以$10.2/0.05 = 205\ \mathrm{rad/s}$（约$1950\ \mathrm{rpm}$）旋转。

(b) $K_p = 1000 \times 0.01 = 10\ \mathrm{N\,m/rad}$，$K_d = 2 \times 0.7 \times 0.1 \times 1000 = 140\ \mathrm{N\,m\,s/rad}$，调节时间$4/0.07 = 57\ \mathrm{s}$。对于$10^\circ$（$0.1745\ \mathrm{rad}$）的误差，初始需求为$10 \times 0.1745 = 1.75\ \mathrm{N\,m}$——几乎是飞轮所能提供的九倍。

**校核：**对于大的阶跃，PD 设计会使执行器饱和，所以大角度机动是通过指令一条可行的轨迹（如砰-砰轨迹或其平滑形式）、只用 PD 反馈来跟踪它而完成的。大型望远镜缓慢而审慎的机动——转几十度要几分钟——正是由这种动量和力矩预算决定的。
:::
:::

::: widget plot
f: 1 - exp(-z*w*x)*(cos(w*sqrt(1 - z^2)*x) + z/sqrt(1 - z^2)*sin(w*sqrt(1 - z^2)*x)); 1
x: 0, 150
y: 0, 1.6
sliders: z=0.7:0.1:0.95:0.05; w=0.1:0.03:0.4:0.01
labels: \theta/\theta_\text{cmd}; \text{目标}
caption: PD 控制的航天器轴[[#eq-pd]]对小的指令姿态变化的响应，横轴为时间（s），阻尼比为$\zeta$（滑块 z），固有频率为$\omega_n$（滑块 w，rad/s）。在$\zeta = 0.7$、$\omega_n = 0.1$（[[#ex-slew]]）时，响应约一分钟内稳定，超调量$5\,\%$。阻尼低时会振荡；提高$\omega_n$使响应加快，但所需力矩按$\omega_n^2$成比例增大——这就是敏捷性与执行器尺寸之间的权衡。
:::

::: example 磁卸载动量 {#ex-dump}
在[[#ex-slew]]的机动之后，飞轮中留有累积扰动造成的$10\ \mathrm{N\,m\,s}$残余动量。偶极矩为$100\ \mathrm{A\,m^2}$的磁力矩器在$3\times10^{-5}\ \mathrm{T}$的磁场（低轨道的典型值）中工作。估算最短的卸载时间。
::: solution
最大力矩$mB = 100 \times 3\times10^{-5} = 3\times10^{-3}\ \mathrm{N\,m}$（偶极矩垂直于磁场）。时间$\ge 10/3\times10^{-3} = 3300\ \mathrm{s} \approx 56\ \mathrm{min}$。

**校核：**磁力矩总是垂直于$\mathbf{B}$，所以在某一时刻无法清除沿磁场方向的动量分量；只有随着磁场方向沿轨道变化，才能卸载全部三个分量。因此实际卸载需要一圈或更多，动量预算必须为此留有余地。
:::
:::

::: quiz
一颗卫星被设计成绕其长轴（最小惯量轴）自旋，并装有四根柔性线天线。下列哪些说法正确？
- [x] 在没有外力矩作用时，其角动量矢量在空间中保持固定。
- [x] 随着天线挠曲并耗散能量，其动能减小。
- [x] 它最终将绕最大转动惯量轴自旋——平旋。
- [ ] 它是稳定的，因为对刚体而言绕最小惯量轴的自旋是稳定的。
::: solution
在$\mathbf{H}$守恒而能量耗散的情况下，运动趋向于该$\mathbf{H}$下的最小能量状态，即绕最大惯量轴的自旋；一旦物体不是刚体，绕最小惯量轴自旋的刚体稳定性就无关紧要了。这正是探险者1号所发生的情况。
:::
:::

::: history
莱昂哈德·欧拉（Leonhard Euler）在《固体或刚体运动理论》（*Theoria motus corporum solidorum seu rigidorum*，1765年）中提出了以他命名的刚体转动方程，路易·潘索（Louis Poinsot）于1834年给出了无力矩运动的几何描述。1958年1月31日发射的美国第一颗卫星探险者1号绕其长轴自旋；在第一圈之内它就开始章动，锥形运动不断增大，直至翻滚。同年晚些时候，罗纳德·布雷斯韦尔（Ronald Bracewell）和欧文·加里奥特（Owen Garriott）在《自然》上解释了这一行为（《人造地球卫星的转动》，“Rotation of artificial Earth satellites”，1958年）：柔性鞭状天线耗散能量，驱使自旋趋向最大转动惯量轴。这一教训——绕最大惯量轴自旋，或提供主动控制——从此成为每一个航天器设计的一部分。
:::

## 后续内容 {#sec-next}

三轴姿态确定把星敏感器、太阳敏感器、磁强计和陀螺结合起来，通常通过卡尔曼滤波器；姿态用四元数表示，以避免欧拉角的奇异性（[[dynamics/three-dimensional-dynamics]]）。这里的 PD 控制律是[[control-systems/pid-control]]中所讨论的反馈设计的最简单实例；柔性附件、燃料晃动以及[[#prop-slew]]中忽略的陀螺耦合，是 Wie 以及 Schaub 和 Junkins 等高级航天器控制教材的主题。摄动力矩——重力梯度、气动、辐射、磁力矩——与[[orbital-mechanics/perturbations]]中的轨道摄动来自同一环境。

::: summary
- 主轴坐标系中的欧拉方程：$I_1\dot\omega_1 - (I_2 - I_3)\omega_2\omega_3 = M_1$及其轮换；带飞轮时为$\mathbf{I}\dot{\boldsymbol{\omega}} + \dot{\mathbf{h}}_w + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w) = \mathbf{M}$。
- 无力矩轴对称体：章动角$\tan\theta = I_t\omega_t/(I_s\omega_s)$，本体坐标系速率$(I_s - I_t)\omega_s/I_t$，惯性进动角速度$H/I_t$。
- 对刚体而言，绕最大或最小惯量轴的自旋稳定，绕中间轴的自旋不稳定（增长率见[[#eq-intermediate]]）；有能量耗散时只有绕最大惯量轴的自旋稳定。
- 重力梯度力矩$3n^2\,\hat{\mathbf{c}}\times\mathbf{I}\hat{\mathbf{c}}$；俯仰天平动频率为$n\sqrt{3(I_2 - I_1)/I_3}$，最小惯量轴沿铅垂方向时稳定。
- 反作用飞轮储存动量，需要卸载（磁力矩器、推力器）；砰-砰机动时间$2\sqrt{I\Theta/T}$，峰值动量$\sqrt{IT\Theta}$；PD 增益$K_p = I\omega_n^2$，$K_d = 2\zeta\omega_nI$。
:::

## 习题

::: exercise 自旋体的角动量 {level=1 check="838"}
一个$I_s = 800\ \mathrm{kg\,m^2}$的航天器绕其对称轴以$10\ \mathrm{rpm}$自旋。求其角动量。（以 N m s 为单位输入$H$，保留三位有效数字。）
::: solution
$\omega_s = 10 \times 2\pi/60 = 1.0472\ \mathrm{rad/s}$；$H = 800 \times 1.0472 = 838\ \mathrm{N\,m\,s}$。使这一矢量倾斜$1^\circ$需要$838 \times 0.01745 = 14.6\ \mathrm{N\,m\,s}$的角冲量——这就是使自旋体抵抗扰动的“陀螺刚度”。
:::
:::

::: exercise 章动角 {level=1 check="1.46"}
一个$I_s = 1200$、$I_t = 800\ \mathrm{kg\,m^2}$的航天器以$5\ \mathrm{rpm}$自旋，横向角速度为$0.02\ \mathrm{rad/s}$。求章动角、本体坐标系章动角速度和惯性进动角速度。（以度为单位输入$\theta$，保留三位有效数字。）
::: solution
$\omega_s = 0.5236\ \mathrm{rad/s}$，$\tan\theta = 800 \times 0.02/(1200 \times 0.5236) = 16/628.3 = 0.02546$，$\theta = 1.46^\circ$。$\lambda = (400/800) \times 0.5236 = 0.262\ \mathrm{rad/s}$；$H = 628.5\ \mathrm{N\,m\,s}$，$\omega_p = 628.5/800 = 0.786\ \mathrm{rad/s}$。
:::
:::

::: exercise 中间轴扰动的增长 {level=2 check="22.6"}
一个主转动惯量为$400$、$500$和$600\ \mathrm{kg\,m^2}$的物体以$0.5\ \mathrm{rad/s}$绕$500\ \mathrm{kg\,m^2}$的轴自旋。按线性化方程，小扰动增长十倍需要多长时间？（以秒为单位输入时间，保留三位有效数字。）
::: solution
$\sigma = 0.5\sqrt{(100)(100)/(400 \times 600)} = 0.5 \times 0.2041 = 0.1021\ \mathrm{s^{-1}}$；$t = \ln 10/\sigma = 22.6\ \mathrm{s}$。
:::
:::

::: exercise 俯仰天平动周期 {level=2 check="59.8"}
一颗位于$500\ \mathrm{km}$高度圆轨道上的卫星的$I_1 = 50$（铅垂），$I_2 = 250$（沿迹），$I_3 = 240\ \mathrm{kg\,m^2}$（轨道法向）。求小幅俯仰天平动的周期。（以分钟为单位输入，保留三位有效数字。）
::: solution
$n = \sqrt{398\,600/6878^3} = 1.1068\times10^{-3}\ \mathrm{rad/s}$（轨道周期$94.6\ \mathrm{min}$）。$\omega_\text{俯仰} = n\sqrt{3 \times 200/240} = 1.581\,n$；周期$94.6/1.581 = 59.8\ \mathrm{min}$。
:::
:::

::: exercise 重力梯度扰动 {level=2 check="1.83e-4"}
一颗位于$600\ \mathrm{km}$圆轨道上的对地定向卫星，绕沿迹轴和铅垂轴的转动惯量分别为$900$和$300\ \mathrm{kg\,m^2}$，为使一台仪器指向目标，它被保持在偏离重力梯度平衡位置$5^\circ$的俯仰角上。飞轮必须提供多大的恒定力矩？（以 N m 为单位输入，保留三位有效数字；可以输入`1.83e-4`这样的表达式。）
::: solution
$n = 1.0831\times10^{-3}\ \mathrm{rad/s}$。$M = \tfrac32n^2(I_2 - I_1)\sin 2\theta = 1.5 \times 1.1731\times10^{-6} \times 600 \times \sin 10^\circ = 1.83\times10^{-4}\ \mathrm{N\,m}$。在一圈$97\ \mathrm{min}$的轨道上，它在飞轮中累积$1.06\ \mathrm{N\,m\,s}$的动量，必须定期卸载。
:::
:::

::: exercise 四分之一圈机动 {level=2 check="177"}
一个$I = 2500\ \mathrm{kg\,m^2}$、飞轮力矩为$0.5\ \mathrm{N\,m}$的航天器必须从静止到静止机动$90^\circ$。求最短时间和储存的峰值动量。（以秒为单位输入时间，保留三位有效数字。）
::: solution
$t = 2\sqrt{2500 \times 1.5708/0.5} = 2 \times 88.6 = 177\ \mathrm{s}$；$h_\text{峰值} = \sqrt{2500 \times 0.5 \times 1.5708} = 44.3\ \mathrm{N\,m\,s}$。
:::
:::

::: exercise 由调节时间确定 PD 增益 {level=2 check="53.3"}
为$I = 400\ \mathrm{kg\,m^2}$的轴设计一个 PD 姿态控制器，使其在$\zeta = 0.8$下$60\ \mathrm{s}$内调节到位（2 %）。求$K_p$和$K_d$。（以 N m s/rad 为单位输入$K_d$，保留三位有效数字。）
::: solution
$\omega_n = 4/(\zeta t_s) = 4/48 = 0.0833\ \mathrm{rad/s}$。$K_p = I\omega_n^2 = 2.78\ \mathrm{N\,m/rad}$，$K_d = 2\zeta\omega_nI = 2 \times 0.8 \times 0.0833 \times 400 = 53.3\ \mathrm{N\,m\,s/rad}$。
:::
:::

::: exercise 磁动量卸载 {level=1 check="417"}
用偶极矩为$50\ \mathrm{A\,m^2}$的磁力矩器在$2\times10^{-5}\ \mathrm{T}$的磁场中从飞轮清除$25\ \mathrm{N\,m\,s}$的动量。最短的卸载时间是多少？（以分钟为单位输入，保留三位有效数字。）
::: solution
$T_\text{max} = 50 \times 2\times10^{-5} = 10^{-3}\ \mathrm{N\,m}$；$t \ge 25/10^{-3} = 25\,000\ \mathrm{s} = 417\ \mathrm{min}$，在低轨道上约为四圈——实际上更长，因为偶极矩不可能总是在所需方向上垂直于磁场。
:::
:::

::: exercise 设计：选择稳定方式 {level=3}
对下列每项任务，在自旋稳定、重力梯度稳定和用反作用飞轮的三轴控制之间作出选择，并用本章的结果论证你的选择：(a) 一颗在所有方向上测量磁场的低成本卫星；(b) 一颗需要$0.01^\circ$指向精度的对地成像卫星；(c) 一颗只需要天线大致对地指向（$\pm10^\circ$）、没有飞轮预算的学生卫星。
::: solution
(a) 自旋稳定：陀螺刚度（$H$大）无需主动控制就能使自旋轴在空间中保持固定，而自旋使传感器扫过所有方向。绕最大惯量轴自旋（[[#prop-spin-stability]]），并配章动阻尼器。(b) 采用反作用飞轮和星敏感器的三轴控制：只有主动控制才能达到$0.01^\circ$；飞轮提供精细且无需推进剂的力矩，再用磁力矩器卸载长期累积的动量（包括偏离星下点指向构型时的重力梯度力矩，如上面的习题）。(c) 重力梯度：可展开的伸杆使铅垂轴成为最小惯量轴（[[#eq-pitch]]）；阻尼器（磁滞棒）消除天平动，指向精度为几度到$10^\circ$——对天线已经足够。风险：卫星可能倒置稳定下来（$\theta = 0$和$\pi$都是稳定的），所以天线方向图或展开程序必须考虑到这一点。
:::
:::
