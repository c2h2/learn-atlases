压一下跳板的末端，它就会弯曲；松开手，它又弹回原状，把你做的功归还回来。跳板保持弯曲期间，这部分功以**应变能**的形式储存在材料中，分布于每一根纤维，且与该处应力的平方成正比。这个简单的观察——变形的弹性体是一个能量储存器，载荷所做的功必须等于所储存的能量——结果成为力学中最富成效的思想之一。它只需几行就能求出弯曲吊钩或铰接桁架的位移，而用[[mechanics-of-materials/beam-deflection]]中的微分方程则要写上好几页；它为超静定结构提供了所缺的那个方程；而当它被重新表述为"真实位移场使总势能**取极小值**"时，它又把[[solid-mechanics/linear-elasticity]]中的边值问题变成了计算机可以近似求解的优化问题。这最后一步就是有限元法。

本章按工程师使用能量法的顺序展开。首先定义应变能和载荷的功，证明克拉珀龙（Clapeyron）定理和贝蒂-麦克斯韦（Betti–Maxwell）定理；然后证明卡氏定理，并配合虚加载荷的技巧把它用于梁、曲杆、桁架和超静定结构；接着推导虚功原理，单位载荷法是它的推论；最后讨论最小势能原理和瑞利-里茨（Rayleigh–Ritz）法，后者是有限元法的直接前身。

## 应变能

把一根杆从零缓慢加载到力$P$。每一个伸长增量$d\Delta$吸收功$P\,d\Delta$，因此总功就是力-伸长曲线下的面积。如果材料是弹性的，这些功可以全部恢复，并以应变能的形式储存；如果曲线是直线，面积就是三角形面积$\tfrac12 P\Delta$。除以体积$AL$，力和伸长就变成应力和应变，得到单位体积的能量。

::: definition 应变能密度与余能密度 {#def-energy-density}
对弹性材料，**应变能密度**是应变从零增长时应力在单位体积上所做的功，
$$
U_0 = \int_0^{\varepsilon_{ij}} \sigma_{ij}\,d\varepsilon_{ij},
$$
**余能密度**为$U_0^* = \int_0^{\sigma_{ij}} \varepsilon_{ij}\,d\sigma_{ij}$，于是$U_0 + U_0^* = \sigma_{ij}\varepsilon_{ij}$。对**线**弹性材料，两者相等，
$$
U_0 = U_0^* = \tfrac12\sigma_{ij}\varepsilon_{ij}
= \tfrac12\bigl(\sigma_x\varepsilon_x + \sigma_y\varepsilon_y + \sigma_z\varepsilon_z + \tau_{xy}\gamma_{xy} + \tau_{yz}\gamma_{yz} + \tau_{zx}\gamma_{zx}\bigr),
$$
单向应力时为$\sigma^2/(2E)$，纯剪切时为$\tau^2/(2G)$。物体的**应变能**为$U = \int_V U_0\,dV$，单位为焦耳。
:::

用初等应力分布在横截面上对$\sigma^2/(2E)$积分，可以用内力表示细长构件的应变能。记$N$为轴力，$M$为弯矩，$T$为扭矩，$V$为剪力，它们都是沿构件位置$x$的函数，则

$$
U = \int_0^L \frac{N^2}{2EA}\,dx + \int_0^L \frac{M^2}{2EI}\,dx + \int_0^L \frac{T^2}{2GJ}\,dx + \int_0^L \frac{f_s V^2}{2GA}\,dx .
$$ {#eq-member-energy}

对弯曲，由于$\int_A y^2\,dA = I$，有$\int_A (My/I)^2/(2E)\,dA = M^2/(2EI)$；圆轴扭转用$J$同样可得。剪切项含有一个**截面形状系数**$f_s = \frac{A}{I^2}\int_A \frac{Q^2}{b^2}\,dA$，矩形截面为$6/5$，实心圆截面为$10/9$。对长度超过约五倍截面高度的梁，剪切项只有弯曲项的百分之几甚至更小，通常略去；但对短而高的构件和夹层板，它不可忽略。

::: theorem 克拉珀龙定理 {#thm-clapeyron}
若一个线弹性体的支承不做功，由从零逐渐施加的力$P_1, \dots, P_n$（可以包括力偶）加载，$\Delta_i$为$P_i$作用点沿$P_i$方向的位移（对力偶则为转角），则
$$
U = \tfrac12\sum_{i=1}^n P_i\,\Delta_i .
$$
:::

::: proof
假设小位移、线弹性，且载荷准静态施加（没有动能）。由于物体是弹性的，所储存的能量只取决于最终状态而与加载路径无关，因此可以自行选择路径：让所有载荷按固定比例同时施加，$P_i(s) = sP_i$，$s$从$0$增大到$1$。由线性，每个位移为$\Delta_i(s) = s\Delta_i$。所做的功为
$$
W = \sum_i \int_0^1 P_i(s)\,\frac{d\Delta_i}{ds}\,ds = \sum_i P_i\Delta_i\int_0^1 s\,ds = \tfrac12\sum_i P_i\Delta_i .
$$
支承不做功，也没有能量耗散，所以$W = U$。
:::

因子$\tfrac12$就是直线型力-位移关系下的三角形面积。只有一个载荷作用时，克拉珀龙定理本身就能给出位移：对端部受载荷$P$的悬臂梁，$U = \int_0^L (Px)^2/(2EI)\,dx = P^2L^3/(6EI) = \tfrac12 P\Delta$，所以$\Delta = PL^3/(3EI)$。有多个载荷时，它只给出一个方程却有多个未知量；卡氏定理消除了这一限制。

::: theorem 贝蒂-麦克斯韦互等定理 {#thm-betti}
对支承固定的线弹性体，设载荷系$A$（力$P_i$）在载荷系$B$（力$Q_j$）的作用点和方向上产生位移$\Delta_i^{B}$，而$B$在$A$的载荷处产生位移$\Delta_i^{A}$。则
$$
\sum_i P_i\,\Delta_i^{A\leftarrow B} = \sum_j Q_j\,\Delta_j^{B\leftarrow A},
$$
即载荷系$A$在$B$所引起的位移上做的功，等于$B$在$A$所引起的位移上做的功（**贝蒂**，功的互等定理）。特别地，单位载荷作用于点2时在点1产生的位移，等于单位载荷作用于点1时在点2产生的位移：**柔度系数**是对称的，$f_{12} = f_{21}$（**麦克斯韦**，位移互等定理）。
:::

::: proof
先施加$A$：由克拉珀龙定理，所做的功为$W_{AA} = \tfrac12\sum P_i\Delta_i^{A\leftarrow A}$。然后在$A$保持作用的情况下施加$B$：$B$做功$\tfrac12\sum Q_j\Delta_j^{B\leftarrow B}$，而已达全值的载荷$P_i$随$B$引起的位移$\Delta_i^{A\leftarrow B}$移动，做了全部的功$\sum P_i\Delta_i^{A\leftarrow B}$（没有因子$\tfrac12$：在这段运动中力是常量）。总功为：
$$
W_1 = \tfrac12\sum P_i\Delta_i^{A\leftarrow A} + \tfrac12\sum Q_j\Delta_j^{B\leftarrow B} + \sum P_i\Delta_i^{A\leftarrow B}.
$$
先施加$B$后施加$A$，得到相同的表达式，只是最后一项换成$\sum Q_j\Delta_j^{B\leftarrow A}$。由叠加原理，两种顺序的最终状态相同，而弹性体储存的能量只取决于最终状态，所以$W_1 = W_2$，交叉项相等。对单个单位载荷$P_1 = 1$和$Q_2 = 1$，贝蒂恒等式变为$1\cdot f_{12} = 1\cdot f_{21}$。
:::

麦克斯韦定理在实践中常常出人意料。挂在悬臂梁端部的载荷使梁中点产生的挠度，恰好等于同一载荷挂在中点时使端部产生的挠度——两种情况都是$5PL^3/(48EI)$。它还保证了线弹性结构的每一个刚度矩阵都是对称的，有限元程序正是利用这一点把存储量减半。

## 卡氏定理

把线性结构在载荷$P_1,\dots,P_n$作用下的位移写成$\Delta_i = \sum_j f_{ij}P_j$，其中$f_{ij}$为柔度系数。克拉珀龙定理使应变能成为载荷的二次型，$U = \tfrac12\sum_i\sum_j f_{ij}P_iP_j$。对其中一个载荷求导并利用麦克斯韦对称性，该载荷处的位移便得出了。

::: theorem 卡氏第二定理 {#thm-castigliano}
对支承固定的线弹性结构，把应变能$U(P_1,\dots,P_n)$表示为各独立外加载荷的函数，则$P_k$作用点沿$P_k$方向的位移为
$$
\Delta_k = \frac{\partial U}{\partial P_k}.
$$ {#eq-castigliano}
对力偶$C_k$，$\partial U/\partial C_k$是沿力偶转向的转角。
:::

::: proof
假设：线弹性材料，小位移（因此叠加原理成立，平衡方程在未变形构形上建立），支承不做功。由叠加原理$\Delta_i = \sum_j f_{ij}P_j$，再由[[#thm-clapeyron]]
$$
U = \tfrac12\sum_i P_i\Delta_i = \tfrac12\sum_i\sum_j f_{ij}P_iP_j .
$$
对$P_k$求导。乘积$P_iP_j$在$i = k$或$j = k$时有贡献：
$$
\frac{\partial U}{\partial P_k} = \tfrac12\sum_j f_{kj}P_j + \tfrac12\sum_i f_{ik}P_i = \tfrac12\sum_j f_{kj}P_j + \tfrac12\sum_j f_{kj}P_j = \Delta_k,
$$
其中中间一步用到了[[#thm-betti]]给出的$f_{ik} = f_{ki}$。
:::

::: remark 恩格塞尔形式与第一定理
对非线性弹性材料，上面的证明不成立，但若把$U$换成余能$U^*$，结论仍然成立：$\Delta_k = \partial U^*/\partial P_k$（克罗蒂（Crotti）与恩格塞尔（Engesser））。反过来，卡氏**第一定理**$P_k = \partial U/\partial\Delta_k$（$U$写成位移的函数）对任何弹性材料都成立，它是[[finite-element-method/direct-stiffness]]中刚度法背后的能量表述。
:::

对细长构件，在积分号下对[[#eq-member-energy]]求导，可以免去先平方再求导的麻烦：

$$
\Delta_k = \int_0^L \frac{N}{EA}\frac{\partial N}{\partial P_k}\,dx + \int_0^L \frac{M}{EI}\frac{\partial M}{\partial P_k}\,dx + \int_0^L \frac{T}{GJ}\frac{\partial T}{\partial P_k}\,dx .
$$ {#eq-castigliano-members}

有两个技巧使它成为通用工具。一是**虚加载荷**（附加力）：要求没有载荷作用之处或没有载荷作用的方向上的位移，就在那里加一个假想载荷$Q$，求导后再令$Q = 0$。二是对**超静定**结构，把多余约束力$R$当作外加载荷：若支座不移动，则$\partial U/\partial R = 0$——多余约束力取使应变能最小的值（梅纳布雷亚（Menabrea）的**最小功原理**）。

::: algorithm 用卡氏定理求位移和多余约束力 {#alg-castigliano}
1. 画受力图；选定多余约束力（如有），把它们标为未知载荷$R_1, R_2,\dots$。
2. 若所求位移不在已有载荷之下，就在该点沿该方向加一个虚加载荷$Q$（或力偶）。
3. 用实际载荷、$Q$和多余约束力写出每一段中的$N(x)$、$M(x)$、$T(x)$，每段采用一致的符号规定。
4. 对每个位于刚性支座处的多余约束力，令$\partial U/\partial R_j = 0$，解出$R_j$。
5. 由[[#eq-castigliano-members]]计算$\Delta = \partial U/\partial Q$，然后令$Q = 0$。结果为正，表示位移与所设$Q$的方向相同。
:::

::: example 曲杆的位移 {#ex-quarter-ring}
一根半径$R = 0.5\,\mathrm{m}$的四分之一圆弧杆位于竖直平面内，圆心$O$在原点。它在$A = (R, 0)$处固定，该处切线竖直；上端$B = (0, R)$为自由端，作用有竖直向下的载荷$P = 200\,\mathrm{N}$。杆为圆截面钢杆，$d = 20\,\mathrm{mm}$，$E = 200\,\mathrm{GPa}$。只考虑弯曲，求$B$点的竖直位移和水平位移。
::: solution
**受力图。** 在点$S = (R\cos\theta, R\sin\theta)$处截开杆，$0 \le \theta \le \pi/2$，保留$SB$段。作用于其上的有：$B$处向下的载荷$P$；$B$处沿$+x$方向的水平虚加载荷$Q$；以及$S$处的内力和内力矩。$B$处载荷对$S$取矩（逆时针为正），$\mathbf{r}_B - \mathbf{r}_S = (-R\cos\theta,\ R - R\sin\theta)$：
$$
M(\theta) = (-R\cos\theta)(-P) - (R - R\sin\theta)(Q) = PR\cos\theta - QR(1 - \sin\theta).
$$
弧长微元为$ds = R\,d\theta$，与截面尺寸相比杆的曲率很小（$R/d = 25$），所以可用直梁的能量$M^2/(2EI)$。

**竖直位移**（沿$P$方向），令$Q = 0$：
$$
\delta_v = \int_0^{\pi/2}\frac{M}{EI}\frac{\partial M}{\partial P}\,R\,d\theta = \frac{PR^3}{EI}\int_0^{\pi/2}\cos^2\theta\,d\theta = \frac{\pi PR^3}{4EI}.
$$
**水平位移**（沿$Q$方向），$\partial M/\partial Q = -R(1 - \sin\theta)$，然后令$Q = 0$：
$$
\delta_h = \int_0^{\pi/2}\frac{PR\cos\theta\,\bigl[-R(1 - \sin\theta)\bigr]}{EI}\,R\,d\theta = -\frac{PR^3}{EI}\Bigl[\sin\theta - \tfrac12\sin^2\theta\Bigr]_0^{\pi/2} = -\frac{PR^3}{2EI}.
$$
负号表示$B$沿$-x$方向移动，即朝向圆心所在的竖直线。

**数值。** $I = \pi d^4/64 = 7.854\times10^{-9}\,\mathrm{m^4}$，$EI = 1571\,\mathrm{N\,m^2}$，$PR^3 = 200 \times 0.125 = 25\,\mathrm{N\,m^3}$：
$$
\delta_v = \frac{\pi \times 25}{4 \times 1571}\,\mathrm{m} = 12.5\,\mathrm{mm}, \qquad
\delta_h = \frac{25}{2 \times 1571}\,\mathrm{m} = 7.96\,\mathrm{mm}.
$$
最大弯矩在根部，为$PR = 100\,\mathrm{N\,m}$，弯曲应力$M(d/2)/I = 127\,\mathrm{MPa}$，处于结构钢的弹性范围之内。

**合理性检查。** 量纲：$PR^3/(EI)$为$\mathrm{N\,m^3}/(\mathrm{N\,m^2}) = \mathrm{m}$ ✓。同样长度$\pi R/2 = 0.785\,\mathrm{m}$的直悬臂梁挠度为$P(\pi R/2)^3/(3EI) = 20.6\,\mathrm{mm}$；曲杆更刚硬，因为它的大部分长度靠近$P$的作用线，那里的力臂$R\cos\theta$很小。载荷还会产生**垂直于**自身的位移，这是直梁公式永远不会给出的。
:::
:::

::: example 双杆支架 {#ex-truss}
一个铰接支架在墙上有支座$A = (0, 0)$和$B = (0, 3)\,\mathrm{m}$，节点为$C = (4, 0)\,\mathrm{m}$，杆件为$AC$（水平，$4\,\mathrm{m}$）和$BC$（$5\,\mathrm{m}$）。载荷$P = 30\,\mathrm{kN}$竖直悬挂于$C$。两杆均为钢杆，$A = 500\,\mathrm{mm^2}$，$E = 200\,\mathrm{GPa}$。求$C$的竖直位移和水平位移。
::: solution
**节点C的受力图**（拉为正）：$P$向下；$F_{BC}$沿$CB$，方向$(-0.8, 0.6)$；$F_{AC}$沿$CA$，方向$(-1, 0)$。
竖直方向：$0.6F_{BC} - P = 0 \Rightarrow F_{BC} = P/0.6 = 50\,\mathrm{kN}$（拉）。水平方向：$-0.8F_{BC} - F_{AC} = 0 \Rightarrow F_{AC} = -40\,\mathrm{kN}$（压）。

对桁架，[[#eq-castigliano-members]]简化为$\Delta = \sum F\,(\partial F/\partial P)\,L/(EA)$。这里$\partial F_{BC}/\partial P = 5/3$，$\partial F_{AC}/\partial P = -4/3$，$EA = 2\times10^{11} \times 5\times10^{-4} = 1.0\times10^{8}\,\mathrm{N}$：
$$
\delta_v = \frac{(50\,000)(5/3)(5) + (-40\,000)(-4/3)(4)}{1.0\times10^{8}}\,\mathrm{m} = \frac{416\,667 + 213\,333}{1.0\times10^{8}}\,\mathrm{m} = 6.30\,\mathrm{mm}\ \text{（向下）}.
$$
求水平位移时，在$C$处沿$+x$加虚加载荷$Q$。节点方程变为$0.6F_{BC} = P$和$-0.8F_{BC} - F_{AC} + Q = 0$，所以$\partial F_{BC}/\partial Q = 0$，$\partial F_{AC}/\partial Q = 1$。令$Q = 0$：
$$
\delta_h = \frac{(-40\,000)(1)(4)}{1.0\times10^{8}}\,\mathrm{m} = -1.60\,\mathrm{mm},
$$
即朝向墙面移动$1.60\,\mathrm{mm}$。

**合理性检查。** 水平位移恰好就是$AC$的缩短量：$40\,000 \times 4/10^8 = 1.6\,\mathrm{mm}$ ✓，因为$BC$只是绕$B$摆动来适应它。$BC$中的应力为$100\,\mathrm{MPa}$，$AC$中为$-80\,\mathrm{MPa}$；受压杆还必须校核屈曲（[[mechanics-of-materials/buckling]]），这是任何计算位移的能量方法都揭示不了的。
:::
:::

::: example 用最小功原理求解一端固定一端铰支梁 {#ex-propped}
跨度$L = 6\,\mathrm{m}$的梁右端固定，左端搁在滚动支座上，承受均布载荷$w = 12\,\mathrm{kN/m}$。求滚动支座反力、固定端弯矩和最大正弯矩。
::: solution
**受力图。** $x = 0$处向上的滚动支座反力$R$；在$0 \le x \le L$上向下的分布载荷$w$；墙处有竖直反力和固定端约束力偶。未知量比静力学所能提供的方程多一个：选$R$为多余约束力。

由截面左侧的分离体，$x$处的弯矩（下凸为正）为$M(x) = Rx - wx^2/2$。滚动支座不移动，所以
$$
\frac{\partial U}{\partial R} = \int_0^L \frac{M}{EI}\frac{\partial M}{\partial R}\,dx = \frac{1}{EI}\int_0^L\Bigl(Rx - \frac{wx^2}{2}\Bigr)x\,dx = \frac{1}{EI}\Bigl(\frac{RL^3}{3} - \frac{wL^4}{8}\Bigr) = 0
\quad\Rightarrow\quad R = \frac{3wL}{8}.
$$
数值：$R = 3 \times 12 \times 6/8 = 27\,\mathrm{kN}$。固定端弯矩为$M(L) = RL - wL^2/2 = 162 - 216 = -54\,\mathrm{kN\,m}$，即大小为$wL^2/8$的负弯矩。剪力$R - wx$在$x = R/w = 2.25\,\mathrm{m}$处为零，该处正弯矩最大：$R^2/(2w) = 27^2/24 = 30.4\,\mathrm{kN\,m}$。

**合理性检查。** 竖直方向平衡：墙处反力$= wL - R = 72 - 27 = 45\,\mathrm{kN} = 5wL/8$ ✓。支座承担的载荷不到一半（$3/8$，而简支时为$1/2$），因为固定端更刚硬；而且结果与$EI$无关——支承刚性的等截面梁中的多余约束力本应如此。
:::
:::

最小功的表述可以直接看出来。取$w = L = EI = 1$，应变能作为$R$试探值的函数为$U(R) = \int_0^1 (Rx - x^2/2)^2/2\,dx = R^2/6 - R/8 + 1/40$，是一条抛物线。

::: widget plot
f: x^2/6 - x/8 + 1/40
x: 0, 0.8
y: 0, 0.08
tangent: 0.15
points: 0.375, 0.0015625
vlines: 0.375
caption: 一端固定一端铰支梁（取$w = L = EI = 1$）的应变能随横轴上支座反力试探值$R$的变化。拖动切点：其斜率为$\partial U/\partial R$，由卡氏定理，它就是支座处向上的位移。$R$较小时斜率为负（梁端会下垂到支座以下），$R$较大时斜率为正（支座会把梁端顶起）；只有在$R = 3/8$处斜率为零、$U$最小——这正是使支座位移为零的反力。
:::

::: warning 偏导数要求载荷相互独立
卡氏定理是在**保持所有其他独立载荷不变**的条件下对某一载荷求$U$的偏导数。忘记这一点会导致两种错误。第一，由静力学确定的反力不是独立载荷：弯矩要用外加载荷（和多余约束力）表示，而不能用尚未消去的反力表示。第二，若两个载荷捆绑在一起——"两端各有一个载荷$P$"——则$\partial U/\partial P$给出的是两个位移之**和**（对大小相等、方向相反的载荷则是相对位移），而不是某一点的位移。要求其中一个，应给两个载荷取不同的名字，求导之后再令它们相等。习题中径向受压的圆环（[[#ex-ring]]）正是有意利用了这一点：$\partial U/\partial P$就是直径的改变量。
:::

## 虚功原理

卡氏定理要求线性。一个更基本的、对任何材料都成立的表述，把任意一组平衡的力与任意一组协调的位移联系起来。它根本不需要能量——只需要平衡和几何。

::: theorem 虚功原理 {#thm-virtual-work}
设$\sigma_{ij}$是**任意**一个应力场，它在$V$内与体力$b_i$平衡，在$S$上与面力$t_i = \sigma_{ij}n_j$平衡；设$u_i$是**任意**一个连续位移场（小位移，从而$\varepsilon_{ij} = \tfrac12(u_{i,j} + u_{j,i})$）——两者无需通过本构关系相联系。则
$$
\int_V \sigma_{ij}\,\varepsilon_{ij}\,dV = \int_V b_i\,u_i\,dV + \int_S t_i\,u_i\,dS,
$$ {#eq-virtual-work}
即内力虚功等于外力虚功。
:::

::: proof
利用$t_i = \sigma_{ij}n_j$和散度定理，
$$
\int_S t_iu_i\,dS = \int_S \sigma_{ij}u_in_j\,dS = \int_V (\sigma_{ij}u_i)_{,j}\,dV = \int_V \sigma_{ij,j}u_i\,dV + \int_V \sigma_{ij}u_{i,j}\,dV.
$$
平衡给出$\sigma_{ij,j} = -b_i$，所以第一个体积分为$-\int_V b_iu_i\,dV$。把$u_{i,j}$分解为对称部分$\varepsilon_{ij}$和反对称部分（转动）；对称的$\sigma_{ij}$与反对称张量的乘积为零，所以$\sigma_{ij}u_{i,j} = \sigma_{ij}\varepsilon_{ij}$。整理即得[[#eq-virtual-work]]。证明中只用到了平衡、应力的对称性、小位移运动学和$u_i$的连续性。
:::

该定理有两种用法。在**虚位移原理**中，应力是真实的，$u_i$是一个满足支承条件的假想微小位移$\delta u_i$；于是在$S_u$上$\delta u_i = 0$，[[#eq-virtual-work]]变成一个平衡表述，即有限元赖以建立的弱形式（[[finite-element-method/weak-forms]]）。在**虚力原理**中，位移是真实的，而应力是与某个方便的载荷——一个单位载荷——相平衡的假想应力。由此得到结构分析中最有用的位移公式。

::: proposition 单位载荷法 {#prop-unit-load}
要求杆系结构上某点沿选定方向的位移$\Delta$，就在未加载的结构上于该点沿该方向施加一个单位载荷，求出它产生的内力$n(x)$、$m(x)$、$t(x)$（任何一组与单位载荷平衡的内力都可以）。若实际内力为$N$、$M$、$T$且材料为线弹性，则
$$
1\cdot\Delta = \sum\int \frac{nN}{EA}\,dx + \sum\int \frac{mM}{EI}\,dx + \sum\int \frac{tT}{GJ}\,dx .
$$ {#eq-unit-load}
对桁架，$\Delta = \sum_k n_kN_kL_k/(E_kA_k)$。
:::

::: proof
对虚拟的（单位载荷）应力系统和真实位移应用[[#thm-virtual-work]]。外力虚功是单位载荷乘以其作用点的真实位移，即$1\cdot\Delta$；支承不做功，因为那里的真实位移为零。细长构件的内力虚功化为内力乘以真实的广义应变：轴向应变$N/(EA)$、曲率$M/(EI)$、扭转率$T/(GJ)$，从而得到[[#eq-unit-load]]中的各项。线性只用于把真实应变用$N$、$M$、$T$表示；对非线性本构关系或有温度变化的情形，直接代入真实应变——例如用热曲率$\alpha\,\Delta T_\text{gradient}/h$代替$M/(EI)$。
:::

与[[#eq-castigliano-members]]比较：$m = \partial M/\partial Q$恰好就是单位虚加载荷产生的弯矩，所以对线性结构，单位载荷法与加虚加载荷的卡氏定理是同一个计算。单位载荷法更为一般，因为它还能处理温度变化、制造误差和支座沉降。

## 最小势能原理

现在只考虑线弹性体，并提出另一个问题：在所有满足支承条件的位移场中，自然界选择了哪一个？

::: definition 总势能 {#def-potential}
若一个位移场连续且在$S_u$上满足位移边界条件，则称它是**运动学容许的**（几何可能的）。对这样的场，在$S_t$上给定面力$\bar t_i$、受体力$b_i$作用的物体的**总势能**为
$$
\Pi[\mathbf{u}] = U[\mathbf{u}] - \int_V b_iu_i\,dV - \int_{S_t}\bar t_iu_i\,dS,
$$
即应变能减去载荷在保持不变的情况下经过该位移所做的功——"载荷的势能"。对承受分布载荷$w(x)$和集中载荷$P_k$的弯曲梁，
$$
\Pi[v] = \int_0^L \tfrac12 EI\,(v'')^2\,dx - \int_0^L w\,v\,dx - \sum_k P_k\,v(x_k).
$$ {#eq-beam-potential}
:::

::: theorem 最小势能原理 {#thm-min-pe}
对应变能正定的线弹性体，满足弹性力学全部方程的位移场使$\Pi$比任何其他运动学容许场都小：
$$
\Pi[\mathbf{u}^\star + \mathbf{w}] - \Pi[\mathbf{u}^\star] = U[\mathbf{w}] \ge 0,
$$
仅当$\mathbf{w}$不产生应变时等号成立。反之，使$\Pi$取驻值的运动学容许场就是精确解。
:::

::: proof
设$\mathbf{u}^\star$为精确解，应力为$\sigma^\star_{ij}$，$\mathbf{u} = \mathbf{u}^\star + \mathbf{w}$为任一其他容许场；则在$S_u$上$\mathbf{w} = \mathbf{0}$。由于$U_0$是二次型，$U_0(\varepsilon^\star + \varepsilon^w) = U_0(\varepsilon^\star) + \sigma^\star_{ij}\varepsilon^w_{ij} + U_0(\varepsilon^w)$——交叉项利用了弹性常数的对称性，$\tfrac12 C_{ijkl}(\varepsilon^\star_{ij}\varepsilon^w_{kl} + \varepsilon^w_{ij}\varepsilon^\star_{kl}) = \sigma^\star_{kl}\varepsilon^w_{kl}$。因此
$$
\Pi[\mathbf{u}] - \Pi[\mathbf{u}^\star] = \Bigl[\int_V \sigma^\star_{ij}\varepsilon^w_{ij}\,dV - \int_V b_iw_i\,dV - \int_{S_t}\bar t_iw_i\,dS\Bigr] + U[\mathbf{w}].
$$
对平衡场$\sigma^\star$和位移场$\mathbf{w}$应用[[#thm-virtual-work]]：$S_u$上的外力功为零，因为那里$\mathbf{w} = \mathbf{0}$；而在$S_t$上面力为$\bar t_i$。所以方括号为零，差值等于$U[\mathbf{w}] \ge 0$。反过来：若$\Pi$在容许场$\mathbf{u}$处取驻值，则其一阶变分对每个容许的$\mathbf{w}$都为零，经分部积分（把[[#thm-virtual-work]]的证明倒过来读）便得到$V$内的平衡方程和$S_t$上的面力条件。
:::

该定理有两个在实践中很重要的推论。任何近似的容许场给出的能量都**高于**真实值，因此近似解可以排序：$\Pi$越低越好。又因为$\Pi$的误差是误差场的应变能，所以近似位移场偏**刚**：对单个集中载荷$P$，$\Pi_\text{min} = -\tfrac12 P\Delta$（由克拉珀龙定理），所以$\Pi$越高意味着$\Delta$越小。基于位移的近似解在单个载荷作用下会**低估**位移。

### 瑞利-里茨法

::: algorithm 瑞利-里茨法 {#alg-ritz}
1. 选择试函数$\psi_1(x),\dots,\psi_n(x)$，每一个都满足**位移**（运动学）边界条件；力的边界条件不必满足，因为$\Pi$的驻值条件会近似地给出它们。
2. 写出近似式$v(x) = \sum_k a_k\psi_k(x)$，其中系数$a_k$未知。
3. 代入$\Pi$，它成为$a_k$的二次函数：$\Pi = \tfrac12\mathbf{a}\T\mathbf{K}\mathbf{a} - \mathbf{a}\T\mathbf{F}$。
4. 对每个$k$令$\partial\Pi/\partial a_k = 0$：得到线性方程组$\mathbf{K}\mathbf{a} = \mathbf{F}$，其中对称的"刚度矩阵"为$K_{jk} = \int EI\,\psi_j''\psi_k''\,dx$，"载荷向量"为$F_k = \int w\psi_k\,dx + \sum P_i\psi_k(x_i)$。
5. 求解，并通过增加项数检验收敛性。
:::

若把试函数选为只在结构的一小块上非零的简单多项式，则第4步恰好就是有限元刚度矩阵的组装：有限元法就是采用局部试函数的瑞利-里茨法（[[finite-element-method/direct-stiffness]]）。

::: example 简支梁的单项里茨解 {#ex-ritz-ss}
跨度$L = 5\,\mathrm{m}$、$EI = 1.0\times10^{7}\,\mathrm{N\,m^2}$的简支梁承受均布载荷$w = 10\,\mathrm{kN/m}$。用试函数$v = a\sin(\pi x/L)$（向下为正）估计跨中挠度和弯矩，并与精确值$5wL^4/(384EI)$和$wL^2/8$比较。
::: solution
试函数在$x = 0$和$x = L$处为零，即满足运动学条件；碰巧它在这两处也满足$v'' = 0$。由$v'' = -a(\pi/L)^2\sin(\pi x/L)$、$\int_0^L\sin^2(\pi x/L)\,dx = L/2$和$\int_0^L\sin(\pi x/L)\,dx = 2L/\pi$：
$$
\Pi(a) = \frac{EI}{2}\,a^2\Bigl(\frac{\pi}{L}\Bigr)^4\frac{L}{2} - w\,a\,\frac{2L}{\pi},
\qquad
\frac{d\Pi}{da} = 0 \;\Rightarrow\; a = \frac{4wL^4}{\pi^5 EI} = 0.013071\,\frac{wL^4}{EI}.
$$
精确值：$5/384 = 0.013021$。数值上$wL^4/(EI) = 10^4 \times 625/10^7 = 0.625\,\mathrm{m}$，所以
$$
v_\text{Ritz} = 0.013071 \times 0.625 = 8.17\,\mathrm{mm}, \qquad v_\text{exact} = 8.14\,\mathrm{mm},
$$
误差为$+0.39\,\%$。由试函数得到的弯矩大小为$M = EI\,v''$，跨中为$EI\,a\,\pi^2/L^2 = 4wL^2/\pi^3 = 0.1290\,wL^2 = 32.3\,\mathrm{kN\,m}$，而精确值为$wL^2/8 = 31.25\,\mathrm{kN\,m}$，误差为$+3.2\,\%$。

**合理性检查。** 既然定理说里茨解偏刚，为什么这里的挠度反而略微**高**估了？定理保证的是能量：$\Pi_\text{Ritz} \ge \Pi_\text{exact}$，对分布载荷而言，这意味着**按载荷加权的平均**挠度$\int wv\,dx$偏小，而不是每一点的挠度都偏小。误差的规律具有普遍性：位移精确，弯矩（二阶导数）差一些，剪力（三阶导数）最差。实际上，正弦函数正是精确傅里叶级数$v = \sum_{n\ \text{odd}} 4wL^4\sin(n\pi x/L)/(n^5\pi^5EI)$的第一项，其后各项按$1/n^5$衰减。
:::
:::

::: widget plot
f: x*(1-x)/2; sum(4/((2k-1)^3*pi^3)*sin((2k-1)*pi*x), k, 1, N); 0.5 - x; sum(4/((2k-1)^2*pi^2)*cos((2k-1)*pi*x), k, 1, N)
x: 0, 1
y: -0.6, 0.6
sliders: N=1:1:8:1
labels: M/wL^2\ \text{精确}; M/wL^2\ \text{里茨}; V/wL\ \text{精确}; V/wL\ \text{里茨}
caption: 均布载荷简支梁取$N$个正弦项的瑞利-里茨解，以$x/L$为横轴：弯矩（第一对曲线）和剪力（第二对曲线），各自与精确分布对照。$N = 1$时弯矩误差已在约3 %以内，但剪力只是一条很差的余弦曲线。增大$N$：弯矩几乎立即收敛，而剪力在$N = 8$时仍在振荡，且在支座处收敛最慢。里茨解每求一次导数就损失一些精度——这就是为什么有限元应力在剪力和应力梯度大的地方最不可靠。
:::

::: example 悬臂梁的多项式试函数 {#ex-ritz-cantilever}
长度为$L$的悬臂梁在$x = 0$处固定，在$x = L$处受端部载荷$P$。分别用(a) $v = a x^2$和(b) $v = a x^2 + b x^3$求端部挠度的里茨近似。
::: solution
两个试函数都满足运动学条件$v(0) = 0$、$v'(0) = 0$。自由端条件（弯矩和剪力为零）是力的条件，不予强加。

(a) $v'' = 2a$，所以$U = \tfrac12 EI\int_0^L 4a^2\,dx = 2EIa^2L$，载荷势能为$-P\,v(L) = -PaL^2$。于是$d\Pi/da = 4EIaL - PL^2 = 0$，$a = PL/(4EI)$，端部挠度为$aL^2 = PL^3/(4EI)$：是精确值$PL^3/(3EI)$的75 %，正如定理所预言的那样偏刚。该试函数曲率为常数，相当于弯矩均匀分布，而真实弯矩是线性下降到端部为零的。

(b) $v'' = 2a + 6bx$：
$$
\Pi = \frac{EI}{2}\bigl(4a^2L + 12abL^2 + 12b^2L^3\bigr) - P\bigl(aL^2 + bL^3\bigr).
$$
$\partial\Pi/\partial a = 0$：$4aL + 6bL^2 = PL^2/EI$；$\partial\Pi/\partial b = 0$：$6aL^2 + 12bL^3 = PL^3/EI$。分别除以$L$和$L^2$：$4a + 6bL = PL/EI$与$6a + 12bL = PL/EI$。第一式乘2减去第二式得$2a = PL/EI$，所以$a = PL/(2EI)$，$b = -P/(6EI)$。于是
$$
v = \frac{PLx^2}{2EI} - \frac{Px^3}{6EI}, \qquad v(L) = \frac{PL^3}{3EI},
$$
这就是**精确**解。**合理性检查：** 端部受载悬臂梁的精确挠曲线是三次多项式，所以包含所有满足运动学条件的三次多项式的试函数空间必然包含它，而最小势能原理就把它挑了出来。只要试函数能够表示真实解，里茨解就是精确的。
:::
:::

::: remark 剪切能与"固定"的含义
在悬臂梁中加上[[#eq-member-energy]]的剪切项（$f_s = 6/5$），端部挠度增加$6PL/(5GA)$。[[solid-mechanics/linear-elasticity]]中的精确二维解在墙处横截面于形心处保持竖直的条件下给出$3PL/(2GA)$。两者的差别并不是哪一个有错：实际的固定端两者都不是，剪切修正取决于支座如何约束截面的翘曲。对一般比例的梁，两者都只有百分之几；对深梁则必须对支座细节建模。
:::

::: quiz
用瑞利-里茨法分析一根线弹性悬臂梁，采用满足$v(0) = v'(0) = 0$的单项多项式。在端部载荷$P$作用下，关于近似解的哪些说法是有保证的？
- [x] 它的总势能大于或等于精确的最小值。
- [x] 它的端部挠度小于或等于精确的端部挠度。
- [ ] 它的根部弯矩小于或等于精确的根部弯矩。
- [ ] 增加项数可能使端部挠度的估计变差。
::: solution
最小势能原理保证$\Pi_\text{Ritz} \ge \Pi_\text{exact}$。对单个集中载荷，驻值为$\Pi = -\tfrac12 P\Delta$（里茨解的驻值性意味着在试函数空间内克拉珀龙关系成立），所以$\Pi$越高意味着$\Delta$越小：端部挠度以里茨值为下界。关于弯矩则没有任何保证：单项$ax^2$的估计给出均匀弯矩$PL/2$，它**低于**精确的根部弯矩$PL$，却**高于**精确的端部弯矩零。增加项数扩大了试函数空间，所以$\Pi$的最小值不会升高，$\Delta$也不会减小。
:::
:::

::: history
结构分析中的能量法源于十九世纪对弹性框架的研究。伯努瓦·克拉珀龙（Benoît Clapeyron）关于功与应变能相等的定理由加布里埃尔·拉梅（Gabriel Lamé）发表在他的《固体弹性数学理论讲义》（*Leçons sur la théorie mathématique de l'élasticité des corps solides*，1852）中。詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）于1864年在《哲学杂志》（*Philosophical Magazine*）上的论文《论框架平衡与刚度的计算》（"On the calculation of the equilibrium and stiffness of frames"）中提出了框架的互等定理，恩里科·贝蒂（Enrico Betti）于1872年把它推广到弹性体。路易吉·费德里科·梅纳布雷亚（Luigi Federico Menabrea）于1858年宣布了超静定框架的最小功原理；他的证明并不完整，年轻的铁路工程师阿尔贝托·卡斯蒂利亚诺（Alberto Castigliano）在1873年的都灵毕业论文以及1879年的著作《弹性系统平衡理论及其应用》（*Théorie de l'équilibre des systèmes élastiques et ses applications*）中为它奠定了坚实的基础，后者还包含以他的名字命名的定理。瑞利勋爵（Lord Rayleigh）在《声学理论》（*The Theory of Sound*，1877）中用假设模态估计振动频率，瓦尔特·里茨（Walther Ritz）于1909年在《纯粹与应用数学杂志》（*Journal für die reine und angewandte Mathematik*）上的论文中把这一思想发展成系统的近似方法。理查德·库朗（Richard Courant）1943年关于变分方法的论文在三角形上使用了分片线性试函数，而工程师所熟知的有限元法则出现在1956年特纳（M. J. Turner）、克拉夫（R. W. Clough）、马丁（H. C. Martin）和托普（L. J. Topp）关于飞机结构刚度的论文中。
:::

## 后续内容

虚功原理是[[finite-element-method/weak-forms]]的出发点，而采用分片试函数的瑞利-里茨算法就是[[finite-element-method/direct-stiffness]]。在本课程中，最小势能原理给出[[solid-mechanics/plates]]中板的屈曲载荷（当$\Pi$的二阶变分可能为零时结构失稳）；扩展裂纹的能量平衡是[[solid-mechanics/fracture-mechanics]]的基础；而[[solid-mechanics/plasticity]]中极限分析的上限定理和下限定理是虚功原理在塑性中的对应。在动力学中，瑞利商用与这里相同的试函数来估计固有频率。

::: summary
- 线性材料的应变能密度为$\tfrac12\sigma_{ij}\varepsilon_{ij}$；细长构件的$U = \int N^2/(2EA) + \int M^2/(2EI) + \int T^2/(2GJ)\,(+\int f_sV^2/(2GA))$。
- 克拉珀龙定理：$U = \tfrac12\sum P_i\Delta_i$。贝蒂-麦克斯韦定理：交叉功互等，柔度矩阵（和刚度矩阵）对称。
- 卡氏定理：对线性结构$\Delta_k = \partial U/\partial P_k$；在没有载荷作用处求位移要加虚加载荷；$\partial U/\partial R = 0$给出刚性支座处的多余约束力（最小功）。
- 虚功原理对任何材料、任何平衡应力场与任何协调位移场的组合都成立。取单位虚载荷，就得到单位载荷法$\Delta = \sum\int mM/(EI)\,dx + \dots$，它还能处理热应变和沉降。
- 最小势能原理：在容许位移场中，精确解使$\Pi = U - (\text{载荷的功势})$最小；多出的部分是误差场的应变能。
- 瑞利-里茨法：满足运动学条件的试函数把$\Pi$变成二次型；$\mathbf{K}\mathbf{a} = \mathbf{F}$给出系数。结果在能量意义上偏刚；位移收敛最快，弯矩和剪力较慢。采用局部多项式试函数，它就是有限元法。
:::

## 习题

::: exercise 杆中的能量 {level=1 check="100"}
长$2\,\mathrm{m}$、截面积$500\,\mathrm{mm^2}$的钢拉杆（$E = 200\,\mathrm{GPa}$）承受$100\,\mathrm{kN}$的轴力。它储存了多少应变能？（以J为单位输入能量。）
::: solution
$U = P^2L/(2EA) = (10^5)^2 \times 2/(2 \times 2\times10^{11} \times 5\times10^{-4}) = 2\times10^{10}/(2\times10^{8}) = 100\,\mathrm{J}$。用克拉珀龙定理校核：伸长$\Delta = PL/(EA) = 2\,\mathrm{mm}$，$\tfrac12 P\Delta = \tfrac12 \times 10^5 \times 0.002 = 100\,\mathrm{J}$ ✓。
:::
:::

::: exercise 试验中的互等性 {level=1 check="3.2"}
在桥梁主梁的载荷试验中，作用于A点的$5\,\mathrm{kN}$载荷使B点产生$2.0\,\mathrm{mm}$的挠度。若主梁是线弹性的，作用于B点的$8\,\mathrm{kN}$载荷会使A点产生多大挠度？（以mm为单位输入挠度。）
::: solution
由麦克斯韦定理$f_{BA} = f_{AB} = 2.0/5 = 0.4\,\mathrm{mm/kN}$，所以A点的挠度为$0.4 \times 8 = 3.2\,\mathrm{mm}$。不需要关于主梁形状、截面或支承的任何信息。
:::
:::

::: exercise 用卡氏定理求悬臂梁挠度 {level=1 check="20"}
用卡氏定理求长$2\,\mathrm{m}$、$EI = 4\times10^{5}\,\mathrm{N\,m^2}$的悬臂梁在$3\,\mathrm{kN}$端部载荷作用下的端部挠度。（以mm为单位输入挠度。）
::: solution
$x$从端部量起，$M = -Px$，$\partial M/\partial P = -x$，所以$\Delta = \int_0^L Px^2/(EI)\,dx = PL^3/(3EI) = 3000 \times 8/(3 \times 4\times10^{5}) = 0.020\,\mathrm{m} = 20\,\mathrm{mm}$。
:::
:::

::: exercise 用单位载荷法求端部转角 {level=2 check="8"}
跨度$L = 4\,\mathrm{m}$、$EI = 2\times10^{6}\,\mathrm{N\,m^2}$的简支梁跨中受集中载荷$P = 16\,\mathrm{kN}$。用单位载荷法（在左支座处加单位力偶）求该处的转角。（以毫弧度为单位输入转角。）
::: solution
实际弯矩：$0 \le x \le L/2$时$M = Px/2$，关于跨中对称。在简支梁左端$x = 0$处施加单位顺时针力偶，产生反力$1/L$（左端向下，右端向上），沿跨度的弯矩为$m = 1 - x/L$（下凸为正）。于是
$$
\theta = \int_0^{L/2}\frac{(1 - x/L)(Px/2)}{EI}\,dx + \int_{L/2}^{L}\frac{(1 - x/L)\,P(L - x)/2}{EI}\,dx = \frac{P}{2EI}\Bigl(\frac{L^2}{12} + \frac{L^2}{24}\Bigr) = \frac{PL^2}{16EI}.
$$
（第一个积分为$\tfrac{P}{2EI}[\tfrac{L^2}{8} - \tfrac{L^2}{24}] = \tfrac{P}{2EI}\cdot\tfrac{L^2}{12}$；第二个积分令$u = L - x$，为$\tfrac{P}{2EI}\int_0^{L/2}\tfrac{u^2}{L}\,du = \tfrac{P}{2EI}\cdot\tfrac{L^2}{24}$。）数值上$\theta = 16\,000 \times 16/(16 \times 2\times10^{6}) = 0.008\,\mathrm{rad} = 8\,\mathrm{mrad}$，与标准表值一致。
:::
:::

::: exercise 受集中载荷的一端固定一端铰支梁 {level=2 check="10"}
跨度为$L$的梁右端固定，左端支于滚动支座。跨中作用载荷$P = 32\,\mathrm{kN}$。用最小功原理求支座反力。（以kN为单位输入反力。）
::: solution
$x$从支座量起，$R$为多余约束力：$x < L/2$时$M = Rx$，$x > L/2$时$M = Rx - P(x - L/2)$，$\partial M/\partial R = x$。令$\partial U/\partial R = 0$：
$$
R\frac{L^3}{3} - P\int_{L/2}^{L}\Bigl(x - \frac L2\Bigr)x\,dx = R\frac{L^3}{3} - P\cdot\frac{5L^3}{48} = 0 \;\Rightarrow\; R = \frac{5P}{16}.
$$
（积分为：$[x^3/3 - Lx^2/4]_{L/2}^{L} = (L^3/3 - L^3/4) - (L^3/24 - L^3/16) = L^3/12 + L^3/48 = 5L^3/48$。）所以$R = 5 \times 32/16 = 10\,\mathrm{kN}$，与$L$和$EI$无关。
:::
:::

::: exercise 对称双杆桁架 {level=2 check="0.4"}
载荷$P = 10\,\mathrm{kN}$悬挂在两根相同杆件的节点上，每根杆长$2\,\mathrm{m}$，$EA = 1.0\times10^{8}\,\mathrm{N}$，铰接于天花板，各自与竖直方向成$60°$。求节点的竖直位移。（以mm为单位输入位移。）
::: solution
由对称性，每根杆的拉力为$F = P/(2\cos60°) = P$，所以$\partial F/\partial P = 1/(2\cos60°) = 1$。于是$\delta = 2 \times F(\partial F/\partial P)L/(EA) = PL/(2EA\cos^2 60°) = 2PL/(EA) = 2 \times 10^4 \times 2/10^8 = 4\times10^{-4}\,\mathrm{m} = 0.4\,\mathrm{mm}$。注意因子$1/\cos^2\theta$：坡度平缓的杆件既应力高又非常柔，因为每根杆的伸长被几何关系放大成更大的竖直位移。
:::
:::

::: exercise 均布载荷悬臂梁的里茨解 {level=2 check="2/3"}
长度为$L$的悬臂梁在$x = 0$处固定，承受均布载荷$w$。用单个试函数$v = ax^2$求端部挠度的里茨估计，并给出它与精确值$wL^4/(8EI)$之比。（以分数形式输入比值。）
::: solution
$U = \tfrac12 EI\int_0^L(2a)^2\,dx = 2EIa^2L$；载荷势能$-\int_0^L wax^2\,dx = -waL^3/3$。于是$d\Pi/da = 4EIaL - wL^3/3 = 0$，$a = wL^2/(12EI)$，$v(L) = wL^4/(12EI)$。比值$= 8/12 = 2/3$。正如预期的那样偏刚：常曲率无法跟随从根部$wL^2/2$降到端部零的弯矩。
:::
:::

::: exercise 跨中集中载荷的里茨解 {level=3 check="2/pi^4"}
用单项试函数$v = a\sin(\pi x/L)$估计跨中受集中载荷$P$的简支梁的跨中挠度。把结果写成$c\,PL^3/(EI)$，并把$c$与精确值$1/48$比较。（以精确表达式输入$c$。）
::: solution
$U = \tfrac{EI}{2}a^2(\pi/L)^4(L/2) = \pi^4EIa^2/(4L^3)$，载荷势能为$-P\,v(L/2) = -Pa$。于是$d\Pi/da = \pi^4EIa/(2L^3) - P = 0$，所以$a = 2PL^3/(\pi^4EI)$，$c = 2/\pi^4 = 0.020532$，而$1/48 = 0.020833$：偏低$1.4\,\%$，对单个集中载荷这正是有保证的方向。误差比分布载荷时（$0.4\,\%$）大，因为真实挠曲线的三阶导数在载荷下方有一个折点，光滑的正弦函数无法再现。
:::
:::

::: exercise 径向受压的圆环 {level=3 check="pi/4 - 2/pi" #ex-ring}
半径为$R$、弯曲刚度为$EI$的薄圆环沿一条直径受一对大小相等、方向相反的力$P$挤压。(a) 利用对称性和最小功原理，求与载荷成$90°$的截面上的弯矩$M_0$。(b) 用卡氏定理证明受载直径的缩短量为$\delta = (\pi/4 - 2/\pi)\,PR^3/(EI)$。只考虑弯曲。（输入$PR^3/(EI)$的系数。）
::: solution
(a) 沿垂直于载荷的直径截开圆环，取四分之一环，从侧面截面（$\theta = 0$）到加载点（$\theta = \pi/2$），$\theta$从侧面量起。由对称性，侧面截面上没有剪力；轴力为$P/2$（压），弯矩$M_0$未知——圆环是内部超静定的。把四分之一环上的力对角度$\theta$处的点取矩，$M(\theta) = M_0 - \tfrac{P}{2}R(1 - \cos\theta)$。对称性还要求侧面截面不转动，所以$\partial U/\partial M_0 = \int_0^{\pi/2} M\,R\,d\theta/(EI) = 0$：
$$
M_0\frac{\pi}{2} - \frac{PR}{2}\Bigl(\frac{\pi}{2} - 1\Bigr) = 0 \;\Rightarrow\; M_0 = \frac{PR}{2}\Bigl(1 - \frac{2}{\pi}\Bigr) = 0.182\,PR,
$$
而在加载点$M(\pi/2) = M_0 - PR/2 = -PR/\pi = -0.318\,PR$，这是环中的最大弯矩。

(b) 这对载荷$P$在两加载点的相对靠近量上做功，所以$\partial U/\partial P = \delta$（参见关于捆绑载荷的警告）。整个圆环由四个四分之一环组成，$U = 4\int_0^{\pi/2} M^2R\,d\theta/(2EI)$，又因为$M$与$P$成正比，$\partial U/\partial P = 2U/P$：
$$
\delta = \frac{4R}{EIP}\int_0^{\pi/2}M^2\,d\theta.
$$
写成$M = \tfrac{PR}{2}(\cos\theta - \tfrac{2}{\pi})$。则$\int_0^{\pi/2}(\cos\theta - 2/\pi)^2\,d\theta = \pi/4 - (4/\pi)(1) + (4/\pi^2)(\pi/2) = \pi/4 - 2/\pi$，于是
$$
\delta = \frac{4R}{EIP}\cdot\frac{P^2R^2}{4}\Bigl(\frac{\pi}{4} - \frac{2}{\pi}\Bigr) = \Bigl(\frac{\pi}{4} - \frac{2}{\pi}\Bigr)\frac{PR^3}{EI} = 0.149\,\frac{PR^3}{EI}.
$$
系数很小，是因为环中的弯矩会变号而部分抵消；用一对水平虚加载荷做同样的计算，可得另一条直径的增量为$(2/\pi - 1/2)PR^3/(EI) = 0.137\,PR^3/(EI)$。
:::
:::

::: exercise 设计：C形机架的刚度 {level=3}
一台小型液压机有一个C形钢机架：两根长$a = 0.30\,\mathrm{m}$的水平臂由一根长$h = 0.40\,\mathrm{m}$的竖直背梁连接，截面全部相同。压力$P = 20\,\mathrm{kN}$把两臂的端部向外推开。(a) 用单位载荷法证明，只考虑弯曲时钳口的张开量为$\delta = \dfrac{P}{EI}\Bigl(\dfrac{2a^3}{3} + a^2h\Bigr)$。(b) 选择宽$60\,\mathrm{mm}$的实心矩形截面，使$\delta \le 0.10\,\mathrm{mm}$（$E = 200\,\mathrm{GPa}$），并校核弯曲应力。(c) 讨论该设计忽略了什么。
::: solution
(a) 分离体：在臂上距钳口端$x$处，弯矩为$Px$；在背梁中，力臂始终是臂长，$M = Pa$。在钳口端施加一对单位载荷，得$m = M/P$。因此
$$
\delta = 2\int_0^a\frac{Px^2}{EI}\,dx + \int_0^h\frac{Pa^2}{EI}\,dx = \frac{P}{EI}\Bigl(\frac{2a^3}{3} + a^2h\Bigr).
$$
(b) $\tfrac23 a^3 + a^2h = 0.018 + 0.036 = 0.054\,\mathrm{m^3}$。于是$I \ge P \times 0.054/(E\,\delta_\text{max}) = 20\,000 \times 0.054/(2\times10^{11} \times 10^{-4}) = 5.4\times10^{-5}\,\mathrm{m^4}$。宽度为$60\,\mathrm{mm}$时，由$I = bd^3/12$得$d^3 \ge 12 \times 5.4\times10^{-5}/0.06 = 0.0108\,\mathrm{m^3}$，所以$d \ge 0.221\,\mathrm{m}$；取$d = 225\,\mathrm{mm}$（$I = 5.70\times10^{-5}\,\mathrm{m^4}$，$\delta = 0.095\,\mathrm{mm}$）。最大弯矩$Pa = 6\,\mathrm{kN\,m}$出现在背梁和臂根部，$\sigma = M(d/2)/I = 6000 \times 0.1125/5.70\times10^{-5} = 11.8\,\mathrm{MPa}$。起控制作用的是刚度而不是强度：应力只是屈服强度的一小部分——这是按变形确定尺寸的机架的典型情况。
(c) 背梁贡献了张开量的三分之二，因此仅加高背梁会比采用等截面更有效，而空心截面或工字形截面在相同$I$下可以节省质量。臂长只有截面高度的$1.3$–$1.8$倍，剪切变形和拐角处的柔性（梁理论把它当作刚性的）都很显著；有限元模型或试验可以改进这一估计。内侧拐角处应力集中，要防止疲劳，需要较大的过渡圆角。与本图谱中的每个例子一样，实际的压力机机架须按相关的机械安全标准设计，并由具备资质的工程师校核。
:::
:::
