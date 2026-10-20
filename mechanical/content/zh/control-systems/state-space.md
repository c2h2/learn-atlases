传递函数把一个输出与一个输入联系起来。状态空间模型则把一个系统的**整个当下**与它自己的过去和输入联系起来，而这个差别产生了让现代方法值得付出线性代数代价的一切：同时处理多个输入和多个输出的能力，精确说出系统的哪些部分某个执行器能够到达、某个传感器能够看见的能力，用算术而不是用画图配置闭环极点的能力，以及估计一个无法测量的变量的能力。这个框架不是做频率方法所能做的事的更好方式——对单回路，频率方法做得更好——它是做单回路做不到的事的唯一方式。

整个学科归结为三个问题及其秩检验。**输入能驱动每一个模态吗？**能控性，答案是一个矩阵的秩。**输出能揭示每一个模态吗？**能观性，答案是一个转置矩阵的秩。**若两者皆是，多快多好？**极点配置与观测器，答案是你想把闭环极点放在哪里就放在哪里、想把估计器极点放在哪里就放在哪里，彼此独立，两个设计相乘即可。其余的一切——最优调节器、卡尔曼滤波器、把这份自由与频域裕度调和一致的回路传输恢复——都是细化。

::: warning 极点配置是本书最危险的思想
给定一个能控模型，任意极点配置是一条公式，而刚学会它的设计师会把闭环极点放在规格要求的地方、把观测器极点放在其上一个数量级处。这两个动作都以特定而可量化的方式是错的。把极点放到远超对象自身动力学所能支持的位置以左，要求**控制功**：所需反馈增益随期望带宽上升而无界增长，而对一个带右半平面零点或柔性模态的对象，越过它配置极点所需的增益不只是大，而是在**真实对象上起失稳作用**，因为产生该增益的模型不是对象。把观测器放快更糟，因为观测器的增益$L$出现在反馈通路中、被对象的高频增益相乘，而恢复后的回路灵敏度峰值大致与观测器带宽成正比地增长——一个估计器越自信、鲁棒性越差的设计。让两者都保持诚实的法则是：**闭环带宽不得超过模型误差达到一的频率**，而观测器应当比控制器快三到五倍，不是十到五十倍。超过这个界限，分离原理在算术上为真、在实践中无用。
:::

## 表示

::: definition 状态空间模型及其非唯一性 {#def-ss}
线性时不变系统是
$$
\dot{x} = A x + B u, \qquad y = C x + D u,
$$
其中$x \in \mathbb{R}^{n}$是**状态**——在给定$t \ge t_0$的$u (t )$时、决定其后一切时刻$y (t )$的最少一组数。解为
$$
x (t ) = \mathrm{e}^{A \left( t - t_0 \right)} x \left( t_0 \right) + \int_{t_0}^{t} \mathrm{e}^{A \left( t - \tau \right)} B u (\tau ) \mathrm{d} \tau,
\qquad
G (s ) = C \left( sI - A \right)^{- 1} B + D .
$$
表示**不唯一**：对任何非奇异$T$，代换$x = T z$给出$\tilde{A} = T^{- 1} A T$、$\tilde{B} = T^{- 1} B$、$\tilde{C} = C T$，而$G (s )$不变。物理状态——一个位置、一个电容电压、一个罐液位——是无穷多选择中的一个，而把$A$对角化的模态选择，通常是揭示系统能做什么的那个。传递函数是不变量；矩阵是它上面的一个坐标系。
:::

::: example 三个坐标系中的电机位置轴 {#ex-motor-ss}
写出一台带内环电流环的直流电机位置轴的状态模型，$J = 10^{- 4}\ \mathrm{kg\, m^{2}}$，粘性摩擦$b = 10^{- 5}\ \mathrm{N\, m\, s}$，转矩常数$K = 0.08\ \mathrm{N\, m / A}$，取电流给定为输入、轴角为输出。
::: solution
**物理状态**$x = \left[ \theta , \omega \right]^{T}$，其中$K / J = 800\ \mathrm{rad\, s^{- 2} / A}$、$b / J = 0.1\ \mathrm{s^{- 1}}$：
$$
\dot{x} = \begin{bmatrix} 0 & 1 \\ 0 & - 0.1 \end{bmatrix} x + \begin{bmatrix} 0 \\ 800 \end{bmatrix} i,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**可控标准形**，直接读出传递函数$G = 800 / \left( s^{2} + 0.1 s \right)$：
$$
A_c = \begin{bmatrix} 0 & 1 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_c = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad
C_c = \begin{bmatrix} 0 & 800 \end{bmatrix},
$$
其$A$与前面相同，因为物理状态恰好就是相变量。
**模态形式。**特征值为$0$与$- 0.1$；以$T$为模态矩阵，
$$
A_\Lambda = \begin{bmatrix} 0 & 0 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_\Lambda = \begin{bmatrix} - 8000 \\ 8000 \end{bmatrix}, \quad
C_\Lambda = \begin{bmatrix} 1 & 1 \end{bmatrix} .
$$
模态$B$是有用的那个：两个元素**大小相等**，说明积分模态与摩擦模态能控性相同；而模态$C$说明两者能观性也相同。若摩擦为零，两个特征值会在原点重合，模态形式便不存在——一个亏损矩阵，一个只有一个特征向量的重极点——这也是无摩擦电机的模型最好留在物理坐标下的原因。

**校核。**$C \left( sI - A \right)^{- 1} B = \left[ 1 \; 1 \right] \operatorname{diag} \left( 1 / s , 1 / \left( s + 0.1 \right) \right) \left[ - 8000 , 8000 \right]^{T} = 8000 \left( \frac{1}{s + 0.1} - \frac{1}{s} \right) = \frac{800}{s \left( s + 0.1 \right)}$ $\checkmark$

**合理性检验。**三种表示有完全相同的输入-输出行为与完全相同的极点配置答案，而它们之间的选择是选择要**看见**什么。模态形式回答"我能控制那个柔性模态吗？"，物理形式回答"传感器测的是什么？"，而只在可控标准形里工作的设计师会算出一个正确的增益，却说不出第二个模态为什么在振铃。
:::
:::

## 能控性与能观性

::: definition 两个秩检验 {#def-rank}
**能控性矩阵**与**能观性矩阵**是
$$
\mathcal{C} = \begin{bmatrix} B & A B & \cdots & A^{n - 1} B \end{bmatrix} \in \mathbb{R}^{n \times n m},
\qquad
\mathcal{O} = \begin{bmatrix} C \\ C A \\ \vdots \\ C A^{n - 1} \end{bmatrix} \in \mathbb{R}^{n p \times n} .
$$
当$\operatorname{rank} \mathcal{C} = n$时系统能控，当$\operatorname{rank} \mathcal{O} = n$时系统能观。等价地，有**波波夫（Popov）-别列维奇（Belevitch）-奥图斯（Hautus）**检验：当且仅当$A$的某个左特征向量$w$满足$w^{H} B = 0$时系统不能控；当且仅当某个右特征向量$v$满足$C v = 0$时不能观。一个既不能控又不能观的模态对设计完全隐藏，无论设计师愿不愿意都会出现在闭环里；一个不能控但能观的模态稳定而无关紧要；一个**能控但不能观**的模态才是危险的，因为观测器会把它估错，而控制器会对着这个错误动作。
:::

::: proof 秩检验为什么是这两个 {#proof-rank}
**能控性。**把$\dot{x} = A x + B u$在$n$个采样时刻上迭代，或对$\left[ 0 , T \right]$上的分段常值输入算连续时间积分，可把可达集表示为$\left\{ B , A B , \ldots \right\}$的张成：
$$
x (T ) - \mathrm{e}^{A T} x (0 ) = \int_0^{T} \mathrm{e}^{A \left( T - \tau \right)} B u \, \mathrm{d} \tau
= \sum_{k = 0}^{\infty} \frac{\left( - 1 \right)^{k} A^{k} B}{k!} \int_0^{T} \left( T - \tau \right)^{k} u (\tau ) \mathrm{d} \tau .
$$
每一项都落在$\mathcal{C}$的列空间里，而由凯莱-哈密顿定理，超过$A^{n - 1} B$的任何项都不再增添东西，所以可达集**就是**那个列空间。$\checkmark$
**对角情形，意义可见之处。**对$A = \operatorname{diag} \left( \lambda_i \right)$，
$$
\mathcal{C} = \begin{bmatrix} b_1 & \lambda_1 b_1 & \cdots \ b_2 & \lambda_2 b_2 & \cdots \ \vdots \end{bmatrix},
$$
第$i$行消失当且仅当$b_i = 0$。输入系数为零的模态无法被移动，而秩检验说的就是：一旦每一行都非零，互异$\lambda_i$的范德蒙矩阵就满秩。$\checkmark$
**对偶性。**$\left( A , B \right)$能控当且仅当$\left( A^{T} , C \right)$能观，因为$\mathcal{O} \left( A , C \right) = \mathcal{C}^{T} \left( A^{T} , C^{T} \right)$。所以每条能控性定理都有一个能观性孪生定理，而下面的观测器设计就是箭头反转后的控制器设计。$\checkmark$

**注。**秩检验是关于**精确**模型的陈述，工程从这里开始。一个在$10^{6}$分之一以内不能控的模态，在算术上能控、在实践中无用，因为控制它所需的增益是控制一个名正言顺受驱动的模态所需增益的一百万倍。因此实用的量不是秩，而是$\mathcal{C}$的**最小奇异值**，或者更好的，是到达目标状态$x_T$的最小控制能量
$$
E_{\min} = x_T^{T} W_c \left( T \right)^{- 1} x_T ,
\qquad
W_c (T ) = \int_0^{T} \mathrm{e}^{A \tau} B B^{T} \mathrm{e}^{A^{T} \tau} \mathrm{d} \tau,
$$
$\sigma_{\min} (\mathcal{C})$小的模态$E_{\min}$大，而在配置极点之前先算它的工程师会发现，那个看上去可达的规格要花的是一台并不存在的执行器。
:::

::: widget plot
f: abs(sin(pi*x)); abs(sin(2*pi*x))
x: 0, 1
y: 0, 1.05
labels: mode 1; mode 2
caption: 均匀简支梁前两阶振型的幅值，横轴为单个力执行器的位置。曲线穿过零的地方，该模态从该执行器位置就不能控：跨中的执行器完全无法激励第二阶模态，秩检验精确地报告这一点。设计师的对策是把执行器放在必须控制的模态的节之外，而一个只有一台执行器的柔性结构是一个设计问题而不是控制问题，原因就在这里。
:::

::: example 你能到达哪些模态？ {#ex-reach}
一座跨长为$L$的简支桥面要用一个建模为跨中力执行器的调谐质量阻尼器来控制。前四阶竖向模态中它能控制哪些？秩检验怎么说？
::: solution
振型为$\varphi_n \left( x \right) = \sin \left( n \pi x / L \right)$，所以在模态坐标下输入向量为$B_n = \varphi_n \left( x_a \right)$，在跨中
$$
B_n = \sin \frac{n \pi}{2} = 1 , 0 , - 1 , 0 , \ldots
$$
偶数阶模态在跨中有**节**，不能控。奇数阶模态的能控性矩阵满秩，因为它们的特征值$\omega_1 \ne \omega_3$互异；对偶数阶模态，$\mathcal{C}$的对应行为零，秩为$n - 2$。
**能量。**对第三阶模态，执行器坐在幅值为$1$的**波腹**上，与第一阶相同，所以注入给定模态能量所需的力相同——但第三阶模态的模态质量相同而频率高三倍，同样的力每单位能量产生三倍的模态速度，每牛顿的控制权限好三倍。
**补救。**把阻尼器移出跨中，或在$L / 4$与$3 L / 4$处用两个阻尼器——它们是第二阶模态的波腹，且不是任何阶的节。

**校核。**执行器在$L / 4$与$3 L / 4$时，$B_n = \left[ \sin \frac{n\pi}{4} , \sin \frac{3 n\pi}{4} \right]$对$n = 2$给出向量$\left[ 0.707 , - 0.707 \right]$，非零且具有满模态权限；对$n = 4$给出$\left[ - 1 , 1 \right]$；对$n = 3$给出$\left[ 0.707 , 0.707 \right]$。$\checkmark$

**合理性检验。**秩检验是精确的，物理是近似的：真实桥面的模态不是完美的正弦，真实阻尼器不是点力，而"不能控"的偶数阶模态会因桥面的不对称而弱能控——这比真正不能控更糟，因为设计师的模型说那个模态不存在，而风或车流说它存在。工程法则是：坐在某模态的节百分之十以内的执行器对该模态实际上没有权限；在执行器位置定死之前画一张模态能控性图，花一个小时，省一次加装改造。
:::
:::

## 极点配置与观测器

::: definition 状态反馈、阿克曼公式与观测器 {#def-placement}
全状态反馈$u = - K x + k_r r$下的闭环为$\dot{x} = \left( A - B K \right) x + B k_r r$，若$\left( A , B \right)$能控，可选取$K$把$n$个闭环极点配置在任意自共轭的点集上。对单输入，**阿克曼（Ackermann）公式**给出
$$
K = \begin{bmatrix} 0 & \cdots & 0 & 1 \end{bmatrix} \mathcal{C}^{- 1} \alpha_d (A ),
\qquad
\alpha_d (s ) = \prod_i \left( s - p_i \right) .
$$
对双积分器$A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & 0 \end{smallmatrix} \right]$、$B = \left[ \begin{smallmatrix} 0 \\ 1 \end{smallmatrix} \right]$，它化简为教科书结果$K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$。
**全阶观测器**传播一个对象模型、用输出误差校正它，
$$
\dot{\hat{x}} = A \hat{x} + B u + L \left( y - C \hat{x} \right),
$$
而误差$e = x - \hat{x}$服从$\dot{e} = \left( A - L C \right) e$，与$u$无关。若$\left( A , C \right)$能观，$L$可把观测器极点放在任意处。**分离原理**断言：在$u = - K \hat{x} + k_r r$下，$2 n$阶联合系统具有$2 n$个特征值$\operatorname{eig} \left( A - B K \right) \cup \operatorname{eig} \left( A - L C \right)$，所以两个设计可以彼此独立地完成。
:::

::: proof 分离原理 {#proof-separation}
取$u = - K \hat{x}$、$e = x - \hat{x}$，
$$
\dot{x} = A x - B K \left( x - e \right) = \left( A - B K \right) x + B K e,
\qquad
\dot{e} = \left( A - L C \right) e,
$$
所以在坐标$\left[ x , e \right]$下系统矩阵是**块三角**的，
$$
\begin{bmatrix} \dot{x} \\ \dot{e} \end{bmatrix}
= \begin{bmatrix} A - B K & B K \\ 0 & A - L C \end{bmatrix}
\begin{bmatrix} x \\ e \end{bmatrix} .
$$
块三角矩阵的特征值是对角块特征值的并集，非对角的$B K$影响的是**模态的形状**与瞬态加权，而不是极点。$\checkmark$
**原理没有说什么。**它对**瞬态响应**只字未提，而非对角块恰恰是麻烦栖身之处：从$r$到$y$的闭环传递函数不是状态反馈设计的传递函数，因为估计器的动力学出现在其中。展开写来，控制器是一个动态校正器
$$
C (s ) = K \left( sI - A + B K + L C \right)^{- 1} L ,
$$
其高频行为由$L$决定，其阶数等于对象的阶数。快的观测器让这个校正器表现得像高增益微分器，而调和两个设计的回路恢复论证表明，恢复后的回路灵敏度峰值随观测器带宽增长。分离原理是关于**极点**的陈述，而把它读成关于**性能**的陈述的设计师，会做出一个稳定、极点分毫不差、却在状态反馈设计绝不会有的方面脆弱的回路。$\checkmark$
:::

::: example 带观测器的极点配置 {#ex-poleplace}
为例1的电机轴设计状态反馈控制器与观测器：闭环固有频率$20\ \mathrm{rad / s}$、阻尼$0.707$，观测器取$100\ \mathrm{rad / s}$、阻尼$0.9$。
::: solution
**反馈。**以例1的$A$与$B$，$A - B K$的特征多项式为
$$
s^{2} + \left( 0.1 + 800 k_2 \right) s + 800 k_1 ,
$$
与$s^{2} + 2 \times 0.707 \times 20 s + 400 = s^{2} + 28.28 s + 400$匹配得
$$
k_1 = 0.500\ \mathrm{A / rad}, \qquad k_2 = 0.0352\ \mathrm{A\, s / rad} .
$$
**前馈。**对象从$i$到$\theta$的直流增益无穷大，所以$k_r$由闭环直流增益为一的要求定出：$k_r = 0.500\ \mathrm{A / rad}$给定。
**观测器。**$A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & - 0.1 \end{bmatrix}$，特征多项式
$$
s^{2} + \left( L_1 + 0.1 \right) s + \left( 0.1 L_1 + L_2 \right) = s^{2} + 180 s + 10^{4},
$$
所以$L_1 = 179.9\ \mathrm{s^{- 1}}$、$L_2 = 9982\ \mathrm{s^{- 2}}$。
**校核。**四个闭环特征值是$- 14.14 \pm 14.14\ \mathrm{j}$与$- 90 \pm 43.6\ \mathrm{j}$——正是那两个设计，如分离原理所要求。

**合理性检验。**观测器的增益$L_2$接近一万，这是该看的数。它意味着估计器对一个一弧度的输出误差的响应，是以每秒$10^{4}\ \mathrm{rad / s}$的速度驱动估计速度；也意味着**传感器噪声以$L_2 / b = 12.5$的增益注入控制信号——位置测量中每单位噪声等价于$12.5\ \mathrm{A\, s / rad}$的微分增益**，而反馈$k_2$才$0.035$。观测器实际上在回路里造了一个微分器，其转折由观测器带宽设定。这就是"五倍"法则存在的原因：$100\ \mathrm{rad / s}$对$20\ \mathrm{rad / s}$的控制器，噪声代价是微分频带内的五倍；而$1000\ \mathrm{rad / s}$时是五十倍，编码器的噪声底就成了决定设计的因素。
:::
:::

::: example 估计不可测之物的观测器 {#ex-estimator}
罐液位可测，但**流入量**——那个要紧的扰动——不可测。估计它。
::: solution
**模型。**以$h$为液位、$q_{in}$为未知流入量、$u$为可测流出量，$A \dot{h} = q_{in} - u$，所以取$x = \left[ h , q_{in} \right]^{T}$、把$q_{in}$建模为常量，
$$
\dot{x} = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} x + \begin{bmatrix} - 1 / A \\ 0 \end{bmatrix} u,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**能观性。**$\mathcal{O} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$——满秩。流入量之所以能观，是因为它表现为液位的**斜率**，而这正是基于积分器的估计器所提取的东西。
**观测器。**$A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & 0 \end{bmatrix}$，特征多项式$s^{2} + L_1 s + L_2$。选$- \omega_o$处的二重极点得$L_1 = 2 \omega_o$、$L_2 = \omega_o^{2}$，而这个估计器一眼可辨是**锁相环的二阶推广**：液位误差驱动液位估计，液位误差同时又积分进流入量估计。
**时间尺度。**取截面积$A = 4\ \mathrm{m^{2}}$、名义流入量$0.02\ \mathrm{m^{3} / s}$，选$\omega_o = 0.02\ \mathrm{rad / s}$（$50\ \mathrm{s}$时间常数）得$L_1 = 0.04$、$L_2 = 4 \times 10^{- 4}$，流入量估计在流入量阶跃变化后约$250\ \mathrm{s}$内进入百分之五以内。

**校核。**估计器从$y$到$\hat{q}_{in}$的传递函数是$L_2 / \left( s^{2} + L_1 s + L_2 \right) \times s$，低频下给出$\hat{q}_{in} \approx s \hat{h}$——液位的导数——整个设计就是一个**带滤波的微分器**，滤波器由$\omega_o$摆放。$\checkmark$

**合理性检验。**未知输入估计器是这一课里最被低估的思想，因为它用一个计算出来的扰动取代测量扰动，而计算的那个不需要校准。它的局限正是任何微分的局限：$q_{in}$的估计只和液位信号的斜率一样好，一个带$2\ \mathrm{cm}$噪声的液位计配上$50\ \mathrm{s}$的估计器，给出$2 \times 10^{- 2} \times \omega_o / \sqrt{2} \approx 2 \times 10^{- 4}\ \mathrm{m^{3} / s}$的流入量噪声，占名义值的百分之一——可以接受。想要更快的跟踪就把估计器时间常数减半，噪声随之加倍——这与微分滤波器所做的交换是同一个，理由也相同。
:::
:::

::: example 设计 {#ex-design-two-mass}
一台伺服轴通过谐波减速器驱动负载。折算到输出轴的电机惯量$J_m = 0.05\ \mathrm{kg\, m^{2}}$，负载惯量$J_L = 0.05\ \mathrm{kg\, m^{2}}$，联轴器的扭转刚度$K_c = 2000\ \mathrm{N\, m / rad}$。规格是位置带宽$32\ \mathrm{rad / s}$、$\zeta = 0.8$，负载位置可测。设计回路并决定测什么。
::: solution
**对象。**以$\delta = \theta_m - \theta_L$为联轴器扭转变形，
$$
\ddot{\theta}_L = \frac{K_c}{J_L} \delta = 40{,}000 \delta,
\qquad
\ddot{\delta} = - \frac{K_c \left( J_m + J_L \right)}{J_m J_L} \delta + \frac{1}{J_m} \tau = - 80{,}000 \delta + 20 \tau ,
$$
所以开环特征值是原点处的两个与$\pm 283\ \mathrm{j}$处的一对，而从力矩到**负载**位置的传递函数是
$$
\frac{\Theta_L}{\Tau} = \frac{800{,}000}{s^{2} \left( s^{2} + 80{,}000 \right)} ,
$$
一个带**无阻尼**共振$\omega_r = 283\ \mathrm{rad / s}$、**完全没有反共振**的双积分器。改为测量**电机**侧则给出
$$
\frac{\Theta_m}{\Tau} = \frac{800{,}000 \left( s^{2} + 40{,}000 \right)}{s^{2} \left( s^{2} + 80{,}000 \right)},
$$
它在$\omega_a = 200\ \mathrm{rad / s}$处有反共振，是一个性态更好的对象。
**状态反馈。**取$x = \left[ \theta_L , \omega_L , \delta , \dot{\delta} \right]^{T}$，模型从$\tau$能控，把四个极点配置在$- 32 \pm 32\ \mathrm{j}$与$- 20 \pm 15\ \mathrm{j}$得
$$
K = \begin{bmatrix} 1.60 & 0.152 & - 3740 & 5.20 \end{bmatrix}
$$
单位为每弧度、每弧度每秒的$\mathrm{N\, m}$。第三个元素是有意思的那个：每弧度扭转$3740\ \mathrm{N\, m}$的**扭转变形反馈**，是联轴器自身刚度的二十倍，正是它阻尼了负载测量对象留下的无阻尼共振。
**观测器。**扭转变形及其速率没有测量，所以需要四阶观测器。把它放在控制器五倍处就是$160\ \mathrm{rad / s}$，令人不安地接近电机测量对象$200\ \mathrm{rad / s}$的反共振，又稳稳低于负载测量对象$283\ \mathrm{rad / s}$的共振；观测器增益随后以恰好足以激起它试图阻尼的那个模态的增益，把估计误差馈入力矩指令。

**设计点评。**三个选择胜过四阶设计，驱动器工程师按这个顺序采用它们。在$283\ \mathrm{rad / s}$处对**力矩指令做陷波**，在$32\ \mathrm{rad / s}$处闭合一个PID位置环：陷波在穿越频率处花掉$25^{\circ}$的相位，而整个设计可以用频率响应验证。**加装电机侧编码器**，它使扭转变形直接可测，把观测器降为二阶，并使对象相位在共振处上移$180^{\circ}$。或者**把联轴器做硬**，把$\omega_r$推到$500\ \mathrm{rad / s}$以上，让四阶设计宽裕。算术确立的是这三条路都存在的原因：一个无阻尼共振只在穿越频率的九倍处，而状态估计器必须放在穿越频率与该共振之间，这个框架的答案存在于模型之上，代价是一次通不过的$M_s$校核。当结构在带宽附近有**若干**柔性模态、或有若干输入——机器人臂、龙门架、磁盘驱动器——单个陷波不够用时，这个框架才对得起它的代价。
:::
:::

::: history
状态空间方法随**鲁道夫·卡尔曼（Rudolf E. Kálmán）**1960年在帕洛阿尔托洛克希德飞机公司研究实验室完成的备忘录*"A new approach to linear filtering and prediction problems"*以及其1961年关于能控性与能观性的续篇而来。它的遭遇是本学科著名的尴尬之一：滤波论文投到《IRE自动控制汇刊》（*IRE Transactions on Automatic Control*）被拒，卡尔曼把它转投《基础工程学报》（*Journal of Basic Engineering*），它成了工程领域被引用最多的论文之一；另一篇后来的投稿因审稿人断言其结果毫无价值而被拒，卡尔曼后来写道，他从中学到的是只投自己认识编辑的期刊。**卡尔曼（Kálmán）**与**理查德·巴西（Richard S. Bucy）**1961年发表了有限维滤波器，而1960至1963年的**卡尔曼-巴西滤波器**把战争年代**维纳（Wiener）**的频域滤波与统计学家的递推最小二乘统一了起来。
作为秩检验的能控性与能观性以及二者之间的对偶性，在**卡尔曼（Kálmán）**1963年的论文*"Mathematical formulation of the linear optimal control problem"*和**卡尔曼与伯特伦（Bertram）**1960年的李雅普诺夫论文中。观测器是**伦伯格（Luenberger）**1964年的短文*"Observing the state of a linear system"*，为避开工程期刊的页数限制发表在《数学生物科学》（*Mathematical Biosciences*）上，分离原理就在这同四页里。几何与结构理论是**巴西莱（Basile）与马罗（Marro）**、**沃洛维奇（Wolovich）**以及**凯拉思（Kailath）**贯穿1960年代的工作，标准参考文献是**罗杰·布罗基特（Roger W. Brockett）**1970年的书与**沃纳姆（Wonham）**1979年的《线性多变量控制》（*Linear Multivariable Control*）。多数教科书给出的极点配置配方归功于**巴斯（Bass）与古拉（Gura）**（1965）的一般形式和**阿克曼（H. Ackermann）**（1972）的单输入公式——后者发表在一篇明为课堂使用而写的论文里。最优调节器是**卡尔曼（Kálmán）**1960年的结果，建立在**贝尔曼（Bellman）**1957年的动态规划与**卡尔曼与亚库博维奇（Yakubovich）**的正实引理之上；把由此产生的自由与频域鲁棒性调和一致的回路传输恢复，出自**木村（H. Kimura）**1981年的论文与**多伊尔（Doyle）与斯坦（Stein）**1981年的论文*"Multivariable feedback design: concepts for a classical/modern synthesis"*——那篇文章告诉了一代控制工程师，他们的两个传统本是一体。
:::

## 后续内容

::: quiz
一个对象是能控的，而设计师把闭环极点配置在远离对象自身动力学以左的地方。后果是什么？
- [x] 所需反馈增益无界增长，而真实对象中未被建模的动力学被激起
- [ ] 什么也没有——任意极点配置总是安全的
- [ ] 系统变得不能观
- [ ] 观测器必须放慢
::: solution
极点配置是模型的性质，而模型在高频率处就不再是对象。把闭环极点推过模型误差达到一的频率，意味着回路是对着设计中没有的动力学设计的，而当初为配置它们算出的增益，就是让真实系统失稳的那个增益。
:::
:::

观测器的噪声灵敏度与[[control-systems/pid-control]]的微分滤波器是同一个交换，恢复后回路的灵敏度峰值是[[control-systems/feedback-stability]]的水床，真实观测器所必需的离散化是[[control-systems/digital-control]]的主题，而例7的双质量对象就是[[vibrations/two-degrees-of-freedom]]的两自由度共振从控制一侧的样子。

::: summary
- 状态模型是传递函数上的一个坐标系；模态坐标是显示哪个模态执行器够得着、传感器看得见的那一个。
- 能控性与能观性是秩检验，而它们的实际内容不是秩，而是最小奇异值及其蕴含的控制能量。
- 能控系统容许用阿克曼公式任意配置极点；能观系统容许任意配置观测器极点，而两个设计彼此独立，因为联合矩阵是块三角的。
- 分离原理说的是极点而不是性能：它产生的校正器，其高频行为带着观测器的动力学，其灵敏度峰值随观测器带宽增长。
- 未知输入估计是一项被低估的技术，它把不可测扰动变成可测量的带滤波微分，附带与任何微分相同的噪声交换。
- 对带一个柔性模态的单输入单输出对象，一个陷波加一个PID通常比全阶设计便宜；当有多个模态、多个输入或必须重构的不可测状态时，这个框架才物有所值。
:::

## 习题

::: exercise 状态 {level=1 check="2"}
质量、弹簧、阻尼器串联的模型需要几个状态？输出为位置，输入为力。
::: solution
两个——质量的速度与弹簧的变形。
:::
:::

::: exercise 秩 {level=1 check="0"}
对$A = \operatorname{diag} \left( 1 , 2 \right)$、$B = \left[ 1 , 0 \right]^{T}$，能控性矩阵的秩是多少？
::: solution
一。第二个模态没有输入系数，不能控。
:::
:::

::: exercise 对偶 {level=1 check="1"}
若$\left( A , B \right)$能控，$\left( A^{T} , B^{T} \right)$有什么性质？
::: solution
能观——$\left( A^{T} , B^{T} \right)$的能观性矩阵是$\left( A , B \right)$能控性矩阵的转置。
:::
:::

::: exercise 特征值 {level=1 check="4"}
对能控的二阶系统，状态反馈可以配置几个闭环极点？
::: solution
两个——每个状态一个。
:::
:::

::: exercise 标准形 {level=2}
写出$G = \left( 3 s + 5 \right) / \left( s^{2} + 2 s + 7 \right)$的可控标准形，读出$A , B , C$。
::: solution
$$
A = \begin{bmatrix} 0 & 1 \\ - 7 & - 2 \end{bmatrix}, \quad
B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad
C = \begin{bmatrix} 5 & 3 \end{bmatrix}, \quad D = 0 .
$$
**合理性检验。**$A$的最后一行是分母系数的相反数，$C$是分子按降幂读出——这就是整个构造；校核是$C \left( sI - A \right)^{- 1} B = \left( 3 s + 5 \right) / \left( s^{2} + 2 s + 7 \right)$，而亲手乘过一次的设计师从此不再怀疑这个配方。
:::
:::

::: exercise 阿克曼 {level=2}
对期望极点$- 10 \pm 10\ \mathrm{j}$的双积分器使用阿克曼公式，给出$K$。
::: solution
$\alpha_d (s ) = s^{2} + 20 s + 200$，而$\mathcal{C} = \left[ B , AB \right] = \left[ \begin{smallmatrix} 0 & 1 \\ 1 & 0 \end{smallmatrix} \right]$，所以
$$
K = \begin{bmatrix} 0 & 1 \end{bmatrix} \mathcal{C}^{- 1} \left( A^{2} + 20 A + 200 I \right)
= \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 200 & 20 \\ 20 & 20 \end{bmatrix} = \begin{bmatrix} 200 & 20 \end{bmatrix} .
$$
**合理性检验。**$\omega_n = \sqrt{200} = 14.1$、$2 \zeta \omega_n = 20$给出$\zeta = 0.707$，而双积分器的一般法则$K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$立即随之而来——这与用匹配系数法摆放PD控制器的答案相同，也是第一个迹象：对所有状态都可测的系统做状态反馈，不是一种新技术，而是旧技术的系统化版本。
:::
:::

::: exercise 观测器增益 {level=2}
对$A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & - 3 \end{smallmatrix} \right]$、$C = \left[ 1 \; 0 \right]$，求观测器极点配置在$- 6 \pm 6\ \mathrm{j}$的$L$。
::: solution
$A - LC$的特征多项式为$s^{2} + \left( L_1 + 3 \right) s + \left( 3 L_1 + L_2 \right)$；与$s^{2} + 12 s + 72$匹配得$L_1 = 9$、$L_2 = 45$。
**合理性检验。**观测器极点比对象自身$- 3$处快$0.6\ \mathrm{Hz}$当量，这是一个温和而站得住的比值；增益$L_2 = 45$是等价的微分作用，是设计被接受之前必须对照测量噪声校核的那个数。
:::
:::

::: exercise 分离 {level=2}
一个设计把控制器极点配置在$- 5 \pm 5\ \mathrm{j}$、观测器极点配置在$- 50$。列出联合系统的闭环特征值。
::: solution
$- 5 + 5\ \mathrm{j}$、$- 5 - 5\ \mathrm{j}$与$- 50$——三阶对象配三阶观测器的三个特征值，两组之间没有相互作用。
**合理性检验。**$- 50$的观测器极点是主导极点实部的十倍，处在可用范围的上端；那个快模态的瞬态加权，正是基于观测器的设计的阶跃响应与状态反馈设计不同的原因，即使极点分毫不差地放在要求的位置，它也可以很大。
:::
:::

::: exercise 推导 {level=3}
证明：对$A = \operatorname{diag} \left( \lambda_1 , \ldots , \lambda_n \right)$且特征值互异时，系统能控当且仅当$B$的任一行的任何元素都不为零；并说出重特征值对应的正确陈述。
::: solution
$\mathcal{C} = \left[ B , AB , \ldots , A^{n - 1} B \right]$的第$i$行等于$b_i \left[ 1 , \lambda_i , \ldots , \lambda_i^{n - 1} \right]$，所以$\mathcal{C} = \operatorname{diag} \left( b_i \right) V$，其中$V$是$\lambda_i$的范德蒙矩阵。节点互异的范德蒙矩阵非奇异，所以$\operatorname{rank} \mathcal{C} = n$当且仅当每个$b_i \ne 0$。
对**重**特征值，范德蒙论证失效，正确的陈述是PBH检验：该模态能控当且仅当$\operatorname{rank} \left[ \lambda I - A , B \right] = n$；对亏损的重特征值，即使某个坐标选择下某些$b_i$为零，它也可能成立——依赖坐标的陈述没有意义，PBH陈述才有。
**合理性检验。**这个区分不是迂腐：由实测频率响应数据建立的模型只能辨识到相似变换以内，而靠检查数值拟合得到的模态实现中$B$矩阵的元素来检验能控性的设计师，只要有两个特征值靠得近就会得到错误答案，因为模态矩阵会病态，$B$的元素会变得没有意义。对原始物理实现做秩检验，或做PBH检验，才是唯一可靠的程序。
:::
:::

::: exercise 设计 {level=3}
一阶对象$\dot{x} = - x + 2 u$、$y = x$，用带积分项的状态反馈控制以零误差跟踪阶跃，观测器取闭环速率的两倍。把两个控制器极点配置在$- 3 \pm 3\ \mathrm{j}$，求所有增益。
::: solution
**增广。**取$\dot{z} = r - x$、$u = - k_1 x - k_2 z$，
$$
\begin{bmatrix} \dot{x} \\ \dot{z} \end{bmatrix}
= \begin{bmatrix} - 1 - 2 k_1 & - 2 k_2 \\ - 1 & 0 \end{bmatrix}
\begin{bmatrix} x \\ z \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} r ,
$$
其特征多项式为$s^{2} + \left( 1 + 2 k_1 \right) s + 2 k_2$。与$s^{2} + 6 s + 18$匹配得
$$
k_1 = 2.5, \qquad k_2 = 9.0 .
$$
**观测器。**对对象本身，$\left( A - L C \right) = - 1 - L = - 6$给出$L = 5$。
**校核。**从$r$到$y$的闭环传递函数是$18 / \left( s^{2} + 6 s + 18 \right)$——没有零点，因为积分作用的零点已被结构对消——$\zeta = 0.707$、$\omega_n = 4.24$、$2\ \%$调节时间$1.33\ \mathrm{s}$。

**合理性检验。**观测器是一个极点$- 6$的一阶滤波器，对闭环实部$- 3$，比值为二，是最小可辩护的分离度，给出的校正器是$C (s ) = k_2 \left( s + 1 + L \right) / \left( s \left( s + 6 \right) \right) \ldots$——一眼可辨是一个带滞后的PID。低阶对象上每一个基于观测器的设计都化归为1950年就能画出来的校正器，这道题的价值在于看清这个化归：框架对"什么是积分控制器？"的回答是"一个把参考建模为阶跃扰动之状态的观测器"——这是正确而一般的答案。
:::
:::
