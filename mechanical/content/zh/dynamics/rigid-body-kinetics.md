把力代入上一讲的运动学，动力学就从描述变成了工具。平面内的刚体需要**三个**方程——两个力分量加一个力矩方程——而质点只需要两个，第三个方程正是使物体转动的那一个。其余都是记账：选对取矩的点，认出这个选择消掉了哪些未知量，并记住惯性项不是力，不出现在方程的力那一边。

方程的两种形式都值得掌握。第一种，$\sum \mathbf{F} = m \mathbf{a}_G$配$\sum M_G = I_G \alpha$，是安全且永远成立的。第二种，对任一点$P$取矩，除非$P$是质心或固定点，否则会多出额外的项，而“对看着方便的点取矩”的诱惑正是本学科大多数错误的来源。真正大占便宜的只有一种情形：滚动体的**速度瞬心**或**接触点**，对该点的力矩方程根本不包含摩擦力——用对了，三个方程里省掉两个。

::: warning $\sum M_P = I_P \alpha$只对固定的$P$、质心、或配对了$I$的瞬时静止点成立
对质心，方程$\sum M_G = I_G \alpha$永远成立。对另一点$P$，
$$
\sum M_P = I_G \alpha + \left[ \text{含 } \mathbf{r}_{G / P} \times m \mathbf{a}_P \text{ 的项} \right],
$$
这些项只有当$P$在惯性系中固定、或是质心、或——对在固定表面上滚动的平面运动刚体——是接触点时才消失，此时$\sum M_C = I_C \alpha$，$I_C$对接触点取。对任一点$P$用$I_P \alpha$是错的，而且错法往往使答案落在真值的$20$%以内，因而难以察觉。
:::

## 刚体的运动方程

::: definition 刚体的平面动力学 {#def-rbk-eom}
质量$m$、质心为$G$、过质心的转动惯量为$I_G$的刚体作平面运动时，
$$
\sum F_x = m \left( a_G \right)_x, \qquad
\sum F_y = m \left( a_G \right)_y, \qquad
\sum M_G = I_G \alpha .
$$
等价地说，外力系与作用于$G$的矢量$m \mathbf{a}_G$加力偶$I_G \alpha$**等效**：把受力图（分离体图）和“动力图”并排画出，令力与力矩分别相等，就是方法的全部。对固定表面纯滚动的刚体，对接触点$C$取矩得到捷径
$$
\sum M_C = I_C \alpha, \qquad I_C = I_G + m d^{2} ,
$$
一步消去摩擦力。
:::

::: proof 对质心的力矩方程 {#proof-rigid-moment}
把刚体视为质点系。对质心，把动量矩写成$\mathbf{H}_G = \sum \left( \boldsymbol{\rho}_i \times m_i \dot{\boldsymbol{\rho}}_i \right)$，其中$\boldsymbol{\rho}_i = \mathbf{r}_i - \mathbf{r}_G$。求导，
$$
\dot{\mathbf{H}}_G = \sum \boldsymbol{\rho}_i \times m_i \ddot{\boldsymbol{\rho}}_i
+ \sum \dot{\boldsymbol{\rho}}_i \times m_i \dot{\boldsymbol{\rho}}_i .
$$
第二个和式为零，因为对刚体$\dot{\boldsymbol{\rho}}_i$平行于$\mathbf{v}_i - \mathbf{v}_G$，每一项都是一个矢量与自身的数量积的叉积。第一个和式中，$\ddot{\boldsymbol{\rho}}_i = \ddot{\mathbf{r}}_i - \ddot{\mathbf{r}}_G$，而
$$
\sum \boldsymbol{\rho}_i \times m_i \ddot{\mathbf{r}}_G
= \left( \sum m_i \boldsymbol{\rho}_i \right) \times \ddot{\mathbf{r}}_G = \mathbf{0}
$$
由质心的定义。左边剩下$\sum \boldsymbol{\rho}_i \times \mathbf{F}_i = \sum M_G$，右边对平面运动的刚体是
$$
\sum \boldsymbol{\rho}_i \times m_i \ddot{\boldsymbol{\rho}}_i = I_G \alpha \, \mathbf{k} .
$$
故$\sum M_G = I_G \alpha$。

**注意两次抵消。**两者都来自$G$的定义，对任何其他点都不成立——这正是为什么质心是唯一使力矩方程永远如此简单的点。
:::

::: example 绳拉的线轴 {#ex-spool-kinetics}
质量$12\ \mathrm{kg}$、外半径$200\ \mathrm{mm}$、内半径$100\ \mathrm{mm}$、质心回转半径$150\ \mathrm{mm}$的线轴放在粗糙地面上。缠在内芯上的绳在离地$300\ \mathrm{mm}$的高度被水平以$60\ \mathrm{N}$拉动。求加速度、角加速度和摩擦力。摩擦因数至少多大？
::: solution
设中心向右的加速度为$a$，顺时针角加速度$\alpha = a / R$。水平方向投影，摩擦力$F$以向右为正，
$$
P + F = m a ,
$$
对中心取矩，$P$作用在$G$上方$r$处、$F$作用在其下方$R$处，
$$
P r - F R = I_G \alpha = I_G \frac{a}{R} .
$$
消去$F = m a - P$，
$$
P \left( R + r \right) = a \left( m R + \frac{I_G}{R} \right)
\quad\Longrightarrow\quad
a = \frac{P R \left( R + r \right)}{m \left( k^{2} + R^{2} \right)}
= \frac{60 \times 0.2 \times 0.3}{12 \left( 0.0225 + 0.04 \right)} = 4.80\ \mathrm{m / s^{2}} ,
$$
$$
\alpha = \frac{4.80}{0.2} = 24.0\ \mathrm{rad / s^{2}}, \qquad
F = 12 \times 4.80 - 60 = - 2.4\ \mathrm{N} .
$$
摩擦力是**向后的$2.4\ \mathrm{N}$**，法向力$N = m g = 117.7\ \mathrm{N}$，所以
$$
\mu_{\min} = \frac{2.4}{117.7} = 0.020 .
$$
**校核。**对接触点$C$取矩，摩擦力无力矩，
$$
P \times 0.3 = I_C \alpha, \qquad I_C = m \left( k^{2} + R^{2} \right) = 12 \times 0.0625 = 0.75\ \mathrm{kg\,m^{2}} ,
$$
$$
\alpha = \frac{18}{0.75} = 24.0\ \mathrm{rad / s^{2}} \quad \checkmark
$$
**合理性检验。**摩擦力极小而且**向后**，与拉力相反——这一点已经够让人意外，方向更让人意外。它的方向由绳离开线轴的高度决定：在**临界高度**$h = R \left( 1 + k^{2} / R^{2} \right) = 0.2 \times 1.5625 = 312.5\ \mathrm{mm}$以上拉，线轴朝**你**滚来且摩擦力向前；在其以下拉，摩擦力反向。恰在$312.5\ \mathrm{mm}$处摩擦力为零，线轴滚动却毫无滑动趋势。这个高度正是绳的作用线通过接触点的高度，也是为什么桌上的悠悠球在你提起绳子时会改变方向。
:::
:::

::: widget plot
f: 60*0.2*(0.2+x)/(12*(0.0225+0.04))
x: 0, 0.3
y: 0, 5.5
labels: \text{轮心加速度 } \left( \mathrm{m/s^2} \right)
caption: 例1线轴的轮心加速度随缠绳内芯半径$x$的变化，$60\ \mathrm{N}$的绳在高度$R + x$处水平拉动。关系对$x$是线性的，因为拉力对接触点的力臂恰为$R + x$，而转动惯量$I_C$不变。把绳改缠在内芯**下缘**而不是上缘，$r$变号，得$a = 1.60\ \mathrm{m / s^{2}}$，方向不变——线轴仍朝拉力方向滚，但慢得多，而且摩擦力反向。
:::

::: definition 动力图与达朗贝尔原理 {#def-dalembert}
平面运动的三个标量方程可以通过把惯性项移到力的一边写成一个**平衡**：
$$
\sum F_x - m \left( a_G \right)_x = 0, \qquad
\sum F_y - m \left( a_G \right)_y = 0, \qquad
\sum M_G - I_G \alpha = 0 .
$$
量$- m \mathbf{a}_G$和$- I_G \alpha$称为**惯性力**和**惯性力偶**；它们不是力，只是记账手段，必须作用在质心并取正确的符号。这个方法叫**达朗贝尔原理**，它使动力学问题可以用[[statics/rigid-body-equilibrium]]的静力学来解——包括静力学的各种技巧，如对某点取矩消去未知量、或三力构件的几何。

用得不慎，这个把戏会误导人，因为惯性力不是真实的力，没有反作用对；用得谨慎，它是多个运动构件的连杆机构中通往答案的最快路径，也是往复机械**配平**的基础——那里的全部设计问题，就是让运动件各$m \mathbf{a}$矢量之和为零。
:::

::: theorem 撞击中心 {#thm-percussion}
可绕固定点$O$转动的刚体，质量$m$，质心$G$满足$\bar{r} = O G$，质心回转半径$k$，在距$O$为$q$处受到垂直于$O G$的冲量$J$。$O$处冲量为零的条件是
$$
q = \frac{I_O}{m \bar{r}} = \bar{r} + \frac{k^{2}}{\bar{r}} .
$$
这一点称为**撞击中心**；它也是**振动中心**，即单摆长度等于刚体等价长度$I_O / m \bar{r}$的那一点。
:::

::: proof 被击物体的冲量与动量 {#proof-percussion}
设刚体被击后获得绕$O$的角速度$\omega$。质心获得速度$\bar{v} = \omega \bar{r}$，以$J_O$记铰链处的冲量，线冲量-动量方程给出
$$
J + J_O = m \bar{v} = m \omega \bar{r} .
$$
对$O$的角冲量给出
$$
J q = I_O \omega \quad\Longrightarrow\quad \omega = \frac{J q}{I_O} .
$$
代入，
$$
J_O = \frac{J m \bar{r} q}{I_O} - J
= J \left( \frac{m \bar{r} q}{I_O} - 1 \right) ,
$$
当$q = I_O / m \bar{r}$时它为零。写$I_O = m \left( k^{2} + \bar{r}^{2} \right)$即得所给形式。$\checkmark$

**注意这个互易性。**由于$q = \bar{r} + k^{2} / \bar{r}$，若把刚体改在撞击中心处悬挂，其新的撞击中心在另一侧的$\bar{r}' = k^{2} / q$处，恰好回到原来的铰链点。两点可以互换，凯特（Kater）正是利用这一性质在不知道质心位置的情况下测量$g$的。
:::

::: example 复摆 {#ex-compound-pendulum}
质量$4\ \mathrm{kg}$的连杆挂在距其质心$300\ \mathrm{mm}$的刀口上摆动，周期为$1.50\ \mathrm{s}$。求其质心回转半径。
::: solution
物理摆小摆动的周期
$$
T = 2 \pi \sqrt{\frac{I_O}{m g \bar{r}}}
\quad\Longrightarrow\quad
I_O = \frac{T^{2} m g \bar{r}}{4 \pi^{2}}
= \frac{1.5^{2} \times 4 \times 9.81 \times 0.3}{39.48} = 0.671\ \mathrm{kg\,m^{2}} ,
$$
$$
k_G^{2} = \frac{I_O}{m} - \bar{r}^{2} = 0.1677 - 0.09 = 0.0777
\quad\Longrightarrow\quad
k_G = 0.279\ \mathrm{m} .
$$
**校核。**等价单摆长度$I_O / m \bar{r} = 0.671 / 1.2 = 0.559\ \mathrm{m}$，$T = 2 \pi \sqrt{0.559 / 9.81} = 1.50\ \mathrm{s}$ $\checkmark$

**合理性检验。**这是一项**测量**，不是玩具：把零件在两个刀口上分别摆动，由两个周期解出$k_G$和质心位置，是测定连杆、曲轴或卫星模型转动惯量的标准工业方法，一只秒表加一副好刀口就能达到百分之一以内的精度。可逆的形式——凯特复摆——更进一步，把$g$本身测到$10^{5}$分之几，重力标准值靠它定义了一个世纪。
:::
:::

## 滚动与滑动

::: example 圆柱沿斜面滚下 {#ex-cylinder-incline}
实心圆柱沿$30^{\circ}$斜面纯滚而下。求其加速度和最小摩擦因数。换成同半径的薄壁管，结果有何变化？
::: solution
取$I_G = m R^{2} / 2$及$a = \alpha R$，对接触点$C$取矩：
$$
m g \sin \theta \times R = I_C \alpha, \qquad I_C = \tfrac{1}{2} m R^{2} + m R^{2} = \tfrac{3}{2} m R^{2} ,
$$
$$
\alpha = \frac{g \sin \theta}{1.5 R}, \qquad
a = \alpha R = \frac{g \sin \theta}{1.5} = \frac{9.81 \times 0.5}{1.5} = 3.27\ \mathrm{m / s^{2}} .
$$
**摩擦力。**由$m g \sin \theta - F = m a$，
$$
F = m \left( g \sin \theta - a \right) = m \times 6.54, \qquad
N = m g \cos \theta = m \times 8.50 ,
$$
$$
\mu_{\min} = \frac{6.54}{8.50} = 0.192 = \frac{\tan \theta}{3} .
$$
**薄壁管。**取$I_G = m R^{2}$，得$a = g \sin \theta / 2 = 2.45\ \mathrm{m / s^{2}}$，$\mu_{\min} = \tan \theta / 2 = 0.289$。

**合理性检验。**加速度与质量和半径都无关，所以线轴和铁路车轮并排滚下同一段斜坡——但实心圆柱快过空心的，而薄圆环、实心球、实心圆柱、薄壁管对应的$1 > \tfrac{5}{7} > \tfrac{2}{3} > \tfrac{1}{2}$的排序，恰好就是$k^{2} / R^{2}$从$0$到$1$的排序。这就是**灌了东西的**管子比空管滚得快、灌了水的竹竿在湿岸上比干竹竿滚得快、以及决定车辆加速的是绕滚动轴的转动惯量——而不是质量——的全部解释。这也是为什么竞赛自行车手对轮圈上的**转动**质量的在意远超过车架上同样的质量：在$k = R$处，每千克轮胎和轮圈要付出车架上一千克两倍的加速代价。
:::
:::

::: example 带质量滑轮的阿特伍德机 {#ex-atwood-pulley}
阿特伍德机两侧质量$12\ \mathrm{kg}$和$8\ \mathrm{kg}$，绳跨过半径$150\ \mathrm{mm}$、转动惯量$0.06\ \mathrm{kg\,m^{2}}$的滑轮。求加速度和绳的两侧张力。
::: solution
滑轮的惯量使两侧张力**不相等**，这正是问题的要点：
$$
m_1 g - T_1 = m_1 a, \qquad T_2 - m_2 g = m_2 a, \qquad
\left( T_1 - T_2 \right) R = I \frac{a}{R} .
$$
前两式相加并用$T_1 - T_2 = I a / R^{2}$，
$$
\left( m_1 - m_2 \right) g = a \left( m_1 + m_2 + \frac{I}{R^{2}} \right)
\quad\Longrightarrow\quad
a = \frac{4 \times 9.81}{20 + 0.06 / 0.0225} = \frac{39.24}{22.67} = 1.73\ \mathrm{m / s^{2}} ,
$$
$$
T_1 = 12 \left( 9.81 - 1.73 \right) = 97.0\ \mathrm{N}, \qquad
T_2 = 8 \left( 9.81 + 1.73 \right) = 92.3\ \mathrm{N}.
$$
**校核。**$\left( T_1 - T_2 \right) R = 4.7 \times 0.15 = 0.705\ \mathrm{N\,m}$，$I a / R = 0.06 \times 1.73 / 0.15 = 0.693\ \mathrm{N\,m}$——舍入误差内相等。$\checkmark$

**合理性检验。**滑轮的惯量进入加速度的方式，恰好等同于给系统加上$I / R^{2} = 2.67\ \mathrm{kg}$的额外质量；两侧张力之差不是佯谬，而是把滑轮带动起来的力矩。这个$I / R^{2}$就是转动元件向直线运动的**等效质量**，也是为什么自行车的轮子比车架重要得多：半径$R$、质量$m$的轮圈有$I = m R^{2}$，所以它对加速质量的贡献是$2 m$，平动一份，转动一份。两千克的车轮与四千克的车架费同样的劲——这是自行车和汽车车轮设计中最有用的一条事实，也是为什么非簧载质量要单独于簧载质量计算。
:::
:::

## 转矩、惯量与反射质量

::: example 卷扬机卷筒 {#ex-hoist-drum}
质量$200\ \mathrm{kg}$、回转半径$300\ \mathrm{mm}$的卷筒，绳绕在$400\ \mathrm{mm}$半径上提升$500\ \mathrm{kg}$的罐笼。驱动力矩为$2500\ \mathrm{N\,m}$。求加速度、绳的张力，以及匀速提升所需的力矩。
::: solution
**方程。**罐笼：$T - m g = m a$；卷筒：
$$
M - T R = I \alpha = I \frac{a}{R}, \qquad I = 200 \times 0.3^{2} = 18\ \mathrm{kg\,m^{2}} .
$$
消去$T$，
$$
M - m g R = a \left( m R + \frac{I}{R} \right)
\quad\Longrightarrow\quad
a = \frac{2500 - 500 \times 9.81 \times 0.4}{500 \times 0.4 + 18 / 0.4}
= \frac{538}{245} = 2.20\ \mathrm{m / s^{2}} ,
$$
$$
T = 500 \left( 9.81 + 2.20 \right) = 6003\ \mathrm{N} .
$$
**匀速提升**需要$M = m g R = 1962\ \mathrm{N\,m}$，所以$538\ \mathrm{N\,m}$——施加力矩的$22$%——用在了加速上。

**校核。**绳无质量，卷筒侧的绳张力等于罐笼侧的；卷筒轴承摩擦已忽略。卷筒轴上看到的**等效惯量**是
$$
I_{\text{eff}} = I + m R^{2} = 18 + 500 \times 0.16 = 98\ \mathrm{kg\,m^{2}} ,
$$
是卷筒自身惯量的五倍半，其中$82$%是载荷经绳“反射”过来的。$\checkmark$

**合理性检验。**这个反射惯量的概念是传动工程中最有用的单个计算。传动链中每个转动元件都按齿轮比的**平方**折算$m r^{2}$或$I$到某一根轴上，所以经$10 : 1$减速器驱动卷扬机的电机，看到的卷筒-载荷惯量除以$100$——这就是为什么小、快、高转速惯量的电机能驱动巨大载荷，也是为什么**最大化**载荷加速度的那个速比，是让电机自身惯量等于反射载荷惯量的那个速比。速比差三倍，可实现的加速度损失四分之一；速比弄反，电机就只是在把自己转起来。
:::
:::

::: example 水平位置释放的杆 {#ex-rod-hinge}
质量$8\ \mathrm{kg}$、长$1.2\ \mathrm{m}$的均质细杆一端铰支，从水平位置由静止释放。求初始角加速度、铰链约束力，以及转到竖直位置时的角速度。
::: solution
**角加速度。**对铰链取矩（约束力无力矩），用$I_O = m L^{2} / 3$：
$$
m g \frac{L}{2} = I_O \alpha = \frac{m L^{2}}{3} \alpha
\quad\Longrightarrow\quad
\alpha = \frac{3 g}{2 L} = \frac{3 \times 9.81}{2 \times 1.2} = 12.26\ \mathrm{rad / s^{2}} .
$$
**铰链约束力。**质心以$\bar{a} = \alpha L / 2 = 7.36\ \mathrm{m / s^{2}}$向下加速，所以
$$
m g - R = m \bar{a}
\quad\Longrightarrow\quad
R = m \left( g - \bar{a} \right) = 8 \times 2.45 = 19.6\ \mathrm{N} = \frac{m g}{4} .
$$
**最低点的速度。**由能量，$m g L / 2 = \tfrac{1}{2} I_O \omega^{2}$：
$$
\omega = \sqrt{\frac{3 g}{L}} = \sqrt{24.53} = 4.95\ \mathrm{rad / s} .
$$
**校核。**此时自由端速度$\omega L = 5.94\ \mathrm{m / s}$，比一个质点自由下落同样$1.2\ \mathrm{m}$达到的$\sqrt{2 g L} = 4.85\ \mathrm{m / s}$还快——因为杆自身的质量分布让上半部分下落、把能量交给下端。$\checkmark$

**合理性检验。**约束力$m g / 4$只有杆重的四分之一，所以释放瞬间铰链是**卸载**的，而自由端以$\tfrac{3}{2} g$下落，快过重力加速度。这就是“下落物体的一部分比$g$加速更快”的经典演示：把杆水平托在桌面上方松手，远端砸到你手上的分量比直接砸一个重物还重。同样的算术给出**撞击中心**，在距铰链$2 L / 3$处，在那里打击，铰链不受冲量——球棒、球拍、锤子和剑的“甜蜜点”，也是锤头装在什么位置的理由。
:::
:::

::: warning 滚动中的摩擦可以指向任何一边，猜错方向并不致命
对**驱动**中的车轮，地面摩擦**向前**，与运动同向，因为否则轮胎会向后打滑。对**制动**中的车轮它向后。在水平面上被中心拉动的自由轮，理想情形下摩擦为零，实际中向后，因为它必须提供克服轮胎滚动阻力的力矩。稳妥的程序是：按假定的方向画摩擦力，求解，看符号——绝不要先争论。若求出的大小超过$\mu N$，纯滚动的假设不成立，必须改用$F = \mu_k N$和$a \ne \alpha R$重做。
:::

::: history
刚体动力学是欧拉（Euler）的，出自他1750至1765年间创建这门学科的论文：1750年的$\sum \mathbf{F} = M \mathbf{a}_G$，1755年的刚体力矩方程，1758年三维转动的主轴方程，都发表在柏林和圣彼得堡的论文集里。**撞击中心**及相关的“甜蜜点”问题可追溯到帕斯卡（Pascal）和十七世纪关于杠杆打击部位的论战，惠更斯（Huygens）有贡献，弹道学里沿用的形式则来自罗宾斯（Robins）1742年的工作；这个术语是劳斯（Routh）的，而**瞬时轴**和极曲线的一般理论是潘索（Poinsot）1834年的。**复摆**作为精密仪器——凯特（Kater）1818年的可逆摆，不需要知道质心位置就能测$g$——是$I = m k^{2} + m d^{2}$这一结果的优雅应用之一，直到1950年代的自由落体计时法之前，它一直是测定重力加速度的标准绝对方法。**反射惯量**的思想，形式化为齿轮传动“等效转动惯量”，属于1930年代的电力传动工程，不过同样的计算在1870年代蒸汽机著作的飞轮设计章节里就已出现。
:::

## 后续内容

能量法和动量法用于刚体见[[dynamics/rigid-body-energy-momentum]]，含惯性积的三维方程见[[dynamics/three-dimensional-dynamics]]，本讲所分析系统的振动在[[vibrations/free-vibration]]中展开。齿轮传动与反射惯量的计算在[[mechanisms/gear-trains]]中详细演算，例6的飞轮尺寸设计则应用于[[machine-design/clutches-brakes-belts]]。

::: summary
- 平面运动刚体需要三个方程：$\sum F_x = m a_x$，$\sum F_y = m a_y$，$\sum M_G = I_G \alpha$。
- 力矩方程对质心或固定点最简单；对滚动体的接触点取矩可消去摩擦。
- 纯滚动给出约束$a = \alpha R$，滚动体的加速度与其质量和尺寸无关，只依赖$k^{2} / R^{2}$。
- 滚动中的摩擦取纯滚动条件所需要的任意方向和大小，上限$\mu N$；假定方向，让符号裁决。
- 带平动载荷的转动系统，轴上的**等效惯量**为$I + m r^{2}$，齿轮比以其**平方**进入。
- 撞击中心是使铰链不受冲量的打击点，位于距铰链$I_O / m \bar{r}$处。
:::

::: quiz
实心圆柱和薄壁管，质量都是$M$、半径都是$R$，从静止并排沿同一斜面纯滚而下。谁先到底？若两者质量都加倍，结果如何？
- [ ] 薄壁管先到；质量加倍使两者都更早到达
- [x] 实心圆柱先到，质量加倍不改变任何结果
- [ ] 它们同时到达，因为加速度与物体无关
- [ ] 只有质量相等时才同时到达
::: solution
滚动体的加速度为$a = g \sin \theta / \left( 1 + k^{2} / R^{2} \right)$，既不含质量也不含尺寸。实心圆柱$k^{2} / R^{2} = \tfrac{1}{2}$，得$a = 0.667 \, g \sin \theta$；薄壁管$k^{2} / R^{2} = 1$，得$a = 0.5 \, g \sin \theta$——圆柱快三分之一，质量无关紧要。物理在于：薄壁管必须把更大的份额的势能损失交给转动，因为它的全部质量都在整个半径上，留给平动的就少了。两者质量都加倍，驱动力和惯量同倍数放大。这就是为什么加速转动件时要问的数字是转动惯量而不是质量：飞轮每千克的储能按$k^{2} \omega^{2}$变化，把质量往外挪是买到惯量最便宜的办法——直到应力给出限制。
:::
:::

## 习题

::: exercise 转动惯量 {level=1 check="240"}
质量$20\ \mathrm{kg}$、半径$0.3\ \mathrm{m}$的实心圆柱纯滚动。求它在$4\ \mathrm{m / s}$下的动能，并由此求其对接触点的回转半径。
::: solution
$$
T = \tfrac{1}{2} m v^{2} \left( 1 + \tfrac{1}{2} \right) = 0.75 \times 20 \times 16 = 240\ \mathrm{J}.
$$
**注。**应填入的答案是$240\ \mathrm{J}$。
:::
:::

::: exercise 滚动 {level=1 check="0.289"}
半径$R$的薄壁管沿$30^{\circ}$斜面纯滚而下。求最小摩擦因数。
::: solution
$\mu_{\min} = \tan \theta / 2 = 0.289$。
:::
:::

::: exercise 反射惯量 {level=1 check="98"}
对例4的卷扬机，折算到卷筒轴的等效转动惯量是多少？
::: solution
$I_{\text{eff}} = I + m R^{2} = 18 + 500 \times 0.4^{2} = 98\ \mathrm{kg\,m^{2}}$。
:::
:::

::: exercise 下落的悠悠球 {level=2}
质量$0.2\ \mathrm{kg}$、外半径$30\ \mathrm{mm}$、轴半径$6\ \mathrm{mm}$、$k = 20\ \mathrm{mm}$的悠悠球从上方固定的绳上解开下落。求向下的加速度和绳的张力。
::: solution
$$
a = \frac{g}{1 + k^{2} / r^{2}} = \frac{9.81}{1 + 400 / 36} = 0.81\ \mathrm{m / s^{2}},
$$
$$
T = m \left( g - a \right) = 0.2 \times 9.00 = 1.80\ \mathrm{N}.
$$
**合理性检验。**加速度只有$g$的$8$%，因为轴半径比回转半径小得多：轴越细，解绳越慢，张力相应地只有重量的$18$%。这就是为什么悠悠球的“睡眠”时间由轴径和轴承摩擦决定而不是由质量决定，也是为什么现代悠悠球用滚珠轴承**离合器**把绳与轴完全脱开，使等效$r$接近零、加速度接近零——是旋转，不是下落。
:::
:::

::: exercise 撞击中心 {level=2}
长$L$的均质球棒一端铰支。它的撞击中心在哪里？球应打在何处使铰链不受冲量？再对质心在$\bar{r}$、对质心回转半径$k$的物理摆重复一遍。
::: solution
距铰链$q$处的冲量$J$给出
$$
J = m \bar{v} = m \omega \bar{r}, \qquad
J q = I_O \omega = m \left( k^{2} + \bar{r}^{2} \right) \omega ,
$$
所以$q = \left( k^{2} + \bar{r}^{2} \right) / \bar{r}$。均质杆$k^{2} = L^{2} / 12$，$\bar{r} = L / 2$，得
$$
q = \frac{L^{2} / 12 + L^{2} / 4}{L / 2} = \frac{2 L}{3} .
$$
**合理性检验。**注意$q = \bar{r} + k^{2} / \bar{r}$就是**振动中心**，而两者互易：把刚体在撞击中心处悬挂，旧铰链点就成了新的撞击中心。凯特可逆摆能工作靠的就是这个互易性。这也是为什么球棒上手感上的甜蜜点和球感上的甜蜜点位置略有不同——手感觉到的是**一阶弯曲振型的节点**，比$2 L / 3$更靠端头，而球棒可以被调到两者重合，“灌软木”和端部加重的球棒就是在用不同办法试图做到这一点。
:::
:::

::: exercise 制动 {level=2}
质量$60\ \mathrm{kg}$、回转半径$300\ \mathrm{mm}$的飞轮以$600\ \mathrm{rpm}$运转，用恒定力矩在$20$转内停下。求制动力矩和时间。
::: solution
$\omega = 62.83\ \mathrm{rad / s}$，$I = 60 \times 0.09 = 5.4\ \mathrm{kg\,m^{2}}$，$\phi = 20 \times 2 \pi = 125.7\ \mathrm{rad}$：
$$
\alpha = \frac{\omega^{2}}{2 \phi} = \frac{3948}{251.3} = 15.71\ \mathrm{rad / s^{2}}, \qquad
M = I \alpha = 84.8\ \mathrm{N\,m},
$$
$$
t = \frac{\omega}{\alpha} = 4.0\ \mathrm{s}.
$$
**合理性检验。**需要耗散的能量为$\tfrac{1}{2} \times 5.4 \times 62.83^{2} = 10\,650\ \mathrm{J}$，而$M \phi = 84.8 \times 125.7 = 10\,660\ \mathrm{J}$——一个屡试不爽的有用交叉校核。起始**功率**为$M \omega = 5330\ \mathrm{W}$，这就是为什么飞轮制动是热问题而不是力矩问题：$10.7\ \mathrm{kJ}$在四秒内灌进制动鼓，鼓温升高几十度；长下坡时的热衰退，就是同一个计算反复做下去的结果。
:::
:::

::: exercise 设计 {level=3}
一台冲床在$8\ \mathrm{mm}$厚软钢板上冲$25\ \mathrm{mm}$的孔，每孔需$8\ \mathrm{kJ}$，每分钟冲$25$个。飞轮平均转速$250\ \mathrm{rpm}$，转速降不得超过$8$%。确定飞轮尺寸并选择电机。
::: solution
**速度波动。**$\omega = 2 \pi \times 250 / 60 = 26.18\ \mathrm{rad / s}$，$\omega_1 - \omega_2 = 0.08 \times 26.18 = 2.094\ \mathrm{rad / s}$。
**转动惯量。**
$$
I = \frac{E}{\omega^{2} \left( \omega_1 - \omega_2 \right) / \omega}
= \frac{8000}{26.18^{2} \times 0.08} = 146\ \mathrm{kg\,m^{2}} .
$$
**电机额定值。**平均功率为
$$
P = \frac{8000 \times 25}{60} = 3333\ \mathrm{W} = 3.33\ \mathrm{kW},
$$
故选$4\ \mathrm{kW}$电机，对应的**峰值**需求是$8\ \mathrm{kJ}$在冲压行程的$0.15\ \mathrm{s}$内完成，若无飞轮将是$53\ \mathrm{kW}$。
**飞轮。**轮缘式飞轮，$90$%的质量集中在平均半径$500\ \mathrm{mm}$处，
$$
m = \frac{I}{0.9 \times 0.5^{2}} = \frac{146}{0.225} = 649\ \mathrm{kg}.
$$
**设计评注。**飞轮不减少所需的**能量**，只减少电机必须提供的**功率**：它以$3.33\ \mathrm{kW}$连续吸入，在$0.15\ \mathrm{s}$内吐出。这就是飞轮存在的全部理由，也是为什么压力机既按吨位又按飞轮能量标称。两点提醒。其一，$500\ \mathrm{mm}$半径、$250\ \mathrm{rpm}$运转的$649\ \mathrm{kg}$铸铁轮缘，每千克轮缘只存$0.5 \times 0.5^{2} \times 26.18^{2} = 87\ \mathrm{J}$，并不多。锻造钢轮缘可以安全运转到$150\ \mathrm{m / s}$而不是这里的$13\ \mathrm{m / s}$，储能$11\ \mathrm{kJ / kg}$；这就是为什么现代压力机和储能飞轮用高速钢或复合材料轮缘，以小$I$配高$\omega$，因为储能按$\omega^{2}$增长，轮缘应力也按$\omega^{2}$增长，但**比**能量与许用应力成线性。其二，$8$%的转速降是**机床**的允许值；要冲出光洁孔的压力机需要滑块速度不低于某个下限，所以真正的约束常常是下止点处的**曲轴**能量而不是平均转速，此时飞轮按冲压力-行程图而不是按运转不均匀系数定尺寸。
:::
:::

::: exercise 推导 {level=3}
推导质量$m$、半径$R$、质心回转半径$k$的轮在水平面上纯滚动的运动方程，先对绕轮轴施加纯力偶$M$驱动的情形，再对在轮轴上方高度$y$处施加水平力$P$驱动的情形。证明摩擦力在某个确定高度处反向，并确定该高度。
::: solution
**轮轴上的力偶。**摩擦力$F$设为向前，$a = \alpha R$，
$$
F = m a, \qquad M - F R = I_G \frac{a}{R} ,
$$
$$
a = \frac{M R}{m \left( k^{2} + R^{2} \right)}, \qquad
F = \frac{M R}{k^{2} + R^{2}} \quad \text{向前} .
$$
摩擦力必然**向前**，因为它是唯一的水平力而轮向前加速；约束$F \le \mu m g$给出最大驱动扭矩
$$
M_{\max} = \mu m g \, \frac{k^{2} + R^{2}}{R} .
$$
**高度$y$处的力。**投影并对中心取顺时针力矩，
$$
P + F = m a, \qquad P y - F R = I_G \frac{a}{R} .
$$
消去$a$，
$$
a = \frac{P R \left( R + y \right)}{m \left( k^{2} + R^{2} \right)}, \qquad
\boxed{F = \frac{P \left( R y - k^{2} \right)}{k^{2} + R^{2}}} .
$$
因此摩擦力在
$$
y = \frac{k^{2}}{R}, \qquad \text{即离地高度 } \ h = R + \frac{k^{2}}{R} \text{ 处},
$$
**消失**，在该高度以上**向前**，以下**向后**。对例1的线轴，$k^{2} / R = 0.0225 / 0.2 = 112.5\ \mathrm{mm}$，所以$y = 100\ \mathrm{mm}$处的绳给出向后的摩擦$2.4\ \mathrm{N}$，与前面算出的完全一致。

**评注。**统一的表述是：滚动接触处的摩擦取纯滚动条件所要求的一切，其符号由外力作用线落在**临界高度**$R + k^{2} / R$的哪一侧决定。两个极限值得注意。当$k \to 0$（质量全在轮轴上）临界高度趋于$R$，任何高于轮轴的力都使摩擦向前，这符合直觉；当$k \to R$（薄圆环）它趋于$2 R$，即轮顶，所以在顶部拉的环总是受**向后**的摩擦。另一个校核是纯力偶，它是$P y = M$固定时$P \to \infty$、$y \to \infty$的极限，给出向前的$F$，与前面单独推导的一致。本讲的每个情形——被拉的线轴、驱动的车轮、制动的车轮、斜面上的圆柱——都是这条单一规律的一个实例，推导一次胜过记住四个答案。
:::
:::
