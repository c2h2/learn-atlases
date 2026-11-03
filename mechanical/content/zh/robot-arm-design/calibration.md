一台新机械臂回到示教点的稳定程度惊人——中型工业臂上的两三百分之一毫米很常见——但要让它移动到由坐标给出的点，却可能偏差一毫米以上。第一个数字是**重复性**，第二个是**精度**，两者之间的差距正是本章的主题。重复性由硬件决定：编码器分辨率、回差、摩擦、一个循环内的热漂移。精度则由控制器中的**模型**——[[robotics/forward-kinematics]]里的连杆长度、关节零位与轴线方向——与实际造出来的机械臂吻合到什么程度决定。靠手工把臂拖到每个点来示教的机械臂只需要重复性。从CAD离线编程、从相机接收目标点、或必须在不重新示教的前提下换上一台备用臂的机械臂则需要精度，而精度来自**标定（calibration）**：测量真实的机械臂并修正它的模型。我们将讨论每位集成商都会遇到的三种标定：机械臂自身的**运动学标定（kinematic calibration）**、末端执行器的**工具中心点标定（tool-centre-point calibration）**、相机相对于机械臂的**手眼标定（hand–eye calibration）**，并简要介绍相机内参。存储并应用这些结果的软件在[[robot-arm-design/software-stack]]中已经介绍过。

## 精度、重复性与误差来源 {#sec-errors}

::: definition 位姿精度与重复性 {#def-accuracy}
从同一方向向同一位姿向机械臂发出$n$次指令，用外部仪器测得实际到达的位置$\mathbf x_1, \dots, \mathbf x_n$。记$\bar{\mathbf x}$为其均值、$\mathbf x_c$为指令位置。**（位置）精度**是平均到达位置与指令位置之间的距离$\lVert\bar{\mathbf x} - \mathbf x_c\rVert$。**（位置）重复性**是以均值为中心、包含全部到达位置的球面的半径，在ISO 9283中定义为$\bar l + 3s_l$，其中$l_j = \lVert\mathbf x_j - \bar{\mathbf x}\rVert$，而$\bar l$、$s_l$是$l_j$的均值与标准差。姿态精度与重复性用角度以同样的方式定义。
:::

数据手册乐于给出重复性，因为它小而稳定；精度则取决于位姿、负载、温度与标定状况，常常根本不给出。粗略的量级如下（截至2026年的公开规格）：5–50 kg负载工业臂的重复性为$\pm0.02$–$0.1\,\mathrm{mm}$，协作臂为$\pm0.03$–$0.1\,\mathrm{mm}$；未标定机械臂的绝对精度在1–5 mm量级，经标定可提高到十分之几毫米，采用增加第二编码器或柔度模型的最佳“高精度”选件甚至可达到0.1 mm左右。

标定所处理的误差分为两类。

- **几何误差（geometric error）**是运动学模型参数中的误差：因加工与装配公差而与图纸不符的连杆长度和偏置、并非严格平行或垂直的关节轴线，以及——在多数机械臂中最大的单项——**关节零位偏置（joint zero offset）**，即控制器称为零的编码器读数与模型零点之差。它们是常量，可通过辨识更好的参数来修正。
- **非几何误差（non-geometric error）**取决于机械臂的状态：**关节与连杆柔度（compliance）**（重力与负载之下，减速器会扭转、连杆会弯曲，见[[robot-arm-design/gear-reducers]]与[[robot-arm-design/links-and-structure]]）、机械臂预热过程中连杆的**热膨胀**与驱动的漂移、**齿轮传动误差**与回差，以及编码器偏心。其中一些可以建模并辨识（柔度就很有效）；另一些只能靠设计或在精密作业前先预热机械臂来减小。

::: example 一台未标定机械臂的误差预算 {#ex-budget}
一台六轴机械臂从肩部（关节2）到工具点的臂展为$0.9\,\mathrm m$，铝质连杆总长$1.0\,\mathrm m$。试估算工具点误差来自：(a) 关节2的零位偏置$0.02^\circ$，(b) $0.3\,\mathrm{mm}$的连杆长度误差，(c) 关节2减速器在机械臂水平伸直、承受$120\,\mathrm{N\,m}$重力转矩时的扭转，其扭转刚度为$8.0\times10^{4}\,\mathrm{N\,m/rad}$，以及(d) 开工第一小时内连杆$12\,\mathrm K$的温升。运动学标定能消除哪些项？
::: solution
(a) 肩部一个微小转角$\delta$会使工具点移动$r\delta$：$\delta = 0.02^\circ = 3.49\times10^{-4}\,\mathrm{rad}$，于是$0.9\times3.49\times10^{-4} = 3.1\times10^{-4}\,\mathrm m = 0.31\,\mathrm{mm}$。

(b) 长度误差沿连杆方向按自身大小移动工具点：$0.30\,\mathrm{mm}$。

(c) 减速器扭转$\tau/k = 120/(8.0\times10^4) = 1.5\times10^{-3}\,\mathrm{rad}$，在$0.9\,\mathrm m$处即$1.35\,\mathrm{mm}$——朝下，且随位姿与负载而变。

(d) 铝的热胀系数为$\alpha = 23\times10^{-6}\,\mathrm K^{-1}$：$\Delta L = \alpha L\Delta T = 23\times10^{-6}\times1.0\times12 = 2.8\times10^{-4}\,\mathrm m = 0.28\,\mathrm{mm}$。

运动学（几何）标定消除常量项(a)与(b)。柔度项(c)最大，且依赖于构型；只有当模型包含关节刚度、且控制器计算重力转矩时才会被消除（[[#sec-nongeometric]]）。热项(d)随时间变化，靠预热、温度补偿或定期重新回零来管理。**合理性检验。** 这些项与上文引用的未标定机械臂1–5 mm精度相当，而每一项都是该臂重复性的十倍以上——所以这台机械臂重复一个误差的把握，远大于避免它的把握。
:::
:::

::: widget plot
f: x*d*pi/180*1000; 0*x + a*L*T/1000; x*t/k
x: 0, 1.5
y: 0, 3
sliders: d=0.02:0:0.1:0.005; a=23:10:25:0.5; L=1:0.3:2:0.1; T=12:0:30:1; t=120:0:400:10; k=80:20:300:5
labels: \text{零位偏移 } d\ (^\circ); \text{热伸长 } \alpha L\Delta T; \text{减速器扭角 } \tau/k
caption: 工具点误差（单位mm）随臂展$r$（单位m）的变化，对应三种误差源：以度计的关节零位偏置$d$；总长$L$（m）、胀缩系数为$a$（单位$10^{-6}\,\mathrm K^{-1}$）温升$T$（K）时连杆的热伸长；以及在$10^3\,\mathrm{N\,m/rad}$单位下的扭转刚度$k$承受$t$（N m）重力转矩时的减速器扭转。偏置与扭转误差随臂展线性增长；热误差则与臂展无关。注意对又大又重负载的机械臂，减速器柔度有多快就占了上风。
:::

## 运动学误差模型 {#sec-model}

把正运动学写成关节变量$\boldsymbol\theta$与运动学参数向量$\mathbf p\in\R^{N}$的函数：$\mathbf x = \mathbf f(\boldsymbol\theta, \mathbf p)$，其中$\mathbf x$是被测量的量——工具位置（3个数）或完整工具位姿（6个数）。控制器使用名义参数$\mathbf p_0$；真实机械臂则是$\mathbf p_0 + \Delta\mathbf p$。

::: proposition 线性化误差模型 {#prop-linear}
对于小参数误差，构型$\boldsymbol\theta$处的位姿误差为
$$
\Delta\mathbf x = \mathbf f(\boldsymbol\theta, \mathbf p_0 + \Delta\mathbf p) - \mathbf f(\boldsymbol\theta, \mathbf p_0) \approx J_p(\boldsymbol\theta)\,\Delta\mathbf p,\qquad J_p = \frac{\partial\mathbf f}{\partial\mathbf p}\bigg|_{\boldsymbol\theta, \mathbf p_0},
$$ {#eq-error-model}
其误差关于$\lVert\Delta\mathbf p\rVert$为二阶。$J_p$是**辨识雅可比矩阵（identification Jacobian）**；对关节零位偏置而言，它的各列正是[[robotics/jacobians]]中通常机械臂雅可比矩阵的对应各列。
:::

::: proof
若$\mathbf f$关于$\mathbf p$二阶连续可微——它确实是，因为它由旋转与平移的乘积构成，而矩阵元是参数的正弦、余弦与线性项——泰勒定理给出$\mathbf f(\boldsymbol\theta, \mathbf p_0 + \Delta\mathbf p) = \mathbf f(\boldsymbol\theta, \mathbf p_0) + J_p\Delta\mathbf p + \mathbf R$，其中$\lVert\mathbf R\rVert \le \tfrac12 M\lVert\Delta\mathbf p\rVert^2$，$M$是二阶导数在该线段上的一个界。关节$i$的零位偏置$\delta_i$只通过$\theta_i + \delta_i$进入，故$\partial\mathbf f/\partial\delta_i = \partial\mathbf f/\partial\theta_i$，即机械臂雅可比矩阵的第$i$列（采用对所测物理量合适的解析形式）。
:::

在$m$个构型$\boldsymbol\theta_1, \dots, \boldsymbol\theta_m$处测量机械臂并把方程堆叠起来：$\Delta\mathbf X = J\,\Delta\mathbf p$，其中$\Delta\mathbf X = (\Delta\mathbf x_1, \dots, \Delta\mathbf x_m)$，$J = (J_p(\boldsymbol\theta_1); \dots; J_p(\boldsymbol\theta_m))$，规模为$3m\times N$（或$6m\times N$）。当方程数多于未知数、测量又含噪声时，用最小二乘估计参数。

::: proposition 最小二乘辨识与可辨识性 {#prop-ls}
使$\lVert\Delta\mathbf X - J\Delta\mathbf p\rVert^2$最小的估计量当且仅当$J$列满秩（秩为$N$）时唯一，此时
$$
\Delta\hat{\mathbf p} = (J^{\mathsf T}J)^{-1}J^{\mathsf T}\Delta\mathbf X .
$$ {#eq-ls}
若测量误差相互独立、标准差为$\sigma$，则该估计（在一阶意义上）无偏，协方差为$\sigma^2(J^{\mathsf T}J)^{-1}$；其确定得最差的方向是$J$的最小奇异值$\sigma_{\min}$对应的右奇异向量方向，沿该方向的标准差为$\sigma/\sigma_{\min}$。若$J$秩亏，则存在某个参数组合对任何测量都没有影响，无法被辨识。
:::

::: proof
目标是$\phi(\Delta\mathbf p) = \lVert\Delta\mathbf X - J\Delta\mathbf p\rVert^2$，这是一个凸二次函数，梯度为$-2J^{\mathsf T}(\Delta\mathbf X - J\Delta\mathbf p)$，黑塞（Hesse）矩阵为$2J^{\mathsf T}J$。其极小值点满足正规方程$J^{\mathsf T}J\,\Delta\mathbf p = J^{\mathsf T}\Delta\mathbf X$。$J^{\mathsf T}J$可逆当且仅当$J\mathbf v = \mathbf 0$蕴含$\mathbf v = \mathbf 0$（因为$\mathbf v^{\mathsf T}J^{\mathsf T}J\mathbf v = \lVert J\mathbf v\rVert^2$），即$J$列满秩；此时极小值唯一并由[[#eq-ls]]给出。若对某个$\mathbf v \ne \mathbf 0$有$J\mathbf v = \mathbf 0$，则给任一极小值加上$\mathbf v$的任意倍得到另一个极小值——参数组合$\mathbf v$不改变任何测量。把$\Delta\mathbf X = J\Delta\mathbf p + \mathbf e$代入，$\mathbb E\,\mathbf e = \mathbf 0$，$\operatorname{Cov}\mathbf e = \sigma^2\mathbf 1$，估计量成为$\Delta\mathbf p + (J^{\mathsf T}J)^{-1}J^{\mathsf T}\mathbf e$，无偏，协方差为$(J^{\mathsf T}J)^{-1}J^{\mathsf T}\sigma^2 J(J^{\mathsf T}J)^{-1} = \sigma^2(J^{\mathsf T}J)^{-1}$。写$J = U\Sigma V^{\mathsf T}$，则$(J^{\mathsf T}J)^{-1} = V\Sigma^{-2}V^{\mathsf T}$，于是沿奇异向量$\mathbf v_k$的方差为$\sigma^2/\sigma_k^2$。
:::

两个推论塑造着每一次标定。其一，**模型必须最小**：若两个参数的作用相同——一个关节零位偏置与基坐标系绕同一轴的回转，或者用D-H的话说，沿与下一关节共享之轴的$d_i$——则$J$奇异，求解器要么返回无意义的结果，要么拒绝求解。含$R$个转动副与$P$个移动副、连同基坐标系与工具坐标系在内，串联机械臂的独立运动学参数数目通常记作
$$
N = 4R + 2P + 6
$$ {#eq-count}
当测量的是完整工具位姿时如此（Everett、Driels与Mooring，1987）；只测工具位置时则少3个，因为此时工具坐标系的姿态不可见。一台六轴机械臂因而有30（或27）个参数。其二，**位姿必须激励每一个参数**：在某个参数几乎不起作用的位姿处测量，会使$\sigma_{\min}$变小、估计变噪。因此位姿组要在工作空间与关节行程上铺开，其质量由列缩放后的$J$的条件数$\sigma_{\max}/\sigma_{\min}$，或由**可观测性指数（observability index）**——如奇异值之积——来判断（Borm与Menq，1991）。比较之前要先缩放各列，因为以米计的长度与以弧度计的角度不可通约——常见的做法是把角度乘以机械臂的一个特征长度后再表示。

### D-H参数、改进型D-H与指数积

要辨识哪些参数，取决于所选的运动学描述。

- **Denavit–Hartenberg**参数（[[robotics/forward-kinematics]]）是最小的（每个关节四个），但**对近乎平行的相邻轴是奇异的**：当肘节式机械臂的关节2与关节3名义上平行时，公共法线无法良好定义，百分之一度的错位就会把D-H原点沿轴移动数米——参数发生不连续的跳变，$J$病态。海亚蒂（Hayati）在1983年提出了标准的补救方案：对近乎平行的轴，用绕$y$轴的一个小转角$\beta_i$代替偏置$d_i$。
- **改进型D-H**（Craig约定，坐标系取在每根连杆的近端）是同样四个参数的另一种记账方式，带有同样的奇异性，并非解药。许多控制器内部使用它，因此辨识出的修正量必须用控制器自己的约定来表示。
- **指数积公式（product of exponentials，PoE）**（[[robotics/forward-kinematics]]）用每个关节在零位位形下于基坐标系中的旋量轴来描述该关节。其参数随几何平滑变化——一条略微倾斜的轴不过是一个略不同的向量——因而没有奇点（Okamura与Park，1996）。代价是冗余：旋量轴有六个数，而转动副只有四个独立自由度，因此辨识必须对多余方向施加约束或将其投影出去。

实际上，标定软件会任选条件良好的参数化，再把结果转换成控制器自己的模型。

::: example 由两个位姿辨识平面机械臂 {#ex-planar}
一台平面2R机械臂的名义连杆长度为$L_1 = 0.500\,\mathrm m$、$L_2 = 0.400\,\mathrm m$，关节零位偏置为零。其真实参数为$L_1 + \Delta L_1$、$L_2 + \Delta L_2$与关节偏置$\delta_1$、$\delta_2$（真实关节角为$\theta_i + \delta_i$）。基坐标系已经测得，因此位置在机械臂自己的基坐标系中已知。激光跟踪仪在两个构型处测量工具位置，得到相对名义位置的偏差（单位mm）：

| 位姿 | $\theta_1$ | $\theta_2$ | $\Delta x$ | $\Delta y$ |
|---|---|---|---|---|
| 1 | $0^\circ$ | $0^\circ$ | $-0.30$ | $+0.10$ |
| 2 | $0^\circ$ | $90^\circ$ | $+1.60$ | $-1.00$ |

试辨识这四个参数误差，并在第三个位姿$(\theta_1, \theta_2) = (45^\circ, -60^\circ)$处检验结果，该处实测位置为$(738.87, 251.23)\,\mathrm{mm}$。
::: solution
**模型。** $x = L_1\cos(\theta_1 + \delta_1) + L_2\cos(\theta_1 + \theta_2 + \delta_1 + \delta_2)$，$y = L_1\sin(\theta_1 + \delta_1) + L_2\sin(\theta_1 + \theta_2 + \delta_1 + \delta_2)$。在每个位姿处作线性化（[[#prop-linear]]）：

位姿1（机械臂沿$x$方向伸直）：$\Delta x = \Delta L_1 + \Delta L_2$且$\Delta y = (L_1 + L_2)\delta_1 + L_2\delta_2$。

位姿2（小臂沿$y$方向）：$x \approx L_1 - L_2(\delta_1 + \delta_2)$，$y \approx L_1\delta_1 + L_2 + \Delta L_2$，于是$\Delta x = \Delta L_1 - L_2(\delta_1 + \delta_2)$且$\Delta y = L_1\delta_1 + \Delta L_2$。

四个方程四个未知数；$J$是$4\times4$且可逆，所以这些参数由这组位姿可辨识。把两个位姿的第二个方程相加、加上位姿2的第一个方程、再减去位姿1的第一个方程，就消去了$\Delta L_1$、$\Delta L_2$与$\delta_2$：
$$
\Delta x_2 + \Delta y_1 - \Delta x_1 + \Delta y_2 = 2L_1\delta_1\ \Rightarrow\ \delta_1 = \frac{1.60 + 0.10 + 0.30 - 1.00}{2\times500} = 1.00\times10^{-3}\,\mathrm{rad}.
$$
于是$\delta_2 = (\Delta y_1 - (L_1 + L_2)\delta_1)/L_2 = (0.10 - 0.90)/400 = -2.00\times10^{-3}\,\mathrm{rad}$；$\Delta L_2 = \Delta y_2 - L_1\delta_1 = -1.00 - 0.50 = -1.50\,\mathrm{mm}$；$\Delta L_1 = \Delta x_1 - \Delta L_2 = -0.30 + 1.50 = +1.20\,\mathrm{mm}$。

**检验。** 在第三个位姿处，名义模型预测$(739.92, 250.03)\,\mathrm{mm}$，与实测相差$\sqrt{1.05^2 + 1.20^2} = 1.60\,\mathrm{mm}$。标定后的模型取$L_1 = 501.20\,\mathrm{mm}$、$L_2 = 398.50\,\mathrm{mm}$、$\delta_1 = 0.057^\circ$、$\delta_2 = -0.115^\circ$，预测$(738.87, 251.23)\,\mathrm{mm}$：与数据的$0.01\,\mathrm{mm}$分辨率一致。

**合理性检验。** 这些偏置的大小与编码器安装的预期相当（十分之一度），长度误差的大小与装配公差相当。真正的标定使用的位姿数远多于未知数，好让残差暴露测量噪声与未建模误差，并且要迭代——绕更新后的参数重新线性化——直到修正量不再变化（高斯–牛顿（Gauss–Newton）法或列文伯格–马夸特（Levenberg–Marquardt）法）。
:::
:::

### 测量机械臂

标定需要比目标精度高出数倍的仪器。常见的选择有：

- **激光跟踪仪（laser tracker）**跟踪装在工具上的角反射器（retro-reflector），以干涉测距或绝对测距加两个角度编码器测定其位置。当前仪器的规格大致是10–20 µm，再加上每米量程约5 µm（厂商数据，截至2026年）；有些配上测头或相机以测量姿态（6自由度）。它们是机械臂标定以及ISO 9283性能试验的基准仪器。
- **触发式测头与基准件（artefact）**：机械臂用装在工具上的测头或球去触碰标准球、平面或精密夹具。每次触碰给出一个约束（到平面的距离）或一个球心位置。便宜且可在产线上使用，但每次测量约束的位姿分量更少。
- **相机与摄影测量（photogrammetry）**：一台或多台已标定的相机观察工具上的目标，或机械臂上的相机观察已标定的靶标板。精度从几十微米到十分之几毫米不等，取决于工作体积与相机；这一路线有吸引力，因为执行任务的相机也能用来标定机械臂。
- **基于约束的自标定**：把工具锁定在一个固定点或平面上，或用已知长度的球杆仪（ball bar）把工具连到一个固定铰点上，于众多位姿处使用关节读数而不需任何外部位置测量——约束取代了仪器，代价是可辨识的参数变少。

::: algorithm 机械臂的运动学标定 {#alg-calib}
1. **准备**：以生产中所用的负载跑一段有代表性的运动30–60分钟为机械臂预热；把测量仪器刚性固定，并让它热稳定。
2. **建模**：选择最小且条件良好的参数化（轴线近于平行处用海亚蒂参数或PoE），包含基坐标系与工具坐标系，若减速器有柔度则还包含关节刚度。
3. **位姿组**：在工作空间与关节行程上选取50–200个分散的构型，各次都从一致的方向趋近以减小回差散布；在测量之前检查堆叠后的辨识雅可比矩阵的秩与条件数。
4. **测量**：在每个构型处记录指令关节角（来自编码器）以及测得的工具位置或位姿。
5. **辨识**：迭代执行最小二乘（[[#eq-ls]]），每次绕更新后的参数重新线性化，直到参数修正量足够小；检查残差是否有结构（随关节角变化的残差说明有未建模效应）。
6. **验证**：测量**另一组**位姿，只在它们之上报告精度。一个在自己的数据上拟合得远好于新数据的模型就是过拟合。
7. **部署**：把修正后的参数载入控制器（控制器随后在正、逆运动学中应用它们），并把它们与机械臂的出厂序列号一并记录。
:::

::: warning 用辨识数据做验证
在用于辨识的位姿上，残差总是好看的——参数够多时，最小二乘会把噪声与未建模误差都拟合进参数里。一台在自己数据上“标定到0.05 mm”的机械臂，在别处可能是0.3 mm。精度永远要在同一轮测量中取得的独立**验证集（validation set）**上给出；并且在机械臂被移动、重新接线或更换电机/减速器之后重复验证：更换一个关节会改变该关节的零位偏置，于是旧的标定恰好错了标定所消除的那个误差。
:::

### 非几何误差 {#sec-nongeometric}

多数已标定机械臂剩下的最大误差是柔度：[[#ex-budget]]中一台减速器就贡献了1.35 mm。**关节柔度模型**把每个关节角替换为$\theta_i + c_i\tau_i$，其中$c_i = 1/k_i$是关节的柔度，$\tau_i$是由动力学模型算出的重力（及负载）转矩。只要位姿组让重力转矩变化得足够充分——使用不同负载，或在每个关节有大、小载荷的位姿处——$c_i$就以线性方式进入误差模型，并可与几何参数一起辨识。连杆弯曲可以用同样的方式吸收进有效关节柔度。热误差可通过预热、在连杆中装温度传感器并配线性膨胀模型、或在生产中定期测量一个基准件来减小。

## 工具中心点标定 {#sec-tcp}

工具中心点（tool centre point，TCP）是末端执行器上被程序驱动的那个点——焊丝末端、点胶喷嘴、测珠——以法兰坐标系中的向量$\mathbf t$表示（通常还带一个姿态）。由于工具、它的安装座以及任何快换装置都各自引入公差，靠图纸很少能把TCP确定到毫米以内。**四点法（four-point method）**几乎内置于每一台机器人控制器，只靠机械臂自身求出$\mathbf t$：操作员把TCP从法兰的若干不同姿态引到同一个固定点——一根尖销。

在第$i$次触碰时，控制器知道法兰在基坐标系中的位姿$(R_i, \mathbf p_i)$，而TCP位于固定但未知的点$\mathbf c$：
$$
R_i\mathbf t + \mathbf p_i = \mathbf c ,\qquad i = 1, \dots, n .
$$ {#eq-tcp}
这是关于6个未知量$\mathbf t$与$\mathbf c$的$3n$个线性方程。两两相减可消去$\mathbf c$：
$$
(R_i - R_j)\,\mathbf t = \mathbf p_j - \mathbf p_i .
$$ {#eq-tcp-diff}

::: proposition TCP方程的可解性 {#prop-tcp}
当且仅当法兰姿态$R_1, \dots, R_n$并非全部仅由绕单一轴的旋转相关联时，TCP $\mathbf t$由[[#eq-tcp]]唯一确定——也就是说，相对旋转$R_1^{\mathsf T}R_i$中至少有两个的轴不同。对单个转角为$\varphi$的相对旋转，矩阵$R_j - R_i$把旋转轴方向化为零，且其余两个奇异值都等于$2\sin(\varphi/2)$。
:::

::: proof
写$R_j = R_iQ$，其中$Q = R_i^{\mathsf T}R_j$是绕单位轴$\mathbf u$转$\varphi$角的旋转。于是$R_j - R_i = R_i(Q - \mathbf 1)$，而$R_i$是正交阵，故$R_j - R_i$的奇异值就是$Q - \mathbf 1$的奇异值。$Q$保持$\mathbf u$不变，所以$(Q - \mathbf 1)\mathbf u = \mathbf 0$：$\mathbf t$沿轴的分量对这一对触碰不可见。在垂直于$\mathbf u$的平面内，$Q$的作用相当于转$\varphi$角，即相当于对复数乘以$e^{j\varphi}$，而$Q - \mathbf 1$相当于乘以$e^{j\varphi} - 1$，其模为$\lvert e^{j\varphi} - 1\rvert = 2\sin(\varphi/2)$；于是剩下的两个奇异值都等于$2\sin(\varphi/2)$。把多对方程堆叠起来，$\mathbf t$可确定当且仅当各零空间（即各轴）的交集平凡，亦即至少有两个相对旋转的轴不平行。$\mathbf t$一旦求出，$\mathbf c$由任一方程[[#eq-tcp]]得出。
:::

这一命题解释了给操作员的操作要领：**大幅度**倾斜工具（与第一个姿态成30–60°），并且绕**不同**的轴转。每次触碰位置$\sigma$的误差进入TCP会被放大为约$\sqrt2\,\sigma/(2\sin(\varphi/2))$：$\varphi = 30^\circ$时约为$2.7\sigma$，$10^\circ$时则为$8\sigma$。

::: widget plot
f: s*sqrt(2)/(2*sin(x*pi/360))
x: 5, 90
y: 0, 1
sliders: s=0.05:0.01:0.2:0.01
hlines: 0.1
labels: \sigma_t\ (\mathrm{mm})
caption: 垂直于旋转轴的TCP分量的标准误差（单位mm）随两次触碰之间再定向角$\varphi$（单位度）的变化，对应每个触碰点的误差$s$（单位mm）。当$s = 0.05\,\mathrm{mm}$时，只有再定向超过约40°时TCP才能确定到$0.1\,\mathrm{mm}$；小角度倾斜会让此法毫无用处。调大$s$可以模拟钝的尖销或粗心的操作员。
:::

::: example 四点法TCP标定 {#ex-tcp}
一个点胶喷嘴用四个法兰姿态触碰一根固定销来标定。位姿1中法兰竖直朝下，$R_1 = \mathrm{Rot}_x(180^\circ) = \operatorname{diag}(1, -1, -1)$；位姿2与3把法兰绕其自身的$x$、$y$轴各倾斜$30^\circ$，$R_2 = R_1\mathrm{Rot}_x(30^\circ)$，$R_3 = R_1\mathrm{Rot}_y(30^\circ)$；位姿4是一个用于检验的组合倾斜。控制器记录的法兰位置（mm，基坐标系）为
$$
\mathbf p_1 = (590.00, 95.00, 350.00),\quad \mathbf p_2 = (590.00, 20.67, 327.40),\quad \mathbf p_3 = (516.34, 95.00, 324.90).
$$
求法兰坐标系中的TCP$\mathbf t$与销的位置$\mathbf c$。
::: solution
由[[#eq-tcp-diff]]，并利用$R_2 - R_1 = R_1(\mathrm{Rot}_x(30^\circ) - \mathbf 1)$以及$R_1^{\mathsf T} = R_1$：
$$
(\mathrm{Rot}_x(30^\circ) - \mathbf 1)\,\mathbf t = R_1^{\mathsf T}(\mathbf p_1 - \mathbf p_2) = \operatorname{diag}(1,-1,-1)(0, 74.33, 22.60) = (0, -74.33, -22.60)\ \mathrm{mm}.
$$
代入$c = \cos30^\circ = 0.8660$、$s = 0.5$，左边为$\bigl(0,\ (c - 1)t_y - st_z,\ st_y + (c - 1)t_z\bigr)$。这个$2\times2$方程组的行列式为$(c-1)^2 + s^2 = 2(1 - c) = 0.2679$，于是
$$
t_y = \frac{(c-1)(-74.33) + s(-22.60)}{0.2679} = \frac{9.958 - 11.300}{0.2679} = -5.01\,\mathrm{mm},\qquad
t_z = \frac{-s(-74.33) + (c-1)(-22.60)}{0.2679} = \frac{37.17 + 3.03}{0.2679} = 150.0\,\mathrm{mm}.
$$
$x$分量对这一对触碰不可见（旋转是绕$x$进行的），正如[[#prop-tcp]]所预言。位姿3补上它：$(\mathrm{Rot}_y(30^\circ) - \mathbf 1)\mathbf t = R_1^{\mathsf T}(\mathbf p_1 - \mathbf p_3) = (73.66, 0, -25.10)\,\mathrm{mm}$，其分量为$\bigl((c - 1)t_x + st_z,\ 0,\ -st_x + (c-1)t_z\bigr)$。第三个分量给出$-0.5t_x = -25.10 + 0.1340\times150.0 = -5.00$，故$t_x = 10.0\,\mathrm{mm}$。于是$\mathbf t = (10.0, -5.0, 150.0)\,\mathrm{mm}$，再由位姿1得$\mathbf c = R_1\mathbf t + \mathbf p_1 = (10.0, 5.0, -150.0) + (590.00, 95.00, 350.00) = (600.0, 100.0, 200.0)\,\mathrm{mm}$。

**用位姿4检验。** 第四个记录位姿为$R_4 = R_1\mathrm{Rot}_x(-20^\circ)\mathrm{Rot}_y(-20^\circ)$、$\mathbf p_4 = (641.91, 144.68, 337.38)\,\mathrm{mm}$，算得$R_4\mathbf t + \mathbf p_4 = (600.01, 100.01, 200.00)\,\mathrm{mm}$：正好落在销上，误差不超过$0.01\,\mathrm{mm}$。在真正的标定中，$\mathbf c$的四个估计会因机械臂的定位误差与操作员的触碰误差而散布；控制器会报告这一散布，超过十分之几毫米的散布意味着某次触碰不好，应当重做。**合理性检验。** $t_z = 150\,\mathrm{mm}$正是图纸上从法兰算起的喷嘴长度；10 mm与5 mm的横向偏置正是标定的意义所在。
:::
:::

TCP的姿态（夹爪或焊枪需要它，因为接近方向很重要）用附加动作示教：沿工具自身的轴点动，或沿轴再触碰两个点，或者用相机测量。在ROS 2中，其结果就是工具描述中从`tool0`到TCP坐标系的固定关节（[[robot-arm-design/software-stack#sec-urdf]]）。

## 手眼标定 {#sec-handeye}

引导机械臂的相机只有当相机坐标系与机械臂之间的变换已知时才有用——而它很少能直接测量，因为相机的光心在镜头内部。**手眼标定（hand–eye calibration）**靠运动求出它。有两种布置：

- **眼在手上（eye-in-hand）**：相机装在机械臂（“手”）上。未知量是$X = {}^{g}T_{c}$，即相机在法兰（夹爪）坐标系中的位姿。标定靶标——棋盘格或编码标记板——固定在单元内。
- **眼在手外（eye-to-hand）**：相机固定在单元内，靶标由机械臂持有。未知量是相机在基坐标系中的位姿（附带地还得到靶标在法兰坐标系中的位姿）。

两种情形下机械臂都要移动到若干位姿；在每个位姿处，控制器报告法兰位姿$G_i = {}^{b}T_{g,i}$，相机则从内参已知的靶标图像算出靶标位姿$C_i = {}^{c}T_{t,i}$（一个“透视-n-点”（perspective-n-point）问题）。

::: proposition 手眼方程 AX = XB {#prop-axxb}
对于靶标固定在基坐标系的眼在手上标定，未知量$X = {}^{g}T_{c}$对任意两个测站$i, j$满足
$$
A X = X B,\qquad A = G_j^{-1}G_i ,\quad B = C_jC_i^{-1}.
$$ {#eq-axxb}
把每个变换写成一个旋转与一个平移，$A = (R_A, \mathbf t_A)$，依此类推，上式拆成
$$
R_AR_X = R_XR_B ,\qquad (R_A - \mathbf 1)\,\mathbf t_X = R_X\mathbf t_B - \mathbf t_A ,
$$ {#eq-axxb-split}
于是$R_A$与$R_B$转过相同的角度，而它们的单位轴$\boldsymbol\alpha$、$\boldsymbol\beta$满足$\boldsymbol\alpha = R_X\boldsymbol\beta$。唯一解要求至少有两个旋转轴不平行的运动。
:::

::: proof
靶标在基坐标系中的位姿在每个测站都相同：${}^{b}T_{t} = G_iXC_i = G_jXC_j$。左乘$G_j^{-1}$、右乘$C_i^{-1}$：$G_j^{-1}G_iX = XC_jC_i^{-1}$，即[[#eq-axxb]]。展开齐次变换的乘法，$AX = (R_AR_X,\ R_A\mathbf t_X + \mathbf t_A)$，$XB = (R_XR_B,\ R_X\mathbf t_B + \mathbf t_X)$；令各部分相等即得[[#eq-axxb-split]]。由$R_A = R_XR_BR_X^{\mathsf T}$，$R_A$是$R_B$的共轭，故迹相同，从而转角相同（$\operatorname{tr}R = 1 + 2\cos\varphi$）；并且若$R_B\boldsymbol\beta = \boldsymbol\beta$，则$R_A(R_X\boldsymbol\beta) = R_XR_B\boldsymbol\beta = R_X\boldsymbol\beta$，所以$R_X\boldsymbol\beta$就是$R_A$的轴。一对轴只能把$R_X$确定到绕$\boldsymbol\alpha$的一个旋转；再来一对轴不平行的运动就完全确定。平移方面，$R_A - \mathbf 1$奇异（其零空间是$\boldsymbol\alpha$方向，[[#prop-tcp]]），所以单个运动无法确定$\mathbf t_X$沿$\boldsymbol\alpha$的分量，同样需要一个轴不同的第二个运动。
:::

这些方程分两步求解，先求旋转。**蔡（Tsai）与伦茨（Lenz）**（1989）用转轴与转角的参数化解出旋转，再用线性最小二乘解平移。**朴（Park）与马丁（Martin）**（1994）给出了旋转群上的闭式最小二乘解：令$\boldsymbol\alpha_i = \log R_{A_i}$、$\boldsymbol\beta_i = \log R_{B_i}$（轴乘以角），
$$
M = \sum_i \boldsymbol\beta_i\boldsymbol\alpha_i^{\mathsf T},\qquad R_X = (M^{\mathsf T}M)^{-1/2}M^{\mathsf T},
$$ {#eq-park-martin}
这正是把相机各轴最佳对齐到夹爪各轴的旋转；随后由[[#eq-axxb-split]]堆叠起来的平移方程用线性最小二乘求$\mathbf t_X$。后来的方法同时求解旋转与平移（达尼伊利迪斯（Daniilidis）的对偶四元数（dual quaternion）法，1999；以及对重投影误差的非线性精化）。诸如OpenCV之类的库提供了其中若干实现（`calibrateHandEye`带有Tsai、Park、Horaud、Andreff与Daniilidis的多种变体），ROS生态也有能自动采集位姿的标定软件包。

::: example 由两个运动求手眼标定 {#ex-handeye}
一台眼在手上的相机用两个运动来标定。运动1使法兰绕其$x$轴转$30^\circ$，并平移$\mathbf t_{A_1} = (100, 0, 0)\,\mathrm{mm}$；相机观察到相应的相对运动$R_{B_1} = \mathrm{Rot}_{-y}(30^\circ)$（绕轴$\boldsymbol\beta_1 = (0, -1, 0)$转$30^\circ$）、$\mathbf t_{B_1} = (-46.70, -100.00, 14.28)\,\mathrm{mm}$。运动2使法兰绕其$y$轴转$45^\circ$，$\mathbf t_{A_2} = (0, 50, 20)\,\mathrm{mm}$；相机看到绕$\boldsymbol\beta_2 = (1, 0, 0)$的$45^\circ$旋转，$\mathbf t_{B_2} = (50.00, -56.57, -3.43)\,\mathrm{mm}$。求$X$。
::: solution
**一致性。** 每一对的转角都相等（$30^\circ$与$45^\circ$），正如[[#prop-axxb]]所要求——这是对真实数据很有用的第一项检查：角度不吻合暴露位姿与图像采集不同步。

**旋转。** 我们需要$R_X\boldsymbol\beta_i = \boldsymbol\alpha_i$，其中$\boldsymbol\alpha_1 = (1,0,0)$、$\boldsymbol\alpha_2 = (0,1,0)$。旋转保持叉积不变，故也有$R_X(\boldsymbol\beta_1\times\boldsymbol\beta_2) = \boldsymbol\alpha_1\times\boldsymbol\alpha_2$：$\boldsymbol\beta_1\times\boldsymbol\beta_2 = (0,-1,0)\times(1,0,0) = (0, 0, 1)$，而$\boldsymbol\alpha_1\times\boldsymbol\alpha_2 = (0,0,1)$。由于$\boldsymbol\beta$三标架是标准正交的，
$$
R_X = [\boldsymbol\alpha_1\ \boldsymbol\alpha_2\ \boldsymbol\alpha_3][\boldsymbol\beta_1\ \boldsymbol\beta_2\ \boldsymbol\beta_3]^{\mathsf T} = \begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}\begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix} = \begin{bmatrix}0&-1&0\\1&0&0\\0&0&1\end{bmatrix} = \mathrm{Rot}_z(90^\circ).
$$
（在有噪声的数据中轴不会恰好正交，此时[[#eq-park-martin]]给出最佳拟合的旋转。）

**平移，运动1。** $R_X\mathbf t_{B_1} = (100.00, -46.70, 14.28)$，故[[#eq-axxb-split]]的右边为$(0, -46.70, 14.28)\,\mathrm{mm}$。左边为$(\mathrm{Rot}_x(30^\circ) - \mathbf 1)\mathbf t_X = \bigl(0,\ (c-1)t_y - st_z,\ st_y + (c-1)t_z\bigr)$，其中$c - 1 = -0.1340$、$s = 0.5$。仿照[[#ex-tcp]]解这个$2\times2$方程组（行列式$0.2679$）：
$$
t_y = \frac{(-0.1340)(-46.70) + 0.5(14.28)}{0.2679} = 50.0\,\mathrm{mm},\qquad t_z = \frac{-0.5(-46.70) + (-0.1340)(14.28)}{0.2679} = 80.0\,\mathrm{mm}.
$$
**平移，运动2。** $R_X\mathbf t_{B_2} - \mathbf t_{A_2} = (56.57, 50.00, -3.43) - (0, 50, 20) = (56.57, 0, -23.43)$，而$(\mathrm{Rot}_y(45^\circ) - \mathbf 1)\mathbf t_X = \bigl((c' - 1)t_x + s't_z,\ 0,\ -s't_x + (c'-1)t_z\bigr)$，其中$c' - 1 = -0.2929$、$s' = 0.7071$。第一个分量：$-0.2929t_x + 0.7071\times80.0 = 56.57$给出$t_x = 0.0\,\mathrm{mm}$；第三个分量$-0.7071t_x - 0.2929\times80.0 = -23.43$与之相符。

于是相机坐标系绕法兰$z$轴旋转了$90^\circ$，其光心在法兰坐标系中位于$(0, 50, 80)\,\mathrm{mm}$。**合理性检验。** 只有运动1时$t_x$悬空（绕$x$的旋转），只有运动2时则$t_y$悬空；两者合起来把三个分量都定住了——这正是[[#prop-axxb]]最后一句的内容。
:::
:::

实际上会用10–20个测站，绕多变的轴旋转20–40°，并在每个测站让靶标占据图像的相当大部分。起主导作用的误差不是数值上的：机械臂与相机的位姿必须在同一瞬间（或在机械臂停稳时）采集；机械臂本身必须已经标定过（手眼标定把机械臂的误差吸收进$X$）；相机内参还必须正确。

### 相机内参简述

[[robotics/motion-planning-perception]]中的相机模型通过内参矩阵$K$（以像素计的焦距$f_x$、$f_y$与主点$c_x$、$c_y$）把相机坐标系中的点$(X, Y, Z)$映射到像素。真实镜头会引入**畸变（distortion）**，通常用归一化图像半径的布朗–孔拉迪（Brown–Conrady）多项式建模：径向项$k_1, k_2, k_3$与切向项$p_1, p_2$。**张氏标定法**（Zhang's method，2000）用10–30张姿态多变的平面靶标图像估计$K$与畸变：每张图像给出靶标平面与图像之间的一个单应（homography），这些单应给出对$K$的闭式约束，再经非线性精化最小化**重投影误差（reprojection error）**——检测出的靶标角点与模型预测角点之间的像素距离。标定良好的工业相机通常能达到十分之几像素的均方根重投影误差。要把像素换算成毫米：在深度$Z$处$\Delta u$像素的横向误差对应$Z\Delta u/f_x$；当$f_x = 1400\,\mathrm{px}$、$Z = 0.6\,\mathrm m$时，0.3 px即$0.13\,\mathrm{mm}$——与机械臂标定后的精度相当，所以相机标定与机械臂标定同等重要。

::: quiz
一次手眼标定之后，眼在手上的系统在下视抓取零件时很准，但当相机从倾斜姿态俯视料筐时，抓取会偏差2–3 mm。最可能的原因是什么？
- [ ] 内参矩阵的主点有误，而主点误差只影响倾斜的视角。
- [x] 标定用的各测站采用了绕几乎相同轴的旋转，使相机偏置的一部分难以确定。
- [ ] 手眼标定只能对单一的相机姿态有效。
- [ ] 靶标在图像中太大了。
::: solution
由[[#prop-axxb]]，绕单一轴的旋转无法确定$\mathbf t_X$沿该轴的分量（即使轴只是相近而非相同，噪声也会把它确定得很差）。当相机的视线重复标定时的位姿时，这一误差不可见；而相机一倾斜，未知的偏置便投影到作业平面上，表现为横向脱靶。补救的办法是绕多变的轴用更大的旋转重新标定。主点错误会在每一个视角中造成误差，而靶标占满图像是好事，不是害处。
:::
:::

::: history
早期的工业机器人靠示教编程，其精度几乎没有被测量过。1980年代的离线编程暴露了重复性与精度之间的差距，标定由此成为一个研究方向：海亚蒂（Samad Hayati）在1983年提出了针对平行轴的改进参数；丹尼尔·惠特尼（Daniel Whitney）、洛津斯基（Lozinski）与鲁克（Rourke）在1986年发表了对一台PUMA臂的一次影响深远的标定；穆林（Mooring）、罗斯（Roth）与德里尔斯（Driels）在《机械臂标定基础》（*Fundamentals of Manipulator Calibration*，1991）中总结了这一领域。冈村（Okamura）与朴（Park）在1996年展示了指数积模型如何避开基于D-H的标定的奇点。手眼问题在1989年由施（Shiu）与艾哈迈德（Ahmad）以及蔡（Tsai）与伦茨（Lenz）各自独立地表述为$AX = XB$，朴与马丁在1994年给出了旋转群上的闭式解。张正友（Zhengyou Zhang）2000年发表的用平面靶标的灵活相机标定法，让相机标定成了一张打印棋盘格就能完成的日常操作。测量工业机器人性能的ISO 9283标准首版于1990年，现行版本出自1998年。
:::

::: summary
- 重复性（围绕均值的散布，ISO 9283定义为$\bar l + 3s_l$）由硬件决定；精度（均值对指令）由模型决定。未标定机械臂的典型精度为1–5 mm，标定后为十分之几毫米（截至2026年）。
- 几何误差（关节零位、长度、轴线不对正）是常量、可辨识的；非几何误差（柔度、热伸长、齿轮误差）依赖于状态——柔度可以用关节刚度建模，热漂移靠预热与补偿来管理。
- 线性化模型$\Delta\mathbf x = J_p\Delta\mathbf p$；最小二乘$\Delta\hat{\mathbf p} = (J^{\mathsf T}J)^{-1}J^{\mathsf T}\Delta\mathbf X$，只有列满秩时唯一；沿最弱方向的噪声被放大$1/\sigma_{\min}$倍。使用最小模型——完整位姿下$N = 4R + 2P + 6$个参数（只测位置时少3个）——以及分散良好的位姿组；用独立数据验证。
- D-H对近乎平行的轴是奇异的（应使用海亚蒂参数）；改进型D-H并非解药；PoE无奇点但带冗余。
- TCP：$(R_i - R_j)\mathbf t = \mathbf p_j - \mathbf p_i$；要用大角度、不同轴再定向——灵敏度按$1/(2\sin(\varphi/2))$增长。
- 手眼：$AX = XB$，转角相等且$\boldsymbol\alpha = R_X\boldsymbol\beta$；先解旋转（蔡–伦茨法、朴–马丁法）再解平移；至少需要两个轴不平行的运动，实用中取10–20个。
- 相机内参用张氏方法标定；重投影误差为十分之几像素；$\Delta x = Z\Delta u/f_x$把像素换算为毫米。
:::

## 习题

::: exercise 一个关节零位偏置 {level=1 check="0.419"}
某机械臂的基座关节有$0.02^\circ$的零位偏置。在距基座轴线水平距离$1.2\,\mathrm m$处，这会造成多大的工具点误差？（以mm为单位输入误差，保留三位有效数字。）
::: solution
$r\delta = 1.2\times0.02\times\pi/180 = 4.19\times10^{-4}\,\mathrm m = 0.419\,\mathrm{mm}$，方向沿绕基座轴线之圆的切向。
:::
:::

::: exercise 热伸长 {level=1 check="0.276"}
一台机械臂的连杆沿臂展方向含$0.8\,\mathrm m$的铝（$\alpha = 23\times10^{-6}\,\mathrm K^{-1}$）。连杆升温$15\,\mathrm K$时臂展增长多少？（以mm为单位输入增长量，保留三位有效数字。）
::: solution
$\Delta L = \alpha L\Delta T = 23\times10^{-6}\times0.8\times15 = 2.76\times10^{-4}\,\mathrm m = 0.276\,\mathrm{mm}$。碳纤维管（轴向$\alpha$接近零）几乎能消除这一项——精密机械臂采用它的原因之一。
:::
:::

::: exercise 参数计数 {level=1 check="27"}
一台全转动副的六轴机械臂，当激光跟踪仪只测量工具*位置*时，可辨识多少个独立运动学参数？（输入该数目。）
::: solution
由[[#eq-count]]，完整位姿测量给出$4\times6 + 2\times0 + 6 = 30$；只测位置时，工具坐标系的三个姿态参数不可观测，剩下$27$。
:::
:::

::: exercise 柔度误差 {level=2 check="1.12"}
某肩部减速器的扭转刚度为$5.0\times10^{4}\,\mathrm{N\,m/rad}$。在某一姿态下它承受$80\,\mathrm{N\,m}$的重力转矩，工具距肩部轴线$0.70\,\mathrm m$。求扭转造成的工具点误差，并解释为什么负载的改变会破坏一次忽略了柔度的标定。（以mm为单位输入误差，保留三位有效数字。）
::: solution
扭转$80/(5.0\times10^4) = 1.6\times10^{-3}\,\mathrm{rad}$；误差$0.70\times1.6\times10^{-3} = 1.12\times10^{-3}\,\mathrm m = 1.12\,\mathrm{mm}$。只在单一负载下做的纯几何标定会把平均扭转吸收进零位偏置与长度；负载不同时重力转矩随之改变，扭转也随之改变，被吸收的修正就错了。采用关节柔度模型（$\theta_i + c_i\tau_i$）、转矩取自动力学模型、并用多种负载辨识，就能在所有负载下消除这一影响。
:::
:::

::: exercise TCP标定的再定向角 {level=2 check="0.204"}
一次TCP标定的每次触碰都有标准差$0.05\,\mathrm{mm}$的位置误差。对垂直于旋转轴的TCP分量使用灵敏度$\sqrt2\,\sigma/(2\sin(\varphi/2))$，若操作员只再定向$20^\circ$，标准误差是多少？（以mm为单位输入标准误差，保留三位有效数字。）
::: solution
$\sqrt2\times0.05/(2\sin10^\circ) = 0.0707/0.3473 = 0.204\,\mathrm{mm}$——是触碰误差的四倍。若为$60^\circ$则为$0.0707/1.0 = 0.071\,\mathrm{mm}$。$\sqrt2$来自两个独立触碰误差之差。
:::
:::

::: exercise 像素换算毫米 {level=2 check="0.1286"}
一台$f_x = 1400\,\mathrm{px}$的相机观察深度$0.60\,\mathrm m$处的一个零件，其标定的均方根重投影误差为$0.30\,\mathrm{px}$。这对应零件处多大的横向位置不确定度？（以mm为单位输入，保留四位有效数字。）
::: solution
$\Delta x = Z\Delta u/f_x = 600\times0.30/1400 = 0.1286\,\mathrm{mm}$。单个相机的深度不确定度（由已知靶标的视在大小得出）更大，大约大出距离与靶标尺寸之比那么多。
:::
:::

::: exercise 一个不可辨识的参数 {level=2}
在[[#ex-planar]]中基坐标系被假定已知。不妨设跟踪仪坐标系与机械臂基座之间相差一个绕基座轴线的未知转角$\gamma$（平移已知）。证明$\delta_1$与$\gamma$无法分别辨识，并说明实际被辨识的是什么。
::: solution
在跟踪仪坐标系中工具位置为$\mathrm{Rot}(\gamma)\mathbf f$，而对平面模型，$\mathrm{Rot}(\gamma)$只是给每个绝对角加上$\gamma$：$x = L_1\cos(\theta_1 + \delta_1 + \gamma) + L_2\cos(\theta_1 + \theta_2 + \delta_1 + \delta_2 + \gamma)$，$y$同理。两个参数只以和$\delta_1 + \gamma$出现，所以$J$中它们的列完全相同，$J$秩亏（[[#prop-ls]]）。只有这个和可辨识；必须精简模型，例如令$\gamma = 0$（用第一个关节的零点定义基坐标系的朝向），辨识$\delta_1' = \delta_1 + \gamma$。这正是[[#eq-count]]的计数中被吸收掉的六个基坐标系参数之一。
:::
:::

::: exercise 转角落不匹配 {level=2}
在一组手眼数据中，某一测站对的法兰旋转为$25.0^\circ$，而相机旋转为$23.6^\circ$；其余各对都相符到$0.1^\circ$。这说明什么，应当怎么做？
::: solution
由[[#prop-axxb]]，对任何$X$，$R_A$与$R_B$的转角必须相等。某一对出现$1.4^\circ$的不匹配说明存在离群点：图像与机械臂位姿不是同一时刻采集的（机械臂还在动或振动），靶标检测部分失败（角点误检、运动模糊），或报告的机械臂位姿不是实际到达的位姿。求解前应删去该测站（或等机械臂稳定后重新采集）；稳健的求解器会先检查转角一致性，自动剔除这样的测站对。
:::
:::

::: exercise I − R的奇异值 {level=3}
证明：对绕单位轴$\mathbf u$转$\varphi$角的旋转$Q$，$\lVert(Q - \mathbf 1)\mathbf v\rVert = 2\sin(\varphi/2)\lVert\mathbf v_\perp\rVert$，其中$\mathbf v_\perp$是$\mathbf v$垂直于$\mathbf u$的分量。用它导出[[#sec-tcp]]中给出的TCP灵敏度$\sqrt2\,\sigma/(2\sin(\varphi/2))$。
::: solution
分解$\mathbf v = (\mathbf u\cdot\mathbf v)\mathbf u + \mathbf v_\perp$。$Q$保持第一分量不变，故$(Q - \mathbf 1)\mathbf v = (Q - \mathbf 1)\mathbf v_\perp$。$Q\mathbf v_\perp$是$\mathbf v_\perp$在垂直平面内转过$\varphi$的结果，故$Q\mathbf v_\perp - \mathbf v_\perp$是半径为$\lVert\mathbf v_\perp\rVert$的圆上对圆心角$\varphi$的弦，其长为$2\lVert\mathbf v_\perp\rVert\sin(\varphi/2)$。对单对触碰的TCP标定，$(R_j - R_i)\mathbf t = \mathbf p_i - \mathbf p_j + \mathbf e$，其中$\mathbf e$是两个独立触碰误差之差，每个误差每分量的标准差为$\sigma$，故$\mathbf e$每分量的标准差为$\sqrt2\sigma$。在垂直平面内求逆相当于除以$2\sin(\varphi/2)$，于是得$\mathbf t$的每个垂直分量的标准误差$\sqrt2\sigma/(2\sin(\varphi/2))$。用$n$次触碰与最小二乘时，误差大致按$1/\sqrt{n-1}$下降。
:::
:::

::: exercise 一条产线的标定方案 {level=3}
你的公司每年出厂400台六轴机械臂，客户从CAD离线编程。市场部希望宣称：额定负载下全工作空间的绝对精度$0.5\,\mathrm{mm}$。请提出一套标定流程：用什么模型、什么仪器、多少个位姿、每台臂耗时多久、如何验证，以及在现场更换电机或减速器之后必须重复什么。
::: solution
一个合理方案的例子。**模型**：采用海亚蒂或PoE参数化（关节2与3平行）的27个位置可辨识的运动学参数，外加关节2至5每个关节一个柔度，用两种负载（空载与额定）辨识；热特性每型号表征一次，并规定开机预热。**仪器**：激光跟踪仪（在2 m体积内不确定度约0.03 mm，不足目标精度的十分之一）配自动化运行序列；用三点定位具确定机械臂基座。**位姿**：每种负载约100个，离线选取以最小化缩放后辨识雅可比矩阵的条件数，并覆盖各关节行程，各次从一致方向趋近。**耗时**：含稳定时间每个姿态约1分钟，加上预热每台臂约3–4小时；按年产400台算，需要一两套单元各跑一个班次。**验证**：每台臂另测30个未参与辨识的位姿，报告平均与最大误差；抽样若干台在模拟运输振动后复测；只有当验证最大误差对例如99 %的机械臂都满足0.5 mm时才做该项宣称。**现场服务**：更换电机或编码器会改变该关节的零位偏置——用定位具或一套简短的现场流程（触碰基准件，或便携相机系统）重新对零并核验；更换减速器还会改变它的柔度与传动误差，因此需要对该关节做更完整的重新标定。每台臂的参数要连同其序列号存放在机械臂之外，绝不可只存在控制器里。
:::
:::

## 延伸阅读

穆林、罗斯与德里尔斯的《机械臂标定基础》（*Fundamentals of Manipulator Calibration*，1991）至今仍是系统性的论述；《机器人手册》（*Springer Handbook of Robotics*）的标定章节综述了模型、可辨识性与测量。林奇（Lynch）与朴（Park）发展的指数积运动学是无奇点标定所依据的基础。手眼标定可读*IEEE Transactions on Robotics and Automation*上蔡与伦茨（1989）以及朴与马丁（1994）的论文；相机标定则见*IEEE Transactions on Pattern Analysis and Machine Intelligence*上张正友（2000）的论文。ISO 9283规定了用于给出精度与重复性的性能测试。
