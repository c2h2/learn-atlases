稳恒电流产生磁场，导论课程曾用毕奥–萨伐尔定律与安培环路定律计算这些场：圆环轴线上的场、载流直导线周围的场、螺线管内部的场（[[magnetism/biot-savart]]）。本章对静磁学所做的一切，正像 [[electrodynamics/electrostatics]] 对静电学所做的那样：把积分定律化为微分方程，引入一个势，再用这个势求解那些单靠对称性攻不破的问题——任何一个小电流环远场的场，一块永久磁铁的场，以及磁感线进入铁中时的弯折方式。

结构与静电学平行，但有两条贯穿一切的区别。第一，磁场的散度处处为零：不存在磁荷，所以势必须是一个*向量* $\mathbf A$，满足 $\mathbf B = \nabla\times\mathbf A$，而这个向量并不唯一。在不改变 $\mathbf B$ 的前提下改变它的自由，即**规范自由度**，在这里首次登场，并在 [[electrodynamics/maxwell-equations]] 与 [[electrodynamics/relativistic-fields]] 中成为核心。第二，局域电流远场的领头项是偶极子，绝不会有单极子。磁化物质的描述于是与极化物质完全类似，只不过用束缚电流代替束缚电荷，用辅助场 $\mathbf H$ 代替 $\mathbf D$。

我们取 $\mu_0 = 1.25663706212\times10^{-6}\,\mathrm{N/A^2}$（CODATA 2018；$\mu_0/4\pi = 1.00000000055\times10^{-7}$，数值计算中取整为 $10^{-7}$）。磁力定律沿用 [[magnetism/magnetic-force]]。

## 毕奥–萨伐尔定律及其微分形式 {#biot-savart}

**稳恒电流**是不随时间变化、也不在任何地方堆积电荷的电荷流。用电流密度 $\mathbf J$（垂直于流动方向的单位面积上的电流）表述，连续性方程 $\nabla\cdot\mathbf J = -\partial\rho/\partial t$ 此时给出 $\nabla\cdot\mathbf J = 0$。稳恒电流是静止电荷的磁学类比。

::: definition 毕奥–萨伐尔定律 {#def-biot-savart}
稳恒、局域的电流密度 $\mathbf J$ 产生的磁场为

$$
\mathbf B(\mathbf r) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r')\times(\mathbf r - \mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' .
$$ {#eq-biot-savart}

对载电流 $I$ 的细导线，$\mathbf J\,\dd\tau'\to I\,\dd\mathbf l'$，积分沿导线进行。
:::

这定律是一条经验陈述，和库仑定律一样：它概括了毕奥、萨伐尔与安培在 1820 年的实验。静磁学里其余的一切都由它推出。

::: theorem 静磁场的散度与旋度 {#thm-div-curl}
对稳恒、局域的电流密度，定义

$$
\mathbf A(\mathbf r) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' .
$$ {#eq-A-integral}

则 $\mathbf B = \nabla\times\mathbf A$，$\nabla\cdot\mathbf A = 0$，并且

$$
\nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf B = \mu_0\mathbf J .
$$ {#eq-ampere}
:::

::: proof
求导是对 $\mathbf r$ 作用，不是对 $\mathbf r'$。由于 $\mathbf J(\mathbf r')$ 不依赖 $\mathbf r$，乘积法则 $\nabla\times(f\mathbf J) = \nabla f\times\mathbf J$ 与 $\nabla(1/\lvert\mathbf r-\mathbf r'\rvert) = -(\mathbf r-\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert^3$ 给出

$$
\nabla\times\frac{\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert} = -\frac{(\mathbf r - \mathbf r')\times\mathbf J(\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3} = \frac{\mathbf J(\mathbf r')\times(\mathbf r-\mathbf r')}{\lvert\mathbf r-\mathbf r'\rvert^3}.
$$

对 $\mathbf r'$ 积分就重现 [[#eq-biot-savart]]，所以 $\mathbf B = \nabla\times\mathbf A$，于是 $\nabla\cdot\mathbf B = \nabla\cdot(\nabla\times\mathbf A) = 0$。

至于 $\mathbf A$ 的散度，用 $\nabla(1/\lvert\mathbf r-\mathbf r'\rvert) = -\nabla'(1/\lvert\mathbf r-\mathbf r'\rvert)$：

$$
\nabla\cdot\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf J\cdot\nabla\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' = -\frac{\mu_0}{4\pi}\int\left[\nabla'\cdot\frac{\mathbf J}{\lvert\mathbf r-\mathbf r'\rvert} - \frac{\nabla'\cdot\mathbf J}{\lvert\mathbf r-\mathbf r'\rvert}\right]\dd\tau' .
$$

第二项为零，因为稳恒电流满足 $\nabla'\cdot\mathbf J = 0$。第一项由散度定理化为对一张面包围全部电流的面积分，而在该面上 $\mathbf J = \mathbf 0$。所以 $\nabla\cdot\mathbf A = 0$。

最后，$\nabla\times\mathbf B = \nabla\times(\nabla\times\mathbf A) = \nabla(\nabla\cdot\mathbf A) - \nabla^2\mathbf A = -\nabla^2\mathbf A$。$\mathbf A$ 的每个笛卡儿分量都是一个像 [[electrodynamics/electrostatics#eq-coulomb-int]] 那样的库仑积分，只是把 $\rho/\varepsilon_0$ 换成了 $\mu_0J_i$，所以由同一个恒等式 $\nabla^2(1/\lvert\mathbf r-\mathbf r'\rvert) = -4\pi\delta^3(\mathbf r-\mathbf r')$ 得 $\nabla^2A_i = -\mu_0J_i$。故 $\nabla\times\mathbf B = \mu_0\mathbf J$。
:::

把斯托克斯定理用于 $\nabla\times\mathbf B = \mu_0\mathbf J$、对任何以闭合回路为边界的曲面积分，就得到积分形式的**安培环路定律** $\oint\mathbf B\cdot\dd\mathbf l = \mu_0I_{\mathrm{enc}}$。积分形式只有当对称性告诉你 $\lvert\mathbf B\rvert$ 沿某条合适的回路为常量时才是一个计算工具；微分形式则在任何一点都成立。

::: warning 安培环路定律是一条静磁学定律
上面的推导用了 $\nabla\cdot\mathbf J = 0$。如果某处电荷正在堆积——比如充电中的电容器的极板上——那么 $\nabla\cdot(\nabla\times\mathbf B) = 0$ 与 $\nabla\cdot(\mu_0\mathbf J)\ne0$ 不相容，$\nabla\times\mathbf B = \mu_0\mathbf J$ 干脆就是错的。麦克斯韦的补救，位移电流，正是 [[electrodynamics/maxwell-equations]] 的第一步。在本章范围内，电流是稳恒的。
:::

## 矢量势与规范自由度 {#vector-potential}

静电学里的势只差一个常量。矢量势的自由度大得多。因为梯度的旋度为零，变换

$$
\mathbf A\to\mathbf A' = \mathbf A + \nabla\lambda
$$ {#eq-gauge}

对任何可微函数 $\lambda$ 都保持 $\mathbf B = \nabla\times\mathbf A$ 不变。这样的改变称为**规范变换**。[[#eq-A-integral]] 那个特定的 $\mathbf A$ 散度为零，而这种选择总可以做到。

::: definition 库仑规范与矢量泊松方程 {#def-coulomb-gauge}
满足 $\nabla\cdot\mathbf A = 0$ 的矢量势称为处于**库仑规范**。在该规范下，安培环路定律 $\nabla\times\mathbf B = \mu_0\mathbf J$ 化为

$$
\nabla^2\mathbf A = -\mu_0\mathbf J ,
$$ {#eq-vec-poisson}

即三条泊松方程，每个笛卡儿分量一条。
:::

方程 [[#eq-vec-poisson]] 把静磁学安置在与 [[electrodynamics/electrostatics#eq-poisson]] 相同的地基上：每个笛卡儿分量 $A_i$ 服从一条源为 $\mu_0J_i$ 的标量泊松方程。那一章的整套理论全部适用，特别是每个分量在无穷远处 $\mathbf A\to\mathbf 0$ 条件下的唯一性 [[electrodynamics/electrostatics#thm-unique]]；[[#eq-A-integral]] 就是全空间的解。注意"笛卡儿"这个词要紧：在曲线坐标里，$\nabla^2\mathbf A$ 并不是把标量拉普拉斯算符分别作用在 $A_r$、$A_\theta$、$A_\phi$ 上。

还有两个事实往往比 [[#eq-A-integral]] 本身更有用。斯托克斯定理给出以回路 $C$ 为边的任何曲面 $S$ 的通量

$$
\Phi_B = \int_S\mathbf B\cdot\dd\mathbf a = \oint_C\mathbf A\cdot\dd\mathbf l ,
$$ {#eq-flux-A}

所以 $\mathbf A$ 之于磁通量，正如 $\mathbf B$ 之于安培环路定律中的电流。而在库仑规范下，正如 [[#eq-A-integral]] 所示，$\mathbf A$ 倾向于沿着产生它的电流的方向：矢量势"复制"它的源。

::: example 匀强场的矢量势 {#ex-uniform-A}
证明 $\mathbf A = \tfrac12\mathbf B_0\times\mathbf r$ 描述匀强场 $\mathbf B_0$，且处于库仑规范；并证明 $\mathbf A' = B_0x\,\hat{\mathbf y}$（对应 $\mathbf B_0 = B_0\hat{\mathbf z}$）描述同一个场。求联系二者的规范函数。
::: solution
取 $\mathbf B_0 = B_0\hat{\mathbf z}$，$\mathbf A = \tfrac12B_0\hat{\mathbf z}\times(x,y,z) = \tfrac12B_0(-y, x, 0)$。于是

$$
\nabla\times\mathbf A = \left(\partial_yA_z - \partial_zA_y,\ \partial_zA_x - \partial_xA_z,\ \partial_xA_y - \partial_yA_x\right) = \bigl(0, 0, \tfrac12B_0 + \tfrac12B_0\bigr) = B_0\hat{\mathbf z},
$$

且 $\nabla\cdot\mathbf A = \partial_x(-\tfrac12B_0y) + \partial_y(\tfrac12B_0x) = 0$。对 $\mathbf A' = (0, B_0x, 0)$，$\nabla\times\mathbf A' = (0, 0, \partial_x(B_0x)) = B_0\hat{\mathbf z}$，并且 $\nabla\cdot\mathbf A' = 0$ 也成立。二者之差为

$$
\mathbf A' - \mathbf A = \bigl(\tfrac12B_0y,\ \tfrac12B_0x,\ 0\bigr) = \nabla\left(\tfrac12B_0xy\right),
$$

所以 $\lambda = \tfrac12B_0xy$。这个 $\lambda$ 是调和的（$\nabla^2(xy) = 0$），这正是两个势都处于库仑规范的原因：库仑条件只把 $\mathbf A$ 确定到可差一个调和函数的梯度，而这一剩余自由度只有当我们要求 $\mathbf A\to\mathbf 0$（无穷远处）时才消失——匀强场无法满足这一条件。第一种形式称为**对称规范**，第二种称为**朗道规范**，二者在磁场中电子的量子理论里都是标准选择。
:::
:::

::: example 长螺线管的矢量势 {#ex-solenoid-A}
半径 $R$、单位长度 $n$ 匝的长螺线管通电流 $I$。求管内外的 $\mathbf A$。
::: solution
管内 $\mathbf B = \mu_0nI\hat{\mathbf z}$，管外 $\mathbf B = \mathbf 0$（[[magnetism/biot-savart]]）。电流沿方位角方向流动，所以 $\mathbf A$ 也应当如此：$\mathbf A = A(s)\hat{\boldsymbol\phi}$，$s$ 为到轴线的距离。把 [[#eq-flux-A]] 用于以轴线为心、半径 $s$ 的圆。对 $s<R$，

$$
A(s)\,2\pi s = \mu_0nI\,\pi s^2, \qquad A(s) = \frac{\mu_0nIs}{2}.
$$

对 $s>R$，穿过的通量是全部通量 $\mu_0nI\pi R^2$，所以

$$
A(s) = \frac{\mu_0nIR^2}{2s}.
$$

两个表达式的散度都为零，因为 $\nabla\cdot(A(s)\hat{\boldsymbol\phi}) = s^{-1}\partial_\phi A = 0$。管内正是 [[#ex-uniform-A]] 的对称规范。管外 $\mathbf B = \mathbf 0$ 而 $\mathbf A\ne\mathbf 0$。局域地看它是纯规范：$\mathbf A = \nabla\bigl(\Phi_B\phi/2\pi\bigr)$，$\phi$ 是方位角。整体上则不是，因为 $\phi$ 不是单值的，而绕螺线管一周的线积分是被囚禁的通量 $\Phi_B$。经典地，管外的电荷不受力。量子地，电子波函数绕螺线管一周的相位改变 $e\Phi_B/\hbar$，即阿哈罗诺夫–玻姆（Aharonov–Bohm）效应（1959），1960 年得到实验观测，1986 年得到决定性验证。
:::
:::

::: quiz
空间某区域中 $\mathbf A = k(y\,\hat{\mathbf x} - x\,\hat{\mathbf y})$，$k$ 为常量。哪些说法是对的？
- [x] $\mathbf B = -2k\,\hat{\mathbf z}$，是一个匀强场。
- [ ] $\mathbf B = \mathbf 0$，因为 $\mathbf A$ 没有 $z$ 分量。
- [x] $\mathbf A$ 满足库仑规范条件。
- [ ] 给 $\mathbf A$ 加上 $\nabla(xyz)$ 会改变 $\mathbf B$。
::: solution
旋度的 $z$ 分量是 $\partial_xA_y - \partial_yA_x = -k - k = -2k$；其余分量为零。散度是 $\partial_x(ky) + \partial_y(-kx) = 0$。由 [[#eq-gauge]]，加上任何梯度都不改变旋度；$\nabla(xyz) = (yz, xz, xy)$ 的散度也是 $0$，所以连库仑规范在这种改变下也保持不变。
:::
:::

## 磁偶极子 {#dipole}

远离局域电流分布时，把 [[#eq-A-integral]] 按 $r'/r$ 的幂展开，做法与标量势在 [[electrodynamics/electrostatics]] 中的展开完全一样。对载电流 $I$ 的单个环，

$$
\mathbf A(\mathbf r) = \frac{\mu_0I}{4\pi}\oint\frac{\dd\mathbf l'}{\lvert\mathbf r-\mathbf r'\rvert} = \frac{\mu_0I}{4\pi}\sum_{l=0}^\infty\frac{1}{r^{l+1}}\oint(r')^lP_l(\cos\alpha)\,\dd\mathbf l' ,
$$

其中 $\alpha$ 是 $\mathbf r$ 与 $\mathbf r'$ 的夹角。$l = 0$ 项是 $\frac{\mu_0I}{4\pi r}\oint\dd\mathbf l'$，而 $\dd\mathbf l'$ 沿闭合环的积分为零。*不存在磁单极项。*由于任何稳恒电流分布都可以分解为闭合环，这一结论普遍成立。

::: theorem 磁偶极子 {#thm-mag-dipole}
对载电流 $I$ 的环，定义**磁偶极矩** $\mathbf m = I\mathbf a$，其中 $\mathbf a = \tfrac12\oint\mathbf r'\times\dd\mathbf l'$ 是环的**矢量面积**（对平面环，就是面积乘右手定则给出的单位法向）。$r$ 远大于环尺寸时矢量势的领头项为

$$
\mathbf A_{\mathrm{dip}}(\mathbf r) = \frac{\mu_0}{4\pi}\frac{\mathbf m\times\hat{\mathbf r}}{r^2},
$$ {#eq-A-dip}

相应的场为

$$
\mathbf B_{\mathrm{dip}}(\mathbf r) = \frac{\mu_0}{4\pi}\frac{3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf m}{r^3}.
$$ {#eq-B-dip}

对一般电流密度，$\mathbf m = \tfrac12\int\mathbf r'\times\mathbf J\,\dd\tau'$。
:::

::: proof
$l = 1$ 项是 $\frac{\mu_0I}{4\pi r^2}\oint(\hat{\mathbf r}\cdot\mathbf r')\,\dd\mathbf l'$。斯托克斯定理的一条推论说，对标量函数 $T$ 有 $\oint T\,\dd\mathbf l = \int_S\dd\mathbf a\times\nabla T$。取 $T(\mathbf r') = \hat{\mathbf r}\cdot\mathbf r'$，$\hat{\mathbf r}$ 固定，故 $\nabla'T = \hat{\mathbf r}$：

$$
\oint(\hat{\mathbf r}\cdot\mathbf r')\,\dd\mathbf l' = \int_S\dd\mathbf a'\times\hat{\mathbf r} = \mathbf a\times\hat{\mathbf r},
$$

其中 $\mathbf a = \int_S\dd\mathbf a'$ 只依赖边界回路，并等于 $\tfrac12\oint\mathbf r'\times\dd\mathbf l'$（对同一推论逐分量使用，或对平面多边形验证）。于是 $\mathbf A = \frac{\mu_0}{4\pi r^2}I\mathbf a\times\hat{\mathbf r}$，即 [[#eq-A-dip]]。

至于场，把 $\mathbf m = m\hat{\mathbf z}$ 放在原点。此时 $\mathbf m\times\hat{\mathbf r} = m\sin\theta\,\hat{\boldsymbol\phi}$，$\mathbf A = \frac{\mu_0m\sin\theta}{4\pi r^2}\hat{\boldsymbol\phi}$。只有 $A_\phi$ 分量的场在球坐标下的旋度是

$$
B_r = \frac{1}{r\sin\theta}\partial_\theta(\sin\theta\,A_\phi) = \frac{\mu_0}{4\pi}\frac{2m\cos\theta}{r^3}, \qquad B_\theta = -\frac1r\partial_r(rA_\phi) = \frac{\mu_0}{4\pi}\frac{m\sin\theta}{r^3}.
$$

这正是 [[#eq-B-dip]] 的分量，把 $\mathbf m = m(\cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta})$ 写出来即可看出。
:::

在源外，磁偶极场与电偶极场 [[electrodynamics/electrostatics#eq-dipole-field]] 的形式完全相同，只要把 $\mathbf p/\varepsilon_0\to\mu_0\mathbf m$。两者的差别只在源处：在一个微弱的电容器式电偶极子的两极板之间，场从 $+$ 指向 $-$，与 $\mathbf p$ 反向；而在一个微弱电流环的内部，场沿 $\mathbf m$ 方向。这就是条形磁铁内部的场从南极走到北极、把外部的磁感线闭合成环的原因，也是铁磁体用电流环而不是用成对磁荷来描述的原因。

::: widget plot
f: 1/(1 + x^2)^1.5; 1/x^3
x: 0.2, 5
y: 0, 1.5
labels: 圆环电流，轴线上精确值; 偶极近似
caption: 半径 $R$ 的圆环电流轴线上的场，以中心处的值 $\mu_0I/2R$ 为单位，对 $z/R$ 作图。精确结果 $(1 + z^2/R^2)^{-3/2}$ 在中心处有限；偶极公式 [[#eq-B-dip]] 在这些单位下是 $R^3/z^3$，在那里发散。读出二者一致的位置：$z = 2R$ 处偶极公式高出 $40\%$，$z = 5R$ 处只高 $6\%$，误差按 $\tfrac32(R/z)^2$ 衰减。偶极描述是任何形状圆环电流的远场。
:::

::: example 地球的磁偶极矩 {#ex-earth}
地球表面在磁赤道处的磁场约为 $3.0\times10^{-5}\,\mathrm{T}$。把场当作球心的一个偶极子的场，估算地球的磁偶极矩与磁极处的场。取 $R_\oplus = 6.371\times10^{6}\,\mathrm{m}$。
::: solution
赤道处 $\mathbf m\cdot\hat{\mathbf r} = 0$，[[#eq-B-dip]] 给出大小为 $\mu_0m/(4\pi r^3)$、与 $\mathbf m$ 反向的场。因此

$$
m = \frac{4\pi R_\oplus^3B_{\mathrm{eq}}}{\mu_0} = \frac{(6.371\times10^{6})^3(3.0\times10^{-5})}{1.0\times10^{-7}} = 7.8\times10^{22}\,\mathrm{A\,m^2}.
$$

公认值约为 $8.0\times10^{22}\,\mathrm{A\,m^2}$；赤道处的表面磁场随地点有百分之几十的变化，因为场还有非偶极成分。两极处 $\mathbf m\cdot\hat{\mathbf r} = \pm m$，大小为 $2\mu_0m/(4\pi r^3) = 2B_{\mathrm{eq}} = 6.0\times10^{-5}\,\mathrm{T}$，与地磁极附近的观测相符。赤道处的场指向北方，这意味着 $\mathbf m$ 指向南方：地球的地理北极在偶极子的磁南极附近，所以磁针的北端被它吸引。
:::
:::

::: example 电子的轨道磁矩 {#ex-bohr}
在氢原子的玻尔模型中，电子沿半径 $a_0 = 5.29\times10^{-11}\,\mathrm{m}$ 的圆运动，角动量 $L = \hbar$。求电流、磁矩以及比值 $m/L$。再求这一电流在质子处产生的场。
::: solution
速率为 $v$ 的电子沿半径 $a_0$ 的圆运动，每秒经过某一点 $v/(2\pi a_0)$ 次，所以电流大小为 $I = ev/(2\pi a_0)$。环的面积为 $\pi a_0^2$，于是

$$
m = I\pi a_0^2 = \frac{eva_0}{2} = \frac{e}{2m_e}(m_eva_0) = \frac{e}{2m_e}L .
$$

比值 $m/L = e/(2m_e)$ 就是经典的**旋磁比**；它不依赖半径与速率，所以对任何圆轨道成立，并且由叠加原理对任何轨道运动成立。电子带负电，所以 $\mathbf m = -(e/2m_e)\mathbf L$ 与 $\mathbf L$ 反向。取 $L = \hbar$，

$$
m = \frac{e\hbar}{2m_e} = \frac{(1.602\times10^{-19})(1.0546\times10^{-34})}{2(9.109\times10^{-31})} = 9.274\times10^{-24}\,\mathrm{A\,m^2},
$$

即**玻尔磁子** $\mu_B$。速率为 $v = \hbar/(m_ea_0) = 2.19\times10^{6}\,\mathrm{m/s}$，所以 $I = 1.05\,\mathrm{mA}$，对一个电子而言是相当大的电流。环心处 $B = \mu_0I/(2a_0) = 12.5\,\mathrm{T}$。这个内部磁场作用于电子自身的自旋磁矩（也约为一个玻尔磁子，不过 $g\approx2$），是 [[quantum-2]] 中精细结构的起源。
:::
:::

偶极子在外场中的能量为 $U = -\mathbf m\cdot\mathbf B$，受到力矩 $\mathbf m\times\mathbf B$，在非均匀场中还受力 $\mathbf F = \nabla(\mathbf m\cdot\mathbf B)$（[[magnetism/magnetic-force]]）。1922 年的施特恩–格拉赫（Stern–Gerlach）实验测量的正是这个力，其量子化的结果在 [[quantum-1]] 中讨论。

## 磁化物质 {#magnetisation}

物质的每个原子都是一个微小的电流环，来自轨道电子，而在铁中更重要的是电子自旋。外场中环趋向排列，产生**顺磁性**；场还改变轨道运动，产生**抗磁性**，即与场反向的感应磁矩。铁磁体中相邻自旋自发排列。

::: definition 磁化强度与束缚电流 {#def-magnetisation}
**磁化强度** $\mathbf M$ 是单位体积的磁偶极矩，单位 $\mathrm{A/m}$。磁化物体产生的矢量势与**束缚电流**

$$
\mathbf J_b = \nabla\times\mathbf M \quad\text{（在体积内）}, \qquad \mathbf K_b = \mathbf M\times\hat{\mathbf n} \quad\text{（在表面上）},
$$ {#eq-bound-current}

产生的相同，其中 $\hat{\mathbf n}$ 是外法向。
:::

推导与束缚电荷的推导平行。把 [[#eq-A-dip]] 中的 $\mathbf m\to\mathbf M\,\dd\tau'$ 叠加，

$$
\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf M(\mathbf r')\times\frac{\mathbf r-\mathbf r'}{\lvert\mathbf r-\mathbf r'\rvert^3}\,\dd\tau' = \frac{\mu_0}{4\pi}\int\mathbf M\times\nabla'\frac{1}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau'.
$$

乘积法则 $\nabla'\times(f\mathbf M) = f\nabla'\times\mathbf M - \mathbf M\times\nabla'f$ 与恒等式 $\int_V\nabla\times\mathbf F\,\dd\tau = -\oint_S\mathbf F\times\dd\mathbf a$ 把它化为

$$
\mathbf A = \frac{\mu_0}{4\pi}\int\frac{\nabla'\times\mathbf M}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau' + \frac{\mu_0}{4\pi}\oint\frac{\mathbf M\times\hat{\mathbf n}'}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd a',
$$

这正是电流 [[#eq-bound-current]] 的 [[#eq-A-integral]]。图像是：均匀磁化的板中，相邻原子环在内部彼此抵消，只有表面未配对的边缘作为一层电流保留下来。

### 辅助场 $\mathbf H$ {#H}

安培环路定律数的是全部电流：$\nabla\times\mathbf B = \mu_0(\mathbf J_f + \nabla\times\mathbf M)$，其中 $\mathbf J_f$ 是导线中的**自由电流**。把旋度收集到一起，

$$
\mathbf H = \frac{\mathbf B}{\mu_0} - \mathbf M, \qquad \nabla\times\mathbf H = \mathbf J_f, \qquad \oint\mathbf H\cdot\dd\mathbf l = I_{f,\mathrm{enc}} .
$$ {#eq-H}

**线性**介质中 $\mathbf M = \chi_m\mathbf H$，于是 $\mathbf B = \mu_0(1+\chi_m)\mathbf H = \mu\mathbf H$，**磁导率** $\mu = \mu_0\mu_r$。顺磁质的 $\chi_m$ 为小正数（铝约 $2\times10^{-5}$），抗磁质的 $\chi_m$ 为小负数（水约 $-9\times10^{-6}$，铋约 $-1.7\times10^{-4}$）。铁磁体不是线性的：$\mathbf M$ 依赖样品的历史（磁滞），软铁那"几千"的 $\mu_r$ 不过是这条曲线上某一支的斜率。

辅助场之于 $\mathbf B$，正如 $\mathbf D$ 之于 $\mathbf E$，警告也同样适用。$\nabla\cdot\mathbf H = -\nabla\cdot\mathbf M$ 未必为零，所以 $\mathbf H$ 并不由自由电流单独决定。一根条形磁铁完全没有自由电流，却有很大的 $\mathbf H$。

### 边界条件 {#bc}

在载有面电流密度 $\mathbf K$ 的表面上，高斯扁圆柱与 $\nabla\cdot\mathbf B = 0$ 给出法向分量连续，安培回路给出切向分量的跃变。以 $\hat{\mathbf n}$ 为从介质 1 指向介质 2 的单位法向，

$$
B_2^\perp = B_1^\perp, \qquad \mathbf B_2^\parallel - \mathbf B_1^\parallel = \mu_0\mathbf K\times\hat{\mathbf n}, \qquad \mathbf H_2^\parallel - \mathbf H_1^\parallel = \mathbf K_f\times\hat{\mathbf n}.
$$ {#eq-bc-B}

矢量势在面上连续（在库仑规范下），而其法向导数跃变 $-\mu_0\mathbf K$。两种线性介质之间没有自由面电流时，$B^\perp$ 与 $H^\parallel$ 连续。若一条磁感线在介质 1 中与法向成角 $\theta_1$、在介质 2 中成 $\theta_2$，

$$
\frac{\tan\theta_2}{\tan\theta_1} = \frac{B_2^\parallel/B^\perp}{B_1^\parallel/B^\perp} = \frac{\mu_2H^\parallel}{\mu_1H^\parallel} = \frac{\mu_2}{\mu_1},
$$ {#eq-refraction-B}

所以离开铁的磁感线几乎正好沿法向射出。电磁铁的极掌之所以能塑造间隙中的场，原因就在这里：铁表面几乎是磁标势的等势面，正如导体在静电学中的角色。

::: example 面电流层 {#ex-sheet}
平面 $z = 0$ 载有均匀面电流 $\mathbf K = K\hat{\mathbf x}$。求两侧的 $\mathbf B$ 并检验 [[#eq-bc-B]]。
::: solution
由毕奥–萨伐尔定律，$\pm y$ 处成对的窄条抵消一切 $z$ 分量，而沿 $x$ 的电流不产生 $x$ 分量。所以 $\mathbf B = B(z)\hat{\mathbf y}$，由对平面的反射对称性 $B(-z) = -B(z)$。把安培环路定律用于 $yz$ 平面内高为 $2z$、平行于 $y$ 的边长为 $\ell$ 的矩形。穿过矩形的电流是 $K\ell$，环量的大小为 $2B\ell$，所以 $\lvert B\rvert = \mu_0K/2$。右手定则确定符号：

$$
\mathbf B = -\frac{\mu_0K}{2}\hat{\mathbf y}\ (z>0), \qquad \mathbf B = +\frac{\mu_0K}{2}\hat{\mathbf y}\ (z<0).
$$

取 $\hat{\mathbf n} = \hat{\mathbf z}$ 从下方指向上方，$\mathbf B_2^\parallel - \mathbf B_1^\parallel = -\mu_0K\hat{\mathbf y}$，而 $\mu_0\mathbf K\times\hat{\mathbf n} = \mu_0K\,\hat{\mathbf x}\times\hat{\mathbf z} = -\mu_0K\hat{\mathbf y}$，与 [[#eq-bc-B]] 一致。法向分量两侧都为零，自然连续。场在每一侧都是均匀的，与距离无关，恰如带电平面的电场。
:::
:::

::: quiz
一条磁感线从软铁（$\mu_r = 2000$）射出进入空气，在铁中与表面法向成 $60^\circ$。没有自由面电流。空气中磁感线的方向哪个说法对？
- [x] 它与法向的偏差不到一度的一小部分。
- [ ] 它与法向成 $60^\circ$，因为 $\mathbf B$ 连续。
- [ ] 它几乎与表面相切。
- [ ] 它的切向 $\mathbf B$ 不变。
::: solution
由 [[#eq-refraction-B]]，$\tan\theta_{\mathrm{air}} = \tan60^\circ/2000 = 8.7\times10^{-4}$，所以 $\theta_{\mathrm{air}} = 0.05^\circ$。连续的只有 $B^\perp$；$B^\parallel$ 缩小 $\mu_r$ 倍，因为连续的是 $H^\parallel$。
:::
:::

### 磁标势与均匀磁化球 {#sphere}

在没有自由电流的地方，$\nabla\times\mathbf H = \mathbf 0$，可以写 $\mathbf H = -\nabla\Phi_M$。于是 $\nabla\cdot\mathbf B = 0$ 给出

$$
\nabla^2\Phi_M = \nabla\cdot\mathbf M ,
$$

这就是静电学问题，只要 $\mathbf E\to\mathbf H$、$\mathbf P/\varepsilon_0\to\mathbf M$，并且引入"等效磁荷" $\rho_M = -\nabla\cdot\mathbf M$ 与 $\sigma_M = \mathbf M\cdot\hat{\mathbf n}$。磁荷是虚构的，但它们让静电学的每一种技术都可用。

::: example 均匀磁化球 {#ex-magnet-sphere}
半径 $R$ 的球具有均匀磁化强度 $\mathbf M = M\hat{\mathbf z}$，无自由电流。求球内外的 $\mathbf H$ 与 $\mathbf B$，并对 $M = 1.0\times10^6\,\mathrm{A/m}$ 的钕磁铁求内部的 $B$。
::: solution
球内 $\nabla\cdot\mathbf M = 0$，所以唯一的磁荷是面上的 $\sigma_M = M\cos\theta$，$\Phi_M$ 在球内外都调和。取拉普拉斯方程在球心与无穷远都正则的 $l = 1$ 解：

$$
\Phi_{\mathrm{in}} = C\,r\cos\theta, \qquad \Phi_{\mathrm{out}} = \frac{D\cos\theta}{r^2}.
$$

$\Phi_M$ 在 $r = R$ 处的连续性给出 $CR = D/R^2$。面磁荷使法向导数发生跃变，正如 $\sigma/\varepsilon_0$ 对 $V$ 所做的那样：$-\partial_r\Phi_{\mathrm{out}} + \partial_r\Phi_{\mathrm{in}} = \sigma_M$（在 $r = R$ 处），即

$$
\left(\frac{2D}{R^3} + C\right)\cos\theta = M\cos\theta .
$$

代入 $D = CR^3$ 得 $3C = M$，所以 $C = M/3$。球内 $\mathbf H = -\nabla(Cz) = -\tfrac13\mathbf M$，均匀且与磁化强度反向（**退磁场**），并且

$$
\mathbf B_{\mathrm{in}} = \mu_0(\mathbf H + \mathbf M) = \frac{2}{3}\mu_0\mathbf M .
$$

球外，$\Phi_{\mathrm{out}} = MR^3\cos\theta/(3r^2)$ 是磁矩为 $\mathbf m = \tfrac43\pi R^3\mathbf M$（球的总磁矩）的偶极子的势，$\mathbf B = \mu_0\mathbf H$ 是偶极场 [[#eq-B-dip]]。检验边界条件：在极点处 $B_r^{\mathrm{out}} = \mu_0\cdot2D/R^3 = \tfrac23\mu_0M = B_r^{\mathrm{in}}$，所以 $B^\perp$ 连续，符合 [[#eq-bc-B]] 的要求。对这块磁铁，

$$
B_{\mathrm{in}} = \tfrac23(4\pi\times10^{-7})(1.0\times10^{6}) = 0.84\,\mathrm{T}.
$$

束缚面电流 $\mathbf K_b = \mathbf M\times\hat{\mathbf r} = M\sin\theta\,\hat{\boldsymbol\phi}$ 与均匀带电旋转球面的相同，因此后者的场也相同（见习题）。
:::
:::

均匀场中的线性磁介质球，不过是 [[electrodynamics/electrostatics]] 的电介质球换了衣裳。自由电流外 $\mathbf H = -\nabla\Phi_M$，$\Phi_M$ 在每个区域调和，$\Phi_M$ 连续，而 $B^\perp = \mu H^\perp$ 的连续性取代 $D^\perp = \varepsilon E^\perp$ 的连续性。因此代数与 $\varepsilon_r\to\mu_r$、$\mathbf E\to\mathbf H$ 完全相同，球内的场是匀强的：

$$
\mathbf H_{\mathrm{in}} = \frac{3}{\mu_r+2}\mathbf H_0, \qquad \mathbf B_{\mathrm{in}} = \frac{3\mu_r}{\mu_r+2}\mathbf B_0 .
$$ {#eq-linear-sphere}

$\mu_r\to\infty$ 时 $\mathbf B_{\mathrm{in}}\to3\mathbf B_0$：铁把磁感线揽向自己。而一层高磁导率材料的**球壳**对它内部的空腔做相反的事。磁感线宁愿从金属里绕行，空腔中的场被削弱。对内外半径 $a$、$b$ 的球壳的三个区域解 $\Phi_M$ 的拉普拉斯方程（Jackson §5.12）得

$$
\frac{B_{\mathrm{in}}}{B_0} = \frac{9\mu_r}{(2\mu_r+1)(\mu_r+2) - 2(a/b)^3(\mu_r-1)^2}\approx\frac{9}{2\mu_r\bigl(1 - a^3/b^3\bigr)}\quad(\mu_r\gg1).
$$ {#eq-shield}

::: application 磁屏蔽
半径 $10.0\,\mathrm{cm}$、壁厚 $1.0\,\mathrm{mm}$ 的 μ金属（mu-metal，$\mu_r\approx2\times10^4$）球壳，$1 - a^3/b^3 = 1 - 0.990^3 = 0.0297$，[[#eq-shield]] 给出 $B_{\mathrm{in}}/B_0\approx9/(2\times2\times10^4\times0.0297) = 7.6\times10^{-3}$：内部的磁场降到约 $0.4\,\mu\mathrm{T}$。同心套叠的球壳把各自的因子相乘，测量中子电偶极矩与脑磁图所用的静磁房间就是这样把剩余场压到纳特斯拉量级的。静磁场的屏蔽需要磁导率而不是电导率；一只薄铜盒在 $50\,\mathrm{Hz}$ 下几乎无济于事，道理在 [[electrodynamics/waves-in-media]] 中解释。
:::

## 亥姆霍兹线圈 {#helmholtz}

轴线磁场的一个实用例子：一对半径 $R$ 的相同同轴圆环通同向等大电流，当间距等于 $R$ 时，中点附近的场均匀得出奇。由对称性，轴线上的场关于中点是 $z$ 的偶函数，所以一阶导数在中点为零。间距可以选得让二阶导数也为零。

::: proposition 亥姆霍兹条件 {#prop-helmholtz}
半径 $R$、位于 $z = \pm d/2$ 的两个同轴圆环，中点处轴向磁场满足 $\partial_z^2B_z = 0$ 当且仅当 $d = R$。此时该处的场为

$$
B_0 = \left(\frac45\right)^{3/2}\frac{\mu_0NI}{R}
$$ {#eq-helmholtz}

对每线圈 $N$ 匝成立，首个非零修正为 $(z/R)^4$ 量级。
:::

::: proof
位于 $z = 0$ 的单个圆环在其轴上产生 $B(z) = \frac{\mu_0IR^2}{2}(R^2+z^2)^{-3/2}$。它的二阶导数是

$$
B''(z) = \frac{\mu_0IR^2}{2}\cdot 3\,(R^2+z^2)^{-7/2}\,(4z^2 - R^2),
$$

因为对 $(R^2+z^2)^{-3/2}$ 求两次导数得 $-3(R^2+z^2)^{-5/2} + 15z^2(R^2+z^2)^{-7/2} = 3(4z^2-R^2)(R^2+z^2)^{-7/2}$。圆环对在中点的场是 $B(z\mp d/2)$ 之和在 $z = 0$ 处的值，由对称性两项的二阶导数相同，都是 $B''(d/2)$。它在 $4(d/2)^2 = R^2$ 即 $d = R$ 时为零。奇阶导数由对称性相消，所以下一项是四阶。$d = R$ 时每个圆环贡献 $\frac{\mu_0NIR^2}{2}(R^2 + R^2/4)^{-3/2} = \frac{\mu_0NI}{2R}(4/5)^{3/2}$，加倍即得 [[#eq-helmholtz]]。
:::

::: widget plot
f: (1/(1 + (x - d/2)^2)^1.5 + 1/(1 + (x + d/2)^2)^1.5)/(2/(1 + d^2/4)^1.5)
x: -1.5, 1.5
y: 0, 1.4
sliders: d=1:0.2:2.5:0.05
labels: 双线圈的 B(z)/B(0)
caption: 半径 $R$、间距 $d$（都以 $R$ 为单位）的两个同轴圆环的轴向场，以中点处的值归一化，对 $z/R$ 作图。在 $d = 1$、即亥姆霍兹间距处，曲线到 $z = 0.1R$ 平坦优于 $0.02\%$，到 $0.2R$ 优于 $0.2\%$。把 $d$ 拖到 $1$ 以上，中心出现凹陷、两侧靠近线圈处出现两个极大；拖到 $1$ 以下，曲线变成单峰。平顶是二阶导数相消的结果，只剩下四阶项。
:::

::: example 实验室用的亥姆霍兹线圈 {#ex-helmholtz}
一对亥姆霍兹线圈半径 $15.0\,\mathrm{cm}$，每线圈 $100$ 匝，通 $2.00\,\mathrm{A}$。求中心处的场，并与单个线圈比较。
::: solution
由 [[#eq-helmholtz]]，

$$
B_0 = (0.8)^{3/2}\frac{(4\pi\times10^{-7})(100)(2.00)}{0.150} = (0.7155)(1.676\times10^{-3}) = 1.20\times10^{-3}\,\mathrm{T}.
$$

单个线圈在自身中心给出 $\mu_0NI/(2R) = 8.38\times10^{-4}\,\mathrm{T}$。圆环对在中点给出 $1.43$ 倍，不是两倍：每个线圈距中点 $R/2$，那里的轴向场已降到中心值的 $(4/5)^{3/2} = 0.716$。这套安排的要点是均匀性，不是强度。中心外半径 $0.1R = 1.5\,\mathrm{cm}$ 的球内场的变化约万分之一，这就是此类线圈被用来围绕敏感实验抵消地磁场（$5\times10^{-5}\,\mathrm{T}$，这里只需约 $0.08\,\mathrm{A}$）的原因。
:::
:::

::: history 电流与磁体，1820–1865
1820 年 4 月，汉斯·克里斯蒂安·奥斯特（Hans Christian Ørsted）注意到电流使磁针偏转；他 1820 年 7 月发表的拉丁文小册子在数周内传遍欧洲。1820 年 10 月，让-巴蒂斯特·毕奥（Jean-Baptiste Biot）与费利克斯·萨伐尔（Félix Savart）测量了长直导线的场随距离的衰减，以他们名字命名的定律正是这些实验的结晶。安德烈-马里·安培（André-Marie Ampère）同年秋天着手研究电流之间的力，提出物质中的磁性源于微小的环流，并在 1826 年的回忆录中总结了工作。西莫恩·德尼·泊松（Siméon Denis Poisson）1824 年建立了以虚构磁荷处理磁化体的理论，是本章所用标量势的先声。迈克尔·法拉第（Michael Faraday）1831 年发现感应后，谈到电流附近物质处于一种"电紧张态"。詹姆斯·克拉克·麦克斯韦（James Clerk Maxwell）在 1856 年与 1861–62 年的论文中把这一想法数学化为矢量势，并在《电磁场的动力学理论》（*A Dynamical Theory of the Electromagnetic Field*，1865）中贯穿使用。
:::

## 后续内容 {#leads}

在 [[electrodynamics/maxwell-equations]] 中，安培环路定律获得位移电流，矢量势与标量势一起描述含时场；规范自由度于是同时涉及两者，$\mathbf A\to\mathbf A + \nabla\lambda$ 且 $V\to V - \partial_t\lambda$。在 [[electrodynamics/relativistic-fields]] 中，$V/c$ 与 $\mathbf A$ 合并成一个四矢量，电流的磁场被揭示为运动电荷的电场在另一参考系中的面貌。原子与原子核的磁矩、它们在场中的能量 $-\mathbf m\cdot\mathbf B$，是 [[quantum-2]] 中塞曼效应与自旋共振的出发点；而任何经典理论都无法解释的铁磁性的起源，是 [[condensed-matter]] 的主题。

::: summary
- 稳恒电流满足 $\nabla\cdot\mathbf J = 0$；它们的场服从 $\nabla\cdot\mathbf B = 0$ 与 $\nabla\times\mathbf B = \mu_0\mathbf J$，由毕奥–萨伐尔定律导出。
- $\mathbf B = \nabla\times\mathbf A$；$\mathbf A$ 只确定到可差一个梯度（规范自由度）。库仑规范下 $\nabla\cdot\mathbf A = 0$ 且 $\nabla^2\mathbf A = -\mu_0\mathbf J$，解为 $\mathbf A = \frac{\mu_0}{4\pi}\int\mathbf J/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$。
- $\mathbf A$ 沿回路的环量是穿过回路的通量；螺线管外 $\mathbf B = \mathbf 0$ 而 $\mathbf A\ne\mathbf 0$。
- 不存在磁单极项；环外远处 $\mathbf A = \frac{\mu_0}{4\pi}\mathbf m\times\hat{\mathbf r}/r^2$，$\mathbf m = I\mathbf a$，$\mathbf B$ 取偶极形式 $\frac{\mu_0}{4\pi}[3(\mathbf m\cdot\hat{\mathbf r})\hat{\mathbf r} - \mathbf m]/r^3$。
- 磁化强度等价于束缚电流 $\nabla\times\mathbf M$ 与 $\mathbf M\times\hat{\mathbf n}$；$\mathbf H = \mathbf B/\mu_0 - \mathbf M$ 的旋度为 $\mathbf J_f$；线性介质中 $\mathbf B = \mu\mathbf H$。
- 边界上 $B^\perp$ 连续，$\mathbf B^\parallel$ 跃变 $\mu_0\mathbf K\times\hat{\mathbf n}$；磁感线几乎沿法向离开高磁导率铁。
- 均匀磁化球内部有匀强场 $\mathbf B = \tfrac23\mu_0\mathbf M$，外部是纯偶极场。
:::

## 习题 {#exercises}

::: exercise 亥姆霍兹线圈 {level=1 check="1.20"}
求半径 $15.0\,\mathrm{cm}$、每线圈 $100$ 匝、通 $2.00\,\mathrm{A}$ 的亥姆霍兹圆环对中心处的场，以 mT 计，不许先看 [[#ex-helmholtz]]；然后核对。
::: solution
由 [[#eq-helmholtz]]，$B_0 = (4/5)^{3/2}\mu_0NI/R = 0.7155\times(4\pi\times10^{-7})(200)/(0.150) = 1.20\times10^{-3}\,\mathrm{T} = 1.20\,\mathrm{mT}$。
:::
:::

::: exercise 一小条磁铁 {level=1 check="25.0"}
一小磁铁的磁偶极矩为 $1.00\,\mathrm{A\,m^2}$。把它当作点偶极子，求沿其轴线距中心 $2.00\,\mathrm{cm}$ 处的场，以 mT 计。
::: solution
轴线上 $\mathbf m\cdot\hat{\mathbf r} = m$，[[#eq-B-dip]] 给出 $B = \frac{\mu_0}{4\pi}\frac{2m}{r^3} = (10^{-7})\frac{2(1.00)}{(0.0200)^3} = 2.50\times10^{-2}\,\mathrm{T} = 25.0\,\mathrm{mT}$，沿 $\mathbf m$ 方向。一块真正的 $2\,\mathrm{cm}$ 长磁铁在这个距离上并非点偶极子，真实值会有可观偏差。
:::
:::

::: exercise 地磁发电机的磁矩 {level=1 check="7.76"}
取赤道表面磁场 $3.00\times10^{-5}\,\mathrm{T}$、$R_\oplus = 6.371\times10^{6}\,\mathrm{m}$，以 $10^{22}\,\mathrm{A\,m^2}$ 为单位求地球的磁偶极矩，取三位有效数字。
::: solution
与 [[#ex-earth]] 相同，$m = 4\pi R_\oplus^3B_{\mathrm{eq}}/\mu_0 = R_\oplus^3B_{\mathrm{eq}}/(10^{-7}) = (2.586\times10^{20})(3.00\times10^{-5})/(10^{-7}) = 7.76\times10^{22}\,\mathrm{A\,m^2}$。
:::
:::

::: exercise 离开铁面的磁感线 {level=2 check="0.0573"}
$\mu_r = 1000$ 的铁块内部，场与表面法向成 $45.0^\circ$。没有自由面电流。求紧贴外侧空气中场与法向的夹角，以度计。
::: solution
由 [[#eq-refraction-B]]，$\tan\theta_{\mathrm{air}} = \tan\theta_{\mathrm{iron}}\,\mu_0/\mu = 1.000/1000 = 1.000\times10^{-3}$，所以 $\theta_{\mathrm{air}} = 0.0573^\circ$。切向 $\mathbf H$ 连续，所以空气中的切向 $\mathbf B$ 比铁中小一千倍，而法向 $\mathbf B$ 两侧相同。
:::
:::

::: exercise 长直导线的矢量势 {level=2}
证明 $\mathbf A = -\frac{\mu_0I}{2\pi}\ln\frac{s}{s_0}\,\hat{\mathbf z}$，$s_0$ 为任意常量，给出 $z$ 轴上通 $+z$ 方向电流 $I$ 的无限长直导线的场。为什么 [[#eq-A-integral]] 不能直接使用？改变 $s_0$ 对应什么？
::: solution
柱坐标下，对 $\mathbf A = A_z(s)\hat{\mathbf z}$ 有 $\nabla\times\mathbf A = -\partial_sA_z\,\hat{\boldsymbol\phi}$。这里 $\partial_sA_z = -\mu_0I/(2\pi s)$，所以 $\mathbf B = \frac{\mu_0I}{2\pi s}\hat{\boldsymbol\phi}$，正是导线的场。并且 $\nabla\cdot\mathbf A = \partial_zA_z = 0$。对无限长导线，积分 [[#eq-A-integral]] 对数发散，因为电流不是局域的：$\int_{-L}^{L}\dd z'/\sqrt{s^2+z'^2}\approx2\ln(2L/s)$。发散部分与 $s$ 无关，可以扔掉，$s_0$ 的作用正在于此。改变 $s_0$ 给 $\mathbf A$ 加上一个常量向量，这是 $\lambda = Cz$ 的梯度，即一次规范变换。
:::
:::

::: exercise 钕铁硼球 {level=2 check="0.838"}
一只钕铁硼（NdFeB）球具有均匀磁化强度 $1.00\times10^{6}\,\mathrm{A/m}$。求内部的 $B$（以特斯拉计）与内部的 $H$。再求两极与赤道处紧贴外侧的 $B$。
::: solution
由 [[#ex-magnet-sphere]]，$B_{\mathrm{in}} = \tfrac23\mu_0M = \tfrac23(1.2566\times10^{-6})(1.00\times10^{6}) = 0.838\,\mathrm{T}$，沿 $\mathbf M$。$\mathbf H_{\mathrm{in}} = -\tfrac13\mathbf M$，大小 $3.33\times10^{5}\,\mathrm{A/m}$，与 $\mathbf M$ 反向。球外的场是 $\mathbf m = \tfrac43\pi R^3\mathbf M$ 的场：两极处 $B = \frac{\mu_0}{4\pi}\frac{2m}{R^3} = \tfrac23\mu_0M = 0.838\,\mathrm{T}$，与内部相同，$B^\perp$ 连续性所要求。赤道处 $B = \frac{\mu_0}{4\pi}\frac{m}{R^3} = \tfrac13\mu_0M = 0.419\,\mathrm{T}$，与 $\mathbf M$ 反向；紧贴内侧 $B^\parallel = 0.838\,\mathrm{T}$，沿 $\mathbf M$。$1.257\,\mathrm{T}$ 的跃变正是 $\mu_0K_b$，赤道处 $K_b = M$，与 [[#eq-bc-B]] 一致。
:::
:::

::: exercise 方形环的中心 {level=1 check="56.6"}
边长 $10.0\,\mathrm{cm}$ 的方形环通 $5.00\,\mathrm{A}$。用毕奥–萨伐尔定律求其中心的场，以 $\mu\mathrm{T}$ 计，并与同面积圆环比较。
::: hint
与垂足距离 $d$ 的直线段，两端在垂线两侧张角 $\theta_1$、$\theta_2$，给出 $\frac{\mu_0I}{4\pi d}(\sin\theta_1 + \sin\theta_2)$。
:::
::: solution
每条边距中心 $d = L/2$，两端在每侧张角 $45^\circ$，所以每边贡献 $\frac{\mu_0I}{4\pi(L/2)}\cdot2\sin45^\circ = \frac{\sqrt2\,\mu_0I}{2\pi L}$，方向垂直于环面。四条边相加：

$$
B = \frac{2\sqrt2\,\mu_0I}{\pi L} = \frac{2\sqrt2\,(1.2566\times10^{-6})(5.00)}{\pi(0.100)} = 5.66\times10^{-5}\,\mathrm{T} = 56.6\,\mu\mathrm{T}.
$$

同面积圆环半径 $R = L/\sqrt\pi = 5.64\,\mathrm{cm}$，中心场 $\mu_0I/(2R) = 55.7\,\mu\mathrm{T}$，相差 $2\%$ 以内。远处二者都是磁矩同为 $m = IL^2$ 的偶极子，场变得完全相同。
:::
:::

::: exercise 坡莫合金罐 {level=2 check="7.75"}
一只外半径 $5.00\,\mathrm{cm}$、壁厚 $2.00\,\mathrm{mm}$ 的球形屏蔽罩由 $\mu_r = 5000$ 的材料制成。用 [[#eq-shield]] 的精确形式求 $B_{\mathrm{in}}/B_0$，以 $10^{-3}$ 为单位，并与近似形式比较。一只实心铁球（$\mu_r = 5000$）对它内部的场做什么？
::: solution
这里 $a/b = 4.80/5.00 = 0.960$，$(a/b)^3 = 0.8847$。[[#eq-shield]] 的分母为

$$
(10001)(5002) - 2(0.8847)(4999)^2 = 5.0025\times10^{7} - 4.4219\times10^{7} = 5.806\times10^{6},
$$

所以 $B_{\mathrm{in}}/B_0 = 9(5000)/(5.806\times10^{6}) = 7.75\times10^{-3}$。近似形式给出 $9/(2\times5000\times0.1153) = 7.81\times10^{-3}$，相差 $1\%$ 以内。实心球则汇聚磁场：由 [[#eq-linear-sphere]]，$B_{\mathrm{in}} = 3(5000)/(5002)\,B_0 = 2.999\,B_0$。
:::
:::

::: exercise 到达库仑规范 {level=3}
设 $\mathbf A$ 是场 $\mathbf B$ 的任一光滑矢量势，$\nabla\cdot\mathbf A$ 局域。证明存在规范函数 $\lambda$ 使 $\mathbf A' = \mathbf A + \nabla\lambda$ 满足 $\nabla\cdot\mathbf A' = 0$。再证：若 $\mathbf A''$ 是 $\mathbf B$ 的另一个库仑规范势，则 $\mathbf A'' - \mathbf A' = \nabla\chi$，$\chi$ 调和；由此推出，要求势在无穷远处为零时库仑规范势唯一。
::: hint
第一问需要 $\nabla^2\lambda = -\nabla\cdot\mathbf A$，一条泊松方程。唯一性部分用这个事实：全空间（单连通）上旋度为零的向量场是一个梯度，再用拉普拉斯方程的唯一性。
:::
::: solution
我们需要 $\nabla\cdot\mathbf A + \nabla^2\lambda = 0$。泊松方程 $\nabla^2\lambda = -f$ 对局域的 $f = \nabla\cdot\mathbf A$ 有解 $\lambda(\mathbf r) = \frac{1}{4\pi}\int f(\mathbf r')/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$，即静电学公式把 $\rho/\varepsilon_0\to f$。用这个 $\lambda$，$\nabla\cdot\mathbf A' = 0$，且 $\nabla\times\mathbf A' = \nabla\times\mathbf A = \mathbf B$。

再设 $\mathbf A'$ 与 $\mathbf A''$ 都是 $\mathbf B$ 的库仑规范势。二者之差 $\mathbf G$ 在全空间满足 $\nabla\times\mathbf G = \mathbf 0$，而全空间单连通，所以 $\mathbf G = \nabla\chi$。于是 $\nabla\cdot\mathbf G = \nabla^2\chi = 0$：$\chi$ 调和。若两个势都在无穷远处为零，$\mathbf G$ 也是。每个笛卡儿分量 $G_i = \partial_i\chi$ 本身调和（调和函数的导数调和），在无穷远趋于零，且在有限区域内没有边界；由 [[electrodynamics/electrostatics#thm-unique]]（无穷远处零数据），或直接由 [[electrodynamics/electrostatics#thm-mean]] 导出的最大值原理，$G_i = 0$。所以 $\mathbf A'' = \mathbf A'$。匀强场的例子 [[#ex-uniform-A]] 表明，没有无穷远处的条件，唯一性不成立。
:::
:::

::: exercise 旋转带电球壳 {level=3 check="23.3"}
半径 $R$ 的薄球壳载均匀面电荷密度 $\sigma$，绕 $z$ 轴以角速度 $\omega$ 旋转。证明其面电流相当于磁化强度 $M = \sigma\omega R$ 的均匀磁化球，并由此求内部的 $\mathbf B$。对 $R = 10.0\,\mathrm{cm}$、充至 $10.0\,\mathrm{kV}$、每秒转 $50.0$ 转的情形求内部 $B$，以皮特斯拉计。
::: hint
面电流为 $\mathbf K = \sigma\mathbf v$，$\mathbf v = \boldsymbol\omega\times\mathbf r$。与 $\mathbf K_b = \mathbf M\times\hat{\mathbf n}$ 比较。
:::
::: solution
球壳上一点处 $\mathbf v = \omega\hat{\mathbf z}\times R\hat{\mathbf r} = \omega R\sin\theta\,\hat{\boldsymbol\phi}$，所以 $\mathbf K = \sigma\omega R\sin\theta\,\hat{\boldsymbol\phi}$。均匀磁化球有 $\mathbf K_b = M\hat{\mathbf z}\times\hat{\mathbf r} = M\sin\theta\,\hat{\boldsymbol\phi}$，且无体电流，因为 $\nabla\times\mathbf M = \mathbf 0$。当 $M = \sigma\omega R$ 时二者电流相同。由毕奥–萨伐尔定律，场只依赖电流，所以由 [[#ex-magnet-sphere]] 球内场匀强：

$$
\mathbf B_{\mathrm{in}} = \tfrac23\mu_0\sigma\omega R\,\hat{\mathbf z}.
$$

（球壳内部没有磁化材料，所以那里 $\mathbf B = \mu_0\mathbf H$；比较两个系统时只有 $\mathbf B$ 有意义。）代入数字，电势为 $V$ 的球面有 $\sigma = \varepsilon_0V/R = (8.854\times10^{-12})(1.00\times10^{4})/(0.100) = 8.854\times10^{-7}\,\mathrm{C/m^2}$，$\omega = 2\pi(50.0) = 314.2\,\mathrm{s^{-1}}$：

$$
B_{\mathrm{in}} = \tfrac23(1.2566\times10^{-6})(8.854\times10^{-7})(314.2)(0.100) = 2.33\times10^{-11}\,\mathrm{T} = 23.3\,\mathrm{pT}.
$$

约为地磁场的百万分之一。亨利·罗兰（Henry Rowland）1876 年首次探测到旋转带电圆盘上运动电荷的磁场，证明运流电流与传导电流产生相同的磁性；效应之微弱，正是它需要一个精巧实验的原因。
:::
:::
