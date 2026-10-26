传递函数把一个输出与一个输入联系起来。状态空间模型则把一个系统的**整个当下**与它自己的过去和输入联系起来，而这个差别产生了让现代方法值得付出线性代数代价的一切：同时处理多个输入和多个输出的能力，精确说出系统的哪些部分某个执行器能够到达、某个传感器能够看见的能力，用算术而不是用画图配置闭环极点的能力，以及估计一个无法测量的变量的能力。这个框架不是做频率方法所能做的事的更好方式——对单回路，频率方法做得更好——它是做单回路做不到的事的唯一方式。

整个学科归结为三个问题及其秩检验。**输入能驱动每一个模态吗？**能控性，答案是一个矩阵的秩。**输出能揭示每一个模态吗？**能观性，答案是一个转置矩阵的秩。**若两者皆是，多快多好？**极点配置与观测器，答案是你想把闭环极点放在哪里就放在哪里、想把估计器极点放在哪里就放在哪里，彼此独立，两个设计相乘即可。其余的一切——最优调节器、卡尔曼滤波器、把这份自由与频域裕度调和一致的回路传输恢复——都建立在这三者之上。

::: warning 极点配置容易被误用
给定一个能控模型，任意极点配置是一条公式，而刚学会它的设计师会把闭环极点放在规格要求的地方、把观测器极点放在其上一个数量级或更多处。这两个动作都需要小心。把极点放到远超对象自身动力学所能支持的位置以左，要求**控制功**：所需反馈增益随期望带宽上升而迅速增长，而对一个带右半平面零点或轻阻尼柔性模态的对象，为把极点移过它而算出的增益可能在**真实对象上起失稳作用**，因为产生该增益的模型不是对象。把观测器放得很快则有更隐蔽的代价：观测器越快，回路越接近恢复状态反馈设计的裕度，但校正器的高频增益大致与观测器带宽成正比地上升，于是传感器噪声与未建模的高频动力学被放大。让两者都保持诚实的法则是：**闭环带宽应低于模型误差变大的频率**，而观测器通常放在比控制器快二到五倍处，其确切速度由传感器噪声决定。无论怎样选择，分离原理在算术上都成立；工程就在这些选择之中。
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
C_c = \begin{bmatrix} 800 & 0 \end{bmatrix},
$$
其$A$与前面相同，因为物理状态恰好就是相变量。
**模态形式。**特征值为$0$与$- 0.1$；以$T$为模态矩阵，
$$
A_\Lambda = \begin{bmatrix} 0 & 0 \\ 0 & - 0.1 \end{bmatrix}, \quad
B_\Lambda = \begin{bmatrix} 8000 \\ - 8000 \end{bmatrix}, \quad
C_\Lambda = \begin{bmatrix} 1 & 1 \end{bmatrix} .
$$
把$C_\Lambda$归一化为全一时，模态$B$列出的是部分分式展开$8000 / s - 8000 / \left( s + 0.1 \right)$的留数：两者都非零，所以两个模态都能控且能观，而它们在$0.1\ \mathrm{rad / s}$以上几乎相互抵消，这就是该轴在那里表现得像纯双积分器$800 / s^{2}$的原因。若摩擦为零，两个特征值会在原点重合，模态形式便不存在——一个亏损矩阵，一个只有一个特征向量的重极点——此时必须改用若尔当形或物理坐标。

**校核。**$C \left( sI - A \right)^{- 1} B = \left[ 1 \; 1 \right] \operatorname{diag} \left( 1 / s , 1 / \left( s + 0.1 \right) \right) \left[ 8000 , - 8000 \right]^{T} = 8000 \left( \frac{1}{s} - \frac{1}{s + 0.1} \right) = \frac{800}{s \left( s + 0.1 \right)}$ $\checkmark$

**合理性检验。**三种表示有完全相同的输入-输出行为与完全相同的极点配置答案，而它们之间的选择是选择要**看见**什么。模态形式回答"我能控制那个柔性模态吗？"，物理形式回答"传感器测的是什么？"；可控标准形便于计算增益，却把两者都藏了起来。
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
当$\operatorname{rank} \mathcal{C} = n$时系统能控，当$\operatorname{rank} \mathcal{O} = n$时系统能观。等价地，有**波波夫（Popov）-别列维奇（Belevitch）-奥图斯（Hautus）**检验：当且仅当$A$的某个左特征向量$w$满足$w^{H} B = 0$时系统不能控；当且仅当某个右特征向量$v$满足$C v = 0$时不能观。不能控的模态无论施加什么反馈都保持其开环特征值，所以只有当每个不能控模态本身已稳定时，对象才能被镇定（**可镇定性**）。不能观的模态无法被观测器校正，观测器在该模态上的误差只按模态自身的速率衰减，所以可用的观测器要求每个不能观模态都稳定（**可检测性**）。既不能控又不能观的模态完全不出现在输入-输出描述中，并原样出现在闭环里。
:::

::: proof 秩检验为什么是这两个 {#proof-rank}
**能控性。**把$\dot{x} = A x + B u$在$n$个采样时刻上迭代，或对$\left[ 0 , T \right]$上的分段常值输入算连续时间积分，可把可达集表示为$\left\{ B , A B , \ldots \right\}$的张成：
$$
x (T ) - \mathrm{e}^{A T} x (0 ) = \int_0^{T} \mathrm{e}^{A \left( T - \tau \right)} B u \, \mathrm{d} \tau
= \sum_{k = 0}^{\infty} \frac{A^{k} B}{k!} \int_0^{T} \left( T - \tau \right)^{k} u (\tau ) \mathrm{d} \tau .
$$
每一项都落在$\mathcal{C}$的列空间里，而由凯莱-哈密顿定理，超过$A^{n - 1} B$的任何项都不再增添东西，所以可达集**就是**那个列空间。$\checkmark$
**对角情形，意义可见之处。**对$A = \operatorname{diag} \left( \lambda_i \right)$，
$$
\mathcal{C} = \begin{bmatrix} b_1 & \lambda_1 b_1 & \cdots \\ b_2 & \lambda_2 b_2 & \cdots \\ \vdots & \vdots & \end{bmatrix},
$$
第$i$行消失当且仅当$b_i = 0$。输入系数为零的模态无法被移动，而秩检验说的就是：一旦每一行都非零，互异$\lambda_i$的范德蒙矩阵就满秩。$\checkmark$
**对偶性。**$\left( A , B \right)$能控当且仅当$\left( A^{T} , C \right)$能观，因为$\mathcal{O} \left( A , C \right) = \mathcal{C}^{T} \left( A^{T} , C^{T} \right)$。所以每条能控性定理都有一个能观性孪生定理，而下面的观测器设计就是箭头反转后的控制器设计。$\checkmark$

**注。**秩检验是关于**精确**模型的陈述，工程从这里开始。一个在$10^{6}$分之一以内不能控的模态，在算术上能控、在实践中无用，因为控制它所需的增益是控制一个名正言顺受驱动的模态所需增益的一百万倍。因此实用的量不是秩，而是$\mathcal{C}$的**最小奇异值**，或者更好的，是到达目标状态$x_T$的最小控制能量
$$
E_{\min} = x_T^{T} W_c \left( T \right)^{- 1} x_T ,
\qquad
W_c (T ) = \int_0^{T} \mathrm{e}^{A \tau} B B^{T} \mathrm{e}^{A^{T} \tau} \mathrm{d} \tau,
$$
$\sigma_{\min} (\mathcal{C})$小的模态$E_{\min}$大，而在配置极点之前先算它的工程师可能会发现，那个看上去可达的规格需要一台并不存在的执行器。
:::

::: widget plot
f: abs(sin(pi*x)); abs(sin(2*pi*x))
x: 0, 1
y: 0, 1.05
labels: mode 1; mode 2
caption: 均匀简支梁前两阶振型的幅值，横轴为单个力执行器的位置。曲线穿过零的地方，该模态从该执行器位置就不能控：跨中的执行器完全无法激励第二阶模态，秩检验精确地报告这一点。设计师的对策是把执行器放在必须控制的模态的节之外——这就是为什么柔性结构上执行器的位置要在设计控制器之前决定。
:::

::: example 你能到达哪些模态？ {#ex-reach}
一座跨长为$L$的简支桥面要用一个建模为跨中力执行器的调谐质量阻尼器来控制。前四阶竖向模态中它能控制哪些？秩检验怎么说？
::: solution
振型为$\varphi_n \left( x \right) = \sin \left( n \pi x / L \right)$，所以在模态坐标下输入向量为$B_n = \varphi_n \left( x_a \right)$，在跨中
$$
B_n = \sin \frac{n \pi}{2} = 1 , 0 , - 1 , 0 , \ldots
$$
偶数阶模态在跨中有**节**，不能控。每个模态贡献两个状态；奇数阶模态的状态能控，因为它们的特征值$\pm \mathrm{j} \omega_1$、$\pm \mathrm{j} \omega_3$互异且输入系数非零；对偶数阶模态，模态$\mathcal{C}$的对应行为零，所以四个模态的八个状态中只有四个能控，秩为$4$。
**控制权限。**对第三阶模态，执行器同样坐在**波腹**上，所以每牛顿的模态力与第一阶相同。但简支梁的固有频率按$n^{2}$增长，所以$\omega_3 = 9 \omega_1$，第三阶模态的模态刚度是第一阶的$81$倍：执行器完全够得着它，但同样的力使它移动得少得多。
**补救。**把阻尼器移出跨中。在$x_a = 0.2 L$处，$B_n = \sin \left( 0.2 n \pi \right) = 0.59 , 0.95 , 0.95 , 0.59$，一台执行器就能到达全部四个模态。在$L / 4$与$3 L / 4$处的两个阻尼器能到达前三阶，却恰好坐在第四阶的节上。

**校核。**执行器在$L / 4$与$3 L / 4$时，$B_n = \left[ \sin \frac{n\pi}{4} , \sin \frac{3 n\pi}{4} \right]$对$n = 1$给出$\left[ 0.707 , 0.707 \right]$，对$n = 2$给出$\left[ 1 , - 1 \right]$，对$n = 3$给出$\left[ 0.707 , 0.707 \right]$，对$n = 4$给出$\left[ 0 , 0 \right]$——这一对执行器无法控制第四阶模态。$\checkmark$

**合理性检验。**秩检验是精确的，物理是近似的：真实桥面的模态不是完美的正弦，真实阻尼器不是点力，而"不能控"的偶数阶模态会因桥面的不对称而弱能控——这比真正不能控更糟，因为设计师的模型说那个模态不存在，而风或车流说它存在。工程习惯是：把靠近某模态节点的执行器视为对该模态权限很小，并在执行器位置定死之前画一张模态能控性图。
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
其高频行为由$L$决定，其阶数等于对象的阶数。快的观测器使回路趋近状态反馈设计的裕度（这正是回路传输恢复的思想），却使这个校正器的高频增益变大，于是放大传感器噪声、并对未建模的高频动力学作出反应；慢的观测器安静，却改变了裕度。分离原理是关于**极点**的陈述，而把它读成关于**性能**的陈述的设计师，可能做出一个极点分毫不差、却裕度不足或噪声过大的回路。$\checkmark$
:::

::: example 带观测器的极点配置 {#ex-poleplace}
为[[#ex-motor-ss]]的电机轴设计状态反馈控制器与观测器：闭环固有频率$20\ \mathrm{rad / s}$、阻尼$0.707$，观测器取$100\ \mathrm{rad / s}$、阻尼$0.9$。
::: solution
**反馈。**以[[#ex-motor-ss]]的$A$与$B$，$A - B K$的特征多项式为
$$
s^{2} + \left( 0.1 + 800 k_2 \right) s + 800 k_1 ,
$$
与$s^{2} + 2 \times 0.707 \times 20 s + 400 = s^{2} + 28.28 s + 400$匹配得
$$
k_1 = 0.500\ \mathrm{A / rad}, \qquad k_2 = 0.0352\ \mathrm{A\, s / rad} .
$$
**前馈。**从$r$到$\theta$的闭环直流增益为$800 k_r / \left( 800 k_1 \right)$，所以要求为一即$k_r = k_1 = 0.500\ \mathrm{A / rad}$给定。
**观测器。**$A - LC = \begin{bmatrix} - L_1 & 1 \\ - L_2 & - 0.1 \end{bmatrix}$，特征多项式
$$
s^{2} + \left( L_1 + 0.1 \right) s + \left( 0.1 L_1 + L_2 \right) = s^{2} + 180 s + 10^{4},
$$
所以$L_1 = 179.9\ \mathrm{s^{- 1}}$、$L_2 = 9982\ \mathrm{s^{- 2}}$。
**校核。**四个闭环特征值是$- 14.14 \pm 14.14\ \mathrm{j}$与$- 90 \pm 43.6\ \mathrm{j}$——正是那两个设计，如分离原理所要求。

**合理性检验。**消去观测器，从测得的角度到电流的控制器为$C (s ) = \left( 442 s + 5000 \right) / \left( s^{2} + 208 s + 15\,470 \right)$：一个位于$11.3\ \mathrm{rad / s}$、提供速度反馈的零点，加上使增益滚降的观测器极点对。它的增益从直流处的$0.32\ \mathrm{A / rad}$升到$120\ \mathrm{rad / s}$附近的峰值$2.1\ \mathrm{A / rad}$，回路的灵敏度峰值为$M_s = 1.42$，而理想状态反馈为$1.00$。把观测器移到$1000\ \mathrm{rad / s}$可把$M_s$降到$1.05$，却使校正器的峰值增益升高十倍，到$20\ \mathrm{A / rad}$，于是到达电流指令的编码器噪声多十倍。这就是用两个数表达的观测器权衡，也是观测器带宽要对照传感器噪声来选、而不是越快越好的原因。
:::
:::

::: example 估计不可测之物的观测器 {#ex-estimator}
一个截面积为$A_t$的罐，液位可测，但**流入量**——那个要紧的扰动——不可测。估计它。
::: solution
**模型。**以$h$为液位、$q_{in}$为未知流入量、$u$为可测流出量，$A_t \dot{h} = q_{in} - u$，所以取$x = \left[ h , q_{in} \right]^{T}$、把$q_{in}$建模为常量，
$$
\dot{x} = \begin{bmatrix} 0 & 1 / A_t \\ 0 & 0 \end{bmatrix} x + \begin{bmatrix} - 1 / A_t \\ 0 \end{bmatrix} u,
\qquad y = \begin{bmatrix} 1 & 0 \end{bmatrix} x .
$$
**能观性。**$\mathcal{O} = \begin{bmatrix} 1 & 0 \\ 0 & 1 / A_t \end{bmatrix}$——满秩。流入量之所以能观，是因为它表现为液位的**斜率**，而这正是基于积分器的估计器所提取的东西。
**观测器。**$A - LC = \begin{bmatrix} - L_1 & 1 / A_t \\ - L_2 & 0 \end{bmatrix}$，特征多项式$s^{2} + L_1 s + L_2 / A_t$。选$- \omega_o$处的二重极点得$L_1 = 2 \omega_o$、$L_2 = A_t \omega_o^{2}$，这个估计器具有二阶（二型）锁相环的结构：液位误差驱动液位估计，液位误差同时又积分进流入量估计。
**时间尺度。**取$A_t = 4\ \mathrm{m^{2}}$、名义流入量$0.02\ \mathrm{m^{3} / s}$，选$\omega_o = 0.02\ \mathrm{rad / s}$（$50\ \mathrm{s}$时间常数）得$L_1 = 0.04\ \mathrm{s^{- 1}}$、$L_2 = 1.6 \times 10^{- 3}\ \mathrm{m^{2} / s^{2}}$，流入量估计的阶跃响应$1 - \left( 1 + \omega_o t \right) \mathrm{e}^{- \omega_o t}$在$4.74 / \omega_o \approx 240\ \mathrm{s}$后进入百分之五以内。

**校核。**取$u = 0$，估计器从$y$到$\hat{q}_{in}$的传递函数是$A_t s \, \omega_o^{2} / \left( s^{2} + 2 \omega_o s + \omega_o^{2} \right)$，低频下给出$\hat{q}_{in} \approx A_t s y$——截面积乘以液位变化率——所以整个设计就是一个**带滤波的微分器**，滤波器由$\omega_o$摆放。$\checkmark$

**合理性检验。**未知输入估计器是这一课里最被低估的思想，因为它用一个计算出来的扰动取代测量扰动，而计算的那个不需要校准。它的局限正是任何微分的局限：$q_{in}$的估计只和液位信号的斜率一样好，从液位到流入量估计的滤波器增益在$\omega = \omega_o$处达到峰值$A_t \omega_o / 2 = 0.04\ \mathrm{m^{2} / s}$，所以该频率附近$2\ \mathrm{cm}$的液位噪声产生至多$8 \times 10^{- 4}\ \mathrm{m^{3} / s}$的流入量噪声，占名义值的百分之四——可以接受。想要更快的跟踪就把估计器时间常数减半，噪声随之加倍——这与微分滤波器所做的交换是同一个，理由也相同。
:::
:::

::: example 设计 {#ex-design-two-mass}
一台伺服轴通过谐波减速器驱动负载。折算到输出轴的电机惯量$J_m = 0.05\ \mathrm{kg\, m^{2}}$，负载惯量$J_L = 0.05\ \mathrm{kg\, m^{2}}$，联轴器的扭转刚度$K_c = 2000\ \mathrm{N\, m / rad}$。规格要求主导闭环极点对位于$- 32 \pm 32\ \mathrm{j}$（$\zeta = 0.71$），负载位置可测。设计回路并决定测什么。
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
\frac{\Theta_m}{\Tau} = \frac{20 \left( s^{2} + 40{,}000 \right)}{s^{2} \left( s^{2} + 80{,}000 \right)},
$$
它在$\omega_a = 200\ \mathrm{rad / s}$处有反共振，是一个性态更好的对象。
**状态反馈。**取$x = \left[ \theta_L , \omega_L , \delta , \dot{\delta} \right]^{T}$，模型从$\tau$能控，把四个极点配置在$- 32 \pm 32\ \mathrm{j}$以及（对共振极点对）$- 20 \pm 15\ \mathrm{j}$得
$$
K = \begin{bmatrix} 1.60 & 0.152 & - 3740 & 5.20 \end{bmatrix}
$$
单位为每弧度、每弧度每秒的$\mathrm{N\, m}$。第三个元素最能说明问题。在扭转变形方程中，反馈加上$- 20 \times \left( - 3740 \right) \delta = + 74{,}800 \delta$，对抗联轴器的$- 80{,}000 \delta$：为了把共振极点对从$283\ \mathrm{rad / s}$拖到$- 20 \pm 15\ \mathrm{j}$，控制器抵消了联轴器$93\ \%$的刚度。这正是警告中所说的越界的具体形态——一个只有在刚度已知到百分之几以内时才管用的增益。让共振极点对留在其固有频率附近、只给它加阻尼，例如取$\zeta = 0.5$、$\omega_n = 283\ \mathrm{rad / s}$，得到的扭转变形增益要温和得多，也是更好的用法。
**观测器。**扭转变形及其速率没有测量，所以需要四阶观测器。把它放在控制器五倍处就是$160\ \mathrm{rad / s}$，令人不安地接近电机测量对象$200\ \mathrm{rad / s}$的反共振，又稳稳低于负载测量对象$283\ \mathrm{rad / s}$的共振；观测器增益随后在它试图控制的那个模态所在的频率上把估计误差馈入力矩指令，而建模刚度的任何误差都会变成对该模态的激励。

**设计点评。**三个选择胜过四阶设计，驱动器工程师按这个顺序采用它们。在$283\ \mathrm{rad / s}$处对**力矩指令做陷波**，在$32\ \mathrm{rad / s}$处闭合一个PID位置环：典型的陷波在穿越频率处只花约$6$到$9^{\circ}$的相位，而整个设计可以用频率响应验证。**加装电机侧编码器**，它使扭转变形直接可测，减轻观测器的负担，并给出同位测量，其相位在共振处不会低于$- 180^{\circ}$。或者**把联轴器做硬**，把$\omega_r$推到$500\ \mathrm{rad / s}$以上，让四阶设计宽裕。算术确立的是这三条路都存在的原因：一个无阻尼共振只在穿越频率的九倍处，而状态估计器必须放在穿越频率与该共振之间，这个框架的答案存在于模型之上，在对象上却很脆弱。当结构在带宽附近有**若干**柔性模态、或有若干输入——机器人臂、龙门架、磁盘驱动器——单个陷波不够用时，这个框架才对得起它的代价。
:::
:::

::: history
控制中的状态空间方法在很大程度上是**鲁道夫·卡尔曼（Rudolf E. Kálmán）**1960年前后在巴尔的摩高级研究所（Research Institute for Advanced Studies）的工作。1960年他提出了能控性与能观性（*"On the general theory of control systems"*，莫斯科第一届IFAC大会）、线性二次型调节器（*"Contributions to the theory of optimal control"*），以及以他命名的递推滤波器（*"A new approach to linear filtering and prediction problems"*，《基础工程学报》（*Journal of Basic Engineering*））；同年他与**约翰·伯特伦（John Bertram）**把李雅普诺夫第二方法引入控制，1961年又与**理查德·布西（Richard S. Bucy）**发表了连续时间的**卡尔曼-布西滤波器**。最优调节器建立在**理查德·贝尔曼（Richard Bellman）**1950年代的动态规划之上。
观测器出自**戴维·伦伯格（David Luenberger）**1964年发表在《IEEE军用电子汇刊》（*IEEE Transactions on Military Electronics*）上的论文*"Observing the state of a linear system"*。单输入极点配置的系数匹配公式通常归功于**巴斯（Bass）与古拉（Gura）**（1965），本课所用的紧凑单输入公式归功于**于尔根·阿克曼（Jürgen Ackermann）**（1972）。1960年代末与1970年代的几何理论——**巴西莱（Basile）与马罗（Marro）**的受控不变子空间与**沃纳姆（W. M. Wonham）**的《线性多变量控制：几何方法》（*Linear Multivariable Control: a Geometric Approach*，1974）——以及**罗杰·布罗基特（Roger Brockett）**的*Finite Dimensional Linear Systems*（1970）、**托马斯·凯拉斯（Thomas Kailath）**的*Linear Systems*（1980）等教科书使这门学科成为标准内容。与频域鲁棒性的调和来自**约翰·多伊尔（John Doyle）**与**冈特·斯坦（Gunter Stein）**的回路传输恢复（1979）及其1981年的论文*"Multivariable feedback design: concepts for a classical/modern synthesis"*。
:::

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

## 后续内容

观测器的噪声灵敏度与[[control-systems/pid-control]]的微分滤波器是同一个交换，恢复后回路的灵敏度峰值是[[control-systems/feedback-stability]]的水床，真实观测器所必需的离散化是[[control-systems/digital-control]]的主题，而[[#ex-design-two-mass]]的双质量对象就是[[vibrations/two-degrees-of-freedom]]的两自由度共振从控制一侧的样子。

::: summary
- 状态模型是传递函数上的一个坐标系；模态坐标是显示哪个模态执行器够得着、传感器看得见的那一个。
- 能控性与能观性是秩检验，而它们的实际内容不是秩，而是最小奇异值及其蕴含的控制能量。
- 能控系统容许用阿克曼公式任意配置极点；能观系统容许任意配置观测器极点，而两个设计彼此独立，因为联合矩阵是块三角的。
- 分离原理说的是极点而不是性能：它产生的校正器，其高频行为带着观测器的动力学，更快的观测器以噪声增益为代价买到裕度。
- 未知输入估计是一项被低估的技术，它把不可测扰动变成可测量的带滤波微分，附带与任何微分相同的噪声交换。
- 对带一个柔性模态的单输入单输出对象，一个陷波加一个PID通常比全阶设计便宜；当有多个模态、多个输入或必须重构的不可测状态时，这个框架才物有所值。
:::

## 习题

::: exercise 状态 {level=1 check="2"}
一个质量通过并联的弹簧与阻尼器接地，其模型需要几个状态？输出为位置，输入为作用在质量上的力。
::: solution
两个——质量的位置（即弹簧的变形）与速度。
:::
:::

::: exercise 秩 {level=1 check="1"}
对$A = \operatorname{diag} \left( 1 , 2 \right)$、$B = \left[ 1 , 0 \right]^{T}$，能控性矩阵的秩是多少？
::: solution
一。第二个模态没有输入系数，不能控。
:::
:::

::: exercise 对偶 {level=1 check="3"}
若$\left( A , B \right)$能控且有$n = 3$个状态，矩阵对$\left( A^{T} , B^{T} \right)$（即以$A^{T}$为系统矩阵、$B^{T}$为输出矩阵）的能观性矩阵的秩是多少？
::: solution
三：$\left( A^{T} , B^{T} \right)$的能观性矩阵是$\left( A , B \right)$能控性矩阵的转置，所以该矩阵对能观，秩为$n = 3$。
:::
:::

::: exercise 特征值 {level=1 check="2"}
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
= \begin{bmatrix} 1 & 0 \end{bmatrix} \begin{bmatrix} 200 & 20 \\ 0 & 200 \end{bmatrix} = \begin{bmatrix} 200 & 20 \end{bmatrix} ,
$$
因为双积分器的$A^{2} = 0$。
**合理性检验。**$\omega_n = \sqrt{200} = 14.1$、$2 \zeta \omega_n = 20$给出$\zeta = 0.707$，而双积分器的一般法则$K = \left[ \omega_n^{2} , 2 \zeta \omega_n \right]$立即随之而来——这与用匹配系数法摆放PD控制器的答案相同，也是第一个迹象：对所有状态都可测的系统做状态反馈，不是一种新技术，而是旧技术的系统化版本。
:::
:::

::: exercise 观测器增益 {level=2}
对$A = \left[ \begin{smallmatrix} 0 & 1 \\ 0 & - 3 \end{smallmatrix} \right]$、$C = \left[ 1 \; 0 \right]$，求观测器极点配置在$- 6 \pm 6\ \mathrm{j}$的$L$。
::: solution
$A - LC$的特征多项式为$s^{2} + \left( L_1 + 3 \right) s + \left( 3 L_1 + L_2 \right)$；与$s^{2} + 12 s + 72$匹配得$L_1 = 9$、$L_2 = 45$。
**合理性检验。**观测器极点的模为$\sqrt{72} = 8.5\ \mathrm{rad / s}$，约为对象自身$- 3$处极点的三倍，这是一个温和而站得住的比值；增益$L_2 = 45$是等价的微分作用，是设计被接受之前必须对照测量噪声校核的那个数。
:::
:::

::: exercise 分离 {level=2}
对一个二阶对象，设计把控制器极点配置在$- 5 \pm 5\ \mathrm{j}$、两个观测器极点都配置在$- 50$。列出联合系统的闭环特征值。
::: solution
$- 5 + 5\ \mathrm{j}$、$- 5 - 5\ \mathrm{j}$、$- 50$与$- 50$——二阶对象配二阶观测器的四个特征值，是两个设计的并集。
**合理性检验。**$- 50$的观测器极点是主导极点实部的十倍，处在可用范围的上端；那个快模态的瞬态加权，正是基于观测器的设计的阶跃响应与状态反馈设计不同的原因，即使极点分毫不差地放在要求的位置，它也可以很大。
:::
:::

::: exercise 推导 {level=3}
证明：对$A = \operatorname{diag} \left( \lambda_1 , \ldots , \lambda_n \right)$且特征值互异、单输入$B = \left[ b_1 , \ldots , b_n \right]^{T}$时，系统能控当且仅当每个$b_i \ne 0$；并说明重特征值时会怎样。
::: solution
$\mathcal{C} = \left[ B , AB , \ldots , A^{n - 1} B \right]$的第$i$行等于$b_i \left[ 1 , \lambda_i , \ldots , \lambda_i^{n - 1} \right]$，所以$\mathcal{C} = \operatorname{diag} \left( b_i \right) V$，其中$V$是$\lambda_i$的范德蒙矩阵。节点互异的范德蒙矩阵非奇异，所以$\operatorname{rank} \mathcal{C} = n$当且仅当每个$b_i \ne 0$。
对角$A$有**重**特征值时，比如$\lambda_1 = \lambda_2$，$\mathcal{C}$的第$1$、$2$行是同一行向量$v$的$b_1 v$与$b_2 v$，线性相关，所以单个输入**永远**无法同时控制这两个模态。PBH检验给出同样结论：$\operatorname{rank} \left[ \lambda_1 I - A , B \right] \le n - 1$，因为$\lambda_1 I - A$有两个零行，而一列$B$填不满这两行。有$m$个输入时，条件变为属于该重特征值的$B$的各行线性无关。
**合理性检验。**这个区分不是迂腐：由实测频率响应数据建立的模型只能辨识到相似变换以内，而靠检查数值拟合得到的模态实现中$B$矩阵的元素来检验能控性的设计师，只要有两个特征值靠得近就会得到错误答案，因为模态矩阵会病态，$B$的元素会变得没有意义。对原始物理实现做秩检验，或做PBH检验，才是唯一可靠的程序。
:::
:::

::: exercise 设计 {level=3}
一阶对象$\dot{x} = - x + 2 u$、$y = x$，用带积分项的状态反馈控制以零误差跟踪阶跃，观测器取闭环速率的两倍。把两个控制器极点配置在$- 3 \pm 3\ \mathrm{j}$，求所有增益。
::: solution
**增广。**取$\dot{z} = r - x$、$u = - k_1 x + k_2 z$，
$$
\begin{bmatrix} \dot{x} \\ \dot{z} \end{bmatrix}
= \begin{bmatrix} - 1 - 2 k_1 & 2 k_2 \\ - 1 & 0 \end{bmatrix}
\begin{bmatrix} x \\ z \end{bmatrix} + \begin{bmatrix} 0 \\ 1 \end{bmatrix} r ,
$$
其特征多项式为$s^{2} + \left( 1 + 2 k_1 \right) s + 2 k_2$。与$s^{2} + 6 s + 18$匹配得
$$
k_1 = 2.5, \qquad k_2 = 9.0 .
$$
**观测器。**对对象本身，$\left( A - L C \right) = - 1 - L = - 6$给出$L = 5$。
**校核。**从$r$到$y$的闭环传递函数是$18 / \left( s^{2} + 6 s + 18 \right)$——没有零点，因为积分作用的零点已被结构对消——$\zeta = 0.707$、$\omega_n = 4.24$、$2\ \%$调节时间$1.33\ \mathrm{s}$。

**合理性检验。**观测器是一个极点$- 6$的一阶滤波器，对闭环实部$- 3$，比值为二，是通常最小的分离度。消去$\hat{x}$与$z$得控制器$u = \left[ 9 \left( s + 6 \right) r - \left( 21.5 s + 54 \right) y \right] / \left[ s \left( s + 11 \right) \right]$：一个积分器、一个位于$- 2.51$的零点和一个位于$- 11$的滚降极点——一眼可辨是带滤波的PI控制器，1950年就能画出来的那种校正器。由于这里$x$是可测的，观测器只是一个噪声滤波器；这道题的价值在于看清这个化归，以及框架对"什么是积分控制器？"的回答：对一个积分跟踪误差的状态做状态反馈。
:::
:::
