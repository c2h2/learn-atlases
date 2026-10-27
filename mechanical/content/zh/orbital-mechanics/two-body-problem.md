每一颗卫星、每一个空间探测器和每一颗行星，在一阶近似下都只在一个占主导地位的天体的引力作用下运动。这种近似——两个质点相互吸引、除此之外别无他物——就是**二体问题**（two-body problem），它是动力学中极少数能够以封闭形式完全求解的问题之一。其解十分出色：无论初始位置和速度如何，相对轨道都是一条**圆锥曲线**（圆、椭圆、抛物线或双曲线），吸引体位于其一个焦点上，而初始时刻确定的两个数——比角动量和比能量——永远决定着它的大小和形状。本章从牛顿定律出发一步一步推导出这一结果，并把它变成任务设计中的实用公式：圆轨道速度和逃逸速度、活力公式、椭圆轨道的周期和双曲线轨道的剩余速度。本课程后面的一切内容——沿轨道的计时、三维定向、机动、交会、行星际转移——都建立在这里证明的结论之上，而[[orbital-mechanics/perturbations]]中的摄动则以偏离它的程度来度量。

先修知识是质点的牛顿第二定律（[[dynamics/newtons-laws]]）、矢量积，以及极坐标下矢量的求导（[[dynamics/particle-kinematics]]）。

## 牛顿万有引力定律与运动方程 {#sec-equations}

牛顿万有引力定律指出，相距$r$的两个质点$m_1$和$m_2$沿它们的连线相互吸引，引力大小为
$$
F = \frac{G m_1 m_2}{r^2}, \qquad G = 6.674\times10^{-11}\ \mathrm{m^3\,kg^{-1}\,s^{-2}}.
$$ {#eq-gravity}
这一定律对球对称物体也严格成立，它们的吸引作用如同全部质量集中在球心（牛顿球壳定理）。真实的行星略呈扁平且凹凸不平；由此产生的修正在大多数场合都很小，它们是[[orbital-mechanics/perturbations]]的主题。

设$\mathbf{R}_1$和$\mathbf{R}_2$为两个物体相对于一个**惯性**原点的位置，$\mathbf{r} = \mathbf{R}_2 - \mathbf{R}_1$为物体2相对于物体1的位置，$r = \lVert\mathbf{r}\rVert$。每个物体的受力图上只有一个力：物体2受到指向物体1的拉力$-Gm_1m_2\,\mathbf{r}/r^3$，物体1受到指向物体2、大小相等方向相反的力$+Gm_1m_2\,\mathbf{r}/r^3$（牛顿第三定律）。模型中没有其他力——没有阻力，没有推力，也没有第三体。

::: definition 引力参数 {#def-mu}
二体系统的**引力参数**（gravitational parameter）为
$$
\mu = G\,(m_1 + m_2).
$$
当$m_2 \ll m_1$时（航天器绕行星运行），在任何有意义的精度下$\mu$都就是$G m_1$，即中心天体的**标准引力参数**。地球的$\mu = 398\,600\ \mathrm{km^3/s^2}$（更精确地为$398\,600.4418\ \mathrm{km^3/s^2}$，IERS 值），太阳的$\mu_\odot = 1.327\,12\times10^{11}\ \mathrm{km^3/s^2}$，月球为$4\,903\ \mathrm{km^3/s^2}$，火星为$42\,828\ \mathrm{km^3/s^2}$。
:::

乘积$GM$的已知精度远高于单独的$G$（约五位有效数字）或$M$，因为它正是跟踪测量所测得的量：卫星的运动只依赖于$\mu$。本课程中长度以千米计、速度以千米每秒计，因此$\mu$的单位是$\mathrm{km^3/s^2}$；这些都是 SI 导出单位，只要一致地使用就无需换算。

::: proposition 二体方程 {#prop-two-body}
对于只通过引力相互作用的两个质点：

1. 质心$\mathbf{R}_G = (m_1\mathbf{R}_1 + m_2\mathbf{R}_2)/(m_1+m_2)$以恒定速度作直线运动，因此固连于质心的坐标系是惯性系；
2. 相对位置$\mathbf{r} = \mathbf{R}_2 - \mathbf{R}_1$满足
$$
\ddot{\mathbf{r}} = -\frac{\mu}{r^3}\,\mathbf{r}, \qquad \mu = G(m_1+m_2).
$$ {#eq-relative}
:::

::: proof
对每个物体应用牛顿第二定律得
$$
m_1\ddot{\mathbf{R}}_1 = +\frac{Gm_1m_2}{r^3}\,\mathbf{r}, \qquad m_2\ddot{\mathbf{R}}_2 = -\frac{Gm_1m_2}{r^3}\,\mathbf{r}.
$$
两式相加，力相互抵消：$m_1\ddot{\mathbf{R}}_1 + m_2\ddot{\mathbf{R}}_2 = (m_1+m_2)\ddot{\mathbf{R}}_G = \mathbf{0}$，这就是结论1。对于结论2，把每个方程除以各自的质量，再用第二式减去第一式：
$$
\ddot{\mathbf{r}} = \ddot{\mathbf{R}}_2 - \ddot{\mathbf{R}}_1 = -\frac{Gm_1}{r^3}\,\mathbf{r} - \frac{Gm_2}{r^3}\,\mathbf{r} = -\frac{G(m_1+m_2)}{r^3}\,\mathbf{r}.
$$
所用的假设是：质点（或球对称物体），除相互引力外无其他力，以及惯性系中的牛顿力学。
:::

方程[[#eq-relative]]描述的是*相对*运动，并不要求物体1固定不动。以物体1为中心的坐标系有加速度，不是惯性系，但方程已经计及了这一点，这就是$\mu$中出现$m_2$的原因。对于卫星，这一修正可以忽略；对于地月系统则不然（[[#ex-earth-moon]]）。

## 角动量：平面运动与等面积 {#sec-angular-momentum}

::: proposition 比角动量守恒 {#prop-h}
**比角动量**$\mathbf{h} = \mathbf{r}\times\dot{\mathbf{r}}$（相对运动中单位质量的角动量）是常矢量。因此运动位于通过中心天体、垂直于$\mathbf{h}$的固定平面内；把速度写成极坐标分量$v_r = \dot r$（径向）和$v_\perp = r\dot\theta$（横向），则
$$
h = r\,v_\perp = r^2\dot\theta, \qquad \frac{\mathrm{d}A}{\mathrm{d}t} = \frac{h}{2},
$$ {#eq-areal}
其中$A$是矢径扫过的面积：在相等的时间内扫过相等的面积（开普勒第二定律）。
:::

::: proof
求导：$\dot{\mathbf{h}} = \dot{\mathbf{r}}\times\dot{\mathbf{r}} + \mathbf{r}\times\ddot{\mathbf{r}} = \mathbf{0} + \mathbf{r}\times\left(-\mu\mathbf{r}/r^3\right) = \mathbf{0}$，因为平行矢量的叉积为零。这里用到的唯一性质是力为**有心力**——沿$\mathbf{r}$方向。由于$\mathbf{h}$在每一时刻都同时垂直于$\mathbf{r}$和$\dot{\mathbf{r}}$，且其方向永不改变，$\mathbf{r}$始终位于垂直于$\mathbf{h}$的平面内。（若$\mathbf{h} = \mathbf{0}$，运动是一条径向直线，这是我们排除的退化情形。）

在该平面的极坐标中，$\mathbf{r} = r\,\mathbf{e}_r$，$\dot{\mathbf{r}} = \dot r\,\mathbf{e}_r + r\dot\theta\,\mathbf{e}_\theta$，所以$\mathbf{h} = r\mathbf{e}_r \times (\dot r\,\mathbf{e}_r + r\dot\theta\,\mathbf{e}_\theta) = r^2\dot\theta\,(\mathbf{e}_r\times\mathbf{e}_\theta)$，$h = r^2\dot\theta = r v_\perp$。在短时间$\mathrm{d}t$内，矢径扫过一个底为$r$、高为$r\,\mathrm{d}\theta$的细长三角形，面积$\mathrm{d}A = \tfrac12 r^2\,\mathrm{d}\theta$；除以$\mathrm{d}t$得$\mathrm{d}A/\mathrm{d}t = \tfrac12 r^2\dot\theta = h/2$。
:::

只有速度的*横向*分量携带角动量。径直远离地球运动的航天器$h = 0$；垂直于矢径运动的航天器则具有其速度所允许的最大角动量。$h = r v_\perp$为常数意味着横向速度与距离成反比：偏心轨道上的卫星在近地点快、在远地点慢，在两个拱点处（$v_r = 0$）有$r_p v_p = r_a v_a$。

::: definition 航迹角 {#def-gamma}
**航迹角**$\gamma$是速度矢量与当地水平方向（轨道平面内垂直于$\mathbf{r}$的方向）之间的夹角，航天器上升（$v_r > 0$）时为正：
$$
\tan\gamma = \frac{v_r}{v_\perp}, \qquad v_r = v\sin\gamma, \qquad v_\perp = v\cos\gamma, \qquad h = r v\cos\gamma.
$$
在近拱点和远拱点处$\gamma = 0$。
:::

## 能量：活力公式 {#sec-energy}

::: proposition 比能量守恒 {#prop-energy}
**比机械能**（specific orbital energy）
$$
\varepsilon = \frac{v^2}{2} - \frac{\mu}{r}
$$ {#eq-energy}
沿任何二体轨道都是常数。势能以无穷远分离处为零点，因此$\varepsilon < 0$意味着物体无法逃逸。
:::

::: proof
把[[#eq-relative]]与$\dot{\mathbf{r}}$作点积：
$$
\dot{\mathbf{r}}\cdot\ddot{\mathbf{r}} + \frac{\mu}{r^3}\,\mathbf{r}\cdot\dot{\mathbf{r}} = 0.
$$
而$\dot{\mathbf{r}}\cdot\ddot{\mathbf{r}} = \tfrac{\mathrm{d}}{\mathrm{d}t}\left(\tfrac12 v^2\right)$；由于$r^2 = \mathbf{r}\cdot\mathbf{r}$，有$2r\dot r = 2\,\mathbf{r}\cdot\dot{\mathbf{r}}$，所以$\mathbf{r}\cdot\dot{\mathbf{r}} = r\dot r$，$\mu\,\mathbf{r}\cdot\dot{\mathbf{r}}/r^3 = \mu\dot r/r^2 = \tfrac{\mathrm{d}}{\mathrm{d}t}\left(-\mu/r\right)$。因此$\tfrac{\mathrm{d}}{\mathrm{d}t}\left(\tfrac12v^2 - \mu/r\right) = 0$。除[[#eq-relative]]外，唯一的假设是没有非保守力作用。
:::

一旦知道（由下面的[[#thm-orbit]]）半长轴为$a$的椭圆有$\varepsilon = -\mu/(2a)$，能量方程就变成本学科中最常用的公式
$$
v^2 = \mu\left(\frac{2}{r} - \frac{1}{a}\right),
$$ {#eq-visviva}
即**活力公式**（vis-viva equation）。它仅由距离和轨道大小就给出轨道上任一处的速度，与轨道形状和运动方向都无关。

## 偏心率矢量与轨道方程 {#sec-orbit-equation}

角动量和能量是运动的两个积分。第三个积分不那么明显，它确定轨道在其平面内的指向，并直接给出轨道形状。

::: theorem 轨道方程 {#thm-orbit}
对$\mathbf{h} \ne \mathbf{0}$，矢量
$$
\mathbf{e} = \frac{\dot{\mathbf{r}}\times\mathbf{h}}{\mu} - \frac{\mathbf{r}}{r}
$$ {#eq-evec}
（**偏心率矢量**）是常矢量，位于轨道平面内，并由焦点指向近拱点。记$e = \lVert\mathbf{e}\rVert$，$\theta$为**真近点角**（true anomaly，从$\mathbf{e}$到$\mathbf{r}$、沿运动方向量取的角），则轨道为
$$
r = \frac{p}{1 + e\cos\theta}, \qquad p = \frac{h^2}{\mu},
$$ {#eq-orbit}
这是一条以中心天体为一个焦点、偏心率为$e$、半通径为$p$的圆锥曲线。此外
$$
e^2 = 1 + \frac{2\varepsilon h^2}{\mu^2}.
$$ {#eq-e-energy}
:::

::: proof
**守恒性。**利用$\dot{\mathbf{h}} = \mathbf{0}$和[[#eq-relative]]，
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{\mathbf{r}}\times\mathbf{h}\right) = \ddot{\mathbf{r}}\times\mathbf{h} = -\frac{\mu}{r^3}\,\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}).
$$
由矢量三重积，$\mathbf{r}\times(\mathbf{r}\times\dot{\mathbf{r}}) = \mathbf{r}\,(\mathbf{r}\cdot\dot{\mathbf{r}}) - \dot{\mathbf{r}}\,r^2 = r\dot r\,\mathbf{r} - r^2\dot{\mathbf{r}}$，所以
$$
\frac{\mathrm{d}}{\mathrm{d}t}\left(\dot{\mathbf{r}}\times\mathbf{h}\right) = \mu\left(\frac{\dot{\mathbf{r}}}{r} - \frac{\dot r\,\mathbf{r}}{r^2}\right) = \mu\,\frac{\mathrm{d}}{\mathrm{d}t}\left(\frac{\mathbf{r}}{r}\right).
$$
积分得$\dot{\mathbf{r}}\times\mathbf{h} - \mu\,\mathbf{r}/r$为常矢量，它就是$\mu\mathbf{e}$。$\dot{\mathbf{r}}\times\mathbf{h}$和$\mathbf{r}$都垂直于$\mathbf{h}$，因此$\mathbf{e}$位于轨道平面内。

**形状。**把[[#eq-evec]]与$\mathbf{r}$作点积，并利用$\mathbf{r}\cdot(\dot{\mathbf{r}}\times\mathbf{h}) = \mathbf{h}\cdot(\mathbf{r}\times\dot{\mathbf{r}}) = h^2$（标量三重积的轮换性）：
$$
\mathbf{r}\cdot\mathbf{e} = r e\cos\theta = \frac{h^2}{\mu} - r \quad\Longrightarrow\quad r = \frac{h^2/\mu}{1 + e\cos\theta}.
$$
这是焦点在原点、偏心率为$e$、半通径$p = h^2/\mu$的圆锥曲线的极坐标方程。$r$的最小值出现在$\theta = 0$处，因此$\mathbf{e}$指向近拱点。

**能量关系。**由于$\dot{\mathbf{r}}\perp\mathbf{h}$，$\lVert\dot{\mathbf{r}}\times\mathbf{h}\rVert = vh$；且如上所述$(\dot{\mathbf{r}}\times\mathbf{h})\cdot\mathbf{r} = h^2$。把[[#eq-evec]]平方：
$$
\mu^2 e^2 = v^2h^2 - 2\mu\frac{h^2}{r} + \mu^2 = 2h^2\left(\frac{v^2}{2} - \frac{\mu}{r}\right) + \mu^2 = 2h^2\varepsilon + \mu^2,
$$
这就是[[#eq-e-energy]]。
:::

轨道方程包含了全部几何信息。对于**椭圆**（$0 \le e < 1$），近拱点和远拱点半径为$r_p = p/(1+e)$和$r_a = p/(1-e)$，半长轴为$a = (r_p + r_a)/2 = p/(1-e^2)$，并且
$$
e = \frac{r_a - r_p}{r_a + r_p}, \qquad r_p = a(1-e), \qquad r_a = a(1+e).
$$
把$p = a(1-e^2)$代入[[#eq-e-energy]]，得$1 - e^2 = -2\varepsilon h^2/\mu^2 = -2\varepsilon\,a(1-e^2)/\mu$，因此
$$
\varepsilon = -\frac{\mu}{2a},
$$ {#eq-energy-a}
正是它把能量积分变成了活力公式[[#eq-visviva]]。能量只取决于半长轴：所有$a$相同的椭圆，从圆到细如针的径向椭圆，都具有相同的能量和（如我们将要证明的）相同的周期。

::: definition 圆锥曲线轨道 {#def-conics}
按偏心率和能量分类：

| 轨道 | $e$ | $\varepsilon$ | $a$ | $\theta$的范围 |
|---|---|---|---|---|
| 圆 | $0$ | $-\mu/(2r) < 0$ | $r$ | 全部 |
| 椭圆 | $0 < e < 1$ | $-\mu/(2a) < 0$ | $> 0$ | 全部 |
| 抛物线 | $1$ | $0$ | $\infty$ | $-180^\circ < \theta < 180^\circ$ |
| 双曲线 | $> 1$ | $\mu/(2\lvert a\rvert) > 0$ | $< 0$（约定） | $\lvert\theta\rvert < \theta_\infty = \arccos(-1/e)$ |

采用双曲线$a < 0$的约定后，$\varepsilon = -\mu/(2a)$、$p = a(1-e^2)$、$r_p = a(1-e)$和活力公式对每一种圆锥曲线都成立。
:::

::: widget parametric
r: (1 - e^2)/(1 + e*cos(t))
t: 0, 2pi
sliders: e=0.5:0:0.9:0.01
x: -2, 1.2
y: -1.1, 1.1
equal: true
caption: 半长轴固定为$a = 1$的椭圆轨道（焦点——中心天体——位于原点，近拱点在$x$轴正方向），按$r = a(1-e^2)/(1+e\cos\theta)$绘制。把偏心率滑块从$0$拖到$0.9$：轨道被拉长，但沿长轴的长度保持为$2a$，因此能量和周期都不变。移动描迹点并观察速度箭头：它在近拱点最长、在远拱点最短，二者之比为$r_a/r_p = (1+e)/(1-e)$——在$e = 0.9$时为十九比一。
:::

::: warning 高度不是半径 {#warn-altitude}
本章的每一个公式都使用$r$，即到吸引体**中心**的距离。轨道通常用离地面的**高度**$z = r - R$来给定。把“400 km 轨道”以$r = 400\ \mathrm{km}$代入$v = \sqrt{\mu/r}$，得到的是$31.6\ \mathrm{km/s}$而不是$7.67\ \mathrm{km/s}$。一个相关的失误是用高度计算偏心率，即$(z_a - z_p)/(z_a + z_p)$，而不是用半径；对于$250 \times 35\,786\ \mathrm{km}$的转移轨道，这样得到$0.986$而不是正确的$0.728$。在做任何其他事情之前先加上半径（地球取$R_E = 6378\ \mathrm{km}$），只在报告结果时才减去它。
:::

## 圆轨道、逃逸与周期 {#sec-circular}

**圆轨道**的$e = 0$且$r$为常数；取$a = r$，活力公式给出**圆轨道速度**
$$
v_c = \sqrt{\frac{\mu}{r}}.
$$ {#eq-vc}
**逃逸速度**是使$\varepsilon = 0$（抛物线）的速度：$v_\mathrm{esc} = \sqrt{2\mu/r} = \sqrt2\,v_c$。因此圆轨道上的航天器需要增加$(\sqrt2 - 1)v_c \approx 0.414\,v_c$的速度才能逃逸——前提是增量沿运动方向施加。

::: proposition 开普勒第三定律 {#prop-period}
半长轴为$a$的椭圆轨道的周期为
$$
T = 2\pi\sqrt{\frac{a^3}{\mu}}.
$$ {#eq-period}
等价地，**平均角速度**（mean motion）$n = 2\pi/T = \sqrt{\mu/a^3}$。
:::

::: proof
由[[#eq-areal]]，矢径以恒定速率$h/2$扫过面积，所以绕行一圈需时$T = (\text{椭圆面积})/(h/2) = 2\pi ab/h$，其中$b = a\sqrt{1-e^2}$为半短轴。代入$h = \sqrt{\mu p} = \sqrt{\mu a(1-e^2)}$，
$$
T = \frac{2\pi a\cdot a\sqrt{1-e^2}}{\sqrt{\mu a}\,\sqrt{1-e^2}} = 2\pi\sqrt{\frac{a^3}{\mu}}.
$$
偏心率被消去了。对于绕太阳运行的两颗行星，$T^2/a^3 = 4\pi^2/[G(m_\odot + m)]$在行星质量与太阳质量之比的精度内相同——这就是开普勒的经验定律，牛顿的形式通过$\mu = G(m_1+m_2)$对它作了修正。
:::

下图是地球轨道的活力公式，距离以千千米计。由于$\mu = 398\,600\ \mathrm{km^3/s^2} = 398.6\ (10^3\,\mathrm{km})\,(\mathrm{km/s})^2$，当$r$和$a$以$10^3\ \mathrm{km}$为单位时，$v^2 = 398.6\,(2/r - 1/a)$。

::: widget plot
f: sqrt(398.6*(2/x - 1/a)); sqrt(398.6/x); sqrt(2*398.6/x)
x: 6, 45
y: 0, 12
sliders: a=24.4:7:42.2:0.1
labels: v \text{ 半长轴为 } a \text{ 的轨道上}; v_c; v_\mathrm{esc}
vlines: 6.378
caption: 速度（km/s）随到地心距离（千千米）的变化（竖线是地球表面）。中间的曲线是圆轨道速度，最上面的是逃逸速度。第一条曲线是半长轴为$a$（滑块，$10^3\ \mathrm{km}$）的任意轨道上的速度；它在$r = a$处与圆轨道速度曲线相交，并在$r = 2a$处终止，那是具有该$a$的最扁（径向）轨道的远拱点。对于$a = 24.4$（地球同步转移轨道），读出近地点$r = 6.63$处的速度：约$10.2\ \mathrm{km/s}$；远地点$r = 42.2$处：约$1.6\ \mathrm{km/s}$，大致是该处圆轨道速度$3.07\ \mathrm{km/s}$的一半——这就是进入地球静止轨道需要在远地点进行第二次变轨的原因。
:::

::: example 低圆轨道 {#ex-leo}
一个空间站在高度$400\ \mathrm{km}$的圆轨道上。求其速度、周期、比能量，以及从该轨道逃逸所需的速度增量。
::: solution
半径：$r = 6378 + 400 = 6778\ \mathrm{km}$。圆轨道速度：
$$
v_c = \sqrt{\frac{398\,600}{6778}} = \sqrt{58.81} = 7.669\ \mathrm{km/s}.
$$
周期：
$$
T = 2\pi\sqrt{\frac{6778^3}{398\,600}} = 2\pi\sqrt{7.811\times10^{5}} = 5553\ \mathrm{s} = 92.6\ \mathrm{min}.
$$
能量：$\varepsilon = -\mu/(2r) = -398\,600/13\,556 = -29.40\ \mathrm{km^2/s^2}$（即$-29.40\ \mathrm{MJ/kg}$，因为$1\ \mathrm{km^2/s^2} = 10^6\ \mathrm{J/kg}$）。逃逸速度为$\sqrt2 \times 7.669 = 10.845\ \mathrm{km/s}$，所以速度增量为$3.176\ \mathrm{km/s}$。

**校核：**国际空间站的高度在$400$–$420\ \mathrm{km}$附近，每天绕地球约15.5圈；$1440/92.6 = 15.6$。单位质量的动能$\tfrac12 v^2 = 29.4\ \mathrm{MJ/kg}$等于$-\varepsilon$，对圆轨道理应如此（$v^2 = \mu/r$使动能等于势能绝对值的一半）。
:::
:::

::: example 地球同步转移轨道 {#ex-gto}
运载火箭把上面级送入近地点高度$250\ \mathrm{km}$、远地点位于地球静止轨道高度$35\,786\ \mathrm{km}$的轨道。求偏心率、比角动量、近地点和远地点速度以及周期。
::: solution
半径：$r_p = 6628\ \mathrm{km}$，$r_a = 42\,164\ \mathrm{km}$。于是$a = (r_p + r_a)/2 = 24\,396\ \mathrm{km}$，且
$$
e = \frac{r_a - r_p}{r_a + r_p} = \frac{35\,536}{48\,792} = 0.7283.
$$
由近拱点处的轨道方程，$r_p = h^2/[\mu(1+e)]$，所以
$$
h = \sqrt{\mu r_p(1+e)} = \sqrt{398\,600 \times 6628 \times 1.7283} = 67\,573\ \mathrm{km^2/s}.
$$
在拱点处速度纯为横向：$v_p = h/r_p = 10.195\ \mathrm{km/s}$，$v_a = h/r_a = 1.603\ \mathrm{km/s}$。周期为$T = 2\pi\sqrt{24\,396^3/398\,600} = 37\,922\ \mathrm{s} = 10.53\ \mathrm{h}$。

**校核：**近地点处的活力公式$\sqrt{398\,600\,(2/6628 - 1/24\,396)} = 10.195\ \mathrm{km/s}$，结果一致。速度比$v_p/v_a = 6.36$等于$r_a/r_p = 6.36$，符合角动量守恒的要求。近地点速度接近但低于当地逃逸速度$\sqrt{2\mu/r_p} = 10.97\ \mathrm{km/s}$：轨道是束缚的。
:::
:::

::: example 由状态求轨道 {#ex-state}
关机时航天器位于$r = 7000\ \mathrm{km}$，速度$v = 8.5\ \mathrm{km/s}$，航迹角$\gamma = +10^\circ$（上升）。求$a$、$e$、真近点角、近地点和远地点高度以及周期。
::: solution
能量和半长轴：
$$
\varepsilon = \frac{8.5^2}{2} - \frac{398\,600}{7000} = 36.125 - 56.943 = -20.818\ \mathrm{km^2/s^2}, \qquad a = -\frac{\mu}{2\varepsilon} = 9574\ \mathrm{km}.
$$
角动量：$h = rv\cos\gamma = 7000 \times 8.5 \times \cos 10^\circ = 58\,596\ \mathrm{km^2/s}$，所以$p = h^2/\mu = 8614\ \mathrm{km}$，$e = \sqrt{1 - p/a} = \sqrt{1 - 0.8997} = 0.3166$。

真近点角：由[[#eq-orbit]]，$e\cos\theta = p/r - 1 = 0.2306$；对轨道方程求导得$v_r = (\mu/h)\,e\sin\theta$，所以$e\sin\theta = h v_r/\mu = 58\,596 \times (8.5\sin 10^\circ)/398\,600 = 0.2170$。于是$\theta = \operatorname{atan2}(0.2170,\ 0.2306) = 43.3^\circ$。同时使用两个分量就确定了象限：$v_r > 0$表示航天器位于近地点和远地点之间，$0 < \theta < 180^\circ$。

拱点：$r_p = a(1-e) = 6543\ \mathrm{km}$（高度$165\ \mathrm{km}$），$r_a = a(1+e) = 12\,605\ \mathrm{km}$（高度$6227\ \mathrm{km}$）；周期$T = 2\pi\sqrt{a^3/\mu} = 9322\ \mathrm{s} = 2.59\ \mathrm{h}$。

**校核：**$r_p(1+e)$应等于$p$：$6543 \times 1.3166 = 8614\ \mathrm{km}$。$165\ \mathrm{km}$的近地点高度很低，大气阻力会在几天之内使该轨道坠落——上升的关机角损失了大量近地点高度，这就是运载火箭入轨时力求$\gamma \approx 0$的原因。
:::
:::

## 双曲线轨道 {#sec-hyperbola}

在双曲线上能量为正，当$r \to \infty$时速度趋于**双曲线剩余速度**（hyperbolic excess speed）
$$
v_\infty = \sqrt{2\varepsilon} = \sqrt{\frac{\mu}{-a}}, \qquad v^2 = v_\infty^2 + \frac{2\mu}{r} = v_\infty^2 + v_\mathrm{esc}^2(r).
$$ {#eq-vinf}
当$1 + e\cos\theta \to 0$，即在渐近真近点角$\theta_\infty = \arccos(-1/e)$处，半径趋于无穷。来向渐近线和去向渐近线之间的夹角为**偏转角**$\delta$，其中
$$
\sin\frac{\delta}{2} = \frac{1}{e}.
$$ {#eq-turn}
（两条渐近线之间、经过焦点一侧量取的夹角为$2\theta_\infty - 180^\circ$，且$\theta_\infty - 90^\circ = \arcsin(1/e)$。）略呈双曲线的轨道（$e$刚刚大于1）几乎使轨迹完全掉头；快速、远距离的飞越（$e \gg 1$）则几乎不使它弯曲。离开行星的出发轨道和引力辅助（在[[orbital-mechanics/interplanetary-trajectories]]中讨论）都建立在这两个公式以及$e = 1 + r_p v_\infty^2/\mu$之上，后者由$r_p = a(1-e)$和$a = -\mu/v_\infty^2$得出。

::: example 以给定剩余速度逃离地球 {#ex-hyperbolic}
一个位于300 km高度圆形停泊轨道上的探测器要以$v_\infty = 3.0\ \mathrm{km/s}$离开地球。求所需的近地点速度、在停泊轨道上沿切向施加时所需的冲量、出发双曲线的偏心率和偏转角。
::: solution
$r_p = 6678\ \mathrm{km}$。由[[#eq-vinf]]：
$$
v_p = \sqrt{3.0^2 + \frac{2 \times 398\,600}{6678}} = \sqrt{9.00 + 119.38} = 11.330\ \mathrm{km/s}.
$$
圆轨道速度为$\sqrt{398\,600/6678} = 7.726\ \mathrm{km/s}$，所以$\Delta v = 3.605\ \mathrm{km/s}$。偏心率为
$$
e = 1 + \frac{r_p v_\infty^2}{\mu} = 1 + \frac{6678 \times 9.00}{398\,600} = 1.1508,
$$
偏转角为$\delta = 2\arcsin(1/1.1508) = 120.7^\circ$。

**校核：**剩余速度的代价低得惊人。仅仅逃逸就需要$10.926 - 7.726 = 3.200\ \mathrm{km/s}$；多出的$0.405\ \mathrm{km/s}$就换来了无穷远处的$3\ \mathrm{km/s}$，因为在[[#eq-vinf]]中速度按平方和相加，而变轨是在引力势阱深处、航天器本已很快的地方进行的。这就是奥伯特效应（Oberth effect），在[[orbital-mechanics/orbital-manoeuvres]]中还会遇到。
:::
:::

::: example 卫星质量起作用的情形：地球与月球 {#ex-earth-moon}
月球到地球的平均距离为$a = 384\,400\ \mathrm{km}$。确定地月质心的位置，并把只用$\mu = Gm_E$和用$\mu = G(m_E + m_M)$预测的恒星周期与观测值$27.32$天进行比较。
::: solution
质心位于两球心连线上，距地心$a\,m_M/(m_E+m_M) = a\,\mu_M/(\mu_E + \mu_M)$：
$$
d_G = 384\,400 \times \frac{4903}{398\,600 + 4903} = 4671\ \mathrm{km},
$$
约在地表以下$1700\ \mathrm{km}$。两个天体每月绕这一点运行一周。

取$\mu = 398\,600$：$T = 2\pi\sqrt{384\,400^3/398\,600} = 2.372\times10^6\ \mathrm{s} = 27.45\ \mathrm{d}$。取$\mu = 403\,503\ \mathrm{km^3/s^2}$：$T = 27.28\ \mathrm{d}$。

**校核：**计入月球质量后，与观测值$27.32$天的差距大部分被消除；剩下的$0.15\,\%$是太阳的摄动，二体模型忽略了它。对于人造卫星，$m_2/m_1 \sim 10^{-21}$，这一区别无关紧要。
:::
:::

::: quiz
两颗卫星绕地球运行。卫星 A 在半径$20\,000\ \mathrm{km}$的圆轨道上；卫星 B 在近地点半径$8\,000\ \mathrm{km}$、远地点半径$32\,000\ \mathrm{km}$的椭圆轨道上。下列哪些说法正确？
- [x] 它们的周期相同。
- [x] 它们的比能量相同。
- [ ] 它们的比角动量相同。
- [x] 在 B 穿过$r = 20\,000\ \mathrm{km}$处，它的速度等于 A 的速度。
::: solution
B 的半长轴为$(8000 + 32\,000)/2 = 20\,000\ \mathrm{km}$，等于 A 的半径，所以能量$-\mu/(2a)$、周期$2\pi\sqrt{a^3/\mu}$以及（由只依赖于$r$和$a$的活力公式）任一给定半径处的速度都相同。角动量$h = \sqrt{\mu a(1-e^2)}$则不同：B 的$e = 0.6$，$h_B = 0.8\,h_A$。在$r = 20\,000\ \mathrm{km}$处，B 以 A 的速度运动，但不是水平运动——它在那里的航迹角为$\arccos 0.8 = 36.9^\circ$。
:::
:::

::: history
约翰内斯·开普勒（Johannes Kepler）从第谷·布拉赫（Tycho Brahe）对火星的观测中提炼出行星运动的前两条定律——以太阳为焦点的椭圆轨道，以及相等时间扫过相等面积——并发表于《新天文学》（*Astronomia Nova*，1609年）；联系周期与轨道大小的第三定律随后发表于《世界的和谐》（*Harmonices Mundi*，1619年）。艾萨克·牛顿（Isaac Newton）的《自然哲学的数学原理》（*Philosophiæ Naturalis Principia Mathematica*，1687年）由运动定律和平方反比引力推导出了这些定律：第一卷证明有心力给出等面积定律，证明沿以焦点为中心的圆锥曲线运动的物体受到平方反比力的作用，并针对绕行天体的质量修正了第三定律。其逆命题——平方反比力总是产生圆锥曲线——在《原理》中只是被陈述而没有完全证明；雅各布·赫尔曼（Jakob Hermann）和约翰·伯努利（Johann Bernoulli）在1710年前后给出了解析处理，赫尔曼找到了确定轨道指向的守恒矢量。这一矢量后来被拉普拉斯（Laplace）以及之后的哈密顿（Hamilton）和吉布斯（Gibbs）重新发现，如今通常称为拉普拉斯-龙格-楞次矢量（Laplace–Runge–Lenz vector）——即[[#thm-orbit]]中的偏心率矢量乘以$\mu$。
:::

## 后续内容 {#sec-next}

轨道方程给出了$r$作为真近点角的函数，但没有说明航天器*何时*处于给定的$\theta$；这需要开普勒方程，即[[orbital-mechanics/orbital-position-time]]的主题。轨道平面和偏心率矢量在空间中的指向由[[orbital-mechanics/orbital-elements]]中的轨道根数描述，而这里推导的矢量$\mathbf{h}$和$\mathbf{e}$正是由测得的位置和速度计算轨道根数的方法。

::: summary
- 两个质点的相对运动满足$\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$，$\mu = G(m_1+m_2)$；它们的质心作匀速运动。
- $\mathbf{h} = \mathbf{r}\times\mathbf{v}$为常矢量：轨道是平面的，$h = rv_\perp = r^2\dot\theta$，相等时间内扫过相等面积。
- $\varepsilon = v^2/2 - \mu/r$为常数且等于$-\mu/(2a)$，由此得活力公式$v^2 = \mu(2/r - 1/a)$。
- 偏心率矢量$\mathbf{e} = \mathbf{v}\times\mathbf{h}/\mu - \mathbf{r}/r$指向近拱点，并给出轨道方程$r = (h^2/\mu)/(1+e\cos\theta)$，这是一条$e^2 = 1 + 2\varepsilon h^2/\mu^2$的圆锥曲线。
- 圆$e = 0$，椭圆$0<e<1$，抛物线$e = 1$（$\varepsilon = 0$），双曲线$e>1$，其$v_\infty = \sqrt{2\varepsilon}$，偏转角满足$\sin(\delta/2) = 1/e$。
- $v_c = \sqrt{\mu/r}$，$v_\mathrm{esc} = \sqrt{2}\,v_c$，$T = 2\pi\sqrt{a^3/\mu}$与$e$无关。
- 始终使用从天体中心量起的半径，而不是高度。
:::

## 习题

::: exercise 地球静止轨道速度 {level=1 check="3.07"}
地球静止卫星在半径$42\,164\ \mathrm{km}$的圆轨道上运动。求其轨道速度。（以 km/s 为单位输入速度，保留三位有效数字。）
::: solution
$v_c = \sqrt{\mu/r} = \sqrt{398\,600/42\,164} = \sqrt{9.4536} = 3.07\ \mathrm{km/s}$（$3.0747$）。校核：周长$2\pi \times 42\,164 = 264\,924\ \mathrm{km}$除以恒星日$86\,164\ \mathrm{s}$得$3.075\ \mathrm{km/s}$，对于与地球自转同步的轨道理应如此。
:::
:::

::: exercise 从火星逃逸 {level=1 check="5.02"}
求火星表面的逃逸速度（$\mu = 42\,828\ \mathrm{km^3/s^2}$，$R = 3396\ \mathrm{km}$），忽略大气和行星自转。（以 km/s 为单位输入速度，保留三位有效数字。）
::: solution
$v_\mathrm{esc} = \sqrt{2\mu/R} = \sqrt{2 \times 42\,828/3396} = \sqrt{25.22} = 5.02\ \mathrm{km/s}$，不到地球$11.2\ \mathrm{km/s}$的一半。
:::
:::

::: exercise 椭圆轨道的周期 {level=1 check="110.5"}
一颗地球卫星的近地点高度为$500\ \mathrm{km}$，远地点高度为$2000\ \mathrm{km}$。求其周期。（以分钟为单位输入周期，保留四位有效数字。）
::: solution
$r_p = 6878\ \mathrm{km}$，$r_a = 8378\ \mathrm{km}$，$a = 7628\ \mathrm{km}$。$T = 2\pi\sqrt{7628^3/398\,600} = 6630\ \mathrm{s} = 110.5\ \mathrm{min}$。它只取决于$a$：高度$1250\ \mathrm{km}$的圆轨道具有相同的周期。
:::
:::

::: exercise 由水平关机求远地点 {level=2 check="3991"}
航天器在$r = 8000\ \mathrm{km}$处以$7.5\ \mathrm{km/s}$水平运动（$\gamma = 0$）。这一点是近地点还是远地点？求另一个拱点的高度。（以 km 为单位输入高度，精确到千米。）
::: solution
当地圆轨道速度为$\sqrt{398\,600/8000} = 7.059\ \mathrm{km/s}$；航天器比它快，因此会爬升：这一点是**近地点**。能量：$\varepsilon = 7.5^2/2 - 398\,600/8000 = 28.125 - 49.825 = -21.700\ \mathrm{km^2/s^2}$，所以$a = 398\,600/43.400 = 9184.3\ \mathrm{km}$，$r_a = 2a - r_p = 10\,368.7\ \mathrm{km}$。高度：$10\,368.7 - 6378 = 3991\ \mathrm{km}$。用角动量校核：$v_a = r_p v_p/r_a = 5.787\ \mathrm{km/s}$，而$r_a$处的活力公式给出$\sqrt{398\,600(2/10\,368.7 - 1/9184.3)} = 5.787\ \mathrm{km/s}$。
:::
:::

::: exercise 由速度分量求偏心率 {level=2 check="0.332"}
跟踪站测得一颗地球卫星位于$r = 10\,000\ \mathrm{km}$，径向速度$v_r = 2.0\ \mathrm{km/s}$，横向速度$v_\perp = 6.5\ \mathrm{km/s}$。求偏心率和真近点角，并判断该轨道是否不受大气影响。（输入$e$，保留三位有效数字。）
::: solution
$h = r v_\perp = 65\,000\ \mathrm{km^2/s}$。于是$e\cos\theta = h v_\perp/\mu - 1 = 65\,000 \times 6.5/398\,600 - 1 = 0.0600$，$e\sin\theta = h v_r/\mu = 0.3261$。所以$e = \sqrt{0.0600^2 + 0.3261^2} = 0.332$，$\theta = \operatorname{atan2}(0.3261, 0.0600) = 79.6^\circ$。近地点：$r_p = (h^2/\mu)/(1+e) = 10\,600/1.332 = 7960\ \mathrm{km}$，高度$1582\ \mathrm{km}$——远在大气层之外。（关系式$e\cos\theta = h v_\perp/\mu - 1$由$v_\perp = h/r$和轨道方程得出。）
:::
:::

::: exercise 快速飞越的剩余速度 {level=2 check="5.30"}
航天器以近地点高度$500\ \mathrm{km}$、近地点速度$12.0\ \mathrm{km/s}$飞越地球。求其双曲线剩余速度、轨迹的偏心率以及地球使其速度转过的角度。（以 km/s 为单位输入$v_\infty$，保留三位有效数字。）
::: solution
$r_p = 6878\ \mathrm{km}$，$v_\mathrm{esc}^2 = 2\mu/r_p = 115.91\ \mathrm{km^2/s^2}$，所以$v_\infty = \sqrt{144 - 115.91} = 5.30\ \mathrm{km/s}$。$e = r_p v_p^2/\mu - 1 = 6878 \times 144/398\,600 - 1 = 1.485$（等价地为$1 + r_pv_\infty^2/\mu$）。偏转角$\delta = 2\arcsin(1/1.485) = 84.7^\circ$。
:::
:::

::: exercise 最大航迹角 {#exr-gamma level=3 check="30"}
证明在椭圆上$\tan\gamma = e\sin\theta/(1 + e\cos\theta)$，且$\gamma$在$\cos\theta = -e$处最大，$\sin\gamma_\mathrm{max} = e$。求$e = 0.5$时的$\gamma_\mathrm{max}$。（以度为单位输入角度。）
::: solution
由$h = r^2\dot\theta$和轨道方程，$v_\perp = h/r = (\mu/h)(1 + e\cos\theta)$。把$r = p/(1+e\cos\theta)$对时间求导，$\dot r = p\,e\sin\theta\,\dot\theta/(1+e\cos\theta)^2 = (e\sin\theta)\,r^2\dot\theta/p = (\mu/h)\,e\sin\theta$。所以$\tan\gamma = v_r/v_\perp = e\sin\theta/(1+e\cos\theta)$。

令$\mathrm{d}(\tan\gamma)/\mathrm{d}\theta = 0$：$\cos\theta(1+e\cos\theta) + e\sin^2\theta = 0$，即$\cos\theta + e = 0$。此处$\sin\theta = \sqrt{1-e^2}$，$\tan\gamma_\mathrm{max} = e\sqrt{1-e^2}/(1-e^2) = e/\sqrt{1-e^2}$，即$\sin\gamma_\mathrm{max} = e$。对$e = 0.5$：$\gamma_\mathrm{max} = 30^\circ$，在$\theta = 120^\circ$处达到。点$\cos\theta = -e$是短轴的端点，那里$r = a$——也正是速度等于圆轨道速度$\sqrt{\mu/a}$的地方。
:::
:::

::: exercise 设计半日轨道 {level=3 check="39770"}
一项通信任务需要周期为半个恒星日（$43\,082\ \mathrm{s}$）、近地点高度为$600\ \mathrm{km}$的轨道，使卫星每圈的大部分时间都处在高远地点附近。求半长轴、远地点高度和偏心率，并对这一设计作出评述。（以 km 为单位输入远地点高度，精确到 10 km。）
::: solution
由[[#eq-period]]，$a = \left[\mu\,(T/2\pi)^2\right]^{1/3} = \left[398\,600 \times 6856.7^2\right]^{1/3} = 26\,562\ \mathrm{km}$。由$r_p = 6978\ \mathrm{km}$，$r_a = 2a - r_p = 46\,145\ \mathrm{km}$：远地点高度$39\,767\ \mathrm{km}$，精确到 10 km 为$39\,770\ \mathrm{km}$。偏心率$e = (r_a - r_p)/(r_a + r_p) = 0.737$。

评述：由开普勒第二定律，卫星在远地点附近运动缓慢（$v_a = 1.51\ \mathrm{km/s}$，而$v_p = 9.96\ \mathrm{km/s}$），因此它每圈的大部分时间都高悬在一个半球上空——这就是俄罗斯闪电（Molniya）轨道的原理。二体模型忽略的两件事决定了这一设计能否成立：除非轨道倾角约为$63.4^\circ$，地球扁率会使拱线转动（[[orbital-mechanics/perturbations]]）；而$600\ \mathrm{km}$的近地点每天两次穿过辐射带。
:::
:::

::: exercise 作为极限的抛物线 {level=3}
(a) 证明在抛物线轨道上速度处处恰好等于当地逃逸速度，且航迹角$\gamma = \theta/2$。(b) 利用偏心率矢量证明：若半径$r$处的航天器速度$v$满足$v^2 r/\mu = 2$，则无论其方向*如何*（竖直向上或向下除外），轨道都是抛物线；并用$r$和$\gamma$表示其近拱点半径。
::: solution
(a) 对$e = 1$，[[#eq-e-energy]]给出$\varepsilon = 0$，所以$v^2 = 2\mu/r = v_\mathrm{esc}^2$。由[[#exr-gamma]]，$\tan\gamma = \sin\theta/(1+\cos\theta) = \tan(\theta/2)$（半角公式），所以$\gamma = \theta/2$：速度从近拱点处的水平方向转到无穷远处（$\theta \to 180^\circ$）的径向。

(b) 若$v^2 = 2\mu/r$，则对任意$h \ne 0$都有$\varepsilon = 0$和$e = 1$，所以无论方向如何轨道都是抛物线。由$h = rv\cos\gamma$，$p = h^2/\mu = r^2 v^2\cos^2\gamma/\mu = 2r\cos^2\gamma$，$r_p = p/2 = r\cos^2\gamma$。水平发射（$\gamma = 0$）使发射点成为近拱点；发射越陡，近拱点越向内移——如果$r\cos^2\gamma$小于行星半径，轨迹向后的延长线会穿过行星，这在离去时无害，但在来向时是致命的。
:::
:::
