[[finite-element-method/weak-forms]]中的推导没有任何地方依赖于未知量是位移。任何具有弱形式的边值问题都可以用同样的方式离散，而一大类物理问题共有一个单一而简单的方程：稳态导热、等截面轴的扭转、地下水渗流、静电场、静磁场和无旋流动，都由关于一个标量场的**拟调和**（泊松型）方程控制。本章把有限元法应用于这一类问题，并以热传导——机械工程中最常见的情形——作为贯穿始终的例子。每个节点只有一个未知量而不是两三个，单元矩阵更小，物理意义也容易与[[heat-transfer/steady-conduction]]和[[heat-transfer/fins]]对照检查。出现了两个新特点：对流边界条件，它同时增加一个“刚度”和一个“载荷”；以及时间依赖性，它把代数方程组变成一组必须逐步积分的常微分方程，其稳定性限制是每个瞬态分析者都需要理解的。

## 拟调和方程

::: definition 稳态场问题 {#def-field}
在区域$\Omega$中求标量场$\phi(x, y)$，使得
$$
\frac{\partial}{\partial x}\left(k_x\frac{\partial\phi}{\partial x}\right) + \frac{\partial}{\partial y}\left(k_y\frac{\partial\phi}{\partial y}\right) + Q = 0 \quad\text{在 } \Omega \text{ 内},
$$ {#eq-field}
并在边界$\Gamma$的各部分上满足三类边界条件，$\mathbf{n}$为外法线：
- **狄利克雷条件（本质条件）：**在$\Gamma_\phi$上$\phi = \bar\phi$——给定温度；
- **诺伊曼条件（自然条件）：**在$\Gamma_q$上$-k\,\partial\phi/\partial n = \bar q$——给定的向外热流密度（$\bar q = 0$：绝热或对称边界）；
- **罗宾条件（混合条件）：**在$\Gamma_h$上$-k\,\partial\phi/\partial n = h(\phi - \phi_\infty)$——以表面传热系数$h$向温度为$\phi_\infty$的流体对流传热。
:::

对热传导，$\phi = T$是温度（K或°C），$k$是导热系数（W/m K），$Q$是内热源强度（W/m³），热流密度矢量由傅里叶（Fourier）定律$\mathbf{q} = -k\nabla T$给出。同样的数学描述了表中的其他问题。

| 问题 | 场$\phi$ | “传导系数”$k$ | 源$Q$ | 通量$-k\nabla\phi$ |
|---|---|---|---|---|
| 热传导 | 温度$T$ | 导热系数 | 内热源 | 热流密度 |
| 等截面轴的扭转 | 普朗特（Prandtl）应力函数 | $1$（或$1/G$） | $2G\theta'$（$\theta'$为单位长度扭转角） | 切应力（经旋转） |
| 地下水渗流 | 水头 | 渗透系数 | 抽水 | 达西速度 |
| 静电场 | 电势 | 介电常数 | 电荷密度 | $-$电位移 |
| 无旋理想流动 | 速度势 | $1$ | $0$ | $-$速度 |

（在扭转比拟中，切应力为$\tau_{xz} = \partial\phi/\partial y$，$\tau_{yz} = -\partial\phi/\partial x$，扭矩为$2\int\phi\,dA$；见[[solid-mechanics/linear-elasticity]]。）

## 弱形式与单元矩阵

把[[#eq-field]]乘以在$\Gamma_\phi$上为零的试验函数$w$，在$\Omega$上积分（平面区域取厚度$t$），并应用散度定理——即二维的分部积分：

::: proposition 弱形式与有限元方程 {#prop-weak-field}
场问题的弱形式为：求在$\Gamma_\phi$上满足$\phi = \bar\phi$的$\phi$，使得对每个在$\Gamma_\phi$上为零的$w$，
$$
\int_\Omega \nabla w^{\mathsf T}\mathbf{k}\,\nabla\phi\;t\,dA + \int_{\Gamma_h}h\,w\,\phi\;t\,ds = \int_\Omega w\,Q\;t\,dA - \int_{\Gamma_q}w\,\bar q\;t\,ds + \int_{\Gamma_h}h\,w\,\phi_\infty\;t\,ds,
$$
其中$\mathbf{k} = \operatorname{diag}(k_x, k_y)$。在每个单元中取$\phi = \mathbf{N}\mathbf{T}^{(e)}$，$\mathbf{B} = [\partial\mathbf{N}/\partial x;\ \partial\mathbf{N}/\partial y]$，伽辽金法给出由
$$
\mathbf{k}^{(e)} = \underbrace{\int_{A_e}\mathbf{B}^{\mathsf T}\mathbf{k}\,\mathbf{B}\,t\,dA}_{\text{导热}} + \underbrace{\int_{\Gamma_h^e}h\,\mathbf{N}^{\mathsf T}\mathbf{N}\,t\,ds}_{\text{对流}}, \qquad \mathbf{f}^{(e)} = \int_{A_e}\mathbf{N}^{\mathsf T}Q\,t\,dA - \int_{\Gamma_q^e}\mathbf{N}^{\mathsf T}\bar q\,t\,ds + \int_{\Gamma_h^e}h\,\phi_\infty\mathbf{N}^{\mathsf T}\,t\,ds
$$ {#eq-field-k}
组装而成的$\mathbf{K}\mathbf{T} = \mathbf{F}$。
:::

::: proof
$\int_\Omega w\,\nabla\cdot(\mathbf{k}\nabla\phi)\,dA = \oint_\Gamma w\,(\mathbf{k}\nabla\phi)\cdot\mathbf{n}\,ds - \int_\Omega\nabla w^{\mathsf T}\mathbf{k}\nabla\phi\,dA$（对$w\,\mathbf{k}\nabla\phi$应用散度定理）。在$\Gamma_\phi$上试验函数为零；在$\Gamma_q$上法向通量$(\mathbf{k}\nabla\phi)\cdot\mathbf{n} = -\bar q$；在$\Gamma_h$上它为$-h(\phi - \phi_\infty)$。代入$\int w[\nabla\cdot(\mathbf{k}\nabla\phi) + Q] = 0$并把含未知量的对流项移到左边，即得弱形式。代入$\phi = \sum N_jT_j$与$w = N_i$，就得到矩阵方程的第$i$行。假设：稳态，线性材料（$k$与$T$无关），$h$与$\phi_\infty$已知。
:::

两点观察贯穿后面的一切。第一，导热矩阵恰好具有刚度矩阵的结构：对称、半正定、各行之和为零（均匀温度不产生热流，这是刚体模式的对应物）。没有狄利克雷边界或对流边界的模型是奇异的，正如没有支承的结构一样。第二，对流边界对**两边**都有贡献：矩阵一侧的项$h\int\mathbf{N}^{\mathsf T}\mathbf{N}$（对流就像连接到环境温度的分布弹簧）以及载荷一侧的$h\phi_\infty\int\mathbf{N}^{\mathsf T}$。即使没有给定温度，它也使矩阵非奇异。

### 一维单元

对于沿横截面积为$A$的杆、壁或肋片的导热，两节点线性单元（$N_1 = 1 - x/L$，$N_2 = x/L$）给出**热导**矩阵$\frac{kA}{L}[1, -1; -1, 1]$（W/K）——即把$EA$换成$kA$的杆单元。若侧表面（周长$P$）向$T_\infty$对流，对流积分变为
$$
\mathbf{k}_h^{(e)} = \frac{hPL}{6}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}, \qquad \mathbf{f}_h^{(e)} = \frac{hPLT_\infty}{2}\begin{bmatrix} 1 \\ 1 \end{bmatrix},
$$ {#eq-fin}
而面积为$A$的对流端面只是在该节点的对角元上加$hA$、在其载荷上加$hAT_\infty$。对单位面积的平壁，$A = 1\,\mathrm{m^2}$。

::: example 复合壁 {#ex-wall}
一面外墙从内到外由$20\,\mathrm{mm}$的抹灰层（$k = 0.5\,\mathrm{W/m\,K}$）、$50\,\mathrm{mm}$的保温层（$k = 0.04$）与$200\,\mathrm{mm}$的砖（$k = 0.7$）组成。内表面保持在$20\,^\circ\mathrm{C}$；外表面以$h = 25\,\mathrm{W/m^2\,K}$向$-5\,^\circ\mathrm{C}$的空气对流传热。每层用一个单元，求各界面温度与每平方米的热损失。
::: solution
对单位面积，单元热导$k/L$为$25$、$0.8$与$3.5\,\mathrm{W/m^2\,K}$。节点1（内表面）到4（外表面）。组装后在节点4加上对流项$h = 25$，并在其载荷上加$hT_\infty = -125\,\mathrm{W/m^2}$：
$$
\begin{bmatrix} 25 & -25 & 0 & 0 \\ -25 & 25.8 & -0.8 & 0 \\ 0 & -0.8 & 4.3 & -3.5 \\ 0 & 0 & -3.5 & 3.5 + 25 \end{bmatrix}\begin{bmatrix} T_1 \\ T_2 \\ T_3 \\ T_4 \end{bmatrix} = \begin{bmatrix} F_1 \\ 0 \\ 0 \\ -125 \end{bmatrix}.
$$
给定$T_1 = 20\,^\circ\mathrm{C}$，第2–4行给出$T_2 = 19.38\,^\circ\mathrm{C}$，$T_3 = 0.04\,^\circ\mathrm{C}$，$T_4 = -4.38\,^\circ\mathrm{C}$。通过抹灰层的热流密度：$25(20 - 19.38) = 15.47\,\mathrm{W/m^2}$；第1行给出同样的数值作为“约束力”$F_1$，即在内表面供给的热量。

**校核。**串联热阻：$0.04 + 1.25 + 0.2857 + 0.04 = 1.6157\,\mathrm{m^2\,K/W}$（抹灰层、保温层、砖、外表面换热），$25/1.6157 = 15.47\,\mathrm{W/m^2}$。保温层只占厚度的六分之一，却承担了$77\,\%$的温降。这里线性单元是精确的，因为精确温度在每一层内都是线性的。
:::
:::

::: example 针肋 {#ex-fin}
一根直径$5\,\mathrm{mm}$、长$50\,\mathrm{mm}$的铝制针肋（$k = 200\,\mathrm{W/m\,K}$），肋基温度为$100\,^\circ\mathrm{C}$，以$h = 25\,\mathrm{W/m^2\,K}$向$25\,^\circ\mathrm{C}$的空气对流；肋端视为绝热。用1、2和4个单元计算肋端温度与散热量，并与精确解比较。
::: solution
$A = \pi D^2/4 = 1.963\times10^{-5}\,\mathrm{m^2}$，$P = \pi D = 0.01571\,\mathrm{m}$，$m = \sqrt{hP/kA} = \sqrt{4h/kD} = 10.0\,\mathrm{m^{-1}}$，$mL = 0.5$。

**精确解**（[[heat-transfer/fins]]）：$T_\text{肋端} = T_\infty + (T_b - T_\infty)/\cosh mL = 25 + 75/1.1276 = 91.51\,^\circ\mathrm{C}$，$\dot Q = \sqrt{hPkA}\,(T_b - T_\infty)\tanh mL = 1.3610\,\mathrm{W}$。

**一个单元。**$kA/L = 0.07854\,\mathrm{W/K}$，$hPL/6 = 0.003272\,\mathrm{W/K}$，所以$\mathbf{k}^{(e)} = [0.08508, -0.07527; -0.07527, 0.08508]$，$\mathbf{f}^{(e)} = 0.2454\,[1, 1]^{\mathsf T}\,\mathrm{W}$。由$T_1 = 100$：$0.08508\,T_2 = 0.2454 + 0.07527 \times 100$，$T_2 = 91.35\,^\circ\mathrm{C}$。从肋基进入的热量是第1行的“约束力”：$\dot Q = 0.08508 \times 100 - 0.07527 \times 91.35 - 0.2454 = 1.388\,\mathrm{W}$。

**更多单元：**

| 单元数 | $T_\text{肋端}$ (°C) | $\dot Q$ (W) | $\dot Q$的误差 |
|---|---|---|---|
| 1 | 91.35 | 1.3877 | $+1.96\,\%$ |
| 2 | 91.47 | 1.3676 | $+0.48\,\%$ |
| 4 | 91.50 | 1.3627 | $+0.12\,\%$ |
| 精确解 | 91.51 | 1.3610 | — |

**校核。**单元每减半一次，误差缩小为1/4（$h^2$）；有限元散热量偏高，这对于一个“导热过强”的模型是预料之中的，正如位移模型过刚一样。由约束力（一致节点热流）计算$\dot Q$能得到这种$h^2$精度；由第一个单元的温度梯度$-kA(T_2 - T_1)/L_e$计算则差得多。肋效率$\tanh(mL)/mL = 0.924$。
:::
:::

### 线性三角形单元

对于采用[[finite-element-method/plane-elements]]中形函数的三节点三角形，$\mathbf{B} = \frac{1}{2A}[b_1, b_2, b_3;\ c_1, c_2, c_3]$为常数，对各向同性的$k$，
$$
\mathbf{k}^{(e)} = \frac{k\,t}{4A}\left(\mathbf{b}\mathbf{b}^{\mathsf T} + \mathbf{c}\mathbf{c}^{\mathsf T}\right), \qquad (\mathbf{k}^{(e)})_{ij} = \frac{kt}{4A}(b_ib_j + c_ic_j).
$$ {#eq-tri}
位于其两个节点之间、长为$\ell$的对流边在这两个节点上加$\frac{ht\ell}{6}[2, 1; 1, 2]$，在它们的载荷上加$\frac{ht\ell T_\infty}{2}[1, 1]$；均匀内热源在每个节点上加$QtA/3$。

::: example 三角形单元的热导 {#ex-tri}
在厚$10\,\mathrm{mm}$的钢板（$k = 50\,\mathrm{W/m\,K}$）中，一个三角形的节点为1 $(0, 0)$、2 $(0.04, 0)$、3 $(0, 0.03)\,\mathrm{m}$。计算$\mathbf{k}^{(e)}$，以及$h = 100\,\mathrm{W/m^2\,K}$时边1–2的对流矩阵。
::: solution
$A = 6\times10^{-4}\,\mathrm{m^2}$；$\mathbf{b} = [-0.03, 0.03, 0]$，$\mathbf{c} = [-0.04, 0, 0.04]\,\mathrm{m}$；$kt/(4A) = 50 \times 0.01/(2.4\times10^{-3}) = 208.33\,\mathrm{W/(K\,m^2)}$。于是
$$
\mathbf{k}^{(e)} = 208.33\begin{bmatrix} 0.0025 & -0.0009 & -0.0016 \\ -0.0009 & 0.0009 & 0 \\ -0.0016 & 0 & 0.0016 \end{bmatrix} = \begin{bmatrix} 0.5208 & -0.1875 & -0.3333 \\ -0.1875 & 0.1875 & 0 \\ -0.3333 & 0 & 0.3333 \end{bmatrix}\ \mathrm{W/K}.
$$
边1–2的$\ell = 0.04\,\mathrm{m}$：$\frac{ht\ell}{6} = 6.667\times10^{-3}$，在节点1和2上给出$[0.01333, 0.00667; 0.00667, 0.01333]\,\mathrm{W/K}$。

**校核。**导热矩阵各行之和为零（均匀温度下无热流）。$k_{23} = 0$，因为边1–2与1–3互相垂直：对直角三角形，直角两侧两个节点之间的非对角项为零。对流矩阵元素之和为$ht\ell = 0.04\,\mathrm{W/K}$，即整条边对流体的热导。
:::
:::

## 瞬态导热

当温度随时间变化时，[[heat-transfer/transient-conduction]]中的能量平衡增加一个储能项：
$$
\rho c\,\frac{\partial T}{\partial t} = \nabla\cdot(k\nabla T) + Q,
$$
其中$\rho$为密度，$c$为比热容。在弱形式中把时间导数作为“源”的一部分处理，并插值$T(x, y, t) = \mathbf{N}(x, y)\,\mathbf{T}(t)$——空间中用形函数，节点值随时间变化——就得到一组常微分方程，即**半离散**方程。

::: proposition 半离散热方程 {#prop-semidiscrete}
$$
\mathbf{C}\,\dot{\mathbf{T}} + \mathbf{K}\,\mathbf{T} = \mathbf{F}(t), \qquad \mathbf{C} = \sum_e\int_{V_e}\rho c\,\mathbf{N}^{\mathsf T}\mathbf{N}\,dV,
$$ {#eq-semidiscrete}
其中$\mathbf{K}$与$\mathbf{F}$与稳态问题中相同，$\mathbf{C}$是**热容矩阵**（J/K）。对长为$L$、面积为$A$的两节点线性单元，**一致**热容矩阵为$\frac{\rho cAL}{6}[2, 1; 1, 2]$；**集中**（对角）形式把单元热容的一半放在每个节点上，$\frac{\rho cAL}{2}[1, 0; 0, 1]$。
:::

::: proof
瞬态方程的弱形式是稳态弱形式在左边加上项$\int w\,\rho c\,\partial T/\partial t\,dV$。取$w = N_i$与$T = \sum_j N_jT_j(t)$，该项为$\sum_j\left(\int\rho cN_iN_j\,dV\right)\dot T_j$，即$\mathbf{C}\dot{\mathbf{T}}$的第$i$行。对线性单元，$\int_0^L N_1^2\,dx = L/3$，$\int_0^L N_1N_2\,dx = L/6$。集中矩阵由把一致矩阵的每一行加到其对角元上得到，这保持了总热容$\rho cAL$不变。
:::

半离散方程组是一组耦合的一阶常微分方程——用模态表示，就是一组解耦的衰减$\dot y_i = -\lambda_iy_i$，其中$\lambda_i$是$\mathbf{C}^{-1}\mathbf{K}$的特征值（s⁻¹），即网格的时间常数的倒数。最大的$\lambda$属于网格所能表示的最短波长的模式，按$k/(\rho c\,h^2)$标度；它决定显式积分的稳定性。

::: algorithm 广义梯形（θ）法 {#alg-theta}
这里$\theta$是介于0与1之间的时间积分参数，而不是温度。取时间步长$\Delta t$，近似$\dot{\mathbf{T}} \approx (\mathbf{T}_{n+1} - \mathbf{T}_n)/\Delta t$，并在步长两端的加权平均处计算其余各项：
$$
\left(\frac{1}{\Delta t}\mathbf{C} + \theta\mathbf{K}\right)\mathbf{T}_{n+1} = \left(\frac{1}{\Delta t}\mathbf{C} - (1 - \theta)\mathbf{K}\right)\mathbf{T}_n + \theta\mathbf{F}_{n+1} + (1 - \theta)\mathbf{F}_n.
$$
1. 组装$\mathbf{C}$、$\mathbf{K}$；构造左端矩阵并分解一次（若$\Delta t$与物性不变，它就是常数）。
2. 对每一步，构造右端项，在$t_{n+1}$处引入给定温度，并求解。

$\theta = 0$：**向前欧拉法**（显式；采用集中$\mathbf{C}$时根本无需求解方程组）。$\theta = \tfrac12$：**克兰克-尼科尔森法**（二阶精度）。$\theta = 1$：**向后欧拉法**（一阶，非常稳健）。
:::

::: proposition θ法的稳定性 {#prop-stability}
把θ法应用于模态方程$\dot y = -\lambda y$（$\lambda > 0$），得$y_{n+1} = G\,y_n$，放大因子为
$$
G(\lambda\Delta t) = \frac{1 - (1 - \theta)\lambda\Delta t}{1 + \theta\lambda\Delta t}.
$$
当$\theta \ge \tfrac12$时，该方法**无条件稳定**（对每个$\Delta t$都有$\lvert G\rvert \le 1$）。当$\theta < \tfrac12$时，只有$\Delta t \le \dfrac{2}{(1 - 2\theta)\lambda_{\max}}$时才稳定；对向前欧拉法，$\Delta t_{\text{cr}} = 2/\lambda_{\max}$。
:::

::: proof
对满足$\mathbf{K}\boldsymbol{\psi} = \lambda\mathbf{C}\boldsymbol{\psi}$的模态（无载荷），把$\mathbf{T} = y\boldsymbol{\psi}$代入格式，得$(1/\Delta t + \theta\lambda)y_{n+1} = (1/\Delta t - (1 - \theta)\lambda)y_n$，即所述的$G$，其中$z = \lambda\Delta t > 0$。总有$G < 1$。$G \ge -1$要求$1 - (1 - \theta)z \ge -1 - \theta z$，即$(1 - 2\theta)z \le 2$，当$\theta \ge \tfrac12$时它对所有$z$成立，否则给出$z \le 2/(1 - 2\theta)$。由于格式应用于耦合方程组就等于应用于每个模态，整个解稳定当且仅当该条件对最大的$\lambda$成立。
:::

稳定不等于精确。当$\lambda\Delta t \to \infty$时，克兰克-尼科尔森法有$G \to -1$：突变（表面温度的阶跃）中的高频成分不被衰减，而是每一步改变一次符号，在表面附近产生持续的虚假振荡。向后欧拉法有$G \to 0$，能衰减它们；它是有突变问题的安全选择，代价是只有一阶精度。精确的衰减$G = e^{-\lambda\Delta t}$总是介于0与1之间。

::: widget plot
f: exp(-x); 1 - x; (1 - x/2)/(1 + x/2); 1/(1 + x)
x: 0, 5
y: -2, 1.1
labels: e^{-\lambda\Delta t}\ \text{精确}; \theta = 0; \theta = 1/2; \theta = 1
hlines: -1
caption: 精确衰减以及向前欧拉法（$\theta = 0$）、克兰克-尼科尔森法（$\theta = \tfrac12$）与向后欧拉法（$\theta = 1$）每个时间步的放大因子$G$随$\lambda\Delta t$的变化。一旦$\lambda\Delta t > 2$，向前欧拉法就降到$-1$以下——不稳定。克兰克-尼科尔森法保持在$\pm1$以内，但趋于$-1$：刚性模态振荡而不是衰减。向后欧拉法总是介于0与1之间，有阻尼，但对小的$\lambda\Delta t$精度较低。
:::

::: example 突然受热的钢板 {#ex-transient}
一块厚$20\,\mathrm{mm}$的钢板（$k = 50\,\mathrm{W/m\,K}$，$\rho = 7850\,\mathrm{kg/m^3}$，$c = 460\,\mathrm{J/kg\,K}$），初始温度为$20\,^\circ\mathrm{C}$，一个表面突然升到$220\,^\circ\mathrm{C}$，另一个表面绝热。沿厚度用两个线性单元和集中热容矩阵建模（按每$\mathrm{m^2}$）。(a) 求向前欧拉法的临界时间步长。(b) 用$1\,\mathrm{s}$走一步向后欧拉法。(c) 把$\Delta t = 1, 20, 60\,\mathrm{s}$时向后欧拉法在$t = 60\,\mathrm{s}$的温度与精确解比较。
::: solution
$\rho c = 3.611\times10^{6}\,\mathrm{J/m^3\,K}$，$L_e = 0.01\,\mathrm{m}$，$k/L_e = 5000\,\mathrm{W/m^2\,K}$。节点1（受热表面，给定），2（中间），3（绝热表面）。集中热容：节点2为$\rho cL_e = 36\,110$，节点3为$\rho cL_e/2 = 18\,055\,\mathrm{J/m^2\,K}$。

(a) 自由自由度矩阵：$\mathbf{K}_{ff} = 5000[2, -1; -1, 1]$，$\mathbf{C}_{ff} = \operatorname{diag}(36\,110, 18\,055)$。$\mathbf{C}_{ff}^{-1}\mathbf{K}_{ff}$的特征值为$0.4728$与$0.0811\,\mathrm{s^{-1}}$，所以$\Delta t_\text{cr} = 2/0.4728 = 4.23\,\mathrm{s}$。

(b) 取$\Delta t = 1\,\mathrm{s}$，把$T_1 = 220$移到右边，节点2和3的向后欧拉方程组为
$$
\begin{bmatrix} 36\,110 + 10\,000 & -5000 \\ -5000 & 18\,055 + 5000 \end{bmatrix}\begin{bmatrix} T_2 \\ T_3 \end{bmatrix} = \begin{bmatrix} 36\,110 \times 20 + 5000 \times 220 \\ 18\,055 \times 20 \end{bmatrix},
$$
得$T_2 = 42.21\,^\circ\mathrm{C}$，$T_3 = 24.82\,^\circ\mathrm{C}$。（同样步长的一步向前欧拉法给出$T_2 = 47.69$，$T_3 = 20.00$：显式方法直到第二步才能“感受到”绝热表面。）

(c) $t = 60\,\mathrm{s}$时的温度（中面，绝热表面）：$\Delta t = 1\,\mathrm{s}$：$218.4$，$217.8$；$\Delta t = 20\,\mathrm{s}$：$210.5$，$206.6$；$\Delta t = 60\,\mathrm{s}$（单步）：$189.9$，$180.3\,^\circ\mathrm{C}$。平板的精确级数解给出$218.9$与$218.5\,^\circ\mathrm{C}$。

**校核。**特征时间$L^2/\alpha$（$\alpha = k/\rho c = 1.38\times10^{-5}\,\mathrm{m^2/s}$）为$29\,\mathrm{s}$，所以一分钟后板几乎是均匀的，所有解都表明了这一点。取$\Delta t = 1\,\mathrm{s}$时，剩余误差（中面处$0.5\,^\circ\mathrm{C}$）来自空间离散——只有两个单元——而大步长又加上了时间积分的滞后。向后欧拉法在$60\,\mathrm{s}$——显式极限的十四倍——时是稳定的，但稳定并没有使它精确。
:::
:::

::: widget heat
equation: heat
f: 1
L: 1
k: 1
boundary: dirichlet
terms: 60
caption: 初始温度均匀、两个表面突然保持为零的平板中瞬态导热的精确（傅里叶级数）解，采用无量纲单位。观察表面处的尖角几乎立即被磨圆，而中心仍未受影响：短波长成分衰减得最快，其衰减率正比于波数的平方。它们恰好就是有限元网格中$\lambda$最大的模态，决定了显式稳定性极限，而克兰克-尼科尔森法无法衰减它们。
:::

::: warning 由梯度求热流，凭直觉定时间步长
热模型中的大多数错误源于两种习惯。**由单元梯度求热流**：在线性单元中梯度为常数，精度只有$O(h)$；通过边界的热量应当取自节点约束力（狄利克雷节点上的“通量”），它们与能量平衡一致，并按$h^2$收敛。整体能量校核——通过给定温度流入的热量等于对流流出的热量加上储存的热量——能立即发现边界条件中的错误。**时间步长**：步长超过$\Delta t_\text{cr}$的显式格式会发散；步长长于所关心时间的隐式格式虽然稳定，却是错的。要分辨你所关心的最快现象（表面的热冲击需要那里有小单元**和**小步长），并通过把$\Delta t$减半来检验。
:::

::: quiz
对突然淬火的板进行的克兰克-尼科尔森分析表明，在最初几步中表面节点的温度在其预期值上下振荡，而内部看起来是光滑的。最好的补救方法是什么？
- [ ] 以同样的时间步长改用向前欧拉法。
- [ ] 用一致热容矩阵代替集中热容矩阵。
- [x] 使用向后欧拉法（或者先用几步向后欧拉法起步），或者减小时间步长，使$\lambda_{\max}\Delta t$不大。
- [ ] 把表面附近的网格加粗。
::: solution
这种振荡是克兰克-尼科尔森法对由突变激发的刚性、短波长模态所表现出的$G \to -1$行为。向后欧拉法能衰减它们（$G \to 0$）。用那么大步长的向前欧拉法会不稳定。加粗网格会减小$\lambda_{\max}$，从而减小振荡，但代价是恰恰在梯度最陡的地方失去分辨率——这是错误的取舍。
:::
:::

::: history
监凯维奇与张佑启（Cheung）1965年发表在《工程师》（*The Engineer*）上的论文“Finite elements in the solution of field problems”表明，为弹性力学开发的单元可以原封不动地应用于热传导、渗流及其他拟调和问题，而他们1967年的教科书把该方法表述为连续介质问题的一般工具，而不仅仅用于结构。时间步进格式更为古老：以他们的名字命名的隐式格式由克兰克（John Crank）与尼科尔森（Phyllis Nicolson）于1947年在有限差分的框架中为热传导问题发表，而用放大因子进行稳定性分析可追溯到冯·诺依曼（John von Neumann）20世纪40年代的工作。如今热分析是有限元在机械设计中最常见的应用之一——用于涡轮叶片与轮盘、制动器、电子封装和焊接——通常与一个以计算出的温度作为热载荷的应力分析相耦合。
:::

::: summary
- 热传导、扭转、渗流、静电场与势流共有拟调和方程$\nabla\cdot(k\nabla\phi) + Q = 0$，并使用同样的有限单元。
- 导热矩阵$\int\mathbf{B}^{\mathsf T}\mathbf{k}\mathbf{B}\,dV$是各行之和为零的刚度矩阵；给定温度是本质条件，热流是自然条件，对流在矩阵中加上$h\int\mathbf{N}^{\mathsf T}\mathbf{N}$，在载荷中加上$h\phi_\infty\int\mathbf{N}^{\mathsf T}$。
- 一维单元：$\frac{kA}{L}[1, -1; -1, 1]$，对流表面再加上$\frac{hPL}{6}[2, 1; 1, 2]$。热流率最好取自节点约束力。
- 瞬态问题给出$\mathbf{C}\dot{\mathbf{T}} + \mathbf{K}\mathbf{T} = \mathbf{F}$，采用一致或集中热容矩阵。
- θ法有$G = [1 - (1 - \theta)\lambda\Delta t]/(1 + \theta\lambda\Delta t)$：$\theta \ge \tfrac12$时无条件稳定；向前欧拉法需要$\Delta t \le 2/\lambda_{\max}$，其中$\lambda_{\max} \sim k/(\rho c h^2)$。
- 克兰克-尼科尔森法是二阶的，但对刚性模态会振荡；向后欧拉法能衰减它们。稳定不等于精确：通过把$\Delta t$减半来检验。
:::

## 习题

::: exercise 铜杆的热导 {level=1 check="0.8"}
一根横截面积为$1.0\times10^{-4}\,\mathrm{m^2}$的铜杆（$k = 400\,\mathrm{W/m\,K}$）用长$50\,\mathrm{mm}$的单元建模。单元热导$kA/L$是多少？（以W/K为单位输入。）
::: solution
$400 \times 10^{-4}/0.05 = 0.8\,\mathrm{W/K}$。
:::
:::

::: exercise 单元中的热流密度 {level=1 check="100"}
钢（$k = 50\,\mathrm{W/m\,K}$）中一个长$10\,\mathrm{mm}$的线性单元，节点温度在$x = 0$处为$100\,^\circ\mathrm{C}$，在$x = 10\,\mathrm{mm}$处为$80\,^\circ\mathrm{C}$。单元中的热流密度$q_x$是多少？（以kW/m²为单位输入。）
::: solution
$q_x = -k\,dT/dx = -50 \times (80 - 100)/0.01 = 1.0\times10^{5}\,\mathrm{W/m^2} = 100\,\mathrm{kW/m^2}$，沿$+x$方向为正，从热端流向冷端。
:::
:::

::: exercise 显式时间步长 {level=1 check="5"}
某个采用集中热容的热网格，$\mathbf{C}^{-1}\mathbf{K}$的最大特征值为$0.4\,\mathrm{s^{-1}}$。向前欧拉法的最大稳定时间步长是多少？（以s为单位输入。）
::: solution
$\Delta t_\text{cr} = 2/\lambda_{\max} = 2/0.4 = 5\,\mathrm{s}$。
:::
:::

::: exercise 墙的表面温度 {level=2 check="6.667"}
一面厚$0.2\,\mathrm{m}$、$k = 1.0\,\mathrm{W/m\,K}$的墙，内表面为$20\,^\circ\mathrm{C}$，外表面以$h = 10\,\mathrm{W/m^2\,K}$向$0\,^\circ\mathrm{C}$的空气对流。用一个单元求外表面温度。（以°C为单位输入。）
::: solution
对单位面积，节点2的方程为$(k/L + h)T_2 = (k/L)T_1 + hT_\infty$，即$(5 + 10)T_2 = 5 \times 20$，$T_2 = 6.667\,^\circ\mathrm{C}$。校核：热阻$0.2 + 0.1 = 0.3\,\mathrm{m^2K/W}$，热流密度$66.7\,\mathrm{W/m^2}$，表面温度比环境高$66.7/10 = 6.67\,^\circ\mathrm{C}$。
:::
:::

::: exercise 单单元肋片 {level=2 check="91.346"}
验证[[#ex-fin]]的单单元结果：组装包含导热与侧面对流的$2 \times 2$矩阵，引入肋基温度，求肋端温度。（以°C为单位输入$T_\text{肋端}$。）
::: solution
第2行：$(kA/L + 2hPL/6)T_2 + (-kA/L + hPL/6)T_1 = hPLT_\infty/2$。取$kA/L = 0.078540$，$hPL/6 = 0.0032725$：$0.085085\,T_2 = 0.24544 + 0.075267 \times 100 = 7.77214$，所以$T_2 = 91.346\,^\circ\mathrm{C}$（精确值$91.511$）。
:::
:::

::: exercise 一步克兰克-尼科尔森法 {level=2 check="0.6"}
对标量方程$\dot y = -0.5\,y$，$y(0) = 1$，取$\Delta t = 1$走一步克兰克-尼科尔森法。（输入$y_1$。）与向后欧拉法以及精确值比较。
::: solution
$G = (1 - 0.25)/(1 + 0.25) = 0.6$，所以$y_1 = 0.6$。向后欧拉法：$1/1.5 = 0.6667$。精确值：$e^{-0.5} = 0.6065$。在$\lambda\Delta t$较小的这里，克兰克-尼科尔森法精确得多。
:::
:::

::: exercise 均匀网格的显式极限 {level=3 check="3.611"}
对由长为$h$的线性单元组成、采用集中热容的长均匀网格，证明最高模态是“锯齿”模态$T_j = (-1)^j$，并推导向前欧拉法的$\Delta t_\text{cr} = \rho c\,h^2/(2k)$。对钢（$k = 50\,\mathrm{W/m\,K}$，$\rho c = 3.611\times10^{6}\,\mathrm{J/m^3\,K}$）取$h = 10\,\mathrm{mm}$计算其值。（以s为单位输入$\Delta t_\text{cr}$。）
::: solution
在内部节点处，按单位面积，集中热容为$\rho ch$，热导矩阵的行为$\frac{k}{h}[-1, 2, -1]$。对$T_j = (-1)^j$，导热项为$\frac{k}{h}(2 + 1 + 1)(-1)^j = \frac{4k}{h}T_j$，所以$\lambda = 4k/(\rho ch^2)$；没有模态具有更大的$\lambda$（格什戈林（Gershgorin）定理把每个特征值都限制在$4k/\rho ch^2$以内）。因此$\Delta t_\text{cr} = 2/\lambda = \rho ch^2/(2k)$，即网格傅里叶数$\alpha\Delta t/h^2 \le \tfrac12$。对钢：$3.611\times10^6 \times 10^{-4}/100 = 3.611\,\mathrm{s}$。（[[#ex-transient]]中的两单元板有略大的极限$4.23\,\mathrm{s}$，因为它太短，容纳不下完整的锯齿模态。）$h$减半使$\Delta t_\text{cr}$缩小为1/4——这是显式方法在细网格上的代价。
:::
:::

::: exercise 作为场问题的扭转问题 {level=3}
对圣维南（Saint-Venant）扭转，普朗特应力函数$\phi$在横截面内满足$\nabla^2\phi = -2G\theta'$，在外边界上$\phi = 0$，扭矩为$T = 2\int_A\phi\,dA$。写出弱形式以及采用线性三角形单元的有限元方程，按[[#def-field]]中的比拟确定$k$、$Q$与边界条件，并解释你将如何由节点值计算扭转常数$J = T/(G\theta')$与最大切应力。
::: solution
比拟：$k = 1$，$Q = 2G\theta'$，边界上狄利克雷条件$\phi = 0$（实心截面没有诺伊曼条件）。弱形式：对在边界上$w = 0$的$w$，$\int_A\nabla w\cdot\nabla\phi\,dA = \int_A 2G\theta'\,w\,dA$。用三角形单元：$\mathbf{k}^{(e)} = \frac{1}{4A}(\mathbf{b}\mathbf{b}^{\mathsf T} + \mathbf{c}\mathbf{c}^{\mathsf T})$，$\mathbf{f}^{(e)} = \frac{2G\theta'A}{3}[1, 1, 1]^{\mathsf T}$。取$G\theta' = 1$求解较为方便。于是$T/(G\theta') = 2\sum_e\int_{A_e}\phi\,dA = 2\sum_eA_e(\phi_1 + \phi_2 + \phi_3)/3$给出$J$。切应力$\tau_{xz} = \partial\phi/\partial y$、$\tau_{yz} = -\partial\phi/\partial x$在每个三角形内为常数（按实际的$G\theta'$缩放）；最大值出现在边界上离中心最近的点处，粗网格会低估它，所以要在那里加密。对半径为$R$的圆截面，精确值$J = \pi R^4/2$是检验程序的有用基准。
:::
:::

::: exercise 散热器的热模型 {level=3}
一个带十二片矩形肋片的挤压铝散热器，通过导热垫冷却一个耗散$40\,\mathrm{W}$的电子元件。提出一个有限元模型来估计元件的外壳温度：理想化方式（二维截面还是三维）、边界条件以及如何获得对流换热系数、肋基与肋片附近的网格，以及你将进行的校核。讨论该模型能告诉你什么、不能告诉你什么。
::: solution
若热输入沿长度均匀，则取挤压型材的二维截面是合适的；长散热器上的局部元件则需要三维模型。用四边形单元模拟肋基和肋片，每片肋的厚度方向至少两三个单元，沿肋片方向要有足够的单元以捕捉指数衰减（$mL$为1的量级）；把导热垫模拟为具有其热导的薄层（或接触热导），把热输入作为元件占用面积上的热流密度。对流换热系数是主要的不确定性：可取自肋片间自然对流或强制对流的关联式（[[heat-transfer/external-convection]]、[[heat-transfer/natural-convection]]），或取自耦合的计算流体力学计算或试验；在自然对流中辐射可能占相当大的比例。校核：能量平衡（输入40 W等于对流散出的热量）；与肋效率手算结果比较；对肋基扩散区域进行网格加密；外壳温度对$h$的敏感性（往往是主要的不确定性）。该模型在**给定**$h$的条件下预测温度；它无法预测$h$本身，其精度受对流数据和导热垫热导的限制，而不是受网格的限制。
:::
:::
