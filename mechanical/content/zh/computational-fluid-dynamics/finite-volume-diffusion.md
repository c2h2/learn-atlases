工业界使用的几乎所有通用 CFD 程序——包括开源的 OpenFOAM，以及建立在帕坦卡（Patankar）和斯波尔丁（Spalding）方法之上的商用程序——都是**有限体积**程序。其思想就是[[computational-fluid-dynamics/governing-equations]]开头所述的那样：把计算域划分为单元，对每个单元精确地写出积分平衡式[[computational-fluid-dynamics/governing-equations#eq-integral]]，只对通过各个面的**通量**和内部的**源项**进行近似。由于从一个单元经某个面流出的通量，按构造就是流入其相邻单元的通量，离散方程无论网格多粗，都能逐个单元地、并在整个计算域上精确守恒热量、质量和动量。正是这一性质——而不是形式上的精度——使工程师信任这种方法。

本课针对最简单的输运过程——**扩散**——发展有限体积法，并以定常和非稳态导热作为贯穿始终的应用（物理背景见[[heat-transfer/steady-conduction]]和[[heat-transfer/transient-conduction]]）。对流将在[[computational-fluid-dynamics/convection-diffusion]]中加入，所得线性方程组的求解则是[[computational-fluid-dynamics/linear-solvers]]的主题。所用记号——节点$P$、$W$、$E$、$N$、$S$，面$w$、$e$、$n$、$s$，以及系数$a$——沿用帕坦卡以及 Versteeg 和 Malalasekera 的写法，大多数 CFD 文献都遵循这一记号。

## 控制体网格

设想把一根杆、一面墙或一块板切分成若干**控制体**（单元）。每个单元在其中心有一个**节点**$P$，未知量$\phi_P$存储在该处；它的西侧和东侧邻点为$W$和$E$，与它们共享的面为$w$和$e$。节点之间的距离为$\delta x_{WP}$和$\delta x_{PE}$，单元宽度为$\Delta x$。在这种**单元中心**布置中，计算域边界与单元面重合，第一个节点位于边界内侧半个单元处。（另一种**顶点中心**布置把节点放在边界上；两种布置都有人使用，公式只在边界处不同。）

全课的控制方程是带源项的定常扩散方程
$$
\nabla\cdot(\Gamma\nabla\phi) + S = 0,
$$ {#eq-diffusion}
对于导热问题，它就是$\nabla\cdot(k\nabla T) + \dot q = 0$，其中$\phi = T$，$\Gamma = k$（单位为$\mathrm{W\,m^{-1}\,K^{-1}}$），$S = \dot q$（单位为$\mathrm{W/m^3}$）。

## 一维定常扩散

::: proposition 离散扩散方程 {#prop-fv-1d}
在面积为$A$、体积为$\Delta V = A\,\Delta x$的控制体上积分$\dfrac{\mathrm{d}}{\mathrm{d}x}\left(\Gamma\,\dfrac{\mathrm{d}\phi}{\mathrm{d}x}\right) + S = 0$。用节点间的中心差分近似面上的梯度，并把源项近似为$\phi_P$的线性函数$\bar S\,\Delta V = S_u + S_P\phi_P$，得
$$
a_P\,\phi_P = a_W\,\phi_W + a_E\,\phi_E + S_u,
$$ {#eq-fv-1d}
$$
a_W = \frac{\Gamma_w A_w}{\delta x_{WP}},\qquad a_E = \frac{\Gamma_e A_e}{\delta x_{PE}},\qquad a_P = a_W + a_E - S_P .
$$ {#eq-fv-coeffs}
:::

::: proof
在单元上积分，散度定理（这里就是微积分基本定理）把扩散项的体积分化为面通量之差：
$$
\left(\Gamma A\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)_e - \left(\Gamma A\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)_w + \int_{\Delta V} S\,\mathrm{d}V = 0 .
$$
这是精确的。近似有两处。(i) 假设$\phi$在相邻节点之间线性变化，于是面上的梯度为$(\mathrm{d}\phi/\mathrm{d}x)_e \approx (\phi_E - \phi_P)/\delta x_{PE}$和$(\mathrm{d}\phi/\mathrm{d}x)_w \approx (\phi_P - \phi_W)/\delta x_{WP}$。(ii) 把单元平均源项写成$S_u + S_P\phi_P$。代入得
$$
\Gamma_e A_e\frac{\phi_E - \phi_P}{\delta x_{PE}} - \Gamma_w A_w\frac{\phi_P - \phi_W}{\delta x_{WP}} + S_u + S_P\phi_P = 0,
$$
把含$\phi_P$的项合并到左边，即得系数为[[#eq-fv-coeffs]]的[[#eq-fv-1d]]。在$\Gamma$为常数、无源项的均匀网格上，它就是[[computational-fluid-dynamics/finite-differences#eq-basic-fd]]中二阶导数中心差分的$\Gamma A/\Delta x$倍；两种方法的区别在于推导方式、对变物性和边界的处理以及守恒性质，而不在于内部节点的公式。
:::

每个系数都是一个**热导**：$a_E$是节点$E$与$P$之间每开尔文温差所对应的由$E$流向$P$的热流量$\Gamma_e A_e/\delta x_{PE}$，与[[heat-transfer/steady-conduction]]中的热阻网络完全一样。于是方程[[#eq-fv-1d]]表明，$\phi_P$是其邻点的加权平均再加上源项的贡献——这是“扩散方程在没有源项时内部不存在极大值”这一事实的离散版本。

### 边界

在给定$\phi_B$的边界面上（**第一类（狄利克雷）**条件），通过该面的通量在从边界到第一个节点的半个单元（距离$\Delta x/2$）上近似：
$$
\text{西边界流入的通量} = \Gamma_B A\,\frac{\phi_P - \phi_B}{\Delta x/2}\ \text{（以梯度形式）}\quad\Longrightarrow\quad
a_W = 0,\quad S_P \mathrel{-}= \frac{2\Gamma_B A}{\Delta x},\quad S_u \mathrel{+}= \frac{2\Gamma_B A}{\Delta x}\phi_B .
$$
边界连接被切断（$a_W = 0$），其作用被移入源项。在给定进入计算域的通量$q_B$之处（**第二类（诺伊曼）**条件），$a_W = 0$且$S_u \mathrel{+}= q_B A$；绝热边界只需$a_W = 0$，别无其他。**对流**（第三类，罗宾）条件，即以表面传热系数$h$向温度为$T_\infty$的流体传热，把对流热阻$1/(hA)$与半单元导热热阻$\Delta x/(2kA)$串联：
$$
S_P \mathrel{-}= U A,\qquad S_u \mathrel{+}= U A\,T_\infty,\qquad U = \left(\frac{1}{h} + \frac{\Delta x}{2k}\right)^{-1}.
$$ {#eq-robin}

::: example 两端温度固定的杆中的导热 {#ex-rod}
一根长$0.50\ \mathrm{m}$、横截面积$A = 0.010\ \mathrm{m^2}$、导热系数$k = 1000\ \mathrm{W\,m^{-1}\,K^{-1}}$且侧面绝热的杆，两端分别保持在$T_A = 100\,^\circ\mathrm{C}$和$T_B = 500\,^\circ\mathrm{C}$。用五个相等的控制体建立并求解离散方程，并求热流量。
::: solution
$\Delta x = 0.10\ \mathrm{m}$，因此每个内部热导为$kA/\Delta x = 1000 \times 0.010/0.10 = 100\ \mathrm{W/K}$，边界半单元热导为$2kA/\Delta x = 200\ \mathrm{W/K}$。各系数为：

| 节点 | $a_W$ | $a_E$ | $S_P$ | $S_u$ | $a_P$ |
|---|---|---|---|---|---|
| 1 | 0 | 100 | $-200$ | $200 \times 100 = 20\,000$ | 300 |
| 2, 3, 4 | 100 | 100 | 0 | 0 | 200 |
| 5 | 100 | 0 | $-200$ | $200 \times 500 = 100\,000$ | 300 |

三对角方程组$300T_1 - 100T_2 = 20\,000$，$-100T_{i-1} + 200T_i - 100T_{i+1} = 0$，$-100T_4 + 300T_5 = 100\,000$的解为
$$
T = (140,\ 220,\ 300,\ 380,\ 460)\ ^\circ\mathrm{C}
$$
对应$x = 0.05, 0.15, \dots, 0.45\ \mathrm{m}$——恰好是线性分布$T = 100 + 800x$。通过每个面的热流量都相同，例如节点 1 与 2 之间为$100 \times (220 - 140) = 8000\ \mathrm{W}$，通过左边界为$200 \times (140 - 100) = 8000\ \mathrm{W}$，与$kA\,\Delta T/L = 1000 \times 0.010 \times 400/0.50 = 8000\ \mathrm{W}$一致。合理性检查：无源项时精确分布是线性的，线性插值假设恰好能复现它，而且逐个面都精确守恒。
:::
:::

::: example 有内热源的平壁 {#ex-generation}
一块厚$L = 20\ \mathrm{mm}$、导热系数$k = 0.50\ \mathrm{W\,m^{-1}\,K^{-1}}$的平壁以$\dot q = 1.0\times10^{6}\ \mathrm{W/m^3}$均匀生热；两表面分别保持在$T_A = 100\,^\circ\mathrm{C}$和$T_B = 200\,^\circ\mathrm{C}$。用五个控制体（按单位面积计）求解，并与精确解$T(x) = T_A + \left[\dfrac{T_B - T_A}{L} + \dfrac{\dot q}{2k}(L - x)\right]x$比较。
::: solution
$\Delta x = 4.0\ \mathrm{mm}$，$k/\Delta x = 125\ \mathrm{W\,m^{-2}\,K^{-1}}$，边界热导$2k/\Delta x = 250$，每个单元中的源项为$S_u = \dot q\,\Delta x = 4000\ \mathrm{W/m^2}$。节点 1：$a_P = 125 + 250 = 375$，$S_u = 4000 + 250 \times 100 = 29\,000$；节点 2–4：$a_P = 250$，$S_u = 4000$；节点 5：$a_P = 375$，$S_u = 4000 + 250 \times 200 = 54\,000$。解及节点处的精确值为：

| $x$ / mm | 2 | 6 | 10 | 14 | 18 |
|---|---|---|---|---|---|
| 有限体积 $T$ / °C | 150 | 218 | 254 | 258 | 230 |
| 精确 $T$ / °C | 146 | 214 | 250 | 254 | 226 |

每个节点都恰好高出$4\,^\circ\mathrm{C}$。内部方程对抛物线是精确的（二次函数的二阶中心差分没有误差）；误差完全来自两个边界半单元，在那里假设温度分布在距离$\Delta x/2$上是线性的，而实际上是抛物线形的。误差的大小就是抛物线在半个单元上的下垂量$\dot q(\Delta x/2)^2/(2k) = 10^6 \times (2\times10^{-3})^2/1.0 = 4\ ^\circ\mathrm{C}$，它按$\Delta x^2$减小：用十个单元时误差为$1\ ^\circ\mathrm{C}$。合理性检查：对有限体积解作能量平衡——总生热量$\dot q L = 20\,000\ \mathrm{W/m^2}$必须经两个表面流出：$250(150 - 100) + 250(230 - 200) = 12\,500 + 7500 = 20\,000\ \mathrm{W/m^2}$。精确守恒，尽管温度略有偏差。
:::
:::

上例的最后一句话就是有限体积法的精髓：离散解可能不精确，但它不会丢失或凭空产生热量。

### 复合材料中的界面导热系数

当$\Gamma$在单元之间变化时——复合壁、固液界面、带保温层的管道——[[#eq-fv-coeffs]]中的面值$\Gamma_e$必须谨慎选取。最直观的选择，即算术平均$\tfrac12(\Gamma_P + \Gamma_E)$，是错误的。

::: proposition 调和平均界面导热系数 {#prop-harmonic}
设面$e$距$P$为$\delta x_{e^-}$，距$E$为$\delta x_{e^+}$，两侧的导热系数分别为均匀的$\Gamma_P$和$\Gamma_E$。对于无源项的分段线性分布，能给出精确定常通量的面值为
$$
\frac{\delta x_{PE}}{\Gamma_e} = \frac{\delta x_{e^-}}{\Gamma_P} + \frac{\delta x_{e^+}}{\Gamma_E},
\qquad\text{因此当面位于中点时}\qquad \Gamma_e = \frac{2\Gamma_P\Gamma_E}{\Gamma_P + \Gamma_E}.
$$ {#eq-harmonic}
:::

::: proof
在无源项的一维定常扩散中，面两侧的通量$q_e$相同。在$P$侧，$q_e = \Gamma_P(\phi_P - \phi_e)/\delta x_{e^-}$；在$E$侧，$q_e = \Gamma_E(\phi_e - \phi_E)/\delta x_{e^+}$。分别解出温差并相加，消去未知的面值：
$$
\phi_P - \phi_E = q_e\left(\frac{\delta x_{e^-}}{\Gamma_P} + \frac{\delta x_{e^+}}{\Gamma_E}\right).
$$
由$q_e = \Gamma_e(\phi_P - \phi_E)/\delta x_{PE}$定义$\Gamma_e$，即得[[#eq-harmonic]]。这就是串联热阻定律：相加的是热阻，而不是导热系数。
:::

调和平均具有正确的极限。若一种材料是理想绝热体（$\Gamma_E \to 0$），则$\Gamma_e \to 0$，没有热量通过，理应如此；而算术平均会给出$\tfrac12\Gamma_P$，让热量穿过保温层。若$\Gamma_E \to \infty$，则$\Gamma_e \to 2\Gamma_P$：全部热阻都在$P$侧的半个单元中，其长度为$\delta x_{PE}$的一半。

::: example 钢与保温材料 {#ex-composite}
两个相邻单元的节点相距$10\ \mathrm{mm}$，界面位于中点，单元中分别为钢（$k = 50\ \mathrm{W\,m^{-1}\,K^{-1}}$）和矿棉保温材料（$k = 0.050\ \mathrm{W\,m^{-1}\,K^{-1}}$）。节点温度为$200\,^\circ\mathrm{C}$和$100\,^\circ\mathrm{C}$。分别用调和平均和算术平均界面导热系数计算面上的热流密度，并求精确热流密度。
::: solution
调和平均：$k_e = 2 \times 50 \times 0.050/50.05 = 0.0999\ \mathrm{W\,m^{-1}\,K^{-1}}$，故$q = 0.0999 \times 100/0.010 = 999\ \mathrm{W/m^2}$。精确值（两种材料各$5\ \mathrm{mm}$的串联热阻）：$R = 0.005/50 + 0.005/0.050 = 1.0\times10^{-4} + 0.100 = 0.1001\ \mathrm{m^2K/W}$，$q = 100/0.1001 = 999\ \mathrm{W/m^2}$——完全相同，正如命题所保证的。算术平均：$k_e = 25.03\ \mathrm{W\,m^{-1}\,K^{-1}}$，$q = 2.50\times10^{5}\ \mathrm{W/m^2}$，大了$250$倍。合理性检查：几乎全部热阻都在保温层中，因此热流密度应接近$0.050 \times 100/0.005 = 1000\ \mathrm{W/m^2}$；只有调和平均做到了这一点。
:::
:::

::: widget plot
f: 2*x/(1 + x); (1 + x)/2
x: 0, 1
y: 0, 1.05
labels: \text{调和平均 } k_e/k_P; \text{算术平均 } k_e/k_P
caption: 对位于节点中点的面，界面导热系数$k_e$（以较大的导热系数$k_P$的分数表示）随导热系数比$k_E/k_P$的变化。两种材料相同时（$k_E/k_P = 1$）两种平均一致，随着差异增大而分离：比值为$0.01$时，调和平均为$0.02$，而算术平均仍为$0.505$，大了$25$倍。实际的差异（金属与聚合物、固体与气体）往往为$10^{-3}$或更小，此时只有调和平均可用。
:::

### 源项及其线性化

许多源项依赖于未知量：肋片表面的散热，单位体积为$-hP(T - T_\infty)/A$；辐射，$-\varepsilon\sigma(T^4 - T_\infty^4)$；反应速率。写成$\bar S\,\Delta V = S_u + S_P\phi_P$，可让与$\phi_P$成正比的部分并入对角系数$a_P = a_W + a_E - S_P$。符号很重要。

::: definition 帕坦卡基本法则 {#def-patankar-rules}
形如$a_P\phi_P = \sum_{nb} a_{nb}\phi_{nb} + S_u$的离散若满足以下条件，则在物理上是合理的，且具有鲁棒性：
1. **界面上的一致性：** 通过某个面的通量在共享该面的两个单元中由同一表达式给出（守恒）。
2. **正系数：** 所有$a_{nb} \ge 0$且$a_P > 0$，使得某个邻点值增大时不会使$\phi_P$减小。
3. **源项的负斜率线性化：** $S_P \le 0$，使得源项永远不会把$a_P$减小到$\sum a_{nb}$以下。
4. **邻点系数之和：** 无源项时$a_P = \sum a_{nb}$，使得$\phi$和$\phi + \text{常数}$都满足该方程，正如它们都满足微分方程一样。
:::

法则 3 既关乎物理，也同样关乎迭代：把一个随$\phi$增大的源项（正的$S_P$）放到对角线上，会使$a_P$小于$\sum a_{nb}$甚至为负，破坏[[computational-fluid-dynamics/linear-solvers]]中迭代求解器所依赖的对角占优性。确实随$\phi$增大的源项应保留在$S_u$中，用最新的迭代值计算。对于辐射这类非线性递减源项，在当前迭代值$\phi^\ast$处取切线是最佳选择：
$$
S(\phi) \approx S(\phi^\ast) + \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}(\phi_P - \phi^\ast)
\quad\Longrightarrow\quad
S_P = \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}\Delta V,\qquad S_u = \left(S^\ast - \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}\phi^\ast\right)\Delta V .
$$ {#eq-linearise}

::: example 源项线性化的散热肋片 {#ex-fin}
一根长$L = 1.0\ \mathrm{m}$（取得较长，以使数字简单）的针肋满足$\dfrac{\mathrm{d}^2T}{\mathrm{d}x^2} - n^2(T - T_\infty) = 0$，其中$n^2 = hP/(kA) = 25\ \mathrm{m^{-2}}$，$x = 0$处肋基温度$T_b = 100\,^\circ\mathrm{C}$，环境温度$T_\infty = 20\,^\circ\mathrm{C}$，肋端绝热。用五个控制体求解，并与精确解$\dfrac{T - T_\infty}{T_b - T_\infty} = \dfrac{\cosh n(L - x)}{\cosh nL}$比较。
::: solution
方程除以$kA$，于是“热导”为$1/\Delta x = 5\ \mathrm{m^{-1}}$，$\Delta x = 0.2\ \mathrm{m}$。每个单元的对流源项$-n^2(T_P - T_\infty)\Delta x$分解为$S_P = -n^2\Delta x = -5$和$S_u = n^2\Delta x\,T_\infty = 100$——斜率为负，符合法则 3 的要求。节点 1 还有肋基：$S_P \mathrel{-}= 2/\Delta x = 10$，$S_u \mathrel{+}= 10 \times 100 = 1000$。节点 5 处肋端绝热：$a_E = 0$。因此

| 节点 | $a_W$ | $a_E$ | $a_P$ | $S_u$ |
|---|---|---|---|---|
| 1 | 0 | 5 | 20 | 1100 |
| 2–4 | 5 | 5 | 15 | 100 |
| 5 | 5 | 0 | 10 | 100 |

求解得：

| $x$ / m | 0.1 | 0.3 | 0.5 | 0.7 | 0.9 |
|---|---|---|---|---|---|
| 有限体积 $T$ / °C | 64.23 | 36.91 | 26.50 | 22.60 | 21.30 |
| 精确 $T$ / °C | 68.53 | 37.87 | 26.61 | 22.54 | 21.22 |

有限体积的过余温度在第一个节点处偏低$9\,\%$，在最后一个节点处偏高$7\,\%$：对于每隔$1/n = 0.2\ \mathrm{m}$（即每个单元）就下降为$e^{-1}$倍的分布，五个单元太少了。由肋基进入肋片的热流量（按单位$kA$计）为$(2/\Delta x)(T_b - T_1) = 10 \times 35.77 = 357.7\ \mathrm{K/m}$，而精确值为$n(T_b - T_\infty)\tanh nL = 400.0\ \mathrm{K/m}$，偏低$11\,\%$。合理性检查：离散解的能量平衡精确成立——肋基热流量等于$\sum_i n^2\Delta x(T_i - T_\infty) = 5 \times 71.55 = 357.7$——加密到$20$个单元后，肋基热流量达到$396.9\ \mathrm{K/m}$，误差在$0.8\,\%$以内——误差大致按$\Delta x^2$下降（$10$个单元时为$3.0\,\%$，$20$个单元时为$0.77\,\%$）。
:::
:::

::: widget plot
f: 20 + 80*cosh(n*(1 - x))/cosh(n)
x: 0, 1
y: 0, 105
sliders: n=5:0.5:10:0.5
points: 0.1, 64.23; 0.3, 36.91; 0.5, 26.50; 0.7, 22.60; 0.9, 21.30
caption: 例题中肋片沿长度的精确温度分布（单位为 °C，横坐标$x$单位为 m），肋片参数$n = \sqrt{hP/kA}$由滑块设定；圆点是$n = 5\ \mathrm{m^{-1}}$时五个单元的有限体积解。在$n = 5$时，圆点在肋基附近落在曲线下方，那里曲率最大。增大$n$（对流更强、肋片更细），温度分布收缩为肋基附近的一个薄层——同样的网格将毫无用处。分辨率必须跟随长度尺度$1/n$，而不是物体的尺寸。
:::

::: algorithm 组装有限体积扩散模型 {#alg-fv-assembly}
1. **网格。** 把计算域划分为单元，在每个材料界面和边界上设置单元面；记录每个单元的体积、面面积和节点间距离。
2. **面热导。** 对每个内部面计算$a = \Gamma_fA_f/\delta$，其中$\Gamma_f$按串联热阻法则[[#eq-harmonic]]取值；只存储一次，供两个单元共用。
3. **源项。** 把每个单元的源项线性化为$S_u + S_P\phi_P$，且$S_P \le 0$；非线性源项用[[#eq-linearise]]处理。
4. **边界。** 切断每个边界连接，把其作用加入$S_u$和$S_P$：给定值边界用半单元热导$2\Gamma A/\Delta x$，第二类边界面用给定的通量，对流边界面用[[#eq-robin]]中的$UA$。
5. **组装**$a_P = \sum a_{nb} - S_P$（瞬态问题再加上$a_P^0$），并检查每个系数都为正。
6. **求解**线性方程组（[[computational-fluid-dynamics/linear-solvers]]）；若源项是非线性的，则更新线性化并重复，直到$\phi$的变化可以忽略。
7. **检查**全局平衡：总源项等于边界净流出量，误差在舍入误差范围内。
:::

## 二维与三维

在二维矩形网格上，对尺寸为$\Delta x \times \Delta y$（单位厚度）的单元积分[[#eq-diffusion]]，会增加北侧和南侧的通量：
$$
a_P\phi_P = a_W\phi_W + a_E\phi_E + a_S\phi_S + a_N\phi_N + S_u,\qquad
a_N = \frac{\Gamma_n\Delta x}{\delta y_{PN}},\quad a_S = \frac{\Gamma_s\Delta x}{\delta y_{SP}},
$$ {#eq-fv-2d}
其中$a_W = \Gamma_w\Delta y/\delta x_{WP}$，$a_E = \Gamma_e\Delta y/\delta x_{PE}$，$a_P = a_W + a_E + a_S + a_N - S_P$。三维再增加顶部和底部的邻点：七点模板。在结构网格上，矩阵不再是三对角的，而是**五对角**（二维）或**七对角**（三维）的；在非结构网格上则只是一般的稀疏矩阵。

在非结构网格上，同样的积分是对单元各面$f$的求和$\sum_f \Gamma_f(\nabla\phi)_f\cdot\mathbf{S}_f + \bar S\,\Delta V = 0$，其中$\mathbf{S}_f$是向外的面积矢量。两点近似$(\nabla\phi)_f\cdot\mathbf{S}_f \approx \lvert\mathbf{S}_f\rvert(\phi_N - \phi_P)/\lvert\mathbf{d}_{PN}\rvert$只有当连接两个单元中心的连线$\mathbf{d}_{PN}$平行于$\mathbf{S}_f$时（**正交**网格）才是精确的。否则必须加上**非正交修正**，它由重构的单元梯度显式计算；它不进入矩阵，能保持系数为正，并通过迭代收敛。网格的非正交性是[[computational-fluid-dynamics/meshing-verification]]中讨论的网格质量指标之一。

## 非稳态扩散

对于非稳态导热$\rho c\,\partial T/\partial t = \nabla\cdot(k\nabla T) + \dot q$，还要在从$t$到$t + \Delta t$的一个时间步上积分。储存项变为$\rho c(T_P - T_P^0)\Delta V$，其中上标$0$表示旧时间层；通量必须在时间步内的某一时刻计算。用旧值与新值之间的权重$\theta$（$\theta = 0$为显式，$\tfrac12$为克兰克-尼科尔森格式，$1$为全隐式），一维情形为：
$$
a_P T_P = a_W\left[\theta T_W + (1 - \theta)T_W^0\right] + a_E\left[\theta T_E + (1 - \theta)T_E^0\right] + \left[a_P^0 - (1 - \theta)(a_W + a_E)\right]T_P^0 + b,
$$ {#eq-fv-transient}
$$
a_P^0 = \frac{\rho c\,\Delta x}{\Delta t},\qquad a_P = \theta(a_W + a_E) + a_P^0 .
$$
显式情形（$\theta = 0$）中$T_P^0$的系数为$a_P^0 - a_W - a_E$。帕坦卡法则 2 要求它非负：$\rho c\Delta x/\Delta t \ge 2k/\Delta x$，即$\Delta t \le \rho c\,\Delta x^2/(2k)$——这就是[[computational-fluid-dynamics/stability-accuracy#prop-heat-stability]]中 FTCS 的限制$d \le \tfrac12$，现在由正性推导出来。克兰克-尼科尔森格式（$\theta = \tfrac12$）的系数为$a_P^0 - \tfrac12(a_W + a_E)$，只有在$d \le 1$时为正；步长更大时它仍然稳定，但可能振荡。全隐式格式对任何$\Delta t$所有系数都为正，这就是为什么尽管它在时间上只有一阶精度，大多数商用程序仍以它为默认格式。

::: example 冷却平板的一个隐式步 {#ex-transient}
一块厚$20\ \mathrm{mm}$的平板（$k = 10\ \mathrm{W\,m^{-1}\,K^{-1}}$，$\rho c = 1.0\times10^{7}\ \mathrm{J\,m^{-3}\,K^{-1}}$）温度均匀为$200\,^\circ\mathrm{C}$。$t = 0$时其东侧表面突然保持在$0\,^\circ\mathrm{C}$；西侧表面绝热。用五个控制体，求 (a) 最大的稳定显式时间步长；(b) 以$\Delta t = 2\ \mathrm{s}$进行一个全隐式步之后的温度。
::: solution
$\Delta x = 4.0\ \mathrm{mm}$，$a_W = a_E = k/\Delta x = 2500\ \mathrm{W\,m^{-2}\,K^{-1}}$，东侧表面的边界热导为$2k/\Delta x = 5000$，$a_P^0 = \rho c\Delta x/\Delta t$。

(a) 显式：内部单元要求$a_P^0 \ge 2 \times 2500$，即$\Delta t \le \rho c\Delta x^2/(2k) = 10^7 \times 1.6\times10^{-5}/20 = 8.0\ \mathrm{s}$。东侧单元的限制更严：它要求$a_P^0 \ge 2500 + 5000$，因此$\Delta t \le \rho c\Delta x/7500 = 4\times10^{4}/7500 = 5.33\ \mathrm{s}$，因为其节点距冷边界只有半个单元。

(b) $\Delta t = 2\ \mathrm{s}$的隐式格式：$a_P^0 = 10^7 \times 0.004/2 = 2.0\times10^{4}$。节点 1（西侧绝热）：$a_P = 2500 + 20\,000 = 22\,500$；节点 2–4：$a_P = 25\,000$；节点 5：$a_P = 2500 + 5000 + 20\,000 = 27\,500$，边界项为$5000 \times 0 = 0$。每个右端项都是$a_P^0 T^0 = 4.0\times10^{6}$。求解三对角方程组，
$$
T = (199.996,\ 199.962,\ 199.625,\ 196.292,\ 163.299)\ ^\circ\mathrm{C}.
$$
合理性检查：冷却已到达每个节点（隐式方法在一步之内就把信息传遍整个计算域），在冷表面附近最强，且没有任何值超过$200\,^\circ\mathrm{C}$或低于$0\,^\circ\mathrm{C}$。该步中散失的热量$\rho c\Delta x\sum(T^0 - T) = 4\times10^4 \times 40.83 = 1.633\times10^{6}\ \mathrm{J/m^2}$，等于通过东侧表面的$\Delta t \times 5000 \times 163.299 = 1.633\times10^{6}\ \mathrm{J/m^2}$：再次精确守恒。
:::
:::

::: warning 半单元边界与错误的距离
有限体积导热程序手工编写时最常见的错误，是在单元中心网格中把边界面到第一个节点的距离取为整个单元宽度$\Delta x$，而不是$\Delta x/2$。这样系数只有应有值的一半，边界热阻加倍，通过第一类边界的热流量偏小——若以每个单元的边界热阻来衡量，这一偏差**不会**随网格加密而消失。同样常见的是：在对流条件中把边界**节点**温度当作表面温度使用，忽略了[[#eq-robin]]中的$\Delta x/(2k)$项。务必检查收敛解的整体能量平衡：源项必须在舍入误差范围内等于边界净热流量。
:::

::: quiz
在有限体积导热模型中，一个铜单元（$k = 400\ \mathrm{W\,m^{-1}\,K^{-1}}$）与一个空气单元（$k = 0.026\ \mathrm{W\,m^{-1}\,K^{-1}}$）相邻，界面位于中点。程序应大约使用哪个界面导热系数？
- [ ] $200\ \mathrm{W\,m^{-1}\,K^{-1}}$
- [ ] $103\ \mathrm{W\,m^{-1}\,K^{-1}}$（几何平均）
- [x] $0.052\ \mathrm{W\,m^{-1}\,K^{-1}}$
- [ ] $0.026\ \mathrm{W\,m^{-1}\,K^{-1}}$
::: solution
调和平均$2k_Pk_E/(k_P + k_E) = 2 \times 400 \times 0.026/400.026 = 0.052\ \mathrm{W\,m^{-1}\,K^{-1}}$。几乎全部热阻都在空气半单元中，其热导为$k_{\text{air}}/(\Delta x/2)$；用整个节点间距表示即为$2k_{\text{air}}/\Delta x$，因此是空气导热系数的两倍。
:::
:::

::: history
控制体方法起源于 20 世纪 60 年代末 D. 布莱恩·斯波尔丁（D. Brian Spalding）在帝国理工学院的研究组。A. D. Gosman、W. M. Pun、A. K. Runchal、D. B. Spalding 和 M. Wolfshtein 合著的《回流流动中的传热传质》（*Heat and Mass Transfer in Recirculating Flows*，Academic Press，1969）针对回流流动提出了一种由控制体平衡导出的有限差分方法。曾与斯波尔丁共事的苏哈斯·V·帕坦卡（Suhas V. Patankar）在《传热与流体流动的数值计算》（*Numerical Heat Transfer and Fluid Flow*，Hemisphere/McGraw-Hill，1980）中以今天的标准形式阐述了这一方法——系数记号、四条基本法则、界面导热系数的调和平均以及源项线性化——该书至今仍是阅读最广的 CFD 著作之一。此后这一方法被推广到任意多面体构成的非结构网格，这就是当前大多数通用程序所采用的形式。
:::

::: summary
- 有限体积法在每个单元上精确地积分守恒律，只对面通量和单元源项进行近似，因此在任何网格上都能在舍入误差范围内守恒。
- 一维扩散：$a_P\phi_P = a_W\phi_W + a_E\phi_E + S_u$，热导$a_{nb} = \Gamma_f A_f/\delta x$，$a_P = \sum a_{nb} - S_P$。
- 第一类边界使用移入源项的半单元热导$2\Gamma A/\Delta x$；第二类边界加上一个通量；对流边界把$1/h$与$\Delta x/(2k)$串联。
- 不同材料之间的界面导热系数取调和平均（串联热阻），绝不能取算术平均。
- 把源项线性化为$S_u + S_P\phi_P$，且$S_P \le 0$；保持所有系数为正（帕坦卡四条法则）。
- 非定常项增加$a_P^0 = \rho c\Delta x/\Delta t$；显式格式要求$a_P^0 \ge \sum a_{nb}$（以正性条件表示的稳定性限制，在边界单元处最严）；全隐式格式对所有$\Delta t$都保持为正。
- 内部误差很小；边界半单元和陡峭梯度（肋片的$1/n$）决定了精度。
:::

## 习题

::: exercise 邻点系数 {level=1 check="20"}
一根铝合金杆（$k = 200\ \mathrm{W\,m^{-1}\,K^{-1}}$），横截面积$A = 1.0\times10^{-3}\ \mathrm{m^2}$，划分为长$10\ \mathrm{mm}$的单元。求内部邻点系数$a_E$。（以 W/K 为单位输入。）
::: solution
$a_E = kA/\delta x = 200 \times 10^{-3}/0.010 = 20\ \mathrm{W/K}$：相邻节点之间$1\ \mathrm{K}$的温差沿杆驱动$20\ \mathrm{W}$的热流。
:::
:::

::: exercise 界面导热系数 {level=1 check="0.8"}
两个等宽单元中的材料导热系数分别为$k = 0.50$和$k = 2.0\ \mathrm{W\,m^{-1}\,K^{-1}}$。求与节点间距配合使用的界面导热系数。（以$\mathrm{W\,m^{-1}\,K^{-1}}$为单位输入。）
::: solution
$k_e = 2 \times 0.50 \times 2.0/(0.50 + 2.0) = 2.0/2.5 = 0.80\ \mathrm{W\,m^{-1}\,K^{-1}}$，而算术平均为$1.25$。
:::
:::

::: exercise 对流边界热导 {level=1 check="20"}
某单元中心网格在导热系数为$k = 1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$的壁面旁取$\Delta x = 20\ \mathrm{mm}$，壁面由$h = 25\ \mathrm{W\,m^{-2}\,K^{-1}}$的空气冷却。求[[#eq-robin]]中的总边界热导$U$。（以$\mathrm{W\,m^{-2}\,K^{-1}}$为单位输入$U$。）
::: solution
$U = 1/(1/h + \Delta x/2k) = 1/(0.040 + 0.010) = 20\ \mathrm{W\,m^{-2}\,K^{-1}}$。这里半单元导热热阻占总热阻的五分之一；忽略它会使散热量高估$25\,\%$。
:::
:::

::: exercise 有内热源的三个单元 {level=2 check="1.25"}
一块厚$0.30\ \mathrm{m}$、$k = 10\ \mathrm{W\,m^{-1}\,K^{-1}}$、均匀生热$\dot q = 1000\ \mathrm{W/m^3}$的平板，两表面均为$0\,^\circ\mathrm{C}$。用三个相等的控制体求解，并将中心温度与精确值$\dot qL^2/(8k)$比较。（以 °C 为单位输入有限体积的中心温度。）
::: solution
$\Delta x = 0.10\ \mathrm{m}$，$k/\Delta x = 100$，边界热导$200$，每个单元的源项$S_u = 1000 \times 0.10 = 100$。方程：$300T_1 - 100T_2 = 100$，$-100T_1 + 200T_2 - 100T_3 = 100$，$-100T_2 + 300T_3 = 100$。由对称性$T_1 = T_3$：由$300T_1 - 100T_2 = 100$和$-200T_1 + 200T_2 = 100$得$T_1 = 0.75$，$T_2 = 1.25\,^\circ\mathrm{C}$。精确值：中心处为$1000 \times 0.09/80 = 1.125\,^\circ\mathrm{C}$，$x = 0.05\ \mathrm{m}$处为$0.625\,^\circ\mathrm{C}$。每个节点都偏高$\dot q(\Delta x/2)^2/(2k) = 0.125\,^\circ\mathrm{C}$，即[[#ex-generation]]中发现的边界半单元误差。
:::
:::

::: exercise 辐射源项的线性化 {level=2 check="-22.68"}
某表面单元以辐射方式散热，单位面积的源项为$S = -\varepsilon\sigma(T^4 - T_\infty^4)$，其中$\varepsilon = 0.80$，$\sigma = 5.67\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$，$T_\infty = 300\ \mathrm{K}$。用[[#eq-linearise]]在当前迭代值$T^\ast = 500\ \mathrm{K}$处线性化。（以$\mathrm{W\,m^{-2}\,K^{-1}}$为单位输入单位面积的$S_P$。）
::: solution
$\mathrm{d}S/\mathrm{d}T = -4\varepsilon\sigma T^{\ast3} = -4 \times 0.80 \times 5.67\times10^{-8} \times 1.25\times10^{8} = -22.68\ \mathrm{W\,m^{-2}\,K^{-1}}$，故$S_P = -22.68$（为负，符合法则 3 的要求），$S_u = S^\ast - S_P T^\ast = \varepsilon\sigma(3T^{\ast4} + T_\infty^4) = 0.8 \times 5.67\times10^{-8} \times (1.875\times10^{11} + 8.1\times10^{9}) = 8872\ \mathrm{W/m^2}$。检验：在$T = T^\ast$处，$S_u + S_PT^\ast = 8872 - 11\,340 = -2468\ \mathrm{W/m^2}$，等于$-0.8 \times 5.67\times10^{-8}(500^4 - 300^4)$。
:::
:::

::: exercise 带对流边界的显式限制 {level=2 check="80"}
某壁面（$k = 1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$，$\rho c = 2.0\times10^{6}\ \mathrm{J\,m^{-3}\,K^{-1}}$，$\Delta x = 10\ \mathrm{mm}$）的一维显式有限体积模型中，有一个边界单元，它有一个内部邻点和一个$h = 600\ \mathrm{W\,m^{-2}\,K^{-1}}$的对流面。利用$T_P^0$系数的正性条件，求该单元的最大时间步长，并与内部单元的限制比较。（以秒为单位输入边界单元的$\Delta t$。）
::: solution
边界热导$U = 1/(1/600 + 0.005/1.0) = 1/0.006667 = 150\ \mathrm{W\,m^{-2}\,K^{-1}}$；内部热导$k/\Delta x = 100\ \mathrm{W\,m^{-2}\,K^{-1}}$。正性：$\rho c\Delta x/\Delta t \ge 100 + 150 = 250$，故$\Delta t \le 2.0\times10^{6} \times 0.010/250 = 80\ \mathrm{s}$。内部单元要求$\rho c\Delta x/\Delta t \ge 200$，即$\Delta t \le 100\ \mathrm{s}$。起控制作用的是边界单元；当$h \to \infty$时，其热导趋于$2k/\Delta x = 200$，限制趋于$66.7\ \mathrm{s}$。
:::
:::

::: exercise 逐项相消与守恒 {level=2}
证明：对于采用本课边界处理方式的[[#eq-fv-1d]]的任何一维定常有限体积解，所有单元方程之和都化为“总源项$=$经两个边界流出的净热流量”，无论单元数是多少，也无论温度分布的精度如何。
::: solution
把每个单元方程写成$F_e - F_w + S_u + S_P\phi_P = 0$，其中$F_e = a_E(\phi_E - \phi_P)$是经面$e$流入该单元的近似通量，$F_w = a_W(\phi_P - \phi_W)$是沿$+x$方向经$w$流出的通量（边界面使用其半单元表达式）。对于内部面$i + \tfrac12$，其通量在单元$i$中作为$F_e$出现，并以完全相同的表达式在单元$i + 1$中作为$F_w$出现；对所有单元求和时，每个内部面贡献$F - F = 0$。剩下的是$F_{\text{东边界}} - F_{\text{西边界}} + \sum_i(S_u + S_P\phi_i) = 0$：总源项等于边界净流出量。这就是[[#ex-generation]]精确满足能量平衡的原因，它也是把[[computational-fluid-dynamics/governing-equations#prop-integral-to-differential]]反过来读的离散对应物。
:::
:::

::: exercise 散热器基板的网格划分 {level=3}
一块厚$5\ \mathrm{mm}$的铝制散热器基板（$k = 200\ \mathrm{W\,m^{-1}\,K^{-1}}$）通过一层$0.10\ \mathrm{mm}$的导热界面材料（$k = 3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$）与一块耗散$50\ \mathrm{W}$的$10\ \mathrm{mm} \times 10\ \mathrm{mm}$芯片黏接；基板为$40\ \mathrm{mm}$见方。为三维定常导热模型提出一种有限体积网格，说明你如何表示薄的界面层、在何处加密、如何处理材料界面，以及如何检验结果。
::: solution
好的答案应涵盖：(i) 界面层只有$0.1\ \mathrm{mm}$厚，但其热阻$0.1\times10^{-3}/3.0 = 3.3\times10^{-5}\ \mathrm{m^2K/W}$在芯片面积$10^{-4}\ \mathrm{m^2}$上为$0.33\ \mathrm{K/W}$，在$50\ \mathrm{W}$下约为$17\ \mathrm{K}$——不可忽视。可以用一两层很薄的单元划分它（对于穿过该层的纯导热，大长宽比无害），也可以在界面面上把它表示为“薄壁”接触热阻，完全按[[#eq-harmonic]]的方式串联加上$t/k$。(ii) 在基板中芯片投影区域周围加密，那里热量横向扩展、梯度最陡（扩散热阻），单元尺寸取$0.5\ \mathrm{mm}$量级，向边缘逐渐变粗，增长比小于约$1.2$。(iii) 在所有材料界面上采用调和平均（串联热阻）的面导热系数；把网格面放在界面上。(iv) 检查整体能量平衡（输入的$50\ \mathrm{W}$等于从冷却表面散出的热量），将一维热阻估算值与计算得到的芯片到基板的温差进行比较，并在每个方向加密$1.5$–$2$倍的网格上重复计算，以估计离散误差（[[computational-fluid-dynamics/meshing-verification]]）。
:::
:::
