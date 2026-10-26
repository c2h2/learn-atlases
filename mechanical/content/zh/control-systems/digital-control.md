1980年代以来建造的大多数控制回路都跑在计算机上，而它与前面各课的连续时间理论之间的差别，比学生预期的要小、比工程师计划的要大。说它小，是因为一台快计算机的采样-保持非常接近设计中的连续执行器，频率方法几乎原样平移过来；说它大，是因为计算机会引入连续系统绝对没有的三样东西——**一个采样周期的滞后**、**半采样率以上一切东西的混叠**、以及控制器里每个积分器和微分器的**一种离散化选择**——而对一个在设计极限附近运行的回路，每一样都是一阶效应。

整个学科归结为一个映射和三个推论。映射是$z = \mathrm{e}^{sT}$，它把$s$平面的左半折进单位圆，让稳定性从符号问题变成模的问题。三个推论是：半采样滞后的相位拖后，在穿越频率处花费$\omega T / 2$弧度，也是数字回路带宽被采样率封顶的原因；混叠，它把无法测量的噪声放进回路自己的带宽之内；以及离散化，它决定控制器的积分器在其真正要紧的频率上是否还有设计时给它的增益。无视这三样的数字设计在采样率宽裕时常常照样工作，而一旦穿越频率被调高、或采样率被降低却没有重算预算，就会失效。

::: warning 数字回路会失效、而连续回路不会的三种方式
**混叠不是麻烦，是一个控制输入。**一台$1\ \mathrm{kHz}$采样的传感器上的$950\ \mathrm{Hz}$振动，在数据里表现为一个$50\ \mathrm{Hz}$信号，而$50\ \mathrm{Hz}$在回路带宽之内，所以控制器对它的响应与对真实运动的响应完全一样。回路自身的频率响应里没有任何东西警告这一点，因为混叠分量到达时已经带着它的假频率和满幅值。抗混叠滤波器不是可选项，而它的相位拖后必须计入回路的相位预算——一个$200\ \mathrm{Hz}$的二阶巴特沃斯滤波器在$50\ \mathrm{Hz}$穿越频率处约花掉$20^{\circ}$。
**计算滞后是第二个未被建模的滞后。**采样在$t = 0$发生，控制在$t = T$算出并写出，对象在$t = T$看到它——在保持器已计入的半周期之上，再加整整一个周期的滞后。设计师建模了那个"半"、忘了那个"整"，而一个按$\omega_{gc} T = 0.5$处$20^{\circ}$裕度设计的回路，会被它没有建模的滞后吃掉$0.5\ \mathrm{rad} = 29^{\circ}$，从而失稳。
**微分的离散化是一个设计决策，不是细节。**后向差分$\left( e_k - e_{k - 1} \right) / T$比理想微分滞后半个采样，即$\omega T / 2$，到奈奎斯特频率处已失去全部$90^{\circ}$的超前；塔斯廷形式保持完整的$90^{\circ}$，但其增益在趋近奈奎斯特频率时无界增长。在一个重度微分回路的极限附近，这个选择本身就可能决定稳定与否。如果一个回路的稳定性会因为积分器从前向改成梯形而改变，这个回路就从未被鲁棒地设计过。
:::

## 采样与z变换

::: definition 采样、保持器与半采样滞后 {#def-sampling}
理想采样器把连续信号乘以一串脉冲；真实的采样器每$T$秒取一个值，并用**零阶保持器**把它保持到下一次。保持器的传递函数是
$$
H (s ) = \frac{1 - \mathrm{e}^{- sT}}{s},
$$
其频率响应的幅值为$T \operatorname{sinc} \left( \omega T / \left( 2 \pi \right) \right)$，相角为
$$
\angle H = - \frac{\omega T}{2},
$$
恰好是一个**半采样滞后**。奈奎斯特频率为$\omega_N = \pi / T$，采样信号中任何高于$\omega_N$的分量，在采样之后都会以其混叠$\left| \omega - 2 \pi k / T \right|$出现在$\left[ 0 , \omega_N \right]$之内，幅值不变、相位共轭。
:::

::: definition z变换与保持器等效离散对象 {#def-z}
采样序列的$z$变换是$\mathcal{Z} \left\{ x_k \right\} = X (z ) = \sum_{k = 0}^{\infty} x_k z^{- k}$，而映射$z = \mathrm{e}^{sT}$把虚轴搬到单位圆上、把左半平面搬进其内部、把带域$\left| \operatorname{Im} s \right| < \pi / T$一一映射。稳定性是$\left| z \right| < 1$。
连续对象$G (s )$的**保持器等效**离散传递函数是
$$
G (z ) = \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ \frac{G (s )}{s} \right\},
$$
对一阶对象给出闭式
$$
G (s ) = \frac{1}{\tau s + 1}
\quad\Longrightarrow\quad
G (z ) = \frac{1 - \mathrm{e}^{- T / \tau}}{z - \mathrm{e}^{- T / \tau}} .
$$
积分器$1 / s$的三种标准离散化是：**前向**（欧拉）的$T / \left( z - 1 \right)$、**后向**的$T / \left( 1 - z^{- 1} \right) = T z / \left( z - 1 \right)$，以及**梯形或塔斯廷（Tustin）**的$\left( T / 2 \right) \left( 1 + z^{- 1} \right) / \left( 1 - z^{- 1} \right)$，分别对应代换$s \rightarrow \left( z - 1 \right) / T$、$s \rightarrow \left( 1 - z^{- 1} \right) / T$与$s \rightarrow \left( 2 / T \right) \left( z - 1 \right) / \left( z + 1 \right)$。
:::

::: widget plot
f: x/(2*sin(x/2)); x/(2*tan(x/2))
x: 0.02, 3.10
y: 0, 1.6
labels: backward difference; Tustin
caption: 离散积分器的增益相对于理想 $1 / \left( \mathrm{j} \omega \right)$ 之比，横轴为 $\omega T$。两者在低频都趋于 1。后向差分读数偏高，在 $\omega T = \pi$ 处升到 $\pi / 2 = 1.57$；塔斯廷形式读数偏低，并在奈奎斯特频率处降到 **零**，其分子 $1 + z^{- 1}$ 在那里为零。因此用塔斯廷积分器的倒数实现的微分器，在奈奎斯特频率处有一个 **极点**——那里增益无界——这就是塔斯廷微分总要配滤波器的原因。
:::

::: example 一阶对象的保持器等效 {#ex-zoh}
一个温度回路$G = 0.8 / \left( 45 s + 1 \right)$，每$T = 1\ \mathrm{s}$采样一次。求离散对象，并求离散化在$0.03\ \mathrm{rad / s}$穿越频率处引入的相位误差。
::: solution
**离散对象。**由$\mathrm{e}^{- T / \tau} = \mathrm{e}^{- 1 / 45} = 0.9780$，
$$
G (z ) = 0.8 \times \frac{1 - 0.9780}{z - 0.9780} = \frac{0.01758}{z - 0.9780} .
$$
**直流增益。**$G (1 ) = 0.01758 / 0.02198 = 0.800$ $\checkmark$——保持器等效精确保持直流增益，这正是让设计得以平移的性质。
**极点位置。**连续极点$- 1 / 45 = - 0.0222\ \mathrm{s^{- 1}}$映射到$\mathrm{e}^{- 0.0222} = 0.9780$，到单位圆的距离为$0.0220$，而连续的$\left| s \right| T = 0.0222$——$1\ \%$的差别，因为$T \ll \tau$所以很小。
**相位误差。**保持器在$0.03\ \mathrm{rad / s}$处的拖后为
$$
\frac{\omega T}{2} = \frac{0.03 \times 1}{2} = 0.015\ \mathrm{rad} = 0.86^{\circ},
$$
相对[[control-systems/frequency-response#ex-design-oven]]频率响应设计的$70^{\circ}$相角裕度可以忽略。

**校核。**$G \left( \mathrm{e}^{\mathrm{j} \omega T} \right)$在$\omega = 0.03$处的精确离散相位是$- 54.33^{\circ}$，连续对象为$- 53.47^{\circ}$——差$0.86^{\circ}$，在所示精度内与半采样估计吻合。$\checkmark$

**合理性检验。**从这套算术里掉出来的法则是每家驱动器厂商都印的那条：**采样至少比回路穿越频率快二十倍**：在$f_s = 20 f_{gc}$时，$\omega_{gc} T = 2 \pi / 20 = 0.31$，保持器花掉$0.16\ \mathrm{rad} = 9^{\circ}$，是预算中已知且付得起的一份。这条法则说的不是对象的极点——它在任何合理速率下都良性地离散化——而是保持器的相位，它随穿越频率线性增长，根本不在乎对象有多慢。
:::
:::

::: example 混叠算例 {#ex-alias}
一个位置传感器以$1\ \mathrm{kHz}$采样，没有抗混叠滤波器。机器把一次结构振动以$2\ \mathrm{mm}$幅值传进传感器读数，位置回路的穿越频率在$10\ \mathrm{Hz}$附近，其补灵敏度$\left| T \right| = \left| L / \left( 1 + L \right) \right|$在那里达到约$1.5$的峰值。若振动在$1499\ \mathrm{Hz}$，回路看到什么、做了什么？若在$1010\ \mathrm{Hz}$呢？
::: solution
**良性情形。**以$f_s = 1000\ \mathrm{Hz}$采样，$f = 1499\ \mathrm{Hz}$处的分量出现在$\left| 1499 - 1000 \right| = 499\ \mathrm{Hz}$——在第一奈奎斯特区之内、但远高于回路的$10\ \mathrm{Hz}$带宽，那里$\left| T \right|$只有百分之几，所以回路几乎不对它作出响应。
**危险情形。**把振动改成$1010\ \mathrm{Hz}$，混叠就是$\left| 1010 - 1000 \right| = 10\ \mathrm{Hz}$：回路看到的像是一个货真价实的$10\ \mathrm{Hz}$、幅值$2\ \mathrm{mm}$的位置误差。
**响应。**$10\ \mathrm{Hz}$处补灵敏度接近峰值，$\left| T \right| \approx 1.5$，所以回路**对**这个假信号**动作**：真实的轴以$10\ \mathrm{Hz}$移动约$1.5 \times 2 = 3\ \mathrm{mm}$，而操作员看到轴在一个机器上没有任何部件在振动的频率上振荡。
**破绽。**混叠扰动在采样率改变时**表观频率随之移动**——这就是诊断法。把$f_s$从$1\ \mathrm{kHz}$提到$1.2\ \mathrm{kHz}$，$1010\ \mathrm{Hz}$分量的混叠就从$10\ \mathrm{Hz}$移到$190\ \mathrm{Hz}$，而一个随采样率改变而频率跳变的振荡就是混叠。

**校核。**实信号以$f_s$采样的一般混叠公式是$f_{\text{alias}} = \left|\, \operatorname{round} \left( f / f_s \right) f_s - f \,\right|$，对$f = 1010$、$f_s = 1000$给出$\left| 1000 - 1010 \right| = 10$，对$f = 1499$给出$\left| 1000 - 1499 \right| = 499$ $\checkmark$

**合理性检验。**这是控制问题而不是信号处理问题的原因，在于控制器会对混叠**动作**。数据采集工程师混叠了一个测量，得到的是一张坏图；控制工程师得到的是一个极限环，而回路自身的增益被加到了假信号上。补救是转换器之前的模拟抗混叠滤波器——例如一个$100\ \mathrm{Hz}$（奈奎斯特频率的五分之一）的二阶巴特沃斯，它把$1010\ \mathrm{Hz}$的振动衰减约$40\ \mathrm{dB}$，在本回路$10\ \mathrm{Hz}$穿越频率处约花费$8^{\circ}$，这笔代价必须从一开始就写进相位预算。
:::
:::

## 离散设计

::: definition 稳定性检验与离散根轨迹 {#def-zstab}
离散回路稳定当且仅当所有闭环极点都在单位圆内。**朱里（Jury）判据**对多项式$P (z ) = a_n z^n + \cdots + a_0$扮演劳斯的角色，要求$P (1 ) > 0$、$\left( - 1 \right)^n P \left( - 1 \right) > 0$以及一张行列式条件表；**双线性（默比乌斯（Möbius））变换**$z = \left( 1 + w \right) / \left( 1 - w \right)$把单位圆盘映到$w$平面的左半平面，让劳斯阵列可以原样使用。
**离散根轨迹**对$1 + K G (z ) = 0$画在$z$平面上，可接受的二阶行为区域是$z = 1$附近一个小圆的内部：等阻尼比$\zeta$线是**对数螺线**$\left| z \right| = \mathrm{e}^{- \zeta \angle z / \sqrt{1 - \zeta^{2}}}$，等固有频率线是与之正交的闭曲线，所以熟悉的$s$平面设计楔形变成一个弯曲区域。
:::

::: proof 半采样滞后与带宽天花板 {#proof-halfsample}
**保持器的相位。**由$H (s ) = \left( 1 - \mathrm{e}^{- sT} \right) / s$，写
$$
1 - \mathrm{e}^{- \mathrm{j} \omega T} = \mathrm{e}^{- \mathrm{j} \omega T / 2} \left( \mathrm{e}^{\mathrm{j} \omega T / 2} - \mathrm{e}^{- \mathrm{j} \omega T / 2} \right)
= 2 \mathrm{j} \sin \frac{\omega T}{2} \ \mathrm{e}^{- \mathrm{j} \omega T / 2},
$$
所以$\angle H = 90^{\circ} - 90^{\circ} - \omega T / 2 = - \omega T / 2$精确成立，且$\left| H \right| = T \sin \left( \omega T / 2 \right) / \left( \omega T / 2 \right)$。因此保持器就是一个纯半采样滞后乘以一个实的sinc——滞后是精确的，幅值下坠是对理想滞后的唯一偏离。$\checkmark$
**天花板。**一个穿越频率为$\omega_{gc}$、带一个周期计算滞后加保持器半滞后的回路，滞后引起的相位损失为
$$
\Delta \varphi = \frac{3}{2} \omega_{gc} T .
$$
要求$\Delta \varphi$不超过典型的$60^{\circ}$裕度的三分之一——二十度，$0.35\ \mathrm{rad}$——得
$$
\omega_{gc} T \le \frac{2 \times 0.35}{3} = 0.23
\qquad\Longleftrightarrow\qquad
f_s \ge \frac{2 \pi}{0.23} f_{gc} \approx 27 f_{gc} .
$$
这就是运动控制器厂商常引用的"二十到三十倍"法则的来历：它不是关于采样的定理，而是关于设计师愿意在计算机身上花掉多少相位预算的算术陈述。$\checkmark$
**法则管不到的地方。**一个**本来就有**传输滞后$\theta$的对象，总滞后为$\theta + 1.5 T$，天花板变成
$$
\omega_{gc} \le \frac{0.35}{\theta + 1.5 T},
$$
所以一个$\rho = \theta / \tau$已达$0.3$的对象，约束它的是自己的物理而不是采样率，把$T$减半几乎买不到什么。反过来，一个$\theta = 0$的刚性机械轴几乎完全受$T$限制，采样率翻倍买到可实现带宽的按比例增长。
:::

::: example 双积分器的无差拍控制 {#ex-deadbeat}
一个质点$\ddot{x} = u$，经周期$T$的零阶保持器驱动，要从静止到静止、在尽可能短的时间内移动距离$x_0$。求控制序列。
::: solution
**离散模型。**以状态$\left[ x , v \right]^{T}$，
$$
\begin{bmatrix} x \\ v \end{bmatrix}_{k + 1}
= \begin{bmatrix} 1 & T \\ 0 & 1 \end{bmatrix}
\begin{bmatrix} x \\ v \end{bmatrix}_k
+ \begin{bmatrix} T^{2} / 2 \\ T \end{bmatrix} u_k .
$$
**两步是最少的**，因为一步只有一个自由度、却有两个条件要满足。要求从$\left[ x_0 , 0 \right]$出发$x_2 = v_2 = 0$，得
$$
\begin{bmatrix} 1.5 T^{2} & 0.5 T^{2} \\ T & T \end{bmatrix}
\begin{bmatrix} u_0 \\ u_1 \end{bmatrix}
= - \begin{bmatrix} x_0 \\ 0 \end{bmatrix}
\quad\Longrightarrow\quad
u_0 = - \frac{x_0}{T^{2}}, \qquad u_1 = + \frac{x_0}{T^{2}} .
$$
**轨迹。**$x \left( T \right) = x_0 + \tfrac{1}{2} T^{2} u_0 = 0.5 x_0$，$v \left( T \right) = - x_0 / T$；质点在$t = 2 T$以零速度到达原点，**从不过冲**。
**代价。**所需加速度是$x_0 / T^{2}$：采样周期减半把它**变成四倍**。对$T = 1\ \mathrm{ms}$的平台上$0.1\ \mathrm{m}$的移动，$u_0 = 10^{5}\ \mathrm{m / s^{2}}$，约$10\,000\ g$——远超任何实际执行器。

**校核。**代入：$x_1 = x_0 - 0.5 x_0 = 0.5 x_0$，$v_1 = - x_0 / T$，$x_2 = 0.5 x_0 - x_0 + 0.5 x_0 = 0$，$v_2 = - x_0 / T + x_0 / T = 0$ $\checkmark$

**合理性检验。**无差拍就是所有极点都在原点的极点配置设计——最快的离散响应、这个框架产出的最激进控制器，也是它几乎从不裸用的原因。它的两个标准缺陷是这里展示的惊人控制功和**鲁棒性差**：作为预先算好的序列施加时，假定质量有百分之十的误差，质点会停下，但离目标差移动量的$10\ \%$；作为状态反馈$u = - \left[ 1 / T^{2} , 1.5 / T \right] x$实现时，同样的误差把闭环极点从原点移到$z = 0.23$与$- 0.43$，响应不再在两步内完成。实用形式是把极点向$\left| z \right| \approx 0.7$内移的类无差拍极点配置——那是主导极点近似的离散版本——再加上[[control-systems/pid-control]]的执行器限位。
:::
:::

::: example 从模拟设计到数字PID {#ex-dpid}
把[[control-systems/pid-control#ex-tunings]]中炉子的ZN-PI整定——$K_c = 3.68$、$T_i = 36.4\ \mathrm{s}$，对象$G = 0.8 \mathrm{e}^{- 12 s} / \left( 45 s + 1 \right)$——转换成$T = 1\ \mathrm{s}$的数字控制器，给出差分方程。
::: solution
**塔斯廷积分。**$1 / s \rightarrow \left( T / 2 \right) \left( 1 + z^{- 1} \right) / \left( 1 - z^{- 1} \right)$，所以对$u = K_c e + K_c \int e / T_i$，
$$
u_k = K_c e_k + u_{i, k},
\qquad
u_{i, k} = u_{i, k - 1} + \frac{K_c T}{2 T_i} \left( e_k + e_{k - 1} \right),
$$
代入数字$K_c T / \left( 2 T_i \right) = 3.68 / 72.8 = 0.0506$：
$$
\boxed{ u_k = 3.68\, e_k + u_{i, k - 1} + 0.0506 \left( e_k + e_{k - 1} \right) }
$$
**抗积分饱和。**积分器用反算校正，$u_{i,k} \leftarrow u_{i,k} + \left( T / T_t \right) \left( u_{\text{sat}} - u_k \right)$，跟踪时间常数按连续设计取$T_t = T_i$。
**穿越频率处的积分作用。**在$\omega_{gc} = 0.067\ \mathrm{rad / s}$处，塔斯廷积分器的增益误差是$0.04\ \%$，因为$\omega T / 2 = 0.034$——在回路真正工作的地方，离散化基本上是精确的。
**不精确的地方。**在奈奎斯特频率$\omega_N = \pi = 3.14\ \mathrm{rad / s}$处，塔斯廷积分器的增益是**零**（见上图），所以控制器在那里的增益只有$K_c$；用[[#ex-zoh]]的保持器等效对象（$12\ \mathrm{s}$滞后是整数个采样$z^{- 12}$，幅值为一），奈奎斯特处的回路增益是$3.68 \times 0.01758 / \left( 1 + 0.9780 \right) = 0.033$——比一小三十分贝，所以离散化的高频端不可能让这个回路失稳。

**校核。**离散回路的特征方程$1 + C (z ) G (z ) z^{- 12} = 0$的主导根为$z = 0.9706$与$z = 0.9625 \pm 0.0902\ \mathrm{j}$，经$s = \ln z / T$映回为$- 0.0299$与$- 0.0338 \pm 0.0934\ \mathrm{j}\ \mathrm{s^{- 1}}$。连续回路的主导根为$- 0.0299$与$- 0.0377 \pm 0.0949\ \mathrm{j}$：振荡极点对的阻尼比从$0.37$降到$0.34$，这是保持器额外半秒拖后对一个本来只有$40^{\circ}$相角裕度的回路造成的代价。$\checkmark$

**合理性检验。**这个例子是故意选得良性的：$T = 1\ \mathrm{s}$下的慢热回路$\omega_{gc} T = 0.067$，离散化几乎不可见。对$40\ \mathrm{rad / s}$的位置伺服在$T = 1\ \mathrm{ms}$下重复同样的转换，$\omega_{gc} T = 0.04$，同样良性。麻烦出现在设计师把$1\ \mathrm{ms}$的任务复用于穿越频率$200\ \mathrm{Hz}$的回路时，那里$\omega_{gc} T = 1.26$：塔斯廷积分器在穿越频率处的增益低$14\ \%$，而更糟的是保持器与计算滞后花掉$1.5 \times 1.26 = 1.9\ \mathrm{rad}$，超过$100^{\circ}$，回路根本无法工作。
:::
:::

::: example 设计 {#ex-design-servo}
为PWM载波$8\ \mathrm{kHz}$的[[control-systems/state-space#ex-design-two-mass]]双质量伺服设计数字位置回路，穿越频率$32\ \mathrm{rad / s}$。
::: solution
**采样周期。**电流控制的驱动器在调制中心对齐时常每个载波周期更新两次，得$T = 62.5\ \mu\mathrm{s}$；加上一个计算周期的额外滞后，总计$1.5 T = 94\ \mu\mathrm{s}$。
**滞后代价。**在穿越频率处，
$$
\Delta \varphi = 1.5 \omega_{gc} T = 1.5 \times 32 \times 62.5 \times 10^{- 6} = 0.003\ \mathrm{rad} = 0.17^{\circ},
$$
完全可忽略。比值$f_s / f_{gc} = 16{,}000 / 5.1 = 3100$，比二十倍法则高出三个数量级。
**真正的极限。**联轴器的反共振在$200\ \mathrm{rad / s}$、共振在$283\ \mathrm{rad / s}$，而采样率与此毫无关系。
**采样率真正咬人的地方。**驱动器内部的电流环，其穿越频率通常是调制频率的五分之一，即$1.6\ \mathrm{kHz}$或$10{,}000\ \mathrm{rad / s}$，那里$\omega_{gc} T = 0.63$、滞后损失$1.5 \times 0.63 = 0.95\ \mathrm{rad} = 54^{\circ}$——其相位预算的大半花在了计算机上。这就是电流环是驱动器里最难的数字控制问题的原因，也是高性能驱动器采用一步无差拍电流控制、用基于模型的预测提前一步算出电流的原因。
**预测。**由当前电流预测下一个电流，$\hat{i}_{k + 1} = \Phi i_k + \Gamma u_k$，并对$\hat{i}_{k + 1}$而不是$i_k$施加算出的控制，就把整整一个采样周期的滞后找了回来，代价是一次乘加——这是高性能驱动器中的标准技术。

**设计点评。**这个例子的算术就是"我需要多快的采样率？"这个问题的诚实回答，即：**采样率在位置回路上从来不是极限，在电流回路上几乎总是极限。**$32\ \mathrm{rad / s}$的位置回路能容忍$T = 1\ \mathrm{ms}$（滞后代价$1.5 \times 0.032 = 0.048\ \mathrm{rad} = 2.8^{\circ}$）；$10{,}000\ \mathrm{rad / s}$的电流环在没有预测时于$T = 62.5\ \mu\mathrm{s}$就已花掉$54^{\circ}$。用一条采样率法则设计这两个回路，会浪费位置回路的裕度、饿死电流环，而常见的串级架构——电流环用最快的速率，速度环用较低的速率，位置环更低——就是这个权衡的实用解。第二个结论是：采样率问题不由回路的带宽回答，而由回路自身对象的**滞后-时间常数比**回答，与连续情形完全一样：电流环的对象是一个时间常数为毫秒量级的$L / R$，所以$62.5\ \mu\mathrm{s}$的采样是它不小的一部分；而位置回路的是一个根本没有时间常数的刚体，所以采样率是免费的。
:::
:::

::: history
采样数据控制源于战时的雷达与火控工作。**维托尔德·胡列维奇（Witold Hurewicz）**在《伺服机构理论》（*Theory of Servomechanisms*，James、Nichols与Phillips编，1947年，麻省理工学院辐射实验室丛书）中关于采样系统的一章给出了第一个系统处理；同年**阿诺德·塔斯廷（Arnold Tustin）**在《英国电气工程师学会学报》（*Journal of the IEE*）上关于用时间序列分析线性系统的论文，引入了如今以他命名的梯形代换。**约翰·拉加齐尼（John R. Ragazzini）**与**扎德（Lotfi A. Zadeh）**在1952年的论文*"The analysis of sampled-data systems"*中命名并定义了$z$变换，拉加齐尼在哥伦比亚大学的课题组写出了最早的教科书：**拉加齐尼与吉恩·富兰克林（Gene Franklin）**的*Sampled-Data Control Systems*与**伊莱休·朱里（Eliahu Jury）**的同名著作，都出版于1958年；朱里的稳定性判据随后问世。
**鲁道夫·卡尔曼（Rudolf Kálmán）与约翰·伯特伦（John Bertram）**1959年的论文*"A unified approach to the theory of sampling systems"*把状态空间观点带入采样系统，而无差拍（最短时间）离散控制作为把全部闭环极点置于原点的自然结果，也在同一时期出现。
**卡尔·约翰·阿斯特罗姆（Karl Johan Åström）**的《随机控制理论导论》（*Introduction to Stochastic Control Theory*，1970）把离散的最小方差调节器带入主流，而**阿斯特罗姆与比约恩·维滕马克（Björn Wittenmark）**的《计算机控制系统》（*Computer-Controlled Systems*，1984年第一版，1997年第三版）成为这一领域的标准教科书。控制工程师所依赖的采样与量化结果来自通信工程——**哈里·奈奎斯特（Harry Nyquist）**1928年的*"Certain topics in telegraph transmission theory"*、**克劳德·香农（Claude Shannon）**1949年含采样定理的*"Communication in the presence of noise"*，以及**贝内特（W. R. Bennett）**1948年的量化噪声分析——这些都不是为控制工程师写的，这或许就是混叠在控制设计中常被当作事后补充的原因。
:::

## 后续内容

半采样滞后是[[control-systems/feedback-stability]]的传输滞后换了个由设计师时钟设定的数值重新出现；离散根轨迹是[[control-systems/root-locus]]的根轨迹画在一张设计楔形会弯曲的曲面上；[[#ex-dpid]]的抗积分饱和就是[[control-systems/pid-control]]的反算在软件中的实现；而[[#ex-design-servo]]的电流环是[[control-systems/modelling-dynamic-systems]]的电气模型，处在其自身时间常数不再可忽略的那个采样率上。

::: summary
- 采样给出映射 $z = \mathrm{e}^{sT}$，把左半平面折进单位圆，让稳定性成为模的问题。
- 零阶保持器恰是一个半采样滞后加一个 sinc 下坠；加上一个计算周期共 $1.5 T$，在穿越频率处花费 $1.5 \omega_{gc} T$ 弧度。
- "二十倍带宽"法则是那句相位预算陈述，不是定理；自带传输滞后的对象受限于两者之和。
- 混叠把无法测量的高频噪声以满幅值放进回路带宽、再施以回路的全部增益；抗混叠滤波器的相位属于预算之内。
- 离散化选择——前向、后向、塔斯廷——在 $\omega_{gc} T$ 接近 $1$ 时于穿越频率处相差几个百分点，而塔斯廷积分器在奈奎斯特频率处有一个零点。
- 无差拍是所有极点在原点的离散极点配置：最快、最激进、对一切都不鲁棒；实用设计把极点内移并提前一步预测。
:::

::: quiz
一个数字回路的穿越频率翻倍，同时采样周期减半。采样-保持与计算滞后花掉的相位会怎样？
- [x] 不变，因为损失是 $1.5 \omega_{gc} T$，而乘积固定
- [ ] 减半
- [ ] 加倍
- [ ] 仅当对象没有传输滞后时才不变
::: solution
滞后损失是$1.5 \omega_{gc} T$弧度，穿越频率加倍、周期减半，乘积原地不动。带宽与采样率必须互相交换而不是同时提高，有用的动作是让采样率远快于穿越频率地提高，让这一项彻底退出相位预算。
:::
:::

## 习题

::: exercise 奈奎斯特 {level=1 check="500"}
一个信号以 $1\ \mathrm{kHz}$ 采样。不发生混叠所能表示的最高频率是多少赫兹？
::: solution
$500\ \mathrm{Hz}$，即奈奎斯特频率 $f_s / 2$。
:::
:::

::: exercise 保持器 {level=1 check="0.5"}
零阶保持器贡献多少个采样周期的滞后？
::: solution
半个采样，$T / 2$。
:::
:::

::: exercise 映射 {level=1 check="1"}
连续时间中虚轴上的极点映射到 $\left| z \right|$ 的什么值？
::: solution
一——虚轴就是单位圆，所以临界稳定的连续系统在离散意义下也临界稳定。
:::
:::

::: exercise 塔斯廷 {level=1 check="2"}
双线性代换是 $s \rightarrow c \left( z - 1 \right) / \left( z + 1 \right)$，其中 $c = k / T$。数 $k$ 是多少？
::: solution
$k = 2$，所以 $c = 2 / T$。
:::
:::

::: exercise 混叠 {level=2}
一个 $1049\ \mathrm{Hz}$ 分量先以 $1\ \mathrm{kHz}$ 采样、再以 $1.2\ \mathrm{kHz}$ 采样。给出两个混叠频率。
::: solution
$\left| 1000 - 1049 \right| = 49\ \mathrm{Hz}$ 与 $\left| 1200 - 1049 \right| = 151\ \mathrm{Hz}$。
**合理性检验。**表观频率随采样率改变而移动，是区分混叠分量与真实分量的诊断法，而且免费：把采样率改一分钟，看着频谱仪就行。
:::
:::

::: exercise 保持器等效 {level=2}
求 $G = 2 / \left( 2 s + 1 \right)$ 在 $T = 0.5\ \mathrm{s}$ 下的保持器等效离散传递函数，并校核其直流增益。
::: solution
由 $\mathrm{e}^{- T / \tau} = \mathrm{e}^{- 0.25} = 0.7788$，
$$
G (z ) = \frac{2 \times 0.2212}{z - 0.7788} = \frac{0.4424}{z - 0.7788},
\qquad G (1 ) = \frac{0.4424}{0.2212} = 2.000 .
$$
**合理性检验。**直流增益按构造被精确保持，而极点到单位圆的距离 $\left| 1 - z \right| = 0.2212$，与无量纲的连续极点 $\left| s \right| T = 0.5 \times 0.5 = 0.25$ 相比——$12\ \%$ 的差别，仍然不大，因为 $T$ 是时间常数的四分之一；采样粗得多时，离散化方法的选择就要紧了。
:::
:::

::: exercise 滞后预算 {level=2 check="21.6"}
一个回路穿越频率 $20\ \mathrm{Hz}$、采样周期 $2\ \mathrm{ms}$。给出保持器与一个计算周期各花掉的相位。（以度为单位输入总和。）
::: solution
$\omega_{gc} = 2 \pi \times 20 = 125.7\ \mathrm{rad / s}$，所以保持器花 $\omega_{gc} T / 2 = 0.126\ \mathrm{rad} = 7.2^{\circ}$，计算周期再花 $0.251\ \mathrm{rad} = 14.4^{\circ}$，共 $21.6^{\circ}$。
**合理性检验。**二十二度超过正常相角裕度的三分之一，而这里的采样率是穿越频率的二十五倍——接近厂商法则的下限。把 $T$ 减半找回十一度，这在数字回路上常常是最便宜、且不需要任何机械改动的稳定性改善。
:::
:::

::: exercise 无差拍 {level=2 check="51"}
对[[#ex-deadbeat]]的双积分器，$T = 2\ \mathrm{ms}$、移动 $2\ \mathrm{mm}$，给出两个控制值与峰值加速度。（以 $g$ 为单位输入峰值加速度。）
::: solution
$u_0 = - x_0 / T^{2} = - 2 \times 10^{- 3} / 4 \times 10^{- 6} = - 500\ \mathrm{m / s^{2}}$、$u_1 = + 500\ \mathrm{m / s^{2}}$，峰值 $51\ g$。
**合理性检验。**五十个 $g$ 在一台小音圈平台上拿得出、在皮带驱动的轴上拿不出，而标度 $u_0 \propto x_0 / T^{2}$ 说明减少它的办法是允许更多步完成移动，或按执行器能力而不是采样周期来规划运动时间——这就是为什么工业运动曲线是梯形或S曲线而不是无差拍。
:::
:::

::: exercise 推导 {level=3}
从零阶保持器的定义推导保持器等效离散传递函数 $G (z ) = \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ G (s ) / s \right\}$。
::: solution
保持器的输出是一串阶跃：$u (t ) = \sum_k u_k \left[ 1 \left( t - kT \right) - 1 \left( t - \left( k + 1 \right) T \right) \right]$，所以其拉普拉斯变换为$U (s ) = \left( 1 - \mathrm{e}^{- sT} \right) \sum_k u_k \mathrm{e}^{- k s T} / s = \left( 1 - \mathrm{e}^{- sT} \right) U (z ) / s$。对象的采样输出因而是
$$
Y (z ) = \mathcal{Z} \left\{ G (s ) \frac{1 - \mathrm{e}^{- sT}}{s} U (z ) \right\}
= \left( 1 - z^{- 1} \right) \mathcal{Z} \left\{ \frac{G (s )}{s} \right\} U (z ),
$$
因为$\mathrm{e}^{- sT}$在采样域中是一个采样滞后、可以从$z$变换中提出。$\checkmark$
**合理性检验。**这个构造解释了要紧的两个性质：因子$\left( 1 - z^{- 1} \right)$对消$1 / s$引入的$z = 1$处那个额外极点，所以相对阶为一的严格真连续对象，给出一个**极点数比零点数多一**且带一个采样滞后的离散传递函数；而直流增益被保持，因为$\left( 1 - z^{- 1} \right) \rightarrow 0$与$\mathcal{Z} \left\{ G / s \right\} \rightarrow \infty$恰好以互补的方式发生。保持器等效已经精确包含了保持器的半采样拖后，所以用$G (z )$工作的设计师不能再为保持器加一个$T / 2$——但仍须另外加上计算滞后，即再乘一个$z^{- 1}$。
:::
:::

::: exercise 设计 {level=3}
一个张力回路穿越频率 $25\ \mathrm{Hz}$、在采样周期 $1\ \mathrm{ms}$ 下相角裕度 $55^{\circ}$，抗混叠滤波器为 $250\ \mathrm{Hz}$ 的两个极点。采样周期减到 $0.5\ \mathrm{ms}$、穿越频率提到 $50\ \mathrm{Hz}$。估计新的相角裕度。
::: solution
**新穿越频率处的得与失。**
- 采样：滞后代价从 $1.5 \times 157 \times 0.001 = 0.236\ \mathrm{rad} = 13.5^{\circ}$ 变为 $1.5 \times 314 \times 0.0005 = 0.236\ \mathrm{rad} = 13.5^{\circ}$——**没有变化**，因为采样率与穿越频率一起翻倍了。
- 抗混叠滤波器：$2 \arctan \left( 50 / 250 \right) = 22.6^{\circ}$ 对 $2 \arctan \left( 25 / 250 \right) = 11.4^{\circ}$，再损失 $11.2^{\circ}$。
- 对象：回路自身的相位在 $25$ 到 $50\ \mathrm{Hz}$ 之间随对象贡献多少就降多少；对一个在该处增益斜率为 $- 40\ \mathrm{dB / decade}$ 的对象，相位已接近 $- 180^{\circ}$，额外损失通常是 $10$ 到 $15^{\circ}$。
**结果。**$55 - 11 - 12 \approx 32^{\circ}$，设计处于临界。
**补救。**把抗混叠滤波器移到 $800\ \mathrm{Hz}$ 并进一步减小采样周期，或者接受 $35\ \mathrm{Hz}$。

**合理性检验。**有教益的是第一条：**采样率与穿越频率一起翻倍什么也买不到**，因为滞后代价是$1.5 \omega_{gc} T$而乘积不变。采样率与带宽必须互相交换，有用的设计动作是让采样率的提高远超带宽的提高——带宽翻倍、速率翻五十倍——让滞后那一项彻底不再出现在预算里。
:::
:::
