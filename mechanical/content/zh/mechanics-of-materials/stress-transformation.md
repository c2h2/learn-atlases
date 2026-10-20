在受载梁、受压壳体或焊接接头内部，材料很少只受单向拉伸。它一个方向受拉、另一个方向受剪，而在过该点倾斜的某个平面上，这个组合产生的正应力大于任一分量、切应力也大于任一分量。你见过的几乎每一条破坏面——低碳钢拉伸试样上的 $45^{\circ}$ 杯锥、受扭铸铁棒的螺旋裂缝、混凝土梁的斜裂缝、疲劳试样的鱼口——都是这些变换应力之一达到临界值的平面。

整个主题就是一个方程，或者等价地，一个圆。给定两个互相垂直面上的 $\sigma_x$、$\sigma_y$ 和 $\tau_{xy}$，倾角 $\theta$ 斜面上的应力为
$$
\sigma_{x'} = \frac{\sigma_x + \sigma_y}{2} + \frac{\sigma_x - \sigma_y}{2} \cos 2 \theta + \tau_{xy} \sin 2 \theta, \qquad
\tau_{x'y'} = - \frac{\sigma_x - \sigma_y}{2} \sin 2 \theta + \tau_{xy} \cos 2 \theta ,
$$
而莫尔圆不过是当 $\theta$ 从 $0$ 变到 $180^{\circ}$ 时这两个方程的图像。学会这个圆，你就能在五秒钟内、不做任何代数，答出最大正应力是多少、在哪个面上、最大切应力是多少、以及与轴线成 $37^{\circ}$ 的焊缝上应力是什么。

::: warning 符号约定各不相同，莫尔圆正是它们咬人之处
上面的变换方程采用**连续介质力学**约定：拉正应力为正，$\tau_{xy}$ 在 $+ x$ 面上沿 $+ y$ 方向时为正。莫尔圆作图要求你决定顺时针切应力画向上还是向下，教材几乎对半分。选定一种约定、始终如一地使用；若你在读别人圆上的结果，先拿代数公式对一个角度验证，再相信其余部分。主应力和最大切应力的**大小**从不依赖约定；只有所画切应力的符号和角度转向依赖。
:::

## 应力变换方程

::: definition 平面应力变换 {#def-transformation}
对平面应力状态 $(\sigma_x, \sigma_y, \tau_{xy})$，法线与 $x$ 轴成逆时针角 $\theta$ 的平面上的应力为
$$
\sigma_{x'} = \frac{\sigma_x + \sigma_y}{2} + \frac{\sigma_x - \sigma_y}{2} \cos 2\theta + \tau_{xy} \sin 2\theta ,
$$
$$
\tau_{x'y'} = - \frac{\sigma_x - \sigma_y}{2} \sin 2\theta + \tau_{xy} \cos 2\theta ,
\qquad
\sigma_{y'} = \sigma_x + \sigma_y - \sigma_{x'} .
$$
对一切 $\theta$ 成立两个不变量：
$$
\sigma_{x'} + \sigma_{y'} = \sigma_x + \sigma_y = \text{常数}, \qquad
\left( \sigma_{x'} - \sigma_{\text{avg}} \right)^{2} + \tau_{x'y'}^{2} = R^{2} .
$$
:::

::: proof
沿倾角 $\theta$ 的平面切开单元体，隔离出斜面面积为 $A$ 的楔块。另外两个面的面积为 $A \cos \theta$ 和 $A \sin \theta$。把这些面上的力沿斜面法向和斜面内分解：
$$
\sigma_{x'} A = \sigma_x (A \cos \theta) \cos \theta + \sigma_y (A \sin \theta) \sin \theta
+ \tau_{xy} (A \cos \theta) \sin \theta + \tau_{xy} (A \sin \theta) \cos \theta ,
$$
$$
\tau_{x'y'} A = - \sigma_x (A \cos \theta) \sin \theta + \sigma_y (A \sin \theta) \cos \theta
+ \tau_{xy} (A \cos \theta) \cos \theta - \tau_{xy} (A \sin \theta) \sin \theta .
$$
利用 $\cos^{2} \theta = (1 + \cos 2 \theta) / 2$、$\sin^{2} \theta = (1 - \cos 2 \theta) / 2$ 和 $2 \sin \theta \cos \theta = \sin 2 \theta$ 即得两个变换方程。第一个不变量由 $\sigma_{x'}$ 加 $\sigma_{y'}$ 得到；第二个由平方相加得到，因为 $\cos^{2} 2 \theta + \sin^{2} 2 \theta = 1$。
:::

::: theorem 主应力与最大切应力 {#thm-principal}
**主应力**——正应力的极值——出现在切应力为零的平面上，其值为
$$
\sigma_{1,2} = \frac{\sigma_x + \sigma_y}{2} \pm \sqrt{\left( \frac{\sigma_x - \sigma_y}{2} \right)^{2} + \tau_{xy}^{2}}
= \sigma_{\text{avg}} \pm R ,
$$
方位为
$$
\tan 2 \theta_p = \frac{2 \tau_{xy}}{\sigma_x - \sigma_y} .
$$
**面内最大切应力**是圆的半径，
$$
\tau_{\max, \text{面内}} = R = \frac{\sigma_1 - \sigma_2}{2},
$$
作用在与主平面成 $45^{\circ}$ 的平面上，该平面上的正应力为 $\sigma_{\text{avg}}$。
:::

::: example 主应力 {#ex-principal}
某点 $\sigma_x = 80\ \mathrm{MPa}$、$\sigma_y = - 40\ \mathrm{MPa}$、$\tau_{xy} = 30\ \mathrm{MPa}$。求主应力及其方位、面内最大切应力，以及 $25^{\circ}$ 斜面上的应力。
::: solution
$$
\sigma_{\text{avg}} = \frac{80 - 40}{2} = 20\ \mathrm{MPa}, \qquad
R = \sqrt{60^{2} + 30^{2}} = 67.1\ \mathrm{MPa},
$$
$$
\sigma_1 = 87.1\ \mathrm{MPa}, \qquad \sigma_2 = - 47.1\ \mathrm{MPa}.
$$
**方位。**
$$
\tan 2 \theta_p = \frac{2 \times 30}{80 + 40} = 0.500
\quad\Longrightarrow\quad
\theta_p = 13.3^{\circ} \text{ 和 } 103.3^{\circ}.
$$
**面内最大切应力。**
$$
\tau_{\max} = 67.1\ \mathrm{MPa}, \qquad
\sigma_{\text{该面上}} = 20\ \mathrm{MPa}, \qquad
\theta_s = 13.3 + 45 = 58.3^{\circ}.
$$
**$25^{\circ}$ 斜面上**，$2 \theta = 50^{\circ}$：
$$
\sigma_{x'} = 20 + 60 \cos 50 + 30 \sin 50 = 20 + 38.6 + 23.0 = 81.6\ \mathrm{MPa},
$$
$$
\tau_{x'y'} = - 60 \sin 50 + 30 \cos 50 = - 46.0 + 19.3 = - 26.7\ \mathrm{MPa}.
$$
**校核。** $\sigma_{x'} + \sigma_{y'} = 40 = \sigma_x + \sigma_y$ 要求 $\sigma_{y'} = - 41.6\ \mathrm{MPa}$，且
$$
(81.6 - 20)^{2} + 26.7^{2} = 3794 + 713 = 4507 = 67.1^{2} . \checkmark
$$
该点在圆上，这是必然的。

**合理性。** 注意最大正应力 $87.1\ \mathrm{MPa}$ 比最大的外加分量高 $9$ 个百分点——看起来是 $80$ 和 $- 40$ 的应力状态，实际上是 $87$ 和 $- 47$ 作用在谁也没画出的平面上。这就是为什么压力容器的纵缝——在轴向根本不受载——仍须校核：作用在它上面的应力是环向应力，是两个主应力中较大的那个。
:::
:::

::: widget plot
f: sqrt(67.08^2-(x-20)^2)
x: -47.1, 87.1
y: 0, 68
labels: \text{切应力（MPa）}
caption: 例 1 莫尔圆的上半圆：圆心在 $\sigma_{\text{avg}} = 20\ \mathrm{MPa}$，半径 $R = 67.1\ \mathrm{MPa}$，与水平轴交于主应力 $87.1$ 和 $- 47.1\ \mathrm{MPa}$。圆顶是作用在 $58.3^{\circ}$ 斜面上的面内最大切应力 $67.1\ \mathrm{MPa}$，$25^{\circ}$ 对应的点位于 $(81.6, - 26.7)$。圆上的角度是 $2 \theta$，所以物理上转 $25^{\circ}$ 是绕圆走 $50^{\circ}$——这是读圆时最常见的错误。
:::

::: example 弯曲与扭转组合 {#ex-shaft-element}
传动轴表面某截面承受弯曲应力 $60\ \mathrm{MPa}$ 和扭转切应力 $40\ \mathrm{MPa}$。求主应力、最大切应力及其方位。
::: solution
这里 $\sigma_x = 60\ \mathrm{MPa}$、$\sigma_y = 0$、$\tau_{xy} = 40\ \mathrm{MPa}$，所以
$$
\sigma_{\text{avg}} = 30\ \mathrm{MPa}, \qquad
R = \sqrt{30^{2} + 40^{2}} = 50\ \mathrm{MPa},
$$
$$
\sigma_1 = 80\ \mathrm{MPa}, \qquad \sigma_2 = - 20\ \mathrm{MPa}, \qquad
\tau_{\max} = 50\ \mathrm{MPa},
$$
$$
\tan 2 \theta_p = \frac{2 \times 40}{60} = 1.333
\quad\Longrightarrow\quad
\theta_p = 26.6^{\circ}, \qquad \theta_s = 71.6^{\circ}.
$$
**校核。** $\sigma_1 \sigma_2 = 80 \times (-20) = -1600$，$I_3 = \sigma_x \sigma_y - \tau_{xy}^{2} = 0 - 1600$。$\checkmark$

**合理性。** 这些数按构造就是一个 $3:4:5$ 三角形，而且不是本例的巧合：$\sigma = 60$、$\tau = 40$ 的组合是每个轴设计者都会遇到的，因为等效冯·米塞斯应力为 $\sqrt{\sigma^{2} + 3 \tau^{2}} = \sqrt{3600 + 4800} = 91.7\ \mathrm{MPa}$、最大切应力为 $50\ \mathrm{MPa}$，两者都是两个分量的简单倍数。由此得出两个推论。第一，最大切应力 $50\ \mathrm{MPa}$ 比单独的扭转切应力高 $25$ 个百分点，所以同时受弯受扭的轴必须按组合定尺寸，而不是按两者中较大的那个。第二，$80\ \mathrm{MPa}$ 的主拉应力作用在与轴线成 $26.6^\circ$ 的方向，这就是为什么受弯受扭轴的疲劳裂纹在最大弯矩处先以**横向**裂纹起始，然后随着扭转占主导转向 $45^\circ$——一条有两个明显区域的断口，一个经典的诊断特征。
:::
:::

## 绝对最大切应力与三维效应

::: proposition 面内并非全部 {#prop-abs-shear}
过 $\sigma_1$ 和 $\sigma_2$ 画的圆只是三个圆之一。**绝对最大切应力**是三个主应力中最大者与最小者之差的一半，对 $\sigma_3 = 0$ 的平面应力状态意味着
$$
\tau_{\text{abs}} = \begin{cases}
\dfrac{\sigma_1 - \sigma_2}{2} & \sigma_1, \sigma_2 \text{ 异号} \\[6pt]
\dfrac{\sigma_{\max}}{2} & \sigma_1, \sigma_2 \text{ 同号}
\end{cases}
$$
当两个面内主应力**同号**时，真正的最大切应力大于面内值，作用在与应力平面成 $45^{\circ}$ **倾出**该平面的平面上。压力容器封头、薄圆盘和双向受载板都处于这种状态。
:::

::: example 纯剪切与脆性断裂 {#ex-pure-shear}
纯扭转轴的表面切应力为 $40\ \mathrm{MPa}$。求主应力。预测 (a) 低碳钢、(b) 铸铁的破坏面。
::: solution
$\sigma_x = \sigma_y = 0$、$\tau_{xy} = 40\ \mathrm{MPa}$，
$$
\sigma_{\text{avg}} = 0, \qquad R = 40\ \mathrm{MPa}, \qquad
\sigma_1 = + 40\ \mathrm{MPa}, \quad \sigma_2 = - 40\ \mathrm{MPa},
$$
$$
\tan 2 \theta_p = \frac{2 \times 40}{0} \rightarrow \infty
\quad\Longrightarrow\quad
\theta_p = 45^{\circ}.
$$
**(a) 低碳钢**沿最大切应力面上的滑移屈服，而纯剪切的最大切应力面是切应力为零的面——横截面和纵截面。受扭的低碳钢轴沿**平的横截面**破坏，断口明亮呈纤维状，金属肉眼可见地拧转过。

**(b) 铸铁**抗拉弱，沿最大**拉**应力面破坏，该面与轴线成 $45^{\circ}$。受扭的铸铁轴沿干净的 $45^{\circ}$ **螺旋**面破坏，螺旋的旋向随扭转方向而定。

**合理性。** 这一个演示——粉笔棒受扭沿螺旋面断、受压沿横截面断——把最大正应力理论和最大切应力理论全部装进了一次课堂实验，这就是为什么强度理论必须配合材料来选。它也是为什么脆性扭杆危险、为什么铸铁制动鼓会从螺栓孔沿 $45^{\circ}$ 线开裂、为什么经典扭转试验是测量脆性材料抗拉强度的标准方法——它没有拉伸试样的对中难题。
:::
:::

::: example 梁内部的应力 {#ex-beam-point}
某梁在某一截面上，中性轴上方 $40\ \mathrm{mm}$ 处的弯曲应力为 $120\ \mathrm{MPa}$、切应力为 $20\ \mathrm{MPa}$，上方 $20\ \mathrm{mm}$ 处为 $80\ \mathrm{MPa}$ 和 $14\ \mathrm{MPa}$。求各点的主应力，并评论梁的危险点在何处。
::: solution
**A 点**（$\sigma = 120$，$\tau = 20$）：
$$
\sigma_{\text{avg}} = 60, \qquad R = \sqrt{60^{2} + 20^{2}} = 63.2\ \mathrm{MPa},
\qquad \sigma_1 = 123.2, \quad \sigma_2 = - 3.2\ \mathrm{MPa}.
$$
**B 点**（$\sigma = 80$，$\tau = 14$）：
$$
\sigma_{\text{avg}} = 40, \qquad R = \sqrt{40^{2} + 14^{2}} = 42.4\ \mathrm{MPa},
\qquad \sigma_1 = 82.4, \quad \sigma_2 = - 2.4\ \mathrm{MPa}.
$$
**中性轴处**（$\sigma = 0$，设 $\tau = 24$）：$\sigma_1 = + 24$，$\sigma_2 = - 24$。

**合理性。** 最大主应力在外纤维处——那里切应力为零——它只比弯曲应力高 $2.7$ 个百分点：那里没有切应力，变换几乎不动任何东西。最大**切应力**在中性轴处——那里弯曲应力为零。在两者之间、向外 $40\ \mathrm{mm}$ 处，主应力为 $123.2\ \mathrm{MPa}$，只比该纤维的纯弯曲值高 $2.7$ 个百分点。教训是：对**细长**梁，外纤维弯曲应力是安全且几乎精确的设计校核，内部各点从不控制；但对**短**梁、支座附近剪力大的梁、或切变强度相对抗拉强度低的材料——木材、混凝土、复合材料、玻璃陶瓷——的中性轴点，$\sigma_1 = \tau$、$\sigma_2 = - \tau$，是实实在在的 $45^\circ$ 开裂风险，钢筋混凝土梁支座附近的斜裂缝正是这个点在破坏。
:::
:::

## 应变及其测量

::: definition 应变变换与应变花 {#def-rosette}
应变按同样的方程变换，只需一处替换：
$$
\frac{\gamma_{x'y'}}{2} = \frac{\varepsilon_x + \varepsilon_y}{2} - \frac{\varepsilon_x - \varepsilon_y}{2} \cos 2\theta - \frac{\gamma_{xy}}{2} \sin 2\theta .
$$
注意**负**号和二分之一因子——工程切应变 $\gamma$ 是张量分量的两倍，这就是莫尔应变圆按 $\gamma / 2$ 绘制的原因。测得 $\varepsilon_0$、$\varepsilon_{45}$、$\varepsilon_{90}$ 的直角 $45^{\circ}$ 应变花给出
$$
\varepsilon_x = \varepsilon_0, \qquad
\varepsilon_y = \varepsilon_{90}, \qquad
\gamma_{xy} = 2 \varepsilon_{45} - \varepsilon_0 - \varepsilon_{90} .
$$
对平面应力，应力由胡克定律得出：
$$
\sigma_1 = \frac{E \left( \varepsilon_1 + \nu \varepsilon_2 \right)}{1 - \nu^{2}}, \qquad
\sigma_2 = \frac{E \left( \varepsilon_2 + \nu \varepsilon_1 \right)}{1 - \nu^{2}} .
$$
:::

::: example 应变花 {#ex-rosette}
钢表面上的 $45^{\circ}$ 应变花读数为 $\varepsilon_0 = 200$、$\varepsilon_{45} = 300$、$\varepsilon_{90} = 100$（微应变）。取 $E = 200\ \mathrm{GPa}$、$\nu = 0.3$。求主应力。
::: solution
$$
\varepsilon_x = 200, \qquad \varepsilon_y = 100, \qquad
\gamma_{xy} = 2 \times 300 - 200 - 100 = 300 \ \mu ,
$$
$$
\varepsilon_{\text{avg}} = 150, \qquad
R_\varepsilon = \sqrt{50^{2} + 150^{2}} = 158.1 \ \mu ,
$$
$$
\varepsilon_1 = 308 \ \mu, \qquad \varepsilon_2 = - 8.1 \ \mu, \qquad
\tan 2 \theta_p = \frac{300}{200 - 100} = 3.0 \Rightarrow \theta_p = 35.3^{\circ}.
$$
**应力。**
$$
\sigma_1 = \frac{200\,000 \left( 308 - 0.3 \times 8.1 \right) \times 10^{-6}}{1 - 0.09}
= \frac{200\,000 \times 305.6 \times 10^{-6}}{0.91} = 67.1\ \mathrm{MPa},
$$
$$
\sigma_2 = \frac{200\,000 \left( - 8.1 + 0.3 \times 308 \right) \times 10^{-6}}{0.91}
= \frac{200\,000 \times 84.3 \times 10^{-6}}{0.91} = 18.5\ \mathrm{MPa}.
$$
**校核。** 和 $\sigma_1 + \sigma_2 = 85.6\ \mathrm{MPa}$，而 $E (\varepsilon_x + \varepsilon_y) / (1 - \nu) = 200\,000 \times 300 \times 10^{-6} / 0.7 = 85.7\ \mathrm{MPa}$。$\checkmark$

**合理性。** 三个应变片、两分钟算术，你就知道了正在运行、受载、无法接近的一台机器上某点的完整二维应力状态。这就是实验应力分析用应变花而不用理论的原因：理论是精确的，几何不是。应变花唯一不能告诉你的事是**面外**应变，所以若该点靠近自由边、孔或焊缝，最后两行背后的"平面应力"假设可能不成立，应力可能偏差 $30$ 个百分点。
:::
:::

## 薄壁压力容器

::: theorem 薄容器的薄膜应力 {#thm-vessel}
对内半径 $r$、壁厚 $t$、内压 $p$ 且 $r / t > 10$ 的容器，壁内承受均匀的**薄膜**应力，沿厚度的应力可忽略：
$$
\sigma_{\text{环向}} = \frac{p r}{t}, \qquad
\sigma_{\text{轴向}} = \frac{p r}{2 t} \quad \text{（圆柱）},
\qquad
\sigma_{\text{环向}} = \sigma_{\text{轴向}} = \frac{p r}{2 t} \quad \text{（球）}.
$$
环向应力是轴向应力的两倍，所以圆柱容器**纵向**炸开。
:::

::: proof
**轴向。**沿垂直于轴线的平面切开圆柱，令端盖上的压力与壁内力平衡：
$$
p \pi r^{2} = \sigma_{\text{轴向}} \times 2 \pi r t
\quad\Longrightarrow\quad
\sigma_{\text{轴向}} = \frac{p r}{2 t} .
$$
**环向。**沿直径平面切开单位长度的圆柱，令投影面积 $2 r \times 1$ 上的压力与两壁上的壁内力平衡：
$$
p \times 2 r \times 1 = 2 \sigma_{\text{环向}} t \times 1
\quad\Longrightarrow\quad
\sigma_{\text{环向}} = \frac{p r}{t} .
$$
对球体，任切一个半球：压力为 $p \pi r^{2}$，壁内力为 $\sigma \times 2 \pi r t$，由对称性各方向都得 $\sigma = p r / (2 t)$。
:::

::: example 压力容器 {#ex-vessel}
一内径 $2\ \mathrm{m}$、壁厚 $12\ \mathrm{mm}$ 的圆柱形压力容器承受 $2.5\ \mathrm{MPa}$。求两个薄膜应力、壁内最大切应力，以及与环向成 $30^{\circ}$ 的螺旋焊缝上的正应力。
::: solution
$$
\sigma_{\text{环向}} = \frac{2.5 \times 1000}{12} = 208.3\ \mathrm{MPa}, \qquad
\sigma_{\text{轴向}} = 104.2\ \mathrm{MPa}.
$$
**最大切应力。**三个主应力为 $208.3$、$104.2$ 和 $0$（沿厚度方向）。于是
$$
\tau_{\text{面内}} = \frac{208.3 - 104.2}{2} = 52.1\ \mathrm{MPa}, \qquad
\tau_{\text{abs}} = \frac{208.3 - 0}{2} = 104.2\ \mathrm{MPa},
$$
绝对最大值作用在与厚度方向成 $45^{\circ}$ 的平面上，位于内外表面处。

**螺旋焊缝。**取 $x$ 为轴向，则 $\sigma_x = 104.2$、$\sigma_y = 208.3$，与环向成 $30^{\circ}$ 的焊缝线与轴线成 $\theta = 60^{\circ}$。由 $\tau_{xy} = 0$，
$$
\sigma_{x'} = \frac{104.2 + 208.3}{2} + \frac{104.2 - 208.3}{2} \cos 120^{\circ}
= 156.3 + 52.1 = 208.3 \times \ldots
$$
更直接地，**垂直于**焊缝的应力是环向应力在焊缝面上的分量。焊缝法线与环向成 $30^{\circ}$，
$$
\sigma_n = \sigma_{\text{轴向}} \cos^{2} 30^{\circ} + \sigma_{\text{环向}} \sin^{2} 30^{\circ}
= 104.2 \times 0.75 + 208.3 \times 0.25 = 78.2 + 52.1 = 130.3\ \mathrm{MPa},
$$
$$
\tau_{\text{焊缝}} = \left( \sigma_{\text{环向}} - \sigma_{\text{轴向}} \right) \sin 30^{\circ} \cos 30^{\circ}
= 104.2 \times 0.433 = 45.1\ \mathrm{MPa}.
$$
**合理性。** 三个值得带走的结果。环向应力是轴向的两倍，所以**纵向**焊缝——沿容器走的那条——承担的载荷是环焊缝的两倍，必须是焊得更好的那条；一条纵缝做了 X 光检验、环焊缝却没查过的容器，就是一具会沿长度裂开的容器。绝对最大切应力是面内值的两倍、沿厚度方向作用，这就是为什么材料延性时容器的破坏是内表面处的沿厚度剪切问题。而 $30^{\circ}$ 的螺旋焊缝承受 $130\ \mathrm{MPa}$ 正应力和 $45\ \mathrm{MPa}$ 切应力，这就是为什么螺旋焊管以约 $54^{\circ}$ 缠绕成型——那里环向和轴向载荷按两个纤维方向的强度成比例分担。
:::
:::

::: warning 莫尔圆力所不及之处
莫尔圆解决平面应力。它不解决：**接触应力**——赫兹压痕产生三向压缩应力状态，其最大切应力位于表面以下，而轴承和齿面恰恰在那里破坏；**应力集中**——主应力方向绕孔弯曲，圆只在单点有效；**残余应力**——它与外加应力叠加，可以在没有任何外载时达到屈服强度；**非比例加载**——主轴在循环中旋转而最大切应力面不转，这就是多轴疲劳没有公认准则的原因。四种情形下圆照旧要画——在一点、在一个瞬间——但答案不在圆里。
:::

::: history
变换应力状态的几何比应力概念本身更古老。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在 1822 年证明过任意点任一斜面上的面力由九个分量决定，并证明了如今称为柯西关系式；1828 年他证明存在三个互相垂直的方向，其上面力纯属法向——主方向——且三个正应力之和为不变量。圆本身归功于**克里斯蒂安·奥托·莫尔（Christian Otto Mohr）**（1835—1918），他 1882 年在一篇关于土体内摩擦的论文中发表了它，随后收入其《技术力学论文集》(*Abhandlungen aus dem Gebiete der technischen Mechanik*) 第二版；莫尔是务实的工程师，不信任欧陆弹性力学学派，而他的图解法被一代宁用直尺不用张量的工程师热情采纳。应变的平行作图法以及使其必要的实验文化，来自**克里斯蒂安·库尔曼（Christian Culmann）**及其苏黎世学生的工程学派；应变花代数则归于 1930 年代的光弹性与实验力学学派——解释粘贴式电阻应变片（爱德华·西蒙斯与阿瑟·鲁格 1938 年各自独立发明）的需求，把 $45^{\circ}$ 应变花公式变成了工程算术的标准条目。压力容器公式是拉梅 1852 年解答的特例，且早于该解答：锅炉的环向应力在 1820 年代就被工程师们经验地知道，而"锅炉纵缝的受力是环焊缝两倍"这条规则，在写进教科书之前就已见于贸易委员会的锅炉检验实务。
:::

::: quiz
某延性材料在一个平面内的主应力为 $+ 100\ \mathrm{MPa}$ 和 $+ 60\ \mathrm{MPa}$，第三个主应力为零。**面内**最大切应力准则与**绝对**最大切应力准则，哪个在更低的外加应力下预测屈服开始？
- [ ] 面内准则，因为它忽略了面外方向
- [ ] 两者预测相同
- [x] 绝对准则，因为真正的最大切应力更大
- [ ] 都不对，因为两个主应力都是拉的
::: solution
绝对准则。面内圆给出 $\tau = (100 - 60) / 2 = 20\ \mathrm{MPa}$，但该点任意处的最大切应力在与平面成 $45^\circ$ 倾出的平面上，连接 $100\ \mathrm{MPa}$ 与沿厚度的零应力：$\tau_{\text{abs}} = 50\ \mathrm{MPa}$，大两倍半。按面内圆校核的设计将不保守两倍半。规则很简单：三个圆都画，取最外圈。当两个面内主应力同号时，面内圆是中间那个，永远不是答案。
:::
:::

## 后续内容

主应力是 [[machine-design/static-failure]] 中每个强度理论的输入，是 [[machine-design/fatigue]] 疲劳准则和 [[machine-design/gear-design]] 接触应力计算的输入。三维推广见 [[solid-mechanics/stress-strain-3d]]，薄膜假设失效的厚壁情形见 [[solid-mechanics/thick-cylinders-discs]]。

::: summary
- 应力按 $2 \theta$ 变换，所以物理转角 $\theta$ 是绕莫尔圆走 $2 \theta$；正应力之和为不变量。
- 主应力为 $\sigma_{\text{avg}} \pm R$，$R = \sqrt{\left[ \left( \sigma_x - \sigma_y \right) / 2 \right]^{2} + \tau_{xy}^{2}}$，作用在切应力为零的平面上。
- 面内最大切应力为 $R$，作用在与主平面成 $45^{\circ}$ 的平面上，并与平均正应力同时作用。
- 当两个面内主应力同号时，**绝对**最大切应力为 $\sigma_{\max} / 2$、在面外作用——压力容器情形。
- 应变按 $\gamma / 2$ 同样变换；$45^{\circ}$ 应变花加胡克定律给出完整平面应力状态。
- 薄圆柱的环向应力是轴向的两倍，所以它纵向裂开，纵缝是危险焊缝。
:::

## 习题

::: exercise 读圆 {level=1 check="100"}
某点的莫尔圆圆心在 $60\ \mathrm{MPa}$、半径 $40\ \mathrm{MPa}$。较大的主应力是多少？
::: solution
$\sigma_1 = 60 + 40 = 100\ \mathrm{MPa}$，$\sigma_2 = 20\ \mathrm{MPa}$。面内最大切应力为 $40\ \mathrm{MPa}$。
:::
:::

::: exercise 主方向角 {level=1 check="45"}
什么样的应力状态，其主平面与 $x$、$y$ 轴成 $45^{\circ}$？
::: solution
$\sigma_x = \sigma_y$ 时，因为 $\tan 2 \theta_p = 2 \tau_{xy} / (\sigma_x - \sigma_y) \rightarrow \infty$ 要求 $\sigma_x = \sigma_y$。纯剪切是特例，这就是受扭轴和粉笔棒沿 $45^{\circ}$ 破坏的原因。
:::
:::

::: exercise 最大切应力 {level=1 check="40"}
某点的主应力为 $80\ \mathrm{MPa}$ 和 $20\ \mathrm{MPa}$，都是拉的，第三个为零。求绝对最大切应力。
::: solution
$\tau_{\text{abs}} = 80 / 2 = 40\ \mathrm{MPa}$，作用在与给定两应力平面成 $45^{\circ}$ 倾出的平面上。面内值是 $30\ \mathrm{MPa}$，那不是答案。
**注。** 答案是 $40\ \mathrm{MPa}$。这是压力容器设计中的陷阱：面内圆给出 $30$，真正的最大值是 $40$。
:::
:::

::: exercise 变换 {level=2}
$\sigma_x = 60$、$\sigma_y = - 20$、$\tau_{xy} = - 35\ \mathrm{MPa}$，求 $30^{\circ}$ 斜面上的应力。
::: solution
$\sigma_{\text{avg}} = 20$，$R = \sqrt{40^{2} + 35^{2}} = 53.2\ \mathrm{MPa}$，$\tan 2 \theta_p = - 70 / 80$。
$2 \theta = 60^{\circ}$ 时：
$$
\sigma_{x'} = 20 + 40 \cos 60 - 35 \sin 60 = 20 + 20.0 - 30.3 = 9.7\ \mathrm{MPa},
$$
$$
\tau_{x'y'} = - 40 \sin 60 - 35 \cos 60 = - 34.6 - 17.5 = - 52.1\ \mathrm{MPa}.
$$
**校核。** $(9.7 - 20)^{2} + 52.1^{2} = 106 + 2714 = 2820 = 53.1^{2}$。$\checkmark$
:::
:::

::: exercise 应变花 {level=2}
一 $45^{\circ}$ 应变花读数 $\varepsilon_0 = - 150$、$\varepsilon_{45} = 250$、$\varepsilon_{90} = 400$（微应变）。求 $\varepsilon_x$、$\varepsilon_y$、$\gamma_{xy}$ 和主应变。
::: solution
$\varepsilon_x = - 150$，$\varepsilon_y = 400$，
$$
\gamma_{xy} = 2 \times 250 - ( - 150 ) - 400 = 500 + 150 - 400 = 250 \ \mu .
$$
$$
\varepsilon_{\text{avg}} = 125, \qquad
R_\varepsilon = \sqrt{275^{2} + 125^{2}} = 302 \ \mu,
$$
$$
\varepsilon_1 = 427 \ \mu, \qquad \varepsilon_2 = - 177 \ \mu .
$$
**合理性。** 主应变异号，所以该点处于近似纯剪切状态，主方向离 1 号片接近 $45^{\circ}$——$\varepsilon_{45}$ 的大读数早已暗示了这一点。$45^{\circ}$ 片读数最大的应变花，在你做任何代数之前就在告诉你主轴接近 $45^{\circ}$。
:::
:::

::: exercise 压力容器 {level=2}
一直径 $8\ \mathrm{m}$ 的球形气柜用 $10\ \mathrm{mm}$ 钢板制成，许用应力 $140\ \mathrm{MPa}$。求最大压力，以及该压力下壁内的最大切应力。
::: solution
$$
p = \frac{2 \sigma t}{r} = \frac{2 \times 140 \times 10}{4000} = 0.70\ \mathrm{MPa}.
$$
主应力为 $140$、$140$ 和 $0$，所以面内莫尔圆是一个**点**——面内根本没有切应力——而
$$
\tau_{\text{abs}} = \frac{140}{2} = 70\ \mathrm{MPa},
$$
作用在与厚度方向成 $45^{\circ}$ 的平面上。
**合理性。** 球是理想压力容器，因为其薄膜应力状态是等双轴的、壁厚均匀受力，这就是气柜、潜艇耐压壳和气瓶做成球形或接近球形的原因。它也是面内-绝对切应力陷阱的最坏情形：面内圆给出零，真正的最大值是 $70\ \mathrm{MPa}$——按特雷斯卡（Tresca）准则，抗拉屈服 $140$ 的钢，其剪切屈服之半。
:::
:::

::: exercise 设计 {level=3}
一厚 $20\ \mathrm{mm}$ 的焊接钢板内有一条与板纵向轴成 $55^{\circ}$ 的直角焊缝。板沿轴向承受均匀拉应力 $120\ \mathrm{MPa}$。求焊缝上的正应力和切应力，并对照许用值——正应力 $160\ \mathrm{MPa}$、切应力 $90\ \mathrm{MPa}$——校核。
::: solution
取 $x$ 沿板轴，则 $\sigma_x = 120$、$\sigma_y = 0$、$\tau_{xy} = 0$。焊缝**平面**与轴成 $55^{\circ}$，其**法线**在 $\theta = 55 + 90 = 145^{\circ}$，等价地取与横向成 $\theta = 35^{\circ}$。用法线与载荷轴成 $35^{\circ}$：
$$
\sigma_n = 120 \cos^{2} 35^{\circ} = 120 \times 0.671 = 80.5\ \mathrm{MPa},
$$
$$
\tau = 120 \sin 35^{\circ} \cos 35^{\circ} = 120 \times 0.470 = 56.4\ \mathrm{MPa}.
$$
两者都低于许用值 $160$ 和 $90$。$\checkmark$

**最不利方位。** 焊缝切应力在 $45^{\circ}$ 处最大，
$$
\tau_{\max} = 120 / 2 = 60\ \mathrm{MPa}, \qquad \sigma_n = 60\ \mathrm{MPa},
$$
而正应力在 $0^{\circ}$ 处最大。因此与轴成 $55^{\circ}$ 的焊缝用到其剪切承载力的 $81$ 个百分点、拉伸承载力的 $50$ 个百分点。

**设计点评。** 这就是吊耳板用两条约 $45^{\circ}$ 的角焊缝而不是一条横向焊缝的原因：$45^{\circ}$ 时焊缝承受相等的正应力和切应力，而角焊缝的焊喉按矢量合成应力设计。这也是为什么规范按通过焊喉的**合成**应力校核角焊缝而不分解分量，以及为什么横向受载板中的纵向焊缝是图纸上最糟糕的细节——焊缝承受垂直于其自身轴线的全额 $120\ \mathrm{MPa}$ 正应力，其中的缺陷就是板中的一条沿厚度裂纹。
:::
:::

::: exercise 推导 {level=3}
证明主应力是 $\lambda^{3} - I_1 \lambda^{2} + I_2 \lambda - I_3 = 0$ 的根，定义三个不变量，并用它们证明纯剪切的主应力为 $\pm \tau$、平均应力为零，而静水应力状态的偏应力为零。为什么球量与偏量的区分能解释延性破坏与脆性破坏的差别？
::: solution
令法线为 $\mathbf{n}$ 的平面上的面力纯属法向，$\sigma_{ij} n_j = \lambda n_i$，得一个特征值问题，其非平凡解要求
$$
\det \left| \begin{array}{ccc}
\sigma_x - \lambda & \tau_{xy} & \tau_{xz} \\
\tau_{xy} & \sigma_y - \lambda & \tau_{yz} \\
\tau_{xz} & \tau_{yz} & \sigma_z - \lambda
\end{array} \right| = 0 ,
$$
展开得**特征方程**，其不变量为
$$
I_1 = \sigma_x + \sigma_y + \sigma_z, \qquad
I_2 = \sigma_x \sigma_y + \sigma_y \sigma_z + \sigma_z \sigma_x - \tau_{xy}^{2} - \tau_{yz}^{2} - \tau_{zx}^{2}, \qquad
I_3 = \det \sigma .
$$
因为根就是主应力，$I_1 = \sigma_1 + \sigma_2 + \sigma_3$ 在任何平面上都相同，这就是本章通篇使用的不变量的三维形式。

**纯剪切。** $\sigma_x = \sigma_y = \sigma_z = 0$、$\tau_{xy} = \tau$，其余为零。则 $I_1 = 0$、$I_2 = - \tau^{2}$、$I_3 = 0$，所以
$$
\lambda \left( \lambda^{2} - \tau^{2} \right) = 0
\quad\Longrightarrow\quad
\sigma_1 = \tau, \quad \sigma_2 = 0, \quad \sigma_3 = - \tau .
$$
平均（球）应力为 $I_1 / 3 = 0$：纯剪切只改变形状不改变体积。

**静水压力。** $\sigma_{ij} = - p \delta_{ij}$ 给出 $\sigma_1 = \sigma_2 = \sigma_3 = - p$，所以偏应力 $s_{ij} = \sigma_{ij} - \tfrac{1}{3} I_1 \delta_{ij}$ 恒为零：静水应力状态只改变体积不改变形状。

**为何重要。** 金属中的塑性流动是原子面相互滑过，这是一个由偏应力驱动的**改变形状**、保持体积的过程——这就是为什么延性屈服准则（特雷斯卡、冯·米塞斯）只依赖应力之差、对叠加的静水压力完全不敏感。脆性断裂是裂纹在**拉**正应力下张开，这是一个由球量驱动的体积改变过程——这就是为什么脆性准则（最大正应力、莫尔）依赖最大的主拉应力、且受静水压力强烈影响。实际后果是巨大的：硬质合金刀具、受围压的混凝土芯、深处的岩石，都会在足以在地面把它们击碎的静水压缩下表现出塑性；而名义上延性的钢制压力容器，可能在裂纹尖端三向拉伸、局部应力状态近乎静水的地方断裂。
:::
:::
