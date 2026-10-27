机器人是由刚体组成的链，我们将要问到的几乎每一个问题——夹爪在哪里，摄像头朝向何方，工具转得多快——都是关于一个刚体相对于另一个刚体的**位置和姿态**的问题。本章建立回答这些问题的语言。位置很简单：三个坐标。姿态则不然：它存在于一个弯曲的三维空间中，用三个数覆盖这个空间必然在某处出现奇异性；而参数化姿态的各种方法（旋转矩阵、轴–角、欧拉角、四元数）各自在某一种运算上换取了简单，却在另一种运算上带来麻烦。我们将把旋转定义为列向量标准正交的矩阵，推导绕某轴旋转的罗德里格斯（Rodrigues）公式，再从矩阵中反求出轴和角，认识欧拉角和横滚–俯仰–偏航角并准确看出它们在何处失效（万向节锁），用单位四元数在没有这种失效的情况下合成旋转，最后把旋转和平移结合成$4\times4$齐次变换矩阵以及后续每一章都要用到的旋量运动。物理基础由[[dynamics/three-dimensional-dynamics]]中的刚体运动学提供；线性代数（正交矩阵、特征值、矩阵指数）见数学图谱，例如[特征值与特征向量](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)和[线性常微分方程组](/learn/maths/lesson.php?c=ode&l=linear-systems)。

## 坐标系与旋转矩阵 {#sec-rotations}

给每个所关心的物体固连一个右手标准正交**坐标系**：一个原点加三个互相垂直的单位向量。在机器人学中我们同时使用许多坐标系——地面上固定的**空间**坐标系$\{s\}$、每个连杆上的坐标系、夹爪上的**末端执行器**坐标系或**物体**坐标系$\{b\}$、摄像头坐标系$\{c\}$——一个物体的位姿就是其坐标系相对于另一个坐标系的位姿。自由向量（速度、力、轴线方向）不关心原点在哪里，只关心坐标轴如何转动；因此我们先单独描述转动。

::: definition 旋转矩阵 {#def-rotation-matrix}
设$\{a\}$和$\{b\}$为右手标准正交坐标系，坐标轴分别为$(\hat{\mathbf x}_a, \hat{\mathbf y}_a, \hat{\mathbf z}_a)$和$(\hat{\mathbf x}_b, \hat{\mathbf y}_b, \hat{\mathbf z}_b)$。$\{b\}$相对于$\{a\}$的**旋转矩阵**是这样一个$3\times3$矩阵，它的各列是用$\{a\}$坐标写出的$\{b\}$的各坐标轴：
$$
R_{ab} = \begin{bmatrix} \hat{\mathbf x}_b^{\,a} & \hat{\mathbf y}_b^{\,a} & \hat{\mathbf z}_b^{\,a} \end{bmatrix}
= \begin{bmatrix}
\hat{\mathbf x}_b\cdot\hat{\mathbf x}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf x}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf x}_a \\
\hat{\mathbf x}_b\cdot\hat{\mathbf y}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf y}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf y}_a \\
\hat{\mathbf x}_b\cdot\hat{\mathbf z}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf z}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf z}_a
\end{bmatrix}.
$$
每个元素都是一个方向余弦。所有这样的矩阵构成的集合是**特殊正交群**
$$
SO(3) = \{ R \in \mathbb R^{3\times 3} : R^{\mathsf T} R = I,\ \det R = +1 \}.
$$
:::

双下标是一种记账手段，可以避免大多数坐标系错误：若一个向量在$\{b\}$中的坐标为$\mathbf p_b$，则它在$\{a\}$中的坐标为
$$
\mathbf p_a = R_{ab}\,\mathbf p_b ,
$$ {#eq-change-frame}
因为$\mathbf p = p_{b,x}\hat{\mathbf x}_b + p_{b,y}\hat{\mathbf y}_b + p_{b,z}\hat{\mathbf z}_b$，而$R_{ab}$的各列恰好就是用$\{a\}$写出的这三根轴。相邻的内侧下标"相消"：$R_{ab}\mathbf p_b$是合法的，$R_{ab}\mathbf p_a$则是错误。同理$R_{ac} = R_{ab}R_{bc}$。

::: proposition 旋转矩阵的性质 {#prop-so3}
对$R, R_1, R_2 \in SO(3)$：
1. $R^{-1} = R^{\mathsf T}$，且$R_{ba} = R_{ab}^{\mathsf T}$；
2. $R_1 R_2 \in SO(3)$（封闭性），因此$SO(3)$在乘法下构成群，但一般$R_1R_2 \ne R_2R_1$；
3. $R$保持长度和夹角不变，$\lVert R\mathbf x\rVert = \lVert\mathbf x\rVert$且$(R\mathbf x)\cdot(R\mathbf y) = \mathbf x\cdot\mathbf y$；
4. $R$保持叉积不变，$R(\mathbf x\times\mathbf y) = (R\mathbf x)\times(R\mathbf y)$。
:::

::: proof
(1) $R^{\mathsf T}R = I$说明$R^{\mathsf T}$是左逆；对方阵而言左逆就是逆。由于对每个$\mathbf p$都有$\mathbf p_a = R_{ab}\mathbf p_b$，故$\mathbf p_b = R_{ab}^{-1}\mathbf p_a = R_{ab}^{\mathsf T}\mathbf p_a$，这正是$R_{ba}$的定义。
(2) $(R_1R_2)^{\mathsf T}(R_1R_2) = R_2^{\mathsf T}(R_1^{\mathsf T}R_1)R_2 = R_2^{\mathsf T}R_2 = I$，且$\det(R_1R_2) = \det R_1\det R_2 = 1$。单位矩阵属于$SO(3)$，逆也属于（由 1），所以它是一个群。不可交换性：[[#ex-fixed-current]]给出了两个按两种次序相乘结果不同的旋转。
(3) $(R\mathbf x)\cdot(R\mathbf y) = \mathbf x^{\mathsf T}R^{\mathsf T}R\,\mathbf y = \mathbf x\cdot\mathbf y$；令$\mathbf y = \mathbf x$即得长度不变。
(4) 对任意$\mathbf z$，标量三重积是一个行列式，故$(R\mathbf z)\cdot\big((R\mathbf x)\times(R\mathbf y)\big) = \det[R\mathbf z\ R\mathbf x\ R\mathbf y] = \det R\,\det[\mathbf z\ \mathbf x\ \mathbf y] = \mathbf z\cdot(\mathbf x\times\mathbf y) = (R\mathbf z)\cdot\big(R(\mathbf x\times\mathbf y)\big)$，最后一步用到 (3)。由于$R\mathbf z$取遍整个$\mathbb R^3$，两个向量$(R\mathbf x)\times(R\mathbf y)$与$R(\mathbf x\times\mathbf y)$相等。这里$\det R = +1$是必不可少的：$\det = -1$的正交矩阵是反射，它使叉积变号，把右手坐标系变成左手坐标系。
:::

九个数加上六个约束（$R^{\mathsf T}R = I$是对称的，因此只给出六个独立方程）剩下**三个**自由度：绕定点转动的刚体有三个转动自由度，这与[[mechanisms/mechanisms-mobility]]中格吕布勒（Grübler）公式的计数一致。绕各坐标轴转过角$\theta$（从轴的正端看去为逆时针，即右手定则）的三个**基本旋转**为
$$
\mathrm{Rot}_x(\theta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & c_\theta & -s_\theta \\ 0 & s_\theta & c_\theta \end{bmatrix},\quad
\mathrm{Rot}_y(\theta) = \begin{bmatrix} c_\theta & 0 & s_\theta \\ 0 & 1 & 0 \\ -s_\theta & 0 & c_\theta \end{bmatrix},\quad
\mathrm{Rot}_z(\theta) = \begin{bmatrix} c_\theta & -s_\theta & 0 \\ s_\theta & c_\theta & 0 \\ 0 & 0 & 1 \end{bmatrix},
$$ {#eq-elementary}
其中$c_\theta = \cos\theta$，$s_\theta = \sin\theta$。注意$\mathrm{Rot}_y$的符号规律：负号在最下一行，因为$\hat{\mathbf z}\times\hat{\mathbf x} = \hat{\mathbf y}$（循环次序为$x\to y\to z\to x$）。

::: example 点的坐标系变换 {#ex-rotate-point}
坐标系$\{b\}$与$\{a\}$原点相同，由$\{a\}$绕$\hat{\mathbf z}_a$转过$30^\circ$得到。安装在物体上的传感器报告一点的坐标为$\mathbf p_b = (2,\ 1,\ 0.5)\,\mathrm{m}$。求$\mathbf p_a$。
::: solution
$\{b\}$的各轴在$\{a\}$中的表示就是$R_{ab} = \mathrm{Rot}_z(30^\circ)$的各列，其中$\cos 30^\circ = 0.8660$，$\sin 30^\circ = 0.5$：
$$
\mathbf p_a = R_{ab}\mathbf p_b =
\begin{bmatrix} 0.8660 & -0.5 & 0 \\ 0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{bmatrix}
\begin{bmatrix} 2 \\ 1 \\ 0.5 \end{bmatrix}
= \begin{bmatrix} 1.732 - 0.5 \\ 1 + 0.866 \\ 0.5 \end{bmatrix}
= \begin{bmatrix} 1.232 \\ 1.866 \\ 0.5 \end{bmatrix}\mathrm{m}.
$$
合理性检查：$z$坐标不变（旋转绕$z$轴），长度保持不变，$\sqrt{2^2+1^2+0.5^2} = \sqrt{1.232^2+1.866^2+0.5^2} = 2.291\,\mathrm m$。该点在$xy$平面内的极角从$\{b\}$中的$\arctan(1/2) = 26.6^\circ$变为$\{a\}$中的$56.6^\circ$：恰好多了$30^\circ$，理应如此。
:::
:::

### 同一矩阵的三种解读

旋转矩阵扮演三种角色，混淆它们是符号错误和次序错误最常见的根源：

1. **姿态**：$R_{ab}$**就是**从$\{a\}$看到的$\{b\}$的姿态（它的各列是$\{b\}$的坐标轴）。
2. **坐标变换**：$\mathbf p_a = R_{ab}\mathbf p_b$把同一个物理向量用另一组坐标重新表示。
3. **算子**：$\mathbf p' = R\mathbf p$把一个向量转成一个**新的**向量，两者在同一坐标系中表示。

合成取决于第二次旋转是在哪个坐标系中描述的。若姿态为$R$的物体绕一根**固定于空间**的轴转过$R'$，则其新姿态为$R'R$（左乘）。若转动是绕**物体自身当前坐标系**的某根轴，新姿态为$RR'$（右乘）。第二条规则来自下标相消：在物体坐标中这次转动为$R_{bb'} = R'$，故$R_{sb'} = R_{sb}R_{bb'}$。第一条规则由第二条推出：固定在$\{s\}$中的轴在物体坐标中为$R^{\mathsf T}\hat{\boldsymbol\omega}$，而$R\,\mathrm{Rot}(R^{\mathsf T}\hat{\boldsymbol\omega},\theta) = \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,R$（[[#exr-conjugation]]）。

::: example 固定轴与当前轴 {#ex-fixed-current}
一个工具起初与$\{s\}$对齐。(a) 先绕其自身的$z$轴转$90^\circ$，再绕其自身（新的）$x$轴转$90^\circ$。(b) 先绕空间$z$轴转$90^\circ$，再绕空间$x$轴转$90^\circ$。分别求最终姿态。
::: solution
(a) 绕当前轴的旋转右乘，故$R_a = \mathrm{Rot}_z(90^\circ)\,\mathrm{Rot}_x(90^\circ)$：
$$
R_a = \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}
= \begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}.
$$
(b) 绕固定轴的旋转左乘，因此**后**做的旋转写在左边，$R_b = \mathrm{Rot}_x(90^\circ)\,\mathrm{Rot}_z(90^\circ)$：
$$
R_b = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}\begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}
= \begin{bmatrix} 0 & -1 & 0 \\ 0 & 0 & -1 \\ 1 & 0 & 0 \end{bmatrix}.
$$
读出各列：在 (a) 中工具的$x$轴最终沿$\hat{\mathbf y}_s$，在 (b) 中沿$\hat{\mathbf z}_s$。同样两条指令给出不同的最终姿态，这就是[[#prop-so3]]中的不可交换性。拿一本书亲手检验一下：值得做一次。两个结果都是真旋转：各列标准正交，展开行列式得$\det R_a = \det R_b = +1$。
:::
:::

::: warning 左乘还是右乘？
"先绕$x$转，再绕$z$转"在说明是**哪一根**$x$轴和$z$轴之前，并没有唯一的矩阵。绕固定（空间）轴时，按执行次序从右向左写矩阵，$R = \mathrm{Rot}_z\,\mathrm{Rot}_x$；绕运动（物体）轴时，从左向右写，$R = \mathrm{Rot}_x\,\mathrm{Rot}_z$。不同的机器人软件库假定的约定各不相同，工业机械臂的控制器手册也各自定义自己的姿态角：在信任一个库之前，务必先用[[#ex-fixed-current]]这样的$90^\circ$情形测试它。
:::

## 指数坐标：轴与角 {#sec-exp}

欧拉（Euler）在 1776 年证明，刚体绕定点的任何转动都是绕某根轴$\hat{\boldsymbol\omega}$转过某个角$\theta$的转动。这四个数加一个约束（$\lVert\hat{\boldsymbol\omega}\rVert = 1$），或者等价地，向量$\hat{\boldsymbol\omega}\theta$的三个分量，就是该旋转的**指数坐标**。为了用它们计算，我们需要把叉积写成矩阵。

::: definition 向量的反对称矩阵 {#def-skew}
对$\boldsymbol\omega = (\omega_1,\omega_2,\omega_3) \in \mathbb R^3$，
$$
[\boldsymbol\omega] = \begin{bmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{bmatrix},
\qquad [\boldsymbol\omega]\,\mathbf x = \boldsymbol\omega\times\mathbf x \ \text{ 对所有 } \mathbf x .
$$
$[\boldsymbol\omega]^{\mathsf T} = -[\boldsymbol\omega]$，且每个$3\times3$反对称矩阵都恰好是唯一一个$\boldsymbol\omega$对应的$[\boldsymbol\omega]$。这些矩阵构成的集合记作$so(3)$。
:::

有两个恒等式会经常用到。对**单位**向量$\hat{\boldsymbol\omega}$，向量三重积$\hat{\boldsymbol\omega}\times(\hat{\boldsymbol\omega}\times\mathbf x) = (\hat{\boldsymbol\omega}\cdot\mathbf x)\hat{\boldsymbol\omega} - \mathbf x$给出
$$
[\hat{\boldsymbol\omega}]^2 = \hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I,
\qquad
[\hat{\boldsymbol\omega}]^3 = -[\hat{\boldsymbol\omega}],
$$ {#eq-skew-powers}
第二式成立是因为$[\hat{\boldsymbol\omega}]\hat{\boldsymbol\omega} = \hat{\boldsymbol\omega}\times\hat{\boldsymbol\omega} = \mathbf 0$。

::: theorem 罗德里格斯公式 {#thm-rodrigues}
绕单位轴$\hat{\boldsymbol\omega}$转过角$\theta$（右手定则）的旋转为
$$
\mathrm{Rot}(\hat{\boldsymbol\omega},\theta) = e^{[\hat{\boldsymbol\omega}]\theta} = I + \sin\theta\,[\hat{\boldsymbol\omega}] + (1-\cos\theta)\,[\hat{\boldsymbol\omega}]^2 ,
$$ {#eq-rodrigues}
作用于向量时，
$\ \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,\mathbf p = \cos\theta\,\mathbf p + \sin\theta\,(\hat{\boldsymbol\omega}\times\mathbf p) + (1-\cos\theta)(\hat{\boldsymbol\omega}\cdot\mathbf p)\,\hat{\boldsymbol\omega}$。
:::

::: proof
设物体绕通过原点的固定轴$\hat{\boldsymbol\omega}$以单位角速度转动，于是经过时间$t$后它转过了角$t$。固定在物体上的点以速度$\boldsymbol\omega\times\mathbf p$运动（刚体运动学，[[dynamics/three-dimensional-dynamics]]），因此其位置满足线性常微分方程$\dot{\mathbf p} = [\hat{\boldsymbol\omega}]\mathbf p$，解为$\mathbf p(t) = e^{[\hat{\boldsymbol\omega}]t}\mathbf p(0)$。令$t = \theta$，旋转算子就是矩阵指数$e^{[\hat{\boldsymbol\omega}]\theta} = \sum_{k\ge0} ([\hat{\boldsymbol\omega}]\theta)^k/k!$。用[[#eq-skew-powers]]降幂：$[\hat{\boldsymbol\omega}]^{3} = -[\hat{\boldsymbol\omega}]$，$[\hat{\boldsymbol\omega}]^{4} = -[\hat{\boldsymbol\omega}]^2$，依此类推，所以奇次幂为$\pm[\hat{\boldsymbol\omega}]$，偶次幂（$k\ge2$）为$\pm[\hat{\boldsymbol\omega}]^2$：
$$
e^{[\hat{\boldsymbol\omega}]\theta} = I + \Big(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\Big)[\hat{\boldsymbol\omega}] + \Big(\frac{\theta^2}{2!} - \frac{\theta^4}{4!} + \cdots\Big)[\hat{\boldsymbol\omega}]^2
= I + \sin\theta\,[\hat{\boldsymbol\omega}] + (1-\cos\theta)[\hat{\boldsymbol\omega}]^2 .
$$
要得到向量形式，把它作用于$\mathbf p$并利用$[\hat{\boldsymbol\omega}]^2\mathbf p = (\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega} - \mathbf p$即可。最后，结果属于$SO(3)$：对$A = [\hat{\boldsymbol\omega}]\theta$有$(e^{A})^{\mathsf T} = e^{A^{\mathsf T}} = e^{-A}$，故$(e^A)^{\mathsf T}e^A = I$；且$\det e^{A} = e^{\operatorname{tr}A} = e^0 = 1$。假设：$\lVert\hat{\boldsymbol\omega}\rVert = 1$（否则[[#eq-skew-powers]]不成立），且轴通过原点（否则会出现平移——见[[#sec-screw]]）。
:::

向量形式有一幅清晰的图景：把$\mathbf p$分解为沿轴的部分$(\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega}$——它不动——和垂直于轴的部分，后者在由它自身与$\hat{\boldsymbol\omega}\times\mathbf p$张成的平面内转过$\theta$。因此每个点都在垂直于轴的平面内沿圆周运动。

::: widget parametric
fx: cos(t) + (1 - cos(t))*sin(a)^2
fy: sin(t)*cos(a)
t: 0, 2pi
x: -1.3, 1.3
y: -1.3, 1.3
sliders: a=0.6:0:1.5:0.05
caption: 点$\mathbf p = (1,0,0)$绕轴$\hat{\boldsymbol\omega} = (\sin a, 0, \cos a)$经$\mathrm{Rot}(\hat{\boldsymbol\omega}, t)$转动的轨迹，由罗德里格斯公式算出，从上方观察（在$xy$平面上的投影）。$a = 0$时轴为$\hat{\mathbf z}$，轨迹为单位圆。把轴向$\hat{\mathbf x}$倾斜，圆会缩小，并越来越呈侧视状态：它的真实半径为$\cos a$，即$\mathbf p$到轴的距离，圆心$(\sin^2 a, 0)$是$\mathbf p$在轴上的投影。$a \approx \pi/2$时该点位于轴上，不再运动。
:::

逆问题——给定$R$，求$\hat{\boldsymbol\omega}$和$\theta$——就是**矩阵对数**。

::: proposition 旋转矩阵的轴与角 {#prop-log}
设$R \in SO(3)$，$\theta \in [0,\pi]$为其转角。则
$$
\cos\theta = \tfrac12(\operatorname{tr}R - 1),
\qquad
[\hat{\boldsymbol\omega}] = \frac{R - R^{\mathsf T}}{2\sin\theta}\quad (0 < \theta < \pi).
$$ {#eq-log}
若$\theta = 0$，轴无定义（$R = I$）。若$\theta = \pi$，则$R = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I$，$\hat{\boldsymbol\omega}$可由$R + I$的任一非零列读出（相差一个符号）。
:::

::: proof
对[[#eq-rodrigues]]取迹：$\operatorname{tr}I = 3$，$\operatorname{tr}[\hat{\boldsymbol\omega}] = 0$，$\operatorname{tr}[\hat{\boldsymbol\omega}]^2 = \operatorname{tr}(\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T}) - 3 = 1 - 3 = -2$，故$\operatorname{tr}R = 3 - 2(1-\cos\theta) = 1 + 2\cos\theta$。其次，$I$和$[\hat{\boldsymbol\omega}]^2$是对称的，$[\hat{\boldsymbol\omega}]$是反对称的，所以$R - R^{\mathsf T} = 2\sin\theta\,[\hat{\boldsymbol\omega}]$，当$\sin\theta \ne 0$时可以除以$2\sin\theta$。在$\theta = \pi$处公式给出$R = I + 2[\hat{\boldsymbol\omega}]^2 = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I$，故$R + I = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T}$，其各列都是$\hat{\boldsymbol\omega}$的倍数；$\pm\hat{\boldsymbol\omega}$都成立，因为朝任一方向转半圈都是同一个旋转。把$\theta$限制在$[0,\pi]$不会丢失任何东西：绕$\hat{\boldsymbol\omega}$转过$\theta > \pi$等于绕$-\hat{\boldsymbol\omega}$转过$2\pi - \theta$。
:::

::: example 复合旋转的轴与角 {#ex-log}
求[[#ex-fixed-current]]中$R_a$的轴与角。
::: solution
$\operatorname{tr}R_a = 0 + 0 + 0 = 0$，故$\cos\theta = (0 - 1)/2 = -\tfrac12$，$\theta = 120^\circ = 2\pi/3$，$\sin\theta = \sqrt3/2$。于是
$$
\frac{R_a - R_a^{\mathsf T}}{2\sin\theta} = \frac{1}{\sqrt3}
\left(\begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix} - \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}\right)
= \frac{1}{\sqrt3}\begin{bmatrix} 0 & -1 & 1 \\ 1 & 0 & -1 \\ -1 & 1 & 0 \end{bmatrix},
$$
这就是$\hat{\boldsymbol\omega} = (1,1,1)/\sqrt3$对应的$[\hat{\boldsymbol\omega}]$（读取$\omega_1 = $元素$(3,2)$，$\omega_2 = $元素$(1,3)$，$\omega_3 = $元素$(2,1)$）。因此绕物体$z$轴和物体$x$轴相继转四分之一圈，等于绕立方体对角线转一次$120^\circ$。检验：绕$(1,1,1)$转$120^\circ$使坐标轴循环$x \to y \to z \to x$，而$R_a$的各列确实表明$\hat{\mathbf x}_b = \hat{\mathbf y}_s$，$\hat{\mathbf y}_b = \hat{\mathbf z}_s$，$\hat{\mathbf z}_b = \hat{\mathbf x}_s$。对$R_b$作同样计算，得绕$(1,-1,1)/\sqrt3$转$120^\circ$。
:::
:::

### 角速度

当$R(t)$随时间变化时，导数$\dot R$本身不是旋转矩阵，但它携带着角速度。

::: proposition 由转动坐标系求角速度 {#prop-angular-velocity}
设$R(t) = R_{sb}(t)$为物体坐标系的姿态。则$\dot R R^{\mathsf T}$和$R^{\mathsf T}\dot R$都是反对称矩阵，且
$$
\dot R R^{\mathsf T} = [\boldsymbol\omega_s], \qquad R^{\mathsf T}\dot R = [\boldsymbol\omega_b], \qquad \boldsymbol\omega_s = R\,\boldsymbol\omega_b ,
$$ {#eq-angular-velocity}
其中$\boldsymbol\omega_s$是在$\{s\}$中表示的物体角速度，$\boldsymbol\omega_b$是同一向量在$\{b\}$中的表示。
:::

::: proof
对$RR^{\mathsf T} = I$求导：$\dot RR^{\mathsf T} + R\dot R^{\mathsf T} = 0$，即$\dot RR^{\mathsf T} = -(\dot RR^{\mathsf T})^{\mathsf T}$，所以它是反对称的，并对唯一的$\boldsymbol\omega_s$等于$[\boldsymbol\omega_s]$。它就是角速度：固定在物体上的点具有不变的$\mathbf p_b$，且$\mathbf p_s(t) = R(t)\mathbf p_b$（原点重合），故$\dot{\mathbf p}_s = \dot R\mathbf p_b = \dot RR^{\mathsf T}\mathbf p_s = \boldsymbol\omega_s\times\mathbf p_s$，这正是刚体角速度的定义性质。对$R^{\mathsf T}R = I$作同样论证可知$R^{\mathsf T}\dot R$是反对称的。最后，$R^{\mathsf T}\dot R = R^{\mathsf T}(\dot RR^{\mathsf T})R = R^{\mathsf T}[\boldsymbol\omega_s]R = [R^{\mathsf T}\boldsymbol\omega_s]$，这里用到恒等式$R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$（它是[[#prop-so3]]性质 4 的另一种表述；见[[#exr-conjugation]]）。因此$\boldsymbol\omega_b = R^{\mathsf T}\boldsymbol\omega_s$。
:::

指数坐标还有一个优点：对于恒定角速度$\boldsymbol\omega$，$R(t) = e^{[\boldsymbol\omega]t}R(0)$精确成立。惯性测量单元中的陀螺积分器就利用了这一点：在每个采样周期$\Delta t$内，它用测得的物体角速度作更新$R \leftarrow R\,e^{[\boldsymbol\omega_b]\Delta t}$，结果精确地保持在$SO(3)$上；而朴素的欧拉步$R \leftarrow R + R[\boldsymbol\omega_b]\Delta t$会偏离$SO(3)$（其各列逐渐失去标准正交性）。

## 欧拉角与横滚–俯仰–偏航角 {#sec-euler}

三个数是最少的，而人们喜欢能想象出来的三个角。只要相邻两次的转轴不同，任何旋转都可以由三次相继的基本旋转构成。

::: definition ZYZ 欧拉角与 ZYX 横滚–俯仰–偏航角 {#def-euler}
**ZYZ 欧拉角**$(\alpha,\beta,\gamma)$描述这样得到的旋转：先绕物体$z$轴转$\alpha$，再绕新的物体$y$轴转$\beta$，再绕最新的物体$z$轴转$\gamma$：
$$
R = \mathrm{Rot}_z(\alpha)\,\mathrm{Rot}_y(\beta)\,\mathrm{Rot}_z(\gamma)
= \begin{bmatrix}
c_\alpha c_\beta c_\gamma - s_\alpha s_\gamma & -c_\alpha c_\beta s_\gamma - s_\alpha c_\gamma & c_\alpha s_\beta \\
s_\alpha c_\beta c_\gamma + c_\alpha s_\gamma & -s_\alpha c_\beta s_\gamma + c_\alpha c_\gamma & s_\alpha s_\beta \\
-s_\beta c_\gamma & s_\beta s_\gamma & c_\beta
\end{bmatrix}.
$$
**横滚–俯仰–偏航角**（ZYX）$(\psi, \vartheta, \varphi)$——偏航角$\psi$、俯仰角$\vartheta$、横滚角$\varphi$——采用$R = \mathrm{Rot}_z(\psi)\,\mathrm{Rot}_y(\vartheta)\,\mathrm{Rot}_x(\varphi)$，其第一列和最后一行为
$$
r_{11} = c_\psi c_\vartheta,\quad r_{21} = s_\psi c_\vartheta,\quad r_{31} = -s_\vartheta,\quad r_{32} = c_\vartheta s_\varphi,\quad r_{33} = c_\vartheta c_\varphi .
$$
等价地，ZYX 横滚–俯仰–偏航就是先绕固定$x$轴横滚，再绕固定$y$轴俯仰，再绕固定$z$轴偏航（左乘使次序反过来）。
:::

工业机械臂的球形手腕有三根按 ZYZ 方式布置的转动轴，因此 ZYZ 角就是手腕的关节角（[[robotics/inverse-kinematics]]）；飞机、船舶和移动机器人则使用横滚–俯仰–偏航角。反求时使用`atan2`，即双变量反正切函数，它在$(-\pi,\pi]$内返回落在正确象限的角。对 ZYZ，取$\sin\beta > 0$：
$$
\beta = \operatorname{atan2}\!\big(\sqrt{r_{13}^2 + r_{23}^2},\ r_{33}\big),\quad
\alpha = \operatorname{atan2}(r_{23},\ r_{13}),\quad
\gamma = \operatorname{atan2}(r_{32},\ -r_{31}),
$$ {#eq-zyz-extract}
取$\sin\beta < 0$则给出第二组解$(\alpha+\pi, -\beta, \gamma+\pi)$。对横滚–俯仰–偏航，取$\cos\vartheta > 0$：
$$
\vartheta = \operatorname{atan2}\!\big(-r_{31},\ \sqrt{r_{32}^2 + r_{33}^2}\big),\quad
\psi = \operatorname{atan2}(r_{21},\ r_{11}),\quad
\varphi = \operatorname{atan2}(r_{32},\ r_{33}).
$$ {#eq-rpy-extract}

::: example 由测得的姿态求横滚、俯仰和偏航角 {#ex-rpy}
移动机械手上的姿态传感器报告（保留四位小数）
$$
R = \begin{bmatrix} 0.6943 & -0.6892 & -0.2072 \\ 0.5826 & 0.7072 & -0.4005 \\ 0.4226 & 0.1574 & 0.8925 \end{bmatrix}.
$$
求偏航、俯仰和横滚角，并检验$R$是旋转矩阵。
::: solution
先检验：第 1 列的长度为$\sqrt{0.6943^2 + 0.5826^2 + 0.4226^2} = 1.0000$；第 1 列与第 2 列的点积为$-0.4785 + 0.4120 + 0.0665 = 0.0000$；其余类似。再用[[#eq-rpy-extract]]：
$$
\vartheta = \operatorname{atan2}\!\big(-0.4226,\ \sqrt{0.1574^2 + 0.8925^2}\big) = \operatorname{atan2}(-0.4226,\ 0.9063) = -25.0^\circ,
$$
$$
\psi = \operatorname{atan2}(0.5826,\ 0.6943) = 40.0^\circ,\qquad \varphi = \operatorname{atan2}(0.1574,\ 0.8925) = 10.0^\circ .
$$
合理性检查：$\cos\vartheta = 0.9063$，且$r_{11} = \cos\psi\cos\vartheta = 0.7660\times0.9063 = 0.6943$ ✓。该载体偏航$40^\circ$，绕$y$轴的俯仰角为$-25^\circ$。当$z$轴向上时，绕$y$轴的负转动使$x$轴**抬起**：$R$的第一列的$z$分量为$+0.4226 = \sin 25^\circ$，所以载体的机头向上指$25^\circ$。在航空航天中$z$轴向下，同样的字眼带有相反的符号——这就是为什么在程序之间应当传递矩阵而不是传递这些字眼。
:::
:::

### 万向节锁

ZYZ 公式中没有除法，但它们在$\beta = 0$处失效：此时$r_{13} = r_{23} = r_{31} = r_{32} = 0$，$R = \mathrm{Rot}_z(\alpha+\gamma)$，只有和$\alpha + \gamma$是确定的。问题不仅出在反求上，还出在**变化率**上。

::: proposition 欧拉角变化率的奇异性 {#prop-gimbal}
对 ZYZ 角，空间坐标系中的角速度为$\boldsymbol\omega_s = B(\alpha,\beta)\,(\dot\alpha, \dot\beta, \dot\gamma)$，其中
$$
B(\alpha,\beta) = \begin{bmatrix} 0 & -s_\alpha & c_\alpha s_\beta \\ 0 & c_\alpha & s_\alpha s_\beta \\ 1 & 0 & c_\beta \end{bmatrix},
\qquad \det B = -\sin\beta .
$$
在$\beta = 0$或$\pi$处矩阵$B$奇异：某些角速度无法由任何有限的欧拉角变化率产生。$SO(3)$的每一种三参数表示都有这样的奇异点。
:::

::: proof
对$R = R_1R_2R_3$求导，其中$R_1 = \mathrm{Rot}_z(\alpha)$，$R_2 = \mathrm{Rot}_y(\beta)$，$R_3 = \mathrm{Rot}_z(\gamma)$：$\dot RR^{\mathsf T} = \dot R_1R_1^{\mathsf T} + R_1(\dot R_2R_2^{\mathsf T})R_1^{\mathsf T} + R_1R_2(\dot R_3R_3^{\mathsf T})R_2^{\mathsf T}R_1^{\mathsf T}$。对基本旋转有$\dot{\mathrm{Rot}}_z(\alpha)\mathrm{Rot}_z(\alpha)^{\mathsf T} = \dot\alpha[\hat{\mathbf z}]$，再由$R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$，三项分别是$\dot\alpha\hat{\mathbf z}$、$\dot\beta R_1\hat{\mathbf y}$和$\dot\gamma R_1R_2\hat{\mathbf z}$的反对称矩阵。所以$\boldsymbol\omega_s = \hat{\mathbf z}\dot\alpha + (-s_\alpha, c_\alpha, 0)\dot\beta + (c_\alpha s_\beta, s_\alpha s_\beta, c_\beta)\dot\gamma$，其系数列构成$B$。沿第一列展开，$\det B = 1\cdot\big((-s_\alpha)(s_\alpha s_\beta) - (c_\alpha)(c_\alpha s_\beta)\big) = -s_\beta$。从几何上看，在$\beta = 0$处第一根轴与第三根轴重合，所以$B$的第一列和第三列都是$\hat{\mathbf z}$，只剩下两个独立方向。最后一个论断是拓扑性的：$SO(3)$不与$\mathbb R^3$的任何开子集同胚（它是紧的），所以没有任何一个具有非奇异变化率映射的光滑三参数坐标卡能覆盖它的全部。
:::

::: widget plot
f: 1/sin(x); -cos(x)/sin(x)
x: 0.05, 1.5708
y: -12, 12
labels: \dot\gamma\ \text{(rad/s)}; \dot\alpha\ \text{(rad/s)}
hlines: 0
caption: 在$\alpha = 0$处产生稳定角速度$\boldsymbol\omega_s = (1, 0, 0)\,\mathrm{rad/s}$所需的欧拉角变化率随$\beta$（以弧度计）的变化：$\dot\gamma = 1/\sin\beta$，$\dot\alpha = -\cot\beta$（由$B^{-1}\boldsymbol\omega_s$得到）。远离奇异点时两个变化率都不大；当$\beta \to 0$时它们无界增长，而且两者几乎相互抵消——第一个和第三个万向架朝相反方向疯狂旋转，只为产生一个缓慢的翻转。在$\beta = 0$附近指令欧拉角的运动控制器会使其执行器饱和；这就是万向节锁。
:::

::: quiz
一个 ZYZ 轴布置的机器人手腕处于$\beta = 0$，因此其第一根轴与第三根轴共线。下列哪个说法正确？
- [ ] 手腕仍能以有界的关节速度使工具绕任意轴转动。
- [x] 无论关节速度如何，都无法使工具获得绕$x$轴的角速度。
- [ ] 工具的旋转矩阵无定义。
- [ ] 只有$\beta$无法由旋转矩阵确定。
::: solution
在$\beta = 0$处，$B$的各列为$\hat{\mathbf z}$、$(-s_\alpha, c_\alpha, 0)$和$\hat{\mathbf z}$，它们只张成一个包含$\hat{\mathbf z}$的平面；垂直于该平面的方向（在$\alpha = 0$时为$x$轴）无法达到。矩阵$R$本身完全有定义——它是$\mathrm{Rot}_z(\alpha+\gamma)$——而且$\beta = 0$是确定的；无法分别确定的是$\alpha$和$\gamma$。
:::
:::

## 单位四元数 {#sec-quat}

四个数加一个约束，既避免了三个角的奇异性，又比九个数加六个约束节省得多的存储和运算。这就是单位四元数，大多数机器人中间件、飞行控制器和游戏引擎内部使用的就是这种表示。

::: definition 四元数与单位四元数 {#def-quaternion}
**四元数**为$q = q_0 + q_1\mathbf i + q_2\mathbf j + q_3\mathbf k$，记作$q = (q_0, \mathbf u)$，其中标量部分为$q_0$，向量部分为$\mathbf u = (q_1,q_2,q_3)$，乘法按$\mathbf i^2 = \mathbf j^2 = \mathbf k^2 = \mathbf i\mathbf j\mathbf k = -1$进行。用向量形式表示，乘积为
$$
(a_0,\mathbf a)\otimes(b_0,\mathbf b) = \big(a_0b_0 - \mathbf a\cdot\mathbf b,\ \ a_0\mathbf b + b_0\mathbf a + \mathbf a\times\mathbf b\big),
$$ {#eq-quat-product}
它满足结合律但不满足交换律。共轭为$q^* = (q_0, -\mathbf u)$，范数为$\lVert q\rVert^2 = q\otimes q^* = q_0^2 + \lVert\mathbf u\rVert^2$。**单位四元数**满足$\lVert q\rVert = 1$；旋转$\mathrm{Rot}(\hat{\boldsymbol\omega},\theta)$的单位四元数为
$$
q = \big(\cos\tfrac\theta2,\ \sin\tfrac\theta2\,\hat{\boldsymbol\omega}\big).
$$
:::

::: proposition 用四元数旋转向量 {#prop-quat-rotation}
把$\mathbf p\in\mathbb R^3$等同于纯四元数$(0,\mathbf p)$。若$q = (\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$，则
$$
q\otimes(0,\mathbf p)\otimes q^* = \big(0,\ \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,\mathbf p\big),
$$
并且复合旋转的四元数就是乘积：若$q_1 \leftrightarrow R_1$，$q_2 \leftrightarrow R_2$，则$q_1\otimes q_2 \leftrightarrow R_1R_2$。$q$和$-q$表示同一个旋转。
:::

::: proof
记$q = (s, \mathbf u)$，其中$s = \cos\frac\theta2$，$\mathbf u = \sin\frac\theta2\hat{\boldsymbol\omega}$。由[[#eq-quat-product]]，$q\otimes(0,\mathbf p) = (-\mathbf u\cdot\mathbf p,\ s\mathbf p + \mathbf u\times\mathbf p)$。在右边乘以$q^* = (s, -\mathbf u)$。标量部分为$-s\,\mathbf u\cdot\mathbf p + (s\mathbf p + \mathbf u\times\mathbf p)\cdot\mathbf u = 0$。向量部分为
$$
(-\mathbf u\cdot\mathbf p)(-\mathbf u) + s(s\mathbf p + \mathbf u\times\mathbf p) - (s\mathbf p + \mathbf u\times\mathbf p)\times\mathbf u
= (\mathbf u\cdot\mathbf p)\mathbf u + s^2\mathbf p + 2s\,\mathbf u\times\mathbf p - (\mathbf u\times\mathbf p)\times\mathbf u .
$$
利用$(\mathbf u\times\mathbf p)\times\mathbf u = \lVert\mathbf u\rVert^2\mathbf p - (\mathbf u\cdot\mathbf p)\mathbf u$，上式变为$(s^2 - \lVert\mathbf u\rVert^2)\mathbf p + 2(\mathbf u\cdot\mathbf p)\mathbf u + 2s\,\mathbf u\times\mathbf p$。而$s^2 - \lVert\mathbf u\rVert^2 = \cos\theta$，$2\sin^2\frac\theta2 = 1-\cos\theta$，$2\sin\frac\theta2\cos\frac\theta2 = \sin\theta$，于是得到$\cos\theta\,\mathbf p + (1-\cos\theta)(\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega} + \sin\theta\,\hat{\boldsymbol\omega}\times\mathbf p$：这正是罗德里格斯公式（[[#thm-rodrigues]]）的向量形式。关于合成，由结合律和$(q_1\otimes q_2)^* = q_2^*\otimes q_1^*$，$q_1\otimes q_2\otimes(0,\mathbf p)\otimes(q_1\otimes q_2)^* = q_1\otimes\big(q_2\otimes(0,\mathbf p)\otimes q_2^*\big)\otimes q_1^*$，即先作用$R_2$再作用$R_1$，也就是$R_1R_2$。把$q$换成$-q$会使两个因子都变号，乘积不变。
:::

这种符号多义性——**二重覆盖**——对旋转向量无害，但对插值和求平均有影响：$q$和$-q$在$\mathbb R^4$中相距很远，却表示同一个姿态，因此软件在插值之前，若$q_1\cdot q_2 < 0$，就把其中一个四元数变号，以便走近路。姿态之间的球面线性插值（slerp）是[[robotics/trajectory-planning]]的内容。

::: example 用四元数合成旋转 {#ex-quat}
用四元数重新计算[[#ex-fixed-current]]中的$R_a = \mathrm{Rot}_z(90^\circ)\mathrm{Rot}_x(90^\circ)$，并用所得结果旋转$\mathbf p = (1, 2, 3)$。
::: solution
记$h = \cos 45^\circ = \sin 45^\circ = \sqrt2/2$：$q_z = (h, 0, 0, h)$，$q_x = (h, h, 0, 0)$。由[[#eq-quat-product]]，取$\mathbf a = (0,0,h)$，$\mathbf b = (h,0,0)$：
$$
q_z\otimes q_x = \big(h^2 - 0,\ h(h,0,0) + h(0,0,h) + (0,0,h)\times(h,0,0)\big) = \big(\tfrac12,\ (\tfrac12, 0, \tfrac12) + (0, \tfrac12, 0)\big) = \big(\tfrac12, \tfrac12, \tfrac12, \tfrac12\big).
$$
所以$\cos\frac\theta2 = \frac12$，$\theta = 120^\circ$，由$\sin 60^\circ\,\hat{\boldsymbol\omega} = (\frac12,\frac12,\frac12)$得$\hat{\boldsymbol\omega} = (1,1,1)/\sqrt3$——与[[#ex-log]]中由矩阵求得的轴和角相同，只用了 16 次乘法而不是 27 次。该旋转使$x\to y\to z\to x$循环，所以$\mathbf p = \hat{\mathbf x} + 2\hat{\mathbf y} + 3\hat{\mathbf z} \mapsto \hat{\mathbf y} + 2\hat{\mathbf z} + 3\hat{\mathbf x} = (3, 1, 2)$，与直接计算的$R_a\mathbf p$相等：$(0\cdot1 + 0\cdot2 + 1\cdot3,\ 1,\ 2) = (3,1,2)$。长度检验：前后都是$\sqrt{14}$。
:::
:::

## 齐次变换 {#sec-homog}

完整的位姿还需要平移。若$\{b\}$的原点位于$\mathbf p_{ab}$（$\{a\}$中的坐标），其坐标轴由$R_{ab}$给出，则$\{b\}$坐标为$\mathbf x_b$的点的$\{a\}$坐标为$\mathbf x_a = R_{ab}\mathbf x_b + \mathbf p_{ab}$。如果在点的坐标后面附加一个 1，这个仿射映射就变成矩阵乘积。

::: definition 齐次变换 {#def-homogeneous}
$\{b\}$相对于$\{a\}$的**齐次变换矩阵**为
$$
T_{ab} = \begin{bmatrix} R_{ab} & \mathbf p_{ab} \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix} \in SE(3),
\qquad
\begin{bmatrix} \mathbf x_a \\ 1 \end{bmatrix} = T_{ab}\begin{bmatrix} \mathbf x_b \\ 1 \end{bmatrix},
$$
其中**特殊欧几里得群**$SE(3)$是所有这种$R \in SO(3)$、$\mathbf p\in\mathbb R^3$的$4\times4$矩阵的集合。点带有齐次坐标 1；自由向量带 0，因此它们只被旋转而不被平移。合成仍像以前一样链接：$T_{ac} = T_{ab}T_{bc}$。
:::

::: proposition 齐次变换的逆 {#prop-inverse}
$$
T^{-1} = \begin{bmatrix} R & \mathbf p \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix}^{-1} = \begin{bmatrix} R^{\mathsf T} & -R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix},
\qquad T_{ba} = T_{ab}^{-1}.
$$
:::

::: proof
相乘：$\begin{bmatrix} R^{\mathsf T} & -R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}\begin{bmatrix} R & \mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix} = \begin{bmatrix} R^{\mathsf T}R & R^{\mathsf T}\mathbf p - R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix} = I_4$。物理意义：由$\mathbf x_a = R\mathbf x_b + \mathbf p$反解得$\mathbf x_b = R^{\mathsf T}\mathbf x_a - R^{\mathsf T}\mathbf p$；从$\{b\}$看$\{a\}$的原点在$-R^{\mathsf T}\mathbf p$，而不是$-\mathbf p$。这样求逆只需一次转置和一次矩阵–向量乘法，并且结果精确地保持在$SE(3)$中，不像一般的$4\times4$数值求逆那样。
:::

::: example 确定腕部摄像头看到的物体的位置 {#ex-camera}
机器人的末端执行器坐标系$\{e\}$位于$\mathbf p_{se} = (0.60, 0.20, 0.50)\,\mathrm m$，$R_{se} = \mathrm{Rot}_x(180^\circ)$（工具$z$轴竖直向下）。摄像头坐标系$\{c\}$用螺栓固定在夹爪上，$\mathbf p_{ec} = (0.05, 0, -0.04)\,\mathrm m$，$R_{ec} = \mathrm{Rot}_z(90^\circ)$。摄像头测得一个零件位于$\mathbf x_c = (0.02, -0.03, 0.30)\,\mathrm m$。该零件在$\{s\}$中的什么位置？$T_{cs}$是什么？
::: solution
首先，$R_{se} = \mathrm{diag}(1,-1,-1)$，故
$$
T_{sc} = T_{se}T_{ec},\qquad R_{sc} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & -1\end{bmatrix}\begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1\end{bmatrix} = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & -1\end{bmatrix},
$$
$$
\mathbf p_{sc} = \mathbf p_{se} + R_{se}\mathbf p_{ec} = (0.60, 0.20, 0.50) + (0.05, 0, 0.04) = (0.65, 0.20, 0.54)\,\mathrm m .
$$
于是$\mathbf x_s = R_{sc}\mathbf x_c + \mathbf p_{sc} = (0.03, -0.02, -0.30) + (0.65, 0.20, 0.54) = (0.68, 0.18, 0.24)\,\mathrm m$。零件在摄像头下方$0.30\,\mathrm m$处（摄像头沿其$z$轴观察，而该轴向下）——这与摄像头高度$0.54\,\mathrm m$、零件高度$0.24\,\mathrm m$一致。由[[#prop-inverse]]，
$$
T_{cs} = \begin{bmatrix} R_{sc}^{\mathsf T} & -R_{sc}^{\mathsf T}\mathbf p_{sc} \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix},\qquad
-R_{sc}^{\mathsf T}\mathbf p_{sc} = -\begin{bmatrix} 0 & -1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & -1\end{bmatrix}\begin{bmatrix} 0.65 \\ 0.20 \\ 0.54\end{bmatrix} = \begin{bmatrix} 0.20 \\ 0.65 \\ 0.54\end{bmatrix}\mathrm m .
$$
检验：把$T_{cs}$作用于基座原点$(0,0,0,1)$得到$(0.20, 0.65, 0.54)$，其长度$0.871\,\mathrm m$等于$\lVert\mathbf p_{sc}\rVert = \sqrt{0.65^2 + 0.2^2 + 0.54^2} = 0.871\,\mathrm m$，两个原点之间的距离理应如此。
:::
:::

在实际的工作单元中，变换$T_{ec}$不是从图纸上读出来的，而是通过**手眼标定**测得的，它的误差会直接传递到每一次抓取中：$R_{ec}$中$0.5^\circ$的角度误差会使$0.30\,\mathrm m$远处的点移动$0.30\times0.5\pi/180 = 2.6\,\mathrm{mm}$。

## 运动旋量与旋量运动 {#sec-screw}

罗德里格斯公式描述的是绕通过原点的轴的转动。一般的刚体运动更适合用一根可以位于空间任何位置、并带有沿轴平移的轴来描述。

::: definition 旋量轴与运动旋量 {#def-screw}
**旋量轴**（screw axis）为$\mathcal S = (\boldsymbol\omega, \mathbf v) \in \mathbb R^6$，满足以下二者之一：(a) $\lVert\boldsymbol\omega\rVert = 1$，描述绕通过$\mathbf q$、方向为$\boldsymbol\omega$的直线的转动，**节距**为$h$（每弧度的平移量），其中
$$
\mathbf v = -\boldsymbol\omega\times\mathbf q + h\,\boldsymbol\omega ;
$$
或 (b) $\boldsymbol\omega = \mathbf 0$，$\lVert\mathbf v\rVert = 1$，即沿$\mathbf v$的纯平移（节距为无穷大）。其$4\times4$矩阵形式为$[\mathcal S] = \begin{bmatrix} [\boldsymbol\omega] & \mathbf v \\ \mathbf 0^{\mathsf T} & 0\end{bmatrix}$。**运动旋量**（twist）$\mathcal V = \mathcal S\dot\theta$是旋量轴乘以一个速率：$\boldsymbol\omega\dot\theta$是角速度，$\mathbf v\dot\theta$是物体上瞬时位于坐标系原点的那一点的速度。
:::

第二种解释说明了看起来奇怪的$\mathbf v$：绕通过$\mathbf q$的直线旋转的物体，使位于原点的点以速度$\boldsymbol\omega\times(\mathbf 0 - \mathbf q) = -\boldsymbol\omega\times\mathbf q$运动，再加上轴向漂移$h\boldsymbol\omega$。转动关节是节距为零的旋量，移动关节是节距为无穷大的旋量——这就是为什么[[robotics/forward-kinematics]]中的指数积公式能用一个公式同时处理两者。

::: proposition 旋量运动的指数 {#prop-screw-exp}
沿$\lVert\boldsymbol\omega\rVert = 1$的旋量轴$\mathcal S = (\boldsymbol\omega,\mathbf v)$运动转角$\theta$，就是刚体运动
$$
e^{[\mathcal S]\theta} = \begin{bmatrix} e^{[\boldsymbol\omega]\theta} & G(\theta)\,\mathbf v \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix},
\qquad G(\theta) = I\theta + (1-\cos\theta)[\boldsymbol\omega] + (\theta - \sin\theta)[\boldsymbol\omega]^2 ,
$$ {#eq-screw-exp}
而对于纯平移（$\boldsymbol\omega = \mathbf 0$），$e^{[\mathcal S]\theta} = \begin{bmatrix} I & \mathbf v\theta \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$。反之（**沙勒定理**），每个$T \in SE(3)$都对某个旋量轴$\mathcal S$和$\theta \ge 0$等于$e^{[\mathcal S]\theta}$。
:::

::: proof
与[[#thm-rodrigues]]的证明一样，以单位速率随运动旋量$\mathcal S$作刚体运动的点满足$\frac{d}{dt}\begin{bmatrix}\mathbf x\\1\end{bmatrix} = [\mathcal S]\begin{bmatrix}\mathbf x\\1\end{bmatrix}$，即$\dot{\mathbf x} = \boldsymbol\omega\times\mathbf x + \mathbf v$，所以转过角$\theta$后的运动为$e^{[\mathcal S]\theta}$。分块矩阵的幂为$[\mathcal S]^k = \begin{bmatrix}[\boldsymbol\omega]^k & [\boldsymbol\omega]^{k-1}\mathbf v\\ \mathbf 0^{\mathsf T} & 0\end{bmatrix}$（$k \ge 1$），因此指数的左上块为$e^{[\boldsymbol\omega]\theta}$，右上块为$\big(\sum_{k\ge1}[\boldsymbol\omega]^{k-1}\theta^k/k!\big)\mathbf v$。像前面一样用$[\boldsymbol\omega]^3 = -[\boldsymbol\omega]$降幂，
$$
\sum_{k\ge1}\frac{[\boldsymbol\omega]^{k-1}\theta^k}{k!} = I\theta + \Big(\frac{\theta^2}{2!} - \frac{\theta^4}{4!} + \cdots\Big)[\boldsymbol\omega] + \Big(\frac{\theta^3}{3!} - \frac{\theta^5}{5!} + \cdots\Big)[\boldsymbol\omega]^2 = G(\theta).
$$
若$\boldsymbol\omega = \mathbf 0$，只剩下$k=1$项，得到$\mathbf v\theta$。
关于逆命题，设$T = (R,\mathbf p)$。若$R = I$，取$\boldsymbol\omega = \mathbf 0$，$\theta = \lVert\mathbf p\rVert$，$\mathbf v = \mathbf p/\theta$（若$\mathbf p = \mathbf 0$则取$\theta = 0$）。否则由[[#prop-log]]取$\boldsymbol\omega$和$\theta\in(0,\pi]$，并解$G(\theta)\mathbf v = \mathbf p$；这是可行的，因为$G(\theta)$可逆。事实上，沿$\boldsymbol\omega$方向它相当于乘以$\theta > 0$（因为$[\boldsymbol\omega]\boldsymbol\omega = \mathbf 0$）；在垂直于$\boldsymbol\omega$的平面上，$[\boldsymbol\omega]$作用为四分之一圈转动$J$，$J^2 = -I$，于是它作用为$\sin\theta\,I + (1-\cos\theta)J$，其在该平面上的行列式为$\sin^2\theta + (1-\cos\theta)^2 = 2 - 2\cos\theta > 0$。
:::

::: example 绕偏置轴的旋量运动 {#ex-screw}
一个物体绕通过$\mathbf q = (1, 0, 0)\,\mathrm m$的铅垂线转动四分之一圈，$\theta = \pi/2$，节距$h = 0.05\,\mathrm{m/rad}$。求$T$以及原来位于原点的物体点的新位置。
::: solution
$\boldsymbol\omega = (0,0,1)$；$\boldsymbol\omega\times\mathbf q = (0,0,1)\times(1,0,0) = (0,1,0)$；故$\mathbf v = (0,-1,0) + 0.05(0,0,1) = (0,-1,0.05)$。在$\theta = \pi/2$处：$1 - \cos\theta = 1$，$\theta - \sin\theta = \pi/2 - 1 = 0.5708$，并且$[\boldsymbol\omega]\mathbf v = \boldsymbol\omega\times\mathbf v = (1, 0, 0)$，$[\boldsymbol\omega]^2\mathbf v = \boldsymbol\omega\times(1,0,0) = (0,1,0)$，
$$
G\mathbf v = \tfrac\pi2(0,-1,0.05) + 1\cdot(1,0,0) + 0.5708\,(0,1,0) = (1,\ -1.5708 + 0.5708,\ 0.0785) = (1,\ -1,\ 0.0785)\,\mathrm m,
$$
$$
T = \begin{bmatrix} 0 & -1 & 0 & 1 \\ 1 & 0 & 0 & -1 \\ 0 & 0 & 1 & 0.0785 \\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
原点移到$(1, -1, 0.0785)\,\mathrm m$。用几何方法检验：相对于轴，原点位于$(-1,0,0)$；绕$z$轴逆时针转四分之一圈把它带到$(0,-1,0)$；加回$\mathbf q$得$(1,-1,0)$；旋量再向上推进$h\theta = 0.05\times\pi/2 = 0.0785\,\mathrm m$。✓
:::
:::

::: widget transform2d
matrix: cos(pi/6), -sin(pi/6); sin(pi/6), cos(pi/6)
eigen: true
vector: 1.5, 0.5
caption: 平面旋转$\mathrm{Rot}(30^\circ)$作用于网格、单位正方形和一个可拖动的向量。注意行列式（面积比）恰好为 1，并且没有出现实特征向量：在平面内，只有转轴（此处垂直于屏幕）保持不动。修改一个元素，比如把$(1,1)$元素改为$1.2$，矩阵就不再是旋转：正方形被剪切，长度不再保持不变——一个从不重新标准正交化的数值积分姿态矩阵就会发生这种情况。
:::

::: warning 变换对两个坐标系不是对称的
$T_{ab}$与$T_{ba}$互为逆矩阵，而不是互为转置：$4\times4$齐次矩阵的转置甚至不属于$SE(3)$（其最下一行不再是$(0,0,0,1)$）。同样，$T_{ba}$的平移部分是$-R_{ab}^{\mathsf T}\mathbf p_{ab}$，而不是$-\mathbf p_{ab}$；二者只在$R_{ab} = I$时相同。链接变换时，写出坐标系名称，并检查内侧下标是否匹配（$T_{se}T_{ec}$，绝不是$T_{se}T_{ce}$）。
:::

::: history
欧拉（Euler）关于有一个不动点的刚体位移是绕某轴的转动的定理发表于 1776 年。莫齐（Giulio Mozzi，1763 年）和沙勒（Michel Chasles，1830 年）证明了任何刚体位移都是绕某条直线的旋量运动，罗德里格斯（Olinde Rodrigues）于 1840 年发表了旋转的合成以及现在以他命名的公式。哈密顿（William Rowan Hamilton）于 1843 年 10 月 16 日发现了四元数；鲍尔（Robert Stawell Ball）在《旋量理论》（*The Theory of Screws*，1876 年）中发展了运动旋量和力旋量的几何学。$4\times4$齐次矩阵通过德纳维特（Denavit）与哈滕伯格（Hartenberg）1955 年关于低副机构的论文进入运动学，而保罗（Richard Paul）1981 年的著作《机器人操作臂：数学、编程与控制》（*Robot Manipulators: Mathematics, Programming, and Control*）使齐次变换成为机器人编程的日常语言。布罗克特（Roger Brockett）1984 年的指数积公式把[[#prop-screw-exp]]中的旋量指数重新带回了机器人运动学。
:::

::: summary
- 旋转矩阵$R_{ab} \in SO(3)$以$\{b\}$的各轴在$\{a\}$中的表示为列；$R^{-1} = R^{\mathsf T}$，$\det R = 1$，且$\mathbf p_a = R_{ab}\mathbf p_b$，$R_{ac} = R_{ab}R_{bc}$。
- 绕固定轴的旋转左乘，绕物体当前轴的旋转右乘；旋转不可交换。
- 罗德里格斯公式：$\mathrm{Rot}(\hat{\boldsymbol\omega},\theta) = I + \sin\theta[\hat{\boldsymbol\omega}] + (1-\cos\theta)[\hat{\boldsymbol\omega}]^2$；反过来，$\cos\theta = (\operatorname{tr}R - 1)/2$，$[\hat{\boldsymbol\omega}] = (R - R^{\mathsf T})/(2\sin\theta)$。
- 角速度：$\dot RR^{\mathsf T} = [\boldsymbol\omega_s]$，$R^{\mathsf T}\dot R = [\boldsymbol\omega_b]$。
- 欧拉角和横滚–俯仰–偏航角直观但有奇异性（万向节锁，ZYZ 时$\det B = -\sin\beta$）；每一种三参数表示都有奇异点。
- 单位四元数$(\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$通过乘法合成，没有奇异性，并二重覆盖$SO(3)$。
- 齐次变换$T = \begin{bmatrix} R & \mathbf p\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$通过乘法链接；$T^{-1}$的平移部分为$-R^{\mathsf T}\mathbf p$。
- 每个刚体运动都是绕某条直线的旋量运动$e^{[\mathcal S]\theta}$（沙勒定理）；转动关节和移动关节分别是节距为零和无穷大的旋量。
:::

## 习题

::: exercise 旋转并平移的坐标系 {#exr-shift level=1 check="-1.5"}
坐标系$\{b\}$由$\{a\}$绕$\hat{\mathbf z}_a$旋转$90^\circ$并把原点平移到$\mathbf p_{ab} = (0.5, 0, 0)\,\mathrm m$得到。一点的坐标为$\mathbf x_b = (1, 2, 3)\,\mathrm m$。求$\mathbf x_a$。（输入$\mathbf x_a$的$x$坐标，单位 m。）
::: solution
$R_{ab} = \mathrm{Rot}_z(90^\circ) = \begin{bmatrix} 0 & -1 & 0\\ 1 & 0 & 0\\ 0 & 0 & 1\end{bmatrix}$，故$R_{ab}\mathbf x_b = (-2, 1, 3)$，$\mathbf x_a = (-2 + 0.5,\ 1,\ 3) = (-1.5, 1, 3)\,\mathrm m$。检验：该点到$\{b\}$原点的距离在两个坐标系中都是$\sqrt{14}$：$\lVert\mathbf x_a - \mathbf p_{ab}\rVert = \lVert(-2,1,3)\rVert = \sqrt{14}$。
:::
:::

::: exercise 由迹求转角 {#exr-trace level=1 check="75.52"}
一个旋转矩阵的迹为$1.5$。它的转角是多少？（输入$\theta$，单位为度，取值于$[0, 180]$，保留两位小数。）
::: solution
$\cos\theta = (\operatorname{tr}R - 1)/2 = 0.25$，故$\theta = \arccos 0.25 = 75.5^\circ$。迹的范围从$3$（单位矩阵）到$-1$（转半圈），所以$1.5$对应一个中等大小的转动，与所求结果一致。
:::
:::

::: exercise 逆变换 {#exr-inverse level=1 check="-2"}
$T_{ab}$的$R_{ab} = \mathrm{Rot}_z(90^\circ)$，$\mathbf p_{ab} = (1, 2, 0)\,\mathrm m$。求$\{a\}$的原点在$\{b\}$坐标中的位置。（输入其$x$坐标，单位 m。）
::: solution
由[[#prop-inverse]]，$\mathbf p_{ba} = -R_{ab}^{\mathsf T}\mathbf p_{ab} = -\begin{bmatrix} 0 & 1 & 0\\ -1 & 0 & 0 \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}1\\2\\0\end{bmatrix} = -\begin{bmatrix} 2 \\ -1 \\ 0\end{bmatrix} = \begin{bmatrix} -2 \\ 1 \\ 0\end{bmatrix}\mathrm m$。注意它不是$-\mathbf p_{ab} = (-1,-2,0)$。检验：$T_{ab}(\mathbf p_{ba},1)$必须是原点：$R_{ab}(-2,1,0) + (1,2,0) = (-1,-2,0) + (1,2,0) = \mathbf 0$ ✓。
:::
:::

::: exercise 由旋转矩阵求横滚角 {#exr-roll level=2 check="-15"}
某 ZYX（横滚–俯仰–偏航）姿态的元素（保留四位小数）为$r_{11} = 0.8138$，$r_{21} = 0.4698$，$r_{31} = -0.3420$，$r_{32} = -0.2432$，$r_{33} = 0.9077$。求偏航、俯仰和横滚角。（输入横滚角，单位为度。）
::: solution
俯仰：$\vartheta = \operatorname{atan2}(0.3420, \sqrt{0.2432^2 + 0.9077^2}) = \operatorname{atan2}(0.3420, 0.9397) = 20.0^\circ$。偏航：$\psi = \operatorname{atan2}(0.4698, 0.8138) = 30.0^\circ$。横滚：$\varphi = \operatorname{atan2}(-0.2432, 0.9077) = -15.0^\circ$。检验：$\cos\vartheta\cos\varphi = 0.9397\times0.9659 = 0.9077 = r_{33}$ ✓。这里用$\arctan(r_{32}/r_{33})$也行，但只是因为$r_{33} > 0$；一般情况下需要用`atan2`。
:::
:::

::: exercise 四元数旋转 {#exr-quat level=2 check="3"}
利用$q = (\frac12, \frac12, \frac12, \frac12)$，用[[#eq-quat-product]]显式计算$q\otimes(0,\mathbf p)\otimes q^*$来旋转$\mathbf p = (1, 2, 3)$。（输入结果的$x$分量。）
::: solution
记$\mathbf u = (\frac12,\frac12,\frac12)$。第一次乘积，由[[#eq-quat-product]]：标量部分为$-\mathbf u\cdot\mathbf p = -3$；向量部分为$\frac12\mathbf p + \mathbf u\times\mathbf p = (0.5, 1, 1.5) + (0.5, -1, 0.5) = (1, 0, 2)$，因为$\mathbf u\times\mathbf p = \big(\frac12\cdot3 - \frac12\cdot2,\ \frac12\cdot1 - \frac12\cdot3,\ \frac12\cdot2 - \frac12\cdot1\big) = (0.5, -1, 0.5)$。所以$q\otimes(0,\mathbf p) = (-3, (1,0,2))$。
第二次与$q^* = (\frac12, -\mathbf u)$相乘：标量部分为$(-3)\cdot\frac12 - (1,0,2)\cdot(-\mathbf u) = -1.5 + 1.5 = 0$，对于旋转后的向量理应如此。向量部分为
$$
(-3)(-\mathbf u) + \tfrac12(1,0,2) + (1,0,2)\times(-\mathbf u) = (1.5,1.5,1.5) + (0.5, 0, 1) + (1, -0.5, -0.5) = (3, 1, 2).
$$
这与[[#ex-quat]]一致（该旋转使$x\to y\to z\to x$循环），且长度$\sqrt{14}$保持不变。输入$3$。
:::
:::

::: exercise 绕固定轴的两次转动 {#exr-fixed level=2 check="120"}
一个与$\{s\}$对齐的物体先绕空间$x$轴转$90^\circ$，再绕空间$y$轴转$90^\circ$。求最终的旋转矩阵及其转角。（输入转角，单位为度。）
::: solution
绕固定轴的旋转左乘：$R = \mathrm{Rot}_y(90^\circ)\mathrm{Rot}_x(90^\circ) = \begin{bmatrix} 0 & 0 & 1\\ 0 & 1 & 0\\ -1 & 0 & 0\end{bmatrix}\begin{bmatrix} 1 & 0 & 0\\ 0 & 0 & -1\\ 0 & 1 & 0\end{bmatrix} = \begin{bmatrix} 0 & 1 & 0\\ 0 & 0 & -1\\ -1 & 0 & 0\end{bmatrix}$。其迹为$0$，故$\cos\theta = -\frac12$，$\theta = 120^\circ$；由$(R - R^{\mathsf T})/(2\sin\theta)$得轴为$(1, 1, -1)/\sqrt3$。检验：绕$(1,1,-1)$转$120^\circ$把$\hat{\mathbf x}$变为$-\hat{\mathbf z}$，这正是$R$的第一列 ✓。
:::
:::

::: exercise 复合旋转的角速度 {#exr-omega level=2 check="sqrt(2)"}
一个摄像头云台的姿态为$R(t) = \mathrm{Rot}_z(t)\,\mathrm{Rot}_x(t)$（$t$以秒计，角以弧度计）。求$\boldsymbol\omega_s(t)$及其大小。（输入$\lVert\boldsymbol\omega_s\rVert$的精确值，单位 rad/s——可以输入平方根之类的表达式。）
::: solution
与[[#prop-gimbal]]的证明一样，$\dot RR^{\mathsf T} = [\hat{\mathbf z}]\cdot1 + \mathrm{Rot}_z(t)[\hat{\mathbf x}]\mathrm{Rot}_z(t)^{\mathsf T}\cdot1 = [\hat{\mathbf z} + \mathrm{Rot}_z(t)\hat{\mathbf x}]$，故$\boldsymbol\omega_s = (\cos t, \sin t, 1)\,\mathrm{rad/s}$，且对所有$t$都有$\lVert\boldsymbol\omega_s\rVert = \sqrt{\cos^2t + \sin^2t + 1} = \sqrt2 = 1.414\,\mathrm{rad/s}$。两个关节速度作为沿两根（互相垂直的）关节轴的向量相加；角速度大小不变，但其方向绕$\hat{\mathbf z}$进动。
:::
:::

::: exercise 共轭恒等式 {#exr-conjugation level=3}
证明对每个$R \in SO(3)$和$\mathbf x\in\mathbb R^3$都有$R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$，并由此推出$R\,\mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,R^{\mathsf T} = \mathrm{Rot}(R\hat{\boldsymbol\omega},\theta)$。解释第二个恒等式的意义，并用它说明"绕固定轴的旋转左乘"这一规则。
::: solution
对任意$\mathbf y$，$R[\mathbf x]R^{\mathsf T}\mathbf y = R\big(\mathbf x\times R^{\mathsf T}\mathbf y\big) = (R\mathbf x)\times(RR^{\mathsf T}\mathbf y) = (R\mathbf x)\times\mathbf y = [R\mathbf x]\mathbf y$，这里用到[[#prop-so3]]的叉积性质 4。两个矩阵对每个$\mathbf y$都给出相同结果，所以相等。其次，由于共轭与取幂可交换，$R(A^k)R^{\mathsf T} = (RAR^{\mathsf T})^k$，因而与指数级数可交换：$Re^{[\hat{\boldsymbol\omega}]\theta}R^{\mathsf T} = e^{R[\hat{\boldsymbol\omega}]R^{\mathsf T}\theta} = e^{[R\hat{\boldsymbol\omega}]\theta}$。解释："转到轴为$\hat{\boldsymbol\omega}$的坐标系中，在那里旋转，再转回来"就是绕变换后的轴$R\hat{\boldsymbol\omega}$转过同样角度的旋转。固定轴规则：设物体姿态为$R$，绕空间轴$\hat{\boldsymbol\omega}_s$转过$\theta$。在物体坐标中该轴为$\hat{\boldsymbol\omega}_b = R^{\mathsf T}\hat{\boldsymbol\omega}_s$，由物体坐标系规则得$R\,\mathrm{Rot}(R^{\mathsf T}\hat{\boldsymbol\omega}_s,\theta) = R\,R^{\mathsf T}\mathrm{Rot}(\hat{\boldsymbol\omega}_s,\theta)R = \mathrm{Rot}(\hat{\boldsymbol\omega}_s,\theta)\,R$——即左乘。
:::
:::

::: exercise 给定运动的旋量参数 {#exr-screw level=3 check="2/pi"}
某刚体运动的$R = \mathrm{Rot}_z(90^\circ)$，$\mathbf p = (0, 2, 1)\,\mathrm m$。求其旋量轴（方向及轴上一点）、转角和节距。（输入节距的精确值，单位 m/rad——可以输入含 pi 的表达式。）
::: solution
由$R$得：$\boldsymbol\omega = \hat{\mathbf z}$，$\theta = \pi/2$。用[[#eq-screw-exp]]解$G(\theta)\mathbf v = \mathbf p$。沿$\hat{\mathbf z}$方向，$G$相当于乘以$\theta$：$v_z = 1/(\pi/2) = 0.6366$。在$xy$平面内，$G$作用为$\sin\theta\,I + (1-\cos\theta)J = I + J$，其中$J(a,b) = (-b,a)$：$(v_x - v_y,\ v_y + v_x) = (0, 2)$，故$v_x = v_y = 1$。因此$\mathbf v = (1, 1, 0.6366)$。节距$h = \boldsymbol\omega\cdot\mathbf v = 2/\pi = 0.637\,\mathrm{m/rad}$。轴上离原点最近的点为$\mathbf q = \boldsymbol\omega\times\mathbf v = (-1, 1, 0)\,\mathrm m$（由$\mathbf v = -\boldsymbol\omega\times\mathbf q + h\boldsymbol\omega$且$\mathbf q\perp\boldsymbol\omega$得到）。检验：把原点绕通过$(-1,1,0)$的铅垂线转$90^\circ$，它到达$(-1,1,0) + \mathrm{Rot}_z(90^\circ)(1,-1,0) = (-1,1,0) + (1,1,0) = (0,2,0)$，再加上推进量$h\theta = 1\,\mathrm m$得$(0,2,1) = \mathbf p$ ✓。
:::
:::

::: exercise 选择姿态表示方法 {#exr-design level=3}
你正在为一台携带摄像头的机械臂编写软件，它必须 (i) 存储由操作员示教的目标姿态，(ii) 向操作员显示这些姿态，(iii) 在它们之间平滑插值，(iv) 以$1\,\mathrm{kHz}$积分陀螺仪读数，以便在两次视觉更新之间跟踪摄像头的姿态。对每项任务推荐一种表示方法（旋转矩阵、轴–角/指数坐标、欧拉角或横滚–俯仰–偏航角、单位四元数），并用本章推导出的性质说明理由，包括可能出现的问题。
::: solution
没有唯一正确的答案；一个站得住脚的设计是：(i) **存储**：单位四元数（4 个数，无奇异性）或旋转矩阵；存储归一化后的值，并写明约定（标量在前还是在后）。(ii) **显示**：横滚–俯仰–偏航角或控制器自己的欧拉角约定，因为操作员习惯用角度思考——但只为显示而由存储的表示计算它们，在俯仰角接近$\pm90^\circ$时给出警告（万向节锁，[[#prop-gimbal]]），且绝不把显示的角度再送回计算。(iii) **插值**：四元数 slerp（或等价地，$R_1e^{[\hat{\boldsymbol\omega}]\theta s}$，其中$R_1^{\mathsf T}R_2 = e^{[\hat{\boldsymbol\omega}]\theta}$），它以恒定速率绕固定轴转动；若$q_1\cdot q_2 < 0$，就把其中一个四元数变号以走短路径。对欧拉角作线性插值会得到弯曲的、速度变化的运动，并可能经过万向节锁。(iv) **积分**：用精确的指数更新，$R \leftarrow R\,e^{[\boldsymbol\omega_b]\Delta t}$或$q \leftarrow q\otimes(\cos\frac{\lVert\boldsymbol\omega_b\rVert\Delta t}{2}, \sin\frac{\lVert\boldsymbol\omega_b\rVert\Delta t}{2}\,\boldsymbol\omega_b/\lVert\boldsymbol\omega_b\rVert)$，并在每一步重新归一化四元数（或重新标准正交化矩阵）以消除舍入漂移。欧拉角不适合作积分的状态量，因为其变化率方程是奇异的（$\det B = -\sin\beta$）。
:::
:::

## 延伸阅读

Lynch 与 Park 的《现代机器人学》（*Modern Robotics*）用相同的记法展开本章内容（旋转、指数坐标、运动旋量与旋量）；Murray、Li 与 Sastry 给出了李群方法的证明；Spong、Hutchinson 与 Vidyasagar 以后续 D-H 参数各章所用的风格讲述欧拉角、横滚–俯仰–偏航角和齐次变换。
