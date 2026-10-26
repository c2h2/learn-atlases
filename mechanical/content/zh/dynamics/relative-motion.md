对运动的几乎每一次真实测量，都是从一个本身在运动的物体上做出的。飞行员测量的空速是相对于空气的，司机测量的车速是相对于路面的，机器人的刀具速度是相对于其腕部的，输送带上产品的速度是相对于皮带的，而你在汽车里感觉到的加速度是汽车相对于地面的加速度。然而牛顿（Newton）第二定律只在非加速参考系中成立——所以动力学的实际问题，通常就是把在一个参考系中做出的测量与写在另一个参考系中的方程联系起来。

对**平移**参考系，这个关系就是简单的相加；本讲讲的是如何仔细地完成这个相加，以及与之紧密相关的**约束**运动或关联运动问题——几个物体由不可伸长的缆索连在一起，一个已知的速度决定其余所有速度。两者都是记账而不是物理，也都是自信而又不写下来的推理产生错误答案的地方。

::: warning 相对速度是矢量差，不是大小相减
若$\mathbf{v}_{A/C}$和$\mathbf{v}_{B/C}$是在同一参考系中测得的两个速度，则$A$相对于$B$的速度为
$$
\mathbf{v}_{A / B} = \mathbf{v}_{A / C} - \mathbf{v}_{B / C} .
$$
两辆速率都是$60\ \mathrm{km / h}$的汽车，迎面时相对速率为$120\ \mathrm{km / h}$，平行同向时为$0$，在$60^{\circ}$交叉路口处为$85\ \mathrm{km / h}$。相减必须逐分量进行，而且答案必须用一个极限情形校核——通常是“若两个速度相等会怎样”，它必须给出零。
:::

## 平移参考系

::: definition 平移坐标轴下的相对运动 {#def-relative}
设$x y$为固定参考系，$x^{\prime} y^{\prime}$为原点位于$B$、作**纯平移**的参考系。则
$$
\mathbf{r}_{A / B} = \mathbf{r}_A - \mathbf{r}_B, \qquad
\mathbf{v}_{A / B} = \mathbf{v}_A - \mathbf{v}_B, \qquad
\mathbf{a}_{A / B} = \mathbf{a}_A - \mathbf{a}_B .
$$
相对加速度进入牛顿定律的形式是$\sum \mathbf{F} = m \left( \mathbf{a}_B + \mathbf{a}_{A / B} \right)$，所以一个随$B$一起运动的观察者必须引入虚拟力$- m \mathbf{a}_B$才能使$F = ma$成立。因为参考系只平移，坐标轴从不转动，不出现科里奥利项或向心项；这一简化既使这一情形可以处理，也正是使它不适用于转动参考系的原因——转动参考系在[[dynamics/three-dimensional-dynamics]]中讨论。
:::

::: example 最近距离 {#ex-closest-approach}
汽车$A$以$60\ \mathrm{km / h}$向东行驶，位于交叉路口以西$500\ \mathrm{m}$；汽车$B$以$80\ \mathrm{km / h}$向北行驶，位于交叉路口以南$400\ \mathrm{m}$。求$A$相对于$B$的速度、到达最近点的时刻和最近距离。
::: solution
取东为$x$、北为$y$，$v_A = 16.67\ \mathrm{m / s}$，$v_B = 22.22\ \mathrm{m / s}$。
$$
\mathbf{r}_{A / B} = \left( - 500 \mathbf{i} + 0 \right) - \left( 0 - 400 \mathbf{j} \right)
= - 500 \mathbf{i} + 400 \mathbf{j}\ \mathrm{m},
$$
$$
\mathbf{v}_{A / B} = 16.67 \mathbf{i} - 22.22 \mathbf{j}\ \mathrm{m / s}, \qquad
\left| \mathbf{v}_{A / B} \right| = 27.8\ \mathrm{m / s}.
$$
**到达最近点的时刻。**最近距离发生在$\mathbf{r} \cdot \mathbf{v} = 0$时：
$$
t = - \frac{\mathbf{r} \cdot \mathbf{v}}{v^{2}}
= - \frac{\left( - 500 \right) \left( 16.67 \right) + 400 \left( - 22.22 \right)}{27.78^{2}}
= \frac{8335 + 8888}{771.6} = 22.3\ \mathrm{s}.
$$
**最近距离。**
$$
d = \frac{\left| r_x v_y - r_y v_x \right|}{\left| \mathbf{v} \right|}
= \frac{\left| \left( - 500 \right) \left( - 22.22 \right) - 400 \times 16.67 \right|}{27.78}
= \frac{11\,110 - 6668}{27.78} = 160\ \mathrm{m}.
$$
**校核。**$t = 22.3\ \mathrm{s}$时，$\mathbf{r}_{A / B} = \left( - 500 + 16.67 \times 22.3, \; 400 - 22.22 \times 22.3 \right) = \left( - 128, \; - 96.5 \right)$，大小为$160\ \mathrm{m}$，且$\mathbf{r} \cdot \mathbf{v} = - 128 \times 16.67 + \left( - 96.5 \right) \times \left( - 22.22 \right) = - 2134 + 2144 \approx 0$。$\checkmark$

**合理性检验。**相对运动方法把一个两体问题变成一个一体问题：把$B$当作静止，$A$以$27.8\ \mathrm{m / s}$沿直线运动，最近距离就是$B$到这条直线的垂直距离。这正是防撞警报、船舶标绘雷达和两个航天器“最近通过距离”背后的计算，而在相对参考系中做这件事的原因是：答案——一个单独的数，最近通过距离——来自一个叉积，而不是来自两个二次方程。
:::
:::

::: example 行驶车辆中的雨 {#ex-rain}
雨在静空气中以$10\ \mathrm{m / s}$竖直下落。一辆汽车以$60\ \mathrm{km / h}$行驶。雨看起来沿什么角度落下？挡风玻璃应与水平面成多大倾角，才能使雨滴沿它流走而不撞击它？
::: solution
$$
\mathbf{v}_{\text{rain} / \text{car}} = \mathbf{v}_{\text{rain}} - \mathbf{v}_{\text{car}}
= - 10 \mathbf{j} - 16.67 \mathbf{i}\ \mathrm{m / s},
$$
$$
\left| \mathbf{v} \right| = \sqrt{10^{2} + 16.67^{2}} = 19.4\ \mathrm{m / s}, \qquad
\alpha = \tan^{-1} \frac{10}{16.67} = 31.0^{\circ} .
$$
雨看起来以与水平面成$31.0^{\circ}$的角度向前扫落。一个与该方向**平行**的表面能让雨滴沿它流走，所以挡风玻璃应与水平面成$31^{\circ}$，即与竖直面成$59^{\circ}$。

**合理性检验。**真实挡风玻璃与**竖直**方向成$30$到$35^{\circ}$，比雨滴论证要求的$59^{\circ}$陡得多，这就是为什么任何车速下光靠挡风玻璃的坡度都排不掉雨水，也是为什么要有雨刷。同样的相对速度论证解释了三个常见的现象：为什么高速行驶的汽车侧窗把雨向后上方甩而不是向下；为什么卡车的洒水会被吸进跟随汽车的前挡风玻璃（卡车后面的低压尾流把它拉过去）；以及为什么火车头的前端形状是把雨和虫侧向排开而不是让它们滑落。
:::
:::

::: widget plot
f: sqrt(100+(x/3.6)^2)
x: 0, 120
y: 0, 40
labels: \text{雨的视速率 (m/s)}
caption: 竖直下落的$10\ \mathrm{m / s}$的雨，从以$x\ \mathrm{km / h}$行驶的车辆看来，其视速率的曲线。曲线为$\sqrt{100 + v^{2}}$，所以在$60\ \mathrm{km / h}$时雨滴以$19.4\ \mathrm{m / s}$——几乎是其真实速率的两倍——袭来，在$120\ \mathrm{km / h}$时为$36.5\ \mathrm{m / s}$。单位质量的动能——雨刷片必须吸收的、虫撞击车漆时传递的正是它——按$100 + v^{2}$增长，在车速超过约$60\ \mathrm{km / h}$后完全由车辆自身速度主导。
:::

## 约束运动与关联运动

::: theorem 速度比与机械效益 {#thm-velocity-ratio}
对一台理想机器——无质量不可伸长的缆索、无质量无摩擦的滑轮、刚性连杆——施力点的速度与载荷速度之比等于载荷力与施力之比：
$$
\frac{v_{\text{effort}}}{v_{\text{load}}} = \frac{F_{\text{load}}}{F_{\text{effort}}} = n .
$$
数$n$，即**速度比**，只由滑轮组的几何决定，不受摩擦、载荷质量或系统加速度的影响。**机械效益**$F_{\text{load}} / F_{\text{effort}}$只在理想情形等于$n$；有摩擦时为$n \eta$，其中$\eta$为效率。
:::

::: proof
给系统一个虚位移$\delta s_{\text{load}}$。由于每根缆索长度不变，运动学约束求导后得到速度之间的线性关系，从而也得到虚位移之间的关系：
$$
\delta s_{\text{effort}} = n \, \delta s_{\text{load}} .
$$
对于处于平衡的理想机器，总虚功对每个许可位移都为零，
$$
F_{\text{effort}} \, \delta s_{\text{effort}} - F_{\text{load}} \, \delta s_{\text{load}} = 0 ,
$$
因为没有能量被储存或耗散。代入约束关系，
$$
F_{\text{effort}} \, n \, \delta s_{\text{load}} = F_{\text{load}} \, \delta s_{\text{load}}
\quad\Longrightarrow\quad
\frac{F_{\text{load}}}{F_{\text{effort}}} = n .
$$
有摩擦时同样的论证给出$F_{\text{effort}} \, n \, \delta s_{\text{load}} = F_{\text{load}} \, \delta s_{\text{load}} + \delta W_{\text{friction}}$，所以施力增大，机械效益降为$n \eta$。
:::

::: proof 最近距离 {#proof-closest-approach}
在相对参考系中质点沿直线$\mathbf{r} (t) = \mathbf{r}_0 + \mathbf{v} t$运动，与原点距离的平方为
$$
D^{2} (t) = r_0^{2} + 2 \left( \mathbf{r}_0 \cdot \mathbf{v} \right) t + v^{2} t^{2} .
$$
这是$t$的抛物线，其极小值在导数为零处，
$$
t^{*} = - \frac{\mathbf{r}_0 \cdot \mathbf{v}}{v^{2}} ,
$$
而在该瞬时
$$
d^{2} = D^{2} \left( t^{*} \right)
= r_0^{2} - \frac{\left( \mathbf{r}_0 \cdot \mathbf{v} \right)^{2}}{v^{2}}
= \frac{r_0^{2} v^{2} - \left( \mathbf{r}_0 \cdot \mathbf{v} \right)^{2}}{v^{2}}
= \frac{\left| \mathbf{r}_0 \times \mathbf{v} \right|^{2}}{v^{2}} ,
$$
最后一步用了拉格朗日（Lagrange）恒等式。故$d = \left| \mathbf{r}_0 \times \mathbf{v} \right| / \left| \mathbf{v} \right|$，即原点到相对视线的垂直距离。注意$t^{*} < 0$意味着两物体已经相互通过，距离正在增大。
:::


::: algorithm 相连质点的关联运动 {#alg-dependent}
当若干质点由总长不变的不可伸长缆索相连时：

1. 对每根缆索固定一个基准，量出到每个连接点的坐标$s_i$，并让所有坐标都沿各质点**假设**的运动方向取正。
2. 每根缆索写一个**长度方程**：各段之和等于缆索的常数长度。
3. 求导一次得速度，求导两次得加速度。每一项的符号就是它在长度方程中的符号。
4. 一根缆索绕过、但**不系扎**其上的滑轮，两侧张力之比恒定；一根缆索**一端锚固**在其上、且同一缆索绕过它两次的滑轮，在长度方程中贡献$2 s$，因而在速度关系中贡献因子$2$。

机械效益与速度比是同一个数，因为缆索不可伸长：省一半力的系统，你要拉两倍长度的绳。
:::

::: example 滑轮组 {#ex-pulley-dependent}
在一个滑轮组中，载荷$B$挂在一个动滑轮上，缆索绕过动滑轮两次，缆索一端锚固在头顶，另一端引到卷扬机$A$。若卷扬机以$0.6\ \mathrm{m / s}$收绳，求载荷的速度。再求把载荷提升$3\ \mathrm{m}$的情形。
::: solution
从固定锚点向下量$s_A$到卷扬机端，从同一基准向下量$s_B$到载荷。缆索长度为
$$
s_A + 2 s_B = l ,
$$
因为动滑轮由两根缆索支吊。求导，
$$
v_A + 2 v_B = 0 \quad\Longrightarrow\quad v_B = - \frac{v_A}{2} = - 0.3\ \mathrm{m / s},
$$
所以载荷以$0.3\ \mathrm{m / s}$上升，为卷扬机速度的一半。提升$3\ \mathrm{m}$需要$6\ \mathrm{m}$缆索，耗时$6 / 0.6 = 10\ \mathrm{s}$。

**校核。**再求导一次得$a_A + 2 a_B = 0$，所以载荷的加速度也是缆索加速度的一半——而单根缆索中的张力是载荷重量的一半（不计摩擦），证实速度比与机械效益同为$2$。$\checkmark$

**合理性检验。**可以推广的规则是：**数一数支吊动滑轮的缆索根数**。单联滑车组为$2$，三轮滑车组为$3$，双联双抽滑车组为$4$，三联为$6$。力除以这个数，绳速乘以这个数，所以用三联滑车组提升$10\ \mathrm{t}$只需$1.7\ \mathrm{t}$的拉力，但要拉四倍的绳长——而效率随每一个额外的滑轮下降，每个通常下降$5$到$8$个百分点，所以效率$70$%的六轮滑车组还不如效率$95$%的双轮滑车组。这个权衡而不是机械效益，才是真实的手拉葫芦用三个滑轮而不用八个的原因。
:::
:::

::: example 两个小球，一个延迟 {#ex-two-balls}
一个小球从地面以$30\ \mathrm{m / s}$竖直上抛。两秒后第二个小球从同一点以$30\ \mathrm{m / s}$上抛。它们何时何地相遇？答案依赖$g$吗？
::: solution
取$t$从第一次抛射起计时。对$t > 2$，
$$
s_1 = 30 t - \tfrac{1}{2} g t^{2}, \qquad
s_2 = 30 \left( t - 2 \right) - \tfrac{1}{2} g \left( t - 2 \right)^{2} .
$$
令$s_1 = s_2$并消去$t^{2}$项，
$$
0 = - 60 + \tfrac{1}{2} g \left[ t^{2} - \left( t - 2 \right)^{2} \right]
= - 60 + \tfrac{1}{2} g \left( 4 t - 4 \right),
$$
$$
t = \frac{60}{2 g} + 1 = \frac{30}{g} + 1 = 4.06\ \mathrm{s},
$$
$$
s = 30 \times 4.058 - 4.905 \times 4.058^{2} = 121.7 - 80.8 = 40.9\ \mathrm{m}.
$$
**依赖$g$吗？**相遇**时刻**依赖——它是$30 / g + 1$——但两种情形下相遇都发生在相同的高度比例上；而在月球上，$g = 1.62$，两球在$t = 19.5\ \mathrm{s}$、$s = 294\ \mathrm{m}$处相遇。

**校核。**两球的相对加速度为零，因为二者都是$- g$。所以在第一个小球的参考系中，第二个小球以$30\ \mathrm{m / s}$的恒定相对速率、从初始间距$s_1 (2) = 60 - 19.6 = 40.4\ \mathrm{m}$处接近，耗时$40.4 / 30 = 1.35\ \mathrm{s}$——得$t = 2 + 1.35 = 3.35\ \mathrm{s}$。

**等等——两种方法不一致。**它们并非不一致，而这个矛盾正是本例的要害。相对速度方法必须用**$t = 2$时的相对位置**，即$s_1 (2) - s_2 (2) = 40.4 - 0 = 40.4\ \mathrm{m}$，以及相对**速度**，即$v_1 (2) - v_2 (2) = \left( 30 - 19.6 \right) - 30 = - 19.6\ \mathrm{m / s}$，而不是$- 30$。接近时间为$40.4 / 19.6 = 2.06\ \mathrm{s}$，得$t = 2 + 2.06 = 4.06\ \mathrm{s}$。$\checkmark$代数方法与相对方法完全一致；错误在于假设第二个小球相对于第一个小球的速率是$30\ \mathrm{m / s}$，而此时第一个小球已经减速到$10.4\ \mathrm{m / s}$。
:::
:::

## 应用

::: example 渡河 {#ex-river}
一条$100\ \mathrm{m}$宽的河流以$1.5\ \mathrm{m / s}$流动。一艘在静水中能行$4\ \mathrm{m / s}$的船要渡河。求（a）使船垂直驶向对岸的航向及渡河时间；（b）使时间最短的航向及相应的漂移。
::: solution
**（a）垂直驶向对岸。**船必须向上游偏$\alpha$角，其中
$$
\sin \alpha = \frac{1.5}{4} \quad\Longrightarrow\quad \alpha = 22.0^{\circ},
$$
对地速度为
$$
v = \sqrt{4^{2} - 1.5^{2}} = 3.708\ \mathrm{m / s}, \qquad
t = \frac{100}{3.708} = 27.0\ \mathrm{s}.
$$
**（b）时间最短。**船头直指对岸，与河岸垂直：
$$
t = \frac{100}{4} = 25.0\ \mathrm{s}, \qquad
\text{漂移} = 1.5 \times 25.0 = 37.5\ \mathrm{m}.
$$
**合理性检验。**两个航向相差$22^{\circ}$，两个时间却只差$8$个百分点，所以漂移使落点偏移$37.5\ \mathrm{m}$，却省下$2\ \mathrm{s}$。一般结论是：当船头正对对岸时，水流完全不影响渡河**时间**，因为水流垂直于划行方向，两个速度分量互不相干。这种垂直运动的独立性是伽利略（Galileo）原理，也是为什么落入急流的游泳者应当直游向近岸而不要向上游挣扎：向下游的漂移两种走法都一样，而直指岸边游才能使渡河时间最短。
:::
:::

::: example 飞机的风三角 {#ex-wind-triangle}
飞行员必须沿$040^{\circ}$航迹飞行$300\ \mathrm{km}$，空速$320\ \mathrm{km / h}$，风**自**$090^{\circ}$吹来、风速$80\ \mathrm{km / h}$。求应取的航向、对地速度和飞行时间。
::: solution
取$x$向东、$y$向北。风**吹向**$270^{\circ}$，故$\mathbf{w} = \left( - 80, 0 \right)$。所需航迹方向为$\left( \sin 40, \cos 40 \right) = \left( 0.643, 0.766 \right)$，与其垂直、指向右侧的单位向量为$\left( 0.766, - 0.643 \right)$。

**横向条件。**对地速度沿航迹横向的分量必须为零：
$$
320 \sin \left( H - 40^{\circ} \right) + \mathbf{w} \cdot \left( 0.766, - 0.643 \right) = 0 ,
$$
$$
320 \sin \left( H - 40^{\circ} \right) - 61.3 = 0
\quad\Longrightarrow\quad
H = 40 + 11.0 = 051^{\circ} .
$$
**对地速度。**
$$
V = 320 \cos 11.0^{\circ} + \mathbf{w} \cdot \left( 0.643, 0.766 \right)
= 314.1 - 51.4 = 262.7\ \mathrm{km / h},
$$
$$
t = \frac{300}{262.7} = 1.142\ \mathrm{h} = 1\ \mathrm{h}\ 9\ \mathrm{min}.
$$
**校核。**风速为$80\ \mathrm{km / h}$，抵消它所需的横向分量为$61.3\ \mathrm{km / h}$，占空速的$19$个百分点——$11^{\circ}$的小角度修正，一致。若风是纯粹的逆风，对地速度将为$240\ \mathrm{km / h}$，时间$1.25\ \mathrm{h}$；侧风分量仅通过$\cos$项就使对地速度损失$11.5$个百分点。$\checkmark$

**合理性检验。**这就是风三角，飞行员用标绘三角板图解求解，每一台飞行管理计算机则数值求解。重要的定性结论是：**侧风**即使既不顺风也不逆风，也会让你损失时间，因为侧偏角直接浪费掉空速的$1 - \cos 11^{\circ} = 1.8$个百分点，若不修正还会迫使航程变长。往返的代价更大：在同一条侧风下来回，时间为$1.142\ \mathrm{h}$和$1.318\ \mathrm{h}$，平均对地速度$247\ \mathrm{km / h}$，而无风时为$320$——这就是为什么顺风永远补偿不了归程上它变成的逆风，也是为什么航空公司去程利用急流、回程绕开急流。
:::
:::

::: warning 关联运动方程是有符号的，而符号并不显然
先写长度方程，再写别的东西，永远不要在脑子里推断“$A$下去则$B$上来”。经典的失误是一根缆索从动滑轮下绕过、又从定滑轮上绕过：动滑轮对长度贡献$2 s$，定滑轮什么都不贡献，把这两者弄反就会颠倒速度比。一个可靠的校核是能量：单根无质量缆索的张力在一端做功$T v_{\text{cable}}$，在另一端做$- T v_{\text{load}}$；若速度比是$n$，力比也必须是$n$。如果你的运动学给出的速度比与你在滑轮组上看得见的机械效益对不上，那么两者之中必有一错。
:::

::: history
垂直方向的运动互不相干——从行驶船只桅杆上落下的球落在桅脚——这一原理是伽利略（Galileo）的，他在1632年的《关于托勒密和哥白尼两大世界体系的对话》（*Dialogo*）中以船舱甲板下的船舱作为思想实验加以论证，这就是如今所谓伽利略变换的最早表述。牛顿（Newton）在《原理》（*Principia*）的推论中把它明确化，证明了“一个物体被任何力沿任何方向推动后，此后将沿其单独运动合成所得的方向作匀速直线运动”。相对速度在机器图解分析中的系统运用是十九世纪的工程实践，由肯尼迪（Kennedy）1886年的**三心定理**建立形式：三个相互作相对运动的物体，其三个速度瞬心共线；这条定理使连杆机构的速度图成为圆规直尺作图。**风三角**始于最早的有动力飞行，其仪表偏流计是最早的航空导航设备之一；海上等价的问题是1900年代的流三角，在海图上用平行尺求解。滑轮组的关联运动方程从1790年代起出现在每一本力学教科书中，是工程教育中历史最悠久的应用运动学内容，比这门学科自己的动力学还要古老。
:::

## 后续内容

**转动**参考系中的相对加速度——科里奥利项出现之处——在[[dynamics/three-dimensional-dynamics]]中展开，同一思想的瞬心版本在[[dynamics/rigid-body-kinematics]]中。关联运动方程成为[[dynamics/rigid-body-kinetics]]和[[mechanisms/velocity-analysis]]的约束方程，风三角则在[[flight-mechanics/steady-flight-performance]]中重新出现。

::: summary
- 相对速度和相对加速度是在**同一**参考系中测得的量之间的矢量差；永远不要只减大小。
- 平移参考系不引入任何附加项；转动参考系引入向心项和科里奥利项，两者不可混淆。
- 对相连质点，每根缆索写一个长度方程，求导，让符号自己得出。
- 动滑轮对长度方程贡献$2 s$；定滑轮什么都不贡献。对不可伸长的缆索，速度比等于机械效益。
- 垂直运动互不相干：船头直指对岸时，河流的水流不改变渡河时间。
- 最近距离在相对参考系中是一行计算：$d = \left| \mathbf{r} \times \mathbf{v} \right| / \left| \mathbf{v} \right|$。
:::

::: quiz
一台缆索滑轮组的机械效益为$4$。若滑轮组的效率为$80$个百分点，提升$400\ \mathrm{N}$需要多大的力？把载荷提升$1\ \mathrm{m}$必须拉出多少缆索？
- [ ] $100\ \mathrm{N}$， $1\ \mathrm{m}$
- [x] $125\ \mathrm{N}$， $4\ \mathrm{m}$
- [ ] $125\ \mathrm{N}$， $1\ \mathrm{m}$
- [ ] $500\ \mathrm{N}$， $4\ \mathrm{m}$
::: solution
$125\ \mathrm{N}$，$4\ \mathrm{m}$。**距离**由运动学决定，与摩擦毫无关系：长度不变的不可伸长缆索，无论滑轮是黄铜的还是锈死的，提升$1\ \mathrm{m}$都需要放出$4\ \mathrm{m}$绳。**力**由能量决定：理想的$100\ \mathrm{N}$变成$100 / 0.8 = 125\ \mathrm{N}$。把一台机器的运动学部分与能量部分分开，是初级机器分析中最有用的单一习惯，也是为什么机器的速度比是一个纯数、而其机械效益是一个实测值的原因。
:::
:::

## 习题

::: exercise 相对速度 {level=1 check="100"}
两列火车在平行轨道上同向行驶，速率分别为$80$和$60\ \mathrm{km / h}$。在慢车参考系中一名静止观察者被一列$200\ \mathrm{m}$长的火车超过。快车相对于慢车的相对速率是多少？慢车中一扇车窗看到一节$200\ \mathrm{m}$长的车厢通过要多久？
::: solution
相对速率为$20\ \mathrm{km / h} = 5.56\ \mathrm{m / s}$，时间为$200 / 5.56 = 36\ \mathrm{s}$。
:::
:::

::: exercise 关联运动 {level=1 check="1.0"}
一个载荷由一个动滑轮支吊，单根缆索绕过该滑轮，缆索的一端固定在头顶。若自由端被上拉$2\ \mathrm{m}$，载荷上升多少？
::: solution
$s_{\text{free}} + 2 s_{\text{load}} = l$，故$\Delta s_{\text{load}} = - \Delta s_{\text{free}} / 2 = 1\ \mathrm{m}$……

**注。**基准要小心。若自由端被上拉$2\ \mathrm{m}$，滑轮上方的缆索缩短$2\ \mathrm{m}$，这$2\ \mathrm{m}$由支吊滑轮的两根绳分摊，所以载荷上升$1\ \mathrm{m}$。应输入的答案是$1.0$。
:::
:::

::: exercise 运动的独立性 {level=1 check="20"}
一名在静水中能游$2\ \mathrm{m / s}$的游泳者，直游向对岸渡过一条以$1.5\ \mathrm{m / s}$流动、宽$40\ \mathrm{m}$的河。她落在下游多远处？
::: solution
渡河时间为$40 / 2 = 20\ \mathrm{s}$，与水流无关，漂移为$1.5 \times 20 = 30\ \mathrm{m}$。
**注。**应输入的答案是**时间**，$20\ \mathrm{s}$；漂移是$30\ \mathrm{m}$。
:::
:::

::: exercise 相对加速度 {level=2}
一部电梯以$2\ \mathrm{m / s^{2}}$向上加速。在电梯内以相对于电梯$10\ \mathrm{m / s}$竖直上抛一个小球。经过多久它回到抛球者手中？相对于电梯它上升多高？
::: solution
在电梯参考系中小球的加速度为$- \left( g + a \right) = - 11.81\ \mathrm{m / s^{2}}$，所以
$$
t = \frac{2 \times 10}{11.81} = 1.69\ \mathrm{s}, \qquad
h = \frac{10^{2}}{2 \times 11.81} = 4.23\ \mathrm{m}.
$$
**合理性检验。**在惯性参考系中小球的加速度始终为$- g$，而电梯地板向上加速迎向它，这就是返回时间短于静止电梯的$2.04\ \mathrm{s}$的原因。电梯参考系中的虚拟力$m a$恰好就是这个差值，这也是为什么加速观察者必须虚构一个力——这是最简单的说明。
:::
:::

::: exercise 风三角 {level=2}
对例7中的飞行，求沿$220^{\circ}$的反向航迹从目的地返回出发地所需的时间。
::: solution
反向航迹方向为$\left( - 0.643, - 0.766 \right)$，其垂直方向为$\left( - 0.766, 0.643 \right)$。
$$
320 \sin \left( H' \right) + \mathbf{w} \cdot \left( - 0.766, 0.643 \right) = 0
\quad\Longrightarrow\quad
320 \sin \beta + 61.3 = 0 \quad\Longrightarrow\quad \beta = - 11.0^{\circ},
$$
所以航向为$220 - 11 = 209^{\circ}$，而
$$
V = 320 \cos 11.0^{\circ} - 51.4 = 262.7\ \mathrm{km / h} \times \ldots
$$
**注。**风的沿航迹分量在反向航迹上变号，从$- 51.4$变为$+ 51.4\ \mathrm{km / h}$，所以
$$
V_{\text{return}} = 314.1 + 51.4 = 365.5\ \mathrm{km / h}, \qquad
t = \frac{300}{365.5} = 0.821\ \mathrm{h} = 49.2\ \mathrm{min}.
$$
往返共$68.5 + 49.2 = 117.7\ \mathrm{min}$，而无风时单程为$56.3\ \mathrm{min}$，平均对地速度$306\ \mathrm{km / h}$，无风时为$320$。侧风即使在每一时刻都既不顺风也不逆风，也使往返时间增加$19$个百分点。
:::
:::

::: exercise 最近距离 {level=2}
船$A$以$15$节向北航行，位于船$B$以西$4\ \mathrm{nm}$，后者以$20$节向东航行。求最近距离。
::: solution
取$x$向东，$y$向北。$\mathbf{r}_{A / B} = \left( - 4, 0 \right)\ \mathrm{nm}$，$\mathbf{v}_{A / B} = \left( - 20, 15 \right)\ \mathrm{kn}$，$\left| \mathbf{v} \right| = 25\ \mathrm{kn}$。
$$
d = \frac{\left| r_x v_y - r_y v_x \right|}{\left| \mathbf{v} \right|}
= \frac{\left| \left( - 4 \right) \times 15 - 0 \times \left( - 20 \right) \right|}{25} = 2.40\ \mathrm{nm},
$$
$$
t = - \frac{\mathbf{r} \cdot \mathbf{v}}{v^{2}} = - \frac{80}{625} \times 60 = 7.7\ \mathrm{min}.
$$
**合理性检验。**答案是一个**最近通过距离**，是每一套防撞系统都在计算的数。注意$t$为正，所以最近距离在将来；若算出的符号为负，则两船已经通过，距离正在增大。
:::
:::

::: exercise 设计 {level=3}
一个包裹在输送机上沿$x$方向以$2\ \mathrm{m / s}$运动。一条以$1.5\ \mathrm{m / s}$运行的分流带要按某个方向布置，使包裹离开输送机时，在交接的瞬间以**无相对滑动**的方式被带走。求分流带所需的方向，以及接触前瞬时的相对速度。
::: solution
要在交接时无滑动，分流带的速度必须等于包裹速度的**改变量**，而包裹落到分流带上时，其相对速度必须平行于分流带表面。若分流带与$x$轴成$\theta$角运行，其速度为$1.5 \left( \cos \theta, \sin \theta \right)$，包裹相对于它的速度为
$$
\mathbf{v}_{p / d} = \left( 2 - 1.5 \cos \theta, \; - 1.5 \sin \theta \right).
$$
要使它**沿**分流带方向，其垂直于分流带的分量必须为零：
$$
\left( 2 - 1.5 \cos \theta \right) \sin \theta - \left( - 1.5 \sin \theta \right) \cos \theta \times ( - 1 ) = 0
\quad\Longrightarrow\quad
2 \sin \theta - 1.5 \cos \theta \sin \theta + 1.5 \sin \theta \cos \theta = 0 ,
$$
得$\sin \theta = 0$，即速率匹配的分流带不可能实现分流。

**注。**这段代数证明了一件真实的事：一条皮带不可能在不滑动的情况下把包裹直角分走，因为包裹沿分流带方向的速度分量必须从$2 \cos \theta$减到零，而任何速度变化都是滑动。所以设计答案是**接受**滑动并为此计算。取$\theta = 30^{\circ}$：
$$
\mathbf{v}_{p / d} = \left( 2 - 1.30, \; - 0.75 \right) = \left( 0.70, - 0.75 \right), \qquad
\left| \mathbf{v}_{p / d} \right| = 1.03\ \mathrm{m / s}.
$$
所以包裹带着$1.03\ \mathrm{m / s}$的相对运动到达，这段相对运动在$d = v_{\text{rel}}^{2} / \left( 2 \mu g \right) = 1.03^{2} / \left( 2 \times 0.3 \times 9.81 \right) = 0.18\ \mathrm{m}$的分流带长度内被耗散掉。

**设计评注。**这就是真实的交叉带分流机是一段低摩擦滑槽而不是驱动皮带的原因，是过渡段要做成$200$到$300\ \mathrm{mm}$锥度的原因，也是包裹分拣输送机上的包裹总是略有擦伤的原因。$180\ \mathrm{mm}$的滑动距离也是分流机放得离弯道太近就会甩出包裹的原因：滑动冲量必须由侧向护轨而不是由皮带承受。
:::
:::

::: exercise 推导 {level=3}
推导两个参考系之间的加速度变换，其中一个既**平移**又**转动**，并辨认每一项。然后证明：对一个绕固定轴以恒定$\omega$转动的参考系，结果化为向心项、科里奥利项和欧拉（Euler）项。
::: solution
设$S$为惯性系，$S^{\prime}$以角速度$\boldsymbol{\omega}$转动、原点$O^{\prime}$平移。对任何向量$\mathbf{A}$，
$$
\left( \dot{\mathbf{A}} \right)_S = \left( \dot{\mathbf{A}} \right)_{S^{\prime}} + \boldsymbol{\omega} \times \mathbf{A} .
$$
对$\mathbf{r} = \mathbf{r}_{O^{\prime}} + \mathbf{r}^{\prime}$应用两次，
$$
\mathbf{v} = \mathbf{v}_{O^{\prime}} + \left( \dot{\mathbf{r}}^{\prime} \right)_{S^{\prime}} + \boldsymbol{\omega} \times \mathbf{r}^{\prime} ,
$$
$$
\mathbf{a} = \mathbf{a}_{O^{\prime}} + \left( \ddot{\mathbf{r}}^{\prime} \right)_{S^{\prime}}
+ \dot{\boldsymbol{\omega}} \times \mathbf{r}^{\prime} + 2 \boldsymbol{\omega} \times \left( \dot{\mathbf{r}}^{\prime} \right)_{S^{\prime}}
+ \boldsymbol{\omega} \times \left( \boldsymbol{\omega} \times \mathbf{r}^{\prime} \right) .
$$
五项依次为：动原点的加速度；**相对**于动参考系的加速度；转动变化引起的**欧拉**项；**科里奥利**项；以及**向心**项。

**恒定转动。**当$\dot{\boldsymbol{\omega}} = 0$且$\boldsymbol{\omega}$沿固定$z$轴时，欧拉项消失，而
$$
\boldsymbol{\omega} \times \left( \boldsymbol{\omega} \times \mathbf{r}^{\prime} \right) = - \omega^{2} \rho \mathbf{e}_\rho ,
$$
其中$\rho$是到轴的垂直距离，所以向心项为$\omega^{2} \rho$，方向**向内**指向轴。科里奥利项$2 \boldsymbol{\omega} \times \mathbf{v}^{\prime}$垂直于相对速度，因此不做功：
$$
\mathbf{v}^{\prime} \cdot \left( 2 \boldsymbol{\omega} \times \mathbf{v}^{\prime} \right) \equiv 0 .
$$

**评注。**恒等式$\left( \dot{\mathbf{A}} \right)_S = \left( \dot{\mathbf{A}} \right)_{S^{\prime}} + \boldsymbol{\omega} \times \mathbf{A}$是应用动力学中最有用的单一结果，本讲及其后三门课程中每一个含有$\omega$乘以速度的公式都来自它。注意科里奥利项不做功，却可以是问题中最大的力——在涡轮叶片上，在飞行一千米的步枪子弹上，在持续一天的天气系统上——因为一个不做功的力仍然能够完全改变运动的方向。
:::
:::
