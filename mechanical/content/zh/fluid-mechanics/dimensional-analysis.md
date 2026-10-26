量纲分析是流体力学中唯一一种**不求解任何方程就能得出结果**的工具。给定起作用的变量清单及其量纲，**1914 年**提出的**白金汉 π 定理**就告诉你答案所能依赖的独立无量纲数的个数，此后写出的任何正确方程都不需要更多。用得好，它在做第一次实验之前就确定了本书中每一个关联式的形式；用得不好，它只产生一串什么也解释不了、什么也约束不了的希腊字母，因为**定理的好坏取决于变量清单，而变量清单本身是一个物理论断**。

它的工程价值在于把一次实验从一个测量值变成一条**规律**。在实验室里用$13\ \mathrm{mm}$内径、$2\ \mathrm{m / s}$的水测得的管道摩擦曲线，是关于那根管子的一个事实；同样的数据画成$f$对$\mathrm{Re}$的曲线，就是关于所有相对粗糙度相近的管道的事实。于是可以用$25\ \mathrm{mm}$的水试验台来设计$900\ \mathrm{mm}$的输油干管——两种看上去毫不相像的流动——前提是**起支配作用的无量纲数在两者中取相同的值**。

::: warning 七个产生自信胡说的量纲分析错误
**漏掉一个起作用的变量。**如果清单漏掉了物理上需要的变量，定理给出的无量纲数就**太少**，所得关联式不得不把缺失的物理吸收进一个并不是函数的"函数"里——它随每一组数据而变。**典型情形是从未做过的压缩性检查**：只用$\left( \mathrm{Re}, \mathrm{Fr} \right)$的风机试验台关联式在$30\ \mathrm{m / s}$时可能表现极好，到$90\ \mathrm{m / s}$（$\mathrm{Ma} \approx 0.26$）时却发生漂移，因为$\mathrm{Ma}$不在清单里，而它的影响虽小却不为零。**检查的办法是在实验之前写出清单，并对每一个想要舍去的候选变量追问："它通过什么机制进入？在我的极端工况下这个机制有多大？"****纳入一个不起作用的变量。**这时定理给出的无量纲数**太多**，关联式看起来需要一个二维曲面，而实际上一条曲线就够了。**症状是一个"关联式"中多出来的那个无量纲数的系数没有实际意义，其指数在不同数据组之间改变符号。**补救办法是在装置允许的尽可能宽的范围内有意检验该无量纲数的影响，**如果答案不动，就把它从清单中去掉**。**选取的重复变量组不独立。**$k$个重复变量必须**量纲独立**——它们的任何乘积都不能是无量纲的。选$\rho, \mu, \nu$不行，因为$\nu = \mu / \rho$；选$D, V, V^2 / 2$也因同样原因不行；而且这种失败是无声的，因为代数运算得到一个奇异矩阵，求解器却照样返回点什么。**检查的办法是写出重复变量组的量纲矩阵，确认其行列式不为零。****把无量纲数当作唯一的。**它们不是唯一的：$\mathrm{Re}$与$\mathrm{Re}^2$和$\mathrm{Re}$与$\mathrm{Eu}$一样有效，有效组合的任何可逆变换都仍然有效。**唯一的是无量纲数的个数，以及它们之间存在一个关系这一事实。**两个实验室发表了不同的无量纲数组合，并不意味着二者矛盾；甚至同一个有名称的无量纲数也可能有不同的约定——达西摩擦因子与范宁摩擦因子相差四倍——所以比较数值之前一定要核对定义。**假定关系是光滑的。**定理说$\pi_1 = \phi \left( \pi_2, \pi_3 \right)$，对$\phi$却什么也没说。**一个无量纲数可能越过某个临界值，在那里物理发生改变**——管道中的$\mathrm{Re} = 2{,}300$，圆球上的$\mathrm{Re} = 3 \times 10^5$，流体层中的$\mathrm{Ra} = 1{,}708$——跨越转变拟合的关联式在两侧都毫无价值。**定理给你坐标轴，却不给曲线的形状，而物理恰恰在形状里。****把关联式外推到某个无量纲数的试验范围之外。**为$10 < \mathrm{Re} < 10^4$和$0.7 < \mathrm{Pr} < 160$建立的传热关联式，在$\mathrm{Re} = 10^7$、$\mathrm{Pr} = 0.01$时并不是自然规律；液态金属冷却的关联式要单独建立，因为$\mathrm{Pr} = 0.01$不仅仅是"普朗特数低"，而是一个**不同的流态**——热边界层比速度边界层厚得多，动量传递与热量传递之间通常的类比不再成立。**写出的无量纲数暗含量纲。**含有单位换算的"无量纲"数并非无量纲，关联式中的经验常数于是**依赖于单位**——这就是明渠流中曼宁$n$这类依赖于单位的系数的来历。**检查的办法是在另一套单位制中重新推导关联式，确认常数不变。**
:::

## 方法

::: definition π 定理与算法 {#def-pi}
**表述。**若一个物理关系涉及$n$个变量，而所涉及的量纲张成的空间的秩为$k$，则该关系等价于
$$
\boxed{ \pi = n - k }
$$
个独立无量纲乘积之间的一个关系。**这个定理是关于线性代数的陈述，而不是关于物理的**：它计数的是**量纲矩阵**零空间的维数。
**量纲矩阵。**以$\left[ M \right], \left[ L \right], \left[ T \right]$为行、变量为列：
$$
\begin{array}{c|ccccccc}
& \Delta p & L & D & V & \rho & \mu & \epsilon \\
\hline
M & 1 & 0 & 0 & 0 & 1 & 1 & 0 \\
L & -1 & 1 & 1 & 1 & -3 & -1 & 1 \\
T & -2 & 0 & 0 & -1 & 0 & -1 & 0
\end{array}
\qquad n = 7, \quad k = 3, \quad \pi = 4
$$
**算法，按行之有效的顺序。**
1. **列出可能影响答案的每一个变量**，包括因变量。**长度尺度要逐个列入，不要列比值**——比值会自动出现。
2. **写出量纲矩阵。**
3. **选取$k$个重复变量**，它们量纲独立，且**不包含因变量**。一个可靠的选法是质量、长度、时间各取一个：$\rho$（质量）、$D$（长度）、$V$（时间）。
4. **把其余每个变量组成一个无量纲数**，解出指数。
5. **化简无量纲数**，通过彼此相乘、取幂和取比值，直到得到公认的形式。
6. **写出结果**$\pi_1 = \phi \left( \pi_2, \ldots \right)$，并**对每个无量纲数作物理解释**。
**推导实例。**取$\Delta p = f \left( L, D, V, \rho, \mu, \epsilon \right)$，重复变量组为$\rho, D, V$：
$$
\pi_{\Delta p} = \frac{\Delta p}{\rho V^2} \quad \left[ \frac{M L^{- 1} T^{- 2}}{M L^{- 3} \cdot L^2 T^{- 2}} \right] = 1 \quad \checkmark
$$
$$
\pi_L = \frac{L}{D}, \qquad
\pi_{\mu} = \frac{\mu}{\rho V D} = \frac{1}{\mathrm{Re}}, \qquad
\pi_{\epsilon} = \frac{\epsilon}{D}
$$
$$
\boxed{ \frac{\Delta p}{\tfrac{1}{2} \rho V^2} = \phi \left( \mathrm{Re},\ \frac{L}{D},\ \frac{\epsilon}{D} \right) }
$$
**怎么读。**压强系数依赖于**三个**无量纲数，任何实验都不可能需要更多。把结果写成单位长度的形式就消去了$L / D$，这正是摩擦因子的定义；而定理刚刚——**在任何测量之前**——告诉你，摩擦因子是两个变量的函数，其中一个是几何比值。
**使定理物有所值的数字。**六个独立变量各取十个水平需要$10^6$次试验；三个独立无量纲数各取十个水平只需$10^3$次。而且由于无量纲数**与装置尺寸无关**，一台试验台——改变速度，再加几种粗糙度插件——就能覆盖本来需要各种尺寸、各种流体的管道才能覆盖的空间。**定理既减少了实验次数，也减少了装置数量**——这正是风洞或水槽中的模型试验之所以能够代替全尺寸流动的原因。
:::

::: definition 无量纲数一览 {#def-groups}
**每个无量纲数都是两种机制之比**，学习它们的办法就是说出那两个词。
$$
\begin{array}{l l l}
\textbf{无量纲数} & \textbf{定义} & \textbf{比值中的两种机制} \\
\mathrm{Re} & \rho V L / \mu & \text{惯性} / \text{黏性} \\
\mathrm{Fr} = \mathrm{ Ri}^{- 1 / 2} & V / \sqrt{g L} & \text{惯性} / \text{重力} \\
\mathrm{We} & \rho V^2 L / \sigma & \text{惯性} / \text{表面张力} \\
\mathrm{Ma} & V / a & \text{惯性} / \text{弹性（压缩性）} \\
\mathrm{Eu} & \Delta p / \rho V^2 & \text{压强} / \text{惯性} \\
\mathrm{St} & f_c L / V & \text{非定常} / \text{惯性（涡脱落）} \\
\mathrm{Gr} & g \beta \Delta T L^3 / \nu^2 & \text{浮力} / \text{黏性} \\
\mathrm{Ra} & \mathrm{Gr}\, \mathrm{Pr} & \text{浮力} / \text{热扩散} \\
\mathrm{Pr} & \nu / \alpha & \text{动量扩散} / \text{热量扩散} \\
\mathrm{Nu} & h L / k & \text{对流传热} / \text{导热} \\
\mathrm{Bi} & h L / k_s & \text{表面} / \text{内部导热（固体）} \\
\mathrm{Fo} & \alpha t / L^2 & \text{导走的热量} / \text{储存的热量（非稳态）} \\
\mathrm{Bo} & \rho g L^2 / \sigma & \text{重力} / \text{表面张力} \\
\mathrm{Ca} & \mu V / \sigma & \text{黏性} / \text{表面张力} \\
\mathrm{Oh} & \mu / \sqrt{\rho \sigma L} & \text{黏性} / \text{表面张力（非定常）} \\
\mathrm{Ar} & g \left( \rho_p - \rho \right) D^3 / \rho \nu^2 & \text{浮力} / \text{黏性（颗粒）} \\
\mathrm{Ha} & B L \sqrt{\sigma_e / \rho \nu} & \text{磁力} / \text{黏性（磁流体力学；} \sigma_e \text{ 为电导率）} \\
\mathrm{Ec} & V^2 / c_p \Delta T & \text{动能} / \text{热能} \\
\mathrm{Br} & \mu V^2 / k \Delta T & \text{黏性耗散加热} / \text{导热}
\end{array}
$$
**使这张表成为诊断工具而不是备忘单的数字。**对一个$1\ \mathrm{mm}$、$0.1\ \mathrm{m / s}$的**毫米尺度**水流：
$$
\mathrm{Re} = 100, \quad \mathrm{Fr} = 1.0, \quad \mathrm{We} = 0.14, \quad \mathrm{Bo} \left( L = 1\ \mathrm{mm} \right) = 0.13, \quad \mathrm{Ma} = 7 \times 10^{- 5}
$$
**表面张力与重力相当，压缩性不存在**；同样的水在$1\ \mathrm{m}$、$3\ \mathrm{m / s}$时：
$$
\mathrm{Re} = 3 \times 10^6, \quad \mathrm{Fr} = 0.96, \quad \mathrm{We} = 1.2 \times 10^5, \quad \mathrm{Bo} \left( L = 1\ \mathrm{m} \right) = 1.3 \times 10^5, \quad \mathrm{Ma} = 2 \times 10^{- 3}
$$
**表面张力现在可以忽略，而重力不能。****两者不是同一种流动**：溢洪道的水工模型可以忽略表面张力，而**挑流鼻坎**水雾的模型不能，因为在弗劳德相似下韦伯数按$\lambda^{-2}$下降，得不到保持。
:::

::: widget plot
f: 1/sqrt(x); x
x: 1, 60
y: 0, 60
labels: Froude-similar model speed ratio 1/sqrt(lambda); Reynolds-similar model speed ratio lambda
caption: 模型试验所需速度随几何比尺$\lambda = L_p / L_m$的变化（同一种流体）。**弗劳德相似**（使$V / \sqrt{g L}$相等）要求模型以$V_m = V_p / \sqrt{\lambda}$运行——模型越小越**慢**；**雷诺相似**（使$\rho V L / \mu$相等）要求$V_m = V_p \lambda$——更**快**，$\lambda = 60$时快$60$倍。**两个要求相互矛盾，在同一种流体中除全尺寸外任何比尺都无法同时满足**，这就是实际模型试验至少在一个无量纲数上是**变态**的原因。船模试验者保持弗劳德数，用摩擦线修正雷诺数；空气动力学家匹配马赫数，并通过对风洞气体增压或降温尽量提高雷诺数；水利工程师保持弗劳德数，并确保模型流动仍是湍流。**使这一选择并不简单的数字：**$\lambda = 30$时，一艘$150\ \mathrm{m}$、$15\ \mathrm{m / s}$船舶的弗劳德相似模型长$5\ \mathrm{m}$，以$2.74\ \mathrm{m / s}$运行，雷诺数为$1.2 \times 10^7$——是湍流，但比原型低$164$倍，所以摩擦修正在外推中占很大部分。
:::

## 相似原理与模型试验

::: definition 三种相似 {#def-similitude}
**几何相似、运动相似和动力相似。**模型若满足下列条件，就是真正的模型：
$$
\begin{array}{l l}
\text{几何相似} & \text{所有长度成同一比例，所有角度相等} \\
\text{运动相似} & \text{对应点的速度成同一比例} \\
\text{动力相似} & \text{对应点的力成同一比例}
\end{array}
$$
**动力相似要求每一个起支配作用的无量纲数都相等**，模型试验的要求是：
$$
\boxed{ \text{若由 } n \text{ 个变量和 } k \text{ 个量纲支配，模型必须匹配 } n - k - 1 \text{ 个独立无量纲数；因变量的无量纲数随之相等。} }
$$
**全部困难就在这个计数上**，因为模型设计者可自由选择的量通常比要匹配的无量纲数少。对船舶阻力，$\mathrm{Re}$和$\mathrm{Fr}$都必须匹配；可用的是$\rho, V, L$，而$\mu, g$由流体的选择所固定，于是只能匹配**一个**无量纲数，另一个必须修正。
**比尺。**取$\lambda = L_p / L_m$并按弗劳德数匹配：
$$
\begin{array}{l c l l}
\text{速度} & V_r = \lambda^{1 / 2} & \text{时间} & t_r = \lambda^{1 / 2} \\
\text{加速度} & a_r = 1 & \text{力} & F_r = \lambda^3 \text{（同一流体）} \\
\text{功率} & P_r = \lambda^{7 / 2} & \text{流量} & Q_r = \lambda^{5 / 2} \\
\text{压强} & p_r = \lambda & \text{力矩} & M_r = \lambda^4
\end{array}
$$
**使拖曳水池便宜而风洞昂贵的数字。**$P_r = \lambda^{7 / 2}$：$1{:}25$的船模所需功率是实船的$25^{3.5} \approx 78{,}000$分之一。在**同样的**空气中，$1{:}25$的汽车**风洞**模型要匹配$\mathrm{Re}$，就必须以路面速度的$\lambda = 25$倍运行——那是超声速，$\mathrm{Ma}$就错了——而且在$\mathrm{Re}$匹配时模型的阻力等于实车的阻力（$F \propto \rho V^2 L^2$，而$V L$固定），功率却**大**$\lambda$倍。**这就是汽车空气动力学主要在全尺寸风洞中、或在$1{:}4$到$1{:}2$这样的适中比尺下进行的原因**，此时在路面速度下雷诺数的不足仅等于比尺本身。
**有意的变态。****变态**模型使某一个比尺与其他比尺不同，经典例子是**平面不变态、垂向变态**的河流与河口模型，其垂向比尺取得比水平比尺大（缩小得少），使模型水深足够大，以保证湍流和可测的床面切应力：
$$
\lambda_y < \lambda_x, \qquad V_r = \lambda_y^{1 / 2}, \qquad \mathrm{Re}_r = \frac{V_r\, h_r}{\nu_r} = \lambda_y^{3 / 2} \quad \text{而不是 } \lambda_x^{3 / 2}
$$
**修正手段是床面糙率处理，其选取以重现原型实测水位（即原型的曼宁$n$）为准，而不是以几何为准。****使这种做法正当而非凑数的数字：**水平比尺$1{:}500$、垂向比尺$1{:}50$（变率为$10$）时，模型的雷诺数是不变态$1{:}500$模型的$10^{3/2} \approx 32$倍——这就是层流水洼与湍流河流之间的差别——但这时模型必须用原型数据**率定**，因为依赖真实宽深比的流动特征（二次流、坡度驱动的流动）发生了变态。
:::

::: definition 量级分析与标度律 {#def-scaling}
**方法。**令控制方程的主导项相平衡，读出标度关系。**没有常数，没有函数，没有系数——只有指数**，而指数通常就够了。
**边界层。**$u \partial u / \partial x \sim \nu \partial^2 u / \partial y^2$，取$u \sim V$，$x \sim L$，$y \sim \delta$：
$$
\frac{V^2}{L} \sim \frac{\nu V}{\delta^2} \quad \Rightarrow \quad
\boxed{ \frac{\delta}{L} \sim \mathrm{Re}^{- 1 / 2} }, \qquad
C_f \sim \mathrm{Re}^{- 1 / 2}, \qquad
\delta \left( 1\ \mathrm{m},\ 10\ \mathrm{m / s},\ 10^{- 6}\ \mathrm{m^2/s} \right) \sim 0.3\ \mathrm{mm}
$$
（布拉休斯常数$5$把这个估计变成$1.6\ \mathrm{mm}$——指数是对的，常数则需要求解。）
**自由下落与黏性下落。**直径$D$、密度$\rho_s$的圆球在流体中：斯托克斯阻力与重力平衡给出
$$
V \sim \frac{\left( \rho_s - \rho \right) g D^2}{\mu} \quad \text{（蠕动流）}, \qquad
V \sim \sqrt{\frac{\left( \rho_s - \rho \right) g D}{\rho}} \quad \text{（惯性）}
$$
**交界点在$\mathrm{Re} \approx 1$**，对水中的石英颗粒（用斯托克斯完整公式$V = \Delta \rho g D^2 / 18 \mu$）对应$D \approx 0.1\ \mathrm{mm}$——**所以粉砂在黏性区沉降而砾石在惯性区沉降，泥沙的沉速公式必须跨越两个区**。
**平方-立方定律及其推论。**以长度比尺$\lambda$表示：
$$
\text{面积} \propto \lambda^2, \quad \text{体积和质量} \propto \lambda^3, \quad \text{支柱的强度} \propto \lambda^2, \quad \text{固有频率} \propto \lambda^{- 1}, \quad \text{扩散时间} \propto \lambda^2
$$
**使昆虫的腿与大象的腿成为不同设计的数字。**一个$60\ \mathrm{kg}$的人在线尺寸上放大$10$倍，体重变为$60{,}000\ \mathrm{kg}$，而腿的截面只增大$100$倍——骨骼中的**应力**升高十倍，吃掉了相对于骨骼约$10^2\ \mathrm{MPa}$量级极限强度的安全裕度。**要使应力不变，一个大十倍的动物需要直径与长度之比大$\sqrt{10} = 3.16$倍的腿**——这就是最大的陆地动物有着粗壮柱状四肢背后的标度论证。
**使热处理时间成为平方关系的数字。**一根$20\ \mathrm{mm}$的钢棒要$40\ \mathrm{min}$才使中心达到给定温度；一根$60\ \mathrm{mm}$的钢棒则需要$40 \times 3^2 = 360\ \mathrm{min}$，因为$\mathrm{Fo} = \alpha t / L^2$必须相等（当内部导热起控制作用时，即$\mathrm{Bi}$较大时）。**因此，按单位厚度线性给出保温时间的车间经验规则只在有限尺寸范围内是粗略的指导；在$20\ \mathrm{mm}$试样上安全的淬火可能使$200\ \mathrm{mm}$的生产件开裂，因为后者心部响应慢得多，产生大得多的沿厚度温差。**
:::

## 算例

::: example 落球黏度计 {#ex-falling}
直径$D$、密度$\rho_s$的圆球以终端速度$V$在直径$D_t$的圆筒内、密度$\rho$、黏度$\mu$的流体中下落。求出无量纲数，再用它们设计一台只用一个球就能测量$0.1$至$100\ \mathrm{Pa\, s}$的落球黏度计。
::: solution
**变量。**$V, D, \rho_s, \rho, \mu, g, D_t$——七个变量，三个量纲，**四个无量纲数**。
$$
\phi \left( \frac{V^2}{g D},\ \frac{\rho V D}{\mu},\ \frac{\rho_s}{\rho},\ \frac{D}{D_t} \right) = 0
\qquad \text{或者，更有用的形式} \qquad
\underbrace{\frac{4 \left( \rho_s - \rho \right) g D}{3 C_D \rho V^2}}_{\text{力平衡}} = 1, \quad
C_D = \psi \left( \mathrm{Re},\ D / D_t \right)
$$
**终端速度的力平衡。**重力减浮力等于阻力：
$$
\frac{\pi}{6} D^3 \left( \rho_s - \rho \right) g = C_D \cdot \tfrac{1}{2} \rho V^2 \cdot \tfrac{\pi}{4} D^2
\qquad \Rightarrow \qquad
V = \sqrt{\frac{4 \left( \rho_s - \rho \right) g D}{3 C_D \rho}}
$$
**起作用的无量纲数是阿基米德数**，它不含速度：
$$
\mathrm{Ar} = \frac{g \left( \rho_s - \rho \right) \rho D^3}{\mu^2}
= \frac{3}{4} \mathrm{Re}^2 C_D
$$
**壁面修正。**圆筒轴线上圆球的**法克森（Faxén）**修正因子（改进了拉登堡（Ladenburg）更早的线性修正）：
$$
F \left( \lambda \right) = \left( 1 - 2.104 \lambda + 2.09 \lambda^3 - 0.95 \lambda^5 \right)^{- 1}, \qquad \lambda = D / D_t
$$
**确定仪器几何形状的数字。**$\lambda = 0.1$时$F = 1.26$——阻力增加$26\ \%$。**保持$\lambda \le 0.05$得$F = 1.12$，这就是落球黏度计的管子细长的原因——壁面修正必须小而可算——也是球必须沿轴线下落的原因，因为偏离轴线的球修正不同，而且球会漂移。**
**设计，第一次尝试。**取$D = 3\ \mathrm{mm}$，$D_t = 60\ \mathrm{mm}$（$\lambda = 0.05$，$F = 1.12$），实心硼硅玻璃球$\rho_s = 2{,}230$，流体$\rho = 1{,}000$（单位均为$\mathrm{kg/m^3}$）。按斯托克斯阻力，$V = \Delta \rho\, g D^2 / \left( 18 F \mu \right)$：
$$
V = \frac{\left( 2{,}230 - 1{,}000 \right) \times 9.81 \times \left( 0.003 \right)^2}{18 \times 1.12\, \mu}
= \frac{5.40 \times 10^{- 3}}{\mu} \quad \left[ \mathrm{m / s},\ \mu \text{ 以 Pa\, s 计} \right]
$$
$$
\mu = 0.1\ \mathrm{Pa\, s} \Rightarrow V = 54.0\ \mathrm{mm / s}; \qquad
\mu = 100\ \mathrm{Pa\, s} \Rightarrow V = 54.0\ \mathrm{\mu m / s}
$$
**检查整个范围是否都是蠕动流。**在$\mu = 0.1$时：
$$
\mathrm{Re} = \frac{1{,}000 \times 0.0540 \times 0.003}{0.1} = 1.62
$$
**在$\mathrm{Re} = 1.62$时斯托克斯定律已处于边缘**——奥森修正为$1 + 3\mathrm{Re} / 8 = 1.61$，即$61\ \%$的误差。**设计必须用完整的$C_D \left( \mathrm{Re} \right)$曲线重新计算并迭代求解**，或者把球做小。
**设计，第二次尝试。**用空心玻璃球，$\rho_s - \rho = 100\ \mathrm{kg / m^3}$，$D = 3\ \mathrm{mm}$：
$$
V = \frac{100 \times 9.81 \times \left( 0.003 \right)^2}{18 \times 1.12\, \mu} = \frac{4.39 \times 10^{- 4}}{\mu}
$$
$$
\mu = 0.1 \Rightarrow V = 4.39\ \mathrm{mm / s}, \quad \mathrm{Re} = 0.13 \quad \checkmark\ \text{蠕动流}
$$
$$
\mu = 100 \Rightarrow V = 4.39\ \mathrm{\mu m / s} \quad \Rightarrow \quad \text{下落 } 300\ \mathrm{mm} \text{ 需要 } 19\ \mathrm{h} \quad \text{（太慢）}
$$
**使一个球覆盖这一范围成为不可能的数字。**几何固定时$V \propto 1 / \mu$，所以**一个球能覆盖的黏度范围恰好等于仪器能计时的速度范围**——而计时窗口是仪器的硬性属性。用光电门和$200\ \mathrm{mm}$的测量段，取可用的下落时间为$5\ \mathrm{s}$到$5\ \mathrm{min}$：
$$
V_{\max} = 0.040\ \mathrm{m / s}, \qquad V_{\min} = 6.7 \times 10^{- 4}\ \mathrm{m / s}, \qquad
\frac{\mu_{\max}}{\mu_{\min}} = \frac{V_{\max}}{V_{\min}} = 60
$$
**一个球覆盖六十倍的黏度——一又十分之八个数量级——而技术要求是三个数量级。**$D$和$\Delta \rho$怎么选都改变不了这个比值，因为两端是一起移动的。
**雷诺数约束确定尺寸。**要求快端$\mathrm{Re} \le 0.3$，$\mathrm{Re} = \rho V_{\max} D / \mu_{\min}$，其中$\mu_{\min} = k D^2 / V_{\max}$，$k = \Delta \rho g / 18 F$；为简单起见全程取$F \approx 1.1$（实际中用每个球自己的$D / D_t$）：
$$
\Delta \rho\, D \ge \frac{18 F \rho V_{\max}^2}{0.3\, g} = \frac{18 \times 1.1 \times 1{,}000 \times 0.040^2}{0.3 \times 9.81} = 10.8\ \mathrm{kg / m^2}
$$
$$
D = 2\ \mathrm{mm} \Rightarrow \Delta \rho = 5{,}380\ \mathrm{kg / m^3}, \qquad
D = 5\ \mathrm{mm} \Rightarrow \Delta \rho = 2{,}150\ \mathrm{kg / m^3}
$$
**所以球必须又重又小，或者大而密度适中**——一个比$1{,}000\ \mathrm{kg/m^3}$的流体重$2{,}150\ \mathrm{kg / m^3}$的$5\ \mathrm{mm}$球大致是碳化硅球，而$2\ \mathrm{mm}$的方案需要约$6{,}400\ \mathrm{kg / m^3}$的密度，钢球轻松超过这一数值。**这一约束也限定了低端：**$\Delta \rho D$取最小值时，$\mu_{\min} = 10.8\, g D / \left( 18 F V_{\max} \right) \approx 133\, D$（$D$以米计），所以要达到$0.1\ \mathrm{Pa\, s}$需要$D \lesssim 0.75\ \mathrm{mm}$。
**解决办法。**落球黏度计是**一组球**，诚实的技术规格是一张范围相互重叠的清单（流体密度$1{,}000\ \mathrm{kg/m^3}$，$F \approx 1.1$，在$200\ \mathrm{mm}$上下落时间为$5\ \mathrm{s}$至$5\ \mathrm{min}$）：
$$
\begin{array}{l c c c c}
\text{球} & D\ \left[ \mathrm{mm} \right] & \Delta \rho\ \left[ \mathrm{kg / m^3} \right] & \mu\ \text{范围}\ \left[ \mathrm{Pa\, s} \right] & \mathrm{Re}_{\max} \\
\text{A（碳化钨）} & 0.75 & 14{,}000 & 0.10 - 5.9 & 0.31 \\
\text{B（钢）} & 3.0 & 6{,}800 & 0.76 - 45 & 0.16 \\
\text{C（钢）} & 5.0 & 6{,}800 & 2.1 - 126 & 0.09
\end{array}
$$
**技术规格之所以必须写明球组、流体和计时窗口，而不能只写范围，是因为范围就是由这三者制造出来的，而范围两端的精度取决于$\mathrm{Re}$能被保持得多接近零。**
**合理性检验。**阿基米德数之所以是合适的设计无量纲数，是因为它**不含速度**，只凭球和流体就能算出，仪器在注入流体之前就能知道其工作流态。**含有答案的无量纲数是结果；只含输入的无量纲数是设计图表**——每个好的无量纲关联式之所以都用后者来写，是因为这样它不仅能用来报告工况，还能用来**选择**工况。
:::
:::

::: example 船模试验 {#ex-ship}
一艘$L_{pp} = 180\ \mathrm{m}$的船要达到$18\ \mathrm{m / s}$。在拖曳水池中试验$1{:}36$的船模。给出模型速度、模型与原型的雷诺数、功率比尺以及剩余阻力的换算步骤。
::: solution
**弗劳德数与模型速度。**
$$
\mathrm{Fr} = \frac{V}{\sqrt{g L}} = \frac{18}{\sqrt{9.81 \times 180}} = \frac{18}{42.0} = 0.428
\qquad \Rightarrow \qquad
V_m = 0.428 \times \sqrt{9.81 \times 5} = 0.428 \times 7.00 = 3.00\ \mathrm{m / s}
$$
**雷诺数。**$15\ {}^{\circ}\mathrm{C}$海水，$\nu = 1.19 \times 10^{- 6}\ \mathrm{m^2 / s}$：
$$
\mathrm{Re}_p = \frac{18 \times 180}{1.19 \times 10^{- 6}} = 2.72 \times 10^9, \qquad
\mathrm{Re}_m = \frac{3.00 \times 5}{1.19 \times 10^{- 6}} = 1.26 \times 10^7
$$
$$
\frac{\mathrm{Re}_m}{\mathrm{Re}_p} = \lambda^{- 3 / 2} = 36^{- 1.5} = \frac{1}{216}
$$
**雷诺数无法匹配**，不足的倍数是$216$。
**ITTC 方法（采用 ITTC-1957 摩擦线的形状因子法）。**测量模型总阻力$R_{tm}$，减去由摩擦线算出的**黏性**阻力，再把余下部分按比尺换算：
$$
C_{F m} = \frac{0.075}{\left( \log_{10} \mathrm{Re}_m - 2 \right)^2} = \frac{0.075}{\left( 7.100 - 2 \right)^2} = \frac{0.075}{26.01} = 0.002884
$$
$$
C_{F p} = \frac{0.075}{\left( 9.436 - 2 \right)^2} = \frac{0.075}{55.29} = 0.001357
$$
若黏性部分$\tfrac{1}{2} \rho_m V_m^2 S_m C_{F m} \left( 1 + k \right)$为$0.60\, R_{tm}$，则**剩余**阻力为$0.40\, R_{tm}$，并且（流体密度相同）
$$
R_{t p} = \left[ R_{tm} - \tfrac{1}{2} \rho_m V_m^2 S_m C_{F m} \left( 1 + k \right) \right] \lambda^3 + \tfrac{1}{2} \rho_p V_p^2 S_p \left[ C_{F p} \left( 1 + k \right) + C_A \right]
$$
其中$C_A$是船模–实船相关（粗糙度）补贴。
**功率比尺。**同一流体、按弗劳德数匹配时，
$$
\frac{P_p}{P_m} = \frac{F_p V_p}{F_m V_m} = \lambda^3 \times \lambda^{1 / 2} = \lambda^{7 / 2} = 36^{3.5} = 279{,}900
$$
**使模型试验值得做的数字。**吸收$250\ \mathrm{W}$的模型对应吸收$70\ \mathrm{MW}$有效（拖曳）功率的实船——模型试验花的是瓦，实船花的是兆瓦。**使修正量成为误差来源的数字：**模型与实船摩擦阻力之差为
$$
\frac{C_{F m} - C_{F p}}{C_{F p}} = \frac{0.002884 - 0.001357}{0.001357} = 113\ \%
$$
**模型的摩擦阻力系数是实船的两倍多**，而黏性部分占模型总阻力的$60\ \%$，于是比尺修正量为实测总阻力的$0.60 \times \left( 1 - C_{F p} / C_{F m} \right) = 32\ \%$。**因此形状因子$k$的任何误差都会直接带入实船的预报功率；而之所以需要相关补贴$C_A$（通常为几个$10^{- 4}$），是因为光滑的模型完全感受不到实船船体的粗糙度。**
**合理性检验。**之所以保持弗劳德数而修正雷诺数、而不是反过来，是因为**兴波**阻力是$\mathrm{Fr}$的强非线性函数，有峰有谷，任何光滑修正都无法给出；而黏性阻力是$\mathrm{Re}$的光滑、缓变函数，有成熟的对数律。**保持你无法修正的无量纲数，修正你能修正的那个**——而**空气动力学**模型改为保持马赫数，是因为在那里压缩性才是无法修正的。
:::
:::

::: example 自然对流 {#ex-natural}
求$70\ {}^{\circ}\mathrm{C}$、高$1.2\ \mathrm{m}$的竖直平板在$20\ {}^{\circ}\mathrm{C}$房间中的瑞利数，并用标度分析预测边界层厚度和平均表面传热系数。
::: solution
**无量纲数。**变量为$h, L, \Delta T, g \beta, \nu, \alpha, k$——$g$和$\beta$只以浮力乘积$g \beta$的形式出现，所以是七个变量、四个量纲$\left( M, L, T, \Theta \right)$，**三个无量纲数**：
$$
\mathrm{Nu} = \phi \left( \mathrm{Ra},\ \mathrm{Pr} \right), \qquad
\mathrm{Ra} = \frac{g \beta \Delta T L^3}{\nu \alpha}, \qquad \mathrm{Pr} = \frac{\nu}{\alpha}
$$
**数值。**空气取膜温$45\ {}^{\circ}\mathrm{C}$：$k = 0.0274$，$\nu = 1.75 \times 10^{- 5}$，$\alpha = 2.48 \times 10^{- 5}$，$\beta = 1 / 318 = 3.145 \times 10^{- 3}$：
$$
\mathrm{Ra} = \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2^3}{1.75 \times 10^{- 5} \times 2.48 \times 10^{- 5}}
= \frac{2.666}{4.34 \times 10^{- 10}} = 6.14 \times 10^9
$$
**湍流**——竖直表面上的转捩发生在$\mathrm{Ra} \approx 10^9$。
**标度分析。**令边界层中的浮力、惯性力和黏性力相平衡，$\delta$为边界层厚度：
$$
\frac{V^2}{L} \sim g \beta \Delta T \delta, \qquad
\frac{\nu V}{\delta^2} \sim g \beta \Delta T \quad \Rightarrow \quad
\frac{\delta}{L} \sim \mathrm{Ra}^{- 1 / 4}
$$
$$
\frac{\delta}{L} = \left( 6.14 \times 10^9 \right)^{- 1 / 4} = 3.57 \times 10^{- 3}, \qquad \delta = 4.3\ \mathrm{mm}
$$
（这是**层流**标度；尽管该边界层的上部将是湍流，它仍给出正确的量级。）
**表面传热系数。**取$\mathrm{Nu} \sim \mathrm{Ra}^{1 / 4}$及层流边界层常数$0.59$：
$$
\mathrm{Nu} = 0.59 \times \left( 6.14 \times 10^9 \right)^{1 / 4} = 0.59 \times 279.9 = 165
\qquad \Rightarrow \qquad
h = \frac{165 \times 0.0274}{1.2} = 3.77\ \mathrm{W / m^2\, K}
$$
**湍流边界层关联式**$\mathrm{Nu} = 0.10\, \mathrm{Ra}^{1 / 3}$给出$\mathrm{Nu} = 183$和$h = 4.18\ \mathrm{W / m^2\, K}$——**同一瑞利数下两种形式相差$11\ \%$**；由于$\mathrm{Ra} > 10^9$，这里适用的是湍流形式，层流形式只在约$10^9$以下有效。
**使自然对流成为弱机制的数字。**$h \approx 4\ \mathrm{W / m^2\, K}$是空气中自然对流的典型值。沿同一块$1.2\ \mathrm{m}$平板、仅$2\ \mathrm{m / s}$的强制气流（$\mathrm{Re}_L = 1.4 \times 10^5$，层流，$\mathrm{Nu} = 0.664\, \mathrm{Re}^{1/2} \mathrm{Pr}^{1/3} = 219$）给出$h \approx 5\ \mathrm{W / m^2\, K}$——**大致相同**，所以一阵微风就已经和浮力一样有效，而更快的风扇很快就会超过它，因为强制对流的$h$按$V^{1/2}$或更快增长。**起决定作用的无量纲数是理查森数**
$$
\mathrm{Ri} = \frac{\mathrm{Gr}}{\mathrm{Re}^2} = \frac{g \beta \Delta T L}{V^2}
= \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2}{4} = 0.463
$$
**常用的经验规则是：$\mathrm{Ri} < 0.1$时自然对流可以忽略，$\mathrm{Ri} > 10$时自然对流占主导**——在$0.46$时两种机制同等重要，这与上面两个相近的$h$值一致，只针对其中一种机制的关联式都是错的。
**合理性检验。**合适的无量纲数是$\mathrm{Ra}$而不是$\mathrm{Gr}$，是因为$\mathrm{Gr}$不包含热量相对于动量逸散快慢的任何信息，与空气$\mathrm{Gr}$相同的**液态金属**自然对流，其传热方式完全不同。**$\mathrm{Ra} = \mathrm{Gr}\, \mathrm{Pr}$是浮力与热扩散之比，当$\mathrm{Pr}$远离$1$时，决定边界层厚度的正是热扩散。**
:::
:::

::: example 不用方程的量纲分析 {#ex-crater}
能量为$E$的炸药在密度$\rho$、黏聚力$Y$的土中炸出直径$D$的爆坑。求无量纲数，并用它们解释**立方根比例**规则$R / W^{1 / 3} = $常数为什么成立、在哪里失效。
::: solution
**变量。**$D, E, \rho, Y$——四个变量，三个量纲，**一个无量纲数**：
$$
\pi = \frac{Y D^3}{E} \qquad \Rightarrow \qquad D = C \left( \frac{E}{Y} \right)^{1 / 3}
$$
**加入重力后**——$D, E, \rho, g, Y$，五个变量，三个量纲，**两个无量纲数**：
$$
\pi_1 = \frac{\rho g D}{Y}, \qquad \pi_2 = \frac{Y D^3}{E}
\qquad \Rightarrow \qquad
D = \left( \frac{E}{\rho g} \right)^{1 / 4} \phi \left( \frac{Y}{\rho g D} \right)
$$
**使两个极限不同的数字。**对**大**爆坑，强度项可以忽略，
$$
D \propto \left( \frac{E}{\rho g} \right)^{1 / 4}
$$
这是**重力区**，爆坑体积按$E^{3/4}$变化；对**小**爆坑，强度占主导，
$$
D \propto \left( \frac{E}{Y} \right)^{1 / 3}
$$
这是**强度区**，体积按$E$变化。**典型土**（$\rho = 1{,}800$，$Y = 50\ \mathrm{kPa}$）**的交界点**在
$$
\frac{Y}{\rho g} = 2.83\ \mathrm{m} \quad \Rightarrow \quad D \sim 3\ \mathrm{m}
$$
**使$W^{1/3} / R$成立的数字。**取$E \propto W$（装药质量），在重力区，
$$
D \propto \left( \frac{W}{\rho g} \right)^{1 / 4} \quad \text{且在埋深比固定时} \quad R \propto W^{1 / 4}
$$
**而经验规则是$R \propto W^{1 / 3}$，这属于强度区，适用于小爆坑。****因此对爆坑而言，规则$R / W^{1/3} = $常数不是普遍规律，而是在陈述该情形处于强度区**；它对大装药失效，因为大装药处于重力区，指数更接近$1 / 4$——**用立方根把装药量外推$100$倍，会把半径高估$100^{1/12} = 1.47$倍，即$47\ \%$**。
**使无量纲数成为诊断依据的数字。**同一土中$1{,}000\ \mathrm{kg}$ TNT 装药（$4.2\ \mathrm{GJ}$）：
$$
D \sim \left( \frac{4.2 \times 10^9}{1{,}800 \times 9.81} \right)^{1 / 4} = \left( 2.38 \times 10^5 \right)^{1 / 4} = 22.1\ \mathrm{m}
\qquad \frac{Y}{\rho g D} = \frac{50{,}000}{1{,}800 \times 9.81 \times 22.1} = 0.128
$$
**$0.128 \ll 1$证实处于重力区**（在这种估算的精度内），所以在任何详细计算之前，这个无量纲数就警告说：由小试验装药按立方根比例推算的结果不能沿用。
**合理性检验。**四变量情形只出现一个无量纲数，而**只有一个无量纲数的问题，其答案是一个常数**——$D = C \left( E / Y \right)^{1/3}$，$C$为纯数，全部物理都在$C$里。**只有一个无量纲数时一次实验就能确定常数；有两个时就需要一条曲线**——这就是为什么最简单的量纲分析往往最有力。
:::
:::

::: history
**傅里叶（Fourier）****1822 年**的《热的解析理论》（*Théorie analytique de la chaleur*）坚持物理方程的每一项在量纲上都必须齐次——这是这一思想第一次清晰出现，以原理而非定理的形式陈述。**无量纲数是一个一个、缓慢地出现的**：**威廉·弗劳德（William Froude）**在**1860—1870 年代**发展了用于船模阻力换算的"比较定律"，并在**1870 年代**初于托基建成他的拖曳水池；**雷诺（Reynolds）**的管流论文发表于**1883 年**；**恩斯特·马赫（Ernst Mach）**与**彼得·扎尔歇（Peter Salcher）**在**1887 年**拍摄了超声速子弹周围的激波，不过"马赫数"这一名称直到**1929 年**才由**雅各布·阿克莱特（Jakob Ackeret）**提出；**努塞尔（Nusselt）**等人的传热无量纲数则在二十世纪初相继出现。**瑞利（Rayleigh）**自由地运用量纲推理，从《声学理论》（*The Theory of Sound*，**1877 年**）直到他**1915 年**发表在《自然》（*Nature*）上的文章《相似原理》（"The principle of similitude"）。π 定理的若干形式曾由**艾梅·瓦希（Aimé Vaschy）**于**1892 年**、**德米特里·里亚布申斯基（Dimitri Riabouchinsky）**于**1911 年**提出；**白金汉（Buckingham）****1914 年**在《物理评论》（*Physical Review*）上的论文《论物理相似系统》（"On physically similar systems"）给出了一般表述和沿用至今的 π 记号，**布里奇曼（Bridgman）****1922 年**的著作《量纲分析》（*Dimensional Analysis*）使这一方法成为实验物理的标准工具。**G. I. 泰勒（G. I. Taylor）****1950 年**关于极强爆炸冲击波的论文是经典应用：他由标度关系$R \propto \left( E t^2 / \rho \right)^{1 / 5}$和**1945 年三位一体（Trinity）**核试验照片中的半径–时间数据（照片于**1947 年**解密）估算出约$17$千吨 TNT 当量，接近当时仍属机密的官方数字——约$20$千吨。
:::

::: quiz
在拖曳水池中用与实船相同的水试验一个$1 : 20$的船模。动力相似要求雷诺数相等，这就要求以下列速度拖曳模型：

- [ ] 实船速度的二十分之一
- [x] 实船速度的二十倍，任何水池都达不到——这就是模型试验改为匹配弗劳德数、并对雷诺数作经验修正的原因
- [ ] 实船速度，但改用黏性较小的流体
- [ ] 同时满足雷诺相似和弗劳德相似，这在增压水池中可以做到

::: solution
**二十倍的速度。**同一流体时$V_m = V_p ( L_p / L_m )( \nu_m / \nu_p ) = 20 V_p$，所以一艘航速$15$节的船需要模型以$300$节运行，那是超空泡射弹而不是船。**弗劳德相似的方向正相反**——$V_m = V_p \sqrt{ L_m / L_p } = 0.224 V_p$——两者不能同时满足：同时满足需要一种$\nu_p / 89.4$的流体，没有任何液体能接近。**船模试验这门学科本身就是一种变通办法：匹配弗劳德数（它决定兴波阻力这一主导项），测量总阻力，减去按模型雷诺数算出的理论摩擦线，再加回按实船雷诺数算出的摩擦线并附加表面粗糙度补贴。**这种先减后加的做法以 ITTC 1957 船模–实船相关线为基础，几十年来一直是拖曳水池的标准程序；它是一个漂亮的例子，说明量纲分析的用途不是解决问题，而是精确地指出问题的哪一部分可以按比尺换算、哪一部分必须靠估计。
:::
:::

## 后续内容

这些无量纲数是[[heat-transfer]]中每一个关联式的坐标轴（$\mathrm{Nu}$、$\mathrm{Ra}$、$\mathrm{Gr}$、$\mathrm{Pr}$、$\mathrm{Bi}$、$\mathrm{Fo}$），是[[aerodynamics]]和[[flight-mechanics]]中每一次模型试验的设计依据（$\mathrm{Re}$、$\mathrm{Ma}$、阻塞度、壁面透气率），是[[manufacturing]]中成形与铸造的语言（$\mathrm{Re}$、$\mathrm{We}$、$\mathrm{Ca}$、$\mathrm{Oh}$，以及**齐纳（Zener）**参数和**霍洛蒙（Hollomon）**参数），是[[propulsion]]中涡轮和压气机全部相似规则的基础，也是[[computational-fluid-dynamics]]的网格研究以壁面单位报告的原因。

::: summary
- π 定理计数的是量纲矩阵的零空间：$\pi = n - k$，答案是无量纲数之间的一个关系，仅此而已。
- 无量纲数不唯一；它们的**个数**唯一。有效组合的任何可逆变换都仍然有效。
- 完全相似意味着匹配全部$n - k - 1$个独立无量纲数，这很少可能做到。**实际模型试验是变态的**；保持你无法修正的无量纲数，修正你能修正的那个。
- 弗劳德比尺给出$P_r = \lambda^{7/2}$、$Q_r = \lambda^{5/2}$、$F_r = \lambda^3$；同一流体中的雷诺比尺要求$V_m / V_p = \lambda$。两者不相容。
- 量级分析给出指数而不给出常数，而指数通常就够了：$\delta / L \sim \mathrm{Re}^{-1/2}$，$t \propto L^2$，强度$\propto \lambda^2$对重量$\propto \lambda^3$。
- 只有**一个**无量纲数的问题，答案是一个常数——这是物理学中最便宜的结果。
- 每个无量纲数都是两种机制之比；说出那两个词，你就理解了它。
- 定理的好坏取决于变量清单，而清单是关于机制的物理论断。
:::

## 习题

::: exercise 计数无量纲数 {level=1 check="3"}
管道中单位长度的压降依赖于$D$、$V$、$\rho$、$\mu$和$\epsilon$，给出独立无量纲数的个数。
::: solution
六个变量（$\Delta p / L$、$D$、$V$、$\rho$、$\mu$、$\epsilon$），三个量纲：$\pi = 6 - 3 = 3$——例如$\left( \Delta p / L \right) D / \rho V^2$（摩擦因子）、$\mathrm{Re}$和$\epsilon / D$。
:::
:::

::: exercise 雷诺数比尺 {level=1 check="216"}
在弗劳德比尺下，给出$1{:}36$船模的雷诺数比实船低多少倍。
::: solution
$\mathrm{Re}_m / \mathrm{Re}_p = \lambda^{-3/2} = 36^{-1.5} = 1/216$。
:::
:::

::: exercise 功率比尺 {level=1 check="279900"}
给出同一流体中$1{:}36$弗劳德相似模型的功率比尺$P_p / P_m$。
::: solution
$P_r = \lambda^{7/2} = 36^{3.5} = 279{,}900$。
:::
:::

::: exercise 瑞利数 {level=1 check="6.14"}
高$1.2\ \mathrm{m}$的竖直平板比空气高$50\ \mathrm{K}$，$\nu = 1.75 \times 10^{-5}\ \mathrm{m^2/s}$，$\alpha = 2.48 \times 10^{-5}\ \mathrm{m^2/s}$，$\beta = 1/318\ \mathrm{K^{-1}}$，以$10^9$为单位给出瑞利数。
::: solution
$\mathrm{Ra} = g \beta \Delta T L^3 / (\nu \alpha) = 2.666 / \left( 4.34 \times 10^{-10} \right) = 6.14 \times 10^9$。
:::
:::

::: exercise 韦伯数 {level=1 check="49450"}
给出直径$1\ \mathrm{mm}$、速度$60\ \mathrm{m/s}$的水射流的韦伯数（$\sigma = 0.0728\ \mathrm{N/m}$）。
::: solution
$\mathrm{We} = \rho V^2 D / \sigma = 1000 \times 3600 \times 0.001 / 0.0728 = 49{,}450$。
:::
:::

::: exercise 毛细长度 {level=1 check="2.73"}
给出$20\ {}^{\circ}\mathrm{C}$水的毛细长度$\sqrt{\sigma / (\rho g)}$（毫米）。
::: solution
$\ell_c = \sqrt{0.0728 / (998 \times 9.81)} = 2.73\ \mathrm{mm}$。
:::
:::

::: exercise 平方-立方 {level=1 check="9"}
钢棒直径增大到三倍时，给出其保温时间增大的倍数。
::: solution
$\mathrm{Fo} = \alpha t / L^2$必须相等，所以$t \propto L^2$：增大$9$倍。
:::
:::

::: exercise 理查森数 {level=2}
高$1.2\ \mathrm{m}$、比空气高$50\ \mathrm{K}$的竖直平板受$2\ \mathrm{m/s}$的水平气流冷却。给出理查森数，并说明哪种机制占主导。
::: solution
$$
\mathrm{Ri} = \frac{g \beta \Delta T L}{V^2} = \frac{9.81 \times 3.145 \times 10^{- 3} \times 50 \times 1.2}{4} = 0.463
$$
**两者都不占主导**——经验规则是$\mathrm{Ri} < 0.1$时自然对流可以忽略，$\mathrm{Ri} > 10$时自然对流占主导。**在$0.46$时流动是混合对流，只针对其中一种机制的关联式会有百分之几十的误差**；标准修正为$\mathrm{Nu} = \left( \mathrm{Nu}_{\mathrm{forced}}^n + \mathrm{Nu}_{\mathrm{natural}}^n \right)^{1/n}$，助流时$n = 3$，逆流时$n = 2$。
:::
:::

::: exercise 弗劳德数与韦伯数 {level=2}
建造了一个$1{:}20$的喷水系统模型。若采用弗劳德相似，给出模型韦伯数相对于原型的比值，并说明要同时匹配两者必须改变什么。
::: solution
$$
\mathrm{Fr}: V_m = V_p / \sqrt{\lambda} \qquad \Rightarrow \qquad
\frac{\mathrm{We}_m}{\mathrm{We}_p} = \frac{V_m^2 L_m}{V_p^2 L_p} = \frac{1}{\lambda} \cdot \frac{1}{\lambda} = \frac{1}{\lambda^2} = \frac{1}{400}
$$
**在同一流体中弗劳德相似不能保持韦伯数**——$\mathrm{We} / \mathrm{Fr}^2 = \rho g L^2 / \sigma = \mathrm{Bo}$，而$L$缩小时$\mathrm{Bo}$按$\lambda^{-2}$下降，所以表面张力在模型中的重要性被放大$400$倍，模型中的液滴和液丝相对而言大得多。**使这成为真实结论而非巧合的数字：**一旦$\rho$、$g$和$\sigma$由流体的选择所固定，模型只剩一个自由比尺，因此只能匹配两个无量纲数中的一个。**要同时匹配两者就必须更换流体**：在$g$固定时匹配$\mathrm{Bo}$需要$\left( \sigma / \rho \right)_m = \left( \sigma / \rho \right)_p / \lambda^2$，即减小$400$倍——远超表面活性剂或任何实用液体所能提供的范围，这就是喷雾破碎要在全尺寸或接近全尺寸下研究的原因。
:::
:::

::: exercise 推导 {level=3}
用 π 定理求出支配几何相似搅拌釜所吸收**功率**$P$的无量纲数，搅拌釜直径为$D$，叶轮转速为$N$，流体密度为$\rho$，黏度为$\mu$，重力加速度为$g$；并说明结果在全挡板、无挡板和通气三种情形下如何简化。
::: solution
**变量。**$P, D, N, \rho, \mu, g$——六个变量，三个量纲，**三个无量纲数**。
**重复变量组**$\rho, N, D$：
$$
\pi_P = \frac{P}{\rho N^3 D^5} \equiv N_P \quad \text{（功率准数）}, \qquad
\pi_{\mu} = \frac{\mu}{\rho N D^2} = \frac{1}{\mathrm{Re}_i}, \qquad
\pi_g = \frac{g}{N^2 D} = \frac{1}{\mathrm{Fr}}
$$
$$
\boxed{ N_P = \phi \left( \mathrm{Re}_i,\ \mathrm{Fr} \right) }
$$
**全挡板情形。**挡板破坏了中心漩涡，不形成气芯，自由液面的重力效应消失：$\mathrm{Fr}$不再出现，
$$
N_P = \phi \left( \mathrm{Re}_i \right)
$$
**层流极限**$N_P = K / \mathrm{Re}_i$，即$P = K \mu N^2 D^3$——**功率与密度无关**，层流搅拌器的电机选型用黏度而不用密度，原因就是这一相消。**湍流极限**$N_P \approx$常数，$P = N_P \rho N^3 D^5$——**这是搅拌釜的相似律**，也是转速不变时叶轮直径加倍使功率增大$32$倍的原因。
**无挡板情形。**形成中心漩涡，其深度取决于$\mathrm{Fr}$，转速足够高时漩涡可到达叶轮并卷入空气，所以功率消耗依赖于两个无量纲数：
$$
N_P = \phi \left( \mathrm{Re}_i,\ \mathrm{Fr} \right)
$$
**通气情形。**加入气体流量$Q_g$后有七个变量和**四个**无量纲数，新增的是**通气准数**
$$
N_Q = \frac{Q_g}{N D^3}
\qquad \Rightarrow \qquad
\frac{P_g}{P} = \psi \left( N_Q,\ \mathrm{Fr},\ \mathrm{Re}_i \right)
$$
**使通气发酵罐的设计成为功率问题的数字。**一个广泛使用的经验拟合是**米歇尔-米勒（Michel–Miller）**关联式
$$
P_g = c \left( \frac{P^2 N D^3}{Q_g^{0.56}} \right)^{0.45}
$$
——注意它**不是**无量纲的，所以其常数$c$依赖于单位，这正是上面警告中所说的暗含量纲的陷阱。通气可使圆盘涡轮的功率消耗降到不通气时的大约一半；发酵罐的$k_L a$关联式是对**通气**单位体积功率$P_g / V$写出的，因为气含率和气泡尺寸取决于实际耗散的能量——按$k_L a \propto \left( P_g / V \right)^{0.4} v_s^{0.5}$（$v_s = Q_g / A$为表观气速），**$P_g / V$的两倍误差就是$k_L a$的$2^{0.4} = 1.32$倍误差，即$32\ \%$**。
**合理性检验。**功率准数含有$N^3 D^5$，是因为流动**以惯性为主**：动压$\rho \left( N D \right)^2$作用在面积$\sim D^2$上、以速度$\sim N D$运动，给出$P \sim \rho N^3 D^5$——与泵和风机功率的相似律形式相同。**本书中每一个旋转机械的关联式都是同一个量纲论证，只是几何常数不同**，这就是泵、风机、涡轮和搅拌釜都使用功率系数的原因：它就是定理交给你的那个无量纲数。
:::
:::

::: exercise 设计 {level=3}
为一个**沿海 LNG 卸货码头消波港池的$1{:}20$比尺模型**制订完整的模型试验方案，说明相似要求、你将接受的变态、测量仪器和验收准则。
::: solution
**问题。**一个容积$V_b = 4{,}500\ \mathrm{m^3}$的消波港池要在有效波高$H_s = 3.5\ \mathrm{m}$、谱峰周期$T_p = 11\ \mathrm{s}$的设计海况下，试验其**共振响应**，以及由此产生的**越浪**和**系泊力**后果。
**支配无量纲数。**$\rho, g, \nu, \sigma$由流体固定，波浪由$H, T, d$（水深）描述：
$$
\mathrm{Fr} = \frac{\sqrt{g d}}{L / T}, \qquad \frac{H}{d}, \qquad \frac{\lambda_b}{d}, \qquad \mathrm{Re} = \frac{\sqrt{g d}\, d}{\nu}, \qquad \mathrm{KeC} = \frac{u_{\max} T}{D_{\text{构件}}}, \qquad \mathrm{Re}_K = \frac{u_{\max} D_{\text{构件}}}{\nu}
$$
**弗劳德相似是必须的**——波浪是重力现象，共振周期按弗劳德比尺换算：
$$
\lambda = 20, \qquad T_m = \frac{11}{\sqrt{20}} = 2.46\ \mathrm{s}, \qquad H_m = \frac{3.5}{20} = 0.175\ \mathrm{m}, \qquad d_m = \frac{d_p}{20}
$$
**变态，以及每一项为什么可以接受。**
$$
\begin{array}{l l l}
\text{雷诺数} & \mathrm{Re}_m = \mathrm{Re}_p / 20^{3/2} = \mathrm{Re}_p / 89.4 & \text{若模型构件保持在阻力随 } \mathrm{Re} \text{ 变化较弱的区域内则可接受} \\
\text{表面张力} & \mathrm{We}_m,\ \mathrm{Bo}_m \text{ 过小} & \text{对波浪可接受；对越浪水花不正确} \\
\text{掺气} & \text{模型中表现不足} & \text{对整体响应可接受；冲击压强需谨慎} \\
\text{结构} & \text{系泊按全刚度而非弗劳德比尺模拟} & \text{有意的变态；用耦合仿真修正} \\
\text{港池壁面的黏性耗散} & \text{模型中相对较大} & \text{用实测的壁面阻尼系数修正}
\end{array}
$$
**使表面张力变态成为需要担心的那一项的数字。**模型的$H_m = 175\ \mathrm{mm}$给出$\mathrm{Bo} \left( H_m \right) = 998 \times 9.81 \times 0.175^2 / 0.0728 = 4{,}100 \gg 1$，所以**波浪尺度**的表面张力可以忽略——但**越浪水花**中有$1\ \mathrm{mm}$的液滴，其$\mathrm{Bo} = 0.13$；波浪水池实验室测量的是越浪**水量**而不是水花**弥散**，因为后者在单一流体模型中无法按比尺换算。
**比尺。**
$$
\begin{array}{l c l}
\text{时间} & \lambda^{1 / 2} = 4.47 & \\
\text{速度} & \lambda^{1 / 2} = 4.47 & \\
\text{单位长度上的力} & \lambda^2 = 400 & \\
\text{力} & \lambda^3 = 8{,}000 & \\
\text{力矩} & \lambda^4 = 160{,}000 & \\
\text{每个波的越浪量} & \lambda^3 = 8{,}000 & \\
\text{流量} & \lambda^{5 / 2} = 1{,}789 &
\end{array}
$$
**试验设施。**$60 \times 1.2\ \mathrm{m}$的波浪水槽太窄，无法再现三维港池响应；方案需要一个至少$20 \times 15\ \mathrm{m}$的**港池**，配多推板造波机、主动吸收和被动消能滩，也可能需要改用$1{:}40$而不是$1{:}20$的比尺才放得下——**这会改变上面的每一个数字，也正是模型试验规格书的第一项工作是确认设施存在的原因**。
**测量仪器。**
$$
\begin{array}{l l l}
\text{波浪} & 12\text{–}24\ \text{根电容式浪高仪}, \pm 0.5\ \mathrm{mm} & \text{阵列间距按模型波长选取} \\
\text{压强} & 40\text{–}100\ \text{个传感器}, 0\text{–}1\ \mathrm{bar}, 2\ \mathrm{kHz} & \text{齐平安装，} 3\ \mathrm{mm}\text{ 测压孔} \\
\text{力} & 6\text{ 分量测力天平}, 0\text{–}500\ \mathrm{N} & \text{噪声底 } < 0.05\ \mathrm{N} = 0.01\ \% \text{ 满量程} \\
\text{运动} & 6\text{ 自由度光学测量}, 0.1\ \mathrm{mm} & \\
\text{越浪} & \text{带称重传感器的集水箱}, 10\ \mathrm{g} & \text{采样频率 } 10\ \mathrm{Hz} \\
\text{PIV} & \text{时间解析，} 200\ \mathrm{fps} & \text{用于测量港池共振模态的振型}
\end{array}
$$
**确定采样时长的数字。**$3$小时的设计风暴在模型中变为$3\ \mathrm{h} / 4.47 = 40\ \mathrm{min}$的**平稳**不规则波；波浪水池试验方案按**水池小时**而不是试验次数报价，因为每一次这样的实现，加上下一次之前的静水时间，要占用港池一小时以上。
**验收准则。**
$$
\begin{array}{l l}
\text{波浪再现} & \text{实测 } H_s \text{ 在目标值 } \pm 3\ \% \text{ 以内，谱峰频带内波谱在 } \pm 5\ \% \text{ 以内} \\
\text{反射} & \text{模型上游 } K_R < 0.05\text{，用合田（Goda）两浪高仪法验证} \\
\text{重复性} & \text{设计海况重复三次，} H_s \text{ 在 } \pm 2\ \% \text{ 以内，峰值力在 } \pm 8\ \% \text{ 以内} \\
\text{比尺效应} & \text{对两个最关键海况用 } 1{:}30 \text{ 的第二个模型试验} \\
\text{仪器标定} & \text{方案前后各标定一次，漂移 } < 1\ \% \\
\text{不确定度} & \text{按 ISO GUM 报告，包含因子取 } 2
\end{array}
$$
**保护买方的四条条款。****"所有模型试验均应在弗劳德相似条件下进行，每个数据点均应报告弗劳德数。"****"凡受表面张力、掺气或材料强度支配的现象，均应标明为不可按比尺换算，并不经外推直接报告。"****"对起控制作用的荷载工况，应在不少于两个比尺下进行比尺效应研究。"****"每个报告的极值的不确定度均应包含由不少于三次独立实现估计的重复性分量。"**
**设计评注。**一般规律是：**模型试验只回答它被设计来回答的那个问题，不回答别的，而相似分析就是说明回答了哪个问题的文件**——这就是为什么一份没有逐个无量纲数列出哪些已匹配、哪些已修正、哪些被放弃的表格的模型试验报告，不是报告，而只是一堆数字。
:::
:::
